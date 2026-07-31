# Pack A 16-Clone Archive Verification

**Date:** 2026-07-23
**Trigger:** Session 5 finding — P1-E-042's group are not content-level duplicates (stems/choices/topics genuinely differ). Cross-check all 16 archived items.
**Status:** READ-ONLY VERIFICATION. No file modifications.

---

## 1. Critical Finding — STOP CONDITION TRIGGERED

### 1.1 Stem-Choice Mismatch in Certified Seeds (P1-E-038, 040, 041)

**The certified seeds that justified archiving the 16 clones have stem-choice mismatches — the questions test one concept in the stem but present answer choices from a different concept.** This is a systemic bulk-authoring defect, not a simple clone redundancy.

| Seed QID | Seed Stem Topic | Choices Actually Test | Severity |
|----------|----------------|----------------------|----------|
| **P1-E-038** (Certified) | Terminated employee payroll control | Duplicate invoice payment controls | **CRITICAL** |
| **P1-E-040** (Certified) | User access recertification after department change | Inventory cycle count investigation | **CRITICAL** |
| **P1-E-041** (Certified) | Invoice approval exception root cause | User access recertification / log management | **CRITICAL** |
| **P1-E-045** (Certified) | Duplicate invoice with same vendor/invoice/amount | Control procedure classification (bank rec, three-way match, SoD, variance analysis) | **MODERATE** — choices vaguely related but not specific to duplicate-invoice controls |

**P1-E-039** (Certified, "Juniper cycle counts") needs separate verification but its seed status in a clone group is unconfirmed — no archived siblings share its stem.

### 1.2 Mechanism

