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

    // Fall through to primary or mock
    return getPrimaryProvider();
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

    _initialized = true;

    return {
      count: Object.keys(_providers).length,
      mockAvailable: true
    };
  }

  // ─── Export ──────────────────────────────────────────────────

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
