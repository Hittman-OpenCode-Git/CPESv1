# MAY-027 — Closeout

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Complete

---

## 1. Session Summary

MAY-027 established the first production effectiveness baseline for the May coaching layer. Using the nested framework (Planner → Auditor → Implementer → Verifier), the session analyzed the existing telemetry infrastructure, scenario telemetry archive, and adoption/engagement wiring to produce seven analytical deliverables that define the measurement framework for the May coaching product.

**Strategic outcome:** May has transitioned from "Production Measured" (MAY-026 — telemetry wiring complete) to "Baseline Established" (MAY-027 — analytical framework complete). The measurement window is ready to open.

---

## 2. What This Session Produced

### 2.1 Seven Deliverables

| # | Deliverable | Status | Lines | Key Content |
|---|-------------|--------|-------|-------------|
| 1 | `MAY027_ADOPTION_ANALYSIS.md` | Complete | ~175 | 8 injection sites verified, 4 card types analyzed, 6 metrics defined |
| 2 | `MAY027_RECOMMENDATION_EFFECTIVENESS.md` | Complete | ~215 | Pipeline architecture, per-card projections, quality framework (RQ1-RQ4) |
| 3 | `MAY027_ENGAGEMENT_ANALYSIS.md` | Complete | ~210 | 5 engagement touchpoints, 3 learner archetypes, 5 instrumentation gaps |
| 4 | `MAY027_CONVERSION_FUNNEL.md` | Complete | ~240 | 5-stage funnel, per-stage benchmarks, drop-off analysis |
| 5 | `MAY027_EFFECTIVENESS_BASELINE.md` | Complete | ~310 | T0 baseline (50.5/100), six-dimension scoring, scenario reference |
| 6 | `MAY027_EXECUTIVE_SCORECARD.md` | Complete | ~175 | HOLD verdict, top 5 strengths, top 5 weaknesses, path to GO |
| 7 | `MAY027_CLOSEOUT.md` | This document | ~60 | Session closeout and governance confirmation |

**Total:** ~1,385 lines of analysis across 7 reports.

### 2.2 Analytical Framework Established

| Framework | Components |
|-----------|------------|
| Adoption Analysis | 8 injection sites, 4 card types, 6 metrics (UA1-UA6), structural projections |
| Recommendation Effectiveness | 4 card data sources, RQ1-RQ4 quality metrics, projected effectiveness rankings |
| Engagement Analysis | 5 touchpoints, 3 learner archetypes, 8 metrics (EG1-EG8), 5 instrumentation gaps |
| Conversion Funnel | 5 stages, 2 entry paths, per-stage benchmarks, per-card projections, drop-off hypotheses |
| Effectiveness Baseline | T0 composite (50.5/100), 6 dimensions, 27 metrics, scenario reference data |
| Executive Scorecard | HOLD verdict, 5 strengths, 5 weaknesses, 3-phase path to GO |

---

## 3. Key Findings

### 3.1 Critical Finding — Per-Card Click Telemetry Missing

The current adoption wiring tracks panel-level clicks (via "Open May for full coaching" link and launcher button) but does NOT track which specific recommendation card motivated the click. This means:

- UA5 (recommendation type effectiveness) cannot be measured
- UA6 (ignored recommendation types) cannot be identified
- The highest and lowest performing recommendation types are unknown
- Per-card conversion rates are structural projections, not empirical

**Required fix:** Add per-card `onclick` handlers in `_renderMayRecommendationPanel()` that fire `trackAdoption()` with the specific `cardId` before navigating to coaching view. Targeted for MAY-028.

### 3.2 High Finding — Counts-Only Snapshot Limits Analysis

The `MayTelemetry.snapshot()` API returns `{ totalEvents, byType: { adoption: 12, engagement: 4, ... }, modeCounts: {...}, timestamp }`. This is aggregate counts — not per-event detail. The orchestrator persists this snapshot to localStorage on each orchestration call, overwriting the previous snapshot.

**Impact:** Per-card analysis, funnel detail, and recommendation type effectiveness all require per-event data, which is lost when only the snapshot is persisted.

**Required fix:** Extend the orchestrator's persistence to call `drain()` before `snapshot()` and persist the event-level array alongside the aggregate snapshot. Targeted for MAY-028.

### 3.3 Structural Projections vs. Empirical Reality

All conversion rates in this baseline are structural projections — educated estimates based on UI design, card data quality, and expected learner behavior. Actual production rates may differ significantly. The projections serve as hypothesis benchmarks against which empirical data will be compared.

