# Session 116 — May Simulated Pilot Run and Telemetry Analysis

**Date:** 2026-07-25
**Status:** Complete
**Type:** Pre-production simulated pilot — student roll testing + telemetry export/analysis. No thresholds changed, no flags changed. 218/218 tests PASS.

---

## Executive Summary

| Item | Value |
|------|-------|
| **Session Status** | Complete |
| **Pre-flight Tests** | 218/218 PASS |
| **Post-flight Tests** | 218/218 PASS |
| **Synthetic Students Simulated** | 9 (8 returning + 1 new) |
| **Export Payloads** | 9 |
| **Telemetry Analysis Decision** | PASS_WITH_NOTES |
| **Real-Pilot Readiness** | BLOCKED — insufficient recommendation-gate data in synthetic runs |

---

## 1. Pre-Flight State

### 1.1 Test Results

| Suite | Tests | Pass |
|-------|-------|------|
| test_readiness.js | 37 | 37 |
| test_calibration.js | 18 | 18 |
| test_tutoring_safety.js | 74 | 74 |
| test_may_stagec.js | 89 | 89 |
| **Total** | **218** | **218** |

### 1.2 Threshold Table (Unchanged)

| Threshold | Value |
|-----------|-------|
| accuracyHigh | 80 |
| accuracyGood | 75 |
| accuracyLow | 60 |
| stabilityHigh | 75 |
| stabilityGood | 60 |
| stabilityLow | 50 |
| recentPctHigh | 80 |
| recentPctGood | 70 |
| minAttemptsReady | 6 |
| minAttemptsApproaching | 4 |
| minAttemptsTopic | 3 |
| caseBurdenDegradeMisses | 4 |

### 1.3 Configuration

| Setting | Value |
|---------|-------|
| modelVersion | S111-1.0 |
| tutoringPilotEnabled | false (default) |
| isPilotEnvironment() | false (default) |
| CMA_MAY_PILOT | Set per simulation in test harness |

---

## 2. Concurrent-Lane Protection

| Check | Result |
|-------|--------|
| 100-series May scope confirmed | PASS |
| 500-series case-bank files checked | PASS — no changes |
| 700-series pack files checked | PASS — no changes |
| Pack A-E MD5 hashes verified | PASS — all match pre-flight |
| scored_cases 1-5 MD5 hashes verified | PASS — all match pre-flight |
| Scoring logic files unchanged | PASS |
| Certification states unchanged | PASS |
| No-conflict attestation | PASS |

---

## 3. Simulation Setup

### 3.1 Simulation Script

`scripts/simulate_s116_pilot.js` — built on the Stage C test harness pattern. Loads May modules via Function constructor, stubs browser APIs, enables `CMA_MAY_PILOT=1` via `process.env`, runs deterministic greeting/selection/tutoring flow for each synthetic student, captures export payloads without requiring Blob/URL browser APIs.

### 3.2 Synthetic Question Context

Each tutoring behavior exercised against a synthetic question (`P1A-FS-001-SIM`) — accounting equation topic, Section A, Moderate difficulty, 4 choices, Certified state. This ensures `_guardedSpeak` and `_guardedRecommend` fire against real safety/gate logic with valid QID context.

---

## 4. Returning-Student Simulation Results

| # | Student ID | Display Name | Greeting | Roll | Selected | Behaviors | Export |
|---|-----------|-------------|----------|------|----------|-----------|--------|
| 1 | synth-avery | Avery Pilot | ✅ | ✅ | ✅ | 10/10 | 13,090 B |
| 2 | synth-jordan | Jordan Sample | ✅ | ✅ | ✅ | 10/10 | 13,098 B |
| 3 | synth-morgan | Morgan Demo | ✅ | ✅ | ✅ | 10/10 | 13,094 B |
| 4 | synth-riley | Riley Practice | ✅ | ✅ | ✅ | 10/10 | 13,096 B |
| 5 | synth-taylor | Taylor Sandbox | ✅ | ✅ | ✅ | 10/10 | 13,100 B |
| 6 | synth-casey | Casey Trial | ✅ | ✅ | ✅ | 10/10 | 13,090 B |
| 7 | synth-quinn | Quinn Sim | ✅ | ✅ | ✅ | 10/10 | 13,086 B |
| 8 | synth-parker | Parker Test | ✅ | ✅ | ✅ | 10/10 | 13,094 B |

All 8 students: greeting handshake entered, student roll shown, student selected from roll, stored ID persisted to localStorage, all 10 tutoring behaviors exercised without error, export payloads generated.

