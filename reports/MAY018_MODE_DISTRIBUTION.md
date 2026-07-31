# MAY-018 Mode Distribution Report

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis)
**Phase:** Implementer — Telemetry Analysis

---

## 1. Data Source

Primary: `reports/MAY014_TELEMETRY.json` — 10 synthetic profiles
Decision engine: MAY014-1.0
Coaching router: MAY-002

---

## 2. Coaching Mode Inventory

| Mode | Purpose | Trigger Paths | Feature Flag |
|------|---------|--------------|--------------|
| **EXPLAIN** | Concept explanations, step-by-step solutions | D7, D8, D10 (decision); explain, wrong-choices, simplify, mymistake (action) | `ENABLE_EXPLAIN_MODE` |
| **QUIZ** | Adaptive quiz guidance, similar questions | D1, D2, D5, D6, D9 (decision); similar, recovery (action) | `ENABLE_QUIZ_MODE` |
| **SOCRATIC** | Targeted questioning, progressive hints | D3 (decision); hint, chat (action) | `ENABLE_SOCRATIC_MODE` |
| **STUDY_PLAN** | Personalized study recommendations | D4 (decision); progress, weakness, summary, next, digest, strategy, effectiveness (action) | `ENABLE_STUDY_PLAN_MODE` |
| **MOTIVATE** | Celebrate progress, frame challenges | None (event-driven only) | None |
| **EXAM_REVIEW** | Post-session analysis, error patterns | None (context-driven only) | None |

---

## 3. Mode Trigger Frequency (Decision Engine)

| Mode | Decision Triggers | Count | % | Reachable? |
|------|-------------------|-------|---|------------|
| QUIZ | D1, D2, D5, D6, D9 | 5 | 50% | Yes |
| EXPLAIN | D8 | 2 | 20% | Yes (limited) |
| SOCRATIC | D3 | 1 | 10% | Yes (narrow) |
| STUDY_PLAN | D4 | 1 | 10% | Yes (narrow) |
| MOTIVATE | — | 0 | 0% | Not via decision engine |
| EXAM_REVIEW | — | 0 | 0% | Not via decision engine |

### 3.1 Mode-Trigger Decision Mapping

```
D1 (critical remediation)     → QUIZ
D2 (critical weakness)        → QUIZ [+ D4 secondary if exam ≤30d]
D3 (repeated unstable)        → SOCRATIC
D4 (exam approaching)         → STUDY_PLAN
D5 (declining trends)         → QUIZ
D6 (emerging weakness)        → QUIZ
D7 (fragile knowledge)        → EXPLAIN    [DEAD — D5 captures first]
D8 (section coverage gap)     → EXPLAIN
D9 (high mastery)             → QUIZ
D10 (insufficient data)       → EXPLAIN    [DEAD — D8 captures first]
```

---

## 4. Mode Selection Quality

### 4.1 QUIZ Mode (50% — Dominant)
- **Decision triggers:** D1, D2, D5, D6, D9
- **Action triggers:** similar, recovery
- **Assessment:** QUIZ is the default remediation mode. Dominance reflects the profile mix (7/10 profiles have weaknesses or declining trends) rather than a routing bias.
- **Concern:** D9 (high mastery) routes to QUIZ for "challenge" content — this overloads QUIZ with two distinct intents (remediation and challenge). A dedicated CHALLENGE mode or clearer content differentiation within QUIZ would improve routing precision.

### 4.2 EXPLAIN Mode (20% — Underused)
- **Decision triggers:** D8 only (D7 and D10 unreachable)
- **Action triggers:** explain, wrong-choices, simplify, mymistake
- **Assessment:** EXPLAIN is systematically underused because:
  1. D7 (fragile knowledge → EXPLAIN) is dead — D5 captures those profiles
  2. D10 (insufficient data → EXPLAIN) is dead — D8 captures those profiles
  3. Only D8 (section coverage gap) routes to EXPLAIN
- **Impact:** Learners with fragile knowledge or insufficient data get QUIZ mode instead of conceptual explanation.
- **Note:** EXPLAIN is heavily used through direct action triggers (explain, wrong-choices, simplify) — the underuse is in the decision-engine path, not in manual learner interactions.

