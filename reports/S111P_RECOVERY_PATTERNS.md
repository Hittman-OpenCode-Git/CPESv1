# S111P — Recovery Patterns

**Session:** 111P
**Governance Lane:** Light (Read-Only)
**Date:** 2026-07-31
**Status:** Active
**Depends On:** S111P_IMPROVEMENT_MODEL.md, S111P_STUDY_BEHAVIOR_ANALYSIS.md

---

## 1. Purpose

Analyze the Recovery Sprint subsystem as a learner behavior and quantify its hypothesized effect on improvement. This document maps the recovery journey from queue generation through sprint completion to downstream improvement.

---

## 2. Recovery Subsystem Architecture (Current State)

### 2.1 Queue Generation (app.js:2480)

```
AdaptiveReviewQueue.generate(session)
    │
    ├─→ Iterates all MCQs + case items from completed session
    ├─→ Priority score per item:
    │     +5: Incorrect
    │     +3: Guessed
    │     +2: Confidence ≤ 2
    │     +1: Flagged
    │     +0: Confident correct (confidence ≥ 4 AND correct)
    ├─→ Sorts descending by score
    └─→ Returns queue[]
```

### 2.2 Sprint Launch (app.js:2408)

```
Recovery Sprint start:
    ├─→ Filters queue to MCQs only
    ├─→ Takes top 15 by score
    ├─→ Allocates 108 seconds per item (= 27 minutes for 15)
    ├─→ Creates new session with mode='recovery_sprint'
    ├─→ Stores recoverySource metadata:
    │     sessionId, topicSummary, itemCount
    └─→ Launches exam session flow
```

### 2.3 Sprint Completion

```
Recovery Sprint completed:
    ├─→ saveHistory() stores sprint as a regular session
    │     with recoverySource populated
    ├─→ MayTelemetry.trackAdoption() logs:
    │     recommendationType: 'Recovery Sprint'
    │     tag: itemCount ≥ 10 ? 'Full Sprint' : 'Partial Sprint'
    └─→ Sprint score flows into ReadinessModel.compute()
```

### 2.4 What's Not Measured

| Missing | Impact |
|---------|--------|
| Queue QID list not persisted | Cannot verify sprint covered the intended items |
| Sprint completion vs. abandonment | Cannot compute completion rate except by checking if sprint session exists in history with scaledScore |
| Sprint score delta (pre vs. post) | Cannot compare source session topic accuracy to sprint topic accuracy |
| Topic-specific recovery count | Cannot answer: "How many sprints did Topic T require before reaching 80%?" |
| Sprint within-sprint patterns | Cannot analyze: do learners improve within a sprint (item 1 vs. item 15)? |

---

## 3. Recovery Journey Model

### 3.1 The Recovery Cycle

```
Session N (Source)
    │
    ├─→ Topic T accuracy: 45%
    ├─→ Items missed on Topic T: 3
    │
    ▼
Recovery Queue Generated
    │
    ├─→ Priority score for Topic T items:
    │     Q1: +5 (wrong) + 0 (not guessed) + 2 (low confidence) = 7
    │     Q2: +5 + 0 + 0 = 5
    │     Q3: +5 + 3 + 0 = 8
    │
    ▼
Recovery Sprint Launched
    │
    ├─→ Covers Topic T items (among others)
    ├─→ Learner answers: Q1 correct, Q2 correct, Q3 wrong
    ├─→ Sprint Topic T accuracy: 66.7% (improved from 45%)
    │
    ▼
Session N+1 (Post-Recovery)
    │
    ├─→ Topic T accuracy: 58% (partial retention)
    ├─→ Recovery Queue includes Topic T items again (Q3 still missed)
    │
    ▼
Session N+2 (Second Recovery)
    │
    ├─→ Topic T accuracy: 72% (approaching mastery)
    ├─→ Recovery Queue: Topic T items dropping (fewer missed)
    │
    ▼
Session N+K
    │
    ├─→ Topic T accuracy: 84% (mastered)
    ├─→ Recovery Queue: zero Topic T items
    └─→ MayLearnerState marks Topic T as "Ready for focused review"
```

### 3.2 Recovery Dosage Model

The "dosage" of recovery on a topic is:

```
D(topic, session) = count of sprint sessions containing topic T * items_per_sprint

Effective dosage: items answered correctly during sprints on topic T.
Ineffective dosage: items answered incorrectly — indicates need for deeper review, not just more sprints.
```

**Hypothesis:** 5–8 correctly answered recovery items on a topic predict mastery (≥80% accuracy) within 2 subsequent sessions.

### 3.3 Recovery Resistance

A topic is "recovery-resistant" if:

```
sprints_targeting_topic >= 3 AND topic_accuracy < 60%
```

