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
 * Session: MAY-001 (base), MAY-002 (mode contracts + handler dispatch)
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
    if (mayContext) {
      mayContext._routing = routing;
    }

    return {
      mayContext: mayContext,
      routing: routing
    };
  }

  return {
    MODE: MODE,
    MODE_CONTRACTS: MODE_CONTRACTS,
    ACTION_MODE_MAP: ACTION_MODE_MAP,
    route: route,
    enrichContext: enrichContext,
    getModeContract: getModeContract,
    getAllModeContracts: getAllModeContracts,
    dispatchToHandler: dispatchToHandler
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingRouter = MayCoachingRouter;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingRouter;
}
