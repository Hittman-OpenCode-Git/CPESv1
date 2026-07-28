# Session 84 — May Governance Preflight & Feature Design

**Session Number:** 84
**Date/Time:** 2026-07-24
**Scope Statement:** Preflight governance review and feature design for May and new Certified content; design-only, no code or content edits.
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, CAQS_v1.0.md
**Type:** Design & governance review (read-only)

---

## 0. Executive Summary

Session 84 is a **design-only, read-only governance preflight** for the May AI tutoring system. No code, content, or metadata was modified. The session reviewed May's full implementation (~2,400 lines across `may-core.js`, `may-learner-state.js`, and integration points in `app.js`, `index_updated.html`, `styles.css`) against the expanded Certified pools (2,031 MCQ field-occurrences + 363 case field-occurrences) and established governance rules for May's future behavior. Key outcomes:

1. **Current-state snapshot** — 2,500 MCQs with 2,031 Certified field-occurrences, 135 scored_cases.js Certified + 228 scored_cases2-5 Certified fields, 7 app.js integration points verified.
2. **Governance risks identified** — 6 categories: misaligned feedback, overhinting/leakage in exam mode, invented trends, bias in recommendations, case unawareness, stale cached bank.
3. **Explicit guardrails defined** — Hint gating (answer-first rule), trend-data thresholds (N≥3 attempts per topic), Certified-first with contested exclusion, exam-mode mini-panel suppression + hint disable, cache freshness policy.
4. **Metadata alignment confirmed** — May correctly gates on `question_state === 'Certified'`, excludes `isQuestionContested()`, uses ExplanationCorrect and ExplanationWrong[A-D] verbatim, normalizes Topic labels.
5. **Future feature governance** — 5-level hint ladder formally codified, each level grounded in bank content. Trend messaging requires minimum data thresholds. Case-aware tutoring defined as a 3-phase roadmap.
6. **Audit hooks specified** — 5 logging points in may-learner-state + 3 proposed new audit fields. Future governance sessions can audit hint behavior, recommendation fairness, and trend veracity.
7. **Roadmap** — 3 future May coding sessions (M1: Case-Aware Tutoring, M2: Realtime Hint Auditability, M3: Advanced Recommendation Engine) with governance preconditions and success criteria.

---

## 1. Current-State Governance Snapshot

### 1.1 MCQ Pool Status

All counts are field-occurrences from direct grep as of 2026-07-24. Field-occurrence counts may exceed unique QID counts due to dual-block (`Block 1` metadata + `Block 2` content) architecture in Packs A, C, D.

| Pack | QIDs | Certified Fields | Sections Closed / Fully Certified | Sections Open |
|------|:----:|:----------------:|-----------------------------------|---------------|
| Pack A | 500 | **481** | A (75), large portions of C/D | B, C partial, D partial, F |
| Pack B | 500 | **500** | B (100), C (100), E (75), F (75) | A (75), D (75) — structurally clean, Unprocessed |
| Pack C | 500 | **250** | A (75), B (100) | C (75), D (75), E (75), F (75) |
| Pack D | 500 | **300** | A (73), B (100), D (75) | C (75), E (75), F (75) |
| Pack E | 500 | **500** | All sections have partial certification | Varies by section |
| **Total** | **2,500** | **2,031** | | |

**Verification method:** `Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"' | Measure-Object`

**Session 81 delta:** +3 from prior 2,028 (P1-DC-070, P1-AD-047, P1-AD-048 fixed and certified).

**Sections with known blockers:**
- Pack C Section C: 50 items in In Audit, blocked by 100 DL-026 empty distractor slots + 14+ DL-010 cross-contaminated EW fields (per S81)
- Pack C Section D: Certified via S76 (74 items), fully remediated
- Pack D Section C: 50 items pending DL-026 remediation

### 1.2 Case Pool Status

| File | Cases | Certified Fields | Certification Wave | Format Note |
|------|:-----:|:----------------:|--------------------|-------------|
| `scored_cases.js` | 15 | **135** | Session 60 (migrated standard cases) | JSON-quoted keys (`"question_state"`) |
| `scored_cases2.js` | 15 | **54** | S75 (8 cases) + S78 (3 cases) + S81 (9 cases) | Unquoted keys (`question_state`) |
| `scored_cases3.js` | 15 | **48** | S75 (5 READY) + S76 (2) + S78 (1) + S81 (9) | Unquoted keys |
| `scored_cases4.js` | 15 | **48** | S75 (4 READY) + S76 (4) + S78 (1) + S81 (9) | Unquoted keys |
| `scored_cases5.js` | 15 | **78** | S75 (5 READY) + S76 (2) + S81 (9) | Unquoted keys |
| **Total** | **75** | **363** | | |

**Case certification key facts:**
- 9 Editorial Queue cases certified in S81 with full metadata polish (CompanyName, CompanyType, Industry, DifficultyScore, LearningObjectives)
- 3 critical answer-key errors fixed in S78 (CBQ2-C3-Q5, CBQ3-C3-Q1, CBQ4-F1-Q2 — DL-030 class)
- All 3 fixes independently verified in S79B — PASS
- scored_cases.js (135 fields): 15 migrated standard cases, now all Certified

### 1.3 May's Verified Capabilities (Session 79 — Alpha v1.0 + Realtime Layer)

#### Implemented and Tested

