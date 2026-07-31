# MAY-026 — Telemetry Wiring Plan (Planner Phase)

**Session:** MAY-026 — Adoption Telemetry Wiring & Production Data Collection
**Date:** 2026-07-31
**Governance Lane:** Light (no pack/case/content/scoring modifications)
**Prerequisite:** MAY-025 (telemetry infrastructure complete)
**Status:** Active

---

## 1. Objective

Wire the `trackAdoption()` and `trackEngagement()` telemetry APIs (created in MAY-025) to production call sites in the recommendation panel, review bridge, and launcher workflows. No recommendation logic, scoring, or content changes.

## 2. Event-to-Call-Site Mapping

### 2.1 Adoption Events (`trackAdoption`)

| Event | Call Site | File | Line | Trigger |
|-------|-----------|------|------|---------|
| `presented` (×4 cards) | `_renderMayRecommendationPanel()` | app.js | 2131 | Summary view renders recommendation panel |
| `panelOpened` | `openMayFromLauncher()` | may-core.js | 6556 | User opens May coaching from launcher |
| `panelOpened` | `_renderMayRecommendationPanel()` onclick | app.js | 2152 | User opens May from recommendation panel link |
| `clicked` | `openMayFromLauncher()` | may-core.js | 6556 | User clicks launcher button |
| `sessionStarted` | `$('sessionForm').onsubmit` | app.js | 3965 | New practice session begins |
| `completed` | `ExamSessionManager.finish()` | app.js | 1596 | Session submitted/completed |

### 2.2 Engagement Events (`trackEngagement`)

| Event | Call Site | File | Line | Trigger |
|-------|-----------|------|------|---------|
| `tooltipViewed` | `_updateMayLauncherState()` | may-core.js | 6532 | Tooltip content updates (impression) |
| `tooltipClicked` | `openMayFromLauncher()` | may-core.js | 6556 | User clicks launcher button |
| `dismissed` | `dismissMayCompanionCard()` | may-core.js | 6500 | User dismisses companion card |

### 2.3 Four Recommendation Cards

| cardId | recommendationType | Data Source |
|--------|-------------------|-------------|
| `top-weakness` | Top Weakness | `topWeak.topic` |
| `suggested-review` | Suggested Review | `suggestedTopic` |
| `next-session` | Next Session | `nextAction` |
| `readiness` | Readiness | `readinessBand` |

## 3. File Modifications (3 files, 0 new files created)

| File | Changes | Type |
|------|---------|------|
| `app.js` | 4 injection sites (panel presented, panel link onclick, session start, session finish) | Edit |
| `may-core.js` | 4 injection sites (openMayFromLauncher, dismissMayCompanionCard, _updateMayLauncherState, _injectMayLauncher) | Edit |
| `scripts/may026_telemetry_validation.js` | New file — validation harness | New |

## 4. Data Flow

```
Recommendation Panel Renders
  → MayTelemetry.trackAdoption({ presented: true }) × 4 cards
  → Events buffered in _buffer[]

User opens May (launcher or panel link)
  → MayTelemetry.trackAdoption({ panelOpened: true, clicked: true })
  → MayTelemetry.trackEngagement({ action: 'tooltipClicked' })

User starts session
  → MayTelemetry.trackAdoption({ sessionStarted: true })

User completes session
  → MayTelemetry.trackAdoption({ completed: true })

Post-session: orchestrator persists snapshot
  → localStorage.setItem('cmaMayPilotTelemetry', snapshot)

Analysis phase reads drain() / snapshot()
  → MAY025_EFFECTIVENESS_EXECUTIVE_SUMMARY.md
```

## 5. Non-Goals (Explicitly Excluded)

- No individual card click handlers (cards are currently info-display only; panel-level action link covers clicked event)
- No modification to `may-coaching-orchestrator.js` (already fires orchestration telemetry)
- No LLM activation
- No recommendation logic changes
- No scoring changes
- No certification changes
- No pack/case file modifications

## 6. Governance

| Attribute | Value |
|-----------|-------|
| Lane | Light |
| Content modifications | 0 |
| Pack file edits | 0 |
| Answer-key changes | 0 |
| question_state changes | 0 |
| Preflight | Recommended at T0, required at Tend |
| Smoke | Required at Tend (app.js + may-core.js modified) |
| REVISION_HISTORY.md | Not required (Light Lane, no content defect) |

---

*MAY-026 — Telemetry Wiring Plan — 2026-07-31*
