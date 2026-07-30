# MAY-008 — Controlled Activation Plan

**Session:** MAY-008  
**Governance Lane:** Light (no pack/case/content modifications)  
**Date:** 2026-07-30  

---

## Purpose

Define a staged, gated activation sequence for May adaptive coaching feature flags in an isolated sandbox with zero production exposure. Each stage activates a layer of the system, runs behavioral validation, and gates advancement on passing all success criteria.

---

## Activation Architecture

### Flag Dependency Chain

```
Stage 1: ENABLE_ADAPTIVE_COACHING       ←─ MAY-004: profile + recommender + remediation
         ├── MayLearnerProfile.build()
         ├── MayAdaptiveRecommender.generate()
         ├── MayRemediationEngine.buildRecoveryPlan()
         └── Verify: profile, recommendations, recovery plan

Stage 2: ENABLE_READINESS_SCORING       ←─ MAY-005: readiness + intervention + explainer
         ├── MayReadinessEngine.assess()
         ├── MayInterventionPrioritizer.rank()
         ├── MayRecommendationExplainer.explain()
         └── Verify: readinessSnapshot, interventionQueue, explanations

Stage 3: ENABLE_ADAPTIVE_ORCHESTRATION  ←─ MAY-006: full pipeline (requires Stage 1 + 2)
         ├── MayCoachingOrchestrator.orchestrate()
         ├── MayDecisionEngine.decide()
         ├── MayInterventionCoordinator.coordinate()
         ├── MayRecommendationPipeline.buildPayload()
         └── Verify: CoachingPackage, Decision, nextAction

Stage 4: ENABLE_COACHING_MEMORY        ←─ MAY-006A: session memory (optional layer)
         ├── MayCoachingMemory (session-scoped deduplication)
         └── Verify: memory dedup, repetition prevention
```

### LLM Flags — Remaining Disabled

All LLM flags remain `false` throughout MAY-008:
- `ENABLE_LLM`
- `ENABLE_LLM_COACHING`
- `ENABLE_LLM_SUMMARIES`
- `ENABLE_AZURE_OPENAI_PROVIDER`
- `ENABLE_OPENAI_PROVIDER`

The LLM readiness assessment (MAY-008A stretch goal) validates prompt contracts, provider interfaces, and fallback behavior without enabling any LLM flag.

---

## Stage 1: Adaptive Coaching (MAY-004 Layer)

### Activation

```javascript
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
```

### Modules Activated

| Module | Function | Output |
|--------|----------|--------|
| `MayLearnerProfile` | `build()` | `LearnerProfile` — identity, mastery levels, strengths/weaknesses, readiness score, behavior patterns |
| `MayAdaptiveRecommender` | `generate(profile)` | `Action[]` — 10-rule recommendation engine (R1-R10) |
| `MayRemediationEngine` | `buildRecoveryPlan(profile)` | `PlanEntry[]` — targeted recovery sets per weak topic |
| `MayReadinessScorer` | `score()` | Readiness score (MAY-004A stretch) |

### Validation Checks

- [ ] `MayLearnerProfile.build()` returns valid profile object for all 5 learner archetypes
- [ ] Profile includes: identity, activitySummary, masteryLevels, strengths, weaknesses, behavior
- [ ] `MayAdaptiveRecommender.generate()` returns max 5 actions per profile
- [ ] Recommendations are deterministic (same profile → same output)
- [ ] Each recommendation includes: type, priority, topic, rationale, evidence
- [ ] `MayRemediationEngine.buildRecoveryPlan()` returns max 3 plan entries
- [ ] Recovery plans are specific to the profile's weak areas
- [ ] All outputs are traceable to profile data

### Gate

All validation checks pass → proceed to Stage 2.

---

## Stage 2: Readiness Scoring (MAY-005 Layer)

### Activation

```javascript
MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
```

### Modules Activated

| Module | Function | Output |
|--------|----------|--------|
| `MayReadinessEngine` | `assess()` | `ReadinessSnapshot` — composite score, confidence, band, risk areas, recommended actions |
| `MayInterventionPrioritizer` | `rank()` | `PriorityQueue` — 10 ranked interventions by tier (1-5) |
| `MayRecommendationExplainer` | `explain(intervention)` | `Explanation` — human-readable rationale for intervention |
| `MayDashboardModel` | various | Dashboard data model (MAY-005A stretch) |

### Validation Checks

- [ ] `MayReadinessEngine.assess()` returns valid snapshot for all 5 archetypes
- [ ] Composite readiness score is between 0-100 with band assignment
- [ ] Confidence is reported (high/moderate/low)
- [ ] Risk areas are identified for relevant profiles
- [ ] `MayInterventionPrioritizer.rank()` returns tiered priority queue
- [ ] Interventions are sorted by priority score descending
- [ ] `topAction` is the highest-value next action
- [ ] `MayRecommendationExplainer.explain()` produces human-readable text
- [ ] All outputs are deterministic

