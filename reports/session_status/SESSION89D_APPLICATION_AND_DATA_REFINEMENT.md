# Session 89D — Application & Data Refinement Wave

**Date:** 2026-07-25
**Scope:** May hardening, learner-pool safety, recommendation quality, post-89C follow-through
**Status:** Complete — 186/186 tests PASS

---

## Pre-Flight

| Item | Status |
|------|--------|
| SESSION86 QA report | Reviewed — identified May issues |
| SESSION89B report | Reviewed — confirmed difficulty/boilerplate state |
| SESSION89C report | Reviewed — confirmed boilerplate-free state |
| may-core.js (2216 lines) | Inspected |
| app.js (3776 lines) | Inspected |
| may-learner-state.js (542 lines) | Inspected |
| Backups created | may-core, app, may-learner-state, REVISION_HISTORY (s89d prefix) |

---

## Workstream 1 — Pack-Aware & Defect-Aware Recommendation Gating

**Verdict:** Largely implemented in prior sessions. `assignTier` (app.js:173) filters by `question_state`, delivery blocklist, and defect manifest. Section-scoped filtering in `ExamSessionManager.start()`. Recommendation dedup uses `_similarityKey` and `_fallbackSimKey` (Session 88).

**Added in 89D:** `_findSimilarQuestions` now filters out:
- Delivery-blocked QIDs (via `_isDeliveryBlocked()`)
- Defect-manifest QIDs (via `_isBlockedByDefectManifest()`)
- Contested QIDs (via `isQuestionContested()`)

This ensures May recommendations and recovery sets never surface blocked/defective items.

---

## Workstream 2 — Hint Tracking Fix

**Bug found:** `recordLiveAttempt` (may-core.js:1771) used `this.context._liveHintCount || 0` as the hint count. `_liveHintCount` was reset to 0 after each answer (line 1772), causing `hintsUsed` to be recorded as 0 for ALL attempts. Per-QID hint tracking existed in `_sessionHints` but was not consulted.

**Fix:** Changed to use per-QID `_sessionHints` preferentially:
```javascript
// Before:
let actualHints = hintsUsed || (this.context._liveHintCount || 0);

// After:
let actualHints = (this.context._sessionHints && this.context._sessionHints[qid]) || hintsUsed || (this.context._liveHintCount || 0);
```

**Impact:** Hint-dependent analytics (cluster `hintDependent`, trend `hintTrend`) can now activate when supported by data. `handoffCompletedSession` already reads from `_sessionHints` correctly.

---

## Workstream 3 — Recommendation Logging

**Verdict:** Already implemented. `_recommendSimilar` (line 966) and `_recommendNext` (line 1033) both call `MayLearnerState.logRecommendation()`. Logging records timestamp, topic, reason, QIDs, exclusions, session context. Buffer capped at 200 entries.

No additional changes needed in 89D.

---

## Workstream 4 — Exam-Mode Safety

**Verdict:** Fully implemented. Five-layer defense:
1. `isMiniPanelSuppressed()` (line 194) — hides mini-panel during `mode === 'full'`
2. `isFullTabBlocked()` (line 203) — blocks full May tab during active exam
3. `handleAction()` (line 261) — blocks answer-revealing actions
4. `setQuestionContext()` (line 222) — blocks context setting
5. `renderView()` (line 1481) — shows exam-safe informational view

No additional changes needed in 89D.

---

## Workstream 5 — Post-Session May Review

**Verdict:** Functional. Flow: `app.js:1413` → `handoffCompletedSession()` → collects attempts → `recordSessionSummary()` → `startSessionReview()` → builds review queue → `renderView()`.

Session 88 added review greeting banner. Link at results screen (`Review with May →`) opens coach view.

No additional changes needed in 89D.

---

## Workstream 6 — Outcome-Aware Recently-Seen

**Bug found:** `getRecentlySeen()` (may-learner-state.js:406) was outcome-blind — ALL recently-seen items excluded from recommendations and recovery sets, regardless of whether they were answered correctly. This suppressed items the learner actually needed to revisit.

**Fix:** 
1. Added `getRecentlySeenByOutcome()` (may-learner-state.js) — returns `{ correct: [], missed: [], all: [] }`
2. Updated `_recommendNext()` — excludes only recently-CORRECT items; recently-MISSED can appear
3. Updated `_generateRecoverySet()` — same outcome-aware exclusion with fallback

**Impact:** Recovery sets can now pull useful remediation items even if recently seen. No repeat spam (correct items still excluded).

---

## Workstream 7 — Defect-Manifest Alignment

**Verdict:** Manifests already exist:
- `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` — 15 similarity families, 72 blocked QIDs
- `governance/DEFECT_MANIFEST_DL008_DL026.json` — 117 blocked QIDs

Both loaded at runtime. Integration improved in 89D via `_findSimilarQuestions` filtering.

No manifest file changes needed in 89D.

---

## Tests

| Suite | Tests | Result |
|-------|-------|--------|
| test_governance_guard.js | 20 | **PASS** |
| test_may_stagec.js | 62 | **PASS** |
| test_may_regression_r2.js | 42 | **PASS** |
| test_may_renderer.js | 62 | **PASS** |
| **Total** | **186** | **ALL PASS** |

No CorrectChoice changes. No question_state changes. No MCQ/case content modified.

---

## Open Issues (Deferred)

| Issue | Priority | Notes |
|-------|----------|-------|
| May case-review support (G2F) | HIGH | May handles MCQ only; case tutoring deferred |
| DL-014 app.js sibling null guard | LOW | Defensive hardening |
| Full session assembly test | MEDIUM | Would verify end-to-end recommendation + recovery in browser |
| Hint tracking verification | MEDIUM | Needs browser-based test to confirm `hintsUsed` flows to localStorage |

---

## Files Changed

| File | Lines Changed | Reason |
|------|--------------|--------|
| may-core.js | ~15 | Hint fix, outcome-aware recovery, defect filtering |
| may-learner-state.js | +13 | `getRecentlySeenByOutcome()` |
| knowledge/REVISION_HISTORY.md | +1 entry | Session 89D append |

---

## Deferred REVISION_HISTORY Block

```
## Session 89D — Application & Data Refinement Wave (2026-07-25)

**Scope:** May hardening, learner-pool safety, post-89C follow-through. No content file changes.

### Fixes Applied
- **Hint tracking:** recordLiveAttempt now uses per-QID _sessionHints (was always 0)
- **Outcome-aware recovery:** getRecentlySeenByOutcome separates correct vs missed. Recommendations now exclude only recently-correct items; missed items can reappear in recovery
- **Defect filtering:** _findSimilarQuestions now filters out delivery-blocked, defect-manifest, and contested QIDs
- **Verified:** Exam-mode safety (5-layer defense intact), post-session review (functional), recommendation logging (already implemented)

### Verification
- 186/186 tests PASS (governance guard 20, may stagec 62, may regression 42, may renderer 62)
- No CorrectChoice, question_state, or content file changes
- Backups: may-core, app, may-learner-state, REVISION_HISTORY (s89d prefix)

### Files
- may-core.js: 3 edits (hint fix, outcome-aware recovery, defect filtering in _findSimilarQuestions)
- may-learner-state.js: 1 addition (getRecentlySeenByOutcome)
```
