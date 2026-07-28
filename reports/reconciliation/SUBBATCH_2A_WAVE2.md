# Sub-batch 2A — Wave 2 Verification Report

**Date:** 2026-07-22
**Wave:** 2 of 3 (8 questions)
**Governance:** Build-Time AI Verification per `knowledge/BUILD_TIME_VERIFICATION_STANDARD.md` v1.0
**Pre-sweep context:** Bucket 1A sweep completed (108 fields cleared). All 8 Wave 2 questions are post-sweep.

---

## Verification Summary

| QID | Subtopic | Action | CAQS Est. | Confidence |
|-----|----------|--------|-----------|------------|
| P1-A-015 | A.3 — Equity method | **REVISE** | 68 | High |
| P1-A-016 | A.3 — Consolidation | **REVISE** | 70 | High |
| P1-A-017 | A.3 — Intercompany elim. | **REVISE** | 69 | High |
| P1-A-020 | A.4 — Integrated reporting | **KEEP** | 82 | High |
| P1-A-036 | A.1 — Accounting equation | **KEEP** | 87 | High |
| P1-A-046 | A.1 — Accounting equation | **KEEP** | 87 | High |
| P1-A-056 | A.1 — Accounting equation | **KEEP** | 87 | High |
| P1-A-066 | A.1 — Accounting equation | **KEEP** | 87 | High |

---

## Per-Question Verification

### P1-A-015 — Equity Method Investment Influence

**Stem:** Frontier owns 30% of another company and can participate in policy decisions. Which response is most appropriate?

**CorrectChoice:** C — "Use the equity method when significant influence exists"

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. ASC 323: 20–50% ownership with significant influence → equity method. | High |
| **Precision** | Stem is clear. Choices map to common misconceptions (consolidation, fair value, dividend accounting). | High |
| **Difficulty** | Easy. Appropriate for a foundational equity method question. | High |
| **Distractor engineering** | **DL-007.** All three distractor explanations use the identical template: `"Option [X] represents a plausible misconception. Under ASC 323, the correct analysis leads to the conclusion that [correct answer]. A candidate may select this option by misapplying a related but distinct concept."` Zero educational value — does not explain WHY the choice is wrong. | High |
| **Blueprint alignment** | A.3 Consolidated financial statements. Equity method is a prerequisite to consolidation concepts. | High |
| **CMA Part 1 relevance** | In scope. Equity method tested on CMA Part 1. | High |

**CAQS estimate:** 68 (penalized: precision −5, distractor engineering −12, explanations −15)

