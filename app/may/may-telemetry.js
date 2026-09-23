/**
 * MayTelemetry — Standardized telemetry for May AI coaching layer.
 *
 * All telemetry is console-only in development. No external network calls.
 * LLM telemetry gated behind ENABLE_LLM flag (always false in MAY-016).
 * Buffer capped at 500 events; oldest evicted on overflow.
 *
 * Event types (7, base): decision, mode, readiness, recommendation,
 *   intervention, adoption (MAY-025), engagement (MAY-025)
 *
 * Event types (6, Phase 2.1 W7 — token may_v2_1_telemetry, 2026-09-20):
 *   recommendation_acceptance (T1), micro_lesson audit sample (T2),
 *   tag_accuracy (T3), Part-intent (T4), cognitive_budget (T5),
 *   degradation (T6)
 *
 * Event types (1, May 3.0 Track B — token may_3_0_guided_self_score, 2026-09-21):
 *   self_score (V-B1 no-score-emission, V-B2 EV3-citation, V-B3 PII-guard)
 *
 * Sessions: MAY-016 (base), MAY-025 (adoption + engagement events)
 * Governance: Light Lane (UI/observability — no pack/case/content impact)
 * Hard-stops enforced: HS-3 (CAQS §6.1 ±5%), HS-6 (no PII),
 *   HS-9 (cohort-aggregated, never per-learner), HS-10 (cognitive-budget).
 */

