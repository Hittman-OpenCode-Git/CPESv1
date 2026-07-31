# SESSION084_PLANNER.md

**Session:** 84 — Matching Item Distractor Quality Wave 5
**Generated:** 2026-07-30T17:35:00.000Z
**Governance Lane:** Full
**Phase:** Planner

---

## 1. Lane Determination

| Trigger | Present? |
|---------|----------|
| Session edits case pack file? | YES — RightItems arrays expanded |
| Session edits answer keys? | NO — Correct objects unchanged |
| Session edits question_state? | NO |
| Session edits certification status? | NO |
| Session edits CURRENT_BASELINES.md? | YES — post-remediation hash update |
| Session edits REVISION_HISTORY.md? | YES |

**Verdict:** Full Governance Lane.

---

## 2. Objective

Add 1-2 plausible, topically-relevant extra distractors to all matching items where `RightItems.length === LeftItems.length`, eliminating process-of-elimination cueing. Zero content changes to LeftItems, Correct mappings, or scoring behavior.

---

## 3. Current State Verification (T0 Extraction)

**Method:** Function constructor parse of all 3 case pack files. Results:

| ItemID | Case | Pack | Left | Right | Section | Topic |
|--------|------|------|------|-------|---------|-------|
| CBQ-A2-Q6 | CBQ-A2 | Pack 1 | 4 | 4 | A | Consolidation/Impairment/OCI |
| CBQ-A3-Q6 | CBQ-A3 | Pack 1 | 4 | 4 | A | Inventory/ARO/Cash Classification |
| CBQ-B2-Q6 | CBQ-B2 | Pack 1 | 4 | 4 | B | Forecast Metrics Interpretation |
| CBQ-C1-Q6 | CBQ-C1 | Pack 1 | 4 | 4 | C | Variance Responsibility |
| CBQ-C2-Q6 | CBQ-C2 | Pack 1 | 4 | 4 | C | Investment Center / Transfer Pricing |
| CBQ-C3-Q5 | CBQ-C3 | Pack 1 | 4 | 4 | C | Balanced Scorecard Perspectives |
| CBQ-D1-Q6 | CBQ-D1 | Pack 1 | 4 | 4 | D | Quality Cost Categories |
| CBQ-D2-Q6 | CBQ-D2 | Pack 1 | 4 | 4 | D | Process Costing / Lean Tools |
| CBQ2-D2-Q6 | CBQ2-D2 | Pack 1 | 4 | 4 | D | Joint Cost Allocation Methods |
| CBQ-E2-Q5 | CBQ-E2 | Pack 1 | 4 | 4 | E | IT Control Risks |
| CBQ-F1-Q4 | CBQ-F1 | Pack 1 | 4 | 4 | F | Analytics Types |
| CBQ-F2-Q6 | CBQ-F2 | Pack 1 | 4 | 4 | F | Control Response Matching |
| CBQ2-B2-Q6 | CBQ2-B2 | Pack 2 | 4 | 4 | B | Forecast Risk Responses |
| CBQ3-D2-Q6 | CBQ3-D2 | Pack 2 | 4 | 4 | D | Job Order Costing Terms |
| CBQ4-D1-Q6 | CBQ4-D1 | Pack 2 | 4 | 4 | D | TOC Measures |
| CBQ4-D2-Q6 | CBQ4-D2 | Pack 2 | 4 | 4 | D | Lean Manufacturing Concepts |

**Total:** 16 items requiring distractor expansion. 4 previously Class D items (CBQ-E1-Q5, CBQ3-A2-Q5, CBQ3-D1-Q6, CBQ4-F2-Q2) already have extra distractors — excluded.

---

## 4. Proposed Distractor Additions (by Item)

### Section A — External Financial Reporting

**CBQ-A2-Q6** (Consolidation, Impairment, OCI, Translation)
- Current R: [Eliminate in consolidation, Recognize loss when CA exceeds FV..., Report in OCI..., Report in OCI as CTA]
- Add: "Recognize as current-period expense in the income statement" (plausible wrong — candidates confuse impairment loss with other write-downs)
- Add: "Defer and amortize over the asset's remaining useful life" (plausible wrong — candidates confuse asset impairment with deferred costs)

