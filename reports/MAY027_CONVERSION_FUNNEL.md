# MAY-027 — Conversion Funnel

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Baseline Established (Zero Production Data)

---

## 1. Executive Summary

The conversion funnel maps the learner journey from seeing a May recommendation to completing a study session on the recommended topic. This document establishes the complete funnel structure, expected drop-off points, and reference conversion rates for future comparison.

**Key finding:** The funnel has 5 stages with structurally predictable drop-off at each stage. The largest projected drop-off is between Stage 1 (Presented) and Stage 2 (Panel Opened), where learners must take explicit action. Per-card click data (currently missing — see §4.2) is required to differentiate card-level conversion rates.

---

## 2. The May Conversion Funnel

### 2.1 Funnel Stages

```
STAGE 1: PRESENTED
    Recommendation cards rendered on summary view
    Event: trackAdoption({ presented: true }) × 4 cards
    ─────────────────────────────────────────────────
    Drop-off A: Learner ignores panel (doesn't open May)
    
STAGE 2: PANEL OPENED
    Learner opens May coaching (launcher or panel link)
    Event: trackAdoption({ panelOpened: true })
    ─────────────────────────────────────────────────
    Drop-off B: Learner opens May but doesn't click through
    
STAGE 3: CLICKED
    Learner clicks a specific action within May
    Event: trackAdoption({ clicked: true })
    ─────────────────────────────────────────────────
    Drop-off C: Learner browses but doesn't start a session
    
STAGE 4: SESSION STARTED
    Learner begins a practice session
    Event: trackAdoption({ sessionStarted: true })
    ─────────────────────────────────────────────────
    Drop-off D: Learner starts but doesn't complete
    
STAGE 5: SESSION COMPLETED
    Learner finishes and submits the session
    Event: trackAdoption({ completed: true })
```

### 2.2 Entry Points

Two paths into the funnel:

| Path | Trigger | Entry Stage | Event |
|------|---------|-------------|-------|
| **Recommendation Path** | Summary view renders after session completion | Stage 1 (Presented) | 4× presented events |
| **Direct Launcher Path** | Learner clicks launcher on landing page | Stage 2 (Panel Opened) | panelOpened + tooltipClicked |

The Recommendation Path is the primary funnel. The Direct Launcher Path bypasses Stage 1.

### 2.3 Funnel Schema

```
Recommendation Path:
  STAGE 1          STAGE 2          STAGE 3        STAGE 4        STAGE 5
  Presented ──→ Panel Opened ──→ Clicked ──→ Session Started ──→ Completed
    4×             1×              1×             1×             1×

Direct Launcher Path:
  (bypass) ──→ Panel Opened ──→ Clicked ──→ Session Started ──→ Completed

Aggregated:
  4× Present  ──→  1× Open  ──→  1× Click  ──→  1× Start  ──→  1× Complete
```

---

## 3. Projected Conversion Rates

### 3.1 Per-Stage Conversion (Structural Estimate)

| Stage Transition | Metric | Target (MAY-025) | Projected Range | Drop-off Rate |
|-----------------|--------|-----------------|-----------------|---------------|
| Stage 1 → 2 | Presented → Panel Opened | UA1: ≥ 70% | 60-80% | 20-40% |
| Stage 2 → 3 | Panel Opened → Clicked | UA2: ≥ 40% | 35-55% | 45-65% |
| Stage 3 → 4 | Clicked → Session Started | UA3: ≥ 25% | 20-35% | 65-80% |
| Stage 4 → 5 | Started → Completed | UA4: ≥ 20% | 15-30% | 70-85% |

### 3.2 Cumulative Funnel (Projected)

Starting from 100 sessions where recommendation panel renders:

```
STAGE 1 — 100 sessions, 400 cards presented
  ↓ 70% panel open rate (UA1)
STAGE 2 — 70 panel opens
  ↓ 40% click rate (UA2)
STAGE 3 — 28 clicks
  ↓ 25% session start rate (UA3)
STAGE 4 — 7 session starts
  ↓ 20% completion rate (UA4)
STAGE 5 — 1-2 completions
```

**Cumulative conversion (Presented → Completed): ~0.4%** per card. Across 4 cards per session, expected ~1.6% of sessions produce a completed follow-up session from a May recommendation.

### 3.3 Per-Card Funnel Projection

| Card | Presented | Panel Opened | Clicked | Started | Completed | Card Conversion |
|------|-----------|-------------|---------|---------|-----------|-----------------|
| Top Weakness | 100 | 70 | 35 | 11 | 3 | 3.0% |
| Suggested Review | 100 | 70 | 28 | 8 | 2 | 2.0% |
| Next Session | 100 | 70 | 21 | 5 | 1 | 1.0% |
| Readiness | 100 | 70 | 18 | 3 | <1 | <0.5% |

**Note:** These are structural projections. The Readiness card has the lowest projected conversion because it is primarily informational. However, it serves a different function (confidence and orientation) that is not captured by the conversion funnel.

---

## 4. Drop-Off Analysis

### 4.1 Largest Drop-Off Point: Stage 3 → Stage 4

The largest projected drop-off (65-80%) is between clicking in May and starting a session. Hypothesized causes:

| Cause | Probability | Evidence Needed |
|-------|-------------|-----------------|
| May recommends a topic the learner doesn't want to study | High | UT5 correlation: does recommended topic match learner intent? |
| Session start friction (must configure MCQ/case/mixed/full) | Medium | Time-to-start metric from click to session start |
| Learner was browsing only ("window shopping") | Medium | Bounce rate: click without any follow-up action |
| Readiness score surprises learner (too high or too low) | Low | Readiness band correlation with session start rate |

