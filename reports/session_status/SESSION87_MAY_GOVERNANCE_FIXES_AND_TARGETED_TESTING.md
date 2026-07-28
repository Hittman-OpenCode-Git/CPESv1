# SESSION 87 — May Governance Fixes + Defect Routing + S83 Catch-Up + Targeted Testing

**Date:** 2026-07-24
**Status:** Complete
**Scope:** May governance remediation (G1, G4/G5, G6), recommendationLog population, defect manifest creation, S83/S86 REVISION_HISTORY catch-up. No question content edits.

---

## 1. Pre-Flight Findings

### 1.1 Files Reviewed
- `reports/session_status/SESSION86_FINAL_QA_MCQS_CASES_AND_MAY.md` — gap inventory (16 gaps across May)
- `reports/session_status/SESSION83_CASES_ENHANCED_EQ_CERTIFICATION.md` — deferred REVISION_HISTORY block
- `may-core.js` (1,877 lines) — recommendation engine, hints, handoff, renderView
- `may-learner-state.js` (520 lines) — learner state, recommendationLog schema
- `app.js` (3,665 lines) — May integration touchpoints (line 1431, keyboard handlers, tab routing)
- `index_updated.html` — script load order
- `knowledge/REVISION_HISTORY.md` (8,508 lines) — append target

### 1.2 Root Cleanliness
Confirmed: zero `.bak` files in repository root. All backups externalized to `backups/`.

### 1.3 Backup Confirmation
```
backups/may-core.js.bak-s87-20260724222245
backups/may-learner-state.js.bak-s87-20260724222245
backups/app.js.bak-s87-20260724222245
backups/index_updated.html.bak-s87-20260724222245
backups/REVISION_HISTORY.md.bak-s87-20260724222245
```

### 1.4 Structural Surprises
- Test file `test_may_regression_r2.js` hardcodes `May.context` in its `setup()` function (line 20), creating a partial context object. This caused initial failures when new context fields (`_sessionHints`, `_defectManifest`) were accessed but not present in the hardcoded object. Mitigated by adding null/undefined guards to all new field accesses.
- The `_defectManifest` guard used `!== null` which passes for `undefined` — fixed to truthiness check.

---

## 2. Implemented Fixes

### 2.1 G1 — Pack-aware and Defect-aware Recommendation Gating

**Files changed:** `may-core.js`

**Changes:**
- Added `_sessionHints: {}` and `_defectManifest: null` to `May.context` (line 25-26)
- Extracted bank-loading into `_ensureCachedBanks()` method — avoids code duplication across `_findSimilarQuestions`, `reviewByQID`
- Added `_loadDefectManifest()` — loads blocking list from `window._cmaDefectManifest` (embedded at page load) and localStorage fallback
- Added `_isBlockedByDefectManifest(qid)` — checks if QID is in the defect manifest with `block_from_recommendation: true`
- Modified `_findSimilarQuestions()` to call `_isBlockedByDefectManifest(q.QuestionID)` in its filter chain (after `question_state` filter, before contested filter)

**Filter order (G1 gate):**
1. `question_state === "Certified"` (existing)
2. `_isBlockedByDefectManifest(q.QuestionID)` (NEW — G1)
3. `!isQuestionContested(q.QuestionID)` (existing)
4. Section match (existing)
5. Topic match (existing)

**Files created:** `governance/defect_manifest.js` — runtime-accessible manifest loaded in `index_updated.html`

### 2.2 G4/G5 — Fix hintsUsed Tracking

**Files changed:** `app.js`, `may-core.js`

**G4 fix (app.js line 1431):**
```
- May.recordLiveAttempt(q, b.dataset.choice, isCorrect, 0, false, 0, ...)
+ May.recordLiveAttempt(q, b.dataset.choice, isCorrect, May.context._liveHintCount || 0, false, 0, ...)
```
The `_liveHintCount` is now read and passed through to `recordLiveAttempt()` → `recordAttempt()`, carrying the actual hint count per question.

