/**
 * Misconception Classifier — Micro-Agent (Phase 2b)
 *
 * Input: { wrongText, topic, stem }   (from may-learner-state.js:197 _trackMisconception)
 * Output: { pattern, dlTag, confidence, rationale }
 *
 * Pattern set extends the existing ~9 patterns in _trackMisconception to ~16, with
 * DEFECT_LIBRARY.md cross-references (DL-008, DL-010, DL-013, DL-021, DL-026 etc).
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory (real-intent-worker.js pattern);
 * deterministic JS in the Worker. Hidden-beta: ENABLE_MISCONCEPTION_AGENT flag defaults
 * to false; when off the existing _trackMisconception keyword chain runs unaltered.
 *
 * 8 MB budget headroom reserved for a future ONNX model swap.
 */
(function () {
  'use strict';

  // ─── Extended pattern dictionary ────────────────────────────────────
  // Each entry: { matcher: RegExp, dlTag: string | null, confidence: number }
  // Match order matters; first match wins. Compound matches (e.g., 'cash' + 'flow')
  // appear before single-word matches ('cash' alone).
  var PATTERN_TABLE = [
    { matcher: /\bASC\s*205[-\d]*/i,           pattern: 'revenue_recognition_asc',         dlTag: 'DL-008' },
    { matcher: /\bASC\s*606/i,                  pattern: 'revenue_recognition_asc606',      dlTag: 'DL-008' },
    { matcher: /\bASC\s*842/i,                  pattern: 'purchase_acquisition_asc842',     dlTag: null },
    { matcher: /\bASC\s*\d{3}/,                 pattern: 'asc_topic_general',               dlTag: 'DL-008' },
    { matcher: /\bCOSO\b/i,                     pattern: 'control_framework_error',         dlTag: 'DL-013' },
    { matcher: /\bvariance\s+(analysis|calculation)/i, pattern: 'variance_sign_confusion', dlTag: 'DL-010' },
    { matcher: /\bvariance\b/i,                 pattern: 'variance_sign_confusion',         dlTag: 'DL-010' },
    { matcher: /\bbudget.*forecast/i,           pattern: 'budget_component_error',          dlTag: null },
    { matcher: /\bbudget\b/i,                   pattern: 'budget_component_error',          dlTag: null },
    { matcher: /\bcost\s+.*standard/i,          pattern: 'cost_method_confusion',           dlTag: null },
    { matcher: /\bdepreciation\b/i,             pattern: 'depreciation_method_error',       dlTag: null },
    { matcher: /\bclassification.*current/i,   pattern: 'misclassification',               dlTag: null },
    { matcher: /\bclassification\b/i,           pattern: 'misclassification',               dlTag: null },
    { matcher: /\bcash\s+flow/i,                pattern: 'cash_flow_classification',        dlTag: 'DL-026' },
    { matcher: /\bratio.*analysis/i,            pattern: 'ratio_misapplication',            dlTag: null },
    { matcher: /\bratio\b/i,                    pattern: 'ratio_misapplication',            dlTag: null }
  ];

  // ─── Defect Library cross-reference ─────────────────────────────────
  // Lazy-loaded once; failures here are silently ignored (deterministic agent).
  var _dlCache = null;
  function _dlIndex() {
    if (_dlCache !== null) return _dlCache;
    _dlCache = {};
    try {
      // global require lookup; in browser, fetch-based lookup would go here.
      var fs = (typeof require !== 'undefined') ? require('fs') : null;
      var path = (typeof require !== 'undefined') ? require('path') : null;
      if (fs && path) {
        var dlPath = path.resolve(__dirname, '..', '..', '..', '..', 'knowledge', 'DEFECT_LIBRARY.md');
        if (fs.existsSync(dlPath)) {
          var body = fs.readFileSync(dlPath, 'utf8');
          // Build a map id -> title from the markdown headings.
          var re = /^### (DL-\d{3})[^\n]*\n([^\n#]+)/gm;
          var m;
          while ((m = re.exec(body)) !== null) {
            _dlCache[m[1]] = m[2].trim();
          }
        }
      }
    } catch (e) { _dlCache = {}; }
    if (_dlCache == null) _dlCache = {};
    return _dlCache;
  }

  // ─── Core classification ───────────────────────────────────────────
  function classify(input) {
    var topic = (input && input.topic) ? String(input.topic).toLowerCase() : '';
    var wrongText = (input && input.wrongText) ? String(input.wrongText).toLowerCase() : '';
    var stem = (input && input.stem) ? String(input.stem).toLowerCase() : '';
    var haystack = (topic + ' ' + wrongText + ' ' + stem).trim();
    if (!haystack) return null;

    for (var i = 0; i < PATTERN_TABLE.length; i++) {
      var entry = PATTERN_TABLE[i];
      if (entry.matcher.test(haystack)) {
        return {
          pattern: entry.pattern,
          dlTag: entry.dlTag,
          confidence: 0.7,
          rationale: 'extended_keyword_match:' + (entry.dlTag || 'no_dl_tag') + ':' + entry.pattern
        };
      }
    }
    // No tag matched — fall through to general. Caller decides whether to use this.
    return {
      pattern: 'general_error',
      dlTag: null,
      confidence: 0.4,
      rationale: 'fallback_general'
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = classify(input);
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: result.confidence,
      provider: 'misconception-classifier',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: 'misconception'
      }
    });
  }

  function MisconceptionClassifierProvider() {
    this._providerId = 'misconception-classifier';
    this._providerType = 'misconception-classifier';
    this._isAvailable = false;
  }

  MisconceptionClassifierProvider.prototype.getProviderId = function () { return this._providerId; };

  MisconceptionClassifierProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_MISCONCEPTION_AGENT')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  MisconceptionClassifierProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['misconception-classification', 'pattern-tagging', 'defect-cross-reference'],
      sizeBudgetMB: 8,
      description: 'Misconception Classifier (Phase 2b, hidden beta) — keyword+DL-tag agent'
    };
  };

  MisconceptionClassifierProvider.prototype.validateConfig = function () {
    return { valid: true, errors: [] };
  };

  MisconceptionClassifierProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };

  MisconceptionClassifierProvider.prototype.initialize = function () {
    return Promise.resolve();
  };

  MisconceptionClassifierProvider.prototype.shutdown = function () {
    return Promise.resolve();
  };

  MisconceptionClassifierProvider.prototype.send = _send;

  // Expose classify for direct (sync) integration by may-learner-state.js:197
  MisconceptionClassifierProvider.classify = classify;
  MisconceptionClassifierProvider.PATTERN_TABLE = PATTERN_TABLE;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      MisconceptionClassifierProvider: MisconceptionClassifierProvider,
      classify: classify,
      PATTERN_TABLE: PATTERN_TABLE
    };
  }
  if (typeof window !== 'undefined') {
    window.MisconceptionClassifierProvider = MisconceptionClassifierProvider;
    window.MisconceptionClassifierClassify = classify;
  }
})();
