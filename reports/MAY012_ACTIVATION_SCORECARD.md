# MAY-012A — Activation Scorecard

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Stretch Goal

---

## May Adaptive Coaching — Production Readiness Assessment

### Overall Readiness: **82/100 — Release-Candidate Ready**

May has advanced from pilot-validated (MAY-011) to calibrated (MAY-012). All core systems are deterministically functional, governance-clean, and feature-flagged behind defaults-false. Remaining gaps are calibration refinements (scoring, decision reachability), not structural defects.

---

## 1. Architecture (Score: 95/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Module loading | 100 | 28/28 modules load reliably in Node.js sandbox and browser |
| Pipeline composition | 100 | 8-stage orchestrator chains all subsystems without error |
| Feature flags | 100 | 15 flags, all defaults-false. Rollback verified. |
| Determinism | 100 | 3-run identical outputs confirmed in MAY-011 and MAY-012 |
| Graceful degradation | 80 | Pipeline reports degradedComponents per stage. However, profile=null at Stage 1 aborts entire pipeline. |
| Memory isolation | 90 | Session-scoped memory; static state produces high dedup (67% in sandbox). |

**Assessment:** Production-grade architecture. The pipeline is composable, observable, and fail-safe. Feature flags provide clean activation/rollback.

---

## 2. Integration (Score: 85/100)

| Factor | Score | Notes |
|--------|-------|-------|
| MayLearnerState integration | 95 | Reads from localStorage; cross-session persistence works |
| Coaching router integration | 90 | `handleAction()` wired to `MayCoachingRouter.enrichContext()`. Mode handlers gated behind flags. |
| UI integration | 80 | `may-core.js` renders mini-panel, launcher, companion card. Mode handlers not yet modifying learner-facing UI responses. |
| Dashboard integration | 75 | `may-dashboard-model.js` generates analytics data but not yet rendered in app UI. |

**Assessment:** Backend integration is solid. Frontend integration of coaching-mode responses and dashboard is the activation surface for MAY-013.

---

## 3. Reliability (Score: 90/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Error handling | 90 | All pipeline stages wrapped in try/catch; degradedComponents tracking |
| Null safety | 85 | Orchestrator returns null when disabled. profile=null aborts with structured error. Missing null guards on decision engine accessors. |
| State corruption risk | 100 | No mutable shared state. localStorage isolated to `cmaMayLearnerState` key. |
| Crash resilience | 85 | `may-core.js` null-guards added in MAY-011. Decision engine handles missing parameters. |

**Assessment:** Reliable. The pipeline is defensive but some edge cases (empty topic arrays, missing masteryLevels) may produce unexpected recommendations rather than empty arrays — these are pedagogical-level issues, not crashes.

---

## 4. Calibration (Score: 65/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Readiness scoring accuracy | 60 | L2 improved from 55→62 but still below 68 parity target. Conservative section roll-up limits high-performer scoring. |
| Decision priority correctness | 85 | D1-D10 priority ordering is coherent. D2 dominance is design-correct but constrains mode diversity. |
| Recommendation relevance | 95 | Topic-matching is 100%; type-matching is >80%. Challenge suppression improved (R3). |
| Band→score alignment | 50 | Developing band (52) with 40% accuracy component produces 62-67 for 85%+ accuracy learners. Target was 68+. Section roll-up is the bottleneck. |
| Mode diversity | 65 | 3 of 6 modes reachable. SOCRATIC (D3), MOTIVATE, EXAM_REVIEW not reachable through decision engine. |

**Assessment:** Calibration improved but not yet at target. The band→score pipeline needs section-roll-up tuning (`getSectionReadinessSummary()`) to unlock the remaining high-performer accuracy.

---

## 5. Safety (Score: 90/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Production isolation | 100 | All flags defaults-false. `orchestrate()` returns null without explicit enablement. |
| No LLM activation | 100 | LLM flags independent and also defaults-false. Verified in MAY-011 safety audit. |
| No content modification | 100 | MAY pipeline operates on coaching analytics only. Zero pack/case/answer-key changes across all 12 May sessions. |
| Learner-facing safety | 70 | Decision engine produces explainable `decisionRationale`. But scoring labels (band) may confuse high-performers (87% accuracy → "Developing" band). |
| Network isolation | 100 | `fetch` never called. All computation is local and deterministic. |

**Assessment:** Safe for feature-flagged activation. The band-label mismatch for high performers (87% → "Developing") is a UX concern, not a safety concern.

---

## 6. Activation Readiness (Score: 70/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Staged activation path | 100 | 4-stage flag activation (ADAPTIVE_COACHING → READINESS_SCORING → ADAPTIVE_ORCHESTRATION → COACHING_MEMORY) verified in MAY-011. |
| Rollback path | 100 | Single flag flip (`setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false)`) disables entire pipeline. |
| Monitoring surface | 60 | Console logging only. No structured telemetry in production path. Dashboard model exists but not rendered. |
| Opt-in mechanism | 80 | `CMA_MAY_PILOT=1` env-var gating in `may-feature-flags.js`. |
| Documentation | 60 | 12 session reports. Behavioral spec at `docs/may_tutoring_behavior_spec_S106.md`. No user-facing May documentation. |

**Assessment:** Ready for limited opt-in (1-3 users with `CMA_MAY_PILOT=1`). Production rollout requires structured telemetry and dashboard rendering.

---

## Overall Assessment

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Architecture | 95 | 25% | 23.75 |
| Integration | 85 | 15% | 12.75 |
| Reliability | 90 | 20% | 18.00 |
| Calibration | 65 | 20% | 13.00 |
| Safety | 90 | 15% | 13.50 |
| Activation Readiness | 70 | 5% | 3.50 |

**Total: 84.50 → Rounded: 85/100**

---

## Recommendation

**GO for limited pilot activation (MAY-012 scope) with the following constraints:**

1. `ENABLE_ADAPTIVE_ORCHESTRATION` remains `false` in production defaults
2. Activation gated behind `CMA_MAY_PILOT=1` + explicit flag enablement
3. No LLM flags activated
4. Console-log telemetry for first N sessions
5. Rollback tested before activation

**Deferred to MAY-013:**
- Section-roll-up tuning for readness scoring
- SOCRATIC mode reachability
- Dashboard UI rendering
- Structured telemetry pipeline

**Deferred to MAY-020:**
- LLM integration readiness review

---

*Generated: 2026-07-30 — MAY-012A Activation Scorecard*
