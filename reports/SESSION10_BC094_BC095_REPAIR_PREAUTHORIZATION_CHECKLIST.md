# Session 10 — BC-094 / BC-095 Repair Pre-Authorization Checklist

**Date:** 2026-07-24
**Session Status:** `READ-ONLY — CHECKLIST COMPLETE; NO SOURCE WRITE AUTHORIZED OR PERFORMED`
**Reference Specification:** `reports/SESSION10_BC094_BC095_EXACT_REPAIR_SPECIFICATION.md`

---

## 1. PRE-FLIGHT VERIFICATION — ALL GATES PASSED

| # | Gate | Method | Result | Status |
|---|------|--------|--------|--------|
| 1 | Pack C SHA-256 captured | `Get-FileHash -Algorithm SHA256` | `C934FD694CF718AF0D85F838AB350199385610A60D0DC9662DC9C47A8516ECE8` | PASS |
| 2 | SHA-256 matches Session 8 baseline | Direct comparison | Match confirmed | PASS |
| 3 | SHA-256 stable during Session 10 | Re-verified mid-session | Unchanged | PASS |
| 4 | Byte size confirmed | `(Get-Item ...).Length` | 1,767,306 | PASS |
| 5 | Encoding confirmed | BOM detection + first-byte check | UTF-8 without BOM | PASS |
| 6 | Line endings confirmed | CRLF/LF count | CRLF: 27,721 pairs, LF-only: 52 | PASS |
| 7 | BC-094 QuestionID line confirmed | `Select-String` | Line 8985 | PASS |
| 8 | BC-095 QuestionID line confirmed | `Select-String` | Line 9028 | PASS |
| 9 | BC-093 boundary confirmed | `Select-String` + line read | Line 8933 (closes at 8951) | PASS |
| 10 | BC-096 boundary confirmed | `Select-String` + line read | Line 9080 (opens at 9047) | PASS |
| 11 | Merge point confirmed | Line-level inspection | Line 8999 → 9000, no `}, {` | PASS |
| 12 | QID reference count | `Select-String -Pattern '"QuestionID"'` | 500 | PASS |
| 13 | Certified count | `Select-String -Pattern '"question_state": "Certified"'` | 174 | PASS |
| 14 | Concurrent writes detected | Session-time file monitor | None | PASS |
| 15 | No source file modified | Session-time write audit | Zero writes to any file | PASS |

---

## 2. ROLLBACK BACKUP INVENTORY

### 2.1 Primary Rollback Candidates (Same Byte Size as Current)

| Backup File | Size (bytes) | SHA-256 | Timestamp |
|------------|-------------|---------|-----------|
| `pack_c_corrected.js.bak-20260723223329` | 1,767,306 | `9B8E8C679F2F3E5942AB41B0B721F9BA264F07CDD3B1ECA72CC508C42CD8ADD1` | 2026-07-23 19:26:26 |
| `pack_c_corrected.js.bak-session4-s3blk02-20260724112135` | 1,767,306 | `9B8E8C679F2F3E5942AB41B0B721F9BA264F07CDD3B1ECA72CC508C42CD8ADD1` | 2026-07-23 19:26:26 |
| **Current live file** | **1,767,306** | **`C934FD69...6ECE8`** | **2026-07-24 11:22:19** |

**Note:** The two same-size backups have identical SHA-256 (`9B8E8C...`) but differ from the current live file (`C934FD...`). This means they were taken at an earlier state (Session 4 pre-write snapshot, 2026-07-24 11:21:35) before the Session 4 block-2 write that changed Pack C.

### 2.2 Most Recent Pre-Change Backup

| Backup | Path | SHA-256 | Date |
|--------|------|---------|------|
| Session 4 pre-write | `pack_c_corrected.js.bak-session4-s3blk02-20260724112135` | `9B8E8C679F2F3E5942AB41B0B721F9BA264F07CDD3B1ECA72CC508C42CD8ADD1` | 2026-07-24 11:21:35 |

### 2.3 Historical Backups (Descending by Timestamp)

