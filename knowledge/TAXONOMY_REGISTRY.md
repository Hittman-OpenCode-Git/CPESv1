# CMA Part 1 Exam Simulator — Taxonomy Registry

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Dependencies:** EXAM_BLUEPRINT.md, QUESTION_METADATA_STANDARD.md

---

# Purpose

This document is the single source of truth for every permitted enumeration value in the CMA Part 1 Exam Simulator repository.

All validators, reports, scripts, and future adaptive-learning features shall reference this registry rather than maintaining duplicate hardcoded lists.

---

# 1. CognitiveLevel (Bloom's Updated Taxonomy)

| Value | Description |
|-------|-------------|
| Remember | Recall facts, terms, definitions |
| Understand | Explain concepts, interpret meaning |
| Apply | Execute calculations, apply procedures |
| Analyze | Break down information, identify patterns |
| Evaluate | Make judgments, assess alternatives |

**Source:** QUESTION_METADATA_STANDARD.md, Bloom's Revised Taxonomy
**Used in:** `item.CognitiveLevel`
**Current coverage:** 400/400 items (100%)
**Not used:** Remember (0/400 items)

---

# 2. CalculationComplexity

| Value | Description |
|-------|-------------|
| None | No calculation required |
| Simple | Single-step arithmetic |
| Moderate | Multi-step with 2–3 operations |
| Complex | Extended multi-step with judgment |

**Source:** Sprint 5.6D metadata standard
**Used in:** `item.CalculationComplexity`
**Current coverage:** 400/400 items (100%)

---

# 3. ReadingComplexity

| Value | Description |
|-------|-------------|
| Short | <100 words prompt |
| Moderate | 100–200 words prompt |
| Long | >200 words prompt |

**Source:** Sprint 5.6D metadata standard
**Used in:** `item.ReadingComplexity`
**Current coverage:** 400/400 items (100%)
**Not used:** Long (0/400 items)

---

# 4. DecisionComplexity

| Value | Description |
|-------|-------------|
| Low | Direct application of one rule |
| Medium | Requires comparison of 2–3 options |
| High | Requires judgment across multiple dimensions |

**Source:** Sprint 5.6D metadata standard
**Used in:** `item.DecisionComplexity`
**Current coverage:** 400/400 items (100%)

---

# 5. DifficultyDrivers

| Value | Description |
|-------|-------------|
| MultiStepCalculation | Requires chained calculations |
| FinancialStatementAnalysis | Requires interpreting financial statements |
| JudgmentRequired | Requires professional judgment |
| Terminology | Tests knowledge of specialized terms |
| TimePressure | Requires efficient time management |
| MultipleConcepts | Integrates 2+ distinct concepts |
| DistractorSimilarity | Answer choices are deliberately similar |

**Source:** Sprint 5.6D metadata standard
**Used in:** `item.DifficultyDrivers` (array, 0–2 values per item)
**Current coverage:** 400/400 items (100%)
**Not used:** TimePressure (0/400 items)

---

# 6. Difficulty

| Value | Numeric Score |
|-------|--------------|
| Easy | 1 |
| Moderate-Easy | 2 |
| Moderate | 3 |
| Difficult | 4 |
| Very Difficult | 5 |

**Source:** EXAM_BLUEPRINT.md, QUESTION_METADATA_STANDARD.md
**Used in:** `case.Difficulty`, `item.Difficulty`, `case.DifficultyScore`, `item.DifficultyScore`

---

# 7. BlueprintDomain

| Section | Domain Name |
|---------|-------------|
| A | External Financial Reporting Decisions |
| B | Planning, Budgeting, and Forecasting |
| C | Performance Management |
| D | Cost Management |
| E | Internal Controls |
| F | Technology and Analytics |

**Source:** EXAM_BLUEPRINT.md
**Used in:** `case.BlueprintDomain`, `case.SectionTags`

---

# 8. BlueprintDomain Topics (from EXAM_BLUEPRINT.md)

## A — External Financial Reporting Decisions
- Financial Statements
- Revenue Recognition
- Inventory Valuation
- Long-Lived Assets
- Intangible Assets
- Liabilities
- Equity
- Statement of Cash Flows
- Financial Ratios
- Financial Statement Analysis

## B — Planning, Budgeting, and Forecasting
- Strategic Planning
- Budget Development
- Master Budget
- Operating Budget
- Financial Budget
- Sales Forecasting
- Production Budget
- Direct Materials Budget
- Direct Labor Budget
- Manufacturing Overhead Budget
- Cash Budget
- Flexible Budgets
- Forecast Revision

## C — Performance Management
- Standard Costing
- Cost Variances
- Responsibility Accounting
- Balanced Scorecard
- Key Performance Indicators
- Productivity Measures
- Benchmarking
- Transfer Pricing
- Performance Evaluation

## D — Cost Management
- Cost Behavior
- Cost Estimation
- Job Order Costing
- Process Costing
- Activity-Based Costing
- Joint Products
- Service Department Allocation
- Cost Allocation
- Cost Drivers
- Contribution Margin
- Cost-Volume-Profit Analysis
- Relevant Costs
- Differential Analysis
- Pricing Decisions

