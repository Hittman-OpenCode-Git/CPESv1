/**
 * MayCoachingOrchestrator — Top-level pipeline coordinator for the adaptive coaching system.
 * 
 * Chains all MAY-001 through MAY-005 subsystems into a single orchestration pipeline.
 * Produces a complete coaching package: profile, readiness, recommendations,
 * interventions, explanations, and the next coaching action.
 * 
 * Session: MAY-006 — Adaptive Coaching Orchestrator
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_ADAPTIVE_ORCHESTRATION (default: false)
 *   Also requires: ENABLE_ADAPTIVE_COACHING for profile + recommender
 *   Optionally:    ENABLE_READINESS_SCORING for readiness + intervention + explainer
 */

const MayCoachingOrchestrator = (function() {
  'use strict';

  var FLAG = 'ENABLE_ADAPTIVE_ORCHESTRATION';

  function _isEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled(FLAG);
      }
    } catch (e) {}
    return false;
  }

  function _adaptiveCoachingEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING');
      }
    } catch (e) {}
    return false;
  }

  function _readinessScoringEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled('ENABLE_READINESS_SCORING');
      }
    } catch (e) {}
    return false;
  }

  // ── Stage 1: Profile ──────────────────────────────────────────

  function _stageProfile(degraded) {
    if (!_adaptiveCoachingEnabled()) {
      if (degraded) degraded.push('ENABLE_ADAPTIVE_COACHING off');
      return null;
    }
    try {
      if (typeof MayLearnerProfile === 'undefined') {
        if (degraded) degraded.push('MayLearnerProfile not loaded');
        return null;
      }
      var profile = MayLearnerProfile.build();
      if (!profile) {
        if (degraded) degraded.push('MayLearnerProfile.build() returned null');
      }
      return profile;
    } catch (e) {
      if (degraded) degraded.push('MayLearnerProfile error: ' + e.message);
      return null;
    }
  }

  // ── Stage 2: Recommendations ──────────────────────────────────

  function _stageRecommendations(profile, degraded) {
    if (!profile) return [];
    try {
      if (typeof MayAdaptiveRecommender !== 'undefined') {
        var recs = MayAdaptiveRecommender.generate(profile);
        return Array.isArray(recs) ? recs : [];
      }
      if (degraded) degraded.push('MayAdaptiveRecommender not loaded');
    } catch (e) {
      if (degraded) degraded.push('MayAdaptiveRecommender error: ' + e.message);
    }
    return [];
  }

  // ── Stage 3: Remediation ──────────────────────────────────────

  function _stageRemediation(profile, degraded) {
    if (!profile) return [];
    try {
      if (typeof MayRemediationEngine !== 'undefined') {
        var plan = MayRemediationEngine.buildRecoveryPlan(profile);
        return Array.isArray(plan) ? plan : [];
      }
      if (degraded) degraded.push('MayRemediationEngine not loaded');
    } catch (e) {
      if (degraded) degraded.push('MayRemediationEngine error: ' + e.message);
    }
    return [];
  }

  // ── Stage 4: Readiness ────────────────────────────────────────

  function _stageReadiness(degraded) {
    if (!_readinessScoringEnabled()) {
      if (degraded) degraded.push('ENABLE_READINESS_SCORING off');
      return null;
    }
    try {
      if (typeof MayReadinessEngine === 'undefined') {
        if (degraded) degraded.push('MayReadinessEngine not loaded');
        return null;
      }
      var r = MayReadinessEngine.assess();
      if (!r) {
        if (degraded) degraded.push('MayReadinessEngine.assess() returned null');
      }
      return r;
    } catch (e) {
      if (degraded) degraded.push('MayReadinessEngine error: ' + e.message);
      return null;
    }
  }

  // ── Stage 5: Intervention Prioritization ──────────────────────

  function _stageInterventions(degraded) {
    if (!_readinessScoringEnabled()) {
      return null;
    }
    try {
      if (typeof MayInterventionPrioritizer === 'undefined') {
        if (degraded) degraded.push('MayInterventionPrioritizer not loaded');
        return null;
      }
      var pq = MayInterventionPrioritizer.rank();
      if (!pq) {
        if (degraded) degraded.push('MayInterventionPrioritizer.rank() returned null');
      }
      return pq;
    } catch (e) {
      if (degraded) degraded.push('MayInterventionPrioritizer error: ' + e.message);
      return null;
    }
  }

  // ── Stage 6: Explanations ─────────────────────────────────────

  function _stageExplanations(interventions, degraded) {
    if (!interventions || !interventions.queue || interventions.queue.length === 0) return [];
    var result = [];
    try {
      if (typeof MayRecommendationExplainer === 'undefined') {
        if (degraded) degraded.push('MayRecommendationExplainer not loaded');
        return result;
      }
      // Explain top 3 interventions only
      var top = interventions.queue.slice(0, 3);
      top.forEach(function(iv) {
        try {
          var exp = MayRecommendationExplainer.explain(iv);
          if (exp) result.push(exp);
        } catch (e) {}
      });
    } catch (e) {
      if (degraded) degraded.push('MayRecommendationExplainer error: ' + e.message);
    }
    return result;
  }

  // ── Stage 7: Decision ─────────────────────────────────────────

  function _stageDecision(profile, readiness, recommendations, interventions, degraded) {
    try {
      if (typeof MayDecisionEngine !== 'undefined') {
        return MayDecisionEngine.decide(profile, readiness, recommendations, interventions);
      }
      if (degraded) degraded.push('MayDecisionEngine not loaded');
    } catch (e) {
      if (degraded) degraded.push('MayDecisionEngine error: ' + e.message);
    }
    return null;
  }

  // ── Stage 8: Router-Ready Payload ─────────────────────────────

  function _stageRouterPayload(profile, readiness, recommendations, interventions, explanations, decision, recoveryPlan, degraded) {
    try {
      if (typeof MayRecommendationPipeline !== 'undefined') {
        return MayRecommendationPipeline.buildPayload(
          profile, readiness, recommendations, interventions,
          explanations, decision, recoveryPlan
        );
      }
      if (degraded) degraded.push('MayRecommendationPipeline not loaded');
    } catch (e) {
      if (degraded) degraded.push('MayRecommendationPipeline error: ' + e.message);
    }
    return null;
  }

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Execute the full orchestration pipeline.
   * 
   * @returns {Object|null} Complete coaching package, or null if orchestrator disabled
   * 
   * Returned package:
   * {
   *   profile: LearnerProfile | null,
   *   readiness: ReadinessSnapshot | null,
   *   recommendations: Action[],
   *   recoveryPlan: PlanEntry[],
   *   interventions: PriorityQueue | null,
   *   explanations: Explanation[],
   *   decision: Decision | null,
   *   nextAction: { coachingMode, topic, action, priority, evidence } | null,
   *   routerPayload: RouterPayload | null,
   *   _meta: { orchestratorVersion, computedAt, flagsActive, degradedComponents }
   * }
   */
  function orchestrate() {
    if (!_isEnabled()) return null;

    var degraded = [];
    var flagsActive = [];
    if (_adaptiveCoachingEnabled()) flagsActive.push('ENABLE_ADAPTIVE_COACHING');
    if (_readinessScoringEnabled()) flagsActive.push('ENABLE_READINESS_SCORING');
    flagsActive.push('ENABLE_ADAPTIVE_ORCHESTRATION');

    // ── Run pipeline stages ──
    var profile = _stageProfile(degraded);
    if (!profile) {
      return {
        profile: null,
        readiness: null,
        recommendations: [],
        recoveryPlan: [],
        interventions: null,
        explanations: [],
        decision: null,
        nextAction: null,
        routerPayload: null,
        _meta: {
          orchestratorVersion: 'MAY019-1.0',
          computedAt: new Date().toISOString(),
          flagsActive: flagsActive,
          degradedComponents: degraded,
          error: 'Learner profile unavailable — pipeline aborted at Stage 1'
        }
      };
    }

    var recommendations = _stageRecommendations(profile, degraded);
    var recoveryPlan = _stageRemediation(profile, degraded);
    var readiness = _stageReadiness(degraded);
    var interventions = _stageInterventions(degraded);
    var explanations = _stageExplanations(interventions, degraded);
    var decision = _stageDecision(profile, readiness, recommendations, interventions, degraded);
    var routerPayload = _stageRouterPayload(profile, readiness, recommendations,
      interventions, explanations, decision, recoveryPlan, degraded);

    // ── Extract next action ──
    var nextAction = null;
    if (decision) {
      nextAction = {
        coachingMode: decision.coachingMode || null,
        topic: decision.topic || null,
        action: decision.action || null,
        priority: decision.priority || null,
        rationale: decision.rationale || null,
        evidence: decision.evidence || {}
      };
    }

    // MAY-017 — Telemetry collection
    try {
      if (typeof MayTelemetry !== 'undefined') {
        if (decision) {
          MayTelemetry.trackDecision({
            decisionId: decision.decisionId,
            action: decision.action,
            coachingMode: decision.coachingMode,
            priority: decision.priority,
            topic: decision.topic
          });
          // CAL-06 (MAY-019): Track mode from decision engine
          if (decision.coachingMode) {
            MayTelemetry.trackMode(decision.coachingMode, 0);
          }
        }
        if (readiness) {
          MayTelemetry.trackReadiness({
            overallBand: readiness.band,
            overallScore: readiness.readinessScore,
            topicsWithData: readiness.topicCoverage ? readiness.topicCoverage.topicsWithData : 0
          });
        }
        if (recommendations && recommendations.length > 0) {
          MayTelemetry.trackRecommendation({
            count: recommendations.length,
            topType: recommendations[0].type,
            topTopic: recommendations[0].topic,
            topPriority: recommendations[0].priority
          });
        }
        // CAL-05 (MAY-019): Track top 3 interventions
        if (interventions && interventions.queue && interventions.queue.length > 0) {
          interventions.queue.slice(0, 3).forEach(function(iv) {
            MayTelemetry.trackIntervention({
              tier: iv.tier,
              tierLabel: iv.tierLabel,
              topic: iv.topic,
              priorityScore: iv.priorityScore
            });
          });
        }
        // CAL-07 (MAY-019/MAY-027): Persist full telemetry buffer + snapshot to localStorage
        try {
          if (typeof localStorage !== 'undefined') {
            var snap = MayTelemetry.snapshot();
            var fullBuffer = MayTelemetry.drain();
            var sessId = 'sess_' + new Date().toISOString().replace(/[:.]/g, '-');
            localStorage.setItem('cmaMayPilotTelemetry', JSON.stringify({ events: fullBuffer, snapshot: snap }));
            localStorage.setItem('cmaMayPilotTelemetrySnapshot', JSON.stringify(snap));
            var archive = [];
            try {
              var existing = JSON.parse(localStorage.getItem('cmaMayPilotTelemetryArchive') || '[]');
              archive = existing;
            } catch (eParse) { /* start fresh */ }
            archive.push({ sessionId: sessId, timestamp: new Date().toISOString(), eventCount: fullBuffer.length, events: fullBuffer, snapshot: snap });
            if (archive.length > 50) archive = archive.slice(-50);
            localStorage.setItem('cmaMayPilotTelemetryArchive', JSON.stringify(archive));
          }
        } catch (ePersist) { /* persistence non-blocking */ }
      }
    } catch (e) { /* telemetry non-blocking */ }

    return {
      profile: profile,
      readiness: readiness,
      recommendations: recommendations,
      recoveryPlan: recoveryPlan,
      interventions: interventions,
      explanations: explanations,
      decision: decision,
      nextAction: nextAction,
      routerPayload: routerPayload,
      _meta: {
        orchestratorVersion: 'MAY019-1.0',
        computedAt: new Date().toISOString(),
        flagsActive: flagsActive,
        degradedComponents: degraded
      }
    };
  }

  /**
   * Run a lightweight check — is the orchestrator ready?
   * @returns {Object} { ready, missingModules, flagsRequired }
   */
  function readinessCheck() {
    var missing = [];
    if (typeof MayLearnerState === 'undefined') missing.push('MayLearnerState');
    if (typeof MayLearnerProfile === 'undefined') missing.push('MayLearnerProfile');
    if (typeof MayAdaptiveRecommender === 'undefined') missing.push('MayAdaptiveRecommender');
    if (typeof MayRemediationEngine === 'undefined') missing.push('MayRemediationEngine');
    if (typeof MayReadinessEngine === 'undefined') missing.push('MayReadinessEngine');
    if (typeof MayInterventionPrioritizer === 'undefined') missing.push('MayInterventionPrioritizer');
    if (typeof MayRecommendationExplainer === 'undefined') missing.push('MayRecommendationExplainer');
    if (typeof MayDecisionEngine === 'undefined') missing.push('MayDecisionEngine');
    if (typeof MayRecommendationPipeline === 'undefined') missing.push('MayRecommendationPipeline');

    return {
      ready: missing.length === 0,
      missingModules: missing,
      flagsRequired: ['ENABLE_ADAPTIVE_ORCHESTRATION', 'ENABLE_ADAPTIVE_COACHING', 'ENABLE_READINESS_SCORING']
    };
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    orchestrate: orchestrate,
    readinessCheck: readinessCheck,
    isEnabled: _isEnabled,
    FLAG: FLAG
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingOrchestrator = MayCoachingOrchestrator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingOrchestrator;
}
