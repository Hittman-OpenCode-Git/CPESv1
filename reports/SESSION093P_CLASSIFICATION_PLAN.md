# Session 93P — Classification Validation Audit Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** COMPLETE

---

## 1. Objective

Determine the true cognitive distribution of the repository by validating whether Evaluate-classified and Analyze-classified items actually meet their respective Bloom's taxonomy standards.

## 2. Sampling Design

### 2.1 Population

| Category | Population | Source |
|----------|-----------|--------|
| Evaluate-labeled | 246 items | All 5 packs, Function constructor parse (2026-07-31) |
| Analyze-labeled | 282 items | All 5 packs, Function constructor parse (2026-07-31) |

### 2.2 Sampling Method

**Stratified random sampling** with proportional allocation by pack × section.

- Seed: 20260731 (reproducible)
- Target: 75 items per cognitive level (150 total)
- Minimum 1 item per pack×section stratum where population > 0

### 2.3 Sample Coverage

| Pack | Evaluate Sample | Evaluate Population | Analyze Sample | Analyze Population |
|------|----------------|---------------------|---------------|-------------------|
| Pack A | 20/64 (31.3%) | 64 | 18/69 (26.1%) | 69 |
| Pack B | 8/21 (38.1%) | 21 | 7/21 (33.3%) | 21 |
| Pack C | 14/46 (30.4%) | 46 | 16/58 (27.6%) | 58 |
| Pack D | 18/97 (18.6%) | 97 | 32/117 (27.4%) | 117 |
| Pack E | 2/18 (11.1%) | 18 | 2/17 (11.8%) | 17 |
| **Total** | **75/246 (30.5%)** | **246** | **75/282 (26.6%)** | **282** |

### 2.4 Statistical Power

- **Evaluate:** 75/246 sample → 95% CI ±9.5% for observed proportion near 50%
- **Analyze:** 75/282 sample → 95% CI ±10.0% for observed proportion near 50%
- Combined HO sample: 150/528 (28.4%) → sufficient for pool-wide projections

## 3. Classification Criteria

### 3.1 Evaluate Test

Must satisfy ALL four criteria:
1. **Decision maker** — a named stakeholder with a role making a choice
2. **Competing alternatives** — explicit trade-offs, not a single calculable answer
3. **Judgment under uncertainty** — no single deterministic rule; requires weighing factors
4. **Selection of best option** — candidate must choose among multiple defensible options

### 3.2 Analyze Test

Must include:
- Cause-effect analysis, pattern recognition, relationship evaluation, or decomposition
- Multiple data points to interpret
- "Why"/"how" question framing
- NOT just a one-step retrieval or definition match

### 3.3 Apply Indicators

- Known rule directly applied
- Known procedure followed step-by-step
- Known formula with number substitution
- Single correct process yields the answer
- No judgment between competing alternatives

### 3.4 Understand/Remember Indicators

- Definition-to-term matching
- Single-step retrieval of a known fact
- Stem basically defines a concept, answer is the concept name

## 4. Audit Execution

- **Method:** 6 task agents, each auditing 25 items against explicit criteria
- **Batch files:** `scripts/output/093p_batches/batch_1.json` through `batch_6.json`
- **Criteria reference:** `scripts/output/093p_batches/criteria.json`
- **Confidence levels:** HIGH, MEDIUM, LOW assigned per item

## 5. Research Questions

| # | Question | Method |
|---|----------|--------|
| Q1 | Is the misclassification rate at or above 50%? | Direct classification audit |
| Q2 | Which packs/sections have the highest misclassification? | Per-pack/per-section analysis |
| Q3 | Which campaigns produced the highest-quality Evaluate inventory? | Cross-reference with modernization history |
| Q4 | Should future campaigns target rewrites or quality correction? | Comparative analysis of accuracy rates |

## 6. Success Criteria

- [x] No repository modifications
- [x] No certification changes
- [x] No overlap with Session 91
- [x] Statistically meaningful sample (150 items, 28.4% of HO pool)
- [x] Explicit criteria applied consistently across 6 agents
- [x] Quantified Evaluate accuracy
- [x] Quantified Analyze accuracy
- [x] Corrected higher-order estimate with confidence intervals

---

*Generated: 2026-07-31 | Session 93P Planner Phase*
