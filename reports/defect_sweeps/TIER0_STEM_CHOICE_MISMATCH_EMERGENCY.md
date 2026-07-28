# TIER 0 EMERGENCY — Certified Stem-Choice Mismatch + 16-Clone Archive Correction

**Date:** 2026-07-23
**Status:** Report + Reversal Executed. Certified-seed Hold NOT executed (awaiting authorization).
**Backup:** `pack_a_corrected.js.bak-20260723111446` (pre-archive snapshot, confirmed intact)

---

## PART A: TIER 0 — Stem-Choice Mismatch in Certified Seeds

### A.1 Confirmed Defect — 4 Seeds (Plus P1-E-045)

A 5-item template rotation in the bulk-authoring pipeline shifted choice sets by +1 position. The stems and ExplanationCorrect fields are correct for each item's topic. The CHOICES are from a different topic. The CorrectChoice letter was set based on the wrong choices.

#### P1-E-038 — Terminated Employee Control (Certified)

| Element | Content | Belongs To |
|---------|---------|------------|
| Stem | "Iris paid a **terminated employee** for two pay periods." | P1-E-038 ✓ |
| ExplanationCorrect | COSO Principle 10…payroll termination…reconcile HR records to payroll | P1-E-038 ✓ |
| Choices | (A) Disable invoice-number validation (B) Have payment preparers reconcile their own work (C) **Record duplicate payments** as prepaid expenses (D) Use system duplicate checks | **P1-E-045's topic** (duplicate invoice controls) |
| CorrectChoice set to | **C** (Record duplicate payments as prepaid expenses) | WRONG — tests duplicate payment, not terminated employee |

#### P1-E-039 — Inventory Cycle Counts (Certified)

| Element | Content | Belongs To |
|---------|---------|------------|
| Stem | "Juniper uses **cycle counts** and identifies repeated **shortages** in high-value components." | P1-E-039 ✓ |
| Choices | (A) Allow supervisors to keep former employees active (B) Review **terminations** only during annual audit (C) Reconcile **HR termination records** to payroll (D) Let payroll learn of terminations via informal emails | **P1-E-038's topic** (terminated employee control) |
| CorrectChoice set to | **D** (Let payroll learn of terminations via informal emails) | WRONG |

#### P1-E-040 — User Access Recertification (Certified)

| Element | Content | Belongs To |
|---------|---------|------------|
| Stem | "Keystone finds employees retain **access** after changing **departments**." | P1-E-040 ✓ |
| ExplanationCorrect | COSO Principle 11…periodic access recertification…least privilege | P1-E-040 ✓ |
| Choices | (A) Record shortages as sales discounts (B) Write off shortages without investigation (C) Stop counting high-value components (D) Investigate discrepancies and improve count procedures | **P1-E-039's topic** (cycle count investigation) |
| CorrectChoice set to | **B** (Write off shortages without investigation) | WRONG |

#### P1-E-041 — Invoice Exception Root Cause (Certified)

| Element | Content | Belongs To |
|---------|---------|------------|
| Stem | "Lumen finds recurring **invoice approval exceptions** in one region." | P1-E-041 ✓ |
| ExplanationCorrect | COSO Principle 17…control deficiencies…recurring invoice approval exceptions | P1-E-041 ✓ |
| Choices | (A) Share **administrator accounts** (B) Perform periodic **access recertification** (C) Disable **logs** (D) Permit **access** to remain because employees are trusted | **P1-E-040's topic** (user access recertification) |
| CorrectChoice set to | **D** (Permit access to remain) | WRONG |

#### P1-E-045 — Duplicate Invoice Control (Certified)

| Element | Content | Belongs To |
|---------|---------|------------|
| Stem | "Pioneer paid two invoices with the same **vendor, invoice number, and amount**." | P1-E-045 ✓ |
| Choices | (A) **Bank reconciliation**; verifies cash balances (B) **Three-way match**; verifies goods ordered/received/billed (C) **Segregation of duties**; verifies employee roles (D) **Variance analysis**; verifies budget compliance | Partially misaligned — choices are generic control procedure classifications rather than duplicate-invoice-specific controls |
| CorrectChoice set to | **B** (Three-way match) | Partially correct but the question quality is degraded |

### A.2 Defect Mechanism — Choice Rotation by +1

