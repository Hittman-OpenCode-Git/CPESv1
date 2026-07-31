# S122 Phase 2 — False Positive Library: Cognitive Label Overstatement Catalog

**Session:** S122
**Date:** 2026-07-31
**Governance Lane:** Light (Read-Only)
**Purpose:** Training material for Part 2 authors — concrete examples of items where the cognitive label exceeds the actual cognitive demand.

---

## Category 1: Looks Evaluate, Actually Apply

> **Pattern:** Deterministic rule application — single correct answer under a known standard. No competing defensible alternatives.
> **AF Triggers:** AF-E3 (Deterministic Rule Application), AF-E6 (Single-Correct Answer Under Known Rule)

### 1.1 P1B-D-113 — Byproduct Accounting (Pack B, Section D)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Apply |
| Failure | AF-E2 (Formula Substitution) + AF-E3 (Deterministic) |
| Why | One formula determines the answer: production method → byproduct value credited against joint costs. Each distractor applies a different byproduct method — only one matches. |
| Redesign | Add controller decision context: "The controller must choose between production method and sales method. Ithaca has thin margins on its main product and the byproduct market is volatile. Which method should the controller recommend and why?" |

### 1.2 P1B-F-091 — Cloud Service Model Classification (Pack B, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Remember |
| Failure | AF-E4 (Taxonomy Classification), AF-E1 (Definition Match) |
| Why | Stem describes PaaS (manage servers, use cloud platform for development). Answer is the taxonomy label. Candidate matches definition to term. |
| Redesign | Decision context: "Silverline must choose between three cloud strategies with different cost profiles, control trade-offs, and HIPAA compliance implications." |

### 1.3 P1B-F-122 — Analytics Technique Identification (Pack B, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Remember |
| Failure | AF-E4 (Taxonomy Classification), AF-E1 (Definition Match) |
| Why | Stem describes drill-down analysis (by product, region, time, segment). Candidate matches description to technique name. |
| Redesign | Present three competing investigation approaches with a deadline constraint. "Recommend which approach to prioritize given Apex's 3-day deadline before earnings call." |

### 1.4 P1B-F-148 — GDPR Data Transfer Mechanism (Pack B, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Apply / Remember |
| Failure | AF-E3 (Deterministic), AF-E6 (Single-Correct Answer) |
| Why | GDPR specifies permissible transfer mechanisms. Exactly one choice matches the framework for the described scenario. |
| Redesign | Present three options (SCCs: $45K, BCRs: $280K, adequacy relay: $60K/yr) with quantified costs and timelines. "Recommend which mechanism best balances near-term cost against scalability for a company growing 40% YoY into EU markets." |

### 1.5 P1B-F-110 — Data Warehouse Definition (Pack B, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Remember |
| Failure | AF-E1 (Definition Match) |
| Why | Stem defines "central repository for structured, processed data from multiple sources, query-optimized." Answer: "Data warehouse." Textbook definition → term. |
| Redesign | "Blue Ridge has $2.1M budget for BI infrastructure. Evaluate: data warehouse ($1.4M, 9 months) vs. data lake ($900K, 4 months) vs. data lakehouse ($1.8M, 11 months). Primary need: regulatory reporting with 3-year audit trails." |

### 1.6 P1-FC-016 — Technology Item (Pack C, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Apply |
| Failure | AF-E4 or AF-E3 |
| Why | Representative of the 14 Pack C Section F Evaluate items from the S380/S60C upgrade wave. Several exhibit taxonomy-classification patterns. Not all achieve genuine evaluate. |

---

## Category 2: Looks Evaluate, Actually Remember

> **Pattern:** Definition-match — stem IS a textbook definition of the correct answer term. Lexical overlap >40%.
> **AF Trigger:** AF-E1

### 2.1 P1B-F-110 — Data Warehouse (Pack B, Section F)

Stem defines "data warehouse" in operational terms. Answer: "Data warehouse." Three-tier overstatement (Remember labeled as Evaluate).

### 2.2 P1B-F-131 — Predictive Model Properties (Pack B, Section F)

