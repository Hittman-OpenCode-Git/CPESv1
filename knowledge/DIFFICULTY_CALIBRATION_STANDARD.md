# CMA Part 1 Exam Simulator — Difficulty Calibration Standard v1.1

**Version:** 1.1
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Supersedes:** DCS v1.0
**Scope:** All MCQ banks and case-study items across all lanes (100-series, 500-series, 700-series)

---

## §1 — Purpose

This standard defines the evidence-based difficulty calibration framework for every item in the CMA Part 1 Exam Simulator. It replaces ad-hoc template-based difficulty assignment with a cognitive-demand-driven rubric. All future content creation, audit, and recalibration sessions shall reference this standard.

**v1.1 adds:** Boundary decision trees (§9), expanded forbidden trigger catalog with DL-012 clone pattern (§8), reviewer protocols for all four CL boundary zones, disagreement resolution process (§11), reviewer quick-reference decision trees (§12), confidence gate protocol (§13), drift detection process (§14), and cross-pack consistency rule (§15). Codifies findings from S713–S720 systematic testing across 2,500 items. Example library removed pending re-verification (S721 Agent D Validation Board: 74% QID mismatch rate across 16 of 23 exemplars).

---

## §2 — Difficulty Levels

| Level | Score | Label | Cognitive Demand | Typical Bloom's |
|-------|-------|-------|-----------------|----------------|
| 1 | 1 | **Easy** | Direct recall of a single fact, term, or definition. No scenario parsing required. At least 2 distractors are from entirely different domains than the correct answer, enabling elimination without conceptual understanding. | Remember |
| 2 | 2 | **Moderate-Easy** | Recall or basic comprehension with discrimination required. All distractors are plausible alternatives within the same domain. May involve simple single-step calculation with formula provided. Short scenario optional. | Remember, Understand |
| 3 | 3 | **Moderate** | Application of a concept or procedure. Requires extracting operative facts from a scenario, applying a formula, or interpreting data. Multi-step calculations, financial statement analysis, or cross-concept reasoning. | Apply |
| 4 | 4 | **Difficult** | Analysis or evaluation requiring professional judgment. Candidate must determine WHICH method, concept, or cause applies (Analyze) OR weigh trade-offs between defensible alternatives (Evaluate). Complex exhibit interpretation, multi-step reasoning chains, or evaluating trade-offs. | Analyze, Evaluate |
| 5 | 5 | **Very Difficult** | Synthesis of multiple concepts across blueprint domains. Novel scenario requiring original problem-solving. No single formula directly applies; candidate must combine multiple standards or frameworks. | Evaluate, Create |

---

## §3 — Cognitive-Level-to-Difficulty Mapping

This is the primary calibration rule. CognitiveLevel is the dominant predictor of appropriate DifficultyScore.

| CognitiveLevel | Default Difficulty | Default Score | Modifiers |
|---------------|-------------------|---------------|-----------|
| **Remember** | Moderate-Easy | 2 | Upgrade to Easy/1 if distractors are entirely different domain (≥2); upgrade to Moderate/3 if subtle discrimination required within domain |
| **Understand** | Moderate-Easy | 2 | Upgrade to Moderate/3 if scenario parsing or interpretation is required; downgrade to Easy/1 if definition is trivially distinguishable from distractors |
| **Apply** | Moderate | 3 | Upgrade to Difficult/4 if multi-step with judgment; downgrade to Moderate-Easy/2 if single-step formula with formula given |
| **Analyze** | Difficult | 4 | Upgrade to Very Difficult/5 if cross-domain; downgrade to Moderate/3 if simple pattern recognition |
| **Evaluate** | Difficult | 4 | Upgrade to Very Difficult/5 if requires original framework synthesis; downgrade to Moderate/3 if straightforward recommendation |

**v1.1 clarification:** The default is a starting point (floor), not a ceiling. Modifiers adjust the score by ±1 where evidence supports. Gaps > 1 level between CL default and assigned DifficultyScore constitute a red flag requiring re-verification of CL assignment.

---

## §4 — Secondary Modifiers

These factors adjust the base CognitiveLevel assignment by ±1 score:

| Factor | Direction | Rationale |
|--------|-----------|-----------|
| **Multi-exhibit dependency** | +1 | Candidate must synthesize data from 2+ exhibits |
| **Calculation chain ≥3 steps** | +1 | Extended computation increases cognitive load |
| **Plausible distractor count ≥3** (gated) | +1 | Multiple plausible alternatives increase discrimination demand. Gate: apply only when distractor-distractor Jaccard similarity < 30% (distinct misconceptions), not mere structural variety |
| **Explanation <100 chars** | 0 (flag) | Thin explanation — candidate may lack learning support. Flag for remediation, not difficulty adjustment |
| **Formula provided in stem** | -1 | Reduces recall burden |
| **Company name only (no scenario)** | -1 | No scenario parsing required |

**v1.1 clarification:** These modifiers adjust **difficulty only** — never CL. Multi-step calculations increase difficulty, not cognitive level. Formula provision reduces difficulty, not cognitive level. The two axes (CL and Difficulty) are determined sequentially and independently.

---

## §5 — Type-Specific Adjustments

| Type | Default Modifier | Rationale |
|------|-----------------|-----------|
| numeric | 0 | Calculation demand already reflected in CognitiveLevel |
| select | 0 | Distractor quality assessed by modifier rules |
| multi | +1 (often) | Selecting multiple correct answers requires broader concept mastery |
| fill | -1 (often) | Fill-in-the-blank is often definition recall |
| match | 0 | Complexity depends on number of items and cross-domain nature |

---

## §6 — Distribution Targets (Aspirational)

| Difficulty | Target % | Notes |
|-----------|----------|-------|
| Easy | 15% | Essential for foundational knowledge assessment |
| Moderate-Easy | 20% | Bridges recall and application |
| Moderate | 30% | Core competency level — most items should be here |
| Difficult | 25% | Discriminates between competent and excellent candidates |
| Very Difficult | 10% | Top-tier discrimination |

