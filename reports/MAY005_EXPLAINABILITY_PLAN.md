# MAY-005 Recommendation Explainability Plan

**Session:** MAY-005 — Adaptive Intelligence & Readiness Platform  
**Phase:** Planner → Explainability Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Define the explainability framework that ensures every recommendation answers three questions:
1. **Why was this recommended?**
2. **What evidence was used?**
3. **What outcome is expected?**

## 2. The Explainability Chain

```
Recommendation
  ↓
Evidence (what data drove this?)
  ↓
Reasoning (why does the evidence imply this action?)
  ↓
Expected Benefit (what should improve?)
```

## 3. Explanation Schema

```json
{
  "recommendation": "Start with a recovery set on budgeting fundamentals",
  "why": "Your accuracy on budgeting topics is 47% across 12 attempts, with a declining trend (-8% in recent sessions).",
  "evidence": {
    "topic": "Planning and budgeting",
    "accuracy": 47,
    "attempts": 12,
    "direction": "declining",
    "delta": -8,
    "band": "Recovery needed",
    "stability": 35
  },
  "reasoning": "When accuracy is below 60% with a declining trend, the most effective next step is untimed review of the fundamentals before attempting timed practice. This rebuilds the concept foundation.",
  "expectedBenefit": "With one targeted recovery session (10–15 questions, untimed, full explanations), you should see accuracy move above 60%. Two sessions typically move a recovery topic into the developing band.",
  "_meta": {
    "generatedAt": "2026-07-30T...",
    "engineVersion": "MAY005-1.0",
    "confidence": "moderate"
  }
}
```

## 4. Evidence Rules

Every explanation must cite specific, verifiable evidence:

| Evidence Type | What To Cite |
|--------------|-------------|
| Topic accuracy | Overall %, recent %, attempt count |
| Trend | Direction, delta, stability score |
| Cluster | Which cluster (persistentWeak, declining, etc.) |
| Band | Readiness band for topic/section |
| Comparison | Before/after deltas where available |
| Behavioral | Hint rate, difficulty sensitivity, calibration |

## 5. Reasoning Templates

### Remediation (Critical Weakness)
> "When [topic] accuracy is [X]% across [N] attempts with a [direction] trend, the most effective next step is [action]. This rebuilds the concept foundation before attempting timed practice."

### Consolidation (Fragile Knowledge)
> "Your [topic] performance is at [X]% but unstable (stability [Y]%). Unstable knowledge patterns benefit from [action] — focused, untimed practice that reinforces the concept before introducing time pressure."

### Challenge (Mastered Area)
> "You've demonstrated strong, stable performance on [topic] (accuracy [X]%, [N] attempts, stability [Y]%). It's time to [action] — increasing difficulty and introducing case-based scenarios."

### Exam Risk (Review Campaign)
> "With [N] days until your exam and overall readiness at [X]%, [action]. High-yield review combined with timed practice maximizes your remaining preparation time."

## 6. Feature Flag

Gated behind `ENABLE_READINESS_SCORING` (default: `false`).

## 7. Deliverable

`may-recommendation-explainer.js` — IIFE module exposing `MayRecommendationExplainer.explain()`.