**CBQ-A3-Q6** (Inventory NRV, ARO, Cash Equivalents, Equipment)
- Current R: [Write down inventory, Record liability and add to asset cost, Classify as cash equivalent, Classify as investing cash outflow]
- Add: "Classify as operating cash outflow" (plausible wrong — candidates misclassify equipment purchase as operating)
- Add: "Recognize as a prior-period adjustment" (plausible wrong — candidates confuse inventory write-down with error correction)

### Section B — Planning, Budgeting, and Forecasting

**CBQ-B2-Q6** (Bookings, Backlog, Lead Time, R-squared)
- Current R: [Potential demand, subject to cancellation, Committed demand not yet shipped, Supply-chain constraint signal, Model explanatory power]
- Add: "Actual sales revenue recognized in the current period" (plausible wrong — candidates confuse bookings with recognized revenue)
- Add: "Measure of forecast accuracy relative to a random guess" (plausible wrong — candidate confuses R-squared with other regression metrics)

**CBQ2-B2-Q6** (Forecast Risk / Cash Budget Response)
- Current R: [Negotiate extended payment terms..., Increase reliance on line of credit..., Defer purchase to February..., Increase collections and COGS projections...]
- Add: "Liquidate long-term investments to cover the shortfall" (plausible wrong — a candidate might suggest permanent capital action for a temporary cash shortfall)
- Add: "Issue new shares of common stock to raise additional cash" (plausible wrong — equity issuance is disproportionate to a one-month deficit)

### Section C — Performance Management

**CBQ-C1-Q6** (Variance Investigation Responsibility)
- Current R: [Purchasing, Production, HR or staffing, Production supervision]
- Add: "Cost accounting department" (plausible wrong — candidates often confuse cost accountants who report variances with managers who control them)
- Add: "Quality control" (plausible wrong — candidate conflates quality-related material issues with quality department responsibility)

**CBQ-C2-Q6** (ROI, Residual Income, Transfer Pricing, Market Price)
- Current R: [Operating income / assets, Income after required asset charge, Variable cost + opportunity cost, External benchmark when available]
- Add: "Full cost plus an arbitrary markup" (plausible wrong — candidates confuse negotiated vs. cost-based transfer price methods)
- Add: "Operating income divided by invested capital" (plausible wrong — candidates confuse ROI formula elements: income/assets vs. income/invested capital)

**CBQ-C3-Q5** (Balanced Scorecard Perspectives)
- Current R: [Operating income, On-time delivery, Defect rate, Training hours per employee]
- Add: "Return on investment (ROI)" (plausible wrong — ROI is a financial metric that overlaps with Operating Income conceptually; candidate may match Financial→ROI instead of Financial→Operating Income)
- Add: "Employee turnover rate" (plausible wrong — plausibly a Learning & Growth metric; candidate confuses turnover with training)

### Section D — Cost Management

**CBQ-D1-Q6** (Quality Cost Categories)
- Current R: [Prevention, Appraisal, Internal failure, External failure]
- Add: "Detection" (plausible wrong — candidates confuse the COQ category "Appraisal" with "Detection" which is used in other control frameworks)
- Add: "Correction" (plausible wrong — candidates confuse cost-of-quality categories with corrective controls)

**CBQ-D2-Q6** (Process Costing / Lean Tools)
- Current R: [Equivalent units, Bottleneck analysis, Lean waste review, Process costing]
- Add: "Activity-based costing" (plausible wrong — candidate confuses ABC, which handles non-homogeneous products, with process costing for homogeneous output)
- Add: "Throughput accounting" (plausible wrong — candidate confuses throughput from TOC with process costing concepts)

**CBQ2-D2-Q6** (Joint Cost Allocation Methods)
- Current R: [NRV: Final sales value minus..., Physical-units: Volume of output, Sales-value-at-split-off: Market value..., Constant gross-margin NRV...]
- Add: "By-product reversal method — allocate joint costs using net realizable value of by-products" (plausible wrong — candidate confuses by-product accounting with joint cost allocation)
- Add: "Weighted-average method — average cost across all products regardless of volume" (plausible wrong — candidate conflates process-costing weighted-average with joint cost methods)

**CBQ3-D2-Q6** (Job Order Costing / Overhead Terms)
- Current R: [Estimated OH / estimated activity, Uses estimated rate to apply OH, Activity base causing OH costs, Applied OH exceeds actual OH]
- Add: "Actual OH divided by actual activity base" (plausible wrong — candidate confuses actual vs. predetermined overhead rate calculation)
- Add: "Applied OH divided by estimated activity" (plausible wrong — candidate reverses numerator and denominator)

