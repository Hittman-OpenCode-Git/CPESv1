# Algorithms — Scoring and Analytics

**Purpose:** Single source of truth for all scoring, analytics, and difficulty-preset behavior in the CMA Part 1 Exam Simulator. Every algorithm described here is implemented in `app.js`. Line numbers reference the Session 20 baseline (`6E972362...`).

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Generated:** 2026-07-24 — Session 20

---

## 1. Scoring Algorithms

### 1.1 MCQ Binary Scoring — `scoreMCQ(item, ans)` (app.js:859-885)

**Purpose:** Grade a single MCQ or case item. Returns 1 (correct) or 0 (incorrect).

**Rules:**
- No partial credit for any question type.
- No negative marking (guessing penalty = 0).
- All MCQs equally weighted within the 75% MCQ component.

**Type-specific logic:**

| Type | Grading Rule |
|------|-------------|
| `single` / default | `ans === item.CorrectChoice` → 1, else 0 |
| `multi` | Arrays must be same length AND every element of `item.Correct` present in `ans`. |
| `match` | Every key in `item.Correct` must match the normalized value in `ans`. Normalization: `.trim().toLowerCase().replace(/[$,]/g, '')` |

**Edge cases:**
- `ans` is `undefined` or `null` → 0
- `item` is falsy → 0
- Empty/missing correct answer → 0

---

### 1.2 CBQ Partial Credit — `correctCase(it, ans)` (app.js:1646-1650)

**Purpose:** Grade a single case-study item. Returns boolean (true/false).

**Rules:**
- Same type-specific logic as `scoreMCQ()` but returns boolean instead of 0/1.
- Partial credit per case item — each item scored independently.
- Case total = sum of correct items / total items = fractional case score.

**Normalization function:** `this.norm(x)` — trim, lowercase, strip `$` and `,`.

---

### 1.3 MCQ Gate Logic (app.js:1315-1334)

**Purpose:** Enforce the CMA 50% MCQ threshold before CBQ access.

**Rules:**
- Threshold: `MCQ_GATE_THRESHOLD = 0.50` (app.js:55)
- Active only in `mode === 'full'` (Full Part 1 Simulation).
- Computed: `mcqCorrect / mcqs.length`.
- If `mcqPct < 0.50`: render gate-failed view with Submit/Review buttons + CMA disclaimer.
- Once passed: set `s._mcqGatePassed = true`, never re-check.

**Gate-failed view:** Shows correct count, percentage, CMA disclaimer (compact mode), Submit button (finishes session), Review button (returns to last MCQ).

---

### 1.4 0-500 Scaled Score — `practiceScores(difficultyPreset)` (app.js:1736-1778)

**Purpose:** Produce a CMA-style aggregate score on a 0-500 scale.

**Algorithm:**

```
Step 1: Compute MCQ raw accuracy
  mcqC = Σ scoreMCQ(q, answers[q.QuestionID]) for all q in mcqs
  mcqPct = mcqC / mcqs.length

Step 2: Compute CBQ raw accuracy
  caseC = Σ correctCase(it, caseAnswers[key]) for all items in all cases
  caseT = Σ items.length for all cases
  casePct = caseC / caseT

Step 3: Apply fixed 75/25 weighting (CMA structural rules)
  weighted = mcqPct × 0.75 + casePct × 0.25

Step 4: Apply difficulty calibration (post-weighting)
  preset = DIFFICULTY_PRESETS[difficultyPreset]
  calibrated = mcqPct × preset.mcqFactor × 0.75 + casePct × preset.cbqFactor × 0.25

Step 5: Map to 0-500 linear scale
  scaled = max(0, min(500, round(calibrated × 500 + preset.scaleOffset)))

Step 6: Determine pass/fail
  passed = scaled >= 360
```

**Grade bands:**
| Scaled Score | Grade |
|-------------|-------|
| ≥ 420 | Strong pass range |
| 360–419 | Passing range |
| 300–359 | Near pass range |
| < 300 | Needs substantial review |

