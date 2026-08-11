/**
 * MayCoachingModeMotivate — MOTIVATE coaching mode handler.
 * 
 * Provides motivational coaching: celebrates progress, acknowledges effort,
 * frames setbacks as learning opportunities, and reinforces growth mindset.
 * 
 * Mode Contract:
 *   Input:  MayContext (learner with trends, session with progress) + routing
 *   Output: { mode, fallback, guidance: { messageType, metrics, framing }, 
 *             suggestedResponse, confidence, contextUsed }
 * 
 * Note: This mode does not have a dedicated feature flag in MAY-002.
 *       It is gated behind the presence of an ENABLE_MOTIVATE_MODE flag 
 *       which defaults to false (not yet registered in MayFeatureFlags).
 *       Until flag is registered, handle() always returns fallback.
 * 
 * Session: MAY-002 (Coaching Modes Activation Framework)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayCoachingModeMotivate = (function() {
  'use strict';

  var MODE_NAME = 'MOTIVATE';

  function handle(mayContext, routing) {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        var enabled = MayFeatureFlags.isEnabled('ENABLE_MOTIVATE_MODE');
        if (!enabled) {
          return { fallback: true, mode: MODE_NAME };
        }
      } else {
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
      guidance: _buildMotivationGuidance(learner, session),
      suggestedResponse: null,
      confidence: 0.85,
      contextUsed: ['learner.overallAccuracy', 'learner.totalAttempts', 'learner.trends']
    };

    return response;
  }

  function _buildMotivationGuidance(learner, session) {
    var guidance = {
      messageType: 'acknowledgment',
      metrics: {},
      framing: 'growth_mindset',
      celebrationPoints: [],
      encouragementNotes: []
    };

    // Calculate positive metrics
    if (learner.totalAttempts > 0) {
      guidance.metrics.totalAttempts = learner.totalAttempts;
      guidance.celebrationPoints.push(learner.totalAttempts + ' questions attempted — consistent effort matters.');
    }

    if (learner.totalSessions > 0) {
      guidance.metrics.totalSessions = learner.totalSessions;
      guidance.celebrationPoints.push(learner.totalSessions + ' study sessions completed — building a strong habit.');
    }

    if (learner.overallAccuracy > 0) {
      guidance.metrics.accuracy = learner.overallAccuracy;
      if (learner.overallAccuracy >= 70) {
        guidance.celebrationPoints.push('Overall accuracy of ' + Math.round(learner.overallAccuracy) + '% — solid progress toward exam readiness.');
      }
    }

    // Session-specific encouragement
    if (session && session.mcqsAnswered > 5) {
      guidance.celebrationPoints.push(session.mcqsAnswered + ' questions answered this session — great momentum.');
    }

    // Frame challenges positively
    if (learner.overallAccuracy < 50 && learner.totalAttempts > 10) {
      guidance.messageType = 'encouragement';
      guidance.framing = 'challenge_as_opportunity';
      guidance.encouragementNotes.push(
        'Every wrong answer is a learning signal. You\'re identifying exactly where to focus.',
        'Struggling with questions now means you\'re less likely to struggle with them on exam day.'
      );
    }

    // Growth mindset reinforcement
    if (learner.totalAttempts > 50) {
      guidance.framing = 'milestone_celebration';
      guidance.encouragementNotes.push(
        'You\'ve built significant practice volume. The CMA exam rewards persistence — and you\'re demonstrating it.'
      );
    }

    if (guidance.celebrationPoints.length === 0) {
      guidance.celebrationPoints.push('Getting started is the hardest part. You\'re showing up — that\'s what matters.');
    }

    return guidance;
  }

  return {
    MODE_NAME: MODE_NAME,
    handle: handle
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingModeMotivate = MayCoachingModeMotivate;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingModeMotivate;
}
