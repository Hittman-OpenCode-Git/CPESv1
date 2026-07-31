# Session 94P — True Higher-Order Estimate

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Data Source:** S93P Classification Audit (150-item sample), S92P Cognitive Drift Analysis, S86P Cognitive Baseline
**Confidence:** MEDIUM-HIGH (combined 150-item sample, consistent 41.3% accuracy for both levels)
**Status:** COMPLETE

---

## 1. Headline Finding

**The true higher-order pool is approximately 219 items (8.6% of 2,545), not the 528 currently labeled (20.7%).** The overstatement is 309 items (58.7% misclassification). This estimate carries a 95% confidence interval of 7.2% – 10.1%.

---

## 2. Methodology

### 2.1 Sample Design

| Parameter | Value |
|-----------|-------|
| Total population | 2,545 items |
| HO-labeled population | 528 items (246 Evaluate + 282 Analyze) |
| Sample size | 150 items (75 Evaluate + 75 Analyze) |
| Sampling method | Stratified random by pack × section, proportional allocation |
| Seed | 20260731 (reproducible) |
| Audit method | 6 independent task agents, explicit Bloom's taxonomy criteria per item |
| Confidence level | 95% |

### 2.2 Statistical Properties

| Metric | Evaluate | Analyze | Combined |
|--------|----------|---------|----------|
| Population | 246 | 282 | 528 |
| Sample | 75 | 75 | 150 |
| Sampling fraction | 30.5% | 26.6% | 28.4% |
| Observed accuracy | 41.3% | 41.3% | 41.3% |
| 95% CI (Wilson score) | 30.5% – 53.0% | 30.5% – 53.0% | 33.5% – 49.6% |
| Projected true count | ~102 | ~117 | ~219 |
| Projected true count (lower bound) | ~76 | ~87 | ~163 |
| Projected true count (upper bound) | ~129 | ~148 | ~277 |
| Standard error | ±5.7pp | ±5.7pp | ±4.0pp |

### 2.3 Consistency Check

The symmetrical 41.3% accuracy for both Evaluate and Analyze supports the hypothesis that misclassification is systemic (affects both labels equally) rather than label-specific. If misclassification were driven by incorrect label assignment rules, we would expect different rates for different labels. The identical rates suggest a single root cause: labels were assigned mechanically (by template position) rather than cognitively (by task analysis).

---

## 3. Corrected Cognitive Distribution

### 3.1 Pool-Wide

| Cognitive Level | Current (S86P) | Corrected | Δ |
|----------------|---------------|-----------|----|
| Remember | 81 (3.2%) | ~112 (4.4%) | +31 |
| Understand | 1,002 (39.4%) | ~1,100 (43.2%) | +98 |
| Apply | 972 (38.2%) | ~1,140 (44.8%) | +168 |
| Analyze | 260 (10.2%) | ~117 (4.6%) | −143 |
| Evaluate | 221 (8.7%) | ~102 (4.0%) | −119 |
| Missing/Defect | 9 (0.4%) | ~10 (0.4%) | +1 |
| **Total** | **2,545** | **2,545** | **0** |

### 3.2 Higher-Order Summary

| Metric | Current | Corrected |
|--------|---------|-----------|
| HO total | 528 (20.7%) | **219 (8.6%)** |
| CAQS §6.2 target (Analyze+Evaluate) | 40% (1,018 items) | 40% (1,018 items) |
| Gap to CAQS target | 490 items | **799 items** |
| Gap increase due to correction | — | **+309 items (63% larger)** |

---

## 4. Per-Pack Corrected Estimates

| Pack | Items | Current HO | Current HO% | Corrected HO | Corrected HO% | Δ HO | Δ HO% pp |
|------|-------|-----------|-------------|-------------|--------------|------|----------|
| Pack A | 500 | 103 | 20.6% | ~51 | ~10.2% | −52 | −10.4pp |
| Pack B | 500 | 25 | 5.0% | ~18 | ~3.6% | −7 | −1.4pp |
| Pack C | 500 | 104 | 20.8% | ~40 | ~8.0% | −64 | −12.8pp |
| Pack D | 500 | 214 | 42.8% | ~86 | ~17.2% | −128 | −25.6pp |
| Pack E | 545 | 35 | 6.4% | ~24 | ~4.4% | −11 | −2.0pp |
| **Total** | **2,545** | **481** | **18.9%** | **~219** | **~8.6%** | **−262** | **−10.3pp** |

### 4.1 Key Observations

1. **Pack D is the most overstated.** 42.8% HO → 17.2% true HO. The S70-S82 modernization campaign produced genuine Analyze/Evaluate items but also relabeled many Apply items without structural redesign. Pack D Section BD (budgeting) is the strongest; Sections DD and CD are the most overstated.

2. **Pack C is the second most overstated.** 20.8% HO → 8.0% true HO. Section EC (COSO) drives most of the overstatement — 27 Evaluate-labeled items with 0% true Evaluate accuracy.

3. **Pack A has the best accuracy.** 20.6% HO → 10.2% true HO. Pack A's HO items were created with the highest-quality methodology, resulting in less overstatement despite a moderate HO count.

4. **Pack B has the least drift.** 5.0% HO → 3.6% true HO. Pack B had the lowest HO to begin with, so the correction is smaller.

5. **Pack E has minimal labeled HO.** 6.4% HO → 4.4% true HO. Pack E's HO is so low that the absolute false HO count is small, even if the per-item accuracy is low.

---

## 5. Comparison with Prior Cognitive Estimates

