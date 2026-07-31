# Session 109 — May Real Learner Calibration & Tutoring Pilot Rollout

**Date:** 2026-07-25
**Status:** Complete
**Type:** Real-learner calibration + guarded tutoring pilot rollout — no thresholds changed, safety-first

---

## 1. Reference Specs

| Spec | Location | Purpose |
|------|----------|---------|
| Calibration spec | `docs/may_readiness_calibration_spec_S106.md` | 12-threshold inventory, 5-step loop |
| Tutoring behavior spec | `docs/may_tutoring_behavior_spec_S106.md` | 11 behaviors, signal mapping, anti-leakage |
| Test plan spec | `docs/may_readiness_test_plan_S106.md` | 7 test categories |
| S108 report | `reports/session_status/SESSION108_...` | Synthetic calibration + guarded wiring baseline |

---

## 2. Task A — Real Learner Calibration Collection

### 2.1 Source Changes (may-learner-state.js)

**+68 lines:** Live calibration auto-logging infrastructure.

| Addition | Purpose |
|----------|---------|
| `_liveCalibrationEnabled` (false) | Master enable flag |
| `_lastCalibrationSnapshot` / `_attemptsSinceSnapshot` | Throttle state |
| `_calibrationThrottleMs` (300000) | 5-min minimum between snapshots |
| `_calibrationThrottleAttempts` (20) | Or 20 attempts threshold |
| `_liveCalibrationSessions[]` | Accumulated snapshots (max 500) |
| `_commitCalibrationSnapshot()` | Throttled readiness snapshot |
| `enableLiveCalibration()` | Activate auto-logging |
| `disableLiveCalibration()` | Deactivate + return data |
| `getLiveCalibrationData()` | Return snapshots + summary |
| `clearLiveCalibration()` | Reset accumulation |

**Wired into:** `recordAttempt()` — calls `_commitCalibrationSnapshot()` on every attempt when `_liveCalibrationEnabled` is true.

### 2.2 Calibration Data Flow

```
recordAttempt() → _commitCalibrationSnapshot() → logReadinessMetrics()
  → bandDistribution, thresholdBoundaries, sectionReadiness, dataContext
  → stored in _liveCalibrationSessions[] (throttled)
  → disableLiveCalibration() returns full dataset + summary
```

### 2.3 Calibration Observations (from Synthetic + Architecture)

Based on S108 synthetic findings and S109 infrastructure:

**Threshold boundary proximity (S108 data, unchanged):**
| Threshold | Near-Boundary Topics | Sensitivity |
|-----------|---------------------|-------------|
| stabilityHigh (80) | 12 | HIGH |
| minAttemptsReady (6) | 11 | HIGH |
| accuracyGood (75) | 3 | MEDIUM |
| recentPctHigh (80) | 2 | MEDIUM |
| minAttemptsApproaching (4) | 2 | MEDIUM |

**Predicted real-learner impact:**
- **stabilityHigh (80):** Most likely to create false negatives — borderline learners at 75-83% stability miss "Ready" despite strong performance
- **minAttemptsReady (6):** Many real learners will cluster at 5-6 attempts per topic; extending "Ready" threshold delays feedback
- **Section C/D:** Highest readiness variance expected with real data (confirmed in synthetic)
- **Section F:** Sparse — needs ≥3 learner profiles with F-section questions to get stable signals

**Recommendation:** S110 should consider single-threshold adjustment on `stabilityHigh` (80→75) if real data confirms S108 synthetic pattern. All other thresholds are stable. No retune in S109.

---

## 3. Task B — Tutoring Pilot Activation & Logging

### 3.1 Source Changes (may-core.js)

**+32 lines:** Pilot gating, usage logging, safety vocab init.

| Addition | Purpose |
|----------|---------|
| `isPilotEnvironment()` | Returns true if flag on or CMA_MAY_PILOT env=1 |
| `_logPilotUsage()` | Records behavior, section, topic, QID, safety/gate outcomes |
| `_getPilotUsageLog()` | Returns accumulated usage log |
| `_clearPilotUsageLog()` | Clears usage log for test reset |
| `_initSafetyVocab()` call in `init()` | Populates knownTopics at startup |

### 3.2 Gating Logic

```
isPilotEnvironment()
  → May.config.tutoringPilotEnabled === true  OR
  → process.env.CMA_MAY_PILOT === '1'
```

Default: `tutoringPilotEnabled = false`. No user sees pilot tutoring unless flag is explicitly enabled or env var set.

### 3.3 Reinforced Safety Wires

Every tutoring path unchanged, but when pilot is active:
- `_guardedSpeak()` always: runs `ensureSafeTutoringOutput()`, logs safety outcome, logs usage
- `_guardedRecommend()` always: runs both gate checks, logs gate outcomes
- `_logPilotUsage()` captures: source label, section, topic, QID, pilot state, safety/gate outcomes

