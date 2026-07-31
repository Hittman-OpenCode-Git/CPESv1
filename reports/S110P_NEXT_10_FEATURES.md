# S110P — Top 10 Features: Detailed Specification

**Session:** 110P
**Date:** 2026-07-31

---

## Feature 1: Choice Strikethrough (Right-Click Elimination)

**Priority:** P0 — Critical Exam Fidelity
**Score:** 37.0

### Current Behavior
- Choice buttons are click-only; no way to visually eliminate wrong choices
- Candidate must hold eliminations in working memory

### Spec
```
Trigger: Right-click OR long-press (mobile) OR Backspace key on focused choice
Behavior: Toggle .strikethrough class on the choice button
Visual: Line-through on text, reduced opacity, non-clickable (for answer submission)*
State: Per-question, volatile (resets on navigating away or re-rendering same question)

*Clicking a strikethrough'd choice un-strikethroughs it and selects it.
 Strikethrough only removes the choice if the user right-clicks.
```

### Implementation
- `renderMCQ()`: Add right-click event listener to `.choice` buttons (app.js ~line 1734)
- `styles.css`: Add `.choice.strikethrough` CSS with `text-decoration: line-through`, opacity 0.4
- Store strikethrough state per question in `s.strikethrough[q.QuestionID] = Set` (Set of letters)
- Clear strikethrough Set on question change
- Do NOT persist strikethrough state to localStorage (exam feature, not study feature)

### Files
- `app.js`: keyboard handler + renderMCQ right-click handler
- `styles.css`: .strikethrough class

---

## Feature 2: A/B/C/D Letter Key Answer Selection

**Priority:** P0 — Critical Exam Fidelity
**Score:** 36.5

### Current Behavior
- MCQ choices are click-only; must use mouse to select

### Spec
```
Trigger: A, B, C, D keys (case-insensitive)
Context: Only during MCQ exam when no INPUT/TEXTAREA/SELECT is focused
         AND calculator is minimized or not focused
         AND not when ctrlKey/metaKey/altKey is held
Behavior: Same as clicking the choice button (selects answer, scores, re-renders)
```

### Implementation
- `app.js`: Add to global keyboard handler at line 4157
- Gate on `state.session && !state.session.completed` and mcq-mode check
- Map 'a' → data-choice="A", 'b' → 'B', etc.
- Call the same handler as the click event

### Files
- `app.js`: keyboard handler (add ~15 lines)

---

## Feature 3: Review Flagged Items Only (Pre-Submit)

**Priority:** P1
**Score:** 31.5

### Current Behavior
- Review screen shows all items
- No filter tabs — only post-submission Adaptive Review Queue has "Marked Only"

### Spec
```
Add filter tabs to renderReviewScreen():
- All Items (default)
- Unanswered Only
- Flagged Only

Tabs are pill-style buttons above the review table
Clicking a tab re-renders the review table with filtered rows
Filter state is local (does not persist)
```

### Implementation
- `app.js` `renderReviewScreen()` (line 2042): Add filter bar with 3 pill buttons
- Filter logic: `items.filter(i => ...)` based on active filter
- Re-render review table rows

### Files
- `app.js`: renderReviewScreen()
- `styles.css`: filter tab styles

---

## Feature 4: Submit Confirmation Dialog

**Priority:** P1
**Score:** 29.0

### Current Behavior
- "Submit Session" button immediately calls `finish()` with no confirmation

### Spec
```
When "Submit Session" is clicked:
  1. Show modal: "Submit Your Session?"
     - Warning: "You cannot change your answers after submission."
     - Unanswered count: "You have X unanswered questions."
     - Buttons: "Cancel" / "Submit Session"
  2. "Cancel" → close modal
  3. "Submit Session" → call finish()
  4. Escape key → close modal

Only skip confirmation if ALL items are answered AND zero flagged
```

### Implementation
- `app.js`: Wrap `finish()` call in `renderReviewScreen()` with confirmation check
- Reuse pause overlay modal pattern for styling

### Files
- `app.js`: renderReviewScreen() + new confirmSubmit() wrapper
- `styles.css`: Reuse existing modal classes

---

## Feature 5: Keyboard Shortcut Reference in UI

**Priority:** P1
**Score:** 24.5

### Current Behavior
- Keyboard shortcuts exist but are completely undiscoverable

### Spec
```
Add a "?" icon button in the exam toolbar (next to timer/pause)
Clicking or pressing "?" opens a small popover with:
  - A/B/C/D → Select answer
  - → / n → Next question
  - ← / p → Previous question
  - m → Toggle flag
  - c / g → Calculator
  - Esc → Pause (when enabled)
  - Right-click → Strike through choice
  - ? → This reference

Popover dismisses on click-away, Escape, or re-click "?"
```

### Implementation
- `app.js` renderMCQ: Add shortcut reference button + popover HTML
- `styles.css`: Popover styles

### Files
- `app.js`: ~20 lines of HTML
- `styles.css`: .shortcut-popover

---

## Feature 6: "All Wrong Choices Explained" Default-Expanded

**Priority:** P1
**Score:** 23.5

### Current Behavior
- In Adaptive Review Queue cards, "All wrong choices explained" is collapsed by default
- Most learners will never expand it — losing the educational value of distractor explanations

### Spec
```
Default state: EXPANDED (not collapsed)
Label change: "All wrong choices explained" → "Why each choice is right or wrong"
Collapse on click (toggle)
```

