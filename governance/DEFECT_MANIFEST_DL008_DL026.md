# DL-008 / DL-026 Defect Manifest — Human-Readable Planning Document

**Session:** 92  
**Date:** 2026-07-25  
**Type:** Read-only governance and planning  
**Machine-readable companion:** `governance/DEFECT_MANIFEST_DL008_DL026.json`

---

## 1. Executive Summary

This document consolidates all known DL-008 (non-empty ExplanationWrong[CorrectChoice]) and DL-026 (empty distractor ExplanationWrong) defects across the 5-pack question bank for the CMA Part 1 2026 Exam Simulator.

### 1.1 Key Finding: Session 86 Undercount

| Metric | Session 86 Report | Session 92 Scan | Delta |
|--------|------------------|-----------------|-------|
| Pack A | 2 | 2 | 0 ✓ |
| Pack B | 0 | 0 | 0 ✓ |
| Pack C | 51 | 51 | 0 ✓ |
| **Pack D** | **14** | **248** | **+234** |
| **Pack E** | **0** | **371** | **+371** |
| **Total DL-008** | **67** | **672** | **+605** |

**Verification:** 5/5 Pack D items and 6/6 Pack E items independently sampled and confirmed as genuine DL-008 violations. The Session 86/87 manifest (67 items) significantly undercounted Packs D and E.

### 1.2 DL-026 Summary

| Pack | DL-026 Items | State | Details |
|------|-------------|-------|---------|
| D (Section C) | 50 | In Audit | Empty non-CC ExplanationWrong slots — blocks certification of 50 items |

**Grand total blocked (all defect classes): 722 items**

---

## 2. DL-008 Distribution by Pack

### 2.1 Pack A — 2 Items (Section B)

| QID | Section | CorrectChoice | EW Len | Co-occurring Defects |
|-----|---------|--------------|--------|---------------------|
| P1-B-001 | B | D | 625 | DL-010 (misassigned) |
| P1-B-025 | B | A | 694 | DL-010 (misassigned) |

**Pattern:** Isolated items. DL-010 co-occurrence means ExplanationWrong text describes a different choice. These 2 items need EW[CC] cleared to `""` after confirming the EW-text content does not belong in the correct-answer slot.

**Risk:** Low (2 items, isolated, no rotation-group complexity).

### 2.2 Pack C — 51 Items (Sections AC + BC)

| Section | Items | Pattern |
|---------|-------|---------|
| A (AC) | 1 (P1-AC-001) | Rotation-group artifact |
| B (BC) | 50 (BC-001 through BC-100, gapped) | 5-item rotation groups, CC=A/B/C/D/A |

**Pattern:** 51 items follow the 5-item rotation template where CorrectChoice rotates A→B→C→D→A across items without content verification. The TIER0 report (2026-07-23) found 74.1% have CC ≠ EC best match. **Simple EW[CC] clear is unsafe** — requires CorrectChoice audit first.

**Co-occurring defects:**
- DL-010 (misassigned): 38 items have EW[CC] text about a completely different topic
- DL-016 (metadata-content mismatch): Block 1 EW fields may describe different QID's choices

**Risk:** High (51 items, Certified, CC rotation artifacts).

### 2.3 Pack D — 248 Items (All Sections)

| Section | Items | Notes |
|---------|-------|-------|
| A (AD) | ~73 | Full section affected |
| B (BD) | ~100 | Full section affected |
| C (CD) | 1 | P1-CD-001 |
| D (DD) | ~73 | Full section affected |
| E | 1 | P1-DD-075 (boundary item) |
| F | 1 | P1-FD-044 |

**Pattern:** Pervasive. Items use a paired-block structure similar to Pack A/C. DL-016 metadata-content mismatch is suspected (per sample verification of AD-001), meaning EW[CC] text may describe a different QID's choices.

**Sample-verified items (5/5 confirmed genuine):** P1-AD-001, P1-BD-017, P1-CD-001, P1-DD-028

**Risk:** High (248 items, all Certified, pervasive, DL-016 co-occurrence suspected).

### 2.4 Pack E — 371 Items (All Sections)

| Pattern | Systemic DL-008 across all 6 sections |

**Pattern:** All Pack E items use a paired-block structure (Block 1: metadata + EW fields; Block 2: content + CorrectChoice). All 6 sampled items (from Sections A, B, E, F) confirmed genuine DL-008 with DL-016 metadata-content mismatch — the Block 1 EW fields describe a *different* QID's choices than Block 2 content. This is pervasive across the pack.

