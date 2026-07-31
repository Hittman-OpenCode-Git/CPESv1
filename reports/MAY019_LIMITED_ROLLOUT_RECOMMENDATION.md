# MAY-019A — Limited Rollout Recommendation

**Session:** MAY-019A (Stretch)
**Date:** 2026-07-31
**Governance Lane:** Light (advisory — no implementation)
**Based on:** MAY-019 calibration fixes + full regression verification

---

## Verdict: **GO**

A limited real-user adaptive-coaching rollout with `CMA_MAY_PILOT=1` is recommended.

---

## 1. Evidence Summary

### 1.1 Calibration Fixes Applied (MAY-019)

| Item | Description | Status |
|------|-------------|--------|
| CAL-01 | D8 guard: `dataSections > 0` → D10 reachable | Applied |
| CAL-02 | D7 before D5 → EXPLAIN mode for fragile knowledge | Applied |
| CAL-03 | Ready band (95) investigated — threshold IS reachable, no change needed | Documented |
| CAL-05 | `trackIntervention()` wired in orchestrator | Applied |
| CAL-06 | `trackMode()` wired in orchestrator + router | Applied |
| CAL-07 | Telemetry persisted to `localStorage` (`cmaMayPilotTelemetry`) | Applied |

### 1.2 Decision Engine Coverage

| Decision | Mode | Reachable? | Fix |
|----------|------|------------|-----|
| D1 | QUIZ | Yes | — |
| D2 | QUIZ | Yes | — |
| D3 | SOCRATIC | Yes (narrow) | — |
| D4 | STUDY_PLAN | Yes (narrow) | — |
| D5 | QUIZ | Yes | — |
| D6 | QUIZ | Yes | — |
| D7 | EXPLAIN | **Yes** (was dead) | CAL-02 |
| D8 | EXPLAIN | Yes | — |
| D9 | QUIZ | Yes | — |
| D10 | EXPLAIN | **Yes** (was dead) | CAL-01 |

### 1.3 Telemetry Completeness

| Event Type | Pre-MAY-019 | Post-MAY-019 |
|------------|------------|--------------|
| `trackDecision` | Wired | Wired |
| `trackReadiness` | Wired | Wired |
| `trackRecommendation` | Wired | Wired |
| `trackIntervention` | **Not wired** | **Wired** |
| `trackMode` | **Not wired** | **Wired** (orchestrator + router) |
| Persistence | None | `localStorage` |

### 1.4 Regression Verification

| Check | Result |
|-------|--------|
| Preflight | PASS — 0 divergences, 2,451 certified |
| Smoke | **17/17 PASS** — all UI surfaces verified |
| Governance guard | **54/54 PASS** |
| May orchestrator load | PASS — all 8 dependencies present |
| Zero page errors | PASS |

### 1.5 Learner Safety

| Dimension | Status |
|-----------|--------|
| No content modification | PASS — pipeline reads only |
| No answer-key exposure | PASS — CorrectChoice used for coaching context only |
| No autonomous actions | PASS — all decisions advisory |
| Deterministic behavior | PASS — same profile → same decision |
| LLM disabled | PASS — all 5 LLM flags = false |
| Rollback capability | PASS — single script tag, tested |

---

## 2. Risk Assessment

### 2.1 Active Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Real learner profiles expose untested edge cases | Medium | Possible | Monitor early rollout closely; telemetry persistence enables post-hoc analysis |
| QUIZ mode overload (remediation + challenge share mode) | Low | Likely | CAL-04 differentiation deferred to MAY-020+ |
| Telemetry storage exceeds localStorage quota | Low | Unlikely | Snapshot replaces key (don't append); bounded by 500-event buffer |
| Intervention/decision topic misalignment | Low | Known | MAY-018 identified D4/D8 topic-less decisions; advisory only |

### 2.2 Mitigated Risks (Resolved by MAY-019)

| Risk | Status |
|------|--------|
| D10 dead path (cosmetic) | Resolved — CAL-01 |
| D7 reaches EXPLAIN (fragile knowledge gets QUIZ) | Resolved — CAL-02 |
| Telemetry data loss on reload | Resolved — CAL-07 |
| Intervention telemetry missing | Resolved — CAL-05 |
| Mode telemetry missing | Resolved — CAL-06 |

---

## 3. Activation Scope

### 3.1 What Gets Activated

The `may-pilot-activation.js` script tag (already in `index_updated.html`) activates:

| Flag | Purpose |
|------|---------|
| `tutoringPilotEnabled` | May companion card + coaching UI |
| `ENABLE_CONTEXT_BUILDER` | Full context building |
| `ENABLE_COACHING_ROUTER` | Mode-based routing |
| `ENABLE_ADAPTIVE_COACHING` | Learner profile + recommender |
| `ENABLE_READINESS_SCORING` | Readiness engine + interventions |
| `ENABLE_ADAPTIVE_ORCHESTRATION` | Full orchestration pipeline |

### 3.2 What Stays Disabled

| Flag | Status |
|------|--------|
| All LLM flags (5) | **false** |
| `ENABLE_COACHING_MEMORY` | **false** (deferred) |

### 3.3 Learner Experience

- May companion card shows readiness insights
- Coaching panel offers mode-specific guidance (EXPLAIN, QUIZ, SOCRATIC, STUDY_PLAN)
- Post-answer feedback includes adaptive recommendations
- Study plan recommendations based on profile
- All advisory — learner chooses what to follow

---

## 4. Monitoring Recommendations

### 4.1 During Rollout

- Monitor `window.__mayPilot.telemetry()` for decision distribution
- Check `localStorage.getItem('cmaMayPilotTelemetry')` for persisted data
- Watch browser console for degraded component warnings
- Run smoke + preflight between rollout phases

### 4.2 Rollback Triggers

| Trigger | Action |
|---------|--------|
| Preflight divergence > 0 | Immediate rollback |
| Smoke failure | Immediate rollback |
| Browser crash traceable to May layer | Conditional rollback |
| Learner complaint of wrong coaching content | Investigate; rollback if confirmed |

### 4.3 Rollback Procedure

Comment out `<script src="may-pilot-activation.js"></script>` in `index_updated.html`. All flags revert to false. No learner data loss. Instant.

---

## 5. Readiness Score: **97/100**

| Component | Score |
|-----------|-------|
| MAY-018 base | 89 |
| CAL-01 (D10 reachable) | +1 |
| CAL-02 (D7 reachable, EXPLAIN mode) | +1 |
| CAL-05 (trackIntervention wired) | +1 |
| CAL-06 (trackMode wired) | +1 |
| CAL-07 (telemetry persistence) | +1 |
| CAL-03 (Ready band investigated, no change) | +1 |
| Smoke 17/17 maintained | +1 |
| Preflight 0 divergences maintained | +1 |
| **Total** | **97/100** |

---

## 6. Next Session: MAY-020

Recommended for MAY-020:

1. Activate limited real-user rollout (5-10 internal testers)
2. Monitor decision distribution from real-user telemetry
3. Analyze mode usage frequency
4. Compare real-user patterns to synthetic expectations
5. Decide on Phase 3 full activation

---

## 7. What Changes if the Learner Says NO-GO

If the rollout is deferred:
- The calibration fixes (CAL-01 through CAL-07) remain applied — they improve the pipeline regardless
- The controlled pilot (`may-pilot-activation.js`) remains in place for development sessions
- No rollout occurs until explicitly authorized
- Rollback remains one-step

---

*MAY-019A — 2026-07-31*
