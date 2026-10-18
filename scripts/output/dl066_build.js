// Builds scripts/output/dl066_corrected_solutions.json for the DL-066 hand-solve.
// Prompts, choices, and match items are pulled EXACTLY from dl066_case_extract.json
// (which was produced without any Correct fields). Only derived values/notes are
// authored here.
const fs = require('fs');

const cases = JSON.parse(fs.readFileSync('scripts/output/dl066_case_extract.json', 'utf8'));

// Solutions keyed by ItemID.
//   sel   : 0-based index into Choices
//   multi : array of 0-based indices into Choices (converted to 1-based)
//   match : { leftIndex: rightIndex }
//   val   : numeric value (number) or fill string
const S = {
  // ---------------- CBQ-C2 (bank 1) ----------------
  'CBQ-C2-Q1': { kind: 'val', v: 84000, n: 'RI = 420,000 - (12% x 2,800,000) = 420,000 - 336,000 = 84,000.' },
  'CBQ-C2-Q2': { kind: 'val', v: 15, n: 'ROI = 420,000 / 2,800,000 = 0.15 = 15 (whole-number percent).' },
  'CBQ-C2-Q3': { kind: 'sel', i: 2, n: 'Min transfer price = variable cost 70 + opportunity cost 0 (idle capacity) = 70.' },
  'CBQ-C2-Q4': { kind: 'multi', idx: [0, 1, 3], n: 'Correct: encourages projects above required return; charges for assets; avoids rejecting ROI-lowering value projects. "Always increases with assets" is false.' },
  'CBQ-C2-Q5': { kind: 'val', v: 'congruence', n: 'A transfer price should promote goal congruence.' },
  'CBQ-C2-Q6': { kind: 'match', m: { 0: 5, 1: 4, 2: 3, 3: 2 }, n: 'ROI -> operating income / assets; RI -> income after required asset charge; min TP idle -> variable cost + opportunity cost; market price -> external benchmark.' },

  // ---------------- CBQ-C3 (bank 1) ----------------
  'CBQ-C3-Q1': { kind: 'val', v: 60000, n: 'Unfavorable OI variance = 900,000 - 840,000 = 60,000 (positive as instructed).' },
  'CBQ-C3-Q2': { kind: 'val', v: 5, n: 'On-time shortfall = 96% - 91% = 5 percentage points.' },
  'CBQ-C3-Q3': { kind: 'sel', i: 2, n: 'Training hours per employee is the Learning & Growth measure.' },
  'CBQ-C3-Q4': { kind: 'multi', idx: [0, 1, 2], n: 'Leading indicators: defect rate, on-time delivery, training hours. Prior-period operating income is lagging.' },
  'CBQ-C3-Q5': { kind: 'match', m: { 0: 2, 1: 4, 2: 1, 3: 5 }, n: 'Financial -> operating income; Customer -> customer satisfaction index; Internal process -> defect rate; Learning & growth -> training hours.' },
  'CBQ-C3-Q6': { kind: 'sel', i: 3, n: 'Machine setup errors fall within production\'s span of control.' },

  // ---------------- CBQ-D2 (bank 1) ----------------
  'CBQ-D2-Q1': { kind: 'val', v: 20400, n: 'EU conversion = 18,000 + (4,000 x 60%) = 20,400.' },
  'CBQ-D2-Q2': { kind: 'val', v: 12.5, n: '255,000 / 20,400 = 12.50 per equivalent unit.' },
  'CBQ-D2-Q3': { kind: 'sel', i: 1, n: 'Welding capacity 19,500 is the lowest, hence the bottleneck.' },
  'CBQ-D2-Q4': { kind: 'multi', idx: [0, 2, 3], n: 'Lean actions: reduce waiting, investigate rework, simplify material movement. Increasing batch queues contradicts lean.' },
  'CBQ-D2-Q5': { kind: 'val', v: 'complete', n: 'Equivalent units express partial work in terms of complete units.' },
  'CBQ-D2-Q6': { kind: 'match', m: { 0: 3, 1: 5, 2: 1, 3: 2 }, n: 'Partially complete WIP -> equivalent units; lowest capacity resource -> bottleneck analysis; unnecessary movement -> lean waste review; continuous homogeneous output -> process costing. NOTE: item Explanation references a different set of RightItems labels (likely a rotation/template mismatch) — mapping derived from the actual LeftItems/RightItems content.' },

  // ---------------- CBQ-E1 (bank 1) ----------------
  'CBQ-E1-Q1': { kind: 'sel', i: 0, n: 'Same clerk creating vendors and entering invoices is the segregation failure enabling fictitious vendors.' },
  'CBQ-E1-Q2': { kind: 'multi', idx: [0, 1, 3], n: 'Correct: independent vendor approval, preventive three-way match, documented duplicate-report review. Post-payment high-dollar-only approval is a weaker design.' },
  'CBQ-E1-Q3': { kind: 'val', v: 3.0, n: '180,000 / 6,000,000 = 0.03 = 3.0% of pretax income.' },
  'CBQ-E1-Q4': { kind: 'val', v: 'absolute', n: 'Internal control provides reasonable, not absolute, assurance.' },
  'CBQ-E1-Q5': { kind: 'match', m: { 0: 1, 1: 0, 2: 5, 3: 2 }, n: 'Vendor approval -> preventive (stops unauthorized vendors); three-way match -> preventive (blocks improper payment); duplicate report review -> detective (after disbursement); bank reconciliation -> detective.' },
  'CBQ-E1-Q6': { kind: 'sel', i: 0, n: 'Generated but unreviewed for two months is definitive evidence of non-performance.' },

  // ---------------- CBQ-E2 (bank 1) ----------------
  'CBQ-E2-Q1': { kind: 'sel', i: 2, n: 'Unique privileged IDs with MFA and periodic access review restores accountability.' },
  'CBQ-E2-Q2': { kind: 'val', v: 3.5, n: '12 / 340 = 3.529% -> 3.5%.' },
  'CBQ-E2-Q3': { kind: 'multi', idx: [0, 1, 2], n: 'Logical access, change management, and computer operations/interface monitoring are ITGCs. Sales price variance analysis is not.' },
  'CBQ-E2-Q4': { kind: 'val', v: 'approval', n: 'Emergency changes require post-implementation review and approval.' },
  'CBQ-E2-Q5': { kind: 'match', m: { 0: 1, 1: 0, 2: 3, 3: 4 }, n: 'Shared IDs -> lack of accountability; terminated users -> unauthorized access; unapproved emergency changes -> unauthorized/erroneous report logic; failed interface reconciliation -> incomplete/inaccurate data transfer.' },
  'CBQ-E2-Q6': { kind: 'sel', i: 3, n: '14-day retention may prevent investigation once logs are overwritten.' },

  // ---------------- CBQ2-F1 (bank 1) ----------------
  'CBQ2-F1-Q1': { kind: 'sel', i: 0, n: 'Historical variance reporting = descriptive analytics.' },
  'CBQ2-F1-Q2': { kind: 'sel', i: 0, n: 'Real-time drill-down dashboard enables diagnostic analytics.' },
  'CBQ2-F1-Q3': { kind: 'sel', i: 0, n: 'Forecasting next-quarter revenue = predictive analytics.' },
  'CBQ2-F1-Q4': { kind: 'sel', i: 0, n: 'Recommending optimal actions under constraints = prescriptive analytics.' },
  'CBQ2-F1-Q5': { kind: 'sel', i: 0, n: 'Data governance is the most critical prerequisite.' },

  // ---------------- CBQ2-A3 (bank 2) ----------------
  'CBQ2-A3-Q1': { kind: 'val', v: 363636, n: 'Hardware allocation = (400,000 / 550,000) x 500,000 = 363,636.' },
  'CBQ2-A3-Q2': { kind: 'val', v: 43000, n: '800,000x1% + 300,000x5% + 100,000x20% = 8,000+15,000+20,000 = 43,000.' },
  'CBQ2-A3-Q3': { kind: 'multi', idx: [0, 1], n: 'Distinct if customer can benefit on its own AND promise is separately identifiable. Delivery and payment are consequences, not criteria.' },
  'CBQ2-A3-Q4': { kind: 'sel', i: 2, n: 'Bad debt expense = 43,000 + 5,000 debit = 48,000.' },
  'CBQ2-A3-Q5': { kind: 'val', v: 'balance sheet', n: 'Aging-schedule estimation is the balance sheet approach.' },

  // ---------------- CBQ3-A1 (bank 2) ----------------
  'CBQ3-A1-Q1': { kind: 'val', v: 231660, n: '55,000 x 4.212 (6%, 5 periods) = 231,660.' },
  'CBQ3-A1-Q2': { kind: 'sel', i: 1, n: 'PV 231,660 > 90% x 250,000 = 225,000, so finance lease.' },
  'CBQ3-A1-Q3': { kind: 'val', v: 'right-of-use', n: 'Lessee records a lease liability and a right-of-use asset.' },
  'CBQ3-A1-Q4': { kind: 'val', v: 190560, n: '231,660 - (55,000 - 13,899.6) = 231,660 - 41,100.4 = 190,559.6 -> 190,560.' },
  'CBQ3-A1-Q5': { kind: 'multi', idx: [0, 1, 2], n: 'Finance lease criteria: major part of economic life; PV >= substantially all FV; ownership transfers. "Standard/easily replaced asset" is not a criterion.' },

  // ---------------- CBQ4-A1 (bank 2) ----------------
  'CBQ4-A1-Q1': { kind: 'val', v: 400000, n: 'Goodwill = 2,500,000 - 2,100,000 = 400,000.' },
  'CBQ4-A1-Q2': { kind: 'val', v: 150000, n: 'Impairment = carrying 2,400,000 - fair value 2,250,000 = 150,000.' },
  // Q3 skipped per instruction (known empty-string array artifact).
  'CBQ4-A1-Q4': { kind: 'multi', idx: [0, 1], n: 'Capitalized: successful legal defense costs and registration fees. R&D and admin overhead are expensed.' },
  'CBQ4-A1-Q5': { kind: 'sel', i: 0, n: 'If FV > carrying amount, no impairment and no further testing (simplified one-step test).' },

  // ---------------- CBQ2-B2 (bank 2) ----------------
  'CBQ2-B2-Q1': { kind: 'val', v: 540000, n: '120,000 cash + 240,000 Jan credit + 180,000 Dec credit = 540,000.' },
  'CBQ2-B2-Q2': { kind: 'val', v: 675000, n: '390,000 COGS + 175,000 S&A + 110,000 equipment = 675,000 (depreciation excluded).' },
  'CBQ2-B2-Q3': { kind: 'val', v: -90000, n: '45,000 + 540,000 - 675,000 = -90,000.' },
  'CBQ2-B2-Q4': { kind: 'sel', i: 2, n: 'Deficit 90,000 + minimum 35,000 = 125,000 borrowing.' },
  'CBQ2-B2-Q5': { kind: 'multi', idx: [0, 2, 3], n: 'Higher cash-sales % reduces borrowing (T); +5% on Dec credit = +20,000 (T); 5% of Dec credit = 20,000 uncollectible (T). Deferring equipment still leaves a 15,000 shortfall (F).' },
  'CBQ2-B2-Q6': { kind: 'match', m: { 0: 4, 1: 3, 2: 1, 3: 0 }, n: 'Deficit >100K -> negotiate supplier terms; slower collections -> more credit; discount purchase due Feb -> defer purchase; higher sales -> update collections and COGS.' },

  // ---------------- CBQ3-B2 (bank 2) ----------------
  'CBQ3-B2-Q1': { kind: 'val', v: 264000, n: '8,000 x 1.5 x 22 = 264,000.' },
  'CBQ3-B2-Q2': { kind: 'val', v: 276000, n: '12,000 x 8 = 96,000 variable + 180,000 fixed = 276,000.' },
  'CBQ3-B2-Q3': { kind: 'val', v: 20, n: '8 + (180,000 / 15,000 = 12) = 20 per DLH.' },
  'CBQ3-B2-Q4': { kind: 'sel', i: 1, n: 'Total fixed OH unchanged within relevant range; per-unit fixed OH decreases.' },
  'CBQ3-B2-Q5': { kind: 'multi', idx: [0, 1, 2], n: 'Fixed OH/unit falls with volume; rate set before period; applied OH = rate x actual activity. Variable OH IS in the rate.' },
  'CBQ3-B2-Q6': { kind: 'match', m: { 0: 4, 1: 2, 2: 3, 3: 1 }, n: 'DL budget -> units x DLH/unit x wage; VOH budget -> actual DLH x VOH rate; FOH budget -> constant; applied OH -> predetermined rate x actual activity.' },

  // ---------------- CBQ2-C3 (bank 2) ----------------
  'CBQ2-C3-Q1': { kind: 'sel', i: 0, n: '480,000 / 3,000,000 = 16.0%.' },
  'CBQ2-C3-Q2': { kind: 'sel', i: 0, n: '480,000 - 360,000 = 120,000.' },
  'CBQ2-C3-Q3': { kind: 'sel', i: 0, n: '560,000 / 3,500,000 = 16.0% (project ROI = current ROI).' },
  'CBQ2-C3-Q4': { kind: 'sel', i: 0, n: 'RI contribution = 80,000 - 60,000 = 20,000 > 0, so accept.' },
  'CBQ2-C3-Q5': { kind: 'sel', i: 1, n: 'RI: A = 120,000; B = 50,000; C = 0. Division A best.' },

  // ---------------- CBQ3-C3 (bank 2) ----------------
  'CBQ3-C3-Q1': { kind: 'sel', i: 0, n: 'Flexible OI at 12,000 = 80,000; static = 30,000; volume variance = 50,000 F.' },
  'CBQ3-C3-Q2': { kind: 'sel', i: 0, n: 'Flexible DM = 12,000 x 20 = 240,000; actual 252,000; 12,000 U.' },
  'CBQ3-C3-Q3': { kind: 'multi', idx: [0, 2, 3, 4], n: 'Correct: volume variance favorable; selling price variance 24,000 U; FOH spending 5,000 U; total variable flexible variance 8,000 U. DL variance is 12,000 F, not U.' },
  'CBQ3-C3-Q4': { kind: 'match', m: { 0: 4, 1: 3, 2: 1, 3: 2 }, n: 'Revenue vs flexible -> selling price variance; variable cost flexible vs actual -> flexible budget variable cost variance; static vs flexible OI -> sales volume variance; actual vs budgeted FOH -> FOH spending variance.' },
  'CBQ3-C3-Q5': { kind: 'sel', i: 0, n: 'Flexible budget isolates controllable price/efficiency effects from volume effects.' },

  // ---------------- CBQ4-C1 (bank 2) ----------------
  'CBQ4-C1-Q1': { kind: 'val', v: 1600, n: '31,000 - (9,800 x 3 = 29,400) = 1,600 U.' },
  'CBQ4-C1-Q2': { kind: 'val', v: 600, n: '(9,800 - 9,600) x 3 = 600 U.' },
  'CBQ4-C1-Q3': { kind: 'val', v: 2000, n: '(10,000 - 9,600) x 5 = 2,000 U.' },
  'CBQ4-C1-Q4': { kind: 'val', v: 2000, n: '52,000 - 50,000 = 2,000 U.' },
  'CBQ4-C1-Q5': { kind: 'sel', i: 3, n: 'FOH production-volume variance is never controllable by the supervisor.' },

  // ---------------- CBQ4-E1 (bank 2) ----------------
  'CBQ4-E1-Q1': { kind: 'sel', i: 0, n: 'Inconsistent tone at the middle is a Control Environment deficiency.' },
  'CBQ4-E1-Q2': { kind: 'sel', i: 0, n: 'Principle 9: identify/assess changes impacting internal control (new contracts).' },
  'CBQ4-E1-Q3': { kind: 'sel', i: 0, n: 'Control activities must cover automated and manual levels for all relevant risks.' },
  'CBQ4-E1-Q4': { kind: 'sel', i: 0, n: 'Information & Communication: communicate roles and reporting mechanisms (whistleblower).' },
  'CBQ4-E1-Q5': { kind: 'sel', i: 0, n: 'Monitoring requires both ongoing and separate evaluations.' },

  // ---------------- CBQ4-F1 (bank 2) ----------------
  'CBQ4-F1-Q1': { kind: 'match', m: { 0: 1, 1: 4, 2: 3, 3: 0 }, n: 'HR -> SaaS; custom app platform -> PaaS; raw servers -> IaaS; regulated ERP -> on-premise.' },
  'CBQ4-F1-Q2': { kind: 'sel', i: 0, n: 'IaaS steady-state saves 460,000/yr with 190,000 one-time cost and ~5-month payback.' },
  'CBQ4-F1-Q3': { kind: 'multi', idx: [0, 1, 3, 4], n: 'Valid: retained data responsibility; data residency; SOC 2 reports; vendor lock-in. Cloud does not eliminate internal controls.' },
  'CBQ4-F1-Q4': { kind: 'sel', i: 0, n: 'Treatment depends on cost nature / whether a software license exists; subscriptions expensed, some implementation costs capitalized.' },
  'CBQ4-F1-Q5': { kind: 'match', m: { 0: 1, 1: 0, 2: 4, 3: 2 }, n: 'ERP -> private cloud; R&D sandbox -> public cloud; shared regulated -> community cloud; acquisition -> public cloud (rapid deployment).' },

  // ---------------- CBQ5-A2 (bank 3) ----------------
  'CBQ5-A2-Q1': { kind: 'val', v: 510000, n: '500,000 + (40,000 AFS - 30,000 FX) = 510,000.' },
  'CBQ5-A2-Q2': { kind: 'multi', idx: [0, 1, 2], n: 'OCI: AFS unrealized, FX translation, pension prior service costs. Trading securities go through NI; dividends are not OCI.' },
  'CBQ5-A2-Q3': { kind: 'val', v: 150000, n: '10,000 x 15 = 150,000 reduction to equity.' },
  'CBQ5-A2-Q4': { kind: 'sel', i: 0, n: 'Cost and par-value methods remove the same total dollars from equity.' },
  'CBQ5-A2-Q5': { kind: 'val', v: 'owners', n: 'Comprehensive income excludes investments by and distributions to owners.' },

  // ---------------- CBQ5-B2 (bank 3) ----------------
  'CBQ5-B2-Q1': { kind: 'val', v: 40000, n: '1,000,000 x 8% x 1/2 = 40,000.' },
  'CBQ5-B2-Q2': { kind: 'val', v: 922768, n: '613,900 + (40,000 x 7.7217 = 308,868) = 922,768.' },
  'CBQ5-B2-Q3': { kind: 'val', v: 46138, n: '922,768 x 5% = 46,138.' },
  'CBQ5-B2-Q4': { kind: 'val', v: 928906, n: '922,768 + (46,138 - 40,000 = 6,138) = 928,906.' },
  'CBQ5-B2-Q5': { kind: 'sel', i: 2, n: 'Bond issue costs are deducted from the carrying value of the liability (ASU 2015-03).' },

  // ---------------- CBQ4-B1 (bank 3) ----------------
  'CBQ4-B1-Q1': { kind: 'val', v: 4, n: '(42,000 - 30,000) / (8,000 - 5,000) = 12,000 / 3,000 = 4.' },
  'CBQ4-B1-Q2': { kind: 'val', v: 10000, n: '42,000 - (4 x 8,000) = 10,000.' },
  'CBQ4-B1-Q3': { kind: 'val', v: 38300, n: '11,000 + 3.90 x 7,000 = 38,300.' },
  'CBQ4-B1-Q4': { kind: 'sel', i: 0, n: 'R-squared = proportion of cost variance explained by machine hours = 85%.' },
  'CBQ4-B1-Q5': { kind: 'multi', idx: [0, 1], n: 'High-low uses only two points and is skewed by outliers. It is simple (not complex) and can separate fixed/variable.' },

  // ---------------- CBQ4-B2 (bank 3) ----------------
  'CBQ4-B2-Q1': { kind: 'val', v: 170000, n: '120,000 + 650,000 - 600,000 = 170,000.' },
  'CBQ4-B2-Q2': { kind: 'val', v: 300000, n: '1,000,000 x (28% + 2%) = 300,000 gross A/R.' },
  'CBQ4-B2-Q3': { kind: 'val', v: 130000, n: '650,000 x 20% = 130,000.' },
  'CBQ4-B2-Q4': { kind: 'val', v: 31500, n: '100,000+200,000+700,000-100,000-520,000-140,000-100,000-20,000-15,000-73,500 = 31,500.' },
  'CBQ4-B2-Q5': { kind: 'sel', i: 2, n: 'Inventory is determined by purchases and COGS, not collection assumptions.' },
  'CBQ4-B2-Q6': { kind: 'match', m: { 0: 1, 1: 4, 2: 0, 3: 2 }, n: 'Cash -> cash budget/timing; A/R -> sales budget/collection policy; inventory -> COGS + purchases budgets; A/P -> purchases budget/payment terms.' },

  // ---------------- CBQ4-D3 (bank 3) ----------------
  'CBQ4-D3-Q1': { kind: 'sel', i: 0, n: 'Practical capacity best approximates the cost of unused capacity.' },
  'CBQ4-D3-Q2': { kind: 'sel', i: 0, n: 'Volume variance falls from 500,000 U to 126,667 U (373,333 reduction).' },
  'CBQ4-D3-Q3': { kind: 'multi', idx: [2], n: 'DL-047-suspect item. Only statement 3 (volume variance zero when denominator = actual) is correct; statement 1 wrongly claims theoretical capacity gives the highest rate (it gives the lowest, $38).' },
  'CBQ4-D3-Q4': { kind: 'match', m: { 0: 2, 1: 4, 2: 3, 3: 1 }, n: 'Cutting idle -> reduce unused capacity; Assembly highest -> monitor as potential constraint; Finishing -> defer capital; all -> normal capacity for strategic view.' },
  'CBQ4-D3-Q5': { kind: 'sel', i: 0, n: 'Use practical capacity and disclose unused-capacity cost transparently.' },

  // ---------------- CBQ4-E2 (bank 3) ----------------
  'CBQ4-E2-Q1': { kind: 'match', m: { 0: 2, 1: 3, 2: 1, 3: 0 }, n: '$25,000 vs $2,500 -> PO limit check; nonexistent vendor -> vendor master validity; transposition -> check digit; credit limit -> credit limit check.' },
  'CBQ4-E2-Q2': { kind: 'sel', i: 0, n: 'Frequent overrides = control override by management; control not operating effectively.' },
  'CBQ4-E2-Q3': { kind: 'multi', idx: [0, 1, 3], n: 'Run-to-run, sequence, and reasonableness checks are processing controls. Weekly report review is output; login screen is access.' },
  'CBQ4-E2-Q4': { kind: 'match', m: { 0: 2, 1: 3, 2: 4, 3: 1 }, n: 'Quantity reasonableness -> input; batch sequence -> processing; aged-payables review -> output; role restriction -> access.' },
  'CBQ4-E2-Q5': { kind: 'sel', i: 0, n: 'End-to-end vendor lifecycle control by one employee severely compromises SOD; application controls do not eliminate fraud risk.' },

  // ---------------- CBQ4-E3 (bank 3) ----------------
  'CBQ4-E3-Q1': { kind: 'sel', i: 0, n: 'May qualify as a facilitating payment for a routine non-discretionary action, accurately recorded.' },
  'CBQ4-E3-Q2': { kind: 'sel', i: 0, n: 'High-risk red flag: indirect bribery via third party with government-official ties and opaque structure.' },
  'CBQ4-E3-Q3': { kind: 'multi', idx: [0, 1, 3, 4], n: 'Enhanced due diligence, FCPA training, controlled facilitating payments, and risk-based JV decisions. Cultural practices do not override FCPA.' },
  'CBQ4-E3-Q4': { kind: 'match', m: { 0: 2, 1: 4, 2: 3, 3: 1 }, n: 'Customs fee -> permissible if approved/documented; agent commission -> investigate/terminate; donation -> decline and report; entertainment -> strengthen expense policy.' },
  'CBQ4-E3-Q5': { kind: 'sel', i: 0, n: 'FCPA accounting provisions require issuer internal accounting controls; general controls may not suffice.' },

  // ---------------- CBQ5-E1 (bank 3) ----------------
  'CBQ5-E1-Q1': { kind: 'match', m: { 0: 2, 1: 3, 2: 1 }, n: 'Attribute -> characteristics/capabilities; Performance -> nature of work/quality criteria; Implementation -> apply to specific engagement types.' },
  'CBQ5-E1-Q2': { kind: 'sel', i: 0, n: 'Cooling-off period prohibiting assurance in the lending department preserves objectivity.' },
  'CBQ5-E1-Q3': { kind: 'multi', idx: [0, 1, 2], n: 'Charter must include purpose/authority/responsibility, reporting relationships, and scope. Annual review and methodology are not mandated.' },
  'CBQ5-E1-Q4': { kind: 'sel', i: 0, n: 'CAE functionally to Audit Committee, administratively to CEO, direct access to chair.' },
  'CBQ5-E1-Q5': { kind: 'multi', idx: [0, 1, 2], n: 'QAIP: ongoing monitoring, periodic internal self-assessments, external assessment at least every 5 years. Compensation metrics and benchmarking are not required.' },

  // ---------------- CBQ5-E2 (bank 3) ----------------
  'CBQ5-E2-Q1': { kind: 'match', m: { 0: 2, 1: 0, 2: 1, 3: 4 }, n: 'Phishing -> initial vector; RAT -> persistence; ransomware -> final payload; DDoS -> distraction traffic flood.' },
  'CBQ5-E2-Q2': { kind: 'sel', i: 0, n: 'Lack of security awareness training was the most critical enabler (initial foothold).' },
  'CBQ5-E2-Q3': { kind: 'val', v: 1218000, n: '18.2M x (12% - 3%) - 420,000 = 1,638,000 - 420,000 = 1,218,000.' },
  'CBQ5-E2-Q4': { kind: 'multi', idx: [0, 1, 2, 3], n: 'Awareness training, EDR on all endpoints, network segmentation, and 3-2-1 immutable backups. Post-incident reports and blanket internet restriction are not preventive controls.' },
  'CBQ5-E2-Q5': { kind: 'sel', i: 0, n: 'Ransom decision should be structured/collaborative; layered prevention is superior.' },

  // ---------------- CBQ5-E3 (bank 3) ----------------
  'CBQ5-E3-Q1': { kind: 'sel', i: 3, n: 'Max = higher of EUR20M or 4% x 800M = EUR32M.' },
  'CBQ5-E3-Q2': { kind: 'sel', i: 1, n: '(30% x 8M) + (45% x 1.2M) = 2.94M; less 1.5M cost = 1.44M net benefit.' },
  'CBQ5-E3-Q3': { kind: 'sel', i: 2, n: 'GDPR Article 33: notify supervisory authority within 72 hours.' },
  'CBQ5-E3-Q4': { kind: 'sel', i: 2, n: 'Request to delete all personal data and cease processing = right to erasure (right to be forgotten).' },
  'CBQ5-E3-Q5': { kind: 'sel', i: 1, n: 'Standard Contractual Clauses are the appropriate transfer mechanism.' },

  // ---------------- CBQ4-F2 (bank 3) ----------------
  'CBQ4-F2-Q1': { kind: 'sel', i: 0, n: 'Labeled historical demand -> supervised learning.' },
  'CBQ4-F2-Q2': { kind: 'match', m: { 0: 4, 1: 3, 2: 0, 3: 2 }, n: 'Demand forecasting -> supervised regression; fraud detection -> supervised classification; segmentation -> unsupervised clustering; anomaly detection -> unsupervised outlier detection.' },
  'CBQ4-F2-Q3': { kind: 'multi', idx: [0, 1, 2], n: 'Overfitting contributors: insufficient data, excess complexity vs sample size, learning noise. A simpler model is underfitting.' },
  'CBQ4-F2-Q4': { kind: 'sel', i: 0, n: 'ML adapts to evolving fraud patterns without manual rule updates.' },
  'CBQ4-F2-Q5': { kind: 'multi', idx: [0, 1, 2], n: 'Valid: targeted promotions, store layout/placement, acquisition of underpenetrated segments. Inventory reorder requires demand forecasting.' },

  // ---------------- CBQ5-F2 (bank 3) ----------------
  'CBQ5-F2-Q1': { kind: 'match', m: { 0: 4, 1: 0, 2: 3, 3: 2 }, n: 'Rule-based -> predefined structured steps; UI interaction -> same UI as humans; exception handling -> flag out-of-parameter items; attended/unattended -> user-triggered vs scheduled.' },
  'CBQ5-F2-Q2': { kind: 'sel', i: 0, n: 'Invoice data entry is high-volume, rule-based, structured, low exception rate.' },
  'CBQ5-F2-Q3': { kind: 'val', v: 525000, n: '620,000 + 85,000 - 180,000 = 525,000 Year 2 net benefit.' },
  'CBQ5-F2-Q4': { kind: 'multi', idx: [0, 1, 2, 3], n: 'Invoice entry, bank rec, intercompany matching, and standard JE posting are RPA-suitable. Loss reserve estimation requires judgment.' },
  'CBQ5-F2-Q5': { kind: 'sel', i: 0, n: 'Supervisory review/approval for high-value transactions is the most critical SOD enhancement.' },

  // ---------------- CBQ3-A3 (bank 3) ----------------
  'CBQ3-A3-Q1': { kind: 'sel', i: 1, n: 'Two distinct obligations: equipment delivery and installation; rebate is variable consideration.' },
  'CBQ3-A3-Q2': { kind: 'val', v: 495238, n: 'Rebate excluded under constraint (consistent with Q4); 600,000 x 520,000/630,000 = 495,238.' },
  'CBQ3-A3-Q3': { kind: 'sel', i: 1, n: 'Equipment control transfers at delivery, October 15.' },
  'CBQ3-A3-Q4': { kind: 'sel', i: 2, n: 'Rebate constrained to $0 until the threshold is met.' },
  'CBQ3-A3-Q5': { kind: 'sel', i: 0, n: 'Distinct goods priced at standalone selling price -> separate contract.' },

  // ---------------- CBQ3-A4 (bank 3) ----------------
  'CBQ3-A4-Q1': { kind: 'val', v: 228, n: 'NRV = 240 - (5% x 240 = 12) = 228.' },
  'CBQ3-A4-Q2': { kind: 'val', v: 0, n: 'No product line has cost > NRV, so total write-down = 0.' },
  'CBQ3-A4-Q3': { kind: 'sel', i: 0, n: 'No write-down; no journal entry.' },
  'CBQ3-A4-Q4': { kind: 'sel', i: 3, n: 'Neither ratio affected because no write-down exists.' },
  'CBQ3-A4-Q5': { kind: 'sel', i: 0, n: 'Write-downs fell from 15,000 to 0 — directionally favorable.' },

  // ---------------- CBQ3-C4 (bank 3) ----------------
  'CBQ3-C4-Q1': { kind: 'val', v: -21600, n: '(42 - 40) x 10,800 = 21,600 U -> -21600.' },
  'CBQ3-C4-Q2': { kind: 'val', v: -32000, n: '(10,800 - 10,000) x 40 = 32,000 U -> -32000.' },
  'CBQ3-C4-Q3': { kind: 'val', v: -5600, n: '(3,400 - 3,200) x 28 = 5,600 U -> -5600.' },
  'CBQ3-C4-Q4': { kind: 'sel', i: 1, n: 'Lower-quality materials may explain the unfavorable price and quantity variances together.' },
  'CBQ3-C4-Q5': { kind: 'sel', i: 1, n: 'Investigate the DM quantity variance first: largest unfavorable and controllable by production.' },
};

