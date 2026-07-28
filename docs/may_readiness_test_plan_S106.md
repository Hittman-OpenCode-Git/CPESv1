# May Readiness Test Plan — Session 106 (Spec Only — No Test Implementation)

**Version:** S106-1.0
**Status:** Design spec for future test implementation (S107+)
**Authority:** Session 106 mandate; AGENTS.md governance
**Scope:** Readiness, tutoring behavior, provenance safety testing — no implementation in S106

---

## 1. Purpose

This test plan defines the testing strategy for May's readiness calculations, tutoring behaviors, and provenance safety. It covers what tests should exist, how they should be structured, and where they should live. **No tests are implemented in S106.** This is the blueprint for S107+ test implementation.

**Current Test Suite (S105 baseline):** 216 tests across 5 suites
- Governance guard: 20 tests
- Stage C content validation: 62 tests
- Regression R2: 42 tests
- Renderer: 62 tests
- Readiness: 30 tests (in `scripts/test_readiness.js`)

---

## 2. Test Categories

### A. Readiness Calculation Correctness
Verify that `getReadinessSummary()` and `getSectionReadinessSummary()` produce correct band assignments, section roll-ups, and provenance data across varied synthetic learner profiles.

### B. Threshold Calibration Behavior (S107+)
Verify that the calibration harness correctly reads thresholds, that threshold changes produce expected band shifts, and that modelVersion bumps are enforced.

### C. Tutoring Behavior Guardrails
Verify that May's tutoring behaviors respect exam-mode blocks, hint graduation rules, mini-panel gates, defect-manifest exclusions, and contested-QID exclusions.

### D. Provenance Safety
Verify that provenance surfaces are opt-in, labeled "(debug)", carry "no exam prediction" disclaimers, and never produce "exam ready" language.

### E. Hallucination Detection
Verify that May's output never fabricates topics, exhibits, explanations, or performance claims not present in source data.

### F. Answer Leakage Detection
Verify that May never reveals correct answers in inappropriate contexts (exam mode, before attempt, low hint levels).

### G. Threshold Drift Detection
Verify that thresholds don't change without documentation and that modelVersion is always current.

---

## 3. Test Inventory

### Category A: Readiness Calculation Correctness

