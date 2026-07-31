---
name: content-authoring
description: Part 2 content creation: blueprint taxonomy, CAQS workflow, distractor design, cognitive calibration, formula integration, governance compliance
---

# Part 2 Content Authoring Skill

**Purpose:** Ensure every Part 2 MCQ and case study item is authored against a consistent, CAQS-compliant workflow with blueprint alignment, distractor engineering, cognitive-level calibration, and formula-validated calculation items. Prevents the content-governance debt that the Part 1 recovery program spent months eliminating.

**Trigger:** Use when authoring, revising, or reviewing ANY Part 2 content — standalone MCQs, case study items, or exhibits. Also triggered when an agent or user says "author a Part 2 question," "create a Part 2 MCQ," "draft a case item," or any variant.

**Mandatory:** This skill must be followed for every Part 2 content creation session. No Part 2 item shall be authored outside this workflow.

---

## 1. Core Principle

**Governance, validation, and authoring standards precede content creation.**

The Part 1 recovery program (S93P → S109P, 500+ remediation sessions) taught that content authored without governance gates creates debt that takes months to unwind. Part 2 must not repeat this pattern.

Every Part 2 item must pass through:

```
Author  →  Validate  →  Certify

NOT

Author  →  Certify  →  Audit later
```

---

## 2. Part 2 Blueprint Taxonomy

### Domain Map (CMA Part 2 CSO)

| Section | Domain | Exam Weight | Pack File |
|---------|--------|-------------|-----------|
| A | Financial Statement Analysis | 20% | `pack_p2_a.js` |
| B | Corporate Finance | 20% | `pack_p2_b.js` |
| C | Decision Analysis | 25% | `pack_p2_c.js` |
| D | Risk Management | 10% | `pack_p2_d.js` |
| E | Investment Decisions | 10% | `pack_p2_d.js` |
| F | Professional Ethics | 15% | `pack_p2_e.js` |

### Domain A — Financial Statement Analysis

**Key Topics:** Ratio computation (liquidity, leverage, activity, profitability, market), horizontal/vertical/trend analysis, DuPont decomposition, earnings quality, operating/financial leverage.

**Key Formulas (FA-01 through FA-21):** Foundation/FORMULA_MASTER_P2.md §Domain A — 21 formulas.

**Bloom's Targets:** Remember 10%, Understand 20%, Apply 45%, Analyze 20%, Evaluate 5%.

**Authority References:** FASB ASC 205, 210, 230, 330, 350, 360, 470, 505, 606, 842; IFRS equivalents where noted.

**Common Distractor Patterns:**
- Inverting numerator/denominator (e.g., Current Liabilities / Current Assets)
- Using ending balances instead of averages in turnover ratios
- Including inventory in quick ratio
- Including accounts receivable in cash ratio
- Omitting the current portion of long-term debt from current liabilities
- Confusing operating leverage (fixed vs. variable costs) with financial leverage (debt vs. equity)

### Domain B — Corporate Finance

**Key Topics:** Risk and return (beta, CAPM), cost of capital (WACC, component costs), working capital management, capital structure, international finance, FX.

**Key Formulas (CF-01 through CF-09):** Foundation/FORMULA_MASTER_P2.md §Domain B — 9 formulas.

**Bloom's Targets:** Remember 10%, Understand 20%, Apply 50%, Analyze 15%, Evaluate 5%.

**Authority References:** CAPM (Sharpe-Lintner), Modigliani-Miller propositions, Basel III for capital adequacy context.

**Common Distractor Patterns:**
- Omitting the (1 − t) tax shield on the cost of debt in WACC
- Using book values instead of market values for weights
- Forgetting preferred stock in WACC
- Using nominal rate instead of effective annual rate
- Confusing forward premium with forward discount
- Omitting flotation costs
- Applying CAPM when a multi-factor model is required by the scenario

### Domain C — Decision Analysis

**Key Topics:** CVP analysis (breakeven, target profit, multi-product), marginal analysis (special orders, make-or-buy, sell-or-process), pricing decisions, relevant costing, expected value, perfect information.

**Key Formulas (DA-01 through DA-11):** Foundation/FORMULA_MASTER_P2.md §Domain C — 11 formulas.

