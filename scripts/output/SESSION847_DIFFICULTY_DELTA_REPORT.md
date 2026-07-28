# S847 Difficulty Delta Report — Calibration Batch 1

**Session:** S847  
**Date:** 2026-07-27  
**Program:** 800-Series Controlled Expansion Pilot — Session 4/5  

---

## Summary

**28 items recalibrated. DifficultyScore: 3→1, Difficulty: "Moderate"→"Easy".**

All 28 items are DL-031 definition-match items — the stem contains a textbook definition and the correct answer is the term being defined. These test Bloom's Remember or Understand, not Apply or higher. The "Moderate" label was a template artifact from the 5-item rotation engine, which assigned difficulty by position rather than by cognitive assessment.

---

## Before vs After

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Items at DifficultyScore=3 | 28 | 0 | -28 |
| Items at DifficultyScore=1 | 0 | 28 | +28 |
| Pack B Easy count | ~75 | ~103 | +28 |
| Pack B Moderate count | ~250 | ~222 | -28 |

---

## Items by Section and Cognitive Level

| Section | Count | CL: Remember | CL: Understand | CL: Apply | Topic Range |
|---------|-------|-------------|----------------|-----------|-------------|
| B (Budgeting) | 8 | 3 | 4 | 1 | Sensitivity, ZBB, capital budget, static budget, benchmarking, incremental, scenario, Monte Carlo |
| C (Performance) | 1 | 0 | 0 | 1 | Standard costing / benchmarking |
| E (Controls) | 6 | 2 | 4 | 0 | BCP-RTO/RPO, DR-hot site, backup strategies, COSO ERM risk appetite, ICFR significant deficiency, BCP tabletop |
| F (Technology) | 13 | 1 | 7 | 5 | Supervised learning, blockchain, relational DB, CCPA, data quality, UAT testing, incident response, regression, RPA vs AI, smart contracts, DSAR, clustering, what-if analysis |
| **Total** | **28** | **6** | **15** | **7** |

Note: Even items labeled "Apply" are definition-to-term matches — the candidate reads a definition and selects the matching term. No calculation, interpretation, or application is required.

---

## DL-031 Pattern Confirmed

The definition-match pattern is consistent across all 28 items:

```
STEM: "[textbook definition of concept X]"
Answer choices: term A, term B, term C, term D (one of which IS concept X)
CorrectChoice: the term matching the definition
```

This is Bloom's Remember (recall) or Understand (interpret meaning) at most. DifficultyScore=3 (Moderate) is systematically overstated by 2 points.

---

## CAQS §6.1 Distribution Progress

| Difficulty Tier | Target | Pre-S847 (Pack B) | Post-S847 (Pack B) |
|----------------|--------|------------------|-------------------|
| Easy (1) | 15% | ~15% | ~20% |
| Moderate-Easy (2) | 20% | ~10% | ~10% |
| Moderate (3) | 30% | ~50% | ~45% |
| Difficult (4) | 25% | ~25% | ~25% |
| Very Difficult (5) | 10% | 0% | 0% |

The calibration moves toward the CAQS target but the pool remains definition-heavy. The full 545-item DL-031 calibration program (~19 batches) will substantially improve distribution alignment.

---

## Batch 2 Recommendation

**Target:** Pack E Section A/B/D — 28 definition-match items (DS=3, "Moderate"→"Easy"). These sections are already 100% Certified and structurally clean. Estimated time: ~30 minutes (28 items x 2 field changes each = 56 edits).
