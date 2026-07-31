# Session 93P — Misclassification Report

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** COMPLETE

---

## 1. Headline Finding

**58.7% of higher-order (Analyze + Evaluate) items in the repository are misclassified.** The true higher-order pool is approximately 219 items (8.6% of 2,545), not the 528 currently labeled (20.7%). The overstatement is 309 items — 12.1 percentage points.

This confirms and exceeds the Session 92P estimate of ~50% misclassification for Evaluate items.

## 2. Population Projections

| Metric | Current Label | Projected True (95% CI) | Overstatement |
|--------|-------------|------------------------|---------------|
| Evaluate pool | 246 items | **102** (76 – 129) | **144 items** |
| Analyze pool | 282 items | **117** (87 – 148) | **165 items** |
| Higher-Order total | 528 (20.7%) | **219 (8.6%)** | **309 items (12.1pp)** |

## 3. Misclassification Matrix

### Evaluate-Labeled Items (246 population)

| Actually Is | % of Sample | Projected Count | Severity |
|------------|-------------|-----------------|----------|
| True Evaluate | 41.3% | ~102 | — Correct |
| Analyze (should be Analyze) | 20.0% | ~49 | Medium — overstated 1 tier |
| Apply | 25.3% | ~62 | High — overstated 2 tiers |
| Understand | 1.3% | ~3 | Critical — overstated 3 tiers |
| Remember | 10.7% | ~26 | Critical — overstated 4 tiers |
| Defect | 1.3% | ~3 | Structural — unrenderable |

### Analyze-Labeled Items (282 population)

| Actually Is | % of Sample | Projected Count | Severity |
|------------|-------------|-----------------|----------|
| True Analyze | 41.3% | ~117 | — Correct |
| Apply | 30.7% | ~87 | Medium — overstated 1 tier |
| Understand | 26.7% | ~75 | High — overstated 2 tiers |
| Remember | 1.3% | ~4 | Critical — overstated 3 tiers |

## 4. Corrected Repository Cognitive Distribution

| Cognitive Level | Current Label | Projected True | Change |
|----------------|--------------|----------------|--------|
| Remember | 81 | ~112 | +31 |
| Understand | 1,002 | ~1,100 | +98 |
| Apply | 972 | ~1,140 | +168 |
| Analyze | 260 | ~117 | −143 |
| Evaluate | 221 | ~102 | −119 |
| Missing/Defect | 9 | ~10 | +1 |

**Key shift:** Apply pool grows substantially (+168), Analyze and Evaluate pools shrink dramatically (−262 combined). The "higher-order bulge" at 20.7% is revealed as Apply items with inflated labels.

## 5. Root Cause Analysis by Campaign/Phase

| Campaign | Sessions | Pack/Section | Evaluate Accuracy | Dominant Pattern |
|----------|----------|-------------|-------------------|------------------|
| Pack A Section B rewrites | S77 | A/B | **83%** | Genuine evaluative trade-off items |
| Pack D Section B modernization | S81-S82 | D/B | **71%** | Genuine evaluation with quality scenarios |
| Pack A Section F | (pre-modernization) | A/F | **100%** | Technology governance items — well-designed |
| Pack C Section E cert wave | S853 | C/E | **0%** | COSO framework: definition-matching as Evaluate |
| Pack B Sections B/C/F cert wave | S853 | B/B,C,F | **50%** | Formula substitution as evaluation |
| Pack A Section A | (mixed) | A/A | **25%** | ASC rule application as judgment |
| Pack C/D Section D | (mixed) | C/D, D/D | **0%** | Cost management definitions as analysis |

## 6. Worst Offenders — Sections Requiring Urgent Attention

| Rank | Section | Pack | Evaluate Accuracy | Analyze Accuracy | Total HO Overstated |
|------|---------|------|-------------------|-----------------|---------------------|
| 1 | **EC** | C | **0%** (0/8) | 60% (6/10) | COSO terms labeled as Evaluate |
| 2 | **DD** | D | 0% (N/A) | **0%** (0/3) | Cost methods as Analyze |
| 3 | **CD** | D | N/A | **0%** (0/4) | Performance concepts as Analyze |
| 4 | **A** (Section A) | A | 25% (1/4) | 0% (0/3) | ASC rules as judgment/analysis |
| 5 | **ED** | D | 78% (7/9) | 55% (6/11) | COSO classification as analysis |

## 7. Impact Assessment

### CAQS Compliance

| Metric | Current | Corrected | Gap |
|--------|---------|-----------|-----|
| Higher-Order % | 20.7% | 8.6% | −12.1pp |
| CAQS Target (Analyze+Evaluate) | 40% | 40% | **Still −31.4pp** |
| Items needed for CAQS HO target | 523 | 800 | **Wider gap than previously known** |

The CAQS §6.2 target of 40% Evaluate+Analyze requires ~1,018 true higher-order items. At current quality rates, creating new HO items is insufficient — **~309 existing items need reclassification downward, and the remaining gap of ~800 items needs new, genuinely high-quality HO items.**

### Learner Safety

Zero learner-safety risk from misclassification alone (labels don't affect scoring). However:
- Difficulty calibration may be wrong (Evaluate at Easy should not exist — but 6 still do)
- Educational feedback quality is unaffected (explanations work regardless of label)
- Campaign prioritization based on inflated HO metrics leads to suboptimal resource allocation

## 8. Recommendations

### Tier 1 — Immediate Data Quality

1. **Downgrade the ~26 projected Remember-labeled-as-Evaluate items** to Remember. These are definition-matching questions that block accurate reporting.
2. **Fix P1-FD-046** — structural defect with all empty fields.
3. **Recalibrate the 309 overstated items** — at minimum, add a `corrected_cognitive_level` field or downgrade the label.

### Tier 2 — Campaign Quality Reform

4. **Pre-certification cognitive audit** — Before certifying any item as Evaluate, independently verify it meets all 4 Evaluate criteria.
5. **Definition-match detection rule** — If stem-to-correct-choice lexical overlap exceeds 50%, block Evaluate/Analyze labeling (automated gate).
6. **Section EC rebuild** — Pack C Section E's 27 "Evaluate" items are primarily COSO definition-matching. Consider full reclassification.

### Tier 3 — Strategic Implications

7. **The "more rewrites" strategy is insufficient.** At 41.3% accuracy, a 50-item Evaluate creation campaign produces only ~21 genuine Evaluate items. Quality-first labeling is more impactful than volume-first expansion.
8. **Pack D Section B should be the benchmark.** At 71% accuracy with extensively authored scenarios, it demonstrates what genuine higher-order design looks like.

---

*Generated: 2026-07-31 | Session 93P Misclassification Report*
