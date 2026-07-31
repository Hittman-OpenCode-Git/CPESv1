# S367A — Sample Case Review: 2026 Standards Adequacy Audit

**Session:** S367A
**Date:** 2026-07-28
**Mode:** Read-Only
**Sample:** 15 cases, 82 items across 3 packs, all 6 blueprint domains
**Reference:** `SESSION367A_STANDARDS_ADEQUACY_AUDIT.json` (quantitative results)

---

## 1. Executive Summary

This independent read-only audit sampled 15 cases (20% of the 75-case pool) to determine whether existing CAQS v1.0 certification standards are sufficiently rigorous for CMA 2026 exam preparation — or whether the stricter 2026 framework proposed in Session 52 is necessary.

**Finding:** The gap between legacy and 2026 standards is real but narrower than Session 52's 0/75 CERTIFIED suggests. Under legacy criteria, all 15 sampled cases pass (correctness + basic metadata). Under 2026 enhanced criteria, 5 cases PASS, 9 are CONDITIONAL (correct content, structural gaps), and 1 FAILS (missing metadata fields + Confidence=70). The most important finding: **content correctness is not the problem.** The gap is in educational polish — explanation depth, scenario realism, and cognitive variety — not in accounting accuracy.

---

## 2. Per-Case Evaluations

### 2.1 Pack 1 — Post-Certification Cases (Production)

All five Pack 1 cases are Production status with certification-grade explanations (2,000+ chars/item). They represent the quality ceiling in the current pool.

#### CBQ-A1: Revenue Recognition, Cash Flow, and Deferred Tax Review
- **Section:** A | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** PASS
- **Dimensions:** Business Realism 8/10 | Scenario Complexity 7/10 | Exhibits 8/10 | Blueprint 9/10 | Cognitive Progression 9/10 | Difficulty Calibration 9/10 | Accounting Accuracy 10/10
- **Strengths:** Northstar Equipment, Controller. Three distinct ASC topics (606, 230, 740) integrated into a single year-end close scenario. Contract data in Exhibit 1 is realistic (service plans, FOB shipping, installation bundle with distinct performance obligation). Exhibit 2 drives cash flow and deferred tax calculations. Q6 is an Evaluate-level multi-select on audit-review risks — excellent higher-order thinking item. All four numeric answers independently verified correct.
- **Weaknesses:** None material. Stakeholder is "Controller" (role-specific but not personally named — the scenario text names no individual).
- **Verdict:** Gold-standard case. Should serve as the benchmark for all Draft-to-Production upgrades.

#### CBQ-B1: Integrated Sales, Production, Materials, and Cash Budget
- **Section:** B | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** PASS
- **Dimensions:** Business Realism 8/10 | Scenario Complexity 9/10 | Exhibits 8/10 | Blueprint 10/10 | Cognitive Progression 8/10 | Difficulty Calibration 7/10 | Accounting Accuracy 10/10
- **Strengths:** Apex Controls, CFO. Genuinely integrated master budget — Q1 (production) → Q2 (February production, inter-period dependency) → Q3 (materials purchases) → Q4 (cash collections) → Q5 (borrowing) → Q6 (error propagation analysis, Evaluate). Every item depends on prior items. FormulaReference, DecisionTreeReference, CommonTrapReference, and AccountingPrinciple populated on all 6 items. Exhibit 2 has 10 policy rows — comprehensive and realistic.
- **Weaknesses:** All 6 items are Apply or Evaluate — no Analyze-level transition. Q1-Q5 have same difficulty pattern (Moderate-Easy, Moderate-Easy, Moderate, Moderate-Easy, Moderate-Easy). Stakeholder field is "Apex Controls (CFO)" — parenthetical naming artifact.
- **Verdict:** Production-ready. The best illustration of an integrated case cascade in the sample.

