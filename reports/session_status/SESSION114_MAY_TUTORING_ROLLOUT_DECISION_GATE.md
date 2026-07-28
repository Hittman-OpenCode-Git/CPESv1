# Session 114 — May Tutoring Rollout Decision Gate

**Date:** 2026-07-25
**Status:** Complete
**Type:** Governed rollout-readiness decision session. No thresholds changed, no flags changed, no rollout action taken.

---

## Executive Summary

| Item | Value |
|------|-------|
| **Final Decision** | **PILOT-ONLY — no broad rollout** |
| **Pre-flight Tests** | 129/129 PASS |
| **Post-flight Tests** | 129/129 PASS |
| **Flag Changed** | No |
| **Thresholds Changed** | No |
| **modelVersion Changed** | No — remains S111-1.0 |
| **Pack/Scoring/Content Changed** | No |
| **Files Created** | 5 (audit JSONs + report + rollback plan) |
| **Files Modified** | 1 (REVISION_HISTORY.md) |

**Decision rationale:** The S111/S112/S113 tutoring pilot infrastructure is well-architected and fully tested (129/129 tests), but zero real learner data exists. All safety logs, gate logs, and pilot usage logs are in-memory only with no persistence. Prerequisites for even limited gated expansion are unmet. Default posture ("pilot-only unless evidence supports expansion") is the only defensible decision.

---

## 1. Pre-Flight State

### 1.1 Test Results (Pre-Flight and Post-Flight Identical)

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| test_readiness.js | 37 | 37 | 0 |
| test_calibration.js | 18 | 18 | 0 |
| test_tutoring_safety.js | 74 | 74 | 0 |
| **Total** | **129** | **129** | **0** |

### 1.2 Threshold Table

| Threshold | Value | Changed in S114? |
|-----------|-------|------------------|
| accuracyHigh | 80 | No |
| accuracyGood | 75 | No |
| accuracyLow | 60 | No |
| stabilityHigh | 75 | No (S111 changed) |
| stabilityGood | 60 | No |
| stabilityLow | 50 | No |
| recentPctHigh | 80 | No |
| recentPctGood | 70 | No |
| minAttemptsReady | 6 | No |
| minAttemptsApproaching | 4 | No |
| minAttemptsTopic | 3 | No |
| caseBurdenDegrade | ≥4 | No |

### 1.3 Configuration State

| Setting | Value |
|---------|-------|
| modelVersion | S111-1.0 |
| tutoringPilotEnabled | false (default) |
| isPilotEnvironment() | false (default — no flag, no env var) |
| _liveCalibrationEnabled | false |

### 1.4 Safeguard Status

| Layer | Status | Details |
|-------|--------|---------|
| S111 guarded-speak | INTACT | 8/8 paths wired (explain, hint case, hint MCQ, wrong-choices, simplify, progress, weakness, summary) |
| S112 recommendation gates | INTACT | 3/3 paths wired (similar, next, recovery), audit-only when pilot off |
| S113 evidence thresholds | INTACT | 8/8 validators present, 15 S113 tests pass |
| isPilotEnvironment() | INTACT | Three-tier gate: config flag → env var → false |

### 1.5 Git/Diff Status

Git is not installed on this system. No `.git` directory found. The project root had existing pre-session `.bak-*` files from prior sessions. No new unexpected diffs detected — only the 5 S114 report files and REVISION_HISTORY.md are new.

---

## 2. Pilot Data Availability

### 2.1 Real Learner Data

**ZERO real learner data exists.** The project has never been deployed to production or used by actual learners. All calibration, readiness, and tutoring pilot analyses across S106-S113 used 5 synthetic learner profiles generated programmatically.

### 2.2 Pilot Usage Logs

**None.** `_pilotUsageLog` is an in-memory array capped at 200 entries. Never populated with real data. Not persisted to localStorage.

### 2.3 Safety Logs

**None.** `_safetyLog` is an in-memory array capped at 50 entries. Never populated with real data. Accessible via `_getSafetyLog()` but never exported.

### 2.4 Gate Logs

**None.** `_gateLog` is an in-memory array capped at 50 entries. Never populated with real data. Accessible via `_getGateLog()` but never exported.

### 2.5 Calibration Sessions

