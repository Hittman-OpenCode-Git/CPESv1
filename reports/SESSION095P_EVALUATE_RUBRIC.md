# Session 95P — Evaluate Certification Rubric

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Reference:** SESSION095P_HO_CERTIFICATION_PLAN.md §4.5

---

## 1. Purpose

This rubric defines the certification gate for the Evaluate cognitive level. Before any item can carry `CognitiveLevel: "Evaluate"`, it must satisfy all required criteria documented below. This rubric is designed for use by build-time AI verification, human certification reviewers, and future modernization campaign authors.

**Authority:** This rubric interprets and extends CAQS v1.0 §6.2. It does not modify the CAQS.

## 2. Evaluate Definition

> Candidate makes judgments based on criteria and standards.

Evaluate is the highest cognitive level on Bloom's Revised Taxonomy tested by the CMA Part 1 exam. It requires the candidate to assess, judge, recommend, or decide — not merely calculate, classify, or identify.

## 3. Required Criteria — ALL Must Be Met

### Criterion E1: Decision Maker

**Rule:** The question must present a specific stakeholder role that must make a judgment call.

**Evidence required:**
- [ ] A named stakeholder is present (e.g., "CFO Maria Chen," "Controller," "Operations Manager James Park")
- [ ] The stakeholder must make a *decision* or *recommendation* — not perform a calculation or identify a term
- [ ] The stakeholder's context is specific to the scenario (not generic "a company" or "management")

**Verbs that satisfy E1:**
- recommend, decide, select the best, choose between, prioritize, advise, determine the optimal

**Verbs that FAIL E1:**
- calculate, compute, identify, classify, determine (when deterministic), what is, which of the following

**Exemplar:** "CFO Maria Chen must recommend which of four sourcing strategies to adopt for the next fiscal year." (P1-B-085)

**Counterexample:** "Determine the appropriate accounting treatment for the lawsuit." (P1-A-012) — This is deterministic ASC application, not a judgment call between competing alternatives.

---

### Criterion E2: Competing Alternatives

**Rule:** At least two of the answer choices must be defensible for a candidate who misunderstands the situation. The correct answer is not the *only* choice that satisfies a known rule.

**Evidence required:**
- [ ] A reasonable professional could construct an argument for at least one distractor
- [ ] No distractor is obviously and trivially wrong (e.g., "Ignore all GAAP" or "$0")
- [ ] The correct answer requires selecting the *best* option among alternatives, not the *only* option that passes a rule-based test

**What FAILS E2:**
- All distractors are clearly wrong under a known standard (deterministic)
- The correct answer is the only choice consistent with any authoritative framework
- Distractors contain absurd values (negative costs, impossible results)

**Exemplar:** Four supplier alternatives: (A) lowest price, poor quality, (B) highest quality, most expensive, (C) moderate price, moderate quality, reliable delivery, (D) moderate price, highest quality, inconsistent delivery. Each has genuine trade-offs.

**Counterexample:** Four choices for inventory valuation where only one complies with ASC 330. The candidate must know ASC 330 — that's Apply, not Evaluate.

---

### Criterion E3: Selection Rationale

**Rule:** The candidate must articulate or select the reason why one alternative is preferred — not just identify which choice matches a rule.

**Evidence required:**
- [ ] The question requires weighing factors to arrive at the answer
- [ ] The correct answer explanation discusses WHY the choice is best, not just THAT it is correct
- [ ] The rationale references trade-offs, not merely rule compliance

**What FAILS E3:**
- Answer is simply the term that matches a definition
- Answer is simply the number that results from a formula
- ExplanationCorrect only states a rule and applies it with no judgment discussion

---

### Additional Criteria — At Least One Required

### Criterion E4: Trade-Off Analysis

**Rule:** Multiple competing objectives exist and the candidate must weigh them.

**Examples of trade-offs:**
- Cost vs. quality (sourcing, make-or-buy)
- Risk vs. return (investment, hedging)
- Short-term vs. long-term (budgeting, product mix)
- Control effectiveness vs. cost (COSO, internal controls)
- Accuracy vs. timeliness (reporting, forecasting)

**Evidence required:**
- [ ] At least two incompletely-aligned objectives are explicitly stated or implied
- [ ] The correct answer represents an optimal balance, not the maximization of a single factor

---

### Criterion E5: Professional Judgment

**Rule:** The correct answer requires judgment beyond known formula/rule application.

**Evidence required:**
- [ ] No single formula, standard, or rule deterministically identifies the correct answer
- [ ] A knowledgeable professional could reasonably disagree with the correct answer (the answer is defensible but not obviously mandatory)
- [ ] The answer requires weighing factors that are not mathematically comparable (qualitative and quantitative factors)

**Exemplar:** P1-BD-005 — "Design a variance investigation policy." Four competing designs with trade-offs in sensitivity (catching more variances), cost (investigation expense), and anti-gaming (preventing manipulation). No formula tells you which design is best.

**Counterexample:** P1-F-069 (WAIT — this IS genuine Evaluate. Actually, this EXEMPLAR: "Allocating real-time streaming investment across three business domains" — requires judgment about business priorities, not formula application.)

---

### Criterion E6: Criteria Application

**Rule:** The candidate must apply a multi-factor evaluative framework where the relative weight of factors must be determined or interpreted.

**Evidence required:**
- [ ] The item references or implies a framework with multiple criteria
- [ ] The candidate must determine which criteria are most important in the given context
- [ ] The weighting is not mechanically provided in the stem

