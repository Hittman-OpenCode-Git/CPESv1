/**
 * MayLearnerProfile — Normalized learner profile for adaptive coaching.
 * 
 * Materializes a single snapshot of the learner's state from existing
 * MayLearnerState infrastructure. Computed once, consumed by all
 * adaptive coaching subsystems (recommender, remediation, coaching modes).
 * 
 * Session: MAY-004 — Adaptive Study Coach
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_ADAPTIVE_COACHING (default: false)
 */

const MayLearnerProfile = (function() {
  'use strict';

  function _flagEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING');
      }
    } catch (e) {}
    return false;
  }

  function _stateAvailable() {
    try {
      return typeof MayLearnerState !== 'undefined' &&
             typeof MayLearnerState.load === 'function' &&
             typeof MayLearnerState.getLearnerIntelligence === 'function';
    } catch (e) {}
    return false;
  }

  // ── Identity ────────────────────────────────────────────────

  function _buildIdentity(state, data) {
    return {
      learnerId: data.learnerId || 'anonymous',
      displayName: data.userName || null,
      firstVisit: data.firstVisit || null,
      studyStreak: _computeStreak(data)
    };
  }

  function _computeStreak(data) {
    var sessions = data.sessions || [];
    if (sessions.length === 0) return 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var streak = 0;
    var seen = {};
    sessions.forEach(function(s) {
      try {
        var d = new Date(s.date);
        d.setHours(0, 0, 0, 0);
        seen[d.toISOString().substring(0, 10)] = true;
      } catch (e) {}
    });
    for (var i = 0; i < 365; i++) {
      var check = new Date(today.getTime() - i * 86400000);
      var key = check.toISOString().substring(0, 10);
      if (seen[key]) { streak++; } else { break; }
    }
    return streak;
  }

  // ── Activity Summary ────────────────────────────────────────

  function _buildActivitySummary(data) {
    var sessions = data.sessions || [];
    var now = new Date();
    var sessionsLast7 = 0, sessionsLast28 = 0;
    sessions.forEach(function(s) {
      try {
        var d = new Date(s.date);
        var daysAgo = (now - d) / 86400000;
        if (daysAgo <= 7) sessionsLast7++;
        if (daysAgo <= 28) sessionsLast28++;
      } catch (e) {}
    });
    var totalAttempts = sessions.reduce(function(s, sess) {
      return s + (sess.attempts || []).length;
    }, 0);
    var lastActive = sessions.length > 0 ?
      sessions[sessions.length - 1].date : null;

    return {
      totalSessions: sessions.length,
      totalAttempts: totalAttempts,
      sessionsLast7Days: sessionsLast7,
      sessionsLast28Days: sessionsLast28,
      lastActiveAt: lastActive
    };
  }

  // ── Mastery Levels ──────────────────────────────────────────

  function _buildMasteryLevels(intel) {
    var levels = {};
    var evidence = intel.evidence || {};
    var topicNames = Object.keys(evidence);
    var strengths = {};
    var weaknesses = {};
    var trends = {};

    (intel.strengths || []).forEach(function(s) { strengths[s.topic] = s; });
    (intel.weaknesses || []).forEach(function(w) { weaknesses[w.topic] = w; });
    (intel.trends || []).forEach(function(t) { trends[t.topic] = t; });

    topicNames.forEach(function(topic) {
      var ev = evidence[topic];
      if (!ev) return;
      var tr = trends[topic] || {};
      var band = 'Developing';
      if (!ev.accuracy && ev.accuracy !== 0) { band = 'Not enough data'; }
      else if (ev.totalAttempts < 3) { band = 'Not enough data'; }
      else if (ev.accuracy >= 80 && ev.stability >= 75 && ev.totalAttempts >= 6 &&
               ev.direction !== 'declining') { band = 'Ready for focused review'; }
      else if (ev.accuracy >= 75 && ev.direction !== 'declining' &&
               ev.stability >= 60 && ev.totalAttempts >= 4) { band = 'Approaching review-ready'; }
      else if (ev.accuracy < 60 || ev.direction === 'declining' ||
               (ev.stability !== null && ev.stability < 50)) { band = 'Recovery needed'; }

      levels[topic] = {
        accuracy: ev.accuracy,
        recentAccuracy: ev.recentAccuracy,
        timeWeightedAccuracy: ev.timeWeightedAccuracy,
        attempts: ev.totalAttempts,
        stability: ev.stability,
        direction: ev.direction || 'stable',
        delta: ev.delta,
        band: band,
        hintRate: ev.hintRate || 0,
        avgDifficulty: ev.avgDifficulty,
        lastSeen: ev.lastSeen || null
      };
    });

    return levels;
  }

  // ── Strengths & Weaknesses ──────────────────────────────────

  function _buildSW(intel, masteryLevels) {
    var strengths = (intel.strengths || []).map(function(s) {
      return { topic: s.topic, accuracy: s.accuracy, attempts: s.totalAttempts, evidence: s.evidence || {} };
    });
    var weaknesses = (intel.weaknesses || []).map(function(w) {
      var ml = masteryLevels[w.topic] || {};
      return {
        topic: w.topic, accuracy: w.accuracy, attempts: w.totalAttempts,
        recentTrend: ml.direction || 'stable',
        evidence: w.evidence || {}
      };
    });
    var persistentWeak = [];
    var improving = [];
    var declining = [];
    try {
      if (typeof MayLearnerState !== 'undefined' && MayLearnerState.getWeaknessClusters) {
        var clusters = MayLearnerState.getWeaknessClusters();
        persistentWeak = (clusters.persistentWeak || []).map(function(c) { return c.topic; });
        improving = (clusters.improving || []).map(function(c) { return c.topic; });
        declining = (clusters.declining || []).map(function(c) { return c.topic; });
      }
    } catch (e) {}

    return { strengths: strengths, weaknesses: weaknesses,
      persistentWeakTopics: persistentWeak, improvingTopics: improving, decliningTopics: declining };
  }

  // ── Readiness Score ─────────────────────────────────────────

  function _buildReadinessScore(data, masteryLevels) {
    var sectionSummary = null;
    try {
      if (typeof MayLearnerState !== 'undefined' && MayLearnerState.getSectionReadinessSummary) {
        sectionSummary = MayLearnerState.getSectionReadinessSummary();
      }
    } catch (e) {}

    var sectionMap = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    var perSection = {};
    var sections = ['A', 'B', 'C', 'D', 'E', 'F'];

    sections.forEach(function(sec) {
      var info = sectionSummary && sectionSummary.sections ?
        sectionSummary.sections[sec] : null;
      perSection[sec] = {
        band: info ? info.band : 'Not enough data',
        confidence: info ? info.confidence : 'high',
        rationale: info ? info.rationale : 'No section data available.'
      };
    });

    var bandScores = {
      'Ready for focused review': 85,
      'Approaching review-ready': 70,
      'Developing': 50,
      'Recovery needed': 25,
      'Not enough data': 0
    };

    var totalWeight = 0, weightedSum = 0;
    sections.forEach(function(sec) {
      var info = sectionSummary && sectionSummary.sections ?
        sectionSummary.sections[sec] : null;
      var weight = info ? info.topicCount || 1 : 1;
      var score = bandScores[perSection[sec].band] || 0;
      weightedSum += weight * score;
      totalWeight += weight;
    });

    var overall = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
    var overallBand = 'Not enough data';
    if (overall >= 80) overallBand = 'Ready for focused review';
    else if (overall >= 65) overallBand = 'Approaching review-ready';
    else if (overall >= 35) overallBand = 'Developing';
    else if (overall > 0) overallBand = 'Recovery needed';

    var allHighConf = true;
    sections.forEach(function(sec) {
      if (perSection[sec].confidence === 'low') allHighConf = false;
    });
    var confidence = allHighConf ? 'high' : 'moderate';

    return {
      overall: overall,
      confidence: confidence,
      band: overallBand,
      perSection: perSection
    };
  }

  // ── Behavior Patterns ───────────────────────────────────────

  function _buildBehavior(intel, data) {
    var hintDependency = { topics: [], trend: 'stable' };
    var difficultySensitivity = { topics: [], gap: 0 };
    var confidenceCalibration = { overconfidentRate: 0, underconfidentRate: 0, calibratedRate: 0 };
    var casePatterns = { dominant: null, dominantTrend: null, secondary: null };

    try {
      if (typeof MayLearnerState !== 'undefined') {
        if (MayLearnerState.getWeaknessClusters) {
          var clusters = MayLearnerState.getWeaknessClusters();
          hintDependency.topics = (clusters.hintDependent || []).map(function(c) { return c.topic; });
          hintDependency.trend = hintDependency.topics.length > 0 ? 'increasing' : 'stable';
          var dsTopics = (clusters.difficultySensitive || []);
          difficultySensitivity.topics = dsTopics.map(function(c) { return c.topic; });
          if (dsTopics.length > 0) difficultySensitivity.gap = dsTopics[0].lowPct - dsTopics[0].highPct;
        }
        if (MayLearnerState.getConfidenceCalibration) {
          var cal = MayLearnerState.getConfidenceCalibration();
          var totalOver = 0, totalUnder = 0, totalCal = 0, total = 0;
          Object.keys(cal).forEach(function(k) {
            totalOver += cal[k].overconfident || 0;
            totalUnder += cal[k].underconfident || 0;
            total += cal[k].total || 0;
          });
          totalCal = total - totalOver - totalUnder;
          if (total > 0) {
            confidenceCalibration.overconfidentRate = Math.round(totalOver / total * 100);
            confidenceCalibration.underconfidentRate = Math.round(totalUnder / total * 100);
            confidenceCalibration.calibratedRate = Math.round(totalCal / total * 100);
          }
        }
        if (MayLearnerState.getCasePatternSummary) {
          var cp = MayLearnerState.getCasePatternSummary();
          if (cp) {
            casePatterns.dominant = cp.dominantPattern || null;
            casePatterns.secondary = cp.secondaryPattern || null;
            var caseTrends = MayLearnerState.getCasePatternTrends ? MayLearnerState.getCasePatternTrends() : [];
            var domTrend = caseTrends.find(function(t) { return t.pattern === cp.dominantPattern; });
            if (domTrend) casePatterns.dominantTrend = domTrend.signal;
          }
        }
      }
    } catch (e) {}

    return {
      hintDependency: hintDependency,
      difficultySensitivity: difficultySensitivity,
      confidenceCalibration: confidenceCalibration,
      casePatterns: casePatterns
    };
  }

  // ── Recent Activity ─────────────────────────────────────────

  function _buildRecentActivity(data) {
    var sessions = data.sessions || [];
    var recentTopics = [];
    var recentQIDs = [];
    var missedTopics = [];
    var seenTopics = {};
    var last3 = sessions.slice(-3);

    last3.forEach(function(s) {
      (s.attempts || []).forEach(function(a) {
        var topic = a.topic || 'Unclassified';
        if (!seenTopics[topic]) {
          seenTopics[topic] = { correct: 0, total: 0 };
        }
        seenTopics[topic].total++;
        if (a.correct) seenTopics[topic].correct++;
        recentQIDs.push(a.questionId);
      });
    });

    Object.keys(seenTopics).forEach(function(topic) {
      recentTopics.push(topic);
      var st = seenTopics[topic];
      if (st.total >= 3 && st.correct / st.total < 0.5) {
        missedTopics.push(topic);
      }
    });

    return {
      recentTopics: recentTopics,
      recentQIDs: recentQIDs.slice(-50),
      missedTopics: missedTopics
    };
  }

  // ── Exam Context ────────────────────────────────────────────

  function _buildExamContext(data) {
    var plan = data.examPlan || null;
    if (!plan) return null;
    var daysUntil = null;
    var examDate = plan.examDate || null;
    if (examDate && examDate !== 'not specified') {
      try {
        var d = new Date(examDate);
        if (!isNaN(d.getTime())) {
          daysUntil = Math.round((d - new Date()) / 86400000);
        }
      } catch (e) {}
    }
    return {
      hasScheduledExam: !!plan.hasScheduledExam,
      examPart: plan.examPart || plan.plannedExamPart || null,
      examDate: examDate,
      daysUntilExam: daysUntil,
      planningExam: !!plan.planningExam,
      targetDateOrWindow: plan.targetDateOrWindow || null
    };
  }

  // ── Recommended Actions (derived) ──────────────────────────

  function _buildRecommendedActions(profile) {
    if (typeof MayAdaptiveRecommender !== 'undefined' &&
        typeof MayAdaptiveRecommender.generate === 'function') {
      return MayAdaptiveRecommender.generate(profile);
    }
    return [];
  }

  // ── Metadata ─────────────────────────────────────────────────

  function _buildMeta(profile) {
    var dataSuff = 'insufficient';
    if (profile.totalSessions >= 3 &&
        Object.keys(profile.masteryLevels).length >= 3) {
      dataSuff = 'sufficient';
    } else if (profile.totalSessions >= 1) {
      dataSuff = 'limited';
    }
    return {
      computedAt: new Date().toISOString(),
      modelVersion: 'S111-1.0',
      engineVersion: 'S134-1.0',
      profileVersion: 'MAY004-1.0',
      dataSufficiency: dataSuff,
      topicCount: Object.keys(profile.masteryLevels).length,
      sessionCount: profile.totalSessions
    };
  }

  // ─── Public API ──────────────────────────────────────────────

  /**
   * Build a normalized learner profile from existing MayLearnerState data.
   * @returns {Object|null} LearnerProfile or null if flags disabled or state unavailable
   */
  function build() {
    if (!_flagEnabled()) return null;
    if (!_stateAvailable()) return null;

    var data, intel;
    try {
      data = MayLearnerState.load();
      intel = MayLearnerState.getLearnerIntelligence();
    } catch (e) {
      return null;
    }

    if (!data || !intel) return null;

    var identity = _buildIdentity(data, data);
    var activity = _buildActivitySummary(data);
    var masteryLevels = _buildMasteryLevels(intel);
    var sw = _buildSW(intel, masteryLevels);
    var readiness = _buildReadinessScore(data, masteryLevels);
    var behavior = _buildBehavior(intel, data);
    var recent = _buildRecentActivity(data);
    var examPlan = _buildExamContext(data);

    var profile = {
      learnerId: identity.learnerId,
      displayName: identity.displayName,
      firstVisit: identity.firstVisit,
      studyStreak: identity.studyStreak,
      totalSessions: activity.totalSessions,
      totalAttempts: activity.totalAttempts,
      sessionsLast7Days: activity.sessionsLast7Days,
      sessionsLast28Days: activity.sessionsLast28Days,
      lastActiveAt: activity.lastActiveAt,
      masteryLevels: masteryLevels,
      strengths: sw.strengths,
      weaknesses: sw.weaknesses,
      persistentWeakTopics: sw.persistentWeakTopics,
      improvingTopics: sw.improvingTopics,
      decliningTopics: sw.decliningTopics,
      readinessScore: readiness,
      behavior: behavior,
      recentTopics: recent.recentTopics,
      recentQIDs: recent.recentQIDs,
      missedTopics: recent.missedTopics,
      examPlan: examPlan
    };

    profile.recommendedActions = _buildRecommendedActions(profile);
    profile._meta = _buildMeta(profile);

    return profile;
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    build: build
  };

})();

if (typeof window !== 'undefined') {
  window.MayLearnerProfile = MayLearnerProfile;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayLearnerProfile;
}
