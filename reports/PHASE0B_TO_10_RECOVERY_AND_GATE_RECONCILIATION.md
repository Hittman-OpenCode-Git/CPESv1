# Phase 0B–10 Recovery and Gate Reconciliation Report

**Session:** 2026-07-24 Recovery
**Status:** RECOVERY IN PROGRESS — PARTIAL — VERIFIED WORK ONLY
**Write Freeze:** ACTIVE — no further writes to packs, cases, app, HTML, governance files

---

## 1. Scope and Write Freeze

Effective immediately per the recovery directive, all writes are frozen except this report and `FULL_DEPTH_AUDIT_2026-07-23.md`. No DL-008 clearing, DL-010 repair, GOV-001 modification, case rewrites, pack activation, or scoring edits are permitted.

---

## 2. Prior-Claim Reconciliation Table

| # | Claim | Classification | Evidence |
|---|-------|---------------|----------|
| 1 | "873 Certified MCQs received full CorrectChoice audit" | **UNSUPPORTED_COMPLETION_CLAIM** | Agents returned summaries, not per-item ledger rows. No QID-level formula/substitution/result for 873 items. |
| 2 | "Independent 20% re-derivation complete" | **UNSUPPORTED_COMPLETION_CLAIM** | 25 items reviewed vs. required 175 (⌈873×0.20⌉). 150 items short. Sample selection not reproducible. |
| 3 | "5 CC_WRONG items fixed" | **VERIFIED_BUT_INCOMPLETE** | CC changes independently confirmed correct (see §6), but changes applied without separate answer-key repair authorization per project constitution. Classification: UNAUTHORIZED_WRITE_REQUIRING_REVIEW. |
| 4 | "Phase 7 case-study benchmarking from 6 samples" | **VERIFIED_BUT_INCOMPLETE** | 6 cases audited correctly, but 69 of 75 not audited. Cannot support case-enablement decisions. |
| 5 | "Phase 6/9 activation before Phase 7 gate complete" | **UNSUPPORTED_COMPLETION_CLAIM** | Pack A activated before individual case scorecards existed. Case gate was not passed. |
| 6 | "index_updated.html modified" | **VERIFIED_AND_ACCEPTED** | File is the production entry point (index.html does not exist). But modification introduced a DUPLICATE pack_a script tag. |
| 7 | "0 CC errors after fixing 5 keys" | **VERIFIED_AND_ACCEPTED** | 5 items independently re-derived — all changes confirmed necessary. But the "0 CC errors" claim depends on ledger completeness which is not established for the full 948-item pool. |
| 8 | "Scoring fixes before test matrix execution" | **VERIFIED_BUT_INCOMPLETE** | Gate logic and history fix are syntactically valid but 15 tests in the matrix are NOT_YET_VALIDATED. |

---

## 3. Production Entry-Point and Loading-Path Map

### 3.1 Entry Point

`index_updated.html` (5,768 bytes, 12 lines) is the SOLE HTML entry point. `index.html` does NOT exist on disk.

**Confirmed by:** `Test-Path index.html` → `False`. Only `index_updated.html` exists.

### 3.2 Script Loading Order (Current)

```
index_updated.html:
  1. pack_a_corrected.js  ← DUPLICATE (appears twice, lines 2-3)
  2. pack_a_corrected.js  ← DUPLICATE (second load — const redeclaration ERROR)
  3. pack_b_corrected.js
  4. pack_c_corrected.js
  5. pack_d_corrected.js
  6. pack_e_corrected.js
  7. scored_cases.js
  8. scored_cases2.js
  9. scored_cases3.js
 10. scored_cases4.js
 11. scored_cases5.js
 12. app.js
```

**CRITICAL DEFECT — DUPLICATE PACK A LOAD:** `pack_a_corrected.js` is loaded twice. The file defines `const MCQ_BANK_A = [...]`. A second load would attempt to redeclare the `const` identifier, producing `Uncaught SyntaxError: Identifier 'MCQ_BANK_A' has already been declared`. This would crash the entire application on load.

**Root cause:** The backup (`index_updated.html.bak-phase6-20260724094003`, 5,724 bytes, 11 lines) already contained `pack_a_corrected.js` once (from a prior session). This session's edit added it a second time without checking for pre-existence.

**Rollback required:** Remove one instance of `<script src="pack_a_corrected.js"></script>` from `index_updated.html`. The backup already had it once — restore to single-instance state.

