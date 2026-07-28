# DL-010 Repository-Wide Scan Report

**Date:** 2026-07-22
**Scope:** 5 pack files (2,500 questions), 0 case files (case items lack ExplanationWrong* fields)
**Methodology:** Heuristic scan: explicit option-letter references (with word boundary), numeric cross-check, verbatim phrase detection, praise/polarity detection

## Triage Protocol

### Summary

| Pack | Findings | True DL-010 (High Conf) | DL-007 Variant | False Positives |
|------|----------|------------------------|----------------|-----------------|
| pack_a | 428 | 69 (39 numeric + 30 praise) | ~200 | ~159 |
| pack_b | 95 | 25 (13 numeric + 12 praise) | ~2 | ~68 |
| pack_c | 699 | 13 (9 numeric + 4 praise) | ~320 | ~366 |
| pack_d | 717 | 17 (17 numeric + 0 praise) | ~310 | ~390 |
| pack_e | 75 | 1 (0 numeric + 1 praise) | ~0 | ~74 |
| **Total** | **2,038** | **125** | **~832** | **~1,081** |

### Definitions

- **True DL-010 (High Confidence):** `PRAISES_CHOICE` (explanation calls distractor "correct") or `NUMERIC_MISMATCH` (explanation uses correct-answer numbers, not distractor numbers). These are genuine misassignments — the explanation text describes the correct answer or another distractor, not the assigned choice.
- **DL-007 Variant:** `VERBATIM_MATCH` where the explanation uses the DL-007 template boilerplate ("represents a plausible misconception...the correct analysis leads to the conclusion that..."). The template references the correct answer's terminology, which is legitimate for contrast explanations but indicative of low-quality generic templates.
- **False Positive:** `VERBATIM_MATCH` where the explanation legitimately contrasts the wrong choice with the correct concept (e.g., "This is wrong because the correct answer requires XYZ"). These are correctly written distractor explanations.

### Bucketing for Remediation (125 True DL-010)

| Bucket | Criteria | Count | Packs Affected | Fix Approach |
|--------|----------|-------|---------------|--------------|
| **1 — Mechanical** | Explanation text is the correct-answer calculation copied into a wrong slot (NUMERIC_MISMATCH where wrong-answer differs from correct-answer computation) | ~78 | A(39), B(13), C(9), D(17) | Move explanation text from ExplanationWrong[X] to ExplanationCorrect (or vice versa); clear the wrong slot |
| **2 — Requires Editorial Judgment** | Explanation text praises the wrong choice (PRAISES_CHOICE) — needs case-by-case rewrite | ~47 | A(30), B(12), C(4), E(1) | Rewrite to explain why the choice is wrong, not why it's right |
| **3 — DL-007 Template Bulk Rewrite** | Generic template text with correct-answer boilerplate — not true DL-010 but low quality | ~832 | A(~200), C(~320), D(~310) | Flag for DL-007 remediation sweep (existing defect class) |

### Recommended Order of Operations

1. **Bucket 1 first** (78 mechanical fixes) — highest correctness impact, fastest fix (known correct-answer text, just needs slot relocation)
2. **Bucket 2 second** (47 editorial fixes) — moderate effort, high educational impact
3. **Bucket 3 deferred** (832 template artifacts) — already tracked under DL-007 remediation queue

### Pack-by-Pack Priority

| Priority | Pack | True DL-010 | Primary Issue |
|----------|------|-------------|---------------|
| 1 | pack_a | 69 | 39 numeric mismatches + 30 template-praise hybrids |
| 2 | pack_d | 17 | 17 numeric mismatches (all Section F — technology/analytics) |
| 3 | pack_b | 25 | 13 numeric + 12 praise (scattered across sections) |
| 4 | pack_c | 13 | 9 numeric + 4 praise |
| 5 | pack_e | 1 | 1 praise (isolated) |

**Overall Assessment:** DL-010 is repository-wide but concentrated in numeric calculation items (NUMERIC_MISMATCH pattern). The EXPLICIT_REF pattern was a false positive artifact (regex matched "option b" inside "option by"). True DL-010 count is **125** — above the isolated-case threshold but manageable alongside other remediation workstreams.

---

## Post-Scan Reassessment (2026-07-22)

**NUMERIC_MISMATCH findings (78 in Bucket 1):** All are **false positives**. The scanner flagged any explanation that referenced the correct answer's numbers, but this is a legitimate pedagogical technique — contrast explanations naturally state the correct calculation when explaining why a distractor is wrong. Example: P1B-A-086's ExplanationWrongA says "Correct: ... = $2,475,000" to explain why choice A ($2,800,000) omits the treasury stock deduction. This correctly addresses the distractor.

**PRAISES_CHOICE findings (47 in Bucket 2):** Mostly false positives or borderline. Many start with "While [partial truth] is correct, [the overall choice] is wrong because..." — acknowledging partial correctness before explaining the error is legitimate pedagogy. A few may warrant editorial review.

**Confirmed true DL-010 count: 1** (P1-A-029 — already fixed in Wave 2). The remaining findings are all contrast explanations, not misassignments.

**Revised bucket disposition:**
- Bucket 1 (78 NUMERIC_MISMATCH): **No action** — all false positives, legitimate content
- Bucket 2 (47 PRAISES_CHOICE): Defer to editorial review during Pack B/D/E waves
- Bucket 3 (~832 DL-007 artifacts): Merge into existing DL-007 workstream as planned

**DL-010 sweep not needed.** Move to Priority 2 (remaining 43 case verifications) and Priority 3 (DL-009 Pack C remediation).

## Strategic Methodology Note

**Observation:** The DL-010 (misassigned explanations) scan surfaced approximately 832 DL-007-in-disguise findings as a byproduct — template boilerplate explanations where the text correctly addressed the assigned distractor but used a generic "represents a plausible misconception...the correct analysis leads to the conclusion that..." structure.

**Implication:** DL-007 is more systemic than the 54% Pack A figure from earlier waves suggested. The template was used across all packs, not just Pack A. These 832 items should be merged into the existing DL-007 remediation workstream rather than treated as a new defect class.

**Future recommendation:** Defect scans should be designed to report "not the target defect but here's what this is" categories alongside their primary findings. Filtering to signal-only (i.e., showing only true DL-010 matches) would have hidden the systemic DL-007 pattern that the scan revealed as a byproduct. Future scanners should include a "collateral findings" section.

---

=== DL-010 Repository-Wide Scan ===

pack_a_corrected.js: 500 questions loaded
  DL-010 findings: 428
  [P1-A-001] slot ExplanationWrongA
    Choice: "Omit it if the invoice has not been paid"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"
  [P1-A-001] slot ExplanationWrongB
    Choice: "Classify it as noncurrent solely because management expects renewal"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"
  [P1-A-001] slot ExplanationWrongD
    Choice: "Report it as equity because suppliers are involved"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"
  [P1-A-002] slot ExplanationWrongA
    Choice: "Combine it with continuing operations until cash is collected"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Present the component separately"
  [P1-A-002] slot ExplanationWrongB
    Choice: "Classify it as extraordinary gain or loss"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Present the component separately"
    ... and 423 more

pack_b_corrected.js: 500 questions loaded
  DL-010 findings: 95
  [P1B-A-083] slot ExplanationWrongC
    Choice: "History of similar contracts"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "and right to payment"
  [P1B-A-083] slot ExplanationWrongD
    Choice: "Customer controls the asset as created"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "No alternative use and"
  [P1B-A-085] slot ExplanationWrongB
    Choice: "Both as intangible assets"
    Flags: PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)
  [P1B-A-086] slot ExplanationWrongA
    Choice: "$2,800,000"
    Flags: NUMERIC_MISMATCH: explanation uses correct-answer numbers (2475000) not distractor numbers
  [P1B-A-090] slot ExplanationWrongB
    Choice: "Current asset held-for-sale at $3,000,000"
    Flags: PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)
    ... and 90 more

pack_c_corrected.js: 500 questions loaded
  DL-010 findings: 699
  [P1-AC-002] slot ExplanationWrongA
    Choice: "Recognize the entire premium as revenue at issuance"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"
  [P1-AC-002] slot ExplanationWrongC
    Choice: "Add the premium to interest expense each period"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"
  [P1-AC-002] slot ExplanationWrongD
    Choice: "Ignore the premium since it does not affect cash flows"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"
  [P1-AC-003] slot ExplanationWrongA
    Choice: "Ignore the premium since it does not affect cash flows"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"
  [P1-AC-003] slot ExplanationWrongB
    Choice: "Add the premium to interest expense each period"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"
    ... and 694 more

pack_d_corrected.js: 500 questions loaded
  DL-010 findings: 741
  [P1-AD-002] slot ExplanationWrongA
    Choice: "As an increase to accounts payable"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"
  [P1-AD-002] slot ExplanationWrongC
    Choice: "As a loan collateralized by receivables, with no change to the receivables balance"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"
  [P1-AD-002] slot ExplanationWrongD
    Choice: "As a reduction of revenue for the period"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"
  [P1-AD-003] slot ExplanationWrongA
    Choice: "As a loan collateralized by receivables, with no change to the receivables balance"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"
  [P1-AD-003] slot ExplanationWrongB
    Choice: "As a reduction of revenue for the period"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"
    ... and 736 more

pack_e_corrected.js: 500 questions loaded
  DL-010 findings: 75
  [P1E-A-001] slot ExplanationWrongA
    Choice: "To show cash flows"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "financial position at a"
  [P1E-A-001] slot ExplanationWrongD
    Choice: "To show profitability over time"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "financial position at a"
  [P1E-A-004] slot ExplanationWrongC
    Choice: "Cash is received"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Performance obligation is satisfied"
  [P1E-A-015] slot ExplanationWrongD
    Choice: "Fair value with unrealized G/L in OCI"
    Flags: EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "Fair value with unrealized"
  [P1E-A-023] slot ExplanationWrongA
    Choice: "Gross profit divided by common shares"
    Flags: VERBATIM_MATCH: explanation contains text from correct choice "Net income minus preferred"
    ... and 70 more

=== TOTAL: 2038 DL-010 findings across 5 packs ===

ASSESSMENT: >20 findings ΓÇö triage protocol required
Recommendation: Bucket by fix confidence
  Mechanical (explicit ref mismatch): 0
  High confidence (numeric mismatch): 78
  Medium confidence (verbatim match): 1874
  Review required (praises wrong): 47

--- pack_a_corrected.js ΓÇö 428 findings ---

P1-A-001 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Omit it if the invoice has not been paid"
  Explanation: "Option A (Omit it if the invoice has not been paid) is incorrect. Under ASC 210 (Balance Sheet), the correct treatment requires classify the obligatio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"

P1-A-001 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify it as noncurrent solely because management expects renewal"
  Explanation: "Option B (Classify it as noncurrent solely because management expects renewal) represents a plausible misconception. Under ASC 210 (Balance Sheet), th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"

P1-A-001 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Report it as equity because suppliers are involved"
  Explanation: "Option D (Report it as equity because suppliers are involved) represents a plausible misconception. Under ASC 210 (Balance Sheet), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the obligation as"

P1-A-002 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Combine it with continuing operations until cash is collected"
  Explanation: "Option A (Combine it with continuing operations until cash is collected) represents a plausible misconception. Under ASC 205 (Income Statement), the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the component separately"

P1-A-002 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify it as extraordinary gain or loss"
  Explanation: "Option B (Classify it as extraordinary gain or loss) is incorrect. Under ASC 205 (Income Statement), the correct treatment requires present the compon..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the component separately"

P1-A-002 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Report it only in footnotes because the sale is future-oriented"
  Explanation: "Option C (Report it only in footnotes because the sale is future-oriented) represents a plausible misconception. Under ASC 205 (Income Statement), the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the component separately"

P1-A-007 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Report gross receivables with no allowance disclosure"
  Explanation: "GAAP requires the allowance method for material receivables. Reporting gross receivables without an allowance overstates assets and fails to present r..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "receivables at net realizable"

P1-A-008 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Ignore declines unless inventory has been sold"
  Explanation: "GAAP requires recognition of inventory declines when they occur, not when the inventory is sold. The lower of cost and NRV test must be applied at eac..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of cost"

P1-A-008 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Use lower of cost or market for all inventory methods without considering method differences"
  Explanation: "Under current GAAP, FIFO and average-cost inventory is measured at the lower of cost and NRV (the old LCM rule with a market ceiling/floor no longer a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of cost"

P1-A-008 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Write inventory up to replacement cost when market prices rise"
  Explanation: "Inventory write-ups are not permitted under GAAP. The lower of cost and NRV rule only recognizes declines; recoveries are recognized only as reduction..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of cost"

P1-A-009 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Assume LIFO liquidation always decreases income"
  Explanation: "Option A (Assume LIFO liquidation always decreases income) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires recogn..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that older low-cost"

P1-A-009 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Restate prior-year inventory balances to FIFO automatically"
  Explanation: "Option B (Restate prior-year inventory balances to FIFO automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that older low-cost"

P1-A-009 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Treat the layer liquidation as an investing cash flow"
  Explanation: "Option D (Treat the layer liquidation as an investing cash flow) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that older low-cost"

P1-A-013 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Never adjust financial statements for information received after year-end"
  Explanation: "Under ASC 855, Type I subsequent events (conditions that existed at the balance sheet date) require adjustment of the financial statements. The custom..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "at the balance sheet"

P1-A-014 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Recognize no balance sheet amounts for operating leases"
  Explanation: "This was the treatment under the former lease standard (ASC 840), which kept operating leases off the balance sheet. Under ASC 842, virtually all leas..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a right-of-use asset and"

P1-A-014 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Record rent only when paid with no liability"
  Explanation: "ASC 842 requires the lessee to recognize a right-of-use asset and lease liability at lease commencement. Cash-basis recognition (recording rent only w..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-A-018 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Report noncontrolling interest as revenue"
  Explanation: "Option A (Report noncontrolling interest as revenue) represents a plausible misconception. Under ASC 810 (Noncontrolling Interests), the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the 20% noncontrolling"
    - VERBATIM_MATCH: explanation contains text from choice B "Report noncontrolling interest as"

P1-A-018 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Report noncontrolling interest as a current liability"
  Explanation: "Option B (Report noncontrolling interest as a current liability) is incorrect. Under ASC 810 (Noncontrolling Interests), the correct treatment require..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the 20% noncontrolling"
    - VERBATIM_MATCH: explanation contains text from choice A "Report noncontrolling interest as"

P1-A-018 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Exclude 20% of subsidiary assets and liabilities from consolidation"
  Explanation: "Option D (Exclude 20% of subsidiary assets and liabilities from consolidation) represents a plausible misconception. Under ASC 810 (Noncontrolling Int..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Present the 20% noncontrolling"

P1-A-022 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Assume U.S. GAAP always capitalizes research costs"
  Explanation: "Option C is incorrect on two levels. First, U.S. GAAP does not capitalize research costs ΓÇö it expenses all research costs as incurred under ASC 730 (R..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "GAAP is generally more"

P1-A-022 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Assume both frameworks always expense all development costs"
  Explanation: "Option D is incorrect because IFRS does permit capitalization of qualifying development costs when certain conditions are met under IAS 38 (technical ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "permit capitalization of qualifying"

P1-A-023 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify it as a cash flow hedge"
  Explanation: "Hedge accounting classification (cash flow, fair value, or net investment) is unrelated to the fair value hierarchy. The hierarchy classifies inputs, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the fair value hierarchy"

P1-A-024 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Exclude it from cash equivalents until sold"
  Explanation: "Cash equivalents are not excluded until sold. The key criterion is original maturity of three months or less at acquisition date, not the holding peri..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "original maturity of three"

P1-A-044 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Record nothing because warranties are estimates"
  Explanation: "Option A (Record nothing because warranties are estimates) represents a plausible misconception. Under ASC 450 (Contingencies), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Accrue the best estimate"

P1-A-044 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Accrue $124,200 because it is the highest possible amount"
  Explanation: "Option B (Accrue $124,200 because it is the highest possible amount) represents a plausible misconception. Under ASC 450 (Contingencies), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Accrue the best estimate"

P1-A-044 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Recognize the loss only when customers file claims"
  Explanation: "Option C (Recognize the loss only when customers file claims) represents a plausible misconception. Under ASC 450 (Contingencies), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Accrue the best estimate"

P1-A-045 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$2.79"
  Explanation: "This choice does not match the correct EPS. Basic EPS = (NI - Preferred dividends) / Weighted-average shares = ($240,000 - $21,000) / 78,000 = $2.81."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2.81) not distractor numbers

P1-A-054 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Disclose the loss in the financial statement notes but do not accrue"
  Explanation: "Under ASC 450-20, loss contingencies are classified into three probability levels: probable, reasonably possible, and remote. When a loss is reasonabl..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "the nature of the"

P1-B-001 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Eliminate nonfinancial goals from planning"
  Explanation: "Option A (Eliminate nonfinancial goals from planning) represents a plausible misconception. Under Strategic planning process, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Align tactical plans and"

P1-B-001 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Use only last year actual spending as the strategic plan"
  Explanation: "Option B (Use only last year actual spending as the strategic plan) represents a plausible misconception. Under Strategic planning process, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Align tactical plans and"

P1-B-001 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Prepare departmental budgets without reference to strategy"
  Explanation: "Option C (Prepare departmental budgets without reference to strategy) represents a plausible misconception. Under Strategic planning process, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Align tactical plans and"

P1-B-002 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Treat it as a forecasting method rather than a budgeting approach"
  Explanation: "Option A (Treat it as a forecasting method rather than a budgeting ...) is incorrect. Under Budgeting concepts and methodologies, the correct treatmen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that top-down budgeting"

P1-B-002 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Assume it is prohibited under CMA Part 1"
  Explanation: "Option C (Assume it is prohibited under CMA Part 1) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that top-down budgeting"

P1-B-002 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Assume top-down budgeting always eliminates slack"
  Explanation: "Option D (Assume top-down budgeting always eliminates slack) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that top-down budgeting"

P1-B-003 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use only prior-year actuals as the budget"
  Explanation: "Option A (Use only prior-year actuals as the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use review and incentives"

P1-B-003 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ban participation because it always creates fraud"
  Explanation: "Option C (Ban participation because it always creates fraud) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use review and incentives"

P1-B-003 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Accept all submitted budgets because managers are always unbiased"
  Explanation: "Option D (Accept all submitted budgets because managers are always unbiased) represents a plausible misconception. Under Budgeting concepts and method..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use review and incentives"

P1-B-004 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use rolling budgets only for capital projects"
  Explanation: "Option A (Use rolling budgets only for capital projects) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Add a new future"

P1-B-004 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Replace the budget only after a recession"
  Explanation: "Option C (Replace the budget only after a recession) is incorrect. Under Budgeting concepts and methodologies, the correct treatment requires add a ne..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Add a new future"

P1-B-004 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Freeze the budget for the entire strategic plan period"
  Explanation: "Option D (Freeze the budget for the entire strategic plan period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Add a new future"

P1-B-005 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Budget only variable costs and ignore fixed costs"
  Explanation: "Option A (Budget only variable costs and ignore fixed costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate each activity and"

P1-B-005 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Increase every line item by inflation only"
  Explanation: "Option B (Increase every line item by inflation only) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate each activity and"

P1-B-005 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use zero-based budgeting only when sales are zero"
  Explanation: "Option D (Use zero-based budgeting only when sales are zero) is incorrect. Under Budgeting concepts and methodologies, the correct treatment requires ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate each activity and"

P1-B-006 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use only direct labor hours for every cost pool"
  Explanation: "Option A (Use only direct labor hours for every cost pool) is incorrect. Under Budgeting concepts and methodologies, the correct treatment requires bu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget costs by estimating"

P1-B-006 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Ignore cost drivers because they are used only in financial accounting"
  Explanation: "Option B (Ignore cost drivers because they are used only in financial accounting) represents a plausible misconception. Under Budgeting concepts and m..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget costs by estimating"

P1-B-006 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Budget by multiplying last year total cost by the sales growth rate"
  Explanation: "Option D (Budget by multiplying last year total cost by the sales growth rate) represents a plausible misconception. Under Budgeting concepts and meth..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget costs by estimating"

P1-B-007 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Eliminate all volume effects by ignoring output"
  Explanation: "Option A (Eliminate all volume effects by ignoring output) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare actual results with"

P1-B-007 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Compare actual results only with the static budget"
  Explanation: "Option C (Compare actual results only with the static budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare actual results with"

P1-B-007 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use the master budget unchanged for all variance analysis"
  Explanation: "Option D (Use the master budget unchanged for all variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare actual results with"

P1-B-009 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Record planned borrowing as sales revenue"
  Explanation: "Option A (Record planned borrowing as sales revenue) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the cash budget"

P1-B-009 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Ignore the shortfall if the income statement is profitable"
  Explanation: "Option B (Ignore the shortfall if the income statement is profitable) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the cash budget"

P1-B-009 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use only accrual income to decide cash availability"
  Explanation: "Option C (Use only accrual income to decide cash availability) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the cash budget"

P1-B-012 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Select only the best-case outcome because it is possible"
  Explanation: "Option A (Select only the best-case outcome because it is possible) represents a plausible misconception. Under Expected value analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compute the probability-weighted average"

P1-B-012 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Record the expected value as guaranteed revenue"
  Explanation: "Option B (Record the expected value as guaranteed revenue) represents a plausible misconception. Under Expected value analysis, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compute the probability-weighted average"

P1-B-012 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ignore probabilities and use the most recent actual outcome"
  Explanation: "Option C (Ignore probabilities and use the most recent actual outcome) is incorrect. Under Expected value analysis, the correct treatment requires com..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compute the probability-weighted average"

P1-B-013 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Assume each unit always takes the same time regardless of experience"
  Explanation: "Option A (Assume each unit always takes the same time regardless of experience) represents a plausible misconception. Under Budgeting concepts and met..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Incorporate learning effects into"

P1-B-013 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the learning effect as a financing cost"
  Explanation: "Option C (Classify the learning effect as a financing cost) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Incorporate learning effects into"

P1-B-013 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use learning curves only for finished goods inventory valuation"
  Explanation: "Option D (Use learning curves only for finished goods inventory val...) is incorrect. Under Budgeting concepts and methodologies, the correct treatmen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Incorporate learning effects into"

P1-B-014 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Treat the price change as an internal control deficiency"
  Explanation: "Option A (Treat the price change as an internal control deficiency) is incorrect. Under Budgeting concepts and methodologies, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use sensitivity analysis to"

P1-B-014 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Use sensitivity analysis only after the fiscal year is closed"
  Explanation: "Option B (Use sensitivity analysis only after the fiscal year is closed) represents a plausible misconception. Under Budgeting concepts and methodolog..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use sensitivity analysis to"

P1-B-014 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ignore the assumption because budgets cannot be revised"
  Explanation: "Option C (Ignore the assumption because budgets cannot be revised) represents a plausible misconception. Under Budgeting concepts and methodologies, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use sensitivity analysis to"

P1-B-018 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "50,620 pounds"
  Explanation: "This choice adds desired ending inventory (4,820 lbs) to production needs but does not subtract beginning inventory (2,520 lbs). Purchases = 45,800 + ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (48100) not distractor numbers

P1-B-026 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Stop forecasting because actual demand differs from forecasts"
  Explanation: "Option A (Stop forecasting because actual demand differs from forec...) is incorrect. Under Forecasting techniques, the correct treatment requires ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze forecast errors to"

P1-B-026 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Treat every error as a fraud indicator"
  Explanation: "Option B (Treat every error as a fraud indicator) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze forecast errors to"

P1-B-026 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use only the month with the lowest error and ignore the rest"
  Explanation: "Option C (Use only the month with the lowest error and ignore the rest) represents a plausible misconception. Under Forecasting techniques, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze forecast errors to"

P1-B-027 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Prepare the cash budget before resolving sales quantities"
  Explanation: "Option A (Prepare the cash budget before resolving sales quantities) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use a budget committee"

P1-B-027 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use only external financial statements to set operating targets"
  Explanation: "Option C (Use only external financial statements to set operating targets) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use a budget committee"

P1-B-027 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Let each department use unrelated assumptions"
  Explanation: "Option D (Let each department use unrelated assumptions) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use a budget committee"

P1-B-028 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Record the supplier constraint as revenue"
  Explanation: "Option A (Record the supplier constraint as revenue) represents a plausible misconception. Under Continuous budgeting, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update forecasts and consider"

P1-B-028 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Ignore operational constraints unless year-end financial statements are issued"
  Explanation: "Option B (Ignore operational constraints unless year-end financial statements are issued) represents a plausible misconception. Under Continuous budge..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update forecasts and consider"

P1-B-028 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Keep all original assumptions because budgets can never change"
  Explanation: "Option D (Keep all original assumptions because budgets can never change) represents a plausible misconception. Under Continuous budgeting, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update forecasts and consider"

P1-B-030 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "55,840 pounds"
  Explanation: "This choice adds desired ending inventory (5,240 lbs) to production needs but does not subtract beginning inventory (2,640 lbs). Purchases = 50,600 + ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (53200) not distractor numbers

P1-B-038 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "480 units"
  Explanation: "This overstates the forecast and is not the average of 400, 460, and 520."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (460) not distractor numbers

P1-B-040 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Yes, because $9,000 exceeds the $10,000 threshold"
  Explanation: "Option A (Yes, because $9,000 exceeds the $10,000 threshold) represents a plausible misconception. Under Variance analysis, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "it should be investigated"

P1-B-040 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "No, because the variance is favorable"
  Explanation: "Option C (No, because the variance is favorable) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "it should be investigated"

P1-B-040 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Yes, but only if it recurs for two consecutive periods"
  Explanation: "Option D (Yes, but only if it recurs for two consecutive periods) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "it should be investigated"

P1-B-047 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for variance analysis"
  Explanation: "Option A (It eliminates the need for variance analysis) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps the planning"

P1-B-047 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees more accurate revenue forecasts"
  Explanation: "Option C (It guarantees more accurate revenue forecasts) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps the planning"

P1-B-047 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It reduces the total time spent on budgeting each year"
  Explanation: "Option D (It reduces the total time spent on budgeting each year) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps the planning"

P1-B-049 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Ignore seasonality and divide the annual total evenly across quarters"
  Explanation: "Option A (Ignore seasonality and divide the annual total evenly across quarters) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget each quarter based"

P1-B-049 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Budget the entire year's sales in Q4 only"
  Explanation: "Option C (Budget the entire year's sales in Q4 only) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget each quarter based"

P1-B-049 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use only the prior year's Q4 actuals to set the full annual budget"
  Explanation: "Option D (Use only the prior year's Q4 actuals to set the full annual budget) represents a plausible misconception. Under Budgeting concepts and metho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Budget each quarter based"

P1-B-051 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Direct materials purchases"
  Explanation: "Option A (Direct materials purchases) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions and advertising"

P1-B-051 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Factory overhead depreciation"
  Explanation: "Option B (Factory overhead depreciation) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions and advertising"

P1-B-051 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Direct labor for production workers"
  Explanation: "Option D (Direct labor for production workers) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions and advertising"

P1-B-053 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "19,950 units"
  Explanation: "This choice adds beginning inventory (3,140 units) instead of subtracting it. Beginning inventory is available from prior production and reduces, not ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (17458) not distractor numbers

P1-B-058 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$159,600"
  Explanation: "This overstates the forecast by $1,400; the equation gives $158,200."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (158200) not distractor numbers

P1-B-062 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "They are identical terms with no meaningful difference"
  Explanation: "Option A (They are identical terms with no meaningful difference) represents a plausible misconception. Under Learning curve analysis, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning curves apply only"
    - VERBATIM_MATCH: explanation contains text from choice C "curves apply only to"

P1-B-062 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Experience curves apply only to service industries"
  Explanation: "Option C (Experience curves apply only to service industries) represents a plausible misconception. Under Learning curve analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning curves apply only"

P1-B-062 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Learning curves increase over time while experience curves decrease"
  Explanation: "Option D (Learning curves increase over time while experience curves decrease) represents a plausible misconception. Under Learning curve analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning curves apply only"
    - VERBATIM_MATCH: explanation contains text from choice C "curves apply only to"

P1-B-063 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Sales budget"
  Explanation: "Option A (Sales budget) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis leads to the conclusion that cost..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost of goods sold"

P1-B-063 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Cash budget"
  Explanation: "Option C (Cash budget) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis leads to the conclusion that cost ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost of goods sold"

P1-B-063 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Capital expenditures budget"
  Explanation: "Option D (Capital expenditures budget) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost of goods sold"

P1-B-064 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "To intentionally understate fixed overhead application rates"
  Explanation: "Option A (To intentionally understate fixed overhead application rates) represents a plausible misconception. Under Budgeting concepts and methodologi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reflect realistic expected"

P1-B-064 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Because practical capacity is illegal to use for budgeting"
  Explanation: "Option C (Because practical capacity is illegal to use for budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reflect realistic expected"

P1-B-064 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate the need for a flexible budget"
  Explanation: "Option D (To eliminate the need for a flexible budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reflect realistic expected"

P1-B-065 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "21,750 units"
  Explanation: "This choice adds beginning inventory (3,380 units) instead of subtracting it. Beginning inventory is available from prior production and reduces, not ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (19066) not distractor numbers

P1-B-066 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "71,500 pounds"
  Explanation: "This choice adds desired ending inventory (6,500 lbs) to production needs but does not subtract beginning inventory (3,000 lbs). Purchases = 65,000 + ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (68500) not distractor numbers

P1-B-070 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$184,400"
  Explanation: "This overstates the result; the variable cost is $91,200, so the total is $182,800."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (182800) not distractor numbers

P1-B-071 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It is faster to prepare than incremental budgeting"
  Explanation: "Option A (It is faster to prepare than incremental budgeting) represents a plausible misconception. Under Financial statement ratio analysis, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It forces justification of"

P1-B-071 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "It prevents any changes to historical spending patterns"
  Explanation: "Option B (It prevents any changes to historical spending patterns) represents a plausible misconception. Under Financial statement ratio analysis, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It forces justification of"

P1-B-071 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It automatically increases departmental accountability without added effort"
  Explanation: "Option D (It automatically increases departmental accountability without added effort) represents a plausible misconception. Under Financial statement..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It forces justification of"

P1-B-073 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for a budget committee"
  Explanation: "Option A (To replace the need for a budget committee) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and responsibilities for the"

P1-B-073 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "To lock in budget figures so they cannot be revised"
  Explanation: "Option C (To lock in budget figures so they cannot be revised) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and responsibilities for the"

P1-B-073 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "To serve as the official financial statement filed with regulators"
  Explanation: "Option D (To serve as the official financial statement filed with regulators) represents a plausible misconception. Under Budgeting concepts and metho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and responsibilities for the"

P1-B-075 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It always produces more accurate forecasts than top-down budgeting"
  Explanation: "Option A (It always produces more accurate forecasts than top-down budgeting) represents a plausible misconception. Under Budgeting concepts and metho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The budgeting process can"

P1-B-075 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for a budget committee"
  Explanation: "Option C (It eliminates the need for a budget committee) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The budgeting process can"

P1-B-075 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees higher employee morale in every case"
  Explanation: "Option D (It guarantees higher employee morale in every case) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The budgeting process can"

P1-B-076 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Continue operating exactly per the original budget until the supplier resumes"
  Explanation: "Option A (Continue operating exactly per the original budget until the supplier resumes) represents a plausible misconception. Under ASC 450 (Continge..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Develop a contingency plan"

P1-B-076 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Cancel the annual budget entirely and operate without one"
  Explanation: "Option C (Cancel the annual budget entirely and operate without one) represents a plausible misconception. Under ASC 450 (Contingencies), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Develop a contingency plan"

P1-B-076 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait until year-end results to assess the impact"
  Explanation: "Option D (Wait until year-end results to assess the impact) represents a plausible misconception. Under ASC 450 (Contingencies), the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Develop a contingency plan"

P1-B-077 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "23,550 units"
  Explanation: "This choice adds beginning inventory (3,620 units) instead of subtracting it. Beginning inventory is available from prior production and reduces, not ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (20674) not distractor numbers

P1-B-078 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "76,720 pounds"
  Explanation: "This choice adds desired ending inventory (6,920 lbs) to production needs but does not subtract beginning inventory (3,120 lbs). Purchases = 69,800 + ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (73600) not distractor numbers

P1-B-082 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$179,600"
  Explanation: "This overstates the forecast by $1,300; the variable component is $81,900, so the total is $178,300."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (178300) not distractor numbers

P1-B-086 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Random forecasting error with no underlying cause"
  Explanation: "Option A (Random forecasting error with no underlying cause) represents a plausible misconception. Under Forecasting techniques, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A systematic bias that"

P1-B-086 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "The forecasting model is working correctly since some error is expected"
  Explanation: "Option C (The forecasting model is working correctly since some error is expected) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A systematic bias that"

P1-B-086 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Sales are becoming more volatile and unpredictable"
  Explanation: "Option D (Sales are becoming more volatile and unpredictable) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A systematic bias that"

P1-B-087 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "To ensure only the finance department has final approval authority"
  Explanation: "Option A (To ensure only the finance department has final approval authority) represents a plausible misconception. Under Budgeting concepts and metho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To coordinate assumptions and"

P1-B-087 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "To reduce the total number of people involved in budgeting"
  Explanation: "Option C (To reduce the total number of people involved in budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To coordinate assumptions and"

P1-B-087 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate the need for departmental input into the budget"
  Explanation: "Option D (To eliminate the need for departmental input into the budget) represents a plausible misconception. Under Budgeting concepts and methodologi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To coordinate assumptions and"

P1-B-088 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "To calculate net income for the period"
  Explanation: "Option A (To calculate net income for the period) represents a plausible misconception. Under ASC 210 (Balance Sheet), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To project the financial"

P1-B-088 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "To show only cash inflows and outflows"
  Explanation: "Option C (To show only cash inflows and outflows) represents a plausible misconception. Under ASC 210 (Balance Sheet), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To project the financial"

P1-B-088 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for the budgeted income statement"
  Explanation: "Option D (To replace the need for the budgeted income statement) represents a plausible misconception. Under ASC 210 (Balance Sheet), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To project the financial"

P1-B-089 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "25,350 units"
  Explanation: "This choice adds beginning inventory (3,860 units) instead of subtracting it. Beginning inventory is available from prior production and reduces, not ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (22282) not distractor numbers

P1-B-090 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "81,940 pounds"
  Explanation: "This choice adds desired ending inventory (7,340 lbs) to production needs but does not subtract beginning inventory (3,240 lbs). Purchases = 74,600 + ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (78700) not distractor numbers

P1-B-097 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Continue using the original budget without changes for consistency"
  Explanation: "Option A (Continue using the original budget without changes for consistency) represents a plausible misconception. Under Budgeting concepts and metho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Formally revise the budget"

P1-B-097 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Wait until year-end to make any adjustments"
  Explanation: "Option C (Wait until year-end to make any adjustments) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Formally revise the budget"

P1-B-097 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Replace the budget entirely with a strategic plan"
  Explanation: "Option D (Replace the budget entirely with a strategic plan) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Formally revise the budget"

P1-B-098 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$85,000"
  Explanation: "This choice does not match the correct disbursement calculation. March disbursements = 60% of March purchases + 40% of February purchases = 60% x $95,..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (89000) not distractor numbers

P1-B-098 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$91,000"
  Explanation: "This choice does not match the correct disbursement calculation. March disbursements = 60% of March purchases + 40% of February purchases = 60% x $95,..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (89000) not distractor numbers

P1-B-100 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Price variance and volume variance"
  Explanation: "Option A (Price variance and volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Price (rate) variance and"

P1-B-100 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Spending variance and capacity variance only"
  Explanation: "Option C (Spending variance and capacity variance only) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Price (rate) variance and"

P1-B-100 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Sales variance and mix variance"
  Explanation: "Option D (Sales variance and mix variance) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Price (rate) variance and"

P1-C-002 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Investigate only variances caused by accounting staff"
  Explanation: "Option A (Investigate only variances caused by accounting staff) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Focus management attention on"

P1-C-002 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Investigate every variance equally regardless of size"
  Explanation: "Option C (Investigate every variance equally regardless of size) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Focus management attention on"

P1-C-002 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore favorable variances because they are always good"
  Explanation: "Option D (Ignore favorable variances because they are always good) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Focus management attention on"

P1-C-003 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Hold the manager responsible for corporate interest rates"
  Explanation: "Option A (Hold the manager responsible for corporate interest rates) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assess costs and revenues"

P1-C-003 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Evaluate only company-wide net income"
  Explanation: "Option B (Evaluate only company-wide net income) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires assess costs and..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assess costs and revenues"

P1-C-003 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore cost behavior and responsibility boundaries"
  Explanation: "Option D (Ignore cost behavior and responsibility boundaries) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assess costs and revenues"

P1-C-004 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Evaluate the department primarily by sales growth"
  Explanation: "Option A (Evaluate the department primarily by sales growth) represents a plausible misconception. Under Cost center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate efficiency and service"

P1-C-004 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Use residual income as the only measure"
  Explanation: "Option B (Use residual income as the only measure) represents a plausible misconception. Under Cost center management, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate efficiency and service"

P1-C-004 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore nonfinancial service measures"
  Explanation: "Option D (Ignore nonfinancial service measures) represents a plausible misconception. Under Cost center management, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate efficiency and service"

P1-C-005 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Exclude revenue because profit centers manage only costs"
  Explanation: "Option A (Exclude revenue because profit centers manage only costs) represents a plausible misconception. Under Profit center management, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate operating profit and"

P1-C-005 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Evaluate only asset turnover"
  Explanation: "Option C (Evaluate only asset turnover) represents a plausible misconception. Under Profit center management, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate operating profit and"

P1-C-005 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Charge the manager with corporate financing decisions"
  Explanation: "Option D (Charge the manager with corporate financing decisions) is incorrect. Under Profit center management, the correct treatment requires evaluate..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Evaluate operating profit and"

P1-C-007 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Replace budgets with a single production volume measure"
  Explanation: "Option A (Replace budgets with a single production volume measure) represents a plausible misconception. Under Balanced Scorecard framework, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning/growth perspectives linked"

P1-C-007 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Include only measures required by tax law"
  Explanation: "Option B (Include only measures required by tax law) is incorrect. Under Balanced Scorecard framework, the correct treatment requires use financial, c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning/growth perspectives linked"

P1-C-007 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use only stock price changes"
  Explanation: "Option D (Use only stock price changes) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning/growth perspectives linked"

P1-C-009 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Copy another plant without considering process differences"
  Explanation: "Option A (Copy another plant without considering process differences) represents a plausible misconception. Under Benchmarking, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use benchmarking to identify"

P1-C-009 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Use benchmarking solely to calculate depreciation"
  Explanation: "Option B (Use benchmarking solely to calculate depreciation) represents a plausible misconception. Under Benchmarking, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use benchmarking to identify"

P1-C-009 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Benchmark only against the lowest-performing unit"
  Explanation: "Option C (Benchmark only against the lowest-performing unit) represents a plausible misconception. Under Benchmarking, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use benchmarking to identify"

P1-C-010 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use only gross profit from external statements"
  Explanation: "Option A (Use only gross profit from external statements) is incorrect. Under Quality management, the correct treatment requires track defect rates, r..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and customer complaints alongside"

