# MAY-028 — Attribution Analysis Framework

**Session:** MAY-028
**Date:** 2026-07-31

---

## 1. Analysis Capabilities

With card-level attribution wired, the following analyses become possible after enough usage data accumulates:

### 1.1 Per-Card Funnel (Post-Deployment)

```
                    Presented   →   Clicked   →   Session Started   →   Completed
──────────────────────────────────────────────────────────────────────────────────
Top Weakness           N          n_clicks        n_starts              n_completes
Suggested Review       N          n_clicks        n_starts              n_completes
Next Session           N          n_clicks        n_starts              n_completes
Readiness              N          n_clicks        n_starts              n_completes
──────────────────────────────────────────────────────────────────────────────────
Panel Link             N          n_clicks        n_starts              n_completes
No Attribution (null)  —          —               n_starts              n_completes
```

### 1.2 Derived Metrics

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **Open Rate** | `presented / panel_renders` | Always 100% per card; measures panel visibility |
| **Click Rate** | `clicked / panel_renders` | Which cards attract attention? |
| **Click-to-Start Rate** | `session_started / clicked` | Which cards drive action? (UA5/UA6: effectiveness) |
| **Start-to-Complete Rate** | `completed / session_started` | Which card-driven sessions are completed? (UA5/UA6: persistence) |
| **Click-to-Complete Rate** | `completed / clicked` | Full funnel: which cards drive completed sessions? |
| **Attribution Gap** | `null_attrib_sessions / total_sessions` | Organic vs. recommendation-driven session ratio |

### 1.3 Temporal Analysis

Group by time window (daily, weekly) to detect:
- **Trending cards** — rising click rates over time
- **Decaying cards** — falling click rates (may indicate stale data)
- **Session cycle effects** — hours/days between click and session start

## 2. UA5 & UA6 Measurement

| Action | UA5 (Top Weakness / Suggested Review) | UA6 (Next Session / Readiness) |
|--------|---------------------------------------|-------------------------------|
| Card clicked | `cardId: 'top-weakness' \|\| 'suggested-review'` | `cardId: 'next-session' \|\| 'readiness'` |
| Session started | `attributionCardId: 'top-weakness'` → UA5 attribution | `attributionCardId: 'next-session'` → UA6 attribution |
| Session completed | UA5 completion rate = `completed / started` for UA5 cards | UA6 completion rate = `completed / started` for UA6 cards |

## 3. Query Reference

Collect telemetry via browser console or automated collection script:

```javascript
// 1. Drain telemetry buffer
var events = MayTelemetry.drain();

// 2. Filter by event type
var adoptionEvents = events.filter(e => e.type === 'adoption');

// 3. Per-card click analysis
var cardClicks = {};
adoptionEvents.filter(e => e.data.clicked && e.data.cardId !== 'rec-panel-link')
    .forEach(e => {
        var c = e.data.cardId;
        cardClicks[c] = (cardClicks[c] || 0) + 1;
    });

// 4. Attribution correlation
var attribSessions = {};
adoptionEvents.filter(e => e.data.attributionCardId)
    .forEach(e => {
        var c = e.data.attributionCardId;
        if (!attribSessions[c]) attribSessions[c] = { started: 0, completed: 0 };
        if (e.data.sessionStarted) attribSessions[c].started++;
        if (e.data.completed) attribSessions[c].completed++;
    });

// 5. Summary
console.log({ cardClicks, attribSessions, totalEvents: events.length });
```

## 4. Baseline Expectations (Post-Deployment)

| Metric | Expected Range | Signal |
|--------|---------------|--------|
| Click rate (per card) | 1-5% | Normal user behavior: cards are glance items, not primary CTAs |
| Click-to-start rate | 20-50% | Card motivated enough to start a session |
| Start-to-complete rate | 60-90% | Aligned with session completion norms |
| Attribution gap | 70-90% | Most sessions started without card interaction (organic) |
| Panel link rate | 0.5-3% | "Open May" link is secondary path |

## 5. Post-MAY-028 Roadmap

| Session | Focus | Depends On |
|---------|-------|------------|
| MAY-029 | True optimization: use attribution data to tune card content, ordering, and recommendations | MAY-028 data maturity (~2+ weeks) |
| MAY-030 | A/B test card formats (compact vs. detailed, icon vs. text-only) | MAY-028 attribution attribution |
| MAY-031 | Personalization: order cards by predicted user value | MAY-029 optimization |
