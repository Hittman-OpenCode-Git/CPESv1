/**
 * MayDecisionEngine — Deterministic decision hierarchy for adaptive coaching.
 * 
 * Evaluates learner state against 10 prioritized decision rules. Selects the
 * single best coaching action (mode, topic, priority) based on the current
 * learner profile, readiness snapshot, and intervention queue.
 * 
 * Session: MAY-006 — Adaptive Coaching Orchestrator
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: Gated by ENABLE_ADAPTIVE_ORCHESTRATION via orchestrator
 */

const MayDecisionEngine = (function() {
  'use strict';

  /**
   * Decision rules ordered by priority (D1 → D10).
   * Each rule returns a decision object or null if it does not apply.
   */

  // D1: Critical Remediation — overall readiness critically low
  function _ruleReadinessCritical(readiness) {
    if (!readiness) return null;
    var score = readiness.readinessScore;
    var band = readiness.band;
    // MAY-013: Exclude "Not enough data" — a learner with no data is unassessed, not critically low.
    // D10 is the correct response for truly empty profiles.
    if (band === 'Not enough data') return null;
    if ((score !== null && score < 50) || band === 'Recovery needed') {
      return {
        decisionId: 'D1',
        action: 'remediation',
        coachingMode: 'QUIZ',
        priority: 'critical',
        topic: null,
        rationale: 'Overall readiness is critically low (' + (score || '?') + '/100). Priority is rebuilding fundamentals across all sections.',
        evidence: {
          readinessScore: score,
          band: band,
          topicsAtRecovery: readiness.topicCoverage ? readiness.topicCoverage.topicsAtRecovery : null,
          triggeringRule: 'D1'
        }
      };
    }
    return null;
  }

  // MAY-012: Enhanced D2 — check if D4 also applies and add as secondary action
  function _ruleCriticalWeakness(interventions, profile, readiness) {
    if (!interventions || !interventions.queue || interventions.queue.length === 0) return null;
    var top = interventions.topAction;
    if (!top) return null;
    if (top.tier === 1) {
      var decision = {
        decisionId: 'D2',
        action: 'remediation',
        coachingMode: 'QUIZ',
        priority: 'critical',
        topic: top.topic,
        rationale: 'Critical weakness: ' + (top.topic || 'unknown topic') + ' requires immediate remediation (accuracy: ' + (top.accuracy || '?') + '%, ' + (top.direction || '?') + ' trend).',
        evidence: {
          accuracy: top.accuracy,
          direction: top.direction,
          stability: top.stability,
          attempts: top.attempts,
          tier: top.tier,
          triggeringRule: 'D2'
        }
      };

      // MAY-012: Surface D4 as secondary action when exam is approaching
      if (profile && profile.examPlan) {
        var ep = profile.examPlan;
        if (ep.hasScheduledExam && ep.daysUntilExam !== null && ep.daysUntilExam <= 30) {
          var band = readiness ? readiness.band : null;
          if (band === 'Developing' || band === 'Recovery needed') {
            decision.secondaryAction = {
              decisionId: 'D4',
              action: 'study_plan',
              coachingMode: 'STUDY_PLAN',
              priority: 'secondary',
              topic: null,
              rationale: 'After addressing critical weaknesses: exam is ' + ep.daysUntilExam + ' days away with ' + (band || 'developing') + ' readiness. Consider focused review.',
              evidence: {
                daysUntilExam: ep.daysUntilExam,
                readinessBand: band,
                triggeringRule: 'D4-secondary'
              }
            };
          }
        }
      }

      return decision;
    }
    return null;
  }

  // D3: Repeated Weakness with Instability — weak + declining + sufficient attempts
  // MAY-014: Removed stability<50 check because the profile builder (MayLearnerProfile)
  // computes stability from getLearnerIntelligence() — a different algorithm than the
  // readiness engine. Accuracy<60 + declining direction + >=5 attempts is sufficient to
  // identify the pattern SOCRATIC coaching targets: systematic misunderstanding, not
  // random error. The topic's presence in profile.weaknesses already confirms low performance.
  function _ruleRepeatedUnstable(profile, interventions) {
    if (!profile) return null;
    var weaknesses = profile.weaknesses || [];
    if (weaknesses.length === 0) return null;
    // Find weakest topic by accuracy that also has declining trend + sufficient attempts
    var candidate = null;
    weaknesses.forEach(function(w) {
      var ml = profile.masteryLevels && profile.masteryLevels[w.topic];
      if (!ml) return;
      // MAY-014: Use accuracy<60 + declining + >=5 attempts (removed stability<50 check)
      if ((ml.accuracy || 0) < 60 &&
          ml.attempts >= 5 && ml.direction === 'declining') {
        if (!candidate || (ml.accuracy || 0) < (candidate.mlAccuracy || 100)) {
          candidate = {
            topic: w.topic,
            mlAccuracy: ml.accuracy,
            mlStability: ml.stability,
            mlDirection: ml.direction,
            mlAttempts: ml.attempts
          };
        }
      }
    });
    if (!candidate) return null;
    return {
      decisionId: 'D3',
      action: 'socratic',
      coachingMode: 'SOCRATIC',
      priority: 'high',
      topic: candidate.topic,
      rationale: 'Repeated errors on ' + candidate.topic + ' with declining performance (accuracy: ' + (candidate.mlAccuracy || '?') + '%, ' + candidate.mlAttempts + ' attempts). Socratic questioning targets systematic process-level misunderstanding.',
      evidence: {
        accuracy: candidate.mlAccuracy,
        stability: candidate.mlStability,
        direction: candidate.mlDirection,
        attempts: candidate.mlAttempts,
        triggeringRule: 'D3'
      }
    };
  }

  // D4: Exam Approaching with Gaps
  function _ruleExamApproaching(profile, readiness) {
    if (!profile || !profile.examPlan) return null;
    var ep = profile.examPlan;
    if (!ep.hasScheduledExam || ep.daysUntilExam === null) return null;
    if (ep.daysUntilExam > 30) return null;
    var band = readiness ? readiness.band : (profile.readinessScore ? profile.readinessScore.band : null);
    if (band === 'Developing' || band === 'Recovery needed') {
      return {
        decisionId: 'D4',
        action: 'study_plan',
        coachingMode: 'STUDY_PLAN',
        priority: 'high',
        topic: null,
        rationale: 'Exam is ' + ep.daysUntilExam + ' days away with ' + (band || 'developing') + ' readiness. Focused review with high-yield topics.',
        evidence: {
          daysUntilExam: ep.daysUntilExam,
          readinessBand: band,
          topicsAtRecovery: readiness ? (readiness.topicCoverage ? readiness.topicCoverage.topicsAtRecovery : null) : null,
          triggeringRule: 'D4'
        }
      };
    }
    return null;
  }

  // D5: Declining Topic Trends
  function _ruleDecliningTrends(profile) {
    if (!profile) return null;
    var declining = profile.decliningTopics || [];
    if (declining.length === 0) return null;
    var topic = declining[0];
    var ml = profile.masteryLevels && profile.masteryLevels[topic];
    return {
      decisionId: 'D5',
      action: 'remediation',
      coachingMode: 'QUIZ',
      priority: 'medium',
      topic: topic,
      rationale: 'Performance on ' + topic + ' is declining (delta: ' + (ml ? ml.delta : '?') + '%). Intervene before the gap widens.',
      evidence: {
        topic: topic,
        delta: ml ? ml.delta : null,
        direction: ml ? ml.direction : 'declining',
        accuracy: ml ? ml.accuracy : null,
        triggeringRule: 'D5'
      }
    };
  }

  // D6: Emerging Weakness — Tier 2 intervention
  function _ruleEmergingWeakness(interventions) {
    if (!interventions || !interventions.queue || interventions.queue.length === 0) return null;
    var top = interventions.topAction;
    if (!top) return null;
    if (top.tier === 2) {
      return {
        decisionId: 'D6',
        action: 'quiz',
        coachingMode: 'QUIZ',
        priority: 'medium',
        topic: top.topic,
        rationale: 'Emerging weakness on ' + (top.topic || 'unknown') + ' (accuracy: ' + (top.accuracy || '?') + '%). Targeted practice to correct trajectory.',
        evidence: {
          accuracy: top.accuracy,
          direction: top.direction,
          attempts: top.attempts,
          tier: top.tier,
          triggeringRule: 'D6'
        }
      };
    }
    return null;
  }

  // D7: Fragile Knowledge — Tier 3 intervention
  function _ruleFragileKnowledge(interventions) {
    if (!interventions || !interventions.queue || interventions.queue.length === 0) return null;
    var top = interventions.topAction;
    if (!top) return null;
    if (top.tier === 3) {
      return {
        decisionId: 'D7',
        action: 'explain',
        coachingMode: 'EXPLAIN',
        priority: 'medium',
        topic: top.topic,
        rationale: 'Knowledge on ' + (top.topic || 'unknown') + ' is usable but unreliable (stability: ' + (top.stability || '?') + '%). Consolidation with concept review is needed.',
        evidence: {
          stability: top.stability,
          accuracy: top.accuracy,
          direction: top.direction,
          tier: top.tier,
          triggeringRule: 'D7'
        }
      };
    }
    return null;
  }

  // D8: Section Coverage Gap — fewer than 4 sections with sufficient data
  function _ruleSectionGap(readiness) {
    if (!readiness || !readiness.perSection) return null;
    var sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    var dataSections = 0;
    sections.forEach(function(sec) {
      var ps = readiness.perSection[sec];
      if (ps && ps.band !== 'Not enough data') dataSections++;
    });
    // CAL-01 (MAY-019): Require at least 1 section with data so D10 handles zero-data profiles.
    if (dataSections < 4 && dataSections > 0) {
      return {
        decisionId: 'D8',
        action: 'exploratory',
        coachingMode: 'EXPLAIN',
        priority: 'low',
        topic: null,
        rationale: 'Section coverage is incomplete (' + dataSections + '/6 sections with data). Explore across the blueprint to build a comprehensive profile.',
        evidence: {
          sectionsWithData: dataSections,
          topicsWithData: readiness.topicCoverage ? readiness.topicCoverage.topicsWithData : null,
          triggeringRule: 'D8'
        }
      };
    }
    return null;
  }

  // D9: High Mastery — challenge with advanced content
  function _ruleHighMastery(profile) {
    if (!profile) return null;
    var strengths = profile.strengths || [];
    if (strengths.length === 0) return null;
    // Find strongest topic with enough attempts
    var candidate = null;
    strengths.forEach(function(s) {
      var ml = profile.masteryLevels && profile.masteryLevels[s.topic];
      if (!ml) return;
      if ((ml.accuracy || 0) >= 85 && ml.attempts >= 6 &&
          ml.direction !== 'declining' && ml.direction !== 'slightly_declining') {
        if (!candidate || (ml.accuracy || 0) > (candidate.mlAccuracy || 0)) {
          candidate = {
            topic: s.topic,
            mlAccuracy: ml.accuracy,
            mlStability: ml.stability,
            mlAttempts: ml.attempts
          };
        }
      }
    });
    if (!candidate) return null;
    return {
      decisionId: 'D9',
      action: 'challenge',
      coachingMode: 'QUIZ',
      priority: 'low',
      topic: candidate.topic,
      rationale: 'Strong performance on ' + candidate.topic + ' (accuracy: ' + candidate.mlAccuracy + '%, ' + candidate.mlAttempts + ' attempts). Challenge with advanced or case-based content.',
      evidence: {
        accuracy: candidate.mlAccuracy,
        stability: candidate.mlStability,
        attempts: candidate.mlAttempts,
        triggeringRule: 'D9'
      }
    };
  }

  // D10: Insufficient Data — fallback
  function _ruleInsufficientData() {
    return {
      decisionId: 'D10',
      action: 'exploratory',
      coachingMode: 'EXPLAIN',
      priority: 'low',
      topic: null,
      rationale: 'More practice data is needed before adaptive coaching can personalize recommendations. Continue practicing across all sections.',
      evidence: { triggeringRule: 'D10' }
    };
  }

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Select the single best coaching action from learner state.
   * 
   * @param {Object} profile — LearnerProfile from MayLearnerProfile.build()
   * @param {Object|null} readiness — ReadinessSnapshot from MayReadinessEngine.assess()
   * @param {Array} recommendations — Actions from MayAdaptiveRecommender.generate()
   * @param {Object|null} interventions — PriorityQueue from MayInterventionPrioritizer.rank()
   * @returns {Object|null} Decision object or null if insufficient data
   */
  function decide(profile, readiness, recommendations, interventions) {
    // Evaluate rules in priority order — first match wins
    var result;

    result = _ruleReadinessCritical(readiness);
    if (result) return _attachMeta(result);

    result = _ruleCriticalWeakness(interventions, profile, readiness);
    if (result) return _attachMeta(result);

    result = _ruleRepeatedUnstable(profile, interventions);
    if (result) return _attachMeta(result);

    result = _ruleExamApproaching(profile, readiness);
    if (result) return _attachMeta(result);

    // CAL-02 (MAY-019): D7 before D5 — fragile knowledge (Tier 3) is more specific
    // than general declining trend and should be checked first.
    result = _ruleFragileKnowledge(interventions);
    if (result) return _attachMeta(result);

    result = _ruleDecliningTrends(profile);
    if (result) return _attachMeta(result);

    result = _ruleEmergingWeakness(interventions);
    if (result) return _attachMeta(result);

    result = _ruleSectionGap(readiness);
    if (result) return _attachMeta(result);

    result = _ruleHighMastery(profile);
    if (result) return _attachMeta(result);

    result = _ruleInsufficientData();
    return _attachMeta(result);
  }

  function _attachMeta(decision) {
    decision._meta = {
      decisionEngineVersion: 'MAY019-1.0',
      computedAt: new Date().toISOString()
    };
    // Phase 2b+ — Planner agent decoration. Hidden beta: only engages for
    // study-plan-family rules (D4, D6, D9) when the flag is on AND the
    // agent is available. When off or for non-study rules, nextAction is null
    // and the upstream decision is preserved unchanged.
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_PLANNER_AGENT')) {
        if (typeof window !== 'undefined' && typeof window.PlannerPlan === 'function' && decision && decision._meta && decision._meta.triggeringRule) {
          var weakTopics = (decision && Array.isArray(decision.weakTopics)) ? decision.weakTopics : [];
          var readinessScore = (decision && typeof decision.readinessScore === 'number') ? decision.readinessScore : null;
          var daysUntilExam = (decision && typeof decision.daysUntilExam === 'number') ? decision.daysUntilExam : null;
          var hintDep = (decision && decision.hintDependency) ? decision.hintDependency : null;
          var planResult = window.PlannerPlan({
            upstreamRuleId: decision._meta.triggeringRule,
            daysUntilExam: daysUntilExam,
            readinessScore: readinessScore,
            weakTopics: weakTopics,
            hintDependency: hintDep
          });
          if (planResult && planResult.nextAction) {
            decision._meta.nextAction = planResult.nextAction;
            decision._meta.nextActionRationale = planResult.rationale || null;
          }
        }
      }
    } catch (e) { /* planner failure → no nextAction added */ }
    // Phase 2b — annotate with hint-level from the hint-calibrator agent when
    // its flag is on. Hidden-beta default false: when off, hintLevel is the
    // legacy mapping (priority → hint level).
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_HINT_CALIBRATOR')) {
        if (typeof HintCalibratorCalibrate === 'function') {
          var accuracy = (decision && decision._meta && typeof decision._meta.accuracy === 'number')
            ? decision._meta.accuracy : null;
          // The calibrator takes accuracy/hintRate/cognitiveLevel; we have
          // limited signals here, so fall back to a `priority` → base accuracy mapping.
          if (accuracy === null) {
            var priority = (decision && decision.priority) ? decision.priority : 'medium';
            accuracy = priority === 'critical' ? 30 : (priority === 'high' ? 50 : (priority === 'medium' ? 65 : 80));
          }
          var hintRate = (decision && decision._meta && typeof decision._meta.hintRate === 'number')
            ? decision._meta.hintRate : 30;
          var cog = (decision && decision._meta && decision._meta.cognitiveLevel) || 'APPLY';
          var cal = HintCalibratorCalibrate({
            accuracy: accuracy, hintRate: hintRate, cognitiveLevel: cog,
            decisionRuleId: (decision && decision._meta && decision._meta.triggeringRule) || null
          });
          if (cal && typeof cal.hintLevel === 'number') {
            decision._meta.hintLevel = cal.hintLevel;
            decision._meta.hintLevelRationale = cal.rationale || null;
          }
        }
      } else {
        // Legacy mapping: critical → 5 (full direct), high → 4, medium → 3, low → 2.
        var p = (decision && decision.priority) ? decision.priority : 'medium';
        var map = { 'critical': 5, 'high': 4, 'medium': 3, 'low': 2 };
        decision._meta.hintLevel = map[p] || 3;
      }
    } catch (e) { /* never break dispatch */ }
    return decision;
  }

  /**
   * Evaluate a specific decision rule in isolation.
   * Useful for testing and debugging.
   * @param {string} ruleId — 'D1' through 'D10'
   * @param {Object} profile
   * @param {Object|null} readiness
   * @param {Array} recommendations
   * @param {Object|null} interventions
   * @returns {Object|null}
   */
  function evaluateRule(ruleId, profile, readiness, recommendations, interventions) {
    switch (ruleId) {
      case 'D1': return _ruleReadinessCritical(readiness);
      case 'D2': return _ruleCriticalWeakness(interventions);
      case 'D3': return _ruleRepeatedUnstable(profile, interventions);
      case 'D4': return _ruleExamApproaching(profile, readiness);
      case 'D5': return _ruleDecliningTrends(profile);
      case 'D6': return _ruleEmergingWeakness(interventions);
      case 'D7': return _ruleFragileKnowledge(interventions);
      case 'D8': return _ruleSectionGap(readiness);
      case 'D9': return _ruleHighMastery(profile);
      case 'D10': return _ruleInsufficientData();
      default: return null;
    }
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    decide: decide,
    evaluateRule: evaluateRule
  };

})();

if (typeof window !== 'undefined') {
  window.MayDecisionEngine = MayDecisionEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayDecisionEngine;
}