### 4.3 SOCRATIC Mode (10% — Appropriate)
- **Decision triggers:** D3 only
- **Action triggers:** hint, chat
- **Assessment:** SOCRATIC is narrow by design — it requires systematic misunderstanding (accuracy<60%, declining, >=5 attempts). This is correct: SOCRATIC is resource-intensive and should only engage when simpler modes have demonstrably not worked.
- **Reachable:** Yes, confirmed by L3 profile.

### 4.4 STUDY_PLAN Mode (10% — Appropriate)
- **Decision triggers:** D4 only
- **Action triggers:** progress, weakness, summary, next, digest, strategy, effectiveness
- **Assessment:** STUDY_PLAN is gated correctly (exam ≤30 days + Developing/Recovery readiness). This should be narrow — exam-strategy mode is only relevant near exam dates.
- **Reachable:** Yes, confirmed by L4 profile.

### 4.5 MOTIVATE Mode (0% — By Design)
- **Decision triggers:** None
- **Action triggers:** None
- **Assessment:** MOTIVATE is event-driven (session completion, milestone achievement) and has no decision-engine trigger. It activates through `may-core.js` event handlers, not the orchestrator pipeline.
- **Status:** Correct — motivational coaching should not be "decided" by a weakness profile. It should surface organically.

### 4.6 EXAM_REVIEW Mode (0% — By Design)
- **Decision triggers:** None
- **Action triggers:** None
- **Assessment:** EXAM_REVIEW is context-driven (post-session completion or exam briefing context override). The coaching router's `route()` function overrides mode to EXAM_REVIEW for `exam_briefing` and `post_session_review` contexts.
- **Status:** Correct — post-session analysis should be context-triggered, not profile-driven.

---

## 5. Mode-Action Mapping (Router Layer)

The coaching router (`may-coaching-router.js`) maps 15 learner actions to 6 modes:

| Action | Mode | Decision-Engine Overlap? |
|--------|------|--------------------------|
| explain | EXPLAIN | Possibly (D7, D8, D10) |
| wrong-choices | EXPLAIN | No |
| simplify | EXPLAIN | No |
| mymistake | EXPLAIN | No |
| similar | QUIZ | Possibly (D5, D6, D9) |
| recovery | QUIZ | Possibly (D1, D2) |
| hint | SOCRATIC | Possibly (D3) |
| chat | SOCRATIC | Possibly (D3) |
| progress | STUDY_PLAN | Possibly (D4) |
| weakness | STUDY_PLAN | No |
| summary | STUDY_PLAN | No |
| next | STUDY_PLAN | No |
| digest | STUDY_PLAN | No |
| strategy | STUDY_PLAN | No |
| effectiveness | STUDY_PLAN | No |

**Gap:** The router selects mode by action mapping — it does not consume the decision engine's `nextAction.coachingMode`. The adaptive pipeline's mode recommendation flows into `nextAction` but is not fed back into the router. This is a two-track architecture: the router handles direct learner actions; the orchestrator recommends but does not route.

---

## 6. Mode Diversity Score

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Modes defined | 6 | — | — |
| Modes reachable by decision engine | 4 of 6 | >=4 | PASS |
| Modes reachable overall (incl. router) | 6 of 6 | — | PASS |
| Decision-engine mode variety | 4 distinct modes across 10 profiles | >=4 | PASS |

---

## 7. Recommendations

| ID | Recommendation | Priority | Rationale |
|----|---------------|----------|-----------|
| MODE-01 | Fix D7 reachability → EXPLAIN mode usage increases | P2 | Restores EXPLAIN as intented fragile-knowledge path |
| MODE-02 | Fix D10 path → EXPLAIN for insufficient data | P1 | Restores correct fallback mode |
| MODE-03 | Consider separate CHALLENGE mode or sub-mode within QUIZ for D9 | P4 | D9 (challenge) and D1/D2 (remediation) have opposite intents but same mode |
| MODE-04 | Wire decision-engine mode into router dispatch | P3 | Connects adaptive pipeline to routing layer |
| MODE-05 | Track mode telemetry (`trackMode`) in orchestrator | P4 | Enables mode usage analysis |
