# MAY-020 Rollout Dashboard Specification

**Session:** MAY-020 — Limited Rollout Operations Framework
**Date:** 2026-07-31
**Governance Lane:** Light (documentation only — no code, no content impact)
**Phase:** Implementer — Rollout Dashboard
**Status:** Specification (implementation deferred to MAY-020A or later)

---

## 1. Purpose

Define the operational monitoring dashboard that tracks May's adaptive coaching pipeline during the Phase 2 limited real-user rollout (5-10 internal testers).

This is a spec for what to build. The dashboard itself is a standalone HTML page that reads `cmaMayPilotTelemetry` from localStorage and renders visualizations. It does NOT modify any pack file, case file, or answer key.

---

## 2. Dashboard Architecture

### 2.1 Deployment Model

| Property | Value |
|----------|-------|
| Format | Single HTML file + inline JS + inline CSS |
| Deployment | `scripts/may_rollout_dashboard.html` |
| Data source | `localStorage.getItem('cmaMayPilotTelemetry')` — manually copied by testers |
| Dependencies | None (zero external libraries; vanilla JS + Canvas/SVG) |
| Refresh | Manual — paste telemetry JSON into textarea |
| Security | No server, no network, no exposed data — local file only |
| Governance risk | Zero — reads a copy of telemetry, never touches pack/case/state |

### 2.2 Why Not a Live Dashboard

The rollout cohort is 5-10 internal testers running local files. There is no server, no database, no API. A live dashboard would require infrastructure changes. The manual-paste model is:

- **Sufficient** for a 1-2 week pilot with a small cohort
- **Safe** — no telemetry leaves the tester's machine
- **Simple** — zero deployment risk, zero governance risk
- **Replaceable** — future sessions can upgrade to a server-based model

### 2.3 Data Input Format

The dashboard accepts the JSON output of `MayTelemetry.snapshot()`:

```json
{
  "totalEvents": 127,
  "byType": {
    "decision": [
      { "decisionId": "D1", "action": "QUIZ", "coachingMode": "QUIZ", "priority": "high", "topic": "variance-analysis", "timestamp": 1712420400000 }
    ],
    "readiness": [
      { "overallBand": "Developing", "overallScore": 62, "topicsWithData": 8, "timestamp": 1712420401000 }
    ],
    "recommendation": [
      { "count": 3, "topType": "quiz", "topTopic": "variance-analysis", "topPriority": "high", "timestamp": 1712420402000 }
    ],
    "intervention": [
      { "tier": 3, "tierLabel": "Targeted Review", "topic": "variance-analysis", "priorityScore": 0.72, "timestamp": 1712420403000 }
    ],
    "mode": [
      { "modeName": "QUIZ", "source": "orchestrator", "timestamp": 1712420404000 }
    ]
  },
  "snapshotTime": 1712420405000
}
```

---

## 3. Dashboard Panels

### 3.1 Panel 1 — Pipeline Health

| Metric | Visualization | Source |
|--------|--------------|--------|
| Total events captured | Large number | `totalEvents` |
| Snapshot timestamp | Date/time label | `snapshotTime` |
| Event types present | 5/5 checklist with checkmarks | `byType` keys |
| Telemetry gap check | Red/yellow/green indicator | Missing event types |

**Health indicator rules:**
- **Green:** All 5 event types present and non-empty
- **Yellow:** 3-4 event types present, or any type empty
- **Red:** < 3 event types present (telemetry wiring broken)

### 3.2 Panel 2 — Decision Distribution

| Visualization | Data Source |
|--------------|-------------|
| Horizontal bar chart — D1 through D10 | `byType.decision` grouped by `decisionId` |
| Each bar labeled with: decisionId, action, count, percentage | |
| Color coding: QUIZ=blue, EXPLAIN=green, SOCRATIC=orange, STUDY_PLAN=purple | |

**Expected distribution reference (from MAY-014 synthetic profiles):**
- D1 (QUIZ, new topic): 30-40%
- D5 (QUIZ, borderline): 15-25%
- D6 (QUIZ, developing): 10-20%
- D8 (EXPLAIN, fragile): 5-15%
- D9 (QUIZ, proficient): 5-10%
- D7 (EXPLAIN, fragile/difficult): 5-10%
- D2 (QUIZ, practice set): 2-5%
- D4 (STUDY_PLAN, ready/focused): 2-5%
- D3 (SOCRATIC, exam review): 2-5%
- D10 (EXPLAIN, no data): 2-5%

