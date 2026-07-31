# MAY-009 — Calibration Auditor Report

**Session:** MAY-009
**Auditor Phase**
**Governance Lane:** Light
**Date:** 2026-07-30

---

## 1. Executive Summary

Pre-implementation calibration audit of the May pipeline. Identified 3 calibration risks, 1 edge-case class, and 1 determinism concern. All risks are design-level (affect recommendation quality, not correctness). No content, pack, or case files modified.

---

## 2. Readiness Scoring Calibration

### 2.1 Composite Score Sensitivity

The composite score uses `BAND_SCORES` (0, 25, 55, 75, 95) weighted by topic count per section. This produces coarse granularity:

- 5 topics in "Developing" (55) → composite = 55
- 5 topics in "Approaching review-ready" (75) → composite = 75
- Mixed: 3 Recovery (25) + 7 Developing (55) → composite ≈ 46

**Finding:** The jump between bands is 20-30 points. Learners hovering near a band boundary (e.g., one topic pulling a section from Developing to Recovery) can experience a 20+ point composite swing. This creates threshold sensitivity — small changes in one topic's band can produce large composite changes.

**Risk Level:** MEDIUM. Affects D1 triggering (readiness < 50). Learners whose composite score straddles 49-51 may oscillate between D1 (critical remediation) and whatever fires next.

**Recommendation:** After scenario execution, audit all learners with composite scores in [45, 55] for decision stability (run 3× on same profile, verify same decision).

### 2.2 Section Band Assignment

Section band is determined by `MayLearnerState.getSectionReadinessSummary()`. The aggregation logic (topic-level bands → section-level band) is not directly configurable from the scenario runner — it depends on the internal `getReadinessSummary()` implementation in `may-learner-state.js`.

**Finding:** The scenario runner controls per-topic accuracy, trend, stability, and attempts. The section band emerges from these inputs through a chain: topic data → topic summary → section summary → section band → composite score. This chain has multiple aggregation points where small input changes can shift outputs.

**Risk Level:** LOW. The chain is deterministic. The risk is in calibration precision — scenario authors must tune topic parameters to hit specific readiness bands.

### 2.3 Confidence Scoring

Confidence decreases with: < 2 sessions (-20), > 2 sections with insufficient data (-10), > 1 unstable topic (-15). Increases with: recent 7-day activity (+10).

**Finding:** Confidence floor is 10 (line 195: `Math.max(10, Math.min(100, conf))`). Ceiling is 100. The penalties are coarse-grained (-20, -10, -15) with one bonus (+10). This may produce only 4-5 distinct confidence levels.

**Risk Level:** LOW. Confidence is advisory only. Coarse granularity is acceptable for this metric.

---

## 3. Recommendation Priority Calibration

### 3.1 Priority Score Formula

```
priorityScore = tier.urgency + accuracyGap + instabilityPenalty + examProximityBonus + recencyAdjustment
```

- `tier.urgency`: Tier 1=50, Tier 2=40, Tier 3=30, Tier 4=20
- `accuracyGap`: max(0, 85 - accuracy)
- `instabilityPenalty`: max(0, 60 - stability)
- `examProximityBonus`: round(max(0, 30 - daysUntil) / 2)
- `recencyAdjustment`: +min(10, daysSince) if daysSince > 3; -5 if daysSince < 1

**Finding:** The formula produces a wide range (0-120+). A Tier 1 topic with 25% accuracy, stability 0, and 0 days until exam gets: 50 + 60 + 60 + 15 = 185. A Tier 3 topic with 70% accuracy, stability 60, and 90 days until exam gets: 30 + 15 + 0 + 0 = 45.

**Risk Level:** LOW. Range is appropriate. No identified cases where a lower-tier topic outranks a higher-tier one.

### 3.2 Recurrence Deprioritization

After sorting, recurrence penalty subtracts 15 from previously-recommended topics and re-sorts.

**Finding:** The -15 penalty is a fixed value. A Tier 1 topic (urgency 50) with a -15 penalty still outranks a fresh Tier 2 topic (urgency 40). This is correct — deprioritization should not override tier classification.

