# CMA Part 1 — Sections, Topics & Theories Coverage Review

**Status:** Research + coverage review complete (read-only) — input to content development and bank hardening
**Date:** 2026-08-02
**Authoritative source:** IMA CMA Part 1 Content Specification Outline (CSO), effective **September 2024** ("Part 1 – Financial Planning, Performance, and Analytics")
**External cross-verification:** Wikipedia "Certified Management Accountant" (cites IMA) — Part 1 section names and weights reproduced verbatim and match below.
**Internal baselines used:**
- `foundation/EXAM_BLUEPRINT.md` (Part 1 domain/topic master reference, v1.0)
- The live simulator item bank: `content/packs/pack_a..e_corrected.js` (2,545 MCQs) + `content/cases/case_pack_1..3_corrected.js` (75 case items) — scanned programmatically for actual coverage (see §4).

---

## 0. Purpose & Method

The task is to establish, *before further content work*, the full universe of what the CMA Part 1 exam tests — at three levels — **and** to review the existing simulator bank against it, so a student using the software is *extremely well prepared*.

1. **Sections** (the 6 exam content areas and their weights)
2. **Topics** (the Learning Outcome Statements / subtopics within each section)
3. **Theories** (named models, frameworks, laws, and conceptual theories a candidate must *recognize and apply*)

Method: (a) the internal `EXAM_BLUEPRINT.md` was treated as the working hypothesis; (b) section names and weights were cross-checked against an independent source (Wikipedia, which cites IMA directly) — confirmed identical; (c) the Theories layer was built from the IMA CSO intent plus standard CMA Part 1 curriculum coverage; (d) the live bank was parsed with Node (`reports/p1_coverage_scan.js`, `reports/p1_theory_coverage_scan.js`) to measure *actual* coverage vs. the intended universe.

**Verification result:** Part 1 section names and percentage weights are confirmed correct against IMA's published CSO (15 / 20 / 20 / 15 / 15 / 15 = 100%). The live bank's **section distribution matches the IMA weights closely** (see §4.1). Gaps exist in *difficulty*, *cognitive-level mix*, and a set of *specific theory topics* — detailed in §4.

---

## 1. Sections & Exam Weights (VERIFIED)

| Section | Name | Exam Weight | Live-bank MCQ count | Live-bank share |
|---------|------|------------:|--------------------:|---------------:|
| A | External Financial Reporting Decisions | 15% | 374 | 14.7% |
| B | Planning, Budgeting, and Forecasting | 20% | 501 | 19.7% |
| C | Performance Management | 20% | 501 | 19.7% |
| D | Cost Management | 15% | 377 | 14.8% |
| E | Internal Controls | 15% | 416 | 16.3% |
| F | Technology and Analytics | 15% | 375 | 14.7% |
| **Total** | | **100%** | **2,545** | **100%** |

Part 1 is formally titled **"Financial Planning, Performance, and Analytics."** It is the broader, more conceptual of the two parts (financial reporting, budgeting, variance analysis, costing, controls, and now technology/analytics).

> Note: Section E (Internal Controls) shows a slight *over*-weight (16.3% vs. 15%) because the bank folds Technology-controls items (COSO IC, IT GC) into E in places; Section F (Technology) is correspondingly slightly under. Both are within tolerance.

---

## 2. Topics by Section (LOS breakdown, CSO-aligned)

### Section A — External Financial Reporting Decisions (15%)
- A.1 Financial statements: balance sheet, income statement, statement of changes in equity, statement of cash flows
- A.2 Recognition, measurement, valuation, and disclosure:
  - A.2.1 Revenue recognition (ASC 606 five-step)
  - A.2.2 Inventory valuation (FIFO / LIFO / weighted-average; LCM)
  - A.2.3 Long-lived asset valuation (cost model, revaluation, depreciation, impairment ASC 360)
  - A.2.4 Intangible assets (amortization vs. impairment, development costs)
  - A.2.5 Liabilities (bonds, leases, pensions, warranties; effective-interest amortization)
  - A.2.6 Foreign currency transactions and translation (temporal vs. current-rate)
  - A.2.7 Income taxes (deferred tax, temporary differences, valuation allowance)
  - A.2.8 Leases (ASC 842 — operating vs. finance, right-of-use, lease classification)
  - A.2.9 Financial statement disclosures and notes
  - A.2.10 Accounting changes, estimates, and error corrections
- A.3 Equity investments, business combinations, consolidated financial statements (equity method, acquisition method, goodwill, non-controlling interest)
- A.4 Earnings per share (basic vs. diluted; treasury / if-converted methods)
- A.5 Integrated reporting / non-GAAP measures (lighter coverage)

