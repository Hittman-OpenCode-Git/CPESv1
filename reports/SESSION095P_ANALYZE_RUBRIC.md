# Session 95P — Analyze Certification Rubric

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Reference:** SESSION095P_HO_CERTIFICATION_PLAN.md §4.4

---

## 1. Purpose

This rubric defines the certification gate for the Analyze cognitive level. Before any item can carry `CognitiveLevel: "Analyze"`, it must satisfy all required criteria documented below.

## 2. Analyze Definition

> Candidate breaks material into constituent parts and determines how parts relate to one another and to an overall structure or purpose.

Analyze is the second-highest cognitive level on Bloom's Revised Taxonomy tested by the CMA Part 1 exam. It requires the candidate to decompose, interpret, compare, or attribute — not merely calculate, classify, or recall.

**Key distinction from Apply:** Apply executes procedures. Analyze interprets outputs. Applying a variance formula tells you the number. Analyzing the variance tells you what caused it and whether it matters.

**Key distinction from Evaluate:** Analyze determines what is happening and why. Evaluate decides what to do about it.

## 3. Required Criteria — At Least Two Must Be Met

### Criterion A1: Decomposition

**Rule:** The item requires breaking down data, a situation, or a report into constituent components.

**Evidence required:**
- [ ] Multiple data points, line items, or scenario elements must be separately considered
- [ ] The candidate cannot answer correctly by treating the whole as a single unit
- [ ] Sub-components must be individually assessed before the overall answer is reached

**Verbs that satisfy A1:**
- break down, separate, disaggregate, decompose, isolate, parse

**Exemplar:** "The controller reviews the Q2 variance report. After isolating price, quantity, and mix effects, which component is the primary driver of the $48,000 U total variance?" — Candidate must decompose the total variance into components.

**Counterexample:** "Compute the fixed overhead volume variance." — Candidate applies one formula to two numbers. No decomposition required.

---

### Criterion A2: Cause-Effect Reasoning

**Rule:** The item requires identifying WHY something happened, not just THAT it happened.

**Evidence required:**
- [ ] The stem describes an outcome, observation, or result
- [ ] The question asks for the cause, source, explanation, or driver
- [ ] The correct answer identifies a causal relationship, not a definition or formula result

**Verbs that satisfy A2:**
- explain, attribute, diagnose, identify the cause, determine the source, why

**Exemplar:** P1-ED-013 — Decomposes IT-dependent manual control to identify WHY transaction splitting circumvents a single-attribute threshold — cause-effect analysis.

**Counterexample:** "What is the fixed overhead volume variance?" → "$48K unfavorable." The candidate reports the number. No cause-effect.

---

### Criterion A3: Pattern Recognition

**Rule:** The item requires detecting a trend, anomaly, or relationship across multiple data points or time periods.

**Evidence required:**
- [ ] At least three data points, time periods, or observations are presented
- [ ] The candidate must identify a pattern (not just pick the highest/lowest/only value)
- [ ] The pattern is not trivially obvious (e.g., all numbers are ascending)

**Verbs that satisfy A3:**
- identify the trend, recognize the pattern, detect the anomaly, compare across periods

**Exemplar:** P1-B-022 — "Evaluates 5-batch deviation trend to distinguish progressive deterioration from random fluctuation in learning curve" — genuine pattern recognition across multiple observations.

**Counterexample:** "Which month had the highest sales?" → One-step comparison of provided values. Not a pattern.

---

### Criterion A4: Comparative Analysis

**Rule:** The item requires contrasting multiple entities, methods, or outcomes on multiple dimensions.

**Evidence required:**
- [ ] At least two entities, methods, standards, or scenarios must be compared
- [ ] The comparison spans at least two dimensions or criteria
- [ ] The correct answer depends on the comparison, not on recalling a fact about a single entity

**Verbs that satisfy A4:**
- compare, contrast, differentiate, distinguish, which differs

**Exemplar:** P1B-F-108 — "Classifies SOC 2 findings against trust services criteria, evaluates which combination affects audit reliance" — multi-factor comparative analytical evaluation.

**Counterexample:** "Which COSO principle covers risk assessment?" → Recall of framework structure. Not comparative.

---

## 4. Automatic Failure Conditions

If ANY of these conditions are met, the item CANNOT carry Analyze classification.

### AF-A1: Definition Match

**Condition:** Stem → CorrectChoice lexical overlap exceeds 40%.

**Detection:** Jaccard similarity or word-level overlap between stem text and correct answer choice text.

**True classification:** Remember (or Understand at most).

**Example:** P1-CD-061 — "Expressing line items as a percentage of revenue is known as:" → "Common-size vertical analysis."

**Example:** P1-DD-036 — "Ongoing cost reduction targets for existing products with gradual improvement is known as:" → "Kaizen costing."

