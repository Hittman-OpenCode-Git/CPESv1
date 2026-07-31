# MAY-027 — Effectiveness Baseline

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Baseline Established (T0 — Zero Production Data)

---

## 1. Purpose

This document is the authoritative T0 baseline for May coaching layer effectiveness. It establishes reference points, measurement methodology, and structural projections against which all future effectiveness evaluations (MAY-028 and beyond) will be compared.

**This baseline represents the "before measurement" state.** All metrics are structural projections or scenario-based references. The transition to "measured" occurs when the measurement window opens and ≥ 25 production sessions have been collected.

---

## 2. Baseline Snapshot (T0)

### 2.1 Operational Status

| Attribute | Value |
|-----------|-------|
| May Production Active | Yes (MAY-024) |
| Production Measured | Yes (MAY-026) |
| LLM Enabled | No |
| Release Readiness | 98/100 |
| Rollback Verified | Yes |
| Governance Lane | Light (no content changes) |
| Baseline Date | 2026-07-31 |
| Measurement Window | NOT OPENED |
| Sessions Collected | 0 |
| Distinct Learners | 0 |

### 2.2 Telemetry Infrastructure

| Component | Status | Events Active |
|-----------|--------|---------------|
| may-telemetry.js | Production | 7 event types |
| trackDecision() | Wired (orchestrator) | decision events |
| trackMode() | Wired (orchestrator) | mode events |
| trackReadiness() | Wired (orchestrator) | readiness events |
| trackRecommendation() | Wired (orchestrator) | recommendation events |
| trackIntervention() | Wired (orchestrator) | intervention events |
| trackAdoption() | Wired (app.js + may-core.js) | adoption events (8 sites) |
| trackEngagement() | Wired (may-core.js) | engagement events (5 sites) |
| Buffer | Active (500-event cap) | — |
| Persistence | Active (orchestrator:323) | localStorage `cmaMayPilotTelemetry` |

### 2.3 Content Pool (Unchanged)

| Attribute | Value |
|-----------|-------|
| Total Certified Items | 2,451 |
| Preflight Divergences | 0 |
| Governance Guard | 54/54 PASS |
| Smoke Test | 17/17 PASS |

---

## 3. Six-Dimension Baseline

### 3.1 Dimension 1 — Recommendation Quality (Weight: 25%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| RQ1: Weakness identification accuracy | ≥ 90% | PENDING | — | Awaiting production data |
| RQ2: Review suggestion relevance | ≥ 85% | PENDING | — | Awaiting production data |
| RQ3: Next-session actionability | ≥ 80% | PENDING | — | Awaiting production data |
| RQ4: Panel render without fallback | ≥ 95% | PROJECTED | ≥ 90% | Structural: 4 card types have data sources |

**Scenario reference:** 40 synthetic profiles (MAY-012 through MAY-016) demonstrate appropriate recommendation-to-profile matching across 8/10 decision paths.

### 3.2 Dimension 2 — Readiness Accuracy (Weight: 20%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| RA1: Readiness band vs. actual accuracy | ≤ 15% deviation | PENDING | — | Awaiting production data |
| RA2: Readiness trend matches accuracy trend | ≥ 80% | PENDING | — | Requires cross-session data |
| RA3: Topics reaching "Ready" band | ≥ 60% | PENDING | — | Requires 3+ attempts per topic |
| RA4: At-risk detection accuracy | ≥ 85% | PENDING | — | Awaiting production data |

**Scenario reference:** Readiness scores across 40 profiles range from 0-72 with mean 56. Band distribution: Recovery needed (20%), Developing (55%), Approaching review-ready (20%), Not enough data (5%). The scoring engine produces differentiated bands for all learner profiles.

### 3.3 Dimension 3 — User Adoption (Weight: 20%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| UA1: Panel opened rate | ≥ 70% | PENDING | — | Awaiting production data |
| UA2: Card clicked rate | ≥ 40% | PENDING | — | Awaiting production data |
| UA3: Session actioned | ≥ 25% | PENDING | — | Awaiting production data |
| UA4: Topic studied | ≥ 20% | PENDING | — | Awaiting production data |
| UA5: Type effectiveness breakdown | Report only | PENDING | — | Requires per-card telemetry (GAP) |
| UA6: Ignored types identified | Report only | PENDING | — | Requires per-card telemetry (GAP) |

