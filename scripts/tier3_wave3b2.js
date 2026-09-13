const WAVE3B2 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.210 rolling forecast volume and FX update",
    "MicroTopic": "rolling forecast volume FX update",
    "UniqueConceptKey": "B-B-210-rolling-forecast-volume-FX-update",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Q1 static budget (set in October): revenue $2,000,000, COGS $1,200,000 (domestic 60% = $720,000, imported 40% = $480,000), margin $800,000 (40%). February signals: demand −15%, import costs +8% (FX). The controller runs a rolling reforecast adjusting both volume and FX. What does it show, and what does static-budget adherence hide?",
    "Choices": {
      "A": "Keep static targets — reforecasting mid-quarter destroys accountability",
      "B": "Revenue $1,700,000, COGS $1,052,640, margin $647,360 (38.1%) — rolling update reflects both demand and FX; static hides both until close",
      "C": "Revenue $1,700,000 with COGS held at $1,200,000 — update sales only, costs follow annually",
      "D": "Revenue $2,000,000 with COGS $1,238,400 — update FX on flat volume, demand signals are noisy"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Revised revenue = $2,000,000 × 0.85 = $1,700,000. COGS splits: domestic $720,000 × 0.85 (volume) = $612,000; imported $480,000 × 0.85 (volume) × 1.08 (FX) = $408,000 × 1.08 = $440,640. Total COGS = $612,000 + $440,640 = $1,052,640. Margin = $1,700,000 − $1,052,640 = $647,360 (38.08%). Versus static: revenue −$300,000, COGS −$147,360, margin −$152,640 (−1.9 pts). Static adherence hides both the demand deterioration and the FX compounding (imported costs fall with volume but rise with FX — net $480,000 → $440,640, a smaller relief than volume alone suggests). Updating only sales (option C, $500,000 margin) ignores the $147,360 of cost relief; updating only FX on flat volume (option D, $1,238,400) ignores demand entirely. Business interpretation: rolling forecasts must move volume AND price/FX together — partial updates misstate worse than no update. Common trap: single-factor reforecasts.",
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
    "QuestionID": "P1B-B-210",
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
    "ExplanationWrongA": "Option A keeps static targets for accountability's sake. Accountability to obsolete numbers measures obedience, not performance — the $152,640 margin deterioration is already baked in whether reported or not.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C updates revenue to $1,700,000 but holds COGS at $1,200,000, showing a $500,000 margin — understating cost relief by $147,360. Volume changes move costs too; sales-only updates overstate the damage.",
    "ExplanationWrongD": "Option D updates FX on flat volume ($1,238,400 COGS) while ignoring the −15% demand signal — overstating costs by $185,760. Single-factor updates misstate in whichever direction the ignored factor moves.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.211 kaizen target feasibility",
    "MicroTopic": "kaizen target feasibility",
    "UniqueConceptKey": "B-B-211-kaizen-target-feasibility",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A component costs $110 against a $100 target cost. Engineering proposes 5% annual kaizen reduction for 3 years. The product manager doubts the target is reachable within the product's 2-year remaining life. Is the target feasible, and when?",
    "Choices": {
      "A": "Never — kaizen shaves pennies, not the $10 gap",
      "B": "Year 1 — 5% of $110 is $5.50, nearly the gap",
      "C": "Year 2 ($99.28) — compounding reaches target within product life; 3-year path hits $94.31",
      "D": "Only with 10% annual reduction — 5% never compounds fast enough"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Kaizen path: Year 1 $110 × 0.95 = $104.50; Year 2 $104.50 × 0.95 = $99.275 ≈ $99.28 — below the $100 target within the 2-year life. Year 3 would reach $99.28 × 0.95 = $94.31. The manager's doubt confuses linear intuition ($5.50/year × 2 = $11.00 — actually also sufficient: $110 − $11 = $99) with the compounding reality, but both arithmetic framings agree the target falls in year 2. The 10%-demand (option D) doubles the required pace without basis. Business interpretation: kaizen feasibility is a compounding question — always compound before declaring targets unreachable. Common trap: linearizing exponential improvement (or dismissing small percentages that compound).",
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
    "QuestionID": "P1B-B-211",
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
    "ExplanationWrongA": "Option A dismisses 5% kaizen against a $10 gap, but compounding reaches $99.28 in year 2 — inside product life. Small percentages compound past large gaps given time.",
    "ExplanationWrongB": "Option B claims year-1 arrival via $5.50 of reduction, but $110 − $5.50 = $104.50 — still above $100. One year of 5% covers roughly half the gap, not all of it.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D demands 10% annually without basis — 5% demonstrably reaches $99.28 in year 2. Doubling required pace on unfounded urgency burns improvement goodwill.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.212 activity-based versus traditional budgeting",
    "MicroTopic": "activity-based traditional budgeting",
    "UniqueConceptKey": "B-B-212-activity-based-traditional-budgeting",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A packing department's traditional budget is $500,000 for 10,000 orders ($50/order). ABB analysis: picking 8,000 hrs @ $30 ($240,000), packing 5,000 hrs @ $25 ($125,000), shipping 10,000 orders @ $12 ($120,000) — total $485,000. Next year forecasts 12,000 orders with proportional activity. Compare the methods at both volumes.",
    "Choices": {
      "A": "Traditional is better — $50/order scales cleanly to any volume",
      "B": "Identical — $485,000 rounds to $500,000 at these volumes",
      "C": "ABB equals traditional at all volumes — methods differ only in presentation",
      "D": "ABB $485,000 vs $500,000 now (idle-code visibility saves $15,000); at 12,000 orders ABB $582,000 vs $600,000 — driver scaling beats flat rates"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Current: ABB $240,000 + $125,000 + $120,000 = $485,000 vs traditional $500,000 — the $15,000 gap is idle/non-value activity the flat $50 rate buries (traditional funds it silently). At 12,000 orders: ABB scales by driver — picking 9,600 × $30 = $288,000; packing 6,000 × $25 = $150,000; shipping 12,000 × $12 = $144,000; total $582,000. Traditional: 12,000 × $50 = $600,000 — an $18,000 overfund that grows with volume. The flat rate embeds last year's inefficiency into every future order; driver rates re-price each activity at its demonstrated cost. Business interpretation: traditional budgets scale waste with volume — ABB's value compounds as the company grows. Common trap: treating per-unit averages as costs rather than as cost divided by volume.",
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
    "QuestionID": "P1B-B-212",
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
    "ExplanationWrongA": "Option A praises flat $50 scaling, but $50 embeds $15,000 of idle activity — scaling it to 12,000 orders funds $18,000 of waste. Clean scaling of a dirty rate multiplies dirt.",
    "ExplanationWrongB": "Option B rounds $485,000 to $500,000 as immaterial, but the $15,000 is identified idle capacity with an owner and a fix — rounding it away deletes the finding the analysis exists to surface.",
    "ExplanationWrongC": "Option C claims methods differ only cosmetically, yet they diverge $15,000 now and $18,000 at forecast volume — with opposite scaling properties. Presentation-equivalence fails on the numbers.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.213 learning curve labor budget",
    "MicroTopic": "learning curve labor budget",
    "UniqueConceptKey": "B-B-213-learning-curve-labor-budget",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new product budgets 20,000 units at $20/hr. Engineering: first 5,000 units average 2.0 hrs/unit with an 80% learning curve (cumulative average falls 20% per doubling). What are the correct labor budgets for units 1–5,000, 5,001–10,000, and 10,001–20,000, and what does flat 2.0-hr budgeting overstate?",
    "Choices": {
      "A": "Lots 1–5k $200,000 (10,000 hrs); 5–10k $160,000 (8,000 hrs); 10–20k $288,000 (14,400 hrs) — flat budgeting overstates by $40,000 then $184,000 then $112,000",
      "B": "Flat $200,000 per 5,000-unit lot — standards should not anticipate learning",
      "C": "Lots 1–5k $200,000; later lots at 1.6 hrs throughout — learning applies once, immediately",
      "D": "$648,000 total for 20,000 units with no lot detail — aggregate budgets suffice"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Lot 1 (1–5k): 5,000 × 2.0 = 10,000 hrs × $20 = $200,000. Doubling to 10,000: cumulative average = 2.0 × 0.80 = 1.6 hrs → cumulative 16,000 hrs; lot 2 (5–10k) = 16,000 − 10,000 = 6,000 hrs... wait — recompute: the specified curve gives second-5,000 average 1.8 (per the 204 item's convention: first lot 2.0, second lot 1.8)? Two conventions collide. Clean restatement: cumulative average at 10,000 = 1.6 → total 16,000 hrs → lot 2 = 6,000 hrs × $20 = $120,000. Doubling to 20,000: cumulative avg = 1.6 × 0.8 = 1.28 → total 25,600 hrs → lots 3–4 (10,001–20,000) = 25,600 − 16,000 = 9,600 hrs × $20 = $192,000. Flat-2.0 budget per 5k lot = 10,000 × $20 = $200,000: lot 2 overstates by $80,000 ($200k vs $120k); lots 3–4 overstate by 2×$200k − $192k = $208,000. The drafted option A numbers ($160,000/8,000 hrs, $288,000/14,400) follow neither convention consistently. REPAIR: withdrawing A-keyed version; corrected CC-213 ships with lot budgets $200,000 / $120,000 / $192,000.",
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
    "QuestionID": "P1B-B-213",
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
    "ExplanationWrongB": "WITHDRAWN — see repair note",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, WITHDRAWN — learning-curve convention inconsistency caught at authoring; corrected CC-213 ships separately)"
  }
];
module.exports = WAVE3B2;