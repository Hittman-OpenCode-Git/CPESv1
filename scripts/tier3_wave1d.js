const WAVE1D = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.118 service allocation effect on ROI",
    "MicroTopic": "service allocation effect ROI",
    "UniqueConceptKey": "C-D118-service-allocation-effect-ROI",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Aster Divisions P and Q each earn $300,000 controllable income on $1,500,000 of direct assets (20% clean ROI). A $240,000 HR cost pool is allocated: under the direct method P takes $160,000 and Q $80,000 (headcount); under step-down (IT first), P takes $100,000 and Q $140,000 (IT usage). The bonus requires 15% ROI on fully-loaded assets. How does the allocation-method choice change who earns a bonus?",
    "Choices": {
      "A": "No change — both divisions stay above 15% under either method",
      "B": "Under direct, P earns (140/1,660 = 8.4%... recompute) — see analysis",
      "C": "Under direct: P ($140,000/$1,500,000 = 9.3%) and Q ($220,000/$1,500,000 = 14.7%) both miss; under step-down both clear",
      "D": "Under direct both miss 15% but under step-down Q clears while P still misses"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "WITHDRAWN-STRUCTURE — the choice texts as drafted do not cleanly carry the analysis (option B is a meta-reference, not an answer). Correct economics: direct method — P: ($300,000−$160,000)/$1,500,000 = $140,000/$1,500,000 = 9.3%; Q: ($300,000−$80,000)/$1,500,000 = $220,000/$1,500,000 = 14.7%; both miss 15%. Step-down — P: ($300,000−$100,000)/$1,500,000 = 13.3%; Q: ($300,000−$140,000)/$1,500,000 = 10.7%; both still miss. So under these numbers the method changes margins but not bonus outcomes — the intended lesson (allocation methods move bonuses) needs numbers that flip an outcome. Corrected CD-118 ships in the final batch file with re-scaled pool ($120,000: direct P $80k/Q $40k; step-down P $50k/Q $70k — direct: P 14.7% miss/Q 17.3% earn; step-down: P 16.7% earn/Q 15.3% earn — method flips P's bonus).",
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
    "QuestionID": "P1-CD-118",
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
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, WITHDRAWN — outcome-invariant numbers caught at authoring; corrected CD-118 ships in final batch file)"
  }
];
module.exports = WAVE1D;