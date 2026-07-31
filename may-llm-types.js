/**
 * may-llm-types.js — LLM type definitions, contracts, and validation.
 * 
 * Defines:
 *   - LLMRequest: standard request contract for all providers
 *   - LLMResponse: standard response contract from all providers
 *   - ProviderInterface: the contract every provider adapter must satisfy
 *   - Validation helpers for request/response conformity
 *   - CoachingModePromptTemplate: mode-specific prompt construction
 * 
 * No runtime behavior — this is a pure types/contract module.
 * No network access. No credentials. No secrets.
 * 
 * Session: MAY-003 (LLM Adapter Layer)
 * Governance: Light Lane (helper utility — no pack/case/content impact)
 */

const MayLLMTypes = (function() {
  'use strict';

  // ─── LLM Request Contract ─────────────────────────────────────

  /**
   * LLMRequest — What the adapter sends to a provider.
   * 
   * @typedef {Object} LLMRequest
   * @property {string} mode — Coaching mode: 'EXPLAIN'|'QUIZ'|'SOCRATIC'|'STUDY_PLAN'
   * @property {Object} context — Full MayContext (question, learner, session, app)
   * @property {string} prompt — Constructed prompt text for the provider
   * @property {Object} metadata — Request metadata { requestId, timestamp, featureFlags }
   */

  var REQUEST_SCHEMA = {
    required: ['mode', 'context', 'prompt', 'metadata'],
    types: {
      mode: 'string',
      context: 'object',
      prompt: 'string',
      metadata: 'object'
    },
    validModes: ['EXPLAIN', 'QUIZ', 'SOCRATIC', 'STUDY_PLAN']
  };

  /**
   * LLMResponse — What the adapter returns to coaching mode handlers.
   * 
   * @typedef {Object} LLMResponse
   * @property {boolean} success — Did the provider return a valid response?
   * @property {string|null} content — Text content from the provider (null on failure)
   * @property {number} confidence — Provider-reported or adapter-inferred confidence (0–1)
   * @property {string} provider — Provider ID that served this request
   * @property {number} latency — Round-trip time in milliseconds
   * @property {boolean} fallback — True if rule-based fallback was used
   * @property {string|null} error — Error description if failed
   * @property {Object} metadata — Response metadata { requestId, timestamp, mode }
   */

  var RESPONSE_SCHEMA = {
    required: ['success', 'content', 'confidence', 'provider', 'latency', 'fallback'],
    types: {
      success: 'boolean',
      content: ['string', 'null'],
      confidence: 'number',
      provider: 'string',
      latency: 'number',
      fallback: 'boolean'
    }
  };

  // ─── Provider Interface Contract ──────────────────────────────

  /**
   * Every provider adapter MUST implement this interface.
   * 
   * Required methods:
   *   - send(request: LLMRequest): Promise<LLMResponse>
   *   - getProviderId(): string
   *   - isAvailable(): boolean
   *   - getConfig(): { providerId: string, providerType: string, capabilities: Array<string> }
   * 
   * Optional methods:
   *   - validateConfig(): { valid: boolean, errors: Array<string> }
   *   - healthCheck(): Promise<{ available: boolean, latency: number }>
   */

  var PROVIDER_INTERFACE = {
    requiredMethods: ['send', 'getProviderId', 'isAvailable', 'getConfig'],
    optionalMethods: ['validateConfig', 'healthCheck']
  };

  // ─── Coaching Mode Prompt Templates ───────────────────────────

  /**
   * Standard prompt templates for each coaching mode.
   * Each returns a constructed prompt string from context.
   */
  var PROMPT_TEMPLATES = {};

  PROMPT_TEMPLATES['EXPLAIN'] = function(context) {
    var q = (context && context.question) || {};
    var stem = q.stem || '';
    var topic = q.topic || '';
    var correct = q.correctChoice || '';
    return [
      'You are a CMA Part 1 tutor. Explain the following question concept.',
      'Topic: ' + (topic || 'Accounting'),
      'Question: ' + (stem || 'N/A'),
      'Correct answer: ' + (correct || 'N/A'),
      '',
      'Provide a clear, accurate explanation suitable for a CMA candidate.',
      'Reference the governing accounting standard or framework where applicable.',
      'Keep the explanation concise and educational.'
    ].join('\n');
  };

  PROMPT_TEMPLATES['QUIZ'] = function(context) {
    var l = (context && context.learner) || {};
    var weakClusters = (l.weaknessClusters && l.weaknessClusters.persistentWeak) || [];
    var weakTopic = weakClusters.length > 0 ? weakClusters[0].topic : '';
    return [
      'You are a CMA Part 1 tutor. Generate quiz guidance for a learner.',
      'The learner needs practice in: ' + (weakTopic || 'general CMA Part 1 topics'),
      'Overall accuracy: ' + ((l.overallAccuracy || 0) + '%'),
      '',
      'Suggest a focused quiz domain and the number of practice questions.',
      'Provide a brief reason for the recommendation.',
      'Output a structured recommendation.'
    ].join('\n');
  };

  PROMPT_TEMPLATES['SOCRATIC'] = function(context) {
    var q = (context && context.question) || {};
    return [
      'You are a CMA Part 1 tutor using the Socratic method.',
      'Topic: ' + (q.topic || 'Accounting'),
      'Question: ' + (q.stem || ''),
      '',
      'Generate a series of 3-5 leading questions that guide the learner',
      'to discover the answer themselves. Start with a broad conceptual',
      'question, then narrow toward the specific principle.',
      'Do NOT give the answer directly.'
    ].join('\n');
  };

  PROMPT_TEMPLATES['STUDY_PLAN'] = function(context) {
    var l = (context && context.learner) || {};
    var readiness = (l.readinessBands && Object.keys(l.readinessBands).length > 0)
      ? l.readinessBands : {};
    return [
      'You are a CMA Part 1 study coach. Generate a personalized study plan.',
      'Learner profile:',
      '  Overall accuracy: ' + ((l.overallAccuracy || 0) + '%'),
      '  Topics covered: ' + (Object.keys(l.topicPerformance || {}).length || 0),
      '  Readiness bands: ' + JSON.stringify(readiness),
      '',
      'Recommend 2-3 focus areas with specific actions.',
      'Include estimated time commitment.',
      'Prioritize topics based on readiness bands and CMA exam weights.'
    ].join('\n');
  };

  // ─── Validation Helpers ───────────────────────────────────────

  /**
   * Validate an LLMRequest against the schema.
   * @param {Object} request
   * @returns {{ valid: boolean, errors: Array<string> }}
   */
  function validateRequest(request) {
    var errors = [];

    if (!request) {
      errors.push('request is null or undefined');
      return { valid: false, errors: errors };
    }

    REQUEST_SCHEMA.required.forEach(function(field) {
      if (request[field] === undefined || request[field] === null) {
        errors.push('missing required field: ' + field);
      }
    });

    if (REQUEST_SCHEMA.validModes.indexOf(request.mode) === -1) {
      errors.push('invalid mode: ' + request.mode + ' (valid: ' + REQUEST_SCHEMA.validModes.join(', ') + ')');
    }

    if (request.prompt !== undefined && typeof request.prompt !== 'string') {
      errors.push('prompt must be a string');
    }

    if (request.metadata !== undefined && typeof request.metadata !== 'object') {
      errors.push('metadata must be an object');
    }

    return { valid: errors.length === 0, errors: errors };
  }

  /**
   * Validate an LLMResponse against the schema.
   * @param {Object} response
   * @returns {{ valid: boolean, errors: Array<string> }}
   */
  function validateResponse(response) {
    var errors = [];

    if (!response) {
      errors.push('response is null or undefined');
      return { valid: false, errors: errors };
    }

    RESPONSE_SCHEMA.required.forEach(function(field) {
      if (response[field] === undefined) {
        errors.push('missing required field: ' + field);
      }
    });

    if (response.confidence !== undefined &&
        (typeof response.confidence !== 'number' || response.confidence < 0 || response.confidence > 1)) {
      errors.push('confidence must be a number in [0, 1]');
    }

    if (response.latency !== undefined && typeof response.latency !== 'number') {
      errors.push('latency must be a number');
    }

    if (response.fallback !== undefined && typeof response.fallback !== 'boolean') {
      errors.push('fallback must be a boolean');
    }

    return { valid: errors.length === 0, errors: errors };
  }

  /**
   * Validate that an object satisfies the ProviderInterface.
   * @param {Object} provider
   * @returns {{ valid: boolean, errors: Array<string> }}
   */
  function validateProvider(provider) {
    var errors = [];

    if (!provider) {
      errors.push('provider is null or undefined');
      return { valid: false, errors: errors };
    }

    PROVIDER_INTERFACE.requiredMethods.forEach(function(method) {
      if (typeof provider[method] !== 'function') {
        errors.push('missing required method: ' + method);
      }
    });

    return { valid: errors.length === 0, errors: errors };
  }

  /**
   * Build a prompt for the given coaching mode.
   * @param {string} mode — Coaching mode
   * @param {Object} context — MayContext
   * @returns {string} Constructed prompt or empty string
   */
  function buildPrompt(mode, context) {
    var templateFn = PROMPT_TEMPLATES[mode];
    if (typeof templateFn === 'function') {
      return templateFn(context);
    }
    return '';
  }

  return {
    REQUEST_SCHEMA: REQUEST_SCHEMA,
    RESPONSE_SCHEMA: RESPONSE_SCHEMA,
    PROVIDER_INTERFACE: PROVIDER_INTERFACE,
    PROMPT_TEMPLATES: PROMPT_TEMPLATES,

    validateRequest: validateRequest,
    validateResponse: validateResponse,
    validateProvider: validateProvider,
    buildPrompt: buildPrompt,

    VALID_MODES: REQUEST_SCHEMA.validModes.slice()
  };

})();

if (typeof window !== 'undefined') {
  window.MayLLMTypes = MayLLMTypes;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayLLMTypes;
}
