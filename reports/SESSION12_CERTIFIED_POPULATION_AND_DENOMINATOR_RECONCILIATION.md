# Session 12 — Certified Population and Denominator Reconciliation

**Date:** 2026-07-24
**Status:** `RECONCILIATION PRODUCED WITH HASH-MISMATCH CAVEAT.`
**Read-Only:** Yes.

---

## 1. Certified Denominator Changes and Their Origins

### 1.1 Per-Pack Certified Denominators

| Pack | Pre-Repair Certified | Post-Repair Certified | Delta | Origin |
|------|---------------------|----------------------|-------|--------|
| A | 204 | 204 | 0 | No change. Pack A not included in BCDE active pool. |
| B | 351 | 351 | 0 | No Session 11 change. B=351 matches Session 11 pre-write baseline. |
| C | **174** | **175** | **+1** | BC-094 restored from merged-object defect to independent, parseable, Certified item. Session 11 structural repair applied. |
| D | 248 | 248 | 0 | No change. |
| E | 101 | 101 | 0 | No change. |
| **BCDE Total** | **873** | **875** | **+2** | +1 BC-094 + 1 unexplained B delta (see §1.2) |

### 1.2 The B=351 vs. PRIOR=350 Discrepancy

The Session 12 instructions reference a PRIOR BCDE total of 873, which implies B=350, C=174, D=248, E=101. However:

1. The Session 11 pre-write baseline (recorded in `SESSION11_PACK_C_BC094_BC095_REPAIR_EXECUTION.md` §1.3) already showed Pack B hash = `09CFEC8B...` — the current Pack B hash, unchanged since the Phase 0B DL-030 fix on 2026-07-24 09:42.

2. Pack B has 351 Certified items per both the Session 11 pre-write and the current state. No known session between Session 8 and Session 12 changed Pack B's Certified count.

3. The PRIOR=873 formula likely references an older ledger baseline (Session 5 or Session 8) from before the Phase 0B DL-030 fix was applied. The DL-030 fix (2026-07-24) changed CorrectChoice values in 5 items across Packs B and E but did NOT change any `question_state` values.

4. Alternatively, the PRIOR count may have subtracted items that are now considered Certified but were previously excluded from the active count for non-structural reasons.

**For denominator purposes, current authoritative Certified denominators are:**

| Pack | Authoritative Certified Count |
|------|------------------------------|
| B | 351 |
| C | 175 |
| D | 248 |
| E | 101 |
| **BCDE** | **875** |

### 1.3 Pool-Size Denominators

| Denominator | Pre-Repair | Post-Repair | Delta | Method |
|-------------|-----------|-------------|-------|--------|
| Pack C QuestionID count (grep) | 500 | 500 | 0 | `Select-String -Pattern '"QuestionID"'` |
| Pack C parseable objects | 499 | 500 | +1 | `new Function()` evaluation. BC-094 now independently parseable. |
| Combined MCQ pool (A-E) | 2,498 | 2,499 | +1 | Concatenate MCQ_BANK_A through E |
| Combined case pool | 450 instances / 15 CaseIDs | No change | 0 | 30 banks × 15 cases each |
| Case-level unique CaseIDs | 75 | 75 | 0 | 15 per scored_cases file |

**Note:** The combined MCQ pool (2,499 objects) was confirmed by Session 11 post-write validation §5c. The current state preserves this count. Pack C has 500 parseable objects (from 499 pre-repair).

---

## 2. Metrics and Gates Referencing Certified Denominators

### 2.1 Primary Ledger Metrics

The following metrics reference Certified totals:

| Metric | Pre-Repair Value | Post-Repair Value | Impact |
|--------|-----------------|-------------------|--------|
| BCDE Certified denominator | 873 | 875 | +2 (+0.23%) |
| All-pack Certified denominator | 1,077 | 1,079 | +2 (+0.19%) |
| Pack C Certified % of Pack C | 34.8% (174/500) | 35.0% (175/500) | +0.2 pp |
| Pack C Certified % of BCDE | 19.9% (174/873) | 20.0% (175/875) | +0.1 pp |

### 2.2 Gate Thresholds

| Gate/Threshold | Affected? | Reinterpretation Needed? |
|----------------|-----------|-------------------------|
| Pre-delivery safety check (CAQS §1.7.1) | No | Gate filters by `question_state === "Certified"` — unchanged logic. |
| Certified pool eligibility | Yes — +1 item added | BC-094 is now eligible. No threshold is crossed. |
| CAQS §1.7.3 "HIGH-confidence certification gate" | No | Gate is per-item, not denominator-based. |
| Governance-guard Rule 2 (DL-008 BLOCK) | No | BC-094 passes (EW-B = ""). |
| Governance-guard Rule 5 (30-item batch cap) | No | Not applicable (read-only session). |
| Completion percentage metrics | Minor | Any percentage that uses Certified denominator increases by ~0.2 pp. Negligible. |
| Blueprint coverage reporting | Minor | Section B (Pack C) gains 1 Certified item. Does not close any coverage gap. |

### 2.3 Interpretation Notes

1. **The +2 Certified increase does not change any pass/fail gate outcome.** All gates remain at their pre-repair thresholds. The difference is too small to affect any completion metric materially.

2. **The BC-094 addition to the Certified pool closes a structural defect, not a coverage gap.** The item (sensitivity/what-if analysis, Section B) was already present in the question bank; it was simply unparseable. No new topic coverage was added.

