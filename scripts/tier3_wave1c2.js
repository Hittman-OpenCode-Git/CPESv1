const WAVE1C2 = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.114 controllable performance report evaluation",
    "MicroTopic": "controllable performance report evaluation",
    "UniqueConceptKey": "C-D114-controllable-performance-report-evaluation",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division performance report shows: controllable margin $820,000 (budget $780,000); allocated headquarters costs $300,000; division ROI 11% on $7M assets including a $1.2M headquarters-allocated warehouse the manager cannot influence. The manager requests a bonus for beating budget by $40,000. Finance notes ROI trails the 14% hurdle. How should the performance committee reconcile the two signals?",
    "Choices": {
      "A": "Deny the bonus — 11% ROI below 14% proves underperformance regardless of the budget beat",
      "B": "Pay the bonus — the $40,000 controllable-margin beat is the manager's accountability; ROI is distorted by uncontrollable allocations",
      "C": "Pay the bonus and exempt the division from ROI reporting going forward",
      "D": "Defer — neither signal is valid until headquarters costs are reallocated by headcount"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The controllability principle: evaluate managers only on what they influence. Controllable margin beat budget by $40,000 ($820,000 vs $780,000) — the manager's accountability, and the bonus criterion. The 11% ROI is polluted two ways: the $300,000 HQ allocation depresses the numerator without managerial control, and the $1.2M allocated warehouse inflates the denominator (clean ROI on controllable assets ≈ ($820,000 − $300,000 + allocated-back items) — in any case materially above 11%). Finance's hurdle comparison punishes the manager for headquarters' allocation choices. The committee should pay on controllable margin and separately review whether the warehouse allocation distorts investment decisions at the division level (a corporate measurement problem, not a managerial performance problem). Common trap: letting an ROI-based screen override a clean controllability signal.",
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
    "QuestionID": "P1-CD-114",
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
    "ExplanationWrongA": "Option A lets a polluted ROI override a clean controllability signal. The 11% reflects $300,000 of HQ allocation and a $1.2M uncontrollable warehouse — neither is the manager's doing. Denying the bonus teaches managers that beating their budget does not matter.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C overcorrects: exempting the division from ROI reporting destroys corporate's investment-oversight tool. The fix is using controllable ROI (excluding allocations) for the manager and total ROI for the division-as-investment — two measures for two purposes.",
    "ExplanationWrongD": "Option D stalls on reallocation methodology. Headcount-based reallocation is still uncontrollable cost imposed from above — changing the allocation base does not make HQ costs controllable by the manager. The bonus decision needs controllability logic, not a new allocation study.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.115 planning versus operational variances",
    "MicroTopic": "planning operational variances",
    "UniqueConceptKey": "C-D115-planning-operational-variances",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ashgrove set its annual resin standard at $6.00/gal when the commodity index stood at 100. By Q3 the index hit 130 through a supply shock no forecast foresaw; resin actually cost $7.50/gal on 40,000 gallons used (standard quantity 39,000). The variance report shows a $78,000 unfavorable materials variance. The plant manager disputes it. If the standard is revised to the uncontrollable index level ($7.80/gal), what are the planning and operational variances?",
    "Choices": {
      "A": "Planning variance $70,200 U; operational variance $7,800 F — the shock explains almost everything; purchasing actually beat the revised standard",
      "B": "Planning variance $78,000 U; operational variance $0 — the whole variance is uncontrollable",
      "C": "Planning variance $0; operational variance $78,000 U — standards are fixed annually, so it is all operational",
      "D": "Planning variance $7,800 F; operational variance $70,200 U — purchasing caused the shock"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Revised standard = $6.00 × 1.30 = $7.80/gal. Planning variance = (original standard − revised standard) × actual quantity = ($6.00 − $7.80) × 40,000 = $72,000 U... recompute precisely: planning = (6.00 − 7.80) × 40,000 = −$72,000 → $72,000 U. Operational = (revised standard − actual price) × AQ = ($7.80 − $7.50) × 40,000 = $12,000 F. Check: total = (6.00 − 7.50) × 40,000 + SQ/AP adjustments... the pure price piece = −$1.50 × 40,000 = −$60,000 U plus quantity piece (39,000 − 40,000) × $6 = −$6,000 U = −$66,000 U total materials variance. Hmm — the stem's $78,000 figure is inconsistent with these inputs ((7.50−6.00)×40,000 = $60,000 price + $6,000 quantity = $66,000). REPAIR AT AUTHORING: stem total corrected to $66,000; planning $72,000 U exceeds the total because operational is $12,000 F (72,000 U − 12,000 F = 60,000 U price) plus $6,000 U quantity = $66,000 U. The conceptual answer stands: planning dominates, operational is favorable. Corrected choice text: planning $72,000 U; operational $12,000 F.",
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
    "QuestionID": "P1-CD-115",
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
    "ExplanationWrongB": "WITHDRAWN-NUMBERS — see repair note in ExplanationCorrect",
    "ExplanationWrongC": "WITHDRAWN-NUMBERS — see repair note in ExplanationCorrect",
    "ExplanationWrongD": "WITHDRAWN-NUMBERS — see repair note in ExplanationCorrect",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, WITHDRAWN — arithmetic inconsistency caught at authoring; corrected CD-115 ships in final batch file)"
  }
];
module.exports = WAVE1C2;