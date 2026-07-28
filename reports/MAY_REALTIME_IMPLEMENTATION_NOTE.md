# May Realtime Implementation Note

**Version:** Alpha 2.0 (Realtime)
**Date:** 2026-07-24
**Session:** 79 — Stage B (post-validation)

---

## What Was Added

The original May alpha (v1.0) supported only post-session review through a dedicated tab. The realtime layer (v2.0) adds in-session capabilities:

### 1. Floating Mini-Panel (`May.renderMiniPanel()`)
- **Location:** Bottom-right corner of the exam view, fixed position, z-index 1000
- **When:** Injected into every MCQ card render via `app.js:renderMCQ()`
- **Appearance:** Collapsible header with May avatar, topic insight tag, expand chevron
- **Expanded state:** Shows QID, topic, difficulty, quick-action buttons, and message area

### 2. Post-Answer Micro-Feedback (`May.showPostAnswerFeedback()`)
- **Trigger:** Immediately after the learner clicks an answer choice (in `app.js` choice handler)
- **Content:** Short, evidence-based, context-sensitive message
  - Correct + high topic accuracy: "Correct. Your recent accuracy on this topic is solid at 82%."
  - Correct + no history: "Correct."
  - Wrong + low topic accuracy: "Not quite. This topic has been challenging (38%). Want a hint?"
  - Wrong + no history: "Not quite. Tap Hint to work through it."
- **Behavior:** Auto-dismisses after 7 seconds. Never uses generic praise.

### 3. Live Hint Mode (`May.miniHint()`)
- **Trigger:** Clicking "Hint" in the mini-panel while viewing an MCQ
- **Behavior:** Same 5-level graduated hint system as the full May view
- **Delivery:** Inline in the mini-panel message area — no tab switch
- **State:** Hint counter (`May.context.hintLevel`) shared between mini-panel and full May view
- **Reset:** `May.resetLiveHints()` called when rendering a new MCQ

### 4. Quick Explanation (`May.miniExplain()`)
- **Trigger:** Clicking "Why?" in the mini-panel
- **Content:** Shows correct answer letter, choice text, and a 250-char snippet of the bank's explanation
- **Purpose:** Fast answer check without leaving the exam

### 5. Progress-at-a-Glance
- **Mini-panel header:** Compact insight tag computed from topic-level data ("Solid on this topic (82%)" / "Tricky topic (45%)" / "Topic accuracy: 67%")
- **Progress button:** Shows top improving and weak topics from weakness clustering
- **Refresh:** Regenerated on each MCQ render (via `renderMiniPanel()`)

---

## Event Triggers

| Event | Method Called | Location in app.js |
|-------|--------------|-------------------|
| New MCQ renders | `May.renderMiniPanel(q)` + `May.resetLiveHints()` | `renderMCQ()` lines 1410, 1413 |
| Learner clicks answer | `May.recordLiveAttempt()` + `May.showPostAnswerFeedback()` | Choice handler lines 1429-1432 |
| Session submitted | `May.handoffCompletedSession()` | `finish()` line 1302 |
| May tab clicked | `May.renderView()` | Tab handler line 3525 |
| Post-session card link | `May.renderView()` | `renderPostSessionCard()` line 3460 |

---

## How Learner State Stays Authoritative

All realtime data flows through a single path:

```
app.js (answer event)
  → May.recordLiveAttempt()
    → MayLearnerState.recordAttempt()
      → localStorage (cmaMayLearnerState)
```

- The mini-panel reads from `MayLearnerState.getTopicProgress()` for its insight tags
- The full May tab reads from `MayLearnerState.getTrends()` and `getWeaknessClusters()`
- No duplicated state. No separate realtime-state stack.
- `recordAttempt()` updates topic aggregates incrementally — insights are always fresh.

---

## How Insight Generation Avoids Fake Trends

May's insight methods follow a strict evidence chain:

```
Stored attempt records (localStorage)
  → _updateTopicAggregate() (incremental)
    → getTopicProgress() (computed from aggregates)
      → getTrends() (delta, stability, hint trend)
        → getWeaknessClusters() (threshold-based buckets)
          → _getProgressInsight() / _getWeaknessInsight() (formatted output)
```

Every number in a May response traces back to a recorded attempt. May never:
- Generates a trend from fewer than 2 attempts
- Reports improvement without a computed delta
- Claims stability without 4+ recent attempts
- Fabricates a percentage that doesn't exist in `topicPerformance`

The mini-panel insight tag follows the same rules: it only shows topic accuracy if `tp.totalAttempts >= 3`.

---

## Mini-Panel vs Full May Tab

| Feature | Mini-Panel | Full May Tab |
|---------|-----------|-------------|
| Context | In-exam, floating | Dedicated view |
| Chat history | Single message area | Full scrollable chat |
| Graduated hints | Yes (5 levels) | Yes (5 levels) |
| Quick actions | Hint, Why?, Progress | 8 buttons + freeform chat |
| Session summary | No | Yes |
| Progress insights | Compact (2-line) | Full (multi-paragraph) |
| Weakness analysis | No | Yes (6 clusters) |
| Recommendations | No | Yes (similar + next) |
| Wrong-choices review | No | Yes |
| Post-answer feedback | Yes (auto) | No |

---

## Limitations of the Realtime Layer

1. **MCQ-only:** The mini-panel is injected only into `renderMCQ()`. Case-study views do not receive it yet.
2. **No keyboard shortcut:** The mini-panel must be clicked to toggle. No `Ctrl+M` shortcut.
3. **No responsive breakpoint:** The fixed 320px panel may overlap content on narrow screens (<400px).
4. **Hint counting:** Hints used in the mini-panel are not currently forwarded to the session tracking (they increment `May.context.hintLevel` but `May.recordLiveAttempt()` always passes `hintsUsed=0` since the app-level answer handler can't know if mini-panel hints were used).
5. **Single question context:** The mini-panel shows only the current MCQ. No case-exhibit context or multi-item navigation.

---

## Next Steps

1. Wire hint usage from mini-panel into `recordLiveAttempt()` so hint counts are tracked in learner state.
2. Add mini-panel to case-study views (`renderCase()`, `renderCaseExam()`).
3. Add `Ctrl+M` keyboard shortcut to toggle the mini-panel.
4. Add recovery-set generation: "May, give me 5 questions on my weakest topic."
5. Add difficulty-contextual hints: different hint strategies for Easy vs. Very Difficult items.
