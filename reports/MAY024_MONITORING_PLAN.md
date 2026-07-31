# MAY-024 — Production Monitoring Plan (Planner Phase)

**Session:** MAY-024 — Production Activation & Controlled Monitoring
**Date:** 2026-07-31
**Governance Lane:** Light
**Reference:** MAY-020 Monitoring Framework, MAY-021 Monitoring Simulations
**Status:** Active

---

## 1. Monitoring Objectives

Track the health and user engagement of the May production integration layer — the 4 integration points activated by `ENABLE_PRODUCTION_MAY_INTEGRATION`.

### 1.1 Key Metrics

| # | Metric | Source | Expected Range |
|---|--------|--------|----------------|
| 1 | Recommendation panel visibility | I3 render count | >0 per completed session |
| 2 | Readiness score generation | `MayLearnerState.getReadinessSummary()` calls | 1 per session |
| 3 | May launcher interactions | I1, I2, I4 tooltip impression + click events | Increasing over first week |
| 4 | Recommendation usage | Panel card clicks / post-session May navigation | >0 for engaged learners |
| 5 | Telemetry capture rate | `window.__mayPilot.telemetry()` event count | Consistent with session volume |
| 6 | Error frequency | Console errors from I3 try/catch, uncaught exceptions | 0 |
| 7 | Session completion rate | Pre/post-activation comparison | Stable or improved |

---

## 2. Telemetry Events (MAY-020 Framework)

### 2.1 Production-Specific Events

| Event | Trigger | Payload |
|-------|---------|---------|
| `may:recommendation:rendered` | I3 panel rendered after session complete | `{ sessionId, weaknessTopic, readinessBand, hasDecliningTopic }` |
| `may:recommendation:clicked` | Learner clicks a panel card | `{ cardIndex, cardType, topic }` |
| `may:launcher:shown` | I1/I2/I4 tooltip appears | `{ integrationPoint, sessionState, messageTier }` |
| `may:launcher:clicked` | Learner clicks launcher button | `{ integrationPoint, sessionState }` |
| `may:production:activated` | First session with flag=true | `{ timestamp, flags }` |

### 2.2 Existing Telemetry Events (Active)

| Event | MAY-020 Coverage | Status |
|-------|-----------------|--------|
| `may:session:started` | Session start tracking | Wired (MAY-020) |
| `may:session:completed` | Session end tracking | Wired (MAY-020) |
| `may:mode:activated` | Coaching mode usage | Wired (MAY-019 CAL-06) |
| `may:intervention:triggered` | Coaching intervention delivery | Wired (MAY-019 CAL-05) |
| `may:telemetry:persisted` | localStorage flush | Wired (MAY-019 CAL-07) |

---

## 3. Health Indicators

### 3.1 GREEN — Normal Operation

- Recommendation panel renders on ≥95% of completed sessions
- Zero uncaught exceptions in recommendation panel code
- Launcher tooltips appear at correct lifecycle points
- Telemetry events flowing at expected volume
- Session completion rate stable or improved vs. pre-activation baseline

### 3.2 YELLOW — Investigate

- Recommendation panel renders on <95% of completed sessions (investigate null-data cases)
- Single launcher tooltip fails to appear (investigate race condition or DOM timing)
- Telemetry capture rate drops >20% from baseline
- Single user report of confusing or misleading recommendation

### 3.3 RED — Rollback

- Recommendation panel throws uncaught errors (bypasses try/catch)
- Launcher blocks session start or end workflow
- Performance degradation exceeds 500ms render budget
- Multiple user reports of confusion or distraction
- Any content, scoring, or certification regression detected

---

## 4. Monitoring Schedule

### 4.1 Immediate (First Hour Post-Activation)

| Check | Method | Owner |
|-------|--------|-------|
| Smoke test | `npm run smoke` | MAY-024 session |
| Preflight | `npm run preflight` | MAY-024 session |
| Manual session walkthrough | Complete session → view results → check panel | MAY-024 session |
| Console error check | Browser DevTools | MAY-024 session |
| Telemetry event check | `window.__mayPilot.telemetry()` | MAY-024 session |
| Dark theme check | Toggle dark mode → verify panel | MAY-024 session |

### 4.2 Day 1 (First 24 Hours)

| Check | Method | Owner |
|-------|--------|-------|
| Recommendation panel render rate | Telemetry event count | MAY-020 dashboard |
| Session completion rate | Compare pre/post activation | MAY-020 dashboard |
| Error frequency | Console error log review | Operator |
| Launcher user feedback | Informal user observation | Operator |

### 4.3 Week 1

| Check | Method | Owner |
|-------|--------|-------|
| Weekly telemetry review | MAY-020 weekly review template | MAY-025 |
| Readiness score distribution | Telemetry aggregation | MAY-025 |
| Recommendation click-through rate | Telemetry aggregation | MAY-025 |
| Launcher engagement trend | Daily → weekly aggregation | MAY-025 |

---

## 5. Escalation Path

```
MAY-024 Session (Activation)
    │
    ├─ GREEN → Continue monitoring. No action needed.
    │
    ├─ YELLOW → Document issue. Flag in MAY-025 planning.
    │           Do NOT rollback for single YELLOW signal.
    │           Rollback only if 2+ YELLOW signals + no clear root cause.
    │
    └─ RED → Immediate rollback:
             1. Set ENABLE_PRODUCTION_MAY_INTEGRATION = false
             2. Refresh browser — all integration points disarm
             3. Log rollback reason with timestamp
             4. Document in MAY-024 closeout
             5. Schedule MAY-024-R (remediation) session
```

---

## 6. Success Criteria

| # | Criterion | Measurement |
|---|-----------|-------------|
| ✅ | Recommendation panel visible | Render count >0 for completed sessions |
| ✅ | Recommendations generated | Telemetry event `may:recommendation:rendered` fires |
| ✅ | Launcher context updates correctly | I2 messaging tier advances with learner progression |
| ✅ | Rollback remains functional | Single-flag toggle confirmed post-activation |
| ✅ | Dashboard metrics populated | Telemetry events visible in console |
| ✅ | Telemetry flowing | Event count increases with session volume |
| ✅ | No escalation triggers | Zero RED signals in first hour |
| ✅ | Governance guard remains 54/54 | Preflight confirms post-activation |

---

*MAY-024 — Monitoring Plan — 2026-07-31*