### Section B — Planning, Budgeting, and Forecasting (20%)
- B.1 Strategic planning: mission/vision, SWOT, PESTLE, Porter's five forces, strategic objectives
- B.2 Budgeting concepts: master budget, operating vs. financial budgets, types (zero-based, activity-based, continuous/rolling, kaizen)
- B.3 Forecasting techniques:
  - Qualitative: Delphi, market research, panel/seniority consensus, naive
  - Quantitative: regression/least-squares, time-series (moving average, exponential smoothing, trend, seasonality), learning curve, expected value
- B.4 Annual profit plan and supporting schedules: sales → production → direct materials/labor → MOH → COGS → SG&A → cash budget
- B.5 Responsibility-center budgeting and top-level planning (top-down vs. bottom-up)
- B.6 Flexible budgets and variance analysis: static vs. flexible; sales-volume variance; capacity concepts (theoretical / practical / normal / expected)

### Section C — Performance Management (20%)
- C.1 Cost and variance measures: standard costing; DM/DL price-rate & quantity-efficiency variances; four-way overhead (variable/fixed × spending/efficiency); mix & yield variances
- C.2 Responsibility centers: cost / revenue / profit / investment centers; controllable vs. noncontrollable costs
- C.3 Performance measures: ROI (DuPont decomposition), residual income (RI), economic value added (EVA); segment margin; transfer pricing (market / cost / negotiated / dual-rate; goal congruence; multinational)
- C.4 Balanced scorecard & other measures: four perspectives, leading vs. lagging indicators, strategy map; benchmarking (types & process); quality measures
- C.5 Management by exception & statistical control limits for variance investigation
- C.6 Product/customer profitability analysis (ABC-based, CLV, cross-subsidization)

### Section D — Cost Management (15%)
- D.1 Measurement concepts: cost objects, cost behavior (fixed/var/mixed/step), relevant range, product vs. period, direct/indirect, opportunity vs. sunk
- D.2 Costing systems: job-order; process costing (equivalent units — weighted-average & FIFO; transferred-in); operation costing; activity-based costing (pools, drivers, hierarchy)
- D.3 Overhead allocation: plantwide vs. departmental vs. multiple rates; service-department allocation (direct / step-down / reciprocal); cost drivers; unused capacity
- D.4 Supply-chain & process improvement: JIT, lean, theory of constraints / throughput accounting, value chain, benchmarking, quality (COQ)
- D.5 Joint products & byproducts: physical-units, relative-sales-value, NRV allocation; sell-or-process-further
- D.6 CVP analysis: breakeven (units/$), contribution margin, target profit, margin of safety, degree of operating leverage, multi-product
- D.7 Relevant/differential costing: make-or-buy, special order, keep-or-drop, sell-or-process-further, constrained resources
- D.8 Absorption vs. variable vs. throughput costing (income reconciliation)
- D.9 Life-cycle / target / kaizen costing; backflush costing

### Section E — Internal Controls (15%)
- E.1 Governance, risk, and internal controls: corporate governance; ERM; definition of internal control; three lines of defense
- E.2 COSO Internal Control — Integrated Framework (2013): 5 components (Control Environment; Risk Assessment; Control Activities; Information & Communication; Monitoring)
- E.3 Control activities: authorization, segregation of duties, safeguarding assets, independent verification, reconciliation, physical controls
- E.4 Information-technology controls: IT general controls vs. application controls; cybersecurity (CIA triad); data governance
- E.5 Fraud risk management: fraud triangle (Cressey); prevention & detection; SOX (302/404); ICFR; audit committee; whistleblower programs
- E.6 Monitoring: internal audit function; continuous monitoring/auditing; external auditing role

### Section F — Technology and Analytics (15%)
- F.1 Information systems: ERP; systems-development lifecycle; databases & master data management
- F.2 Data governance: data-quality dimensions; data protection / privacy regulations (GDPR, CCPA); data mining
- F.3 Data analytics: descriptive / diagnostic / predictive / prescriptive; data visualization; big-data concepts
- F.4 Cloud computing & emerging tech: cloud risks/controls; blockchain/distributed ledger; IoT
- F.5 Artificial intelligence & automation: machine learning, RPA, cognitive computing; AI governance & ethics

---

## 3. Theories, Models & Frameworks by Section (THE COVERAGE LAYER)

This is the layer `EXAM_BLUEPRINT.md` only sketches. Every named theory below is fair game on the exam and should be touched by at least one item family per pack. The "Live hits" column is the actual keyword-match count across all 2,620 scanned P1 items (MCQ + case), from `p1_theory_coverage_out.json`.

