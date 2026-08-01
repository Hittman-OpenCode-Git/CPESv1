/**
 * MayCoachingModeExplain — EXPLAIN coaching mode handler.
 * 
 * Provides explanation-oriented coaching: breaks down concepts, walks through
 * solutions, and identifies misconception patterns from wrong choices.
 * 
 * Mode Contract:
 *   Input:  MayContext (question, learner, session, app) + routing metadata
 *   Output: { mode, fallback, guidance: { focus, principle, approach }, 
 *             suggestedResponse, confidence, contextUsed }
 * 
 * Feature Flag: ENABLE_EXPLAIN_MODE (default: false)
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeExplain = (function() {
  'use strict';

  var MODE_NAME = 'EXPLAIN';

  /**
   * Handle an EXPLAIN mode coaching request.
   * 
   * @param {Object} mayContext — Full MayContext from MayContextBuilder
   * @param {Object} routing — Routing metadata from MayCoachingRouter
   * @returns {Object} CoachingResponse | { fallback: true }
   */
  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && !MayFeatureFlags.isEnabled('ENABLE_EXPLAIN_MODE')) {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    var question = mayContext && mayContext.question ? mayContext.question : null;
    var learner = mayContext && mayContext.learner ? mayContext.learner : null;
    var session = mayContext && mayContext.session ? mayContext.session : null;

    if (!question) {
      return { fallback: true, mode: MODE_NAME, reason: 'no question context' };
    }

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: _buildGuidance(question, learner, session),
      suggestedResponse: null,
      confidence: 0.90,
      contextUsed: ['question.stem', 'question.correctChoice', 'question.explanationCorrect']
    };

    return response;
  }

  /**
   * Build EXPLAIN-mode coaching guidance from context.
   */
  function _buildGuidance(question, learner, session) {
    var guidance = {
      focus: _determineFocus(question),
      principle: _extractPrinciple(question),
      approach: _recommendApproach(question, learner)
    };

    if (learner && learner.weaknessClusters && learner.weaknessClusters.length > 0) {
      var relevantWeakness = _findRelevantWeakness(question, learner.weaknessClusters);
      if (relevantWeakness) {
        guidance.knownWeakness = relevantWeakness;
        guidance.note = 'This topic area has been identified as a weakness — reinforce foundational concepts.';
      }
    }

    return guidance;
  }

  function _determineFocus(question) {
    if (question.cognitiveLevel === 'Remember' || question.cognitiveLevel === 'Understand') {
      return 'concept_definition';
    }
    if (question.cognitiveLevel === 'Apply' || question.calculationRequired) {
      return 'step_by_step_solution';
    }
    return 'reasoning_chain';
  }

  function _extractPrinciple(question) {
    var ec = question.explanationCorrect || '';
    var ascMatch = ec.match(/ASC\s+\d{3}(-\d{2}(-\d{2})?)?/);
    if (ascMatch) return ascMatch[0];
    var cosoMatch = ec.match(/COSO/);
    if (cosoMatch) return 'COSO Framework';
    var gaapMatch = ec.match(/GAAP/);
    if (gaapMatch) return 'U.S. GAAP';
    return 'CMA Part 1 accounting principles';
  }

  function _recommendApproach(question, learner) {
    var accuracy = learner ? (learner.overallAccuracy || 0) : 0;

    if (accuracy < 40) {
      return 'Start with the governing principle, then show the formula with substituted values.';
    }
    if (accuracy < 70) {
      return 'Walk through the solution step by step, pausing at each intermediate calculation.';
    }
    return 'Present the reasoning chain concisely. Focus on exam traps and common errors.';
  }

  function _findRelevantWeakness(question, weaknessClusters) {
    var topic = (question.topic || '').toLowerCase();
    var section = (question.section || '').toLowerCase();

    for (var i = 0; i < weaknessClusters.length; i++) {
      var w = weaknessClusters[i];
      var wTopic = (w.topic || '').toLowerCase();
      var wSection = (w.section || '').toLowerCase();
      if (wTopic && topic && (wTopic.indexOf(topic) !== -1 || topic.indexOf(wTopic) !== -1)) {
        return w;
      }
      if (wSection && section && wSection === section) {
        return w;
      }
    }
    return null;
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeExplain = MayCoachingModeExplain;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeExplain;
}
