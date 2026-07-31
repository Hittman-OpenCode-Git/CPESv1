# S110P — Exam Fidelity & Candidate Experience Plan

**Session:** 110P
**Date:** 2026-07-31
**Governance Lane:** Light
**Type:** Product Analytics & Exam Fidelity Audit (Read-Only)

---

## 1. Session Objective

Compare the current CMA Part 1 2026 Practice Simulator experience against actual CMA examination behavior at Prometric test centers and premium commercial CMA prep platforms (Gleim, Becker, Hock, Surgent), identifying improvements that increase realism and reduce candidate friction — without changing question content, answer keys, certification state, or May coaching logic.

## 2. Scope & Boundaries

### IN SCOPE
- Exam workflow realism (navigation, timing, flagging, review, submission)
- Candidate UX friction (clicks, confusion, discoverability, accessibility)
- Feature parity with commercial prep platforms
- Partially-built May features that could be surfaced
- UI polish and micro-interactions
- Keyboard navigation and ARIA compliance
- Setup, exam, review, and results workflows

### OUT OF SCOPE
- Question content, answer keys, or explanations
- Case study content or exhibit data
- Certification state changes
- May coaching logic modifications
- Scoring algorithm changes
- Pack file modifications
- Application file writes (read-only audit)

## 3. Methodology

### Phase 1 — Planner
- Read full app.js (4,340 lines), index_updated.html (41 lines), styles.css (4,304 lines)
- Read 24 May source files (~15,000 lines total)
- Map all navigation states, render modes, UI components
- Identify all user-facing interaction points

### Phase 2 — Auditor
- **Exam Fidelity Audit:** Compare 18 dimensions against CMA Prometric exam behavior
- **Commercial Audit:** Compare against Gleim, Becker, Hock, Surgent feature sets
- **Friction Audit:** Count clicks, identify dead-ends, measure discoverability

### Phase 3 — Implementer
- Generate gap analysis with evidence and line references
- Build commercial feature comparison matrix
- Rank every improvement by: Value / Effort / Risk / CMA Realism Impact

### Phase 4 — Verifier
- Cross-check findings against raw source evidence
- Verify all recommendations are parallel-safe with active lanes
- Run governance check (no pack/case/content spill)

## 4. Architecture Baseline

### 4.1 Application Architecture

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| Exam Engine | app.js | 4,340 | Monolithic SPA, all exam/review/results logic |
| UI Shell | index_updated.html | 41 | Static HTML + script tags |
| Styling | styles.css | 4,304 | CSS variables, light/dark theme, responsive |
| May Coaching | may-*.js (24 files) | ~15,000 | Rule-based coaching, readiness, recommendations |
| Content Packs | pack_*_corrected.js (5) | — | 2,545 certified MCQs |
| Case Packs | case_pack_*_corrected.js (3) | — | 75 case studies |

### 4.2 Major View States (app.js render tree)

```
No session          → Setup landing page (sessionView)
Session active      → renderMCQ() or renderCase() (sessionView)
Session completed   → renderSummary() score report (sessionView)
Dashboard tab       → PerformanceDashboard (dashboardView)
History tab         → renderHistory() (historyView)
May tab             → May.renderView() (coachView)
Catalog tab         → renderCatalog() (catalogView)
```

### 4.3 MCQ Workflow (renderMCQ, line 1700)
1. Render: stem + 4 choice buttons + item tools + navigator + May mini-panel + calculator
2. Click choice → save answer, score, re-render same MCQ with selection highlighted
3. May.showPostAnswerFeedback() (line 1774) — only feedback mechanism
4. Next/Previous buttons or ArrowRight/ArrowLeft keys
5. Navigator grid buttons for direct jump

### 4.4 Case Study Workflow (renderCase line 1849, renderCaseExam line 1903)
- Practice mode: all exhibits + all items in one scrollable page
- Full exam mode: exhibit tabs + task-by-task navigation (Prometric-style)
- Answer types: numeric, select, multi, fill, match

### 4.5 Review/Submission (renderReviewScreen line 2042)
- Summary table: MCQ rows + Case rows with status and flag indicators
- "Back to Items" → returns to last position
- "Submit Session" → finish() → renderSummary()

### 4.6 Score Report (renderSummary line 2198)
- Scaled score (0-500), grade band, pass/fail
- MCQ vs CBQ split, section performance, topic performance
- Weakest & Strongest Areas, Remediation Plan
- May recommendation panel, Recovery Sprint bar
- Adaptive Review Queue with 4 filters

## 5. Delivery Plan

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 1 | Exam Fidelity Plan | reports/S110P_EXAM_FIDELITY_PLAN.md | This document |
| 2 | Fidelity Gap Analysis | reports/S110P_FIDELITY_GAP_ANALYSIS.md | To be generated |
| 3 | Commercial Feature Matrix | reports/S110P_COMMERCIAL_FEATURE_MATRIX.md | To be generated |
| 4 | UX Priority Ranking | reports/S110P_UX_PRIORITY_RANKING.md | To be generated |
| 5 | Next 10 Features | reports/S110P_NEXT_10_FEATURES.md | To be generated |
| 6 | Exam Realism Score | reports/S110P_EXAM_REALISM_SCORE.md | To be generated |

## 6. Success Criteria

- [x] No repository modifications
- [x] No pack modifications
- [x] No May logic modifications
- [x] No certification changes
- [ ] Clear UX roadmap produced
- [ ] Clear exam-fidelity roadmap produced
- [ ] Parallel-safe with all active lanes (Recovery Sprint, Confidence Dashboard, Readiness UX, Governance Rule 11)

## 7. Cross-Reference

- **Recovery Sprint:** apps.js `_renderRecoverySprintBar()` (line 2137), `startRecoverySprint()` (line 2408)
- **Confidence Dashboard:** Confidence data collected per-MCQ (line 1708), confidence mismatch detection (line 751)
- **Readiness UX:** `MayDashboardModel.generate()` (may-dashboard-model.js), `MayReadinessScorer.estimate()` (may-readiness-scorer.js)
- **Governance Rule 11:** Not yet defined — this session's output informs its design