| Capability | Location | Status |
|-----------|----------|--------|
| Identity / name greeting | may-core.js:38-81 | Verified — name detection with command/QID rejection |
| CMA Exam mode pre-flight briefing | may-core.js:102-152 | Verified — full briefing for first-timers, abbreviated for returning |
| Mini-panel injection in exam view | may-core.js:1665-1707 | Verified — topic insight tag, collapsible, chevron toggle |
| Context bar (QID, topic, section, difficulty, state) | may-core.js:1382-1396 | Verified — renders per-question context header |
| 5-level graduated hints | may-core.js:373-472 | Verified — metacognitive → concept → strategy → elimination → full |
| Grounded explanations | may-core.js:293-330 | Verified — uses bank ExplanationCorrect verbatim, never synthesizes |
| Wrong-choice breakdown | may-core.js:336-367 | Verified — iterates ExplanationWrong[A-D], skips CC slot |
| Post-answer micro-feedback | may-core.js:1719-1751 | Verified — contextual, evidence-based, auto-dismissing (7s) |
| Confidence calibration | may-learner-state.js:430-456 | Verified — overconfident/underconfident rate per topic |
| Recovery set generation | may-core.js:951-1021 | Verified — Certified-first, contested-excluded, weak-topic prioritized |
| Progress insight | may-core.js:577-668 | Verified — improving/declining/stable/hint-dependent/difficulty-sensitive |
| Weakness insight | may-core.js:674-782 | Verified — persistent weak, declining, unstable, hint-dependent, difficulty-sensitive clusters |
| Session summarization | may-core.js:788-873 | Verified — topic breakdown, cross-session comparison, next-step recommendation |
| Contested QID exclusion | may-learner-state.js:458-513 | Verified — flagChallengedQID, getExcludedQids, isQuestionContested |
| Challenge handling | may-core.js:1235-1318 | Verified — known-defective QID awareness (DL-030 list), standard citation guidance |
| Full regression suite pass | SESSION79 | Verified — 9-dimensional test matrix, all PASS (Stage A); Stage B implemented and integrated |

#### Bugs Fixed (Session 79)

| ID | Description | Severity |
|----|-------------|----------|
| BUG-001 | `_trackMisconception()` TypeError crash on Set.add() | CRITICAL |
| BUG-002 | `clearContext()` redundant double `renderView()` | Low |
| BUG-003 | Dead code in `_summarizeSession()` checking non-existent `s._scoreInfo` | Low |
| BUG-004 | `_recommendNext()` called `getWeaknessClusters()` twice | Medium |
| BUG-005 | `_getProgressInsight()` bogus "history still building" threshold | Medium |
| BUG-006 | `_summarizeSession()` final "Next" line always identical boilerplate | Medium |

### 1.4 Integration Points (app.js)

May has **7 integration points** in `app.js` (verified via grep):

| Integration | Line | Trigger | May Function |
|------------|------|---------|-------------|
| Session handoff | post-session path | Session completes | `May.handoffCompletedSession(state.session)` |
| Mini-panel render | exam view render | Question displayed (non-exam-mode) | `May.renderMiniPanel(q)` |
| Live hint reset | question navigation | New question arrives | `May.resetLiveHints()` |
| Answer recording | answer selection | Learner picks an answer | `May.recordLiveAttempt(q, answer, isCorrect, ...)` |
| Post-answer feedback | answer selection | Answer submitted | `May.showPostAnswerFeedback(q, isCorrect)` |
| Review link | result view | "Review with May" link click | `May.renderView()` |
| Tab navigation | tab click | Coach tab selected | `May.renderView()` |

All 7 integration points are guarded by `typeof May !== 'undefined'` — safe fallback if May is not loaded.

### 1.5 Delivery Pool Impact

The `_findSimilarQuestions()` function (may-core.js:1024-1052) is the single point of contact between May and the content bank for recommendations, recovery sets, and similar-question lookups. It:

1. Filters to `question_state === 'Certified'` **only** (line 1035)
2. Excludes `isQuestionContested()` items (line 1036)
3. Matches by normalized topic + optional section filter (lines 1037-1039)
4. Sorts by DifficultyScore proximity to target (lines 1044-1048)

This means May's recommendation pool is **intrinsically gated** to the same `Certified` boundary as the learner practice session delivery pool. No non-Certified, Hold, In Audit, Archived, or Unprocessed items can appear in May's recommendations, recovery sets, or similar-question suggestions.

---

## 2. Governance Risks and Guardrails

### 2.1 Risk Inventory (May-Specific)

| Risk ID | Risk | Likelihood | Impact | Mitigation Status |
|---------|------|-----------|--------|-------------------|
| **R-MAY-001** | Misaligned feedback — hint or explanation contradicts bank's CorrectChoice | Low | **High** | May uses bank ExplanationCorrect/ExplanationWrong verbatim; never synthesizes content from scratch. The `_explainAnswer()`, `_explainWrongChoices()`, and `miniExplain()` functions read directly from the question object. |
| **R-MAY-002** | Overhinting / solution leakage in CMA Exam mode | Medium | **High** | `isMiniPanelSuppressed()` returns `true` when `state.session.mode === 'full'` (line 158). Mini-panel is not rendered. However, the full May panel remains accessible via the "Coach" tab — no explicit hint-disable exists for exam mode in the full panel. **GAP IDENTIFIED.** |
| **R-MAY-003** | Invented trends — progress statements not supported by learner-state data | Medium | **Medium** | Trends are computed from `getTrends()` which requires ≥2 attempts per topic (line 306). Weakness clusters require ≥5 attempts for persistentWeak, ≥4 for unstable/hintDependent. The `_getProgressInsight()` function checks `sessions.length > 0` before emitting any statements. |
| **R-MAY-004** | Bias in recommendations — over-focusing on certain topics or difficulty levels | Medium | **Medium** | Recovery sets are allocated proportionally by inverse priority (line 983). `_recommendNext()` prioritizes persistent weak → declining → unstable → difficulty-sensitive (lines 906-917). No randomness in topic selection. **GAP: May does not diversify by section — it always targets the weakest topic, which could create a tunnel-vision study pattern.** |
| **R-MAY-005** | Case unawareness — May's review queue and recovery sets are MCQ-only | High | **Medium** | `startSessionReview()` (line 1508) only queues missed/flagged MCQs. Case items are recorded in `handoffCompletedSession()` (lines 1604-1616) but are never surfaced in the review queue. Recovery sets (`_generateRecoverySet`) and similar-question lookups (`_findSimilarQuestions`) only search `MCQ_BANK_A` through `MCQ_BANK_E`. **GAP IDENTIFIED — CASE-AWARE TUTORING NOT IMPLEMENTED.** |
| **R-MAY-006** | Stale cached bank — `_cachedBanks` never refreshed during a session | Low | **Medium** | `_cachedBanks` is a one-time snapshot of all 5 MCQ banks loaded at first access (line 1025-1032). If a pack file is hot-reloaded or updated, May will not see new/changed items until the page is refreshed. |
| **R-MAY-007** | Challenge-enabled question leak — challenged QIDs may still appear in session delivery | Low | **Low** | May excludes challenged QIDs from *its* recommendations (line 1036), but does not prevent them from being included in the exam engine's session pool. The delivery pool gating is in `selectWithDifficultyDistribution()` (app.js), not in May. No session-delivery exclusion logic exists for May's challenged-QID list. **GAP — session composition does not cross-reference May's exclusion set.** |

