# MAY-016 Activation Plan

**Session:** MAY-016
**Status:** Active
**Governance Lane:** Light (UI/coaching layer — no pack/case/content/scoring impact)
**Dependencies:** MAY-001 through MAY-015 (all complete)
**Predecessor:** MAY-015 — Activation Readiness & Production Rollout Preparation

---

## 1. Objective

Move May from 89/100 Release-Candidate Ready to Activation Ready by completing final rollout, observability, and operational-governance work. No production activation. No LLM activation. No content or scoring modifications.

---

## 2. Feature Flag Inventory (15 flags)

All flags defined in `may-feature-flags.js`, all default `false`. Zero production behavior change unless explicitly enabled.

### 2.1 Stage 0 — Pilot (CMA_MAY_PILOT=1)

| Flag | Default | Dependencies | Activation |
|------|---------|-------------|------------|
| `ENABLE_CONTEXT_BUILDER` | false | None | `CMA_MAY_PILOT=1` |
| `ENABLE_COACHING_ROUTER` | false | `ENABLE_CONTEXT_BUILDER` | `CMA_MAY_PILOT=1` |

### 2.2 Stage 1 — Mode Flags

| Flag | Default | Dependencies | Activation |
|------|---------|-------------|------------|
| `ENABLE_EXPLAIN_MODE` | false | `ENABLE_COACHING_ROUTER` | `MAY_ENABLE_EXPLAIN_MODE=1` |
| `ENABLE_QUIZ_MODE` | false | `ENABLE_COACHING_ROUTER` | `MAY_ENABLE_QUIZ_MODE=1` |
| `ENABLE_SOCRATIC_MODE` | false | `ENABLE_COACHING_ROUTER` | `MAY_ENABLE_SOCRATIC_MODE=1` |
| `ENABLE_STUDY_PLAN_MODE` | false | `ENABLE_COACHING_ROUTER` | `MAY_ENABLE_STUDY_PLAN_MODE=1` |

### 2.3 Stage 2 — Adaptive Flags

| Flag | Default | Dependencies | Activation |
|------|---------|-------------|------------|
| `ENABLE_ADAPTIVE_COACHING` | false | Stage 0 flags | `MAY_ENABLE_ADAPTIVE_COACHING=1` |
| `ENABLE_READINESS_SCORING` | false | `ENABLE_ADAPTIVE_COACHING` | `MAY_ENABLE_READINESS_SCORING=1` |
| `ENABLE_ADAPTIVE_ORCHESTRATION` | false | `ENABLE_READINESS_SCORING` | `MAY_ENABLE_ADAPTIVE_ORCHESTRATION=1` |
| `ENABLE_COACHING_MEMORY` | false | `ENABLE_ADAPTIVE_ORCHESTRATION` | `MAY_ENABLE_COACHING_MEMORY=1` |

### 2.4 Stage 3 — LLM Flags (OFF — not part of MAY-016)

| Flag | Default | Status |
|------|---------|--------|
| `ENABLE_LLM` | false | **NOT activated** — no LLM in scope |
| `ENABLE_LLM_COACHING` | false | **NOT activated** |
| `ENABLE_LLM_SUMMARIES` | false | **NOT activated** |
| `ENABLE_AZURE_OPENAI_PROVIDER` | false | **NOT activated** |
| `ENABLE_OPENAI_PROVIDER` | false | **NOT activated** |

---

## 3. Enablement Sequence

### 3.1 Recommended Staged Rollout

