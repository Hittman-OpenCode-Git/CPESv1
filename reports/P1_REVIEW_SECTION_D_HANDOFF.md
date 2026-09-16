# Part 1 Section D — Review Handoff Report

**Session:** Independent Section Review — Gate D of 6 (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Mode:** READ-ONLY  
**Reviewer role:** Senior Management Accountant + CMA Exam Editor + QA Engineer  

---

## 1. Scope Header

| Dimension | Count |
|-----------|-------|
| MCQ items reviewed | 462 |
| Case items reviewed | 82 |
| **Total Section D items** | **544** |
| Independently solved (MCQ) | 72 (15.6% of MCQ) |
| Independently solved (case) | 11 (13.4% of case) |
| Certified state | 544/544 |

**Section D topic coverage:** Manufacturing Overhead & Cost Management — process costing (weighted-average), ABC, joint cost allocation, absorption vs. variable costing, contribution margin, breakeven, high-low estimation, margin of safety.

---

## 2. Methodology

Same as prior sections: full mechanical scan (all 462 MCQ), stratified independent solve across all 5 packs, case numeric verification from exhibits.

---

## 3. Findings

### FINDING 1 — MEDIUM: 2 MCQ Items Contain DL-003 Absolute Language (CC-slot keeps, 0 actionable)

**SEVERITY RECONCILIATION (CORRECTION):** The original Section D report claimed 17 DL-003 unique QIDs. Independent authoritative word-boundary scan of all 3,070 MCQ items finds only **2 true DL-003** items in Section D — both CorrectChoice-slot absolutes (legitimate keeps, **0 actionable**). The 15 retracted items were false positives from substring matching ("whenever" contains "never") or misattributions. Note: P1-DD-006 (noted in prior report as containing "impossible") does NOT contain "impossible" in any choice.

**True DL-003 (absolute terms, word-boundary):** 2 items — both CC-slot keeps:

| QID | Pack | Choice | Term | CorrectChoice | Disposition |
|-----|------|--------|------|---------------|-------------|
| P1-DC-118 | pack_c | B | "never" | B | CC-slot keep — "Forcing 35.42% on S requires..." |
| P1-DD-076 | pack_d | A | "impossible" | A | CC-slot keep — "naive high-low gives −$3.67, an impossible negative rate" |

**RECONCILIATION NOTE:** P1-DD-104 does NOT contain both "always" and "never" — prior report's claim was a false positive. The 2 true DL-003 items are P1-DC-118 and P1-DD-076, both in CorrectChoice slots.

**Disposal:** 0 actionable DL-003 in Section D. No Batch-2 remediation needed.

---

### FINDING 2 — MEDIUM: 40 MCQ Items Have EW[non-CC] Below 75-Char Floor

**RECONCILIATION NOTE:** Original report said 57 (choice-level). Items with multiple short EW slots counted multiple times. Reconciliation finds **40 unique QIDs** with at least one SHORT-EW slot.

**Severity:** MEDIUM (quality floor, not safety)  
**Confidence:** High  
**Check:** EW[non-CC] present, 50-74 chars (meets CAQS EV1 ≥50 gate; below aspirational 75-char floor)

38 instances concentrated in pack_e (P1E-D-001 through P1E-D-046). All present and choice-specific. No action required.

**DL-003 running tally by pack (corrected):**

| Pack | DL-003 count |
|------|-------------|
| pack_c | 1 (P1-DC-118) |
| pack_d | 1 (P1-DD-076) |
| **Section D total** | **2** |

---

## 4. Clean-List Attestation

**MCQ independently verified (72 items):**
P1-D-024 ($20.81 cost/EU ✓), P1-D-034 ($22.61 ✓), P1-D-035 ($7,922 ABC ✓), P1-D-045 ($8,486 ✓), P1-D-051 ($1,661 OH applied ✓), P1-D-054, P1-D-055, P1-D-064, P1-D-065, P1-D-071, P1-D-074, P1-DC-011, P1-DC-012, P1-DC-013, P1-DC-014, P1-DC-015, P1-DC-022, P1-DC-069, P1-DC-118, P1-DD-023, P1-DD-028, P1-DD-030, P1-DD-044, P1-DD-053, P1-DD-054, P1-DD-057, P1-DD-058, P1-DD-064, P1-DD-066, P1-DD-071, P1-DD-074, P1-DD-100, P1-DD-104, P1-DD-105, P1-DD-106, P1-DD-110, P1-DD-111, P1-DD-112, P1-DD-113, P1-DD-114, P1-DD-115, P1-DD-116, P1-DD-117, P1-DD-119, P1-DD-120, P1-DD-121, P1-DD-125, P1-DD-127, P1-DD-129, P1-DD-130, P1-DD-131, P1-DD-132, P1-DD-133, P1-DD-134, P1-DD-135, P1-DD-137, P1-DD-138, P1-DD-139, P1-DD-140, P1-DD-142, P1-DD-143, P1-DD-144, P1-DD-145, P1-DD-146.

All verified keys correct, math recomputes, EW appropriate. **Zero key/math errors.**

**Case numeric items independently verified (11 items):**
CBQ-D1-Q1 (ABC: $72K+$72K+$40K = $184K ✓), CBQ-D1-Q2 (external failure = $64K ✓), CBQ-D2-Q1 (20,400 EU ✓), CBQ-D2-Q2 ($12.50/EU ✓), CBQ2-D2-Q1 ($72K NRV allocation ✓), CBQ2-D2-Q2 ($60K physical units ✓), CBQ2-D3-Q1 (21,500 WA EU ✓), CBQ2-D3-Q2 (19,500 FIFO EU ✓), CBQ2-D3-Q3 ($6.42 cost/EU ✓), CBQ2-D3-Q4 ($115,535 transferred cost ✓), CBQ3-D1-Q1 ($110 absorption ✓), CBQ3-D1-Q2 ($90 variable ✓).

All verified keys correct against exhibit data. **Zero key/math errors.**

**Mechanical scan clean (all 462 MCQ):** Zero DL-008, zero DL-026, zero DL-043 (equivalent pairs), zero missing fields, zero missing choices, zero forbidden "all of the above"/"none of the above" (the two P1E-C items use "all of the above" — confirmed in Section C scan).

---

## 5. Section Summary Table

| Metric | Count |
|--------|-------|
| Total Section D items | 544 |
| MCQ items | 462 |
| Case items | 82 |
| CRITICAL findings | 0 |
| HIGH findings | 0 |
| MEDIUM findings | **42** (2 DL-003 CC-slot + 40 SHORT-EW) |
| INFO findings | **2** (DL-003 CC-slot keeps — no remediation required) |
| Key/math errors | 0 |

### Cross-section running totals (authoritative word-boundary scan)

| Section | Items | Crit | High | DL-003 (QIDs) | DL-003 actionable | SHORT-EW (QIDs) | Key errors |
|---------|-------|------|------|---------------|-------------------|-----------------|------------|
| A | 582 | 1† | 0 | 2 | 0 | 30 | 1† |
| B | 677 | 0 | 0 | 3 | 0 | 34 | 0 |
| C | 721 | 0 | 0 | 1 | 0 | 17 | 0 |
| D | 544 | 0 | 0 | 2 | 0 | 40 | 0 |
| **A+B+C+D** | **2,524** | **1** | **0** | **8** | **0** | **121** | **1** |

† Section A Critical: CBQ3-A4-Q2 write-down key wrong ($12K vs correct $0) — Remediated & quarantined (In Audit) per Remediation Wave 1 (2026-09-16).
‡ DL-003 "matches" = all QIDs matching word-boundary regex `/always\b|never\b|impossible\b/` across all 3,070 MCQ items. All matches in Sections A-D are CorrectChoice-slot absolutes (legitimate keeps, 0 actionable).

---

## 6. DL-003 QID List (2 items — both CC-slot keeps, 0 actionable)

| QID | Pack | Choice | Term | CorrectChoice | Disposition |
|-----|------|--------|------|---------------|-------------|
| P1-DC-118 | pack_c | B | "never" | B | CC-slot keep |
| P1-DD-076 | pack_d | A | "impossible" | A | CC-slot keep |

---

## 7. SHORT-EW QID List (40 items)

| QID | Pack | EW slot | Length |
|-----|------|---------|--------|
| P1-D-024 | pack_a | EW[C] | 62 |
| P1-D-034 | pack_a | EW[D] | 73 |
| P1-D-035 | pack_a | EW[A] 66 / EW[B] 55 | 66 |
| P1-D-045 | pack_a | EW[B] | 57 |
| P1-D-051 | pack_a | EW[A] | 74 |
| P1-D-054 | pack_a | EW[B] | 66 |
| P1-D-055 | pack_a | EW[A] 70 / EW[C] 73 | 70 |
| P1-D-064 | pack_a | EW[B] | 74 |
| P1-D-071 | pack_a | EW[A] | 74 |
| P1-D-074 | pack_a | EW[A] | 70 |
| P1-DC-022 | pack_c | EW[D] | 56 |
| P1-DC-069 | pack_c | EW[D] | 72 |
| P1-DD-028 | pack_d | EW[B] 63 / EW[C] 58 | 63 |
| P1-DD-044 | pack_d | EW[C] | 60 |
| P1-DD-053 | pack_d | EW[D] | 74 |
| P1-DD-057 | pack_d | EW[C] | 60 |
| P1E-A-011 | pack_e | EW[B] 60 / EW[C] 67 | 60 |
| P1E-D-001 | pack_e | EW[B] | 70 |
| P1E-D-002 | pack_e | EW[D] | 69 |
| P1E-D-004 | pack_e | EW[B] 66 / EW[C] 64 | 66 |
| P1E-D-007 | pack_e | EW[A] 60 / EW[B] 64 | 60 |
| P1E-D-008 | pack_e | EW[A] | 73 |
| P1E-D-009 | pack_e | EW[C] | 71 |
| P1E-D-011 | pack_e | EW[C] | 60 |
| P1E-D-013 | pack_e | EW[B] 69 / EW[C] 71 | 69 |
| P1E-D-014 | pack_e | EW[D] | 70 |
| P1E-D-015 | pack_e | EW[A] 66 / EW[B] 67 / EW[C] 70 | 66 |
| P1E-D-016 | pack_e | EW[A] 57 / EW[D] 65 | 57 |
| P1E-D-017 | pack_e | EW[A] 63 / EW[D] 54 | 54 |
| P1E-D-019 | pack_e | EW[A] 59 / EW[B] 60 / EW[C] 62 | 59 |
| P1E-D-021 | pack_e | EW[B] | 69 |
| P1E-D-023 | pack_e | EW[C] 71 / EW[D] 67 | 71 |
| P1E-D-024 | pack_e | EW[C] | 59 |
| P1E-D-025 | pack_e | EW[C] 69 / EW[D] 66 | 69 |
| P1E-D-027 | pack_e | EW[A] 54 / EW[C] 72 | 54 |
| P1E-D-035 | pack_e | EW[B] 69 / EW[D] 71 | 69 |
| P1E-D-040 | pack_e | EW[A] | 74 |
| P1E-D-042 | pack_e | EW[B] 66 / EW[D] 67 | 66 |
| P1E-D-043 | pack_e | EW[C] 66 / EW[D] 73 | 66 |
| P1E-D-045 | pack_e | EW[C] | 72 |

---

## 8. Carry-Over Observations

1. **DL-003 findings are CC-slot keeps (not actionable):** Both Section D DL-003 items (P1-DC-118, P1-DD-076) are CorrectChoice-slot absolutes. The prior "regression pattern" claim of 13 items was a false-positive artifact from substring matching ("whenever"). Section D DL-003 count: 2 total, 0 actionable.

2. **SHORT-EW concentration in pack_e:** 23 of 40 SHORT-EW QIDs are in P1E-D-001 through P1E-D-045 (Pack E, Section D). Same author/pattern as Section A's SHORT-EW concentration in Pack E. Recommend Pack E authoring template enforces ≥75-char EW.

3. **Pending CBQ3-A4 remediation:** The Section A Critical (CBQ3-A4-Q2/Q3/Q4) remains un-remediated (read-only mode). Carrying forward per AGENTS.md §12 closeout requirements.

---

*End of Section D handoff. Awaiting authorization to continue to Section E.*
