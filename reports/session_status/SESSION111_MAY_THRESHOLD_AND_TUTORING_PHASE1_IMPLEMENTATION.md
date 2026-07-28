# Session 111 — May Calibration Threshold Adjustment + Tutoring Pilot Phase 1 Wiring

**Date:** 2026-07-25
**Status:** Complete
**Type:** First governed implementation step from S110 design review. Single-threshold adjustment + 4-path tutoring pilot wiring.

---

## 1. Pre-Flight Verification

| Check | Result |
|-------|--------|
| Full test suite (readiness + calibration + tutoring safety) | 106/106 PASS |
| stabilityHigh value | 80 (S104-1.0) |
| modelVersion | S104-1.0 |
| _guardedSpeak usage | explain, hint, wrong-choices, simplify NOT wired |
| Pack/scoring/content in scope | No |
| S110 report | `reports/session_status/SESSION110_MAY_CALIBRATION_AND_TUTORING_DESIGN_REVIEW.md` |
| Backup | may-learner-state.js.bak-20260725152049, may-core.js.bak-20260725152049 |

---

## 2. Implemented Changes

### 2.1 Calibration — stabilityHigh: 80 → 75

**may-learner-state.js (4 edits):**

| Location | Change |
|----------|--------|
| L610 (Ready condition) | `stability >= 80` → `stability >= 75` |
| L789 (_provenance) | `stabilityHigh: 80` → `stabilityHigh: 75` |
| L956 (S105 comment) | `stabilityHigh (80)` → `stabilityHigh (75)` |
| L780, L945 (modelVersion) | `S104-1.0` → `S111-1.0` |

**No other thresholds changed.** accuracyGood remains 75. All 11 other thresholds at S104-1.0 values.

### 2.2 Tutoring Pilot — Phase 1 _guardedSpeak Wiring

**may-core.js (4 paths wired):**

| Behavior | Function | Line | Wiring Pattern |
|----------|----------|------|----------------|
| explain | `_explainAnswer()` | L437-442 | `isPilotEnvironment() ? _guardedSpeak(lines, 'explain') : _speak(lines.join('\n'))` |
| wrong-choices | `_explainWrongChoices()` | L485-490 | `isPilotEnvironment() ? _guardedSpeak(parts, 'wrong-choices') : _speak(parts.join('\n'))` |
| hint (case) | `_provideHint()` | L532-538 | `isPilotEnvironment() ? _guardedSpeak(caseHintText, 'hint') : _speak(caseHintText)` |
| hint (MCQ) | `_provideHint()` | L566-572 | `isPilotEnvironment() ? _guardedSpeak(mcqHintText, 'hint') : _speak(mcqHintText)` |
| simplify | `_simplifyExplanation()` | L664-669 | `isPilotEnvironment() ? _guardedSpeak(simplified, 'simplify') : _speak(simplified)` |

**Gating:** All paths gated behind `May.isPilotEnvironment()`. Non-pilot behavior identical to pre-S111.

### 2.3 Test Updates

| File | Changes | Result |
|------|---------|--------|
| `test_readiness.js` | stabilityHigh 80→75 (D-05, G-01), modelVersion S104-1.0→S111-1.0 (9 occurrences) | 37/37 PASS |
| `test_calibration.js` | stabilityHigh 80→75 (B-01, B-06), modelVersion S104-1.0→S111-1.0 (CAL-04) | 18/18 PASS |
| `test_tutoring_safety.js` | No changes needed | 51/51 PASS |

---

## 3. Verification Results

### 3.1 Final Test Tally

| Suite | Tests | Pass | Fail |
|-------|-------|------|------|
| test_readiness.js | 37 | 37 | 0 |
| test_calibration.js | 18 | 18 | 0 |
| test_tutoring_safety.js | 51 | 51 | 0 |
| **Total** | **106** | **106** | **0** |

### 3.2 Final Threshold Table

| Threshold | S104-1.0 | S111-1.0 | Change |
|-----------|----------|----------|--------|
| accuracyHigh | 80 | 80 | — |
| accuracyGood | 75 | 75 | — |
| accuracyLow | 60 | 60 | — |
| **stabilityHigh** | **80** | **75** | **↓5** |
| stabilityGood | 60 | 60 | — |
| stabilityLow | 50 | 50 | — |
| recentPctHigh | 80 | 80 | — |
| recentPctGood | 70 | 70 | — |
| minAttemptsReady | 6 | 6 | — |
| minAttemptsApproaching | 4 | 4 | — |
| minAttemptsTopic | 3 | 3 | — |
| caseBurdenDegrade | ≥4 | ≥4 | — |

**modelVersion:** S104-1.0 → S111-1.0

### 3.3 Pilot Behavior Confirmation

| Pilot State | explain | hint | wrong-choices | simplify |
|-------------|---------|------|---------------|----------|
| `tutoringPilotEnabled = false` | Original `_speak()` | Original `_speak()` | Original `_speak()` | Original `_speak()` |
| `tutoringPilotEnabled = true` | `_guardedSpeak()` → safety-checked | `_guardedSpeak()` → safety-checked | `_guardedSpeak()` → safety-checked | `_guardedSpeak()` → safety-checked |

Verified by: GT-05 (pilot off → no guarded output), GT-06 (pilot on → guarded output passes through).

---

## 4. Governance Attestation

| Constraint | Status |
|-----------|--------|
| Only stabilityHigh changed | PASS |
| accuracyGood unchanged | PASS (75) |
| No pack file modifications | PASS |
| No scoring logic changes | PASS |
| No certification-status changes | PASS |
| No recommendation-gate wiring | PASS (future S112) |
| No insights expansion | PASS (future S113+) |
| Pre-modification backup | PASS (bak-20260725152049) |
| Model version bumped | PASS (S104-1.0 → S111-1.0) |
| Full test suite passes | PASS (106/106) |

---

## 5. Files Changed

| File | Lines | Changes |
|------|-------|---------|
| `may-learner-state.js` | 1207 | stabilityHigh 80→75 (L610, L789, L956), modelVersion S104-1.0→S111-1.0 (L780, L945) |
| `may-core.js` | 3154 | +~20 lines: guarded-speak wiring in 5 locations across 4 behaviors |
| `scripts/test_readiness.js` | 689 | stabilityHigh=75 (D-05, G-01), modelVersion=S111-1.0 (9 refs) |
| `scripts/test_calibration.js` | 358 | stabilityHigh=75 (B-01, B-06), modelVersion=S111-1.0 (CAL-04) |

**Not modified:** test_tutoring_safety.js, pack_*.js, scored_cases*.js, app.js, any content files.

---

## 6. Recommended Session 112

**Recommendation-gate pilot wiring:**

1. Wire `_guardedRecommend` into `_recommendSimilar`, `_recommendNext`, `_generateRecoverySet` — gate checks are deterministic and low-risk (per S110 analysis).
2. Keep all existing gating (`isPilotEnvironment()`).
3. `accuracyGood` remains watch-only — S110 showed it as a secondary signal at 8 near-boundary topics. Re-evaluate after real learner data confirms stabilityHigh adjustment's effect on band distributions.
4. Run full regression (106+ tests).

---

*End of Session 111 report. stabilityHigh: 80→75. modelVersion: S111-1.0. 4 tutoring paths wired behind pilot gating. 106/106 tests. No pack/scoring/content changes.*
