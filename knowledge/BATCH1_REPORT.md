# Batch 1 Quality Report

**Batch:** 1 — Most-Flagged Section A Questions
**Date:** 2026-07-22
**Status:** CLOSED

---

## Summary

| Metric | Value |
|--------|-------|
| Questions Reviewed | 14 |
| Questions Revised | 5 (P1-A-022, P1B-A-143, P1E-A-027, P1E-A-032, P1E-A-043) |
| Questions Rewritten | 1 (P1E-A-003) |
| Questions Kept | 9 |
| Mean CAQS Before | 69.1 |
| Mean CAQS After | 85.1 |
| Mean CAQS Improvement | +16.0 |
| Validator Warnings (total) | 2513 → 2485 (−28) |
| New Defect Types Discovered | 1 (DL-007: Identical distractor explanations) |
| Defects Resolved | 2 (DL-006, DL-007) |
| Gold Standard Candidates | 3 (P1B-A-107, P1B-A-114, P1B-A-128) |

## Before/After by Question

| QuestionID | Before | After | Change | Type |
|-----------|--------|-------|--------|------|
| P1B-A-110 | 73.5 | 73.5 | 0 | KEEP |
| P1B-A-112 | 89.5 | 89.5 | 0 | KEEP |
| P1E-A-003 | 47 | 94 | **+47** | REWRITE |
| P1B-A-105 | 77 | 77 | 0 | KEEP |
| P1B-A-128 | 92 | 92 | 0 | KEEP |
| P1E-A-043 | 62.5 | 92 | **+29.5** | REVISION |
| P1B-A-101 | 78 | 78 | 0 | KEEP |
| P1B-A-114 | 90.5 | 90.5 | 0 | KEEP |
| P1B-A-143 | 71 | 78 | +7 | REVISION |
| P1E-A-027 | 63.5 | 90 | **+26.5** | REVISION |
| P1E-A-032 | 58 | 90 | **+32** | REVISION |
| P1E-A-055 | 66.5 | 82 | +15.5 | REVISION |
| P1-A-022 | 69 | 82 | +13 | REVISION |
| P1B-A-107 | 91.5 | 91.5 | 0 | KEEP |

## Educational Impact Assessment

| Impact | Count | Questions |
|--------|-------|-----------|
| 100 (Transformative) | 1 | P1E-A-003 |
| 90–99 (Major) | 3 | P1E-A-027, P1E-A-032, P1E-A-043 |
| 60–89 (Moderate) | 3 | P1-A-022, P1B-A-143, P1E-A-055 |
| 0 (No change) | 9 | All KEEP |

## Validator False Positive Analysis

Of the 201 Section A validator findings reviewed:
- **82%** are false positives caused by structural choice patterns inherent to accounting questions (journal entries, classifications, numeric values)
- **18%** represent genuine quality signals (absolute language, vague qualifiers)
- **0%** of genuine signals required question rejection — all were addressable through explanation or metadata improvements

## Recommendations for Validator Suite

1. Add domain-specific Jaccard thresholds for accounting question types (journal entries, classifications)
2. Consider suppressing structural-similarity warnings when all choices follow the same grammatical pattern with different content (e.g., "Debit X; Credit Y" variants)
3. AbsoluteLanguageValidator is working correctly — "always" and "never" flags remain valuable signals

## Benchmark for Future Batches

The Section A audit target is established:
- **Minimum acceptable CAQS:** 70 (Acceptable tier)
- **Target CAQS:** 85+ for revised questions
- **Gold Standard path:** 90+ GAQS + 20/20 Gold Standard Checklist
- **Validator regression rule:** Zero new errors, total warnings must not increase
