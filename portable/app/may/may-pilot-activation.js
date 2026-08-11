/**
 * may-pilot-activation.js — Controlled pilot activation for MAY-017.
 * 
 * Activates May adaptive coaching features via feature flags while keeping
 * all LLM providers disabled. This is a controlled pilot, not production.
 * 
 * Session: MAY-017
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 * Rollback: Comment out the <script> tag in index_updated.html
 * 
 * Enabled:
 *   CMA_MAY_PILOT=1 → tutoringPilotEnabled + CONTEXT_BUILDER + COACHING_ROUTER
 *   ENABLE_ADAPTIVE_COACHING → adaptive recommender + readiness scorer
 *   ENABLE_READINESS_SCORING → readiness engine + intervention prioritizer
 *   ENABLE_ADAPTIVE_ORCHESTRATION → orchestration + decision + pipeline
 * 
 * Disabled:
 *   ENABLE_LLM, ENABLE_LLM_COACHING, ENABLE_LLM_SUMMARIES
 *   ENABLE_AZURE_OPENAI_PROVIDER, ENABLE_OPENAI_PROVIDER
 *   ENABLE_COACHING_MEMORY (deferred to future pilot phase)
 */

(function() {
  'use strict';

  var ACTIVATED_AT = new Date().toISOString();
  var PILOT_VERSION = 'MAY017-1.0';

  function _log(msg) {
    try { console.log('[MAY-017 Pilot]', msg); } catch (e) {}
  }

  function _warn(msg) {
    try { console.warn('[MAY-017 Pilot]', msg); } catch (e) {}
  }

  // ═══ Stage 0 — Pilot Gate ═══
  // Activate isPilotEnvironment() → unlocks May coaching UI features
  if (typeof May !== 'undefined' && May.config) {
    May.config.tutoringPilotEnabled = true;
    _log('Pilot gate activated: tutoringPilotEnabled = true');
  } else {
    _warn('May.config not available — pilot gate not set');
  }

  // ═══ Stage 0 — Feature Flags (CMA_MAY_PILOT=1 equivalent) ═══
  if (typeof MayFeatureFlags !== 'undefined') {
    MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', true);
    MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', true);
    _log('Stage 0 flags: CONTEXT_BUILDER + COACHING_ROUTER');
  } else {
    _warn('MayFeatureFlags not available — stage 0 flags not set');
  }

  // ═══ Stage 2 — Adaptive Pipeline ═══
  if (typeof MayFeatureFlags !== 'undefined') {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', true);
    _log('Stage 2 flags: ADAPTIVE_COACHING + READINESS_SCORING + ADAPTIVE_ORCHESTRATION');
  }

  // ═══ Stage 3 — LLM Flags (explicitly OFF) ═══
  if (typeof MayFeatureFlags !== 'undefined') {
    MayFeatureFlags.setFlag('ENABLE_LLM', false);
    MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);
    MayFeatureFlags.setFlag('ENABLE_LLM_SUMMARIES', false);
    MayFeatureFlags.setFlag('ENABLE_AZURE_OPENAI_PROVIDER', false);
    MayFeatureFlags.setFlag('ENABLE_OPENAI_PROVIDER', false);
    _log('Stage 3 flags: LLM disabled (confirmed)');
  }

  // ═══ Coaching Memory — Deferred ═══
  if (typeof MayFeatureFlags !== 'undefined') {
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);
    _log('ENABLE_COACHING_MEMORY: deferred (not in pilot scope)');
  }

  // ═══ Debug Mode — Enable telemetry console logging ═══
  if (typeof May !== 'undefined' && May.config) {
    May.config.debug = true;
    _log('Debug mode enabled — telemetry console logging active');
  }

  // ═══ Diagnostics Object — exposed at window.__mayPilot ═══
  var diagnostics = {
    version: PILOT_VERSION,
    activatedAt: ACTIVATED_AT,
    flags: function() {
      try {
        return typeof MayFeatureFlags !== 'undefined' ? MayFeatureFlags.getAll() : null;
      } catch (e) { return null; }
    },
    telemetry: function() {
      try {
        return typeof MayTelemetry !== 'undefined' ? MayTelemetry.snapshot() : null;
      } catch (e) { return null; }
    },
    state: function() {
      try {
        if (typeof May !== 'undefined' && May.isPilotEnvironment) {
          return {
            pilotActive: May.isPilotEnvironment(),
            tutorActive: May.config.tutoringPilotEnabled,
            sessionActive: May.context ? May.context.sessionActive : null
          };
        }
        return null;
      } catch (e) { return null; }
    },
    orchestratorReady: function() {
      try {
        if (typeof MayCoachingOrchestrator !== 'undefined' && MayCoachingOrchestrator.readinessCheck) {
          return MayCoachingOrchestrator.readinessCheck();
        }
        return null;
      } catch (e) { return null; }
    },
    healthReport: function() {
      return {
        version: PILOT_VERSION,
        activatedAt: ACTIVATED_AT,
        flags: this.flags(),
        telemetry: this.telemetry(),
        state: this.state(),
        orchestrator: this.orchestratorReady(),
        modules: {
          MayFeatureFlags: typeof MayFeatureFlags !== 'undefined',
          MayTelemetry: typeof MayTelemetry !== 'undefined',
          May: typeof May !== 'undefined',
          MayLearnerState: typeof MayLearnerState !== 'undefined',
          MayAdaptiveRecommender: typeof MayAdaptiveRecommender !== 'undefined',
          MayReadinessEngine: typeof MayReadinessEngine !== 'undefined',
          MayDecisionEngine: typeof MayDecisionEngine !== 'undefined',
          MayCoachingOrchestrator: typeof MayCoachingOrchestrator !== 'undefined'
        }
      };
    }
  };

  if (typeof window !== 'undefined') {
    window.__mayPilot = diagnostics;
  }

  _log('MAY-017 pilot activation complete. Diagnostics: window.__mayPilot.healthReport()');
  _log('Telemetry snapshot: window.__mayPilot.telemetry()');

})();
