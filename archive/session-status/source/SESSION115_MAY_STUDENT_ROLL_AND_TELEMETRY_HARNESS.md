# Session 115 — May Student Roll and Telemetry Harness

**Date:** 2026-07-25
**Status:** Complete
**Type:** Pre-production May development — synthetic student identity + telemetry persistence. No thresholds changed, no flags changed, no pack/scoring/content modifications.

---

## Executive Summary

| Item | Value |
|------|-------|
| **Session Status** | Complete |
| **Pre-flight Tests** | 129/129 PASS |
| **Post-flight Tests** | 218/218 PASS (129 + 89 Stage C) |
| **Pilot-Only Posture Changed** | No — remains PILOT-ONLY |
| **Files Changed** | 2 source + 1 test + 5 reports |
| **Thresholds Changed** | No |
| **modelVersion** | S111-1.0 (unchanged) |

S115 implemented the returning-student handshake, 8 synthetic student profiles, localStorage persistence for all in-memory logs, a developer-facing export function, and a clear/reset helper — all gated behind the existing pilot infrastructure with zero pack/scoring/content/certification changes.

---

## 1. Pre-Flight State

### 1.1 Test Results

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| test_readiness.js | 37 | 37 | 0 |
| test_calibration.js | 18 | 18 | 0 |
| test_tutoring_safety.js | 74 | 74 | 0 |
| **Total** | **129** | **129** | **0** |

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
| caseBurdenDegrade | ≥4 |

### 1.3 Configuration

| Setting | Pre-Flight | Post-Flight |
|---------|-----------|------------|
| modelVersion | S111-1.0 | S111-1.0 |
| tutoringPilotEnabled | false (default) | false (unchanged) |
| isPilotEnvironment() | false (default) | false (unchanged) |

---

## 2. Product Behavior Delivered

### 2.1 Greeting Handshake

Yes path: May asks "Welcome back — have we met before?". Two buttons render: "Yes — I've been here before" / "No — I'm new here". Student roll appears as clickable rows showing display name, session count, and truncated profile summary.

No path: May calls existing askForName() flow. On name set, the new profile is marked synthetic:true, preProduction:true, and the selectedLearnerId is persisted.

Returning-student skip: If cmaMaySelectedLearnerId exists in localStorage, init() skips the handshake and greets directly.

### 2.2 Student Selection

After selecting a student from the roll, May speaks:
- Display name
- Profile summary
- Readiness snapshot
- Weak areas
- Progress signals
- Session count
- Pre-production disclaimer

### 2.3 State Machine

States: idle → ASK_RETURNING → SHOW_STUDENT_ROLL / CREATE_NEW_STUDENT → READY_TO_TUTOR

Entry condition: init() checks cmaMaySelectedLearnerId. If absent → enter greeting flow. If present → skip to READY_TO_TUTOR.

---

## 3. Synthetic Data Summary

| Metric | Value |
|--------|-------|
| Simulated students | 8 |
| Profile types | 8 distinct archetypes |
| All marked synthetic | Yes |
| All marked preProduction | Yes |
| Real names used | None |
| Real learner data | None |
| Deterministic | Yes (_generateSyntheticStudentRoll) |

Profile mix:
1. Avery Pilot — early stage, low data
2. Jordan Sample — stable improvement
3. Morgan Demo — budgeting weakness
4. Riley Practice — difficulty sensitivity + hint-dependent
5. Taylor Sandbox — controls/analytics asymmetry
6. Casey Trial — hint-dependent
7. Quinn Sim — unstable performance
8. Parker Test — strong readiness, sparse cases

---

## 4. Persistence and Export Summary

### 4.1 New localStorage Keys

| Key | Purpose | Cap |
|-----|---------|-----|
| cmaMayStudentRoll | Synthetic student roster | 8 entries |
| cmaMaySelectedLearnerId | Active student ID | 1 string |
| cmaMayPilotUsageLog | Persisted pilot usage events | 200 |
| cmaMaySafetyLog | Persisted safety validation events | 50 |
| cmaMayGateLog | Persisted gate-check events | 50 |
| cmaMaySessionTelemetry | Session lifecycle events | 100 |

### 4.2 Persistence Hooks

- `_logPilotUsage()` → calls `_persistUsageLog()` after every push
- `_guardedSpeak()` → calls `_persistSafetyLog()` after every push
- `_guardedRecommend()` → calls `_persistGateLog()` after every push
- `_logSessionTelemetry()` → calls `_persistSessionTelemetry()` after every push
- `_restorePersistedLogs()` → called in `init()`, restores all four logs from localStorage

### 4.3 Export Function

