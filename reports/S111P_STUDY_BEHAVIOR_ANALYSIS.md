# S111P — Study Behavior Analysis

**Session:** 111P
**Governance Lane:** Light (Read-Only)
**Date:** 2026-07-31
**Status:** Active
**Depends On:** S111P_LEARNER_JOURNEY_PLAN.md

---

## 1. Purpose

Map every existing data collection point in the simulator to the behavioral signal it can produce, assess signal quality, and identify what behaviors the system CAN currently measure vs. what it COULD measure with minor instrumentation additions.

---

## 2. Behavioral Signal Catalog

### 2.1 Engagement Signals

| Signal | Data Source | Signal Strength | Measurement Window |
|--------|------------|-----------------|-------------------|
| Session frequency | saveHistory() timestamps | HIGH — precise ISO8601 | Cross-session |
| Session duration | session.duration | HIGH — seconds elapsed | Per-session |
| Avg time per question | AnalyticsCollector.getSummary().avgTimePerQuestion | MEDIUM — cumulative, not per-QID in history | Per-session |
| Post-session review time | ReviewCoach engagement (not instrumented separately) | LOW — no dedicated timer | Per-session |
| May chat engagement | May context state (per-session, not persisted) | LOW — ephemeral | Per-session |
| Explanation view time | Not instrumented | **ABSENT** | N/A |
| Coach view dwell time | Not instrumented | **ABSENT** | N/A |

### 2.2 Performance Signals

| Signal | Data Source | Signal Strength | Measurement Window |
|--------|------------|-----------------|-------------------|
| Scaled score (0–500) | saveHistory().scaledScore | HIGH | Per-session |
| MCQ accuracy % | saveHistory().mcqPct | HIGH | Per-session |
| CBQ accuracy % | saveHistory().casePct | HIGH | Per-session |
| MCQ Gate pass | saveHistory().mcqGate | HIGH | Per-session |
| Per-topic accuracy | saveHistory().topicSnapshot | HIGH | Per-session |
| Per-topic accuracy trend | MayLearnerState.getTrends() | HIGH — derived from per-attempt data | Cross-session |
| Per-topic stability | MayLearnerState.getTrends().stability | MEDIUM — IQR-based, sensitive to small samples | Cross-session |
| Case miss-pattern | saveHistory().casePatterns | MEDIUM — 5 categories, may overlap | Per-session |
| Difficulty-tier performance | ReadinessModel.compute().diffAverages | MEDIUM — computed for band decision only | Cross-session |

### 2.3 Metacognitive Signals

| Signal | Data Source | Signal Strength | Measurement Window |
|--------|------------|-----------------|-------------------|
| Confidence rating (1-5) | session.confidence[QID] | HIGH — per question | Per-question (ephemeral) |
| Confidence calibration delta | MayLearnerState.getConfidenceCalibration() | HIGH — topic-aggregated | Cross-session |
| Overconfidence rate | getConfidenceCalibration().overconfidentRate | HIGH | Cross-session |
| Underconfidence rate | getConfidenceCalibration().underconfidentRate | HIGH | Cross-session |
| Flag/mark rate | session.flags[QID] | MEDIUM — per question | Per-question (ephemeral) |
| Guess rate | session.guessed[QID] | LOW — learner self-reports | Per-question (ephemeral) |
| Hint usage | MayLearnerState per-attempt hintsUsed | MEDIUM — only when May coaching active | Per-attempt |
| Explanation requested | MayLearnerState per-attempt explanationRequested | MEDIUM — only when May active | Per-attempt |

### 2.4 Recovery Signals