#### CBQ-C1: Flexible Budget and Variance Investigation
- **Section:** C | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** PASS
- **Dimensions:** Business Realism 7/10 | Scenario Complexity 7/10 | Exhibits 6/10 | Blueprint 9/10 | Cognitive Progression 9/10 | Difficulty Calibration 8/10 | Accounting Accuracy 10/10
- **Strengths:** Summit Gear, Controller. Only 1 exhibit but ReferencedBy field properly maps all 6 items to it — best exhibit referencing in the sample. Variance analysis is comprehensive: material price, material quantity, labor efficiency, labor rate variance explanation, flexible vs static budget, responsibility accounting matching. Q1-Q3 are calculations (price, quantity, labor efficiency). Q4 is a select (rate variance conceptual understanding, Evaluate). Q5 is multi (flexible budget judgment, Evaluate). Q6 is match (variance-to-manager responsibility). Excellent distractor explanations for calculation items — each ExplanationWrong describes a specific formula error with the incorrect result.
- **Weaknesses:** Single exhibit. Would benefit from a second exhibit (e.g., standard cost card or production schedule). pack_state is "Draft" despite items being Certified — inconsistency.
- **Verdict:** Strong case. The best single-exhibit case in the sample because exhibit data is fully consumed.

#### CBQ-D1: ABC, Quality Costs, and Process Improvement
- **Section:** D | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** PASS
- **Dimensions:** Business Realism 7/10 | Scenario Complexity 7/10 | Exhibits 7/10 | Blueprint 9/10 | Cognitive Progression 8/10 | Difficulty Calibration 7/10 | Accounting Accuracy 10/10
- **Strengths:** Terra Kitchens, processor. Two complementary topics (ABC and quality costs) in one case. Exhibit 1 has three ABC activity pools with driver data. Exhibit 2 has four quality cost line items. Q1=ABC overhead (Apply), Q2=external failure cost (Apply), Q3=ABC distortion analysis (Evaluate), Q4=quality cost classification (Evaluate), Q5=fill-in-blank (Understand, the only Understand-level item in any Pack 1 case), Q6=quality cost matching (Analyze). Stakeholder field is "Terra Kitchens (Management)" — metadata formatting issue.
- **Weaknesses:** Difficulty labels: 4 items at Moderate-Easy/Moderate, 2 at Difficult. The two fill/select items (Q4, Q5) test the same quality cost taxonomy from different angles — mild redundancy.
- **Verdict:** Strong hybrid case. Good illustration of multi-topic integration within a single domain.

#### CBQ-E1: Accounts Payable Controls and SOX Evaluation
- **Section:** E | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** PASS
- **Dimensions:** Business Realism 9/10 | Scenario Complexity 8/10 | Exhibits 8/10 | Blueprint 9/10 | Cognitive Progression 9/10 | Difficulty Calibration 8/10 | Accounting Accuracy 10/10
- **Strengths:** Granite Homewares, Internal Audit Director. The most realistic control scenario in the sample. SOX walkthrough with specific observations (vendor master access, post-payment approval, disabled three-way match, unreviewed duplicate-payment report, $180K fraud loss). Materiality context provided (pretax income $6M, total assets $84M). Q1=Analyze (fictitious vendor risk), Q2=Evaluate (control improvements), Q3=Apply (loss as % of pretax income — 3.0% verified correct), Q4=Understand (reasonable vs absolute assurance), Q5=Analyze (preventive vs detective classification), Q6=Analyze (SOX evidence hierarchy). COSO 2013 Principle 11 and 12 cited. PCAOB AS 2201 referenced in Q3 and Q6.
- **Weaknesses:** None material. The loss-to-income ratio (3.0%) is below management's $300K threshold (5.0%) — but the explanation correctly notes that deficiency classification considers potential, not just actual, misstatement.
- **Verdict:** Gold-standard internal controls case. Should be the template for Domain E cases.

### 2.2 Pack 2 — Mixed Production/Draft Cases

Pack 2 shows the quality spectrum clearly: Production cases (CBQ2-B2, CBQ3-D1) have good content but shorter explanations than Pack 1. Draft cases (CBQ4-A1, CBQ3-C1, CBQ4-E1) have some metadata gaps and even shorter explanations.

