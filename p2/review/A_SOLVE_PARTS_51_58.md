# P2 Pack A Solve-and-Review: Parts 051–058

## Reviewer: Senior Management Accountant / CMA Part 2 Editor
## Date: 2026-09-06
## Scope: pack_p2_a.part051.js through pack_p2_a.part058.js (items P2-A-460 through P2-A-542)

---

## [P2-A-460] — Topicalness drift: VIE consolidation item tagged A.9 (Sustainable Growth Rate)
- Check: topicalness
- Severity: High
- Evidence: The item's ExplanationWrongB reads "Choice B (never consolidate VIEs) is false. Legal separateness does not prevent consolidation; ASC 810 requires consolidation of VIEs by their primary beneficiary…" — this is clearly a VIE/consolidation question. However, the item's LOSTag is "A.9" and its Topic is "A.9 Sustainable growth rate formula and interpretation." VIE consolidation (ASC 810) has no connection to sustainable growth rate (A.9). The item should carry a consolidation-related LOSTag (e.g., A.7 or a dedicated consolidation tag) and a matching Topic.
- Proposed fix: Change LOSTag from "A.9" to "A.7" (or the appropriate consolidation LOS) and change Topic from "A.9 Sustainable growth rate formula and interpretation" to a consolidation-appropriate topic such as "Consolidation of Variable Interest Entities (ASC 810)."
- Confidence: High

---

## [P2-A-505] — CorrectChoice/ExplanationCorrect mismatch on dividend irrelevance item
- Check: explanation
- Severity: Critical
- Evidence: The CorrectChoice is "C" ("The stock dropped because the ex-dividend date was misidentified, and the $8 decline reflects unrelated price movements"). This is factually wrong — the $8 decline exactly equals the $8.00 dividend, so it is clearly related. The ExplanationCorrect states: "Modigliani-Miller (1961) showed that in frictionless markets, dividend policy is irrelevant to firm value. The $8 price decline exactly matches the $8 annual dividend increase, which is the mechanical MM prediction. The shareholder's total wealth remains $160 ($152 stock + $8 dividend). The decline is a value transfer, not value destruction." This explanation directly supports Choice B ("Under Modigliani-Miller dividend irrelevance theory, in a frictionless market the dividend increase transfers value from stock price to the dividend check, leaving total shareholder wealth unchanged at $160"), not Choice C. Additionally, the stem says "$2.00 per share dividend increase to $8.00" (implying a $2.00 increase from $6.00 to $8.00), but the explanation treats the increase as $8.00 — the stem and explanation are internally inconsistent.
- Proposed fix: (1) Correct the stem to say "an $8.00 per share dividend increase" (or adjust the stock drop to $2.00) so the numbers are internally consistent. (2) Set CorrectChoice to "B" and update ExplanationCorrect to match, OR keep CorrectChoice as "B" and ensure ExplanationWrongB is empty. (3) Rewrite ExplanationWrongC to refute the actual C choice.
- Confidence: High

---

## [P2-A-507] — CorrectChoice is wrong; ExplanationWrong slots copied from P2-A-508
- Check: solve-mismatch / distractor / structural
- Severity: Critical
- Evidence: The CorrectChoice is "C" ("The dividend yield is 2.50% ($1.80 / $72.00), and because it is below the median, Northstar's stock is undervalued"). This is incorrect — a below-median dividend yield does not imply undervaluation; it may simply reflect a growth-oriented retention policy. Choice A ("The annual dividend yield is 2.50% ($1.80 / $72.00), which is below the 2.8% median but does not necessarily indicate underperformance since Northstar may retain more for growth") is the correct answer. Furthermore, all three ExplanationWrong slots for this item are verbatim copies of the P2-A-508 (Gordon Growth Model) explanations: ExplanationWrongA references "D0 (2.40) divided by r (12.0%) = 20.00," ExplanationWrongB references "D0/(r-g) = 2.40/0.07 = 34.29," and ExplanationWrongD references "D0/g = 2.40/0.05 = 48.00" — none of which relate to a dividend-yield calculation. The structural cross-check "Non-CC EW >=75 chars" passes only because the wrong explanations happen to be long enough.
- Proposed fix: (1) Set CorrectChoice to "A" and set ExplanationWrongA to "". (2) Rewrite ExplanationWrongB to refute B (quarterly yield not annualized: "$0.45 / $72.00 = 0.625% is the quarterly yield; it must be annualized to 2.50% by multiplying by 4"). (3) Rewrite ExplanationWrongC to refute C (below-median yield does not imply undervaluation). (4) Rewrite ExplanationWrongD to refute D (dividing by par value instead of market price).
- Confidence: High