### Section A — External Financial Reporting Decisions
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **ASC 606 revenue recognition (5-step)** | Identify contract → performance obligations → price → allocate → recognize | 56 |
| **Inventory cost-flow assumptions** (FIFO/LIFO/weighted-avg) | Compute COGS/ending inventory under each; understand LIFO reserve | 95 |
| **Lower of cost or market (LCM)** | Apply ceiling/floor; write-down journal entry | 12 |
| **Depreciation methods** (SL/units/DDB) | Compute & contrast; partial-year | 34 |
| **Impairment (ASC 360)** | Recoverability test; impairment loss | 36 |
| **Lease accounting (ASC 842)** | Classify operating vs. finance; ROU asset/liability | 45 |
| **Bond effective-interest amortization** | Amortize discount/premium; interest expense | 13 |
| **Equity method / consolidation / goodwill** | Apply equity method; business-combo mechanics | 109 |
| **Cash-flow statement (indirect/direct)** | Convert net income → operating; classify investing/financing | 134 |
| **EPS (basic/diluted)** | Treasury & if-converted methods | 18 |

### Section B — Planning, Budgeting, and Forecasting
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **Strategic frameworks** (SWOT/PESTLE/Porter) | Situational diagnosis inputs to planning | 14 |
| **Master/operating/financial budget sequencing** | Build the interlocking budget schedule | 295 |
| **ZBB / ABB / rolling & continuous budgeting** | Contrast budgeting philosophies | 112 |
| **Regression / least-squares forecasting** | Compute slope/intercept; R² interpretation | 53 |
| **Time-series forecasting** (moving avg, exp smoothing, seasonal, trend) | Project from history | 70 |
| **Delphi / naive / causal / leading-indicator** | Choose qualitative/causal method | 35 |
| **Learning-curve theory** (cumulative-avg 80%, incremental-unit) | Project labor hours/cost | 29 |
| **Flexible-budget variance model** | Static→flexible; price/volume split | 145 |
| **Capacity concepts** (theoretical/practical/normal/expected) | Idle/used capacity costing | 9 |
| **Expected-value decision-making** | EV of alternatives under uncertainty | (folded into B.3) |

### Section C — Performance Management
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **Standard-costing & variance framework** | Price/rate × quantity/efficiency | 240 |
| **Four-way overhead variance** (VOH/FOH × spending/efficiency/volume) | Decompose overhead | 162 |
| **Sales variances** (price/volume/mix/market-share/market-size) | Decompose revenue gaps | 41 |
| **Responsibility-center theory** | Classify; evaluate on controllables | 91 |
| **ROI / RI / EVA + DuPont** | Decompose ROI; compare metrics; goal congruence | 105 |
| **Transfer-pricing theory** | Market/cost/negotiated/dual; general rule | 78 |
| **Balanced Scorecard** (4 perspectives, strategy map) | Map measures; leading vs. lagging | 77 |
| **Benchmarking** (types & process) | Internal/external/competitive; limitations | 138 |
| **Management by exception / control limits** | Statistical investigation triggers | 62 |

### Section D — Cost Management
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **Cost-behavior models** (fixed/var/mixed/step, relevant range) | Classify; predict | 219 |
| **Cost estimation** (high-low/regression/account/engineering/scatter) | Derive cost function | 37 |
| **Job-order vs. process costing** (WA/FIFO equiv units) | Assign costs; transferred-in | 66 |
| **Activity-based costing** (pools/drivers/hierarchy) | Allocate; compare to traditional | 104 |
| **Joint-product / byproduct allocation** (physical/sales-value/NRV) | Allocate; sell-or-process | 27 |
| **Service-dept allocation** (direct/step-down/reciprocal) | Allocate reciprocal costs | 41 |
| **Overhead application** (plantwide/departmental/multiple) | Predetermined rate; over/underapplied | 59 |
| **Absorption vs. variable vs. throughput** | Reconcile income; understand distortions | 36 |
| **CVP theory** (breakeven/target/MOS/DOL/multi-product) | Solve and interpret | 144 |
| **Relevant/differential costing** (make-or-buy/special/keep-drop/sell-process) | Identify avoidable vs. sunk | 59 |
| **Theory of Constraints / throughput accounting** | Exploit bottleneck; product mix at constraint | 113 |