| Field | Value |
|-------|-------|
| Labeled | Evaluate / Difficulty 4 |
| True | Understand |
| Failure | AF-E1 + AF-E3 — asks what management should "understand" about predictive models (predictions have uncertainty) |
| Why | "Sterling Corp develops a model... Management should understand that:" → textbook principle about confidence intervals. "Should understand" disguises "which is true about predictive models?" |
| Redesign | "Sterling's model forecasts Q4 at $18.2M (90% CI: $16.1M-$20.3M). The Board considers: (A) commit to $18.2M point estimate, (B) guide $17M-$19M citing CI, (C) delay guidance. Recommend which approach best balances SEC obligations against Sterling's history of beating guidance." |

### 2.3 P1B-F-091 — PaaS Classification (Pack B, Section F)

Also listed in Category 1. Stem defines PaaS; answer is taxonomy label. Three-tier overstatement.

### 2.4 P1-EC-005 — Segregation of Duties (DL-031 exemplar)

| Field | Value |
|-------|-------|
| Labeled | Would-be Evaluate |
| True | Remember |
| Failure | Stem IS the definition of segregation of duties. Answer is the term. |
| Redesign | Case-study approach: "Controller Marcus Webb can approve POs up to $50K without secondary review. Internal audit identified 8 POs at $49,850 to a vendor at a residential address. Which COSO principle is violated, and what control redesign prevents recurrence?" |

### 2.5 P1B-F-122 — Analytics Technique (Pack B, Section F)

Also listed in Category 1. Stem describes diagnostic analytics; candidate names the technique.

---

## Category 3: Looks Analyze, Actually Understand

> **Pattern:** Single-step interpretation, taxonomy classification, no decomposition.
> **AF Triggers:** AF-A4 (Taxonomy Classification), AF-A6 (Single-Step Interpretation), AF-A1 (Definition Match)

### 3.1 P1-D-015 — Quality Cost Classification (Pack A, Section D)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 3 |
| True | Understand |
| Failure | AF-A4 (Taxonomy Classification) — stem describes testing before shipment; answer is COQ category "appraisal costs" |
| Why | Candidate matches a described activity to a framework category. No decomposition, no cause-effect, no pattern recognition. |
| Redesign | "Juniper's COQ: prevention $77K, appraisal $69K, internal failure $95K, external failure $89K. Prevention spending increased 40% but failure costs declined only 5%. Analyze whether current COQ mix supports doubling prevention spending." |

### 3.2 P1-D-013 — Kaizen Costing (Pack A, Section D)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 3 |
| True | Remember |
| Failure | AF-A1 (Definition Match) — stem describes "small continuous cost reductions during production"; answer is "kaizen costing" |
| Why | Two-tier overstatement on both cognitive level AND difficulty. The stem IS the textbook definition. |
| Redesign | "Harbor evaluates: Kaizen ($15/unit annual reduction) vs. BPR ($45/unit, $280K implementation). Product lifecycle is 18 months; competitor launching lower-cost alternative in 12 months. Analyze which philosophy is better suited given the time horizon." |

### 3.3 P1-E-027 — Control Documentation (Pack A, Section E)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 4 |
| True | Understand / Apply |
| Failure | AF-A6 (Single-Step Interpretation) — asks for appropriate documentation practice; answer is textbook best practice |
| Redesign | Present 3 control cycles (AP: complete docs, Payroll: partial, Revenue: absent). "Analyze each deficiency under COSO Principle 12, rank by financial statement risk, recommend remediation priority." |

### 3.4 P1-F-025 — Correlation vs. Causation (Pack A, Section F)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 3 |
| True | Understand |
| Failure | AF-A6 — management confuses correlation with causation; candidate names the textbook caution |
| Redesign | Multi-campaign data: "Three campaigns simultaneously: digital (r=0.72), trade show (r=0.31), price promotion (r=0.84). Revenue +14%. Analyze which factor most likely drove the increase, identify confounding variable risk." |

### 3.5 P1-B-026 — Budget Assumption Conflicts (Pack A, Section B)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 4 |
| True | Understand / Apply |
| Failure | AF-A6 — stem identifies conflicting assumptions; answer is the standard coordination mechanism (budget committee) |
| Redesign | "Three conflicts: Sales assumes 12,400 units at $85, Production budgets 13,200 at $72 cost, Purchasing committed to 11,800 units raw materials. Analyze each conflict's financial impact, identify the weakest assumption, recommend which schedule to adjust." |

