/**
 * Formula Retriever — Micro-Agent (Phase 2b)
 *
 * Input: { questionContext, stem, explanationCorrect }
 *   (invoked from mode-explain.js:88 _extractPrinciple(question))
 * Output: { formula, asc, inputs, confidence, rationale }
 *
 * Renders the canonical CMA Part 1 formula for known ASC topics. Augments
 * the existing `_extractPrinciple` regex (which finds ASC-NNN strings) with a
 * richer lookup: ASC → formula text + the input fields it requires.
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory. Hidden beta:
 * ENABLE_FORMULA_RETRIEVER flag defaults to false; when off, the existing
 * regex-based _extractPrinciple runs unaltered.
 *
 * 14 MB budget reserved for future ONNX model swap (e.g., sentence-tapas for
 * table-aware formula extraction). The current implementation is pure JS.
 */
(function () {
  'use strict';

  // ─── ASC / topic → formula lookup ───────────────────────────────────
  // Covers the most-tested ASC topics in CMA Part 1. The fallback regex
  // (ASC NNN) in mode-explain.js:_extractPrinciple stays as the safety net.
  var FORMULA_TABLE = [
    {
      ascPattern: /\bASC\s*205\b/i,
      formula: 'Revenue = Σ (Transaction Price × Allocation)',
      asc: 'ASC 606 (legacy 205)',
      inputs: ['transaction_price', 'allocations', 'performance_obligations'],
      topic: 'revenue_recognition'
    },
    {
      ascPattern: /\bASC\s*606\b/i,
      formula: 'Revenue = Price × Step Progress; Recognize via 5-Step Model',
      asc: 'ASC 606',
      inputs: ['price', 'po_allocation', 'progress'],
      topic: 'revenue_recognition'
    },
    {
      ascPattern: /\bASC\s*842\b/i,
      formula: 'ROU Asset = PV (Lease Payments + GU) at implicit rate',
      asc: 'ASC 842',
      inputs: ['lease_payments', 'guaranteed_residual', 'discount_rate'],
      topic: 'leases'
    },
    {
      ascPattern: /\bASC\s*805\b/i,
      formula: 'Goodwill = Consideration Transferred − Net Assets Acquired',
      asc: 'ASC 805',
      inputs: ['consideration', 'identifiable_assets', 'liabilities_assumed'],
      topic: 'business_combinations'
    },
    {
      ascPattern: /\bASC\s*718\b/i,
      formula: 'Compensation Cost = FV at Grant × Service Period',
      asc: 'ASC 718',
      inputs: ['fair_value_grant', 'service_period', 'vesting_terms'],
      topic: 'stock_compensation'
    },
    {
      ascPattern: /\bNPV\b|\bpresent\s*value\b/i,
      formula: 'NPV = Σ CF_t / (1 + r)^t − Investment',
      asc: null,
      inputs: ['cash_flows', 'discount_rate', 'periods'],
      topic: 'capital_budgeting'
    },
    {
      ascPattern: /\bIRR\b/i,
      formula: 'IRR: NPV = 0 → Σ CF_t / (1 + IRR)^t = Investment',
      asc: null,
      inputs: ['cash_flows', 'initial_investment'],
      topic: 'capital_budgeting'
    },
    {
      ascPattern: /\bWACC\b/i,
      formula: 'WACC = (E/V)·Re + (D/V)·Rd·(1 − t)',
      asc: null,
      inputs: ['equity_weight', 'debt_weight', 'cost_equity', 'cost_debt', 'tax_rate'],
      topic: 'capital_structure'
    },
    {
      ascPattern: /\bEOQ\b/i,
      formula: 'EOQ = √(2·D·S / H)',
      asc: null,
      inputs: ['annual_demand', 'order_cost', 'holding_cost'],
      topic: 'inventory_management'
    },
    {
      ascPattern: /\bCVP\b/i,
      formula: 'CM = (Price − VC); BE Units = FC / CM',
      asc: null,
      inputs: ['fixed_costs', 'price', 'variable_cost_per_unit'],
      topic: 'cost_volume_profit'
    }
  ];

  function retrieve(input) {
    var questionContext = (input && input.questionContext) ? String(input.questionContext) : '';
    var stem = (input && input.stem) ? String(input.stem) : '';
    var explanationCorrect = (input && input.explanationCorrect) ? String(input.explanationCorrect) : '';
    var haystack = (questionContext + ' ' + stem + ' ' + explanationCorrect).trim();
    if (!haystack) return null;

    // First pass: ASC / topic match
    for (var i = 0; i < FORMULA_TABLE.length; i++) {
      var entry = FORMULA_TABLE[i];
      if (entry.ascPattern.test(haystack)) {
        return {
          formula: entry.formula,
          asc: entry.asc,
          inputs: entry.inputs,
          confidence: 0.8,
          rationale: 'agent_pattern_match:' + entry.topic
        };
      }
    }
    // Fallback: if the haystack contains "formula:" or "=", hint but no formula
    if (/formula[:=]/i.test(haystack) || /[+\-*/]\s*[+\-*/]/.test(haystack)) {
      return {
        formula: null, asc: null, inputs: [],
        confidence: 0.3,
        rationale: 'agent_possible_formula_but_no_pattern'
      };
    }
    return {
      formula: null, asc: null, inputs: [],
      confidence: 0.0,
      rationale: 'agent_no_match'
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = retrieve(input);
    if (!result) {
      return Promise.resolve({
        success: false, content: null, confidence: 0, provider: 'formula-retriever',
        latency: 0, fallback: true, error: 'no input',
        metadata: { timestamp: new Date().toISOString(), mode: 'formula' }
      });
    }
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: result.confidence,
      provider: 'formula-retriever',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: 'formula'
      }
    });
  }

  function FormulaRetrieverProvider() {
    this._providerId = 'formula-retriever';
    this._providerType = 'formula-retriever';
    this._isAvailable = false;
  }

  FormulaRetrieverProvider.prototype.getProviderId = function () { return this._providerId; };

  FormulaRetrieverProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_FORMULA_RETRIEVER')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  FormulaRetrieverProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['formula-retrieval', 'asc-pattern-recognition', 'input-enumeration'],
      sizeBudgetMB: 14,
      description: 'Formula Retriever (Phase 2b, hidden beta) — ASC/topic → canonical formula'
    };
  };

  FormulaRetrieverProvider.prototype.validateConfig = function () {
    return { valid: true, errors: [] };
  };

  FormulaRetrieverProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };

  FormulaRetrieverProvider.prototype.initialize = function () { return Promise.resolve(); };
  FormulaRetrieverProvider.prototype.shutdown = function () { return Promise.resolve(); };
  FormulaRetrieverProvider.prototype.send = _send;

  FormulaRetrieverProvider.retrieve = retrieve;
  FormulaRetrieverProvider.FORMULA_TABLE = FORMULA_TABLE;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      FormulaRetrieverProvider: FormulaRetrieverProvider,
      retrieve: retrieve,
      FORMULA_TABLE: FORMULA_TABLE
    };
  }
  if (typeof window !== 'undefined') {
    window.FormulaRetrieverProvider = FormulaRetrieverProvider;
    window.FormulaRetrieverRetrieve = retrieve;
  }
})();
