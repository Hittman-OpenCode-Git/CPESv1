/**
 * P2RiskAnalyst — P2 Section D (Risk Management) reasoning agent.
 * 
 * Classifies risk types, identifies hedging mismatches, flags exposure
 * measurement errors. Worker-mandatory, hidden beta, feature-flag gated.
 * 
 * Session: P2-Phase2
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 */
'use strict';

const P2RiskAnalyst = (function() {
    'use strict';

    // ─── Risk Pattern Table ───────────────────────────────────
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

    // ─── Classification Function ───────────────────────────────
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

    // ─── Provider Class ──────────────────────────────────────
    function P2RiskAnalystProvider() {}

    P2RiskAnalystProvider.prototype.isAvailable = function() {
        try {
            return typeof MayFeatureFlags !== 'undefined' &&
                   MayFeatureFlags.isEnabled('ENABLE_P2_RISK_ANALYST');
        } catch (e) { return false; }
    };

    P2RiskAnalystProvider.prototype.getConfig = function() {
        return {
            name: 'P2RiskAnalyst',
            version: '1.0.0',
            domain: 'P2 Section D - Risk Management',
            capabilities: ['risk_classification', 'hedge_mismatch_detection', 'exposure_classification']
        };
    };

    P2RiskAnalystProvider.prototype.send = function(input) {
        return classifyRisk(input);
    };

    // ─── Export ──────────────────────────────────────────────
    return {
        classifyRisk: classifyRisk,
        P2RiskAnalystProvider: P2RiskAnalystProvider
    };

})();

if (typeof window !== 'undefined') {
    window.P2RiskAnalystClassify = P2RiskAnalyst.classifyRisk;
    window.P2RiskAnalystProvider = P2RiskAnalyst.P2RiskAnalystProvider;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = P2RiskAnalyst;
}