---

## Category 4: Looks Analyze, Actually Apply

> **Pattern:** Formula substitution, procedure execution, one-step calculation.
> **AF Triggers:** AF-A2 (Formula Substitution), AF-A3 (Procedure Execution)

### 4.1 P1-D-023 — Cost per Equivalent Unit (Pack A, Section D)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 3 |
| True | Apply |
| Failure | AF-A2 — single formula: $258,000 / 12,400 EU = $20.81. One division. No interpretation. |
| Redesign | "Zephyr's cost per EU = $20.81 (weighted-average). Prior month FIFO cost per EU = $19.42. Production manager claims $1.39 increase is raw material inflation. Analyze: is the increase from (a) FIFO→weighted-average method change, (b) beginning WIP cost layer, or (c) genuine cost increases? Quantify each component." |

### 4.2 P1-D-021 — Overhead Variance Status (Pack A, Section D)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 4 |
| True | Apply |
| Failure | AF-A2 — one subtraction: $322,000 − $306,000 = $16,000 underapplied |
| Redesign | "Three possible causes: (a) predetermined rate set using practical capacity vs. expected activity, (b) variable OH increased 12% mid-year, (c) fixed OH budgeted $160K but actual $172K. Analyze each cause's contribution to the $16K underapplication." |

### 4.3 P1-D-004 — Equivalent Units Procedure (Pack A, Section D)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 4 |
| True | Apply / Understand |
| Failure | AF-A4 (Taxonomy Classification) — stem describes "partially completed units at period-end"; answer: "convert to equivalent whole units" — procedure recognition |
| Redesign | "2,090 units 40% complete, 680 units 75% complete. Production supervisor argues EU overstates work. Controller says EU is essential for GAAP. Analyze: (a) financial reporting, (b) performance evaluation, (c) operational decision-making. Quantify the EU vs. physical units difference for each purpose." |

### 4.4 P1-F-013 — ETL Reconciliation Control (Pack A, Section F)

| Field | Value |
|-------|-------|
| Labeled | Analyze / Difficulty 1 (Easy) |
| True | Apply |
| Failure | AF-A4 (Taxonomy Classification) + AF-A5 (Difficulty Mismatch — DS=1 with Analyze) |
| Why | Stem describes ETL process; candidate identifies standard reconciliation control. Difficulty 1 + Analyze is an automatic AF-A5 failure. |
| Redesign | "847K records from 5 systems. Post-load reconciliation: System 3 (Inventory) 78.4% matched vs. 98.7-99.5% for others. Analyze which system's ETL failure poses the greatest risk, identify root cause (schema mismatch, timing window, transformation error), recommend control redesign." |

### 4.5 P1-E-051 — Bank Lockbox Benefit (Pack A, Section E)

| Field | Value |
|-------|-------|
| Labeled | Analyze / DS unset |
| True | Understand / Apply |
| Failure | AF-A6 — describes lockbox system; asks for textbook benefit. Candidate matches control to its standard benefit. |
| Redesign | "Three options: (A) bank lockbox ($4,200/month, 1-day float), (B) in-house dual-custody ($1,800/month, 2 new staff), (C) ACH migration ($2,600/month, 30% Year 1 adoption). Pacific had 3 employee-theft incidents in 24 months. Analyze which control best balances fraud risk against cost." |

---

## Category 5: Definition-Match Difficulty Inflation (DL-031)

> **Pattern:** Items labeled Moderate (DS=3) or Difficult (DS=4) whose stem is a textbook definition. True difficulty = Easy (DS=1).

### 5.1 P1B-B-120 — Time Series Trend (Pack B, Section B)

| Field | Value |
|-------|-------|
| Labeled | Moderate (DS=3) |
| True | Easy (DS=1) |
| Failure | Stem: "long-term direction of a time series" → answer: "Trend." Definition-match. |
| Redesign | "36-month sales series: upward trend +3.1%/month, seasonal indices [0.82, 1.05, 1.18, 0.95]. Month 37 deseasonalized sales fell 4.2%. Determine whether this indicates trend reversal or irregular component." |

