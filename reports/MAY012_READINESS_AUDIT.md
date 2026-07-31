# MAY-012 — Readiness Auditor Report

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 2 — Auditor

---

## 1. Score Output Alignment With Learner Quality

### 1.1 Per-Archetype Score-to-Accuracy Gap

| Archetype | Raw Accuracy (wt. avg) | MayReadinessEngine Score | Gap | Aligned? |
|-----------|----------------------|--------------------------|-----|----------|
| L1 | ~42% | 45 | +3 | Yes — "Recovery needed" |
| L2 | ~87% | 55 | **-32** | No — severe understatement |
| L3 | ~67% | 52 | -15 | Acceptable — weak topics drag |
| L4 | ~63% | 55 | -8 | Acceptable |
| L5 | ~70% | 62 | -8 | Acceptable |

**Finding:** L2's 32-point gap between raw accuracy and composite score is the only severe misalignment. The gap is caused by band→score discretization: topics at 82-91% accuracy are classified "Approaching review-ready" (band score 75), but the section-level roll-up further degrades most sections to "Developing" (band score 55), producing a composite of 55.

### 1.2 Band Distribution Audit

From MAY-011 Stage 3:

| Band | Count | Profiles |
|------|-------|----------|
| Recovery needed | 1 | L1 (correct) |
| Developing | 3 | L3, L4, L5 (acceptable for mixed profiles) |
| Approaching review-ready | 1 | L2 (understated — should be higher) |
| Ready for focused review | 0 | — |
| Not enough data | 0 | — |

L2 belongs in "Approaching review-ready" but the band label alone is less problematic than the numeric score. The band accurately reflects "not yet ready but progressing well." However, L2's 3 topics at "Ready for focused review" and 3 at "Approaching" should produce at minimum a band of "Approaching review-ready" with a score higher than 55.

---

## 2. Score Monotonicity Verification

### 2.1 Rank-Order Check

| Profile | Accuracy | Score | Rank by Accuracy | Rank by Score | Monotonic? |
|---------|----------|-------|------------------|--------------|------------|
| L2 | 87% | 55 | 1 | 3 | **NO** — L5 scored higher (62) with worse accuracy (70%) |
| L5 | 70% | 62 | 2 | 1 | — |
| L3 | 67% | 52 | 3 | 4 | **NO** — L4 scored higher (55) with worse accuracy (63%) |
| L4 | 63% | 55 | 4 | 2 | — |
| L1 | 42% | 45 | 5 | 5 | Yes |

**Monotonicity violations: L2 under-ranked, L5 over-ranked.**

L5 scores 62 despite 70% accuracy because its topics are distributed across bands: 2 at "Ready for focused review" (COSO at 88%, Budgeting at 82%) AND 2 at "Recovery needed" (Inventory at 45%, Standard Costing at 50%). The ready topics push some sections to "Approaching" band, lifting the composite. L2 gets no such lift because *all* its topics are in the same band tier ("Approaching"), and the section roll-up is conservative.

### 2.2 Root Cause of L5 > L2

The monotonicity inversion occurs because the band system rewards *variance* in topic readiness. L5 has two very strong topics (88%, 82%) that push two sections to "Approaching," plus two very weak topics. L2 has uniform strength across all topics, but none cross the "Ready" threshold due to stability/attempt constraints. Uniform strength is scored lower than spiky strength.

**This is a design flaw in the band→score pipeline.** A learner with consistent 85% across 6 topics should never score lower than a learner with 88% on 2 topics and 45% on 2 topics.

---

## 3. Outlier Detection

### 3.1 Extreme Low

L1's score of 45 with 42% accuracy is reasonable. The score is slightly above accuracy because of study consistency bonuses (5 sessions, streak factors). No outlier concern.

### 3.2 Extreme High

No extreme high scores observed (max 62 across profiles). The scoring system is biased conservatively, not liberally. This is safer for learners (false negatives are better than false positives) but the L2 case shows the conservatism can be misleading.

### 3.3 Between-Stage Score Drift

| Archetype | Stage 2 Score | Stage 3 Score | Stage 4 Score | Drift |
|-----------|--------------|--------------|-------------|-------|
| L1 | 45 | 45 | 45 | **0** |
| L2 | 68 | 55 | 72 | **17** — high volatility |
| L3 | 48 | 52 | 48 | 4 |
| L4 | 55 | 55 | 45 | 10 |
| L5 | 55 | 62 | 58 | 7 |

**L2 varies from 55 to 72 across stages — a 17-point spread.** This is caused by: Stage 2 runs ReadinessEngine standalone with different section aggregation than Stage 3/4 which run through the orchestrator + memory. The memory subsystem changes `topicCoverageTopicsAtReady` from 0 (Stage 3) to 4 (Stage 4), shifting the composite score significantly.

**Finding:** Score is not stable across pipeline stages for high-readiness profiles. The readiness engine should produce consistent scores regardless of whether memory is active.

---

## 4. Auditor Verdict

| Check | Result | Detail |
|-------|--------|--------|
| Scores align with learner quality | **FAIL** | L2 understated by 32 points |
| Score monotonicity preserved | **FAIL** | L5 (70%) scored higher than L2 (87%) |
| No extreme outliers | PASS | Conservative bias — no inflated scores |
| Between-stage stability | **FAIL** | L2 drifts 17 points between stages |

**Recommended actions (narrowed from calibration plan):**

1. **Add continuous accuracy component** to `_computeCompositeScore()` — 30% weight on per-section weighted average accuracy, 70% on band score. This directly fixes the L2 understatement and the L5 > L2 monotonicity violation.

2. **Add score floor guard** — composite score must never be lower than weighted average raw accuracy. This ensures L2 can't score <87 when their accuracy is 87%.

3. **Add topics-at-ready bonus** — +5 for >=3 topics at "Ready," +2 for >=2 topics. L2 has 3 topics at Ready; this bonus corrects the uniform-strength penalty.

---

*Generated: 2026-07-30 — MAY-012 Readiness Auditor*
