# MAY-025 — Effectiveness Measurement Plan (Planner Phase)

**Session:** MAY-025 — May Effectiveness & Value Realization
**Date:** 2026-07-31
**Governance Lane:** Light (read-only measurement — no pack/case/content modifications)
**Prerequisite:** MAY-024 GO verdict (production activation complete)
**Status:** Active

---

## 1. Rationale

May has completed three major phases:

| Phase | Sessions | Scope |
|-------|----------|-------|
| Foundation & Architecture | MAY-001 → MAY-016 | Core engine, coaching modes, readiness, orchestration, telemetry |
| Pilot, Calibration & Operations | MAY-017 → MAY-021 | Activation, rollout governance, monitoring, dashboard |
| Production Integration & Activation | MAY-022 → MAY-024 | UI integration, validation, production activation |

May is now an **operational product** with monitoring, rollback, telemetry, and production integration. Adding more features is lower value than answering the central question:

> **Is May improving learner outcomes?**

MAY-025 shifts focus from engineering to effectiveness — measuring whether May's recommendations are useful, accurate, adopted, and engaging in real-user sessions.

---

## 2. Six Measurement Dimensions

### 2.1 Recommendation Quality (Weight: 25%)

**Question:** Are May's recommendations accurate, relevant, and actionable?

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| Weakness identification accuracy | RQ1 | Weakness topic matches learner's actual lowest-accuracy topic | ≥ 90% match rate | MayLearnerState + session accuracy by topic |
| Review suggestion relevance | RQ2 | Suggested review topic is within the learner's bottom 3 topics by accuracy | ≥ 85% | MayLearnerState |
| Next-session actionability | RQ3 | "Next Session" card recommends a topic the learner has attempted and scored below median | ≥ 80% | MayLearnerState |
| Recommendation panel renders without fallback | RQ4 | Sessions where all 4 cards render substantive (non-empty, non-"no data") content | ≥ 95% | may-telemetry.js `byType.recommendation` |

### 2.2 Readiness Accuracy (Weight: 20%)

**Question:** Does May's readiness scoring reflect actual learner performance?

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| Readiness band vs. actual accuracy alignment | RA1 | Difference between May readiness band and actual session accuracy, aggregated across topics | ≤ 15% deviation | MayReadinessEngine + session results |
| Readiness trend direction matches accuracy trend | RA2 | Sessions where readiness score and accuracy move in the same direction session-over-session | ≥ 80% of sessions | MayLearnerState across sessions |
| Ready-band reachability | RA3 | Sessions where ≥ 1 topic reaches "Ready" band (CAL-03 threshold) | ≥ 60% of sessions with 3+ attempts on a topic | may-telemetry.js `byType.readiness` |
| At-risk detection | RA4 | Sessions where the lowest-accuracy topic corresponds to a "Needs Work" or "At Risk" readiness band | ≥ 85% correspondence | MayReadinessEngine + session accuracy |

### 2.3 User Adoption (Weight: 20%)

**Question:** Are users reading and acting on May's recommendations?

This dimension is the direct answer to "Is May improving outcomes?" Without adoption measurement, recommendation quality can only be evaluated indirectly.

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| Recommendation panel opened | UA1 | Sessions where the user opens the May recommendation panel (click or auto-expand) | ≥ 70% of completed sessions | may-telemetry.js `byType.adoption` → `panelOpened` |
| Recommendation clicked | UA2 | Sessions where the user clicks a specific recommendation card | ≥ 40% of panel-opened sessions | may-telemetry.js `byType.adoption` → `clicked` |
| Recommendation actioned | UA3 | Sessions where the user starts a session based on a May recommendation | ≥ 25% of clicked sessions | may-telemetry.js `byType.adoption` → `sessionStarted` |
| Topic study from recommendation | UA4 | Sessions where the user completes questions on the recommended topic | ≥ 20% of actioned sessions | may-telemetry.js `byType.adoption` → `completed` |
| Recommendation type effectiveness | UA5 | Breakdown of adoption rate by recommendation type (Weakness, Review, Next, Readiness) | Reported, no fixed target | may-telemetry.js `byType.adoption` |
| Ignored recommendation types | UA6 | Recommendation types with the lowest click-to-action ratio | Identified for recalibration | may-telemetry.js `byType.adoption` |

**Adoption event schema** (per recommendation card):

```json
{
  "recommendationType": "Review Cost Variances",
  "cardId": "suggested-review",
  "topic": "Cost Variances",
  "presented": true,
  "panelOpened": true,
  "clicked": true,
  "sessionStarted": true,
  "completed": true,
  "timestamp": "2026-07-31T14:30:00.000Z"
}
```

