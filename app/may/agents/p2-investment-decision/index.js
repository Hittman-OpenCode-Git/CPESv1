/**
 * P2InvestmentDecision — P2 Section E (Investment Decisions) agent.
 * 
 * Validates NPV/IRR mechanics, cash-flow timing, discount-rate matching,
 * reinvestment assumptions. Worker-mandatory, hidden beta, feature-flag gated.
 * 
 * Session: P2-Phase2
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 */
'use strict';

const P2InvestmentDecision = (function() {
    'use strict';

// ─── Decision Pattern Table ───────────────────────────────────
// Each entry: { matcher: RegExp, decisionType: string, confidence: number }
var DECISION_PATTERN_TABLE = [
    // Core decision types
    { matcher: /\bnpv\b/i, decisionType: 'npv', confidence: 0.90 },
    { matcher: /\birre\b|\binternal rate\b/i, decisionType: 'irr', confidence: 0.90 },
    { matcher: /\bpayback\b/i, decisionType: 'payback', confidence: 0.85 },
    { matcher: /\bprofitability.*index\b|\bprofitability.*ratio\b/i, decisionType: 'pi', confidence: 0.85 },
    
    // Discount rate issues
    { matcher: /\bwacc\b/i, decisionType: 'wacc_mismatch', confidence: 0.80 },
    { matcher: /\bcost.*of.*capital\b/i, decisionType: 'cost_of_capital', confidence: 0.80 },
    { matcher: /\bdiscount.*rate\b/i, decisionType: 'discount_rate', confidence: 0.85 },
    
    // Cash flow timing issues
    { matcher: /\bterminal.*value\b/i, decisionType: 'terminal_value', confidence: 0.80 },
    { matcher: /\breinvestment\b/i, decisionType: 'reinvestment_assumption', confidence: 0.85 },
    { matcher: /\bincremental.*cash.*flow\b/i, decisionType: 'incremental_cash_flow', confidence: 0.85 },
    { matcher: /\bsunk.*cost\b/i, decisionType: 'sunk_cost', confidence: 0.85 },
    { matcher: /\bopportunity.*cost\b/i, decisionType: 'opportunity_cost', confidence: 0.85 },
    
    // Multiple IRR
    { matcher: /\bmultiple.*irr\b|\bnon.*conventional/i, decisionType: 'multiple_irr', confidence: 0.85 },
    
    // Capital rationing
    { matcher: /\bcapital.*rationing\b/i, decisionType: 'capital_rationing', confidence: 0.85 },
    { matcher: /\bprofitability.*index\b/i, decisionType: 'profitability_index', confidence: 0.85 },
];

// ─── Classification Function ───────────────────────────────────
/**
 * Classify decision type from question context.
 * @param {Object} input - { stem, choices, explanationWrong, topic }
 * @returns {Object} { decisionType, confidence, rationale }
 */
function classifyDecision(input) {
    var text = [
        input.stem || '',
        input.topic || '',
        JSON.stringify(input.choices || {}),
        input.explanationWrong || ''
    ].join(' ').toLowerCase();

    var best = { decisionType: 'unknown', confidence: 0, rationale: '' };
    for (var i = 0; i < DECISION_PATTERN_TABLE.length; i++) {
        var entry = DECISION_PATTERN_TABLE[i];
        if (entry.matcher.test(text)) {
            if (entry.confidence > best.confidence) {
                best = {
                    decisionType: entry.decisionType,
                    confidence: entry.confidence,
                    rationale: 'Detected ' + entry.decisionType + ' pattern in P2 Section E content.',
                };
            }
        }
    }
    return best;
}

// ─── Provider Class ──────────────────────────────────────────
function P2InvestmentDecisionProvider() {}

P2InvestmentDecisionProvider.prototype.isAvailable = function() {
    try {
        return typeof MayFeatureFlags !== 'undefined' &&
               MayFeatureFlags.isEnabled('ENABLE_P2_INVESTMENT_AGENT');
    } catch (e) { return false; }
};

P2InvestmentDecisionProvider.prototype.getConfig = function() {
    return {
        name: 'P2InvestmentDecision',
        version: '1.0.0',
        domain: 'P2 Section E - Investment Decisions',
        capabilities: ['npv_analysis', 'irr_validation', 'cash_flow_timing', 'discount_rate_matching']
    };
};

P2InvestmentDecisionProvider.prototype.send = function(input) {
    return classifyDecision(input);
};

// ─── Export ──────────────────────────────────────────────────
return {
    classifyDecision: classifyDecision,
    P2InvestmentDecisionProvider: P2InvestmentDecisionProvider
};

})();

if (typeof window !== 'undefined') {
    window.P2InvestmentDecisionClassify = P2InvestmentDecision.classifyDecision;
    window.P2InvestmentDecisionProvider = P2InvestmentDecision.P2InvestmentDecisionProvider;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = P2InvestmentDecision;
}