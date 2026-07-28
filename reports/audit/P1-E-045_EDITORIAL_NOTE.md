# P1-E-045 Editorial Observation — Low-Priority Content Enhancement

**Date:** 2026-07-23
**Severity:** Low (informational — no defect, no learner impact)
**Status:** Non-urgent enhancement suggestion

---

## Observation

P1-E-045 (CC=B, three-way match control, `question_state: "Certified"`) is internally coherent — its stem asks about a three-way match and its correct answer correctly identifies the three-way match control. There is no content defect.

However, the **choice set** uses generic control-procedure vocabulary (bank reconciliation, three-way match, segregation of duties, variance analysis) rather than distractor options that target specific three-way-match misconceptions:

| Choice | Current Text |
|--------|------------|
| A | "Bank reconciliation; verifies cash balances" |
| B (*CC*) | "Three-way match; verifies that goods ordered, received, and billed all agree before payment" |
| C | "Segregation of duties; verifies employee roles" |
| D | "Variance analysis; verifies budget compliance" |

The distractors are all correct *definitions* of control procedures — they test whether the candidate recognizes the three-way match by name rather than testing whether the candidate would select the *right control* for the scenario. A stronger version would present options that are all plausible controls for invoice processing, requiring the candidate to identify which one (the three-way match) specifically applies to the scenario described.

## Suggested Enhancement

Rewrite choices to be scenario-specific:
- **A:** "Bank reconciliation; matches the vendor invoice to the cash disbursements journal" (plausible for AP context but incorrect — bank rec matches company records to bank records)
- **B (*CC*):** "Three-way match; compares the purchase order, receiving report, and vendor invoice before payment"
- **C:** "Invoice aging review; verifies that old invoices are paid first" (plausible for AP but not about invoice approval)
- **D:** "Vendor statement reconciliation; matches the vendor's statement to individual invoices" (plausible for AP but detects duplicates, not ensures correct approval)

## Priority

Low. This item is Certified and currently serving learners correctly. The enhancement would improve distractor discrimination but is cosmetic — the question tests the right concept with coherent stem+answer, and no learner is at risk.

## Cross-References

- `reports/TIER0_STEM_CHOICE_MISMATCH_EMERGENCY.md` — Part A originally briefly noted P1-E-045's choice quality but classified it as "partially misaligned"
- `reports/PACK_A_16CLONE_SIMILARITY_SCORES.md` — Session 6 verified P1-E-045 has coherent stem-choice matching
- `knowledge/DEFECT_LIBRARY.md` — No defect entry needed; this is an enhancement, not a defect

---

*Filed as non-urgent content-enhancement note per consensus instruction. No swap, no Hold, no state change needed.*