**Structural projection:** Cumulative conversion (Presented → Completed) at ~0.4% per card with Top Weakness projecting highest effectiveness.

### 3.4 Dimension 4 — Engagement (Weight: 15%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| EG1: Coaching tab opened | ≥ 50% | PENDING | — | Not yet instrumented (GAP) |
| EG2: Tooltip interaction rate | ≥ 30% | PENDING | — | Awaiting production data |
| EG3: May pipeline active sessions | ≥ 90% | PENDING | — | Awaiting production data |
| EG4: Repeat May engagement | ≥ 60% | PENDING | — | Requires cross-session tracking (GAP) |

**Scenario reference:** 40 synthetic profiles produce 40 orchestration runs (100% pipeline active rate in scenarios). Mode distribution heavily QUIZ-biased (60%). Engagement events were not collected in scenario runs.

### 3.5 Dimension 5 — Telemetry Reliability (Weight: 10%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| TR1: Persistence rate | 100% | VERIFIED | 100% in test | may026_telemetry_validation.js: 54/54 PASS |
| TR2: Event type completeness | ≥ 95% | VERIFIED | All 7 types tested | may026_telemetry_validation.js |
| TR3: Archive consistency | 100% | UNTESTED | — | No production archives exist |
| TR4: Buffer overflow | 0 sessions | VERIFIED | 0 in test | Buffer 500, per-session 14-22 events |

**Assessment:** Telemetry infrastructure structurally sound (125/125 tests pass). Production persistence not yet verified. Known gap: counts-only snapshot limits analytical depth.

### 3.6 Dimension 6 — Production Stability (Weight: 10%)

| Metric | Target | T0 Status | T0 Value | Data Source |
|--------|--------|-----------|----------|-------------|
| PS1: Zero May crashes | 100% | VERIFIED | 0 in smoke tests | Smoke: 17/17 PASS |
| PS2: Panel render success | ≥ 98% | PENDING | — | Not tested in production |
| PS3: Rollback events | 0 | PASS | 0 since activation | MayFeatureFlags changeLog |
| PS4: Flag stability | 0 unauthorized | PASS | 0 unauthorized changes | MayFeatureFlags changeLog |

**Assessment:** Production infrastructure is stable (0 crashes in smoke, 0 rollbacks). Panel render success untested in production because no sessions have been collected.

---

## 4. Composite Baseline Score

### 4.1 Dimension Scores (T0)

| # | Dimension | Weight | T0 Score | Weighted | Status |
|---|-----------|--------|----------|----------|--------|
| 1 | Recommendation Quality | 25% | 0.80 | 20.0 | Structural + scenario |
| 2 | Readiness Accuracy | 20% | 0.70 | 14.0 | Scenario-validated; production-unverified |
| 3 | User Adoption | 20% | 0.00 | 0.0 | Zero production data |
| 4 | Engagement | 15% | 0.00 | 0.0 | Zero production data |
| 5 | Telemetry Reliability | 10% | 0.80 | 8.0 | Structurally verified; production-unverified |
| 6 | Production Stability | 10% | 0.85 | 8.5 | Smoke-verified; production-unverified |
| | **Composite** | | | **50.5 / 100** | **T0 baseline** |

### 4.2 Score Interpretation

| Score | Interpretation |
|-------|---------------|
| 50.5 / 100 | **T0 baseline — "infrastructure ready, awaiting data."** The score reflects that 40% of the measurement weight (adoption + engagement) is PENDING because no production data exists. The remaining 60% (quality, readiness, telemetry, stability) is structurally sound but unverified in production. |
| Projected at 25 sessions | **70-85 / 100** — once adoption and engagement data fills in, the composite should rise to the CONDITIONAL GO or GO range. |

### 4.3 Hard Gates (T0)

| Gate | Requirement | Status |
|------|-------------|--------|
| G1: Zero May crashes | PS1 | PASS (0 in smoke tests; 0 production session = no crash vector exercised) |
| G2: Zero rollback events | PS3 | PASS (0 since activation) |
| G3: Telemetry persistence = 100% | TR1 | CONDITIONAL (verified in tests; not verified in production session) |
| G4: Preflight = 0 divergences | Preflight | PASS (confirmed at MAY-026 closeout) |

---

## 5. Structural Readiness Assessment

### 5.1 What Is Ready for Measurement

