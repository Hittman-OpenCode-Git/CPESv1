# ORDERED_PATTERN_WAVE4_PLAN.md

**Session:** 82P — Ordered-Pattern Remediation Automation Analysis
**Generated:** 2026-07-30
**Governance Lane:** Full Governance Lane (remediation execution phase)
**Precedes:** Session 83 (Wave 4 Execution)
**Inputs:** MATCHING_AUTOMATION_FEASIBILITY.md, MATCHING_AUTOMATION_SPEC.md, MATCHING_REMEDIATION_BATCHES.json

---

## 1. Objective

Execute a mechanical RightItems shuffle across all 75 remaining Class C (ordered-pattern cueing) matching items, eliminating positional answer cues with zero content changes.

---

## 2. Pre-Conditions (Must Be True Before Wave 4 Starts)

| Condition | Verified By | Status |
|-----------|-------------|--------|
| Session 81 Wave 1 complete (6 Class A/B items resolved) | MATCHING_ITEM_AUDIT.json re-scan | COMPLETE |
| `npm run preflight` returns 0 divergences | Automated check | COMPLETE (Session 81 closeout) |
| Governance guard test suite: 54/54 PASS | `node scripts/test_governance_guard.js` | COMPLETE |
| No concurrent case pack edits in progress | Session coordination | TO CONFIRM at T0 |
| `remediate_ordered_matching.js` prototype validated | Prototype dry-run passes | TO EXECUTE (this session) |
| All 5 case pack files backed up | Timestamped `.bak` files exist | TO EXECUTE at T0 of Session 83 |

---

## 3. Batch Plan

### 3.1 Batch Design

75 items ÷ 28 max per governance-guard Rule 5 = **3 batches**.

| Batch | File | Items | Sections | ItemIDs |
|-------|------|-------|----------|---------|
| **4A** | `scored_cases.js`, `scored_cases2.js` | 22 | A–B, partial C | CBQ-A2-Q6, CBQ-A3-Q6, CBQ-B2-Q6, CBQ2-A2-Q4, CBQ2-B2-Q6, CBQ2-B3-Q6, CBQ-C1-Q6, CBQ-C2-Q6, CBQ-C3-Q5, CBQ2-C1-Q2, CBQ2-C1-Q3, CBQ2-C1-Q4, CBQ2-C1-Q5, CBQ2-E1-Q1, CBQ2-E1-Q2, CBQ2-E1-Q3, CBQ2-E1-Q4, CBQ2-E1-Q5, CBQ-D1-Q6, CBQ-D2-Q6, CBQ-E2-Q5, CBQ-F1-Q4 |
| **4B** | `scored_cases3.js` | 27 | A–F | All CBQ3 match items except Wave 1 exclusions (CBQ3-A2-Q5, CBQ3-D1-Q6 already resolved). Includes: CBQ3-A2-Q5 (excluded), CBQ3-B2-Q6, CBQ3-B3-Q6, CBQ3-C1-Q1/2/3/4/5, CBQ3-C2-Q4, CBQ3-C3-Q4, CBQ3-D2-Q6, CBQ3-E1-Q1/2/3/4/5, CBQ3-E2-Q4, CBQ3-F2-Q1, CBQ3-F2-Q5 |
| **4C** | `scored_cases4.js`, `scored_cases5.js` | 26 | A–F | CBQ4-A1-Q3, CBQ4-B2-Q6, CBQ4-C2-Q1/2/3/4/5, CBQ4-D1-Q6, CBQ4-D2-Q6, CBQ4-D3-Q4, CBQ4-E2-Q1, CBQ4-E2-Q4, CBQ4-E3-Q4, CBQ4-F1-Q1, CBQ4-F1-Q5, CBQ5-B1-Q2, CBQ5-C2-Q1/2/3/4/5, CBQ5-D1-Q1/2/3/4/5, CBQ5-D2-Q1, CBQ5-D2-Q2, CBQ5-D3-Q3, CBQ5-E1-Q1, CBQ5-E2-Q1 |

**Note on CBQ3-A2-Q5 and CBQ3-D1-Q6:** These items were already resolved in Session 81 Wave 1 (Class A redesign). Their RightItems were restructured as part of that session. They are excluded from Wave 4 but listed above for clarity of batch allocation.

### 3.2 Batch Execution Order

```
4A (scored_cases.js + scored_cases2.js) → 22 items
    │
    ├─ Preflight → PASS
    ├─ Backup both files
    ├─ Shuffle → Verify → Write
    ├─ Independent verification
    ├─ REVISION_HISTORY.md entry
    │
    ↓
4B (scored_cases3.js) → 27 items
    │
    ├─ Preflight → PASS
    ├─ Backup file
    ├─ Shuffle → Verify → Write
    ├─ Independent verification
    ├─ REVISION_HISTORY.md entry
    │
    ↓
4C (scored_cases4.js + scored_cases5.js) → 26 items
    │
    ├─ Preflight → PASS
    ├─ Backup both files
    ├─ Shuffle → Verify → Write
    ├─ Independent verification
    ├─ REVISION_HISTORY.md entry
    │
    ↓
Session Closeout
    ├─ npm run pipeline → PASS
    ├─ Re-run MATCHING_ITEM_AUDIT scan → sequentialRatio = 0 for all 75 items
    └─ Final REVISION_HISTORY.md summary entry
```

---

## 4. Per-Batch Protocol

### 4.1 T0 (Before Any Write)

1. `npm run preflight` — verify 0 divergences
2. `node scripts/test_governance_guard.js` — verify 54/54 PASS
3. Create timestamped backup of target case pack file(s):
   ```
   cp scored_cases.js  backups/scored_cases.js.bak-YYYYMMDDHHMMSS
   ```
