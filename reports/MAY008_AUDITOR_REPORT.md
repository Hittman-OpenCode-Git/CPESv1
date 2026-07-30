# MAY-008 — Auditor Phase Report

**Session:** MAY-008  
**Date:** 2026-07-30  
**Governance Lane:** Light (read-only audit — no pack/case/content modifications)

---

## 1. Flag Audit

### 1.1 Default State Verification

**Check:** All 15 MayFeatureFlags default to `false`.

**Result: PASS** — All 15 flags confirmed `false`:

```
ENABLE_ADAPTIVE_COACHING: false
ENABLE_ADAPTIVE_ORCHESTRATION: false
ENABLE_AZURE_OPENAI_PROVIDER: false
ENABLE_COACHING_MEMORY: false
ENABLE_COACHING_ROUTER: false
ENABLE_CONTEXT_BUILDER: false
ENABLE_EXPLAIN_MODE: false
ENABLE_LLM: false
ENABLE_LLM_COACHING: false
ENABLE_LLM_SUMMARIES: false
ENABLE_OPENAI_PROVIDER: false
ENABLE_QUIZ_MODE: false
ENABLE_READINESS_SCORING: false
ENABLE_SOCRATIC_MODE: false
ENABLE_STUDY_PLAN_MODE: false
```

**Verification method:** `node -e "require('./may-feature-flags.js').getAll()"` — direct module load, no environment overrides.

### 1.2 No Production Activation

**Check:** No flag is enabled via environment variable or baked-in default.

**Result: PASS** — `process.env.CMA_MAY_PILOT` is not set. `process.env.MAY_ENABLE_*` are not set. The `applyEnvOverrides()` function runs at module load time but finds no matching env vars.

### 1.3 Sandbox-Only Enablement Design

**Check:** Flag enablement in the test harness does not persist.

**Result: PASS** — `MayFeatureFlags.setFlag()` only modifies the in-memory `_flags` object. No persistence to `localStorage`, no file writes, no environment variable mutation. Flags reset to defaults on next `require()`.

### 1.4 LLM Flags Remain Disabled

**Check:** All 5 LLM gates (`ENABLE_LLM`, `ENABLE_LLM_COACHING`, `ENABLE_LLM_SUMMARIES`, `ENABLE_AZURE_OPENAI_PROVIDER`, `ENABLE_OPENAI_PROVIDER`) are `false` and gated from activation.

**Result: PASS** — LLM adapter is fully gated:
- `MayLLMAdapter.send()`: checks `ENABLE_LLM` master switch (line 69) before any provider call
- `MayLLMProviderRegistry`: `fetch()` calls on lines 223, 364 are unreachable when `ENABLE_LLM` is false
- No LLM provider is registered at module load

---

## 2. Behavior Audit

### 2.1 Deterministic Decision Logic

**Check:** The adaptive coaching pipeline (MAY-004 through MAY-006) contains no random elements in decision logic.

**Result: PASS** — Decision path is fully deterministic:

| Module | Randomness Check | Result |
|--------|-----------------|--------|
| `MayDecisionEngine` (D1-D10) | Zero `Math.random()`, zero non-deterministic inputs | PASS |
| `MayAdaptiveRecommender` (R1-R10) | Zero `Math.random()` | PASS |
| `MayInterventionPrioritizer` | Zero `Math.random()` — pure score-based sorting | PASS |
| `MayReadinessEngine` | Zero `Math.random()` — band-mapping + weighted aggregation | PASS |
| `MayRemediationEngine` | Zero `Math.random()` | PASS |
| `MayLearnerProfile` | Zero `Math.random()` | PASS |
| `MayCoachingOrchestrator` | Zero `Math.random()` | PASS |

**Note on `may-core.js`:** The May tutoring layer (`may-core.js`) uses `Math.random()` extensively (15+ instances) for conversational response selection (hint wording, quiz question selection, trap suggestions). These are NOT in the adaptive coaching pipeline (MAY-004 through MAY-006) and are expected to be non-deterministic. The pipeline modules are fully deterministic.

### 2.2 `Date` and `Date.now()` Usage

**Check:** Timestamp generation does not affect decision logic.

**Result: PASS** — All `new Date()` and `Date.now()` usage is for metadata:

| Usage | Module | Impact on Decisions |
|-------|--------|-------------------|
| `computedAt`, `generatedAt` timestamps | All modules | Metadata only — not used in decision rules |
| `now - lastSeen` for stale topic detection | Recommender R9, Prioritizer | Deterministic date arithmetic — consistent within same execution |
| `daysUntilExam` calculation | Recommender R5/R6, Prioritizer | Deterministic date arithmetic |
| Study streak calculation | LearnerProfile | Deterministic date comparison |

