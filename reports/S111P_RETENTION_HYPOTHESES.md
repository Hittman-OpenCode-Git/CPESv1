# S111P — Retention Hypotheses

**Session:** 111P
**Governance Lane:** Light (Read-Only)
**Date:** 2026-07-31
**Status:** Active
**Depends On:** S111P_IMPROVEMENT_MODEL.md, S111P_RECOVERY_PATTERNS.md

---

## 1. Purpose

Formulate testable hypotheses about knowledge retention and decay in the CMA Part 1 Exam Simulator. These hypotheses bridge the gap between what the simulator measures (per-session accuracy) and what it needs to understand (how long learning lasts, when to re-practice, what spacing produces durable knowledge).

---

## 2. The Retention Problem

### 2.1 What Retention Means in This Context

A learner achieves 85% accuracy on Topic T in Session N. In Session N+K, without additional practice on Topic T in between, 85% is the "retained" accuracy. The difference between 85% and the actual Session N+K accuracy is the decay.

```
Retention Rate = Accuracy(Session N+K on Topic T) / Accuracy(Session N on Topic T)

where no Topic T practice occurred between sessions N and N+K.
```

### 2.2 Why Retention Matters

The simulator currently:
- Tracks "mastered" topics (accuracy ≥ 80%, recent ≥ 80%, stability ≥ 75)
- But does NOT track how long mastery lasts without practice
- Does NOT recommend re-practice intervals
- Does NOT warn when a previously-mastered topic has decayed

A learner could "master" Cost Management in Session 10, not practice it for 3 weeks, and face it on exam day at 55% accuracy — believing they're still at 85%.

---

## 3. Hypothesized Decay Curves

### 3.1 Ebbinghaus-Style Forgetting Curve (Adapted for CMA Content)

```
R(t) = R_0 * e^(-λ * t)

where:
  R(t)  = retained accuracy at time t
  R_0   = initial accuracy (at time of mastery)
  λ     = decay rate (topic-specific)
  t     = time since last practice (days)
```

### 3.2 Decay Rate by Topic Type

| Topic Type | Hypothesized λ (daily decay) | Half-Life (days to 50% retention) | 80% Retention Window (days) |
|------------|------------------------------|-----------------------------------|---------------------------|
| Definitional (e.g., COSO component names) | 0.015 | 46 days | ~15 days |
| Conceptual (e.g., budgeting philosophy) | 0.010 | 69 days | ~22 days |
| Calculation (e.g., variance formulas) | 0.008 | 87 days | ~28 days |
| Integrated/Case (e.g., financial analysis) | 0.005 | 139 days | ~45 days |

**Rationale:** Definitional knowledge decays fastest (rote memory without conceptual anchors). Calculation procedural knowledge decays slower (the formula is forgotten but the reasoning pattern is retained). Integrated knowledge decays slowest (multiple retrieval paths reinforce each other).

### 3.3 Counter-Hypothesis: Calculation Decays Faster

**Alternative hypothesis:** Formulas are brittle — one wrong step and the entire answer is wrong. Conceptual knowledge is resilient — partial recall still produces decent accuracy.

If this alternative is true:
- λ_calculation > λ_conceptual > λ_definitional
- The simulator's existing data can resolve this (measure actual decay per topic type)

---

## 4. Spacing Effect Hypotheses

### 4.1 Optimal Re-Practice Interval

```
For a topic mastered in Session N:
  Optimal first re-practice: at ~80% retention point
  Optimal second re-practice: at ~80% retention point after first re-practice
  ...
```

**Hypothesis H-S1:** Re-practicing a topic at its 80% retention point produces 3× longer subsequent retention than re-practicing at 95% (too early, wasted effort) or 60% (too late, re-learning required).

### 4.2 Spacing Schedule by Topic Type

| Topic Type | First Re-Practice | Second Re-Practice | Third Re-Practice |
|------------|-------------------|-------------------|-------------------|
| Definitional | Day 3 | Day 8 | Day 20 |
| Conceptual | Day 5 | Day 14 | Day 35 |
| Calculation | Day 7 | Day 21 | Day 50 |
| Integrated | Day 10 | Day 30 | Day 70 |

**Hypothesis H-S2:** A learner following this spaced schedule achieves durable mastery (retention > 90% at Day 90) with 4 total exposures, vs. 8+ exposures with massed practice.

