# Phase 0B — Pack D CorrectChoice Ground-Truth Audit

**Date:** 2026-07-24
**File:** `pack_d_corrected.js` (1,889,721 bytes, 500 items)
**Scope:** Certified items in Sections A and D (148 items)
**Methodology:** Independent derivation from stem + choices; no reliance on stored CorrectChoice or ExplanationCorrect
**Status:** READ-ONLY audit — no writes performed

---

## 1. File Architecture

Pack D uses a **paired-object architecture** with DL-016 (metadata-content Choice mismatch):

- **Block 1 (metadata):** `QuestionID`, `question_state`, `ChoiceA`–`D`, `ExplanationWrongA`–`D`
- **Block 2 (content):** `Stem`, `Choices.A`–`D`, `CorrectChoice`, `ExplanationCorrect`

The learner-facing content is in Block 2. The metadata Block 1 carries ChoiceA–D text from the 5-item rotation template that may differ from content-block Choices.A–D (DL-016). **All CorrectChoice and DL-008 verification in this audit uses Block 2 for CC and Block 1 for ExplanationWrong slots.**

---

## 2. Population

| Metric | Count |
|--------|-------|
| Total Section A items | 75 |
| Certified Section A | 73 |
| Hold Section A | 2 (P1-AD-047, P1-AD-048) |
| Total Section D items | 75 |
| Certified Section D | 75 |
| Hold Section D | 0 |
| **Total audited** | **148** |

All 148 items are in 5-item rotation groups: identical stems with company-name variation, choices positionally rotated so that CorrectChoice cycles A→B→C→D→A. The independent verification below is per concept group.

---

## 3. Section A — Independent Verification (73 items)

### Group 1: Factoring Without Recourse (AD-001–005)
**Concept:** ASC 860 — factoring without recourse is a sale of receivables, removing from balance sheet.
**Correct answer:** "As a sale of receivables, removing them from the balance sheet and recognizing any loss on sale"

| QID | CC | Labeled Answer Text | Independent | Verdict |
|-----|-----|-------------------|-------------|---------|
| AD-001 | A | As a sale of receivables... | Sale of receivables | ALL_AGREE |
| AD-002 | B | As a sale of receivables... | Sale of receivables | ALL_AGREE |
| AD-003 | C | As a sale of receivables... | Sale of receivables | ALL_AGREE |
| AD-004 | D | As a sale of receivables... | Sale of receivables | ALL_AGREE |
| AD-005 | A | As a sale of receivables... | Sale of receivables | ALL_AGREE |

### Group 2: Interest Capitalization — Self-Constructed (AD-006–010)
**Correct answer:** "Capitalize the interest as part of the asset's cost during the construction period"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-006 | B | ALL_AGREE |
| AD-007 | C | ALL_AGREE |
| AD-008 | D | ALL_AGREE |
| AD-009 | A | ALL_AGREE |
| AD-010 | B | ALL_AGREE |

### Group 3: Loan Principal Repayment — Cash Flows (AD-011–015)
**Correct answer:** "As a financing activity"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-011 | C | ALL_AGREE |
| AD-012 | D | ALL_AGREE |
| AD-013 | A | ALL_AGREE |
| AD-014 | B | ALL_AGREE |
| AD-015 | C | ALL_AGREE |

### Group 4: Revenue with Right of Return (AD-016–020)
**Correct answer:** "Recognize revenue for the amount expected to be entitled to, net of an estimated return provision"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-016 | D | ALL_AGREE |
| AD-017 | A | ALL_AGREE |
| AD-018 | B | ALL_AGREE |
| AD-019 | C | ALL_AGREE |
| AD-020 | D | ALL_AGREE |

### Group 5: AFS Debt Security Unrealized Gain (AD-021–025)
**Correct answer:** "In other comprehensive income, not in net income"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-021 | A | ALL_AGREE |
| AD-022 | B | ALL_AGREE |
| AD-023 | C | ALL_AGREE |
| AD-024 | D | ALL_AGREE |
| AD-025 | A | ALL_AGREE |

