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

  // ── W5 — Socratic guard (Phase 2.1, token may_v2_1_socratic_guard) ────
  // Q3: Opt-out for practice mode; opt-in for exam-integrity mode.
  // D2(a–d): Socratic must not appear during (a) active exam timer,
  //          (b) between case items, (c) exam-integrity review screens,
  //          (d) when learner has stated P2-intent and recommendation
  //          would skip a P2 sub-topic.
  // HS-4: Enforcement at orchestration layer. Downstream consumers
  //       (may-core.js:_socraticFollowUp, modes/mode-socratic.js)
  //       MUST call MayCoachingOrchestrator.isSocraticAllowed() before
  //       invocation. Pause carve-out: pause flips pauseActive=true;
  //       resume flips pauseActive=false; Socratic is suppressed
  //       throughout the paused window per AGENTS §19.1.
  var _socraticGuard = {
    practiceDefaultOn: true,         // Q3: opt-out for practice
    examIntegrityOptIn: false,       // Q3: opt-in for exam-integrity
    firstUseEmitted: false,          // socratic_toggle_first_use once-per-session
    lastToggleAt: null,
    lastToggleChoice: null,
    pauseActive: false,
    lastPauseChangeAt: null
  };

  function _nowSafe() {
    try { return new Date().toISOString(); } catch (e) { return null; }
  }

  function isSocraticAllowed(context) {
    context = context || {};
    // D2(a): no Socratic during active exam timer (AGENTS §19.1)
    if (context.activeExamTimer === true) return false;
    // D2(c): no Socratic during exam-integrity review screens (AGENTS §19.3)
    if (context.examIntegrityReview === true) return false;
    // D2(b): no Socratic between items within a single case
    if (context.betweenCaseItems === true) return false;
    // Pause carve-out: Socratic suppressed during pause window
    if (_socraticGuard.pauseActive) return false;
    // Q3: exam-integrity mode requires explicit opt-in
    if (context.examIntegrityMode === true && !context.socraticOptedIn) return false;
    return _socraticGuard.practiceDefaultOn;
  }

  function setPauseState(isPaused) {
    _socraticGuard.pauseActive = !!isPaused;
    _socraticGuard.lastPauseChangeAt = _nowSafe();
  }

  function getPauseState() {
    return _socraticGuard.pauseActive;
  }

  function recordSocraticToggle(userChoice, context) {
    var choice = !!userChoice;
    if (!_socraticGuard.firstUseEmitted) {
      _socraticGuard.firstUseEmitted = true;
      _socraticGuard.lastToggleAt = _nowSafe();
      _socraticGuard.lastToggleChoice = choice;
      try {
        if (typeof MayTelemetry !== 'undefined') {
          var examPart = 'P1';
          try { examPart = (typeof getExamPart === 'function') ? getExamPart() : 'P1'; }
          catch (e) { /* default P1 */ }
          MayTelemetry.trackAdoption({
            recommendationType: 'socratic_toggle_first_use',
            panelOpened: true,
            clicked: choice,
            examPart: examPart,
            contextMode: (context && context.examIntegrityMode) ? 'exam-integrity' : 'practice'
          });
        }
      } catch (e) { /* telemetry non-blocking */ }
    } else {
      _socraticGuard.lastToggleAt = _nowSafe();
      _socraticGuard.lastToggleChoice = choice;
    }
    return _socraticGuard;
  }

  function getSocraticGuard() {
    return {
      practiceDefaultOn: _socraticGuard.practiceDefaultOn,
      examIntegrityOptIn: _socraticGuard.examIntegrityOptIn,
      firstUseEmitted: _socraticGuard.firstUseEmitted,
      lastToggleAt: _socraticGuard.lastToggleAt,
      lastToggleChoice: _socraticGuard.lastToggleChoice,
      pauseActive: _socraticGuard.pauseActive,
      lastPauseChangeAt: _socraticGuard.lastPauseChangeAt
    };
  }

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
  // W6 chaos state (hoisted for orchestrate closure)
  // May 2.5 Track 1 (may_2_5_track1): chaosClear also clears the
  // orchestrator degradation source so the pill/T6/log stay truthful.
  var _chaosInjected = null;
  function chaosInject(stage) { _chaosInjected = stage || 'chaos-injected'; try { window.__mayChaosLastInjected = _chaosInjected; } catch(e){} return _chaosInjected; }
  function chaosClear() { _chaosInjected = null; try { window.__mayChaosLastInjected = null; } catch(e){} try { if (typeof MayDegradation !== 'undefined' && MayDegradation.clear) MayDegradation.clear('orchestrator'); else if (typeof window !== 'undefined' && window.MayDegradation && window.MayDegradation.clear) window.MayDegradation.clear('orchestrator'); } catch(e){} }

  function orchestrate() {
    if (!_isEnabled()) return null;

    var degraded = [];
    var flagsActive = [];
    // W6 chaos: if injected, force degraded non-empty for DL-060 + T6 verification (one-shot)
    if (_chaosInjected) { degraded.push('chaos:' + _chaosInjected); _chaosInjected = null; }
    if (_adaptiveCoachingEnabled()) flagsActive.push('ENABLE_ADAPTIVE_COACHING');
    else degraded.push('flags-off:ENABLE_ADAPTIVE_COACHING'); // DL-060: flags-off = reduced coaching
    if (_readinessScoringEnabled()) flagsActive.push('ENABLE_READINESS_SCORING');
    else degraded.push('flags-off:ENABLE_READINESS_SCORING'); // DL-060
    flagsActive.push('ENABLE_ADAPTIVE_ORCHESTRATION');

    // ── Run pipeline stages ──
    var profile = _stageProfile(degraded);
    if (!profile) {
      // ── W6 (token may_v2_1_may_avatar) — DL-060 hook on early-return path ─
      try {
        if (typeof window !== 'undefined' && typeof window.MayOnPipelineResult === 'function') {
          window.MayOnPipelineResult({
            degraded: degraded.slice(),
            flagsActive: flagsActive.slice(),
            decision: null,
            orchestratorVersion: 'MAY019-1.0',
            earlyReturn: true
          });
        }
      } catch (e) { /* hook non-blocking */ }
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
            // S120 — Also write to cmaProfile2026 (SSOT)
            try { if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('mayPilotTelemetry', { events: fullBuffer, snapshot: snap }); } catch (e) {}
            var archive = [];
            try {
              var existing = JSON.parse(localStorage.getItem('cmaMayPilotTelemetryArchive') || '[]');
              archive = existing;
            } catch (eParse) { /* start fresh */ }
            archive.push({ sessionId: sessId, timestamp: new Date().toISOString(), eventCount: fullBuffer.length, events: fullBuffer, snapshot: snap });
            if (archive.length > 50) archive = archive.slice(-50);
            localStorage.setItem('cmaMayPilotTelemetryArchive', JSON.stringify(archive));
            // S120 — Also write archive to cmaProfile2026 (SSOT)
            try { if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('mayPilotTelemetryArchive', archive); } catch (e) {}
          }
        } catch (ePersist) { /* persistence non-blocking */ }
      }
    } catch (e) { /* telemetry non-blocking */ }

    // ── W6 (token may_v2_1_graceful_degradation_indicator) — DL-060 hook + T6 emit ──
    // Fire the global hook AFTER the pipeline has completed and degraded
    // is finalized. may-core.js registers MayOnPipelineResult during
    // init() and uses it to flip MayAvatar into the `reduced` pose when
    // any pipeline stage failed (DL-060 state-indicator truthfulness).
    // Also emit T6 trackDegradation for threshold calibration (W6 Day 30,
    // overridden to Day 0 via synthetic baseline). Non-blocking.
    try {
      if (typeof window !== 'undefined' && typeof window.MayOnPipelineResult === 'function') {
        window.MayOnPipelineResult({
          degraded: degraded.slice(),
          flagsActive: flagsActive.slice(),
          decision: decision,
          orchestratorVersion: 'MAY019-1.0'
        });
      }
    } catch (e) { /* hook non-blocking */ }
    // W6 T6: the MayOnPipelineResult → MayDegradation.report funnel above
    // already emits T6 with the indicatorVisible bit (May 2.5 Track 1).
    // This direct emit is fallback-only for contexts where the pill
    // manager is unavailable (unit probes, load-order gaps) — DL-060 C.
    try {
      var _pillManaged = (typeof MayDegradation !== 'undefined' && MayDegradation.report) ||
        (typeof window !== 'undefined' && window.MayDegradation && window.MayDegradation.report);
      if (degraded.length > 0 && !_pillManaged && typeof MayTelemetry !== 'undefined' && MayTelemetry.trackDegradation) {
        MayTelemetry.trackDegradation({
          stage: 'orchestrator',
          reason: degraded.join('; ').slice(0, 200),
          recoverable: true,
          indicatorVisible: false
        });
      }
    } catch (e) { /* T6 non-blocking */ }

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
        degradedComponents: degraded,
        socraticGuard: getSocraticGuard()
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
    FLAG: FLAG,
    // W5 Socratic guard (Phase 2.1, token may_v2_1_socratic_guard)
    isSocraticAllowed: isSocraticAllowed,
    setPauseState: setPauseState,
    getPauseState: getPauseState,
    recordSocraticToggle: recordSocraticToggle,
    getSocraticGuard: getSocraticGuard,
    // W6 Chaos harness (Phase 2.1, token may_v2_1_graceful_degradation_indicator)
    chaosInject: chaosInject,
    chaosClear: chaosClear
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingOrchestrator = MayCoachingOrchestrator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingOrchestrator;
}
