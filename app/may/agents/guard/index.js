/**
 * Guard — Micro-Agent (Phase 2b+)
 *
 * Input: { draftResponse, citedBank, mode, qid? }
 * Output: { faithful: bool, citesBank: bool, overconfident: bool, block: bool, rationale }
 *
 * Post-filter for LLM-generated explanations (Phase 1b fine-tuned provider).
 *   - faithful:    draftResponse content matches a known-bank phrase/term
 *   - citesBank:   draftResponse explicitly references a bank item id or rule
 *   - overconfident: contains hedging-violating absolute terms (always/never)
 *                  AND lacks bank support — risk of false certainty
 *   - block:       overconfident AND uncited → return bank text instead
 *
 * The agent NEVER invents content. When block=true, the integration point
 * (may-llm-adapter.js) substitutes the deterministic ExplanationCorrect
 * from may-context-builder.js:182.
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory. Hidden beta:
 * ENABLE_GUARD_AGENT flag defaults to false. When off, the adapter sends
 * the provider response unchanged.
 */
(function () {
  'use strict';

  // Words that signal overconfidence when paired with uncited content.
  var ABSOLUTE_TERMS = /\b(always|never|must|guaranteed|cannot fail|impossible)\b/i;

  // Bank-citation signals (regex snippets). A response is "cited" if it
  // contains any of these patterns.
  var CITATION_PATTERNS = [
    /\bASC\s*\d{3}/i,                   // ASC NNN reference
    /\bCOSO\b/i,                         // COSO framework
    /\bGAAP\b|\bIFRS\b/i,                // accounting standards
    /\bformula\b.*=/i,                   // explicit formula declaration
    /\bbecause\s+of\b.*\b(principle|rule|definition|standard)/i,
    /§\s*\d+/i,                          // regulation sections
    /\b[A-F]\.\d{3}/                     // CMA Pack Q-section reference (e.g., A.001)
  ];

  function _looksCited(text) {
    if (!text || typeof text !== 'string') return false;
    for (var i = 0; i < CITATION_PATTERNS.length; i++) {
      if (CITATION_PATTERNS[i].test(text)) return true;
    }
    return false;
  }

  function _bankPhrasesMatch(draft, bank) {
    // `bank` is an array of canonical phrases from the deterministic
    // ExplanationCorrect strings. If 2+ tokens from the bank appear in
    // the draft (case-insensitive substring), call it faithful.
    if (!draft || !bank || typeof bank !== 'object' || !bank.length) return true; // no bank provided — assume faithful
    var dl = String(draft).toLowerCase();
    var hits = 0;
    for (var i = 0; i < bank.length; i++) {
      var phrase = String(bank[i] || '').toLowerCase();
      if (phrase && phrase.length >= 6 && dl.indexOf(phrase) !== -1) hits++;
      if (hits >= 2) return true;
    }
    return false;
  }

  function guard(input) {
    var draft = (input && typeof input.draftResponse === 'string') ? input.draftResponse : '';
    var bank = (input && Array.isArray(input.citedBank)) ? input.citedBank : [];
    var mode = (input && input.mode) ? String(input.mode) : 'EXPLAIN';

    var cited = _looksCited(draft);
    var faithful = _bankPhrasesMatch(draft, bank);
    var overconfident = ABSOLUTE_TERMS.test(draft) && !cited;

    // Conservative rule: block ONLY if overconfident AND uncited AND long enough
    // to be a full sentence (≥40 chars). Very short fragments are unlikely
    // to cause a learner to memorize incorrect absolutes.
    var block = overconfident && !cited && faithful === false && draft.length >= 40;

    return {
      faithful: faithful,
      citesBank: cited,
      overconfident: overconfident,
      block: block,
      rationale: block ? 'guard:block:overconfident_uncited'
             : (overconfident ? 'guard:warn:overconfident_but_cited' : 'guard:pass')
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = guard(input);
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: 0.7,
      provider: 'guard',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: (input && input.mode) || null
      }
    });
  }

  function GuardProvider() {
    this._providerId = 'guard';
    this._providerType = 'guard';
    this._isAvailable = false;
  }

  GuardProvider.prototype.getProviderId = function () { return this._providerId; };

  GuardProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_GUARD_AGENT')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  GuardProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['faithfulness-check', 'citation-detection', 'overconfidence-block'],
      description: 'Guard (Phase 2b+, hidden beta) — post-filter for LLM explanations'
    };
  };

  GuardProvider.prototype.validateConfig = function () { return { valid: true, errors: [] }; };
  GuardProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };
  GuardProvider.prototype.initialize = function () { return Promise.resolve(); };
  GuardProvider.prototype.shutdown = function () { return Promise.resolve(); };
  GuardProvider.prototype.send = _send;

  GuardProvider.guard = guard;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GuardProvider: GuardProvider, guard: guard };
  }
  if (typeof window !== 'undefined') {
    window.GuardProvider = GuardProvider;
    window.GuardCheck = guard;
  }
})();