**Fallback:** If MCQ or CBQ is absent (count = 0), weighted = (mcqC + caseC) / (mcqs.length + caseT). Calibration is skipped.

---

### 1.5 Difficulty Presets — `DIFFICULTY_PRESETS` (app.js:63-65)

**Purpose:** Small form-difficulty calibration applied after fixed 75/25 weighting. Reflects real CMA equating differences between exam forms without implementing actual equating.

| Preset | MCQ Factor | CBQ Factor | Scale Offset | Effect |
|--------|-----------|-----------|-------------|--------|
| `standard` | 1.00 | 1.00 | 0 | No adjustment |
| `easier` | 0.98 | 0.98 | −8 | Slightly lower scaled score for easier forms |
| `harder` | 1.02 | 1.02 | +8 | Slightly higher scaled score for harder forms |

**Constraints:**
- Calibration is small-magnitude by design (±8 scale points, ±2% factor).
- Does NOT change the MCQ gate threshold.
- Does NOT change the 75/25 weighting.
- Does NOT implement actual CMA equating — the 0-500 is a neutral linear mapping only.

---

### 1.6 Difficulty Distribution — `getDifficultyDistribution()` (app.js:979-990)

**Purpose:** Map the 5-position difficulty slider to Easy/Moderate/Difficult distribution percentages.

| Slider Position | Label | Easy | Moderate | Difficult |
|----------------|-------|------|----------|-----------|
| 1 | Easy | 70% | 25% | 5% |
| 2 | Moderate | 40% | 45% | 15% |
| 3 | Normal (default) | 25% | 40% | 35% |
| 4 | Advanced | 10% | 40% | 50% |
| 5 | Difficult | 5% | 25% | 70% |

**Full Simulation Override:** When mode is `'full'`, all three difficulty levels used equally (~33% each), overriding the slider.

---

## 2. Question Selection Algorithm

### 2.1 Tiered Pool Construction

**Quality scoring — `scoreQuestionQuality(q)` (app.js:139-169):**
| Signal | Score |
|--------|-------|
| ExplanationCorrect ≥ 150 chars | +3 |
| ExplanationCorrect ≥ 60 chars | +1 |
| ExplanationCorrect < 60 chars | −2 |
| All 3 distractor EW ≥ 40 chars | +2 |
| Any distractor EW < 15 chars | −2 |
| Has `question_state` | +1 |
| Has `CitationSource` or `Reference` | +1 |
| Has `pedagogical_cluster` | +1 |
| `_isClonePattern` flag | −2 |

**Tier assignment — `assignTier(q)` (app.js:171-186):**
| State | Tier |
|-------|------|
| `"Certified"` | Tier 1 (eligible) |
| `"Archived"`, `"In Audit"`, `"Editorial Queue"` | Tier −1 (hard-excluded) |
| Quality score ≥ 2 (Unprocessed) | Tier 2 |
| Quality score < 2 (Unprocessed) | Tier 3 |

---

### 2.2 `selectWithDifficultyDistribution()` (app.js:992-1058)

**Purpose:** Select `count` MCQs from the tiered pool, respecting difficulty distribution and deduplicating by concept.

**Algorithm:**
```
For each difficulty level d in [Easy, Moderate, Difficult]:
  target = round(count × distribution[d])
  For each fill-order step (tier, unseen-preference):
    candidates = byTierDiff[tier][d]
    If unseen-preference: filter to items NOT in seen[]
    Deduplicate by UniqueConceptKey, Topic, or QuestionID
    Take up to (target - filled) candidates
    Add to result

If result.length < count:
  Fill remaining from deduplicated shuffle of unused pool items

Final: shuffle and truncate to min(count, pool.length)
```

**Tier fill order:** Tier 1 unseen → Tier 2 unseen → Tier 3 unseen → Tier 1 seen → Tier 2 seen → Tier 3 seen.