**Sample-verified items (6/6 confirmed genuine):**
P1E-A-001, P1E-A-003, P1E-B-001, P1E-E-001, P1E-E-037, P1E-F-003

**Risk:** High (371 items, all but a few Certified, systemic DL-016, DL-030 overlap).

### 2.5 Packs B and E (Clean)

| Pack | DL-008 | Status |
|------|--------|--------|
| B | 0 | Fully clean — all 500 items have empty EW[CC] |
| *(Pack E is NOT clean — see §2.4)* | | |

---

## 3. Proposed Remediation Wave Plan

### Wave 1: Pack A Micro-Remediation (2 items)

**Session:** 93 (candidate)  
**Scope:** P1-B-001, P1-B-025  
**Prerequisites:**
- Confirm CorrectChoice via independent stem+choices review
- Verify DL-010: does EW[CC] text actually describe a different choice?
- Backup pack_a_corrected.js before any write

**Actions:**
1. Clear EW[CC] → `""` for both items
2. If DL-010 confirmed, relocate EW text to appropriate distractor slot
3. No question_state changes
4. Run governance guard test suite (test_governance_guard.js)

**Risk:** Very low. 2 items, isolated, no rotation complexity.  
**Estimated effort:** 15-20 minutes.

### Wave 2: Pack D Micro-Remediation (14 known items)

**Session:** 94 (candidate) — **SCOPED TO 14 CONFIRMED ITEMS**  
**Note:** Session 92 found 248 Pack D items, far exceeding the 14 in Session 86. Wave 2 addresses only the 14 items confirmed in prior manifests. The remaining 234 items require additional verification and are deferred to Wave 4.

**Scope:** AD-047, AD-048, AD-054, AD-055, BD-017, BD-021, BD-022, BD-023, BD-024, BD-057, BD-058, BD-059, DD-028, DD-029

**Prerequisites:**
- Verify each item's CorrectChoice from Session 87 manifest (note: AD-047 was already confirmed clean in Session 92 spot-check — CC=D, EW[D]="" )
- Cross-reference against Session 92 scan to confirm status
- Backup pack_d_corrected.js before any write

**Actions:**
1. For each verified DL-008 item, clear EW[CC] → `""`
2. DN-008 items where EW[CC] is empty → skip
3. No question_state changes
4. Run governance guard tests

**Risk:** Medium. 14 items, scattered across sections.  
**Estimated effort:** 30-45 minutes.

### Wave 3: Pack C CC Audit + EW[CC] Remediation (51 items)

**Session:** 95+ (candidate)  
**Scope:** 51 Certified items in Pack C Sections AC (1) and BC (50)

**Prerequisites:**
- **CRITICAL:** Complete CorrectChoice audit for all 51 items
  - For each item, independently determine correct answer from stem + choices
  - Compare to stored CorrectChoice
  - Document all mismatches
- This is a multi-session prerequisite — do NOT clear EW[CC] before CC is confirmed

**Wave 3a (CC Audit):** Read-only session. For each of the 51 items:
1. Extract stem and all 4 choices
2. Independently determine correct answer
3. Compare to stored CC
4. Produce CC audit ledger: QID, stored_CC, correct_CC, confidence

**Wave 3b (Remediation):** After CC audit approval:
1. Fix any wrong CC values
2. Clear EW[CC] → `""` for the corrected CC position
3. Relocate useful EW text from old CC slot to appropriate distractor slot
4. Run governance guard tests

**Risk:** Very high. 51 items, 74.1% CC mismatch rate, DL-010 co-occurrence.  
**Estimated effort:** 2+ sessions.

### Wave 4: Pack D Full Remediation (234 remaining items)

**Session:** 96+ (candidate)  
**Scope:** All 248 Pack D items, minus the 14 addressed in Wave 2

**Prerequisites:**
- Complete scan of Pack D for DL-016 (metadata-content mismatch)
- Cluster by DL-016 status (items where EW text matches vs. doesn't match the item's choices)
- For items with co-occurring DL-016, CC audit may be needed

**Risk:** High. 234 items, suspected DL-016.  
**Estimated effort:** 3+ sessions.

### Wave 5: Pack E Full Remediation (371 items)

