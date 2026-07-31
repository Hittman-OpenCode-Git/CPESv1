# S110P — Exam Fidelity Gap Analysis

**Session:** 110P
**Date:** 2026-07-31
**Evidence Source:** app.js (4,340 lines), index_updated.html, 24 May source files

---

## Dimension 1: Answer Selection

### Current State
- MCQ choices are `<button>` elements with `role="radio"` and `aria-checked` (app.js:1734-1736)
- Clicking a choice submits the answer and re-renders the entire MCQ
- No keyboard shortcut for selecting A/B/C/D

### CMA Prometric Reality
- At Prometric, candidates press letter keys (A/B/C/D) to select answers
- Clicking also works
- This is a core exam habit — candidates build muscle memory around letter-key answering

### Gap: MISSING
**Severity:** High
**Fix:** Add A/B/C/D keybindings in the global keyboard handler (app.js:4157-4184). Gate on exam mode + not in input + not calculator-active.

---

## Dimension 2: Choice Elimination / Strikethrough

### Current State
- No way to eliminate or strikethrough choices
- Candidate must hold their elimination in their head

### CMA Prometric Reality
- Prometric allows right-clicking a choice to strikethrough it
- Striking through wrong choices is a fundamental test-taking strategy
- Candidates typically narrow to 2 choices, then decide

### Gap: MISSING — CRITICAL FIDELITY DEFECT
**Severity:** Critical
**Fix:** Add right-click or double-click to toggle a strikethrough class on choice buttons. Striking through is visual-only (doesn't submit an answer). This is the single biggest exam-realism gap.

---

## Dimension 3: Post-Answer Feedback During Exam

### Current State
- After selecting an answer, the MCQ re-renders with the choice highlighted but NO correct/incorrect indicator
- `May.showPostAnswerFeedback(q, isCorrect)` (app.js:1774) is the only feedback mechanism
- Without May enabled, zero feedback exists during exam

### CMA Prometric Reality
- CMA exam provides NO feedback during the exam — no green/red, no "correct" indicator
- This is actually correct behavior — the CMA is a summative assessment

### Gap: NONE (correct exam behavior)
**Note:** For practice mode (non-full exam), showing correctness is valuable. The current approach (no feedback without May) is actually exam-authentic. However, for practice mode, a "Show Answer" toggle after answering would be valuable for learning.

---

## Dimension 4: Flag for Review

### Current State
- Checkbox "Mark for review" per MCQ (app.js:1780)
- Flagged items show orange indicator in Navigator grid
- Review screen shows flagged count (app.js:2061)
- Adaptive Review Queue has "Marked Only" filter (app.js:2303)

### CMA Prometric Reality
- Flag button (flag icon) is prominent in the toolbar
- "Review Flagged" is a dedicated button during the exam review phase
- Candidates can filter to see only flagged items during review-before-submit

### Gap: PARTIAL
**Severity:** Medium
**Details:**
- Cannot filter to flagged-only during the review-before-submit screen (only after submission in Adaptive Review Queue)
- No "Review Flagged Only" button on the Navigator sidebar during exam
- Flag icon is a checkbox, not a prominent flag icon button

---

## Dimension 5: Review-Before-Submit Screen

### Current State
- `renderReviewScreen()` (app.js:2042) shows a table with all MCQs and cases
- MCQ rows show: #, Section, Topic, Status, Flag, Go button
- Case rows show: C#, Sections, Title, "Case set", Go button
- Summary bar: Answered/Unanswered/Flagged counts

### CMA Prometric Reality
- Review screen shows grid of all items with status icons
- Can filter: All / Unanswered / Flagged
- Clicking any item jumps to that item
- Clear "End Review" and "Submit" buttons with confirmation

### Gap: MINOR
**Severity:** Low
**Details:**
- Case rows don't show item-level detail (can't see which case items are unanswered)
- No filter tabs on review screen (only post-submission in Adaptive Review Queue)
- "Submit Session" has no confirmation dialog

---

## Dimension 6: Timer Behavior

