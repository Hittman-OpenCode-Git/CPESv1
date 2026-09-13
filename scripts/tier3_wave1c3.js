const WAVE1C3 = [
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
    "Stem": "Ashgrove set its annual resin standard at $6.00/gal when the commodity index stood at 100. By Q3 the index hit 130 through a supply shock no forecast foresaw; resin actually cost $7.50/gal on 40,000 gallons used (standard quantity 39,000). The variance report shows a $66,000 unfavorable total materials variance. The plant manager disputes it. If the standard is revised to the uncontrollable index level ($7.80/gal), what are the planning and operational variances?",
    "Choices": {
      "A": "Planning variance $72,000 U; operational variance $6,000 F — the shock explains the overrun, and purchasing actually beat the revised standard",
      "B": "Planning variance $66,000 U; operational variance $0 — the whole variance is uncontrollable",
      "C": "Planning variance $0; operational variance $66,000 U — standards are fixed annually, so it is all operational",
      "D": "Planning variance $12,000 F; operational variance $78,000 U — purchasing caused the shock"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Revised standard = $6.00 × 1.30 = $7.80/gal. Planning variance = (original standard − revised standard) × AQ = ($6.00 − $7.80) × 40,000 = $72,000 U — the portion caused by the unforeseeable index shock. Operational price variance = (revised standard − actual price) × AQ = ($7.80 − $7.50) × 40,000 = $12,000 F — purchasing beat even the shock-adjusted benchmark. Operational quantity variance = (AQ − SQ) × original SP = (40,000 − 39,000) × $6.00 = $6,000 U. Net operational = $12,000 F − $6,000 U = $6,000 F. Check: $72,000 U planning − $6,000 F operational = $66,000 U total — reconciles to the reported variance. Business interpretation: the manager owes nothing for the $72,000 of commodity shock but owns the $6,000 U usage overage; purchasing deserves credit for the $12,000 F buy. Without the split, accountability is backwards. Common trap: calling the entire variance uncontrollable (option B) — the $6,000 U usage variance remains operational.",
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
    "ExplanationWrongB": "Option B assigns the entire $66,000 to planning and zeroes operational. But purchasing beat the revised standard by $12,000 F (paid $7.50 vs $7.80) — that $12,000 F of operational outperformance is real and reportable. Blanket 'uncontrollable' treatment hides it.",
    "ExplanationWrongC": "Option C refuses to revise the standard, dumping the $72,000 commodity shock on operations. Standards contaminated by unforeseeable external shocks should be revised for control purposes (planning variance) — otherwise every downstream evaluation is noise.",
    "ExplanationWrongD": "Option D reverses causality and signs: purchasing did not cause the index shock (planning $72,000 U belongs to forecasting/environment), and purchasing beat the revised benchmark ($12,000 F), not the reverse. Both labels and logic are inverted.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.116 outdated standard revision decision",
    "MicroTopic": "outdated standard revision decision",
    "UniqueConceptKey": "C-D116-outdated-standard-revision-decision",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Elmworks set its labor standard at 5.0 hrs/unit three years ago. Learning-curve gains since have held actual usage at 4.6 hrs/unit for eight straight quarters (50,000 units/quarter, $30/hr). The efficiency variance runs $600,000 F yearly and everyone ignores it. Engineering confirms 4.7 hrs/unit is achievable with effort; the union warns that a 4.6 standard will be seen as a ratchet. What should the controller recommend?",
    "Choices": {
      "A": "Keep 5.0 hrs — changing standards destroys trend comparability",
      "B": "Tighten to 4.6 hrs exactly — actual performance is the standard",
      "C": "Revise to 4.9 hrs — split the difference to soften the message",
      "D": "Revise to 4.7 hrs through a participative engineering study — restores signal value while preserving motivation"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Current annual efficiency variance = (AQ − SQ) × SR = (230,000 − 250,000) × $30 = $600,000 F per quarter-scale... precisely per quarter: (4.6 − 5.0) × 50,000 × $30 = $600,000 F/quarter — a dead signal everyone discounts. Under a 4.7 standard, expected variance = (4.6 − 4.7) × 50,000 × $30 = $150,000 F/quarter: still favorable (recognizes continuous improvement) but tight enough to investigate deviations. Keeping 5.0 (option A) perpetuates a meaningless $600,000 F ritual. Tightening to exactly 4.6 (option B) is the ratchet effect: workers learn that improvements are confiscated as new minimums and stop improving — motivation destruction the union correctly flags. Splitting to 4.9 (option C) is arithmetic without engineering basis. The participative study matters because standards set with (not at) workers gain acceptance, satisfying both signal value and goal congruence. Business interpretation: standards are control instruments with behavioral side effects; calibrate for motivation, not just math. Common trap: equating 'attainable' with 'best-demonstrated performance'.",
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
    "QuestionID": "P1-CD-116",
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
    "ExplanationWrongA": "Option A preserves a dead $600,000 F ritual for comparability's sake. Trend comparability against an obsolete benchmark is precisely what makes the signal worthless — comparability to irrelevance is not a virtue.",
    "ExplanationWrongB": "Option B triggers the ratchet effect: setting the standard at best-demonstrated 4.6 teaches workers that every gain becomes next period's minimum, destroying improvement incentives. Attainable-with-effort (4.7) motivates; confiscatory (4.6) demoralizes.",
    "ExplanationWrongC": "Option C splits the difference (4.9) with no engineering basis — a negotiation outcome masquerading as analysis. Standards need engineering validity to survive challenge; 4.9 is neither the study's 4.7 nor current 4.6 reality.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.117 quality cost tradeoff in variances",
    "MicroTopic": "quality cost tradeoff variances",
    "UniqueConceptKey": "C-D117-quality-cost-tradeoff-variances",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Kestrel Molding switched to a discount polymer: SP $10/lb, AP $9/lb, 20,000 lbs used (SQ 20,000). Labor: SH 8,000 hrs, AH 11,500 hrs at $10/hr standard. Defects from the brittle polymer required 400 rework hours at $30/hr overtime. Purchasing claims a $20,000 victory. What is the true economics of the switch decision?",
    "Choices": {
      "A": "$20,000 F — purchasing's price saving stands alone as reported",
      "B": "Net $27,000 U against the switch — $35,000 U efficiency plus $12,000 rework against $20,000 F price; revert to the original supplier",
      "C": "$15,000 U — efficiency minus price, ignoring rework as a period cost",
      "D": "$47,000 U — price, efficiency, and rework are all unfavorable"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Price variance = 20,000 × ($10 − $9) = $20,000 F. Efficiency variance = (11,500 − 8,000) × $10 = $35,000 U. Rework cost = 400 × $30 = $12,000 (a direct consequence of the brittle polymer, properly charged to the decision). True decision economics: $20,000 F − $35,000 U − $12,000 = $27,000 U against the switch — a false economy. Purchasing's $20,000 'victory' is a silo metric that ignores the $47,000 of downstream damage. Business interpretation: evaluate sourcing decisions on total cost of quality (price + efficiency + rework + scrap + warranty), never on purchase-price variance alone — and fix the performance system so purchasing shares accountability for usage consequences. Common trap: treating rework as an unrelated period cost rather than decision-attributable.",
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
    "QuestionID": "P1-CD-117",
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
    "ExplanationWrongA": "Option A reports purchasing's silo metric as the decision outcome. The $20,000 F is real but partial — it ignores $35,000 of excess labor and $12,000 of rework the brittle polymer caused. Silo metrics are how false economies survive review.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C excludes the $12,000 rework as a period cost. Rework caused by the input decision is decision-attributable — excluding it understates the switch's cost by nearly half and flips no conclusion here only by luck of magnitudes.",
    "ExplanationWrongD": "Option D signs the $20,000 price variance unfavorable. Purchasing genuinely paid $1/lb less on 20,000 lbs — the saving is real and favorable. Denying it overstates the damage and destroys the analysis's credibility with purchasing.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE1C3;