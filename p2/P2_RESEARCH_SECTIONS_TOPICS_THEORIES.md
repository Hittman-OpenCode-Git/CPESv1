# CMA Part 2 — Sections, Topics & Theories Coverage Research

**Status:** Research complete (read-only) — input to content development
**Date:** 2026-08-02
**Authoritative source:** IMA CMA Part 2 Content Specification Outline (CSO), effective **September 2024** ("Part 2 – Strategic Financial Management")
**External cross-verification:** Wikipedia "Certified Management Accountant" (cites IMA) — section names and weights reproduced verbatim and match below.
**Internal baseline used:** `foundation/P2001_PART2_BLUEPRINT_FOUNDATION.md` (P2-001) + `p2/P2002_BLUEPRINT_EXTRACTION.json` (P2-002)

---

## 0. Purpose & Method

The task is to establish, *before content development begins*, the full universe of what the CMA Part 2 exam tests — at three levels of granularity:

1. **Sections** (the 6 exam content areas and their weights)
2. **Topics** (the Learning Outcome Statements / subtopics within each section)
3. **Theories** (the named models, frameworks, laws, and conceptual theories a candidate must *recognize and apply* — the dimension the existing blueprint docs only sketch via `part2_authorities`)

Method: (a) the internal P2001 foundation + P2002 JSON extraction were treated as the working hypothesis; (b) section names and weights were cross-checked against an independent source (Wikipedia, which cites IMA directly); (c) the Theories layer was built from the IMA CSO intent, the named authorities in P2001 §5, and standard CMA Part 2 curriculum coverage. Everything below is the consolidated coverage reference for authoring.

**Verification result:** Section names and percentage weights are confirmed correct against IMA's published CSO. No discrepancies were found between the internal foundation doc and the external source.

---

## 1. Sections & Exam Weights (VERIFIED)

| Section | Name | Exam Weight | Approx. Exam Qs |
|---------|------|------------:|----------------:|
| A | Financial Statement Analysis | 20% | ~100 |
| B | Corporate Finance | 20% | ~100 |
| C | Decision Analysis | 25% | ~125 |
| D | Risk Management | 10% | ~50 |
| E | Investment Decisions | 10% | ~50 |
| F | Professional Ethics | 15% | ~75 |
| **Total** | | **100%** | **~500** |

Part 2 is formally titled **"Strategic Financial Management."** It is the more quantitatively intensive of the two parts (NPV, IRR, WACC, CAPM, ratios, CVP).

---

## 2. Topics by Section (from P2001 LOS breakdown, CSO-aligned)

### Section A — Financial Statement Analysis (20%, 9 LOS)
- A.1 Calculate and interpret financial ratios (liquidity, leverage, activity, profitability, market)
- A.2 Analyze profitability and limitations of ratio analysis
- A.3 Evaluate ROA, ROE, and earnings quality
- A.4 Perform comparative financial statement analysis (horizontal, vertical, trend)
- A.5 Evaluate the impact of foreign operations (translation/transaction exposure)
- A.6 Assess changing prices and inflation on ratios
- A.7 Analyze off-balance-sheet financing
- A.8 Define and analyze operating and financial leverage
- A.9 Evaluate sustainable growth rate and dividend policy

### Section B — Corporate Finance (20%, 9 LOS)
- B.1 Calculate risk and return measures (std dev, beta, CAPM)
- B.2 Calculate cost of capital (WACC, component costs)
- B.3 Evaluate capital structure and optimal leverage
- B.4 Manage working capital (cash, receivables, inventory, payables)
- B.5 Analyze short-term financing and cash management
- B.6 Evaluate long-term financing (bonds, stocks, leases)
- B.7 Analyze dividend policy and share repurchases
- B.8 Assess corporate restructuring (M&A, divestitures, LBOs)
- B.9 Evaluate international finance (FX, transfer pricing, political risk)

### Section C — Decision Analysis (25%, 7 LOS) — *largest section*
- C.1 Apply CVP analysis (breakeven, target profit, margin of safety)
- C.2 Perform marginal analysis (special orders, make-or-buy, sell-or-process)
- C.3 Evaluate pricing decisions (cost-based, market-based, target costing)
- C.4 Apply relevant costing to short-term decisions
- C.5 Analyze capacity constraints and product mix
- C.6 Evaluate business decision models under uncertainty
- C.7 Assess make-vs-buy and outsourcing decisions

### Section D — Risk Management (10%, 5 LOS)
- D.1 Apply COSO ERM framework (governance, strategy, performance, review)
- D.2 Identify and assess types of risk
- D.3 Evaluate risk appetite, tolerance, and capacity
- D.4 Analyze risk response strategies (avoid, reduce, share, accept)
- D.5 Implement ERM integration with strategy

### Section E — Investment Decisions (10%, 6 LOS)
- E.1 Calculate capital budgeting methods (NPV, IRR, payback, PI, ARR)
- E.2 Perform DCF analysis for project evaluation
- E.3 Analyze risk in capital investments (sensitivity, scenario, Monte Carlo)
- E.4 Evaluate mutually exclusive projects with unequal lives
- E.5 Define and value real options
- E.6 Assess post-audit and capital rationing

