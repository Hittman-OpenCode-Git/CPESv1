# Case Study Modernization Report — Sprint 5.9C

**Date:** 2026-07-21
**Source:** RepositoryQualityAudit.md ("Scenario text too short" findings)
**Cases flagged:** 20 out of 75 (27%)

---

## 1. Current State

Of 75 case studies:
- **Packs 2–5** (scored_cases2.js through scored_cases5.js): 20 cases have scenario texts of 10–55 words with no company background, decision-maker role, or business stakes.
- **Pack 1** (scored_cases.js): All cases have strong scenarios (40–60 words with company context, role, and stakes). These serve as the quality target.
- **CBQ2-C1** is the weakest case, with scenario text "Analyzing volume vs spending variances." (4 words), no company name, and items that are generic matching exercises.

---

## 2. Target Quality Standard

Pack 1 cases (CBQ-A1, CBQ-C2, CBQ-E1, CBQ-F1) establish the bar:

| Component | Example (CBQ-A1 — Northstar Equipment) |
|-----------|----------------------------------------|
| Company name | Northstar Equipment |
| Industry | Equipment distribution |
| Decision-maker role | Controller |
| Business problem | Year-end reporting package, audit committee meeting |
| Stakes/outcome | Management wants answers that reconcile cash activity to accruals |
| Questions require | Application, analysis, evaluation (not definition recall) |

**Minimum scenario spec:**
- Named company (not "A company")
- Industry context (manufacturing, retail, technology, etc.)
- Decision-maker role (CFO, controller, internal auditor, plant manager)
- Concrete business problem or reporting objective
- Minimum 40 words; target 50–70 words

---

## 3. Prioritized Case Backlog

### Priority 1 — Bare-Minimum Scenarios (7 cases)

These scenarios are effectively absent (≤15 words). Fixing them provides the highest marginal gain.

| CaseID | Current Scenario | Current Score | Proposed Enhancement | Effort | Impact |
|--------|-----------------|---------------|---------------------|--------|--------|
| CBQ2-C1 | "Analyzing volume vs spending variances." | 3/5 | "Pinnacle Manufacturing's plant controller is preparing the monthly performance report. The plant manager wants to understand why actual overhead costs differed from the flexible budget. The analysis must separate volume-driven variances from spending-driven variances to identify which department managers need corrective action." | 20 min | Very High |
| CBQ2-C2 | "Analyze DM and DL variances." (~5 words inferred) | 3/5 | "Precision Components produces machined parts for automotive clients. The production manager received the monthly cost report showing actual direct material and direct labor costs exceeding standard. The controller needs a variance analysis to determine whether the issues are price-driven, efficiency-driven, or both before the weekly operations review." | 20 min | Very High |
| CBQ2-C3 | "Analyze ROI and residual income." (~5 words inferred) | 3/5 | "Summit Industries evaluates its three divisions using ROI and residual income. The CFO is preparing the quarterly performance review and needs to assess whether the Eastern division's new equipment investment improved divisional performance. The CEO prefers a metric that aligns division managers' decisions with company-wide capital budgeting goals." | 20 min | Very High |
| CBQ2-D1 | Activity-based costing scenario (~15 words) | 3/5 | "Greenfield Electronics manufactures three product lines in a shared facility. The plant controller suspects that the traditional volume-based costing system is distorting product costs. The CFO wants an ABC analysis to better understand overhead consumption before a pricing review for the company's largest customer." | 20 min | Very High |
| CBQ2-D3 | Process costing scenario (~15 words) | 3/5 | "Lakeview Chemicals processes a industrial solvent through two consecutive departments: Mixing and Finishing. The cost accountant needs to calculate equivalent units for the Mixing Department using the weighted-average method for the March production run. Spoilage is normal and occurs at the end of the process." | 20 min | Very High |
| CBQ2-E1 | IT general controls (~15 words) | 3/5 | "Vanguard Financial Services recently experienced a data breach in its customer-facing portal. The internal audit director has been asked to evaluate the company's IT general controls (ITGC) as part of the SOX compliance program. The board's audit committee wants assurance that access controls, change management, and backup procedures are operating effectively." | 20 min | Very High |
| CBQ2-E2 | Segregation of duties (~15 words) | 3/5 | "Northpoint Credit Union's external auditors identified a segregation-of-duties weakness in the accounts payable process. The internal audit manager must evaluate the current controls and recommend compensating controls where segregation is not feasible. The CFO wants a risk-priority ranking of the identified conflicts." | 20 min | Very High |

