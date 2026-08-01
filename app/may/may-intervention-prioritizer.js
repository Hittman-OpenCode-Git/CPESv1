/**
 * MayInterventionPrioritizer — Ranks remediation opportunities, study priorities,
 * and identifies the highest-value next action for the learner.
 * 
 * Consumes MayLearnerState and MayReadinessEngine outputs. All outputs are
 * deterministic, rule-based, and advisory only.
 * 
 * Gated behind MayFeatureFlags.ENABLE_READINESS_SCORING (default: false).
 * When disabled, rank() returns null.
 * 
 * Session: MAY-005
 * Governance: Light Lane (analytics layer — no pack/case/content impact)
 */
const MayInterventionPrioritizer = (function() {
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
  // Intervention tier definitions
  // ════════════════════════════════════════════════════════
  var TIERS = {
    CRITICAL_REMEDIATION: { tier: 1, label: 'Critical Weakness', urgency: 50, action: 'Immediate remediation' },
    EMERGING_WEAKNESS:   { tier: 2, label: 'Emerging Weakness', urgency: 40, action: 'Targeted coaching' },
    FRAGILE_KNOWLEDGE:   { tier: 3, label: 'Fragile Knowledge', urgency: 30, action: 'Consolidation' },
    MASTERED_AREA:       { tier: 4, label: 'Mastered Area', urgency: 20, action: 'Challenge content' },
    EXAM_RISK:           { tier: 5, label: 'Exam Risk', urgency: 15, action: 'Review campaign' }
  };

  // ════════════════════════════════════════════════════════
  // rank() — Primary entry point
  // Returns ordered priority queue or null if feature disabled
  // ════════════════════════════════════════════════════════
  function rank() {
    if (!_isEnabled()) return null;

    try {
      if (typeof MayLearnerState === 'undefined') return null;
    } catch (e) { return null; }

    var readiness = MayLearnerState.getReadinessSummary();
    var intelligence = MayLearnerState.getLearnerIntelligence();
    var clusters = MayLearnerState.getWeaknessClusters();
    var topicProgress = MayLearnerState.getTopicProgress();
    var data = MayLearnerState.load();
    var examPlan = data.examPlan || null;
    var recurrence = MayLearnerState.getRecommendationRecurrence();

    if (!readiness || !intelligence) return [];

    var candidates = [];

    // ── Scan every topic for intervention opportunities ──
    if (readiness.topics) {
      readiness.topics.forEach(function(t) {
        if (t.band === 'Not enough data') return;

        var tp = topicProgress[t.topic] || {};
        var tier = _classifyTier(t, clusters, tp);
        if (!tier) return;

        var score = _computePriorityScore(t, tier, tp, examPlan, recurrence);

        candidates.push({
          topic: t.topic,
          tier: tier.tier,
          tierLabel: tier.label,
          priorityScore: score,
          accuracy: t.accuracy,
          attempts: t.attempts,
          recentPct: t.recentPct,
          direction: t.direction,
          stability: t.stability,
          band: t.band,
          recommendedAction: _actionForTier(tier, t, tp),
          evidence: {
            accuracy: t.accuracy,
            attempts: t.attempts,
            direction: t.direction,
            delta: t.delta,
            stability: t.stability,
            band: t.band,
            hintTrend: tp.hintTrend || 'stable'
          }
        });
      });
    }

    // ── Add case-level intervention if warranted ──
    if (readiness.caseReadiness && readiness.caseReadiness.band === 'Recovery needed') {
      candidates.push({
        topic: null,
        casePattern: readiness.caseReadiness.dominantPattern,
        tier: 2,
        tierLabel: 'Case Skill Recovery',
        priorityScore: _computeCasePriority(readiness, examPlan),
        accuracy: null,
        attempts: null,
        direction: readiness.caseReadiness.dominantTrend,
        stability: null,
        band: readiness.caseReadiness.band,
        recommendedAction: 'Untimed case practice — focus on ' + (readiness.caseReadiness.dominantPattern || 'evidence location'),
        evidence: {
          dominantPattern: readiness.caseReadiness.dominantPattern,
          dominantTrend: readiness.caseReadiness.dominantTrend,
          totalMisses: readiness.caseReadiness.totalCaseMisses
        }
      });
    }

    // ── Sort by priority score descending ──
    candidates.sort(function(a, b) { return b.priorityScore - a.priorityScore; });

    // ── Apply recurrence penalty (deprioritize recently recommended topics) ──
    if (recurrence && recurrence.byTopic) {
      candidates.forEach(function(c) {
        if (!c.topic) return;
        var rec = recurrence.byTopic[c.topic];
        if (rec && rec.recurrenceAdjustment === 'deprioritize') {
          c.priorityScore = Math.max(0, c.priorityScore - 15);
          c.recurrenceNote = 'Previously recommended — deprioritized pending new evidence';
        }
      });
      candidates.sort(function(a, b) { return b.priorityScore - a.priorityScore; });
    }

    return {
      queue: candidates.slice(0, 10),
      topAction: candidates.length > 0 ? candidates[0] : null,
      totalCandidates: candidates.length,
      _meta: {
        generatedAt: new Date().toISOString(),
        engineVersion: 'MAY014-1.0',
        flag: FEATURE_FLAG,
        tiersApplied: Object.keys(TIERS).length
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // _classifyTier — Assign a topic to its intervention tier
  // ════════════════════════════════════════════════════════
  function _classifyTier(topicEntry, clusters, topicProgressEntry) {
    var acc = topicEntry.accuracy;
    var attempts = topicEntry.attempts;
    var direction = topicEntry.direction;
    var stability = topicEntry.stability;
    var band = topicEntry.band;

    // Tier 1 — Critical weakness
    if (acc !== null && acc < 50 && attempts >= 5) return TIERS.CRITICAL_REMEDIATION;
    // MAY-014: Removed band-based tier-1 catch-all. The first rule (acc<50) already catches
    // truly critical topics. Topics at 50-60% with instability deserve tier 2 (emerging),
    // allowing D3's SOCRATIC path to activate for unstable+declining patterns.
    // Old rule (removed): band === 'Recovery needed' && direction === 'declining' && attempts >= 5

    // Tier 2 — Emerging weakness
    if (acc !== null && acc >= 50 && acc < 60 && attempts >= 5) return TIERS.EMERGING_WEAKNESS;
    if (direction === 'declining' && attempts >= 4 && (stability === null || stability < 50)) return TIERS.EMERGING_WEAKNESS;
    if (topicProgressEntry && topicProgressEntry.hintTrend === 'increasing' && acc >= 70 && attempts >= 4) return TIERS.EMERGING_WEAKNESS;

    // MAY-014: Mastery-level topics (acc ≥ 80%) skip fragile classification entirely.
    // High accuracy with borderline micro-metrics is not "fragile" — it's ready for challenge (D9).
    if (acc !== null && acc >= 80) return TIERS.MASTERED_AREA;

    // Tier 3 — Fragile knowledge
    if (acc !== null && acc >= 60 && acc < 75 && attempts >= 3 && (stability !== null && stability < 50)) return TIERS.FRAGILE_KNOWLEDGE;
    if (direction === 'slightly_declining' && attempts >= 3) return TIERS.FRAGILE_KNOWLEDGE;

    // Tier 4 — Mastered area
    if (acc !== null && acc >= 85 && attempts >= 6 && direction !== 'declining' && direction !== 'slightly_declining' && (stability === null || stability >= 75)) {
      return TIERS.MASTERED_AREA;
    }

    // Tier 5 — Exam risk (only if exam scheduled soon)
    return null; // handled separately via exam timeline check
  }

  // ════════════════════════════════════════════════════════
  // _computePriorityScore — Composite priority score
  // ════════════════════════════════════════════════════════
  function _computePriorityScore(topicEntry, tier, topicProgressEntry, examPlan, recurrence) {
    var score = tier.urgency;

    // Accuracy gap
    var accuracyGap = topicEntry.accuracy !== null ? Math.max(0, 85 - topicEntry.accuracy) : 0;
    score += accuracyGap;

    // Instability penalty
    if (topicEntry.stability !== null) {
      score += Math.max(0, 60 - topicEntry.stability);
    }

    // Exam proximity bonus
    if (examPlan && examPlan.hasScheduledExam && examPlan.examDate) {
      try {
        var target = new Date(examPlan.examDate);
        var now = new Date();
        var daysUntil = Math.round((target - now) / 86400000);
        if (daysUntil > 0 && daysUntil < 90) {
          score += Math.round(Math.max(0, 30 - daysUntil) / 2);
        }
      } catch (e) { /* ignore */ }
    }

    // Recency decay: penalize topics seen very recently
    if (topicProgressEntry && topicProgressEntry.lastSeen) {
      try {
        var lastSeen = new Date(topicProgressEntry.lastSeen);
        var daysSince = Math.round((now - lastSeen) / 86400000);
        if (daysSince > 3) {
          score += Math.min(10, daysSince); // bonus for neglected topics
        } else if (daysSince < 1) {
          score = Math.max(0, score - 5); // just practiced, slight penalty
        }
      } catch (e) { /* ignore */ }
    }

    return Math.max(0, Math.round(score));
  }

  // ════════════════════════════════════════════════════════
  // _computeCasePriority — Priority score for case intervention
  // ════════════════════════════════════════════════════════
  function _computeCasePriority(readiness, examPlan) {
    var score = 40;
    if (readiness.caseReadiness) {
      score += readiness.caseReadiness.totalCaseMisses || 0;
      if (readiness.caseReadiness.dominantTrend === 'worsening') score += 10;
    }
    return score;
  }

  // ════════════════════════════════════════════════════════
  // _actionForTier — Human-readable action description
  // ════════════════════════════════════════════════════════
  function _actionForTier(tier, topicEntry, tp) {
    switch (tier.tier) {
      case 1:
        return 'Start a recovery set on ' + topicEntry.topic + ' — untimed, 10–15 questions, review every explanation.';
      case 2:
        return 'Practice ' + topicEntry.topic + ' with graduated hints. Focus on process errors over knowledge gaps.';
      case 3:
        return 'Build consistency on ' + topicEntry.topic + ' with focused untimed practice. Aim for 4 of 5 correct without hints.';
      case 4:
        return 'Challenge: timed practice on ' + topicEntry.topic + ' at increased difficulty or case-based format.';
      case 5:
        return 'Time-pressured review — mix high-yield ' + (topicEntry.topic || 'topics') + ' with exam conditions.';
      default:
        return 'Review ' + topicEntry.topic + ' with targeted practice.';
    }
  }

  // ════════════════════════════════════════════════════════
  // getHighestValueAction() — Single best next action
  // ════════════════════════════════════════════════════════
  function getHighestValueAction() {
    var result = rank();
    if (!result || !result.topAction) return null;
    return {
      action: result.topAction.recommendedAction,
      topic: result.topAction.topic,
      tier: result.topAction.tierLabel,
      priorityScore: result.topAction.priorityScore,
      evidence: result.topAction.evidence
    };
  }

  // ════════════════════════════════════════════════════════
  // rankBySection(section) — Filter interventions to a section
  // ════════════════════════════════════════════════════════
  function rankBySection(section) {
    var result = rank();
    if (!result) return null;

    var sectionTopics = [];
    try {
      var sectionReadiness = MayLearnerState.getSectionReadinessSummary();
      if (sectionReadiness && sectionReadiness.sections && sectionReadiness.sections[section]) {
        sectionTopics = (sectionReadiness.sections[section]._topics || []).map(function(t) { return t.topic; });
      }
    } catch (e) { /* pass */ }

    var filtered = result.queue.filter(function(c) {
      return c.topic && sectionTopics.indexOf(c.topic) >= 0;
    });

    return {
      section: section,
      queue: filtered,
      topAction: filtered.length > 0 ? filtered[0] : null,
      totalCandidates: filtered.length,
      _meta: result._meta
    };
  }

  // ════════════════════════════════════════════════════════
  // Public API
  // ════════════════════════════════════════════════════════
  return {
    rank: rank,
    getHighestValueAction: getHighestValueAction,
    rankBySection: rankBySection,
    isEnabled: _isEnabled,
    FEATURE_FLAG: FEATURE_FLAG
  };

})();

if (typeof window !== 'undefined') {
  window.MayInterventionPrioritizer = MayInterventionPrioritizer;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayInterventionPrioritizer;
}
