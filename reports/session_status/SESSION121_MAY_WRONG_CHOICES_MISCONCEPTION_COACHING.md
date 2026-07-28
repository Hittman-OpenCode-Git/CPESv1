# Session 121 — May Wrong Choices Misconception Coaching Upgrade

**Date:** 2026-07-26
**Status:** Complete
**Lane:** 100-series May refinement
**Pre-flight:** 225/225 PASS (119 Stage C + 86 tutoring safety + 20 governance guard)
**Post-flight:** 237/237 PASS (119 Stage C + 98 tutoring safety + 20 governance guard)
**Governance Guard:** 20/20 PASS (unchanged)

---

## 1. Executive Summary

May's `_explainWrongChoices` previously listed each wrong option with its `ExplanationWrong` text verbatim — a flat, shallow output. S121 replaced that with a 4-section structured misconception coaching system: why the distractor is tempting, why it is not correct, what misconception it reflects, and how to avoid the trap next time. The upgrade also added a critical safety gate: unanswered active questions now receive strategy-only output without revealing which options are wrong.

**Wrong-choice behavior changed:** From flat ExplanationWrong list → 4-section misconception coaching with context-aware gating.

---

## 2. Prior Wrong-Choice Behavior

- Flat list: `Option X — choice text` + `ExplanationWrongX` for each non-correct choice
- No learner-state awareness — identical output regardless of whether learner attempted the question
- No answer gating — revealed which options were wrong before the learner answered
- Selected wrong answer not prioritized
- Review mode indistinguishable from active session
- No coaching interpretation beyond verbatim ExplanationWrong

---

## 3. New Wrong-Choice Behavior

### Output Structure (per wrong option)

1. **Why it is tempting** — why a learner might reasonably choose this option (stem/choice overlap, calculation trap patterns, distractor language analysis)
2. **Why it is not correct** — `ExplanationWrong` text (when available) or safe fallback grounded in topic and concept
3. **Misconception to watch** — the thinking error or topic boundary confusion
4. **How to avoid it next time** — section-specific pattern-recognition tip

### Context-Aware Gating

| Context | Behavior |
|---------|----------|
| **Active unanswered** | Strategy-only output — general distractor evaluation tips, no option names revealed. "I can help you evaluate the options without giving away the answer." |
| **Post-answer (wrong selected)** | Selected wrong answer prioritized first with `*(your answer)*` tag. "Let's start with the answer you chose..." |
| **Review mode** | Full 4-section coaching for all wrong options + "Pulling it together" summary connecting distractor analysis to concept boundaries |

### Grounding Rules

- `ExplanationWrong` text always included in "Why it is not correct" when available
- Thin explanations use safe fallback: "This choice does not match the correct accounting treatment... When you trace the governing rule back..."
- No invented ASC/FASB/COSO citations in temptation or misconception inference
- `_inferWhyTempting` uses stem/choice word overlap, calculation detection, and distractor language patterns — not random generation

---

## 4. Implementation

### New Functions (may-core.js)

| Function | Purpose |
|----------|---------|
| `_buildWrongChoiceCoaching(q, context)` | Builds structured coaching objects for each wrong choice |
| `_inferWhyTempting(q, l, text, topic, isCalc)` | Infers why a distractor looks plausible |
| `_inferWhyWrongFallback(q, l, text, topic, correctText)` | Safe fallback when ExplanationWrong is thin |
| `_inferMisconception(q, l, text, topic, wrongExp, isCalc)` | Infers the conceptual error behind choosing this option |
| `_inferAvoidNextTime(q, l, topic, section, isCalc)` | Section-specific pattern-recognition tip |

### Modified Functions

| Function | Changes |
|----------|---------|
| `_explainWrongChoices()` | Full rewrite: answer gating, selected-answer prioritization, review-mode awareness, 4-section coaching output |

---

## 5. Safety Validation

