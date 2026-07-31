# MAY-023 — User Workflow Assessment (Implementer Phase)

**Session:** MAY-023 — Controlled Production Rollout Validation
**Date:** 2026-07-31
**Governance Lane:** Light
**Phase:** Implementer — Production Flow Validation

---

## 1. Learner Journey Through Production Integration

### 1.1 Landing Page Experience

**State:** No session active. May companion card visible. Launcher floating bottom-right.

| Element | Behavior | Flag-Gated? |
|---------|----------|-------------|
| May companion card | Injected by `May._injectMayCompanionCard()` | No (always present when May loaded) |
| Companion card — new learner | "Meet May" onboarding message | No (determined by MayLearnerState.hasProfile) |
| Companion card — returning learner | "Welcome back" with session count | No (determined by MayLearnerState.load()) |
| Launcher tooltip (flag OFF) | "May is here if you need help reviewing later." | No (default from may-core.js:6518) |
| Launcher tooltip (flag ON, 0 sessions) | "Meet May — your CMA Part 1 study companion." | **Yes (I2)** |
| Launcher tooltip (flag ON, 1-2 sessions) | "Analyze your missed questions or review your study plan with May." | **Yes (I2)** |
| Launcher tooltip (flag ON, 3+ sessions) | "Review weak areas, analyze missed questions, or continue your study plan with May." | **Yes (I2)** |

**Assessment:** The flag provides a tiered upgrade from generic launcher messaging to context-aware guidance. Without the flag, the launcher says the same thing regardless of learner history. With the flag, the message evolves with the learner's progress. **Non-intrusive — tooltip only appears on hover.**

### 1.2 Session Configuration Experience

**State:** Learner selects content, configures timer.

| Element | Behavior | Flag-Gated? |
|---------|----------|-------------|
| Companion card removal | Card removed when session form submits | No (app.js:3968, always) |
| Quick-start buttons | MCQ, Case, Mixed, Full — always present | No (app.js quickStart) |

No flag-gated changes to the session configuration workflow. The May companion card removal is always-on (non-gated) to ensure May doesn't distract during exam setup.

### 1.3 Active Session Experience

**State:** Exam in progress — timer running, questions displaying.

| Element | Behavior | Flag-Gated? |
|---------|----------|-------------|
| Launcher tooltip (flag OFF) | "May is here if you need help reviewing later." | No (default, never changes) |
| Launcher tooltip (flag ON) | "May is tracking your session. Review your results after submitting." | **Yes (I4)** |
| Launcher label (flag OFF) | "May" (default from may-core.js) | No |
| Launcher label (flag ON) | "May" (unchanged during session — changes post-submit) | N/A |

**Assessment:** The session-start tooltip (I4) sets appropriate expectations — "May is tracking" tells the learner May is aware of their progress but won't interrupt. The tooltip appears only on hover, so it never disrupts the exam experience. **Well-calibrated non-intrusion.**

### 1.4 Post-Submit Experience

**State:** Learner clicks Submit. Results summary rendered.

| Element | Behavior | Flag-Gated? |
|---------|----------|-------------|
| `May.handoffCompletedSession()` | Records all MCQ + case attempts to MayLearnerState | No (always called at app.js:1606) |
| Launcher tooltip (flag OFF) | Unchanged from default | No |
| Launcher tooltip (flag ON) | "Review your session with May — see strengths, weak areas, and next steps." | **Yes (I1)** |
| Launcher label (flag ON) | "May — Review" (changed from "May") | **Yes (I1)** |
| Recommendation panel (flag OFF) | Not rendered | **Gated (I3 returns '')** |
| Recommendation panel (flag ON) | 4-card grid below Readiness card | **Yes (I3)** |

**Assessment:** Post-submit is the primary value-delivery point for the production integration. Without the flag, the learner sees May as a static chat interface. With the flag, the results page includes a structured recommendation panel that extracts actionable insights from the just-completed session. **This is the flagship integration — the panel makes May's value visible without requiring the learner to open May.**

### 1.5 Results Page Layout Order

The recommendation panel (I3) appears at line 2254 in the summary, after:
1. Score Report (scaled score, grade, pass/fail)
2. MCQ vs CBQ Split
3. Section Performance
4. Topic Performance
5. Weakest & Strongest Areas
6. Targeted Remediation Plan
7. Study Plan Snippet
8. Review Coach Post-Session Card
9. Readiness Model Card
10. **May Recommendations Panel ← I3**

And before:
11. Adaptive Review Queue

**Placement assessment:** Correct. The panel appears after all score data (so the learner sees objective results first) and before the adaptive review queue (which is the primary post-session action). May recommendations augment the objective data with adaptive guidance. The positioning respects the learner's likely scan pattern: score → breakdown → gaps → May insights → review queue.

---

## 2. Self-Service Paths

### 2.1 "Open May for Full Coaching" Link

