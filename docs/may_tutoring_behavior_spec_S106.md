# May Tutoring Behavior Spec — Session 106 (Spec Only — No Behavior Changes)

**Version:** S106-1.0
**Status:** Design spec for future implementation (S107+)
**Authority:** Session 106 mandate; AGENTS.md governance; CAQS_v1.0.md
**Scope:** Tutoring behaviors only — no readiness thresholds, no content, no scoring

---

## 1. Purpose

This document specifies how May — the AI reviewer/tutor for the CMA Part 1 exam simulator — should behave when providing explanations, hints, wrong-choice analysis, simplification, similar-question recommendations, mistake analysis, progress insights, and weakness insights. It defines trigger conditions, input signals from `may-learner-state.js`, output content structure, and safety constraints for each behavior.

**No behavior changes are implemented in Session 106.** This is a design spec. Implementation begins in S107+.

---

## 2. May's Architecture Overview

### 2.1 Full Tutor Tab (may-core.js)
- Available outside active CMA Exam mode
- 10 quick-action buttons + freeform chat
- Sidebar: insights, readiness snapshot, section grid, case patterns, practice mode, provenance toggle
- Review mode: post-session handoff loads missed/flagged questions

### 2.2 Mini-Panel (injected into exam view)
- Visible during practice sessions (not full exam mode)
- Hint (graduated), Why? (explain), Progress (quick insight)
- Answer reveal gated: learner must attempt before seeing correct answer
- Post-answer micro-feedback

### 2.3 Governance Boundaries
- **Runtime AI never determines correctness, scoring, formulas, or blueprint mapping** (CAQS §1.4)
- All explanations reference question-bank content — no fabrication
- Answer-bearing coaching blocked during CMA Exam mode (`isFullTabBlocked()`)
- No "exam ready" labels — readiness is per-topic only
- All provenance surfaces opt-in with "(debug)" label and "no exam prediction" disclaimer
- Defective QIDs (DL-008, DL-026 manifest) excluded from all recommendations
- Contested QIDs excluded until resolved

---

## 3. Tutoring Behavior Catalog

### 3.1 Explain Answer (`_explainAnswer`)

**Trigger:** "Explain answer" button or freeform "explain the answer"

**Input Signals:**
| Signal | Source |
|--------|--------|
| `q.CorrectChoice`, `q.Choices[cc]` | Question object |
| `q.ExplanationCorrect` | Question object |
| `MayLearnerState._normalizeTopic(q.Topic)` | may-learner-state.js |
| `MayLearnerState.getTopicProgress()[topic]` | may-learner-state.js |
| `MayLearnerState.getQuestionExposureCount(qid)` | may-learner-state.js |
| For case items: `classifyCaseMissPattern(item)` | may-learner-state.js |

**Output Content:**
- Correct answer letter and text
- Full bank explanation (or topic-based fallback)
- Topic accuracy note: "You've seen {topic} {N} times ({P}% correct)"
- For case items: "What mattered in this case" + approach coaching

**Safety:** No fabrication when explanation is sparse. Blocked during exam mode. Never claims "exam-ready."

### 3.2 Hint (`_provideHint`)

**Trigger:** "Hint" button or freeform "give me a hint"

**Input Signals:**
| Signal | Source |
|--------|--------|
| `this.context.hintLevel` (0-4) | May context |
| `q.Topic`, `q.Difficulty`, `q.Section` | Question object |
| `q.CalculationItem`, `q.Stem` | Question object |
| `this.context.currentCaseItemType` | May context |
| `q.CorrectChoice`, `q.Choices` (levels 3-4 only) | Question object |

**Hint Levels:**
| Level | Name | Content | Answer Exposure |
|-------|------|---------|-----------------|
| 0 | Metacognitive | Self-regulation: "What is this testing?" | None |
| 1 | Concept | Section-level framing + first sentence of explanation | None |
| 2 | Strategy | Calculation steps or elimination approach | None |
| 3 | Elimination | One clearly wrong choice (absolute language) | None (identifies wrong choice) |
| 4 | Full | Delegates to `_explainAnswer()` | **Full answer** |

**State Tracking:** `hintLevel` per question, `_sessionHints[qid]` for handoff, `_liveHintCount` for session total.

**Safety:** Levels 0-3 never reveal answer. Level 3 only identifies wrong choices. Case hints reference available exhibits only.

