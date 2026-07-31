# Session 80P — Matching Item Integrity Defect Report

**Generated:** 2026-07-30T15:29:14.533Z
**Governance Lane:** Light — Read-Only Analysis
**Files Audited:** case_pack_1_corrected.js, case_pack_2_corrected.js, case_pack_3_corrected.js

---

## Executive Summary

| Metric | Count |
|--------|-------|
| Total matching items | 83 |
| Clean (no findings) | 0 |
| Items with defects | 83 |
| CRITICAL findings | 0 |
| HIGH severity findings | 91 |
| MEDIUM severity findings | 21 |
| LOW severity findings | 65 |

## Defect Categories Found

| Category | Count | Severity |
|----------|-------|----------|
| SAME_ANSWER_REUSE | 8 | |
| ORDERED_ANSWER_PATTERN | 81 | |
| UNUSED_DISTRACTOR | 65 | |
| DUPLICATE_DISTRACTOR | 3 | |
| NO_EXTRA_DISTRACTORS | 20 | |
| MISSING_CORRECT_MAPPING | 0 | |
| UNKNOWN_RIGHT_REFERENCE | 0 | |
| EXTRA_CORRECT_KEYS | 0 | |

## Distribution by Pack

| Pack | Total | Clean | With Defects |
|------|-------|-------|-------------|
| Pack 1 | 24 | 0 | 24 |
| Pack 2 | 26 | 0 | 26 |
| Pack 3 | 33 | 0 | 33 |

## Distribution by Section

| Section | Total | Clean | With Defects |
|---------|-------|-------|-------------|
| A | 5 | 0 | 5 |
| B | 7 | 0 | 7 |
| C | 26 | 0 | 26 |
| D | 16 | 0 | 16 |
| E | 18 | 0 | 18 |
| F | 11 | 0 | 11 |

## Detailed Findings

### CBQ-A2-Q6 — CBQ-A2 (A, Pack 1)

**Prompt:** "Match each issue to the correct reporting treatment."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Intercompany sale | Eliminate in consolidation | 0 ← SAME POSITION |
| 2 | Asset impairment | Recognize loss when carrying amount exceeds fair value after recoverability failure | 1 ← SAME POSITION |
| 3 | Debt security unrealized gain | Report in OCI when applicable | 2 ← SAME POSITION |
| 4 | Translation loss | Report in OCI as cumulative translation adjustment | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-A3-Q6 — CBQ-A3 (A, Pack 1)

**Prompt:** "Match each item to its reporting treatment."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | FIFO inventory below NRV | Write down inventory | 0 ← SAME POSITION |
| 2 | ARO present value | Record liability and add to asset cost | 1 ← SAME POSITION |
| 3 | 88-day Treasury bill | Classify as cash equivalent | 2 ← SAME POSITION |
| 4 | Equipment purchase | Classify as investing cash outflow | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ2-A2-Q4 — CBQ2-A2 (A, Pack 2)

**Prompt:** "Match the inventory valuation method to its primary characteristic."
**LeftItems:** 3 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | LIFO | Matches recent costs to revenue | 0 ← SAME POSITION |
| 2 | FIFO | Ending inventory reflects current costs | 1 ← SAME POSITION |
| 3 | Weighted Average | Smooths out price fluctuations | 2 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 3/3 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Always yields highest income"]

### CBQ-B2-Q6 — CBQ-B2 (B, Pack 1)

**Prompt:** "Match each metric to the best interpretation."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Bookings | Potential demand, subject to cancellation | 0 ← SAME POSITION |
| 2 | Firm backlog | Committed demand not yet shipped | 1 ← SAME POSITION |
| 3 | Supplier lead time | Supply-chain constraint signal | 2 ← SAME POSITION |
| 4 | Regression R-squared | Model explanatory power | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-C1-Q6 — CBQ-C1 (C, Pack 1)

**Prompt:** "Match each variance to the manager most likely to investigate first."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Material price | Purchasing | 0 ← SAME POSITION |
| 2 | Material quantity | Production | 1 ← SAME POSITION |
| 3 | Labor rate | HR or staffing | 2 ← SAME POSITION |
| 4 | Labor efficiency | Production supervision | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-C2-Q6 — CBQ-C2 (C, Pack 1)

**Prompt:** "Match each measure to the best description."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | ROI | Operating income divided by assets | 0 ← SAME POSITION |
| 2 | Residual income | Income after required asset charge | 1 ← SAME POSITION |
| 3 | Minimum transfer price with idle capacity | Variable cost plus opportunity cost | 2 ← SAME POSITION |
| 4 | Market price | External benchmark when available | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-C3-Q5 — CBQ-C3 (C, Pack 1)

**Prompt:** "Match each scorecard perspective to the best metric."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Financial | Operating income | 0 ← SAME POSITION |
| 2 | Customer | On-time delivery | 1 ← SAME POSITION |
| 3 | Internal process | Defect rate | 2 ← SAME POSITION |
| 4 | Learning and growth | Training hours per employee | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ2-C1-Q1 — CBQ2-C1 (C, Pack 2)

**Prompt:** "Match each variance category to the correct variance amount shown in Exhibit 1."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Sales price variance | Cannot be determined from a flexible budget report alone | 0 ← SAME POSITION |
| 2 | Direct materials efficiency variance | Requires separate price and quantity data beyond the summary | 1 ← SAME POSITION |
| 3 | Direct materials price variance | Requires separate price and quantity data beyond the summary | 1 |
| 4 | Labor rate variance | Requires separate price and quantity data beyond the summary | 1 |

- **[HIGH] SAME_ANSWER_REUSE:** "Requires separate price and quantity data beyond the summary" is the correct mapping for 3 different LeftItems: ["Direct materials efficiency variance", "Direct materials price variance", "Labor rate variance"]
- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Is exactly equal to the total static budget variance"]
- **[HIGH] DUPLICATE_DISTRACTOR:** 1 RightItems appear multiple times in the choices list: "Requires separate price and quantity data beyond the summary" (3x)

### CBQ2-C1-Q2 — CBQ2-C1 (C, Pack 2)

**Prompt:** "Match each Q1 performance indicator to the most likely underlying cause."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Direct materials variance 15.2% unfavorable | Possible material waste or higher input prices requiring purchasing and production review | 0 ← SAME POSITION |
| 2 | Direct labor variance 2.4% unfavorable | Small labor inefficiency within normal tolerance; monitor but no immediate action | 1 ← SAME POSITION |
| 3 | Variable overhead 4.0% favorable | Lower variable overhead spending or usage than expected at actual production levels | 2 ← SAME POSITION |
| 4 | Sales volume 4.0% unfavorable | Fewer units sold than budgeted; investigate demand or market share changes | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Fixed overhead spending exceeded the budget; review fixed cost commitments"]

### CBQ2-C1-Q3 — CBQ2-C1 (C, Pack 2)

**Prompt:** "Match each flexible budget component to its correct formula."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Flexible budget revenue | Actual units sold x Budgeted selling price per unit | 0 ← SAME POSITION |
| 2 | Flexible budget direct materials cost | Actual units produced x Standard material cost per unit | 1 ← SAME POSITION |
| 3 | Flexible budget variable overhead cost | Actual units produced x Standard variable overhead rate per unit | 2 ← SAME POSITION |
| 4 | Sales volume variance in dollars | (Actual units sold - Budgeted units sold) x Budgeted contribution margin per unit | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Actual units sold x Actual selling price per unit"]

### CBQ2-C1-Q4 — CBQ2-C1 (C, Pack 2)

**Prompt:** "Match each management action to the variance signal that would most likely trigger it."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Authorize overtime production | Favorable sales volume variance with backlog | 0 ← SAME POSITION |
| 2 | Renegotiate supplier contracts | Unfavorable direct materials price variance above threshold | 1 ← SAME POSITION |
| 3 | Launch promotional campaign | Unfavorable sales volume variance due to lost market share | 2 ← SAME POSITION |
| 4 | Review fixed overhead commitments | Unfavorable fixed overhead spending variance | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Favorable labor efficiency variance"]

### CBQ2-C1-Q5 — CBQ2-C1 (C, Pack 2)

**Prompt:** "Match each variance type to the organizational unit most likely responsible for it."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Direct materials usage variance | Production manager | 0 ← SAME POSITION |
| 2 | Labor rate variance | Human resources or union contract terms | 1 ← SAME POSITION |
| 3 | Sales volume variance | Sales and marketing department | 2 ← SAME POSITION |
| 4 | Variable overhead spending variance | Department manager controlling indirect costs | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Corporate treasury"]

### CBQ-D1-Q6 — CBQ-D1 (D, Pack 1)

