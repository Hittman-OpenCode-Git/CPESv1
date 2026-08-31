/**
 * Hint Calibrator — Micro-Agent (Phase 2b)
 *
 * Input: { accuracy, hintRate, cognitiveLevel, decisionRuleId }
 *   (decorates MayDecisionEngine D1-D10 rules)
 * Output: { hintLevel: 1..5, rationale, confidence }
 *
 * 1 = gentle nudge, 5 = full direct answer. Calibrated lookup so the hint level
 * a) tracks accuracy (low accuracy → more verbose hints), b) accounts for
 * cognitive level (remembering → lower, evaluating → higher), and
 * c) reflects recent hint usage (high hintRate → decrease verbose hints).
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory. Hidden beta:
 * ENABLE_HINT_CALIBRATOR flag defaults to false. When off, MayDecisionEngine
 * uses its existing hint level computation.
 *
 * 5 MB budget reserved for future ONNX model swap.
 */
(function () {
  'use strict';

  // ─── Cognitive level mapping (CMA Bloom-equivalent) ────────────────
  var COG_FACTOR = {
    'REMEMBER':     0.0,
    'UNDERSTAND':   0.2,
    'APPLY':        0.4,
    'ANALYZE':      0.6,
    'EVALUATE':     0.8,
    'CREATE':       1.0
  };

  // ─── Calibration table ─────────────────────────────────────────────
  // Each row: lowAcc <threshold for that tier, hintRate<:drop, baseLevel offset
  // Tuned so that a typical learner (60-80% accuracy, 30% hint rate,
  // cognitive UNDERSTAND/APPLY) ends up at hintLevel 2-3.
  function calibrate(input) {
    var accuracy = (typeof input.accuracy === 'number') ? input.accuracy : 60;
    var hintRate = (typeof input.hintRate === 'number') ? input.hintRate : 30;
    var cogRaw = (input.cognitiveLevel || 'APPLY').toString().toUpperCase();
    var cogFactor = (typeof COG_FACTOR[cogRaw] === 'number') ? COG_FACTOR[cogRaw] : 0.5;

    var level = 3; // baseline: medium hint
    if (accuracy < 40) level += 2;
    else if (accuracy < 60) level += 1;
    else if (accuracy >= 85) level -= 1;

    if (hintRate < 20) level -= 1;       // learner is already used to figuring out
    else if (hintRate > 60) level += 1;  // learner is hint-dependent

    level += Math.round(cogFactor);      // higher cog → more verbose hints
    if (level < 1) level = 1;
    if (level > 5) level = 5;

    return {
      hintLevel: level,
      rationale: 'agent_calibrate:accuracy=' + accuracy + ',hintRate=' + hintRate + ',cog=' + cogRaw,
      confidence: 0.75,
      decisionRuleId: input.decisionRuleId || null
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = calibrate(input);
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: result.confidence,
      provider: 'hint-calibrator',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: 'hint-level'
      }
    });
  }

  function HintCalibratorProvider() {
    this._providerId = 'hint-calibrator';
    this._providerType = 'hint-calibrator';
    this._isAvailable = false;
  }

  HintCalibratorProvider.prototype.getProviderId = function () { return this._providerId; };

  HintCalibratorProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_HINT_CALIBRATOR')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  HintCalibratorProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['hint-level-calibration', 'cognitive-level-aware', 'hint-rate-balance'],
      sizeBudgetMB: 5,
      description: 'Hint Calibrator (Phase 2b, hidden beta) — accuracy × hintRate × cognition → hintLevel 1-5'
    };
  };

  HintCalibratorProvider.prototype.validateConfig = function () {
    return { valid: true, errors: [] };
  };

  HintCalibratorProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };

  HintCalibratorProvider.prototype.initialize = function () { return Promise.resolve(); };
  HintCalibratorProvider.prototype.shutdown = function () { return Promise.resolve(); };
  HintCalibratorProvider.prototype.send = _send;

  HintCalibratorProvider.calibrate = calibrate;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HintCalibratorProvider: HintCalibratorProvider, calibrate: calibrate };
  }
  if (typeof window !== 'undefined') {
    window.HintCalibratorProvider = HintCalibratorProvider;
    window.HintCalibratorCalibrate = calibrate;
  }
})();
