# Solve-and-Review Report: Parts 037–043 (P2-A-351 through P2-A-394)

Reviewed by: Senior Management Accountant / CMA Part 2 Editor
Date: 2026-08-30
Scope: 44 items across 7 fragment files (pack_p2_a.part037.js through pack_p2_a.part043.js)

---

## [P2-A-358] — Typo in ExplanationWrongB references wrong choice letter
- Check: explanation
- Severity: Medium
- Evidence: ExplanationWrongB reads: "Choice C misreads the absolute levels by claiming net income is less than operating cash flow when $4.2M exceeds $1.1M..." This is the explanation for why Choice B is wrong, but it says "Choice C" instead of "Choice B." Choice B is the distractor that claims NI < OCF; Choice C is the correct answer. The typo could confuse students reading the distractor explanation.
- Proposed fix: In ExplanationWrongB, replace "Choice C misreads" with "Choice B misreads".
- Confidence: High

---

## [P2-A-371] — Mathematical inconsistency: stem numbers do not support claimed correct answer
- Check: solve-mismatch
- Severity: Critical
- Evidence: Stem states current assets = $480M including $60M inventory and $40M prepaid, plus $20M marketable securities. The explanation itself acknowledges the residual after inventory and prepaid is $380M ("AR is the residual after backing out inventory and prepaid from the $480M total = $380M"), but then computes the quick ratio using $320M ($60M cash + $20M marketable securities + $240M AR). The explanation's own residual ($380M) contradicts its numerator ($320M) by $60M. The correct quick ratio using the stem's stated residual is $380M / $300M = 1.27 (Choice C), not $320M / $300M = 1.07 (Choice A). The claimed correct answer (A) is unsupported by the stem numbers; the correct answer should be C.
- Proposed fix: Either (a) change CorrectChoice to C and rewrite ExplanationCorrect to show $380M / $300M = 1.27, or (b) change the stem's current assets to $420M so that $420M − $60M − $40M = $320M supports Choice A.
- Confidence: High

---

## [P2-A-373] — Explanation contradicts its own recomputation of DSO and DPO
- Check: explanation
- Severity: High
- Evidence: ExplanationCorrect computes DSO = 360 × $135M / $900M = 54.0 days and DPO = 360 × $110M / $900M = 44.0 days, but then uses DSO = 56 and DPO = 37 in the final CCC calculation ("CCC = 66 + 56 − 37 = 85 days"). The explanation hand-waves the discrepancy by claiming the DSO of 56 "reflects a slight rounding" (54 ≠ 56 is not rounding) and the DPO of 37 "uses an effective average of ~$92.5M" (the stem states avg AP = $110M, not $92.5M). The explanation's own recomputation (DSO=54, DPO=44) yields CCC = 66 + 54 − 44 = 76 days, which does not match the claimed 85 days.
- Proposed fix: Reconcile the explanation so the DSO and DPO values used in the final CCC calculation match the values computed earlier in the same explanation, or restate the stem figures (revenue, AP) so that DSO=56 and DPO=37 are correctly derived.
- Confidence: High

---

## [P2-A-377] — Incorrect correct answer: ASC 830 requires weighted-average rate, not period-end rate
- Check: solve-mismatch
- Severity: Critical
- Evidence: The subsidiary's functional currency is the euro (local currency), so the current-rate method applies. Under ASC 830-10-45-12, "Revenue and expense transactions shall be translated at the exchange rates in effect when the transactions occurred. A weighted-average exchange rate may be used for items of revenue and expense during a period." The period-end rate is used for balance-sheet items only. Choice D (weighted-average rate) is the correct answer under ASC 830. Choice C (period-end rate) is incorrect for income-statement items. The explanation misstates ASC 830 by claiming "the income-statement rate can be the period-end spot rate or a weighted-average approximation" — the period-end rate is NOT an acceptable rate for income-statement translation under ASC 830.
- Proposed fix: Change CorrectChoice from C to D. Rewrite ExplanationCorrect to cite ASC 830-10-45-12 and state that revenues and expenses are translated at the weighted-average rate (or transaction-date rates). Update ExplanationWrongC to reflect that C applies the balance-sheet rate to income-statement items.
- Confidence: High

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed | 44 (P2-A-351 to P2-A-394) |
| Defects found | 4 |
| Critical | 2 (P2-A-371, P2-A-377) |
| High | 1 (P2-A-373) |
| Medium | 1 (P2-A-358) |
| Low | 0 |
| Informational | 0 |
| Clean items | 40 |

Notes:
- All 44 items have valid QID format (P2-A-NNN), Part2OnlyFlag = true, empty ExplanationWrong at the CorrectChoice slot, and non-empty distractor explanations ≥50 chars.
- No topicalness drift detected: all items map cleanly to Financial Statement Analysis subtopics matching their LOSTag and BlueprintDomain.
- The 40 clean items are not listed above per the clean-items-silent convention.
