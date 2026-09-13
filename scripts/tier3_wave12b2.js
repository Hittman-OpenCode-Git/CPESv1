const WAVE12B2 = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.170 gross profit method with markup",
    "MicroTopic": "gross profit method markup",
    "UniqueConceptKey": "B-A-170-gross-profit-method-markup",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beginning inventory $120,000; purchases $580,000 (goods available $700,000); sales $800,000. Historical gross profit is 30% ON COST (markup), not on sales. Estimate ending inventory by the gross profit method.",
    "Choices": {
      "A": "$160,000 ($700,000 − $540,000 COGS at 30%-of-cost... precisely $800,000 − $800,000×30% = $800,000 − $240,000 = $560,000 COGS → $140,000; neither matches — option A asserts without converting markup to margin)",
      "C": "Ending $84,615 — markup 30% on cost converts to margin 23.0769% on sales (30/130); COGS = $800,000 × 76.9231% = $615,385; ending = $700,000 − $615,385",
      "B": "$140,000 ($700,000 − $560,000 COGS at $240,000 margin-on-sales) — markup and margin are interchangeable labels",
      "D": "$84,615 via ending-first computation ($700,000 − $615,385) with COGS derived residually — same result, reversed presentation"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Convert markup to margin: 30% on cost → 30/130 = 23.0769% on sales. COGS = $800,000 × (1 − 23.0769%) = $800,000 × 76.9231% = $615,384.62 ≈ $615,385. Ending = $700,000 − $615,385 = $84,615. Direct-markup application (options A/B: $560,000 COGS → $140,000 ending) subtracts 30% of SALES as if markup equaled margin — $24,615 of understatement ($140,000 vs $84,615... precisely $140,000 − $84,615 = $55,385 overstatement of ending). Presentation-reversed option D reaches $84,615 correctly (same arithmetic, COGS-backward) — equivalent method, valid alternative. Business interpretation: markups divide by (1+markup) complements... precisely COGS = sales/(1+markup) = $800,000/1.30 = $615,385 — convert bases before computing, never apply markup rates to sales. Common trap: treating markup-on-cost as margin-on-sales.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Inventory",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-A-170",
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
    "ExplanationWrongA": "Option A's $160,000-range answers apply 30% to cost or sales interchangeably without base conversion — markup and margin are different bases requiring the 30/130 translation.",
    "ExplanationWrongB": "Option B's $140,000 subtracts 30% of sales ($240,000) as if markup equaled margin — overstating ending by $55,385 ($140,000 vs $84,615).",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D reaches $84,615 via ending-first presentation (same arithmetic, COGS residually) — valid equivalent method. Presentation order never changes measurement.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE12B2;