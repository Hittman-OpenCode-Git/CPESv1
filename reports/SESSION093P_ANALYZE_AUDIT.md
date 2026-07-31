# Session 93P — Analyze Classification Audit

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Sample:** 75 of 282 Analyze-labeled items (26.6%)
**Methodology:** Stratified random sampling + explicit Bloom's taxonomy criteria

---

## 1. Executive Summary

**58.7% of sampled Analyze-labeled items are misclassified.** The true Analyze pool is projected at ~117 items (41.3% accuracy), not the 282 currently labeled. The dominant misclassification patterns are Apply-disguised-as-Analyze (30.7%) and Understand-disguised-as-Analyze (26.7%). The most severe misclassification is Pack D Section D: 5 of 5 sampled items are Understand-level (definition matching), labeled as Analyze.

## 2. Aggregate Results

| True Cognitive Level | Count | % of Sample | Classification |
|---------------------|-------|-------------|----------------|
| **Analyze** | 31 | 41.3% | Correctly labeled |
| Evaluate (upgrade potential) | 0 | 0.0% | No item would warrant upgrade to Evaluate |
| Apply | 23 | 30.7% | Overstated by 1 tier |
| Understand | 20 | 26.7% | Overstated by 2 tiers |
| Remember | 1 | 1.3% | Overstated by 3 tiers |

**Misclassification rate: 58.7% (95% CI: 47.4% – 69.1%)**

## 3. Per-Pack Breakdown

| Pack | Sampled | True Analyze | Accuracy | Primary Misclass Pattern |
|------|---------|-------------|----------|--------------------------|
| **Pack A** | 18 | 8 | **44.4%** | Formula application (A-064, A-039, B-013) labeled as Analyze |
| **Pack B** | 7 | 3 | **42.9%** | Mixed: procedure application + concept comprehension |
| **Pack C** | 16 | 7 | **43.8%** | Section CC/DC: formula substitution as analysis |
| **Pack D** | 32 | 12 | **37.5%** | Section DD: systemic definition-matching problem |
| **Pack E** | 2 | 1 | **50.0%** | Small sample; inconclusive |

## 4. Section-Level Hotspots

### High-Quality Sections

| Section | Pack | Sampled | Accuracy | Notes |
|---------|------|---------|----------|-------|
| **Section EC** | Pack C | 10 | **60%** | COSO diagnosis items — genuine cause-effect analysis |
| **Section ED** | Pack D | 11 | **55%** | COSO violation analysis — solid at identifying root cause |
| **Section BD** | Pack D | 10 | **60%** | Budget variance/trend analysis — appropriate Analyze level |

### Critical Failure Sections

| Section | Pack | Sampled | Accuracy | Root Cause |
|---------|------|---------|----------|------------|
| **Section DD** | Pack D | 3 | **0%** | All 3 sampled items are definition-to-term matching (kaizen costing, reciprocal method, normal costing) |
| **Section CD** | Pack D | 4 | **0%** | All 4 sampled items are concept comprehension (common-size analysis, EVA, TQM, cost-benefit) |
| **Section A** | Pack A | 3 | **0%** | ASC rule application (LCNRV, CECL, depreciation formula) |

## 5. Misclassification Patterns

### Pattern 1: Formula Substitution as Analysis (cross-pack)

**Example:** P1-A-039 — "Compute straight-line depreciation: ($124,800 − $12,000) / 7 = $16,114"
- Label: Analyze
- True: Apply
- Reason: Known formula. One-step substitution. No interpretation, no pattern recognition.

**Example:** P1-CC-061 — "Fixed overhead volume variance = Budgeted FOH − Applied FOH = $48,000 U"
- Label: Analyze
- True: Apply
- Reason: Direct formula plug-in. No decomposition or interpretation.

### Pattern 2: Definition-Matching as Analysis (Pack D Sections CD/DD)

**Example:** P1-CD-061 — Stem describes "expressing line items as a percentage of revenue"
- Label: Analyze
- True: Understand
- Reason: The stem is the textbook definition of common-size vertical analysis. Answer is the term.

**Example:** P1-DD-036 — Stem describes "ongoing cost reduction targets for existing products with gradual improvement"
- Label: Analyze
- True: Understand
- Reason: The stem defines kaizen costing. Answer matches the description to the label.

### Pattern 3: Procedure Execution as Analysis (cross-pack)

**Example:** P1B-C-108 — "Fixed overhead volume variance = Budgeted FOH minus Applied FOH"
- Label: Analyze
- True: Apply
- Reason: Standard variance formula execution. No interpretation of what caused the variance.

### Pattern 4: COSO Classification as Analysis (Pack D Section ED)

**Example:** P1-ED-046 — "Ethics training and code of conduct acknowledgment supports which COSO component?"
- Label: Analyze
- True: Apply
- Reason: Applying the COSO framework: ethics training → control environment. Known taxonomy applied to described activity.

## 6. Genuine Analyze Exemplars

- **P1-B-022** (Pack A Section B): Evaluates 5-batch deviation trend to distinguish progressive deterioration from random fluctuation in learning curve — genuine pattern recognition
- **P1-D-015** (Pack A Section D): Classifies costs into COQ categories, computes prevention-to-failure ratio, interprets underinvestment signal — multi-step decomposition and interpretation
- **P1-ED-013** (Pack D Section E): Decomposes IT-dependent manual control to identify why transaction splitting circumvents a single-attribute threshold — cause-effect analysis
- **P1B-F-108** (Pack B Section F): Classifies SOC 2 findings against trust services criteria, evaluates which combination affects audit reliance — multi-factor analytical evaluation

---

*Generated: 2026-07-31 | Session 93P Auditor Phase — Analyze*
