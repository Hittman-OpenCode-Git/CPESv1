# CMA Part 2 Certification Standard v1.0

**Version:** 1.0
**Status:** Active — Part 2 Governance
**Authority:** P2001_PART2_BLUEPRINT_FOUNDATION.md
**Adapted From:** CAQS v1.0 (Part 1, fully transcribed with domain and authority substitutions)
**Dependencies:** foundation/EXAM_BLUEPRINT_P2.md (to be created), foundation/FORMULA_MASTER_P2.md (to be created), knowledge/TAXONOMY_REGISTRY_P2.md (to be created)
**Applies to:** All MCQ banks, case studies, exhibits, and assessment content in the CMA Part 2 Exam Simulator

---

## A. Six-Dimension Verification

### A.1 Build-Time AI Verification Standard

Every question in the Part 2 CAQS audit loop must receive build-time AI verification across the following six dimensions before certification. Verification results are non-binding recommendations; final revision authority remains human.

| Dimension | Requirement | Part 2-Specific Authority References |
|-----------|-------------|---------------------------------------|
| 1. Correctness | Against FASB ASC (ratios), CAPM, COSO ERM 2017, IMA Ethics, SOX, FCPA, IFRS | The answer key, explanation, and distractors are consistent with the authoritative standard governing the tested concept |
| 2. Precision | Internal consistency, unambiguous fact pattern | The fact pattern yields exactly one defensible answer; no missing assumptions (e.g., missing tax rate in WACC, missing risk-free rate in CAPM) |
| 3. Difficulty Calibration | Matches stated tier and LOS depth verb | The cognitive demand implied by the LOS is consistent with the question's stated difficulty and Bloom's level per domain targets (Appendix G) |
| 4. Distractor Engineering | Each distractor maps to a real misconception or plausible calculation path | Every distractor represents a documented exam trap or known student error (e.g., using after-tax cost of debt twice, omitting preferred stock in WACC) |
| 5. Blueprint Alignment | Maps to a specific Part 2 CSO LOS | The LOSTag, Topic, and cognitive level align with a specific Part 2 Content Specification Outline learning outcome (Appendix A of P2001) |
| 6. CMA Part 2 Relevance | In scope, not accidentally Part 1 | The question tests Part 2 material; no concept, standard, or calculation belongs exclusively to Part 1 (e.g., standard costing variances, process costing, job costing — unless as review context) |

### A.2 Confidence Flagging Rules

| Confidence | Verdict | Action |
|------------|---------|--------|
| HIGH | All dimensions consistent with authoritative sources, no ambiguity | Proceed to certification (with user approval) |
| MEDIUM | One or more dimensions have minor unresolved concerns | Flag for editorial review; do not certify |
| LOW | Material uncertainty or contradiction with authoritative source | Escalate to Editorial Queue; block certification |
| ZERO | Confirmed error (wrong answer, wrong formula, wrong authority) | Auto-fail; route to defect library |

### A.3 Verification Output Format

For each question, the verification agent must produce:

```jsonc
{
  "QuestionID": "P2-A-001",
  "VerificationDate": "2026-08-01",
  "Dimensions": {
    "Correctness": { "Confidence": "HIGH", "Notes": "Liquidity ratio calculation verified against ASC 205" },
    "Precision": { "Confidence": "HIGH", "Notes": "All inputs traceable to stem; single defensible answer" },
    "DifficultyCalibration": { "Confidence": "HIGH", "Notes": "Moderate/Apply matches LOS A.1 depth verb" },
    "DistractorEngineering": { "Confidence": "HIGH", "Notes": "Distractors A and C represent common ratio inversion errors" },
    "BlueprintAlignment": { "Confidence": "HIGH", "Notes": "Maps to LOS A.1 — current ratio computation" },
    "Part2Relevance": { "Confidence": "HIGH", "Notes": "Ratio analysis is Part 2 core; no Part 1 overlap" }
  },
  "OverallConfidence": "HIGH",
  "CertificationEligible": true
}
```

### A.4 Escalation Protocol

- Any LOW-confidence dimension → question enters Editorial Queue immediately
- Any ZERO-confidence finding → logged to DEFECT_LIBRARY_P2.md with new DL-P2 ID
- Two or more MEDIUM-confidence dimensions → routed to secondary human review before any certification decision

---

## B. MCQ Certification Lifecycle

### B.1 State Definitions

| State | Description | Learner-Pool Eligible |
|-------|-------------|----------------------|
| Unprocessed | Not yet audited; initial authoring state | No |
| In Audit | Currently under review in a sub-batch | No |
| Editorial Queue | Requires structural or content revision before re-audit | No |
| Certified | Passed HIGH-confidence six-dimension verification + user approval | **Yes** |
| Archived | Removed from active pool (content preserved) | No |

### B.2 State Transition Rules

```
Unprocessed ──→ In Audit: entry into a sub-batch (auditor selection)
In Audit ──→ Editorial Queue: structural or content revision required
In Audit ──→ Certified: HIGH-confidence six-dimension AI verification + user approval
Any State ──→ Archived: consolidation or removal from active pool
Certified ──→ In Audit: only via explicit re-verification request
```

**Rules:**

1. **`question_state` determines learner-pool eligibility.** A question with `question_state: "Certified"` is eligible even if its pack has not reached pack-level certification.
2. **Certified → In Audit requires explicit re-verification request.** A certified question cannot be downgraded without a documented re-verification request in `REVISION_HISTORY.md`.
3. **Archival preserves content.** Archived questions retain full question text and metadata. Only the state field changes. Rollback logs are maintained in `reports/`.

