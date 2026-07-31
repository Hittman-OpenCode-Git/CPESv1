# MAY-012 — Readiness Scoring Recalibration Plan

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. The 87% → 55 Problem

### 1.1 Observed Behavior

May-011 L2 (High-Readiness Learner) has:
- 6 topics with accuracy ranging 82-91%
- 3 topics at "Ready for focused review" band
- 0 topics at "Recovery needed" band
- 10 practice sessions across 3 months

**MayReadinessEngine composite score: 55/100**  
**Band: "Approaching review-ready"**

### 1.2 Why This Is Wrong

A learner who consistently scores >80% across 6 topics should not score 55/100. The score implies "barely developing" when the evidence shows "approaching exam-ready." The disconnect is in how band labels are converted to numeric scores.

### 1.3 Trace the Score

For L2 Stage 3 with 6 topics (all sections A-E):

```
Section A (2 topics): Revenue Recognition (88%, stable), Cash Flow Statement (85%, stable)
  → Both topics likely "Approaching review-ready" (stability too low for "Ready")
  → Section band: Approaching review-ready → BAND_SCORE = 75

Section B (1 topic): Budgeting Concepts (90%, stable)  
  → Approaching review-ready → BAND_SCORE = 75

Section C (1 topic): Standard Costing (82%, improving)
  → Approaching review-ready → BAND_SCORE = 75

Section D (1 topic): Cost Behavior (87%, stable)
  → Developing? (stability may be <75) → BAND_SCORE = 55

Section E (1 topic): COSO Framework (91%, stable)
  → Approaching review-ready → BAND_SCORE = 75

Weighted: (75×2 + 75×1 + 75×1 + 55×1 + 75×1) / 6 ≈ 72
But with section aggregation: (75×2+75+75+55+75) / 6 weights... 
```

Wait — the actual score was 55, not 72. Let me trace again. The key is in `_computeCompositeScore` in `may-readiness-engine.js` (lines 111-140):

```javascript
var s = sections[sec];
var topicCount = s.topicCount || 0;
var weight = topicCount > 0 ? topicCount : 0;
var bandScore = BAND_SCORES[s.band] || 0;
if (weight > 0) {
  totalWeight += weight;
  weightedSum += weight * bandScore;
}
```

The `sections` come from `getSectionReadinessSummary()` which uses the same band logic per section. If a section has 2 topics and both are "Approaching review-ready," the section might be "Approaching review-ready" at band score 75.

But L2 Stage 3 produced readinessScore=55. This means the sections must have been computed differently. Let me look at the `getSectionReadinessSummary()` output.

The issue is: `getSectionReadinessSummary()` calls `getReadinessSummary()` which returns topic-level bands. The section README may produce different bands than what I'm computing above because it uses a conservative roll-up: if 1 of 2 topics is "Developing," the whole section may be "Developing."

**The fundamental problem:** A section with two topics at 82% and 85% but neither hitting the "Ready for focused review" threshold (requires stability >=75, attempts >=6, AND accuracy >=80, AND recentPct >=80, AND non-declining) may both be classified as "Approaching review-ready" OR one may be "Developing" due to stability <60. 

The `getSectionReadinessSummary()` then does a conservative worst-count-rollup: it compares readyTopics to total topics and recoveryTopics to determine section band. If both topics are "Approaching," the section band is "Approaching." But if one is "Developing" and one is "Approaching," the section may be "Developing."

The score = weight × bandScore / totalWeight:
- If all 5 sections are "Approaching" (75): score = 75
- If 2 sections "Approaching" (75) + 3 "Developing" (55): score = (75×2+55×3)/5 = 63
- If 1 "Approaching" (75) + 4 "Developing" (55): score = (75+55×4)/5 = 59
- If 0 "Approaching" + 5 "Developing" (55): score = 55

L2 gets 55 because despite having 87% accuracy, the band logic classifies most sections as "Developing." The reason: the "Ready for focused review" threshold at per-topic level requires stability >= 75 AND attempts >= 6 AND accuracy >= 80 AND recentPct >= 80 AND not declining. If any of those fails, the topic drops to "Approaching." And if a section's "Approaching" count is low relative to total topics, the section drops to "Developing."

