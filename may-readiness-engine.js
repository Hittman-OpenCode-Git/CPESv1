/**
 * MayReadinessEngine — Adaptive readiness scoring, confidence estimation, and risk identification.
 * 
 * Consumes MayLearnerState data sources. All outputs are deterministic, rule-based,
 * and advisory only. No external services, no autonomous actions.
 * 
 * Gated behind MayFeatureFlags.ENABLE_READINESS_SCORING (default: false).
 * When disabled, assess() returns null.
 * 
 * Session: MAY-005
 * Governance: Light Lane (analytics layer — no pack/case/content impact)
 */
const MayReadinessEngine = (function() {
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
  // Band → score mapping (used in composite calculation)
  // MAY-012 calibration: narrowed Developing→Approaching cliff,
  // lifted Developing floor to better reflect continuous accuracy
  // ════════════════════════════════════════════════════════
  var BAND_SCORES = {
    'Not enough data': 0,
    'Recovery needed': 22,
    'Developing': 52,
    'Approaching review-ready': 72,
    'Ready for focused review': 95
  };

  // ════════════════════════════════════════════════════════
  // assess() — Primary entry point
  // Returns a readiness snapshot or null if feature disabled
  // ════════════════════════════════════════════════════════
  function assess() {
    if (!_isEnabled()) return null;

    try {
      if (typeof MayLearnerState === 'undefined') return _insufficientData('MayLearnerState not loaded');
    } catch (e) { return _insufficientData('MayLearnerState not available'); }

    var readiness = MayLearnerState.getReadinessSummary();
    var sectionReadiness = MayLearnerState.getSectionReadinessSummary();
    var intelligence = MayLearnerState.getLearnerIntelligence();
    var topicProgress = MayLearnerState.getTopicProgress();
    var data = MayLearnerState.load();
    var examPlan = data.examPlan || null;

    // ── Composite readiness score ──────────────────────
    var scoreResult = _computeCompositeScore(sectionReadiness, readiness);

    // ── Confidence estimation ──────────────────────────
    var confidenceResult = _computeConfidence(readiness, intelligence, data);

    // ── Risk identification ────────────────────────────
    var riskResult = _computeRiskAreas(readiness, intelligence, examPlan, topicProgress);

    // ── Strengths & weaknesses ─────────────────────────
    var strengths = [];
    var weaknesses = [];
    if (intelligence) {
      strengths = (intelligence.strengths || []).slice(0, 5).map(function(s) {
        return { topic: s.topic, accuracy: s.accuracy, attempts: s.attempts, stability: s.stability, evidence: s.evidence };
      });
      weaknesses = (intelligence.weaknesses || []).slice(0, 5).map(function(w) {
        return { topic: w.topic, accuracy: w.accuracy, attempts: w.attempts, recentAccuracy: w.recentAccuracy, evidence: w.evidence };
      });
    }

    // ── Topic coverage ─────────────────────────────────
    var allTopics = Object.keys(topicProgress || {});
    var topicsWithData = allTopics.filter(function(t) { return (topicProgress[t] || {}).totalAttempts >= 3; });
    var topicsAtReady = readiness ? readiness.topics.filter(function(t) { return t.band === 'Ready for focused review'; }).length : 0;
    var topicsAtRecovery = readiness ? readiness.topics.filter(function(t) { return t.band === 'Recovery needed'; }).length : 0;

    return {
      readinessScore: scoreResult.score,
      confidence: confidenceResult.confidence,
      band: readiness ? readiness.overall.band : 'Not enough data',
      topicCoverage: {
        totalTopics: allTopics.length,
        topicsWithData: topicsWithData.length,
        topicsAtReady: topicsAtReady,
        topicsAtRecovery: topicsAtRecovery
      },
      strengths: strengths,
      weaknesses: weaknesses,
      riskAreas: riskResult,
      recommendedNextActions: _deriveNextActions(readiness, riskResult, intelligence),
      perSection: sectionReadiness ? sectionReadiness.sections : {},
      _provenance: {
        modelVersion: 'MAY012-1.0',
        computedAt: new Date().toISOString(),
        featureFlag: FEATURE_FLAG,
        thresholds: readiness ? readiness._provenance.thresholdsApplied : {},
        dataContext: readiness ? readiness._provenance.dataContext : {}
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // _computeCompositeScore — Weighted section aggregation
  // MAY-012: Added per-section accuracy component (30% weight)
  // and topics-at-ready bonus. Accuracy moderates band scores
  // without overriding them.
  // ════════════════════════════════════════════════════════
  function _computeCompositeScore(sectionReadiness, readiness) {
    if (!sectionReadiness || !sectionReadiness.sections) {
      return { score: 0, breakdown: {}, confidence: 'low' };
    }

    var sections = sectionReadiness.sections;
    var totalWeight = 0;
    var weightedSum = 0;
    var breakdown = {};
    var dataSections = 0;

    Object.keys(sections).forEach(function(sec) {
      var s = sections[sec];
      var topicCount = s.topicCount || 0;
      var weight = topicCount > 0 ? topicCount : 0;
      var bandScore = BAND_SCORES[s.band] || 0;

      // MAY-012: Compute section accuracy from constituent topics
      var sectionTopics = s._topics || [];
      var secAccSum = 0, secAccWeight = 0;
      sectionTopics.forEach(function(st) {
        var tAcc = st.accuracy;
        var tAtt = st.attempts || 0;
        if (tAcc !== null && tAcc !== undefined && tAtt > 0) {
          secAccSum += tAcc * tAtt;
          secAccWeight += tAtt;
        }
      });
      var sectionAccuracy = secAccWeight > 0 ? Math.round(secAccSum / secAccWeight) : bandScore;

      // MAY-013: Equal weight — 50% band score + 50% accuracy score
      // (was 60/40 in MAY-012; accuracy needs more say to prevent monotonicity violations)
      var sectionScore = bandScore > 0
        ? Math.round(0.5 * bandScore + 0.5 * sectionAccuracy)
        : 0;

      if (weight > 0) {
        totalWeight += weight;
        weightedSum += weight * sectionScore;
        dataSections++;
        breakdown[sec] = {
          band: s.band,
          topicCount: topicCount,
          weight: weight,
          bandScore: bandScore,
          sectionAccuracy: sectionAccuracy,
          sectionScore: sectionScore,
          labeled: s.label
        };
      }
    });

    var score = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

    // MAY-013: Floor guard — composite must never be below weighted raw accuracy.
    // Prevents monotonicity violations (e.g., L5 at 70% scoring higher than L2 at 87%).
    var totalAcc = 0, totalAccWt = 0;
    Object.keys(breakdown).forEach(function(sec) {
      var b = breakdown[sec];
      if (b.sectionAccuracy > 0 && b.weight > 0) {
        totalAcc += b.sectionAccuracy * b.weight;
        totalAccWt += b.weight;
      }
    });
    if (totalAccWt > 0) {
      var weightedAccuracy = Math.round(totalAcc / totalAccWt);
      score = Math.max(score, weightedAccuracy);
    }

    // MAY-012: Topics-at-ready bonus — reward uniform readiness
    var topicsAtReady = readiness && readiness.topicCoverage ? (readiness.topicCoverage.topicsAtReady || 0) : 0;
    var readyBonus = 0;
    if (topicsAtReady >= 5) readyBonus = 5;
    else if (topicsAtReady >= 3) readyBonus = 3;
    else if (topicsAtReady >= 2) readyBonus = 1;
    score = Math.min(98, score + readyBonus);

    var confidence = dataSections >= 4 ? 'moderate' : (dataSections >= 2 ? 'low' : 'high');

    return { score: score, breakdown: breakdown, confidence: confidence };
  }

  // ════════════════════════════════════════════════════════
  // _computeConfidence — How reliable is the readiness score?
  // ════════════════════════════════════════════════════════
  function _computeConfidence(readiness, intelligence, data) {
    var conf = 100;
    var reasons = [];

    var sessionCount = (data.sessions || []).length;
    if (sessionCount < 2) {
      conf -= 20;
      reasons.push('fewer than 2 sessions');
    }

    var sectionsWithData = 0;
    var sectionsNotEnough = 0;
    if (readiness && readiness.topics) {
      var sectionMap = {};
      readiness.topics.forEach(function(t) {
        if (t.band !== 'Not enough data') {
          sectionsWithData++;
        }
      });
    }

    if (readiness && readiness.topics) {
      readiness.topics.forEach(function(t) {
        if (t.band === 'Not enough data') sectionsNotEnough++;
      });
    }
    if (sectionsNotEnough > 2) {
      conf -= 10;
      reasons.push('too many sections with insufficient data');
    }

    var unstableTopics = 0;
    if (readiness && readiness.topics) {
      readiness.topics.forEach(function(t) {
        if (t.stability !== null && t.stability < 40) unstableTopics++;
      });
    }
    if (unstableTopics > 1) {
      conf -= 15;
      reasons.push('high topic variance (unstable patterns)');
    }

    if (intelligence && intelligence.windows && intelligence.windows.recent) {
      var recentWindow = intelligence.windows.recent;
      if (recentWindow.topicCount > 0 || recentWindow.attemptCount > 0) {
        conf = Math.min(100, conf + 10);
        reasons.push('active in last 7 days');
      }
    }

    conf = Math.max(10, Math.min(100, conf));

    return {
      confidence: conf,
      level: conf >= 80 ? 'high' : (conf >= 50 ? 'moderate' : 'low'),
      reasons: reasons.length > 0 ? reasons : ['default confidence baseline']
    };
  }

  // ════════════════════════════════════════════════════════
  // _computeRiskAreas — Identify topics and patterns at risk
  // ════════════════════════════════════════════════════════
  function _computeRiskAreas(readiness, intelligence, examPlan, topicProgress) {
    var risks = [];

    if (!readiness || !readiness.topics) return risks;

    // Topic-level risks
    readiness.topics.forEach(function(t) {
      if (t.accuracy !== null && t.accuracy < 60 && t.attempts >= 5 &&
          t.direction === 'declining' && (t.stability === null || t.stability < 50)) {
        risks.push({
          type: 'topic_risk',
          severity: 'high',
          topic: t.topic,
          accuracy: t.accuracy,
          attempts: t.attempts,
          direction: t.direction,
          stability: t.stability,
          rationale: 'Critical weakness — low accuracy with declining trend and low stability.'
        });
      } else if (t.band === 'Recovery needed' && t.direction !== 'improving') {
        risks.push({
          type: 'topic_risk',
          severity: 'medium',
          topic: t.topic,
          accuracy: t.accuracy,
          attempts: t.attempts,
          direction: t.direction,
          stability: t.stability,
          rationale: 'Recovery needed — accuracy below threshold without improving trend.'
        });
      }
    });

    // Stability risks
    readiness.topics.forEach(function(t) {
      if (t.stability !== null && t.stability < 40 && t.attempts >= 4) {
        risks.push({
          type: 'stability_risk',
          severity: 'medium',
          topic: t.topic,
          stability: t.stability,
          accuracy: t.accuracy,
          rationale: 'Unstable performance — wide swings between correct and incorrect on the same topic.'
        });
      }
    });

    // Case risks
    if (readiness.caseReadiness && readiness.caseReadiness.band === 'Recovery needed') {
      risks.push({
        type: 'case_risk',
        severity: 'medium',
        dominantPattern: readiness.caseReadiness.dominantPattern,
        dominantTrend: readiness.caseReadiness.dominantTrend,
        totalMisses: readiness.caseReadiness.totalCaseMisses,
        rationale: 'Case miss patterns worsening — case skills need attention.'
      });
    }

    // Exam timeline risk
    if (examPlan && examPlan.hasScheduledExam && examPlan.examDate) {
      try {
        var target = new Date(examPlan.examDate);
        if (!isNaN(target.getTime())) {
          var now = new Date();
          var daysUntil = Math.round((target - now) / 86400000);
          if (daysUntil < 30) {
            var overallScore = readiness.overall ? readiness.overall.band : '';
            if (overallScore === 'Recovery needed' || overallScore === 'Developing') {
              risks.push({
                type: 'exam_timeline_risk',
                severity: daysUntil <= 14 ? 'high' : 'medium',
                daysUntilExam: daysUntil,
                readinessScore: readiness.overall ? readiness.overall.band : 'Unknown',
                rationale: 'Exam is ' + daysUntil + ' days away with ' + (readiness.overall ? readiness.overall.band : 'unknown') + ' readiness. Prioritize high-yield review.'
              });
            }
          }
        }
      } catch (e) { /* date parse failure — skip */ }
    }

    // Deduplicate by topic + type
    var seen = {};
    var deduped = [];
    risks.forEach(function(r) {
      var key = r.topic ? (r.type + '|' + r.topic) : (r.type + '|' + (r.dominantPattern || 'global'));
      if (!seen[key]) {
        seen[key] = true;
        deduped.push(r);
      }
    });

    return deduped;
  }

  // ════════════════════════════════════════════════════════
  // _deriveNextActions — Top-3 recommended next steps
  // ════════════════════════════════════════════════════════
  function _deriveNextActions(readiness, risks, intelligence) {
    var actions = [];

    // Critical weaknesses first
    var highRisks = risks.filter(function(r) { return r.severity === 'high'; });
    highRisks.forEach(function(r) {
      actions.push({
        type: 'remediation',
        priority: 'high',
        topic: r.topic || null,
        action: 'Targeted recovery session on ' + (r.topic || 'weak areas'),
        rationale: 'Critical weakness requires immediate foundation rebuilding.'
      });
    });

    // Medium risks
    var mediumRisks = risks.filter(function(r) { return r.severity === 'medium'; });
    mediumRisks.slice(0, 3).forEach(function(r) {
      actions.push({
        type: (r.type === 'case_risk' ? 'case_practice' : 'consolidation'),
        priority: 'medium',
        topic: r.topic || null,
        action: r.type === 'case_risk'
          ? 'Untimed case practice focused on ' + (r.dominantPattern || 'evidence location')
          : 'Consolidate ' + (r.topic || 'weak areas') + ' with targeted practice',
        rationale: r.rationale
      });
    });

    // If strengths exist, suggest challenge
    if (intelligence && intelligence.strengths && intelligence.strengths.length > 0) {
      var topStrength = intelligence.strengths[0];
      if (!actions.some(function(a) { return a.topic === topStrength.topic; })) {
        actions.push({
          type: 'challenge',
          priority: 'low',
          topic: topStrength.topic,
          action: 'Challenge: timed practice on ' + topStrength.topic + ' at higher difficulty',
          rationale: 'Mastered area — test under time pressure to verify readiness.'
        });
      }
    }

    return actions.slice(0, 5);
  }

  // ════════════════════════════════════════════════════════
  // _insufficientData — Fallback when there's no learner data
  // ════════════════════════════════════════════════════════
  function _insufficientData(reason) {
    return {
      readinessScore: 0,
      confidence: 100,
      band: 'Not enough data',
      topicCoverage: { totalTopics: 0, topicsWithData: 0, topicsAtReady: 0, topicsAtRecovery: 0 },
      strengths: [],
      weaknesses: [],
      riskAreas: [],
      recommendedNextActions: [{
        type: 'data_collection',
        priority: 'high',
        topic: null,
        action: 'Complete at least one practice session to enable readiness tracking.',
        rationale: reason || 'No learner data available.'
      }],
      perSection: {},
      _provenance: {
        modelVersion: 'MAY012-1.0',
        computedAt: new Date().toISOString(),
        featureFlag: FEATURE_FLAG,
        thresholds: {},
        dataContext: { sessionCount: 0 }
      }
    };
  }

  // ════════════════════════════════════════════════════════
  // getSectionScore(section) — Score one section in isolation
  // ════════════════════════════════════════════════════════
  function getSectionScore(section) {
    if (!_isEnabled()) return null;
    var sectionReadiness = MayLearnerState.getSectionReadinessSummary();
    if (!sectionReadiness || !sectionReadiness.sections || !sectionReadiness.sections[section]) {
      return null;
    }
    var s = sectionReadiness.sections[section];
    return {
      section: section,
      label: s.label,
      band: s.band,
      bandScore: BAND_SCORES[s.band] || 0,
      topicCount: s.topicCount,
      worstTopic: s.worstTopic,
      confidence: s.confidence,
      rationale: s.rationale,
      _topics: s._topics || []
    };
  }

  // ════════════════════════════════════════════════════════
  // Public API
  // ════════════════════════════════════════════════════════
  return {
    assess: assess,
    getSectionScore: getSectionScore,
    isEnabled: _isEnabled,
    FEATURE_FLAG: FEATURE_FLAG
  };

})();

if (typeof window !== 'undefined') {
  window.MayReadinessEngine = MayReadinessEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayReadinessEngine;
}
