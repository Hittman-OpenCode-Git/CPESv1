# CMA Part 1 Case Study Gold Standard

**Version:** 1.0
**Status:** Active
**Authority:** Project Constitution
**Source:** Derived from production-quality audit of Pack 1 (`scored_cases.js`)

---

# Purpose

This document defines the mandatory quality standard for every case study in the CMA Part 1 Exam Simulator.

Pack 1 serves as the reference implementation. Every future case study shall meet or exceed the Pack 1 standard.

This document governs:

- Case structure
- Scenario design
- Exhibit design
- Question composition
- Cognitive progression
- Explanation quality
- Distractor quality
- Topic coverage
- Metadata

---

# Case Structure Requirements

Every case study must include the following fields:

| Field | Required | Format |
|-------|----------|--------|
| `CaseID` | Yes | `CBQ{N}-{Section}{N}` (e.g., `CBQ-A1`) |
| `Title` | Yes | Concise, descriptive (e.g., "Revenue, Cash Flow, and Deferred Tax Review") |
| `SectionTags` | Yes | Array of 1–2 section codes (`A`–`F`) |
| `EstimatedMinutes` | Yes | Integer, typically 30 |
| `ScenarioText` | Yes | 2–3 sentences establishing business context |
| `Exhibits` | Yes | Array of 2 table objects |
| `Items` | Yes | Array of 5–6 question objects |

---

# Scenario Design Rules

## Mandatory Elements

1. **Named company** — Every scenario must identify a specific company (e.g., "Northstar Equipment," "Cobalt Foods"). Generic labels ("a company") are prohibited.

2. **Business trigger** — State why the work is needed: year-end closing, budget preparation, SOX walkthrough, audit committee request, process improvement initiative, etc.

3. **Stakeholder reference** — Name the decision-maker or requestor: controller, CFO, audit committee, internal audit, operations team, planning team, etc.

4. **Task statement** — Convey what the candidate must do: evaluate, calculate, recommend, classify, identify, determine, etc.

5. **Length** — 2–3 sentences. Enough context to understand the scenario. No excessive detail.

### Example (Gold Standard)

> *Northstar Equipment is closing its year-end reporting package. The controller must evaluate revenue recognition, operating cash flow, and deferred taxes using the exhibits. Management wants answers that reconcile cash activity to accrual accounting and identify reporting treatments before the audit committee meeting.*

## Prohibited Patterns

- "A company is preparing [generic task]"
- "Analyzing [topic]"
- Vague or context-free scenarios that fail to establish a business reason for the work

---

# Exhibit Design Rules

## Mandatory Elements

1. **Two exhibits per case** — One primary data exhibit, one secondary exhibit (policies, context, or additional data)

2. **Table format** — All exhibits must use `Type: 'table'` with `Headers` array and `Rows` array

3. **Clear headers** — Column headers must be descriptive and unambiguous

4. **3–6 rows** — Sufficient data to support questions without overwhelming

5. **Every row consumed** — All exhibit data must be referenced by at least one question. No extraneous data.

6. **No missing data** — Every value needed to answer a question must appear in an exhibit

### Two-Exhibit Pattern

- **Exhibit 1:** Primary operating data, financial data, or scenario facts
- **Exhibit 2:** Policies, assumptions, thresholds, or context needed to interpret Exhibit 1

### Example (Gold Standard Structure)

```
Exhibit 1 — Customer Contracts (table: Contract, Cash received, Performance status, Other facts)
Exhibit 2 — Other Reporting Data (table: Item, Amount)
```

## Prohibited Patterns

- Single-line text exhibits with no structured data
- Exhibits containing data not referenced by any question
- Exhibits that omit data required by questions (forcing candidates to guess)

---

# Question Composition Rules

## Types per Case

Each case should include 5–6 items with the following distribution:

| Type | Count | Position |
|------|-------|----------|
| `numeric` | 2–3 | First (calculations) |
| `select` | 1–2 | Middle (concept application) |
| `multi` | 1 | Middle (judgment) |
| `fill` | 0–1 | Optional |
| `match` | 1 | Last (synthesis capstone) |

## Mandatory Requirements

- Each item must have a unique `Prompt` specific to the case scenario
- Each item must include a `Topic` tag indicating the specific concept tested
- Each numeric item must include `Correct` as a string containing the numeric value
- Each select/multi/fill/match item must include `Choices` or `LeftItems`/`RightItems`

---

