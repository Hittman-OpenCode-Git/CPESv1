# MAY-020 Rollout Success Metrics

**Session:** MAY-020 — Limited Rollout Operations Framework
**Date:** 2026-07-31
**Governance Lane:** Light (documentation only — no code, no content impact)
**Phase:** Implementer — Success Metrics
**Status:** Active

---

## 1. Objective

Define the objective, measurable success criteria for the Phase 2 limited real-user rollout of May's adaptive coaching pipeline. These metrics determine whether the rollout is successful enough to justify Phase 3 full-activation consideration.

All metrics are tracked cumulatively across all rollout sessions and testers. Success is measured at the cohort level, not the individual level.

---

## 2. Metric Categories

### 2.1 Category A — Pipeline Reliability (40% weight)

**Definition:** Does the adaptive coaching pipeline work reliably for real users?

| Metric | ID | Measurement | Target | Weight |
|--------|----|------------|--------|--------|
| Valid orchestrator call rate | A1 | Sessions with ≥ 5 decision events ÷ total sessions | ≥ 90% | 15% |
| Telemetry persistence rate | A2 | Sessions with non-empty `cmaMayPilotTelemetry` ÷ total sessions | = 100% | 10% |
| All 5 event types captured | A3 | Sessions with all 5 `byType` keys present and non-empty ÷ total sessions | ≥ 95% | 10% |
| Zero May-attributed crashes | A4 | Sessions with 0 browser console errors from May layer ÷ total sessions | = 100% | 5% |

**Measurement window:** Cumulative across all Phase 2 sessions. Minimum 10 sessions before A1-A3 are evaluated.

### 2.2 Category B — Decision Quality (25% weight)

**Definition:** Does the decision engine produce a plausible, diverse set of coaching decisions consistent with synthetic expectations?

| Metric | ID | Measurement | Target | Weight |
|--------|----|------------|--------|--------|
| Decision distribution alignment | B1 | % of D1-D10 buckets within ±15% of MAY-014 expectations | ≥ 80% alignment | 10% |
| Decision diversity score | B2 | Number of distinct D1-D10 decision IDs reached ÷ 10 | ≥ 7/10 | 10% |
| EXPLAIN mode reachable | B3 | D7 + D8 + D10 events > 0 across all sessions | > 0 (non-zero) | 5% |

**Measurement window:** Cumulative across all Phase 2 sessions. B1 requires ≥ 50 total decisions for statistical significance.

### 2.3 Category C — Routing Quality (15% weight)

**Definition:** Does the coaching router direct learners to the appropriate mode for their readiness level?

| Metric | ID | Measurement | Target | Weight |
|--------|----|------------|--------|--------|
| Mode distribution within range | C1 | % of sessions where QUIZ is 50-75% of all mode events | ≥ 85% | 5% |
| All 4 modes reachable | C2 | QUIZ, EXPLAIN, SOCRATIC, STUDY_PLAN all have > 0 events | True across all sessions | 5% |
| EXPLAIN mode not dead | C3 | EXPLAIN mode > 0 in ≥ 50% of sessions | ≥ 50% of sessions | 5% |

### 2.4 Category D — Intervention Quality (10% weight)

**Definition:** Does the intervention engine produce appropriate, tiered interventions?

| Metric | ID | Measurement | Target | Weight |
|--------|----|------------|--------|--------|
| All 5 tiers reachable | D1 | Tiers 1-5 all have > 0 events across all sessions | True | 5% |
| Tier 1 controlled | D2 | Tier 1 events ÷ total intervention events | < 10% | 3% |
| Tier 3 (Targeted) dominant | D3 | Tier 3 events as % of total (without being 100%) | 20-50% | 2% |

### 2.5 Category E — User Satisfaction (10% weight)

**Definition:** Do real users find the coaching valuable and non-disruptive?