| ID | Description | Target Function | Input Setup | Expected | Priority | File |
|----|------------|----------------|-------------|----------|----------|------|
| A-01 | No sessions → Not enough data, dataNote present | `getReadinessSummary()` | `resetState()` | `overall.band === "Not enough data"`, `!hasEnoughData` | P0 | test_readiness.js ✓ |
| A-02 | _provenance contains thresholdsApplied with all 12 values | `getReadinessSummary()` | `resetState()` | All 12 threshold keys present with correct defaults | P0 | test_readiness.js ✓ |
| A-03 | _provenance contains decisiveFactors array | `getReadinessSummary()` | `resetState()` | Array, non-empty | P1 | test_readiness.js ✓ |
| A-04 | Strong topic (85%, stable, 8 attempts) → Ready | `getReadinessSummary()` | `seedTopic("id","Strong A", "A",8,7,6,6)` | `band === "Ready for focused review"` | P0 | test_readiness.js ✓ |
| A-05 | Good topic (80%, 5 attempts) → NOT Ready (minAttemptsReady=6) | `getReadinessSummary()` | `seedTopic("id","Good", "A",5,4,4,4)` | `band !== "Ready for focused review"` | P0 | test_readiness.js ✓ |
| A-06 | Weak topic (<60%, declining) → Recovery needed | `getReadinessSummary()` | `seedTopic("id","Weak", "B",6,2,1,5)` | `band === "Recovery needed"`, `signals includes "low_accuracy"` | P0 | test_readiness.js ✓ |
| A-07 | Topic with <3 attempts → Not enough data | `getReadinessSummary()` | `seedTopic("id","Sparse", "D",2,2,2,2)` | `band === "Not enough data"`, `signals includes "low_attempt_count"` | P0 | test_readiness.js ✓ |
| A-08 | Topic with 3 attempts (75%) → NOT Approaching (S104 gate) | `getReadinessSummary()` | `seedTopic("id","Three", "A",3,2,2,3)` | `band !== "Approaching review-ready"` | P0 | test_readiness.js ✓ |
| A-09 | Topic with 4 attempts (75%) → CAN reach Approaching (S104 gate) | `getReadinessSummary()` | `seedTopic("id","Four", "B",4,3,3,4)` | `band !== "Recovery needed"`, `band !== "Not enough data"` | P0 | test_readiness.js ✓ |
| A-10 | Two strong + one weak → overall Developing (mixed signals) | `getReadinessSummary()` | Seed 2 strong + 1 weak | `overall.band === "Developing"` (mixed path) | P1 | test_readiness.js ✓ |
| A-11 | Three strong topics → overall Approaching review-ready | `getReadinessSummary()` | Seed 3 strong, `ensureMinSessions(3)` | `overall.band === "Approaching review-ready"` | P1 | test_readiness.js ✓ |
| A-12 | No case data → caseReadiness Not enough data | `getReadinessSummary()` | Seed topic only, no case sessions | `caseReadiness.band === "Not enough data"` | P0 | test_readiness.js ✓ |
| A-13 | Overall confidence always present and valid | `getReadinessSummary()` | Any seeded data | `["high","moderate","low"].includes(overall.confidence)` | P1 | test_readiness.js ✓ |
| A-14 | Section aggregation returns all 6 sections A-F | `getSectionReadinessSummary()` | Seed topics in A,B,C,D | All 6 keys present | P1 | test_readiness.js ✓ |
| A-15 | Empty section → Not enough data | `getSectionReadinessSummary()` | Seed only section A | `sections.E.band === "Not enough data"` | P1 | test_readiness.js ✓ |
| A-16 | Section results carry modelVersion S104-1.0 | `getSectionReadinessSummary()` | Seed topic | `modelVersion === "S104-1.0"`, `computedAt` present | P1 | test_readiness.js ✓ |
| A-17 | StrongA + WeakB → different section bands | `getSectionReadinessSummary()` | Seed strong A + weak B | `sections.A.band !== sections.B.band` | P1 | test_readiness.js ✓ |
| A-18 | Sparse section (>50% no data) → Not enough data | `getSectionReadinessSummary()` | Seed single topic per section | Section bands reflect sparseness | P2 | test_readiness.js |
| A-19 | Case-burden degradation flag present in _provenance | `getReadinessSummary()` | Seed topics + case pattern data | `typeof thresholdsApplied.caseBurdenDegrade === "boolean"` | P1 | test_readiness.js ✓ |
| A-20 | Multi-session worsening case patterns degrade overall | `getReadinessSummary()` | `seedCaseSessions()` with worsening pattern + strong topics | `caseBurdenDegrade === true` if conditions met | P1 | test_readiness.js ✓ |
| A-21 | Single case session does NOT trigger degradation | `getReadinessSummary()` | 1 case session + 3 strong topics | `overall.band` not degraded | P1 | test_readiness.js ✓ |
| A-22 | Trend detection with <3 case sessions — known edge | `getReadinessSummary()` | 2 case sessions | `caseReadiness.band !== "Not enough data"` but trend may be unreliable | P2 | test_readiness.js ✓ |
| A-23 | Recovery count >=3 → overall Recovery needed | `getReadinessSummary()` | Seed 3 recovery topics | `overall.band === "Recovery needed"` | P1 | NEW |
| A-24 | All topics approaching → overall Approaching | `getReadinessSummary()` | Seed 3 approaching topics | `overall.band === "Approaching review-ready"` | P2 | NEW |
| A-25 | getTrends returns correctly sorted array | `getTrends()` | Seed varied topics | Array sorted by accuracy ascending; delta/direction computed | P1 | NEW |

### Category B: Threshold Calibration Behavior (S107+)