**Prompt:** "Match each activity to its quality-cost category."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Supplier certification | Prevention | 0 ← SAME POSITION |
| 2 | Final inspection | Appraisal | 1 ← SAME POSITION |
| 3 | Scrap before shipment | Internal failure | 2 ← SAME POSITION |
| 4 | Warranty repairs | External failure | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-D2-Q6 — CBQ-D2 (D, Pack 1)

**Prompt:** "Match each issue to the best tool."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Partially complete WIP | Equivalent units | 0 ← SAME POSITION |
| 2 | Lowest capacity resource | Bottleneck analysis | 1 ← SAME POSITION |
| 3 | Unnecessary movement | Lean waste review | 2 ← SAME POSITION |
| 4 | Continuous homogeneous output | Process costing | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ2-D2-Q6 — CBQ2-D2 (D, Pack 2)

**Prompt:** "Match each joint cost allocation method to its allocation basis."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | NRV method | Final sales value minus further processing costs | 0 ← SAME POSITION |
| 2 | Physical-units method | Volume of output | 1 ← SAME POSITION |
| 3 | Sales-value-at-split-off method | Market value at split-off point | 2 ← SAME POSITION |
| 4 | Constant gross-margin NRV method | Joint cost allocated so every product has the same gross margin percentage | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-E1-Q5 — CBQ-E1 (E, Pack 1)

**Prompt:** "Match each control to preventive or detective."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Independent vendor approval | Preventive | 0 ← SAME POSITION |
| 2 | Three-way match before payment | Preventive | 0 |
| 3 | Duplicate-payment report review | Detective | 2 ← SAME POSITION |
| 4 | Bank reconciliation | Detective | 2 |

- **[HIGH] SAME_ANSWER_REUSE:** "Preventive" is the correct mapping for 2 different LeftItems: ["Independent vendor approval", "Three-way match before payment"]
- **[HIGH] SAME_ANSWER_REUSE:** "Detective" is the correct mapping for 2 different LeftItems: ["Duplicate-payment report review", "Bank reconciliation"]
- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[HIGH] DUPLICATE_DISTRACTOR:** 2 RightItems appear multiple times in the choices list: "Preventive" (2x), "Detective" (2x)
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-E2-Q5 — CBQ-E2 (E, Pack 1)

**Prompt:** "Match each exception to the primary risk."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Shared administrator IDs | Lack of accountability | 0 ← SAME POSITION |
| 2 | Terminated users active | Unauthorized access | 1 ← SAME POSITION |
| 3 | Unapproved emergency changes | Unauthorized or erroneous report logic | 2 ← SAME POSITION |
| 4 | Failed interface reconciliation | Incomplete or inaccurate data transfer | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ-F2-Q6 — CBQ-F2 (F, Pack 1)

**Prompt:** "Match each finding to the main control response."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Shared bot account | Unique credentials and access logging | 0 ← SAME POSITION |
| 2 | Unapproved rule changes | Change management | 1 ← SAME POSITION |
| 3 | Duplicate vendor IDs | Master-data governance | 2 ← SAME POSITION |
| 4 | No false-positive review | Model monitoring | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ2-E1-Q1 — CBQ2-E1 (E, Pack 2)

**Prompt:** "Match each IT general control category to the primary risk it addresses."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Logical access controls | Unauthorized users gaining system access | 0 ← SAME POSITION |
| 2 | Change management controls | Unauthorized or untested system modifications causing errors or security gaps | 1 ← SAME POSITION |
| 3 | Computer operations controls | Processing errors, data loss, or incomplete processing going undetected | 2 ← SAME POSITION |
| 4 | Program development controls | Flawed or malicious code introduced into production systems | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Hardware theft or environmental damage to data center"]

### CBQ2-E1-Q2 — CBQ2-E1 (E, Pack 2)

**Prompt:** "Match each control deficiency identified in Exhibit 1 to the most appropriate remediation."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Shared admin accounts without MFA | Implement individual accounts with multi-factor authentication and periodic access reviews | 0 ← SAME POSITION |
| 2 | Changes approved only via email | Establish a change advisory board with formal approval, testing, and rollback procedures | 1 ← SAME POSITION |
| 3 | Developers accessing production data | Enforce environment segregation and restrict production access to operations team only | 2 ← SAME POSITION |
| 4 | No batch job completion review | Implement automated job monitoring with alerts for failures and independent review of logs | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Install video surveillance and biometric access controls in the server room"]

### CBQ2-E1-Q3 — CBQ2-E1 (E, Pack 2)

**Prompt:** "Match each IT control type to the correct description of its purpose."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Preventive control | Stops errors or unauthorized actions before they occur | 0 ← SAME POSITION |
| 2 | Detective control | Identifies errors or irregularities after they have occurred | 1 ← SAME POSITION |
| 3 | Corrective control | Resolves issues after detection to restore normal operations | 2 ← SAME POSITION |
| 4 | Compensating control | Provides alternative oversight when primary controls are not feasible | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Documents all system changes for audit trail purposes"]

### CBQ2-E1-Q4 — CBQ2-E1 (E, Pack 2)

**Prompt:** "Match each application control type to its correct example."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Input validation | Range check ensuring dollar amounts fall within expected limits | 0 ← SAME POSITION |
| 2 | Processing control | Run-to-run control totals verifying data processed completely | 1 ← SAME POSITION |
| 3 | Output control | Review of printed reports for reasonableness before distribution | 2 ← SAME POSITION |
| 4 | Access control | User authentication required to access the application | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Quarterly physical inventory count verification"]

### CBQ2-E1-Q5 — CBQ2-E1 (E, Pack 2)

**Prompt:** "Match each IT role to the correct segregation-of-duties conflict if the role is combined with others."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | System administrator also performs user access reviews | The administrator could grant excessive privileges and conceal the action during review | 0 ← SAME POSITION |
| 2 | Developer also moves code to production | Code could be deployed without independent testing or approval | 1 ← SAME POSITION |
| 3 | IT operator also records changes in the change log | Changes could be made without independent verification of completion | 2 ← SAME POSITION |
| 4 | Database administrator also approves system access requests | Access could be granted without independent approval, bypassing access controls | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["The CFO could override system controls and approve their own transactions"]

### CBQ-F1-Q4 — CBQ-F1 (F, Pack 1)

**Prompt:** "Match each analytics request to its type."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Summarize failure rate | Descriptive | 0 ← SAME POSITION |
| 2 | Investigate supplier batch relationship | Diagnostic | 1 ← SAME POSITION |
| 3 | Estimate reserve | Predictive | 2 ← SAME POSITION |
| 4 | Recommend inspection threshold | Prescriptive | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ3-A2-Q5 — CBQ3-A2 (A, Pack 3)

**Prompt:** "Match the cash flow activity to its classification."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 75%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Depreciation expense | Add back to Net Income (Operating) | 0 ← SAME POSITION |
| 2 | Gain on sale of asset | Deduct from Net Income (Operating) | 1 ← SAME POSITION |
| 3 | Decrease in inventory | Add to Net Income (Operating) | 2 ← SAME POSITION |
| 4 | Decrease in accounts payable | Deduct from Net Income (Operating) | 1 |

