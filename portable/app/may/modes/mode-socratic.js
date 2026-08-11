/**
 * MayCoachingModeSocratic — SOCRATIC coaching mode handler.
 * 
 * Guides learners to discover answers through targeted questioning rather than
 * direct exposition. Generates leading questions, progressive hints, and
 * scaffolded reasoning pathways.
 * 
 * Mode Contract:
 *   Input:  MayContext (question, learner with performance/confidence) + routing
 *   Output: { mode, fallback, guidance: { hintLevel, questionChain, 
 *             startingPrompt, scaffolding }, suggestedResponse, confidence, contextUsed }
 * 
 * Feature Flag: ENABLE_SOCRATIC_MODE (default: false)
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeSocratic = (function() {
  'use strict';

  var MODE_NAME = 'SOCRATIC';

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && !MayFeatureFlags.isEnabled('ENABLE_SOCRATIC_MODE')) {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    var question = mayContext && mayContext.question ? mayContext.question : null;
    var learner = mayContext && mayContext.learner ? mayContext.learner : null;

    if (!question) {
      return { fallback: true, mode: MODE_NAME, reason: 'no question context' };
    }

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: _buildSocraticGuidance(question, learner),
      suggestedResponse: null,
      confidence: 0.80,
      contextUsed: ['question.stem', 'question.topic', 'question.cognitiveLevel']
    };

    return response;
  }

  function _buildSocraticGuidance(question, learner) {
    var hintLevel = _determineInitialHintLevel(learner);
    var questionChain = _buildQuestionChain(question, hintLevel);
    var scaffolding = _determineScaffolding(question, hintLevel);

    return {
      hintLevel: hintLevel,
      questionChain: questionChain,
      startingPrompt: questionChain[0] || 'What do you already know about this topic?',
      scaffolding: scaffolding,
      principle: 'Guide, don\'t tell. Each question should lead the learner one step closer to discovering the answer.'
    };
  }

  function _determineInitialHintLevel(learner) {
    if (!learner) return 2; // moderate hint level

    var accuracy = learner.overallAccuracy || 0;

    if (accuracy >= 80) return 1; // minimal hints — learner is strong
    if (accuracy >= 50) return 2; // moderate hints
    return 3; // more scaffolding needed
  }

  function _buildQuestionChain(question, hintLevel) {
    var topic = question.topic || 'this concept';
    var stem = question.stem || '';

    var chain = [];

    // Level 1: Broad conceptual question
    chain.push('What principle or standard governs ' + topic + '?');

    // Level 2: Narrowing question
    if (hintLevel >= 2) {
      chain.push('How would you identify the key numbers or facts in this scenario?');
    }

    // Level 3: Progressive scaffold
    if (hintLevel >= 3) {
      chain.push('What is the first step in solving a ' + topic + ' problem?');
    }

    // Direct but Socratic
    chain.push('Can you explain why the other choices would not apply here?');

    return chain;
  }

  function _determineScaffolding(question, hintLevel) {
    if (hintLevel >= 3) {
      return 'heavy — provide definitions, formula reminders, and worked example references';
    }
    if (hintLevel === 2) {
      return 'moderate — provide concept reminders and probing questions';
    }
    return 'light — minimal prompting, let the learner drive discovery';
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeSocratic = MayCoachingModeSocratic;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeSocratic;
}
