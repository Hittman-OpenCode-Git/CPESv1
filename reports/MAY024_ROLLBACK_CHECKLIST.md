# MAY-024 — Rollback Checklist (Planner Phase)

**Session:** MAY-024 — Production Activation & Controlled Monitoring
**Date:** 2026-07-31
**Governance Lane:** Light
**Reference:** MAY-023 Rollback Verification (§1.5)
**Status:** Active

---

## 1. Rollback Architecture

### 1.1 Single-Flag Control

All 4 production integration points are gated behind one flag:

```
may-feature-flags.js:30
  ENABLE_PRODUCTION_MAY_INTEGRATION = true/false
    ├── I1: app.js:1607 — Post-session launcher tooltip
    ├── I2: app.js:1634 — Landing page contextual launcher
    ├── I3: app.js:2132 — Results recommendation panel
    └── I4: app.js:3971 — Session-start launcher tooltip
```

**Rollback = set flag to `false`. All 4 points disarm simultaneously.**

### 1.2 What Rollback Does NOT Affect

| Layer | Status After Rollback |
|-------|----------------------|
| MayLearnerState data (localStorage) | **Preserved** — all session data, weakness clusters, readiness scores remain |
| May coaching view (standalone tab) | **Unaffected** — coaching tab remains accessible |
| may-pilot-activation.js (coaching pipeline) | **Unaffected** — coaching engine, readiness engine, orchestrator remain active |
| Pack files | **Zero impact** — May never writes to pack files |
| Scoring | **Zero impact** — May is read-only |
| Certifications | **Zero impact** — May does not access question_state |
| Session data | **Zero impact** — session persistence unchanged |
| UI (non-May) | **Zero impact** — no rendering changes |

---

## 2. Rollback Procedure

### 2.1 Immediate Rollback (< 1 Minute)

```
Step 1: Open may-feature-flags.js
Step 2: Change line 30 from:
          ENABLE_PRODUCTION_MAY_INTEGRATION: true
        To:
          ENABLE_PRODUCTION_MAY_INTEGRATION: false
Step 3: Save file
Step 4: Refresh browser (or reload page)
Step 5: Verify — recommendation panel gone, launcher tooltips gone
```

### 2.2 Rollback Verification

| # | Check | Expected |
|---|-------|----------|
| 1 | Recommendation panel absent from results page | No panel rendered |
| 2 | Launcher tooltip absent from landing page | No May tooltip on landing |
| 3 | Launcher tooltip absent from session start | No May tooltip at session start |
| 4 | Launcher tooltip absent at session end | No May tooltip at session end |
| 5 | May coaching tab still accessible | Coaching view still loads separately |
| 6 | MayLearnerState data intact | `MayLearnerState.load() + .getWeaknessClusters()` returns data |
| 7 | Preflight unchanged | 0 divergences, 2,451 certified |
| 8 | Smoke unchanged | 17/17 PASS |
| 9 | Session start/complete works normally | No errors |
| 10 | Scoring works normally | Correct answers still graded correctly |

---

## 3. Rollback Triggers

### 3.1 Immediate (RED Signal)

| Trigger | Rationale |
|---------|-----------|
| Recommendation panel throws uncaught errors bypassing try/catch at I3 | Learner sees broken UI |
| Launcher blocks standard session start/end workflow | Application-level regression |
| Performance degradation >500ms added to render cycle | Violates render budget |
| Any content or scoring regression | Would require Full Governance Lane escalation |
| Any certification state change detected | Governance violation |

### 3.2 Investigate First (YELLOW Signal — Do NOT Auto-Rollback)

| Trigger | Investigation |
|---------|--------------|
| Panel renders blank (no data) on single session | Check MayLearnerState data — possible no-sessions-yet edge case |
| Single launcher tooltip missing at lifecycle point | Check DOM timing, race condition |
| Minor console warning (non-blocking) | Log and monitor |
| Single user report of confusing recommendation | Check recommendation data quality |

### 3.3 Rollback Decision Protocol

```
YELLOW signal detected
    │
    ├─ Single occurrence + clear root cause → Document, do NOT rollback
    ├─ Single occurrence + unknown root cause → Document, flag for MAY-025
    ├─ 2+ YELLOW signals (different types) + no root cause → ROLLBACK
    └─ 2+ YELLOW signals (same type, recurring) + no fix → ROLLBACK

RED signal detected
    │
    └─ Immediate rollback. No investigation before rollback.
       Investigate root cause AFTER rollback is complete.
```

---

## 4. Post-Rollback Actions

### 4.1 Immediate

- Document rollback reason with timestamp
- Confirm all 10 rollback verification checks pass
- Notify operator/project lead of rollback

### 4.2 Short-Term

- Root cause analysis — what triggered the rollback?
- Fix or mitigation plan
- Schedule MAY-024-R (remediation + re-activation session)

### 4.3 Long-Term

- Update rollout governance documentation
- Add new trigger patterns to DEFECT_LIBRARY.md if applicable
- Update REVISION_HISTORY.md with rollback event

---

## 5. Rollback Confirmation (Pre-Activation Verification)

| # | Check | Status |
|---|-------|--------|
| 1 | Flag currently = `false` (default) | ✅ — Confirmed at may-feature-flags.js:30 |
| 2 | Flag = `false` disables all 4 integration points | ✅ — All 4 gated behind single flag |
| 3 | Zero data loss on rollback | ✅ — MayLearnerState in localStorage, panel display-only |
| 4 | Sub-minute procedure | ✅ — One edit, one save, one refresh |
| 5 | No scoring impact | ✅ — Panel is read-only |
| 6 | No content impact | ✅ — No pack/case file writes |
| 7 | No certification impact | ✅ — Does not access question_state |
| 8 | Coaching tab preserved | ✅ — may-pilot-activation.js unaffected |
| 9 | Learner state preserved | ✅ — localStorage independent of flag |
| 10 | Preflight unchanged after rollback | ✅ — 2,451 certified, 0 divergences |

---

## 6. Rollback Test (Post-Activation)

After activation, confirm rollback still works:

| Step | Action | Expected |
|------|--------|----------|
| 1 | Set flag to `false` | All 4 points disarm |
| 2 | Run `npm run preflight` | 0 divergences |
| 3 | Run `npm run smoke` | 17/17 PASS |
| 4 | Open app in browser | No recommendation panel, no launcher tooltips |
| 5 | Complete a session | Session completes normally, no May integration visible |
| 6 | Set flag to `true` | All 4 points re-arm |
| 7 | Complete a session → view results | Panel visible again |

---

*MAY-024 — Rollback Checklist — 2026-07-31*
