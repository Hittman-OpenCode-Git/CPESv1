# MAY-019 Telemetry Plan

**Session:** MAY-019 — Pilot Calibration & Rollout Readiness
**Date:** 2026-07-31
**Governance Lane:** Light (UI/coaching layer — no pack/case/content impact)
**Phase:** Planner — Telemetry

---

## 1. Objective

Complete telemetry wiring across the adaptive coaching pipeline. The MAY-017 pilot activated telemetry for 3 of 5 event types (decision, readiness, recommendation). Two event types (intervention, mode) are defined but unwired. Additionally, telemetry is in-memory only with no persistence.

Target: 100% telemetry coverage for all 5 event types, plus localStorage persistence.

---

## 2. Current Telemetry State

### 2.1 Coverage Matrix

| Event Type | Function Defined | Wired to Orchestrator | Wired to Router | Persisted | Status |
|------------|-----------------|----------------------|-----------------|-----------|--------|
| `trackDecision` | Yes | Yes | N/A | No | Active |
| `trackReadiness` | Yes | Yes | N/A | No | Active |
| `trackRecommendation` | Yes | Yes | N/A | No | Active |
| `trackIntervention` | Yes | **No** | N/A | No | **Gap** |
| `trackMode` | Yes | **No** | **No** | No | **Gap** |
| `startTimer` | Yes | No | No | No | Unused |
| `endTimer` | Yes | No | No | No | Unused |
| Persistence | No | No | No | No | **Gap** |

### 2.2 Current Telemetry Calls

In `MayCoachingOrchestrator.orchestrate()` (lines 278-305):
```javascript
if (decision) {
  MayTelemetry.trackDecision({ decisionId, action, coachingMode, priority, topic });
}
if (readiness) {
  MayTelemetry.trackReadiness({ overallBand, overallScore, topicsWithData });
}
if (recommendations && recommendations.length > 0) {
  MayTelemetry.trackRecommendation({ count, topType, topTopic, topPriority });
}
```

All three are wrapped in `try/catch` — non-blocking.

---

## 3. Telemetry Wiring Plan

### 3.1 trackIntervention Wiring (CAL-05)

**Location:** `may-coaching-orchestrator.js`, inside the existing telemetry try/catch block (after Stage 5)

**Data captured:**
- `tier` — Intervention tier (1-5)
- `tierLabel` — Human-readable tier label
- `topic` — Topic being intervened on
- `priorityScore` — Priority score from prioritizer
- `topN` — Number of interventions logged (max 3)

**Code pattern:**
```javascript
if (interventions && interventions.queue && interventions.queue.length > 0) {
  interventions.queue.slice(0, 3).forEach(function(iv) {
    MayTelemetry.trackIntervention({
      tier: iv.tier,
      tierLabel: iv.tierLabel,
      topic: iv.topic,
      priorityScore: iv.priorityScore
    });
  });
}
```

### 3.2 trackMode Wiring — Orchestrator Path (CAL-06)

**Location:** `may-coaching-orchestrator.js`, inside the existing telemetry try/catch block

**Data captured:**
- `modeName` — coachingMode from decision
- `decisionId` — which decision triggered the mode
- `source` — "orchestrator"

**Code pattern:**
```javascript
if (decision && decision.coachingMode) {
  MayTelemetry.trackMode(decision.coachingMode, 0);
}
```

### 3.3 trackMode Wiring — Router Path (CAL-06)

**Location:** `may-coaching-router.js`, `dispatchToHandler()` function

**Data captured:**
- `modeName` — mode from routing object
- `action` — learner action that triggered routing
- `source` — "router"

**Code pattern:**
```javascript
if (routing && routing.mode) {
  try {
    if (typeof MayTelemetry !== 'undefined') {
      MayTelemetry.trackMode(routing.mode, 0);
    }
  } catch (e) {}
}
```

### 3.4 Telemetry Persistence (CAL-07)

**Location:** `may-pilot-activation.js` — add periodic sync

**Strategy:** Write snapshot on orchestrator completion. Overwrite key (not append) to bound localStorage usage.

**Storage key:** `cmaMayPilotTelemetry`

**Code pattern:**
```javascript
// In orchestrator, after telemetry collection:
try {
  var snap = MayTelemetry.snapshot();
  localStorage.setItem('cmaMayPilotTelemetry', JSON.stringify(snap));
} catch (e) {}
```

**Alternative approach:** Wire into `may-pilot-activation.js` as a page-unload listener:
```javascript
window.addEventListener('beforeunload', function() {
  try {
    if (typeof MayTelemetry !== 'undefined') {
      var snap = MayTelemetry.snapshot();
      localStorage.setItem('cmaMayPilotTelemetry', JSON.stringify(snap));
    }
  } catch (e) {}
});
```

**Recommendation:** Use the orchestrator path (option A) — it captures telemetry at the natural completion point rather than deferring to unload which may not fire reliably. The orchestrator already has a try/catch-wrapped telemetry block.

---

## 4. Telemetry Completeness Target

| Metric | Current | Target |
|--------|---------|--------|
| Event types defined | 5 | 5 |
| Event types wired | 3 (60%) | 5 (100%) |
| Persistence | None | localStorage snapshot |
| Buffer safety | 500 events | 500 events (unchanged) |
| Diagnostics exposure | `window.__mayPilot` | Unchanged |

---

## 5. Post-Wiring Verification

- [ ] `trackIntervention` callable from orchestrator path
- [ ] `trackMode` callable from orchestrator path
- [ ] `trackMode` callable from router path
- [ ] Telemetry snapshot written to `cmaMayPilotTelemetry`
- [ ] Snapshot contains all 5 event types
- [ ] No uncaught exceptions (all try/catch)
- [ ] Smoke still 17/17

---

## 6. Telemetry Consumer Analysis

| Consumer | Purpose | Status |
|----------|---------|--------|
| `window.__mayPilot.telemetry()` | Diagnostics snapshot | Active |
| `may-pilot-activation.js` diagnostics | Health report | Active |
| `cmaMayPilotTelemetry` (localStorage) | Post-hoc analysis | **New in MAY-019** |
| Console debug logging | Development observability | Active (May.config.debug = true) |