### Implementation
- `app.js`: Remove `style="display:none"` default, change default open state
- Reverses current behavior

### Files
- `app.js`: Review card HTML (~line 2620 area)

---

## Feature 7: Recovery Sprint Results Comparison Card

**Priority:** P2
**Score:** 22.5

### Current Behavior
- Recovery Sprint creates a new session with 15 MCQs but shows the same generic score report
- No comparison between source session and sprint performance

### Spec
```
When session.mode === 'recovery_sprint' AND session.recoverySource exists:
  On score report, show a "Recovery Sprint Results" card:
    - Source session: date, score, weak topics
    - Sprint session: score, topics attempted
    - Improvement: per-topic delta (sprint vs source session on same topics)
    - "Areas improving" / "Areas still weak" split
    - "Time to next sprint" suggestion
```

### Implementation
- `app.js`: New `_renderRecoverySprintResultsCard(sourceSession, sprintSession)` in renderSummary()
- Cross-reference topic performance between source and sprint session history

### Files
- `app.js`: renderSummary() + new helper
- `styles.css`: Results card styles

---

## Feature 8: Confidence & Metacognition Dashboard

**Priority:** P2
**Score:** 22.0

### Current Behavior
- Confidence data collected per-question (1-5 scale)
- Confidence mismatch detection (high confidence + wrong answer)
- But no standalone dashboard visualization

### Spec
```
Add to dashboardView OR as a May sidebar card:
  Confidence Calibration Chart:
    - Per-topic: average confidence vs actual accuracy
    - Highlight topics where confidence exceeds accuracy (overconfident)
    - Highlight topics where accuracy exceeds confidence (underconfident)
  
  Guessing Impact:
    - % of questions guessed correctly vs incorrectly
    - Topics where guessing is most frequent
  
  Confidence Trend:
    - Is the learner becoming better calibrated over sessions?

Consume data from AnalyticsCollector + May learner state
```

### Implementation
- New file: `may-confidence-dashboard.js` (~200 lines) — optional, could live in app.js or may-core.js
- Data already exists in localStorage (cmaP1History2026, cmaMayLearnerState)

### Files
- `may-core.js` or new `may-confidence-dashboard.js`
- `styles.css`: chart/visualization styles

---

## Feature 9: Navigate Back to MCQs from Case View

**Priority:** P2
**Score:** 22.0

### Current Behavior
- From case view, "Previous" navigates to the previous case (or previous case task in full mode)
- Cannot go back to the last MCQ from case view using Previous button
- Must use Navigator sidebar buttons to jump to MCQs

### Spec
```
When at first case (caseIndex === 0) in case view:
  "Previous" button should navigate to the LAST MCQ (qIndex = mcqs.length - 1)
  Button label: "Back to MCQs" instead of "Previous"

This mirrors the CMA exam behavior: candidates can navigate between MCQ and case sections.
```

### Implementation
- `app.js`: In case navigation handler (line 2021-2039), check for caseIndex === 0
- If true, set qIndex = mcqs.length - 1, save, render()

### Files
- `app.js`: case navigation handler

---

## Feature 10: Setup Presets (Quick Configuration)

**Priority:** P2
**Score:** 21.5

### Current Behavior
- Setup form requires manual selection of 5 pack checkboxes and 6 section checkboxes
- No way to quickly configure common study patterns

### Spec
```
Add preset buttons above the pack/section checkboxes:
  "Study All" — all packs, all sections (current default)
  "Focus: Financial Reporting (A)" — all packs, Section A only
  "Focus: Cost Management (D)" — all packs, Section D only
  "My Weakest Areas" — all packs, sections where accuracy < 60% (from May learner state)
  "Random Mix" — 2 random packs, 3 random sections

Clicking a preset updates checkboxes and the difficulty slider
Presets are suggestions, not locked configurations
```

### Implementation
- `index_updated.html`: Add preset button row
- `app.js`: New `applyPreset(name)` function, called from preset button onclick
- Read weakest areas from May learner state (if available)

### Files
- `index_updated.html`: preset buttons HTML
- `app.js`: applyPreset() function
- `styles.css`: preset button styles

---

## Summary Table

| # | Feature | Effort | Files | Risk | Time Est. |
|---|---------|--------|-------|------|-----------|
| 1 | Strikethrough | 3-4h | app.js, styles.css | Low | 1 session |
| 2 | Letter keys | 1-2h | app.js | Low | 1 session |
| 3 | Review Flagged pre-submit | 2-3h | app.js, styles.css | Low | 1 session |
| 4 | Submit confirmation | 0.5h | app.js | Low | Same session as #3 |
| 5 | Keyboard docs | 1h | app.js, styles.css | Low | Same session as #2 |
| 6 | Wrong choices open | 0.5h | app.js | Low | Quick fix |
| 7 | Recovery Sprint results | 3-4h | app.js, styles.css | Medium | 1 session |
| 8 | Confidence Dashboard | 4-6h | may-core.js, styles.css | Medium | 1-2 sessions |
| 9 | Case→MCQ navigation | 1h | app.js | Low | Quick fix |
| 10 | Setup presets | 2-3h | index_updated.html, app.js | Low | 1 session |

**Estimated total execution:** 4-6 sessions for all 10 features (2-3 for Tier 1, 2-3 for Tier 2)