### Group 6: Asset Retirement Obligation (AD-026–030)
**Correct answer:** "Recognize a liability at the present value of estimated future costs, with an offsetting increase to the related asset"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-026 | B | ALL_AGREE |
| AD-027 | C | ALL_AGREE |
| AD-028 | D | ALL_AGREE |
| AD-029 | A | ALL_AGREE |
| AD-030 | B | ALL_AGREE |

### Group 7: Subsequent Events — Customer Bankruptcy (AD-031–035)
**Correct answer:** "As a recognized subsequent event, adjusting the financial statements for the conditions that existed at balance sheet date"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-031 | C | ALL_AGREE |
| AD-032 | D | ALL_AGREE |
| AD-033 | A | ALL_AGREE |
| AD-034 | B | ALL_AGREE |
| AD-035 | C | ALL_AGREE |

### Group 8: Debt Issuance Costs (AD-036–040)
**Correct answer:** "As a direct reduction of the bond's carrying amount, amortized over the bond term"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-036 | D | ALL_AGREE |
| AD-037 | A | ALL_AGREE |
| AD-038 | B | ALL_AGREE |
| AD-039 | C | ALL_AGREE |
| AD-040 | D | ALL_AGREE |

### Group 9: Comprehensive Income Presentation (AD-041–045)
**Correct answer:** "A single continuous statement of comprehensive income, or two separate but consecutive statements"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-041 | A | ALL_AGREE |
| AD-042 | B | ALL_AGREE |
| AD-043 | C | ALL_AGREE |
| AD-044 | D | ALL_AGREE |
| AD-045 | A | ALL_AGREE |

### Group 10: Consignment Inventory (AD-046, AD-049, AD-050)
**Correct answer:** "The consignor (the shipping company), since it retains ownership until sale to the end customer"
**Note:** AD-047 and AD-048 are `question_state: "Hold"` — excluded from audit.

| QID | CC | Verdict |
|-----|-----|---------|
| AD-046 | B | ALL_AGREE |
| AD-049 | A | ALL_AGREE |
| AD-050 | B | ALL_AGREE |

### Group 11: Convertible Preferred Stock EPS (AD-051–055)
**Correct answer:** "Include the as-if-converted shares in diluted EPS using the if-converted method"
**Numerical items:** AD-054 and AD-055 (see below)

| QID | CC | Verdict |
|-----|-----|---------|
| AD-051 | C | ALL_AGREE |
| AD-052 | D | ALL_AGREE |
| AD-053 | A | ALL_AGREE |
| AD-054 | B | ALL_AGREE — Basic EPS = ($500,000 − $50,000) / 200,000 = $2.25 |
| AD-055 | C | ALL_AGREE — Diluted EPS = $600,000 / (250,000 + 50,000) = $2.00 |

### Group 12: Partial-Year Depreciation (AD-056)
**Independent calc:** Depreciable base = $54,000 − $6,000 = $48,000. Annual = $48,000 / 8 = $6,000. 9/12 × $6,000 = $4,500

| QID | CC | Verdict |
|-----|-----|---------|
| AD-056 | D | ALL_AGREE |

### Group 13: Change in Accounting Estimate (AD-057–060)
**Correct answer:** "Prospectively, adjusting depreciation expense in the current and future periods"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-057 | A | ALL_AGREE |
| AD-058 | B | ALL_AGREE |
| AD-059 | C | ALL_AGREE |
| AD-060 | D | ALL_AGREE |

### Group 14: Noncash Investing/Financing Disclosure (AD-061–065)
**Correct answer:** "Disclosed as a supplemental noncash investing and financing activity"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-061 | A | ALL_AGREE |
| AD-062 | B | ALL_AGREE |
| AD-063 | C | ALL_AGREE |
| AD-064 | D | ALL_AGREE |
| AD-065 | A | ALL_AGREE |

