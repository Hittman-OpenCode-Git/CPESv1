# MAY-013 — Calibration Plan

**Session:** MAY-013
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Calibration Baseline (MAY-012)

| Metric | MAY-012 Actual | MAY-013 Target |
|--------|---------------|----------------|
| L2 score | 62 | 68+ |
| Band→score monotonicity | FAIL (L5 > L2) | PASS |
| Between-stage stability | L2 drifts 17pts | ≤ 8pts |
| Band distribution | 0 "Approaching", 0 "Ready" across archetypes | ≥ 1 Approaching/Ready |

---

## 2. Root Cause: `getReadinessSummary()` Band Assignment Too Aggressive

### 2.1 Current Band Rules (line 637-643)

```javascript
} else if ((accuracy !== null && accuracy < 60) || direction === 'declining' ||
           (stability !== null && stability < 50)) {
    band = 'Recovery needed';
```

**Problem:** ANY of these three conditions independently triggers "Recovery needed":

| Trigger | Example | Actual severity |
|---------|---------|----------------|
| accuracy < 60 | 55% acc, 70 stability, improving, 8 attempts | Should be Developing, not Recovery |
| direction === 'declining' | 82% acc, 80 stability, recently missed 2/5 | Should be Approaching with watch flag |
| stability < 50 | 68% acc, improving, but early attempts varied | Should be Developing/fragile |

**Impact:** This aggressive banding causes:
- Tier 1 interventions on topics that are really tier 2/3
- D2 dominates, blocking D3 (SOCRATIC) and D7 (EXPLAIN fragile)
- Section roll-up drops to "Developing" whenever one topic gets "Recovery"
- L2 (87% accuracy) scored at Developing band because 2 topics have stability <75

### 2.2 Tier Classification Cascade

```
getReadinessSummary() band → _classifyTier() → D2 blocks D3-D10
         ↑                        ↑
  Recovery if acc<60     Tier 1 if Recovery+declining+5 attempts
```

This is a single linear pipeline with no escape valve for borderline cases.

---

## 3. Calibration Changes

### Change 1: Narrow Recovery Band Triggers

**File:** `may-learner-state.js` — `getReadinessSummary()`, lines 637-643

**Current:**
```javascript
} else if ((accuracy !== null && accuracy < 60) || direction === 'declining' ||
           (stability !== null && stability < 50)) {
    band = 'Recovery needed';
```

**New:**
```javascript
// Recovery requires EITHER:
//   - accuracy < 50 (truly failing) OR
//   - accuracy 50-60 AND declining AND stability < 50 (triple-fail)
} else if (accuracy !== null && accuracy < 50) {
    band = 'Recovery needed';
    if (accuracy < 50) signals.push('critical_low_accuracy');
} else if ((accuracy !== null && accuracy >= 50 && accuracy < 60) &&
           direction === 'declining' &&
           stability !== null && stability < 50) {
    band = 'Recovery needed';
    signals.push('low_accuracy', 'declining_trend', 'unstable');
```

**What changes:** 
- accuracy < 60 → accuracy < 50 for standalone Recovery
- Topics at 50-60% with stable/improving → Developing (not Recovery)
- Topics at 50-60% with declining+unstable → still Recovery (triple confirmation)

### Change 2: Add "Fragile Developing" Sub-Band

**New logic between Recovery and existing Developing:**

```javascript
// Fragile Developing: accuracy 50-60, stable or improving, need consolidation
} else if (accuracy !== null && accuracy >= 50 && accuracy < 60) {
    band = 'Developing';
    signals.push('fragile_developing', 'needs_consolidation');
```

This narrows the Recovery→Developing gap and provides the Decision Engine with a clear signal for D7 (fragile knowledge = tier 3).

### Change 3: Adjust Section Roll-Up Recovery Penalty

**File:** `may-learner-state.js` — `getSectionReadinessSummary()`, lines 902-911

**Current:** If any topic is Recovery, section is capped at Developing.

**New:** Weighted penalty instead of binary cap. A section with 1 Recovery topic and 3 Ready topics should be "Approaching review-ready" with a recovery note, not "Developing":

```javascript
} else if (recoveryTopics.length === 1 && readyTopics.length >= 2) {
    sectionBand = 'Approaching review-ready';
    sectionRationale = readyTopics.length + ' topics ready, ' + recoveryTopics.length + ' needs recovery — address ' + recoveryTopics[0].topic + ' first.';
    sectionSignals = ['approaching_with_recovery_gap'];
    worstTopic = recoveryTopics[0].topic;
```

### Change 4: Increase Accuracy Component Weight

**File:** `may-readiness-engine.js` — `_computeCompositeScore()`, line 148

**Current:** `0.6 * bandScore + 0.4 * sectionAccuracy`

**New:** `0.5 * bandScore + 0.5 * sectionAccuracy`

Equal weight to band and continuous accuracy. This directly fixes the L5 > L2 monotonicity violation by giving accuracy more say in the composite.

### Change 5: Score Floor Guard (from Audit Recommendation)

**Add to `_computeCompositeScore()`:**

```javascript
// Floor guard: overall score must never be below weighted avg accuracy
var totalAcc = 0, totalAccWt = 0;
Object.keys(breakdown).forEach(function(sec) {
  var b = breakdown[sec];
  totalAcc += b.sectionAccuracy * b.weight;
  totalAccWt += b.weight;
});
var weightedAccuracy = totalAccWt > 0 ? Math.round(totalAcc / totalAccWt) : score;
score = Math.max(score, weightedAccuracy);
```

This ensures L2 (87% accuracy) cannot score <87. This is a safety guard for future calibration changes.

---

## 4. Expected Impact

| Archetype | MAY-012 Score | MAY-013 Expected | Band |
|-----------|-------------|-----------------|------|
| L1 (42% acc) | 42 | 38-42 | Recovery needed |
| L2 (87% acc) | 62 | 72-78 | Approaching review-ready |
| L3 (67% acc) | 55 | 58-63 | Developing |
| L4 (63% acc) | 49 | 52-57 | Developing |
| L5 (70% acc) | 52 | 58-63 | Developing |

**Key:** L2 should clear 68. L4/L5 should not regress. Monotonicity restored: scores should track accuracy.

---

## 5. Implementation Order

1. `may-learner-state.js`: Band rules (Change 1, 2) — unblocks D3, D7, reduces tier 1
2. `may-learner-state.js`: Section roll-up (Change 3) — lifts section bottlenecks
3. `may-readiness-engine.js`: Accuracy weight + floor guard (Change 4, 5) — fixes scores
4. Re-run calibration runner to verify

**Files modified:** `may-learner-state.js`, `may-readiness-engine.js`
**Governance boundary:** Coaching layer only — no pack/case/content impact

---

*Generated: 2026-07-30 — MAY-013 Calibration Planner*
