# Session 93P — Corrected Baseline Estimate

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** COMPLETE

---

## 1. Methodology

Pool-wide projections derived from stratified random sample of 150 items (75 Evaluate-labeled + 75 Analyze-labeled) across all 5 packs, weighted proportionally by pack × section population.

## 2. Corrected Cognitive Distribution

### Per Cognitive Level

| Cognitive Level | Current Label | Corrected Estimate (95% CI) | Δ |
|----------------|--------------|---------------------------|----|
| Remember | 81 | ~112 (82 – 145) | +31 |
| Understand | 1,002 | ~1,100 (970 – 1,240) | +98 |
| Apply | 972 | ~1,140 (1,060 – 1,230) | +168 |
| Analyze | 260 | ~117 (87 – 148) | −143 |
| Evaluate | 221 | ~102 (76 – 129) | −119 |
| Missing/Defect | 9 | ~10 (9 – 11) | +1 |
| **Total** | **2,545** | **2,545** | **0** |

### Per Pack

| Pack | Current HO (Labeled) | Corrected HO (Estimated) | Current Apply | Corrected Apply | Δ HO |
|------|---------------------|------------------------|---------------|-----------------|------|
| Pack A | 103 | ~51 | 248 | ~300 | −52 |
| Pack B | 25 | ~18 | 309 | ~316 | −7 |
| Pack C | 104 | ~40 | 191 | ~255 | −64 |
| Pack D | 214 | ~86 | 118 | ~246 | −128 |
| Pack E | 35 | ~24 | 106 | ~118 | −11 |
| **Total** | **481** | **~219** | **972** | **~1,140** | **−262** |

*Pack estimates scaled from observed per-pack accuracy rates in sample.*

## 3. Higher-Order Pool Analysis

| Metric | Current | Corrected |
|--------|---------|-----------|
| Total HO labeled | 528 (20.7%) | N/A |
| Total HO true (estimated) | N/A | **219 (8.6%)** |
| CAQS target (40%) | 1,018 items needed | 1,018 items needed |
| Gap to CAQS target | 490 items | **799 items** |
| Gap increase due to reclassification | — | **+309 items** |

**The effective HO gap is 63% larger than previously understood.**

## 4. Overstatement by Severity Tier

| Tier | Overstated Items | % of Overstatement | Examples |
|------|-----------------|-------------------|----------|
| **Recall-as-Judgment** (Remember→Evaluate) | ~26 | 8.4% | COSO term matching; fraud triangle recall |
| **Comprehension-as-Analysis** (Understand→Analyze) | ~75 | 24.3% | Definition-to-term matching: kaizen costing, reciprocal method, common-size analysis |
| **Procedure-as-Evaluation** (Apply→Evaluate) | ~62 | 20.1% | ASC 450 application; EVA formula; impairment trigger checklist |
| **Procedure-as-Analysis** (Apply→Analyze) | ~87 | 28.2% | Formula substitution: depreciation, variance computation, ABC allocation |
| **Classification-as-Evaluation** (Analyze→Evaluate) | ~49 | 15.9% | COSO framework diagnosis (genuine analysis, labeled as evaluation) |
| **Structural Defect** | ~3 | 1.0% | P1-FD-046 empty fields |
| **Classification-as-Analysis** (Apply→Analyze, Understand→?) | ~7 | 2.3% | Edge cases |

## 5. Confidence Assessment

| Finding | Confidence | Basis |
|---------|------------|-------|
| Evaluate accuracy at ~41% | HIGH | 75-item sample, consistent findings across 6 independent agents |
| Analyze accuracy at ~41% | HIGH | 75-item sample, consistent findings across 6 independent agents |
| Per-pack accuracy rates | MEDIUM | Smaller per-pack samples (2–32 items) |
| Section-level accuracy for EC | HIGH | 0/8 sampled — systematic failure pattern confirmed |
| Pool-wide projection of 219 true HO | MEDIUM-HIGH | Combined 150-item sample, consistent 41.3% accuracy for both levels |

## 6. Comparison with Prior Estimates

| Source | Date | Evaluate Estimate | This Audit | Difference |
|--------|------|-------------------|------------|------------|
| S380 Evaluate Audit | 2026-07-28 | ~50% misclassification (94 items) | 58.7% (75 items) | **Worse by 8.7pp** |
| S718 Analytics | 2026-07-27 | 223 Evaluate total | 246 currently | +23 items added since |
| S086P Cognitive Baseline | 2026-07-30 | 221 Evaluate, 260 Analyze | 246 Evaluate, 282 Analyze | Stale — cognitive upgrades applied since |

The S380 audit's 50% estimate was optimistic. The true misclassification rate is 58.7%. The difference is partly explained by:
1. S380 sampled more Pack A items (41%) vs our 27% — Pack A has the highest accuracy (65%)
2. S380 had zero Pack C Section EC items — the worst-performing section (0% accuracy)
3. Population has grown (+25 Evaluate items) since S380, potentially with lower-quality additions

## 7. Corrected Campaign ROI

| Campaign | Labeled HO Created | Estimated True HO Created | Efficiency |
|----------|-------------------|--------------------------|------------|
| Pack A Section B (S77) | 35 | ~29 (83% accuracy) | **High efficiency** |
| Pack D Section B (S81-S82) | 89 | ~63 (71% accuracy) | **Good efficiency** |
| Pack C Section E cert (S853) | 27 | ~0 (0% accuracy) | **Zero efficiency** |
| Pack B Sections B/C/F cert (S853) | 25 | ~10 (40% accuracy) | **Low efficiency** |

**Strategic implication:** Pack D Section B's campaign (89 labeled HO → ~63 true HO) was 3× more productive than it appears on labeled metrics. Pack C Section E's certification wave (27 labeled HO → ~0 true HO) contributed nothing to true higher-order coverage.

---

*Generated: 2026-07-31 | Session 93P Corrected Baseline Estimate*
