# Session 54 — Cognitive Progression Review

**Date:** 2026-07-28  
**Author:** Session 54 Analysis Engine  
**Framework:** CERTIFICATION_RUBRICS.md §2.2 D6 — Integration Readiness  

---

## Executive Summary

Of the 75 CBQ case studies analyzed, **49** (65%) have items that do not follow the required Apply → Analyze → Evaluate cognitive progression (D6 Score 3 vs. minimum 4 for certification).

### Root Cause

The progression violations are a **template artifact** — items were authored with fixed positions (Q1, Q2, Q3, Q4, Q5, Q6) rather than arranged by cognitive level. The template assigned Bloom levels mechanically (e.g., Q1=Apply, Q2=Apply, Q3=Analyze, Q4=Evaluate, Q5=Understand, Q6=Analyze) without verifying the actual cognitive demand of each position. The result: many cases have higher-level items (Analyze, Evaluate) appearing before lower-level items (Apply, Understand).

### Fix Complexity: LOW

Solution: **Re-order the Items array** so cognitive levels are non-decreasing. This is a purely structural fix — no content changes, no explanation rewriting, no answer-key modifications. Each case requires: sort items by cognitive level, with same-level items keeping their original relative order. Estimated effort: ~3-5 minutes per case.

---

## Per-Case Progression Report

