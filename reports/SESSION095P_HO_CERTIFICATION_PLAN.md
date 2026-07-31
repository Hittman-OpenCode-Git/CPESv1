# Session 95P — Higher-Order Certification Framework Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** ACTIVE
**Data Sources:** Session 92P (Cognitive Drift Analysis), Session 93P (Evaluate + Analyze Audits), CAQS v1.0 §6.2

---

## 1. Problem Statement

Session 93P found that **58.7% of higher-order (Analyze + Evaluate) items are misclassified.** The 528 items currently labeled as Analyze or Evaluate represent only ~219 genuine higher-order items (8.6% of 2,545). The overstatement is 309 items — 12.1 percentage points.

The root cause is not malicious. The modernization program (S61–S91) successfully expanded coverage, but lacked a formal certification framework to distinguish genuine cognitive upgrades from superficial re-labeling. Without a framework, the same misclassification patterns will reproduce as modernization continues toward the CAQS 40% higher-order target.

## 2. Scope

This framework covers:

- **True cognitive level definitions** for Remember, Understand, Apply, Analyze, Evaluate with explicit acceptance criteria
- **Automatic failure conditions** that block items from carrying Analyze/Evaluate labels
- **Misclassification patterns** identified from Sessions 92P and 93P with detection rules
- **Review workflow** for pre-certification cognitive audit
- **QA checklist** for Human Author review before certification

This framework does **not** cover:
- Item-level remediation or rewriting (delegated to future implementation sessions)
- Difficulty calibration (covered by DL-031, DL-032)
- Distractor quality (covered by CAQS §4)
- Explanation quality (covered by CAQS §4)
- Blueprint alignment (covered by CAQS §1)

## 3. Governing Standard

The authoritative cognitive taxonomy is Bloom's Revised Taxonomy, as adopted by the IMA CMA Part 1 Content Specification Outline. Per CAQS v1.0 §6.2, the target distribution is:

| Cognitive Level | Target % | Intended For |
|----------------|----------|-------------|
| Remember | 5% | Definitions, terms, standards identification |
| Understand | 15% | Concept explanation, interpretation |
| Apply | 40% | Calculations, procedure execution |
| Analyze | 25% | Data interpretation, variance analysis, trend identification |
| Evaluate | 15% | Professional judgment, recommendation |

## 4. Cognitive Level Definitions with Acceptance Criteria

### 4.1 Remember

**Definition:** Candidate retrieves relevant knowledge from long-term memory.

**MUST contain at least one of:**
- [ ] Question asks to identify or recognize a term, definition, framework element, or standard
- [ ] Answer is a specific term, label, or name that matches a definition in the stem
- [ ] No calculation, interpretation, or comparison required

**AUTOMATIC FAILURE:** If the stem-to-correct-choice lexical overlap exceeds 40%, the item is Remember at most — it cannot be labeled Understand, Apply, Analyze, or Evaluate.

### 4.2 Understand

**Definition:** Candidate constructs meaning from instructional messages.

**MUST contain at least one of:**
- [ ] Question asks to explain, classify, summarize, or interpret a concept
- [ ] Multiple concepts must be compared, contrasted, or categorized
- [ ] Answer requires paraphrasing or interpretation, not just term retrieval

**AUTOMATIC FAILURE:** If the stem defines a term and the answer is the term name, the item is Remember — not Understand.

### 4.3 Apply

**Definition:** Candidate carries out or uses a procedure in a given situation.

**MUST contain at least one of:**
- [ ] Known formula, procedure, or framework is executed with provided data
- [ ] Calculation is performed (single-step or multi-step)
- [ ] Known standard is applied to a described situation

**AUTOMATIC FAILURE for Analyze/Evaluate:** If the item requires only formula substitution, rule application, or procedure execution, it is Apply at most — it cannot be Analyze or Evaluate, regardless of framing language.

### 4.4 Analyze

**Definition:** Candidate breaks material into constituent parts and determines how parts relate to one another and to an overall structure or purpose.

**MUST contain at least two of:**
- [ ] **Decomposition** — Item requires breaking down data or a situation into components
- [ ] **Cause-effect reasoning** — Item requires identifying WHY something happened, not just THAT it happened
- [ ] **Pattern recognition** — Item requires detecting a trend, anomaly, or relationship across multiple data points
- [ ] **Comparative analysis** — Item requires contrasting multiple entities, methods, or outcomes on multiple dimensions

**AUTOMATIC FAILURE:**
- [ ] If stem defines a term and the answer is the term name → **Remember** (not Analyze)
- [ ] If the item requires only formula execution with provided numbers → **Apply** (not Analyze)
- [ ] If the item requires only identifying the correct category for a described item → **Apply** (not Analyze)
- [ ] If the item requires only recalling what a framework element covers → **Understand** (not Analyze)

