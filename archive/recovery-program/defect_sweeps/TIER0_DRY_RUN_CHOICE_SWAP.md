# TIER 0 — Dry-Run: 3-Hop Choice Swap (DO NOT EXECUTE)

**Date:** 2026-07-23
**Status:** Awaiting Session 6 reconciliation. No writes executed.
**Authorization:** HOLD — explicit authorization required before any swap.

---

## HOP 1: P1-E-038 ← P1-E-039 Choices

**P1-E-038 stem:** "Iris paid a terminated employee for two pay periods. Which response is most appropriate?"
**Topic:** payroll terminated employee control

| Slot | Current (Wrong — duplicate payments) | After Swap (Correct — terminated employee) |
|------|--------------------------------------|-------------------------------------------|
| A | Disable invoice-number validation because vendors may reuse numbers | Allow supervisors to keep former employees active for convenience |
| B | Have payment preparers reconcile their own work only | Review terminations only during the annual audit |
| **C** | Record duplicate payments as prepaid expenses without follow-up | **Reconcile HR termination records to payroll master-file changes promptly** ← CORRECT |
| D | Use system duplicate checks and independent review before payment release | Let payroll learn of terminations through informal emails only |

| Field | Before | After |
|-------|--------|-------|
| CorrectChoice | C | **C** (Reconcile HR termination records — stays C) |
| ExplanationCorrect | Already correct (describes terminated employee COSO Principle 10 control) | No change needed |
| ExplanationWrongA | Disabling invoice-number validation removes a key automated preventive control... | Needs update — must explain why allowing supervisors to keep former employees is wrong |
| ExplanationWrongB | Having payment preparers review only their own work lacks independence... | Needs update |
| ExplanationWrongC | Recording duplicate payments as prepaid expenses without follow-up misstates accounting... | **EMPTY → ExplanationCorrect stays** |
| ExplanationWrongD | Using system duplicate checks plus independent review addresses the duplicate-payment risk... | Needs update |

---

## HOP 2: P1-E-039 ← P1-E-040 Choices

**P1-E-039 stem:** "Juniper uses cycle counts and identifies repeated shortages in high-value components. Which response is most appropriate?"
**Topic:** inventory cycle count investigation

| Slot | Current (Wrong — terminated employee) | After Swap (Correct — cycle counts) |
|------|--------------------------------------|----------------------------------------|
| A | Allow supervisors to keep former employees active | Record shortages as sales discounts |
| B | Review terminations only during the annual audit | Write off shortages without investigation |
| C | Reconcile HR termination records to payroll master-file changes promptly | Stop counting high-value components because errors are embarrassing |
| **D** | Let payroll learn of terminations through informal emails only | **Investigate discrepancies and improve access, recording, and count procedures** ← CORRECT |

| Field | Before | After |
|-------|--------|-------|
| CorrectChoice | D | **D** (Investigate discrepancies — stays D) |
| ExplanationCorrect | ⚠ NEEDS VERIFICATION — current ExplanationCorrect describes terminated employee control (from wrong choice set). Must be updated to describe cycle count investigation for COSO Principle 10 (investigate discrepancies in detective controls) | |

---

## HOP 3: P1-E-040 ← P1-E-041 Choices

**P1-E-040 stem:** "Keystone finds employees retain access after changing departments. Which response is most appropriate?"
**Topic:** user access recertification

| Slot | Current (Wrong — cycle counts) | After Swap (Correct — user access) |
|------|--------------------------------|------------------------------------|
| A | Record shortages as sales discounts | Share administrator accounts for urgent requests |
| **B** | Write off shortages without investigation | **Perform periodic access recertification based on current job responsibilities** ← CORRECT |
| C | Stop counting high-value components because errors are embarrassing | Disable logs to avoid data overload |
| D | Investigate discrepancies and improve access, recording, and count procedures | Permit access to remain because the employees are trusted |