**Zero.** `_liveCalibrationSessions` array is empty. `_liveCalibrationEnabled` defaults to false. The throttling infrastructure and auto-logging hook in `recordAttempt()` are wired but have never captured real data.

### 2.6 Evidence Limitations

| Limitation | Impact |
|------------|--------|
| No real learner data | Cannot validate safety block rate, gate violation rate, or evidence-threshold behavior against actual usage |
| All logs in-memory only | No persistence across page reloads; no export mechanism |
| No telemetry endpoint | No external monitoring or alerting |
| No admin dashboard | Manual console inspection only |
| Synthetic profiles only | 5 profiles with `seedTopic()`/`seedCasePatterns()` — cannot represent real learner diversity |
| Throttling untested | `_commitCalibrationSnapshot` throttling (5 min / 20 attempts) never tested under real load |
| Log caps (50-200) | Insufficient for multi-session analysis without export |

---

## 3. Rollout Metrics

| Metric | Value | Source |
|--------|-------|--------|
| Safety block rate | Unknown | No real data |
| Gate violations | Unknown | No real data |
| False positive safety blocks | Unknown | No real data |
| Missed safety violations | Unknown | No mechanism |
| Recommendation gate failures | Unknown | No real data |
| Non-certified QID recommendations | Unknown | No real data |
| Contested/defective QID recommendations | Unknown | No real data |
| Unsupported insight claims | Unknown | No real data |
| Evidence-threshold suppressions | Unknown | No real data |
| Empty-safe-set recommendation events | Unknown | No real data |
| Pilot-on vs pilot-off behavior differences | Unknown | No comparative data |
| Learner-facing fallback frequency | Unknown | No real data |

**Note:** All rollout metrics require real learner data. Synthetic test suites validate implementation correctness (129/129 PASS) but cannot substitute for rollout validation.

---

## 4. Decision Matrix

| Dimension | Pilot-Only | Limited Gated Expansion | Default-On Rollout |
|-----------|-----------|------------------------|-------------------|
| Evidence required | Tests pass, guards intact | Real data + monitoring | Real data + full infra |
| Evidence found | 129/129 tests, all guards verified | Synthetic only, no real data | Zero real data |
| Risk level | LOW | MEDIUM | CRITICAL |
| Monitoring | Internal only | Needs log persistence + export | Full production suite |
| Rollback trigger | N/A | Block rate >5%, violations >0 | Any anomaly |
| Implementation effort | None | Medium (infra before flag) | High |
| **Recommendation** | **SELECTED** | NOT SELECTED | NOT SELECTED |

### Rationale for Pilot-Only

1. **Zero real learner data** — all 129 tests use synthetic profiles. Cannot validate safety block rate, gate violation rate, or evidence-threshold suppression behavior against actual learner usage.

2. **No log persistence** — `_pilotUsageLog`, `_safetyLog`, and `_gateLog` are in-memory only. Lost on page reload. No export mechanism. This makes even limited gated expansion blind to runtime safety behavior.

3. **Telemetry readiness is PARTIAL** — Agent B identified 15 monitoring gaps including no persistence, no export, no admin dashboard, no external telemetry, no error monitoring, no feature-flag infrastructure beyond the single boolean.

4. **Precautionary principle** — the session brief's default posture is "pilot-only / no broad rollout unless evidence supports expansion." Evidence does not support expansion.

5. **All guards intact** — the pilot infrastructure is well-designed. Rolling back is trivial (one boolean flip). There is no urgency to expand before evidence is collected.

---

## 5. Rollback and Monitoring Plan

**Full plan:** `reports/systematic_testing/SESSION114_ROLLBACK_AND_MONITORING_PLAN.md`

### Rollback (Config-Only, Future Reference)
```
// Immediate: flip tutoringPilotEnabled to false
// Verify: isPilotEnvironment() returns false
// Verify: all tutoring goes through _speak() not _guardedSpeak()
```

### Monitoring Prerequisites (S115+)
1. localStorage persistence for `_pilotUsageLog`, `_safetyLog`, `_gateLog`
2. `_exportPilotLogs()` method for JSON download
3. Real pilot session with `CMA_MAY_PILOT=1`
4. Baseline safety block rate and gate violation analysis

---

## 6. Verification Results

### 6.1 Targeted Test Results

