# Session 95P — Misclassification Examples

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Data Sources:** Session 92P Cognitive Drift Analysis, Session 93P Evaluate Audit, Session 93P Analyze Audit

---

## 1. Purpose

This document catalogs concrete misclassification examples discovered by Sessions 92P and 93P. Each example includes the QID (anonymized as pattern type), the false label, the true cognitive level, the misclassification pattern, and a brief explanation of why it fails. These examples serve as training references for future reviewers and as test cases for the automatic failure gates defined in the Evaluate and Analyze Rubrics.

---

## 2. Evaluate Misclassification Examples

### Example EV-1: ASC Rule Application as Evaluate

| Attribute | Value |
|-----------|-------|
| **Pattern** | Deterministic GAAP application framed as "judgment" |
| **False Label** | Evaluate |
| **True Level** | Apply |
| **AF Triggered** | AF-E3 (Deterministic Rule Application) |
| **Stem Pattern** | "Company X is sued. Legal estimates 75% probability of losing $500K. Which correctly describes the required accounting treatment?" |
| **Why It Fails** | ASC 450's probable-and-reasonably-estimable framework is deterministic. If probable AND estimable → accrue. If only one → disclose. If neither → no action. The candidate applies known rules to a described fact pattern. There are no competing alternatives or trade-offs. |
| **What Would Make It Evaluate** | "The controller must recommend whether to accrue, disclose, or take no action, considering the trade-off between conservative financial reporting and minimizing the risk of a restatement if the case settles for an unexpected amount." |

---

### Example EV-2: Formula Substitution as Evaluate

| Attribute | Value |
|-----------|-------|
| **Pattern** | Single-step formula execution labeled as "evaluation" |
| **False Label** | Evaluate |
| **True Level** | Apply |
| **AF Triggered** | AF-E2 (Formula Substitution) |
| **Stem Pattern** | "Calculate the economic value added. NOPAT = $140K, invested capital = $900K, WACC = 12%." |
| **Why It Fails** | EVA = NOPAT − (WACC × invested capital) is a known formula. The candidate plugs three numbers into one formula. One computational step. No selection between alternatives. No trade-off. No judgment. |
| **What Would Make It Evaluate** | "The CFO must decide whether to invest in a project with projected EVA of $32K versus returning capital to shareholders at 8% after-tax return, considering the project's strategic importance to entering a new market segment." |

---

### Example EV-3: Definition-Matching as Evaluate

| Attribute | Value |
|-----------|-------|
| **Pattern** | Textbook definition in stem, term name in correct answer, labeled Evaluate |
| **False Label** | Evaluate |
| **True Level** | Remember |
| **AF Triggered** | AF-E1 (Definition Match) |
| **Stem Pattern** | "Assigning different employees to authorize transactions, record transactions, and reconcile accounts is an example of:" |
| **Why It Fails** | The stem is the textbook definition of "segregation of duties." The correct answer is the term. Lexical overlap between stem and correct choice exceeds 50%. No application, no analysis, no evaluation — pure retrieval. This is the most severe class of misclassification: 4 tiers above true level. |
| **What Would Make It Evaluate** | "CFO Maria Chen is reviewing the accounting department structure. The current structure has the same employee authorizing purchase orders and reconciling vendor statements. She considers three reorganization options. Recommend the best structure considering cost, control effectiveness, and operational efficiency." |

---

### Example EV-4: Control Classification as Evaluate

| Attribute | Value |
|-----------|-------|
| **Pattern** | One-step taxonomy classification labeled Evaluate |
| **False Label** | Evaluate |
| **True Level** | Remember |
| **AF Triggered** | AF-E4 (Classification/Taxonomy Matching) |
| **Stem Pattern** | "A locked warehouse with badge access for authorized personnel only is an example of what type of control?" |
| **Why It Fails** | One-step classification into COSO control categories. Physical access control + badge restriction = "Preventive physical control." The candidate recalls the COSO control types and matches the description to the category. No competing alternatives. No trade-offs. No judgment. |
| **What Would Make It Evaluate** | "The warehouse manager proposes upgrading from badge-only access to biometric+facial recognition at a cost of $120K. The controller must recommend whether to proceed, considering the value of inventory at risk ($4.2M), the current shrinkage rate (1.8%), the estimated shrinkage reduction (0.6%), and the impact on warehouse throughput (15-second additional delay per entry)." |