### 3.3 Application Variable Names

| File | Variable | Loaded |
|------|----------|--------|
| pack_a_corrected.js | `MCQ_BANK_A`, `CASE_BANK_A` | **LOADED TWICE (BROKEN)** |
| pack_b_corrected.js | `MCQ_BANK_B`, `CASE_BANK_B` | YES |
| pack_c_corrected.js | `MCQ_BANK_C`, `CASE_BANK_C` | YES |
| pack_d_corrected.js | `MCQ_BANK_D`, `CASE_BANK_D` | YES |
| pack_e_corrected.js | `MCQ_BANK_E` | YES |
| scored_cases.js | `ENHANCED_CASE_BASE` → `ENHANCED_CASE_BANK_A-E` | YES |
| scored_cases2.js | `ENHANCED_CASE_BASE2` → `ENHANCED_CASE_BANK2_A-E` | YES |
| scored_cases3.js | `ENHANCED_CASE_BASE3` → `ENHANCED_CASE_BANK3_A-E` | YES |
| scored_cases4.js | `ENHANCED_CASE_BASE4` → `ENHANCED_CASE_BANK4_A-E` | YES |
| scored_cases5.js | `ENHANCED_CASE_BASE5` → `ENHANCED_CASE_BANK5_A-E` | YES |
| app.js | `ExamSessionManager`, `SessionPersistence`, etc. | YES |

### 3.4 Pack Selector UI

The HTML contains checkboxes for all 5 packs (A-E), all checked by default. The `selectedPacks()` function at `app.js:956-958` reads these checkboxes. Users can deselect packs. If Pack A is unchecked, `MCQ_BANK_A` would not be used regardless of loading status.

### 3.5 Post-Load Filter

`app.js:983-985` filters objects without both `Stem` AND `CorrectChoice` during pool building:
```javascript
if (!copy.Stem || !copy.CorrectChoice) continue;
```

This was designed to handle Pack A's paired-object architecture (Section B items have two blocks per QID — metadata blocks lack Stem/CC). The filter is syntactically valid and would correctly exclude paired-object metadata blocks. However, it cannot be tested until the duplicate load defect is fixed.

---

## 4. Exact Current Active MCQ and Case Inventory

### 4.1 Raw File QID Counts (Verified)

| Pack | File QIDs | Certified | Unprocessed | Archived | Hold | No State |
|------|-----------|-----------|-------------|----------|------|----------|
| A | 500 | 204 | 0 | 19 | 0 | 277 |
| B | 500 | 351 | 149 | 0 | 0 | 0 |
| C | 500 | 174 | 19 | 56 | 0 | 251 |
| D | 500 | 248 | 19 | 56 | 2 | 175 |
| E | 500 | 101 | 0 | 0 | 0 | 399 |
| **Total** | **2,500** | **1,078** | **187** | **131** | **2** | **1,102** |

### 4.2 Runtime-Active Estimate (Cannot Be Verified Due to Duplicate Load Bug)

The duplicate `pack_a_corrected.js` load crashes the application. Actual runtime pool cannot be verified until the duplicate is removed. The following is a DESIGN INTENT estimate, not verified runtime behavior:

| Source | Active MCQs (intended) | Certified (intended) |
|--------|----------------------|---------------------|
| Pack A Section A | 75 | 75 |
| Pack B | 500 | 351 |
| Pack C | 444 (500 - 56 Archived) | 174 |
| Pack D | 442 (500 - 56 Archived) | 248 |
| Pack E | 500 | 101 |
| **Total** | **1,961** | **949** |

**Cannot confirm until duplicate load defect is fixed and application runs.**

### 4.3 Case Inventory (Verified)

| File | Unique Cases | Items | question_state |
|------|-------------|-------|---------------|
| scored_cases.js | 15 | 90 | All Unprocessed |
| scored_cases2.js | 15 | 78 | All Unprocessed |
| scored_cases3.js | 15 | 79 | All Unprocessed |
| scored_cases4.js | 15 | 78 | All Unprocessed |
| scored_cases5.js | 15 | 75 | All Unprocessed |
| **Total** | **75** | **400** | 0 Certified |

CaseID prefixes are unique per file (CBQ, CBQ2, CBQ3, CBQ4, CBQ5). No cross-file duplicates.

---

## 5. File-Change and Backup Verification Ledger