Recovery-resistant topics need a different intervention (May should escalate):
- Concept video / textbook review instead of more MCQs
- May deep-dive explanation mode instead of more sprint items
- Peer discussion or instructor help (not available in simulator today)

---

## 4. Hypothesized Recovery Effectiveness

### 4.1 Dose-Response Curve

```
Topic Accuracy Improvement vs. Recovery Sprint Count
─────────────────────────────────────────────────────
Accuracy
 100% │                                    ........
      │                              ......
  90% │                        ......
      │                  ......
  80% │            ......  ← Mastery threshold
      │      ......
  70% │ ......
      │..
  60% ├────────────────────────────────────────────
      0    1    2    3    4    5    6    7    8
              Recovery Sprints Targeting Topic

Expected shape: Logistic (S-curve)
  - Sprint 0→1: Small gain (orientation to weak area)
  - Sprint 1→3: Steep gain (active retrieval + feedback)
  - Sprint 3→5: Diminishing returns (most items now correct)
  - Sprint 5+: Plateau (remaining errors are deep misconceptions)
```

### 4.2 Hypothesized Effect by Topic Type

| Topic Type | Expected Sprints to Mastery | Per-Sprint Accuracy Gain |
|------------|---------------------------|-------------------------|
| Definitional | 1–2 | +15–20% |
| Conceptual | 2–4 | +10–15% |
| Calculation | 3–6 | +8–12% |
| Integrated/Case | 4–8 | +5–10% |

### 4.3 Recovery Sprint vs. Passive Review

**Hypothesis:** A completed Recovery Sprint produces 1.5–2.5× more topic accuracy improvement than a regular practice session covering the same topic, because:
1. Sprint items are targeted (not random sampling)
2. Sprint time is pre-allocated (not self-paced)
3. Sprint mode signals "this is important" (metacognitive priming)

---

## 5. Recovery Pattern Archetypes

### 5.1 The Sprinter

**Behavior:** Launches and completes recovery sprints after most sessions.
**Signal:** recoverySource populated in 60%+ of sessions, Full Sprint tag most common.
**Expected outcome:** Fastest improvement velocity. High sprint completion rate. Topic mastery in 2–4 sprints.

### 5.2 The Dabbler

**Behavior:** Launches sprints but rarely completes them (or completes Partial Sprints only).
**Signal:** recoverySource populated in sessions but sprint session scores are low or sprint sessions are short. Partial Sprint tag common.
**Expected outcome:** Minimal improvement from recovery. Sprints drain time without benefit.

### 5.3 The Avoider

**Behavior:** Never launches recovery sprints, even when May recommends them.
**Signal:** recoverySource never populated despite readiness band BELOW_TARGET or APPROACHING_TARGET.
**Expected outcome:** Slowest improvement velocity. High plateau risk.

### 5.4 The Over-Recoverer

**Behavior:** Launches recovery sprints after every session, even when readiness band is AT_TARGET or ABOVE_TARGET. Sprint items are already at 70%+ accuracy.
**Signal:** recoverySource populated almost every session, even Ace-level sessions.
**Expected outcome:** Diminishing returns. Time spent on recovery could be better spent on full-exam simulation or new topics. Risk of over-training familiar items.

---

## 6. Recovery Queue Quality Analysis

### 6.1 Queue Composition by Priority Score

For a BELOW_TARGET session with 100 MCQs:

| Priority Score | Meaning | Hypothesized % of Queue | Effectiveness per Item |
|---------------|---------|------------------------|----------------------|
| 8+ | Wrong + low confidence + guessed | 5% | HIGHEST |
| 7 | Wrong + low confidence | 15% | HIGH |
| 5–6 | Wrong + guessed OR wrong only | 35% | MEDIUM |
| 3–4 | Guessed + low confidence (but correct) | 15% | MEDIUM-LOW |
| 2 | Low confidence only (but correct) | 10% | LOW |
| 1 | Flagged only (but correct + confident) | 20% | LOWEST |

### 6.2 Queue Topic Diversity Problem

The recovery queue is generated from a single session. If the session was MCQ-only Section D (Cost Management), the entire queue is Cost Management items. The learner gets no recovery on other weak topics.

**Recommendation:** Cross-session queue merging — combine queue items from the last 3 sessions to ensure topic diversity in sprints.

### 6.3 Queue Size Stability

Queue size varies dramatically by session performance:
- Excellent session (85% accuracy): ~15 items
- Average session (65% accuracy): ~35 items
- Poor session (45% accuracy): ~55 items

The sprint always takes exactly 15 items (top by priority). Poor sessions generate a 55-item queue but only 15 are used — 40 items are discarded.