**Alert threshold:** >70% of decisions are QUIZ mode → possible calibration issue (all learners routed to QUIZ).

### 3.3 Panel 3 — Mode Distribution

| Visualization | Data Source |
|--------------|-------------|
| Pie chart or stacked bar — mode frequency | `byType.mode` grouped by `modeName` |
| Labels: QUIZ, EXPLAIN, SOCRATIC, STUDY_PLAN | |

**Expected distribution:**
- QUIZ: 50-70%
- EXPLAIN: 15-25%
- STUDY_PLAN: 5-15%
- SOCRATIC: 2-10%

**Alert threshold:** SOCRATIC + STUDY_PLAN < 5% combined → narrow routing. EXPLAIN = 0% → D7/D8/D10 still dead (CAL-01/02 regression).

### 3.4 Panel 4 — Readiness Band Distribution

| Visualization | Data Source |
|--------------|-------------|
| Horizontal bar chart — readiness bands | `byType.readiness` grouped by `overallBand` |
| Bands: Ready, Proficient, Developing, Fragile, No Data | |
| Also show: mean `overallScore`, max/min | |

**Expected values:**
- Developing: 40-60%
- Fragile: 15-30%
- Proficient: 10-20%
- Ready: 5-10%
- No Data: 2-5%

**Alert threshold:** Ready = 0% over extended sessions → band unreachable (CAL-03 regression). No Data > 20% → learner state not building.

### 3.5 Panel 5 — Intervention Distribution

| Visualization | Data Source |
|--------------|-------------|
| Vertical bar chart — intervention tiers | `byType.intervention` grouped by `tier` |
| Tiers: 1 (Critical), 2 (Urgent), 3 (Targeted), 4 (Reinforce), 5 (Maintain) | |

**Expected distribution:**
- Tier 3 (Targeted Review): 30-40%
- Tier 4 (Reinforce): 25-35%
- Tier 5 (Maintain): 15-25%
- Tier 2 (Urgent): 5-10%
- Tier 1 (Critical): 0-5%

**Alert threshold:** Tier 1 > 10% → learners are in distress. Tier 3-5 < 50% combined → interventions not firing.

### 3.6 Panel 6 — Recommendation Summary

| Visualization | Data Source |
|--------------|-------------|
| Summary table — recommendation types, topics, priorities | `byType.recommendation` |
| Columns: Type, Topic, Priority, Count | Group by `topType`, `topTopic` |

**Alert threshold:** Zero recommendations captured → orchestrator not producing recommendations. All recommendations same topic → profile not diversifying.

### 3.7 Panel 7 — Session Timeline

| Visualization | Data Source |
|--------------|-------------|
| Scatter plot or timeline — events over time | All events sorted by `timestamp` |
| Color-coded by event type | Decision=blue, Readiness=green, Recommendation=orange, Intervention=red, Mode=purple |

**Usefulness:** Shows whether the adaptive pipeline fires continuously or only at session start. Gaps > 30 minutes may indicate orchestrator not being called on every interaction.

### 3.8 Panel 8 — Cohort Summary

| Metric | Calculation |
|--------|------------|
| Unique sessions | Count of distinct `snapshotTime` / `totalEvents` clusters |
| Total decisions across all sessions | Sum of `byType.decision.length` across all snapshots |
| Total interventions across all sessions | Sum of `byType.intervention.length` |
| Average events per session | `totalEvents` / number of snapshots |
| Decision diversity score | Number of distinct D1-D10 decision IDs reached / 10 |

---

## 4. Alert Rules (Color-Coded)

### 4.1 Red (Investigate Immediately)

| Rule | Condition |
|------|-----------|
| Preflight divergence > 0 | External — dashboard does not detect; listed for operator awareness |
| Telemetry entirely empty | `totalEvents === 0` |
| Single event type only | Only 1 of 5 event types present |
| EXPLAIN mode = 0 | Zero EXPLAIN mode events across all snapshots |
| Total events < 10 for a session | Orchestrator barely firing |

