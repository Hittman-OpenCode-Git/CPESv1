# MAY-023 — Rollout Validation Plan

**Session:** MAY-023 — Controlled Production Rollout Validation
**Date:** 2026-07-31
**Governance Lane:** Light (validation only — no code, content, or flag modifications)
**Based on:** MAY-022 Production UI Integration

---

## 1. Objective

Validate the MAY-022 production integration experience under the 4-stage scaffold (Planner → Auditor → Implementer → Verifier). Determine whether May is ready to move from feature-flagged production integration to broader user exposure.

**No LLM activation. No scoring changes. No content changes. No certification changes.**

---

## 2. Lane Determination

| Trigger | Present? |
|---------|----------|
| Pack file edits | No |
| Case file edits | No |
| Answer-key changes | No |
| Certification state changes | No |
| Governance-critical file edits | No |
| UI/coaching validation only | Yes |

**Verdict: Governance Light Lane** — per AGENTS.md §9.1

---

## 3. Validation Scope

### 3.1 Integration Points Under Review

| # | Location | Integration Point | What It Does |
|---|----------|------------------|--------------|
| I1 | app.js:1607 | Post-session launcher | Updates tooltip to "Review your session with May" |
| I2 | app.js:1634 | Landing page launcher | Context-aware messaging based on session count |
| I3 | app.js:2132 | Results recommendation panel | Top Weakness, Suggested Review, Next Session, Readiness |
| I4 | app.js:3971 | Session-start launcher | "May is tracking your session" |

### 3.2 Focus Areas

1. **Results Page Experience** — Recommendation panel accuracy and usefulness
2. **Contextual Launcher** — Messaging usefulness and non-intrusiveness
3. **Telemetry** — Readiness distributions, recommendation behavior
4. **Rollback Safety** — One-step flag toggle verification

### 3.3 Out of Scope

- May coaching mode content (EXPLAIN, QUIZ, SOCRATIC, STUDY_PLAN)
- LLM activation (all LLM flags remain false)
- MayLearnerState data model (existing, tested in MAY-002 through MAY-004)
- Readiness engine calibration (MAY-019 applied all CAL-01 through CAL-07 fixes)
- Pilot activation (may-pilot-activation.js unchanged)

---

## 4. Success Criteria

| # | Criterion | Pass Condition |
|---|-----------|---------------|
| S1 | Recommendation panel provides useful guidance | Panel renders with meaningful data when sessions ≥ 1; returns empty when no data |
| S2 | Contextual launcher improves engagement | Tooltips are non-intrusive, context-appropriate, and change with session state |
| S3 | Telemetry demonstrates healthy behavior | Prior telemetry reviews (MAY-018/019/021) confirm decision engine and recommendation health |
| S4 | Rollback remains functional | Single flag toggle (`ENABLE_PRODUCTION_MAY_INTEGRATION = false`) removes all 4 integration points |
| S5 | Smoke PASS | 17/17 checks pass |
| S6 | Preflight 0 divergences | Confirmed at T0 |
| S7 | Governance PASS | 54/54 guard tests pass |
| S8 | Clear GO / CONDITIONAL GO / NO-GO recommendation | Based on evidence, not speculation |

---

## 5. Session Structure

```
Planner (this document)
 ├─ Rollout Planner
 ├─ UX Validation Planner
 └─ Telemetry Planner

Auditor (MAY023_RECOMMENDATION_REVIEW.md)
 ├─ Integration Auditor
 ├─ Recommendation Auditor
 └─ Rollback Auditor

Implementer (MAY023_TELEMETRY_REVIEW.md + MAY023_USER_WORKFLOW_ASSESSMENT.md)
 ├─ Production Flow Validation
 ├─ Recommendation Review
 ├─ Telemetry Review
 └─ Readiness Assessment

Verifier (MAY023_PRODUCTION_READINESS_REVIEW.md + MAY023_CLOSEOUT.md)
 ├─ UX Verifier
 ├─ Telemetry Verifier
 ├─ Regression Verifier
 └─ Governance Verifier
```

---

## 6. Deliverables

| # | Deliverable | Purpose |
|---|-------------|---------|
| 1 | `MAY023_ROLLOUT_VALIDATION_PLAN.md` | This document — scope, criteria, structure |
| 2 | `MAY023_RECOMMENDATION_REVIEW.md` | Auditor phase — code inspection of integration points |
| 3 | `MAY023_TELEMETRY_REVIEW.md` | Implementer phase — cross-reference against MAY-018/019/020/021 |
| 4 | `MAY023_USER_WORKFLOW_ASSESSMENT.md` | Implementer phase — production flow validation |
| 5 | `MAY023_PRODUCTION_READINESS_REVIEW.md` | Verifier phase — GO/CONDITIONAL/NO-GO verdict |
| 6 | `MAY023_CLOSEOUT.md` | Verifier phase — closeout with governance checklist |

---

## 7. Parallel-Safe Work

MAY-023 can run safely alongside:

- Session 92 (Pack B Section B modernization) — May reads question_state, does not write
- Session 97P (Quality Gate Automation Prototype)
- Session 98P (Reclassification ROI Analysis)

because it touches only the May production-integration layer and operational validation systems.

---

## 8. Governance Constraints

| Constraint | Applied |
|------------|---------|
| No pack/case file edits | ✓ |
| No answer-key changes | ✓ |
| No certification changes | ✓ |
| No content modifications | ✓ |
| No flag state changes | ✓ (read-only validation) |
| REVISION_HISTORY entry | Not required (Light Lane, no content defect found) |
| DEFECT_LIBRARY entry | Not required (no new defect discovered) |
| Smoke at Tend | Required (UI integration validation) |
| Preflight at T0 | Completed (0 divergences) |

---

*MAY-023 — Rollout Validation Plan — 2026-07-31*