---

## 3. Analytics Algorithms

### 3.1 AnalyticsCollector (app.js:461-543)

**Purpose:** Collect per-question performance data during a live session.

**Data collected per MCQ:**
- `timeSpent` (seconds, cumulative across revisits)
- `correct` (true/false/null)
- `confidence` (1-5 rating)
- `flagged` (boolean)
- `guessed` (boolean)

**Data collected per CBQ item:** `correct` (true/false/null)

**Session event log:** Timestamped events for session_submit and other actions.

**Summary computation — `getSummary()`:**
- Total questions, answered count, correct count
- Accuracy = correct / answered
- By-section breakdown (total, correct, time)
- Confidence mismatch count (high confidence + wrong answer)
- Average time per answered question
- Flagged and guessed counts

---

### 3.2 PerformanceAnalytics (app.js:2086-2454)

#### 3.2.1 `computeBreakdown(session)` (app.js:2097-2157)

Builds a hierarchical breakdown:
- **byPack:** A-F, each with mcq_n, mcq_c, cbq_n, cbq_c
- **bySection:** A-F, same structure
- **byTopic:** Named topics, same structure

For each level, computes:
- `mcqPct` = mcq_c / mcq_n
- `cbqPct` = cbq_c / cbq_n
- `tot_n` = mcq_n + cbq_n
- `tot_c` = mcq_c + cbq_c
- `totPct` = tot_c / tot_n

---

#### 3.2.2 `identifyWeakAreas(breakdown, options)` (app.js:2163-2203)

**Parameters:**
- `minAttempts` (default 2) — ignore topics with <2 attempts
- `topN` (default 3) — return top N weakest/strongest

**Returns:**
- `byTopic.weakest` — topics sorted by `totPct` ascending
- `byTopic.strongest` — topics sorted by `totPct` descending
- `byTopic.mcqWeakest` / `cbqWeakest` — type-specific weak areas
- `byTopic.limitedData` — topics filtered out by minAttempts
- `bySection` — sections sorted by `totPct` ascending

---

#### 3.2.3 `generateRemediationPlan(breakdown, history, sc)` (app.js:2209-2302)

Six rules evaluated in priority order:

| # | Rule | Condition | Priority |
|---|------|-----------|----------|
| 1 | CBQ gap | `mcqPct - cbqPct >= 0.15` (MCQ% exceeds CBQ% by 15+ points) | High |
| 2 | Weak topics | Any topic with `totPct < 0.60` and ≥2 attempts | High |
| 3 | Borderline score | `scaled >= 340 && scaled <= 378` | High |
| 4 | MCQ gate not met | `mcqPct < 0.50` | High |
| 5 | Score volatility | Range ≥ 50 across recent history | Medium |
| 6 | Strategy note | Pass trend (always included) | Info |

---

#### 3.2.4 `summarizeHistoryTrend(history)` (app.js:2308-2375)

**Parameters:** `history` array (most recent first).

**Computations:**
- **Latest score:** `history[0].scaledScore`
- **Best score:** `max(scaledScore across all entries)`
- **Rolling average:** mean of last `min(5, length)` scores
- **Baseline average:** mean of scores beyond rolling window
- **Delta:** rollingAvg - baselineAvg
- **Direction:** `improving` if delta ≥ 5, `declining` if delta ≤ −5, else `flat`
- **Gate pass rate:** `gatePassed / gateTotal × 100`
- **Pass rate (360+):** `passCount / passTotal × 100`
- **Difficulty-aware averages:** per-preset (easier/standard/harder) mean scores
- **Difficulty counts:** per-preset session counts

**Returns:** Object with all computed metrics + `recentScores` (last 10).

---

### 3.3 AdaptiveReviewQueue (app.js:1971-2084)

**Purpose:** Generate a priority-sorted list of items for review after session completion.

