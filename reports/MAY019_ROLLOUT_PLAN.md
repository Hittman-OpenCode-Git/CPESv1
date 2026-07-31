# MAY-019 Rollout Plan

**Session:** MAY-019 — Pilot Calibration & Rollout Readiness
**Date:** 2026-07-31
**Governance Lane:** Light (UI/coaching layer — no pack/case/content impact)
**Phase:** Planner — Rollout

---

## 1. Objective

Define the rollout strategy for transitioning from the MAY-017 controlled pilot to MAY-020 limited real-user rollout. The MAY-019 session applies calibration fixes; MAY-020 activates real-user exposure.

---

## 2. Pilot Cohort Definition

### 2.1 Phase 1 — Internal Verification (MAY-019, Current)

| Parameter | Value |
|-----------|-------|
| Cohort size | 0 real users (developer verification only) |
| Activation mechanism | `may-pilot-activation.js` script tag (already in index_updated.html) |
| Feature flags | All 6 adaptive flags = true; all 5 LLM flags = false |
| Monitoring | Preflight + smoke + governance guard |
| Duration | ~1 session (calibration + verification) |

### 2.2 Phase 2 — Limited Real-User Rollout (MAY-020, Proposed)

| Parameter | Value |
|-----------|-------|
| Cohort size | 5-10 internal testers |
| Activation mechanism | `may-pilot-activation.js` script tag (unchanged) |
| Feature flags | Same as Phase 1 |
| Monitoring | Telemetry persistence + manual feedback |
| Duration | 1-2 weeks |
| Success metric | ≥90% orchestrator calls produce valid decisions |

### 2.3 Phase 3 — Full Activation Decision (MAY-021+, Proposed)

Based on Phase 2 evidence:
- Decision distribution analysis from real-user telemetry
- Mode usage frequency from real-user telemetry
- Intervention tier distribution from real-user telemetry
- Crash/degradation rate

---

## 3. Monitoring Approach

### 3.1 Active Monitoring (During Pilot)

| Metric | Source | Frequency | Threshold |
|--------|--------|-----------|-----------|
| Preflight divergence count | `npm run preflight` | Each session | = 0 |
| Smoke test pass rate | `npm run smoke` | Each session | 17/17 |
| Governance guard pass rate | Governance guard test suite | Each session | 54/54 |
| Orchestrator readiness | `window.__mayPilot.orchestratorReady()` | Per session | All 8 deps present |
| Adaptive pipeline validity | `window.__mayPilot.telemetry().byType.decision` | Per session | ≥ 1 decision |

### 3.2 Post-Hoc Monitoring (From Telemetry Persistence)

| Metric | Source | Analysis |
|--------|--------|----------|
| Decision distribution (D1-D10) | `cmaMayPilotTelemetry` → `byType.decision` | Compare to MAY-014 synthetic expectations |
| Mode distribution | `cmaMayPilotTelemetry` → `byType.mode` | Verify EXPLAIN not dead |
| Intervention tiers | `cmaMayPilotTelemetry` → `byType.intervention` | Verify tiers 1-5 reachable |
| Recommendation types | `cmaMayPilotTelemetry` → `byType.recommendation` | Verify type diversity |
| Readiness band distribution | `cmaMayPilotTelemetry` → `byType.readiness` | Verify band spread |

---

## 4. Rollback Triggers

### 4.1 Immediate Rollback (Any One Triggers)

| Trigger | Severity | Detection |
|---------|----------|-----------|
| Preflight divergence > 0 | CRITICAL | `npm run preflight` |
| Smoke test failure | HIGH | `npm run smoke` |
| Governance guard failure | HIGH | Test suite |
| app.js crash traceable to May layer | HIGH | Browser console |
| Learner state corruption | CRITICAL | localStorage inspection |
| Incorrect coaching content (answer-key exposure) | CRITICAL | Manual QA + automated validator |

### 4.2 Conditional Rollback (≥2 Triggers)

| Trigger | Severity |
|---------|----------|
| D7 still unreachable after CAL-02 | Low |
| D10 still unreachable after CAL-01 | Low |
| Telemetry persistence fails silently | Low |
| Readiness band "Ready" still unreachable | Low |
| QUIZ mode > 70% of decisions | Informational |

---

## 5. Rollback Procedure (Unchanged from MAY-017)

### 5.1 Script-Level Rollback (Permanent)
Comment out `<script src="may-pilot-activation.js"></script>` in `index_updated.html`. All flags revert to defaults (false). No learner data loss.

### 5.2 Console Rollback (Temporary)
```javascript
May.config.tutoringPilotEnabled = false;
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', false);
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', false);
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);
```

### 5.3 Rollback Verification
After rollback:
- [ ] `MayFeatureFlags.getAll()` shows all flags = false
- [ ] `MayCoachingOrchestrator.orchestrate()` returns null
- [ ] May companion card no longer shows adaptive coaching
- [ ] Coaching panel reverts to pre-pilot behavior

---

## 6. Success Thresholds for Phase 2 → Phase 3 Transition

| Metric | Threshold | Weight |
|--------|-----------|--------|
| Valid orchestrator calls | ≥ 90% | 25% |
| Decision distribution matches synthetic expectations within ±15% | ≥ 80% alignment | 25% |
| Zero crashes attributed to adaptive pipeline | 0 | 20% |
| Telemetry persistence working (all 5 types captured) | 100% | 15% |
| Learner experience unchanged (no complaints of wrong coaching) | 0 complaints | 15% |

**GO threshold:** ≥ 85 weighted score across all metrics.

---

## 7. Communication Plan

| Audience | Message | Timing |
|----------|---------|--------|
| Internal testers | "May coaching is in pilot — feedback welcome" | At rollout |
| Internal testers | Rollback instructions if issues found | At rollout |
| Development team | Telemetry report from pilot phase | End of pilot |
| Development team | GO / CONDITIONAL GO / NO-GO recommendation | End of pilot |

---

## 8. Timeline

| Milestone | Session | Target Date |
|-----------|---------|------------|
| Calibration fixes applied (CAL-01 through CAL-07) | MAY-019 | 2026-07-31 |
| Validation + verification complete | MAY-019 | 2026-07-31 |
| Limited rollout recommendation published | MAY-019A | 2026-07-31 |
| Real-user rollout begins | MAY-020 | TBD (post-MAY-019) |
| Phase 2 monitoring complete | MAY-020+ | TBD (+1-2 weeks) |
| Phase 3 decision | MAY-021+ | TBD |