| Signal | Data Source | Signal Strength | Measurement Window |
|--------|------------|-----------------|-------------------|
| Sprint launched | saveHistory().recoverySource !== null | HIGH | Per-session |
| Sprint item count | recoverySource.itemCount | HIGH | Per-session |
| Sprint mode (Full/Partial) | MayTelemetry.trackAdoption() | MEDIUM — telemetry only | Per-sprint |
| Sprint score | saveHistory() for sprint session | HIGH — stored as regular session | Per-sprint |
| Recovery queue size | AdaptiveReviewQueue (in-memory) | **LOW — not persisted** | Per-session |
| Recovery topic composition | recoverySource.topicSummary | MEDIUM — string summary | Per-sprint |

### 2.5 May Interaction Signals

| Signal | Data Source | Signal Strength | Measurement Window |
|--------|------------|-----------------|-------------------|
| Recommendation viewed | MayTelemetry.trackAdoption() | MEDIUM — console-only, no network | Per-view |
| Recommendation adopted | recommendationOutcomes[].completed | MEDIUM — S129 tracking | Cross-session |
| May session review viewed | May.startSessionReview() (no telemetry) | **LOW — not instrumented** | Per-session |
| Coaching mode used | MayTelemetry.trackMode() | **LOW — feature-flagged off** | Per-coaching-event |
| LLM interaction | MayTelemetry (LLM feature-flagged off) | **ABSENT — all LLM gated** | N/A |

---

## 3. Signal Quality Assessment

### 3.1 HIGH-Quality Signals (Reliable, Persistent, Cross-Session)

These signals are stored in localStorage, survive browser restarts, and are reliable for longitudinal analysis:

1. **Session score** (saveHistory) — Persisted to `cmaP1History2026`, up to 100 sessions. Computed with deterministic scoring formula. Excellent longitudinal data source.

2. **Per-topic accuracy** (both stacks) — MayLearnerState has per-attempt granularity; saveHistory has per-session topic snapshots. MayLearnerState is the better source (per-attempt allows time-weighted trends).

3. **Confidence calibration** (MayLearnerState) — Aggregated from per-attempt confidence + correctness. Well-structured for behavioral analysis.

4. **Recovery Sprint metadata** (saveHistory) — recoverySource field marks sprint sessions. Clean boolean signal for sprint effectiveness analysis.

5. **Session frequency** (saveHistory timestamps) — ISO8601 dates allow computing inter-session intervals precisely.

### 3.2 MEDIUM-Quality Signals (Ephemeral or Partially Instrumented)

1. **Confidence per question** — Stored in session state (ephemeral), not persisted to history. Available during the session only. Lost on session completion.

2. **Flagged questions** — Same as confidence — session-scoped, not history-persisted. The count IS tracked by AnalyticsCollector but the QID list is lost.

3. **Time per question** — AnalyticsCollector accumulates timeSpent per QID but only reports avgTimePerQuestion in getSummary(). Per-QID timing data is discarded.

4. **May telemetry** — Console-only, in-memory buffer of 500 events. No persistence across page reloads. Zero data for longitudinal analysis.

5. **Case miss-patterns** — 5-category classification. Useful for directional analysis but categories may overlap (e.g., "calculationSetup" + "exhibitInterpretation").

### 3.3 LOW-Quality Signals (Ephemeral or Not Yet Instrumented)

1. **Recovery Queue contents** — Generated in-memory, never persisted. Cannot analyze what topics the queue contained, only that a sprint was launched.

2. **Post-session engagement** — No timer for coach view, review cards, or May session review. Cannot distinguish a learner who spends 10 minutes reviewing from one who clicks past.

3. **Explanation engagement** — No tracking of whether the learner reads the correct-answer explanation, distractor explanations, or skips both.

4. **May coaching depth** — No tracking of how many May features the learner uses per session, how long they spend in chat, or which coaching modes they engage with.

### 3.4 ABSENT Signals (Not Instrumented At All)