The bulk-authoring template pipeline (same root cause as Pack B Section E's 17 wrong-answer-key defects) assigned choice sets to stems by sequential position in a rotation cycle, without verifying that the choices match the stem. The mapping appears to be:

- P1-E-038 (terminated employee stem) → got P1-E-045's choices (duplicate payments)
- P1-E-040 (user access stem) → got P1-E-039's choices (inventory cycle counts)
- P1-E-041 (invoice exception stem) → got P1-E-040's choices (user access)

The corrected answer key for each seed is currently wrong because the choice labeled "correct" belongs to a different concept than the stem tests. Candidates answering these questions would receive misleading feedback.

### 1.3 Impact on the 16 Archived Items

The 12 true clone items (below) inherited the same stem-choice mismatches from their seeds. Reversing the archival alone would not fix them — they'd need stem-choice realignment before they could be useful.

---

## 2. Per-Item Classification

### True Clone Groups — Formed by Stem Identity (Not SESSION_STATUS Grouping)

The SESSION_STATUS grouped items by sequential position in the pack file (every 8th item). The actual clone groups are formed by stem identity. The two groupings are different.

#### Group A: Payroll Terminated Employee (Seed: P1-E-038)

All 5 items share the stem: `"[Company] paid a terminated employee for two pay periods."` — company name is the only variation.

| QID | State | Choices vs Seed | Classification | Recommendation |
|-----|-------|-----------------|----------------|----------------|
| **P1-E-038** | **Certified** | (seed — choices mismatched to topic) | — | **CRITICAL: Certified seed has stem-choice mismatch** |
| P1-E-046 | Archived | 0/4 identical (all choices positionally rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-054 | Archived | 0/4 identical (all rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-062 | Archived | 2/4 identical (partial rotation) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-070 | Archived | 1/4 identical (rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |

#### Group B: Control Exception Root Cause (Seed: P1-E-041)

All 5 items share the stem: `"[Company] finds recurring invoice approval exceptions in one region."`

| QID | State | Choices vs Seed | Classification | Recommendation |
|-----|-------|-----------------|----------------|----------------|
| **P1-E-041** | **Certified** | (seed — choices mismatched to topic) | — | **CRITICAL: Certified seed has stem-choice mismatch** |
| P1-E-049 | Archived | 2/4 identical (2 rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-057 | Archived | 1/4 identical (3 rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-065 | Archived | 1/4 identical (3 rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-073 | Archived | 1/4 identical (3 rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |

#### Group C: User Access Recertification (Seed: P1-E-040)

All 3 items share the stem: `"[Company] finds employees retain access after changing departments."`

| QID | State | Choices vs Seed | Classification | Recommendation |
|-----|-------|-----------------|----------------|----------------|
| **P1-E-040** | **Certified** | (seed — choices mismatched to topic) | — | **CRITICAL: Certified seed has stem-choice mismatch** |
| P1-E-063 | Archived | 0/4 identical (all rotated — but choices are from different topic entirely) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-071 | Archived | 0/4 identical (all rotated) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |

#### Group D: Accounts Payable Duplicate Invoice (Seed: P1-E-045)

All 3 items share the stem: `"[Company] paid two invoices with the same vendor, invoice number, and amount."`

| QID | State | Choices vs Seed | Classification | Recommendation |
|-----|-------|-----------------|----------------|----------------|
| **P1-E-045** | **Certified** | (seed — choices about control procedure names, not duplicate-invoice-specific) | — | **MODERATE: choices partially misaligned** |
| P1-E-058 | Archived | 0/4 identical (all from different topic) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |
| P1-E-066 | Archived | 0/4 identical (all from different topic) | NEAR-IDENTICAL | **CONFIRM** — genuine template clone |

**Clone classification confirmed: 12 of 16 items are genuine template clones (company-name substitution + answer-letter rotation). These are correctly archived.**

---

### Genuinely Distinct Items — Incorrectly Archived

These 4 items have stems that are NOT company-name-only variations of any seed. They were archived because the SESSION_STATUS groups were formed by sequential position, not by stem analysis.

| QID | State | Stem Summary | Topic | Recommendation |
|-----|-------|-------------|-------|----------------|
| **P1-E-047** | Archived | "A company switches from a periodic inventory system to a perpetual inventory system... What is the primary internal control benefit?" | perpetual vs periodic inventory control | **CRITICAL: REVERSE** — unique stem, unique concept. Choices however are mismatched (about terminated employee payroll, not inventory systems) |
| **P1-E-055** | Archived | "A warehouse manager who has custody of inventory is also assigned to perform the annual physical inventory count without independent oversight." | independent physical count control | **CRITICAL: REVERSE** — unique stem, unique concept. Choices mismatched (about terminated employee payroll) |
| **P1-E-050** | Archived | "A manager reviews and approves journal entries each month but does not initial, date, or otherwise document that the review occurred." | documentation of control performance | **CRITICAL: REVERSE** — unique stem. Shares concept with Certified P1-E-042 but different stem structure. Choices mismatched (about invoice exception root cause) |
| **P1-E-074** | Archived | "Barrett Manufacturing's internal audit team completed a separate evaluation of inventory cycle counting controls... [long detailed stem, ~250 chars]" | control monitoring separate evaluations | **CRITICAL: REVERSE** — completely unique, long-form stem, detailed business scenario. Most educationally valuable item in the entire archive set. Choices mismatched (about invoice exception root cause) |

---

## 3. Summary Table

| Recommendation | Count | QIDs |
|---------------|-------|------|
| **CONFIRM** (correctly archived as clones) | **12** | P1-E-046, 054, 062, 070, 049, 057, 065, 073, 063, 071, 058, 066 |
| **CRITICAL: REVERSE** (genuinely distinct) | **4** | P1-E-047, P1-E-055, P1-E-050, P1-E-074 |
| **CRITICAL: Certified seed defective** | **3** | P1-E-038, 040, 041 (stem-choice mismatch) |

---

## 4. Cascading Defect Chain

```
1. Bulk-authoring pipeline assigns choice sets to stems by positional rotation
   (same mechanism as Pack B Section E's 17 wrong-answer-key defects)
   ↓
2. Seeds P1-E-038, 040, 041 get MISMATCHED choices → answer keys wrong
   (e.g., P1-E-038 tests "terminated employee control" but choices are about
    "duplicate invoice payments")
   ↓
3. Clone siblings inherit the same mismatched stems + choices
   (P1-E-046 etc. are correctly templated but content is defective)
   ↓
4. SESSION_STATUS groups items by sequential position (every 8th), not stem
   similarity, causing 4 genuinely distinct items (047, 055, 050, 074) to be
   incorrectly archived alongside the 12 genuine clones
   ↓
5. The 3 defective seeds are CERTIFIED and in the learner delivery pool
   (P1-E-038, 040, 041 — all Certified, all Section E Block 1)
```

---

## 5. Recommended Actions

### Immediate (this finding)

1. **REVERSE archival** for P1-E-047, P1-E-055, P1-E-050, P1-E-074 — these are genuinely distinct items, not clones. However, all 4 also have stem-choice mismatches and require content repair before they can be useful.

2. **Audit the 3 defective Certified seeds** (P1-E-038, 040, 041) — their answer keys are likely wrong. They are currently in the learner delivery pool. This is a delivery-pool contamination event.

3. **Keep the 12 confirmed clones archived** — the archival decision was correct for these items, though they (and their seeds) have underlying content defects.

### Deferred

4. **Stem-choice realignment for all 16 items + their 4 seeds** — the bulk-authoring pipeline defect requires reassigning choice sets to match stems. This is a content-repair task, not a governance task.

5. **Review the group-formation logic** in `SESSION_STATUS_2026-07-22.md` §2.1 — the four groups listed there are categorized by sequential position, not stem identity. The actual clone groups cross the listed boundaries.

---

## 6. Methodology

- **Stem comparison:** exact match after company-name substitution (Iris→Quartz→Zephyr→Harbor→Pioneer, Lumen→Titan→Crescent→Keystone→Summit, etc.)
- **Choice comparison:** 4-way string equality check between seed choice and clone choice per letter position
- **Boundary-aware block parse** per `.opencode/skills/reconciliation-audit.md` §3a

No files modified. Read-only verification. Backup file `pack_a_corrected.js.bak-20260723111446` not accessed — current live file used for all comparisons.

---

*Verification completed 2026-07-23. 12 items confirmed correctly archived. 4 items flagged for reversal. 3 Certified seeds flagged for stem-choice mismatch defect.*
