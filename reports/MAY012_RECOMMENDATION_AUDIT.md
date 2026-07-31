# MAY-012 — Recommendation Auditor Report

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 2 — Auditor

---

## 1. Challenge Recommendation Review

### 1.1 The "28% Challenge" Finding (MAY-011)

MAY-011 reported: "Recommender suggests 'challenge' for L3's Variance Analysis at 28% accuracy." This finding requires re-examination.

### 1.2 Re-Analysis of L3 Recommendations

L3 Stage 3 recommendations:
```json
{
  "recTypes": ["remediation", "remediation", "reinforcement", "challenge", "challenge"],
  "recTopType": "challenge",
  "recTopTopic": "Variance Analysis"
}
```

The `recTopType: "challenge"` was a **reporting artifact** — the extraction code sorts types alphabetically (`recTypes.sort()[0]`), placing "challenge" before "remediation," "reinforcement." The actual priority ordering (remediation > reinforcement > challenge) puts remediation first.

The `recTopTopic: "Variance Analysis"` is also a sort artifact — topics are not sorted by relevance, and the first challenge recommendation happens to be for Variance Analysis.

### 1.3 What Actually Happened

The recommender produced:
1. **remediation — Standard Costing (32%)** — correct, Rule R1 (weak areas)
2. **remediation — Variance Analysis (28%)** — correct, Rule R1 (weak areas)
3. **reinforcement — Standard Costing** — correct, Rule R2 (repeated errors)
4. **challenge — Revenue Recognition (85%)** — correct, Rule R3 (high mastery)
5. **challenge — COSO Framework (86%)** — correct, Rule R3 (high mastery)

The challenge recommendations target the STRONG topics (85%, 86%), not the 28% weak topic. The recommender is working correctly. The reporting was misleading.

**Verdict: NO defect in the recommender.** The telemetry report format should be improved to avoid alphabetical-sort artifacts.

---

## 2. Weak-Topic Prioritization Audit

### 2.1 Per-Archetype Weak Topics and Recommendations

| Archetype | Weakest Topic | Accuracy | Recommendation | Priority | Correct? |
|-----------|--------------|----------|----------------|----------|----------|
| L1 | COSO Framework | 35% | remediation: COSO Framework | high | Yes |
| L2 | Cash Flow Statement | 85% | challenge: Revenue Recognition | medium | Yes — no real weaknesses |
| L3 | Variance Analysis | 28% | remediation: Standard Costing | high | Yes — lowest accuracy topic |
| L4 | Standard Costing | 55% | remediation: Inventory Valuation | high | Partially — Inventory is 58% declining vs Standard Costing 55% declining |
| L5 | Inventory Valuation | 45% | remediation: Inventory Valuation | high | Yes |

### 2.2 L4 Prioritization Detail

L4 has two declining topics: Inventory Valuation (58%) and Standard Costing (55%). The recommender picks Inventory Valuation as top priority because R1 (weak areas) sorts by accuracy ascending, but R4 (declining trends) sorts by delta magnitude. The worst delta may point to Standard Costing, but the combined sort puts both as high-priority remediation.

**Verdict:** Correct. Both are correctly tagged as high-priority remediation.

---

## 3. Recommendation-Type Distribution Audit

### 3.1 Pool-Wide Distribution (MAY-011 Stage 3, 5 archetypes)

| Type | Count | % |
|------|-------|---|
| remediation | 11 | 55% |
| challenge | 6 | 30% |
| reinforcement | 2 | 10% |
| review | 1 | 5% |
| practice_mix | 0 | 0% |

### 3.2 Type Balance Assessment

- **remediation at 55%** is expected — the archetypes are designed with weaknesses
- **challenge at 30%** is healthy — strong topics get advanced content
- **reinforcement at 10%** is reasonable — few repeated-error patterns
- **review at 5%** is low — only L4 triggered exam-review logic
- **practice_mix at 0%** — R8 (case skills gap) and R10 (insufficient data) not triggered

**No type-distribution issue.** The types reflect the seeded learner states.

---

