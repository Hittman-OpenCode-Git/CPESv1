# MAY-006 — Orchestration Plan

**Session:** MAY-006 — Adaptive Coaching Orchestrator
**Governance:** Light Lane (coaching layer — no pack/case/content impact)
**Status:** Active
**Date:** 2026-07-30

---

## 1. Purpose

Define the end-to-end adaptive coaching orchestration flow that coordinates the completed MAY-001 through MAY-005 systems. This plan maps the complete data flow from context capture through coaching action delivery, identifying every integration point between existing modules.

---

## 2. Architecture — Downstream Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   MAY-006 ORCHESTRATION PIPELINE                  │
│                                                                   │
│  ┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐ │
│  │ Context       │    │ Learner Profile │    │ Adaptive         │ │
│  │ Builder       │───→│ (MAY-004)        │───→│ Recommender      │ │
│  │ (MAY-001)     │    │                  │    │ (MAY-004)        │ │
│  └──────────────┘    └─────────────────┘    └────────┬─────────┘ │
│                                                      │           │
│                                                      ▼           │
│  ┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐ │
│  │ Recommender  │◄───│ Readiness       │◄───│ Remediation      │ │
│  │ Explainer    │    │ Engine          │    │ Engine           │ │
│  │ (MAY-005)    │    │ (MAY-005)       │    │ (MAY-004)        │ │
│  └──────┬───────┘    └────────┬────────┘    └──────────────────┘ │
│         │                     │                                    │
│         ▼                     ▼                                    │
│  ┌──────────────┐    ┌─────────────────┐                          │
│  │ Intervention │    │ Decision        │                          │
│  │ Prioritizer  │───→│ Engine          │                          │
│  │ (MAY-005)    │    │ (MAY-006)       │                          │
│  └──────────────┘    └────────┬────────┘                          │
│                               │                                    │
│                               ▼                                    │
│  ┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐ │
│  │ LLM Adapter  │◄───│ Coaching         │◄───│ Recommendation   │ │
│  │ (MAY-003)    │    │ Router           │    │ Pipeline         │ │
│  │              │    │ (MAY-002)        │    │ (MAY-006)        │ │
│  └──────────────┘    └────────┬────────┘    └──────────────────┘ │
│                               │                                    │
│                               ▼                                    │
│                    ┌───────────────────┐                           │
│                    │ Coaching Mode     │                           │
│                    │ Handlers          │                           │
│                    │ (MAY-002)         │                           │
│                    └───────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Responsibilities

### 3.1 Coaching Orchestrator (`may-coaching-orchestrator.js`)

**Role:** Top-level pipeline coordinator. The single entry point that chains all subsystems.

**Inputs:** None (reads from MayLearnerState)
**Outputs:** Complete coaching package with profile, readiness, recommendations, interventions, explanations, and next action.

**Pipeline stages:**
1. Load learner profile from MayLearnerProfile
2. Run readiness assessment from MayReadinessEngine
3. Generate recommendations from MayAdaptiveRecommender
4. Run intervention prioritization from MayInterventionPrioritizer
5. Generate explanations from MayRecommendationExplainer
6. Build final coaching package

### 3.2 Decision Engine (`may-decision-engine.js`)

**Role:** Deterministic decision hierarchy. Evaluates learner state against adaptation rules and selects the single best coaching action.

**Inputs:** Coaching package from Orchestrator
**Outputs:** Coaching decision with mode, action, priority, and rationale.

**Decision hierarchy (ordered by priority):**
1. Readiness < 50 → Remediation
2. High-priority weakness → Targeted Quiz
3. Repeated weakness with low stability → Socratic coaching
4. Exam approaching + gaps → Study Plan
5. Declining topic trends → Recovery set
6. High mastery → Challenge recommendation
7. Insufficient data → Exploratory coaching

### 3.3 Intervention Coordinator (`may-intervention-coordinator.js`)

**Role:** Schedules and sequences coaching interventions over time. Prevents recommendation fatigue and ensures balanced coverage.

**Inputs:** Coaching package + recurrence data
**Outputs:** Sequenced intervention schedule with review cadence and topic rotation.

### 3.4 Recommendation Pipeline (`may-recommendation-pipeline.js`)

**Role:** Normalizes outputs from all subsystems into a single router-ready payload.

**Inputs:** Profile, readiness, recommendations, interventions, explanations
**Outputs:** Unified recommendation package consumable by the Coaching Router.

---

## 4. Integration Points

### 4.1 Module Contracts (Read-Only — No Changes Permitted)

| Module | Method | Input Type | Output Type | Gated By |
|--------|--------|-----------|-------------|----------|
| MayLearnerProfile | `build()` | None | `LearnerProfile \| null` | `ENABLE_ADAPTIVE_COACHING` |
| MayAdaptiveRecommender | `generate(profile)` | `LearnerProfile` | `Action[]` | `ENABLE_ADAPTIVE_COACHING` |
| MayRemediationEngine | `buildRecoveryPlan(profile)` | `LearnerProfile` | `PlanEntry[]` | `ENABLE_ADAPTIVE_COACHING` |
| MayRemediationEngine | `getTargetedTopics(profile)` | `LearnerProfile` | `string[]` | `ENABLE_ADAPTIVE_COACHING` |
| MayReadinessEngine | `assess()` | None | `ReadinessSnapshot \| null` | `ENABLE_READINESS_SCORING` |
| MayInterventionPrioritizer | `rank()` | None | `PriorityQueue \| null` | `ENABLE_READINESS_SCORING` |
| MayInterventionPrioritizer | `getHighestValueAction()` | None | `Action \| null` | `ENABLE_READINESS_SCORING` |
| MayRecommendationExplainer | `explain(intervention)` | `Intervention` | `Explanation \| null` | `ENABLE_READINESS_SCORING` |
| MayCoachingRouter | `route(ctx, action)` | `MayContext, string` | `RoutingResult` | `ENABLE_COACHING_ROUTER` |
| MayCoachingRouter | `dispatchToHandler(ctx, routing)` | `MayContext, Routing` | `CoachingResponse \| null` | Per-mode flags |

