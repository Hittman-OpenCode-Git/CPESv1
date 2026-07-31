# S111P — Learner Journey Intelligence & Study Behavior Modeling: Plan

**Session:** 111P
**Date:** 2026-07-31
**Governance Lane:** Light (Read-Only)
**Status:** Active
**Parallel-Safe:** Yes — zero file modifications

---

## 1. Purpose

Define a learner journey intelligence framework that bridges existing measurement subsystems (confidence, readiness, recovery, May coaching) with behavioral modeling to answer the core question: **Which study behaviors produce improvement?**

This is a planning and analytics lane. It does not modify any pack, case, governance rule, recovery queue, certification state, or May logic.

---

## 2. Context: What We Already Measure

The simulator already collects extensive learner data across two parallel stacks:

### 2.1 App.js Stack (SessionPersistence + ReadinessModel)

| Data | Source | Storage |
|------|--------|---------|
| Per-session scores (scaled, raw, MCQ%, CBQ%) | SessionPersistence.saveHistory() | `cmaP1History2026` (100 entries) |
| Topic-level accuracy per session | saveHistory() topicSnapshot | localStorage |
| Case miss-pattern classification (5 patterns) | saveHistory() casePatterns | localStorage |
| MCQ Gate pass/fail | saveHistory() mcqGate | localStorage |
| Seen-question deduplication | SEEN_KEY | localStorage |
| Per-question time spent | AnalyticsCollector | In-memory (session scope) |
| Per-question confidence (1-5) | session.confidence[QID] | Session state (ephemeral) |
| Flagged/marked questions | session.flags[QID] | Session state |
| Guessed flags | session.guessed[QID] | Session state |

### 2.2 May Stack (MayLearnerState)

| Data | Source | Storage |
|------|--------|---------|
| Per-attempt records (QID, correct, confidence, time, hints) | MayLearnerState.recordAttempt() | `cmaMayLearnerState` |
| Per-topic accuracy, recentPct, trend direction, stability | getTopicProgress() / getTrends() | localStorage |
| Confidence calibration (self-rated vs. actual) | getConfidenceCalibration() | Computed on load |
| Weakness clusters (persistent + declining) | getWeaknessClusters() | Computed on load |
| Readiness bands (per-topic, per-section) | getReadinessSummary() | Computed on load |
| Recommendation outcomes (closed-loop tracking) | recommendationOutcomes[] | localStorage (S129) |
| Case miss-pattern classification | classifyCaseMissPattern() | Per-session |
| May telemetry (7 event types, console-only) | MayTelemetry | In-memory buffer (500 events) |

### 2.3 Recovery Subsystem

| Data | Source | Storage |
|------|--------|---------|
| Recovery Queue (priority-scored items) | AdaptiveReviewQueue.generate() | In-memory (session scope) |
| Recovery Sprint metadata (source, topic summary, count) | session.recoverySource | Session state → history |
| Sprint adoption telemetry | MayTelemetry.trackAdoption() | Telemetry buffer |

---

## 3. What We DON'T Yet Measure

The critical gap: **behavioral patterns across sessions are collected but never analyzed longitudinally.**

| Missing Capability | Why It Matters |
|--------------------|----------------|
| **Session-to-session improvement curves** | Cannot determine whether recovery sprints work |
| **Learner archetype classification** | Cannot personalize recommendations |
| **Retention decay modeling** | Cannot predict when topics need revisiting |
| **Recovery sprint effectiveness scoring** | Cannot optimize sprint size, frequency, or composition |
| **Confidence calibration trajectory** | Cannot distinguish confident-competent from confident-incompetent learners |
| **Flagged-question revisitation rate** | Cannot assess whether the flag workflow works |
| **Plateau detection** | Cannot intervene before stagnation becomes disengagement |
| **Improvement velocity by readiness band** | Cannot prioritize interventions |
| **Cross-session May recommendation follow-through** | Cannot close the recommendation→outcome loop |

---

