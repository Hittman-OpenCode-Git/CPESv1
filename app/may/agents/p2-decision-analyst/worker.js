/**
 * P2DecisionAnalyst Worker — Worker host for P2 Decision Analyst.
 * 
 * Runs classification in a background thread. Mirrors the main thread logic
 * but runs in a Web Worker context.
 * 
 * Session: P2-Phase2
 * Governance: Light Lane (worker host — no pack/case/content impact)
 */
'use strict';

// ─── Error Pattern Table ──────────────────────────────────────
// Each entry: { matcher: RegExp, errorType: string, confidence: number, dlTag?: string }
var ERROR_PATTERN_TABLE = [
    // Sunk cost errors
    { matcher: /\bsunk.*cost\b/i, errorType: 'sunk_cost_included', confidence: 0.90, dlTag: 'DL-008' },
    { matcher: /\bopportunity.*cost\b/i, errorType: 'opportunity_cost_omitted', confidence: 0.85, dlTag: 'DL-010' },
    
    // Constraint misidentification
    { matcher: /\bconstraint\b|\bbottleneck\b|\blimiting\b/i, errorType: 'constraint_misidentified', confidence: 0.85 },
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
 * Classify error type from question context.
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

// ─── Worker Message Handler ──────────────────────────────────
self.onmessage = function(e) {
    if (e.data && e.data.type === 'classifyError') {
        var result = classifyError(e.data.input);
        self.postMessage({ type: 'classifyErrorResult', id: e.data.id, result: result });
    }
};

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

// Export for Node.js testability
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { classifyError: classifyError, ERROR_PATTERN_TABLE: ERROR_PATTERN_TABLE };
}