### 2.4 Engagement (Weight: 15%)

**Question:** Is May holding learner attention and driving sustained use?

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| May coaching tab opened per session | EG1 | Sessions where the coaching tab is opened at least once | ≥ 50% of sessions | may-telemetry.js `byType.engagement` |
| Tooltip interaction rate | EG2 | Sessions where the user interacts with at least one May launcher tooltip | ≥ 30% of sessions | may-telemetry.js `byType.engagement` |
| Session count with May active | EG3 | Sessions where May pipeline fires ≥ 5 decision events (orchestrator engaged) | ≥ 90% of all sessions | may-telemetry.js `byType.decision` |
| Repeat May engagement | EG4 | Learners who engage with May in ≥ 2 consecutive sessions | ≥ 60% of learners with 3+ sessions | Cross-session telemetry |

### 2.5 Telemetry Reliability (Weight: 10%)

**Question:** Is the telemetry system producing complete, accurate data?

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| Telemetry persistence rate | TR1 | Sessions with non-empty `cmaMayPilotTelemetry` | = 100% | localStorage |
| Event type completeness | TR2 | Sessions with all event types present (decision, mode, readiness, recommendation, intervention, adoption, engagement) | ≥ 95% | may-telemetry.js `byType` |
| Telemetry archive consistency | TR3 | Archived telemetry snapshots match in-session telemetry (no data loss on copy) | 100% match | `reports/telemetry/` vs. console |
| Buffer overflow events | TR4 | Sessions where telemetry buffer reaches MAX_BUFFER (500 events) | 0 sessions (investigate if any) | may-telemetry.js buffer |

### 2.6 Production Stability (Weight: 10%)

**Question:** Is the May production layer operating without incidents?

| Metric | ID | Measurement | Target | Source |
|--------|----|------------|--------|--------|
| Zero May-attributed crashes | PS1 | Sessions with 0 browser console errors from May layer | = 100% | Browser console + tester reports |
| Recommendation panel render success | PS2 | Sessions where recommendation panel renders without fallback or error | ≥ 98% | app.js I3 try/catch |
| Rollback events | PS3 | Count of production rollbacks triggered for May layer | 0 | may-feature-flags.js log |
| Production flag stability | PS4 | Flag change events (excluding authorized toggles) | 0 unauthorized changes | MayFeatureFlags changeLog |

---

## 3. Composite Scoring

### 3.1 Score Calculation

```
Dimension Score = Σ (metric_achieved / metric_target) × (metric_weight / dimension_total_weight)
Composite Score  = Σ (Dimension Score × Dimension Weight)
```

Each metric is capped at 1.0 (100%). Dimension weight is its percentage share of the composite.

### 3.2 Overall Recommendation

| Composite Score | Recommendation |
|-----------------|---------------|
| ≥ 85 | **GO** — May is effective. Continue production operation. Consider LLM enablement discussion. |
| 70–84 | **CONDITIONAL GO** — May provides value but specific dimensions need improvement. Target low-scoring dimensions before major investment. |
| < 70 | **NO-GO** — May is not demonstrating sufficient value. Reassess production operation. Consider rollback or significant recalibration. |

### 3.3 Hard Gates (Non-Negotiable)

| Gate | Metric | Requirement |
|------|--------|-------------|
| G1 | PS1 | Zero May-attributed crashes. Any crash triggers immediate rollback. |
| G2 | PS3 | Zero rollback events. Any production rollback resets the measurement window. |
| G3 | TR1 | Telemetry persistence = 100%. Missing telemetry = no measurement possible. |
| G4 | Preflight | 0 divergences at all times per MAY-020 G4. |

---

## 4. Measurement Window

| Requirement | Value |
|-------------|-------|
| Minimum sessions before evaluation | 25 |
| Minimum calendar days | 14 |
| Minimum distinct learners | 3 |
| Additional requirement: adoption metrics | UA1-U4 require at least 10 panel-opened sessions for statistical significance |

Measurement runs until all minimums are met. If after 21 calendar days the minimums are still not met, the evaluation is declared **stalled** and a Phase 2 extension is required.

---

## 5. Deliverables

