# P2 Pack A Solve-and-Review: Parts 07–12

**Reviewer:** Senior Management Accountant / CMA Part 2 Exam Editor  
**Scope:** pack_p2_a.part007.js through pack_p2_a.part012.js  
**Items reviewed:** 62 (P2-A-035 through P2-A-096)  
**Date:** 2026  

---

## Review Methodology

For every item I performed four steps in order: (1) independent solve using only Stem + Choices, (2) distractor review, (3) explanation-correctness review, (4) topicalness review. Structural cross-checks (EW[CC] empty, non-CC EW >= 50 chars, QID format, Part2OnlyFlag) were verified for all 62 items. Clean items are omitted below; only defects are reported.

---

## [P2-A-084] — ROA computation missing tax rate in stem
- Check: explanation
- Severity: Critical
- Evidence: The stem states "Brentwood Corporation has net income of $800,000, interest expense of $200,000, average total assets of $10,000,000, and average total equity of $4,000,000. What is Brentwood's return on assets (ROA)?" No tax rate is provided. The ExplanationCorrect uses a 25% tax rate: "after-tax add-back = $200,000 × (1 − 0.25) = $150,000" and computes ROA = ($800,000 + $150,000)/$10,000,000 = 9.5%. Without the tax rate the problem is unsolvable; a candidate cannot distinguish between ROA = 8.0% (NI/ATA, no add-back), 9.5% (25% tax), and 10.0% (pre-tax add-back). The tax rate of 25% appears nowhere in the stem, the choices, or any other field visible to the test-taker.
- Proposed fix: Add the tax rate to the stem. Replace the stem with: "Brentwood Corporation has net income of $800,000, interest expense of $200,000, a tax rate of 25%, average total assets of $10,000,000, and average total equity of $4,000,000. What is Brentwood's return on assets (ROA)?"
- Confidence: High

---

## [P2-A-071] — ExplanationWrongB mislabels the option it refutes
- Check: explanation
- Severity: High
- Evidence: The CorrectChoice is D (after Rule4 rotation from B). ExplanationWrongB is supposed to refute Option B, which states: "The declining current ratio is a reporting artifact caused by the sales growth rate exceeding the asset growth rate; the ratios should be recalculated using inflation-adjusted values before any conclusion is reached." The ExplanationWrongB text reads: "Option D invokes inflation adjustment as an explanation. While inflation can affect financial statement comparability, a declining current ratio during growth is more likely explained by working capital dynamics than by inflation effects, which typically affect both current assets and current liabilities." The content of the explanation correctly describes Option B's error (inflation adjustment), but the label says "Option D" instead of "Option B." This misassignment means the explanation does not correctly refute the specific choice it is indexed to.
- Proposed fix: In ExplanationWrongB, replace "Option D invokes inflation adjustment as an explanation." with "Option B invokes inflation adjustment as an explanation."
- Confidence: High

---

## [P2-A-082] — ExplanationWrongB mislabels the option it refutes
- Check: explanation
- Severity: High
- Evidence: The CorrectChoice is D (after Rule4 rotation from B). ExplanationWrongB is supposed to refute Option B, which states: "Inventory turnover should be compared to total asset turnover rather than analyzed independently; the decline likely reflects broader asset inefficiency." The ExplanationWrongB text reads: "Option D suggests the decline reflects broader asset inefficiency. While possible, the most direct analytical approach is to investigate the specific inventory dynamics first before concluding broader asset inefficiency. Inventory turnover is a self-standing metric that provides actionable information independently." The content correctly describes Option B's error (broader asset inefficiency), but the label says "Option D" instead of "Option B."
- Proposed fix: In ExplanationWrongB, replace "Option D suggests the decline reflects broader asset inefficiency." with "Option B suggests the decline reflects broader asset inefficiency."
- Confidence: High

---

## [P2-A-091] — ExplanationWrongB mislabels the option it refutes
- Check: explanation
- Severity: High
- Evidence: The CorrectChoice is D (after Rule4 rotation from B). ExplanationWrongB is supposed to refute Option B, which states: "The divergence between the current ratio and all other liquidity metrics represents a reporting anomaly that should resolve in the next quarter as Mason collects outstanding receivables and reduces inventory to normal levels. The credit decision should be deferred pending Q3 results." The ExplanationWrongB text reads: "Option D treats the divergence as a temporary anomaly. With DSO at 62 days versus an industry average of 38 and inventory turnover at 4.2 versus 6.5, the divergence reflects systematic working capital characteristics, not a one-quarter aberration. Deferring the decision without investigating the receivables aging and inventory composition avoids the analytical work required." The content correctly describes Option B's error (temporary anomaly), but the label says "Option D" instead of "Option B."
- Proposed fix: In ExplanationWrongB, replace "Option D treats the divergence as a temporary anomaly." with "Option B treats the divergence as a temporary anomaly."
- Confidence: High

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed | 62 |
| Items with defects | 4 |
| Clean items (silent) | 58 |

**Defects by severity:**

| Severity | Count | QIDs |
|----------|-------|------|
| Critical | 1 | P2-A-084 |
| High | 3 | P2-A-071, P2-A-082, P2-A-091 |
| Medium | 0 | — |
| Low | 0 | — |
| Informational | 0 | — |

**Defect types:**
- Explanation (mislabeled distractor refutation): 3 items — all share the same root cause (Rule4 CorrectChoice rotation from B→D re-indexed the ExplanationWrong slots but left the prose referring to "Option D" in the ExplanationWrongB slot, which should refute Option B).
- Explanation (missing stem data): 1 item — P2-A-084 uses a 25% tax rate in the explanation that is absent from the stem, making the problem unsolvable as written.

**Notes:**
- All three "Rule4 recomputed: CorrectChoice B->D via position rotation" items (P2-A-071, P2-A-082, P2-A-091) exhibit the identical ExplanationWrongB mislabeling defect, suggesting a systematic error in the rotation logic rather than isolated mistakes.
- All structural cross-checks pass for all 62 items: EW[CC] = "" for every item; all non-CC ExplanationWrong slots are >= 50 chars; all QIDs match P2-A-NNN; all Part2OnlyFlag = true.
- All calculations verified independently for the 40+ calculation items; no arithmetic errors found.
- All authority citations, LOSTags, BlueprintDomains, and Topics are appropriate for the stems tested (no drift detected).
