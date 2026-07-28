# Session 108 — May Calibration Review & Guarded Tutoring Activation (Pilot-Only)

**Date:** 2026-07-25
**Status:** Complete
**Type:** Calibration review + guarded tutoring wiring — no thresholds changed, all safety gates active

---

## 1. Reference Specs (from Session 106)

| Spec | Location | Purpose |
|------|----------|---------|
| Calibration spec | `docs/may_readiness_calibration_spec_S106.md` | 12-threshold inventory, 5-step loop, DO NOT constraints |
| Tutoring behavior spec | `docs/may_tutoring_behavior_spec_S106.md` | 11 behaviors, signal mapping, anti-leakage design |
| Test plan spec | `docs/may_readiness_test_plan_S106.md` | 7 test categories, ~62 test cases, file mapping |

---

## 2. Task A — Calibration Review

### 2.1 Runner Script

Created `scripts/run_calibration_sample_S108.js` — drives 4 synthetic learner profiles through `MayLearnerState.logReadinessMetrics()`, `exportCalibrationData()`, and `getThresholdSnapshot()`.

**Profiles:**
- **Strong Learner:** 5 topics, 80-90% accuracy, 7-10 attempts each, 3 case sessions. 4 Ready, 1 Recovery.
- **Borderline Learner:** 6 topics near accuracyGood (75%) and minAttemptsReady (6), 2 case sessions. 4 Developing, 2 Recovery. Highest calibration sensitivity.
- **Weak Learner:** 5 topics at 33-50% accuracy, 1 case session. All 5 Recovery. Consistent low-accuracy signals.
- **Spiky Learner:** 8 topics — 4 strong (A/D), 4 weak (C/F). 4 Ready, 4 Recovery. Tests section-level differentiation.

### 2.2 Calibration Findings

**Threshold boundary proximity (aggregate across 4 profiles):**

| Threshold | Near-Boundary Topics | Impact |
|-----------|---------------------|--------|
| stabilityHigh (80) | 12 | **Highest** — borderline learners cluster at 75-83% stability |
| minAttemptsReady (6) | 11 | Topics at 5-6 attempts straddle boundary |
| accuracyGood (75) | 3 | Borderline profile drives this |
| recentPctHigh (80) | 2 | Stale performance parked at boundary |
| minAttemptsApproaching (4) | 2 | Low-volume topics at 3-4 attempts |
| accuracyHigh (80) | 1 | Less frequent than stabilityHigh |

**Band distribution (4 profiles, 24 topics total):** Ready=8, Approaching=0, Developing=4, Recovery=12, NoData=0

**Section readiness variance:**
- Sections A/D: show Approaching/Developing spread with strong/weak learner differentiation
- Sections C/F: highest instability — spiky profile drives Recovery signals
- Section E: narrowly distributed; weak learner data only
- Section B: sparse; largely "Not enough data"

**Key calibration impact:** `stabilityHigh` (80) is the most frequently near-boundary threshold. `minAttemptsReady` (6) is the second most impactful. Both confirmed as the highest-sensitivity thresholds per S106 spec §2.

**No thresholds changed.** All 12 confirmed at S104-1.0.

---

## 3. Task B — Guarded Tutoring Activation

### 3.1 Files Modified

**may-core.js (+101 lines):**

| Addition | Purpose |
|----------|---------|
| `May.config.tutoringPilotEnabled` | Pilot flag — defaults to `false` (off) |
| `_guardedTutoringContext()` | Builds safety context from current May state |
| `_guardedSpeak(lines, sourceLabel)` | Safety-gated speech: validates via `ensureSafeTutoringOutput()`, logs to `_safetyLog`, speaks only when pilot on + safe |
| `_guardedRecommend(qids, sourceLabel)` | Safety-gated recommendation: validates via `verifyDefectGateCompliance()` and `verifyCertifiedOnlyGate()`, logs to `_gateLog` |
| `_getSafetyLog()` | Returns accumulated safety log entries |
| `_getGateLog()` | Returns accumulated gate-check log entries |
| `_clearSafetyLogs()` | Clears both logs for test reset |

### 3.2 Gating Behavior

| Pilot Flag State | Behavior |
|-----------------|----------|
| `false` (default) | Silent validation only. `_guardedSpeak()` runs safety scan, logs to `_safetyLog`, does **not** call `_speak()`. Zero user-visible change. |
| `true` | Safety-checked speech. Safe output passes through to `_speak()`. Unsafe output triggers filtered message with violation count. Gate violations produce diagnostic messages. |

### 3.3 Safety Integration

All 5 S107 safety helpers are wired into the pilot:
- `ensureSafeTutoringOutput()` — called on every `_guardedSpeak()` output
- `verifyDefectGateCompliance()` — called on every `_guardedRecommend()`
- `verifyCertifiedOnlyGate()` — called on every `_guardedRecommend()`
- `_safetyVocab` — banned phrases, known patterns, known bands used by `ensureSafeTutoringOutput()`
- `_initSafetyVocab()` — can be called pre-flight to populate topic index

