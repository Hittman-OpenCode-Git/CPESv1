# MAY-004 Adaptation Plan

**Session:** MAY-004 — Adaptive Study Coach  
**Phase:** Planner → Adaptation Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Define the adaptation rules that transform a static learner profile into actionable, personalized coaching guidance. Rules are deterministic, evidence-backed, and traceable to specific profile fields.

## 2. Design Principles

1. **Deterministic** — Same profile always produces same recommendations (no randomness).
2. **Explainable** — Every recommendation carries a `rationale` and `evidence` block.
3. **Traceable** — Every recommendation traces to a specific profile field and threshold.
4. **Non-destructive** — Recommendations are suggestions; no state mutation.
5. **Collapsed by default** — All adaptivity behind `ENABLE_ADAPTIVE_COACHING=false`.

## 3. Adaptation Rules

### R1 — Weak Area Detection → Remediation

```
IF profile.weaknesses.length > 0
THEN generate:
  type: "remediation"
  priority: "high"
  topic: weakest topic (lowest accuracy with most attempts)
  rationale: "accuracy below 60% on {topic} — prioritizing concept recovery"
  evidence: { accuracy, attempts, recentTrend }
```

**Sort order:** Lowest accuracy first, tie-broken by highest attempt count.

### R2 — Repeated Errors → Targeted Quiz

```
IF profile.missedTopics.length > 0
   AND (profile.masteryLevels[topic].attempts >= 3)
THEN generate:
  type: "reinforcement"
  priority: "medium"
  topic: most frequently missed topic in last 3 sessions
  rationale: "recent misses on {topic} — targeted drill recommended"
  evidence: { missCount, recentAccuracy }
```

### R3 — High Mastery → Challenge Questions

```
IF profile.strengths.length > 0
   AND profile.masteryLevels[topic].accuracy >= 85
   AND profile.masteryLevels[topic].attempts >= 6
THEN generate:
  type: "challenge"
  priority: "medium"
  topic: top strength topic
  rationale: "strong at {topic} ({accuracy}%) — ready for advanced application"
  evidence: { accuracy, attempts, stability }
```

**Cap:** Maximum 3 challenge recommendations per profile.

### R4 — Declining Trend → Intervention

```
IF profile.decliningTopics.length > 0
THEN generate (above remediation):
  type: "remediation"
  priority: "high"
  topic: most severely declining (largest negative delta)
  rationale: "{topic} declining ({delta}%) — intervention before gap widens"
  evidence: { accuracy, delta, direction }
```

### R5 — Section Gap → Prioritized Domain Work

```
IF any section has band "Recovery needed" OR "Developing"
   AND learner has examPlan.examDate
   AND daysUntilExam <= 30
THEN generate:
  type: "review"
  priority: "high"
  section: weakest section
  rationale: "Section {section} needs attention with {daysUntilExam} days until exam"
  evidence: { sectionBand, daysUntilExam }
```

### R6 — Exam Approaching → Review Plan

```
IF profile.examPlan.daysUntilExam <= 14
   AND profile.examPlan.daysUntilExam > 0
THEN generate:
  type: "review"
  priority: "high"
  rationale: "exam in {days} days — prioritize high-yield review areas"
  evidence: { daysUntilExam, overallReadiness }
```

### R7 — Hint Dependency → Strategy Shift

```
IF profile.behavior.hintDependency.trend === "increasing"
   AND profile.behavior.hintDependency.topics.length >= 1
THEN generate:
  type: "remediation"
  priority: "medium"
  topic: profile.behavior.hintDependency.topics[0]
  rationale: "hint usage increasing — may be developing over-reliance; try untimed practice"
  evidence: { hintTrend, affectedTopics }
```

### R8 — Case Skills Gap → Case Reinforcement

```
IF profile.behavior.casePatterns.dominantTrend === "worsening"
   AND profile.behavior.casePatterns.dominant !== null
THEN generate:
  type: "practice_mix"
  priority: "medium"
  rationale: "case pattern {dominant} worsening — prioritize case practice"
  evidence: { dominantPattern, dominantTrend }
```

### R9 — Stale Topics → Rotation

```
IF profile.masteryLevels[topic].lastSeen > 28 days ago
   AND profile.masteryLevels[topic].band !== "Ready for focused review"
THEN generate:
  type: "reinforcement"
  priority: "low"
  topic: topic
  rationale: "{topic} not practiced in {daysSince} days — rotate back in"
  evidence: { lastSeen, daysSince }
```

### R10 — Insufficient Data → Default

```
IF profile._meta.dataSufficiency === "insufficient"
THEN generate single recommendation:
  type: "practice_mix"
  priority: "medium"
  rationale: "complete more sessions to unlock personalized recommendations"
  evidence: { sessionCount, topicCount }
```

## 4. Priority & Deduplication

### Priority Resolution
When multiple rules fire for the same topic, the highest-priority recommendation wins.

### Deduplication
Two recommendations with the same `type` + `topic` are merged (highest priority kept, evidence blocks concatenated).

### Output Cap
Maximum 5 recommendations per profile.

### Sort Order
1. Priority: high → medium → low
2. Within priority: remediation → review → reinforcement → challenge → practice_mix
3. Within type: strongest evidence (highest attempt count)

## 5. Closed-Loop Adjustment

Prior recommendation outcomes from `MayLearnerState.getOutcomeSummary()` influence current recommendations:

- **Positive outcome** on a prior topic recommendation → deprioritize (lower priority by one tier)
- **Contradictory outcome** → don't re-recommend same type for that topic
- **Neutral** → no adjustment
- **Insufficient** → no adjustment

## 6. Feature Flag

All adaptation logic gated behind `ENABLE_ADAPTIVE_COACHING` (default: `false`). When disabled, `MayAdaptiveRecommender.generate()` returns an empty array.

## 7. Deliverable

`may-adaptive-recommender.js` — single IIFE module exposing `MayAdaptiveRecommender.generate(profile)` → `Action[]`.