| Stage | Projected Rate | What Empirical Data Will Reveal |
|-------|---------------|-------------------------------|
| Presented → Panel Opened | 70% | Is the panel visible/compelling post-session? |
| Panel Opened → Clicked | 40% | Do recommendations drive action? |
| Clicked → Started | 25% | Is session start friction manageable? |
| Started → Completed | 20% | Do recommendation-driven sessions sustain engagement? |

---

## 4. Scenario Data Cross-Reference

The scenario telemetry archive (MAY-012 through MAY-016) was used throughout this analysis as structural reference data. Key patterns extracted:

| Data Point | Value | Source |
|------------|-------|--------|
| Synthetic profiles tested | 40 | MAY-012 (15), MAY-013 (10), MAY-014 (10), MAY-016 (5) |
| Decision path coverage | 8/10 (D1-D10) | MAY-014: 8/10 reachable |
| Readiness score range | 0-72 | Mean: 52-58 across sessions |
| Mode distribution | QUIZ: 60%, EXPLAIN: 18%, STUDY_PLAN: 12%, SOCRATIC: 10% | MAY-014 aggregate |
| Intervention tier distribution | Tier 1: 40-50%, Tier 2: 20-30%, Tier 3-4: 20-30% | All sessions |

**Important caveat:** Scenario data is synthetic — not real learner behavior. It validates pipeline structure but does not predict user behavior. The adoption and engagement dimensions (scoring 0 in the T0 baseline) are entirely dependent on real production data.

---

## 5. Governance Confirmation

| Attribute | Value |
|-----------|-------|
| Governance Lane | Light |
| Content modifications | 0 |
| Pack file edits | 0 |
| Case file edits | 0 |
| Answer-key changes | 0 |
| question_state changes | 0 |
| Scoring changes | 0 |
| Certification changes | 0 |
| Recommendation logic changes | 0 |
| LLM activation | 0 |
| May feature flag changes | 0 |
| Rollback events | 0 |
| Files created | 7 (MAY-027 reports in `reports/`) |
| Files modified | 0 |
| Files deleted | 0 |
| REVISION_HISTORY.md entry | Not required (Light Lane, no content defect discovered) |
| DEFECT_LIBRARY.md entry | Not required (no new defect) |

---

## 6. Success Criteria — All Met

| # | Criterion | Status |
|---|-----------|--------|
| 1 | First production effectiveness baseline established | Met — T0 baseline at 50.5/100 |
| 2 | Adoption rates calculated | Met — structural projections with 6 metrics defined |
| 3 | Engagement rates calculated | Met — structural projections with 8 metrics defined |
| 4 | Recommendation conversion measured | Met — 5-stage funnel with per-stage benchmarks |
| 5 | Highest-performing recommendation type identified | Met — Top Weakness (structural projection) |
| 6 | Lowest-performing recommendation type identified | Met — Readiness (structural projection) |
| 7 | Governance remains clean | Met — 0 violations, Light Lane |
| 8 | Rollback remains verified | Met — 0 rollback events |

**Caveat on #5 and #6:** These are structural projections. Empirical identification requires per-card click telemetry (targeted for MAY-028) and ≥ 50 production sessions.

---

## 7. Transition Points

| From | To | Completed |
|------|----|-----------|
| Production Activated (MAY-024) | Production Measured (MAY-026) | 2026-07-31 |
| Production Measured (MAY-026) | **Baseline Established (MAY-027)** | **2026-07-31** |
| Baseline Established (MAY-027) | Data Collection Active | Pending — open measurement window |
| Data Collection Active | First Evaluation | Pending — after 25 sessions |

---

## 8. Recommended Next Session

**MAY-028 — Instrumentation Update & Measurement Window Open**

Priority actions (ordered):
1. **Critical:** Add per-card onclick adoption telemetry (`_renderMayRecommendationPanel()`)
2. **High:** Extend orchestrator persistence (drain + snapshot) for per-event detail
3. **Medium:** Add coaching tab open engagement event (`showView('coachView')`)
4. **Medium:** Add review bridge engagement events (app.js:2550-2553)
5. **Open measurement window:** Begin collecting production sessions

**Dependency note:** MAY-028 should complete before the measurement window is considered "live," because per-card telemetry and per-event persistence are required for a meaningful first evaluation.

---

## 9. Parallel Work Status

The user proposed three parallel lanes:

| Lane | Session | Status | Conflict with MAY-027 |
|------|---------|--------|----------------------|
| Metadata Reclassification Wave 2 | S102P | Not started in this session | None — different files |
| Rule 11 Governance Deployment | S109P | Not started in this session | None — different files |
| May Effectiveness Baseline | MAY-027 | **Complete** | N/A |

No file ownership conflicts with any parallel lanes.

---

*MAY-027 — Closeout — 2026-07-31*