| Field | Before | After |
|-------|--------|-------|
| CorrectChoice | B | **B** (Perform periodic access recertification — stays B) |
| ExplanationCorrect | Already correct (describes COSO Principle 11 — periodic access recertification) | No change needed |
| ExplanationWrongA | Classifying inventory shortages as sales discounts misrepresents... | Needs update |
| ExplanationWrongB | Writing off shortages without investigation fails to address... | **EMPTY → ExplanationCorrect stays** |
| ExplanationWrongC | Stopping cycle counts because they reveal problems removes a critical detective control... | Needs update |
| ExplanationWrongD | Investigate discrepancies and improve... — actually describes the right approach but wrong topic | Needs update |

---

## P1-E-050 — 5th Rotation Member Verification

**P1-E-050 stem:** "A manager reviews and approves journal entries each month but does not initial, date, or otherwise document that the review occurred. What is the primary control deficiency here?"
**Topic:** documentation of control performance
**State:** MISSING (reversed from archive today)

**P1-E-050 choices DO match P1-E-041's stem** (invoice exception root cause):

| Slot | P1-E-050 Choice | Signals |
|------|----------------|---------|
| A | Move approval to the person who enters invoices | "approval", "invoice" |
| B | Delete exception reports after review | "exception" |
| C | Treat every exception as immaterial because invoices were eventually paid | "exception", "invoice" |
| D | Analyze root cause, correct the process, and monitor whether exceptions decline | "root cause", "exception" |

**However: P1-E-050's stem is NOT about invoice exceptions.** It is about control documentation/evidence of review — a completely different concept. P1-E-050 may have received the invoice-exception choices FROM P1-E-041 in the original rotation (in the opposite direction), or it may have been independently authored with misassigned choices.

**If P1-E-041 ← P1-E-050 (giving 050's choices to 041):**
- P1-E-041 is fixed
- P1-E-050 loses its choices and needs NEW authoring for its own stem (control documentation)

**Alternative:** Author new choices for P1-E-041 from scratch, leaving P1-E-050 intact (but P1-E-050 currently also has mismatched choices for its own stem).

---

## P1-E-045 — Additional Mechanical Fix Opportunity

**P1-E-045 stem:** "Pioneer paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?"
**Topic:** accounts payable duplicate invoice control
**State:** Certified

P1-E-038's CURRENT choices (duplicate payment controls) are a better match for P1-E-045's stem than P1-E-045's current choices (generic control procedure names):

| Slot | P1-E-045 Current (weak) | P1-E-038 Current (better match) |
|------|------------------------|-------------------------------|
| A | Bank reconciliation; verifies cash balances | Disable invoice-number validation |
| B | Three-way match; verifies goods ordered/received/billed | Have payment preparers reconcile own work |
| C | Segregation of duties; verifies employee roles | Record duplicate payments as prepaid |
| D | Variance analysis; verifies budget compliance | Use system duplicate checks + independent review ← likely correct |

If the 3-hop swap executes, P1-E-038's former choices are freed up. They could be reassigned to P1-E-045 as a quality improvement (P1-E-045 is not defective, just weak). **Optional, not required for pool safety.**

---

## Execution Readiness

| Hop | Source | Target | CC Change | ExplanationCorrect Change | Risk |
|-----|--------|--------|-----------|--------------------------|------|
| 1 | P1-E-039 | P1-E-038 | C → C (unchanged) | No change | Low — EC already correct |
| 2 | P1-E-040 | P1-E-039 | D → D (unchanged) | **Must update** — EC describes wrong topic | **MEDIUM** — EC mismatch with correct concept |
| 3 | P1-E-041 | P1-E-040 | B → B (unchanged) | No change | Low — EC already correct |
| ? | P1-E-050 | P1-E-041 | Needs determination | Must verify against new choices | MEDIUM — P1-E-050 stem mismatch |

**Note on CorrectChoice values:** For all 3 hops, the correct letter position happens to stay the same (C→C, D→D, B→B) because the correct answer occupies the same position in the source's choice set. This is coincidental and was independently verified — not inherited from the source's CC field (which itself may be wrong due to the rotation).

---

## Awaiting

Session 6 reconciliation (currently in progress). Two outcomes:
- **Confirms Tier 0 finding:** execute the 3-hop swap. P1-E-050 and P1-E-045 handled separately.
- **Refutes as artifact:** revert all 4 Holds back to Certified. Swap proposal is moot.
