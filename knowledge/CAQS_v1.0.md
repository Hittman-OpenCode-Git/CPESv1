# CMA Content & Assessment Quality Standard (CAQS v1.0)

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Dependencies:** QUESTION_METADATA_STANDARD.md, EXPLANATION_STYLE_GUIDE.md, TAXONOMY_REGISTRY.md
**Applies to:** All MCQ banks, case studies, exhibits, and assessment content in the CMA Part 1 Exam Simulator

---

## 1. Purpose & Scope

### 1.1 Purpose

This document establishes the single quality standard against which every piece of content in the CMA Part 1 Exam Simulator shall be judged. It defines what "exam-ready" means and provides measurable criteria for all content validation, review, and acceptance decisions.

### 1.2 Scope

This standard applies to:

- **MCQ banks** — All standalone multiple-choice questions in `pack_*_corrected.js` files
- **Case studies** — All integrated case scenarios in `scored_cases*.js` files
- **Exhibits** — All data exhibits within case studies
- **Explanations** — All correct-answer and distractor explanations
- **Metadata** — All fields defined in QUESTION_METADATA_STANDARD.md
- **Numerical content** — All calculations, formulas, and numeric answers
- **Traceability records** — Blueprint mappings linking every question to official learning outcomes
- **Analytics fields** — Historical performance data when available

### 1.3 Alignment Requirements

All content must align with:

- Current IMA CMA Part 1 Content Specification Outline (effective September 1, 2024)
- U.S. GAAP as codified in the FASB Accounting Standards Codification (ASC)
- COSO Internal Control — Integrated Framework (2013)
- COSO Enterprise Risk Management — Integrating with Strategy and Performance (2017)
- IMA Statement of Ethical Professional Practice

### 1.4 AI Philosophy — Build-Time vs. Runtime Authority

The single global rule "AI never determines correctness, scoring, formulas, or blueprint mapping" was historically applied without scope distinction. This standard replaces it with two scoped rules reflecting the temporal separation between development and delivery:

**Runtime AI (learner-facing, future AI Review Engine):** Never determines correctness, scoring, formulas, or blueprint mapping. Scoring authority lives with the application. Explanation and synthesis authority lives with the runtime AI. This preserves deterministic, defensible scoring for the learner.

**Build-time AI (development-phase audit and content verification):** Actively verifies question correctness, precision, difficulty calibration, distractor engineering, blueprint alignment, and CMA Part 1 exam relevance. Build-time AI is expected to challenge the answer key, cross-reference against authoritative accounting sources, and flag defects. Final revision authority remains human, but AI verification is a required input to the audit loop, not a prohibited one.

The separation is temporal, not architectural. During development, AI verifies rigorously so that at runtime the shipped answer keys are trustworthy enough to grade deterministically.

### 1.6 Build-Time AI Verification Standard

Every question in the CAQS audit loop must receive build-time AI verification across the following six dimensions before it can be designated Exam-Ready. Verification results are non-binding recommendations; final revision authority remains human.

| Dimension | Requirement | What AI Verifies |
|-----------|-------------|------------------|
| 1. Correctness | Against GAAP / IFRS / ICMA CSO / standard managerial accounting | The answer key, explanation, and distractors are consistent with authoritative accounting standards |
| 2. Precision | Internal consistency, unambiguous fact pattern | The fact pattern yields exactly one defensible answer; no missing assumptions or contradictory data |
| 3. Difficulty Calibration | Matches stated tier and LOS depth verb | The cognitive demand implied by the LOS is consistent with the question's stated difficulty and Bloom's level |
| 4. Distractor Engineering | Each distractor maps to a real misconception or plausible calculation path | Every distractor represents a documented exam trap or known student error, not a guessable throwaway |
| 5. Blueprint Alignment | Maps to a specific Part 1 CSO LOS | The LOSTag, Topic, and cognitive level align with a specific Content Specification Outline learning outcome |
| 6. CMA Part 1 Relevance | In scope, not accidentally Part 2 | The question tests Part 1 material; no concept, standard, or calculation belongs exclusively to Part 2 |

The full verification output format, confidence-flagging rules, and escalation protocol are documented in `BUILD_TIME_VERIFICATION_STANDARD.md`.

### 1.7 Certification Standard

**Effective:** Sub-batch 2A close-out (2026-07-22)

#### 1.7.1 Certification State Governance

Questions transition through governance states defined in `QUESTION_METADATA_STANDARD.md` (Part 9):

| State | Description |
|-------|-------------|
| Unprocessed | Not yet audited |
| In Audit | Currently under review in a sub-batch |
| Editorial Queue | Requires structural or content revision |
| Certified | Passed HIGH-confidence verification; eligible for learner sessions |
| Archived | Removed from active pool (content preserved) |

**Learner-pool eligibility** is gated by `question_state = Certified`. Only Certified questions are available for learner practice sessions. All other states are excluded.

#### 1.7.2 Certification Requirements

A question transitions from In Audit to Certified when:

1. **Six-dimension AI verification** produces HIGH confidence across all dimensions (per §1.6 and `BUILD_TIME_VERIFICATION_STANDARD.md`)
2. **User approval** is documented in `REVISION_HISTORY.md`
3. **Distractor tier map** (A/B/C/D) is recorded in the certification entry
4. **Any low-confidence claim** is resolved and documented before certification

#### 1.7.3 Correctness Priority

**Correctness over throughput** is an explicit operating principle. The HIGH-confidence certification gate is non-negotiable. No question may enter the learner pool as Certified without passing all six verification dimensions at HIGH confidence. Warning-count targets never override the certification requirement.

### 1.8 Definition of "Exam-Ready"

