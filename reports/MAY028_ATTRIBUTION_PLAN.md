# MAY-028 — Recommendation Attribution & Effectiveness Telemetry: Implementation Plan

**Session:** MAY-028
**Date:** 2026-07-31
**Governance Lane:** Light
**Predecessor:** MAY-027 (Baseline Established)
**Status:** Complete

---

## 1. Motivation

MAY-027 established a baseline measurement framework and identified a critical blocker:

> UA5 and UA6 are currently unmeasurable because recommendation-card attribution is missing.

Panel-level telemetry exists. Card-level attribution does not.

Without card-level attribution, the project cannot answer:
- Which recommendation types drive engagement?
- Which recommendation types drive study behavior?
- Which recommendation types are ignored?

## 2. Scope

### In Scope
- Add `onclick` handlers to all 4 recommendation cards in the May recommendation panel
- Wire card click events to `MayTelemetry.trackAdoption()` with `clicked: true`
- Correlate card clicks with subsequent session start/complete events via `window._mayAttributionCard`
- Make cards visibly clickable via CSS (`cursor: pointer`, hover effect)
- Produce 6 deliverable documents

### Out of Scope (firmly)
- No recommendation logic changes
- No scoring changes
- No adaptive-model changes
- No LLM activation
- No pack/case file modifications
- No `question_state` changes

## 3. Files Modified

| File | Change | Lines |
|------|--------|-------|
| `app.js` | Added `window._mcc()` global helper function | 3935-3958 |
| `app.js` | Added `id`, `onclick` to 4 recommendation card `<div>` elements | 2164-2169 |
| `app.js` | Session start: read `window._mayAttributionCard`, include in telemetry | 4018-4020 |
| `app.js` | Session complete: read `window._mayAttributionCard`, include, then null | 1608-1611 |
| `styles.css` | Added `cursor: pointer`, `transition`, hover effect to `.may-rec-card` | 4127-4142 |

## 4. Attribution Schema

### Card Click Event (via `window._mcc`)
```javascript
MayTelemetry.trackAdoption({
    recommendationType: 'Top Weakness' | 'Suggested Review' | 'Next Session' | 'Readiness',
    cardId: 'top-weakness' | 'suggested-review' | 'next-session' | 'readiness',
    topic: '<card-topic-value>',
    presented: false,
    panelOpened: false,
    clicked: true,
    sessionStarted: false,
    completed: false,
    timestamp: '<ISO 8601>'
});
```

### Attribution Context (stored on `window._mayAttributionCard`)
```javascript
{
    recommendationType: 'Top Weakness' | ...,
    cardId: 'top-weakness' | ...,
    topic: '<topic-value>',
    clickedAt: '<ISO 8601>'
}
```

### Session Start (with attribution)
```javascript
MayTelemetry.trackAdoption({
    recommendationType: 'Session',
    cardId: 'session-start',
    topic: '',
    presented: false,
    panelOpened: false,
    clicked: false,
    sessionStarted: true,
    completed: false,
    attributionCardId: '<cardId>' | null,
    attributionCardType: '<recommendationType>' | null,
    timestamp: '<ISO 8601>'
});
```

### Session Complete (with attribution, then clear)
```javascript
MayTelemetry.trackAdoption({
    // ... same as above ...
    completed: true,
    attributionCardId: '<cardId>' | null,
    attributionCardType: '<recommendationType>' | null
});
window._mayAttributionCard = null;
```

## 5. Attribution Flow

```
Panel Render → 4× presented events
     ↓
User clicks card → 1× clicked event + store _mayAttributionCard
     ↓
Session starts → session-start event with attributionCardId
     ↓
Session completes → session-complete event with attributionCardId + clear _mayAttributionCard
```

Edge cases handled:
- Card click without subsequent session → attribution stored but unused (overwritten on next card click or page unload)
- Session start without prior card click → `attributionCardId: null` (session was organically started)
- Multiple card clicks → last click wins (most recent intent)
- Session complete without attribution → `attributionCardId: null` + clear

## 6. CSS Changes

```css
.may-rec-card {
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
}
.may-rec-card:hover {
    border-color: var(--accent, #2563eb);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
}
```

Dark theme variant applies `#60a5fa` accent with matching shadow.

## 7. Success Criteria

| Criterion | Status |
|-----------|--------|
| UA5 measurable (Top Weakness / Suggested Review attribution) | ✅ |
| UA6 measurable (Next Session / Readiness attribution) | ✅ |
| Per-card click tracking working | ✅ |
| Card-to-session correlation wired | ✅ |
| No recommendation logic changes | ✅ |
| No scoring changes | ✅ |
| No governance regressions (preflight PASS, governance guard 54/54) | ✅ |
| Smoke test PASS | ✅ |
