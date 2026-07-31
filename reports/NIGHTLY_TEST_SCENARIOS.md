# Session 90P-A — Nightly Test Scenarios (Stretch Goal)

**For:** Wife's evening testing session  
**Session:** 90P-A | **Lane:** Governance Light | **Date:** 2026-07-30

---

## Quick Start (5 min)

### Scenario: 15-MCQ Sanity Run
**Purpose:** Verify the simulator is working end-to-end.

1. Open `index_updated.html` in browser
2. Wait for "Loading catalog..." to resolve (should be instant)
3. Click the green **"MCQ Practice"** button in the hero section
4. A session will start with 20 questions — you can answer fewer if you want
5. Click choices (A/B/C/D) for any questions
6. When ready, click the **"Submit Session"** button (appears after answering at least some)
7. Verify: a score report appears with your score, a grade band, and section breakdown
8. Bonus: click **"Review with May →"** at the bottom — May should appear with coaching tips

**Expected:** No errors, no blank screens, no JavaScript console red text. Score appears. Everything looks clean.

---

## Moderate (15-20 min)

### Scenario: 50-MCQ Timing Run
**Purpose:** Verify timer behavior and mid-session stability.

1. Open `index_updated.html` (fresh load)
2. In the Session Setup panel, select **"Mixed Session"** mode card
3. Set MCQ count to 50, Case count to 0
4. Check all sections (A through F)
5. Click "Start Session"
6. Answer questions at a comfortable pace — skip some, flag some
7. Watch the timer in the top bar — it should count down
8. Click the **pause button** (⏸) next to the timer — verify timer stops
9. Click pause again to resume
10. Use the **navigator** at the bottom (expand it by dragging up) to jump between questions
11. When done, click Submit
12. Verify the score report shows correct counts, section tiles, and topic breakdown

**Expected:** Timer works smoothly. Navigator works. Pause/resume works. Score report is complete.

---

## Extended (30-60 min)

### Scenario: 100-MCQ Full Exam Simulation
**Purpose:** Verify long-session stability.

1. Open `index_updated.html` (fresh load)
2. Click **"Full Exam"** — this sets 100 MCQs + 2 cases, 4-hour timer, all sections
3. Answer MCQs at your own pace (you don't need to answer all 100)
4. Notice: the "Simulate Real Exam Conditions" checkbox is unchecked — pause is available
5. After answering some MCQs, scroll to the bottom and click the navigator
6. Notice: flagged questions have a yellow marker, answered ones have green
7. When ready to finish, click the **"Submit Early"** button (bottom toolbar)
8. Or keep going until ready and submit normally

**Expected:** No crashes, no slowdowns. The submit early button works. Everything behaves professionally.

---

## Case Study Test (10-15 min)

### Scenario: Case Study Validation
**Purpose:** Verify case studies render and score correctly.

1. Open `index_updated.html` (fresh load)
2. Click **"Case Studies"** quick-start button
3. You'll see a business scenario with exhibits (tables, charts, documents)
4. Read the scenario (like "Harbor Medical Supplies needs a cash forecast...")
5. Navigate exhibits using the exhibit tabs at the top
6. Answer each task — fill in numbers for calculation tasks, pick choices for select tasks
7. Use "Next Task" to move through the case
8. When done with the case, submit and verify scoring

**Expected:** Exhibits are readable. Tasks are clear. Matching items show left/right columns. Scoring works.

---

## May Coaching Walkthrough (5 min)

### Scenario: Review with May
**Purpose:** Verify May coaching layer activates.

1. After submitting any session above, look for **"Review with May →"** at the bottom
2. Click it — a May coaching panel should appear on the right
3. May should show:
   - A session summary with your score
   - Topic strengths and weaknesses
   - Study recommendations
4. Click through May's cards — verify they render without issues
5. Try switching between light and dark themes — May should adapt

**Expected:** May panel opens smoothly. Recommendations are relevant. No rendering glitches.

---

## Quick Health Checks (1 min each)

### Check: History Panel
1. After completing sessions, click "History" tab at top
2. Verify past sessions are listed with dates, modes, scores
3. Click "Clear History" to reset (optional)

### Check: Dashboard
1. Click "Dashboard" tab at top
2. Verify stats cards show total sessions, average score, topic coverage

### Check: Theme Toggle
1. Click the ☽/☀ button in the top-right corner
2. Switch between light and dark mode
3. Verify all panels adapt — text, backgrounds, borders all change

### Check: Session Recovery
1. Start a session, answer a few questions
2. Close the browser tab (or refresh the page)
3. Reopen — you should see "You have an unsubmitted session"
4. Click "Resume Session" — verify your answers are preserved

---

## Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| "Loading catalog..." never resolves | Refresh the page (Ctrl+R) |
| Blank screen | Open browser console (F12), check for red errors |
| Timer not counting down | Make sure session is not paused |
| Can't submit | Complete at least one question, then look for Submit button |
| Score seems wrong | This is a practice simulator — scoring follows CMA structural rules |
| May panel doesn't appear | May requires a completed session first — submit, then click "Review with May" |

---

## Summary: What Makes a "Good" Test Session

- [x] App opens without errors
- [x] Questions render with readable text
- [x] Choices are clickable and highlight when selected
- [x] Timer counts down
- [x] Score report generates after submit
- [x] Review mode shows correct answers and explanations
- [x] May coaching layer activates on demand
- [x] History and Dashboard update after each session
- [x] No JavaScript console errors (F12 → Console tab, red entries)
