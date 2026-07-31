/**
 * MayTelemetry — Standardized telemetry for May AI coaching layer.
 * 
 * All telemetry is console-only in development. No external network calls.
 * LLM telemetry gated behind ENABLE_LLM flag (always false in MAY-016).
 * Buffer capped at 500 events; oldest evicted on overflow.
 * 
 * Session: MAY-016
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
