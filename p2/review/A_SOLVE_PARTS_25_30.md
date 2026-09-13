# P2 Pack A Solve-and-Review: Parts 025–030

## Reviewed Items

| QID | Topic | Correct | My Answer | Status |
|-----|-------|---------|-----------|--------|
| P2-A-225 | Inflation Indexed Supply Contract | B | B | Clean |
| P2-A-226 | Price To Earnings Trailing Diluted | D | D | Clean |
| P2-A-227 | Seasonality Year End Ratio Distortion | A | A | Clean |
| P2-A-228 | Common Size Margin Squeeze Diagnosis | B | B | Clean |
| P2-A-229 | Book Value Per Share Preferred Deduction | C | C | Clean |
| P2-A-230 | Current Rate Method Income Translation | A | A | Clean |
| P2-A-231 | Take Or Pay Off Balance Sheet Disclosure | D | D | Clean |
| P2-A-232 | Constant Dollar Restatement Acquisition Index | C | C | Clean |
| P2-A-233 | Segment Trend Mix Shift Analysis | A | A | Clean |
| P2-A-234 | Ratio Benchmark Context Principle | C | C | Clean |
| P2-A-235 | Adjusted Roa Nonrecurring Gain | B | B | Clean |
| P2-A-236 | sgr-financing-gap-strategy | A | A | Clean |
| P2-A-237 | operating-margin-computation | C | C | Clean |
| P2-A-238 | small-base-trend-distortion | B | B | Clean |
| P2-A-239 | transaction-exposure-settlement | D | D | Clean |
| P2-A-240 | asc842-adjusted-de-ratio | B | B | Clean |
| P2-A-241 | ratio-family-purpose | A | A | Clean |
| P2-A-242 | continuing-operations-margin | D | D | Clean |
| P2-A-243 | commonsize-financing-mix | C | C | Clean |
| P2-A-244 | inflation-margin-overstatement | A | A | Clean |
| P2-A-245 | dividend-yield-computation | B | B | Clean |
| P2-A-246 | workingcapital-ratio-name | C | C | Clean |
| P2-A-247 | dividend-policy-committee | A | A | Clean |
| P2-A-248 | receivables-revenue-divergence | D | D | Clean |
| P2-A-249 | leverage-interaction-risk | B | B | Clean |
| P2-A-250 | payout-trend-interpretation | C | C | Clean |
| P2-A-251 | translation-vs-transaction-exposure | A | A | Clean |
| P2-A-252 | temporal-remeasurement-gain | B | B | Clean |
| P2-A-253 | real-vs-nominal-growth | C | C | Clean |
| P2-A-254 | inflation-margin-analysis | A | A | Clean |
| P2-A-255 | lease-adjusted-leverage | D | D | Clean |
| P2-A-256 | take-or-pay-debt-capacity | B | B | Clean |
| P2-A-257 | dcl-computation | C | C | Clean |
| P2-A-258 | dfl-definition | B | B | Clean |
| P2-A-259 | liquidity-decomposition | A | A | Clean |
| P2-A-260 | operating-margin-computation | C | C | Clean |
| P2-A-261 | nonrecurring-gain-quality | D | D | Clean |
| P2-A-262 | mix-rate-decomposition | C | C | Clean |
| P2-A-263 | sgr-computation | A | A | Clean |
| P2-A-264 | pro-forma-tie-covenant | B | B | Clean |
| P2-A-265 | roe-average-equity | D | D | Clean |
| P2-A-266 | cash-ratio-default-proximity | A | A | **DEFECT** |
| P2-A-267 | dso-average-credit-sales | B | B | Clean |
| P2-A-268 | eps-weighted-shares | C | C | Clean |
| P2-A-269 | quick-current-divergence | A | A | **DEFECT** |
| P2-A-270 | covenant-quick-ratio-action | D | D | Clean |
| P2-A-271 | lifo-reserve-normalization | B | B | Clean |
| P2-A-272 | commonsize-sga-intensity | C | C | Clean |
| P2-A-273 | trading-on-the-equity | B | B | Clean |
| P2-A-274 | tie-driver-attribution | A | A | Clean |
| P2-A-275 | tat-average-assets | C | C | Clean |
| P2-A-276 | bvps-unrecorded-intangibles | D | D | Clean |
| P2-A-277 | commonsize-liability-shift | C | C | Clean |
| P2-A-278 | dividend-yield-spot | A | A | Clean |
| P2-A-279 | roe-common-refinement | B | B | Clean |
| P2-A-280 | bvps-mechanics | D | D | Clean |
| P2-A-281 | translation-adjustment-vs-transaction-gain | A | A | Clean |
| P2-A-282 | inventory-turnover-and-days | B | B | Clean |
| P2-A-283 | debt-to-equity-and-debt-to-assets | C | C | Clean |
| P2-A-284 | dupont-driver-attribution | A | A | Clean |
| P2-A-285 | channel-stuffing-earnings-quality | D | D | **DEFECT** |
| P2-A-286 | writedown-normalization-and-core-margin | B | B | Clean |

