# MAY-018 Production Readiness Review

**Session:** MAY-018 — Pilot Telemetry Review & Calibration (Stretch: MAY-018A)
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis)

---

## Verdict: CONDITIONAL GO

A limited real-user adaptive-coaching rollout is recommended pending resolution of 4 calibration items (CAL-01 through CAL-04).

---

## 1. Evidence Summary

### 1.1 Architecture Integrity — PASS
- 8/8 orchestrator modules present, 0 degraded components
- 15/15 feature flags correctly gated
- All LLM providers disabled (5/5 false)
- Feature isolation verified: disabled → pipeline returns null
- Rollback: single `<script>` tag comment-out, runtime console fallback

### 1.2 Decision Engine — PASS WITH NOTES
- 8/10 decisions reachable (D7, D10 unreachable)
- All triggered decisions produce evidence-backed, specific rationales
- D3, D9 calibrations validated (MAY-014)
- Priority distribution balanced (critical 20%, high 20%, medium 30%, low 30%)
- **Note:** D10 dead path (shadowed by D8) — non-blocking, cosmetic

### 1.3 Readiness Scoring — PASS
- Score range 0-72 across 10 profiles (meaningful spread)
- 4/5 bands reachable ("Ready for focused review" untested)
- Confidence calibrated (80-100 range)
- Monotonicity preserved (floor guard active)
- **Note:** Top-end compression — 87% accuracy scores only 72

### 1.4 Coaching Quality — PASS
- Mode diversity: 4/6 reachable by decision engine, 6/6 via router
- Recommendation types: 3/5 observed (remediation, review, challenge)
- All decision rationales specific and actionable
- Pipeline stages internally consistent (no contradictory signals)
- **Note:** QUIZ mode dominance (50%) — may reflect profile mix

### 1.5 Telemetry — CONDITIONAL PASS
- Decision, readiness, recommendation tracking: wired
- Intervention, mode tracking: functions defined, not wired
- Diagnostics object (`window.__mayPilot`) comprehensive
- Buffer safety: 500 events, adequate for pilot scope
- **Note:** No persistent telemetry — lost on page reload

### 1.6 Operational Readiness — PASS
- Preflight: 0 divergences, 2,451 certified
- Smoke: 17/17 PASS
- Governance guard: 54/54 PASS
- Rollback: validated, tested
- No pack/case/scoring modifications

### 1.7 Learner Safety — PASS
- Pipeline reads only; no content writes
- All decisions are advisory (nextAction, not auto-executed)
- Feature flag gating prevents unauthorized activation
- LLM providers confirmed disabled (5/5)
- Answer keys used for coaching context only (read-only)

---

## 2. Risk Assessment

### 2.1 Activation Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| D7 routing learners to QUIZ instead of EXPLAIN | Low | Certain | Fix CAL-02 before broader rollout |
| D10 unreachable (cosmetic) | Low | Certain | Fix CAL-01 before broader rollout |
| "Ready" band unreachable → top performers not recognized | Low | Likely | Investigate CAL-03 |
| Telemetry data loss on page reload | Medium | Certain | Implement CAL-07 persistence |
| QUIZ mode overload (remediation + challenge) | Low | Possible | CAL-04 differentiation deferred |
| Real learner profiles expose untested edge cases | Medium | Possible | Monitor early rollout closely |

### 2.2 Rollback Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Rollback fails to restore previous state | Low | Single `<script>` tag — simple, tested |
| Learner state corruption during rollback | Low | State is in localStorage, unaffected by flag changes |
| Partial rollback (some flags revert, others don't) | Low | `may-pilot-activation.js` sets all flags atomically |

---

## 3. Activation Strategy Recommendation

### Phase 1 — Pre-Activation Fixes (MAY-019)
Apply 4 safe, low-risk calibration fixes before any rollout:

1. **CAL-01:** D8 guard → D10 reachable (1 line change)
2. **CAL-02:** Reorder D7 before D5 (move 4 lines)
3. **CAL-05:** Wire trackIntervention (6 lines, try/catch)
4. **CAL-06:** Wire trackMode (4 lines, try/catch)
5. **CAL-07:** Telemetry persistence (3 lines, localStorage)

**Estimated effort:** 30 minutes. All changes are try/catch-wrapped, non-blocking.

### Phase 2 — Controlled Real-User Rollout (MAY-020)
- Keep `may-pilot-activation.js` as the activation gate
- Add telemetry persistence for post-hoc analysis
- Monitor for 1-2 weeks
- Target: 10-20 real learner sessions
- Success metric: ≥90% of orchestrator calls produce valid decisions

### Phase 3 — Full Activation Decision (MAY-021+)
Based on real-user evidence:
- If real-user decision distribution matches synthetic expectations → GO
- If unexpected decision patterns emerge → recalibrate first
- If crash/degradation observed → NO-GO until fixed

---

## 4. GO / CONDITIONAL GO / NO-GO

### GO — Recommended
**Not yet.** Pre-activation fixes (CAL-01 through CAL-07) should be applied first.

### CONDITIONAL GO — Current State
The pilot infrastructure is **sound and safe** for a limited, monitored rollout with the following conditions:

1. **CAL-01 + CAL-02 applied** (decision engine fixes)
2. **CAL-05 + CAL-06 + CAL-07 applied** (telemetry completeness)
3. **Rollback procedure re-verified** after fixes
4. **Smoke + preflight re-run** after fixes
5. **Limited scope:** coaching layer active but no auto-execution of decisions
6. **Monitoring plan:** telemetry persistence enables post-hoc analysis

### NO-GO — Not Applicable
No hard failures detected. Architecture is stable. Safety controls are intact.

---

## 5. What Activation Would Mean

### Activated State
- Adaptive coaching pipeline runs on every `orchestrate()` call
- Decision engine selects coaching mode based on learner profile
- Readiness scores computed and surfaced
- Interventions ranked and prioritized
- Recommendations generated with closed-loop dampening
- All telemetry collected (console + localStorage)
- **No LLM** — all coaching is deterministic

### What Stays Disabled
- LLM coaching (ENABLE_LLM_COACHING = false)
- LLM summaries (ENABLE_LLM_SUMMARIES = false)
- External AI providers (AZURE_OPENAI, OPENAI = false)
- Coaching memory persistence (ENABLE_COACHING_MEMORY = false)

### Learner Experience
- May companion card shows readiness insights
- Coaching panel offers mode-specific guidance
- Post-answer feedback includes adaptive recommendations
- Study plan recommendations based on profile
- All advisory — learner chooses what to follow

---

## 6. Final Recommendation

**CONDITIONAL GO** for limited real-user rollout after MAY-019 pre-activation fixes.

The adaptive coaching pipeline is architecturally sound, educationally coherent, and safety-gated. Four minor calibration items and two telemetry gaps should be resolved before broadening activation. The controlled pilot infrastructure (MAY-017) provides the correct activation and rollback mechanisms. Real-user evidence is now the highest-value next step.

**Next session:** MAY-019 — Apply CAL-01 through CAL-07, re-verify, prepare for rollout.
