/**
 * may-llm-adapter.js — Provider-agnostic LLM adapter layer for May coaching.
 * 
 * Architecture:
 *   MayCore → ContextBuilder → CoachingRouter → CoachingModeHandler → LLMAdapter → Provider
 * 
 * The adapter:
 *   1. Receives coaching requests from mode handlers
 *   2. Validates request contracts
 *   3. Selects provider via ProviderRegistry
 *   4. Builds prompts via LLMTypes
 *   5. Sends requests with timeout handling
 *   6. Returns standardized LLMResponse
 *   7. Falls back to rule-based behavior on any failure
 * 
 * All behavior is gated behind feature flags (default: false):
 *   - ENABLE_LLM: master switch for all LLM functionality
 *   - ENABLE_LLM_COACHING: enables LLM in coaching modes
 *   - ENABLE_LLM_SUMMARIES: enables LLM for session summaries
 * 
 * When any flag is disabled, send() returns { fallback: true } immediately.
 * 
 * Sessions: MAY-001 (flag infrastructure), MAY-003 (adapter + providers)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayLLMAdapter = (function() {
  'use strict';

  // ─── Configuration ─────────────────────────────────────────────

  var _config = {
    timeoutMs: 30000,           // 30-second default timeout
    maxRetries: 1,              // Single retry before fallback
    retryDelayMs: 500,
    stats: {
      totalRequests: 0,
      successCount: 0,
      failureCount: 0,
      fallbackCount: 0,
      totalLatencyMs: 0
    }
  };

  // ─── Private Helpers ───────────────────────────────────────────

  function _now() {
    return Date.now();
  }

  function _checkFlag(flagName) {
    try {
      if (typeof MayFeatureFlags !== 'undefined') {
        return MayFeatureFlags.isEnabled(flagName);
      }
    } catch (e) {}
    return false;
  }

  function _generateRequestId() {
    return 'llm-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
  }

  /**
   * Check if LLM is globally enabled.
   * Master flag ENABLE_LLM must be true AND a sub-flag (LLM_COACHING or LLM_SUMMARIES) must be true.
   */
  function _llmEnabled() {
    if (!_checkFlag('ENABLE_LLM')) return false;
    return _checkFlag('ENABLE_LLM_COACHING') || _checkFlag('ENABLE_LLM_SUMMARIES');
  }

  /**
   * Validate that the types module is available.
   */
  function _typesAvailable() {
    try {
      return typeof MayLLMTypes !== 'undefined' && typeof MayLLMTypes.validateRequest === 'function';
    } catch (e) {}
    return false;
  }

  /**
   * Validate that the provider registry is available.
   */
  function _registryAvailable() {
    try {
      return typeof MayLLMProviderRegistry !== 'undefined' &&
             typeof MayLLMProviderRegistry.selectProvider === 'function';
    } catch (e) {}
    return false;
  }

  /**
   * Build a prompt for the given mode.
   */
  function _buildPrompt(mode, context) {
    if (_typesAvailable()) {
      try {
        var prompt = MayLLMTypes.buildPrompt(mode, context);
        if (prompt && prompt.length > 0) return prompt;
      } catch (e) {}
    }
    // Fallback prompt
    return 'You are a CMA Part 1 tutor. Help with coaching mode: ' + mode + '.';
  }

  /**
   * Build fallback response (rule-based guidance).
   */
  function _fallbackResponse(mode, requestId, errorMsg) {
    _config.stats.fallbackCount++;
    return {
      success: false,
      content: null,
      confidence: 0,
      provider: 'none',
      latency: 0,
      fallback: true,
      error: errorMsg || 'LLM not available — using rule-based fallback',
      metadata: {
        requestId: requestId,
        timestamp: new Date().toISOString(),
        mode: mode
      }
    };
  }

  /**
   * Send with timeout wrapper.
   * If the provider's promise doesn't resolve within timeoutMs, reject.
   */
  function _sendWithTimeout(provider, request, timeoutMs) {
    return new Promise(function(resolve, reject) {
      var settled = false;
      var timer = setTimeout(function() {
        if (!settled) {
          settled = true;
          reject(new Error('Provider timeout after ' + timeoutMs + 'ms'));
        }
      }, timeoutMs);

      try {
        var promise = provider.send(request);
        if (promise && typeof promise.then === 'function') {
          promise.then(function(result) {
            if (!settled) {
              settled = true;
              clearTimeout(timer);
              resolve(result);
            }
          }).catch(function(err) {
            if (!settled) {
              settled = true;
              clearTimeout(timer);
              reject(err);
            }
          });
        } else {
          // Non-promise return — resolve immediately
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(promise);
          }
        }
      } catch (e) {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(e);
        }
      }
    });
  }

  // ─── Public API ────────────────────────────────────────────────

  /**
   * Send a coaching request to the LLM provider.
   * 
   * This is the main entry point. It:
   *   1. Checks feature flags (returns fallback if disabled)
   *   2. Validates the request
   *   3. Selects the provider
   *   4. Builds the prompt
   *   5. Sends with timeout
   *   6. Returns standardized response
   * 
   * @param {string} mode — Coaching mode: 'EXPLAIN'|'QUIZ'|'SOCRATIC'|'STUDY_PLAN'
   * @param {Object} context — MayContext from MayContextBuilder
   * @returns {Promise<LLMResponse>}
   */
  function send(mode, context) {
    var requestId = _generateRequestId();
    var startTime = _now();

    _config.stats.totalRequests++;

    // ── Gate 1: Master LLM flag ──
    if (!_llmEnabled()) {
      return Promise.resolve(_fallbackResponse(mode, requestId, 'LLM disabled by feature flags'));
    }

    // ── Gate 2: Provider infra available ──
    if (!_registryAvailable() || !_typesAvailable()) {
      return Promise.resolve(_fallbackResponse(mode, requestId, 'LLM infrastructure not loaded'));
    }

    // ── Gate 3: Validate request ──
    var requestObj = {
      mode: mode,
      context: context || {},
      prompt: '',
      metadata: {
        requestId: requestId,
        timestamp: new Date().toISOString(),
        featureFlags: {}
      }
    };

    try { requestObj.metadata.featureFlags = MayFeatureFlags.getAll(); } catch (e) {}

    var validation = MayLLMTypes.validateRequest(requestObj);
    if (!validation.valid) {
      return Promise.resolve(_fallbackResponse(mode, requestId,
        'Invalid request: ' + validation.errors.join('; ')));
    }

    // ── Build prompt ──
    requestObj.prompt = _buildPrompt(mode, context);

    // ── Select provider ──
    var provider;
    try {
      provider = MayLLMProviderRegistry.selectProvider();
    } catch (e) {
      return Promise.resolve(_fallbackResponse(mode, requestId,
        'Provider selection failed: ' + (e.message || 'unknown')));
    }

    if (!provider) {
      return Promise.resolve(_fallbackResponse(mode, requestId,
        'No provider available'));
    }

    // ── Send with timeout ──
    var self = this;
    return _sendWithTimeout(provider, requestObj, _config.timeoutMs)
      .then(function(response) {
        var elapsed = _now() - startTime;

        // Validate response contract
        if (response && response.success) {
          _config.stats.successCount++;
          _config.stats.totalLatencyMs += elapsed;

          // Ensure response has all required fields
          return {
            success: true,
            content: response.content || null,
            confidence: (typeof response.confidence === 'number') ? response.confidence : 0.8,
            provider: response.provider || provider.getProviderId(),
            latency: response.latency || elapsed,
            fallback: false,
            error: null,
            metadata: {
              requestId: requestId,
              timestamp: new Date().toISOString(),
              mode: mode
            }
          };
        }

        // Provider returned non-success — fallback
        _config.stats.failureCount++;
        return _fallbackResponse(mode, requestId,
          (response && response.error) || 'Provider returned unsuccessful response');
      })
      .catch(function(err) {
        _config.stats.failureCount++;
        return _fallbackResponse(mode, requestId,
          'Adapter error: ' + (err.message || 'unknown error'));
      });
  }

  /**
   * Check if the LLM adapter is available (flags + infrastructure).
   * @returns {boolean}
   */
  function isAvailable() {
    return _llmEnabled() && _registryAvailable() && _typesAvailable();
  }

  /**
   * Get adapter statistics.
   * @returns {{ totalRequests, successCount, failureCount, fallbackCount, totalLatencyMs, avgLatencyMs }}
   */
  function getStats() {
    var s = _config.stats;
    return {
      totalRequests: s.totalRequests,
      successCount: s.successCount,
      failureCount: s.failureCount,
      fallbackCount: s.fallbackCount,
      totalLatencyMs: s.totalLatencyMs,
      avgLatencyMs: s.successCount > 0 ? Math.round(s.totalLatencyMs / s.successCount) : 0
    };
  }

  /**
   * Reset statistics.
   */
  function resetStats() {
    _config.stats = {
      totalRequests: 0,
      successCount: 0,
      failureCount: 0,
      fallbackCount: 0,
      totalLatencyMs: 0
    };
  }

  /**
   * Update adapter configuration.
   * @param {Object} opts — { timeoutMs, maxRetries, retryDelayMs }
   */
  function configure(opts) {
    if (opts && typeof opts.timeoutMs === 'number' && opts.timeoutMs >= 1000) {
      _config.timeoutMs = opts.timeoutMs;
    }
    if (opts && typeof opts.maxRetries === 'number' && opts.maxRetries >= 0) {
      _config.maxRetries = opts.maxRetries;
    }
    if (opts && typeof opts.retryDelayMs === 'number' && opts.retryDelayMs >= 0) {
      _config.retryDelayMs = opts.retryDelayMs;
    }
  }

  /**
   * Get currently selected provider info.
   * @returns {{ providerId, providerType, available }}
   */
  function getProviderInfo() {
    if (!_registryAvailable()) {
      return { providerId: 'none', providerType: 'none', available: false };
    }
    try {
      var provider = MayLLMProviderRegistry.getPrimaryProvider();
      if (provider) {
        return {
          providerId: provider.getProviderId(),
          providerType: (provider.getConfig && provider.getConfig().providerType) || 'unknown',
          available: provider.isAvailable ? provider.isAvailable() : false
        };
      }
    } catch (e) {}
    return { providerId: 'unknown', providerType: 'unknown', available: false };
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    send: send,
    isAvailable: isAvailable,
    getStats: getStats,
    resetStats: resetStats,
    configure: configure,
    getProviderInfo: getProviderInfo,
    CONFIG: _config
  };

})();

if (typeof window !== 'undefined') {
  window.MayLLMAdapter = MayLLMAdapter;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayLLMAdapter;
}