P1-C-010 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Record complaints as current liabilities automatically"
  Explanation: "Option B (Record complaints as current liabilities automatically) represents a plausible misconception. Under Quality management, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and customer complaints alongside"

P1-C-010 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ignore quality metrics unless a claim is paid"
  Explanation: "Option C (Ignore quality metrics unless a claim is paid) represents a plausible misconception. Under Quality management, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and customer complaints alongside"

P1-C-012 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Lower the cost of capital to zero for all projects"
  Explanation: "Option A (Lower the cost of capital to zero for all projects) represents a plausible misconception. Under Residual income, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use residual income to"

P1-C-012 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Evaluate only sales volume"
  Explanation: "Option C (Evaluate only sales volume) is incorrect. Under Residual income, the correct treatment requires use residual income to reduce the incentive ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use residual income to"

P1-C-012 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use gross margin percentage as the only investment center measure"
  Explanation: "Option D (Use gross margin percentage as the only investment center measure) represents a plausible misconception. Under Residual income, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use residual income to"

P1-C-013 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Measure productivity only with financial ratios"
  Explanation: "Option A (Measure productivity only with financial ratios) represents a plausible misconception. Under Enterprise resource planning (ERP) systems, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize productivity improved because"

P1-C-013 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Assume productivity fell because total output increased"
  Explanation: "Option C (Assume productivity fell because total output increased) represents a plausible misconception. Under Enterprise resource planning (ERP) syst..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize productivity improved because"

P1-C-013 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore input quantities"
  Explanation: "Option D (Ignore input quantities) is incorrect. Under Enterprise resource planning (ERP) systems, the correct treatment requires recognize productivi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize productivity improved because"

P1-C-016 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$3,036 favorable"
  Explanation: "The amount is correct, but the direction is wrong. Paying $7.60 instead of the $7.00 standard is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-017 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$780 favorable"
  Explanation: "The amount is correct, but using more material than the standard allows is unfavorable, not favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-018 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$56,925 unfavorable"
  Explanation: "This is total actual labor cost, 2,475 x $23, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2475) not distractor numbers

P1-C-018 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$54,450 unfavorable"
  Explanation: "This is labor cost at the standard rate, 2,475 x $22, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2475) not distractor numbers

P1-C-019 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$1,536 unfavorable"
  Explanation: "The dollar amount is correct, but the direction is wrong. Fewer actual hours than standard hours is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-020 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$4,400 favorable"
  Explanation: "The amount is correct, but the direction is wrong. Actual cost exceeded the flexible budget, so the variance is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-023 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$3,160 unfavorable"
  Explanation: "The amount is correct, but the direction is wrong. Higher flexible-budget contribution than static budget is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-024 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use only the easiest measures to collect"
  Explanation: "Option A (Use only the easiest measures to collect) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Select measures that show"

P1-C-024 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Choose unrelated measures because balance is more important than strategy"
  Explanation: "Option B (Choose unrelated measures because balance is more important than strategy) represents a plausible misconception. Under Balanced Scorecard fr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Select measures that show"

P1-C-024 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Remove financial measures entirely"
  Explanation: "Option C (Remove financial measures entirely) is incorrect. Under Balanced Scorecard framework, the correct treatment requires select measures that sh..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Select measures that show"

P1-C-025 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Refuse all internal transfers if market price is unavailable"
  Explanation: "Option A (Refuse all internal transfers if market price is unavailable) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A transfer price near"

P1-C-025 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Set the transfer price equal to corporate income tax expense"
  Explanation: "Option B (Set the transfer price equal to corporate income tax expense) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A transfer price near"

P1-C-025 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use full cost plus markup because idle capacity is irrelevant"
  Explanation: "Option D (Use full cost plus markup because idle capacity is irrele...) is incorrect. Under CMA Part 1 accounting principles, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A transfer price near"

P1-C-026 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Measure only consolidated net income"
  Explanation: "Option A (Measure only consolidated net income) is incorrect. Under Key performance indicators, the correct treatment requires use kpis such as pickin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-026 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Evaluate supervisors primarily on corporate ROE"
  Explanation: "Option B (Evaluate supervisors primarily on corporate ROE) represents a plausible misconception. Under Key performance indicators, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-026 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use supplier stock price as the warehouse KPI"
  Explanation: "Option C (Use supplier stock price as the warehouse KPI) represents a plausible misconception. Under Key performance indicators, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-028 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$3,468 favorable"
  Explanation: "The amount is correct, but paying above standard is unfavorable, not favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-030 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$61,050 unfavorable"
  Explanation: "This is standard labor cost, 2,775 hours x $22, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2775) not distractor numbers

P1-C-030 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$63,825 unfavorable"
  Explanation: "This is actual labor cost, 2,775 hours x $23. The question asks for the rate variance, not total actual labor cost."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2775) not distractor numbers

P1-C-033 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "15.9%"
  Explanation: "This understates the return; the correct ROI is 18.9%."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (18.9) not distractor numbers

P1-C-035 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$3,400 unfavorable"
  Explanation: "The amount is correct, but the direction is wrong. Flexible-budget contribution is higher than static-budget contribution, so the variance is favorabl..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-036 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Financial perspective"
  Explanation: "Option A (Financial perspective) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning and growth perspective"

P1-C-036 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Customer perspective"
  Explanation: "Option B (Customer perspective) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning and growth perspective"

P1-C-036 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Internal business process perspective"
  Explanation: "Option C (Internal business process perspective) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Learning and growth perspective"

P1-C-037 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$25 (variable cost), since idle capacity means no opportunity cost"
  Explanation: "Transfer pricing minimum = variable cost plus opportunity cost. Because the selling division has excess capacity, an internal transfer does not displa..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "division has excess capacity"

P1-C-038 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Evaluate supervisors primarily on corporate ROE"
  Explanation: "Option A (Evaluate supervisors primarily on corporate ROE) is incorrect. Under Key performance indicators, the correct treatment requires use kpis suc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-038 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Measure only consolidated net income"
  Explanation: "Option B (Measure only consolidated net income) represents a plausible misconception. Under Key performance indicators, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-038 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use supplier stock price as the warehouse KPI"
  Explanation: "Option C (Use supplier stock price as the warehouse KPI) represents a plausible misconception. Under Key performance indicators, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-040 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$3,900 favorable"
  Explanation: "The amount is correct, but the sign is wrong. Paying more than standard creates an unfavorable variance."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-041 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$1,500 favorable"
  Explanation: "The amount is correct, but excess material usage is unfavorable, not favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-042 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$67,650 unfavorable"
  Explanation: "This is standard labor cost, 3,075 x $22, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3075) not distractor numbers

P1-C-042 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$70,725 unfavorable"
  Explanation: "This is actual labor cost, 3,075 x $23, not the variance caused by the $1 rate difference."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3075) not distractor numbers

P1-C-042 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$3,075 favorable"
  Explanation: "The amount is correct, but paying more than the standard rate is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-043 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$2,112 unfavorable"
  Explanation: "The amount is correct, but the direction is wrong. Using fewer hours than standard is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-044 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$6,320 favorable"
  Explanation: "The amount is correct, but the direction is wrong. Actual overhead exceeded the flexible budget, so the variance is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-045 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "15.5%"
  Explanation: "This understates the return; using average operating assets as the denominator gives 18.4%."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (18.4) not distractor numbers

P1-C-047 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$3,640 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Flexible-budget contribution is higher than static-budget contribution, so the variance is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-048 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Leading indicators are always more accurate than lagging indicators"
  Explanation: "Option A (Leading indicators are always more accurate than lagging indicators) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Leading indicators provide early"

P1-C-048 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Leading indicators eliminate the need to track financial performance"
  Explanation: "Option C (Leading indicators eliminate the need to track financial performance) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Leading indicators provide early"

P1-C-048 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Leading indicators are required by GAAP for external reporting"
  Explanation: "Option D (Leading indicators are required by GAAP for external reporting) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Leading indicators provide early"

P1-C-049 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Below $18 only"
  Explanation: "Option A (Below $18 only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Between $18 and $30"

P1-C-049 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Above $30 only"
  Explanation: "Option C (Above $30 only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Between $18 and $30"

P1-C-049 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Exactly $24 (the midpoint), with no other price acceptable"
  Explanation: "Option D (Exactly $24 (the midpoint), with no other price acceptable) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Between $18 and $30"

P1-C-050 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Measure only consolidated net income"
  Explanation: "Option A (Measure only consolidated net income) is incorrect. Under Key performance indicators, the correct treatment requires use kpis such as pickin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-050 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Evaluate supervisors primarily on corporate ROE"
  Explanation: "Option C (Evaluate supervisors primarily on corporate ROE) represents a plausible misconception. Under Key performance indicators, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-050 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use supplier stock price as the warehouse KPI"
  Explanation: "Option D (Use supplier stock price as the warehouse KPI) represents a plausible misconception. Under Key performance indicators, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-052 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$4,332 favorable"
  Explanation: "The amount is correct, but the sign is wrong. Paying more than the standard price is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-054 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$74,250 unfavorable"
  Explanation: "This is standard labor cost, 3,375 hours x $22, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3375) not distractor numbers

P1-C-054 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$3,375 favorable"
  Explanation: "The dollar amount is correct, but the sign is not. A $23 actual rate versus a $22 standard rate is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-054 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$77,625 unfavorable"
  Explanation: "This is actual labor cost, 3,375 hours x $23, not the variance from standard."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3375) not distractor numbers

P1-C-057 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "15.2%"
  Explanation: "This understates ROI; the correct return on average operating assets is 18.0%."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (18.0) not distractor numbers

P1-C-059 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$6,200 favorable"
  Explanation: "The amount is correct, but the sign is wrong. A higher flexible budget than static budget is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-060 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "The scorecard becomes too simple to be useful"
  Explanation: "Option A (The scorecard becomes too simple to be useful) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Employees may lose focus"

P1-C-060 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "The financial perspective will automatically become overweighted"
  Explanation: "Option C (The financial perspective will automatically become overweighted) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Employees may lose focus"

P1-C-060 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "GAAP prohibits scorecards with more than 20 measures"
  Explanation: "Option D (GAAP prohibits scorecards with more than 20 measures) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Employees may lose focus"

P1-C-064 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$4,764 favorable"
  Explanation: "The amount is correct, but the sign is wrong. The actual purchase price was above standard, so the variance is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-066 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$84,525 unfavorable"
  Explanation: "This is actual labor cost, 3,675 hours x $23, not the rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3675) not distractor numbers

P1-C-066 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$3,675 favorable"
  Explanation: "The amount is correct, but the direction is wrong. A higher actual wage rate than standard is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-066 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$80,850 unfavorable"
  Explanation: "This is standard labor cost, 3,675 hours x $22, not the variance caused by the rate difference."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3675) not distractor numbers

P1-C-067 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$1,968 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Actual hours were below standard hours, so the variance is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-068 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$8,240 favorable"
  Explanation: "The amount is correct, but the direction is wrong. Actual cost exceeded the flexible budget, so the variance is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-071 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$4,120 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Flexible-budget contribution is above the static budget, which is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-072 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Return on invested capital"
  Explanation: "Option A (Return on invested capital) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "On-time delivery rate to"

P1-C-072 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Employee turnover rate"
  Explanation: "Option C (Employee turnover rate) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "On-time delivery rate to"

P1-C-072 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Defect rate in the production process"
  Explanation: "Option D (Defect rate in the production process) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "On-time delivery rate to"

P1-C-073 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It always maximizes overall company profit"
  Explanation: "Option A (It always maximizes overall company profit) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides the selling"

P1-C-073 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It is prohibited under U.S. GAAP"
  Explanation: "Option C (It is prohibited under U.S. GAAP) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides the selling"

P1-C-073 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for divisional performance evaluation"
  Explanation: "Option D (It eliminates the need for divisional performance evaluation) represents a plausible misconception. Under Transfer pricing, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides the selling"

P1-C-076 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$60,620 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. The actual price exceeded the standard price, which is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-077 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$2,580 favorable"
  Explanation: "The amount is correct, but the sign is wrong. Using more material than the standard allows is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-078 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$91,425 unfavorable"
  Explanation: "This is actual labor cost, 3,975 hours x $23, not the rate variance. The rate variance uses only the $1 per hour rate difference."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3975) not distractor numbers

P1-C-078 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$87,450 unfavorable"
  Explanation: "This is standard labor cost, 3,975 hours x $22, not the variance caused by paying above standard."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (3975) not distractor numbers

P1-C-080 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$9,200 favorable"
  Explanation: "The amount is correct, but the sign is wrong. Spending above the flexible budget is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-083 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$4,360 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Flexible-budget contribution exceeds static-budget contribution, so the volume variance is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-084 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "The four perspectives operate independently with no relationship"
  Explanation: "Option A (The four perspectives operate independently with no relationship) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cause-and-effect chain linking"

P1-C-084 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Financial performance is the only perspective that matters"
  Explanation: "Option C (Financial performance is the only perspective that matters) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cause-and-effect chain linking"

P1-C-084 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Customer satisfaction has no impact on financial results"
  Explanation: "Option D (Customer satisfaction has no impact on financial results) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cause-and-effect chain linking"

P1-C-086 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use supplier stock price as the warehouse KPI"
  Explanation: "Option A (Use supplier stock price as the warehouse KPI) is incorrect. Under Key performance indicators, the correct treatment requires use kpis such ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-086 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Measure only consolidated net income"
  Explanation: "Option C (Measure only consolidated net income) represents a plausible misconception. Under Key performance indicators, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-086 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Evaluate supervisors primarily on corporate ROE"
  Explanation: "Option D (Evaluate supervisors primarily on corporate ROE) represents a plausible misconception. Under Key performance indicators, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use KPIs such as"

P1-C-088 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$5,628 favorable"
  Explanation: "The amount is correct, but the sign is wrong. Paying more than the standard price creates an unfavorable variance."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-090 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$94,050 unfavorable"
  Explanation: "This is standard labor cost, 4,275 hours x $22, not the labor rate variance."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (4275) not distractor numbers

P1-C-090 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$98,325 unfavorable"
  Explanation: "This is actual labor cost, 4,275 hours x $23. A rate variance uses the difference between actual and standard hourly rates."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (4275) not distractor numbers

P1-C-090 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "$4,275 favorable"
  Explanation: "The dollar amount is correct, but the direction is wrong. A higher actual wage rate than standard is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-091 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$1,824 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Using fewer labor hours than standard is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-093 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "14.7%"
  Explanation: "This understates the ROI; the correct return on average operating assets is 17.2%."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (17.2) not distractor numbers

P1-C-095 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "$4,600 unfavorable"
  Explanation: "The amount is correct, but the sign is wrong. Flexible-budget contribution is higher than static-budget contribution, so the variance is favorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-C-096 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "The scorecard will automatically adjust to reflect the correct strategy"
  Explanation: "Option A (The scorecard will automatically adjust to reflect the correct strategy) represents a plausible misconception. Under CMA Part 1 accounting p..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Misalignment between measured performance"

P1-C-096 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "No consequence, since all scorecards should include innovation metrics"
  Explanation: "Option C (No consequence, since all scorecards should include innovation metrics) represents a plausible misconception. Under CMA Part 1 accounting pr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Misalignment between measured performance"

P1-C-096 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "The company will be forced to switch to a differentiation strategy"
  Explanation: "Option D (The company will be forced to switch to a differentiation strategy) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Misalignment between measured performance"

P1-D-002 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Avoid equivalent units because units are homogeneous"
  Explanation: "Option A (Avoid equivalent units because units are homogeneous) is incorrect. Under Process costing, the correct treatment requires use process costin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use process costing to"

P1-D-002 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Assign all conversion costs to the first unit produced"
  Explanation: "Option B (Assign all conversion costs to the first unit produced) represents a plausible misconception. Under Process costing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use process costing to"

P1-D-002 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use job order costing for each identical gallon"
  Explanation: "Option C (Use job order costing for each identical gallon) represents a plausible misconception. Under Process costing, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use process costing to"

P1-D-003 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait until all actual overhead is known before costing any job"
  Explanation: "Option A (Wait until all actual overhead is known before costing any job) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply overhead using a"

P1-D-003 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Apply only direct material and ignore overhead"
  Explanation: "Option B (Apply only direct material and ignore overhead) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires apply o..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply overhead using a"

P1-D-003 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use sales price as the overhead rate"
  Explanation: "Option C (Use sales price as the overhead rate) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply overhead using a"

P1-D-006 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Track current-period work separately from beginning inventory as FIFO does"
  Explanation: "Option A (Track current-period work separately from beginning inven...) is incorrect. Under Process costing, the correct treatment requires use weight..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use weighted-average equivalent unit"

P1-D-006 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ignore beginning inventory costs"
  Explanation: "Option C (Ignore beginning inventory costs) represents a plausible misconception. Under Process costing, the correct analysis leads to the conclusion ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use weighted-average equivalent unit"

P1-D-006 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use only completed units as equivalent units"
  Explanation: "Option D (Use only completed units as equivalent units) represents a plausible misconception. Under Process costing, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use weighted-average equivalent unit"

P1-D-008 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify it as facility-level because every activity supports the facility"
  Explanation: "Option A (Classify it as facility-level because every activity supports the facility) represents a plausible misconception. Under CMA Part 1 accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the activity as"

P1-D-008 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify it as unit-level because products are units"
  Explanation: "Option B (Classify it as unit-level because products are units) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the activity as"

P1-D-008 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Exclude it from ABC because it is indirect"
  Explanation: "Option C (Exclude it from ABC because it is indirect) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires classify th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify the activity as"

P1-D-011 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Allocate all service cost to the first production unit"
  Explanation: "Option A (Allocate all service cost to the first production unit) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the reciprocal method"

P1-D-011 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use the direct method because it is always most accurate"
  Explanation: "Option C (Use the direct method because it is always most accurate) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the reciprocal method"

P1-D-011 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Treat service costs as nonmanufacturing revenue"
  Explanation: "Option D (Treat service costs as nonmanufacturing revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use the reciprocal method"

P1-D-012 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Set target cost equal to sunk research cost"
  Explanation: "Option A (Set target cost equal to sunk research cost) represents a plausible misconception. Under Target costing, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Start with the market"

P1-D-012 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Ignore customer value until production begins"
  Explanation: "Option C (Ignore customer value until production begins) is incorrect. Under Target costing, the correct treatment requires start with the market pric..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Start with the market"

P1-D-012 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Start with actual cost and add any desired profit"
  Explanation: "Option D (Start with actual cost and add any desired profit) represents a plausible misconception. Under Target costing, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Start with the market"

P1-D-013 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Include only direct materials and direct labor"
  Explanation: "Option A (Include only direct materials and direct labor) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include upstream design and"

P1-D-013 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Exclude warranty service because it occurs after sale"
  Explanation: "Option C (Exclude warranty service because it occurs after sale) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include upstream design and"

P1-D-013 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Include only costs recorded after product launch"
  Explanation: "Option D (Include only costs recorded after product launch) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires inclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include upstream design and"

P1-D-014 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Use kaizen only to set initial product design cost"
  Explanation: "Option A (Use kaizen only to set initial product design cost) is incorrect. Under Kaizen budgeting, the correct treatment requires use kaizen costing ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use kaizen costing to"

P1-D-014 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Use kaizen to calculate earnings per share"
  Explanation: "Option C (Use kaizen to calculate earnings per share) represents a plausible misconception. Under Kaizen budgeting, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use kaizen costing to"

P1-D-014 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Use kaizen to capitalize all repair costs"
  Explanation: "Option D (Use kaizen to capitalize all repair costs) represents a plausible misconception. Under Kaizen budgeting, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use kaizen costing to"

P1-D-016 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify testing as external failure cost"
  Explanation: "Option A (Classify testing as external failure cost) represents a plausible misconception. Under Quality management, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify inspection and testing"

P1-D-016 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify testing as prevention only"
  Explanation: "Option B (Classify testing as prevention only) represents a plausible misconception. Under Quality management, the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify inspection and testing"

P1-D-016 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify it as a financing cost"
  Explanation: "Option C (Classify it as a financing cost) is incorrect. Under Quality management, the correct treatment requires classify inspection and testing as a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify inspection and testing"

P1-D-017 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify them as financing activities"
  Explanation: "Option A (Classify them as financing activities) represents a plausible misconception. Under Artificial intelligence in accounting, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify scrap and rework"

P1-D-017 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify them as external failure costs"
  Explanation: "Option B (Classify them as external failure costs) represents a plausible misconception. Under Artificial intelligence in accounting, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify scrap and rework"

P1-D-017 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify them as prevention costs"
  Explanation: "Option C (Classify them as prevention costs) represents a plausible misconception. Under Artificial intelligence in accounting, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify scrap and rework"

P1-D-018 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify them as capital expenditures"
  Explanation: "Option A (Classify them as capital expenditures) is incorrect. Under Artificial intelligence in accounting, the correct treatment requires classify wa..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify warranty claims and"

P1-D-018 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify them as appraisal costs"
  Explanation: "Option C (Classify them as appraisal costs) represents a plausible misconception. Under Artificial intelligence in accounting, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify warranty claims and"

P1-D-018 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Classify them as direct material purchases"
  Explanation: "Option D (Classify them as direct material purchases) represents a plausible misconception. Under Artificial intelligence in accounting, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify warranty claims and"

P1-D-019 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Increase batch sizes solely to build inventory"
  Explanation: "Option A (Increase batch sizes solely to build inventory) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and reduce non-value-added"

P1-D-019 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Measure only accounting depreciation"
  Explanation: "Option B (Measure only accounting depreciation) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires identify and redu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and reduce non-value-added"

P1-D-019 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Treat idle time as value-added because it is paid"
  Explanation: "Option D (Treat idle time as value-added because it is paid) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and reduce non-value-added"

P1-D-025 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$9,568"
  Explanation: "This overstates Product A's assignment; the setup rate is $316 and Product A used 23 setups, giving $7,268."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (7268) not distractor numbers

P1-D-029 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Treat customer service costs as unrelated to product cost management"
  Explanation: "Option A (Treat customer service costs as unrelated to product cost management) represents a plausible misconception. Under Artificial intelligence in..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-029 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Study only direct labor efficiency variance"
  Explanation: "Option B (Study only direct labor efficiency variance) represents a plausible misconception. Under Artificial intelligence in accounting, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-029 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore upstream design because it occurs before manufacturing"
  Explanation: "Option D (Ignore upstream design because it occurs before manufactu...) is incorrect. Under Artificial intelligence in accounting, the correct treatme..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-030 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Increase safety stock without changing supplier processes"
  Explanation: "Option A (Increase safety stock without changing supplier processes) is incorrect. Under ASC 330 (Inventory), the correct treatment requires strengthe..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and scheduling controls because"

P1-D-030 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Record JIT purchases as equity contributions"
  Explanation: "Option B (Record JIT purchases as equity contributions) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and scheduling controls because"

P1-D-030 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Eliminate receiving controls because inventory is lower"
  Explanation: "Option D (Eliminate receiving controls because inventory is lower) represents a plausible misconception. Under ASC 330 (Inventory), the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and scheduling controls because"

P1-D-032 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$743,000 underapplied"
  Explanation: "This adds actual and applied overhead. The variance status is based on the $21,000 difference."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (21000) not distractor numbers

P1-D-039 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Ignore upstream design because it occurs before manufacturing"
  Explanation: "Option A (Ignore upstream design because it occurs before manufacturing) represents a plausible misconception. Under Artificial intelligence in accoun..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-039 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Treat customer service costs as unrelated to product cost management"
  Explanation: "Option B (Treat customer service costs as unrelated to product cost...) is incorrect. Under Artificial intelligence in accounting, the correct treatme..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-039 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Study only direct labor efficiency variance"
  Explanation: "Option C (Study only direct labor efficiency variance) represents a plausible misconception. Under Artificial intelligence in accounting, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-040 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Excess inventory holding costs"
  Explanation: "Option A (Excess inventory holding costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Production disruption if the"

P1-D-040 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Reduced product quality from over-inspection"
  Explanation: "Option C (Reduced product quality from over-inspection) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Production disruption if the"

P1-D-040 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Increased warehousing costs"
  Explanation: "Option D (Increased warehousing costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Production disruption if the"

P1-D-045 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$10,786"
  Explanation: "This overstates the assignment; Product A used 23 setups at about $368.97 each, giving about $8,486."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (8486) not distractor numbers

P1-D-049 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Ignore upstream design because it occurs before manufacturing"
  Explanation: "Option A (Ignore upstream design because it occurs before manufacturing) represents a plausible misconception. Under Artificial intelligence in accoun..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-049 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Treat customer service costs as unrelated to product cost management"
  Explanation: "Option B (Treat customer service costs as unrelated to product cost management) represents a plausible misconception. Under Artificial intelligence in..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-049 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Study only direct labor efficiency variance"
  Explanation: "Option C (Study only direct labor efficiency variance) represents a plausible misconception. Under Artificial intelligence in accounting, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-050 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Carrying costs increase due to more frequent deliveries"
  Explanation: "Option A (Carrying costs increase due to more frequent deliveries) represents a plausible misconception. Under ASC 330 (Inventory), the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Carrying costs decrease as"

P1-D-050 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Carrying costs remain unchanged"
  Explanation: "Option C (Carrying costs remain unchanged) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis leads to the conclusi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Carrying costs decrease as"

P1-D-050 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Carrying costs become irrelevant under JIT"
  Explanation: "Option D (Carrying costs become irrelevant under JIT) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Carrying costs decrease as"

P1-D-057 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "80.0 hours"
  Explanation: "This applies the 80% learning relationship for only the first doubling. The second doubling reduces average hours to 64.0."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (64.0) not distractor numbers

P1-D-059 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Study only direct labor efficiency variance"
  Explanation: "Option A (Study only direct labor efficiency variance) represents a plausible misconception. Under Artificial intelligence in accounting, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-059 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Treat customer service costs as unrelated to product cost management"
  Explanation: "Option C (Treat customer service costs as unrelated to product cost management) represents a plausible misconception. Under Artificial intelligence in..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-059 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Ignore upstream design because it occurs before manufacturing"
  Explanation: "Option D (Ignore upstream design because it occurs before manufacturing) represents a plausible misconception. Under Artificial intelligence in accoun..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Analyze costs across R&D"

P1-D-060 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It requires detailed tracking of costs at every stage of the production process"
  Explanation: "Option A (It requires detailed tracking of costs at every stage of the production process) represents a plausible misconception. Under CMA Part 1 acco..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It delays the recording"

P1-D-060 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It requires maintaining large raw materials inventories"
  Explanation: "Option C (It requires maintaining large raw materials inventories) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It delays the recording"

P1-D-060 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It is required under GAAP for all manufacturers"
  Explanation: "Option D (It is required under GAAP for all manufacturers) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It delays the recording"

P1-D-062 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "$1,088,000 underapplied"
  Explanation: "This adds actual and applied overhead. Underapplied overhead is based on the $36,000 difference."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (36000) not distractor numbers

P1-D-062 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "$36,000 overapplied"
  Explanation: "The amount is correct, but the status is wrong. Actual overhead exceeded applied overhead, so it is underapplied."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-D-070 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Quality control can be relaxed since inventory levels are lower"
  Explanation: "Option A (Quality control can be relaxed since inventory levels are lower) represents a plausible misconception. Under Quality management, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "High and consistent quality"

P1-D-070 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Quality inspections should only occur at the final stage of production"
  Explanation: "Option C (Quality inspections should only occur at the final stage of production) represents a plausible misconception. Under Quality management, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "High and consistent quality"

P1-D-070 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "JIT eliminates the need for any quality control processes"
  Explanation: "Option D (JIT eliminates the need for any quality control processes) represents a plausible misconception. Under Quality management, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "High and consistent quality"

P1-E-001 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under COSO control environment comp..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and board oversight as"

P1-E-001 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under COSO control environment component, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and board oversight as"

P1-E-001 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) is incorrect. Under COSO control environment component, the correct treatment requi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and board oversight as"