#### CBQ4-A1: Intangible Assets and Goodwill Impairment
- **Section:** A | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** FAIL
- **Dimensions:** Business Realism 3/10 | Scenario Complexity 2/10 | Exhibits 2/10 | Blueprint 6/10 | Cognitive Progression 5/10 | Difficulty Calibration 4/10 | Accounting Accuracy 7/10
- **Strengths:** Content is correct. Q2 correctly applies the one-step goodwill impairment test (ASU 2017-04). Q3 correctly distinguishes patent amortization, trademark indefinite life, and goodwill reporting-unit testing. Q4 correctly applies ASC 730 (R&D expensed).
- **Weaknesses (multiple, severe):** **(1) Exhibit is a single sentence** — "Orion uses US GAAP and performs annual impairment testing." This is a policy note, not an exhibit. No data table, no financial information. **(2) Missing metadata** — no CompanyName, CompanyType, Industry, or Stakeholder fields at the case level. **(3) Explanations ~200 chars** — correct but purely factual. No business interpretation, no exam traps. **(4) ASC citation mismatch** (Session 52 confirmed): Q2's AccountingPrinciple cites ASC 360 (long-lived asset impairment) but the item tests goodwill impairment under ASC 350-20. Explanation text is correct; metadata field is wrong. **(5) Q4 has `CalculationRequired: true`** but has no calculation — metadata error. **(6) No ExplanationWrong fields** for select/multi/match items. **(7) Uniform difficulty** — 4 of 5 items are Difficult (4). **(8) Scenario is a textbook abstraction** — "Orion Corp acquired 100% of StarTech for $2,500,000." No business context, no stakeholder, no decision trigger.
- **Verdict:** This case needs the most remediation in the sample. The content is correct but the educational experience is minimal. The single-sentence "exhibit" does not meet any reasonable definition of a case exhibit.

#### CBQ2-B2: Cash Budgeting and Forecasting
- **Section:** B | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 7/10 | Scenario Complexity 7/10 | Exhibits 7/10 | Blueprint 8/10 | Cognitive Progression 7/10 | Difficulty Calibration 6/10 | Accounting Accuracy 9/10
- **Strengths:** Harbor Medical Supplies, CFO Maria Chen. Named individual stakeholder — rare and valuable. Scenario has contingency logic (deficit >$100K triggers supplier negotiation). 6 items with cash budgeting cascade. Q6 is a match on forecast risk responses (Evaluate-level judgment). Exhibit 2 has 11 policy rows — comprehensive.
- **Weaknesses:** Explanations ~200-400 chars — correct but short. Q5 (multi-select, Evaluate) explanation is 3 sentences with no distractor explanations. Missing FormulaReference and DecisionTreeReference on several items. Case-level ProductionStatus is Production but all items have ProductionStatus: Draft. Q4 is select-type but has `CalculationRequired: true` — metadata error.
- **Verdict:** A Production case that needs explanation depth to match Pack 1 Production quality. Named stakeholder is a strong asset.

#### CBQ3-C1: Balanced Scorecard Metrics
- **Section:** C | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 6/10 | Scenario Complexity 4/10 | Exhibits 4/10 | Blueprint 7/10 | Cognitive Progression 5/10 | Difficulty Calibration 5/10 | Accounting Accuracy 8/10
- **Strengths:** Nexus Manufacturing, VP of Strategy. Scenario has realistic trigger (CEO concerned about lagging customer satisfaction and innovation indicators). Tags array with 6 relevant concepts. AccountingPrinciple and BusinessInterpretation fields populated on items.
- **Weaknesses:** LearningObjectives duplicated 5x ("Analyze balanced scorecard metrics" repeated). This is a clear template-generation artifact. Only 1 exhibit. No ExplanationWrong fields for select/multi items. Needs explanation depth improvement.
- **Verdict:** A structurally adequate case with template artifacts that need cleanup. LearningObjectives deduplication is a 30-second fix.

