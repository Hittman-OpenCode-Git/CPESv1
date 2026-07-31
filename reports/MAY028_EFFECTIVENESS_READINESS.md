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

### 1.3 Measurement Maturity Model (Single-Learner, Behavioral)

The original timeline assumed multi-user population analysis requiring weeks of aggregated data. For a single-learner longitudinal deployment, maturity is gated by **behavioral evidence**, not calendar time.

| Gate | Threshold | What It Enables |
|------|-----------|-----------------|
| **G-B1: Session Accumulation** | ≥5 completed sessions | Reliable per-card click/start/complete rates for this learner |
| **G-B2: Recovery Activity** | ≥1 Recovery Sprint | Recovery effectiveness measurement (baseline → sprint → follow-up) |

MAY-029A proceeds when either gate is satisfied.

### 1.4 What Is Measurable Immediately (MAY-028 Complete)

| Metric | Data Source | Status |
|--------|------------|--------|
| Recommendation Conversion | Presented → Clicked → Started → Completed | **Live** — attribution wiring active |
| Recovery Effectiveness | Recovery Sprint baseline vs. follow-up | **Live** — Recovery Sprint outcomes tracked |
| Confidence Calibration | Wrong+High vs. Correct+Low trending | **Live** — per-session calibration data |
| Readiness Movement | Domain readiness score deltas | **Live** — readiness dashboard + telemetry |
| Ignored Recommendations | Cards presented but never clicked | **Live** — per-card click rates |
| Adoption Rate | Sessions with attribution vs. without | **Live** — per-card adoption metrics |

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

MAY-029A is gated by behavioral maturity (≥5 sessions OR ≥1 Recovery Sprint), not calendar time. All measurement infrastructure is in place; the remaining dependency is accumulated usage evidence, not further instrumentation.