| # | Deliverable | Description |
|---|-------------|-------------|
| 1 | `MAY025_EFFECTIVENESS_MEASUREMENT_PLAN.md` | This document — measurement framework |
| 2 | `MAY025_TELEMETRY_EXTENSION_PLAN.md` | Spec for adoption + engagement event types to add to may-telemetry.js |
| 3 | `MAY025_DATA_COLLECTION_GUIDE.md` | Operational procedure for collecting adoption and engagement telemetry |
| 4 | `MAY025_PER_SESSION_ANALYSIS.md` | Template for per-session analysis using the 6-dimension framework |
| 5 | `MAY025_WEEKLY_AGGREGATE_TEMPLATE.md` | Template for weekly cohort-level aggregation |
| 6 | `MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md` | Final scorecard with GO / CONDITIONAL GO / NO-GO recommendation |

---

## 6. Telemetry Extension Required

To support the User Adoption (Section 2.3) and Engagement (Section 2.4) dimensions, `may-telemetry.js` must be extended with two new event types:

| Event Type | Function | Purpose |
|------------|----------|---------|
| `adoption` | `trackAdoption(data)` | Captures recommendation card interaction lifecycle: presented → panelOpened → clicked → sessionStarted → completed |
| `engagement` | `trackEngagement(data)` | Captures May UI interactions: coaching tab opened, tooltip shown, tooltip clicked, launcher dismissed |

These are **net-new telemetry events** (not modifications to existing pack/case/answer-key logic). The `cmaMayPilotTelemetry.byType` object will grow from 5 keys to 7 keys.

**No changes to:**
- Pack files
- Case files
- Answer keys
- question_state
- Scoring logic
- app.js render logic

---

## 7. Executive Scorecard Output

The final deliverable `MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md` will present:

| Area | Score | Key Finding |
|------|-------|-------------|
| Recommendation Quality | X/100 | Top strength / top weakness |
| Readiness Accuracy | X/100 | Top strength / top weakness |
| User Adoption | X/100 | Top strength / top weakness |
| Engagement | X/100 | Top strength / top weakness |
| Telemetry Reliability | X/100 | Top strength / top weakness |
| Production Stability | X/100 | Top strength / top weakness |
| **Overall Effectiveness** | **X/100** | Aggregated |

And a final:

```
GO          — May is effective. Continue operation.
CONDITIONAL GO — May provides partial value. Target low dimensions.
NO-GO       — May is not effective. Reassess.
```

---

## 8. Governance Classification

| Attribute | Value |
|-----------|-------|
| Governance Lane | **Light** — measurement only, no pack/case/content modifications |
| Content modifications | 0 |
| Pack file edits | 0 |
| Answer-key changes | 0 |
| question_state changes | 0 |
| Scoring changes | 0 |
| app.js modifications | 0 |
| may-telemetry.js modifications | Read-only audit of existing events; net-new adoption/engagement event types (Light Lane — UI/observability) |
| REVISION_HISTORY.md entry | Not required — no content defect discovered |
| DEFECT_LIBRARY.md entry | Not required — no new defect |
| CURRENT_BASELINES.md update | Not required — no runtime-critical file changes |
| Preflight required | Recommended (not mandatory per Light Lane) |
| Smoke required | Only if may-telemetry.js is modified |

---

## 9. Session Structure

MAY-025 follows the 4-stage nested prompt chain per `knowledge/SESSION_SCAFFOLD.md`:

| Phase | Role | Output |
|-------|------|--------|
| Planner | Define scope, dimensions, metrics, success criteria | This document |
| Auditor | Inspect current telemetry infrastructure, identify gaps, risk-assess extensions | `MAY025_TELEMETRY_EXTENSION_PLAN.md` |
| Implementer | Extend may-telemetry.js with adoption/engagement event types (if authorized); create data collection guide | `MAY025_DATA_COLLECTION_GUIDE.md` + code changes (if authorized) |
| Verifier | Run preflight + smoke, verify new event types, validate scorecard template, confirm governance | `MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md` |

---

## 10. May Program Status (Post-MAY-024, Pre-MAY-025)

| Milestone | Status |
|-----------|--------|
| Architecture | Complete |
| Adaptive Coaching | Complete |
| Readiness Scoring | Complete |
| Orchestration | Complete |
| Telemetry | Complete |
| Pilot Activation | Complete |
| Rollout Governance | Complete |
| Production Integration | Complete |
| Production Validation | Complete |
| Production Activation | Complete (MAY-024) |
| **Effectiveness Measurement** | **Active (MAY-025)** |
| Release Readiness | 98/100 |
| LLM Features | Disabled |

---

*MAY-025 — Effectiveness Measurement Plan — 2026-07-31*