### 2.2 Explicit Guardrails

#### G1 — Hint Escalation Guard

| Rule | Implementation | Status |
|------|---------------|--------|
| Hints escalate only when prior hint is used | `this.context.hintLevel++` is incremented on each `_provideHint()` or `miniHint()` call | **Implemented** (line 407, 1787) |
| Hint level resets per question | `resetLiveHints()` sets hintLevel=0 (line 1844-1851) | **Implemented** |
| Maximum hint levels in exam-mode mini-panel | `miniHint()` is available from mini-panel; **no exam-mode guard exists** | **GAP — see R-MAY-002** |
| Hint usage logged per attempt | `recordAttempt()` stores `hintsUsed` (line 109) | **Implemented** |

**Proposed additional guard (Session M1):** In CMA Exam mode (`state.session.mode === 'full'`):
- Mini-panel hint button disabled or removed
- Full-panel "Hint" and "Explain answer" buttons disabled
- Only "My progress" and "Weak areas" remain active (non-answer-revealing actions)

#### G2 — Trend Data Threshold Guard

| Rule | Implementation | Status |
|------|---------------|--------|
| Topic trend requires ≥2 attempts | `getTrends()` line 306: `if (tp.totalAttempts < 2) return` | **Implemented** |
| Persistent weak requires ≥5 attempts + accuracy <60% | `getWeaknessClusters()` line 372 | **Implemented** |
| Improving/declining requires delta ≥±15% | Lines 375, 378 | **Implemented** |
| Unstable requires ≥4 attempts + stability <50% | Line 381 | **Implemented** |
| Confidence calibration requires ≥4 attempts (overconfident) or ≥3 (underconfident) | Lines 637, 639 | **Implemented** |

**Proposed additional guard (Session M2):**
- Trend statements in chat must cite the data source explicitly (e.g., "based on 8 attempts across 3 sessions")
- Prohibit trend statements for topics with <3 sessions of data (currently only gated on attempt count, not session count)
- Add a "confidence" qualifier to trend statements (e.g., "strong signal" for ≥8 attempts, "emerging pattern" for 3-7 attempts)

#### G3 — Certified-First Recommendation Guard

| Rule | Implementation | Status |
|------|---------------|--------|
| Recommendations only from Certified items | `_findSimilarQuestions()` line 1035: `q.question_state !== 'Certified'` → filtered out | **Implemented** |
| Contested QIDs excluded | Line 1036: `MayLearnerState.isQuestionContested(q.QuestionID)` → filtered out | **Implemented** |
| Recently-seen QIDs deprioritized | `_recommendNext()` line 934, `_generateRecoverySet()` line 995 | **Implemented** |
| Non-Certified items never recommended | Same filter (line 1035) | **Implemented** |
| Known-defective QID awareness | `_handleChallenge()` lines 1251-1258: hardcoded DL-030 list checked | **Implemented** |

**Proposed additional guard (Session M3):**
- Add a "stale avoidance" mechanism — items the learner has seen ≥3 times correctly should be deprioritized even if they match the weak topic
- Add section-diversification to recovery sets (currently targets weakest topic only)
- Add difficulty-appropriate triage: persistent-weak topic + easy items first, then escalate

#### G4 — CMA Exam Mode Protection Guard

| Rule | Implementation | Status |
|------|---------------|--------|
| Mini-panel suppressed in exam mode | `isMiniPanelSuppressed()` (line 157-158): returns `true` when `mode === 'full'` | **Implemented** |
| Full-panel access still available via Coach tab | `renderView()` is callable regardless of exam mode | **GAP** |
| Hint/Explain buttons not disabled in exam mode (full panel) | No exam-mode guard exists in `handleAction()` or button rendering | **GAP** |
| Post-answer feedback still fires in exam mode | `showPostAnswerFeedback()` has no mode check | **GAP** |

**Proposed additional guard (Session M1):**
- When `state.session.mode === 'full'` AND `!state.session.completed`:
  - `_provideHint()` returns: "I can't give hints during an exam simulation. I'll be here after you finish."
  - `_explainAnswer()` returns: same message
  - `_explainWrongChoices()` returns: same message
  - `miniHint()` and `miniExplain()` blocked
  - `showPostAnswerFeedback()` suppressed
- Pre-exam only: `preExamBriefing()`, `_getWeaknessInsight()`, `_getProgressInsight()`
- Post-exam: full functionality restored

#### G5 — Bank Cache Freshness Guard

| Rule | Implementation | Status |
|------|---------------|--------|
| Cache built once on first access | `_cachedBanks` initialized lazily (lines 1025-1032, 1854-1861) | **Implemented** |
| No cache invalidation mechanism | — | **GAP** |

**Proposed additional guard:**
- Add `May.refreshBankCache()` method
- Call it on session start/configure (when new packs are selected)
- Add a timestamp to the cache and auto-refresh if >1 hour old

### 2.3 Relationship to Existing Governance Entries

