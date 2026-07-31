# Session 90P — Nightly Testing Readiness Report

**Session:** 90P | **Lane:** Governance Light | **Date:** 2026-07-30 | **Generated for:** Wife's evening test session

---

## 1. Application State Summary

| Metric | Value |
|--------|-------|
| Total MCQs | 2,545 (5 packs: 500+500+500+500+545) |
| Certified MCQs | 2,451 (96.3%) |
| Total Case Items | 400 (3 packs: 141+132+127) |
| Certified Cases | 400 (100%) |
| May Coaching Layer | Active (27 modules loaded) |
| Smoke Test | 17/17 PASS |
| Preflight | 0 divergences |
| Governance Guard | 54/54 PASS |
| Console Errors | 0 (1 expected file:// warning) |

---

## 2. Known Issues (For Nightly Testing)

| # | Issue | Severity | Workaround |
|---|-------|----------|------------|
| 1 | Timer reaches 0:00 with no auto-submit | Low | Manually click Submit — this is intentional for practice mode |
| 2 | No confirmation before final submit | Low | Review items carefully before clicking Submit |
| 3 | Pause only available in non-full modes | Design | This is intentional — real CMA exams don't allow pauses |
| 4 | 38 script tags — first load may be slow | Low | Reload if banks don't appear |
| 5 | Saved session may expire across days | Low | If recovery prompt appears, Resume to continue |

### Blocked Issues (Do Not Test)

| # | Issue | Reason |
|---|-------|--------|
| 1 | Uncertified Pack C/D items (E/F sections) | 90 items pending certification — not in learner pool |
| 2 | DL-035 items (39 Domain F empty distractor slots) | Educational quality gap — correct answers still valid |
| 3 | S89 active rewrite campaign | Pack A may be edited during testing — no impact on runtime |

---

## 3. Recommended Nightly Test Scenarios

### Scenario 1: 15-MCQ Sanity Run (5 min)
**Purpose:** Verify system is operational
1. Open `index_updated.html`
2. Verify "Loading catalog..." resolves quickly
3. Click "MCQ Practice" quick-start button
4. Answer 15 questions quickly (any answers)
5. Click Submit
6. Verify score report appears with score, grade band, section breakdown
7. Verify no console errors

### Scenario 2: Case Study Validation (10 min)
**Purpose:** Verify case studies render and score correctly
1. Open `index_updated.html`
2. Click "Case Studies" quick-start button
3. Navigate through exhibits and tasks
4. Answer all items in at least 1 case
5. Submit and verify scoring
6. Verify "Review with May" link appears

### Scenario 3: Long Session (30-60 min, optional)
**Purpose:** Verify session stability over time
1. Start Mixed Session with 50 MCQs + 1 case
2. Answer questions at natural pace
3. Use Flag and Guess features
4. Navigate using keyboard arrows
5. Submit and verify complete score report
6. Check History and Dashboard panels

### Scenario 4: May Coaching Walkthrough (5 min)
**Purpose:** Verify May coaching layer
1. After any submitted session
2. Click "Review with May →" at bottom of results
3. May panel should appear with recommendations
4. Navigate through May's coaching cards

---

## 4. What to Look For

### Expected Behavior
- Timer counts down with amber warning at 5 min, red at 1 min
- Score report shows section-by-section breakdown
- Review screen shows all answered/marked/unanswered counts
- History panel accumulates sessions correctly
- Theme toggle switches between light and dark

### Unexpected Behavior (Report If Seen)
- Score report doesn't appear after Submit
- Questions render blank or with missing text
- Timer freezes or displays wrong values
- Page reload shows wrong session state
- JavaScript console errors (red text)
- Buttons not responding to clicks
- Case study exhibits not loading

---

## 5. Session Notes for Tonight

**Current active work that will NOT affect testing:**
- S89 is editing `pack_a_corrected.js` (cognitive rewrites) — pack A content may change between test runs but the app reads from the file at page load, so a refresh picks up the latest
- MAY-016 is working on activation readiness — May coaching may show evolving recommendations across test runs

**Recommended:** Refresh the browser between test sessions to pick up any file changes.

**Fallback:** If anything seems broken, run `npm run smoke` from terminal and verify 17/17 PASS.

---

## 6. Quick Reference Card

```
Opening the app:
  ↳ Double-click index_updated.html (or open in browser)

Starting a quick test:
  ↳ Click "MCQ Practice" → answer any questions → Submit

Viewing results:
  ↳ Score appears immediately after Submit
  ↳ Click any item to review answer + explanation
  ↳ Click "Review with May →" for coaching

Checking history:
  ↳ Click "History" tab in top navigation
  ↳ Shows all past sessions

Session recovery:
  ↳ If prompted "You have an unsubmitted session"
  ↳ Click "Resume Session" to continue where you left off
  ↳ Or click "Discard" to start fresh

Clearing saved state:
  ↳ Click "Clear History" in History panel
  ↳ Refresh the page for a clean start
```
