# MAY-019 Calibration Plan

**Session:** MAY-019 — Pilot Calibration & Rollout Readiness
**Date:** 2026-07-31
**Governance Lane:** Light (UI/coaching layer — no pack/case/content impact)
**Phase:** Planner — Calibration

---

## 1. Objective

Execute the targeted calibration fixes identified in MAY-018. Apply safe, low-risk changes to the decision engine, telemetry wiring, and readiness scoring. No new features. No speculative tuning. All changes are try/catch-wrapped, non-blocking, and revertible via the existing rollback mechanism.

---

## 2. Calibration Items — Execution Plan

### 2.1 Priority 1 — Blocking for Full GO

#### CAL-01: Fix D10 Dead Path (D8 Shadowing)

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-decision-engine.js` — `_ruleSectionGap()` |
| **Current behavior** | D8 triggers on `dataSections < 4`. For zero-data profiles (dataSections=0), D8 fires before D10. |
| **Root cause** | D8's guard `dataSections < 4` includes 0, making D10 unreachable. |
| **Proposed fix** | Add `dataSections > 0` to D8: change `if (dataSections < 4)` to `if (dataSections < 4 && dataSections > 0)` |
| **Impact** | D10 becomes reachable for zero-data profiles. D8 continues to handle 1-3 section profiles. |
| **Risk** | None — D8's action for zero-section profiles (EXPLAIN, exploratory) is functionally identical to D10's action (EXPLAIN, exploratory). Only decisionId and rationale differ. |
| **Lines changed** | 1 (line 255) |
| **Verification** | Zero-session profile L10 should trigger D10 (not D8) after fix. |

#### CAL-02: Fix D7 Reachability (D5 Capture)

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-decision-engine.js` — `decide()` function priority chain |
| **Current behavior** | D5 triggers on any topic in `profile.decliningTopics`. D7-suitable topics (fragile knowledge, Tier 3 intervention) also appear in `decliningTopics`, causing D5 to capture them before D7. |
| **Root cause** | Priority order D5 → D6 → D7. D5's broad `decliningTopics` gate captures topics that should route to D7's fragile-knowledge path. |
| **Proposed fix** | Move D7's evaluation before D5 in the `decide()` priority chain. New order: D1 → D2 → D3 → D4 → **D7** → D5 → D6 → D8 → D9 → D10 |
| **Rationale** | Fragile knowledge (Tier 3, EXPLAIN) is a more specific pedagogical pattern than general declining trend (D5, QUIZ). Specificity should win in priority ordering. |
| **Impact** | D7 profiles get EXPLAIN mode (correct). D5 profiles (declining but not Tier 3) still get QUIZ. |
| **Lines changed** | ~6 (move D7 block before D5 block in `decide()`) |
| **Verification** | Fragile Knowledge synthetic profile (L7) should trigger D7 (EXPLAIN) instead of D5 (QUIZ). |

---

### 2.2 Priority 2 — Investigation Only

#### CAL-03: Investigate "Ready for Focused Review" Band Reachability

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-readiness-engine.js` — `_computeCompositeScore()` |
| **Current behavior** | No synthetic profile reached Ready band (95). Highest was 72. |
| **Root cause analysis** | The composite formula (50% band score + 50% accuracy) with Approaching band (72) creates a structural ceiling. Even at 100% accuracy: 0.5×72 + 0.5×100 = 86. +5 bonus = 91 — still below 95. |
| **Investigation** | Determine whether a high-mastery profile (6 sections, all ≥85% accuracy) can reach ≥88. If not, recalibrate threshold. |
| **Decision criteria** | Lower Ready threshold from 95 to 88 if evidence supports it. Avoid speculative tuning — make change only if Formula Audit confirms unreachability. |
| **Risk** | Medium — readiness scoring change affects all tier calculations. Requires full re-verification. |

---

### 2.3 Priority 3 — Safe Wiring (Non-Blocking)

#### CAL-05: Wire trackIntervention Telemetry

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-coaching-orchestrator.js` — `orchestrate()` |
| **Current state** | `MayTelemetry.trackIntervention()` defined but never called. |
| **Proposed fix** | Insert after Stage 5 (interventions) return, inside existing telemetry try/catch block. Log top 3 interventions. |
| **Lines added** | ~8 |
| **Risk** | None — try/catch wrapped, non-blocking. |

#### CAL-06: Wire trackMode Telemetry

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-coaching-orchestrator.js` — `orchestrate()` + `may-coaching-router.js` — `dispatchToHandler()` |
| **Current state** | `MayTelemetry.trackMode()` defined but never called. |
| **Proposed fix (orchestrator)** | After decision telemetry in `orchestrate()`, log `decision.coachingMode`. |
| **Proposed fix (router)** | In `dispatchToHandler()`, log the routed mode. |
| **Lines added** | ~3 (orchestrator) + ~5 (router) |
| **Risk** | None — try/catch wrapped, non-blocking. |

#### CAL-07: Telemetry Persistence

| Attribute | Detail |
|-----------|--------|
| **Module** | `may-pilot-activation.js` — session completion hook |
| **Current state** | Telemetry buffer is in-memory only (500 events). Lost on page reload. |
| **Proposed fix** | Persist telemetry snapshot to `localStorage` key `cmaMayPilotTelemetry` on app.js session completion (via `window` event listener or periodic sync). |
| **Lines added** | ~5 |
| **Risk** | Low — localStorage write, same pattern as learner state persistence. |

---

## 3. Items NOT in Scope (Deferred)

| ID | Reason |
|----|--------|
| CAL-04 (QUIZ sub-types) | Requires mode contract changes — deferred to MAY-020+ |
| CAL-08 (Band gap evaluation) | Requires real-user data — post-pilot |
| CAL-09 (Confidence penalties) | Requires real-user data — post-pilot |
| CAL-10 (D2+D4 secondary test) | Test coverage addition — deferred to MAY-020 |

---

## 4. Execution Order

| Wave | Items | Type | Risk | Duration |
|------|-------|------|------|----------|
| Wave 1 | CAL-05, CAL-06, CAL-07 | Telemetry wiring | None | ~10 min |
| Wave 2 | CAL-01, CAL-02 | Decision engine fixes | Low | ~10 min |
| Wave 3 | CAL-03 | Readiness investigation | Medium | ~20 min |
| Wave 4 | Validation + Verification | Regression | None | ~15 min |

---

## 5. Success Criteria

- [ ] CAL-01 applied — D10 reachable
- [ ] CAL-02 applied — D7 reachable (EXPLAIN mode)
- [ ] CAL-03 investigated — disposition written
- [ ] CAL-05 applied — trackIntervention wired
- [ ] CAL-06 applied — trackMode wired (orchestrator + router)
- [ ] CAL-07 applied — telemetry persisted to localStorage
- [ ] 0 governance violations introduced
- [ ] Preflight 0 divergences maintained
- [ ] Smoke 17/17 maintained
- [ ] Release readiness re-scored