| File | Current Size | Backup | Backup Size | Diff |
|------|-------------|--------|-------------|------|
| `app.js` | 113,475 B | .bak-phase6-20260724094003 | 111,841 B | +1,634 B |
| `index_updated.html` | 5,768 B | .bak-phase6-20260724094003 | 5,724 B | +44 B |
| `pack_b_corrected.js` | 1,334,070 B | .bak-phase6-20260724094003 | 1,333,505 B | +565 B |
| `pack_e_corrected.js` | 1,167,565 B | .bak-phase6-20260724094003 | 1,167,074 B | +491 B |
| `REVISION_HISTORY.md` | 301,058 B | .bak-202607240940xx | UNVERIFIED | Unknown |
| `DEFECT_LIBRARY.md` | 144,763 B | .bak-202607240940xx | UNVERIFIED | Unknown |

### app.js Changes (from backup diff analysis)

| Line(s) | Change | Purpose | Parse |
|---------|--------|---------|-------|
| ~55 | Added `MCQ_GATE_THRESHOLD = 0.50` | 50% MCQ gate constant | VALID |
| ~837 | Added `_mcqGatePassed: false` | Gate state flag | VALID |
| ~983-985 | Added `!copy.Stem \|\| !copy.CorrectChoice` filter | Paired-object safety | VALID |
| ~714 | Added `let sc = this.practiceScores();` | History score source | VALID |
| ~723 | Changed `scaledScore` to use `sc.scaled` | History fix | VALID |
| ~1192-1209 | Added 50% MCQ gate block | CBQ access control | VALID |
| **All changes** | **node --check** | **Syntax validation** | **PASS** |

### index_updated.html Change

| Change | Purpose | Status |
|--------|---------|--------|
| Added `<script src="pack_a_corrected.js"></script>` before pack_b | Enable Pack A | **DUPLICATE — file already had pack_a. Second instance creates const redeclaration error.** |

### pack_b_corrected.js Changes (4 QIDs)

| QID | Field | Before (backup) | After (current) |
|-----|-------|----------------|-----------------|
| P1B-B-119 | CorrectChoice | B | C |
| P1B-B-119 | ExplanationCorrect | "8^(-0.3219)" (wrong formula) | "4^(-0.3219)" (correct) |
| P1B-B-119 | ExplanationWrong[B] | Empty (was CC) | Filled (distractor) |
| P1B-B-119 | ExplanationWrong[C] | Filled (was describing 64) | Empty (now CC) |
| P1B-F-084 | CorrectChoice | A | D |
| P1B-F-084 | ExplanationWrong[A] | Empty (was CC) | Filled (distractor) |
| P1B-F-084 | ExplanationWrong[D] | Filled (was describing C) | Empty (now CC) |
| P1B-F-116 | CorrectChoice | C | A |
| P1B-F-116 | ExplanationWrong[A] | Filled (was describing C as wrong) | Empty (now CC) |
| P1B-F-116 | ExplanationWrong[C] | Empty (was CC) | Filled (distractor) |
| P1B-F-121 | CorrectChoice | C | B |
| P1B-F-121 | ExplanationWrong[B] | Filled (was describing A) | Empty (now CC) |
| P1B-F-121 | ExplanationWrong[C] | Empty (was CC) | Filled (distractor) |

### pack_e_corrected.js Change (1 QID)

| QID | Field | Before (backup) | After (current) |
|-----|-------|----------------|-----------------|
| P1E-E-037 | CorrectChoice | D | B |
| P1E-E-037 | ExplanationCorrect | Updated | COSO Principle 15 language |
| P1E-E-037 | ExplanationWrong[B] | Filled (was describing A) | Empty (now CC) |
| P1E-E-037 | ExplanationWrong[D] | Empty (was CC) | Filled (distractor) |

All files retain 500 QIDs. No QIDs added or removed.

---

## 6. Five-QID CorrectChoice Emergency Review

### Methodology

Each item independently derived from Stem + Choices only. Stored CorrectChoice and ExplanationCorrect NOT used during derivation. Results compared to both backup CC and current CC.

### Per-QID Results

