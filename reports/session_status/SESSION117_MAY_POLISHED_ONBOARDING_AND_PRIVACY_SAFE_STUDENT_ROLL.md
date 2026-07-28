# Session 117 — May Polished Onboarding, Privacy-Masked Student Roll, and Seeded Learner History

**Date:** 2026-07-25
**Status:** Complete
**Type:** Pre-production May development — product polish, privacy masking, exam-date onboarding, encouragement tone, and seeded synthetic learner history. 248/248 tests PASS. No thresholds changed.

---

## Executive Summary

| Item | Value |
|------|-------|
| **Session Status** | Complete |
| **Pre-flight Tests** | 218/218 PASS (S115 baseline) |
| **Post-flight Tests** | 248/248 PASS (119 Stage C + 37 readiness + 18 calibration + 74 tutoring safety) |
| **S117 Tests Added** | 30 new tests (6 PRIV + 7 EXAM + 6 SEED + 5 WELC + 3 ENCR + 3 NO-REGRESS) |
| **Files Changed** | 2 source + 1 test |
| **Thresholds Changed** | No |
| **modelVersion** | S111-1.0 (unchanged) |

---

## 1. Product Behavior Delivered

### 1.1 Privacy-Masked Student Roll

`May.maskStudentName(displayName)` masks middle characters:
- Avery Pilot → A***y P***t
- Jordan Sample → J****n S****e
- Morgan Demo → M****n D**o
- Riley Practice → R***y P******e
- Taylor Sandbox → T****r S*****x
- Casey Trial → C***y T***l
- Quinn Sim → Q***n S*m
- Parker Test → P****r T**t

All 8 synthetic students masked in the roll UI. Selection via `learnerId` loads correct full profile. Full names never rendered before selection.

### 1.2 Refined Onboarding Greeting

New initial greeting replaces "Welcome back — have we met before?":

```
Hi, I'm May — your CMA Part 1 practice coach.
To personalize your review, let's get you set up.
Have you practiced with me before?
```

Button text: "Yes — choose my name from the roll" / "No — enroll me as a new student"

### 1.3 Exam-Date Onboarding Flow

After student selection, May asks "Do you already have a CMA exam scheduled?" with three paths:

| Path | Flow | Stored Fields |
|------|------|--------------|
| Yes | → Exam part (Part 1/Part 2/Both) → Exam date | `hasScheduledExam: true, examPart, examDate` |
| No | → Done immediately | `hasScheduledExam: false` |
| Planning | → Planned part → Target window | `planningExam: true, plannedExamPart, targetDateOrWindow` |

Exam date used for encouragement only — days-until-exam computed, encouragement tuned to timeframe. No pass/fail predictions.

Storage: `MayLearnerState.setExamPlan(plan)` / `getExamPlan()`. Field `examPlan` added to learner profile schema.

### 1.4 Welcome-Back Overview

After student selection, `_buildWelcomeOverview()` composes a structured welcome:
1. **Personalized welcome** with full display name
2. **Positive trend detection** — uses improvement clusters, stability, hint-usage decrease
3. **Strengths and opportunities** — evidence-backed, no discouraging language
4. **Next best action** — context-aware (recovery set / timed practice / baseline session)
5. **Pre-production disclaimer**

### 1.5 Encouragement Tone

All output follows S111 safety vocab + S117 encouragement guidelines:
- Specific data references ("Your recent accuracy in budgeting is 78%")
- Gaps framed as opportunities ("Your next opportunity is building consistency in...")
- Momentum language ("You're trending in the right direction")
- **No** exam-prediction language, "exam ready," "guaranteed to pass," or discouragement

### 1.6 Seeded Synthetic Learner History

All 8 synthetic student profiles now include complete `_learnerState` via `MayLearnerState.seedStudentHistory()`:

| Student | Sessions | Topics Covered | Accuracy Pattern |
|---------|----------|---------------|-----------------|
| Avery Pilot | 2 | Financial statements, Planning & budgeting | Low (55-60%), sparse |
| Jordan Sample | 8 | Financial statements, Variance, Cost behavior, Controls | Improving (65→78%) |
| Morgan Demo | 6 | Budgeting, Cost behavior, Financial statements | Persistent weakness in budgeting (45%) |
| Riley Practice | 5 | Cost behavior, Standard costing | Hint-dependent (2.3 avg), difficulty-sensitive |
| Taylor Sandbox | 7 | Controls, COSO, Tech & analytics | Asymmetric (85% controls / 50% tech) |
| Casey Trial | 4 | Performance management, Forecasting | Hint usage increasing (20%→70%) |
| Quinn Sim | 6 | Financial statements, Cost behavior, Controls | Unstable (accuracy swings 40-85%) |
| Parker Test | 10 | Financial statements, Variance, Controls, Cost | Strong MCQ (78-85%), sparse case |

Each `_learnerState` has `historySynthetic: true` and follows exact `recordAttempt` structure — sessions, attempts, topicPerformance aggregates.

---

## 2. Source Changes

### may-core.js (+~250 lines)

- `maskStudentName(displayName)` — new privacy helper (line 183)
- `_buildWelcomeOverview(student)` — evidence-backed welcome composer (line 257)
- `_detectPositiveTrend(clusters, trends, data)` — positive trend detection (line 299)
- `_recommendNextAction(clusters, data)` — context-aware action recommendation (line 322)
- `_handleOnboardingResponse(action, value)` — exam-date SM dispatcher (line 337)
- `_finalizeOnboarding(plan)` — saves examPlan to profile (line 397)
- `_daysUntilExam(dateStr)` — encouraging time-based message (line 403)
- `_getSeedData(learnerId)` — deterministic session data per archetype (line 560)
- `renderView()` — greeting copy updated, roll masking applied, onboarding buttons
- `_selectStudentFromRoll()` — welcome overview + onboarding trigger
- `_generateSyntheticStudentRoll()` — calls `seedStudentHistory` for each student
- Context fields: `onboardingStep`, `onboarding_temp` added