```
Step 1: CMA_MAY_PILOT=1
  → ENABLE_CONTEXT_BUILDER + ENABLE_COACHING_ROUTER
  → May greets learner, routes coaching requests
  → No adaptive decisions yet

Step 2: Enable one mode at a time
  → ENABLE_EXPLAIN_MODE → May explains incorrect answers
  → ENABLE_QUIZ_MODE → May quizzes on weak topics
  → ENABLE_SOCRATIC_MODE → May uses guided questioning
  → ENABLE_STUDY_PLAN_MODE → May generates study plans

Step 3: ENABLE_ADAPTIVE_COACHING=1
  → Learner profile builds from session data
  → AdaptiveRecommender produces personalized recommendations

Step 4: ENABLE_READINESS_SCORING=1
  → Readiness engine scores topics 0-100
  → Band assignment: Recovery needed / Developing / Ready

Step 5: ENABLE_ADAPTIVE_ORCHESTRATION=1
  → Decision engine selects appropriate interventions
  → Prioritizer ranks by urgency

Step 6: ENABLE_COACHING_MEMORY=1
  → Cross-session memory persists learner patterns
  → Coaching adapts across sessions
```

### 3.2 Gate Checks Per Step

| Step | Pre-Check | Post-Check |
|------|-----------|------------|
| Step 1 | Smoke 17/17 | May.init() succeeds, companion card visible |
| Step 2 | Mode handler exists | Coaching response non-empty |
| Step 3 | Profile builds without error | Profile has strengths + weaknesses |
| Step 4 | Readiness score 0-100 | Band matches data |
| Step 5 | Decision ID non-null | Rationale + evidence present |
| Step 6 | Memory persists across page reload | Prior session patterns loaded |

---

## 4. Success Metrics (Post-Activation)

### 4.1 Platform Health

| Metric | Target | Measured By |
|--------|--------|-------------|
| Smoke test | 17/17 PASS | `npm run smoke` |
| Preflight | 0 divergences | `npm run preflight` |
| Governance guard | 51/51 PASS | `node scripts/test_governance_guard.js` |
| JS parse check | All 5 packs + 3 case packs pass | `node --check` |
| Release-readiness | ≥ 90/100 | MAY016 readiness scorer |

### 4.2 May Operational Health

| Metric | Target | Measured By |
|--------|--------|-------------|
| May.init() no error | Pass | Browser console |
| All 15 flags default false | Pass | `MayFeatureFlags.getAll()` |
| Adaptive pipeline < 100ms | Pass | Performance API |
| Zero LLM network calls | 0 calls | Network panel |
| Zero pack/case modifications | 0 writes | File hashes stable |

### 4.3 Learner Experience

| Metric | Target |
|--------|--------|
| Cohort loading < 200ms | Pass |
| Companion card renders | Pass |
| Mini-panel in MCQ view | Pass |
| Post-answer feedback | Pass |
| Review bridge buttons | Pass |
| Coaching tab functional | Pass |

---

## 5. Files Touched (All Read-Only Unless Explicitly Authorized)

| File | Type | Purpose |
|------|------|---------|
| `may-feature-flags.js` | Read-only | Flag audit |
| `may-core.js` | Read-only | Telemetry audit |
| `may-learner-state.js` | Read-only | State audit |
| `may-adaptive-recommender.js` | Read-only | Pipeline audit |
| `may-readiness-engine.js` | Read-only | Pipeline audit |
| `may-decision-engine.js` | Read-only | Pipeline audit |
| `may-intervention-prioritizer.js` | Read-only | Pipeline audit |
| `index_updated.html` | Read-only | Script load order audit |
| `app.js` | Read-only | Integration point audit |
| `styles.css` | Read-only | CSS audit |

---

## 6. Non-Goals (Explicitly Out of Scope)

- No production activation of any flag
- No LLM provider activation
- No content modifications (packs, cases, exhibits)
- No scoring or answer-key modifications
- No question_state changes
- No REVISION_HISTORY.md entries (Light Lane — no content changes)
- No DEFECT_LIBRARY.md entries (no new defects discovered)

---

## 7. Governance Compliance

| Check | Status |
|-------|--------|
| Light Lane scope confirmed | Yes — UI/observability only |
| No pack/case/content edits | Yes |
| No scoring modifications | Yes |
| Preflight recommended at T0 | Yes |
| Smoke mandatory at Tend (if app files changed) | Conditional |
| REVISION_HISTORY not required | Correct (no content changes) |
| Destructive script authorization §3.1 | N/A (no deletions) |

---

*Generated: 2026-07-30 — MAY-016 Activation Planner*
