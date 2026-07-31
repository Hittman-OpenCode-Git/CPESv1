# MAY-028 — Effectiveness Measurement Readiness

**Session:** MAY-028
**Date:** 2026-07-31

---

## 1. Readiness Assessment

### 1.1 What Changed

| Before MAY-028 | After MAY-028 |
|----------------|---------------|
| Cards were display-only `<div>` elements | Cards have `onclick` handlers + IDs |
| `clicked: false` hardcoded for all cards | `clicked: true` fires on actual clicks |
| Session events had no card attribution | Session events carry `attributionCardId` + `attributionCardType` |
| UA5/UA6 unmeasurable | UA5/UA6 fully measurable |
| Cards looked static (no cursor change) | Cards show `cursor: pointer` + hover border/shadow |

### 1.2 Measurement Readiness

| Capability | Status | Notes |
|------------|--------|-------|
| Which cards are presented? | ✅ Already existed | 4× `presented` events per panel render |
| Which cards are clicked? | ✅ **NEW — MAY-028** | `clicked: true` via `window._mcc()` |
| Which cards drive session starts? | ✅ **NEW — MAY-028** | `attributionCardId` on `session-start` |
| Which cards drive session completions? | ✅ **NEW — MAY-028** | `attributionCardId` on `session-complete` |
| Per-card open rate | ✅ Already existed | `presented` events tracked |
| Per-card click rate | ✅ **NEW — MAY-028** | `clicked` events ÷ panel renders |
| Per-card start rate | ✅ **NEW — MAY-028** | `sessionStarted` ÷ `clicked` |
| Per-card completion rate | ✅ **NEW — MAY-028** | `completed` ÷ `started` |

### 1.3 Measurement Maturity Timeline

| Phase | Duration | Data Available |
|-------|----------|----------------|
| **T+0 (now)** | MA-028 deployed | Click tracking live, attribution wiring active |
| **T+1-3 days** | Initial sample | First click rates, preliminary funnel |
| **T+1-2 weeks** | Meaningful sample | Reliable per-card click/start/complete rates |
| **T+2-4 weeks** | Statistical maturity | Trends, segmentation, temporal patterns |
| **T+4+ weeks** | Optimization-ready | Enough data for A/B tests (MAY-030) and personalization (MAY-031) |

## 2. Data Collection

All telemetry is console-only (in-memory buffer, max 500 events). To collect for analysis:

### Method 1: Browser Console
```javascript
// After several sessions have been completed
var snap = MayTelemetry.snapshot();
console.log(JSON.stringify(snap, null, 2));
```

### Method 2: Drain + Save
```javascript
var events = MayTelemetry.drain();
// Copy to clipboard or save to localStorage for batch export
localStorage.setItem('may-telemetry-export', JSON.stringify(events));
```

### Method 3: Automated Collection (Future)
A scheduled script could call `MayTelemetry.drain()` on an interval and persist to an analytics backend. This is out of scope for MAY-028 but the API is ready.

## 3. Privacy

- All telemetry is client-side only
- No external network calls
- No personally identifiable information
- No session content (questions, answers, scores) in telemetry events
- Card topics are limited to accounting topic labels (e.g., "Cost Management")

## 4. What Was NOT Changed

| Component | Status | Rationale |
|-----------|--------|-----------|
| Recommendation logic | Unchanged | Out of scope for attribution wiring |
| Scoring | Unchanged | No scoring changes |
| Adaptive models | Unchanged | No model changes |
| LLM activation | Unchanged | LLM remains disabled |
| May coaching modes | Unchanged | Only attribution layer touched |
| Pack/case content | Unchanged | Governance Light Lane |
| `question_state` | Unchanged | No certification changes |
| Learner pool | Unchanged | No delivery-pool impact |

## 5. Verdict

The effectiveness measurement framework is **instrumentation-complete**. All UA5 and UA6 actions are now attributable to specific recommendation cards. The project can answer:

> "Which specific recommendation types change study behavior?"

Once usage data matures (2-4 weeks), MAY-029 can proceed as a true optimization session rather than another instrumentation session.