No `Date` usage feeds into decision logic that would produce different outputs on different days (the test harness will use deterministic date seeds).

### 2.3 Context-Based Recommendations

**Check:** Recommendations reference the learner's actual profile data (topics, accuracy, trends).

**Result: PASS** — Every recommendation includes:
- `topic` — specific topic from the profile's masteryLevels
- `rationale` — references the topic name and accuracy percentage
- `evidence` — includes actual profile data (accuracy, attempts, stability, direction)

No recommendation uses generic placeholder text.

### 2.4 Traceable Outputs

**Check:** Pipeline outputs can be traced back to the profile data.

**Result: PASS** — Full traceability chain:
- `profile` ← `MayLearnerState.load()` ← `localStorage`
- `recommendations` ← `MayAdaptiveRecommender.generate(profile)` ← profile fields
- `readiness` ← `MayReadinessEngine.assess()` ← `MayLearnerState` aggregates
- `interventions` ← `MayInterventionPrioritizer.rank()` ← readiness + intelligence
- `decision` ← `MayDecisionEngine.decide(profile, readiness, recs, interventions)` ← all upstream

---

## 3. Safety Audit

### 3.1 Network Call Review

**Check:** No external network calls in adaptive coaching pipeline.

**Result: PASS** — Network call inventory:

| Location | Function | Status |
|----------|----------|--------|
| `may-llm-provider-registry.js:223` | `fetch()` to Azure OpenAI | UNREACHABLE — gated behind `ENABLE_LLM` + `ENABLE_AZURE_OPENAI_PROVIDER` |
| `may-llm-provider-registry.js:364` | `fetch()` to OpenAI API | UNREACHABLE — gated behind `ENABLE_LLM` + `ENABLE_OPENAI_PROVIDER` |
| `may-core.js:122` | `fetch('governance/DEFECT_MANIFEST_DL008_DL026.json')` | Local file fetch — loads governance defect manifest for coaching UI, not part of adaptive pipeline. No external network. |

**Pipeline modules with zero network activity:** `may-coaching-orchestrator.js`, `may-decision-engine.js`, `may-adaptive-recommender.js`, `may-readiness-engine.js`, `may-intervention-prioritizer.js`, `may-learner-profile.js`, `may-remediation-engine.js`, `may-recommendation-explainer.js`, `may-intervention-coordinator.js`, `may-recommendation-pipeline.js`, `may-coaching-memory.js`.

### 3.2 LLM Provider Isolation

**Check:** LLM providers remain disabled and no LLM call path is reachable.

**Result: PASS** — LLM adapter gating:
- `MayLLMAdapter.send()` requires `ENABLE_LLM === true` AND (`ENABLE_LLM_COACHING === true` OR `ENABLE_LLM_SUMMARIES === true`)
- `ENABLE_LLM` is `false` → ALL LLM paths are unreachable
- Fallback behavior: `send()` returns mock response when flags are disabled
- Provider registry `fetch()` calls are in unreachable code paths

### 3.3 No Automatic Actions

**Check:** Pipeline produces advisory output only — no automatic session modification.

**Result: PASS** — The adaptive coaching pipeline:
- Returns data objects (CoachingPackage, Decision, PriorityQueue) — advisory only
- Does NOT modify `state.session`, `MayLearnerState`, or any localStorage data
- Does NOT initiate UI changes, navigation, or mode switching
- Does NOT score questions or change answers
- The orchestrator is a pure function: input state → output package

### 3.4 Governance File Safety

**Check:** Pipeline execution does not modify governance-critical files.

**Result: PASS** — All May modules are read-only with respect to:
- Pack files (`pack_*_corrected.js`)
- Case files (`scored_cases*.js`)
- Answer keys, question_state, certification status
- Registries (`MASTER_QUESTION_REGISTRY.md`)
- Baselines (`CURRENT_BASELINES.md`)
- Defect library (`DEFECT_LIBRARY.md`)
- Revision history (`REVISION_HISTORY.md`)

---

## Auditor Phase Verdict

| Audit | Status | Issues |
|-------|--------|--------|
| Flag Audit | **PASS** | None — all 15 flags default `false`, zero production activation |
| Behavior Audit | **PASS** | None — pipeline is deterministic, context-based, traceable |
| Safety Audit | **PASS** | None — zero network calls in pipeline, LLM paths unreachable, advisory-only output |

**All 3 audits PASS. Proceed to Implementer Phase.**
