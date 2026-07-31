# Session 113 — May Insight Guarding and Evidence-Threshold Validation

**Date:** 2026-07-25
**Status:** Complete
**Type:** Tutoring pilot Phase 3 — guarded speech + evidence thresholds for insight outputs. No threshold changes.

---

## 1. Pre-Flight Verification

| Check | Result |
|-------|--------|
| Full test suite | 114/114 PASS |
| modelVersion | S111-1.0 |
| stabilityHigh | 75 |
| accuracyGood | 75 |
| S111 guarded-speak wired | explain, hint (case+MCQ), wrong-choices, simplify |
| S112 recommendation gates wired | similar, next, recovery |
| Insight functions unwired | `_getProgressInsight()`, `_getWeaknessInsight()`, `_summarizeSession()` — direct `_speak()` |
| Evidence thresholds in code | `getWeaknessClusters` enforces internally; no external validator |
| Pack/scoring/content in scope | No |
| Backup | may-core.js.bak-20260725153731 |

---

## 2. Implemented Changes

### 2.1 Evidence-Threshold Validators (may-core.js +98 lines)

Added 8 evidence-threshold functions per S106 §4.2:

| Function | S106 Threshold | Logic |
|----------|---------------|-------|
| `_hasImprovingEvidence(td)` | >=4 attempts, delta >=15% | `totalAttempts >= 4`, `recentPct - accuracy >= 15` |
| `_hasPersistentWeakEvidence(td)` | >=5 attempts, accuracy <60% | `totalAttempts >= 5`, `accuracy < 60` |
| `_hasDecliningEvidence(td)` | delta <= -15% | `totalAttempts >= 4`, `recentPct - accuracy <= -15` |
| `_hasUnstableEvidence(td)` | >=4 attempts, stability <50% | `totalAttempts >= 4`, `stability < 50` |
| `_hasHintDependentEvidence(td)` | >=4 attempts, hint increasing, accuracy >=70% | `hintTrend === 'increasing'`, `accuracy >= 70` |
| `_hasDifficultySensitiveEvidence(td)` | >=2 Easy + >=2 Difficult, gap >=30% | Uses `difficultyDistribution` and `lowPct/highPct` |
| `_hasConfidenceEvidence(c)` | >=4 confidence-rated | `total >= 4` |
| `_assessInsightEvidence()` | Aggregate all checks | Returns object with boolean flags + sessionCount |

All validators are pure functions accepting topic data — no side effects.

### 2.2 Guarded-Speak Wiring (may-core.js +12 lines)

Three insight output paths wired with the S111 pattern:

| Function | Source Label | Line |
|----------|-------------|------|
| `_getProgressInsight()` | 'progress' | L859-865 |
| `_getWeaknessInsight()` | 'weakness' | L979-985 |
| `_summarizeSession()` | 'summary' | L1093-1099 |

Pattern: `isPilotEnvironment() ? this._guardedSpeak(text, label) : this._speak(text)`

### 2.3 Evidence Map

`reports/systematic_testing/SESSION113_INSIGHT_EVIDENCE_MAP.json` — catalogs every insight claim from all three functions, maps to S106 thresholds, and notes enforcement status.

---

## 3. Test Results

### 3.1 S113 New Tests (15 tests)

| Category | Tests | Coverage |
|----------|-------|----------|
| Evidence thresholds | S113-01–11 | Each validator tested: true/false boundary cases |
| Evidence assessment | S113-12 | `_assessInsightEvidence` returns structured object |
| Pilot gating | S113-13–15 | Progress, weakness, summary route through `_guardedSpeak` in pilot mode |

All 15/15 pass.

### 3.2 Full Test Tally

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| test_readiness.js | 37 | 37 | 0 |
| test_calibration.js | 18 | 18 | 0 |
| test_tutoring_safety.js | 74 | 74 | 0 |
| **Total** | **129** | **129** | **0** |

### 3.3 Threshold & ModelVersion Confirmation