**Scoring weights:**

| Condition | Weight |
|-----------|--------|
| Answered incorrectly | +5 |
| Guessed | +3 |
| Low confidence (≤2) | +2 |
| Flagged | +1 |
| Correct with high confidence (≥4) | +0 |

**Sort:** Descending by total score. Higher score = higher review priority.

**Queue filters:**
- `missed` — incorrect answers only
- `marked` — flagged items only
- `priority` — score > 0 (default)
- `all` — entire queue

---

### 3.4 PerformanceDashboard (app.js:2459-2566)

**Purpose:** Render an accumulated performance view from all saved history.

**Data sources:**
- `SessionPersistence.getDashboard()` — most recent session summary
- `SessionPersistence.getHistory()` — full history array (up to 100 entries)

**Displayed metrics:**
- Overall accuracy and count
- MCQ gate pass rate (across all history)
- Section performance (weakest → strongest)
- Topic performance (sorted grid with colored bars)
- Trend chart (latest, best, rolling avg, direction, delta)
- Difficulty comparison (averages by form difficulty)
- Session history list (mode, accuracy, scaled score)

---

### 3.5 Denominator and Active-Pack Coverage (S26)

**Default BCDE runtime:** Standard analytics and denominators assume packs B, C, D, and E are the active packs. The certified pool denominator for default sessions is ~874 (1,078 total Certified − 204 Pack A Certified = 874 in BCDE).

**Pack A practice-only mode:** When the user explicitly opts in to Pack A via the setup-form checkbox (Policy B — S26), the session pool expands to include Pack A. Analytics sessions with Pack A included should:
- Be labeled with `activePacks = BCDEA` (distinguishable from default BCDE runs)
- Be treated as extended-coverage sessions
- Use the full 1,078 Certified denominator

**Session-history flagging:** The `saveHistory()` function captures the active pack set. When Pack A is included, the history entry's `packs` field reflects this, enabling retrospective filtering of BCDE-only vs. BCDEA sessions in the PerformanceDashboard.

**Blueprint coverage expansion:** Including Pack A adds 204 Certified items from Sections A (financial reporting) and E (internal controls), broadening topic coverage especially in the financial reporting domain.

---

## 4. Session Persistence

### 4.1 `saveHistory()` (app.js:769-815)

**Purpose:** Persist session results to localStorage on completion.

**Stored data per session:**
- Date (ISO 8601)
- Mode, MCQ count, correct count, case count, sections, duration
- Scaled score (from `practiceScores()`)
- Accuracy (from `AnalyticsCollector.getSummary()`)
- By-section breakdown
- MCQ percentage, CBQ percentage
- MCQ gate passed (boolean)
- Difficulty preset used
- Grade label
- CBQ correct/total counts
- Topic snapshot (top 30 topics with n, c, pct, mcqPct, cbqPct)

**Seen tracking:** QuestionIDs and CaseIDs added to `cmaP1Seen` on each session. Used for unseen-preference in question selection.

**History cap:** 100 entries (oldest trimmed).

---

## 5. Governance Notes

### 5.1 Algorithm-Implementation Relationship

All algorithms described in this document are implemented in `app.js`. This document captures the design intent. The app.js source is authoritative for runtime behavior.

### 5.2 CMA Alignment Disclaimer

The algorithms mirror CMA exam structure (MCQ gate, 75/25 weighting, 0-500 scale, difficulty variation) but do **NOT** implement actual CMA equating methodology. The IMA uses proprietary equating procedures that are not publicly disclosed. The simulator's 0-500 scale is a neutral linear mapping using fixed weights and small-form calibration — it is intended for practice estimation, not official score prediction.

This disclaimer is rendered to learners via `CmaScoringDisclaimer()` (app.js) in both full and compact modes.

### 5.3 Constraints on Future Modifications