| Metric | ID | Measurement | Target | Weight |
|--------|----|------------|--------|--------|
| Zero confirmed wrong-coaching complaints | E1 | Count of confirmed coaching errors from tester reports | 0 | 5% |
| Zero rollback events | E2 | Count of Tier 3 escalations that triggered rollback | 0 | 3% |
| Positive qualitative feedback | E3 | Any tester provides unsolicited positive feedback | ≥ 1 tester | 2% |

**Note on E3:** Not a hard requirement — if all testers are neutral, the rollout can still succeed. Positive feedback adds confidence.

---

## 3. Composite Scoring

### 3.1 Score Calculation

Each metric contributes its weight to the total score:

```
Composite Score = Σ (metric_score / metric_target) * weight
```

Each metric is scored as the achieved value divided by the target value, capped at 1.0 (100%).

**Example:**
- A1 target: ≥ 90%, achieved: 93% → (93/90) = 1.033, capped at 1.0 → 1.0 * 15 = 15.0
- A1 target: ≥ 90%, achieved: 81% → (81/90) = 0.900 → 0.90 * 15 = 13.5

### 3.2 Overall Recommendation

| Composite Score | Recommendation |
|-----------------|---------------|
| ≥ 85 | **GO** — Rollout successful. Proceed to Phase 3 full-activation consideration. |
| 70-84 | **CONDITIONAL GO** — Partially successful. Identify specific metrics below threshold; target those in an extended Phase 2. |
| < 70 | **NO-GO** — Rollout not meeting success criteria. Significant rework required before re-attempting real-user exposure. |

### 3.3 Hard Gates (Non-Negotiable)

Regardless of composite score, the following must be satisfied:

| Gate | Metric | Requirement |
|------|--------|-------------|
| G1 | A4 | Zero May-attributed crashes. Any crash resets the rollout clock. |
| G2 | E1 | Zero confirmed wrong-coaching complaints. One confirmed case pauses rollout until root cause is fixed and verified. |
| G3 | E2 | Zero Tier 3 rollback events. Any Tier 3 escalation resets the Phase 2 clock to 0 sessions. |
| G4 | Preflight | 0 divergences at all times. Any divergence at any point during Phase 2 pauses the rollout. |

**Rationale for hard gates:** These four conditions represent learner safety and content integrity boundaries. The composite score is advisory; the hard gates are non-negotiable.

---

## 4. Phase 2 Minimum Duration

| Requirement | Value |
|-------------|-------|
| Minimum sessions before evaluation | 25 |
| Minimum calendar days | 7 |
| Minimum distinct testers | 3 |

Phase 2 runs until ALL minimums are met AND the composite score ≥ 85 AND all hard gates pass.

If after 14 calendar days the minimums are still not met, the rollout is declared **stalled** and a Phase 2 extension or re-plan is required.

---

## 5. Metric Data Sources

| Metric ID | Primary Source | Backup Source | Collection Frequency |
|-----------|---------------|---------------|---------------------|
| A1-A4 | `cmaMayPilotTelemetry` + `reports/telemetry/` archives | `window.__mayPilot.telemetry()` console output | Per session |
| B1-B3 | `cmaMayPilotTelemetry` → `byType.decision` | Dashboard Panel 2 | Per session; aggregated weekly |
| C1-C3 | `cmaMayPilotTelemetry` → `byType.mode` | Dashboard Panel 3 | Per session; aggregated weekly |
| D1-D3 | `cmaMayPilotTelemetry` → `byType.intervention` | Dashboard Panel 5 | Per session; aggregated weekly |
| E1-E3 | Tester reports + issue log (Weekly Review §4) | Direct communication | Per issue; aggregated weekly |

---

## 6. Interpretation Guide

### 6.1 If A1 (orchestrator call rate) Is Low

**Below 90%:** The pipeline is not consistently engaging. Possible causes:
- Orchestrator not being called at expected intervals (every 5-10 questions)
- Telemetry not capturing decisions that did fire
- Testers completing sessions too quickly (fewer question events than expected)

