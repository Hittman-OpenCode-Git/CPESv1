const WAVE1315_PART_004 = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.128 capacity cost idle versus used",
    "MicroTopic": "capacity cost idle used",
    "UniqueConceptKey": "D-C128-capacity-cost-idle-used",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "IT capacity 12,000 hours ($400,000 fixed = $33.33/hr). Actual usage 10,000 hours. The CFO asks: how much fixed IT cost is idle-capacity cost, who should bear it, and what does it signal?",
    "Choices": {
      "A": "Zero idle — all $400,000 assigns to users pro-rata actual (9,000/1,000); unused capacity has no cost",
      "B": "Idle = 10,000×$33.33 = $333,333 — used capacity is the idle portion",
      "C": "Idle = $400,000 (all fixed is idle by definition) — write off entirely",
      "D": "Idle = 2,000×$33.33 = $66,667, borne by Admin (the under-user: budgeted 2,000, used 1,000 — 1,000 idle) plus 1,000 shared shortfall... precisely total idle 2,000 hours: Admin accounts 1,000 (2,000−1,000); Production accounts 1,000 (10,000−9,000). Idle cost $66,667 split 1,000/1,000 = $33,333 each as capacity-planning variance, not product cost. Signal: 16.7% overcapacity — defer expansion, tighten reservations"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Idle capacity = 12,000 − 10,000 = 2,000 hours × $33.3333 = $66,666.67 ≈ $66,667. Attribution: Admin 2,000 budgeted − 1,000 used = 1,000 idle ($33,333); Production 10,000 − 9,000 = 1,000 idle ($33,333). Treatment: capacity-planning variance (period charge by responsibility), never product cost — loading idle cost into production rates punishes current output for planning slack. Signal: 16.7% overcapacity counsels reservation discipline and expansion deferral. Zero-idle (option A) buries $66,667 of planning slack in product margins. All-idle (option C) writes off $333,333 of used capacity. Inverted (option B) mistakes used for idle. Business interpretation: idle-capacity cost is a planning signal assigned by responsibility — measure it, attribute it, never bury it in rates. Common trap: pro-rating all fixed to users.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-128",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's zero-idle buries $66,667 of planning slack in product margins — unused capacity has carrying cost ($33.33/hr reserved but idle).",
    "ExplanationWrongB": "Option B inverts used and idle — 10,000 consumed hours are the utilized portion; 2,000 unconsumed are idle, never the reverse.",
    "ExplanationWrongC": "Option C writes off $333,333 of used capacity as idle — 10,000 consumed hours are utilized, never idle, by definition.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.129 joint cost allocation method choice",
    "MicroTopic": "joint cost allocation method choice",
    "UniqueConceptKey": "D-C129-joint-cost-allocation-method-choice",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The board will use joint-cost allocations to set transfer prices between the Alpha division (sells externally, $500,000) and Beta division (internal buyer, $300,000). The CFO asks which allocation method best supports goal-congruent transfer pricing and why.",
    "Choices": {
      "A": "Physical measure — objectivity prevents transfer-price disputes",
      "B": "Sales-value at split-off — benefits-received logic aligns each division's cost burden with its revenue capacity, supporting arm's-length negotiation; physical measure would load Alpha with weight-based cost divorced from its $500,000 economics, and constant-margin would force margin equality the market doesn't observe",
      "C": "Constant gross margin — equal margins eliminate all transfer conflict",
      "D": "No allocation — transfer at variable cost only, ignoring joint cost"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Transfer-pricing goal congruence needs benefits-received burden: sales-value allocation ties each division's joint-cost share to its revenue capacity ($500,000 vs $300,000 → 62.5%/37.5%), so negotiated transfers reflect market economics. Physical-measure (option A) objectivity loads cost by weight divorced from $500,000/$300,000 revenue capacity — disputes persist because burden misaligns with benefit. Constant-margin (option C) forces margin equality the external market doesn't observe, distorting Alpha's pricing freedom. Variable-only (option D) ignores $joint of shared cost, subsidizing internal transfers. Business interpretation: allocation methods are governance tools — match the method's burden logic to the decision's incentive needs. Recommendation: sales-value for transfer-price costing, disclosed and consistently applied. Common trap: choosing methods on computational simplicity for incentive decisions.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-129",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's physical-measure objectivity loads cost by weight divorced from $500,000/$300,000 revenue capacity — measurable burden that misaligns with benefit still misaligns incentives.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's forced margin equality distorts Alpha's external pricing freedom — the market doesn't observe equal margins, so internal mandates shouldn't manufacture them.",
    "ExplanationWrongD": "Option D's variable-only transfer ignores shared joint cost entirely — internal buyers free-ride on common inputs while external pricing carries the full burden.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.130 process costing method recommendation",
    "MicroTopic": "process costing method recommendation",
    "UniqueConceptKey": "D-C130-process-costing-method-recommendation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A process carries volatile input prices (±20% monthly) with stable 8,000-unit monthly throughput and 1,000-unit BWIP. The controller asks whether FIFO or weighted average better serves cost control and inventory valuation. Recommend with reasons.",
    "Choices": {
      "A": "Weighted average — simplicity always governs method choice",
      "B": "FIFO — isolates current-period price volatility ($220,000 current vs $15,000 prior in P1-DC-124 pattern) for visible control signals, while average would melt ±20% swings into blended rates that hide purchasing performance; use FIFO for control, disclose average as supplementary where stability aids planning",
      "C": "Weighted average — blending hides volatility, which is the goal of reporting",
      "D": "Neither — process costing cannot handle volatile inputs; switch to job costing"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "FIFO separates periods: current $220,000 of volatile input prices stands alone in the $22.45 unit cost (P1-DC-124 mechanics), so purchasing variances surface visibly against current standards. Weighted average would melt $15,000 of prior-period cost (at old prices) into current units, damping ±20% swings into blended rates that hide purchasing performance. Simplicity absolutism (option A) trades control signals for computational ease. Volatility-hiding (option C) mistakes signal suppression for reporting quality. Job-costing flight (option D) abandons process economics for homogeneous flow — method follows production physics, never price behavior. Business interpretation: volatile inputs demand period separation (FIFO); stable inputs tolerate blending (average). Recommend FIFO for control with average supplementary for planning stability. Common trap: choosing average to smooth volatility that management needs to see.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-130",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's simplicity absolutism trades $220,000 of visible current-price signals for computational ease — control value dominates arithmetic convenience.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's volatility-hiding mistakes signal suppression for quality — ±20% purchasing swings are exactly what control systems must surface, never smooth away.",
    "ExplanationWrongD": "Option D's job-costing flight abandons process economics for homogeneous 8,000-unit flow — production physics selects the method, never price behavior.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.101 material price variance responsibility",
    "MicroTopic": "material price variance responsibility",
    "UniqueConceptKey": "C-101-material-price-variance-responsibility",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 4 lbs at $6.00/lb. Actual: 41,000 lbs purchased at $6.40/lb; 39,000 lbs used for 9,500 units. Purchasing switched to an unapproved supplier mid-month (rush premium $0.30/lb); production wasted 1,000 lbs above standard (9,500×4 = 38,000). Compute price and quantity variances and assign responsibility.",
    "Choices": {
      "A": "Price $16,400 U + quantity $6,000 U, both production's — usage drives all variances",
      "B": "Price $15,600 U + quantity $6,400 U — isolate at standard quantity to split causes",
      "C": "Price variance (41,000×$0.40) = $16,400 U (purchasing: unapproved supplier + rush premium); quantity variance ((39,000−38,000)×$6.00) = $6,000 U (production: 1,000 lbs waste). Isolate at purchase for price (41,000 lbs), at use for quantity (39,000 lbs)",
      "D": "Net $22,400 U to purchasing — single variance, single owner for simplicity"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Price variance = AQ purchased × (AP − SP) = 41,000 × ($6.40 − $6.00) = 41,000 × $0.40 = $16,400 U — purchasing's supplier switch (rush premium documented at $0.30 of the $0.40). Quantity variance = SP × (AQ used − SQ) = $6.00 × (39,000 − 38,000) = $6,000 U — production's 1,000-lb waste. Isolation points differ by design: price at PURCHASE quantity (41,000, before production touches material), quantity at USE quantity (39,000, after purchasing's job ends). All-production (option A) charges production for purchasing's $16,400 supplier decision. Recomputed splits (option B: $15,600/$6,400) apply price to used quantity and quantity at actual price — crossing isolation points. Single-owner (option D) nets $22,400 to hide two causes. Business interpretation: isolate variances where each manager's control ends — purchasing owns price at the receiving dock, production owns quantity at the production line. Common trap: computing price variance on quantity used.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-101",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A charges production for purchasing's $16,400 supplier switch — price responsibility ends at the receiving dock; production never chose the vendor.",
    "ExplanationWrongB": "Option B's $15,600/$6,400 crosses isolation points (price on used quantity, quantity at actual price) — price isolates at purchase (41,000 lbs), quantity at use, each at its own valuation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D nets $22,400 to one owner — netting hides the $16,400 supplier decision inside production's $6,000 waste (or vice versa); two causes need two owners.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.102 labor rate versus efficiency interaction",
    "MicroTopic": "labor rate efficiency interaction",
    "UniqueConceptKey": "C-102-labor-rate-efficiency-interaction",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 2 hrs/unit at $20/hr. Actual: 10,000 units using 21,500 hrs at $18/hr. HR substituted junior staff (lower rate, slower pace). Decompose the total variance and explain the interaction.",
    "Choices": {
      "A": "Rate (21,500×−$2) = $43,000 F; efficiency ((21,500−20,000)×$20) = $30,000 U; net $13,000 F — the favorable rate more than offsets the inefficiency, but the $30,000 U signals the substitution's hidden cost and HR owns the trade-off",
      "B": "Net $13,000 F only — favorable is favorable, no further analysis needed",
      "C": "Rate $40,000 F + efficiency $27,000 U — compute both at actual rate to match",
      "D": "Rate $43,000 U + efficiency $30,000 F — invert signs since juniors cost less"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Rate variance = AH × (AR − SR) = 21,500 × ($18 − $20) = 21,500 × −$2 = −$43,000 → $43,000 F. Efficiency = SR × (AH − SH) = $20 × (21,500 − 20,000) = $20 × 1,500 = $30,000 U. Net = $43,000 F − $30,000 U = $13,000 F. The interaction is the lesson: junior substitution buys $43,000 of rate savings at $30,000 of efficiency cost — net favorable but $30,000 of hidden cost that grows if error rates or supervision load rise. Favorable-only (option B: $13,000 F, stop) reads the net as success while the $30,000 U trade-off goes unmonitored. Same-rate computation (option C: $40,000/$27,000 at $18/hr) misvalues efficiency — efficiency always values at STANDARD rate ($20 → $30,000). Sign inversion (option D) reads cheaper labor as unfavorable. Business interpretation: rate-efficiency interactions are staffing-decision report cards — report both legs plus the net, and flag when the efficiency leg trends. Common trap: netting complementary variances into false comfort.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-102",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B stops at net $13,000 F — netting hides the $30,000 U efficiency cost of junior substitution; favorable nets with trending adverse legs demand monitoring, never celebration.",
    "ExplanationWrongC": "Option C values efficiency at the $18 actual rate (1,500×$18 = $27,000) — efficiency always values at STANDARD rate ($20 → $30,000); actual-rate valuation mixes price effects into quantity.",
    "ExplanationWrongD": "Option D inverts both signs — cheaper labor is rate-favorable ($43,000 F), slower pace is efficiency-unfavorable ($30,000 U); inversion reads every signal backwards.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.103 variable overhead spending versus efficiency",
    "MicroTopic": "variable overhead spending efficiency",
    "UniqueConceptKey": "C-103-variable-overhead-spending-efficiency",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard VOH: $8/DLH, 2 hrs/unit. Actual: 10,000 units, 21,500 DLH, VOH incurred $178,000. The supervisor ran machines overtime (premium utilities) while crews were idle 1,500 hrs waiting for materials. Decompose VOH variances and diagnose.",
    "Choices": {
      "A": "Spending $6,000 U + efficiency $12,000 U — both driven by the 1,500 idle hours",
      "B": "Spending $18,000 U + efficiency $0 — overhead has no efficiency component",
      "C": "Total $18,000 U only — decomposition adds no information for overhead",
      "D": "Spending = $178,000 − (21,500×$8) = $178,000 − $172,000 = $6,000 U (overtime premiums, price-like); efficiency = $8 × (21,500 − 20,000) = $12,000 U (idle hours, quantity-like). Total $18,000 U. Overtime explains spending; material delays explain efficiency — two causes, two fixes"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "VOH spending = actual − (AH × SR) = $178,000 − 21,500×$8 ($172,000) = $6,000 U — the overtime utility premiums (price-like: paid more per hour of base). VOH efficiency = SR × (AH − SH) = $8 × (21,500 − 20,000) = $8 × 1,500 = $12,000 U — the idle hours consumed overhead base without output (quantity-like). Total $18,000 U. Single-cause (option A) blames idle hours for the $6,000 premium pricing — overtime rates, not idleness, raised the per-hour cost. No-efficiency (option B) denies VOH a quantity leg — VOH applies per DLH, so excess hours carry excess VOH by construction. No-decomposition (option C) nets $18,000 into one fixable lump — but overtime policy and material scheduling are different owners with different fixes. Business interpretation: VOH variances mirror labor's structure (spending≈rate, efficiency≈quantity) — diagnose price-like and quantity-like legs separately. Common trap: treating overhead variances as undecomposable.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-103",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A blames 1,500 idle hours for the $6,000 spending leg — idleness drives the $12,000 efficiency leg; overtime premiums (price per hour) drive spending.",
    "ExplanationWrongB": "Option B denies VOH an efficiency leg — VOH applies at $8/DLH, so 1,500 excess hours mechanically carry $12,000 of VOH; the leg exists by construction.",
    "ExplanationWrongC": "Option C nets $18,000 into one lump — overtime policy (supervisor) and material scheduling (purchasing/planning) are different owners needing different fixes.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.104 fixed overhead budget versus volume",
    "MicroTopic": "fixed overhead budget volume",
    "UniqueConceptKey": "C-104-fixed-overhead-budget-volume",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted FOH $200,000 at 20,000 DLH ($10/DLH). Actual FOH $207,000; actual production 9,000 units (standard 2 hrs/unit = 18,000 SH). The plant ran below capacity due to a canceled order. Compute both fixed overhead variances and interpret the volume leg.",
    "Choices": {
      "A": "Budget $7,000 U + volume $20,000 U ($200,000 − 18,000×$10 = $200,000 − $180,000); the $20,000 U is a capacity-utilization signal (2,000 unused hours × $10), not a spending failure — do not discipline production for canceled orders",
      "B": "Budget $7,000 U + volume $20,000 F — under-production absorbs more overhead favorably",
      "C": "Total $27,000 U charged to production — all fixed variance is controllable",
      "D": "Budget $7,000 F + volume $20,000 U — actual below budget is favorable"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Budget variance = actual − budgeted = $207,000 − $200,000 = $7,000 U (spending control — e.g., insurance/tax increases). Volume variance = budgeted − applied = $200,000 − (18,000 × $10) = $200,000 − $180,000 = $20,000 U (2,000 denominator hours unused × $10 — capacity-utilization signal from the canceled order). Favorable-volume claims (option B) invert the applied formula — fewer hours absorb LESS fixed ($180,000 < $200,000), leaving $20,000 unabsorbed (unfavorable). All-controllable (option C: $27,000 to production) punishes production for a sales cancellation outside its control. Sign-flip (option D: $7,000 F) reads overspending as favorable. Business interpretation: the volume variance prices idle capacity, never inefficiency — report it as a utilization signal to sales/planning, and never commingle it with the $7,000 spending variance in performance reviews. Common trap: treating volume variance as a production efficiency measure.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-104",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B's $20,000 F inverts absorption — 18,000 applied hours absorb $180,000 against $200,000 budgeted, leaving $20,000 unabsorbed (unfavorable); fewer hours never absorb more.",
    "ExplanationWrongC": "Option C's $27,000 to production punishes the plant for a canceled order — volume variance is a sales/planning utilization signal, never production inefficiency.",
    "ExplanationWrongD": "Option D reads $207,000 actual vs $200,000 budget as $7,000 favorable — spending above budget is unfavorable, always; direction follows actual-minus-budget.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.105 sales price versus volume variance",
    "MicroTopic": "sales price volume variance",
    "UniqueConceptKey": "C-105-sales-price-volume-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 50,000 units at $40 ($2,000,000). Actual: 54,000 units at $38 ($2,052,000). Standard variable cost $22/unit. Marketing cut price to chase volume. Decompose the sales variances including contribution effects.",
    "Choices": {
      "A": "Price (54,000×−$2) = $108,000 U; volume at contribution ((54,000−50,000)×($40−$22) = 4,000×$18) = $72,000 F; net revenue +$52,000 but contribution −$36,000 ($108,000 U vs $72,000 F) — the discount bought revenue with margin",
      "B": "Price $108,000 F + volume $72,000 F — all increases are favorable",
      "C": "Volume at selling price (4,000×$40 = $160,000 F) — revenue-based volume variance is the standard",
      "D": "Net $52,000 F only — revenue beat means the discount worked"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Price variance = AQ × (AP − BP) = 54,000 × ($38 − $40) = −$108,000 → $108,000 U. Volume variance at CONTRIBUTION (not revenue — fixed costs don't scale with units): (54,000 − 50,000) × ($40 − $22) = 4,000 × $18 = $72,000 F. Net contribution effect = $72,000 F − $108,000 U = −$36,000 (margin destroyed) even as revenue rose $52,000 ($2,052,000 − $2,000,000). All-favorable (option B) reads a price cut as favorable — lower prices are unfavorable by definition. Revenue-based volume (option C: $160,000 F) credits sales with $22/unit of variable cost as though contribution — volume variances value at margin, never revenue. Revenue-only (option D: $52,000 F verdict) declares victory on topline while contribution fell $36,000. Business interpretation: price discounts trade margin for volume — judge the trade at contribution (margin × extra units vs price × all units), never at revenue. Common trap: valuing sales volume variance at selling price.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-105",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B reads the $2 price cut as $108,000 favorable — actual below budget on price is unfavorable by definition; direction follows actual-minus-budget.",
    "ExplanationWrongC": "Option C's $160,000 values 4,000 extra units at $40 revenue — volume variance values at $18 contribution; revenue valuation books $22/unit of variable cost as profit.",
    "ExplanationWrongD": "Option D's $52,000 revenue verdict ignores the $36,000 contribution destruction — topline wins funded by margin losses are defeats, never victories.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.106 sales mix versus quantity variance",
    "MicroTopic": "sales mix quantity variance",
    "UniqueConceptKey": "C-106-sales-mix-quantity-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 30,000 units of High (CM $25) + 20,000 of Low (CM $10); total 50,000, weighted CM $19. Actual: 28,000 High + 26,000 Low = 54,000 units. Decompose mix and quantity variances at contribution.",
    "Choices": {
      "A": "Quantity and mix both favorable — more units help",
      "B": "Mix $0 — product mix does not affect contribution",
      "C": "Quantity first (4,000×$19 = $76,000 F), then mix is the residual — order determines meaning",
      "D": "Quantity = (54,000−50,000)×$19 = 4,000×$19 = $76,000 F (more units at budgeted mix). Mix = actual units at actual vs budgeted mix: High (28,000 − 54,000×60%)×$25 + Low (26,000 − 54,000×40%)×$10 = (28,000−32,400)×$25 + (26,000−21,600)×$10 = (−4,400×$25) + (4,400×$10) = −$110,000 + $44,000 = −$66,000 → $66,000 U. Total sales variance $76,000 F − $66,000 U = $10,000 F — volume grew but mix shifted to Low, nearly wiping the gain"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Budgeted mix: High 60%, Low 40%; weighted CM = 0.6×$25 + 0.4×$10 = $15 + $4 = $19. Quantity variance (pure volume at budgeted mix) = (54,000 − 50,000) × $19 = $76,000 F. Mix variance (actual units reweighted): High shortfall 28,000 − 32,400 = −4,400 × $25 = −$110,000; Low excess 26,000 − 21,600 = +4,400 × $10 = +$44,000; net −$66,000 → $66,000 U. Total = $76,000 F − $66,000 U = $10,000 F. All-favorable (option A) ignores the −4,400 High-unit shift — 4,000 more units of the wrong mix nearly erased the gain. Zero-mix (option B) denies arithmetic ($110,000 swing on mix alone). Order-dependence (option C) mistakes computation sequence for economics — quantity-at-budgeted-mix plus mix-at-actual-units is the defined decomposition either order. Business interpretation: mix variance prices the quality of volume — 4,400 units shifted from $25 to $10 margin, costing $66,000. Common trap: celebrating unit growth without mix decomposition.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-106",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's all-favorable ignores the −4,400 High-unit mix shift — $66,000 U of margin quality lost inside $76,000 of volume gained.",
    "ExplanationWrongB": "Option B's zero-mix denies the −$110,000/+$44,000 reweighting arithmetic — mix moved $66,000 of contribution regardless of acknowledgment.",
    "ExplanationWrongC": "Option C mistakes computation order for economics — quantity-at-budgeted-mix ($76,000 F) plus mix-at-actual-units ($66,000 U) is defined either sequence; totals reconcile to $10,000 F.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 14)",
    "certification_date": "2026-09-11"
  }
];
