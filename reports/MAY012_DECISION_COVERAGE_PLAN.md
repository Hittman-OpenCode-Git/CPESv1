# MAY-012 — Decision Coverage Expansion Plan

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Current Coverage

From MAY-011 Stage 3 results across 5 archetypes:

| Decision | Triggered | Archetype | Why |
|----------|-----------|-----------|-----|
| D1 | Yes (2/5) | L1, L3 (Stage 4) | Score < 50 or "Recovery needed" band |
| D2 | Yes (3/5) | L3, L4, L5 | Tier 1 intervention exists |
| D3 | No | — | Requires stability < 50 + declining + 5+ attempts |
| D4 | No | — | Blocked by D2 (tier 1 weaknesses exist) |
| D5 | No | — | Blocked by D2 |
| D6 | No | — | Blocked by D2 |
| D7 | Yes (1/5) | L2 | Tier 3 intervention, no tier 1/2 |
| D8 | No | — | Requires <4 sections with data |
| D9 | No | — | Blocked by D7 |
| D10 | No | — | Fallback only when no other rules match |

**Coverage: 3/10 (30%)** — D1, D2, D7 only.

---

## 2. Target Coverage: D1-D10 All Triggered

### 2.1 Why 3/10 Is Expected

The MAY-011 archetypes were designed to represent realistic learner states, not to exercise every decision path. D3-D10 are narrow-path rules that require specific, intentionally-constructed learner states.

### 2.2 Expansion Approach

Create 7 additional synthetic learner profiles that intentionally trigger the untriggered rules. These profiles are **not replacements for the existing 5** but rather decision-path validation fixtures.

---

## 3. Synthetic Profile Specifications

### Profile S1 — D3 Trigger: Repeated Unstable Declining

**Target Decision:** D3 — SOCRATIC mode

**Required Conditions:**
- At least one weakness with stability < 50
- Attempts >= 5 on that weakness
- Direction = "declining"
- No tier 1 intervention exists (to avoid D2)
- No score < 50 (to avoid D1)

**Profile:**
```
LearnerId: MAY012-S1
DisplayName: D3 — Unstable Declining
Topics:
  - Revenue Recognition (A): accuracy=58%, attempts=7, stability=42, declining
  - Budgeting Concepts (B): accuracy=75%, attempts=5, stability=65, stable
  - Standard Costing (C): accuracy=55%, attempts=8, stability=38, declining
Session count: 6
Exam plan: none
```

**Expected Decision:** D3 on Standard Costing (lower accuracy, lower stability)  
**Expected Mode:** SOCRATIC  
**Expected Band:** Developing (~55-58)

---

### Profile S2 — D4 Trigger: Exam Approaching, No Critical Weaknesses

**Target Decision:** D4 — STUDY_PLAN mode

**Required Conditions:**
- Exam date within 30 days
- Overall band = "Developing" or "Recovery needed"
- No tier 1 intervention (to avoid D2)
- Score >= 50 (to avoid D1)

**Profile:**
```
LearnerId: MAY012-S2
DisplayName: D4 — Exam Strategy
Exam plan: { hasScheduledExam: true, examDate: offset +14 days, daysUntilExam: 14 }
Topics:
  - Revenue Recognition (A): accuracy=62%, attempts=10, stability=55, stable
  - Inventory Valuation (A): accuracy=64%, attempts=8, stability=52, stable
  - Cost Behavior (D): accuracy=65%, attempts=6, stability=55, stable
Session count: 8
```

**Note:** All accuracies are in the 60-65% range — below 75% so no "Approaching" band, but above 50% so no tier 1 intervention. Stability is low but above 40% so no D3.

**Expected Decision:** D4  
**Expected Mode:** STUDY_PLAN  
**Expected Band:** Developing (~52-58)

---

### Profile S3 — D5 Trigger: Declining Trends (Medium Priority)

**Target Decision:** D5 — QUIZ mode (declining remediation)

**Required Conditions:**
- At least one topic with declining trend
- No tier 1 or tier 2 interventions (to avoid D2, D6)
- Score >= 50 (to avoid D1)
- Not unstable + declining (to avoid D3)

**Profile:**
```
LearnerId: MAY012-S3
DisplayName: D5 — Declining Trends
Topics:
  - Revenue Recognition (A): accuracy=72%, attempts=6, stability=60, declining
  - Budgeting Concepts (B): accuracy=78%, attempts=8, stability=70, stable
  - COSO Framework (E): accuracy=74%, attempts=6, stability=65, stable
Session count: 5
```

**Note:** Revenue Recognition accuracy 72% is above tier 2 threshold (<60%). Stability 60% is above D3 threshold (<50%). Direction is declining. The intervention prioritizer should classify this as tier 3 (fragile knowledge) at worst.

**Expected Decision:** D5  
**Expected Mode:** QUIZ  
**Expected Band:** Developing (~65-68)

---

### Profile S4 — D6 Trigger: Emerging Weakness

**Target Decision:** D6 — QUIZ mode

**Required Conditions:**
- Tier 2 intervention exists (emerging weakness)
- No tier 1 intervention (to avoid D2)
- Score >= 50 (to avoid D1)
- Not declining enough for D5