## 4. Learner Journey Lifecycle Model

The learner progresses through four lifecycle stages. Each stage has distinct behavioral signals and intervention needs.

### 4.1 New Learner (0–3 sessions)

**Defining signals:**
- Session count 0–3
- No readiness band (below MIN_SESSIONS=3 threshold)
- High topic discovery rate (many new topics per session)
- High variance in per-topic accuracy (small sample)
- May states "Not enough data"

**Key questions:**
- What is the initial accuracy baseline?
- How quickly does confidence calibrate?
- Do first-session patterns predict long-term outcomes?

### 4.2 Developing Learner (4–15 sessions)

**Defining signals:**
- Session count 4–15
- Readiness band established (BELOW_TARGET / APPROACHING_TARGET / AT_TARGET)
- Topic coverage expanding (approaching all 6 domains)
- Trends detectable (≥10 attempts per topic for reliable direction)
- Recovery sprints may begin

**Key questions:**
- Which topics improve fastest? Slowest?
- Does recovery sprint use correlate with readiness improvement?
- When do plateaus first appear?

### 4.3 Plateaued Learner (any session count, but trend flat or declining for 3+ sessions)

**Defining signals:**
- 3+ consecutive sessions with score within ±15 points
- Topic-level trends: stable or slightly declining across multiple topics
- May overconfidence signal (calibrationDelta ≥ 0.8 on multiple topics)
- Recovery queue repeatedly contains same topics

**Key questions:**
- What breaks a plateau? (intervention needed)
- Is the plateau topic-specific or global?
- Does confidence re-calibration precede score improvement?

### 4.4 Ready Learner (consistent AT_TARGET or ABOVE_TARGET)

**Defining signals:**
- Readiness band AT_TARGET or ABOVE_TARGET for 3+ sessions
- MCQ Gate consistently passed (≥50%)
- CBQ accuracy ≥ 60%
- Confidence calibration in healthy range (|calibrationDelta| < 0.5)
- Stable or improving trend

**Key questions:**
- What differentiates a Ready learner from an Approaching learner?
- How long does Ready status persist without practice?
- What behavior predicts backsliding from Ready?

---

## 5. Behavioral Signal Inventory

From the existing subsystems, we can extract the following behavioral signals per session:

| Signal | Source | Type | Range |
|--------|--------|------|-------|
| Session score (scaled 0–500) | saveHistory() | Numeric | 0–500 |
| Session score (raw %) | saveHistory() | Numeric | 0–100 |
| MCQ accuracy % | saveHistory() | Numeric | 0–100 |
| CBQ accuracy % | saveHistory() | Numeric | 0–100 |
| MCQ Gate pass/fail | saveHistory() | Boolean | T/F |
| Per-topic accuracy | topicSnapshot | Numeric per topic | 0–100 |
| Per-topic trend direction | getTrends() | Categorical | improving/declining/stable |
| Per-topic stability | getTrends() | Numeric | 0–100 |
| Confidence calibration delta | getConfidenceCalibration() | Numeric | -5 to +5 |
| Overconfidence rate | getConfidenceCalibration() | Numeric | 0–1 |
| Underconfidence rate | getConfidenceCalibration() | Numeric | 0–1 |
| Recovery Sprint launched | recoverySource | Boolean | T/F |
| Recovery Sprint item count | recoverySource | Integer | 0–15 |
| Recovery Sprint mode | recoverySource | Categorical | Full/Partial |
| Flagged question count | AnalyticsCollector | Integer | 0–N |
| May recommendations viewed | MayTelemetry | Integer | 0–4 |
| May recommendation adopted | recommendationOutcomes | Boolean per rec | T/F |
| Session mode | saveHistory() | Categorical | mcq/case/mixed/full/sprint |
| Difficulty preset | saveHistory() | Categorical | Easy/Moderate/Difficult/Mixed |
| Session duration | saveHistory() | Integer (seconds) | 0–14400 |
| Session frequency | Computed from timestamps | Days between sessions | 0–N |
| Topics seen (cumulative) | MayLearnerState | Set of topics | Growing |
| Topics mastered | Computed | Set of topics with accuracy≥80%, recent≥80%, stability≥75% | Growing |

