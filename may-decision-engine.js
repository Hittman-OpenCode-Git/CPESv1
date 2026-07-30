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

  // D2: High-Priority Weakness — Tier 1 intervention exists
  function _ruleCriticalWeakness(interventions) {
    if (!interventions || !interventions.queue || interventions.queue.length === 0) return null;
    var top = interventions.topAction;
    if (!top) return null;
    if (top.tier === 1) {
      return {
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
    }
    return null;
  }

  // D3: Repeated Weakness with Instability — weak + unstable + declining
  function _ruleRepeatedUnstable(profile, interventions) {
    if (!profile) return null;
    var weaknesses = profile.weaknesses || [];
    if (weaknesses.length === 0) return null;
    // Find weakest topic by accuracy that also has declining trend + low stability
    var candidate = null;
    weaknesses.forEach(function(w) {
      var ml = profile.masteryLevels && profile.masteryLevels[w.topic];
      if (!ml) return;
      if (ml.stability !== null && ml.stability < 50 &&
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
      rationale: 'Repeated errors on ' + candidate.topic + ' with unstable, declining performance (accuracy: ' + (candidate.mlAccuracy || '?') + '%, stability: ' + (candidate.mlStability || '?') + '). Socratic questioning targets process-level misunderstanding.',
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
    if (dataSections < 4) {
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

    result = _ruleCriticalWeakness(interventions);
    if (result) return _attachMeta(result);

    result = _ruleRepeatedUnstable(profile, interventions);
    if (result) return _attachMeta(result);

    result = _ruleExamApproaching(profile, readiness);
    if (result) return _attachMeta(result);

    result = _ruleDecliningTrends(profile);
    if (result) return _attachMeta(result);

    result = _ruleEmergingWeakness(interventions);
    if (result) return _attachMeta(result);

    result = _ruleFragileKnowledge(interventions);
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
      decisionEngineVersion: 'MAY006-1.0',
      computedAt: new Date().toISOString()
    };
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