### B.3 Transition to Certified

A question transitions from In Audit to Certified when ALL of the following are met:

1. **Six-dimension AI verification** produces HIGH confidence across all six dimensions (per §A.1)
2. **User approval** is documented in `REVISION_HISTORY.md`
3. **Distractor tier map** (A/B/C/D) is recorded in the certification entry
4. **Any low-confidence claim** is resolved and documented before certification
5. **Part2OnlyFlag** is verified as `true` — the item must bear this field and it must evaluate to `true`
6. **ExplanationWrong[CorrectChoice]** is confirmed empty (`""`) — DL-008 compliance
7. **All three non-CorrectChoice ExplanationWrong slots** are confirmed non-empty (minimum 50 characters each) — DL-026 compliance

### B.4 Certification-Blocking Conditions

The following conditions block certification regardless of verification confidence:

#### B.4.1 Explanation Relevance — Topic Mismatch BLOCK

An item shall not be certified if any `ExplanationWrong` field contains text that is topically unrelated to the learner-facing distractor choice on that item.

#### B.4.2 Part2OnlyFlag BLOCK

An item shall not be certified if `Part2OnlyFlag` is absent, `false`, or any falsy value. This is a mandatory field for every Part 2 item. No exception.

#### B.4.3 DL-008 / DL-026 BLOCK

- **DL-008:** ExplanationWrong[CorrectChoice] must be `""` (empty string)
- **DL-026:** All three non-CorrectChoice ExplanationWrong slots must each contain ≥ 50 characters of choice-specific text

#### B.4.4 Authority Citation BLOCK

An item shall not be certified if any cited authority (ASC section, COSO ERM component, IMA Ethics standard, SOX section, FCPA provision, CAPM parameter) does not match the question's actual concept being tested.

### B.5 Certification Reversion

A Certified item may revert to In Audit only via documented re-verification request in `REVISION_HISTORY.md`. A question cannot lose Certified status without:
- A specific defect finding logged to `DEFECT_LIBRARY_P2.md`
- User authorization for status change
- A REVISION_HISTORY.md entry documenting the reversion

---

## C. Case Study Certification Lifecycle

### C.1 Case Study State Definitions

| State | Description | Learner-Pool Eligible |
|-------|-------------|----------------------|
| Draft | Initial creation, not reviewed | No |
| Review | Under accounting review | No |
| QA | Under quality assurance review | No |
| Production | Approved and published | **Yes** |
| Retired | Removed from active use (content preserved) | No |

### C.2 Case Study Transition Rules

```
Draft ──→ Review: entry into the review pipeline
Review ──→ QA: accounting and editorial review complete
Review ──→ Draft: major revision required
QA ──→ Production: all quality gates passed
QA ──→ Review: QA findings require revision
Any State ──→ Retired: removed from active pool
```

### C.3 Exhibit Quality Gates

Every exhibit in a Part 2 case must satisfy:

| Gate | Requirement | Verification Method |
|------|-------------|---------------------|
| 1. Purpose Clarity | Each exhibit has a defined `Purpose` field and is referenced by at least one item via `ReferencedBy` | Automated validator check |
| 2. Professional Format | Exhibits resemble actual business documents (financial statements, ERP reports, dashboards, emails, contracts, policies) | Manual editorial review |
| 3. No Decorative Data | Every row/column in a table exhibit is consumed by at least one item | Automated cross-reference check |
| 4. Data Consistency | Numbers in exhibits are internally consistent (subtotals add to totals; opening balances match prior-period closing balances) | Automated arithmetic validation |
| 5. Independent Readability | Each exhibit is understandable without reference to other exhibits | Manual editorial review |
| 6. Domain-Appropriate Type | Exhibit type matches domain convention (see table below) | Automated type check |

**Domain-Appropriate Exhibit Types:**

| Domain | Primary Exhibit Types |
|--------|----------------------|
| A — Financial Statement Analysis | financial-statement, table (ratio summary) |
| B — Corporate Finance | financial-statement, table (bond amortization, WACC), erp-report |
| C — Decision Analysis | table (cost data), dashboard (product mix), erp-report |
| D — Risk Management | policy (ERM framework), dashboard (risk register), text |
| E — Investment Decisions | table (cash flow projections, MACRS), contract, dashboard |
| F — Professional Ethics | policy (code of ethics), email, text (fraud scenarios) |

### C.4 Cognitive Progression Enforcement

Items within a Part 2 case must follow this progression. Every case must satisfy this position rule:

| Position | Cognitive Level | Purpose |
|----------|----------------|---------|
| Item 1-2 | Apply (calculation) | Foundational computation (ratio, NPV, WACC, breakeven) |
| Item 3-4 | Analyze (interpretation) | Interpret results, compare alternatives |
| Item 5 | Evaluate (judgment) | Recommendation, decision, professional judgment |
| Item 6 (optional) | Evaluate / Synthesize | Cross-concept integration, multi-domain reasoning |

**Enforcement:** The validator shall check that the sequence of `CognitiveLevel` values across items follows a non-decreasing pattern (Apply ≤ Analyze ≤ Evaluate). Cases with descending cognitive levels are flagged for editorial review.

### C.5 Independent Answerability

Each case item must be answerable without relying on correct answers to prior items. This ensures:

- A candidate who misses Item 1 is not penalized on Item 2 for a cascading error
- Later items may reference earlier results in the prompt text (e.g., "Using your answer from Item 1...") but must provide the reference value explicitly
- The scoring engine can grade each item independently

**Verification:** Manual editorial review of answer dependencies during QA gate.

### C.6 Cross-Exhibit Data Consistency

For case studies with multiple exhibits:

- Financial statement exhibits must balance (Assets = Liabilities + Equity)
- Ratios computed from exhibits must reconcile (e.g., ROE from exhibit data = NPM × TAT × EM)
- Cash flow projections must reconcile to opening/closing cash balances
- Time periods must be consistent across exhibits (all monthly or all annual)

**Verification:** Automated arithmetic validator must run on all exhibit data before the case enters Review.

### C.7 Case Scenario Realism Checklist

Every case scenario must pass:

- [ ] **Could this happen in a real business?** — The scenario is a recognizable business situation
- [ ] **Would a CFO/controller recognize this scenario?** — Facts and data reflect actual management accounting work
- [ ] **Would a CFO use this report?** — Exhibits resemble actual business documents
- [ ] **Are the numbers commercially reasonable?** — Dollar amounts are plausible for the described business
- [ ] **Are industry practices authentic?** — Terminology and metrics reflect the stated industry
- [ ] **Would an executive communicate this way?** — Professional business language, not textbook exposition
- [ ] **Named company and stakeholder present** — Fictional company name and decision-maker role

---

## D. Certification Gates (7-Step Pipeline)

### D.1 Gate Overview

Every Part 2 question and case must pass all seven gates before reaching Production.

| Gate | Name | Gatekeeper | Minimum Score | Critical Check |
|------|------|-----------|--------------|----------------|
| G1 | Technical Review | Accountant | 90/100 rubric | Part 2 authority citation correct |
| G2 | Psychometric Review | Psychometrician | 90/100 rubric | Difficulty and Bloom's calibrated |
| G3 | Numerical Validation | Validator | 100% accuracy | Independent recalculation matches stored answer |
| G4 | Instructional Review | Editor | 90/100 rubric | Explanation meets EV1-EV8 |
| G5 | Metadata Review | Validator | Pass all checks | Part2OnlyFlag: true present |
| G6 | Final Validation | Validator | Zero errors | Automated suite passes |
| G7 | Approval | Release Manager | All gates passed | Final sign-off |

### D.2 G1: Technical Review — Part 2 Authorities

**Gatekeeper:** Accountant persona

**Scope:** Every item in the certification batch.

**Part 2 Authority References (by domain):**

| Domain | Governing Authorities |
|--------|----------------------|
| A — Financial Statement Analysis | FASB ASC (GAAP ratio definitions), IFRS (comparative analysis), SEC reporting standards |
| B — Corporate Finance | CAPM (Sharpe-Lintner), Modigliani-Miller propositions, Basel III (capital adequacy), FX/IFRS for international finance |
| C — Decision Analysis | IMA SMA on relevant costing, managerial economics (marginal analysis), pricing model theory |
| D — Risk Management | COSO ERM (2017) — 5 components, 20 principles; ISO 31000 (supporting) |
| E — Investment Decisions | NPV/IRR theory (Fisher), MACRS (IRS Publication 946), real options theory (Black-Scholes — qualitative) |
| F — Professional Ethics | IMA Statement of Ethical Professional Practice (4 standards), SOX 2002 (Titles I-IV), FCPA, Dodd-Frank |

**Technical Review Checklist:**

- [ ] Correct answer verified against governing authority
- [ ] Formula selection correct for the concept tested
- [ ] All formula inputs traceable to question stem data
- [ ] Authority citation matches the concept (no ASC 450 cited for CAPM)
- [ ] No Part 1-only concept tested as primary (e.g., standard costing variances)
- [ ] Domain boundary respected (cross-domain items must be intentional)
- [ ] `Part2OnlyFlag: true` confirmed as appropriate

### D.3 G2: Psychometric Review — Part 2 Targets

**Gatekeeper:** Psychometrician persona

**Difficulty Distribution Target (Pool-Wide):**

| Difficulty | Score | Target % | Per Pack (500) |
|------------|-------|----------|---------------|
| Easy | 1 | 15% | 75 |
| Moderate-Easy | 2 | 20% | 100 |
| Moderate | 3 | 30% | 150 |
| Difficult | 4 | 25% | 125 |
| Very Difficult | 5 | 10% | 50 |

**Cognitive Level Distribution Target (Pool-Wide):**

| Level | Target % | Per Pack (500) |
|-------|----------|---------------|
| Remember | 12% | 60 |
| Understand | 22% | 110 |
| Apply | 42% | 210 |
| Analyze | 18% | 90 |
| Evaluate | 6% | 30 |

**Psychometric Checks:**

- [ ] Difficulty score matches item's actual cognitive demand
- [ ] Bloom's level aligned with difficulty (Apply at Easy = flag; Evaluate at Easy = auto-reject)
- [ ] Distractor plausibility: each wrong option represents a specific misconception
- [ ] No cueing: no grammatical, length, or position cues to the correct answer
- [ ] Answer balance: per-section correct-answer distribution within 22-28% per position (A/B/C/D)
- [ ] No running pattern: no streak of same correct-answer position longer than 4 consecutive items
- [ ] Definition-match inflation checked (item labeled Moderate that is actually Easy → flag DL-031 pattern)