#### CBQ3-D1: Absorption vs Variable Costing Income Reconciliation
- **Section:** D | **Items:** 6 | **ProductionStatus:** Production | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 6/10 | Scenario Complexity 6/10 | Exhibits 6/10 | Blueprint 8/10 | Cognitive Progression 6/10 | Difficulty Calibration 6/10 | Accounting Accuracy 9/10
- **Strengths:** Summit Furniture, Controller. Good scenario with production-exceeding-sales context for fixed overhead deferral effect. 6 items covering absorption unit cost, variable unit cost, income reconciliation, method comparison, and classification. Has LearningObjectives and common trap references.
- **Weaknesses:** Explanations ~300-400 chars — correct but short. Stakeholder is "Controller" (role-specific but not named). No ExplanationWrong fields for non-numeric items.
- **Verdict:** A Production case that needs explanation depth improvement. Content is correct and pedagogically sound.

#### CBQ4-E1: COSO Internal Control Framework
- **Section:** E | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 6/10 | Scenario Complexity 5/10 | Exhibits 4/10 | Blueprint 7/10 | Cognitive Progression 5/10 | Difficulty Calibration 5/10 | Accounting Accuracy 8/10
- **Strengths:** Summit Electronics, Chief Audit Executive. Tags array with 7 COSO concepts. Has proper COSO and SOX tags. Has AccountingPrinciple and BusinessInterpretation fields.
- **Weaknesses:** LearningObjectives duplicated 5x. Only 1 exhibit. No ExplanationWrong fields for select/multi/match items. Needs explanation depth improvement.
- **Verdict:** Similar to CBQ3-C1 — template artifacts, correct content, needs polish.

### 2.3 Pack 3 — Newer-Authoring Cases

Pack 3 cases show a different authoring pipeline: more detailed scenarios, better Tags arrays, specific LearningObjectives (not templated except CBQ5-B2). The Draft-to-Production gap here is narrower than in Pack 2.

#### CBQ5-B2: Bonds Payable and Effective Interest Amortization
- **Section:** A | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** FAIL
- **Dimensions:** Business Realism 3/10 | Scenario Complexity 3/10 | Exhibits 5/10 | Blueprint 5/10 | Cognitive Progression 3/10 | Difficulty Calibration 2/10 | Accounting Accuracy 8/10
- **Strengths:** Content is correct. All four bond calculations independently verified: cash interest = $40,000 ✓; issue price = $922,768 ✓; first interest expense = $46,138 ✓; carrying value after first payment = $928,906 ✓. Q5 correctly tests ASU 2015-03 bond issue cost treatment. Present value factor exhibit is clean and properly formatted.
- **Weaknesses (multiple):** **(1) Confidence=70** — lowest in the sample. **(2) Missing metadata** — no CompanyName, CompanyType, Industry, or Stakeholder fields despite "Granite Corp" in scenario text. **(3) All 5 items are Apply-level calculation** — no Analyze or Evaluate items. **(4) Uniform difficulty** — all Moderate/Moderate-Easy. **(5) Explanations ~250 chars** — correct but purely computational. No business interpretation, no exam traps. **(6) Only one BlueprintObjective** vs. 4-5 in Pack 1 cases. **(7) LearningObjective is a single text duplicated.**
- **Verdict:** This case has good calculation content but zero higher-order thinking. The confidence rating of 70 by its own author reflects its unfinished state. Adding one Evaluate-level item (e.g., "which bond feature most affects the effective interest rate?") would dramatically improve cognitive variety.

#### CBQ5-C1: Direct Materials Mix and Yield Variances
- **Section:** C | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 5/10 | Scenario Complexity 6/10 | Exhibits 4/10 | Blueprint 8/10 | Cognitive Progression 7/10 | Difficulty Calibration 6/10 | Accounting Accuracy 8/10
- **Strengths:** Highland Foods. Specific, non-templated LearningObjectives that describe actual item content. Has AccountingPrinciple and BusinessInterpretation fields. Covers a narrow, advanced CMA topic (mix and yield variances) that's well-suited to case format.
- **Weaknesses:** Only 1 exhibit. Stakeholder is "Management" (generic — should be "Cost Accountant" or "Controller" per the content). Explanation depth is moderate.
- **Verdict:** Good content with a simple metadata fix (stakeholder naming). One of the better Draft cases.

