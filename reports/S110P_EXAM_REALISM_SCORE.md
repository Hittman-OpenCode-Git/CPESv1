# S110P — CMA Exam Realism Score

**Session:** 110P
**Date:** 2026-07-31
**Score Date:** 2026-07-31

---

## Exam Realism Composite: 72/100

### Score Breakdown

| Category | Weight | Score | Weighted | Grade |
|----------|--------|-------|----------|-------|
| Answer Interface | 15% | 60 | 9.0 | C |
| Navigation & Flow | 15% | 75 | 11.25 | B |
| Timer & Pacing | 10% | 85 | 8.5 | A |
| Flagging & Review | 10% | 70 | 7.0 | C |
| Case Study Interface | 15% | 80 | 12.0 | B |
| Scoring & Results | 10% | 90 | 9.0 | A |
| Keyboard/Accessibility | 10% | 50 | 5.0 | F |
| Visual Authenticity | 5% | 75 | 3.75 | B |
| Session Management | 5% | 95 | 4.75 | A |
| Calculator | 5% | 60 | 3.0 | C |
| **TOTAL** | **100%** | — | **72.25** | **B-** |

---

## Category Details

### 1. Answer Interface — 60/100 (C)

| Criteria | Score | Notes |
|----------|-------|-------|
| Click to select | ✓ 10/10 | Standard `<button>` elements work well |
| Letter key selection | ✗ 0/10 | Missing — critical CMA exam behavior |
| Choice elimination | ✗ 0/10 | Missing — strikethrough is fundamental |
| Visual selection feedback | 8/10 | Highlight works but no transition animation |
| Choice layout (A-D vertical) | 10/10 | Matches CMA format |
| Answer confirmation needed? | 8/10 | No confirmation on answer change — could be intentional (CMA allows changing) |
| Post-answer feedback (exam mode) | 10/10 | Correctly shows NO feedback during exam — like real CMA |
| Confidence rating | 8/10 | CMA doesn't have this — good for practice, not exam |

**What's needed:** Letter keys (A/B/C/D) and strikethrough — these are the two most important gaps.

---

### 2. Navigation & Flow — 75/100 (B)

| Criteria | Score | Notes |
|----------|-------|-------|
| MCQ→MCQ navigation | 10/10 | Next/Previous + Arrow keys + Navigator grid |
| MCQ→Case transition | 8/10 | Auto-transition works but can't go back to MCQs from case via Previous |
| Case→Case navigation | 9/10 | Previous/Next case buttons + Navigator |
| Case task navigation | 10/10 | Task-by-task with exhibit tabs in full mode — excellent |
| Direct jump to any question | 10/10 | Navigator grid with visual state indicators |
| Review screen availability | 8/10 | "Review / Submit" button at last item |
| Back from review to items | 10/10 | "Back to Items" returns to correct position |
| Navigator performance | 6/10 | Entire navigator grid rebuilt on every question transition — expensive |

**What's needed:** Case→MCQ backward navigation, filter tabs on review screen.

---

### 3. Timer & Pacing — 85/100 (A)

| Criteria | Score | Notes |
|----------|-------|-------|
| Countdown timer | 10/10 | HH:MM:SS display with danger/warning states |
| Timer bar (visual pacing) | 9/10 | Percentage bar — good visual feedback |
| Time warnings | 8/10 | 30/10/5 min warnings — good, missing 1-min warning |
| Auto-submit on expiry | 10/10 | Correct CMA behavior |
| Pause for practice | 9/10 | Pause with overlay + disclaimer |
| Real conditions mode | 10/10 | Disables pause, authentic |
| Session duration calculation | 8/10 | 108s/MCQ + 30min/case is reasonable |
| Timer hide toggle | ✗ 0/10 | Timer always visible — some candidates want to hide it |
| Timer in cases | 10/10 | Case views also show timer — correct |

**What's needed:** Optional timer hide, 1-minute warning.

---

### 4. Flagging & Review — 70/100 (C)