1. **Question revisitation** — Whether a question appears in multiple sessions and how performance changes across exposures. (SEEN_KEY only prevents repeats; doesn't track repeats that DO occur.)

2. **Retention decay** — Time between practice on the same topic and accuracy on next encounter. Not measured because per-attempt data doesn't carry explicit "days since last practice on this topic."

3. **Difficulty progression** — Whether learners follow a structured Easy→Moderate→Difficult progression or jump randomly. saveHistory stores difficultyPreset per session, making this computable.

4. **Fatigue effects** — Whether accuracy declines in the second half of long sessions. Per-attempt timing data exists in MayLearnerState (elapsedMs per attempt) but is not aggregated for fatigue analysis.

5. **Distractor attractiveness** — Which wrong answers learners select. MayLearnerState stores selectedChoice per attempt — this exists but is not analyzed.

---

## 4. Behavioral Chains: What Leads to What

### 4.1 The Recovery Sprint Chain

```
Session Complete
    │
    ├─→ AdaptiveReviewQueue.generate()  [in-memory only — LOST]
    │       Priority score per item
    │
    ├─→ renderSummary() shows sprint bar  [visible]
    │
    ├─→ Learner clicks "Start Recovery Sprint"  [tracked by MayTelemetry]
    │
    └─→ Recovery Sprint session launched  [persisted to history with recoverySource]
            │
            ├─→ 15 MCQs, 108s/item
            ├─→ New session with fresh answers/flags/confidence
            ├─→ Sprint completed → saveHistory()
            │
            └─→ [GAP] No automated comparison of sprint score vs. source session score
                      └─→ Compare manually: source session topic accuracy vs. sprint accuracy
```

**What can we measure today:**
- Whether a sprint was launched (boolean)
- Sprint item count (integer)
- Sprint score (0–500)
- Sprint topic composition (topicSummary string)

**What we cannot measure today:**
- Did the sprint improve the topics it targeted? (Must correlate sprint topicSummary with next session's topicSnapshot — doable but manual.)
- How many sprints does a topic require before accuracy reaches 80%?
- Is a 15-item sprint more effective than a 10-item sprint?

### 4.2 The Confidence Calibration Chain

```
Question Answered
    │
    ├─→ AnalyticsCollector.recordAnswer(qid, correct, confidence, guessed)
    │
    ├─→ May.recordLiveAttempt() → MayLearnerState.recordAttempt()
    │       stores: qid, correct, confidence, timestamp, topic, section
    │
    └─→ [GAP] Per-question confidence NOT persisted to session history
            └─→ Confidence data exists in MayLearnerState only
                    └─→ But session-level confidence metrics not computed
```

**What can we measure today:**
- Per-topic calibration delta (MayLearnerState.getConfidenceCalibration())
- Overconfidence/underconfidence rates per topic

**What we cannot measure today:**
- Confidence calibration trajectory over time (does it improve?)
- Whether calibration improvement precedes score improvement (causal question)
- Per-session confidence snapshot (lost because session.confidence is ephemeral)

### 4.3 The Flag Revisitation Chain

```
Question Flagged
    │
    ├─→ session.flags[QID] = true  [ephemeral]
    ├─→ AnalyticsCollector.recordFlag()  [count only, not QID list]
    │
    └─→ [GAP] Flagged QIDs not persisted to history
            └─→ Cannot determine if flagged questions are revisited
                    └─→ Cannot measure: "Do learners who review flags improve?"
```

**What we can measure today:**
- Flag count per session (from AnalyticsCollector)
- Whether marked-only filter is used in AdaptiveReviewQueue

**What we cannot measure today:**
- Which specific QIDs are flagged
- Whether flagged QIDs appear in subsequent sessions (SEEN_KEY prevents repeats)
- Whether a learner revisits the AdaptiveReviewQueue and reviews flagged items

### 4.4 The Topic Mastery Chain

```
Session N: Topic T accuracy = 45%
Session N+1: Topic T accuracy = 55%
Session N+2: Topic T accuracy = 68%
...
Session N+K: Topic T accuracy >= 80%, recent >= 80%, stability >= 75%
    → MayLearnerState marks T as "Ready for focused review"
```

**What we can measure today:**
- Per-topic accuracy trend direction (improving/declining/stable)
- Per-topic stability score
- Time-weighted recent accuracy

**What we cannot measure today:**
- Sessions-to-mastery: How many sessions does it take to go from <60% to >=80%?
- Spacing effect: Does 2 sessions/week on a topic produce faster mastery than 1?
- Regression rate: How often does a "Ready" topic fall back to "Developing"?

---

## 5. Instrumentation Gaps — Priority Ranking

Ranked by impact on behavioral modeling capability:

| Rank | Gap | Impact | Instrumentation Cost |
|------|-----|--------|---------------------|
| **P1** | Per-session confidence snapshot not in history | Blocks confidence calibration trajectory analysis | Add `confidenceSummary` to saveHistory() output |
| **P2** | Flagged QID list not persisted | Blocks flag revisitation analysis | Add `flaggedQIDs` to saveHistory() output |
| **P3** | Recovery Queue contents not persisted | Blocks queue→sprint→improvement analysis | Log queue QID list to recoverySource |
| **P4** | Post-session engagement time not tracked | Cannot correlate review effort with improvement | Add timer to coach view, review cards, May session review |
| **P5** | Per-QID time not in history | Blocks fatigue and difficulty-pacing analysis | Add `perQIDTiming` to saveHistory() or MayLearnerState |
| **P6** | May telemetry not persisted | Blocks coaching effectiveness analysis | Change MayTelemetry from in-memory buffer to localStorage append |
| **P7** | Explanation engagement not tracked | Cannot distinguish readers from skippers | Add view-tracking to explanation sections |
| **P8** | Distractor selection not analyzed | Losing rich misconception signal | MayLearnerState already stores selectedChoice — just needs analysis layer |

---

## 6. What Behaviors Can We Reliably Measure TODAY

Based on the signal quality assessment, these analyses are possible with current instrumentation:

| Analysis | Data Source | Confidence |
|----------|------------|------------|
| Does session frequency predict improvement? | saveHistory() timestamps | HIGH |
| Does Recovery Sprint count correlate with readiness band transition? | saveHistory() recoverySource + ReadinessModel | HIGH |
| Do difficulty preset choices predict score trajectory? | saveHistory() difficultyPreset | HIGH |
| Does topic diversity predict overall improvement? | saveHistory() topicSnapshot | HIGH |
| Does confidence calibration improve over time? | MayLearnerState per-topic calibration | HIGH |
| Are overconfident learners more likely to plateau? | MayLearnerState calibration + session trend | HIGH |
| What is the average sessions-to-mastery per topic? | MayLearnerState per-topic trends | MEDIUM |
| Do case-study miss patterns cluster by domain? | saveHistory() casePatterns | MEDIUM |
| Does May recommendation adoption predict improvement? | MayLearnerState recommendationOutcomes | MEDIUM |

---

## 7. Analysis-Ready Data Extraction Plan

### 7.1 For Cross-Sectional Analysis (Snapshot)

Extract from `cmaP1History2026` (one row per session):
- session index, date, mode, difficultyPreset
- scaledScore, mcqPct, casePct, mcqGate, passed
- recoverySource (parsed for itemCount, topicSummary)
- topicSnapshot (parsed per-topic)

### 7.2 For Longitudinal Analysis (Per-Learner Trajectory)

Extract from `cmaMayLearnerState` (one row per topic per session window):
- topic, section, subtopic
- current accuracy, recentPct, trend direction, stability
- calibrationDelta, overconfidenceRate, underconfidenceRate
- totalAttempts, lastSeen date

### 7.3 Combined Dataset (Cross-Stack Join)

Join on timestamp proximity (session date ≈ attempt date window):
- Per-session: scaledScore, mcqPct, recoverySource
- Per-topic: accuracy, trend, calibration
- Per-learner: session count, archetype signals

---

_Version 1.0 — Session 111P Study Behavior Analysis_