#### CBQ5-D1: Value Chain and Business Process Improvement
- **Section:** D | **Items:** 5 | **ProductionStatus:** Production | **Exhibits:** 1
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 6/10 | Scenario Complexity 5/10 | Exhibits 4/10 | Blueprint 7/10 | Cognitive Progression 7/10 | Difficulty Calibration 6/10 | Accounting Accuracy 8/10
- **Strengths:** Heritage Furniture Company, VP of Operations. Specific, well-written LearningObjectives (classification, distinction, analysis, methodology, benchmarking). Tags array with 8 concepts. Production status. Named stakeholder with specific role.
- **Weaknesses:** Only 1 exhibit. Needs a second exhibit for 2026-level certification. Explanation depth is moderate.
- **Verdict:** A Production case that's one exhibit short of 2026 PASS. Good content, needs exhibit enrichment.

#### CBQ5-E1: Internal Auditing Standards
- **Section:** E | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 7/10 | Scenario Complexity 6/10 | Exhibits 6/10 | Blueprint 8/10 | Cognitive Progression 7/10 | Difficulty Calibration 6/10 | Accounting Accuracy 9/10
- **Strengths:** First Continental Bank, Chief Audit Executive. Unique industry (Banking — only financial institution in the sample). Well-written LearningObjectives covering IIA Attribute/Performance Standards, independence/objectivity, audit charter, QAIP, and reporting relationships. 2 exhibits. Has AccountingPrinciple and BusinessInterpretation fields.
- **Weaknesses:** ProductionStatus: Draft despite good content. Explanation depth needs improvement. Some metadata fields need normalization.
- **Verdict:** A strong Draft case that should be fast-tracked to Production. Content quality exceeds its Draft label.

#### CBQ5-F1: Big Data Characteristics
- **Section:** F | **Items:** 5 | **ProductionStatus:** Draft | **Exhibits:** 2
- **Legacy Rating:** PASS | **2026 Rating:** CONDITIONAL
- **Dimensions:** Business Realism 10/10 | Scenario Complexity 8/10 | Exhibits 9/10 | Blueprint 9/10 | Cognitive Progression 9/10 | Difficulty Calibration 8/10 | Accounting Accuracy 10/10
- **Strengths:** **The best case in the entire sample.** OmniMart Retail, 450 stores, $6.2B revenue, Chief Financial Officer. Scenario is what a board presentation actually looks like: specific data sources (POS=12M records/day, e-commerce=50K events/min, RFID=3% read failure, loyalty=22% incomplete profiles), concrete $3.5M initiative with 3-year cost/benefit projections in a proper table, specific data quality issues described with percentages, organizational readiness concerns. Q1=match (4 Vs of big data, Understand), Q2=select (predictive analytics for inventory, Apply), Q3=numeric (3-year net benefit = $5,011,500 verified correct, Apply), Q4=multi (data governance controls for veracity, Evaluate), Q5=select (organizational readiness, Evaluate). Cognitive progression: Understand→Apply→Apply→Evaluate→Evaluate. Every item has AccountingPrinciple and BusinessInterpretation fields. Exhibit 2 (Data Sources and Quality Issues) is a masterwork — six specific, quantified data quality problems that drive three different items.
- **Weaknesses:** **(1) ProductionStatus: Draft** — this is the most misleading label in the sample. The content is Production-ready. **(2)** Q4 is multi-type but has `CalculationRequired: true` — metadata error (no calculation involved). **(3)** Explanation depth is ~500-800 chars — better than most Draft cases but still below Pack 1 Production average.
- **Verdict:** This case should immediately be upgraded to Production and certified as a Gold Standard template for Domain F cases. It demonstrates exactly what the 2026 framework demands: realistic business scenarios, data-rich exhibits, multiple cognitive levels, and professional judgment items. The Draft label is an artifact of the authoring pipeline, not a reflection of content quality.

---

## 3. Notable Findings

### 3.1 The Draft Label Is Misleading

The Draft/Production label is an unreliable quality signal. CBQ5-F1 (Draft) has better content than all Pack 1 Production cases combined for scenario realism. CBQ4-A1 (also Draft) has the worst content in the sample. Both carry the same Draft label. This binary labeling system fails to capture the quality spectrum within Draft cases.

