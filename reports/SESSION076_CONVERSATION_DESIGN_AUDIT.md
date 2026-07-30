# Session 76 — May Conversation Design Audit

**Status:** READ-ONLY Audit  
**Date:** 2026-07-29  
**Scope:** Entire May coaching system (`may-core.js` 6,260 lines, `may-learner-state.js` 2,016 lines, `app.js` integration points)  
**Methodology:** Line-by-line source review of all May response generation logic, pattern matching, UI rendering, and learner interaction paths.

---

## 1. Current Response Architecture

### 1.1 Overview

May is **not a conversational AI**. It is a **rule-based coaching engine** that generates templated responses using question bank data and learner state. The architecture has three tiers:

| Tier | File | Lines | Purpose |
|------|------|-------|---------|
| **Coaching Engine** | `may-core.js` | 6,260 | Response generation, freeform chat dispatch, UI rendering, onboarding flow, safety gating |
| **Data Layer** | `may-learner-state.js` | 2,016 | Cross-session progress tracking, topic aggregation, trends, clusters, readiness modeling |
| **Integration** | `app.js` | ~100 lines (scattered) | Session handoff, live attempt recording, mini-panel rendering, post-answer feedback |

### 1.2 Response Generation Flow

```
User Input (button click or freeform text)
    │
    ├── Button Click → May.handleAction(action, payload)
    │       │
    │       ├── "explain" → _explainAnswer()
    │       ├── "wrong-choices" → _explainWrongChoices()
    │       ├── "hint" → _provideHint()
    │       ├── "simplify" → _simplifyExplanation()
    │       ├── "mymistake" → _explainYourMistake()
    │       ├── "progress" → _getProgressInsight()
    │       ├── "weakness" → _getWeaknessInsight()
    │       ├── "summary" → _summarizeSession()
    │       ├── "similar" → _recommendSimilar()
    │       ├── "next" → _recommendNext()
    │       ├── "recovery" → _generateRecoverySet()
    │       ├── "digest" → _showWeeklyDigest()
    │       ├── "strategy" → _showStudyStrategy()
    │       └── "effectiveness" → _showStrategyEffectiveness()
    │
    └── Freeform Text → May.handleAction("chat", text)
            │
            └── _handleFreeform(text)
                    │
                    ├── Name detection (if unnamed user)
                    ├── Pre-exam commands ("start", "review")
                    ├── Keyword pattern matching (15+ patterns)
                    │   ├── "explain" + "answer" → _explainAnswer()
                    │   ├── "why" + "wrong" → _explainWrongChoices()
                    │   ├── "hint" / "help" / "stuck" → _provideHint()
                    │   ├── "simple" / "break it down" → _simplifyExplanation()
                    │   ├── "another" / "similar" → _recommendSimilar()
                    │   ├── "improving" / "progress" → _getProgressInsight()
                    │   ├── "weak" / "struggling" → _getWeaknessInsight()
                    │   ├── "summary" / "recap" → _summarizeSession()
                    │   ├── "weekly" / "digest" → _showWeeklyDigest()
                    │   ├── "strategy" / "study plan" → _showStudyStrategy()
                    │   ├── "helping" / "effective" → _showStrategyEffectiveness()
                    │   ├── "study" / "recommend" / "next" → _recommendNext()
                    │   ├── "recovery" / "drill" → _generateRecoverySet()
                    │   ├── "my mistake" / "where did i" → _explainYourMistake()
                    │   ├── "hello" / "hi" → Greeting fallback
                    │   ├── "who are you" → Identity response
                    │   └── Challenge phrases → _handleChallenge()
                    │
                    └── Default fallback → "I'm not sure I understood"
```

### 1.3 Data Sources

May draws from these data sources when generating responses:

1. **Question bank content** (stem, choices, CorrectChoice, ExplanationCorrect, ExplanationWrongA-D, Topic, Section, Difficulty)
2. **Learner state** (session history, topic performance, trends, weakness clusters, misconception patterns, confidence calibration)
3. **Current session state** (answers, flags, review queue position)
4. **User profile** (name, session count, exam plan)
5. **Defect manifest** (blocked QIDs for recommendation gating)

### 1.4 Response Construction Pattern

All major responses follow this structure:

1. **Build Phase** — A dedicated `_build*` or `_generate*` function assembles the response into a structured object (sections, lines)
2. **Append Phase** — Three standard augmentations are appended:
   - `_appendNextBestStep()` — Contextual action plan
   - `_appendLearningPatterns()` — Evidence-backed observations
   - `_appendFocusAreas()` — Priority-ranked study suggestions
3. **Guard Phase** — If pilot environment, runs through `_guardedSpeak()` for safety validation
4. **Render Phase** — `_speak()` adds to chat history; `renderView()` redraws the UI

---

## 2. Response Pattern Inventory

### Pattern 1: Explain Answer (`_explainAnswer`)
**Triggers:** Button "Explain answer" or freeform "explain the answer", "why is this correct"  
**Sections:** Short answer → What this is testing → Why the answer works → Common trap → Pattern recognition → Review focus → Topic progress note → Case-specific coaching → Next Best Step → Learning Patterns → Focus Areas  
**Classification:** **Semi-dynamic** — Uses `_buildTutorExplanation()` to extract structured content from the question bank. Heavily templated with question-specific variables substituted. The common trap and pattern recognition are inferred from section/topic heuristics, not genuinely reasoned.  
**Code:** `may-core.js:1723-1812`

### Pattern 2: Wrong Choices Coaching (`_explainWrongChoices`)
**Triggers:** Button "Wrong choices" or freeform "why was that wrong"  
**Sections:** Per-distractor: Why tempting → Why wrong → Misconception to watch → How to avoid next time → Plus "Pulling it together" in review mode  
**Classification:** **Semi-dynamic** — Structured coaching per distractor using `_buildWrongChoiceCoaching()`. Each distractor gets 4 coaching sections. Falls back to section-based generic advice when ExplanationWrong fields are thin. The "why tempting" heuristics are clever but ultimately pattern-matched, not reasoned.  
**Gating:** If question is unanswered and not in review mode, only provides strategy advice (no answer reveal).  
**Code:** `may-core.js:1985-2109`

### Pattern 3: Graduated Hints (`_provideHint`)
**Triggers:** Button "Hint" or freeform "hint", "help", "stuck"  
**Levels:** 0=Metacognitive → 1=Concept → 2=Strategy → 3=Elimination → 4=Full Explain → then resets to 0  
**Classification:** **Scripted** — Each level has 3-4 canned prompt variations selected randomly. No adaptation to the learner's specific error or prior hint requests. Each level is a fixed text pool.  
**Gating:** Case items dispatch to separate `_caseMetacognitiveHint()`, `_caseConceptHint()`, `_caseStrategyHint()`, `_caseEliminationHint()` with case-specific prompt pools.  
**Code:** `may-core.js:2115-2191`

### Pattern 4: Simplify Explanation (`_simplifyExplanation`)
**Triggers:** Button "Simplify" or freeform "make it simpler", "break it down"  
**Sections:** What this means → Why it matters → How to recognize on exam day → Quick rule to remember → (plus correct answer reveal if post-answer/review mode)  
**Classification:** **Semi-dynamic** — Uses `_buildSimplifyCoaching()` with a sophisticated `_simplifyAccountingLanguage()` function that substitutes 35+ accounting terms with plain-language equivalents using regex. The "why it matters", "how to recognize", and "quick rule" sections are section-mapped canned responses.  
**Gating:** If unanswered, concept-only response (no answer reveal).  
**Code:** `may-core.js:2506-2630`

### Pattern 5: My Mistake (`_explainYourMistake`)
**Triggers:** Button "My mistake" or freeform "what did I get wrong", "where did I go wrong"  
**Sections:** What you picked → Why it is wrong → The correct answer → Full explanation → Recurring pattern note  
**Classification:** **Semi-dynamic** — Maps the learner's selected answer to the relevant ExplanationWrong field. If answered correctly, confirms and shows the full explanation. Includes misconception pattern cross-reference.  
**Code:** `may-core.js:2636-2713`

### Pattern 6: Progress Insight (`_getProgressInsight`)
**Triggers:** Button "My progress" or freeform "how am I doing", "improving"  
**Sections:** Session/attempt stats → Improving topics → Growing independence (fewer hints) → Performing under pressure → Well-established topics → Confidence calibration (over/underconfident) → Data sufficiency note  
**Classification:** **Semi-dynamic** — All data-driven from `MayLearnerState`. The insight text is templated but the data selection is evidential. No prediction or readiness estimates — strictly observational.  
**Code:** `may-core.js:2719-2816`