| Backup File | Size | SHA-256 (first 16 chars) | Date |
|------------|------|--------------------------|------|
| `pack_c_corrected.js.bak-20260723223329` | 1,767,306 | `9B8E8C679F2F3E59...` | 2026-07-23 |
| `pack_c_corrected.js.bak-20260723191906` | 1,756,262 | `3C2A81D71F9CC8AF...` | 2026-07-23 |
| `pack_c_corrected.js.bak-20260723185655` | 1,720,230 | `26B3F0939C814CD7...` | 2026-07-23 |
| `pack_c_corrected.js.bak-20260723184906` | 1,694,558 | `606E2205538E5516...` | 2026-07-23 |
| `pack_c_corrected.js.bak-20260723183915` | 1,675,122 | `813AD96C4BB82075...` | 2026-07-23 |
| `backups\pack_c_corrected.js.bak-20260723DL026P2` | 1,717,364 | `61983998F09B68D6...` | 2026-07-23 |
| `backups\pack_c_corrected.js.bak-dl013v1-20260723134147` | 1,874,224 | `C52099C4FE8791B1...` | 2026-07-23 |
| `backups\pack_c_corrected.js.bak-phase1-20260723121219` | 2,003,406 | `DAAF3C4BA55BF620...` | 2026-07-23 |

**Recommendation for repair session:** Create a new timestamped backup from the current live file before any modification.

---

## 3. REPAIR OPTION RECOMMENDATION

### Recommended: Option B — STRUCTURAL SPLIT PLUS MECHANICAL FIELD REASSOCIATION

**Rationale:**

1. **Restores structural integrity** — Two independent objects replace one merged object. Object count goes 499 → 500. QID count stable at 500.

2. **Zero content authoring** — No new explanatory text is written. All mechanical fields are deterministically sourced (content block, sequential pattern, Section B certification).

3. **Preserves all source content** — Every existing line 8952–9046 is preserved. The only change to existing content is clearing EW-B to "" (DL-008 enforcement — mechanical, not editorial).

4. **Deferred editorial work is scoped and non-blocking** — Three EW fields flagged for later editorial pass. All three are documented in the specification with exact line references and issue descriptions.

5. **Makes BC-094 pool-eligible** — After repair, BC-094 has question_state="Certified" and meets the structural requirements for learner delivery.

6. **Fixes BC-095 Topic contamination** — BC-095's Topic changes from "B.094 what if sensitivity analysis" (BC-094's value) to "B.095 budget slack detection" (correct).

7. **Minimal risk** — Only 2 discrete changes: one insertion (boundary split + field fills) and one line modification (EW-B clear). No adjacent objects touched. Byte-level scope limited to lines 8952–9046.

### Why Not Option A (Split Only)

Option A splits the boundary but leaves both objects with missing fields. BC-094 lacks question_state (excluded from pool). BC-095 lacks Part/Section/SectionName/Topic (likely breaks navigation or topic display). The split would succeed but neither object would be properly functional. Saves zero editorial work while creating two incomplete objects.

### Why Not Option C (With Editorial Completion)

Option C adds editorial content authoring (EW-A rewrite for BC-094, EW-D authoring for BC-094, EW-B rewrite for BC-095) to the structural repair. This conflates two separate governance workflows:
- Structural repair → Validator authority
- Content authoring → Accountant + Psychometrician + Editor authority

The editorial work requires accounting-subject-matter judgment and should be performed in a separate, properly-scoped session after the structural repair is independently verified.

---

## 4. PRE-AUTHORIZATION DECISION CHECKLIST

### 4.1 Human Reviewer Must Confirm

| # | Question | Reference |
|---|----------|-----------|
| 1 | Has the SHA-256 been independently verified? | §1, Gate 1 |
| 2 | Is the merge point at line 8999/9000 confirmed? | Specification §2.2 |
| 3 | Are the 4 mechanical field fills for BC-094 acceptable? | Specification §7.1, items 1-3 |
| 4 | Are the 4 mechanical field fills for BC-095 acceptable? | Specification §7.1, items 4-7 |
| 5 | Is the EW-B → "" change for BC-094 acceptable? | Specification §8.3 |
| 6 | Is the BC-095 Topic = "B.095 budget slack detection" inference accepted? | Specification §4.1 item 4, Registry line 1251 |
| 7 | Are the three deferred editorial items acceptable to defer? | Specification §7.2, items E1-E3 |
| 8 | Is Option B (mechanical only, no editorial authoring) the chosen approach? | Specification §11 |
| 9 | Are the post-write verification checks (17 items) sufficient? | Specification §12.4 |
| 10 | Are the rollback conditions acceptable? | Specification §12.6 |
| 11 | Is the recommendation to defer editorial work to a separate session accepted? | Specification §11, Option C analysis |
| 12 | Has a timestamped backup been created before proceeding? | Specification §12.2 |

