# Session 101P — Rollback Strategy

**Date:** 2026-07-31
**Session Type:** Read-Only Planning (Governance Light Lane)
**Reference:** `reports/SESSION101P_EXECUTION_PLAN.md`, `reports/SESSION101P_RECLASSIFICATION_BATCHES.json`

---

## 1. Rollback Philosophy

Metadata-only changes are inherently low-risk — they modify field values (strings and integers), not content (stems, choices, explanations, answer keys). A rollback is a simple field-value restoration from the timestamped backup.

**Principle:** Every batch is independently rollback-able. No batch depends on the success of a prior batch's write to be valid (batches are additive, not cumulative on the same items).

---

## 2. Backup Protocol

### 2.1 Per-Batch Backup

Before every batch write (per BACKUP_PROTOCOL.md):

```
1. Copy target pack file to timestamped backup:
   backups\pack_X_corrected.js.bak-SESSIONSESSIONNUMBER-YYYYMMDDHHMMSS

2. Verify backup:
   - File exists
   - Non-zero size
   - SHA-256 hash matches source file

3. Log backup path in batch execution log
```

### 2.2 Backup Retention

| Backup Type | Retention | Rationale |
|-------------|-----------|-----------|
| Pre-batch backup (every batch) | Retain until S106P verification complete | Allows rollback of any individual batch |
| Pre-session backup (start of each session) | Retain permanently (`backups/` directory) | Full-session restoration point |
| Pre-program backup (start of S102P, before any PHASE_0 writes) | Retain permanently | Complete reclassification program restoration point |

### 2.3 Pre-Program Baseline Backup (S102P T0)

Before ANY writes (first operation of S102P):

```
backups\pack_a_corrected.js.bak-S102P-PREPROGRAM-20260731
backups\pack_b_corrected.js.bak-S102P-PREPROGRAM-20260731
backups\pack_c_corrected.js.bak-S102P-PREPROGRAM-20260731
backups\pack_d_corrected.js.bak-S102P-PREPROGRAM-20260731
backups\pack_e_corrected.js.bak-S102P-PREPROGRAM-20260731
```

These are the definitive restoration points if the entire reclassification program must be rolled back.

---

## 3. Rollback Scenarios

### 3.1 Scenario A: Batch Fails Validation (Single Batch Rollback)

**Trigger:** Post-batch validation fails (`node --check`, QID count, governance guard, or preflight).

**Response:**
1. Discard modified pack file
2. Restore from pre-batch backup: `Copy-Item backups\pack_X.bak-SESSION-BATCH-* pack_X_corrected.js`
3. Re-run preflight to confirm clean
4. Investigate root cause
5. Re-execute batch after fix

**Impact:** Minimal — single batch (~28 items) lost. ~20 minutes to re-execute.

### 3.2 Scenario B: Late-Discovered Systematic Error (Multi-Batch Rollback)

**Trigger:** Verification phase (S106P) discovers a systematic labeling error affecting multiple batches (e.g., AF-3 gate logic incorrectly classified a pattern of items).

**Response:**
1. Identify all affected batches from batch logs
2. Restore each pack file to pre-affected-batch backup
3. Re-execute affected batches with corrected classification logic
4. Re-verify

**Impact:** Moderate — ~2-4 batches re-executed. ~1-2 hours.

### 3.3 Scenario C: Full Program Rollback (Catastrophic)

**Trigger:** Fundamental methodology error discovered post-execution (e.g., S95P rubrics found to be flawed, requiring re-audit of all items).

**Response:**
1. Restore all 5 pack files from S102P PRE-PROGRAM backups
2. Re-run preflight → confirm pre-program baseline restored
3. Re-examine methodology before re-executing

**Impact:** High effort, zero data loss. All 5 pack files restored to known-good state.

---

## 4. Rollback Granularity Matrix

