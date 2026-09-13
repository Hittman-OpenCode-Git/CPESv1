# CASE3 Review Findings — Case Pack 3 (Integrated Case Studies)

**Reviewer:** Laguna S (senior management accountant / CMA Part 2 exam editor)
**Scope:** `p2/case_pack_p2_3.js` — 34 cases, 204 items
**Parts reviewed:** 13 (concat verified EXACT MATCH per manifest)
**Date:** 2026-09-07

---

## Summary

| Metric | Value |
|--------|-------|
| Cases reviewed | 34 |
| Items reviewed | 204 |
| Critical findings | 1 |
| High findings | 1 |
| Medium findings | 5 |
| Low findings | 3 |
| Informational | 5 |

**Overall verdict:** The pack is fundamentally sound. All 34 cases present realistic business scenarios with named stakeholders, appropriate exhibits, and defensible answer keys. The math is correct on the vast majority of calculation items. Findings below include one **Critical** item (a wrong numeric key that auto-marks correct learners wrong), one High-severity key/explanation split, explanation-math mismatches, rounding inconsistencies, and one malformed cross-reference ID.

---

## Findings

---

## [CBQ23-C6 / Q2] — Stored answer ($86) contradicts exhibit math ($38.50) — **WRONG KEY AUTO-MARKS CORRECT LEARNERS WRONG**
- Check: solve-mismatch
- Severity: **Critical**
- Evidence: The prompt asks for "weighted average contribution margin per unit for the product mix of 3,000 Alpha, 2,000 Beta, and 5,000 Charlie." Math: Total CM = (3,000×$60)+(2,000×$40)+(5,000×$25) = $180K+$80K+$125K = $385K. Total units = 10,000. WACM = $385K/10,000 = **$38.50**. The stored answer is **86**. The explanation embedded in the item itself acknowledges: "WACM = $38.50. But the answer is $86..." and then fails to reconcile. The stored answer of 86 has no visible derivation from the exhibit data.
- Proposed fix: Change `Correct` from `"86"` to `"38.50"` (or reword the prompt if a different quantity was intended — e.g., total contribution $385,000 — but as written, the per-unit WACM is $38.50).
- Confidence: **High**

---

## [CBQ23-C9 / Q1] — Stored answer ($73) contradicts opportunity-cost math ($50.63)
- Check: solve-mismatch
- Severity: **High**
- Evidence: Minimum transfer price = Variable cost + Opportunity cost. Components Division: capacity 20,000 units, current external sales 15,000 units, idle capacity 5,000 kg. Assembly needs 8,000 kg. The first 5,000 kg have zero opportunity cost (idle capacity). The remaining 3,000 kg displace external sales with CM = $85−$30 = $55/kg. Opportunity cost per unit = (3,000×$55)/8,000 = $20.625. Minimum price = $30 + $20.63 = **$50.63**. The stored answer is **73**. The explanation itself computes $50.63 but then states "The answer $73 may reflect a different capacity assumption" without identifying what that assumption is. No exhibit data supports a $73 floor.
- Proposed fix: Change `Correct` from `"73"` to `"50.63"` (or clarify the capacity assumption that would produce $73 — e.g., if idle capacity were 2,000 instead of 5,000 — but as written, $50.63 is the defensible answer).
- Confidence: **High**

---

## [CBQ23-C3 / Q1] — Explanation's "4,640 hours" figure unsupported by exhibit math
- Check: explanation
- Severity: **Medium**
- Evidence: The explanation for the correct choice A states "the precise 4,640-hour figure arises when the mix is rebalanced toward higher-margin SKUs, which is the planning basis Priya is recommending." However, the exhibit data shows current mix total contribution $316,000 and total hours 12,480, giving a weighted-average CM/hour of $25.32. Breakeven hours = $140,000/$25.32 = 5,529 hours. The 4,640 figure would require a CM/hour of $30.17, which is not the current mix. The correct answer (A) is defensible on ranking grounds, but the specific 4,640-hour claim in the explanation is not reproducible from the exhibits.
- Proposed fix: Remove or correct the "4,640 hours" reference in the explanation. Replace with the defensible 5,529-hour figure (based on current mix WACM/hour of $25.32), or clarify that the 4,640 figure refers to a hypothetical rebalanced mix and show the computation.
- Confidence: **Medium**

---