### Current State
- Global countdown timer, visible on every MCQ and case view
- Updates every 1 second (app.js:1541)
- Timer bar shows percentage with danger/warning states
- Warning alerts at 30 min, 10 min, 5 min remaining
- Time expiry auto-submits via `finish()` (app.js:1560)
- Pause only available in non-full mode when "Real Conditions" unchecked

### CMA Prometric Reality
- Timer is displayed in the corner of the screen
- No timer-warning alerts during the exam (candidates must monitor themselves)
- Time expiry auto-submits
- No pause capability

### Gap: MINOR
**Severity:** Low
**Details:**
- Timer warnings at 30/10/5 min are extra visibility — some candidates prefer them, some don't
- No 1-minute warning (gap between 5-minute warning and expiry)
- Timer always visible — some candidates want to hide it to reduce anxiety
- ✓ Auto-submit on time expiry is correct behavior

---

## Dimension 7: Calculator

### Current State
- Floating `CalculatorEngine` (app.js:503-678)
- Basic arithmetic + scientific (%, sqrt, x², 1/x, memory)
- Draggable, minimizable
- Position resets on every MCQ render
- Keyboard integration when visible and not minimized
- No state preservation across page reloads

### CMA Prometric Reality
- Prometric provides an on-screen calculator
- It is TI-BA II Plus style (financial calculator) for the CMA exam
- The calculator is always docked, not floating
- Calculator toggle is always available

### Gap: MEDIUM
**Severity:** Medium
**Details:**
- ✓ On-screen calculator present — good
- Calculator resets position on each question transition — annoying friction
- No docked position option — always floats
- Lacks financial calculator functions (NPV, IRR, bond yield) even though CMA financial math is simpler

---

## Dimension 8: Keyboard Navigation

### Current State
| Key | Action |
|-----|--------|
| ArrowRight / n | Next question |
| ArrowLeft / p | Previous question |
| m | Toggle flag |
| c / g | Calculator toggle |
| Escape | Pause (when not real conditions) |

### CMA Prometric Reality
- Letter keys A/B/C/D select answers (most important)
- Arrow keys navigate
- Flag key
- Numeric keypad for calculator input

### Gap: SIGNIFICANT
**Severity:** High
**Details:**
- **No A/B/C/D letter key selection** — the most important keyboard shortcut
- Arrow keys work but n/p are non-standard (ArrowRight/Left are correct)
- Keyboard shortcuts are NOT documented anywhere in the UI
- No Enter/Space for choice selection (click-only)

---

## Dimension 9: Case Study Interaction

### Current State
- Two rendering modes: practice (all-in-one scroll) and full exam (task-by-task tabs)
- Exhibit tabs in full exam mode (app.js:1948)
- Task navigation buttons with answered/current states (app.js:1940)
- No exhibit zoom or expand

### CMA Prometric Reality
- Split screen: exhibits on left, questions on right
- Exhibits are scrollable independently
- Tab navigation between exhibits
- One task per screen
- Previous/Next navigation

### Gap: MINOR
**Severity:** Low
**Details:**
- ✓ Split screen with exhibits on left — good
- ✓ Task-by-task navigation in full exam mode — good
- Exhibits cannot be expanded to full screen
- Exhibit tabs lack ARIA tablist/tabpanel pattern
- Cannot return to MCQs from case view via Previous button (only Navigator sidebar)

---

## Dimension 10: Scoring & Results

### Current State
- 0-500 scaled score (CMA standard: 360 passing)
- 75% MCQ / 25% CBQ fixed weighting (app.js:2109)
- Difficulty calibration: standard/easier/harder with factor adjustments
- Grade bands: >=420 Strong Pass, >=360 Passing, >=300 Near Pass, <300 Needs Review
- Section performance grid, topic breakdown, weakest/strongest areas
- CMA Scoring Disclaimer present

### CMA Prometric Reality
- CMA uses scaled scores 0-500 with 360 passing
- Real CMA uses item response theory (IRT) equating — impossible to replicate
- Score report is not shown at exam end (takes ~6 weeks for official results)
- Practice platforms show immediate results

### Gap: NONE (appropriate for practice platform)
**Note:** The disclaimer correctly explains this is simulated scoring. The 75/25 weighting and 0-500 scale are the right design choices.

---