### 4.5 Evaluate

**Definition:** Candidate makes judgments based on criteria and standards.

**MUST contain ALL three minimum criteria PLUS at least one additional:**

**Minimum criteria (all required):**
- [ ] **Decision maker** — A specific stakeholder role must make a judgment call (not "calculate" or "identify" or "classify")
- [ ] **Competing alternatives** — At least two defensible options must be presented or implied; the correct answer is not deterministic from a single rule
- [ ] **Selection rationale** — The item requires choosing the *best* option from alternatives, not the *only* option that satisfies a rule

**Additional criteria (at least one required):**
- [ ] **Trade-off analysis** — Multiple competing objectives exist and the candidate must weigh them (e.g., quality vs. cost, risk vs. return, short-term vs. long-term)
- [ ] **Professional judgment** — The correct answer requires judgment beyond known formula/rule application; reasonable professionals could debate the outcome
- [ ] **Criteria application** — The item requires applying a multi-factor evaluative framework where the relative weight of factors must be determined by the candidate

**AUTOMATIC FAILURE:**
- [ ] If the stem defines a term and the answer is the term name → **Remember** (not Evaluate)
- [ ] If the item requires only formula execution → **Apply** (not Evaluate)
- [ ] If the item requires only identifying what a COSO principle or ASC standard requires → **Apply** (not Evaluate)
- [ ] If the item requires only classifying a described control or activity → **Apply** (not Evaluate)
- [ ] If there is only one correct answer under known standards and no reasonable alternative → **Apply** or **Analyze** (not Evaluate)
- [ ] If difficulty is Easy → impossible for Evaluate; at minimum the difficulty should be Moderate

## 5. Automatic Failure Conditions — Cross-Cutting

These conditions block Analyze/Evaluate classification regardless of other attributes.

| # | Condition | True Level | Detection Rule |
|---|-----------|------------|----------------|
| AF-1 | Definition-match: stem defines term, answer is the term | Remember | Stem→CorrectChoice lexical overlap >40% |
| AF-2 | Formula substitution: known formula + provided numbers + one-step result | Apply | Calculate-compute-find verb + single arithmetic step |
| AF-3 | Rule application: deterministic known standard applied to described situation | Apply | "Which treatment does ASC [X] require?" or "Under [framework], what is [X]?" |
| AF-4 | Classification: described control/activity/cost matched to taxonomy label | Apply | "What type of [control/cost] is described?" |
| AF-5 | Difficulty mismatch: Evaluate at Easy; Analyze at Moderate-Easy or below | Mislabeled | Difficulty≤2 + CognitiveLevel∈{Analyze, Evaluate} |
| AF-6 | Single correct option: only one choice satisfies the governing rule | Apply or Analyze | All distractors are clearly wrong under known standard |

## 6. Misclassification Patterns (from S92P / S93P)

### 6.1 ASC Application as Evaluation (Pattern 1)

**Example:** P1-A-012 — "Accrue $520K for Claim 1 only. Claim 1 is probable (75%) and reasonably estimable..."
- Label: Evaluate | True: Apply
- Reason: Deterministic application of ASC 450's probable-and-reasonably-estimable framework. No competing alternatives.

### 6.2 Formula Substitution as Evaluation/Analyze (Pattern 2)

**Example:** P1B-C-143 — "EVA = NOPAT − (12% × invested capital)"
- Label: Evaluate | True: Apply
- Reason: Known formula. Plug numbers. One-step.

### 6.3 Definition-Matching as Evaluation/Analyze (Pattern 3)

**Example:** P1-EC-005 — "Assigning different employees to authorize, record, and reconcile..."
- Label: Evaluate | True: Remember
- Reason: Stem defines segregation of duties; answer is the concept name.

### 6.4 Control Classification as Evaluation/Analyze (Pattern 4)

**Example:** P1-EC-020 — "A locked warehouse with badge access is what type of control?"
- Label: Evaluate | True: Remember
- Reason: One-step classification into "preventive physical control."

### 6.5 Procedure Execution as Analyze (Pattern 5)

**Example:** P1-A-039 — "Compute straight-line depreciation: ($124,800 − $12,000) / 7"
- Label: Analyze | True: Apply
- Reason: Known formula. One-step substitution. No interpretation.

### 6.6 COSO Classification as Analyze (Pattern 6)

**Example:** P1-ED-046 — "Ethics training and code of conduct acknowledgment supports which COSO component?"
- Label: Analyze | True: Apply
- Reason: Known taxonomy applied to described activity. Deterministic answer.

## 7. Genuine Higher-Order Exemplars