**CBQ4-D1-Q6** (Theory of Constraints Measures)
- Current R: [Sales price minus DM, All costs except DM, Materials purchased not yet sold, Resource limiting overall output]
- Add: "Contribution margin per unit" (plausible wrong — candidate confuses throughput with traditional contribution margin; throughput = S - DM, CM = S - VC)
- Add: "Net operating income" (plausible wrong — candidate confuses throughput with NOI; NOI = throughput - operating expense)

**CBQ4-D2-Q6** (Lean Manufacturing Concepts)
- Current R: [Arranges machines in sequence..., Visual signal authorizing production, Continuous incremental improvement, Production pace matching customer demand]
- Add: "Just-in-time (JIT) — a philosophy of producing only what is needed, when needed" (plausible wrong — JIT is a broader philosophy, not a specific named tool like kanban/kaizen/takt)
- Add: "Value stream mapping — documents the flow of materials and information" (plausible wrong — VSM is a lean tool that could plausibly match with any of the four prompts; candidate confuses which tool does what)

### Section E — Internal Controls

**CBQ-E2-Q5** (IT Control Exception → Risk)
- Current R: [Lack of accountability, Unauthorized access, Unauthorized/erroneous report logic, Incomplete/inaccurate data transfer]
- Add: "Segregation of duties violation" (plausible wrong — shared admin IDs may suggest SoD violation to candidates, but the correct match is "Lack of accountability")
- Add: "Data privacy breach" (plausible wrong — plausible risk for terminated users still active, but the correct match for that is "Unauthorized access")

### Section F — Technology and Analytics

**CBQ-F1-Q4** (Analytics Types — Descriptive/Diagnostic/Predictive/Prescriptive)
- Current R: [Descriptive, Diagnostic, Predictive, Prescriptive]
- Add: "Exploratory — discovering patterns without a specific hypothesis" (plausible wrong — Exploratory is a real analytics category candidate may confuse with Diagnostic)
- Add: "Inferential — drawing conclusions from sample data using statistical tests" (plausible wrong — Inferential is a real statistical concept candidate may confuse with Predictive)

**CBQ-F2-Q6** (Control Response to Tech Findings)
- Current R: [Unique credentials and access logging, Change management, Master-data governance, Model monitoring]
- Add: "Encryption at rest and in transit" (plausible wrong — a common control response for bot accounts that candidates may select over "Unique credentials")
- Add: "Periodic access recertification" (plausible wrong — plausible control response that candidates confuse with "Master-data governance" for duplicate vendor IDs)

---

## 5. Execution Batches

| Batch | Items | Pack(s) | Count | Governance Cap |
|-------|-------|---------|-------|----------------|
| 5A | Pack 1 items (Sections A-F) | case_pack_1 | 12 | ≤28 PASS |
| 5B | Pack 2 items (Sections B, D) | case_pack_2 | 4 | ≤28 PASS |

---

## 6. Batch Cap Compliance

| Batch | Items | Cap | Compliant |
|-------|-------|-----|-----------|
| 5A | 12 | ≤28 | YES |
| 5B | 4 | ≤28 | YES |

---

## 7. Before/After State

| Metric | Before | After |
|--------|--------|-------|
| Class D items (NO_EXTRA) | 16 | 0 |
| RightItems arrays modified | 0 | 16 |
| Distractors added | 0 | ~30 (2 per item) |
| Correct objects modified | 0 | 0 |
| LeftItems modified | 0 | 0 |
| Scoring behavior | unchanged | unchanged |
| Certification counts | 2,451 | 2,451 |
| Case pack QID counts | unchanged | unchanged |

---

## 8. Stop Conditions

- Halt if any preflight divergence
- Halt if governance guard shows any FAIL
- Halt if any Correct object differs from backup
- Halt if any file fails to parse after write
- Halt if any new distractor duplicates an existing RightItem
- Halt if any new distractor creates an ambiguous correct mapping

---

## 9. Success Criteria

- 16/16 items receive 1-2 unique, plausible extra distractors
- 0 Correct object changes
- 0 LeftItems changes
- All 3 case pack files parse cleanly
- All distractors unique within each item's RightItems array
- No new psychometric defects (Class A, B, C regressions)
- Preflight: 0 divergences
- Governance guard: 54/54 PASS
- Pipeline: PASS