**Profile:**
```
LearnerId: MAY012-S4
DisplayName: D6 — Emerging Weakness
Topics:
  - Cash Flow Statement (A): accuracy=55%, attempts=8, stability=45, slightly_declining
  - Budgeting Concepts (B): accuracy=80%, attempts=7, stability=72, stable
  - COSO Framework (E): accuracy=78%, attempts=6, stability=70, stable
Session count: 6
```

**Note:** Cash Flow Statement at 55% accuracy with 8 attempts should be tier 2 (emerging weakness: accuracy >= 50 and < 60, attempts >= 5). Stability 45% is not quite D3 territory (requires < 50 + declining; "slightly_declining" ≠ "declining").

**Expected Decision:** D6  
**Expected Mode:** QUIZ  
**Expected Band:** Developing (~60-65)

---

### Profile S5 — D8 Trigger: Section Coverage Gap

**Target Decision:** D8 — EXPLAIN mode

**Required Conditions:**
- Fewer than 4 sections with sufficient data (band != "Not enough data")
- No critical weaknesses (to avoid D1, D2)
- No tier 2/3 interventions (to avoid D6, D7)

**Profile:**
```
LearnerId: MAY012-S5
DisplayName: D8 — Section Coverage Gap
Topics (only 3 sections covered):
  - Revenue Recognition (A): accuracy=72%, attempts=5, stability=65, stable
  - Budgeting Concepts (B): accuracy=78%, attempts=5, stability=70, stable
  - Cost Behavior (D): accuracy=75%, attempts=5, stability=68, stable
Session count: 4
```

**Note:** Only sections A, B, D have data. Sections C, E, F have no topics. The 3 sections put us below D8's threshold of < 4. All accuracies above 60% so no recovery/tier 1. Stability above 50%.

**Expected Decision:** D8  
**Expected Mode:** EXPLAIN  
**Expected Band:** Approaching review-ready (~70-72)

---

### Profile S6 — D9 Trigger: High Mastery Challenge

**Target Decision:** D9 — QUIZ mode (challenge)

**Required Conditions:**
- At least one topic with accuracy >= 85%
- Attempts >= 6 on that topic
- Direction not declining
- No tier 1-3 interventions (to avoid D2/D6/D7)

**Profile:**
```
LearnerId: MAY012-S6
DisplayName: D9 — High Mastery
Topics:
  - Revenue Recognition (A): accuracy=89%, attempts=10, stability=82, stable
  - Budgeting Concepts (B): accuracy=92%, attempts=12, stability=88, stable
  - COSO Framework (E): accuracy=86%, attempts=9, stability=80, stable
  - Cost Behavior (D): accuracy=78%, attempts=6, stability=75, stable
Session count: 12
```

**Note:** All accuracies >= 78%. No tier 1/2/3 interventions. No declining topics. Score will be > 50 (no D1). Multiple topics at/high approaching ready. This should let D9 fire as the first match.

**Expected Decision:** D9  
**Expected Mode:** QUIZ (challenge action)  
**Expected Band:** Approaching review-ready (~75-82)

---

### Profile S7 — D10 Trigger: Insufficient Data Fallback

**Target Decision:** D10 — EXPLAIN mode

**Required Conditions:**
- Very little data overall
- No other rule matches

**Profile:**
```
LearnerId: MAY012-S7
DisplayName: D10 — Insufficient Data
Topics:
  - Revenue Recognition (A): accuracy=80%, attempts=2, direction=null, stability=null
Session count: 1
```

**Note:** Only 2 attempts on 1 topic — insufficient to trigger any other rule. Score won't be < 50 because insufficient data. No interventions. No declining topics. Barely any sections.

**Expected Decision:** D10  
**Expected Mode:** EXPLAIN  

---

## 4. Full Decision Coverage Matrix (Post-Expansion)

| Decision | MAY-011 Profile | MAY-012 Profile | Mode | Priority |
|----------|----------------|-----------------|------|----------|
| D1 | L1 (score 45) | — | QUIZ | critical |
| D2 | L3, L4, L5 | — | QUIZ | critical |
| D3 | — | S1 | SOCRATIC | high |
| D4 | — | S2 | STUDY_PLAN | high |
| D5 | — | S3 | QUIZ | medium |
| D6 | — | S4 | QUIZ | medium |
| D7 | L2 (tier 3) | — | EXPLAIN | medium |
| D8 | — | S5 | EXPLAIN | low |
| D9 | — | S6 | QUIZ | low |
| D10 | — | S7 | EXPLAIN | low |

**Post-expansion coverage: 10/10 (100%)**

---

## 5. Mode Distribution (Post-Expansion)

| Mode | Profiles | Count |
|------|----------|-------|
| QUIZ | L1, L3, L4, L5, S3, S4, S6 | 7 |
| EXPLAIN | L2, S5, S7 | 3 |
| SOCRATIC | S1 | 1 |
| STUDY_PLAN | S2 | 1 |

**4 distinct modes — exceeding the MAY-011 target of 3.**

---

## 6. Implementation

Synthetic profiles will be defined in `scripts/may012_synthetic_profiles.js` and consumed by `scripts/may012_calibration_runner.js`. The profiles must:

1. Use the same seeding infrastructure as MAY-011 (`seedArchetype()` pattern)
2. Seed realistic localStorage with `MayLearnerState.recordAttempt()`
3. Not modify any pack, case, or content file
4. Be deterministic (seeded RNG or fixed outcomes)

---

*Generated: 2026-07-30 — MAY-012 Coverage Planner*