---

## 6. Research Questions & Hypotheses

### 6.1 Recovery Effectiveness

**Q3:** How many Recovery Sprints are typically required before readiness improves?

**H0:** Recovery Sprint count has no measurable effect on readiness band transition.
**H1:** 3+ Recovery Sprints within a 7-day window predict a readiness band upgrade within 14 days.
**Measurement:** For each learner, compute readiness band before first sprint → after Nth sprint. Control for session count, topic coverage, and difficulty mix.

### 6.2 Plateau Formation

**Q2:** Which learner behaviors predict stagnation?

**H0:** Plateaus are random — no behavioral signal precedes them.
**H1:** Three signals predict plateau onset:
1. Declining flag revisitation rate (learner stops reviewing weak items)
2. Rising overconfidence (calibrationDelta increasing across sessions)
3. Decreasing topic variety (learner avoids weak domains)

### 6.3 Improvement Velocity

**Q4:** Which readiness bands improve fastest?

**H0:** All bands improve at the same rate.
**H1:** APPROACHING_TARGET learners improve fastest (they are close to threshold and motivated). BELOW_TARGET learners improve slowest (knowledge gaps are foundational).

### 6.4 Behavioral Predictors

**Q1:** Which learner behaviors predict improvement?

**Candidate predictors (ordered by expected effect size):**
1. **Recovery Sprint completion rate** — completing (not just launching) sprints
2. **Confidence calibration improvement** — closing the gap between self-assessment and reality
3. **Session frequency** — sessions/week (sweet spot: 4-7 with rest days)
4. **Topic rotation diversity** — avoiding single-topic tunnel vision
5. **Flag revisitation** — actually reviewing flagged items in subsequent sessions
6. **Explanation engagement** — time spent on review/coach views post-session
7. **Difficulty progression** — moving from Easy → Moderate → Difficult presets

### 6.5 May Effectiveness

**Q5:** What behavior should May encourage?

**Current May recommendations (from app.js:2161-2196):**
- Top Weakness card
- Suggested Review card
- Next Session card
- Readiness band card

**Hypothesis:** May should prioritize recommendations with highest adoption→improvement correlation, not highest severity.

**Candidate ranking (hypothesized):**
1. Recovery Sprint launch (highest effect — targeted practice)
2. Session frequency nudge (medium effect — consistency)
3. Topic rotation suggestion (medium effect — coverage)
4. Confidence calibration alert (low-medium effect — metacognitive)

---

## 7. Data Architecture for Behavioral Modeling

### 7.1 Current State

Two parallel analytics stacks operate on different data stores with no synchronization:

```
app.js stack:  cmaP1History2026 → ReadinessModel, PerformanceDashboard
May stack:     cmaMayLearnerState → MayLearnerState, MayDashboardModel
```

**Problems:**
- Topic trend direction computed independently in both stacks (may diverge)
- Recovery Sprint history is in app.js stack; May has no awareness of it
- MayLearnerState has per-attempt granularity; app.js history has session-level aggregates only
- No single query can answer: "Did this learner's recovery sprint improve their readiness?"

### 7.2 Recommended Bridge Architecture (Future)

```
SessionPersistence.saveHistory()
        │
        ├─→ cmaP1History2026 (session-level, existing)
        │
        └─→ MayLearnerState.persistSessionSummary() (existing)
                │
                └─→ cmaMayLearnerState
                        │
                        ├─→ Per-topic progress (existing)
                        ├─→ Per-subtopic progress (existing)
                        ├─→ Trends + stability (existing)
                        ├─→ Confidence calibration (existing)
                        ├─→ Weakness clusters (existing)
                        ├─→ **[GAP] Behavioral profile** (proposed)
                        │       ├─→ Archetype classification
                        │       ├─→ Improvement velocity per topic
                        │       ├─→ Plateau detection signal
                        │       ├─→ Recovery effectiveness score
                        │       └─→ Retention decay model
                        │
                        └─→ **[GAP] Unified learner intelligence** (S130 partial)
```

