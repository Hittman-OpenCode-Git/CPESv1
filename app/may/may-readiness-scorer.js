/**
 * MayReadinessScorer — Non-production exam readiness estimator.
 * 
 * Computes a 0–100 readiness score from the learner profile, with confidence
 * levels, strength/risk indicators, and recommended next actions.
 * 
 * This is a coaching-internal diagnostic tool. It is NOT displayed to the learner
 * as a "you are ready to pass" claim. It is feature-flagged and disabled by default.
 * 
 * Session: MAY-004A — Adaptive Study Coach (Stretch Goal)
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_ADAPTIVE_COACHING (default: false)
 *                + requires _readinessScorerEnabled internal flag
 */

const MayReadinessScorer = (function() {
  'use strict';

  var _enabled = false;

  function _flagEnabled() {
    if (!_enabled) return false;
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING');
      }
    } catch (e) {}
    return false;
  }

  // ── Scoring Components ──────────────────────────────────────

  function _scoreContentMastery(profile) {
    // Average accuracy across all topics with >=3 attempts, weighted by attempt count
    var totalWeight = 0, weightedSum = 0;
    if (!profile.masteryLevels) return { score: 0, confidence: 'low', details: 'No mastery data.' };
    var topics = Object.keys(profile.masteryLevels);
    var withData = 0;
    topics.forEach(function(topic) {
      var ml = profile.masteryLevels[topic];
      if (ml.attempts >= 3 && ml.accuracy !== null && ml.accuracy !== undefined) {
        weightedSum += ml.accuracy * ml.attempts;
        totalWeight += ml.attempts;
        withData++;
      }
    });
    if (totalWeight === 0 || withData < 2) return { score: 0, confidence: 'low', details: 'Insufficient topic data.' };
    var score = Math.round(weightedSum / totalWeight);
    var confidence = withData >= 5 ? 'moderate' : 'low';
    return { score: score, confidence: confidence, details: withData + ' topics with sufficient data.' };
  }

  function _scoreStability(profile) {
    // Average stability across topics with >=4 attempts
    var sum = 0, count = 0;
    if (!profile.masteryLevels) return { score: 0, confidence: 'low', details: 'No stability data.' };
    Object.keys(profile.masteryLevels).forEach(function(topic) {
      var ml = profile.masteryLevels[topic];
      if (ml.stability !== null && ml.attempts >= 4) {
        sum += ml.stability; count++;
      }
    });
    if (count === 0) return { score: 0, confidence: 'low', details: 'Insufficient trend data.' };
    var score = Math.round(sum / count);
    var confidence = count >= 3 ? 'moderate' : 'low';
    return { score: score, confidence: confidence, details: count + ' topics with stability data.' };
  }

  function _scoreSectionCoverage(profile) {
    // How many sections have at least one topic with data
    if (!profile.readinessScore || !profile.readinessScore.perSection) {
      return { score: 0, confidence: 'low', details: 'No section data.' };
    }
    var sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    var covered = 0, approaching = 0;
    sections.forEach(function(sec) {
      var ps = profile.readinessScore.perSection[sec];
      if (ps && ps.band !== 'Not enough data') covered++;
      if (ps && (ps.band === 'Approaching review-ready' || ps.band === 'Ready for focused review')) approaching++;
    });
    var score = Math.round((covered / 6) * 100);
    var confidence = covered >= 3 ? 'moderate' : 'low';
    return { score: score, confidence: confidence, details: covered + '/6 sections covered, ' + approaching + ' approaching ready.' };
  }

  function _scoreCaseReadiness(profile) {
    var cp = profile.behavior && profile.behavior.casePatterns;
    if (!cp || !cp.dominantTrend) return { score: 50, confidence: 'low', details: 'No case pattern data yet.' };
    if (cp.dominantTrend === 'worsening') return { score: 30, confidence: 'moderate', details: 'Case patterns worsening — needs attention.' };
    if (cp.dominantTrend === 'improving') return { score: 80, confidence: 'moderate', details: 'Case patterns improving.' };
    return { score: 60, confidence: 'low', details: 'Case patterns stable.' };
  }

  function _scoreConsistency(profile) {
    // Study streak bonus + session frequency
    var streak = profile.studyStreak || 0;
    var sessions7 = profile.sessionsLast7Days || 0;
    var sessions28 = profile.sessionsLast28Days || 0;

    var score = 50; // baseline
    if (streak >= 7) score += 30;
    else if (streak >= 3) score += 15;
    else if (streak >= 1) score += 5;

    if (sessions28 >= 10) score += 15;
    else if (sessions28 >= 5) score += 10;
    else if (sessions28 >= 2) score += 5;

    return { score: Math.min(100, score), confidence: 'moderate',
      details: streak + '-day streak, ' + sessions28 + ' sessions in last 28 days.' };
  }

  // ── Composite Score ──────────────────────────────────────────

  function _computeComposite(components) {
    // Weights: accuracy at comprehension, stability and coverage matter
    var weights = {
      contentMastery: 35,
      stability: 20,
      sectionCoverage: 20,
      caseReadiness: 10,
      consistency: 15
    };

    var totalWeight = 0, weightedSum = 0;
    Object.keys(weights).forEach(function(key) {
      if (components[key] && components[key].score > 0) {
        weightedSum += components[key].score * weights[key];
        totalWeight += weights[key];
      }
    });

    if (totalWeight === 0) return 0;
    return Math.round(weightedSum / totalWeight);
  }

  function _confidenceFromComponents(components) {
    var lows = 0, total = 0;
    Object.keys(components).forEach(function(key) {
      total++;
      if (components[key].confidence === 'low') lows++;
    });
    if (lows === total) return 'low';
    if (lows >= total / 2) return 'low';
    if (lows > 0) return 'moderate';
    return 'moderate';
  }

  // ── Strength & Risk Detection ─────────────────────────────────

  function _identifyStrengths(profile) {
    var s = [];
    if (profile.strengths && profile.strengths.length > 0) {
      s.push(profile.strengths[0].topic + ' at ' + profile.strengths[0].accuracy + '% accuracy');
    }
    if (profile.improvingTopics && profile.improvingTopics.length > 0) {
      s.push(profile.improvingTopics[0] + ' — improving trend');
    }
    if (profile.studyStreak >= 5) {
      s.push('Strong study consistency (' + profile.studyStreak + '-day streak)');
    }
    return s;
  }

  function _identifyRisks(profile) {
    var r = [];
    if (profile.weaknesses && profile.weaknesses.length > 0) {
      r.push(profile.weaknesses[0].topic + ' below 60% accuracy');
    }
    if (profile.decliningTopics && profile.decliningTopics.length > 0) {
      r.push(profile.decliningTopics[0] + ' in decline');
    }
    if (profile.behavior && profile.behavior.casePatterns &&
        profile.behavior.casePatterns.dominantTrend === 'worsening') {
      r.push('Case performance worsening');
    }
    if (profile.behavior && profile.behavior.hintDependency &&
        profile.behavior.hintDependency.trend === 'increasing') {
      r.push('Increasing hint dependency');
    }
    if (profile.examPlan && profile.examPlan.daysUntilExam !== null &&
        profile.examPlan.daysUntilExam <= 14 && profile.examPlan.daysUntilExam > 0) {
      r.push('Exam in ' + profile.examPlan.daysUntilExam + ' days — time pressure');
    }
    return r;
  }

  function _recommendNextActions(profile, components) {
    var actions = [];
    if (components.contentMastery.score < 60) {
      actions.push('Focus on concept recovery in your weakest topics — untimed MCQ practice with full explanation review.');
    }
    if (components.stability.score < 50) {
      actions.push('Work on consistency — aim for 4/5 correct on the same topic before moving on.');
    }
    if (components.sectionCoverage.score < 50) {
      actions.push('Expand section coverage — practice at least one question in each untested domain.');
    }
    if (components.caseReadiness.score < 50) {
      actions.push('Add case practice — start with untimed cases in your strongest domain.');
    }
    if (profile.examPlan && profile.examPlan.daysUntilExam !== null &&
        profile.examPlan.daysUntilExam <= 30 && profile.examPlan.daysUntilExam > 0) {
      actions.push('Create a daily practice plan for the remaining ' + profile.examPlan.daysUntilExam + ' days.');
    }
    if (actions.length === 0) {
      actions.push('Maintain your current practice rhythm. Mix MCQs and cases across all sections.');
    }
    return actions.slice(0, 4);
  }

  // ─── Public API ──────────────────────────────────────────────

  function enable() { _enabled = true; }
  function disable() { _enabled = false; }
  function isEnabled() { return _enabled; }

  /**
   * Compute an exam readiness estimate from a learner profile.
   * @param {Object} profile — LearnerProfile from MayLearnerProfile.build()
   * @returns {Object|null} Readiness estimate or null if disabled/insufficient data
   */
  function estimate(profile) {
    if (!_flagEnabled()) return null;
    if (!profile) return null;
    if (profile._meta && profile._meta.dataSufficiency === 'insufficient') {
      return {
        readinessScore: 0,
        confidence: 'low',
        strengths: [],
        risks: ['Insufficient data for readiness estimate.'],
        recommendedNextActions: ['Complete at least 3 practice sessions across different topics.'],
        _meta: { computedAt: new Date().toISOString(), dataSufficiency: 'insufficient' }
      };
    }

    var components = {
      contentMastery: _scoreContentMastery(profile),
      stability: _scoreStability(profile),
      sectionCoverage: _scoreSectionCoverage(profile),
      caseReadiness: _scoreCaseReadiness(profile),
      consistency: _scoreConsistency(profile)
    };

    var composite = _computeComposite(components);
    var confidence = _confidenceFromComponents(components);

    return {
      readinessScore: composite,
      confidence: confidence,
      strengths: _identifyStrengths(profile),
      risks: _identifyRisks(profile),
      recommendedNextActions: _recommendNextActions(profile, components),
      components: components,
      _meta: {
        computedAt: new Date().toISOString(),
        modelVersion: 'MAY004A-1.0',
        dataSufficiency: profile._meta ? profile._meta.dataSufficiency : 'unknown'
      }
    };
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    enable: enable,
    disable: disable,
    isEnabled: isEnabled,
    estimate: estimate
  };

})();

if (typeof window !== 'undefined') {
  window.MayReadinessScorer = MayReadinessScorer;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayReadinessScorer;
}