### Group 15: Trading Securities (AD-066–070)
**Correct answer:** "Recognize unrealized gains and losses in net income each period"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-066 | B | ALL_AGREE |
| AD-067 | C | ALL_AGREE |
| AD-068 | D | ALL_AGREE |
| AD-069 | A | ALL_AGREE |
| AD-070 | B | ALL_AGREE |

### Group 16: Prior Period Error Correction (AD-071–075)
**Correct answer:** "As a prior period adjustment, restating the beginning balance of retained earnings"

| QID | CC | Verdict |
|-----|-----|---------|
| AD-071 | C | ALL_AGREE |
| AD-072 | D | ALL_AGREE |
| AD-073 | A | ALL_AGREE |
| AD-074 | B | ALL_AGREE |
| AD-075 | C | ALL_AGREE |

---

## 4. Section D — Independent Verification (75 items)

### Group 1: Normal Costing (DD-001–005)
**Correct answer:** "Normal costing"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-001 | A | ALL_AGREE |
| DD-002 | B | ALL_AGREE |
| DD-003 | C | ALL_AGREE |
| DD-004 | D | ALL_AGREE |
| DD-005 | A | ALL_AGREE |

### Group 2: FIFO Process Costing (DD-006–010)
**Correct answer:** "It keeps beginning work in process costs separate from current period costs"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-006 | B | ALL_AGREE |
| DD-007 | C | ALL_AGREE |
| DD-008 | D | ALL_AGREE |
| DD-009 | A | ALL_AGREE |
| DD-010 | B | ALL_AGREE |

### Group 3: Overapplied Overhead Disposition (DD-011–015)
**Correct answer:** "Closed to cost of goods sold, reducing the amount reported"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-011 | C | ALL_AGREE |
| DD-012 | D | ALL_AGREE |
| DD-013 | A | ALL_AGREE |
| DD-014 | B | ALL_AGREE |
| DD-015 | C | ALL_AGREE |

### Group 4: Step-Down Method (DD-016–020)
**Correct answer:** "It allocates costs sequentially, recognizing some but not all interdepartmental services"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-016 | D | ALL_AGREE |
| DD-017 | A | ALL_AGREE |
| DD-018 | B | ALL_AGREE |
| DD-019 | C | ALL_AGREE |
| DD-020 | D | ALL_AGREE |

### Group 5: ABC Cost Drivers / Calculations (DD-021–025)
| QID | CC | Independent Calc | Verdict |
|-----|-----|------------------|---------|
| DD-021 | A | "Number of customer orders processed" — correct driver for order processing pool | ALL_AGREE |
| DD-022 | B | $120,000/2,400 = $50/order × 600 = $30,000 | ALL_AGREE |
| DD-023 | C | $144,000/1,800 = $80/order × 260 = $20,800 | ALL_AGREE |
| DD-024 | D | $84,000/280 = $300/hr × 160 = $48,000 | ALL_AGREE |
| DD-025 | A | "Number of customer orders processed" | ALL_AGREE |

### Group 6: Margin of Safety (DD-026–030)
| QID | CC | Independent Calc | Verdict |
|-----|-----|------------------|---------|
| DD-026 | B | $920,000 − $690,000 = $230,000 | ALL_AGREE |
| DD-027 | C | 24,000 − 18,500 = 5,500 units | ALL_AGREE |
| DD-028 | D | $500,000 − $350,000 = $150,000 | ALL_AGREE |
| DD-029 | A | $500,000 − $350,000 = $150,000 | ALL_AGREE |
| DD-030 | B | $375,000/$1,250,000 = 30.0% | ALL_AGREE |

### Group 7: Degree of Operating Leverage (DD-031–035)
| QID | CC | Verdict |
|-----|-----|---------|
| DD-031 | C | ALL_AGREE — higher fixed costs = higher DOL, more sensitive income |
| DD-032 | D | ALL_AGREE |
| DD-033 | A | ALL_AGREE |
| DD-034 | B | ALL_AGREE — DOL=4.0 × 6% = 24% |
| DD-035 | C | ALL_AGREE |

