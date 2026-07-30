# MAY-008 — Success Criteria & Evaluation Framework

**Session:** MAY-008  
**Governance Lane:** Light  
**Date:** 2026-07-30  

---

## Purpose

Define measurable, verifiable success criteria for every MAY-008 deliverable. Each criterion must be independently evaluable from raw output data — not from self-reported claims.

---

## Criterion 1: Pipeline Completeness

### C1.1 — Orchestrator Returns Complete Package

**Check:** `MayCoachingOrchestrator.orchestrate()` returns non-null object with all required fields.

**Required fields:**
- `profile` — LearnerProfile object
- `readiness` — ReadinessSnapshot object
- `recommendations` — Action[] (max 5)
- `recoveryPlan` — PlanEntry[] (max 3)
- `interventions` — PriorityQueue
- `explanations` — Explanation[]
- `decision` — Decision object
- `nextAction` — { coachingMode, topic, action, priority, rationale, evidence }
- `_meta` — { orchestratorVersion, computedAt, flagsActive, degradedComponents }

**Pass:** All 9 fields present and non-null for all 5 archetypes.  
**Fail:** Any field missing or null when the pipeline should have produced it.

### C1.2 — Zero Degraded Components

**Check:** `_meta.degradedComponents` is `[]` (empty array).

**Pass:** Zero degraded components for all 5 archetypes.  
**Fail:** Any degraded component reported (module not loaded, flag off when expected, exception caught).

### C1.3 — Profile Completeness

**Check:** `profile` contains all required sub-objects.

**Required:** `learnerId`, `displayName`, `studyStreak`, `totalSessions`, `totalAttempts`, `masteryLevels`, `strengths`, `weaknesses`, `readinessScore`, `behavior`, `recentTopics`, `_meta`.

**Pass:** All sub-objects present and non-null for all 5 archetypes.  
**Weight:** Blocking — pipeline cannot produce useful output without complete profile.

---

## Criterion 2: Recommendation Quality

### C2.1 — Recommendation Relevance

**Check:** Each archetype receives recommendations that match their profile characteristics.

| Archetype | Expected Recommendation Types | Expected Priority |
|-----------|------------------------------|-------------------|
| Struggling (S1) | remediation, review | high |
| Average (S2) | remediation, reinforcement, challenge | high, medium |
| High Performer (S3) | challenge | medium, low |
| Exam-Cram (S4) | review | high |
| Topic-Specific (S5) | remediation (Cost Variances) | high, critical |

**Pass:** At least one recommendation matches the expected type and priority for each archetype.  
**Fail:** Recommendation type/priority mismatch for 3+ archetypes.

### C2.2 — Recommendation Determinism

**Check:** Running the same profile through `MayAdaptiveRecommender.generate()` twice produces identical output.

**Pass:** 100% identical output (same type, topic, priority, rationale) on consecutive runs for all 5 archetypes.  
**Fail:** Any difference between runs for the same profile.

### C2.3 — Recommendation Explainability

**Check:** Each recommendation includes a non-empty `rationale` field and an `evidence` object.

**Pass:** 100% of recommendations have `rationale.length > 30` and non-empty `evidence` object.  
**Fail:** Any recommendation with missing or placeholder rationale.

---

## Criterion 3: Readiness Consistency

### C3.1 — Readiness Score Bounded

**Check:** `readiness.readinessScore` is between 0 and 100 (inclusive).

**Pass:** 0 <= score <= 100 for all 5 archetypes.  
**Fail:** Score outside bounds.

### C3.2 — Band Reflects Profile

**Check:** Readiness band is consistent with the archetype's profile data.

| Archetype | Expected Band |
|-----------|--------------|
| Struggling (S1) | Recovery needed |
| Average (S2) | Developing |
| High Performer (S3) | Ready for focused review or Approaching review-ready |
| Exam-Cram (S4) | Developing or Recovery needed |
| Topic-Specific (S5) | Approaching review-ready |

**Pass:** At least 4 of 5 archetypes match expected band.  
**Allowance:** Gray-area boundaries between Developing/Approaching are acceptable if within 5 points.

### C3.3 — Confidence Appropriately Scaled

**Check:** `readiness.confidence` is reported and reflects data sufficiency.

| Archetype | Expected Confidence |
|-----------|-------------------|
| Struggling (S1) | moderate (8 sessions, 240 attempts) |
| High Performer (S3) | high (25 sessions, 750 attempts) |
| Exam-Cram (S4) | low or moderate (6 sessions, 180 attempts) |

**Pass:** Confidence aligns with session count and data volume.  
**Fail:** High confidence on insufficient data (< 3 sessions) OR low confidence on abundant data (> 15 sessions).

---

## Criterion 4: Decision Engine Appropriateness

### C4.1 — Decision Differentiation

**Check:** At least 4 different `decisionId` values across the 5 archetypes.

**Pass:** 4+ distinct decision IDs.  
**Fail:** 2 or fewer distinct decision IDs (insufficient differentiation).

### C4.2 — Decision Priority Hierarchy

**Check:** The decision engine evaluates rules in D1→D10 priority order and selects the highest-priority applicable rule.

| Archetype | Expected Decision | Top-2 Candidates |
|-----------|-------------------|------------------|
| Struggling (S1) | D1 | D1, D2 |
| Average (S2) | D5 or D6 | D5, D6, D7 |
| High Performer (S3) | D9 | D9, D10 |
| Exam-Cram (S4) | D4 | D4, D5 |
| Topic-Specific (S5) | D2 or D3 | D2, D3, D5 |

