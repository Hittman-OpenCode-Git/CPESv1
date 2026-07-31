# Session 99 — May Case-Aware Practice Guidance from Pattern Insights

**Date:** 2026-07-25
**Scope:** CommandCode — may-learner-state.js, may-core.js, styles.css. No content file modifications.
**Status:** Complete

---

## Pre-Flight Discovery

**Files inspected:**
- `may-learner-state.js` — confirmed `getCasePatternSummary()`, `getCasePatternTrends()`, `casePatternLabel()`, `casePatternCoachingNote()` (Session 98)
- `may-core.js` — confirmed `_renderCasePatternInsights()`, `_generateRecoverySet()`, `_recommendNext()`, `_isBlockedByDefectManifest()`, `_ensureTopicIndex()`, exam-mode block at line 1603
- `styles.css` — confirmed existing pattern panel + coaching styles (Session 98)
- `SESSION98_MAY_CASE_PATTERN_ANALYTICS_AND_PROGRESS_VIEWS.md` — confirmed pattern insights surfaced in sidebar, pattern coaching notes, session banner diagnostic

**Key gap:** May could show *which* patterns exist but had no way to translate patterns into *actionable next steps*. The coaching notes were generic per-pattern advice, not data-driven "what to practice next" guidance.

**Backups:** may-learner-state.js.bak-s99-20260725111914, may-core.js.bak-s99-20260725111914, index_updated.html.bak-s99-20260725111914, styles.css.bak-s99-20260725111914

---

## Implemented Changes

### WS1 — Pattern-to-practice mapping (may-learner-state.js)

**`getCasePatternPracticeGuidance()`** — new function

- Returns `null` if insufficient case data (< 3 total case misses)
- For each of 5 patterns, maps to a concrete practice action + evidence-based "why" explanation
- Incorporates trend signals: worsening patterns get "This is getting worse." prefix
- Returns structured object with `{ dominant: { pattern, label, count, action, why, trend }, secondary: { ... } | null, hasEnoughData }`

| Pattern | Practice Action |
|---------|----------------|
| evidenceLocation | "Do a short untimed case set where you identify the relevant exhibit or scenario paragraph before evaluating any options." |
| calculationSetup | "Practice case calculation items with scratch paper — write the formula, label each input, and trace each number back to its source in the exhibits before computing." |
| exhibitInterpretation | "Work through cases with tables and schedules. For each exhibit, read the headers first, then find the row/column intersection your item asks for — before looking at the answer choices." |
| controlJudgment | "Review case scenarios that test control selection or risk assessment. For each, ask: what could go wrong here, which COSO component applies, and which control would catch it?" |
| answerElimination | "For case select/multi items, practice comparing each choice directly against the case evidence before selecting. Ask what makes this choice wrong for every distractor." |

### WS2 — Guidance card UI (may-core.js + styles.css)

**`_renderCasePracticeGuidance()`** — new renderer for "What to Practice Next" sidebar panel

- Appears below the Case Study Patterns panel
- Shows dominant pattern with arrow-bulleted action + italicized "why" explanation
- Shows secondary pattern (if present, ≥2 misses) in a slightly muted block
- Trend badges: "(improving)" in green, "(worsening)" in red
- Returns empty string when no guidance data exists

Wired into sidebar via `${practiceGuidanceHtml}` after the pattern insights panel.

**New CSS classes** (styles.css +63 lines):
- `.may-guidance-panel` — section container with top border
- `.may-guidance-block` / `.may-guidance-secondary` — guidance rows (secondary muted)
- `.may-guidance-action` — arrow-bulleted action text
- `.may-guidance-why` — italicized evidence snippet
- `.may-guidance-trend-good` / `.may-guidance-trend-bad` — green/red trend labels
- `.may-guidance-count` — miss count display

### WS3 — Certified-safe gating

The guidance is inherently content-safe:
- Never suggests specific QIDs — only practice *types*
- References only "case sets", "certified case review", "untimed sets" — no item-level content
- Exam-mode protection: `isFullTabBlocked()` at line 1603 short-circuits `renderView()` before any sidebar rendering, so guidance panels never appear during active exams
- No new recommendation logic — guidance sits alongside (not inside) the recommendation engine

### WS4 — Session-summary integration

The Session 98 banner diagnostic already covers session-level pattern reporting ("Your case misses were mostly evidence location issues this session"). No additional banner changes were needed — the guidance card in the sidebar provides the "what next" follow-through after the session-complete banner identifies "what happened."

---

## Safety Preservation

| Mechanism | Status |
|-----------|:---:|
| Exam-mode block (`isFullTabBlocked` at line 1603) | Untouched — guidance never renders during exam |
| Manifest gating (`_isBlockedByDefectManifest`) | Untouched |
| Delivery blocklist | Untouched |
| Certified-only filtering | Untouched |
| Hint tracking | Untouched |
| Any scored_cases*.js / pack_*.js | No writes |
| Specific QID exposure | None — guidance uses practice types only |

---

## Testing

| Suite | Result |
|-------|:---:|
| `test_governance_guard.js` | 20/20 **PASS** |
| `test_may_stagec.js` | 62/62 **PASS** |
| `test_may_regression_r2.js` | 42/42 **PASS** |
| `test_may_renderer.js` | 62/62 **PASS** |
| **Total** | **186/186 PASS** |

Parse-check: may-learner-state.js (437 lines), may-core.js (2689 lines) — both parse clean.

---

## Files Modified

- `may-learner-state.js` — +1 function (`getCasePatternPracticeGuidance`, ~55 lines)
- `may-core.js` — +1 method (`_renderCasePracticeGuidance`, ~35 lines), sidebar wiring
- `styles.css` — +63 lines (guidance panel, block, action, why, trend styles)

---

## Open Issues / Deferrals

- **Numeric exhibit extraction** — calculation guidance points to scratch-paper method but doesn't extract numbers
- **Topic-specific guidance** — patterns are currently global, not per-section/topic
- **Manifest-constrained fallback** — guidance doesn't check content availability per domain; May says "practice cases" but doesn't verify how many safe cases exist
- **Readiness scoring** — this session deliberately avoided readiness bands; that's a separate session
