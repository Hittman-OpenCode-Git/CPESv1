# MAY-025 — Data Collection Guide

**Session:** MAY-025 — May Effectiveness & Value Realization
**Date:** 2026-07-31
**Status:** Active — awaiting live telemetry data
**Governance Lane:** Light

---

## 1. Overview

This guide describes how to collect adoption and engagement telemetry from the CMA Part 1 Exam Simulator for the MAY-025 effectiveness measurement program.

**Current state:** The telemetry infrastructure is fully wired and production-active (MAY-024). No live telemetry data exists yet — this guide is the operational procedure for the first data collection window.

---

## 2. Telemetry Architecture

### 2.1 Flow Path

```
User action in app.js / may-core.js
  → MayTelemetry.trackEvent(data)
    → MayTelemetry._buffer[0..MAX_BUFFER-1]  (in-memory ring buffer, cap 500 events)
      → MayCoachingOrchestrator serializes snapshot to localStorage
        → localStorage["cmaMayPilotTelemetry"] = JSON.stringify(snapshot)
          → Analyst copies localStorage value to reports/telemetry/ archive file
            → Analyzed via per-session or weekly-aggregate templates
```

### 2.2 Buffer Details

| Property | Value |
|----------|-------|
| Buffer location | `MayTelemetry._buffer` (in-memory, JavaScript closure) |
| Max capacity | 500 events (oldest evicted on overflow) |
| Serialization | `MayTelemetry.snapshot()` → byType counts + modeCounts + timestamp |
| Persistence | `localStorage.setItem('cmaMayPilotTelemetry', JSON.stringify(snapshot))` from `may-coaching-orchestrator.js:323` |
| Reset | `MayTelemetry.reset()` clears buffer and counters (for fresh measurement windows) |

### 2.3 Seven Event Types

| # | Type | Tracking Function | Persisted in localStorage | Instrumented |
|---|------|-------------------|--------------------------|--------------|
| 1 | `decision` | `MayTelemetry.trackDecision(data)` | byType.decision | Orchestrator |
| 2 | `mode` | `MayTelemetry.trackMode(name, ms)` | byType.mode + modeCounts | Coaching modes |
| 3 | `readiness` | `MayTelemetry.trackReadiness(data)` | byType.readiness | Readiness engine |
| 4 | `recommendation` | `MayTelemetry.trackRecommendation(data)` | byType.recommendation | Recommendation pipeline |
| 5 | `intervention` | `MayTelemetry.trackIntervention(data)` | byType.intervention | Intervention engine |
| 6 | `adoption` | `MayTelemetry.trackAdoption(data)` | byType.adoption | 12 call sites (MAY-025/026) |
| 7 | `engagement` | `MayTelemetry.trackEngagement(data)` | byType.engagement | 5 call sites (MAY-025/026) |

---

## 3. How to Export Telemetry

### 3.1 Console Export (Primary Method)

After completing a session in the CMA Part 1 Exam Simulator, open the browser console (F12) and run:

```javascript
// Copy full telemetry snapshot to clipboard
copy(JSON.stringify(JSON.parse(localStorage.getItem('cmaMayPilotTelemetry') || '{}'), null, 2));
```

Then paste into a new file: `reports/telemetry/session_YYYYMMDD_HHMMSS.json`

### 3.2 Verifying Telemetry Exists

Before exporting, confirm telemetry is present:

```javascript
var t = JSON.parse(localStorage.getItem('cmaMayPilotTelemetry') || '{}');
console.log('Total events:', t.totalEvents);
console.log('Event types:', Object.keys(t.byType || {}).join(', '));
console.log('Modes:', JSON.stringify(t.modeCounts));
```

If `totalEvents` is 0 or `t` is `{}`, no May pipeline has executed in this browser session. Complete a full exam session first.

### 3.3 Batch Export (Multiple Sessions)

For a tester running multiple sessions across browser restarts, export after EACH session. Telemetry is overwritten per-session (each `sessionStorage` / `localStorage` write replaces the previous snapshot). There is no append — the orchestrator writes a snapshot of the in-memory buffer state.