| May Risk | Related DL-ID | Related T0/T1 | Notes |
|----------|--------------|---------------|-------|
| R-MAY-001 (misaligned feedback) | DL-030 (CorrectChoice errors), DL-008 (non-empty EW[CC]) | T0-002 (174 Pack C DL-008 Certified) | May reads from the same bank content. If the bank has a CorrectChoice error, May will repeat it. The DL-030 known-defective list helps but is not comprehensive. |
| R-MAY-002 (exam-mode leakage) | — | — | New risk category — no prior defect covers this |
| R-MAY-003 (invented trends) | — | — | New risk category |
| R-MAY-004 (recommendation bias) | — | — | New risk category |
| R-MAY-005 (case unawareness) | DL-023 (exhibit headers) | — | Case content is in separate files from MCQ banks. May's bank cache only loads MCQ banks. |
| R-MAY-007 (challenged QID leak) | DL-030 (CorrectChoice errors) | T0-001 (P1E-E-048) | May excludes challenged QIDs from recommendations but not from session delivery |

---

## 3. Alignment of May with Question Metadata Standards

### 3.1 Metadata Usage Audit

May currently reads the following metadata fields from question objects:

| Field | May Usage | Aligned with Standard? |
|-------|-----------|----------------------|
| `question_state` | `_findSimilarQuestions()` gates on `=== 'Certified'` (line 1035) | **YES** — per CAQS §1.7.1, only Certified items are learner-eligible |
| `CorrectChoice` | `_explainAnswer()`, `_provideHint()`, `_explainWrongChoices()`, `_explainYourMistake()` | **YES** — reads but never writes |
| `ExplanationCorrect` | Displayed verbatim in `_explainAnswer()`, `_simplifyExplanation()`, `_explainYourMistake()`, `miniExplain()` | **YES** — uses as authoritative pedagogical ground truth |
| `ExplanationWrong[A-D]` | Displayed for distractor analysis in `_explainWrongChoices()`, `_explainYourMistake()` | **YES** — reads but never writes |
| `Choices[A-D]` | Displayed in context bar and explanations | **YES** |
| `QuestionID` | Displayed, used for challenge tracking, caching | **YES** |
| `Topic` | Normalized via `_normalizeTopic()`; used for topic progress, trends, weakness clustering | **YES** — strips numbering prefixes |
| `Section` | Used for section-aware concept hints and recommendation filtering | **YES** |
| `Difficulty` / `DifficultyScore` | Used for greeting modulation, hint personalization, difficulty-proximity sorting | **PARTIAL** — May uses string labels and numeric scores, but does not validate against the 5-tier vocabulary (per S59 finding) |
| `Stem` / `Prompt` | Displayed (truncated to 200 chars) in context bar | **YES** |
| `CalculationItem` | Used in `_strategyHint()` for calculation vs. conceptual branching | **YES** |
| `MicroTopic` / `Subtopic` | Stored in attempt record | **YES** — recorded but not yet used for analysis |
| `CognitiveLevel` | Stored in attempt record | **YES** — recorded but not yet used for analysis |
| `question_state` (non-Certified) | Tracked in attempt record (line 95) | **YES** — recorded for audit |

### 3.2 State Boundary Compliance

| State | In May Recommendations? | In May Recovery Sets? | In May Similar-Question? | In Learner-State? |
|-------|:---:|:---:|:---:|:---:|
| **Certified** | Yes | Yes | Yes | Yes (recorded on attempt) |
| **In Audit** | No | No | No | Yes (recorded on attempt) |
| **Editorial Queue** | No | No | No | Yes (recorded on attempt) |
| **Unprocessed** | No | No | No | Yes (recorded on attempt) |
| **Archived** | No | No | No | Yes (recorded on attempt) |
| **Hold** | No | No | No | Yes (recorded on attempt) |
| **MISSING** (no field) | No | No | No | Yes (recorded as "Unknown") |

**Assessment:** May correctly respects the Certified/non-Certified boundary for all recommendation, recovery, and similar-question operations. Non-Certified items can still be encountered in session delivery and are correctly tracked in learner-state, which is appropriate — tracking non-Certified attempts is useful for future content auditing.

### 3.3 Explanation Field Usage Compliance

| Rule (CAQS §4.4) | May Compliance |
|------------------|---------------|
| EV8 — ExplanationWrong[CorrectChoice] must be empty | May does NOT write ExplanationWrong fields. It reads them for display and correctly skips the CC slot in `_explainWrongChoices()` (line 346: `if (l === cc) return`). However, if the bank has DL-008 (non-empty EW[CC]), May will never display it because it skips the CC slot. |
| EV2 — No placeholder phrases | May does NOT verify that the bank's explanations are free of placeholder text. If a bank item has "This is the correct choice" as ExplanationCorrect, May displays it verbatim. **GAP — May trusts bank content unconditionally.** |
| EV3 — Explanation must reference accounting principle | May does NOT verify this. Relies on bank quality. |

### 3.4 Updated Governance Rules for May's Metadata Usage

**Rule M-META-1 (Certified Boundary):** May shall only recommend, include in recovery sets, or suggest as similar any item with `question_state: "Certified"`. Non-Certified items shall never appear in May-driven recommendations. **STATUS: IMPLEMENTED.**

**Rule M-META-2 (Contested Exclusion):** May shall exclude any QID with `status: "contested"` in `MayLearnerState.challengedQids` from all recommendations, recovery sets, and similar-question suggestions. **STATUS: IMPLEMENTED.**

**Rule M-META-3 (Explanation Verbatim):** May shall display bank ExplanationCorrect and ExplanationWrong fields verbatim. May shall not synthesize, summarize, or paraphrase explanation content unless explicitly requested by the learner (e.g., "Simplify this"). **STATUS: IMPLEMENTED.**

**Rule M-META-4 (Answer-Key Immutability):** May shall never override, suggest a change to, or question the bank's CorrectChoice in normal operation. The challenge workflow (`_handleChallenge`) is the sole exception — it records the learner's concern without changing the answer key. **STATUS: IMPLEMENTED.**