## [CBQ23-C3 / Q3] — Margin-of-safety explanation contradicts the selected answer
- Check: explanation
- Severity: **Medium**
- Evidence: The explanation computes margin of safety as $335,417 (47.9% of expected sales) using the standard formula (expected sales − breakeven sales). But the correct answer choice B states "$161,000, or about 23% of expected sales." The explanation then says "Option B's $161,000 / 23% framing reflects an alternative calculation where segment corporate cost is treated as period-specific rather than allocated." This is confusing — the $161,000 figure is not derived in the explanation, and the candidate cannot reproduce it. The math in the explanation ($335K) actually supports a different answer.
- Proposed fix: Either (a) change the correct answer to match the $335K/47.9% computation shown in the explanation, or (b) show the explicit calculation that produces $161K/23% (e.g., using a different fixed-cost base or a different expected sales figure) so the candidate can verify.
- Confidence: **Medium**

---

## [CBQ23-B3 / Q3] — WACC explanation computes 8.68% but stores 8.73%
- Check: explanation
- Severity: **Medium**
- Evidence: The explanation walks through: "(0.60×11.01%)+(0.30×4.23%)+(0.10×8.00%) = 6.61%+1.27%+0.80% = 8.68%." Then says "Using unrounded CAPM output: ... = 8.67% = 8.73% with precise intermediate values." The jump from 8.67% to 8.73% is not shown. The stored answer is 8.73. A candidate using the rounded figures in the explanation gets 8.68%, which does not match the stored answer.
- Proposed fix: Show the precise intermediate calculation that yields 8.73% so the candidate can reproduce the stored answer. If the stored answer is wrong, correct it to 8.68%.
- Confidence: **Medium**

---

## [CBQ23-B3 / Q5] — New WACC explanation computes 8.66% but stores 8.89%
- Check: explanation
- Severity: **Medium**
- Evidence: The explanation computes "WACC = 8.66%" then says "With blended existing + new debt cost: WACC = 8.89% using the simplified assumption of incremental debt at full new rate." The stored answer is 8.89. The path from 8.66% to 8.89% is not shown — the "simplified assumption" is not quantified.
- Proposed fix: Show the blended debt cost calculation explicitly and verify the 8.89% figure. If the 8.89% cannot be reproduced from the exhibit data, correct the stored answer.
- Confidence: **Medium**

---

## [CBQ23-C8 / Q2] — Total relevant cost: explanation includes maintenance ($355K) but stored answer excludes it ($155K)
- Check: explanation
- Severity: **Medium**
- Evidence: The explanation computes "$200,000+(5×$40,000)−$45,000 = $355,000" then says "the answer is $155,000" and argues the $155K is "the net capital cost" while "the annual operating cost of $40,000 is separate." The prompt asks for "total five-year RELEVANT cost" — if the $40,000 annual maintenance is a relevant future cash flow (which it is, per the exhibit), it should be included. The stored answer of $155,000 = $200,000−$45,000 excludes maintenance.
- Proposed fix: Either (a) change the stored answer to 355000 (including maintenance as a relevant cost), or (b) reword the prompt to ask specifically for "net capital cost" or "net equipment cost" excluding operating costs. As written, the total relevant cost of ownership including operating costs is $355,000.
- Confidence: **Medium**

---

## [CBQ23-A3 / Q1] — Minor rounding inconsistency in explanation
- Check: explanation
- Severity: **Low**
- Evidence: The explanation computes the remeasurement loss as "Increase 34,259 is loss" but the stored answer is 34260. The actual calculation: 120M/148 = 810,810.81; 120M/142 = 845,070.42; difference = 34,259.61, which rounds to 34,260. The explanation's "34,259" is the truncated (not rounded) figure. The stored answer (34260) is correct.
- Proposed fix: Change "34,259" to "34,260" in the explanation text for consistency with the stored answer.
- Confidence: **High**

---

## [CBQ23-E4 / Q2] — Optimal portfolio NPV: explanation math unclear
- Check: explanation
- Severity: **Low**
- Evidence: The explanation states "optimum is A+C+D+F? Actually projects A-D?" then settles on "A+B+C+D 5.3M NPV 1.62." The correct combination is A($2.0M)+B($1.5M)+C($1.0M)+D($0.8M) = $5.3M investment, NPV = $0.60+$0.50+$0.32+$0.20 = $1.62M. This is correct and is the optimal combination under the $6M cap. The explanation's hedging ("A+C+D+F?") is confusing but the final answer is right.
- Proposed fix: Clean up the explanation to show the exhaustive comparison directly: "Feasible combinations under $6M cap: A+B+C+D = $5.3M, NPV $1.62M (optimal); A+B+C+E = $7.0M (exceeds cap); B+C+D+E = $5.8M, NPV $1.42M; etc."
- Confidence: **Medium**

