# S111P — Learner Archetypes

**Session:** 111P
**Governance Lane:** Light (Read-Only)
**Date:** 2026-07-31
**Status:** Active
**Depends On:** S111P_STUDY_BEHAVIOR_ANALYSIS.md, S111P_LEARNER_JOURNEY_PLAN.md

---

## 1. Purpose

Define four learner archetypes based on observable behavioral signals from existing instrumentation. These archetypes serve as the foundation for personalized May coaching, adaptive difficulty routing, and recovery sprint optimization.

All archetypes are derived from signals that exist today in localStorage — no new instrumentation required for classification.

---

## 2. Archetype Taxonomy

### 2.1 The Novice

**Lifecycle stage:** New Learner (0–3 sessions)

**Defining signals:**
| Signal | Threshold | Source |
|--------|-----------|--------|
| Session count | 0–3 | MayLearnerState.getUserProfile().sessionCount |
| Readiness band | None (below MIN_SESSIONS=3) | ReadinessModel.compute() |
| Topic coverage | < 50% of all topics seen | MayLearnerState topicPerformance keys |
| Avg per-topic attempts | < 5 per seen topic | MayLearnerState per-topic totalAttempts |
| Confidence calibration | N/A (insufficient data) | getConfidenceCalibration() |
| MCQ Gate pass rate | N/A (< 3 sessions) | saveHistory() mcqGate |

**Behavioral profile:**
- High exploration: trying different modes, difficulty presets, sections
- Performance highly variable (session-to-session score swing > 50 points)
- No established study pattern (irregular session spacing)
- May is in "not enough data" mode for most features

**What the Novice needs:**
- Structure: suggested session cadence (e.g., "3 sessions this week")
- Orientation: topic coverage map showing what's been seen vs. unseen
- Early wins: Easy-difficulty practice to build confidence
- Low-friction start: MCQ-only sessions before mixed/case

**Risk signals to monitor:**
- Session 1 scaled score < 250 → possible weak foundation
- 2+ days gap between first 3 sessions → engagement risk
- All Easy preset → avoidance of challenge

---

### 2.2 The Grinder

**Lifecycle stage:** Developing Learner (4–15 sessions)

**Defining signals:**
| Signal | Threshold | Source |
|--------|-----------|--------|
| Session count | 4–15 | MayLearnerState.getUserProfile().sessionCount |
| Session frequency | 4+ sessions/week | Computed from saveHistory() timestamps |
| Readiness band | BELOW_TARGET or APPROACHING_TARGET | ReadinessModel.compute() |
| Topic coverage | 50–80% of all topics | MayLearnerState topicPerformance keys |
| Recovery Sprint usage | 0–2 sprints total | saveHistory() recoverySource |
| Difficulty preset | MODERATE most common | saveHistory() difficultyPreset |
| Score volatility | Medium (20–40 point range) | Computed from saveHistory() scaledScore |
| Confidence calibration | CalibrationDelta +0.2 to +1.0 (slightly overconfident) | getConfidenceCalibration() |

**Behavioral profile:**
- Highest session frequency of any archetype
- Steady but slow improvement trajectory
- Sometimes overconfident (rates self higher than performance warrants)
- Prefers moderate difficulty, may avoid Difficult preset
- Reviews but doesn't deep-dive (moderate flag count, low revisit rate)
- May launches recovery sprints but doesn't complete them consistently

**What the Grinder needs:**
- Calibration: confidence-vs-accuracy feedback ("You rated 4/5 confidence but scored 55% on this topic")
- Challenge push: encouragement to try Difficult preset
- Recovery discipline: "Complete your recovery sprint — you launched 2 but only finished 1"
- Topic focus: "You've practiced Cost Management 12 times but Internal Controls only 3 times"

**Risk signals to monitor:**
- 3+ sessions with flat score → plateau formation
- Overconfidence increasing (calibrationDelta rising) → metacognitive blind spot
- Declining session frequency → engagement decay

---

### 2.3 The Plateauer

**Lifecycle stage:** Plateaued Learner (any session count, 3+ flat sessions)

