/**
 * formula-retriever.worker.js — Web Worker host.
 *
 * Phase 2b. Deterministic JS lookup (no model load). Future ONNX swap can
 * replace the inline FORMULA_TABLE with an inference call.
 */

'use strict';

var FORMULA_TABLE = [
  { ascPattern: /\bASC\s*205\b/i, formula: 'Revenue = Σ (Transaction Price × Allocation)', asc: 'ASC 606 (legacy 205)', inputs: ['transaction_price','allocations','performance_obligations'], topic: 'revenue_recognition' },
  { ascPattern: /\bASC\s*606\b/i, formula: 'Revenue = Price × Step Progress; Recognize via 5-Step Model', asc: 'ASC 606', inputs: ['price','po_allocation','progress'], topic: 'revenue_recognition' },
  { ascPattern: /\bASC\s*842\b/i, formula: 'ROU Asset = PV (Lease Payments + GU) at implicit rate', asc: 'ASC 842', inputs: ['lease_payments','guaranteed_residual','discount_rate'], topic: 'leases' },
  { ascPattern: /\bASC\s*805\b/i, formula: 'Goodwill = Consideration Transferred − Net Assets Acquired', asc: 'ASC 805', inputs: ['consideration','identifiable_assets','liabilities_assumed'], topic: 'business_combinations' },
  { ascPattern: /\bASC\s*718\b/i, formula: 'Compensation Cost = FV at Grant × Service Period', asc: 'ASC 718', inputs: ['fair_value_grant','service_period','vesting_terms'], topic: 'stock_compensation' },
  { ascPattern: /\bNPV\b|\bpresent\s*value\b/i, formula: 'NPV = Σ CF_t / (1 + r)^t − Investment', asc: null, inputs: ['cash_flows','discount_rate','periods'], topic: 'capital_budgeting' },
  { ascPattern: /\bIRR\b/i, formula: 'IRR: NPV = 0 → Σ CF_t / (1 + IRR)^t = Investment', asc: null, inputs: ['cash_flows','initial_investment'], topic: 'capital_budgeting' },
  { ascPattern: /\bWACC\b/i, formula: 'WACC = (E/V)·Re + (D/V)·Rd·(1 − t)', asc: null, inputs: ['equity_weight','debt_weight','cost_equity','cost_debt','tax_rate'], topic: 'capital_structure' },
  { ascPattern: /\bEOQ\b/i, formula: 'EOQ = √(2·D·S / H)', asc: null, inputs: ['annual_demand','order_cost','holding_cost'], topic: 'inventory_management' },
  { ascPattern: /\bCVP\b/i, formula: 'CM = (Price − VC); BE Units = FC / CM', asc: null, inputs: ['fixed_costs','price','variable_cost_per_unit'], topic: 'cost_volume_profit' },
  // Promotion Phase 1: Part 2 identities (mirrors index.js; worker-mandatory path).
  { ascPattern: /\bdu\s*pont\b|\broe\s*decomposition\b/i, formula: 'ROE = Net Margin × Asset Turnover × Equity Multiplier', asc: null, inputs: ['net_margin','asset_turnover','equity_multiplier'], topic: 'dupont_roe' },
  { ascPattern: /\bcapm\b|\bcapital\s*asset\s*pricing\b/i, formula: 'Re = Rf + β(Rm − Rf)', asc: null, inputs: ['risk_free_rate','beta','market_return'], topic: 'capm' },
  { ascPattern: /\bsustainable\s*growth\b/i, formula: 'g = ROE × Retention Ratio', asc: null, inputs: ['roe','retention_ratio'], topic: 'sustainable_growth' },
  { ascPattern: /\bdegree\s*of\s*(operating\s*|financial\s*)?leverage\b/i, formula: 'DOL = Contribution Margin / Operating Income; DFL = EBIT / EBT', asc: null, inputs: ['contribution_margin','operating_income','ebit','ebt'], topic: 'leverage' },
  { ascPattern: /\bcash\s*conversion\s*cycle\b/i, formula: 'CCC = DIO + DSO − DPO', asc: null, inputs: ['dio','dso','dpo'], topic: 'working_capital' },
  { ascPattern: /\bprofitability\s*index\b/i, formula: 'PI = PV of Future Cash Flows / Initial Investment', asc: null, inputs: ['pv_cash_flows','initial_investment'], topic: 'capital_budgeting' },
  { ascPattern: /\bgordon\b|\bdividend\s*discount\b/i, formula: 'Re = D1 / P0 + g', asc: null, inputs: ['next_dividend','current_price','growth_rate'], topic: 'cost_of_equity' },
  { ascPattern: /\bearnings\s*per\s*share\b/i, formula: 'EPS = (Net Income − Preferred Dividends) / Weighted-Avg Shares', asc: null, inputs: ['net_income','preferred_dividends','weighted_shares'], topic: 'eps' }
];

function retrieve(input) {
  var questionContext = (input && input.questionContext) ? String(input.questionContext) : '';
  var stem = (input && input.stem) ? String(input.stem) : '';
  var explanationCorrect = (input && input.explanationCorrect) ? String(input.explanationCorrect) : '';
  var haystack = (questionContext + ' ' + stem + ' ' + explanationCorrect).trim();
  if (!haystack) return null;
  for (var i = 0; i < FORMULA_TABLE.length; i++) {
    if (FORMULA_TABLE[i].ascPattern.test(haystack)) {
      return {
        formula: FORMULA_TABLE[i].formula,
        asc: FORMULA_TABLE[i].asc,
        inputs: FORMULA_TABLE[i].inputs,
        confidence: 0.8,
        rationale: 'worker_retrieve:' + FORMULA_TABLE[i].topic
      };
    }
  }
  return { formula: null, asc: null, inputs: [], confidence: 0.0, rationale: 'worker_no_match' };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = retrieve(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
  }
});
