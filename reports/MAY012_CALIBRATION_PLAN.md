# MAY-012 — Adaptive Coaching Calibration Plan

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner
**Depends On:** MAY-011 Telemetry (`reports/MAY011_TELEMETRY.json`)

---

## 1. Calibration Objectives

This plan addresses three calibration gaps identified in MAY-011 telemetry:

| Gap | Severity | Impact | Target Fix |
|-----|----------|--------|------------|
| **G1 — High-readiness understated** | Medium | L2 (87% accuracy) scored 55/100, band "Developing" | Adjust band→score composite to incorporate continuous accuracy |
| **G2 — Challenge logic boundary** | Low | R3 recommends "challenge" at 28% accuracy for topics with strong peers | Add minimum-accuracy floor independent of peer topics |
| **G3 — Mode diversity constrained** | Low | 2 modes (QUIZ, EXPLAIN) vs. target 3+ | Document as seed-data artifact; add D3-D10 synthetic profiles |

---

## 2. G1 — High-Readiness Understatement (Band→Score Calibration)

### 2.1 Root Cause Analysis

Two parallel scoring engines produce different scores:

| Engine | File | Method | L2 Score |
|--------|------|--------|----------|
| MayReadinessEngine | `may-readiness-engine.js` | Section-aggregated BAND_SCORES via `_computeCompositeScore()` | 55 |
| MayReadinessScorer | `may-readiness-scorer.js` | Continuous accuracy × attempt-weighted composite | 68 |

The `MayReadinessEngine` (used by the orchestrator) uses fixed band scores:
```javascript
var BAND_SCORES = {
  'Not enough data': 0,
  'Recovery needed': 25,
  'Developing': 55,       // ← All "Developing" sections = 55 regardless of accuracy
  'Approaching review-ready': 75,
  'Ready for focused review': 95
};
```

When L2 has 6 topics with accuracy in the 82-91% range but none cross the "Ready" threshold (stability < 75% or attempts < 6), all sections map to "Developing" (55) or "Approaching" (75). The per-section band scores produce a flat, conservative composite.

**Key insight:** The band→score mapping discards the continuous accuracy signal. A topic at 74% "Developing" and a topic at 61% "Developing" both contribute 55 points. The gap between "Developing" (55) and "Approaching" (75) is 20 points — a large cliff that understates learners near the upper boundary of Developing.

### 2.2 Calibration Changes

**Change 1: Adjust BAND_SCORES to reduce the Developing→Approaching cliff**

```javascript
var BAND_SCORES = {
  'Not enough data': 0,
  'Recovery needed': 20,
  'Developing': 48,          // was 55 — reduce slightly, offset by accuracy bonus
  'Approaching review-ready': 72,  // was 75
  'Ready for focused review': 95
};
```

**Change 2: Add per-section accuracy bonus to composite**

Add a weighted accuracy component alongside band scores in `_computeCompositeScore()`:

```javascript
// For each section with data:
// bandScore (from BAND_SCORES) contributes 70% of section score
// accuracyScore (topic-weighted avg accuracy) contributes 30% of section score
// This means a Developing section at 74% accuracy scores higher than one at 61%
```

**Change 3: Add topics-at-ready count bonus**

```javascript
// If >= 3 topics are at "Ready for focused review", add a +5 bonus to composite
// If >= 2 topics are at "Approaching review-ready" or better with 0 recovery, add +3
```

### 2.3 Expected Impact

| Archetype | Before | After (estimated) | Band |
|-----------|--------|-------------------|------|
| L1 — Low-Readiness | 45 | 40-44 | Recovery needed |
| L2 — High-Readiness | 55 | 72-78 | Approaching review-ready |
| L3 — Weak-Topic | 52 | 50-54 | Developing |
| L4 — Exam-Near | 55 | 52-56 | Developing |
| L5 — Mixed-Performance | 62 | 58-63 | Developing |

L2's score should move from understated 55 to a more representative 72-78 range, reflecting 87% accuracy with 3 topics at "Ready for focused review."

---

## 3. G2 — Challenge Recommendation Boundary (R3 Accuracy Floor)

### 3.1 Root Cause Analysis

