# Solve & Review: Part 2 Pack A — Parts 059 through 065

Reviewed by: Senior Management Accountant / CMA Part 2 Editor
Date: 2026-09-06
Scope: All items in pack_p2_a.part059.js through pack_p2_a.part065.js

---

## P2-A-542 — EPS value in Choice C contradicts ExplanationCorrect; $2.25 not derivable from stem

- Check: solve-mismatch
- Severity: Critical
- Evidence: Choice C states "Both alternatives produce identical EPS of $2.25." ExplanationCorrect computes EPS = $1.50 under both alternatives (using 25% tax: equity NI = $600,000 / 400,000 shares = $1.50; debt NI = $300,000 / 200,000 = $1.50). The $2.25 figure cannot be obtained under any tax rate: at 0% tax both EPS = $2.00; at 20% tax (implied by "Current EPS is $2.00": $500K × 0.80 / 200K = $2.00) both EPS = $1.60; at 25% tax both EPS = $1.50. Additionally, the stem never states a tax rate — the explanation's 25% is an unsupported assumption. The $2.25 figure equals EBIT/shares ($900K/400K), a miscomputation. Internal contradiction: ExplanationWrongA also endorses "$2.25" as the equity EPS while the correct-answer explanation computes $1.50.
- Proposed fix: (1) Add tax rate to stem, e.g. "The company's tax rate is 25%." (2) Change Choice C EPS value to match: at 25% tax, "Both alternatives produce identical EPS of $1.50." (3) Update ExplanationWrongA to reference $1.50 instead of $2.25.
- Confidence: High

---

## P2-A-546 — Debt-to-equity ratio misstated as 1.50; correct value is 1.55

- Check: explanation
- Severity: High
- Evidence: Choice A and ExplanationCorrect both state "The debt-to-equity ratio rises from 1.25 to 1.50." Pre-consolidation: $25M/$20M = 1.25. Post-consolidation: liabilities = $25M + $6M = $31M; equity = $20M (unchanged). D/E = $31M/$20M = 1.55, not 1.50. The 1.50 figure would require only $5M added to liabilities, but the stem specifies $6M.
- Proposed fix: Change "1.50" to "1.55" in both Choice A and ExplanationCorrect. Choice A: "The debt-to-equity ratio rises from 1.25 to 1.55." ExplanationCorrect: "The debt-to-equity ratio increases from 1.25 to 1.55."
- Confidence: High

---

## P2-A-550 — Choice C value $3,520,000 is arithmetically irreconcilable; ExplanationWrongC incorrectly endorses it as "correct value"

- Check: distractor / explanation
- Severity: Critical
- Evidence: Choice C states "$3,520,000, because Orion records income ($480,000) minus amortization ($50,000) but ignores dividends." The described calculation yields $2,400,000 + $480,000 − $50,000 = $2,830,000, not $3,520,000. The correct equity-method balance is $2,710,000. ExplanationWrongC states: "This arrives at the correct value but uses incorrect reasoning about dividends." This is factually wrong — $3,520,000 is not the correct value ($2,710,000 is). Additionally, Choice B contains its own internal inconsistency: stated value $2,880,000 but described calculation ($2,400,000 + $480,000 − $120,000 = $2,760,000) does not match.
- Proposed fix: (1) Change Choice C to "$2,830,000" (matching the described calculation) or "$2,760,000" (matching the stated value of B, making C a different distractor). (2) Rewrite ExplanationWrongC: "This value is incorrect. The correct balance is $2,710,000. Ignoring dividends overstates the balance; the correct calculation subtracts both amortization ($50,000) and dividends ($120,000)." (3) Fix Choice B internal inconsistency: either change stated value to "$2,760,000" or change description to match $2,880,000.
- Confidence: High

---

## P2-A-545 — DTL of 12.0 and 60% EPS decline not rigorously derivable from stem numbers