### 4.2 Second Largest: Stage 1 → Stage 2

20-40% of sessions where the recommendation panel renders, the learner never opens May. Hypothesized causes:

| Cause | Probability | Evidence Needed |
|-------|-------------|-----------------|
| Learner fatigue after completing a session | High | Time-of-day correlation |
| Panel is below the fold; learner doesn't scroll | Medium | Panel position audit |
| Learner satisfied with results; no need for coaching | Medium | Accuracy correlation: higher accuracy → lower panel open rate |
| Panel design doesn't compel action | Low | A/B test with different panel designs |

### 4.3 Known Missing Data: Per-Card Clicks (Critical Gap)

**The current instrumentation cannot attribute a click to a specific card.** The panel-level "Open May for full coaching" link fires an adoption event with `cardId: "rec-panel-link"` — it does not identify which of the 4 cards motivated the click.

**Impact:**
- UA5 (recommendation type effectiveness) cannot be measured
- UA6 (ignored recommendation types) cannot be measured
- Per-card conversion rates are structural estimates, not empirical
- The highest and lowest performing recommendation types cannot be identified

**Required fix:** Add per-card `onclick` handlers that fire `trackAdoption()` with the specific `cardId` before navigating to the coaching view.

---

## 5. Funnel Data Collection Plan

### 5.1 Events Required Per Funnel Stage

| Stage | Event | Required Fields | Collector |
|-------|-------|-----------------|-----------|
| 1 — Presented | `adoption` | `{ presented: true, cardId, recommendationType, topic }` | app.js:2152-2155 |
| 2 — Panel Opened | `adoption` | `{ panelOpened: true, cardId }` | app.js:2162, may-core.js:6578 |
| 3 — Clicked | `adoption` | `{ clicked: true, cardId }` | app.js:2162, may-core.js:6578 |
| 4 — Started | `adoption` | `{ sessionStarted: true, cardId }` | app.js:3986 |
| 5 — Completed | `adoption` | `{ completed: true, cardId }` | app.js:1608 |

### 5.2 Funnel Analysis Query

After collecting events via `MayTelemetry.drain()`, the funnel analysis is:

```javascript
function analyzeFunnel(events) {
  var adoption = events.filter(function(e) { return e.type === 'adoption'; });
  
  var presented = adoption.filter(function(e) { return e.data.presented; });
  var panelOpened = adoption.filter(function(e) { return e.data.panelOpened; });
  var clicked = adoption.filter(function(e) { return e.data.clicked; });
  var started = adoption.filter(function(e) { return e.data.sessionStarted; });
  var completed = adoption.filter(function(e) { return e.data.completed; });
  
  return {
    presented: presented.length,
    panelOpened: panelOpened.length,
    clicked: clicked.length,
    started: started.length,
    completed: completed.length,
    conversionRates: {
      presentedToOpened: panelOpened.length / (presented.length / 4),
      openedToClicked: clicked.length / panelOpened.length,
      clickedToStarted: started.length / clicked.length,
      startedToCompleted: completed.length / started.length,
      presentedToCompleted: completed.length / (presented.length / 4)
    }
  };
}
```

---

## 6. Funnel Health Benchmarks

### 6.1 Benchmark Tiers (from MAY-025 §3.2)

| Tier | Presented → Completed | Label | Action |
|------|----------------------|-------|--------|
| Strong | ≥ 2.0% | Funnel is effective | Continue; optimize high-drop-off stages |
| Adequate | 1.0-1.9% | Funnel is functional | Target Stage 3→4 drop-off |
| Weak | 0.5-0.9% | Funnel needs improvement | Investigate largest drop-off stage |
| Failing | < 0.5% | Funnel is broken | Reassess recommendation value proposition |

### 6.2 Stage-Level Health Benchmarks

| Stage | Strong | Adequate | Weak | Failing |
|-------|--------|----------|------|---------|
| Presented → Panel Opened | ≥ 80% | 60-79% | 40-59% | < 40% |
| Panel Opened → Clicked | ≥ 50% | 35-49% | 20-34% | < 20% |
| Clicked → Started | ≥ 35% | 20-34% | 10-19% | < 10% |
| Started → Completed | ≥ 30% | 15-29% | 5-14% | < 5% |

---

## 7. Current Status: All Stages PENDING

**Status reason:** The measurement window has not opened. Zero production sessions with adoption events have been collected. All funnel stages register 0 events. The funnel structure is complete and ready for data.

**First data available:** On the very next completed session, Stage 1 (Presented) and Stage 2 (Panel Opened, if learner opens May) will produce data. Stages 3-5 require the learner to click through and start a follow-up session, which may take multiple real sessions to accumulate meaningful counts.

---

## 8. Next Steps

| Priority | Action | Session |
|----------|--------|---------|
| 1 | **Critical:** Add per-card onclick telemetry (enable UA5/UA6) | MAY-028 |
| 2 | Address G1: persist per-event detail to localStorage | MAY-028 |
| 3 | Open measurement window; collect Stage 1 data immediately | Immediate |
| 4 | Accumulate funnel-stage data across ≥ 25 sessions | Ongoing |
| 5 | Identify largest drop-off point with real data | After 50 sessions |
| 6 | Compare empirical funnel to structural projections | After 100 sessions |

---

*MAY-027 — Conversion Funnel — v1.0 (Baseline) — 2026-07-31*