## Dimension 11: Session Setup Configuration

### Current State
- Content type: MCQ Practice / Case Study Practice / Mixed / Full Exam
- MCQ count: dropdown (10-100)
- Case count: dropdown (1-5)
- Pack selection: 5 checkboxes
- Section selection: 6 checkboxes
- Difficulty slider: 1-5
- Weighted blueprint toggle
- Real Conditions toggle
- Time estimate display

### CMA Prometric Reality
- No setup — exam is predetermined
- But practice platforms offer configurable sessions

### Gap: MODERATE
**Severity:** Medium
**Details:**
- 11 checkboxes (5 packs + 6 sections) with no "Select All / Deselect All" — friction
- Difficulty slider has no numeric readout of current value
- Quickstart buttons don't auto-submit (user must scroll to "Start Session")
- The `#weighted` checkbox constraint (only works when all sections selected) is not communicated
- No preset buttons (e.g., "Study Section A only", "Focus on weak areas")

---

## Dimension 12: Post-Session Review Queue

### Current State
- Adaptive Review Queue with 4 filters: Priority / Missed Only / Marked Only / All Items (app.js:2301-2304)
- Priority scoring: Incorrect (5pts) > Guesses (3pts) > Low confidence (2pts) > Marked (1pt) (app.js:2492)
- Review cards show: stem, your answer, correct answer, explanation breakdown, study links, May bridge buttons
- "All wrong choices explained" is collapsed by default

### Commercial Platform Comparison
- Gleim: Detailed per-question review with answer explanations, reference links, performance tracking
- Becker: "Adapt2U" technology with personalized review, unlimited practice tests
- Hock: "My HOCK" dashboard with progress tracking, topic-level analytics
- Surgent: "A.S.A.P. Technology" adaptive review with real-time weak area identification

### Gap: MODERATE
**Severity:** Medium
**Details:**
- ✓ Priority-based sorting with multi-factor scoring — excellent
- "All wrong choices explained" collapsed by default — most learners won't expand it
- No filter for "correct but guessed" or "correct but low confidence"
- No export/print button for review results
- No time-spent-per-question data in review cards
- No "retry similar question" button (would need dynamic question fetching)

---

## Dimension 13: May Coaching Integration

### Current State
- 18 coaching actions implemented (explain, hint, simplify, wrong-choices, mymistake, similar, next, recovery, progress, weakness, summary, digest, strategy, effectiveness, challenge, chat, Socratic, quiz)
- May launcher (always visible), companion card (landing page), mini-panel (during MCQ), coachView tab
- 7 coaching modes — SOCRATIC and MOTIVATE feature-flagged OFF
- Adaptive orchestration pipeline runs silently (output goes to telemetry, not learner UI)
- LLM infrastructure complete but disabled (ENABLE_LLM = false)

### Gap: SIGNIFICANT (underutilized investment)
**Severity:** High (for learner value)
**Details:**
- SOCRATIC mode built but off — 122 lines of code producing question chains, scaffolded reasoning
- MOTIVATE mode built but off — 127 lines of code celebrating progress
- Intervention Schedule computed but invisible (cooldowns, fatigue detection, max 3 remediation slots)
- Adaptive orchestration output goes only to telemetry — never to the learner-facing UI
- May is fully rule-based in pilot (LLM off) — but the LLM infrastructure is complete and waiting

---

## Dimension 14: Accessibility (ARIA / Keyboard / Screen Reader)

### Current State
- 17 ARIA attributes deployed (see app.js inventory)
- Calculator has good ARIA: `role="application"`, labeled display, tabindex management
- Choice buttons have `role="radio"` and `aria-checked`
- Navigator has `role="navigation"`, `aria-label="Question navigator"`
- Recovery modal has `role="dialog"`, `aria-labelledby`

### Gaps
| Gap | Severity |
|-----|----------|
| No A/B/C/D key selection for choices | High |
| Choice buttons lack Enter/Space keyboard activation | High |
| No skip-to-content link | Medium |
| No ARIA live regions for timer/save status updates | Medium |
| Case exhibit tabs lack tablist/tabpanel pattern | Medium |
| Match-type selects lack explicit label association | Medium |
| Confidence buttons (1-5) lack aria-label | Medium |
| Pause overlay lacks role="dialog" | Low |
| No focus trap in modals | Low |
| Navigator grid lacks aria-selected on current item | Low |

