/**
 * MayInterventionCoordinator — Schedules and sequences coaching interventions.
 * 
 * Manages review cadence, prevents recommendation fatigue, and ensures balanced
 * topic coverage across coaching sessions. Consumes the intervention priority queue
 * from MayInterventionPrioritizer and recurrence data from MayLearnerState.
 * 
 * Session: MAY-006 — Adaptive Coaching Orchestrator
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: Gated by ENABLE_ADAPTIVE_ORCHESTRATION via orchestrator
 */

const MayInterventionCoordinator = (function() {
  'use strict';

  // ── Scheduling constants ──────────────────────────────────────

  var COOLDOWN_SESSIONS = 3;     // Minimum sessions before re-recommending a topic
  var MAX_REMEDIATION_SLOTS = 3; // Max remediation topics per schedule
  var STUDIED_RECENTLY_WINDOW = 2; // Sessions considered "recently studied"

  // ── Topic rotation ordering ───────────────────────────────────

  var TOPIC_ROTATION_ORDER = ['remediation', 'targeted', 'consolidation', 'challenge', 'exploratory'];

  // ── Private helpers ────────────────────────────────────────────

  function _getRecurrenceData() {
    try {
      if (typeof MayLearnerState !== 'undefined' && MayLearnerState.getRecommendationRecurrence) {
        return MayLearnerState.getRecommendationRecurrence();
      }
    } catch (e) {}
    return null;
  }

  function _isInCooldown(topic, recurrence) {
    if (!recurrence || !recurrence.byTopic) return false;
    var rec = recurrence.byTopic[topic];
    if (!rec) return false;
    if (rec.recurrenceAdjustment === 'deprioritize') return true;
    if (rec.sessionsSinceRecommended !== null && rec.sessionsSinceRecommended < COOLDOWN_SESSIONS) return true;
    return false;
  }

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Build an intervention schedule: ordered, sequenced, cooldown-aware.
   * 
   * @param {Object} interventions — PriorityQueue from MayInterventionPrioritizer.rank()
   * @param {Object} profile — LearnerProfile from MayLearnerProfile.build()
   * @param {Object} decision — Decision from MayDecisionEngine.decide()
   * @returns {Object} Schedule object
   * 
   * {
   *   immediate: { topic, action, mode, tier, rationale },
   *   queue: [ { sequence, topic, tier, action, mode, cooldownStatus } ],
   *   deferred: [ { topic, tier, reason } ],
   *   cadence: { sessionsBetweenReviews, maxTopicsPerSession },
   *   _meta: { coordinatorVersion, computedAt }
   * }
   */
  function buildSchedule(interventions, profile, decision) {
    var recurrence = _getRecurrenceData();
    var scheduled = [];
    var deferred = [];
    var immediate = null;

    if (!interventions || !interventions.queue || interventions.queue.length === 0) {
      return _emptySchedule();
    }

    // Determine the immediate action from the decision engine
    if (decision) {
      immediate = {
        topic: decision.topic,
        action: decision.action,
        mode: decision.coachingMode,
        priority: decision.priority,
        rationale: decision.rationale
      };
    }

    // Build sequenced queue
    interventions.queue.forEach(function(iv, idx) {
      if (!iv.topic) return;
      // Skip the immediate action topic (already scheduled)
      if (immediate && immediate.topic === iv.topic) return;

      var inCooldown = _isInCooldown(iv.topic, recurrence);

      if (inCooldown) {
        deferred.push({
          topic: iv.topic,
          tier: iv.tierLabel || ('Tier ' + iv.tier),
          reason: 'In cooldown — recently recommended or practiced'
        });
        return;
      }

      if (scheduled.length >= MAX_REMEDIATION_SLOTS) return;

      scheduled.push({
        sequence: scheduled.length + 1,
        topic: iv.topic,
        tier: iv.tier,
        tierLabel: iv.tierLabel,
        priorityScore: iv.priorityScore,
        action: iv.recommendedAction,
        mode: _modeForTier(iv.tier),
        cooldownStatus: 'clear'
      });
    });

    return {
      immediate: immediate,
      queue: scheduled.slice(0, MAX_REMEDIATION_SLOTS),
      deferred: deferred,
      cadence: {
        sessionsBetweenReviews: COOLDOWN_SESSIONS,
        maxTopicsPerSession: MAX_REMEDIATION_SLOTS
      },
      _meta: {
        coordinatorVersion: 'MAY006-1.0',
        computedAt: new Date().toISOString(),
        totalInQueue: interventions.totalCandidates,
        topicsInCooldown: deferred.length
      }
    };
  }

  function _modeForTier(tier) {
    switch (tier) {
      case 1: return 'QUIZ';
      case 2: return 'QUIZ';
      case 3: return 'EXPLAIN';
      case 4: return 'QUIZ';
      case 5: return 'STUDY_PLAN';
      default: return 'EXPLAIN';
    }
  }

  function _emptySchedule() {
    return {
      immediate: null,
      queue: [],
      deferred: [],
      cadence: { sessionsBetweenReviews: COOLDOWN_SESSIONS, maxTopicsPerSession: MAX_REMEDIATION_SLOTS },
      _meta: {
        coordinatorVersion: 'MAY006-1.0',
        computedAt: new Date().toISOString(),
        totalInQueue: 0,
        topicsInCooldown: 0
      }
    };
  }

  /**
   * Get the recommended coaching cadence for the learner.
   * @param {Object} profile — LearnerProfile
   * @returns {Object} Cadence recommendations
   */
  function getCadence(profile) {
    var sessionsPerWeek = 0;
    if (profile) {
      sessionsPerWeek = profile.sessionsLast7Days || 0;
    }

    var recommendation;
    if (sessionsPerWeek >= 5) {
      recommendation = 'Maintain current pace — 5+ sessions/week is sufficient for exam preparation.';
    } else if (sessionsPerWeek >= 3) {
      recommendation = 'Good momentum. Consider adding one more session per week to accelerate readiness.';
    } else if (sessionsPerWeek >= 1) {
      recommendation = 'Light practice. Aim for 3 sessions/week for consistent improvement.';
    } else {
      recommendation = 'No recent sessions. Start with 2–3 sessions/week to build momentum.';
    }

    return {
      sessionsLast7Days: sessionsPerWeek,
      recommendation: recommendation,
      suggestedTopicsPerSession: Math.min(3, Math.max(1, sessionsPerWeek))
    };
  }

  /**
   * Detect recommendation fatigue — are the same topics being recommended repeatedly?
   * @param {Object} interventions — Current intervention queue
   * @returns {Object} Fatigue assessment
   */
  function detectFatigue(interventions) {
    var recurrence = _getRecurrenceData();
    var inCooldown = 0;
    var total = (interventions && interventions.queue) ? interventions.queue.length : 0;

    if (interventions && interventions.queue && recurrence) {
      interventions.queue.forEach(function(iv) {
        if (iv.topic && _isInCooldown(iv.topic, recurrence)) inCooldown++;
      });
    }

    var fatigueRatio = total > 0 ? inCooldown / total : 0;

    var assessment;
    if (fatigueRatio > 0.5) {
      assessment = 'High fatigue — ' + inCooldown + '/' + total + ' topics are in cooldown. Expand to less-practiced sections.';
    } else if (fatigueRatio > 0.25) {
      assessment = 'Moderate fatigue — ' + inCooldown + '/' + total + ' topics in cooldown. Consider exploring new blueprint areas.';
    } else if (total === 0) {
      assessment = 'Insufficient data for fatigue assessment.';
    } else {
      assessment = 'Low fatigue — recommendations remain fresh.';
    }

    return {
      fatigueLevel: fatigueRatio > 0.5 ? 'high' : (fatigueRatio > 0.25 ? 'moderate' : 'low'),
      topicsInCooldown: inCooldown,
      totalTopics: total,
      assessment: assessment
    };
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    buildSchedule: buildSchedule,
    getCadence: getCadence,
    detectFatigue: detectFatigue,
    COOLDOWN_SESSIONS: COOLDOWN_SESSIONS,
    MAX_REMEDIATION_SLOTS: MAX_REMEDIATION_SLOTS
  };

})();

if (typeof window !== 'undefined') {
  window.MayInterventionCoordinator = MayInterventionCoordinator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayInterventionCoordinator;
}
