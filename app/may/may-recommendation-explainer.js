/**
 * MayRecommendationExplainer — Transforms raw intervention recommendations into
 * explainable coaching messages. Every output answers:
 *   1. Why was this recommended?
 *   2. What evidence was used?
 *   3. What outcome is expected?
 * 
 * Consumes MayInterventionPrioritizer outputs. All outputs are deterministic,
 * rule-based, and advisory only.
 * 
 * Gated behind MayFeatureFlags.ENABLE_READINESS_SCORING (default: false).
 * When disabled, explain() returns null.
 * 
 * Session: MAY-005
 * Governance: Light Lane (analytics layer — no pack/case/content impact)
 */
const MayRecommendationExplainer = (function() {
  'use strict';

  var FEATURE_FLAG = 'ENABLE_READINESS_SCORING';

  function _isEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled(FEATURE_FLAG);
      }
    } catch (e) { /* safety */ }
    return false;
  }

  // ════════════════════════════════════════════════════════
  // Reasoning templates by tier
  // ════════════════════════════════════════════════════════
  var REASONING = {
    remediation: "When accuracy is below 60% with a declining trend or low stability, the most effective next step is untimed review of the fundamentals. This rebuilds the concept foundation before attempting timed practice. The goal is to move the topic from \"Recovery\" to \"Developing\" — typically requiring 2–3 focused sessions.",
    emerging: "Topics at 50–59% accuracy with sufficient attempts need targeted practice that identifies whether misses are knowledge gaps or process errors. Using graduated hints helps distinguish between \"didn't know the rule\" and \"misapplied the rule\" — the latter is usually the dominant pattern at this accuracy band.",
    fragile: "Knowledge at 60–74% is usable but unreliable. Unstable accuracy patterns (wide swings between correct and incorrect) benefit from untimed consolidation — focused practice without time pressure that reinforces correct reasoning paths before introducing speed.",
    challenge: "Strong, stable performance indicates mastery. The next step is maintaining that mastery under exam-like conditions: increased difficulty, time pressure, and case-based application. This tests whether the knowledge holds when format and pressure change.",
    exam_review: "With limited time before the exam, the highest-return strategy is time-pressured mixed practice targeting high-yield topics. Every session should approximate exam conditions to build pacing and endurance alongside content review.",
    case_remediation: "Case miss patterns indicate difficulty connecting conceptual knowledge to scenario evidence. Untimed case practice — where you identify the relevant exhibit or scenario paragraph before evaluating any options — builds the evidence-location habit that underlies all case performance.",
    default: "Based on your current performance patterns, the next best action targets your highest-leverage opportunity for readiness improvement."
  };

  var EXPECTED_BENEFIT = {
    remediation: "With one targeted recovery session (10–15 questions, untimed, full explanations), accuracy typically moves above 60%. Two sessions usually move a recovery topic into the developing band. The key indicator is stability — aim for 4 of your last 5 correct without hints.",
    emerging: "One targeted coaching session clarifies whether this is a knowledge gap or a process error. If it is process (common at this band), accuracy should improve 5–10% within two sessions. If accuracy does not move, the bottleneck is likely concept-level and needs fuller review.",
    fragile: "Consolidation sessions aim to stabilize performance. After 2–3 untimed sessions on the same topic, stability typically rises above 50% and accuracy trends toward 75%+. The measure of success is: can you get 4 of 5 correct on this topic without hints?",
    challenge: "Timed challenge sessions verify that mastery holds under pressure. If accuracy stays ≥ 80% under exam conditions, the topic is genuinely exam-ready. If it drops, the gap reveals where additional consolidation is needed.",
    exam_review: "Each review session should move overall readiness 3–5 points. Focus on one recovery topic per session and verify improvement before moving on. The highest-impact sessions are those that move a recovery topic into the developing band.",
    case_remediation: "Case performance typically improves noticeably after 2–3 focused sessions. The key habit to build: pause before answering and identify which exhibit contains the relevant data. Most case misses come from answering before fully locating the evidence.",
    default: "Expected benefit depends on consistent practice. Each session should produce measurable improvement in at least one topic."
  };

  // ════════════════════════════════════════════════════════
  // explain(intervention) — Full explainability chain
  // ════════════════════════════════════════════════════════
  function explain(intervention) {
    if (!_isEnabled()) return null;
    if (!intervention) return null;

    var tier = intervention.tier || 0;
    var tierLabel = intervention.tierLabel || '';
    var topic = intervention.topic || null;
    var accuracy = intervention.accuracy;
    var attempts = intervention.attempts;
    var direction = intervention.direction;
    var delta = intervention.delta;
    var stability = intervention.stability;
    var evidence = intervention.evidence || {};

    var templateKey = _templateKey(tier, intervention);
    var reasoning = REASONING[templateKey] || REASONING.default;
    var expectedBenefit = EXPECTED_BENEFIT[templateKey] || EXPECTED_BENEFIT.default;

    // ── Build "why" text ──
    var whyParts = [];
    if (topic) {
      if (accuracy !== null && attempts !== null) {
        whyParts.push('Your accuracy on ' + topic + ' is ' + accuracy + '% across ' + attempts + ' attempts');
      }
      if (direction && direction !== 'stable') {
        if (delta !== null) {
          whyParts.push('with a ' + direction + ' trend (' + (delta > 0 ? '+' : '') + delta + '%)');
        } else {
          whyParts.push('with a ' + direction + ' trend');
        }
      }
      if (stability !== null) {
        whyParts.push('and stability of ' + stability + '%');
      }
      whyParts.push('.');
    } else if (evidence.dominantPattern) {
      whyParts.push('Your case miss patterns are dominated by ' + evidence.dominantPattern);
      if (evidence.dominantTrend === 'worsening') whyParts.push(' with a worsening trend');
      whyParts.push(' (' + (evidence.totalMisses || 0) + ' total misses).');
    } else {
      whyParts.push('Based on your overall performance patterns.');
    }

    // ── Build evidence object ──
    var evidenceObj = {};
    if (topic) evidenceObj.topic = topic;
    if (accuracy !== null) evidenceObj.accuracy = accuracy;
    if (attempts !== null) evidenceObj.attempts = attempts;
    if (direction) evidenceObj.direction = direction;
    if (delta !== null) evidenceObj.delta = delta;
    if (stability !== null) evidenceObj.stability = stability;
    if (evidence.dominantPattern) evidenceObj.dominantPattern = evidence.dominantPattern;
    if (evidence.dominantTrend) evidenceObj.dominantTrend = evidence.dominantTrend;
    if (evidence.totalMisses !== undefined) evidenceObj.totalMisses = evidence.totalMisses;

    return {
      recommendation: intervention.recommendedAction || '',
      why: whyParts.join(' '),
      evidence: evidenceObj,
      reasoning: reasoning,
      expectedBenefit: expectedBenefit,
      _meta: {
        generatedAt: new Date().toISOString(),
        engineVersion: 'MAY005-1.0',
        tier: tierLabel,
        confidence: confidenceLevel(tier, accuracy, stability, attempts)
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // explainAll() — Explain the entire priority queue
  // ════════════════════════════════════════════════════════
  function explainAll() {
    if (!_isEnabled()) return null;

    var queue = null;
    try {
      if (typeof MayInterventionPrioritizer !== 'undefined' && MayInterventionPrioritizer.rank) {
        queue = MayInterventionPrioritizer.rank();
      }
    } catch (e) { return null; }

    if (!queue || !queue.queue) return [];

    return queue.queue.map(function(item) {
      return explain(item);
    }).filter(Boolean);
  }

  // ════════════════════════════════════════════════════════
  // explainTopAction() — Explain just the #1 recommendation
  // ════════════════════════════════════════════════════════
  function explainTopAction() {
    if (!_isEnabled()) return null;

    var queue = null;
    try {
      if (typeof MayInterventionPrioritizer !== 'undefined' && MayInterventionPrioritizer.rank) {
        queue = MayInterventionPrioritizer.rank();
      }
    } catch (e) { return null; }

    if (!queue || !queue.topAction) return null;
    return explain(queue.topAction);
  }

  // ════════════════════════════════════════════════════════
  // explainByTopic(topicName) — Explain interventions for a topic
  // ════════════════════════════════════════════════════════
  function explainByTopic(topicName) {
    if (!_isEnabled()) return null;

    var all = explainAll();
    if (!all) return null;

    return all.filter(function(e) {
      return e.evidence.topic === topicName;
    });
  }

  // ════════════════════════════════════════════════════════
  // _templateKey — Map intervention tier to reasoning template
  // ════════════════════════════════════════════════════════
  function _templateKey(tier, intervention) {
    if (tier === 1) return 'remediation';
    if (tier === 2) {
      if (intervention.casePattern) return 'case_remediation';
      return 'emerging';
    }
    if (tier === 3) return 'fragile';
    if (tier === 4) return 'challenge';
    if (tier === 5) return 'exam_review';
    return 'default';
  }

  // ════════════════════════════════════════════════════════
  // confidenceLevel — How confident is this recommendation?
  // ════════════════════════════════════════════════════════
  function confidenceLevel(tier, accuracy, stability, attempts) {
    if (!attempts) return 'low';
    if (attempts >= 6 && stability !== null && stability >= 60) return 'high';
    if (attempts >= 4) return 'moderate';
    return 'low';
  }

  // ════════════════════════════════════════════════════════
  // Public API
  // ════════════════════════════════════════════════════════
  return {
    explain: explain,
    explainAll: explainAll,
    explainTopAction: explainTopAction,
    explainByTopic: explainByTopic,
    isEnabled: _isEnabled,
    FEATURE_FLAG: FEATURE_FLAG
  };

})();

if (typeof window !== 'undefined') {
  window.MayRecommendationExplainer = MayRecommendationExplainer;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayRecommendationExplainer;
}