### 7.3 Proposed New Fields (MayLearnerState Schema Extension)

```javascript
// Per-learner behavioral profile (computed, not raw data)
behavioralProfile: {
    archetype: 'new' | 'developing' | 'plateaued' | 'ready',
    archetypeConfidence: 0-1,
    
    // Improvement tracking
    sessionTrend: {
        direction: 'improving' | 'stable' | 'declining',
        slope: number,           // scaledScore change per session
        rSquared: number,        // linear fit quality
        recentVelocity: number,  // last 5 sessions
        overallVelocity: number  // all sessions
    },
    
    // Recovery metrics
    recoveryMetrics: {
        totalSprints: number,
        completedSprints: number,
        sprintsToNextBand: number | null,
        avgSprintScore: number,
        sprintScoreTrend: 'improving' | 'stable' | 'declining'
    },
    
    // Plateau detection
    plateauState: {
        isPlateaued: boolean,
        plateauStartSession: number,
        plateauDuration: number,  // sessions in plateau
        plateauTopics: string[]
    },
    
    // Retention model
    retentionModel: {
        perTopicDecayRate: { [topic]: number },  // % accuracy loss per week without practice
        lastPracticed: { [topic]: ISO8601 },
        recommendedReviewDate: { [topic]: ISO8601 }
    },
    
    // Behavioral patterns
    behavioralPatterns: {
        avgSessionSpacing: number,     // days between sessions
        preferredDifficulty: string,
        flagRevisitationRate: number,  // % of flagged Qs revisited within 3 sessions
        explanationEngagement: number, // avg seconds in review/coach view
        topicRotationDiversity: number // unique topics / total session topics
    }
}
```

---

## 8. Implementation Roadmap (Non-Destructive)

All work below is **analytics-only** — no modifications to pack files, cases, governance rules, or delivery logic.

### Phase 0 — Instrumentation Audit (This Session: S111P)

**Deliverables:**
- [x] Learner Journey Plan (this document)
- [ ] Study Behavior Analysis (S111P_STUDY_BEHAVIOR_ANALYSIS.md)
- [ ] Learner Archetypes Definition (S111P_LEARNER_ARCHETYPES.md)
- [ ] Improvement Model Definition (S111P_IMPROVEMENT_MODEL.md)
- [ ] Recovery Pattern Analysis (S111P_RECOVERY_PATTERNS.md)
- [ ] Retention Hypotheses (S111P_RETENTION_HYPOTHESES.md)

### Phase 1 — Behavioral Signal Extraction (Future Session)

**Goal:** Extract all behavioral signals listed in §5 from localStorage snapshots.

**Method:** Read-only inspection of `cmaP1History2026` and `cmaMayLearnerState` entries. No writes.

**Output:** Per-learner behavioral CSV/JSON with one row per session, all §5 signals as columns.

### Phase 2 — Archetype Classification (Future Session)

**Goal:** Classify each learner into one of four archetypes using §4 lifecycle signals.

**Method:** Rule-based classifier (New: sessions≤3, Developing: 4–15 + not plateaued, Plateaued: 3+ flat sessions, Ready: AT/ABOVE_TARGET + stable). Validate with cluster analysis.

### Phase 3 — Predictive Modeling (Future Session)

**Goal:** Identify which behavioral signals best predict readiness improvement.

**Method:** Logistic regression / decision tree on session data. Target variable: readiness band upgrade within N sessions. Features: all §5 signals.

### Phase 4 — May Recommendation Ranking (Future Session)

**Goal:** Rank May recommendations by predicted improvement effect, not just severity.

**Method:** Causal inference from recommendationOutcomes data. Compare adoption→improvement correlation across recommendation types.

---

## 9. Governance Compliance