**Bloom's Targets:** Remember 5%, Understand 15%, Apply 50%, Analyze 20%, Evaluate 10%.

**Authority References:** IMA SMA on relevant costing, pricing models.

**Common Distractor Patterns:**
- Including sunk costs in relevant-cost analysis
- Applying unit-level fixed costs as if variable
- Using absorption costing unit cost instead of variable cost for special-order pricing
- Forgetting opportunity cost in make-or-buy
- Applying joint cost allocation to sell-or-process-further (joint costs are irrelevant after split-off)
- Omitting capacity constraints in multi-product CVP
- Using average instead of incremental cost in pricing

### Domain D — Risk Management

**Key Topics:** COSO ERM 2017 (5 components, 20 principles), risk identification and assessment, risk response strategies, ERM integration with strategy and performance, types of risk.

**Key Formulas (RM-01 through RM-03):** Foundation/FORMULA_MASTER_P2.md §Domain D — 3 formulas.

**Bloom's Targets:** Remember 20%, Understand 35%, Apply 25%, Analyze 15%, Evaluate 5%.

**Authority References:** COSO Enterprise Risk Management — Integrating with Strategy and Performance (2017).

**Common Distractor Patterns:**
- Confusing COSO ERM 2017 with COSO IC 2013 (Part 1)
- Assigning risk responses (avoid/accept/reduce/share) to the wrong scenario
- Confusing inherent risk with residual risk
- Misidentifying the 5 ERM components (governance & culture, strategy & objective-setting, performance, review & revision, information/communication & reporting)

### Domain E — Investment Decisions

**Key Topics:** NPV, IRR, payback, discounted payback, profitability index, EAA, capital rationing, real options, after-tax cash flow analysis, MACRS depreciation.

**Key Formulas (ID-01 through ID-08):** Foundation/FORMULA_MASTER_P2.md §Domain E — 8 formulas.

**Bloom's Targets:** Remember 10%, Understand 15%, Apply 55%, Analyze 15%, Evaluate 5%.

**Authority References:** NPV/IRR theory, MACRS (IRS Publication 946).

**Common Distractor Patterns:**
- Including depreciation as a cash outflow (depreciation is non-cash)
- Forgetting the depreciation tax shield in after-tax cash flow
- Using pre-tax cash flows with an after-tax discount rate (or vice versa)
- Applying IRR for mutually exclusive projects with scale differences (NPV is correct)
- Omitting salvage value from terminal cash flow
- Using average instead of incremental cash flows
- Confusing accounting rate of return (ARR) with discounted methods
- Misapplying MACRS half-year convention

### Domain F — Professional Ethics

**Key Topics:** IMA Statement of Ethical Professional Practice (4 standards: competence, confidentiality, integrity, credibility), ethical decision-making model, fraud and the Fraud Triangle, corporate governance (SOX 2002, audit committees), FCPA, international ethics.

**Formulas:** Conceptual domain — no quantitative formulas.

**Bloom's Targets:** Remember 25%, Understand 30%, Apply 25%, Analyze 15%, Evaluate 5%.

**Authority References:** IMA Statement of Ethical Professional Practice, SOX 2002, FCPA, Dodd-Frank.

**Common Distractor Patterns:**
- Confusing the four IMA ethical standards
- Misapplying the ethical resolution process order
- Confusing SOX requirements with general best practices
- Omitting one leg of the Fraud Triangle (pressure, opportunity, rationalization)
- Misidentifying what constitutes "credibility" vs. "competence"
- Applying Part 1 COSO IC where Part 2 COSO ERM is required

---

## 3. QID Conventions & Metadata Standards

### QID Format

MCQ items: `P2-{Section}-{NNN}` (e.g., `P2-A-001`, `P2-C-250`)
Case items: `CBQ2{Pack}-{Section}{Seq}-Q{N}` (e.g., `CBQ2-A1-Q3`, `CBQ2-B15-Q5`)
Case IDs: `CBQ2{Pack}-{Section}{Seq}` (e.g., `CBQ2-A1`, `CBQ2-B15`)
Exhibit IDs: `{CaseID}-E{N}` (e.g., `CBQ2-A1-E1`)

### Single-Object Architecture