| ID | Description | Target | Input Setup | Expected | Priority | File |
|----|------------|--------|-------------|----------|----------|------|
| B-01 | Calibration harness reads thresholds from _provenance | harness | Load export JSON | All 12 thresholds extracted correctly | P0 | scripts/test_calibration.js (NEW) |
| B-02 | Changing accuracyHigh by +5 reduces Ready count | harness | Adjust threshold, re-run | Ready count decreases | P0 | scripts/test_calibration.js (NEW) |
| B-03 | Changing minAttemptsReady from 6→7 reduces Ready count | harness | Adjust threshold, re-run | Topics at exactly 6 attempts drop from Ready | P0 | scripts/test_calibration.js (NEW) |
| B-04 | modelVersion bump enforced on threshold change | harness | Change threshold without bumping version | Test fails — modelVersion mismatch | P0 | scripts/test_calibration.js (NEW) |
| B-05 | Changing one threshold does NOT affect unrelated bands | harness | Adjust accuracyLow only | Ready/Approaching bands unchanged | P1 | scripts/test_calibration.js (NEW) |
| B-06 | _provenance.thresholdsApplied reflects actual in-code values | `getReadinessSummary()` | Compare `_provenance.thresholdsApplied` vs. hardcoded condition values | Must match | P1 | test_readiness.js |
| B-07 | Calibration harness enforces N>=10 minimum sample | harness | Provide <10 exports | Harness reports "insufficient data" | P1 | scripts/test_calibration.js (NEW) |
| B-08 | Calibration harness produces before/after band distribution report | harness | Run on calibration dataset | Output includes band distribution table and misalignment flags | P2 | scripts/test_calibration.js (NEW) |

### Category C: Tutoring Behavior Guardrails

| ID | Description | Target Function | Input Setup | Expected | Priority | File |
|----|------------|---------------|-------------|----------|----------|------|
| C-01 | All answer-revealing actions blocked in exam mode | `handleAction()` | Set `state.session.mode = 'full'`, questions loaded | explain, wrong-choices, hint, simplify, mymistake, similar, next, recovery all return blocked message | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-02 | Progress/weakness/summary allowed in exam mode | `handleAction()` | Set `state.session.mode = 'full'` | progress, weakness, summary allowed | P1 | scripts/test_tutoring_safety.js (NEW) |
| C-03 | Hint level 0 never contains correct answer letter | `_provideHint()` | `hintLevel=0`, known correct "B" | Output does not contain "B" as answer reference | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-04 | Hint level 1 never contains correct answer letter | `_provideHint()` | `hintLevel=1` | Output does not contain correct letter | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-05 | Hint level 2 never contains correct answer letter | `_provideHint()` | `hintLevel=2` | Output does not contain correct letter | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-06 | Hint level 3 only identifies wrong choices, never correct | `_provideHint()` | `hintLevel=3`, correctChoice="B" | Output references elimination of a non-B choice only | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-07 | Hint level 4 delegates to full explanation (answer revealed) | `_provideHint()` | `hintLevel=4` | Answer revealed; hintLevel resets to 0 | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-08 | Mini-panel explain blocked when learner hasn't attempted | `miniExplain()` | No answer in `state.session.answers[qid]`, not completed | Returns gate message; answer NOT revealed | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-09 | Mini-panel explain allowed in review mode (session completed) | `miniExplain()` | `state.session.completed = true` | Answer revealed | P1 | scripts/test_tutoring_safety.js (NEW) |
| C-10 | Defect-manifest blocked QIDs excluded from similar-question | `_recommendSimilar()` | QID in defect manifest | Not returned as recommendation | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-11 | Contested QIDs excluded from similar-question | `_recommendSimilar()` | QID flagged as contested | Not returned as recommendation | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-12 | Recovery set excludes recently-correct QIDs | `_generateRecoverySet()` | QID in `getRecentlySeenByOutcome().correct` | Not in recovery set | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-13 | Recovery set ALLOWS recently-missed QIDs | `_generateRecoverySet()` | QID in `getRecentlySeenByOutcome().missed` | CAN appear in recovery set | P0 | scripts/test_tutoring_safety.js (NEW) |
| C-14 | Study-next recommendation respects defect manifest | `_recommendNext()` | All candidates for weak topic are defective | Returns informative message about no candidates | P1 | scripts/test_tutoring_safety.js (NEW) |
| C-15 | Hint graduation tracks per-QID hint count | `_provideHint()` | Call hint 3 times on same QID | `_sessionHints[qid] === 3` | P1 | scripts/test_tutoring_safety.js (NEW) |

