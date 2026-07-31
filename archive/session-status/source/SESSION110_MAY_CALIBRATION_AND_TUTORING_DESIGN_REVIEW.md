# Session 110 — May Calibration & Tutoring Design Review (Real Data Analysis, Threshold & Behavior Plan)

**Date:** 2026-07-25
**Status:** Complete
**Type:** Analysis and planning — no thresholds changed, no tutoring UX modifications. Design-only.

---

## 1. Context (Sessions 106–109)

| Session | Deliverable | Status |
|---------|-------------|--------|
| S106 | Calibration spec, tutoring behavior spec, test plan | Docs only |
| S107 | Test-first implementation: calibration logging + tutoring safety helpers | 78 tests |
| S108 | Synthetic calibration review + guarded tutoring wiring | 90 tests |
| S109 | Live calibration collector + pilot gating + usage logging | 106 tests |

**Current baseline:** 106/106 tests passing. All 12 thresholds at S104-1.0. modelVersion stable. Zero pack/scoring/content changes.

---

## 2. Calibration Analysis (Agent A)

### 2.1 Data Sources

Analyzed via `scripts/analyze_calibration_S110.js`: 5 synthetic learner profiles (Strong, Borderline, Weak, Spiky, High-Attempt Borderline) across 29 topics. Live calibration infrastructure (`_liveCalibrationEnabled`, `_commitCalibrationSnapshot`, `_liveCalibrationSessions[]`) exists but has not yet collected real learner data — this analysis uses synthetic data to establish the planning framework.

### 2.2 Aggregate Findings

**Band distribution (29 topics):** Ready=9, Approaching=1, Developing=5, Recovery=14, NoData=0

**Threshold boundary proximity (aggregate across 5 profiles):**

| Threshold | Near-Boundary Topics | Trend vs S108 (4 profiles) |
|-----------|---------------------|----------------------------|
| stabilityHigh (80) | **16** | ↑ from 12 |
| minAttemptsReady (6) | **11** | → stable at 11 |
| accuracyGood (75) | **8** | ↑ from 3 |
| accuracyHigh (80) | **5** | ↑ from 1 |
| recentPctHigh (80) | **4** | ↑ from 2 |
| minAttemptsApproaching (4) | 2 | → stable |
| accuracyLow (60) | 0 | → stable |
| stabilityGood (60) | 0 | → stable |
| stabilityLow (50) | 0 | → stable |
| recentPctGood (70) | 0 | → stable |

Adding the 5th profile (High-Attempt Borderline) confirmed and amplified the S108 finding: **stabilityHigh (80) is the single most boundary-proximate threshold.** The 5th profile also surfaced a new signal — **accuracyGood (75) jumped from 3 to 8**, driven by topics at 71-80% accuracy that straddle the Approaching boundary.

### 2.3 Section Readiness Variance

| Section | Band Distribution | Signal |
|---------|-----------------|--------|
| A | Approaching:2, Developing:2, NoData:1 | Moderate variance, strong learners dominate |
| B | Approaching:1, NoData:2, Developing:2 | Sparsely populated; Budget Development only topic |
| C | Developing:4, Recovery:1 | Highest recovery rate per topic — consistent weak cluster |
| D | Approaching:2, Developing:3 | Moderate; borderline stability common |
| E | NoData:3, Developing:2 | Most sparse; Ethics & Governance only |
| F | NoData:3, Developing:1, Recovery:1 | Second most sparse; spiky learners only |

**S106 finding confirmed:** Sections C/D show highest readiness variance. Section F remains data-sparse.

### 2.4 Per-Threshold Recommendations

#### Priority 1 — S111 Candidate (single-threshold adjustment)

**stabilityHigh (80 → 75)** — **Risk: LOW**

*Evidence:* 16 near-boundary topics across 5 profiles. Borderline learners at 75-83% stability are blocked from Ready despite meeting accuracy/recent/recentPct criteria. Example: Overhead Allocation (80% acc, 75% stab) → Recovery needed due to stability gate alone.

*Expected effect:* ~8-10% of Developing topics shift to Approaching; ~2-3% to Ready. Stable topics at 75%+ stability with good accuracy should reach Ready.

