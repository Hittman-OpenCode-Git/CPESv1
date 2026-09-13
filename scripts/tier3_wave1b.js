const WAVE1B = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.104 fixed overhead denominator choice",
    "MicroTopic": "fixed overhead denominator choice",
    "UniqueConceptKey": "C-D104-fixed-overhead-denominator-choice",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Summit Castings budgets fixed manufacturing overhead at $480,000. Practical capacity is 60,000 machine hours; budgeted production uses 48,000 hours; actual production used 45,000 hours. The controller, Alan Reyes, set the predetermined rate using practical capacity. Actual fixed overhead was $486,000. A board member asks why the volume variance is unfavorable when spending was nearly on budget. How should Reyes explain the two fixed overhead variances?",
    "Choices": {
      "A": "Budget variance $6,000 U; volume variance $120,000 U — the volume variance measures unused practical capacity, not spending control",
      "B": "Budget variance $6,000 U; volume variance $24,000 U — volume is measured against budgeted production",
      "C": "Budget variance $120,000 U; volume variance $6,000 U — the labels reverse under practical capacity",
      "D": "Budget variance $0; volume variance $126,000 U — spending exactly matched so the budget variance is zero"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Predetermined rate = $480,000 / 60,000 practical-capacity hours = $8/hr. Budget (spending) variance = actual − budgeted = $486,000 − $480,000 = $6,000 U. Volume variance = budgeted − applied = $480,000 − (45,000 × $8) = $480,000 − $360,000 = $120,000 U. Reyes's message to the board: spending control was fine ($6,000 on $480,000 is about 1%); the $120,000 U volume variance reflects 15,000 hours of unused practical capacity (60,000 − 45,000), a demand and capacity-utilization matter, not a spending failure. Business interpretation: under a practical-capacity denominator, the volume variance transparently prices idle capacity — exactly the signal for outsourcing, downsizing, or sales-growth decisions. A common trap is measuring volume against budgeted production (48,000 hrs, giving $24,000), which hides 12,000 hours of structural overcapacity.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-104",
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
    "ExplanationWrongB": "Option B measures the volume variance against budgeted production (48,000 − 45,000 = 3,000 × $8 = $24,000). But Reyes set the rate on practical capacity, so the volume variance must measure against 60,000 hours. Using budgeted production hides 12,000 hours of structural idle capacity — the denominator-level trap.",
    "ExplanationWrongC": "Option C swaps the two variance labels. The budget variance compares actual to budgeted spending ($6,000 U); the volume variance compares budgeted to applied ($120,000 U). Labels do not reverse under practical capacity — only the volume variance's magnitude changes.",
    "ExplanationWrongD": "Option D zeroes the budget variance, but actual ($486,000) exceeded budget ($480,000) by $6,000. Near-budget is not on-budget; the $6,000 U is small but real, and dropping it misstates spending control.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.105 materials mix and yield variances",
    "MicroTopic": "materials mix yield variances",
    "UniqueConceptKey": "C-D105-materials-mix-yield-variances",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniper Blends produces a specialty coating from two resins. Standard mix for a 1,000-gallon batch: 600 gal Alpha at $5/gal + 400 gal Beta at $8/gal (standard cost $6,200). Actual batch: 650 gal Alpha at $5/gal + 350 gal Beta at $8/gal; actual output 990 gallons. Prices exactly met standard. The production chief blames yield loss for the entire overrun. What do the mix and yield variances show?",
    "Choices": {
      "A": "Mix $150 F; yield $62 U — the cheaper mix saved $150 but 10 lost gallons cost $62",
      "B": "Mix $150 U; yield $62 U — both unfavorable",
      "C": "Mix $0; yield $212 U — with prices at standard, only yield matters",
      "D": "Mix $150 F; yield $212 F — the batch was efficient on both dimensions"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Standard average cost per gallon = $6,200 / 1,000 = $6.20. Mix effect: actual inputs at standard prices = 650×$5 + 350×$8 = $3,250 + $2,800 = $6,050 versus $6,200 for the standard 1,000-gallon mix — a $150 F saving from shifting 50 gallons toward cheaper Alpha. Yield effect: 1,000 input gallons yielded 990 output gallons; 10 lost gallons × $6.20 = $62 U. The chief is half-right (yield did lose $62) but wrong that it explains everything — the mix shift saved $150, for a net $88 F batch. Business interpretation: substituting cheaper Alpha worked financially this batch, but repeated substitution may signal quality drift worth monitoring. Common trap: ignoring mix effects when prices meet standard.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-105",
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
    "ExplanationWrongB": "Option B signs the mix variance wrong: shifting 50 gallons from $8 Beta to $5 Alpha saves 50 × ($8 − $5) = $150 — favorable, not unfavorable. The direction of the shift (toward the cheaper input) determines the sign.",
    "ExplanationWrongC": "Option C claims mix does not matter when prices meet standard. Wrong — mix variance exists precisely when relative proportions change, holding prices at standard. The $150 F saving is real and attributable to the mix decision.",
    "ExplanationWrongD": "Option D signs the yield variance wrong: producing 990 gallons from 1,000 gallons of input is a 10-gallon loss — unfavorable ($62 U), not favorable. Output below input can never be favorable on yield.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.106 sales price and volume variance bridge",
    "MicroTopic": "sales price volume variance bridge",
    "UniqueConceptKey": "C-D106-sales-price-volume-variance-bridge",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Willow & Crane budgeted 20,000 units at $50 ($1,000,000 revenue, $30 variable cost, $200,000 fixed). Actual: 22,000 units at $48 ($1,056,000 revenue). The sales director claims a $56,000 favorable performance driven by volume. The VP Finance suspects discounting. Decompose the $56,000 static-budget variance the way a flexible-budget bridge requires.",
    "Choices": {
      "A": "Sales price variance $44,000 U; sales volume variance $100,000 F — discounting cost $44,000 while volume added $100,000 in revenue terms",
      "B": "Sales price variance $56,000 F; sales volume variance $0 — the director is right, it is all volume",
      "C": "Sales price variance $44,000 U; sales volume variance $12,000 F — volume measured on contribution not revenue",
      "D": "Sales price variance $100,000 F; sales volume variance $44,000 U — the labels reverse on revenue bridges"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Flexible-budget revenue at actual volume = 22,000 × $50 = $1,100,000. Sales price variance = actual − flexible = $1,056,000 − $1,100,000 = $44,000 U (the $2/unit discount × 22,000 units). Sales volume variance = flexible − static = $1,100,000 − $1,000,000 = $100,000 F in revenue terms (2,000 extra units × $50). Net: $100,000 F − $44,000 U = $56,000 F — reconciles. The VP Finance is right to flag discounting, and the contribution view sharpens it: volume contribution = 2,000 × $20 = $40,000 F versus $44,000 U price — a $4,000 U net on contribution, meaning the discount destroyed value despite the revenue win. Business interpretation: revenue bridges flatter volume strategies; always pair with contribution. Common trap: calling the whole $56,000 a volume win.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-106",
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
    "ExplanationWrongB": "Option B accepts the director's lump-sum story. The $56,000 nets two opposing forces ($100,000 F volume, $44,000 U price); reporting it whole conceals the discounting the VP suspects. Decomposition exists precisely to prevent this.",
    "ExplanationWrongC": "Option C states volume as $12,000 F, mixing measurement bases. On a revenue bridge, volume = 2,000 × $50 = $100,000 F. Keep revenue and contribution bridges separate — and note the contribution bridge actually shows a net loss here.",
    "ExplanationWrongD": "Option D swaps the labels: price compares actual to flexible ($44,000 U), volume compares flexible to static ($100,000 F). Swapping them credits discounting as a volume win — the director's fallacy in formal dress.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.107 market size and share variance",
    "MicroTopic": "market size share variance",
    "UniqueConceptKey": "C-D107-market-size-share-variance",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northfield Brewing budgeted 10% of a 500,000-barrel regional market (50,000 barrels) at $20 contribution per barrel. Actual: market grew to 560,000 barrels; Northfield sold 50,400 barrels. Marketing claims credit for the 400-barrel gain. The CMO wants the sales-quantity variance split into size and share effects. What is the correct split?",
    "Choices": {
      "A": "Market size $120,000 F; market share $112,000 U — growth added $120,000 but share slipped from 10% to 9%, costing $112,000",
      "B": "Market size $120,000 F; market share $8,000 F — both favorable since volume rose",
      "C": "Market size $8,000 F; market share $120,000 F — size is the 400-barrel gain, share is the market growth",
      "D": "Market size $0; market share $8,000 F — budgeted share applied to actual market exactly covers actual sales"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Budgeted share 10% × market growth (560,000 − 500,000 = 60,000) × $20 = 6,000 × $20 = $120,000 F size variance — the rising tide. Share variance = (actual share − budgeted share) × actual market × CM = (50,400/560,000 = 9% − 10%) × 560,000 × $20 = −5,600 × $20 = $112,000 U. Net quantity effect: $120,000 F − $112,000 U = $8,000 F (400 barrels × $20 — reconciles to the volume gain). Marketing's claim is backwards: the team lost a full point of share; only market growth saved the quarter. Business interpretation: compensate share, not volume — volume rewarded luck here. Common trap: reading the 400-barrel net gain as a share win.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-107",
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
    "ExplanationWrongB": "Option B signs share favorable because volume rose. Share fell (9% versus 10%) — the 400-barrel net gain is entirely the market-growth effect. Volume rising never implies share rising; they moved opposite here.",
    "ExplanationWrongC": "Option C swaps the two effects: the 400-barrel net gain is the combined result, not the size effect; size is budgeted-share × market growth (6,000 barrels, $120,000). Swapping credits marketing with growth and growth with share.",
    "ExplanationWrongD": "Option D claims budgeted share of actual market (10% × 560,000 = 56,000) covers actual sales (50,400). It does not — the 5,600-barrel shortfall is the share loss ($112,000 U). Zero-size asserts the market did not grow; it grew 12%.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.108 ROI versus residual income conflict",
    "MicroTopic": "ROI residual income conflict",
    "UniqueConceptKey": "C-D108-ROI-residual-income-conflict",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harborside Division earns $440,000 on $2,000,000 of assets (22% ROI). Required return is 14%. A $300,000 project promises $54,000 annual income (18%). The manager's bonus is 100% ROI-based. Corporate notes the project's ROI exceeds the 14% hurdle and the division's post-acceptance ROI (21.48%) still beats it. What will the manager do, and what does it reveal?",
    "Choices": {
      "A": "Accept — 18% exceeds 14%, so both manager and company agree",
      "B": "Reject — 18% dilutes the 22% division ROI and cuts the bonus, though the project creates shareholder value; classic ROI-vs-RI goal incongruence",
      "C": "Accept — post-acceptance 21.48% still beats the 14% hurdle, which is the manager's criterion",
      "D": "Reject — the project ROI is below the division ROI, which proves it destroys shareholder value"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Project ROI = $54,000/$300,000 = 18%, above the 14% required return — it creates value (residual income = $54,000 − 14%×$300,000 = +$12,000). But the manager compares 18% to the division's 22%: acceptance dilutes ROI to $494,000/$2,300,000 = 21.48%, cutting an ROI-based bonus. A rational bonus-maximizer rejects. Corporate's 21.48%-versus-14% framing is irrelevant to the manager's calculus — the hurdle that matters to the bonus is the pre-project 22%, not the cost of capital. This is the textbook ROI/RI incongruence: ROI penalizes value-creating projects that dilute high current returns, while residual income (+$12,000) would have induced acceptance. Business interpretation: switch the bonus to RI or EVA, or the division will systematically underinvest. Common trap: assuming hurdle-beating guarantees acceptance under ROI bonuses.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-108",
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
    "ExplanationWrongA": "Option A assumes hurdle-beating aligns manager and company. It does not: the manager's bonus keys off ROI change (22% down to 21.48% = pay cut), not off beating 14%. The 14% hurdle governs RI decisions, not ROI-bonus decisions.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C mistakes corporate's hurdle framing for the manager's criterion. The bonus keys off ROI change, not off the absolute ROI level versus 14%. Absolute-hurdle logic applies to residual-income decisions, not ROI-bonus decisions.",
    "ExplanationWrongD": "Option D confuses dilution with destruction: 18% exceeds the 14% cost of capital, so the project creates $12,000 of residual income. Below-division-ROI means bonus dilution, not value destruction — the distinction the whole item turns on.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.109 transfer pricing with excess capacity",
    "MicroTopic": "transfer pricing excess capacity",
    "UniqueConceptKey": "C-D109-transfer-pricing-excess-capacity",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Vandex Corporation's Components Division makes 100,000 units of Part X yearly at variable cost $40; it has 25,000 units of idle capacity and no outside market for the part. The Assembly Division needs 20,000 units and can buy an equivalent part outside for $52. Division managers negotiate freely and act in their own interest. Corporate wants goal congruence without dictating the price. What transfer-price outcome should the controller expect, and why?",
    "Choices": {
      "A": "A price at $52 — the buying division pays market, and the selling division captures the full margin",
      "B": "No agreement — the selling division will hold out for at least $52 since it has bargaining power",
      "C": "A price between $40 and $52 — any price in this range beats both divisions' outside alternatives, so negotiation should succeed",
      "D": "A price at $40 — the selling division has idle capacity and no market, so variable cost is mandatory"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "With idle capacity and no outside market, the seller's floor is variable cost ($40) — any price above $40 contributes to fixed-cost coverage with no sacrificed sales. The buyer's ceiling is the outside price ($52). The negotiated range is $40–$52: every price inside it beats both BATNAs (seller: $40+ beats idle; buyer: under-$52 beats outside). Corporate should expect agreement somewhere inside, with the exact point set by bargaining skill — which is precisely why negotiated transfer pricing preserves autonomy but creates price indeterminacy. Business interpretation: goal congruence holds for any in-range price (company saves $52 − transfer price per unit versus buying outside while the seller gains contribution). Mandating $40 or $52 would sacrifice one division's autonomy for precision. Common trap: treating variable cost as THE price rather than the floor.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-109",
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
    "ExplanationWrongA": "Option A concedes the full $12 margin to the seller. The buyer's ceiling is $52, but nothing forces the buyer to pay the ceiling — with 25,000 idle units and no outside market, the seller has no leverage to demand it. Paying $52 forfeits the entire internal-trade gain.",
    "ExplanationWrongB": "Option B predicts bargaining failure, but the $40–$52 range contains mutually beneficial prices — both sides beat their BATNAs anywhere inside. Failure would require irrationality or a misread of alternatives, not the economics of the situation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D treats the $40 floor as a mandatory price. Variable cost bounds the seller's acceptance region; it does not dictate the outcome — the seller will push above $40, and corporate's no-dictation stance means the final price reflects bargaining, not costing.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.110 transfer pricing without excess capacity",
    "MicroTopic": "transfer pricing opportunity cost",
    "UniqueConceptKey": "C-D110-transfer-pricing-opportunity-cost",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Same setup as the Components Division case, except it now operates at full capacity: all 100,000 units sell outside at $58 (variable cost $40, so $18 contribution each). Assembly still needs 20,000 units and can buy outside at $52. The selling manager, evaluated on divisional profit, is asked to divert 20,000 units internally. What is the minimum transfer price the seller rationally accepts, and what follows for the trade?",
    "Choices": {
      "A": "$40 — variable cost still floors the price since internal transfers carry no selling effort",
      "B": "$52 — matching the buyer's outside price keeps the buyer indifferent",
      "C": "$56 — splitting the difference between $52 outside and $58 market",
      "D": "$58 — the seller must recover the full outside contribution on diverted units, so no mutually beneficial price exists"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "At full capacity, every internal unit displaces an outside sale contributing $58 − $40 = $18. The seller's floor becomes variable cost plus opportunity cost: $40 + $18 = $58 (full market price). The buyer's ceiling remains the $52 outside price. Floor ($58) exceeds ceiling ($52) — the bargaining range is empty, so no voluntary price serves both divisions; the trade should not happen internally, and Assembly should buy outside at $52. Business interpretation: forcing the transfer at any price between would tax one division to subsidize the other, destroying the profit-center accountability the structure was built for. If corporate wants the internal trade for strategic reasons, it must mandate it and adjust performance measures accordingly. Common trap: carrying the $40 excess-capacity floor into a full-capacity situation.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-110",
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
    "ExplanationWrongA": "Option A reuses the excess-capacity floor ($40) after the facts changed. At full capacity the floor rises by the $18 of displaced outside contribution. Ignoring opportunity cost is the distinctive full-capacity error.",
    "ExplanationWrongB": "Option B prices at the buyer's ceiling ($52), which leaves the seller $6 short of its $58 outside alternative on every unit — a $120,000 forced subsidy. A profit-accountable seller rationally refuses.",
    "ExplanationWrongC": "Option C splits the difference ($56), which still taxes the seller $2 × 20,000 = $40,000 while gifting Assembly a below-market price. Split-the-difference feels fair but violates both divisions' economics — the range is empty, not narrow.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE1B;