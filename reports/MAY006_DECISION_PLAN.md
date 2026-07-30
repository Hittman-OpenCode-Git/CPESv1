# MAY-006 — Decision Plan

**Session:** MAY-006 — Adaptive Coaching Orchestrator
**Governance:** Light Lane (coaching layer — no pack/case/content impact)
**Status:** Active
**Date:** 2026-07-30

---

## 1. Purpose

Define the deterministic decision hierarchy that selects a single coaching action from the learner's state. Every decision is traceable to specific evidence in the learner profile.

---

## 2. Decision Hierarchy (Ordered by Priority)

### D1 — Critical Remediation (Readiness < 50)

**Trigger:** `readiness.readinessScore < 50` OR `readiness.band === 'Recovery needed'`
**Action:** `remediation`
**Mode:** `QUIZ`
**Rationale:** "Overall readiness is critically low. Priority is rebuilding fundamentals."
**Evidence:** readinessScore, band, topicsAtRecovery count

### D2 — High-Priority Weakness

**Trigger:** Interventions queue contains a Tier 1 (CRITICAL_REMEDIATION) item
**Action:** `remediation`
**Mode:** `QUIZ`
**Topic:** `intervention.topAction.topic`
**Rationale:** "Critical weakness detected in [topic] — accuracy below threshold with declining trend."
**Evidence:** intervention.accuracy, intervention.direction, intervention.stability

### D3 — Repeated Weakness with Instability

**Trigger:** Weaknesses exist AND stability < 50 AND attempts ≥ 5 AND direction is declining
**Action:** `socratic`
**Mode:** `SOCRATIC`
**Topic:** Weakest topic by accuracy
**Rationale:** "Repeated errors on [topic] with unstable performance suggest process-level misunderstanding."
**Evidence:** accuracy, stability, direction, attempts

### D4 — Exam Approaching with Gaps

**Trigger:** `examPlan.daysUntilExam ≤ 30` AND readiness band is 'Developing' or 'Recovery needed'
**Action:** `study_plan`
**Mode:** `STUDY_PLAN`
**Rationale:** "Exam is [N] days away. Focused review with high-yield topics."
**Evidence:** daysUntilExam, readinessScore, topicsAtRecovery

### D5 — Declining Topic Trends

**Trigger:** Profile has decliningTopics with ≥ 1 entry
**Action:** `remediation`
**Mode:** `QUIZ`
**Topic:** First declining topic
**Rationale:** "Performance on [topic] is declining — intervene before gap widens."
**Evidence:** decliningTopics list, delta values

### D6 — Emerging Weakness

**Trigger:** Interventions queue contains a Tier 2 (EMERGING_WEAKNESS) item
**Action:** `quiz`
**Mode:** `QUIZ`
**Topic:** `intervention.topAction.topic`
**Rationale:** "Emerging weakness on [topic] — targeted practice to correct trajectory."
**Evidence:** accuracy, direction, attempts

### D7 — Fragile Knowledge

**Trigger:** Interventions queue contains a Tier 3 (FRAGILE_KNOWLEDGE) item
**Action:** `explain`
**Mode:** `EXPLAIN`
**Topic:** `intervention.topAction.topic`
**Rationale:** "Knowledge on [topic] is usable but unreliable — consolidation needed."
**Evidence:** stability, accuracy, direction

### D8 — Section Coverage Gap

**Trigger:** Fewer than 4 sections with sufficient data (from readiness.perSection)
**Action:** `exploratory`
**Mode:** `EXPLAIN`
**Rationale:** "Section coverage is incomplete. Explore topics across the blueprint."
**Evidence:** perSection band distribution, topicsWithData count

### D9 — High Mastery

**Trigger:** Strengths exist with accuracy ≥ 85% AND attempts ≥ 6
**Action:** `challenge`
**Mode:** `QUIZ`
**Topic:** Strongest topic
**Rationale:** "Strong performance on [topic] — challenge with advanced content."
**Evidence:** accuracy, attempts, stability

### D10 — Insufficient Data (Fallback)

**Trigger:** None of the above match
**Action:** `exploratory`
**Mode:** `EXPLAIN`
**Rationale:** "More practice data is needed before adaptive coaching can personalize recommendations."
**Evidence:** session count, topic count, dataSufficiency

---

## 3. Decision Output Schema

```json
{
  "decisionId": "D1 | D2 | ... | D10",
  "action": "remediation | quiz | socratic | study_plan | challenge | explain | exploratory",
  "coachingMode": "EXPLAIN | QUIZ | SOCRATIC | STUDY_PLAN",
  "priority": "critical | high | medium | low",
  "topic": "topic_name | null",
  "rationale": "Human-readable reason for this decision",
  "evidence": {
    "readinessScore": 42,
    "accuracy": 58,
    "direction": "declining",
    "stability": 35,
    "daysUntilExam": 21,
    "triggeringRule": "D5"
  },
  "_meta": {
    "decisionEngineVersion": "MAY006-1.0",
    "computedAt": "ISO8601"
  }
}
```

---

## 4. Priority Tiers (for Coaching Action)

| Priority | Meaning | Coaching Urgency |
|----------|---------|-----------------|
| `critical` | Learner safety / fundamental gap | Immediate, untimed, recovery mode |
| `high` | Significant weakness or exam pressure | Next session priority |
| `medium` | Fragile knowledge or emerging issue | Within next 2-3 sessions |
| `low` | Maintenance or challenge | Optional, learner-directed |

---

## 5. Coaching Mode → Decision Mapping

| Coaching Mode | Triggered By Decisions | Learner Experience |
|--------------|----------------------|-------------------|
| `EXPLAIN` | D7, D8, D10 | Concept walkthrough, explicit instruction |
| `QUIZ` | D1, D2, D5, D6, D9 | Targeted question sets, immediate feedback |
| `SOCRATIC` | D3 | Guided questioning, progressive hint disclosure |
| `STUDY_PLAN` | D4 | Structured study roadmap with time estimates |

---

## 6. Determinism Guarantees

1. **Tie-breaking:** When two triggers match (e.g., D2 + D5), the lower-numbered decision wins (higher priority).
2. **Same inputs → same output:** The decision engine is fully deterministic — no randomness, no external state.
3. **Monotonic priority:** Decisions are evaluated in order D1 → D10. The first match returns immediately.
4. **Degradation:** If readiness/intervention data is unavailable, skip to the first decision that can be evaluated with available data.

---

## 7. Edge Cases

| Scenario | Behavior |
|----------|----------|
| No learner data at all | Return `null` |
| Zero sessions | D10 — exploratory mode |
| All flags off | Return `null` |
| Only profile available, no readiness | Skip D1/D4/D8; evaluate D2-D3-D5-D6-D7-D9-D10 |
| Profile has all "Not enough data" bands | D10 |
| Readiness > 80, no weaknesses, no exam | D9 — challenge mode |
| Exam is tomorrow | D4 trumps all except D1/D2 |
