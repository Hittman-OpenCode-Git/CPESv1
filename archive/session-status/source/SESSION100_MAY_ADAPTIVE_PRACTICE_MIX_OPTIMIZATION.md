# Session 100 — May Adaptive Practice Mix Optimization

**Date:** 2026-07-25
**Scope:** CommandCode — may-learner-state.js, may-core.js, styles.css. No content file modifications.
**Status:** Complete

---

## Pre-Flight Discovery

**Files inspected:**
- `may-learner-state.js` (437 lines) — confirmed `getCasePatternPracticeGuidance()`, `getCasePatternSummary()`, `getCasePatternTrends()`, `getTrends()`, `getWeaknessClusters()`, `getTopicProgress()`
- `may-core.js` (2689 lines) — confirmed `_renderCasePatternInsights()`, `_renderCasePracticeGuidance()`, `_isBlockedByDefectManifest()`, `isFullTabBlocked()` at line 1603
- `styles.css` — confirmed existing S98/S99 sidebar styles

**Key gap:** May could identify patterns and suggest targeted practice types, but had no model to decide *which format* (MCQ, case, mixed, untimed) the learner should use next. The decision always defaulted to the generic recommendation engine.

**Backups:** .bak-s100-20260725112525 for may-learner-state.js, may-core.js, styles.css

---

## Implemented Changes

### WS1 — Adaptive practice mix model (may-learner-state.js)

**`getAdaptivePracticeMix()`** — 130-line decision function

Uses 6 input signals to classify the next best practice mode:

| Signal | Source |
|--------|--------|
| MCQ weakness count/depth | `getWeaknessClusters().persistentWeak`, `.declining`, `.unstable` |
| MCQ stability | All 3 cluster groups empty + ≥3 topics |
| Case pattern severity | `getCasePatternSummary()`, `getCasePatternTrends()` — worsening/total counts |
| Case stability | Zero worsening, ≤1 mixed patterns |
| MCQ/case score gap | Last session `mcqPct` vs `casePct` from session summaries |
| Session count | `data.sessions.length` |

**Decision tree** (priority order):

1. **Insufficient Data** — < 1 session, or < 2 sessions with sparse data
2. **MCQ Reinforcement** — ≥3 persistent-weak topics with stable cases, OR ≥2 declining topics with no case data, OR MCQ score 20%+ below case score
3. **Case Reinforcement** — ≥2 worsening case patterns with stable MCQ, OR case score 20%+ below MCQ score
4. **Untimed Recovery** — ≥2 unstable topics
5. **Mixed Reinforcement** — both MCQ and case issues present, OR all-clear maintenance, OR strong MCQ ready for case introduction
6. **Mixed Reinforcement** — fallback for any other state

Returns `{ mode, reason, howTo, badge }` — never specific QIDs.

### WS2 — Recommendation logic integration (may-core.js)

**`_renderAdaptivePracticeMix()`** — renders the practice mode recommendation card

- Appears in sidebar as "Practice Mode" panel
- Shows: icon + mode name + colored badge (MCQ-first/Green, Case-first/Blue, Mixed/Amber, Untimed/Red)
- One-line reason grounded in actual counts
- Arrow-bulleted "how to" line
- Returns empty string for "Insufficient Data"

### WS3 — UI surface (styles.css)

New CSS classes:
- `.may-mix-panel` — section container with top border
- `.may-mix-card` — flex row with icon, mode name, badge
- `.may-mix-badge-mcq` / `-case` / `-mixed` / `-untimed` — colored pill badges
- `.may-mix-reason` — secondary-text rationale
- `.may-mix-howto` — arrow-bulleted action text

### WS4 — Graceful fallbacks

| Condition | Behavior |
|-----------|----------|
| 0 sessions | Returns "Insufficient Data" |
| 1-2 sessions, sparse data | Returns "Insufficient Data" |
| Conflicting signals | Priority order resolves to Mixed Reinforcement |
| Strong MCQ only, no case data | Suggests Mixed Reinforcement with case introduction |
| Strong case only, no MCQ weakness | Falls through to Mixed Reinforcement |
| Exam mode | `isFullTabBlocked()` at line 1603 short-circuits all rendering |

### WS5 — Safety preservation

No changes to exam-mode blocking, manifest gating, delivery blocklist, Certified-only filters, hint tracking, or any content files.

---

## Testing

| Suite | Result |
|-------|:---:|
| `test_governance_guard.js` | 20/20 **PASS** |
| `test_may_stagec.js` | 62/62 **PASS** |
| `test_may_regression_r2.js` | 42/42 **PASS** |
| `test_may_renderer.js` | 62/62 **PASS** |
| **Total** | **186/186 PASS** |

Parse-check: may-learner-state.js (575 lines), may-core.js (2726 lines) — both parse clean.

---

## Files Modified

- `may-learner-state.js` — +1 function (`getAdaptivePracticeMix`, ~130 lines)
- `may-core.js` — +1 method (`_renderAdaptivePracticeMix`, ~35 lines), sidebar wiring
- `styles.css` — +69 lines (practice mix panel, card, badge, reason, how-to styles)

---

## Open Issues / Deferrals

- **Content availability check** — the model doesn't verify how many safe case items exist before recommending case practice
- **Per-section recommendations** — mix optimization is global, not per-section
- **No numeric difficulty calibration** — the model uses cluster counts but not difficulty-weighted adjustments
- **No confidence calibration integration** — confidence data (overconfident/underconfident) not yet a signal input
