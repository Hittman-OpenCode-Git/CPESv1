/**
 * MayCoachingModeStudyPlan — STUDY_PLAN coaching mode handler.
 * 
 * Generates personalized study recommendations based on learner performance,
 * readiness bands, weakness clusters, and exam timeline.
 * 
 * Mode Contract:
 *   Input:  MayContext (learner with readiness/weakness/trends) + routing
 *   Output: { mode, fallback, guidance: { focusAreas, recommendedActions,
 *             priorityOrder, estimatedTime }, suggestedResponse, confidence, contextUsed }
 * 
 * Feature Flag: ENABLE_STUDY_PLAN_MODE (default: false)
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeStudyPlan = (function() {
  'use strict';

  var MODE_NAME = 'STUDY_PLAN';

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && !MayFeatureFlags.isEnabled('ENABLE_STUDY_PLAN_MODE')) {
        return { fallback: true, mode: MODE_NAME };
      }
    } catch (e) { return { fallback: true, mode: MODE_NAME }; }

    var learner = mayContext && mayContext.learner ? mayContext.learner : null;
    var session = mayContext && mayContext.session ? mayContext.session : null;

    if (!learner) {
      return { fallback: true, mode: MODE_NAME, reason: 'no learner context' };
    }

    var response = {
      mode: MODE_NAME,
      fallback: false,
      guidance: _buildStudyPlanGuidance(learner, session),
      suggestedResponse: null,
      confidence: 0.85,
      contextUsed: ['learner.readinessBands', 'learner.weaknessClusters', 'learner.sectionReadiness', 'learner.practiceMix']
    };

    return response;
  }

  function _buildStudyPlanGuidance(learner, session) {
    var guidance = {
      focusAreas: [],
      recommendedActions: [],
      priorityOrder: [],
      estimatedMinutes: 30,
      examTimeline: learner.examPlan || null
    };

    // Identify focus areas from weakness clusters
    if (learner.weaknessClusters && learner.weaknessClusters.length > 0) {
      for (var i = 0; i < learner.weaknessClusters.length; i++) {
        var w = learner.weaknessClusters[i];
        guidance.focusAreas.push({
          topic: w.topic || 'Unknown topic',
          severity: w.severity || 'moderate',
          accuracy: w.accuracy || 0
        });
      }
      guidance.priorityOrder = [].concat(guidance.focusAreas)
        .sort(function(a, b) { return (a.accuracy || 0) - (b.accuracy || 0); })
        .map(function(f) { return f.topic; });
    }

    // Check readiness bands for additional focus
    if (learner.readinessBands && typeof learner.readinessBands === 'object') {
      var bandKeys = Object.keys(learner.readinessBands);
      for (var j = 0; j < bandKeys.length; j++) {
        var band = learner.readinessBands[bandKeys[j]];
        if (band === 'Red' || band === 'Not Ready') {
          var alreadyListed = false;
          for (var k = 0; k < guidance.focusAreas.length; k++) {
            if (guidance.focusAreas[k].topic === bandKeys[j]) alreadyListed = true;
          }
          if (!alreadyListed) {
            guidance.focusAreas.push({
              topic: bandKeys[j],
              severity: 'high',
              accuracy: 0
            });
            guidance.priorityOrder.unshift(bandKeys[j]);
          }
        }
      }
    }

    // Section readiness
    if (learner.sectionReadiness && typeof learner.sectionReadiness === 'object') {
      guidance.sectionReadiness = learner.sectionReadiness;
    }

    // Build recommended actions
    if (guidance.focusAreas.length > 0) {
      guidance.recommendedActions.push(
        'Focus on the top ' + Math.min(3, guidance.focusAreas.length) + ' weakest areas first. Mastery compounds — strengthening your weakest domain lifts your overall score the most.',
        'Alternate 20 minutes of MCQ practice with 10 minutes of concept review for each focus area.',
        'Use the explain action on incorrect items to understand why each wrong choice is wrong — not just why the correct one is right.'
      );
    } else {
      guidance.recommendedActions.push(
        'Continue with mixed practice across all domains to maintain breadth.',
        'Increase difficulty on topics where accuracy exceeds 80% to build exam-day readiness.'
      );
    }

    // Practice mix recommendation
    if (learner.practiceMix && learner.practiceMix.recommendation) {
      guidance.recommendedActions.push(
        'Practice mix: ' + learner.practiceMix.recommendation + 
        (learner.practiceMix.confidence ? ' (confidence: ' + Math.round(learner.practiceMix.confidence * 100) + '%)' : '')
      );
    }

    // Estimate time
    guidance.estimatedMinutes = Math.max(15, guidance.focusAreas.length * 10);

    return guidance;
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeStudyPlan = MayCoachingModeStudyPlan;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeStudyPlan;
}
