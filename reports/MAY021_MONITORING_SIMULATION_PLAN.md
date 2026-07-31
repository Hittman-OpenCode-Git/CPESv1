# MAY-021 — Monitoring Simulation Plan

**Session:** MAY-021 — Limited Rollout Monitoring Simulation
**Date:** 2026-07-31
**Governance Lane:** Light (simulation — no code, no content modifications)
**Phase:** Planner
**Status:** Active

---

## 1. Objective

Validate that the monitoring, escalation, telemetry, and success-metrics frameworks created in MAY-020 function correctly under simulated real-world conditions. This plan defines five synthetic incident scenarios, each designed to stress a specific component of the operational framework.

No new coaching features, calibration changes, content modifications, or activation expansion.

---

## 2. Simulation Scope

| Dimension | In Scope | Out of Scope |
|-----------|----------|--------------|
| Monitoring detection | Yes — verify each scenario triggers the correct alert threshold | — |
| Escalation tier classification | Yes — verify each scenario maps to the correct tier | — |
| Rollback condition clarity | Yes — verify rollback triggers are unambiguous | — |
| Success metric integrity | Yes — verify all 15 metrics are collectable/observable/actionable | — |
| Weekly review executability | Yes — dry-run the weekly review process with synthetic data | — |
| Actual code execution | No — this is a documentation exercise | Real rollout activation |
| Telemetry data generation | No — synthetic data used | Real learner data |
| App.js / content modifications | No | Any write to source files |
| Dashboard implementation | No | Building `may_rollout_dashboard.html` |

---

## 3. Simulated Incident Scenarios

### 3.1 Scenario S1 — D1 Decision Path Collapse (D1 Drops to 0%)

**Simulated Event:**
The D1 decision path (QUIZ / new topic, historically 30-40% of all decisions) suddenly drops to 0% of decisions. All other decisions remain within expected ranges.

**Synthetic Telemetry:**
- Total decisions: 45
- D1: 0 (0%) — CRITICAL: expected 30-40%
- D2-D10: within expected ranges
- Total events: 127
- All 5 event types present

**Monitoring Questions:**
1. Does the alert system detect D1 at 0%?
2. Which escalation tier does this trigger?
3. What response is prescribed?

**Expected Detection:** Decision distribution panel shows 0/45 (0%) for D1. This is a structural anomaly — not covered by a specific alert threshold in MAY-020 Monitoring Plan §2.3 since the alert thresholds focus on QUIZ mode share, EXPLAIN presence, and overall decision count. However, it triggers B1 (Decision distribution alignment < 80% — only 9/10 decisions in expected range) in the success metrics.

**Expected Escalation Tier:** Tier 1 (Elevated Monitoring) — increase observation, verify decision engine reachability for D1. Not Tier 2 unless EXPLAIN mode also collapses.

### 3.2 Scenario S2 — QUIZ Mode Overload (>85%)

**Simulated Event:**
Over three consecutive sessions, QUIZ mode events exceed 85% of all mode events, indicating near-total reliance on QUIZ routing with EXPLAIN, SOCRATIC, and STUDY_PLAN modes barely firing.

**Synthetic Telemetry (3 sessions):**
| Session | QUIZ | EXPLAIN | SOCRATIC | STUDY_PLAN | Total |
|---------|------|---------|----------|------------|-------|
| S1 | 42 (86%) | 4 (8%) | 2 (4%) | 1 (2%) | 49 |
| S2 | 38 (88%) | 3 (7%) | 1 (2%) | 1 (2%) | 43 |
| S3 | 41 (90%) | 2 (4%) | 2 (4%) | 1 (2%) | 46 |

**Monitoring Questions:**
1. Does the QUIZ > 85% threshold fire?
2. Does EXPLAIN mode remain > 0 (preventing Tier 2)?
3. Does the escalation correctly map to Tier 1 rather than Tier 2?

