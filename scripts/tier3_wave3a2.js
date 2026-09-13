const WAVE3A2 = [
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
    "Stem": "Fieldstone plans Q1 sales of 50,000 units. Policy: ending finished goods = 20% of next quarter's sales; Q2 sales forecast is 60,000 units. Beginning FG inventory is 8,000 units (a 2,000-unit shortfall versus the 10,000 policy level implied by Q1 sales). The production manager budgets 50,000 units ('produce what we sell'). What should production be?",
    "Choices": {
      "A": "50,000 — produce-to-sales avoids inventory carrying cost",
      "B": "54,000 — sales (50,000) plus policy ending (12,000) minus actual beginning (8,000); the shortfall is automatically made up",
      "C": "56,000 — add the 2,000 shortfall again on top for safety",
      "D": "48,000 — draw inventory down to the 8,000 on hand and save carrying cost"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Production = budgeted sales + desired ending − beginning inventory = 50,000 + (20% × 60,000 = 12,000) − 8,000 = 54,000 units. The 2,000-unit beginning shortfall (policy implied 10,000 = 20% × 50,000, but only 8,000 on hand) is automatically recovered through the formula — no separate add-back is needed, which is exactly why option C double-counts (56,000). Produce-to-sales (option A, 50,000) leaves ending at 8,000 versus the 12,000 policy, starting Q2 exposed against 60,000 of forecast sales. Drawing down (option D, 48,000) compounds the shortfall. Business interpretation: the production-budget formula self-corrects beginning imbalances — trust it, and audit the policy percentage itself rather than overriding the math. Common trap: adding the shortfall twice (once in beginning, once as safety).",
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
    "ExplanationWrongA": "Option A produces to sales (50,000), leaving ending inventory at 8,000 against a 12,000 policy — Q2 starts 4,000 units exposed against 60,000 of forecast sales. Produce-to-sales works only with zero inventory policy.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C adds the 2,000 shortfall on top of the formula result (56,000), but the formula already recovers it (beginning 8,000 vs policy 10,000 flows through the subtraction). Double-counting safety stock is how 54,000 becomes 56,000.",
    "ExplanationWrongD": "Option D draws down to 48,000, deepening the shortfall from 2,000 to 4,000 against policy. Saving carrying cost by starving the shelf converts a recoverable gap into a stockout risk.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE3A2;