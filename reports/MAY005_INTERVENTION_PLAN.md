# MAY-005 Intervention Prioritization Plan

**Session:** MAY-005 — Adaptive Intelligence & Readiness Platform  
**Phase:** Planner → Intervention Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Define the intervention prioritization logic that ranks remediation opportunities, study priorities, and identifies the highest-value next action for the learner.

## 2. Prioritization Tiers

### Tier 1 — Critical Weakness → Immediate Remediation
**Conditions (any):**
- Topic accuracy < 50% with ≥ 5 attempts
- Topic in "persistent weak" cluster AND recent direction is "declining"
- Section band = "Recovery needed" with ≥ 2 recovery topics

**Action:** Targeted MCQ set on weakest topic, untimed, with full explanation review.

### Tier 2 — Emerging Weakness → Targeted Coaching
**Conditions (any):**
- Topic accuracy 50–59% with ≥ 5 attempts, not declining
- Topic in "declining" cluster with ≥ 4 attempts
- Hint dependency detected (increasing hint rate, accuracy ≥ 70%)

**Action:** Targeted practice with graduated hint flow; focus on process errors.

### Tier 3 — Fragile Knowledge → Consolidation
**Conditions (any):**
- Topic accuracy 60–74% with ≥ 3 attempts, stability < 50
- Topic direction = "slightly_declining" with delta -5 to -10
- Difficulty sensitivity detected (easy% − hard% ≥ 30%)

**Action:** Mixed-mode practice at the difficulty transition point.

### Tier 4 — Mastered Area → Challenge Content
**Conditions (all):**
- Topic accuracy ≥ 85% with ≥ 6 attempts
- Direction = "improving" or "stable"
- Stability ≥ 75

**Action:** Timed practice at increased difficulty; case-based application.

### Tier 5 — Exam Risk → Review Campaign
**Conditions:**
- Days until exam < 30 AND overall readiness < 50
- OR learner has scheduled exam within 14 days

**Action:** Time-pressured mixed practice; high-yield topic review; mock exam recommendation.

## 3. Ranking Algorithm

Each candidate intervention receives a priority score:

```
priorityScore =
  baseUrgency (50 for Tier 1, 40 for Tier 2, 30 for Tier 3, 20 for Tier 4, 15 for Tier 5)
  + accuracyGap (max(0, 85 - accuracy))
  + instabilityPenalty (max(0, 60 - stability))
  - recencyDecay (2 × days_since_last_attempt, capped at 20)
  + examProximity (max(0, 30 - days_until_exam) / 2)
  - recurrencePenalty (5 per prior recommendation on same topic, capped at 15)
```

## 4. Study Priority Queue

Ordered list of the learner's next best actions:

```
[
  { action: "Recover budgeting fundamentals", priority: 92, topic: "Budget development", type: "remediation" },
  { action: "Stabilize cost behavior", priority: 78, topic: "Cost behavior", type: "consolidation" },
  { action: "Challenge on COSO", priority: 45, topic: "Internal controls", type: "challenge" }
]
```

## 5. Feature Flag

Gated behind `ENABLE_READINESS_SCORING` (default: `false`).

## 6. Deliverable

`may-intervention-prioritizer.js` — IIFE module exposing `MayInterventionPrioritizer.rank()`.