**Pass:** Actual decision matches expected or top-2 candidate for each archetype.  
**Fail:** Decision that is obviously wrong (e.g., D10 for High Performer, D9 for Struggling Student).

### C4.3 — Decision Evidence Completeness

**Check:** Every decision includes `rationale` and `evidence` with at least the `triggeringRule` field.

**Pass:** 100% of decisions have complete rationale + evidence.  
**Fail:** Any decision with missing rationale or evidence.

---

## Criterion 5: Intervention Quality

### C5.1 — Intervention Tier Correctness

**Check:** `MayInterventionPrioritizer.rank()` assigns appropriate tiers.

| Archetype | Expected Tiers Present |
|-----------|----------------------|
| Struggling (S1) | Tier 1 (Critical Weakness) — multiple topics |
| Average (S2) | Tier 2 (Emerging Weakness), Tier 3 (Fragile Knowledge) |
| High Performer (S3) | Tier 4 (Mastered Area) — at least one |
| Exam-Cram (S4) | Tier 1 or Tier 2 |
| Topic-Specific (S5) | Tier 1 (Cost Variances) |

**Pass:** Expected tiers present in queue.  
**Fail:** No Tier 1 when accuracy < 50% OR Tier 1 when all accuracy > 85%.

### C5.2 — Intervention Priority Ordering

**Check:** `queue` is sorted by `priorityScore` descending.

**Pass:** priorityScore monotonically non-increasing through the queue.  
**Fail:** Any score that is higher than the preceding entry.

### C5.3 — Top Action Validity

**Check:** `topAction` is the highest-scoring entry in `queue[0]`.

**Pass:** `topAction.topic === queue[0].topic && topAction.tierLabel === queue[0].tierLabel`.  
**Fail:** topAction inconsistent with queue head.

---

## Criterion 6: Explanation Quality

### C6.1 — Explanation Non-Empty

**Check:** All `MayRecommendationExplainer.explain()` calls return non-empty text.

**Pass:** All explanations have `length > 20`.  
**Fail:** Any explanation that is empty or placeholder text.

### C6.2 — Explanation Specificity

**Check:** Explanations reference the specific topic or intervention tier, not generic text.

**Pass:** Explanations contain the topic name or tier label from the intervention.  
**Fail:** Generic text with no topic/tier reference.

---

## Criterion 7: Safety Verification

### C7.1 — No Network Calls

**Check:** `fetch`, `XMLHttpRequest`, `WebSocket` are never called during pipeline execution.

**Pass:** Zero network activity detected.  
**Fail:** Any network call (blocking).

### C7.2 — No LLM Usage

**Check:** `ENABLE_LLM` flag remains `false`. No LLM provider method is invoked.

**Pass:** `MayFeatureFlags.isEnabled('ENABLE_LLM')` returns `false` at all times.  
**Fail:** LLM flag enabled or LLM method called.

### C7.3 — No Pack/Case/Content Modifications

**Check:** Pack files, case files, answer keys, question_state, registries, and baselines are unchanged.

**Pass:** Zero modifications to governance-critical files.  
**Fail:** Any modification (blocking).

### C7.4 — Deterministic Output

**Check:** Running the full pipeline on the same profile twice produces identical `CoachingPackage` (ignoring timestamp fields).

**Pass:** All non-timestamp fields are identical across consecutive runs.  
**Fail:** Any non-timestamp field differs between runs.

---

## Criterion 8: Performance

### C8.1 — Pipeline Execution Time

**Check:** `orchestrate()` completes within 100ms per invocation.

**Pass:** All 5 invocations complete in < 100ms each.  
**Fail:** Any execution > 500ms (flagging performance regression).

---

## Criterion 9: Governance Compliance

### C9.1 — Zero Governance Violations

**Check:** Run `node scripts/test_governance_guard.js`.

**Pass:** 54/54 PASS (or current baseline), 0 FAIL.  
**Fail:** Any FAIL result.

### C9.2 — Zero New Divergences

**Check:** Run `npm run preflight`.

**Pass:** 0 new divergences vs. `CURRENT_BASELINES.md`.  
**Fail:** Any new divergence (noting that MAY-008 is Light Lane — preflight is recommended, not mandatory).

---

## Scoring Summary

| Criterion | Weight | Check Count |
|-----------|--------|-------------|
| C1: Pipeline Completeness | 25% | 3 checks |
| C2: Recommendation Quality | 15% | 3 checks |
| C3: Readiness Consistency | 15% | 3 checks |
| C4: Decision Appropriateness | 20% | 3 checks |
| C5: Intervention Quality | 10% | 3 checks |
| C6: Explanation Quality | 5% | 2 checks |
| C7: Safety Verification | 10% | 4 checks |
| C8: Performance | 0% (advisory) | 1 check |
| C9: Governance Compliance | mandatory | 2 checks |
| **Total** | **100%** | **24 checks** |

## Pass Threshold

- **MAY-008 PASS:** 22/24 checks pass AND all C7 safety checks pass AND C9 governance checks pass.
- **MAY-008 CONDITIONAL PASS:** 20-21/24 checks pass, all C7 pass, all C9 pass. Requires documented remediation plan.
- **MAY-008 FAIL:** < 20 checks pass OR any C7 safety check fails OR any C9 check fails.