**v1.1 policy:** These are aspirational targets for content composition, not quotas. No item shall be recalibrated solely to meet a distribution target. Difficulty must reflect actual cognitive demand. Pre-S719 pool: ~8% Easy, ~48% Moderate-Easy, ~33% Moderate — reflecting the real distribution of a comprehension-heavy CMA Part 1 exam, not a calibration error. Post-S720 pool (expected): ~20% Easy, ~37% Moderate-Easy, ~37% Moderate, ~6% Difficult, 0% Very Difficult. The DS4 and DS5 deficits reflect genuine content gaps requiring new item authoring, not recalibration.

---

## §7 — CL Classification Protocol (Sequential)

**Step 1 — Read the stem and answer choices.** Do NOT look at existing CL/Difficulty labels.

**Step 2 — Determine the dominant cognitive process.**

**Step 3 — Classify using the boundary decision trees (§9).**

**Step 4 — Verify:** "Would removing the company name change the cognitive process?" If yes, CL is likely overstated. Apply the Understand-vs-Apply scenario operativity test.

**Step 5 — Assign CL.** Record confidence in the assignment (0–100, genuine estimate, not a template value).

**Step 6 — Apply CL→Difficulty mapping (§3) to get default DifficultyScore.**

**Step 7 — Apply secondary modifiers (§4) only where evidence-supported. Modifiers adjust difficulty only — never CL.**

**Step 8 — Check forbidden triggers (§8) and pre-certification checklist (§10) before certification.**

---

## §8 — Forbidden Triggers for CL Assignment

The following patterns were the root cause of 1,604 DCS §3 misalignments across the existing pool (Post-S720 scan). They **must not** be used as CL classification inputs:

### 8.1 Primary Triggers

| Forbidden Trigger | Does NOT mean | Why |
|-------------------|---------------|-----|
| "Which response is most appropriate?" | Evaluate | Template filler. All 55 sampled items using this phrase tested single-standard comprehension. Zero genuine Evaluate items found (S719 Agent C). |
| Company name in stem | Apply | Cosmetic wrapper. If removing the company name leaves an equivalent question, it's Understand, not Apply. (§9.2 operator test 1) |
| Multi-step calculation (≥3 steps) | Analyze | Number of calculation steps increases DIFFICULTY, not cognitive level. Multi-step formula execution is still Apply. |
| Template position in rotation group | Any CL | Template-position CL assignment is the root cause of all four boundary-zone errors. Pre-S719: 48 of 58 Analyze items (83%) are template clones with the same CL by position. 168 of 223 Evaluate items (75%) are template-position artifacts. |
| The word "analyze" / "analysis" in the stem | Analyze | The scenario may describe analysis, but the item asks the candidate to IDENTIFY the concept. Example: "Wants to analyze ROI by breaking it into margin and turnover. What approach is being used?" → Understand (description-to-concept matching). |
| The word "evaluate" in the stem | Evaluate | Same pattern as "analyze" — the scenario describes evaluation, the item asks for concept identification. |
| Confidence value of 86 or 100 | Verified assignment | Template defaults, not reviewer scores. ~120 items have conf=86 from template; ~50 Pack E items have conf=100. Neither represents a genuine per-item review. |

### 8.2 Difficulty-Specific Triggers

| Forbidden Trigger | Why Forbidden |
|-------------------|---------------|
| "Difficult sounds right for [Section E/F]" | Evidence-based only — DCS §6: no difficulty inflation to appear harder |
| Quota-filling to hit CAQS §6.1 distribution targets | DCS §6: aspirational, not a quota |
| Template position labeling (e.g., item 3 in rotation group = Difficult) | Same root cause as CL template errors |
| Pack E template Difficulty/4 default | Pre-S719: 284 Pack E Remember/Difficult items → all should be ME/2 at Understand |
| "Confidence=100 so the stored value must be right" | Pack E conf=100 is a template default, not review score |
| **Analyze@Easy or Evaluate@Easy** | Analyze requires discrimination between methods/approaches; Evaluate requires professional judgment. If Difficulty is Easy, by definition no meaningful discrimination or judgment is required. Analyze+Easy or Evaluate+Easy is a logical contradiction — either the CL is overstated (reclassify to Understand/Apply) or the DS is understated (upgrade to ≥Moderate/3). Flag for mandatory re-evaluation. |

### 8.3 Confidence-Specific Triggers

| Trigger | Actual Meaning |
|----------|----------------|
| Confidence=86 | Template default for rotation-authoring pipeline (~120 items). Not a reviewer score. |
| Confidence=100 | Pack E template default (~50 items). Not independently verified. |
| Confidence=67, 71, 55 | Author(s) were uncertain but template assigned CL anyway. Low confidence + high CL = likely over-assignment. |
| Uniform confidence value across ≥10 contiguous items | Template-assigned. Treat as confidence=0 (unreviewed). |

### 8.4 The DL-012 Clone Pattern (Template-Position CL)

The single most destructive CL assignment pattern: items generated via a 5-item rotation template where:

1. The stem skeleton is identical across all 5 items
2. Only the company name varies (alphabetical progression)
3. Answer choices are positionally rotated so correct answer lands in A/B/C/D/A once per group
4. **CognitiveLevel is assigned by position in the rotation group** — not by content analysis
5. This produces fixed CL patterns (e.g., position 3 always = Analyze, position 4 always = Evaluate)

**Impact (Pre-S719):** 48 of 58 Analyze items (83%) and ~168 Evaluate items are template-position artifacts. These items are structurally identical across Packs C and D (DL-012). The template CL assignment is categorically wrong — per-item review reclassifies most as Understand (description-to-concept matching).

### 8.5 DL-016 Dual-Block CL Authority Rule

