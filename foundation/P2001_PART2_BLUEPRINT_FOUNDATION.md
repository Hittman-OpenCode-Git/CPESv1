# CMA Part 2 Exam Simulator — Foundational Architecture Plan

**Status:** Draft — READ-ONLY Research & Architecture
**Date:** 2026-07-29
**Session:** P2-001
**Based on:** CMA Part 1 Exam Simulator v2.1 architecture (2,545 MCQs, 77 cases, 9-rule governance guard)
**Authoritative Source:** IMA CMA Part 2 Content Specification Outline (September 2024 CSO)

---

## 1. Domain Map

### Domain A — Financial Statement Analysis (20%, ~100 exam questions)

**Key Topics:**
1. Financial ratio computation and interpretation (liquidity, leverage, activity, profitability, market)
2. Comparative analysis (horizontal, vertical, trend)
3. Profitability analysis (ROA, ROE, DuPont decomposition)
4. Earnings quality and sustainability assessment
5. Leverage analysis (operating, financial, total)

**Key LO Statements (most testable):**
- A.1: Compute and interpret all five ratio categories
- A.2: Analyze profitability ratios and DuPont analysis
- A.3: Horizontal/vertical/trend comparative analysis
- A.4: Operating and financial leverage computation

**Key Formulas:**
- Current Ratio, Quick Ratio, Cash Ratio
- Inventory Turnover, Days Sales Outstanding, Days Payable Outstanding
- Debt-to-Equity, Times Interest Earned
- Gross Margin %, Operating Margin %, Net Margin %
- ROA, ROE, DuPont Identity (ROE = NPM × TAT × EM)
- EPS, P/E Ratio, Dividend Yield, Book Value per Share
- Degree of Operating Leverage (DOL), Degree of Financial Leverage (DFL)
- Sustainable Growth Rate = ROE × (1 − Dividend Payout)

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 10% |
| Understand | 20% |
| Apply | 45% |
| Analyze | 20% |
| Evaluate | 5% |

---

### Domain B — Corporate Finance (20%, ~100 exam questions)

**Key Topics:**
1. Risk and return (std dev, beta, CAPM)
2. Cost of capital (WACC, component costs)
3. Working capital management
4. Capital structure decisions
5. International finance

**Key Formulas:**
- Expected Return = Σ(Pᵢ × Rᵢ)
- CAPM: Rₑ = Rf + β(Rm − Rf)
- WACC = (E/V × Rₑ) + (P/V × Rp) + (D/V × R𝒹 × (1 − t))
- Cost of Preferred = Dp / Pp
- Cash Conversion Cycle = DIO + DSO − DPO
- EOQ = √(2DS/H)
- Effective Annual Rate, NPV of financing
- Forward/FX premium or discount

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 10% |
| Understand | 20% |
| Apply | 50% |
| Analyze | 15% |
| Evaluate | 5% |

---

### Domain C — Decision Analysis (25%, ~125 exam questions — largest domain)

**Key Topics:**
1. CVP analysis (breakeven, target profit, multi-product)
2. Marginal analysis (special orders, make-or-buy, sell-or-process)
3. Pricing decisions
4. Relevant costing
5. Decision modeling under uncertainty

**Key Formulas:**
- Breakeven (units) = Fixed Costs / CM per Unit
- Breakeven (dollars) = Fixed Costs / CM Ratio
- Target Profit (units) = (FC + Target Profit) / CM per Unit
- Margin of Safety = (Actual Sales − BE Sales) / Actual Sales
- Degree of Operating Leverage = CM / Operating Income
- Multi-product weighted average CM
- Shut-down point: Price ≥ Minimum AVC
- Sell-or-process-further: Incremental Revenue > Incremental Cost
- Transfer pricing: Minimum = VC + Opportunity Cost
- Expected Value = Σ(Pᵢ × Outcomeᵢ)
- Perfect Information: EV with PI − EV without PI

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 5% |
| Understand | 15% |
| Apply | 50% |
| Analyze | 20% |
| Evaluate | 10% |

---

### Domain D — Risk Management (10%, ~50 exam questions)

**Key Topics:**
1. COSO ERM framework (2017)
2. Risk identification and assessment
3. Risk response strategies
4. ERM integration with strategy and performance
5. Types of risk (strategic, operational, financial, hazard)

