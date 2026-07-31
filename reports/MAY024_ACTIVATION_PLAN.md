# MAY-024 — Production Activation Plan (Planner Phase)

**Session:** MAY-024 — Production Activation & Controlled Monitoring
**Date:** 2026-07-31
**Governance Lane:** Light
**Prerequisite:** MAY-023 GO verdict (98/100 readiness, all gates passed)
**Status:** Active

---

## 1. Activation Scope

### 1.1 What Changes

**Single file modification:** `may-feature-flags.js:30`

```javascript
// Before:
ENABLE_PRODUCTION_MAY_INTEGRATION: false

// After:
ENABLE_PRODUCTION_MAY_INTEGRATION: true
```

### 1.2 What Does NOT Change

| Flag | Value | Reason |
|------|-------|--------|
| `ENABLE_LLM` | `false` | LLM features remain disabled per rollout governance |
| `ENABLE_OPENAI_PROVIDER` | `false` | No external API dependency |
| `ENABLE_AZURE_OPENAI_PROVIDER` | `false` | No external API dependency |
| `ENABLE_COACHING_MEMORY` | `false` | Memory features not yet enabled |
| All other coaching flags | Unchanged | Existing pilot flags already active via may-pilot-activation.js |
| All pack/case files | No changes | Light Lane — no content modifications |
| `app.js` | No changes | Integration points already deployed in MAY-022 |
| `index_updated.html` | No changes | Already references may-core.js and may-learner-state.js |
| `styles.css` | No changes | All 31 May CSS selectors already present |
| Answer keys | No changes | No scoring or certification modifications |

### 1.3 What Activates

When `ENABLE_PRODUCTION_MAY_INTEGRATION` becomes `true`, 4 integration points in `app.js` activate:

| Point | Location | Behavior |
|-------|----------|----------|
| I1 | app.js:1607 | Post-session launcher tooltip — "Review your session with May" |
| I2 | app.js:1634 | Landing page contextual launcher — context-aware button + messaging |
| I3 | app.js:2132 | Results recommendation panel — 4-card panel (Weakness, Review, Next, Readiness) |
| I4 | app.js:3971 | Session-start launcher tooltip — context-sensitive guidance |

All 4 points are read-only consumers of `MayLearnerState` data. Zero writes to pack/case/scoring layers.

---

## 2. Activation Procedure

### 2.1 Pre-Activation Checklist

- [x] Preflight PASS — 0 divergences (2,451 certified, 54/54 governance)
- [x] Smoke test baseline captured (expected: 17/17)
- [x] MAY-023 GO verdict confirmed (98/100 readiness)
- [x] Rollback procedure accessible and verified
- [x] `may-feature-flags.js` backup captured

### 2.2 Activation Steps

| Step | Action | Tool | Expected |
|------|--------|------|----------|
| 1 | Backup `may-feature-flags.js` | `Copy-Item` with timestamp | Confirmed non-zero size |
| 2 | Toggle `ENABLE_PRODUCTION_MAY_INTEGRATION: true` | Edit flag on line 30 | Flag = true |
| 3 | Run `npm run preflight` | Preflight script | 0 divergences |
| 4 | Run `npm run smoke` | Playwright smoke test | 17/17 PASS |
| 5 | Verify governance guard | Preflight includes guard tests | 54/54 PASS |
| 6 | Manual browser verification | Open app, complete session, view results | Panel visible, launcher active |

### 2.3 Post-Activation Validation

| Check | Method | Expected |
|-------|--------|----------|
| Recommendation panel renders on results page | Complete a session → view results | 4 cards present |
| Launcher tooltip visible | Start new session | Context-aware message appears |
| Landing page launcher active | Navigate to landing page | May button present |
| Post-session tooltip visible after completion | Complete session | "Review your session" tooltip |
| Dashboard tab functional | Click May tab | Coaching view loads |
| Telemetry capture active | `window.__mayPilot.telemetry()` in console | Events with timestamps |
| Dark theme compatibility | Enable dark mode | Panel renders in dark colors |

---

## 3. Rollback

### 3.1 Immediate Rollback (Sub-Minute)

```
1. Set ENABLE_PRODUCTION_MAY_INTEGRATION: false (line 30)
2. Refresh browser — all 4 integration points disarm instantly
3. No data loss — MayLearnerState localStorage preserved
4. No scoring impact — panel is display-only
```

### 3.2 Rollback Triggers

- Recommendation panel throws uncaught errors (not caught by try/catch at I3)
- Launcher interferes with session start/end workflows
- Performance degradation observed (>500ms added to render cycle)
- User reports of confusion or distraction
- Any content or scoring regression detected (requires Full Governance Lane escalation)

---

## 4. Activation Authorization

### 4.1 Prerequisites for Authorization

- [x] MAY-023 closeout confirms GO verdict
- [x] All 6 MAY-023 deliverables produced
- [x] Project lead authorization for broader activation (implicit in MAY-024 session creation)
- [x] Rollback procedure documented

### 4.2 Authorization Status

**AUTHORIZED.** MAY-023 verdict: GO. Readiness: 98/100. All governance gates pass. Rollback is single-flag, sub-minute, zero data loss.

---

## 5. Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| Planner | ~5 min | Create activation plan, monitoring plan, rollback checklist |
| Auditor | ~5 min | Verify flag scope, telemetry, UX |
| Implementer | ~1 min | Toggle flag |
| Verifier | ~5 min | Run preflight + smoke, verify recommendations, confirm rollback |
| Monitoring | Ongoing | MAY-020 dashboard, first real-user sessions |

---

## 6. Transition to Operational Status

Upon successful activation and verification:

- May transitions from **project status** to **operational product status**
- MAY-020 monitoring framework provides ongoing health visibility
- Subsequent MAY sessions focus on iteration, not activation
- LLM features remain disabled until explicitly authorized

---

*MAY-024 — Activation Plan — 2026-07-31*