### Category D: Provenance Safety

| ID | Description | Target | Input Setup | Expected | Priority | File |
|----|------------|--------|-------------|----------|----------|------|
| D-01 | Provenance toggle contains "(debug)" label | `_renderReadinessProvenance()` | Render with provenance data | HTML contains "(debug)" | P0 | test_readiness.js |
| D-02 | Provenance body contains "no exam prediction" disclaimer | `_renderReadinessProvenance()` | Render | HTML contains "no exam prediction" | P0 | test_readiness.js |
| D-03 | No "exam ready" language anywhere in readiness output | `getReadinessSummary()` | Seed strong topics | Band texts never include "exam ready" or "exam-ready" | P0 | test_readiness.js |
| D-04 | modelVersion in _provenance matches getSectionReadinessSummary | Both functions | Any seeded data | `getReadinessSummary()._provenance.modelVersion === getSectionReadinessSummary().modelVersion` | P0 | test_readiness.js |
| D-05 | thresholdsApplied matches actual values used in band logic | `getReadinessSummary()` | Compare _provenance values vs hardcoded conditions in source | All 12 values match | P1 | test_readiness.js |
| D-06 | Section readiness labels never exceed "Approaching review-ready" | `getSectionReadinessSummary()` | Seed all strong topics | Section bands never "Ready for focused review" | P2 | NEW |

### Category E: Hallucination Detection

| ID | Description | Target | Input Setup | Expected | Priority | File |
|----|------------|--------|-------------|----------|----------|------|
| E-01 | Explain never references topic not in question metadata | `_explainAnswer()` | Question with Topic "Cost Variances" | Output does not mention unrelated topics like "Revenue Recognition" | P0 | scripts/test_tutoring_safety.js (NEW) |
| E-02 | Case coaching never references non-existent exhibits | `_caseConceptHint()` | Case with 2 exhibits | Hint only references available exhibit titles | P0 | scripts/test_tutoring_safety.js (NEW) |
| E-03 | Misconception pattern names from known taxonomy only | `_explainYourMistake()` | Trigger pattern detection | Pattern name is one of 9 known values | P1 | scripts/test_tutoring_safety.js (NEW) |
| E-04 | Progress insight never claims improvement without computed delta | `_getProgressInsight()` | Seed topic with null/undefined delta | "Improving" language not used for that topic | P0 | scripts/test_tutoring_safety.js (NEW) |
| E-05 | Progress insight never references topic with 0 attempts | `_getProgressInsight()` | `resetState()`, no data | Topic with no attempts never mentioned | P1 | scripts/test_tutoring_safety.js (NEW) |
| E-06 | Weakness insight never claims "persistent" with <5 attempts | `_getWeaknessInsight()` | Seed topic with 3 attempts, 33% | Not in persistentWeak output | P1 | scripts/test_tutoring_safety.js (NEW) |
| E-07 | Simplify never adds information absent from original explanation | `_simplifyExplanation()` | Short explanation "The correct answer is B." | Output contains only rephrased content, no added facts | P1 | scripts/test_tutoring_safety.js (NEW) |
| E-08 | RecommendNext never suggests topic with 0 data | `_recommendNext()` | `resetState()`, seed only section A topics | Recommendation never includes unseen topics | P1 | scripts/test_tutoring_safety.js (NEW) |

### Category F: Answer Leakage Detection