**Expected Detection:** QUIZ > 85% triggers the Tier 1 alert per MAY-020 Monitoring Plan §7 (Alert Response Matrix). EXPLAIN mode is > 0 (not dead — only suppressed), so Tier 2 is NOT triggered. The alert correctly fires at Tier 1.

**Expected Escalation Tier:** Tier 1 (Elevated Monitoring) — increase monitoring frequency; review mode routing logic; prepare CAL-04.

### 3.3 Scenario S3 — Telemetry Buffer Degradation (Events Drop Below 10)

**Simulated Event:**
The telemetry buffer records only 8 total events for a session that should produce 50-120. Only 3 of 5 event types appear. intervention and recommendation types are missing.

**Synthetic Telemetry:**
- totalEvents: 8
- byType: decision (4 events), readiness (2 events), mode (2 events)
- Missing: intervention, recommendation
- sessionDuration: ~45 minutes (normal-length session)

**Monitoring Questions:**
1. Does the < 10 events threshold fire?
2. Does the missing event type check detect intervention and recommendation absence?
3. What escalation tier is triggered?

**Expected Detection:** Layer 3 alert `totalEvents < 10` fires (pipeline barely firing). Additionally, 2 of 5 event types missing triggers Tier 1 per MAY-020 Escalation Plan §2.2. The alert is registered in both the Monitoring Plan §2.3 and Dashboard Spec §4.1.

**Expected Escalation Tier:** Tier 1 (Elevated Monitoring) — investigate telemetry wiring. If the pattern persists across multiple sessions and 3+ event types go missing, escalate to Tier 2.

### 3.4 Scenario S4 — Readiness Engine Collapse

**Simulated Event:**
Over 4 consecutive sessions, all readiness events report `overallBand: "No Data"` with `overallScore: 0`. No Ready, Proficient, Developing, or Fragile bands appear. The readiness engine appears to have lost access to learner state.

**Synthetic Telemetry (4 sessions):**
- S1: overallBand="No Data", overallScore=0, topicsWithData=0
- S2: overallBand="No Data", overallScore=0, topicsWithData=0
- S3: overallBand="No Data", overallScore=0, topicsWithData=0
- S4: overallBand="No Data", overallScore=0, topicsWithData=0

**Monitoring Questions:**
1. Does the Ready band = 0 alert fire?
2. Does the 3+ sessions threshold correctly defer the Tier 2 escalation?
3. Does the readiness collapse impact decision quality metrics (B1, B2)?

**Expected Detection:** Ready band = 0 across 4 sessions triggers Tier 1 per MAY-020 Monitoring Plan §7 ("Ready band unreachable → MEDIUM, < 1 week"). Additionally, the Dashboard Spec §4.2 flags "Ready band = 0 across all snapshots" as Yellow. The No Data > 20% threshold (Dashboard Spec §3.4) also fires.

**Expected Escalation Tier:** Tier 1 initially — elevated monitoring. After 4+ sessions with no recovery, this escalates to Tier 2 investigation: "Verify CAL-03 threshold is reachable... consider synthetic test." The readiness collapse is NOT a Tier 3 (immediate rollback) because it degrades coaching quality but does not crash the app or expose answer keys.

### 3.5 Scenario S5 — Pilot Activation Removed (Rollback Simulation)

**Simulated Event:**
The `may-pilot-activation.js` script tag is commented out, simulating a Tier 3 rollback. The platform must revert to pre-pilot behavior with zero learner data loss.

**Monitoring Questions:**
1. Does the structural integrity check detect that May is absent?
2. Do preflight and smoke tests still pass without May?
3. Does the escalation framework correctly classify this as a CRITICAL / Tier 3 event?
4. Are the rollback verification steps (MAY-020 Escalation Plan §3.1) sufficient?

**Expected Detection:** Preflight and smoke tests should pass regardless of May's presence (May is an additive coaching layer, not a structural dependency). The rollback verification checklist (MAY-020 Escalation Plan §3.1, 6 checks) must be confirmed executable.

**Expected Escalation Tier:** N/A — this is a deliberate rollback, not an anomaly. But if it were triggered by a Tier 3 condition, the escalation framework must handle it correctly.