### D.4 G3: Numerical Validation — Part 2 Formulas

**Gatekeeper:** Validator

**Requirement:** Every numerical question must undergo independent recalculation by a reviewer who has not seen the stored answer.

**Part 2 Formula Inventory (40+ formulas requiring verification):**

**Domain A — Financial Statement Analysis (12+ formulas):**
- Current Ratio, Quick Ratio, Cash Ratio
- Inventory Turnover, DSO, DPO, Cash Conversion Cycle
- Debt-to-Equity, Times Interest Earned
- Gross Margin %, Operating Margin %, Net Margin %
- ROA, ROE, DuPont Identity (ROE = NPM × TAT × EM)
- EPS, P/E Ratio, Dividend Yield, Book Value per Share
- DOL, DFL, DTL
- Sustainable Growth Rate = ROE × (1 − Dividend Payout)

**Domain B — Corporate Finance (12+ formulas):**
- Expected Return = Σ(Pᵢ × Rᵢ)
- Standard Deviation, Coefficient of Variation
- CAPM: Rₑ = Rf + β(Rm − Rf)
- WACC = (E/V × Rₑ) + (P/V × Rp) + (D/V × R𝒹 × (1 − t))
- Cost of Preferred Stock = Dp / Pp
- Cost of Debt (after-tax) = Pre-tax K𝒹 × (1 − t)
- EOQ = √(2DS/H)
- Effective Annual Rate
- Forward/FX Premium or Discount = (Forward − Spot) / Spot × (360/days)

**Domain C — Decision Analysis (12+ formulas):**
- Breakeven (units) = FC / CM per Unit
- Breakeven (dollars) = FC / CM Ratio
- Target Profit (units) = (FC + Target Profit) / CM per Unit
- Margin of Safety = (Actual Sales − BE Sales) / Actual Sales
- DOL = CM / Operating Income
- Weighted Average CM (multi-product)
- Transfer Price (minimum) = VC + Opportunity Cost
- Expected Value = Σ(Pᵢ × Outcomeᵢ)
- Value of Perfect Information = EV with PI − EV without PI
- Sell-or-Process-Further: Incremental Revenue > Incremental Cost
- Shut-Down Point: Price ≥ Minimum AVC

**Domain D — Risk Management (3 formulas):**
- Expected Loss = Probability × Impact
- Risk Score = Likelihood × Severity
- Residual Risk = Inherent Risk − Controls

**Domain E — Investment Decisions (10+ formulas):**
- NPV = Σ(CFₜ / (1+r)ᵗ) − Initial Investment
- Profitability Index = PV of Future CFs / Initial Investment
- Payback = Initial Investment / Annual CF (uniform) or cumulative
- Discounted Payback
- EAA = NPV / PVIFA(r,n)
- After-Tax Cash Flow = (Rev − Exp) × (1 − t) + (Dep × t)
- MACRS depreciation (IRS Pub 946)
- ARR = Average Annual Income / Average Investment

**Recalculation Protocol:**

1. Read the question stem and exhibits (but not the stored `Correct` value)
2. Solve independently using the exhibits
3. Document the calculation showing formula, substituted values, and result
4. Compare the independent result to the stored `Correct` value
5. Reconcile any differences — if they differ, determine which is correct and document the resolution

**Rounding Policy:**

| Context | Rule |
|---------|------|
| Dollar amounts | Round to nearest whole dollar ($X,XXX) |
| Percentages | Round to two decimal places (XX.XX%) |
| Ratios | Round to two decimal places (X.XX) |
| Per-unit costs | Round to four decimal places for intermediate, two for final |
| NPV/IRR | Round to nearest whole dollar; carry 4 decimal places for discount factors |
| CAPM / WACC | Round to two decimal places (XX.XX%) |
| Interim calculations | Carry to four decimal places; round final to standard |

**Accepted Tolerance:**

| Type | Tolerance |
|------|-----------|
| Integer count (units, shares) | 0 (exact match) |
| Dollar amount | $1 |
| Percentage | 0.01% |
| Ratio / index | 0.01 |
| NPV dollar amount | $5 (due to discounting precision) |

### D.5 G4: Instructional Review — Explanation Quality

**Gatekeeper:** Editor persona

**Explanation Validation Rules (EV1-EV8 adapted for Part 2):**

| Rule | Description |
|------|-------------|
| EV1 | Minimum 50 characters per explanation field |
| EV2 | No placeholder phrases ("This is the correct choice", "Plausible distractor", "Common misunderstanding" — unexplained) |
| EV3 | Correct answer must reference the Part 2 governing authority by name (ASC section, COSO ERM component, IMA Ethics standard, CAPM parameter, SOX section, FCPA provision) |
| EV4 | Distractor explanations must be choice-specific (not identical across slots) |
| EV5 | Formula numbers in explanation must match exhibit/stem values |
| EV6 | Arithmetic result in explanation must match the `Correct` value |
| EV7 | No uncertain language ("I think", "probably", "maybe") |
| EV8 | Correct-answer slot in distractor explanations must be empty (`ExplanationWrong[CorrectChoice] === ""`) |

**Part 2 Explanation Templates:**

*Calculation Item — Correct Answer:*
> The correct answer is **[letter/number]**. **[Formula with substituted values]** = **[result]**. Under **[Part 2 authority: e.g., CAPM, ASC 205, COSO ERM 2017 Principle X]** , the rule is **[key requirement]** . In context, **[business interpretation]** . A common error is to **[specific trap — e.g., "use the after-tax cost of debt in WACC as the pre-tax rate"]** .