### Gate

All validation checks pass → proceed to Stage 3.

---

## Stage 3: Adaptive Orchestration (MAY-006 Layer)

### Activation

```javascript
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', true);
```

### Modules Activated

| Module | Function | Output |
|--------|----------|--------|
| `MayCoachingOrchestrator` | `orchestrate()` | `CoachingPackage` — profile, readiness, recommendations, recovery plan, interventions, explanations, decision, next action |
| `MayDecisionEngine` | `decide(profile, readiness, recs, interventions)` | `Decision` — D1-D10 rule hierarchy, single best action |
| `MayInterventionCoordinator` | `coordinate(decision)` | `InterventionPlan` |
| `MayRecommendationPipeline` | `buildPayload(...)` | `RouterPayload` — standardized payload for coaching router |

### Pipeline Stages (in order)

1. **Profile** — `MayLearnerProfile.build()` → `LearnerProfile`
2. **Recommendations** — `MayAdaptiveRecommender.generate(profile)` → `Action[]`
3. **Remediation** — `MayRemediationEngine.buildRecoveryPlan(profile)` → `PlanEntry[]`
4. **Readiness** — `MayReadinessEngine.assess()` → `ReadinessSnapshot`
5. **Interventions** — `MayInterventionPrioritizer.rank()` → `PriorityQueue`
6. **Explanations** — `MayRecommendationExplainer.explain()` → `Explanation[]` (top 3)
7. **Decision** — `MayDecisionEngine.decide(...)` → `Decision`
8. **Router Payload** — `MayRecommendationPipeline.buildPayload(...)` → `RouterPayload`

### Validation Checks

- [ ] `MayCoachingOrchestrator.orchestrate()` returns complete `CoachingPackage`
- [ ] All 8 pipeline stages execute without error
- [ ] `_meta.flagsActive` lists all enabled flags
- [ ] `_meta.degradedComponents` tracks any missing modules
- [ ] `MayDecisionEngine.decide()` selects appropriate rule per archetype
- [ ] Decision includes: decisionId, action, coachingMode, priority, topic, rationale, evidence
- [ ] `CoachingPackage.nextAction` is consistent with decision
- [ ] Pipeline completed < 100ms per invocation
- [ ] Orchestrator `readinessCheck()` returns `ready: true`

### Expected Decision per Archetype

| Archetype | Expected Decision | Rationale |
|-----------|-------------------|-----------|
| Struggling Student | D1 (Readiness Critical) or D2 (Critical Weakness) | Low accuracy across all areas |
| Average Student | D6 (Emerging Weakness) or D7 (Fragile Knowledge) | Some weak areas, moderate readiness |
| High Performer | D9 (High Mastery) | Strong performance → challenge content |
| Exam-Cram Student | D4 (Exam Approaching) | Exam in < 30 days |
| Topic-Specific Weakness | D2 or D3 | Specific weak area + declining/unstable |

### Gate

All validation checks pass → proceed to Stage 4.

---

## Stage 4: Coaching Memory (MAY-006A)

### Activation

```javascript
MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', true);
```

### Modules Activated

| Module | Function | Output |
|--------|----------|--------|
| `MayCoachingMemory` | Session-scoped tracking | Intervention deduplication, repetition prevention |

### Validation Checks

- [ ] `MayCoachingMemory` prevents duplicate intervention delivery
- [ ] Memory is session-scoped (clears on new session)
- [ ] Zero impact on non-memory pipeline stages
- [ ] Memory does not leak across learner profiles

### Gate

All validation checks pass → MAY-008 complete.

---

## Safety Controls

### Isolation

- All flags enabled ONLY within the test script sandbox
- `may-feature-flags.js` default values never changed
- No flag persists outside the test harness execution
- Zero production exposure

### Rollback Protocol

If any stage produces erroneous output:
1. Disable the stage's flag immediately
2. Log the failure to telemetry output
3. Diagnose using raw profile/snapshot dumps
4. Re-enable after fix confirmed

### Sandbox Configuration

The test harness script (`scripts/may008_scenario_runner.js`) will:
1. Load all May modules via `require()`
2. Set up mock `MayLearnerState` data per archetype
3. Enable flags one stage at a time
4. Execute pipeline stages
5. Capture and dump full output to `reports/MAY008_TELEMETRY.json`

---

## Success Definition

MAY-008 succeeds when:
- All 4 stages complete with all validation checks passing
- All 5 learner archetypes produce appropriate, differentiated coaching outputs
- All pipeline stages execute without errors or degraded components
- Decision engine selects different decision IDs per archetype
- Zero LLM flags enabled
- Zero pack/case/content/registry modifications
- Zero network calls
- 100% deterministic outputs (same input → same output)
