# Session 16 — CMA-Aligned Scoring Design Execution

**Date:** 2026-07-24
**Status:** COMPLETE — ALL GATES PASSED

---

## 1. Pre-Write Gates

### 1.1 Baseline Integrity

| Property | Value |
|----------|-------|
| SHA-256 (pre-write) | `C6BB093B9D4990CD297BD92D9FA552D8EA1F0DAD44061F4CD3ABE096CB4D5EA4` |
| Byte size (pre-write) | 113,475 |
| Post-Session 13 baseline | Matched (confirmed by Session 14 consolidation) |
| `node --check app.js` | PASS |

### 1.2 Pre-Flight Source Integrity

All non-app.js production files confirmed matching Session 14 baseline hashes:

| File | Session 14 SHA-256 | Session 16 Pre-Write | Match |
|------|-------------------|---------------------|-------|
| `pack_a_corrected.js` | `8164F1FC...6BC633` | Same | PASS |
| `pack_b_corrected.js` | `09CFEC8B...C61CEC` | Same | PASS |
| `pack_c_corrected.js` | `82D0594E...D94868` | Same | PASS |
| `pack_d_corrected.js` | `DEB235BE...7FF61` | Same | PASS |
| `pack_e_corrected.js` | `43047A66...CEF4` | Same | PASS |
| `index_updated.html` | `81C80945...BBA5B3` | Same | PASS |
| `styles.css` | `F23CD9F5...B4CCF` | Same | PASS |
| `scored_cases.js` | `79C1DF60...305BBC` | Same | PASS |

---

## 2. Changes Applied

### 2.1 New Global Constants

**`DIFFICULTY_PRESETS`** (near line 57):
- `standard`: factors 1.00/1.00, offset 0 — no calibration
- `easier`: factors 0.98/0.98, offset -8 — simulates easier form
- `harder`: factors 1.02/1.02, offset +8 — simulates harder form
- Does NOT change the MCQ gate or section weights

### 2.2 `CmaScoringDisclaimer(mode)` — Global Function

Centralized disclaimer rendered on every scored view:
- **Full mode** (`'full'`): Detailed explanation — CMA structural rules, differences vs. real CMA equating, preparation guidance. Used on exam result views.
- **Compact mode** (`'compact'`): Single-paragraph summary. Used on MCQ gate, practice tests, and dashboard views.

### 2.3 `scoreMCQ(item, ans)` — Global Function

CMA-style binary MCQ grading. Returns 0 or 1:
- **Single-select (default):** `ans === item.CorrectChoice ? 1 : 0`
- **Multi-select:** All correct options must be selected, no extras
- **Matching:** All left-right pairs must match exactly
- Edge cases: null/undefined item or answer → 0
- No partial credit, no negative marking

### 2.4 `practiceScores(difficultyPreset)` — Updated

Replaced the old no-parameter `practiceScores()`:

| Feature | Before | After |
|---------|--------|-------|
| MCQ grading | Inline `=== CorrectChoice` | `scoreMCQ(item, ans)` |
| Difficulty calibration | None | 3 presets (standard/easier/harder) |
| `passed` field | Not returned | `scaled >= 360` boolean |
| `calibrated` field | Not returned | Calibrated raw (post-factor) |
| `difficultyPreset` field | Not returned | Name of preset used |
| Comments | None | CMA structural rule documentation |

### 2.5 Inline MCQ Comparisons Replaced

Six call sites updated from `=== q.CorrectChoice` to `scoreMCQ()`:
1. `saveHistory()` — correct count in history
2. `render()` — MCQ gate check
3. `renderMCQ()` — isCorrect for analytics
4. `practiceScores()` — MCQ aggregate
5. `renderSummary()` — section breakdown
6. `renderSummary()` — topic performance
7. `AdaptiveReviewQueue.generate()` — review queue priority

### 2.6 Bug Fix: `saveHistory()` Line 714

**Before:** `let sc = this.practiceScores();`
- `this` = `SessionPersistence` (no `practiceScores` method)
- Caused silent TypeError, swallowed by try/catch
- History entries never received `scaledScore`, `accuracy`, `bySection`

**After:** `let sc = ExamSessionManager.practiceScores();`
- Explicit reference to the correct object
- All history entries now include scoring data

### 2.7 Disclaimer Integration

| View | Mode | Location |
|------|------|----------|
| Score Report (`renderSummary`) | `'full'` | Bottom of summary card |
| MCQ Gate Failure Screen | `'compact'` | Below gate message |
| Performance Dashboard | `'compact'` | Bottom of dashboard |

---

## 3. Scoring Architecture

### 3.1 CMA Structural Rules Implemented

| Rule | Implementation |
|------|---------------|
| MCQs: binary, equal weight, no partial credit | `scoreMCQ()` returns 0 or 1 only |
| CBQs: partial credit | `correctCase()` per-item 0/1 → fractional case total |
| MCQ 75% / CBQ 25% weighting | Fixed in `practiceScores()`, never varies |
| MCQ gate: 50% to unlock CBQs | Gate logic unchanged at `MCQ_GATE_THRESHOLD = 0.50` |
| 0–500 scale, 360 threshold | `Math.round(calibrated * 500 + scaleOffset)` |
| Difficulty calibration | 3 presets with small factors (±2%) |

### 3.2 Neutral Simulator vs. Real CMA Equating

This simulator uses transparent, linear weighting. The real CMA exam applies:
- Psychometric equating across exam forms
- Item-difficulty-weighted scaling
- Unscored pretest items

The `CmaScoringDisclaimer` explains all differences to candidates.

---

## 4. File Integrity Post-Write

| Property | Pre-Write | Post-Write | Delta |
|----------|-----------|------------|-------|
| SHA-256 | `C6BB093B...D5EA4` | `2D0F871B...BFB2E` | Changed (expected) |
| Byte size | 113,475 | 120,848 | +7,373 |
| Lines changed (diff) | — | 156 | — |
| `node --check` | PASS | PASS | — |

---

## 5. Scope Containment

| Check | Result |
|-------|--------|
| Pack files modified | None — all 5 SHA-256 match baseline |
| `index_updated.html` modified | No |
| `styles.css` modified | No |
| Scored case files modified | No |
| Question content (stems, choices, EC/EW) modified | No |
| TIER labels modified | No |
| Governance reports modified | No |

---

## 6. Completion Statement

**CMA-ALIGNED SCORING PASSED — MCQ BINARY, CBQ PARTIAL CREDIT, MCQ GATE, NEUTRAL 0–500 SIMULATED SCALE WITH 360 THRESHOLD, DIFFICULTY CALIBRATION PRESETS, AND CENTRALIZED CANDIDATE EXPLANATION IMPLEMENTED; RUNTIME AND BROWSER VALIDATION PASSED; NO UNAPPROVED SOURCE CHANGES MADE.**