**Risk Level:** LOW. Design is intentional and correct.

### 3.3 Exam Proximity Bonus

The bonus applies for daysUntil < 90: `round(max(0, 30 - daysUntil) / 2)`.

| Days Until Exam | Bonus |
|----------------|-------|
| 0 | 15 |
| 10 | 10 |
| 20 | 5 |
| 30 | 0 |
| 60 | 0 |
| 90+ | 0 |

**Finding:** The bonus is small relative to tier.urgency values. It meaningfully affects ranking only when two interventions have similar scores. This is appropriate — it nudges, not reshuffles.

**Risk Level:** LOW.

---

## 4. Intervention Sequencing Calibration

### 4.1 Recovery Plan Construction

`MayRemediationEngine.buildRecoveryPlan(profile)` generates a sequenced recovery plan from learner profile data. The scenario runner calls this in Stage 1 (ADAPTIVE_COACHING only) but does not deeply inspect its contents in the evaluation.

**Finding:** Recovery plan quality is not evaluated. The MAY-008 evaluation checks planCount (length) but not plan-content quality (are the weakest topics addressed first?).

**Risk Level:** MEDIUM. Plan sequencing matters for learner experience. Weakest topics should appear first.

**Recommendation:** Add calibration check: verify that recovery plan topics are ordered by ascending accuracy (weakest first).

### 4.2 Recommendation-Intervention Alignment

In the full orchestrator pipeline (Stage 3), recommendations, interventions, and the decision are built from the same profile. The decision selects one action; recommendations provide a ranked list; interventions provide tiered priorities.

**Finding:** There is no cross-check that the decision's topic (if topic-specific) appears in the top-3 recommendations or interventions. A decision to remediate "Revenue Recognition" should be backed by that topic appearing high in the intervention queue.

**Risk Level:** MEDIUM. Inconsistent topic targeting could show a decision about one topic while recommendations focus on another.

**Recommendation:** Add calibration check: for topic-specific decisions (D2, D3, D5, D6, D7, D9), verify the decision topic appears in the top-3 recommendations or interventions.

### 4.3 Contradictory Guidance Detection

A topic cannot simultaneously be recommended for recovery (weakened) AND challenge (mastered).

**Finding:** The Tier 4 classification (Mastered Area) requires accuracy ≥ 85%, attempts ≥ 6, not declining, stability ≥ 75. Tier 1 (Critical Weakness) requires accuracy < 50%. These conditions are mutually exclusive — a topic cannot be classified as both. The classification logic prevents contradictory guidance at the intervention level.

**Risk Level:** LOW. Structural protection exists.

---

## 5. Decision Engine Calibration

### 5.1 Priority Chain Integrity

The `decide()` function evaluates D1→D2→D3→D4→D5→D6→D7→D8→D9→D10 in strict order with first-match-wins.

**Finding:** Priority order reflects clinical severity: readiness-crisis > specific-weakness > instability > exam-pressure > decline > emerging > fragile > sparse-data > mastery > fallback. This is a defensible clinical triage order.

**Risk Level:** LOW. Order is clinically appropriate.

### 5.2 D3 Trigger Precision

D3 requires ALL of: topic in weaknesses list, masteryLevels[topic].stability < 50, attempts ≥ 5, direction === 'declining'. It also requires D1 and D2 to fail first.

**Finding:** D3 is a narrow gate. In MAY-008, only S5 (Casey, with Cost Variance at 35% accuracy) triggered it. Most learners with declining+unstable topics also have readiness < 50 (triggering D1 first) or Tier 1 interventions (triggering D2 first).

**Risk Level:** MEDIUM. D3 may be rarely exercised in practice because D1 or D2 fire first for most declining, unstable learners. The 2 dedicated MAY-009 scenarios (L06, L28) may not actually trigger D3 if other rules fire first.

**Recommendation:** Post-execution verification: confirm L06 and L28 actually produce D3. If they produce D1/D2 instead, adjust scenario parameters (raise overall accuracy to push readiness ≥ 50, ensure no Tier 1 topic).

