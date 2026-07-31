# MAY-027 — Recommendation Effectiveness

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Baseline Established (Zero Production Data)

---

## 1. Executive Summary

Recommendation effectiveness measures whether the four recommendation cards produced by May drive learning action. This analysis establishes the structural framework for measuring recommendation quality (RQ1-RQ4 from MAY-025 §2.1) and adoption effectiveness (UA1-UA6 from MAY-025 §2.3).

**Key finding:** The recommendation pipeline produces 4 cards per completed session. All 4 card types have structured data sources. The recommendation quality framework is complete. Zero production data exists to evaluate actual effectiveness. Scenario data (40 synthetic profiles) confirms the pipeline produces substantive recommendations for all reachable learner archetypes.

---

## 2. Recommendation Pipeline

### 2.1 Pipeline Architecture

```
Session Complete
    ↓
MayLearnerState.getWeaknessClusters()  →  Top Weakness card
MayLearnerState.getReadinessSummary()  →  Suggested Review card
MayReadinessScorer.score()            →  Readiness card
MayCoachingOrchestrator.orchestrate() →  Next Session card
    ↓
_renderMayRecommendationPanel()
    ↓
4 cards rendered in may-rec-grid
Each card fires: MayTelemetry.trackAdoption({ presented: true })
```

### 2.2 Card Data Sources and Reliability

| # | Card | Data Source | Requires | Fallback | Render Rate (Projected) |
|---|------|-------------|----------|----------|------------------------|
| 1 | Top Weakness | `getWeaknessClusters()` | ≥ 3 attempts on a topic | "No weakness data yet" | ≥ 95% with session history |
| 2 | Suggested Review | `getReadinessSummary()` | ≥ 1 session | "Complete a practice session" | ≥ 90% |
| 3 | Next Session | `orchestrate().nextAction` | ≥ 3 sessions | "Complete more sessions" | ≥ 85% with session history |
| 4 | Readiness | `score().overallBand` | ≥ 1 session | "Not enough data" | ≥ 95% (always renders) |

### 2.3 Pipeline Events Per Session

| Event | Producer | Type | Per Session |
|-------|----------|------|-------------|
| `trackRecommendation()` | may-coaching-orchestrator:301 | recommendation | 3-5 |
| `trackAdoption({ presented })` | app.js:2152-2155 | adoption | 4 |
| `trackAdoption({ panelOpened, clicked })` | app.js:2162 | adoption | 0-2 |

---

## 3. Recommendation Quality Framework (Structural)

### 3.1 Quality Metrics (from MAY-025 §2.1)

| ID | Metric | Measurement | Target | Status |
|----|--------|-------------|--------|--------|
| RQ1 | Weakness identification accuracy | Weakness topic matches learner's lowest-accuracy topic | ≥ 90% | Awaiting data |
| RQ2 | Review suggestion relevance | Suggested review topic is within bottom 3 topics by accuracy | ≥ 85% | Awaiting data |
| RQ3 | Next-session actionability | Next Session card recommends a topic with data and below-median accuracy | ≥ 80% | Awaiting data |
| RQ4 | Panel render without fallback | All 4 cards render substantive content | ≥ 95% | Structurally projected ≥ 90% |

### 3.2 Scenario-Based Quality Assessment

Using the 40 synthetic profiles (MAY-012 through MAY-016):

| Profile Archetype | Readiness Score | Recommendations | Quality Indicator |
|-------------------|-----------------|-----------------|-------------------|
| D1 — Critical Remediation (4 profiles) | 42 | 5 remediation recommendations | Pipeline identifies weakness correctly |
| D2 — Critical Weakness (9 profiles) | 62-69 | 3-5 targeted recommendations | Specific topic identified |
| D3 — Unstable Declining (1 profile) | 52 | 3-5 recommendations | Trend-detection active |
| D4 — Exam Strategy (3 profiles) | 52-65 | Mix of study plan + quiz | Mode diversity |
| D5 — Declining Trend (3 profiles) | 52 | Targeted remediation | Trend-driven |
| D6 — Emerging Weakness (2 profiles) | 52-59 | Preventative recommendations | Early detection |
| D8 — Section Coverage Gap (3 profiles) | 0-62 | Exploratory recommendations | Gap-aware |
| D9 — High Mastery (2 profiles) | 67-72 | Challenge recommendations | Advanced content |
| D10 — Insufficient Data (1 profile) | 52 | Generic recommendations | Data-gated |

