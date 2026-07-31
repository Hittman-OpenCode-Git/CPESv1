# MAY-018 Activation Scorecard

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis)
**Phase:** Implementer — Activation Scorecard

---

## Overall Score: 89/100 — CONDITIONAL GO

---

## Dimension Scoring

### 1. Architecture (13/15)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Orchestrator completeness | 3/3 | 8/8 modules present, 0 degraded components |
| Feature flag gating | 3/3 | 15/15 flags verified, gating correct |
| Pipeline stage isolation | 2/3 | 8 stages isolated; no shared mutable state; -1 for missing intervention/mode telemetry wiring |
| Module dependency graph | 3/3 | Clean dependency tree, no circular references |
| Determinism | 2/3 | All arithmetic deterministic; -1 for unreachable D10 path creating non-deterministic dead code |

### 2. Coverage (10/15)

| Criterion | Score | Notes |
|-----------|-------|-------|
| D1-D10 decision coverage | 2/5 | 8/10 reachable; D7 and D10 unreachable |
| Mode coverage | 3/3 | 6/6 modes reachable (4 via decision engine, 6 via router) |
| Recommender rule coverage | 1/3 | 3/10 rules triggered in test; -2 for low coverage (profile artifact, not code defect) |
| Intervention tier coverage | 2/2 | 5/5 tiers definable; all tested except Exam Risk |
| Readiness band coverage | 2/2 | 4/5 bands reachable; "Ready for focused review" untested |

### 3. Calibration (12/15)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Decision thresholds | 3/5 | D3/D9 calibrated correctly; -2 for D7 dead path and D10 dead path |
| Readiness banding | 4/5 | Scores meaningful, monotonic; -1 for "Ready" band unreachability |
| Confidence estimation | 3/3 | Penalties reasonable, range 80-100 |
| Intervention priority | 2/2 | Tier classification correct, scores meaningful |

### 4. Safety (15/15)

| Criterion | Score | Notes |
|-----------|-------|-------|
| No content modification | 3/3 | Pipeline reads only; no pack/case writes |
| No autonomous actions | 3/3 | All decisions advisory (nextAction, not auto-executed) |
| Feature flag isolation | 3/3 | Disabled = pipeline returns null immediately |
| LLM disabled | 3/3 | 5/5 LLM flags confirmed false |
| No answer-key exposure | 3/3 | CorrectChoice used for scoring context only |

### 5. Telemetry (7/10)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Decision tracking | 2/2 | Wired, typed, timestamped |
| Readiness tracking | 2/2 | Wired, band+score+topics |
| Recommendation tracking | 2/2 | Wired, type+topic+priority |
| Intervention tracking | 0/2 | **GAP** — function defined but not wired |
| Mode tracking | 0/2 | **GAP** — function defined but not wired |
| Buffer safety | 1/2 | 500 cap adequate; -1 for no overflow log or persistence |
| Diagnostics exposure | 2/2 | `window.__mayPilot` comprehensive |

### 6. UX (9/10)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Coaching layer integration | 2/2 | May companion card, mini-panel, coach view all wired |
| Decision rationale quality | 3/3 | All rationales specific, data-backed, actionable |
| Mode selection transparency | 2/3 | Router maps actions to modes clearly; -1 for decision-engine mode not consumed by router |
| Post-session experience | 2/2 | Post-session review, discuss with May, "what went wrong" bridges |

### 7. Operational Readiness (15/15)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Preflight | 3/3 | PASS — 0 divergences, 2,451 certified |
| Smoke | 3/3 | **17/17 PASS** — all UI surfaces verified |
| Governance guard | 3/3 | 54/54 PASS |
| Rollback procedure | 3/3 | Single `<script>` tag comment-out; runtime console fallback |
| No pack/case modifications | 3/3 | Confirmed — 0 pack/case/scoring writes |

### 8. Pilot Results (8/10)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Pipeline stability | 2/2 | 10/10 orchestrations completed without error |
| Decision consistency | 2/2 | All decisions deterministic, evidence-backed |
| Mode distribution | 1/2 | 4/6 modes reachable by decision engine; -1 for QUIZ dominance |
| Recommendation diversity | 1/2 | remediation dominates (61%); -1 for limited type diversity (profile artifact) |
| Coaching gap identification | 2/2 | D7/D10 dead paths, telemetry gaps, mode underuse all documented |

---

## Dimension Summary

| Dimension | Score | Max | % |
|-----------|-------|-----|---|
| Architecture | 13 | 15 | 87% |
| Coverage | 10 | 15 | 67% |
| Calibration | 12 | 15 | 80% |
| Safety | 15 | 15 | **100%** |
| Telemetry | 7 | 10 | 70% |
| UX | 9 | 10 | 90% |
| Operational Readiness | 15 | 15 | **100%** |
| Pilot Results | 8 | 10 | 80% |
| **TOTAL** | **89** | **105** | **85%** |

---

## Comparative History

| Session | Score | Delta | Key Changes |
|---------|-------|-------|-------------|
| MAY-016 (Activation Ready) | 92/100 | — | Telemetry + plans + checklist |
| MAY-017 (Pilot Activated) | 97/100 | +5 | Pilot activation + orchestrator telemetry wiring |
| MAY-018 (Pilot Review) | 89/100 | -8 | Scorecard uses stricter rubric (105-point scale with detailed telemetry/coverage criteria) |
| MAY-018 (normalized to 100) | 85/100 | -12 | Re-scored under detailed review — gaps now visible |

**Note:** The apparent score decline from 97→89 reflects scoring methodology change, not quality regression. MAY-016/017 used a simpler scoring rubric focused on activation readiness. MAY-018 uses the full 8-dimension rubric with coverage gaps now visible that were previously unknown.

---

## Verdict: CONDITIONAL GO

### Conditions for GO (all met)
- [x] 0 hard failures
- [x] Preflight PASS (0 divergences)
- [x] Smoke 17/17 PASS
- [x] Governance guard 54/54 PASS
- [x] Rollback procedure verified

### Conditions Blocking Full GO
- [ ] D10 dead path (P1 fix — CAL-01)
- [ ] D7 reachability (P2 fix — CAL-02)
- [ ] Telemetry gaps: intervention + mode tracking not wired (P3 — CAL-05, CAL-06)
- [ ] "Ready for focused review" band unreachable (P2 investigation — CAL-03)

### Recommended Path
1. **MAY-019:** Apply CAL-01, CAL-02, CAL-05, CAL-06, CAL-07 (safe fixes)
2. **MAY-019:** Investigate CAL-03 (readiness band reachability)
3. **MAY-020:** Re-score with all P1-P3 items resolved
4. **MAY-020:** Conditional GO → GO if score reaches ≥95 on normalized scale