### Pattern 7: Weakness Insight (`_getWeaknessInsight`)
**Triggers:** Button "Weak areas" or freeform "what am I bad at", "struggling"  
**Sections:** Persistent weak → Declining → Unstable → Hint dependent → Difficulty-sensitive → Lowest accuracy → Recurring misconceptions  
**Classification:** **Semi-dynamic** — Evidence-gated data presentation. Each section only appears if the relevant cluster has data. Evidence thresholds enforced.  
**Code:** `may-core.js:2822-2925`

### Pattern 8: Session Summary (`_summarizeSession`)
**Triggers:** Button "Session summary" or freeform "summarize my session"  
**Sections:** Session stats (MCQ and case counts/percentages) → Topic breakdown → Weakest/Strongest this session → Cross-session comparison → Next recommendation  
**Classification:** **Semi-dynamic** — All numbers are computed from the current session object. The `_generateSessionRecap()` function provides a deeper analysis including misconception patterns and progress trends.  
**Code:** `may-core.js:3565-3685`

### Pattern 9: Recommend Similar (`_recommendSimilar`)
**Triggers:** Button "Similar question" or freeform "show me another", "more like this"  
**Sections:** Picks a random certified question on the same topic from the `_topicIndex`, displays QID and stem preview  
**Classification:** **Scripted** — Simple topic-index lookup with random selection and gating against defect manifest and contested QIDs.  
**Code:** `may-core.js:3687-3720`

### Pattern 10: Recommend Next (`_recommendNext`)
**Triggers:** Freeform "what should I study next", "recommend"  
**Sections:** Priority-based: persistent weak > declining > unstable → finds a certified question on that topic with accuracy note  
**Classification:** **Semi-dynamic** — Evidence-driven prioritization from weakness clusters. Outcome-aware: excludes recently-correct items, allows recently-missed items.  
**Code:** `may-core.js:3722-3797`

### Pattern 11: Recovery Set (`_generateRecoverySet`)
**Triggers:** Button "Recovery set" or freeform "build me a drill set"  
**Sections:** Proportional allocation by priority → lists QIDs with topic, section, difficulty → usage instructions  
**Classification:** **Semi-dynamic** — Sophisticated multi-target allocation algorithm. Priority-weighted, outcome-aware filtering.  
**Code:** `may-core.js:3800-3895`

### Pattern 12: Weekly Digest (`_showWeeklyDigest`)
**Triggers:** Button not directly available (freeform "weekly", "digest", "week in review")  
**Sections:** Practice summary → Accuracy trend → Strongest topics → Topics needing attention → Most common misconceptions → Learning momentum → Recommended weekly focus → One small win  
**Classification:** **Semi-dynamic** — Multi-session aggregation with evidence-backed trend analysis. All claims tied to data.  
**Code:** `may-core.js:3048-3329`

### Pattern 13: Study Strategy (`_showStudyStrategy`)
**Triggers:** Freeform "strategy", "study plan", "what should I focus"  
**Sections:** Next session plan → This week → Next 2 weeks → Evidence disclosure  
**Classification:** **Semi-dynamic** — Three-horizon planning from observed data. Every recommendation requires evidence.  
**Code:** `may-core.js:3205-3353`

### Pattern 14: Strategy Effectiveness (`_showStrategyEffectiveness`)
**Triggers:** Freeform "what is helping", "what works"  
**Sections:** Outcome distribution → Recommendations followed by improvement → No clear change → Notes (contradictory) → Previously addressed topics → Recent (past week) → Evidence disclosure  
**Classification:** **Semi-dynamic** — Closed-loop learning: evaluates which recommendation types correlated with improvement. Carefully avoids causal language.  
**Code:** `may-core.js:3362-3509`

### Pattern 15: Post-Answer Feedback (`showPostAnswerFeedback`)
**Triggers:** Automatically when learner selects an answer in live session  
**Sections:** Single-line correct/wrong message with optional topic-accuracy context  
**Classification:** **Scripted** — Simple conditional text. Checks bank verification before displaying Correct/Wrong label. Auto-dismisses after 7 seconds.  
**Code:** `may-core.js:5395-5442`