| ID | Description | Target | Input Setup | Expected | Priority | File |
|----|------------|--------|-------------|----------|----------|------|
| F-01 | Hint levels 0-3 combined never contain correct answer text | `_provideHint()` | Known correct answer "$62,500" | String "$62,500" not present in any hint 0-3 output | P0 | scripts/test_tutoring_safety.js (NEW) |
| F-02 | Mini-panel explain blocked when no answer recorded | `miniExplain()` | `state.session.answers[qid] = undefined` | Answer not revealed | P0 | scripts/test_tutoring_safety.js (NEW) |
| F-03 | Full tab blocked during CMA Exam mode with questions loaded | `isFullTabBlocked()` | `mode='full'`, questions loaded | Returns true | P0 | scripts/test_tutoring_safety.js (NEW) |
| F-04 | Wrong-choice explain never explains correct choice | `_explainWrongChoices()` | correctChoice="B" | Output never contains "Option B" explanation | P0 | scripts/test_tutoring_safety.js (NEW) |
| F-05 | Post-answer feedback doesn't reveal answer for un-attempted items | `showPostAnswerFeedback()` | `answers[qid] = undefined` | Neutral message only; no "Correct"/"Wrong" label | P1 | scripts/test_tutoring_safety.js (NEW) |

### Category G: Threshold Drift Detection

| ID | Description | Target | Input Setup | Expected | Priority | File |
|----|------------|--------|-------------|----------|----------|------|
| G-01 | All 12 thresholds match default values on fresh state | `getReadinessSummary()._provenance.thresholdsApplied` | `resetState()` | All values match documented defaults | P0 | test_readiness.js |
| G-02 | modelVersion changes only when thresholds change | `getReadinessSummary()` | Compare modelVersion before/after threshold change | modelVersion unchanged when thresholds unchanged; bumped when changed | P1 | test_readiness.js |
| G-03 | REVISION_HISTORY.md entry exists for every modelVersion bump | Cross-reference | Grep REVISION_HISTORY.md for modelVersion string | Entry found for each unique modelVersion in code | P1 | CI/script check |

---

## 4. Test File Mapping

| Category | Primary File | Status |
|----------|-------------|--------|
| A. Readiness Calculation | `scripts/test_readiness.js` | Existing (30 tests as of S105) — extend to ~47 tests |
| B. Threshold Calibration | `scripts/test_calibration.js` | **NEW** — create in S107 |
| C. Tutoring Guardrails | `scripts/test_tutoring_safety.js` | **NEW** — create in S107+ |
| D. Provenance Safety | `scripts/test_readiness.js` | Existing — add ~3 provenance tests |
| E. Hallucination Detection | `scripts/test_tutoring_safety.js` | **NEW** — create in S107+ |
| F. Answer Leakage | `scripts/test_tutoring_safety.js` | **NEW** — create in S107+ |
| G. Threshold Drift | `scripts/test_readiness.js` + CI check | Existing — add ~3 drift tests |

---

## 5. Test Infrastructure Requirements

### 5.1 Existing (Available)
- Mock localStorage (in-memory store)
- Mock `state.session` (exercise + exam modes)
- Mock `scoreMCQ`, `ExamSessionManager`
- `seedTopic()` helper: builds controlled topic aggregates with specified attempts, accuracy, recent performance
- `seedCaseSessions()` helper: builds multi-session case pattern data
- `ensureMinSessions()` helper: pads session count
- Pack loading via `Function` constructor (`pack_a_corrected.js`)

### 5.2 Needed for New Tests (S107+)

**For tutoring safety tests (`test_tutoring_safety.js`):**
- Load `may-core.js` (similar to how `test_readiness.js` loads `may-learner-state.js`)
- Mock `May.context` with: `currentQuestion`, `chatHistory`, `reviewQuestions`, `hintLevel`, `currentCase`, `currentCaseItemType`, `_sessionHints`, `_defectManifest`
- Mock `May.context.currentQuestion` with a known bank question (correctChoice, choices, explanations)
- Mock `document.getElementById` for render tests (or test output text only)
- Mock `window._cmaDefectManifest` for defect-gating tests
- Define `global._isDeliveryBlocked` (if used)

