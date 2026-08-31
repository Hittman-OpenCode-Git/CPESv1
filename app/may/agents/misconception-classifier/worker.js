/**
 * misconception-classifier.worker.js — Web Worker host.
 *
 * Phase 2b. Deterministic JS classification (no model load). Mirrors the
 * real-intent-worker.js message protocol but the compute is pure JS.
 *
 * Message protocol:
 *   IN  { type: 'classify', requestId, input }
 *   OUT { type: 'result', requestId, output } | { type: 'result', requestId, error }
 *
 * Worker-mandatory per Phase 2b brief. Real ML model swap is a future extension;
 * current Worker holds the deterministic classifier.
 */

'use strict';

// Load the same classifier module the main thread uses, via a tiny inline copy.
// (importScripts of the main-thread file is unreliable across file:// schemes,
//  so we ship the classifier inline here. Same source-of-truth as index.js —
//  the patterns match the parent process's classify() function. If they diverge,
//  the smoke test will flag it.)
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
        rationale: 'worker_classify:' + (entry.dlTag || 'no_dl_tag') + ':' + entry.pattern
      };
    }
  }
  return { pattern: 'general_error', dlTag: null, confidence: 0.4, rationale: 'worker_fallback_general' };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = classify(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
    return;
  }
});