| Component | Constraint |
|-----------|-----------|
| MCQ binary scoring | Must remain 0/1 binary. No partial credit. No negative marking. |
| 75/25 weighting | Must remain fixed. CMA structural rules. |
| 0-500 scale | Must remain linear with 360 passing threshold. |
| Difficulty presets | May be tuned but must remain small-magnitude. |
| MCQ gate | Must remain at 50%. |
| Question selection | Tiered approach may be enhanced. Dedup and unseen-preference are design choices, not CMA constraints. |

---

## 6. Key Line References (app.js — Session 20 Baseline)

| Component | Lines |
|-----------|-------|
| `MCQ_GATE_THRESHOLD` | 55 |
| `DIFFICULTY_PRESETS` | 63–65 |
| `scoreQuestionQuality()` | 139–169 |
| `assignTier()` | 171–186 |
| `AnalyticsCollector` | 461–543 |
| `saveHistory()` | 769–815 |
| `scoreMCQ()` | 859–885 |
| `getDifficultyDistribution()` | 979–990 |
| `selectWithDifficultyDistribution()` | 992–1058 |
| MCQ gate check | 1315–1334 |
| `correctCase()` | 1646–1650 |
| `practiceScores()` | 1736–1778 |
| `renderSummary()` | 1783–1887 |
| `AdaptiveReviewQueue.generate()` | 1971–2033 |
| `PerformanceAnalytics.computeBreakdown()` | 2097–2157 |
| `PerformanceAnalytics.identifyWeakAreas()` | 2163–2203 |
| `PerformanceAnalytics.generateRemediationPlan()` | 2209–2302 |
| `PerformanceAnalytics.summarizeHistoryTrend()` | 2308–2375 |
| `PerformanceDashboard.render()` | 2459–2566 |
| `updateSliderNote()` | 2679–2686 |

---

*Generated: 2026-07-24 — Session 20*
*Updated: 2026-07-24 — Session 33 (Readiness & Study Plan documentation added)*

---

## 7. Readiness Modeling & Study Plan Layer

### 7.1 Position in the Architecture

The readiness-modeling and study-plan layer sits architecturally **above** the scoring and analytics layer (§1–§3). It is a descriptive, derived layer that consumes analytics output — scaled scores (0–500), trend summaries (rolling average, direction, delta), topic performance (by-section, by-topic accuracy), MCQ/CBQ splits, gate pass rates, and difficulty-preset averages — but does **not** modify scoring logic, weighting, or answer-key determination. The layer is read-only with respect to the scoring engine: it reads from the analytics layer but never writes to it or modifies any scoring parameter.

```
Scoring & Analytics (§1–§3)
  → ReadinessModel.compute() (§7.2)
    → generateStudyPlan() (§7.3)
      → UI rendering (Dashboard + Results)
```

The readiness/study-plan layer is purely a convenience for the learner — it synthesizes past performance data into a band assignment and study suggestions. It does not alter question selection, affect scoring, or influence the exam simulation experience in any way.

#### 7.1.1 Relationship to CMA Preparation

The simulator's study plan is a **lightweight advisor** — it prioritizes session types (MCQ Drills, CBQ Practice, Full-Length Simulations, Error Log Review) and recommends focus topics based on past performance within the simulator. It is **not** a replacement for a full CMA review course. Real CMA preparation typically involves:

- Structured study schedules spanning several months
- Substantial study-hour commitments (per IMA guidance, successful candidates often report 150–170 hours per Part)
- Comprehensive review materials covering the entire CMA Content Specification Outline
- Practice with a variety of question formats and case-study scenarios

The simulator's study plan complements, but does not replace, these broader preparation norms. Candidates should use it as one input among many in their overall study strategy.

#### 7.1.2 Readiness Band Disclaimer

Readiness bands (Below Target / Approaching Target / At Target / Above Target) are **internal simulator constructs** based on the candidate's past performance within this simulator. They are:

- **Descriptive, not predictive** — bands reflect historical performance, not a forecast of future exam-day outcomes
- **Simulator-internal** — bands are computed from the simulator's own scoring scale (0–500), which is a neutral linear mapping and does not implement actual CMA equating methodology
- **Not official CMA readiness levels** — the IMA does not publish readiness bands, and the simulator's bands should not be interpreted as an official IMA readiness measure

The standard CMA scoring disclaimer is rendered alongside all readiness outputs to reinforce this boundary.

### 7.2 ReadinessModel

**File:** `app.js:2473–2678`

Computes a candidate readiness band from accumulated session history. Requires a minimum of 3 sessions. Produces four bands:

| Band | Criteria (simplified) |
|------|----------------------|
| ABOVE_TARGET | avgScore ≥ 380, passRate ≥ 60%, cbqAvg ≥ 60, harder-form average ≥ 340, trend not declining |
| AT_TARGET | avgScore ≥ 360, gateRate ≥ 70%, cbqAvg ≥ 50 |
| APPROACHING_TARGET | avgScore ≥ 320, gateRate ≥ 50, trend improving or recentAvg ≥ 330 |
| BELOW_TARGET | avgScore < 320 or gateRate < 40, or insufficient data |

The model also computes 14 supporting metrics (best score, latest score, recent scores, coverage count, pass rate, gate pass rate, trend direction/delta, CBQ average, difficulty-preset averages, session counts).

### 7.3 generateStudyPlan

**File:** `app.js:2679–2826`

Generates a band-specific personalized study plan containing:
- **Focus topics:** 5 weakest topics (accuracy < 60%, min 2 attempts)
- **Reinforce topics:** 3 strongest topics (accuracy ≥ 75%)
- **Difficulty strategy:** band-specific recommendation (Standard → Harder mix ratios)
- **Session types:** 3 prioritized session goals per band (MCQ Drills, CBQ Practice, Full-Length Simulations, Error Log Review)
- **Timeframe:** band-specific estimate (1–2 weeks for Above Target, 4–6 weeks for Below Target)
- **Summary:** one-line band-specific guidance text

### 7.4 Scoring-Layer Invariants

Readiness modeling and study-plan generation do not alter:

- 0–500 scaled score formula (§1.4)
- 360 passing threshold (§1.4)
- 75/25 MCQ/CBQ weighting (§1.4)
- Binary MCQ scoring (§1.1)
- MCQ gate threshold (50%, §1.3)
- Difficulty presets (§1.5)
- Question selection algorithm (§2)
- Analytics collector (§3.1)
- Performance analytics (§3.2)

These features are purely derived outputs — they read from the analytics layer but never write to it or modify any scoring parameter.

### 7.5 Governance Notes

- All readiness and study-plan UI renders include the standard CMA scoring disclaimer.
- The minimum-session gate (`MIN_SESSIONS = 3`) is a design choice based on statistical reliability — fewer than 3 sessions are considered insufficient for a meaningful band assignment.
- Topic-level study-plan data comes from `topicSnapshot` in `saveHistory()` (§4.1). Sessions completed before this feature was added have no per-topic data; the study plan degrades gracefully to band-level guidance only.

### 7.6 Key Line References

| Component | Lines (app.js) |
|-----------|---------------|
| `ReadinessModel` object | 2475–2678 |
| `ReadinessModel.compute()` | 2499–2596 |
| `ReadinessModel._determineBand()` | 2598–2635 |
| `ReadinessModel.renderReadinessCard()` | 2637–2678 |
| `generateStudyPlan()` | 2681–2770 |
| `generateStudyPlan._generateSummary()` | 2772–2780 |
| `generateStudyPlan.renderStudyPlanCard()` | 2782–2817 |
| `generateStudyPlan.renderResultSnippet()` | 2819–2826 |
| Dashboard integration | 2904–2929 |
| Result-view integration | 1797–1879 |

---

*Generated: 2026-07-24 — Session 20*