4. Confirm backup file exists and has non-zero size

### 4.2 Execute

1. Run `node scripts/remediate_ordered_matching.js --pack=<target> --execute`
2. Script verifies backup exists
3. Script confirms each shuffle operation
4. Script writes shuffled RightItems back to file
5. Script produces batch report

### 4.3 Verify

1. **Derangement check:** `afterIndices[i] !== beforeIndices[i]` for all items in batch
2. **Correct object unchanged:** Deep equality vs backup copy
3. **LeftItems unchanged:** Deep equality vs backup copy
4. **RightItems set unchanged:** Same items as pre-shuffle (sort + compare)
5. **File parse integrity:** `Function` constructor can parse the full file
6. **20% random spot-check:** Direct file inspection of `RightItems` order vs `Correct` values
7. `npm run preflight` — verify 0 divergences

### 4.4 Document

1. REVISION_HISTORY.md entry with:
   - Batch ID, date, item count
   - File(s) modified
   - Before/after per-item index report (summary)
   - Verification results
2. Sample entry format:
   ```
   ## 2026-07-30 — Wave 4 Batch 4A — Ordered-Pattern Shuffle (Sections A–B)
   
   - 22 matching items in scored_cases.js and scored_cases2.js
   - RightItems shuffled: Fisher-Yates derangement
   - Correct objects verified unchanged (deep equality vs backup)
   - 0 sequential pairs remaining (derangement check: 22/22 PASS)
   - Verified: CBQ-A2-Q6, CBQ-B2-Q6, CBQ2-C1-Q5 (20% spot-check)
   - Preflight: 0 divergences
   - governance-guard: 54/54 PASS
   ```

---

## 5. Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| All 75 items shuffled | sequentialRatio = 0 | Per-item afterIndices[i] !== i |
| Answer keys unchanged | 0 Correct object diffs | Deep equality check vs backup |
| No content loss | All LeftItems, Explanations, metadata preserved | Diff vs backup (excluding RightItems array) |
| File integrity | All 5 files parseable | Function constructor parse PASS |
| Preflight clean | 0 divergences | `npm run preflight` exit 0 |
| Governance compliant | 54/54 PASS | `npm run test_governance_guard` exit 0 |
| Registry stable | QID count unchanged (83 match items) | grep -c ItemID across all 5 files |

---

## 6. Rollback Plan

If any verification check fails:

1. Restore from timestamped backup:
   ```
   cp backups/scored_cases3.js.bak-YYYYMMDDHHMMSS scored_cases3.js
   ```
2. Run `npm run preflight` to confirm restoration
3. Investigate failure root cause
4. Fix script or methodology
5. Re-execute batch from T0

---

## 7. Post-Wave 4 Actions

After all three batches complete:

1. `npm run pipeline` (validate → build-registry → dashboard)
2. Re-run MATCHING_ITEM_AUDIT scan on all 83 items
3. Confirm:
   - ORDERED_ANSWER_PATTERN count = 0 (down from 81)
   - SAME_ANSWER_REUSE count = 0 (already 0 from Wave 1)
   - DUPLICATE_DISTRACTOR count = 0 (already 0 from Wave 1)
4. Update `CURRENT_BASELINES.md` with new file hashes
5. Close Wave 4 in REVISION_HISTORY.md

---

## 8. Timeline Estimate

| Activity | Est. Duration |
|----------|--------------|
| T0 (backup + preflight × 3) | ~5 minutes |
| Batch 4A (22 items) | ~3 minutes |
| Batch 4A verification | ~5 minutes |
| Batch 4B (27 items) | ~3 minutes |
| Batch 4B verification | ~5 minutes |
| Batch 4C (26 items) | ~3 minutes |
| Batch 4C verification | ~5 minutes |
| Session closeout (pipeline, audit, baselines) | ~10 minutes |
| **Total** | **~39 minutes** |

---

## Appendix A: Session 83 Execution Checklist

```
[ ] T0: npm run preflight → 0 divergences
[ ] T0: governance guard → 54/54 PASS
[ ] T0: Backup all 5 scored_cases files
[ ] T0: Confirm backups exist

[ ] Batch 4A: scored_cases.js + scored_cases2.js (22 items)
  [ ] Run remediate_ordered_matching.js --execute
  [ ] Verify derangement: 22/22
  [ ] Verify Correct objects unchanged
  [ ] Spot-check 5 items
  [ ] npm run preflight → 0 divergences
  [ ] REVISION_HISTORY.md entry

[ ] Batch 4B: scored_cases3.js (27 items)
  [ ] Run remediate_ordered_matching.js --execute
  [ ] Verify derangement: 27/27
  [ ] Verify Correct objects unchanged
  [ ] Spot-check 5 items
  [ ] npm run preflight → 0 divergences
  [ ] REVISION_HISTORY.md entry

[ ] Batch 4C: scored_cases4.js + scored_cases5.js (26 items)
  [ ] Run remediate_ordered_matching.js --execute
  [ ] Verify derangement: 26/26
  [ ] Verify Correct objects unchanged
  [ ] Spot-check 5 items
  [ ] npm run preflight → 0 divergences
  [ ] REVISION_HISTORY.md entry

[ ] Closeout:
  [ ] npm run pipeline → PASS
  [ ] Re-run MATCHING_ITEM_AUDIT → 0 ORDERED_ANSWER_PATTERN
  [ ] Update CURRENT_BASELINES.md
  [ ] Final REVISION_HISTORY.md entry
```