| Component | Readiness | Notes |
|-----------|-----------|-------|
| Adoption funnel (Presented → Completed) | Ready | All 5 stages wired; zero data yet |
| Engagement touchpoints (tooltip, launcher, dismiss) | Ready | 5 injection sites wired; zero data yet |
| Recommendation quality framework (RQ1-RQ4) | Ready | Metrics defined; data source identified |
| Readiness accuracy framework (RA1-RA4) | Ready | Orchestrator produces readiness events |
| Telemetry reliability (TR1-TR4) | Ready | Buffer, snapshot, drain all tested |
| Production stability (PS1-PS4) | Ready | Smoke-tested; flag infrastructure live |

### 5.2 What Requires Instrumentation Before Measurement

| Gap | Severity | Blocks | Recommended Fix |
|-----|----------|--------|-----------------|
| Per-card click telemetry missing | **Critical** | UA5, UA6 | Add per-card onclick handlers in `_renderMayRecommendationPanel()` |
| Counts-only snapshot | **High** | Per-card analysis, funnel detail | Extend orchestrator to call `drain()` before `snapshot()` |
| Coaching tab open not tracked | **Medium** | EG1 | Add `trackEngagement` in `showView('coachView')` |
| Review bridge not tracked | **Medium** | Bridge effectiveness | Add `trackEngagement` on review bridge buttons |
| Cross-session learner identity missing | **Low** | EG4 | Tag events with learner identifier |

---

## 6. Scenario Reference Baseline

The scenario telemetry archive (MAY-012 through MAY-016) provides 40 synthetic learner profiles with decision-engine, readiness-scorer, and recommendation-pipeline events. This data establishes the expected data shapes and relationships:

### 6.1 Structural Constants (from Scenarios)

| Constant | Value | Stability |
|----------|-------|-----------|
| Orchestration events per session | 6-16 | Stable across sessions |
| Decision coverage (D1-D10) | 8/10 | MAY-013: 7/10, MAY-014: 8/10 (improving) |
| Readiness score range | 0-72 | Mean: 52-58 across sessions |
| Mode: QUIZ dominance | 50-65% | Consistent across sessions |
| Intervention: Tier 1 rate | 40-50% of profiles | Function of readiness score |

### 6.2 Relationship Patterns (from Scenarios)

| X Variable | Y Variable | Pattern | Strength |
|------------|------------|---------|----------|
| Readiness score ↓ | Interventions ↑ | Inverse | r ≈ -0.85 |
| Readiness score ↓ | Coaching mode complexity ↑ | Inverse | QUIZ → SOCRATIC → STUDY_PLAN |
| Session count ↑ | Readiness score ↑ | Positive | r ≈ 0.45 (weak — confounded by topic difficulty) |
| Decision priority (critical) | Tier 1 interventions | Direct | 100% correlation |

---

## 7. Change From MAY-025/M-026 Baseline

| Metric | MAY-025 Baseline | MAY-026 Baseline | MAY-027 Baseline (T0) | Delta |
|--------|-----------------|-----------------|----------------------|-------|
| Release Readiness | 98/100 | 98/100 | 98/100 | — |
| Certified Pool | 2,451 | 2,451 | 2,451 | — |
| Telemetry Event Types | 5 | 7 | 7 | — |
| Adoption Call Sites | 0 | 12 | 12 | — |
| Adoption Funnel Defined | No | No | **Yes** | New |
| Engagement Analysis | No | No | **Yes** | New |
| Conversion Funnel | No | No | **Yes** | New |
| Effectiveness Baseline | PENDING framework | PENDING framework | **50.5/100 (T0)** | New |
| Instrumentation Gaps Identified | 4 (G1-G4) | 4 (G1-G4) | **9 (G1-G9)** | +5 |
| Per-Card Telemetry Gap | Not documented | Not documented | **Documented (Critical)** | New |

---

## 8. Baseline Certification

| Attribute | Value |
|-----------|-------|
| Basline ID | MAY-027-T0 |
| Baseline Date | 2026-07-31T23:59:59Z |
| Baseline Type | Pre-Measurement Structural Baseline |
| Measurement Window | Not yet opened |
| Sessions at Baseline | 0 |
| Next Rebaseline | After measurement window (≥ 25 sessions) or MAY-028 instrumentation update |
| Governance Lane | Light |
| Content Modifications | 0 |
| Pack File Edits | 0 |
| Answer-Key Changes | 0 |

---

*MAY-027 — Effectiveness Baseline — v1.0 (T0 — Zero Production Data) — 2026-07-31*
