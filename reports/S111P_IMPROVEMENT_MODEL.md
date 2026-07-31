# S111P — Improvement Model

**Session:** 111P
**Governance Lane:** Light (Read-Only)
**Date:** 2026-07-31
**Status:** Active
**Depends On:** S111P_STUDY_BEHAVIOR_ANALYSIS.md, S111P_LEARNER_ARCHETYPES.md

---

## 1. Purpose

Define a mathematical framework for modeling learner improvement over time using existing instrumentation data. This model quantifies improvement velocity, identifies improvement-driving behaviors, and predicts time-to-mastery for individual topics.

---

## 2. Model Foundations

### 2.1 What "Improvement" Means in This Simulator

Improvement is not a single metric. It is a vector of four dimensions:

| Dimension | Metric | Source | Direction |
|-----------|--------|--------|-----------|
| **Score** | Scaled score (0–500) | saveHistory().scaledScore | Increasing |
| **Accuracy** | Per-topic accuracy % | MayLearnerState.getTopicProgress() | Increasing |
| **Stability** | Per-topic accuracy variance | MayLearnerState.getTrends().stability | Decreasing (low variance = stable) |
| **Calibration** | CalibrationDelta (\|delta\| → 0) | MayLearnerState.getConfidenceCalibration() | Converging to 0 |

A learner is "improving" when all four dimensions move in the correct direction. Score improvement alone (without calibration improvement) may indicate lucky guessing, not learning.

### 2.2 The Improvement Vector

```
Improvement(t) = [ΔScore(t), ΔAccuracy(t), ΔStability(t), ΔCalibration(t)]

where:
  ΔScore(t)        = score(t) - score(t-1)
  ΔAccuracy(t)     = mean(accuracy across topics at t) - mean(accuracy at t-1)
  ΔStability(t)    = -(stability(t) - stability(t-1))  // negative because lower variance = better
  ΔCalibration(t)  = -(abs(calibrationDelta(t)) - abs(calibrationDelta(t-1)))  // converging to 0 = better
```

A weighted composite improvement score:
```
I(t) = 0.40 * ΔScore_norm + 0.30 * ΔAccuracy_norm + 0.15 * ΔStability_norm + 0.15 * ΔCalibration_norm
```

### 2.3 Improvement Velocity

Velocity is the rate of improvement per session:

```
V(t) = I(t)  // raw: improvement per session
V_avg(t) = mean(I(t-k), ..., I(t))  // smoothed: k-session rolling average
```

---

## 3. Topic-Level Improvement Curves

### 3.1 The S-Curve Model

Topic mastery follows an S-curve (logistic growth):

```
M(s) = M_max / (1 + e^(-k * (s - s_0)))

where:
  M(s)    = mastery at session s (measured as accuracy %)
  M_max   = asymptotic mastery ceiling (typically 95% — nobody reaches 100%)
  k       = learning rate (steepness of the curve)
  s_0     = inflection point (session where improvement is fastest)
  s       = session count since first exposure to the topic
```

### 3.2 Learning Rate by Topic Type

| Topic Type | Expected k | Expected s_0 | Expected M_0 (first session accuracy) |
|------------|-----------|-------------|--------------------------------------|
| Calculation-heavy (e.g., variance analysis) | Low (0.15–0.25) | 6–8 sessions | 35–50% |
| Conceptual (e.g., COSO framework) | Medium (0.25–0.40) | 3–5 sessions | 45–60% |
| Definitional (e.g., data governance terms) | High (0.40–0.60) | 2–3 sessions | 50–70% |
| Integrated (e.g., case study financial analysis) | Very Low (0.08–0.15) | 10–15 sessions | 25–40% |

### 3.3 Sessions-to-Mastery (S2M) Estimation

Mastery threshold: accuracy ≥ 80%, recentPct ≥ 80%, stability ≥ 75.

