# Explanation Style Guide

**Version:** 1.0  
**Status:** Approved  
**Applies to:** All MCQ and case item explanations in the CMA Part 1 repository  

---

## 1. Purpose

This guide establishes the editorial standard for every explanation in the repository. Every explanation must teach the accounting concept, not merely restate the answer.

---

## 2. Correct Answer Standard

Every correct-answer explanation must contain all of the following:

### 2.1 Why the answer is correct

Explain the accounting reasoning. Do not simply restate the answer choice.

> **Good:** "Net income is adjusted for non-cash items (depreciation) and changes in operating assets and liabilities (increase in AR subtracted, gain on sale removed) to arrive at CFO."
>
> **Poor:** "This is the correct choice."

### 2.2 Accounting principle

Identify the governing concept by name.

Examples: Relevant Costing, Inventory Valuation, Variance Analysis, Internal Controls, Capital Budgeting, Revenue Recognition, Lease Accounting, Consolidation, Cash Flow Classification, Cost Allocation.

> **Good:** "Under ASC 606, revenue is recognized when control of a good or service transfers to the customer."
>
> **Poor:** "According to accounting rules..."

### 2.3 Business interpretation

Explain what the answer means in an actual business context.

> **Good:** "A higher inventory turnover ratio indicates the company is selling inventory more quickly, reducing holding costs and the risk of obsolescence."
>
> **Poor:** "This ratio is higher."

### 2.4 CMA Exam Insight (when appropriate)

Identify common candidate mistakes or exam traps.

> **Good:** "CMA candidates frequently confuse operating cash flow with net income, forgetting to add back non-cash expenses like depreciation."

---

## 3. Distractor Standard

Every incorrect-option explanation must address:

### 3.1 Why the option is wrong

State the specific error directly.

### 3.2 The misconception it represents

Explain what a candidate might be thinking when choosing it.

### 3.3 Why a candidate might reasonably select it

Acknowledge the surface-level plausibility.

### 3.4 Why the correct concept differs

Contrast with the correct reasoning.

> **Good:** "Option A multiplies the full contract value by the percentage complete, but ASC 606 requires recognizing revenue only up to the transaction price allocated to satisfied performance obligations. A candidate might select this by confusing total contract value with the recognizable amount."
>
> **Poor:** "Plausible distractor: this choice misapplies the concept."

---

## 4. Explanation Templates

### 4.1 Calculation Question — Correct Answer

> The correct answer is **[letter]** . **[Brief calculation showing work]** . This is governed by **[accounting principle]** , which requires **[key rule]** . In practice, this means **[business interpretation]** .

### 4.2 Calculation Question — Distractor

> Option **[letter]** incorrectly **[specific error — e.g., "uses Sales instead of COGS," "omits the gain-on-sale adjustment," "applies straight-line instead of double-declining"]** . A candidate might reach this by **[likely mistake]** . The correct approach **[contrast]** .

### 4.3 Conceptual Question — Correct Answer

> The correct answer is **[letter]** because **[reasoning]** . Under **[accounting principle]** , **[rule or standard]** . **[Business interpretation]** .

### 4.4 Conceptual Question — Distractor

> Option **[letter]** suggests **[restate choice]** . This is incorrect because **[specific error]** . The misconception here is that **[what candidate thinks]** , but **[correct concept]** .

### 4.5 Multi-Step / Scenario Question

Follow the same structure but reference the scenario facts explicitly. Use the company name and specific figures from the question.

---

## 5. Language Guidelines

### 5.1 Do use

- Specific accounting terminology (ASC 606, COSO, ROI, throughput margin, etc.)
- Active voice
- Complete sentences
- References to the question's facts (company names, dollar amounts, time periods)

### 5.2 Do NOT use

- "This is the correct choice"
- "Plausible distractor"
- "Common misunderstanding" (without specifying what it is)
- "This answer is correct because it is correct"
- "This choice is wrong"
- Vague praise: "Good answer" / "Nice try"
- Uncertain language: "I think," "probably," "maybe," "could be"
- Empty transition phrases: "In other words," "That is to say"

### 5.3 Tone

Professional, direct, instructional. Write as a tutor explaining to a CMA candidate.

---

## 6. Structural Rules

| Rule | Requirement |
|------|-------------|
| Minimum length | 50 characters per explanation field |
| Per-choice specificity | Each ExplanationWrong* must explain that specific choice |
| Consistency | Same accounting term for same concept across all questions |
| No self-reference | Never say "this answer" or "this choice" — refer to the choice letter or content |
| Independence | Each explanation must be understandable on its own |

---

## 7. Validation

The Explanation Validator enforces:

- **EP1**: Minimum explanation length (50 chars)
- **EP2**: No placeholder phrases ("This is the correct choice", "Plausible distractor")
- **EP3**: No generic patterns ("Common misunderstanding")
- **EP4**: Correct answer must reference the accounting principle
- **EP5**: Distractor explanations must be choice-specific (not identical across all)
- **EP6** (warning): ExplanationCorrect should differ from ExplanationWrong* content

---

## 8. Examples

### Before (placeholder)

```json
"ExplanationWrongA": "This is the correct choice.",
"ExplanationWrongB": "Plausible distractor: this choice misapplies the concept, uses the wrong classification, or ignores an important CMA Part 1 condition.",
```

### After (style-compliant)

```json
"ExplanationWrongA": "Option A records the full liability at face value, but ASC 470 requires measuring short-term debt expected to be refinanced at the amount due. A candidate might think all debt is recorded at face regardless of intent, but refinancing rights affect classification.",
"ExplanationWrongB": "Option B classifies the obligation as noncurrent solely because management expects renewal. Under ASC 470, classification depends on having a qualifying refinancing agreement or settlement right at the reporting date, not on management intent alone.",
```

---

*This guide is the authoritative standard for all explanation content in the CMA Part 1 repository.*