### Section E — Internal Controls
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **COSO IC 2013 (5 components)** | Map scenario → component | 434 |
| **COSO ERM 2017** (components/principles) | Risk appetite/tolerance; integrate w/ strategy | 259 |
| **Segregation of duties / control activities** | Identify missing/weak controls | 227 |
| **Fraud triangle (Cressey)** | Diagnose fraud risk; respond | 189 |
| **SOX (302/404) / ICFR / audit committee** | Know requirements & governance | 123 |
| **Three lines of defense / internal audit** | Place the function | 128 |
| **IT GC vs. application controls / cybersecurity CIA** | Classify controls; CIA triad | 223 |

### Section F — Technology and Analytics
| Theory / Model | What candidates must do | Live hits |
|----------------|------------------------|----------:|
| **Information systems / ERP lifecycle** | SDLC; ERP architecture | 339 |
| **Data governance / data-quality dimensions** | Assess quality; MDM | 87 |
| **Data-analytics types** (descriptive/diagnostic/predictive/prescriptive) | Classify analytics | 47 |
| **AI / ML / RPA** | Know capabilities & risks | 74 |
| **Cloud / blockchain** | Risks & controls | 46 |
| **Privacy regs (GDPR/CCPA)** | Compliance obligations | 26 |

---

## 4. Live-Bank Coverage Review (evidence-based)

Scans run: `reports/p1_coverage_scan.js` (2,545 MCQs) and `reports/p1_theory_coverage_scan.js` (2,620 items incl. 75 case items).

### 4.1 Section distribution — ✅ strong
Matches IMA weights within ~1 point per section (see §1 table). No section is materially under- or over-built.

### 4.2 Certification state — ✅ strong, one hygiene flag
- Certified: 2,451 (96.3%)
- Archived: 70 (2.8%)
- Unprocessed: 24 (0.9%)

**Flag:** 24 items are still `Unprocessed` and therefore *excluded* from the learner delivery pool (per `CURRENT_BASELINES.md` rule — only `Certified` items deliver). For "extremely well prepared," either certify or formally retire these 24 so the pool is fully intentional.

**Flag (data hygiene):** 1 item carries `Section: "?"` (orphan, no section). It should be re-tagged or removed.

### 4.3 Cognitive-level mix — ⚠️ higher-order under-built vs. blueprint
| Level | Blueprint target | Actual | Gap |
|-------|----------------:|-------:|----:|
| Remember | 20% | 3.8% | −16.2 (intentional: low-value recall deprioritized) |
| Understand | 25% | 39.6% | +14.6 |
| Apply | 35% | 42.7% | +7.7 |
| Analyze | 20% | 7.4% | **−12.6** |
| Evaluate | (within Analysis/Eval) | 6.6% | low |

**Finding:** The bank is strong on Apply/Understand but **thin on Analyze (7.4% vs. 20% target)** and Evaluate. The blueprint explicitly favors Application + Analysis. To make a student "extremely well prepared," add ~300+ Analyze-level and ~150+ Evaluate-level items (decomposition, cause-effect, trade-off, scenario-judgment) — especially in Sections C (variances/transfer pricing) and D (relevant costing/ToC).

### 4.4 Difficulty mix — ⚠️ bank is easier than blueprint targets
| Difficulty | Blueprint target | Actual | Gap |
|-----------|----------------:|-------:|----:|
| Easy | 15% | 20.7% | +5.7 |
| Moderate | 45% | 40.0% (Moderate) + 21.2% (Moderate-Easy) ≈ 61% | +16 |
| Difficult | 30% | 17.0% | **−13** |
| Very Difficult | 10% | 1.0% | **−9** |

**Finding:** `Very Difficult` is only 1% (26 items) vs. the 10% target (≈255 items). `Difficult` is also under. The real CMA exam's hardest items are the differentiators; a bank that tops out at "Moderate" will not prepare a student for the top band of exam difficulty. Author a dedicated Very-Difficult wave (multi-step, multi-concept, layered distractors) concentrated in A (consolidations/leases/bonds), C (four-way overhead + transfer pricing + BSC trade-offs), and D (process costing + ToC + relevant costing integrations).

### 4.5 Theory-thin spots — specific topics needing more items
Ordered by live-hit count (lowest first = weakest coverage for a core topic):

| Theory | Hits | Note |
|--------|-----:|------|
| Capacity concepts (theoretical/practical/normal/expected) | 9 | Core B.6 topic; surprisingly thin |
| LCM / lower of cost or market | 12 | Classic A inventory testable |
| Bond effective-interest amortization | 13 | Heavily tested on real exam; under-built |
| Strategic-planning frameworks (SWOT/PESTLE/Porter) | 14 | Minor in P1 but should exist |
| EPS basic/diluted | 18 | Frequently tested; thin |
| Privacy regs (GDPR/CCPA) | 26 | Emerging F.2 topic |
| Joint products/byproducts | 27 | D.5; allocate + sell-or-process |
| Learning-curve theory | 29 | Tested; moderate |
| Cost estimation (high-low/regression) | 37 | D.1; foundational |
| Impairment (ASC 360) | 36 | A.2.3 |
| Absorption vs. variable vs. throughput | 36 | D.8; high-value reconciliation topic |