*Calculation Item — Distractor:*
> Option **[letter]** incorrectly **[specific error: e.g., "uses total assets instead of average assets in the ROA denominator"]** . A candidate reaching this answer likely **[likely mistake]** . The correct approach is **[contrast with correct method]** .

*Conceptual Item — Correct Answer:*
> The correct answer is **[letter]** because **[reasoning]** . Under **[Part 2 framework]** , **[key rule]** . In practice, this means **[business interpretation]** .

*Conceptual Item — Distractor:*
> Option **[letter]** **[restate choice]** . This is incorrect because **[specific error]** . The misconception is that **[what candidate thinks]** , but **[correct concept]** . This is a common area of confusion between **[distinction]** .

### D.6 G5: Metadata Review

**Gatekeeper:** Validator

**Required MCQ Metadata Fields (every item):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Part | Integer | Yes | Must be `2` |
| Section | String | Yes | A-F (Part 2 domain letter) |
| Topic | String | Yes | Controlled vocabulary: domain + sequence + description |
| QuestionID | String | Yes | Format: `P2-{Section}-{NNN}` (e.g., `P2-A-001`, `P2-C-250`) |
| question_state | String | Yes | One of: `Unprocessed`, `In Audit`, `Editorial Queue`, `Certified`, `Archived` |
| Stem | String | Yes | Question text |
| Choices | Object | Yes | `{ "A": "...", "B": "...", "C": "...", "D": "..." }` |
| CorrectChoice | String | Yes | One of: `"A"`, `"B"`, `"C"`, `"D"` |
| ExplanationCorrect | String | Yes | Minimum 50 characters; must reference Part 2 authority |
| ExplanationWrongA | String | Yes | Minimum 50 characters if A ≠ CorrectChoice; `""` if A = CorrectChoice |
| ExplanationWrongB | String | Yes | Minimum 50 characters if B ≠ CorrectChoice; `""` if B = CorrectChoice |
| ExplanationWrongC | String | Yes | Minimum 50 characters if C ≠ CorrectChoice; `""` if C = CorrectChoice |
| ExplanationWrongD | String | Yes | Minimum 50 characters if D ≠ CorrectChoice; `""` if D = CorrectChoice |
| Difficulty | String | Yes | One of: `Easy`, `Moderate-Easy`, `Moderate`, `Difficult`, `Very Difficult` |
| DifficultyScore | Integer | Yes | 1-5 |
| CognitiveLevel | String | Yes | One of: `Remember`, `Understand`, `Apply`, `Analyze`, `Evaluate` |
| CalculationItem | Boolean | Yes | `true` if item requires computation |
| **Part2OnlyFlag** | Boolean | **Yes** | **MUST be `true` — blocks certification if absent, false, or falsy** |
| VerificationChecks | Array[String] | No | Standard boilerplate checklist |

**Required Case-Level Metadata Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| CaseID | String | Yes | Format: `CBQ2{Pack}-{Section}{Seq}` (e.g., `CBQ2-A1`) |
| Title | String | Yes | 2-8 word descriptive title |
| SectionTags | Array[String] | Yes | Domain codes, e.g., `["A"]` |
| BlueprintDomain | String | Yes | Full domain name from EXAM_BLUEPRINT_P2.md |
| BlueprintObjectives | Array[String] | Yes | Specific LOS tested |
| ProductionStatus | String | Yes | One of: `Draft`, `Review`, `QA`, `Production`, `Retired` |
| Difficulty | String | Yes | `Easy`, `Moderate`, `Difficult`, `Very Difficult` |
| DifficultyScore | Integer | Yes | 1-5 |
| EstimatedMinutes | Integer | Yes | Expected completion time (20-40 minutes) |
| ScenarioText | String | Yes | 2-4 sentence business scenario |
| Part2OnlyFlag | Boolean | Yes | Must be `true` |

**Part2OnlyFlag Enforcement:**

This field is the primary gate between Part 1 and Part 2 content integrity. The validator shall:

1. Reject any item where `Part2OnlyFlag` is absent (field missing from JSON) → error
2. Reject any item where `Part2OnlyFlag` is `false` → error
3. Reject any item where `Part2OnlyFlag` is not strictly `true` (e.g., `"true"` string, `1` number) → error
4. After passing G5, the item's Part2OnlyFlag must survive serialization round-trip (`JSON.parse(JSON.stringify(item)).Part2OnlyFlag === true`)

### D.7 G6: Final Validation

**Gatekeeper:** Validator

**Requirements:**
- All G1-G5 gates passed
- Automated validation suite runs with zero errors
- Zero new warnings from baseline
- Governance guard all rules PASS (Rules 1-9)
- `grep -c '"QuestionID"'` count matches registry for target pack
- Pack file parses cleanly via `JSON.parse()` or Function constructor
- No detectable DL-008, DL-026, or DL-013 pattern in certification batch
- Part2OnlyFlag verified on every certified item

### D.8 G7: Approval

**Gatekeeper:** Release Manager

**Before Approval:**
- [ ] G1-G6 all passed with documented evidence
- [ ] All gate reports filed in `reports/`
- [ ] REVISION_HISTORY.md entry written with before/after counts
- [ ] DEFECT_LIBRARY_P2.md updated if any defects found during certification
- [ ] CURRENT_BASELINES_P2.md updated with new hashes
- [ ] Pre-delivery safety check confirms 0 known-defective QIDs in delivery pool
- [ ] All items in batch carry `Part2OnlyFlag: true`

