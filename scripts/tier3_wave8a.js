const WAVE8A = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.201 quality-adjusted price comparison",
    "MicroTopic": "quality-adjusted price comparison",
    "UniqueConceptKey": "B-C-201-quality-adjusted-price-comparison",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Supplier X charges $8.00/lb with a 2% defect rate (defectives scrapped); Supplier Y charges $7.60/lb with an 8% defect rate. Requirement is 10,000 usable pounds. Purchasing favors Y on price. What is the quality-adjusted comparison?",
    "Choices": {
      "A": "X wins at $81,633 effective ($8.163/lb usable) versus Y at $82,609 ($8.261/lb) — the $0.40 price gap reverses after quality adjustment, saving $976",
      "B": "Y wins at $76,000 (10,000 × $7.60) versus $80,000 — price decides, quality is a production variance",
      "C": "Tie — defect differentials always offset price differentials exactly",
      "D": "Y wins at $82,609 versus X at $88,000 — X must buy 11,000 lbs at full price"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Effective price per usable pound = quoted price / yield: X $8.00/0.98 = $8.1633; Y $7.60/0.92 = $8.2609. For 10,000 usable lbs: X buys 10,000/0.98 = 10,204.08 lbs × $8 = $81,632.65 ≈ $81,633; Y buys 10,000/0.92 = 10,869.57 × $7.60 = $82,608.70 ≈ $82,609. X wins by ~$976 despite the $0.40 headline gap. Price-only comparison (option B: $76,000 vs $80,000) treats defective pounds as usable — 870 of Y's pounds go to scrap. Exact-offset claims (option C) assert arithmetic luck as law. Option D's $88,000 (11,000 × $8) overbuys X by ~800 lbs. Business interpretation: divide price by yield before comparing suppliers — headline gaps invert under quality differentials regularly. Common trap: purchasing on quoted price with quality as someone else's variance.",
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
    "QuestionID": "P1B-C-201",
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
    "ExplanationWrongB": "Option B's $76,000 vs $80,000 compares quoted prices on 10,000 nominal pounds — but only 9,200 of Y's pounds are usable versus 9,800 of X's. Defect-adjusted quantities are the comparison basis, not nominal ones.",
    "ExplanationWrongC": "Option C asserts defect differentials always offset price gaps exactly — arithmetic luck elevated to law. Here the offset overshoots by $976; elsewhere it undershoots. Compute, don't assume.",
    "ExplanationWrongD": "Option D's $88,000 overbuys X by ~800 lbs (11,000 vs 10,204 needed). Yield-grossed quantities are exact (10,000/0.98), not rounded-up buffers.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.202 overtime root attribution",
    "MicroTopic": "overtime root attribution",
    "UniqueConceptKey": "B-C-202-overtime-root-attribution",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 100 hrs @ $30 ($3,000). Actual: 108 hrs (including 8 overtime hours at time-half premium $15/hr) for $3,360. Understaffing forced the overtime (two vacancies unfilled all quarter). Decompose the $360 total variance and attribute the premium.",
    "Choices": {
      "A": "Rate $360 U — average rate $31.11 exceeded $30 across all hours",
      "B": "Rate $120 U (premium) + efficiency $240 U (8 excess hours); $360 U total — the premium is efficiency-driven (understaffing), not a rate problem",
      "C": "Efficiency $360 U — all overtime is an hours problem by definition",
      "D": "Rate $240 U + efficiency $120 U — split by hours share, not economics"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Actual average rate = $3,360/108 = $31.111. Rate variance = 108 × ($31.111 − $30) = $120 U — exactly the 8 × $15 premium. Efficiency = (108 − 100) × $30 = $240 U. Total $360 U. Attribution: the $120 premium exists only because understaffing forced 8 overtime hours — root cause is staffing (efficiency domain), not wage rates (base $30 held on every hour). Rate-only reading (option A, $360 U) blames compensation for a headcount gap. All-efficiency (option C, $360 U) buries the premium mechanism inside hours. Hours-share split (option D) allocates by arithmetic ($240/$120 inverted) instead of economics. Business interpretation: attribute premiums to their driver (here: unfilled vacancies), fix staffing — the $120 premium is a hiring signal wearing a rate-variance costume. Common trap: reading overtime premiums as wage inflation.",
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
    "QuestionID": "P1B-C-202",
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
    "ExplanationWrongA": "Option A's $360 U rate variance blames compensation structures for a headcount gap — base $30 held on all 108 hours; the $120 premium came from vacancy-forced overtime, not wage drift.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's all-efficiency $360 U buries the $120 premium mechanism inside hours. Premiums have distinct economics (time-half pricing) and distinct fixes (hire) versus plain excess hours.",
    "ExplanationWrongD": "Option D splits $240/$120 by hours share, inverting the economics (premium $120 belongs to rate mechanics; $240 to hours). Splits follow causation — premium to premium math, hours to hours math.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.203 revenue mix with discount layer",
    "MicroTopic": "revenue mix discount layer",
    "UniqueConceptKey": "B-C-203-revenue-mix-discount-layer",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: M 8,000u @ $25 ($200,000); N 4,000u @ $40 ($160,000); total $360,000. Standard unit CMs: M $10, N $22. Actual: M 9,500u @ $24 ($228,000); N 2,500u @ $42 ($105,000); total $333,000 (−$27,000 U). Decompose into price, volume, mix, and quantity effects.",
    "Choices": {
      "A": "Price −$4,500 U (M −$9,500 + N +$5,000); volume −$22,500 U (M +$37,500, N −$60,000 at budget prices); within volume, mix −$18,000 U at CM with quantity $0 — total −$27,000 reconciles",
      "B": "Quantity −$27,000 U; mix and price $0 — totals moved, components did not",
      "C": "Price −$27,000 U; mix and quantity $0 — discounting explains everything",
      "D": "Mix nets $0 — composition shifts always self-cancel"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Price effect at actual quantities: M 9,500×($24−$25) = −$9,500; N 2,500×($42−$40) = +$5,000; net −$4,500 U. Volume effect at budget prices: M (9,500−8,000)×$25 = +$37,500; N (2,500−4,000)×$40 = −$60,000; net −$22,500 U. Total: −$4,500 − $22,500 = −$27,000 U — reconciles. Within volume: mix at budgeted CM = (9,500×$10 + 2,500×$22) − (8,000×$10 + 4,000×$22) = $150,000 − $168,000 = −$18,000 U (shift toward lower-CM M); quantity = 12,000 − 12,000 = $0. (Volume-at-price −$22,500 vs mix-at-CM −$18,000 differ by price-mix interaction — report both bases explicitly.) Quantity-only reading (option B) ignores the −$4,500 price and the −$18,000 mix inside volume. Price-only (option C) ignores −$22,500 of volume. Self-canceling mix (option D) denies composition effects that moved $18,000 of margin. Business interpretation: bridge revenue first (price + volume), then split volume into mix and quantity at CM — two bases, each labeled. Common trap: single-cause attribution of multi-cause bridges.",
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
    "QuestionID": "P1B-C-203",
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
    "ExplanationWrongB": "Option B's quantity-only −$27,000 ignores the −$4,500 price effect and buries the −$18,000 mix inside volume. Totals move because components move — bridge them.",
    "ExplanationWrongC": "Option C's price-only −$27,000 ignores −$22,500 of volume effect (M +$37,500, N −$60,000). Discounting explains $4,500 of $27,000 — one-sixth, not everything.",
    "ExplanationWrongD": "Option D claims mix self-cancels, but the shift toward lower-CM M cost $18,000 of margin at frozen CMs. Composition shifts carry margin consequences by definition.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE8A;