| # | CaseID | Title | Items | Bloom Sequence | Declines | All Same? | D6 | Fix |
|---|--------|-------|-------|----------------|----------|-----------|----|-----|
| 1 | CBQ2-A2 | Inventory Valuation and LCM | 5 | Analyze > Apply > Apply > Analyze > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 2 | CBQ5-C1 | Direct Materials Mix and Yield Variances | 5 | Apply > Apply > Apply > Analyze > Evaluate | 0 | No | **5** | OK |
| 3 | CBQ2-A3 | Revenue Recognition and Receivables Valuation | 5 | Apply > Apply > Evaluate > Analyze > Understand ❌ | 2 | No | **3** | Reorder needed |
| 4 | CBQ5-A2 | Comprehensive Income and Stockholders' Equity | 5 | Apply > Evaluate > Apply > Analyze > Understand ❌ | 2 | No | **3** | Reorder needed |
| 5 | CBQ-A2 | Consolidation, Impairment, OCI, and Disclosure Package | 6 | Apply > Apply > Apply > Analyze > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 6 | CBQ-C2 | Investment Center Performance and Transfer Pricing | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 7 | CBQ-C3 | Balanced Scorecard and Operating Performance Review | 6 | Apply > Apply > Analyze > Evaluate > Analyze > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 8 | CBQ3-A1 | Lease Accounting and Classification | 5 | Apply > Analyze > Understand > Apply > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 9 | CBQ3-C2 | Transfer Pricing | 5 | Evaluate > Analyze > Analyze > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 10 | CBQ3-C3 | Flexible Budget Variances | 5 | Apply > Apply > Analyze > Analyze > Evaluate | 0 | No | **5** | OK |
| 11 | CBQ3-E2 | Business Continuity and Disaster Recovery | 5 | Evaluate > Analyze > Analyze > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 12 | CBQ3-F2 | Data Visualization | 5 | Analyze > Analyze > Evaluate > Analyze > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 13 | CBQ4-A1 | Intangible Assets and Goodwill Impairment | 5 | Apply > Apply > Analyze > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 14 | CBQ4-A2 | Contingencies and Warranty Liabilities | 5 | Apply > Apply > Apply > Analyze > Understand ❌ | 1 | No | **4** | Reorder needed |
| 15 | CBQ4-C1 | Standard Costing: 3-Way and 4-Way Overhead Variances | 5 | Apply > Apply > Apply > Apply > Analyze | 0 | No | **5** | OK |
| 16 | CBQ4-D3 | Capacity Management Concepts | 5 | Evaluate > Apply > Analyze > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 17 | CBQ4-E2 | Application IT Controls | 5 | Analyze > Analyze > Analyze > Analyze > Evaluate | 0 | No | **5** | OK |
| 18 | CBQ4-E3 | Foreign Corrupt Practices Act (FCPA) | 5 | Analyze > Evaluate > Evaluate > Evaluate > Evaluate | 0 | No | **5** | OK |
| 19 | CBQ4-F1 | Cloud Computing Models | 5 | Analyze > Analyze > Analyze > Analyze > Evaluate | 0 | No | **5** | OK |
| 20 | CBQ5-B2 | Bonds Payable and Effective Interest Amortization | 5 | Apply > Apply > Apply > Apply > Analyze | 0 | No | **5** | OK |
| 21 | CBQ5-E3 | Data Privacy Frameworks | 5 | Apply > Apply > Remember > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 22 | CBQ-E1 | Accounts Payable Controls and SOX Evaluation | 6 | Analyze > Evaluate > Apply > Understand > Analyze > Analyze ❌ | 2 | No | **3** | Reorder needed |
| 23 | CBQ-E2 | IT General Controls, Change Management, and Access Review | 6 | Evaluate > Apply > Evaluate > Understand > Analyze > Analyze ❌ | 2 | No | **3** | Reorder needed |
| 24 | CBQ-F1 | Data Governance and Warranty Analytics Dashboard | 6 | Apply > Evaluate > Evaluate > Analyze > Understand > Apply ❌ | 2 | No | **3** | Reorder needed |
| 25 | CBQ2-B1 | Production and Direct Materials Budgeting | 5 | Apply > Apply > Apply > Apply > Analyze | 0 | No | **5** | OK |
| 26 | CBQ3-A2 | Cash Flow - Indirect Method | 5 | Apply > Apply > Apply > Analyze > Analyze | 0 | No | **5** | OK |
| 27 | CBQ3-B1 | Cash Collections Budgeting | 5 | Apply > Apply > Evaluate > Evaluate > Understand ❌ | 1 | No | **4** | Reorder needed |
| 28 | CBQ4-B1 | Cost Estimation and High-Low Method | 5 | Apply > Apply > Apply > Analyze > Evaluate | 0 | No | **5** | OK |
| 29 | CBQ5-B1 | Strategic Management and Forecasting | 5 | Apply > Analyze > Analyze > Evaluate > Understand ❌ | 1 | No | **4** | Reorder needed |
| 30 | CBQ2-C2 | Standard Cost Variance Computation | 5 | Apply > Apply > Apply > Apply > Apply | 0 | Yes | **3** | Needs level variation |
| 31 | CBQ3-C1 | Balanced Scorecard Metrics | 5 | Analyze > Analyze > Analyze > Analyze > Analyze | 0 | Yes | **3** | Needs level variation |
| 32 | CBQ3-D3 | Cost Allocation (Step-Down) | 5 | Evaluate > Analyze > Evaluate > Analyze > Evaluate ❌ | 2 | No | **3** | Reorder needed |
| 33 | CBQ4-E1 | COSO Internal Control Framework | 5 | Evaluate > Analyze > Evaluate > Analyze > Evaluate ❌ | 2 | No | **3** | Reorder needed |
| 34 | CBQ5-C2 | Responsibility Centers and ROI | 5 | Analyze > Apply > Analyze > Evaluate > Analyze ❌ | 2 | No | **3** | Reorder needed |
| 35 | CBQ5-D3 | Transfer Pricing (Dual Pricing) | 5 | Apply > Evaluate > Analyze > Understand > Evaluate ❌ | 2 | No | **3** | Reorder needed |
| 36 | CBQ5-E1 | Internal Auditing Standards | 5 | Understand > Apply > Understand > Apply > Understand ❌ | 2 | No | **3** | Reorder needed |
| 37 | CBQ-A1 | Revenue Recognition, Cash Flow, and Deferred Tax Review | 6 | Apply > Apply > Analyze > Apply > Apply > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 38 | CBQ-B1 | Integrated Sales, Production, Materials, and Cash Budget | 6 | Apply > Apply > Apply > Apply > Apply > Evaluate | 0 | No | **5** | OK |
| 39 | CBQ-B2 | Rolling Forecast and Regression Update | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 40 | CBQ-C1 | Flexible Budget and Variance Investigation | 6 | Apply > Apply > Apply > Evaluate > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 41 | CBQ-D1 | ABC, Quality Costs, and Process Improvement | 6 | Apply > Apply > Evaluate > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 42 | CBQ-D2 | Process Costing, Lean Waste, and Bottleneck Analysis | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 43 | CBQ-A3 | Inventory, ARO, Subsequent Events, and Cash Classification | 6 | Apply > Apply > Analyze > Analyze > Apply > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 44 | CBQ-B3 | Scenario Forecast, Expected Value, and Working Capital Plan | 6 | Apply > Apply > Apply > Apply > Analyze > Evaluate | 0 | No | **5** | OK |
| 45 | CBQ-F2 | Cybersecurity, RPA, and Finance Automation Governance | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 46 | CBQ2-B2 | Cash Budgeting and Forecasting | 6 | Apply > Apply > Apply > Apply > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 47 | CBQ2-B3 | Sales Revenue Forecasting and Collection Analysis | 6 | Apply > Apply > Apply > Evaluate > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 48 | CBQ2-D2 | Joint Cost Allocation & Sell-or-Process-Further Decisions | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 49 | CBQ3-B2 | Direct Labor and Manufacturing Overhead Budget | 6 | Apply > Apply > Apply > Analyze > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 50 | CBQ3-B3 | Comprehensive Profit Planning Using CVP Analysis | 6 | Apply > Apply > Apply > Analyze > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 51 | CBQ3-D1 | Absorption vs Variable Costing Income Reconciliation | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 52 | CBQ3-D2 | Job Order Costing & Overhead Application | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 53 | CBQ4-D1 | Theory of Constraints & Throughput Contribution Analysis | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 54 | CBQ4-D2 | Just-In-Time Manufacturing & Lean Waste Reduction | 6 | Apply > Apply > Analyze > Evaluate > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 55 | CBQ4-B2 | Budgeted Balance Sheet and Financial Budget | 6 | Apply > Apply > Apply > Apply > Analyze > Analyze | 0 | No | **5** | OK |
| 56 | CBQ2-C1 | Flexible Budget and Sales Variance Analysis | 5 | Analyze > Evaluate > Analyze > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 57 | CBQ2-C3 | Investment Center Performance Evaluation | 5 | Apply > Apply > Analyze > Evaluate > Evaluate | 0 | No | **5** | OK |
| 58 | CBQ2-D1 | Activity-Based Costing Implementation Analysis | 5 | Evaluate > Evaluate > Evaluate > Evaluate > Apply ❌ | 1 | No | **4** | Reorder needed |
| 59 | CBQ2-D3 | Process Costing — Equivalent Units and Cost Allocation | 5 | Apply > Apply > Apply > Apply > Analyze | 0 | No | **5** | OK |
| 60 | CBQ2-E1 | IT General Controls Assessment | 5 | Analyze > Evaluate > Analyze > Analyze > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 61 | CBQ2-E2 | Segregation of Duties and Internal Control Design | 5 | Evaluate > Analyze > Analyze > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 62 | CBQ2-F1 | Data Analytics Maturity | 5 | Analyze > Analyze > Analyze > Evaluate > Evaluate | 0 | No | **5** | OK |
| 63 | CBQ2-F2 | Data Governance and Lifecycle Management | 5 | Analyze > Analyze > Understand > Understand > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 64 | CBQ3-E1 | COSO Enterprise Risk Management | 5 | Analyze > Analyze > Evaluate > Evaluate > Analyze ❌ | 1 | No | **4** | Reorder needed |
| 65 | CBQ3-F1 | System Development Life Cycle (SDLC) | 5 | Understand > Understand > Understand > Analyze > Analyze | 0 | No | **5** | OK |
| 66 | CBQ4-C2 | Customer Profitability Analysis | 5 | Analyze > Analyze > Analyze > Evaluate > Evaluate | 0 | No | **5** | OK |
| 67 | CBQ4-F2 | Artificial Intelligence & ML | 5 | Understand > Apply > Analyze > Evaluate > Apply ❌ | 1 | No | **4** | Reorder needed |
| 68 | CBQ4-F3 | Data Privacy & Cryptography | 5 | Understand > Understand > Understand > Apply > Apply | 0 | No | **5** | OK |
| 69 | CBQ5-D1 | Value Chain and Business Process Improvement | 5 | Analyze > Analyze > Analyze > Analyze > Evaluate | 0 | No | **5** | OK |
| 70 | CBQ5-D2 | Six Sigma and Quality Control | 5 | Analyze > Analyze > Apply > Analyze > Evaluate ❌ | 1 | No | **4** | Reorder needed |
| 71 | CBQ5-E2 | Cybersecurity and Malware | 5 | Understand > Apply > Apply > Evaluate > Evaluate | 0 | No | **5** | OK |
| 72 | CBQ5-F1 | Big Data Characteristics | 5 | Understand > Apply > Apply > Evaluate > Evaluate | 0 | No | **5** | OK |
| 73 | CBQ5-F2 | Robotic Process Automation (RPA) | 5 | Understand > Apply > Apply > Evaluate > Evaluate | 0 | No | **5** | OK |
| 74 | CBQ5-F3 | Blockchain and Distributed Ledgers | 5 | Understand > Apply > Apply > Evaluate > Evaluate | 0 | No | **5** | OK |
| 75 | CBQ5-C3 | Sales Quantity and Volume Variances | 5 | Apply > Analyze > Apply > Evaluate > Evaluate ❌ | 1 | No | **4** | Reorder needed |

