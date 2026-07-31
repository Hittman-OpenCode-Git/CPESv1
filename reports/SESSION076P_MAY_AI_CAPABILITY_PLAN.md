# Session 76P — May AI Capability Plan

## Vision

May should evolve from a static scripted coaching layer into a context-aware AI study coach that supports the full CMA candidate journey. May should feel like a knowledgeable tutor who knows the student's history, understands the current question, and adapts advice accordingly.

## Current State (S75)

May is a mature, rules-based coaching engine with:
- 6,570 lines of may-core.js
- 2,016 lines of may-learner-state.js
- 40+ NLP pattern-match routes for freeform chat
- 6-section structured explanation generation
- 5-level graduated hint system
- Session review queue with missed/flagged item navigation
- Topic-level readiness analysis
- Student roll/profile system
- Weekly digest with longitudinal analytics
- Case pattern analysis (5 miss patterns)
- Adaptive practice mix recommendations
- Confidence calibration
- Question challenge handling

May is **fully client-side, template-based, and deterministic**. No LLM, no network dependency.

## Target Capability Model

| Capability | Current | Target |
|------------|---------|--------|
| Dialogue | Pattern-matched (40+ routes) | Socratic + conversational, with LLM fallback |
| Hint Generation | 5-level graduated (generic templates) | Question-specific, distractor-aware hints |
| Misconception Diagnosis | Rule-based (from EW fields) | Multi-factor: patterns + topic history + confidence calibration |
| Question-Specific Explanation | 6-section tutor layer (template) | Dynamic explanation adapting to learner's error |
| Study Recommendations | Accuracy-based (topic % correct) | Spaced repetition + forgetting curve + difficulty calibration |
| Topic Review | Recovery sets (QID recommendations) | Interactive mini-quizzes + concept checks |
| Follow-up Questions | Socratic (2 templates per answer) | Adaptive follow-ups based on learner confidence |
| Context Awareness | Current QID + session stats | Full learner profile + cross-session trends + difficulty profile |
| External Knowledge | None (bank content only) | Accounting standards reference (ASC, COSO, IMA) |
| Delivery Pool Safety | Static 5-item defective list | Dynamic DEFECT_MANIFEST sync |
| Personalization | Same for all learners | Adaptive: pacing, detail level, hint style |
| Multi-language Support | None | Localization framework |

## Staged Implementation Path

### Stage 1 — Local Rule-Based Contextual Coaching (Next 2-3 Sessions)

**No external API. No network dependency.**

Enhancements from current state:
- **Context Builder** — Structured context packet for all question/learner data
- **Socratic Dialogue Scaffolding** — Better conversation flow, follow-up trees, personalized greeting
- **Hint Enhancement** — Use ExplanationWrong fields for graduated hint construction
- **Dynamic Defect Manifest** — Replace hardcoded 5-item list with live DEFECT_MANIFEST_DL008_DL026.json sync
- **Recovery Set Safety** — Filter by question_state === "Certified"
- **Time-Aware Coaching** — Per-question timing data (if available from app.js)

### Stage 2 — Context & Analytics Architecture (2-3 Sessions)

- **Unified Context Packet** — Full serializable context object consumed by all coaching functions
- **Learner Intelligence Engine** — Already exists (S134 `getLearnerIntelligence()`) — extend with difficulty calibration
- **Spaced Repetition Engine** — Schedule review intervals based on memory decay curves
- **Cross-Topic Dependency Mapping** — Topic prerequisites (e.g., must understand cost behavior before variance analysis)
- **Question Quality Metrics** — Per-QID performance patterns (diagnostic power, difficulty calibration)

### Stage 3 — Optional LLM Adapter (Feature-Flagged)

- **Feature flag:** `may.enableLLM = false` (default)
- **Never required** for exam operation
- **Off by default** — exam mode must never depend on network
- **Provider abstraction** — Can connect to local or external model
- **Safety layer extension** — S107/S108 validation against anti-leakage patterns
- **Anti-leakage policy** — May never reveals the correct answer during active exam
- **Fallback:** Always falls back to Stage 1/2 deterministic coaching when LLM unavailable

### Stage 4 — Adaptive Study Coach (3-5 Sessions)

- **Performance History Engine** — Full longitudinal analytics with decay-weighted scores
- **Topic Recommendation Engine** — What to study next, based on exam weight × weakness × forgetting timeline
- **Misconception Tracking** — Persistent misconception map across questions
- **Review Path Generator** — Personalized study plans with estimated time commitments
- **Exam Readiness Simulation** — Simulated CMA exam with May coaching in review mode only

## Non-Goals

May should NOT:
- Replace the CMA exam engine (timer, scoring, navigation)
- Require network access for the simulator to function
- Modify answer keys or question content
- Guarantee exam outcomes
- Serve as an authoritative accounting reference
- Expose hidden metadata to learners unless educationally warranted

## Design Principles

1. **Local-first, deterministic, always available** — Core coaching works offline
2. **Feature-flag all external dependencies** — LLM, API, network
3. **Never weaken learner safety** — Delivery pool protection is non-negotiable
4. **Evidence-based, not opinion-based** — All recommendations traceable to learner data
5. **Progressive disclosure** — Don't overwhelm; May adapts detail level to learner sophistication
6. **Exam mode isolation** — In CMA Exam mode, May provides pre/post coaching only, never during the exam