---

## E. Part 2-Specific Quality Requirements

### E.1 Formula Verification Protocol

Every Part 2 calculation item must undergo the following protocol at G3:

1. **Formula Selection:** Confirm the correct formula is selected for the concept (e.g., DuPont ROE decomposition, not basic ROE, when testing profitability analysis at Analyze level)
2. **Input Traceability:** Verify every numerical input traces to the question stem or exhibit data. No phantom numbers.
3. **Unit Consistency:** Verify all units are consistent (e.g., thousands vs. singles, annual vs. monthly rates, pre-tax vs. after-tax)
4. **Independent Recalculation:**
   - Read the question stem and exhibits
   - **Do not** read the stored `Correct` value
   - Solve independently using the exhibits
   - Document: formula → substituted values → result
5. **Comparison:** Compare independent result to stored `Correct` value
6. **Tolerance Check:** Verify within accepted tolerance (§D.4)
7. **Reconciliation:** If results differ, determine which is correct and document the resolution

**Part 2-Specific Common Errors to Check:**

| Formula | Common Error |
|---------|-------------|
| WACC | Using pre-tax cost of debt instead of after-tax |
| WACC | Omitting preferred stock component |
| WACC | Using book values instead of market values for weights |
| CAPM | Using historical market return instead of expected |
| DuPont ROE | Using average equity vs. end-of-period equity incorrectly |
| NPV | Wrong discount rate (real vs. nominal, pre-tax vs. after-tax) |
| NPV | Omitting working capital recovery in terminal year |
| CVP | Mixing variable cost per unit with total fixed costs |
| Breakeven | Not adjusting for multi-product sales mix |
| DOL | Using total contribution margin vs. operating income incorrectly |
| EOQ | Using demand in units vs. dollars inconsistently |
| Transfer Price | Forgetting opportunity cost when capacity is full |
| Payback | Using discounted vs. undiscounted cash flows inconsistently |
| After-Tax CF | Omitting depreciation tax shield |
| Cash Conversion | Using COGS for DIO but sales for DSO — inconsistent bases |

### E.2 Authority Citation Verification

Every cited authority must match the question's actual concept:

| If Question Tests... | Correct Authority | Wrong Authority (Flag) |
|---------------------|-------------------|----------------------|
| Liquidity ratio | ASC 205 (Presentation of Financial Statements) | ASC 450 (Contingencies) |
| CAPM | CAPM (Sharpe-Lintner, 1964) | ASC 820 (Fair Value) |
| WACC calculation | Corporate finance theory (Brealey-Myers) | ASC 350 (Intangibles) |
| COSO ERM framework | COSO ERM (2017) — 5 components, 20 principles | COSO IC (2013) — different framework |
| Ethics — competence | IMA Ethics Standard I (Competence) | SOX — different authority |
| SOX whistleblower | SOX Title VIII (804) | IMA Ethics Standard IV (Credibility) |
| FCPA anti-bribery | FCPA (1977) — anti-bribery provisions | SOX 404 (Internal Controls) |
| NPV decision rule | Capital budgeting theory (Fisher, 1930) | FASB ASC 360 (Impairment) |
| DuPont analysis | Financial ratio analysis — DuPont Corporation (1914) | ASC 606 (Revenue Recognition) |

**Detection Rule:** For each question, scan for pattern `(ASC \d{3}(-\d{2})?|COSO ERM|COSO IC|IMA Ethics|SOX|FCPA|CAPM)`. For each match, verify the cited authority's scope topic matches the question's actual topic. If mismatch → flag as DL-009 pattern (incorrect authority citation).

### E.3 Domain Boundary Enforcement

No Part 2 item may test concepts that belong exclusively to Part 1. The following Part 1-only concepts must not appear as primary tested material in Part 2:

**Part 1 Exclusives (Not Permitted as Primary Test Material in Part 2):**

| Concept | Part | Reason |
|---------|------|--------|
| Standard costing variances (DM, DL, VOH, FOH) | 1 | Exclusive to Part 1 Cost Management |
| Process costing (FIFO, weighted average EUP) | 1 | Exclusive to Part 1 Cost Management |
| Job order costing (under/overapplied overhead) | 1 | Exclusive to Part 1 Cost Management |
| Joint product cost allocation (NRV, physical measures) | 1 | Exclusive to Part 1 Cost Management |
| Service department allocation (direct, step, reciprocal) | 1 | Exclusive to Part 1 Cost Management |
| Activity-based costing (ABC — full implementation) | 1 | Exclusive to Part 1 Cost Management |
| Internal control detailed procedures (COSO IC 2013) | 1 | Exclusive to Part 1 Internal Controls |
| Technology operational details (SDLC, DRP, BCP) | 1 | Exclusive to Part 1 Technology |

**Permitted Overlap (Context Only):**
- CVP analysis (breakeven) appears in both Part 1 and Part 2, but Part 2 tests at higher Bloom's levels (Analyze/Evaluate vs. Part 1's Apply)
- Relevant costing / differential analysis appears in both parts
- Ethical principles appear in both parts, but Part 2 tests deeper application (FCPA, SOX, IMA decision model)