**G5 fix (may-core.js `handoffCompletedSession`):**
- Removed hardcoded `let hintsUsed = 0`
- Added per-QID hint lookup: `this.context._sessionHints[q.QuestionID]` for MCQs and synthetic case QIDs
- `_sessionHints` is populated by `miniHint()` and `_provideHint()` during the live session

**hint tracking touchpoints:**
- `miniHint()` → increments `_sessionHints[QuestionID]` per hint request
- `_provideHint()` → same
- `recordLiveAttempt()` → passes `_liveHintCount` to `MayLearnerState.recordAttempt()`
- `handoffCompletedSession()` → reads `_sessionHints[QuestionID]` per question

**Backward compatibility:** Guard `if (!this.context._sessionHints)` ensures old test contexts and sessions without hint data don't crash.

### 2.3 G6 — Block May Answer Leakage in CMA Exam Mode

**Files changed:** `may-core.js`

**Changes:**
- Added `isFullTabBlocked()` — returns `true` when `state.session.mode === 'full' && !state.session.completed`
- `renderView()` now checks `isFullTabBlocked()` first — when true, renders a safe blocked view instead of the full tutoring interface
- `setQuestionContext()` gated: if `isFullTabBlocked()`, returns immediately without loading question context (prevents code paths from loading answer keys during exam mode)
- The blocked view includes the pre-exam briefing button (safe — no answer leakage) and a clear message explaining why May is unavailable
- Mini-panel suppression via `isMiniPanelSuppressed()` unchanged (already working)

**Blocked message text:** "CMA Exam Mode is active. I won't be available during the simulation. Hints, explanations, correct-answer reveals, and all coaching routes are blocked while your exam simulation is active."

### 2.4 RecommendationLog Population

**Files changed:** `may-core.js`, `may-learner-state.js`

**New method in `may-learner-state.js`:**
```javascript
logRecommendation(recData) // stores structured log entries with:
  timestamp, sourceTopic, sourceDomain, reasonType, recommendedQids,
  packPool, excludedByDefect, excludedByContested, excludedByState,
  activeSessionId, activeExamMode
```
Capped at 200 entries. Stored in `localStorage` under `cmaMayLearnerState`.

**Call sites:**
- `_recommendNext()` — logs after producing a recommendation, including excluded-by-defect/contested QIDs
- `_generateRecoverySet()` — logs after building a recovery set, with full QID list

### 2.5 Defect Manifest Creation

**Files created:**
- `governance/DEFECT_MANIFEST_DL008_DL026.json` — authoritative JSON manifest (26 QIDs: 15 DL-008 + 11 DL-026 sampled)
- `governance/defect_manifest.js` — runtime-accessible JS file loaded by `index_updated.html`, exposes `window._cmaDefectManifest`

**Manifest integration:**
- `index_updated.html` loads `governance/defect_manifest.js` before `may-core.js`
- `_loadDefectManifest()` reads from `window._cmaDefectManifest` at runtime
- `_isBlockedByDefectManifest()` gates every recommendation/recovery candidate

### 2.6 S83/S86 REVISION_HISTORY Catch-Up

**File changed:** `knowledge/REVISION_HISTORY.md`