**Recommended workflow for testers:**

1. Complete a session in the app
2. Immediately export telemetry to clipboard (console command above)
3. Save as `reports/telemetry/session_YYYYMMDD_HHMMSS_learner[N].json`
4. Open `reports/telemetry/telemetry_registry.md` and add the session metadata
5. Repeat for next session

### 3.4 Export Helper Bookmarklet

Create a browser bookmark with this URL to one-click export:

```javascript
javascript:void((function(){var t=localStorage.getItem('cmaMayPilotTelemetry');if(!t){alert('No May telemetry found');return;}var b=document.createElement('textarea');b.value=t;document.body.appendChild(b);b.select();document.execCommand('copy');document.body.removeChild(b);alert('Telemetry copied ('+JSON.parse(t).totalEvents+' events)');})());
```

---

## 4. Required Data Shape Per Event Type

### 4.1 Adoption Event Shape

```json
{
  "type": "adoption",
  "timestamp": "2026-07-31T14:30:00.000Z",
  "data": {
    "recommendationType": "Top Weakness",
    "cardId": "top-weakness",
    "topic": "Cost Variances",
    "presented": true,
    "panelOpened": false,
    "clicked": false,
    "sessionStarted": false,
    "completed": false,
    "timestamp": "2026-07-31T14:30:00.000Z"
  }
}
```

**Valid recommendationType values:** `Top Weakness`, `Suggested Review`, `Next Session`, `Readiness`, `Launcher`, `Panel Link`, `Session`

**Valid cardId values:** `top-weakness`, `suggested-review`, `next-session`, `readiness`, `may-launcher`, `rec-panel-link`, `session-complete`, `session-start`

### 4.2 Engagement Event Shape

```json
{
  "type": "engagement",
  "timestamp": "2026-07-31T14:30:00.000Z",
  "data": {
    "action": "tooltipViewed",
    "timestamp": "2026-07-31T14:30:00.000Z"
  }
}
```

**Valid action values:** `tooltipViewed`, `tooltipClicked`, `dismissed`

### 4.3 Decision Event Shape

```json
{
  "type": "decision",
  "timestamp": "2026-07-31T14:30:00.000Z",
  "data": {
    "decisionId": "orchestrate",
    "mode": "prudent",
    "topic": "Cost Variances",
    "accuracy": 0.72,
    "timestamp": "2026-07-31T14:30:00.000Z"
  }
}
```

### 4.4 Snapshot Shape (stored in localStorage)

```json
{
  "totalEvents": 42,
  "byType": {
    "decision": 5,
    "mode": 3,
    "readiness": 1,
    "recommendation": 4,
    "intervention": 2,
    "adoption": 18,
    "engagement": 9
  },
  "modeCounts": {
    "prudent": 2,
    "focused": 1
  },
  "timestamp": "2026-07-31T14:30:00.000Z"
}
```

**Note:** The snapshot only contains event COUNTS per type, not the full event data. The full event buffer is accessible via `MayTelemetry.drain()` (in-memory only, not persisted to localStorage by default). For adoption/engagement analysis that needs per-event details (e.g., which recommendationType was clicked), you must either:

1. Call `MayTelemetry.drain()` and persist the full buffer manually before the next snapshot, OR
2. Add a `localStorage.setItem('cmaMayPilotTelemetryFull', JSON.stringify(MayTelemetry.drain()))` line to the export process.

This is a **known gap** — the current snapshot format reports counts but not event-level detail needed for adoption funnel analysis (UA1-UA6). The analyzer must use per-event drain data, not snapshot count summaries.

---

## 5. Adoption Call Sites (12 locations)

### 5.1 app.js — 7 call sites