| Criteria | Score | Notes |
|----------|-------|-------|
| Flag button availability | 6/10 | Checkbox works but not a prominent flag icon |
| Navigator flag indicator | 10/10 | Orange indicator on flagged items — excellent |
| Flagged count display | 8/10 | Shows on navigator and review screen |
| Review Flagged Only (pre-submit) | ✗ 0/10 | Missing — only available post-submission |
| Review All (pre-submit) | 10/10 | Full item table with status |
| Flag persistence | 10/10 | Persisted to session state |
| Case item flagging | 8/10 | Works but not shown in Navigator sidebar counts |

**What's needed:** "Review Flagged Only" filter on pre-submit review screen, more prominent flag button.

---

### 5. Case Study Interface — 80/100 (B)

| Criteria | Score | Notes |
|----------|-------|-------|
| Split screen (exhibits + items) | 10/10 | Left exhibits, right items — matches CMA |
| Exhibit tab navigation | 10/10 | Tab-based exhibit switching in full mode |
| Task-by-task navigation | 10/10 | One task per screen in full mode |
| All-in-one review mode | 8/10 | Scrollable for practice — good for review |
| Exhibit data rendering | 9/10 | Tables with headers, text bodies — clean |
| Case scenario presentation | 9/10 | Business scenario text with context |
| Exhibit accessibility | 5/10 | No tablist/tabpanel ARIA pattern |
| Zoom/expand exhibits | ✗ 0/10 | Cannot expand exhibits to full screen |
| Case scoring | 10/10 | Same logic as MCQ — consistent |
| Case item types | 9/10 | numeric, select, multi, fill, match — comprehensive |

**What's needed:** ARIA tablist pattern, exhibit expand capability.

---

### 6. Scoring & Results — 90/100 (A)

| Criteria | Score | Notes |
|----------|-------|-------|
| 0-500 scaled score | 10/10 | Correct CMA scale |
| 360 passing threshold | 10/10 | Correct CMA passing score |
| 75/25 MCQ/CBQ weighting | 10/10 | Matches CMA structural rules |
| Grade bands | 9/10 | Strong Pass/Passing/Near Pass/Needs Review — clear |
| Section breakdown | 10/10 | Weakest→Strongest sorted grid |
| Topic breakdown | 9/10 | Detailed per-topic tiles |
| Remediation plan | 10/10 | 6-rule evidence-backed plan |
| Adaptive review queue | 10/10 | Priority-scored with filters |
| CMA scoring disclaimer | 10/10 | Full disclaimer present — transparent |
| Difficulty calibration | 8/10 | 3 presets — limited but sensible |
| MCQ gate (full exam) | 10/10 | 50% threshold blocks case access — realistic |
| Export results | ✗ 0/10 | No print/PDF export |

**What's needed:** Export/print results.

---

### 7. Keyboard & Accessibility — 50/100 (F)

| Criteria | Score | Notes |
|----------|-------|-------|
| ARIA roles on calculator | 10/10 | role="application", labeled display |
| ARIA on choices | 8/10 | role="radio", aria-checked works |
| ARIA on navigator | 8/10 | role="navigation", labeled |
| ARIA on modals | 7/10 | Recovery modal has role="dialog"; pause overlay does not |
| Tab order | 6/10 | Calculator display tabbable, buttons not — inconsistent |
| Letter key answer selection | ✗ 0/10 | Missing |
| Keyboard choice activation | ✗ 0/10 | Enter/Space don't work on focused choice |
| Skip-to-content | ✗ 0/10 | No bypass mechanism |
| ARIA live regions | ✗ 0/10 | No dynamic announcements |
| Keyboard shortcuts documented | ✗ 0/10 | Undiscoverable |
| Screen reader compatibility | 5/10 | Some ARIA, but critical gaps for SR users |
| Color contrast | 8/10 | CSS variables provide good contrast in both themes |
| Focus management | 6/10 | Focus not explicitly set after answering |