`May.exportMayPilotData()` — Downloads a local JSON file containing all pilot data:
- generatedAt, environment, syntheticData
- selectedLearnerId, studentRoll
- pilotUsageLog, safetyLog, gateLog, sessionTelemetry
- calibrationExport (full), thresholdSnapshot, modelVersion
- learnerState

No network upload. Local-only, developer-facing.

### 4.4 Clear/Reset

`May.clearPilotData()` — Wipes all 6 S115 localStorage keys plus all in-memory logs and greeting state. Available as a button in the May sidebar.

---

## 5. Test Results

### 5.1 Post-Flight Full Suite

| Suite | Tests | Result |
|-------|-------|--------|
| test_readiness.js | 37 | 37 PASS |
| test_calibration.js | 18 | 18 PASS |
| test_tutoring_safety.js | 74 | 74 PASS |
| test_may_stagec.js | 89 | 89 PASS |
| **Total** | **218** | **218 PASS** |

### 5.2 S115 Targeted Tests (24 new)

| Category | Count | Result |
|----------|-------|--------|
| Greeting flow (GREET-01 to 03) | 3 | 3 PASS |
| Student roll (ROLL-01 to 04) | 4 | 4 PASS |
| Student selection (SELECT-01 to 04) | 4 | 4 PASS |
| Log persistence (PERSIST-01 to 05) | 5 | 5 PASS |
| Export (EXPORT-01 to 03) | 3 | 3 PASS |
| Clear (CLEAR-01) | 1 | 1 PASS |
| New student creation (STUDENT-01) | 1 | 1 PASS |
| Regression (NO-REGRESS-01 to 03) | 3 | 3 PASS |
| Telemetry (TELEMETRY-01 to 03) | 3 | 3 PASS |

---

## 6. Pack and Certification Integrity

| Check | Result |
|-------|--------|
| pack_a items | 500 (unchanged) |
| pack_b items | 500 (unchanged) |
| pack_c items | 500 (unchanged) |
| pack_d items | 500 (unchanged) |
| pack_e items | 500 (unchanged) |
| Total Certified across packs | 2,179 (unchanged) |
| Case files modified | None |
| Scoring logic modified | None |
| Certification states modified | None |

---

## 7. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No real learner data used | PASS |
| Synthetic records clearly marked | PASS |
| No pack content changes | PASS |
| No scoring logic changes | PASS |
| No certification-state changes | PASS |
| No answer-key changes | PASS |
| No explanation/distractor changes | PASS |
| No unauthorized threshold changes | PASS |
| stabilityHigh remains 75 | PASS |
| accuracyGood remains 75 | PASS |
| All other thresholds unchanged | PASS |
| S111 guarded-speak paths intact | PASS (verified + test) |
| S112 recommendation gates intact | PASS (verified + test) |
| S113 evidence validators intact | PASS (verified + test) |
| S114 pilot-only decision preserved | PASS |
| No external telemetry endpoint added | PASS |
| Export is local/developer-facing only | PASS |
| modelVersion S111-1.0 stable | PASS |

---

## 8. Files Changed

| File | Change | Lines |
|------|--------|-------|
| may-core.js | Context, init, trySetName, greeting SM, roll gen, log persistence, export, clear, renderView, buttons | ~215 added |
| may-learner-state.js | getStudentRoll, saveStudentRoll, updateStudentInRoll | ~22 added |
| scripts/test_may_stagec.js | 24 S115 tests | ~260 added |
| reports/systematic_testing/SESSION115_STUDENT_HANDSHAKE_DESIGN.json | New | — |
| reports/systematic_testing/SESSION115_SYNTHETIC_STUDENT_ROLL_SPEC.json | New | — |
| reports/systematic_testing/SESSION115_TELEMETRY_PERSISTENCE_MAP.json | New | — |
| reports/session_status/SESSION115_MAY_STUDENT_ROLL_AND_TELEMETRY_HARNESS.md | New | — |
| knowledge/REVISION_HISTORY.md | Session 115 entry | New |

Backups created: may-core.js.bak-20260725231400, may-learner-state.js.bak-20260725231400

---

## 9. Follow-On Recommendations

### S116 Focus: Simulated Pilot Run and Telemetry Analysis
- Run a simulated browser session with CMA_MAY_PILOT=1 across all 8 synthetic students
- Export the local telemetry payloads using exportMayPilotData()
- Analyze: safety blocks, gate outcomes, evidence-threshold suppressions, student-selection behavior, session-continuation reliability
- Confirm the handshake works end-to-end in a real browser tab

### S117: UI Polish
- If student list clickable rows need refinement for mobile or styling
- Consider keyboard-navigable selection for accessibility

### S118: Real Single-User Pilot
- Only after synthetic telemetry from S116 passes review
- Enable CMA_MAY_PILOT=1 for one real user
- Collect and export real telemetry
- Compare against synthetic baseline