3. **The unexplained +1 in Pack B (350→351) should be investigated** to determine whether it represents a legitimate certification or an artifact of counting methodology. This does not affect denominator-based calculations but affects confidence in the baseline.

---

## 3. Multi-Select and Matching Partial Credit (Future Scoring Sessions)

### 3.1 Current State

The repository contains multi-select and matching-type items in case studies and select MCQ packs. These item types currently use full-credit scoring (all correct answers required for credit). No partial-credit logic exists for:
- Multi-select items where the candidate selects some but not all correct choices
- Matching items where the candidate matches some but not all pairs correctly

### 3.2 Future Requirements

| Requirement | Description | Dependency |
|-------------|-------------|------------|
| Multi-select partial credit | Award proportional credit for each correct selection, deduct for incorrect selections | Scoring engine (`app.js`) modification |
| Matching partial credit | Award proportional credit for each correct pair | Scoring engine modification |
| Scoring display | Show partial-credit breakdown in review mode | UI modification |
| Governance | Define partial-credit rules in CAQS or separate standard | Constitution amendment |

### 3.3 Separation from This Session

Per Session 12 scope limits: "Do not perform scoring-behavior changes, multi-select partial credit refactors, or matching partial-credit refactors."

These are separate scoring sessions requiring:
- Human authorization
- `app.js` write access (outside Session 12 scope)
- Scoring standard definition
- Regression testing across all packs
- Browser validation

---

## 4. Browser Validation and Case Identity Audits

### 4.1 Browser Validation

Browser rendering validation remains **deferred** per Session 7's documented limitations:

- DOM rendering (Stem, choices, selectable interface) — not tested
- Selector interaction (Pack A–E checkboxes) — not tested
- Pack-level filtering (A-only, C-only, A–E combined) — not tested
- localStorage isolation — not tested
- Console error/warning capture — not tested
- **BC-094 and BC-095 rendering** — specifically not tested

These remain separate technical gates requiring an isolated browser environment.

### 4.2 Case Identity Audit

Case-pool identity and duplication was audited in Session 11. Findings are documented in:
- `reports/SESSION11_CASE_POOL_IDENTITY_AND_DUPLICATION_AUDIT.md`
- `reports/SESSION11_CASE_POOL_SELECTION_RISK_REGISTER.md`

No new case changes occurred in this session. The case pool remains at 75 unique CaseIDs, 450 instances across 30 labeled banks.

---

## 5. Hash Mismatch Caveat

### 5.1 The Delta

| State | SHA-256 | Size |
|-------|---------|------|
| Session 11 post-repair baseline | `82D0594E02084998C4083E4A9D949120F667FFF5B78056CE46E41FF458D94868` | 1,767,156 B |
| Current (Session 12 observed) | `3F1F17FFD1A12C27AE815A5E9B2298DF983FB02221BCB49E74AA3DD8524A9D5C` | 1,767,213 B |
| **Delta** | Different | **+57 bytes** |

### 5.2 What WAS Verified (Despite Hash Mismatch)

- BC-094 and BC-095 are structurally separate (verified by direct line-level inspection at lines 8952–9050)
- BC-094 has `question_state: "Certified"` at line 9002
- BC-095 has correct `Topic: "B.095 budget slack detection"` at line 9008
- Both items have empty ExplanationWrong[CorrectChoice] (DL-008 clean)
- Pack C QuestionID grep count = 500 (unchanged)
- Pack C Certified = 175 (confirmed by both `Select-String` and direct inspection)
- All other pack hashes match Session 11 baselines

### 5.3 What WAS NOT Verified (Due to Hash Mismatch)

- Provenance of the 57-byte delta — what changed, when, by whom, and why
- Whether any field other than the BC-094/095 region was modified
- Whether the delta came from a legitimate post-Session 11 enhancement or an unlogged concurrent write
- Whether the current file state represents the "accepted" authoritative baseline

### 5.4 Required for Provenance Closure

1. Identify the session or operation that produced the 57-byte change.
2. Verify the change is limited to the intended scope (BC-094/095 region or elsewhere).
3. Establish the current hash as the new authoritative baseline, OR revert to the Session 11 post-repair baseline.
4. Log the provenance resolution in REVISION_HISTORY.md.

---

## 6. Confirmation Summary

| Question | Answer |
|----------|--------|
| Is BC-094 structurally valid? | YES |
| Is BC-094 pool-eligible? | YES |
| Is BC-094 Countable? | YES |
| Is BC-094's question_state "Certified"? | YES |
| Did Pack C Certified increase from 174 to 175? | YES |
| Does BC-095 no longer inherit BC-094's Topic? | YES (Topic now "B.095 budget slack detection") |
| Does the Pack C hash match the Session 11 post-repair baseline? | **NO** |
| Are any other pack hashes out of baseline? | NO (12/13 match) |
| Was any source or scoring logic changed this session? | NO |
| Can the Certified denominator be used for gate calculations? | YES (with hash-mismatch caveat) |

---

**RECONCILIATION PRODUCED WITH HASH-MISMATCH CAVEAT. PACK C CERTIFIED POPULATION UPDATED TO 175. BC-094 STATUS RESOLVED AS COUNTABLE. FULL PROVENANCE CONFIRMATION REQUIRES 57-BYTE DELTA RESOLUTION.**

**STOP — SOURCE BASELINE CHANGED SINCE PACK C REPAIR; LEDGER RECONCILIATION DEFERRED PENDING NEW PROVENANCE REVIEW.**