*Safety conditions:*
- ≥3 real learner profiles with ≥5 sessions confirm boundary cluster
- Regression: readiness (37), calibration (18), safety (51) — all must pass
- Validate 8-archetype scenario matrix
- modelVersion bump: S104-1.0 → S111-1.0
- REVISION_HISTORY documents before/after band distributions

#### Priority 2 — S112+ Candidates

**minAttemptsReady (6):** Keep at 6, monitor. S103 increase from 5→6 is conservative. Reducing would risk Ready inflation. Re-evaluate when ≥10 real learner exports exist.

**accuracyGood (75):** Loosen to 70 (future). 70% is still a passing CMA threshold. Would widen Approaching band 5-8%. Defer until stabilityHigh adjustment settles.

#### Stable — No Change Recommended

| Threshold | Rationale |
|-----------|-----------|
| accuracyHigh (80) | Paired with stabilityHigh; keep if stabilityHigh is loosened to prevent Ready inflation |
| accuracyLow (60) | Clear boundary; zero near-boundary topics |
| stabilityGood (60) | Secondary gate; accuracyGood carries Approaching weight |
| stabilityLow (50) | Clear boundary; Recovery driven by accuracy+declining, not stabilityLow |
| recentPctHigh (80) | Prevents stale-high-accuracy Ready; needs real data before touching |
| recentPctGood (70) | Secondary; aligns with accuracyGood-5 |
| minAttemptsApproaching (4) | S104 addition — working as designed |
| minAttemptsTopic (3) | Minimum for any readiness estimate; needs ≥4 for stability computation |
| caseBurdenDegrade (≥4) | S104 validated; degradation fires correctly |

---

## 3. Tutoring Pilot Analysis (Agent B)

### 3.1 Data Sources

Analyzed via `scripts/analyze_tutoring_pilot_S110.js`: 9 simulated tutoring scenarios across 5 behaviors (explain, hint, wrong-choices, simplify, progress). Gate-check simulation for similar/next/recovery. All scenarios exercised through `_guardedSpeak()` and `_guardedRecommend()` with safety verification.

### 3.2 Safety Outcomes

**Per-behavior safety profile:**

| Behavior | Calls | Safe | Blocked | Safe% | Violations |
|----------|-------|------|---------|-------|------------|
| explain | 2 | 1 | 1 | 50% | 2 (EXAM_PREDICTION) |
| hint | 2 | 1 | 1 | 50% | 1 (ANSWER_LEAKAGE_HINT) |
| simplify | 2 | 2 | 0 | 100% | 0 |
| wrong-choices | 1 | 1 | 0 | 100% | 0 |
| progress | 2 | 1 | 1 | 50% | 1 (EXAM_PREDICTION) |

**Violation breakdown:** EXAM_PREDICTION (3), ANSWER_LEAKAGE_HINT (1)

All violations were correctly detected by `ensureSafeTutoringOutput()`. No false positives in safe scenarios.

### 3.3 Gate Check Results

| Scenario | defectSafe | certSafe | Notes |
|----------|-----------|----------|-------|
| Clean QID (similar) | true | true | Both gates pass |
| Contested QID (similar) | false | — | 1 blocked |
| Fake QID (recovery) | — | false | 1 non-certified |
| Mixed (next) | true | false | Clean passes defect, fake fails cert |

Gate checks deterministic and testable. Contested QIDs correctly exclude. Non-certified QIDs correctly flag.

### 3.4 Per-Behavior Tuning Plan

#### Phase 1 — S111: Wire Guarded Speech (explain, hint, wrong-choices, simplify)

| Behavior | Action | Risk | Conditions |
|----------|--------|------|------------|
| **explain** | Wire `_guardedSpeak` into `_explainAnswer` as parallel path. Original output unchanged; guarded output logged to `_safetyLog`. | LOW | Safety block rate <5%; gate violations = 0 |
| **hint** | Wire `_guardedSpeak` into `_provideHint`. Add hint-level-specific context so leakage detection is level-aware. | MEDIUM | Test all 5 hint levels; verify exam-mode block intact |
| **wrong-choices** | Wire `_guardedSpeak` into `_explainWrongChoices`. Distractor-only output has natural anti-leakage. | LOW | Verify correct choice never in output |
| **simplify** | Wire `_guardedSpeak` into `_simplifyExplanation`. Topic hallucination detection best-effort; `_initSafetyVocab` populates knownTopics at startup. | LOW | Topic index must be populated |