### Pattern 16: Challenge/Dispute Handling (`_handleChallenge`)
**Triggers:** Freeform "that is wrong", "are you sure", "I think the answer should be..."  
**Sections:** Acknowledgment → Known defective check → Bank answer citation → Student answer extraction → How to resolve → Flag and exclude → Challenge count → Notes on authority  
**Classification:** **Semi-dynamic** — Extracts the student's proposed answer letter using regex. Checks against known DL-030 defects. Flags the QID and excludes from recommendations. Acknowledges limited authority.  
**Code:** `may-core.js:4164-4253`

### Pattern 17: Freeform Chat Default (`_handleFreeform`)
**Triggers:** Any unrecognized freeform input  
**Sections:** Single-line: "I'm not sure I understood — but I can help with this question. Try one of the quick actions below, or ask me to 'explain the answer,' 'give me a hint,' or 'summarize my progress.'"  
**Classification:** **Scripted** — Fixed fallback text. No attempt at understanding or clarification.  
**Code:** `may-core.js:4115`

### Pattern 18: Onboarding / Greeting Flow
**Triggers:** On page load if returning student, or via student roll selection  
**Sections:** Welcome message with session history → Weak areas targeted → Exam-date collection → Days-until-exam calculation  
**Classification:** **Semi-dynamic** — The welcome message is heavily personalized with session count, attempts, weak areas, and improvement trends. Onboarding is a state machine (ASK_RETURNING → SHOW_STUDENT_ROLL → ASK_EXAM_SCHEDULED → ASK_EXAM_PART → ASK_EXAM_DATE → DONE).  
**Code:** `may-core.js:138-453`

---

## 3. Dimension Scores (1–10)

| Dimension | Score | Evidence |
|-----------|-------|----------|
| **Follow-up questions** | **1/10** | May never asks a follow-up question. Every response is terminal — it provides information and waits for the next button press or freeform input. The welcome message ends with "What would you like to do?" but this is an open-ended prompt, not a diagnostic follow-up. The onboarding flow asks sequential questions (exam date, exam part) but these are state-machine driven, not conversationally generated. There is no code path anywhere in the 8,000+ lines that generates a question based on the learner's previous answer. |
| **Context maintenance** | **3/10** | May maintains context through structured state (`context.currentQuestion`, `context.reviewQuestions`, `context.sessionId`), not through conversational memory. The `chatHistory` array stores up to 40 messages for display but is never read back for response generation. May can reference which question is loaded, whether the session is active/completed, the learner's topic performance, and whether the learner has attempted the current question. However, May cannot reference what was said 2 messages ago. Conversations are stateless — each response is generated from current state, not from prior exchange. |
| **Reasoning explanation** | **7/10** | This is May's strongest dimension. The Explain Answer response includes: (1) short answer, (2) what this is testing (topic/section/difficulty), (3) why the answer works (bank explanation + plain-language interpretation), (4) common trap, (5) pattern recognition, (6) review focus. The Wrong Choices coaching provides 4-dimensional analysis for each distractor (why tempting, why wrong, misconception, avoid next time). The Simplify mode translates accounting jargon into plain language. The Next Best Step action plan categorizes errors and prescribes specific remediation. The Weekly Digest and Study Strategy provide evidence-backed recommendations. However, all reasoning is template-based and does not adapt to the specific nuance of the learner's error — it categorizes errors into predefined buckets. |
| **Socratic prompts** | **1/10** | There are zero Socratic prompts in the entire system. The graduated hints come closest: Level 0 ("Before diving into the numbers, pause and ask: what is this question really testing?") uses metacognitive questioning, but these are fixed prompter phrases, not adaptive Socratic dialogue. No code path follows up on a hint with a second question. No code path asks the learner to explain their reasoning and then responds to that reasoning. The system is designed for direct instruction, not guided discovery. |
| **Adaptation to student uncertainty** | **2/10** | May recognizes uncertainty only through keyword matching in freeform: "confused", "don't know", "stuck" all map to Hint. "I don't understand" maps to the default fallback. The freeform handler checks challenge phrases ("that is wrong", "are you sure") and routes to `_handleChallenge()`. But there is no deeper adaptation — no adjusting the difficulty of explanations based on repeated hints, no recognizing when a learner is guessing, no varying the coaching approach when a topic has been explained before without success. The `_liveHintCount` and per-QID `_sessionHints` are tracked but only used for recording, not for adapting the response style. |
| **Next-step guidance** | **8/10** | This is May's second-strongest dimension. The Next Best Step system (`_generateNextBestStep`) classifies errors into 10 categories and prescribes specific actions for each. The Focus Areas system (`_suggestFocusAreas`) aggregates evidence from multiple sources to recommend priority-ranked study targets. The Weekly Digest provides a longitudinal learning review. The Study Strategy creates three-horizon plans (next session / this week / next 2 weeks). The Recovery Set generates prioritized question lists. The adaptive practice mix (`getAdaptivePracticeMix`) recommends MCQ-first, case-first, or mixed modes. Next-step guidance is the most evidence-backed capability in the system. |
| **Response variety** | **4/10** | While there are 15+ distinct response types with different structures, each type has limited internal variation. The metacognitive hints have 4 canned variations. The common trap section has 3-4 canned variations per question type. The "why it matters" sections are fixed per section (A-F). Within a single response type, repeated invocations produce the same template with different variable values. The system never paraphrases or rephrases. It never generates truly novel text. All text is either from the question bank, from fixed template pools, or computed from learner data — never composed. |