## E — Internal Controls
- Corporate Governance
- Internal Control Objectives
- COSO Internal Control Framework
- COSO Enterprise Risk Management
- Risk Assessment
- Control Activities
- Information and Communication
- Monitoring
- Fraud Prevention
- Fraud Detection
- Segregation of Duties
- Ethics

## F — Technology and Analytics
- Information Systems
- ERP Systems
- Data Governance
- Data Quality
- Cybersecurity
- Data Analytics
- Business Intelligence
- Artificial Intelligence
- Automation
- Emerging Technologies

---

# 9. Competencies (PrimaryCompetency)

| Value | Description |
|-------|-------------|
| Calculation | Numeric computation and formula application |
| Conceptual | Theoretical understanding and definitions |
| Analysis | Data interpretation and pattern recognition |
| Judgment | Professional decision-making and evaluation |

**Source:** QUESTION_METADATA_STANDARD.md
**Used in:** `case.PrimaryCompetency`, `item.PrimaryCompetency`
**Current coverage:** 75/400 items (18.8%)

---

# 10. SecondaryCompetencies

Same allowed values as PrimaryCompetency: Calculation, Conceptual, Analysis, Judgment

---

# 11. Question Types

| Value | Description |
|-------|-------------|
| numeric | Enter a numeric answer |
| select | Single best answer (A–D) |
| multi | Multiple correct answers |
| fill | Fill-in-the-blank text entry |
| match | Match left/right items |

**Source:** QUESTION_METADATA_STANDARD.md

---

# 12. ProductionStatus

| Value | Description |
|-------|-------------|
| Draft | Initial creation, not reviewed |
| Review | Under accounting review |
| QA | Under quality assurance review |
| Production | Approved and published |
| Retired | Removed from active use |

**Source:** QUESTION_METADATA_STANDARD.md

---

# 13. Exhibit Types

| Value | Description |
|-------|-------------|
| table | Tabular data with headers and rows |
| text | Paragraph content |
| chart | Graphical data visualization |
| dashboard | Multi-metric operational dashboard |
| financial-statement | Formal financial statement |
| contract | Legal agreement excerpt |
| policy | Company policy document |
| email | Business email communication |
| erp-report | ERP system output report |

**Source:** QUESTION_METADATA_STANDARD.md

---

# 14. FormulaReference

All values must reference a heading in `foundation/FORMULA_MASTER.md`.

Canonical formula names (34 entries):
- Contribution Margin
- Break-even Point (Units)
- Break-even Sales Dollars
- Target Operating Income
- Margin of Safety
- Degree of Operating Leverage
- Sales Budget
- Production Budget
- Direct Materials Purchases
- Direct Labor Budget
- Cash Collections
- Cash Budget
- Material Price Variance
- Material Quantity Variance
- Labor Rate Variance
- Labor Efficiency Variance
- Variable Overhead Spending Variance
- Variable Overhead Efficiency Variance
- Fixed Overhead Budget Variance
- Fixed Overhead Volume Variance
- Inventory Turnover
- Days Inventory Outstanding
- Accounts Receivable Turnover
- Days Sales Outstanding
- Return on Investment
- Residual Income
- Economic Order Quantity
- Net Present Value
- Internal Rate of Return
- Payback Period
- Expected Value
- Regression Equation
- Correlation Coefficient
- Standard Deviation
- Coefficient of Variation

---

# 15. DecisionTreeReference

All values must reference a heading in `review/ACCOUNTING_DECISION_TREES.md`.

Canonical decision tree names:
- Cost Classification
- Product Cost vs Period Cost
- Cost Behavior
- Relevant Costing
- Contribution Margin vs Gross Margin
- Budget Sequence
- Variance Analysis
- Material Price Variance
- Material Quantity Variance
- Labor Rate Variance
- Labor Efficiency Variance
- Flexible Budget
- Responsibility Centers
- Transfer Pricing
- Capital Budgeting
- Expected Value
- Regression
- Internal Controls (COSO)
- COSO ERM
- Fraud
- Financial Statement Ratios
- Technology & Analytics

---

# 16. AccountingPrinciple

Free-text field describing the governing accounting principle. No controlled vocabulary; validation checks for non-empty and reasonable length (>20 chars).

---

# 17. CommonTrapReference

All values must reference a trap entry in `knowledge/05_COMMON_EXAM_TRAPS.md` using format `Trap {N}: {Name}`.

---

# 18. SectionTags

| Value | Maps To |
|-------|---------|
| A | External Financial Reporting Decisions |
| B | Planning, Budgeting, and Forecasting |
| C | Performance Management |
| D | Cost Management |
| E | Internal Controls |
| F | Technology and Analytics |

Cross-domain combinations: `["E","F"]` or `["F","E"]` only.

---

# Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-21 | Initial taxonomy registry — Sprint 5.6E |