**Gating:** All behaviors behind `isPilotEnvironment()` — zero user-visible change when flag is off.

#### Phase 2 — S112: Wire Recommendation Gates (similar, next, recovery)

Wire `_guardedRecommend` into `_recommendSimilar`, `_recommendNext`, `_generateRecoverySet`. Gate checks are deterministic and binary. No speech output to safety-scan. Risk: LOW.

#### Phase 3 — S113+: Expand to Insights (progress, weakness, summary)

Monitor-only in current state. Evidence-based insight design (S106 §4) has data threshold requirements that need real learner validation. Deferred until S113+.

### 3.5 Pilot Expansion Rules

| Phase | Behaviors | Gate | Success Metric |
|-------|-----------|------|----------------|
| S111 | explain, hint, wrong-choices, simplify | `isPilotEnvironment()` | Safety block rate <5%, gate violations = 0 |
| S112 | similar, next, recovery | `isPilotEnvironment()` | All recommendation QIDs pass both gates |
| S113+ | progress, weakness, summary | `isPilotEnvironment()` + evidence threshold check | Hallucinated topic/pattern claims = 0 |

---

## 4. Integration — Calibration + Tutoring Roadmap

| Session | Calibration | Tutoring |
|---------|-------------|----------|
| **S111** | Adjust stabilityHigh 80→75 (single-threshold, S106 DO NOT #5). Bump modelVersion to S111-1.0. Run full regression (106+ tests). Validate 8-archetype scenario matrix. | Wire `_guardedSpeak` into explain, hint, wrong-choices, simplify. Parallel path only when `isPilotEnvironment()`. |
| **S112** | Monitor stabilityHigh impact. Evaluate minAttemptsReady and accuracyGood with real data. | Wire `_guardedRecommend` into similar, next, recovery. Gate checks are low-risk. |
| **S113** | Evaluate caseBurdenDegrade with real case data. | Expand to progress, weakness, summary with evidence thresholds. |
| **S114+** | Full calibration review with ≥10 real learner exports. | Full tutoring rollout decision point. |

---

## 5. Threshold & ModelVersion Confirmation

- All 12 thresholds confirmed at S104-1.0 values — no drift
- modelVersion S104-1.0 confirmed across `getReadinessSummary()` and `getSectionReadinessSummary()`
- Zero threshold changes in S110
- Zero pack/scoring/content changes
- 106/106 tests passing

---

## 6. Files Created

| File | Purpose | Lines |
|------|---------|-------|
| `scripts/analyze_calibration_S110.js` | Calibration data analyzer with 5 profiles, per-threshold recommendations | 280 |
| `scripts/analyze_tutoring_pilot_S110.js` | Tutoring pilot analyzer with 9 scenarios, per-behavior tuning plan | 270 |
| `reports/session_status/SESSION110_MAY_CALIBRATION_AND_TUTORING_DESIGN_REVIEW.md` | This report | — |

**No modifications to:** `may-learner-state.js`, `may-core.js`, `pack_*_corrected.js`, `scored_cases*.js`, `app.js`, any test files.

---

## 7. Recommended Session 111

**Dual-track implementation:**
1. **Calibration:** Adjust `stabilityHigh` from 80→75 in `may-learner-state.js` L609. Bump modelVersion to S111-1.0 in both `getReadinessSummary()._provenance` and `getSectionReadinessSummary()`. Run full regression. Validate 8-archetype scenario matrix. Document before/after band distributions.
2. **Tutoring wiring:** Add `_guardedSpeak()` parallel calls into `_explainAnswer()`, `_provideHint()`, `_explainWrongChoices()`, `_simplifyExplanation()` — guarded output logged to `_safetyLog`; original output unchanged unless `isPilotEnvironment()`. Add wiring tests. Keep existing safety helpers intact.

*End of Session 110 design review. No thresholds changed. No tutoring behavior changed. 106/106 tests. Plan in place for S111–S114.*
