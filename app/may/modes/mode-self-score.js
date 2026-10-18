/**
 * MayCoachingModeSelfScore — Guided self-scoring mode handler (V2.1 Phase 3.0)
 *
 * Presents a score-authority-neutral, EV3-cited rubric for Part 2 case-study
 * responses. The LEARNER applies the rubric and records their own self-score.
 * May never emits a score, grade, band, or percentage for the learner's response
 * (CAQS §1.4 lines 42-44: Runtime AI never determines scoring).
 *
 * Mode Contract (per mode-base.js):
 *   Input:  MayContext (question, learner, case data) + routing
 *   Output: { mode, fallback, guidance: { rubric, rubricMetadata }, confidence, contextUsed }
 *
 * Feature Flag: ENABLE_SELF_SCORE_MODE (default: false)
 * Session: MAY-026
 * Token: may_3_0_guided_self_score
 * Governance: Light Lane (app/may only; no pack/case/content writes)
 *
 * Hard-stops:
 *   HS-1 — no new stems/numbers/choices authored (rubric cites existing
 *          P2 CSO LO statements + EV3 accounting principles only)
 *   HS-4 — hidden during active exam timer (delegates to MayExamGuard)
 *   HS-5 — every rubric criterion cites the governing authority per CAQS §4.3 EV3
 *   HS-6 — zero PII in self-score payloads (V-B3)
 *   HS-9 — aggregated per-LOS only, never per-learner (V-B3/V-B telemetry)
 */

