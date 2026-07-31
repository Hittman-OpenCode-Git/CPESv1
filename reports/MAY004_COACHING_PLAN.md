# MAY-004 Coaching Plan

**Session:** MAY-004 — Adaptive Study Coach  
**Phase:** Planner → Coaching Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Map adaptive recommendation types to existing coaching modes, define the integration surface, and specify how each mode consumes learner intelligence without disrupting existing behavior.

## 2. Mode → Adaptive Behavior Mapping

### EXPLAIN Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `profile.weaknesses` | When explaining a weak-topic question, include a brief note: "This is one of your growth areas — you're at {accuracy}% here." |
| `profile.behavior.confidenceCalibration` | When learner is overconfident (overconfidentRate > 30%), include calibration nudge: "You marked high confidence on this — remember that confidence calibration is a skill too." |
| `profile.masteryLevels[topic]` | When topic accuracy > 85%, shorten explanation (assume foundation is solid), focus on nuance. |

### QUIZ Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `recommendedActions[type=reinforcement]` | Generate quiz focused on weak/reinforcement topic |
| `recommendedActions[type=challenge]` | Generate challenge quiz on strength topic |
| `profile.recentQIDs` | Exclude recently seen QIDs from quiz generation (dedup) |
| `profile.masteryLevels[topic].difficultyDistribution` | Adjust quiz difficulty — if low-difficulty accuracy is high but high-difficulty low, generate harder items |

### SOCRATIC Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `profile.masteryLevels[topic].band` | Readiness band → adjusts starting hint depth |
| `profile.masteryLevels[topic].stability` | Low stability → start with concept-level hints, don't jump to strategy |
| `profile.behavior.hintDependency` | If hint-dependent on this topic → start with metacognitive nudge ("Before I give you a hint, what do you already know about {concept}?") |
| `profile.misconceptionPatterns` | Known misconception → target socratic chain at that misconception |

### STUDY_PLAN Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `recommendedActions` (all) | Top 5 recommendations become the study plan suggestions |
| `profile.readinessScore.perSection` | Section readiness drives domain prioritization |
| `profile.examPlan.daysUntilExam` | Time pressure adjusts recommendation urgency |
| `profile.recentTopics` | Ensure plan rotates through unvisited topics |
| `profile._meta.dataSufficiency` | If insufficient, show the generic "need more data" plan |

### EXAM_REVIEW Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `profile.weaknesses` | Post-session review highlights weak-area performance |
| `profile.missedTopics` | Generates review set from missed QIDs |
| `profile.strengths` | Highlights strong-area performance for motivation |

### MOTIVATE Mode

| Adaptive Input | Behavior |
|----------------|----------|
| `profile.improvingTopics` | "Your {topic} accuracy improved {delta}% — that's real progress!" |
| `profile.studyStreak` | "{streak}-day study streak — consistency wins!" |
| `profile.readinessScore.overall` | "{band} readiness — you're building toward exam-ready." |

## 3. Integration Surface

### 3.1 Coaching Mode Handler Dispatch

The existing `MayCoachingRouter.dispatchToHandler()` receives `mayContext` + `routing`. When `ENABLE_ADAPTIVE_COACHING` is enabled:

```
MayCoachingRouter.dispatchToHandler(mayContext, routing)
  → If ENABLE_ADAPTIVE_COACHING:
       profile = MayLearnerProfile.build()
       augmentedContext = { ...mayContext, _adaptiveProfile: profile }
       MayCoachingModeBase.dispatch(augmentedContext, routing)
  → Else:
       MayCoachingModeBase.dispatch(mayContext, routing)
```

### 3.2 Coaching Mode Handlers

Each handler in `MayCoachingModeBase` receives `mayContext._adaptiveProfile` when available. Handlers use a consistent pattern:

```
function handleExplain(mayContext) {
  const profile = mayContext._adaptiveProfile;
  // ... existing explain logic ...
  if (profile && profile.weaknesses.length > 0) {
    // Add adaptive nuance
  }
  return result;
}
```

### 3.3 MayCore Hooks

Two integration points in `may-core.js`:

1. **`init()`** — When `ENABLE_ADAPTIVE_COACHING` is enabled, build profile after learner state loads
2. **`renderView()`** — Use profile to tailor May companion card content

## 4. Remediation Engine Integration

The `may-remediation-engine.js` module implements weak-area targeting, concept reinforcement, missed-topic recovery, and quiz recommendations as a standalone service consumed by QUIZ and STUDY_PLAN modes.

### API Surface

```
MayRemediationEngine.buildRecoverySet(profile) → QID[]
MayRemediationEngine.getTargetedTopics(profile) → string[]
MayRemediationEngine.getQuizConfig(profile, topic) → { count, difficulty, excludeQIDs }
MayRemediationEngine.getReinforcementNotes(profile, topic) → string
```

## 5. Backward Compatibility Guarantee

| Guarantee | Enforcement |
|-----------|-------------|
| `ENABLE_ADAPTIVE_COACHING=false` → zero behavior change | All adaptive code paths gated by flag check at entry |
| Existing May handlers unchanged | Adaptive augmentations are additive (extra parameters, extra steps), never replacements |
| No new localStorage keys | Profile is materialized on read from existing state |
| Coaching mode contracts unchanged | `MODE_CONTRACTS` in `may-coaching-router.js` not modified |
| All existing tests pass | Regression suite run at Verifier phase |

## 6. Feature Flag

`ENABLE_ADAPTIVE_COACHING` (default: `false`) gates the entire adaptive coaching pipeline. Added to `may-feature-flags.js` alongside existing flags. Environment variable override: `MAY_ENABLE_ADAPTIVE_COACHING=1`.

## 7. Deliverables

| File | Purpose |
|------|---------|
| `may-learner-profile.js` | Profile builder |
| `may-adaptive-recommender.js` | Recommendation engine |
| `may-remediation-engine.js` | Remediation & recovery |
| `may-feature-flags.js` (update) | Add `ENABLE_ADAPTIVE_COACHING` |
| `may-coaching-router.js` (update) | Profile enrichment in dispatch path |
