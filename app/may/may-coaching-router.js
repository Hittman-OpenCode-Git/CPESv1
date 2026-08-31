/**
 * MayCoachingRouter — Coaching mode selection, routing, and dispatch layer.
 *
 * Defines explicit coaching modes with formalized contracts, selects the
 * appropriate mode based on structured MayContext, and dispatches to
 * mode-specific handlers when feature flags are enabled.
 *
 * Gated behind MayFeatureFlags.ENABLE_COACHING_ROUTER (default: false).
 * When disabled, May.handleAction() dispatches directly to handlers as before.
 *
 * Phase 1 (MAY-Phase-1) — enrichContext() may consult the gated LLM router
 * (`MayLLMProviderRegistry.routeWithGate()`) to derive a model-driven mode +
 * args + confidence + source. The signal augments — but never replaces —
 * the existing action-based MODE_CONTRACTS mapping. When the feature flag
 * is off, the call is equivalent to the prior action-based path.
 *
 * Session: MAY-001 (base), MAY-002 (mode contracts + handler dispatch),
 *          MAY-Phase-1 (gated LLM signal consumption)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingRouter = (function() {
  'use strict';

  /**
   * Coaching modes.
   */
  var MODE = {
    EXPLAIN:       'EXPLAIN',
    QUIZ:          'QUIZ',
    SOCRATIC:      'SOCRATIC',
    MOTIVATE:      'MOTIVATE',
    STUDY_PLAN:    'STUDY_PLAN',
    EXAM_REVIEW:   'EXAM_REVIEW'
  };

  /**
   * Action-to-mode mapping. Each May action maps to a primary coaching mode.
   * This preserves existing behavior while adding mode metadata.
   */
  var ACTION_MODE_MAP = {
    'explain':       MODE.EXPLAIN,
    'wrong-choices': MODE.EXPLAIN,
    'hint':          MODE.SOCRATIC,
    'simplify':      MODE.EXPLAIN,
    'similar':       MODE.QUIZ,
    'progress':      MODE.STUDY_PLAN,
    'weakness':      MODE.STUDY_PLAN,
    'summary':       MODE.STUDY_PLAN,
    'next':          MODE.STUDY_PLAN,
    'mymistake':     MODE.EXPLAIN,
    'recovery':      MODE.QUIZ,
    'digest':        MODE.STUDY_PLAN,
    'strategy':      MODE.STUDY_PLAN,
    'effectiveness': MODE.STUDY_PLAN,
    'chat':          MODE.SOCRATIC
  };

  /**
   * Formal mode contracts.
   * 
   * Each mode defines:
   *   - name: Mode identifier
   *   - purpose: What this coaching mode provides
   *   - triggerActions: May actions that map to this mode
   *   - requiredContext: Context fields consumed by this mode's handler
   *   - outputGuidanceType: Structure of the guidance object produced
   *   - featureFlag: Flag that gates this mode's handler (null = no dedicated flag)
   *   - fallbackBehavior: What happens when the mode is disabled or fails
   */
  var MODE_CONTRACTS = {};
  MODE_CONTRACTS[MODE.EXPLAIN] = {
    name: MODE.EXPLAIN,
    purpose: 'Provide concept explanations, step-by-step solutions, and misconception analysis',
    triggerActions: ['explain', 'wrong-choices', 'simplify', 'mymistake'],
    requiredContext: ['question.stem', 'question.correctChoice', 'question.explanationCorrect'],
    outputGuidanceType: '{ focus, principle, approach, knownWeakness?, note? }',
    featureFlag: 'ENABLE_EXPLAIN_MODE',
    fallbackBehavior: 'Use existing May._explainAnswer / May._explainWrongChoices handlers'
  };
  MODE_CONTRACTS[MODE.QUIZ] = {
    name: MODE.QUIZ,
    purpose: 'Generate adaptive quiz guidance: similar questions, targeted drills, foundational reinforcement',
    triggerActions: ['similar', 'recovery'],
    requiredContext: ['learner.weaknessClusters', 'learner.topicPerformance', 'learner.overallAccuracy'],
    outputGuidanceType: '{ type, focusDomains, recommendedCount, reason }',
    featureFlag: 'ENABLE_QUIZ_MODE',
    fallbackBehavior: 'Use existing May._recommendSimilar / May._generateRecoverySet handlers'
  };
  MODE_CONTRACTS[MODE.SOCRATIC] = {
    name: MODE.SOCRATIC,
    purpose: 'Guide learners to discover answers through targeted questioning and progressive hints',
    triggerActions: ['hint', 'chat'],
    requiredContext: ['question.stem', 'question.topic', 'question.cognitiveLevel'],
    outputGuidanceType: '{ hintLevel, questionChain, startingPrompt, scaffolding, principle }',
    featureFlag: 'ENABLE_SOCRATIC_MODE',
    fallbackBehavior: 'Use existing May._provideHint handler'
  };
  MODE_CONTRACTS[MODE.MOTIVATE] = {
    name: MODE.MOTIVATE,
    purpose: 'Provide motivational coaching: celebrate progress, frame challenges, reinforce growth mindset',
    triggerActions: [],
    requiredContext: ['learner.overallAccuracy', 'learner.totalAttempts'],
    outputGuidanceType: '{ messageType, metrics, framing, celebrationPoints, encouragementNotes }',
    featureFlag: null,
    fallbackBehavior: 'Use existing May coaching messages'
  };
  MODE_CONTRACTS[MODE.STUDY_PLAN] = {
    name: MODE.STUDY_PLAN,
    purpose: 'Generate personalized study recommendations based on readiness, weaknesses, and exam timeline',
    triggerActions: ['progress', 'weakness', 'summary', 'next', 'digest', 'strategy', 'effectiveness'],
    requiredContext: ['learner.readinessBands', 'learner.weaknessClusters', 'learner.sectionReadiness'],
    outputGuidanceType: '{ focusAreas, recommendedActions, priorityOrder, estimatedMinutes }',
    featureFlag: 'ENABLE_STUDY_PLAN_MODE',
    fallbackBehavior: 'Use existing May._getProgressInsight / May._getWeaknessInsight handlers'
  };
  MODE_CONTRACTS[MODE.EXAM_REVIEW] = {
    name: MODE.EXAM_REVIEW,
    purpose: 'Analyze completed session results, identify error patterns, and recommend next-study focus areas',
    triggerActions: [],
    requiredContext: ['session.isCompleted', 'session.totalQuestions', 'learner.weaknessClusters'],
    outputGuidanceType: '{ sessionAnalysis, errorPatterns, nextSteps }',
    featureFlag: null,
    fallbackBehavior: 'Use existing May._summarizeSession handler'
  };

  /**
   * Get the formal contract for a coaching mode.
   * 
   * @param {string} modeName
   * @returns {Object|null} mode contract or null if not found
   */
  function getModeContract(modeName) {
    return MODE_CONTRACTS[modeName] || null;
  }

  /**
   * Get all registered mode contracts.
   * 
   * @returns {Object} { MODE_NAME: contract, ... }
   */
  function getAllModeContracts() {
    var result = {};
    for (var k in MODE_CONTRACTS) {
      if (MODE_CONTRACTS.hasOwnProperty(k)) {
        result[k] = MODE_CONTRACTS[k];
      }
    }
    return result;
  }

  /**
   * Dispatch coaching request to the appropriate mode handler via MayCoachingModeBase.
   * 
   * This is the integration point between the router (which selects a mode)
   * and the mode handlers (which process the request). When a handler is not
   * available or returns fallback, this function returns null — the caller
   * should then use the existing May handler as before.
   * 
   * @param {Object} mayContext — Full MayContext
   * @param {Object} routing — Routing result from route() or enrichContext()
   * @returns {Object|null} CoachingResponse or null (use fallback)
   */
  function dispatchToHandler(mayContext, routing) {
    if (!routing || !routing.mode) return null;

    // CAL-06 (MAY-019): Track mode from router dispatch path
    try {
      if (typeof MayTelemetry !== 'undefined') {
        MayTelemetry.trackMode(routing.mode, 0);
      }
    } catch (e) {}

    try {
      // MAY-004: Enrich context with adaptive learner profile when coaching flag is on
      var enriched = _enrichWithProfile(mayContext);

      if (typeof MayCoachingModeBase !== 'undefined') {
        var result = MayCoachingModeBase.dispatch(enriched, routing);
        if (result) return result;
      }
    } catch (e) { /* silent — never interrupt existing workflows */ }

    return null;
  }

  function _enrichWithProfile(mayContext) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' &&
          MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING') &&
          typeof MayLearnerProfile !== 'undefined') {
        var profile = MayLearnerProfile.build();
        if (profile) {
          mayContext = mayContext || {};
          mayContext._adaptiveProfile = profile;
        }
      }
    } catch (e) {}
    return mayContext;
  }

  /**
   * Select coaching mode based on full context + learner action.
   * 
   * @param {Object} mayContext — Full MayContext from MayContextBuilder.buildFullContext()
   * @param {string} action — The learner action (e.g. 'explain', 'hint', 'progress')
   * @returns {Object} { mode, confidence, reason }
   */
  function route(mayContext, action) {
    var mode = ACTION_MODE_MAP[action] || MODE.EXPLAIN;
    var confidence = 1.0;
    var reason = 'direct action mapping';

    if (mayContext && mayContext.recommendedCoachingMode) {
      var recommended = mayContext.recommendedCoachingMode;
      if (recommended === 'exam_briefing') {
        mode = MODE.EXAM_REVIEW;
        reason = 'context override: exam briefing mode';
        confidence = 0.9;
      } else if (recommended === 'post_session_review') {
        mode = MODE.EXAM_REVIEW;
        reason = 'context override: post-session review';
        confidence = 0.9;
      }
    }

    if (mayContext && mayContext.learner) {
      var learner = mayContext.learner;
      if (learner.overallAccuracy < 50 && learner.totalAttempts > 10) {
        if (mode === MODE.QUIZ) {
          mode = MODE.SOCRATIC;
          reason = 'learner override: low accuracy → socratic mode';
          confidence = 0.7;
        }
      }
    }

    return {
      mode: mode,
      confidence: confidence,
      reason: reason,
      action: action
    };
  }

    /**
     * Enrich context with routing metadata.
     *
     * @param {Object} mayContext — Full MayContext
     * @param {string} action — Learner action
     * @returns {Object} { mayContext, routing }
     */
    function enrichContext(mayContext, action) {
      var flagsEnabled = false;
      try {
        if (typeof MayFeatureFlags !== 'undefined') {
          flagsEnabled = MayFeatureFlags.isEnabled('ENABLE_COACHING_ROUTER');
        }
      } catch (e) {}

      if (!flagsEnabled) {
        return { mayContext: mayContext, routing: null };
      }

      var routing = route(mayContext, action);

      // Phase 1 (MAY-Phase-1) — gated LLM signal consumption.
      // When ENABLE_NEEDLE_ROUTER is on AND freeText is available, call
      // MayLLMProviderRegistry.routeWithGate() to obtain a model-driven
      // {mode, args, confidence, source}. Augment the routing object —
      // do NOT replace the action-based mode (which preserves existing
      // contract behavior). The signal is informational until a downstream
      // consumer wires it up (Phase 2+).
      if (routing && _shouldConsultGatedRouter(mayContext)) {
        var signal = _getIntentSignal(mayContext, action);
        if (signal) {
          routing.intentSignal = signal;
          // Track the signal mode via telemetry (best-effort, never blocks)
          try {
            if (typeof MayTelemetry !== 'undefined' && signal.mode) {
              MayTelemetry.trackMode(signal.mode, 0);
            }
          } catch (e) { /* telemetry never blocks */ }
        }
      }

      if (mayContext) {
        mayContext._routing = routing;
      }

      return {
        mayContext: mayContext,
        routing: routing
      };
    }

    /**
     * Phase 1 — Decide whether the gated LLM router should be consulted.
     * Both ENABLE_COACHING_ROUTER (already required for any enrichment) AND
     * ENABLE_NEEDLE_ROUTER must be on. The hidden-beta invariant is that
     * both flags default to false.
     */
    function _shouldConsultGatedRouter(mayContext) {
      try {
        if (typeof MayFeatureFlags === 'undefined') return false;
        if (!MayFeatureFlags.isEnabled('ENABLE_NEEDLE_ROUTER')) return false;
      } catch (e) { return false; }
      // Need free-text input to route. If absent, action-based mapping is sufficient.
      if (!mayContext || !mayContext.context) return false;
      var text = mayContext.context.freeText || mayContext.context.userQuery;
      return typeof text === 'string' && text.trim().length > 0;
    }

    /**
     * Phase 1 — Synchronously-ish helper that invokes routeWithGate().
     * Returns { mode, args, confidence, source } on success, null on failure.
     * Errors are swallowed to keep enrichContext() non-blocking — callers
     * fall through to action-based routing.
     */
    var _lastGatePromise = null;
    function _getIntentSignal(mayContext, action) {
      try {
        if (typeof MayLLMProviderRegistry === 'undefined') return null;
        if (typeof MayLLMProviderRegistry.routeWithGate !== 'function') return null;
        var request = {
          mode: 'chat',
          context: {
            freeText: mayContext.context.freeText || mayContext.context.userQuery || '',
            action: action
          },
          prompt: mayContext.context.freeText || mayContext.context.userQuery || '',
          metadata: {
            requestId: 'router-' + Date.now(),
            timestamp: new Date().toISOString(),
            featureFlags: {}
          }
        };
        // Attach the promise for callers that want to await it; enrichContext
        // itself does not await (it returns synchronously to keep the existing
        // contract). The returned signal is null in that case, but the
        // promise can be awaited separately if a caller upgrades the
        // contract.
        _lastGatePromise = MayLLMProviderRegistry.routeWithGate(request)
          .then(function (resp) {
            if (!resp || !resp.success || !resp.content) return null;
            var parsed;
            try { parsed = JSON.parse(resp.content); } catch (e) { return null; }
            if (!parsed || !parsed.mode) return null;
            return {
              mode: parsed.mode,
              action: parsed.action || null,
              args: parsed.args || {},
              confidence: typeof parsed.confidence === 'number' ? parsed.confidence : null,
              rationale: parsed.rationale || null,
              source: (resp.metadata && resp.metadata.source) || 'unknown'
            };
          })
          .catch(function () { return null; });
        // Synchronous best-effort return: enrichContext callers do not await.
        // Phase 2+ callers can await _lastGatePromise directly.
        return null;
      } catch (e) {
        return null;
      }
    }

    /**
     * Phase 1 — Expose the most recent gate-routing promise so callers that
     * want to await the LLM signal can do so. Returns null if no call has
     * been made yet, or if the previous call has already resolved and been
     * consumed.
     * @returns {Promise<Object>|null}
     */
    function getPendingIntentSignal() {
      return _lastGatePromise;
    }

  return {
    MODE: MODE,
    MODE_CONTRACTS: MODE_CONTRACTS,
    ACTION_MODE_MAP: ACTION_MODE_MAP,
    route: route,
    enrichContext: enrichContext,
    getModeContract: getModeContract,
    getAllModeContracts: getAllModeContracts,
    dispatchToHandler: dispatchToHandler,
    getPendingIntentSignal: getPendingIntentSignal
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingRouter = MayCoachingRouter;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingRouter;
}