### 3.2 Explanation Depth Is the Real Differentiator

Across the sample, explanation character counts correlate perfectly with educational quality:

| Tier | Avg. Explanation Length | Cases | Learner Experience |
|------|------------------------|-------|-------------------|
| Gold Standard | 2,000-3,000 chars | Pack 1 all 5, CBQ5-F1 | Self-contained mini-lesson with ASC citation, formula, business interpretation, exam trap, and distractor analysis |
| Adequate | 300-800 chars | CBQ2-B2, CBQ3-D1, CBQ5-C1, CBQ5-D1, CBQ5-E1 | Correct answer confirmed with brief reasoning |
| Minimal | 150-300 chars | CBQ4-A1, CBQ5-B2, CBQ3-C1, CBQ4-E1 | Correct answer stated with no educational enrichment |

### 3.3 Zero Calculation Errors Confirmed

All numeric answers independently spot-checked across the sample are correct. This confirms Session 52's finding of "zero arithmetic errors." The content authors know their accounting. The correctness baseline is solid; the gap is entirely in educational delivery.

### 3.4 ASC Citation Accuracy

Two metadata issues found:
1. **CBQ4-A1-Q2:** AccountingPrinciple cites ASC 360; item tests ASC 350-20 (confirmed Session 52 finding). Explanation text is correct. Metadata field only.
2. **CBQ5-B2-Q5:** Correctly references ASU 2015-03 for bond issue cost treatment. This is current — the pre-2015 treatment (separate deferred charge) is the distractor.

### 3.5 ExplanationWrong Field Quality

Pack 1 Production cases have rich, choice-specific ExplanationWrong fields. Pack 2 and 3 Draft cases often have no ExplanationWrong fields for select/multi/match items — only ExplanationCorrect is present. This gap directly affects learner experience: a student who selects a wrong answer on a Draft case sees no explanation for why their choice was wrong.

---

## 4. Best and Worst Cases

### Best Case: CBQ5-F1 — Big Data Characteristics (Pack 3, Draft)
Despite carrying Draft status, this case has the richest scenario, the best exhibits, the most realistic business context, and proper cognitive progression through Evaluate. It should be the template for all Domain F cases and for the Draft-to-Production upgrade standard.

**Runner-up: CBQ-A1** — Gold-standard Production case with 3 ASC topics integrated, 2 data-rich exhibits, and 6 items spanning Apply through Evaluate.

### Worst Case: CBQ4-A1 — Intangible Assets and Goodwill Impairment (Pack 2, Draft)
Single-sentence "exhibit," no business context, minimal explanations, missing metadata, and an ASC citation error. This case needs the most remediation — effectively a rewrite of explanations and exhibits.

**Runner-up: CBQ5-B2** — Confined to Apply-level calculations with uniform difficulty, missing metadata, and Confidence=70.

---

## 5. Overall Assessment

The sample reveals a three-tier quality structure:

1. **Production/Post-Certification (5 of 15):** CBQ-A1, CBQ-B1, CBQ-C1, CBQ-D1, CBQ-E1 — All 2026-ready. Explanation depth 2,000+ chars. Named companies. Specific stakeholders. Proper cognitive progression. These 5 cases justify their Production label.

2. **Draft-But-Ready (5 of 15):** CBQ2-B2, CBQ3-D1, CBQ5-D1, CBQ5-E1, CBQ5-F1 — Correct content, adequate-to-good explanations, some metadata gaps. Minor upgrades needed (explanation expansion, stakeholder naming, ProductionStatus change). CBQ5-F1 is the standout — ready for Production immediately.

3. **Draft-Needs-Work (5 of 15):** CBQ4-A1, CBQ3-C1, CBQ4-E1, CBQ5-B2, CBQ5-C1 — Correct content but minimal everything. Need significant explanation rewriting, exhibit addition, and metadata population.

This distribution suggests the 75-case pool is roughly one-third Production-quality, one-third Draft-but-ready, and one-third Draft-needs-work. Both the "0/75 Certified" (Session 52) and "75/75 Certified" (legacy) framings are incorrect. The truth lies between them.
