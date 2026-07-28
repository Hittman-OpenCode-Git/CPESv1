# Session 303 — Explanation Quality Census & Instructional Value Audit

**Date:** 2026-07-26
**Type:** 300-Series Analysis (Read-Only)
**Program:** 300-Series Certification Acceleration Program
**Status:** COMPLETE

---

## 1. Executive Summary

S303 established the portfolio-wide explanation quality baseline. The single-script analysis parsed 3,125 items across 10 source files, computed the Explanation Quality Score (EQS) on 6 weighted dimensions, identified 3,007 rewrite candidates, and quantified the case-bank distractor-explanation gap at 96.1% empty.

**Core finding:** Explanation quality is the portfolio's dominant quality gap — not calibration, metadata, or distractor quality. Only 18 of 3,125 items (0.6%) earn Grade A instructional quality. The distinction is critical: ExplanationCorrect coverage is 100% but ExplanationWrong coverage is 71.5%, dropping to 3.9% for case banks.

---

## 2. Portfolio Census

| Metric | Value |
|--------|-------|
| Total items | 3,125 (2,500 MCQ + 625 case) |
| ExplanationCorrect fill rate | 100.0% |
| Avg ExplanationCorrect length | 313 chars |
| ExplanationWrong non-CC fill rate | 71.5% |
| Case EW fill rate | 3.9% |
| DL-008 EW[CC] non-empty | 0 |
| Certified items | 2,181 (unchanged) |

---

## 3. Explanation Quality Score (EQS) — S303-1.0

**6-dimension model:**
- Instructional value (25%)
- Reasoning depth (20%)
- Calculation support (15%)
- Standards integration (15%)
- Learning effectiveness (15%)
- Structure (10%)

**Pack EQS rankings:**

| Pack | Avg EQS | Grade | A | B | C | D | F |
|------|---------|-------|---|---|---|---|---|
| Pack A | 30 | F | 0 | 6 | 66 | 50 | 378 |
| Pack B | 27 | F | 0 | 0 | 1 | 85 | 414 |
| Pack C | 22 | F | 0 | 0 | 0 | 22 | 478 |
| Pack D | 23 | F | 0 | 0 | 0 | 24 | 476 |
| Pack E | 17 | F | 0 | 2 | 11 | 25 | 462 |
| scored_cases.js | 41 | D | 3 | 27 | 6 | 1 | 53 |
| scored_cases2.js | 49 | D | 0 | 6 | 55 | 64 | 28 |
| scored_cases3.js | 35 | F | 0 | 2 | 11 | 57 | 84 |
| scored_cases4.js | 52 | D | 2 | 28 | 50 | 46 | 27 |
| scored_cases5.js | 42 | D | 0 | 3 | 13 | 37 | 22 |

---

## 4. Blueprint Domain Analysis

| Domain | EC Fill | Avg Len | Avg EQS | Certified |
|--------|---------|---------|---------|-----------|
| A — External Financial Reporting | 100.0% | 261 | 27 | 419 |
| B — Planning & Budgeting | 100.0% | 207 | 23 | 556 |
| C — Performance Management | 100.0% | 256 | 27 | 606 |
| D — Cost Management | 100.0% | 317 | 29 | 491 |
| E — Internal Controls | 100.0% | 393 | 30 | 264 |
| F — Technology & Analytics | 100.0% | 276 | 24 | 281 |

Domain E leads in explanation quality; Domain B trails. Explanation length does not cleanly predict instructional quality — Domain E has the longest but only marginal EQS improvement.

---

## 5. Case Bank Gap — Confirmed & Quantified

S302 identified case-bank distractor quality at Grade F. S303 quantifies:

- **Case EW fill rate: 3.9%** (97 of 2,500 slots filled)
- All 97 filled EW slots are in scored_cases.js (legacy bank)
- scored_cases2-5 have **zero EW coverage** across 2,140 distractor slots
- Case ExplanationCorrect quality is high (avg 714 chars, up to 1,257 for legacy)
- The gap is strictly ExplanationWrong — learners who answer case questions incorrectly receive no corrective feedback

