const WAVE1315_PART_008 = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.211 material mix variance",
    "MicroTopic": "material mix variance",
    "UniqueConceptKey": "B-C-211-material-mix-variance",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard mix for 1,000 lbs of alloy: 600 lbs Grade X at $5.00 + 400 lbs Grade Y at $8.00 (standard cost $6,200). Actual: 1,100 lbs used — 550 lbs X at $5.20 + 550 lbs Y at $7.80; output 1,000 lbs. Compute mix and yield variances and judge the substitution.",
    "Choices": {
      "A": "Mix $120 F + yield $0 — substitutions within total quantity do not affect cost",
      "B": "Mix $300 U + yield $200 U — all deviations are unfavorable by definition",
      "C": "Mix = (550−660)×$5.00 + (550−440)×$8.00 = (−110×$5.00) + (110×$8.00) = −$550 + $880 = +$330 → $330 U (shifted 110 lbs from $5 X to $8 Y). Yield = (1,100−1,000)×$6.20 = 100×$6.20 = $620 U (100 excess lbs at weighted standard $6,200/1,000 = $6.20). Total $950 U — the substitution cost $330 in mix plus $620 in waste; reject it",
      "D": "Yield $620 F — using more inputs than standard is efficient"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Standard mix at actual total (1,100 lbs): X 60% × 1,100 = 660; Y 40% × 1,100 = 440. Mix = (550 − 660) × $5.00 + (550 − 440) × $8.00 = −$550 + $880 = +$330 → $330 U (110 lbs shifted from $5.00 X to $8.00 Y). Weighted standard = $6,200/1,000 = $6.20/lb. Yield = (1,100 − 1,000) × $6.20 = $620 U (100 lbs consumed beyond standard output). Total material variance $950 U. Zero-impact (option A) ignores the $3.00/lb grade spread — mix matters whenever input prices differ. All-unfavorable-by-definition (option B: $300/$200 invented) skips the arithmetic — variances compute, never default. Efficiency-inversion (option D: $620 F) reads excess consumption as favorable. Business interpretation: mix prices the recipe, yield prices the waste — the substitution failed on both ($330 richer mix + $620 more pounds). Common trap: netting mix against yield without decomposing.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-211",
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
    "ExplanationWrongA": "Option A's zero-impact ignores the $3.00/lb grade spread — shifting 110 lbs from $5.00 X to $8.00 Y costs $330 regardless of total quantity held.",
    "ExplanationWrongB": "Option B's $300/$200 invents totals without arithmetic — variances compute from mix proportions and yield quantities, never default to unfavorable.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D reads 100 excess lbs as $620 favorable — consuming beyond standard output is unfavorable by definition; direction follows actual-minus-standard.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.212 material yield with price change",
    "MicroTopic": "material yield price change",
    "UniqueConceptKey": "B-C-212-material-yield-price-change",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Same alloy process. New lot: 1,200 lbs used for 1,000 lbs output; actual prices X $5.50, Y $8.50 (market spike); actual mix 660 X + 540 Y. Standard unchanged ($5.00/$8.00, 60/40). Separate the market-driven price effect from mix/yield performance.",
    "Choices": {
      "A": "Price (660×$0.50 + 540×$0.50) = $330 + $270 = $600 U (market spike, purchasing monitored vs market index); mix at standard prices = (660−720)×$5.00 + (540−480)×$8.00 = (−60×$5.00) + (60×$8.00) = −$300 + $480 = $180 U; yield = (1,200−1,000)×$6.20 = $1,240 U. Operations owns $180 + $1,240 = $1,420; market owns $600 — judge operations on $1,420, purchasing against the index",
      "B": "Total $2,020 U all to operations — variances do not split across causes",
      "C": "Price $600 F — market price increases are favorable",
      "D": "Mix $180 F — shifting toward Y is favorable since Y performed better"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Price variance at actual mix: X 660 × ($5.50 − $5.00) = $330 U; Y 540 × ($8.50 − $8.00) = $270 U; total $600 U — market-wide spike (both grades +$0.50), purchasing judged against the market index, not the stale standard. Mix at STANDARD prices (isolating recipe from market): standard mix at 1,200 total = 720 X + 480 Y; (660 − 720) × $5.00 + (540 − 480) × $8.00 = −$300 + $480 = $180 U. Yield = (1,200 − 1,000) × $6.20 = $1,240 U. Operations owns $180 + $1,240 = $1,420. All-to-operations (option B: $2,020 lump) charges the shop for a market spike it never caused. Sign-flip (option C) reads higher prices as favorable. Mix-inversion (option D: $180 F) misreads a shift toward the $8.00 grade as savings. Business interpretation: value mix/yield at standard prices to quarantine market noise — operations answers for recipe and waste, purchasing answers vs the index. Cross-check: $600 + $180 + $1,240 = $2,020 total ✓. Common trap: charging operations for market price movements.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-212",
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
    "ExplanationWrongB": "Option B's $2,020 lump charges operations for a $600 market spike — price effects belong to purchasing-vs-index evaluation, never the shop floor.",
    "ExplanationWrongC": "Option C reads a $0.50/lb market spike as $600 favorable — paying more than standard is unfavorable by definition.",
    "ExplanationWrongD": "Option D misreads shifting 60 lbs toward the $8.00 grade as savings — richer mixes cost more; $180 U, never $180 F.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.213 labor mix yield variance",
    "MicroTopic": "labor mix yield variance",
    "UniqueConceptKey": "B-C-213-labor-mix-yield-variance",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard crew for 1,000 units: 800 skilled hrs at $25 + 200 unskilled at $15 (standard cost $23,000; 1,000 total hrs). Actual: 1,050 hrs — 600 skilled at $26 + 450 unskilled at $15.50; output 1,000 units. Compute labor mix and yield variances.",
    "Choices": {
      "A": "Mix $0 — labor grades are interchangeable so mix does not matter",
      "B": "Yield $1,150 F — working more hours than standard is efficient",
      "C": "Mix and yield both $500 U — symmetric deviations split evenly",
      "D": "Standard mix at 1,050 actual hrs: skilled 840 + unskilled 210. Mix = (600−840)×$25 + (450−210)×$15 = (−240×$25) + (240×$15) = −$6,000 + $3,600 = −$2,400 → $2,400 F (cheaper mix). Yield = (1,050−1,000)×$23.00 = 50×$23.00 = $1,150 U (50 excess hrs at weighted $23,000/1,000 = $23.00). Net −$1,250 → $1,250 F — the cheap-mix saving ($2,400) outweighs the overtime ($1,150), but monitor quality fallout"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Standard proportions: skilled 80%, unskilled 20%. At 1,050 actual hours: standard mix = 840 skilled + 210 unskilled. Mix = (600 − 840) × $25 + (450 − 210) × $15 = −$6,000 + $3,600 = −$2,400 → $2,400 F (240 hrs shifted from $25 to $15 labor). Weighted standard rate = $23,000/1,000 = $23.00/hr. Yield = (1,050 − 1,000) × $23.00 = $1,150 U (50 hrs beyond standard). Net = $2,400 F − $1,150 U = $1,250 F. Zero-mix (option A) ignores the $10/hr grade spread across 240 shifted hours. Yield-inversion (option B: $1,150 F) reads 50 excess hours as savings. Even-split (option C: $500/$500) invents symmetry — mix and yield compute independently ($2,400 vs $1,150). Business interpretation: labor-mix gains fund yield losses here, but cheap-mix strategies carry quality/supervision risks the variance can't see — report the net with a quality watch. Common trap: celebrating favorable mix without yield context.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-213",
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
    "ExplanationWrongA": "Option A's zero-mix ignores 240 hrs shifted across a $10/hr grade spread — $2,400 of mix economics exists whether acknowledged or not.",
    "ExplanationWrongB": "Option B reads 50 excess hours as $1,150 favorable — hours beyond standard are unfavorable by definition.",
    "ExplanationWrongC": "Option C's $500/$500 symmetry invents equal splits — mix ($2,400 F) and yield ($1,150 U) compute independently and net to $1,250 F.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.214 overhead mix effects",
    "MicroTopic": "overhead mix effects",
    "UniqueConceptKey": "B-C-214-overhead-mix-effects",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Two products share a machining department (VOH $12/MH). Standard: P uses 2 MH/unit, Q uses 5 MH/unit. Budget: 10,000 P + 4,000 Q = 20,000 + 20,000 = 40,000 MH; VOH budget $480,000. Actual: 12,000 P + 3,000 Q; actual MH 24,000 + 15,000 = 39,000; VOH incurred $475,000. The manager claims efficiency gains (39,000 < 40,000 budgeted hours). Evaluate with mix-aware analysis.",
    "Choices": {
      "A": "Claim stands — 1,000 fewer hours than budget proves efficiency",
      "B": "Flex first: flexed MH = 12,000×2 + 3,000×5 = 24,000 + 15,000 = 39,000 (actual mix at actual volume). Spending = $475,000 − 39,000×$12 ($468,000) = $7,000 U. Efficiency = $12 × (39,000 − 39,000) = $0. Mix effect vs static: flexed $468,000 vs static $480,000 = $12,000 F — but that $12,000 is product-mix shift (P up 2,000, Q down 1,000: +4,000 MH − 5,000 MH = −1,000 MH), not efficiency. Verdict: spending control slipped $7,000 U; efficiency is on standard; the 1,000-hour 'gain' is mix shift toward light product P — report mix separately, not as efficiency",
      "C": "Efficiency $12,000 F + spending $7,000 U — net $5,000 F proves the manager right",
      "D": "Volume variance $12,000 U — producing more P than budgeted is unfavorable"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Mix-aware decomposition: flexed budget at ACTUAL mix/volume = 12,000×2 + 3,000×5 = 24,000 + 15,000 = 39,000 MH × $12 = $468,000. Spending = $475,000 − $468,000 = $7,000 U. Efficiency = $12 × (39,000 actual − 39,000 flexed) = $0 — exactly on standard. The static comparison (39,000 vs 40,000 = −1,000 MH × $12 = $12,000 F) is a MIX effect: P (+2,000 units × 2 MH = +4,000 MH) vs Q (−1,000 × 5 = −5,000 MH) net −1,000 MH — fewer hours because the mix shifted light, not because hours were saved. Claim-stands (option A) credits mix shift as efficiency. Net-verdict (option C: $5,000 F proves right) nets a $7,000 spending slip into a $12,000 mix artifact. Volume-inversion (option D: $12,000 U) misreads direction — fewer flexed hours than static is favorable in sign but mix in substance. Business interpretation: flex at actual mix before judging efficiency — static-vs-actual hour gaps confound volume, mix, and efficiency. The manager's efficiency is exactly standard; the story is mix. Common trap: reading static hour beats as efficiency gains.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-214",
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
    "ExplanationWrongA": "Option A credits 1,000 fewer hours as efficiency — the hours fell because mix shifted toward 2-MH product P (−1,000 MH net), not because any hour was saved.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C nets a $7,000 spending slip into a $12,000 mix artifact — $5,000 F verdict rewards overspending inside mix luck.",
    "ExplanationWrongD": "Option D misreads fewer flexed hours as $12,000 unfavorable — direction follows flexed-minus-static correctly ($12,000 F in sign), but substance is mix, never efficiency or volume failure.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.215 sales quantity versus budget share",
    "MicroTopic": "sales quantity budget share",
    "UniqueConceptKey": "B-C-215-sales-quantity-budget-share",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 40,000 units at $25 CM ($1,000,000). Actual: 43,000 units. Industry volume grew 10% (budget assumed 5% growth from the same base). The sales VP claims a 3,000-unit beat. Decompose into market-growth expectation vs sales performance.",
    "Choices": {
      "A": "3,000 × $25 = $75,000 F to sales — beats are beats",
      "B": "No variance — 43,000 exceeds 40,000 so performance is satisfactory by inspection",
      "C": "Market-expected volume = 40,000 × (1.10/1.05) = 40,000 × 1.047619 = 41,905 units. Growth-expectation variance = (41,905 − 40,000) × $25 = 1,905 × $25 = $47,619 F (market tailwind, not sales skill). Performance variance = (43,000 − 41,905) × $25 = 1,095 × $25 = $27,375 F (genuine beat). Verdict: $27,375 of skill inside $75,000 of headline — credit $27,375, contextualize $47,619",
      "D": "Performance $75,000 U — growth above assumption proves the budget was sandbagged"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Re-based expectation: budget assumed 5% growth; market delivered 10% → expected volume at market growth = 40,000 × 1.10/1.05 = 40,000 × 1.0476190 = 41,904.76 ≈ 41,905. Growth-expectation leg = (41,905 − 40,000) × $25 = 1,905 × $25 = $47,619 F (tailwind). Performance leg = (43,000 − 41,905) × $25 = 1,095 × $25 = $27,375 F (skill). Total 3,000 × $25 = $75,000 F ✓ ($47,619 + $27,375 = $74,994 ≈ $75,000 rounding). Headline-credit (option A: $75,000 to sales) pays for $47,619 of market tailwind as though Sales created the industry. Inspection-pass (option B) skips decomposition — satisfactory totals can hide underperformance (had actual been 41,000, headline +$25,000 F would mask −$22,619 of share loss). Sandbagging charge (option D: $75,000 U) inverts the verdict — beating a stale assumption is information, and the budget was set on 5% forecasts honestly held. Business interpretation: re-base volume expectations for market growth before crediting sales — headline beats split into tailwind and skill. Common trap: crediting market growth as sales performance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-215",
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
    "ExplanationWrongA": "Option A's $75,000 credits $47,619 of industry tailwind as sales skill — re-based expectations separate market gifts from managed performance.",
    "ExplanationWrongB": "Option B skips decomposition — satisfactory totals can mask share loss; methodical splits, never inspection, evaluate sales.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D inverts a beat into sandbagging punishment — honest 5% forecasts overtaken by 10% markets are forecast error, never manipulation evidence.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.216 cost of quality trend evaluation",
    "MicroTopic": "cost quality trend evaluation",
    "UniqueConceptKey": "B-C-216-cost-quality-trend-evaluation",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quality costs (% of sales): Year 1 — prevention 1%, appraisal 3%, internal failure 8%, external 6% (total 18%). Year 3 — prevention 4%, appraisal 4%, internal 3%, external 2% (total 13%). Sales $10M both years. The CFO notes total quality cost fell $500,000 and asks whether the program worked and what remains.",
    "Choices": {
      "A": "Worked fully — 18% to 13% is success; hold spending flat now",
      "B": "Failed — prevention tripled from 1% to 4% ($300,000 extra) with no offset",
      "C": "Total-only view suffices — $500,000 saved is $500,000 saved regardless of mix",
      "D": "Worked structurally: failure costs fell 14% to 5% of sales ($1.4M to $0.5M = $900,000 saved) while conformance investment rose 4% to 8% ($400,000 to $800,000 = $400,000 spent) — $900,000 of failure eliminated per $400,000 of prevention/appraisal (2.25:1 return). Remaining: external still 2% ($200,000 — warranty exposure); internal 3% ($300,000 — process variation). Verdict: continue shifting mix toward prevention (target external <1%); do not freeze at 13%"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Category arithmetic (on $10M sales): Y1 conformance 1% + 3% = 4% ($400,000); failure 8% + 6% = 14% ($1,400,000); total 18% ($1,800,000). Y3 conformance 4% + 4% = 8% ($800,000); failure 3% + 2% = 5% ($500,000); total 13% ($1,300,000). Delta: +$400,000 invested, −$900,000 failure → net −$500,000; return $900,000/$400,000 = 2.25:1. Freeze-verdict (option A: hold flat) stops the mix shift with $500,000 of failure still on the table — 13% total with 5% failure is mid-journey, never destination. Prevention-complaint (option B: $300,000 extra wasted) reads investment without returns — the $400,000 bought $900,000. Total-only (option C: $500,000 is $500,000) blinds the next decision — mix direction (more prevention? hold appraisal?) needs categories, never totals. Business interpretation: judge quality programs on failure-per-conformance-dollar with category trends — push prevention until external failure approaches its floor (<1%), then optimize. Common trap: freezing quality spending once totals fall.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Quality Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-216",
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
    "ExplanationWrongA": "Option A's freeze stops mid-journey — $500,000 of failure (5%) remains attackable; totals falling never means mix optimized.",
    "ExplanationWrongB": "Option B reads $400,000 of conformance investment without its $900,000 of failure returns — 2.25:1 payback is performance, never waste.",
    "ExplanationWrongC": "Option C's totals-only view blinds mix decisions — prevention vs appraisal allocation needs categories; totals report history, categories direct action.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.217 overtime premium variance ownership",
    "MicroTopic": "overtime premium variance ownership",
    "UniqueConceptKey": "B-C-217-overtime-premium-variance-ownership",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 1,000 units × 3 hrs × $20 = 3,000 hrs, $60,000. Actual: 1,000 units in 2,800 straight-time hrs at $20 ($56,000) + 400 overtime hrs at $30 ($12,000); total $68,000. Scheduling delays (planning) forced weekend work; the crew worked faster per hour once scheduled (2,800 + 400 = 3,200 hrs vs 3,000 standard — 200 excess). Split rate, efficiency, and ownership.",
    "Choices": {
      "A": "Rate $4,000 U (400×$10 premium) to scheduling/planning; efficiency at standard rate 200×$20 = $4,000 U to production supervision; total $8,000 U. Planning owns the premium (forced weekend), production owns the 200 excess hours (pace control). Neither owns both — the $8,000 splits by causation",
      "B": "$8,000 U all to production — hours are hours and production worked them",
      "C": "$8,000 U all to planning — scheduling caused everything downstream",
      "D": "$8,000 F — spending more than standard on overtime is favorable since output was met"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Rate leg: 400 overtime hrs × ($30 − $20) = 400 × $10 = $4,000 U — the premium exists because weekend work was forced (planning/scheduling causation). Efficiency leg at STANDARD rate: (3,200 − 3,000) × $20 = 200 × $20 = $4,000 U — pace control belongs to production supervision (200 hrs beyond standard regardless of rate paid). Total $8,000 U = $4,000 + $4,000 ✓ ($68,000 − $60,000). All-production (option B) charges the shop for planning's weekend forcing — causation assigns the premium to the forcer. All-planning (option C) excuses 200 excess hours — pace control stays with supervision even on forced weekends. Favorable-reading (option D: $8,000 F) inverts overspending — meeting output at $8,000 premium is effectiveness with inefficiency, never favorability. Business interpretation: overtime variances always split (premium→forcer, excess hours→pace owner) — single-owner overtime charges misprice accountability. Common trap: valuing overtime efficiency at the $30 premium rate (would double-count the premium as quantity).",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-217",
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
    "ExplanationWrongB": "Option B charges production for planning's weekend forcing — the $4,000 premium follows causation to the scheduler, never the scheduled.",
    "ExplanationWrongC": "Option C excuses 200 excess hours — forced weekends explain the premium, never the pace; supervision owns hours beyond standard at $20.",
    "ExplanationWrongD": "Option D reads $8,000 of premium spending as favorable — output met at premium cost is effectiveness with inefficiency, never favorability.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.218 scrap variance price versus usage",
    "MicroTopic": "scrap variance price usage",
    "UniqueConceptKey": "B-C-218-scrap-variance-price-usage",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard scrap allowance: 2% of 50,000 lbs ($6.00/lb) = 1,000 lbs ($6,000) with $2,000 expected recovery (net standard scrap cost $4,000). Actual: 1,600 lbs scrapped; recovery $2,400 ($1.50/lb vs $2.00 expected — weak scrap market). Decompose the net scrap variance.",
    "Choices": {
      "A": "Netting suffices — $6,000 standard vs actual cost is the only comparison that matters",
      "B": "Usage (600×$6.00) = $3,600 U (excess scrap) + recovery price ((600 excess... precisely recovery shortfall on all 1,600 lbs: 1,600×($2.00−$1.50) = $800 U) = $800 U (weak market) − recovery on excess volume... precisely total: gross scrap cost variance = (1,600−1,000)×$6.00 = $3,600 U; recovery variance = $2,000 expected − $2,400 actual = −$400 → $400 F (more pounds recovered despite lower price: 1,600×$1.50 = $2,400 vs $2,000). Net = $3,600 U − $400 F = $3,200 U — operations owns $3,600 of excess scrap; the market leg nets $400 favorable (volume beat price). Verdict: attack scrap volume, monitor scrap prices",
      "C": "Recovery $400 F proves the scrap program works — favorable is favorable",
      "D": "$3,600 U all to purchasing — materials cause all scrap"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Gross scrap variance = (1,600 − 1,000) × $6.00 = 600 × $6.00 = $3,600 U (excess volume — operations). Recovery variance = expected $2,000 − actual $2,400 = −$400 → $400 F — decomposing further: price effect 1,600 × ($2.00 − $1.50) = $800 U (weak market) vs volume effect (1,600 − 1,000) × $2.00 = $1,200 F (more pounds at standard recovery) → net $400 F. Total net = $3,600 U − $400 F = $3,200 U. Netting-only (option A) hides the $800 weak-market signal inside volume luck. Favorable-only (option C: $400 F proves success) celebrates a $3,200 net unfavorable through one sub-leg. All-purchasing (option D) charges buying for shop-floor scrap volume — causation stays with operations for excess pounds. Business interpretation: scrap economics have three legs (excess volume, recovery price, recovery volume) — the $400 F net recovery masks an $800 price deterioration worth monitoring. Common trap: netting recovery against scrap cost without decomposition.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-218",
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
    "ExplanationWrongA": "Option A's netting hides the $800 weak-market price signal inside recovery-volume luck — three legs need three readings.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C celebrates $400 F inside a $3,200 U net — sub-leg favorability never overrides total unfavorability.",
    "ExplanationWrongD": "Option D charges purchasing for 600 excess shop-floor pounds — scrap volume follows operations causation, never buying.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  }
];
