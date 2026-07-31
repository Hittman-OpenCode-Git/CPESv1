# MAY-028 — Event Map: Recommendation Attribution Telemetry

**Session:** MAY-028
**Date:** 2026-07-31

---

## 1. Complete Event Taxonomy

### Before MAY-028 (Pre-Attribution)

| Event | Type | cardId | When | Attribution |
|-------|------|--------|------|-------------|
| Panel rendered — Top Weakness | adoption | `top-weakness` | Summary view render | None (`clicked: false`) |
| Panel rendered — Suggested Review | adoption | `suggested-review` | Summary view render | None (`clicked: false`) |
| Panel rendered — Next Session | adoption | `next-session` | Summary view render | None (`clicked: false`) |
| Panel rendered — Readiness | adoption | `readiness` | Summary view render | None (`clicked: false`) |
| "Open May" link clicked | adoption | `rec-panel-link` | User clicks link | None |
| Session started | adoption | `session-start` | Form submit | None |
| Session completed | adoption | `session-complete` | `finish()` | None |

**Gap:** UA5 (Top Weakness / Suggested Review) and UA6 (Next Session / Readiness) had `clicked: false` hardcoded. No mechanism to trace session activity back to a specific card.

### After MAY-028 (With Attribution)

| Event | Type | cardId | When | Attribution Fields |
|-------|------|--------|------|--------------------|
| Panel rendered (all 4 cards) | adoption | `top-weakness` / `suggested-review` / `next-session` / `readiness` | Summary view render | `presented: true, clicked: false` |
| **Card clicked** (NEW) | adoption | `top-weakness` / `suggested-review` / `next-session` / `readiness` | User clicks card | `clicked: true` + sets `window._mayAttributionCard` |
| "Open May" link clicked | adoption | `rec-panel-link` | User clicks link | `clicked: true` (no attribution store) |
| Session started | adoption | `session-start` | Form submit | `attributionCardId`, `attributionCardType` (from `_mayAttributionCard`) |
| Session completed | adoption | `session-complete` | `finish()` | `attributionCardId`, `attributionCardType` (from `_mayAttributionCard`, then nulled) |

## 2. Card ID Mapping

| Card Label | cardId | DOM `id` | Data Source |
|------------|--------|----------|-------------|
| Top Weakness | `top-weakness` | `may-rec-weakness` | `clusters.persistentWeak[0]` |
| Suggested Review | `suggested-review` | `may-rec-suggested` | `declining[0].topic \|\| topWeak.topic` |
| Next Session | `next-session` | `may-rec-next` | Derived from `suggestedTopic` |
| Readiness | `readiness` | `may-rec-readiness` | `readiness.overall.band` |

## 3. Funnel Stages (per card)

```
Stage 1: Presented — panel rendered, card visible
  ↓ tracked as presented: true, clicked: false
Stage 2: Clicked — user clicks card
  ↓ tracked as clicked: true, stores attribution context
Stage 3: Session Started — form submitted
  ↓ tracked as sessionStarted: true, with attributionCardId
Stage 4: Session Completed — finish() called
  ↓ tracked as completed: true, with attributionCardId
```

## 4. Telemetry Buffer

All events go through `MayTelemetry` in-memory buffer (max 500 events, console-only in development).

**Queryable via:**
```javascript
MayTelemetry.snapshot()  // → { totalEvents, byType, modeCounts, timestamp }
MayTelemetry.drain()     // → array of all buffered events, clears buffer
```

## 5. Analysis Queries (Post-Deployment)

### Open Rate (per card)
```
card presented events / total panel renders
```
(Always 100% since all 4 cards render together — metric measures panel visibility)

### Click Rate (per card)
```
card clicked events / total panel renders
```

### Start Rate (per card)
```
sessions with attributionCardId = cardId / card clicked events
```

### Completion Rate (per card)
```
sessions completed with attributionCardId = cardId / sessions started with attributionCardId = cardId
```

### Attribution Gap
```
sessions with attributionCardId = null / total sessions
```
Measures organic vs. recommendation-driven sessions.

## 6. Global Helper API

```javascript
// Called from inline onclick on each card
window._mcc(recommendationType, cardId, topic)

// Stores attribution context for session correlation
window._mayAttributionCard = {
    recommendationType: string,
    cardId: string,
    topic: string,
    clickedAt: ISO_8601_string
}
```
