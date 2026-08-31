/**
 * real-intent-worker.js — Web Worker host for the @huggingface/transformers v4 pipeline.
 *
 * Phase 0b (zero-shot) + Phase 1b (fine-tuned text-classification).
 * Runs in a Worker thread so model load + inference don't block the main UI.
 *
 * Uses the browser-friendly UMD bundle (transformers.web.min.js) via importScripts.
 * This works in a CLASSIC Worker (no ESM needed).
 *
 * Message protocol:
 *   IN  { type: 'init', pipeline, modelRef, dtype, labels }
 *        - pipeline: 'zero-shot-classification' (Phase 0b) | 'text-classification' (Phase 1b)
 *        - modelRef: 'Xenova/<hub-id>' (remote) OR a local path (file:// — TBD in browser)
 *        - dtype: 'q8' | 'q4' | 'fp32' (default 'q8')
 *        - labels: candidate labels for zero-shot; unused for text-classification
 *   OUT { type: 'ready' } | { type: 'load-error', message }
 *   IN  { type: 'classify', requestId, text }
 *   OUT { type: 'result', requestId, output } | { type: 'result', requestId, error }
 *
 * Output contract (v4 text-classification):
 *   [{ label: 'EXPLAIN', score: 0.6 }]   - top-1 only
 *
 * Output contract (v4 zero-shot-classification):
 *   { sequence, labels: [...], scores: [...] }   - sorted by score desc
 *
 * Lane: Full Lane (Phase 0b / Phase 1b).
 */

'use strict';

// Bundle URL — pinned version 4.2.0 (verified against npm 2026-08-26).
// transformers.web.min.js exposes a global `Transformers` namespace with { pipeline, env }.
try {
  importScripts('https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0/dist/transformers.web.min.js');
} catch (e) {
  self.postMessage({ type: 'load-error', message: 'importScripts failed: ' + (e.message || e) });
  return;
}

if (typeof Transformers === 'undefined') {
  self.postMessage({ type: 'load-error', message: 'Transformers global not found after importScripts' });
  return;
}

var pipelineInstance = null;
var PIPELINE_TYPE = null;  // 'zero-shot-classification' | 'text-classification'
var LABELS = [];

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;

  if (msg.type === 'init') {
    PIPELINE_TYPE = msg.pipeline || 'zero-shot-classification';
    LABELS = msg.labels || [];
    var dtype = msg.dtype || 'q8';
    var modelRef = msg.modelRef || 'Xenova/mobilebert-uncased-mnli';

    // Allow remote model load (downloads from Hugging Face Hub on first run)
    try {
      if (Transformers.env) {
        Transformers.env.allowRemoteModels = true;
        Transformers.env.useBrowserCache = true;
        Transformers.env.localModelPath = './';  // relative paths for local files
      }
    } catch (e) { /* ignore */ }

    try {
      var pipelineArgs;
      var pipelineCall;
      if (PIPELINE_TYPE === 'text-classification') {
        // Phase 1b — fine-tuned local model. transformers.js will look for
        // onnx/model_quantized.onnx (or onnx/model.onnx) under the path.
        // We do NOT pass dtype here — transformers.js picks the quantized
        // file automatically when present.
        pipelineCall = Transformers.pipeline(PIPELINE_TYPE, modelRef);
      } else {
        // Phase 0b — zero-shot with dtype
        pipelineCall = Transformers.pipeline(PIPELINE_TYPE, modelRef, { dtype: dtype });
      }
      pipelineCall.then(function (p) {
        pipelineInstance = p;
        self.postMessage({ type: 'ready' });
      }).catch(function (e) {
        self.postMessage({ type: 'load-error', message: 'pipeline load failed: ' + (e.message || e) });
      });
    } catch (e) {
      self.postMessage({ type: 'load-error', message: 'pipeline() threw: ' + (e.message || e) });
    }
    return;
  }

  if (msg.type === 'classify') {
    if (!pipelineInstance) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: 'pipeline not ready' });
      return;
    }
    var p;
    if (PIPELINE_TYPE === 'zero-shot-classification') {
      p = pipelineInstance(msg.text, LABELS);
    } else {
      // text-classification: labels not used, model picks from its trained head
      p = pipelineInstance(msg.text);
    }
    p.then(function (output) {
      self.postMessage({ type: 'result', requestId: msg.requestId, output: output });
    }).catch(function (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    });
    return;
  }
});
