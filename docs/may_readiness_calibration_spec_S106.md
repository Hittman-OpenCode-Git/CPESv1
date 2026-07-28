# May Readiness Calibration Spec — Session 106 (Spec Only — No Threshold Changes)

**Version:** S106-1.0
**Status:** Design spec for future implementation (S107+)
**Authority:** Session 106 mandate; AGENTS.md governance
**Scope:** Readiness thresholds only — no content, no scoring, no tutoring behavior

---

## 1. Purpose

This document defines the calibration plan for May's 12 readiness thresholds. All thresholds are currently set to conservative, scenario-validated values with zero real learner data. When anonymized learner-state dumps become available (via `May.exportProgress()`), this spec guides the empirical calibration of each threshold — one at a time, with full regression testing, documentation, and modelVersion bump.

**No thresholds change in Session 106.** This is purely a design/plan document. Implementation begins in S107+.

---

## 2. Threshold Inventory

Each threshold is tunable, conservative, and reversible. Values are applied in `getReadinessSummary()` within `may-learner-state.js` and exposed via `_provenance.thresholdsApplied`.

| # | Threshold | Current Value | What It Controls | Applied In | Sensitivity |
|---|-----------|--------------|------------------|-----------|-------------|
| 1 | **accuracyHigh** | 80 | Minimum topic accuracy (%) for "Ready for focused review" band | `getReadinessSummary()` L603 | **HIGH** — raising this reduces Ready counts significantly |
| 2 | **accuracyGood** | 75 | Minimum topic accuracy (%) for "Approaching review-ready" band | `getReadinessSummary()` L607 | **HIGH** — determines width of Approaching band |
| 3 | **accuracyLow** | 60 | Threshold below which accuracy alone triggers "Recovery needed" signal | `getReadinessSummary()` L618 | **MEDIUM** — affects Recovery classification boundary |
| 4 | **stabilityHigh** | 80 | Minimum stability (%) for "Ready" band (consistency of recent correct/incorrect pattern) | `getReadinessSummary()` L604 | **HIGH** — compensates for accuracy; high stability + high accuracy = Ready |
| 5 | **stabilityGood** | 60 | Minimum stability (%) for "Approaching" band | `getReadinessSummary()` L608 | **MEDIUM** — gates Approaching when accuracy is high enough |
| 6 | **stabilityLow** | 50 | Threshold below which stability triggers "Recovery needed" signal ("unstable") | `getReadinessSummary()` L620 | **LOW** — rarely the sole driver of Recovery |
| 7 | **recentPctHigh** | 80 | Minimum recent-attempt accuracy (%) for "Ready" band | `getReadinessSummary()` L603 | **HIGH** — prevents stale-high-accuracy topics from being Ready |
| 8 | **recentPctGood** | 70 | Minimum recent-attempt accuracy (%) for "Approaching" band | `getReadinessSummary()` L607 | **MEDIUM** — gates Approaching when recent performance dips |
| 9 | **minAttemptsReady** | 6 | Minimum total attempts before a topic can reach "Ready for focused review" | `getReadinessSummary()` L604 | **HIGH** — raising this reduces Ready counts; lowered in S103 from 5→6 |
| 10 | **minAttemptsApproaching** | 4 | Minimum total attempts before a topic can reach "Approaching review-ready" (added S104) | `getReadinessSummary()` L608 | **MEDIUM** — controls early-stage topic classification |
| 11 | **minAttemptsTopic** | 3 | Minimum attempts before a topic gets any readiness estimate (<3 = "Not enough data") | `getReadinessSummary()` L591 | **LOW** — raising this delays all topic readiness estimates |
| 12 | **caseBurdenDegrade** | totalMisses ≥ 4 | Minimum case misses before worsening case patterns can degrade overall band from "Approaching" to "Developing" | `getReadinessSummary()` L708 | **MEDIUM** — threshold for triggering case-burden degradation |

### Sensitivity Definitions

- **HIGH**: Changing this threshold by ±5 points or ±1 attempt shifts ≥10% of topic band assignments in synthetic scenarios.
- **MEDIUM**: Changing this threshold shifts 3-10% of band assignments.
- **LOW**: Changing this threshold shifts <3% of band assignments; rarely the sole determinant of any band.

---

## 3. Data Sources for Calibration

### 3.1 Learner Data Capture

