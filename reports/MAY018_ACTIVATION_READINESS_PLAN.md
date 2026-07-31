# MAY-018 Activation Readiness Plan

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis — no pack/case/content impact)
**Phase:** Planner — Readiness

---

## 1. Objective

Define the success metrics, failure metrics, and go/no-go thresholds for broader May coaching activation. Determine whether the controlled pilot (MAY-017) provides sufficient evidence to recommend expanding beyond the current feature-flag-gated scope.

---

## 2. Pilot Success Metrics

### 2.1 Architecture Integrity

| Metric | Target | Source | Current |
|--------|--------|--------|---------|
| Orchestrator readiness | 8/8 modules present | `readinessCheck()` | 8/8 |
| Pipeline completes without error | 100% of calls | `orchestrate()` return | 10/10 (MAY-014) |
| Degraded components | 0 | `_meta.degradedComponents` | 0 |
| Feature flags correctly gated | All 15 flags | `MayFeatureFlags.getAll()` | 15/15 verified |
| LLM providers disabled | 5/5 false | Feature flags | 5/5 confirmed |

### 2.2 Decision Engine Health

| Metric | Target | Source | Current (MAY-014) |
|--------|--------|--------|-------------------|
| D1-D10 coverage | >=9/10 reachable | Decision runner | 8/10 (D7, D10 unreachable) |
| Decision determinism | 100% same-input consistency | Re-run verification | PASS |
| Priority distribution | All 4 levels reachable | Telemetry | 4/4 reachable |
| Mode diversity | >=4 modes reachable | Telemetry | 4/6 reachable |
| No unexpected null decisions | 0 null | Orchestrator output | 0 null |

### 2.3 Readiness Scoring Quality

| Metric | Target | Source | Current (MAY-014) |
|--------|--------|--------|-------------------|
| Score range | 0-100 meaningful spread | Telemetry | 42-72 |
| Band diversity | >=4 bands represented | Telemetry | 4/5 (Ready unreachable) |
| Confidence calibration | >=80 for profiles with >=4 sessions | Engine output | 80-100 range |
| Monotonicity | Higher accuracy → higher score | Cross-profile check | PASS (floor guard) |
| No score ≥98 | Ceiling at 98 | Engine guard | 72 max |

### 2.4 Coaching Quality

| Metric | Target | Source | Current |
|--------|--------|--------|---------|
| Intervention tiers | All 5 tiers classifiable | Prioritizer | 5/5 definable |
| Recommendation types | >=4 types in distribution | Recommender | 3/5 types seen |
| Closed-loop outcomes | Working dedup + dampening | Recommender | Implemented |
| Topic coverage in recommendations | Cross-section | Per-profile analysis | Variable |
| No contradictory coaching | Same topic not rec'd + suppressed | Recommender | R3 guard active |

### 2.5 Telemetry Completeness

| Metric | Target | Source | Current |
|--------|--------|--------|---------|
| Decision telemetry | Wired | Orchestrator | Yes |
| Readiness telemetry | Wired | Orchestrator | Yes |
| Recommendation telemetry | Wired | Orchestrator | Yes |
| Intervention telemetry | Wired | Orchestrator | **No (GAP)** |
| Mode telemetry | Wired | Orchestrator | **No (GAP)** |
| Buffer safety | 500 cap documented | may-telemetry.js | Yes |

### 2.6 Operational Readiness

| Metric | Target | Source | Current |
|--------|--------|--------|---------|
| Preflight | 0 divergences | `npm run preflight` | PASS |
| Smoke | 17/17 PASS | `npm run smoke` | TBD |
| Governance guard | 54/54 PASS | Preflight | PASS |
| Rollback procedure | Valid and tested | `MAY016_ROLLBACK_PLAN.md` | Validated |
| No pack/case modifications | 0 writes | Governance verifier | TBD |

---

## 3. Pilot Failure Metrics

The pilot is considered **failed for activation purposes** if any of the following occur:

### 3.1 Hard Failures (Block Activation)
- [ ] Any crash in `orchestrate()` pipeline path
- [ ] Decision engine returns null for valid profile
- [ ] Readiness engine produces NaN or undefined score
- [ ] Feature flag gate bypassed (coaching runs when disabled)
- [ ] LLM provider flag changes to true (unauthorized AI access)
- [ ] Pack/case/answer-key file modified by coaching layer

### 3.2 Soft Failures (Require Remediation Before Activation)
- [ ] D1-D10 coverage <7/10
- [ ] >2 modes unreachable by any profile
- [ ] Readiness score range <30 points wide
- [ ] Confidence scores below 50 for profiles with >=10 sessions
- [ ] Intervention tier distribution collapses to single tier
- [ ] >50% of recommendations are single type

### 3.3 Warning Signals (Document, Do Not Block)
- [ ] D7 unreachable (fragile knowledge path)
- [ ] D10 dead (shadowed by D8)
- [ ] "Ready for focused review" band unreachable
- [ ] Telemetry gaps (intervention/mode tracking missing)
- [ ] QUIZ mode dominance >50%
- [ ] remediation recommendation dominance >50%

---

## 4. Go / Conditional Go / No-Go Thresholds

### 4.1 GO — Proceed to MAY-019 Broader Activation
**Requires ALL of:**
- [ ] 0 hard failures
- [ ] 0 soft failures
- [ ] Preflight PASS (0 divergences)
- [ ] Smoke 17/17 PASS
- [ ] Governance guard 54/54 PASS
- [ ] Release readiness score >=95/100
- [ ] Rollback procedure verified

### 4.2 CONDITIONAL GO — Proceed With Specific Remediations First
**Applies when:**
- [ ] 0 hard failures
- [ ] 1-2 soft failures, each with documented remediation plan
- [ ] All other GO criteria met
- **Action:** Fix identified soft failures in MAY-019 before expanding activation

### 4.3 NO-GO — Do Not Expand Activation
**Applies when:**
- [ ] Any hard failure present
- [ ] >2 soft failures
- [ ] Preflight or smoke fails
- [ ] Governance guard fails
- [ ] Rollback procedure invalid
- **Action:** Remediate in dedicated fix session, re-assess

---

## 5. Current State Assessment (Pre-Analysis)

### 5.1 Architecture: SOLID
- 8/8 orchestrator dependencies present
- 15/15 feature flags verified
- LLM disabled (5/5 false)
- Rollback: single `<script>` tag comment-out

### 5.2 Decision Engine: MINOR ISSUES
- D7 unreachable (0/10 profiles)
- D10 dead (shadowed by D8)
- 8/10 reachable (below 9/10 target)

### 5.3 Readiness: FUNCTIONAL BUT NARROW
- Score range 42-72 (30-point spread, meets minimum)
- "Ready for focused review" band unreachable
- Confidence calibrated appropriately

### 5.4 Telemetry: INCOMPLETE
- 2 of 5 telemetry types not wired (intervention, mode)
- No persistent export
- Buffer safety adequate

### 5.5 Coaching Quality: ADEQUATE FOR PILOT
- Mode diversity 4/6
- Recommendation diversity 3/5 types
- Intervention tiers all functional

### 5.6 Operational: PASS
- Preflight: 0 divergences
- Governance: 54/54
- Rollback: validated

---

## 6. Preliminary Recommendation

Based on pre-analysis evidence, the pilot is **CONDITIONAL GO** pending:
1. Smoke test verification
2. Detailed decision/recommendation/effectiveness analysis
3. Confirmation of 0 governance violations (pack/case/scoring integrity)
4. Documentation of D7/D10 calibration plan for MAY-019

---

## 7. Output Artifacts

| Artifact | Purpose |
|----------|---------|
| `MAY018_ACTIVATION_SCORECARD.md` | 0-100 scored evaluation across 8 dimensions |
| `MAY018_PRODUCTION_READINESS_REVIEW.md` | GO/CONDITIONAL-GO/NO-GO verdict (stretch) |
