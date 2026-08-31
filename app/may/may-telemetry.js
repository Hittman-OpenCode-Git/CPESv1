/**
 * MayTelemetry — Standardized telemetry for May AI coaching layer.
 * 
 * All telemetry is console-only in development. No external network calls.
 * LLM telemetry gated behind ENABLE_LLM flag (always false in MAY-016).
 * Buffer capped at 500 events; oldest evicted on overflow.
 * 
 * Event types (7): decision, mode, readiness, recommendation, intervention,
 *   adoption (MAY-025), engagement (MAY-025)
 * 
 * Sessions: MAY-016 (base), MAY-025 (adoption + engagement events)
 * Governance: Light Lane (UI/observability — no pack/case/content impact)
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
    reset: reset
  };
})();

if (typeof window !== 'undefined') {
  window.MayTelemetry = MayTelemetry;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayTelemetry;
}