| Check | Value | Status |
|-------|-------|--------|
| stabilityHigh | 75 | Unchanged (S111) |
| accuracyGood | 75 | Unchanged |
| All 12 thresholds | S111 values | Unchanged |
| modelVersion | S111-1.0 | Stable |

---

## 4. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No threshold changes | PASS |
| stabilityHigh = 75 | PASS |
| accuracyGood = 75 | PASS |
| No pack file modifications | PASS |
| No scoring logic changes | PASS |
| No certification-status changes | PASS |
| No answer-key/explanations/distractors changes | PASS |
| Non-pilot insight behavior preserved | PASS |
| isPilotEnvironment() gating preserved | PASS |
| S111 guarded-speak intact | PASS (12 GT tests, 9 S109 tests) |
| S112 recommendation gates intact | PASS (8 S112 tests) |
| No exam-prediction language | PASS |
| S114 rollout not implemented | PASS |
| Pre-modification backup | PASS (bak-20260725153731) |

---

## 5. Evidence-Threshold Enforcement Matrix

| Claim | Source | S106 Threshold | Enforcement |
|-------|--------|---------------|-------------|
| Improving | `getWeaknessClusters().improving` | delta >=15%, >=2 attempts both windows | `_hasImprovingEvidence` + cluster filter |
| Persistent weak | `getWeaknessClusters().persistentWeak` | >=5 attempts, <60% | Cluster filter (self-enforcing) + `_hasPersistentWeakEvidence` |
| Declining | `getWeaknessClusters().declining` | delta <= -15% | `_hasDecliningEvidence` |
| Unstable | `getWeaknessClusters().unstable` | >=4 attempts, <50% stability | Cluster filter + `_hasUnstableEvidence` |
| Hint dependent | `getWeaknessClusters().hintDependent` | >=4 attempts, hint increasing, >=70% | `_hasHintDependentEvidence` |
| Difficulty sensitive | `getWeaknessClusters().difficultySensitive` | >=2 Easy, >=2 Difficult, gap >=30% | `_hasDifficultySensitiveEvidence` |
| Confidence calibration | `getConfidenceCalibration()` | >=4 rated attempts | `_hasConfidenceEvidence` |
| Cross-session | `data.sessions` | >=2 sessions | `_assessInsightEvidence().hasCrossSession` |

---

## 6. Files Changed

| File | Change | Lines |
|------|--------|-------|
| `may-core.js` | +98 lines evidence validators, +12 lines guarded-speak wiring (3 paths) | 3164→3274 |
| `scripts/test_tutoring_safety.js` | +15 tests (59→74 tests) | 895→1026 |
| `reports/systematic_testing/SESSION113_INSIGHT_EVIDENCE_MAP.json` | NEW — claim-to-threshold mapping | — |
| `reports/session_status/SESSION113_MAY_INSIGHT_GUARDING_AND_EVIDENCE_THRESHOLDS.md` | This report | — |

**Not modified:** `may-learner-state.js`, `test_readiness.js`, `test_calibration.js`, `pack_*.js`, `scored_cases*.js`, `app.js`.

---

## 7. Known Limitations

1. `getWeaknessClusters` already enforces most thresholds internally — S113 validators provide redundant testability and a public API for future use.
2. `_hasDifficultySensitiveEvidence` relies on `lowPct/highPct` from cluster data which may not be populated in all cases.
3. Confidence underconfident threshold uses `total >= 3` (not S106's `>=4`) — noted but not corrected in S113 to avoid changing existing behavior.

---

## 8. Recommended Session 114

**Full tutoring rollout decision gate:**
- All 3 pilot phases complete (S111 speech, S112 gates, S113 insights)
- 129/129 tests — all safety, gate, and evidence checks pass
- Real learner data needed to validate evidence thresholds in practice
- If rollout: toggle `tutoringPilotEnabled` to `true` for wider cohort, monitor safety block rate <5%, gate violations = 0
- If gated rollout: keep flag off, use CMA_MAY_PILOT=1 for internal testing

---

*End of Session 113 report. 129/129 tests. 3 insight paths wired. 8 evidence validators. No thresholds changed. modelVersion S111-1.0.*
