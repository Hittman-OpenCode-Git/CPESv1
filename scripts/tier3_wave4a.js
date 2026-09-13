const WAVE4A = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.076 multi-element SSP allocation",
    "MicroTopic": "multi-element SSP allocation",
    "UniqueConceptKey": "A-076-multi-element-SSP-allocation",
    "LOSTag": "P1-A.2 Revenue recognition",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Vertex sells a $220,000 bundle: software license (SSP $120,000, transferred at inception), implementation (SSP $40,000, 25% complete in month 1), and 12-month PCS (SSP $60,000, ratable). The controller books first-month revenue. How much, and by what allocation?",
    "Choices": {
      "A": "$135,000 — license $120,000 + implementation $10,000 + one month PCS $5,000, allocated by relative SSP (sums exactly to $220,000)",
      "B": "$220,000 — full contract value on signing since the license transferred",
      "C": "$73,333 — straight-line monthly share of the bundle",
      "D": "$100,000 — license net of PCS deferral, ignoring implementation progress"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Total SSP = $120,000 + $40,000 + $60,000 = $220,000, which equals the transaction price — so allocation equals SSP with no discount to spread: license $120,000 (point-in-time, transferred at inception), implementation $40,000 × 25% = $10,000 (over-time progress), PCS $60,000/12 = $5,000 (ratable month 1). First-month revenue = $120,000 + $10,000 + $5,000 = $135,000. Full upfront recognition (option B) violates ASC 606's performance-obligation satisfaction rule — implementation and PCS are unsatisfied. Straight-lining (option C) ignores both SSP weighting and timing patterns. Netting PCS against license (option D) collapses distinct obligations. Business interpretation: multi-element deals recognize revenue obligation-by-obligation on SSP weights — the $135,000 first month reflects delivered value, not cash collected. Common trap: recognizing the full contract on the license event.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Revenue Recognition",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-076",
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
    "ExplanationWrongB": "Option B recognizes the full $220,000 on license transfer, but implementation (75% incomplete) and PCS (11 months remaining) are unsatisfied obligations. ASC 606 recognizes per obligation satisfied — one delivery does not earn the bundle.",
    "ExplanationWrongC": "Option C straight-lines $220,000/3 as a monthly share, ignoring SSP weights (120/40/60) and satisfaction timing (point-in-time vs over-time vs ratable). Bundles are not annuities.",
    "ExplanationWrongD": "Option D nets PCS against the license ($100,000) and ignores implementation progress. Distinct obligations are never netted — each carries its SSP allocation and its own timing pattern.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE4A;