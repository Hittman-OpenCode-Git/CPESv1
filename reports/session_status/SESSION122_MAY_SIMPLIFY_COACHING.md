# Session 122 — May Simplify Coaching Upgrade

**Date:** 2026-07-26
**Status:** Complete
**Lane:** 100-series May refinement
**Pre-flight:** 237/237 PASS (119 Stage C + 98 tutoring safety + 20 governance guard)
**Post-flight:** 249/249 PASS (119 Stage C + 110 tutoring safety + 20 governance guard)
**Governance Guard:** 20/20 PASS (unchanged)

---

## 1. Executive Summary

May's `_simplifyExplanation` previously extracted a single core sentence from `ExplanationCorrect` and echoed it — with no answer gating for unanswered questions, no plain-language translation, and no conceptual framing. S122 replaced that with a 4-section plain-language coaching system: What this means, Why it matters, How to recognize it on exam day, and a Quick rule to remember. A critical safety gate was added: active unanswered questions now receive concept-only coaching without revealing the correct answer.

**Simplify behavior changed:** From verbatim core-sentence echo → 4-section plain-language coaching with answer-gating.

---

## 2. Prior Simplify Behavior

- One-line output: "In simple terms: [core sentence from ExplanationCorrect]. This question is testing [topic]. The key is knowing the answer is [cc]: [choice]."
- **No answer-gating** — revealed the correct answer in all contexts, including before the learner attempted the question
- No review-mode awareness
- No selected-answer awareness
- No accounting jargon translation
- No conceptual framing (why it matters, how to recognize it)
- No memory hooks
- Zero tests

---

## 3. New Simplify Behavior

### Output Structure

1. **What this means** — plain-language translation of the concept using `_plainLanguageTranslation` + `_simplifyAccountingLanguage` (36 term replacement patterns with parenthetical form preserving original meaning)
2. **Why it matters** — section-aligned real-world significance explanation
3. **How to recognize it on exam day** — practical recognition tips by section and question type
4. **Quick rule to remember** — memory-anchoring rule, section-aligned, with formula detection for calculations

### Context-Aware Gating

| Context | Behavior |
|---------|----------|
| **Active unanswered** | Concept-only coaching — What this concept is about, Why it matters, How to recognize, Quick rule. **No answer reveal.** "I can break down the concept for you without giving away the answer." |
| **Post-answer** | Full 4-section coaching with correct answer confirmed. If learner chose wrong, gentle referral: "You chose X — that option reflects a common trap. ... Want me to break down why X is wrong? Tap **Wrong choices**." |
| **Review mode** | Full 4-section coaching with review framing: "Let's break this down in plain language so the concept sticks." Includes referral to Explain answer for full detail. |

### Accounting Language Translation

36 replacement patterns across 10 categories:
- Revenue/recognition (6): performance obligation, recognize revenue, realization principle, etc.
- Expense/cost (3): capitalize, amortize, depreciate
- Classification (3): operating/investing/financing activities
- Valuation/measurement (4): fair value, historical cost, NRV, present value
- Controls (4): control environment, preventive/detective control, segregation of duties
- Budget/planning (3): static/flexible/master budget
- Performance (3): variance analysis, ROI, residual income
- Cost management (7): contribution margin, break-even, overhead allocation, absorption/variable costing, sunk cost
- Standard costing/variance (3): price/quantity/efficiency/spending variance
- Technology (3): entity-level/application/IT general controls

**Design principle:** All replacements use parenthetical form — keeps original term alongside plain equivalent: "record as an asset (capitalize) instead of an immediate expense." This preserves meaning and introduces plain language simultaneously.

---

## 4. Implementation

### New Functions (may-core.js)

| Function | Purpose |
|----------|---------|
| `_buildSimplifyCoaching(q, context)` | Builds 4-section simplified coaching breakdown |
| `_plainLanguageTranslation(exp, topic, isCalc)` | Translates technical explanations into plain language |
| `_simplifyAccountingLanguage(text, topic)` | Replaces accounting jargon with parenthetical plain equivalents (36 patterns) |
| `_inferWhyItMatters(topic, section, isCalc)` | Explains real-world significance of the concept |
| `_inferHowToRecognize(topic, section, isCalc, stem)` | Practical exam-day recognition tips |
| `_inferQuickRuleToRemember(q, topic, section, isCalc)` | Memory-anchoring rule with formula detection |

### Modified Functions

| Function | Changes |
|----------|---------|
| `_simplifyExplanation()` | Full rewrite: answer-gating, 4-section coaching via `_buildSimplifyCoaching`, wrong-answer awareness with Wrong Choices referral, review-mode framing |