**Exemplar:** P1-B-030 — Supplier selection across price, quality, delivery, and payment terms. The relative importance of each factor must be inferred from the business context.

---

## 4. Automatic Failure Conditions

If ANY of these conditions are met, the item CANNOT carry Evaluate classification (regardless of E1–E6 compliance).

### AF-E1: Definition Match

**Condition:** Stem → CorrectChoice lexical overlap exceeds 40%.

**Detection:** Jaccard similarity or word-level overlap between stem text and correct answer choice text.

**True classification:** Remember (or Understand at most).

**Example:** P1-EC-005 — Stem defines segregation of duties; answer is "segregation of duties."

---

### AF-E2: Formula Substitution

**Condition:** Item requires plugging provided numbers into a known formula with one computational step.

**Detection:** Stem contains calculation prompt ("calculate," "compute," "find") + answer is a numeric value + explanation traces a single formula.

**True classification:** Apply.

**Example:** P1B-C-143 — "EVA = NOPAT − (12% × invested capital) = $32K."

---

### AF-E3: Deterministic Rule Application

**Condition:** A single known standard, rule, or framework deterministically identifies exactly one correct answer. No reasonable professional could choose a distractor based on alternative interpretation of the standard.

**Detection:** ExplanationCorrect references a single ASC section, COSO principle, or IMA standard that uniquely determines the answer.

**True classification:** Apply.

**Example:** P1-A-012 — ASC 450's probable-and-reasonably-estimable framework deterministically determines the accrual.

---

### AF-E4: Classification / Taxonomy Matching

**Condition:** Item requires matching a described activity, control, cost, or concept to its category label in a known taxonomy.

**Detection:** "What type of [control/cost/system] is described?" or "Which COSO component does [activity] support?"

**True classification:** Apply (or Remember if the description is a textbook definition).

**Example:** P1-EC-020 — "A locked warehouse with badge access is what type of control?" → "Preventive physical control."

---

### AF-E5: Difficulty Mismatch

**Condition:** `DifficultyScore ≤ 2` (Easy or Moderate-Easy) combined with Evaluate label.

**Detection:** DifficultyScore ∈ {1, 2} AND CognitiveLevel = Evaluate.

**True classification:** At minimum, the difficulty should be upgraded; more likely the item is Apply at Moderate difficulty.

**Rationale:** Evaluation inherently requires Moderate+ cognitive demand. An item at Easy difficulty cannot require judgment, trade-off analysis, or professional decision-making.

---

### AF-E6: Single-Correct Answer Under Known Rule

**Condition:** Only one answer choice is consistent with the governing standard or framework. The other three choices are unambiguously wrong under any defensible interpretation.

**Detection:** Evaluate whether a reasonable person with domain knowledge could defend any distractor. If no → AF-E6 triggered.

**True classification:** Apply (or Analyze if multi-step rule application is required).

---

## 5. Evaluate Certification Decision Matrix

| E1 (Decision Maker) | E2 (Competing Alternatives) | E3 (Selection Rationale) | E4/E5/E6 (≥1) | AF Conditions (any) | Verdict |
|---------------------|----------------------------|------------------------|---------------|---------------------|---------|
| PASS | PASS | PASS | ≥1 PASS | 0 triggered | **CERTIFY as Evaluate** |
| PASS | PASS | PASS | 0 PASS | 0 triggered | **BLOCK — needs additional criterion** |
| FAIL any | — | — | — | — | **BLOCK — missing required criterion** |
| — | — | — | — | ≥1 triggered | **RECLASSIFY — see AF table for true level** |

## 6. Scoring Rubric (for Quality Assessment, Not Gate Threshold)

For items that PASS the gate, score 0–10 on each Evaluate dimension for quality assessment only:

| Dimension | 0–3 (Poor) | 4–6 (Fair) | 7–8 (Good) | 9–10 (Excellent) |
|-----------|------------|------------|------------|-------------------|
| Decision Context (E1) | Generic "company" with "management" | Named role but no scenario | Specific stakeholder with business context | Authentic decision-maker with quantified stakes |
| Alternative Quality (E2) | One obviously right, three obviously wrong | Two plausible, one clearly wrong | All four have defensible reasoning paths | Each alternative reflects a distinct judgment approach |
| Rationale Depth (E3) | "Because the rule says so" | Rule + one trade-off factor | Multi-factor reasoning with context | Full decision framework with criteria weighting |
| Trade-off Richness (E4/E5/E6) | Single objective, no conflict | Two factors, one dominates | Multiple competing objectives | Genuine tension — no single factor deterministically wins |

## 7. Section-Level Known Accuracy (from S93P)

| Section | Pack | Evaluate Accuracy | Assessment |
|---------|------|-------------------|------------|
| Section F | Pack A | 100% | Gold standard — technology governance |
| Section B | Pack A | 83% | Strong — budgeting strategy items |
| Section B | Pack D | 71% | Strong — extensively authored scenarios |
| Section ED | Pack D | 78% | Strong — COSO judgment items |
| Section A | Pack A | 25% | Weak — ASC rules as judgment |
| Section EC | Pack C | 0% | Failed — COSO definitions as Evaluate |
| Sections C | Pack A | Mixed | Inconclusive — small sample |

---

*Generated: 2026-07-31 | Session 95P Implementer Phase — Evaluate Rubric*
