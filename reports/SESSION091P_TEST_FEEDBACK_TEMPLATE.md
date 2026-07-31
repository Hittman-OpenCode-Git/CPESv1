# Session 91P — Test Feedback Template

**Session:** 91P | **Lane:** Governance Light | **Date:** 2026-07-30
**Purpose:** Structured feedback capture for nightly testing sessions.
**Use:** Print or copy this template before each test session. Fill in after testing.

---

## Session Metadata

| Field | Value |
|-------|-------|
| **Test Date** | YYYY-MM-DD |
| **Tester** | |
| **Test Start Time** | HH:MM |
| **Test End Time** | HH:MM |
| **Scenario(s) Run** | (list from NIGHTLY_TEST_SCENARIOS.md) |
| **Browser** | (e.g., Chrome 120, Edge 120, Firefox 120) |
| **OS** | (Windows / Mac) |
| **Screen Size** | (e.g., 1920x1080, laptop, external monitor) |
| **Theme Used** | Light / Dark / Both |

---

## 1. Startup & Loading (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| App opens without errors | | |
| "Loading catalog..." resolves quickly | | |
| Hero section renders with mode cards | | |
| Session Setup panel visible | | |
| Section checkboxes (A-F) working | | |
| Count sliders functional | | |
| Quick-start buttons work | | |
| No JavaScript console errors (F12 → red text) | | |
| Theme toggle works | | |

**Notes / Issues:**

---

## 2. Session Flow (Pass / Fail / N/A)

### 2.1 MCQ Practice

| Check | Result | Notes |
|-------|--------|-------|
| Start Session button works | | |
| First MCQ renders | | |
| Stem text readable | | |
| Choice buttons clickable | | |
| Selected choice highlights | | |
| Flag button works | | |
| Next/Previous navigation works | | |
| Navigator panel expandable | | |
| Navigator shows answered/flagged status | | |
| Jumping via navigator works | | |

**Notes / Issues:**

### 2.2 Timer

| Check | Result | Notes |
|-------|--------|-------|
| Timer starts counting down | | |
| Timer bar moves | | |
| Pause button works | | |
| Pause indicator visible | | |
| Resume from pause works | | |
| Timer color changes at <5 min | | |
| Timer color changes at <1 min | | |

**Notes / Issues:**

### 2.3 Case Studies

| Check | Result | Notes |
|-------|--------|-------|
| Case scenario text readable | | |
| Exhibit tabs visible and clickable | | |
| Exhibit content renders correctly | | |
| Tables formatted properly | | |
| Task navigation (Next/Previous Task) works | | |
| Numeric entry fields working | | |
| Select choices working | | |
| Match items have left/right columns | | |

**Notes / Issues:**

### 2.4 Submit & Score

| Check | Result | Notes |
|-------|--------|-------|
| Submit button accessible | | |
| "Review Before Submit" screen renders | | |
| Answered/marked/unanswered counts correct | | |
| Final submit works | | |
| Score report generates | | |
| Score is a reasonable number | | |
| Grade band displays | | |
| Domain breakdown (A-F) renders | | |
| Bar charts for sections show | | |
| Topic breakdown renders | | |

**Notes / Issues:**

---

## 3. Review Flow (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| "Review Missed" button works | | |
| Review screen shows question + choices | | |
| Correct answer highlighted | | |
| Explanation text visible | | |
| Study links present | | |
| "Review with May →" link visible | | |

**Notes / Issues:**

---

## 4. May Coaching (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| "Review with May" click opens May panel | | |
| May panel renders without layout glitches | | |
| May session summary shows correct score | | |
| Topic strengths/weaknesses displayed | | |
| Study recommendations present | | |
| May cards scrollable | | |
| May responsive to theme toggle | | |

**Notes / Issues:**

---

## 5. History & Dashboard (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| History tab shows sessions | | |
| Session dates correct | | |
| Session modes correct | | |
| Session scores correct | | |
| "Clear History" works (if tested) | | |
| Dashboard tab shows stats | | |
| Total sessions count correct | | |
| Average score correct | | |
| Topic coverage renders | | |

**Notes / Issues:**

---

## 6. Session Recovery (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| Mid-session page refresh shows recovery prompt | | |
| "Resume Session" restores answers | | |
| "Discard Session" clears data | | |
| Timer resumes from correct position | | |

**Notes / Issues:**

---

## 7. Scrolling & Layout (Pass / Fail / N/A)

| Check | Result | Notes |
|-------|--------|-------|
| Long stems scroll within their container | | |
| No horizontal scroll on page | | |
| Case exhibits scroll independently | | |
| May panel scrolls independently | | |
| Navigator doesn't overlap content | | |
| Buttons don't overlap at narrow widths | | |
| Setup panel usable at narrow widths | | |

---

## 8. Overall Experience

| Question | 1 (Poor) | 2 | 3 | 4 | 5 (Excellent) | Notes |
|----------|----------|---|---|---|----------------|-------|
| How professional does the simulator feel? | | | | | | |
| How clear were the questions? | | | | | | |
| How easy was navigation? | | | | | | |
| How useful was the score report? | | | | | | |
| How helpful was May coaching? | | | | | | |
| How would you rate the timer? | | | | | | |
| How would you rate overall usability? | | | | | | |
| Would you recommend this to a CMA candidate? | | | | | | |

---

## 9. Bugs & Issues Found

### Issue 1

| Field | Value |
|-------|-------|
| **Description** | |
| **Steps to Reproduce** | |
| **Expected Behavior** | |
| **Actual Behavior** | |
| **Severity** | (Critical / High / Medium / Low) |
| **Category** | (Scrolling / Layout / Timer / Rendering / Session Flow / May Coaching / Performance / Other) |

### Issue 2

| Field | Value |
|-------|-------|
| **Description** | |
| **Steps to Reproduce** | |
| **Expected Behavior** | |
| **Actual Behavior** | |
| **Severity** | |
| **Category** | |

### Issue 3

| Field | Value |
|-------|-------|
| **Description** | |
| **Steps to Reproduce** | |
| **Expected Behavior** | |
| **Actual Behavior** | |
| **Severity** | |
| **Category** | |

*(Add more issue blocks as needed)*

---

## 10. Free-Form Notes

> What worked well? What was frustrating? What would you change?




---

## 11. Tester Signature & Close

| Field | Value |
|-------|-------|
| **Name** | |
| **Date** | |
| **Overall Verdict** | (Ready / Minor Issues / Blocking Issues) |

---

## How to Submit

1. Save this completed form as `reports/nightly_feedback/NIGHTLY_FEEDBACK_YYYY-MM-DD.md`
2. Reference any console errors (screenshot or copy-paste from F12 → Console)
3. The `nightly_feedback_validator.js` script will validate completeness at the next analysis session