The recommendation panel (app.js:2152) includes:
```html
<a href="#" onclick="showView('coachView'); if(typeof May!=='undefined') May.renderView(); return false;">
    Open May for full coaching →
</a>
```

This link:
- Opens the May coaching view (`coachView`) ✓
- Calls `May.renderView()` to render May's full coaching interface ✓
- Uses `href="#"` with `return false` — no page navigation ✓
- Graceful: checks `typeof May !== 'undefined'` before calling ✓

### 2.2 Launcher Button

The floating launcher button (may-core.js:6519):
```html
<button onclick="May.openMayFromLauncher()">
```

This button is always present (not flag-gated). It opens the May coaching view regardless of `ENABLE_PRODUCTION_MAY_INTEGRATION`. The flag only affects the tooltip messaging and label.

### 2.3 May Coaching View

When opened, May's coaching view provides:
- Mode-based coaching (EXPLAIN, QUIZ, SOCRATIC, STUDY_PLAN, MOTIVATE, EXAM_REVIEW)
- Readiness dashboard with per-section and per-topic views
- Weakness cluster analysis
- Confidence calibration feedback
- Remediation practice generation

All coaching content is advisory-only. No answers are revealed. No content is modified. All LLM flags remain false.

---

## 3. Dark Theme Experience

All May production integration styles support dark theme:

| Element | Light Theme | Dark Theme | Verified |
|---------|------------|------------|----------|
| Recommendation panel | White background, gray border | Dark background, dark gray border | ✓ line 4112 |
| Rec cards | White with shadow | Dark with subtle border | ✓ line 4133 |
| Danger band | #fef2f2 background, #b91c1c text | #2d1414 background, #fca5a5 text | ✓ line 4161 |
| Warning band | #fffbeb background, #b45309 text | #2d2314 background, #fcd34d text | ✓ line 4162 |
| Info band | #eff6ff background, #1d4ed8 text | #141e2d background, #93c5fd text | ✓ line 4163 |
| Muted band | #f3f4f6 background, #6b7280 text | #1e2433 background, #9ca3af text | ✓ line 4164 |
| Launcher tooltip | White background | Dark background | ✓ line 3925 |
| Context buttons | Light styled | Dark styled | ✓ lines 4184-4189 |

**Dark theme assessment: Complete.** No colors are hardcoded to light-only. All May integration elements render correctly under both themes.

---

## 4. Edge Cases

### 4.1 No Learner Data (First Session)

- `sessionCount = 0` → `hasData = false` → panel returns `''` ✓
- Launcher tooltip: "Meet May — your CMA Part 1 study companion." ✓
- Companion card: "Hi, I'm May" onboarding variant ✓

### 4.2 Session with Zero Correct Answers

- `handoffCompletedSession()` records attempts with `isCorrect = false` ✓
- `getWeaknessClusters()` will show all topics as persistentWeak if they cross the 5-attempt threshold ✓
- `getReadinessSummary()` will show "Recovery needed" for all topics ✓
- Panel renders correctly — shows the worst topics in Top Weakness ✓

### 4.3 Session with All Correct Answers

- All topics show high accuracy ✓
- Readiness band: "Ready for focused review" or "Approaching review-ready" ✓
- Panel shows strong Readiness with muted color, no alarmist Top Weakness ✓

### 4.4 MayLearnerState Not Loaded

- `typeof MayLearnerState === 'undefined'` → panel returns `''` (line 2133) ✓
- Launcher tooltip null-guarded: checks `tooltip` element exists before setting textContent ✓

### 4.5 Browser localStorage Cleared

- `MayLearnerState.load()` returns empty data structure ✓
- `sessionCount = 0` → panel returns `''` ✓
- Launcher tooltip: "Meet May" onboarding (sessionCount = 0) ✓

### 4.6 Multiple Rapid Sessions

- Each `handoffCompletedSession()` call appends a new session to `data.sessions` array ✓
- No data race — JavaScript is single-threaded ✓
- `sessionCount` incrementally increases → panel becomes more informative over time ✓

---

## 5. Workflow Assessment Verdict

| Workflow | Assessment |
|----------|------------|
| Landing page → session config | Clean — May companion card present, launcher non-intrusive |
| Session in progress | Clean — May tracking, no interruption |
| Session submit → results | **Value-delivery point** — recommendation panel appears |
| Results → May coaching | One click: "Open May for full coaching →" |
| Dark theme | Complete — all elements render correctly |
| Edge cases | All 6 cases handled safely |
| Graceful degradation | Panel returns '' on any failure; launcher falls back to defaults |

**User workflow verdict: PASS.** The production integration creates a coherent learner journey where May becomes progressively more informative as the learner accumulates sessions. The first session is minimally intrusive (onboarding messaging only). Subsequent sessions gain the recommendation panel. The transition from "meet May" to "May is tracking your session" to "Review your session with May" to the full recommendation panel is natural and non-disruptive.

---

*MAY-023 — User Workflow Assessment — 2026-07-31*
