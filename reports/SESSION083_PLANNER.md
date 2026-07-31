# SESSION083_PLANNER.md

**Session:** 83 — Matching Item Ordered-Pattern Remediation Wave 4
**Generated:** 2026-07-30T17:14:00.000Z
**Governance Lane:** Full (pack case file writes, REVISION_HISTORY.md update)
**Phase:** Planner

---

## 1. Lane Determination

| Trigger | Present? |
|---------|----------|
| Session edits pack file? | YES — scored_cases*.js RightItems arrays |
| Session edits scored case file? | YES |
| Session edits answer keys? | NO — Correct objects unchanged |
| Session edits question_state? | NO |
| Session edits certification status? | NO |
| Session edits CURRENT_BASELINES.md? | YES — post-remediation hash update |
| Session edits REVISION_HISTORY.md? | YES |
| Session edits DEFECT_LIBRARY.md? | NO |

**Verdict:** Full Governance Lane.

---

## 2. Objective

Execute Wave 4 remediation: eliminate ordered-answer cueing from all remaining Class C matching items by shuffling `RightItems` arrays. Zero content changes — pure mechanical derangement.

---

## 3. Authorized Files

### Write targets:
- `scored_cases.js` — RightItems array reordering (Batch 4A)
- `scored_cases2.js` — RightItems array reordering (Batch 4A)
- `scored_cases3.js` — RightItems array reordering (Batch 4B)
- `scored_cases4.js` — RightItems array reordering (Batch 4C)
- `scored_cases5.js` — RightItems array reordering (Batch 4C)
- `knowledge/REVISION_HISTORY.md` — session entry
- `knowledge/CURRENT_BASELINES.md` — hash update

### Read-only:
- All `pack_*_corrected.js` files
- All registry files
- All knowledge files except REVISION_HISTORY.md and CURRENT_BASELINES.md

---

## 4. Execution Batches

| Batch | Files | Items | Governance Cap |
|-------|-------|-------|----------------|
| 4A | scored_cases.js, scored_cases2.js | 22 | ≤28 PASS |
| 4B | scored_cases3.js | 27 | ≤28 PASS |
| 4C | scored_cases4.js, scored_cases5.js | 26 | ≤28 PASS |

---

## 5. Before/After State

| Metric | Before | After |
|--------|--------|-------|
| Ordered-pattern defects | 77 | 0 |
| RightItems arrays modified | 0 | 77 |
| Correct objects modified | 0 | 0 |
| LeftItems modified | 0 | 0 |
| Scoring behavior | unchanged | unchanged |
| Certification counts | 2,451 | 2,451 |

---

## 6. Stop Conditions

- Halt if preflight shows any divergence
- Halt if governance guard shows any FAIL
- Halt if any shuffle produces incorrect derangement
- Halt if any Correct object differs from backup
- Halt if any file fails to parse after write

---

## 7. Success Criteria

- 77/77 items derangement-satisfied
- 0 Correct object changes
- 0 LeftItems changes
- All 5 case pack files parse cleanly
- preflight: 0 divergences
- governance guard: 54/54 PASS
- pipeline: PASS