### may-learner-state.js (+~30 lines)

- `getExamPlan()` / `setExamPlan(plan)` — exam-plan persistence
- `examPlan: null` in `_default()` schema
- `seedStudentHistory(opts)` — creates complete learner state from sessions

### scripts/test_may_stagec.js (+~340 lines, 30 new S117 tests)

19 → 119 tests (30 S117 tests added, 65→119 total for Stage C)

---

## 3. Test Results

### 3.1 Post-Flight Full Suite

| Suite | Tests | Result |
|-------|-------|--------|
| test_readiness.js | 37 | 37 PASS |
| test_calibration.js | 18 | 18 PASS |
| test_tutoring_safety.js | 74 | 74 PASS |
| test_may_stagec.js | 119 | 119 PASS (89 S115/S116 + 30 S117) |
| **Total** | **248** | **248 PASS** |

### 3.2 S117 Targeted Tests (30 new)

| Category | Count | Result |
|----------|-------|--------|
| PRIV-01 to PRIV-06: Privacy masking | 6 | 6 PASS |
| EXAM-01 to EXAM-07: Exam-date onboarding | 7 | 7 PASS |
| SEED-01 to SEED-06: Seeded learner history | 6 | 6 PASS |
| WELC-01 to WELC-05: Welcome-back overview | 5 | 5 PASS |
| ENCR-01 to ENCR-03: Encouragement tone | 3 | 3 PASS |
| NO-REGRESS-01 to NO-REGRESS-03: Regression | 3 | 3 PASS |

---

## 4. Threshold and modelVersion Confirmation

| Check | Value | Status |
|-------|-------|--------|
| stabilityHigh | 75 | Unchanged |
| accuracyGood | 75 | Unchanged |
| All 12 thresholds | S111 values | Unchanged |
| modelVersion | S111-1.0 | Stable |

---

## 5. Pack/Case/Scoring Integrity

| Check | Result |
|-------|--------|
| Pack A-E 500/500 items | Unchanged (no writes) |
| Certified pool 2,179 | Unchanged |
| scored_cases 1-5 | Unchanged (no writes) |
| No pack content changes | ✅ |
| No case bank changes | ✅ |
| No scoring logic changes | ✅ |
| No certification-state changes | ✅ |
| No 500/700-series diff | ✅ |

---

## 6. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No real learner data used | PASS |
| All seeded history is synthetic (historySynthetic: true) | PASS |
| No external telemetry endpoint added | PASS |
| No broad rollout enabled | PASS |
| S114 pilot-only posture preserved | PASS |
| No pack content changes | PASS |
| No case-bank changes | PASS |
| No scoring logic changes | PASS |
| No certification-state changes | PASS |
| No answer-key changes | PASS |
| No explanation/distractor changes | PASS |
| No unauthorized threshold changes | PASS |
| stabilityHigh remains 75 | PASS |
| accuracyGood remains 75 | PASS |
| All other thresholds unchanged | PASS |
| modelVersion remains S111-1.0 | PASS |
| S111 guarded-speak paths intact | PASS |
| S112 recommendation gates intact | PASS |
| S113 evidence validators intact | PASS |
| S115 student-roll and telemetry harness intact | PASS |
| S116 export structure remains valid | PASS |
| Concurrent 500- and 700-series work not touched | PASS |
| No exam-prediction language introduced | PASS |
| No discouraging failure language introduced | PASS |
| Privacy masking preserves correct profile selection | PASS |
| Full names not exposed in roll before selection | PASS |

---

## 7. Files

### Modified

| File | Change | Lines |
|------|--------|-------|
| `may-core.js` | maskStudentName, onboarding SM, welcome overview, positive trends, seeded history, roll masking, greeting copy | ~+250 |
| `may-learner-state.js` | getExamPlan/setExamPlan, seedStudentHistory, examPlan in default schema | ~+30 |
| `scripts/test_may_stagec.js` | 30 new S117 tests (PRIV/EXAM/SEED/WELC/ENCR/NO-REGRESS) | ~+340 |

### Not Modified

`app.js`, `index_updated.html`, `styles.css`, `pack_a_corrected.js`, `pack_b_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`, `scored_cases.js`, `scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js`, `scripts/test_readiness.js`, `scripts/test_calibration.js`, `scripts/test_tutoring_safety.js`

---

## 8. Follow-On Recommendations

### S118: Seeded-History Telemetry Simulation + UI Polish

Now that all 8 synthetic students have complete learner history:
1. **Run recommendation-gate telemetry simulation** — with seeded history, `_recommendSimilar`, `_recommendNext`, and `_generateRecoverySet` should produce real QID lists that pass through `_guardedRecommend`, populating gate logs (which were empty in S116).
2. **Exercise evidence-threshold validators** — seeded history should trigger `_hasImprovingEvidence`, `_hasPersistentWeakEvidence`, `_hasUnstableEvidence`, etc.
3. **UI polish**: responsive mobile student roll, CSS for onboarding buttons, accessibility refinements.
4. **Real single-user pilot** — only after S118 simulation confirms gate logs populate correctly with seeded history.

---

*End of Session 117 report. 248/248 tests. Privacy masking, exam onboarding, positive trend messaging, seeded learner history delivered. S118 recommended: simulate with seeded history for recommendation-gate telemetry.*