### 4.3 Interleaving Effect

**Hypothesis H-S3:** Alternating between 2–3 different topics within a session produces better long-term retention than blocking (all Topic A, then all Topic B). This is the interleaving effect, well-documented in motor skill learning but less studied in accounting education.

**Test:** Compare 30-day retention for learners who do topic-blocked sessions vs. mixed-topic sessions.

---

## 5. Confidence and Retention

### 5.1 The Confidence-Retention Mismatch

**Hypothesis H-C1:** Learners overestimate retention. After 7 days without practice, self-rated confidence on a topic will still be 4/5, but actual accuracy will have dropped from 85% to 65%.

**Measurement:** When a topic re-appears in a session after a gap:
- Record pre-question confidence (first question on the topic)
- Compare to actual accuracy on the topic during that session
- Compute the retention-overconfidence gap

### 5.2 Calibration as a Retention Predictor

**Hypothesis H-C2:** Well-calibrated learners (calibrationDelta < 0.5) show less retention decay than overconfident learners. Metacognitive accuracy correlates with study strategy quality, which in turn protects knowledge.

**Test:** Compare retention rates for learners with calibrationDelta < 0.5 vs. > 0.8.

---

## 6. Practice Mode and Retention

### 6.1 Active Retrieval vs. Passive Review

**Hypothesis H-M1:** Recovery Sprints (active retrieval under time pressure) produce 1.5× longer retention than re-reading explanations in the coach view (passive review). The testing effect applies: the act of retrieving strengthens the memory trace more than re-studying.

**Test:** Compare 14-day retention for topics practiced via recovery sprint vs. topics re-studied via May coaching view (requires explanation engagement instrumentation for the comparison group).

### 6.2 MCQ vs. Case Study Retention

**Hypothesis H-M2:** Case study practice produces longer retention than MCQ practice for the same topic, because cases require multi-step reasoning that builds stronger (more interconnected) memory traces.

**Test:** Compare retention for topics practiced primarily via case study items vs. primarily via MCQ items.

### 6.3 Difficulty and Retention

**Hypothesis H-M3:** Practicing at Difficult preset produces 1.2× longer retention than practicing at Easy preset on the same topic. Desirable difficulty — the extra cognitive effort during practice strengthens encoding.

**Test:** Compare retention rates for topics practiced at Easy vs. Difficult difficulty presets.

---

## 7. Retention Measurement Framework

### 7.1 What We Can Measure TODAY

Using MayLearnerState per-attempt data:

```
For each (learner, topic):
  1. Identify mastery point: first session where accuracy >= 80%
  2. Identify next exposure: next session containing any attempt on this topic
  3. Compute gap: days between mastery point and next exposure
  4. Compute retention: accuracy at next exposure / accuracy at mastery point
  5. Plot: retention vs. gap (for all topic occurrences across all learners)
```

### 7.2 What We Cannot Measure TODAY

- **True retention** (without intervening practice): If the learner practices the topic between mastery and the "next exposure" point, we're measuring re-learning, not pure retention. MayLearnerState does track per-attempt timestamps, so we CAN filter to "only exposures where no intervening practice occurred."
- **Within-session retention:** Whether performance declines from the start of a session to the end (fatigue).
- **Cross-domain transfer:** Whether mastering Cost Management improves Financial Reporting accuracy (shared underlying skills). Hard to isolate from general improvement.

### 7.3 Decay Rate Estimation Algorithm

```python
def estimate_decay_rate(learner_id, topic):
    attempts = get_attempts(learner_id, topic)  # sorted by timestamp
    
    decay_events = []
    for i in range(1, len(attempts)):
        prev = attempts[i-1]
        curr = attempts[i]
        
        # Filter: only consider events where accuracy was high at prev
        # and no intervening practice on this topic
        if prev.accuracy >= 0.75 and gap_clean(prev, curr):
            t_gap = (curr.timestamp - prev.timestamp).days
            retention = curr.accuracy / prev.accuracy
            decay_events.append((t_gap, retention))
    
    # Fit exponential decay: R(t) = e^(-λ * t)
    # log(R) = -λ * t
    # λ = -mean(log(R) / t)
    
    if decay_events:
        λ = -sum(log(r) / t for t, r in decay_events) / len(decay_events)
        return λ
    return None
```