### 5.3 D9 Trigger Precision

D9 requires: topic in strengths list, accuracy ≥ 85%, attempts ≥ 6, direction !== 'declining' AND !== 'slightly_declining'. It also requires D1-D8 to fail first.

**Finding:** D9 is also narrow. Strong learners with any declining topic hit D5 first. Strong learners with any Tier 1/2/3 topic hit D2/D6/D7 first.

**Risk Level:** MEDIUM. D9 requires a "clean" strong profile with zero declines and zero weaknesses. The 5 dedicated scenarios (L16, L17, L19, L25, L26) are designed with this in mind.

---

## 6. Edge Case Audit

### 6.1 Readiness Score Boundary Tests

| Learner | Expected Composite | Band Boundary |
|---------|-------------------|---------------|
| L27 (Remy) | ~48-52 (near D1 threshold of 50) | Band boundary: Recovery (25) / Developing (55) |
| L28 (Wren) | ~55-60 (just above D1) | Stable — Developing |
| L29 (Halston) | ~55-60 | Exam boundary: 32 > 30 days |

**Risk Level:** MEDIUM. L27 is specifically designed to probe the D1 threshold. If composite = 50 exactly, D1 fires (`score < 50` — not `<= 50`). If composite > 50, D1 fails and we get a different decision path.

### 6.2 Empty/Missing Field Handling

All `_rule*` functions check for null/undefined before accessing nested properties. The scenario runner always provides complete topic data. No null-pointer risk.

**Risk Level:** LOW. Guards are present.

---

## 7. Determism Concern

### 7.1 Math.random in seedLearnerProfile

The `seedLearnerProfile()` function uses `Math.random()` to distribute correct/incorrect outcomes across attempts (lines 168-181 of the MAY-008 runner). This means re-seeding the same learner produces slightly different outcome distributions each time — which can produce different readiness scores and different decisions.

**Finding:** The MAY-008 evaluation (C2.2, C7.4) checked determinism by running `MayAdaptiveRecommender.generate()` twice on the same seeded profile and comparing — this passed. However, C7.4 ran `MayCoachingOrchestrator.orchestrate()` twice in succession without re-seeding, which also passed. But if re-seeding is called between runs, the random outcome generation could produce different profiles.

**Risk Level:** LOW for same-seed determinism. The profile is deterministic once seeded. Re-seeding the same archetype produces a fresh (slightly different) profile — this is expected behavior, not a determinism bug.

**Recommendation:** The evaluation should confirm determinism by: seed once → run pipeline → store result → restart and seed again with same params → run pipeline → compare. The random outcome distribution makes exact replication impossible across re-seeds, but the decision ID should be stable for well-calibrated profiles.

---

## 8. Summary of Findings

| # | Finding | Severity | Recommendation |
|---|---------|----------|----------------|
| F1 | D3 may be preempted by D1/D2 in practice | MEDIUM | Post-execution verify L06/L28 produce D3 |
| F2 | D9 requires "clean" profile (no declines) | MEDIUM | Post-execution verify D9 scenarios |
| F3 | D1 threshold boundary (score < 50) is sharp | MEDIUM | Accept — confirmed L27 probes this boundary |
| F4 | Recovery plan sequencing not verified | MEDIUM | Add calibration check for weakest-first ordering |
| F5 | Decision-recommendation topic alignment not verified | MEDIUM | Add cross-check for D2/D3/D5/D6/D7/D9 topics |
| F6 | Band boundary sensitivity (~20pt jumps) | MEDIUM | Audit composite scores in [45,55] range |
| F7 | MOTIVATE/EXAM_REVIEW untestable via scenarios | LOW | Documented gap — deferred |
| F8 | Tier 5 not a standalone tier | INFORMATIONAL | Documented — architectural |

---

## 9. Verdict

The May pipeline is structurally sound with appropriate priority ordering and mutually exclusive classification gates. Four calibration risks warrant post-execution verification. No blocking defects identified.