---

## [P2-A-509] — Flawed question premise; CorrectChoice/ExplanationCorrect misalignment
- Check: explanation / solve-mismatch
- Severity: High
- Evidence: The question asks "why the stock did not drop by exactly $1.50" but the stock DID drop by exactly $1.50 ($45.00 − $43.50 = $1.50). The premise is false. The CorrectChoice is A ("The stock should have opened at $43.50, dropping exactly $1.50, but market volatility caused fluctuation around the theoretical price") — this is self-contradictory because the stock did open at exactly $43.50 with no fluctuation. Choice B ("The stock dropped by $1.50 as expected, and $43.50 confirms the ex-dividend adjustment was applied correctly") is the most accurate statement. The ExplanationCorrect acknowledges the drop was exact ("$45.00 − $1.50 = $43.50, which matches exactly") but then discusses why taxable-market drops are typically less than the full dividend — supporting a different answer than the one keyed.
- Proposed fix: (1) Rewrite the stem to describe a case where the drop differs from the dividend amount (e.g., "the stock opens at $43.80, a $1.20 decline"). (2) Set CorrectChoice to the choice that correctly explains the tax-adjusted drop. (3) Ensure ExplanationCorrect derives the new key.
- Confidence: High

---

## [P2-A-510] — CorrectChoice contains incorrect computed values
- Check: solve-mismatch
- Severity: Critical
- Evidence: The CorrectChoice is D ("EPS increases to $3.13 and BVPS decreases to $17.78, because the repurchase reduces shares more than equity"). Recomputation: shares repurchased = $40M / $40 = 1.0M; remaining shares = 20M − 1M = 19M; equity after = $400M − $40M = $360M; EPS = $50M / 19M = $2.63 (not $3.13); BVPS = $360M / 19M = $18.95 (not $17.78). The source_support_for_key in the item metadata correctly computes EPS = $2.63 and BVPS = $18.95, confirming the choice text is wrong. The direction of change in D (EPS up, BVPS down) is correct, but the specific values are not.
- Proposed fix: Replace Choice D text with "EPS increases to $2.63 and BVPS decreases to $18.95, because the repurchase reduces shares outstanding to 19 million while equity falls by the full $40 million cash outlay." Update ExplanationWrongD accordingly.
- Confidence: High

---

## [P2-A-517] — CorrectChoice value is arithmetically wrong
- Check: solve-mismatch
- Severity: Critical
- Evidence: The CorrectChoice is B ("$1.36, because the company adjusts one-quarter of the gap between current and target dividends each period"). Recomputation using Lintner's formula: Target DPS = 40% × $3.20 = $1.28; Gap = $1.28 − $1.60 = −$0.32; Adjustment = 0.25 × (−$0.32) = −$0.08; New DPS = $1.60 + (−$0.08) = $1.52. The value $1.36 would result from incorrectly adding one-quarter of the gap to the target ($1.28 + $0.08 = $1.36) rather than to the current dividend. The ExplanationCorrect itself acknowledges the mechanical result is $1.52 but then endorses the $1.36 figure, which is internally contradictory.
- Proposed fix: (1) Change CorrectChoice to the choice that states $1.52 (currently no choice shows $1.52, so a new choice must be added). (2) Alternatively, if the intent is to test Lintner's insight about dividend stickiness, key D ($1.60) as correct and rewrite the explanation to state that managers resist cutting dividends when the target is below the current level. (3) Update all ExplanationWrong slots to match the new key.
- Confidence: High