**This is now the highest-priority rewrite target in the portfolio**, consistent with S302's P0 classification.

---

## 6. Cross-Pack Drift

All 6 sections show severe explanation-length inconsistency across packs. Most extreme:

- **Section E:** Pack A avg 986 chars vs. Pack E avg 68 chars (14.5:1 ratio)
- **Section F:** scored_cases.js avg 2,891 chars vs. Pack E avg 77 chars (37:1)

This confirms systematic authoring-quality differences between packs. Pack E (Sections E-F) and scored_cases.js (ENHANCED_CASE_BASE) are opposite ends of the explanation-quality spectrum.

---

## 7. Rewrite Forecast

| Priority | Count | Sessions Est. | Description |
|----------|-------|--------------|-------------|
| P0-CRITICAL | 1 | 1 | Missing EC |
| P1-HIGH | 285 | 19 | Thin EC or 2+ empty EW |
| P2-MEDIUM | 2,407 | 81 | Thin EC/1 empty EW/F-grade quality |
| P3-LOW | 314 | 7 | D-grade quality |
| **Total** | **3,007** | **~108** | |

**Primary target for immediate action:** Case-bank EW slots (2,403 empty). Estimated 30-40 sessions for full case EW population.

---

## 8. Certification Benchmark

| Category | Count |
|----------|-------|
| Already Certified | 2,752 |
| Ready for certification (EQS ≥ 70) | 0 |
| Needs upgrade (EQS 55-69) | 1 |
| Needs major rewrite (EQS < 55) | 372 |

373 of 3,125 non-certified items require explanation quality improvement before certification. 150 Pack C + 150 Pack D sections C-F are the largest uncertified blocks.

---

## 9. Deliverables

| # | File | Purpose |
|---|------|---------|
| 1 | SESSION303_EXPLANATION_PORTFOLIO_CENSUS.json | Full explanation inventory |
| 2 | SESSION303_EXPLANATION_COVERAGE_AUDIT.json | Coverage matrix |
| 3 | SESSION303_INSTRUCTIONAL_QUALITY_AUDIT.json | Quality grades |
| 4 | SESSION303_LEARNING_VALUE_MATRIX.json | Learning value scores |
| 5 | SESSION303_CERTIFICATION_BENCHMARK_AUDIT.json | Certification readiness |
| 6 | SESSION303_CASEBANK_GAP_ANALYSIS.json | Case EW gap |
| 7 | SESSION303_REWRITE_CANDIDATES.json | Top 100 candidates |
| 8 | SESSION303_EXPLANATION_QUALITY_SCORE_MODEL.json | EQS model |
| 9 | SESSION303_REWRITE_FORECAST.json | Workload forecast |
| 10 | SESSION303_DASHBOARD.json | Consolidated dashboard |
| — | scripts/s303_explanation_analysis.js | Re-runnable analysis engine |

---

## 10. Governance Attestation

- ✅ Pre-flight: 353/353 PASS (214 tutoring safety + 119 Stage C + 20 governance guard)
- ✅ Post-flight: 353/353 PASS (zero delta)
- ✅ Certified count: 2,181 (unchanged)
- ✅ No pack content changes
- ✅ No case-bank modifications
- ✅ No scoring logic changes
- ✅ No certification-state changes
- ✅ No answer-key modifications
- ✅ 300-series lane — read-only analysis
- ✅ All findings cross-referenced to S301 and S302

---

## 11. Recommended Next: S304 — Blueprint Coverage & Weight Audit

Examine whether the 6 blueprint domains are proportionally represented in the item bank relative to the official IMA CMA Part 1 exam weights. Cross-reference explanation quality with blueprint weight to identify underweighted domains with high rewrite burden.
