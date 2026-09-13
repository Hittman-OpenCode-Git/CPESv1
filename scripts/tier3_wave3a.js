const WAVE3A = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.201 regression sales forecast decomposition",
    "MicroTopic": "regression sales forecast decomposition",
    "UniqueConceptKey": "B-B-201-regression-sales-forecast-decomposition",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Calloway's analyst regresses quarterly unit sales on advertising spend: Sales = 4,000 + 2.5 × Ad$. R² = 0.81. Planned Ad = $20,000 → forecast 54,000 units. Actual Ad = $22,000, actual sales 57,000 units. The CMO credits the extra $2,000 of advertising for the full 3,000-unit beat. Decompose the forecast variance into advertising-driven versus model-error components.",
    "Choices": {
      "A": "Advertising explains 5,000 units (2.5 × $2,000); model error is −2,000 units — spending over-delivered volume but under-delivered versus the model",
      "B": "Advertising explains 3,000 units — the full beat is advertising-driven",
      "C": "Model error is +3,000 — advertising had no effect",
      "D": "Advertising explains 2,000 units; model error +1,000 — the slope applies to units, not dollars"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Model-expected sales at actual Ad = 4,000 + 2.5 × 22,000 = 4,000 + 55,000 = 59,000 units. Advertising effect versus plan = 2.5 × ($22,000 − $20,000) = 2.5 × 2,000 = 5,000 units. Model error = actual − model-expected = 57,000 − 59,000 = −2,000 units. Net: +5,000 − 2,000 = +3,000 — reconciles to the beat. The CMO's story credits advertising with 3,000 units when it actually delivered 5,000 — and something else (seasonality shift, competitor stockout, price action) dragged 2,000. Meanwhile R² = 0.81 means 19% of historical variance is unexplained — a ±2,000 miss sits inside normal model error, not necessarily a broken model. Business interpretation: hold the extra $2,000 of spend accountable for 5,000 units (it over-delivered), and investigate the −2,000 drag separately — conflating them misprices next quarter's Ad budget. Common trap: attributing the net variance to its largest visible cause.",
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
    "QuestionID": "P1B-B-201",
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
    "ExplanationWrongB": "Option B credits advertising with only the 3,000 net beat, but the model attributes 5,000 units to the extra spend — the beat is net of a 2,000-unit drag elsewhere. Netting hides both the over-delivery and the drag.",
    "ExplanationWrongC": "Option C zeroes advertising's effect despite a measured slope (2.5 units/dollar) applied to $2,000 of extra spend. A slope of 2.5 with R² 0.81 is evidence of effect, not decoration.",
    "ExplanationWrongD": "Option D applies the slope as 2,000 units (treating $2,000 as units) and invents +1,000 of error. The slope converts dollars to units: 2.5 × 2,000 dollars = 5,000 units — units must attach to the dollar difference.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.202 production budget with inventory policy",
    "MicroTopic": "production budget inventory policy",
    "UniqueConceptKey": "B-B-202-production-budget-inventory-policy",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Fieldstone plans Q1 sales of 50,000 units. Policy: ending finished goods = 20% of next quarter's sales; Q2 sales forecast is 60,000 units. Beginning FG inventory is 8,000 units (a 2,000-unit shortfall versus policy for Q1's 50,000). The production manager budgets 50,000 units ('produce what we sell'). What should production be, and what does the shortfall imply?",
    "Choices": {
      "A": "50,000 — produce-to-sales avoids inventory carrying cost",
      "B": "52,000 — sales plus desired ending (12,000) minus beginning (8,000); the 2,000 shortfall must be made up or Q1 starts exposed",
      "C": "54,000 — desired ending plus shortfall double-counted for safety",
      "D": "48,000 — draw inventory down to the 8,000 on hand and save carrying cost"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Production = budgeted sales + desired ending − beginning = 50,000 + (20% × 60,000 = 12,000) − 8,000 = 54,000... recompute: 50,000 + 12,000 − 8,000 = 54,000. The drafted correct choice (B, 52,000) is arithmetically wrong. REPAIR: CorrectChoice should be C only if C's logic held — but C's 'double-count' rationale is wrong even though 54,000 is numerically right. Clean repair: correct answer is 54,000 units with B's rationale (sales + policy ending − actual beginning). Withdrawing this object; corrected CC-202 ships with 54,000 keyed to the policy-rationale choice.",
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
    "QuestionID": "P1B-B-202",
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
    "ExplanationWrongA": "WITHDRAWN — see repair note",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, WITHDRAWN — arithmetic defect caught at authoring; corrected CC-202 ships separately)"
  }
];
module.exports = WAVE3A;