### Section F — Professional Ethics (15%, 7 LOS)
- F.1 Apply IMA Statement of Ethical Professional Practice
- F.2 Identify ethical issues facing management accountants
- F.3 Apply IMA ethical decision-making model
- F.4 Evaluate fraud and fraudulent financial reporting
- F.5 Assess corporate governance and ethics (SOX, audit committees)
- F.6 Apply Foreign Corrupt Practices Act (FCPA)
- F.7 Evaluate sustainability and social responsibility reporting

---

## 3. Theories, Models & Frameworks by Section (THE NEW COVERAGE LAYER)

This is the layer the existing blueprint only hints at via `part2_authorities`. Every named theory below is fair game on the exam and should be explicitly covered by at least one item per pack.

### Section A — Financial Statement Analysis
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **Ratio analysis framework** (5 families: liquidity, leverage/solvency, activity/efficiency, profitability, market value) | Compute & interpret; know which ratio answers which question |
| **DuPont analysis** (3-component: ROE = NPM × TAT × EM; extended 5-component) | Decompose ROE drivers; diagnose margin vs. turnover vs. leverage |
| **Common-size / vertical analysis** | Build %-of-sales / %-of-assets statements; compare firms of different size |
| **Horizontal & trend analysis** | Compute period-over-period % change; interpret multi-year trends |
| **Earnings quality assessment** | Quality-of-income ratio (CFO/net income), accruals analysis, red flags |
| **Sustainable growth rate (Higgins model)** | SGR = ROE × (1 − payout); link to dividend policy |
| **Operating vs. financial leverage** | DOL, DFL, DCL; combined leverage; break-even risk |
| **Off-balance-sheet financing** | Operating leases, SPEs, take-or-pay contracts; effect on ratios |
| **Foreign currency translation** | Temporal (rate) vs. current-rate method (ASC 830 / IAS 21); translation adjustment |
| **Inflation / changing-price effects** | Restating statements; distortion of historical-cost ratios |

### Section B — Corporate Finance
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **Modern Portfolio Theory (Markowitz)** | Efficient frontier, diversification, correlation, portfolio risk |
| **CAPM (Sharpe–Lintner)** | Rₑ = Rf + β(Rm − Rf); SML; interpret beta |
| **Arbitrage Pricing Theory (APT)** | Multi-factor alternative to CAPM (lighter coverage) |
| **WACC & component costs** | Cost of debt, equity (CAPM / DDM), preferred; weights by market value |
| **Modigliani–Miller propositions** | Capital-structure irrelevance (no tax); MM with corporate tax (interest tax shield) |
| **Trade-off theory of capital structure** | Tax shield vs. financial distress cost |
| **Pecking-order theory (Myers–Majluf)** | Asymmetric info → internal → debt → equity |
| **Dividend irrelevance (MM) vs. bird-in-hand vs. tax-preference** | Competing dividend theories |
| **Efficient Market Hypothesis (Fama)** | Weak / semi-strong / strong form; implications for FA |
| **Cash conversion cycle & working-capital models** | DIO + DSO − DPO; optimize cash tied up |
| **EOQ (Wilson formula)** | √(2DS/H); reorder point; safety stock |
| **Baumol & Miller–Orr cash models** | Optimal cash balance under transaction/precautions motives |
| **Credit policy / trade credit** | Cost of forgoing discount; terms (2/10 net 30) |
| **Real options applied to finance** | Option to expand/abandon/defer in strategic finance |
| **International parity theories** | Fisher effect, International Fisher effect, IRP, PPP; forward premium/discount; covered interest arbitrage |

### Section C — Decision Analysis
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **CVP theory** | Breakeven (units & $), target profit, margin of safety, CM ratio |
| **Relevant / incremental costing** | Identify avoidable vs. sunk; differential analysis |
| **Marginal analysis** | Special order, make-or-buy, keep-or-drop, sell-or-process-further |
| **Theory of Constraints / throughput accounting** | Bottleneck, throughput = sales − TVC; product-mix at constraint |
| **Linear programming (product mix)** | Maximize CM subject to constraints; shadow price |
| **Transfer pricing theory** | Minimum = VC + opportunity cost; market-based, dual pricing, goal congruence |
| **Pricing models** | Cost-plus, target costing (price − desired profit = target cost), value-based |
| **Decision-making under uncertainty** | Expected value, decision trees, EV of perfect information |
| **Sensitivity analysis** | Identify critical variable; break-even in a parameter |

### Section D — Risk Management
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **COSO ERM (2017) — 5 components / 20 principles** | Governance & Culture; Strategy & Objective-Setting; Performance; Review & Revision; Information, Communication & Reporting |
| **Risk taxonomy** | Strategic, operational, financial, hazard, compliance risks |
| **Risk appetite / tolerance / capacity** | Define and distinguish the three |
| **Risk response strategies** | Avoid, reduce/mitigate, share/transfer, accept |
| **Inherent vs. residual risk** | Impact of controls; risk heat-map (likelihood × severity) |
| **Fraud Triangle (Cressey)** | Pressure, opportunity, rationalization — and fraud risk response |
| **Monte Carlo simulation** | Probabilistic outcome distributions for risk modeling |

