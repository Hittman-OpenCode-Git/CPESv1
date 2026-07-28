# Session 120 — May Explain Function Upgrade: From Review Echo to Tutor Insight

**Date:** 2026-07-26
**Status:** Complete
**Lane:** 100-series May refinement
**Pre-flight:** 193/193 PASS (119 Stage C + 74 tutoring safety)
**Post-flight:** 205/205 PASS (119 Stage C + 86 tutoring safety)
**Governance Guard:** 20/20 PASS (unchanged)

---

## 1. Executive Summary

May's `_explainAnswer` previously echoed the bank's `ExplanationCorrect` field verbatim — duplicating what the learner already sees in exam review. S120 replaced that with a 6-section layered tutoring explanation that adds concept framing, trap awareness, pattern recognition, and review guidance while preserving the official bank explanation as source-ground truth.

**Explain behavior changed:** From single-block verbatim echo → 6-section structured tutoring output.

---

## 2. Prior Behavior

- `_explainAnswer` displayed: correct answer letter/choice + `ExplanationCorrect` verbatim + topic progress note
- `miniExplain` displayed: correct answer + 250-char truncated `ExplanationCorrect` snippet (after attempt gate)
- No concept framing, trap analysis, or pattern recognition
- The only insight came from topic-progress stats (if >=2 attempts)

---

## 3. New Explain Behavior

### Output Structure

1. **Short answer** — correct answer in May's tutoring voice
2. **What this is testing** — topic, section, section name, difficulty, item type (calculation vs. conceptual)
3. **Why the answer works** — bank `ExplanationCorrect` + plain-language interpretation
4. **Common trap** — what learners commonly confuse (inferred from wrong-answer explanations or question type)
5. **How to spot it next time** — pattern-recognition tip by section
6. **Review focus** — section-specific review recommendation + topic accuracy data

### Grounding Rules

- `ExplanationCorrect` always included in "Why the answer works" (preserved)
- Thin explanations use safe fallback: "The bank explanation is brief, so I'll keep this grounded..."
- No invented ASC/FASB/COSO citations when thin
- Calculation items get calculation-specific trap and pattern language
- Section A/E review focus adapts: uses ASC/COSO references only when bank explanation is present (gated on `hasExplanation`)

### miniExplain Update

- Gate preserved: blocks before attempt, reveals in review mode
- Now includes common trap note alongside answer + snippet (concise, inline)

---

## 4. Implementation

### New Functions (may-core.js)

| Function | Purpose |
|----------|---------|
| `_buildTutorExplanation(q)` | Builds 6-field structured explanation object |
| `_interpretExplanation(exp, topic, isCalc)` | Extracts key reasoning sentence from bank explanation |
| `_inferCommonTrap(q, topic, isCalc)` | Infers common trap from wrong-explanations or question type |
| `_inferPatternRecognition(q, topic, section, isCalc)` | Section-specific pattern-recognition advice |
| `_inferReviewFocus(q, topic, section)` | Review recommendation with topic-accuracy data |

### Modified Functions

- `_explainAnswer()` — delegates to `_buildTutorExplanation`, assembles 6-section output
- `miniExplain()` — uses `_buildTutorExplanation` for richer mini-explain with trap note

---

## 5. Safety Validation

| Check | Result |
|-------|--------|
| Active unanswered gate (miniExplain) | PRESERVED — "Try answering first" before attempt |
| Review mode answer reveal (miniExplain) | PRESERVED — full reveal when session completed |
| `_guardedSpeak` integration | PRESERVED — explain routes through `_guardedSpeak` in pilot mode |
| No prediction language | CONFIRMED — S120-06 confirms no exam-ready/pass language |
| Anti-fabrication (thin explanations) | CONFIRMED — S120-03 confirms no ASC/FASB/COSO on thin |
| All S111-S119 safety tests | 74 safety tests + 119 Stage C tests all PASS |
| Governance guard | 20/20 PASS (identical pre/post) |

---

## 6. Simulation Results

| Question Type | Insight Added | Source Grounded | Safety Held |
|---------------|--------------|-----------------|-------------|
| Conceptual MCQ | Yes — trap + pattern | Yes | Yes |
| Calculation MCQ | Yes — calc-specific traps | Yes | Yes |
| Thin-explanation item | Yes — safe fallback | Yes | Yes |
| Answered-wrong item | Yes — trap analysis | Yes | Yes |
| Completed-session review | Yes — richest path | Yes | Yes |

---

## 7. Files Changed

| File | Change |
|------|--------|
| `may-core.js` | +~200 lines: 5 new functions + modified `_explainAnswer` and `miniExplain` |
| `scripts/test_may_stagec.js` | Updated 1 test (verbatim → includes+tutor), added test env mocks |
| `scripts/test_tutoring_safety.js` | Added 12 S120 tutor-layer tests, added sessionStorage mock |

### Files NOT Changed (MD5 verified)

| File | MD5 |
|------|-----|
| pack_a_corrected.js | 3A09... (unchanged) |
| pack_b_corrected.js | 2DAB... (unchanged) |
| pack_c_corrected.js | D29D... (unchanged) |
| pack_d_corrected.js | 846B... (unchanged) |
| pack_e_corrected.js | 934B... (unchanged) |
| scored_cases.js — scored_cases5.js | All unchanged |
| app.js | 49EA... (unchanged) |
| index_updated.html | E69C... (unchanged) |
| styles.css | 25B9... (unchanged) |

---

## 8. Governance Attestation

- Full pre-flight suite run: 193/193 PASS ✓
- Full post-flight suite run: 205/205 PASS ✓
- No pack content changes ✓
- No case-bank changes ✓
- No answer-key changes ✓
- No explanation/distractor bank-content changes ✓
- No certification-state changes ✓
- No scoring/runtime changes ✓
- No May threshold changes (accuracyHigh=80, accuracyGood=75, stabilityHigh=75, stabilityGood=60) ✓
- No modelVersion drift (S111-1.0) ✓
- No broad rollout enabled ✓
- No real learner data used ✓
- Concurrent-lane guard completed ✓

---

## 9. Follow-On Recommendations

**Primary:** After S120, improve `Wrong choices` so May gives richer misconception coaching instead of only listing why each option is wrong.

**Alternate:** Add an optional "Show me the official explanation" toggle that displays the raw `ExplanationCorrect` separately from May's tutor layer.

**Deferred:** Consider topic-aware trap patterns that draw from the learner's own misconception pattern data for truly personalized trap warnings.

---

## 10. Report Paths

- `reports/systematic_testing/SESSION120_EXPLAIN_PATH_INVENTORY.json`
- `reports/systematic_testing/SESSION120_EXPLAIN_IMPLEMENTATION_RESULTS.json`
- `reports/systematic_testing/SESSION120_EXPLAIN_TEST_RESULTS.json`
- `reports/systematic_testing/SESSION120_EXPLAIN_BEHAVIOR_SIMULATION.json`
- `reports/session_status/SESSION120_MAY_EXPLAIN_TUTOR_LAYER_REFINEMENT.md` (this file)
- `knowledge/REVISION_HISTORY.md` — updated

---

*Generated 2026-07-26 — Session 120 — May Explain Tutor-Layer Refinement*
