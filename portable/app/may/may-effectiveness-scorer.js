/**
 * MayEffectivenessScorer — Computes the 6-dimension effectiveness scorecard
 * from May telemetry data stored in localStorage.
 * 
 * Dimensions (from MAY-025 framework):
 *   1. Recommendation Quality (25%)
 *   2. Readiness Accuracy (20%)
 *   3. User Adoption (20%)
 *   4. Engagement (15%)
 *   5. Telemetry Reliability (10%)
 *   6. Production Stability (10%)
 * 
 * Reads: localStorage['cmaMayPilotTelemetryArchive'] (array of session telemetry)
 *         localStorage['cmaMayPilotTelemetry'] (latest session, fallback)
 * 
 * Session: MAY-027 — Production Effectiveness Baseline
 * Governance: Light Lane — analytics only, no pack/case/content impact
 */

var MayEffectivenessScorer = (function() {
  'use strict';

  var DIMENSION_WEIGHTS = {
    recommendationQuality: 0.25,
    readinessAccuracy: 0.20,
    userAdoption: 0.20,
    engagement: 0.15,
    telemetryReliability: 0.10,
    productionStability: 0.10
  };

  var MIN_SESSIONS_FOR_VALID = 3;

  // ── Data loading ──────────────────────────────────────────

  function _loadAllSessions() {
    var archive = [];
    try {
      if (typeof localStorage !== 'undefined') {
        var raw = localStorage.getItem('cmaMayPilotTelemetryArchive');
        if (raw) archive = JSON.parse(raw);
      }
    } catch (e) { /* empty */ }
    if (archive.length === 0) {
      try {
        var latest = JSON.parse(localStorage.getItem('cmaMayPilotTelemetry') || '{}');
        if (latest.events && latest.events.length > 0) {
          archive = [{ sessionId: 'latest', timestamp: latest.snapshot ? latest.snapshot.timestamp : '', eventCount: latest.events.length, events: latest.events, snapshot: latest.snapshot || {} }];
        }
      } catch (e2) { /* empty */ }
    }
    return archive;
  }

  function _allEvents(sessions) {
    var all = [];
    sessions.forEach(function(s) {
      if (s.events && s.events.length > 0) {
        all = all.concat(s.events);
      }
    });
    return all;
  }

  // ── Dimension 1: Recommendation Quality (25%) ─────────────

  function _scoreRecommendationQuality(sessions) {
    var events = _allEvents(sessions);
    var recEvents = events.filter(function(e) { return e.type === 'recommendation'; });
    var interventionEvents = events.filter(function(e) { return e.type === 'intervention'; });

    var score = { dimension: 'Recommendation Quality', weight: 0.25, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {} };

    if (sessions.length < MIN_SESSIONS_FOR_VALID && recEvents.length < 3) return score;

    // RQ1 — Recommendation coverage (topics with recommendations)
    var topicsRecommended = {};
    recEvents.forEach(function(e) {
      if (e.data && e.data.topTopic) topicsRecommended[e.data.topTopic] = true;
    });
    var rq1 = Object.keys(topicsRecommended).length > 0 ? 100 : 0;
    if (Object.keys(topicsRecommended).length === 0 && recEvents.length === 0) rq1 = 0;

    // RQ2 — Intervention relevance (tier distribution)
    var tiers = { 1: 0, 2: 0, 3: 0 };
    interventionEvents.forEach(function(e) {
      if (e.data && e.data.tier) tiers[e.data.tier] = (tiers[e.data.tier] || 0) + 1;
    });
    var hasInterventions = (tiers[1] + tiers[2] + tiers[3]) > 0;
    var rq2 = hasInterventions ? 100 : (recEvents.length > 0 ? 50 : 0);

    // RQ3 — Recommendation diversity (unique types)
    var recTypes = {};
    recEvents.forEach(function(e) {
      if (e.data && e.data.topType) recTypes[e.data.topType] = true;
    });
    var rq3 = Object.keys(recTypes).length >= 2 ? 100 : (Object.keys(recTypes).length === 1 ? 60 : 0);

    // RQ4 — Pipeline health (any recommendations at all)
    var rq4 = recEvents.length >= sessions.length ? 100 : (recEvents.length > 0 ? 70 : 0);

    score.metrics = {
      RQ1_coverage: { value: rq1, weight: 0.30, label: 'Recommendation coverage' },
      RQ2_intervention: { value: rq2, weight: 0.25, label: 'Intervention relevance' },
      RQ3_diversity: { value: rq3, weight: 0.20, label: 'Recommendation diversity' },
      RQ4_pipeline: { value: rq4, weight: 0.25, label: 'Pipeline health' }
    };

    score.rawScore = Math.round(rq1 * 0.30 + rq2 * 0.25 + rq3 * 0.20 + rq4 * 0.25);
    score.verdict = _verdictLabel(score.rawScore);
    score.detail = {
      recommendationEvents: recEvents.length,
      interventionEvents: interventionEvents.length,
      uniqueTopics: Object.keys(topicsRecommended).length,
      uniqueRecTypes: Object.keys(recTypes).length
    };

    return score;
  }

  // ── Dimension 2: Readiness Accuracy (20%) ─────────────────

  function _scoreReadinessAccuracy(sessions) {
    var events = _allEvents(sessions);
    var readinessEvents = events.filter(function(e) { return e.type === 'readiness'; });

    var score = { dimension: 'Readiness Accuracy', weight: 0.20, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {} };

    if (readinessEvents.length === 0) return score;

    // RA1 — Readiness band reachability
    var bandsSeen = {};
    readinessEvents.forEach(function(e) {
      if (e.data && e.data.overallBand) bandsSeen[e.data.overallBand] = true;
    });
    var bandCount = Object.keys(bandsSeen).length;
    var ra1 = bandCount >= 2 ? 80 : (bandCount === 1 ? 60 : 0);

    // RA2 — Readiness score progression (are scores changing over time)
    var scores = readinessEvents.map(function(e) { return e.data && e.data.overallScore ? e.data.overallScore : 0; });
    var uniqueScores = {};
    scores.forEach(function(s) { if (s > 0) uniqueScores[s] = true; });
    var ra2 = Object.keys(uniqueScores).length >= 2 ? 80 : (Object.keys(uniqueScores).length === 1 ? 50 : 0);

    // RA3 — Readiness data presence (at least one readiness per session)
    var ra3 = readinessEvents.length >= sessions.length ? 90 : (readinessEvents.length > 0 ? 60 : 0);

    // RA4 — Confidence levels
    var confidences = readinessEvents.map(function(e) { return e.data && e.data.overallBand ? 1 : 0; });
    var confSum = confidences.reduce(function(a, b) { return a + b; }, 0);
    var ra4 = confidences.length > 0 ? Math.round((confSum / confidences.length) * 100) : 0;

    score.metrics = {
      RA1_bandReachability: { value: ra1, weight: 0.30, label: 'Band reachability' },
      RA2_progression: { value: ra2, weight: 0.25, label: 'Score progression' },
      RA3_coverage: { value: ra3, weight: 0.25, label: 'Readiness coverage' },
      RA4_confidence: { value: ra4, weight: 0.20, label: 'Confidence signals' }
    };

    score.rawScore = Math.round(ra1 * 0.30 + ra2 * 0.25 + ra3 * 0.25 + ra4 * 0.20);
    score.verdict = _verdictLabel(score.rawScore);
    score.detail = {
      readinessEvents: readinessEvents.length,
      uniqueBands: bandCount,
      scoreHistory: scores.filter(function(s) { return s > 0; })
    };

    return score;
  }

  // ── Dimension 3: User Adoption (20%) ──────────────────────

  function _scoreUserAdoption(sessions) {
    var events = _allEvents(sessions);
    var adoptionEvents = events.filter(function(e) { return e.type === 'adoption'; });

    var score = { dimension: 'User Adoption', weight: 0.20, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {}, funnel: null };

    if (adoptionEvents.length === 0) return score;

    // Adoption funnel: count unique recommendation types through each stage
    var recTypes = ['Top Weakness', 'Suggested Review', 'Next Session', 'Readiness', 'Launcher', 'Panel Link', 'Session'];

    var presentedByType = {};
    var openedByType = {};
    var clickedByType = {};
    var startedByType = {};
    var completedByType = {};

    adoptionEvents.forEach(function(e) {
      var d = e.data || {};
      var rt = d.recommendationType || 'unknown';
      if (!presentedByType[rt]) presentedByType[rt] = 0;
      if (!openedByType[rt]) openedByType[rt] = 0;
      if (!clickedByType[rt]) clickedByType[rt] = 0;
      if (!startedByType[rt]) startedByType[rt] = 0;
      if (!completedByType[rt]) completedByType[rt] = 0;

      if (d.presented) presentedByType[rt]++;
      if (d.panelOpened) openedByType[rt]++;
      if (d.clicked) clickedByType[rt]++;
      if (d.sessionStarted) startedByType[rt]++;
      if (d.completed) completedByType[rt]++;
    });

    // Aggregate funnel totals
    var totalPresented = 0, totalOpened = 0, totalClicked = 0, totalStarted = 0, totalCompleted = 0;
    Object.keys(presentedByType).forEach(function(k) { totalPresented += presentedByType[k]; });
    Object.keys(openedByType).forEach(function(k) { totalOpened += openedByType[k]; });
    Object.keys(clickedByType).forEach(function(k) { totalClicked += clickedByType[k]; });
    Object.keys(startedByType).forEach(function(k) { totalStarted += startedByType[k]; });
    Object.keys(completedByType).forEach(function(k) { totalCompleted += completedByType[k]; });

    // UA1 — Panel opened rate
    var ua1 = totalPresented > 0 ? Math.round((totalOpened / totalPresented) * 100) : 0;

    // UA2 — Click rate from opened
    var ua2 = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

    // UA3 — Session start rate from clicked
    var ua3 = totalClicked > 0 ? Math.round((totalStarted / totalClicked) * 100) : 0;

    // UA4 — Completion rate from started
    var ua4 = totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;

    // UA5 — Type effectiveness (which types drive the most clicks)
    var perType = {};
    Object.keys(presentedByType).forEach(function(rt) {
      var p = presentedByType[rt] || 0;
      var c = clickedByType[rt] || 0;
      perType[rt] = { presented: p, opened: (openedByType[rt] || 0), clicked: c, started: (startedByType[rt] || 0), completed: (completedByType[rt] || 0), clickRate: p > 0 ? Math.round((c / p) * 100) : 0 };
    });

    // UA6 — Ignored types (presented but never clicked)
    var ignored = [];
    Object.keys(perType).forEach(function(rt) {
      if (perType[rt].presented > 0 && perType[rt].clicked === 0) ignored.push(rt);
    });

    score.metrics = {
      UA1_panelOpened: { value: ua1, weight: 0.20, label: 'Panel opened rate', target: 70 },
      UA2_clicked: { value: ua2, weight: 0.25, label: 'Click rate', target: 40 },
      UA3_started: { value: ua3, weight: 0.25, label: 'Session start rate', target: 25 },
      UA4_completed: { value: ua4, weight: 0.15, label: 'Completion rate', target: 20 },
      UA5_typeEffectiveness: { value: Object.keys(perType).length > 0 ? 80 : 0, weight: 0.15, label: 'Type effectiveness data' }
    };

    score.rawScore = Math.round(
      _clampScore(ua1 / 70) * 20 +
      _clampScore(ua2 / 40) * 25 +
      _clampScore(ua3 / 25) * 25 +
      _clampScore(ua4 / 20) * 15 +
      (Object.keys(perType).length >= 3 ? 15 : 5)
    );
    score.verdict = _verdictLabel(score.rawScore);
    score.funnel = {
      presented: totalPresented,
      opened: totalOpened,
      clicked: totalClicked,
      started: totalStarted,
      completed: totalCompleted,
      rates: { presentedToOpened: ua1, openedToClicked: ua2, clickedToStarted: ua3, startedToCompleted: ua4 }
    };
    score.detail = {
      perType: perType,
      ignored: ignored,
      adoptionEvents: adoptionEvents.length
    };

    return score;
  }

  // ── Dimension 4: Engagement (15%) ─────────────────────────

  function _scoreEngagement(sessions) {
    var events = _allEvents(sessions);
    var engagementEvents = events.filter(function(e) { return e.type === 'engagement'; });
    var adoptionEvents = events.filter(function(e) { return e.type === 'adoption'; });

    var score = { dimension: 'Engagement', weight: 0.15, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {} };

    // EG1 — Coaching tooltip visibility (tooltipViewed events)
    var tooltipViews = engagementEvents.filter(function(e) { return e.data && e.data.action === 'tooltipViewed'; }).length;
    var eg1 = tooltipViews > 0 ? 100 : 50;

    // EG2 — Tooltip interaction rate (tooltipClicked / tooltipViewed)
    var tooltipClicks = engagementEvents.filter(function(e) { return e.data && e.data.action === 'tooltipClicked'; }).length;
    var eg2 = tooltipViews > 0 ? Math.round((tooltipClicks / Math.max(tooltipViews, 1)) * 100) : 0;

    // EG3 — Dismissal rate (low is good)
    var dismissals = engagementEvents.filter(function(e) { return e.data && e.data.action === 'dismissed'; }).length;
    var eg3 = sessions.length > 0 ? Math.max(0, 100 - Math.round((dismissals / Math.max(sessions.length, 1)) * 100)) : 100;

    // EG4 — Launcher clicks
    var launcherClicks = adoptionEvents.filter(function(e) { return e.data && e.data.recommendationType === 'Launcher' && e.data.clicked; }).length;
    var eg4 = sessions.length > 0 ? Math.round(Math.min(100, (launcherClicks / Math.max(sessions.length, 1)) * 100)) : 0;

    score.metrics = {
      EG1_tooltipViews: { value: eg1, weight: 0.25, label: 'Tooltip visibility' },
      EG2_tooltipClicks: { value: eg2, weight: 0.25, label: 'Tooltip interaction rate', target: 30 },
      EG3_dismissalResistance: { value: eg3, weight: 0.25, label: 'Dismissal resistance' },
      EG4_launcherUse: { value: eg4, weight: 0.25, label: 'Launcher use rate', target: 50 }
    };

    score.rawScore = Math.round(
      _clampScore(eg1 / 100) * 25 +
      _clampScore(eg2 / 30) * 25 +
      _clampScore(eg3 / 100) * 25 +
      _clampScore(eg4 / 50) * 25
    );
    score.verdict = _verdictLabel(score.rawScore);
    score.detail = {
      engagementEvents: engagementEvents.length,
      tooltipViews: tooltipViews,
      tooltipClicks: tooltipClicks,
      dismissals: dismissals,
      launcherClicks: launcherClicks
    };

    return score;
  }

  // ── Dimension 5: Telemetry Reliability (10%) ──────────────

  function _scoreTelemetryReliability(sessions) {
    var score = { dimension: 'Telemetry Reliability', weight: 0.10, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {} };

    if (sessions.length === 0) return score;

    // TR1 — All sessions have telemetry persisted (persistence check)
    var sessionsWithEvents = 0;
    sessions.forEach(function(s) {
      if (s.events && s.events.length > 0) sessionsWithEvents++;
    });
    var tr1 = sessions.length > 0 ? Math.round((sessionsWithEvents / sessions.length) * 100) : 0;

    // TR2 — Event type completeness (7 types expected)
    var allTypes = ['decision', 'mode', 'readiness', 'recommendation', 'intervention', 'adoption', 'engagement'];
    var typesSeen = {};
    sessions.forEach(function(s) {
      (s.events || []).forEach(function(e) {
        if (e.type) typesSeen[e.type] = true;
      });
    });
    var typesPresent = Object.keys(typesSeen).length;
    var tr2 = Math.round((typesPresent / allTypes.length) * 100);

    // TR3 — Buffer overflow (none should hit 500 cap)
    var overflowSessions = sessions.filter(function(s) { return s.eventCount >= 500; }).length;
    var tr3 = overflowSessions === 0 ? 100 : Math.max(0, 100 - (overflowSessions * 20));

    // TR4 — Timestamp validity
    var validTimestamps = 0;
    sessions.forEach(function(s) {
      if (s.timestamp && !isNaN(new Date(s.timestamp).getTime())) validTimestamps++;
    });
    var tr4 = sessions.length > 0 ? Math.round((validTimestamps / sessions.length) * 100) : 0;

    score.metrics = {
      TR1_persistence: { value: tr1, weight: 0.30, label: 'Persistence rate', target: 100 },
      TR2_completeness: { value: tr2, weight: 0.30, label: 'Event type completeness', target: 95 },
      TR3_noOverflow: { value: tr3, weight: 0.20, label: 'No buffer overflow' },
      TR4_timestamps: { value: tr4, weight: 0.20, label: 'Timestamp validity' }
    };

    score.rawScore = Math.round(tr1 * 0.30 + tr2 * 0.30 + tr3 * 0.20 + tr4 * 0.20);
    score.verdict = _verdictLabel(score.rawScore);
    score.detail = {
      totalSessions: sessions.length,
      sessionsWithEvents: sessionsWithEvents,
      eventTypesPresent: typesPresent,
      eventTypesMissing: allTypes.filter(function(t) { return !typesSeen[t]; }),
      bufferOverflows: overflowSessions,
      totalEvents: _allEvents(sessions).length
    };

    return score;
  }

  // ── Dimension 6: Production Stability (10%) ────────────────

  function _scoreProductionStability(sessions) {
    var events = _allEvents(sessions);
    var score = { dimension: 'Production Stability', weight: 0.10, rawScore: 0, verdict: 'INSUFFICIENT DATA', metrics: {} };

    if (sessions.length === 0) return score;

    var adoptionEvents = events.filter(function(e) { return e.type === 'adoption'; });
    var completedSessions = adoptionEvents.filter(function(e) { return e.data && e.data.completed; }).length;
    var startedSessions = adoptionEvents.filter(function(e) { return e.data && e.data.sessionStarted; }).length;

    // PS1 — Session completion rate (proxy for no crashes)
    var ps1 = startedSessions > 0 ? Math.round((completedSessions / startedSessions) * 100) : (completedSessions > 0 ? 100 : 50);

    // PS2 — Recommendation panel rendered (no fallback)
    var panelEvents = adoptionEvents.filter(function(e) { return e.data && (e.data.recommendationType === 'Top Weakness' || e.data.recommendationType === 'Suggested Review' || e.data.recommendationType === 'Next Session' || e.data.recommendationType === 'Readiness'); });
    var ps2 = sessions.length > 0 && panelEvents.length >= sessions.length ? 100 : (panelEvents.length > 0 ? 70 : 0);

    // PS3 — Flag/feature gate presence
    var ps3 = typeof MayFeatureFlags !== 'undefined' ? 100 : 80;

    // PS4 — No telemetry gaps (every session should have adoption events)
    var sessionsWithAdoption = 0;
    sessions.forEach(function(s) {
      var hasAdoption = (s.events || []).some(function(e) { return e.type === 'adoption'; });
      if (hasAdoption) sessionsWithAdoption++;
    });
    var ps4 = sessions.length > 0 ? Math.round((sessionsWithAdoption / sessions.length) * 100) : 0;

    score.metrics = {
      PS1_completionRate: { value: ps1, weight: 0.35, label: 'Session completion rate', target: 100 },
      PS2_panelRender: { value: ps2, weight: 0.25, label: 'Recommendation panel render' },
      PS3_flagStability: { value: ps3, weight: 0.20, label: 'Feature flag stability' },
      PS4_noTelemetryGaps: { value: ps4, weight: 0.20, label: 'No telemetry gaps', target: 100 }
    };

    score.rawScore = Math.round(ps1 * 0.35 + ps2 * 0.25 + ps3 * 0.20 + ps4 * 0.20);
    score.verdict = _verdictLabel(score.rawScore);
    score.detail = {
      completedSessions: completedSessions,
      startedSessions: startedSessions,
      sessionsWithAdoption: sessionsWithAdoption,
      panelEvents: panelEvents.length
    };

    return score;
  }

  // ── Helpers ────────────────────────────────────────────────

  function _clampScore(ratio) {
    return Math.max(0, Math.min(100, Math.round(ratio * 100)));
  }

  function _verdictLabel(rawScore) {
    if (rawScore >= 90) return 'STRONG';
    if (rawScore >= 75) return 'ADEQUATE';
    if (rawScore >= 60) return 'WEAK';
    if (rawScore > 0) return 'FAILING';
    return 'INSUFFICIENT DATA';
  }

  // ── Public API ─────────────────────────────────────────────

  function compute() {
    var sessions = _loadAllSessions();

    var dim1 = _scoreRecommendationQuality(sessions);
    var dim2 = _scoreReadinessAccuracy(sessions);
    var dim3 = _scoreUserAdoption(sessions);
    var dim4 = _scoreEngagement(sessions);
    var dim5 = _scoreTelemetryReliability(sessions);
    var dim6 = _scoreProductionStability(sessions);

    var dimensions = [dim1, dim2, dim3, dim4, dim5, dim6];

    var composite = 0;
    var validDimensions = 0;
    dimensions.forEach(function(d) {
      if (d.verdict !== 'INSUFFICIENT DATA') {
        composite += d.rawScore * d.weight;
        validDimensions++;
      }
    });

    // If any dimension has insufficient data, note it
    var insufficientDimensions = dimensions.filter(function(d) { return d.verdict === 'INSUFFICIENT DATA'; }).map(function(d) { return d.dimension; });

    var hasEnoughData = sessions.length >= MIN_SESSIONS_FOR_VALID && validDimensions >= 3;

    return {
      compositeScore: hasEnoughData ? Math.round(composite * 100) / 100 : null,
      verdict: hasEnoughData ? _verdictLabel(Math.round(composite * 100)) : 'INSUFFICIENT DATA',
      hasEnoughData: hasEnoughData,
      sessionsAnalyzed: sessions.length,
      totalEvents: _allEvents(sessions).length,
      dimensions: dimensions,
      insufficientDimensions: insufficientDimensions,
      _meta: {
        computedAt: new Date().toISOString(),
        scorerVersion: 'MAY027-1.0',
        minSessionsRequired: MIN_SESSIONS_FOR_VALID,
        dimensionWeights: DIMENSION_WEIGHTS,
        dataSource: sessions.length > 0 ? 'localStorage[cmaMayPilotTelemetryArchive]' : 'none'
      }
    };
  }

  function adoptionFunnel() {
    var sessions = _loadAllSessions();
    var events = _allEvents(sessions);
    var adoptionEvents = events.filter(function(e) { return e.type === 'adoption'; });

    var presented = 0, opened = 0, clicked = 0, started = 0, completed = 0;
    var perType = {};

    adoptionEvents.forEach(function(e) {
      var d = e.data || {};
      var rt = d.recommendationType || 'unknown';
      if (!perType[rt]) perType[rt] = { presented: 0, opened: 0, clicked: 0, started: 0, completed: 0 };
      if (d.presented) { presented++; perType[rt].presented++; }
      if (d.panelOpened) { opened++; perType[rt].opened++; }
      if (d.clicked) { clicked++; perType[rt].clicked++; }
      if (d.sessionStarted) { started++; perType[rt].started++; }
      if (d.completed) { completed++; perType[rt].completed++; }
    });

    return {
      funnel: { presented: presented, opened: opened, clicked: clicked, started: started, completed: completed },
      rates: {
        presentedToOpened: presented > 0 ? Math.round((opened / presented) * 100) : 0,
        openedToClicked: opened > 0 ? Math.round((clicked / opened) * 100) : 0,
        clickedToStarted: clicked > 0 ? Math.round((started / clicked) * 100) : 0,
        startedToCompleted: started > 0 ? Math.round((completed / started) * 100) : 0
      },
      perType: perType,
      sessionsAnalyzed: sessions.length
    };
  }

  function resetTelemetry() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('cmaMayPilotTelemetry');
        localStorage.removeItem('cmaMayPilotTelemetrySnapshot');
        localStorage.removeItem('cmaMayPilotTelemetryArchive');
      }
      if (typeof MayTelemetry !== 'undefined') MayTelemetry.reset();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  function snapshot() {
    return {
      sessions: _loadAllSessions().length,
      totalEvents: _allEvents(_loadAllSessions()).length,
      scorecard: compute()
    };
  }

  return {
    compute: compute,
    adoptionFunnel: adoptionFunnel,
    resetTelemetry: resetTelemetry,
    snapshot: snapshot
  };

})();

if (typeof window !== 'undefined') {
  window.MayEffectivenessScorer = MayEffectivenessScorer;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayEffectivenessScorer;
}
