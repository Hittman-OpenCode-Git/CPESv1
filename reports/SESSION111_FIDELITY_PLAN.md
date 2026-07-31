# SESSION111 — CMA Interaction Fidelity Wave 1 — Implementation Plan

**Session:** 111
**Governance Lane:** Full
**Source Analysis:** S110P (72/100 Exam Realism Score)
**Date:** 2026-07-31

## Objective

Implement the three highest-impact interaction fidelity improvements from S110P: choice strikethrough, keyboard answer selection, and pre-submit review filters. Zero pack/case/content/scoring/May changes.

## Feature 1 — Choice Strikethrough

**Files:** `app.js`, `styles.css`

### Implementation:
1. **Session state:** Add `struckChoices: {}` to session init object (per QID → {A: true, B: false, ...})
2. **renderMCQ:** Add `struck` CSS class to choice buttons based on `s.struckChoices[qid][letter]`
3. **renderMCQ:** Add `contextmenu` (right-click) event listener on each choice button that toggles struck state
4. **CSS:** Add `.choice.struck` style: text-decoration: line-through, opacity: 0.5, pointer-events: none (for click-to-select)
5. **Persist:** Through localStorage save/restore automatically (JSON serialization)

### Verification:
- Right-click choice → strikethrough applied
- Navigate away and back → strikethrough persists
- Strikethrough persists through review screen
- Struck choice cannot be clicked to select (or toggled back with another right-click)

## Feature 2 — Keyboard Answer Selection

**Files:** `app.js`, `styles.css`

### Implementation:
1. **Keyboard handler:** Add A/B/C/D key handling in the ~L4295 keyboard listener
2. **Guard:** Only on MCQ view (`s.qIndex < s.mcqs.length`), only when not focused on INPUT/TEXTAREA/SELECT
3. **Action:** Simulate choice button click when A/B/C/D is pressed
4. **Tooltip:** Add a small keyboard shortcut hint below choices: `"Keyboard: A–D to select, M to flag, N/P to navigate"`

### Verification:
- A/B/C/D keys select corresponding choices during MCQ
- Keys do nothing in case view
- Keys do nothing when text field focused
- Tooltip visible

## Feature 3 — Review Flagged Only (Pre-Submit)

**Files:** `app.js`

### Implementation:
1. **renderReviewScreen:** Add filter buttons: "Review All", "Review Unanswered", "Review Flagged"
2. **Filter logic:** Toggle row visibility via CSS or filter map() based on active filter
3. **Navigator:** Add filter buttons to NavigationController.html() to filter nav grid buttons
4. **State:** Use `data-filter` attribute + JS to show/hide matching rows/buttons

### Verification:
- Review screen shows all items by default
- "Unanswered" shows only items with no answer
- "Flagged" shows only items with flag marked
- Navigator buttons filtered accordingly
- Filter persists on re-render of review screen

## Non-Goals
- No pack file edits
- No case file edits
- No May logic changes
- No answer-key changes
- No scoring changes
- No content changes

## Risk Assessment
- **Feature 1:** Low — pure UI overlay, zero content/timing/scoring interaction
- **Feature 2:** Low — keyboard handler already filters text fields; A/B/C/D are unused in existing handler
- **Feature 3:** Low — filter logic is display-only; no impact on submission or scoring