---

## [P2-A-525] — CorrectChoice text states wrong PVGO value
- Check: solve-mismatch
- Severity: Critical
- Evidence: The CorrectChoice is C ("$33 per share, because PVGO equals the current price minus the no-growth value, and $60 − $33.33 = $26.67"). The choice text says "$33 per share" but the calculation immediately following shows $26.67. The correct PVGO is $26.67 (No-growth value = $4.00 / 0.12 = $33.33; PVGO = $60 − $33.33 = $26.67). The ExplanationCorrect correctly computes $26.67, but the choice text contradicts it by stating "$33 per share." No choice in the set correctly states "$26.67 per share."
- Proposed fix: Replace Choice C text with "$26.67 per share, because PVGO equals the current price minus the no-growth value, and $60 − $33.33 = $26.67." Update ExplanationWrongC to "" and adjust other ExplanationWrong slots as needed.
- Confidence: High

---

## [P2-A-522] — Typo in ExplanationCorrect ("$44 dividend share" should be "$4.00 dividend share")
- Check: explanation
- Severity: Low
- Evidence: The ExplanationCorrect states: "Plan A: $5 dividend per share, taxed at 20% = $1.00 tax, after-tax = $4.00 per share. Plan B: repurchase at $45, gain = $25/share ($45 - $20 basis), capital gains tax = $25 x 15% = $3.75, after-tax = $41.25 per share vs $44 dividend share." The "$44 dividend share" should read "$4.00 dividend share" (the after-tax dividend per share from Plan A). The figure $44 appears to be a typo.
- Proposed fix: In ExplanationCorrect, change "vs $44 dividend share" to "vs $4.00 dividend share."
- Confidence: High

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed (P2-A-460 through P2-A-542, across 8 pack files) | 83 |
| Items with defects | 8 |
| Clean items (no defect block written) | 75 |

### Defects by severity

| Severity | Count | QIDs |
|----------|-------|------|
| Critical | 5 | P2-A-505, P2-A-507, P2-A-510, P2-A-517, P2-A-525 |
| High | 2 | P2-A-460, P2-A-509 |
| Medium | 0 | — |
| Low | 1 | P2-A-522 |
| Informational | 0 | — |

### Defects by check type

| Check type | Count | QIDs |
|------------|-------|------|
| solve-mismatch | 5 | P2-A-505, P2-A-507, P2-A-510, P2-A-517, P2-A-525 |
| explanation | 2 | P2-A-505, P2-A-509 |
| distractor | 1 | P2-A-507 |
| structural | 1 | P2-A-507 |
| topicalness | 1 | P2-A-460 |

### Key patterns observed

1. **ExplanationWrong cross-contamination (P2-A-507):** All three non-key ExplanationWrong slots were copied verbatim from the immediately following item P2-A-508 (Gordon Growth Model). This suggests a copy-paste error during item assembly that bypassed the structural cross-check (the copied text happened to be ≥75 chars, so the length check passed).

2. **CorrectChoice/ExplanationCorrect divergence (P2-A-505, P2-A-509):** In two items, the ExplanationCorrect text logically supports a different option than the one keyed as CorrectChoice. This indicates either the key was rotated without updating the explanation, or the explanation was rewritten without updating the key.

3. **Arithmetic errors in choice text (P2-A-510, P2-A-517, P2-A-525):** Three items have CorrectChoice values that are arithmetically incorrect upon independent recomputation. In all three cases, the item's own source_support_for_key metadata or ExplanationCorrect contains the correct computation, but the choice text was not updated to match.

4. **Topicalness drift (P2-A-460):** One item tests VIE consolidation (ASC 810) but is tagged with A.9 (Sustainable Growth Rate), a completely unrelated topic.