---

### Example EV-5: Participate Budgeting as Evaluate

| Attribute | Value |
|-----------|-------|
| **Pattern** | Concept comprehension with "evaluate" framing |
| **False Label** | Evaluate |
| **True Level** | Apply |
| **AF Triggered** | AF-E3 (Deterministic Rule Application) |
| **Stem Pattern** | "Which of the following best describes participative budgeting?" |
| **Answer** | "Greater goal congruence and motivation" |
| **Why It Fails** | Textbook concept matching. The candidate identifies the known benefit of participative budgeting. No competing alternatives are evaluated. No trade-off is weighed. No decision is made. |
| **What Would Make It Evaluate** | "The Division VP wants to move from top-down to participative budgeting but the Controller warns about budget slack. Recommend whether to adopt participative budgeting for the upcoming cycle, weighing motivational benefits against the risk of inflated targets in a division with a history of 12%+ budget slack." |

---

## 3. Analyze Misclassification Examples

### Example AN-1: Formula Substitution as Analyze

| Attribute | Value |
|-----------|-------|
| **Pattern** | Single-step formula execution labeled Analyze |
| **False Label** | Analyze |
| **True Level** | Apply |
| **AF Triggered** | AF-A2 (Formula Substitution) |
| **Stem Pattern** | "Compute straight-line depreciation: equipment cost $124,800, salvage value $12,000, useful life 7 years." |
| **Why It Fails** | Known formula: (Cost − Salvage) / Useful Life. One-step substitution: ($124,800 − $12,000) / 7. No decomposition. No cause-effect. No pattern recognition. No comparison. The candidate applies a known formula. |
| **What Would Make It Analyze** | "A company uses straight-line depreciation but is considering switching to double-declining balance for tax purposes and units-of-production for internal reporting. Analyze the impact of each method on Year 1 net income, Year 5 net income, and total 7-year depreciation, and identify which stakeholder group benefits from each approach." |

---

### Example AN-2: Variance Formula as Analyze

| Attribute | Value |
|-----------|-------|
| **Pattern** | Standard variance formula execution labeled Analyze |
| **False Label** | Analyze |
| **True Level** | Apply |
| **AF Triggered** | AF-A3 (Procedure Execution) |
| **Stem Pattern** | "Calculate the fixed overhead volume variance: Budgeted FOH = $240K, Applied FOH = $192K." |
| **Why It Fails** | Fixed overhead volume variance = Budgeted FOH − Applied FOH = $48K U. One formula, two inputs. The candidate executes a single computation. No interpretation of what caused the variance, whether it matters, or how it relates to capacity utilization. |
| **What Would Make It Analyze** | "The fixed overhead volume variance is $48K unfavorable. Budgeted production was 12,000 units at $20/unit fixed overhead; actual production was 9,600 units. Analyze whether the variance is driven by lower-than-expected demand, production inefficiency, or an overly optimistic budget. Which factor is the primary driver?" |

---

### Example AN-3: Definition-Matching as Analyze

| Attribute | Value |
|-----------|-------|
| **Pattern** | Textbook definition matches term label — labeled Analyze |
| **False Label** | Analyze |
| **True Level** | Remember |
| **AF Triggered** | AF-A1 (Definition Match) |
| **Stem Pattern** | "A method of expressing each line item on a financial statement as a percentage of a base amount, such as total assets or net sales, is known as:" |
| **Why It Fails** | The stem is the textbook definition of common-size (vertical) analysis. Lexical overlap between stem and correct choice ("common-size analysis" / "vertical analysis") exceeds 50%. Pure retrieval. Two tiers above true level. |
| **What Would Make It Analyze** | "Using the income statement provided, perform a common-size analysis and identify which expense category has grown disproportionately over the three-year period. What operational change likely explains this pattern?" |