`may-adaptive-recommender.js` `_ruleHighMastery()` (line 98-120) only checks:
- Topic `accuracy >= 85`
- Topic `attempts >= 6`
- Direction is not declining

It does NOT check the overall learner state for weak topics. When a learner like L3 has strong peers (Revenue Recognition 85%, COSO Framework 86%) alongside a weak topic (Variance Analysis 28%), the recommender correctly generates `challenge` for the strong topics AND `remediation` for the weak one. The MAY-011 telemetry `recTopType: "challenge"` for L3 was a reporting artifact (alphabetical sort in `recTopType` calculation).

However, the recommender is working correctly — challenge recommendations target strong topics, and the decision engine (D2) correctly overrides with remediation. **No code change needed for this gap.**

### 3.2 Prioritization Adjustment (Optional Enhancement)

The recommender sorts recommendations by `typeOrder` where `remediation: 0` comes before `challenge: 3`. Add a secondary sort that prioritizes remediation whenever *any* topic has accuracy < 50% and is declining:

```javascript
// Inside _deduplicateAndSort, before the existing sort:
// If any action is remediation at high priority AND there's a topic <50% declining,
// ensure remediation actions appear first in the output array
```

This ensures the recommender's output always surfaces critical weaknesses before challenges, even when both types exist.

---

## 4. G3 — Mode Diversity Constraint

### 4.1 Root Cause Analysis

Only 2 modes (QUIZ, EXPLAIN) fired across 5 archetypes because:
- D1/D2 (QUIZ) dominate — any Tier 1 intervention or score < 50 blocks D3-D10
- D3 (SOCRATIC) requires stability < 50 + declining + 5+ attempts — a narrow window
- D4 (STUDY_PLAN) requires exam <= 30 days with Developing/Recovery band AND no tier 1 interventions
- D5-D10 have lower priority than D2, so D2 blocks them for all learners with critical weaknesses
- D9 (QUIZ) requires accuracy >= 85% + attempts >= 6 + stable/improving, but D3/D5/D6/D7 fire first

### 4.2 Calibration

**No D4 priority change:** D2 correctly blocks D4 — critical weaknesses must be fixed before exam strategy. This is a design decision, not a defect.

**Synthetic profile approach:** Mode diversity will be demonstrated via decision-expansion synthetic profiles that intentionally create the conditions for D3-D10. See `MAY012_DECISION_COVERAGE_PLAN.md`.

### 4.3 Decision Priority Enhancement (Optional)

Consider adding a secondary-action field to the decision output so the pipeline can flag "after critical remediation, your exam strategy should be..." alongside the primary D2 action. This preserves D2's priority while surfacing D4 as a follow-up.

---

## 5. Calibration Harness Specification

A new script, `scripts/may012_calibration_runner.js`, will:

1. Load all 28 May modules in a Node.js sandbox (same pattern as `may011_scenario_runner.js`)
2. Seed 15 synthetic learner profiles (5 original + 10 new decision-triggering profiles)
3. Execute the full orchestrator pipeline for each profile
4. Generate calibration telemetry:
   - `readinessDistribution` — band + score histogram
   - `decisionCoverage` — which D1-D10 fired and on which profiles
   - `recommendationCoverage` — which R1-R10 fired
   - `modeCoverage` — coaching mode distribution
5. Verify determinism (3-run consistency)
6. Compare pre/post calibration scores
7. Exit 0 on all criteria pass

---

## 6. Success Criteria

| ID | Criterion | Target | Method |
|----|-----------|--------|--------|
| CAL1 | High-readiness score alignment | L2 score >= 68 | Compare pre/post calibration runner |
| CAL2 | Decision coverage | D1-D10 each triggered >= 1 time | decisionCoverage from runner |
| CAL3 | Mode diversity | >= 4 distinct modes | modeCoverage from runner |
| CAL4 | No high-performer regressions | L1/L3/L4/L5 within ±8 of pre-calibration | Runner comparison |
| CAL5 | Determinism preserved | 3-run identical output | Runner determinism check |
| CAL6 | Recommendation quality | No challenge rec for topic < 50% accuracy | Recommendation audit |
| CAL7 | Zero governance regressions | 0 pack/case/registry changes | Preflight pass |

---

*Generated: 2026-07-30 — MAY-012 Calibration Planner*