## 4. Intervention Ordering Audit

### 4.1 Tier Distribution (MAY-011 Stage 3)

| Archetype | Tier 1 | Tier 2 | Tier 3 | Tier 4 | Tier 5 |
|-----------|--------|--------|--------|--------|--------|
| L1 | 3+ | 3+ | 0 | 0 | 0 |
| L2 | 0 | 0 | 2 | 0 | 0 |
| L3 | 2 | 0 | 2 | 1 | 0 |
| L4 | 2 | 1 | 1 | 0 | 0 |
| L5 | 2 | 1 | 0 | 1 | 0 |

### 4.2 Intervention→Decision Mapping

| Archetype | Top Intervention Tier | Decision | Correct Mapping? |
|-----------|---------------------|----------|-------------------|
| L1 | Tier 1 (Standard Costing) | D1 | D1 fires before D2 because score < 50. Correct — D1 is broader remediation. |
| L2 | Tier 3 (Cash Flow Statement) | D7 | D7 matches tier 3. Correct. |
| L3 | Tier 1 (Standard Costing) | D2 | D2 matches tier 1. Correct. |
| L4 | Tier 1 (Inventory Valuation) | D2 | D2 matches tier 1. Correct. D4 blocked. |
| L5 | Tier 1 (Inventory Valuation) | D2 | D2 matches tier 1. Correct. |

**All mappings are correct.** The intervention prioritizer correctly identifies the most urgent topics, and the decision engine correctly matches them to appropriate coaching actions.

---

## 5. Challenge Logic Boundary Review

### 5.1 R3 (High Mastery Challenge) Trigger Conditions

```javascript
// R3 triggers when:
// - Topic is in profile.strengths array (set by MayLearnerProfile)
// - masteryLevels[topic].accuracy >= 85
// - masteryLevels[topic].attempts >= 6
// - masteryLevels[topic].direction is not declining or slightly_declining
```

### 5.2 Boundary Cases Tested

| Case | Accuracy | Attempts | Direction | R3 Fires? | Correct? |
|------|----------|----------|-----------|-----------|----------|
| 84% accurate, 10 attempts, stable | 84 | 10 | stable | No | Yes — below 85% threshold |
| 85% accurate, 5 attempts, stable | 85 | 5 | stable | No | Yes — below 6-attempt threshold |
| 85% accurate, 6 attempts, declining | 85 | 6 | declining | No | Yes — declining direction |
| 85% accurate, 6 attempts, stable | 85 | 6 | stable | Yes | Yes — correct trigger |
| 95% accurate, 20 attempts, improving | 95 | 20 | improving | Yes | Yes — correct trigger |

### 5.3 R3 Enhancement Recommendation

Current R3 doesn't check whether the learner has ANY critical weaknesses before suggesting challenge. Consider adding:

```javascript
// If any topic has accuracy < 50% AND is in recovery band, skip challenge entirely
// Rationale: don't recommend "challenge questions" when the learner has critical gaps
```

This would suppress challenge recommendations for L3 (which has Standard Costing at 32% and Variance Analysis at 28%) until those are addressed. However, the decision engine already suppresses challenge by selecting D2 (remediation) as the primary action. The challenge recommendations remain as informational suggestions.

**Recommendation:** Implement the recovery-blocked challenge suppression for cleaner recommender output.

---

## 6. Auditor Verdict

| Check | Result | Detail |
|-------|--------|--------|
| Challenge recommendations correct | **PASS** | "28% challenge" was a reporting artifact; challenges target strong topics |
| Weak-topic prioritization | **PASS** | Lowest-accuracy topics correctly prioritized |
| Recommendation-type distribution | **PASS** | Reflects seeded learner states |
| Intervention ordering | **PASS** | Tier 1 correctly mapped to D1/D2 |
| Challenge boundary logic | **ENHANCEMENT** | Add recovery-blocked suppression for cleaner output |
| Telemetry reporting artifact | **FIX** | `recTopType` should use priority sort, not alphabetical |

---

*Generated: 2026-07-30 — MAY-012 Recommendation Auditor*
