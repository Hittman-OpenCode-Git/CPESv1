/**
 * hint-calibrator.worker.js — Web Worker host.
 *
 * Phase 2b. Deterministic JS calibration.
 */

'use strict';

var COG_FACTOR = {
  'REMEMBER': 0.0, 'UNDERSTAND': 0.2, 'APPLY': 0.4,
  'ANALYZE': 0.6, 'EVALUATE': 0.8, 'CREATE': 1.0
};

function calibrate(input) {
  var accuracy = (typeof input.accuracy === 'number') ? input.accuracy : 60;
  var hintRate = (typeof input.hintRate === 'number') ? input.hintRate : 30;
  var cogRaw = (input.cognitiveLevel || 'APPLY').toString().toUpperCase();
  var cogFactor = (typeof COG_FACTOR[cogRaw] === 'number') ? COG_FACTOR[cogRaw] : 0.5;
  var level = 3;
  if (accuracy < 40) level += 2;
  else if (accuracy < 60) level += 1;
  else if (accuracy >= 85) level -= 1;
  if (hintRate < 20) level -= 1;
  else if (hintRate > 60) level += 1;
  level += Math.round(cogFactor);
  if (level < 1) level = 1;
  if (level > 5) level = 5;
  return {
    hintLevel: level,
    rationale: 'worker_calibrate:accuracy=' + accuracy + ',hintRate=' + hintRate + ',cog=' + cogRaw,
    confidence: 0.75,
    decisionRuleId: input.decisionRuleId || null
  };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = calibrate(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
  }
});