**For calibration harness (`test_calibration.js`):**
- Read exported JSON files from a calibration data directory
- Run `MayLearnerState.load()` equivalent on each
- Run `getReadinessSummary()` and tabulate results
- Produce band distribution and misalignment report

### 5.3 Test Harness Pattern

All new test files should follow the existing `test_readiness.js` pattern:
```javascript
"use strict";
let fs = require("fs");
let path = require("path");
let b = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";

function lg(fp) {
    let c = fs.readFileSync(fp, "utf8");
    c = c.replace(/^const\s+(\w+)\s*=/gm, "global.$1 =");
    c = c.replace(/^let\s+(\w+)\s*=/gm, "global.$1 =");
    (new Function(c))();
}

// Mock environment
global.localStorage = /* in-memory store */;
global.state = { session: null };
global.scoreMCQ = ...;
global.ExamSessionManager = ...;

// Load dependencies
lg(path.join(b, "pack_a_corrected.js"));
lg(path.join(b, "may-learner-state.js"));
lg(path.join(b, "may-core.js"));

// Test framework
let passed = 0, failed = 0;
function test(name, fn) { ... }
function assert(cond, msg) { ... }

// Tests...
// Final tally
console.log("\n=== " + (passed + failed) + " tests: " + passed + " PASS, " + failed + " FAIL ===");
process.exit(failed > 0 ? 1 : 0);
```

---

## 6. Implementation Roadmap

| Session | Deliverable | Tests Added | Cumulative |
|---------|------------|-------------|------------|
| S106 (current) | This test plan spec | 0 | 30 readiness tests |
| S107 | Calibration harness + threshold drift tests | ~10 (B: 8 tests + G: 2-3) | ~40 |
| S108 | Tutoring guardrail tests (exam mode, hint graduation, defect gating) | ~15 (C: 15 tests) | ~55 |
| S109 | Hallucination + answer leakage detection tests | ~13 (E: 8 + F: 5) | ~68 |
| S110 | Readiness edge cases + provenance tests + cross-suite integration | ~10 (A: 5 + D: 3 + integration: 2) | ~78 |

---

## 7. Regression Test Policy

1. **Pre-change:** Run full test suite (all 5 files). Record baseline pass count.
2. **Post-change:** Run full test suite. Must match or exceed baseline pass count.
3. **Scenario matrix:** 8 archetypes (sparse-data, strong, below-threshold, weak-declining, multi-strong, mixed, empty-section, differentiating-sections) must be re-validated after any calibration cycle.
4. **Blocking rule:** Any test failure blocks calibration adoption until root cause is fixed.
5. **REVISION_HISTORY.md:** Every calibration cycle must document: which threshold changed, before/after values, test results, new modelVersion.

---

## 8. Safety Test Scenarios — Quick Reference

### Hallucination Scenarios
1. Topic fabrication: May references "Derivatives Accounting" when question is about "Cost Variances"
2. Exhibit hallucination: Case has 3 exhibits; May references "Exhibit 4"
3. Pattern invention: May says "This is a new error pattern: capitalization_confusion"
4. Data fabrication: May says "You're improving at Transfer Pricing" when learner has 0 attempts on that topic

### Answer Leakage Scenarios
1. Hint level 1 contains "The correct answer is B"
2. Mini-panel shows answer before learner submits
3. Exam-mode block fails; May reveals answer during CMA simulation
4. Wrong-choice explanation includes: "Option B is correct because..."
5. Post-answer feedback on un-attempted question says "Incorrect, the answer was C"

### Threshold Drift Scenarios
1. `accuracyHigh` silently changed from 80 to 75 without modelVersion bump
2. `minAttemptsReady` changed from 6 to 5 without REVISION_HISTORY entry
3. Two different functions return different modelVersions
4. `_provenance.thresholdsApplied` reports 80 but code uses 75

---

*End of test plan spec. No tests implemented in S106. Implementation begins S107+.*