**Key Formulas:**
- Expected Loss = Probability × Impact
- Risk Score = Likelihood × Severity
- Residual Risk = Inherent Risk − Controls

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 20% |
| Understand | 35% |
| Apply | 25% |
| Analyze | 15% |
| Evaluate | 5% |

---

### Domain E — Investment Decisions (10%, ~50 exam questions)

**Key Topics:**
1. Capital budgeting methods (NPV, IRR, payback, PI, ARR)
2. Discounted cash flow analysis
3. Risk analysis in capital investments
4. Real options
5. Capital rationing

**Key Formulas:**
- NPV = Σ(CFₜ / (1+r)ᵗ) − Initial Investment
- IRR: rate where NPV = 0
- Payback = Initial Investment / Annual CF (uniform) or cumulative
- Discounted Payback
- Profitability Index = PV of Future CFs / Initial Investment
- Equivalent Annual Annuity (EAA) = NPV / PVIFA(r,n)
- MACRS depreciation tables
- After-tax cash flow = (Revenue − Expenses) × (1 − t) + (Depreciation × t)

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 10% |
| Understand | 15% |
| Apply | 55% |
| Analyze | 15% |
| Evaluate | 5% |

---

### Domain F — Professional Ethics (15%, ~75 exam questions)

**Key Topics:**
1. IMA Statement of Ethical Professional Practice (4 standards)
2. Ethical decision-making model
3. Fraud and the Fraud Triangle
4. Corporate governance (SOX, audit committees)
5. FCPA and international ethics

**Bloom's Distribution Target:**
| Level | Target % |
|-------|----------|
| Remember | 25% |
| Understand | 30% |
| Apply | 25% |
| Analyze | 15% |
| Evaluate | 5% |

---

## 2. MCQ Architecture

### Pack Structure

| Pack | Primary Domain(s) | Items |
|------|------------------|-------|
| `pack_p2_a.js` | A: Financial Statement Analysis | 500 |
| `pack_p2_b.js` | B: Corporate Finance | 500 |
| `pack_p2_c.js` | C: Decision Analysis | 500 |
| `pack_p2_d.js` | D: Risk Management + E: Investment Decisions | 500 (250+250) |
| `pack_p2_e.js` | F: Professional Ethics + Cross-domain | 500 (375+125) |

**Total: 2,500 MCQs**

### QID Format
`P2-{Section}-{NNN}` (e.g., `P2-A-001`, `P2-C-250`)

### Difficulty Distribution Target

| Difficulty | Target % | Per Pack (500) |
|------------|----------|---------------|
| Easy (1) | 15% | 75 |
| Moderate-Easy (2) | 20% | 100 |
| Moderate (3) | 30% | 150 |
| Difficult (4) | 25% | 125 |
| Very Difficult (5) | 10% | 50 |

### Cognitive Level Distribution Target

| Level | Target % | Per Pack (500) |
|-------|----------|---------------|
| Remember | 12% | 60 |
| Understand | 22% | 110 |
| Apply | 42% | 210 |
| Analyze | 18% | 90 |
| Evaluate | 6% | 30 |

### Question Type Mix

| Type | Target % | Per Pack |
|------|----------|----------|
| select (single best A-D) | 85% | 425 |
| numeric | 8% | 40 |
| multi | 4% | 20 |
| fill | 2% | 10 |
| match | 1% | 5 |

### Metadata Schema (Single Object)

