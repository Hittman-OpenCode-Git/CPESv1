# MAY-011 — Metrics Plan

**Session:** MAY-011
**Date:** 2026-07-30
**Governance Lane:** Light

---

## 1. Collection Categories

### 1.1 Decision Coverage (dc)

Measures whether the coaching pipeline produces decisions across all archetypes and stages.

| Metric | Key | Type | Description |
|--------|-----|------|-------------|
| Decisions produced | `dc.decisionsTotal` | count | Total `orchestrate()` calls returning non-null `decision` |
| Decisions by stage | `dc.byStage` | map | `{ stage1: N, stage2: N, stage3: N, stage4: N }` |
| Pipeline abort rate | `dc.abortRate` | ratio | Calls where `error` field present in `_meta` |
| Null decision rate | `dc.nullDecisionRate` | ratio | `decision: null` / total calls |

### 1.2 Recommendation Quality (rq)

Measures whether recommendations are topically relevant and actionable.

| Metric | Key | Type | Description |
|--------|-----|------|-------------|
| Recommendation types | `rq.typeDistribution` | map | Count of each `rec.type` (remediation, practice, review, explore) |
| Topic relevance rate | `rq.topicRelevance` | ratio | Recommendations citing topics in learner state / total recommendations |
| Recommendation count | `rq.countPerArchetype` | map | `{ L1: N, L2: N, ... }` |
| Priority distribution | `rq.priorityDistribution` | map | Count by priority (critical, high, medium, low) |
| Empty recommendation rate | `rq.emptyRate` | ratio | Calls where `recommendations: []` despite valid profile |

### 1.3 Readiness Consistency (rc)

Measures scoring stability and banding correctness.

| Metric | Key | Type | Description |
|--------|-----|------|-------------|
| Score determinism | `rc.determinismPass` | boolean | Same input yields same score across 3 calls |
| Band distribution | `rc.bandDistribution` | map | Count per readiness band |
| Score range | `rc.scoreRange` | object | `{ min, max, mean, median }` |
| Confidence mean | `rc.meanConfidence` | number | Average `readiness.confidence` across calls |
| Section coverage | `rc.sectionsWithData` | map | Sections present in topicCoverage |

### 1.4 Remediation Accuracy (ra)

Measures whether recovery plans target the correct weak areas.

| Metric | Key | Type | Description |
|--------|-----|------|-------------|
| Recovery plan size | `ra.planSizePerArchetype` | map | `{ L1: N, L2: N, ... }` |
| Plan topic match rate | `ra.topicMatchRate` | ratio | Plan topics that match weak-section topics |
| Plan specificity | `ra.meanPlanChars` | number | Average plan entry detail length |

### 1.5 Mode-Selection Accuracy (ms)

Measures whether coaching mode selection matches archetype expectation.

| Metric | Key | Type | Description |
|--------|-----|------|-------------|
| Mode distribution | `ms.modeDistribution` | map | Count per coaching mode |
| Mode-archetype fit | `ms.archetypeFit` | map | `{ L1: fit_score, L2: fit_score, ... }` |
| Mode diversity | `ms.uniqueModes` | count | Number of distinct modes selected across archetypes |

---

## 2. Per-Archetype Metrics

For each archetype L1–L5, collect:

```
{
  learnerId,
  pipelineMs,           // Total orchestrate() execution time
  decisionId,           // Decision identifier
  decisionAction,       // Recommended action
  decisionMode,         // Coaching mode selected
  decisionPriority,     // Priority level
  decisionTopic,        // Recommended topic
  decisionRationale,    // Human-readable rationale
  readinessScore,       // 0-100 numeric
  readinessBand,        // Band label
  readinessConfidence,  // 0-100
  topicCoverageTopicsWithData,    // Topics with learner data
  topicCoverageTopicsAtReady,     // Topics at ready threshold
  topicCoverageTopicsAtRecovery,  // Topics needing recovery
  sectionsWithData,     // Blueprint sections with data
  intCount,             // Number of interventions
  intTiers,             // Priority tiers present
  intTopTier,           // Highest priority tier
  intTopTopic,          // Top intervention topic
  recCount,             // Number of recommendations
  recTypes,             // Recommendation type array
  recPriorities,        // Priority array
  recTopType,           // Most frequent recommendation type
  recTopTopic,          // Most frequent recommendation topic
  planCount,            // Recovery plan entries
  planTopics,           // Recovery plan topics
  modeFitScore,         // How well mode matches archetype
  degradedComponents    // Any degraded components
}
```

---

## 3. Collection Protocol

1. **Pre-stage snapshot:** Capture `MayFeatureFlags.snapshot()` before any flag toggle.
2. **Per-stage collection:** After each stage activation, call `MayCoachingOrchestrator.orchestrate()` and capture the full return value.
3. **Post-stage snapshot:** Capture flag state, verify only test flags changed.
4. **Determinism check:** Repeat the full-orchestration call 3 times with identical state, verify identical output.
5. **Memory check (Stage 4 only):** Call `orchestrate()` 3 times, verify decreasing intervention duplication.

---

## 4. Output Format

Telemetry stored at `reports/MAY011_TELEMETRY.json`:

```json
{
  "session": "MAY-011",
  "timestamp": "ISO8601",
  "preflight": { /* preflight results */ },
  "featureFlagAudit": { /* flag state before/after */ },
  "results": [ /* per-archetype metrics, one entry per stage */ ],
  "summary": {
    "decisionCoverage": { /* dc metrics */ },
    "recommendationQuality": { /* rq metrics */ },
    "readinessConsistency": { /* rc metrics */ },
    "remediationAccuracy": { /* ra metrics */ },
    "modeSelectionAccuracy": { /* ms metrics */ }
  },
  "successCriteria": { /* SC1-SC10 verdicts */ },
  "verification": { /* pass/fail per criterion */ }
}
```

---

## 5. Success Criteria Cross-Reference

| SC | Metrics Used | Threshold |
|----|-------------|-----------|
| SC1 | `dc.decisionsTotal` | >= 5 with non-null decisions |
| SC2 | `ms.uniqueModes` | >= 3 distinct modes |
| SC3 | `rq.topicRelevance` | 1.0 (100%) |
| SC4 | `rc.determinismPass` | true |
| SC5 | `ra.topicMatchRate` | >= 0.8 |
| SC6 | degradedComponents count | 0 in full-orchestration |
| SC7 | Memory deduplication | < 30% after 3 calls |
| SC8 | `featureFlagAudit.productionDefaults` | All false |
| SC9 | `preflight.divergences` | 0 |
| SC10 | smoke/preflight exit codes | 0 |

---

*Generated: 2026-07-30 — MAY-011 Metrics Planner*