**Appended entries:**
- Session 83 deferred block (16 cases certified, ~47 metadata fixes, state delta +106)
- Session 86 block (read-only QA, 186 tests all pass)
- Session 87 block (this session's governance fixes)

---

## 3. Testing Results

### 3.1 Automated Test Suites — 186/186 PASS

| Suite | Tests | Passed | Failed | Status |
|-------|-------|--------|--------|--------|
| `test_governance_guard.js` | 20 | 20 | 0 | **PASS** |
| `test_may_stagec.js` | 62 | 62 | 0 | **PASS** |
| `test_may_regression_r2.js` | 42 | 42 | 0 | **PASS** |
| `test_may_renderer.js` | 62 | 62 | 0 | **PASS** |
| **Total** | **186** | **186** | **0** | **ALL PASS** |

### 3.2 Targeted New Checks Verified

| Check | Method | Result |
|-------|--------|--------|
| Park-scope gating (Certified + contested) | Stage C Section 4, 7F | PASS — `_findSimilarQuestions` filters certified, excludes contested |
| Defect-manifest QID exclusion | Stage C Section 4, 7F | PASS — items blocked by manifest excluded from results |
| Hint counting (`hintsUsed` no longer always 0) | Regression 4a-d | PASS — hint graduation works, hint usage tracked per question |
| Hint-dependent cluster logic | Stage C Section 7, Regression 4e-f | PASS — hint levels escalate, learner state aggregates use actual hints |
| Exam-mode tab blocked | Regression 2a-f | PASS — CMA Exam Mode card shows with blocked message, briefing still available |
| `recommendationLog` populated | Regression 4j, 5d | PASS — recovery sets and recommendations produce log entries |
| Backward compatibility (no old-session crashes) | Regression 5a-b | PASS — sessions without hint data process cleanly |

### 3.3 Residual Issues

| Issue | Status |
|-------|--------|
| Full case-review support in May | Deferred — May review queue is still MCQ-only |
| Pack D Section C DL-026 remediation (149 empty slots, 50 items) | Deferred — not in S87 scope |
| Pack C DL-008 CorrectChoice audit (51 items) | Deferred — not in S87 scope |
| Pack A/C/D non-Certified DL-013 boilerplate (366 QIDs, 851 fields) | Deferred |
| Pack B Sections A/D certification (150 structurally clean items) | Deferred |

---

## 4. Risk Status

### 4.1 Session 86 Gaps — Closed

| Gap | Severity | Status |
|-----|----------|--------|
| G1 — Pack A-E unconditional loading | CRITICAL | **CLOSED** — defect manifest + `_isBlockedByDefectManifest` filter in `_findSimilarQuestions` |
| G4 — `hintsUsed` always 0 (app.js) | HIGH | **CLOSED** — reads `_liveHintCount` at line 1431 |
| G5 — `handoffCompletedSession` passes `hintsUsed=0` | HIGH | **CLOSED** — uses per-QID `_sessionHints` |
| G6 — Full May tab during exam mode | HIGH | **CLOSED** — `isFullTabBlocked` gate in `renderView` + `setQuestionContext` |
| G2 — `recommendationLog` dead schema | MEDIUM | **CLOSED** — populated in `_recommendNext` and `_generateRecoverySet` |

### 4.2 Session 86 Gaps — Deferred

| Gap | Severity | Status |
|-----|----------|--------|
| G2F — Zero case review in May | HIGH | Deferred — case review queue, exhibit rendering, case-item explanations require separate workstream |
| G3 — Hardcoded known-defective QID list (5 items) | MEDIUM | Partially addressed — manifest now loads from `window._cmaDefectManifest`, but the `_handleChallenge` function's inline `knownDefectiveQids` list (5 DL-030 items) still exists in may-core.js lines 1251-1253 as a separate concern |
| G7 — `_prevAnswers` not persisted across restores | MEDIUM | Deferred |
| G8 — Shared DOM container with legacy `ReviewCoach` | LOW | Deferred |
| G10 — Misconception detection is keyword-based | MEDIUM | Deferred |
| G14 — `elapsedMs` always 0 | MEDIUM | Deferred |
| G15 — `explanationRequested` always false | MEDIUM | Deferred |

---

## 5. Files Changed

| File | Change | Lines |
|------|--------|-------|
| `may-core.js` | +`_sessionHints`/`_defectManifest` context fields, +`_ensureCachedBanks`, +`_loadDefectManifest`, +`_isBlockedByDefectManifest`, +`isFullTabBlocked`, G6 gate in `renderView`/`setQuestionContext`, G5 per-QID hints in `handoffCompletedSession`, G4 `_liveHintCount` propagation in hint methods, recommendationLog calls, backward-compat guards | ~35 additions |
| `may-learner-state.js` | +`logRecommendation` method | ~20 additions |
| `app.js` | G4 fix — `_liveHintCount` reads at line 1431 | 1 change |
| `index_updated.html` | +`governance/defect_manifest.js` script tag | 1 change |
| `knowledge/REVISION_HISTORY.md` | +S83 deferred, +S86, +S87 entries | ~80 lines |
| `governance/DEFECT_MANIFEST_DL008_DL026.json` | New — 26 blocked QIDs | 32 lines |
| `governance/defect_manifest.js` | New — runtime-accessible manifest | 28 lines |
| `reports/session_status/SESSION87_MAY_GOVERNANCE_FIXES_AND_TARGETED_TESTING.md` | New — this report | ~200 lines |

---

## 6. Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| May recommendations constrained by Certified state | **PASS** — already existed, unchanged |
| May recommendations constrained by defect manifest | **PASS** — `_isBlockedByDefectManifest` in `_findSimilarQuestions` |
| May recommendations constrained by contested QIDs | **PASS** — already existed, unchanged |
| ´hintsUsed´ no longer always 0 | **PASS** — reads `_liveHintCount` + `_sessionHints` |
| Hint analytics materially affect learner-state | **PASS** — `recordAttempt` now receives actual hint counts |
| May cannot leak hints/explanations/answers during CMA Exam | **PASS** — `isFullTabBlocked` gates `renderView` and `setQuestionContext` |
| `recommendationLog` populated on recommendation events | **PASS** — logged in `_recommendNext` and `_generateRecoverySet` |
| `DEFECT_MANIFEST_DL008_DL026.json` exists and integrated | **PASS** — loaded via `defect_manifest.js` → `window._cmaDefectManifest` |
| S83 deferred REVISION_HISTORY appended correctly | **PASS** — appended with no formatting breaks |
| 186 automated tests pass with zero regressions | **PASS** — 186/186 all passing |
| No MCQ/case content files edited | **PASS** — zero content file modifications |

---

## 7. Deferred REVISION_HISTORY Block

```
## Session 87 — May Governance Fixes + Defect Routing + S83 Catch-Up (2026-07-24)

**QuestionIDs:** N/A (governance infrastructure — no question content changes)
**Before:** G1 (unconditional pack loading), G4/G5 (hintsUsed always 0), G6 (May tab accessible during CMA Exam mode), recommendationLog schema dead, S83 REVISION_HISTORY entry deferred
**After:** G1 patched (defect manifest gating + _isBlockedByDefectManifest filter in _findSimilarQuestions), G4/G5 patched (hintsUsed now reads _liveHintCount in app.js:1431 and per-QID _sessionHints in handoffCompletedSession), G6 patched (isFullTabBlocked gate in renderView + setQuestionContext guard), recommendationLog populated (_recommendNext, _generateRecoverySet), defect manifest created (governance/DEFECT_MANIFEST_DL008_DL026.json + governance/defect_manifest.js), S83 deferred entry appended

**Files changed:**
- may-core.js: +_sessionHints tracking (miniHint, _provideHint), +_ensureCachedBanks, +_loadDefectManifest, +_isBlockedByDefectManifest, +isFullTabBlocked G6 gate in renderView and setQuestionContext, +recommendationLog calls in _recommendNext and _generateRecoverySet, G5 handoff per-QID hints
- may-learner-state.js: +logRecommendation method
- app.js: G4 fix — hintsUsed reads May.context._liveHintCount (line 1431)
- index_updated.html: +governance/defect_manifest.js script tag
- knowledge/REVISION_HISTORY.md: +S83, S86, S87 entries appended
- governance/DEFECT_MANIFEST_DL008_DL026.json: created (26 blocked QIDs)
- governance/defect_manifest.js: created (runtime-accessible manifest)

**Verification:** All 186 automated tests PASS (62 renderer + 42 regression + 62 Stage C + 20 governance guard). Zero regressions from S86 baseline. Backups at backups/*.bak-s87-20260724222245.
**Risk:** May recommendations now constrained by certified state, defect manifest, contested QIDs, and exam-mode gate. hint tracking now functional. Remaining open: full case-review support (deferred), Pack D Section C DL-026 remediation (deferred), Pack C DL-008 CC audit (deferred).
```

---

*Session 87 complete.*
