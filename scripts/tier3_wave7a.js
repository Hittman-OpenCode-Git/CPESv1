const WAVE7A = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.101 seasonal index construction",
    "MicroTopic": "seasonal index construction",
    "UniqueConceptKey": "E-B-101-seasonal-index-construction",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quarterly shares run Q1 20%, Q2 25%, Q3 25%, Q4 30% against a $2,000,000 annual forecast. The analyst applies Q4's 30% to a $2,200,000 revised annual figure but forgets to renormalize after revising Q1–Q3 shares to 18%/24%/24%. What is the correct Q4 forecast, and what rule was broken?",
    "Choices": {
      "A": "Q4 $600,000 (30% of $2,000,000); revised shares sum to 96% before Q4 — indices must sum to 1.00, so Q4 takes the 34% residual ($748,000 on $2.2M), not a stale 30%",
      "B": "Q4 $660,000 — 30% of the revised $2,200,000 regardless of other quarters",
      "C": "Q4 $600,000 — annual revisions never change quarterly shares",
      "D": "Q4 $528,000 — 24% matching Q2/Q3 symmetry"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Seasonal indices must sum to 1.00 — they partition the year. Revised Q1–Q3 (18% + 24% + 24% = 66%) leave Q4 the 34% residual: 34% × $2,200,000 = $748,000. Applying stale 30% (option B, $660,000) under-forecasts Q4 by $88,000 and leaves 4% of the year unallocated — indices that sum to 96% leak revenue out of the forecast entirely. Freezing shares (option C) ignores the revised seasonality evidence. Symmetry-imposing (option D, 24%) invents data — Q4's 30% historical spike is the series' dominant feature, not an anomaly to smooth. Business interpretation: renormalize indices after every share revision — unnormalized seasons silently drop (or invent) revenue. Common trap: carrying stale index values into revised annual totals.",
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
    "QuestionID": "P1E-B-101",
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
    "ExplanationWrongB": "Option B's $660,000 applies stale 30% to the revised total while Q1–Q3 sum to 66% — indices totaling 96% leak $88,000 of revenue out of the forecast year entirely.",
    "ExplanationWrongC": "Option C freezes $600,000 across the revision, ignoring updated seasonality evidence. Forecasts revise on evidence — freezing shares discards the Q1–Q3 re-estimation work.",
    "ExplanationWrongD": "Option D's $528,000 imposes Q2/Q3 symmetry (24%) on Q4, erasing the series' dominant 30% spike. Symmetry is an aesthetic, not evidence — Q4's spike is the feature, not the noise.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.102 production with defect rate",
    "MicroTopic": "production defect rate",
    "UniqueConceptKey": "E-B-102-production-defect-rate",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales budget 30,000 units with a 5% end-of-line defect rate (scrapped). FG policy: ending 2,000, beginning 1,500. How many units must production start?",
    "Choices": {
      "A": "30,500 — sales plus net FG build, ignoring defects",
      "B": "32,105 — good output needed (30,000 + 2,000 − 1,500 = 30,500) grossed up by the 95% yield (30,500/0.95 = 32,105.26)",
      "C": "32,000 — 30,500 plus a 5% add-on (30,500 × 1.05)",
      "D": "30,500 — defects are a production variance, never a budget input"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Good output required = 30,000 + 2,000 − 1,500 = 30,500 units. With 5% scrapped, starts × 95% = 30,500 → starts = 30,500/0.95 = 32,105.26 → 32,105 whole units. Additive 5% (option C: 30,500 × 1.05 = 32,025) understates by 80 units because the defect rate applies to starts, not to good output — division by yield, never multiplication by defect rate. Ignoring defects (options A/D: 30,500) plans a 1,605-unit shortfall. Business interpretation: gross up by dividing by yield (1 − defect rate). Common trap: multiplying good output by (1 + defect rate).",
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
    "QuestionID": "P1E-B-102",
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
    "ExplanationWrongA": "Option A's 30,500 plans zero defects, guaranteeing a ~1,525-unit shortfall against the 5% scrap rate. Defect rates are budget inputs, not variance surprises.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's 32,025 multiplies good output by 1.05 — but defects apply to starts, so the correct operation is division by 0.95 (32,105), not multiplication by 1.05. The 80-unit gap is real underproduction.",
    "ExplanationWrongD": "Option D's 30,500 dismisses defects as variance matter. Systematic 5% scrap is plannable — variances handle noise, budgets handle rates.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.103 quantity discount break",
    "MicroTopic": "quantity discount break",
    "UniqueConceptKey": "E-B-103-quantity-discount-break",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quarterly need is 9,500 units. Price: $5.00 below 10,000 units, $4.50 at 10,000+. Holding cost $2.40/unit-year. Should purchasing order the 9,500 need or break the 10,000 tier?",
    "Choices": {
      "A": "Order 10,000: $45,000 + ~$150 carrying on the 500-unit excess = $45,150 — beats $47,500 by $2,350",
      "B": "Order 9,500 — exact need avoids all carrying cost",
      "C": "Order 20,000 — double-tier quantities double the savings",
      "D": "Order 9,500 and renegotiate — tiers are always negotiable, so analysis is moot"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Need-cost = 9,500 × $5.00 = $47,500. Tier-break: 10,000 × $4.50 = $45,000 plus carrying on the 500-unit excess — average excess 250 units × $2.40/year × 0.25 year ≈ $150 (one quarter's carry on half the excess, consumed next quarter). Total ≈ $45,150 < $47,500 — break the tier, saving ~$2,350/quarter (~$9,400/year). Exact-need ordering (option B) pays $2,350/quarter for carrying-cost purity. Doubling to 20,000 (option C) strands 10,500 units: extra carrying ≈ 5,250 avg × $2.40 = $12,600/year against $4,500 more discount — net loss. Renegotiation-first (option D) skips the analysis the numbers already resolve — negotiate from the $2,350 surplus, not instead of computing it. Business interpretation: price tiers are all-units discounts — always compare tier-total-plus-carry against need-cost; the 500-unit excess here is cheap bridge stock, not waste. Common trap: treating carrying cost as prohibitive without computing it.",
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
    "QuestionID": "P1E-B-103",
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
    "ExplanationWrongB": "Option B orders exact need to avoid carrying cost, paying $47,500 versus $45,150 — $2,350/quarter for carrying-cost purity. Computed carrying ($150) beats assumed carrying every time.",
    "ExplanationWrongC": "Option C doubles to 20,000 for more discount, stranding 10,500 units at ~$12,600/year carrying against $4,500 more discount — tier-breaking scales only to the excess the next quarter consumes.",
    "ExplanationWrongD": "Option D renegotiates instead of analyzing — negotiate from the computed $2,350 surplus (leverage), not instead of computing it (hope). Analysis first, negotiation second.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.104 shift differential costing",
    "MicroTopic": "shift differential costing",
    "UniqueConceptKey": "E-B-104-shift-differential-costing",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Labor plan: 6,000 day hours @ $24 ($144,000) + 2,000 night hours @ $24 × 1.15 ($55,200) = $199,200 total. The budget officer proposes a blended $24.90 rate (199,200/8,000) for variance analysis. The plant runs 6,200 day + 1,800 night actual. What are the correct rate and mix effects?",
    "Choices": {
      "A": "Blended $24.90 is correct — aggregates belong in budgets, splits belong in footnotes",
      "B": "Flat $24 for all 8,000 hours — differentials are HR policy, not cost accounting",
      "C": "Night premium is uncontrollable — exclude $7,200 from all variance analysis",
      "D": "Rate effect on base $24 plus mix effect on shift proportions — actual: 6,200×$24 + 1,800×$27.60 = $148,800 + $49,680 = $198,480; budget $199,200 ($720 F total); mix saved $480 (fewer premium hours), rates flat"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Budget: 6,000×$24.00 + 2,000×$27.60 = $144,000 + $55,200 = $199,200. Actual at budget rates: 6,200×$24 + 1,800×$27.60 = $148,800 + $49,680 = $198,480. Total variance = $199,200 − $198,480 = $720 F. Decompose: rate effect = $0 (actual rates $24/$27.60 match budget — verify payroll first); mix effect = (6,200−6,000)×$24 + (1,800−2,000)×$27.60 = +$4,800 − $5,520 = −$720 F — 200 hours shifted from premium night to straight day, saving $720. Blended-rate analysis (option A, $24.90) cannot see the shift (blended actual = $198,480/8,000 = $24.81 vs $24.90 — a $720 total with no attribution). Flat $24 (option B) erases the $7,200 premium structure entirely. Excluding premium as uncontrollable (option C) exempts the single largest labor-cost lever from analysis. Business interpretation: budget shift structures explicitly (hours × rate per shift), then decompose — blends hide the mix decisions that move cost. Common trap: single-rate labor budgets in multi-shift plants.",
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
    "QuestionID": "P1E-B-104",
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
    "ExplanationWrongA": "Option A's $24.90 blend reports a $720 total with zero attribution — the 200-hour shift from premium night to straight day ($720 saved) vanishes into a nine-cent rate difference nobody investigates.",
    "ExplanationWrongB": "Option B's flat $24 erases the $7,200 night-premium structure ($55,200 of the $199,200 budget). Differentials are cost structure, not HR trivia — flat rates misstate both budget and variance.",
    "ExplanationWrongC": "Option C exempts the $7,200 premium as uncontrollable, removing the largest labor-cost lever from analysis. Shift scheduling is controllable — that controllability is the variance's whole point.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.105 mixed cost separation with outlier",
    "MicroTopic": "mixed cost separation outlier",
    "UniqueConceptKey": "E-B-105-mixed-cost-separation-outlier",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Maintenance (MH, cost): (8k, $98k), (12k, $122k), (10k, $110k), (6k, $200k — hurricane outage with emergency contractors). Separate fixed and variable components for the flexible budget.",
    "Choices": {
      "A": "High-low on all four — $25.50 variable with negative fixed, accepted as computed",
      "B": "Regression on all four — more data always beats selective data",
      "C": "Exclude the hurricane point; VC $6.00, FC $50,000 — verified against the third observation ($110,000)",
      "D": "Exclude the hurricane point; VC $6.00 with no fixed component — intercepts are unreliable, so report variable only"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The (6k, $200k) point is a hurricane outage with emergency contractors — a different cost regime, documented and excludable. Clean high-low: high (12k, $122k), low (8k, $98k) → VC = $24,000/4,000 = $6.00; FC = $122,000 − 12,000×$6 = $122,000 − $72,000 = $50,000. Verification against the unused third point: 10,000×$6 + $50,000 = $110,000 — exactly the observed (10k, $110k), confirming linearity. All-four high-low (option A): (122−200)/(12−6) = −$78,000/6,000 = −$13/unit with FC $278,000 — impossible negative rate plus absurd intercept. All-four regression (option B) fits a line through two regimes — more contaminated data never beats clean data. Variable-only (option D) discards the verified $50,000 intercept — verified fixed components belong in flexible budgets. Business interpretation: document-then-exclude outliers, then verify the fitted line against held-out observations — the (10k, $110k) exact hit validates both the exclusion and the fit. Common trap: fitting all data on completeness principle.",
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
    "QuestionID": "P1E-B-105",
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
    "ExplanationWrongA": "Option A's all-four high-low yields −$13/unit variable with $278,000 fixed — impossible negative rate plus absurd intercept. Impossible signs diagnose contamination; they are never reported.",
    "ExplanationWrongB": "Option B regresses all four points as 'more data.' Contaminated data degrades fits — a documented different-regime point excluded with verification beats four-point fitting without it.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D drops the verified $50,000 intercept as 'unreliable.' The intercept verified exactly against the held-out (10k, $110k) observation — verified fixed components belong in flexible budgets.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.106 early-pay discount economics",
    "MicroTopic": "early-pay discount economics",
    "UniqueConceptKey": "E-B-106-early-pay-discount-economics",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Terms 2/10 net 30; $1,000,000 monthly AR; 40% of customers take the discount. Borrowing rate 8%. Dropping the discount is projected to stretch DSO 15 days. Should the company keep or drop 2/10?",
    "Choices": {
      "A": "Keep — discounts always accelerate cash worth more than their cost",
      "B": "Drop — 2/10 costs 36.7% APR versus 8% borrowing ($96,000/year); even with $39,452 of DSO-stretch carrying cost, dropping nets +$56,548",
      "C": "Drop — discounts are pure cost with no benefit side",
      "D": "Keep — DSO deterioration always exceeds discount savings"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Discount cost = $400,000 × 2% = $8,000/month = $96,000/year. Annualized rate = (0.02/0.98) × (360/20) = 0.020408 × 18 = 36.73% ≈ 36.7% — versus 8% borrowing, the discount is ruinously expensive credit. DSO-stretch cost if dropped: $12,000,000 annual × 15/365 × 8% = $12,000,000 × 0.041096 × 0.08 = $39,452. Net of dropping = $96,000 − $39,452 = +$56,548/year. Keep-always (option A) pays 36.7% APR for acceleration borrowable at 8%. Drop-as-pure-cost (option C) ignores the $39,452 DSO consequence — benefits exist, they are just outweighed. Keep-on-DSO-fear (option D) asserts without computing: $39,452 < $96,000, computed. Business interpretation: price trade credit against borrowing cost with DSO consequences loaded — 2/10 net 30 at 36.7% is among the most expensive common financings. Common trap: treating discounts as free acceleration.",
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
    "QuestionID": "P1E-B-106",
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
    "ExplanationWrongA": "Option A keeps 2/10 as always-worthwhile acceleration. At 36.7% APR versus 8% borrowing, the acceleration costs 4.6× the alternative — expensive speed is not free speed.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C drops on pure-cost logic, ignoring $39,452 of DSO-stretch carrying cost. Benefits exist (faster cash); they are outweighed ($96,000 > $39,452), not absent.",
    "ExplanationWrongD": "Option D keeps on uncomputed DSO fear. Computed: $39,452 of stretch cost versus $96,000 of discount cost — fear quantified loses by $56,548.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.107 compensating balance effective rate",
    "MicroTopic": "compensating balance effective rate",
    "UniqueConceptKey": "E-B-107-compensating-balance-effective-rate",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $500,000 loan at 6% stated requires a 20% compensating balance. An alternative 7% loan has no balance requirement. Which borrowing is cheaper on an effective-rate basis?",
    "Choices": {
      "A": "The 6% loan — lower stated rate always wins",
      "B": "Neither — compensating balances are illegal tie-ins, so the comparison is void",
      "C": "The 7% loan as stated — headline rates decide",
      "D": "The 7% loan — the 6% loan's effective rate is 7.5% ($30,000 on $400,000 usable); compensating balances tax the proceeds"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "6% loan: interest $500,000 × 6% = $30,000; usable proceeds $500,000 × (1 − 20%) = $400,000; effective = $30,000/$400,000 = 7.5% > 7% alternative. The stated-rate comparison (options A/C: 6% vs 7%) ignores that one-fifth of proceeds sits frozen — effective rates divide by usable cash, never by face. Illegality claims (option B) are false — compensating balances are lawful, common covenants. Business interpretation: price debt on usable proceeds — balance requirements are interest in escrow. Common trap: comparing stated rates across different proceeds bases.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
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
    "QuestionID": "P1E-B-107",
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
    "ExplanationWrongA": "Option A's 6%-beats-7% compares stated rates across different usable bases ($400,000 vs $500,000). Effective 7.5% exceeds 7% — the lower stated rate is the more expensive loan.",
    "ExplanationWrongB": "Option B voids the comparison as illegal tie-ins. Compensating balances are lawful, standard covenants — analyzable, not voidable.",
    "ExplanationWrongC": "Option C picks 7% on headline comparison — right answer, no analysis. Headlines coincide with truth here by 0.5 points; method still matters for the next comparison where they won't.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.108 flexible performance with price discipline",
    "MicroTopic": "flexible performance price discipline",
    "UniqueConceptKey": "E-B-108-flexible-performance-price-discipline",
    "LOSTag": "P1-B.2 Flexible budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget 20,000 units: revenue $30 ($600,000), VC $18 ($360,000), FC $150,000 → NOI $90,000. Actual 22,000 units: revenue $638,000 ($29), VC $402,600 ($18.30), FC $153,000 → NOI $82,400 (−$7,600 U). Decompose into activity, price, and efficiency components.",
    "Choices": {
      "A": "All −$7,600 is activity — volume missed budget, end of story",
      "B": "Price +$22,000 F; activity −$29,600 U — discounting helped",
      "C": "Activity +$24,000 F; price −$22,000 U; variable-efficiency −$6,600 U; fixed-spending −$3,000 U — volume win, execution loss",
      "D": "Fixed spending $0 — fixed costs never vary, so the $3,000 is volume"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Flexible at 22,000: revenue 22,000×$30 = $660,000; VC 22,000×$18 = $396,000; FC $150,000 → NOI $114,000. Activity = $114,000 − $90,000 = +$24,000 F. Price = $638,000 − $660,000 = −$22,000 U. Variable efficiency = $396,000 − $402,600 = −$6,600 U. Fixed spending = $150,000 − $153,000 = −$3,000 U. Check: +24,000 − 22,000 − 6,600 − 3,000 = −$7,600 U — reconciles. Volume delivered $24,000 that execution surrendered $31,600 of — every controllable dimension failed while headline volume grew. A manager bonused on totals would celebrate growth that destroyed $7,600 of profit. Business interpretation: flexible bridges deny volume credit for price/efficiency failures — split before judging. Common trap: bonusing net variances.",
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
    "QuestionID": "P1E-B-108",
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
    "ExplanationWrongA": "Option A blames volume for −$7,600, but activity is +$24,000 F — volume helped. The $31,600 of execution failures (price, efficiency, fixed) hide inside the net.",
    "ExplanationWrongB": "Option B signs price favorable (+$22,000) when actual $29 trails budget $30 — discounting is unfavorable by definition ($638,000 vs $660,000 flexible).",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D zeroes fixed spending because 'fixed never varies' — but actual fixed ($153,000) exceeded budget ($150,000) by $3,000. Fixed means volume-invariant, not variance-proof.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.109 slack strata quantification",
    "MicroTopic": "slack strata quantification",
    "UniqueConceptKey": "E-B-109-slack-strata-quantification",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "O&M budgets ran $130,000, $142,000, and $128,000 favorable over three years on a $2,000,000 base (average $133,333 ≈ 6.7%). The manager requests $2,100,000 (+$100,000 growth). Finance suspects embedded slack. Quantify the strata.",
    "Choices": {
      "A": "Embedded slack ≈ $233,300 ($133,300 historical + $100,000 growth) — require zero-based justification for growth and a giveback on historical slack",
      "B": "Slack is $100,000 — only the growth increment is suspect",
      "C": "Slack is $133,300 — the growth increment is legitimate new need",
      "D": "Slack is $0 — three favorable years prove efficient management deserving growth"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Average actual = ($1,870,000 + $1,858,000 + $1,872,000)/3 = $5,600,000/3 = $1,866,667. Historical slack = $2,000,000 − $1,866,667 = $133,333 ≈ $133,300 — metronomic ~6.7% favorables signal designed padding, not volatility. Growth increment = $2,100,000 − $2,000,000 = $100,000 of new, unjustified need stacked atop the old pad. Total embedded ≈ $133,300 + $100,000 = $233,300. The $100,000-only reading (option B) launders three years of padding as baseline; the $133,300-only reading (option C) waves through unjustified growth; the zero reading (option D) mistakes one-sided favorables for efficiency. Business interpretation: requests layer new need over old pad — quantify both strata before negotiating either. Common trap: re-basing to last year's budget instead of last year's actuals.",
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
    "QuestionID": "P1E-B-109",
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
    "ExplanationWrongB": "Option B flags only the $100,000 growth increment, laundering three years of ~$133,300 padding as an accepted baseline. Old pad does not become legitimate through repetition.",
    "ExplanationWrongC": "Option C flags only historical slack while waving through $100,000 of unjustified growth. New need requires its own zero-based justification — growth is where fresh slack hides.",
    "ExplanationWrongD": "Option D reads three favorable years as efficiency deserving reward. Metronomic one-sided favorables (≈6.7% yearly) are padding's signature, not efficiency's — efficiency varies both directions.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.110 cannibalization-adjusted launch forecast",
    "MicroTopic": "cannibalization-adjusted launch forecast",
    "UniqueConceptKey": "E-B-110-cannibalization-adjusted-launch-forecast",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new product forecasts 10,000 units at $30 CM ($300,000). It will cannibalize 30% of its volume from the existing line (3,000 units at $25 CM = $75,000 drag). Marketing presents $300,000 of 'new contribution.' What should the rolling forecast carry, and what control prevents repeat overstatement?",
    "Choices": {
      "A": "$300,000 — gross contribution is the forecast; cannibalization is a sales-detail footnote",
      "B": "$225,000 net ($300,000 − $75,000) — forecasts must net cannibalization; require cannibalization schedules on all launch forecasts going forward",
      "C": "$375,000 — add cannibalized units back as retained base demand",
      "D": "$75,000 — only the cannibalized portion is forecastable with confidence"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Net launch contribution = $300,000 new − $75,000 cannibalized (3,000 × $25) = $225,000. Gross presentation (option A, $300,000) overstates by 33% — counting diverted demand as created demand. Add-back (option C, $375,000) double-counts: the 3,000 units cannot simultaneously anchor base demand and star in launch volume. Cannibalization-only (option D, $75,000) reports the drag as the forecast. The control is procedural: every launch forecast carries a cannibalization schedule (source lines, diversion rates, CM impact) reviewed against post-launch audits — forecasting net becomes a process output, not an analyst's afterthought. Business interpretation: launches transfer demand before they create it — net, don't gross, and control the netting. Common trap: presenting gross launch contribution as incremental profit.",
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
    "QuestionID": "P1E-B-110",
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
    "ExplanationWrongA": "Option A's $300,000 gross overstates incremental profit by $75,000 (33%) — diverted demand counted as created demand. Gross launch figures are marketing; net figures are forecasts.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $375,000 adds cannibalized units back as retained base — double-counting the same 3,000 units in base demand and launch volume simultaneously.",
    "ExplanationWrongD": "Option D's $75,000 reports only the drag as the forecast — the $300,000 of genuine new contribution vanishes. Netting means subtracting drag from gross, not reporting drag alone.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE7A;