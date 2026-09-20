/**
 * P2DecisionAnalyst — P2 Section C (Decision Analysis) agent.
 * 
 * Identifies sunk-cost errors, constraint misidentification, relevant-cost
 * mistakes, opportunity-cost omissions. Worker-mandatory, hidden beta,
 * feature-flag gated.
 * 
 * Session: P2-Phase2
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 */
'use strict';

const P2DecisionAnalyst = (function() {
    'use strict';

// ─── Decision Error Pattern Table ──────────────────────────────
// Each entry: { matcher: RegExp, errorType: string, confidence: number, dlTag?: string }
var ERROR_PATTERN_TABLE = [
    // Sunk cost errors
    { matcher: /\bsunk.*cost\b/i, errorType: 'sunk_cost_included', confidence: 0.90, dlTag: 'DL-008' },
    { matcher: /\bopportunity.*cost\b/i, errorType: 'opportunity_cost_omitted', confidence: 0.85, dlTag: 'DL-010' },
    
    // Constraint misidentification
    { matcher: /\bconstraint\b|\bbottleneck\b|\blimiting\b/i, errorType: 'constraint_misidentified', confidence: 0.85 },
    { matcher: /\bshadow.*price\b/i, errorType: 'shadow_price_missed', confidence: 0.80 },
    { matcher: /\bshadow.*price\b/i, errorType: 'shadow_price_missed', confidence: 0.80 },
    
    // Relevant cost errors
    { matcher: /\brelevant.*cost\b|\bdifferential\b/i, errorType: 'irrelevant_cost_included', confidence: 0.85 },
    { matcher: /\bavoidable.*cost\b|\bunavoidable.*cost\b/i, errorType: 'avoidable_cost_error', confidence: 0.80 },
    
    // Special order / pricing decisions
    { matcher: /\bspecial.*order\b/i, errorType: 'special_order_pricing', confidence: 0.80 },
    { matcher: /\bmake.*buy\b/i, errorType: 'make_or_buy', confidence: 0.80 },
    { matcher: /\boutsource\b|\boutsourcing\b/i, errorType: 'outsourcing_decision', confidence: 0.80 },
    
    // Product line decisions
    { matcher: /\bproduct.*line\b|\bsegment.*elimination\b/i, errorType: 'product_line_decision', confidence: 0.80 },
    { matcher: /\bdrop.*product\b|\bdiscontinue\b/i, errorType: 'discontinue_decision', confidence: 0.80 },
    
    // Pricing decisions
    { matcher: /\btarget.*cost\b/i, errorType: 'target_costing', confidence: 0.85 },
    { matcher: /\bcost.*plus.*pricing\b/i, errorType: 'cost_plus_pricing', confidence: 0.80 },
    { matcher: /\btarget.*pricing\b/i, errorType: 'target_pricing', confidence: 0.80 },
    
    // Transfer pricing
    { matcher: /\btransfer.*pricing\b/i, errorType: 'transfer_pricing', confidence: 0.85 },
    { matcher: /\bdual.*pricing\b/i, errorType: 'dual_pricing', confidence: 0.80 },
];

// ─── Classification Function ───────────────────────────────────
/**
 * Classify decision error type from question context.
 * @param {Object} input - { stem, choices, explanationWrong, topic }
 * @returns {Object} { errorType, confidence, rationale, dlTag }
 */
function classifyError(input) {
    var text = [
        input.stem || '',
        input.topic || '',
        JSON.stringify(input.choices || {}),
        input.explanationWrong || ''
    ].join(' ').toLowerCase();

    var best = { errorType: 'unknown', confidence: 0, rationale: '', dlTag: null };
    for (var i = 0; i < ERROR_PATTERN_TABLE.length; i++) {
        var entry = ERROR_PATTERN_TABLE[i];
        if (entry.matcher.test(text)) {
            if (entry.confidence > best.confidence) {
                best = {
                    errorType: entry.errorType,
                    confidence: entry.confidence,
                    rationale: 'Detected ' + entry.errorType + ' pattern in P2 Section C content.',
                    dlTag: entry.dlTag || null
                };
            }
        }
    }
    return best;
}

// ─── Provider Class ──────────────────────────────────────────
function P2DecisionAnalystProvider() {}

P2DecisionAnalystProvider.prototype.isAvailable = function() {
    try {
        return typeof MayFeatureFlags !== 'undefined' &&
               MayFeatureFlags.isEnabled('ENABLE_P2_DECISION_ANALYST');
    } catch (e) { return false; }
};

P2DecisionAnalystProvider.prototype.getConfig = function() {
    return {
        name: 'P2DecisionAnalyst',
        version: '1.0.0',
        domain: 'P2 Section C - Decision Analysis',
        capabilities: ['sunk_cost_detection', 'constraint_identification', 'relevant_cost_validation']
    };
};

P2DecisionAnalystProvider.prototype.send = function(input) {
    return classifyError(input);
};

// ─── Export ──────────────────────────────────────────────────
return {
    classifyError: classifyError,
    P2DecisionAnalystProvider: P2DecisionAnalystProvider
};

})();

if (typeof window !== 'undefined') {
    window.P2DecisionAnalystClassify = P2DecisionAnalyst.classifyError;
    window.P2DecisionAnalystProvider = P2DecisionAnalyst.P2DecisionAnalystProvider;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = P2DecisionAnalyst;
}