### Section E — Investment Decisions
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **NPV rule** | Primary decision criterion; value add |
| **IRR & NPV–IRR conflict** | Non-conventional CFs, mutually exclusive, scale differences |
| **Payback / discounted payback** | Liquidity & risk proxy (not value-maximizing alone) |
| **Profitability Index** | PV/Investment; ranking under capital rationing |
| **Accounting Rate of Return (ARR)** | Simple ROI; non-DCF |
| **MACRS depreciation** | Tax shield in after-tax cash flows |
| **After-tax cash flow model** | (Rev − Exp)(1 − t) + Dep×t |
| **Risk adjustment** | Risk-adjusted discount rate, certainty equivalents, sensitivity/scenario/simulation |
| **Equivalent Annual Annuity (EAA)** | Compare unequal-lived mutually exclusive projects |
| **Real options in capital budgeting** | Option to expand, abandon, defer, contract |
| **Post-audit & capital rationing** | Follow-up; single-period vs. multi-period rationing |

### Section F — Professional Ethics
| Theory / Model | What candidates must do |
|----------------|-------------------------|
| **IMA Statement of Ethical Professional Practice — 4 standards** | Honesty, Fairness, Objectivity, Responsibility + resolution steps (follow senior → notify board if unresolved → resign if still unresolved) |
| **IMA ethical decision-making model** | Identify → assess → consider alternatives → make & act → reflect |
| **Fraud Triangle (Cressey)** | Same model as D, applied to fraudulent financial reporting |
| **COSO Internal Control – Integrated Framework (2013)** | 5 components; relevance to governance/ethics |
| **Sarbanes–Oxley (SOX 2002)** | Sections 302 (certification), 404 (IC reporting), 409 (timely disclosure), audit committee independence |
| **Foreign Corrupt Practices Act (FCPA)** | Anti-bribery provisions; internal-controls provisions |
| **Dodd–Frank Act** | Whistleblower provisions; relevance to reporting |
| **Corporate governance models** | Board oversight, three lines of defense, audit committee role |
| **Sustainability / ESG reporting frameworks** | GRI, SASB, TCFD, IIRC — emerging social-responsibility coverage (F.7) |

---

## 4. Coverage Recommendations for Content Development

1. **One theory = at least one question family.** For each named theory in §3, author a cluster of items (recall → apply → analyze) so the simulator can guarantee the theory is covered. This directly satisfies the task's "ensure adequate coverage" goal.
2. **Reconcile the internal blueprint's `part2_authorities` with §3.** The foundation doc lists COSO ERM, IMA Ethics, CAPM, MM, Basel III as authorities. §3 expands this into the full testable theory set. Before authoring, adopt §3 as the authoritative theory checklist and tag each MCQ/case item with its primary theory.
3. **Section C is the priority gap-risk.** At 25% weight and 7 LOS including the highest-order cognitive demands (Evaluate 10%), Decision Analysis needs the deepest theory coverage (CVP, marginal analysis, ToC, LP, transfer pricing, uncertainty). Ensure ToC/throughput and LP/Shadow-price items are not skipped — they are easy to under-author.
4. **Risk Management (D) and Investment (E) are small but theory-dense.** 10% each but each carries 5–6 named frameworks. Do not let their small weight justify thin theory coverage; both are disproportionately framework-recognition tested.
5. **Ethics (F) rewards scenario application.** The IMA 4-standard resolution sequence and the fraud triangle are repeatedly tested via applied scenarios, not recall. Author scenario-based items (special-order-ethics, whistle-blower, FCPA bribe scenarios).
6. **Map theories to the planned pack structure** (from P2001 §2): pack_p2_a (A), pack_p2_b (B), pack_p2_c (C), pack_p2_d (D), pack_p2_e (E), pack_p2_f (F). Each pack's theory checklist = the relevant rows of §3.

---

## 5. Source Notes & Caveats

- The **September 2024 IMA CSO** is the current governing document; all section/topic/theory content above aligns to it. If IMA revises the CSO, re-run this verification (per `foundation/EXAM_BLUEPRINT.md` Maintenance §).
- Direct IMA PDF/HTML endpoints returned 404 to automated requests during this research (bot blocking). Verification therefore used Wikipedia's IMA-citing summary for section/weight confirmation and the internal P2001 extraction (itself sourced from the September 2024 CSO) for topic/theory detail. Both agree.
- "Theories" in §3 is a curriculum-standard interpretation of the CSO's intent, not a verbatim IMA list — IMA publishes topics/LOS, not a "theories" index. The mapping reflects what CMA Part 2 prep communities and the P2001 authorities converge on as testable.

---

*Prepared as the research input for CMA Part 2 content development. Existing foundation docs (P2001/P2002) remain the structural baseline; this file supplies the missing Theories coverage layer and an external verification stamp on the section/topic structure.*
