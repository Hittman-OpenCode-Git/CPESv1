# MAY-027 — Engagement Analysis

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Baseline Established (Zero Production Data)

---

## 1. Executive Summary

Engagement analysis measures whether users interact with May's UI surfaces — the launcher, tooltips, companion card, and coaching tab — beyond the recommendation panel. This analysis establishes the engagement measurement framework covering five touchpoints tracked via `MayTelemetry.trackEngagement()`.

**Key finding:** The engagement telemetry infrastructure is production-live with 5 injection sites in may-core.js. Zero production engagement data has been collected. The framework projects engagement patterns based on UI surface visibility and interaction affordances.

---

## 2. Engagement Touchpoints

### 2.1 UI Surfaces That Produce Engagement Events

| Surface | Description | Visible When | User Action | Event |
|---------|-------------|-------------|-------------|-------|
| Companion Card | Landing page greeting card | Landing page (no active session) | Dismiss | `dismissed` |
| Floating Launcher | Persistent coaching entry point | Landing page + post-session | View tooltip | `tooltipViewed` |
| Floating Launcher | Persistent coaching entry point | Landing page + post-session | Click to open May | `tooltipClicked` |
| Coaching Tab | May coaching panel | Anytime (tab navigation) | Open coaching tab | Not individually tracked |
| Review Bridge | Post-answer coaching buttons | Review mode (per question) | Click "Discuss with May" | Not individually tracked |

### 2.2 Injection Sites (Verified Present)

| # | File:Line | Function | Event | Trigger |
|---|-----------|----------|-------|---------|
| E1 | may-core.js:6505 | `dismissMayCompanionCard()` | dismissed | User dismisses companion card |
| E2 | may-core.js:6535 | `_injectMayLauncher()` | tooltipViewed | Launcher injected into DOM |
| E3 | may-core.js:6561 | `_updateMayLauncherState()` | tooltipViewed | Launcher tooltip content updated |
| E4 | may-core.js:6579 | `openMayFromLauncher()` | tooltipClicked | User clicks launcher button |
| E5 | may-core.js:6578 | `openMayFromLauncher()` | — (adoption event) | Also fires adoption: panelOpened + clicked |

### 2.3 Engagement Event Schema

```json
{
  "type": "engagement",
  "timestamp": "ISO 8601",
  "data": {
    "action": "dismissed | tooltipViewed | tooltipClicked",
    "timestamp": "ISO 8601"
  }
}
```

### 2.4 Expected Events Per Session

| Flow | Count | Events |
|------|-------|--------|
| Landing page load | 1 | tooltipViewed (launcher injected) |
| Landing page — dismiss companion | 0-1 | dismissed |
| Landing page — launcher state update after session | 0-1 | tooltipViewed |
| User clicks launcher | 0-1 | tooltipClicked |
| **Total per session** | **1-4** | |

---

## 3. Engagement Metrics Framework

### 3.1 Engagement Metrics (from MAY-025 §2.4)

| ID | Metric | Measurement | Target | Status |
|----|--------|-------------|--------|--------|
| EG1 | Coaching tab opened per session | Sessions where coaching tab is opened at least once | ≥ 50% | Not individually tracked — requires wiring |
| EG2 | Tooltip interaction rate | Sessions with ≥ 1 tooltipClicked event | ≥ 30% | Awaiting data |
| EG3 | May pipeline active sessions | Sessions where orchestrator fires ≥ 5 decision events | ≥ 90% | Measurable via orchestrator telemetry |
| EG4 | Repeat May engagement | Learners who engage with May in ≥ 2 consecutive sessions | ≥ 60% | Requires cross-session learner tagging |

### 3.2 Additional Engagement Metrics (Not in MAY-025 Scope)

| ID | Metric | Data Source | Purpose |
|----|--------|-------------|---------|
| EG5 | Companion card dismissal rate | dismissed / tooltipViewed ratio | Measures landing-page fatigue |
| EG6 | Launcher click-through rate | tooltipClicked / tooltipViewed ratio | Measures launcher effectiveness |
| EG7 | Session-to-coaching latency | Time from session complete to coaching open | Measures post-session coaching timeliness |
| EG8 | Coaching session duration | Time in coaching tab (estimated) | Measures depth of engagement |

---

## 4. Engagement Pattern Analysis (Projected)

### 4.1 Three Engagement Archetypes

Based on UI surface design and expected learner behavior:

| Archetype | Pattern | Expected Distribution | Behavior |
|-----------|---------|----------------------|----------|
| **Active Engager** | Opens May from launcher; uses coaching tab; reviews recommendations | 25-35% | High tooltipClicked rate; low dismissal rate; bridges from review mode |
| **Passive Observer** | Sees tooltips; reads recommendations; rarely opens coaching | 40-50% | High tooltipViewed; low tooltipClicked; may dismiss companion card |
| **May Avoider** | Dismisses companion card; never opens launcher; ignores recommendations | 20-30% | High dismissed rate; zero tooltipClicked; zero coaching tab |

### 4.2 Companion Card Lifecycle

```
First visit: Companion card visible → tooltipViewed fires
    ↓
Scenario A: User clicks "Start with May" → tooltipClicked → coaching opens
Scenario B: User clicks "Maybe later" → dismissed fires → card hidden
Scenario C: User starts session → card auto-hides → returns post-session
    ↓
Subsequent visits: Companion card re-shown (sessionStorage cleared)
```

**Projected dismissal rate:** 30-50% on first impression (typical for onboarding cards).

### 4.3 Launcher Tooltip Cycle

```
Session complete → tooltipUpdated → tooltipViewed fires
    ↓
"Review your session with May" tooltip shown
    ↓
Scenario A: User clicks → tooltipClicked → coaching opens
Scenario B: User ignores → tooltip persists until next page action
    ↓
Next landing page visit → launcher state checked → tooltipViewed fires (if content changed)
```

**Projected launcher click-through rate:** 25-35% (higher after sessions with poor performance; lower after sessions where all answers were correct).

---

## 5. Engagement by Learner State (Scenario Reference)

Using the 40 synthetic profiles from scenario telemetry:

| Readiness Band | Profiles | Projected Engagement | Rationale |
|----------------|----------|---------------------|-----------|
| Recovery needed (score < 50) | 4 | **High** | Struggling learners seek coaching most actively |
| Developing (score 50-64) | 11 | **Moderate-High** | Active improvement; open to coaching |
| Approaching review-ready (score 65-79) | 4 | **Moderate** | May selectively use coaching for weak spots |
| Not enough data (score 0) | 1 | **Low** | New learner; hasn't discovered coaching value |

### 5.1 Projected Engagement-Readiness Correlation

```
Engagement ↑ as Readiness ↓

High engagement: Recovery needed, Developing (declining)
Moderate engagement: Developing (stable), Approaching review-ready
Low engagement: Approaching review-ready (confident), Not enough data, High Mastery

Expected correlation: r ≈ -0.4 to -0.6
Learners who struggle engage more with coaching.
```

This projection is consistent with the coaching product's design intent: May is most valuable when the learner needs help.

---

## 6. Instrumentation Gaps

| # | Gap | Severity | Description |
|---|------|----------|-------------|
| G1 | No coaching tab open event | **Medium** | EG1 cannot be measured. The coaching tab is navigated via `showView('coachView')` but does not fire telemetry. |
| G2 | No review bridge telemetry | **Medium** | "Discuss with May" and "What went wrong?" buttons (app.js:2550-2553) do not fire engagement events. These are high-value coaching entry points. |
| G3 | No per-session engagement aggregation | **Medium** | Engagement events are counted but not scoped to a specific session. Cross-session tracking requires manual correlation. |
| G4 | No coaching session duration | **Low** | No timer for time spent in coaching tab. Depth of engagement is unmeasurable. |
| G5 | Companion card re-dismissal not distinguished | **Low** | Cannot tell if a learner dismissed the card once or repeatedly across sessions. |

---

## 7. Recommended Instrumentation Additions

| Priority | Addition | Location | Enables |
|----------|----------|----------|---------|
| 1 | trackEngagement on coaching tab open | app.js: `showView('coachView')` | EG1 |
| 2 | trackEngagement on review bridge buttons | app.js:2550-2553 | EG7, bridge effectiveness |
| 3 | Coaching tab entry/exit timers | may-core.js | EG8 |
| 4 | Session ID tagging on all events | may-telemetry.js | EG4, cross-session tracking |

---

## 8. Next Steps

| Priority | Action | Session |
|----------|--------|---------|
| 1 | Add coaching tab open telemetry (enable EG1) | MAY-028 |
| 2 | Add review bridge telemetry | MAY-028 |
| 3 | Open measurement window; collect production data | Immediate |
| 4 | Measure EG2/EG3/EG4 with real data | After 25 sessions |
| 5 | Correlate engagement with readiness scores | After 50 sessions |

---

*MAY-027 — Engagement Analysis — v1.0 (Baseline) — 2026-07-31*