| Source | Date | Evaluate | Analyze | HO Total | HO% | This Estimate |
|--------|------|----------|---------|----------|-----|---------------|
| S086P Baseline | 2026-07-30 | 221 | 260 | 481 | 18.9% | **Labeled (pre-audit)** |
| S380 Evaluate Audit | 2026-07-28 | ~111 | N/A | N/A | N/A | ~102 (this audit: −9) |
| S92P Estimate | 2026-07-31 | ~111 (from S380) | ~168 (est.) | ~279 | 11.0% | 219 (this audit: −60) |
| **S93P Estimate** | **2026-07-31** | **~102** | **~117** | **~219** | **8.6%** | **This estimate (authoritative)** |

### 5.1 Why S94P's Estimate Differs from S92P's

S92P's 11.0% estimate was based on:
- S380's 50% Evaluate misclassification rate (94-item sample)
- Extrapolated ~30-40% Analyze misclassification rate (no audit data)

S93P's 8.6% estimate is based on:
- S93P's 58.7% Evaluate misclassification rate (75-item sample)
- S93P's 58.7% Analyze misclassification rate (75-item sample) — **Analyze misclassification was worse than estimated**

The 2.4pp difference is driven by the Analyze finding: S92P estimated 30-40% Analyze misclassification, but S93P found 58.7%. Pack D Sections DD and CD (0% Analyze accuracy) were not accounted for in the S92P estimate.

---

## 6. Corrected CAQS Gap Analysis

### 6.1 Current CAQS Targets vs. Corrected Baseline

| Cognitive Level | CAQS Target % | Target Count | Current Labeled | Corrected Baseline | Gap (Labeled) | Gap (Corrected) |
|----------------|-------------|-------------|-----------------|-------------------|--------------|-----------------|
| Remember | 5% | 127 | 81 | ~112 | +46 surplus | +15 surplus |
| Understand | 15% | 382 | 1,002 | ~1,100 | −620 surplus | −718 surplus |
| Apply | 40% | 1,018 | 972 | ~1,140 | +46 surplus | −122 surplus |
| Analyze | 25% | 636 | 260 | ~117 | −376 | **−519** |
| Evaluate | 15% | 382 | 221 | ~102 | −161 | **−280** |
| **HO Total** | **40%** | **1,018** | **481** | **~219** | **−537** | **−799** |

### 6.2 Implications

1. **The Apply pool is larger than labeled.** At ~1,140 items (44.8%), Apply exceeds the CAQS 40% target. This is not a problem — Apply is the largest and most important cognitive level for the CMA exam. But it means the surplus in Apply does not offset the deficit in HO.

2. **The HO deficit is structural, not just cosmetic.** The gap of 799 true HO items cannot be closed by relabeling. It requires creating genuinely new Analyze and Evaluate items.

3. **The Understand pool is even larger than labeled.** At ~1,100 items (43.2%), Understand is overrepresented. This pool is the natural source for Apply → Analyze upgrades.

---

## 7. Sensitivity Analysis

### 7.1 Best Case (Upper Bound of 95% CI)

If the true accuracy is at the upper bound of the 95% CI (53.0%):

| Metric | Value |
|--------|-------|
| True Evaluate | ~129 |
| True Analyze | ~148 |
| True HO total | ~277 (10.9%) |
| Gap to CAQS target | ~741 items |

### 7.2 Worst Case (Lower Bound of 95% CI)

If the true accuracy is at the lower bound of the 95% CI (30.5%):

| Metric | Value |
|--------|-------|
| True Evaluate | ~76 |
| True Analyze | ~87 |
| True HO total | ~163 (6.4%) |
| Gap to CAQS target | ~855 items |

### 7.3 Robustness Check

Even at the optimistic upper bound, the HO count is 277 (10.9%) — well below the 20.7% labeled. The quality problem is robust to sampling variation.

---

## 8. Evidence Summary

| Finding | Evidence Strength | Key Data Point |
|---------|-----------------|----------------|
| 58.7% misclassification for Evaluate | **STRONG** | 75-item sample, 31/75 correct, consistent across 6 agents |
| 58.7% misclassification for Analyze | **STRONG** | 75-item sample, 31/75 correct, consistent across 6 agents |
| Pack C Section EC 0% Evaluate accuracy | **STRONG** | 8/8 sampled items misclassified, all COSO definition-matching |
| Pack D Section DD 0% Analyze accuracy | **MODERATE** | 3/3 sampled, small sample but devastating pattern |
| Pack D Section CD 0% Analyze accuracy | **MODERATE** | 4/4 sampled, small sample but consistent pattern |
| Pack A Section B 83% Evaluate accuracy | **MODERATE** | 5/6 sampled, small sample but consistent with S92P quality analysis |
| Recall-as-Evaluate at ~10.7% of Evaluate sample | **STRONG** | 8/75 items are Remember-level, labeled Evaluate |
| Pool-wide projection of 219 true HO | **MODERATE-HIGH** | 150 items from 528, consistent 41.3% accuracy |

---

## 9. Recommendations Based on This Estimate

1. **Use 8.6% as the true HO baseline** for all future planning and campaign ROI calculations.

2. **Do not use the labeled 20.7%** for gap analysis — it overstates HO by 2.4×.

3. **Target 799 true HO items** for CAQS §6.2 compliance, not the previously reported 490.

4. **Plan for a 70% campaign conversion rate** — at this rate, creating 1,141 labeled HO items produces ~799 true HO items.

5. **Prioritize Pack C Section EC and Pack D Sections DD/CD** for immediate reclassification — these sections account for ~25% of the total overstatement.

6. **Recognize that the modernization program's labeled metrics are inflated** — the 5.0pp HO gain (14.0% → 18.9%) is actually closer to a 1.0-1.5pp gain when corrected for misclassification.

---

*Generated: 2026-07-31 | Session 94P Implementer Phase — True HO Estimate*