**Recommendation:** Multi-sprint queuing — allow a second sprint (next 15 items) without requiring an intervening session.

---

## 7. Recovery Optimization Hypotheses

### H-R1: Sprint Size Optimization

**Hypothesis:** 15 items is suboptimal for some topics. Calculation-heavy topics benefit from smaller sprints (8–10 items) with longer per-item time. Definitional topics benefit from larger sprints (20 items) with shorter per-item time.

**Test:** Vary sprint size by topic composition and measure per-sprint accuracy gain.

### H-R2: Sprint Spacing Effect

**Hypothesis:** Two sprints of 10 items on consecutive days produce better retention than one sprint of 20 items. The spacing effect applies to recovery.

**Test:** Compare retention (accuracy on next regular session) for spaced vs. massed recovery.

### H-R3: Difficulty Calibration in Sprints

**Hypothesis:** Recovery sprints should use the same difficulty preset as the source session. Using an easier preset inflates sprint scores without genuine learning.

**Test:** Compare post-sprint topic accuracy for same-difficulty vs. easier-difficulty sprints.

### H-R4: Explanation Engagement in Sprints

**Hypothesis:** Sprint items where the learner views the distractor explanations produce 2× retention compared to sprint items where the learner skips the review.

**Test:** Track explanation view time per sprint item (requires new instrumentation).

### H-R5: Recovery Sprint vs. Regular Session on Same Topic

**Hypothesis:** A 15-item recovery sprint produces equivalent topic accuracy improvement to a 30-item regular session mixing the same topic with other topics. Recovery is ~2× more efficient per item.

**Test:** Compare per-item accuracy gain for recovery sprint items vs. same-topic items in regular sessions.

---

## 8. Recovery Analytics Dashboard (Proposed)

A future dashboard view showing:

```
┌─ Recovery Sprint Effectiveness ──────────────────────────┐
│                                                           │
│  Total Sprints: 12    Completed: 9    Completion Rate: 75% │
│                                                           │
│  Topics Recovered:                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Cost Management      45% → 72%   4 sprints  ✓    │    │
│  │ Internal Controls    52% → 68%   3 sprints  →    │    │
│  │ Financial Reporting  38% → 44%   2 sprints  ✗    │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  Best Sprint: Session 8 (+18 points on Cost Management)   │
│  Recovery Velocity: +6.2 pts / sprint                     │
│                                                           │
│  May says: "You're recovering fastest on calculation      │
│  topics. Try a recovery sprint on Financial Reporting     │
│  — your weakest topic that hasn't had a sprint yet."      │
└───────────────────────────────────────────────────────────┘
```

---

## 9. Key Research Questions (Unanswered)

| Question | Data Required | Currently Available? |
|----------|--------------|---------------------|
| Q-R1: Does sprint completion predict band improvement? | Sprint sessions in history + readiness bands | YES |
| Q-R2: What is the optimal sprint frequency? | Sprint spacing + accuracy trajectories | YES (compute from timestamps) |
| Q-R3: Do sprints on calculation topics take more attempts? | Sprint topic composition + per-topic accuracy trends | PARTIAL (topicSummary is string, not structured) |
| Q-R4: What % of launched sprints are completed? | Sprint sessions with recoverySource + non-null scaledScore | YES |
| Q-R5: Does within-sprint accuracy improve from item 1 to item 15? | Per-item correctness within sprint session | NO (sprint session uses same ephemeral answers as regular session) |
| Q-R6: Do learners who review sprint results improve faster? | Post-sprint coach view engagement time | NO (not instrumented) |

---

## 10. Minimum Viable Recovery Analytics (Can Build Today)

Using only `cmaP1History2026` and `cmaMayLearnerState`:

### Analysis 1: Sprint Completion Rate
```
For each learner:
  totalSprints = count(sessions where recoverySource !== null)
  completedSprints = count(sessions where recoverySource !== null AND scaledScore !== null)
  completionRate = completedSprints / totalSprints
```

### Analysis 2: Sprint Effectiveness
```
For each learner:
  For each sprint session S:
    sourceSession = find session before S with no recoverySource
    nextSession = find first non-sprint session after S
    
    delta = nextSession.scaledScore - sourceSession.scaledScore
    
  avgEffectiveness = mean(delta across sprints)
```

### Analysis 3: Recovery Velocity
```
For each learner, for each topic T:
  sprintCount = count of sprint sessions since first exposure to T
  accuracyBefore = mean accuracy on T in 2 sessions before first sprint
  accuracyAfter = mean accuracy on T in 2 sessions after most recent sprint
  
  recoveryVelocity = (accuracyAfter - accuracyBefore) / sprintCount
```

---

_Version 1.0 — Session 111P Recovery Patterns_
