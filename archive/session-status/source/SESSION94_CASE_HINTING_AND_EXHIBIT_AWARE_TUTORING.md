# Session 94 — Case Hinting and Exhibit-Aware Tutoring for May

**Date:** 2026-07-25  
**Scope:** Runtime/tutor enhancement — case review, graduated hints, exhibit-aware coaching  
**Status:** Complete

---

## Pre-Flight

**Files reviewed:**
- `reports/session_status/SESSION86_FINAL_QA_MCQS_CASES_AND_MAY.md` — confirmed May had zero case tutoring: no `renderCaseItem`, no `_explainCaseAnswer`, no exhibit rendering, no case review queue
- `reports/session_status/SESSION89D_APPLICATION_AND_DATA_REFINEMENT.md` — confirmed safety mechanisms: 5-layer exam-mode block, manifest gating, hint tracking
- No SESSION93 report existed — this is the first dedicated case-tutoring session
- Inspected `may-core.js` (all functions), `may-learner-state.js`, `app.js` (`renderCase`, `renderCaseExam`), `styles.css`, and representative items in `scored_cases.js` through `scored_cases5.js`

**Key findings:**
- May's hint model was MCQ-only with no case-exhibit awareness
- `_normalizeCaseItem()` converted case items but lost all case metadata (CognitiveLevel, CalculationComplexity, DifficultyDrivers)
- Case data has rich fields: `ScenarioText`, `Exhibits[]` (table/text), `CognitiveLevel`, `CalculationComplexity`, `DifficultyDrivers`, `ReferencedBy` (packs 3-5)
- CSS had case styling but no exhibit-aware tutoring UI
- Learner-state tracked case only via `itemType` and `casePct` — no reasoning patterns

**Backups created:** `may-core.js.bak-s94-20260725095348`, `may-learner-state.js.bak-s94-20260725095348`, `styles.css.bak-s94-20260725095348`

---

## Implemented Enhancements

### WS1 — Case-Specific Graduated Hints

Extended hint progression for case items with 4 new methods in `may-core.js`:

| Level | Method | Behavior |
|-------|--------|----------|
| 0 — Metacognitive | `_caseMetacognitiveHint()` | Prompts learner to identify decision type (calculation/judgment/exhibit-reading). References ScenarioText. |
| 1 — Concept | `_caseConceptHint()` | Section-specific case framework (GAAP/COSO/budgeting) + exhibit orientation. Names relevant exhibits by title. |
| 2 — Strategy | `_caseStrategyHint()` | Calculation vs. judgment branching. References specific exhibit names and gives step-by-step approach. |
| 3 — Elimination | `_caseEliminationHint()` | Evidence-based elimination: "Does this choice contradict the case facts?" vs. absolute-language tricks (MCQ-only). |

`_provideHint()` dispatches to case methods when `currentCaseItemType === 'case'` and `currentCase` is available.

### WS2 — Exhibit-Aware Tutoring Support

Three new methods:
- **`_caseExhibitsSummary(caseObj)`** — extracts minimal {title, type, headers, rowCount, summary} from real Exhibit fields (never invents)
- **`_getRelevantExhibits(caseObj, itemIndex)`** — filters using `ReferencedBy` (packs 3-5) or returns all exhibits
- **`_caseExhibitRefsHtml(caseObj, itemIndex)`** — renders "Relevant exhibit(s): 📊 Exhibit Name (table, N rows)" block in review mode

Exhibit references injected into `_caseConceptHint()` and `_caseStrategyHint()` text.

### WS3 — Case Explanation Refinement

Two new methods called from `_explainAnswer()` for case items:
- **`_caseWhatMattered()`** — extracts the key diagnostic sentence from Explanation text
- **`_caseApproachNote()`** — generates a coaching note from CognitiveLevel + DifficultyDrivers metadata (e.g., "Practice reading tables and schedules — the answer is in the data, not in general knowledge")

### WS4 — Case Reasoning Patterns in Learner-State

- **`classifyCaseMissPattern(item)`** — classifies missed case items into 5 patterns: `evidenceLocation`, `calculationSetup`, `exhibitInterpretation`, `controlJudgment`, `answerElimination`
- **`casePatterns`** — new field on session summaries, computed in `handoffCompletedSession()` from actual case misses

### WS5 — UI Refinements

- **`.may-case-exhibit-refs`** block — appears below context bar for case review items, showing relevant exhibit names with type indicators
- **`.may-exhibit-ref-item`** — individual exhibit chip with icon + type label
- **`.may-case-coaching-note`** — styled coaching note block
- Hint label now includes type (`Metacognitive`, `Concept`, `Strategy`, `Elimination`) for clarity

### Extended Metadata Flow

- `_normalizeCaseItem()` now carries through: `CognitiveLevel`, `CalculationRequired`, `CalculationComplexity`, `DifficultyDrivers`, `ReadingComplexity`, `DecisionComplexity`
- `setQuestionContext()` accepts optional `itemIndex` parameter
- Review navigation (`nextReviewQuestion`, `prevReviewQuestion`, `startSessionReview`) passes `itemIndex`

---

## Safety Preservation

| Mechanism | Verified |
|-----------|:---:|
| Exam-mode May tab block (`isFullTabBlocked`) | Untouched |
| Defect-manifest gating (`_isBlockedByDefectManifest`) | Untouched |
| Delivery blocklist (`_isDeliveryBlocked`) | Untouched |
| Certified-only filtering (`_findSimilarQuestions`) | Untouched |
| Hint tracking (`_sessionHints`, `_liveHintCount`) | Preserved; case hints use same counters |
| No new answer-revealing paths during exam mode | Verified — `handleAction` block list unchanged |

**Zero content file modifications.** No writes to `scored_cases*.js` or `pack_*_corrected.js`. No `CorrectChoice` or `question_state` changes.

---

## Testing

| Suite | Result |
|-------|--------|
| `test_governance_guard.js` | **20/20 pass** |
| `test_may_stagec.js` | **62/62 pass** |
| `test_may_regression_r2.js` | **42/42 pass** |
| `test_may_renderer.js` | **62/62 pass** |
| **Total** | **186/186 pass** |

Parse-check: `may-core.js` (2600 lines, 70 functions), `may-learner-state.js` (578 lines) — both parse clean.

---

## Open Issues / Deferrals

- **Full exhibit rendering** — exhibits are summarized text-only; no HTML table rendering of actual `Headers`/`Rows` in May's chat panel
- **Numeric walkthrough hints** — case calculation hints point to exhibits but don't extract numbers from them
- **Case-specific recommendation tuning** — recovery sets still use generic topic-based matching; no case-difficulty or case-pattern weighting
- **Post-session case analytics** — `casePatterns` is stored but not yet surfaced in progress/weakness views
- **Mobile case review** — context bar + exhibit refs layout should be tested on narrow viewports

---

## Recommended Next Session

- Surface `casePatterns` in May's progress insights and session summary
- Add post-session case-analytics view showing pattern breakdown
- Implement richer "Approach next time" coaching for repeat case misses