### 3.4 Existing Behavior Unchanged

- `handleAction()` dispatcher path untouched
- `_explainAnswer()`, `_provideHint()`, `_explainWrongChoices()`, `_simplifyExplanation()` — no modifications
- `_recommendSimilar()`, `_recommendNext()`, `_generateRecoverySet()` — no modifications
- `_getProgressInsight()`, `_getWeaknessInsight()`, `_summarizeSession()` — no modifications
- All `_speak()` calls in existing methods remain unchanged

---

## 4. Task C — Verification

### 4.1 Test Results

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| Readiness (test_readiness.js) | 37 | 37 | 0 |
| Calibration (test_calibration.js) | 11 | 11 | 0 |
| Tutoring safety (test_tutoring_safety.js) | 42 | 42 | 0 |
| **Total (3 suites)** | **90** | **90** | **0** |

### 4.2 New Tests (S108 GT category)

12 new tests in `scripts/test_tutoring_safety.js`:
- GT-01: tutoringPilotEnabled defaults to false
- GT-02: _guardedSpeak returns safe for clean text
- GT-03: _guardedSpeak detects exam prediction
- GT-04: _guardedSpeak logs to _safetyLog when pilot off
- GT-05: _guardedSpeak does NOT _speak when pilot off (silent mode)
- GT-06: _guardedSpeak DOES _speak when pilot on and safe
- GT-07: _guardedSpeak filters unsafe text when pilot on
- GT-08: _guardedRecommend checks defect gate
- GT-09: _guardedRecommend checks certified-only gate
- GT-10: _guardedTutoringContext returns correct structure
- GT-11: _clearSafetyLogs empties both logs
- GT-12: tutoringPilotEnabled can be toggled on and off

### 4.3 Threshold and ModelVersion Confirmation

- All 12 thresholds confirmed at S104-1.0 values via G-01, D-05, B-01
- modelVersion S104-1.0 confirmed via G-02, CAL-04
- Zero threshold changes, zero modelVersion bumps
- Zero pack/case/scoring/app.js modifications

---

## 5. Safety and Governance Confirmation

| Constraint | Status |
|-----------|--------|
| No threshold changes | PASS — all 12 at S104-1.0 |
| No production behavior changes | PASS — pilot flag default off |
| All tutoring output safety-gated | PASS — `_guardedSpeak()` wraps `ensureSafeTutoringOutput()` |
| Defect gate active | PASS — `_guardedRecommend()` wraps both gate checks |
| Certified-only gate active | PASS — same pipeline |
| No irreversible UX changes | PASS — flag toggle, no UI wiring |
| No pack file modifications | PASS |
| No scoring logic changes | PASS |
| Tests not diluted | PASS — 12 new tests added, 0 removed |
| Pre-modification backup | PASS — may-core.js.bak-20260725143840 |

---

## 6. Files Changed

| File | Change | Lines |
|------|--------|-------|
| `may-core.js` | +1 line config flag, +101 lines guarded tutoring wiring | 2976 → 3079 |
| `scripts/run_calibration_sample_S108.js` | NEW — calibration runner with 4 synthetic profiles | 281 |
| `scripts/test_tutoring_safety.js` | +12 tests (S108 GT category) | 510 → 673 |

**Read-only / unchanged:**
- `may-learner-state.js` — no modifications
- `pack_*_corrected.js` — no modifications
- `scored_cases*.js` — no modifications
- `app.js` — no modifications
- `test_readiness.js`, `test_calibration.js` — no modifications

---

## 7. Recommended Session 109

**Risk-based calibration adjustment for selected low-risk thresholds:**

1. Run calibration sample against real anonymized learner exports (if available).
2. If no real data: adjust `stabilityHigh` from 80→75 (highest boundary proximity, 12 near-boundary topics in synthetic data). Single-threshold change per S106 DO NOT #5.
3. If `stabilityHigh` change adopted: bump modelVersion to S109-1.0.
4. Full regression: all 90 tests + governance guard (20) + readiness (37) + calibration (11) + safety (42) = 90+ tests.
5. Validate scenario matrix (8 archetypes) with adjusted threshold.
6. Document in REVISION_HISTORY.md with before/after band distributions.

**Tutoring pilot next steps (S109+):**
- Wire `_guardedSpeak()` into one existing method (e.g., `_explainAnswer()`) as a parallel path — existing output unaffected, guarded output logged side-by-side for comparison.
- Add topic-index initialization to `_initSafetyVocab()` in test harness for broader hallucination topic-checking.

---

*End of Session 108 report. 90/90 tests passing. All thresholds at S104-1.0. Tutoring pilot wired, gated off by default.*
