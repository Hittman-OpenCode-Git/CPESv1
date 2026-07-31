# MAY-007 Dependency Plan

**Session:** MAY-007  
**Created:** 2026-07-30  
**Governance Lane:** Light

---

## 1. Missing Script Tags

16 module files in root that are NOT in `index_updated.html`:

| # | File | MAY Phase |
|---|------|-----------|
| 1 | may-llm-types.js | MAY-003 |
| 2 | may-llm-provider-registry.js | MAY-003 |
| 3 | may-llm-adapter.js | MAY-003 |
| 4 | may-learner-profile.js | MAY-004 |
| 5 | may-adaptive-recommender.js | MAY-004 |
| 6 | may-remediation-engine.js | MAY-004 |
| 7 | may-readiness-scorer.js | MAY-005 |
| 8 | may-readiness-engine.js | MAY-005 |
| 9 | may-intervention-prioritizer.js | MAY-005 |
| 10 | may-recommendation-explainer.js | MAY-005 |
| 11 | may-dashboard-model.js | MAY-005 |
| 12 | may-decision-engine.js | MAY-006 |
| 13 | may-intervention-coordinator.js | MAY-006 |
| 14 | may-recommendation-pipeline.js | MAY-006 |
| 15 | may-coaching-memory.js | MAY-006 |
| 16 | may-coaching-orchestrator.js | MAY-006 |

---

## 2. Missing Imports

None. All modules use IIFE pattern with `window.X = X` for global registration and optional `module.exports` for Node compatibility. No ES module imports, no `require()` calls. The loading order is determined entirely by `<script>` tag sequence.

---

## 3. Missing Registrations

All 16 unwired modules register on `window` via the pattern:
```javascript
window.ModuleName = ModuleName;
```

All also support Node via:
```javascript
if (typeof module !== 'undefined' && module.exports) { module.exports = ModuleName; }
```

Verified: 16/16 modules have `window.X = X` at bottom. No missing registrations.

---

## 4. Reachable Code Paths

### 4.1 MayCoachingOrchestrator.run() Path
```
run()
├── _stageProfile()       → MayLearnerProfile.build()
├── _stageRecommendations() → MayAdaptiveRecommender.generate()
├── _stageRecovery()      → MayRemediationEngine.buildRecoveryPlan()
├── _stageReadiness()     → MayReadinessEngine.assess()
├── _stageInterventions() → MayInterventionPrioritizer.rank()
├── _stageExplanations()  → MayRecommendationExplainer.explain()
├── _stageDecision()      → MayDecisionEngine.decide()
└── _stagePayload()       → MayRecommendationPipeline.buildPayload()
```

All 8 stages guard with `typeof X === 'undefined'` — safe when unwired. Post-wiring, all become reachable.

### 4.2 healthCheck() Path
```
healthCheck()
├── Checks typeof MayLearnerProfile
├── Checks typeof MayAdaptiveRecommender
├── Checks typeof MayRemediationEngine
├── Checks typeof MayReadinessEngine
├── Checks typeof MayInterventionPrioritizer
├── Checks typeof MayRecommendationExplainer
├── Checks typeof MayDecisionEngine
└── Checks typeof MayRecommendationPipeline
```

Returns `{missing: [], degraded: false}` when all wired.

---

## 5. Unused Modules

None. All 16 unwired modules are referenced by MayCoachingOrchestrator or are part of the MAY-003 LLM layer. No dead code.

---

## 6. Module Cross-Reference

| Module | Consumed By |
|--------|------------|
| may-llm-types.js | may-llm-adapter.js |
| may-llm-provider-registry.js | may-llm-adapter.js |
| may-llm-adapter.js | (standalone — activated by flag) |
| may-learner-profile.js | may-coaching-orchestrator.js, may-decision-engine.js, may-intervention-coordinator.js |
| may-adaptive-recommender.js | may-coaching-orchestrator.js |
| may-remediation-engine.js | may-coaching-orchestrator.js |
| may-readiness-scorer.js | (standalone — activated by flag) |
| may-readiness-engine.js | may-coaching-orchestrator.js, may-decision-engine.js, may-dashboard-model.js |
| may-intervention-prioritizer.js | may-coaching-orchestrator.js, may-recommendation-explainer.js, may-dashboard-model.js, may-intervention-coordinator.js |
| may-recommendation-explainer.js | may-coaching-orchestrator.js |
| may-dashboard-model.js | (standalone — activated by flag) |
| may-decision-engine.js | may-coaching-orchestrator.js, may-intervention-coordinator.js |
| may-intervention-coordinator.js | (standalone — activated by flag) |
| may-recommendation-pipeline.js | may-coaching-orchestrator.js |
| may-coaching-memory.js | (standalone — activated by flag) |
| may-coaching-orchestrator.js | (top-level — runs the full pipeline) |
