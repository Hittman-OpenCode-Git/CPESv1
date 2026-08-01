/**
 * MayDashboardModel — Generates dashboard-ready data structures for the
 * adaptive coaching intelligence platform.
 * 
 * Consumes MayReadinessEngine, MayInterventionPrioritizer, and MayLearnerState.
 * All outputs are deterministic, serializable, and advisory only.
 * 
 * Gated behind MayFeatureFlags.ENABLE_READINESS_SCORING (default: false).
 * When disabled, generate() returns null.
 * 
 * Session: MAY-005
 * Governance: Light Lane (analytics layer — no pack/case/content impact)
 */
const MayDashboardModel = (function() {
  'use strict';

  var FEATURE_FLAG = 'ENABLE_READINESS_SCORING';

  function _isEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled(FEATURE_FLAG);
      }
    } catch (e) { /* safety */ }
    return false;
  }

  // ════════════════════════════════════════════════════════
  // generate() — Full dashboard data model
  // ════════════════════════════════════════════════════════
  function generate() {
    if (!_isEnabled()) return null;

    try {
      if (typeof MayLearnerState === 'undefined') return null;
    } catch (e) { return null; }

    // ── Core data sources ──
    var data = MayLearnerState.load();
    var readiness = MayLearnerState.getReadinessSummary();
    var intelligence = MayLearnerState.getLearnerIntelligence();
    var topicProgress = MayLearnerState.getTopicProgress();
    var clusters = MayLearnerState.getWeaknessClusters();
    var caseSummary = MayLearnerState.getCasePatternSummary();
    var calibration = MayLearnerState.getConfidenceCalibration();
    var outcomes = MayLearnerState.getOutcomeSummary();
    var practiceMix = MayLearnerState.getAdaptivePracticeMix();
    var examPlan = data.examPlan || null;

    // ── Readiness score (try engine, fall back to raw) ──
    var readinessScore;
    if (readiness && readiness.overall) {
      readinessScore = _bandToNumeric(readiness.overall.band);
    } else {
      readinessScore = 0;
    }

    // ── Top strengths (accuracy ≥ 85%, ≥ 3 attempts, not declining) ──
    var strengths = _extractStrengths(intelligence);

    // ── Top weaknesses (accuracy < 60%, ≥ 5 attempts) ──
    var weaknesses = _extractWeaknesses(intelligence, clusters);

    // ── Next actions (from prioritizer or from raw data) ──
    var nextActions = _extractNextActions();

    // ── Study focus area ──
    var studyFocus = _computeStudyFocus(weaknesses, strengths, caseSummary, examPlan);

    // ── Intervention queue ──
    var interventionQueue = _extractInterventionQueue();

    // ── Session stats ──
    var sessionCount = (data.sessions || []).length;
    var totalAttempts = (data.sessions || []).reduce(function(s, sess) {
      return s + (sess.attempts || []).length;
    }, 0);

    // ── Recent trend ──
    var recentTrend = _computeRecentTrend(data, sessionCount);

    // ── Coaching analytics (stretch goal) ──
    var coachingAnalytics = _computeCoachingAnalytics(intelligence, clusters, outcomes, data);

    return {
      // ── Top-level summary ──
      readinessScore: readinessScore,
      band: readiness ? readiness.overall.band : 'Not enough data',
      confidence: readiness ? readiness.overall.confidence : 'low',

      // ── Strengths & weaknesses ──
      topStrengths: strengths.slice(0, 3),
      topWeaknesses: weaknesses.slice(0, 5),

      // ── Actions & focus ──
      nextActions: nextActions,
      studyFocus: studyFocus,
      interventionQueue: interventionQueue,

      // ── Activity ──
      sessionCount: sessionCount,
      totalAttempts: totalAttempts,
      lastActiveAt: _lastActiveAt(data),
      studyStreak: _computeStreak(data),

      // ── Section breakdown ──
      sectionScores: _extractSectionScores(),

      // ── Trends ──
      recentTrend: recentTrend,
      practiceMix: practiceMix,

      // ── Exam context ──
      examContext: examPlan ? {
        hasScheduledExam: examPlan.hasScheduledExam || false,
        examPart: examPlan.examPart || examPlan.plannedExamPart || null,
        examDate: examPlan.examDate || examPlan.targetDateOrWindow || null,
        daysUntilExam: _daysUntil(examPlan),
        planningExam: examPlan.planningExam || false
      } : null,

      // ── Coaching analytics (stretch goal) ──
      coachingAnalytics: coachingAnalytics,

      // ── Metadata ──
      _meta: {
        generatedAt: new Date().toISOString(),
        modelVersion: 'MAY005-1.0',
        engineVersion: 'MAY005-1.0',
        flag: FEATURE_FLAG,
        dataContext: {
          sessionCount: sessionCount,
          totalAttempts: totalAttempts,
          topicCount: Object.keys(topicProgress || {}).length
        }
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // generateForTopic(topicName) — Per-topic focused dashboard
  // ════════════════════════════════════════════════════════
  function generateForTopic(topicName) {
    if (!_isEnabled()) return null;

    try {
      if (typeof MayLearnerState === 'undefined') return null;
    } catch (e) { return null; }

    var topicProgress = MayLearnerState.getTopicProgress();
    var readiness = MayLearnerState.getReadinessSummary();
    var intelligence = MayLearnerState.getLearnerIntelligence();
    var trends = MayLearnerState.getTrends();

    var tp = topicProgress[topicName];
    if (!tp) return null;

    var topicReadiness = null;
    if (readiness && readiness.topics) {
      var match = readiness.topics.filter(function(t) { return t.topic === topicName; });
      if (match.length > 0) topicReadiness = match[0];
    }

    var topicTrend = null;
    if (trends) {
      var tMatch = trends.filter(function(t) { return t.topic === topicName; });
      if (tMatch.length > 0) topicTrend = tMatch[0];
    }

    return {
      topic: topicName,
      accuracy: tp.accuracy,
      recentAccuracy: tp.recentPct,
      attempts: tp.totalAttempts,
      correctCount: tp.correctCount,
      hintRate: tp.hintRate,
      avgDifficulty: tp.avgDifficulty,
      firstSeen: tp.firstSeen,
      lastSeen: tp.lastSeen,
      sectionsSeen: tp.sectionsSeen || [],
      difficultyDistribution: tp.difficultyDistribution || {},
      band: topicReadiness ? topicReadiness.band : 'Not enough data',
      stability: topicReadiness ? topicReadiness.stability : null,
      direction: topicReadiness ? topicReadiness.direction : 'stable',
      delta: topicTrend ? topicTrend.delta : null,
      evidence: {
        accuracy: tp.accuracy,
        attempts: tp.totalAttempts,
        recentPct: tp.recentPct,
        sectionsSeen: tp.sectionsSeen
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // generateForSection(section) — Per-section focused dashboard
  // ════════════════════════════════════════════════════════
  function generateForSection(section) {
    if (!_isEnabled()) return null;

    try {
      if (typeof MayLearnerState === 'undefined') return null;
    } catch (e) { return null; }

    var sectionReadiness = MayLearnerState.getSectionReadinessSummary();
    if (!sectionReadiness || !sectionReadiness.sections || !sectionReadiness.sections[section]) {
      return null;
    }

    var s = sectionReadiness.sections[section];
    var topicProgress = MayLearnerState.getTopicProgress();

    // Collect section topics
    var sectionTopics = [];
    Object.entries(topicProgress || {}).forEach(function(entry) {
      var topic = entry[0];
      var tp = entry[1];
      if (tp.sectionsSeen && tp.sectionsSeen.indexOf(section) >= 0) {
        sectionTopics.push({
          topic: topic,
          accuracy: tp.accuracy,
          attempts: tp.totalAttempts,
          band: _deriveTopicBand(tp),
          lastSeen: tp.lastSeen
        });
      }
    });

    return {
      section: section,
      label: s.label,
      band: s.band,
      confidence: s.confidence,
      rationale: s.rationale,
      topicCount: s.topicCount,
      worstTopic: s.worstTopic,
      signals: s.signals || [],
      topics: sectionTopics
    };
  }

  // ════════════════════════════════════════════════════════
  // Helper: band → numeric score
  // ════════════════════════════════════════════════════════
  function _bandToNumeric(band) {
    switch (band) {
      case 'Ready for focused review': return 85;
      case 'Approaching review-ready': return 70;
      case 'Developing': return 50;
      case 'Recovery needed': return 25;
      default: return 0;
    }
  }

  // ════════════════════════════════════════════════════════
  // Helper: extract strengths
  // ════════════════════════════════════════════════════════
  function _extractStrengths(intelligence) {
    if (!intelligence || !intelligence.strengths) return [];
    return intelligence.strengths
      .filter(function(s) { return s.attempts >= 3 && s.accuracy >= 85; })
      .sort(function(a, b) { return b.accuracy - a.accuracy; })
      .map(function(s) {
        return {
          topic: s.topic,
          accuracy: s.accuracy,
          attempts: s.attempts,
          stability: s.stability,
          recentAccuracy: s.recentAccuracy
        };
      });
  }

  // ════════════════════════════════════════════════════════
  // Helper: extract weaknesses
  // ════════════════════════════════════════════════════════
  function _extractWeaknesses(intelligence, clusters) {
    if (!intelligence || !intelligence.weaknesses) return [];

    var weakMap = {};
    intelligence.weaknesses.forEach(function(w) {
      if (w.attempts >= 5 && w.accuracy < 60) {
        weakMap[w.topic] = {
          topic: w.topic,
          accuracy: w.accuracy,
          attempts: w.attempts,
          recentAccuracy: w.recentAccuracy,
          trend: 'stable',
          evidence: w.evidence
        };
      }
    });

    // Augment with cluster data
    if (clusters) {
      clusters.persistentWeak.forEach(function(t) {
        if (weakMap[t.topic]) weakMap[t.topic].trend = 'persistent';
      });
      clusters.declining.forEach(function(t) {
        if (weakMap[t.topic]) weakMap[t.topic].trend = 'declining';
        else if (t.accuracy < 60 && t.totalAttempts >= 5) {
          weakMap[t.topic] = {
            topic: t.topic,
            accuracy: t.accuracy,
            attempts: t.totalAttempts,
            recentAccuracy: t.recentPct,
            trend: 'declining',
            evidence: { direction: t.direction, delta: t.delta }
          };
        }
      });
    }

    return Object.values(weakMap).sort(function(a, b) { return a.accuracy - b.accuracy; });
  }

  // ════════════════════════════════════════════════════════
  // Helper: extract next actions
  // ════════════════════════════════════════════════════════
  function _extractNextActions() {
    try {
      if (typeof MayInterventionPrioritizer !== 'undefined' && MayInterventionPrioritizer.rank) {
        var result = MayInterventionPrioritizer.rank();
        if (result && result.queue) {
          return result.queue.slice(0, 5).map(function(item) {
            return {
              action: item.recommendedAction,
              topic: item.topic,
              tier: item.tierLabel,
              priorityScore: item.priorityScore,
              evidence: item.evidence
            };
          });
        }
      }
    } catch (e) { /* pass */ }

    // Fallback
    return [];
  }

  // ════════════════════════════════════════════════════════
  // Helper: compute study focus
  // ════════════════════════════════════════════════════════
  function _computeStudyFocus(weaknesses, strengths, caseSummary, examPlan) {
    var focus = {
      primaryArea: null,
      primaryReason: '',
      secondaryArea: null,
      recommendation: ''
    };

    if (weaknesses.length > 0) {
      focus.primaryArea = weaknesses[0].topic;
      focus.primaryReason = 'Weakest topic — ' + weaknesses[0].accuracy + '% accuracy across ' + weaknesses[0].attempts + ' attempts';
      focus.recommendation = 'Target ' + weaknesses[0].topic + ' with untimed recovery practice.';
    } else if (strengths.length > 0) {
      focus.primaryArea = strengths[0].topic;
      focus.primaryReason = 'Strongest topic — maintain with challenge practice.';
      focus.recommendation = 'Challenge yourself on ' + strengths[0].topic + ' with timed practice.';
    } else {
      focus.primaryArea = 'Any topic';
      focus.primaryReason = 'Not enough data for focus recommendation.';
      focus.recommendation = 'Complete more practice sessions to enable focus recommendations.';
    }

    if (weaknesses.length > 1) {
      focus.secondaryArea = weaknesses[1].topic;
    }

    return focus;
  }

  // ════════════════════════════════════════════════════════
  // Helper: extract intervention queue
  // ════════════════════════════════════════════════════════
  function _extractInterventionQueue() {
    try {
      if (typeof MayInterventionPrioritizer !== 'undefined' && MayInterventionPrioritizer.rank) {
        var result = MayInterventionPrioritizer.rank();
        if (result && result.queue) {
          return result.queue.slice(0, 10).map(function(item) {
            return {
              topic: item.topic,
              tier: item.tierLabel,
              priorityScore: item.priorityScore,
              action: item.recommendedAction,
              band: item.band
            };
          });
        }
      }
    } catch (e) { /* pass */ }
    return [];
  }

  // ════════════════════════════════════════════════════════
  // Helper: section scores
  // ════════════════════════════════════════════════════════
  function _extractSectionScores() {
    try {
      if (typeof MayReadinessEngine !== 'undefined' && MayReadinessEngine.assess) {
        var assessment = MayReadinessEngine.assess();
        if (assessment && assessment.perSection) {
          var scores = {};
          Object.keys(assessment.perSection).forEach(function(sec) {
            var s = assessment.perSection[sec];
            scores[sec] = {
              label: s.label || sec,
              band: s.band,
              topicCount: s.topicCount,
              worstTopic: s.worstTopic,
              confidence: s.confidence
            };
          });
          return scores;
        }
      }
    } catch (e) { /* pass */ }

    // Fallback
    try {
      var sectionReadiness = MayLearnerState.getSectionReadinessSummary();
      if (sectionReadiness && sectionReadiness.sections) {
        var scores = {};
        Object.keys(sectionReadiness.sections).forEach(function(sec) {
          var s = sectionReadiness.sections[sec];
          scores[sec] = {
            label: s.label || sec,
            band: s.band,
            topicCount: s.topicCount,
            worstTopic: s.worstTopic,
            confidence: s.confidence
          };
        });
        return scores;
      }
    } catch (e) { /* pass */ }

    return {};
  }

  // ════════════════════════════════════════════════════════
  // Helper: recent trend
  // ════════════════════════════════════════════════════════
  function _computeRecentTrend(data, sessionCount) {
    if (sessionCount < 2) return { direction: 'insufficient_data', description: 'Not enough sessions for trend analysis.' };

    var recent3 = (data.sessions || []).slice(-3);
    var scores = recent3.map(function(s) { return s.scaledScore || s.mcqPct || 0; }).filter(function(s) { return s > 0; });

    if (scores.length < 2) return { direction: 'insufficient_data', description: 'Not enough scored sessions for trend.' };

    var first = scores[0];
    var last = scores[scores.length - 1];
    var delta = last - first;

    return {
      direction: delta > 10 ? 'improving' : (delta < -10 ? 'declining' : 'stable'),
      delta: Math.round(delta),
      recentCount: scores.length,
      description: delta > 10 ? 'Scores trending upward' : (delta < -10 ? 'Scores trending downward' : 'Scores stable')
    };
  }

  // ════════════════════════════════════════════════════════
  // Helper: compute streak
  // ════════════════════════════════════════════════════════
  function _computeStreak(data) {
    if (!data.sessions || data.sessions.length === 0) return 0;

    var sessionDates = data.sessions.map(function(s) {
      try { return new Date(s.date).toDateString(); } catch (e) { return null; }
    }).filter(Boolean);

    // Get unique calendar dates in reverse chronological order
    var unique = [];
    var seen = {};
    for (var i = sessionDates.length - 1; i >= 0; i--) {
      if (!seen[sessionDates[i]]) {
        seen[sessionDates[i]] = true;
        unique.push(sessionDates[i]);
      }
    }

    if (unique.length === 0) return 0;

    var today = new Date().toDateString();
    // Count consecutive days backward from the most recent session date
    var streak = 0;
    var checkDate = unique[0]; // most recent
    
    // If most recent session is more than 1 day old, streak is broken
    var msRecent = new Date(checkDate).getTime();
    var msToday = new Date(today).getTime();
    var dayDiff = Math.round((msToday - msRecent) / 86400000);
    if (dayDiff > 1) return 0;

    // Count backward
    var allSet = {};
    unique.forEach(function(d) { allSet[d] = true; });

    var current = new Date(checkDate);
    while (allSet[current.toDateString()]) {
      streak++;
      current.setDate(current.getDate() - 1);
    }

    return streak;
  }

  // ════════════════════════════════════════════════════════
  // Helper: last active
  // ════════════════════════════════════════════════════════
  function _lastActiveAt(data) {
    if (!data.sessions || data.sessions.length === 0) return null;
    var sessions = data.sessions.slice().sort(function(a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
    return sessions[0].date || null;
  }

  // ════════════════════════════════════════════════════════
  // Helper: days until exam
  // ════════════════════════════════════════════════════════
  function _daysUntil(examPlan) {
    if (!examPlan || !examPlan.hasScheduledExam) return null;
    var dateStr = examPlan.examDate || examPlan.targetDateOrWindow;
    if (!dateStr) return null;
    try {
      var target = new Date(dateStr);
      if (isNaN(target.getTime())) return null;
      var now = new Date();
      return Math.round((target - now) / 86400000);
    } catch (e) { return null; }
  }

  // ════════════════════════════════════════════════════════
  // Helper: derive topic band
  // ════════════════════════════════════════════════════════
  function _deriveTopicBand(tp) {
    if (!tp || tp.totalAttempts < 3) return 'Not enough data';
    var acc = tp.accuracy;
    if (acc === null) return 'Not enough data';
    if (acc >= 80) return 'Ready for focused review';
    if (acc >= 75) return 'Approaching review-ready';
    if (acc >= 60) return 'Developing';
    return 'Recovery needed';
  }

  // ════════════════════════════════════════════════════════
  // Helper: coaching analytics (MAY-005A stretch goal)
  // ════════════════════════════════════════════════════════
  function _computeCoachingAnalytics(intelligence, clusters, outcomes, data) {
    if (!intelligence) return null;

    var topics = Object.keys(intelligence.evidence || {});
    var sessionCount = (data.sessions || []).length;

    return {
      topWeakTopics: (intelligence.weaknesses || []).slice(0, 5).map(function(w) {
        return { topic: w.topic, accuracy: w.accuracy, attempts: w.attempts };
      }),
      mostFrequentRecommendations: _extractFrequentRecs(outcomes),
      remediationSuccessIndicators: _extractRemediationSuccess(intelligence, clusters),
      readinessTrend: _computeReadinessTrend(data, sessionCount),
      hasData: sessionCount >= 2
    };
  }

  function _extractFrequentRecs(outcomes) {
    if (!outcomes || !outcomes.byType) return [];

    return Object.entries(outcomes.byType)
      .sort(function(a, b) { return b[1].total - a[1].total; })
      .slice(0, 5)
      .map(function(entry) {
        return { type: entry[0], count: entry[1].total, positiveRate: entry[1].positive };
      });
  }

  function _extractRemediationSuccess(intelligence, clusters) {
    var indicators = [];

    if (clusters && clusters.improving.length > 0) {
      indicators.push({
        indicator: 'topics_improving',
        count: clusters.improving.length,
        topics: clusters.improving.map(function(t) { return t.topic; }),
        description: clusters.improving.length + ' topic(s) showing recent improvement'
      });
    }

    if (intelligence && intelligence.strengths.length > 0) {
      indicators.push({
        indicator: 'strong_topics',
        count: intelligence.strengths.length,
        topics: intelligence.strengths.map(function(s) { return s.topic; }),
        description: intelligence.strengths.length + ' topic(s) at strong proficiency level'
      });
    }

    return indicators;
  }

  function _computeReadinessTrend(data, sessionCount) {
    if (sessionCount < 2) return { direction: 'insufficient', description: 'Need more practice data to detect readiness trends.' };

    // Compare topic counts across sessions
    var recentSessions = (data.sessions || []).slice(-3);
    var first = recentSessions[0];
    var last = recentSessions[recentSessions.length - 1];

    if (!first || !last) return { direction: 'insufficient', description: 'Not enough session data.' };

    var firstScore = first.scaledScore || first.mcqPct || 0;
    var lastScore = last.scaledScore || last.mcqPct || 0;

    if (firstScore === 0 || lastScore === 0) return { direction: 'insufficient', description: 'Session scores not available.' };

    var delta = lastScore - firstScore;

    return {
      direction: delta > 10 ? 'improving' : (delta < -10 ? 'declining' : 'stable'),
      delta: Math.round(delta),
      description: delta > 10
        ? 'Readiness trending upward (+' + Math.round(delta) + ' points)'
        : (delta < -10
          ? 'Readiness trending downward (' + Math.round(delta) + ' points)'
          : 'Readiness stable over recent sessions')
    };
  }

  // ════════════════════════════════════════════════════════
  // Public API
  // ════════════════════════════════════════════════════════
  return {
    generate: generate,
    generateForTopic: generateForTopic,
    generateForSection: generateForSection,
    isEnabled: _isEnabled,
    FEATURE_FLAG: FEATURE_FLAG
  };

})();

if (typeof window !== 'undefined') {
  window.MayDashboardModel = MayDashboardModel;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayDashboardModel;
}
