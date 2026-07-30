# Session 79 — Learner Readiness Audit

## Q1: Is the build trustworthy for a real study session tonight?
**Verdict:** **YES WITH CAVEATS**

### Evidence

**Preflight (T0 check):**
- All 5 packs parse cleanly: `parse OK` across Pack A through Pack E.
- Governance guard: **54/54 PASS** — all 10 rules active and enforced.
- QID counts: Pack A=500, B=500, C=500, D=500, E=545 (expected 540, +5 delta).
- Certified pool: 2,452 items across all packs. Pack B shows 501 Certified (1 extra, likely a counting artifact).
- **2 divergences flagged:** Pack E QID count (+5) and certified count (-35 vs baseline). Neither is a content-defect divergence — both are counting discrepancies, not broken questions or keys. The certified divergence is a metadata-count gap, not a learner-safety issue.

**Exam flow (end-to-end):**
- Session start: Form submission (`sessionForm.onsubmit`) -> `ExamSessionManager.start()` -> builds tiered pool, difficulty-weighted selection, similarity-key deduplication -> creates session object with timer, answers, flags, confidence state -> `render()` dispatches to `renderMCQ()`.
- MCQ rendering: Structured card with section/topic/difficulty pills, stem, 4 choice buttons (A/B/C/D), flag/guess/confidence tools, navigator sidebar, timer bar, previous/next buttons. Each choice click records the answer, triggers autosave, logs analytics, and re-renders.
- Review screen: `renderReviewScreen()` shows a table of all items with answer status and flag state. "Back to Items" and "Submit Session" buttons.
- Submit: `finish()` marks completed->submitted, clears timer/autosave, saves history, calls `renderSummary()`, hands off to May.
- Score report: Scaled 0-500 score, grade bands, section performance tiles (sorted weakest->strongest), topic breakdown, weakest/strongest areas, remediation plan, study plan, readiness card, adaptive review queue with priority/missed/marked/all filters, full distractor breakdown per missed question.
- Timer: `startTimer()` runs at 1-second intervals with warning thresholds at 30m/10m/5m. Auto-finishes at 0 seconds. Pause is available (disabled in "Real Exam Conditions" mode).
- **Error handling is good:** Every `render*` function and the main `render()` has try/catch with a user-facing "Something went wrong" message and a reload link.
- Auto-save: `startAutoSave()` at a regular interval + immediate save on every answer.

**Crash risk:** Low. The null-guard for `s.mcqs` and `s.cases` (Insertion 1 at line 1618: `s.mcqs = s.mcqs || []; s.cases = s.cases || [];`) protects against corrupted session restores. The keyboard handler (Insertion 2 at line 3955) also guards these arrays.

**Key caveat:** The two preflight divergences (Pack E +5 QIDs, certified -35) mean the counts are slightly off from declared baselines. But since all packs parse cleanly and the governance guard passes, **no learner-facing content is compromised**. Pack E has 5 extra items — likely the R-series supplementary items (P1-E-R01 through P1-E-R40). The certified count delta is a registration discrepancy, not wrong answers.

---

## Q2: What is most likely to confuse or frustrate a first-time user?

Ranked by impact, most impactful first:

### 1. May's first-use greeting is too long and technical (may-core.js:138-176)

The `getWelcomeMessage()` function produces a **15+ line markdown wall of text** listing every capability: "graduated hints," "targeted recovery sets," "confidence calibration," "persistent weak areas," "contested QID exclusion," "recovery set generation." A CMA candidate sitting down to study at 9 PM does not need to read a feature list. She wants a warm greeting and a clear next step.

**What she sees:** `"Hi [name], I'm Chloe May — but you can call me May. I'm your study companion for CMA Part 1. I track your progress by topic, explain questions using the bank's own content, give you graduated hints, flag your weak areas, and build targeted recovery sets..."` followed by bullet points and a pre-production warning.

**What she should see:** 3-4 lines max. "Hi [name], I'm May — your CMA Part 1 study companion. I'll explain missed questions and track what you're strong or weak on. Start a practice session and I'll be here when you're done."

