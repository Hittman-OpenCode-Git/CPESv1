# MAY-011 — Adaptive Coaching Pilot Activation Plan

**Session:** MAY-011
**Governance Lane:** Light
**Date:** 2026-07-30
**Status:** Active
**Preflight:** 0 divergences, 2451 certified, 54/54 governance guard

---

## 1. Student Archetypes

Five archetypes defined to exercise the full adaptive coaching decision surface:

| # | Archetype | Characteristic | Coaching Expectation |
|---|-----------|---------------|---------------------|
| L1 | Low-Readiness Learner | Weak across all domains, <50% correct | Remediation-first, foundational rebuild, QUIZ mode priority |
| L2 | High-Readiness Learner | Strong across all domains, >80% correct | Maintenance mode, edge-case drilling, EXAM_REVIEW mode |
| L3 | Weak-Topic Learner | One domain weak, others strong | Targeted remediation, EXPLAIN mode, focused topic recovery |
| L4 | Exam-Near Learner | High volume, time-sensitive | Exam-readiness push, STUDY_PLAN mode, gap closure |
| L5 | Mixed-Performance Learner | Scattered strengths/weaknesses | Balanced approach, SOCRATIC mode, pattern diagnosis |

**Archetype fidelity rule:** Each archetype maps to a distinct learner state seeded via `MayLearnerState` with actual session history. No synthetic state that the engine cannot produce organically.

---

## 2. Activation Sequence

Staged enablement following the dependency graph documented in `may-coaching-orchestrator.js`:

```
Stage 1: ENABLE_ADAPTIVE_COACHING
  └─ Enables: MayLearnerProfile, MayAdaptiveRecommender, MayRemediationEngine, MayReadinessScorer
  └─ Requires: MayLearnerState with session history
  └─ Gate: Profile builds without null returns

Stage 2: ENABLE_READINESS_SCORING
  └─ Requires: Stage 1 running
  └─ Enables: MayReadinessEngine, MayInterventionPrioritizer, MayRecommendationExplainer, MayDashboardModel
  └─ Gate: Readiness scores are stable (no NaN, no infinite)

Stage 3: ENABLE_ADAPTIVE_ORCHESTRATION
  └─ Requires: Stage 1 + Stage 2 running
  └─ Enables: MayDecisionEngine, MayInterventionCoordinator, MayRecommendationPipeline
  └─ Gate: Full pipeline produces non-null decisions across all 5 archetypes

Stage 4: ENABLE_COACHING_MEMORY
  └─ Requires: Stage 3 running with >=10 questions seen
  └─ Enables: MayCoachingMemory (intervention deduplication, context persistence)
  └─ Gate: Memory prevents repeated recommendations across orchestrate() calls
```

**Hard constraint:** `ENABLE_LLM` remains `false` at all stages. All coaching behavior must be deterministic and rules-based.

---

## 3. Success Criteria

| # | Criterion | Measurement | Threshold |
|---|-----------|-------------|-----------|
| SC1 | Pipeline completeness | `orchestrate()` returns non-null for all 5 archetypes | 5/5 |
| SC2 | Decision diversity | At least 3 distinct coaching modes selected across 5 archetypes | >= 3 |
| SC3 | Recommendation relevance | Recommendations cite topics present in learner state data | 100% |
| SC4 | Readiness consistency | Same history produces same readiness score (determinism) | 100% match across 3 calls |
| SC5 | Intervention appropriateness | Top intervention tier matches lowest-performing topic | >= 80% |
| SC6 | No degradation | Components report zero degraded in full-orchestration call | degradedComponents: [] |
| SC7 | Memory effectiveness | After 3 orchestrate() calls with memory enabled, duplicate intervention rate < 30% | < 30% |
| SC8 | Production safety | All feature flags default to false, no env var auto-activation outside `CMA_MAY_PILOT` | PASS |
| SC9 | Governance cleanliness | 0 pack/case/answer-key/registry/baseline modifications | 0 changes |
| SC10 | Regression pass | npm run preflight 0 divergences, npm run smoke 17/17 | PASS |

---

## 4. Rollback Criteria

Immediate rollback (stop test, revert flags to false) if any of:

| # | Trigger | Detection |
|---|---------|-----------|
| R1 | Any external network call | fetch/XMLHttpRequest guard trip |
| R2 | Any pack file written or modified | SHA-256 hash drift on pack files |
| R3 | Any localStorage write to non-May keys | localStorage key-prefix audit |
| R4 | Governace guard test failure | preflight governance test != 54 PASS |
| R5 | Non-deterministic pipeline output | Same input yields different output across 2 runs |
| R6 | Pipeline crash (uncaught exception) | Script exit code != 0 |

---

## 5. Test Harness Design

The scenario runner (`scripts/may011_scenario_runner.js`) follows the MAY-008 pattern:

1. Load all May modules via `Function` constructor (Node.js sandbox)
2. Stub browser globals (localStorage, document, window, fetch=reject)
3. Seed 5 archetype learner states via `MayLearnerState`
4. Execute staged activation (Stages 1→4)
5. Collect telemetry at each stage
6. Generate `reports/MAY011_TELEMETRY.json`
7. Run verification assertions against success criteria

**Isolation guarantees:**
- `fetch` stub rejects all calls (no external network)
- No pack files loaded (MCQ banks not needed for pipeline testing)
- localStorage scoped to test session
- `state.session = null` (no active exam session)

---

## 6. Deliverables Checklist

| Deliverable | File | Status |
|-------------|------|--------|
| Pilot Plan | `reports/MAY011_PILOT_PLAN.md` | Created |
| Metrics Plan | `reports/MAY011_METRICS_PLAN.md` | Pending |
| Scenario Runner | `scripts/may011_scenario_runner.js` | Pending |
| Telemetry | `reports/MAY011_TELEMETRY.json` | Pending |
| Recommendation Review | `reports/MAY011_RECOMMENDATION_REVIEW.md` | Pending |
| Activation Readiness | `reports/MAY011_ACTIVATION_READINESS.md` | Pending |

---

*Generated: 2026-07-30 — MAY-011 Pilot Planner*