### Group 8: Kaizen Costing (DD-036–040)
**Correct answer:** "Kaizen costing" — continuous improvement for products already in production

| QID | CC | Verdict |
|-----|-----|---------|
| DD-036 | D | ALL_AGREE |
| DD-037 | A | ALL_AGREE |
| DD-038 | B | ALL_AGREE |
| DD-039 | C | ALL_AGREE |
| DD-040 | D | ALL_AGREE |

### Group 9: Mixed (Semivariable) Cost (DD-041–045)
**Correct answer:** "A mixed (semivariable) cost"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-041 | A | ALL_AGREE |
| DD-042 | B | ALL_AGREE |
| DD-043 | C | ALL_AGREE |
| DD-044 | D | ALL_AGREE |
| DD-045 | A | ALL_AGREE |

### Group 10: Reciprocal Method (DD-046–050)
**Correct answer:** "The reciprocal method" — simultaneous equations, full mutual recognition

| QID | CC | Verdict |
|-----|-----|---------|
| DD-046 | B | ALL_AGREE |
| DD-047 | C | ALL_AGREE |
| DD-048 | D | ALL_AGREE |
| DD-049 | A | ALL_AGREE |
| DD-050 | B | ALL_AGREE |

### Group 11: Contribution Margin Income Statement (DD-051–055)
| QID | CC | Independent Calc/Derivation | Verdict |
|-----|-----|----------------------------|---------|
| DD-051 | C | "Contribution margin income statement" | ALL_AGREE |
| DD-052 | D | "A contribution margin income statement" | ALL_AGREE |
| DD-053 | A | 7,500 × ($44−$18−$6) = 7,500 × $20 = $150,000 | ALL_AGREE |
| DD-054 | B | CM = $640K−$260K−$70K = $310K. OI = $310K−$205K = $105K | ALL_AGREE |
| DD-055 | C | "Sales minus variable costs equals contribution margin" | ALL_AGREE |

### Group 12: ABC Multi-Pool (DD-056–058)
| QID | CC | Independent Calc | Verdict |
|-----|-----|------------------|---------|
| DD-056 | D | Setup: $600×170=$102K. Inspection: $50×1,100=$55K. Total=$157K | ALL_AGREE |
| DD-057 | A | Machining: $20×400=$8K. Setup: $300×24=$7.2K. Total=$15.2K | ALL_AGREE |
| DD-058 | B | Rate: $50/hr. Product Y: 120 hrs × $50 = $6,000 | ALL_AGREE |

### Group 13: Variance Calculations (DD-059–070)
| QID | CC | Independent Calc | Verdict |
|-----|-----|------------------|---------|
| DD-059 | C | (11,000−12,000) × $20 = −$20,000 unfav | ALL_AGREE |
| DD-060 | D | (3,000−3,200) × $8 = −$1,600 unfav | ALL_AGREE |
| DD-066 | B | ($5.00−$4.90) × 10,000 = $1,000 fav | ALL_AGREE |
| DD-067 | C | (3,200−3,400) × $3 = −$600 unfav | ALL_AGREE |
| DD-068 | D | ($20−$22) × 1,500 = −$3,000 unfav | ALL_AGREE |
| DD-069 | A | (1,200−1,300) × $15 = −$1,500 unfav | ALL_AGREE |
| DD-070 | B | $20,000−$18,500 = $1,500 fav | ALL_AGREE |

### Group 14: Multi-Product CVP (DD-061–065)
**Correct answer:** "A constant sales mix between the two products"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-061 | A | ALL_AGREE |
| DD-062 | B | ALL_AGREE |
| DD-063 | C | ALL_AGREE |
| DD-064 | D | ALL_AGREE |
| DD-065 | A | ALL_AGREE |

### Group 15: Abnormal Spoilage (DD-071–075)
**Correct answer:** "As a separate loss on the income statement in the period identified"

| QID | CC | Verdict |
|-----|-----|---------|
| DD-071 | C | ALL_AGREE |
| DD-072 | D | ALL_AGREE |
| DD-073 | A | ALL_AGREE |
| DD-074 | B | ALL_AGREE |
| DD-075 | C | ALL_AGREE |