| Requirement | Status |
|-------------|--------|
| Governance Lane | Light (Read-Only) — confirmed |
| No pack/case modifications | Confirmed — zero file edits to pack_*, scored_cases*, case_pack_* |
| No governance rule modifications | Confirmed |
| No certification state changes | Confirmed |
| No May logic modifications | Confirmed |
| No recovery queue/sprint modifications | Confirmed |
| Destructive scripts | Not applicable |
| REVISION_HISTORY.md entry | Not required (Light Lane, no content defect found) |
| DEFECT_LIBRARY.md entry | Not required (no new defect discovered) |
| Parallel-safe with S105P/S106P/S109P/MAY-029 | Confirmed — zero shared write targets |

---

## 10. Deliverables Checklist

| File | Status |
|------|--------|
| `reports/S111P_LEARNER_JOURNEY_PLAN.md` | Created |
| `reports/S111P_STUDY_BEHAVIOR_ANALYSIS.md` | Pending |
| `reports/S111P_LEARNER_ARCHETYPES.md` | Pending |
| `reports/S111P_IMPROVEMENT_MODEL.md` | Pending |
| `reports/S111P_RECOVERY_PATTERNS.md` | Pending |
| `reports/S111P_RETENTION_HYPOTHESES.md` | Pending |
| `reports/S111P_CLOSEOUT.md` | Pending |

---

## Appendix A: Subsystem Reference Map

| Subsystem | File | Lines | Key Function |
|-----------|------|-------|-------------|
| Confidence tracking | app.js | 1704–1784 | renderMCQ confidence buttons |
| Session persistence | app.js | 767–1076 | SessionPersistence class |
| Session history | app.js | 980–1035 | saveHistory() |
| AdaptiveReviewQueue | app.js | 2476–2660 | generate(), render() |
| Recovery Sprint | app.js | 2137–2159, 2408–2473 | render(), start() |
| ReadinessModel | app.js | 3037–3236 | compute(), _determineBand() |
| PerformanceAnalytics | app.js | 2667–3036 | computeBreakdown(), identifyWeakAreas() |
| PerformanceDashboard | app.js | 3392–3517 | render() |
| ReviewCoach | app.js | 3580–4028 | analyze(), _generateNextSteps() |
| May initiation | may-core.js | 66 | May.init() |
| May coaching router | may-core.js | 1008–1114 | handleAction() |
| May handoff | may-core.js | 5404–5491 | handoffCompletedSession() |
| May mini-panel | may-core.js | 5738–5780 | renderMiniPanel() |
| MayLearnerState | may-learner-state.js | 1–2038 | recordAttempt(), getTopicProgress(), getReadinessSummary() |
| MayTelemetry | may-telemetry.js | 1–173 | 7 event types, console-only |
| AnalyticsCollector | app.js | 683–764 | recordAnswer(), getSummary() |

---

## Appendix B: localStorage Key Map

| Key | Contents | Max Size |
|-----|----------|----------|
| `cmaP1SessionState` | Current session snapshot | 1 entry |
| `cmaP1SessionCheckpoints` | Rolling checkpoints | 20 entries |
| `cmaP1SessionJournal` | Append-only action log | 500 entries |
| `cmaP1History2026` | Completed session history | 100 entries |
| `cmaP1SeenQuestions2026` | Deduplication set | Unlimited |
| `cmaP1Dashboard` | Dashboard snapshot | 1 entry |
| `cmaMayLearnerState` | Cross-session learner model | Unlimited (topics grow) |
| `cmaMayPilotTelemetry` | Event telemetry buffer | 500 events |
| `cmaMaySelectedLearnerId` | Multi-student selector | 1 string |
| `cmaP1MayAdoptionSnapshot` | Adoption counts | 1 snapshot |
| `cmaP1MayEngagementSnapshot` | Engagement counts | 1 snapshot |
| `cma-theme` | Theme preference | 1 string |

---

_Version 1.0 — Session 111P Master Plan_