---

## 4. Metrics Validation Scope

Review all 15 success metrics from `MAY020_ROLLOUT_SUCCESS_METRICS.md` against three criteria:

| Criterion | Definition |
|-----------|------------|
| **Collectable** | Can the metric be captured from available data sources without code changes? |
| **Observable** | Can an operator determine the metric's value from raw telemetry or tester reports? |
| **Actionable** | If the metric is below target, is there a clear remediation path defined? |

Each metric will be scored ✓ (passes all 3), ⚠ (passes 2/3), or ✗ (passes 0-1/3).

---

## 5. Weekly Review Dry Run Scope

Generate a completed weekly review using synthetic data across 25 simulated sessions from 3 testers. The review must exercise every section of the `MAY020_WEEKLY_REVIEW_TEMPLATE.md`:

- Review metadata
- Cohort aggregate telemetry (sessions, decisions, modes, readiness, interventions)
- User experience report (synthetic feedback)
- Trend analysis (week-over-week comparison)
- Phase 2 → Phase 3 gate assessment
- Recommendations and next-week actions

The synthetic data must be:
- Internally consistent (decisions sum to 100%, modes align with decisions, readiness bands consistent with interventions)
- Realistic (plausible numbers, not edge cases)
- Sufficient for a GO recommendation (composite score ≥ 85)

---

## 6. Deliverables

| # | Deliverable | Purpose |
|---|-------------|---------|
| 1 | `MAY021_MONITORING_SIMULATION_PLAN.md` | This document — simulation scenarios and scope |
| 2 | `MAY021_INCIDENT_SIMULATION_RESULTS.md` | Results of running S1-S5 through the monitoring/escalation framework |
| 3 | `MAY021_METRICS_VALIDATION.md` | Per-metric evaluation of collectability, observability, actionability |
| 4 | `MAY021_SAMPLE_WEEKLY_REVIEW.md` | Completed weekly review with synthetic pilot data |
| 5 | `MAY021_CLOSEOUT.md` | Closeout report with success criteria and governance verification |

---

## 7. Governance Constraints (Non-Negotiable)

| Constraint | Status |
|------------|--------|
| No source-content modifications | Active — all deliverables are new report files |
| No May feature activation changes | Active — read-only |
| No calibration changes | Active — read-only |
| No rollout expansion | Active — read-only |
| No pack/case/answer-key writes | Active — read-only |
| No question_state changes | Active — read-only |
| Governance Lane: Light | Active — documentation and simulation only |
| Preflight recommended at T0 | To be executed |
| Smoke test not required | No app.js/HTML/CSS/May file changes |
| REVISION_HISTORY.md not required | No content-level defect discovered |
| Destructive scripts §3.1 | N/A — no file operations |

---

## 8. Success Criteria

| # | Criterion | Verification Method |
|---|-----------|---------------------|
| SC1 | No source-content modifications | File diff — only new reports in `reports/` |
| SC2 | No May feature activation changes | No file writes to `may-*.js`, `may-pilot-activation.js` |
| SC3 | No calibration changes | No file writes to calibration-related files |
| SC4 | No rollout expansion | No flag changes |
| SC5 | Monitoring framework validated | All 5 scenarios produce correct tier classifications |
| SC6 | Operational process validated | Weekly review dry run executable |
| SC7 | All 15 metrics validated | Collectable/Observable/Actionable assessment complete |
| SC8 | Repository at 0 divergences | `npm run preflight` confirms |

---

## 9. File Manifests Created

Only new files in `reports/`:

- `reports/MAY021_MONITORING_SIMULATION_PLAN.md`
- `reports/MAY021_INCIDENT_SIMULATION_RESULTS.md`
- `reports/MAY021_METRICS_VALIDATION.md`
- `reports/MAY021_SAMPLE_WEEKLY_REVIEW.md`
- `reports/MAY021_CLOSEOUT.md`

No existing files modified.

---

*MAY-021 — Monitoring Simulation Plan — 2026-07-31*