---

## 5. DL-008 Findings

### DL-008 Violations (4 items)

| QID | Section | CC | ExplanationWrong[CC] Content | Severity |
|-----|---------|----|------------------------------|----------|
| **P1-AD-054** | A | B | "$2.16 is basic EPS calculated as ($600,000 - $60,000) / 250,000 = $2.16. Basic EPS ignores the dilut..." — describes a DIFFERENT item's calculation (AD-055's numbers), not AD-054. | High — cross-item pollution |
| **P1-AD-055** | A | C | "$6,000 is the full annual straight-line depreciation: ($54,000 - $6,000) / 8 years = $6,000 per year" — describes AD-056's topic (depreciation), NOT AD-055's EPS calculation. | High — cross-item pollution |
| **P1-DD-028** | D | D | "This figure likely results from a unit conversion error or from using contribute..." — truncated but non-empty placeholder boilerplate. | Medium |
| **P1-DD-029** | D | A | "This figure likely results from a unit conversion error or from using contribute..." — same boilerplate as DD-028. | Medium |

### DL-008 Analysis

- **AD-054**: ExplanationWrongB (the CC slot) contains the basic EPS calculation for AD-055's numbers ($600K, $60K dividends, 250K shares = $2.16), not AD-054's ($500K, $50K, 200K = $2.25). This is a DL-010 (misassigned explanation) variant — the text describes a *different item* entirely.
- **AD-055**: ExplanationWrongC (the CC slot) contains the straight-line depreciation calculation for AD-056 ($54K−$6K / 8 = $6,000). This is also cross-item pollution, not just a redundant duplicate of the correct explanation.
- **DD-028/DD-029**: Both have generic boilerplate fragments. Not cross-item pollution, but non-empty placeholder text in the CC slot.

---

## 6. Section A vs. Section D Summary

| Metric | Section A | Section D | Combined |
|--------|-----------|-----------|----------|
| Certified items | 73 | 75 | **148** |
| ALL_AGREE (CC correct) | 73 | 75 | **148 (100%)** |
| CC_WRONG | 0 | 0 | **0** |
| DL-008 violations | 2 | 2 | **4** |
| ALL_AGREE rate | **100%** | **100%** | **100%** |

---

## 7. Final Summary

| Metric | Count |
|--------|-------|
| Total items audited | **148** |
| ALL_AGREE (CC matches independent derivation) | **148** |
| CC_WRONG (CC contradicts independent derivation) | **0** |
| DL-008 violations (non-empty ExplanationWrong[CorrectChoice]) | **4** |
| ALL_AGREE rate | **100.0%** |
| DL-008 rate | **2.7%** |

### Key Findings

1. **Zero CorrectChoice defects.** All 148 labeled CorrectChoice values agree with independent accounting derivation. The 5-item rotation template correctly positions the correct answer text under the rotating letter. No item has a wrong answer key.

2. **Four DL-008 violations remain.** AD-054 and AD-055 have cross-item text pollution (each EW[CC] describes a *different* QID's calculation). DD-028 and DD-029 have non-empty generic boilerplate fragments in the CC explanation slot. These are structural defects that do not affect CC correctness but violate EV8 (CAQS §4.4).

3. **Absolute count stability.** Independent Select-String count = 248 Certified items across all Pack D. The 148 items in Sections A+D audited here represent 59.7% of Pack D's Certified population. Sections B and F (remaining ~100 Certified items) were not audited in this session.

4. **DL-016 metadata-content mismatch confirmed.** The Block 1 metadata ChoiceA–D text differs from Block 2 content Choices.A–D for all items in rotation groups. This is cosmetic (the app renders Block 2) but complicates scan tooling that reads flat `"ChoiceA"` regex matches instead of path-aware `"Choices": { "A"` matching.

### CorrectChoice Verdict

**ALL_AGREE across all 148 items (100%). No CorrectChoice defects found in Pack D Sections A or D.**