### Gap: SIGNIFICANT
**Severity:** High
**Overall:** The codebase has good a11y foundations (proper roles on calculator, choices, navigator, modals) but has critical gaps in keyboard operability that would fail WCAG 2.1 AA.

---

## Dimension 15: Analytics & Progress Tracking

### Current State
- `AnalyticsCollector` (app.js:683-763): per-question timing, correctness, confidence, flag, guess
- `PerformanceAnalytics` (app.js:2672): topic/section/pack breakdowns, weak area identification, remediation plans, trend analysis
- `PerformanceDashboard` (app.js:3395): accuracy stats, MCQ gate rate, readiness, study plan, trends
- `SessionPersistence.saveHistory()` (app.js:989): 100-entry capped history

### Commercial Platform Comparison
- Gleim: "Performance Reports" — detailed analytics with time tracking
- Becker: Progress tracking, practice test history
- Surgent: Real-time readiness score, adaptive study plans
- All platforms: Data persists across sessions and devices (cloud-backed)

### Gap: MODERATE
**Severity:** Medium
**Details:**
- History capped at 100 entries — oldest silently dropped
- No export of analytics/history data
- No date-range filtering on dashboard
- No per-question time-spent data in review cards
- No comparison to cohort/benchmarks (single-user design)
- Dashboard is text-heavy — lacks chart visualizations

---

## Dimension 16: Visual Design & Polish

### Current State
- CSS custom properties with light/dark theme
- Responsive layout (CSS grid/flex)
- Consistent pill-style metadata badges
- Score report with color-coded section tiles
- Grade band badges with pass/fail coloring

### Gap: MINOR
**Severity:** Low
**Details:**
- Dark mode has no `prefers-color-scheme` auto-detection
- No transition animation on theme switch
- Choice buttons could benefit from hover/active micro-animations
- Timer warning is text-only — no visual pulsing or attention-getting animation

---

## Dimension 17: Session Recovery

### Current State
- 7-layer persistence system (app.js:769-1078): transactional save, guarded transitions, restore, 20 rolling checkpoints, save verification, append-only journal, history DB
- Recovery modal on page load if saved session exists
- "Resume Session" / "Discard & Start New" options
- Auto-save every 5 seconds

### Gap: NONE (excellent)
**Note:** The session recovery system is robust and well-engineered. The recovery modal, checkpoint system, journal, and auto-save are production-quality.

---

## Dimension 18: Recovery Sprint

### Current State
- `_renderRecoverySprintBar()` (app.js:2137): Shows on score report with top 15 weakest MCQ topics
- `startRecoverySprint()` (app.js:2408): Creates new session with 15 MCQs, no cases
- Sprint uses normal MCQ exam UI — no visual differentiation

### Gap: MODERATE
**Severity:** Medium
**Details:**
- No dedicated Recovery Sprint results view — submits like a regular session
- No comparison between source session and Recovery Sprint performance
- Hardcoded to 15 items max, MCQs only
- May generates recovery QID lists (`_generateRecoverySet`, may-core.js:3936) but no one-click "Start Recovery" integration between May and Recovery Sprint
- May's recovery sets suggest QIDs but learner must manually configure a session

---

## Summary: Gap Severity Distribution

| Severity | Count | Dimensions |
|----------|-------|------------|
| Critical | 1 | Choice elimination/strikethrough (D2) |
| High | 4 | Answer selection (D1), Keyboard navigation (D8), May underutilization (D13), Accessibility (D14) |
| Medium | 7 | Flagging (D4), Calculator (D7), Setup (D11), Review queue (D12), Analytics (D15), Recovery Sprint (D18), Post-session review (D12) |
| Low | 6 | Review screen (D5), Timer (D6), Case interaction (D9), Scoring (D10), Visual (D16), Session recovery (D17) |
| None | 2 | Post-answer feedback (D3), Session recovery (D17) |

**Total gaps identified:** 18 dimensions evaluated, 16 with actionable gaps