May records every question attempt via `MayLearnerState.recordAttempt()`, storing:
- Per-attempt: QID, section, topic, subtopic, difficulty, difficultyScore, itemType, cognitiveLevel, questionState, correct, hintsUsed, explanationRequested, elapsedMs, selectedChoice, confidence, timestamp
- Per-session: sessionId, date, mode, totalQuestions, correctCount, mcqPct, casePct, scaledScore, grade, passed, topicSnapshot, casePatterns
- Per-topic aggregate: totalAttempts, correctCount, hintCount, recentAttempts (last 15), sectionsSeen, difficultyDistribution, difficultyWeights

### 3.2 Export Format

`May.exportProgress()` produces a JSON blob with the full `MayLearnerState` data structure:
```json
{
  "learnerId": "learner-<timestamp36>",
  "userName": "string or null",
  "firstVisit": "ISO-8601",
  "sessions": [{ sessionId, date, mode, totalQuestions, correctCount, attempts: [...], mcqPct, casePct, scaledScore, grade, passed, topicSnapshot, casePatterns }],
  "topicPerformance": { "Topic Name": { totalAttempts, correctCount, hintCount, recentAttempts: [...], sectionsSeen: [...], difficultyDistribution: {...}, difficultyWeights: {total, sum} } },
  "subtopicPerformance": { ... },
  "misconceptionPatterns": [{ pattern, count, questionIds, _topics, firstSeen, lastSeen }],
  "sessionSummaries": [{ sessionId, date, mode, scaledScore, mcqPct, casePct, grade, passed, topicSnapshot, casePatterns }],
  "challengedQids": [{ qid, firstChallenged, lastChallenged, count, status, lastText }],
  "recommendationLog": [{ timestamp, sourceTopic, reasonType, recommendedQids, ... }],
  "lastUpdated": "ISO-8601"
}
```

### 3.3 Calibration Data Requirements

**Minimum sample for initial calibration:** N ≥ 10 anonymized learner-state exports, each with:
- ≥ 3 completed sessions
- Combined ≥ 50 question attempts across ≥ 5 distinct topics
- At least 1 session with case-study performance data

**Ideal sample:** N ≥ 30 exports, ≥ 5 sessions each, ≥ 100 attempts, ≥ 10 topics, ≥ 2 case sessions.

### 3.4 Collection Process (Future — S107+)

1. Learners use the CMA Part 1 simulator in practice mode.
2. Learners export progress via May's "Export progress" button.
3. Exports are anonymized (userName stripped, learnerId replaced with sequential anonymous ID).
4. Exports are stored in a calibration data directory.
5. A calibration harness script (`scripts/calibrate_readiness.js`) reads all exports, runs `getReadinessSummary()` on each, and produces aggregate statistics.

---

## 4. Five-Step Calibration Loop

This elaborates the 5-step approach documented in the S105 comment block (may-learner-state.js L956-960).

### Step 1: Collect Real Learner Data

- Gather N anonymized learner-state exports.
- Validate each export: verify it parses, has sessions, has topicPerformance entries.
- Exclude exports with <2 sessions or <20 total attempts (insufficient signal).
- Log excluded count and reasons.

### Step 2: Compute Readiness Metrics

For each export:
1. Run `MayLearnerState.load()` with the export data.
2. Run `getReadinessSummary()`.
3. Record:
   - Overall band and confidence
   - Per-topic band, accuracy, recentPct, attempts, direction, stability
   - Case readiness band, dominant pattern, dominant trend
   - _provenance.thresholdsApplied (to confirm which threshold set was used)

Aggregate across all exports:
- Distribution of overall bands: % Ready, % Approaching, % Developing, % Recovery, % Not enough data
- Distribution of per-topic bands
- Mean/median topic accuracy per band
- Correlation between readiness band and actual session scores (mcqPct, scaledScore)

### Step 3: Compare Predicted Readiness to Observed Performance

Identify misalignment patterns:

| Misalignment Pattern | Signal | Possible Threshold Adjustment |
|---------------------|--------|-------------------------------|
| Topics labeled "Ready" but learner scored <70% in recent sessions | False positive — threshold too low | Raise accuracyHigh, recentPctHigh, or minAttemptsReady |
| Topics labeled "Recovery needed" but learner scored >80% | False negative — threshold too high | Lower accuracyLow or stabilityLow |
| Too many topics in "Not enough data" (e.g., >50% of topics) | minAttemptsTopic too high relative to real session lengths | Lower minAttemptsTopic from 3→2 (with caution) |
| Too many topics in "Ready" (e.g., >40%) with modest performance | accuracyHigh/recentPctHigh too permissive | Raise by 5 points |
| Case-burden degradation firing on benign patterns | caseBurdenDegrade threshold too low | Raise from ≥4 to ≥6 misses |
| "Approaching" band rarely reached (<5% of topics) | accuracyGood or minAttemptsApproaching too strict | Lower accuracyGood, recentPctGood, or minAttemptsApproaching |