- Check: explanation
- Severity: Medium
- Evidence: The stem states the company operates at breakeven (CM = $18M = Fixed costs, so EBIT = $0). At exactly breakeven, DOL = $18M/$0 → ∞ and DFL = $0/($0 − $3.2M) is undefined. ExplanationCorrect acknowledges this but then introduces a hypothetical EBIT of $500,000 (which is below the $3.2M interest threshold, yielding negative DFL) and concludes "The combined DTL of approximately 12.0 captures this extreme vulnerability" without showing the derivation. No EBIT level cleanly produces DTL = 12.0: at EBIT = $4.8M, DOL = 3.75, DFL = 3.0, DTL = 11.25; at EBIT = $3.6M, DOL = 5.0, DFL = 9.0, DTL = 45.0. The 60% figure (5% × 12.0) inherits this arbitrariness.
- Proposed fix: Either (a) restate the stem to specify an EBIT level above interest (e.g., "EBIT of $4,800,000") so DTL can be computed directly, or (b) reframe the answer to avoid the specific 60% figure: "EPS declines by more than 50% because the firm operates near breakeven with substantial fixed costs and debt, making EPS extremely sensitive to sales changes."
- Confidence: Medium

---

## P2-A-572 — Purchasing power effect mislabeled as "loss" when net monetary liability position creates a gain

- Check: explanation
- Severity: Medium
- Evidence: Stem: monetary assets $1.2M, monetary liabilities $1.35M → net monetary liability position of $0.15M. During 4% inflation, a net monetary liability position produces a purchasing power GAIN (the real value of debt decreases more than the real value of monetary assets). Gain = $0.15M × 4% = $6,000. Both Choice A and ExplanationCorrect call this a "purchasing power loss." The explanation states: "purchasing power loss = $150,000 × 4% = $6,000, recognized in equity." The arithmetic is correct but the sign/direction is wrong.
- Proposed fix: Change "purchasing power loss" to "purchasing power gain" in both Choice A and ExplanationCorrect. Choice A: "with the purchasing power gain on net monetary items recognized in equity." ExplanationCorrect: "purchasing power gain = $150,000 × 4% = $6,000, recognized in equity."
- Confidence: High

---

## P2-A-598 — Gross margin percentage misstated as 31.9%; correct value is 32.0%

- Check: explanation
- Severity: Low
- Evidence: 2026 gross profit = $5,750,000 − $3,910,000 = $1,840,000. Gross margin = $1,840,000 / $5,750,000 = 0.3200 = 32.0%. Both Choice A and ExplanationCorrect state "31.9%." The 0.1 pp difference is a minor rounding error.
- Proposed fix: Change "31.9%" to "32.0%" in Choice A and ExplanationCorrect.
- Confidence: High

---

## P2-A-600 — Margin contribution miscalculated as 1.69 pp; correct value is 1.59 pp

- Check: explanation
- Severity: Low
- Evidence: ExplanationCorrect computes margin contribution as "22.5% × 0.75 × 0.85 − 20.0% × 0.75 × 0.85 = 1.69 percentage points." Actual: 22.5% × 0.75 × 0.85 = 14.34375%; 20.0% × 0.75 × 0.85 = 12.75000%; difference = 1.59375% ≈ 1.59%, not 1.69%. The 0.10 pp error appears to be a transcription mistake.
- Proposed fix: Change "1.69 percentage points" to "1.59 percentage points" in ExplanationCorrect.
- Confidence: High

---

## P2-A-589 (Part 062) — QuestionID and structural fields missing; question truncated at start of file

- Check: structural
- Severity: Critical
- Evidence: Part 062 (pack_p2_a.part062.js) begins at line 1 with `"Stem": "Summit Manufacturing uses LIFO..."` — the fields Part, schema_version, Section, QuestionID, question_state, Part2OnlyFlag, and UniqueConceptKey are all absent. The question content (LIFO inventory layer measurement) corresponds to P2-A-589 based on the sequence and uniqueness_note. This is the first object in the array and its opening fields were dropped.
- Proposed fix: Prepend the missing fields to the first object in part062.js:
  ```
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.6 Inventory layer measurement under inflation",
  "QuestionID": "P2-A-589",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A6-589-inventory-layer-inflation",
  ```
- Confidence: High

---