### 4.2 Yellow (Monitor Closely)

| Rule | Condition |
|------|-----------|
| QUIZ mode > 80% of decisions | Over-reliance on QUIZ routing |
| Ready band = 0 across all snapshots | Band unreachable |
| Intervention Tier 1 > 10% | Critical interventions too frequent |
| SOCRATIC + STUDY_PLAN < 3% | Narrow routing — 2 of 4 modes barely used |
| Event type missing | Any of 5 event types absent |
| Gap between snapshots > 2 hours | May indicate orchestrator stopped firing |

### 4.3 Green (Nominal)

All panels within expected distributions. No alert conditions triggered.

---

## 5. Dashboard Layout (Wireframe)

```
┌──────────────────────────────────────────────────────────────┐
│  MAY ROLLOUT DASHBOARD                    [Last updated: ...] │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────────────┐  │
│  │ Panel 1 │ │ Panel 3 │ │ Panel 5 │ │ Panel 2           │  │
│  │ Pipeline│ │ Mode    │ │Interven.│ │ Decision          │  │
│  │ Health  │ │ Dist.   │ │Dist.    │ │ Distribution      │  │
│  │ (small) │ │ (pie)   │ │(bars)   │ │ (horizontal bars) │  │
│  └─────────┘ └─────────┘ └─────────┘ └───────────────────┘  │
│  ┌──────────────────────────────┐ ┌────────────────────────┐ │
│  │ Panel 4 — Readiness Bands    │ │ Panel 6 — Recommends   │ │
│  │ (horizontal bars)            │ │ (summary table)        │ │
│  └──────────────────────────────┘ └────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Panel 7 — Session Timeline (scatter plot, full width)    │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Panel 8 — Cohort Summary (stats table, full width)       │ │
│  └──────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  [ Paste telemetry JSON here: ┌──────────────────────────┐ ] │
│                               │                          │ ] │
│                               └──────────────────────────┘ ] │
│  [ Load ]  [ Clear ]  [ Export CSV ]                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Implementation Guidance (for MAY-020A or Later)

### 6.1 What to Build

A standalone `scripts/may_rollout_dashboard.html` that:
1. Accepts pasted `cmaMayPilotTelemetry` JSON in a textarea
2. Parses and validates the JSON
3. Renders all 8 panels using vanilla JS + HTML5 Canvas or SVG
4. Color-codes alerts per Section 4
5. Runs entirely in-browser with zero dependencies

### 6.2 What NOT to Build

- No server, API, or database
- No live telemetry feed (no WebSocket, no polling)
- No authentication or access control (local file, local data)
- No automated alerts (this is a human-operated dashboard)
- No modification of any pack/case/state file
- No reading of question state or answer keys

### 6.3 Validation

Before accepting the dashboard as operational:
- [ ] Loads and renders all 8 panels from valid telemetry JSON
- [ ] Handles missing event types gracefully (empty panels, not crashes)
- [ ] Handles malformed JSON with error message (not silent failure)
- [ ] Alert color-coding matches Section 4 rules
- [ ] Zero browser console errors on load
- [ ] Smoke test (17/17) still passes (dashboard is standalone HTML — no app impact)

---

## 7. Success Criteria

| Criterion | How Verified |
|-----------|-------------|
| Dashboard loads and renders from valid telemetry | Manual test with sample data |
| All 8 panels present and functional | Visual inspection |
| Alert rules trigger correctly | Test with edge-case data (empty, single-type, nomimal) |
| Zero governance risk | No pack/case/state access — confirmed by code review |
| Zero deployment risk | Standalone HTML — no app.js, index_updated.html changes |

---

## 8. Non-Actions (Correctly Excluded)

- No modification to `app.js`, `index_updated.html`, `styles.css`
- No modification to any pack or case file
- No answer-key access
- No question_state reads or writes
- No REVISION_HISTORY.md entry (Light Lane — documentation only)
- No CURRENT_BASELINES.md update (new file, not runtime-critical)
- No npm package additions

---

*MAY-020 — Rollout Dashboard Specification — 2026-07-31*