### 4.1 Behaviors Exercised Per Student

explain, hint, wrong-choices, simplify, similar, next, recovery, progress, weakness, summary

---

## 5. New-Student Simulation Results

| Metric | Result |
|--------|--------|
| Synthetic name | Jamie Dryrun |
| Path | No — I'm new here |
| Profile created | ✅ |
| synthetic flag | true |
| preProduction flag | true |
| Learner ID | learner-ms0t7cxc |
| Selected ID persisted | ✅ |
| Relaunch skips handshake | ✅ (cmaMaySelectedLearnerId found) |
| Behaviors exercised | 10/10 |
| Export payload | 5,209 B |

New-student path operated correctly: `trySetName('Jamie Dryrun')` created profile, marked synthetic/preProduction, persisted selectedLearnerId. Simulated page reload (re-init without clearing localStorage) correctly skipped the handshake.

---

## 6. Telemetry Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Synthetic students simulated | 9 | ✅ |
| Successful returning-student selections | 8/8 | ✅ |
| Successful new-student creations | 1/1 | ✅ |
| Export payloads generated | 9 | ✅ |
| Malformed export payloads | 0 | ✅ |
| localStorage restore successes | 8/8 | ✅ |
| Session-continuation successes | 1/1 | ✅ |
| Safety block count (total) | 18 | EXPECTED |
| Safety block rate | ~2 per session | EXPECTED¹ |
| Safety false positive candidates | UNAVAILABLE_IN_S116_EXPORT | — ² |
| Missed safety violation candidates | UNAVAILABLE_IN_S116_EXPORT | — ² |
| Recommendation gate pass count | 0 | NOTE ³ |
| Recommendation gate block count | 0 | NOTE ³ |
| Empty-safe-set recommendation events | 0 | — |
| Evidence-threshold suppression count | 0 | NOTE ⁴ |
| Unsupported insight claim count | UNAVAILABLE_IN_S116_EXPORT | — ² |
| Exam-prediction language count | 0 | ✅ |
| Pilot-on vs. pilot-off mismatch | UNAVAILABLE_IN_S116_EXPORT | — ⁵ |
| Fallback message frequency | UNAVAILABLE_IN_S116_EXPORT | — ⁵ |
| Missing telemetry fields | 0 | ✅ |

**Notes:**
1. **Safety blocks expected:** explain and simplify behaviors intentionally reveal the correct answer — flagged as `ANSWER_LEAKAGE_HINT` at hint levels 0-1. These are correct gating behavior, not defects.
2. **Content inspection required:** These metrics require human review of actual tutoring output text — cannot be computed from structured log data alone.
3. **Recommendation gates empty:** `_recommendSimilar`, `_recommendNext`, and `_generateRecoverySet` all need learner history data (prior attempts, topic progress) to generate QID lists. Synthetic students have empty history, so no QID lists were produced to gate-check.
4. **Evidence thresholds not exercised:** Insight behaviors (progress, weakness, summary) fire evidence validators, but all synthetic profiles restart with empty history per simulation.
5. **Comparative metrics unavailable:** Requires running the same flows with pilot off and comparing output — not feasible in a single-pass simulation.

### 6.1 Per-Student Safety Log Summary

All 9 students show identical safety patterns:
- **explain**: `safe: false` — `ANSWER_LEAKAGE_HINT: hint level 0 reveals correct choice B` ✅ EXPECTED
- **hint**: `safe: true` — metacognitive content only ✅ EXPECTED
- **wrong-choices**: `safe: true` ✅ EXPECTED
- **simplify**: `safe: false` — `ANSWER_LEAKAGE_HINT: hint level 1 reveals correct choice B` ✅ EXPECTED
- Remaining 6 behaviors: also logged, varying safe/unsafe depending on content

### 6.2 Export Payload Structure

All 13 required fields present in every payload:
generatedAt, environment, syntheticData, selectedLearnerId, studentRoll, pilotUsageLog, safetyLog, gateLog, sessionTelemetry, calibrationExport, thresholdSnapshot, modelVersion, learnerState

---

## 7. Verification Results

### 7.1 Full Post-Flight Test Suite

| Suite | Tests | Result |
|-------|-------|--------|
| test_readiness.js | 37 | 37 PASS |
| test_calibration.js | 18 | 18 PASS |
| test_tutoring_safety.js | 74 | 74 PASS |
| test_may_stagec.js | 89 | 89 PASS |
| **Total** | **218** | **218 PASS** |