P1-E-002 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option A (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under COSO risk assessment component, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and analyze risks"

P1-E-002 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option B (Wait for the external audit before designing any internal control) represents a plausible misconception. Under COSO risk assessment componen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and analyze risks"

P1-E-002 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under COSO risk assessment component, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Identify and analyze risks"

P1-E-004 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option A (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Communicate relevant information in"

P1-E-004 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Communicate relevant information in"

P1-E-004 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option D (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Communicate relevant information in"

P1-E-005 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under COSO monitoring activities, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use ongoing or separate"

P1-E-005 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option C (Rely on trust and remove documentation to speed processing) is incorrect. Under COSO monitoring activities, the correct treatment requires u..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use ongoing or separate"

P1-E-005 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option D (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under COSO monitoring activities, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use ongoing or separate"

P1-E-006 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Authorization controls, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and recordkeeping duties when"

P1-E-006 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Authorization controls, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and recordkeeping duties when"

P1-E-006 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option D (Wait for the external audit before designing any internal...) is incorrect. Under Authorization controls, the correct treatment requires sep..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and recordkeeping duties when"

P1-E-012 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Change management controls, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and migration controls before"

P1-E-012 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) is incorrect. Under Change management controls, the correct treatment requires r..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and migration controls before"

P1-E-012 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option D (Wait for the external audit before designing any internal control) represents a plausible misconception. Under Change management controls, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and migration controls before"

P1-E-013 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under IT general controls (ITGC), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that IT general"

P1-E-013 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option C (Wait for the external audit before designing any internal...) is incorrect. Under IT general controls (ITGC), the correct treatment requires..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that IT general"

P1-E-013 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under IT general controls (ITGC), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize that IT general"

P1-E-014 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under Electronic data interchange (..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and completeness checks to"

P1-E-014 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Electronic data interchange (EDI), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and completeness checks to"

P1-E-014 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) is incorrect. Under Electronic data interchange (EDI), the correct treatment req..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and completeness checks to"

P1-E-015 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) is incorrect. Under CMA Part 1 accounting principles, the correct treatment require..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and vendor invoice before"

P1-E-015 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option B (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and vendor invoice before"

P1-E-015 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and vendor invoice before"

P1-E-016 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Artificial intelligence in accounting, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Separate vendor setup from"

P1-E-016 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option B (Wait for the external audit before designing any internal...) is incorrect. Under Artificial intelligence in accounting, the correct treatme..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Separate vendor setup from"

P1-E-016 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Artificial intelligence in accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Separate vendor setup from"

P1-E-017 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Secure blank checks and"

P1-E-017 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Secure blank checks and"

P1-E-017 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) is incorrect. Under CMA Part 1 accounting principles, the correct treatment require..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Secure blank checks and"

P1-E-020 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option A (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Reconciliation controls, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile subsidiary ledgers to"

P1-E-020 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Reconciliation controls, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile subsidiary ledgers to"

P1-E-020 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option D (Wait for the external audit before designing any internal control) represents a plausible misconception. Under Reconciliation controls, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile subsidiary ledgers to"

P1-E-025 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use owner review or"

P1-E-025 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use owner review or"

P1-E-025 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option C (Classify the issue as a Part 2 capital budgeting matter) is incorrect. Under CMA Part 1 accounting principles, the correct treatment require..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use owner review or"

P1-E-027 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal...) is incorrect. Under CMA Part 1 accounting principles, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Well-designed and operating controls"

P1-E-027 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option B (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Well-designed and operating controls"

P1-E-027 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Well-designed and operating controls"

P1-E-028 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Retain evidence showing who"

P1-E-028 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option C (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Retain evidence showing who"

P1-E-028 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option D (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Retain evidence showing who"

P1-E-030 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Maintain tested backups to"

P1-E-030 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option C (Wait for the external audit before designing any internal control) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Maintain tested backups to"

P1-E-030 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Maintain tested backups to"

P1-E-031 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) is incorrect. Under Disaster recovery and business continuity, the correct treatmen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Test recovery procedures periodically"

P1-E-031 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Disaster recovery and business conti..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Test recovery procedures periodically"

P1-E-031 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option D (Wait for the external audit before designing any internal control) represents a plausible misconception. Under Disaster recovery and busines..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Test recovery procedures periodically"

P1-E-032 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Data privacy regulations, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Limit access to personal"

P1-E-032 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option B (Wait for the external audit before designing any internal...) is incorrect. Under Data privacy regulations, the correct treatment requires l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Limit access to personal"

P1-E-032 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Data privacy regulations, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Limit access to personal"

P1-E-033 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Provide confidential reporting mechanisms"

P1-E-033 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option B (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Provide confidential reporting mechanisms"

P1-E-033 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option C (Wait for the external audit before designing any internal...) is incorrect. Under CMA Part 1 accounting principles, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Provide confidential reporting mechanisms"

P1-E-034 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option A (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Audit committee responsibilities, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use independent audit committee"

P1-E-034 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option B (Wait for the external audit before designing any internal control) represents a plausible misconception. Under Audit committee responsibilit..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use independent audit committee"

P1-E-034 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option C (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Audit committee responsibilities, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use independent audit committee"

P1-E-035 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Wait for the external audit before designing any internal control"
  Explanation: "Option A (Wait for the external audit before designing any internal...) is incorrect. Under Electronic data interchange (EDI), the correct treatment r..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assign owners and due"

P1-E-035 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Classify the issue as a Part 2 capital budgeting matter"
  Explanation: "Option B (Classify the issue as a Part 2 capital budgeting matter) represents a plausible misconception. Under Electronic data interchange (EDI), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assign owners and due"

P1-E-035 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Rely on trust and remove documentation to speed processing"
  Explanation: "Option D (Rely on trust and remove documentation to speed processing) represents a plausible misconception. Under Electronic data interchange (EDI), t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Assign owners and due"

P1-E-046 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Record duplicate payments as prepaid expenses without follow-up"
  Explanation: "Option A (Record duplicate payments as prepaid expenses without follow-up) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-046 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Have payment preparers reconcile their own work only"
  Explanation: "Option C (Have payment preparers reconcile their own work only) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-046 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Disable invoice-number validation because vendors may reuse numbers"
  Explanation: "Option D (Disable invoice-number validation because vendors may reu...) is incorrect. Under CMA Part 1 accounting principles, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-047 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Let payroll learn of terminations through informal emails only"
  Explanation: "Option A (Let payroll learn of terminations through informal emails...) is incorrect. Under ASC 710 (Compensation), the correct treatment requires rec..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-047 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Allow supervisors to keep former employees active for convenience"
  Explanation: "Option C (Allow supervisors to keep former employees active for convenience) represents a plausible misconception. Under ASC 710 (Compensation), the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-047 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Review terminations only during the annual audit"
  Explanation: "Option D (Review terminations only during the annual audit) represents a plausible misconception. Under ASC 710 (Compensation), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-048 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any physical inventory counts"
  Explanation: "Option A (It eliminates the need for any physical inventory counts) represents a plausible misconception. Under ASC 330 (Inventory), the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allows discrepancies between"

P1-E-048 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It automatically prevents all inventory theft"
  Explanation: "Option C (It automatically prevents all inventory theft) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allows discrepancies between"

P1-E-048 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It removes the need for inventory reconciliation entirely"
  Explanation: "Option D (It removes the need for inventory reconciliation entirely) represents a plausible misconception. Under ASC 330 (Inventory), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allows discrepancies between"

P1-E-050 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Move approval to the person who enters invoices"
  Explanation: "Option A (Move approval to the person who enters invoices) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-050 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Delete exception reports after review"
  Explanation: "Option B (Delete exception reports after review) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-050 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Treat every exception as immaterial because invoices were eventually paid"
  Explanation: "Option C (Treat every exception as immaterial because invoices were eventually paid) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-052 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for a bank reconciliation"
  Explanation: "Option A (It eliminates the need for a bank reconciliation) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the risk"

P1-E-052 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees faster customer payment"
  Explanation: "Option C (It guarantees faster customer payment) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the risk"

P1-E-052 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "It replaces the need for an accounts receivable subledger"
  Explanation: "Option D (It replaces the need for an accounts receivable subledger) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the risk"

P1-E-053 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Late payment discounts"
  Explanation: "Option A (Late payment discounts) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Payments to fictitious or"

P1-E-053 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Excessive inventory holding costs"
  Explanation: "Option C (Excessive inventory holding costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Payments to fictitious or"

P1-E-053 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Sales tax compliance errors"
  Explanation: "Option D (Sales tax compliance errors) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Payments to fictitious or"

P1-E-055 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Allow supervisors to keep former employees active for convenience"
  Explanation: "Option A (Allow supervisors to keep former employees active for con...) is incorrect. Under ASC 710 (Compensation), the correct treatment requires rec..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-055 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Let payroll learn of terminations through informal emails only"
  Explanation: "Option B (Let payroll learn of terminations through informal emails only) represents a plausible misconception. Under ASC 710 (Compensation), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-055 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Review terminations only during the annual audit"
  Explanation: "Option D (Review terminations only during the annual audit) represents a plausible misconception. Under ASC 710 (Compensation), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-057 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Share administrator accounts for urgent requests"
  Explanation: "Performing periodic access recertification based on current job responsibilities directly addresses the risk of inappropriate access accumulating afte..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "periodic access recertification based"

P1-E-058 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Treat every exception as immaterial because invoices were eventually paid"
  Explanation: "Option A (Treat every exception as immaterial because invoices were eventually paid) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-058 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Delete exception reports after review"
  Explanation: "Option C (Delete exception reports after review) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-058 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Move approval to the person who enters invoices"
  Explanation: "Option D (Move approval to the person who enters invoices) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires analyz..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-059 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "To minimize the total amount of information available to auditors"
  Explanation: "Option A (To minimize the total amount of information available to auditors) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To ensure documentation is"

P1-E-059 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "To eliminate the need for internal audits"
  Explanation: "Option C (To eliminate the need for internal audits) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To ensure documentation is"

P1-E-059 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "To comply with a requirement that all records be destroyed after one year"
  Explanation: "Option D (To comply with a requirement that all records be destroyed after one year) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To ensure documentation is"

P1-E-062 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Disable invoice-number validation because vendors may reuse numbers"
  Explanation: "Option A (Disable invoice-number validation because vendors may reuse numbers) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-062 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Record duplicate payments as prepaid expenses without follow-up"
  Explanation: "Option B (Record duplicate payments as prepaid expenses without follow-up) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-062 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Have payment preparers reconcile their own work only"
  Explanation: "Option C (Have payment preparers reconcile their own work only) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-063 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Allow supervisors to keep former employees active for convenience"
  Explanation: "Option A (Allow supervisors to keep former employees active for con...) is incorrect. Under ASC 710 (Compensation), the correct treatment requires rec..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-063 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Let payroll learn of terminations through informal emails only"
  Explanation: "Option B (Let payroll learn of terminations through informal emails only) represents a plausible misconception. Under ASC 710 (Compensation), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-063 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Review terminations only during the annual audit"
  Explanation: "Option D (Review terminations only during the annual audit) represents a plausible misconception. Under ASC 710 (Compensation), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-070 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Record duplicate payments as prepaid expenses without follow-up"
  Explanation: "Option A (Record duplicate payments as prepaid expenses without follow-up) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-070 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Have payment preparers reconcile their own work only"
  Explanation: "Option B (Have payment preparers reconcile their own work only) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-070 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Disable invoice-number validation because vendors may reuse numbers"
  Explanation: "Option D (Disable invoice-number validation because vendors may reu...) is incorrect. Under CMA Part 1 accounting principles, the correct treatment re..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Use system duplicate checks"

P1-E-071 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Let payroll learn of terminations through informal emails only"
  Explanation: "Option A (Let payroll learn of terminations through informal emails...) is incorrect. Under ASC 710 (Compensation), the correct treatment requires rec..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-071 (pack_a_corrected.js) slot ExplanationWrongB
  Choice: "Allow supervisors to keep former employees active for convenience"
  Explanation: "Option B (Allow supervisors to keep former employees active for convenience) represents a plausible misconception. Under ASC 710 (Compensation), the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-071 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Review terminations only during the annual audit"
  Explanation: "Option D (Review terminations only during the annual audit) represents a plausible misconception. Under ASC 710 (Compensation), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Reconcile HR termination records"

P1-E-074 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Delete exception reports after review"
  Explanation: "Option A (Delete exception reports after review) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-074 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "Treat every exception as immaterial because invoices were eventually paid"
  Explanation: "Option C (Treat every exception as immaterial because invoices were eventually paid) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-E-074 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Move approval to the person who enters invoices"
  Explanation: "Option D (Move approval to the person who enters invoices) is incorrect. Under CMA Part 1 accounting principles, the correct treatment requires analyz..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and monitor whether exceptions"

P1-F-009 (pack_a_corrected.js) slot ExplanationWrongD
  Choice: "Validity, because transaction codes may fail format and range checks"
  Explanation: "Timeliness means data are available when needed for reporting, monitoring, or decisions. Late data can make analytics less useful even if the data are..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "available when needed for"

P1-F-016 (pack_a_corrected.js) slot ExplanationWrongC
  Choice: "The chart needs a larger source data file even if the scale is unchanged"
  Explanation: "Adding more data does not correct the misleading effect of a truncated or inconsistent axis."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A truncated or inconsistent"

P1-F-025 (pack_a_corrected.js) slot ExplanationWrongA
  Choice: "Correlation risk, because satisfaction and support usage may move together"
  Explanation: "Correlation risk concerns interpreting relationships between variables; the main issue is that the sampled customers may not represent the population...."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "may not represent the"

--- pack_b_corrected.js ΓÇö 95 findings ---

P1B-A-083 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "History of similar contracts"
  Explanation: "History of similar contracts is not an ASC 606 criterion for over-time recognition. The criteria are based on the specific contract terms (customer co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and right to payment"

P1B-A-083 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Customer controls the asset as created"
  Explanation: "Customer controls the asset as created is a separate ASC 606 criterion (criterion 1), but the stem describes criterion 3 (no alternative use and right..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "No alternative use and"

P1B-A-085 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Both as intangible assets"
  Explanation: "While the patent is correctly classified as an intangible asset, the $200,000 of internally developed trademark costs must be expensed as incurred und..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-A-086 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$2,800,000"
  Explanation: "This amount omits the treasury stock deduction. Treasury stock is a contra-equity account and must be subtracted at cost from total equity. Correct: $..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2475000) not distractor numbers

P1B-A-090 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Current asset held-for-sale at $3,000,000"
  Explanation: "While the classification as a current asset held-for-sale is correct, the measurement at $3,000,000 is incorrect. Since fair value less costs to sell ..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-A-095 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$765,000"
  Explanation: "This amount subtracts both OCI items from net income. Comprehensive income includes all OCI items added to (or subtracted from) net income: $850,000 +..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (885000) not distractor numbers

P1B-A-096 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "At fiscal year-end"
  Explanation: "Fiscal year-end is an arbitrary reporting cutoff and not a basis for deciding when to recognize expenses. Expenses are recognized when the related rev..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the related revenue is"

P1B-A-104 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$3,000,000 investing outflow and financing inflow"
  Explanation: "Noncash investing and financing transactions are NOT reported in the body of the statement of cash flows as investing outflows and financing inflows. ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "noncash investing and financing"

P1B-A-114 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Debit Valuation Allowance $100,000; Credit Income Tax Expense $100,000"
  Explanation: "This reverses the debit and credit. Correct entry: Debit Income Tax Expense $100,000; Credit Valuation Allowance $100,000."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Debit Income Tax Expense"

P1B-A-117 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Reduce DTL to $75,000 and debit income tax expense $15,000"
  Explanation: "This correctly identifies the DTL reduction to $75,000 but incorrectly debits income tax expense. When a DTL is reduced due to a tax rate decrease, in..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-A-118 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Revenue >= 5% of combined segment revenue"
  Explanation: "The revenue threshold for segment reporting is 10% of combined segment revenue (internal and external), not 5%. Additionally, the 10% threshold applie..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice D "10% of combined segment"

P1B-A-118 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Assets >= 15% of combined segment assets"
  Explanation: "The asset threshold is 10% of combined segment assets, not 15%. The 10% quantitative threshold applies consistently across all three criteria."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice D "10% of combined segment"

P1B-A-120 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Both require adjustment"
  Explanation: "Both do not require adjustment. Only the customer bankruptcy (Type 1 subsequent event) requires adjustment. The stock issuance (Type 2 non-recognized ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Only the customer bankruptcy"

P1B-A-120 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Neither requires adjustment; both disclosed"
  Explanation: "The customer bankruptcy requires adjustment because it provides additional evidence about the collectibility of the AR that existed at December 31 (a ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the customer bankruptcy requires"

P1B-A-124 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Yes, but only for private companies"
  Explanation: "The fair value option is available for both public and private companies. ASC 825 permits the irrevocable election of the fair value option for eligib..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the fair value option"
    - VERBATIM_MATCH: explanation contains text from choice C "fair value option is"

P1B-A-124 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "No, fair value option is only for financial assets at FV"
  Explanation: "The fair value option is available for a wide range of financial instruments, including equity method investments. ASC 825 expanded the fair value opt..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the fair value option"

P1B-A-124 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "No, equity method is mandatory when significant influence exists"
  Explanation: "While significant influence triggers equity method as the default, the fair value option under ASC 825 allows an irrevocable election to use fair valu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the fair value option"

P1B-A-128 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Credit Inventory $100,000; Debit Cost of Sales $100,000"
  Explanation: "This entry does not fully eliminate the intercompany transaction. The correct elimination removes all intercompany sales revenue and cost of goods sol..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (300000,200000) not distractor numbers

P1B-A-131 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Include the correction in 2025 income only"
  Explanation: "An error correction does not affect current-period net income only. The prior period financial statements must be restated to show the error's impact ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prior period financial statements"

P1B-A-143 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Increases total stockholders' equity"
  Explanation: "Option A is incorrect. Acquiring treasury stock decreases total stockholders' equity, not increases it. Treasury stock is a contra-equity account subt..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Decreases total stockholders' equity"

P1B-A-147 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "As a change in accounting principle applied retrospectively"
  Explanation: "Recognition in OCI is not appropriate for a change in depreciation method. This is a change in estimate effected by a change in principle and flows th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "estimate effected by a"

P1B-A-147 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "As a change in accounting estimate effected by a change in principle, applied prospectively"
  Explanation: "A change in depreciation method is considered a change in accounting estimate effected by a change in accounting principle. It is applied prospectivel..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "a change in accounting"

P1B-A-150 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "As a liability"
  Explanation: "AOCI is not a liability. It represents accumulated unrealized gains and losses on certain items, and it is reported as a separate component of stockho..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate component"

P1B-B-103 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "58,000"
  Explanation: "This amount incorrectly calculates ending inventory. Ending inventory for Q1 is 20% of Q2 sales (20% x 60,000 = 12,000 units), not 20% of Q1 sales."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-B-104 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "$150,000"
  Explanation: "This amount does not reflect the desired ending inventory adjustment. Purchases = (Production needs + Desired ending RM - Beginning RM) x Cost per lb ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (155000) not distractor numbers

P1B-B-105 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$288,000"
  Explanation: "This amount incorrectly calculates total direct labor hours. Total hours = 8,000 units x 2.5 hours per unit = 20,000 hours. The rate ($18/hour) is the..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-B-114 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$5,000 U"
  Explanation: "This amount incorrectly calculates the variance. Sales volume variance = Static budget - Flexible budget = $200,000 - $180,000 = $20,000. The variance..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (20000) not distractor numbers
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-B-114 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "$25,000 U"
  Explanation: "A $20,000 favorable variance would mean flexible budget profit exceeded static budget profit, which would occur with higher volume. Here volume was lo..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (20000) not distractor numbers

P1B-B-118 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "320"
  Explanation: "This amount does not reflect the correct cumulative average. With an 80% learning curve, the cumulative average time per unit for 4 units is 100 x 0.8..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (256) not distractor numbers

P1B-B-124 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "$140,000"
  Explanation: "This amount subtracts fixed costs at the original level but uses an incorrect contribution margin. The correct calculation: (9,000 x $40) - $200,000 =..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (160000) not distractor numbers

P1B-B-131 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Start with the prior year budget and adjust for inflation"
  Explanation: "Incremental budgeting starts with the prior period and adjusts upward. ZBB requires justification of every expense from a zero base, not from prior le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "from a zero base"

P1B-B-131 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Base the budget on zero defects"
  Explanation: "Participative budgeting involves bottom-up participation. ZBB is distinguished by its requirement to justify all expenses from scratch, not by who par..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Justify all expenses from"

P1B-B-132 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Budgets that never change once approved"
  Explanation: "Activity-based budgeting focuses on activity drivers. Kaizen budgeting specifically emphasizes continuous cost reduction throughout the budget period...."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "throughout the budget period"

P1B-B-134 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Conducts external audits"
  Explanation: "The CFO is a member of the budget committee but does not single-handedly resolve all budget disputes. The budget committee as a group reviews submissi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reviews submissions and resolves"

P1B-B-137 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "The capital expenditure budget"
  Explanation: "The cash budget is prepared after the operating budgets are complete, but the budgeted income statement is prepared before the cash budget, not after ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The budgeted income statement"

P1B-B-137 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "The cash budget"
  Explanation: "Operating budgets (sales, production, etc.) must be completed first to provide the revenue and expense information needed for the budgeted income stat..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The budgeted income statement"

P1B-B-149 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Spend equal time on all budget line items"
  Explanation: "Management by exception does not mean spending equal time on all items. It means focusing managerial attention on areas where results deviate signific..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "results deviate significantly from"

P1B-B-153 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "$500,000"
  Explanation: "This amount is half of the annual total, not 20%. The seasonal pattern allocates only 20% to Q1, or $400,000."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (400000) not distractor numbers

P1B-B-156 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Assume perfect efficiency with no waste"
  Explanation: "Ideal standards assume perfect conditions with no waste, downtime, or inefficiencies. Practical standards include allowances for normal unavoidable in..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include allowances for normal"

P1B-B-156 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Are based on theoretical maximum capacity"
  Explanation: "Standards based on theoretical maximum capacity describe ideal standards, not practical standards. Practical standards include allowances for normal i..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include allowances for normal"

P1B-B-159 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$147,000"
  Explanation: "This amount does not reflect the correct COGS calculation. COGS = Units sold x Cost per unit = 5,000 x $30 = $150,000. Beginning and ending FG invento..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1B-B-162 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Tax return preparation guidelines"
  Explanation: "Tax return preparation guidelines are unrelated to the internal budget process. A budget manual provides the instructions, timelines, and forms for bu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and forms for budget"

P1B-B-163 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "$300,000"
  Explanation: "This amount does not match either product's revenue correctly. The calculation should be: Product A (12,000 x $10) + Product B (8,000 x $15) = $120,00..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (240000) not distractor numbers

P1B-B-165 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "All corporate overhead costs"
  Explanation: "Controllability is the core principle. Managers should be evaluated only on what they can control or significantly influence, not on all aspects of th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "can control or significantly"

P1B-B-165 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "All costs allocated to the unit"
  Explanation: "Not all allocated costs are controllable by the unit's manager. Responsibility accounting evaluates managers only on costs they can control or signifi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "can control or significantly"

P1B-B-166 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "$40,000"
  Explanation: "This amount does not correspond to the excess cash calculation. The excess above the minimum is $60,000 - $25,000 = $35,000, which is the maximum that..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (35000) not distractor numbers

P1B-B-167 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Cash flow projections"
  Explanation: "Ethical considerations are important behavioral factors. Budgeting involves human behavior, and factors like employee morale and motivation significan..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Employee morale and motivation"

P1B-B-175 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Using only historical averages to predict the future"
  Explanation: "Scenario analysis does not rely only on historical averages. It develops multiple plausible future scenarios with varying assumptions to explore diffe..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "multiple plausible future scenarios"

P1B-B-175 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Identifying a single most likely outcome"
  Explanation: "Identifying a single most likely outcome is point estimation, not scenario analysis. Scenario analysis involves developing multiple scenarios with dif..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "scenarios with different assumptions"

P1B-B-190 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "30%"
  Explanation: "30% alone is correct but incomplete. Both the dollar amount ($300,000) and the percentage (30%) are valid expressions of the margin of safety. The cor..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-B-190 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "$300,000"
  Explanation: "$300,000 alone is correct but incomplete. Margin of safety = $1,000,000 - $700,000 = $300,000, which is also 30% of budgeted sales. Both measures are ..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-B-191 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Neither; produce both at 50% capacity"
  Explanation: "When capacity is constrained, the company should prioritize the product with the highest contribution margin per unit of the constrained resource (mac..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (10) not distractor numbers

P1B-B-195 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Uses only historical averages"
  Explanation: "Monte Carlo simulation uses probability distributions for inputs, not just historical averages. It varies assumptions randomly within defined ranges t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a distribution of possible"

P1B-B-197 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Sales revenue minus all variable costs"
  Explanation: "Sales revenue minus all variable costs is the contribution margin concept, which includes variable overhead and variable selling costs. Throughput con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice C "Sales revenue minus all"

P1B-B-197 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Sales revenue minus all operating costs"
  Explanation: "Sales revenue minus all operating costs is net income/operating profit. Throughput contribution deducts only direct material costs, the truly variable..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice A "Sales revenue minus all"

P1B-C-110 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "The price variance will increase Cost of Goods Sold, and the quantity variance will decrease Cost of Goods Sold"
  Explanation: "Unfavorable variances increase Cost of Goods Sold (or are prorated to inventory and COGS), while favorable variances decrease COGS. Therefore, the $15..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "Cost of Goods Sold"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "Cost of Goods Sold"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "increase Cost of Goods"

P1B-C-137 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Profit margin 15%, Asset turnover 1.50"
  Explanation: "The profit margin is correct at 15% ($300,000 / $2,000,000), but the asset turnover is 1.33 ($2,000,000 / $1,500,000), not 1.50."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-C-139 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "The division manager would accept the project under ROI evaluation but reject under residual income"
  Explanation: "Under ROI evaluation, the manager would reject the project because it dilutes the current 22% ROI. Under residual income, the project would be accepte..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "manager would reject the"

P1B-C-143 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "$18,000"
  Explanation: "$18,000 incorrectly calculates after-tax income. After-tax OI = $200,000 x (1 - 0.30) = $140,000, not a different amount."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-C-153 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Both division managers will prefer the same transfer price"
  Explanation: "Division managers have opposing interests. The selling division benefits from a higher transfer price (higher profit), while the buying division benef..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "while the buying division"

P1B-C-165 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Analyze performance gaps"
  Explanation: "Analysis of performance gaps occurs after collecting data from benchmarking partners. Identifying the scope of benchmarking comes first."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice C "data from benchmarking partners"

P1B-C-178 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Product P with higher CM per unit"
  Explanation: "CM per unit alone is misleading when a constraint exists. Product P has higher CM per unit ($60 vs $50), but lower CM per machine hour ($20 vs $25). U..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "CM per machine hour"
    - VERBATIM_MATCH: explanation contains text from choice C "CM per machine hour"

P1B-C-178 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Product P with $20 CM per machine hour"
  Explanation: "Product P's CM per machine hour is $20 ($60 / 3 MH), not $25. Product Q has $25 per MH ($50 / 2 MH), making Product Q the preferred product."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "CM per machine hour"

P1B-C-179 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Product H is undercosted and Product L is overcosted"
  Explanation: "The direction is reversed. Product H receives 80% of overhead (via DLH) but uses only 40% of setups, so Product H is overcosted. Product L receives 20..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Product H is overcosted"

P1B-C-182 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Managers investigate all variances regardless of size"
  Explanation: "Management by exception does not investigate all variances. Only significant deviations from standards warrant investigation to conserve management ti..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "significant deviations from standards"

P1B-C-183 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "Favorable variances should never be investigated because they improve profitability"
  Explanation: "Favorable variances can signal problems. A favorable materials price variance from purchasing inferior materials may lead to quality issues and future..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "future unfavorable usage variances"

P1B-C-191 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Debit Work-in-Process at actual cost; Credit Raw Materials at standard cost"
  Explanation: "WIP should be debited at standard cost (standard quantity x standard price), not actual cost. The quantity variance is recorded separately at the time..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "standard quantity x standard"

P1B-C-192 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Normal costing uses standards only for overhead; standard costing uses actual costs for all inputs"
  Explanation: "The description is reversed. Normal costing uses actual direct costs with applied overhead. Standard costing uses standards for all manufacturing cost..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Normal costing uses actual"

P1B-C-192 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Normal costing uses actual direct materials and direct labor with applied overhead; standard costing uses predetermined standards for all manufacturing costs"
  Explanation: "Normal costing uses actual costs for direct materials and direct labor but applies overhead using predetermined rates. Standard costing uses predeterm..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "costing uses actual costs"

P1B-C-197 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Kaizen costing focuses on continuous cost reduction by setting progressively lower cost targets, while standard costing uses fixed targets"
  Explanation: "Kaizen costing is a cost reduction approach that sets continuous improvement targets throughout the year. Unlike traditional standard costing which se..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "sets fixed standards for"

P1B-D-107 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Activity: Nursing care; Cost driver: Number of nursing hours per patient"
  Explanation: "The most appropriate cost driver for nursing care costs is the number of nursing hours per patient. There is a direct cause-and-effect relationship be..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "Number of nursing hours"

P1B-D-114 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Ignored entirely"
  Explanation: "Byproduct value is not ignored. Under the production method, it reduces joint costs allocated to the main product."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "allocated to the main"

P1B-D-128 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Absorption costing income will be higher than variable costing income because fixed overhead is deferred in ending inventory"
  Explanation: "When production exceeds sales, absorption costing defers a portion of fixed manufacturing overhead in ending inventory (as a product cost), while vari..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "as a product cost"

P1B-D-136 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "$200,000; 33%"
  Explanation: "$200,000 is correct for margin of safety in dollars, but the percentage is $200,000 / $800,000 = 25%, not 33%."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-D-139 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Operating income will decrease"
  Explanation: "Operating income will increase, not decrease. The shift favors the higher-margin product (B), which improves overall profitability."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Operating income will increase"

P1B-D-140 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "The sales mix remains constant"
  Explanation: "Key assumptions of CVP analysis include: (1) the sales mix remains constant; (2) costs can be accurately classified as fixed or variable; (3) total re..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "Variable costs per unit"

P1B-E-084 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "ITIL Framework"
  Explanation: "The COSO ERM framework (Enterprise Risk Management ├óΓé¼ΓÇ¥ Integrating with Strategy and Performance) is specifically designed to help organizations align..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "Enterprise Risk Management ├óΓé¼ΓÇ¥"

P1B-E-094 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Internal auditors focus primarily on detecting fraud, while external auditors only review tax compliance"
  Explanation: "External auditors are independent contractors; internal auditors are typically employees. The description is reversed."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "auditors are independent contractors"

P1B-E-095 (pack_b_corrected.js) slot ExplanationWrongA
  Choice: "All members must be certified public accountants"
  Explanation: "Not all members must be CPAs; financial literacy is expected but only one financial expert is required."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice C "All members must be"

P1B-E-095 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "The audit committee chair must be the CEO"
  Explanation: "Under the Sarbanes-Oxley Act, all audit committee members must be independent (not accept consulting or advisory fees from the issuer and not be affil..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "members must be independent"

P1B-E-100 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "The Dodd-Frank Wall Street Reform and Consumer Protection Act"
  Explanation: "Both SOX and Dodd-Frank provide protections, not Dodd-Frank alone."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Both SOX and Dodd-Frank"

P1B-E-105 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Granting new employees full system access by default and removing access only upon termination"
  Explanation: "Multi-factor authentication requires two or more verification factors (something you know, something you have, something you are) and significantly re..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "combined with role-based access"

P1B-E-109 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Disaster recovery plan (DRP)"
  Explanation: "A business continuity plan (BCP) focuses on maintaining or quickly resuming critical business operations during and after a disruption. While related,..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "Business continuity plan (BCP)"

P1B-E-110 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Business Impact Analysis (BIA) and Risk Assessment (RA)"
  Explanation: "The Recovery Time Objective (RTO) defines the maximum acceptable time to restore a system or process after a disruption. The Recovery Point Objective ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "Recovery Time Objective (RTO)"

P1B-E-114 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "The company must establish a whistleblower hotline"
  Explanation: "Section 404 requires management to assess and report on the effectiveness of internal control over financial reporting (ICFR). The external auditor mu..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "assess and report on"

P1B-E-120 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "The organization's stock price performance"
  Explanation: "The number of employees is not a direct indicator of fraud risk."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The number of employees"

P1B-E-124 (pack_b_corrected.js) slot ExplanationWrongB
  Choice: "Conducting surprise audits after discovering irregularities"
  Explanation: "Insurance is corrective/risk transfer, addressing loss after fraud has occurred."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1B-E-124 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Performing a post-incident forensic investigation"
  Explanation: "Preventive controls that deter fraud before it occurs are more cost-effective than detective or corrective measures. A strong control environment ├óΓé¼ΓÇ¥ ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "a strong control environment"

P1B-E-127 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Encrypt customer account information in the database"
  Explanation: "A check digit is a calculated digit added to an identification number (such as a customer or vendor account number). When the number is entered, the s..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "data entry errors such"

P1B-F-090 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Providing a shared, cryptographically secure record of transactions that both parties and an independent verifier can trust"
  Explanation: "Triple-entry accounting on a blockchain creates a shared, cryptographically signed record of each transaction that is accessible to both transacting p..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "the need for auditors"

P1B-F-100 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Request that a business disclose the categories and specific pieces of personal information collected about them"
  Explanation: "While the right to know what personal information is collected is a CCPA right, this is only one of several rights. 'All of the above' is the most com..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "All of the above"

P1B-F-108 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "A SOC 1 Type II report (formerly SAS 70)"
  Explanation: "SOC 2 Type II reports are designed for service organizations that store or process customer data and address controls related to security, availabilit..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "2 Type II report"

P1B-F-114 (pack_b_corrected.js) slot ExplanationWrongD
  Choice: "Within 72 hours of becoming aware of the breach"
  Explanation: "Under GDPR, organizations must notify the relevant supervisory authority of a personal data breach within 72 hours of becoming aware of it, unless the..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "hours of becoming aware"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "of becoming aware of"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "of becoming aware of"

P1B-F-116 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Segregation of duties is no longer relevant in an ERP environment"
  Explanation: "In ERP systems, controls are often embedded in system configuration and access rights. Proper segregation of duties must be enforced through role-base..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "proper segregation of duties"

P1B-F-150 (pack_b_corrected.js) slot ExplanationWrongC
  Choice: "Data governance maturity"
  Explanation: "Data governance maturity models focus on data policies, stewardship, and quality management. The described progression from descriptive to prescriptiv..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The analytics maturity model"

--- pack_c_corrected.js ΓÇö 699 findings ---

P1-AC-002 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Recognize the entire premium as revenue at issuance"
  Explanation: "Option A (Recognize the entire premium as revenue at issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-002 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Add the premium to interest expense each period"
  Explanation: "Option C (Add the premium to interest expense each period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-002 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Ignore the premium since it does not affect cash flows"
  Explanation: "Option D (Ignore the premium since it does not affect cash flows) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-003 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the premium since it does not affect cash flows"
  Explanation: "Option A (Ignore the premium since it does not affect cash flows) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-003 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Add the premium to interest expense each period"
  Explanation: "Option B (Add the premium to interest expense each period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-003 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Recognize the entire premium as revenue at issuance"
  Explanation: "Option D (Recognize the entire premium as revenue at issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-004 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the premium since it does not affect cash flows"
  Explanation: "Option A (Ignore the premium since it does not affect cash flows) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-004 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Recognize the entire premium as revenue at issuance"
  Explanation: "Option B (Recognize the entire premium as revenue at issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-004 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Add the premium to interest expense each period"
  Explanation: "Option C (Add the premium to interest expense each period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the premium as"

P1-AC-006 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Classify as trading and measure at fair value through net income"
  Explanation: "Option A (Classify as trading and measure at fair value through net income) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-006 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Classify as inventory and measure at lower of cost or market"
  Explanation: "Option C (Classify as inventory and measure at lower of cost or market) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-006 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Classify as equity and measure at cost"
  Explanation: "Option D (Classify as equity and measure at cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-007 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Classify as equity and measure at cost"
  Explanation: "Option A (Classify as equity and measure at cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-007 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Classify as trading and measure at fair value through net income"
  Explanation: "Option B (Classify as trading and measure at fair value through net income) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-007 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Classify as inventory and measure at lower of cost or market"
  Explanation: "Option D (Classify as inventory and measure at lower of cost or market) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-008 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Classify as equity and measure at cost"
  Explanation: "Option A (Classify as equity and measure at cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-008 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Classify as trading and measure at fair value through net income"
  Explanation: "Option B (Classify as trading and measure at fair value through net income) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-008 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Classify as inventory and measure at lower of cost or market"
  Explanation: "Option C (Classify as inventory and measure at lower of cost or market) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Classify as inventory and measure at lower of cost or market"
  Explanation: "Option A (Classify as inventory and measure at lower of cost or market) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Classify as trading and measure at fair value through net income"
  Explanation: "Option C (Classify as trading and measure at fair value through net income) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Classify as equity and measure at cost"
  Explanation: "Option D (Classify as equity and measure at cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Classify as held-to-maturity and"

P1-AC-015 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Use the cost method and recognize dividends only"
  Explanation: "Recognizing dividends only would understate the accounting effect of significant influence because the investor must recognize its share of investee i..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "share of investee income"

P1-AC-016 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Amortize goodwill on a straight-line basis over 40 years"
  Explanation: "Option A (Amortize goodwill on a straight-line basis over 40 years) represents a plausible misconception. Under ASC 360 (Impairment), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-016 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Increase goodwill whenever fair value rises above carrying amount"
  Explanation: "Option B (Increase goodwill whenever fair value rises above carrying amount) represents a plausible misconception. Under ASC 360 (Impairment), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-016 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Never test goodwill unless it is sold"
  Explanation: "Option C (Never test goodwill unless it is sold) represents a plausible misconception. Under ASC 360 (Impairment), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-018 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Never test goodwill unless it is sold"
  Explanation: "Option A (Never test goodwill unless it is sold) represents a plausible misconception. Under ASC 360 (Impairment), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-018 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Increase goodwill whenever fair value rises above carrying amount"
  Explanation: "Option C (Increase goodwill whenever fair value rises above carrying amount) represents a plausible misconception. Under ASC 360 (Impairment), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-018 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Amortize goodwill on a straight-line basis over 40 years"
  Explanation: "Option D (Amortize goodwill on a straight-line basis over 40 years) represents a plausible misconception. Under ASC 360 (Impairment), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-019 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Amortize goodwill on a straight-line basis over 40 years"
  Explanation: "Option A (Amortize goodwill on a straight-line basis over 40 years) represents a plausible misconception. Under ASC 360 (Impairment), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-019 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Increase goodwill whenever fair value rises above carrying amount"
  Explanation: "Option B (Increase goodwill whenever fair value rises above carrying amount) represents a plausible misconception. Under ASC 360 (Impairment), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-019 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Never test goodwill unless it is sold"
  Explanation: "Option D (Never test goodwill unless it is sold) represents a plausible misconception. Under ASC 360 (Impairment), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-020 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Increase goodwill whenever fair value rises above carrying amount"
  Explanation: "Option A (Increase goodwill whenever fair value rises above carrying amount) represents a plausible misconception. Under ASC 360 (Impairment), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-020 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Amortize goodwill on a straight-line basis over 40 years"
  Explanation: "Option B (Amortize goodwill on a straight-line basis over 40 years) represents a plausible misconception. Under ASC 360 (Impairment), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-020 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Never test goodwill unless it is sold"
  Explanation: "Option C (Never test goodwill unless it is sold) represents a plausible misconception. Under ASC 360 (Impairment), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Compare the reporting unit's"

P1-AC-022 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record no asset or liability since it is operating in nature"
  Explanation: "Option A (Record no asset or liability since it is operating in nature) represents a plausible misconception. Under ASC 842 (Leases), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-022 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Record the asset only, with no liability"
  Explanation: "Option C (Record the asset only, with no liability) represents a plausible misconception. Under ASC 842 (Leases), the correct analysis leads to the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-022 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Record only a footnote disclosure with no balance sheet impact"
  Explanation: "Option D (Record only a footnote disclosure with no balance sheet impact) represents a plausible misconception. Under ASC 842 (Leases), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-023 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record only a footnote disclosure with no balance sheet impact"
  Explanation: "Option A (Record only a footnote disclosure with no balance sheet impact) represents a plausible misconception. Under ASC 842 (Leases), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-023 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Record the asset only, with no liability"
  Explanation: "Option B (Record the asset only, with no liability) represents a plausible misconception. Under ASC 842 (Leases), the correct analysis leads to the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-023 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Record no asset or liability since it is operating in nature"
  Explanation: "Option D (Record no asset or liability since it is operating in nature) represents a plausible misconception. Under ASC 842 (Leases), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-024 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record only a footnote disclosure with no balance sheet impact"
  Explanation: "Option A (Record only a footnote disclosure with no balance sheet impact) represents a plausible misconception. Under ASC 842 (Leases), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-024 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Record the asset only, with no liability"
  Explanation: "Option B (Record the asset only, with no liability) represents a plausible misconception. Under ASC 842 (Leases), the correct analysis leads to the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-024 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Record no asset or liability since it is operating in nature"
  Explanation: "Option C (Record no asset or liability since it is operating in nature) represents a plausible misconception. Under ASC 842 (Leases), the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a right-of-use asset"

P1-AC-031 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Translate only revenue accounts and ignore the balance sheet"
  Explanation: "Option A (Translate only revenue accounts and ignore the balance sheet) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-031 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Do not translate; report in the subsidiary's local currency"
  Explanation: "Option B (Do not translate; report in the subsidiary's local currency) represents a plausible misconception. Under CMA Part 1 accounting principles, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-031 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Translate everything at the historical rate with gains in net income"
  Explanation: "Option D (Translate everything at the historical rate with gains in net income) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-032 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Translate everything at the historical rate with gains in net income"
  Explanation: "Option A (Translate everything at the historical rate with gains in net income) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-032 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Do not translate; report in the subsidiary's local currency"
  Explanation: "Option B (Do not translate; report in the subsidiary's local currency) represents a plausible misconception. Under CMA Part 1 accounting principles, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-032 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Translate only revenue accounts and ignore the balance sheet"
  Explanation: "Option C (Translate only revenue accounts and ignore the balance sheet) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-034 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Translate only revenue accounts and ignore the balance sheet"
  Explanation: "Option A (Translate only revenue accounts and ignore the balance sheet) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-034 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Do not translate; report in the subsidiary's local currency"
  Explanation: "Option C (Do not translate; report in the subsidiary's local currency) represents a plausible misconception. Under CMA Part 1 accounting principles, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-034 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Translate everything at the historical rate with gains in net income"
  Explanation: "Option D (Translate everything at the historical rate with gains in net income) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-035 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Translate everything at the historical rate with gains in net income"
  Explanation: "Option A (Translate everything at the historical rate with gains in net income) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-035 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Do not translate; report in the subsidiary's local currency"
  Explanation: "Option B (Do not translate; report in the subsidiary's local currency) represents a plausible misconception. Under CMA Part 1 accounting principles, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-035 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Translate only revenue accounts and ignore the balance sheet"
  Explanation: "Option D (Translate only revenue accounts and ignore the balance sheet) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Translate assets and liabilities"

P1-AC-036 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire transaction immediately"
  Explanation: "Option A (Expense the entire transaction immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice B "Record the new asset"

P1-AC-036 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Record the new asset at its fair value with full gain recognition"
  Explanation: "Option B (Record the new asset at its fair value with full gain recognition) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"

P1-AC-036 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Record the exchange as a financing activity"
  Explanation: "Option C (Record the exchange as a financing activity) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice B "Record the new asset"

P1-AC-038 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire transaction immediately"
  Explanation: "Option A (Expense the entire transaction immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice C "Record the new asset"

P1-AC-038 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Record the new asset at its fair value with full gain recognition"
  Explanation: "Option C (Record the new asset at its fair value with full gain recognition) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"

P1-AC-038 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Record the exchange as a financing activity"
  Explanation: "Option D (Record the exchange as a financing activity) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice C "Record the new asset"

P1-AC-039 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record the exchange as a financing activity"
  Explanation: "Option A (Record the exchange as a financing activity) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice D "Record the new asset"

P1-AC-039 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Expense the entire transaction immediately"
  Explanation: "Option B (Expense the entire transaction immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice D "Record the new asset"

P1-AC-039 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Record the new asset at its fair value with full gain recognition"
  Explanation: "Option D (Record the new asset at its fair value with full gain recognition) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"

P1-AC-040 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record the exchange as a financing activity"
  Explanation: "Option A (Record the exchange as a financing activity) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice B "Record the new asset"

P1-AC-040 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Record the new asset at its fair value with full gain recognition"
  Explanation: "Option B (Record the new asset at its fair value with full gain recognition) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"

P1-AC-040 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Expense the entire transaction immediately"
  Explanation: "Option C (Expense the entire transaction immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Record the new asset"
    - VERBATIM_MATCH: explanation contains text from choice B "Record the new asset"

P1-AC-042 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire fair value immediately at grant date"
  Explanation: "Option A (Expense the entire fair value immediately at grant date) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-042 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Recognize expense only when options are exercised"
  Explanation: "Option C (Recognize expense only when options are exercised) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-042 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Record the grant as a reduction of retained earnings only"
  Explanation: "Option D (Record the grant as a reduction of retained earnings only) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-043 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Record the grant as a reduction of retained earnings only"
  Explanation: "Option A (Record the grant as a reduction of retained earnings only) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-043 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Recognize expense only when options are exercised"
  Explanation: "Option B (Recognize expense only when options are exercised) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-043 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Expense the entire fair value immediately at grant date"
  Explanation: "Option D (Expense the entire fair value immediately at grant date) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-044 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire fair value immediately at grant date"
  Explanation: "Option A (Expense the entire fair value immediately at grant date) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-044 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Record the grant as a reduction of retained earnings only"
  Explanation: "Option B (Record the grant as a reduction of retained earnings only) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-044 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Recognize expense only when options are exercised"
  Explanation: "Option C (Recognize expense only when options are exercised) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize compensation cost based"

P1-AC-046 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At fair value with gains recognized immediately"
  Explanation: "Option A (At fair value with gains recognized immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-046 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At historical cost with no further adjustment"
  Explanation: "Option C (At historical cost with no further adjustment) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-046 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "At replacement cost regardless of fair value"
  Explanation: "Option D (At replacement cost regardless of fair value) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-047 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At replacement cost regardless of fair value"
  Explanation: "Option A (At replacement cost regardless of fair value) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-047 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "At historical cost with no further adjustment"
  Explanation: "Option B (At historical cost with no further adjustment) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-047 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "At fair value with gains recognized immediately"
  Explanation: "Option D (At fair value with gains recognized immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-048 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At historical cost with no further adjustment"
  Explanation: "Option A (At historical cost with no further adjustment) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-048 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "At replacement cost regardless of fair value"
  Explanation: "Option B (At replacement cost regardless of fair value) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-048 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At fair value with gains recognized immediately"
  Explanation: "Option C (At fair value with gains recognized immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-050 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At historical cost with no further adjustment"
  Explanation: "Option A (At historical cost with no further adjustment) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-050 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At fair value with gains recognized immediately"
  Explanation: "Option C (At fair value with gains recognized immediately) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-050 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "At replacement cost regardless of fair value"
  Explanation: "Option D (At replacement cost regardless of fair value) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "the lower of its"

P1-AC-051 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Use the prior year's actual tax rate regardless of current results"
  Explanation: "Option A (Use the prior year's actual tax rate regardless of current results) represents a plausible misconception. Under ASC 740 (Income Taxes), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-051 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Apply the statutory rate to interim revenue only"
  Explanation: "Option B (Apply the statutory rate to interim revenue only) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-051 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Recognize no tax expense until year-end"
  Explanation: "Option D (Recognize no tax expense until year-end) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-052 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Use the prior year's actual tax rate regardless of current results"
  Explanation: "Option A (Use the prior year's actual tax rate regardless of current results) represents a plausible misconception. Under ASC 740 (Income Taxes), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-052 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Apply the statutory rate to interim revenue only"
  Explanation: "Option B (Apply the statutory rate to interim revenue only) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-052 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Recognize no tax expense until year-end"
  Explanation: "Option C (Recognize no tax expense until year-end) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-054 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Use the prior year's actual tax rate regardless of current results"
  Explanation: "Option A (Use the prior year's actual tax rate regardless of current results) represents a plausible misconception. Under ASC 740 (Income Taxes), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Apply the statutory rate to interim revenue only"
  Explanation: "Option C (Apply the statutory rate to interim revenue only) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-054 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Recognize no tax expense until year-end"
  Explanation: "Option D (Recognize no tax expense until year-end) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-055 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Recognize no tax expense until year-end"
  Explanation: "Option A (Recognize no tax expense until year-end) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-055 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Use the prior year's actual tax rate regardless of current results"
  Explanation: "Option B (Use the prior year's actual tax rate regardless of current results) represents a plausible misconception. Under ASC 740 (Income Taxes), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-055 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Apply the statutory rate to interim revenue only"
  Explanation: "Option D (Apply the statutory rate to interim revenue only) represents a plausible misconception. Under ASC 740 (Income Taxes), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Apply an estimated annual"

P1-AC-056 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At replacement cost only for inventory"
  Explanation: "Option A (At replacement cost only for inventory) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-056 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "At the acquirer's historical book values"
  Explanation: "Option B (At the acquirer's historical book values) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-056 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At the target's original historical cost"
  Explanation: "Option C (At the target's original historical cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-058 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At the target's original historical cost"
  Explanation: "Option A (At the target's original historical cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-058 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At the acquirer's historical book values"
  Explanation: "Option C (At the acquirer's historical book values) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-058 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "At replacement cost only for inventory"
  Explanation: "Option D (At replacement cost only for inventory) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-059 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At the acquirer's historical book values"
  Explanation: "Option A (At the acquirer's historical book values) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-059 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "At replacement cost only for inventory"
  Explanation: "Option B (At replacement cost only for inventory) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-059 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "At the target's original historical cost"
  Explanation: "Option D (At the target's original historical cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-060 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "At replacement cost only for inventory"
  Explanation: "Option A (At replacement cost only for inventory) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-060 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "At the target's original historical cost"
  Explanation: "Option B (At the target's original historical cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-060 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "At the acquirer's historical book values"
  Explanation: "Option C (At the acquirer's historical book values) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "At their acquisition-date fair"

P1-AC-062 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Net pension assets against unrelated liabilities"
  Explanation: "Option A (Net pension assets against unrelated liabilities) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-062 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Report pension plans only in footnotes with no balance sheet impact"
  Explanation: "Option C (Report pension plans only in footnotes with no balance sheet impact) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-062 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Report the accumulated benefit obligation only, ignoring plan assets"
  Explanation: "Option D (Report the accumulated benefit obligation only, ignoring plan assets) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-063 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Net pension assets against unrelated liabilities"
  Explanation: "Option A (Net pension assets against unrelated liabilities) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-063 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Report pension plans only in footnotes with no balance sheet impact"
  Explanation: "Option B (Report pension plans only in footnotes with no balance sheet impact) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-063 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Report the accumulated benefit obligation only, ignoring plan assets"
  Explanation: "Option D (Report the accumulated benefit obligation only, ignoring plan assets) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-064 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Report pension plans only in footnotes with no balance sheet impact"
  Explanation: "Option A (Report pension plans only in footnotes with no balance sheet impact) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-064 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Net pension assets against unrelated liabilities"
  Explanation: "Option B (Net pension assets against unrelated liabilities) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-064 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Report the accumulated benefit obligation only, ignoring plan assets"
  Explanation: "Option C (Report the accumulated benefit obligation only, ignoring plan assets) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Report the overfunded or"

P1-AC-066 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Report the amount as an extraordinary item"
  Explanation: "Option A (Report the amount as an extraordinary item) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-066 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Accrue a liability for the full estimated loss"
  Explanation: "Option C (Accrue a liability for the full estimated loss) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-066 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Ignore the matter until the lawsuit is resolved"
  Explanation: "Option D (Ignore the matter until the lawsuit is resolved) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-067 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the matter until the lawsuit is resolved"
  Explanation: "Option A (Ignore the matter until the lawsuit is resolved) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-067 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Report the amount as an extraordinary item"
  Explanation: "Option B (Report the amount as an extraordinary item) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-067 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Accrue a liability for the full estimated loss"
  Explanation: "Option D (Accrue a liability for the full estimated loss) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-068 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the matter until the lawsuit is resolved"
  Explanation: "Option A (Ignore the matter until the lawsuit is resolved) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-068 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Accrue a liability for the full estimated loss"
  Explanation: "Option B (Accrue a liability for the full estimated loss) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-068 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Report the amount as an extraordinary item"
  Explanation: "Option C (Report the amount as an extraordinary item) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-070 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the matter until the lawsuit is resolved"
  Explanation: "Option A (Ignore the matter until the lawsuit is resolved) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-070 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Report the amount as an extraordinary item"
  Explanation: "Option C (Report the amount as an extraordinary item) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-070 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Accrue a liability for the full estimated loss"
  Explanation: "Option D (Accrue a liability for the full estimated loss) represents a plausible misconception. Under ASC 405 (Liabilities), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclose the nature and"

P1-AC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire cost immediately upon acquisition"
  Explanation: "Option A (Expense the entire cost immediately upon acquisition) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Revalue the patent to fair value each year through net income"
  Explanation: "Option B (Revalue the patent to fair value each year through net income) represents a plausible misconception. Under ASC 350 (Intangibles), the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Never amortize intangible assets with finite lives"
  Explanation: "Option D (Never amortize intangible assets with finite lives) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-071 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Amortize the patent's cost over its useful life"
  Explanation: "Intangible assets with finite useful lives are amortized over their useful life; those with indefinite lives are tested for impairment instead."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "intangible assets with finite"

P1-AC-072 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Revalue the patent to fair value each year through net income"
  Explanation: "Option A (Revalue the patent to fair value each year through net income) represents a plausible misconception. Under ASC 350 (Intangibles), the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-072 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Expense the entire cost immediately upon acquisition"
  Explanation: "Option B (Expense the entire cost immediately upon acquisition) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-072 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Never amortize intangible assets with finite lives"
  Explanation: "Option C (Never amortize intangible assets with finite lives) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-072 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Amortize the patent's cost over its useful life"
  Explanation: "Intangible assets with finite useful lives are amortized over their useful life; those with indefinite lives are tested for impairment instead."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "intangible assets with finite"

P1-AC-074 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Never amortize intangible assets with finite lives"
  Explanation: "Option A (Never amortize intangible assets with finite lives) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-074 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Expense the entire cost immediately upon acquisition"
  Explanation: "Option C (Expense the entire cost immediately upon acquisition) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-074 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Revalue the patent to fair value each year through net income"
  Explanation: "Option D (Revalue the patent to fair value each year through net income) represents a plausible misconception. Under ASC 350 (Intangibles), the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-074 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Amortize the patent's cost over its useful life"
  Explanation: "Intangible assets with finite useful lives are amortized over their useful life; those with indefinite lives are tested for impairment instead."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "intangible assets with finite"

P1-AC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Expense the entire cost immediately upon acquisition"
  Explanation: "Option A (Expense the entire cost immediately upon acquisition) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Revalue the patent to fair value each year through net income"
  Explanation: "Option B (Revalue the patent to fair value each year through net income) represents a plausible misconception. Under ASC 350 (Intangibles), the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Never amortize intangible assets with finite lives"
  Explanation: "Option D (Never amortize intangible assets with finite lives) represents a plausible misconception. Under ASC 350 (Intangibles), the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Amortize the patent's cost"

P1-AC-075 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Amortize the patent's cost over its useful life"
  Explanation: "Intangible assets with finite useful lives are amortized over their useful life; those with indefinite lives are tested for impairment instead."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "intangible assets with finite"

P1-BC-008 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the forecast will be accurate regardless of market change"
  Explanation: "Option A (It guarantees the forecast will be accurate regardless of market change) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-008 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It only works when sales are perfectly stable"
  Explanation: "Option B (It only works when sales are perfectly stable) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-008 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for management judgment entirely"
  Explanation: "Option C (It eliminates the need for management judgment entirely) represents a plausible misconception. Under Forecasting techniques, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It only works when sales are perfectly stable"
  Explanation: "Option A (It only works when sales are perfectly stable) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the forecast will be accurate regardless of market change"
  Explanation: "Option C (It guarantees the forecast will be accurate regardless of market change) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for management judgment entirely"
  Explanation: "Option D (It eliminates the need for management judgment entirely) represents a plausible misconception. Under Forecasting techniques, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-011 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the forecast will be accurate regardless of market change"
  Explanation: "Option A (It guarantees the forecast will be accurate regardless of market change) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-011 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It only works when sales are perfectly stable"
  Explanation: "Option B (It only works when sales are perfectly stable) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-011 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for management judgment entirely"
  Explanation: "Option D (It eliminates the need for management judgment entirely) represents a plausible misconception. Under Forecasting techniques, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-012 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the forecast will be accurate regardless of market change"
  Explanation: "Option A (It guarantees the forecast will be accurate regardless of market change) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-012 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It only works when sales are perfectly stable"
  Explanation: "Option B (It only works when sales are perfectly stable) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-012 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for management judgment entirely"
  Explanation: "Option C (It eliminates the need for management judgment entirely) represents a plausible misconception. Under Forecasting techniques, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-014 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It only works when sales are perfectly stable"
  Explanation: "Option A (It only works when sales are perfectly stable) represents a plausible misconception. Under Forecasting techniques, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-014 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the forecast will be accurate regardless of market change"
  Explanation: "Option C (It guarantees the forecast will be accurate regardless of market change) represents a plausible misconception. Under Forecasting techniques,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-014 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for management judgment entirely"
  Explanation: "Option D (It eliminates the need for management judgment entirely) represents a plausible misconception. Under Forecasting techniques, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It quantifies the relationship"

P1-BC-021 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A rolling forecast, which keeps planning horizons current and responsive to changing conditions"
  Explanation: "A rolling forecast updates incrementally by replacing the period that just ended with a new future period, keeping the forecast horizon constant. This..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "for the fiscal year"

P1-BC-035 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To immediately liquidate long-term assets without planning"
  Explanation: "Option A (To immediately liquidate long-term assets without planning) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-035 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To increase dividends despite the shortfall"
  Explanation: "Option B (To increase dividends despite the shortfall) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-035 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To ignore the shortfall since it is only a forecast"
  Explanation: "Option D (To ignore the shortfall since it is only a forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-036 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To ignore the shortfall since it is only a forecast"
  Explanation: "Option A (To ignore the shortfall since it is only a forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-036 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To increase dividends despite the shortfall"
  Explanation: "Option B (To increase dividends despite the shortfall) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-036 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To immediately liquidate long-term assets without planning"
  Explanation: "Option C (To immediately liquidate long-term assets without planning) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-038 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To ignore the shortfall since it is only a forecast"
  Explanation: "Option A (To ignore the shortfall since it is only a forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-038 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To increase dividends despite the shortfall"
  Explanation: "Option C (To increase dividends despite the shortfall) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-038 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To immediately liquidate long-term assets without planning"
  Explanation: "Option D (To immediately liquidate long-term assets without planning) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-039 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To ignore the shortfall since it is only a forecast"
  Explanation: "Option A (To ignore the shortfall since it is only a forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-039 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To immediately liquidate long-term assets without planning"
  Explanation: "Option B (To immediately liquidate long-term assets without planning) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-039 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To increase dividends despite the shortfall"
  Explanation: "Option D (To increase dividends despite the shortfall) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-040 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To immediately liquidate long-term assets without planning"
  Explanation: "Option A (To immediately liquidate long-term assets without planning) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-040 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To increase dividends despite the shortfall"
  Explanation: "Option B (To increase dividends despite the shortfall) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-040 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To ignore the shortfall since it is only a forecast"
  Explanation: "Option C (To ignore the shortfall since it is only a forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To arrange financing or"

P1-BC-047 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Complete removal of the need for variance analysis"
  Explanation: "Option A (Complete removal of the need for variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-047 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Automatic alignment with corporate strategic goals"
  Explanation: "Option B (Automatic alignment with corporate strategic goals) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-047 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Elimination of all motivational benefits of budgeting"
  Explanation: "Option D (Elimination of all motivational benefits of budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-048 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Elimination of all motivational benefits of budgeting"
  Explanation: "Option A (Elimination of all motivational benefits of budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-048 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Automatic alignment with corporate strategic goals"
  Explanation: "Option B (Automatic alignment with corporate strategic goals) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-048 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Complete removal of the need for variance analysis"
  Explanation: "Option C (Complete removal of the need for variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-050 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Automatic alignment with corporate strategic goals"
  Explanation: "Option A (Automatic alignment with corporate strategic goals) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-050 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Elimination of all motivational benefits of budgeting"
  Explanation: "Option C (Elimination of all motivational benefits of budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-050 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Complete removal of the need for variance analysis"
  Explanation: "Option D (Complete removal of the need for variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-051 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Elimination of all motivational benefits of budgeting"
  Explanation: "Option A (Elimination of all motivational benefits of budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-051 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Automatic alignment with corporate strategic goals"
  Explanation: "Option B (Automatic alignment with corporate strategic goals) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-051 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Complete removal of the need for variance analysis"
  Explanation: "Option D (Complete removal of the need for variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-052 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Complete removal of the need for variance analysis"
  Explanation: "Option A (Complete removal of the need for variance analysis) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-052 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Automatic alignment with corporate strategic goals"
  Explanation: "Option B (Automatic alignment with corporate strategic goals) represents a plausible misconception. Under Budgeting concepts and methodologies, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-052 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Elimination of all motivational benefits of budgeting"
  Explanation: "Option C (Elimination of all motivational benefits of budgeting) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where managers understate revenue"

P1-BC-054 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Elimination of the need for a sales forecast"
  Explanation: "Option A (Elimination of the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Guaranteed accuracy because executives have complete information"
  Explanation: "Option C (Guaranteed accuracy because executives have complete information) represents a plausible misconception. Under Budgeting concepts and methodo..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-054 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Faster achievement of all financial targets"
  Explanation: "Option D (Faster achievement of all financial targets) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-055 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Faster achievement of all financial targets"
  Explanation: "Option A (Faster achievement of all financial targets) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-055 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Guaranteed accuracy because executives have complete information"
  Explanation: "Option B (Guaranteed accuracy because executives have complete information) represents a plausible misconception. Under Budgeting concepts and methodo..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-055 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Elimination of the need for a sales forecast"
  Explanation: "Option D (Elimination of the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-058 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Faster achievement of all financial targets"
  Explanation: "Option A (Faster achievement of all financial targets) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-058 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Guaranteed accuracy because executives have complete information"
  Explanation: "Option C (Guaranteed accuracy because executives have complete information) represents a plausible misconception. Under Budgeting concepts and methodo..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-058 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Elimination of the need for a sales forecast"
  Explanation: "Option D (Elimination of the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Lower manager buy-in and"

P1-BC-059 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets costs to zero"
  Explanation: "Option A (Zero-based budgeting, which resets costs to zero) represents a plausible misconception. Under Forecasting techniques, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-059 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The high-low method, which ignores efficiency gains"
  Explanation: "Option B (The high-low method, which ignores efficiency gains) represents a plausible misconception. Under Forecasting techniques, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-059 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A static budget, which assumes constant labor time"
  Explanation: "Option D (A static budget, which assumes constant labor time) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-060 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The high-low method, which ignores efficiency gains"
  Explanation: "Option A (The high-low method, which ignores efficiency gains) represents a plausible misconception. Under Forecasting techniques, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-060 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting, which resets costs to zero"
  Explanation: "Option B (Zero-based budgeting, which resets costs to zero) represents a plausible misconception. Under Forecasting techniques, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-060 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A static budget, which assumes constant labor time"
  Explanation: "Option C (A static budget, which assumes constant labor time) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-062 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets costs to zero"
  Explanation: "Option A (Zero-based budgeting, which resets costs to zero) represents a plausible misconception. Under Forecasting techniques, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-062 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The high-low method, which ignores efficiency gains"
  Explanation: "Option C (The high-low method, which ignores efficiency gains) represents a plausible misconception. Under Forecasting techniques, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-062 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A static budget, which assumes constant labor time"
  Explanation: "Option D (A static budget, which assumes constant labor time) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-063 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets costs to zero"
  Explanation: "Option A (Zero-based budgeting, which resets costs to zero) represents a plausible misconception. Under Forecasting techniques, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-063 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The high-low method, which ignores efficiency gains"
  Explanation: "Option B (The high-low method, which ignores efficiency gains) represents a plausible misconception. Under Forecasting techniques, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-063 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A static budget, which assumes constant labor time"
  Explanation: "Option D (A static budget, which assumes constant labor time) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-064 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A static budget, which assumes constant labor time"
  Explanation: "Option A (A static budget, which assumes constant labor time) represents a plausible misconception. Under Forecasting techniques, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-064 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting, which resets costs to zero"
  Explanation: "Option B (Zero-based budgeting, which resets costs to zero) represents a plausible misconception. Under Forecasting techniques, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-064 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The high-low method, which ignores efficiency gains"
  Explanation: "Option C (The high-low method, which ignores efficiency gains) represents a plausible misconception. Under Forecasting techniques, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which projects declining average"

P1-BC-065 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "3.75 per machine hour"
  Explanation: "This choice divides the cost change ($15,000) by 4,000 instead of the actual activity range of 3,000 hours (8,000 - 5,000). The denominator must be th..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (5.00) not distractor numbers

P1-BC-066 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "3.75 per machine hour"
  Explanation: "This choice divides the cost change ($15,000) by 4,000 instead of the actual activity range of 3,000 hours (8,000 - 5,000). The denominator must be th..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (5.00) not distractor numbers

P1-BC-067 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "3.75 per machine hour"
  Explanation: "This choice divides the cost change ($15,000) by 4,000 instead of the actual activity range of 3,000 hours (8,000 - 5,000). The denominator must be th..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (5.00) not distractor numbers

P1-BC-070 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "3.75 per machine hour"
  Explanation: "This choice divides the cost change ($15,000) by 4,000 instead of the actual activity range of 3,000 hours (8,000 - 5,000). The denominator must be th..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (5.00) not distractor numbers

P1-BC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Capital budgeting, which evaluates long-term investments"
  Explanation: "Option A (Capital budgeting, which evaluates long-term investments) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "External financial reporting, which serves outside stakeholders"
  Explanation: "Option B (External financial reporting, which serves outside stakeholders) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Strategic planning, which sets long-term goals only"
  Explanation: "Option D (Strategic planning, which sets long-term goals only) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-072 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Capital budgeting, which evaluates long-term investments"
  Explanation: "Option A (Capital budgeting, which evaluates long-term investments) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-072 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "External financial reporting, which serves outside stakeholders"
  Explanation: "Option B (External financial reporting, which serves outside stakeholders) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-072 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Strategic planning, which sets long-term goals only"
  Explanation: "Option C (Strategic planning, which sets long-term goals only) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-074 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Strategic planning, which sets long-term goals only"
  Explanation: "Option A (Strategic planning, which sets long-term goals only) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-074 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Capital budgeting, which evaluates long-term investments"
  Explanation: "Option C (Capital budgeting, which evaluates long-term investments) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-074 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "External financial reporting, which serves outside stakeholders"
  Explanation: "Option D (External financial reporting, which serves outside stakeholders) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Strategic planning, which sets long-term goals only"
  Explanation: "Option A (Strategic planning, which sets long-term goals only) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Capital budgeting, which evaluates long-term investments"
  Explanation: "Option B (Capital budgeting, which evaluates long-term investments) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "External financial reporting, which serves outside stakeholders"
  Explanation: "Option D (External financial reporting, which serves outside stakeholders) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-076 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "External financial reporting, which serves outside stakeholders"
  Explanation: "Option A (External financial reporting, which serves outside stakeholders) represents a plausible misconception. Under Budgeting concepts and methodol..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-076 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Strategic planning, which sets long-term goals only"
  Explanation: "Option B (Strategic planning, which sets long-term goals only) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-076 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Capital budgeting, which evaluates long-term investments"
  Explanation: "Option C (Capital budgeting, which evaluates long-term investments) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using variance feedback to"

P1-BC-083 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It perfectly predicts seasonal spikes in demand"
  Explanation: "Option A (It perfectly predicts seasonal spikes in demand) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-083 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It requires no historical data to compute"
  Explanation: "Option B (It requires no historical data to compute) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-083 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for any judgment in forecasting"
  Explanation: "Option D (It eliminates the need for any judgment in forecasting) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-084 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It requires no historical data to compute"
  Explanation: "Option A (It requires no historical data to compute) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-084 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It perfectly predicts seasonal spikes in demand"
  Explanation: "Option B (It perfectly predicts seasonal spikes in demand) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-084 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any judgment in forecasting"
  Explanation: "Option C (It eliminates the need for any judgment in forecasting) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-086 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any judgment in forecasting"
  Explanation: "Option A (It eliminates the need for any judgment in forecasting) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-086 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It perfectly predicts seasonal spikes in demand"
  Explanation: "Option C (It perfectly predicts seasonal spikes in demand) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-086 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It requires no historical data to compute"
  Explanation: "Option D (It requires no historical data to compute) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-087 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any judgment in forecasting"
  Explanation: "Option A (It eliminates the need for any judgment in forecasting) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-087 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It perfectly predicts seasonal spikes in demand"
  Explanation: "Option B (It perfectly predicts seasonal spikes in demand) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-087 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It requires no historical data to compute"
  Explanation: "Option D (It requires no historical data to compute) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-088 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It requires no historical data to compute"
  Explanation: "Option A (It requires no historical data to compute) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-088 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It perfectly predicts seasonal spikes in demand"
  Explanation: "Option B (It perfectly predicts seasonal spikes in demand) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-088 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any judgment in forecasting"
  Explanation: "Option C (It eliminates the need for any judgment in forecasting) represents a plausible misconception. Under Forecasting techniques, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It reduces the effect"

P1-BC-090 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Responsibility accounting, which assigns costs to managers"
  Explanation: "Option A (Responsibility accounting, which assigns costs to managers) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-090 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Standard costing, which sets a single fixed benchmark"
  Explanation: "Option C (Standard costing, which sets a single fixed benchmark) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-090 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option D (Zero-based budgeting, which resets every account) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-091 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Responsibility accounting, which assigns costs to managers"
  Explanation: "Option A (Responsibility accounting, which assigns costs to managers) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-091 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing, which sets a single fixed benchmark"
  Explanation: "Option B (Standard costing, which sets a single fixed benchmark) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-091 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option D (Zero-based budgeting, which resets every account) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-092 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Standard costing, which sets a single fixed benchmark"
  Explanation: "Option A (Standard costing, which sets a single fixed benchmark) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-092 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Responsibility accounting, which assigns costs to managers"
  Explanation: "Option B (Responsibility accounting, which assigns costs to managers) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-092 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option C (Zero-based budgeting, which resets every account) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-094 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Standard costing, which sets a single fixed benchmark"
  Explanation: "Option A (Standard costing, which sets a single fixed benchmark) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-094 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option C (Zero-based budgeting, which resets every account) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-094 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Responsibility accounting, which assigns costs to managers"
  Explanation: "Option D (Responsibility accounting, which assigns costs to managers) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which shows how outcomes"

P1-BC-095 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Whether the company should receive a lower sales price"
  Explanation: "Option A (Whether the company should receive a lower sales price) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice D "Whether the company should"

P1-BC-095 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Whether external auditors approved the budget"
  Explanation: "Option B (Whether external auditors approved the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"

P1-BC-095 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Whether the company should discontinue budgeting entirely"
  Explanation: "Option D (Whether the company should discontinue budgeting entirely) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice A "Whether the company should"

P1-BC-096 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Whether the company should receive a lower sales price"
  Explanation: "Option A (Whether the company should receive a lower sales price) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice B "Whether the company should"

P1-BC-096 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Whether the company should discontinue budgeting entirely"
  Explanation: "Option B (Whether the company should discontinue budgeting entirely) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice A "Whether the company should"

P1-BC-096 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Whether external auditors approved the budget"
  Explanation: "Option C (Whether external auditors approved the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"

P1-BC-098 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Whether the company should receive a lower sales price"
  Explanation: "Option A (Whether the company should receive a lower sales price) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice C "Whether the company should"

P1-BC-098 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Whether the company should discontinue budgeting entirely"
  Explanation: "Option C (Whether the company should discontinue budgeting entirely) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice A "Whether the company should"

P1-BC-098 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Whether external auditors approved the budget"
  Explanation: "Option D (Whether external auditors approved the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"

P1-BC-099 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Whether external auditors approved the budget"
  Explanation: "Option A (Whether external auditors approved the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"

P1-BC-099 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Whether the company should receive a lower sales price"
  Explanation: "Option B (Whether the company should receive a lower sales price) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice D "Whether the company should"

P1-BC-099 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Whether the company should discontinue budgeting entirely"
  Explanation: "Option D (Whether the company should discontinue budgeting entirely) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice B "Whether the company should"

P1-BC-100 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Whether the company should discontinue budgeting entirely"
  Explanation: "Option A (Whether the company should discontinue budgeting entirely) represents a plausible misconception. Under Budgeting concepts and methodologies,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice B "Whether the company should"

P1-BC-100 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Whether the company should receive a lower sales price"
  Explanation: "Option B (Whether the company should receive a lower sales price) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"
    - VERBATIM_MATCH: explanation contains text from choice A "Whether the company should"

P1-BC-100 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Whether external auditors approved the budget"
  Explanation: "Option C (Whether external auditors approved the budget) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Whether the department has"

P1-CC-002 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A cash flow statement only"
  Explanation: "Option A (A cash flow statement only) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-002 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A single-metric ROI dashboard"
  Explanation: "Option C (A single-metric ROI dashboard) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-002 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A static budget variance report"
  Explanation: "Option D (A static budget variance report) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-003 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A cash flow statement only"
  Explanation: "Option A (A cash flow statement only) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-003 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A static budget variance report"
  Explanation: "Option B (A static budget variance report) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-003 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A single-metric ROI dashboard"
  Explanation: "Option D (A single-metric ROI dashboard) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-004 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A single-metric ROI dashboard"
  Explanation: "Option A (A single-metric ROI dashboard) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-004 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A static budget variance report"
  Explanation: "Option B (A static budget variance report) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-004 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A cash flow statement only"
  Explanation: "Option C (A cash flow statement only) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-006 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A static budget variance report"
  Explanation: "Option A (A static budget variance report) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-006 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A single-metric ROI dashboard"
  Explanation: "Option C (A single-metric ROI dashboard) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-006 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A cash flow statement only"
  Explanation: "Option D (A cash flow statement only) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-007 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A cash flow statement only"
  Explanation: "Option A (A cash flow statement only) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-007 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A static budget variance report"
  Explanation: "Option B (A static budget variance report) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-007 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A single-metric ROI dashboard"
  Explanation: "Option D (A single-metric ROI dashboard) represents a plausible misconception. Under Balanced Scorecard framework, the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and learning and growth"

P1-CC-008 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting"
  Explanation: "Option A (Zero-based budgeting) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-008 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Variance analysis"
  Explanation: "Option B (Variance analysis) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-008 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The high-low method"
  Explanation: "Option C (The high-low method) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The high-low method"
  Explanation: "Option A (The high-low method) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Variance analysis"
  Explanation: "Option D (Variance analysis) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-011 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The high-low method"
  Explanation: "Option A (The high-low method) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-011 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Variance analysis"
  Explanation: "Option B (Variance analysis) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-011 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting"
  Explanation: "Option D (Zero-based budgeting) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-012 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The high-low method"
  Explanation: "Option A (The high-low method) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-012 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Variance analysis"
  Explanation: "Option B (Variance analysis) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-012 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-014 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Variance analysis"
  Explanation: "Option A (Variance analysis) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-014 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The high-low method"
  Explanation: "Option C (The high-low method) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-014 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting"
  Explanation: "Option D (Zero-based budgeting) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to the conclusion that t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "decomposing ROI into margin"

P1-CC-016 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "135,000"
  Explanation: "This choice does not match the correct residual income calculation. Residual income = Operating income - (Required rate x Average operating assets) = ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1-CC-017 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "135,000"
  Explanation: "This choice does not match the correct residual income calculation. Residual income = Operating income - (Required rate x Average operating assets) = ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1-CC-018 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "135,000"
  Explanation: "This choice does not match the correct residual income calculation. Residual income = Operating income - (Required rate x Average operating assets) = ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1-CC-019 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "135,000"
  Explanation: "This choice does not match the correct residual income calculation. Residual income = Operating income - (Required rate x Average operating assets) = ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1-CC-020 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "135,000"
  Explanation: "This choice does not match the correct residual income calculation. Residual income = Operating income - (Required rate x Average operating assets) = ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (150000) not distractor numbers

P1-CC-022 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option A (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-022 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option C (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-022 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option D (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-023 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option A (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-023 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option B (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-023 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option D (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-024 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option A (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-024 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option B (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-024 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option C (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-026 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option A (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-026 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option C (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-026 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option D (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-027 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option A (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-027 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option B (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-027 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option D (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-028 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any market price data"
  Explanation: "Option A (It eliminates the need for any market price data) represents a plausible misconception. Under Transfer pricing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-028 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always maximizes overall company profit regardless of capacity"
  Explanation: "Option B (It always maximizes overall company profit regardless of capacity) represents a plausible misconception. Under Transfer pricing, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-028 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees goal congruence in all cases"
  Explanation: "Option C (It guarantees goal congruence in all cases) represents a plausible misconception. Under Transfer pricing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It preserves divisional autonomy"

P1-CC-035 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A revenue center, using only sales figures"
  Explanation: "Option A (A revenue center, using only sales figures) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-035 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A cost center, using only cost variances"
  Explanation: "Option B (A cost center, using only cost variances) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-035 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A discretionary expense center, using budget compliance only"
  Explanation: "Option D (A discretionary expense center, using budget compliance only) represents a plausible misconception. Under ASC 320 (Investments), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-036 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A revenue center, using only sales figures"
  Explanation: "Option A (A revenue center, using only sales figures) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-036 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A cost center, using only cost variances"
  Explanation: "Option B (A cost center, using only cost variances) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-036 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A discretionary expense center, using budget compliance only"
  Explanation: "Option C (A discretionary expense center, using budget compliance only) represents a plausible misconception. Under ASC 320 (Investments), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-038 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A revenue center, using only sales figures"
  Explanation: "Option A (A revenue center, using only sales figures) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-038 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A cost center, using only cost variances"
  Explanation: "Option C (A cost center, using only cost variances) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-038 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A discretionary expense center, using budget compliance only"
  Explanation: "Option D (A discretionary expense center, using budget compliance only) represents a plausible misconception. Under ASC 320 (Investments), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-039 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A discretionary expense center, using budget compliance only"
  Explanation: "Option A (A discretionary expense center, using budget compliance only) represents a plausible misconception. Under ASC 320 (Investments), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-039 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A cost center, using only cost variances"
  Explanation: "Option B (A cost center, using only cost variances) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-039 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A revenue center, using only sales figures"
  Explanation: "Option D (A revenue center, using only sales figures) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-040 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A discretionary expense center, using budget compliance only"
  Explanation: "Option A (A discretionary expense center, using budget compliance only) represents a plausible misconception. Under ASC 320 (Investments), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-040 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A revenue center, using only sales figures"
  Explanation: "Option B (A revenue center, using only sales figures) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-040 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A cost center, using only cost variances"
  Explanation: "Option C (A cost center, using only cost variances) represents a plausible misconception. Under ASC 320 (Investments), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using measures like ROI"

P1-CC-042 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The division has no fixed costs"
  Explanation: "Option A (The division has no fixed costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-042 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The division should be immediately divested"
  Explanation: "Option C (The division should be immediately divested) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-042 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The division's revenue exceeded its budget"
  Explanation: "Option D (The division's revenue exceeded its budget) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-043 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The division has no fixed costs"
  Explanation: "Option A (The division has no fixed costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-043 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The division's revenue exceeded its budget"
  Explanation: "Option B (The division's revenue exceeded its budget) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-043 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The division should be immediately divested"
  Explanation: "Option D (The division should be immediately divested) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-044 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The division's revenue exceeded its budget"
  Explanation: "Option A (The division's revenue exceeded its budget) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-044 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The division has no fixed costs"
  Explanation: "Option B (The division has no fixed costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-044 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The division should be immediately divested"
  Explanation: "Option C (The division should be immediately divested) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-046 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The division has no fixed costs"
  Explanation: "Option A (The division has no fixed costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-046 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The division's revenue exceeded its budget"
  Explanation: "Option C (The division's revenue exceeded its budget) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-046 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The division should be immediately divested"
  Explanation: "Option D (The division should be immediately divested) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The division generated returns"

P1-CC-053 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "$25,200 Favorable"
  Explanation: "The amount is correct, but the direction is wrong. Actual price was below budget, so the variance is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-CC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "$18,600 Unfavorable"
  Explanation: "The amount is correct, but selling above the budgeted price is favorable, not unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-CC-058 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "24,000 Favorable"
  Explanation: "The amount is correct, but the direction is wrong. Selling below the budgeted price is unfavorable."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-CC-063 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "$9,600 favorable"
  Explanation: "the dollar amount is correct but the sign is wrong. Because actual output (9,200 units) is below the denominator level (10,000 units), the variance is..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1-CC-066 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The going concern principle, which assumes continued operations"
  Explanation: "Option A (The going concern principle, which assumes continued operations) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-066 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The matching principle, which pairs revenue and expense in the same period"
  Explanation: "Option C (The matching principle, which pairs revenue and expense in the same period) represents a plausible misconception. Under CMA Part 1 accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-066 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The materiality principle, which governs disclosure thresholds"
  Explanation: "Option D (The materiality principle, which governs disclosure thresholds) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-067 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The going concern principle, which assumes continued operations"
  Explanation: "Option A (The going concern principle, which assumes continued operations) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-067 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The matching principle, which pairs revenue and expense in the same period"
  Explanation: "Option B (The matching principle, which pairs revenue and expense in the same period) represents a plausible misconception. Under CMA Part 1 accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-067 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The materiality principle, which governs disclosure thresholds"
  Explanation: "Option D (The materiality principle, which governs disclosure thresholds) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-068 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The matching principle, which pairs revenue and expense in the same period"
  Explanation: "Option A (The matching principle, which pairs revenue and expense in the same period) represents a plausible misconception. Under CMA Part 1 accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-068 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The going concern principle, which assumes continued operations"
  Explanation: "Option B (The going concern principle, which assumes continued operations) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-068 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The materiality principle, which governs disclosure thresholds"
  Explanation: "Option C (The materiality principle, which governs disclosure thresholds) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-070 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The going concern principle, which assumes continued operations"
  Explanation: "Option A (The going concern principle, which assumes continued operations) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-070 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The materiality principle, which governs disclosure thresholds"
  Explanation: "Option C (The materiality principle, which governs disclosure thresholds) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-070 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The matching principle, which pairs revenue and expense in the same period"
  Explanation: "Option D (The matching principle, which pairs revenue and expense in the same period) represents a plausible misconception. Under CMA Part 1 accountin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which holds managers accountable"

P1-CC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A single cash flow statement review"
  Explanation: "Option A (A single cash flow statement review) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A capital budgeting NPV analysis"
  Explanation: "Option B (A capital budgeting NPV analysis) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A break-even analysis in isolation"
  Explanation: "Option D (A break-even analysis in isolation) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-072 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A break-even analysis in isolation"
  Explanation: "Option A (A break-even analysis in isolation) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-072 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A capital budgeting NPV analysis"
  Explanation: "Option B (A capital budgeting NPV analysis) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-072 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A single cash flow statement review"
  Explanation: "Option C (A single cash flow statement review) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-074 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A single cash flow statement review"
  Explanation: "Option A (A single cash flow statement review) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-074 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A capital budgeting NPV analysis"
  Explanation: "Option C (A capital budgeting NPV analysis) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-074 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A break-even analysis in isolation"
  Explanation: "Option D (A break-even analysis in isolation) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A capital budgeting NPV analysis"
  Explanation: "Option A (A capital budgeting NPV analysis) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A break-even analysis in isolation"
  Explanation: "Option B (A break-even analysis in isolation) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A single cash flow statement review"
  Explanation: "Option D (A single cash flow statement review) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-076 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A single cash flow statement review"
  Explanation: "Option A (A single cash flow statement review) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-076 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A break-even analysis in isolation"
  Explanation: "Option B (A break-even analysis in isolation) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-076 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A capital budgeting NPV analysis"
  Explanation: "Option C (A capital budgeting NPV analysis) represents a plausible misconception. Under Variance analysis, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Gross margin (profit) variance"

P1-CC-078 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An appraisal cost, incurred to detect existing defects"
  Explanation: "Option A (An appraisal cost, incurred to detect existing defects) represents a plausible misconception. Under Quality management, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"

P1-CC-078 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An external failure cost, incurred for defects found by customers"
  Explanation: "Option C (An external failure cost, incurred for defects found by customers) represents a plausible misconception. Under Quality management, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice D "incurred for defects found"

P1-CC-078 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An internal failure cost, incurred for defects found before shipment"
  Explanation: "Option D (An internal failure cost, incurred for defects found before shipment) represents a plausible misconception. Under Quality management, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice C "incurred for defects found"

P1-CC-079 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An external failure cost, incurred for defects found by customers"
  Explanation: "Option A (An external failure cost, incurred for defects found by customers) represents a plausible misconception. Under Quality management, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice D "incurred for defects found"

P1-CC-079 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An appraisal cost, incurred to detect existing defects"
  Explanation: "Option B (An appraisal cost, incurred to detect existing defects) represents a plausible misconception. Under Quality management, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"

P1-CC-079 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An internal failure cost, incurred for defects found before shipment"
  Explanation: "Option D (An internal failure cost, incurred for defects found before shipment) represents a plausible misconception. Under Quality management, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice A "incurred for defects found"

P1-CC-080 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An external failure cost, incurred for defects found by customers"
  Explanation: "Option A (An external failure cost, incurred for defects found by customers) represents a plausible misconception. Under Quality management, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice B "incurred for defects found"

P1-CC-080 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An internal failure cost, incurred for defects found before shipment"
  Explanation: "Option B (An internal failure cost, incurred for defects found before shipment) represents a plausible misconception. Under Quality management, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice A "incurred for defects found"

P1-CC-080 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An appraisal cost, incurred to detect existing defects"
  Explanation: "Option C (An appraisal cost, incurred to detect existing defects) represents a plausible misconception. Under Quality management, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"

P1-CC-082 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An appraisal cost, incurred to detect existing defects"
  Explanation: "Option A (An appraisal cost, incurred to detect existing defects) represents a plausible misconception. Under Quality management, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"

P1-CC-082 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An internal failure cost, incurred for defects found before shipment"
  Explanation: "Option C (An internal failure cost, incurred for defects found before shipment) represents a plausible misconception. Under Quality management, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice D "incurred for defects found"

P1-CC-082 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An external failure cost, incurred for defects found by customers"
  Explanation: "Option D (An external failure cost, incurred for defects found by customers) represents a plausible misconception. Under Quality management, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "incurred to avoid defects"
    - VERBATIM_MATCH: explanation contains text from choice C "incurred for defects found"

P1-CC-083 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The controllability principle, which limits manager accountability"
  Explanation: "Option A (The controllability principle, which limits manager accountability) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-083 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option B (Zero-based budgeting, which resets every account) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-083 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Kaizen costing, which targets continuous cost reduction"
  Explanation: "Option D (Kaizen costing, which targets continuous cost reduction) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-084 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Kaizen costing, which targets continuous cost reduction"
  Explanation: "Option A (Kaizen costing, which targets continuous cost reduction) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-084 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option B (Zero-based budgeting, which resets every account) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-084 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The controllability principle, which limits manager accountability"
  Explanation: "Option C (The controllability principle, which limits manager accountability) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-086 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option A (Zero-based budgeting, which resets every account) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-086 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Kaizen costing, which targets continuous cost reduction"
  Explanation: "Option C (Kaizen costing, which targets continuous cost reduction) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-086 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The controllability principle, which limits manager accountability"
  Explanation: "Option D (The controllability principle, which limits manager accountability) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-087 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The controllability principle, which limits manager accountability"
  Explanation: "Option A (The controllability principle, which limits manager accountability) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-087 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Kaizen costing, which targets continuous cost reduction"
  Explanation: "Option B (Kaizen costing, which targets continuous cost reduction) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-087 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option D (Zero-based budgeting, which resets every account) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-088 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets every account"
  Explanation: "Option A (Zero-based budgeting, which resets every account) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-088 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The controllability principle, which limits manager accountability"
  Explanation: "Option B (The controllability principle, which limits manager accountability) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-088 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Kaizen costing, which targets continuous cost reduction"
  Explanation: "Option C (Kaizen costing, which targets continuous cost reduction) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "focusing attention on significant"

P1-CC-090 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They replace the need for any financial statements"
  Explanation: "Option A (They replace the need for any financial statements) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-090 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "They guarantee improved financial results automatically"
  Explanation: "Option C (They guarantee improved financial results automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-090 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They are required only for external regulatory reporting"
  Explanation: "Option D (They are required only for external regulatory reporting) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-091 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They replace the need for any financial statements"
  Explanation: "Option A (They replace the need for any financial statements) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-091 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "They guarantee improved financial results automatically"
  Explanation: "Option B (They guarantee improved financial results automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-091 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They are required only for external regulatory reporting"
  Explanation: "Option D (They are required only for external regulatory reporting) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-092 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They guarantee improved financial results automatically"
  Explanation: "Option A (They guarantee improved financial results automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-092 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "They replace the need for any financial statements"
  Explanation: "Option B (They replace the need for any financial statements) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-092 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "They are required only for external regulatory reporting"
  Explanation: "Option C (They are required only for external regulatory reporting) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-094 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They guarantee improved financial results automatically"
  Explanation: "Option A (They guarantee improved financial results automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-094 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "They are required only for external regulatory reporting"
  Explanation: "Option C (They are required only for external regulatory reporting) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-094 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They replace the need for any financial statements"
  Explanation: "Option D (They replace the need for any financial statements) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide leading indicators"

P1-CC-095 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any negotiation between divisions"
  Explanation: "Option A (It eliminates the need for any negotiation between divisions) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-095 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It guarantees the selling division earns no profit"
  Explanation: "Option B (It guarantees the selling division earns no profit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-095 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It always minimizes the buying division's reported costs"
  Explanation: "Option D (It always minimizes the buying division's reported costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-096 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the selling division earns no profit"
  Explanation: "Option A (It guarantees the selling division earns no profit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-096 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always minimizes the buying division's reported costs"
  Explanation: "Option B (It always minimizes the buying division's reported costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-096 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any negotiation between divisions"
  Explanation: "Option C (It eliminates the need for any negotiation between divisions) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-098 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It always minimizes the buying division's reported costs"
  Explanation: "Option A (It always minimizes the buying division's reported costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-098 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any negotiation between divisions"
  Explanation: "Option C (It eliminates the need for any negotiation between divisions) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-098 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees the selling division earns no profit"
  Explanation: "Option D (It guarantees the selling division earns no profit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-099 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the selling division earns no profit"
  Explanation: "Option A (It guarantees the selling division earns no profit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-099 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for any negotiation between divisions"
  Explanation: "Option B (It eliminates the need for any negotiation between divisions) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-099 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It always minimizes the buying division's reported costs"
  Explanation: "Option D (It always minimizes the buying division's reported costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-100 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the selling division earns no profit"
  Explanation: "Option A (It guarantees the selling division earns no profit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-100 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It always minimizes the buying division's reported costs"
  Explanation: "Option B (It always minimizes the buying division's reported costs) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-CC-100 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for any negotiation between divisions"
  Explanation: "Option C (It eliminates the need for any negotiation between divisions) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It approximates an arm's-length"

P1-DC-002 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for any overhead allocation"
  Explanation: "Option A (To eliminate the need for any overhead allocation) represents a plausible misconception. Under Overhead variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-002 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To guarantee zero over- or underapplied overhead"
  Explanation: "Option C (To guarantee zero over- or underapplied overhead) represents a plausible misconception. Under Overhead variance analysis, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-002 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To comply with a rule that actual costs can never be used"
  Explanation: "Option D (To comply with a rule that actual costs can never be used) represents a plausible misconception. Under Overhead variance analysis, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-003 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To guarantee zero over- or underapplied overhead"
  Explanation: "Option A (To guarantee zero over- or underapplied overhead) represents a plausible misconception. Under Overhead variance analysis, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-003 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate the need for any overhead allocation"
  Explanation: "Option B (To eliminate the need for any overhead allocation) represents a plausible misconception. Under Overhead variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-003 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To comply with a rule that actual costs can never be used"
  Explanation: "Option D (To comply with a rule that actual costs can never be used) represents a plausible misconception. Under Overhead variance analysis, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-004 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To comply with a rule that actual costs can never be used"
  Explanation: "Option A (To comply with a rule that actual costs can never be used) represents a plausible misconception. Under Overhead variance analysis, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-004 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To guarantee zero over- or underapplied overhead"
  Explanation: "Option B (To guarantee zero over- or underapplied overhead) represents a plausible misconception. Under Overhead variance analysis, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-004 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To eliminate the need for any overhead allocation"
  Explanation: "Option C (To eliminate the need for any overhead allocation) represents a plausible misconception. Under Overhead variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To allow timely product"

P1-DC-006 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It expenses beginning inventory costs immediately"
  Explanation: "Option A (It expenses beginning inventory costs immediately) represents a plausible misconception. Under Process costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-006 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It transfers beginning inventory costs directly to finished goods without recalculation"
  Explanation: "Option C (It transfers beginning inventory costs directly to finished goods without rec...) represents a plausible misconception. Under Process costin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-006 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It excludes beginning inventory costs entirely from the calculation"
  Explanation: "Option D (It excludes beginning inventory costs entirely from the calculation) represents a plausible misconception. Under Process costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-007 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It transfers beginning inventory costs directly to finished goods without recalculation"
  Explanation: "Option A (It transfers beginning inventory costs directly to finished goods without rec...) represents a plausible misconception. Under Process costin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-007 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It excludes beginning inventory costs entirely from the calculation"
  Explanation: "Option B (It excludes beginning inventory costs entirely from the calculation) represents a plausible misconception. Under Process costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-007 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It expenses beginning inventory costs immediately"
  Explanation: "Option D (It expenses beginning inventory costs immediately) represents a plausible misconception. Under Process costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-008 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It expenses beginning inventory costs immediately"
  Explanation: "Option A (It expenses beginning inventory costs immediately) represents a plausible misconception. Under Process costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-008 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It excludes beginning inventory costs entirely from the calculation"
  Explanation: "Option B (It excludes beginning inventory costs entirely from the calculation) represents a plausible misconception. Under Process costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-008 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It transfers beginning inventory costs directly to finished goods without recalculation"
  Explanation: "Option C (It transfers beginning inventory costs directly to finished goods without rec...) represents a plausible misconception. Under Process costin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It excludes beginning inventory costs entirely from the calculation"
  Explanation: "Option A (It excludes beginning inventory costs entirely from the calculation) represents a plausible misconception. Under Process costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It expenses beginning inventory costs immediately"
  Explanation: "Option C (It expenses beginning inventory costs immediately) represents a plausible misconception. Under Process costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It transfers beginning inventory costs directly to finished goods without recalculation"
  Explanation: "Option D (It transfers beginning inventory costs directly to finished goods without rec...) represents a plausible misconception. Under Process costin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It combines beginning work"

P1-DC-016 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The physical units method"
  Explanation: "Option A (The physical units method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-016 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The first-in first-out method"
  Explanation: "Option B (The first-in first-out method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-016 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The net realizable value method applied to further processing costs only"
  Explanation: "Option C (The net realizable value method applied to further processing costs only) represents a plausible misconception. Under Cost allocation method..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-018 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The physical units method"
  Explanation: "Option A (The physical units method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-018 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The first-in first-out method"
  Explanation: "Option C (The first-in first-out method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-018 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The net realizable value method applied to further processing costs only"
  Explanation: "Option D (The net realizable value method applied to further processing costs only) represents a plausible misconception. Under Cost allocation method..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-019 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The first-in first-out method"
  Explanation: "Option A (The first-in first-out method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-019 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The net realizable value method applied to further processing costs only"
  Explanation: "Option B (The net realizable value method applied to further processing costs only) represents a plausible misconception. Under Cost allocation method..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-019 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The physical units method"
  Explanation: "Option D (The physical units method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-020 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The first-in first-out method"
  Explanation: "Option A (The first-in first-out method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-020 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The net realizable value method applied to further processing costs only"
  Explanation: "Option B (The net realizable value method applied to further processing costs only) represents a plausible misconception. Under Cost allocation method..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-020 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The physical units method"
  Explanation: "Option C (The physical units method) represents a plausible misconception. Under Cost allocation methods, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The sales value at"

P1-DC-021 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As a cost eliminated from the internal income statement"
  Explanation: "The cost is not eliminated. It is reported as a fixed period cost on the internal income statement."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a fixed period"

P1-DC-023 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Fixed manufacturing overhead is attached to ending inventory based on units produced"
  Explanation: "This describes absorption costing, where fixed manufacturing overhead is assigned to units produced and can be deferred in inventory."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Fixed manufacturing overhead is"
    - VERBATIM_MATCH: explanation contains text from choice B "Fixed manufacturing overhead is"
    - VERBATIM_MATCH: explanation contains text from choice D "Fixed manufacturing overhead is"

P1-DC-023 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Fixed manufacturing overhead is expensed in the period incurred instead of being inventoried as product cost"
  Explanation: "Under variable costing, fixed manufacturing overhead is treated as a period cost. It is expensed in the period incurred rather than attached to units ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "Fixed manufacturing overhead is"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "Fixed manufacturing overhead is"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "Fixed manufacturing overhead is"

P1-DC-036 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Absorption costing, which allocates all fixed overhead to products"
  Explanation: "Option A (Absorption costing, which allocates all fixed overhead to products) represents a plausible misconception. Under Theory of Constraints, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-036 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing, which sets a single predetermined cost per unit"
  Explanation: "Option B (Standard costing, which sets a single predetermined cost per unit) represents a plausible misconception. Under Theory of Constraints, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-036 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting, which resets every account to zero"
  Explanation: "Option C (Zero-based budgeting, which resets every account to zero) represents a plausible misconception. Under Theory of Constraints, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-038 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Absorption costing, which allocates all fixed overhead to products"
  Explanation: "Option A (Absorption costing, which allocates all fixed overhead to products) represents a plausible misconception. Under Theory of Constraints, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-038 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Standard costing, which sets a single predetermined cost per unit"
  Explanation: "Option C (Standard costing, which sets a single predetermined cost per unit) represents a plausible misconception. Under Theory of Constraints, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-038 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting, which resets every account to zero"
  Explanation: "Option D (Zero-based budgeting, which resets every account to zero) represents a plausible misconception. Under Theory of Constraints, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-039 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which resets every account to zero"
  Explanation: "Option A (Zero-based budgeting, which resets every account to zero) represents a plausible misconception. Under Theory of Constraints, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-039 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing, which sets a single predetermined cost per unit"
  Explanation: "Option B (Standard costing, which sets a single predetermined cost per unit) represents a plausible misconception. Under Theory of Constraints, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-039 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Absorption costing, which allocates all fixed overhead to products"
  Explanation: "Option D (Absorption costing, which allocates all fixed overhead to products) represents a plausible misconception. Under Theory of Constraints, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-040 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Absorption costing, which allocates all fixed overhead to products"
  Explanation: "Option A (Absorption costing, which allocates all fixed overhead to products) represents a plausible misconception. Under Theory of Constraints, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-040 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing, which sets a single predetermined cost per unit"
  Explanation: "Option B (Standard costing, which sets a single predetermined cost per unit) represents a plausible misconception. Under Theory of Constraints, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-040 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting, which resets every account to zero"
  Explanation: "Option C (Zero-based budgeting, which resets every account to zero) represents a plausible misconception. Under Theory of Constraints, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The theory of constraints"

P1-DC-046 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As a separate line item on the income statement equal to its full sales value"
  Explanation: "Option A (As a separate line item on the income statement equal to its full sales value) represents a plausible misconception. Under Byproduct costing..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-046 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "As a deferred asset with no income statement impact"
  Explanation: "Option C (As a deferred asset with no income statement impact) represents a plausible misconception. Under Byproduct costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-046 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As an increase to the cost of the main products"
  Explanation: "Option D (As an increase to the cost of the main products) represents a plausible misconception. Under Byproduct costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-047 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As a separate line item on the income statement equal to its full sales value"
  Explanation: "Option A (As a separate line item on the income statement equal to its full sales value) represents a plausible misconception. Under Byproduct costing..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-047 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "As an increase to the cost of the main products"
  Explanation: "Option B (As an increase to the cost of the main products) represents a plausible misconception. Under Byproduct costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-047 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As a deferred asset with no income statement impact"
  Explanation: "Option D (As a deferred asset with no income statement impact) represents a plausible misconception. Under Byproduct costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-048 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As a deferred asset with no income statement impact"
  Explanation: "Option A (As a deferred asset with no income statement impact) represents a plausible misconception. Under Byproduct costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-048 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "As an increase to the cost of the main products"
  Explanation: "Option B (As an increase to the cost of the main products) represents a plausible misconception. Under Byproduct costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-048 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "As a separate line item on the income statement equal to its full sales value"
  Explanation: "Option C (As a separate line item on the income statement equal to its full sales value) represents a plausible misconception. Under Byproduct costing..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-050 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As a deferred asset with no income statement impact"
  Explanation: "Option A (As a deferred asset with no income statement impact) represents a plausible misconception. Under Byproduct costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-050 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "As a separate line item on the income statement equal to its full sales value"
  Explanation: "Option C (As a separate line item on the income statement equal to its full sales value) represents a plausible misconception. Under Byproduct costing..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-050 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As an increase to the cost of the main products"
  Explanation: "Option D (As an increase to the cost of the main products) represents a plausible misconception. Under Byproduct costing, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a reduction of"

P1-DC-051 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They guarantee actual costs will always equal the standard"
  Explanation: "Option A (They guarantee actual costs will always equal the standard) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-051 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "They eliminate the need to ever review actual costs"
  Explanation: "Option B (They eliminate the need to ever review actual costs) represents a plausible misconception. Under Variance analysis, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-051 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They remove the need for any budgeting process"
  Explanation: "Option D (They remove the need for any budgeting process) represents a plausible misconception. Under Variance analysis, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-052 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They eliminate the need to ever review actual costs"
  Explanation: "Option A (They eliminate the need to ever review actual costs) represents a plausible misconception. Under Variance analysis, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-052 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "They remove the need for any budgeting process"
  Explanation: "Option B (They remove the need for any budgeting process) represents a plausible misconception. Under Variance analysis, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-052 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "They guarantee actual costs will always equal the standard"
  Explanation: "Option C (They guarantee actual costs will always equal the standard) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-054 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They remove the need for any budgeting process"
  Explanation: "Option A (They remove the need for any budgeting process) represents a plausible misconception. Under Variance analysis, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "They guarantee actual costs will always equal the standard"
  Explanation: "Option C (They guarantee actual costs will always equal the standard) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-054 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They eliminate the need to ever review actual costs"
  Explanation: "Option D (They eliminate the need to ever review actual costs) represents a plausible misconception. Under Variance analysis, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-055 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "They guarantee actual costs will always equal the standard"
  Explanation: "Option A (They guarantee actual costs will always equal the standard) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-055 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "They remove the need for any budgeting process"
  Explanation: "Option B (They remove the need for any budgeting process) represents a plausible misconception. Under Variance analysis, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-055 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "They eliminate the need to ever review actual costs"
  Explanation: "Option D (They eliminate the need to ever review actual costs) represents a plausible misconception. Under Variance analysis, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "They provide a benchmark"

P1-DC-062 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating all quality control inspections"
  Explanation: "Option A (Eliminating all quality control inspections) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-062 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Increasing batch sizes to reduce the number of setups"
  Explanation: "Option C (Increasing batch sizes to reduce the number of setups) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-062 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Maximizing inventory levels to avoid stockouts"
  Explanation: "Option D (Maximizing inventory levels to avoid stockouts) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-063 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating all quality control inspections"
  Explanation: "Option A (Eliminating all quality control inspections) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-063 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Increasing batch sizes to reduce the number of setups"
  Explanation: "Option B (Increasing batch sizes to reduce the number of setups) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-063 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Maximizing inventory levels to avoid stockouts"
  Explanation: "Option D (Maximizing inventory levels to avoid stockouts) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-064 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating all quality control inspections"
  Explanation: "Option A (Eliminating all quality control inspections) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-064 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Maximizing inventory levels to avoid stockouts"
  Explanation: "Option B (Maximizing inventory levels to avoid stockouts) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-064 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Increasing batch sizes to reduce the number of setups"
  Explanation: "Option C (Increasing batch sizes to reduce the number of setups) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Eliminating waste and non-value-added"

P1-DC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As normal spoilage, added to the cost of good units produced"
  Explanation: "Option A (As normal spoilage, added to the cost of good units produced) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "As a deferred asset to be expensed in a future period"
  Explanation: "Option B (As a deferred asset to be expensed in a future period) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As a reduction of sales revenue"
  Explanation: "Option D (As a reduction of sales revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-072 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As normal spoilage, added to the cost of good units produced"
  Explanation: "Option A (As normal spoilage, added to the cost of good units produced) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-072 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "As a reduction of sales revenue"
  Explanation: "Option B (As a reduction of sales revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-072 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "As a deferred asset to be expensed in a future period"
  Explanation: "Option C (As a deferred asset to be expensed in a future period) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-074 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As normal spoilage, added to the cost of good units produced"
  Explanation: "Option A (As normal spoilage, added to the cost of good units produced) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-074 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "As a reduction of sales revenue"
  Explanation: "Option C (As a reduction of sales revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-074 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As a deferred asset to be expensed in a future period"
  Explanation: "Option D (As a deferred asset to be expensed in a future period) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "As a deferred asset to be expensed in a future period"
  Explanation: "Option A (As a deferred asset to be expensed in a future period) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "As a reduction of sales revenue"
  Explanation: "Option B (As a reduction of sales revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-DC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "As normal spoilage, added to the cost of good units produced"
  Explanation: "Option D (As normal spoilage, added to the cost of good units produced) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "expensed in the period"

P1-EC-002 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Management override, which bypasses controls"
  Explanation: "Option A (Management override, which bypasses controls) represents a plausible misconception. Under Segregation of duties, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-002 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Cost-benefit analysis, which weighs control costs against benefits"
  Explanation: "Option C (Cost-benefit analysis, which weighs control costs against benefits) represents a plausible misconception. Under Segregation of duties, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-002 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Risk acceptance, which tolerates a known exposure"
  Explanation: "Option D (Risk acceptance, which tolerates a known exposure) represents a plausible misconception. Under Segregation of duties, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-003 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Cost-benefit analysis, which weighs control costs against benefits"
  Explanation: "Option A (Cost-benefit analysis, which weighs control costs against benefits) represents a plausible misconception. Under Segregation of duties, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-003 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Management override, which bypasses controls"
  Explanation: "Option B (Management override, which bypasses controls) represents a plausible misconception. Under Segregation of duties, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-003 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Risk acceptance, which tolerates a known exposure"
  Explanation: "Option D (Risk acceptance, which tolerates a known exposure) represents a plausible misconception. Under Segregation of duties, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "reducing the risk of"

P1-EC-006 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The Six Sigma DMAIC framework"
  Explanation: "Option A (The Six Sigma DMAIC framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-006 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The Theory of Constraints framework"
  Explanation: "Option C (The Theory of Constraints framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-006 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The Balanced Scorecard framework"
  Explanation: "Option D (The Balanced Scorecard framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-007 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The Six Sigma DMAIC framework"
  Explanation: "Option A (The Six Sigma DMAIC framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-007 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "The Theory of Constraints framework"
  Explanation: "Option B (The Theory of Constraints framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-007 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The Balanced Scorecard framework"
  Explanation: "Option D (The Balanced Scorecard framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The Theory of Constraints framework"
  Explanation: "Option A (The Theory of Constraints framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The Balanced Scorecard framework"
  Explanation: "Option C (The Balanced Scorecard framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The Six Sigma DMAIC framework"
  Explanation: "Option D (The Six Sigma DMAIC framework) represents a plausible misconception. Under COSO Internal Control Framework, the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The COSO Internal Control"

P1-EC-016 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A detective control performed after the fact only"
  Explanation: "Option A (A detective control performed after the fact only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-016 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An entity-level control unrelated to specific assets"
  Explanation: "Option B (An entity-level control unrelated to specific assets) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-016 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A compensating control for a segregation of duties gap"
  Explanation: "Option C (A compensating control for a segregation of duties gap) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-018 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A detective control performed after the fact only"
  Explanation: "Option A (A detective control performed after the fact only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-018 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An entity-level control unrelated to specific assets"
  Explanation: "Option C (An entity-level control unrelated to specific assets) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-018 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A compensating control for a segregation of duties gap"
  Explanation: "Option D (A compensating control for a segregation of duties gap) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-019 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A detective control performed after the fact only"
  Explanation: "Option A (A detective control performed after the fact only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-019 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An entity-level control unrelated to specific assets"
  Explanation: "Option B (An entity-level control unrelated to specific assets) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-019 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A compensating control for a segregation of duties gap"
  Explanation: "Option D (A compensating control for a segregation of duties gap) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A physical control that"

P1-EC-026 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees no bank fees will ever be charged"
  Explanation: "Option A (It guarantees no bank fees will ever be charged) represents a plausible misconception. Under Reconciliation controls, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-026 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need to compare the bank statement to the general ledger"
  Explanation: "Option C (It eliminates the need to compare the bank statement to the general ledger) represents a plausible misconception. Under Reconciliation contr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-026 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It removes the need for management review of cash balances"
  Explanation: "Option D (It removes the need for management review of cash balances) represents a plausible misconception. Under Reconciliation controls, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-027 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need to compare the bank statement to the general ledger"
  Explanation: "Option A (It eliminates the need to compare the bank statement to the general ledger) represents a plausible misconception. Under Reconciliation contr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-027 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "It removes the need for management review of cash balances"
  Explanation: "Option B (It removes the need for management review of cash balances) represents a plausible misconception. Under Reconciliation controls, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-027 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees no bank fees will ever be charged"
  Explanation: "Option D (It guarantees no bank fees will ever be charged) represents a plausible misconception. Under Reconciliation controls, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-028 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It ensures the reconciliation can objectively detect errors or irregularities without being influenced by the preparer's own transactions"
  Explanation: "An independent bank reconciliation is a detective cash control. Independence matters because someone outside cash handling and recording can objective..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "to the general ledger"

P1-EC-030 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees no bank fees will ever be charged"
  Explanation: "Option A (It guarantees no bank fees will ever be charged) represents a plausible misconception. Under Reconciliation controls, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-030 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need to compare the bank statement to the general ledger"
  Explanation: "Option C (It eliminates the need to compare the bank statement to the general ledger) represents a plausible misconception. Under Reconciliation contr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-030 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "It removes the need for management review of cash balances"
  Explanation: "Option D (It removes the need for management review of cash balances) represents a plausible misconception. Under Reconciliation controls, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It ensures the reconciliation"

P1-EC-036 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A physical control over the data center only"
  Explanation: "Option A (A physical control over the data center only) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-036 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An application control embedded in transaction processing only"
  Explanation: "Option B (An application control embedded in transaction processing only) represents a plausible misconception. Under IT general controls (ITGC), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-036 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A budgetary control over IT spending"
  Explanation: "Option C (A budgetary control over IT spending) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-038 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A physical control over the data center only"
  Explanation: "Option A (A physical control over the data center only) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-038 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A budgetary control over IT spending"
  Explanation: "Option C (A budgetary control over IT spending) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-038 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An application control embedded in transaction processing only"
  Explanation: "Option D (An application control embedded in transaction processing only) represents a plausible misconception. Under IT general controls (ITGC), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-039 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An application control embedded in transaction processing only"
  Explanation: "Option A (An application control embedded in transaction processing only) represents a plausible misconception. Under IT general controls (ITGC), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-039 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A budgetary control over IT spending"
  Explanation: "Option B (A budgetary control over IT spending) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-039 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A physical control over the data center only"
  Explanation: "Option D (A physical control over the data center only) represents a plausible misconception. Under IT general controls (ITGC), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-EC-042 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A cost-benefit limitation of control design"
  Explanation: "Option A (A cost-benefit limitation of control design) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-042 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An IT general control weakness"
  Explanation: "Option C (An IT general control weakness) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-042 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Segregation of duties working exactly as designed"
  Explanation: "Option D (Segregation of duties working exactly as designed) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-043 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Segregation of duties working exactly as designed"
  Explanation: "Option A (Segregation of duties working exactly as designed) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-043 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An IT general control weakness"
  Explanation: "Option B (An IT general control weakness) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-043 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A cost-benefit limitation of control design"
  Explanation: "Option D (A cost-benefit limitation of control design) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-044 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An IT general control weakness"
  Explanation: "Option A (An IT general control weakness) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-044 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A cost-benefit limitation of control design"
  Explanation: "Option B (A cost-benefit limitation of control design) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-044 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Segregation of duties working exactly as designed"
  Explanation: "Option C (Segregation of duties working exactly as designed) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Management override of controls"

P1-EC-046 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating the need for an external audit"
  Explanation: "Option A (Eliminating the need for an external audit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-046 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Replacing the need for a code of conduct"
  Explanation: "Option C (Replacing the need for a code of conduct) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-046 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Guaranteeing that no fraud will ever occur"
  Explanation: "Option D (Guaranteeing that no fraud will ever occur) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-047 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating the need for an external audit"
  Explanation: "Option A (Eliminating the need for an external audit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-047 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Replacing the need for a code of conduct"
  Explanation: "Option B (Replacing the need for a code of conduct) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-047 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Guaranteeing that no fraud will ever occur"
  Explanation: "Option D (Guaranteeing that no fraud will ever occur) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-048 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Guaranteeing that no fraud will ever occur"
  Explanation: "Option A (Guaranteeing that no fraud will ever occur) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-048 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Replacing the need for a code of conduct"
  Explanation: "Option B (Replacing the need for a code of conduct) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-048 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Eliminating the need for an external audit"
  Explanation: "Option C (Eliminating the need for an external audit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-050 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating the need for an external audit"
  Explanation: "Option A (Eliminating the need for an external audit) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-050 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Guaranteeing that no fraud will ever occur"
  Explanation: "Option C (Guaranteeing that no fraud will ever occur) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-050 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Replacing the need for a code of conduct"
  Explanation: "Option D (Replacing the need for a code of conduct) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Encouraging detection and reporting"

P1-EC-051 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Outsourcing all accounting with no oversight"
  Explanation: "Option A (Outsourcing all accounting with no oversight) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-051 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Eliminating internal controls entirely since the company is small"
  Explanation: "Option B (Eliminating internal controls entirely since the company is small) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-051 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Ignoring the risk since fraud is unlikely in small companies"
  Explanation: "Option D (Ignoring the risk since fraud is unlikely in small companies) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-054 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Eliminating internal controls entirely since the company is small"
  Explanation: "Option A (Eliminating internal controls entirely since the company is small) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Outsourcing all accounting with no oversight"
  Explanation: "Option C (Outsourcing all accounting with no oversight) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-054 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Ignoring the risk since fraud is unlikely in small companies"
  Explanation: "Option D (Ignoring the risk since fraud is unlikely in small companies) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-055 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Ignoring the risk since fraud is unlikely in small companies"
  Explanation: "Option A (Ignoring the risk since fraud is unlikely in small companies) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-055 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Outsourcing all accounting with no oversight"
  Explanation: "Option B (Outsourcing all accounting with no oversight) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-055 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Eliminating internal controls entirely since the company is small"
  Explanation: "Option D (Eliminating internal controls entirely since the company is small) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Increased owner or management"

P1-EC-056 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Information and communication, which relays data throughout the entity"
  Explanation: "Option A (Information and communication, which relays data throughout the entity) represents a plausible misconception. Under COSO control environment..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-056 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Monitoring activities, which evaluate control effectiveness over time"
  Explanation: "Option B (Monitoring activities, which evaluate control effectiveness over time) represents a plausible misconception. Under COSO control environment ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-056 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Risk assessment, which identifies specific threats"
  Explanation: "Option C (Risk assessment, which identifies specific threats) represents a plausible misconception. Under COSO control environment component, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-058 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Monitoring activities, which evaluate control effectiveness over time"
  Explanation: "Option A (Monitoring activities, which evaluate control effectiveness over time) represents a plausible misconception. Under COSO control environment ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-058 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Risk assessment, which identifies specific threats"
  Explanation: "Option C (Risk assessment, which identifies specific threats) represents a plausible misconception. Under COSO control environment component, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-058 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Information and communication, which relays data throughout the entity"
  Explanation: "Option D (Information and communication, which relays data throughout the entity) represents a plausible misconception. Under COSO control environment..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-059 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Risk assessment, which identifies specific threats"
  Explanation: "Option A (Risk assessment, which identifies specific threats) represents a plausible misconception. Under COSO control environment component, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-059 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Information and communication, which relays data throughout the entity"
  Explanation: "Option B (Information and communication, which relays data throughout the entity) represents a plausible misconception. Under COSO control environment..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-059 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Monitoring activities, which evaluate control effectiveness over time"
  Explanation: "Option D (Monitoring activities, which evaluate control effectiveness over time) represents a plausible misconception. Under COSO control environment ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "often summarized as tone"

P1-EC-067 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "An overly strong control environment with too many checks"
  Explanation: "Option A (An overly strong control environment with too many checks) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-067 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A physical access control weakness only"
  Explanation: "Option B (A physical access control weakness only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-067 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An IT general control deficiency only"
  Explanation: "Option D (An IT general control deficiency only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-068 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A physical access control weakness only"
  Explanation: "Option A (A physical access control weakness only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-068 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "An IT general control deficiency only"
  Explanation: "Option B (An IT general control deficiency only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-068 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An overly strong control environment with too many checks"
  Explanation: "Option C (An overly strong control environment with too many checks) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-070 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A physical access control weakness only"
  Explanation: "Option A (A physical access control weakness only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-070 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "An overly strong control environment with too many checks"
  Explanation: "Option C (An overly strong control environment with too many checks) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-070 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "An IT general control deficiency only"
  Explanation: "Option D (An IT general control deficiency only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A lack of segregation"

P1-EC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Control environment assessment, which is unrelated to specific deficiencies"
  Explanation: "Option A (Control environment assessment, which is unrelated to specific deficiencies) represents a plausible misconception. Under Electronic data int..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "External audit sign-off, which requires no internal follow-up"
  Explanation: "Option B (External audit sign-off, which requires no internal follow-up) represents a plausible misconception. Under Electronic data interchange (EDI)..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Risk acceptance, which tolerates the deficiency permanently"
  Explanation: "Option D (Risk acceptance, which tolerates the deficiency permanently) represents a plausible misconception. Under Electronic data interchange (EDI), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-074 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Control environment assessment, which is unrelated to specific deficiencies"
  Explanation: "Option A (Control environment assessment, which is unrelated to specific deficiencies) represents a plausible misconception. Under Electronic data int..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-074 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "External audit sign-off, which requires no internal follow-up"
  Explanation: "Option C (External audit sign-off, which requires no internal follow-up) represents a plausible misconception. Under Electronic data interchange (EDI)..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-074 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Risk acceptance, which tolerates the deficiency permanently"
  Explanation: "Option D (Risk acceptance, which tolerates the deficiency permanently) represents a plausible misconception. Under Electronic data interchange (EDI), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Risk acceptance, which tolerates the deficiency permanently"
  Explanation: "Option A (Risk acceptance, which tolerates the deficiency permanently) represents a plausible misconception. Under Electronic data interchange (EDI), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "External audit sign-off, which requires no internal follow-up"
  Explanation: "Option B (External audit sign-off, which requires no internal follow-up) represents a plausible misconception. Under Electronic data interchange (EDI)..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-EC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Control environment assessment, which is unrelated to specific deficiencies"
  Explanation: "Option D (Control environment assessment, which is unrelated to specific deficiencies) represents a plausible misconception. Under Electronic data int..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "ensuring identified deficiencies are"

P1-FC-010 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Descriptive analytics, which summarizes what already happened"
  Explanation: "Option A (Descriptive analytics, which summarizes what already happened) represents a plausible misconception. Under Electronic data interchange (EDI)..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using historical data to"

P1-FC-010 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Diagnostic analytics, which explains why something happened"
  Explanation: "Option C (Diagnostic analytics, which explains why something happened) represents a plausible misconception. Under Electronic data interchange (EDI), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using historical data to"

P1-FC-010 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Prescriptive analytics, which recommends a specific action only"
  Explanation: "Option D (Prescriptive analytics, which recommends a specific action only) represents a plausible misconception. Under Electronic data interchange (ED..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using historical data to"

P1-FC-015 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Data visualization, used for dashboard design"
  Explanation: "Option A (Data visualization, used for dashboard design) represents a plausible misconception. Under Accounting automation, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Robotic process automation (RPA)"

P1-FC-015 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Predictive analytics, used for forecasting outcomes"
  Explanation: "Option B (Predictive analytics, used for forecasting outcomes) represents a plausible misconception. Under Accounting automation, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Robotic process automation (RPA)"

P1-FC-015 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Blockchain, used for distributed ledger validation"
  Explanation: "Option D (Blockchain, used for distributed ledger validation) represents a plausible misconception. Under Accounting automation, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Robotic process automation (RPA)"

P1-FC-016 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Data as a Service (DaaS)"
  Explanation: "Option A (Data as a Service (DaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that inf..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Infrastructure as a Service"

P1-FC-016 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Platform as a Service (PaaS)"
  Explanation: "Option B (Platform as a Service (PaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Infrastructure as a Service"

P1-FC-016 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Software as a Service (SaaS)"
  Explanation: "Option C (Software as a Service (SaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Infrastructure as a Service"

P1-FC-022 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To include as many charts and metrics as technically possible"
  Explanation: "Option A (To include as many charts and metrics as technically possible) represents a plausible misconception. Under Data visualization, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-022 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To eliminate the need for any underlying data governance"
  Explanation: "Option C (To eliminate the need for any underlying data governance) represents a plausible misconception. Under Data visualization, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-022 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To replace all narrative reporting entirely"
  Explanation: "Option D (To replace all narrative reporting entirely) represents a plausible misconception. Under Data visualization, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-023 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for any underlying data governance"
  Explanation: "Option A (To eliminate the need for any underlying data governance) represents a plausible misconception. Under Data visualization, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-023 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To include as many charts and metrics as technically possible"
  Explanation: "Option B (To include as many charts and metrics as technically possible) represents a plausible misconception. Under Data visualization, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-023 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "To replace all narrative reporting entirely"
  Explanation: "Option D (To replace all narrative reporting entirely) represents a plausible misconception. Under Data visualization, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-024 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for any underlying data governance"
  Explanation: "Option A (To eliminate the need for any underlying data governance) represents a plausible misconception. Under Data visualization, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-024 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "To include as many charts and metrics as technically possible"
  Explanation: "Option B (To include as many charts and metrics as technically possible) represents a plausible misconception. Under Data visualization, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-024 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "To replace all narrative reporting entirely"
  Explanation: "Option C (To replace all narrative reporting entirely) represents a plausible misconception. Under Data visualization, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To communicate relevant information"

P1-FC-030 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "The fraud triangle"
  Explanation: "Option A (The fraud triangle) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion that the confide..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and availability (CIA) triad"

P1-FC-030 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "The balanced scorecard"
  Explanation: "Option C (The balanced scorecard) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion that the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and availability (CIA) triad"

P1-FC-030 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "The COSO Internal Control Framework"
  Explanation: "Option D (The COSO Internal Control Framework) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "and availability (CIA) triad"

P1-FC-042 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A single centralized database controlled by one party"
  Explanation: "Option A (A single centralized database controlled by one party) represents a plausible misconception. Under Blockchain technology, the correct analys..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "distributed ledger that is"

P1-FC-042 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A tool used exclusively for data visualization"
  Explanation: "Option C (A tool used exclusively for data visualization) represents a plausible misconception. Under Blockchain technology, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "distributed ledger that is"

P1-FC-042 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A method for automating repetitive manual keystrokes only"
  Explanation: "Option D (A method for automating repetitive manual keystrokes only) represents a plausible misconception. Under Blockchain technology, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "distributed ledger that is"

P1-FC-052 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Data visualization, which displays existing results"
  Explanation: "Option A (Data visualization, which displays existing results) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-052 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Blockchain, which maintains a distributed ledger"
  Explanation: "Option B (Blockchain, which maintains a distributed ledger) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-052 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Robotic process automation, which follows fixed rules"
  Explanation: "Option C (Robotic process automation, which follows fixed rules) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-054 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Blockchain, which maintains a distributed ledger"
  Explanation: "Option A (Blockchain, which maintains a distributed ledger) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-054 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Data visualization, which displays existing results"
  Explanation: "Option C (Data visualization, which displays existing results) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-054 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Robotic process automation, which follows fixed rules"
  Explanation: "Option D (Robotic process automation, which follows fixed rules) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-055 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Blockchain, which maintains a distributed ledger"
  Explanation: "Option A (Blockchain, which maintains a distributed ledger) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-055 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Robotic process automation, which follows fixed rules"
  Explanation: "Option B (Robotic process automation, which follows fixed rules) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-055 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Data visualization, which displays existing results"
  Explanation: "Option D (Data visualization, which displays existing results) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a subset of artificial"

P1-FC-058 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A data governance policy gap"
  Explanation: "Option A (A data governance policy gap) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion that p..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-058 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A distributed denial-of-service attack"
  Explanation: "Option C (A distributed denial-of-service attack) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-058 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A physical access control failure"
  Explanation: "Option D (A physical access control failure) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-060 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "A physical access control failure"
  Explanation: "Option A (A physical access control failure) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-060 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A distributed denial-of-service attack"
  Explanation: "Option B (A distributed denial-of-service attack) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclus..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-060 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A data governance policy gap"
  Explanation: "Option C (A data governance policy gap) represents a plausible misconception. Under Cybersecurity, the correct analysis leads to the conclusion that p..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a form of social"

P1-FC-062 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Guaranteed reduction in all operating costs"
  Explanation: "Option A (Guaranteed reduction in all operating costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-062 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Automatic compliance with all external regulations"
  Explanation: "Option C (Automatic compliance with all external regulations) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-062 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Elimination of the need for any internal controls"
  Explanation: "Option D (Elimination of the need for any internal controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-063 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Automatic compliance with all external regulations"
  Explanation: "Option A (Automatic compliance with all external regulations) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-063 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Guaranteed reduction in all operating costs"
  Explanation: "Option B (Guaranteed reduction in all operating costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-063 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Elimination of the need for any internal controls"
  Explanation: "Option D (Elimination of the need for any internal controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-064 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Guaranteed reduction in all operating costs"
  Explanation: "Option A (Guaranteed reduction in all operating costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-064 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Automatic compliance with all external regulations"
  Explanation: "Option B (Automatic compliance with all external regulations) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-064 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Elimination of the need for any internal controls"
  Explanation: "Option C (Elimination of the need for any internal controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Improved data consistency and"

P1-FC-066 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A data lake"
  Explanation: "A data lake stores raw structured and unstructured data in native format for later analysis. This contrasts with a data warehouse, which generally org..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "a predefined schema before"

P1-FC-067 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "A data lake"
  Explanation: "A data lake stores raw data in its native format from a variety of sources, in contrast to a data warehouse, which requires data to be structured into..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "a predefined schema before"

P1-FC-068 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "A data lake"
  Explanation: "A data lake stores raw data in its native format from a variety of sources, in contrast to a data warehouse, which requires data to be structured into..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "a predefined schema before"

P1-FC-070 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "A data lake"
  Explanation: "A data lake stores raw data in its native format from a variety of sources, in contrast to a data warehouse, which requires data to be structured into..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "a predefined schema before"

P1-FC-071 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting, which is unrelated to auditing"
  Explanation: "Option A (Zero-based budgeting, which is unrelated to auditing) represents a plausible misconception. Under Continuous budgeting, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-071 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Sales forecasting, which projects future revenue"
  Explanation: "Option B (Sales forecasting, which projects future revenue) represents a plausible misconception. Under Continuous budgeting, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-071 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Standard costing, which sets predetermined cost benchmarks"
  Explanation: "Option D (Standard costing, which sets predetermined cost benchmarks) represents a plausible misconception. Under Continuous budgeting, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-072 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Sales forecasting, which projects future revenue"
  Explanation: "Option A (Sales forecasting, which projects future revenue) represents a plausible misconception. Under Continuous budgeting, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-072 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing, which sets predetermined cost benchmarks"
  Explanation: "Option B (Standard costing, which sets predetermined cost benchmarks) represents a plausible misconception. Under Continuous budgeting, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-072 (pack_c_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting, which is unrelated to auditing"
  Explanation: "Option C (Zero-based budgeting, which is unrelated to auditing) represents a plausible misconception. Under Continuous budgeting, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-075 (pack_c_corrected.js) slot ExplanationWrongA
  Choice: "Sales forecasting, which projects future revenue"
  Explanation: "Option A (Sales forecasting, which projects future revenue) represents a plausible misconception. Under Continuous budgeting, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-075 (pack_c_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting, which is unrelated to auditing"
  Explanation: "Option B (Zero-based budgeting, which is unrelated to auditing) represents a plausible misconception. Under Continuous budgeting, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

P1-FC-075 (pack_c_corrected.js) slot ExplanationWrongD
  Choice: "Standard costing, which sets predetermined cost benchmarks"
  Explanation: "Option D (Standard costing, which sets predetermined cost benchmarks) represents a plausible misconception. Under Continuous budgeting, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "using technology to monitor"

--- pack_d_corrected.js ΓÇö 741 findings ---

P1-AD-002 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an increase to accounts payable"
  Explanation: "Option A (As an increase to accounts payable) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-002 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a loan collateralized by receivables, with no change to the receivables balance"
  Explanation: "Option C (As a loan collateralized by receivables, with no change to the receivables ba...) represents a plausible misconception. Under CMA Part 1 acc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-002 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a reduction of revenue for the period"
  Explanation: "Option D (As a reduction of revenue for the period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-003 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As a loan collateralized by receivables, with no change to the receivables balance"
  Explanation: "Option A (As a loan collateralized by receivables, with no change to the receivables ba...) represents a plausible misconception. Under CMA Part 1 acc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-003 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As a reduction of revenue for the period"
  Explanation: "Option B (As a reduction of revenue for the period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-003 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As an increase to accounts payable"
  Explanation: "Option D (As an increase to accounts payable) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-004 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an increase to accounts payable"
  Explanation: "Option A (As an increase to accounts payable) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-004 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As a reduction of revenue for the period"
  Explanation: "Option B (As a reduction of revenue for the period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-004 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a loan collateralized by receivables, with no change to the receivables balance"
  Explanation: "Option C (As a loan collateralized by receivables, with no change to the receivables ba...) represents a plausible misconception. Under CMA Part 1 acc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "a sale of receivables"

P1-AD-006 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Expense all interest immediately regardless of construction status"
  Explanation: "Option A (Expense all interest immediately regardless of construction status) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-006 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Record the interest as a reduction of revenue"
  Explanation: "Option C (Record the interest as a reduction of revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-006 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Defer the interest indefinitely with no future recognition"
  Explanation: "Option D (Defer the interest indefinitely with no future recognition) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-007 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Record the interest as a reduction of revenue"
  Explanation: "Option A (Record the interest as a reduction of revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-007 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Defer the interest indefinitely with no future recognition"
  Explanation: "Option B (Defer the interest indefinitely with no future recognition) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-007 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Expense all interest immediately regardless of construction status"
  Explanation: "Option D (Expense all interest immediately regardless of construction status) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-008 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Defer the interest indefinitely with no future recognition"
  Explanation: "Option A (Defer the interest indefinitely with no future recognition) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-008 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Expense all interest immediately regardless of construction status"
  Explanation: "Option B (Expense all interest immediately regardless of construction status) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-008 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Record the interest as a reduction of revenue"
  Explanation: "Option C (Record the interest as a reduction of revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-010 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Expense all interest immediately regardless of construction status"
  Explanation: "Option A (Expense all interest immediately regardless of construction status) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-010 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Defer the interest indefinitely with no future recognition"
  Explanation: "Option C (Defer the interest indefinitely with no future recognition) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-010 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Record the interest as a reduction of revenue"
  Explanation: "Option D (Record the interest as a reduction of revenue) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Capitalize the interest as"

P1-AD-011 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an investing activity"
  Explanation: "Option A (As an investing activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-011 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an operating activity"
  Explanation: "Option B (As an operating activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-011 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a noncash adjustment only"
  Explanation: "Option D (As a noncash adjustment only) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-012 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an investing activity"
  Explanation: "Option A (As an investing activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-012 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an operating activity"
  Explanation: "Option B (As an operating activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-012 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a noncash adjustment only"
  Explanation: "Option C (As a noncash adjustment only) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-014 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an operating activity"
  Explanation: "Option A (As an operating activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-014 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As an investing activity"
  Explanation: "Option C (As an investing activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-014 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a noncash adjustment only"
  Explanation: "Option D (As a noncash adjustment only) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-015 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As a noncash adjustment only"
  Explanation: "Option A (As a noncash adjustment only) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-015 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an operating activity"
  Explanation: "Option B (As an operating activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-015 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As an investing activity"
  Explanation: "Option D (As an investing activity) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the correct analysis leads to the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a financing activity"

P1-AD-016 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recognize the full sales amount with no adjustment for expected returns"
  Explanation: "Option A (Recognize the full sales amount with no adjustment for expected returns) represents a plausible misconception. Under Financial statement rat..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-016 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Defer all revenue recognition until the return period expires"
  Explanation: "Option B (Defer all revenue recognition until the return period expires) represents a plausible misconception. Under Financial statement ratio analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-016 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Recognize revenue only for units definitely not returned"
  Explanation: "Option C (Recognize revenue only for units definitely not returned) represents a plausible misconception. Under Financial statement ratio analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-018 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Defer all revenue recognition until the return period expires"
  Explanation: "Option A (Defer all revenue recognition until the return period expires) represents a plausible misconception. Under Financial statement ratio analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-018 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Recognize the full sales amount with no adjustment for expected returns"
  Explanation: "Option C (Recognize the full sales amount with no adjustment for expected returns) represents a plausible misconception. Under Financial statement rat..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-018 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Recognize revenue only for units definitely not returned"
  Explanation: "Option D (Recognize revenue only for units definitely not returned) represents a plausible misconception. Under Financial statement ratio analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-019 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Defer all revenue recognition until the return period expires"
  Explanation: "Option A (Defer all revenue recognition until the return period expires) represents a plausible misconception. Under Financial statement ratio analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-019 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Recognize revenue only for units definitely not returned"
  Explanation: "Option B (Recognize revenue only for units definitely not returned) represents a plausible misconception. Under Financial statement ratio analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-019 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Recognize the full sales amount with no adjustment for expected returns"
  Explanation: "Option D (Recognize the full sales amount with no adjustment for expected returns) represents a plausible misconception. Under Financial statement rat..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-020 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recognize the full sales amount with no adjustment for expected returns"
  Explanation: "Option A (Recognize the full sales amount with no adjustment for expected returns) represents a plausible misconception. Under Financial statement rat..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-020 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Recognize revenue only for units definitely not returned"
  Explanation: "Option B (Recognize revenue only for units definitely not returned) represents a plausible misconception. Under Financial statement ratio analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-020 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Defer all revenue recognition until the return period expires"
  Explanation: "Option C (Defer all revenue recognition until the return period expires) represents a plausible misconception. Under Financial statement ratio analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize revenue for the"

P1-AD-022 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "In net income immediately"
  Explanation: "Option A (In net income immediately) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-022 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a direct increase to retained earnings with no income statement effect"
  Explanation: "Option C (As a direct increase to retained earnings with no income statement effect) represents a plausible misconception. Under ASC 220 (Comprehensiv..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-022 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As deferred revenue on the balance sheet"
  Explanation: "Option D (As deferred revenue on the balance sheet) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-023 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "In net income immediately"
  Explanation: "Option A (In net income immediately) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-023 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As deferred revenue on the balance sheet"
  Explanation: "Option B (As deferred revenue on the balance sheet) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-023 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a direct increase to retained earnings with no income statement effect"
  Explanation: "Option D (As a direct increase to retained earnings with no income statement effect) represents a plausible misconception. Under ASC 220 (Comprehensiv..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-024 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As deferred revenue on the balance sheet"
  Explanation: "Option A (As deferred revenue on the balance sheet) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-024 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As a direct increase to retained earnings with no income statement effect"
  Explanation: "Option B (As a direct increase to retained earnings with no income statement effect) represents a plausible misconception. Under ASC 220 (Comprehensiv..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-024 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "In net income immediately"
  Explanation: "Option C (In net income immediately) represents a plausible misconception. Under ASC 220 (Comprehensive Income), the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "In other comprehensive income"

P1-AD-026 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Expense the estimated future cost immediately in full"
  Explanation: "Option A (Expense the estimated future cost immediately in full) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-026 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Record the obligation only in the notes with no balance sheet recognition"
  Explanation: "Option C (Record the obligation only in the notes with no balance sheet recognition) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-026 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Ignore the obligation until the equipment is actually retired"
  Explanation: "Option D (Ignore the obligation until the equipment is actually retired) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-027 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Record the obligation only in the notes with no balance sheet recognition"
  Explanation: "Option A (Record the obligation only in the notes with no balance sheet recognition) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-027 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Ignore the obligation until the equipment is actually retired"
  Explanation: "Option B (Ignore the obligation until the equipment is actually retired) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-027 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Expense the estimated future cost immediately in full"
  Explanation: "Option D (Expense the estimated future cost immediately in full) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-028 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Expense the estimated future cost immediately in full"
  Explanation: "Option A (Expense the estimated future cost immediately in full) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-028 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Record the obligation only in the notes with no balance sheet recognition"
  Explanation: "Option B (Record the obligation only in the notes with no balance sheet recognition) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-028 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Ignore the obligation until the equipment is actually retired"
  Explanation: "Option C (Ignore the obligation until the equipment is actually retired) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-030 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the obligation until the equipment is actually retired"
  Explanation: "Option A (Ignore the obligation until the equipment is actually retired) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-030 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Expense the estimated future cost immediately in full"
  Explanation: "Option C (Expense the estimated future cost immediately in full) represents a plausible misconception. Under CMA Part 1 accounting principles, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-030 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Record the obligation only in the notes with no balance sheet recognition"
  Explanation: "Option D (Record the obligation only in the notes with no balance sheet recognition) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize a liability at"

P1-AD-031 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignore it since it occurred after year-end"
  Explanation: "Option A (Ignore it since it occurred after year-end) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-031 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Restate the prior year's financial statements instead"
  Explanation: "Option B (Restate the prior year's financial statements instead) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-031 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a nonrecognized subsequent event requiring disclosure only"
  Explanation: "Option D (As a nonrecognized subsequent event requiring disclosure only) represents a plausible misconception. Under ASC 855 (Subsequent Events), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignore it since it occurred after year-end"
  Explanation: "Option A (Ignore it since it occurred after year-end) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Restate the prior year's financial statements instead"
  Explanation: "Option B (Restate the prior year's financial statements instead) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a nonrecognized subsequent event requiring disclosure only"
  Explanation: "Option C (As a nonrecognized subsequent event requiring disclosure only) represents a plausible misconception. Under ASC 855 (Subsequent Events), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-034 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Restate the prior year's financial statements instead"
  Explanation: "Option A (Restate the prior year's financial statements instead) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-034 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a nonrecognized subsequent event requiring disclosure only"
  Explanation: "Option C (As a nonrecognized subsequent event requiring disclosure only) represents a plausible misconception. Under ASC 855 (Subsequent Events), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-034 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Ignore it since it occurred after year-end"
  Explanation: "Option D (Ignore it since it occurred after year-end) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-035 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As a nonrecognized subsequent event requiring disclosure only"
  Explanation: "Option A (As a nonrecognized subsequent event requiring disclosure only) represents a plausible misconception. Under ASC 855 (Subsequent Events), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-035 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Restate the prior year's financial statements instead"
  Explanation: "Option B (Restate the prior year's financial statements instead) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-035 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Ignore it since it occurred after year-end"
  Explanation: "Option D (Ignore it since it occurred after year-end) represents a plausible misconception. Under ASC 855 (Subsequent Events), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a recognized subsequent"

P1-AD-036 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an intangible asset amortized over 40 years"
  Explanation: "Option A (As an intangible asset amortized over 40 years) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-036 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an immediate expense in the period of issuance"
  Explanation: "Option B (As an immediate expense in the period of issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-036 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a reduction of additional paid-in capital"
  Explanation: "Option C (As a reduction of additional paid-in capital) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-038 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an intangible asset amortized over 40 years"
  Explanation: "Option A (As an intangible asset amortized over 40 years) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-038 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a reduction of additional paid-in capital"
  Explanation: "Option C (As a reduction of additional paid-in capital) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-038 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As an immediate expense in the period of issuance"
  Explanation: "Option D (As an immediate expense in the period of issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-039 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As a reduction of additional paid-in capital"
  Explanation: "Option A (As a reduction of additional paid-in capital) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-039 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an intangible asset amortized over 40 years"
  Explanation: "Option B (As an intangible asset amortized over 40 years) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-039 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As an immediate expense in the period of issuance"
  Explanation: "Option D (As an immediate expense in the period of issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-040 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an immediate expense in the period of issuance"
  Explanation: "Option A (As an immediate expense in the period of issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-040 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As a reduction of additional paid-in capital"
  Explanation: "Option B (As a reduction of additional paid-in capital) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-040 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As an intangible asset amortized over 40 years"
  Explanation: "Option C (As an intangible asset amortized over 40 years) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a direct reduction"

P1-AD-042 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Only within the statement of retained earnings"
  Explanation: "Option A (Only within the statement of retained earnings) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-042 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Only combined with the statement of cash flows"
  Explanation: "Option C (Only combined with the statement of cash flows) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-042 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Only as a footnote disclosure with no statement presentation"
  Explanation: "Option D (Only as a footnote disclosure with no statement presentation) represents a plausible misconception. Under ASC 205 (Income Statement), the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-043 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Only as a footnote disclosure with no statement presentation"
  Explanation: "Option A (Only as a footnote disclosure with no statement presentation) represents a plausible misconception. Under ASC 205 (Income Statement), the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-043 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Only combined with the statement of cash flows"
  Explanation: "Option B (Only combined with the statement of cash flows) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-043 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Only within the statement of retained earnings"
  Explanation: "Option D (Only within the statement of retained earnings) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-044 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Only combined with the statement of cash flows"
  Explanation: "Option A (Only combined with the statement of cash flows) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-044 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Only as a footnote disclosure with no statement presentation"
  Explanation: "Option B (Only as a footnote disclosure with no statement presentation) represents a plausible misconception. Under ASC 205 (Income Statement), the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-044 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Only within the statement of retained earnings"
  Explanation: "Option C (Only within the statement of retained earnings) represents a plausible misconception. Under ASC 205 (Income Statement), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A single continuous statement"

P1-AD-046 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Neither party, since consigned goods are not part of any inventory"
  Explanation: "Option A (Neither party, since consigned goods are not part of any inventory) represents a plausible misconception. Under ASC 330 (Inventory), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-046 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The consignee (the dealer), since the goods are in its possession"
  Explanation: "Option C (The consignee (the dealer), since the goods are in its possession) represents a plausible misconception. Under ASC 330 (Inventory), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-046 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Both parties equally, split by physical location"
  Explanation: "Option D (Both parties equally, split by physical location) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-047 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Neither party, since consigned goods are not part of any inventory"
  Explanation: "Option A (Neither party, since consigned goods are not part of any inventory) represents a plausible misconception. Under ASC 330 (Inventory), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-047 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The consignee (the dealer), since the goods are in its possession"
  Explanation: "Option B (The consignee (the dealer), since the goods are in its possession) represents a plausible misconception. Under ASC 330 (Inventory), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-047 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Both parties equally, split by physical location"
  Explanation: "Option D (Both parties equally, split by physical location) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-048 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Neither party, since consigned goods are not part of any inventory"
  Explanation: "Option A (Neither party, since consigned goods are not part of any inventory) represents a plausible misconception. Under ASC 330 (Inventory), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-048 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Both parties equally, split by physical location"
  Explanation: "Option B (Both parties equally, split by physical location) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-048 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The consignee (the dealer), since the goods are in its possession"
  Explanation: "Option C (The consignee (the dealer), since the goods are in its possession) represents a plausible misconception. Under ASC 330 (Inventory), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-050 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Neither party, since consigned goods are not part of any inventory"
  Explanation: "Option A (Neither party, since consigned goods are not part of any inventory) represents a plausible misconception. Under ASC 330 (Inventory), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-050 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The consignee (the dealer), since the goods are in its possession"
  Explanation: "Option C (The consignee (the dealer), since the goods are in its possession) represents a plausible misconception. Under ASC 330 (Inventory), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-050 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Both parties equally, split by physical location"
  Explanation: "Option D (Both parties equally, split by physical location) represents a plausible misconception. Under ASC 330 (Inventory), the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The consignor (the shipping"

P1-AD-051 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Reduce basic EPS by the full par value of preferred shares"
  Explanation: "Option A (Reduce basic EPS by the full par value of preferred shares) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-051 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Exclude convertible preferred stock from all EPS calculations"
  Explanation: "Option B (Exclude convertible preferred stock from all EPS calculations) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-051 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Treat conversion as a financing cash inflow only"
  Explanation: "Option D (Treat conversion as a financing cash inflow only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-052 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Reduce basic EPS by the full par value of preferred shares"
  Explanation: "Option A (Reduce basic EPS by the full par value of preferred shares) represents a plausible misconception. Under CMA Part 1 accounting principles, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-052 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Treat conversion as a financing cash inflow only"
  Explanation: "Option B (Treat conversion as a financing cash inflow only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-052 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Exclude convertible preferred stock from all EPS calculations"
  Explanation: "Option C (Exclude convertible preferred stock from all EPS calculations) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Include the as-if-converted shares"

P1-AD-058 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an extraordinary item in the current period"
  Explanation: "Option A (As an extraordinary item in the current period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-058 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As a prior period adjustment to retained earnings"
  Explanation: "Option C (As a prior period adjustment to retained earnings) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-058 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Retrospectively, restating all prior period financial statements"
  Explanation: "Option D (Retrospectively, restating all prior period financial statements) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-059 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Retrospectively, restating all prior period financial statements"
  Explanation: "Option A (Retrospectively, restating all prior period financial statements) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-059 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an extraordinary item in the current period"
  Explanation: "Option B (As an extraordinary item in the current period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-059 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a prior period adjustment to retained earnings"
  Explanation: "Option D (As a prior period adjustment to retained earnings) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-060 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As a prior period adjustment to retained earnings"
  Explanation: "Option A (As a prior period adjustment to retained earnings) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-060 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Retrospectively, restating all prior period financial statements"
  Explanation: "Option B (Retrospectively, restating all prior period financial statements) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-060 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As an extraordinary item in the current period"
  Explanation: "Option C (As an extraordinary item in the current period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "adjusting depreciation expense in"

P1-AD-062 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Included within cash flows from operating activities"
  Explanation: "Option A (Included within cash flows from operating activities) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice C "Included within cash flows"
    - VERBATIM_MATCH: explanation contains text from choice D "statement of cash flows"

P1-AD-062 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Included within cash flows from investing activities as a cash outflow"
  Explanation: "Option C (Included within cash flows from investing activities as a cash outflow) represents a plausible misconception. Under ASC 230 (Statement of Ca..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice A "Included within cash flows"
    - VERBATIM_MATCH: explanation contains text from choice D "statement of cash flows"

P1-AD-062 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Omitted entirely from the statement of cash flows and notes"
  Explanation: "Option D (Omitted entirely from the statement of cash flows and notes) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"

P1-AD-063 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Omitted entirely from the statement of cash flows and notes"
  Explanation: "Option A (Omitted entirely from the statement of cash flows and notes) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"

P1-AD-063 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Included within cash flows from operating activities"
  Explanation: "Option B (Included within cash flows from operating activities) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice A "statement of cash flows"
    - VERBATIM_MATCH: explanation contains text from choice D "Included within cash flows"

P1-AD-063 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Included within cash flows from investing activities as a cash outflow"
  Explanation: "Option D (Included within cash flows from investing activities as a cash outflow) represents a plausible misconception. Under ASC 230 (Statement of Ca..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice A "statement of cash flows"
    - VERBATIM_MATCH: explanation contains text from choice B "Included within cash flows"

P1-AD-064 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Included within cash flows from operating activities"
  Explanation: "Option A (Included within cash flows from operating activities) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice B "statement of cash flows"
    - VERBATIM_MATCH: explanation contains text from choice C "Included within cash flows"

P1-AD-064 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Omitted entirely from the statement of cash flows and notes"
  Explanation: "Option B (Omitted entirely from the statement of cash flows and notes) represents a plausible misconception. Under ASC 230 (Statement of Cash Flows), ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"

P1-AD-064 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Included within cash flows from investing activities as a cash outflow"
  Explanation: "Option C (Included within cash flows from investing activities as a cash outflow) represents a plausible misconception. Under ASC 230 (Statement of Ca..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Disclosed as a supplemental"
    - VERBATIM_MATCH: explanation contains text from choice A "Included within cash flows"
    - VERBATIM_MATCH: explanation contains text from choice B "statement of cash flows"

P1-AD-066 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Record the securities at historical cost with no remeasurement"
  Explanation: "Option A (Record the securities at historical cost with no remeasurement) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice C "Recognize unrealized gains and"

P1-AD-066 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Recognize unrealized gains and losses in other comprehensive income"
  Explanation: "Option C (Recognize unrealized gains and losses in other comprehensive income) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"

P1-AD-066 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Defer all gains and losses until the securities are sold"
  Explanation: "Option D (Defer all gains and losses until the securities are sold) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice C "Recognize unrealized gains and"

P1-AD-067 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recognize unrealized gains and losses in other comprehensive income"
  Explanation: "Option A (Recognize unrealized gains and losses in other comprehensive income) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"

P1-AD-067 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Defer all gains and losses until the securities are sold"
  Explanation: "Option B (Defer all gains and losses until the securities are sold) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-067 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Record the securities at historical cost with no remeasurement"
  Explanation: "Option D (Record the securities at historical cost with no remeasurement) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-068 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recognize unrealized gains and losses in other comprehensive income"
  Explanation: "Option A (Recognize unrealized gains and losses in other comprehensive income) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"

P1-AD-068 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Record the securities at historical cost with no remeasurement"
  Explanation: "Option B (Record the securities at historical cost with no remeasurement) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-068 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Defer all gains and losses until the securities are sold"
  Explanation: "Option C (Defer all gains and losses until the securities are sold) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-070 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recognize unrealized gains and losses in other comprehensive income"
  Explanation: "Option A (Recognize unrealized gains and losses in other comprehensive income) represents a plausible misconception. Under CMA Part 1 accounting princ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"

P1-AD-070 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Defer all gains and losses until the securities are sold"
  Explanation: "Option C (Defer all gains and losses until the securities are sold) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-070 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Record the securities at historical cost with no remeasurement"
  Explanation: "Option D (Record the securities at historical cost with no remeasurement) represents a plausible misconception. Under CMA Part 1 accounting principles..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Recognize unrealized gains and"
    - VERBATIM_MATCH: explanation contains text from choice A "Recognize unrealized gains and"

P1-AD-071 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an unusual or infrequent item in the current period's income statement"
  Explanation: "Option A (As an unusual or infrequent item in the current period's income statement) represents a plausible misconception. Under Artificial intelligen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-071 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Ignored since the error relates to a prior period"
  Explanation: "Option B (Ignored since the error relates to a prior period) represents a plausible misconception. Under Artificial intelligence in accounting, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-071 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a change in accounting estimate, applied prospectively only"
  Explanation: "Option D (As a change in accounting estimate, applied prospectively only) represents a plausible misconception. Under Artificial intelligence in accou..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-072 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignored since the error relates to a prior period"
  Explanation: "Option A (Ignored since the error relates to a prior period) represents a plausible misconception. Under Artificial intelligence in accounting, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-072 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As a change in accounting estimate, applied prospectively only"
  Explanation: "Option B (As a change in accounting estimate, applied prospectively only) represents a plausible misconception. Under Artificial intelligence in accou..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-072 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "As an unusual or infrequent item in the current period's income statement"
  Explanation: "Option C (As an unusual or infrequent item in the current period's income statement) represents a plausible misconception. Under Artificial intelligen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-074 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "As an unusual or infrequent item in the current period's income statement"
  Explanation: "Option A (As an unusual or infrequent item in the current period's income statement) represents a plausible misconception. Under Artificial intelligen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-074 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Ignored since the error relates to a prior period"
  Explanation: "Option C (Ignored since the error relates to a prior period) represents a plausible misconception. Under Artificial intelligence in accounting, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-074 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a change in accounting estimate, applied prospectively only"
  Explanation: "Option D (As a change in accounting estimate, applied prospectively only) represents a plausible misconception. Under Artificial intelligence in accou..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignored since the error relates to a prior period"
  Explanation: "Option A (Ignored since the error relates to a prior period) represents a plausible misconception. Under Artificial intelligence in accounting, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "As an unusual or infrequent item in the current period's income statement"
  Explanation: "Option B (As an unusual or infrequent item in the current period's income statement) represents a plausible misconception. Under Artificial intelligen..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-AD-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "As a change in accounting estimate, applied prospectively only"
  Explanation: "Option D (As a change in accounting estimate, applied prospectively only) represents a plausible misconception. Under Artificial intelligence in accou..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a prior period"

P1-BD-002 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Actual output exceeded the original static budget target"
  Explanation: "Option A (Actual output exceeded the original static budget target) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-002 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Sales volume was higher than budgeted"
  Explanation: "Option C (Sales volume was higher than budgeted) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-002 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Fixed costs were entirely eliminated during the period"
  Explanation: "Option D (Fixed costs were entirely eliminated during the period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-003 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Actual output exceeded the original static budget target"
  Explanation: "Option A (Actual output exceeded the original static budget target) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-003 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Fixed costs were entirely eliminated during the period"
  Explanation: "Option B (Fixed costs were entirely eliminated during the period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-003 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Sales volume was higher than budgeted"
  Explanation: "Option D (Sales volume was higher than budgeted) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-004 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Fixed costs were entirely eliminated during the period"
  Explanation: "Option A (Fixed costs were entirely eliminated during the period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-004 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Sales volume was higher than budgeted"
  Explanation: "Option B (Sales volume was higher than budgeted) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-004 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Actual output exceeded the original static budget target"
  Explanation: "Option C (Actual output exceeded the original static budget target) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-006 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Sales volume was higher than budgeted"
  Explanation: "Option A (Sales volume was higher than budgeted) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-006 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Actual output exceeded the original static budget target"
  Explanation: "Option C (Actual output exceeded the original static budget target) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-006 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Fixed costs were entirely eliminated during the period"
  Explanation: "Option D (Fixed costs were entirely eliminated during the period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-007 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Fixed costs were entirely eliminated during the period"
  Explanation: "Option A (Fixed costs were entirely eliminated during the period) represents a plausible misconception. Under Budgeting concepts and methodologies, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-007 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Sales volume was higher than budgeted"
  Explanation: "Option B (Sales volume was higher than budgeted) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-007 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Actual output exceeded the original static budget target"
  Explanation: "Option D (Actual output exceeded the original static budget target) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual costs were lower"

P1-BD-008 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option A (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-008 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It requires zero-based justification for every line item"
  Explanation: "Option B (It requires zero-based justification for every line item) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-008 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the most efficient allocation of resources"
  Explanation: "Option C (It guarantees the most efficient allocation of resources) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-010 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It requires zero-based justification for every line item"
  Explanation: "Option A (It requires zero-based justification for every line item) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-010 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the most efficient allocation of resources"
  Explanation: "Option C (It guarantees the most efficient allocation of resources) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-010 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option D (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-011 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the most efficient allocation of resources"
  Explanation: "Option A (It guarantees the most efficient allocation of resources) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-011 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It requires zero-based justification for every line item"
  Explanation: "Option B (It requires zero-based justification for every line item) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-011 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option D (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-012 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option A (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-012 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It requires zero-based justification for every line item"
  Explanation: "Option B (It requires zero-based justification for every line item) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-012 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the most efficient allocation of resources"
  Explanation: "Option C (It guarantees the most efficient allocation of resources) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-014 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees the most efficient allocation of resources"
  Explanation: "Option A (It guarantees the most efficient allocation of resources) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-014 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It requires zero-based justification for every line item"
  Explanation: "Option C (It requires zero-based justification for every line item) represents a plausible misconception. Under Budgeting concepts and methodologies, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-014 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option D (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It can perpetuate inefficiencies"

P1-BD-015 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To set the annual sales commission structure"
  Explanation: "Option A (To set the annual sales commission structure) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-015 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To forecast daily cash receipts and disbursements"
  Explanation: "Option B (To forecast daily cash receipts and disbursements) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-015 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To estimate short-term inventory purchase needs"
  Explanation: "Option D (To estimate short-term inventory purchase needs) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-016 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To estimate short-term inventory purchase needs"
  Explanation: "Option A (To estimate short-term inventory purchase needs) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-016 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To forecast daily cash receipts and disbursements"
  Explanation: "Option B (To forecast daily cash receipts and disbursements) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-016 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To set the annual sales commission structure"
  Explanation: "Option C (To set the annual sales commission structure) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-018 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To estimate short-term inventory purchase needs"
  Explanation: "Option A (To estimate short-term inventory purchase needs) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-018 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To set the annual sales commission structure"
  Explanation: "Option C (To set the annual sales commission structure) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-018 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To forecast daily cash receipts and disbursements"
  Explanation: "Option D (To forecast daily cash receipts and disbursements) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-019 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To set the annual sales commission structure"
  Explanation: "Option A (To set the annual sales commission structure) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-019 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To forecast daily cash receipts and disbursements"
  Explanation: "Option B (To forecast daily cash receipts and disbursements) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-019 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To estimate short-term inventory purchase needs"
  Explanation: "Option D (To estimate short-term inventory purchase needs) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-020 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To set the annual sales commission structure"
  Explanation: "Option A (To set the annual sales commission structure) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-020 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To estimate short-term inventory purchase needs"
  Explanation: "Option B (To estimate short-term inventory purchase needs) represents a plausible misconception. Under Budgeting concepts and methodologies, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-020 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To forecast daily cash receipts and disbursements"
  Explanation: "Option C (To forecast daily cash receipts and disbursements) represents a plausible misconception. Under Budgeting concepts and methodologies, the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To plan and control"

P1-BD-022 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "576,000"
  Explanation: "This choice double-counts the labor hours or rate, likely multiplying by the 2 hours per unit twice (8,000 ├ù 2 ├ù 2 ├ù $18). The correct calculation is ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-023 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "576,000"
  Explanation: "This choice double-counts the labor hours or rate, likely multiplying by the 2 hours per unit twice (8,000 ├ù 2 ├ù 2 ├ù $18). The correct calculation is ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-024 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "576,000"
  Explanation: "This choice double-counts the labor hours or rate, likely multiplying by the 2 hours per unit twice (8,000 ├ù 2 ├ù 2 ├ù $18). The correct calculation is ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-025 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "576,000"
  Explanation: "This choice double-counts the labor hours or rate, likely multiplying by the 2 hours per unit twice (8,000 ├ù 2 ├ù 2 ├ù $18). The correct calculation is ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-027 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "576,000"
  Explanation: "This overstates cost by applying the 2-hour factor twice or otherwise doubling the correct $288,000 amount."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-028 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "576,000"
  Explanation: "This choice double-counts the labor hours or rate, likely multiplying by the 2 hours per unit twice (8,000 ├ù 2 ├ù 2 ├ù $18). The correct calculation is ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (288000) not distractor numbers

P1-BD-030 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate all future price fluctuations"
  Explanation: "Option A (To eliminate all future price fluctuations) represents a plausible misconception. Under Standard costing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-030 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To set the company's external financial reporting figures directly"
  Explanation: "Option C (To set the company's external financial reporting figures directly) represents a plausible misconception. Under Standard costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-030 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for actual cost records entirely"
  Explanation: "Option D (To replace the need for actual cost records entirely) represents a plausible misconception. Under Standard costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-031 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate all future price fluctuations"
  Explanation: "Option A (To eliminate all future price fluctuations) represents a plausible misconception. Under Standard costing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-031 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To replace the need for actual cost records entirely"
  Explanation: "Option B (To replace the need for actual cost records entirely) represents a plausible misconception. Under Standard costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-031 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To set the company's external financial reporting figures directly"
  Explanation: "Option D (To set the company's external financial reporting figures directly) represents a plausible misconception. Under Standard costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for actual cost records entirely"
  Explanation: "Option A (To replace the need for actual cost records entirely) represents a plausible misconception. Under Standard costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate all future price fluctuations"
  Explanation: "Option B (To eliminate all future price fluctuations) represents a plausible misconception. Under Standard costing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To set the company's external financial reporting figures directly"
  Explanation: "Option C (To set the company's external financial reporting figures directly) represents a plausible misconception. Under Standard costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-034 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for actual cost records entirely"
  Explanation: "Option A (To replace the need for actual cost records entirely) represents a plausible misconception. Under Standard costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-034 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To set the company's external financial reporting figures directly"
  Explanation: "Option C (To set the company's external financial reporting figures directly) represents a plausible misconception. Under Standard costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-034 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate all future price fluctuations"
  Explanation: "Option D (To eliminate all future price fluctuations) represents a plausible misconception. Under Standard costing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-035 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate all future price fluctuations"
  Explanation: "Option A (To eliminate all future price fluctuations) represents a plausible misconception. Under Standard costing, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-035 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To set the company's external financial reporting figures directly"
  Explanation: "Option B (To set the company's external financial reporting figures directly) represents a plausible misconception. Under Standard costing, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-035 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for actual cost records entirely"
  Explanation: "Option D (To replace the need for actual cost records entirely) represents a plausible misconception. Under Standard costing, the correct analysis lea..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide a benchmark"

P1-BD-036 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The operating budget only covers capital expenditures"
  Explanation: "Option A (The operating budget only covers capital expenditures) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-036 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The financial budget only covers payroll costs"
  Explanation: "Option B (The financial budget only covers payroll costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-036 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "They are identical and interchangeable terms"
  Explanation: "Option C (They are identical and interchangeable terms) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-038 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "They are identical and interchangeable terms"
  Explanation: "Option A (They are identical and interchangeable terms) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-038 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The operating budget only covers capital expenditures"
  Explanation: "Option C (The operating budget only covers capital expenditures) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-038 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The financial budget only covers payroll costs"
  Explanation: "Option D (The financial budget only covers payroll costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-039 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "They are identical and interchangeable terms"
  Explanation: "Option A (They are identical and interchangeable terms) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-039 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The financial budget only covers payroll costs"
  Explanation: "Option B (The financial budget only covers payroll costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-039 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The operating budget only covers capital expenditures"
  Explanation: "Option D (The operating budget only covers capital expenditures) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-040 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "They are identical and interchangeable terms"
  Explanation: "Option A (They are identical and interchangeable terms) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-040 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The operating budget only covers capital expenditures"
  Explanation: "Option B (The operating budget only covers capital expenditures) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-040 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The financial budget only covers payroll costs"
  Explanation: "Option C (The financial budget only covers payroll costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-042 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The operating budget only covers capital expenditures"
  Explanation: "Option A (The operating budget only covers capital expenditures) represents a plausible misconception. Under Budgeting concepts and methodologies, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-042 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "They are identical and interchangeable terms"
  Explanation: "Option C (They are identical and interchangeable terms) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-042 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The financial budget only covers payroll costs"
  Explanation: "Option D (The financial budget only covers payroll costs) represents a plausible misconception. Under Budgeting concepts and methodologies, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The operating budget focuses"

P1-BD-050 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "22,000 pounds"
  Explanation: "This choice subtracts beginning inventory (3,000 lbs) from production needs (25,000 lbs) but omits the desired ending inventory addition (4,000 lbs). ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-050 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "28,000 pounds"
  Explanation: "This choice adds beginning inventory (3,000 lbs) instead of subtracting it, and ignores desired ending inventory (4,000 lbs). Beginning inventory is a..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-051 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "22,000 pounds"
  Explanation: "This choice subtracts beginning inventory (3,000 lbs) from production needs (25,000 lbs) but omits the desired ending inventory addition (4,000 lbs). ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-051 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "28,000 pounds"
  Explanation: "This choice adds beginning inventory (3,000 lbs) instead of subtracting it, and ignores desired ending inventory (4,000 lbs). Beginning inventory is a..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-055 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "28,000 pounds"
  Explanation: "This choice adds beginning inventory (3,000 lbs) instead of subtracting it, and ignores desired ending inventory (4,000 lbs). Beginning inventory is a..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-055 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "22,000 pounds"
  Explanation: "This choice subtracts beginning inventory (3,000 lbs) from production needs (25,000 lbs) but omits the desired ending inventory addition (4,000 lbs). ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-056 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "28,000 pounds"
  Explanation: "This choice adds beginning inventory (3,000 lbs) instead of subtracting it, and ignores desired ending inventory (4,000 lbs). Beginning inventory is a..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-056 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "22,000 pounds"
  Explanation: "This choice subtracts beginning inventory (3,000 lbs) from production needs (25,000 lbs) but omits the desired ending inventory addition (4,000 lbs). ..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (26000) not distractor numbers

P1-BD-058 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option A (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-058 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees no budgetary slack will ever occur"
  Explanation: "Option C (It guarantees no budgetary slack will ever occur) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-058 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It removes the finance department from the budgeting process entirely"
  Explanation: "Option D (It removes the finance department from the budgeting process entirely) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-059 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees no budgetary slack will ever occur"
  Explanation: "Option A (It guarantees no budgetary slack will ever occur) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-059 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option B (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-059 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It removes the finance department from the budgeting process entirely"
  Explanation: "Option D (It removes the finance department from the budgeting process entirely) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-060 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It removes the finance department from the budgeting process entirely"
  Explanation: "Option A (It removes the finance department from the budgeting process entirely) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-060 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option B (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-060 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees no budgetary slack will ever occur"
  Explanation: "Option C (It guarantees no budgetary slack will ever occur) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-062 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees no budgetary slack will ever occur"
  Explanation: "Option A (It guarantees no budgetary slack will ever occur) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-062 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It removes the finance department from the budgeting process entirely"
  Explanation: "Option C (It removes the finance department from the budgeting process entirely) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-062 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option D (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-063 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It removes the finance department from the budgeting process entirely"
  Explanation: "Option A (It removes the finance department from the budgeting process entirely) represents a plausible misconception. Under Budgeting concepts and me..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-063 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for a sales forecast"
  Explanation: "Option B (It eliminates the need for a sales forecast) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-063 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees no budgetary slack will ever occur"
  Explanation: "Option D (It guarantees no budgetary slack will ever occur) represents a plausible misconception. Under Budgeting concepts and methodologies, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides cross-functional review"

P1-BD-064 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The CEO's fixed annual salary"
  Explanation: "Option A (The CEO's fixed annual salary) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-064 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Multi-year lease payments on office space"
  Explanation: "Option B (Multi-year lease payments on office space) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-064 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Straight-line depreciation on headquarters"
  Explanation: "Option C (Straight-line depreciation on headquarters) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-066 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Multi-year lease payments on office space"
  Explanation: "Option A (Multi-year lease payments on office space) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-066 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The CEO's fixed annual salary"
  Explanation: "Option C (The CEO's fixed annual salary) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-066 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Straight-line depreciation on headquarters"
  Explanation: "Option D (Straight-line depreciation on headquarters) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-067 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The CEO's fixed annual salary"
  Explanation: "Option A (The CEO's fixed annual salary) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-067 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Multi-year lease payments on office space"
  Explanation: "Option B (Multi-year lease payments on office space) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-067 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Straight-line depreciation on headquarters"
  Explanation: "Option D (Straight-line depreciation on headquarters) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-068 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The CEO's fixed annual salary"
  Explanation: "Option A (The CEO's fixed annual salary) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-068 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Straight-line depreciation on headquarters"
  Explanation: "Option B (Straight-line depreciation on headquarters) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-068 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Multi-year lease payments on office space"
  Explanation: "Option C (Multi-year lease payments on office space) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-070 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Multi-year lease payments on office space"
  Explanation: "Option A (Multi-year lease payments on office space) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-070 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The CEO's fixed annual salary"
  Explanation: "Option C (The CEO's fixed annual salary) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-070 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Straight-line depreciation on headquarters"
  Explanation: "Option D (Straight-line depreciation on headquarters) represents a plausible misconception. Under Budgeting concepts and methodologies, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Sales commissions that vary"

P1-BD-071 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To determine the exact cause of a specific cost variance"
  Explanation: "Option A (To determine the exact cause of a specific cost variance) represents a plausible misconception. Under Forecasting techniques, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-071 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To calculate the company's residual income"
  Explanation: "Option B (To calculate the company's residual income) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-071 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To set the transfer price between two divisions"
  Explanation: "Option D (To set the transfer price between two divisions) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-072 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To set the transfer price between two divisions"
  Explanation: "Option A (To set the transfer price between two divisions) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-072 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To calculate the company's residual income"
  Explanation: "Option B (To calculate the company's residual income) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-072 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To determine the exact cause of a specific cost variance"
  Explanation: "Option C (To determine the exact cause of a specific cost variance) represents a plausible misconception. Under Forecasting techniques, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-074 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To determine the exact cause of a specific cost variance"
  Explanation: "Option A (To determine the exact cause of a specific cost variance) represents a plausible misconception. Under Forecasting techniques, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-074 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To calculate the company's residual income"
  Explanation: "Option C (To calculate the company's residual income) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-074 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To set the transfer price between two divisions"
  Explanation: "Option D (To set the transfer price between two divisions) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To calculate the company's residual income"
  Explanation: "Option A (To calculate the company's residual income) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To determine the exact cause of a specific cost variance"
  Explanation: "Option B (To determine the exact cause of a specific cost variance) represents a plausible misconception. Under Forecasting techniques, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To set the transfer price between two divisions"
  Explanation: "Option D (To set the transfer price between two divisions) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-076 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To calculate the company's residual income"
  Explanation: "Option A (To calculate the company's residual income) represents a plausible misconception. Under Forecasting techniques, the correct analysis leads t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-076 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To set the transfer price between two divisions"
  Explanation: "Option B (To set the transfer price between two divisions) represents a plausible misconception. Under Forecasting techniques, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-076 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To determine the exact cause of a specific cost variance"
  Explanation: "Option C (To determine the exact cause of a specific cost variance) represents a plausible misconception. Under Forecasting techniques, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To assess the accuracy"

P1-BD-083 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Discontinue budgeting for the remainder of the year"
  Explanation: "Option A (Discontinue budgeting for the remainder of the year) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-083 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Ignore the change and hold managers accountable to the original budget without adjustment"
  Explanation: "Option B (Ignore the change and hold managers accountable to the original budget withou...) represents a plausible misconception. Under Budgeting conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-083 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Retroactively change all prior period financial statements"
  Explanation: "Option D (Retroactively change all prior period financial statements) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-084 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Discontinue budgeting for the remainder of the year"
  Explanation: "Option A (Discontinue budgeting for the remainder of the year) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-084 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Ignore the change and hold managers accountable to the original budget without adjustment"
  Explanation: "Option B (Ignore the change and hold managers accountable to the original budget withou...) represents a plausible misconception. Under Budgeting conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-084 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Retroactively change all prior period financial statements"
  Explanation: "Option C (Retroactively change all prior period financial statements) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-086 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Discontinue budgeting for the remainder of the year"
  Explanation: "Option A (Discontinue budgeting for the remainder of the year) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-086 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Retroactively change all prior period financial statements"
  Explanation: "Option C (Retroactively change all prior period financial statements) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-086 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Ignore the change and hold managers accountable to the original budget without adjustment"
  Explanation: "Option D (Ignore the change and hold managers accountable to the original budget withou...) represents a plausible misconception. Under Budgeting conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-087 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Retroactively change all prior period financial statements"
  Explanation: "Option A (Retroactively change all prior period financial statements) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-087 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Discontinue budgeting for the remainder of the year"
  Explanation: "Option B (Discontinue budgeting for the remainder of the year) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-087 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Ignore the change and hold managers accountable to the original budget without adjustment"
  Explanation: "Option D (Ignore the change and hold managers accountable to the original budget withou...) represents a plausible misconception. Under Budgeting conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-088 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Ignore the change and hold managers accountable to the original budget without adjustment"
  Explanation: "Option A (Ignore the change and hold managers accountable to the original budget withou...) represents a plausible misconception. Under Budgeting conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-088 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Retroactively change all prior period financial statements"
  Explanation: "Option B (Retroactively change all prior period financial statements) represents a plausible misconception. Under Budgeting concepts and methodologies..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-088 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Discontinue budgeting for the remainder of the year"
  Explanation: "Option C (Discontinue budgeting for the remainder of the year) represents a plausible misconception. Under Budgeting concepts and methodologies, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Update the budget or"

P1-BD-095 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Operating budgets are prepared only once every five years"
  Explanation: "Option A (Operating budgets are prepared only once every five years) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-095 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Strategic plans are prepared by external auditors only"
  Explanation: "Option B (Strategic plans are prepared by external auditors only) represents a plausible misconception. Under Financial statement ratio analysis, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-095 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "They cover the exact same time horizon and level of detail"
  Explanation: "Option D (They cover the exact same time horizon and level of detail) represents a plausible misconception. Under Financial statement ratio analysis, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-096 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Operating budgets are prepared only once every five years"
  Explanation: "Option A (Operating budgets are prepared only once every five years) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-096 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Strategic plans are prepared by external auditors only"
  Explanation: "Option B (Strategic plans are prepared by external auditors only) represents a plausible misconception. Under Financial statement ratio analysis, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-096 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "They cover the exact same time horizon and level of detail"
  Explanation: "Option C (They cover the exact same time horizon and level of detail) represents a plausible misconception. Under Financial statement ratio analysis, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-098 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Strategic plans are prepared by external auditors only"
  Explanation: "Option A (Strategic plans are prepared by external auditors only) represents a plausible misconception. Under Financial statement ratio analysis, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-098 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Operating budgets are prepared only once every five years"
  Explanation: "Option C (Operating budgets are prepared only once every five years) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-098 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "They cover the exact same time horizon and level of detail"
  Explanation: "Option D (They cover the exact same time horizon and level of detail) represents a plausible misconception. Under Financial statement ratio analysis, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-099 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "They cover the exact same time horizon and level of detail"
  Explanation: "Option A (They cover the exact same time horizon and level of detail) represents a plausible misconception. Under Financial statement ratio analysis, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-099 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Operating budgets are prepared only once every five years"
  Explanation: "Option B (Operating budgets are prepared only once every five years) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-099 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Strategic plans are prepared by external auditors only"
  Explanation: "Option D (Strategic plans are prepared by external auditors only) represents a plausible misconception. Under Financial statement ratio analysis, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-100 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Operating budgets are prepared only once every five years"
  Explanation: "Option A (Operating budgets are prepared only once every five years) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-100 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Strategic plans are prepared by external auditors only"
  Explanation: "Option B (Strategic plans are prepared by external auditors only) represents a plausible misconception. Under Financial statement ratio analysis, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-BD-100 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "They cover the exact same time horizon and level of detail"
  Explanation: "Option C (They cover the exact same time horizon and level of detail) represents a plausible misconception. Under Financial statement ratio analysis, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Strategic plans set broad"

P1-CD-001 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "1,800 Favorable"
  Explanation: "$2,000 Unfavorable results from using 2,000 standard hours instead of 2,100 actual hours in the rate variance formula. The rate variance uses actual h..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2100) not distractor numbers

P1-CD-001 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "100 Unfavorable"
  Explanation: "$2,100 Favorable confuses the sign. Since actual rate ($19) > standard rate ($18), the variance is unfavorable. A favorable variance occurs when actua..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (2100) not distractor numbers

P1-CD-008 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The difference between budgeted and actual sales revenue"
  Explanation: "Option A (The difference between budgeted and actual sales revenue) represents a plausible misconception. Under Variance analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-008 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The effect of operating at a different production volume than budgeted"
  Explanation: "Option B (The effect of operating at a different production volume than budgeted) represents a plausible misconception. Under Variance analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-008 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The difference caused solely by using more or fewer labor hours than standard"
  Explanation: "Option C (The difference caused solely by using more or fewer labor hours than standard) represents a plausible misconception. Under Variance analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-010 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The difference caused solely by using more or fewer labor hours than standard"
  Explanation: "Option A (The difference caused solely by using more or fewer labor hours than standard) represents a plausible misconception. Under Variance analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-010 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The effect of operating at a different production volume than budgeted"
  Explanation: "Option C (The effect of operating at a different production volume than budgeted) represents a plausible misconception. Under Variance analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-010 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The difference between budgeted and actual sales revenue"
  Explanation: "Option D (The difference between budgeted and actual sales revenue) represents a plausible misconception. Under Variance analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-011 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The difference between budgeted and actual sales revenue"
  Explanation: "Option A (The difference between budgeted and actual sales revenue) represents a plausible misconception. Under Variance analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-011 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The effect of operating at a different production volume than budgeted"
  Explanation: "Option B (The effect of operating at a different production volume than budgeted) represents a plausible misconception. Under Variance analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-011 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The difference caused solely by using more or fewer labor hours than standard"
  Explanation: "Option D (The difference caused solely by using more or fewer labor hours than standard) represents a plausible misconception. Under Variance analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-012 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The effect of operating at a different production volume than budgeted"
  Explanation: "Option A (The effect of operating at a different production volume than budgeted) represents a plausible misconception. Under Variance analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-012 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The difference caused solely by using more or fewer labor hours than standard"
  Explanation: "Option B (The difference caused solely by using more or fewer labor hours than standard) represents a plausible misconception. Under Variance analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-012 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The difference between budgeted and actual sales revenue"
  Explanation: "Option C (The difference between budgeted and actual sales revenue) represents a plausible misconception. Under Variance analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-014 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The effect of operating at a different production volume than budgeted"
  Explanation: "Option A (The effect of operating at a different production volume than budgeted) represents a plausible misconception. Under Variance analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-014 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The difference between budgeted and actual sales revenue"
  Explanation: "Option C (The difference between budgeted and actual sales revenue) represents a plausible misconception. Under Variance analysis, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-014 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The difference caused solely by using more or fewer labor hours than standard"
  Explanation: "Option D (The difference caused solely by using more or fewer labor hours than standard) represents a plausible misconception. Under Variance analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The difference between actual"

P1-CD-022 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option A (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-022 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option C (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-022 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option D (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-023 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option A (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-023 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option B (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-023 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option D (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-024 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option A (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-024 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option B (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-024 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option C (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-026 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option A (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-026 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option C (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-026 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option D (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-027 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option A (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-027 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option B (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-027 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option D (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-028 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A revenue center, evaluated only on sales dollars"
  Explanation: "Option A (A revenue center, evaluated only on sales dollars) represents a plausible misconception. Under Profit center management, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-028 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "An investment center, evaluated on ROI"
  Explanation: "Option B (An investment center, evaluated on ROI) represents a plausible misconception. Under Profit center management, the correct analysis leads to ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-028 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A cost center, evaluated only on cost variances"
  Explanation: "Option C (A cost center, evaluated only on cost variances) represents a plausible misconception. Under Profit center management, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "evaluated on operating income"

P1-CD-030 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for any transfer pricing policy"
  Explanation: "Option A (To eliminate the need for any transfer pricing policy) represents a plausible misconception. Under Transfer pricing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-030 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To always match the external market price exactly"
  Explanation: "Option C (To always match the external market price exactly) represents a plausible misconception. Under Transfer pricing, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-030 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To guarantee the selling division reports a loss every period"
  Explanation: "Option D (To guarantee the selling division reports a loss every period) represents a plausible misconception. Under Transfer pricing, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-031 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To guarantee the selling division reports a loss every period"
  Explanation: "Option A (To guarantee the selling division reports a loss every period) represents a plausible misconception. Under Transfer pricing, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-031 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To always match the external market price exactly"
  Explanation: "Option B (To always match the external market price exactly) represents a plausible misconception. Under Transfer pricing, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-031 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate the need for any transfer pricing policy"
  Explanation: "Option D (To eliminate the need for any transfer pricing policy) represents a plausible misconception. Under Transfer pricing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for any transfer pricing policy"
  Explanation: "Option A (To eliminate the need for any transfer pricing policy) represents a plausible misconception. Under Transfer pricing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To guarantee the selling division reports a loss every period"
  Explanation: "Option B (To guarantee the selling division reports a loss every period) represents a plausible misconception. Under Transfer pricing, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To always match the external market price exactly"
  Explanation: "Option C (To always match the external market price exactly) represents a plausible misconception. Under Transfer pricing, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-034 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To always match the external market price exactly"
  Explanation: "Option A (To always match the external market price exactly) represents a plausible misconception. Under Transfer pricing, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-034 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To eliminate the need for any transfer pricing policy"
  Explanation: "Option C (To eliminate the need for any transfer pricing policy) represents a plausible misconception. Under Transfer pricing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-034 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To guarantee the selling division reports a loss every period"
  Explanation: "Option D (To guarantee the selling division reports a loss every period) represents a plausible misconception. Under Transfer pricing, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-035 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To always match the external market price exactly"
  Explanation: "Option A (To always match the external market price exactly) represents a plausible misconception. Under Transfer pricing, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-035 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate the need for any transfer pricing policy"
  Explanation: "Option B (To eliminate the need for any transfer pricing policy) represents a plausible misconception. Under Transfer pricing, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-035 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To guarantee the selling division reports a loss every period"
  Explanation: "Option D (To guarantee the selling division reports a loss every period) represents a plausible misconception. Under Transfer pricing, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To encourage internal transfers"

P1-CD-036 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The sales manager, who controls sales volume"
  Explanation: "Option A (The sales manager, who controls sales volume) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-036 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The controller, who only prepares the financial statements"
  Explanation: "Option B (The controller, who only prepares the financial statements) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-036 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The purchasing manager, who controls the price paid for materials"
  Explanation: "Option C (The purchasing manager, who controls the price paid for materials) represents a plausible misconception. Under Variance analysis, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-038 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The sales manager, who controls sales volume"
  Explanation: "Option A (The sales manager, who controls sales volume) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-038 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The purchasing manager, who controls the price paid for materials"
  Explanation: "Option C (The purchasing manager, who controls the price paid for materials) represents a plausible misconception. Under Variance analysis, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-038 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The controller, who only prepares the financial statements"
  Explanation: "Option D (The controller, who only prepares the financial statements) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-039 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The purchasing manager, who controls the price paid for materials"
  Explanation: "Option A (The purchasing manager, who controls the price paid for materials) represents a plausible misconception. Under Variance analysis, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-039 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The controller, who only prepares the financial statements"
  Explanation: "Option B (The controller, who only prepares the financial statements) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-039 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The sales manager, who controls sales volume"
  Explanation: "Option D (The sales manager, who controls sales volume) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-040 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The controller, who only prepares the financial statements"
  Explanation: "Option A (The controller, who only prepares the financial statements) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-040 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The sales manager, who controls sales volume"
  Explanation: "Option B (The sales manager, who controls sales volume) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-040 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The purchasing manager, who controls the price paid for materials"
  Explanation: "Option C (The purchasing manager, who controls the price paid for materials) represents a plausible misconception. Under Variance analysis, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-042 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The purchasing manager, who controls the price paid for materials"
  Explanation: "Option A (The purchasing manager, who controls the price paid for materials) represents a plausible misconception. Under Variance analysis, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-042 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The sales manager, who controls sales volume"
  Explanation: "Option C (The sales manager, who controls sales volume) represents a plausible misconception. Under Variance analysis, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-042 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The controller, who only prepares the financial statements"
  Explanation: "Option D (The controller, who only prepares the financial statements) represents a plausible misconception. Under Variance analysis, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "who controls the efficient"

P1-CD-064 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The controllability principle"
  Explanation: "Option A (The controllability principle) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-064 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Goal congruence"
  Explanation: "Option B (Goal congruence) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-064 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-066 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The controllability principle"
  Explanation: "Option A (The controllability principle) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-066 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-066 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Goal congruence"
  Explanation: "Option D (Goal congruence) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-067 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Goal congruence"
  Explanation: "Option A (Goal congruence) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-067 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting"
  Explanation: "Option B (Zero-based budgeting) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-067 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The controllability principle"
  Explanation: "Option D (The controllability principle) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-068 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The controllability principle"
  Explanation: "Option A (The controllability principle) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-068 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Goal congruence"
  Explanation: "Option B (Goal congruence) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-068 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-070 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting"
  Explanation: "Option A (Zero-based budgeting) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-070 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Goal congruence"
  Explanation: "Option C (Goal congruence) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-070 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The controllability principle"
  Explanation: "Option D (The controllability principle) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Cost-benefit analysis in variance"

P1-CD-071 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Activity-based costing"
  Explanation: "Option A (Activity-based costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-071 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing"
  Explanation: "Option B (Standard costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that total qu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-071 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting"
  Explanation: "Option D (Zero-based budgeting) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that tota..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-072 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Standard costing"
  Explanation: "Option A (Standard costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that total qu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-072 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Activity-based costing"
  Explanation: "Option B (Activity-based costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-072 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Zero-based budgeting"
  Explanation: "Option C (Zero-based budgeting) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that tota..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-074 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Standard costing"
  Explanation: "Option A (Standard costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that total qu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-074 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Activity-based costing"
  Explanation: "Option C (Activity-based costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-074 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Zero-based budgeting"
  Explanation: "Option D (Zero-based budgeting) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that tota..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Activity-based costing"
  Explanation: "Option A (Activity-based costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Zero-based budgeting"
  Explanation: "Option B (Zero-based budgeting) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that tota..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Standard costing"
  Explanation: "Option D (Standard costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that total qu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-076 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Zero-based budgeting"
  Explanation: "Option A (Zero-based budgeting) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that tota..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-076 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Standard costing"
  Explanation: "Option B (Standard costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that total qu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-076 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Activity-based costing"
  Explanation: "Option C (Activity-based costing) represents a plausible misconception. Under Quality management, the correct analysis leads to the conclusion that to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Total quality management (TQM)"

P1-CD-078 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for a companywide income statement"
  Explanation: "Option A (To replace the need for a companywide income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-078 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To calculate consolidated net income directly"
  Explanation: "Option C (To calculate consolidated net income directly) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-078 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To determine the exact bonus payable to each division manager"
  Explanation: "Option D (To determine the exact bonus payable to each division manager) represents a plausible misconception. Under ASC 280 (Segment Reporting), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-079 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for a companywide income statement"
  Explanation: "Option A (To replace the need for a companywide income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-079 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To calculate consolidated net income directly"
  Explanation: "Option B (To calculate consolidated net income directly) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-079 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To determine the exact bonus payable to each division manager"
  Explanation: "Option D (To determine the exact bonus payable to each division manager) represents a plausible misconception. Under ASC 280 (Segment Reporting), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-080 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To calculate consolidated net income directly"
  Explanation: "Option A (To calculate consolidated net income directly) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-080 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To replace the need for a companywide income statement"
  Explanation: "Option B (To replace the need for a companywide income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-080 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To determine the exact bonus payable to each division manager"
  Explanation: "Option C (To determine the exact bonus payable to each division manager) represents a plausible misconception. Under ASC 280 (Segment Reporting), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-082 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To determine the exact bonus payable to each division manager"
  Explanation: "Option A (To determine the exact bonus payable to each division manager) represents a plausible misconception. Under ASC 280 (Segment Reporting), the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-082 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To calculate consolidated net income directly"
  Explanation: "Option C (To calculate consolidated net income directly) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-082 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for a companywide income statement"
  Explanation: "Option D (To replace the need for a companywide income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To evaluate the profitability"

P1-CD-083 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The material price variance and the material quantity variance"
  Explanation: "Option A (The material price variance and the material quantity variance) represents a plausible misconception. Under Variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice D "price variance and the"

P1-CD-083 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The fixed overhead budget variance and the fixed overhead volume variance"
  Explanation: "Option B (The fixed overhead budget variance and the fixed overhead volume variance) represents a plausible misconception. Under Variance analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"

P1-CD-083 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The sales price variance and the sales volume variance"
  Explanation: "Option D (The sales price variance and the sales volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice A "price variance and the"

P1-CD-084 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The sales price variance and the sales volume variance"
  Explanation: "Option A (The sales price variance and the sales volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice B "price variance and the"

P1-CD-084 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The material price variance and the material quantity variance"
  Explanation: "Option B (The material price variance and the material quantity variance) represents a plausible misconception. Under Variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice A "price variance and the"

P1-CD-084 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The fixed overhead budget variance and the fixed overhead volume variance"
  Explanation: "Option C (The fixed overhead budget variance and the fixed overhead volume variance) represents a plausible misconception. Under Variance analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"

P1-CD-086 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The sales price variance and the sales volume variance"
  Explanation: "Option A (The sales price variance and the sales volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice D "price variance and the"

P1-CD-086 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The fixed overhead budget variance and the fixed overhead volume variance"
  Explanation: "Option C (The fixed overhead budget variance and the fixed overhead volume variance) represents a plausible misconception. Under Variance analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"

P1-CD-086 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The material price variance and the material quantity variance"
  Explanation: "Option D (The material price variance and the material quantity variance) represents a plausible misconception. Under Variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice A "price variance and the"

P1-CD-087 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The fixed overhead budget variance and the fixed overhead volume variance"
  Explanation: "Option A (The fixed overhead budget variance and the fixed overhead volume variance) represents a plausible misconception. Under Variance analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"

P1-CD-087 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The sales price variance and the sales volume variance"
  Explanation: "Option B (The sales price variance and the sales volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice D "price variance and the"

P1-CD-087 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The material price variance and the material quantity variance"
  Explanation: "Option D (The material price variance and the material quantity variance) represents a plausible misconception. Under Variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice B "price variance and the"

P1-CD-088 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The fixed overhead budget variance and the fixed overhead volume variance"
  Explanation: "Option A (The fixed overhead budget variance and the fixed overhead volume variance) represents a plausible misconception. Under Variance analysis, th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"

P1-CD-088 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The sales price variance and the sales volume variance"
  Explanation: "Option B (The sales price variance and the sales volume variance) represents a plausible misconception. Under Variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice C "price variance and the"

P1-CD-088 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The material price variance and the material quantity variance"
  Explanation: "Option C (The material price variance and the material quantity variance) represents a plausible misconception. Under Variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The variable overhead spending"
    - VERBATIM_MATCH: explanation contains text from choice B "price variance and the"

P1-CD-095 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees each segment will be equally profitable"
  Explanation: "Option A (It guarantees each segment will be equally profitable) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-095 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for a consolidated income statement"
  Explanation: "Option B (It eliminates the need for a consolidated income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-095 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It replaces the need for any variance analysis internally"
  Explanation: "Option D (It replaces the need for any variance analysis internally) represents a plausible misconception. Under ASC 280 (Segment Reporting), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-096 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees each segment will be equally profitable"
  Explanation: "Option A (It guarantees each segment will be equally profitable) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-096 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It replaces the need for any variance analysis internally"
  Explanation: "Option B (It replaces the need for any variance analysis internally) represents a plausible misconception. Under ASC 280 (Segment Reporting), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-096 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It eliminates the need for a consolidated income statement"
  Explanation: "Option C (It eliminates the need for a consolidated income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-098 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for a consolidated income statement"
  Explanation: "Option A (It eliminates the need for a consolidated income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-098 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It replaces the need for any variance analysis internally"
  Explanation: "Option C (It replaces the need for any variance analysis internally) represents a plausible misconception. Under ASC 280 (Segment Reporting), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-098 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees each segment will be equally profitable"
  Explanation: "Option D (It guarantees each segment will be equally profitable) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-099 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees each segment will be equally profitable"
  Explanation: "Option A (It guarantees each segment will be equally profitable) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-099 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It replaces the need for any variance analysis internally"
  Explanation: "Option B (It replaces the need for any variance analysis internally) represents a plausible misconception. Under ASC 280 (Segment Reporting), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-099 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It eliminates the need for a consolidated income statement"
  Explanation: "Option D (It eliminates the need for a consolidated income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-100 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It guarantees each segment will be equally profitable"
  Explanation: "Option A (It guarantees each segment will be equally profitable) represents a plausible misconception. Under ASC 280 (Segment Reporting), the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-100 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It eliminates the need for a consolidated income statement"
  Explanation: "Option B (It eliminates the need for a consolidated income statement) represents a plausible misconception. Under ASC 280 (Segment Reporting), the cor..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-CD-100 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It replaces the need for any variance analysis internally"
  Explanation: "Option C (It replaces the need for any variance analysis internally) represents a plausible misconception. Under ASC 280 (Segment Reporting), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It provides insight into"

P1-DD-006 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It transfers beginning inventory directly to cost of goods sold without recalculation"
  Explanation: "Option A (It transfers beginning inventory directly to cost of goods sold without recal...) represents a plausible misconception. Under Equivalent uni..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice C "beginning work in process"
    - VERBATIM_MATCH: explanation contains text from choice D "beginning work in process"

P1-DD-006 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It ignores beginning work in process entirely"
  Explanation: "Option C (It ignores beginning work in process entirely) represents a plausible misconception. Under Equivalent units of production, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice D "beginning work in process"

P1-DD-006 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It combines beginning work in process costs with current period costs into one average"
  Explanation: "Option D (It combines beginning work in process costs with current period costs into on...) represents a plausible misconception. Under Equivalent uni..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice C "beginning work in process"

P1-DD-007 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It combines beginning work in process costs with current period costs into one average"
  Explanation: "Option A (It combines beginning work in process costs with current period costs into on...) represents a plausible misconception. Under Equivalent uni..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice D "beginning work in process"

P1-DD-007 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It transfers beginning inventory directly to cost of goods sold without recalculation"
  Explanation: "Option B (It transfers beginning inventory directly to cost of goods sold without recal...) represents a plausible misconception. Under Equivalent uni..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice A "beginning work in process"
    - VERBATIM_MATCH: explanation contains text from choice D "beginning work in process"

P1-DD-007 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It ignores beginning work in process entirely"
  Explanation: "Option D (It ignores beginning work in process entirely) represents a plausible misconception. Under Equivalent units of production, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It keeps beginning work"
    - VERBATIM_MATCH: explanation contains text from choice A "beginning work in process"

P1-DD-008 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It ignores beginning work in process entirely"
  Explanation: "FIFO does not ignore beginning work in process; it separates prior-period costs from current-period costs."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "beginning work in process"
    - VERBATIM_MATCH: explanation contains text from choice B "beginning work in process"

P1-DD-008 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It keeps beginning work in process costs separate from current period costs when computing cost per equivalent unit"
  Explanation: "FIFO process costing separates beginning work in process costs from current-period costs. Equivalent-unit cost under FIFO is based on current-period c..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "beginning work in process"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "beginning work in process"

P1-DD-010 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It keeps beginning work in process costs separate from current period costs when computing cost per equivalent unit"
  Explanation: "Under FIFO process costing, beginning work in process is treated as work started in a prior period, so its prior costs stay separate from current-peri..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "beginning work in process"
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "beginning work in process"

P1-DD-011 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recorded as additional revenue for the period"
  Explanation: "Option A (Recorded as additional revenue for the period) represents a plausible misconception. Under Overhead variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-011 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Prorated only to raw materials inventory"
  Explanation: "Option B (Prorated only to raw materials inventory) represents a plausible misconception. Under Overhead variance analysis, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-011 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Left on the balance sheet indefinitely as a liability"
  Explanation: "Option D (Left on the balance sheet indefinitely as a liability) represents a plausible misconception. Under Overhead variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-012 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Left on the balance sheet indefinitely as a liability"
  Explanation: "Option A (Left on the balance sheet indefinitely as a liability) represents a plausible misconception. Under Overhead variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-012 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Prorated only to raw materials inventory"
  Explanation: "Option B (Prorated only to raw materials inventory) represents a plausible misconception. Under Overhead variance analysis, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-012 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Recorded as additional revenue for the period"
  Explanation: "Option C (Recorded as additional revenue for the period) represents a plausible misconception. Under Overhead variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-014 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Prorated only to raw materials inventory"
  Explanation: "Option A (Prorated only to raw materials inventory) represents a plausible misconception. Under Overhead variance analysis, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-014 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Recorded as additional revenue for the period"
  Explanation: "Option C (Recorded as additional revenue for the period) represents a plausible misconception. Under Overhead variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-014 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Left on the balance sheet indefinitely as a liability"
  Explanation: "Option D (Left on the balance sheet indefinitely as a liability) represents a plausible misconception. Under Overhead variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-015 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Recorded as additional revenue for the period"
  Explanation: "Option A (Recorded as additional revenue for the period) represents a plausible misconception. Under Overhead variance analysis, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-015 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Prorated only to raw materials inventory"
  Explanation: "Option B (Prorated only to raw materials inventory) represents a plausible misconception. Under Overhead variance analysis, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-015 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Left on the balance sheet indefinitely as a liability"
  Explanation: "Option D (Left on the balance sheet indefinitely as a liability) represents a plausible misconception. Under Overhead variance analysis, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Closed to cost of"

P1-DD-016 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It only allocates costs to other service departments, never to production"
  Explanation: "Option A (It only allocates costs to other service departments, never to production) represents a plausible misconception. Under CMA Part 1 accounting..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allocates costs sequentially"

P1-DD-016 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It allocates costs of all service departments simultaneously using equations"
  Explanation: "Option B (It allocates costs of all service departments simultaneously using equations) represents a plausible misconception. Under CMA Part 1 account..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allocates costs sequentially"

P1-DD-016 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It ignores all services provided between service departments"
  Explanation: "Option C (It ignores all services provided between service departments) represents a plausible misconception. Under CMA Part 1 accounting principles, ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "It allocates costs sequentially"

P1-DD-016 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It allocates costs sequentially, recognizing some but not all reciprocal services between service departments"
  Explanation: "The step-down method allocates service department costs in sequence, recognizing services provided to other service departments only partially, unlike..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice A "to other service departments"

P1-DD-019 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It ignores all services provided between service departments"
  Explanation: "Ignoring all service-department support to other service departments describes the direct method."
  Flags:
    - VERBATIM_MATCH: explanation contains text from choice A "to other service departments"

P1-DD-022 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "$20,000"
  Explanation: "this may come from computing $120,000 / 2,400 = $50, then multiplying by 400 (an incorrect order count). The correct assignment uses Product A's actua..."
  Flags:
    - NUMERIC_MISMATCH: explanation uses correct-answer numbers (30000) not distractor numbers

P1-DD-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "No effect on operating leverage since it depends only on sales price"
  Explanation: "Option A (No effect on operating leverage since it depends only on sales price) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"
    - VERBATIM_MATCH: explanation contains text from choice C "degree of operating leverage"

P1-DD-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A guarantee that the company will always be profitable"
  Explanation: "Option B (A guarantee that the company will always be profitable) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"
    - VERBATIM_MATCH: explanation contains text from choice C "degree of operating leverage"

P1-DD-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A lower degree of operating leverage with less sensitivity to volume changes"
  Explanation: "Option C (A lower degree of operating leverage with less sensitivity to volume changes) represents a plausible misconception. Under CMA Part 1 account..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"

P1-DD-032 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A higher degree of operating leverage, meaning profit is more sensitive to changes in sales volume"
  Explanation: "A cost structure weighted toward fixed costs produces a higher degree of operating leverage, meaning operating income is more sensitive to changes in ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "degree of operating leverage"

P1-DD-033 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A higher degree of operating leverage, meaning profit is more sensitive to changes in sales volume"
  Explanation: "Degree of operating leverage increases when fixed costs make up a larger share of the cost structure. With high fixed costs, a change in sales volume ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice D "degree of operating leverage"

P1-DD-035 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A guarantee that the company will always be profitable"
  Explanation: "Option A (A guarantee that the company will always be profitable) represents a plausible misconception. Under CMA Part 1 accounting principles, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"
    - VERBATIM_MATCH: explanation contains text from choice B "degree of operating leverage"

P1-DD-035 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A lower degree of operating leverage with less sensitivity to volume changes"
  Explanation: "Option B (A lower degree of operating leverage with less sensitivity to volume changes) represents a plausible misconception. Under CMA Part 1 account..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"

P1-DD-035 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "No effect on operating leverage since it depends only on sales price"
  Explanation: "Option D (No effect on operating leverage since it depends only on sales price) represents a plausible misconception. Under CMA Part 1 accounting prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A higher degree of"
    - VERBATIM_MATCH: explanation contains text from choice B "degree of operating leverage"

P1-DD-035 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A higher degree of operating leverage, meaning profit is more sensitive to changes in sales volume"
  Explanation: "A cost structure weighted toward fixed costs produces a higher degree of operating leverage, meaning operating income is more sensitive to changes in ..."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice B "degree of operating leverage"

P1-DD-042 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A pure variable cost"
  Explanation: "Option A (A pure variable cost) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-042 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A step cost only"
  Explanation: "Option C (A step cost only) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that a mi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-042 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A pure fixed cost"
  Explanation: "Option D (A pure fixed cost) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that a m..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-043 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A pure variable cost"
  Explanation: "Option A (A pure variable cost) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-043 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A step cost only"
  Explanation: "Option B (A step cost only) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that a mi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-043 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A pure fixed cost"
  Explanation: "Option D (A pure fixed cost) represents a plausible misconception. Under Cost behavior analysis, the correct analysis leads to the conclusion that a m..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A mixed (semivariable) cost"

P1-DD-062 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Identical fixed costs for both products individually"
  Explanation: "Option A (Identical fixed costs for both products individually) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-062 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Equal selling prices for both products"
  Explanation: "Option C (Equal selling prices for both products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-062 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Zero variable costs for one of the products"
  Explanation: "Option D (Zero variable costs for one of the products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-063 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Identical fixed costs for both products individually"
  Explanation: "Option A (Identical fixed costs for both products individually) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-063 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Zero variable costs for one of the products"
  Explanation: "Option B (Zero variable costs for one of the products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-063 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Equal selling prices for both products"
  Explanation: "Option D (Equal selling prices for both products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-064 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Identical fixed costs for both products individually"
  Explanation: "Option A (Identical fixed costs for both products individually) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-064 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Zero variable costs for one of the products"
  Explanation: "Option B (Zero variable costs for one of the products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-064 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Equal selling prices for both products"
  Explanation: "Option C (Equal selling prices for both products) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A constant sales mix"

P1-DD-071 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Deferred and recognized over the equipment's remaining useful life"
  Explanation: "Option A (Deferred and recognized over the equipment's remaining useful life) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-071 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Capitalized as part of the equipment's asset cost"
  Explanation: "Option B (Capitalized as part of the equipment's asset cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-071 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Absorbed into the cost of good units produced as normal spoilage"
  Explanation: "Option D (Absorbed into the cost of good units produced as normal spoilage) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-072 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Absorbed into the cost of good units produced as normal spoilage"
  Explanation: "Option A (Absorbed into the cost of good units produced as normal spoilage) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-072 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Capitalized as part of the equipment's asset cost"
  Explanation: "Option B (Capitalized as part of the equipment's asset cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-072 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Deferred and recognized over the equipment's remaining useful life"
  Explanation: "Option C (Deferred and recognized over the equipment's remaining useful life) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-074 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Deferred and recognized over the equipment's remaining useful life"
  Explanation: "Option A (Deferred and recognized over the equipment's remaining useful life) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-074 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Capitalized as part of the equipment's asset cost"
  Explanation: "Option C (Capitalized as part of the equipment's asset cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-074 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Absorbed into the cost of good units produced as normal spoilage"
  Explanation: "Option D (Absorbed into the cost of good units produced as normal spoilage) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Absorbed into the cost of good units produced as normal spoilage"
  Explanation: "Option A (Absorbed into the cost of good units produced as normal spoilage) represents a plausible misconception. Under CMA Part 1 accounting principl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Deferred and recognized over the equipment's remaining useful life"
  Explanation: "Option B (Deferred and recognized over the equipment's remaining useful life) represents a plausible misconception. Under CMA Part 1 accounting princi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-DD-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Capitalized as part of the equipment's asset cost"
  Explanation: "Option D (Capitalized as part of the equipment's asset cost) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "As a separate loss"

P1-ED-002 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The COSO ERM cube alone"
  Explanation: "Option A (The COSO ERM cube alone) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-002 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The fraud triangle"
  Explanation: "Option C (The fraud triangle) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-002 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The balanced scorecard"
  Explanation: "Option D (The balanced scorecard) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-003 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The fraud triangle"
  Explanation: "Option A (The fraud triangle) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-003 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The balanced scorecard"
  Explanation: "Option B (The balanced scorecard) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-003 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The COSO ERM cube alone"
  Explanation: "Option D (The COSO ERM cube alone) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-004 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The balanced scorecard"
  Explanation: "Option A (The balanced scorecard) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-004 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The COSO ERM cube alone"
  Explanation: "Option B (The COSO ERM cube alone) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the con..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-004 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The fraud triangle"
  Explanation: "Option C (The fraud triangle) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The three lines of"

P1-ED-006 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk transfer"
  Explanation: "Option A (Risk transfer) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the principle ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-006 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Management override"
  Explanation: "Option C (Management override) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-006 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The principle of maximum access for efficiency"
  Explanation: "Option D (The principle of maximum access for efficiency) represents a plausible misconception. Under Access controls, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-007 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk transfer"
  Explanation: "Option A (Risk transfer) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the principle ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-007 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The principle of maximum access for efficiency"
  Explanation: "Option B (The principle of maximum access for efficiency) represents a plausible misconception. Under Access controls, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-007 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Management override"
  Explanation: "Option D (Management override) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-008 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The principle of maximum access for efficiency"
  Explanation: "Option A (The principle of maximum access for efficiency) represents a plausible misconception. Under Access controls, the correct analysis leads to t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-008 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Risk transfer"
  Explanation: "Option B (Risk transfer) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the principle ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-008 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Management override"
  Explanation: "Option C (Management override) represents a plausible misconception. Under Access controls, the correct analysis leads to the conclusion that the prin..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The principle of least"

P1-ED-011 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A physical control over inventory storage only"
  Explanation: "Option A (A physical control over inventory storage only) represents a plausible misconception. Under COSO control activities, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-011 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Segregation of duties, since only one person performs the recount"
  Explanation: "Option B (Segregation of duties, since only one person performs the recount) represents a plausible misconception. Under COSO control activities, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-011 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A preventive control that stops errors before they occur"
  Explanation: "Option D (A preventive control that stops errors before they occur) represents a plausible misconception. Under COSO control activities, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-012 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A preventive control that stops errors before they occur"
  Explanation: "Option A (A preventive control that stops errors before they occur) represents a plausible misconception. Under COSO control activities, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-012 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A physical control over inventory storage only"
  Explanation: "Option B (A physical control over inventory storage only) represents a plausible misconception. Under COSO control activities, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-012 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Segregation of duties, since only one person performs the recount"
  Explanation: "Option C (Segregation of duties, since only one person performs the recount) represents a plausible misconception. Under COSO control activities, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-015 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A preventive control that stops errors before they occur"
  Explanation: "Option A (A preventive control that stops errors before they occur) represents a plausible misconception. Under COSO control activities, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-015 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A physical control over inventory storage only"
  Explanation: "Option B (A physical control over inventory storage only) represents a plausible misconception. Under COSO control activities, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-015 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Segregation of duties, since only one person performs the recount"
  Explanation: "Option D (Segregation of duties, since only one person performs the recount) represents a plausible misconception. Under COSO control activities, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "checking the accuracy of"

P1-ED-016 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk appetite, defining the amount of risk tolerated"
  Explanation: "Option A (Risk appetite, defining the amount of risk tolerated) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-016 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Risk avoidance, eliminating the risk entirely"
  Explanation: "Option B (Risk avoidance, eliminating the risk entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-016 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Risk acceptance, taking no action"
  Explanation: "Option C (Risk acceptance, taking no action) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-018 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk acceptance, taking no action"
  Explanation: "Option A (Risk acceptance, taking no action) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-018 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Risk appetite, defining the amount of risk tolerated"
  Explanation: "Option C (Risk appetite, defining the amount of risk tolerated) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-018 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Risk avoidance, eliminating the risk entirely"
  Explanation: "Option D (Risk avoidance, eliminating the risk entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-019 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk acceptance, taking no action"
  Explanation: "Option A (Risk acceptance, taking no action) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-019 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Risk appetite, defining the amount of risk tolerated"
  Explanation: "Option B (Risk appetite, defining the amount of risk tolerated) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-019 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Risk avoidance, eliminating the risk entirely"
  Explanation: "Option D (Risk avoidance, eliminating the risk entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-020 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk avoidance, eliminating the risk entirely"
  Explanation: "Option A (Risk avoidance, eliminating the risk entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-020 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Risk appetite, defining the amount of risk tolerated"
  Explanation: "Option B (Risk appetite, defining the amount of risk tolerated) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-020 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Risk acceptance, taking no action"
  Explanation: "Option C (Risk acceptance, taking no action) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "shifting some financial impact"

P1-ED-031 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Segregation of duties within the IT department"
  Explanation: "Option A (Segregation of duties within the IT department) represents a plausible misconception. Under Disaster recovery and business continuity, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-031 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Authorization controls over transaction approval"
  Explanation: "Option B (Authorization controls over transaction approval) represents a plausible misconception. Under Disaster recovery and business continuity, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-031 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Confidentiality of customer data only"
  Explanation: "Option D (Confidentiality of customer data only) represents a plausible misconception. Under Disaster recovery and business continuity, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Confidentiality of customer data only"
  Explanation: "Option A (Confidentiality of customer data only) represents a plausible misconception. Under Disaster recovery and business continuity, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Segregation of duties within the IT department"
  Explanation: "Option B (Segregation of duties within the IT department) represents a plausible misconception. Under Disaster recovery and business continuity, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Authorization controls over transaction approval"
  Explanation: "Option C (Authorization controls over transaction approval) represents a plausible misconception. Under Disaster recovery and business continuity, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-034 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Confidentiality of customer data only"
  Explanation: "Option A (Confidentiality of customer data only) represents a plausible misconception. Under Disaster recovery and business continuity, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-034 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Authorization controls over transaction approval"
  Explanation: "Option C (Authorization controls over transaction approval) represents a plausible misconception. Under Disaster recovery and business continuity, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-034 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Segregation of duties within the IT department"
  Explanation: "Option D (Segregation of duties within the IT department) represents a plausible misconception. Under Disaster recovery and business continuity, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Availability of information systems"

P1-ED-036 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A segregation of duties control unrelated to IT"
  Explanation: "Option A (A segregation of duties control unrelated to IT) represents a plausible misconception. Under Change management controls, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-036 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "An application control embedded in a specific transaction"
  Explanation: "Option B (An application control embedded in a specific transaction) represents a plausible misconception. Under Change management controls, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-036 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A physical control over hardware only"
  Explanation: "Option C (A physical control over hardware only) represents a plausible misconception. Under Change management controls, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-038 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "An application control embedded in a specific transaction"
  Explanation: "Option A (An application control embedded in a specific transaction) represents a plausible misconception. Under Change management controls, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-038 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A physical control over hardware only"
  Explanation: "Option C (A physical control over hardware only) represents a plausible misconception. Under Change management controls, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-038 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A segregation of duties control unrelated to IT"
  Explanation: "Option D (A segregation of duties control unrelated to IT) represents a plausible misconception. Under Change management controls, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-039 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A segregation of duties control unrelated to IT"
  Explanation: "Option A (A segregation of duties control unrelated to IT) represents a plausible misconception. Under Change management controls, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-039 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "An application control embedded in a specific transaction"
  Explanation: "Option B (An application control embedded in a specific transaction) represents a plausible misconception. Under Change management controls, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-039 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A physical control over hardware only"
  Explanation: "Option D (A physical control over hardware only) represents a plausible misconception. Under Change management controls, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-040 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "An application control embedded in a specific transaction"
  Explanation: "Option A (An application control embedded in a specific transaction) represents a plausible misconception. Under Change management controls, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-040 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A segregation of duties control unrelated to IT"
  Explanation: "Option B (A segregation of duties control unrelated to IT) represents a plausible misconception. Under Change management controls, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-040 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A physical control over hardware only"
  Explanation: "Option C (A physical control over hardware only) represents a plausible misconception. Under Change management controls, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "An IT general control"

P1-ED-043 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Monitoring, which evaluates control effectiveness over time"
  Explanation: "Option A (Monitoring, which evaluates control effectiveness over time) represents a plausible misconception. Under COSO risk assessment component, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-043 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Control activities, which are the specific policies implemented"
  Explanation: "Option B (Control activities, which are the specific policies implemented) represents a plausible misconception. Under COSO risk assessment component,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-043 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Risk transfer, which shifts risk to third parties"
  Explanation: "Option D (Risk transfer, which shifts risk to third parties) represents a plausible misconception. Under COSO risk assessment component, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-044 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk transfer, which shifts risk to third parties"
  Explanation: "Option A (Risk transfer, which shifts risk to third parties) represents a plausible misconception. Under COSO risk assessment component, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-044 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Control activities, which are the specific policies implemented"
  Explanation: "Option B (Control activities, which are the specific policies implemented) represents a plausible misconception. Under COSO risk assessment component,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-044 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Monitoring, which evaluates control effectiveness over time"
  Explanation: "Option C (Monitoring, which evaluates control effectiveness over time) represents a plausible misconception. Under COSO risk assessment component, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "prioritizing risks based on"

P1-ED-046 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Information and communication, limited to external reporting only"
  Explanation: "Option A (Information and communication, limited to external reporting only) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-046 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Risk assessment, since it identifies specific financial risks"
  Explanation: "Option C (Risk assessment, since it identifies specific financial risks) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-046 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Monitoring activities, since it evaluates control effectiveness"
  Explanation: "Option D (Monitoring activities, since it evaluates control effectiveness) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-047 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Monitoring activities, since it evaluates control effectiveness"
  Explanation: "Option A (Monitoring activities, since it evaluates control effectiveness) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-047 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Information and communication, limited to external reporting only"
  Explanation: "Option B (Information and communication, limited to external reporting only) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-047 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Risk assessment, since it identifies specific financial risks"
  Explanation: "Option D (Risk assessment, since it identifies specific financial risks) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-048 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Information and communication, limited to external reporting only"
  Explanation: "Option A (Information and communication, limited to external reporting only) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-048 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Monitoring activities, since it evaluates control effectiveness"
  Explanation: "Option B (Monitoring activities, since it evaluates control effectiveness) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-048 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Risk assessment, since it identifies specific financial risks"
  Explanation: "Option C (Risk assessment, since it identifies specific financial risks) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-050 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Risk assessment, since it identifies specific financial risks"
  Explanation: "Option A (Risk assessment, since it identifies specific financial risks) represents a plausible misconception. Under CMA Part 1 accounting principles,..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-050 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Information and communication, limited to external reporting only"
  Explanation: "Option C (Information and communication, limited to external reporting only) represents a plausible misconception. Under CMA Part 1 accounting princip..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-050 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Monitoring activities, since it evaluates control effectiveness"
  Explanation: "Option D (Monitoring activities, since it evaluates control effectiveness) represents a plausible misconception. Under CMA Part 1 accounting principle..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by reinforcing the organization's"

P1-ED-051 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for segregation of duties"
  Explanation: "Option A (To replace the need for segregation of duties) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-051 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To ensure compliance with balanced scorecard metrics"
  Explanation: "Option B (To ensure compliance with balanced scorecard metrics) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-051 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate the need for any other IT general controls"
  Explanation: "Option D (To eliminate the need for any other IT general controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-052 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To ensure compliance with balanced scorecard metrics"
  Explanation: "Option A (To ensure compliance with balanced scorecard metrics) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-052 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To replace the need for segregation of duties"
  Explanation: "Option B (To replace the need for segregation of duties) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-052 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To eliminate the need for any other IT general controls"
  Explanation: "Option C (To eliminate the need for any other IT general controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-054 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for segregation of duties"
  Explanation: "Option A (To replace the need for segregation of duties) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-054 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To ensure compliance with balanced scorecard metrics"
  Explanation: "Option C (To ensure compliance with balanced scorecard metrics) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-054 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To eliminate the need for any other IT general controls"
  Explanation: "Option D (To eliminate the need for any other IT general controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-055 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To ensure compliance with balanced scorecard metrics"
  Explanation: "Option A (To ensure compliance with balanced scorecard metrics) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-055 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate the need for any other IT general controls"
  Explanation: "Option B (To eliminate the need for any other IT general controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-055 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for segregation of duties"
  Explanation: "Option D (To replace the need for segregation of duties) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To reduce the risk"

P1-ED-056 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Management override of existing controls"
  Explanation: "Option A (Management override of existing controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-056 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A segregation of duties failure"
  Explanation: "Option B (A segregation of duties failure) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-056 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A control environment weakness"
  Explanation: "Option C (A control environment weakness) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-059 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A segregation of duties failure"
  Explanation: "Option A (A segregation of duties failure) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-059 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A control environment weakness"
  Explanation: "Option B (A control environment weakness) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-059 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Management override of existing controls"
  Explanation: "Option D (Management override of existing controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-060 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A control environment weakness"
  Explanation: "Option A (A control environment weakness) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-060 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A segregation of duties failure"
  Explanation: "Option B (A segregation of duties failure) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to th..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-060 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Management override of existing controls"
  Explanation: "Option C (Management override of existing controls) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The inherent cost-benefit limitation"

P1-ED-062 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of incorrect revenue recognition timing"
  Explanation: "Option A (The risk of incorrect revenue recognition timing) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-062 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The risk of inventory obsolescence"
  Explanation: "Option C (The risk of inventory obsolescence) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-062 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option D (The risk of foreign currency translation errors) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-063 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of inventory obsolescence"
  Explanation: "Option A (The risk of inventory obsolescence) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-063 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option B (The risk of foreign currency translation errors) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-063 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The risk of incorrect revenue recognition timing"
  Explanation: "Option D (The risk of incorrect revenue recognition timing) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of fictitious"

P1-ED-067 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To prepare the company's financial statements directly"
  Explanation: "Option A (To prepare the company's financial statements directly) represents a plausible misconception. Under Audit committee responsibilities, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-067 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To set employee compensation for all departments"
  Explanation: "Option B (To set employee compensation for all departments) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-067 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for external audits entirely"
  Explanation: "Option D (To replace the need for external audits entirely) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-068 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for external audits entirely"
  Explanation: "Option A (To replace the need for external audits entirely) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-068 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To set employee compensation for all departments"
  Explanation: "Option B (To set employee compensation for all departments) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-068 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To prepare the company's financial statements directly"
  Explanation: "Option C (To prepare the company's financial statements directly) represents a plausible misconception. Under Audit committee responsibilities, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-070 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To set employee compensation for all departments"
  Explanation: "Option A (To set employee compensation for all departments) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-070 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To replace the need for external audits entirely"
  Explanation: "Option C (To replace the need for external audits entirely) represents a plausible misconception. Under Audit committee responsibilities, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-070 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To prepare the company's financial statements directly"
  Explanation: "Option D (To prepare the company's financial statements directly) represents a plausible misconception. Under Audit committee responsibilities, the co..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To provide independent oversight"

P1-ED-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A reduction in accounts payable turnover ratio"
  Explanation: "Option A (A reduction in accounts payable turnover ratio) represents a plausible misconception. Under Reconciliation controls, the correct analysis le..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Errors or fraud in"

P1-ED-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A violation of revenue recognition timing rules"
  Explanation: "Option B (A violation of revenue recognition timing rules) represents a plausible misconception. Under Reconciliation controls, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Errors or fraud in"

P1-ED-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "An increase in cash discounts taken on early payments"
  Explanation: "Option D (An increase in cash discounts taken on early payments) represents a plausible misconception. Under Reconciliation controls, the correct anal..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Errors or fraud in"

P1-FD-003 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any data security controls"
  Explanation: "Option A (It eliminates the need for any data security controls) represents a plausible misconception. Under Financial statement ratio analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-003 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It replaces the need for a chart of accounts"
  Explanation: "Option B (It replaces the need for a chart of accounts) represents a plausible misconception. Under Financial statement ratio analysis, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-003 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "It guarantees the data will always be completely accurate"
  Explanation: "Option D (It guarantees the data will always be completely accurate) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-004 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "It eliminates the need for any data security controls"
  Explanation: "Option A (It eliminates the need for any data security controls) represents a plausible misconception. Under Financial statement ratio analysis, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-004 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "It replaces the need for a chart of accounts"
  Explanation: "Option B (It replaces the need for a chart of accounts) represents a plausible misconception. Under Financial statement ratio analysis, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-004 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "It guarantees the data will always be completely accurate"
  Explanation: "Option C (It guarantees the data will always be completely accurate) represents a plausible misconception. Under Financial statement ratio analysis, t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "real-time data exchange between"

P1-FD-015 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Data governance, by defining data ownership"
  Explanation: "Option A (Data governance, by defining data ownership) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analy..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by protecting data from"

P1-FD-015 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Segregation of duties within the finance department"
  Explanation: "Option B (Segregation of duties within the finance department) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by protecting data from"

P1-FD-015 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Availability, by ensuring systems remain accessible"
  Explanation: "Option D (Availability, by ensuring systems remain accessible) represents a plausible misconception. Under CMA Part 1 accounting principles, the corre..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "by protecting data from"

P1-FD-016 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Infrastructure as a Service (IaaS)"
  Explanation: "Option A (Infrastructure as a Service (IaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-016 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "On-premises licensed software"
  Explanation: "Option B (On-premises licensed software) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-016 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Platform as a Service (PaaS)"
  Explanation: "Option C (Platform as a Service (PaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-019 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Infrastructure as a Service (IaaS)"
  Explanation: "Option A (Infrastructure as a Service (IaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-019 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Platform as a Service (PaaS)"
  Explanation: "Option B (Platform as a Service (PaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-019 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "On-premises licensed software"
  Explanation: "Option D (On-premises licensed software) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-020 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Infrastructure as a Service (IaaS)"
  Explanation: "Option A (Infrastructure as a Service (IaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusio..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-020 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Platform as a Service (PaaS)"
  Explanation: "Option B (Platform as a Service (PaaS)) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion that..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-020 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "On-premises licensed software"
  Explanation: "Option C (On-premises licensed software) represents a plausible misconception. Under Cloud computing, the correct analysis leads to the conclusion tha..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Software as a Service"

P1-FD-022 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A data governance failure unrelated to model design"
  Explanation: "Option A (A data governance failure unrelated to model design) represents a plausible misconception. Under Electronic data interchange (EDI), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-022 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Underfitting, where the model is too simple to capture any pattern"
  Explanation: "Option C (Underfitting, where the model is too simple to capture any pattern) represents a plausible misconception. Under Electronic data interchange ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-022 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A data visualization design flaw"
  Explanation: "Option D (A data visualization design flaw) represents a plausible misconception. Under Electronic data interchange (EDI), the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-023 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A data governance failure unrelated to model design"
  Explanation: "Option A (A data governance failure unrelated to model design) represents a plausible misconception. Under Electronic data interchange (EDI), the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-023 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Underfitting, where the model is too simple to capture any pattern"
  Explanation: "Option B (Underfitting, where the model is too simple to capture any pattern) represents a plausible misconception. Under Electronic data interchange ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-023 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A data visualization design flaw"
  Explanation: "Option D (A data visualization design flaw) represents a plausible misconception. Under Electronic data interchange (EDI), the correct analysis leads ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "where the model has"

P1-FD-027 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A traditional relational database only"
  Explanation: "Option A (A traditional relational database only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-027 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Robotic process automation"
  Explanation: "Option B (Robotic process automation) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-027 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Blockchain"
  Explanation: "Option D (Blockchain) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-028 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A traditional relational database only"
  Explanation: "Option A (A traditional relational database only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-028 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Robotic process automation"
  Explanation: "Option B (Robotic process automation) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-028 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Blockchain"
  Explanation: "Option C (Blockchain) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-030 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Blockchain"
  Explanation: "Option A (Blockchain) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-030 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Robotic process automation"
  Explanation: "Option C (Robotic process automation) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-030 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A traditional relational database only"
  Explanation: "Option D (A traditional relational database only) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis l..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The Internet of Things"

P1-FD-032 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the possibility of any future breach"
  Explanation: "Option A (To eliminate the possibility of any future breach) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-032 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To satisfy only internal audit documentation requirements"
  Explanation: "Option B (To satisfy only internal audit documentation requirements) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-032 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To replace the need for preventive security controls"
  Explanation: "Option C (To replace the need for preventive security controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-035 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To replace the need for preventive security controls"
  Explanation: "Option A (To replace the need for preventive security controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the corr..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-035 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate the possibility of any future breach"
  Explanation: "Option B (To eliminate the possibility of any future breach) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-035 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To satisfy only internal audit documentation requirements"
  Explanation: "Option D (To satisfy only internal audit documentation requirements) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To enable a timely"

P1-FD-036 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Structured data, identical in format to database tables"
  Explanation: "Structured data fits predefined fields and tables; the stem asks about content that does not fit neatly into that format."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "does not fit neatly"

P1-FD-038 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Structured data, identical in format to database tables"
  Explanation: "Option A (Structured data, identical in format to database tables) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-038 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Metadata, which only describes other data"
  Explanation: "Option C (Metadata, which only describes other data) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-038 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "Master data, which represents core reference information"
  Explanation: "Option D (Master data, which represents core reference information) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-039 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Structured data, identical in format to database tables"
  Explanation: "Structured data fits into predefined rows and columns, as in relational database tables. The stem contrasts this category with database tables, so the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "into predefined rows and"

P1-FD-040 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Structured data, identical in format to database tables"
  Explanation: "Option A (Structured data, identical in format to database tables) represents a plausible misconception. Under CMA Part 1 accounting principles, the c..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-040 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "Metadata, which only describes other data"
  Explanation: "Option B (Metadata, which only describes other data) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysi..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-040 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Master data, which represents core reference information"
  Explanation: "Option C (Master data, which represents core reference information) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "which does not fit"

P1-FD-042 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "That the document complies with GAAP automatically"
  Explanation: "Option A (That the document complies with GAAP automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-042 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "That the document contains no calculation errors"
  Explanation: "Option C (That the document contains no calculation errors) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-042 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "That the sender has sufficient budget authority"
  Explanation: "Option D (That the sender has sufficient budget authority) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-044 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "That the document contains no calculation errors"
  Explanation: "Option A (That the document contains no calculation errors) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-044 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "That the sender has sufficient budget authority"
  Explanation: "Option B (That the sender has sufficient budget authority) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct a..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-044 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "That the document complies with GAAP automatically"
  Explanation: "Option C (That the document complies with GAAP automatically) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "That the document has"

P1-FD-051 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of insufficient office space for employees"
  Explanation: "Option A (The risk of insufficient office space for employees) represents a plausible misconception. Under Corporate governance, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-051 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option B (The risk of foreign currency translation errors) represents a plausible misconception. Under Corporate governance, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-051 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The risk of missing a sales forecast target"
  Explanation: "Option D (The risk of missing a sales forecast target) represents a plausible misconception. Under Corporate governance, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-052 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of insufficient office space for employees"
  Explanation: "Option A (The risk of insufficient office space for employees) represents a plausible misconception. Under Corporate governance, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-052 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The risk of missing a sales forecast target"
  Explanation: "Option B (The risk of missing a sales forecast target) represents a plausible misconception. Under Corporate governance, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-052 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option C (The risk of foreign currency translation errors) represents a plausible misconception. Under Corporate governance, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-054 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of missing a sales forecast target"
  Explanation: "Option A (The risk of missing a sales forecast target) represents a plausible misconception. Under Corporate governance, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-054 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option C (The risk of foreign currency translation errors) represents a plausible misconception. Under Corporate governance, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-054 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The risk of insufficient office space for employees"
  Explanation: "Option D (The risk of insufficient office space for employees) represents a plausible misconception. Under Corporate governance, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-055 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The risk of insufficient office space for employees"
  Explanation: "Option A (The risk of insufficient office space for employees) represents a plausible misconception. Under Corporate governance, the correct analysis ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-055 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The risk of foreign currency translation errors"
  Explanation: "Option B (The risk of foreign currency translation errors) represents a plausible misconception. Under Corporate governance, the correct analysis lead..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-055 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The risk of missing a sales forecast target"
  Explanation: "Option D (The risk of missing a sales forecast target) represents a plausible misconception. Under Corporate governance, the correct analysis leads to..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The risk of unmonitored"

P1-FD-056 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A static budget, used for planning"
  Explanation: "Option A (A static budget, used for planning) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-056 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The balanced scorecard, used for performance measurement"
  Explanation: "Option B (The balanced scorecard, used for performance measurement) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-056 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "Blockchain, used for distributed ledgers"
  Explanation: "Option C (Blockchain, used for distributed ledgers) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-059 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "Blockchain, used for distributed ledgers"
  Explanation: "Option A (Blockchain, used for distributed ledgers) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-059 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The balanced scorecard, used for performance measurement"
  Explanation: "Option B (The balanced scorecard, used for performance measurement) represents a plausible misconception. Under CMA Part 1 accounting principles, the ..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-059 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A static budget, used for planning"
  Explanation: "Option D (A static budget, used for planning) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Natural language processing /"

P1-FD-062 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The DuPont model"
  Explanation: "Option A (The DuPont model) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-062 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The COSO ERM cube exclusively"
  Explanation: "Option C (The COSO ERM cube exclusively) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-062 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The balanced scorecard"
  Explanation: "Option D (The balanced scorecard) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-063 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The COSO ERM cube exclusively"
  Explanation: "Option A (The COSO ERM cube exclusively) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-063 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The balanced scorecard"
  Explanation: "Option B (The balanced scorecard) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-063 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "The DuPont model"
  Explanation: "Option D (The DuPont model) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-064 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "The DuPont model"
  Explanation: "Option A (The DuPont model) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclusion t..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-064 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "The COSO ERM cube exclusively"
  Explanation: "Option B (The COSO ERM cube exclusively) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-064 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "The balanced scorecard"
  Explanation: "Option C (The balanced scorecard) represents a plausible misconception. Under COSO risk assessment component, the correct analysis leads to the conclu..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The NIST Cybersecurity Framework"

P1-FD-066 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A variance analysis of standard costs"
  Explanation: "Option A (A variance analysis of standard costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-066 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A cost of quality report"
  Explanation: "Option C (A cost of quality report) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-066 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A balanced scorecard customer perspective review"
  Explanation: "Option D (A balanced scorecard customer perspective review) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-067 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A variance analysis of standard costs"
  Explanation: "Option A (A variance analysis of standard costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-067 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A cost of quality report"
  Explanation: "Option B (A cost of quality report) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-067 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A balanced scorecard customer perspective review"
  Explanation: "Option D (A balanced scorecard customer perspective review) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-068 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A balanced scorecard customer perspective review"
  Explanation: "Option A (A balanced scorecard customer perspective review) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-068 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "A cost of quality report"
  Explanation: "Option B (A cost of quality report) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-068 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A variance analysis of standard costs"
  Explanation: "Option C (A variance analysis of standard costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-070 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "A cost of quality report"
  Explanation: "Option A (A cost of quality report) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads to the concl..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-070 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "A balanced scorecard customer perspective review"
  Explanation: "Option C (A balanced scorecard customer perspective review) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct ana..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-070 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "A variance analysis of standard costs"
  Explanation: "Option D (A variance analysis of standard costs) represents a plausible misconception. Under ASC 715 (Retirement Benefits), the correct analysis leads..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A cost-benefit (return on"

P1-FD-072 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for data governance entirely"
  Explanation: "Option A (To eliminate the need for data governance entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-072 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To ensure all data is kept permanently regardless of type"
  Explanation: "Option B (To ensure all data is kept permanently regardless of type) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-072 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To replace the need for cybersecurity controls"
  Explanation: "Option C (To replace the need for cybersecurity controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-074 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To eliminate the need for data governance entirely"
  Explanation: "Option A (To eliminate the need for data governance entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-074 (pack_d_corrected.js) slot ExplanationWrongC
  Choice: "To replace the need for cybersecurity controls"
  Explanation: "Option C (To replace the need for cybersecurity controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-074 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To ensure all data is kept permanently regardless of type"
  Explanation: "Option D (To ensure all data is kept permanently regardless of type) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-075 (pack_d_corrected.js) slot ExplanationWrongA
  Choice: "To ensure all data is kept permanently regardless of type"
  Explanation: "Option A (To ensure all data is kept permanently regardless of type) represents a plausible misconception. Under CMA Part 1 accounting principles, the..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-075 (pack_d_corrected.js) slot ExplanationWrongB
  Choice: "To eliminate the need for data governance entirely"
  Explanation: "Option B (To eliminate the need for data governance entirely) represents a plausible misconception. Under CMA Part 1 accounting principles, the correc..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

P1-FD-075 (pack_d_corrected.js) slot ExplanationWrongD
  Choice: "To replace the need for cybersecurity controls"
  Explanation: "Option D (To replace the need for cybersecurity controls) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct an..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "To comply with legal"

--- pack_e_corrected.js ΓÇö 75 findings ---

P1E-A-001 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "To show cash flows"
  Explanation: "The statement of cash flows shows cash inflows and outflows, not financial position at a point in time."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "financial position at a"

P1E-A-001 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "To show profitability over time"
  Explanation: "The income statement shows profitability over time, not financial position at a point in time."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "financial position at a"

P1E-A-004 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Cash is received"
  Explanation: "Cash receipt is not the trigger under accrual accounting; revenue is recognized when the performance obligation is satisfied."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Performance obligation is satisfied"

P1E-A-015 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Fair value with unrealized G/L in OCI"
  Explanation: "AFS debt securities are measured at fair value with unrealized gains and losses in OCI."
  Flags:
    - EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice C "Fair value with unrealized"

P1E-A-023 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Gross profit divided by common shares"
  Explanation: "Gross profit is not the numerator; net income minus preferred dividends is used."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Net income minus preferred"

P1E-A-023 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Net income divided by ending shares"
  Explanation: "Ending shares is not used; the weighted average common shares outstanding is the correct denominator."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "weighted average common shares"

P1E-A-023 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Operating income divided by total shares"
  Explanation: "Operating income is not used; net income minus preferred dividends is the correct numerator."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Net income minus preferred"

P1E-A-037 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "A write-off"
  Explanation: "A write-off is for uncollectible accounts; factoring is a sale of receivables."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A sale of receivables"

P1E-A-039 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Deferred and amortized separately"
  Explanation: "Bond issue costs are not deferred and amortized separately; they are deducted from the bond liability."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Deducted from the bond"

P1E-A-043 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "$100,000"
  Explanation: "$100,000 is the result of multiplying face value ($1,000,000) by the market rate (10%). While the market rate is correct, the effective interest metho..."
  Flags:
    - PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)

P1E-A-049 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Weighted average"
  Explanation: "Simple weighted average is not specified; the standard requires expected value or most likely amount."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Expected value or most"

P1E-A-051 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Cost of each obligation"
  Explanation: "Cost of each obligation is not the basis; allocation uses relative standalone selling prices."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Relative standalone selling prices"

P1E-A-069 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "A liability only"
  Explanation: "Loyalty points create deferred revenue as a liability, but they are also accounted for as a separate performance obligation requiring revenue allocati..."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "A separate performance obligation"

P1E-A-073 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Is amortized over 40 years"
  Explanation: "Under the equity method, goodwill embedded in the investment cost is not separately amortized over any period."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Is not separately amortized"

P1E-A-075 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Historical costs"
  Explanation: "Historical cost is a measurement basis, not a fair value input; Level 1 inputs are quoted prices in active markets for identical assets."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Quoted prices in active"

P1E-A-075 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Unobservable inputs"
  Explanation: "Unobservable inputs are classified as Level 3, not Level 1, which requires quoted prices in active markets."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Quoted prices in active"

P1E-A-077 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Contract is signed"
  Explanation: "Signing a contract establishes the arrangement but does not create a liability until consideration is received before performance."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "is received before performance"

P1E-B-005 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Neither fixed nor variable"
  Explanation: "Mixed costs must have both fixed and variable elements by definition."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Both fixed and variable"

P1E-B-042 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Is always fixed"
  Explanation: "A step cost is not always fixed; it changes at specific activity intervals."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Changes at specific activity"

P1E-B-054 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Only variable overhead"
  Explanation: "The overhead budget includes both variable and fixed components, not variable alone."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Both variable and fixed"

P1E-D-006 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Charged to overhead"
  Explanation: "Normal spoilage is included in product cost, not charged to manufacturing overhead."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "included in product cost"

P1E-D-018 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Can be eliminated"
  Explanation: "Value-added activities cannot be eliminated without reducing product value to customers."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "product value to customers"

P1E-D-030 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Order is below market"
  Explanation: "An order below market may still be profitable if incremental revenue exceeds incremental costs."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Incremental revenue exceeds incremental"

P1E-D-032 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Total sales"
  Explanation: "Total sales is not the focus; profitability per unit of constraint drives the decision."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "per unit of constraint"

P1E-E-007 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Monthly reports"
  Explanation: "Monthly reports support monitoring but are not the complete definition; monitoring encompasses both ongoing and separate evaluations."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Ongoing and separate evaluations"

P1E-E-028 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Growth"
  Explanation: "Growth is a business objective, not the commitment to integrity and ethical values required by COSO principle 1."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Integrity and ethical values"

P1E-E-030 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "External auditors assessing controls"
  Explanation: "External auditors provide independent assurance; CSA is performed by internal employees evaluating their own areas."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Employees evaluating their own"

P1E-F-012 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "External vendors only"
  Explanation: "ERP systems integrate all business processes across the enterprise, not just external vendor relationships."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "All business processes across"

P1E-F-024 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "US business data"
  Explanation: "GDPR is a European Union regulation; it governs personal data of EU citizens, not US business data."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Personal data of EU"

P1E-F-024 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Government data"
  Explanation: "GDPR protects personal data of EU individuals broadly; it does not specifically target government data."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Personal data of EU"

P1E-F-024 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Only financial data"
  Explanation: "GDPR covers all personal data of EU citizens, not only financial data; it includes names, addresses, and other identifiers."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Personal data of EU"

P1E-F-026 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Manual data entry"
  Explanation: "IoT generates data automatically from connected devices and sensors, not from manual data entry."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Connected devices and sensors"

P1E-F-032 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Financial statement preparation"
  Explanation: "IoT primarily impacts real-time data collection and monitoring of operational processes, not the preparation of financial statements."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Real-time data collection and"

P1E-F-035 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Only advertising metrics"
  Explanation: "Social media analytics provides customer sentiment and market insights, not just advertising performance metrics."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Customer sentiment and market"

P1E-B-078 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Time between budget reviews"
  Explanation: "The time between budget reviews is the review interval, not the time required to prepare the budget."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "to prepare the budget"

P1E-B-087 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Annually only"
  Explanation: "Rolling forecasts are updated each period by adding a new period, not just once per year."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Each period by adding"

P1E-D-039 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Net realizable value"
  Explanation: "The NRV method allocates joint costs based on final sales value less further processing costs, not sales value at split-off."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "sales value at split-off"

P1E-D-047 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Direct material costs"
  Explanation: "Transferred-in costs include all costs from prior departments, not just direct materials."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Costs from prior departments"

P1E-D-053 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Budgeted costs"
  Explanation: "Normal costing uses actual materials and labor, not budgeted amounts for direct costs."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Actual materials and labor"

P1E-D-054 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Actual costs for all inputs"
  Explanation: "Standard costing uses predetermined standard costs for all inputs, not actual costs."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Standard costs for all"

P1E-D-055 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Directly to production departments"
  Explanation: "The direct method allocates directly to production departments; the step-down method also allocates between service departments first."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Between service departments first"

P1E-E-034 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Financial reports"
  Explanation: "Financial reports are outputs of the reporting system, not the control activities that mitigate risks."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Control activities that mitigate"

P1E-E-035 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Specific controls for transactions"
  Explanation: "Specific transaction controls are application controls, not general controls over technology."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "General controls over technology"

P1E-E-035 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Monitoring tools"
  Explanation: "Monitoring tools support the monitoring component; principle 11 addresses general controls over technology."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "General controls over technology"

P1E-E-037 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Only the board"
  Explanation: "Communication with the board is important, but principle 15 requires communication with all personnel about their control responsibilities."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "All personnel about their"

P1E-E-037 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Only external parties"
  Explanation: "External parties are one audience, but principle 15 requires communication with all personnel about their duties."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "All personnel about their"

P1E-E-038 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "External evaluations"
  Explanation: "External evaluations are one type of separate evaluation, but principle 16 requires selecting both ongoing and separate evaluations."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Ongoing and separate evaluations"

P1E-E-038 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Quarterly reviews"
  Explanation: "Quarterly reviews may be part of monitoring but principle 16 requires a mix of ongoing and separate evaluations."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Ongoing and separate evaluations"

P1E-E-038 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Annual evaluations only"
  Explanation: "Principle 16 requires both ongoing and separate evaluations conducted at varying frequencies, not annual only."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Ongoing and separate evaluations"

P1E-E-050 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Inherent risk"
  Explanation: "Inherent risk is the risk before any controls are applied, not the acceptable level of variation."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The acceptable level of"

P1E-E-056 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Organizational chart"
  Explanation: "An organizational chart shows reporting relationships, not the mapping of controls to risks and objectives."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Controls to risks and"

P1E-E-057 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Only the internal auditors"
  Explanation: "Internal control is effected by the board of directors, management, and all personnel, not by internal auditors alone."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "The board of directors"

P1E-E-060 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Financial results"
  Explanation: "Financial results are outputs of many factors; the control environment primarily shapes the control consciousness of people."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Control consciousness of people"

P1E-F-039 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Employee performance"
  Explanation: "EDP auditing evaluates controls over electronic data processing, not employee performance."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Controls over electronic data"

P1E-F-041 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Separate test environment"
  Explanation: "ITF embeds test data within the production system itself, not in a separate test environment."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Test data within the"

P1E-F-063 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Primary data center"
  Explanation: "The primary data center is the main operational site; a hot site is a separate fully equipped backup facility."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Fully equipped backup facility"

P1E-F-064 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "A mobile unit"
  Explanation: "A mobile unit is a different recovery option; a cold site is a fixed facility with power and cooling but no equipment."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "facility with power and"

P1E-F-065 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Recovery time objective"
  Explanation: "RTO is the target restoration time; MTD is the maximum total time a system can be unavailable before causing severe harm."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "time a system can"

P1E-F-065 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Recovery point objective"
  Explanation: "RPO defines acceptable data loss; MTD defines the maximum duration a system can be unavailable."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "system can be unavailable"

P1E-F-067 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "System capacity"
  Explanation: "System capacity is a performance measure; RPO defines the acceptable amount of data loss measured in time."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "data loss measured in"

P1E-F-067 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Performance level"
  Explanation: "Performance level is a service quality metric; RPO defines acceptable data loss measured by time."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Acceptable data loss measured"

P1E-F-068 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Only cryptocurrency"
  Explanation: "Blockchain has applications far beyond cryptocurrency, including improving transaction transparency and audit trails."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Transaction transparency and audit"

P1E-F-068 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Tax calculation"
  Explanation: "Tax calculation is performed by dedicated tax systems; blockchain can improve transaction transparency and audit trails."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Transaction transparency and audit"

P1E-F-068 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Financial statement preparation"
  Explanation: "Blockchain provides an immutable distributed ledger that enhances transaction transparency and audit trails."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Transaction transparency and audit"

P1E-F-071 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Virtual machines"
  Explanation: "Virtual machines are provided by IaaS; SaaS delivers fully functional applications accessed via the internet."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Applications accessed via the"

P1E-F-071 (pack_e_corrected.js) slot ExplanationWrongC
  Choice: "Network infrastructure"
  Explanation: "Network infrastructure is provided by IaaS; SaaS delivers software applications accessed via the internet."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Applications accessed via the"

P1E-F-071 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Storage only"
  Explanation: "Storage is provided by IaaS; SaaS provides complete applications accessed via the internet."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Applications accessed via the"

P1E-D-062 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "The output measure"
  Explanation: "An output measure may serve as a cost driver but the definition is broader: any factor causing changes in cost."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "factor causing changes in"

P1E-D-067 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Inventory reduction"
  Explanation: "Inventory reduction is a goal of JIT, not the emphasis of TQM which focuses on continuous improvement and customer focus."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Continuous improvement and customer"

P1E-D-071 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Historical data"
  Explanation: "Historical data is analyzed using regression and high-low methods; engineering estimates use physical relationships between inputs and outputs."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Physical relationships between inputs"

P1E-D-073 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Direct labor and overhead"
  Explanation: "Direct labor and manufacturing overhead are conversion costs, not prime costs which are direct materials and direct labor."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Direct materials and direct"

P1E-D-073 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "All manufacturing costs"
  Explanation: "All manufacturing costs is a broader category; prime costs specifically include only direct materials and direct labor."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Direct materials and direct"

P1E-D-073 (pack_e_corrected.js) slot ExplanationWrongD
  Choice: "Direct materials and overhead"
  Explanation: "Direct materials and overhead is incorrect; prime costs consist of direct materials and direct labor."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Direct materials and direct"

P1E-D-074 (pack_e_corrected.js) slot ExplanationWrongB
  Choice: "Direct materials and overhead"
  Explanation: "Direct materials and overhead is not a standard classification; conversion costs consist of direct labor and manufacturing overhead."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Direct labor and manufacturing"

P1E-E-071 (pack_e_corrected.js) slot ExplanationWrongA
  Choice: "Monetary values"
  Explanation: "Monetary values are estimated using variables sampling, not attributes sampling which tests for the presence or absence of a characteristic."
  Flags:
    - VERBATIM_MATCH: explanation contains text from correct choice "Presence or absence of"
