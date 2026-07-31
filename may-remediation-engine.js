/**
 * MayRemediationEngine — Weak-area targeting and concept reinforcement.
 * 
 * Builds targeted recovery sets, identifies priority topics, and generates
 * quiz configurations for QUIZ and STUDY_PLAN coaching modes.
 * 
 * Session: MAY-004 — Adaptive Study Coach
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_ADAPTIVE_COACHING (default: false)
 */

const MayRemediationEngine = (function() {
  'use strict';

  function _flagEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING');
      }
    } catch (e) {}
    return false;
  }

  // ── Topic mapping helpers ─────────────────────────────────────

  /**
   * Map a topic name to a section letter for question-bank filtering.
   * Uses the sectionsSeen field from existing topic aggregates.
   */
  function _topicToSection(topic) {
    try {
      if (typeof MayLearnerState !== 'undefined') {
        var progress = MayLearnerState.getTopicProgress ? MayLearnerState.getTopicProgress() : {};
        var tp = progress[topic];
        if (tp && tp.sectionsSeen && tp.sectionsSeen.length > 0) {
          return tp.sectionsSeen[0];
        }
      }
    } catch (e) {}
    // Fallback: infer from topic name
    var t = topic.toLowerCase();
    if (t.includes('financial statement') || t.includes('revenue') || t.includes('inventory') ||
        t.includes('asset') || t.includes('liabilit') || t.includes('equity') || t.includes('cash flow') ||
        t.includes('ratio')) return 'A';
    if (t.includes('budget') || t.includes('forecast') || t.includes('planning')) return 'B';
    if (t.includes('performance') || t.includes('variance') || t.includes('balanced scorecard') ||
        t.includes('transfer')) return 'C';
    if (t.includes('cost') || t.includes('pricing') || t.includes('cvp') || t.includes('overhead') ||
        t.includes('job order') || t.includes('process cost')) return 'D';
    if (t.includes('control') || t.includes('coso') || t.includes('fraud') || t.includes('ethics') ||
        t.includes('governance')) return 'E';
    if (t.includes('technology') || t.includes('analytics') || t.includes('erp') || t.includes('data') ||
        t.includes('cyber') || t.includes('ai')) return 'F';
    return null;
  }

  /**
   * Map a topic to a difficulty level based on mastery band.
   */
  function _difficultyFromBand(band) {
    switch (band) {
      case 'Recovery needed': return 'Easy';
      case 'Developing': return 'Moderate';
      case 'Approaching review-ready': return 'Moderate';
      case 'Ready for focused review': return 'Difficult';
      default: return 'Moderate';
    }
  }

  // ── Public API ────────────────────────────────────────────────

  /**
   * Get the priority list of topics needing remediation.
   * Sorted by urgency: recovery → declining → weak → missed.
   * @param {Object} profile — LearnerProfile from MayLearnerProfile.build()
   * @returns {Array<string>} Sorted array of topic names
   */
  function getTargetedTopics(profile) {
    if (!_flagEnabled() || !profile) return [];
    var topics = [];
    var seen = {};

    // 1. Recovery-needed topics first
    if (profile.masteryLevels) {
      Object.keys(profile.masteryLevels).forEach(function(topic) {
        if (profile.masteryLevels[topic].band === 'Recovery needed' && !seen[topic]) {
          topics.push(topic); seen[topic] = true;
        }
      });
    }

    // 2. Declining topics
    (profile.decliningTopics || []).forEach(function(topic) {
      if (!seen[topic]) { topics.push(topic); seen[topic] = true; }
    });

    // 3. Weakness topics
    (profile.weaknesses || []).forEach(function(w) {
      if (!seen[w.topic]) { topics.push(w.topic); seen[w.topic] = true; }
    });

    // 4. Missed topics
    (profile.missedTopics || []).forEach(function(topic) {
      if (!seen[topic]) { topics.push(topic); seen[topic] = true; }
    });

    return topics;
  }

  /**
   * Build a quiz configuration for a specific topic.
   * @param {Object} profile — LearnerProfile
   * @param {string} topic — Target topic name
   * @returns {Object} { count, difficulty, excludeQIDs, section, topicFilter }
   */
  function getQuizConfig(profile, topic) {
    if (!_flagEnabled() || !profile || !topic) return null;

    var ml = profile.masteryLevels && profile.masteryLevels[topic];
    var band = ml ? ml.band : 'Developing';
    var difficulty = _difficultyFromBand(band);

    // If learner does fine on easy but poorly on hard, push difficulty up
    if (profile.behavior && profile.behavior.difficultySensitivity &&
        profile.behavior.difficultySensitivity.topics.indexOf(topic) >= 0) {
      difficulty = 'Moderate';
    }

    var section = _topicToSection(topic);
    var excludeQIDs = profile.recentQIDs || [];

    // Question count based on mastery
    var count = 10;
    if (band === 'Recovery needed') count = 15;    // More practice for weak areas
    if (band === 'Ready for focused review') count = 5;  // Just a warm-up

    return {
      count: count,
      difficulty: difficulty,
      excludeQIDs: excludeQIDs,
      section: section,
      topicFilter: topic
    };
  }

  /**
   * Build a targeted recovery set of QIDs for a weak topic.
   * This produces QID references — actual question fetching is handled by
   * the existing QUIZ mode handler and question bank infrastructure.
   * @param {Object} profile — LearnerProfile
   * @returns {Array<Object>} { topic, section, count, difficulty, rationale }
   */
  function buildRecoveryPlan(profile) {
    if (!_flagEnabled() || !profile) return [];

    var topics = getTargetedTopics(profile);
    if (topics.length === 0) return [];

    var plan = [];
    var maxPerTopic = 3; // max focus areas

    for (var i = 0; i < topics.length && plan.length < maxPerTopic; i++) {
      var topic = topics[i];
      var ml = profile.masteryLevels && profile.masteryLevels[topic];
      var band = ml ? ml.band : 'Developing';
      var config = getQuizConfig(profile, topic);
      if (!config) continue;

      var rationale = '';
      if (band === 'Recovery needed') {
        rationale = 'Priority recovery: accuracy at ' + (ml.accuracy || '?') + '%. Start with easy items to build confidence, then progress to moderate difficulty.';
      } else if (band === 'Developing') {
        rationale = 'Continuing development: accuracy at ' + (ml.accuracy || '?') + '%. Mix of moderate items with graduated difficulty.';
      } else {
        rationale = 'Reinforcement: recent misses on this topic. Short, focused drill.';
      }

      plan.push({
        topic: topic,
        section: config.section,
        count: config.count,
        difficulty: config.difficulty,
        rationale: rationale,
        excludeQIDs: config.excludeQIDs
      });
    }

    return plan;
  }

  /**
   * Get coaching reinforcement notes for a topic.
   * @param {Object} profile — LearnerProfile
   * @param {string} topic — Target topic 
   * @returns {string|null} Reinforcement note or null
   */
  function getReinforcementNotes(profile, topic) {
    if (!_flagEnabled() || !profile || !topic) return null;
    var ml = profile.masteryLevels && profile.masteryLevels[topic];
    if (!ml) return null;

    var notes = [];

    // Accuracy context
    if (ml.accuracy !== null && ml.accuracy !== undefined) {
      notes.push('Current accuracy: ' + ml.accuracy + '% over ' + (ml.attempts || 0) + ' attempts.');
    }

    // Trend context
    if (ml.direction === 'declining') {
      notes.push('Trend: declining (' + (ml.delta || '?') + '%). This topic needs attention before the gap widens.');
    } else if (ml.direction === 'improving') {
      notes.push('Trend: improving (+' + (ml.delta || '?') + '%). Keep building on this momentum.');
    }

    // Stability context
    if (ml.stability !== null && ml.stability < 50) {
      notes.push('Performance is unstable — focus on consistent correct answers before increasing difficulty.');
    }

    // Hint context
    if (ml.hintRate > 50) {
      notes.push('High hint usage — try answering without hints first, then use hints to verify.');
    }

    return notes.length > 0 ? notes.join(' ') : null;
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    getTargetedTopics: getTargetedTopics,
    getQuizConfig: getQuizConfig,
    buildRecoveryPlan: buildRecoveryPlan,
    getReinforcementNotes: getReinforcementNotes
  };

})();

if (typeof window !== 'undefined') {
  window.MayRemediationEngine = MayRemediationEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayRemediationEngine;
}
