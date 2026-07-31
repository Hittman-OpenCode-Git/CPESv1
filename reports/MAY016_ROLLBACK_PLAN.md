# MAY-016 Rollback Plan

**Session:** MAY-016
**Status:** Active
**Governance Lane:** Light (UI/coaching layer — no pack/case/content/scoring impact)

---

## 1. Objective

Ensure all May adaptive functionality can be disabled instantly through feature flags. Document rollback sequence, recovery behavior, and safety guarantees for every activation stage.

---

## 2. Immediate Rollback — Single Flag

Every May feature can be disabled instantly by setting its flag to `false`. The `MayFeatureFlags.setFlag()` API provides in-browser toggle without page reload.

### 2.1 Console Rollback Commands

```javascript
// Disable all adaptive features instantly
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', false);
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);

// Disable all modes instantly
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);
MayFeatureFlags.setFlag('ENABLE_QUIZ_MODE', false);
MayFeatureFlags.setFlag('ENABLE_SOCRATIC_MODE', false);
MayFeatureFlags.setFlag('ENABLE_STUDY_PLAN_MODE', false);

// Disable May entirely
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', false);
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);
```

### 2.2 Full May Shutdown

```javascript
// One-liner: disable all 15 flags
Object.keys(MayFeatureFlags.FLAGS).forEach(function(k) {
  MayFeatureFlags.setFlag(k, false);
});
```

---

## 3. Rollback by Stage

### 3.1 Rollback from Stage 0 (Pilot)

**Symptom:** May companion card appears but is non-functional or provides incorrect coaching.

**Rollback:**

```javascript
// Disable pilot
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', false);
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);
// Or: remove CMA_MAY_PILOT=1 environment variable and reload
```

**Recovery:** May companion card hidden. App behaves as pre-May. No coaching, no adaptive features.

**Risk:** Zero. Context builder and router are read-only — they consult pack/case data but never modify it.

### 3.2 Rollback from Stage 1 (Mode Flags)

**Symptom:** Specific coaching mode produces incorrect or confusing explanations.

**Rollback:**

```javascript
// Disable specific mode
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);   // explain mode off
MayFeatureFlags.setFlag('ENABLE_QUIZ_MODE', false);       // quiz mode off
MayFeatureFlags.setFlag('ENABLE_SOCRATIC_MODE', false);    // socratic off
MayFeatureFlags.setFlag('ENABLE_STUDY_PLAN_MODE', false); // study plan off
```

**Recovery:** Specific mode disabled. Other modes unaffected. May still greets and routes.

**Risk:** Zero. Modes are output-only — they generate text recommendations but never modify learner state, pack data, or scoring.

### 3.3 Rollback from Stage 2 (Adaptive)

**Symptom:** Adaptive recommender produces poor recommendations; readiness scores are miscalibrated.

**Rollback:**

```javascript
// Disable adaptive pipeline in reverse dependency order
MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', false);
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
```

**Recovery:** All adaptive features disabled. May returns to basic coaching (greet + route). Learner profile data preserved in `may-learner-state.js` localStorage — no data loss.

**Risk:** Low. Adaptive pipeline is deterministic and read-only against learner state. No pack/case modifications. Learner state is append-only — rollback does not delete prior sessions.

### 3.4 Rollback from Stage 3 (LLM — NOT IN SCOPE)

LLM flags are never activated in MAY-016. If activated in a future session, rollback:

```javascript
MayFeatureFlags.setFlag('ENABLE_LLM', false);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);
MayFeatureFlags.setFlag('ENABLE_LLM_SUMMARIES', false);
MayFeatureFlags.setFlag('ENABLE_AZURE_OPENAI_PROVIDER', false);
MayFeatureFlags.setFlag('ENABLE_OPENAI_PROVIDER', false);
```

---

## 4. Safety Guarantees

### 4.1 Read-Only by Design

| Assertion | Verification |
|-----------|-------------|
| May never modifies pack files | All May scripts access pack data via `window._cmaPackA` etc. (read-only globals) |
| May never modifies case files | Same read-only access pattern |
| May never modifies answer keys | May reads `CorrectChoice` but never writes to it |
| May never modifies scoring | Scoring is in app.js; May only calls `May.handoffCompletedSession()` |
| May never modifies question_state | Governance field — May has zero awareness of it |
| May never makes network calls | LLM flags off; no fetch/XHR in any May script without LLM flag |

### 4.2 Learner Data Preservation

| Data | Storage | Rollback Behavior |
|------|---------|-------------------|
| Learner state | `may-learner-state.js` → localStorage | **Preserved** — rollback does not delete |
| Session history | localStorage via `may-coaching-memory.js` | **Preserved** — rollback does not delete |
| Coaching memory | localStorage via `may-coaching-memory.js` | **Preserved** — rollback does not delete |
| Flag state | In-memory (`_flags` object) | **Reset on reload** — flags revert to defaults |

### 4.3 App Stability

| Scenario | Behavior |
|----------|----------|
| May script fails to load | `typeof May === 'undefined'` — app.js guards all May calls with this check |
| May.init() throws | Error caught by try/catch; app continues without May |
| Feature flag set to false mid-session | May reduces to no-op — all May calls return early |
| localStorage full | May catches error, continues without memory persistence |
| Corrupted learner state | MayFallback defaults to empty profile |

---

## 5. Rollback Communication

If rollback is necessary for a production deployment:

1. **Identify** the stage and specific flag causing the issue
2. **Disable** the flag via `MayFeatureFlags.setFlag(flag, false)`
3. **Verify** the symptom is resolved (reload page, confirm May behavior is reduced)
4. **Document** the rollback in `REVISION_HISTORY.md` (if content-level defect discovered)
5. **Investigate** root cause before re-enabling

---

## 6. Flag Dependency Map

```
CMA_MAY_PILOT
├── ENABLE_CONTEXT_BUILDER
└── ENABLE_COACHING_ROUTER
    ├── ENABLE_EXPLAIN_MODE
    ├── ENABLE_QUIZ_MODE
    ├── ENABLE_SOCRATIC_MODE
    └── ENABLE_STUDY_PLAN_MODE

ENABLE_ADAPTIVE_COACHING
└── ENABLE_READINESS_SCORING
    └── ENABLE_ADAPTIVE_ORCHESTRATION
        └── ENABLE_COACHING_MEMORY

ENABLE_LLM (OFF)
├── ENABLE_LLM_COACHING
├── ENABLE_LLM_SUMMARIES
├── ENABLE_AZURE_OPENAI_PROVIDER
└── ENABLE_OPENAI_PROVIDER
```

**Rule:** Disabling a parent flag makes all child flags inert (they may be `true`, but the parent's gate check prevents their code paths from executing).

---

*Generated: 2026-07-30 — MAY-016 Rollback Planner*