| # | Line | Event | Trigger |
|---|------|-------|---------|
| 1 | 1608 | `completed: true` | Session submitted (finish) |
| 2 | 2152 | `presented: true` (Top Weakness card) | Recommendation panel renders |
| 3 | 2153 | `presented: true` (Suggested Review card) | Recommendation panel renders |
| 4 | 2154 | `presented: true` (Next Session card) | Recommendation panel renders |
| 5 | 2155 | `presented: true` (Readiness card) | Recommendation panel renders |
| 6 | 2162 | `panelOpened: true, clicked: true` | User clicks "Open May" link in panel |
| 7 | 3986 | `sessionStarted: true` | User starts new practice session |

### 5.2 may-core.js — 5 adoption/engagement call sites

| # | Line | Event | Trigger |
|---|------|-------|---------|
| 8 | 6505 | `engagement: dismissed` | User dismisses companion card |
| 9 | 6535 | `engagement: tooltipViewed` | Tooltip content renders |
| 10 | 6561 | `engagement: tooltipViewed` | Launcher tooltip displays |
| 11 | 6578 | `adoption: panelOpened, clicked` (Launcher) | User clicks May launcher |
| 12 | 6579 | `engagement: tooltipClicked` | Launcher tooltip clicked |

---

## 6. Minimum Sample Sizes

| Dimension | Metric | Minimum Requirement |
|-----------|--------|---------------------|
| All dimensions | Sessions analyzed | **25 sessions** |
| All dimensions | Calendar days | **14 days** |
| Adoption (UA1-UA6) | Panel-opened sessions | **10 sessions** |
| Engagement (EG1-EG4) | Sessions with coaching interactions | Any session with EG data |
| Readiness (RA1-RA4) | Sessions with readiness events | 10+ sessions for trend analysis |
| Recommendation (RQ1-RQ4) | Sessions with recommendation events | 10+ sessions |
| All dimensions | Distinct learners | **3 learners minimum** |

**Stalled threshold:** If minimums are not met after 21 calendar days from production activation (MAY-024, 2026-07-31), the measurement window is declared **stalled** and a Phase 2 extension is required.

---

## 7. Session Telemetry Registry

Each exported session should be registered in `reports/telemetry/telemetry_registry.md` with:

```markdown
| Session ID | Learner ID | Date | File | Total Events | Adoption Events | Engagement Events | Notes |
|-----------|------------|------|------|-------------|-----------------|-------------------|-------|
| S001 | L01 | 2026-08-01 | session_20260801_140000_L01.json | 42 | 18 | 9 | First session post-activation |
```

---

## 8. Pre-Collection Checklist

Before the first data collection window:

- [ ] Confirm `ENABLE_PRODUCTION_MAY_INTEGRATION: true` in `may-feature-flags.js`
- [ ] Confirm `MayTelemetry` is accessible via `window.MayTelemetry` in browser console
- [ ] Confirm `cmaMayPilotTelemetry` appears in localStorage after a completed session
- [ ] Confirm at least 7 event types appear in `byType` after a full session
- [ ] Create `reports/telemetry/telemetry_registry.md` (this file)
- [ ] Train testers on the console export command
- [ ] Set up a shared location (or local archive path) for session JSON files

---

## 9. Known Gaps & Limitations

| # | Gap | Impact | Mitigation |
|---|-----|--------|------------|
| G1 | localStorage snapshot is counts-only, not event-level data | Cannot compute adoption funnel (UA1-UA6) or engagement detail (EG1-EG4) from snapshot alone | Call `MayTelemetry.drain()` before snapshot and persist separately, or modify orchestrator to drain+persist full buffer |
| G2 | localStorage overwritten per-session (no append) | Each session's telemetry replaces the previous; requires manual export after every session | Export after each session; do not let sessions accumulate without exporting |
| G3 | No telemetry in the `reports/telemetry/` directory | No archived data to analyze | First tester session must populate the directory |
| G4 | `byType` snapshot counts total events but not per-recommendation-type breakdown | Cannot compute UA5 (type effectiveness) from snapshot alone | Use full buffer drain for detailed analysis |
| G5 | Session identity not tracked in telemetry events | Cannot distinguish Learner A from Learner B in cross-session analysis | Tester must tag exported files with learner ID |

---

*MAY-025 — Data Collection Guide — v1.0 — 2026-07-31*