| What Changed | Rollback Unit | Restoration Method |
|-------------|--------------|-------------------|
| Single item mislabeled | Manual edit — revert that item's CognitiveLevel field | `edit` tool targeting the specific QID |
| Single batch (≤30 items) mislabeled | Pre-batch backup restoration | Restore pack file from `bak-SESSION-BATCH-*` |
| Entire session mislabeled | Pre-session backup restoration | Restore pack file from `bak-SESSION-PRE-*` |
| Entire program (all 5 packs) | S102P PRE-PROGRAM backup restoration | Restore all 5 files from `bak-S102P-PREPROGRAM-*` |

---

## 5. Safe Rollback Verification

After any rollback, verify:

- [ ] Pack file `node --check` passes
- [ ] QID count unchanged (`grep -c '"QuestionID"'`)
- [ ] All CognitiveLevel values are valid (Remember, Understand, Apply, Analyze, Evaluate)
- [ ] No question_state changes (grep for "Certified" count matches pre-program)
- [ ] No ExplanationWrong fields modified (DL-008/DL-026 scan clean)
- [ ] Preflight passes with 0 unauthorized divergences
- [ ] Governance guard test suite passes

---

## 6. Rollback Decision Authority

| Decision | Authority | Notes |
|----------|-----------|-------|
| Single batch rollback | Session agent | Automatic on validation failure — no human authorization needed |
| Multi-batch rollback (2-4 batches) | Session agent → user notification | Report affected batches and reason. Wait for user confirmation. |
| Full program rollback (all 5 packs) | User only | Requires explicit user authorization with phrase "restore the pre-program backups" |

---

## 7. Mitigations Built Into the Plan

| Risk | Mitigation | How It Prevents Rollback |
|------|------------|--------------------------|
| JSON corruption | String-aware parser. `node --check` after every batch. | Catches corruption before next batch starts. Single-batch rollback. |
| Wrong item targeted | QID list per batch. Exact field-level replacement (CognitiveLevel only). | No risk of modifying wrong item. Field-level narrowing. |
| Content leak (explanation/answer mod) | Batch protocol explicitly restricts writes to CognitiveLevel + DifficultyScore. | Agent instructions prohibit touching any other field. |
| Concurrent write | File-lock per session. No two sessions write same pack. | Prevents simultaneous writes. |
| Governance guard violation | Pre-write governance guard run. Post-write governance guard run. | Catches Rule 2/5/6 violations before they persist. |
| QID count drift | grep -c "QuestionID" before and after. | Catches structural damage immediately. |

---

## 8. Rollback Log Template

Every rollback produces a log entry:

```markdown
## Rollback — [Session/Batch ID] — [Date/Time]

**Trigger:** [validation failure description]
**Scope:** [pack file(s), batch ID(s), items affected]
**Pre-rollback state:** [hash of modified file before rollback]
**Restoration source:** [backup path]
**Post-rollback hash:** [hash of restored file]
**Verification:** [preflight result, QID count, governance guard]
**Root cause:** [why the error occurred]
**Resolution:** [fix applied before re-execution]
```

---

## 9. Example Rollback Sequence

```
# Batch PH1-B1 fails governance guard (Rule 6 trigger on item P1E-C-013)

1. IDENTIFY: Batch PH1-B1, pack_c_corrected.js, 28 items
2. HALT: Stop batch execution. Do not proceed to PH1-B2.
3. LOG: Record failure in batch log
   → Rule 6 triggered: EW slot empty at non-CC position
   → QID: P1E-C-013
   → This is a DL-026 pre-existing defect, NOT caused by this batch
4. DECIDE: Batch affected 0 items in Section C of Pack C.
   → PH1-B1 targets Section EC (E). P1E-C-013 is Section C.
   → Rule 6 trigger was on an item NOT in this batch.
   → Governance guard was over-cautious on unrelated item.
5. RESOLVE: Re-run with guard that scopes to batch items only,
   OR: Fix P1E-C-013 DL-026 first (separate remediation),
   OR: Proceed — the trigger is pre-existing and unrelated to this batch.
6. RE-EXECUTE: Run batch again post-resolution.
```

---

*Generated: 2026-07-31 | Session 101P — Rollback Strategy Phase*
