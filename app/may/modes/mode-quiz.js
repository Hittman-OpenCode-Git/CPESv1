/**
 * MayCoachingModeQuiz — QUIZ coaching mode handler.
 * 
 * Generates adaptive quiz guidance: recommends similar questions, identifies
 * skill gaps to practice, and suggests targeted question sets.
 * 
 * Mode Contract:
 *   Input:  MayContext (question, learner with performance data, session) + routing
 *   Output: { mode, fallback, guidance: { type, focusDomain, recommendedCount, 
 *             reason }, suggestedResponse, confidence, contextUsed }
 * 
 * Feature Flag: ENABLE_QUIZ_MODE (default: false)
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeQuiz = (function() {
  'use strict';

  var MODE_NAME = 'QUIZ';

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && !MayFeatureFlags.isEnabled('ENABLE_QUIZ_MODE')) {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    var question = mayContext && mayContext.question ? mayContext.question : null;
    var learner = mayContext && mayContext.learner ? mayContext.learner : null;
    var session = mayContext && mayContext.session ? mayContext.session : null;

    if (!learner) {
      return { fallback: true, mode: MODE_NAME, reason: 'no learner context' };
    }

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: _buildQuizGuidance(question, learner, session),
      suggestedResponse: null,
      confidence: 0.85,
      contextUsed: ['learner.weaknessClusters', 'learner.topicPerformance', 'learner.overallAccuracy']
    };

    return response;
  }

  function _buildQuizGuidance(question, learner, session) {
    var guidance = {
      type: 'adaptive_practice',
      focusDomains: [],
      recommendedCount: 5,
      reason: 'general reinforcement'
    };

    if (learner.weaknessClusters && learner.weaknessClusters.length > 0) {
      for (var i = 0; i < Math.min(learner.weaknessClusters.length, 3); i++) {
        var w = learner.weaknessClusters[i];
        if (w.topic && guidance.focusDomains.indexOf(w.topic) === -1) {
          guidance.focusDomains.push(w.topic);
        }
      }
      guidance.reason = 'targeted weakness remediation';
      guidance.recommendedCount = Math.min(learner.weaknessClusters.length * 3, 20);
    }

    if (learner.overallAccuracy && learner.overallAccuracy < 50) {
      guidance.type = 'foundational_drill';
      guidance.reason = 'low overall accuracy — reinforce fundamentals';
      guidance.recommendedCount = 10;
    }

    if (session && session.previousQuestion && !session.previousQuestion.correct) {
      guidance.type = 'similar_question_drill';
      guidance.reason = 'incorrect on previous — practice similar items';
      guidance.recommendedCount = 3;
    }

    if (question && question.difficulty === 'Very Difficult' || question.difficultyScore >= 5) {
      guidance.type = 'stair_step_drill';
      guidance.reason = 'start with easier variants, progress to difficulty';
      guidance.recommendedCount = 5;
    }

    return guidance;
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeQuiz = MayCoachingModeQuiz;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeQuiz;
}
