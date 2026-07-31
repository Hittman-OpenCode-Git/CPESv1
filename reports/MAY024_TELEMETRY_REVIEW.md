# MAY-024 — Telemetry Review (Verifier Phase)

**Session:** MAY-024 — Production Activation & Controlled Monitoring
**Date:** 2026-07-31
**Governance Lane:** Light
**Reference:** MAY-020 Monitoring Framework, MAY-021 Simulation Results, MAY-023 Telemetry Audit
**Status:** Active

---

## 1. Pre-Activation Telemetry Baseline

### 1.1 MAY-023 Audit Results (Cross-Referenced)

| Audit Area | Result | Source |
|------------|--------|--------|
| Event types wired | 5/5 | MAY023_TELEMETRY_REVIEW.md §2 |
| Decisions reachable | 10/10 | MAY023_TELEMETRY_REVIEW.md §3 |
| Metrics collectable | 15/15 | MAY023_TELEMETRY_REVIEW.md §4 |
| CAL-05 (trackIntervention) | Wired | MAY-019 |
| CAL-06 (trackMode) | Wired | MAY-019 |
| CAL-07 (telemetry persistence) | Active | MAY-019 |

### 1.2 MAY-021 Simulation Validation

| Simulation | Result | Source |
|------------|--------|--------|
| Recommendation panel render | Normal operation | MAY021_CLOSEOUT.md |
| Launcher lifecycle | All states tested | MAY021_MONITORING_SIMULATION_PLAN.md |
| Rollback simulation | Single-flag, zero data loss | MAY021_CLOSEOUT.md |
| Incident response | 3 scenarios, all handled | MAY021_INCIDENT_SIMULATION_RESULTS.md |
| Metrics validation | All metrics capture verified | MAY021_METRICS_VALIDATION.md |

---

## 2. Post-Activation Telemetry State

### 2.1 Flag State

```
ENABLE_PRODUCTION_MAY_INTEGRATION: true  ← Activated (2026-07-31 13:12 UTC)
ENABLE_LLM: false                         ← Remains disabled
ENABLE_OPENAI_PROVIDER: false             ← Remains disabled
ENABLE_AZURE_OPENAI_PROVIDER: false       ← Remains disabled
ENABLE_COACHING_MEMORY: false             ← Remains disabled
```

### 2.2 Integration Point Telemetry

| Integration Point | Telemetry Event | Data Collected |
|-------------------|-----------------|----------------|
| I1 (Post-session launcher) | `may:launcher:shown`, `may:launcher:clicked` | `{ integrationPoint: "postSession", sessionState, messageTier }` |
| I2 (Landing launcher) | `may:launcher:shown`, `may:launcher:clicked` | `{ integrationPoint: "landing", sessionState, messageTier }` |
| I3 (Recommendation panel) | `may:recommendation:rendered`, `may:recommendation:clicked` | `{ sessionId, weaknessTopic, readinessBand, hasDecliningTopic, cardIndex, cardType }` |
| I4 (Session-start launcher) | `may:launcher:shown`, `may:launcher:clicked` | `{ integrationPoint: "sessionStart", sessionState, messageTier }` |

### 2.3 Production Activation Event

A `may:production:activated` event fires on the first session after flag activation, carrying:
```json
{
  "timestamp": "2026-07-31T13:12:00Z",
  "flags": {
    "ENABLE_PRODUCTION_MAY_INTEGRATION": true,
    "ENABLE_LLM": false,
    "ENABLE_ADAPTIVE_COACHING": false,
    "ENABLE_READINESS_SCORING": false,
    "ENABLE_ADAPTIVE_ORCHESTRATION": false
  }
}
```

---

## 3. Monitoring Readiness

### 3.1 Immediate Metrics Available

| Metric | Source | Access Method |
|--------|--------|---------------|
| Panel render count | I3 telemetry | `window.__mayPilot.telemetry()` |
| Launcher impression count | I1/I2/I4 telemetry | `window.__mayPilot.telemetry()` |
| Readiness score distribution | MayLearnerState | `MayLearnerState.getReadinessSummary()` |
| Weakness cluster data | MayLearnerState | `MayLearnerState.getWeaknessClusters()` |
| Console errors | Browser DevTools | Manual inspection |

### 3.2 Dashboard Metrics (MAY-020 Framework)

| Dashboard Panel | Data Source | Status |
|-----------------|-------------|--------|
| Session volume | MayLearnerState session count | Active |
| Recommendation engagement | Panel click telemetry | Active |
| Readiness distribution | ReadinessEngine band scores | Active |
| Error rate | Console + try/catch telemetry | Active |
| Launcher engagement | Launcher click-through telemetry | Active |

---

## 4. Health Signals Observed (Post-Activation T0)

| Signal | Value | Status |
|--------|-------|--------|
| Preflight divergences | 0 | GREEN |
| Governance guard | 54/54 PASS | GREEN |
| Smoke test | 17/17 PASS | GREEN |
| May coaching panel | Active (smoke confirmed) | GREEN |
| All May modules loaded | 8/8 present | GREEN |
| Zero console errors (smoke) | PASS | GREEN |

---

## 5. Telemetry Collection Protocol

### 5.1 Real-User Data Collection

When real users interact with the activated May production layer:

1. **Session start:** I4 launcher tooltip appears → `may:launcher:shown` fires
2. **Session complete:** I3 panel renders → `may:recommendation:rendered` fires
3. **Post-session:** I1 launcher tooltip appears → `may:launcher:shown` fires
4. **Landing page:** I2 contextual launcher → `may:launcher:shown` fires

### 5.2 Telemetry Review Cadence

| Interval | Review | Owner |
|----------|--------|-------|
| Hour 1 | Immediate health check | MAY-024 |
| Day 1 | First 24-hour metrics review | Operator |
| Week 1 | Weekly review (MAY-020 template) | MAY-025 |
| Month 1 | Monthly trends + recommendation quality | MAY-028 |

---

## 6. Success Criteria — Telemetry

| # | Criterion | Status |
|---|-----------|--------|
| ✅ | 5/5 event types wired | Confirmed (MAY-023) |
| ✅ | 10/10 decisions reachable | Confirmed (MAY-023) |
| ✅ | 15/15 metrics collectable | Confirmed (MAY-023) |
| ✅ | Telemetry persistence active | CAL-07 confirmed (MAY-019) |
| ✅ | Dashboard metrics available | Dashboard panel active (smoke) |
| ✅ | Production activation event wired | Flag change logged to changeLog |
| ✅ | Zero errors at activation T0 | Preflight + smoke clean |

---

*MAY-024 — Telemetry Review — 2026-07-31*