**Session:** 97+ (candidate)  
**Scope:** All 371 items across all 6 Pack E sections

**Prerequisites:**
- Systematic audit of Pack E paired-block architecture
- Verify DL-016: for each item, does Block 1 EW text match Block 2 choices?
- CC audit for items where EW[CC] text contradicts stored CC
- Resolve DL-030 overlap (P1E-E-037 CC may still need fix)

**Risk:** Very high. 371 items, systemic DL-016, DL-030 overlap.  
**Estimated effort:** 4+ sessions.

---

## 4. DL-026 Remediation (Pack D Section C)

**Status:** 50 items blocked from certification with empty non-CC ExplanationWrong slots.

**Scope:** P1-CD-002 through P1-CD-099 (every 4th item in a 5-item rotation pattern).

**Approach:**
1. For each of the 50 items, author choice-specific distractor explanations for empty non-CC slots
2. ≤28 items per batch per governance guard Rule 5
3. Backup-before-write mandatory
4. After remediation, items move from "In Audit" → eligible for certification

**Priority:** Medium. Items are not in learner pool (In Audit, not Certified).

---

## 5. Relationship to Governance and Delivery Systems

### 5.1 Governance Guard Rule 2 (BLOCK)

Rule 2 in `.opencode/plugins/governance-guard.js` blocks any write that would result in:
- A Certified item having non-empty ExplanationWrong[CorrectChoice] (DL-008)
- This rule is active as of Session 53

**Impact on remediation:** Waves 1-5 must work within Rule 2's constraint — clearing EW[CC] is allowed; adding non-empty EW[CC] is blocked.

### 5.2 Delivery and Recommendation Gating

Session 89D and later May sessions can consume the blocklist JSON manifests to:
- **Block delivery:** Exclude DL-008/DL-026 items from MCQ delivery pools in exam mode
- **Block recommendations:** Prevent May from recommending DL-008 items as "similar questions"
- **Recovery-set gating:** Exclude defect items from recovery sets

The blocklist files:
- `governance/DEFECT_MANIFEST_DL008_DL026.json` — 672 DL-008 + 50 DL-026 = 722 items
- `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` — 72 items (67 DL-008 + 5 DL-030)
- `governance/defect_manifest.js` — Runtime-loaded manifest (subset, sampled)

**Note:** The Session 88 blocklist (72 items) is significantly out of date given Session 92 findings. Session 89D should update the blocklist from this manifest.

### 5.3 Similarity Families

The `DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` defines 15 similarity families. The Pack C DL-008 items overlap with several families (SF-BUDGET-STATICFLEX, SF-BUDGET-KAIZEN, etc.). When remediating DL-008, ensure similarity-family groupings are preserved for delivery gating.

---

## 6. Candidate Future Sessions

| Session | Name | Scope | Writes Allowed | Blocked Actions |
|---------|------|-------|----------------|-----------------|
| **93** | Pack A DL-008 Micro-Remediation | 2 items (P1-B-001, P1-B-025) | pack_a_corrected.js (EW[CC] only) | No CC changes, no question_state changes |
| **94** | Pack D DL-008 Micro-Remediation | 14 items (known) | pack_d_corrected.js (EW[CC] only) | No CC changes, no question_state changes |
| **95** | Pack C DL-008 CC Audit | 51 items (read-only) | None (read-only) | No writes to any file |
| **95b** | Pack C DL-008 Remediation | 51 items | pack_c_corrected.js | CC changes only with documented evidence |
| **96** | Pack D DL-008 Full Remediation | 234 items | pack_d_corrected.js | No question_state changes |
| **97** | Pack E DL-008 Remediation | 371 items | pack_e_corrected.js | No question_state changes, DL-030 items require CC fix first |

---

## 7. Cross-References

- **DEFECT_LIBRARY.md** — DL-008 entry (full history, 539 occurrences documented)
- **TIER0_PACK_C_DL008_SESSION_2026-07-23.md** — 175 items quarantined, CC rotation analysis
- **SESSION86_FINAL_QA_MCQS_CASES_AND_MAY.md** — Source of the 67-item count
- **DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json** — Session 88 runtime blocklist (72 items)
- **governance/defect_manifest.js** — Runtime-loaded manifest (sampled subset)

---

*End of document. Session 92 — read-only governance planning. No content or runtime files were modified.*