Quantitative criteria:
- **Acceptable false positive rate:** <10% of "Ready" topics with actual session accuracy <70%
- **Acceptable false negative rate:** <15% of "Recovery needed" topics with actual session accuracy >75%
- **Target band distribution:** "Not enough data" <30%, "Recovery needed" <20%, "Developing" 30-50%, "Approaching" 10-20%, "Ready" 5-15%

### Step 4: Propose Threshold Nudges

Rules:
1. **Change ONE threshold at a time.** No batch adjustments.
2. **Nudge in small increments:**
   - Accuracy/stability thresholds: ±5 points per cycle
   - Attempt-count thresholds: ±1 per cycle
   - Case-burden threshold: ±2 misses per cycle
3. **Document the rationale:**
   - Which misalignment pattern triggered the change
   - Before/after band distribution on the calibration dataset
   - Expected effect on the scenario matrix (8 archetypes)
4. **Run full test suite before adoption:**
   - `scripts/test_readiness.js` (30 tests) — must all pass
   - Governance guard tests — must all pass
   - No new test failures introduced
5. **Bump modelVersion:**
   - e.g., S104-1.0 → S107-1.0
   - Update in both `getReadinessSummary()._provenance.modelVersion` and `getSectionReadinessSummary().modelVersion`

### Step 5: Validate Before Adoption

Before committing any threshold change:
1. Run full test suite (all 5 suites, currently 216 tests).
2. Re-validate scenario matrix (8 archetypes): sparse-data, strong, below-threshold, weak-declining, multi-strong, mixed, empty-section, differentiating-sections.
3. Verify no new "Ready" inflation: count of Ready topics must not increase by >20% in a single cycle.
4. Verify no loss of safety signals: all existing recovery detection must still fire.
5. Document in `knowledge/REVISION_HISTORY.md` with:
   - Which threshold changed, from what to what
   - Before/after band distributions
   - Test results
   - New modelVersion

---

## 5. Known Limitations (Expanded)

### L1: Case Trend Detection with <3 Sessions
`getCasePatternTrends()` slices sessions at `slice(-4, -2)` for the prior window and `slice(-2)` for recent. With ≤2 case sessions, the prior window is empty, causing all deltas to appear as worsening. **Impact:** Case-burden degradation may fire prematurely on learners with only 2 case sessions. **Mitigation:** The degradation logic requires ≥4 total misses AND a worsening dominant pattern — single-session learners won't trigger it since `getCasePatternTrends()` has <2 sessions with case data.

### L2: No Real Learner Data
All 12 thresholds were set using synthetic scenario validation (8 archetypes seeded via `seedTopic()`). Synthetic data can't capture: real response-time distributions, real confidence calibration patterns, real difficulty-level mixing, real session-to-session variability, or real topic interleaving effects. **Impact:** Thresholds may be misaligned with real learner behavior. **Mitigation:** This entire calibration spec exists to address this limitation once real data is available.

### L3: Topic→Section Mapping via sectionsSeen
Topics are mapped to CMA Part 1 sections (A–F) via the `sectionsSeen` array on each topic aggregate, which is populated from `question.Section` during `recordAttempt()`. Some topics may appear in multiple sections (e.g., "Cost Behavior" in both C and D), but the mapping depends entirely on which questions the learner has seen. **Impact:** Section readiness for a section may miss topics that belong there but haven't been practiced yet. **Mitigation:** All section-level bands are labeled "Developing" when >50% of section topics are sparse — this conservative default prevents false confidence.

### L4: Confidence Not Integrated into Readiness
`getConfidenceCalibration()` tracks overconfidence and underconfidence per topic, but these signals are NOT used in readiness band computation. **Impact:** A learner who scores 85% but is consistently overconfident (rating themselves 5/5) may get a "Ready" label despite a calibration problem. **Mitigation:** Confidence is surfaced in progress/weakness insights but does not affect readiness bands. Future calibration cycles could integrate calibrationDelta as a readiness signal.