---

## 5. Safety Validation

| Check | Result |
|-------|--------|
| Active unanswered gate | CONFIRMED — S122-05: concept-only, no answer letter/choice revealed |
| Answer reveal in review mode | CONFIRMED — S122-06: full 4-section coaching with answer |
| `_guardedSpeak` integration | CONFIRMED — S122-09 |
| No prediction language | CONFIRMED — S122-08 |
| No fabrication on thin explanations | CONFIRMED — S122-07: no ASC/FASB/COSO on empty ExplanationCorrect |
| Meaning preservation | CONFIRMED — S122-11: core concepts preserved across 5 test inputs |
| Term replacement quality | CONFIRMED — S122-04: accounting jargon replaced with plain equivalents |
| S120 explain regression | CONFIRMED — S122-12: tutor-layer explain still functional |
| S121 wrong-choice regression | CONFIRMED — S122-12: misconception coaching still functional |
| All S119-S111 safety tests | All preserved |
| Governance guard | 20/20 PASS (unchanged) |

---

## 6. Simulation Results

| Scenario | Insight Added | Meaning Preserved | Safety Held |
|----------|--------------|-------------------|-------------|
| Conceptual MCQ — unanswered | Yes — 4-section concept coaching | N/A — no answer revealed | Yes (gate) |
| Conceptual MCQ — answered correctly | Yes — plain translation + framing | Yes — ExplanationCorrect embedded | Yes |
| Conceptual MCQ — answered incorrectly | Yes — wrong-answer awareness + referral | Yes | Yes |
| Calculation MCQ — post-answer | Yes — calc-specific translation + formula detection | Yes | Yes |
| Thin-explanation item — review | Yes — structural coaching, no fabrication | Yes — no invented facts | Yes |
| Completed-session review | Yes — review framing + full plain-language | Yes | Yes |

---

## 7. Files Changed

| File | Change |
|------|--------|
| `may-core.js` | +~390 lines: 6 new helper functions + rewritten `_simplifyExplanation` |
| `scripts/test_tutoring_safety.js` | +12 S122 tests (S122-01 through S122-12) |
| `scripts/test_may_stagec.js` | No changes |

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
| scored_cases4.js | 0BDAE8EE... | 500-series change (S520) |
| scored_cases5.js | 5D41C371... | 500-series change (S520) |
| app.js | 49EADD2D... | Unchanged |
| index_updated.html | E69C36C0... | Unchanged |
| styles.css | 25B928DE... | Unchanged |

---

## 8. Governance Attestation

- Full pre-flight suite run: 237/237 PASS ✓
- Full post-flight suite run: 249/249 PASS ✓
- No pack content changes ✓
- No case-bank changes (by S122 — S520 changes are separate lane) ✓
- No answer-key changes ✓
- No explanation/distractor bank-content changes ✓
- No certification-state changes ✓
- No scoring/runtime changes ✓
- No May threshold changes (accuracyHigh=80, accuracyGood=75, stabilityHigh=75, stabilityGood=60) ✓
- No modelVersion drift (S111-1.0) ✓
- No broad rollout enabled ✓
- No real learner data used ✓
- Concurrent-lane guard completed (11/13 MD5 hashes match; 2 differ from 500-series lane — expected and authorized) ✓
- 100-series scope confirmed ✓
- 500-series files checked ✓
- 700-series files checked ✓

---

## 9. Follow-On Recommendations

**Primary:** S121 recommended improve Simplify — achieved. Next: consider a "Show official explanation only" toggle that displays raw ExplanationCorrect/ExplanationWrong text separately from May's coaching layers in a collapsible section.

**Alternate:** Add learner-personalization to simplify output — if the learner has specific topic weaknesses, tailor the "Why it matters" and "Quick rule" to reference their known traps.

**Deferred:** Extend simplification to case-study explanations — currently Simplify only works with MCQ items.

---

## 10. Report Paths

- `reports/systematic_testing/SESSION122_SIMPLIFY_PATH_INVENTORY.json`
- `reports/systematic_testing/SESSION122_SIMPLIFY_IMPLEMENTATION_RESULTS.json`
- `reports/systematic_testing/SESSION122_SIMPLIFY_TEST_RESULTS.json`
- `reports/systematic_testing/SESSION122_SIMPLIFY_BEHAVIOR_SIMULATION.json`
- `reports/session_status/SESSION122_MAY_SIMPLIFY_COACHING.md` (this file)
- `knowledge/REVISION_HISTORY.md` — updated

---

*Generated 2026-07-26 — Session 122 — May Simplify Coaching Upgrade*