**Rule M-META-5 (Topic Normalization):** May shall strip numbering prefixes (e.g., "A.001 ") from Topic fields before analysis to prevent fragmentation of topic aggregates. **STATUS: IMPLEMENTED** (`_normalizeTopic`, line 259-263).

**Rule M-META-6 (Difficulty Awareness):** May shall use the bank's Difficulty and DifficultyScore fields for personalization but shall not override or adjust them. **STATUS: IMPLEMENTED.**

**Rule M-META-7 (Known-Defective Awareness):** May shall maintain awareness of known-defective QIDs (from DL-030, T0 entries) and notify learners when a challenged item matches a known defect. **STATUS: PARTIALLY IMPLEMENTED** — hardcoded list of 5 DL-030 items exists in `_handleChallenge()` (line 1252). Should be converted to a data-driven approach.

---

## 4. Design Implications for Future Features

### 4.1 Realtime Hints — Governance-Approved Ladder

The 5-level hint ladder is formally codified as the governance-approved structure for all May hint interactions (both full-panel and mini-panel):

| Level | Name | Governance Rule | Content Source |
|:-----:|------|----------------|---------------|
| 1 | **Metacognitive** | Must reference the item's Topic. Must prompt self-reflection, not provide any answer information. | Bank `Topic` + `Difficulty` |
| 2 | **Concept Reminder** | Must reference the item's Section and the governing accounting domain. May use first sentence of ExplanationCorrect for orientation. | Bank `Section` + ExplanationCorrect (first sentence) |
| 3 | **Strategic** | Must provide a general problem-solving approach (formula steps for calculation items, elimination strategy for conceptual items). Must not reference specific answer values. | Bank `Stem` + `CalculationItem` flag |
| 4 | **Elimination** | May identify one likely-wrong distractor. Must not reveal the correct answer. May use absolute-language detection in distractor text. | Bank `Choices[A-D]` |
| 5 | **Full Explanation** | Must display the complete ExplanationCorrect field verbatim. Must identify the CorrectChoice letter and choice text. | Bank `CorrectChoice` + `Choices[CC]` + `ExplanationCorrect` |

**Governance rules for hint delivery:**
- **M-HINT-1:** Hints must escalate sequentially (level 1 → 2 → 3 → 4 → 5). Skipping levels is prohibited.
- **M-HINT-2:** In CMA Exam mode (`mode === 'full'`, session active), no hints shall be delivered. All hint requests must return a mode-aware refusal message.
- **M-HINT-3:** Hint usage must be logged per attempt in `may-learner-state` with the hint level, question ID, and timestamp.
- **M-HINT-4:** The mini-panel "Why?" button must require the learner to have attempted an answer before revealing it (already implemented — `miniExplain()` line 1804 checks `state.session.answers[q.QuestionID] !== undefined`).
- **M-HINT-5:** Hint content must never contradict the bank's CorrectChoice or ExplanationCorrect. May must not "guess" or synthesize hint content beyond what is derivable from the bank's fields.

### 4.2 Evidence-Based Trend Messaging

**Data thresholds (governance-enforced minimums):**

| Statement Type | Minimum Attempts | Minimum Sessions | Minimum Topics | Status |
|---------------|:----------------:|:----------------:|:--------------:|--------|
| "You're solid on [topic]" | 3 | 1 | 1 | **Implemented** (line 193) |
| "Your accuracy improved from X% to Y%" | 8 across 2 sessions | 2 | 1 | **Implemented** (line 844) |
| "[Topic] is consistently weak" | 5 | 2 | 1 | **Implemented** (line 372) |
| "You're improving on [topic]" | 5 (delta ≥15%) | 2 | 1 | **Implemented** (line 375) |
| "You're overconfident on [topic]" | 4 (calibration delta ≥0.8) | 2 | 1 | **Implemented** (line 637) |
| "Your hint usage is dropping" | 4 (accuracy ≥60%) | 2 | 1 | **Implemented** (line 608) |
| "You're performing under pressure" | 4 (avgDifficulty ≥4, accuracy ≥70) | 2 | 1 | **Implemented** (line 618) |

**Allowable trend statement forms:**
- **Quantitative:** "Your accuracy on [topic] is X% across N attempts" — always backed by `topicPerformance[topic].accuracy`
- **Comparative:** "Improved from X% to Y%" — always backed by `delta` from `getTrends()`
- **Directional:** "[Topic] is declining" — always backed by `direction === 'declining'` from `getTrends()`

**Forbidden trend statement forms:**
- **Predictive:** "You're on track to pass" — prohibited. Readiness bands (app.js `ReadinessModel`) may offer band assignments, but May must not make pass/fail predictions.
- **Comparative-to-others:** "You're above average" — prohibited. May has no population benchmark data.
- **Exam-day simulation:** "If you took the exam today..." — prohibited. Readiness bands are descriptive, not predictive.
- **Vague encouragement:** "You're doing great!" — prohibited unless backed by a specific metric.
- **Unattributed praise:** "Nice work!" with no reference to which topic or what metric improved.

### 4.3 Case-Aware Tutoring — Governance Design

**Current gap:** May is MCQ-only. The review queue (`startSessionReview`, line 1508), recovery set generator (`_generateRecoverySet`), similar-question finder (`_findSimilarQuestions`), and bank cache (`_cachedBanks`) only operate on `MCQ_BANK_A` through `MCQ_BANK_E`. Case items are tracked in learner-state (via `handoffCompletedSession`) but are never surfaced.

**Three-phase implementation roadmap:**

#### Phase 1 — Case Review Queue (Session M1)

**Scope:** Extend May's review queue to include case items.

**Design requirements:**
1. Add a `_cachedCaseBanks` array populated from `ENHANCED_CASE_BASE` through `ENHANCED_CASE_BASE5`
2. Extend `startSessionReview()` to include missed/flagged case items alongside MCQs
3. Add case-aware context: when a case item is loaded, `setQuestionContext()` displays the parent case's `CaseID`, `Title`, and `ScenarioText` in the context bar
4. Case items use `ItemID` (CBQ format) not `QuestionID` (P1 format) — adapt QID handling