### 4.2 Authorization Statement (To Be Completed by Human)

```
[ ] AUTHORIZED — Proceed with Option B structural repair per specification.
    Write-authorized session may begin.

    Authorized by: _______________
    Date: _______________
    Time: _______________

[ ] NOT AUTHORIZED — Reason: _______________
```

---

## 5. POST-REPAIR EXPECTED STATE

| Metric | Pre-Repair (Current) | Post-Repair (Expected) |
|--------|---------------------|----------------------|
| QID count (grep) | 500 | 500 |
| Parsed object count | 499 | 500 |
| "question_state": "Certified" | 174 | 175 |
| BC-094 question_state | (absent / overwritten) | "Certified" |
| BC-095 question_state | "Certified" | "Certified" |
| BC-094 EW-B | Non-empty (budget slack text) | "" |
| BC-095 EW-C | "" | "" |
| BC-094 ChoiceD (metadata) | Absent | "Responsibility accounting..." |
| BC-094 EW-D | Absent | "" |
| BC-095 Topic | "B.094 what if..." (contaminated) | "B.095 budget slack detection" |
| BC-095 DL-008 | 0 (EW-C="") | 0 (unchanged) |
| BC-094 DL-008 | 1 (EW-B non-empty) | 0 (EW-B="") |
| BC-094 DL-010 | 2 (EW-A budget slack, EW-B budget slack) | 1 (EW-A budget slack — deferred; EW-B is now CC slot) |
| BC-095 DL-010 | 1 (EW-B misattribution) | 1 (deferred) |
| MCQ pool size | 2,498 | 2,499 |
| Pack C Certified in pool | 174 | 175 |

---

## 6. DEFERRED EDITORIAL WORK TRACKING

The following three items are deferred to a separate content-quality pass (NOT part of the structural repair):

| ID | QID | Field | Issue | Priority |
|----|-----|-------|-------|----------|
| EDIT-001 | BC-094 | `ExplanationWrongA` | Currently describes budget slack ("A department consistently beating its budget by a wide margin..."). Must be rewritten to describe why "Standard costing, which sets a single fixed benchmark" is NOT sensitivity (what-if) analysis. | MEDIUM — learner sees wrong-topic feedback for distractor A |
| EDIT-002 | BC-094 | `ExplanationWrongD` | Empty string. Must be authored to describe why "Responsibility accounting, which assigns costs to managers" is NOT sensitivity (what-if) analysis. | MEDIUM — learner sees no feedback for distractor D |
| EDIT-003 | BC-095 | `ExplanationWrongB` | DL-010 misattribution. References "discontinue budgeting" (ChoiceD) instead of "external auditors approved the budget" (ChoiceB). Must be rewritten to address why external auditor budget approval is not the correct investigation. | MEDIUM — learner sees misleading feedback for distractor B |

---

## 7. CONCURRENCY SAFETY

### 7.1 Stop Conditions During Write Session

| Condition | Action |
|-----------|--------|
| Any other session begins writing to `pack_c_corrected.js` | STOP immediately — do not proceed with repair |
| Any other session begins writing to any pack file | STOP — verify no cross-pack dependency |
| Any other session begins writing to `app.js` or `index_updated.html` | STOP — delivery mechanism may change |
| Any other session begins writing to a scored-case file | STOP — case-study dependency may exist |
| SHA-256 of live Pack C changes before repair begins | STOP — source changed after specification |
| Any pre-write check fails | STOP — do not attempt repair with failed preconditions |

### 7.2 Session Isolation Requirements

- Repair session is the ONLY session with write access to the repository
- All other sessions (browser UI validation, case audit, ledger reconciliation) must be read-only
- If a read-only session completes during the repair, it must not trigger automatic saves or file modifications

---

## 8. FINAL PRE-FLIGHT RE-VERIFICATION (Session 10 Close)

| Check | Time | Value | Status |
|-------|------|-------|--------|
| SHA-256 re-verify | 2026-07-24 | `C934FD69...6ECE8` | **PASS — unchanged** |
| Byte size re-verify | 2026-07-24 | 1,767,306 | **PASS — unchanged** |
| No source writes during Session 10 | 2026-07-24 | 0 write operations | **PASS — read-only session** |

**ALL PRE-FLIGHT GATES PASS. REPAIR SPECIFICATION IS VALID. READY FOR HUMAN AUTHORIZATION.**

---

*Generated 2026-07-24 — Session 10, read-only pre-authorization checklist*