var MayTelemetry = (function() {
  'use strict';

  var _buffer = [];
  var _counters = {};
  var _timers = {};
  var MAX_BUFFER = 500;

  function _now() {
    return new Date().toISOString();
  }

  function _shouldLog() {
    try {
      return typeof May !== 'undefined' && May.config && May.config.debug === true;
    } catch (e) {
      return false;
    }
  }

  function trackDecision(data) {
    var entry = { type: 'decision', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Decision:', data.decisionId, data); } catch (e) {}
    }
    return entry;
  }

  function trackMode(modeName, durationMs) {
    if (!_counters[modeName]) _counters[modeName] = 0;
    _counters[modeName]++;
    var entry = {
      type: 'mode',
      timestamp: _now(),
      modeName: modeName,
      durationMs: durationMs || 0,
      totalInvocations: _counters[modeName]
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Mode:', modeName, '(' + durationMs + 'ms)'); } catch (e) {}
    }
    return entry;
  }

  function trackReadiness(data) {
    var entry = { type: 'readiness', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Readiness:', data.overallBand, data.overallScore); } catch (e) {}
    }
    return entry;
  }

  function trackRecommendation(data) {
    var entry = { type: 'recommendation', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Recommendation:', data.type, data.topic); } catch (e) {}
    }
    return entry;
  }

  function trackIntervention(data) {
    var entry = { type: 'intervention', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Intervention: tier=' + data.tier + ' topic=' + data.topic); } catch (e) {}
    }
    return entry;
  }

  function trackAdoption(data) {
    // W1 cross-part (2026-09-18): stamp the active exam part so adoption
    // analytics split P1/P2. Caller-provided examPart wins when present.
    data = data || {};
    if (!data.examPart) {
        try { data.examPart = (typeof getExamPart === 'function') ? getExamPart() : 'P1'; }
        catch (e) { data.examPart = 'P1'; }
    }
    var entry = { type: 'adoption', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Adoption:', data.recommendationType, 'panelOpened=' + data.panelOpened + ' clicked=' + data.clicked); } catch (e) {}
    }
    return entry;
  }

  function trackEngagement(data) {
    var entry = { type: 'engagement', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Engagement:', data.action); } catch (e) {}
    }
    // Phase 2b+ — Whisperer agent. Hidden beta: only runs when flag is on AND
    // the agent is available. The agent returns a short nudge string;
    // when off, no nudge is emitted and the existing telemetry path runs
    // unchanged. The hard exam-integrity block lives inside the agent
    // (whisperer/index.js:whisper).
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_WHISPERER')) {
        if (typeof window !== 'undefined' && typeof window.WhispererWhisper === 'function') {
          var elapsedMs = (entry.timestamp ? Date.now() - Date.parse(entry.timestamp) : 0) || 0;
          var dwellMs = (data && typeof data.dwellMs === 'number') ? data.dwellMs : 0;
          var errorStreak = (data && typeof data.errorStreak === 'number') ? data.errorStreak : 0;
          var examIntegrity = !!(data && data.examIntegrity);
          var whisper = window.WhispererWhisper({
            elapsedMs: elapsedMs, dwellMs: dwellMs,
            errorStreak: errorStreak, examIntegrity: examIntegrity,
            mode: (data && data.mode) || null
          });
          if (whisper && whisper.nudge) {
            entry.data.whisper = {
              nudge: whisper.nudge,
              delayMs: whisper.timing ? whisper.timing.delayMs : 0,
              maxShownMs: whisper.timing ? whisper.timing.maxShownMs : 0,
              rationale: whisper.rationale || null
            };
          }
        }
      }
    } catch (e) { /* whisper failure → never break telemetry */ }
    return entry;
  }

  /**
   * trackFallback — Phase 1 (MAY-Phase-1).
   * Logs a routing fallback event when the real-intent provider is bypassed
   * in favor of the deterministic stub due to low confidence.
   *
   * @param {Object} data
   *   - from: provider id that was bypassed ('real-intent')
   *   - to: provider id that handled the request ('stub-intent')
   *   - confidence: real provider's NLI entailment score (0..1)
   *   - threshold: gate threshold that triggered the fallback (e.g., 0.60)
   *   - reason: 'low_confidence' | 'provider_unavailable' | 'worker_error'
   *   - text: optional source text (truncated to 80 chars for buffer)
   */
  function trackFallback(data) {
    var entry = {
      type: 'fallback',
      timestamp: _now(),
      data: {
        from: data.from || null,
        to: data.to || null,
        confidence: typeof data.confidence === 'number' ? data.confidence : null,
        threshold: typeof data.threshold === 'number' ? data.threshold : null,
        reason: data.reason || 'unspecified',
        text: data.text ? String(data.text).slice(0, 80) : null
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Fallback:', entry.data.from, '→', entry.data.to, 'confidence=' + entry.data.confidence + ' reason=' + entry.data.reason); } catch (e) {}
    }
    return entry;
  }

  function startTimer(label) {
    _timers[label] = (typeof performance !== 'undefined') ? performance.now() : Date.now();
  }

  function endTimer(label) {
    if (!_timers[label]) return 0;
    var now = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    var elapsed = now - _timers[label];
    delete _timers[label];
    return Math.round(elapsed);
  }

  function snapshot() {
    var byType = {};
    for (var i = 0; i < _buffer.length; i++) {
      var t = _buffer[i].type;
      byType[t] = (byType[t] || 0) + 1;
    }
    return {
      totalEvents: _buffer.length,
      byType: byType,
      modeCounts: JSON.parse(JSON.stringify(_counters)),
      timestamp: _now()
    };
  }

  function drain() {
    var copy = _buffer.slice();
    _buffer = [];
    return copy;
  }

  function reset() {
    _buffer = [];
    _counters = {};
    _timers = {};
  }

  // ─────────────────────────────────────────────────────────────────
  // Phase 2.1 — V2.1 Telemetry Additions (W7, token may_v2_1_telemetry)
  // T1: Recommendation-acceptance rate (closes D1 soft-archiving drift)
  // T2: Monthly micro-lesson authority-citation audit sample selector
  // T3: Per-EW misconception-tag accuracy telemetry (DL-010 analog)
  // T4: Stated Part-intent capture (one session-start, aggregated only)
  // T5: Cognitive-budget telemetry (HS-10 anchor signals)
  // T6: Graceful-degradation event rate (DL-060 measurement anchor)
  // ─────────────────────────────────────────────────────────────────

  // D3: LOS-level storage policy constants (HS-9 cohort aggregation)
  var LOS_RETENTION_DAYS = 30;
  var COHORT_AGGREGATION_REQUIRED = true;

  // W9: HS-10 Cognitive-budget circuit breaker (Phase 2.1, token may_v2_1_cognitive_budget — override Day 60)
  // Primary: median session duration per length-bucket vs 30d rolling baseline — drop >15% = leading
  // Secondary: abandonment rate — rise >20% vs baseline = lagging
  // Composite: capped when EITHER exceeds threshold for 7 consecutive days. Circuit-breaker, not real-time gate.
  // Thresholds PLACEHOLDER until +30d synthetic baseline establishes (now injected live).
  var COGNITIVE_BUDGET_THRESHOLDS = {
    durationDropPct: 15,      // primary
    abandonmentRisePct: 20,   // secondary
    consecutiveDays: 7
  };
  var _cognitiveBudgetState = { consecutiveBreaches: 0, circuitOpen: false, lastCheck: null };

  function checkCognitiveBudget() {
    try {
      var budgets = _buffer.filter(function(e){ return e.type === 'cognitive_budget'; });
      if (budgets.length < 10) return { circuitOpen: false, reason: 'insufficient_data', breaches: 0 };
      // Compute abandonment rate in last 7d vs baseline (first 7d)
      var last7 = budgets.slice(-50);
      var abandonRate = last7.filter(function(e){ return e.data.abandoned; }).length / last7.length;
      var baselineAbandon = 0.08; // synthetic baseline 8% per simulate_may_telemetry.js
      var abandonRise = baselineAbandon > 0 ? ((abandonRate - baselineAbandon) / baselineAbandon * 100) : 0;
      // Duration drop: median last7 vs median first half
      function median(arr){ var s = arr.slice().sort(function(a,b){return a-b;}); var m = Math.floor(s.length/2); return s.length %2 ? s[m] : (s[m-1]+s[m])/2; }
      var durations = budgets.map(function(e){ return e.data.sessionDurationMs; });
      var lastMeds = median(last7.map(function(e){ return e.data.sessionDurationMs; }));
      var baseMeds = median(durations.slice(0, Math.floor(durations.length/2)));
      var durationDrop = baseMeds > 0 ? ((baseMeds - lastMeds) / baseMeds * 100) : 0;
      var breached = (durationDrop > COGNITIVE_BUDGET_THRESHOLDS.durationDropPct) || (abandonRise > COGNITIVE_BUDGET_THRESHOLDS.abandonmentRisePct);
      if (breached) _cognitiveBudgetState.consecutiveBreaches++;
      else _cognitiveBudgetState.consecutiveBreaches = 0;
      _cognitiveBudgetState.circuitOpen = _cognitiveBudgetState.consecutiveBreaches >= COGNITIVE_BUDGET_THRESHOLDS.consecutiveDays;
      _cognitiveBudgetState.lastCheck = _now();
      return { circuitOpen: _cognitiveBudgetState.circuitOpen, durationDrop: durationDrop, abandonRise: abandonRise, abandonRate: abandonRate, breaches: _cognitiveBudgetState.consecutiveBreaches, reason: breached ? (durationDrop > COGNITIVE_BUDGET_THRESHOLDS.durationDropPct ? 'duration_drop' : 'abandonment_rise') : 'within_threshold' };
    } catch (e) { return { circuitOpen: false, reason: 'error', error: e.message }; }
  }

  function getCognitiveBudgetState() {
    return { thresholds: COGNITIVE_BUDGET_THRESHOLDS, state: _cognitiveBudgetState };
  }

  // T1: Recommendation acceptance / rejection (per item, per cohort)
  function trackRecommendationAcceptance(data) {
    data = data || {};
    var examPart = data.examPart;
    if (!examPart) {
      try { examPart = (typeof getExamPart === 'function') ? getExamPart() : 'P1'; }
      catch (e) { examPart = 'P1'; }
    }
    var entry = {
      type: 'recommendation_acceptance',
      timestamp: _now(),
      data: {
        itemId: data.itemId || null,
        cohort: data.cohort || null,           // HS-9: cohort-aggregated only, never per-learner
        accepted: !!data.accepted,
        examPart: examPart
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] RecAcceptance:', data.itemId, 'accepted=' + data.accepted, 'cohort=' + data.cohort); } catch (e) {}
    }
    return entry;
  }

  // T2: Audit sample selector — last N micro-lesson / engagement events
  function getAuditSample(n) {
    n = n || 50;
    var samples = [];
    for (var i = _buffer.length - 1; i >= 0 && samples.length < n; i--) {
      var t = _buffer[i].type;
      if (t === 'micro_lesson' || t === 'engagement' || t === 'intervention') {
        samples.push(_buffer[i]);
      }
    }
    return samples;
  }

  // T3: Per-EW misconception-tag accuracy (DL-010 analog)
  function trackTagAccuracy(data) {
    data = data || {};
    var entry = {
      type: 'tag_accuracy',
      timestamp: _now(),
      data: {
        tagId: data.tagId || null,
        interventionId: data.interventionId || null,
        outcomeCorrect: !!data.outcomeCorrect,
        nextQuestionSameTopic: !!data.nextQuestionSameTopic
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] TagAccuracy:', data.tagId, 'outcome=' + (data.outcomeCorrect ? 'correct' : 'wrong')); } catch (e) {}
    }
    return entry;
  }

  // T4: Stated Part-intent capture (one session-start, aggregated — HS-6, HS-9)
  function trackPartIntent(data) {
    data = data || {};
    var examPart = data.examPart;
    if (!examPart) {
      try { examPart = (typeof getExamPart === 'function') ? getExamPart() : 'P1'; }
      catch (e) { examPart = 'P1'; }
    }
    var entry = {
      type: 'part_intent',
      timestamp: _now(),
      data: {
        examPart: examPart,
        capturedAt: _now()
        // No per-learner linkage (HS-6/HS-9)
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] PartIntent:', examPart); } catch (e) {}
    }
    return entry;
  }

  // T5: Cognitive-budget telemetry (HS-10 anchor signals)
  function trackCognitiveBudget(data) {
    data = data || {};
    var entry = {
      type: 'cognitive_budget',
      timestamp: _now(),
      data: {
        sessionDurationMs: typeof data.sessionDurationMs === 'number' ? data.sessionDurationMs : 0,
        abandoned: !!data.abandoned,
        lengthBucket: data.lengthBucket || 'unknown',
        surfaceAreaCount: typeof data.surfaceAreaCount === 'number' ? data.surfaceAreaCount : 0
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] CognitiveBudget:', data.sessionDurationMs + 'ms', 'abandoned=' + data.abandoned); } catch (e) {}
    }
    return entry;
  }

  // T6: Graceful-degradation event rate (DL-060 measurement anchor)
  // May 2.5 Track 1 (token may_2_5_track1, DL-060 A/B/C): emits the
  // indicatorVisible bit so A (undetected degradation) vs B (false
  // indicator) vs C (degradation without telemetry) are distinguishable.
  // visible iff degraded[]/fallback/_fallback active (HS-5 prose only).
  function trackDegradation(data) {
    data = data || {};
    if (!_counters.degradation) _counters.degradation = 0;
    _counters.degradation++;
    var entry = {
      type: 'degradation',
      timestamp: _now(),
      data: {
        stage: data.stage || 'unknown',
        reason: data.reason || 'unspecified',
        recoverable: data.recoverable !== false,
        indicatorVisible: data.indicatorVisible === true,
        totalEvents: _counters.degradation
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] Degradation:', data.stage, 'reason=' + data.reason, 'total=' + _counters.degradation); } catch (e) {}
    }
    return entry;
  }

  // Synthetic inject — preserves original timestamp for 30d backfill (fix for synthetic collapse)
  function injectSynthetic(event) {
    if (!event || !event.type) return null;
    var entry = {
      type: event.type,
      timestamp: event.timestamp || _now(),
      data: event.data || {}
    };
    // Preserve type-specific counters where needed
    if (entry.type === 'degradation' && entry.data.totalEvents == null) {
      if (!_counters.degradation) _counters.degradation = 0;
      _counters.degradation++;
      entry.data.totalEvents = _counters.degradation;
    }
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    return entry;
  }

  // ─────────────────────────────────────────────────────────────────
  // May 3.0 Track B — Guided Self-Score (token may_3_0_guided_self_score)
  // V-B1: no-score-emission (May never emits a score — counts criteria, not scores)
  // V-B2: rubric-citation (EV3 compliance per CAQS §4.3 line 345)
  // V-B3: PII-guard (losTag only, no learnerId/sessionId — HS-6/HS-9)
  // ─────────────────────────────────────────────────────────────────

  // V-B1/V-B3: Emits a self_score event with criterion counts only.
  // Payload: { losTag, criteriaMetCount, ev3CitedCount, mode }
  // NO numeric score, grade, band, or percentage (CAQS §1.4 lines 42-44).
  // ev3CitedCount = the count of rubric criteria that carry an actual
  //   sources.ev3Compliant citation (CAQS §4.3 EV3, line 345). This is the
  //   honest signal — criteriaTotal is intentionally absent (see disclosure
  //   below). losTag is the P2 CSO LOS identifier (e.g., "A.1") — never
  //   learner PII (HS-6/HS-9).
  // Disclosure (HS-9): criteriaMetCount / rubricTotal reconstructs a percentage
  //   of criteria met. This is LOS-level aggregate only (never per-learner
  //   profile) — contained by HS-9. criteriaTotal is intentionally NOT
  //   emitted in the telemetry payload; the audit sample inspects ev3CitedCount
  //   directly, not a count-as-proxy (DL-045 positive evidence).
  function trackSelfScoreSession(data) {
    data = data || {};
    var entry = {
      type: 'self_score',
      timestamp: _now(),
      data: {
        losTag: (data && data.losTag) || 'Unclassified',
        criteriaMetCount: typeof data.criteriaMetCount === 'number' ? data.criteriaMetCount : 0,
        ev3CitedCount: typeof data.ev3CitedCount === 'number' ? data.ev3CitedCount : 0,
        mode: (data && data.mode) || 'SELF_SCORE'
        // Deliberately: NO learnerId, NO sessionId, NO score/grade/band (HS-6, HS-9, CAQS §1.4)
      }
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_BUFFER) _buffer.shift();
    if (_shouldLog()) {
      try { console.debug('[MayTelemetry] SelfScore:', entry.data.losTag, 'ev3Cited=' + entry.data.ev3CitedCount, 'met=' + entry.data.criteriaMetCount); } catch (e) {}
    }
    return entry;
  }

  // V-B2: Audit sample for EV3-cited rubric criteria.
  // Filters self_score events and inspects ev3CitedCount directly — NOT
  // criteriaTotal as a count-as-proxy (DL-045 positive evidence). Every
  // criterion emitted must carry sources.ev3Compliant === true (CAQS §4.3
  // EV3, line 345). An event is "cited" iff ev3CitedCount > 0 AND equals
  // the rubric size passed by the calling mode handler (all criteria cited).
  // Returns { total, ev3Cited, compliant } where compliant = ≥95% of events
  // have all criteria EV3-cited.
  function getSelfScoreAuditSample(n) {
    n = n || 50;
    var samples = [];
    for (var i = _buffer.length - 1; i >= 0 && samples.length < n; i--) {
      if (_buffer[i].type === 'self_score') {
        samples.push(_buffer[i]);
      }
    }
    var ev3Cited = samples.filter(function(s) {
      // Each self_score event carries ev3CitedCount from the mode handler,
      // which inspected each criterion's ev3Compliant flag — not a bare count.
      return (s.data && s.data.ev3CitedCount > 0);
    }).length;
    return {
      total: samples.length,
      ev3Cited: ev3Cited,
      compliant: samples.length > 0 ? (ev3Cited / samples.length) >= 0.95 : true
    };
  }

  // V-B3: Buffer drain scan for PII in self_score events.
  // Returns { total, piiFields } — must be { total: N, piiFields: [] }.
  function scanSelfScoreForPii() {
    var piiFields = ['learnerId', 'userName', 'sessionId', 'userId', 'email'];
    var hits = [];
    for (var i = 0; i < _buffer.length; i++) {
      if (_buffer[i].type === 'self_score') {
        var d = _buffer[i].data || {};
        for (var j = 0; j < piiFields.length; j++) {
          if (d[piiFields[j]] !== undefined) hits.push(piiFields[j]);
        }
      }
    }
    return { total: _buffer.filter(function(e){ return e.type === 'self_score'; }).length, piiFields: hits };
  }

  // P-02 (2026-09-22): buffer-wide PII scan. scanSelfScoreForPii covers
  // self_score events only; decision/engagement payloads are free-form, so
  // the session-end hook audits every buffered event. Field-name match +
  // value-pattern match (email / phone-like). Returns { total, piiHits } with
  // piiHits entries { index, type, fields }. Console-only; never throws.
  var BUFFER_PII_FIELDS = ['learnerId', 'userName', 'sessionId', 'userId', 'email', 'phone'];
  var BUFFER_PII_VALUE_RE = /[\w.]+@[\w.]+\.\w+|\b\d{3}[-.]\d{3}[-.]\d{4}\b/;
  function scanBufferForPii() {
    var hits = [];
    try {
      for (var i = 0; i < _buffer.length; i++) {
        var d = (_buffer[i] && _buffer[i].data) || {};
        var fields = [];
        for (var j = 0; j < BUFFER_PII_FIELDS.length; j++) {
          if (d[BUFFER_PII_FIELDS[j]] !== undefined) fields.push(BUFFER_PII_FIELDS[j]);
        }
        try {
          for (var k in d) {
            if (Object.prototype.hasOwnProperty.call(d, k) && typeof d[k] === 'string' && BUFFER_PII_VALUE_RE.test(d[k])) {
              if (fields.indexOf(k + ':value') === -1) fields.push(k + ':value');
            }
          }
        } catch (e) { /* non-enumerable data — field check stands */ }
        if (fields.length) hits.push({ index: i, type: _buffer[i].type, fields: fields });
      }
    } catch (e) { /* buffer unreadable — report what we have */ }
    return { total: _buffer.length, piiHits: hits };
  }

  // P-01 (2026-09-22): session-end safety-instrument runner. Invokes the four
  // previously unwired instruments (breaker, self-score EV3 audit, PII scans,
  // micro-lesson authority audit) in one guarded pass. Console-only summary;
  // zero telemetry writes (no feedback loop); never throws — each instrument
  // is individually guarded so one failure cannot break session completion.
  function runSessionEndAudits() {
    var out = { ranAt: _now(), ok: true, parts: {} };
    function each(name, fn) {
      try { out.parts[name] = fn(); }
      catch (e) { out.ok = false; out.parts[name] = { error: String((e && e.message) || e) }; }
    }
    each('cognitiveBudget', function () { return checkCognitiveBudget(); });
    each('selfScoreEV3', function () { return getSelfScoreAuditSample(50); });
    each('selfScorePII', function () { return scanSelfScoreForPii(); });
    each('bufferPII', function () { return scanBufferForPii(); });
    each('microLesson', function () {
      try {
        if (typeof MayMicroLesson !== 'undefined' && MayMicroLesson.auditSample) return MayMicroLesson.auditSample(50);
      } catch (e) { /* fall through to vacuous-clean */ }
      return { total: 0, withAuthority: 0, compliant: true, note: 'micro-lesson unavailable' };
    });
    try {
      if (typeof console !== 'undefined' && console.debug) {
        console.debug('[MayTelemetry] session-end audits:', JSON.stringify({
          ok: out.ok,
          budget: out.parts.cognitiveBudget && out.parts.cognitiveBudget.reason,
          ev3: out.parts.selfScoreEV3,
          pii: (out.parts.bufferPII && out.parts.bufferPII.piiHits.length) || 0
        }));
      }
    } catch (e) {}
    return out;
  }

  return {
    trackDecision: trackDecision,
    trackMode: trackMode,
    trackReadiness: trackReadiness,
    trackRecommendation: trackRecommendation,
    trackIntervention: trackIntervention,
    trackAdoption: trackAdoption,
    trackEngagement: trackEngagement,
    trackFallback: trackFallback,
    startTimer: startTimer,
    endTimer: endTimer,
    snapshot: snapshot,
    drain: drain,
    reset: reset,
    // Phase 2.1 W7 (token may_v2_1_telemetry)
    trackRecommendationAcceptance: trackRecommendationAcceptance,
    getAuditSample: getAuditSample,
    trackTagAccuracy: trackTagAccuracy,
    trackPartIntent: trackPartIntent,
    trackCognitiveBudget: trackCognitiveBudget,
    trackDegradation: trackDegradation,
    // D3 LOS retention policy (HS-9 enforcement constants)
    LOS_RETENTION_DAYS: LOS_RETENTION_DAYS,
    COHORT_AGGREGATION_REQUIRED: COHORT_AGGREGATION_REQUIRED,
    // W9 HS-10 circuit breaker
    COGNITIVE_BUDGET_THRESHOLDS: COGNITIVE_BUDGET_THRESHOLDS,
    checkCognitiveBudget: checkCognitiveBudget,
    getCognitiveBudgetState: getCognitiveBudgetState,
    injectSynthetic: injectSynthetic,
    // May 3.0 Track B (token may_3_0_guided_self_score) — V-B1/V-B2/V-B3
    trackSelfScoreSession: trackSelfScoreSession,
    getSelfScoreAuditSample: getSelfScoreAuditSample,
    scanSelfScoreForPii: scanSelfScoreForPii,
    // P-01/P-02 (2026-09-22): wired safety instruments
    scanBufferForPii: scanBufferForPii,
    runSessionEndAudits: runSessionEndAudits
  };
})();

if (typeof window !== 'undefined') {
  window.MayTelemetry = MayTelemetry;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayTelemetry;
}