**Governance rules for case review:**
- **M-CASE-1:** May shall respect the case structure (scenario + exhibits). When displaying a case item, May shall display the parent case's `ScenarioText` and list the relevant `ExhibitID`s.
- **M-CASE-2:** May shall not reveal answers to sibling case items. When explaining item Q3 of a 5-item case, May shall not reference the answers to Q1, Q2, Q4, or Q5.
- **M-CASE-3:** Case items' `Correct` field may contain non-letter values (e.g., `"$50,000 F"` for `numeric` type, `["A","C"]` for `multi` type). May's `_explainAnswer()` must handle these types correctly.

#### Phase 2 — Case Recommendations (Session M1 or M2)

**Scope:** Extend `_recommendNext()` and `_generateRecoverySet()` to suggest Certified cases.

**Design requirements:**
1. `_findSimilarQuestions()` gains a `type` parameter (`'mcq'` | `'case'`)
2. Case matching uses `BlueprintDomain` + `SectionTags` instead of Topic
3. Recovery sets include a "consider a case study" suggestion when the weak topic spans multiple sub-topics

**Governance rules for case recommendations:**
- **M-CASE-4:** May shall only recommend Certified cases (`question_state: "Certified"` at both case-level and item-level).
- **M-CASE-5:** When recommending a case, May shall disclose the number of items, estimated time, and sections covered. Example: "CBQ2-C3 (Investment Center Performance Evaluation) — 5 items, ~25 min, Sections: C."
- **M-CASE-6:** May shall not recommend a case the learner has completed ≥2 times (stale avoidance).

#### Phase 3 — Case Hints (Deferred)

Case hints require careful design because case answers often depend on exhibit data. The hint ladder for cases must:
1. Reference specific exhibit data (e.g., "Look at Exhibit 2 — what is the contribution margin per unit?")
2. Not reveal the answer to a calculation that appears in a subsequent item
3. Provide strategic guidance without exhibit-specific spoilers

**Deferred** — requires separate governance review.

---

## 5. Governance Hooks and Auditability

### 5.1 Existing Logging Points

May already records the following data in `may-learner-state` (localStorage):

| Data Point | Location | Purpose |
|-----------|----------|---------|
| `sessions[].attempts[]` | `recordAttempt()` (line 84) | Per-question attempt: QID, section, topic, correctness, hintsUsed, explanationRequested, elapsedMs, confidence, timestamp |
| `topicPerformance[topic]` | `_updateTopicAggregate()` (line 174) | Per-topic aggregate: totalAttempts, correctCount, hintCount, difficultyDistribution, recentAttempts |
| `misconceptionPatterns[]` | `_trackMisconception()` (line 206) | Pattern detection: classification errors, variance sign confusion, etc. |
| `sessionSummaries[]` | `recordSessionSummary()` (line 151) | Per-session: mode, scaledScore, mcqPct, casePct, grade, passed, topicSnapshot |
| `challengedQids[]` | `flagChallengedQID()` (line 459) | Learner-disputed QIDs: status, count, lastText |

### 5.2 Proposed New Audit Fields (Session M2)

To support governance auditing of May's behavior, the following fields should be added to the learner-state schema:

| Field | Location | Purpose | Audit Question Answered |
|-------|----------|---------|------------------------|
| `recommendationLog[]` | New top-level array | Log every recommendation, recovery set, and similar-question suggestion with timestamp, QID list, and rationale | "What did May recommend and why?" |
| `trendStatementLog[]` | New top-level array | Log every trend/progress/weakness statement with the data source, threshold met, and number of attempts backing it | "Was this trend statement justified by the data?" |
| `hintRequestLog[]` | New top-level array | Log every hint request with QID, level, mode (practice/exam), and timestamp | "Were hints escalated correctly? Were any hints given during exam mode?" |

### 5.3 Audit Trail Architecture

```
                    ┌─────────────────────────────┐
                    │   May-Learner-State          │
                    │   (localStorage)              │
                    │                               │
                    │  sessions[]                   │
                    │  ├── attempts[]               │  ← Per-question: correctness, hints, confidence
                    │  ├── mode, scaledScore        │
                    │  topicPerformance{}            │  ← Per-topic aggregates
                    │  misconceptionPatterns[]       │  ← Pattern detection
                    │  sessionSummaries[]            │  ← Per-session snapshots
                    │  challengedQids[]              │  ← Learner disputes
                    │                               │
                    │  PROPOSED (M2):               │
                    │  recommendationLog[]           │  ← May recommendations
                    │  trendStatementLog[]           │  ← Trend claims + evidence
                    │  hintRequestLog[]              │  ← Hint behavior
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Governance Audit Agent      │
                    │   (future session)            │
                    │                               │
                    │  Checks:                      │
                    │  ├── Hint escalation compliance│
                    │  ├── Exam-mode hint leakage    │
                    │  ├── Trend statement veracity  │
                    │  ├── Recommendation fairness   │
                    │  └── Contested QID handling    │
                    └──────────────────────────────┘
```

### 5.4 Governance Audit Queries (Future Sessions)

| Audit Question | Data Source | Query |
|---------------|-------------|-------|
| Did May give hints during exam mode? | `hintRequestLog[]` + `sessionSummaries[].mode` | Filter hint logs where mode = 'full' and session not completed |
| Are trend statements backed by sufficient data? | `trendStatementLog[]` + `topicPerformance{}` | Cross-reference statement claims against actual attempt counts |
| Are recommendations diverse across sections? | `recommendationLog[]` | Compute section distribution of recommended QIDs |
| Did May ever recommend a non-Certified item? | `recommendationLog[]` + current `question_state` in pack files | Cross-reference recommended QIDs against current Certified pool |
| Does May exclude contested QIDs consistently? | `recommendationLog[]` + `challengedQids[]` | Verify no contested QID appears in recommendation logs |

