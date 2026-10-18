# Design Citation Fix — DRAFT ONLY (2026-09-22)

**Status:** Draft. Do NOT apply — WS-C (Full Lane) owns the design doc.
**Scope:** Path correction only. No content change.
**Source line:** `reports/MAY_3_0_DESIGN_20260921.md:20`

## Exact current citation line

```
**NOT touched:** All `pack_*_corrected.js`, `scored_cases*.js`, `case_pack_*_corrected.js`, `MASTER_QUESTION_REGISTRY.md`, `CURRENT_BASELINES.md`, answer keys, `question_state` values, or any file outside `app/may/**` and `reports/`.
```

## Proposed replacement line (path correction only)

```
**NOT touched:** All `pack_*_corrected.js`, `scored_cases*.js`, `case_pack_*_corrected.js`, `MASTER_QUESTION_REGISTRY.md`, `p2/CURRENT_BASELINES_P2.md`, answer keys, `question_state` values, or any file outside `app/may/**` and `reports/`.
```

**Change:** bare `CURRENT_BASELINES.md` → `p2/CURRENT_BASELINES_P2.md`. No other word touched. (Note: `knowledge/CURRENT_BASELINES.md` exists as the P1 baselines file; this draft corrects only the P2 citation flagged in the gap report.)

## Verification note (3 lines)

- Glob `**/CURRENT_BASELINES*.md` returns `knowledge/CURRENT_BASELINES.md` (P1) and `p2/CURRENT_BASELINES_P2.md` (P2); no bare-root `CURRENT_BASELINES.md` exists.
- Grep `CURRENT_BASELINES` in `reports/MAY_3_0_DESIGN_20260921.md` hits 1 line only (:20, quoted verbatim above).
- Draft only — design doc untouched; application (if approved) is WS-C Full Lane with backup + REVISION_HISTORY tail.