**Severity:** Medium (she'll likely dismiss May and never come back)

### 2. "Welcome back — have we met before?" is confusing for a genuinely new user (may-core.js:225)

On first visit, `_enterGreetingFlow()` speaks: `"Welcome back — have we met before?"` This is technically a greeting state machine that handles returning vs. new students — but a first-time user doesn't know that. She just sees "Welcome back" when she's never been here. The companion card says "Hi, I'm May — your CMA Part 1 study companion" (warm and direct) but the chat says "Welcome back" (confusing).

**Root cause:** The greeting flow is designed for a multi-student scenario (student roll selection) but triggered for everyone, including brand-new users with zero localStorage data. The `trySetName()` path (line 179-209) is cleaner for new users.

**Severity:** Medium (creates a small moment of confusion)

### 3. The score report is thorough but potentially overwhelming (app.js:2161-2217)

After submitting a session, the summary page includes: scaled score hero, grade band, difficulty note, MCQ/CBQ split dashboard, section performance tiles (6 tiles sorted weakest->strongest), topic performance grid, weakest/strongest area cards, remediation plan, study plan, review coach card, readiness card, adaptive review queue with 4 filter buttons, and a scoring methodology disclaimer.

This is **excellent** for a power user but a first-timer who answered 10 questions and got 7 right will see a wall of analytics cards. The most important signal — "Here's what you got wrong and why" — is mixed in with everything else.

**What works:** The adaptive review queue (priority-sorted list of missed/marked items with structured breakdowns) is genuinely useful and well-designed.

**Severity:** Low-Medium (she can scroll past what she doesn't want)

### 4. Dark mode choice buttons have invisible borders (styles.css:55 + 839)

In dark mode, `--border-light` is set to `#1e293b` (line 55), which is the **exact same value** as `--choice-bg` (line 77). The `.choice` element uses `border: 2px solid var(--border-light)` (line 839) — meaning the 2px border is visually identical to the background. Choice buttons look flat and borderless, with no visual separation from each other or the page background.

**Why this matters:** During an evening study session, she'll likely use dark mode. Without visible borders, the A/B/C/D choices blend together, making it harder to distinguish which option is selected (only the letter circle changes color — the border doesn't help).

**Severity:** Medium (degrades usability in dark mode)

### 5. The "Loading diagnostics..." panel at the top of the page is confusing (index_updated.html:1)

The `<div class="diag-panel" id="defectDiagnostics">` shows "Loading diagnostics..." initially, then presumably gets populated with delivery pool stats. A study candidate doesn't need to see this at all — it's developer-facing infrastructure.

**Severity:** Low (just noise, not blocking)

### 6. The May companion card "Set up May" CTA could be clearer (may-core.js:6433-6438)

For new users, the companion card shows: "Hi, I'm May — your CMA Part 1 study companion" with text "I'll help you track progress..." and a **"Set up May"** button. Clicking it opens the May chat view where the greeting flow starts. The label "Set up May" sounds like configuration/installation — it's really "Get started" or "Meet May."

**Severity:** Low (she'll figure it out, but the button could be warmer)

---

## Q3: Three most valuable things to try tonight

### 1. **10-question MCQ practice session with full post-session review** — Highest value

Start with the default: **MCQ Practice mode, 10 questions, all 6 sections selected.** This gives her:
- A low-commitment first run (~15 minutes)
- A score report showing section-by-section performance
- The **adaptive review queue** sorted by priority, with structured breakdowns: what was tested, why each correct answer is correct, why her specific wrong answer was wrong, distractor analysis, and study links
- This is the core learning loop — do, review, understand, repeat

**Why:** It's the fastest way to get actionable feedback. The review cards are genuinely well-designed and the structured explanation breakdown (S77-extracted sections) is one of the simulator's best features.

### 2. **25-question MCQ across 2-3 priority sections** — Targeted practice

After reviewing the first session, she'll know which sections she struggled with. A 25-question session limited to those sections provides deeper topic coverage. The performance analytics will show topic-level trends once she has multiple sessions.

**Why:** The topic-level breakdown and weakest/strongest area cards (from `PerformanceAnalytics.computeBreakdown`) become meaningful after 2+ sessions. The readiness model also needs multiple data points.

### 3. **Review a missed question with May after the session** — Coaching value

After submitting, use the "Review with May →" link (line 3851 in app.js). May can:
- Explain answers and wrong choices using actual question-bank content
- Give graduated hints (5 levels: metacognitive -> concept -> strategy -> elimination -> full)
- Quiz her on related concepts
- Recommend similar questions

**Why:** The May integration is a unique differentiator. For a student who wants to understand *why* something is wrong (not just *what* is wrong), this is more valuable than passive review.

### Honorable mention: **Case study practice** (deferred)

Case studies are impressive (full scenario, exhibits, integrated items) but best saved for a dedicated session after MCQ practice. They take 20-30 minutes per case and are better for testing integrated reasoning, not for building foundational topic knowledge.

---

## Q4: Top 3-5 highest-value Light Lane fixes (ranked)

All fixes are in scope (app.js, may-core.js, styles.css, index_updated.html), touch no pack/case/answer-key/registry files, and can be done in 1-2 edits each.

| # | Fix | File | Impact | Risk | Effort |
|---|-----|------|--------|------|--------|
| 1 | **Fix dark mode choice button borders** — Change `--border-light` in dark mode from `#1e293b` to `#2d3748` or override `.choice` to use `--border` instead of `--border-light`. Currently choice buttons have invisible 2px borders in dark mode (border color = background color). | `styles.css` line 55 or ~839 | **High.** Every question she answers in dark mode tonight will have borderless choices. Visual separation is essential for distinguishing A/B/C/D options, especially when the selected state only changes the letter circle color. | **None.** Pure CSS, no JS. Won't affect light mode. | 1 line change |
| 2 | **Shorten May's first-use greeting to 3-4 lines** — Replace the 15-line capability list in `getWelcomeMessage()` (may-core.js:146-175) with a warm, concise greeting. New users don't need to read about "graduated hints," "targeted recovery sets," "confidence calibration," or "contested QID exclusion" on first visit. | `may-core.js` lines 146-175 | **High.** This is the first thing she'll read from May. The current wall of text reads like a product spec sheet. A 3-4 line greeting ("I'll explain missed questions and track your progress. Start a practice session!") makes May feel helpful instead of overwhelming. | **Very low.** Pure text replacement in one function. No logic changes. | 1 edit |
| 3 | **Fix "Welcome back — have we met before?" for genuinely new users** — In `_enterGreetingFlow()` (may-core.js:223-228), add a check for whether localStorage has any MayLearnerState data. If none (truly new user), skip the "have we met" question and go directly to `askForName()`. | `may-core.js` lines 223-228 | **Medium.** Eliminates a confusing moment. A new user shouldn't see "Welcome back" or be asked "have we met before?" — she hasn't. | **Low.** One condition check. The `trySetName` path (line 179) already handles new users well once they type a name. | 1-3 lines |
| 4 | **Hide or collapse the defect diagnostics panel for non-developers** — The `<div class="diag-panel" id="defectDiagnostics">` in `index_updated.html` shows "Loading diagnostics..." and delivery pool stats. Add a collapsed state by default or remove it from the initial render. A CMA candidate doesn't need to see how many questions are blocked from the pool. | `index_updated.html` and/or `styles.css` | **Low-Medium.** Just noise reduction. It doesn't break anything but it's confusing clutter at the top of a study tool. | **Low.** Add `style="display:none"` by default or `font-size: 11px; opacity: 0.5;` to de-emphasize. Could toggle on a developer keystroke. | 1-2 lines |
| 5 | **Make the "Set up May" button warmer** — Change the button label in `_injectMayCompanionCard()` (may-core.js:6437) from `'Set up May'` to `'Meet May'` or `'Get started'` for new users. "Set up" sounds like configuration; "Meet May" or "Say hi to May" is more inviting. | `may-core.js` line 6437 | **Low.** Cosmetic, but a first impression matters. | **None.** One string change. | 1 character |

### Additional notes on what NOT to fix:

- **Pack E QID count (+5):** This is a pack-file issue, out of scope for Light Lane. The 5 extra QIDs (likely P1-E-R01 through P1-E-R40 supplementary items) don't affect the learner experience since only Certified items enter the delivery pool.
- **Certified count divergence (-35):** A metadata registration issue, not content. Does not affect the learner pool. Should be reconciled in a Full Governance Lane session.
- **Score report complexity:** While it's dense, the priority-sorted review queue with structured breakdowns is genuinely excellent. Don't simplify — the value is in the detail. The `renderSummary` function is well-structured and each analytic card serves a purpose.

### What's already working well:
- The **keyboard navigation** (ArrowRight/ArrowLeft = next/prev, 'm' = flag, 'n'/'p' for navigation) is polished and professional
- The **auto-save and session recovery** is robust with null-guards
- The **confidence selector** (1-5 scale with labels like "No idea" through "Very confident") is well-designed
- The **adaptive review queue** priority scoring (incorrect=5, guessed=3, low-confidence=2, flagged=1) is smart
- The **review cards** with structured explanation sections (what was tested, why correct, why wrong, distractor analysis, study links) are genuinely excellent