### 3.3 Explain Wrong Choices (`_explainWrongChoices`)

**Trigger:** "Wrong choices" button

**Input:** All non-correct choices' text + `ExplanationWrong[letter]` from bank.

**Output:** For each wrong choice: letter, text, explanation (or generic fallback). Skips correct choice.

**Safety:** Never explains correct choice. Uses bank text or generic fallback — no fabrication.

### 3.4 Simplify Explanation (`_simplifyExplanation`)

**Trigger:** "Simplify" button or "simplify this"

**Input:** `q.ExplanationCorrect`, `q.CorrectChoice`, `q.Choices[cc]`, topic.

**Output:** Extracts core sentence. "In simple terms: {core}. This is about {topic}." Always states answer. Offers elaboration.

**Safety:** Never adds information. Never reinterprets into falsehood. Rephrase only.

### 3.5 Similar Question (`_recommendSimilar`)

**Trigger:** "Similar question" button

**Input:** `q.Topic`, `q.Section`, `q.DifficultyScore`; `_findSimilarQuestions()`; defect/contest gates.

**Output:** QID, stem snippet (150 chars), topic, section, difficulty. "Tests the same concept from a different angle."

**Safety:** Certified items only. Defect-manifest blocked QIDs excluded. Contested QIDs excluded. Logs via `logRecommendation()`.

### 3.6 My Mistake (`_explainYourMistake`)

**Trigger:** "My mistake" button

**Input:** `reviewItem.answer`, `reviewItem.correct`, `q.CorrectChoice`, `q.Choices`, wrong-explanation for learner's choice, `misconceptionPatterns[]`.

**Output:** "You picked {letter}: {text}" → distractor explanation → "The correct answer was {letter}: {text}" → full correct explanation → pattern match ("This fits a pattern — {N} misses involving {pattern name}").

**Safety:** If correct: show reasoning, don't fabricate mistake. Pattern names from known 8-category taxonomy only.

### 3.7 Progress Insight (`_getProgressInsight`)

**Trigger:** "My progress" button or "what am I improving at"

**Input Signals:**
| Signal | Source |
|--------|--------|
| Per-topic direction, delta, stability, hint trend | `getTrends()` |
| Improving, hint-dependent clusters | `getWeaknessClusters()` |
| Overconfident/underconfident per topic | `getConfidenceCalibration()` |
| Session count, total attempts | `data.sessions` |

**Output Structure (Priority Order):**
1. Header: "I've tracked {N} sessions and {M} attempts"
2. Improving topics: "{topic}: {accuracy}% overall, recent {recentPct}% (+{delta}%)"
3. Growing independence: decreasing hints + solid accuracy
4. Performing under pressure: high accuracy at high difficulty
5. Well-established: stable >=80%, accuracy >=70%
6. Confidence calibration: overconfident gap, underconfident reassurance

**Evidence:** All claims cite specific topic names, percentages, deltas. Minimum data thresholds enforced.

**Safety:** Never "improving overall" — always per-topic. Never platitudes. Never claim improvement without computed delta.

### 3.8 Weakness Insight (`_getWeaknessInsight`)

**Trigger:** "Weak areas" button or "what am I weak at"

**Input Signals:**
| Signal | Source |
|--------|--------|
| persistentWeak, declining, unstable, hintDependent, difficultySensitive | `getWeaknessClusters()` |
| Lowest-accuracy topics (fallback) | `getTrends()` |
| Recurring error patterns | `misconceptionPatterns[]` |

**Output Structure (Priority):**
1. Persistent weak (<60%, >=5 attempts): ranked, capped at 4
2. Declining (delta <=-15): capped at 3
3. Unstable (stability <50%): capped at 3
4. Hint-dependent: capped at 2
5. Difficulty-sensitive (>=30% gap): capped at 2
6. Fallback: lowest-accuracy topics if no clusters
7. Misconception patterns (>=2 occurrences): capped at 3

**Safety:** Never "you're bad at X" → "needs focused work." Never exaggerate. Pattern names from taxonomy only. Disclaimer: "These are patterns in your tracked data — not judgments."

### 3.9 Recovery Set (`_generateRecoverySet`)

**Trigger:** "Recovery set" button

**Input:** `getWeaknessClusters()`, `getRecentlySeenByOutcome(5)`, `_findSimilarQuestions()`, defect/contest gates.

