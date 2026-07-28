# May — Alpha Implementation Note

**Version:** Alpha 1.0
**Date:** 2026-07-24
**Files created:** `may-learner-state.js`, `may-core.js`
**Files modified:** `index_updated.html`, `styles.css`, `app.js`

---

## What May Can Do

### 1. Explanation Mode
- **Explain answer** — Shows the correct answer with the question bank's own `ExplanationCorrect` text, plus topic context and your tracked accuracy on that topic.
- **Explain wrong choices** — Reads each distractor's `ExplanationWrong[A/B/C/D]` field from the bank and presents them individually.
- **Simplify** — Extracts the core sentence from the explanation for a shorter version.

### 2. Graduated Hints (5 levels)
1. **Metacognitive** — Prompts you to identify the concept being tested.
2. **Concept reminder** — Recalls the governing principle or rule for that section/topic.
3. **Strategy** — Suggests a step-by-step approach (formula then calculate, or eliminate then decide).
4. **Elimination** — Points out absolute-language distractors or suggests narrowing from 4 to 2.
5. **Full explanation** — Falls through to the complete answer explanation.

### 3. Progress Insight (topic-level, cross-session)
May tracks every question attempt across sessions and computes:
- **Topic accuracy** — Overall and recent (last 5 attempts)
- **Hint dependency** — Rising/falling hint usage per topic
- **Stability** — Consistency of recent answers (low variance = stable)
- **Difficulty sensitivity** — Accuracy drop-off between easy and hard items
- **Improvement delta** — Recent accuracy vs. baseline accuracy
- **Declining topics** — Areas where accuracy is trending down

### 4. Weakness Analysis
May classifies topics into clusters:
- **Persistent weak** — Below 60% with 5+ attempts
- **Improving** — +15% or more recent delta
- **Declining** — -15% or more recent delta
- **Unstable** — Accuracy fluctuates between attempts
- **Hint-dependent** — Accuracy OK but hint use rising
- **Difficulty-sensitive** — Good on easy, drops on hard

### 5. Recommendation
- **Similar question** — Finds another Certified question on the same topic from the bank.
- **Next to study** — Prioritizes: persistent weak > declining > unstable topics, then recommends a Certified MCQ.

### 6. Session Summary
After each session, May records:
- Per-question attempt records (QID, section, topic, correct/incorrect, hints, time)
- Topic-level aggregates updated cumulatively
- Session-level scores and topic snapshots

---

## How Progress Is Tracked

### Storage
All learner state is stored in `localStorage` under key `cmaMayLearnerState`. This is separate from the existing session save system (`cmaP1SessionState`) and persists across browser sessions.

### Data Model
```
MayLearnerState (localStorage)
├── learnerId
├── sessions[]
│   ├── sessionId, date, mode
│   ├── scaledScore, mcqPct, casePct, grade, passed
│   └── attempts[]
│       ├── questionId, section, topic, subtopic
│       ├── difficulty, difficultyScore
│       ├── correct, hintsUsed, explanationRequested
│       ├── elapsedMs, selectedChoice
│       └── timestamp
├── topicPerformance{}   ← cumulative aggregates
├── subtopicPerformance{}
├── misconceptionPatterns[]
├── recommendationLog[]
└── sessionSummaries[]
```

### When Data Is Recorded
- **Per-question**: When you click an answer choice during a live session (`May.recordLiveAttempt()`)
- **Per-session**: On session submit (`May.handoffCompletedSession()`)
- Topic aggregates are updated incrementally on every attempt

---

## What Is Currently Topic-Aware

May extracts topic from the question's `Topic` field, normalizing it by stripping number prefixes (e.g., `"A.001 balance sheet current classification"` → `"balance sheet current classification"`). Subtopic-level tracking is supported in the data model via `MicroTopic` but not yet surfaced in the UI.

All six CMA Part 1 sections are tracked. Difficulty levels and cognitive levels are captured per attempt for future analysis.

---

## What Remains Alpha / Approximate

| Area | Status | Notes |
|------|--------|-------|
| **Misconception patterns** | Basic | Uses keyword heuristics on topic name; does not yet analyse distractor text for specific error types |
| **Subtopic tracking** | Data only | Stored but not surfaced in progress insights |
| **Difficulty sensitivity** | Works | Compares easy/moderate vs. difficult/very-difficult within a topic |
| **Time analysis** | Captured | Per-question elapsed time is stored but not yet used in insights |
| **Case study support** | Limited | Case items are recorded but May's question-level review is MCQ-oriented |
| **Cognitive level analysis** | Captured | Stored per attempt but not yet analysed for patterns |
| **Confidence calibration** | Partial | Confidence rating stored but not used for overconfidence/underconfidence detection |
| **Recommendation diversity** | Basic | Avoids recently seen QIDs but doesn't yet balance across sections |
| **Dark theme** | Partial | May's UI has basic dark theme support |

---

## Next Recommended Improvements

1. **In-session May access** — Add a "Ask May" button on each MCQ card so the learner can consult May without leaving the exam view.
2. **Misconception pattern refinement** — Analyse distractor text for specific error types (sign errors, classification swaps, formula selection) to give more precise feedback.
3. **Subtopic surfacing** — Show subtopic-level patterns in the progress insight cards.
4. **Confidence calibration** — Detect overconfidence (high confidence + wrong) and underconfidence (low confidence + correct).
5. **Case item review** — Extend May's question context to support case items with exhibit references.
6. **Recovery sets** — Generate a targeted 10-question set from the weakest topics for post-session or between-session practice.
7. **Stretch recommendations** — After a topic stabilizes, recommend a higher-difficulty variant.
8. **Export/import** — Allow exporting learner state as JSON for backup or transfer.
9. **Session timeline** — Visual timeline of accuracy over sessions for each topic.

---

## Architecture Notes

### File Dependency Order
```
may-learner-state.js  ← no dependencies (standalone)
may-core.js           ← depends on MayLearnerState, MCQ_BANK_A-E, state, scoreMCQ, ExamSessionManager
app.js                ← calls May.recordLiveAttempt(), May.handoffCompletedSession()
```

May is designed to be resilient to missing dependencies. All cross-module calls are guarded with `typeof X !== 'undefined'` checks.

### Existing ReviewCoach Preservation
The existing `ReviewCoach` class in `app.js` is preserved as a fallback. If `may-core.js` fails to load, the tab click handler falls through to `ReviewCoach.renderFullCoach()`.

### Governance Alignment
- **Certified-first**: May's recommendation engine filters by `question_state === "Certified"` and labels lower-trust items.
- **No answer-key mutation**: May reads from the bank but never writes to it.
- **Evidence-only feedback**: Every insight is computed from tracked data. May never invents trends or performance.