**Enforcement:** During G1 Technical Review, the Accountant must verify every item's topic against the Part 1 Exclusives list. Any item testing a Part 1 exclusive as its primary concept must be flagged and cannot be certified.

### E.4 Part2OnlyFlag Verification

**Protocol (executed at every gate, not just G5):**

```
For each item in certification batch:
  1. Verify Part2OnlyFlag field exists in JSON object
  2. Verify typeof Part2OnlyFlag === "boolean"
  3. Verify Part2OnlyFlag === true
  4. Verify field survives JSON.parse(JSON.stringify(item))
  
  If any check fails → BLOCK certification for this item
  If all checks pass → proceed
```

**Rationale:** The `Part2OnlyFlag` is the single structural field that prevents cross-contamination between Part 1 and Part 2 content pools. It serves the same governance function as the dual QID prefix (`P1-` vs `P2-`) but operates at the field level, enabling validation tools to identify misclassified items programmatically.

**Defect Pattern — Part2OnlyFlag Absent (DL-P2-FLAG):** Any item missing Part2OnlyFlag is considered a structural defect analogous to DL-024 (missing question_state). It must be logged to `DEFECT_LIBRARY_P2.md` and remediated before certification.

---

## F. Gold Standard Checklist

### F.1 Purpose

Before any question or case is considered complete and approved for Production, it must satisfy every item on this checklist. This provides a simple pass/fail gate in addition to the numeric rubric.

### F.2 MCQ Checklist (21 Items)

1.  **Blueprint alignment** — Question maps to a specific Part 2 IMA Learning Outcome Statement (Appendix A of P2001)
2.  **Technical accuracy** — Accounting/finance treatment is correct under current Part 2 authorities (ASC, CAPM, COSO ERM 2017, IMA Ethics, SOX, FCPA)
3.  **Numerical accuracy** — All calculations independently verified via Formula Verification Protocol (§E.1)
4.  **Correct answer** — The stored `CorrectChoice` matches independent expert judgment
5.  **Distractor plausibility** — Every distractor represents a realistic candidate misconception
6.  **Distractor discrimination** — No distractor is obviously wrong; each targets a distinct error
7.  **No cueing** — No grammatical, length, or position cues point to the correct answer
8.  **Answer balance** — The question does not create a pattern if combined with adjacent questions
9.  **Explanation — authority** — Correct answer explanation names the governing Part 2 standard/authority
10. **Explanation — solution** — Shows formula with substituted values (for calculations) or reasoning chain (for conceptual)
11. **Explanation — business context** — Interprets the result in the scenario
12. **Explanation — distractors** — Each wrong-choice explanation is specific and teaches why it is wrong
13. **Explanation — exam trap** — Identifies at least one common candidate error
14. **Business realism** — Scenario uses realistic business language, not textbook phrasing
15. **Writing clarity** — No grammatical errors; professional tone
16. **Accessibility** — No biased language; fair to all candidate populations
17. **Metadata complete** — All required fields present and valid (§D.6)
18. **Metadata cross-references** — Formula references and authority references resolve correctly
19. **Part2OnlyFlag** — Field present and `true` (§E.4)
20. **Domain boundary** — Question does not test Part 1-exclusive concepts as primary material (§E.3)
21. **Validation pass** — Automated validation suite passes with zero errors (§D.7)

### F.3 Case Study Checklist (21 Items — 9 MCQ items above apply + 12 case-specific)

**From MCQ Checklist (Items 1-9 apply, adapted for case context):**
1.  Blueprint alignment
2.  Technical accuracy (Part 2 authorities)
3.  Numerical accuracy (Formula Verification Protocol)
4.  Correct answer (all items)
5.  Distractor plausibility
6.  Distractor discrimination
7.  No cueing
8.  Answer balance
9.  Explanation — authority (Part 2 standard)

**Case-Specific Items (10-21):**
10. **Scenario realism** — Named company, stakeholder, business trigger, and clear task present
11. **Exhibit quality** — Professional format, no decorative data (§C.3)
12. **Data consistency** — Numbers in exhibits are internally consistent (§C.6)
13. **Question interconnection** — Items follow logical progression (calculate → analyze → decide)
14. **Cognitive progression** — Items progress from lower to higher Bloom's levels (§C.4)
15. **Independent answerability** — Each item can be answered without relying on correct answers to prior items (§C.5)
16. **Exhibit referencing** — Every exhibit is referenced by at least one item
17. **Data consumption** — Every exhibit row/column is consumed by at least one item
18. **Case-level metadata** — All required case-level fields present and valid (§D.6)
19. **Item-level metadata** — All required item-level fields present and valid (§D.6)
20. **Exhibit-level metadata** — ExhibitID, Purpose, and ReferencedBy fields present
21. **Difficulty calibration** — Case-level difficulty is within ±1 of mean item difficulty

### F.4 Gold Standard Definition

A Part 2 question or case that achieves **100/100 on the rubric** AND satisfies **every item on the Gold Standard Checklist** is designated **Gold Standard**. Gold Standard content:

- Is marked `ProductionStatus: "Production"` and `Confidence: 100`
- Has been reviewed by at least two independent reviewers (one accounting, one editorial)
- Has all numerical content independently verified by two separate calculations
- Has complete metadata with no warnings
- Has `Part2OnlyFlag: true` verified by all 7 gates
- Serves as the benchmark for all future content creation

### F.5 Gold Standard Benchmark Count

