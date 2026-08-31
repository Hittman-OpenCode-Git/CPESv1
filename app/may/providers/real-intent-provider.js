/**
 * real-intent-provider.js — Real in-browser intent classifier provider.
 *
 * Phase 0b (zero-shot baseline) + Phase 1b (fine-tuned text-classification).
 * Wraps @huggingface/transformers v4 behind the same PROVIDER_INTERFACE contract
 * as StubIntentProvider.
 *
 * Architecture:
 *   - Browser: loads via Web Worker (real-intent-worker.js) for non-blocking inference.
 *   - Node:    loads via main-thread @huggingface/transformers (for benchmark/test).
 *
 * Selection logic (set by selectProvider):
 *   - Hidden beta: only routed when ENABLE_NEEDLE_ROUTER=true.
 *   - isAvailable() returns true only after the pipeline is loaded and warm.
 *   - Sends LLMRequest → receives LLMResponse with content=JSON.stringify(parsed).
 *
 * Output contract (matches stub):
 *   {
 *     mode: 'EXPLAIN'|'QUIZ'|'SOCRATIC'|'STUDY_PLAN',
 *     action: 'wrong-choices'|'similar'|'hint'|'progress',
 *     args: { qid?, topic?, hintLevel? },
 *     confidence: number,
 *     rationale: '...'
 *   }
 *
 * Pipeline choice:
 *   - opts.pipeline = 'text-classification' → use opts.modelDir (local fine-tuned model)
 *     Used by Phase 1b default. Reads (label, score) from output[0].
 *   - opts.pipeline = 'zero-shot-classification' (default) → use opts.modelId (HF Hub)
 *     Used by Phase 0b. Reads labels[0]/scores[0] from output object.
 *
 * Lane: Full Lane (Phase 0b + Phase 1b). Read-only on pack/case files.
 */
