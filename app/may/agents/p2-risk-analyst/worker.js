/**
 * P2RiskAnalyst Worker — Worker host for P2 Risk Analyst.
 * 
 * Runs classification in a background thread. Mirrors the main thread logic
 * but runs in a Web Worker context.
 * 
 * Session: P2-Phase2
 * Governance: Light Lane (worker host — no pack/case/content impact)
 */
'use strict';

// ─── Risk Pattern Table ───────────────────────────────────────
// Each entry: { matcher: RegExp, riskType: string, confidence: number, dlTag?: string }
var RISK_PATTERN_TABLE = [
    // Risk type classification
    { matcher: /\bfx\b|\bforeign.*exchange\b/i, riskType: 'foreign_exchange', confidence: 0.85 },
    { matcher: /\binterest\s*rate\b/i, riskType: 'interest_rate', confidence: 0.85 },
    { matcher: /\bcommodity\b/i, riskType: 'commodity', confidence: 0.85 },
    { matcher: /\bcredit.*\brisk\b|\bdebt.*\brisk\b/i, riskType: 'credit', confidence: 0.80 },
    { matcher: /\bequity.*\brisk\b|\bmarket.*\brisk\b/i, riskType: 'market', confidence: 0.80 },
    { matcher: /\bderivative\b|\bhedg/i, riskType: 'hedging', confidence: 0.80 },
    { matcher: /\btranslation\b/i, riskType: 'translation', confidence: 0.75 },
    { matcher: /\btransaction\b.*exposure/i, riskType: 'transaction_exposure', confidence: 0.75 },

    // Hedging mismatch detection (DL-030 class)
    { matcher: /\bnotional.*mismatch\b|\bmismatch.*notional\b/i, riskType: 'hedge_mismatch', confidence: 0.90, dlTag: 'DL-030' },
    // Over-hedging / under-hedging
    { matcher: /\bover.*hedg\b|\bunder.*hedg\b/i, riskType: 'hedge_ratio_error', confidence: 0.85 },
    // Risk measurement errors
    { matcher: /\bvar\b|\bvalue.*at.*risk\b/i, riskType: 'var_methodology', confidence: 0.80 },
    { matcher: /\bexpected.*shortfall\b|\bes\b/i, riskType: 'expected_shortfall', confidence: 0.80 },
    // COSO ERM principles
    { matcher: /\bcoso.*erm\b/i, riskType: 'coso_erm', confidence: 0.85 },
    { matcher: /\brisk.*appetite\b|\brisk.*capacity\b/i, riskType: 'appetite_capacity', confidence: 0.85 },
];

// ─── Classification Function ───────────────────────────────────
/**
 * Classify risk type from question context.
 * @param {Object} input - { stem, choices, explanationWrong, topic }
 * @returns {Object} { riskType, confidence, rationale, dlTag }
 */
function classifyRisk(input) {
    var text = [
        input.stem || '',
        input.topic || '',
        JSON.stringify(input.choices || {}),
        input.explanationWrong || ''
    ].join(' ').toLowerCase();

    var best = { riskType: 'unknown', confidence: 0, rationale: '' };
    for (var i = 0; i < RISK_PATTERN_TABLE.length; i++) {
        var entry = RISK_PATTERN_TABLE[i];
        if (entry.matcher.test(text)) {
            if (entry.confidence > best.confidence) {
                best = {
                    riskType: entry.riskType,
                    confidence: entry.confidence,
                    rationale: 'Detected ' + entry.riskType + ' pattern in P2 Section D content.',
                    dlTag: entry.dlTag || null
                };
            }
        }
    }
    return best;
}

// ─── Worker Message Handler ──────────────────────────────────
self.onmessage = function(e) {
    if (e.data && e.data.type === 'classifyRisk') {
        var result = classifyRisk(e.data.input);
        self.postMessage({ type: 'classifyRiskResult', id: e.data.id, result: result });
    }
};

function classifyRisk(input) {
    var text = [
        input.stem || '',
        input.topic || '',
        JSON.stringify(input.choices || {}),
        input.explanationWrong || ''
    ].join(' ').toLowerCase();

    var best = { riskType: 'unknown', confidence: 0, rationale: '' };
    for (var i = 0; i < RISK_PATTERN_TABLE.length; i++) {
        var entry = RISK_PATTERN_TABLE[i];
        if (entry.matcher.test(text)) {
            if (entry.confidence > best.confidence) {
                best = {
                    riskType: entry.riskType,
                    confidence: entry.confidence,
                    rationale: 'Detected ' + entry.riskType + ' pattern in P2 Section D content.',
                    dlTag: entry.dlTag || null
                };
            }
        }
    }
    return best;
}

// Export for Node.js testability
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { classifyRisk: classifyRisk, RISK_PATTERN_TABLE: RISK_PATTERN_TABLE };
}