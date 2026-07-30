# MAY-006 — Activation Plan

**Session:** MAY-006 — Adaptive Coaching Orchestrator
**Governance:** Light Lane (coaching layer — no pack/case/content impact)
**Status:** Active
**Date:** 2026-07-30

---

## 1. Purpose

Define the progressive rollout strategy for the MAY-006 Adaptive Coaching Orchestrator, from internal testing through full LLM augmentation. No phase activates without explicit human authorization.

---

## 2. Feature Flags Introduced

| Flag | Default | Phase | Controls |
|------|---------|-------|----------|
| `ENABLE_ADAPTIVE_ORCHESTRATION` | `false` | Phase 2+ | Master switch for entire orchestrator pipeline |
| `ENABLE_COACHING_MEMORY` | `false` | Phase 2+ | Session-scoped coaching memory (stretch) |

---

## 3. Phased Rollout

### Phase 1 — Internal Verification (Current)

**Status:** May be activated by developer for testing only.
**Flags required:** `ENABLE_ADAPTIVE_COACHING=true` + `ENABLE_READINESS_SCORING=true` + `ENABLE_ADAPTIVE_ORCHESTRATION=true` + `ENABLE_COACHING_ROUTER=true`

**Verification activities:**
- All 4 orchestrator modules load without errors
- `orchestrate()` returns a valid coaching package or `null`
- No console errors when flags are off
- Existing coaching behavior unchanged (regression)
- Zero pack/case/registry modifications

**Success criteria:**
- Orchestrator produces valid package with profile + readiness + recommendations + decision
- All flags off → 0 behavior change
- Partial flags on → graceful degradation

### Phase 2 — Limited Feature Flags (Post-Verification)

**Status:** Controlled activation for developer testing with real learner data.
**Flags:** Enable orchestrator + coaching memory flags on a session-by-session basis.

**Activation requirements:**
1. Phase 1 verification complete
2. Smoke test passes (`npm run smoke`)
3. Human authorization

**Testing scope:**
- End-to-end pipeline with real MayLearnerState data
- Decision engine correctness across all 10 decision rules
- Coaching memory session isolation
- Graceful degradation with partial data

### Phase 3 — Adaptive Coaching Activation

**Status:** Full MAY system activated for internal use.
**Flags:** All MAY-001 through MAY-006 flags enabled.

**Activation requirements:**
1. Phase 2 testing complete
2. Decision engine produces accurate recommendations in ≥ 95% of test scenarios
3. Zero regressions on existing coach behavior
4. Human authorization

**Scope:**
- Full adaptive coaching pipeline active
- Decision engine drives coaching mode selection
- Intervention coordinator manages review cadence
- Coaching memory tracks session context

### Phase 4 — LLM Augmentation (Future)

**Status:** Integration point reserved, not implemented.
**Flags:** `ENABLE_LLM=true` + `ENABLE_LLM_COACHING=true`

**Scope:**
- Coaching package fed to LLM adapter for enhanced explanations
- Natural language coaching responses
- Session summaries and progress narratives

**Activation requirements:**
1. Phase 3 stable for ≥ 2 weeks
2. LLM provider configured and tested
3. Cost and latency acceptable
4. Human authorization

---

## 4. Flag Dependency Graph

```
ENABLE_ADAPTIVE_ORCHESTRATION ←── NEW (MAY-006)
│
├── ENABLE_ADAPTIVE_COACHING ← MUST be true (MAY-004)
│   ├── MayLearnerProfile.build()
│   ├── MayAdaptiveRecommender.generate()
│   └── MayRemediationEngine.*
│
├── ENABLE_READINESS_SCORING ← SHOULD be true (MAY-005)
│   ├── MayReadinessEngine.assess()
│   ├── MayInterventionPrioritizer.rank()
│   └── MayRecommendationExplainer.explain()
│
├── ENABLE_COACHING_ROUTER ← SHOULD be true (MAY-002)
│   └── MayCoachingRouter.dispatchToHandler()
│
└── ENABLE_COACHING_MEMORY ← NEW, optional (MAY-006A)
    └── MayCoachingMemory (session-scoped)

ENABLE_LLM (MAY-003) ← Reserved for Phase 4, independent of orchestrator
```

---

## 5. Activation Protocol

Any human-authorized activation of a phase must:

1. Set the required feature flags via `MayFeatureFlags.setFlag('FLAG_NAME', true)`
2. Run `MayFeatureFlags.snapshot()` to confirm flag state
3. Verify no console errors in browser
4. Run `npm run smoke` to confirm no regressions
5. Document activation in REVISION_HISTORY.md

Deactivation follows the same protocol in reverse.

---

## 6. Rollback

All orchestration is feature-flagged. Rollback requires setting `ENABLE_ADAPTIVE_ORCHESTRATION=false` — no code changes needed. All existing coaching paths remain untouched.

---

## 7. Monitoring (Future)

When active in production, the orchestrator should log:
- Pipeline execution time per call
- Degraded components (which subsystems returned null)
- Decision engine decision IDs
- Coaching memory state transitions

No telemetry or network reporting — all monitoring is local and session-scoped.