**Action:** Check orchestrator wiring in `may-coaching-orchestrator.js` and `may-pilot-activation.js`. Compare session durations to event counts.

### 6.2 If B1 (decision distribution) Is Poor

**Below 80% alignment:** Decisions are clustering differently than synthetic profiles predicted. Possible causes:
- Real learner profiles differ from synthetic ones (different readiness bands, different topic distribution)
- Decision engine thresholds need recalibration against real data
- One or two decisions dominate (D1 + D6 80%+), and others are rare — indicates narrow routing

**Action:** Analyze which decisions are over/underrepresented. Compare to individual readiness bands. Consider recalibration for Phase 3.

### 6.3 If C3 (EXPLAIN mode reachable) Is False

**EXPLAIN mode = 0:** CAL-01 or CAL-02 has regressed, or D7/D8/D10 conditions are not being met by real learner profiles.

**Action:** Run `window.__mayPilot.orchestratorReady()` and check decision reachability. Verify CAL-01/CAL-02 fixes are still applied. Create synthetic profile matching a real tester's readiness band and test.

### 6.4 If E1 (wrong-coaching complaints) Is > 0

**Any confirmed wrong-coaching complaint:** Stop and investigate. Wrong coaching is a learner-safety issue:
- Does the coaching content match the topic the learner is answering?
- Is the coaching mode appropriate for the learner's readiness on that topic?
- Is the recommendation directing the learner to irrelevant content?

**Action:** Immediate investigation. Confirm or refute. If confirmed → conditional rollback. Document root cause and fix.

---

## 7. Phase 3 Handoff Gate

Before transitioning to Phase 3 (full-activation consideration), the following artifacts must be complete:

- [ ] Weekly review for final Phase 2 week filed in `reports/telemetry/`
- [ ] Composite score calculated → ≥ 85
- [ ] All 4 hard gates (G1-G4) satisfied
- [ ] Decision distribution alignment ≥ 80% (B1)
- [ ] EXPLAIN mode confirmed reachable (C3)
- [ ] Zero confirmed wrong-coaching complaints (E1)
- [ ] Zero Tier 3 rollback events (E2)
- [ ] Preflight confirmed 0 divergences at handoff point
- [ ] Phase 2 → Phase 3 recommendation document prepared

---

## 8. Tracking Sheet (To Be Filled During Rollout)

### 8.1 Per-Session Tracker

| Session Date | Tester | Decisions | Modes | Readiness | Interventions | Telemetry Persisted? | Crashes? | Notes |
|-------------|--------|-----------|-------|-----------|---------------|---------------------|----------|-------|
| | | | | | | | | |

### 8.2 Cumulative Tracker

| Week Ending | Total Sessions | A1 Rate | A2 Rate | B1 Align | B2 Diversity | C1 Range | C3 EXPLAIN | D2 Tier1% | E1 Complaints | E2 Rollbacks | Score |
|-------------|---------------|---------|---------|----------|-------------|----------|------------|-----------|---------------|-------------|-------|
| | | | | | | | | | | | |

---

## 9. Success Criteria for This Metrics Document

| Criterion | Status |
|-----------|--------|
| All metrics defined with IDs, measurements, targets, weights | Complete |
| Composite scoring formula defined | Complete |
| Hard gates (non-negotiable) identified | Complete |
| Minimum duration and session counts defined | Complete |
| Interpretation guide for underperforming metrics included | Complete |
| Phase 3 handoff gate checklist included | Complete |
| Tracking sheets provided for operational use | Complete |
| No content/pack/case modifications | Confirmed |

---

## 10. Non-Actions (Correctly Excluded)

- No content modifications
- No pack/case/answer-key edits
- No question_state changes
- No REVISION_HISTORY.md entry (Light Lane — documentation only)
- No CURRENT_BASELINES.md update (no runtime-critical file changes)

---

*MAY-020 — Rollout Success Metrics — 2026-07-31*