**Every Part 2 item uses a single JSON object.** This eliminates the DL-016 dual-block problem that plagued Part 1. All fields — choices, explanations, metadata, governance — live in one object.

### Required Fields Per Item

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `Part` | Yes | Integer (2) | Must be `2` for all Part 2 items |
| `Section` | Yes | String (A-F) | Domain letter |
| `Topic` | Yes | String | Format: `"{Section}.{NNN} {descriptor}"` |
| `QuestionID` | Yes | String | Format: `P2-{Section}-{NNN}` |
| `question_state` | Yes | String | Must start as `"Unprocessed"` |
| `Part2OnlyFlag` | Yes | Boolean | Must be `true` — enforced by Rule 11 |
| `Stem` | Yes | String | Question text |
| `Choices` | Yes | Object `{A, B, C, D}` | Answer choices |
| `CorrectChoice` | Yes | String (A-D) | Correct answer letter |
| `ExplanationCorrect` | Yes | String | Full explanation (≥200 chars for Apply+, ≥100 chars for Remember/Understand) |
| `ExplanationWrongA` | Yes | String | Must be `""` if A == CorrectChoice, else ≥50 chars choice-specific text |
| `ExplanationWrongB` | Yes | String | Must be `""` if B == CorrectChoice, else ≥50 chars choice-specific text |
| `ExplanationWrongC` | Yes | String | Must be `""` if C == CorrectChoice, else ≥50 chars choice-specific text |
| `ExplanationWrongD` | Yes | String | Must be `""` if D == CorrectChoice, else ≥50 chars choice-specific text |
| `Difficulty` | Yes | String | Easy / Moderate / Difficult / Very Difficult |
| `DifficultyScore` | Yes | Integer (1-5) | 1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult |
| `CognitiveLevel` | Yes | String | Remember / Understand / Apply / Analyze / Evaluate |
| `CalculationItem` | Yes | Boolean | `true` if arithmetic required |
| `VerifiedChecks` | Yes | Array[String] | Standard boilerplate — see §3.1 |

### Optional but Recommended Fields

| Field | Type | Purpose |
|-------|------|---------|
| `PrimaryCompetency` | String | Calculation / Conceptual / Analysis / Judgment |
| `DifficultyDrivers` | Array[String] | MultiStepCalculation, FinancialStatementAnalysis, etc. |
| `FormulaReference` | String | Reference to FORMULA_MASTER_P2.md formula (e.g., "FA-01: Current Ratio") |
| `AuthorityReference` | String | Governing standard (e.g., "ASC 205-10", "CAPM", "COSO ERM 2017") |
| `CommonTrapReference` | String | Known exam trap for this concept |
| `LOSTag` | String | Learning outcome statement reference |
| `BlueprintDomain` | String | Domain name (e.g., "Financial Statement Analysis") |
| `certification_session` | String | Session ID that certified this item |

### 3.1 VerifiedChecks Boilerplate

```json
"VerifiedChecks": [
  "Choices populated — 4 options A-D",
  "ExplanationCorrect >= 200 chars",
  "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
  "CorrectChoice EW slot empty (DL-008 compliant)",
  "Part2OnlyFlag: true",
  "Calculation verified against FORMULA_MASTER_P2.md",
  "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
  "Distractors represent documented Part 2 exam traps"
]
```

---

## 4. Authoring Workflow (Per-Item)

### Step 1 — Select Blueprint Target

1. Choose a domain (A-F) and topic from the taxonomy in §2.
2. Identify the specific Learning Outcome Statement (LOS) from the IMA Part 2 CSO.
3. Select the formula from `foundation/FORMULA_MASTER_P2.md` if a calculation item.
4. Assign a preliminary cognitive level and difficulty based on domain targets in §2.

### Step 2 — Draft the Stem

1. Write a scenario that is **business-realistic**, not textbook-abstract:
   - Use a named company (e.g., "Apex Manufacturing", "Bridgewater Analytics")
   - Include a named stakeholder with a role (e.g., "CFO Elena Torres", "Controller David Kim")
   - Frame a business decision or reporting requirement
