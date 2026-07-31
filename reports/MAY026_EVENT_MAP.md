# MAY-026 — Event Map (Auditor Phase)

**Session:** MAY-026
**Date:** 2026-07-31

---

## 1. Auditor Findings

### 1.1 Event Auditor — No Duplicate Risk

| Risk | Assessment |
|------|------------|
| Duplicate `panelOpened` | **Safe.** `openMayFromLauncher()` is the single entry point. The panel link onclick also calls `May.renderView()` but does not duplicate launcher telemetry. Each has its own trackAdoption call with distinct cardId. |
| Event-loop risk | **Safe.** All telemetry calls are synchronous `_buffer.push()`. No async or Promise chains. |
| Double counting | **Safe.** `presented` fires once per `renderSummary()` call (which clears and re-renders). `panelOpened`/`clicked` fire once per user action. `sessionStarted` fires once per form submit. `completed` fires once per `finish()`. |

### 1.2 Workflow Auditor — Coverage Confirmed

| Workflow | Event | Covered? |
|----------|-------|----------|
| Landing Page | Companion card dismissed | `dismissed` engagement |
| Landing Page | Launcher tooltip shown | `tooltipViewed` engagement |
| Session Start | Session begins | `sessionStarted` adoption |
| Session Complete | Summary view + panel | `completed` adoption + `presented` ×4 |
| Recommendation Panel | Panel link clicked | `panelOpened` + `clicked` adoption |
| Review Flow | May coaching opened | `panelOpened` + `tooltipClicked` |

### 1.3 Data Auditor — Schema Compliance

All `trackAdoption()` payloads conform to the schema defined in `MAY025_EFFECTIVENESS_MEASUREMENT_PLAN.md` §2.3:
```json
{
  "recommendationType": "string",
  "cardId": "string",
  "topic": "string",
  "presented": "boolean",
  "panelOpened": "boolean",
  "clicked": "boolean",
  "sessionStarted": "boolean",
  "completed": "boolean",
  "timestamp": "ISO 8601 string"
}
```

All `trackEngagement()` payloads include `{ action: string, timestamp: string }`.

### 1.4 No Existing MayTelemetry Wiring in may-core.js

**Confirmed:** `may-core.js` has zero references to `MayTelemetry`. The only existing telemetry wiring is in `may-coaching-orchestrator.js` (orchestration events: decision, mode, readiness, recommendation, intervention). This is net-new wiring with no risk of conflict.

---

## 2. Injection Points (Verified)

### 2.1 app.js

| # | Line | Function | Injection |
|---|------|----------|-----------|
| I1 | ~2152 | `_renderMayRecommendationPanel()` | Per-card `presented` telemetry before return |
| I2 | ~2152 | `_renderMayRecommendationPanel()` onclick | `panelOpened` + `clicked` in inline onclick |
| I3 | ~3965 | `$('sessionForm').onsubmit` | `sessionStarted` before `start(e)` |
| I4 | ~1596 | `ExamSessionManager.finish()` | `completed` after session marked complete |

### 2.2 may-core.js

| # | Line | Function | Injection |
|---|------|----------|-----------|
| I5 | ~6556 | `openMayFromLauncher()` | `panelOpened` + `clicked` + `tooltipClicked` |
| I6 | ~6500 | `dismissMayCompanionCard()` | `dismissed` engagement |
| I7 | ~6532 | `_updateMayLauncherState()` | `tooltipViewed` when tooltip content changes |
| I8 | ~6518 | `_injectMayLauncher()` | `tooltipViewed` on initial inject |

---

## 3. Buffer Impact Estimate

| Event Type | Per Session | 10-Session Total |
|------------|------------|-----------------|
| adoption (presented ×4) | 4 | 40 |
| adoption (panelOpened ×2) | 0–2 | 0–20 |
| adoption (clicked) | 0–1 | 0–10 |
| adoption (sessionStarted) | 1 | 10 |
| adoption (completed) | 1 | 10 |
| engagement (tooltipViewed) | 1–3 | 10–30 |
| engagement (tooltipClicked) | 0–1 | 0–10 |
| engagement (dismissed) | 0–1 | 0–10 |
| **Total new events** | **7–13** | **70–140** |

Buffer cap: 500 events. Existing orchestration events: ~6–10 per session. **Well within safe margins.**

---

*MAY-026 — Event Map — 2026-07-31*