For items in dual-block architecture packs (Pack A, Pack C, Pack D), two JSON blocks per QuestionID exist: a metadata block (with ChoiceA–D, ExplanationWrongA–D, question_state) and a content block (with Choices.{A,B,C,D}, CorrectChoice, ExplanationCorrect). The metadata block's CL field may diverge from the content block's CL field due to the DL-016 metadata-content shift (metadata advertises the *previous* QID's topic).

**Rule:** The **content-block CognitiveLevel** is authoritative. Metadata-block CL is template residue. When the two blocks diverge, use the content-block value for all calibration, certification, and learner-pool eligibility decisions.

**Detection:** Scan dual-block packs for items where metadata-block CL ≠ content-block CL. Flag all mismatches. Reconcile to content-block CL.

**Certification gate:** No dual-block item shall be certified with a metadata-block CL that differs from its content-block CL. The CL field in the metadata block must be updated to match before certification can proceed.

---

## §9 — Boundary Decision Trees

### 9.1 Remember vs Understand — Same-Domain Distractor Test

```
START: Candidate reads stem and 4 choices.

Q1: "Are ALL 4 answer choices from the SAME narrow accounting domain?"

YES → Q2: "Can the candidate answer correctly by keyword-matching
          the definition alone, without understanding conceptual
          relationships within the domain?"
        YES → REMEMBER
        NO  → UNDERSTAND

NO  → Q3: "Are at least 2 distractors from ENTIRELY DIFFERENT domains
          than the correct answer?"
        YES → REMEMBER (candidate can eliminate by domain-disjoint logic)
        NO  → Q4 (proceed to Understand-vs-Apply tree)
```

**Black-Letter Rule:** Remember is reserved for items where at least **2 of 4 distractors are from entirely different domains** than the correct answer, enabling elimination by domain-disjoint logic without understanding the concept. If ALL distractors are plausible alternatives from the same narrow domain, the default CL is **Understand**.

**Operator Test:** "Can a candidate who memorized the glossary definition but does not understand the conceptual relationship eliminate this distractor?" → If yes on 2+ distractors, Remember. → If no on any distractor, Understand.

**"Different Domain" Defined:**

| Category | Same Domain | Different Domain |
|----------|------------|-----------------|
| Financial reporting | All financial statements, measurement bases, GAAP treatments | Tax rules, legal concepts, cost accounting, strategy |
| COSO framework | All COSO components, sub-components, IC/ERM concepts | Production metrics, financial ratios, forensic standards |
| BSC | All 4 BSC perspectives, their questions, their measures | Budgeting methods, financial ratios, COSO categories |
| Cost behavior | All cost behavior patterns, cost formulas, cost estimation methods | Revenue recognition, inventory valuation, ethics |
| Analytics | All analytics maturity levels (descriptive/predictive/prescriptive) | ERP modules, blockchain, labor standards |
| Quality costs | All 4 COQ categories (prevention/appraisal/internal failure/external failure) | Variances, depreciation, transfer pricing |

**Pack E Section F Caveat:** Technology items where all distractors are technology concepts may appear same-domain but are trivially distinguishable. For example, "Blockchain provides:" with distractors "Paper verification" and "Manual reconciliation" — these are clearly different concepts from "Distributed immutable records." In these edge cases, even though distractors are "technology" concepts, their extreme conceptual distance makes the item Remember. The test is: "Can a candidate eliminate this distractor by recognizing it describes an opposite or obviously different concept?" → If yes, that distractor counts as "different domain" for the 2-of-4 test.

**Examples (from pool):**
- **Remember:** "R-squared measures:" Choices: Proportion of variation explained (correct) vs. correlation coefficient, standard error, slope. All regression terms but clearly different concepts → borderline Remember (P1B-B-116).
- **Understand:** P1E-E-002: "The control environment reflects:" Choices: Financial reporting, Physical controls, Organizational ethical values (correct), Monitoring activities. ALL COSO concepts → must understand component mapping.
- **Understand:** P1E-C-019: "The financial perspective of BSC asks:" ALL 4 choices are the 4 BSC perspective questions → must map correctly.
- **Understand:** P1E-C-028: "Prevention quality costs include:" Choices are examples from all 4 COQ categories → must classify.

**The Pack E Structural Error (Pre-S719):** 284 of 386 Remember items (74%) were actually Understand by this decision tree. The template assigned Remember to any item formatted as "X is/reflects/includes/uses:" regardless of distractor domain overlap. Post-S720, this has been partially corrected (~7 items restored to Remember), but the structural reclassification of ~284 items from Remember → Understand shifts the pool-wide distribution from Remember=18% to Remember≈2% and Understand from 24% to ≈46%.

---

### 9.2 Understand vs Apply — Scenario Operativity Test

```
START: Candidate reads stem with scenario elements.

Q1: "Does the stem contain OPERATIVE facts (specific numbers,
    transaction details, legal conditions, dates) that the
    candidate must PROCESS to arrive at the answer?"

YES → Q2: "If the scenario facts were removed, could the question
          still be answered with the same cognitive process?"
        YES → UNDERSTAND (scenario is cosmetic)
        NO  → APPLY

NO  → UNDERSTAND
```

**Operator Tests:**
1. "If the company name and scenario description were removed, does the core question remain unchanged?" → If yes, Understand.
2. "Is there any independent calculation or fact-parsing required beyond concept recognition?" → If yes, Apply.
3. "Does the stem contain a specific number, date, or transaction condition that drives the answer?" → If yes, Apply.

**Method-Given Test (supplemental):** If the stem specifies what method to use (e.g., "Using the high-low method..."), it's Apply. If the candidate must select the method, it's Analyze. This test is definitive for the Apply-vs-Analyze boundary but useful as a secondary check here.

**Black-Letter Rule:** A scenario with company name alone does NOT create Apply. Apply requires the candidate to EXECUTE a procedure on scenario-specific data. If removing the scenario leaves the same cognitive demand, the item is Understand.

**Examples (from pool):**
- **Apply (scenario is operative):** P1-A-009: "A company purchases equipment for $96,000 on July 1. Salvage value $12,000, useful life 7 years. Using straight-line depreciation, what is the depreciation expense for the first calendar year?" → Requires computing ($96,000−$12,000)/7 × 6/12. Numbers are operative.
- **Apply:** "Umbra sells equipment with a separately priced installation service that is distinct from the equipment." → Must apply ASC 606: identify 2 performance obligations, allocate transaction price.
- **Understand (scenario is cosmetic):** P1-B-004: "Umbra wants to maintain a constant 12-month planning horizon. Which response is most appropriate?" → Answer: "Rolling budget" — identified by the "constant 12-month horizon" concept. Removing "Umbra" leaves the same question.
- **Understand:** P1-B-071: "Vantage requires every department to justify its entire budget from a base of zero each year. What is the main advantage of this zero-based budgeting approach?" → This is conceptual comprehension of an advantage, not application.
- **Understand:** P1-F-002: "Willow is selecting a system to support rolling forecasts, management reporting, and consolidated planning packages. Which capability best describes an EPM system?" → Concept recognition from description — not application.

**Bidirectional Error Pattern (Pre-S719):** Agent E found ~150 items classified Understand that should be Apply (GAAP scenario with operative facts) and ~70 items classified Apply that should be Understand (scenario is cosmetic concept wrapper). Both errors arise from the same template: "which response is most appropriate?" was treated as Apply when paired with a company name, and Understand without one.

---

### 9.3 Apply vs Analyze — Method-Selection Test

```
START: Candidate reads stem describing a situation.

Q1: "Is the method/standard/formula to use GIVEN in the stem
    (explicitly or by strong implication)?"

YES → APPLY (candidate executes given procedure)

NO  → Q2: "Must the candidate DETERMINE which method, concept, or
          analytical approach is appropriate from among alternatives?"
        YES → Q3: "Does this require simply matching the situation
                  to a concept NAME (e.g., 'this describes X
                  analysis')?"
                YES → UNDERSTAND (description-to-concept matching)
                NO  → ANALYZE
        NO  → APPLY
```

**Operator Test (the definitive rule):** "If the stem tells you what to do and you just do it → Apply. If the stem describes a situation and you must decide what to do → Analyze. If the stem describes a situation and you just name the concept being used → Understand, not Analyze."

**Black-Letter Rule:** Analyze requires the candidate to DETERMINE WHICH method, concept, or cause applies to a scenario from among multiple valid alternatives. The method is NOT given — the candidate must select the right analytical approach. Multi-step formula execution with a given method remains Apply.

**Definition-Match Trap (Critical):** Items where the stem DESCRIBES analysis ("analyzes profitability by customer...", "analyzes ROI by breaking it into margin and turnover...") but asks the candidate to IDENTIFY/NAME the technique are **Understand** — not Analyze. The scenario describes analysis, but the candidate's task is recognition.

**Examples (from pool):**
- **Analyze (method selection required):** P1-CD-017: "Actual sales had more Product A and less Product B than budgeted. Why did contribution margin change even though total unit volume matched budget?" → Candidate must determine that sales mix variance is the cause, then compute it. The analytical approach (mix variance decomposition) is not given — candidate must select it.
- **Analyze:** P1-DD-031: "Analyze HOW automation that increases fixed costs and reduces variable costs affects DOL." → Requires conceptual reasoning about cost structure → operating leverage sensitivity. No direct formula application — must trace causal chain.
- **Analyze:** P1-B-036: "Delta's flexible budget for 8,000 units shows budgeted variable costs of $64,000. Actual output was 8,000 units with actual variable costs of $70,000. What does this variance indicate?" → Candidate must INTERPRET the meaning of an unfavorable variance. Pure analysis — no formula required.
- **Analyze:** P1-E-040: "Keystone finds employees retain access after changing departments." → Candidate must identify this as an access control/SOD weakness from a scenario. Requires analyzing the control gap.
- **Apply (method given):** "Using the high-low method, compute the variable cost per unit: [data]." → Method is given (high-low). Candidate executes. Multi-step arithmetic with a given method is still Apply.
- **Apply:** P1B-C-175: ABC overhead cost per unit with given numbers: (2×4000 + 5×500)/100 = $105. Formula execution — the method (ABC) is given.
- **Understand (description-to-concept, NOT Analyze):** P1-CC-008: "Wants to analyze ROI by breaking it into margin and turnover. What approach is being used?" → Answer: DuPont analysis. The question DESCRIBES analysis but asks the candidate to NAME the method.
- **Understand:** P1-DC-016: "Wants to allocate joint costs based on relative sales value at split-off. What method?" → Description-to-concept match. Not Analyze.
- **Understand:** P1-EC-061: "Assesses susceptibility before considering controls. What type of risk?" → Inherent risk. Audit risk model recognition. Not Analyze.

**Clone-Group Problem (Pre-S719):** 48 of 66 labeled Analyze items (72.7%) are 5-item template clones. The template assigned CL=Analyze by rotation position. These items follow the DL-012 pattern: same stem skeleton, different company name only. Per-item review reclassifies all 48 to Understand (description-to-concept matching) or Apply (execute given method). Post-S720 true Analyze count: ~25–33 items (1.0–1.3% of pool). Post-S720 Agent G pack-level review: 66 Analyze items pool-wide (2.6%), with Pack C (4.6%) and Pack D (4.6%) having the highest concentrations.

---

### 9.4 Analyze vs Evaluate — Professional Judgment Test

```
START: Candidate reads stem. Stored CL is Evaluate.

Q1: "Is there exactly ONE correct answer under GAAP/COSO/the
    applicable standard (or by clear logical reasoning)?"

YES → Q2: "Despite the 'most appropriate' phrasing, is this
          effectively 'Which treatment is correct under [standard]?'"
        YES → NOT Evaluate → reclassify as Understand or Apply
                             based on §9.2-§9.3 decision trees.

NO  → Q3: "Could a well-prepared CMA candidate reasonably defend
          at least two different answers, where the disagreement
          is about professional judgment (trade-offs, ethical
          priorities, or strategic preferences), NOT about knowing
          the correct standard?"
        YES → EVALUATE
        NO  → NOT Evaluate → reclassify as Analyze
```

**Two-Competent-Practitioners Test:** "Could two well-prepared CMA candidates, both knowing the relevant standards, reasonably defend different answers?" → If yes, Evaluate. → If one answer is demonstrably correct under the standard and the other is simply wrong, NOT Evaluate.

**Operator Tests:**
1. "Is there exactly one correct answer under GAAP/COSO/the standard?" → If yes, NOT Evaluate.
2. "Could a well-prepared candidate reasonably defend a different answer?" → If yes, Evaluate.
3. "'Which response is most appropriate?' when the question is really 'Which treatment is correct under GAAP?'" → NOT Evaluate — this is the template inflation pattern.

**Black-Letter Rule:** Evaluate requires genuine PROFESSIONAL JUDGMENT where: (a) multiple answers could be reasonably defended under existing standards, OR (b) the candidate must weigh trade-offs between competing objectives using a professional framework. Items with a single GAAP-correct answer are NOT Evaluate, regardless of phrasing.

**"Which response is most appropriate?" Trap:** This phrase was the single largest source of CL inflation. Pre-S719: 168 of 223 Evaluate items (75.3%) contain this phrase and test single-standard comprehension. The phrase was template filler — it does NOT signal Evaluate. Of 55 sampled items with this phrasing, zero were genuine Evaluate.

**Template-Inflation Pattern Recognition:**
- Evaluate + Easy/1 difficulty → Overwhelmingly template-inflated (168 items). No genuine professional-judgment question can be Easy.
- Evaluate + "Which response is most appropriate?" → Reclassify as Understand or Apply based on §9.2-§9.3 decision trees.
- Evaluate + "Under GAAP" / "Under ASC XXX" / "Under COSO" → Single correct answer exists. NOT Evaluate.

**S719 Finding:** Of 244 sampled Evaluate items, zero genuine Evaluate items were found. 168 were the template "most appropriate" pattern (reclassified to Understand). 76 were Pack E definition-match items at Difficult difficulty (reclassified to Understand). All Evaluate+Easy items are template-inflated.

**True Evaluate Characteristics:**
- Multiple defensible answers where the candidate must select the best among alternatives with genuine trade-offs
- A recommendation requiring professional judgment about which approach to use when standards allow discretion
- An ethical dilemma requiring application of the IMA Statement to determine the correct course of action where multiple principles may conflict
- Assessment of the quality or appropriateness of a course of action given multiple valid frameworks

**Post-S720 state:** 67 Evaluate items remain pool-wide. Agent H (S720 Boundary Adjudication) confirmed 0 genuine Evaluate items in a 25-item zone 4 sample. The true Evaluate count is likely 0–5 items pool-wide.

---

## §10 — Pre-Certification Calibration Checklist

Before any item reaches `question_state: "Certified"`, verify:

- [ ] CL assigned by cognitive demand, not template position (§8 trigger check)
- [ ] Same-domain distractor test applied (Remember vs Understand — §9.1)
- [ ] Scenario operativity test applied (Understand vs Apply — §9.2)
- [ ] Method-selection test applied (Apply vs Analyze — §9.3)
- [ ] Professional-judgment test applied (Analyze vs Evaluate — §9.4)
- [ ] If CL=Evaluate, documented evidence: "What two defensible positions exist?" (§9.4)
- [ ] Difficulty assigned by CL→DCS §3 mapping
- [ ] DCS §4 modifiers applied only where evidence-supported
- [ ] "Plausible distractor ≥3" modifier gated: Jaccard similarity < 30% between distractors
- [ ] DifficultyScore is within ±1 of DCS §3 default for the assigned CL (>±1 → re-evaluate CL)
- [ ] Analyze@Easy and Evaluate@Easy logical-contradiction check (§8.2)
- [ ] Confidence gate passed: CL confidence ≥70 or human-reviewed
- [ ] Confidence value is not a template default (scan for contiguous uniform values ≥10 items)
- [ ] No forbidden triggers active (§8)
- [ ] Cross-pack consistency checked: spot-check 3+ items from other packs in same domain at same CL
- [ ] **DL-016 dual-block check (Packs A/C/D):** metadata-block CL matches content-block CL. If divergent, content-block CL is authoritative (§8.5). Update metadata-block CL to match before certification.

---

## §11 — Disagreement Resolution Process

When two reviewers disagree on CognitiveLevel classification:

### 11.1 Process

1. **Independent Third Review.** A third reviewer — who has not participated in the prior two reviews and has not seen either reviewer's rationale — classifies the item using the §9 decision trees. The third reviewer reads only the stem and choices (not existing labels).

2. **Explicit Evidence Requirement.** Each reviewer must document:
   - The specific boundary zone in question
   - The decision tree path they followed (§9)
   - The operator test result(s) that drove their conclusion
   - The QID and stem text being evaluated

3. **Decision Recorded with Dissenting Opinion.** The majority classification (2 of 3) becomes the assigned CL. The dissenting reviewer's rationale is recorded in REVISION_HISTORY.md alongside the final decision. The rationale must be retrievable for future re-evaluation.

4. **No Averaging — Binary Decision.** CL classification is a discrete category, not a continuous scale. Averaging "Understand" and "Apply" to create a composite "Understand-Apply" is not permitted. The item receives exactly one CL.

5. **Tiebreaker Rule.** If all three reviewers return different classifications (no majority), escalate to the escalation criteria. The item must remain in "Editorial Queue" — not certified.

### 11.2 Disagreement Escalation

| Scenario | Action |
|----------|--------|
| Two reviewers agree → third dissents | Majority wins. Record dissenting opinion. |
| All three disagree (3-way split) | Escalate to human-tiebreak. Document all three rationales. Item remains in Editorial Queue. |
| Disagreement involves CL=Evaluate | Automatic escalation. Human review required before any Evaluate label is certified. |
| Disagreement spans > 1 CL level (e.g., Remember vs Apply) | Both reviewers may be wrong. Re-run decision tree from Q1 of each boundary zone in sequence. |

### 11.3 Documentation Standard

Every disagreement resolution must produce a record with:
- QID, stem (first 80 chars), the two competing CLs, confidence per reviewer
- The specific boundary zone(s) in question
- The third reviewer's classification and rationale
- The final decision and rationale
- Timestamp and reviewer identifiers

### 11.4 S720 Reliability Baseline

The S720 systematic testing established the following inter-reviewer agreement rates as baseline for disagreement frequency expectations:

| Boundary Zone | N | Agreement Rate | Dominant Hotspot | Note |
|---------------|---|----------------|-----------------|------|
| Remember vs Understand | 50 | 94% | Pack E same-domain misclassification | Strongest agreement zone |
| Understand vs Apply | 50 | 73.7% | **86.3% of disagreements: Apply→Understand** | Highest disagreement zone — systematic CL overstatement |
| Apply vs Analyze | 50 | 84% | 16% agreement on boundary items (stored-label error, not tree error) | Template CL inflation + description-to-concept trap |
| Analyze vs Evaluate | 50 | ~90% | 0 genuine Evaluate items found | Agreement on NOT-Evaluate; template inflation zone |
| **Pool-wide** | **200** | **~85%** | **Understand-vs-Apply boundary** | **73.7% agreement is the critical reliability gap** |

The 73.7% Understand-vs-Apply agreement rate and 86.3% Apply→Understand hotspot constitute the primary calibration reliability concern. Most disagreements are systematic CL overstatement (items labeled Apply that are actually Understand), not random noise.

---

## §12 — Reviewer Decision Trees — Quick Reference

For rapid classification in audit/certification sessions. Each tree provides a "stop condition" — the first question that resolves to a definitive classification.

### Tree R1 — Remember vs Understand

```
1. Are ALL 4 answer choices from the same narrow accounting domain?
   → YES: Go to 2.
   → NO:  Are ≥2 distractors from ENTIRELY DIFFERENT domains?
          → YES: REMEMBER (STOP). Domain-disjoint elimination possible.
          → NO:  UNDERSTAND (STOP). Requires comprehension.

2. Can the candidate answer by keyword-matching the definition
   alone (no conceptual relationships)?
   → YES: REMEMBER (STOP). Pure recognition.
   → NO:  UNDERSTAND (STOP). Requires concept comprehension.
```

### Tree R2 — Understand vs Apply

```
1. Does the stem contain OPERATIVE facts (specific numbers, dates,
   transaction details, legal conditions) that the candidate must
   PROCESS?
   → NO:  UNDERSTAND (STOP). No data to apply.
   → YES: Go to 2.

2. If the scenario facts were removed, could the question still
   be answered with the same cognitive process?
   → YES: UNDERSTAND (STOP). Scenario is cosmetic.
   → NO:  APPLY (STOP). Scenario facts are required.
```

### Tree R3 — Apply vs Analyze

```
1. Is the method/standard/formula to use GIVEN in the stem?
   → YES: APPLY (STOP). Candidate executes given procedure.
   → NO:  Go to 2.

2. Must the candidate DETERMINE which method among alternatives
   is appropriate?
   → NO:  APPLY (STOP). Method is obvious from context.
   → YES: Go to 3.

3. Does this require simply matching the situation to a concept
   NAME (e.g., "this describes X analysis")?
   → YES: UNDERSTAND (STOP). Description-to-concept matching.
   → NO:  ANALYZE (STOP). Genuine method selection required.
```

### Tree R4 — Analyze vs Evaluate

```
1. Is there exactly ONE correct answer under GAAP/COSO/the
   applicable standard?
   → YES: NOT EVALUATE → reclassify using R2 or R3 (STOP).
   → NO:  Go to 2.

2. Could a well-prepared CMA candidate reasonably defend at
   least two different answers based on professional judgment?
   → YES: EVALUATE (STOP). Genuine professional judgment required.
   → NO:  ANALYZE (STOP). Objective answer, requires analysis.
```

---

## §13 — Confidence Gate Protocol

### 13.1 Confidence Thresholds

| CL Confidence | Action | Rationale |
|---------------|--------|-----------|
| ≥ 85 AND genuinely reviewed | Accept assignment | Must be human-verified or AI-reviewed with per-item evidence (not template default) |
| 70–84 | Accept with documented rationale | Write one-sentence justification for the CL choice |
| 50–69 | **Gate: Requires human review** | Assignment is uncertain. Do not certify without review. |
| < 50 | **Gate: Requires independent re-classification** | Assignment is unreliable. Re-run §9 decision tree from scratch. |

### 13.2 Template Confidence Detection

Any confidence value that appears uniformly across a contiguous block of ≥10 items (e.g., 25 items all at conf=86, or 50 items all at conf=100) is a **template default**, not a reviewer score. These items must be treated as unreviewed (confidence=0 for gate purposes).

**Detection rule:** Scan for `Confidence` values in contiguous QID ranges. If the same value repeats ≥10 times within a section with no variation, flag as template-assigned.

### 13.3 Cross-Clue: Low Confidence + High CL

When a low-confidence item (conf < 70) carries a high CL (Analyze or Evaluate), this is a strong signal of over-assignment. The authoring template assigned a high CL mechanically, but the reviewer flagged uncertainty. These items are the highest-priority targets for CL recalibration.

---

## §14 — Drift Detection Process

### 14.1 Quarterly Alignment Scan

1. **Run DCS §3 alignment scan**: Extract every item's CL→Difficulty pair. Compare against §3 defaults. Flag items where gap exceeds ±1.
2. **Count by category**: Items at default; items with ±1 modifier; items with ≥2 gap.
3. **Trend analysis**: Compare current gap distribution to S720 baseline.

### 14.2 Boundary Zone Analysis (Agent E Methodology)

For each of the 4 boundary zones, sample 50 items and re-score:

| Zone | Scan Target | Expected Post-Correction Baseline |
|------|------------|----------------------------------|
| Remember vs Understand | Items with all-same-domain distractors + CL=Remember | Remember ≈ 105 (down from 435). Understand ≈ 915 (up from 587). |
| Understand vs Apply | Items with operative scenario facts + CL=Understand | Cosmetic-only scenarios should not be Apply. True Apply: ~1,270 items. |
| Apply vs Analyze | Items with CL=Analyze + "method given" in stem | Analyze ≈ 25–33 (down from 58). Most reclassified to Understand. |
| Analyze vs Evaluate | Items with CL=Evaluate + single-correct-answer | Evaluate ≈ 0–5 (down from 223). Most reclassified to Understand/Apply. |

### 14.3 Pool-Wide Distribution Targets

| CL Level | CAQS §6.2 Target | S720 Post-Correction Expected | Note |
|----------|------------------|------------------------------|------|
| Remember | 5% | ~2% (57 items) | Pure recall — narrow range |
| Understand | 15% | ~46% (1,160 items) | Comprehension dominates CMA Part 1 |
| Apply | 40% | ~47% (1,168 items) | Core competency |
| Analyze | 25% | ~2.6% (66 items) | Under CAQS target — requires content authoring |
| Evaluate | 15% | ~2.7% (67 items) | Under CAQS target — requires content authoring |

**Key Policy:** Analyze and Evaluate undercounts do NOT indicate calibration drift. The existing pool genuinely has fewer items at these levels. The S719–S720 recalibration corrected inflated labels, revealing the true distribution. Content authoring (not recalibration) must close these gaps.

### 14.4 Post-S720 Pool-Wide Calibration Metrics (Agent G, S721)

| Metric | Value | Source |
|--------|-------|--------|
| DCS §3 pool-wide compliance | 88–89% (excluding Pack E's artificial 97.2%) | Agent G pack-level scan |
| Apply@Easy systematic under-calibration | 180 items pool-wide (gap=-2) | All 5 packs |
| DS4 deficit | 6% pool-wide | Highest in Pack D (11.8%); lowest in Pack A (0%) |
| DS5 absence | 0 items pool-wide | All 5 packs |
| DL-012 active clone-pattern items | ~150 (Pack C/D Sections E/F) | 112 archived + ~150 active |
| Pack E CL narrowness | 78.8% Understand | Taxonomy failure, not calibration failure |

---

## §15 — Cross-Lane Consistency

| Lane | Document Reference | This Standard Applies |
|------|-------------------|----------------------|
| 100-series (May) | May tutoring configuration | Learner-facing difficulty for adaptive recommendations |
| 500-series (Case bank) | scored_cases1-5 | Item-level difficulty for case-study items |
| 700-series (MCQ) | pack_a-e_corrected.js | Item-level difficulty for standalone MCQ items |

Same evidence rules apply across all lanes. No lane-specific difficulty inflation or deflation is permitted.

### 15.1 Cross-Pack Consistency Rule (Agent H, S720)

Agent H identified systematic CL inconsistency across packs for identical item patterns (Post-S720 scan):

| Pattern | Pool Norm | Pack A (Deviant) | Pack E (Deviant) |
|---------|-----------|-----------------|-----------------|
| Definition-match | Apply | Evaluate (58/72 items) | Remember (127/164 items) |
| Calculation | Apply | Consistent | Consistent |
| Framework-application | Apply | Consistent | Remember (44/57 items) |

**Rule:** Any pack whose dominant CL for a structural pattern deviates from the pool norm by ≥1 level must be flagged for batch CL recalibration. Pack A Section A Evaluate→Apply and Pack E Remember→Understand are the current priority targets.

### 15.2 Pack B as Calibration Benchmark (Agent G, S721)

Pack B is the structural benchmark for calibration quality:
- **Most diverse CL distribution:** Remember (8.2%), Understand (22.2%), Apply (65.0%), Analyze (3.0%), Evaluate (1.6%)
- **Best DS distribution:** closest to CAQS §6.1 targets
- **Single-block architecture:** no DL-016 metadata-content shift contamination
- **100% Certified** with consistent state-field coverage

Pack B's DCS §3 compliance rate (84.6%) is lower than Pack E's (97.2%) but reflects genuine calibration variance, not taxonomic narrowness. The compliance rate alone is not a sufficient quality measure — CL distribution diversity must be weighted equally.

---

## §16 — Implementation History

| Session | Date | Scope | Items |
|---------|------|-------|-------|
| S713 | 2026-07-26 | DL-031: Definition-match inflation (Moderate→Moderate-Easy) | 186 MCQ |
| S714A | 2026-07-26 | DL-031 evidence audit: Easy concentration | Audit |
| S715 | 2026-07-26 | DL-031: Scenario-calculation + definitional (Easy→Moderate-Easy) | 124 MCQ |
| S716 | 2026-07-26 | DL-032: Case-bank calibration (CognitiveLevel-driven) | 472 case |
| S717 | 2026-07-26 | Calibration governance validation audit | Audit |
| S718 | 2026-07-26 | CognitiveLevel field enrichment | 2,425 items |
| S719 | 2026-07-26 | Difficulty × CognitiveLevel alignment (4 boundary zones) | 542 analyzed |
| S720 | 2026-07-26 | Cross-pack consistency (Agent H), Analyze gap research (Agent J), reconciliation | 2,500 items |
| S721 | 2026-07-26 | Agent G pack-level calibration scorecard; Agent D Validation Board; Agent H Boundary Adjudication; Agent F Analyze Audit; Agent O finalization | 2,500 items |

**Total calibrated:** 782 items across MCQ and case banks. 2,500 items inventoried with corrected CL attribution.

---

## §17 — Key Recommendations (v1.1)

1. **"Which response is most appropriate?" is a forbidden CL trigger.** This template filler was the single largest source of CL inflation — 168 items falsely labeled Evaluate (Pre-S719).

2. **Same-domain distractors → Understand, not Remember.** The single largest structural error (284 Pack E items, Pre-S719). Apply the same-domain distractor test (§9.1) to every item.

3. **Evaluate requires the two-competent-practitioners test.** If you cannot articulate two defensible positions, the item is not Evaluate.

4. **Analyze requires method selection — not execution.** If the stem tells you what to do, it's Apply. If it asks you to name the method, it's Understand.

5. **Scenario presence alone does not create Apply.** Apply the scenario operativity test (§9.2): remove the company name — if the question is unchanged, it's Understand.

6. **Template-position CL is categorically invalid.** 48 Analyze clones and 168 Evaluate items (Pre-S719) are template artifacts. Run the §9 decision trees — never trust the label.

7. **Confidence=86 and Confidence=100 are template defaults, not review scores.** Treat as unreviewed.

8. **CL and Difficulty are sequential and independent.** Classify CL first using the decision trees. Then calibrate difficulty using the §3 mapping. Never conflate cognitive level with cognitive load.

9. **Analyze@Easy and Evaluate@Easy are logical contradictions.** Analyze requires discrimination between methods; Evaluate requires professional judgment. Both are incompatible with Easy/1 difficulty. Flag for mandatory re-evaluation (§8.2).

10. **In dual-block architecture packs (A/C/D), content-block CL is authoritative.** Metadata-block CL may diverge due to DL-016 shift. Reconcile to content-block CL before certification (§8.5).

11. **The Understand-vs-Apply boundary is the highest-disagreement zone** (S720: 73.7% agreement, 86.3% Apply→Understand hotspot). Apply the scenario operativity test rigorously — cosmetic scenarios do not create Apply.

---

## Appendix A — S720 Reliability Data

### A.1 Inter-Reviewer Agreement by Zone

| Boundary Zone | Sample N | Agreement Rate | Dominant Mismatch Direction | Note |
|---------------|----------|---------------|---------------------------|------|
| Remember vs Understand | 50 | 94% | Remember→Understand (Pack E same-domain) | Strongest agreement; tree is nearly deterministic |
| Understand vs Apply | 50 | **73.7%** | **Apply→Understand (86.3% of disagreements)** | Critical gap — systematic CL overstatement |
| Apply vs Analyze | 50 | 84% | Analyze→Understand (description-to-concept trap) | Template CL inflation + definition-match trap |
| Analyze vs Evaluate | 50 | ~90% | Evaluate→Understand/Apply (template inflation) | Agreement on NOT-Evaluate; verification of true Evaluate is the challenge |

### A.2 Understand-vs-Apply Hotspot Detail

The 73.7% agreement rate on the Understand-vs-Apply boundary is the most significant reliability concern. Of the disagreements:

- **86.3% are Apply→Understand overstatements:** Items labeled Apply that the independent reviewer classifies as Understand. The most common pattern: items with cosmetic scenarios (company name only, no operative facts) labeled Apply.
- **13.7% are Understand→Apply understatements:** Items with operative facts labeled Understand that should be Apply. Less common — affects ~15% of boundary-zone disagreements.

**Root cause:** The "which response is most appropriate?" phrasing combined with any company name presence was treated as Apply by template authors. The scenario operativity test (§9.2) correctly discriminates these.

### A.3 Zone 3 (Apply vs Analyze) Detail

Agent H (S720 Boundary Adjudication) confirmed 16% agreement on the Apply-vs-Analyze boundary zone, but attributed this to **stored-label error, not decision-tree error**. When both reviewers independently applied the §9.3 tree without seeing the existing label, agreement rose to 84%. The 16% agreement rate reflects disagreement with the stored label — not disagreement between reviewers.

### A.4 Agent F Analyze Structural Gap Finding

Agent F (S721 Analyze Audit) confirmed only **~8–10 genuine Analyze items (0.36%)** in the pool after applying the §9.3 method-selection test independently. This is a **structural content gap** — the existing pool lacks genuine method-selection questions. Recalibration cannot create Analyze items; content authoring is required.

---

## Revision History

| Version | Date | Summary |
|---------|------|---------|
| 1.0 | 2026-07-26 | Initial standard. Formalizes CL→Difficulty mapping, secondary modifiers, and cross-lane consistency from S713–S716. |
| 1.1 | 2026-07-26 | Adds: §8 expanded forbidden triggers with DL-012 clone pattern, DL-016 dual-block CL authority rule, and Analyze@Easy/Evaluate@Easy logical-contradiction triggers. §9 boundary decision trees for all 4 CL zones (from S719). §9.1 same-domain distractor test with formal black-letter rule. §9.2 scenario operativity test and method-given test. §9.3 method-selection test with description-to-concept trap. §9.4 two-competent-practitioners test with template-inflation detection. §10 pre-certification checklist. §11 disagreement resolution process with S720 reliability baseline. §12 reviewer quick-reference decision trees. §13 confidence gate protocol. §14 drift detection with post-S720 pool-wide calibration metrics. §15 cross-pack consistency with Pack B benchmark designation. §16 implementation history through S721. §17 key recommendations. Appendix A: S720 reliability data (73.7% Und-vs-Apply agreement, 86.3% hotspot, Agent F Analyze structural gap). DCS v1.1 Draft example library (§9 in draft) removed — S721 Agent D Validation Board found 74% QID mismatch rate (16/23 exemplars fail). All temporal pool statistics marked "Pre-S719:" or "Post-S720:" as appropriate. Section numbering restructured to §1–§17 + Appendix A. |

---

*End of Difficulty Calibration Standard v1.1*

*Adopted via PATH A (S721 Agent O finalization). Decision trees (§9) PASSED by Agent D Validation Board. Example library removed pending re-verification. All 6 critical findings addressed. See REVISION_HISTORY.md for adoption entry.*