(function () {
  'use strict';

  // ─── Label → Mode mapping (Phase 0b — zero-shot) ────────────────
  var ZERO_SHOT_LABELS = [
    'explain this to me',
    'give me a practice question',
    'help me figure this out',
    'plan my study schedule'
  ];
  var ZERO_SHOT_LABEL_TO_MODE = {
    'explain this to me':       { mode: 'EXPLAIN',     action: 'wrong-choices' },
    'give me a practice question': { mode: 'QUIZ',         action: 'similar' },
    'help me figure this out':  { mode: 'SOCRATIC',    action: 'hint' },
    'plan my study schedule':   { mode: 'STUDY_PLAN',  action: 'progress' }
  };

  // Phase 1b — fine-tuned model outputs the canonical CMA mode names directly
  // (from id2label in config.json). We just normalize action.
  var FINETUNED_LABEL_TO_ACTION = {
    'EXPLAIN':     'wrong-choices',
    'QUIZ':        'similar',
    'SOCRATIC':    'hint',
    'STUDY_PLAN':  'progress'
  };

  // QID regex (mirrors stub-intent-provider.js QID_REGEX)
  var QID_REGEX = /\b(P1[A-F]?-[A-Z]+-\d{3})\b/i;

  function _extractArgs(text, mode) {
    var args = {};
    var qidMatch = text.match(QID_REGEX);
    if (qidMatch) args.qid = qidMatch[1].toUpperCase();
    return args;
  }

  function _buildResponse(text, output, pipelineType) {
    // Phase 0b — zero-shot-classification returns { sequence, labels[], scores[] }
    // Phase 1b — text-classification returns [ { label, score } ] (top-1)
    var topLabel = null;
    var topScore = 0.0;
    var rationale;
    if (pipelineType === 'text-classification' || (Array.isArray(output) && output.length && typeof output[0] === 'object' && output[0].label)) {
      // text-classification: array of {label, score}
      if (Array.isArray(output) && output.length) {
        topLabel = output[0].label;
        topScore = typeof output[0].score === 'number' ? output[0].score : 0;
      }
    } else if (output && Array.isArray(output.labels) && Array.isArray(output.scores)) {
      topLabel = output.labels[0];
      topScore = output.scores[0];
    }
    var mapping = (pipelineType === 'text-classification')
      ? (topLabel ? { mode: topLabel, action: FINETUNED_LABEL_TO_ACTION[topLabel] || 'wrong-choices' } : null)
      : (topLabel ? ZERO_SHOT_LABEL_TO_MODE[topLabel] : null);
    var mode = mapping ? mapping.mode : 'EXPLAIN';   // default fallback
    var action = mapping ? mapping.action : 'wrong-choices';
    var args = _extractArgs(text, mode);
    rationale = (pipelineType === 'text-classification')
      ? 'finetuned_text_class:' + (topLabel || 'no_match')
      : 'zero_shot_nli:' + (topLabel || 'no_match');
    return {
      mode: mode,
      action: action,
      args: args,
      confidence: topScore,
      rationale: rationale
    };
  }

  // ─── Browser Worker bridge ────────────────────────────────────────
  function _createBrowserProvider(opts) {
    var worker = null;
    var isReady = false;
    var pending = {};
    var nextRequestId = 1;

    function _start() {
      try {
        worker = new Worker(opts.workerUrl);
      } catch (e) {
        console.error('[real-intent-provider] Worker construction failed:', e.message);
        return Promise.reject(e);
      }
      return new Promise(function (resolve, reject) {
        function onMsg(ev) {
          var msg = ev.data;
          if (!msg) return;
          if (msg.type === 'ready') {
            isReady = true;
            worker.removeEventListener('message', onMsg);
            resolve();
          } else if (msg.type === 'load-error') {
            worker.removeEventListener('message', onMsg);
            reject(new Error(msg.message || 'model load failed'));
          }
        }
        worker.addEventListener('message', onMsg);
        worker.addEventListener('error', function (e) {
          reject(new Error('worker error: ' + (e.message || 'unknown')));
        });
        var initMsg = {
          type: 'init',
          pipeline: opts.pipeline || 'zero-shot-classification',
          dtype: opts.dtype || 'q8',
          labels: ZERO_SHOT_LABELS
        };
        if (initMsg.pipeline === 'text-classification') {
          initMsg.modelRef = opts.modelDir || './models/mobilebert-intent-q8';
        } else {
          initMsg.modelRef = 'Xenova/' + (opts.modelId || 'mobilebert-uncased-mnli');
        }
        worker.postMessage(initMsg);
      });
    }

    return {
      initialize: function () { return _start(); },
      isAvailable: function () { return isReady; },
      send: function (text) {
        if (!isReady) return Promise.reject(new Error('provider not ready'));
        var requestId = nextRequestId++;
        return new Promise(function (resolve, reject) {
          pending[requestId] = { resolve: resolve, reject: reject };
          worker.postMessage({ type: 'classify', requestId: requestId, text: text });
        });
      },
      shutdown: function () {
        if (worker) worker.terminate();
        isReady = false;
        return Promise.resolve();
      },
      _onWorkerMessage: function (msg) {
        if (msg.type === 'result' && pending[msg.requestId]) {
          var p = pending[msg.requestId];
          delete pending[msg.requestId];
          if (msg.error) p.reject(new Error(msg.error));
          else p.resolve(msg.output);
        }
      },
      _buildResponse: function (text, output) { return _buildResponse(text, output, opts.pipeline); }
    };
  }

  // ─── Node main-thread bridge (for benchmarks/tests) ───────────────
  function _createNodeProvider(opts) {
    var pipelineInstance = null;
    var isReady = false;

    return {
      initialize: function () {
        if (pipelineInstance) return Promise.resolve();
        var t = require('@huggingface/transformers');
        var pipelineType = opts.pipeline || 'zero-shot-classification';
        var ref;
        if (pipelineType === 'text-classification') {
          ref = opts.modelDir || './models/mobilebert-intent-q8';
          return t.pipeline(pipelineType, ref).then(function (p) {
            pipelineInstance = p;
            isReady = true;
          });
        } else {
          ref = 'Xenova/' + (opts.modelId || 'mobilebert-uncased-mnli');
          return t.pipeline(pipelineType, ref, { dtype: opts.dtype || 'q8' }).then(function (p) {
            pipelineInstance = p;
            isReady = true;
          });
        }
      },
      isAvailable: function () { return isReady; },
      send: function (text) {
        if (!isReady) return Promise.reject(new Error('provider not ready'));
        if (opts.pipeline === 'text-classification') {
          return pipelineInstance(text);
        }
        return pipelineInstance(text, ZERO_SHOT_LABELS);
      },
      shutdown: function () {
        pipelineInstance = null;
        isReady = false;
        return Promise.resolve();
      },
      _buildResponse: function (text, output) { return _buildResponse(text, output, opts.pipeline || 'zero-shot-classification'); }
    };
  }

  // ─── Public Provider class ────────────────────────────────────────
  function RealIntentProvider(opts) {
    opts = opts || {};
    this._providerId = 'real-intent';
    this._providerType = 'real';
    this._opts = {
      pipeline: opts.pipeline || 'zero-shot-classification',
      modelId: opts.modelId || 'mobilebert-uncased-mnli',
      modelDir: opts.modelDir || './models/mobilebert-intent-q8',
      dtype: opts.dtype || 'q8',
      workerUrl: opts.workerUrl || './real-intent-worker.js'
    };
    this._impl = (typeof window !== 'undefined' && typeof Worker !== 'undefined')
      ? _createBrowserProvider(this._opts)
      : _createNodeProvider(this._opts);
  }

  RealIntentProvider.prototype.getProviderId = function () { return this._providerId; };

  RealIntentProvider.prototype.isAvailable = function () {
    return this._impl.isAvailable();
  };

  RealIntentProvider.prototype.getConfig = function () {
    var isFinetuned = this._opts.pipeline === 'text-classification';
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['intent-extraction', isFinetuned ? 'text-classification' : 'zero-shot-nli', 'explain', 'quiz', 'socratic', 'study_plan'],
      pipeline: this._opts.pipeline,
      model: isFinetuned ? this._opts.modelDir : ('Xenova/' + this._opts.modelId),
      dtype: isFinetuned ? 'n/a' : this._opts.dtype,
      description: isFinetuned
        ? 'Real fine-tuned CMA intent classifier (@huggingface/transformers v4, local ONNX)'
        : 'Real MNLI zero-shot intent classifier (@huggingface/transformers v4)'
    };
  };

  RealIntentProvider.prototype.validateConfig = function () {
    var errors = [];
    if (!this._opts.modelId) errors.push('modelId is required');
    if (!this._opts.dtype) errors.push('dtype is required');
    return { valid: errors.length === 0, errors: errors };
  };

  RealIntentProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };

  RealIntentProvider.prototype.initialize = function () {
    return this._impl.initialize();
  };

  RealIntentProvider.prototype.shutdown = function () {
    return this._impl.shutdown();
  };

  RealIntentProvider.prototype.send = function (request) {
    var self = this;
    var startTime = (typeof performance !== 'undefined' && performance.now)
      ? performance.now() : Date.now();

    // Extract text from LLMRequest
    var text = '';
    if (request && request.context) {
      if (typeof request.context.freeText === 'string') text = request.context.freeText;
      else if (typeof request.context.userQuery === 'string') text = request.context.userQuery;
    }
    if (!text && request && typeof request.prompt === 'string') text = request.prompt;

    return this._impl.send(text).then(function (output) {
      var parsed = self._impl._buildResponse(text, output, self._opts.pipeline);
      var endTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      return {
        success: true,
        content: JSON.stringify(parsed),
        confidence: parsed.confidence,
        provider: self._providerId,
        latency: endTime - startTime,
        fallback: false,
        error: null,
        metadata: {
          requestId: (request && request.metadata && request.metadata.requestId) || null,
          timestamp: new Date().toISOString(),
          mode: parsed.mode
        }
      };
    }).catch(function (err) {
      var endTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      return {
        success: false,
        content: null,
        confidence: 0,
        provider: self._providerId,
        latency: endTime - startTime,
        fallback: true,
        error: err.message || 'unknown error',
        metadata: {
          requestId: (request && request.metadata && request.metadata.requestId) || null,
          timestamp: new Date().toISOString()
        }
      };
    });
  };

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RealIntentProvider: RealIntentProvider };
  }
  if (typeof window !== 'undefined') {
    window.RealIntentProvider = RealIntentProvider;
  }
})();