Content is exam-ready when it:

- Satisfies the Gold Standard Checklist (Section 14)
- Achieves a minimum quality score of 90/100 (Section 2)
- Passes all validation checks with zero errors
- Has been independently reviewed by at least one qualified reviewer (human or AI)

---

## 2. Question Quality Rubric (100 Points)

### 2.1 Scoring Overview

Every question (MCQ or case item) receives a score from 0–100 based on 10 weighted dimensions. Each dimension is scored 0–10, then multiplied by its weight.

### 2.2 Dimension Weights and Scoring

| # | Dimension | Weight | Max Points | Scoring Criteria |
|---|-----------|--------|------------|------------------|
| 1 | Blueprint Alignment | 20% | 20 | 0: No blueprint reference. 3: Generic topic match. 6: Specific learning objective cited. 8: LO correctly interpreted. 10: Precise LO mapping + appropriate cognitive level |
| 2 | Cognitive Level (Bloom's) | 15% | 15 | 0: Level unassigned. 3: Mismatched (e.g., "Apply" for a recall question). 7: Correct level but formulaic. 10: Correct level + appropriate complexity. 12: Level drives question design. 15: Level, prompt, and answer choices are fully aligned |
| 3 | Technical / Accounting Accuracy | 15% | 15 | 0: Contains factual error. -15: Auto-fail if any technical inaccuracy. 5: Correct but imprecise. 10: Accurate with proper standard references. 15: Authoritative, precise, and current |
| 4 | Distractor Quality | 15% | 15 | 0: Distractors are obviously wrong. 3: Distractors are plausible but uneven. 7: All distractors represent specific misconceptions. 10: Distractors reflect documented exam traps. 12: Distractors discriminate between levels of understanding. 15: Each distractor targets a distinct, realistic error |
| 5 | Business Realism / Authenticity | 10% | 10 | 0: Textbook example with no business context. 3: Generic company name but unrealistic scenario. 5: Named company with plausible facts. 7: Realistic business situation with decision context. 10: Feels like an actual business document or executive communication |
| 6 | Numerical Integrity | 10% | 10 | 0: Calculation error or unreconciled. -10: Auto-fail if wrong answer. 5: Correct but unchecked. 8: Independently verified. 10: Verified + tolerance documented + explanation traces every step |
| 7 | Explanation Quality | 10% | 10 | 0: Missing or generic. 3: Only states correct answer. 5: Includes calculation but no principle. 7: Principle + calculation + business interpretation. 8: Plus distractor explanations. 10: Mini-lesson: concept, solution, distractor analysis, exam trap, business application, formula reference |
| 8 | Writing Clarity | 5% | 5 | 0: Grammatical errors or unclear. 2: Correct but verbose. 3: Clear and concise. 4: Professional business tone. 5: Polished, exam-authentic language |
| 9 | Accessibility / Fairness | 5% | 5 | 0: Contains biased language or cultural assumptions. 2: Accessible but could exclude. 3: Neutral and inclusive. 4: Color-independent, screen-reader compatible, keyboard-navigable. 5: Fully accessible: responsive scaling, readable exhibits, no accessibility barriers |
| 10 | Metadata Completeness | 5% | 5 | 0: No metadata beyond required fields. 2: Basic fields present. 3: All required metadata present. 4: Full metadata per QUESTION_METADATA_STANDARD.md. 5: Complete + verified by validator |

### 2.3 Scoring Rules

1. **Scoring precision** — Each dimension is scored in whole integers (0–10 scale before weighting).
2. **Floor and ceiling** — The minimum dimension score is 0. There is no negative score except for auto-fail conditions.
3. **Auto-fail conditions** — A score of 0 on Dimension 3 (Technical Accuracy) or Dimension 6 (Numerical Integrity) results in an automatic overall score of **0/100** and the question is rejected regardless of other dimension scores.
4. **Rounding** — Final scores are rounded to one decimal place.

### 2.4 Quality Tiers

| Score Range | Tier | Label | Action Required |
|-------------|------|-------|-----------------|
| 0–49 | 4 | Reject | Requires full rewrite |
| 50–69 | 3 | Needs Work | Requires substantial revision |
| 70–89 | 2 | Acceptable | Requires targeted improvements |
| 90–100 | 1 | Exam-Ready | Approved for production |
| 100 | Gold | Gold Standard | Exemplary; no improvements needed |

### 2.5 Scoring Quick-Reference Card

For rapid scoring, use this shorthand:

| Dimension | 0–3 (Poor) | 4–6 (Fair) | 7–8 (Good) | 9–10 (Excellent) |
|-----------|------------|------------|------------|-------------------|
| Blueprint | No mapping | Vague topic match | Specific LO cited | Precise + level-aligned |
| Cognitive | Unassigned | Wrong level | Correct level | Drives question design |
| Technical | Error present | Vague but correct | Standard referenced | Authoritative + current |
| Distractors | Obviously wrong | Plausible uneven | Specific misconceptions | Each targets distinct error |
| Realism | Textbook | Generic company | Plausible facts | Authentic business feel |
| Numerical | Wrong answer | Correct unchecked | Independently verified | Fully traced |
| Explanation | Missing | Only answer stated | Principle + calc + context | Complete mini-lesson |
| Clarity | Grammar errors | Verbose | Clear + concise | Exam-authentic tone |
| Accessibility | Biased | Neutral basic | Inclusive | No cueing + balanced |
| Metadata | Missing minimal | Basic fields | All required | Full + validated |

---

## 3. Case Study Standards

### 3.1 Scenario Requirements

Every case study must contain a scenario that satisfies all of the following:

- **Named company** — Uses a fictional but realistic company name (e.g., "Harbor Medical Supplies", "Northstar Equipment")
- **Named stakeholder** — Identifies a specific decision-maker with a role (e.g., "CFO Maria Chen", "Operations Manager James Park")
- **Business trigger** — Describes a specific event or reporting requirement that creates the need for analysis
- **Clear task** — States what the candidate must accomplish
- **Realistic context** — The scenario must be a scenario a management accountant would plausibly encounter

### 3.2 Scenario Language

Scenarios shall use executive/business language, not textbook language:

| Avoid | Use Instead |
|-------|-------------|
| "The company manufactures products" | "Harbor operates three production lines in its Denver facility" |
| "Calculate the variance" | "The CFO needs to explain the $42,000 unfavorable variance to the board" |
| "Which of the following is correct?" | "Which recommendation should the controller present to the audit committee?" |

### 3.3 Question Interconnection

Case items within a case must:

- Follow a logical sequence: calculation → analysis → interpretation → decision
- Build on prior items where appropriate (later items may reference earlier results)
- Be answerable independently in cases where a candidate misses an earlier item
- Progress from lower cognitive levels to higher cognitive levels

### 3.4 Exhibit Standards

Every exhibit must satisfy:

1. **Purpose clarity** — Each exhibit has a defined purpose and is referenced by at least one item
2. **Professional format** — Exhibits resemble actual business documents (financial statements, ERP reports, dashboards, emails, contracts)
3. **No decorative data** — Every row/column in a table exhibit is consumed by at least one item
4. **Data consistency** — Numbers in exhibits must be internally consistent (e.g., subtotals add to totals)
5. **Independent readability** — Each exhibit is understandable without reference to other exhibits (though exhibits may complement each other)

### 3.5 Cognitive Progression

Items within a case must follow this progression:

| Position | Typical Type | Cognitive Level | Purpose |
|----------|-------------|-----------------|---------|
| Items 1–2 | numeric | Apply | Foundational calculation |
| Items 3–4 | select | Analyze | Interpretation of results |
| Item 5 | multi / select | Evaluate | Judgment and decision-making |
| Item 6 | fill / match | Evaluate | Synthesis and application |

### 3.6 Blueprint Traceability Matrix

Every question (MCQ and case item) must be fully traceable to the official IMA CMA Part 1 blueprint. Each item shall carry the following traceability fields in its metadata:

| Field | Description | Example |
|-------|-------------|---------|
| BlueprintDomain | Domain letter and name | "A — External Financial Reporting Decisions" |
| LearningOutcomeStatement | Official LOS code and text | "A.1.a: Prepare and analyze the income statement, balance sheet, statement of changes in equity, and statement of cash flows" |
| Topic | Controlled vocabulary topic | "Revenue recognition" |
| Subtopic | Narrower topic within topic | "Performance obligations" |
| PrimaryCompetency | Dominant skill tested | "Calculation" |
| SecondaryCompetency | Supporting skill tested | "Analysis" |
| FormulaTested | Formula from FORMULA_MASTER.md | "Cash collections formula" |
| AccountingPrinciple | Governing standard or rule | "ASC 606 - Revenue from Contracts with Customers" |
| CognitiveLevel | Bloom's level | "Apply" |
| Difficulty | Difficulty label with score | "Moderate (3)" |

Full traceability ensures that:
- Blueprint updates can be propagated to affected questions
- Coverage gaps are visible at the domain, topic, and LOS level
- Candidates can target specific blueprint areas for remediation

### 3.7 Realism Standards

Every case scenario and question must pass this realism checklist:

- [ ] **Could this happen in a real business?** — The scenario is a recognizable business situation, not a textbook abstraction
- [ ] **Would a controller recognize this scenario?** — The facts, data, and decisions reflect actual management accounting work
- [ ] **Would a CFO use this report?** — Exhibits resemble actual business documents (financial statements, ERP reports, board packages, audit workpapers)
- [ ] **Are the numbers commercially reasonable?** — Dollar amounts, quantities, and ratios are plausible for the described business (e.g., a $200K line of credit for a medical supply distributor, not a $2B one)
- [ ] **Are industry practices authentic?** — Terminology, metrics, and processes reflect the stated industry (e.g., manufacturing uses COGS and FIFO; software uses ASC 606 and deferred revenue)
- [ ] **Would an executive communicate this way?** — Dialogue and documents use professional business language, not textbook exposition

A scenario that fails any item should be revised before proceeding to psychometric review.

### 3.8 Anti-AI Writing Standards

Content must read like genuine business documentation, not AI-generated textbook filler.

#### Avoid these patterns

| Generic Pattern | Problem |
|-----------------|---------|
| "Company XYZ is considering..." | No specificity; reads like a placeholder |
| "The company manufactures products" | Impersonal and vague |
| "Which of the following is correct?" | Textbook framing, not business decision-making |
| "Calculate the variance using the formula..." | Overly instructional for an exam question |
| "A company has the following data..." | Data-dump without business context |

#### Prefer these formats

| Business Format | Example |
|-----------------|---------|
| Controller memo | "CFO Maria Chen circulated the January cash forecast for review" |
| Production report | "The March production run yielded 12,400 units against a budget of 15,000" |
| Budget package | "The budget package includes the master budget, cash budget, and supporting schedules" |
| Audit workpaper | "During the Q2 audit, the engagement team noted..." |
| Board presentation | "The board requested a variance analysis for the Northeast region" |
| Operations dashboard | "The operations dashboard shows OEE at 82%, down from 88% in Q1" |
| Purchasing analysis | "Purchasing reports that raw material costs increased 9% vs. prior year" |
| Treasury report | "The treasury team projects a $340,000 cash deficit for February" |
| Email communication | "From: James Park, Operations Manager. Subject: Production line utilization" |
| Meeting notes / briefing | "Pre-audit committee briefing: key findings from the internal control assessment" |

---

## 4. Explanation Standards

### 4.1 Required Elements

Every explanation (correct and distractor) must contain these elements. The sections need not be labeled, but all must be present conceptually.

#### Correct Answer Explanation

| Element | Required | Description |
|---------|----------|-------------|
| Accounting concept | Yes | Name the governing principle or standard (e.g., "Under ASC 606," "Per COSO," "Relevant costing requires") |
| Solution steps | Yes | Show the work. For calculations, show the formula with substituted values. For conceptual questions, trace the reasoning chain |
| Why correct | Yes | Explain why this choice satisfies the requirements of the standard |
| Business interpretation | Yes | State what the result means in the business context of the scenario |
| Common exam trap | Recommended | Identify one specific error candidates make on this type of question |
| Practical application | Recommended | Connect to real-world management accounting practice |

#### Distractor Explanation

| Element | Required | Description |
|---------|----------|-------------|
| Why wrong | Yes | Identify the specific error in reasoning or computation |
| Misconception addressed | Yes | State what the candidate likely misunderstood to select this choice |
| Specific correction | Yes | Explain what the correct approach is and how it differs from the distractor's approach |
| Surface plausibility | Recommended | Acknowledge why a reasonable candidate might select this option |

### 4.2 Explanation Templates

#### Calculation Item — Correct Answer

> The correct answer is **[letter/number]**. **[Formula with substituted values]** = **[result]**. Under **[accounting principle]**, the rule is **[key requirement]**. In context, **[business interpretation]** . A common error is to **[specific trap]** .

#### Calculation Item — Distractor

> Option **[letter]** incorrectly **[specific error: e.g., "uses total sales instead of credit sales," "omits the gain adjustment," "applies straight-line method"]** . A candidate reaching this answer likely **[likely mistake]** . The correct approach is **[contrast with correct method]** .

#### Conceptual Item — Correct Answer

> The correct answer is **[letter]** because **[reasoning]** . Under **[standard/framework]** , **[key rule]** . In practice, this means **[business interpretation]** .

#### Conceptual Item — Distractor

> Option **[letter]** **[restate choice]** . This is incorrect because **[specific error]** . The misconception is that **[what candidate thinks]**, but **[correct concept]** . This is a common area of confusion between **[distinction]** .

### 4.3 Language Rules

| Rule | Requirement |
|------|-------------|
| Professional tone | Write as a tutor explaining to a CMA candidate. Direct, instructional, professional |
| No uncertainty | Never use "I think," "probably," "maybe," "could be," "might be" |
| No self-reference | Never use "this answer," "this choice," "the correct answer" without specifying which |
| Choice-specific | Each distractor explanation must be specific to that choice, not generic text reused across slots |
| Use scenario facts | Reference the company name, dollar amounts, and time periods from the question |
| Active voice | "ASC 606 requires" not "It is required by ASC 606" |
| Minimum length | 50 characters per explanation field |
| No placeholder text | Never use "This is the correct choice," "Plausible distractor," "Common misunderstanding" (unexplained) |

### 4.4 Explanation Validation Rules

| Rule | Description |
|------|-------------|
| EV1 | Minimum 50 characters per explanation field |
| EV2 | No placeholder phrases ("This is the correct choice", "Plausible distractor", "Common misunderstanding") |
| EV3 | Correct answer must reference the accounting principle by name |
| EV4 | Distractor explanations must be choice-specific (not identical across slots) |
| EV5 | Formula numbers in explanation must match exhibit values |
| EV6 | Arithmetic result in explanation must match the Correct value |
| EV7 | No uncertain language ("I think", "probably", "maybe") |
| EV8 | Correct-answer slot in distractor explanations must be empty (ExplanationWrong* for the correct answer) |

---

## 5. Numerical Validation Standard

### 5.1 Independent Recalculation Requirement

Every numerical question in the repository must undergo independent recalculation by a reviewer who has not seen the stored answer. The process:

1. **Read the question stem** and exhibits (but not the stored Correct value)
2. **Solve independently** using the exhibits
3. **Document the calculation** showing formula, substituted values, and result
4. **Compare** the independent result to the stored Correct value
5. **Reconcile any differences** — If they differ, determine which is correct and document the resolution

### 5.2 Rounding Policy

| Context | Rule |
|---------|------|
| Dollar amounts | Round to nearest whole dollar ($X,XXX) |
| Percentages | Round to two decimal places (XX.XX%) |
| Ratios | Round to two decimal places (X.XX) |
| Per-unit costs | Round to four decimal places for intermediate, two for final |
| Shares | Round to nearest whole share |
| Tax calculations | Round to nearest whole dollar |
| Interim calculations | Carry to four decimal places; round final to standard |
| Exam exhibits | Use same rounding as question expects |

### 5.3 Accepted Tolerance

| Type | Tolerance | Example |
|------|-----------|---------|
| Integer count (units, shares) | 0 (exact match) | 1,500 units |
| Dollar amount | $1 | $540,000 |
| Percentage | 0.01% | 12.50% |
| Ratio / index | 0.01 | 2.15 |
| Monetary intermediate | $0.01 | $47.83 |

### 5.4 Formula Verification Checklist

For every numerical question, verify:

- [ ] Correct formula selected for the concept being tested
- [ ] All input values trace to exhibit data
- [ ] Units are consistent throughout (e.g., don't mix thousands and singles)
- [ ] Time periods are handled correctly (annual vs. monthly, beginning vs. ending balances)
- [ ] Allocation bases are correct and complete
- [ ] Tax effects are applied at the correct stage
- [ ] Non-cash items are treated correctly (add-back for operations, not for investing/financing)
- [ ] Rounding is applied at the correct step

### 5.5 Financial Statement Impact Verification

For questions involving journal entries or financial statement impacts, verify:

- [ ] Debits equal credits
- [ ] Balance sheet balances (Assets = Liabilities + Equity)
- [ ] Cash flow statement reconciles to change in cash
- [ ] Income statement impacts flow correctly to retained earnings
- [ ] Deferred tax assets and liabilities are on the correct side
- [ ] Classification (current vs. noncurrent, operating vs. investing vs. financing) is correct

---

## 6. Psychometric Standards

### 6.1 Target Difficulty Distribution

The overall question bank should target the following difficulty distribution:

| Difficulty | Score | Target % of Bank | Cumulative % |
|------------|-------|------------------|--------------|
| Easy | 1 | 15% | 15% |
| Moderate-Easy | 2 | 20% | 35% |
| Moderate | 3 | 30% | 65% |
| Difficult | 4 | 25% | 90% |
| Very Difficult | 5 | 10% | 100% |

This distribution reflects the actual CMA exam, where the majority of questions are at a moderate difficulty level.

### 6.2 Bloom's Taxonomy Distribution

| Cognitive Level | Target % | Intended For |
|----------------|----------|--------------|
| Remember | 5% | Definitions, terms, standards identification |
| Understand | 15% | Concept explanation, interpretation |
| Apply | 40% | Calculations, procedure execution |
| Analyze | 25% | Data interpretation, variance analysis, trend identification |
| Evaluate | 15% | Professional judgment, recommendation |

### 6.3 Distractor Performance Expectations

| Property | Requirement |
|----------|-------------|
| Plausibility | Every distractor must be a reasonable choice for a candidate who misunderstands the concept |
| Discrimination | High-performing candidates should correctly eliminate distractors; low-performing candidates should find them attractive |
| Distinctness | No two distractors should test the same misconception |
| Balance | No obvious pattern in correct answer distribution (each answer position should be correct ~25% of the time) |
| Trap coverage | Distractors should reflect documented CMA exam traps where possible |

### 6.4 Cueing and Bias Checks

Every question must pass the following checks:

- **No grammatical cueing** — The correct answer is not grammatically forced (e.g., "an" before a choice starting with a vowel)
- **No length cueing** — The correct answer is not systematically longer or shorter than distractors
- **No position bias** — The correct answer is distributed approximately evenly across A/B/C/D
- **No pattern cueing** — No detectable pattern in correct answer positions (e.g., A-B-C-D-A-B-C-D)
- **No "all of the above" bias** — If "All of the above" appears, it must genuinely be correct no more than 25% of the time
- **No "none of the above" bias** — Same constraint as "all of the above"
- **No absolute language cueing** — Words like "always," "never," "must" in distractors must be justified by the accounting standard
- **No logical subset cueing** — The correct answer is not identifiable by being the only choice in a certain category

### 6.5 Guessability Criteria

| Measure | Target |
|---------|--------|
| Correct answer distribution | 22–28% per position (A/B/C/D) |
| Random guess probability | ≤ 25% for MCQ (chance level) |
| Distractor attractiveness | Each distractor selected by ≥ 5% of candidates in pilot testing |
| Discrimination index | Target: ≥ 0.30 (high performers select correct answer significantly more often than low performers) |

### 6.6 Answer Pattern Analysis

The entire question bank must be tested for:

- **Running patterns** — No streaks of the same correct answer position longer than 4
- **Position balance** — Each section (A–F) should have balanced answer distribution
- **Sequential dependence** — The correct answer position should not be predictable from prior question's correct answer

---

## 7. Metadata Standard

### 7.1 Required Metadata Summary

Every question and case in the repository must include the metadata fields specified in QUESTION_METADATA_STANDARD.md. The minimum required set is:

#### Case-Level Required Fields

| Field | Description | Source |
|-------|-------------|--------|
| CaseID | Unique identifier | QUESTION_METADATA_STANDARD.md §1.1 |
| Title | Descriptive title | §1.1 |
| SectionTags | Domain codes (A–F) | §1.1 |
| BlueprintDomain | Full domain name | §1.1 |
| BlueprintObjectives | Specific learning outcomes | §1.1 |
| Difficulty | Easy / Moderate / Difficult / Very Difficult | §1.1 |
| DifficultyScore | 1–5 numeric | §1.1 |
| EstimatedMinutes | Expected solve time | §1.1 |
| ScenarioText | Business scenario | §1.1 |
| ProductionStatus | Draft / Review / QA / Production / Retired | §1.1 |
| Version | Semantic version | §1.1 |
| Author | Creator identifier | §1.1 |
| Confidence | 0–100 self-assessment | §1.1 |
| QuestionCount | Must equal Items.length | §1.1 |
| ExhibitCount | Must equal Exhibits.length | §1.1 |

#### Item-Level Required Fields

| Field | Description | Source |
|-------|-------------|--------|
| ItemID | Unique within case | §2.1 |
| Type | numeric / select / multi / fill / match | §2.1 |
| Prompt | Question text | §2.1 |
| Correct | Correct answer | §2.1 |
| Explanation | Educational explanation | §2.1 |
| Topic | Specific concept tag | §2.1 |
| Difficulty | Per-item difficulty | §2.1 |
| DifficultyScore | Per-item numeric 1–5 | §2.1 |
| CognitiveLevel | Remember / Understand / Apply / Analyze / Evaluate | §2.1 |
| CalculationRequired | Boolean | §2.1 |

### 7.2 Optional but Recommended Fields

| Field | Purpose |
|-------|---------|
| PrimaryCompetency | Calculation / Conceptual / Analysis / Judgment |
| LearningObjectives | Educational intent in student-facing terms |
| Industry | Industry classification |
| CompanyType | Manufacturer / Distributor / Retailer / Service |
| CompanyName | Fictional company name |
| Stakeholder | Decision-maker role |
| BusinessFunction | Treasury / Financial reporting / Cost accounting / Internal audit |
| Tags | Arbitrary filtering tags |
| FormulaReference | Link to FORMULA_MASTER.md |
| CommonTrapReference | Link to COMMON_EXAM_TRAPS.md |
| RevisionHistory | Document all changes |

### 7.3 Exam Statistics Fields

These fields support future analytics and adaptive learning. They may be initially empty but the schema must exist.

| Field | Type | Purpose |
|-------|------|---------|
| AverageTime | Number (seconds) | Mean solve time from candidate data |
| CorrectPercentage | Number (0–100) | Historical correct rate |
| DiscriminationIndex | Number (-1 to 1) | Point-biserial correlation |
| GuessRate | Number (0–100) | Estimated guessing rate |
| ConfidenceRating | Number (0–100) | AI/expert confidence |
| RevisionCount | Integer | Number of revisions applied |
| LastAuditDate | ISO 8601 | Most recent review date |
| LastReviewedBy | String | Who performed the most recent review |

### 7.4 Metadata Validation

All metadata must pass the validation checks defined in QUESTION_METADATA_STANDARD.md Part 5, including field-level validation, cross-field validation, exhibit data consumption rules, and cognitive progression rules.

---

## 8. Acceptance Criteria

### 8.1 Quality Gates

Content moves through these gates. Each gate must be passed before proceeding to the next.

| Gate | Minimum Score | Checked By | Description |
|------|--------------|------------|-------------|
| G1 — Technical Review | 90/100 rubric | Accountant | Accounting accuracy, standard references, numerical integrity |
| G2 — Psychometric Review | 90/100 rubric | Psychometrician | Difficulty, Bloom's, distractor quality, bias check |
| G3 — Numerical Validation | 100% accuracy | Validator | Independent recalculation, rounding check, tolerance check |
| G4 — Instructional Review | 90/100 rubric | Editor | Explanation quality, writing clarity, educational value |
| G5 — Metadata Review | Pass all checks | Validator | All required fields present and valid |
| G6 — Final Validation | Zero errors | Validator | Automated suite passes with no errors or new warnings |
| G7 — Approval | All gates pass | Release Manager | Final sign-off for production |

### 8.2 Acceptance Requirements

Phase 1 is complete only when:

1. Every question has been reviewed against the CAQS quality rubric
2. Every question has a documented quality score
3. Every question has Bloom's and difficulty classifications
4. All numerical questions have been independently verified
5. Weak questions (score < 70) have been revised or rewritten
6. No new validation errors have been introduced
7. The repository has a documented baseline quality report
8. The overall repository health score has improved from the current baseline

### 8.3 Rejection Criteria

Any content exhibiting any of the following is rejected without further scoring:

- **Accounting error** — The correct answer is wrong or the explanation contradicts GAAP/COSO
- **Numerical error** — The stored answer does not match the correct calculation
- **Metadata failure** — Missing required fields that would break the application
- **Plagiarism** — Content copied from copyrighted sources
- **Bias** — Content that would unfairly disadvantage any candidate group

---

## 9. Audit Workflow

### 9.1 Standard Review Pipeline

Every content item follows this pipeline:

```
Step 1: Technical Review (Accountant)
  ├── Verify accounting accuracy
  ├── Verify standard references
  ├── Verify formulas
  └── Output: Score Dimensions 2, 3, 5

Step 2: Psychometric Review (Psychometrician)
  ├── Verify difficulty assignment
  ├── Verify Bloom's level
  ├── Evaluate distractor quality
  ├── Check for cueing and bias
  └── Output: Score Dimensions 1, 4, 9

Step 3: Numerical Validation (Validator)
  ├── Independent recalculation
  ├── Rounding check
  ├── Tolerance verification
  └── Output: Score Dimension 6

Step 4: Instructional Review (Editor)
  ├── Evaluate explanation quality
  ├── Check writing clarity
  ├── Verify explanation compliance with §4
  └── Output: Score Dimensions 7, 8

Step 5: Metadata Review (Validator)
  ├── Check all required fields present
  ├── Check field types and values
  ├── Check cross-references
  └── Output: Score Dimension 10

Step 6: Final Validation (Validator)
  ├── Run automated validation suite
  ├── Verify zero errors
  ├── Compare before/after metrics
  └── Output: Overall quality score + pass/fail

Step 7: Approval (Release Manager)
  ├── Review all gate results
  ├── Verify Gold Standard Checklist
  ├── Sign off for production
  └── Output: ProductionStatus → "Production"
```

### 9.2 Batch Review Process

For Phase 1, content is reviewed in batches organized by blueprint section:

| Batch | Sections | Scope | Content Count |
|-------|----------|-------|---------------|
| 1 | A | External Financial Reporting Decisions | ~100 MCQs + ~15 cases |
| 2 | B | Planning, Budgeting, and Forecasting | ~100 MCQs + ~15 cases |
| 3 | C | Performance Management | ~100 MCQs + ~15 cases |
| 4 | D | Cost Management | ~100 MCQs + ~15 cases |
| 5 | E | Internal Controls | ~100 MCQs + ~15 cases |
| 6 | F | Technology and Analytics | ~100 MCQs + ~15 cases |

### 9.3 Content Versioning

Every audit and revision must update the question's Version field following semantic versioning:

```
1.0  — Initial creation (ProductionStatus: "Draft")
 ↓
1.1  — Minor revision (e.g., explanation improvement, metadata addition)
 ↓
2.0  — Major revision (e.g., answer changed, scenario rewritten, blueprint re-mapping)
```

Each version update must produce a VersionHistory entry containing:

| Field | Required | Description |
|-------|----------|-------------|
| Version | Yes | Version after change |
| Date | Yes | ISO 8601 date |
| Author | Yes | Who made the change |
| Reason | Yes | What changed and why |
| QualityScoreBefore | Yes | Rubric score prior to change |
| QualityScoreAfter | Yes | Rubric score after change |

This creates a permanent audit trail for regulatory-grade content governance.

### 9.4 Remediation Workflow

When content fails any gate:

1. **Document the defect** — Record the specific issue with the failed dimension score
2. **Assign owner** — Determine which role owns the fix (Accountant, Editor, Psychometrician)
3. **Fix** — Revise the content addressing the specific defect
4. **Re-review** — Repeat the applicable gate step(s)
5. **Update score** — Recalculate the quality score
6. **Document** — Record the fix in RevisionHistory

### 9.5 Audit Documentation

Every review produces:

- **Per-item audit record** — QuestionID, dimension scores, overall score, findings, recommendations
- **Batch summary report** — Distribution of scores, common defect patterns, before/after comparison
- **Repository quality report** — Overall health score, section-level breakdown, trend analysis

---

## 14. Gold Standard Checklist

### 14.1 Purpose

Before any question or case is considered complete and approved for production, it must satisfy every item on this checklist. This provides a simple pass/fail gate in addition to the numeric rubric.

### 14.2 MCQ Checklist

- [ ] **Blueprint alignment** — Question maps to a specific IMA Learning Outcome Statement
- [ ] **Technical accuracy** — Accounting treatment is correct under current GAAP/COSO
- [ ] **Numerical accuracy** — All calculations independently verified
- [ ] **Correct answer** — The stored CorrectChoice matches expert judgment
- [ ] **Distractor plausibility** — Every distractor represents a realistic candidate misconception
- [ ] **Distractor discrimination** — No distractor is obviously wrong
- [ ] **No cueing** — No grammatical, length, or position cues point to the correct answer
- [ ] **Answer balance** — The question does not create a pattern if combined with adjacent questions
- [ ] **Explanation — principle** — Correct answer explanation names the governing standard
- [ ] **Explanation — solution** — Shows formula with substituted values (for calculations) or reasoning chain (for conceptual)
- [ ] **Explanation — business context** — Interprets the result in the scenario
- [ ] **Explanation — distractors** — Each wrong-choice explanation is specific and teaches why it is wrong
- [ ] **Explanation — exam trap** — Identifies at least one common candidate error
- [ ] **Business realism** — Scenario uses realistic business language, not textbook phrasing
- [ ] **Writing clarity** — No grammatical errors; professional tone
- [ ] **Accessibility** — No biased language; fair to all candidate populations
- [ ] **Metadata complete** — All required fields present and valid
- [ ] **Metadata cross-references** — Formula references, trap references, and decision tree references resolve correctly
- [ ] **Validation pass** — Automated validation suite passes with zero errors
- [ ] **Review documentation** — Audit record exists with scores and findings

### 14.3 Case Study Checklist

All MCQ checklist items apply to each item within the case, plus:

- [ ] **Scenario realism** — Named company, stakeholder, business trigger, and clear task
- [ ] **Exhibit quality** — Professional format, no decorative data
- [ ] **Data consistency** — Numbers in exhibits are internally consistent
- [ ] **Question interconnection** — Items follow logical progression (calculate → analyze → decide)
- [ ] **Cognitive progression** — Items progress from lower to higher Bloom's levels
- [ ] **Independent answerability** — Each item can be answered without relying on correct answers to prior items
- [ ] **Exhibit referencing** — Every exhibit is referenced by at least one item
- [ ] **Data consumption** — Every exhibit row/column is consumed by at least one item
- [ ] **Case-level metadata** — All required case-level fields present and valid
- [ ] **Item-level metadata** — All required item-level fields present and valid
- [ ] **Exhibit-level metadata** — ExhibitID, Purpose, and ReferencedBy fields present
- [ ] **Difficulty calibration** — Case-level difficulty is within ±1 of mean item difficulty

### 14.4 Gold Standard Definition

A question or case that achieves **100/100 on the rubric** AND satisfies **every item on the Gold Standard Checklist** is designated **Gold Standard**. Gold Standard content:

- Is marked `ProductionStatus: "Production"` and `Confidence: 100`
- Has been reviewed by at least two independent reviewers (one accounting, one editorial)
- Has all numerical content independently verified by two separate calculations
- Has complete metadata with no warnings
- Serves as the benchmark for all future content creation

---

## 11. Learning Science Standards

### 11.1 Purpose

Explanations and instructional content must do more than correct errors — they must build durable, transferable knowledge. Every explanation should incorporate evidence-based learning science principles.

### 11.2 Required Learning Science Elements

| Principle | Required | Description |
|-----------|----------|-------------|
| Retrieval practice | Yes | Prompt the candidate to recall the concept before revealing the full explanation. At minimum, the explanation should reference the core concept as if the candidate is strengthening a memory trace |
| Error correction | Yes | Explicitly identify what error the candidate likely made and why the correct reasoning differs. This targets the specific misconception that led to the wrong answer |
| Worked examples | Yes | For calculation items, show the complete worked solution with intermediate steps labeled. For conceptual items, trace the full reasoning chain from principle to conclusion |
| Transfer learning | Recommended | Connect the concept to a different but related context to promote generalization: "The same logic applies when evaluating a make-or-buy decision" |
| Spacing readiness | Recommended | Reference related concepts from other blueprint sections to build cross-domain connections: "This builds on the breakeven analysis from Section D" |
| Interleaving readiness | Recommended | Present mixed-practice signals within the explanation: "Compare this to how absorption costing treats fixed overhead differently" |

### 11.3 Explanation as Mini-Lesson

Every explanation should function as a self-contained mini-lesson that teaches the concept even if the candidate answered correctly. The structure:

```
Concept Identification
  → What principle governs this question?
  → Which standard or framework applies?

Solution Demonstration
  → Show the complete reasoning path
  → For calculations: formula → substitution → result → interpretation

Error Analysis
  → Why each distractor is wrong
  → What misconception each distractor represents
  → What the candidate would need to unlearn

Business Application
  → What this means in practice
  → Why a management accountant needs to know this

Exam Preparation
  → Common trap to watch for
  → Related concepts that might be tested together
  → Time management tip (if applicable)
```

### 11.4 Learning Science Validation

| Rule | Description |
|------|-------------|
| LS1 | Explanation must identify the governing concept by name (retrieval prompt) |
| LS2 | Distractor explanations must identify the specific misconception (error correction) |
| LS3 | Calculation explanations must show intermediate steps (worked example) |
| LS4 | Explanation must include a business interpretation (transfer readiness) |
| LS5 | Recommended: Cross-reference to a related concept (interleaving readiness) |

---

## 12. Accessibility Standards

### 12.1 Purpose

All content must be accessible to the widest possible candidate population, including candidates with disabilities, candidates using assistive technology, and candidates from diverse cultural and linguistic backgrounds.

### 12.2 Accessibility Requirements

| Requirement | Description |
|-------------|-------------|
| Color-independent interpretation | No information conveyed by color alone. Charts and exhibits must be interpretable in grayscale |
| Screen reader compatibility | All text content must be structured for assistive technology (proper heading hierarchy, aria labels, alt text for non-text elements) |
| Keyboard-only navigation | All interactions must be operable without a mouse (tab order, focus indicators, enter/space activation) |
| Readable exhibit layouts | Exhibits must have clear headers, consistent alignment, adequate contrast, and font sizes that support readability at 150% zoom |
| Responsive scaling | Content must remain usable across screen sizes from mobile to ultrawide. No horizontal scrolling at standard zoom levels |
| Language clarity | Avoid idioms, culturally specific references, and unnecessarily complex vocabulary that could disadvantage non-native English speakers |
| Alternative formats | Tables must be readable as linear text (screen readers read left-to-right, top-to-bottom). Complex visuals should have text summaries |

### 12.3 Accessibility Checklist

- [ ] All content interpretable without color
- [ ] Screen reader can navigate question → choices → submit flow
- [ ] All interactive elements reachable by keyboard
- [ ] Tab order follows logical reading order
- [ ] Focus indicators visible on all interactive elements
- [ ] Exhibits readable at 150% zoom
- [ ] No fixed-width layouts that break on smaller screens
- [ ] Language is clear and culturally neutral
- [ ] Acronyms defined on first use
- [ ] Mathematical content (formulas, calculations) presented in screen-reader-accessible format

---

## 15. Continuous Improvement

### 15.1 Quality Trend Tracking

Repository health shall be tracked over time using the weighted scoring system:

| Metric | Current Baseline | Target | Measurement Method |
|--------|-----------------|--------|--------------------|
| Repository Health Score | 42/100 | ≥ 90/100 | MetadataBacklogReport |
| Rubric Quality Score | None | ≥ 90/100 mean | CAQS rubric per question |
| Validation Errors | 0 | 0 | Validator suite |
| Validation Warnings | 1,062 | 0 | Validator suite |
| Gold Standard Content | 0% | ≥ 50% | Audit records |
| Content Reviewed | 0% | 100% | Audit records |

### 15.2 Standard Updates

This standard document shall be versioned. Updates require:

1. Proposed change documented
2. Impact analysis on existing content
3. Review by project lead
4. Version bump and changelog entry

### 15.3 Exception Process

Any content that does not meet the Gold Standard Checklist but is approved for production must:

1. Have a documented exception with rationale
2. Be tagged with `Exception: [reason]` in metadata
3. Have a remediation plan and target date
4. Be reviewed at the next scheduled quality review cycle

---

## Appendices

### A. Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-21 | AI — Quality Standard Agent | Initial version. Establishes CAQS as governing quality standard for CMA Part 1 Exam Simulator |

### B. Document Dependencies

| Document | Relationship |
|----------|-------------|
| PROJECT_CONSTITUTION.md | Higher authority — this standard implements the constitution's quality principles |
| QUESTION_METADATA_STANDARD.md | Contains metadata schema referenced by §7 |
| EXPLANATION_STYLE_GUIDE.md | Contains explanation guidelines extended by §4 |
| TAXONOMY_REGISTRY.md | Contains permitted enumeration values referenced by §7 |
| 05_COMMON_EXAM_TRAPS.md | Referenced by §4 and §6 for distractor quality |
| CMA Exam Blueprint (IMA) | External authority for §1.3 alignment requirements |

### C. Relationship to MetadataBacklogReport

The MetadataBacklogReport (reports/MetadataBacklogReport.md) is the measurement tool for tracking compliance with this standard. After each review batch against CAQS v1.0, the backlog report shall be regenerated to show progress.