# Cognitive Progression Rules

Every case must follow a four-level progression:

## Level 1 — Recall / Apply (numeric items)
Straightforward calculations using data directly from exhibits. Tests whether the candidate can select and apply the correct formula.

## Level 2 — Analyze (select items)
Choose the correct accounting treatment or interpretation. Tests conceptual understanding.

## Level 3 — Evaluate (multi-select items)
Identify all correct options in a judgment scenario. Tests higher-order thinking and the ability to distinguish correct from plausible-but-incorrect treatments.

## Level 4 — Synthesize (match items)
Map multiple concepts to their correct treatments. Tests integrated understanding of the entire case.

### Progression Diagram

```
numeric × 2–3    →    select × 1–2    →    multi × 1    →    match × 1
(apply)                (analyze)            (evaluate)         (synthesize)
```

---

# Explanation Quality Rules

Every explanation must include three elements:

## 1. Formula with Substitution
Show the formula with actual numbers substituted.

**Example:** `360,000 x 3/12 = 90,000`

## 2. Accounting Principle
State the governing concept or principle.

**Example:** "Cash collected in advance is recognized as revenue only as service is provided."

## 3. Common Trap (optional, one per case)
Warn against the most common mistake.

**Example:** "A common error is to use the wrong beginning materials balance."

## Multi-Select Explanations
Address each choice individually — explain why each correct choice is correct and each incorrect choice is wrong.

---

# Distractor Quality Rules

Every incorrect answer choice must represent a realistic accounting mistake:

| Distractor Type | Example |
|----------------|---------|
| Common calculation error | Using wrong formula, wrong base, wrong timing |
| Conceptual misunderstanding | Confusing accrual vs cash, gross vs contribution margin |
| Incorrect framework application | Confusing COSO components, analytics types |
| Plausible alternative treatment | Classifying an operating lease as finance |
| Arithmetic error | Wrong unit, wrong rounding, wrong sign |

## Prohibited Distractors

- Obviously absurd or humorous choices
- Generic placeholders ("Distractor 1," "Incorrect Application A")
- Choices that are clearly wrong to any informed candidate

---

# Topic Coverage Rules

## Within a Case
- Each case should cover **3–5 related topics** within a single domain
- Topics must be linked by a common business scenario
- Do not mix unrelated domains in a single case (exception: E+F for IT/technology cases)

## Across the Pack
- All 6 domains (A–F) must be represented
- Section A (Financial Reporting) should have 2–3 cases given its breadth
- Each major topic within a domain should appear in at least one case

---

# Metadata Requirements

Every case in the array must include complete metadata:

```
CaseID:       Unique identifier, e.g., 'CBQ-A1'
Title:        Descriptive title
SectionTags:  Array, e.g., ['A'] or ['E','F']
EstimatedMinutes: Integer, typically 30
```

Every item must include:

```
Type:       One of: 'numeric', 'select', 'multi', 'fill', 'match'
Prompt:     Unique, scenario-specific question text
Correct:    Correct answer (string for numeric, string for select, array for multi, string for fill, object for match)
Explanation: Educational explanation
Topic:      Specific concept tag
```

---

# Quality Gates

Every case study must pass the following checks before production:

| Gate | Check |
|------|-------|
| Accounting | All treatments and principles are correct per GAAP/CMA standards |
| Calculation | All numeric answers independently verified |
| Exhibit consistency | All exhibit data is consumed; no missing data |
| Scenario realism | Business scenario is plausible and current |
| Progression | Questions follow the 4-level cognitive progression |
| Distractors | All wrong answers are realistic mistakes |
| Explanations | Formula, principle, and common traps included |
| Psychometric | Difficulty, timing, and topic coverage are appropriate |
| Metadata | All required fields present and correctly formatted |

---

# Pack 1 Reference Cases

The following Pack 1 cases are designated as reference implementations:

| Case | Excellence Area |
|------|-----------------|
| CBQ-B2 | Perfect score — ideal progression, exhibits, distractors, explanations |
| CBQ-C1 | Perfect variance analysis progression |
| CBQ-C2 | Perfect investment center/transfer pricing integration |
| CBQ-E1 | Perfect SOX/internal controls case |
| CBQ-F1 | Perfect data governance/analytics case |
| CBQ-A3 | Perfect multi-topic financial reporting synthesis |

Consult these cases when authoring new case studies in the same domain.

---

# Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-20 | Initial standard derived from Pack 1 production audit |
