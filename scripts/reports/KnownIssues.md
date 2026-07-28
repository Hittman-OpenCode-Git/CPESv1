# Known Issues — RC1

**Date:** 2026-07-21
**Version:** v5.7 RC1

## Functional Issues

### 1. Timer display missing in case and case-exam views
- **Severity:** Medium
- **Affects:** `renderCase()`, `renderCaseExam()`
- **Description:** The timer is rendered at line 809/852 with class `.timer`, but the interval handler at line 634 updates all `.timer` elements correctly. However, in `renderCase()` and `renderCaseExam()`, the timer block is rendered but there's no `.timer-bar` progress bar, making the visual different from MCQ view. Timer functionality works correctly — the countdown, warnings, and expiry all fire.
- **Root cause:** Case views intentionally omit the `.timer-bar` for layout reasons.

### 2. Case item analytics not captured
- **Severity:** Low
- **Affects:** AnalyticsCollector, case sessions
- **Description:** Case items are not registered with `AnalyticsCollector.init()` — only MCQs are. Case answers are scored correctly via `practiceScores()` and appear in the score report, but analytics per-case-item (time spent, confidence) is not tracked.
- **Root cause:** `AnalyticsCollector.init()` only iterates `session.mcqs`. Cases were not added to the analytics data model.

### 3. Progress bar only shown in MCQ view
- **Severity:** Low
- **Affects:** `renderCase()`, `renderCaseExam()`
- **Description:** The `updateProgressBar()` method is only called from `renderMCQ()` (line 794). Case and case-exam views don't show progress.
- **Root cause:** Progress bar elements only exist in MCQ template.

### 4. Confidence and guess checkboxes reset on answer change
- **Severity:** Low
- **Affects:** MCQ render
- **Description:** When a user clicks a different choice, `renderMCQ()` re-renders the entire question. The confidence buttons and guess checkbox render from state correctly, but the user must re-confirm their guess/confidence after changing an answer (they're preserved in state but visual may flash).

### 5. "Start Another Session" button after summary may reset form
- **Severity:** Low
- **Affects:** `renderSummary()`
- **Description:** The "Start Another Session" button at line 1092 calls `$('sessionForm').requestSubmit()`. This resets any pending form changes. It works as designed but may surprise users who have customized settings between sessions.

## Content Issues

### 6. Topic validation warnings
- **Severity:** Informational
- **Affects:** All case packs (scored_cases*.js)
- **Description:** The validator reports 761 warnings — topics not in the canonical domain list, estimated minute mismatches, and orphan exhibits. These are pre-existing content alignments that do not affect runtime behavior. Items load, render, and score correctly.
- **Details:** See `ValidationReport.json` for full list.

### 7. Section F weight (15%)
- **Severity:** Informational
- **Affects:** Blueprint-weighted selection
- **Description:** Section F (Technology and Analytics) is weighted at 15% per `SECTION_INFO`. The actual 2026 CMA exam weight for this section is subject to IMA finalization. The weight may need adjustment.

## UX Issues

### 8. No loading indicators for large question sets
- **Severity:** Cosmetic
- **Affects:** Full exam mode (100 MCQs + 2 cases)
- **Description:** Session startup with 100 MCQs + 2 cases may take several hundred milliseconds. No spinner or loading indicator is shown during pool selection and sorting.

### 9. Print styles not implemented
- **Severity:** Cosmetic
- **Affects:** Score report
- **Description:** No `@media print` styles. Score reports render on-screen only.

### 10. Mobile layout not optimized
- **Severity:** Low
- **Affects:** Responsive breakpoints
- **Description:** The application has basic responsive breakpoints at 900px and 950px but is optimized for laptop/desktop resolutions (1280px+). Tablet and phone layouts may have overlapping elements, especially with the floating calculator.

## Deferred Enhancements

| ID | Description | Planned For |
|---|---|---|
| D1 | Per-question timing analytics for case items | v5.9 |
| D2 | Timer bar in case/case-exam views | v5.9 |
| D3 | Progress indicators in case views | v5.9 |
| D4 | Loading spinner on session start | v5.9 |
| D5 | Print styles for score reports | v5.9 |
| D6 | Explanation engine enhancements (richer remediation) | v5.9 |
| D7 | Empirical difficulty calibration | v6.0 |
| D8 | Study planner / spaced repetition | v6.1 |
| D9 | Cloud sync and cross-device progress | v6.2 |

## Verification Summary

- **Critical issues:** 0 (both critical bugs found during RC1 code review have been fixed)
- **Medium issues:** 1 (timer display in case views)
- **Low issues:** 8 (cosmetic, informational, or pre-existing)
- **Total known issues:** 9