2. Ensure the stem contains ALL data needed to answer — no hidden assumptions.
3. For calculation items: include all numerical inputs explicitly.
4. For conceptual items: the stem must test understanding, not just definition recall.
5. **Anti-patterns to avoid:**
   - "Which of the following is correct?" (textbook, not business)
   - "Calculate the..." (no business context)
   - "A company has the following data..." (data dump, no scenario)

### Step 3 — Draft Choices

1. Write 4 choices in `{A, B, C, D}` format.
2. The correct answer must be the **only defensible choice** under the governing standard.
3. **Every distractor must map to a specific, documented misconception or calculation error** (see domain-specific patterns in §2).
4. No two distractors should test the same error.
5. Choice text should be consistent in length and format — no cueing.
6. For calculation items: distractors should be reachable by plausible arithmetic errors.
7. Never use "All of the above" or "None of the above" without explicit justification.
8. Assign `CorrectChoice` to the correct letter.

### Step 4 — Cognitive-Level Verification (Rule 11 Gates)

**Before writing explanations, verify the cognitive level against these BLOCK gates:**

#### GATE AF-3 — Deterministic Rule Application
If the stem contains a direct rule reference ("Under ASC 606...", "Per COSO ERM...") AND the explanation does NOT require weighing competing alternatives → cognitive level must be **Apply**, not Analyze or Evaluate.

**Trigger pattern:** `Under (ASC|IFRS|COSO|GAAP|IAS)` in stem without `competing|best option|weigh|trade-off|balance` in explanation.

#### GATE AF-4 — Taxonomy/Classification
If the stem asks "what type of", "which category", "which component", or "classified as" → cognitive level must be **Apply**, not Analyze or Evaluate.

**Trigger pattern:** `what type of|which (COSO|component|category|cost)|classified as` in stem.

#### GATE AF-5 — Difficulty-Cognitive Mismatch
- `Evaluate` requires `DifficultyScore >= 3`
- `Analyze` requires `DifficultyScore >= 2`

**Violation of any gate = BLOCK the item. Do not proceed to explanation writing.**

### Step 5 — Write the Correct Answer Explanation

Follow the CAQS §4.2 structure:

1. **Accounting principle** — Name the governing standard or framework:
   - Domain A: "Under ASC 205-10..."
   - Domain B: "Per the Capital Asset Pricing Model (CAPM)..."
   - Domain C: "Relevant costing requires..."
   - Domain D: "COSO ERM 2017 Principle 9 states..."
   - Domain E: "The net present value (NPV) rule states..."
   - Domain F: "The IMA Statement of Ethical Professional Practice requires..."

2. **Solution steps** — For calculations: formula → substitution → result. For conceptual: reasoning chain from principle to conclusion.

3. **Why correct** — Explain why this choice satisfies the standard.

4. **Business interpretation** — What the result means in the scenario context.

5. **Common exam trap** (recommended) — One specific error candidates make.

**Minimum lengths:**
- Remember/Understand: ≥100 chars
- Apply/Analyze/Evaluate: ≥200 chars

### Step 6 — Write Distractor Explanations

For each of the 3 non-CorrectChoice slots:

1. **Why it's wrong** — Identify the specific error.
2. **Misconception addressed** — What the candidate likely misunderstood.
3. **Correction** — How the correct approach differs.

**Rules:**
- Each distractor explanation must be **choice-specific** — no boilerplate, no identical text across slots.
- Minimum 50 characters per field.
- Never use: "represents a plausible misconception", "Option X is incorrect", "A candidate may select this option by misapplying..."
- The ExplanationWrong slot matching CorrectChoice must be `""` (empty string) — **Rule 2 BLOCK**.

### Step 7 — Verify Formula (Calculation Items Only)

1. Cross-check the formula used against `foundation/FORMULA_MASTER_P2.md`.
2. Independently recalculate the answer from the stem data — do not trust the authored answer.
3. Verify: formula name, variable substitution, arithmetic result, rounding, tolerance.
4. Add `FormulaReference` field with the formula ID (e.g., `"FA-01: Current Ratio"`).

### Step 8 — Metadata Completion

