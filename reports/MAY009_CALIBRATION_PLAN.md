# MAY-009 — Calibration & Decision Coverage Expansion Plan

**Session:** MAY-009
**Governance Lane:** Light (scripts + reports only)
**Created:** 2026-07-30
**Predecessor:** MAY-008 (Conditional Pass — 19/24 checks)

---

## 1. Objective

Improve coaching quality by expanding decision-path coverage and calibrating recommendation behavior using synthetic learner populations.

The goal is **not new infrastructure**. The goal is to answer:

> Does May make the right coaching decision across a wide variety of student profiles?

---

## 2. Target Coverage

### 2.1 Decision Path Coverage (D1–D10)

| Decision | MAY-008 Coverage | MAY-009 Target | How to Trigger |
|----------|-----------------|----------------|----------------|
| **D1** | S1 (Struggling) | ≥3 scenarios | Readiness score < 50 or band = "Recovery needed" |
| **D2** | S1, S5 | ≥4 scenarios | Tier 1 intervention (accuracy < 50% AND attempts ≥ 5) |
| **D3** | S5 | ≥3 scenarios | Weak topic + stability < 50 + declining + attempts ≥ 5 |
| **D4** | S4 (ExamCram) | ≥3 scenarios | Exam ≤ 30 days + Developing/Recovery band |
| **D5** | S2 (Average) | ≥4 scenarios | Declining topics in profile |
| **D6** | S2 | ≥3 scenarios | Tier 2 intervention (accuracy 50-60% AND attempts ≥ 5) |
| **D7** | S2 | ≥3 scenarios | Tier 3 intervention (accuracy 60-75% AND stability < 50) |
| **D8** | **UNTESTED** | ≥3 scenarios | < 4 sections with data |
| **D9** | S3 (HighPerformer) | ≥4 scenarios | Accuracy ≥ 85%, attempts ≥ 6, not declining |
| **D10** | **UNTESTED** | ≥2 scenarios | No other rule matches (fallback) |

**Target:** All 10 decision IDs exercised by ≥2 distinct learner profiles.

### 2.2 Coaching Mode Coverage

| Mode | MAY-008 Coverage | MAY-009 Target | Triggered By |
|------|-----------------|----------------|-------------|
| **QUIZ** | S1, S2, S4, S5 | ≥5 scenarios | D1, D2, D5, D6, D9 |
| **SOCRATIC** | S5 | ≥3 scenarios | D3 |
| **STUDY_PLAN** | S4 | ≥3 scenarios | D4 |
| **EXPLAIN** | S2 | ≥4 scenarios | D7, D8, D10 |
| **MOTIVATE** | **UNTESTED** | ≥1 scenarios | Indirect (context-driven) |
| **EXAM_REVIEW** | **UNTESTED** | ≥1 scenarios | Post-session context |

**Target:** All 6 coaching modes exercised.

### 2.3 Intervention Class Coverage

| Tier | Label | MAY-008 Coverage | MAY-009 Target |
|------|-------|-----------------|----------------|
| 1 | Critical Weakness | S1, S5 | ≥4 scenarios |
| 2 | Emerging Weakness | S2, S4 | ≥4 scenarios |
| 3 | Fragile Knowledge | S2 | ≥4 scenarios |
| 4 | Mastered Area | S3 | ≥4 scenarios |
| 5 | Exam Risk | **UNITESTED** | ≥2 scenarios |

**Target:** All 5 intervention tiers exercised.

### 2.4 Readiness Band Coverage

| Band | Score | MAY-008 Coverage | MAY-009 Target |
|------|-------|-----------------|----------------|
| Not enough data | 0 | **UNTESTED** | ≥2 scenarios |
| Recovery needed | 25 | S1 | ≥4 scenarios |
| Developing | 55 | S2, S4 | ≥5 scenarios |
| Approaching review-ready | 75 | S5 | ≥4 scenarios |
| Ready for focused review | 95 | S3 | ≥4 scenarios |

**Target:** All 5 readiness bands exercised.

---

## 3. CALIBRATION DIMENSIONS

### 3.1 Readiness Scoring Calibration

| Check | Description |
|-------|-------------|
| **C-R1** | Composite score = weighted average of section band scores |
| **C-R2** | Confidence > data volume monotonicity: more sessions → higher or equal confidence |
| **C-R3** | Band boundaries produce stable readouts (no threshold-chatter between adjacent bands) |
| **C-R4** | Section coverage count is accurate (topicsWithData ≥ 3 attempts) |
| **C-R5** | Risk area severity assignment is consistent with intervention tier |

### 3.2 Recommendation Priority Calibration

| Check | Description |
|-------|-------------|
| **C-P1** | Tier 1 interventions always outrank Tier 2 (priority score descending) |
| **C-P2** | Exam proximity bonus applied correctly (+0.5 × max(0, 30-daysUntil)) |
| **C-P3** | Recency decay correctly penalizes recently-practiced and rewards neglected topics |
| **C-P4** | Recurrence deprioritization applies correctly (-15 score for previously-recommended topics) |
| **C-P5** | Case-level interventions only appear when caseReadiness = "Recovery needed" |

### 3.3 Intervention Sequencing Calibration

| Check | Description |
|-------|-------------|
| **C-S1** | Recovery plan addresses top-readiness weaknesses first |
| **C-S2** | Challenge content only recommended when ≥1 mastered area exists |
| **C-S3** | Topic-specific interventions match the topic in the decline/weakness list |
| **C-S4** | No contradictory recommendations (same topic recommended for both recovery AND challenge) |
| **C-S5** | Recommendation count scales reasonably with data volume |

---

## 4. Success Criteria

| # | Criterion | Threshold |
|---|-----------|-----------|
| S1 | D1–D10 decision coverage | All 10 exercised ≥ 2 times |
| S2 | Coaching mode coverage | All 6 modes exercised |
| S3 | Intervention tier coverage | All 5 tiers exercised |
| S4 | Readiness band coverage | All 5 bands exercised |
| S5 | Decision determinism | Same profile → same decision (5/5 deterministic) |
| S6 | No contradictory guidance | Zero same-topic recovery+challenge pairs |
| S7 | Governance clean | 0 pack/case/content/registry/baseline changes |
| S8 | Performance | All pipelines < 100ms |
| S9 | Distinct archetype outputs | ≥ 25 of 30 scenarios produce unique decision+mode+band triples |
| S10 | Edge-case handling | D10 fallback + "Not enough data" band both exercised |

---

## 5. Execution Order

1. **Planner** → This document + Scenario Matrix (`MAY009_SCENARIO_MATRIX.md`)
2. **Auditor** → Coverage Audit + Calibration Audit
3. **Implementer** → Expanded calibration runner script + analytics generation
4. **Verifier** → Coverage verification + calibration verification + governance verification

---

## 6. Governance

- **Lane:** Governance Light
- **Pack files:** 0 modifications
- **Case files:** 0 modifications
- **Answer keys:** 0 modifications
- **Registry:** 0 modifications
- **Baselines:** 0 modifications
- **LLM gates:** All flags remain `false`