**Recommended action:** REVISE — rewrite ExplanationWrongA/B/D to be choice-specific. Explain WHY consolidation is wrong (<50% doesn't trigger consolidation despite influence), why fair-value-through-income is wrong (equity method applies when influence exists), and why dividends-as-revenue is wrong (equity method treats dividends as return of investment, not revenue).

**DL-008 post-sweep status:** ExplanationWrongC = "" (correctly empty after sweep). All other distractor slots non-empty.

---

### P1-A-016 — Consolidation Control Principle

**Stem:** Granite owns a majority voting interest in a subsidiary. Which response is most appropriate?

**CorrectChoice:** A — "Consolidate the subsidiary because the parent controls the investee"

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. ASC 810: majority voting interest → control → consolidate. | High |
| **Precision** | Stem directly asks about consolidation trigger. Choices test control vs. legal-entity-separation vs. dividend-threshold vs. intercompany-sales. | High |
| **Difficulty** | Moderate. Appropriate for a CMA-level consolidation question. | High |
| **Distractor engineering** | **DL-007.** Same template pattern as P1-A-015. ExplanationWrongB and C use identical template. ExplanationWrongD has slightly different phrasing but is still generic ("may misunderstand how the governing standard applies"). | High |
| **Blueprint alignment** | A.3 Consolidated financial statements. Consolidation control principle is core. | High |
| **CMA Part 1 relevance** | In scope. Consolidation tested on CMA Part 1. | High |

**CAQS estimate:** 70 (penalized: distractor engineering −12, explanations −13, precision −5)

**Recommended action:** REVISE — rewrite ExplanationWrongB/C/D. Distractor B should explain that the cost method doesn't apply when control exists. Distractor C should explain that dividends are irrelevant to consolidation. Distractor D should explain that intercompany eliminations are separate from the consolidation decision.

**DL-008 post-sweep status:** ExplanationWrongA = "" (correctly empty after sweep).

---

### P1-A-017 — Intercompany Inventory Profit Elimination

**Stem:** Harbor sold inventory to its subsidiary and the inventory remains unsold to outsiders at year-end. Which response is most appropriate?

**CorrectChoice:** B — "Eliminate the unrealized intercompany profit in consolidation"

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. ASC 810: unrealized intercompany profit on downstream inventory must be eliminated. | High |
| **Precision** | Stem clearly describes the fact pattern (unsold at year-end → unrealized). | High |
| **Difficulty** | Moderate. Appropriate for consolidation elimination concepts. | High |
| **Distractor engineering** | **DL-007.** ExplanationWrongA uses the template; C uses the template; D uses the template. Identical structure. | High |
| **Blueprint alignment** | A.3 Consolidated financial statements. Intercompany eliminations are core. | High |
| **CMA Part 1 relevance** | In scope. | High |

**CAQS estimate:** 69 (penalized: distractor engineering −12, explanations −14, precision −5)

**Recommended action:** REVISE — rewrite all three distractor explanations. Explain why recording as NCI income is wrong (it's intercompany, not NCI attribution), why recognizing all profit is wrong (unrealized = not earned), and why eliminating only cash is wrong (it's about profit, not cash flow).

**DL-008 post-sweep status:** ExplanationWrongB = "" (correctly empty after sweep).

---

### P1-A-020 — Integrated Reporting Value Creation

**Stem:** Keystone wants a report connecting strategy, governance, performance, prospects, and resources. Which response is most appropriate?

**CorrectChoice:** A — "Use integrated reporting to communicate how the organization creates value over time"

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. IR framework: value creation over time across six capitals. | High |
| **Precision** | Stem maps directly to the IR definition. Choices test clear misconceptions. | High |
| **Difficulty** | Moderate. | High |
| **Distractor engineering** | Distractors are good: replacing GAAP statements, calculating taxable income, inventory costing — all clearly wrong but map to plausible misunderstandings of what IR is. | High |
| **Blueprint alignment** | A.4 Integrated reporting. Aligned. | High |
| **CMA Part 1 relevance** | In scope. IR is tested on CMA Part 1. | High |

**CAQS estimate:** 82 (minor: ExplanationWrongC — "Use it only to calculate taxable income" is not a plausible misconception about IR; it's more of a joke distractor.)

**Recommended action:** KEEP. Consider minor edit: replace Distractor C with a more plausible misconception (e.g., "Use integrated reporting as a sustainability-only report separate from financial reporting").

**DL-008 post-sweep status:** ExplanationWrongA = "" (correctly empty after sweep).

---

### P1-A-036 — Accounting Equation Equity Calculation 11

**Stem:** Lumen reports total assets of $367,300 and total liabilities of $148,100. What total equity should be reported?

**CorrectChoice:** D — $219,200

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. $367,300 − $148,100 = $219,200. | High |
| **Precision** | Straightforward calculation. Choices are clean: added (distractor A), off-by-15k (B), liabilities (C). | High |
| **Difficulty** | Moderate. Simple arithmetic, but the accounting equation concept is appropriate for A.1. | High |
| **Distractor engineering** | Good. Each distractor maps to a specific error: adding (reverses equation), off-by-15k (random arithmetic error), confusing equity with liabilities. | High |
| **Blueprint alignment** | A.1 Financial statements. Accounting equation is fundamental. | High |
| **CMA Part 1 relevance** | In scope. | High |

**CAQS estimate:** 87 (strong question; minor: explanation_short warnings are expected for calculation items)

**Recommended action:** KEEP.

**DL-008 post-sweep status:** ExplanationWrongD = "" (correctly empty after sweep).

---

### P1-A-046 — Accounting Equation Equity Calculation 21

**Stem:** Vantage reports total assets of $410,300 and total liabilities of $169,100. What total equity should be reported?

**CorrectChoice:** C — $241,200

Nearly identical to P1-A-036 with different numbers. Same assessment.

| Dimension | Assessment | Confidence |
|-----------|-----------|------------|
| **Correctness** | Correct. $410,300 − $169,100 = $241,200. | High |
| **Precision** | Same clean structure. | High |
| **Difficulty** | Moderate. | High |
| **Distractor engineering** | Good. | High |
| **Blueprint alignment** | A.1. Redundancy note: this is the second of four nearly identical accounting-equation questions in Wave 2. | High |
| **CMA Part 1 relevance** | In scope. | High |

**CAQS estimate:** 87

**Recommended action:** KEEP. Note blueprint concern: 4 of 8 Wave 2 questions test the exact same concept (assets − liabilities = equity). Consider whether this density is appropriate for the pool.

**DL-008 post-sweep status:** ExplanationWrongC = "" (correctly empty after sweep).

---

### P1-A-056 — Accounting Equation Equity Calculation 31

**Stem:** Granite reports total assets of $453,300 and total liabilities of $190,100. What total equity should be reported?

**CorrectChoice:** D — $263,200

Third of four near-identical accounting-equation questions. Same assessment as P1-A-036 and P1-A-046.

**CAQS estimate:** 87

**Recommended action:** KEEP.

**DL-008 post-sweep status:** ExplanationWrongD = "" (correctly empty after sweep).

---

### P1-A-066 — Accounting Equation Equity Calculation 41

**Stem:** Quartz reports total assets of $496,300 and total liabilities of $211,100. What total equity should be reported?

**CorrectChoice:** C — $285,200

Fourth of four near-identical accounting-equation questions. Same assessment.

**CAQS estimate:** 87

**Recommended action:** KEEP.

**DL-008 post-sweep status:** ExplanationWrongC = "" (correctly empty after sweep).

---

## Cross-Cutting Findings

### DL-007 Pattern (Identical Distractor Explanations)
**Affected:** P1-A-015, P1-A-016, P1-A-017
**Pattern:** All three conceptual Section A.3 questions use the same distractor explanation template:
```
"Option [X] represents a plausible misconception. Under [Standard], the correct analysis leads to the conclusion that [correct answer]. A candidate may select this option by misapplying a related but distinct concept."
```
**Recommendation:** Each requires manual rewrite — explain the specific misconception per distractor. See per-question notes above.

### Redundancy Cluster — Accounting Equation (A.1)
**Affected:** P1-A-036, P1-A-046, P1-A-056, P1-A-066
**Observation:** 4 of 8 Wave 2 questions test the exact same accounting-equation concept (assets − liabilities = equity). Only the company name and numbers differ. This is 50% of the wave.
**Recommendation:** Acceptable for a practice bank (multiple variants build fluency). Document in pool design notes. No structural defect — these serve a pedagogical purpose (distributed practice).

### Explanation-Short Warnings
**Affected:** P1-A-036, P1-A-046, P1-A-056, P1-A-066
**Validator finding:** explanation_short warnings are expected for calculation items where distractor explanations are one-liners (e.g., "This is total liabilities, not total equity."). These are intentional — the short format is pedagogically appropriate for arithmetic distractors. No action required.

---

## Wave 2 Action Plan

| Priority | Action | Items | Target |
|----------|--------|-------|--------|
| 1 | REVISE distractor explanations (DL-007) | P1-A-015, P1-A-016, P1-A-017 | Per-question rewrite |
| 2 | KEEP (with minor optional edit) | P1-A-020 | Consider replacing Distractor C |
| 3 | KEEP (no action) | P1-A-036, P1-A-046, P1-A-056, P1-A-066 | Register as Exam-Ready |
| 4 | Document pool redundancy | Accounting equation cluster | SUBBATCH_2A_REPORT.md |

Paused per governance — awaiting user review before Wave 3 opens and before any revisions are applied.