```
S2M = s_0 + ln(M_max / M_threshold - 1) / (-k)

For calculation-heavy topics (k=0.20, s_0=7, M_max=95, M_threshold=80):
  S2M = 7 + ln(95/80 - 1) / (-0.20) = 7 + ln(0.1875) / (-0.20) = 7 + (-1.674) / (-0.20) ≈ 15 sessions
```

**Hypothesis:** Calculation-heavy topics require ~2× more sessions than conceptual topics, and ~5× more than definitional topics.

---

## 4. Improvement Predictors — Regression Model Framework

### 4.1 Target Variable

`ΔBand`: Whether the learner's readiness band improved within N sessions:
- 0 = No change or declined
- 1 = Band improved (e.g., BELOW_TARGET → APPROACHING_TARGET)

### 4.2 Candidate Features (from Existing Instrumentation)

| Feature | Type | Expected Direction | Rationale |
|---------|------|-------------------|-----------|
| `sessionFrequency` | Numeric (sessions/week) | Positive (optimal 4–7) | Consistent practice enables learning |
| `recoverySprintCount` | Integer (total completed) | Positive (diminishing after 5) | Targeted practice on weak areas |
| `sprintCompletionRate` | Float (completed/launched) | Positive | Following through matters more than launching |
| `topicDiversity` | Float (unique topics / total sessions) | Positive (optimal 0.3–0.5) | Broad coverage without dilution |
| `difficultyMix` | Categorical (Easy/Mixed/Progressive) | Progressive > Mixed > Easy | Appropriate challenge drives improvement |
| `caseSessionRatio` | Float (case sessions / total sessions) | Positive (optimal 0.2–0.4) | Case practice transfers to MCQ performance |
| `confidenceCalibrationTrend` | Numeric (Δdelta per session) | Negative (delta decreasing = improving) | Better self-awareness → better study choices |
| `flagRevisitationRate` | Float (reviewed flags / total flags) | Positive | Active review of weak items |
| `sessionDurationTrend` | Numeric (Δduration per session) | Stable (not increasing or decreasing sharply) | Consistent effort, not cramming or burnout |
| `interSessionGap` | Numeric (mean days between sessions) | Negative (gaps > 5 days harmful) | Spacing effect: gaps > 7 days cause decay |
| `readinessBandStart` | Categorical (BELOW/APPROACHING/AT) | APPROACHING improves fastest | Proximity to threshold motivates |

### 4.3 Hypothesized Effect Sizes

Ranked by expected standardized coefficient (β):

| Rank | Feature | Expected β | Confidence |
|------|---------|-----------|------------|
| 1 | `sessionFrequency` | +0.35 | HIGH — well-established in learning science |
| 2 | `sprintCompletionRate` | +0.28 | MEDIUM — plausible but unverified in this context |
| 3 | `confidenceCalibrationTrend` | +0.22 | MEDIUM — metacognition literature supports |
| 4 | `difficultyMix` (Progressive) | +0.18 | MEDIUM — deliberate practice theory |
| 5 | `caseSessionRatio` | +0.15 | LOW — transfer effects hard to isolate |
| 6 | `topicDiversity` | +0.12 | LOW — inverted-U relationship suspected |
| 7 | `flagRevisitationRate` | +0.10 | LOW — small sample, behavior not well-tracked |
| 8 | `interSessionGap` | -0.08 | LOW — spacing effect well-documented but small effect |

---

## 5. Readiness Band Transition Probabilities

### 5.1 Markov Transition Matrix

Based on hypothesized transition rates (to be calibrated with live data):

```
               TO:  BELOW   APPROACHING   AT_TARGET   ABOVE_TARGET
FROM:
BELOW              0.65       0.25          0.08         0.02
APPROACHING        0.10       0.50          0.30         0.10
AT_TARGET          0.05       0.15          0.55         0.25
ABOVE_TARGET       0.02       0.08          0.20         0.70
```