---

### AF-A2: Formula Substitution

**Condition:** Item requires plugging provided numbers into a known formula with one computational step. No interpretation of the result required.

**Detection:** Stem contains "calculate," "compute," "find" + answer is a numeric value + explanation traces a single formula without interpretive discussion.

**True classification:** Apply.

**Example:** P1-A-039 — "Compute straight-line depreciation: ($124,800 − $12,000) / 7 = $16,114."

**Example:** P1-CC-061 — "Fixed overhead volume variance = Budgeted FOH − Applied FOH = $48,000 U."

---

### AF-A3: Procedure Execution

**Condition:** Item requires following a known multi-step procedure where the steps are formulaic and the answer requires no interpretation of intermediate or final results.

**Detection:** Multi-step calculation where each step is a standard formula and the final answer is a number with no "why" or "what does this mean" component.

**True classification:** Apply.

**Example:** P1B-C-108 — "Fixed overhead volume variance = Budgeted FOH minus Applied FOH." Standard variance formula execution. No interpretation of what caused the variance.

---

### AF-A4: Taxonomy Classification

**Condition:** Item requires matching a described activity, cost, control, or concept to its category in a known taxonomy or framework.

**Detection:** "Which [category/type/component] does [described item] belong to?" or "What type of [X] is [described activity]?"

**True classification:** Apply (or Remember if the description is a textbook definition).

**Example:** P1-ED-046 — "Ethics training and code of conduct acknowledgment supports which COSO component?" → Control Environment.

---

### AF-A5: Difficulty Mismatch

**Condition:** `DifficultyScore ≤ 1` (Easy) combined with Analyze label. (Note: unlike Evaluate which cannot be Easy at all, Analyze at Moderate-Easy is possible for simple comparative analysis — but Easy is excluded.)

**Detection:** DifficultyScore == 1 AND CognitiveLevel = Analyze.

**True classification:** Reclassify difficulty upward, or more likely the item is Apply.

---

### AF-A6: Single-Step Interpretation

**Condition:** Item asks "what does this result mean" but the meaning is a textbook definition or formula interpretation that requires no decomposition.

**Detection:** Stem provides a single number or result + asks for interpretation + answer is a standard interpretation formula.

**True classification:** Understand.

**Example:** "A company's current ratio is 1.2. What does this indicate?" → "The company has $1.20 in current assets for every $1.00 in current liabilities." Standard ratio interpretation, not analysis.

---

## 5. Analyze Certification Decision Matrix

| A1 (Decomp) | A2 (Cause-Effect) | A3 (Pattern) | A4 (Compare) | Criteria Met | AF Conditions (any) | Verdict |
|-------------|-------------------|-------------|-------------|-------------|---------------------|---------|
| — | — | — | — | ≥2 PASS | 0 triggered | **CERTIFY as Analyze** |
| — | — | — | — | 0–1 PASS | 0 triggered | **BLOCK — needs at least 2 criteria** |
| — | — | — | — | — | ≥1 triggered | **RECLASSIFY — see AF table for true level** |

## 6. Scoring Rubric (for Quality Assessment, Not Gate Threshold)

For items that PASS the gate, score 0–10 on each Analyze dimension:

| Dimension | 0–3 (Poor) | 4–6 (Fair) | 7–8 (Good) | 9–10 (Excellent) |
|-----------|------------|------------|------------|-------------------|
| Decomposition (A1) | No sub-components identified | Basic split of obvious parts | Meaningful decomposition with data boundaries | Each component traces to a specific exhibit value |
| Cause-Effect (A2) | Correlation assumed to be causation | States a cause but doesn't link to evidence | Cause-effect chain traced to specific data | Multiple competing causes evaluated; best identified |
| Pattern (A3) | "The numbers went up" | One-dimensional trend identified | Multi-period pattern with anomaly detection | Quantitative trend analysis with threshold reasoning |
| Comparison (A4) | Items listed side by side | One dimension compared | Multiple dimensions systematically compared | Framework-based comparison with evaluative criteria |

## 7. Section-Level Known Accuracy (from S93P)

| Section | Pack | Analyze Accuracy | Assessment |
|---------|------|-----------------|------------|
| Section EC | Pack C | 60% | COSO diagnosis — genuine cause-effect |
| Section BD | Pack D | 60% | Budget variance/trend — appropriate Analyze |
| Section ED | Pack D | 55% | COSO violation analysis — solid root cause |
| Section CD | Pack D | 0% | Cost management definitions as Analyze |
| Section DD | Pack D | 0% | Cost methods as Analyze |
| Section A | Pack A | 0% | ASC rule application as Analyze |

---

*Generated: 2026-07-31 | Session 95P Implementer Phase — Analyze Rubric*