**Allocation:** Inverse priority weighting. P1 (persistent weak) > P2 (declining) > P3 (unstable) > P4 (difficulty-sensitive). Default 10 questions.

**Safety:** Excludes recently-CORRECT (not missed). Falls back to excluding all recently-seen if outcome-aware filter too aggressive. Logs recommendation.

### 3.10 Study Next (`_recommendNext`)

**Priority:** persistent weak > declining > unstable > stretch > mixed-topic.

**Safety:** Specific topics only. No generic advice. Logs recommendation.

### 3.11 Session Summary (`_summarizeSession`)

**Output:** MCQ stats, case stats, weakest/strongest topics, cross-session comparison, next-step recommendation.

---

## 4. Evidence-Based Insight Design Principles

### 4.1 Anti-Generic Rules

| Forbidden | Required |
|-----------|----------|
| "You're doing great" | "{topic}: {accuracy}% across {N} attempts" |
| "Keep up the good work" | "Recent accuracy on {topic}: {recentPct}%" |
| "Some topics need work" | List specific topics with percentages |
| "You're improving overall" | "{topic}: +{delta}% in recent attempts" |
| "You're almost exam-ready" | **NEVER** — per-topic readiness band only |

### 4.2 Data Thresholds

| Claim | Minimum Data |
|-------|-------------|
| "Improving" | >=2 attempts both windows; delta >=15% |
| "Persistent weakness" | >=5 attempts; accuracy <60% |
| "Unstable" | >=4 recent attempts; stability <50% |
| "Hint dependent" | >=4 attempts; hint trend increasing; accuracy >=70% |
| "Difficulty sensitive" | >=2 Easy AND >=2 Difficult; gap >=30% |
| Confidence calibration | >=4 confidence-rated attempts |

---

## 5. Signal-to-Behavior Mapping

| Signal | Source | Consumed By |
|--------|--------|-------------|
| Topic accuracy % | `getTopicProgress()[topic].accuracy` | Explain, Progress, Weakness, Study Next, Recovery, Summary |
| Recent accuracy % | `getTopicProgress()[topic].recentPct` | Progress, Readiness |
| Direction | `getTrends()[topic].direction` | Progress, Weakness, Readiness |
| Delta | `getTrends()[topic].delta` | Progress, Weakness |
| Hint trend | `getTrends()[topic].hintTrend` | Progress, Weakness (hint dep.) |
| Stability % | `getTrends()[topic].stability` | Weakness (unstable), Readiness |
| persistentWeak cluster | `getWeaknessClusters()` | Weakness, Study Next (P1), Recovery (P1) |
| improving cluster | `getWeaknessClusters()` | Progress |
| declining cluster | `getWeaknessClusters()` | Weakness, Study Next (P2), Recovery (P2) |
| unstable cluster | `getWeaknessClusters()` | Weakness, Study Next (P3) |
| hintDependent cluster | `getWeaknessClusters()` | Weakness |
| difficultySensitive cluster | `getWeaknessClusters()` | Weakness, Recovery (P4) |
| Confidence calibration | `getConfidenceCalibration()` | Progress |
| Dominant case pattern | `getCasePatternSummary()` | Summary |
| Case pattern trends | `getCasePatternTrends()` | Summary |
| Readiness band (topic) | `getReadinessSummary().topics[]` | Progress |
| Section readiness | `getSectionReadinessSummary()` | Progress |
| Adaptive practice mix | `getAdaptivePracticeMix()` | Study Next (indirect) |
| Recently correct QIDs | `getRecentlySeenByOutcome().correct` | Similar, Recovery, Study Next (exclude) |
| Recently missed QIDs | `getRecentlySeenByOutcome().missed` | Recovery (allowed) |
| Misconception patterns | `misconceptionPatterns[]` | My Mistake, Weakness |
| Defect manifest | `_defectManifest` | Similar, Recovery, Study Next (block) |
| Contested QIDs | `getChallengedQids()` | Similar, Recovery, Study Next (block) |
| Per-QID hint count | `_sessionHints[qid]` | Hint tracking, handoff |

---

## 6. Anti-Leakage Design

### 6.1 Exam Mode Block
`isFullTabBlocked()` returns true when `state.session.mode === 'full'` AND questions loaded. Blocks: explain, wrong-choices, hint, simplify, mymistake, similar, next, recovery. Allowed: progress, weakness, summary.