---

## 6. Roadmap for Future May Implementation Sessions

### 6.1 Session M1 — Case-Aware Tutoring + Exam-Mode Guard

**Scope:** Extend May to case studies; implement exam-mode hint/explain disabling.

**Target files:** `may-core.js`, `may-learner-state.js` (no content/pack file changes)

**Preconditions from Session 84:**
- Governance rules M-CASE-1 through M-CASE-6 approved
- Exam-mode guard G4 specification approved

**Implementation tasks:**
1. Add `_cachedCaseBanks` to cache `ENHANCED_CASE_BASE` through `ENHANCED_CASE_BASE5`
2. Extend `startSessionReview()` to include case items with QID mapping (`CaseID-Q{N}`)
3. Add case-aware context bar (parent case Title, ScenarioText)
4. Adapt `_explainAnswer()` for non-letter Correct values (numeric, multi, match types)
5. Implement exam-mode hint/explain suppression in `handleAction()`, `miniHint()`, `miniExplain()`
6. Add 12+ new tests to behavioral suite (6 case item types + 6 mode-specific)

**Success criteria:**
- Case items appear in review queue when missed in a session
- Case item explanations correctly render for all 5 types (numeric, select, multi, fill, match)
- "Give me a hint" in exam mode returns a refusal message (not a hint)
- "Explain answer" in exam mode returns a refusal message (not an answer)
- Post-answer micro-feedback suppressed in exam mode
- 0 content/pack-file modifications
- Governance guard 20/20 PASS

### 6.2 Session M2 — Realtime Hint Auditability + Trend Messaging Reform

**Scope:** Implement audit logging for hints, recommendations, and trend statements; reform trend messaging to include data citations.

**Target files:** `may-core.js`, `may-learner-state.js`

**Preconditions from Session 84:**
- Audit fields specification (§5.2) approved
- Trend messaging data thresholds (§4.2) approved

**Implementation tasks:**
1. Add `hintRequestLog[]`, `recommendationLog[]`, `trendStatementLog[]` to learner-state schema
2. Instrument `_provideHint()`, `miniHint()` to log every hint request
3. Instrument `_recommendSimilar()`, `_recommendNext()`, `_generateRecoverySet()` to log every recommendation
4. Instrument `_getProgressInsight()`, `_getWeaknessInsight()`, `_summarizeSession()` to log every trend statement with data source
5. Add data-citation text to all trend statements (e.g., "(based on 12 attempts across 3 sessions)")
6. Add minimum-session count threshold for trend statements (≥2 sessions)
7. Update behavioral test suite: add trend-threshold boundary tests, audit log entry count tests

**Success criteria:**
- Every hint request produces a log entry with QID, level, mode, timestamp
- Every recommendation produces a log entry with QID list, rationale, timestamp
- Every trend statement includes explicit data citation in chat output
- Trend statements with <3 sessions of data are suppressed
- 0 content/pack-file modifications

### 6.3 Session M3 — Advanced Recommendation Engine

**Scope:** Diversify recommendations; add staleness avoidance; integrate readiness-band awareness.

**Target files:** `may-core.js`, `may-learner-state.js`

**Preconditions from Session 84:**
- Recommendation diversification guard (§G3) approved
- Readiness band awareness specification

**Implementation tasks:**
1. Add section-diversification to recovery sets (allocate across sections, not just topics)
2. Add "stale avoidance": deprioritize items the learner has seen ≥3 times correctly
3. Add difficulty-appropriate triage: persistent-weak → start at Easy/Moderate-Easy; improving → escalate to Difficult
4. Integrate `ReadinessModel.compute()` results into recommendation logic (if Below Target, prioritize foundational topics; if At Target, suggest stretch topics)
5. Add "consider a case study" suggestion when weak topic spans multiple sub-topics
6. Add 12+ new tests: diversity, staleness, difficulty triage, readiness integration

**Success criteria:**
- Recovery sets include items from ≥2 different sections when weak topics span multiple sections
- Items seen ≥3 times correctly are excluded from recommendations
- Difficulty triage: persistent-weak items start at Easy/Moderate-Easy
- Readiness bands influence recommendation logic (Below Target → foundational; Above Target → stretch)
- 0 content/pack-file modifications
- Governance guard 20/20 PASS

---

## 7. Immediate Actions (Pre-M1)

The following actions are recommended before Session M1 coding begins. None require code changes — they are governance documentation and process items.

| # | Action | Priority | Owner |
|---|--------|----------|-------|
| 1 | Add May-specific entries to `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md` §9 (new "May AI Tutor Governance" section) | High | Governance session |
| 2 | Move the 5-item DL-030 hardcoded list from `_handleChallenge()` (line 1252) to a data-driven `knownDefectiveQids` array in `may-learner-state.js` or a separate config | Medium | Session M1 |
| 3 | Add a `mayConfig.knownDefectiveQids` list that can be populated from DEFECT_LIBRARY.md entries | Medium | Session M1 |
| 4 | Document May's integration points in `docs/MAY_ARCHITECTURE.md` (architecture overview, data flow, governance hooks) | Medium | Documentation session |
| 5 | Run the `pre-delivery-safety-check` skill with May integration awareness | High | Before next learner-facing release |
| 6 | Verify that the app.js delivery pool's `selectWithDifficultyDistribution()` excludes `isQuestionContested()` items from the May exclusion set (R-MAY-007) | Medium | Audit session |

---

## 8. Deferred REVISION_HISTORY.md Block

The following entry block summarizes Session 84's governance decisions and May-related updates. It should be appended to `knowledge/REVISION_HISTORY.md` by a governance-focused session (not by Session 84, which is design-only).