**What's needed:** Letter keys, Enter/Space choice activation, skip link, live regions, shortcut docs, tabpanel pattern for case exhibits.

---

### 8. Visual Authenticity — 75/100 (B)

| Criteria | Score | Notes |
|----------|-------|-------|
| Professional design | 8/10 | CMA-style color scheme (blue/navy) |
| Light/dark theme | 9/10 | Both themes with CSS variables |
| Responsive layout | 10/10 | CSS grid/flex, works on mobile |
| Choice button styling | 7/10 | Clean but could benefit from hover/active micro-interactions |
| Timer display | 8/10 | Clear, appropriately positioned |
| Score report layout | 8/10 | Well-structured, scannable |
| Metadata pills | 10/10 | Section, Topic, Difficulty, LOSTag — excellent |
| Typography | 8/10 | System font stack, clean |
| Visual density | 7/10 | Some views are text-heavy (dashboard, history) |

**What's needed:** Chart visualizations for dashboard, theme transition animation.

---

### 9. Session Management — 95/100 (A)

| Criteria | Score | Notes |
|----------|-------|-------|
| Session persistence | 10/10 | 7-layer system: save, checkpoints, journal, verification |
| Recovery on reload | 10/10 | Recovery modal, resume/discard |
| Auto-save | 10/10 | Every 5 seconds + on every action |
| Session journal | 10/10 | Append-only action log |
| History | 8/10 | 100 entries, detailed metadata |
| Dashboard | 9/10 | All-time stats with trends |
| Session setup | 8/10 | Configurable but checkbox-heavy |
| Session clearing | 10/10 | Clear session on submit, clear history function |

**What's needed:** Unlimited history, export function.

---

### 10. Calculator — 60/100 (C)

| Criteria | Score | Notes |
|----------|-------|-------|
| Calculator present | 10/10 | On-screen calculator exists |
| Basic arithmetic | 10/10 | +, -, *, /, parentheses |
| Scientific functions | 8/10 | %, sqrt, x², 1/x, +/- |
| Memory functions | 8/10 | M+, M-, MR, MC |
| Custom parser | 10/10 | Hand-written recursive descent — no eval() |
| Draggable | 8/10 | Drag handle works |
| Minimizable | 8/10 | Toggle minimize works |
| Position preservation | ✗ 0/10 | Resets on every question transition |
| Keyboard integration | 8/10 | Digits/operators work when focused |
| Financial functions | ✗ 0/10 | No NPV, IRR — basic scientific only |
| Docked position option | ✗ 0/10 | Only floats |

**What's needed:** Position preservation, docked option.

---

## Historical Trend

| Category | Score | Change Since Last |
|----------|-------|-------------------|
| Overall | 72/100 | Baseline (first audit) |
| Answer Interface | 60 | — |
| Navigation | 75 | — |
| Timer | 85 | — |
| Flagging | 70 | — |
| Cases | 80 | — |
| Scoring | 90 | — |
| Accessibility | 50 | — |
| Visual | 75 | — |
| Session Mgmt | 95 | — |
| Calculator | 60 | — |

---

## What a 90+ Looks Like

To reach 90/100 exam realism, the following would need to be implemented:

1. **Answer Interface** (60→90): Letter keys, strikethrough, choice micro-animations
2. **Flagging** (70→90): Review Flagged pre-submit, prominent flag button, case flag integration with Navigator
3. **Accessibility** (50→85): Full keyboard operability, ARIA live regions, skip link, shortcut docs, focus management
4. **Calculator** (60→80): Position preservation, docked mode, calculator memory persistence

**Estimated effort:** ~10 sessions of focused UI work
**Estimated realism score after:** 90/100

---

## Verdict

The CMA Part 1 2026 Practice Simulator scores **72/100** on exam realism — a solid **B-**. The core exam architecture is strong (scoring, timer, case interface, session management all score A/B) but the interaction layer has two critical gaps (letter keys, strikethrough) and the accessibility layer needs significant work (scoring F). These are all fixable without touching content.