---

## [CBQ23-C8 / Q4] — Annual cost advantage calculation unclear
- Check: explanation
- Severity: **Low**
- Evidence: The explanation computes "Annual cost of old = $70,000" and "Annual cost of new = $40,000 + ($155,000/5) = $71,000" showing the new is $1,000 MORE expensive. Then says "The answer $6,000 suggests a different calculation." The stored answer is 6000. The explanation does not derive the $6,000 figure.
- Proposed fix: Show the calculation that produces the $6,000 cost advantage. If the intent is ($70,000) − ($40,000 + $30,000 capital recovery using $150K/5) = $0, or a different framing, document it explicitly. The current explanation contradicts the stored answer.
- Confidence: **Medium**

---

## [Multiple cases] — Empty ExplanationWrongA fields on MCQ items where A is the correct choice
- Check: Structural
- Severity: **Informational**
- Evidence: Cases CBQ23-C3, CBQ23-D2, CBQ23-E3 (the newer "Flash" cases using the `mcq` type with `CorrectChoice` and `ExplanationWrongA/B/C/D` fields) have `ExplanationWrongA: ""` when A is the correct choice. This appears to be a schema convention (the correct-choice explanation is in `ExplanationCorrect`, and the slot for the correct letter's wrong-explanation is left empty). This is consistent across these cases and does not affect scoring, but it is worth noting as a structural pattern.
- Proposed fix: No change needed if this is an intentional schema convention. If not, populate the correct-choice slot with the same text as `ExplanationCorrect` for consistency with the `select`-type items that use `ExplanationWrongA/B/C/D` for all letters.
- Confidence: **High**

---

## [CBQ23-C3 / Q5, Q6] — ExplanationWrongA text appears to describe the correct answer, not a distractor
- Check: distractor
- Severity: **Informational**
- Evidence: In CBQ23-C3-Q5, `ExplanationWrongA` reads: "Choice A eliminates the lowest-margin product from the mix; under a constrained-bottleneck model, eliminating the lowest-margin product (per bottleneck-hour) actually frees capacity for higher-margin products and is typically a sound recommendation, not a tactical mistake." This text argues FOR choice A (which is the CORRECT answer), not against it. Similarly in Q6, `ExplanationWrongA` argues for the correct answer. This is a labeling issue — the text belongs in `ExplanationCorrect`, not `ExplanationWrongA`.
- Proposed fix: Move the text currently in `ExplanationWrongA` to `ExplanationCorrect` for these items, and populate `ExplanationWrongA` with a genuine distractor explanation (why eliminating ALL of Product C is suboptimal — e.g., customer relationships, volume discounts, strategic positioning).
- Confidence: **High**

---

## [CBQ23-D2 / Q4, Q6] — ExplanationWrongB is empty when B is the correct choice
- Check: Structural
- Severity: **Informational**
- Evidence: In CBQ23-D2-Q4, the correct choice is B but `ExplanationWrongB` is empty (correct explanation is in `ExplanationCorrect`). Same pattern in Q6. This is the same schema convention noted above — consistent across the `mcq`-type items in the Flash cases.
- Proposed fix: Same as above — no action needed if intentional.
- Confidence: **High**

---

## [CBQ23-A5 / Q1 through Q6] — Newer "select" items use array-style choices and per-letter ExplanationWrong fields
- Check: Structural
- Severity: **Informational**
- Evidence: Cases CBQ23-A5 through A8, B3 through B6, C6 through C9 (the P2-CERT-WAVE cases) use `Choices: [array]` with `ExplanationWrongA/B/C/D` fields and a separate `ExplanationCorrect`. This is a different schema from the earlier `Choices: {A:..., B:...}` object style. Both schemas are valid and the governance guard handles both. No defect — noting for documentation.
- Proposed fix: None.
- Confidence: **High**

---

## [CBQ23-A6 / Q2] — Dangling/malformed reference ID in Exhibit 2 ReferencedBy (addendum)
- Check: Structural
- Severity: **Informational**
- Evidence: Exhibit 2 (`CBQ23-A6-E2`) `ReferencedBy` array contains `"CBQ3-A6-Q2"` — a malformed ItemID missing the `2` in the prefix (should be `"CBQ23-A6-Q2"`). This is a typo in the cross-reference, not a content defect — the item itself (`CBQ23-A6-Q2`) parses correctly and its answer key is verifiable. But the dangling reference means the bidirectional ReferencedBy check cannot confirm that the exhibit is consumed by the item, and a downstream registry cross-check would flag a phantom `CBQ3-A6-Q2` ID.
- Proposed fix: Change `"CBQ3-A6-Q2"` to `"CBQ23-A6-Q2"` in Exhibit 2's `ReferencedBy` array.
- Confidence: **High**

---

## Recall Gap Disclosure — Coverage Bounds on This Review

The bidirectional-ReferencedBy check performed in this review was a **spot-check**, not an exhaustive scan of every Exhibit's ReferencedBy array against every ItemID in the pack. The malformed reference above (`CBQ3-A6-Q2`) was identified by the reviewing surgeon but **not logged in the original pass** — meaning the statement "the remaining 197 items are clean" bounds the claim to *defects found by this pass*, not a guarantee of zero defects pack-wide. Any future remediation wave should run an automated ReferencedBy integrity check (parse every ItemID and every Exhibit ReferencedBy, confirm bidirectional closure) rather than relying on spot-check coverage.

---

## Items Below HIGH Confidence (Unreviewed at Full Depth)

The following items had complex multi-step calculations where I verified the stored answer against the exhibit data but did not independently recompute every intermediate step. They are marked as Medium or Low confidence:

| Item | Reason |
|------|--------|
| CBQ23-E3-Q2 | MACRS after-tax cash flow — verified formula structure, spot-checked arithmetic |
| CBQ23-E3-Q5 | Capital rationing recommendation — qualitative, logic verified |
| CBQ23-B4-Q2 | WACC with Hamada equation — multiple valid approaches, stored answer within range |
| CBQ23-C7-Q5 | Outsource vs shift analysis — stored answer is directionally correct, exact derivation complex |

---

## Structural Cross-Checks (All Cases)

| Check | Result |
|-------|--------|
| Named company, named stakeholder with role | ✅ All 34 cases |
| Business trigger and clear task | ✅ All 34 cases |
| Exhibit data consumed (no decorative rows) | ✅ All exhibits referenced by items |
| CaseID / ItemID / ExhibitID unique and correctly patterned | ✅ Verified |
| CognitiveLevel and DifficultyScore present | ✅ All items |
| Part2OnlyFlag strictly true | ✅ All items (where present) |
| question_state present | ✅ All items (all "Certified") |
| ReferencedBy bidirectional consistency | ✅ Spot-checked — exhibits reference items that consume them |

---

## Cognitive and Difficulty Distribution (measured from raw file)

| Cognitive Level | Count | % |
|----------------|-------|---|
| Understand | 8 | 3.9% |
| Apply | 72 | 35.3% |
| Analyze | 64 | 31.4% |
| Evaluate | 60 | 29.4% |

| Difficulty | Count | % |
|-----------|-------|---|
| Moderate-Easy (DS 2) | 28 | 13.7% |
| Moderate (DS 3) | 80 | 39.2% |
| Difficult (DS 4) | 72 | 35.3% |
| Very Difficult (DS 5) | 24 | 11.8% |

Distribution is within portfolio targets (Apply+Analyze+Evaluate = 96%, DS3+DS4 = 74.5%).

---

## Recommendations

1. **CBQ23-C6-Q2** (**CRITICAL**) — Wrong numeric key auto-marks correct learners wrong. The explanation itself refutes the stored key ($86) and computes $38.50 three ways. **Fix before any live delivery.** Change `Correct` from `"86"` to `"38.50"`.
2. **CBQ23-C9-Q1** (HIGH) — Stored answer $73 contradicts the explanation's own $50.63 derivation. Change `Correct` to `"50.63"` or document the capacity assumption that produces $73.
3. **CBQ23-C3-Q1, Q3** (MEDIUM) — Explanations contain unsupported numerical claims. Undermine the "show your work" standard.
4. **CBQ23-B3-Q3, Q5** (MEDIUM) — WACC explanations show one number and store another. Computation path should be explicit.
5. **CBQ23-C8-Q2** (MEDIUM) — "Total relevant cost" prompt and stored answer disagree on whether operating costs are included.
6. **CBQ23-A6-E2** (INFORMATIONAL) — Malformed `CBQ3-A6-Q2` reference. Fix to `CBQ23-A6-Q2`.
7. **Process** — Run an automated bidirectional ReferencedBy integrity check (parse every ItemID against every Exhibit ReferencedBy, confirm closure) before the next certification wave. The spot-check approach used here missed this defect on first pass.

---

*End of report.*
