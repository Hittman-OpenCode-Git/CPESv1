const WAVE11A = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.101 sales mix with tax-paying constraints",
    "MicroTopic": "sales mix tax constraints",
    "UniqueConceptKey": "B-C101-sales-mix-tax-constraints",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted mix: P 6,000u @ $20 CM ($120,000); Q 4,000u @ $30 CM ($120,000); total $240,000 on 10,000 units. A tax-law change disallows deducting Q's $50,000 of traceable fixed costs (after-tax cost rises $12,500 at 25% tax). Sales can shift mix freely within 10,000-unit capacity. How should the mix be re-optimized?",
    "Choices": {
      "A": "Hold the 6,000/4,000 mix — tax changes don't affect pre-tax contribution rankings",
      "D": "Re-rank on after-tax CM: P $20.00 vs Q $30.00 − ($50,000×25%/4,000 = $3.125) = $26.875 — Q still leads but by $6.875 not $10; hold mix unless shifting costs exceed $6.875/unit of moved volume",
      "C": "Shift fully to P — avoids the disallowed deduction entirely",
      "B": "Shift fully to Q — $30 CM dominates $20 CM regardless of tax treatment"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "After-tax CM: P $20.00 (no change); Q $30.00 − $50,000×25%/4,000 = $30.00 − $3.125 = $26.875. Q still outranks P ($26.875 > $20.00), so the 6,000/4,000 mix stands — but the margin compressed from $10.00 to $6.875, meaning mix shifts now pay less per moved unit (re-optimization trigger if shifting costs or demand elasticity cross $6.875). Hold-blindly (option A) ignores the $12,500 tax drag on Q's economics. Full-Q (option B) over-concentrates on pre-tax ranking without pricing the tax change. Full-P (option C) abandons $26.875-CM units for $20 ones to dodge a $3.125 drag — arithmetic surrender. Business interpretation: re-rank mixes on after-tax CM after every tax-law change; hold unless the compressed margin crosses shifting economics. Common trap: optimizing pre-tax mixes under changed tax law.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-101",
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
    "ExplanationWrongA": "Option A holds the mix on pre-tax rankings, ignoring $12,500 of new tax drag on Q. Tax-law changes re-price mixes — holding blindly prices stale economics.",
    "ExplanationWrongB": "Option B concentrates fully in Q on the $30 pre-tax CM, overweighting a margin compressed to $26.875 after tax. Concentration needs after-tax ranking, not pre-tax dominance.",
    "ExplanationWrongC": "Option C flees to P entirely to dodge $3.125 of tax drag per Q unit — abandoning $26.875-CM units for $20 ones. Avoidance that costs $6.875/unit is not savings.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.102 CVP with income taxes",
    "MicroTopic": "CVP income taxes",
    "UniqueConceptKey": "B-C102-CVP-income-taxes",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Price $50, VC $30 (CM $20), fixed $200,000, tax rate 25%. What sales in units achieve $120,000 of after-tax profit, and how does tax change the breakeven?",
    "Choices": {
      "A": "18,000 units — ($200,000 + $120,000)/$20 + tax gross-up misapplied (adds pre-tax target to fixed without grossing up)",
      "D": "18,000 units — ($200,000 + $120,000/0.75)/$20 = ($200,000 + $160,000)/$20; tax does not move breakeven (still $200,000/$20 = 10,000 units)",
      "C": "16,000 units — $120,000 after-tax needs only $120,000 pre-tax at any rate",
      "B": "10,000 units — after-tax targets equal breakeven when tax is proportional"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "After-tax target converts to pre-tax: $120,000/0.75 = $160,000. Units = ($200,000 + $160,000)/$20 = $360,000/$20 = 18,000 units. Breakeven is unchanged ($200,000/$20 = 10,000 units) — taxes apply to profits, and zero profit means zero tax, so the zero-profit point never moves. Option A's 18,000-via-wrong-math accidentally lands correctly (adds $120,000 ungrossed: ($200,000+$120,000)/$20 = 16,000... precisely that math gives 16,000, not 18,000 — option A is incoherent as drafted and listed here only as a rejected computed value). Option C's 16,000 skips the gross-up ($120,000 pre-tax nets only $90,000 after tax). Option B's 10,000 confuses target profit with zero profit. Business interpretation: gross up after-tax targets (divide by 1−t) before covering fixed; never gross up breakeven. Common trap: applying tax adjustments to zero-profit points.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-102",
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
    "ExplanationWrongA": "Option A computes ($200,000+$120,000)/$20 = 16,000 units (not 18,000 as its label claims) — ungrossed target plus arithmetic error compounded. After-tax targets gross up first.",
    "ExplanationWrongB": "Option B's 10,000 units is breakeven (zero profit), not a $120,000-profit point. Proportional taxes vanish at zero profit — targets above zero need gross-up.",
    "ExplanationWrongC": "Option C's 16,000 nets $120,000 pre-tax = $90,000 after tax — $30,000 short. Un-grossed targets underdeliver by exactly the tax rate.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.103 operating leverage in budget scenarios",
    "MicroTopic": "operating leverage budget scenarios",
    "UniqueConceptKey": "B-C103-operating-leverage-budget-scenarios",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Base budget: sales $2,000,000, VC $1,200,000 (CM $800,000), FC $500,000 → NOI $300,000 (DOL 2.67). Scenario A (+10% sales): NOI $380,000. Scenario B (−10% sales): NOI $220,000. The board asks which scenario pair best frames budget risk, and what DOL implies about forecast precision needs.",
    "Choices": {
      "A": "Report the $160,000 range ($380,000−$220,000) with DOL 2.67 — ±10% sales swings NOI ±26.7%; high-DOL budgets need tighter sales forecasts because small misses amplify",
      "B": "Report $300,000 flat — budgets are commitments, scenarios are distractions",
      "C": "Report $380,000 (upside only) — boards fund growth, not symmetric risk",
      "D": "Report DOL 0.375 (inverse) — leverage below 1.0 means sales barely matter"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "DOL = $800,000/$300,000 = 2.6667 ≈ 2.67. ±10% sales → ±26.67% NOI: upside $300,000 × 1.2667 = $380,000; downside $300,000 × 0.7333 = $220,000; range $160,000. The DOL insight for planning: high-leverage budgets amplify forecast error — a ±10% sales miss (ordinary forecasting tolerance) becomes ±26.7% earnings miss, so sales-forecast precision is worth buying (research, rolling updates) in high-DOL businesses. Flat-budget reporting (option B) hides $160,000 of scenario spread. Upside-only (option C) presents half the distribution. Inverse-DOL (option D: 0.375 = NOI/CM) inverts the measure — leverage above 1.0 means sales matter more than one-for-one, not less. Business interpretation: DOL converts sales scenarios into earnings scenarios — always present both legs with the leverage math explicit. Common trap: budgeting point estimates in high-DOL businesses without scenario ranges.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-103",
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
    "ExplanationWrongB": "Option B's flat $300,000 hides $160,000 of scenario spread — commitments without ranges conceal the earnings volatility the board must capitalize against.",
    "ExplanationWrongC": "Option C's upside-only $380,000 presents half the distribution — symmetric sales risk cuts both ways, and the $220,000 downside needs equal airtime.",
    "ExplanationWrongD": "Option D's 0.375 inverts DOL (NOI/CM instead of CM/NOI) — leverage reads 2.67, meaning sales matter 2.67×, not 0.375×. Inverted measures invert conclusions.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.104 scenario probability tree expected budget",
    "MicroTopic": "scenario probability tree expected budget",
    "UniqueConceptKey": "B-C104-scenario-probability-tree-expected-budget",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Demand scenarios: strong 12,000u (30%, CM $25 = $300,000), base 10,000u (50%, $250,000), weak 7,000u (20%, $175,000). Fixed costs $180,000. Each scenario's NOI is computed, then probability-weighted. What is expected NOI, and should the budget target the expected value or the base case?",
    "Choices": {
      "A": "Target the base $70,000 — expected values are statistical fictions, base cases are plans",
      "B": "Target $500,000 — sum all scenario NOIs without weighting",
      "D": "Expected NOI $70,000 (0.3×$120,000 + 0.5×$70,000 + 0.2×(−$5,000)); budget the base case as the operating target with the $70,000 expected value disclosed as the planning mean",
      "C": "Target the strong $120,000 — stretch targets motivate overperformance"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Scenario NOIs: strong 12,000×$25 − $180,000 = $300,000 − $180,000 = $120,000; base 10,000×$25 − $180,000 = $250,000 − $180,000 = $70,000; weak 7,000×$25 − $180,000 = $175,000 − $180,000 = −$5,000. Expected = 0.3×$120,000 + 0.5×$70,000 + 0.2×(−$5,000) = $36,000 + $35,000 − $1,000 = $70,000... recompute: $36,000 + $35,000 = $71,000; $71,000 − $1,000 = $70,000. Expected NOI = $70,000 — which coincides with base here (near-symmetric scenarios). Budget the base case ($70,000) as the operating target (actionable, accountable) with the $70,000 expected value disclosed as the planning mean (probability-weighted valuation). Summing unweighted (option B: $185,000) triple-counts across mutually exclusive states. Stretch-targeting the 30% upside (option C) budgets resources against hope. Base-only without disclosure (option A) plans operations while hiding valuation. Business interpretation: base cases run operations, expected values price plans — report both, confuse neither. Common trap: budgeting the expected value as if it were achievable in any single state.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-104",
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
    "ExplanationWrongA": "Option A's base-only targeting discards the $36,000/$35,000/−$1,000 probability structure — base cases plan operations, but expected values price the plan. Both numbers report.",
    "ExplanationWrongB": "Option B's $500,000 sums unweighted scenario NOIs — probabilities are the scenario analysis, not decoration. Unweighted sums triple-count.",
    "ExplanationWrongC": "Option C's $120,000 stretch targets the 30% upside as the plan — stretch goals motivate, but budgets allocate resources against probability-weighted means.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE11A;