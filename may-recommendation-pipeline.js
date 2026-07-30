/**
 * MayRecommendationPipeline — Output normalization for the coaching router.
 * 
 * Consumes outputs from all upstream subsystems (profile, readiness, recommendations,
 * interventions, explanations, decision) and produces a single router-ready payload
 * consumable by MayCoachingRouter.dispatchToHandler().
 * 
 * Session: MAY-006 — Adaptive Coaching Orchestrator
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: Gated by ENABLE_ADAPTIVE_ORCHESTRATION via orchestrator
 */

const MayRecommendationPipeline = (function() {
  'use strict';

  // ── Private helpers ────────────────────────────────────────────

  function _buildCoachingContext(profile, readiness, decision) {
    var context = {
      learner: {
        overallAccuracy: 0,
        totalAttempts: 0,
        weaknessClusters: [],
        topicPerformance: {},
        readinessBands: {},
        sectionReadiness: {}
      }
    };

    if (profile) {
      context.learner.overallAccuracy = _computeOverallAccuracy(profile);
      context.learner.totalAttempts = profile.totalAttempts || 0;
      context.learner.weaknessClusters = _buildWeaknessClusters(profile);
      context.learner.topicPerformance = _buildTopicPerformance(profile);
    }

    if (readiness && readiness.perSection) {
      Object.keys(readiness.perSection).forEach(function(sec) {
        context.learner.sectionReadiness[sec] = readiness.perSection[sec].band;
      });
    }

    if (profile && profile.readinessScore && profile.readinessScore.perSection) {
      Object.keys(profile.readinessScore.perSection).forEach(function(sec) {
        context.learner.readinessBands[sec] = profile.readinessScore.perSection[sec].band;
      });
    }

    // Coaching mode hint for the router
    if (decision) {
      context.recommendedCoachingMode = _modeHintForDecision(decision);
    }

    return context;
  }

  function _computeOverallAccuracy(profile) {
    if (!profile.masteryLevels) return 0;
    var sum = 0, count = 0;
    Object.keys(profile.masteryLevels).forEach(function(topic) {
      var ml = profile.masteryLevels[topic];
      if (ml.accuracy !== null && ml.accuracy !== undefined && ml.attempts >= 3) {
        sum += ml.accuracy * ml.attempts;
        count += ml.attempts;
      }
    });
    return count > 0 ? Math.round(sum / count) : 0;
  }

  function _buildWeaknessClusters(profile) {
    var clusters = [];
    (profile.weaknesses || []).forEach(function(w) {
      clusters.push({
        topic: w.topic,
        accuracy: w.accuracy,
        attempts: w.attempts,
        recentTrend: w.recentTrend || 'stable'
      });
    });
    return clusters;
  }

  function _buildTopicPerformance(profile) {
    var perf = {};
    if (profile.masteryLevels) {
      Object.keys(profile.masteryLevels).forEach(function(topic) {
        var ml = profile.masteryLevels[topic];
        perf[topic] = {
          accuracy: ml.accuracy,
          attempts: ml.attempts,
          stability: ml.stability,
          direction: ml.direction,
          band: ml.band
        };
      });
    }
    return perf;
  }

  function _modeHintForDecision(decision) {
    switch (decision.action) {
      case 'remediation':
      case 'quiz':
      case 'challenge':
        return 'post_session_review';
      case 'study_plan':
        return 'exam_briefing';
      case 'socratic':
      case 'explain':
      case 'exploratory':
      default:
        return null;
    }
  }

  function _summarizeRecommendations(recommendations) {
    if (!recommendations || recommendations.length === 0) return [];
    return recommendations.map(function(r) {
      return {
        type: r.type,
        priority: r.priority,
        topic: r.topic,
        summary: r.rationale || ('Recommended action: ' + r.type + ' for ' + (r.topic || 'general'))
      };
    });
  }

  function _summarizeInterventions(interventions) {
    if (!interventions || !interventions.queue) return { topActions: [], priorityDistribution: {} };
    var topActions = interventions.queue.slice(0, 5).map(function(iv) {
      return {
        topic: iv.topic,
        tier: iv.tierLabel,
        priorityScore: iv.priorityScore,
        action: iv.recommendedAction
      };
    });
    var dist = {};
    interventions.queue.forEach(function(iv) {
      var label = iv.tierLabel || ('Tier ' + iv.tier);
      dist[label] = (dist[label] || 0) + 1;
    });
    return { topActions: topActions, priorityDistribution: dist };
  }

  function _summarizeReadiness(readiness) {
    if (!readiness) return { score: null, band: 'Not available', coverage: {} };
    return {
      score: readiness.readinessScore,
      band: readiness.band,
      confidence: readiness.confidence,
      coverage: readiness.topicCoverage || {},
      riskCount: (readiness.riskAreas || []).length
    };
  }

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Build a router-ready payload from all upstream subsystem outputs.
   * 
   * @param {Object} profile — LearnerProfile
   * @param {Object|null} readiness — ReadinessSnapshot
   * @param {Array} recommendations — Action[]
   * @param {Object|null} interventions — PriorityQueue
   * @param {Array} explanations — Explanation[]
   * @param {Object|null} decision — Decision
   * @param {Array} recoveryPlan — PlanEntry[]
   * @returns {Object} Router-ready payload
   */
  function buildPayload(profile, readiness, recommendations, interventions, explanations, decision, recoveryPlan) {
    var coachingContext = _buildCoachingContext(profile, readiness, decision);

    return {
      coachingContext: coachingContext,
      decision: decision ? {
        action: decision.action,
        coachingMode: decision.coachingMode,
        priority: decision.priority,
        topic: decision.topic,
        rationale: decision.rationale
      } : null,
      summary: {
        readiness: _summarizeReadiness(readiness),
        recommendations: _summarizeRecommendations(recommendations),
        interventions: _summarizeInterventions(interventions),
        explanations: explanations.map(function(e) {
          return { topic: e.topic, tier: e.tierLabel, action: e.recommendedAction };
        }),
        recoveryPlan: recoveryPlan.map(function(p) {
          return { topic: p.topic, section: p.section, count: p.count, difficulty: p.difficulty };
        })
      },
      raw: {
        profile: profile,
        readiness: readiness,
        recommendations: recommendations,
        interventions: interventions,
        explanations: explanations,
        recoveryPlan: recoveryPlan
      },
      _meta: {
        pipelineVersion: 'MAY006-1.0',
        computedAt: new Date().toISOString(),
        isRouterReady: !!(decision && decision.coachingMode)
      }
    };
  }

  /**
   * Generate a human-readable coaching summary string.
   * 
   * @param {Object} payload — Output from buildPayload()
   * @returns {string} Human-readable summary
   */
  function summarize(payload) {
    if (!payload) return 'Coaching summary unavailable.';

    var parts = [];

    var rs = payload.summary.readiness;
    if (rs && rs.score !== null) {
      parts.push('Readiness: ' + rs.score + '/100 (' + rs.band + ')');
    }

    var ri = payload.summary.interventions;
    if (ri && ri.topActions && ri.topActions.length > 0) {
      parts.push('Top priorities: ' + ri.topActions.map(function(a) {
        return a.topic + ' (' + a.tier + ')';
      }).join(', '));
    }

    if (payload.decision) {
      parts.push('Next action: ' + payload.decision.action + ' mode on ' +
        (payload.decision.topic || 'general topics'));
    }

    return parts.length > 0 ? parts.join('. ') + '.' : 'More practice data is needed.';
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    buildPayload: buildPayload,
    summarize: summarize
  };

})();

if (typeof window !== 'undefined') {
  window.MayRecommendationPipeline = MayRecommendationPipeline;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayRecommendationPipeline;
}