---

## 4. Gaps Identified

### 4.1 Critical Gaps (No Existing Capability)

| Gap | Description | Impact |
|-----|------------|--------|
| **No conversational memory** | `chatHistory` stores messages for display only. No function reads back prior exchanges to generate context-aware responses. | Each message is isolated. May cannot say "you mentioned earlier that..." or "based on our conversation..." |
| **No follow-up generation** | Zero code paths that produce a question prompted by the learner's last answer or action. | Coaching is one-directional: information delivery with no dialogue loop. |
| **No Socratic/guided discovery** | All responses deliver direct answers and explanations. No code path prompts the learner to think and then responds to their thinking. | Missed pedagogical opportunity for deeper learning through self-discovery. |
| **No misunderstanding detection** | When freeform input does not match any pattern, a single canned fallback is used. No attempt to disambiguate, rephrase, or ask clarifying questions. | Learners who type something unexpected receive no useful response. |
| **No emotional/affective adaptation** | No detection of frustration, confidence changes, or learning fatigue. | Missed opportunity to provide encouragement when the system detects repeated misses or declining accuracy. |
| **No personalization beyond data** | All personalization is data-driven (topic performance, session count). No adaptation based on learning style, preferred explanation format, or expressed preferences. | All learners get the same template structure regardless of what works best for them. |

### 4.2 Moderate Gaps (Existing Foundation but Underdeveloped)

| Gap | Description | Impact |
|-----|-------------|--------|
| **Calibration data unused in coaching** | `getConfidenceCalibration()` provides rich overconfidence/underconfidence data, but it is only used in the Progress Insight report, not in day-to-day coaching responses. | May could flag overconfidence when the learner answers quickly but gets it wrong. |
| **Difficulty sensitivity not actionable** | `clusters.difficultySensitive` identifies topics where accuracy drops with difficulty, but this is only shown in the Weakness Insight — not used to adjust hint depth or explanation complexity in real-time. | Missed opportunity for difficulty-aware coaching. |
| **Hint-dependency not coached** | `clusters.hintDependent` identifies learners who get right answers only with hints, but no pro-active message encourages independent attempts. | Learners may not realize they are over-relying on hints. |
| **Case-pattern data underutilized** | Rich case miss-pattern analysis exists but only appears in sidebar cards. It does not feed into the "My Mistake" or "Simplify" coaching on case items. | Case coaching could be pattern-aware but currently relies only on generic section mapping. |
| **Outcome tracking is one-directional** | The closed-loop recommendation system tracks outcomes but never surfaces this to the learner (e.g., "last time I suggested X and your accuracy improved by 15%"). | Missed opportunity to build trust and demonstrate May's value. |
| **No concept-prerequisite mapping** | When a learner struggles with a concept, May cannot suggest they review a prerequisite concept. | If a learner fails on flexible budget variance analysis, May cannot suggest reviewing static budget fundamentals first. |

