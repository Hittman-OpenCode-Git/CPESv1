# Section Audit Protocol

**Version:** 1.0
**Authority:** CAQS v1.0
**Applies to:** All domain-by-domain psychometric audits (Sections A–F)

---

## 1. Purpose

This protocol establishes a repeatable, publisher-grade QA process for reviewing every question in a blueprint domain. Each domain audit produces a standardized quality report, ensures consistent scoring across reviewers, and feeds findings back into the Master Question Registry and Misconception Library.

---

## 2. Audit Workflow

### 2.1 Preparation

1. Load all questions for the target domain from MasterQuestionRegistry.csv
2. Group by blueprint objective (Learning Outcome Statement)
3. Ensure the Misconception Library is loaded for cross-referencing
4. Prepare the Revision Metrics Tracker

### 2.2 Per-Question Review Steps

For every question, execute these steps in order:

```
Step 1: Read the question stem and answer choices only
  → Do NOT look at the stored correct answer yet
  → Record the question's intended competency ("Why This Question Exists")
  
Step 2: Solve independently
  → For calculations: solve without looking at the stored answer
  → For conceptual: determine the correct answer from first principles
  → Record your answer before checking

Step 3: Verify the stored answer
  → Compare your answer to the stored CorrectChoice
  → If different: investigate and determine which is correct
  → Document any discrepancy

Step 4: Score against CAQS v1.0 rubric
  → Score all 10 dimensions (0–10 each)
  → Calculate weighted total (0–100)
  → Assign Bloom's level if missing
  → Assign difficulty if missing

Step 5: Evaluate explanations
  → Does ExplanationCorrect include: principle, solution steps, business context?
  → Are distractor explanations specific to each choice?
  → Is there a common exam trap mentioned?
  → Does any explanation use placeholder/generic text?

Step 6: Evaluate distractor quality
  → Is each distractor plausible for a candidate with a specific misconception?
  → Are any distractors obviously wrong?
  → Does each distractor test a different misconception?
  → Tag each distractor with a Misconception ID

Step 7: Evaluate business realism
  → Is the scenario realistic for a management accountant?
  → Does it use business language or textbook phrasing?
  → Would a controller recognize this situation?

Step 8: Assign recommendations
  → Keep: Score ≥ 90, no critical issues, minor improvements only
  → Revise: Score 70–89, targeted improvements needed
  → Rewrite: Score < 70, fundamental issues with accuracy, clarity, or design

Step 9: Record revision metrics
  → If revising: document original score, target score, revision type
  → If rewriting: document original score, reason, new score target

Step 10: Update the Master Question Registry
  → Record all scores, classifications, misconception tags, and recommendations
```

### 2.3 Bloom's Level Assignment Guide

| Level | Question Pattern | Example Prompts |
|-------|-----------------|-----------------|
| **Remember** | Direct recall of definitions, terms, or standards | "Which of the following is a current asset?" |
| **Understand** | Explain concepts, interpret meaning | "Which statement best describes comprehensive income?" |
| **Apply** | Execute calculations, apply procedures | "Calculate the deferred tax liability using the following data" |
| **Analyze** | Break down information, identify patterns | "Which trend is most concerning in the financial statements?" |
| **Evaluate** | Make judgments, recommend actions | "Which accounting treatment should management select?" |

### 2.4 Difficulty Assignment Guide

| Score | Label | Characteristics |
|-------|-------|-----------------|
| 1 | Easy | Direct recall, single concept, obvious distractors |
| 2 | Moderate-Easy | Simple application, one calculation step |
| 3 | Moderate | Multi-step calculation, requires concept discrimination |
| 4 | Difficult | Judgment required, multiple concepts integrated |
| 5 | Very Difficult | Professional judgment, ambiguous facts, competing standards |

### 2.5 "Why This Question Exists" Standard

Every question must answer:

> **What specific competency is this item intended to measure?**

Write this as a single sentence starting with a verb:
- "Can distinguish OCI from Net Income"
- "Applies the lower of cost or NRV rule correctly"
- "Determines the proper classification of debt with refinancing rights"
- "Calculates diluted EPS including the impact of convertible securities"

If the competency cannot be stated in one sentence, the question lacks focus and should be Revised or Rewritten.

---

## 3. Revision Types

| Type | Code | Definition | Example |
|------|------|------------|---------|
| Editorial | E | Wording, grammar, formatting | Fixing a typo, clarifying ambiguous phrasing |
| Technical | T | Accounting accuracy, standard reference | Correcting a GAAP treatment error |
| Psychometric | P | Difficulty, Bloom's, distractor quality | Rebalancing distractor plausibility |
| Numerical | N | Calculation verification | Fixing arithmetic errors, correcting rounding |
| Instructional | I | Explanation quality, learning science | Adding an exam trap, expanding a distractor explanation |
| Metadata | M | Adding fields, taxonomy alignment | Adding CognitiveLevel, BlueprintObjectives |

---

## 4. Audit Output

Every domain audit produces:

1. **Updated MasterQuestionRegistry.csv** — with scores, tags, recommendations
2. **Section X Quality Report** — before/after metrics, distributions, findings
3. **Misconception Library additions** — new misconceptions discovered during review
4. **Revision Metrics Tracker** — quantified improvements per question

---

## 5. Quality Gates (Domain-Level)

A domain is complete when:

- [ ] 100% of questions have a "Why This Question Exists" statement
- [ ] 100% have Bloom's level assigned
- [ ] 100% have difficulty assigned
- [ ] 100% have misconception tags (at least one per question)
- [ ] 100% of explanations comply with CAQS §4 minimum standards
- [ ] 100% of calculations independently verified
- [ ] ≥90/100 mean CAQS score for the domain
- [ ] Zero technical accounting errors
- [ ] Zero ambiguous answer keys
- [ ] All Kept/Revised/Rewritten decisions documented
- [ ] Before/after comparison metrics produced

---

## 6. Audit Cadence

| Activity | Frequency | Duration Estimate |
|----------|-----------|-------------------|
| Full domain audit | Once per domain per phase | 3–5 sessions per domain |
| Spot-check re-audit | Quarterly or on significant revision | 1 session per affected domain |
| Full repository re-audit | Annually or on blueprint update | 10–15 sessions |

---

*This protocol implements CAQS v1.0. All reviewers shall follow this protocol for every domain audit.*