**Interpretation:**
- BELOW_TARGET learners have a 65% chance of staying BELOW, 25% chance of improving to APPROACHING
- APPROACHING learners have the highest upward mobility (40% chance of reaching AT or ABOVE)
- AT_TARGET has 25% chance of reaching ABOVE_TARGET, 15% chance of backsliding
- ABOVE_TARGET is "sticky" (70% stay) but 20% drop to AT_TARGET

### 5.2 Band Transition Time (Expected Sessions)

```
E[sessions to next band | current band]:
  BELOW → APPROACHING:    1 / 0.25 = 4.0 sessions
  APPROACHING → AT:       1 / 0.30 = 3.3 sessions
  AT → ABOVE:             1 / 0.25 = 4.0 sessions
  BELOW → AT (cumulative): ~7-8 sessions (with focused effort)
```

**Hypothesis:** The APPROACHING→AT transition is the fastest (learners are close to the threshold and motivated). The BELOW→APPROACHING transition takes the longest (foundational gaps).

### 5.3 Behavioral Acceleration Factors

These behaviors are hypothesized to accelerate band transitions:

| Behavior | Acceleration Factor | Applies To |
|----------|-------------------|------------|
| Recovery Sprint completion (1+ per week) | 1.4× | BELOW → APPROACHING |
| Mixed difficulty sessions (not all Moderate) | 1.3× | APPROACHING → AT |
| Case study sessions (1 per 4 sessions) | 1.2× | AT → ABOVE |
| Topic rotation (no topic repeated until all covered) | 1.15× | All transitions |
| Confidence calibration awareness (May surface) | 1.1× | PLATEAU → any improvement |

---

## 6. Plateau Dynamics Model

### 6.1 Plateau Definition (Mathematical)

A learner is in a plateau at session t if:

```
max(score[t-2], score[t-1], score[t]) - min(score[t-2], score[t-1], score[t]) ≤ 15
AND
mean(score[t-2], score[t-1], score[t]) < readiness_threshold - 20
```

This distinguishes a true plateau (flat + below target) from a learner who has reached a stable high score.

### 6.2 Plateau Onset Predictors

Three signals hypothesized to predict plateau onset within 2 sessions:

| Signal | Threshold | Lead Time | Positive Predictive Value (hypothesized) |
|--------|-----------|-----------|------------------------------------------|
| Topic rotation diversity drops > 30% | Diversity[t] < 0.7 * Diversity[t-2] | 2 sessions | 0.65 |
| Confidence calibration delta increases > 0.3 | Δcalibration[t] > calibration[t-2] + 0.3 | 1 session | 0.55 |
| Session frequency drops below 2/week | 7+ day gap | 1 session | 0.45 |

### 6.3 Plateau Breakthrough Signals

What signals that a plateau is about to break:

| Signal | Threshold | Lead Time |
|--------|-----------|-----------|
| Recovery Sprint launched + completed | First completed sprint after 3+ flat sessions | 1 session |
| Difficulty preset changed (Moderate → Difficult) | First Difficult session after 3+ Moderate-only | 1 session |
| Calibration delta drops > 0.3 | Sudden metacognitive improvement | 1 session |
| New topic introduced | First session on previously unseen topic | 1–2 sessions |

---

## 7. Improvement Decomposition: What's Driving the Score?

### 7.1 Score Decomposition Formula

```
ΔScore = ΔKnowledge + ΔTestTaking + ΔLuckyGuessing + ε

where:
  ΔKnowledge       = improvement in actual accounting knowledge
  ΔTestTaking      = improvement in exam technique (time management, elimination, etc.)
  ΔLuckyGuessing   = variance from lucky guesses (should net to zero over many sessions)
  ε                = measurement noise
```

### 7.2 Proxies for Each Component