| Category | Count |
|----------|-------|
| MCQ Checklist Items | 21 |
| Case Study Checklist Items | 21 (9 shared + 12 case-specific) |
| **Total Distinct Checklist Items** | **33** |

*(Note: Items 1-9 overlap between MCQ and Case checklists; 21 + 12 = 33 total distinct items across both checklists.)*

---

## G. Difficulty and Bloom's Targets

### G.1 Per-Domain Difficulty Distributions

#### Domain A — Financial Statement Analysis (20%, ~500 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 10% | 50 |
| Moderate-Easy (2) | 20% | 100 |
| Moderate (3) | 30% | 150 |
| Difficult (4) | 30% | 150 |
| Very Difficult (5) | 10% | 50 |

#### Domain B — Corporate Finance (20%, ~500 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 10% | 50 |
| Moderate-Easy (2) | 20% | 100 |
| Moderate (3) | 30% | 150 |
| Difficult (4) | 30% | 150 |
| Very Difficult (5) | 10% | 50 |

#### Domain C — Decision Analysis (25%, ~625 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 10% | 63 |
| Moderate-Easy (2) | 20% | 125 |
| Moderate (3) | 30% | 187 |
| Difficult (4) | 28% | 175 |
| Very Difficult (5) | 12% | 75 |

#### Domain D — Risk Management (10%, ~250 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 20% | 50 |
| Moderate-Easy (2) | 25% | 63 |
| Moderate (3) | 30% | 75 |
| Difficult (4) | 17% | 42 |
| Very Difficult (5) | 8% | 20 |

#### Domain E — Investment Decisions (10%, ~250 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 10% | 25 |
| Moderate-Easy (2) | 20% | 50 |
| Moderate (3) | 30% | 75 |
| Difficult (4) | 28% | 70 |
| Very Difficult (5) | 12% | 30 |

#### Domain F — Professional Ethics (15%, ~375 items)

| Difficulty | Target % | Items |
|------------|----------|-------|
| Easy (1) | 25% | 94 |
| Moderate-Easy (2) | 25% | 94 |
| Moderate (3) | 30% | 112 |
| Difficult (4) | 15% | 56 |
| Very Difficult (5) | 5% | 19 |

### G.2 Per-Domain Bloom's Distributions

#### Domain A — Financial Statement Analysis

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 10% | 50 |
| Understand | 20% | 100 |
| Apply | 45% | 225 |
| Analyze | 20% | 100 |
| Evaluate | 5% | 25 |

#### Domain B — Corporate Finance

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 10% | 50 |
| Understand | 20% | 100 |
| Apply | 50% | 250 |
| Analyze | 15% | 75 |
| Evaluate | 5% | 25 |

#### Domain C — Decision Analysis

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 5% | 31 |
| Understand | 15% | 94 |
| Apply | 50% | 313 |
| Analyze | 20% | 125 |
| Evaluate | 10% | 62 |

#### Domain D — Risk Management

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 20% | 50 |
| Understand | 35% | 88 |
| Apply | 25% | 62 |
| Analyze | 15% | 38 |
| Evaluate | 5% | 12 |

#### Domain E — Investment Decisions

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 10% | 25 |
| Understand | 15% | 38 |
| Apply | 55% | 137 |
| Analyze | 15% | 38 |
| Evaluate | 5% | 12 |

#### Domain F — Professional Ethics

| Level | Target % | Items |
|-------|----------|-------|
| Remember | 25% | 94 |
| Understand | 30% | 112 |
| Apply | 25% | 94 |
| Analyze | 15% | 56 |
| Evaluate | 5% | 19 |

### G.3 Pool-Wide Targets (All 2,500 Items Combined)

**Difficulty — Pool-Wide:**

| Difficulty | Target % | Items (2,500) |
|------------|----------|--------------|
| Easy (1) | 13.4% | 332 |
| Moderate-Easy (2) | 21.3% | 532 |
| Moderate (3) | 30.0% | 750 |
| Difficult (4) | 25.3% | 633 |
| Very Difficult (5) | 10.0% | 253 |

*Note: Domain-level targets are the authoritative source. Pool-wide figures are weighted averages and should be treated as guidance, not strict per-pack quotas.*

**Bloom's — Pool-Wide:**

| Level | Target % | Items (2,500) |
|-------|----------|--------------|
| Remember | 12.0% | 300 |
| Understand | 22.0% | 550 |
| Apply | 42.0% | 1,050 |
| Analyze | 17.2% | 430 |
| Evaluate | 6.8% | 170 |

### G.4 Per-Pack Targets (500 Items Each)

| Difficulty | Items | Bloom's | Items |
|------------|-------|---------|-------|
| Easy (1) | 75 | Remember | 60 |
| Moderate-Easy (2) | 100 | Understand | 110 |
| Moderate (3) | 150 | Apply | 210 |
| Difficult (4) | 125 | Analyze | 90 |
| Very Difficult (5) | 50 | Evaluate | 30 |

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-29 | Certification-Board Subagent P2-002 | Initial version. Adapted from CAQS v1.0 (Part 1) for CMA Part 2 Exam Simulator. All Part 1 domain/authority references replaced with Part 2 equivalents. Six-dimension verification established with Dimension 6 = "CMA Part 2 Relevance." Seven-gate certification pipeline defined. 33-item Gold Standard Checklist defined. Per-domain difficulty and Bloom's distribution tables from P2001 blueprint. Part2OnlyFlag requirement embedded in every lifecycle stage. |