### 7.2 Threshold Confirmation

| Check | Value | Status |
|-------|-------|--------|
| stabilityHigh | 75 | Unchanged |
| accuracyGood | 75 | Unchanged |
| All 12 thresholds | S111 values | Unchanged |
| modelVersion | S111-1.0 | Stable |

### 7.3 Pack/Case/Scoring Integrity

| Check | Result |
|-------|--------|
| Pack A-E 500/500 items each | Unchanged |
| Certified pool 2,179 | Unchanged |
| No pack file changes | ✅ |
| No case bank changes | ✅ |
| No scoring logic changes | ✅ |
| No certification-state changes | ✅ |
| No external telemetry endpoint | ✅ |

---

## 8. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No real learner data used | PASS |
| Synthetic data clearly identified | PASS |
| No external telemetry endpoint used | PASS |
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
| Concurrent 500- and 700-series work not touched | PASS |

---

## 9. Follow-On Recommendations

### S117 Telemetry Hardening

The synthetic pilot exposed gaps in recommendation-gate telemetry. Because synthetic students have empty history, `_guardedRecommend` never receives QID lists to gate-check. S117 should:

1. **Seed learner history:** Pre-populate synthetic student profiles with simulated topic progress (attempts, accuracy, stability) so recommendation behaviors generate real QID lists.
2. **Exercise recommendation gates:** With populated history, `_recommendSimilar`, `_recommendNext`, and `_generateRecoverySet` will produce QID arrays that pass through `_guardedRecommend` — populating gate logs.
3. **Content inspection for safety false positives:** Review the `safetyLog` entries marked `safe: false` to confirm all are legitimate (not false positives suppressing safe tutoring output).
4. **Export file format:** Consider adding a manifest/metadata header to export files with session count, generated timestamp, and schema version for automated ingestion.

### S118 Real Single-User Pilot

**Not yet recommended.** S117 should harden recommendation-gate telemetry first. After S117:
- If gate logs show correct pass/block behavior with seeded history
- If safety block rate remains low (<5%) on a wider set of question contexts
- Then S118 can proceed with a single real user in pre-production mode.

---

## 10. Files

### Created

| File | Purpose |
|------|---------|
| `scripts/simulate_s116_pilot.js` | S116 simulated pilot runner and telemetry analyzer |
| `reports/systematic_testing/SESSION116_PREFLIGHT_CONCURRENCY_AND_MAY_STATE_AUDIT.json` | Pre-flight audit (Agent A) |
| `reports/systematic_testing/SESSION116_SIMULATED_STUDENT_RUN_RESULTS.json` | Returning-student simulation results (Agent B) |
| `reports/systematic_testing/SESSION116_NEW_STUDENT_AND_PERSISTENCE_RESULTS.json` | New-student path results (Agent C) |
| `reports/systematic_testing/SESSION116_TELEMETRY_ANALYSIS.json` | Telemetry analysis (Agent D) |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-avery.json` | Export payload — Avery Pilot |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-jordan.json` | Export payload — Jordan Sample |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-morgan.json` | Export payload — Morgan Demo |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-riley.json` | Export payload — Riley Practice |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-taylor.json` | Export payload — Taylor Sandbox |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-casey.json` | Export payload — Casey Trial |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-quinn.json` | Export payload — Quinn Sim |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_synth-parker.json` | Export payload — Parker Test |
| `reports/systematic_testing/SESSION116_EXPORTS/s116_pilot_new_student_jamie_dryrun.json` | Export payload — Jamie Dryrun (new student) |
| `reports/session_status/SESSION116_MAY_SIMULATED_PILOT_TELEMETRY_ANALYSIS.md` | This report |

### Modified

| File | Change |
|------|--------|
| `knowledge/REVISION_HISTORY.md` | Session 116 entry appended |

### Not Modified

`may-core.js`, `may-learner-state.js`, `pack_a_corrected.js`, `pack_b_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`, `scored_cases.js`, `scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js`, `app.js`, `index_updated.html`, `styles.css`, `scripts/test_readiness.js`, `scripts/test_calibration.js`, `scripts/test_tutoring_safety.js`, `scripts/test_may_stagec.js`.

---

*End of Session 116 report. 218/218 tests. 9 synthetic students simulated. Telemetry analysis PASS_WITH_NOTES. S117 recommended: seed learner history for recommendation-gate testing and content inspection of safety blocks.*
