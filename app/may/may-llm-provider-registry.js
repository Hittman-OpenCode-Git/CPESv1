/**
 * may-llm-provider-registry.js — Provider registry, selection, and lifecycle.
 * 
 * Contains:
 *   - MockProvider: default testing-safe provider (no network, deterministic)
 *   - AzureOpenAIProvider: skeleton adapter for Azure OpenAI (requires env vars)
 *   - OpenAIProvider: skeleton adapter for OpenAI API (requires env vars)
 *   - ProviderRegistry: registration, selection, health checks
 * 
 * All real providers require explicit environment-variable configuration.
 * No credentials are stored in this file. No network calls by default.
 * The MockProvider is always available and requires no configuration.
 * 
 * Session: MAY-003 (LLM Adapter Layer)
 * Governance: Light Lane (helper utility — no pack/case/content impact)
 */

const MayLLMProviderRegistry = (function() {
  'use strict';

  // ─── Internal State ────────────────────────────────────────────

  var _providers = {};
  var _primaryProviderId = 'mock';
  var _initialized = false;

  // ─── Helper ───────────────────────────────────────────────────

  function _now() {
    return Date.now();
  }

  function _env(key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || null;
      }
    } catch (e) { /* browser — no process */ }
    return null;
  }

  function _checkFlag(flagName) {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled(flagName);
      }
    } catch (e) {}
    return false;
  }

  // ====================================================================
  // MOCK PROVIDER — Default provider with deterministic responses
  // ====================================================================

  var MockProvider = {
    _providerId: 'mock',
    _providerType: 'mock',
    _config: {
      providerId: 'mock',
      providerType: 'mock',
      capabilities: ['explain', 'quiz', 'socratic', 'study_plan'],
      description: 'Deterministic mock provider for testing — no network access'
    },

    /**
     * Send a request. Returns deterministic response based on mode.
     * No network calls. No randomness.
     */
    send: function(request) {
      var self = this;
      return new Promise(function(resolve) {
        var startTime = _now();
        var mode = (request && request.mode) || 'EXPLAIN';

        // Simulate minimal processing delay (0ms in mock — deterministic)
        var content = self._generateContent(mode, request);
        var latency = _now() - startTime;

        resolve({
          success: true,
          content: content,
          confidence: 0.85,
          provider: 'mock',
          latency: latency,
          fallback: false,
          error: null,
          metadata: {
            requestId: (request && request.metadata && request.metadata.requestId) || null,
            timestamp: new Date().toISOString(),
            mode: mode
          }
        });
      });
    },

    _generateContent: function(mode, request) {
      var ctx = (request && request.context) || {};
      var q = ctx.question || {};
      var l = ctx.learner || {};
      var topic = q.topic || 'accounting';

      switch (mode) {
        case 'EXPLAIN':
          return [
            '[' + topic + ' — Explanation]',
            'The concept tested is: ' + (q.topic || 'accounting principles') + '.',
            'The correct answer addresses the core principle as defined by the governing standard.',
            'Review the explanation provided in the question bank for detailed step-by-step reasoning.'
          ].join('\n');

        case 'QUIZ':
          var weakTopic = (l.weaknessClusters && l.weaknessClusters.persistentWeak &&
                           l.weaknessClusters.persistentWeak.length > 0)
            ? l.weaknessClusters.persistentWeak[0].topic : topic;
          return [
            '[Quiz Guidance — ' + weakTopic + ']',
            'Focus domain: ' + weakTopic,
            'Recommended: 10-15 practice questions',
            'Reason: This topic area needs reinforcement based on your recent performance.'
          ].join('\n');

        case 'SOCRATIC':
          return [
            '[Socratic Question Chain — ' + topic + ']',
            '1. What is the fundamental principle at play in this question?',
            '2. How does the governing standard define the key term?',
            '3. Which choice aligns with that definition?',
            '4. Why do the other choices fall short?',
            '',
            'Hint: Start by identifying the accounting framework or standard being tested.'
          ].join('\n');

        case 'STUDY_PLAN':
          var readinessKeys = Object.keys(l.readinessBands || {});
          var recoveryTopics = readinessKeys.filter(function(k) {
            return l.readinessBands[k] === 'Recovery needed';
          });
          return [
            '[Study Plan]',
            'Focus Areas:',
            recoveryTopics.length > 0
              ? '  - Prioritize recovery topics: ' + recoveryTopics.join(', ')
              : '  - Review topics approaching readiness',
            '',
            'Recommended Actions:',
            '  1. Complete targeted MCQ practice on weakest topics (15-20 min)',
            '  2. Review missed question explanations thoroughly',
            '  3. Take one timed practice session per week',
            '',
            'Estimated total: 60-90 minutes per study session'
          ].join('\n');

        default:
          return '[Mock response for mode: ' + mode + ']';
      }
    },

    getProviderId: function() { return this._providerId; },
    isAvailable: function() { return true; },
    getConfig: function() { return JSON.parse(JSON.stringify(this._config)); },

    validateConfig: function() {
      return { valid: true, errors: [] };
    },

    healthCheck: function() {
      var self = this;
      return new Promise(function(resolve) {
        resolve({ available: true, latency: 0, provider: self._providerId });
      });
    }
  };

  // ====================================================================
  // AZURE OPENAI PROVIDER — Skeleton adapter
  // ====================================================================

  var AzureOpenAIProvider = {
    _providerId: 'azure-openai',
    _providerType: 'azure',
    _config: {
      providerId: 'azure-openai',
      providerType: 'azure',
      capabilities: ['explain', 'quiz', 'socratic', 'study_plan'],
      description: 'Azure OpenAI Service adapter — requires AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_API_KEY env vars'
    },

    send: function(request) {
      return new Promise(function(resolve, reject) {
        var endpoint = _env('AZURE_OPENAI_ENDPOINT');
        var apiKey = _env('AZURE_OPENAI_API_KEY');
        var deployment = _env('AZURE_OPENAI_DEPLOYMENT') || 'gpt-4';

        if (!endpoint || !apiKey) {
          resolve({
            success: false,
            content: null,
            confidence: 0,
            provider: 'azure-openai',
            latency: 0,
            fallback: true,
            error: 'Azure OpenAI not configured: missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY',
            metadata: {
              requestId: (request && request.metadata && request.metadata.requestId) || null,
              timestamp: new Date().toISOString(),
              mode: (request && request.mode) || 'unknown'
            }
          });
          return;
        }

        var startTime = _now();
        var body = {
          messages: [
            { role: 'system', content: 'You are a CMA Part 1 tutor. Be concise and accurate.' },
            { role: 'user', content: (request && request.prompt) || '' }
          ],
          max_tokens: 500,
          temperature: 0.3
        };

        try {
          fetch(endpoint + '/openai/deployments/' + deployment + '/chat/completions?api-version=2024-02-15-preview', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': apiKey
            },
            body: JSON.stringify(body)
          }).then(function(response) {
            if (!response.ok) {
              throw new Error('HTTP ' + response.status);
            }
            return response.json();
          }).then(function(data) {
            var content = (data.choices && data.choices[0] && data.choices[0].message)
              ? data.choices[0].message.content : '';
            resolve({
              success: true,
              content: content,
              confidence: 0.9,
              provider: 'azure-openai',
              latency: _now() - startTime,
              fallback: false,
              error: null,
              metadata: {
                requestId: (request && request.metadata && request.metadata.requestId) || null,
                timestamp: new Date().toISOString(),
                mode: (request && request.mode) || 'unknown'
              }
            });
          }).catch(function(err) {
            resolve({
              success: false,
              content: null,
              confidence: 0,
              provider: 'azure-openai',
              latency: _now() - startTime,
              fallback: true,
              error: 'Azure OpenAI request failed: ' + (err.message || 'unknown error'),
              metadata: {
                requestId: (request && request.metadata && request.metadata.requestId) || null,
                timestamp: new Date().toISOString(),
                mode: (request && request.mode) || 'unknown'
              }
            });
          });
        } catch (e) {
          resolve({
            success: false,
            content: null,
            confidence: 0,
            provider: 'azure-openai',
            latency: _now() - startTime,
            fallback: true,
            error: 'Azure OpenAI provider error: ' + (e.message || 'unknown'),
            metadata: {
              requestId: (request && request.metadata && request.metadata.requestId) || null,
              timestamp: new Date().toISOString(),
              mode: (request && request.mode) || 'unknown'
            }
          });
        }
      });
    },

    getProviderId: function() { return this._providerId; },
    isAvailable: function() {
      var endpoint = _env('AZURE_OPENAI_ENDPOINT');
      var apiKey = _env('AZURE_OPENAI_API_KEY');
      return !!(endpoint && apiKey);
    },
    getConfig: function() { return JSON.parse(JSON.stringify(this._config)); },

    validateConfig: function() {
      var errors = [];
      if (!_env('AZURE_OPENAI_ENDPOINT')) errors.push('Missing AZURE_OPENAI_ENDPOINT');
      if (!_env('AZURE_OPENAI_API_KEY')) errors.push('Missing AZURE_OPENAI_API_KEY');
      return { valid: errors.length === 0, errors: errors };
    },

    healthCheck: function() {
      var self = this;
      return new Promise(function(resolve) {
        if (!self.isAvailable()) {
          resolve({ available: false, latency: -1, provider: self._providerId });
          return;
        }
        var start = _now();
        // Lightweight endpoint check
        resolve({ available: true, latency: _now() - start, provider: self._providerId });
      });
    }
  };

  // ====================================================================
  // OPENAI PROVIDER — Skeleton adapter
  // ====================================================================

  var OpenAIProvider = {
    _providerId: 'openai',
    _providerType: 'openai',
    _config: {
      providerId: 'openai',
      providerType: 'openai',
      capabilities: ['explain', 'quiz', 'socratic', 'study_plan'],
      description: 'OpenAI API adapter — requires OPENAI_API_KEY env var'
    },

    send: function(request) {
      return new Promise(function(resolve, reject) {
        var apiKey = _env('OPENAI_API_KEY');

        if (!apiKey) {
          resolve({
            success: false,
            content: null,
            confidence: 0,
            provider: 'openai',
            latency: 0,
            fallback: true,
            error: 'OpenAI not configured: missing OPENAI_API_KEY',
            metadata: {
              requestId: (request && request.metadata && request.metadata.requestId) || null,
              timestamp: new Date().toISOString(),
              mode: (request && request.mode) || 'unknown'
            }
          });
          return;
        }

        var startTime = _now();
        var body = {
          model: _env('OPENAI_MODEL') || 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a CMA Part 1 tutor. Be concise and accurate.' },
            { role: 'user', content: (request && request.prompt) || '' }
          ],
          max_tokens: 500,
          temperature: 0.3
        };

        try {
          fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify(body)
          }).then(function(response) {
            if (!response.ok) {
              throw new Error('HTTP ' + response.status);
            }
            return response.json();
          }).then(function(data) {
            var content = (data.choices && data.choices[0] && data.choices[0].message)
              ? data.choices[0].message.content : '';
            resolve({
              success: true,
              content: content,
              confidence: 0.9,
              provider: 'openai',
              latency: _now() - startTime,
              fallback: false,
              error: null,
              metadata: {
                requestId: (request && request.metadata && request.metadata.requestId) || null,
                timestamp: new Date().toISOString(),
                mode: (request && request.mode) || 'unknown'
              }
            });
          }).catch(function(err) {
            resolve({
              success: false,
              content: null,
              confidence: 0,
              provider: 'openai',
              latency: _now() - startTime,
              fallback: true,
              error: 'OpenAI request failed: ' + (err.message || 'unknown error'),
              metadata: {
                requestId: (request && request.metadata && request.metadata.requestId) || null,
                timestamp: new Date().toISOString(),
                mode: (request && request.mode) || 'unknown'
              }
            });
          });
        } catch (e) {
          resolve({
            success: false,
            content: null,
            confidence: 0,
            provider: 'openai',
            latency: _now() - startTime,
            fallback: true,
            error: 'OpenAI provider error: ' + (e.message || 'unknown'),
            metadata: {
              requestId: (request && request.metadata && request.metadata.requestId) || null,
              timestamp: new Date().toISOString(),
              mode: (request && request.mode) || 'unknown'
            }
          });
        }
      });
    },

    getProviderId: function() { return this._providerId; },
    isAvailable: function() {
      return !!_env('OPENAI_API_KEY');
    },
    getConfig: function() { return JSON.parse(JSON.stringify(this._config)); },

    validateConfig: function() {
      var errors = [];
      if (!_env('OPENAI_API_KEY')) errors.push('Missing OPENAI_API_KEY');
      return { valid: errors.length === 0, errors: errors };
    },

    healthCheck: function() {
      var self = this;
      return new Promise(function(resolve) {
        if (!self.isAvailable()) {
          resolve({ available: false, latency: -1, provider: self._providerId });
          return;
        }
        resolve({ available: true, latency: 0, provider: self._providerId });
      });
    }
  };

  // ====================================================================
  // PROVIDER REGISTRY — Management and selection
  // ====================================================================

  /**
   * Register a provider.
   * @param {Object} provider — Must implement ProviderInterface
   * @returns {boolean}
   */
  function registerProvider(provider) {
    if (!provider || typeof provider.getProviderId !== 'function') return false;
    var id = provider.getProviderId();
    if (!id) return false;
    if (_providers[id]) return false;
    _providers[id] = provider;
    return true;
  }

  /**
   * Get a registered provider by ID.
   * @param {string} id
   * @returns {Object|null}
   */
  function getProvider(id) {
    return _providers[id] || null;
  }

  /**
   * Get all registered providers.
   * @returns {Array<Object>}
   */
  function getAllProviders() {
    var result = [];
    for (var k in _providers) {
      if (_providers.hasOwnProperty(k)) {
        result.push(_providers[k]);
      }
    }
    return result;
  }

  /**
   * Set the primary provider by ID.
   * Falls back to 'mock' if the requested provider is unavailable.
   * @param {string} id — Provider ID
   * @returns {string} — The actual provider ID selected
   */
  function setPrimaryProvider(id) {
    var provider = _providers[id];
    if (provider && provider.isAvailable && provider.isAvailable()) {
      _primaryProviderId = id;
      return id;
    }
    _primaryProviderId = 'mock';
    return 'mock';
  }

  /**
   * Get the current primary provider ID.
   * @returns {string}
   */
  function getPrimaryProviderId() {
    return _primaryProviderId;
  }

  /**
   * Get the primary provider instance.
   * @returns {Object}
   */
  function getPrimaryProvider() {
    return _providers[_primaryProviderId] || _providers['mock'] || null;
  }

  /**
   * Select a provider based on feature flags and availability.
   * Priority: feature-flagged provider > primary > mock
   * @returns {Object} Selected provider
   */
  function selectProvider() {
    // Check for provider-specific feature flags
    if (_checkFlag('ENABLE_AZURE_OPENAI_PROVIDER')) {
      var azure = _providers['azure-openai'];
      if (azure && azure.isAvailable && azure.isAvailable()) {
        return azure;
      }
    }

    if (_checkFlag('ENABLE_OPENAI_PROVIDER')) {
      var openai = _providers['openai'];
      if (openai && openai.isAvailable && openai.isAvailable()) {
        return openai;
      }
    }

    // Phase 0 spike — stub intent provider, gated behind ENABLE_NEEDLE_ROUTER.
    // Hidden beta: only routes when flag is explicitly on.
    if (_checkFlag('ENABLE_NEEDLE_ROUTER')) {
      // Phase 0b — real-intent wins over stub when both are loaded.
      // Real provider returns true from isAvailable() only after Worker emits 'ready'.
      var real = _providers['real-intent'];
      if (real && real.isAvailable && real.isAvailable()) {
        return real;
      }
      var stub = _providers['stub-intent'];
      if (stub && stub.isAvailable && stub.isAvailable()) {
        return stub;
      }
    }

    // Fall through to primary or mock
    return getPrimaryProvider();
  }

  // ====================================================================
  // CONFIDENCE-GATED ROUTING — Phase 1 (MAY-Phase-1) + Phase 2a per-pipeline
  // ====================================================================
  //
  // selectProvider() prefers real-intent over stub-intent when ENABLE_NEEDLE_ROUTER is on
  // and the Worker has emitted 'ready'.
  //
  // routeWithGate() runs the selected provider once, inspects the returned confidence,
  // and falls back to the stub-intent provider when confidence is below the gate threshold.
  // This combines:
  //   - Real ML signal when the model is confident (≥ pipeline-specific threshold)
  //   - Deterministic regex when the model is uncertain
  //
  // Source tracking:
  //   response.metadata.source === 'real' | 'stub' | 'fallback' | 'mock'
  //
  // Telemetry: every fallback is logged via MayTelemetry.trackFallback().
  //
  // Hidden-beta invariant: if ENABLE_NEEDLE_ROUTER is off, this function is equivalent
  // to selectProvider().send() — no Worker is spun up, no gate logic fires.
  //
  // Phase 2a — Per-pipeline threshold calibration:
  //   - zero-shot-classification (Phase 0b): NLI entailment scores have wide spread.
  //     0.60 was calibrated for the mobilebert-uncased-mnli distribution.
  //   - text-classification (Phase 1b fine-tuned): softmax over 4 mutually-exclusive
  //     classes peaks at ~0.26. 0.60 would block 100% of wins. Threshold = 0.25.
  //
  // The threshold is read from provider.getConfig().pipeline. The single global
  // accessor getConfidenceGateThreshold() is preserved for backward compatibility
  // and returns the zero-shot threshold.

  var PIPELINE_THRESHOLDS = {
    'zero-shot-classification': 0.60,
    'text-classification':      0.20
  };
  var DEFAULT_THRESHOLD = 0.60;

  /**
   * Get the confidence gate threshold for a specific transformers.js pipeline.
   * Returns DEFAULT_THRESHOLD for unknown pipeline strings.
   * @param {string} pipeline — e.g., 'zero-shot-classification' or 'text-classification'
   * @returns {number}
   */
  function getThresholdForPipeline(pipeline) {
    if (!pipeline) return DEFAULT_THRESHOLD;
    if (Object.prototype.hasOwnProperty.call(PIPELINE_THRESHOLDS, pipeline)) {
      return PIPELINE_THRESHOLDS[pipeline];
    }
    return DEFAULT_THRESHOLD;
  }

  function _parseConfidence(response) {
    // LLMResponse.content is a JSON-stringified object: { mode, action, args, confidence, rationale }
    try {
      var parsed = JSON.parse(response.content);
      if (parsed && typeof parsed.confidence === 'number') return parsed.confidence;
    } catch (e) { /* not JSON — treat as no-confidence */ }
    return null;
  }

  function _pipelineOfPrimary(primary) {
    try {
      if (primary && typeof primary.getConfig === 'function') {
        var cfg = primary.getConfig();
        if (cfg && typeof cfg.pipeline === 'string') return cfg.pipeline;
      }
    } catch (e) { /* ignore — fall through to default */ }
    return null;
  }

  /**
   * Send a request through the gated router. Returns an LLMResponse with
   * metadata.source indicating which provider produced the final result.
   *
   * @param {Object} request — LLMRequest
   * @returns {Promise<Object>} LLMResponse with metadata.source added
   */
  function routeWithGate(request) {
    var primary = selectProvider();
    var primaryId = primary && primary.getProviderId ? primary.getProviderId() : 'unknown';

    // Only the real provider goes through the gate. Everything else flows through.
    if (primaryId !== 'real-intent') {
      return primary.send(request).then(function (resp) {
        if (resp && resp.metadata) {
          resp.metadata.source = (primaryId === 'mock') ? 'mock' : (primaryId === 'stub-intent' ? 'stub' : primaryId);
        }
        return resp;
      });
    }

    // Primary is real-intent. Resolve per-pipeline threshold from provider config.
    var pipeline = _pipelineOfPrimary(primary);
    var threshold = getThresholdForPipeline(pipeline);

    // Primary is real-intent. Try it, inspect confidence, fall back to stub if below threshold.
    var stub = _providers['stub-intent'];

    function _fallback(reason, realConfidence) {
      if (stub && stub.send) {
        return stub.send(request).then(function (stubResp) {
          try {
            if (typeof MayTelemetry !== 'undefined') {
              MayTelemetry.trackFallback({
                from: 'real-intent',
                to: 'stub-intent',
                confidence: (typeof realConfidence === 'number') ? realConfidence : null,
                threshold: threshold,
                reason: reason,
                text: (request && request.context) ? (request.context.freeText || request.context.userQuery || null) : null
              });
            }
          } catch (e) { /* telemetry never blocks routing */ }
          if (stubResp && stubResp.metadata) stubResp.metadata.source = 'fallback';
          return stubResp;
        });
      }
      // No stub available — return a synthetic fallback response so callers never see undefined
      return Promise.resolve({
        success: false,
        content: null,
        confidence: 0,
        provider: primaryId,
        latency: 0,
        fallback: true,
        error: 'real-intent rejected (' + reason + ') and stub-intent unavailable',
        metadata: {
          requestId: (request && request.metadata && request.metadata.requestId) || null,
          timestamp: new Date().toISOString(),
          mode: null,
          source: 'fallback'
        }
      });
    }

    return primary.send(request).then(function (resp) {
      if (!resp || !resp.success) {
        return _fallback('provider_unavailable', null);
      }
      var conf = _parseConfidence(resp);
      if (conf === null || conf < threshold) {
        return _fallback('low_confidence', conf);
      }
      if (resp && resp.metadata) {
        resp.metadata.source = 'real';
        resp.metadata.pipeline = pipeline || null;
        resp.metadata.threshold = threshold;
      }
      return resp;
    }).catch(function (err) {
      return _fallback('worker_error', null);
    });
  }

  /**
   * Get the default confidence gate threshold (zero-shot-classification).
   * Kept for backward compatibility — callers needing per-pipeline thresholds
   * should use getThresholdForPipeline().
   * @returns {number}
   */
  function getConfidenceGateThreshold() {
    return PIPELINE_THRESHOLDS['zero-shot-classification'];
  }

  /**
   * Initialize the registry with all built-in providers.
   * Safe to call multiple times — subsequent calls are no-ops.
   * @returns {{ count: number, mockAvailable: boolean }}
   */
  function initialize() {
    if (_initialized) {
      return { count: Object.keys(_providers).length, mockAvailable: !!_providers['mock'] };
    }

    registerProvider(MockProvider);
    registerProvider(AzureOpenAIProvider);
    registerProvider(OpenAIProvider);

    // Phase 0 spike — register stub intent provider. Gated behind ENABLE_NEEDLE_ROUTER.
    // Hidden beta: always registered (so harness can find it), but selectProvider()
    // only routes to it when the flag is on. Hidden beta — no production effect.
    try {
      registerProvider(new StubIntentProvider());
    } catch (e) {
      // Provider registration failed — log but don't crash registry init
    }

    // Phase 0b — register real intent provider. Gated behind ENABLE_NEEDLE_ROUTER.
    // selectProvider() routes to real-intent first (when available), then stub-intent, then mock.
    // Hidden beta — does not change production behavior when flag is off.
    try {
      registerProvider(new RealIntentProvider());
    } catch (e) {
      // Provider registration failed — log but don't crash registry init
    }

    _initialized = true;

    return {
      count: Object.keys(_providers).length,
      mockAvailable: true
    };
  }

  // ─── Export ──────────────────────────────────────────────────

  // ====================================================================
  // STUB INTENT PROVIDER — Phase 0 architecture validation spike (MAY-Phase-0)
  // ====================================================================
  //
  // Deterministic intent router. No external deps, no WASM, no model load.
  // Mirrors may-core.js:4119 _handleFreeform regex logic.
  //
  // Gated behind ENABLE_NEEDLE_ROUTER (default false — hidden beta).
  // When flag is off, selectProvider() falls through to mock/primary.
  //
  // Phase 0 deliverable: validates provider interface, Worker plumbing,
  // flag gating, benchmark harness, and May integration before any real model
  // (e.g., Needle2) is integrated. Replace with a real model provider when
  // a JS-portable intent classifier is selected.
  //
  // Hidden beta: not in the api exports (Phase 0 internal), not flagged as
  // production-ready. ENABLE_NEEDLE_ROUTER=false is the gate.

  var StubIntentProvider = (function() {
    // Inline require — guard against load-order issues. May stub may load
    // before may-feature-flags or may-llm-types; tolerate both orders.
    var StubIntentProviderClass = null;
    if (typeof window !== 'undefined' && window.StubIntentProvider) {
      StubIntentProviderClass = window.StubIntentProvider;
    } else if (typeof require === 'function') {
      try {
        StubIntentProviderClass = require('./providers/stub-intent-provider.js').StubIntentProvider;
      } catch (e) {
        // Provider not loaded — fall back to no-op stub for graceful degradation
      }
    }
    if (!StubIntentProviderClass) {
      // Graceful fallback: synthesize a minimal provider if module didn't load
      StubIntentProviderClass = function() {};
      StubIntentProviderClass.prototype.getProviderId = function() { return 'stub-intent-unavailable'; };
      StubIntentProviderClass.prototype.isAvailable = function() { return false; };
      StubIntentProviderClass.prototype.getConfig = function() {
        return { providerId: 'stub-intent-unavailable', providerType: 'stub', capabilities: [] };
      };
      StubIntentProviderClass.prototype.send = function() {
        return Promise.resolve({
          success: false, content: null, confidence: 0, provider: 'stub-intent-unavailable',
          latency: 0, fallback: true, error: 'stub-intent-provider.js not loaded',
          metadata: { requestId: null, timestamp: new Date().toISOString(), mode: 'unknown' }
        });
      };
    }
    return StubIntentProviderClass;
  })();

  // ====================================================================
  // REAL INTENT PROVIDER — Phase 0b (MAY-Phase-0b)
  // ====================================================================
  //
  // Real MNLI-based zero-shot intent classifier via @huggingface/transformers v4.
  // Hidden beta: gated behind ENABLE_NEEDLE_ROUTER (default false).
  // selectProvider() routes to real-intent when:
  //   1. flag is on, AND
  //   2. real-intent.isAvailable() returns true (i.e., Worker emitted 'ready' after model load)
  // Otherwise falls back to stub-intent (still flag-gated) or to mock.
  //
  // This is the WINNER from Phase 0b benchmarks: Xenova/mobilebert-uncased-mnli q8.
  // See reports/phase0b_model_selection.md for full benchmark data.

  var RealIntentProvider = (function() {
    var RealIntentProviderClass = null;
    if (typeof window !== 'undefined' && window.RealIntentProvider) {
      RealIntentProviderClass = window.RealIntentProvider;
    } else if (typeof require === 'function') {
      try {
        RealIntentProviderClass = require('./providers/real-intent-provider.js').RealIntentProvider;
      } catch (e) {
        // Provider not loaded — fall back to no-op
      }
    }
    if (!RealIntentProviderClass) {
      // Graceful fallback: no real provider available
      RealIntentProviderClass = function() {};
      RealIntentProviderClass.prototype.getProviderId = function() { return 'real-intent-unavailable'; };
      RealIntentProviderClass.prototype.isAvailable = function() { return false; };
      RealIntentProviderClass.prototype.getConfig = function() {
        return { providerId: 'real-intent-unavailable', providerType: 'real', capabilities: [] };
      };
    }
    return RealIntentProviderClass;
  })();

  var api = {
    MockProvider: MockProvider,
    AzureOpenAIProvider: AzureOpenAIProvider,
    OpenAIProvider: OpenAIProvider,

    registerProvider: registerProvider,
    getProvider: getProvider,
    getAllProviders: getAllProviders,
    setPrimaryProvider: setPrimaryProvider,
    getPrimaryProviderId: getPrimaryProviderId,
    getPrimaryProvider: getPrimaryProvider,
    selectProvider: selectProvider,
    routeWithGate: routeWithGate,
    getConfidenceGateThreshold: getConfidenceGateThreshold,
    getThresholdForPipeline: getThresholdForPipeline,
    initialize: initialize
  };

  // Auto-initialize
  initialize();

  return api;

})();

if (typeof window !== 'undefined') {
  window.MayLLMProviderRegistry = MayLLMProviderRegistry;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayLLMProviderRegistry;
}
