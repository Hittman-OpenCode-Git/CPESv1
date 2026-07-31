# MAY-007 Integration Plan

**Session:** MAY-007  
**Created:** 2026-07-30  
**Governance Lane:** Light

---

## 1. Module Inventory

### 1.1 Wired (12 modules in index_updated.html)

| Module | MAY | Load Order | Dependencies |
|--------|-----|------------|--------------|
| may-learner-state.js | shared infrastructure | 10 | none |
| may-feature-flags.js | MAY-001 | 11 | none |
| may-context-builder.js | MAY-001 | 12 | MayFeatureFlags |
| may-coaching-router.js | MAY-001 | 13 | MayFeatureFlags, MayContextBuilder |
| may-coaching-modes/mode-base.js | MAY-002 | 14 | none |
| may-coaching-modes/mode-explain.js | MAY-002 | 15 | mode-base |
| may-coaching-modes/mode-quiz.js | MAY-002 | 16 | mode-base |
| may-coaching-modes/mode-socratic.js | MAY-002 | 17 | mode-base |
| may-coaching-modes/mode-motivate.js | MAY-002 | 18 | mode-base |
| may-coaching-modes/mode-study-plan.js | MAY-002 | 19 | mode-base |
| may-coaching-modes/mode-exam-review.js | MAY-002 | 20 | mode-base |
| may-core.js | shared | 21 | MayLearnerState, MayFeatureFlags |

### 1.2 Unwired (16 modules — NEED INSERTION)

| Module | MAY | Depends On |
|--------|-----|------------|
| may-llm-types.js | MAY-003 | none |
| may-llm-provider-registry.js | MAY-003 | MayFeatureFlags |
| may-llm-adapter.js | MAY-003 | MayFeatureFlags, MayLLMTypes, MayLLMProviderRegistry |
| may-learner-profile.js | MAY-004 | MayFeatureFlags, MayLearnerState |
| may-adaptive-recommender.js | MAY-004 | MayFeatureFlags, MayLearnerState |
| may-remediation-engine.js | MAY-004 | MayFeatureFlags, MayLearnerState |
| may-readiness-scorer.js | MAY-005 | MayFeatureFlags |
| may-readiness-engine.js | MAY-005 | MayFeatureFlags, MayLearnerState |
| may-intervention-prioritizer.js | MAY-005 | MayFeatureFlags, MayLearnerState |
| may-recommendation-explainer.js | MAY-005 | MayFeatureFlags, MayInterventionPrioritizer |
| may-dashboard-model.js | MAY-005 | MayFeatureFlags, MayLearnerState, MayInterventionPrioritizer, MayReadinessEngine |
| may-decision-engine.js | MAY-006 | MayLearnerProfile, MayReadinessEngine, MayAdaptiveRecommender, MayInterventionPrioritizer |
| may-intervention-coordinator.js | MAY-006 | MayInterventionPrioritizer, MayLearnerProfile, MayDecisionEngine |
| may-recommendation-pipeline.js | MAY-006 | self-contained |
| may-coaching-memory.js | MAY-006 | MayFeatureFlags |
| may-coaching-orchestrator.js | MAY-006 | All MAY-004/5 modules + MayDecisionEngine + MayRecommendationPipeline |

---

## 2. Dependency Graph for Loading Order

```
may-llm-types.js            [MAY-003, no deps]
may-llm-provider-registry.js [MAY-003, → MayFeatureFlags]
may-llm-adapter.js           [MAY-003, → MayLLMTypes, MayLLMProviderRegistry]
may-learner-profile.js       [MAY-004, → MayLearnerState, MayFeatureFlags]
may-adaptive-recommender.js  [MAY-004, → MayLearnerState, MayFeatureFlags]
may-remediation-engine.js    [MAY-004, → MayLearnerState, MayFeatureFlags]
may-readiness-scorer.js      [MAY-005, → MayFeatureFlags]
may-readiness-engine.js      [MAY-005, → MayLearnerState, MayFeatureFlags]
may-intervention-prioritizer.js  [MAY-005, → MayLearnerState, MayFeatureFlags]
may-recommendation-explainer.js  [MAY-005, → MayFeatureFlags, MayInterventionPrioritizer]
may-dashboard-model.js       [MAY-005, → MayLearnerState, MayFeatureFlags, MayInterventionPrioritizer, MayReadinessEngine]
may-decision-engine.js       [MAY-006, → MayLearnerProfile, MayReadinessEngine, MayAdaptiveRecommender, MayInterventionPrioritizer]
may-intervention-coordinator.js  [MAY-006, → MayInterventionPrioritizer, MayLearnerProfile, MayDecisionEngine]
may-recommendation-pipeline.js   [MAY-006, → self-contained]
may-coaching-memory.js       [MAY-006, → MayFeatureFlags]
may-coaching-orchestrator.js [MAY-006, → ALL above]
```

---

## 3. Insertion Point

**File:** `index_updated.html`, **between** `may-core.js` (currently last May script) and `app.js`.

Current state:
```
<script src="may-core.js"></script>
<script src="app.js"></script>
```

Target state:
```
<script src="may-core.js"></script>
<!-- 16 MAY-003 through MAY-006 modules inserted here -->
<script src="app.js"></script>
```

---

## 4. Testing

| Test | Command | Expected |
|------|---------|----------|
| Module load check | Custom browser eval | All 28 May modules on `window` |
| Orchestrator dependency check | MayCoachingOrchestrator.healthCheck() | All 8 dependencies found |
| Smoke test | `npm run smoke` | MCQ_BANK_E error remains (pre-existing Pack E parse); all May checks pass |
