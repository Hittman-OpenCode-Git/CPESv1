/**
 * MayCoachingModeExamReview — EXAM_REVIEW coaching mode handler.
 * 
 * Provides post-exam and post-session review coaching: analyzes completed
 * session results, identifies patterns in errors, and recommends focus areas
 * before the next study session.
 * 
 * Mode Contract:
 *   Input:  MayContext (session with results, learner with trends) + routing
 *   Output: { mode, fallback, guidance: { sessionAnalysis, errorPatterns, 
 *             nextSteps }, suggestedResponse, confidence, contextUsed }
 * 
 * Note: This mode does not have a dedicated feature flag in MAY-002.
 *       It is gated behind the presence of an ENABLE_EXAM_REVIEW_MODE flag
 *       which defaults to false (not yet registered in MayFeatureFlags).
 *       Until flag is registered, handle() always returns fallback.
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeExamReview = (function() {
  'use strict';

  var MODE_NAME = 'EXAM_REVIEW';

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        var enabled = MayFeatureFlags.isEnabled('ENABLE_EXAM_REVIEW_MODE');
        if (!enabled) {
          return { fallback: true, mode: MODE_NAME };
        }
      } else {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    var session = mayContext && mayContext.session ? mayContext.session : null;
    var learner = mayContext && mayContext.learner ? mayContext.learner : null;

    if (!session || !session.isCompleted) {
      return {
        mode: MODE_NAME,
        fallback: false,
        guidance: {
          sessionAnalysis: null,
          errorPatterns: [],
          nextSteps: ['Complete a practice session first, then I\'ll analyze your results.']
        },
        confidence: 0.70,
        contextUsed: ['session.isCompleted']
      };
    }

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: _buildReviewGuidance(session, learner),
      suggestedResponse: null,
      confidence: 0.85,
      contextUsed: ['session.mcqsAnswered', 'session.casesCompleted', 'learner.weaknessClusters', 'learner.sectionReadiness']
    };

    return response;
  }

  function _buildReviewGuidance(session, learner) {
    var guidance = {
      sessionAnalysis: {},
      errorPatterns: [],
      nextSteps: []
    };

    // Session analysis
    guidance.sessionAnalysis.totalQuestions = session.totalQuestions || 0;
    guidance.sessionAnalysis.completed = session.isCompleted;
    guidance.sessionAnalysis.submitted = session.isSubmitted;

    // Error pattern detection
    if (learner && learner.weaknessClusters && learner.weaknessClusters.length > 0) {
      for (var i = 0; i < Math.min(learner.weaknessClusters.length, 5); i++) {
        var w = learner.weaknessClusters[i];
        guidance.errorPatterns.push({
          pattern: w.topic || 'Unknown',
          frequency: w.count || 1,
          description: w.description || 'Consider targeted review in this area.'
        });
      }
    }

    // Misconception analysis
    if (learner && learner.misconceptionMap && learner.misconceptionMap.length > 0) {
      for (var j = 0; j < Math.min(learner.misconceptionMap.length, 3); j++) {
        var m = learner.misconceptionMap[j];
        guidance.errorPatterns.push({
          pattern: 'Misconception: ' + (m.label || 'Unknown'),
          frequency: m.count || 1,
          description: m.remediation || 'Review the governing principle.'
        });
      }
    }

    // Build next steps
    if (guidance.errorPatterns.length > 0) {
      guidance.nextSteps.push('Focus your next study session on: ' + 
        guidance.errorPatterns.slice(0, 3).map(function(p) { return p.pattern; }).join(', '));
      guidance.nextSteps.push('Before moving to new material, achieve 80%+ accuracy on review questions in these areas.');
    } else {
      guidance.nextSteps.push('No clear error patterns detected. Continue with your study plan.');
    }

    // Section readiness recommendations
    if (learner && learner.sectionReadiness) {
      var lowestSection = null;
      var lowestScore = 100;
      for (var section in learner.sectionReadiness) {
        if (learner.sectionReadiness.hasOwnProperty(section)) {
          var score = learner.sectionReadiness[section];
          if (typeof score === 'number' && score < lowestScore) {
            lowestScore = score;
            lowestSection = section;
          }
        }
      }
      if (lowestSection) {
        guidance.nextSteps.push('Your weakest domain is Section ' + lowestSection + 
          ' (' + (typeof lowestScore === 'number' ? Math.round(lowestScore) + '%' : lowestScore) + 
          '). Prioritize this in your study plan.');
      }
    }

    // Calibration advice
    if (learner && learner.confidenceCalibration) {
      var cal = learner.confidenceCalibration;
      if (cal.overconfidentRate > 30) {
        guidance.nextSteps.push('You tend to be overconfident on difficult questions (' + 
          Math.round(cal.overconfidentRate) + '% rate). Slow down and verify your answers.');
      }
    }

    return guidance;
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeExamReview = MayCoachingModeExamReview;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeExamReview;
}