- **[HIGH] SAME_ANSWER_REUSE:** "Deduct from Net Income (Operating)" is the correct mapping for 2 different LeftItems: ["Gain on sale of asset", "Decrease in accounts payable"]
- **[MEDIUM] ORDERED_ANSWER_PATTERN:** 3/4 LeftItems map sequentially to RightItems (75%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Report in Investing Activities"]
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ4-A1-Q3 — CBQ4-A1 (A, Pack 4)

**Prompt:** "Match the asset to its correct amortization and impairment treatment under US GAAP."
**LeftItems:** 3 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Patent | Amortized over useful life, tested for impairment if triggering event | 0 ← SAME POSITION |
| 2 | Trademark | Not amortized, tested for impairment at least annually | 1 ← SAME POSITION |
| 3 | Goodwill | Not amortized, tested for impairment at reporting unit level | 2 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 3/3 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Amortized over 15 years straight-line"]

### CBQ2-B2-Q6 — CBQ2-B2 (B, Pack 2)

**Prompt:** "Match each forecast risk to the correct management response."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Cash deficit exceeds $100,000 in January | Negotiate extended payment terms with suppliers | 0 ← SAME POSITION |
| 2 | December credit collections arrive slower than budgeted | Increase reliance on the line of credit in January | 1 ← SAME POSITION |
| 3 | Equipment supplier offers a January discount but payment is due in February | Defer purchase to February, increasing January cash available | 2 ← SAME POSITION |
| 4 | Actual January sales exceed budget by 15% | Increase both collections and COGS projections in the forecast | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ2-B3-Q6 — CBQ2-B3 (B, Pack 2)

**Prompt:** "Match each forecasting methodology to its correct description."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Trend analysis | Projects future values based on historical growth rates | 0 ← SAME POSITION |
| 2 | Seasonal adjustment | Applies periodic multipliers to account for recurring patterns | 1 ← SAME POSITION |
| 3 | Qualitative forecasting | Relies on expert judgment when historical data is limited | 2 ← SAME POSITION |
| 4 | Moving average | Smooths random fluctuations by averaging consecutive periods | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Splits costs into fixed and variable components using regression"]

### CBQ3-B2-Q6 — CBQ3-B2 (B, Pack 3)

**Prompt:** "Match each budget component to its correct calculation formula."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Direct labor budget | Units produced x DLH per unit x Wage rate | 0 ← SAME POSITION |
| 2 | Variable overhead budget | Actual DLH x Variable OH rate per DLH | 1 ← SAME POSITION |
| 3 | Fixed overhead budget | Remains constant within the relevant range | 2 ← SAME POSITION |
| 4 | Applied manufacturing overhead | Predetermined OH rate x Actual activity | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Units sold x Selling price"]

### CBQ3-C1-Q1 — CBQ3-C1 (C, Pack 3)

**Prompt:** "Nexus Manufacturing's strategy team has identified the following financial performance objectives. Match each objective to the correct balanced scorecard perspective indicator type."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Increase return on capital employed (ROCE) to 18% | Financial — profitability | 0 ← SAME POSITION |
| 2 | Reduce cost of goods sold by 5% through process improvements | Financial — cost efficiency | 1 ← SAME POSITION |
| 3 | Increase revenue from new product lines to 25% of total sales | Financial — revenue growth | 2 ← SAME POSITION |
| 4 | Achieve operating cash flow sufficient to fund capital expenditures | Financial — liquidity and investment | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Customer — satisfaction"]

### CBQ3-C1-Q2 — CBQ3-C1 (C, Pack 3)

**Prompt:** "The Customer perspective of the balanced scorecard focuses on how the company creates value for its target customers. Match each customer objective to its specific measurement focus."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Improve on-time delivery rate from 91% to 98% | Customer — operational excellence | 0 ← SAME POSITION |
| 2 | Increase Net Promoter Score (NPS) from +32 to +50 | Customer — customer loyalty and satisfaction | 1 ← SAME POSITION |
| 3 | Reduce customer churn rate from 15% to 8% | Customer — customer retention | 2 ← SAME POSITION |
| 4 | Increase market share in industrial automation from 12% to 18% | Customer — market position | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Financial — revenue growth"]

### CBQ3-C1-Q3 — CBQ3-C1 (C, Pack 3)

**Prompt:** "The Internal Business Process perspective identifies the critical processes where the company must excel. Match each process improvement objective to the correct process type."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Reduce defect rate from 4.7 to below 2 per 1,000 units | Operations management — quality | 0 ← SAME POSITION |
| 2 | Reduce order-to-delivery cycle time from 14 days to 7 days | Operations management — cycle time | 1 ← SAME POSITION |
| 3 | Implement a supplier quality certification program | Supplier management — quality assurance | 2 ← SAME POSITION |
| 4 | Automate inventory replenishment to reduce stockouts by 50% | Inventory management — efficiency | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Customer management — satisfaction"]

### CBQ3-C1-Q4 — CBQ3-C1 (C, Pack 3)

**Prompt:** "The Learning and Growth perspective focuses on the intangible assets needed to support the other perspectives. Match each capability-building objective to its correct focus area."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Increase employee certification rate from 62% to 85% | Human capital — employee skills and competencies | 0 ← SAME POSITION |
| 2 | Implement an enterprise-wide CRM system to improve customer data analytics | Information capital — technology infrastructure | 1 ← SAME POSITION |
| 3 | Establish a culture of continuous improvement with 100% employee participation in Kaizen events | Organization capital — culture and alignment | 2 ← SAME POSITION |
| 4 | Launch a leadership development program for middle managers | Human capital — leadership development | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Financial capital — investment returns"]

### CBQ3-C1-Q5 — CBQ3-C1 (C, Pack 3)

**Prompt:** "The balanced scorecard distinguishes between leading and lagging indicators. Match each KPI to its correct classification as a leading or lagging indicator of financial performance."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Employee training hours completed | Leading indicator — investments in human capital drive future performance | 0 ← SAME POSITION |
| 2 | Customer satisfaction score (NPS) | Leading indicator — customer satisfaction predicts future revenue | 1 ← SAME POSITION |
| 3 | On-time delivery rate | Leading indicator — operational quality drives customer retention | 2 ← SAME POSITION |
| 4 | Return on capital employed (ROCE) | Lagging indicator — measures the outcome of past strategic actions | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Lagging indicator — employee turnover rate"]

### CBQ3-C2-Q4 — CBQ3-C2 (C, Pack 3)

**Prompt:** "Apex Components faces four distinct business scenarios. Match each scenario to the most appropriate transfer pricing method."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Division A has excess capacity and Division B needs 40,000 chips; no external buyer exists for these units | Variable cost — with idle capacity, the opportunity cost is zero, so any transfer price above variable cost adds to company profit without sacrificing external sales | 0 ← SAME POSITION |
| 2 | Division A sells identical chips externally at $50; the chip market is highly competitive with many suppliers | Market price — competitive market provides an objective, verifiable price that aligns divisional incentives with company goals | 1 ← SAME POSITION |
| 3 | Division A's chips are customized for Division B and have no external market; costs are stable and well-documented | Full cost plus markup — cost-based pricing is appropriate when no market benchmark exists; a markup ensures the selling division earns a reasonable return | 2 ← SAME POSITION |
| 4 | Division A is located in a low-tax country; Division B is in a high-tax country; the company wants to minimize total global tax | Negotiated or manipulated transfer price — tax-minimization strategies may justify prices that differ from pure economic transfer pricing, subject to arm's-length compliance | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Dual pricing — credit the selling division at market price and charge the buying division at cost to resolve goal conflicts"]

### CBQ3-C3-Q4 — CBQ3-C3 (C, Pack 3)

**Prompt:** "Match each variance description to the correct variance formula for Precision Manufacturing's standard costing system."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Difference between actual revenue and flexible budget revenue at 12,000 units | Selling price variance — (Actual Price − Standard Price) × Actual Quantity = ($73 − $75) × 12,000 = $24,000 U | 0 ← SAME POSITION |
| 2 | Difference between flexible budget variable cost at 12,000 units and actual variable cost | Flexible budget variable cost variance — Sum of (actual cost − standard cost × actual units) for DM, DL, VOH, VS&A | 1 ← SAME POSITION |
| 3 | Difference between static budget operating income and flexible budget operating income | Sales volume variance — (Actual Units − Budgeted Units) × Standard Contribution Margin per Unit = (12,000 − 10,000) × $25 = $50,000 F | 2 ← SAME POSITION |
| 4 | Difference between actual fixed overhead and budgeted fixed overhead | Fixed overhead spending variance — Actual FOH − Budgeted FOH = $185,000 − $180,000 = $5,000 U | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Production volume variance — measures fixed overhead capacity utilization"]

### CBQ3-D1-Q6 — CBQ3-D1 (D, Pack 3)

**Prompt:** "Match each cost item to its classification under variable costing."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Direct materials | Product cost | 0 ← SAME POSITION |
| 2 | Direct labor | Product cost | 0 |
| 3 | Variable manufacturing overhead | Product cost | 0 |
| 4 | Fixed manufacturing overhead | Period cost | 3 ← SAME POSITION |

- **[HIGH] SAME_ANSWER_REUSE:** "Product cost" is the correct mapping for 3 different LeftItems: ["Direct materials", "Direct labor", "Variable manufacturing overhead"]
- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[HIGH] DUPLICATE_DISTRACTOR:** 1 RightItems appear multiple times in the choices list: "Product cost" (3x)
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ3-D2-Q6 — CBQ3-D2 (D, Pack 3)

**Prompt:** "Match each term to its correct description."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Predetermined overhead rate | Estimated OH divided by estimated activity base | 0 ← SAME POSITION |
| 2 | Normal costing | Uses estimated rate to apply OH during the period | 1 ← SAME POSITION |
| 3 | Cost driver | Activity base that causes overhead costs | 2 ← SAME POSITION |
| 4 | Overapplied overhead | Applied OH exceeds actual OH incurred | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ4-D1-Q6 — CBQ4-D1 (D, Pack 4)

**Prompt:** "Match each TOC measure to its correct definition."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Throughput | Sales price minus direct materials | 0 ← SAME POSITION |
| 2 | Operating expense | All costs except direct materials | 1 ← SAME POSITION |
| 3 | Inventory | Materials purchased but not yet sold | 2 ← SAME POSITION |
| 4 | Constraint | Resource that limits overall output | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ4-D2-Q6 — CBQ4-D2 (D, Pack 4)

**Prompt:** "Match each lean concept to its correct description."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Cellular manufacturing | Arranges machines in sequence to reduce movement and WIP | 0 ← SAME POSITION |
| 2 | Kanban | Visual signal that authorizes production | 1 ← SAME POSITION |
| 3 | Kaizen | Continuous incremental improvement involving all employees | 2 ← SAME POSITION |
| 4 | Takt time | Production pace that matches customer demand rate | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ3-E1-Q1 — CBQ3-E1 (E, Pack 3)

**Prompt:** "The Chief Risk Officer is training department heads on the five COSO ERM 2017 components. Match each risk management activity to the correct ERM component."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Establishing the board's risk oversight structure and defining risk culture expectations | Governance and Culture | 0 ← SAME POSITION |
| 2 | Defining risk appetite and aligning risk tolerances with strategic planning | Strategy and Objective-Setting | 1 ← SAME POSITION |
| 3 | Identifying and assessing risks that could affect the achievement of strategic objectives | Performance | 2 ← SAME POSITION |
| 4 | Communicating risk information to stakeholders through structured reporting channels | Information, Communication, and Reporting | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Review and Revision"]

### CBQ3-E1-Q2 — CBQ3-E1 (E, Pack 3)

**Prompt:** "Match each ERM implementation activity at MedTech Devices to the correct COSO ERM component where the activity belongs."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Training plant managers on the company's risk culture expectations and ethical values | Governance and Culture | 0 ← SAME POSITION |
| 2 | Setting operational risk limits for each facility based on the board's risk appetite statement | Strategy and Objective-Setting | 1 ← SAME POSITION |
| 3 | Developing a risk heat map to prioritize the top 10 risks across all product lines | Performance | 2 ← SAME POSITION |
| 4 | Conducting semi-annual ERM program effectiveness reviews and updating the risk register | Review and Revision | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Information, Communication, and Reporting"]

### CBQ3-E1-Q3 — CBQ3-E1 (E, Pack 3)

**Prompt:** "MedTech Devices has identified the following risks during the Performance component assessment. Match each risk to the most appropriate risk response strategy."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Regulatory risk: New FDA traceability requirements may increase compliance costs by $500,000 | Acceptance — the cost of mitigation exceeds the potential impact; budget for compliance | 0 ← SAME POSITION |
| 2 | Supplier risk: Single-source supplier for titanium may face labor strike; probability is low but impact is severe | Mitigation — develop alternative supplier relationships and maintain safety stock | 1 ← SAME POSITION |
| 3 | Technology risk: Current ERP system is obsolete and requires immediate upgrade to avoid operational disruption | Mitigation — implement ERP upgrade project with dedicated budget and timeline | 2 ← SAME POSITION |
| 4 | Market risk: Competitor is launching a similar surgical instrument at a 15% lower price point | Acceptance — monitor competitor pricing and differentiate through quality and service | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Avoidance — discontinue all products in the affected category"]

### CBQ3-E1-Q4 — CBQ3-E1 (E, Pack 3)

**Prompt:** "The Review and Revision component requires MedTech Devices to assess changes that could affect ERM effectiveness. Match each change scenario to the correct ERM revision principle."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | The company plans to acquire a smaller competitor with a different risk culture | Assess substantial change — the acquisition introduces new risks that must be integrated into the ERM program | 0 ← SAME POSITION |
| 2 | The FDA has proposed new quality reporting requirements that could affect product clearance timelines | Assess substantial change — regulatory changes may require updates to compliance risk assessments | 1 ← SAME POSITION |
| 3 | A key supplier experienced a data breach that could affect MedTech's supply chain systems | Assess substantial change — third-party risk from supplier breach affects MedTech's risk profile | 2 ← SAME POSITION |
| 4 | The risk committee's quarterly review found two emerging risks not previously identified | Pursue improvement in ERM — the risk identification process should be enhanced to capture emerging risks proactively | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Information and Communication — report the findings to the board"]

### CBQ3-E1-Q5 — CBQ3-E1 (E, Pack 3)

**Prompt:** "Match each ERM benefit described by MedTech's CRO to the correct COSO ERM component that primarily delivers that benefit."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Improved risk awareness and ethical decision-making throughout the organization | Governance and Culture — establishes tone at the top and risk culture | 0 ← SAME POSITION |
| 2 | Better-informed strategic decisions because risk appetite is explicitly considered | Strategy and Objective-Setting — integrates risk with strategic planning | 1 ← SAME POSITION |
| 3 | Faster identification of operational risks through standardized risk assessment processes | Performance — provides systematic risk identification and assessment tools | 2 ← SAME POSITION |
| 4 | More effective board oversight through structured risk reporting and dashboards | Information, Communication, and Reporting — delivers risk data to decision-makers | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Review and Revision — evaluates ERM effectiveness"]

### CBQ3-E2-Q4 — CBQ3-E2 (E, Pack 3)

**Prompt:** "FFCU has identified four business functions that require different recovery strategies. Match each function to the most appropriate recovery approach based on Exhibits 1 and 2."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Online banking platform — RTO 2 hours; RPO 15 minutes; critical to member trust and regulatory compliance | Hot site or DRaaS — replicate systems in near-real-time to a geographically separate facility; automated failover within minutes | 0 ← SAME POSITION |
| 2 | Loan origination system — RTO 24 hours; RPO 4 hours; moderate impact if unavailable for a day | Warm site — pre-configured hardware and network connectivity available; load backup data and resume operations within 24 hours | 1 ← SAME POSITION |
| 3 | Human resources portal — RTO 72 hours; RPO 24 hours; low criticality, can tolerate extended downtime | Cold site or manual workaround — empty facility with power/cooling; acceptable for low-criticality functions that can be deferred | 2 ← SAME POSITION |
| 4 | Teller transaction processing — RTO 4 hours; RPO 1 hour; high impact on branch operations | Warm site with data replication — pre-staged environment with hourly data replication to meet the 4-hour RTO and 1-hour RPO | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Ignore — the function does not need any recovery plan"]

### CBQ3-F2-Q1 — CBQ3-F2 (F, Pack 3)

**Prompt:** "Based on Exhibit 1, each of the following retail metrics requires a specific chart type to communicate effectively. Match each data relationship to the most appropriate chart type."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Monthly revenue trend over 24 months showing seasonal patterns | Line chart — best for continuous data over time; clearly shows trend direction, seasonality, and inflection points | 0 ← SAME POSITION |
| 2 | Sales comparison across 30 stores to identify top and bottom performers | Bar chart sorted descending — enables rapid visual comparison across categories; best for ranking | 1 ← SAME POSITION |
| 3 | Relationship between advertising spend and weekly revenue | Scatter plot with trend line — reveals correlation between two continuous variables; shows outliers | 2 ← SAME POSITION |
| 4 | Proportion of total expenses by category (6 categories) | Treemap or pie chart — effective for showing part-to-whole relationships with limited categories | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["3D pie chart — visually engaging option that management prefers for presentations"]

### CBQ3-F2-Q5 — CBQ3-F2 (F, Pack 3)

**Prompt:** "Insight Analytics trains the client's finance team on data storytelling. Match each data presentation goal to the visualization approach that BEST achieves it."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Show that Q4 sales are consistently higher than other quarters across three years | Small multiples (three line charts side by side) — enables comparison of quarterly patterns across years while maintaining consistent scale | 0 ← SAME POSITION |
| 2 | Identify which product categories have profit margins significantly above or below the company average | Diverging bar chart centered on the average — categories extending right are above average; left are below; zero line provides immediate reference | 1 ← SAME POSITION |
| 3 | Communicate to the board that the company achieved its revenue target despite economic headwinds | Annotated KPI dashboard with trend arrow and variance callout — headline number, trend line, and contextual narrative guide interpretation | 2 ← SAME POSITION |
| 4 | Compare each store's actual sales to its individual target and prior year performance | Bullet chart for each store — shows actual vs target vs prior year in a compact, single-bar format with comparative benchmarks | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["3D exploded pie chart — makes the presentation visually impressive for the board meeting"]

### CBQ4-F1-Q1 — CBQ4-F1 (F, Pack 4)

**Prompt:** "The IT steering committee is evaluating different cloud service models for MedTech's applications. Using Exhibit 1, match each application requirement to the most appropriate cloud service model."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | The HR department needs a payroll and benefits administration system; they want to avoid any hardware or software management and access it through a web browser | SaaS — software is fully managed by the vendor and accessed via browser; the customer manages only data and user access | 0 ← SAME POSITION |
| 2 | The IT team wants to build a custom inventory management application; they need a platform with development tools, database, and middleware but want to avoid managing underlying infrastructure | PaaS — provides development platform and runtime environment; vendor manages infrastructure, OS, and middleware; customer manages applications and data | 1 ← SAME POSITION |
| 3 | The data science team needs raw virtual servers, storage, and networking to run analytics workloads; they will manage the OS and applications themselves | IaaS — provides virtualized computing resources; customer manages OS, middleware, runtime, applications, and data; vendor manages physical infrastructure | 2 ← SAME POSITION |
| 4 | The ERP system contains sensitive financial and patient data; MedTech needs maximum control and is considering keeping it on-premise | On-premise — maximum control over all layers; customer manages everything including physical security; appropriate for highly regulated data | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Community cloud — shared infrastructure among several organizations with common compliance concerns"]

### CBQ4-F1-Q5 — CBQ4-F1 (F, Pack 4)

**Prompt:** "The IT steering committee is considering different cloud deployment models. Match each deployment model to the scenario that BEST fits its characteristics."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | MedTech's ERP system must comply with strict FDA and HIPAA requirements; the company wants dedicated infrastructure but has no need for a massive capital investment in a new data center | Private cloud — dedicated infrastructure for a single organization; provides the highest security and compliance control while avoiding data center capital costs | 0 ← SAME POSITION |
| 2 | MedTech's R&D team needs a sandbox environment to test new analytics tools; they want low cost and do not need dedicated infrastructure | Public cloud — resources shared across multiple organizations; lowest cost but least control; appropriate for development, testing, and non-sensitive workloads | 1 ← SAME POSITION |
| 3 | MedTech and two other medical device companies want to share a cloud environment that meets their common regulatory requirements while keeping costs lower than a fully private cloud | Community cloud — shared infrastructure among several organizations with common compliance concerns (e.g., HIPAA, FDA); balances cost and compliance | 2 ← SAME POSITION |
| 4 | MedTech acquired a small distributor and needs to quickly integrate their IT systems without a long capital approval process | Public cloud (rapid deployment) — quick provisioning, pay-as-you-go pricing; ideal for acquisitions, temporary workloads, or rapid scaling without capital investment | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Hybrid cloud — combination of public and private; allows sensitive data to remain in private cloud while leveraging public cloud for elasticity"]

### CBQ3-B3-Q6 — CBQ3-B3 (B, Pack 3)

**Prompt:** "Match each CVP concept to its correct formula."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Contribution margin per unit | Selling price minus variable cost per unit | 0 ← SAME POSITION |
| 2 | Break-even point (units) | Fixed costs divided by contribution margin per unit | 1 ← SAME POSITION |
| 3 | Margin of safety (units) | Actual sales minus break-even sales | 2 ← SAME POSITION |
| 4 | Operating leverage | Contribution margin divided by operating income | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Total revenue minus total cost"]

### CBQ4-B2-Q6 — CBQ4-B2 (B, Pack 4)

**Prompt:** "Match each budgeted balance sheet line item to the primary budget or policy that determines it."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Cash | Cash budget and collection/disbursement timing | 0 ← SAME POSITION |
| 2 | Accounts receivable | Sales budget and credit collection policy | 1 ← SAME POSITION |
| 3 | Inventory | Cost of goods sold budget and purchases budget | 2 ← SAME POSITION |
| 4 | Accounts payable | Purchases budget and supplier payment terms | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Production budget and labor efficiency"]

### CBQ5-B1-Q2 — CBQ5-B1 (B, Pack 5)

**Prompt:** "Match the strategic scenario to the correct component of Porter's Five Forces."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | A startup invents a cheaper alternative material | Threat of substitutes | 0 ← SAME POSITION |
| 2 | Only two suppliers control 90% of the raw materials | Bargaining power of suppliers | 1 ← SAME POSITION |
| 3 | A major client demands a 10% price reduction | Bargaining power of buyers | 2 ← SAME POSITION |
| 4 | Low capital requirements allow new competitors to enter easily | Threat of new entrants | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Intensity of competitive rivalry"]

### CBQ4-C2-Q1 — CBQ4-C2 (C, Pack 4)

**Prompt:** "Great Lakes Distribution uses the ABC cost hierarchy to classify activities. Match each activity cost to the correct hierarchy level."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Processing a customer's individual purchase order | Batch-level cost — each order requires order processing regardless of order size | 0 ← SAME POSITION |
| 2 | Making a sales call to a retail customer | Customer-sustaining cost — sales visits support the customer relationship, not individual orders | 1 ← SAME POSITION |
| 3 | Product sourcing and supplier qualification for each product line | Product-sustaining cost — sourcing activities maintain the product line's availability in the assortment | 2 ← SAME POSITION |
| 4 | Receiving and storing a pallet of goods from a supplier | Unit-level cost — receiving costs vary with each pallet of goods handled | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Facility-sustaining cost — corporate overhead not traceable to specific activities"]

### CBQ4-C2-Q2 — CBQ4-C2 (C, Pack 4)

**Prompt:** "Based on the ABC cost hierarchy, match each cost driver to the cost it most appropriately drives."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Number of purchase orders placed | Batch-level — order entry, picking, and shipping costs vary with order count | 0 ← SAME POSITION |
| 2 | Number of sales calls made to each customer | Customer-sustaining — sales and account management costs vary with customer relationship intensity | 1 ← SAME POSITION |
| 3 | Number of products carried in the product line | Product-sustaining — category management and vendor compliance costs vary with product count | 2 ← SAME POSITION |
| 4 | Number of delivery stops per route | Batch-level — delivery routing and stop costs vary with each delivery stop | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Unit-level — cost of goods sold varies with each unit sold"]

### CBQ4-C2-Q3 — CBQ4-C2 (C, Pack 4)

**Prompt:** "Referring to Exhibit 1, Great Lakes Distribution wants to calculate customer-level profitability. Match each cost allocation approach to its correct description."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Allocating order processing costs to customers | Use number of orders as the allocation base — each customer is charged proportionally to order count | 0 ← SAME POSITION |
| 2 | Allocating sales visit costs to customers | Use number of sales visits as the allocation base — each customer is charged proportionally to visit frequency | 1 ← SAME POSITION |
| 3 | Allocating delivery costs to customers | Use number of delivery stops as the allocation base — each customer is charged proportionally to stop frequency | 2 ← SAME POSITION |
| 4 | Allocating product sourcing costs to customers | Use number of products purchased as the allocation base — customers buying from more product lines bear more sourcing cost | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Use revenue as the allocation base — larger customers bear more cost regardless of service consumption"]

### CBQ4-C2-Q4 — CBQ4-C2 (C, Pack 4)

**Prompt:** "Using the data in Exhibit 1, classify each customer based on the likely profitability profile when ABC costing is applied."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Corner Grocers chain — $2.45M revenue, 360 orders, 12 sales visits | High profit potential — high revenue, moderate service demands, 67% gross margin | 0 ← SAME POSITION |
| 2 | Lakeside Restaurant — $185K revenue, 240 orders, 24 sales visits, 25 special requests | Low profit potential — low revenue, very high service intensity relative to revenue | 1 ← SAME POSITION |
| 3 | County Hospital Kitchen — $620K revenue, 180 orders, 6 sales visits | Moderate profit potential — mid-size revenue, low service intensity, efficient operations | 2 ← SAME POSITION |
| 4 | Campus Dining — $1.18M revenue, 300 orders, 120 delivery stops | Moderate profit potential — good revenue but higher delivery costs due to many delivery stops | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Negative profit — costs exceed revenue"]

### CBQ4-C2-Q5 — CBQ4-C2 (C, Pack 4)

**Prompt:** "Based on the customer profitability analysis, Great Lakes Distribution is considering strategic actions. Match each potential action to the most appropriate customer situation."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Lakeside Restaurant shows very low profitability despite moderate total purchases | Reprice or restructure service — consider minimum order quantities or service fees for high-touch, low-revenue customers | 0 ← SAME POSITION |
| 2 | Corner Grocers chain is highly profitable and has potential to grow | Invest and grow — offer volume discounts or dedicated support to strengthen the relationship | 1 ← SAME POSITION |
| 3 | County Hospital Kitchen has efficient operations and consistent ordering patterns | Maintain — current service level is efficient and profitable; monitor for changes | 2 ← SAME POSITION |
| 4 | Campus Dining has good revenue but frequent small deliveries increase costs | Negotiate delivery schedule — consolidate deliveries to reduce stop frequency while maintaining service quality | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Terminate relationship — costs exceed any possible revenue"]

### CBQ5-C2-Q1 — CBQ5-C2 (C, Pack 5)

**Prompt:** "OmniSource uses responsibility accounting to classify each business unit. Match each unit to the correct type of responsibility center based on what its manager is accountable for."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Distribution Center — manager controls costs but does not set prices or make capital decisions | Cost center — accountable for cost control and operational efficiency only | 0 ← SAME POSITION |
| 2 | Neighborhood Store #12 — manager controls both revenue and costs; capital equipment decisions made centrally | Profit center — accountable for both revenue and expenses, but not capital investment decisions | 1 ← SAME POSITION |
| 3 | Warehouse Store #4 — manager controls revenue, costs, and has authority to approve capital expenditures up to $25,000 | Investment center — accountable for revenue, expenses, and return on invested capital | 2 ← SAME POSITION |
| 4 | E-commerce Division — manager controls revenue, costs, and all technology investment decisions | Investment center — accountable for all financial results including technology ROI | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Revenue center — accountable for sales generation only"]

### CBQ5-C2-Q2 — CBQ5-C2 (C, Pack 5)

**Prompt:** "Using Exhibit 1 data, match each performance measure calculation to the correct result for Warehouse Store #4."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Return on Investment (ROI) = Operating Income / Average Operating Assets | ROI = 14.6% — $1,240,000 / $8,500,000 | 0 ← SAME POSITION |
| 2 | Margin ratio = Operating Income / Net Revenue | Margin = 12.7% — $1,240,000 / $9,800,000 | 1 ← SAME POSITION |
| 3 | Turnover ratio = Net Revenue / Average Operating Assets | Turnover = 1.15 — $9,800,000 / $8,500,000 | 2 ← SAME POSITION |
| 4 | Residual Income (RI) assuming 10% required rate of return | RI = $390,000 — $1,240,000 − (10% × $8,500,000) | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["ROI = 10.2% — incorrect calculation using net income"]

### CBQ5-C2-Q3 — CBQ5-C2 (C, Pack 5)

**Prompt:** "The CFO is evaluating whether to use ROI or Residual Income (RI) for evaluating store managers. Match each performance measure characteristic to the correct metric (ROI or RI)."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Expresses performance as a percentage, enabling comparison across stores of different sizes | ROI — a relative measure that facilitates comparison across centers | 0 ← SAME POSITION |
| 2 | May cause managers to reject profitable projects that earn less than the division's current ROI | ROI — a potential disadvantage as managers may maximize their ROI rather than total company value | 1 ← SAME POSITION |
| 3 | Measures absolute dollar value created above the required return on invested capital | RI — an absolute dollar measure that shows how much value was added above the cost of capital | 2 ← SAME POSITION |
| 4 | Aligns manager decisions with company-wide value creation when the same required rate is used | RI — aligns managerial decisions with company-wide goal congruence when required rate equals cost of capital | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Net Income — the simplest performance metric"]

### CBQ5-C2-Q4 — CBQ5-C2 (C, Pack 5)

**Prompt:** "The E-commerce Division manager proposes a $1,000,000 technology upgrade expected to generate $130,000 in annual operating income. The corporate required rate of return is 10%. Match each analysis to the correct evaluation of this proposal."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Current E-commerce ROI: $980,000 / $4,200,000 = 23.3% | If evaluated on ROI, the manager may REJECT this project because 13.0% is below the current division ROI of 23.3% | 0 ← SAME POSITION |
| 2 | Proposed project ROI: $130,000 / $1,000,000 = 13.0% | The project ROI of 13.0% exceeds the 10% cost of capital, so it creates economic value | 1 ← SAME POSITION |
| 3 | Post-project E-commerce ROI: ($980,000 + $130,000) / ($4,200,000 + $1,000,000) = 21.0% | The blended ROI decreases from 23.3% to 21.0%, which may discourage the manager from accepting | 2 ← SAME POSITION |
| 4 | Project Residual Income: $130,000 − (10% × $1,000,000) = $30,000 | RI is POSITIVE at $30,000, meaning the project adds value above the required return | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["If evaluated on RI, the manager would REJECT this project because it reduces overall value"]

### CBQ5-C2-Q5 — CBQ5-C2 (C, Pack 5)

**Prompt:** "OmniSource's controller is designing a balanced performance measurement system. Match each performance dimension to the most appropriate metric from the given options."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Financial performance of investment centers | Financial — ROI and Residual Income measure investment center profitability | 0 ← SAME POSITION |
| 2 | Customer satisfaction and market position | Customer — Net Promoter Score and market share track customer loyalty and competitive position | 1 ← SAME POSITION |
| 3 | Internal process efficiency and quality | Internal Process — defect rates and cycle time measure operational efficiency | 2 ← SAME POSITION |
| 4 | Employee development and innovation capability | Learning and Growth — employee training hours and certification rates measure capability development | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Strategic — revenue growth rate measures market expansion"]

### CBQ5-C3-Q2 — CBQ5-C3 (C, Pack 5)

**Prompt:** "The CFO needs to explain each variance component to the VP of Sales. Match each variance concept to the correct calculated result based on the data in Exhibit 1."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 25%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Sales Volume Variance = $230,000 F — total impact of selling different volumes at budgeted margins | $198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix | 0 ← SAME POSITION |
| 2 | Sales Quantity Variance = (Total Actual Units − Total Budget Units) × Budgeted WACM | $198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix | 0 |
| 3 | Market Size Variance = (Actual Industry − Budget Industry) × Budget Share × Budgeted WACM | $330,000 Favorable — the overall beverage market grew by 100,000 units; EverFresh would have captured 25% of that growth at budget, yielding 25,000 additional units × $13.20 WACM | 1 |
| 4 | Market Share Variance = (Actual Share − Budget Share) × Actual Industry × Budgeted WACM | $132,000 Unfavorable — EverFresh's market share dropped from 25% to 23%; on an actual market of 500,000 units, this 2% decline represents 10,000 lost units × $13.20 WACM | 2 |

- **[HIGH] SAME_ANSWER_REUSE:** "$198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix" is the correct mapping for 2 different LeftItems: ["Sales Volume Variance = $230,000 F — total impact of selling different volumes at budgeted margins", "Sales Quantity Variance = (Total Actual Units − Total Budget Units) × Budgeted WACM"]
- **[LOW] UNUSED_DISTRACTOR:** 2 RightItems are never used as a correct answer: ["$32,000 Favorable — EverFresh sold a higher proportion of Premium Juice Blends (43.5% actual vs 40% budget) which carry a higher $18 CM, increasing total contribution beyond the quantity-only effect", "$230,000 Unfavorable — an incorrect aggregation that reverses the sign"]

### CBQ4-D3-Q4 — CBQ4-D3 (D, Pack 4)

**Prompt:** "The CFO must recommend a capacity management strategy for each department. Match each department's situation to the most appropriate capacity strategy using Exhibit 1."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Cutting Department — practical capacity is 38,000 but actual is only 28,000; 10,000 units of capacity are idle | Reduce unused capacity — investigate why 26% of practical capacity is idle; consider using excess capacity for new products or outsourcing selected operations to fill the gap | 0 ← SAME POSITION |
| 2 | Assembly Department — practical capacity is 42,000; this is the highest capacity in the plant; other departments limit total output to 28,000 | Identify as the bottleneck — this department currently does not limit output, but management should monitor it to ensure Assembly remains the constraint | 1 ← SAME POSITION |
| 3 | Finishing Department — practical capacity is 40,000; new equipment would increase capacity to 55,000 but cost $2.5M | Defer capital investment — current capacity exceeds demand; investing in additional capacity would increase fixed costs without increasing throughput | 2 ← SAME POSITION |
| 4 | All departments — Summit's management wants to understand the true cost of carrying unused capacity over the business cycle | Use normal capacity for strategic planning — 32,000 units reflects average long-term demand; compare actual to normal to assess capacity utilization over the business cycle | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Outsource all production — contract manufacturing eliminates capacity management concerns"]

### CBQ5-D1-Q1 — CBQ5-D1 (D, Pack 5)

**Prompt:** "Heritage Furniture's management team is analyzing primary activities in Porter's value chain. Match each business process to the correct primary activity category."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Negotiating with lumber suppliers and managing raw material inventory levels | Inbound Logistics — activities related to receiving, storing, and managing inputs | 0 ← SAME POSITION |
| 2 | Operating CNC cutting machines and managing the furniture assembly line | Operations — activities that transform inputs into finished products | 1 ← SAME POSITION |
| 3 | Managing finished goods warehousing and coordinating delivery to retail customers | Outbound Logistics — activities that collect, store, and distribute finished goods to customers | 2 ← SAME POSITION |
| 4 | Managing the showroom sales team and running digital advertising campaigns | Marketing and Sales — activities that make customers aware of products and facilitate purchases | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Service — activities that maintain product value after purchase"]

### CBQ5-D1-Q2 — CBQ5-D1 (D, Pack 5)

**Prompt:** "Porter's value chain also includes support activities that enable the primary activities. Match each corporate function to the correct support activity category."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Managing employee recruitment, training, and performance evaluation processes | Human Resource Management — recruiting, training, and developing employees | 0 ← SAME POSITION |
| 2 | Developing the ERP system and maintaining the company website and e-commerce platform | Technology Development — systems, software, and process innovation to support operations | 1 ← SAME POSITION |
| 3 | Sourcing raw materials, negotiating supplier contracts, and managing vendor relationships | Procurement — sourcing and purchasing inputs including materials, equipment, and services | 2 ← SAME POSITION |
| 4 | Designing new furniture collections and improving manufacturing processes | Technology Development — research and development for new products and process design | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Firm Infrastructure — general management, legal, accounting, and finance"]

### CBQ5-D1-Q3 — CBQ5-D1 (D, Pack 5)

**Prompt:** "Based on the value chain analysis in Exhibit 1, match each cost reduction initiative to the value chain activity it targets."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Implement just-in-time (JIT) delivery from lumber suppliers to reduce warehousing costs by reducing raw material inventory levels | Inbound Logistics — JIT reduces raw material holding costs and improves inventory turnover | 0 ← SAME POSITION |
| 2 | Apply Six Sigma DMAIC methodology to reduce the defect rate from 5.2% to 2.5% in the assembly and finishing processes | Operations — Six Sigma reduces waste and rework costs by eliminating defects at the source | 1 ← SAME POSITION |
| 3 | Automate the order-to-ship process and implement zone-based delivery routing to reduce shipping costs | Outbound Logistics — automation reduces labor costs; zone routing reduces fuel and driver costs | 2 ← SAME POSITION |
| 4 | Shift advertising spend from print catalogs to digital channels; reduce showroom square footage | Marketing and Sales — digital advertising is more cost-effective; smaller showroom reduces occupancy costs | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Service — self-service warranty portal reduces call center staffing requirements"]

### CBQ5-D1-Q4 — CBQ5-D1 (D, Pack 5)

**Prompt:** "Heritage Furniture is evaluating different process improvement methodologies. Match each methodology to its correct description and application."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Six Sigma — data-driven methodology for reducing process variation and defects | Reducing defect rate from 5.2% to 2.5% using DMAIC — defining, measuring, analyzing, improving, and controlling | 0 ← SAME POSITION |
| 2 | Benchmarking — comparing performance metrics to industry best practices | Comparing Heritage's $38.5M operations cost to the $35.0M industry benchmark to identify the 10% gap | 1 ← SAME POSITION |
| 3 | Business Process Reengineering (BPR) — fundamental redesign of business processes | Redesigning the entire order-to-cash process from scratch to eliminate non-value-added steps and achieve radical improvement | 2 ← SAME POSITION |
| 4 | Kaizen (Continuous Improvement) — small, incremental improvements by all employees | Empowering assembly line workers to suggest and implement small daily improvements to workstation layout and workflow | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Implementing an ERP system to integrate all business functions into a single platform"]

### CBQ5-D1-Q5 — CBQ5-D1 (D, Pack 5)

**Prompt:** "Heritage Furniture wants to assess which activities in its value chain are core competencies versus commodity activities. Match each assessment to the correct strategic implication."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Custom furniture design and hand-finishing techniques — competitors cannot replicate; customers pay premium pricing | Core competency — invest in retaining and strengthening this capability; it provides competitive advantage | 0 ← SAME POSITION |
| 2 | Payroll processing and basic accounting — multiple third-party providers can perform at lower cost | Outsource or automate — non-core activity that can be performed more efficiently by specialized providers | 1 ← SAME POSITION |
| 3 | Lumber procurement — several suppliers available; market is competitive and transparent | Manage for cost efficiency — procurement costs should be minimized through competitive bidding and supplier management | 2 ← SAME POSITION |
| 4 | CNC cutting operations — machine cost is similar across competitors; no significant differentiation | Manage for cost efficiency — operations cost must be at or below industry benchmark to remain competitive | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Divest — sell this business unit entirely"]

### CBQ5-D2-Q1 — CBQ5-D2 (D, Pack 5)

**Prompt:** "The Six Sigma team is planning the DMAIC project. Match each DMAIC phase to the correct activity that PAC's team would perform during that phase."
**LeftItems:** 5 | **RightItems:** 6 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Define - the team defines the problem, project scope, and customer requirements | Documenting that the brake caliper defect rate is 6,210 ppm and setting a target of reducing it to 3,100 ppm within 12 months | 0 ← SAME POSITION |
| 2 | Measure - the team collects baseline data and measures current process performance | Collecting 90 days of production data showing that 85% of defects originate in the machining center's tolerance drift | 1 ← SAME POSITION |
| 3 | Analyze - the team identifies root causes of defects and process variation | Using a cause-and-effect diagram and hypothesis testing to determine that coolant temperature variation is the primary root cause of bore diameter defects | 2 ← SAME POSITION |
| 4 | Improve - the team develops and implements solutions to address root causes | Installing temperature control sensors on the machining center and implementing a statistical process control (SPC) chart for real-time bore diameter monitoring | 3 ← SAME POSITION |
| 5 | Control - the team monitors the improved process to sustain gains | Implementing a weekly SPC review meeting and a monthly audit to ensure the temperature control system remains calibrated and operators follow the new procedure | 4 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 5/5 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Designing a new brake caliper model with different specifications"]

### CBQ5-D2-Q2 — CBQ5-D2 (D, Pack 5)

**Prompt:** "The quality director needs to explain the cost of quality (COQ) categories to senior management. Match each quality cost item from Exhibit 1 to its correct COQ classification."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Employee quality training and certification programs costing $180,000 per quarter | Prevention cost - costs incurred to prevent defects from occurring in the first place; proactive spending that reduces all other quality costs | 0 ← SAME POSITION |
| 2 | Inline quality checks during production costing $210,000 per quarter | Appraisal cost - costs of measuring, inspecting, and testing products to ensure they meet quality standards | 1 ← SAME POSITION |
| 3 | Scrapped materials and rework labor from defective brake calipers costing $420,000 per quarter | Internal failure cost - costs of defects discovered BEFORE the product reaches the customer; includes scrap, rework, and downtime | 2 ← SAME POSITION |
| 4 | Customer warranty claims for field failures costing $580,000 per quarter | External failure cost - costs of defects discovered AFTER the product reaches the customer; includes warranty claims, returns, and lost reputation | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Design cost - costs of developing new products and features"]

### CBQ5-D3-Q3 — CBQ5-D3 (D, Pack 5)

**Prompt:** "Match each transfer pricing method to the scenario where it would be most appropriate."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Market-based | An active external market exists and divisions operate as independent profit centers | 0 ← SAME POSITION |
| 2 | Cost-based | No reliable market price exists and company wants simplicity in administration | 1 ← SAME POSITION |
| 3 | Negotiated | Divisions have equal bargaining power and management encourages autonomy | 2 ← SAME POSITION |
| 4 | Dual pricing | Divisions have conflicting objectives and corporate wants goal congruence | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Division has no excess capacity and full external market demand exists"]

### CBQ4-E2-Q1 — CBQ4-E2 (E, Pack 4)

**Prompt:** "The internal audit team identified several scenarios where application controls should prevent or detect errors. Match each scenario to the appropriate application control from Exhibit 1."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | An accounts payable clerk accidentally enters $25,000 instead of $2,500 for the unit price of a surgical instrument on a purchase order | Purchase order limit check — the entered unit price ($25,000) exceeds the 20% threshold above the expected price, triggering a rejection | 0 ← SAME POSITION |
| 2 | A data entry operator creates an invoice referencing a vendor ID that does not exist in the approved vendor master table | Vendor master validity check — the system verifies the vendor ID against the approved master table and rejects the invoice when no match is found | 1 ← SAME POSITION |
| 3 | An order entry clerk enters a customer account number as 48219 instead of 48129 — a transposition of two digits | Check digit validation — the modulus-10 algorithm detects the transposition error and rejects the account number as invalid | 2 ← SAME POSITION |
| 4 | An order processor attempts to enter a sales order for a customer whose outstanding balance already exceeds the approved credit limit | Customer credit limit check — the system blocks the order and notifies the order processor that the credit limit would be exceeded | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Completeness check — ensures all required fields like customer name, address, and order date are filled"]

### CBQ4-E2-Q4 — CBQ4-E2 (E, Pack 4)

**Prompt:** "MedTech's internal audit team is classifying application controls by type. Match each control description to the correct control category using Exhibit 2."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | When a receiving clerk enters the quantity received, the ERP system verifies that it does not exceed the quantity ordered by more than 10% | Input control — quantity reasonableness check prevents receiving errors from entering the system | 0 ← SAME POSITION |
| 2 | The ERP system assigns sequential batch numbers to all invoice batches; the accounting supervisor reviews a daily gap report for missing batches | Processing control — batch sequence verification ensures no invoice batches are lost or deleted during processing | 1 ← SAME POSITION |
| 3 | The accounts payable manager reviews a weekly aged payables report and investigates any invoices older than 45 days | Output control — periodic review of processed output ensures accuracy and triggers follow-up on anomalies | 2 ← SAME POSITION |
| 4 | The ERP system restricts invoice entry to users in the AP Clerk role; procurement managers cannot enter invoices | Access control — role-based security prevents users from performing incompatible functions | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["General IT control — relates to the overall IT environment rather than a specific application"]

### CBQ4-E3-Q4 — CBQ4-E3 (E, Pack 4)

**Prompt:** "The internal audit team classified each risk scenario from Exhibit 1 for further action. Match each scenario to the most appropriate compliance response."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Customs expediting fee — $500 paid to customs official; recorded as expense | Permissible if properly approved and documented under company policy — establish clear policy on facilitating payments; continue monitoring | 0 ← SAME POSITION |
| 2 | Agent commission — 15% via shell company; agent related to procurement minister | Investigate immediately and consider termination — red flags indicate likely improper payments; may require voluntary disclosure to DOJ | 1 ← SAME POSITION |
| 3 | Charitable donation request — $50,000 to minister's personal foundation | Decline and report to compliance committee — donation to personal entity of government official is presumptively improper; offer alternative legitimate charitable options | 2 ← SAME POSITION |
| 4 | Luxury client entertainment — $1,200/person including spouses for government clients | Review and strengthen expense policy — entertainment exceeding $500 per person should require pre-approval; spouse attendance is presumptively improper | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["No action needed — these are standard business practices in emerging markets"]

### CBQ5-E1-Q1 — CBQ5-E1 (E, Pack 5)

**Prompt:** "Match each IIA Standard category to the type of guidance it provides."
**LeftItems:** 3 | **RightItems:** 4 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Attribute Standards | Define the characteristics and capabilities required for internal audit activities and individuals | 0 ← SAME POSITION |
| 2 | Performance Standards | Describe the nature of internal audit work and quality criteria for measuring performance | 1 ← SAME POSITION |
| 3 | Implementation Standards | Apply Attribute and Performance Standards to specific engagement types such as assurance or consulting | 2 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 3/3 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Establish the ethical requirements for internal audit professionals including integrity and confidentiality"]

### CBQ5-E2-Q1 — CBQ5-E2 (E, Pack 5)

**Prompt:** "The CISO is preparing an incident report for the board. Match each cybersecurity threat type to its role in the CCHS incident."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Phishing email | The initial attack vector — a deceptive email with a malicious attachment bypassed human controls and delivered the trojan to the billing workstation | 0 ← SAME POSITION |
| 2 | Remote Access Trojan (RAT) | The persistence mechanism — remained undetected for 48 hours, exfiltrated credentials, and provided remote access for lateral movement | 1 ← SAME POSITION |
| 3 | Ransomware | The final payload — encrypted files across the network causing a 22-day operational outage and $18.2 million in estimated losses | 2 ← SAME POSITION |
| 4 | DDoS (distraction attack) | A coordinated traffic flood against the patient portal designed to divert IT resources during the ransomware deployment | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["A vulnerability scanning tool that identifies missing security patches across network devices and servers"]

### CBQ4-F2-Q2 — CBQ4-F2 (F, Pack 4)

**Prompt:** "For each machine learning application at OmniRetail, select whether it uses supervised or unsupervised learning."
**LeftItems:** 4 | **RightItems:** 4 | **Sequential ratio:** 25%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Demand forecasting | Supervised learning | 0 ← SAME POSITION |
| 2 | Fraud detection | Supervised learning | 0 |
| 3 | Customer segmentation | Unsupervised learning | 1 |
| 4 | Anomaly detection | Unsupervised learning | 1 |

- **[HIGH] SAME_ANSWER_REUSE:** "Supervised learning" is the correct mapping for 2 different LeftItems: ["Demand forecasting", "Fraud detection"]
- **[HIGH] SAME_ANSWER_REUSE:** "Unsupervised learning" is the correct mapping for 2 different LeftItems: ["Customer segmentation", "Anomaly detection"]
- **[LOW] UNUSED_DISTRACTOR:** 2 RightItems are never used as a correct answer: ["Reinforcement learning", "Semi-supervised learning"]
- **[MEDIUM] NO_EXTRA_DISTRACTORS:** RightItems count (4) equals LeftItems count (4). No extra distractor choices — process of elimination works perfectly.

### CBQ4-F3-Q2 — CBQ4-F3 (F, Pack 4)

**Prompt:** "Match each cryptographic method to its correct description."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Symmetric encryption | Uses one shared key for both encryption and decryption | 0 ← SAME POSITION |
| 2 | Asymmetric encryption | Uses a public-private key pair for encryption and decryption | 1 ← SAME POSITION |
| 3 | Hashing | Produces a fixed-length output that cannot be reversed to the original input | 2 ← SAME POSITION |
| 4 | Digital signature | Uses a private key to sign and a public key to verify authenticity | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["Reverses encrypted data by applying the original transformation"]

### CBQ5-F1-Q1 — CBQ5-F1 (F, Pack 5)

**Prompt:** "OmniMart's data environment exhibits characteristics of all four Vs of big data. Match each V to the data characteristic it describes."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Volume | The massive scale of data generated from 12 million daily POS transactions and 4 million customer profiles | 0 ← SAME POSITION |
| 2 | Velocity | The high speed of data generation requiring real-time processing of 50,000 clickstream events per minute | 1 ← SAME POSITION |
| 3 | Variety | The diverse data formats including structured POS data, semi-structured RFID feeds, and unstructured social media text | 2 ← SAME POSITION |
| 4 | Veracity | The uncertainty and quality concerns arising from 22% incomplete profiles, 3% RFID read failures, and unreconciled cost data | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["The business value derived from analyzing data to create competitive advantage and improve decision-making"]

### CBQ5-F2-Q1 — CBQ5-F2 (F, Pack 5)

**Prompt:** "The CFO's team is preparing a training deck on RPA for the audit committee. Match each RPA characteristic to its correct description."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Rule-based processing | RPA bots execute predefined, structured steps following explicit business rules without deviation or judgment | 0 ← SAME POSITION |
| 2 | User interface interaction | RPA bots interact with applications through the same user interface as human users, requiring no system integration changes | 1 ← SAME POSITION |
| 3 | Exception handling | Bots flag transactions that fall outside predefined parameters for human review, with automated routing to the appropriate team member | 2 ← SAME POSITION |
| 4 | Attended vs unattended mode | Attended bots run on user desktops with human triggers; unattended bots run on servers on scheduled intervals without human intervention | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["RPA bots use machine learning algorithms to self-optimize process execution over time based on historical patterns"]

### CBQ5-F3-Q1 — CBQ5-F3 (F, Pack 5)

**Prompt:** "The CFO is presenting blockchain fundamentals to the board. Match each blockchain concept to its correct accounting application."
**LeftItems:** 4 | **RightItems:** 5 | **Sequential ratio:** 100%

**Answer mapping:**

| # | LeftItem | → RightItem (index) | Index |
|---|----------|---------------------|-------|
| 1 | Distributed ledger | A shared database across network participants that eliminates reconciliation between separate organizational systems | 0 ← SAME POSITION |
| 2 | Immutability | Data permanence that prevents retroactive alteration of records, strengthening audit trail reliability | 1 ← SAME POSITION |
| 3 | Smart contracts | Self-executing code that automatically triggers actions such as payment release when predefined delivery conditions are met | 2 ← SAME POSITION |
| 4 | Consensus mechanism | A validation process where network participants agree on transaction validity before records are added to the ledger | 3 ← SAME POSITION |

- **[HIGH] ORDERED_ANSWER_PATTERN:** 4/4 LeftItems map sequentially to RightItems (100%). Learner can guess by position.
- **[LOW] UNUSED_DISTRACTOR:** 1 RightItems are never used as a correct answer: ["A cryptographic technique that encrypts all transaction data so only authorized participants can read the contents"]