### 4.3 Design Gaps (Structural Limitations)

| Gap | Description | Impact |
|-----|-------------|--------|
| **No multi-turn dialogue state** | The system has no concept of a "conversation." The `greetingState` machine is the only multi-step flow and is purely for onboarding. | Cannot have a sustained tutoring conversation about a single topic. |
| **No response prioritization by urgency** | All coaching responses are equally accessible via buttons. May never interjects with a proactive warning about an urgent weakness. | Learners may miss critical issues. |
| **No tutoring mode toggle** | The `tutoringPilotEnabled` flag exists but defaults to `false` and gates only the safety layer. There is no concept of "guided mode" vs. "quick reference mode." | All responses are high-volume — no lightweight option for quick lookups. |
| **No lesson/course planning** | Strategies are session-based, not curriculum-based. No concept of "you should master Topic A before moving to Topic B." | No structured learning pathway. |

---

## 5. Recommendations

### 5.1 Phase 1 — Foundation (Low Effort, High Impact)

These can be implemented without architectural changes:

1. **Add conversational hooks to response endpoints** — At the end of Explain, Wrong Choices, and My Mistake, append a contextual follow-up question (e.g., "Would you like me to break down why option B was tempting?" or "Do you want to try another question on this topic?"). This requires ~50 lines of new code across 3 functions.

2. **Make the fallback smarter** — Instead of a single canned response, the freeform default should attempt partial matching and offer 2-3 suggested actions based on the words it did recognize. This requires ~30 lines in `_handleFreeform`.

3. **Surface outcome data in coaching** — When recommending a focus area, check the outcome history and add a note like "Your accuracy on this topic improved the last time I recommended it." This requires ~20 lines across `_suggestFocusAreas`.

4. **Add a "Tell me more" action** — After any coaching response, offer a "Tell me more" action that extends the explanation with additional depth (related concepts, prerequisites, real-world applications). This requires ~150 lines for a new `_goDeeper()` function.

### 5.2 Phase 2 — Conversational (Medium Effort, High Impact)

These require structural additions:

5. **Implement a lightweight dialogue state machine** — Track whether the learner is in "explain mode," "practice mode," or "review mode" and adapt response depth. This requires ~100 lines for state tracking and ~50 lines across existing functions to check the mode.

6. **Add Socratic prompting mode** — For conceptual items, add a "Guide me" button that, instead of explaining, asks "What do you think the governing rule is here?" and then responds to the learner's typed answer. This requires ~200 lines for a new `_socraticGuide()` function plus `_respondToLearnerReasoning()`.

7. **Build misunderstanding recovery** — When the learner types something that does not match any pattern, extract keywords and ask "Are you asking about [extracted topic]? Try one of these..." This requires ~40 lines in `_handleFreeform`.

### 5.3 Phase 3 — Tutor-Like (High Effort, Transformative)

These represent a paradigm shift from reference tool to teaching companion:

8. **Implement a full dialogue system** — Replace the current stateless response model with a dialogue context that tracks the last N exchanges, detects topic continuity, and maintains a "teaching objective" per conversation. This is a significant re-architecture (~500 lines).

9. **Add adaptive explanation depth** — Based on the learner's topic accuracy, hint usage, and difficulty sensitivity, vary the depth of explanations automatically. High-accuracy learners get concise reviews; struggling learners get full walkthroughs. This requires ~200 lines.

10. **Build a micro-curriculum engine** — Map topic prerequisites, track mastery, and recommend a structured learning path (not just isolated sessions). This requires ~300 lines plus a prerequisite knowledge graph.

---

## 6. Summary Assessment

May is a **well-engineered, evidence-backed coaching dashboard disguised as a chatbot**. It excels at:
- Structured, multi-section explanations grounded in question bank content
- Data-driven weakness identification and targeted remediation
- Evidence-gated recommendations with threshold enforcement
- Safety-aware response generation (anti-hallucination checks, defect gate compliance)
- Rich learner-state modeling (topics, trends, clusters, calibration)

However, it is **not conversational**. It does not:
- Remember or reference prior exchanges
- Ask follow-up questions
- Adapt its coaching style based on interaction patterns
- Engage in Socratic dialogue
- Handle unexpected input gracefully

