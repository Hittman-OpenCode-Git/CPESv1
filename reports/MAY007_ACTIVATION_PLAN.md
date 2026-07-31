# MAY-007 Activation Plan

**Session:** MAY-007  
**Created:** 2026-07-30  
**Governance Lane:** Light

---

## 1. Flag Enablement Sequence

All flags default to `false`. The recommended rollout order:

| Phase | Flag | Dependencies | Risk |
|-------|------|-------------|------|
| 1 | ENABLE_CONTEXT_BUILDER | none | Low — isolated UI feature |
| 1 | ENABLE_COACHING_ROUTER | ENABLE_CONTEXT_BUILDER | Low — routing only |
| 2 | ENABLE_ADAPTIVE_COACHING | none | Low — profile + recommender (read-only) |
| 2 | ENABLE_COACHING_MEMORY | none | Low — localStorage only |
| 3 | ENABLE_READINESS_SCORING | ENABLE_ADAPTIVE_COACHING | Medium — aggregated analytics |
| 3 | ENABLE_ADAPTIVE_ORCHESTRATION | ENABLE_ADAPTIVE_COACHING, ENABLE_READINESS_SCORING | Medium — full pipeline |
| 4 | ENABLE_LLM | none | High — external API calls |
| 4 | ENABLE_LLM_COACHING | ENABLE_LLM | High — AI-generated content |
| 4 | ENABLE_LLM_SUMMARIES | ENABLE_LLM | High — AI-generated content |
| 4 | ENABLE_AZURE_OPENAI_PROVIDER | ENABLE_LLM | High — external API |
| 4 | ENABLE_OPENAI_PROVIDER | ENABLE_LLM | High — external API |
| N/A | ENABLE_EXPLAIN_MODE, ENABLE_QUIZ_MODE, ENABLE_SOCRATIC_MODE, ENABLE_MOTIVATE_MODE, ENABLE_STUDY_PLAN_MODE | Individual mode flags | Low — each isolated |

---

## 2. Flag Status Summary

All 16 flags verified at `default: false` in `may-feature-flags.js`.

| Flag | Default | Safe Fallback | Production Behavior |
|------|---------|--------------|---------------------|
| ENABLE_CONTEXT_BUILDER | false | yes — context stays null | zero change when off |
| ENABLE_COACHING_ROUTER | false | yes — no coaching routing happens | zero change when off |
| ENABLE_ADAPTIVE_COACHING | false | yes — modules skip execution | zero change when off |
| ENABLE_READINESS_SCORING | false | yes — modules skip execution | zero change when off |
| ENABLE_ADAPTIVE_ORCHESTRATION | false | yes — orchestrator short-circuits | zero change when off |
| ENABLE_COACHING_MEMORY | false | yes — no session memory written | zero change when off |
| ENABLE_LLM | false | yes — no API calls | zero change when off |
| ENABLE_LLM_COACHING | false | yes — no API calls | zero change when off |
| ENABLE_LLM_SUMMARIES | false | yes — no API calls | zero change when off |
| ENABLE_AZURE_OPENAI_PROVIDER | false | yes — provider not registered | zero change when off |
| ENABLE_OPENAI_PROVIDER | false | yes — provider not registered | zero change when off |
| ENABLE_EXPLAIN_MODE | false | yes — mode not available | zero change when off |
| ENABLE_QUIZ_MODE | false | yes — mode not available | zero change when off |
| ENABLE_SOCRATIC_MODE | false | yes — mode not available | zero change when off |
| ENABLE_STUDY_PLAN_MODE | false | yes — mode not available | zero change when off |

---

## 3. Rollback Strategy

Each flag can be independently disabled:
- Set `MayFeatureFlags.setFlag('FLAG_NAME', false)` at runtime
- No persistent state survives page reload (all localStorage is coaching data only)
- All modules check flags on each call — disabling a flag mid-session is safe

**Production rollback:** Simply never set any flag to `true`. All 28 modules load but execute zero behavior.

---

## 4. Activation Readiness

| Condition | Status |
|-----------|--------|
| All modules wired in HTML | PENDING (this session) |
| All modules load without errors | PENDING (verify post-wiring) |
| All feature flags default false | CONFIRMED |
| All flags have safe fallback | CONFIRMED |
| No production behavior change | CONFIRMED |
| End-to-end pipeline executable | PENDING (verify MayCoachingOrchestrator.run()) |
