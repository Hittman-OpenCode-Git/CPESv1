# Session 714A — Difficulty Distribution Evidence Audit

**Date:** 2026-07-26
**Type:** 700-series read-only evidence audit
**Status:** Complete — read-only, zero source file changes
**Pre-flight:** 32/32 PASS
**Post-flight:** 32/32 PASS

---

## Executive Summary

S714A conducted a statistically representative audit of the 823 Easy (DifficultyScore=1) items to determine whether the concentration reflects legitimate item difficulty or systematic misclassification. A stratified random sample of 50 items across all 5 packs and 6 blueprint domains was reviewed under 6 calibration dimensions.

**Result:** 84% of Easy items (42/50) are correctly labeled. 16% (8/50) warrant upgrade to Moderate-Easy/2. The high Easy count is primarily a **content-composition characteristic**, not a systematic calibration error.

---

## Decision

**Targeted recalibration recommended** (16% falls in 10-25% band). Extrapolated ~130 items warrant upgrade.

**Authorized follow-on:** Session 715 — Targeted Easy-to-Moderate-Easy recalibration.

---

## Sample Methodology

| Parameter | Value |
|-----------|-------|
| Population | 823 Easy items (32.9% of 2,500 Certified) |
| Sample size | 50 items |
| Selection | Systematic stratified (every 16th item sorted by pack + section) |
| Confidence | 95% CI: 48–216 items extrapolated |
| Misclassification rate | 16% (8/50) |

### Sample Distribution

| Pack | Items | Sections Covered |
|------|-------|-----------------|
| A | 22 | A(5), B(3), C(2), D(2), E(4), F(6) |
| B | 13 | A(1), B(1), C(3), D(2), E(3), F(3) |
| C | 6 | A(2), B(2), C(1), D(1) |
| D | 6 | A(1), B(2), C(1), D(2) |
| E | 3 | B(1), C(2) |

---

## Calibration Review Results

| Verdict | Count | % |
|---------|-------|---|
| RETAIN (Easy/1 is correct) | 42 | 84% |
| POSSIBLE MODERATE-EASY (should be /2) | 8 | 16% |
| ESCALATE (MAJOR reclassification) | 0 | 0% |

### 8 Misclassified Items — Three Patterns

**Pattern 1 — Scenario Calculation Easy (4/8, 50%):**
Items requiring extraction of numeric values from a business narrative and computation. The Easy label understates the combined reading-comprehension + calculation demand.

Examples: P1-A-033 (net sales calc from gross/returns/allowances), P1-A-049 (depreciation calc from cost/salvage/life), P1B-D-131 (throughput costing), P1-AC-011 (equity method investment)

Remedy: Upgrade to Moderate-Easy/2.

**Pattern 2 — Definitional with Sophisticated Distractors (3/8, 37.5%):**
"Which of the following..." or "Under ASC XXX, which..." questions where all distractors are plausible same-domain alternatives. The Easy label fails to account for the discriminator challenge.

Examples: P1B-A-106 (ASC 842 lease classification criteria), P1B-B-135 (financial budget identification), P1B-C-189 (standard costing advantage)

Remedy: Upgrade to Moderate-Easy/2.

**Pattern 3 — Thin Explanation (1/8, 12.5%):**
P1-D-018 (external failure cost classification) with 67-char explanation. The under-specified explanation suggests the item may be less mature than the Easy label implies.

Remedy: Upgrade to Moderate-Easy/2.

---

## Root Cause Analysis

The original authoring template assigned Easy/1 to items meeting simple criteria: short question stem, single clear correct answer, no multi-step analysis. However, it did not account for:

1. **Distractor sophistication** — Items where all options are plausible concepts within the same accounting domain require genuine discrimination, not just recall.

2. **Scenario parsing demand** — Items presenting a business narrative require the candidate to extract key facts before applying a concept, which is an additional cognitive load beyond simple recall.

3. **Explanation thinness** — Items with very short explanations (<100 chars) may be under-developed, making them harder for candidates to learn from.

These three factors cause 16% of Easy-labeled items to actually warrant Moderate-Easy/2.

---

## Conclusion

| Finding | Evidence |
|---------|----------|
| Easy concentration is legitimate | 84% of sampled items correctly labeled Easy/1 |
| Systematic misclassification rate | 16% (~130 items) warrant Moderate-Easy/2 |
| Root cause | Template authoring didn't account for distractor sophistication or scenario parsing |
| Distribution skew verdict | **Primarily content-composition, not calibration error** |
| Recommended action | S715 — targeted recalibration of ~130 items |

---

## Governance Attestation

- [x] Read-only audit — zero source file changes
- [x] Pre-flight: 32/32 PASS
- [x] Post-flight: 32/32 PASS
- [x] No answer keys changed
- [x] No stems changed
- [x] No choices changed
- [x] No explanations changed
- [x] No certification states changed
- [x] No May files touched
- [x] No case-bank files touched
- [x] No scoring/runtime files touched
- [x] Evidence-based, not quota-based

---

## Files Created

1. `reports/systematic_testing/SESSION714A_DIFFICULTY_DISTRIBUTION_BASELINE.json`
2. `reports/systematic_testing/SESSION714A_SAMPLE_SELECTION_LOG.json`
3. `reports/systematic_testing/SESSION714A_CALIBRATION_REVIEW_RESULTS.json`
4. `reports/systematic_testing/SESSION714A_PATTERN_ANALYSIS.json`
5. `reports/session_status/SESSION714A_DIFFICULTY_DISTRIBUTION_EVIDENCE_AUDIT.md` (this file)

## Files Modified

**None** — read-only audit.

---

## Recommended S715 Scope

- Recalibrate ~130 Easy/1 → Moderate-Easy/2
- Two pattern-specific scans:
  1. Scenario calculation items (numeric + stem >120 chars + Easy)
  2. Short definitional items (stem ≤90 chars + "Which of the following"/"Under ASC" pattern + Easy)
- Follow the same parse-modify-write methodology from S713
- Estimated ~30 minutes

---

*Session 714A complete — 2026-07-26*
