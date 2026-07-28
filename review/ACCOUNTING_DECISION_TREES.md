# CMA Part 1 Accounting Decision Trees

**Version:** 1.0
**Status:** Active

---

# Purpose

This document provides structured decision logic for solving CMA Part 1 questions.

Unlike the Formula Master, this document focuses on **how to determine the correct accounting approach before performing any calculations**.

When reviewing or generating questions, AI should consult these decision trees before selecting formulas or evaluating answer choices.

---

# General Question-Solving Framework

Every calculation or conceptual question should follow this sequence:

1. Identify the primary topic.
2. Determine the accounting principle being tested.
3. Select the appropriate decision tree.
4. Follow the tree to identify the correct method.
5. Perform calculations (if required).
6. Validate the result using `02_FORMULA_MASTER.md`.
7. Compare against the available answer choices.

Never select a formula before identifying the governing principle.

---

# Cost Classification

## Which costs are relevant?

```
Does the decision affect future cash flows?

        │
      Yes
        │
        ▼
Has the cost already been incurred?

        │
   Yes ─┴─ No
    │         │
Ignore     Continue
(Sunk)      ▼

Will the cost change because of the decision?

        │
   Yes ─┴─ No
    │         │
Relevant  Ignore
```

### Rules

Future costs may be relevant.

Past costs are never relevant.

Allocated fixed costs are usually not relevant unless they change.

Opportunity costs are always relevant when alternatives exist.

---

# Product Cost vs Period Cost

```
Is the cost attached to manufacturing?

        │
      Yes
        │
        ▼
Direct Material?

Direct Labor?

Manufacturing Overhead?

        │
      Yes
        │
Product Cost

Otherwise

↓

Period Cost
```

---

# Cost Behavior

```
Does total cost change with activity?

        │
      Yes
        │
Variable Cost

No

↓

Fixed Cost

Mixed?

↓

Separate fixed and variable portions.
```

---

# Relevant Costing

```
Future decision?

↓

Yes

↓

Will this cost differ between alternatives?

↓

Yes

↓

Relevant

↓

No

↓

Ignore
```

Always ignore:

* sunk costs
* unavoidable fixed costs

Always include:

* opportunity costs
* incremental costs
* avoidable costs

---

# Contribution Margin vs Gross Margin

```
Are manufacturing fixed costs included?

        │
      Yes
        │
Gross Margin

        │
      No
        │
Contribution Margin
```

Never substitute one for the other.

---

# Budget Sequence

```
Sales Budget

↓

Production Budget

↓

Direct Materials

↓

Direct Labor

↓

Manufacturing Overhead

↓

Ending Inventory

↓

Cost of Goods Sold

↓

Selling/Admin

↓

Cash Budget

↓

Budgeted Financial Statements
```

If the sequence is violated, review the question.

---

# Variance Analysis

## Material Price Variance

```
Does Actual Quantity appear twice?

        │
      Yes
        │
Price Variance
```

Always uses:

Actual Quantity

---

## Material Quantity Variance

```
Does Standard Price appear twice?

        │
      Yes
        │
Quantity Variance
```

Always uses:

Standard Price

---

## Labor Rate Variance

```
Actual Hours

×

Actual Rate

vs

Actual Hours

×

Standard Rate
```

---

## Labor Efficiency Variance

```
Standard Rate

×

Actual Hours

vs

Standard Rate

×

Standard Hours
```

---

# Flexible Budget

```
Compare Actual

to

Flexible Budget

NOT

Static Budget
```

Static budget comparisons frequently create incorrect conclusions.

---

# Responsibility Centers

```
Can the manager control revenue?

↓

Yes

Can they control costs?

↓

Yes

↓

Profit Center

↓

Can they control invested assets?

↓

Yes

↓

Investment Center
```

---

# Transfer Pricing

```
Idle Capacity?

↓

Yes

↓

Minimum Price = Variable Cost

↓

No

↓

Variable Cost

+

Opportunity Cost
```

---

# Capital Budgeting

```
Time value of money required?

↓

Yes

↓

NPV

IRR

↓

No

↓

Payback

Accounting Rate of Return
```

---

# Expected Value

```
Multiple possible outcomes?

↓

Yes

↓

Probability × Outcome

↓

Sum all outcomes
```

Probabilities must total 100%.

---

# Regression

```
Need prediction?

↓

Yes

↓

Regression

Need relationship strength?

↓

Correlation
```

Remember:

Correlation does not establish causation.

---

# Internal Controls (COSO)

```
Question about:

Ethics?

↓

Control Environment

Risk Identification?

↓

Risk Assessment

Policies?

↓

Control Activities

Information Flow?

↓

Information & Communication

Monitoring?

↓

Monitoring Activities
```

---

# COSO ERM

```
Question focuses on:

Strategy?

↓

Governance & Culture

Setting Objectives?

↓

Strategy & Objective Setting

Executing Strategy?

↓

Performance

Reviewing Results?

↓

Review & Revision

Reporting?

↓

Information, Communication & Reporting
```

---

# Fraud

```
Opportunity?

Pressure?

Rationalization?

↓

Fraud Triangle
```

If one element is missing, evaluate whether the scenario supports a different fraud-risk framework.

---

# Financial Statement Ratios

```
Liquidity?

↓

Current Ratio

Quick Ratio

Cash Ratio

Efficiency?

↓

Inventory Turnover

Receivable Turnover

Profitability?

↓

ROA

ROI

ROE

Leverage?

↓

Debt Ratio

Debt-to-Equity

Interest Coverage
```

Always identify the business question before selecting the ratio.

---

# Technology & Analytics

```
Need descriptive summary?

↓

Descriptive Analytics

Need explanation?

↓

Diagnostic Analytics

Need forecast?

↓

Predictive Analytics

Need recommended action?

↓

Prescriptive Analytics
```

---

# AI Validation Rules

Before approving an answer, verify:

✓ Correct accounting principle selected

✓ Correct decision tree followed

✓ Correct formula selected

✓ Formula validated against Formula Master

✓ Answer consistent with governing concept

✓ Distractors represent realistic accounting mistakes

Never approve an answer solely because the arithmetic matches. The accounting method must also be correct.

---

# Guiding Principle

Selecting the correct accounting method is more important than performing the arithmetic correctly.

An incorrect method with perfect arithmetic is still an incorrect answer.
