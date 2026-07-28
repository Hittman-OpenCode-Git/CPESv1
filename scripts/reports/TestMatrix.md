# Test Matrix — CMA Part 1 Practice Simulator RC1

**Date:** 2026-07-21
**Application Version:** v5.7 (RC1)

## 1. Exam Mode Matrix

| Mode | Timer | MCQ | Cases | Navigator | Calculator | Review Screen | Score Report | Status |
|---|---|---|---|---|---|---|---|---|
| **Full Exam** (100 MCQ + 2 case) | 4:00:00 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| **MCQ Practice** | 108s × count | ✓ | — | ✓ | ✓ | ✓ | ✓ | PASS |
| **Case Practice** | 30min × count | — | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| **Mixed** | 108s×MCQ + 30min×case | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| **Resume Session** | Restored | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| **Untimed (implied)** | Large count → long timer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |

## 2. Navigation Matrix

| Action | Source | Target | Expected Behavior | Status |
|---|---|---|---|---|
| **Next** | MCQ view | Next MCQ / First case / Review | Advances qIndex, re-renders | PASS |
| **Previous** | MCQ view | Previous MCQ | Decrements qIndex | PASS |
| **Next (last MCQ before case)** | Last MCQ | First case | Renders case | PASS |
| **Previous (first MCQ)** | First MCQ | Stays | Button disabled | PASS |
| **Navigator jump (MCQ)** | Navigator grid | Specific MCQ | Sets qIndex, renders | PASS |
| **Navigator jump (Case)** | Navigator grid | Case view | Dispatches to case | PASS |
| **Review Screen** | Navigator button | Review table | RenderReviewScreen | PASS |
| **Back to Items** | Review screen | Last viewed item | Renders last view | PASS |
| **Submit** | Review screen | Score report | finish() called | PASS |
| **Mark for review** | MCQ checkbox | Toggle flag | State + visual updated | PASS |
| **Unmark** | MCQ checkbox | Remove flag | State + visual updated | PASS |
| **Pause / Resume** | MCQ pause button | Overlay | Timer stops/restarts | PASS |
| **Dashboard tab** | Tab bar | Dashboard view | PerformanceDashboard.render() | PASS |
| **History tab** | Tab bar | History view | SessionPersistence.getHistory() | PASS |
| **Catalog tab** | Tab bar | Catalog view | renderCatalog() | PASS |

## 3. Persistence Matrix

| Scenario | Test | Expected | Status |
|---|---|---|---|
| **Auto-save during session** | Wait 5s after answering | Snapshot in localStorage | PASS |
| **Refresh during session** | Hard refresh | Resume prompt on load | PASS |
| **Browser close + reopen** | Close tab, re-open | Resume prompt | PASS |
| **Power interruption (simulated)** | Clear timer + reload | Resume prompt if within duration | PASS |
| **Multiple saved sessions** | Only one stored | Single key `cmaP1SessionState` | PASS |
| **Completed session reload** | Submit → refresh | No resume prompt (cleared) | PASS |
| **History retention** | Complete session | Entry in `cmaP1History2026` | PASS |
| **Dashboard retention** | Complete session | Entry in `cmaP1Dashboard` | PASS |
| **Clear history** | Click Clear History | All storage keys removed | PASS |

## 4. Calculator Matrix

| Function | Input | Expected Output | Status |
|---|---|---|---|
| **Addition** | 2 + 3 = | 5 | PASS |
| **Subtraction** | 10 - 4 = | 6 | PASS |
| **Multiplication** | 3 × 5 = | 15 | PASS |
| **Division** | 20 ÷ 4 = | 5 | PASS |
| **Chaining** | 2 + 3 × 4 = | 20 (left-to-right) | PASS |
| **Decimal** | 3.5 + 1.5 = | 5 | PASS |
| **Divide by zero** | 5 ÷ 0 = | Error | PASS |
| **Percent** | 200 % | 2 | PASS |
| **Reciprocal** | 4 1/x | 0.25 | PASS |
| **Square** | 5 x² | 25 | PASS |
| **Square root** | 16 √ | 4 | PASS |
| **Sign toggle** | 5 ± | -5 | PASS |
| **Memory M+** | 5 M+ | Memory = 5 | PASS |
| **Memory M−** | M− | Memory = 0 | PASS |
| **Memory MR** | MR | Displays memory | PASS |
| **Memory MC** | MC | Memory cleared | PASS |
| **Backspace** | 123 ⌫ | 12 | PASS |
| **Clear** | C | 0 | PASS |
| **Minimize** | − button | Hides grid | PASS |
| **Restore** | + button | Shows grid | PASS |
| **Keyboard Enter** | Press Enter | Evaluate | PASS |
| **Keyboard Esc** | Press Escape | Clear | PASS |
| **Drag** | Drag title bar | Repositions | PASS |

## 5. Timer Warning Matrix

| Threshold | Message | Appearance | Status |
|---|---|---|---|
| 30 min (1800s) | "30 minutes remaining" | Floating banner, role="alert" | PASS |
| 10 min (600s) | "10 minutes remaining" | Floating banner, role="alert" | PASS |
| 5 min (300s) | "5 minutes remaining" | Floating banner, role="alert" | PASS |
| Timer expiration | Session auto-submits | finish() called | PASS |

## 6. Accessibility Matrix

| Check | Element | Status |
|---|---|---|
| Keyboard Nav — ArrowRight/n | MCQ → next | PASS |
| Keyboard Nav — ArrowLeft/p | MCQ → previous | PASS |
| Keyboard Nav — m | Toggle mark | PASS |
| Focus indicators | Choices, inputs, buttons | PASS |
| ARIA role="radiogroup" | Choices container | PASS |
| ARIA role="radio" | Individual choices | PASS |
| ARIA role="alert" | Timer warnings | PASS |
| ARIA role="application" | Calculator | PASS |
| ARIA label on calculator | Calculator container | PASS |
| Tab order | Header → form → tabs → content | PASS |

## 7. Browser Compatibility

| Browser | Load | Session | Calculator | Dashboard | Status |
|---|---|---|---|---|---|
| Chrome 126+ | ✓ | ✓ | ✓ | ✓ | PASS |
| Edge 126+ | ✓ | ✓ | ✓ | ✓ | PASS |
| Firefox 128+ | ✓ | ✓ | ✓ | ✓ | PASS |

## Summary

- **Total tests:** 78
- **Passed:** 78
- **Failed:** 0
- **Skipped:** 0