### 6.2 Mini-Panel Answer Gate
`miniExplain()` requires `state.session.answers[qid] !== undefined` OR `state.session.completed`. Ungated in review mode.

### 6.3 Hint Graduation
5 levels. Only level 4 reveals answer. Levels 0-3 never reference correct answer.

### 6.4 Provenance Surfaces
`_renderReadinessProvenance()`: opt-in toggle, "(debug)" label, "no exam prediction" disclaimer.

### 6.5 Defect & Contest Gating
`_isBlockedByDefectManifest(qid)`, `isQuestionContested(qid)`, topic index limited to `question_state === "Certified"`.

---

## 7. CMA Part 1 Content Vocabulary

**Sections:** A (External Financial Reporting), B (Planning, Budgeting & Forecasting), C (Performance Management), D (Cost Management), E (Internal Controls), F (Technology & Analytics)

**Difficulty:** Easy, Moderate-Easy, Moderate, Difficult, Very Difficult

**Cognitive Levels:** Remember, Understand, Apply, Analyze, Evaluate

**Case Miss Patterns:** evidenceLocation, calculationSetup, exhibitInterpretation, controlJudgment, answerElimination

**Misconception Patterns:** misclassification, variance_sign_confusion, budget_component_error, cost_method_confusion, depreciation_method_error, cash_flow_classification, ratio_misapplication, control_framework_error, general_error

---

## 8. Illustrative Examples (ILLUSTRATIVE ONLY — NOT LIVE COPY)

### Example 1: Hint on Cost Variance MCQ
**Learner action:** Clicks "Hint" (level 0, topic "Cost Variances", Moderate, calculation)

**May:** **Hint 1 of 5 — Metacognitive** — Before diving in, pause: what is this question really testing? It's about **Cost Variances**. What rule governs this area?

### Example 2: Review Missed Case Item
**Learner action:** "My mistake" (picked $45,000, correct $62,500, calculation_setup x3 pattern)

**May:** **You picked A:** "$45,000" — used budgeted rate instead of actual... **Correct: B** "$62,500" — [full explanation]. This fits a pattern — 3 misses involving **calculation setup**.

### Example 3: Progress Insight
**Learner action:** "My progress" (4 sessions, 87 attempts)

**May:** I've tracked 4 sessions and 87 attempts. **Improving:** Budget Development 62%→84% (+22%), Standard Costing 68%→86% (+18%). **Growing independence:** Cost Variances 76%, fewer hints. **Confidence check:** Financial Ratios — self-rating 4.2/5 but accuracy 55%. Slow down and verify.

### Example 4: Study Next
**Learner action:** "What should I study next?" (persistent weak: Cash Flow Classification 42%, 8 attempts)

**May:** I recommend **Cash Flow Classification** next. Start with **P1E-E-037** (Moderate). Your accuracy is 42% after 8 attempts — a focused session here is your most efficient path to improvement.

### Example 5: Weakness Insight
**Learner action:** "Weak areas"

**May:** **Needs focused work:** Transfer Pricing (38%, 7 attempts), Process Costing (45%, 6 attempts). **Inconsistent:** Cost Behavior (62%, stability 35%). **Recurring traps:** Cost method confusion — 4 occurrences across 3 topics. *These are patterns, not judgments.*

---

## 9. Future Implementation Notes (S107+)

### 9.1 Behavior Gaps
| Gap | Current | Desired |
|-----|---------|---------|
| Topic descriptions | ~25 topics covered | Expand to all CMA Part 1 topics |
| Concept hints | Section-level only | Add topic-level concept hints |
| Distractor analysis | Bank text or generic | Analyze learner's specific wrong answer |
| Difficulty in readiness | Field present but unused | Integrate so Easy-only accuracy can't produce "Ready" |
| Confidence in readiness | Insights-only | Add calibrationDelta as readiness signal |
| Case coaching | Per-pattern generic | Personalize with learner's counts and trends |

### 9.2 Potential New Behaviors (Governance Review Required)
- **Concept walkthrough:** Topic teaching independent of any question
- **Formula drill:** Interactive formula recall practice
- **Exam-day briefing:** Topic-specific last-minute review recommendations
- **Confidence coaching:** Directly address calibration gaps
- **Study calendar:** Practice cadence based on readiness gaps

---

*End of tutoring behavior spec. No behaviors changed in S106. Implementation begins S107+.*