Each MCQ item is one JSON object — single-object architecture from Day 1 (eliminates Part 1's DL-016 dual-block problem):

```jsonc
{
  "Part": 2,
  "Section": "A",
  "Topic": "A.001 current ratio computation",
  "QuestionID": "P2-A-001",
  "question_state": "Unprocessed",
  "Stem": "...",
  "Choices": { "A": "...", "B": "...", "C": "...", "D": "..." },
  "CorrectChoice": "B",
  "ExplanationCorrect": "...",
  "ExplanationWrongA": "...",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "...",
  "ExplanationWrongD": "...",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "VerifiedChecks": [ /* standard boilerplate */ ],
  "Part2OnlyFlag": true
}
```

---

## 3. Case Study Architecture

### Case Count and Distribution

| Domain | % Weight | Cases | Items (5-6 per case) |
|--------|----------|-------|---------------------|
| A — Financial Statement Analysis | 20% | 15 | 75-90 |
| B — Corporate Finance | 20% | 15 | 75-90 |
| C — Decision Analysis | 25% | 18 | 90-108 |
| D — Risk Management | 10% | 8 | 40-48 |
| E — Investment Decisions | 10% | 7 | 35-42 |
| F — Professional Ethics | 15% | 12 | 60-72 |
| **Total** | **100%** | **75** | **375-450** |

### Case Pack Organization (3 packs × 33/33/34 cases)

| Pack | Section Distribution | Cases | Items |
|------|---------------------|-------|-------|
| `case_pack_p2_1.js` | A:8, B:6, C:8, D:4, E:4, F:3 | 33 | ~176 |
| `case_pack_p2_2.js` | A:5, B:6, C:8, D:4, E:3, F:7 | 33 | ~176 |
| `case_pack_p2_3.js` | A:6, B:6, C:8, D:3, E:3, F:8 | 34 | ~181 |

### CaseID Format
`CBQ2{Pack}-{Section}{Seq}` (e.g., `CBQ2-A1`, `CBQ2-B15`)

### Exhibit Types Per Domain

| Domain | Primary Exhibit Types |
|--------|----------------------|
| A | financial-statement, table (ratio summary) |
| B | financial-statement, table (bond amortization, WACC), erp-report |
| C | table (cost data), dashboard (product mix), erp-report |
| D | policy (ERM framework), dashboard (risk register), text |
| E | table (cash flow projections, MACRS), contract, dashboard |
| F | policy (code of ethics), email, text (fraud scenarios) |

### Cognitive Progression Rules
- Position 1-2: Apply (calculation) — foundational computation
- Position 3-4: Analyze (interpretation) — interpret results
- Position 5: Evaluate (judgment) — recommendation or decision
- Position 6 (optional): Evaluate/Synthesize — cross-concept integration

---

## 4. Certification Standards

### CAQS v1.0 Rules That Transfer Directly

| CAQS Section | Rule | Transfer |
|-------------|------|----------|
| §1.6 | Six-dimension AI verification | Transfer (rename Dimension 6: "Part 2 Relevance") |
| §1.7 | Certification state governance | Direct transfer |
| §2 | 10-dimension quality rubric (100 points) | Direct transfer |
| §2.3 | Auto-fail: Dimension 3 or 6 = 0 | Direct transfer |
| §3 | Case study standards | Direct transfer |
| §4 | Explanation standards (EV1-EV8) | Direct transfer |
| §5 | Numerical validation standard | Direct transfer |
| §6 | Psychometric standards | Transfer with adjusted targets |
| §7 | Metadata standard | Transfer with domain-specific enums |
| §9 | Audit workflow (7-step pipeline) | Direct transfer |
| §14 | Gold Standard Checklist | Transfer with updated authorities |

### New Part 2 Authority References

| Domain | Authorities |
|--------|-------------|
| A | FASB ASC (GAAP ratios), IFRS, SEC reporting |
| B | CAPM (Sharpe-Lintner), Modigliani-Miller, Basel III |
| C | IMA SMA on relevant costing, pricing models |
| D | **COSO ERM (2017)** — 5 components, 20 principles |
| E | NPV/IRR theory, MACRS (IRS Pub 946), real options |
| F | **IMA Statement of Ethical Professional Practice**, SOX 2002, FCPA, Dodd-Frank |

### Known Defect Classes — Part 2 Recurrence Risk

| Defect | Risk | Mitigation |
|--------|------|------------|
| DL-008 (non-empty EW[CC]) | **High** | Governance guard Rule 2 active from first write |
| DL-013 (template boilerplate EW) | **High** | Quality gate: no "represents a plausible misconception" |
| DL-026 (empty non-CC EW slots) | **Medium** | Rule 6 (empty distractor BLOCK) |
| DL-030 (answer-key errors) | **Critical** | Independent recalculation mandatory before certification |
| DL-031 (difficulty inflation) | **High** | Per-item cognitive-level justification required |
| DL-016 (metadata-content mismatch) | **Avoidable** | Single-object architecture eliminates this |

---

## 5. Development Roadmap

### Phase 0: Pre-Flight (Week 1)
- [ ] Establish Part 2 repository (new repo: `CMA_Part_2_2026`)
- [ ] Adopt Part 1 constitution, governance guard, and AGENTS.md (adapted)
- [ ] Create `foundation/EXAM_BLUEPRINT_P2.md`
- [ ] Create `foundation/FORMULA_MASTER_P2.md` (40+ formulas)
- [ ] Create `knowledge/CAQS_P2_v1.0.md`
- [ ] Create `knowledge/TAXONOMY_REGISTRY_P2.md`
- [ ] Create `knowledge/DEFECT_LIBRARY_P2.md` (empty)
- [ ] Create `knowledge/CURRENT_BASELINES_P2.md` (empty)
- [ ] Set up governance guard with Part 2 domain validators

### Phase 1: Foundation Content (Weeks 2-4)
1. Pack A (Domain A: Financial Statement Analysis) — 500 items
2. Pack C (Domain C: Decision Analysis, batch 1) — 500 items

### Phase 2: Core Content (Weeks 5-8)
3. Pack B (Domain B: Corporate Finance) — 500 items
4. Pack C Part 2 (Domain C batch 2 + Domain D) — 500 items

### Phase 3: Specialized Content (Weeks 9-10)
5. Pack D (Domain E + Domain F batch 1) — 500 items
6. Pack E (Domain F batch 2 + Cross-domain) — 500 items

### Phase 4: Certification Pipeline (Weeks 11-13)
- Six-dimension verification for all 2,500 items
- Target: 95%+ certified (2,375 / 2,500 minimum)

### Phase 5: Case Studies (Weeks 14-17)
- Author 75 cases across 3 case packs
- Certification of all case items

### Phase 6: Integration & Polish (Week 18+)
- End-to-end simulation test
- Blueprint coverage gap analysis
- Difficulty distribution audit
- Pre-delivery safety check

**Total Timeline:** ~18 weeks for a complete Part 2 simulator

---

## 6. Technical Architecture Decisions

| Decision | Verdict | Rationale |
|----------|---------|-----------|
| Repository | **New repo** (`CMA_Part_2_2026`) | Prevents cross-contamination, enables parallel dev |
| Object architecture | **Single-object** (not dual-block) | Eliminates DL-016, DL-029, CC-offset scan artifacts |
| QID prefix | `P2-` for MCQs, `CBQ2` for cases | No collision with Part 1 |
| Pack naming | `pack_p2_a.js` through `pack_p2_e.js` | Explicit Part 2 labeling |
| Case pack naming | `case_pack_p2_1.js` through `case_pack_p2_3.js` | Matches Part 1 pattern |
| Governance guard | **Reuse all 9 rules** | All generalize across exam parts |
| app.js | **Fork and extend** | ~70% reusable, 30% Part 2-specific config |
| CAQS | **Adapt from v1.0** | Same framework, Part 2-specific domains/authorities |
| Validation scripts | **Fork + extend** | String-aware brace-matcher reuses; domain validators are new |

### Shared Assets (copy then independently maintain)
- `.opencode/plugins/governance-guard.js` (9 rules)
- `scripts/validators/ExplanationValidator.js` (string-aware brace-matcher)
- `scripts/test_governance_guard.js` (test suite)
- `knowledge/BACKUP_PROTOCOL.md`
- AGENTS.md structure
- 00_PROJECT_CONSTITUTION.md structure

### Root Directory Layout (Part 2 Repo)
```
/                            (root)
├── index_updated.html
├── app.js                   (forked, Part 2 adapted)
├── styles.css               (identical to Part 1)
├── pack_p2_a.js             (Domain A: 500 items)
├── pack_p2_b.js             (Domain B: 500 items)
├── pack_p2_c.js             (Domain C: 750 items)
├── pack_p2_d.js             (Domain D: 500 items)
├── pack_p2_e.js             (Domain E: 500 items)
├── pack_p2_f.js             (Domain F: 500 items)
├── case_pack_p2_1.js        (33 cases)
├── case_pack_p2_2.js        (33 cases)
├── case_pack_p2_3.js        (34 cases)
├── package.json
├── package-lock.json
├── opencode.json
├── VERSION
├── AGENTS.md
├── backups/
├── scripts/
├── reports/
├── knowledge/
├── ai/
├── foundation/
├── review/
└── .opencode/
```

---

## Appendix A: IMA CMA Part 2 LOS Breakdown

### A. Financial Statement Analysis (20%)
| LOS | Topic |
|-----|-------|
| A.1 | Calculate and interpret financial ratios (5 categories) |
| A.2 | Analyze profitability and limitations of ratio analysis |
| A.3 | Evaluate ROA, ROE, and earnings quality |
| A.4 | Perform comparative financial statement analysis |
| A.5 | Evaluate the impact of foreign operations |
| A.6 | Assess changing prices and inflation on ratios |
| A.7 | Analyze off-balance-sheet financing |
| A.8 | Define and analyze operating and financial leverage |
| A.9 | Evaluate sustainable growth rate and dividend policy |

### B. Corporate Finance (20%)
| LOS | Topic |
|-----|-------|
| B.1 | Calculate risk and return measures (std dev, beta, CAPM) |
| B.2 | Calculate cost of capital (WACC, component costs) |
| B.3 | Evaluate capital structure and optimal leverage |
| B.4 | Manage working capital (cash, receivables, inventory, payables) |
| B.5 | Analyze short-term financing and cash management |
| B.6 | Evaluate long-term financing (bonds, stocks, leases) |
| B.7 | Analyze dividend policy and share repurchases |
| B.8 | Assess corporate restructuring (M&A, divestitures, LBOs) |
| B.9 | Evaluate international finance (FX, transfer pricing, political risk) |

### C. Decision Analysis (25%)
| LOS | Topic |
|-----|-------|
| C.1 | Apply CVP analysis (breakeven, target profit, margin of safety) |
| C.2 | Perform marginal analysis (special orders, make-or-buy, sell-or-process) |
| C.3 | Evaluate pricing decisions (cost-based, market-based, target costing) |
| C.4 | Apply relevant costing to short-term decisions |
| C.5 | Analyze capacity constraints and product mix |
| C.6 | Evaluate business decision models under uncertainty |
| C.7 | Assess make-vs-buy and outsourcing decisions |

### D. Risk Management (10%)
| LOS | Topic |
|-----|-------|
| D.1 | Apply COSO ERM framework (governance, strategy, performance, review) |
| D.2 | Identify and assess types of risk |
| D.3 | Evaluate risk appetite, tolerance, and capacity |
| D.4 | Analyze risk response strategies (avoid, reduce, share, accept) |
| D.5 | Implement ERM integration with strategy |

### E. Investment Decisions (10%)
| LOS | Topic |
|-----|-------|
| E.1 | Calculate capital budgeting methods (NPV, IRR, payback, PI, ARR) |
| E.2 | Perform DCF analysis for project evaluation |
| E.3 | Analyze risk in capital investments (sensitivity, scenario, Monte Carlo) |
| E.4 | Evaluate mutually exclusive projects with unequal lives |
| E.5 | Define and value real options |
| E.6 | Assess post-audit and capital rationing |

### F. Professional Ethics (15%)
| LOS | Topic |
|-----|-------|
| F.1 | Apply IMA Statement of Ethical Professional Practice |
| F.2 | Identify ethical issues facing management accountants |
| F.3 | Apply IMA ethical decision-making model |
| F.4 | Evaluate fraud and fraudulent financial reporting |
| F.5 | Assess corporate governance and ethics (SOX, audit committees) |
| F.6 | Apply Foreign Corrupt Practices Act (FCPA) |
| F.7 | Evaluate sustainability and social responsibility reporting |

---

## Appendix B: Key Architectural Differences — Part 1 vs. Part 2

| Dimension | Part 1 | Part 2 |
|-----------|--------|--------|
| Knowledge Domain | Financial accounting, cost management, internal controls, technology | Financial analysis, corporate finance, decisions, ERM, investments, ethics |
| Calculation Intensity | Moderate (variances, cost allocation) | High (NPV, IRR, WACC, CAPM, ratios, CVP) |
| Object Architecture | Dual-block (metadata + content) | **Single-object** (one block per item) |
| Primary Authorities | FASB ASC, COSO IC (2013) | FASB ASC, COSO ERM (2017), IMA Ethics, CAPM |
| MCQ Packs | 5 packs, 2,545 items total | 5 packs, 2,500 items total |
| Case Packs | 3 packs, 77 cases | 3 packs, 75 cases |
| QID Prefix | `P1-` | `P2-` |
| CaseID Prefix | `CBQ` | `CBQ2` |
| Certified Target | 2,451 / 2,545 (96.3%) | 2,375 / 2,500 (95%) minimum |
| Bloom's Apply Target | 40% | 42% (higher calculation load) |
| Repository | `CMA_Part_1_2026` | `CMA_Part_2_2026` (proposed) |