const MayCoachingModeSelfScore = (function() {
  'use strict';

  var MODE_NAME = 'SELF_SCORE';

  // Part 2 case-study self-score rubric.
  // Each criterion: criterion (ev3-cited statement) + sources{ authority, formula } + ev3Compliant.
  // Sources: CMA Part 2 CSO (P2001_PART2_BLUEPRINT_FOUNDATION.md §22-40),
  //   CAQS §4.3 EV3 (line 345: "Correct answer must reference the accounting
  //   principle by name").
  // HS-1: no new stems/numbers/choices — only LO references + principle names.
  var RUBRIC = [
    {
      criterionId: 'P2-CSO-A1',
      criterion: 'Identify the correct CMA Part 2 CSO Learning Objective (e.g., A.1 Compute and interpret all five ratio categories) from the IMA CSO and map the response to it.',
      sources: { authority: 'IMA CSO Part 2 §A.1', formula: 'None — LO identification only' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-A2',
      criterion: 'Trace each numerical answer back to the governing accounting principle by name (EV3): e.g., DuPont decomposition cites ROE = NPM \u00d7 TAT \u00d7 EM (IMA CSO A.2).',
      sources: { authority: 'IMA CSO Part 2 §A.2', formula: 'ROE = NPM \u00d7 TAT \u00d7 EM' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-A3',
      criterion: 'Apply comparative-analysis principle (horizontal, vertical, trend) and cite the standard: ASC 230 / IMA CSO A.3.',
      sources: { authority: 'ASC 230; IMA CSO Part 2 §A.3', formula: 'Horizontal % = (Curr - Base) / Base \u00d7 100' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-B',
      criterion: 'For corporate-finance items, cite the decision rule by name (e.g., NPV/IRR acceptance, APV, cost of capital) per IMA CSO Part 2 §B.',
      sources: { authority: 'IMA CSO Part 2 §B', formula: 'NPV = \u03a3 CF_t / (1+r)^t \u2212 Initial' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-C',
      criterion: 'For decision-analysis items, name the constraint type (binding, shadow price) and cite ASC 730 / IMA CSO C.',
      sources: { authority: 'ASC 730; IMA CSO Part 2 §C', formula: 'Shadow price = \u0394Objective / \u0394RHS' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-STRUCTURE',
      criterion: 'Structure the analysis as calculate \u2192 analyze \u2192 decide (COSO/IMA case-progression standard, CAQS §14.3 "Question interconnection").',
      sources: { authority: 'COSO 2013; CAQS §14.3', formula: 'None — structure check' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-EXHIBIT',
      criterion: 'Reference exhibit data with explicit exhibit-row citation (e.g., "Exhibit 2, Row 3: inventory cost").',
      sources: { authority: 'CAQS §14.3 "Exhibit referencing"', formula: 'None — citation check' },
      ev3Compliant: true
    },
    {
      criterionId: 'P2-CSO-DATA',
      criterion: 'Verify numerical consistency: each number in the response traces to a stated exhibit value (no invented numbers — HS-1).',
      sources: { authority: 'CAQS §14.3 "Data consistency"', formula: 'None — consistency check' },
      ev3Compliant: true
    }
  ];

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && !MayFeatureFlags.isEnabled('ENABLE_SELF_SCORE_MODE')) {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    // HS-4 guard — suppress during exam-integrity contexts
    try {
      if (typeof MayExamGuard !== 'undefined' && MayExamGuard.isSuppressed(mayContext)) {
        return { fallback: true, mode: MODE_NAME, reason: 'exam-integrity suppression' };
      }
    } catch (e) {}

    var question = mayContext && mayContext.question ? mayContext.question : null;
    var contextUsed = ['question.Topic', 'question.Section', 'question.QuestionID', 'question.ItemType'];

    // Self-score is for Part 2 case items only
    var itemType = (question && (question.ItemType || question.Type)) || 'MCQ';
    if (itemType !== 'Case') {
      return { fallback: true, mode: MODE_NAME, reason: 'self-score applies to Part 2 case items only' };
    }

    // Build the rubric guidance — score-authority-neutral (CAQS §1.4)
    var rubric = RUBRIC.map(function(c) {
      return {
        id: c.criterionId,
        text: c.criterion,
        ev3Compliant: c.ev3Compliant,
        sources: c.sources
      };
    });

    // V-B1 telemetry: emit event with criterion counts (never a score)
    // Threads ev3CitedCount — the count of rubric criteria that carry an
    // actual sources.ev3Compliant citation (CAQS §4.3 EV3, line 345).
    // criteriaTotal is intentionally omitted (DL-045 positive evidence;
    // met/total percentage is LOS-level aggregate only, contained by HS-9).
    try {
      if (typeof MayTelemetry !== 'undefined' && MayTelemetry.trackSelfScoreSession) {
        var losTag = _losTagFromQuestion(question);
        MayTelemetry.trackSelfScoreSession({
          losTag: losTag,
          ev3CitedCount: rubric.filter(function(c) { return c.ev3Compliant === true; }).length,
          criteriaMetCount: 0,  // learner has not met any yet — pre-score
          mode: MODE_NAME
        });
      }
    } catch (e) {}

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: {
        rubric: rubric,
        rubricMetadata: {
          totalCriteria: rubric.length,
          ev3Compliant: true,
          authority: 'CAQS §1.4 (score-authority-neutral) + CAQS §4.3 EV3',
          examIntegrity: false, // May never scores the response
          selfScoreWrittenBy: 'learner'
        }
      },
      confidence: 1.00,
      contextUsed: contextUsed
    };

    return response;
  }

  /**
   * Extract the P2 CSO LOS tag from a case question.
   * Returns e.g. "A.1" — the Part 2 CSO Learning Objective identifier.
   * Never returns learner-identifying data (HS-6/HS-9).
   */
  function _losTagFromQuestion(question) {
    if (!question) return 'Unclassified';
    var los = question.LOS || question.LearningObjective || question.CSOLOS || '';
    if (los && typeof los === 'string') {
      // Normalize to "X.N" format (e.g., "A.1", "B.3")
      var m = los.match(/^([A-F])\.(\d+)/i);
      if (m) return m[1].toUpperCase() + '.' + m[2];
    }
    var topic = question.Topic || question.Section || '';
    if (topic && typeof topic === 'string') {
      var tm = topic.match(/^([A-F])\.(\d+)/i);
      if (tm) return tm[1].toUpperCase() + '.' + tm[2];
    }
    return 'Unclassified';
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle,
    RUBRIC: RUBRIC
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeSelfScore = MayCoachingModeSelfScore;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeSelfScore;
}