**Scenario quality assessment:** The pipeline produces appropriate recommendation types for all 9 reachable decision paths (D1-D10 coverage: 8/10). Recommendations scale appropriately with learner maturity — remediation for D1/D2, exploration for D8, challenge for D9.

---

## 4. Recommendation Adoption Funnel (Projected)

### 4.1 Per-Card Funnel Structure

```
Card Presented (100%)
    ↓
Card Viewed (panel opened)
    ↓
Card Clicked (specific card action)
    ↓
Session Started (from recommendation)
    ↓
Session Completed (on recommended topic)
```

### 4.2 Projected Conversion Rates (Structural Estimates)

These are structural projections based on card data quality and actionability — not empirical data:

| Card | Presented → Viewed | Viewed → Clicked | Clicked → Started | Started → Completed |
|------|-------------------|-----------------|-------------------|---------------------|
| Top Weakness | 100% (panel renders all 4) | 45-55% | 30-40% | 25-35% |
| Suggested Review | 100% | 35-45% | 25-35% | 20-30% |
| Next Session | 100% | 25-35% | 20-30% | 15-25% |
| Readiness | 100% | 20-30% | 10-20% | 5-15% |

**Rationale:**
- **Top Weakness** projects highest conversion — specific, personal, action-oriented
- **Suggested Review** projects second — specific topic but less urgency
- **Next Session** projects moderate — requires session history; may be less specific for new learners
- **Readiness** projects lowest — informational; learners view the band but rarely act on it alone

### 4.3 Aggregated Session Funnel

```
Per completed session:
  Presented: 4 cards (100%)
  Panel opened: 70% of sessions (MAY-025 target UA1)
  Card clicked: 40% of panel-opened (MAY-025 target UA2)
  Session started from rec: 25% of clicks (MAY-025 target UA3)
  Topic completed: 20% of starts (MAY-025 target UA4)

Expected events per 10 sessions at target rates:
  40 presented events
  28 panel opens (70%)
  11 card clicks (40%)
  3 session starts (25%)
  1 completion (20%)
```

---

## 5. Recommendation Type Effectiveness Projection

### 5.1 Effectiveness Scoring Model

Each recommendation type receives an effectiveness score based on:

```
Effectiveness = (clicked / presented) × 0.4
              + (sessionStarted / clicked) × 0.3
              + (completed / sessionStarted) × 0.3
```

### 5.2 Projected Rankings (Awaiting Data)

| Rank | Card | Projected Score | Rationale |
|------|------|-----------------|-----------|
| 1 | Top Weakness | 0.45-0.55 | High specificity, personal relevance |
| 2 | Suggested Review | 0.30-0.40 | Specific topic, moderate urgency |
| 3 | Next Session | 0.20-0.30 | Requires session history; actionable |
| 4 | Readiness | 0.10-0.20 | Informational; rarely drives action alone |

**Note:** These are structural projections. Actual rankings will be determined by production data and may differ significantly from projections. The Readiness card, while projecting lowest conversion, serves a different purpose (orientation, confidence-building) that is not captured by click-through rates alone.

---

## 6. Known Limitations (Production Readiness)

| # | Limitation | Impact | Mitigation |
|---|------------|--------|------------|
| L1 | Zero production sessions | Cannot evaluate effectiveness | Open measurement window immediately |
| L2 | G1: Counts-only snapshot | Cannot analyze per-card type effectiveness | Address in MAY-028 |
| L3 | No individual card click handlers | Cannot distinguish which specific card was clicked (panel-level only) | Requires per-card onclick wiring |
| L4 | No "why ignored" data | Cannot determine if cards are ignored due to irrelevance, poor design, or learner disengagement | Qualitative study required |

**Critical L3 finding:** The current wiring tracks panel-level clicked (via the "Open May for full coaching" link or launcher button), NOT per-card clicks. This means UA5 (recommendation type effectiveness) and UA6 (ignored types) CANNOT be measured with the current instrumentation. Per-card onclick telemetry must be added to distinguish which card drove the action.

---

## 7. Next Steps

| Priority | Action | Session |
|----------|--------|---------|
| 1 | **Critical:** Add per-card onclick telemetry to enable UA5/UA6 | MAY-028 |
| 2 | Address G1: persist per-event detail | MAY-028 |
| 3 | Open measurement window; collect production data | Immediate |
| 4 | Score RQ1-RQ4 with real data after ≥ 25 sessions | After measurement window |
| 5 | Identify highest and lowest performing recommendation types | After 50 sessions |

---

*MAY-027 — Recommendation Effectiveness — v1.0 (Baseline) — 2026-07-31*
