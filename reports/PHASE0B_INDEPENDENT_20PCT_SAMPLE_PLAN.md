# Phase 0B Independent 20% Sample Plan

**Status:** PREPARED — NOT YET EXECUTED (blocked by Track 2 primary ledger completion)
**Date:** 2026-07-24

---

## Sample Parameters

| Parameter | Value |
|-----------|-------|
| Certified population | 873 |
| Required sample size | ⌈873 × 0.20⌉ = **175** |
| Previously reviewed | 25 (non-reproducible, insufficient independence evidence) |
| Remaining to select | 150 |
| Selection method | Deterministic pseudo-random |
| Seed | `20260724-phase0b-independent-20pct` |

## Mandatory Inclusions (7 items)

All non-ALL_AGREE items from the primary ledger must be included regardless of random selection:

| QID | Verdict | Pack |
|-----|---------|------|
| P1B-B-119 | CC_WRONG_CONFIRMED (now fixed) | B |
| P1B-F-084 | CC_WRONG_CONFIRMED (now fixed) | B |
| P1B-F-116 | CC_WRONG_CONFIRMED (now fixed) | B |
| P1B-F-121 | CC_WRONG_CONFIRMED (now fixed) | B |
| P1E-E-037 | CC_WRONG_CONFIRMED (now fixed) | E |
| *(plus any new CC_WRONG from Track 2)* | | |

## Selection Algorithm

Wait until Track 2 completes the primary ledger for all 873 items. Then:

1. Sort complete Certified QID list alphabetically
2. Use deterministic shuffle with seed `20260724-phase0b-independent-20pct`
3. Take first 175 items
4. Verify all mandatory inclusions are present; add replacements if needed
5. Assign each item to an independent reviewer who did not perform its primary audit

## Forced-Independence Protocol

The independent reviewer must NOT see:
- The primary reviewer's verdict
- The primary reviewer's derivation
- The primary reviewer's confidence

The independent reviewer receives ONLY:
- The QID, pack file, and object location
- The stem and choices (read directly from source)

Derivation comparison occurs ONLY after both reviews are complete.

## Disagreement Resolution

Any mismatch between primary and independent verdicts → **HUMAN_REVIEW_REQUIRED**.

Do not resolve by:
- Majority vote
- Stored CorrectChoice metadata
- ExplanationCorrect text
- Convenience

## Per-Item Required Output

```
Sample ID | QID | independent reviewer | independent answer | derivation | confidence | comparison result (AGREE / DISAGREE / HUMAN_REVIEW)
```

---

*Prepared 2026-07-24 — blocked by Track 2 primary ledger completion*