### L5: Single Difficulty Level in Most Seeding
The `seedTopic()` helper sets all attempts to "Moderate" difficulty. Real learners see Easy through Very Difficult. **Impact:** Synthetic validation can't test whether difficulty distribution affects readiness (e.g., a topic with 80% accuracy but only Easy questions should not be "Ready"). **Mitigation:** The `difficultyDistribution` and `difficultyWeights` fields exist on every topic aggregate but are not yet used in readiness band logic. Future calibration could incorporate difficulty weighting.

---

## 6. DO NOT Constraints (Expanded)

| # | Constraint | Rationale | Enforcement |
|---|-----------|-----------|-------------|
| 1 | **Never tune thresholds to inflate readiness counts** | Readiness must reflect real preparedness, not desired metrics | Every threshold change must cite specific calibration data, not a target Ready % |
| 2 | **Never add global "exam ready" labels** | CMA readiness is per-topic, per-section; global labels imply prediction | Code review gate; `_provenance` surfaces must say "no exam prediction" |
| 3 | **Never reduce caution without empirical evidence** | Conservative defaults protect learners from false confidence | Threshold can only move downward with ≥3 independent learner-state dumps showing the current threshold is too strict |
| 4 | **Never change case-burden degradation rules without multi-session validation** | Case pattern trends are noisy; degradation is irreversible once applied | Require ≥3 case sessions in calibration dataset before touching caseBurdenDegrade |
| 5 | **Never change more than one threshold per calibration cycle** | Isolates effect of each change for clear attribution | Code review gate; REVISION_HISTORY.md must list exactly one threshold change per entry |
| 6 | **Never calibrate without bumping modelVersion** | Traceability — every readiness result must be attributable to a specific threshold set | `_provenance.modelVersion` and `getSectionReadinessSummary().modelVersion` must be bumped together |
| 7 | **Never skip regression tests** | Threshold changes can cascade through band assignment logic unexpectedly | Full test suite (all 5 files) must pass before any calibration cycle is closed |
| 8 | **Never calibrate on less than N=10 learner exports** | Small samples produce unstable threshold estimates | Calibration harness must enforce minimum sample size |

---

## 7. Implementation Roadmap

**Session 106 (current):** Spec only. No code changes.

**Session 107:** Build calibration harness
- Create `scripts/calibrate_readiness.js`
- Reads N exported JSON files from a calibration directory
- Runs `getReadinessSummary()` on each
- Produces aggregate band distribution, misalignment report, and threshold recommendations
- Does NOT apply any changes — outputs a report for human review

**Session 108:** First calibration cycle (if real data available)
- Run harness on real learner data
- Identify highest-priority threshold adjustment
- Apply one threshold change, bump modelVersion
- Run full test suite, validate scenario matrix
- Document in REVISION_HISTORY.md

**Session 109:** Second calibration cycle + holdout validation
- Second threshold adjustment (if needed)
- Validate calibrated thresholds against holdout set (exports not used in calibration)
- Compare band distributions before/after calibration

**Session 110:** Threshold stability verification
- Run calibration harness on full dataset
- Confirm no threshold needs further adjustment
- Document final calibrated threshold set as the "S110 baseline"

---

## 8. Appendix: Threshold Code Locations

All thresholds are applied in `getReadinessSummary()` within `may-learner-state.js`.

| Threshold | Exact Code Location | Lines |
|-----------|-------------------|-------|
| accuracyHigh (80) | `accuracy >= 80` in Ready condition | L603 |
| accuracyGood (75) | `accuracy >= 75` in Approaching condition | L607 |
| accuracyLow (60) | `accuracy < 60` in Recovery signal | L618 |
| stabilityHigh (80) | `stability >= 80` in Ready condition | L604 |
| stabilityGood (60) | `stability >= 60` in Approaching condition | L608 |
| stabilityLow (50) | `stability < 50` in Recovery signal | L620 |
| recentPctHigh (80) | `recentPct >= 80` in Ready condition | L603 |
| recentPctGood (70) | `recentPct >= 70` in Approaching condition | L607 |
| minAttemptsReady (6) | `attempts >= 6` in Ready condition | L604 |
| minAttemptsApproaching (4) | `attempts >= 4` in Approaching condition | L608 |
| minAttemptsTopic (3) | `attempts < 3` → "Not enough data" | L591 |
| caseBurdenDegrade (≥4) | `caseSummary.totalCaseMisses >= 4` | L708 |

These values are also recorded in `_provenance.thresholdsApplied` at L778-786 and in the S105 calibration hooks comment block at L949-953.

---

*End of calibration spec. No thresholds changed in S106. Implementation begins S107+.*
