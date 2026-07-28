# Release Notes — RC1

**Product:** CMA Part 1 2026 Practice Simulator
**Version:** v5.7 RC1 (Release Candidate 1)
**Release Date:** 2026-07-21
**Status:** Release Candidate

## Overview

The CMA Part 1 Practice Simulator transforms a repository of 2,500 original MCQs and 75 integrated case studies into a fully functional exam simulation application. This release candidate represents the first complete, verified build of the application layer.

## What's New (Since v5.6)

### Exam Engine (v5.7)

| Feature | Description |
|---|---|
| **Exam Lifecycle** | Session start → navigation → review → submit → score report → adaptive review queue |
| **Prometric-Style Navigator** | Grid of question/case buttons with color legend (answered/flagged/current), jump-to-any-question |
| **Scientific Calculator** | Floating, draggable, minimizable — arithmetic, memory (M+/M−/MR/MC), percent, reciprocal, square, sqrt, keyboard shortcuts, history |
| **Session Persistence** | Auto-save every 5s, resume interrupted sessions, localStorage-backed |
| **Performance Dashboard** | Overall accuracy, recent trend, section-by-section bars, score trend over last 10 sessions |
| **Adaptive Review Queue** | Weighted priority scoring: Incorrect×5, Guess×3, LowConfidence×2, SlowCorrect×2, Marked×1 |
| **AnalyticsCollector** | Per-question timing, confidence tracking, confidence-mismatch detection |
| **Timer with Warnings** | Section timing, 30/10/5 minute floating warnings, auto-submit on expiry |
| **Case-Based Practice** | Case passage + exhibits + integrated items (MCQ, numeric, fill, multi-select, match/drag) |
| **Full Exam Simulation** | 100 MCQs + 2 case sets — 4-hour timer, weighted scoring (MCQ 75% / Case 25%) |
| **Keyboard Navigation** | ArrowRight/n (next), ArrowLeft/p (previous), m (toggle mark), Enter (submit answer) |
| **Accessibility** | ARIA roles on choices, alerts on timer warnings, application role on calculator, focus indicators |
| **Dark/Light Theme** | Persistent toggle via localStorage |

### UI Layer (Sprint 5.7 complement)

| Area | Additions |
|---|---|
| **HTML** | Dashboard tab and view container added |
| **CSS** | ~200 lines covering timer bar, pause overlay, confidence row, topic grid/bars, priority badge, dashboard cards/sections/trends, navigator header/stats, and more |

## Critical Bug Fixes (Sprint 5.8)

1. **Calculator overwriting session content** — `CalculatorEngine.render()` was using `innerHTML=` on `sessionView`, destroying all exam content. Fixed: calculator now renders once to `document.body` via `appendChild`. (Affected: all exam modes)

2. **Analytics correctness not recorded** — `AnalyticsCollector.recordAnswer()` was defined but never called from the choice onclick handler. Analytics reported 0 accuracy and 0 confidence mismatches regardless of actual performance. Fixed: `recordAnswer()` is now called on each answer selection. (Affected: analytics summary, dashboard trend accuracy)

## Known Issues

See [KnownIssues.md](KnownIssues.md) for full details.

- Case item analytics not tracked per-item (time/confidence/minutes)
- Timer UI not shown in case and case-exam views (timer runs but no visible countdown)
- Section F (Technology & Analytics) — 15% blueprint weight applied; actual exam weight TBD as new section
- No print-style rendering for score reports

## Repository Integrity

- **Content:** 2,500 MCQs, 75 case studies — validated
- **Schema:** No changes to question data structures this sprint
- **Validator:** 0 errors, 0 failures — full suite green

## Deferred to Future Releases

| Feature | Target |
|---|---|
| Enhanced explanation engine with detailed remediation | v5.9 |
| Empirical difficulty calibration | v6.0 |
| Study planner and spaced repetition | v6.1 |
| Optional cloud sync | v6.2 |
| New question sets | v6.3+ |