---

## 8. Retention-Based May Coaching

### 8.1 Re-Practice Reminder

When MayLearnerState detects that 80% of the retention window has elapsed:

```
May: "You mastered Cost Management 22 days ago. 
      Your predicted accuracy has dropped from 85% to ~68%. 
      Schedule a review session this week to refresh."
```

### 8.2 Decay Alert

When MayLearnerState detects that accuracy on a previously-mastered topic has dropped below 70%:

```
May: "Cost Management accuracy: 85% → 62%. 
      You've lost ground on this topic. 
      Launch a recovery sprint to rebuild before it drops further."
```

### 8.3 Pre-Exam Retention Audit

2 weeks before a learner's scheduled exam date (if set in exam plan):

```
May: "Pre-Exam Retention Audit:
      ✓ Financial Reporting — 84% (practiced 3 days ago)
      ✗ Cost Management — 71% (last practiced 18 days ago, decayed from 88%)
      ⚠ Internal Controls — 79% (last practiced 9 days ago, approaching decay threshold)
      
      Priority: Re-practice Cost Management this week."
```

---

## 9. Research Questions

| ID | Question | Data Required | Testable Today? |
|----|----------|--------------|----------------|
| H-R1 | What is the actual decay rate for calculation vs. conceptual topics? | MayLearnerState per-attempt timestamps + correctness | YES |
| H-R2 | Does spacing (2 sessions/week) beat massing (1 long session/week)? | Session history timestamps + per-topic accuracy | YES |
| H-R3 | Does confidence calibration predict retention? | calibrationDelta + decay events | YES |
| H-R4 | Do recovery sprints produce stickier learning than regular practice? | Sprint sessions + per-topic accuracy trends | PARTIAL (topicSummary string needed) |
| H-R5 | What is the retention half-life for a "mastered" topic (≥80% accuracy)? | Decay estimation algorithm on mastered topics | YES |
| H-R6 | Does interleaving (mixed topics) improve retention over blocking? | Session topic composition + long-term accuracy | YES (compute topic diversity per session) |
| H-R7 | Does case study practice transfer to MCQ performance on the same topic? | Case session accuracy + subsequent MCQ topic accuracy | YES |

---

## 10. Retention Model Integration

### 10.1 Into ReadinessModel

The current ReadinessModel considers only session-level scores. A retention-aware model would:

- Weight recent sessions by recency (exponential decay weight)
- Penalize topics not practiced in the last N days
- Adjust readiness band for "stale mastery" (mastered but not recently practiced)

### 10.2 Into MayLearnerState

Add to topicPerformance:

```javascript
topicPerformance[topic] = {
    // existing fields...
    masteryAchievedAt: ISO8601 | null,    // when accuracy first hit 80%
    decayRate: number | null,             // estimated λ
    retentionHalfLife: number | null,     // days to 50% retention
    predictedCurrentAccuracy: number | null,  // R_0 * e^(-λ * days_since_last_practice)
    nextReviewRecommended: ISO8601 | null // date when accuracy predicted to hit 75%
}
```

### 10.3 Into May Recommendations

Rank re-practice recommendations by:
- `urgency = mastery_accuracy - predicted_current_accuracy` (how much has been lost)
- Weighted by topic weight on the CMA exam (Financial Reporting matters more than Technology)
- Weighted by learner's exam date proximity (more urgent as exam approaches)

---

## 11. Key Metrics for Retention Monitoring

| Metric | Description | Healthy Range | Warning Threshold |
|--------|-------------|--------------|-------------------|
| Avg retention at 7 days | Mean accuracy ratio (now/before) after 7-day gap | 0.85–0.95 | < 0.75 |
| Avg retention at 30 days | Mean accuracy ratio after 30-day gap | 0.70–0.85 | < 0.60 |
| Decay rate (λ) — calculation topics | Estimated daily decay | < 0.008 | > 0.015 |
| Decay rate (λ) — conceptual topics | Estimated daily decay | < 0.010 | > 0.018 |
| Mastery persistence | % of mastered topics still ≥80% after 14 days no practice | > 70% | < 50% |
| Re-practice compliance | % of May "re-practice" recommendations acted on | > 40% | < 20% |

---

_Version 1.0 — Session 111P Retention Hypotheses_