function buildDerived(item) {
  const s = S[item.ItemID];
  if (!s) throw new Error('no solution for ' + item.ItemID);
  if (s.kind === 'val') return s.v;
  if (s.kind === 'sel') {
    if (!item.Choices || item.Choices[s.i] === undefined) throw new Error('bad sel ' + item.ItemID);
    return item.Choices[s.i];
  }
  if (s.kind === 'multi') {
    return s.idx.map(x => x + 1).join(',');
  }
  if (s.kind === 'match') {
    const parts = [];
    item.LeftItems.forEach((l, i) => {
      const r = s.m[i];
      if (r === undefined) throw new Error('bad match ' + item.ItemID + ' left ' + i);
      parts.push(l + '->' + item.RightItems[r]);
    });
    return parts.join(';');
  }
  throw new Error('unknown kind ' + item.ItemID);
}

const skip = { 'CBQ4-A1-Q3': true };
const out = [];
for (const c of cases) {
  const items = [];
  for (const it of c.items) {
    if (skip[it.ItemID]) continue;
    const s = S[it.ItemID];
    if (!s) throw new Error('missing solution ' + it.ItemID);
    items.push({
      itemId: it.ItemID,
      type: it.Type,
      prompt: it.Prompt,
      derived: buildDerived(it),
      derivationNotes: s.n,
    });
  }
  out.push({ caseId: c.caseId, bank: c.bank, items });
}

fs.writeFileSync('scripts/output/dl066_corrected_solutions.json', JSON.stringify(out, null, 2));
console.log('cases:', out.length, 'items:', out.reduce((a, c) => a + c.items.length, 0));