### 4.2 Feature Flag Hierarchy

```
ENABLE_ADAPTIVE_ORCHESTRATION (MAY-006 — new)
  ├── Requires: ENABLE_ADAPTIVE_COACHING (MAY-004)
  │     ├── MayLearnerProfile.build()
  │     ├── MayAdaptiveRecommender.generate()
  │     └── MayRemediationEngine.*
  ├── Requires: ENABLE_READINESS_SCORING (MAY-005)
  │     ├── MayReadinessEngine.assess()
  │     ├── MayInterventionPrioritizer.rank()
  │     └── MayRecommendationExplainer.explain()
  └── Feeds into: MayCoachingRouter (MAY-002)
        └── Requires: ENABLE_COACHING_ROUTER
```

The orchestrator respects existing flags. If a required flag is off, that subsystem returns null and the orchestrator degrades gracefully.

---

## 5. Coaching Package Schema

```json
{
  "profile": { "...LearnerProfile..." },
  "readiness": { "...ReadinessSnapshot..." },
  "recommendations": [ "...Action[]..." ],
  "recoveryPlan": [ "...PlanEntry[]..." ],
  "interventions": { "...PriorityQueue..." },
  "explanations": [ "...Explanation[]..." ],
  "decision": {
    "action": "remediation | quiz | socratic | study_plan | challenge | exploratory",
    "mode": "EXPLAIN | QUIZ | SOCRATIC | STUDY_PLAN",
    "priority": "high | medium | low",
    "rationale": "..."
  },
  "nextAction": {
    "coachingMode": "...",
    "topic": "...",
    "action": "...",
    "evidence": {}
  },
  "_meta": {
    "orchestratorVersion": "MAY006-1.0",
    "computedAt": "ISO8601",
    "flagsActive": ["ENABLE_ADAPTIVE_ORCHESTRATION", ...],
    "degradedComponents": []
  }
}
```

---

## 6. Graceful Degradation

| Missing/Disabled | Orchestrator Behavior |
|------------------|----------------------|
| MayLearnerState unavailable | Return null |
| ENABLE_ADAPTIVE_COACHING off | Return null |
| READINESS_SCORING off | Skip readiness + intervention + explainer stages; proceed with profile + recommendations only |
| Profile build returns null | Return null |
| Recommender returns empty | Continue without recommendations; decision engine uses defaults |
| Prioritizer returns null | Skip intervention stage; decision engine uses profile weaknesses directly |
| Readiness assess returns null | Skip readiness stage; decision engine uses profile readinessScore |

---

## 7. State Guarantees

- **Stateless:** The orchestrator holds no internal state between calls. Every `orchestrate()` call is a fresh pipeline execution.
- **Idempotent:** Multiple calls with the same learner state produce the same coaching package.
- **Read-only:** No pack files, case files, question_state, or answer keys are modified.
- **Feature-flagged:** All new behavior is behind `ENABLE_ADAPTIVE_ORCHESTRATION=false` by default.
- **No network:** All computation is local and deterministic.
- **No autonomous actions:** The orchestrator produces recommendations, not automated learner interventions.

---

## 8. File Manifest (MAY-006 Deliverables)

| File | Type | Purpose |
|------|------|---------|
| `may-coaching-orchestrator.js` | JS module | Pipeline coordinator |
| `may-decision-engine.js` | JS module | Action selection engine |
| `may-intervention-coordinator.js` | JS module | Schedule and sequence interventions |
| `may-recommendation-pipeline.js` | JS module | Normalize outputs for router |
| `may-coaching-memory.js` | JS module (stretch) | Session-scoped coaching state |
| `may-feature-flags.js` | Update | Add `ENABLE_ADAPTIVE_ORCHESTRATION` + `ENABLE_COACHING_MEMORY` |
| `reports/MAY006_ORCHESTRATION_PLAN.md` | Documentation | This document |
| `reports/MAY006_DECISION_PLAN.md` | Documentation | Decision hierarchy |
| `reports/MAY006_ACTIVATION_PLAN.md` | Documentation | Rollout strategy |

---

## 9. Success Criteria

1. All MAY-001 through MAY-005 modules are coordinated through a single `orchestrate()` call.
2. The orchestrator produces a complete coaching package with profile, readiness, recommendations, interventions, explanations, and decision.
3. The decision engine selects a single coaching action with mode, priority, and rationale.
4. Zero modifications to any existing module contract.
5. All functionality behind `ENABLE_ADAPTIVE_ORCHESTRATION=false`.
6. No production behavior change when flags are off.