---

### Example AN-4: Kaizen Costing Definition as Analyze

| Attribute | Value |
|-----------|-------|
| **Pattern** | Cost method definition labeled Analyze |
| **False Label** | Analyze |
| **True Level** | Remember |
| **AF Triggered** | AF-A1 (Definition Match) |
| **Stem Pattern** | "A costing approach that sets ongoing cost reduction targets for existing products with gradual, continuous improvement is known as:" |
| **Why It Fails** | The stem defines "kaizen costing." Lexical overlap is high ("ongoing cost reduction targets," "gradual improvement" → "Kaizen costing" + "continuous improvement"). The candidate recalls a term. No decomposition, cause-effect, pattern, or comparison. |
| **What Would Make It Analyze** | "Over three quarters, Kaizen costing targets reduced per-unit cost from $48.20 to $46.80 to $45.90. Analyze the diminishing rate of improvement: is this caused by diminishing returns to process improvement, increasing raw material costs offsetting gains, or an overly aggressive initial target that exhausted easy wins first?" |

---

### Example AN-5: COSO Classification as Analyze

| Attribute | Value |
|-----------|-------|
| **Pattern** | COSO framework classification labeled Analyze |
| **False Label** | Analyze |
| **True Level** | Apply |
| **AF Triggered** | AF-A4 (Taxonomy Classification) |
| **Stem Pattern** | "Annual ethics training for all employees and acknowledgment of the code of conduct supports which component of the COSO Internal Control Framework?" |
| **Why It Fails** | Known COSO taxonomy applied to a described activity: ethics training → Control Environment. The candidate applies a framework to classify an activity. Deterministic answer. No decomposition or interpretation. |
| **What Would Make It Analyze** | "An organization conducts annual ethics training (Control Environment), performs quarterly risk assessments (Risk Assessment), and reconciles bank accounts monthly (Control Activities). Despite these controls, a $340K fraud was undetected for 18 months. Analyze which component breakdown most likely explains the control failure and why the existing controls did not prevent or detect it." |

---

## 4. Genuine Higher-Order Examples (Positive Controls)

### Evaluate Exemplar: Multi-Factor Supplier Selection

| Attribute | Value |
|-----------|-------|
| **QID** | P1-B-030 |
| **Label** | Evaluate |
| **True Level** | Evaluate |
| **Why It Works** | Four supplier alternatives with genuine trade-offs across price (Supplier A: lowest), quality (Supplier B: highest), delivery reliability (Supplier C: best), and payment terms (Supplier D: most favorable). No single factor deterministically wins. The correct answer requires weighing multiple dimensions against a specific business context. |
| **Criteria Met** | E1 (Decision Maker): Controller must recommend. E2 (Competing Alternatives): All four defensible depending on priorities. E3 (Selection Rationale): Weighs trade-offs. E4 (Trade-Offs): Price vs. quality vs. delivery vs. terms. |

---

### Evaluate Exemplar: Investigation Policy Design

| Attribute | Value |
|-----------|-------|
| **QID** | P1-BD-005 |
| **Label** | Evaluate |
| **True Level** | Evaluate |
| **Why It Works** | Four competing variance investigation policy designs with genuine trade-offs: Policy A (sensitive — catches more variances, high investigation cost), Policy B (conservative — catches only large variances, low cost, misses real problems), Policy C (anti-gaming — prevents manipulation but complex to administer), Policy D (balanced). No formula determines which is best. |
| **Criteria Met** | E1: Controller must recommend. E2: Each policy design is defensible for different organizational priorities. E3: Multi-factor evaluation. E4: Sensitivity vs. cost vs. anti-gaming. E5: No deterministic formula. |

---

### Analyze Exemplar: Learning Curve Deviation Pattern