### 7.1 Genuine Evaluate (from S93P Evaluate Audit)

| QID | Topic | Why It's True Evaluate |
|-----|-------|----------------------|
| P1-B-085 | Sourcing strategy | Four competing strategies with explicit multi-factor trade-offs (bulk discount vs JIT vs status quo vs hybrid) |
| P1-B-030 | Supplier selection | Four alternatives with genuine trade-offs across price, quality, delivery reliability, payment terms |
| P1-F-069 | Technology investment | Competing deployment strategies across three business domains with cost-benefit analysis |
| P1-BD-005 | Variance investigation policy | Four competing policy designs with trade-offs in sensitivity, cost, and anti-gaming |

### 7.2 Genuine Analyze (from S93P Analyze Audit)

| QID | Topic | Why It's True Analyze |
|-----|-------|----------------------|
| P1-B-022 | Learning curve deviation | 5-batch trend requires distinguishing progressive deterioration from random fluctuation — genuine pattern recognition |
| P1-D-015 | COQ analysis | Classify costs into COQ categories, compute prevention-to-failure ratio, interpret underinvestment signal — multi-step decomposition |
| P1-ED-013 | IT-dependent manual control | Decompose control to identify why transaction splitting circumvents single-attribute threshold — cause-effect analysis |
| P1B-F-108 | SOC 2 findings | Classify findings against trust services criteria, evaluate which combination affects audit reliance — multi-factor analytical evaluation |

## 8. Review Workflow (Refer to SESSION095P_REVIEW_WORKFLOW.md)

The certification framework enforces a 4-stage review pipeline:

1. **Stage 1: Cognitive Classification** — Independent bloom's level assessment using this framework's rubrics
2. **Stage 2: Automatic Failure Gate** — AF-1 through AF-6 checks
3. **Stage 3: Evidence Collection** — Document which criteria are met with specific evidence from the item
4. **Stage 4: Certification Decision** — Certify only if all required criteria pass AND no AF conditions trigger

## 9. Strategic Implications

### 9.1 The "Volume" Strategy Is Broken at Current Quality Rates

At 41.3% accuracy (S93P finding), a 50-item Evaluate creation campaign produces only ~21 genuine Evaluate items. Quality-first labeling produces immediate accuracy improvement with zero content changes. The most impactful next action is reclassification of the 309 overstated items, not creation of new ones.

### 9.2 Benchmark Sections for Future Campaigns

| Section | Pack | HO Accuracy | Why It Works |
|---------|------|-------------|-------------|
| Section B | Pack D | 71% (Evaluate) | Extensively authored business scenarios with genuine trade-offs |
| Section F | Pack A | 100% (Evaluate) | Technology governance — inherently evaluative domain |
| Section B | Pack A | 83% (Evaluate) | Budgeting strategy with competing alternatives |

### 9.3 Risk Sections for Remediation

| Section | Pack | HO Accuracy | Primary Problem |
|---------|------|-------------|-----------------|
| Section EC | Pack C | 0% Evaluate | COSO definitions labeled as Evaluate |
| Section CD | Pack D | 0% Analyze | Cost management definitions as Analyze |
| Section DD | Pack D | 0% Analyze | Cost methods as Analyze |
| Section A | Pack A | 25% Evaluate / 0% Analyze | ASC rules as judgment/analysis |

## 10. Success Criteria for This Session

- [ ] True cognitive level definitions with explicit acceptance criteria documented
- [ ] Automatic failure conditions (AF-1 through AF-6) defined with detection rules
- [ ] Six misclassification patterns identified with examples from S92P/S93P
- [ ] Genuine Evaluate and Analyze exemplars catalogued
- [ ] 4-stage review workflow designed
- [ ] QA checklist for human author review created
- [ ] Framework usable by future modernization and rewrite sessions
- [ ] 0 repository modifications
- [ ] 0 certification state changes
- [ ] No overlap with Session 92, MAY-021, or Session 94P

## 11. Deliverables

| # | Document | Status |
|---|----------|--------|
| 1 | `SESSION095P_HO_CERTIFICATION_PLAN.md` | ACTIVE |
| 2 | `SESSION095P_EVALUATE_RUBRIC.md` | PENDING |
| 3 | `SESSION095P_ANALYZE_RUBRIC.md` | PENDING |
| 4 | `SESSION095P_HO_REVIEW_CHECKLIST.md` | PENDING |
| 5 | `SESSION095P_REVIEW_WORKFLOW.md` | PENDING |
| 6 | `SESSION095P_MISCLASSIFICATION_EXAMPLES.md` | PENDING |
| 7 | `SESSION095P_CLOSEOUT.md` | PENDING |

---

*Generated: 2026-07-31 | Session 95P Planner Phase*
