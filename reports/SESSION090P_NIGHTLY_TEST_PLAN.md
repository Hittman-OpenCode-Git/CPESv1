# Session 90P — Nightly Test Plan

**Session:** 90P  
**Lane:** Governance Light  
**Date:** 2026-07-30  
**Status:** Active

---

## 1. Inventory: Runtime Flows

### 1.1 Session Startup Flow
- `index_updated.html` loads → 38 script tags (5 packs + 3 case packs + 27 May scripts + app.js)
- Theme detection (`localStorage.cma-theme`) → light/dark
- DOMContentLoaded → `renderCatalog()`, `renderDefectDiagnostics()`, `renderValidation()`
- `restore()` check → if saved session exists, show recovery prompt
- Session Form: mode (MCQ/Case/Mixed/Full), sections (A-F checkboxes), count selectors, difficulty distribution
- Quick start buttons: `quickStart('mcq')`, `quickStart('case')`, `quickStart('mixed')`, `quickStart('full')`
- Timer estimate updates based on mode + question count

**Friction points:**
- [ ] 38 script tags — load time could degrade on slow connections
- [ ] No loading indicator during bank initialization
- [ ] Session form defaults may not be clear to first-time users
- [ ] Timer estimate of "108 seconds per MCQ" is hardcoded — not configurable

### 1.2 Session Completion Flow
- MCQ gate: answer all MCQs → "Review Before Cases" button appears
- Case section: navigate through cases with task/exhibit panels
- Review screen: before-submit review showing answered/marked/unanswered counts
- Submit: `ExamSessionManager.submit()` → scores calculated → results screen
- Results screen: score, grade band, domain breakdown, per-item review, May coaching link
- History: saved to localStorage, displayed in History panel

**Friction points:**
- [ ] MCQ-to-Case transition gate is a modal; some users may not realize they can still review MCQs
- [ ] Review screen shows all items — no filter for "only missed" or "only marked"
- [ ] Results screen can be dense; grade band might not be prominent enough at first glance

### 1.3 Review Flow
- "Review Missed/Marked" — filtered view of previously completed items
- Click item → see stem, choices, correct answer, explanation
- Study links for each topic
- "Review with May" link at bottom

**Friction points:**
- [ ] Review does not preserve the original test-taking interface (no timer, no choice layout)
- [ ] Study links are generic per topic, not per question

### 1.4 Timer Flow
- Timer starts at session creation (`startTimer()` → `setInterval` every 1s)
- Display: `fmt(timeLeft)` with color transitions (normal → warning at <5min → danger at <1min)
- Timer bar: progress bar showing elapsed/total percentage
- Warnings: popup at 15 min, 5 min, 1 min remaining
- Pause: freezes timer and autosave
- End: timer reaches 0 → auto-submit

**Friction points:**
- [ ] Timer bar and text timer update independently (two DOM queries per tick)
- [ ] No visual distinction between "paused" and "running" in the timer display
- [ ] Timer warnings use `alert()`-style popups — not integrated with the UI theme

### 1.5 Score Reporting Flow
- Submit → `practiceScores()` → per-MCQ correct/incorrect, per-case item correctness
- Grade bands: "Superior," "Above Average," "Competent," "Marginal," "Needs Study"
- Domain breakdown: by Section A-F, with bar charts
- Topic analysis: by Topic tag
- Dashboard: cumulative stats across all sessions

**Friction points:**
- [ ] Grade bands show raw score only — no percentile comparison
- [ ] Domain breakdown shows counts but doesn't weight by section importance
- [ ] No "weak areas" prioritization without May coaching

---

## 2. Nightly Test Scenarios

### 2.1 15-MCQ Sanity Run
| Parameter | Value |
|-----------|-------|
| Mode | MCQ Practice |
| Sections | A+B (mixed) |
| Count | 15 MCQs |
| Expected Duration | ~27 minutes |
| Purpose | Quick system health check |

### 2.2 50-MCQ Timing Run
| Parameter | Value |
|-----------|-------|
| Mode | MCQ Practice |
| Sections | A, B, C, D (all) |
| Count | 50 MCQs |
| Expected Duration | ~90 minutes |
| Purpose | Timer behavior verification, mid-session stability |

### 2.3 100-MCQ Exam Simulation
| Parameter | Value |
|-----------|-------|
| Mode | Full Exam |
| Sections | All (A-F) |
| Count | 100 MCQs |
| Expected Duration | ~3 hours |
| Purpose | Full-exam simulation, long-session stability |

### 2.4 Case Study Validation Run
| Parameter | Value |
|-----------|-------|
| Mode | Case Studies |
| Sections | B (Budgeting) |
| Cases | 2 |
| Expected Duration | ~60 minutes |
| Purpose | Case rendering, exhibit navigation, scoring verification |

### 2.5 May Coaching Walkthrough
| Parameter | Value |
|-----------|-------|
| Trigger | After any session completion |
| Action | Click "Review with May" |
| Purpose | Verify May coaching layer activates and provides recommendations |

---

## 3. Friction Points Summary

| # | Area | Friction | Severity | Actionable? |
|---|------|----------|----------|-------------|
| 1 | Load | 38 script tags, no loading indicator | Medium | CSS-only spinner possible |
| 2 | Timer | Timer bar and text update separately | Low | Optimization deferred |
| 3 | Review | No filter for missed/marked on review screen | Low | Feature deferred |
| 4 | Results | Dense display, grade band not prominent | Low | CSS tweak possible |
| 5 | Startup | Session form defaults unclear | Low | Help text possible |
| 6 | Pause | No visual distinction between paused/running | Low | CSS-only indicator possible |
| 7 | Submit | No confirmation before final submit | Medium | Could add confirm modal |
| 8 | Navigation | Case nav between MCQs uses prev/next only | Low | Navigator available |
| 9 | Results | Grade band no percentile reference | Low | Feature deferred |
| 10 | Timer | Warning popup not themed | Low | CSS skip — alert is native |

---

## 4. Nightly Workflow

### Recommended Sequence
1. Open `index_updated.html` in browser
2. Verify catalog loads (no JS errors in console)
3. Run **15-MCQ Sanity Run** (~5 min active, quick answers)
4. Submit and verify score report renders
5. Run **Case Study Validation** (~10 min, answer all items)
6. Submit and verify case scoring
7. Click **"Review with May"** — verify May coaching activates
8. Check **History** panel — verify both sessions recorded
9. Close browser — reopen — verify **Session Recovery** prompt
10. Decline recovery — verify session data cleared

### Expected Pass Criteria
- All 5 banks load (500/500/500/500/545)
- All 3 case packs load (141/132/127 items)
- Timer starts, runs, and ends correctly
- Score reports generate with correct domain breakdown
- History persists across page reloads
- May coaching layer activates and produces recommendations
- Zero console errors (expected: 1 `file://` fetch warning)