All other theories in §3 have 40+ hits and are adequately covered.

### 4.6 LOS-tag data hygiene — ⚠️ fragmentation hurts coverage tracking
`EXAM_BLUEPRINT.md` mandates clean LOS tags for coverage tracking, but the live bank has **304 distinct LOS-tag strings with duplicate/garbled variants**, including:
- UTF-8 mojibake: `COSO Internal Control â€” Integrated Framework` vs. `COSO Internal Control — Integrated Framework`; `Control Activities â€” Authorization` (the latter also shows `***`, an obvious data artifact).
- Inconsistent formats: some items use `A.1 Financial statements`, others `Part 1 Section A.1`, others free-text `A Financial reporting`.

**Finding:** The fragmented/mojibake tags make automated coverage tracking unreliable and can mask real gaps. Normalizing LOS tags to a single canonical scheme (e.g., `P1-A.2.1`) is a prerequisite for trustworthy gap monitoring and should be done before the next authoring wave.

---

## 5. Recommendations to Ensure "Extremely Well Prepared"

1. **One theory = at least one question family.** Adopt §3 as the authoritative theory checklist; tag every MCQ/case item with its primary theory so coverage is verifiable cluster-by-cluster.
2. **Close the difficulty gap (highest priority for "extremely well prepared").** Author a dedicated **Very-Difficult wave (~230 items)** and a **Difficult top-up (~330 items)** in A/C/D. Target: lift Very-Difficult to ~8–10% and Difficult to ~28–30%, matching the blueprint.
3. **Lift higher-order cognition.** Add ~300 Analyze + ~150 Evaluate items, concentrated in C (variance decomposition, transfer-pricing trade-offs, BSC judgment) and D (relevant-costing scenarios, ToC product-mix, absorption/variable reconciliation). Target Analyze ≈ 18–20%.
4. **Backfill the 11 theory-thin topics in §4.5** (capacity concepts, LCM, bond amortization, EPS, joint products, learning curve, cost estimation, impairment, absorption/variable/throughput, privacy regs, strategic frameworks) to a minimum of ~30 hits each.
5. **Certify or retire the 24 `Unprocessed` items** and **re-tag the 1 orphan `Section:"?"` item** so the delivery pool is fully intentional and 100% Certified-eligible.
6. **Normalize LOS tags** to a canonical `P1-<Section>.<n>` scheme and strip mojibake (`â€"` → `—`) before the next wave; this is required for trustworthy coverage tracking.
7. **Keep section weights as-is** — they already match IMA within tolerance; no rebalancing needed.
8. **Map theories to the existing pack structure:** pack_a→A, pack_b→B, pack_c→C, pack_d→D, pack_e→E+F (as now). Each pack's theory checklist = the relevant rows of §3.

---

## 6. Source Notes & Caveats

- The **September 2024 IMA CSO** is the current governing document; all section/topic/theory content aligns to it. If IMA revises the CSO, re-run this verification (per `foundation/EXAM_BLUEPRINT.md` Maintenance §).
- Direct IMA PDF/HTML endpoints returned 404 to automated requests during research (bot blocking). Verification therefore used Wikipedia's IMA-citing summary for section/weight confirmation and the internal `EXAM_BLUEPRINT.md` + the live-bank LOS enumeration for topic/theory detail. All three agree on section structure and weights.
- "Theories" in §3 is a curriculum-standard interpretation of the CSO's intent, not a verbatim IMA list — IMA publishes topics/LOS, not a "theories" index. The mapping reflects what CMA Part 1 prep communities and the internal blueprint converge on as testable.
- The live-bank scan figures in §3/§4 are **keyword-match approximations** (one theory can appear in several items; one item can touch several theories). They are reliable for *relative* gap ranking, not exact counts. The `Section`/`CognitiveLevel`/`Difficulty`/`question_state` figures in §4 are exact (parsed directly from the source arrays).

---

*Prepared as the research + coverage-review input for CMA Part 1 content hardening. `foundation/EXAM_BLUEPRINT.md` remains the structural baseline; this file supplies (a) the missing Theories coverage layer and (b) an evidence-based review of the existing 2,545-item bank against the exam universe, with prioritized actions to bring a student to "extremely well prepared."*