### Priority 2 — Short Scenarios (7 cases)

These have partial context (20–55 words) but no decision-maker role or stakes.

| CaseID | Current Scenario | Current Score | Proposed Enhancement | Effort | Impact |
|--------|-----------------|---------------|---------------------|--------|--------|
| CBQ2-F1 | Data analytics maturity (~25 words) | 3/5 | "Westfield Insurance is building a data analytics function to identify fraud patterns in claims processing. The VP of Analytics wants to assess the organization's data analytics maturity level across descriptive, diagnostic, predictive, and prescriptive capabilities. The IT director needs a roadmap for moving from basic reporting to advanced analytics." | 20 min | High |
| CBQ2-F2 | Data governance/lifecycle (~25 words) | 3/5 | "Coastal Healthcare is implementing a new EHR system. The data governance officer must establish policies covering the full data lifecycle — from collection through secure disposal. The compliance team needs to ensure the framework meets HIPAA requirements while enabling clinical analytics." | 20 min | High |
| CBQ3-C1 | Balanced scorecard (~25 words) | 3/5 | "Meridian Financial's CEO wants to replace the existing financial-only performance measurement system with a balanced scorecard. The CFO and VP of Strategy must define metrics across four perspectives: financial, customer, internal business processes, and learning and growth. The board wants the scorecard linked to the company's strategic objectives." | 20 min | High |
| CBQ3-C2 | Transfer pricing (~25 words) | 3/5 | "AutoParts International has two divisions: Engine Division (produces components) and Assembly Division (uses components and sells finished products). The CFO must set a transfer price that allows each division to be evaluated fairly while maximizing overall corporate profit. The Assembly Division has found an external supplier offering a lower price." | 20 min | High |
| CBQ3-C3 | Flexible budget variances (~25 words) | 3/5 | "Evergreen Packaging's plant manager received the monthly manufacturing report showing actual costs of $245,000 against a static budget of $220,000. The controller prepares a flexible budget that reveals $12,000 of the variance is volume-driven and $13,000 is spending-driven. The manager needs to determine which variances require corrective action." | 20 min | High |
| CBQ3-D3 | Cost allocation step-down (~25 words) | 3/5 | "St. Luke's Medical Center allocates its support department costs (IT, HR, Facilities) to three patient service departments using the step-down method. The CFO must determine the allocation sequence that maximizes reimbursement from Medicare cost reports. Each support department provides services to the others, so the order of allocation matters." | 20 min | High |
| CBQ3-E2 | Business continuity/disaster recovery (~25 words) | 3/5 | "Pacifica Bank's regulator is requiring an updated business continuity plan as part of its examination findings. The COO and IT director must identify critical systems, establish recovery time objectives (RTOs), and test the disaster recovery plan. The audit committee wants assurance that the bank can resume operations within 4 hours of a major disruption." | 20 min | High |

### Priority 3 — Adequate But Improvable (6 cases)

These have some context but lack depth or industry specificity.