---

## Defects Found

## [P2-A-266] — LOSTag A.5 (foreign currency) misassigned to cash-ratio liquidity item
- Check: topicalness
- Severity: High
- Evidence: The item tests cash-ratio interpretation and liquidity hierarchy (cash ratio 0.18 vs current ratio 1.85). The stored LOSTag is "A.5", which is used throughout this pack for foreign-currency translation items (e.g., P2-A-230, P2-A-239, P2-A-251, P2-A-252, P2-A-281). Cash-ratio analysis has no connection to ASC 830 or foreign currency matters. The BlueprintDomain "Financial Statement Analysis" is correct, but the LOSTag drifts into an unrelated technical domain.
- Proposed fix: Change `"LOSTag": "A.5"` to `"LOSTag": "A.1"` (ratio computation — cash ratio is a basic liquidity ratio) or `"A.2"` (ratio analysis — the item requires interpreting the spread between two liquidity measures).
- Confidence: High

---

## [P2-A-269] — LOSTag A.8 (long-term solvency) misassigned to liquidity decomposition item
- Check: topicalness
- Severity: High
- Evidence: The item tests decomposition of the quick-ratio vs current-ratio divergence to diagnose an inventory build. The stored LOSTag is "A.8", which is used for leverage/solvency analysis items (P2-A-249 DOL/DFL, P2-A-257 DCL, P2-A-258 DFL definition, P2-A-284 DuPont). Liquidity analysis (quick/current ratio divergence) is a short-term working-capital concept, not a long-term solvency concept. The LOSTag should reflect ratio analysis or liquidity decomposition.
- Proposed fix: Change `"LOSTag": "A.8"` to `"LOSTag": "A.1"` (ratio computation — the item requires computing and comparing two ratios) or `"A.2"` (ratio analysis — interpreting the divergence between related ratios).
- Confidence: High

---

## [P2-A-285] — Stem numerical inconsistency: normalized GP conflicts with stated 30% channel margin
- Check: explanation
- Severity: Critical
- Evidence: The stem states channel-loaded sales of $800,000 at "a 30% product margin." This implies channel-loaded GP = $800,000 × 0.30 = $240,000 and channel-loaded COGS = $560,000. Reported GP is $2,200,000, so normalized GP should be $2,200,000 − $240,000 = $1,960,000 with a normalized margin of $1,960,000 / $9,200,000 = 21.3%. However, the stem states normalized GP is $1,840,000 (20.0% margin), which is $120,000 lower than the value implied by the 30% margin. The ExplanationCorrect does not resolve this inconsistency — it attempts multiple calculation paths (using 22% overall margin → $1,576,000; using $560,000 COGS removal → $1,640,000; using 30% margin → $1,960,000) and ends with "Use stated normalized packet: revenue 9,200,000, gross profit 1,840,000, margin 20.0% versus headline 22.0%" without explaining the discrepancy. The explanation also contains an arithmetic error: "Removing 560,000 of COGS, normalized gross profit = 2,200,000 − 560,000 = 1,640,000" incorrectly subtracts COGS from GP rather than computing GP = Revenue − COGS.
- Proposed fix: (a) Correct the stem so the normalized figures are consistent with the 30% margin: either change normalized GP to $1,960,000 (21.3% margin) or change the channel-loaded margin to 45% ($360,000 GP on $800,000 revenue, yielding $1,840,000 normalized GP at 20.0%). (b) Rewrite the ExplanationCorrect to show a single clean derivation: "Normalized revenue = $10,000,000 − $800,000 = $9,200,000. Channel-loaded GP at 30% = $240,000. Normalized GP = $2,200,000 − $240,000 = $1,960,000. Normalized margin = $1,960,000 / $9,200,000 = 21.3%." Then update the stem's normalized figures accordingly.
- Confidence: High

---

## Mini-Summary

- **Items reviewed:** 62 (P2-A-225 through P2-A-286)
- **Defects found:** 3
  - Critical: 1 (P2-A-285 — stem numerical inconsistency)
  - High: 2 (P2-A-266, P2-A-269 — LOSTag misassignment)
  - Medium: 0
  - Low: 0
  - Informational: 0
- **Clean items:** 59

### Notes on clean items
All 59 clean items were independently solved and verified. Calculation items were recomputed by two independent paths and matched the stored CorrectChoice. Distractor explanations were confirmed to refute the specific choice they target. Structural cross-checks (EW[CC] empty, non-CC EW ≥ 50 chars, QID format P2-A-NNN, Part2OnlyFlag true) passed for all items.
