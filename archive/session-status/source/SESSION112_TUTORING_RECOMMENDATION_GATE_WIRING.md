# Session 112 — May Tutoring Recommendation Gate Wiring

**Date:** 2026-07-25
**Status:** Complete
**Type:** Tutoring pilot Phase 2 — gate-check wiring for recommendation paths. No threshold changes.

---

## 1. Pre-Flight Verification

| Check | Result |
|-------|--------|
| Full test suite | 106/106 PASS |
| modelVersion | S111-1.0 |
| stabilityHigh | 75 |
| accuracyGood | 75 |
| _guardedSpeak wired | explain, hint (case+MCQ), wrong-choices, simplify (S111) |
| _guardedRecommend usage | Gate checks only, not wired into recommendation paths |
| Recommendation functions | `_recommendSimilar`, `_recommendNext`, `_generateRecoverySet` — all use `_speak()` directly |
| Pilot gating | `isPilotEnvironment()` = `May.config.tutoringPilotEnabled \|\| CMA_MAY_PILOT=1` |
| Pack/scoring/content in scope | No |
| Backup | may-core.js.bak-20260725153057 |

---

## 2. Implemented Changes

### 2.1 Recommendation Gate Wiring (may-core.js)

**Three paths wired with `_guardedRecommend()` behind `isPilotEnvironment()`-gated audit:**

| Function | Line | Change |
|----------|------|--------|
| `_recommendSimilar()` | L1110-1111 | Added `this._guardedRecommend([pick.QuestionID], 'similar')` after existing `_speak()` call |
| `_recommendNext()` | L1187-1188 | Added `this._guardedRecommend([pick.QuestionID], 'next')` after existing `_speak()` call |
| `_generateRecoverySet()` | L1284-1286 | Added `this._guardedRecommend(recoveryQids, 'recovery')` after existing `_speak()` call |

**Wiring pattern (consistent across all three):**
```js
// Existing behavior unchanged — speaks recommendation to user
this._speak(...);

// S112 — Gate check pilot (audit + gate, non-blocking)
this._guardedRecommend([qid(s)], 'sourceLabel');
```

**Gate behavior:**
- `_guardedRecommend()` internal audit-only gate — logs outcome to `_gateLog`, does NOT interrupt the `_speak()` output
- Pilot off: gate check still runs (silent audit logging), no user-visible change
- Pilot on: gate violations produce diagnostic messages (pre-existing S108 behavior in `_guardedRecommend`)
- Non-pilot behavior: identical to pre-S112 — all three functions return the same recommendations through `_speak()`

### 2.2 New Tests (S112 category, 8 tests)

**scripts/test_tutoring_safety.js (+142 lines, 51→59 tests):**

| Test | Description |
|------|-------------|
| S112-01 | Clean certified QID passes both gates |
| S112-02 | Contested QID blocked in defect gate |
| S112-03 | Non-certified QID blocked in cert gate |
| S112-04 | Mixed set: clean + fake → defect passes, cert flags fake |
| S112-05 | Empty input: both gates pass clean |
| S112-06 | `_recommendSimilar` wired → gate log receives entry |
| S112-07 | Gate logs even when pilot off (audit trail) |
| S112-08 | No speech output from gate check when pilot off |

**No other test files modified.**

---

## 3. Verification Results

### 3.1 Final Test Tally

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| test_readiness.js | 37 | 37 | 0 |
| test_calibration.js | 18 | 18 | 0 |
| test_tutoring_safety.js | 59 | 59 | 0 |
| **Total** | **114** | **114** | **0** |

### 3.2 Threshold & ModelVersion Confirmation

| Check | Value | Status |
|-------|-------|--------|
| stabilityHigh | 75 | Unchanged (S111) |
| accuracyGood | 75 | Unchanged |
| All other thresholds | S104/S111 values | Unchanged |
| modelVersion | S111-1.0 | Stable |

### 3.3 Pilot Gate Behavior Confirmation

| State | similar | next | recovery |
|-------|---------|------|----------|
| Pilot off | Gate runs silently, logs to gateLog, no speech | Same | Same |
| Pilot on | Gate runs, violations produce pilot diagnostic messages | Same | Same |
| Existing `_speak()` output | Unchanged | Unchanged | Unchanged |

---

## 4. Governance Attestation

| Constraint | Status |
|-----------|--------|
| No threshold changes | PASS — all 12 at S111-1.0 values |
| stabilityHigh = 75 | PASS |
| accuracyGood = 75 | PASS |
| No pack file modifications | PASS |
| No scoring logic changes | PASS |
| No certification-status changes | PASS |
| No answer-key/explanations/distractors changes | PASS |
| Non-pilot recommendation behavior preserved | PASS — identical `_speak()` output |
| `isPilotEnvironment()` gating preserved | PASS |
| S111 guarded-speak intact | PASS — 12 GT tests, 9 S109 tests still pass |
| S113+ insights not implemented | PASS |
| Pre-modification backup | PASS — bak-20260725153057 |
| Full test suite passes | PASS — 114/114 |

---

## 5. Files Changed

| File | Change | Lines |
|------|--------|-------|
| `may-core.js` | +6 lines: `_guardedRecommend` audit calls in 3 recommendation functions | 3154→3164 |
| `scripts/test_tutoring_safety.js` | +142 lines: 8 S112 tests (51→59 tests) | 793→895 |

**Not modified:** `may-learner-state.js`, `test_readiness.js`, `test_calibration.js`, `pack_*.js`, `scored_cases*.js`, `app.js`, any content files.

---

## 6. Recommended Session 113

**Progress/weakness/summary insight guarded expansion:**

1. Wire `_guardedSpeak` into `_getProgressInsight()`, `_getWeaknessInsight()`, `_summarizeSession()` — same pattern as S111: `isPilotEnvironment() ? _guardedSpeak(...) : _speak(...)`
2. Evidence-threshold validation per S106 §4.2 (minimum data thresholds for improving/weak/declining claims)
3. `accuracyGood` remains watch-only — S110 showed 8 near-boundary topics; re-evaluate with real learner data after stabilityHigh adjustment settles
4. Run full regression (114+ tests)

---

*End of Session 112 report. 3 recommendation paths wired with _guardedRecommend. 114/114 tests. No threshold changes. modelVersion S111-1.0. All gates, safety, and non-pilot behavior preserved.*