| CaseID | Current Scenario | Current Score | Proposed Enhancement | Effort | Impact |
|--------|-----------------|---------------|---------------------|--------|--------|
| CBQ3-F1 | SDLC scenario (~30 words) | 3/5 | "TechSprint Solutions is developing a new customer relationship management (CRM) system using the SDLC framework. The project manager needs to ensure each phase — planning, analysis, design, development, testing, implementation, and maintenance — includes appropriate controls and stakeholder sign-offs before proceeding to the next phase." | 15 min | Medium |
| CBQ4-C2 | Customer profitability (~30 words) | 3/5 | "Deluxe Print Group serves 200 corporate clients. The CFO suspects that 20% of customers generate 80% of profits. The controller must analyze customer-level profitability using activity-based costing to identify which accounts are below the profit threshold and recommend minimum order values or service-level adjustments." | 15 min | Medium |
| CBQ4-D3 | Capacity management (~30 words) | 3/5 | "Sterling Steel operates a mill with a theoretical capacity of 500,000 tons per year. The plant manager must calculate practical capacity, normal capacity, and excess capacity for the annual budget. The CFO wants capacity costs allocated only to products produced during normal operating hours for accurate product costing." | 15 min | Medium |
| CBQ4-E2 | Application IT controls (~30 words) | 3/5 | "PayrollPlus, a SaaS payroll provider, is undergoing a SOC 2 Type II audit. The internal audit team must evaluate the application controls within the payroll processing system, including input validation, processing controls, and output verification. The auditor wants to test the edit checks that prevent duplicate employee payments." | 15 min | Medium |
| CBQ4-E3 | Foreign Corrupt Practices Act (~30 words) | 3/5 | "International Mining Corp (IMC) operates in 12 countries, including several with high corruption risk ratings. The chief compliance officer must update the company's FCPA compliance program after a whistleblower report flagged unusual payments to a foreign official. The audit committee wants a risk assessment of the company's third-party due diligence process." | 15 min | Medium |
| CBQ4-F1 | Cloud computing models (~30 words) | 3/5 | "EduLearn, an online education platform, is migrating its infrastructure from on-premise servers to the cloud. The CTO must evaluate IaaS, PaaS, and SaaS deployment models. The CFO needs a cost comparison that considers not just subscription fees but also data egress costs, compliance requirements (FERPA), and vendor lock-in risks." | 15 min | Medium |

### Additional Cases — Pack 2 Scenarios Already Partially Adequate

| CaseID | Current Scenario | Current Score | Notes |
|--------|-----------------|---------------|-------|
| CBQ2-A3 | "Vertex Solutions entered into a $500,000 contract to deliver hardware, installation, and 1 year of maintenance. Hardware was delivered Oct 1..." (~55 words) | 3/5 | Has company name, contract details. Missing: role, stakes, reporting deadline. Minimal enhancement needed: add "The revenue accountant must... before the Q3 filing deadline." |
| CBQ2-A2 | "Oasis Retail uses FIFO. At year-end, physical inventory count shows 10,000 units. The historical cost is $15/unit..." (~45 words) | 3/5 | Has company name and data. Missing: role, why this matters. Add "The inventory accountant needs to determine the proper valuation method before the year-end close to avoid misstating cost of goods sold." |
| CBQ2-B2 | Harbor Manufacturing case (~150 words in scenario) | 4/5 | Already adequate. Items include "CFO Chen" role context and decision-analysis questions. No improvement needed. |

---

## 4. Items That Need Improvement (Within Short-Scenario Cases)

Beyond the scenario text, several case item prompts lack business context — they ask "match the terms" or "select the correct definition" without embedding in the case scenario.

**CBQ2-C1** (the weakest case) has 5 items that are all "Match the terms (Question 1)" through "Match the terms (Question 5)" with generic prompts and explanations like "Mapped to standard concepts." All items share the same left/right items and same correct answer. This is effectively one question repeated 5 times.

**CBQ2-C1 items need:**
- Unique prompts per item (not "Match the terms (Question N)")
- Item-specific explanations replacing "Mapped to standard concepts"
- Distinct left/right items per question
- Contextual framing using the new scenario

**CBQ2-A2-Q3** explanation "($15 - $13) * 10,000 units = $20,000" is correct but adds no judgment. Enhance with: "The write-down is required because FIFO values inventory at the lower of cost ($15) and NRV ($13). The decline of $2/unit × 10,000 units = $20,000 reduces the inventory carrying amount to NRV, which reflects the expected economic benefit."

---

## 5. Summary

| Priority | Cases | Effort (person-hours) | Realism Gain |
|----------|-------|----------------------|--------------|
| P1 (bare-minimum) | 7 | 2.3 | 3→5 |
| P2 (short scenarios) | 7 | 2.3 | 3→4 |
| P3 (improvable) | 6 | 1.5 | 3→4 |
| **Total** | **20** | **~6** | **3→4.4 avg** |

The case study modernization effort is **low-cost, high-impact** — approximately 6 hours to rewrite 20 scenario texts, boosting case study realism from 3/5 to an estimated 4.4/5 average.
