# Phase 0B Primary CorrectChoice Ledger — Completion Plan

**Status:** PREPARED BUT NOT EXECUTED
**Date:** 2026-07-24

---

## Current State

| Category | Count |
|----------|-------|
| Total active Certified MCQs | 873 |
| PRIMARY_LEDGER_COMPLETE (has per-item derivation evidence) | 166 |
| PRIMARY_LEDGER_MISSING_OR_INSUFFICIENT (needs full audit) | 707 |
| Verified completion rate | 19.0% |

## Pack-Level Breakdown

| Pack | Certified | Complete | Missing | Missing % |
|------|-----------|----------|---------|-----------|
| B | 350 | 3 | 347 | 99.1% |
| C | 174 | 0 | 174 | 100% |
| D | 248 | 162 | 86 | 34.7% |
| E | 101 | 1 | 100 | 99.0% |
| **Total** | **873** | **166** | **707** | **81.0%** |

## Batch Work Queue (41 Batches)

Batches grouped by pack/section for efficiency. Each batch = 4-22 items. Execute in this order:

### Phase 1: Pack D Residual (88 items, 5 batches)
| Batch | QIDs | Size |
|-------|------|------|
| D-A-28 | AD-059,063,067,071 | 4 |
| D-B-29 | BD-017–038 | 22 |
| D-B-30 | BD-039–060 | 22 |
| D-B-31 | BD-061–082 | 22 |
| D-B-32 | BD-083–100 | 18 |

### Phase 2: Pack E (99 items, 9 batches)
| Batch | Section | Size |
|-------|---------|------|
| E-A-33 | P1E-A-003–055 | 9 |
| E-B-34 | P1E-B-009–074 | 5 |
| E-C-35 | P1E-C-013–083 | 5 |
| E-D-36 | P1E-D-009–073 | 5 |
| E-E-37 | P1E-E-001–022 | 22 |
| E-E-38 | P1E-E-023–045 | 22 |
| E-E-39 | P1E-E-046–067 | 22 |
| E-E-40 | P1E-E-068–075 | 8 |
| E-F-41 | P1E-F-001 | 1 |

### Phase 3: Pack C (174 items, 9 batches)
| Batch | Section | Size |
|-------|---------|------|
| C-A-19 through C-A-22 | AC-001–075 | 75 |
| C-B-23 through C-B-27 | BC-001–100 | 99 |

### Phase 4: Pack B (346 items, 18 batches)
| Batch | Section | Size |
|-------|---------|------|
| B-B-01 through B-B-05 | P1B-B-101–200 | 99 |
| B-C-06 through B-C-10 | P1B-C-101–200 | 100 |
| B-E-11 through B-E-14 | P1B-E-076–150 | 75 |
| B-F-15 through B-F-18 | P1B-F-076–150 | 72 |

## Per-Item Required Output

```
Batch ID | QID | file path | pack | CMA domain/topic | question_state | stem summary | independently derived answer | labeled CorrectChoice | ExplanationCorrect-implied answer | verdict | technical rationale/calculation | confidence | primary reviewer
```

For calculations: formula + substitution + result required.
For conceptual: governing principle/citation required.

---

*Prepared 2026-07-24 — awaiting execution authorization*