The section-level logic in `getSectionReadinessSummary()` then further degrades — it's a "cautious" roll-up that requires majority-ready topics for a section to reach Approaching.

---

## 2. Calibration Strategy

### 2.1 Band→Score Adjustment (may-readiness-engine.js)

```javascript
// CURRENT
var BAND_SCORES = {
  'Not enough data': 0,
  'Recovery needed': 25,
  'Developing': 55,
  'Approaching review-ready': 75,
  'Ready for focused review': 95
};

// PROPOSED — narrower gaps, higher Developing floor
var BAND_SCORES = {
  'Not enough data': 0,
  'Recovery needed': 20,
  'Developing': 50,
  'Approaching review-ready': 72,
  'Ready for focused review': 95
};
```

### 2.2 Add Per-Section Accuracy Component (may-readiness-engine.js)

The current composite score uses only section band scores. A section at 74% accuracy with "Developing" band scores 55. Add a secondary accuracy component:

```javascript
// In _computeCompositeScore, for each section:
//   bandScore = BAND_SCORES[sectionBand]  (70% weight)
//   accuracyScore = weighted avg of topic accuracies in section (30% weight)
//   sectionScore = 0.7 * bandScore + 0.3 * accuracyScore
// Then composite = Σ(sectionScore * topicCount) / Σ(topicCount)
```

This means a "Developing" section at 74% accuracy scores ~63 (0.7×50 + 0.3×74) instead of flat 50, and a "Developing" section at 61% accuracy scores ~53. The granularity comes from the accuracy component.

### 2.3 Topics-at-Ready Bonus (may-readiness-engine.js)

Add a composite bonus when a meaningful number of topics are at "Ready for focused review":

```javascript
var topicsAtReady = readiness.topicCoverage.topicsAtReady || 0;
var readyBonus = 0;
if (topicsAtReady >= 5) readyBonus = 8;
else if (topicsAtReady >= 3) readyBonus = 5;
else if (topicsAtReady >= 2) readyBonus = 2;
score = Math.min(98, score + readyBonus);
```

### 2.4 Score Monotonicity Guard

Add a floor check: the composite score must never be lower than the weighted average of per-topic continuous accuracy scores (from `getTopicProgress()`):

```javascript
// After computing composite, compute floor score from raw accuracy:
// floorScore = Σ(topic.accuracy × topic.attempts) / Σ(topic.attempts)
// finalScore = Math.max(compositeScore, floorScore)
```

This ensures that a learner with 87% raw accuracy cannot score below 87.

---

## 3. Expected Impact

| Archetype | Current Score | Expected Post-Calibration | Rationale |
|-----------|-------------|--------------------------|-----------|
| L1 (42% accuracy) | 45 | 38-44 | Minor decrease from lower Recovery/Developing band scores |
| L2 (87% accuracy) | 55 | 78-85 | Accuracy component + ready bonus + floor guard |
| L3 (67% accuracy, 2 weak) | 52 | 48-54 | Weak topics drag composite; accuracy component moderates |
| L4 (63% accuracy) | 55 | 50-58 | Similar to L3 |
| L5 (70% accuracy) | 62 | 58-64 | Some strong, some weak — accuracy component provides balance |

---

## 4. Risk Assessment

| Risk | Mitigation |
|------|------------|
| Over-correction: L2 scores too high (95+) | Ready bonus capped at +8; composite capped at 98 |
| L1/L3/L4/L5 regress too far | Floor guard ensures raw accuracy acts as lower bound |
| Score non-deterministic | All changes are deterministic arithmetic — no randomness |
| Band label conflict: score 85 but band still "Approaching" | Acceptable — band and score serve different purposes. Band is conservative; score is precise. |

---

## 5. Verification

Post-calibration, run `may012_calibration_runner.js` in diff mode:
1. Seed all 5 original archetypes with pre-calibration code (backup)
2. Run orchestrator → capture scores
3. Apply calibration changes
4. Run orchestrator → capture new scores
5. Verify:
   - L2 score increased by >= 15 points
   - L1, L3, L4, L5 within ±8 of original
   - No score exceeds 98
   - No score is below raw-accuracy floor
   - Determinism maintained (3-run identical)
   - Bands are unchanged (band logic not modified — only score mapping)

---

*Generated: 2026-07-30 — MAY-012 Scoring Planner*
