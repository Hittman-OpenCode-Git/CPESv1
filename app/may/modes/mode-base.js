/**
 * MayCoachingModeBase — Shared base utilities for coaching mode handlers.
 * 
 * Provides the mode registry, dispatch infrastructure, and standardized
 * input/output schema validation for all coaching modes.
 * 
 * Mode Handler Contract:
 *   Every mode handler MUST export:
 *     - MODE_NAME: string — unique mode identifier
 *     - handle(mayContext, routing): function — returns CoachingResponse | { fallback: true }
 * 
 *   CoachingResponse:
 *     - mode: string — the coaching mode name
 *     - fallback: boolean — if true, caller should use existing May behavior
 *     - guidance: object — mode-specific coaching guidance
 *     - confidence: number (0–1) — self-assessed confidence in the guidance
 *     - contextUsed: array[string] — paths of context fields consumed
 *     - suggestedResponse: string|null — optional suggested response text
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeBase = (function() {
  'use strict';

  /**
   * Registry of all coaching mode handlers.
   * Keyed by mode name string (e.g., 'EXPLAIN', 'QUIZ').
   */
  var _registry = {};

  /**
   * Register a mode handler.
   * 
   * @param {string} modeName — Mode name (must match a coaching router MODE value)
   * @param {Object} handler — Mode handler with { MODE_NAME, handle(mayContext, routing) }
   * @returns {boolean} true if registered, false if already exists or invalid
   */
  function registerMode(modeName, handler) {
    if (!modeName || typeof modeName !== 'string') return false;
    if (!handler || typeof handler.handle !== 'function') return false;
    if (_registry[modeName]) return false; // already registered
    _registry[modeName] = handler;
    return true;
  }

  /**
   * Dispatch to the appropriate mode handler.
   * 
   * @param {Object} mayContext — Full MayContext
   * @param {Object} routing — Routing result from MayCoachingRouter
   * @returns {Object|null} CoachingResponse if handler produced non-fallback output, null otherwise
   */
  function dispatch(mayContext, routing) {
    if (!routing || !routing.mode) return null;

    var handler = _registry[routing.mode];
    if (!handler) return null;

    try {
      var result = handler.handle(mayContext, routing);
      if (result && !result.fallback) {
        return result;
      }
    } catch (e) {
      // Handler failure — silent fallback, never interrupt existing workflows
    }

    return null;
  }

  /**
   * Get the registered handler for a mode.
   * 
   * @param {string} modeName
   * @returns {Object|null} handler or null
   */
  function getHandler(modeName) {
    return _registry[modeName] || null;
  }

  /**
   * Get all registered modes.
   * 
   * @returns {Array<string>} mode names
   */
  function getRegisteredModes() {
    return Object.keys(_registry);
  }

  /**
   * Auto-register all coaching mode handlers that are available globally.
   * Call this after all mode scripts have loaded.
   * 
   * @returns {number} count of registered modes
   */
  function autoRegister() {
    var modeHandlers = [
      { name: 'EXPLAIN', global: 'MayCoachingModeExplain' },
      { name: 'QUIZ', global: 'MayCoachingModeQuiz' },
      { name: 'SOCRATIC', global: 'MayCoachingModeSocratic' },
      { name: 'MOTIVATE', global: 'MayCoachingModeMotivate' },
      { name: 'STUDY_PLAN', global: 'MayCoachingModeStudyPlan' },
      { name: 'EXAM_REVIEW', global: 'MayCoachingModeExamReview' }
    ];

    var count = 0;
    for (var i = 0; i < modeHandlers.length; i++) {
      var m = modeHandlers[i];
      try {
        if (typeof window !== 'undefined' && window[m.global]) {
          if (registerMode(m.name, window[m.global])) {
            count++;
          }
        }
      } catch (e) { /* skip unavailable */ }
    }

    return count;
  }

  /**
   * Validate that a CoachingResponse conforms to the schema.
   * 
   * @param {Object} response
   * @returns {{ valid: boolean, errors: Array<string> }}
   */
  function validateResponse(response) {
    var errors = [];

    if (!response) {
      errors.push('response is null/undefined');
      return { valid: false, errors: errors };
    }

    if (response.fallback) return { valid: true, errors: [] }; // fallback is always valid

    if (typeof response.mode !== 'string') errors.push('missing mode');
    if (typeof response.guidance !== 'object') errors.push('missing guidance');
    if (typeof response.confidence !== 'number') errors.push('missing confidence');
    if (response.confidence < 0 || response.confidence > 1) errors.push('confidence out of range');
    if (!Array.isArray(response.contextUsed)) errors.push('contextUsed must be array');

    return { valid: errors.length === 0, errors: errors };
  }

  return {
    registerMode: registerMode,
    dispatch: dispatch,
    getHandler: getHandler,
    getRegisteredModes: getRegisteredModes,
    autoRegister: autoRegister,
    validateResponse: validateResponse
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeBase = MayCoachingModeBase;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeBase;
}