| Component | Proxy | Measurement |
|-----------|-------|-------------|
| ΔKnowledge | Per-topic accuracy on topics with 5+ attempts | MayLearnerState per-topic accuracy trend |
| ΔTestTaking | MCQ Gate pass rate, session completion rate, avg time per question trend | saveHistory().mcqGate, session duration |
| ΔLuckyGuessing | Overconfidence rate fluctuation | calibrationDelta change when accuracy is flat |

### 7.3 Knowledge-vs-TestTaking Decomposition

If score improves but per-topic accuracy is flat → improvement is test-taking skill, not knowledge.
If per-topic accuracy improves but score is flat → knowledge gain offset by test-taking regression.
If both improve → genuine learning.

**This decomposition tells May WHAT to coach:**
- Knowledge improvement needed → concept review, recovery sprint
- Test-taking improvement needed → time management tips, elimination strategies
- Both improving → sustain and encourage

---

## 8. Predictive Model Architecture (Future Implementation)

### 8.1 Model Type: Gradient Boosted Trees

**Why:** Handles mixed feature types (numeric + categorical), captures non-linear relationships (S-curve mastery, inverted-U for diversity), robust to missing data (some signals unavailable for early sessions).

### 8.2 Training Data Schema

```
One row per (learner, session):
  learner_id
  session_index
  scaledScore
  readinessBand              // target for classification
  readinessBandNumeric        // 1=BELOW, 2=APPROACHING, 3=AT, 4=ABOVE
  // Lagged features (from session_index - 1):
  prev_scaledScore
  prev_band
  sessionsThisWeek
  recoverySprintsTotal
  recoverySprintsCompleted
  topicDiversityScore
  calibrationDeltaAvg
  calibrationDeltaMax
  flagCount
  caseSessionCount
  daysSinceLastSession
  // Target:
  bandImproved               // 1 if readinessBand > prev_band, else 0
  scoreChange                // scaledScore - prev_scaledScore
```

### 8.3 Validation Strategy

- **Time-based split:** Train on first 80% of sessions per learner, test on last 20%
- **Cross-learner generalization:** Train on N-1 learners, test on held-out learner
- **Metric:** AUC for band-improved classification; RMSE for score-change regression

---

## 9. Key Metrics for Ongoing Monitoring

| Metric | Description | Healthy Range | Warning Threshold |
|--------|-------------|--------------|-------------------|
| Avg sessions to first band improvement | Mean sessions from Novice to first readiness band upgrade | 3–6 | > 10 |
| Plateau rate | % of learners meeting plateau definition | 15–25% | > 35% |
| Plateau escape rate | % of plateaued learners who improve within 3 more sessions | 50–70% | < 30% |
| Recovery sprint completion rate | % of launched sprints that are completed | 60–80% | < 40% |
| Topic mastery velocity | Mean sessions from <60% to ≥80% accuracy | 8–15 | > 25 |
| Calibration convergence rate | % of learners whose \|delta\| < 0.5 by session 10 | 40–60% | < 25% |
| Ace sustainability | % of Aces who remain Ace after 5 more sessions | 65–80% | < 50% |

---

## 10. Implementation Roadmap (Non-Destructive)

### Phase 1 — Data Extraction (Future Session)

Extract from localStorage:
- All saveHistory() entries per learner
- All MayLearnerState topicPerformance per learner
- Compute: session frequency, sprint counts, topic diversity, calibration deltas

### Phase 2 — Curve Fitting (Future Session)

- Fit S-curve model to per-topic accuracy data
- Estimate k and s_0 per topic type
- Compute actual (not hypothesized) sessions-to-mastery

### Phase 3 — Regression (Future Session)

- Build logistic regression for band-improvement prediction
- Identify which behavioral features survive with significant coefficients
- Compare actual effect sizes to hypothesized rankings in §4.3

### Phase 4 — May Integration (Future Session)

- Use improvement model to rank May recommendations by predicted effect
- Surface improvement velocity to learners ("You're improving 12 points/session on Cost Management")
- Detect plateau onset 2 sessions before human-noticeable

---

_Version 1.0 — Session 111P Improvement Model_