| Check | Result |
|-------|--------|
| Active unanswered gate | CONFIRMED — S121-04: strategy-only, no option names revealed before attempt |
| Review mode answer reveal | CONFIRMED — S121-06: full coaching + "Pulling it together" summary |
| `_guardedSpeak` integration | CONFIRMED — S121-09: wrong-choices routes through `_guardedSpeak` in pilot mode |
| No prediction language | CONFIRMED — S121-07: no pass/fail/exam-ready language in coaching output |
| Anti-fabrication (tempting inference) | CONFIRMED — S121-11: no ASC/FASB/COSO in temptation text |
| Anti-fabrication (thin explanations) | CONFIRMED — S121-03: safe fallback used, no invented facts |
| Correct-choice exclusion | CONFIRMED — S121-05: correct choice never appears in wrong-choice output |
| All S120 explain tutor-layer tests | 86/86 PASS (S120-01 through S120-12 all passing) |
| All S119-S111 safety tests | All preserved |
| Governance guard | 20/20 PASS (identical pre/post) |

---

## 6. Simulation Results

| Scenario | Insight Added | Source Grounded | Safety Held |
|----------|--------------|-----------------|-------------|
| Conceptual MCQ (post-answer, wrong selected) | Yes — selected-first + misconception | Yes — ExplanationWrong embedded | Yes |
| Calculation MCQ (post-answer, wrong selected) | Yes — calc-specific traps + formula advice | Yes | Yes |
| Thin-explanation item (review mode) | Yes — structural coaching, no fabrication | N/A but no fabrication | Yes |
| Active unanswered question | N/A — gated, strategy-only | N/A — no content accessed | Yes (NEW GATE) |
| Completed-session review item | Yes — richest path with Pulling it together | Yes | Yes |

---

## 7. Files Changed

| File | Change |
|------|--------|
| `may-core.js` | +~280 lines: 5 new helper functions + rewritten `_explainWrongChoices` |
| `scripts/test_may_stagec.js` | Updated 1 test (verbatim list → coaching structure verification) |
| `scripts/test_tutoring_safety.js` | Updated F-04b + added 12 S121 tests (S121-01 through S121-12) |

### Files NOT Changed (MD5 verified)

| File | MD5 | Status |
|------|-----|--------|
| pack_a_corrected.js | 3A092453... | Unchanged |
| pack_b_corrected.js | 2DAB932D... | Unchanged |
| pack_c_corrected.js | D29DE025... | Unchanged |
| pack_d_corrected.js | 846BC7C0... | Unchanged |
| pack_e_corrected.js | 934B6FE8... | Unchanged |
| scored_cases.js | B8277120... | Unchanged |
| scored_cases2.js | 4A98F85F... | Unchanged |
| scored_cases3.js | 7B7ECE93... | Unchanged |
| scored_cases4.js | 509009D3... | Unchanged |
| scored_cases5.js | 6868ED05... | Unchanged |
| app.js | 49EADD2D... | Unchanged |
| index_updated.html | E69C36C0... | Unchanged |
| styles.css | 25B928DE... | Unchanged |

---

## 8. Governance Attestation

- Full pre-flight suite run: 225/225 PASS ✓
- Full post-flight suite run: 237/237 PASS ✓
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
- Concurrent-lane guard completed (all 13 protected file MD5 hashes confirmed unchanged) ✓
- 100-series scope confirmed ✓
- 500-series files checked ✓
- 700-series files checked ✓

---

## 9. Follow-On Recommendations

**Primary:** After S121, improve `Simplify` so May can translate technical explanations into plain-language, step-by-step coaching without losing accounting precision.

**Alternate:** Add an optional "Show me the official explanation only" toggle that displays raw `ExplanationWrong` text separately from May's coaching layer.

**Deferred:** Consider learner-specific trap profiling — if the learner repeatedly falls for the same misconception pattern (e.g., classification errors, formula setup), May could proactively call it out.

---

## 10. Report Paths

- `reports/systematic_testing/SESSION121_WRONG_CHOICES_PATH_INVENTORY.json`
- `reports/systematic_testing/SESSION121_WRONG_CHOICES_IMPLEMENTATION_RESULTS.json`
- `reports/systematic_testing/SESSION121_WRONG_CHOICES_TEST_RESULTS.json`
- `reports/systematic_testing/SESSION121_WRONG_CHOICES_BEHAVIOR_SIMULATION.json`
- `reports/session_status/SESSION121_MAY_WRONG_CHOICES_MISCONCEPTION_COACHING.md` (this file)
- `knowledge/REVISION_HISTORY.md` — updated

---

*Generated 2026-07-26 — Session 121 — May Wrong Choices Misconception Coaching Upgrade*