```markdown
## Session 84 — May Governance Preflight & Feature Design (2026-07-24)

**Date:** 2026-07-24
**Type:** Governance preflight review and feature design — design-only, no code or content edits
**Scope:** may-core.js, may-learner-state.js, app.js, index_updated.html, styles.css (read-only); 5 MCQ packs + 5 scored case files (read-only)
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, CAQS_v1.0.md

### Current State Verified

- **MCQ pool:** 2,500 QIDs, 2,031 Certified field-occurrences across all 5 packs (Pack A: 481, Pack B: 500, Pack C: 250, Pack D: 300, Pack E: 500)
- **Case pool:** 75 enhanced cases, 363 Certified field-occurrences (scored_cases.js: 135, scored_cases2.js: 54, scored_cases3.js: 48, scored_cases4.js: 48, scored_cases5.js: 78)
- **May integration:** 7 app.js integration points all guarded by `typeof May !== 'undefined'`
- **May capabilities:** Fully verified — identity/greeting, pre-exam briefing, 5-level hints, grounded explanations, confidence calibration, recovery sets with Certified-first + contested exclusion, 6 bugs fixed

### Governance Risks Identified

6 risks documented (R-MAY-001 through R-MAY-007):
- R-MAY-002 (HIGH): May full-panel hint/explain accessible during CMA Exam mode — no mode guard exists
- R-MAY-005 (HIGH): May review queue and recovery sets are MCQ-only — no case awareness
- R-MAY-004 (MEDIUM): Recommendations always target weakest topic — no section diversification
- R-MAY-007 (LOW): Challenged QIDs excluded from May recommendations but not from session delivery pool

### Guardrails Established

5 guardrail categories codified:
- G1: Hint escalation (sequential, logged per attempt, answer-first rule for mini-panel)
- G2: Trend data thresholds (N≥3 attempts per topic minimum; ≥2 sessions for comparative claims)
- G3: Certified-first recommendations with contested exclusion
- G4: CMA Exam mode protections (mini-panel suppressed; full-panel hint/explain to be disabled in M1)
- G5: Bank cache freshness policy

### Metadata Alignment

- May gates on `question_state === 'Certified'` for all recommendations — compliant with CAQS §1.7.1
- 7 governance rules defined (M-META-1 through M-META-7) for May's metadata usage
- May uses ExplanationCorrect and ExplanationWrong[A-D] verbatim — never synthesizes content
- Topic normalization strips numbering prefixes to prevent aggregate fragmentation
- Known-defective QID awareness (DL-030 list) implemented in challenge handler

### Feature Design

- 5-level hint ladder formally codified as governance-approved structure
- Trend messaging: allowable forms (quantitative, comparative, directional) and forbidden forms (predictive, comparative-to-others, vague encouragement) defined
- Case-aware tutoring: 3-phase roadmap (M1: review queue + exam-mode guards, M2: audit logging, M3: advanced recommendations)
- 5 logging points identified; 3 new audit fields proposed (recommendationLog, trendStatementLog, hintRequestLog)

### Future Sessions Planned

- **Session M1:** Case-Aware Tutoring + Exam-Mode Guard (may-core.js, may-learner-state.js)
- **Session M2:** Realtime Hint Auditability + Trend Messaging Reform (may-core.js, may-learner-state.js)
- **Session M3:** Advanced Recommendation Engine (may-core.js, may-learner-state.js)

### Writes

- `reports/session_status/SESSION84_MAY_GOVERNANCE_PREFLIGHT_AND_FEATURE_DESIGN.md` — This report (created).
- No code or content files modified.

**SESSION 84 COMPLETE.** Design-only governance preflight. PASS — all risks identified, all guardrails codified, roadmap defined.
```

---

## Appendix A — File Inventory Verified

| File | Lines | Size | Last Session Modified |
|------|:-----:|------|----------------------|
| `may-core.js` | 1,877 | ~67 KB | Session 79 |
| `may-learner-state.js` | 520 | ~19 KB | Session 79 |
| `app.js` | ~8,600 | 164,837 B | Sessions 79/60 |
| `index_updated.html` | — | — | Session 79 |
| `styles.css` | — | — | Session 79 |
| `pack_a_corrected.js` | — | — | Sessions 65-83 (certification waves) |
| `pack_b_corrected.js` | — | — | Sessions 65-83 |
| `pack_c_corrected.js` | — | 1,682,516 B | Session 81 |
| `pack_d_corrected.js` | — | 1,677,178 B | Session 81 |
| `pack_e_corrected.js` | — | — | Sessions 65-83 |
| `scored_cases.js` | — | — | Session 60 |
| `scored_cases2.js` | — | 352,967 B | Session 81 |
| `scored_cases3.js` | — | 395,869 B | Session 81 |
| `scored_cases4.js` | — | 398,416 B | Session 81 |
| `scored_cases5.js` | — | 323,066 B | Session 81 |

## Appendix B — Reference Documents Consulted

| Document | Section(s) Consulted |
|----------|---------------------|
| `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md` | Full — §0-8 |
| `SESSION81_POLISHING_AND_CERTIFICATION_WAVE.md` | Full — state delta, Track A/B/C |
| `SESSION78_ENHANCED_CASE_DEFECT_REMEDIATION_AND_CERTIFICATION.md` | §1-3 — S75-001/002/003 fixes |
| `SESSION75_ENHANCED_CASE_CERTIFICATION_WAVE.md` | §1-4 — rubric evaluation, critical findings |
| `SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md` | §1-2 — case-study move status, structural audit |
| `REVISION_HISTORY.md` | Lines 8344-8508 — S79 May alpha, S79B stability, S81 metadata polish |
| `CAQS_v1.0.md` | §1.7 (Certification Standard), §4.4 (Explanation Validation Rules) |
| `QUESTION_METADATA_STANDARD.md` | Part 9 (Governance State Fields) |
| `DEFECT_LIBRARY.md` | DL-008, DL-021, DL-025, DL-026, DL-030 — current open defects affecting May's recommendation pool |

---

*Session 84 complete. Design-only governance preflight. Zero code or content modifications.*