1. Set `Part: 2`, `Part2OnlyFlag: true`, `question_state: "Unprocessed"`.
2. Set `Difficulty` and `DifficultyScore` per domain targets and Rule 11 compliance.
3. Set `CognitiveLevel` — verified through Rule 11 gates.
4. Set `CalculationItem: true` if any arithmetic is required.
5. Set `Topic` in format `"{Section}.{NNN} {descriptor}"`.
6. Set `VerifiedChecks` array with standard boilerplate (§3.1).
7. Add optional fields: `FormulaReference`, `AuthorityReference`, `PrimaryCompetency`.

### Step 9 — Pre-Commit Governance Check

Before finalizing, verify all governance guard rules (governance_guard_p2.js):

| Rule | Check |
|------|-------|
| Rule 2 | `ExplanationWrong[CorrectChoice]` is `""` (DL-008) |
| Rule 6 | All 3 non-CC ExplanationWrong slots are non-empty (DL-026) |
| Rule 9 | No "No"+affirmative or "Yes"+negative choice lead-in mismatch (DL-037) |
| Rule 10 | No absent distractor ExplanationWrong fields (DL-021) |
| Rule 11 | `Part2OnlyFlag` is strictly `true`; QID format is `P2-{Section}-{NNN}` |

---

## 5. Difficulty & Cognitive-Level Calibration Map

### Difficulty Score Assignment

| Score | Label | When to Use |
|-------|-------|-------------|
| 1 | Easy | Single-step recall, definition match, no calculation |
| 2 | Moderate-Easy | Two-step recall, simple formula plug-in, straightforward interpretation |
| 3 | Moderate | Multi-step calculation, ratio analysis with interpretation, standard WACC/CAPM |
| 4 | Difficult | Multi-concept integration, DuPont decomposition, NPV with tax/working capital, ERM scenario analysis |
| 5 | Very Difficult | Cross-domain synthesis, capital rationing with ranking, ethical dilemma with multiple standards |

### Bloom's Level by Item Type Guide

| Item Type | Default Cognitive Level | Can Be |
|-----------|------------------------|--------|
| Definition match (stem defines term → answer is the term) | Remember | Only Remember (see DL-031) |
| Concept explanation | Understand | — |
| Single-step calculation | Apply | — |
| Multi-step calculation with interpretation | Analyze | — |
| Two-part scenario requiring judgment | Evaluate | — |
| Ethical dilemma with resolution steps | Evaluate | — |

**Anti-pattern (DL-031 recurrence risk):** Never label a definition-match item as "Moderate" (3). If the stem is a textbook definition and the answer is the matching term, it is Easy (1) at Remember or Understand level.

---

## 6. Explanation Quality Standards

### 6.1 Required Elements Per Explanation

| Element | Correct Answer | Distractor |
|---------|---------------|------------|
| Accounting principle named | Required | Recommended |
| Specific error identified | N/A | Required |
| Misconception addressed | Recommended | Required |
| Correct approach contrasted | N/A | Required |
| Business interpretation | Required | N/A |
| Common exam trap | Recommended | N/A |

### 6.2 Language Rules

| Rule | Requirement |
|------|-------------|
| Professional tone | Direct, instructional — write as a tutor |
| No uncertainty | Never "I think", "probably", "maybe", "could be" |
| No self-reference | Never "this answer", "this choice" without specifying which |
| Choice-specific | Each distractor explanation unique to that choice |
| Use scenario facts | Reference company name, dollar amounts, time periods |
| Active voice | "ASC 606 requires" not "It is required by" |

### 6.3 Formula Presentation in Explanations

For calculation items, present the formula with substituted values:
```
ROE = Net Income / Average Shareholders' Equity
ROE = $425,000 / (($3,200,000 + $2,800,000) / 2)
ROE = $425,000 / $3,000,000 = 14.17%
```

Always show: (1) the formula in notation, (2) substituted values, (3) intermediate computation, (4) final result with units.

---

## 7. Quality Checklist (Per-Item Gate)

Before any Part 2 item leaves "Unprocessed" state, verify:

- [ ] **Blueprint alignment** — Maps to a specific Part 2 CSO Learning Outcome Statement
- [ ] **Part 2 relevance** — Tests Part 2 material, not Part 1 (no standard costing variances, process costing, job costing as primary topic)
- [ ] **Business realism** — Named company, stakeholder, business trigger
- [ ] **Single-object architecture** — One JSON object, no dual-block
- [ ] **QID format** — `P2-{Section}-{NNN}` or `CBQ2...` for cases
- [ ] **Part2OnlyFlag** — Set to `true`
- [ ] **Technical accuracy** — Verified against authoritative standard
- [ ] **Numerical accuracy** — Independently recalculated (if calculation item)
- [ ] **Formula match** — Formula ID references FORMULA_MASTER_P2.md (if calculation item)
- [ ] **Correct answer** — Only defensible choice under the governing standard
- [ ] **DL-008 clean** — ExplanationWrong[CorrectChoice] is `""`
- [ ] **DL-026 clean** — All 3 non-CC ExplanationWrong slots are ≥50 chars and choice-specific
- [ ] **DL-037 clean** — No choice binary lead-in polarity mismatch
- [ ] **DL-021 clean** — No absent distractor ExplanationWrong fields
- [ ] **Rule 11 clean** — Cognitive level passes AF-3, AF-4, AF-5 gates
- [ ] **No DL-013 boilerplate** — No "represents a plausible misconception" or similar template text
- [ ] **Explanation principle** — Correct answer explanation names the governing standard
- [ ] **Explanation solution** — Shows formula with substituted values (calculation) or reasoning chain (conceptual)
- [ ] **Explanation business context** — Interprets result in scenario
- [ ] **Distractor quality** — Each distractor maps to a specific, documented misconception
- [ ] **Difficulty calibrated** — Score matches cognitive demand per §5
- [ ] **Metadata complete** — All required fields present and valid
- [ ] **VerifiedChecks** — Standard boilerplate present and accurate

---

## 8. Content Production Stop Conditions

| Condition | Action |
|-----------|--------|
| Part 1 concept tested as primary topic | **BLOCK** — item is Part 1 material, not Part 2 |
| Missing Part2OnlyFlag | **BLOCK** — Rule 11 |
| DL-008 violation (non-empty EW[CC]) | **BLOCK** — Rule 2 |
| DL-026 violation (empty distractor EW) | **BLOCK** — Rule 6 |
| DL-037 logic inversion in choices | **BLOCK** — Rule 9 |
| Rule 11 cognitive inflation (AF-3/4/5) | **BLOCK** — recalibrate cognitive level |
| Formula mismatch with FORMULA_MASTER_P2.md | **BLOCK** — recalculate |
| No authority reference in explanation | **WARN** — add reference |
| Stem is a textbook definition → difficulty > 1 | **WARN** — recalibrate to Easy (1) per DL-031 |
| Batch > 30 items without BLOCK-AUTHORIZED | **BLOCK** — Rule 5 |

---

## 9. Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| Part 2 Blueprint | `foundation/P2001_PART2_BLUEPRINT_FOUNDATION.md` | Domain taxonomy, LOS, distribution targets |
| Part 2 Formula Master | `foundation/FORMULA_MASTER_P2.md` | 52 formulas with tolerances, rounding, common errors |
| Part 2 Certification Standard | `p2/P2002_CERTIFICATION_STANDARD.md` | Six-dimension verification, lifecycle, certification gates |
| Part 2 QID Standard | `p2/P2003_QID_STANDARD.md` | QID/CaseID/ExhibitID format specifications |
| Part 2 Content Launch Plan | `p2/P2003_CONTENT_LAUNCH_PLAN.md` | First authoring wave plan and governance checklist |
| Part 2 Governance Guard | `scripts/governance_guard_p2.js` | 11-rule Part 2 enforcement (Node.js standalone) |
| Part 1 Governance Guard | `.opencode/plugins/governance-guard.js` | 11-rule Part 1 enforcement (OpenCode plugin) |
| CAQS v1.0 | `knowledge/CAQS_v1.0.md` | Quality standard — transferred to Part 2 with domain substitutions |
| Defect Library | `knowledge/DEFECT_LIBRARY.md` | All Part 1 defect classes (DL-001 through DL-038) — recurrence prevention |
| Taxonomy Registry | `knowledge/TAXONOMY_REGISTRY.md` | Enumerated values for metadata fields |
| Part 2 Revision History | `knowledge/REVISION_HISTORY_P2.md` | All Part 2 certification and content change records |