**Defining signals:**
| Signal | Threshold | Source |
|--------|-----------|--------|
| Score plateau | 3+ consecutive sessions within ±15 scaledScore points | saveHistory() scaledScore |
| Topic-level stagnation | 3+ topics with stable or slightly declining trend | MayLearnerState.getTrends() |
| Confidence calibration | CalibrationDelta ≥ +0.8 on 2+ topics | getConfidenceCalibration() |
| Recovery Sprint usage | 0–1 sprints launched (avoidance) | saveHistory() recoverySource |
| Flag revisitation rate | Low (< 20% of flagged questions reviewed) | AnalyticsCollector (flag count) |
| Topic diversity | Declining (repeating same 3–4 topics) | MayLearnerState topicPerformance recent |
| Session mode | MCQ-only (avoids cases) | saveHistory() mode |

**Behavioral profile:**
- Stuck — same scores, same topics, same patterns
- Comfort-zone practice: repeats strong topics, avoids weak topics
- Recovery avoidance: doesn't launch recovery sprints, or launches but doesn't engage with results
- Overconfident: thinks they're improving because they're practicing, but scores tell a different story
- Declining engagement: session frequency dropping, sessions getting shorter

**What the Plateauer needs:**
- Wake-up call: "Your last 3 sessions: 312, 318, 305. You're not improving."
- Recovery prescription: "You're avoiding Cost Management (45% accuracy). Start here."
- Difficulty intervention: force Difficult preset or case studies
- Confidence confrontation: "You rated 4/5 confidence on 3 topics where accuracy is under 60%"

**Risk signals to monitor:**
- Plateau extending beyond 5 sessions → disengagement risk
- All sessions MCQ-only, never attempting cases → gap widening
- Session frequency dropping below 2/week → abandonment risk

---

### 2.4 The Ace

**Lifecycle stage:** Ready Learner (AT_TARGET or ABOVE_TARGET, 3+ consecutive)

**Defining signals:**
| Signal | Threshold | Source |
|--------|-----------|--------|
| Readiness band | AT_TARGET or ABOVE_TARGET | ReadinessModel.compute() |
| Band stability | 3+ consecutive sessions in band | saveHistory() scaledScore |
| MCQ Gate | Consistently passed (80%+ pass rate) | saveHistory() mcqGate |
| CBQ accuracy | ≥ 60% | saveHistory() casePct |
| Confidence calibration | \|CalibrationDelta\| < 0.5 (well-calibrated) | getConfidenceCalibration() |
| Topic mastery breadth | 5+ topics at "Ready" or "Approaching" | MayLearnerState.getReadinessSummary() |
| Case proficiency | 3+ case patterns with >60% accuracy | saveHistory() casePatterns |
| Score trend | Stable or slightly improving | Computed from saveHistory() |

**Behavioral profile:**
- Well-calibrated: knows what they know and what they don't
- Balanced practice: rotates topics, mixes MCQ+case, varies difficulty
- Efficient: higher accuracy per unit time (not just higher accuracy)
- Strategic: uses recovery sprints selectively, not reactively
- Sustainable: consistent session frequency without burnout

**What the Ace needs:**
- Maintenance: "Your Internal Controls accuracy dropped from 88% to 82% — review before it slips further"
- Exam readiness: full-exam simulation recommendations
- Edge polishing: Difficult preset on weakest remaining topics
- Confidence sustainment: "You're ready. Maintain this pace until exam day."