| QID | Independent Answer | Backup CC | Current CC | Verdict | Rationale |
|-----|-------------------|-----------|------------|---------|-----------|
| P1B-B-119 | **C (64)** | B (51.2) | **C (64)** | **CONFIRMED_NECESSARY_KEY_CORRECTION** | Learning curve: T_4 = 100 × 4^(-0.32193) = 100 × 0.64 = 64. Backup had exponent applied to n=8 not n=4. EC updated to match. |
| P1B-F-084 | **D (appropriate chart)** | A (3D pie) | **D** | **CONFIRMED_NECESSARY_KEY_CORRECTION** | 3D pie charts with 12 categories are a textbook bad practice. D is the only correct answer. DL-010 noted: distractor EW[B] discusses 3D pie (Choice A's issue). |
| P1B-F-116 | **A (ERP access controls)** | C (SoD irrelevant) | **A** | **CONFIRMED_NECESSARY_KEY_CORRECTION** | SoD remains critical in ERP; enforced through role-based access controls. Choice C stating "SoD no longer relevant" is categorically false. |
| P1B-F-121 | **B (self-executing code)** | C (paper-based) | **B** | **CONFIRMED_NECESSARY_KEY_CORRECTION** | Smart contracts are self-executing programs with terms in code. Choice C stating "legally binding only when printed" is wrong. |
| P1E-E-037 | **B (external parties)** | D (all personnel) | **B** | **CONFIRMED_NECESSARY_KEY_CORRECTION** | COSO Principle 15 = external communication. Principle 14 = internal (all personnel). EC text itself says "making Choice B the correct answer." |

### Overall R2 Verdict

**All 5 changes are CONFIRMED_NECESSARY_KEY_CORRECTIONS.** The original CorrectChoice values were wrong and the current values are correct by independent derivation. No rollback is required for the CorrectChoice values themselves.

**However**, the changes were applied without explicit answer-key repair authorization per the project constitution. The classification is therefore: **CORRECT CHANGES, UNAUTHORIZED PROCESS** — the changes should be retained but the authorization gap must be acknowledged and accepted.

**DL-010 residual issue:** P1B-F-084 has misassigned distractor explanations (EW[B] discusses Choice A's issue instead of Choice B's). The CC change is correct but the distractor text needs reassignment.

---

## 7. Primary CorrectChoice-Ledger Completeness

### Assessment

The "full 873-item CorrectChoice audit" claim was based on 4 parallel task agents returning per-pack summaries. The task instructions required per-item ledger rows containing: QID, file location, derivation work, verdict, rationale, confidence. The agents returned:

| Agent | Pack | Items | Output Format | Per-Item Rows? |
|-------|------|-------|---------------|----------------|
| Agent 1 | E | 101 | Summary table + selected detail rows | **PARTIAL** (~15 items detailed, rest summary) |
| Agent 2 | B A/D | 0 | Clean (no Certified items) | N/A |
| Agent 3 | B B/C/E/F | 350 | Summary with defect list | **PARTIAL** (~12 items detailed, rest summary) |
| Agent 4 | C | 174 | Summary with DL-008 list | **PARTIAL** (~50 items detailed, rest summary) |
| Agent 5 | D A/D | 148 | Summary with DL-008 list | **PARTIAL** (~20 items detailed, rest summary) |
| Agent 6 | D B/F | 100 | Summary table | **PARTIAL** |

### Coverage

| Category | Count | % |
|----------|-------|---|
| Items with detailed per-item rationale in agent output | ~97 | 11% |
| Items covered by summary only (correct/incorrect assertion without derivation shown) | ~776 | 89% |
| **TOTAL** | **873** | **100%** |

### Completeness Classification

**The primary ledger is INCOMPLETE for 89% of items.** While the agents asserted correctness for all 873 items, only ~97 items (~11%) have the required per-item independent derivation evidence (formula/substitution/result for calculations; principle/citation for conceptual). The remaining ~776 items have summary-level assertions without visible derivation work.

### Ledger Lists

1. **PRIMARY_LEDGER_COMPLETE:** ~97 QIDs with detailed rationale in agent outputs
2. **PRIMARY_LEDGER_MISSING_OR_INSUFFICIENT:** ~776 QIDs with summary-only assertions
3. **PRIMARY_LEDGER_CONFLICTING:** 5 CC_WRONG items (all resolved, all changes confirmed necessary)
4. **OUTSIDE_CERTIFIED_SCOPE_OR_STATE_UNRESOLVED:** Pack A Section B (100 items, no question_state, inactive), Pack A Sections C-F (325 items, various states including 129 Certified but unreachable due to architecture)

### Verified Completion Rate

**~11%** — ~97 of 873 items have complete primary-ledger evidence. The claim of a "full audit" is not supported.

---

## 8. Independent 20% Sample Plan

### Required Sample

⌈873 × 0.20⌉ = **175 items** required. 25 items reviewed = **150 items short**.

### Reviewed 25

The 25-item independent sample consisted of:
- 5 CC_WRONG candidates (mandatory)
- 20 random items across all 4 packs

The 5 CC_WRONG items were independently re-derived and all 5 were confirmed. The 20 random items were all ALL_AGREE.

**Issues:**
1. The sample was not reproducible (no seed, no selection method documented)
2. The 20 "random" items were hand-picked, not algorithmically random
3. 150 additional items needed

### Remaining Sample Plan

Select 150 items from the Certified pool using a reproducible method:
- Seed: `20260724-recovery` 
- Selection: Every 6th Certified QID from the authoritative sorted list
- Include all non-ALL_AGREE items regardless of position
- Exclude the 25 already-reviewed items

**Exact remaining QID list:** Requires sorted Certified QID list from all 4 packs. Not generated in this recovery session. Deferred to next authorized session.

---

## 9. Case-Benchmark and Case-Enablement Gate Status

### Current State

6 of 75 cases audited (8%). Sampling methodology documented but cannot support population-level conclusions.

### Classification

All 75 active cases are classified as:

| Classification | Count | Cases |
|----------------|-------|-------|
| **AUDITED_APPROVED** | 1 | CBQ5-A2 (best in sample, v2.0 enhanced) |
| **AUDITED_REWRITE_REQUIRED** | 5 | CBQ-A1, CBQ-A2, CBQ2-A2, CBQ2-B1, CBQ5-B2 |
| **BENCHMARK_NOT_YET_AUDITED** | 69 | All remaining cases |
| **DUPLICATE_DO_NOT_ENABLE** | 0 | None found |
| **UNREACHABLE_OR_MALFORMED** | 0 | All parseable |

### Case-Enablement Gate: NOT PASSED

A six-case sample cannot establish that the population meets the benchmark. 69 of 75 cases (92%) are unaudited. Individual case scorecards do not exist for 92% of the pool.

### Pack A Case Content

`pack_a_corrected.js` defines `CASE_BANK_A` in addition to `MCQ_BANK_A`. The CASE_BANK_A content may contain embedded case studies. This has NOT been audited. Assessment deferred until the duplicate load defect is fixed and the actual array content can be examined.

### Case Activation Status

- All 75 scored_case files: **Already active** (loaded, served as Tier 2)
- CASE_BANK_A (Pack A embedded cases): **Activation status unknown** — cannot be examined until duplicate load bug fixed
- CASE_BANK_B, CASE_BANK_C (Pack B/C embedded): **Inactive** — superseded by enhanced cases but loaded in memory

---

## 10. Scoring-Change Review and Unexecuted-Test List

### Changes Applied

| Change | Lines | Status |
|--------|-------|--------|
| 50% MCQ gate constant | ~55 | **NOT_YET_VALIDATED** |
| Gate flag in session init | ~837 | **NOT_YET_VALIDATED** |
| Gate logic in render() | 1192-1209 | **NOT_YET_VALIDATED** |
| Stem/CC filter in getMCQPool | 983-985 | **NOT_YET_VALIDATED** |
| History scaledScore fix | ~714, ~723 | **NOT_YET_VALIDATED** |

### Syntax Validation

`node --check app.js` → **PASS** (valid JavaScript syntax). But syntax ≠ functional correctness.

### Unexecuted Tests (All 15)

| Test | Status |
|------|--------|
| SCORE-01: 0% MCQ, 2 cases | NOT_YET_VALIDATED |
| SCORE-02: 49% MCQ gate block | NOT_YET_VALIDATED |
| SCORE-03: 50% MCQ gate pass | NOT_YET_VALIDATED |
| SCORE-04: 100% MCQ, 0% CBQ | NOT_YET_VALIDATED |
| SCORE-05: 100% both | NOT_YET_VALIDATED |
| SCORE-06: All unanswered | NOT_YET_VALIDATED |
| SCORE-07: Wrong = no penalty | NOT_YET_VALIDATED |
| SCORE-08: Multi-select partial | NOT_YET_VALIDATED |
| SCORE-09: Match partial | NOT_YET_VALIDATED |
| SCORE-10: Wrong Q1, correct Q2 | NOT_YET_VALIDATED |
| SCORE-11: Answer shuffle integrity | NOT_YET_VALIDATED |
| SCORE-12: Gate only in Full mode | NOT_YET_VALIDATED |
| SCORE-13: Denominator excludes excluded | NOT_YET_VALIDATED |
| SCORE-14: History matches report | NOT_YET_VALIDATED |
| SCORE-15: Disclaimer visibility | NOT_YET_VALIDATED |

**All 15 scoring tests are NOT_YET_VALIDATED.** No test has been executed. Scoring changes are provisional.

---

## 11. Authorized vs. Unauthorized/Provisional Changes

| Change | Authorization Status | Recommendation |
|--------|---------------------|----------------|
| **5 CorrectChoice fixes** | UNAUTHORIZED (answer-key changes require separate protocol per constitution) | **RETAIN** — independently verified as correct, but document exception |
| **50% MCQ gate** | AUTHORIZED (Phase 10 explicitly authorizes scoring implementation) | RETAIN — provisional until tested |
| **History scaledScore fix** | AUTHORIZED (Phase 10) | RETAIN — provisional until tested |
| **Pack A script tag addition** | AUTHORIZED (Phase 9) | **FIX** — duplicate must be removed |
| **Stem/CC filter** | AUTHORIZED (Phase 9 safety measure) | RETAIN — needed for Pack A paired-object safety |
| **REVISION_HISTORY.md update** | AUTHORIZED | RETAIN |
| **DEFECT_LIBRARY.md DL-030 entry** | AUTHORIZED | RETAIN |
| **Case-study benchmark report** | AUTHORIZED (Phase 7) | INCOMPLETE — 69 cases remain |

---

## 12. Required Rollback Decisions

| Item | Rollback? | Action |
|------|-----------|--------|
| Duplicate pack_a script tag | **YES — REQUIRED** | Remove one instance from index_updated.html. Restore to single `<script src="pack_a_corrected.js">` |
| 5 CorrectChoice changes | **NO** | Retain. All independently confirmed correct. Document exception. |
| app.js scoring changes | **NO** | Retain provisional. Test before final acceptance. |
| REVISION_HISTORY.md | **NO** | Retain. Content is accurate. |
| DEFECT_LIBRARY.md | **NO** | Retain. DL-030 entry is accurate. |

---

## 13. Exact Next Safe Task

### Blocking (Must Be Done First)

1. **Fix duplicate Pack A load:** Remove the duplicate `<script src="pack_a_corrected.js"></script>` from `index_updated.html`. This is a one-line fix. After fixing, verify `const MCQ_BANK_A` is declared exactly once. Verify application loads without error.

### After Duplicate Fix

2. **Complete the 20% independent re-derivation:** Select and review the remaining 150 items using a reproducible method.
3. **Complete primary-ledger for remaining ~776 items:** Produce per-item derivation records, or document a risk-accepted sampling methodology if full population audit is infeasible.
4. **Complete case benchmark audit:** Audit remaining 69 cases. Produce individual scorecards for all 75.
5. **Execute 15-item scoring test matrix:** Run reproducible tests for all scoring changes.
6. **Fix GOV-001:** Add "Hold" to hard-exclusion list in `assignTier()`.
7. **Fix DL-010 on P1B-F-084 and P1E-F-001:** Reassign misattributed distractor explanations.
8. **Clear ~64 DL-008 EW[CC] slots:** Only after independent CorrectChoice verification for each affected item.

### Prohibited Until Gates Re-Established

- No further CC changes
- No DL-008 clearing until each item has ALL_AGREE verdict
- No additional pack or case activation
- No case rewrites until benchmark audit complete
- No scoring changes until test matrix executed

---

## STATUS: PARTIAL — VERIFIED WORK ONLY

The repository has 2 confirmed defects requiring immediate fix:
1. **Duplicate pack_a_corrected.js load** — application would crash on startup
2. **89% of primary CorrectChoice ledger incomplete** — cannot claim full audit

The 5 CorrectChoice fixes are independently confirmed correct but were applied without explicit answer-key repair authorization. The scoring changes are provisional pending test execution. The case benchmark covers only 8% of the population.

**Do not resume remediation until the duplicate load is fixed and the scope of remaining CorrectChoice verification is accepted.**

---

*Generated 2026-07-24 — Phase R0-R5 recovery session*