The system is a **reference and analytics tool with a chat-like interface**, not a teaching companion that engages in dialogue. The 8,000+ lines of code represent a substantial investment in data modeling and templated coaching — but the next frontier of value lies in making May genuinely interactive rather than purely informative.

---

## 7. Appendix: Code Reference Index

| Function | File | Lines | Purpose |
|----------|------|-------|---------|
| `May.init()` | may-core.js | 66-116 | Initialization, greeting, companion card injection |
| `May.handleAction()` | may-core.js | 1008-1074 | Primary dispatch for all user actions |
| `May._handleFreeform()` | may-core.js | 3975-4116 | Freeform text keyword-matching dispatcher |
| `May._explainAnswer()` | may-core.js | 1723-1812 | Full tutoring explanation |
| `May._buildTutorExplanation()` | may-core.js | 1545-1619 | Structured tutor explanation builder |
| `May._explainWrongChoices()` | may-core.js | 1985-2109 | Per-distractor misconception coaching |
| `May._buildWrongChoiceCoaching()` | may-core.js | 1821-1896 | Wrong-choice coaching structure builder |
| `May._provideHint()` | may-core.js | 2115-2191 | 5-level graduated hint dispatch |
| `May._simplifyExplanation()` | may-core.js | 2506-2630 | Plain-language concept translation |
| `May._explainYourMistake()` | may-core.js | 2636-2713 | Targeted error analysis |
| `May._getProgressInsight()` | may-core.js | 2719-2816 | Multi-section progress report |
| `May._getWeaknessInsight()` | may-core.js | 2822-2925 | Cluster-based weakness analysis |
| `May._summarizeSession()` | may-core.js | 3565-3685 | Completed session breakdown |
| `May._recommendSimilar()` | may-core.js | 3687-3720 | Topic-matched question recommendation |
| `May._recommendNext()` | may-core.js | 3722-3797 | Priority-ranked next-step recommendation |
| `May._generateRecoverySet()` | may-core.js | 3800-3895 | Targeted remediation question set |
| `May._generateWeeklyDigest()` | may-core.js | 3048-3199 | Longitudinal learning review |
| `May._generateStudyStrategy()` | may-core.js | 3205-3306 | Three-horizon study plan |
| `May._generateStrategyEffectiveness()` | may-core.js | 3362-3492 | Recommendation outcome analysis |
| `May._handleChallenge()` | may-core.js | 4164-4247 | Student dispute handling |
| `May.showPostAnswerFeedback()` | may-core.js | 5395-5442 | Live mini-panel feedback |
| `May.renderView()` | may-core.js | 4259-4561 | Full May tab UI |
| `May.renderMiniPanel()` | may-core.js | 5341-5383 | In-session mini-panel |
| `May.handoffCompletedSession()` | may-core.js | 5125-5260 | Post-session setup |
| `May.startSessionReview()` | may-core.js | 5016-5077 | Review queue initialization |
| `MayLearnerState.recordAttempt()` | may-learner-state.js | 98-142 | Per-question attempt recording |
| `MayLearnerState.getTopicProgress()` | may-learner-state.js | 226-237 | Topic-level accuracy aggregation |
| `MayLearnerState.getTrends()` | may-learner-state.js | 240-256 | Cross-session trend computation |
| `MayLearnerState.getWeaknessClusters()` | may-learner-state.js | 259-278 | Multi-dimensional weakness clustering |
| `MayLearnerState.getReadinessSummary()` | may-learner-state.js | 592-827 | Topic and overall readiness modeling |
| `MayLearnerState.getAdaptivePracticeMix()` | may-learner-state.js | 450-587 | Practice mode optimization |
| `MayLearnerState.getLearnerIntelligence()` | may-learner-state.js | 1671-1736 | Unified evidence graph access |
| `MayLearnerState.computeEvidenceGraph()` | may-learner-state.js | 1609-1661 | Shared evidence computation |
| `MayLearnerState.recordRecommendationDelivery()` | may-learner-state.js | 1373-1397 | Closed-loop recommendation tracking |
| `MayLearnerState.classifyPendingOutcomes()` | may-learner-state.js | 1402-1481 | Recommendation outcome classification |
