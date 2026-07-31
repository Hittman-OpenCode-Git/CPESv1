# MAY-013 — Structured Telemetry Plan

**Session:** MAY-013
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Objective

Standardize the telemetry output format across ALL May coaching pipeline outputs so future sessions (and eventual production activation monitoring) consume a consistent schema.

---

## 2. Standard Telemetry Schema

```json
{
  "_schema": "MAY013-1.0",
  "_session": "MAY-013",
  "_timestamp": "ISO8601",
  
  "learnerProfile": {
    "learnerId": "string",
    "archetype": "string",
    "sessionCount": "number",
    "sessionsLast7Days": "number",
    "sessionsLast28Days": "number",
    "studyStreak": "number",
    "examPlan": {
      "hasScheduledExam": "boolean",
      "daysUntilExam": "number|null"
    }
  },
  
  "readinessScore": {
    "score": "number (0-100)",
    "band": "string",
    "confidence": "number (0-100)",
    "topicsAtReady": "number",
    "topicsAtRecovery": "number",
    "sectionsWithData": "number",
    "perSection": {}
  },
  
  "decisionId": "string (D1-D10)",
  "coachingMode": "string (QUIZ|EXPLAIN|SOCRATIC|STUDY_PLAN)",
  "decisionPriority": "string (critical|high|medium|low)",
  "decisionTopic": "string|null",
  "decisionRationale": "string",
  
  "secondaryDecisionId": "string|null",
  "secondaryMode": "string|null",
  
  "interventions": {
    "count": "number",
    "topTier": "number (1-5|null)",
    "topTopic": "string|null"
  },
  
  "recommendations": {
    "count": "number",
    "types": ["string..."]
  },
  
  "explanations": {
    "count": "number"
  },
  
  "degradedComponents": ["string..."],
  "pipelineError": "string|null",
  
  "successCriteria": {
    "CAL_READINESS": { "pass": "boolean", "value": "number", "label": "string" },
    "CAL_COVERAGE": { "pass": "boolean", "value": "string", "label": "string" },
    "CAL_MODE_DIVERSITY": { "pass": "boolean", "value": "string", "label": "string" },
    "CAL_NO_REGRESSIONS": { "pass": "boolean", "value": "string", "label": "string" },
    "CAL_DETERMINISM": { "pass": "boolean", "value": "string", "label": "string" },
    "CAL_NO_CHALLENGE_WEAK": { "pass": "boolean", "value": "string", "label": "string" },
    "GOV_0_DIVERGENCES": { "pass": "boolean", "value": "string", "label": "string" }
  }
}
```

---

## 3. Schema Mapping — Where Each Field Comes From

| Telemetry Field | Source Module | Source Method/Field |
|----------------|--------------|---------------------|
| `learnerProfile.*` | `MayLearnerState` / `MayLearnerProfile` | `profile` from orchestrator |
| `readinessScore.score` | `MayReadinessEngine` | `readiness.readinessScore` |
| `readinessScore.band` | `MayReadinessEngine` | `readiness.band` |
| `readinessScore.confidence` | `MayReadinessEngine` | `readiness.confidence` |
| `readinessScore.topicsAtReady` | `MayReadinessEngine` | `readiness.topicCoverage.topicsAtReady` |
| `readinessScore.topicsAtRecovery` | `MayReadinessEngine` | `readiness.topicCoverage.topicsAtRecovery` |
| `decisionId` | `MayDecisionEngine` | `decision.decisionId` |
| `coachingMode` | `MayDecisionEngine` | `decision.coachingMode` |
| `decisionPriority` | `MayDecisionEngine` | `decision.priority` |
| `decisionTopic` | `MayDecisionEngine` | `decision.topic` |
| `secondaryDecisionId` | `MayDecisionEngine` | `decision.secondaryAction.decisionId` |
| `interventions.*` | `MayInterventionPrioritizer` | `interventions.queue.length`, `topAction.tier`, `topAction.topic` |
| `recommendations.*` | `MayAdaptiveRecommender` | `recommendations.length`, type aggregation |
| `degradedComponents` | `MayCoachingOrchestrator` | `_meta.degradedComponents` |
| `successCriteria` | Calibration runner | Pre/post comparison logic |

---

## 4. Telemetry Output

**File:** `reports/MAY013_TELEMETRY.json`

**Structure:**
```json
{
  "_schema": "MAY013-1.0",
  "_session": "MAY-013",
  "_timestamp": "...",
  "_pipelineVersion": "MAY006-1.0",
  "aggregates": {
    "profilesTested": 15,
    "d1d10Coverage": { "D1": {"triggered": true, "count": N, "profiles": [...]}, ... },
    "readinessDistribution": { "scoreRange": {...}, "scores": [...], "bandDistribution": {...} },
    "modeDistribution": { "QUIZ": N, "EXPLAIN": N, ... },
    "decisionPriorityDistribution": { "critical": N, "high": N, ... }
  },
  "successCriteria": { ... },
  "results": [ /* one object per profile, matching the schema in §2 */ ]
}
```

---

## 5. Implementation

The `scripts/may013_decision_runner.js` will:
1. Seed profiles into localStorage
2. Execute `MayCoachingOrchestrator.orchestrate()` 
3. Extract standardized telemetry from orchestrator output
4. Write `reports/MAY013_TELEMETRY.json`
5. Verify success criteria and exit 0/1

Compared to `may012_calibration_runner.js`, the key improvement is:
- Consistent field naming (`camelCase` throughout)
- Per-result objects all share the same structure
- Aggregates pre-computed at top level
- Schema version stamped for future compatibility

---

*Generated: 2026-07-30 — MAY-013 Telemetry Planner*