```
Bulk-authoring 5-item template group (P1-E-038–045):
  Item 1 (038, terminated employee) → got Item 5's (045) choices
  Item 2 (039, cycle counts)       → got Item 1's (038) choices
  Item 3 (040, user access)        → got Item 2's (039) choices
  Item 4 (041, invoice exceptions)  → got Item 3's (040) choices
  Item 5 (045, duplicate invoices)  → got Item 4's (041?) choices
```

Items P1-E-042, 043, 044 were NOT part of this template rotation cluster — they have different stem patterns and topic structures. This defect is contained to a single 5-item group.

### A.3 Scoping — Full Certified Pool

| Pack | Section E Certified | Stem-Choice Mismatches | Scope |
|------|-------------------|------------------------|-------|
| Pack A | 58 | **4–5 confirmed** (038, 039, 040, 041; partially 045) | Contained to single 5-item template rotation cluster |
| Pack B | 75 | 0 | Clean — Pack B Section E items have different authorship origin |
| Pack E | 0 Section E certified | 0 (Pack E Section E items not yet certified) | Not applicable |

**Pack A non-Section E certified items:** Keyword-based scan flagged 134 potential mismatches, but these are overwhelmingly false positives — accounting questions naturally use different vocabulary in stems (scenario details) vs. choices (standard/law references). No evidence of the rotation-pipeline defect in non-Section-E Pack A items.

### A.4 Immediate Action Required — Pull from Delivery Pool

**Four Certified items (P1-E-038, 039, 040, 041) have wrong answer keys and are in the learner delivery pool.** Their ExplanationCorrect text describes the right concept but their CorrectChoice points to a wrong distractor from a different topic.

**Recommendation:** Change `question_state` from `"Certified"` to `"Hold"` for all 4 items. This removes them from the delivery pool immediately without content damage — stems and explanations are preserved, only the governance state changes. Awaiting explicit authorization.

### A.5 Long-Term Fix

The choices need to be rotated back to match their correct stems. If the original template had correct choice sets, the reconstruction is mechanical:

| Item | Currently Has | Should Have | Source |
|------|-------------|-------------|--------|
| P1-E-038 | Duplicate invoice choices (from 045) | Terminated employee choices | P1-E-039's current choices |
| P1-E-039 | Terminated employee choices (from 038) | Cycle count choices | P1-E-040's current choices |
| P1-E-040 | Cycle count choices (from 039) | User access choices | P1-E-041's current choices |
| P1-E-041 | User access choices (from 040) | Invoice exception choices | Unknown — possibly from P1-E-045 or a sixth item not yet identified |

This is a deterministic fix — no new content creation needed, only reassignment of existing choice texts. CorrectChoice, ExplanationCorrect, ExplanationWrong* also need realignment. Full content repair deferred — immediate priority is delivery pool safety.

---

## PART B: 4-Item Archive Reversal (EXECUTED)

### B.1 Confirmation

Pre-archive state from `pack_a_corrected.js.bak-20260723111446`: all 16 items had `question_state: MISSING` (no field). The archive operation set `question_state: "Archived"` on all 16.

### B.2 Reversal

| QID | Pre-archive state | Old (archived) | New (reversed) | Reason |
|-----|------------------|----------------|----------------|--------|
| P1-E-047 | MISSING | Archived | **MISSING** (field removed) | Genuinely distinct stem: perpetual vs. periodic inventory control |
| P1-E-055 | MISSING | Archived | **MISSING** (field removed) | Genuinely distinct stem: independent physical count control |
| P1-E-050 | MISSING | Archived | **MISSING** (field removed) | Genuinely distinct stem: control documentation/evidence of review |
| P1-E-074 | MISSING | Archived | **MISSING** (field removed) | Genuinely distinct stem: detailed inventory cycle count evaluation scenario |

### B.3 12 Confirmed Clones — Leave Archived

P1-E-046, 054, 062, 070, 049, 057, 065, 073, 063, 071, 058, 066 remain `question_state: "Archived"`. These are genuine template clones (company-name substitution + answer-letter rotation only).

---

## PART C: REVISION_HISTORY.md Entry (APPENDED)

See appended entry below. Cross-references this report and the PACK_A_16CLONE_ARCHIVE_VERIFICATION.md.

---

*Tier 0 emergency report completed 2026-07-23. Reversal executed. Certified-seed Hold NOT executed — awaiting explicit authorization.*