| Attribute | Value |
|-----------|-------|
| **QID** | P1-B-022 |
| **Label** | Analyze |
| **True Level** | Analyze |
| **Why It Works** | Five-batch production time series: 100, 80, 72, 68, 74 hours. The candidate must identify whether the 74-hour Batch 5 represents progressive deterioration (all batches degrading), random fluctuation (normal within expected variance), or a specific process change. Requires decomposing the series, comparing to expected learning curve, and attributing the deviation to a cause. |
| **Criteria Met** | A1 (Decomposition): Five batches individually analyzed. A2 (Cause-Effect): Identifies cause of deviation. A3 (Pattern): Multi-period trend with anomaly detection. |

---

### Analyze Exemplar: COQ Analysis with Ratio Interpretation

| Attribute | Value |
|-----------|-------|
| **QID** | P1-D-015 |
| **Label** | Analyze |
| **True Level** | Analyze |
| **Why It Works** | Costs provided across four COQ categories. Candidate must: (1) classify each cost into prevention/appraisal/internal failure/external failure, (2) compute prevention-to-failure ratio, (3) interpret whether the ratio signals underinvestment or overinvestment in prevention. Multi-step decomposition, classification, calculation, and interpretation. |
| **Criteria Met** | A1 (Decomposition): Costs decomposed into 4 COQ categories. A2 (Cause-Effect): Ratio interpretation signals investment level. A4 (Comparative): Prevention vs. failure categories compared. |

---

## 5. Pattern Frequency (from S93P Samples)

### Evaluate Misclassification Patterns (75-item sample)

| Pattern | Count | % of Sample |
|---------|-------|-------------|
| ASC/Standard Application as Evaluate | ~8 | 10.7% |
| Formula Substitution as Evaluate | ~14 | 18.7% |
| Definition-Matching as Evaluate | ~8 | 10.7% |
| COSO Classification as Evaluate | ~8 | 10.7% |
| Concept Comprehension as Evaluate | ~6 | 8.0% |
| **Total Misclassified** | **44** | **58.7%** |
| Genuine Evaluate | 31 | 41.3% |

### Analyze Misclassification Patterns (75-item sample)

| Pattern | Count | % of Sample |
|---------|-------|-------------|
| Formula Substitution as Analyze | ~13 | 17.3% |
| Definition-Matching as Analyze | ~12 | 16.0% |
| Procedure Execution as Analyze | ~10 | 13.3% |
| Taxonomy Classification as Analyze | ~9 | 12.0% |
| **Total Misclassified** | **44** | **58.7%** |
| Genuine Analyze | 31 | 41.3% |

## 6. Training Guide for Reviewers

### "Smell Test" — If Any of These Are True, the Label Is Probably Wrong

| Smell | What It Signals |
|-------|----------------|
| The stem is a textbook definition | Probably Remember, not Analyze/Evaluate |
| You could answer by Googling the concept name | Probably Remember or Understand |
| The answer is a number from a single formula | Probably Apply |
| The question starts with "Calculate" or "Compute" | Probably Apply |
| "Under [standard/framework], what is..." | Probably Apply |
| There is only one correct answer under GAAP/COSO | Probably Apply |
| The "correct" answer is obvious and distractors are silly | Not Evaluate |
| All four choices could be right depending on priorities | Possibly genuine Evaluate |
| You need to read multiple data points to find a trend | Possibly genuine Analyze |
| The scenario names a specific stakeholder with a decision | Possibly genuine Evaluate |

### When in Doubt: Down-Select, Don't Over-Classify

The cost of misclassifying Apply as Evaluate (false positive) is higher than misclassifying Evaluate as Apply (false negative):
- **False positive:** Inflates metrics, creates a learner expectation gap, blocks accurate reporting
- **False negative:** Under-reports true cognitive depth, but has zero learner-safety impact

Default rule: if you are uncertain between two levels, choose the lower one. Genuine Evaluate items will be clearly identifiable by meeting all E1–E3 core criteria with specific evidence.

---

*Generated: 2026-07-31 | Session 95P Implementer Phase — Misclassification Examples*