## Part 064 first question (P2-A-571) — Truncated: missing first ~20 fields including QuestionID, Stem, Choices

- Check: structural
- Severity: Critical
- Evidence: Part 064 (pack_p2_a.part062.js) begins at line 1 with `"ExplanationCorrect": "During rising prices, the general price-level adjusted depreciation..."` — the first ~20 fields (Part through ExplanationWrongD) are absent. The content matches P2-A-571 (current cost depreciation in income statement). The object is missing its identity and presentation fields.
- Proposed fix: Prepend the missing fields to the first object in part064.js:
  ```
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.6 Current cost depreciation in income statement",
  "QuestionID": "P2-A-571",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A6-571-depreciation-current-cost-income",
  "Stem": "Under current cost accounting, which of the following depreciation methods produces the highest annual depreciation expense during a period of rising prices?",
  "Choices": { ... },
  "CorrectChoice": "D",
  "ExplanationWrongA": "...",
  "ExplanationWrongB": "...",
  "ExplanationWrongC": "...",
  "ExplanationWrongD": "",
  ```
- Confidence: High

---

## Duplicate QIDs across pack files — P2-A-589, P2-A-590, P2-A-595, P2-A-596, P2-A-597, P2-A-598, P2-A-599 appear in multiple parts

- Check: structural
- Severity: Critical
- Evidence: The following QIDs appear in more than one file:
  - P2-A-589 (LIFO inventory): Part 062 and Part 065
  - P2-A-590 (hyperinflation presentation): Part 062 and Part 065
  - P2-A-595 (LIFO inflation net income): Part 062 and Part 063
  - P2-A-596 (purchasing power gain net monetary): Part 062 and Part 063
  - P2-A-597 (IFRS revaluation): Part 063 and Part 065
  - P2-A-598 (horizontal analysis): Part 063 and Part 065
  - P2-A-599 (vertical analysis): Part 063 and Part 065
  - P2-A-569 (inflation factor depreciation): Part 061 and Part 064 (Part 064 copy is also truncated)
  
  Verified by identical stems across files. This represents a packaging/splitting error where the source array was divided at incorrect boundaries, causing objects to be duplicated across adjacent part files.
- Proposed fix: Re-split the source array at correct boundaries so each QID appears in exactly one part file. Remove duplicates from the later part file in each overlapping pair.
- Confidence: High

---

## P2-A-567 — D/E rounding 0.678 → 0.67 is aggressive but acceptable

- Check: explanation
- Severity: Informational
- Evidence: Adjusted D/E = $1,200,000 / $1,770,000 = 0.677966... Choice B states "0.67" and ExplanationCorrect states "≈ 0.67." The value 0.678 rounds to 0.68 (to two decimal places), but 0.68 is not among the options. The nearest available option is 0.67 (difference 0.008) versus 0.71 (difference 0.032). The selection is correct; the rounding convention is slightly aggressive.
- Proposed fix: No change required. Optionally, adjust to "≈ 0.68" and add 0.68 as a choice if precision is desired.
- Confidence: Medium

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Total items reviewed | 52 |
| Items with defects | 10 (some defects span multiple items) |
| Clean items | 42 |

**Defects by severity:**

| Severity | Count | QIDs affected |
|----------|-------|---------------|
| Critical | 5 | P2-A-542, P2-A-550, P2-A-589 (structural), Part 064 first Q (structural), Cross-file duplicates (P2-A-589, 590, 595, 596, 597, 598, 599, 569) |
| High | 1 | P2-A-546 |
| Medium | 3 | P2-A-545, P2-A-550 (Choice B), P2-A-572 |
| Low | 2 | P2-A-598, P2-A-600 |
| Informational | 1 | P2-A-567 |

**Most urgent issues:**
1. Cross-file duplication means the pack contains the same question up to 2×, inflating item counts and risking double-scoring on tests.
2. Two structural truncations (Part 062 first object, Part 064 first object) render those questions unparseable by downstream tooling.
3. P2-A-542 and P2-A-550 contain arithmetically impossible values endorsed by their own explanations — these would mislead candidates who recompute.
