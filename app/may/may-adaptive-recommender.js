/**
 * MayAdaptiveRecommender — Adaptive recommendation engine for May coaching.
 * 
 * Applies 10 deterministic adaptation rules to a learner profile, generating
 * actionable, evidence-backed coaching recommendations.
 * 
 * Session: MAY-004 — Adaptive Study Coach
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_ADAPTIVE_COACHING (default: false)
 */

const MayAdaptiveRecommender = (function() {
  'use strict';

  function _flagEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING');
      }
    } catch (e) {}
    return false;
  }

  /**
   * Look up closed-loop outcome for a topic to determine priority adjustment.
   */
  function _getOutcomeAdjustment(topic, outcomes) {
    if (!outcomes || !outcomes.byTopic) return 'none';
    var topicEntry = outcomes.byTopic[topic];
    if (!topicEntry) return 'none';
    var lastOutcome = topicEntry.outcomes.length > 0 ?
      topicEntry.outcomes[topicEntry.outcomes.length - 1] : null;
    if (lastOutcome === 'positive' || lastOutcome === 'contradictory') {
      return lastOutcome;
    }
    return lastOutcome === 'neutral' ? 'neutral' : 'none';
  }

  /**
   * Adjust priority downward by one tier.
   */
  function _downgradePriority(priority) {
    if (priority === 'high') return 'medium';
    if (priority === 'medium') return 'low';
    return 'low';
  }

  // ── R1: Weak Area Detection → Remediation ────────────────────

  function _ruleWeakAreas(profile, outcomes) {
    var actions = [];
    if (!profile.weaknesses || profile.weaknesses.length === 0) return actions;
    var sorted = profile.weaknesses.slice().sort(function(a, b) {
      if (a.accuracy !== b.accuracy) return (a.accuracy || 0) - (b.accuracy || 0);
      return (b.attempts || 0) - (a.attempts || 0);
    });
    sorted.forEach(function(w) {
      var adj = _getOutcomeAdjustment(w.topic, outcomes);
      if (adj === 'contradictory') return; // don't re-recommend
      var priority = adj === 'positive' ? _downgradePriority('high') : 'high';
      actions.push({
        type: 'remediation',
        priority: priority,
        topic: w.topic,
        section: null,
        rationale: 'Accuracy below 60% on ' + w.topic + ' (' + w.accuracy + '%) — prioritizing concept recovery.',
        evidence: { accuracy: w.accuracy, attempts: w.attempts, recentTrend: w.recentTrend }
      });
    });
    return actions;
  }

  // ── R2: Repeated Errors → Targeted Quiz ─────────────────────

  function _ruleRepeatedErrors(profile, outcomes) {
    var actions = [];
    if (!profile.missedTopics || profile.missedTopics.length === 0) return actions;
    // Pick most frequently missed (first in list is most recent accumulation)
    var topic = profile.missedTopics[0];
    var ml = profile.masteryLevels && profile.masteryLevels[topic];
    if (!ml || ml.attempts < 3) return actions;
    var adj = _getOutcomeAdjustment(topic, outcomes);
    if (adj === 'contradictory') return actions;
    var priority = adj === 'positive' ? _downgradePriority('medium') : 'medium';
    actions.push({
      type: 'reinforcement',
      priority: priority,
      topic: topic,
      section: null,
      rationale: 'Recent misses on ' + topic + ' — targeted drill recommended.',
      evidence: { recentAccuracy: ml.recentAccuracy, totalAttempts: ml.attempts }
    });
    return actions;
  }

  // ── R3: High Mastery → Challenge Questions ──────────────────
  // MAY-012: Suppress challenge when any topic is in recovery (<50% accuracy)
  // to avoid recommending advanced content while critical gaps exist

  function _ruleHighMastery(profile) {
    var actions = [];
    if (!profile.strengths || profile.strengths.length === 0) return actions;

    // MAY-012: Check for critical weaknesses — if any topic <50%, skip challenges entirely
    var hasCriticalWeakness = false;
    if (profile.weaknesses && profile.weaknesses.length > 0) {
      profile.weaknesses.forEach(function(w) {
        if ((w.accuracy || 0) < 50) hasCriticalWeakness = true;
      });
    }
    if (hasCriticalWeakness) return actions;

    var sorted = profile.strengths.slice().sort(function(a, b) {
      return (b.accuracy || 0) - (a.accuracy || 0);
    });
    var cap = 3;
    for (var i = 0; i < sorted.length && cap > 0; i++) {
      var s = sorted[i];
      var ml = profile.masteryLevels && profile.masteryLevels[s.topic];
      if (!ml || ml.attempts < 6) continue;
      actions.push({
        type: 'challenge',
        priority: 'medium',
        topic: s.topic,
        section: null,
        rationale: 'Strong at ' + s.topic + ' (' + s.accuracy + '% accuracy) — ready for advanced application.',
        evidence: { accuracy: s.accuracy, attempts: ml.attempts, stability: ml.stability }
      });
      cap--;
    }
    return actions;
  }

  // ── R4: Declining Trend → Intervention ──────────────────────

  function _ruleDeclining(profile, outcomes) {
    var actions = [];
    if (!profile.decliningTopics || profile.decliningTopics.length === 0) return actions;
    // Find the most severely declining topic (largest negative delta)
    var worst = null, worstDelta = 0;
    profile.decliningTopics.forEach(function(topic) {
      var ml = profile.masteryLevels && profile.masteryLevels[topic];
      if (!ml) return;
      var delta = ml.delta || 0;
      if (delta < worstDelta) { worstDelta = delta; worst = topic; }
    });
    if (!worst) return actions;
    var ml = profile.masteryLevels[worst];
    var adj = _getOutcomeAdjustment(worst, outcomes);
    if (adj === 'contradictory') return actions;
    var priority = adj === 'positive' ? _downgradePriority('high') : 'high';
    actions.push({
      type: 'remediation',
      priority: priority,
      topic: worst,
      section: null,
      rationale: worst + ' declining (' + ml.delta + '%) — intervene before gap widens.',
      evidence: { accuracy: ml.accuracy, delta: ml.delta, direction: ml.direction }
    });
    return actions;
  }

  // ── R5: Section Gap → Domain Work ────────────────────────────

  function _ruleSectionGap(profile) {
    var actions = [];
    if (!profile.examPlan || !profile.examPlan.daysUntilExam ||
        profile.examPlan.daysUntilExam > 30) return actions;
    if (!profile.readinessScore || !profile.readinessScore.perSection) return actions;
    var weakest = null, worstScore = 999;
    var sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    var bandOrder = { 'Not enough data': 0, 'Recovery needed': 1, 'Developing': 2,
      'Approaching review-ready': 3, 'Ready for focused review': 4 };
    sections.forEach(function(sec) {
      var ps = profile.readinessScore.perSection[sec];
      if (!ps) return;
      var order = bandOrder[ps.band] || 0;
      if (order < worstScore) { worstScore = order; weakest = sec; }
    });
    if (!weakest || bandOrder[profile.readinessScore.perSection[weakest].band] >= 2) return actions;
    var ps = profile.readinessScore.perSection[weakest];
    actions.push({
      type: 'review',
      priority: 'high',
      topic: null,
      section: weakest,
      rationale: 'Section ' + weakest + ' (' + ps.band + ') needs attention with ' +
        profile.examPlan.daysUntilExam + ' days until exam.',
      evidence: { sectionBand: ps.band, daysUntilExam: profile.examPlan.daysUntilExam }
    });
    return actions;
  }

  // ── R6: Exam Approaching → Review Plan ───────────────────────

  function _ruleExamApproaching(profile) {
    var actions = [];
    if (!profile.examPlan || !profile.examPlan.daysUntilExam ||
        profile.examPlan.daysUntilExam > 14 || profile.examPlan.daysUntilExam <= 0) return actions;
    actions.push({
      type: 'review',
      priority: 'high',
      topic: null,
      section: null,
      rationale: 'Exam in ' + profile.examPlan.daysUntilExam + ' days — prioritize high-yield review areas.',
      evidence: { daysUntilExam: profile.examPlan.daysUntilExam, overallReadiness: profile.readinessScore.band }
    });
    return actions;
  }

  // ── R7: Hint Dependency → Strategy Shift ─────────────────────

  function _ruleHintDependency(profile) {
    var actions = [];
    var hd = profile.behavior && profile.behavior.hintDependency;
    if (!hd || hd.trend !== 'increasing' || hd.topics.length === 0) return actions;
    actions.push({
      type: 'remediation',
      priority: 'medium',
      topic: hd.topics[0],
      section: null,
      rationale: 'Hint usage increasing — may be developing over-reliance; try untimed practice.',
      evidence: { hintTrend: hd.trend, affectedTopics: hd.topics }
    });
    return actions;
  }

  // ── R8: Case Skills Gap → Case Reinforcement ─────────────────

  function _ruleCaseGap(profile) {
    var actions = [];
    var cp = profile.behavior && profile.behavior.casePatterns;
    if (!cp || cp.dominantTrend !== 'worsening' || !cp.dominant) return actions;
    actions.push({
      type: 'practice_mix',
      priority: 'medium',
      topic: null,
      section: null,
      rationale: 'Case pattern ' + cp.dominant + ' worsening — prioritize case practice.',
      evidence: { dominantPattern: cp.dominant, dominantTrend: cp.dominantTrend }
    });
    return actions;
  }

  // ── R9: Stale Topics → Rotation ──────────────────────────────

  function _ruleStaleTopics(profile) {
    var actions = [];
    var now = new Date();
    if (!profile.masteryLevels) return actions;
    Object.keys(profile.masteryLevels).forEach(function(topic) {
      var ml = profile.masteryLevels[topic];
      if (!ml.lastSeen) return;
      if (ml.band === 'Ready for focused review') return;
      try {
        var daysSince = Math.round((now - new Date(ml.lastSeen)) / 86400000);
        if (daysSince > 28) {
          actions.push({
            type: 'reinforcement',
            priority: 'low',
            topic: topic,
            section: null,
            rationale: topic + ' not practiced in ' + daysSince + ' days — rotate back in.',
            evidence: { lastSeen: ml.lastSeen, daysSince: daysSince }
          });
        }
      } catch (e) {}
    });
    return actions;
  }

  // ── R10: Insufficient Data → Default ─────────────────────────

  function _ruleInsufficientData(profile) {
    if (!profile._meta || profile._meta.dataSufficiency !== 'insufficient') return [];
    return [{
      type: 'practice_mix',
      priority: 'medium',
      topic: null,
      section: null,
      rationale: 'Complete more sessions to unlock personalized recommendations.',
      evidence: { sessionCount: profile.totalSessions, topicCount: profile._meta.topicCount }
    }];
  }

  // ── Deduplication & Sorting ──────────────────────────────────

  function _deduplicateAndSort(actions) {
    // Group by type+topic, keep highest priority
    var seen = {};
    var deduped = [];
    actions.forEach(function(a) {
      var key = a.type + '|' + (a.topic || '') + '|' + (a.section || '');
      if (!seen[key]) {
        seen[key] = a;
        deduped.push(a);
      } else {
        // Keep higher priority
        var existing = seen[key];
        var order = { high: 3, medium: 2, low: 1 };
        if (order[a.priority] > order[existing.priority]) {
          seen[key] = a;
          // Merge evidence
          a.evidence = Object.assign({}, existing.evidence, a.evidence);
        }
      }
    });

    // Sort: priority desc, then type order, then strongest evidence
    var priorityOrder = { high: 0, medium: 1, low: 2 };
    var typeOrder = { remediation: 0, review: 1, reinforcement: 2, challenge: 3, practice_mix: 4 };

    deduped.sort(function(a, b) {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority])
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      if (typeOrder[a.type] !== typeOrder[b.type])
        return typeOrder[a.type] - typeOrder[b.type];
      var aEv = a.evidence.attempts || a.evidence.totalAttempts || 0;
      var bEv = b.evidence.attempts || b.evidence.totalAttempts || 0;
      return bEv - aEv;
    });

    return deduped.slice(0, 5);
  }

  // ─── Public API ──────────────────────────────────────────────

  /**
   * Generate adaptive coaching recommendations from a learner profile.
   * @param {Object} profile — Normalized learner profile from MayLearnerProfile.build()
   * @returns {Array<Object>} Array of recommended actions (max 5)
   */
  function generate(profile) {
    if (!_flagEnabled()) return [];
    if (!profile) return [];

    var outcomes = null;
    try {
      if (typeof MayLearnerState !== 'undefined' && MayLearnerState.getRecommendationRecurrence) {
        outcomes = MayLearnerState.getRecommendationRecurrence();
      }
    } catch (e) {}

    var actions = [];

    actions = actions.concat(_ruleWeakAreas(profile, outcomes));
    actions = actions.concat(_ruleDeclining(profile, outcomes));
    actions = actions.concat(_ruleExamApproaching(profile));
    actions = actions.concat(_ruleSectionGap(profile));
    actions = actions.concat(_ruleRepeatedErrors(profile, outcomes));
    actions = actions.concat(_ruleHintDependency(profile));
    actions = actions.concat(_ruleCaseGap(profile));
    actions = actions.concat(_ruleHighMastery(profile));
    actions = actions.concat(_ruleStaleTopics(profile));

    if (actions.length === 0) {
      actions = actions.concat(_ruleInsufficientData(profile));
    }

    return _deduplicateAndSort(actions);
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    generate: generate
  };

})();

if (typeof window !== 'undefined') {
  window.MayAdaptiveRecommender = MayAdaptiveRecommender;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayAdaptiveRecommender;
}
