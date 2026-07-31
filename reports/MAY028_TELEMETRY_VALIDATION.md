# MAY-028 — Telemetry Validation

**Session:** MAY-028
**Date:** 2026-07-31

---

## 1. Validation Methodology

### 1.1 Static Code Verification

| Check | Method | Result |
|-------|--------|--------|
| JS syntax valid | `node -e "require('./app.js')"` — `localStorage` error only (expected in Node) | PASS |
| CSS syntax valid | Template literal interpolation preserved | PASS |
| No pack/case file changes | `preflight` — QID counts, certified counts, hashes unchanged | PASS |
| Governance guard rules | 54/54 tests PASS | PASS |
| No new globals beyond `_mcc`, `_mayAttributionCard` | Manual inspection | PASS |

### 1.2 Smoke Test (Playwright)

```
npm run smoke
→ PASS — all UI surfaces verified
→ Zero page/console errors
```

| Check | Result |
|-------|--------|
| App loads | PASS |
| MCQ banks present | PASS |
| May coaching layer active | PASS |
| MayFeatureFlags loaded | PASS |
| MayLearnerProfile loaded | PASS |
| MayCoachingOrchestrator loaded | PASS |
| 0 page errors | PASS |

### 1.3 Inline Attribute Validation

Verified each card generates valid HTML with:
- Unique DOM `id` attribute
- `onclick` calling `window._mcc()` with escaped parameters
- `cursor: pointer` via CSS class inheritance

### 1.4 Telemetry Integrity

| Check | Method | Result |
|-------|--------|--------|
| `trackAdoption` called on click | Code path: `window._mcc()` → `MayTelemetry.trackAdoption()` | PASS |
| `clicked: true` set on card click | `window._mcc()` sets `clicked: true` in telemetry data | PASS |
| `attributionCardId` included in session start | `_attrib` read from `window._mayAttributionCard` before session-start event | PASS |
| `attributionCardId` included in session complete | `_attribC` read from `window._mayAttributionCard` before session-complete event | PASS |
| Attribution cleared after session complete | `window._mayAttributionCard = null` after session-complete event | PASS |
| Null-safe when no attribution | `(_attrib && _attrib.cardId) \|\| null` pattern | PASS |
| Backward compatible | Existing telemetry fields unchanged; new `attributionCardId`/`attributionCardType` are additive | PASS |

### 1.5 No Side Effects

| Area | Check | Result |
|------|-------|--------|
| Recommendation logic | No changes to `MayLearnerState`, `may-adaptive-recommender.js`, `may-readiness-scorer.js` | PASS |
| Scoring | No changes to `scoreMCQ()`, scoring formulas, `CorrectChoice` | PASS |
| Session lifecycle | `start()`, `finish()`, `render()` unchanged | PASS |
| May UI/coaching | `renderView()`, `renderMiniPanel()`, `may-core.js` unchanged | PASS |
| Learner pool | No `question_state` changes, no pack writes | PASS |