### 5.2 P1-FC-030 — CIA Triad (Pack C, Section F)

| Field | Value |
|-------|-------|
| Labeled | Moderate (DS=3) |
| True | Easy (DS=1) |
| Failure | Stem spells out "confidentiality... integrity... availability" → answer: "CIA triad." Pure recognition. |
| Redesign | "Hospital experienced: (1) unauthorized pharmacy employee viewed 47 celebrity records, (2) database corruption made 3 days of lab results unreadable, (3) PACS offline 6 hours during ransomware. Classify each by compromised CIA element. Identify highest HIPAA regulatory risk." |

### 5.3 P1-CD-050 — Goal Congruence (Pack D, Section C)

| Field | Value |
|-------|-------|
| Labeled | Moderate (DS=3) |
| True | Easy (DS=1) |
| Failure | Stem: "best interest of the company as a whole" → answer: "goal congruence." |
| Redesign | "Division A transfers at full cost +15%. Division B says this makes internal purchases $7/unit more than external. A says markup covers fixed costs. Analyze whether this transfer pricing policy promotes goal congruence. Quantify per-unit impact if A has 8,000 units of idle capacity." |

### 5.4 P1E-F-050 — ELT vs ETL (Pack E, Section F)

| Field | Value |
|-------|-------|
| Labeled | Moderate (DS=3) |
| True | Easy (DS=1) |
| Failure | Acronyms self-describe the distinction (Extract-Load-Transform vs. Extract-Transform-Load) |
| Redesign | "Thorndale's ETL processes 2.4M daily IoT transactions in 7.3 hours. Data architect proposes ELT switch. Analyze: (a) cloud warehouse transforms 4x faster, (b) ML needs raw data, (c) transformation rules change weekly. Quantify pipeline latency improvement, identify new risks from ELT." |

### 5.5 P1-F-015 — Chart Axis Truncation (Pack A, Section F)

| Field | Value |
|-------|-------|
| Labeled | Analyze / DS=3 |
| True | Understand / Easy (DS=1) |
| Failure | Stem describes truncated vertical axis; answer: textbook warning about axis manipulation |
| Redesign | "Two dashboard versions: Version A (0%-50% axis, margin 34.2%, flat vs. Q2). Version B (28%-38% axis, margin 34.2%, dramatic spike). VP Sales wants B for board. VP Finance insists A. Analyze whether either version is misleading under IMA's competence and credibility standards." |

### 5.6 P1-D-013 — Kaizen Costing (Pack A, Section D)

Also listed in Category 3. Double inflation: Remember labeled as Analyze AND Easy labeled as Moderate.

---

## Summary

| Category | Entries | Packs | Most Severe Pattern |
|----------|---------|-------|---------------------|
| 1. Evaluate→Apply | 6 | B, C | Deterministic rule mislabeled as judgment |
| 2. Evaluate→Remember | 5 | B, C | Definition-match — 3-tier overstatement |
| 3. Analyze→Understand | 5 | A | Taxonomy classification as analysis |
| 4. Analyze→Apply | 5 | A | Formula substitution as analysis |
| 5. Difficulty Inflation | 6 | A, B, C, D, E | Moderate label on Easy definition-recall |
| **Total** | **28** | **All 5** | **Definition-match is the #1 inflation vector** |

### Key Rules for Part 2 Authors

1. **Never write a stem that paraphrases the correct answer term.** If a candidate can answer by recognizing a definition, the item is Remember — not Analyze, not Evaluate.
2. **"Which response is most appropriate?" is a red flag.** This generic phrasing disguises single-step Apply/Understand as higher-order.
3. **Evaluate requires E1+E2+E3.** Named decision-maker + competing defensible alternatives + selection rationale beyond rule compliance.
4. **Analyze requires >=2 of A1-A4.** Decomposition, cause-effect, pattern recognition, or comparative analysis.
5. **Difficulty <= 2 with Analyze/Evaluate = automatic failure (AF-A5, AF-E5).**

---

*Generated: 2026-07-31 | S122 Phase 2 | Read-Only Research*