### 3.4 Behavior Inventory Under Pilot

| Behavior | Guarded Entry | Safety Check | Gate Check | Usage Logged |
|----------|-------------|-------------|------------|-------------|
| Explain | `_guardedSpeak(lines, "explain")` | Yes | N/A | Yes |
| Hint | `_guardedSpeak(lines, "hint")` | Yes | N/A | Yes |
| Wrong Choices | `_guardedSpeak(lines, "wrong-choices")` | Yes | N/A | Yes |
| Simplify | `_guardedSpeak(lines, "simplify")` | Yes | N/A | Yes |
| Similar | `_guardedRecommend(qids, "similar")` | N/A | Yes | N/A (gate only) |
| Recovery Set | `_guardedRecommend(qids, "recovery")` | N/A | Yes | N/A |
| Study Next | `_guardedRecommend(qids, "next")` | N/A | Yes | N/A |

---

## 4. Task C — Verification

### 4.1 Test Results

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| Readiness (test_readiness.js) | 37 | 37 | 0 |
| Calibration (test_calibration.js) | 18 | 18 | 0 |
| Tutoring safety (test_tutoring_safety.js) | 51 | 51 | 0 |
| **Total (3 suites)** | **106** | **106** | **0** |

### 4.2 New S109 Tests

**test_calibration.js (+7 tests):** S109-01 through S109-07 — live calibration flag defaults, enable/disable lifecycle, throttling, get/clear data, snapshot integration with recordAttempt.

**test_tutoring_safety.js (+9 tests):** S109-01 through S109-09 — isPilotEnvironment false/true states, pilotActive in safety log, usage logging for safe/unsafe output, env var detection, log clear, usage logged even when pilot off, gate log capture.

### 4.3 Threshold and ModelVersion Confirmation

- All 12 thresholds confirmed at S104-1.0 values — no drift
- modelVersion S104-1.0 confirmed
- Zero threshold changes, zero modelVersion bumps
- Zero pack/case/scoring/app.js modifications

### 4.4 Safety Gates Confirmed

| Gate | Status | Tests |
|------|--------|-------|
| ensureSafeTutoringOutput | Active on all _guardedSpeak | GT-02/03, E-01..E-07 |
| verifyDefectGateCompliance | Active on all _guardedRecommend | GT-08, F-01..F-01c |
| verifyCertifiedOnlyGate | Active on all _guardedRecommend | GT-09, F-02..F-02b |
| isPilotEnvironment gating | Default false | S109-01/02 |
| Safety vocab populated at init | Non-blocking call | Code review |
| Pilot usage logged | Unconditional | S109-04/05/08 |
| Dead-man switch | Flag off = silent | GT-05, S109-03/08 |

---

## 5. Safety and Governance Confirmation

| Constraint | Status |
|-----------|--------|
| No threshold changes | PASS — all 12 at S104-1.0 |
| No production behavior changes | PASS — pilot default off, env-gated |
| Safety helpers intact | PASS — 51/51 tutoring safety tests |
| Defect gate active | PASS |
| Certified-only gate active | PASS |
| No pack/scoring/content changes | PASS |
| No irreversible UX changes | PASS |
| Backup protocol followed | PASS — bak-20260725145741 |
| Parse-check gate | PASS — all tests load + parse cleanly |

---

## 6. Files Changed

| File | Change | Lines |
|------|--------|-------|
| `may-learner-state.js` | +68 lines live calibration auto-logging + flags | 1139→1207 |
| `may-core.js` | +32 lines pilot gating, usage logging, safety vocab init call | 3079→3127 |
| `scripts/test_calibration.js` | +7 tests (S109 live calibration) | 267→358 |
| `scripts/test_tutoring_safety.js` | +9 tests (S109 pilot gating + usage) | 672→793 |

**Read-only / unchanged:**
- `scripts/run_calibration_sample_S108.js` — unchanged
- `test_readiness.js` — unchanged
- `pack_*_corrected.js` — no modifications
- `scored_cases*.js` — no modifications
- `app.js` — no modifications

---

## 7. Recommended Session 110

1. **Collect real calibration data** — enable `_liveCalibrationEnabled` for a trial cohort, gather ≥3 learners with ≥5 sessions each
2. **Compare synthetic vs real:** If real data confirms `stabilityHigh` boundary proximity: adjust stabilityHigh from 80→75 (single-threshold change per S106 DO NOT #5)
3. **Bump modelVersion** to S110-1.0 if any threshold changes adopted
4. **Run full regression** — all 106+ tests
5. **Expand pilot** to tutorial-level behaviors (Explain, Hint, Wrong Choices) if S109 logging shows clean safety record
6. **Add concept-walkthrough** behavior from S106 spec §9.2 if pilot data supports it

---

*End of Session 109 report. 106/106 tests passing. All thresholds at S104-1.0. Live calibration infrastructure active, pilot gated behind isPilotEnvironment().*
