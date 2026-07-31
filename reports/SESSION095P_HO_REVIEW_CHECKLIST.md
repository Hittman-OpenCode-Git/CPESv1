# Session 95P — Higher-Order Review Checklist

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Purpose:** Human Author / AI Reviewer checklist for certifying an item's cognitive level as Analyze or Evaluate before it enters the learner pool.

---

## How to Use This Checklist

1. For each item being reviewed, complete Section A (Cognitive Classification) first.
2. If the item is classified as Analyze or Evaluate, complete Section B (Analyze) or Section C (Evaluate).
3. If any Automatic Failure box is checked, the item cannot carry the target cognitive level.
4. A reviewer must sign off (Section D) for certification.

---

## Section A: Cognitive Classification

### A1: What does the candidate actually do?

Read the stem and answer choices. Ignore the current label.

| What the candidate does | True Cognitive Level |
|------------------------|---------------------|
| [ ] Matches a definition in the stem to a term in the choices | → **Remember** |
| [ ] Explains, interprets, or paraphrases a concept | → **Understand** |
| [ ] Executes a known formula, procedure, or rule with provided data | → **Apply** |
| [ ] Decomposes data, identifies causes, detects patterns, or compares entities | → **Analyze** |
| [ ] Makes a judgment call, selects the best option from competing alternatives with trade-offs | → **Evaluate** |

**Check one box above. This is the true cognitive level.**

---

### A2: Automatic Failure Gate

Check all that apply. If ANY box is checked, the item cannot carry Analyze or Evaluate.

| # | Condition | Check |
|---|-----------|-------|
| AF-1 | Stem defines a term and the answer is the term name (definition-match) | [ ] |
| AF-2 | Item requires plugging numbers into a known formula (formula substitution) | [ ] |
| AF-3 | Item requires applying a known standard/rule to a described situation (deterministic rule application) | [ ] |
| AF-4 | Item requires matching a described item to a taxonomy category (classification) | [ ] |
| AF-5 | Difficulty is Easy (score 1) and target label is Analyze/Evaluate | [ ] |
| AF-6 | Only one choice satisfies the governing rule — others are clearly wrong | [ ] |

**If any AF box is checked → STOP. Item cannot be Analyze or Evaluate.**

---

## Section B: Analyze-Specific Criteria (Complete only if target is Analyze)

All items must meet **at least 2 of 4** criteria.

### B1: Decomposition

| Check | Evidence |
|-------|----------|
| [ ] | Multiple data points or scenario elements must be separately considered |
| [ ] | Candidate cannot answer by treating the whole as a single unit |
| [ ] | Sub-components individually assessed before overall answer |

### B2: Cause-Effect Reasoning

| Check | Evidence |
|-------|----------|
| [ ] | Stem describes an outcome, observation, or result |
| [ ] | Question asks for the cause, source, or explanation |
| [ ] | Correct answer identifies a causal relationship |

### B3: Pattern Recognition

| Check | Evidence |
|-------|----------|
| [ ] | At least three data points, time periods, or observations presented |
| [ ] | Candidate must identify a trend or anomaly |
| [ ] | Pattern is not trivially obvious |

### B4: Comparative Analysis

| Check | Evidence |
|-------|----------|
| [ ] | At least two entities, methods, or outcomes compared |
| [ ] | Comparison spans at least two dimensions or criteria |
| [ ] | Correct answer depends on the comparison, not on recall |

**Count of criteria met (B1+B2+B3+B4):** ___

**If ≥ 2 → CERTIFY as Analyze. If < 2 → BLOCK.**

---

## Section C: Evaluate-Specific Criteria (Complete only if target is Evaluate)

All items must meet **ALL 3 core criteria** (E1–E3) PLUS **at least 1 additional** (E4–E6).

### Core Criteria — ALL REQUIRED

#### E1: Decision Maker

| Check | Evidence |
|-------|----------|
| [ ] | Named stakeholder role present (not generic "a company" or "management") |
| [ ] | Stakeholder makes a *decision* or *recommendation* (not calculation or identification) |
| [ ] | Stakeholder's context is specific to the scenario |

**Decision verbs present:** _________________________

#### E2: Competing Alternatives

| Check | Evidence |
|-------|----------|
| [ ] | At least one distractor is defensible for a candidate with a misconception |
| [ ] | No distractor is obviously and trivially wrong |
| [ ] | Correct answer is the *best* option, not the *only* valid option |

**List each distractor and why it's plausible:** ________________________________________________

#### E3: Selection Rationale

| Check | Evidence |
|-------|----------|
| [ ] | Question requires weighing factors to arrive at the answer |
| [ ] | ExplanationCorrect discusses WHY the choice is best |
| [ ] | Rationale references trade-offs, not just rule compliance |

### Additional Criteria — AT LEAST ONE REQUIRED

#### E4: Trade-Off Analysis

| Check | Evidence |
|-------|----------|
| [ ] | At least two competing objectives are present |
| [ ] | Correct answer represents an optimal balance, not single-factor maximization |

**Trade-off dimensions:** _________________________

#### E5: Professional Judgment

| Check | Evidence |
|-------|----------|
| [ ] | No single formula, standard, or rule deterministically identifies the answer |
| [ ] | A knowledgeable professional could reasonably disagree |

#### E6: Criteria Application

| Check | Evidence |
|-------|----------|
| [ ] | Multi-factor evaluative framework referenced or implied |
| [ ] | Candidate must determine which criteria are most important in context |

**E1–E3: ALL passed?** [ ] Yes / [ ] No  
**E4–E6: At least 1 passed?** [ ] Yes / [ ] No  

**If BOTH yes → CERTIFY as Evaluate. If either no → BLOCK.**

---

## Section D: Reviewer Sign-Off

| Field | Value |
|-------|-------|
| QID | |
| Current Label | |
| True Cognitive Level (from A1) | |
| AF Conditions triggered (list) | |
| Criteria met for target level | |
| Verdict | [ ] CERTIFY / [ ] BLOCK / [ ] RECLASSIFY to: ______ |
| Reviewer | |
| Date | |
| Confidence (0–100) | |

---

## Section E: Quick-Reference — Common Misclassification Red Flags

| If you see this in the stem... | The item is probably... | Not... |
|------------------------------|------------------------|--------|
| "Which of the following is/are..." + definition in stem | Remember | Analyze/Evaluate |
| "What is the [term] for [definition]?" | Remember | Analyze/Evaluate |
| "Calculate / Compute the..." | Apply | Analyze/Evaluate |
| "Under [ASC/COSO/IFRS], what is..." | Apply | Analyze/Evaluate |
| "What type of [control/cost] is described?" | Apply | Analyze/Evaluate |
| "Which COSO component does [X] support?" | Apply | Analyze/Evaluate |
| "Company X must recommend..." + single calculation | Apply | Evaluate |
| "Evaluate the appropriate treatment..." + ASC application | Apply | Evaluate |
| [Multi-period data] + "Which trend is most concerning?" | Analyze | — |
| [Variance report] + "What is the primary cause of the variance?" | Analyze | — |
| [Competing strategies] + "Which should the CFO recommend?" | Evaluate | — |
| [Supplier alternatives] + "Considering price, quality, and delivery..." | Evaluate | — |

---

*Generated: 2026-07-31 | Session 95P Implementer Phase — Review Checklist*