---

## High-Priority Progression Fixes (Top 10)

These cases have the most cognitive progression issues and are among the highest-impact remediation targets:

### CBQ2-A2 — Inventory Valuation and LCM

- **Current sequence:** Analyze > Apply > Apply > Analyze > Evaluate
- **Violations (1):**
    - CBQ2-A2-Q1 (Analyze) → CBQ2-A2-Q2 (Apply)
- **Recommended reorder:** 2:CBQ2-A2-Q2(Apply) > 3:CBQ2-A2-Q3(Apply) > 1:CBQ2-A2-Q1(Analyze) > 4:CBQ2-A2-Q4(Analyze) > 5:CBQ2-A2-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ2-A3 — Revenue Recognition and Receivables Valuation

- **Current sequence:** Apply > Apply > Evaluate > Analyze > Understand
- **Violations (2):**
    - CBQ2-A3-Q3 (Evaluate) → CBQ2-A3-Q4 (Analyze)
    - CBQ2-A3-Q4 (Analyze) → CBQ2-A3-Q5 (Understand)
- **Recommended reorder:** 5:CBQ2-A3-Q5(Understand) > 1:CBQ2-A3-Q1(Apply) > 2:CBQ2-A3-Q2(Apply) > 4:CBQ2-A3-Q4(Analyze) > 3:CBQ2-A3-Q3(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ5-A2 — Comprehensive Income and Stockholders' Equity

- **Current sequence:** Apply > Evaluate > Apply > Analyze > Understand
- **Violations (2):**
    - CBQ5-A2-Q2 (Evaluate) → CBQ5-A2-Q3 (Apply)
    - CBQ5-A2-Q4 (Analyze) → CBQ5-A2-Q5 (Understand)
- **Recommended reorder:** 5:CBQ5-A2-Q5(Understand) > 1:CBQ5-A2-Q1(Apply) > 3:CBQ5-A2-Q3(Apply) > 4:CBQ5-A2-Q4(Analyze) > 2:CBQ5-A2-Q2(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ-A2 — Consolidation, Impairment, OCI, and Disclosure Package

- **Current sequence:** Apply > Apply > Apply > Analyze > Evaluate > Analyze
- **Violations (1):**
    - CBQ-A2-Q5 (Evaluate) → CBQ-A2-Q6 (Analyze)
- **Recommended reorder:** 1:CBQ-A2-Q1(Apply) > 2:CBQ-A2-Q2(Apply) > 3:CBQ-A2-Q3(Apply) > 4:CBQ-A2-Q4(Analyze) > 6:CBQ-A2-Q6(Analyze) > 5:CBQ-A2-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ-C2 — Investment Center Performance and Transfer Pricing

- **Current sequence:** Apply > Apply > Analyze > Evaluate > Understand > Analyze
- **Violations (1):**
    - CBQ-C2-Q4 (Evaluate) → CBQ-C2-Q5 (Understand)
- **Recommended reorder:** 5:CBQ-C2-Q5(Understand) > 1:CBQ-C2-Q1(Apply) > 2:CBQ-C2-Q2(Apply) > 3:CBQ-C2-Q3(Analyze) > 6:CBQ-C2-Q6(Analyze) > 4:CBQ-C2-Q4(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ-C3 — Balanced Scorecard and Operating Performance Review

- **Current sequence:** Apply > Apply > Analyze > Evaluate > Analyze > Analyze
- **Violations (1):**
    - CBQ-C3-Q4 (Evaluate) → CBQ-C3-Q5 (Analyze)
- **Recommended reorder:** 1:CBQ-C3-Q1(Apply) > 2:CBQ-C3-Q2(Apply) > 3:CBQ-C3-Q3(Analyze) > 5:CBQ-C3-Q5(Analyze) > 6:CBQ-C3-Q6(Analyze) > 4:CBQ-C3-Q4(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ3-A1 — Lease Accounting and Classification

- **Current sequence:** Apply > Analyze > Understand > Apply > Evaluate
- **Violations (1):**
    - CBQ3-A1-Q2 (Analyze) → CBQ3-A1-Q3 (Understand)
- **Recommended reorder:** 3:CBQ3-A1-Q3(Understand) > 1:CBQ3-A1-Q1(Apply) > 4:CBQ3-A1-Q4(Apply) > 2:CBQ3-A1-Q2(Analyze) > 5:CBQ3-A1-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ3-C2 — Transfer Pricing

- **Current sequence:** Evaluate > Analyze > Analyze > Evaluate > Evaluate
- **Violations (1):**
    - CBQ3-C2-Q1 (Evaluate) → CBQ3-C2-Q2 (Analyze)
- **Recommended reorder:** 2:CBQ3-C2-Q2(Analyze) > 3:CBQ3-C2-Q3(Analyze) > 1:CBQ3-C2-Q1(Evaluate) > 4:CBQ3-C2-Q4(Evaluate) > 5:CBQ3-C2-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ3-E2 — Business Continuity and Disaster Recovery

- **Current sequence:** Evaluate > Analyze > Analyze > Evaluate > Evaluate
- **Violations (1):**
    - CBQ3-E2-Q1 (Evaluate) → CBQ3-E2-Q2 (Analyze)
- **Recommended reorder:** 2:CBQ3-E2-Q2(Analyze) > 3:CBQ3-E2-Q3(Analyze) > 1:CBQ3-E2-Q1(Evaluate) > 4:CBQ3-E2-Q4(Evaluate) > 5:CBQ3-E2-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

### CBQ3-F2 — Data Visualization

- **Current sequence:** Analyze > Analyze > Evaluate > Analyze > Evaluate
- **Violations (1):**
    - CBQ3-F2-Q3 (Evaluate) → CBQ3-F2-Q4 (Analyze)
- **Recommended reorder:** 1:CBQ3-F2-Q1(Analyze) > 2:CBQ3-F2-Q2(Analyze) > 4:CBQ3-F2-Q4(Analyze) > 3:CBQ3-F2-Q3(Evaluate) > 5:CBQ3-F2-Q5(Evaluate)
- **After fix:** D6 = 4 ✓

---

## D6 Certification Impact

| Metric | Count |
|--------|-------|
| Cases with D6 < 4 (blocking) | 12 |
| Cases that become certifiable from D6 fix alone | 10 |
| Cases with 3+ declines (most complex reorder) | 0 |
| Cases with all items at same level (needs level variation, not reorder) | 0 |