**Risk signals to monitor:**
- Topic backsliding (Ready → Approaching → Developing on any topic)
- Confidence erosion (ace knows they're slipping before scores show it)
- Over-studying (8+ sessions/week → burnout risk)
- Session duration increasing (perfectionism → diminishing returns)

---

## 3. Archetype Transition Map

```
Novice (0–3 sessions)
    │
    ├─→ If session 3 scaledScore ≥ 320 → Early Developing
    └─→ If session 3 scaledScore < 250 → At-risk Novice

Developing / Grinder (4–15 sessions)
    │
    ├─→ If 3+ consecutive sessions improving → Grinder (healthy)
    ├─→ If 3+ consecutive sessions flat → Transitioning to Plateauer
    └─→ If readiness band reaches AT_TARGET → Transitioning to Ace

Plateauer (any session count; 3+ flat)
    │
    ├─→ If Recovery Sprint launched + completed + next session score improves → Grinder (recovery)
    ├─→ If confidence calibration improves (delta drops 0.3+) → Grinder (metacognitive breakthrough)
    └─→ If plateau extends to 6+ sessions without change → Chronic Plateauer (intervention needed)

Ace (AT_TARGET or ABOVE_TARGET, 3+ stable)
    │
    ├─→ If 1 topic backslides → Ace (watch) — May should flag
    ├─→ If 3+ topics backslide → Transitioning to Grinder (regression)
    └─→ If full exam sim score ≥ 400 → Exam Ready
```

---

## 4. Archetype Classification Algorithm

### 4.1 Input Signals

```
sessionCount       ← MayLearnerState.getUserProfile().sessionCount
sessionScores      ← saveHistory() array, extract scaledScore per session (last 10)
readinessBand      ← ReadinessModel.compute(sessionHistory)
topicTrends        ← MayLearnerState.getTrends() for all topics
calibrationDelta   ← MayLearnerState.getConfidenceCalibration() per topic
recoveryCount      ← count saveHistory() entries where recoverySource !== null
sessionModes       ← saveHistory() array, extract mode per session
difficultyPresets  ← saveHistory() array, extract difficultyPreset per session
mcqGatePassRate    ← saveHistory() array, fraction where mcqGate === true
casePct            ← saveHistory() array, extract casePct per session
flagCount          ← AnalyticsCollector summary (per-session, must be added to history)
```

### 4.2 Classification Rules (Priority Order)

```javascript
function classifyArchetype(signals) {
    // Rule 1: Novice
    if (signals.sessionCount <= 3) return 'novice';

    // Rule 2: Ace
    if (signals.readinessBand === 'AT_TARGET' || signals.readinessBand === 'ABOVE_TARGET') {
        const bandStable = signals.sessionScores.slice(-3).every(
            s => ReadinessModel._determineBand(s) === signals.readinessBand
        );
        if (bandStable) return 'ace';
    }

    // Rule 3: Plateauer
    const recentScores = signals.sessionScores.slice(-3);
    const scoreRange = Math.max(...recentScores) - Math.min(...recentScores);
    const isFlat = scoreRange <= 15;

    const decliningTopics = signals.topicTrends.filter(
        t => t.direction === 'declining' || t.direction === 'slightly_declining'
    ).length;

    const isStagnated = signals.topicTrends.filter(
        t => t.direction === 'stable'
    ).length >= 3;

    if (isFlat && (decliningTopics >= 2 || isStagnated)) return 'plateauer';

    // Rule 4: Grinder (default for Developing)
    return 'grinder';
}
```

### 4.3 Archetype Confidence Scoring

Rather than a binary classification, compute a confidence score per archetype:

```javascript
function archetypeConfidence(signals) {
    return {
        novice:   signals.sessionCount <= 3 ? 1.0
                : signals.sessionCount <= 5 ? 0.3 : 0.0,

        grinder:  signals.sessionCount > 3 && signals.sessionCount <= 15
                  && signals.readinessBand !== 'AT_TARGET'
                  && signals.readinessBand !== 'ABOVE_TARGET'
                ? 0.85 : 0.3,

        plateauer: signals.sessionCount > 5
                   && isScoreFlat(signals.sessionScores, 3, 15)
                ? 0.8 : 0.2,

        ace:      ['AT_TARGET', 'ABOVE_TARGET'].includes(signals.readinessBand)
                  && isBandStable(signals, 3)
                ? 0.9 : 0.1
    };
}
```

---

## 5. Archetype-Specific May Recommendations

| Archetype | Primary Recommendation | Secondary Recommendation | Warning to Suppress |
|-----------|----------------------|-------------------------|---------------------|
| **Novice** | "Start with 3 MCQ sessions this week" | "Explore all 6 domains before focusing" | Suppress "Recovery Sprint" (no missed items yet) |
| **Grinder** | "Try a Difficult preset session this week" | "Your Internal Controls accuracy is 45% — focus here" | Suppress "You're ready for the exam" |
| **Plateauer** | "Launch a Recovery Sprint on your weakest 3 topics" | "You've avoided Case Studies for 5 sessions — try one" | Suppress "Keep doing what you're doing" |
| **Ace** | "Your Cost Management dropped to 82% — review before it slips" | "Schedule a full exam simulation this week" | Suppress "Start exploring new topics" |

---

## 6. Plateau Intervention Protocol

When a learner is classified as Plateauer:

### Stage 1 — Detection (automated)
- Trigger: 3+ consecutive sessions within 15-point score band
- Action: Log plateau start session index, snapshot current topic trends

### Stage 2 — Notification (May coaching)
- Trigger: Plateau detected
- Action: May surfaces plateau alert in next session's coaching panel
- Message: "Your last 3 sessions have been in the same score range. Let's try something different."

### Stage 3 — Prescription (May coaching)
- Trigger: Learner acknowledges or second plateau session
- Action: May prescribes specific intervention based on plateau type:
  - **Topic-avoidance plateau:** Force recovery sprint on avoided topics
  - **Overconfidence plateau:** Surface calibration delta
  - **Mode-stuck plateau:** Force case study session
  - **Difficulty-stuck plateau:** Force Difficult preset

### Stage 4 — Monitoring (automated)
- Trigger: Post-intervention session
- Action: Compare score, topic trends, and calibration delta to pre-intervention baseline
- Outcome: If score improves > 10 points → plateau broken. If not → escalate intervention.

### Stage 5 — Escalation (May coaching)
- Trigger: 2 interventions without plateau break
- Action: May recommends a study break (2-3 days off), then a fresh full-length exam simulation

---

## 7. Archetype Distribution Hypotheses

Based on typical CMA candidate behavior patterns (unverified — needs live data):

| Archetype | Hypothesized % | Rationale |
|-----------|----------------|-----------|
| Novice | 30% | All new learners, high churn at session 1-2 |
| Grinder | 40% | Most learners spend majority of time here |
| Plateauer | 20% | Common at APPROACHING_TARGET → AT_TARGET boundary |
| Ace | 10% | Small percentage achieve sustained readiness |

**Expected dynamics:**
- Novice → Grinder transition: ~3 sessions (driven by MIN_SESSIONS threshold)
- Grinder → Plateauer risk: increases after session 10 (diminishing returns from same study patterns)
- Plateauer → Ace transition: requires behavioral change (recovery sprint, difficulty change, topic rotation)
- Ace sustainability: ~70% of Aces stay Aces; 30% backslide within 2 weeks without practice

---

## 8. Implementation Notes

### 8.1 Classification Does Not Require New Instrumentation

All signals required for archetype classification exist in localStorage today:
- `cmaP1History2026` → session scores, modes, difficulty presets, recovery metadata
- `cmaMayLearnerState` → session count, topic trends, calibration

### 8.2 Classification Should Run at Session Start

After `MayLearnerState.load()` completes:
1. Extract signals from both data stores
2. Run classification algorithm
3. Store archetype + confidence in MayLearnerState
4. May uses archetype to select coaching mode, recommendation priority, and messaging tone

### 8.3 Classification Should Be Cached

Recompute only when:
- New session history entry added
- Topic performance changes significantly (accuracy shift > 10% on any topic)
- Confidence calibration changes significantly (delta shift > 0.5 on any topic)

### 8.4 Edge Cases

| Case | Handling |
|------|----------|
| Returning user after long gap (>30 days) | Reclassify; decayed retention may push Ace→Grinder or Grinder→Plateauer |
| User with exactly 4 sessions, all ABOVE_TARGET | Classify as Grinder (not Ace — band not yet stable per Rule 2 requiring 3+ consecutive) |
| User with 20 sessions, all BELOW_TARGET but improving | Classify as Grinder (improving trend prevents Plateauer classification) |
| User with 50 sessions, all MODERATE, no recovery sprints | Classify as Plateauer if flat for 3+ sessions regardless of session count |

---

_Version 1.0 — Session 111P Learner Archetypes_