| Suite | Tests | Result |
|-------|-------|--------|
| Tutoring safety (guardrails + hallucination + leakage) | 74 | 74 PASS |
| Evidence thresholds (S113) | 15 | 15 PASS |
| Recommendation gates (S112) | 8 | 8 PASS |
| Guarded tutoring wiring (S108) | 12 | 12 PASS |
| Pilot gating & usage logging (S109) | 9 | 9 PASS |
| Readiness (all categories) | 37 | 37 PASS |
| Calibration (all categories) | 18 | 18 PASS |

### 6.2 No Unauthorized Diffs

- No pack files modified (`pack_a` through `pack_e`)
- No `scored_cases*.js` modified
- No `app.js` modified
- No `may-core.js` modified
- No `may-learner-state.js` modified
- No test files modified
- Only S114 report files created (5 JSON/MD files)

### 6.3 Threshold and ModelVersion Confirmation

- All 12 thresholds confirmed at S111-1.0 values — no drift
- modelVersion S111-1.0 confirmed across both `getReadinessSummary()._provenance` and `getSectionReadinessSummary()`
- stabilityHigh = 75 confirmed
- accuracyGood = 75 confirmed

---

## 7. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No pack content changes | PASS |
| No scoring logic changes | PASS |
| No certification-status changes | PASS |
| No answer-key changes | PASS |
| No explanation/distractor changes | PASS |
| No unauthorized threshold changes | PASS |
| stabilityHigh remains 75 | PASS |
| accuracyGood remains 75 | PASS |
| All other thresholds unchanged | PASS |
| S111 guarded-speak paths intact | PASS (8/8 verified by Agent C) |
| S112 recommendation gates intact | PASS (3/3 verified by Agent C) |
| S113 insight evidence thresholds intact | PASS (8/8 verified by Agent C) |
| isPilotEnvironment() gating preserved | PASS (default false, unchanged) |
| No unsupported trend or exam-prediction claims introduced | PASS |
| Rollout decision documented before any flag change | PASS |
| Pre-flight full suite PASS | PASS (129/129) |
| Post-flight full suite PASS | PASS (129/129) |

---

## 8. Files

### Created

| File | Purpose |
|------|---------|
| `reports/systematic_testing/SESSION114_MAY_PREFLIGHT_STATE_AUDIT.json` | Pre-flight May state audit (Agent A) |
| `reports/systematic_testing/SESSION114_PILOT_DATA_AND_MONITORING_AUDIT.json` | Pilot data and monitoring audit (Agent B) |
| `reports/systematic_testing/SESSION114_SAFETY_GATE_EVIDENCE_REGRESSION_AUDIT.json` | Safety/gate/evidence regression audit (Agent C) |
| `reports/systematic_testing/SESSION114_ROLLOUT_DECISION_MATRIX.json` | Rollout decision matrix (Agent D) |
| `reports/systematic_testing/SESSION114_ROLLBACK_AND_MONITORING_PLAN.md` | Rollback and monitoring plan (Agent D) |
| `reports/session_status/SESSION114_MAY_TUTORING_ROLLOUT_DECISION_GATE.md` | This report |

### Modified

| File | Change |
|------|--------|
| `knowledge/REVISION_HISTORY.md` | Session 114 entry appended |

### Not Modified

`may-core.js`, `may-learner-state.js`, `pack_a_corrected.js`, `pack_b_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`, `scored_cases.js`, `scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js`, `app.js`, `scripts/test_readiness.js`, `scripts/test_calibration.js`, `scripts/test_tutoring_safety.js`, any other file.

---

## 9. Recommended Session 115

**Real-data collection and telemetry hardening:**

1. Add localStorage persistence for `_pilotUsageLog`, `_safetyLog`, `_gateLog`
2. Add `_exportPilotLogs()` method for JSON download from browser console
3. Conduct at least one real pilot session with `CMA_MAY_PILOT=1` in an actual browser
4. Analyze pilot logs for baseline safety block rate, gate violations, and evidence-threshold suppression patterns
5. Re-evaluate rollout readiness with real metrics
6. If pilot data looks clean, prepare limited gated expansion plan for S116

---

*End of Session 114 report. Decision: PILOT-ONLY. 129/129 tests. No thresholds changed. No flags changed. No pack/scoring/content modifications. Recommended S115: real-data collection and telemetry hardening.*
