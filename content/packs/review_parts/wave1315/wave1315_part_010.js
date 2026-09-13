const WAVE1315_PART_010 = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.227 overtime make versus hire decision",
    "MicroTopic": "overtime make hire decision",
    "UniqueConceptKey": "B-C-227-overtime-hire-decision",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sustained demand needs 500 extra hrs/month. Options: overtime at $30/hr ($15,000/month, no benefits, flexible down) vs hire at $20/hr + 30% benefits ($26/hr → $13,000/month) with $8,000 hiring/training sunk over 12-month horizon ($667/month) and layoff rigidity. The supervisor prefers overtime (no headcount paperwork). Evaluate over 12 months.",
    "Choices": {
      "A": "Overtime — $15,000 vs $13,667 all-in hiring ($13,000 + $667) saves $1,333/month with flexibility; but sustained 500 hrs/month for 12 months = 6,000 overtime hrs risks fatigue/quality drift — approve overtime with quarterly fatigue review, and convert to hire if overtime persists past 6 months (persistence proves permanence)",
      "B": "Hire immediately — $13,000 base is cheaper than $15,000 regardless of horizon",
      "C": "Overtime permanently — flexibility outweighs cost",
      "D": "Cut output — demand above base capacity is refused"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "12-month economics: overtime 500 × $30 × 12 = $180,000. Hire: 500 × $26 × 12 = $156,000 + $8,000 sunk = $164,000 → hiring saves $16,000/year ($1,333/month). But hiring buys rigidity (layoff cost if demand fades) while overtime buys a real option to scale down — the $16,000 gap prices the flexibility option plus fatigue risk. Hire-now (option B: $13,000 < $15,000 decides) ignores the $8,000 sunk, rigidity, and the demand-uncertainty option value — base-rate comparison without horizon costs. Permanent-overtime (option C) prices flexibility at infinity — 6,000 sustained overtime hours invite fatigue, defects, and turnover that dwarf $16,000. Output-cut (option D) surrenders contribution margin to avoid a staffing decision. Business interpretation: price the flexibility option explicitly — overtime now (approve with fatigue monitoring), with a persistence trigger (6 months sustained → permanence proven → hire). The $16,000 is the option premium under review, never the verdict. Common trap: deciding make-vs-hire on base rates without horizon, sunk, and option costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-227",
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
    "ExplanationWrongB": "Option B decides on $13,000 vs $15,000 base rates — the $8,000 sunk, layoff rigidity, and demand-uncertainty option value all sit outside base-rate comparison.",
    "ExplanationWrongC": "Option C prices flexibility at infinity — 6,000 sustained overtime hours of fatigue/defect/turnover risk dwarf any option premium.",
    "ExplanationWrongD": "Option D surrenders contribution margin to dodge staffing — above-capacity demand is a resourcing decision, never a refusal pretext.",
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
    "Topic": "B-C.228 rework disposition economics",
    "MicroTopic": "rework disposition economics",
    "UniqueConceptKey": "B-C-228-rework-disposition-economics",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "1,000 defective units. Options: rework at $25/unit and sell at full $100 ($75 margin); scrap at $10/unit recovery; rework capacity is idle (no opportunity cost). Past rework success rate 90% (10% fail again → scrap). Decide with expected values.",
    "Choices": {
      "A": "Scrap all — $10 certain beats risky rework",
      "B": "Rework all — $100 full price justifies $25 cost",
      "C": "Rework: EV per unit = 0.9×($100−$25) + 0.1×($10−$25) = 0.9×$75 + 0.1×−$15 = $67.50 − $1.50 = $66.00 vs scrap $10.00 → rework wins by $56/unit ($56,000 total). Idle capacity means no displaced margin. Monitor the success rate — rework stays optimal while 0.9×$75 + 0.1×−$15 > $10, i.e., success above ~32% (breakeven: p×$75 − (1−p)×$15 = $10 → 90p = 25 → p = 27.8%). At 90%, deep in the money",
      "D": "Flip a coin — uncertainty makes analysis futile"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Expected-value disposition: rework EV = 0.90 × ($100 − $25) + 0.10 × ($10 − $25) = $67.50 − $1.50 = $66.00/unit vs scrap $10.00 → rework by $56.00/unit ($56,000 on 1,000 units). Idle rework capacity → zero opportunity cost (no displaced good production). Breakeven success rate: p × $75 − (1 − p) × $15 = $10 → 75p − 15 + 15p = 10 → 90p = 25 → p = 27.78% ≈ 27.8% — actual 90% is deep in the money with wide margin of safety. Scrap-all (option A: $10 certain) pays $56,000 of certainty premium — certainty has a price, and $56/unit exceeds it. Rework-all-by-maxim (option B: $100 justifies $25) skips the success-rate and opportunity-cost tests the decision requires — right answer, unearned. Coin-flip (option D) abandons $56,000 of computable surplus to randomness. Business interpretation: disposition decisions price success rates against scrap floors with capacity opportunity costs — compute EV, find breakeven sensitivity (27.8%), monitor the rate. Common trap: scrapping to avoid rework risk without pricing the spread.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-228",
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
    "ExplanationWrongA": "Option A pays $56/unit of certainty premium — $10 certain vs $66 expected; certainty pricing above $56 of spread destroys value.",
    "ExplanationWrongB": "Option B reaches rework by maxim ($100 justifies $25) — right answer unearned; without the 90% success test and idle-capacity check the logic fails at lower rates or full capacity.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D abandons $56,000 of computable expected surplus — uncertainty with known odds computes, never coin-flips.",
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
    "Topic": "B-C.229 customer mix profitability",
    "MicroTopic": "customer mix profitability",
    "UniqueConceptKey": "B-C-229-customer-mix-profitability",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Two customer groups: Key accounts — $2,000,000 revenue, $1,200,000 product cost, $400,000 service cost (dedicated support), margin $400,000 (20%). Small accounts — $1,500,000 revenue, $900,000 product cost, $150,000 service cost (pooled), margin $450,000 (30%). Sales proposes shifting effort toward Key accounts (prestige). The controller notes service intensity. Evaluate with customer-level margins and recommend.",
    "Choices": {
      "A": "Shift to Key — $2,000,000 revenue concentration beats $1,500,000; revenue prestige decides",
      "B": "Small accounts earn 30% ($450,000) vs Key 20% ($400,000) — Key's $400,000 service load (20% of its revenue vs Small's 10%) consumes the revenue advantage. At the margin, $100 of Small revenue at current mix earns ~$30 vs ~$20 for Key. Recommend: protect Small-account service levels, renegotiate Key service scope (or price the $400,000 explicitly), and stop prestige-based effort shifts — allocate selling effort by marginal customer contribution, not revenue prestige. Keep profitable Key volume while repricing its service intensity",
      "C": "Hold mix — margins differ but both are positive, so inaction is optimal",
      "D": "Drop Key accounts — 20% trails 30% so all Key business destroys value"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Customer-level margins: Key $2,000,000 − $1,200,000 − $400,000 = $400,000 (20.0%); Small $1,500,000 − $900,000 − $150,000 = $450,000 (30.0%). Service intensity: Key $400,000/$2,000,000 = 20%; Small $150,000/$1,500,000 = 10% — Key consumes 2× the service per revenue dollar, erasing its scale advantage. Prestige-shift (option A) chases $2,000,000 of 20%-margin revenue over $1,500,000 of 30% — effort follows margin rates at the margin, not revenue totals. Drop-Key (option D: 20% destroys value) confuses lower margin with negative margin — $400,000 of positive contribution stays unless service can be cut with the volume. Hold-mix (option C) defends inaction with positivity — both positive still favors repricing Key's $400,000 service load (unbundle? fee? tiered SLA?). Business interpretation: cost-to-serve decides customer mix economics — revenue prestige without service-intensity pricing subsidizes demanding customers with easy ones. Common trap: allocating selling effort by revenue instead of marginal customer contribution.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Customer Profitability",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-229",
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
    "ExplanationWrongA": "Option A chases $2,000,000 of 20% revenue over $1,500,000 of 30% — marginal effort follows contribution rates, not revenue prestige.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C defends inaction with positivity — both-positive still leaves Key's $400,000 service load mispriced; reprice, don't rest.",
    "ExplanationWrongD": "Option D confuses 20% with negative — $400,000 of positive Key contribution stays; fix the $400,000 service pricing, do not drop the volume.",
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
    "Topic": "B-C.230 service transfer pricing",
    "MicroTopic": "service transfer pricing",
    "UniqueConceptKey": "B-C-230-service-transfer-pricing",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "IT department ($400,000 fixed + $0.10... precisely $5.00/hr variable on 10,000 hrs = $50,000) serves Production (9,000 hrs) and R&D (1,000 hrs, experimental jobs that spike support tickets 3× per hour). Single rate $45/hr ($450,000/10,000) charges R&D $45,000. R&D protests. Design the defensible charge.",
    "Choices": {
      "A": "$45,000 stands — single rates are simple and simplicity governs shared services",
      "B": "Charge R&D $0 — innovation does not bear support costs",
      "C": "Dual-rate with intensity weighting: fixed on budgeted hours (Production 10/12 × $400,000 = $333,333; R&D 2/12 × $400,000 = $66,667) + variable at $5/hr on actual with ticket-intensity factor for R&D's 3× load (R&D variable 1,000 × $5 × 3 = $15,000 vs Production 9,000 × $5 = $45,000). Totals: Production $378,333; R&D $81,667. Single-rate undercharges R&D's intensity ($45,000 vs $81,667 cost-caused) and overcharges Production by $26,667 ($405,000 − $378,333) — intensity-blind rates subsidize heavy users with steady ones",
      "D": "Split 50/50 ($225,000 each) — equality is fairness in shared services"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Cost-causation design: fixed follows budgeted reservations (Production 10,000/12,000 × $400,000 = $333,333.33 ≈ $333,333; R&D 2,000/12,000 × $400,000 = $66,666.67 ≈ $66,667). Variable follows consumption × intensity: Production 9,000 × $5.00 = $45,000; R&D 1,000 × $5.00 × 3 (ticket intensity) = $15,000. Totals: Production $378,333; R&D $66,667 + $15,000 = $81,667 (sum $450,000 ✓). Single-rate (option A: $45,000 R&D) ignores 3× ticket intensity — R&D causes $81,667 but pays $45,000 (steady Production subsidizes $36,667... precisely $81,667 − $45,000 = $36,667; Production overpays $405,000 − $378,333 = $26,667... the $10,000 balance is fixed-reservation geometry). Zero-charge (option B) exempts innovation from measurable support — R&D's 3× tickets are real cost. Equal-split (option D: $225,000 each) ignores 9:1 usage plus 3× intensity — equality without causation is arbitrary. Business interpretation: weight service rates by consumption intensity, not just hours — ticket multipliers (or complexity factors) convert raw usage into cost-caused usage. Common trap: single-rate simplicity subsidizing intensive users.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-230",
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
    "ExplanationWrongA": "Option A's $45,000 ignores 3× ticket intensity — R&D causes $81,667 of support but pays $45,000; simplicity subsidizes intensity with steadiness.",
    "ExplanationWrongB": "Option B exempts $81,667 of caused support — innovation budgets include their support footprint; exemption is subsidy, never strategy.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $225,000 each ignores 9:1 usage and 3× intensity — equality without causation prices neither.",
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
    "Topic": "B-C.231 joint variance ownership matrix",
    "MicroTopic": "joint variance ownership matrix",
    "UniqueConceptKey": "B-C-231-joint-variance-ownership",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $25,000 U total material variance decomposes to price $10,000 U (unapproved supplier) + mix $5,000 U (grade substitution) + yield $10,000 U (excess usage). Purchasing owns price and approved mix; production owns yield and requested the substitution. Assign each leg with reasoning.",
    "Choices": {
      "A": "Purchasing $10,000 (price — supplier choice); production $15,000 (mix $5,000 requested substitution + yield $10,000 usage) — ownership follows causation per leg, and the requesting party owns the mix consequence. Joint review of the substitution decision (did $5,000 mix buy yield savings? No — yield still $10,000 U, so the substitution failed outright)",
      "B": "Purchasing $25,000 — materials variances belong to purchasing by department",
      "C": "Production $25,000 — usage variances dominate so production owns all",
      "D": "Split $12,500 each — shared variances split evenly for harmony"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Leg-by-leg causation: price $10,000 U → purchasing (unapproved supplier selection). Mix $5,000 U → production (requested the grade substitution — requesters own consequences). Yield $10,000 U → production (excess usage on the floor). Totals: purchasing $10,000; production $15,000; $10,000 + $15,000 = $25,000 ✓. The joint review adds the verdict: the substitution was supposed to help (cheaper grade?) yet yield still ran $10,000 U — failed outright, kill it. Department-blanket (option B: all $25,000 purchasing) charges buying for floor usage and requested substitutions. Usage-dominance (option C: all production) charges the shop for the unapproved supplier. Even-split (option D: $12,500 each) prices harmony over causation — equal splits on unequal causes teach both parties that ownership is negotiable. Business interpretation: decompose first, assign by causation per leg, then jointly judge the decision that created the legs. Common trap: single-owner material variances.",
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
    "QuestionID": "P1B-C-231",
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
    "ExplanationWrongB": "Option B charges purchasing $15,000 of floor usage and requested substitution — buying owns supplier selection, never production's recipe requests or waste.",
    "ExplanationWrongC": "Option C charges production $10,000 of unapproved-supplier pricing — usage dominance never extends ownership to vendor selection.",
    "ExplanationWrongD": "Option D's $12,500 each prices harmony over causation — equal splits on a $10,000/$15,000 causal split teach negotiable ownership.",
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
    "Topic": "B-C.232 standard cost revision timing",
    "MicroTopic": "standard revision timing",
    "UniqueConceptKey": "B-C-232-standard-revision-timing",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Labor standard $20/hr set when the market rate was $20. Market rate is now $23 (sustained 18 months); actual paid $22.50 with 20,000 hrs (reported rate variance 20,000×$2.50 = $50,000 U). HR beat the market by $0.50/hr ($10,000 F vs market) while the standard bleeds $50,000 U of obsolescence. Management reviews standards annually each December; it is now June. Decide.",
    "Choices": {
      "A": "Dual-track now: restate the benchmark to $23 for performance (HR +$10,000 F vs market: 20,000×($23−$22.50)), report the $60,000 planning gap (20,000×($23−$20)) as standard obsolescence below the performance line, and calendar the formal revision for December with an 18-month-sustained-shift rule going forward — judge HR against markets now, fix standards on schedule, and codify the trigger so obsolescence stops hiding inside performance",
      "B": "Revise immediately to $23 and restate all prior variances — history matches current truth",
      "C": "Do not revise — attainable standards are permanent by definition",
      "D": "Hold $20 until December — calendar discipline preserves comparability"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Dual-track mechanics: market benchmark $23 → HR performance = 20,000 × ($23.00 − $22.50) = 20,000 × $0.50 = $10,000 F (beat the market). Planning gap = 20,000 × ($23 − $20) = $60,000 U (18 months of unrevised standard). Reported $50,000 U = $60,000 obsolescence − $10,000 performance ✓. Calendar-hold (option D: wait until December) publishes six more months of $50,000/month fiction — comparability of wrong numbers is worthless. Restate-history (option B) rewrites closed periods — benchmarks revise forward; history records what was knowable when. Never-revise (option C) makes 18-month market shifts permanent fiction. Business interpretation: separate the benchmark (live market, now) from the standard (formal, December) with a codified sustained-shift trigger — performance judged live, standards revised on rhythm, obsolescence displayed, never buried. Common trap: letting revision calendars dictate performance truth.",
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
    "QuestionID": "P1B-C-232",
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
    "ExplanationWrongB": "Option B rewrites closed periods — benchmarks revise forward with sustained-shift triggers; history records knowable truth, not current wishes.",
    "ExplanationWrongC": "Option C makes 18-month market movement permanent fiction — attainable standards track sustained markets by definition.",
    "ExplanationWrongD": "Option D publishes six months of $50,000/month fiction for calendar purity — comparability of wrong numbers measures nothing.",
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
    "Topic": "B-C.233 performance measure controllability audit",
    "MicroTopic": "performance measure controllability audit",
    "UniqueConceptKey": "B-C-233-measure-controllability-audit",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A plant manager's scorecard: (1) unit cost vs standard, (2) total plant spending vs budget, (3) division ROI, (4) on-time delivery, (5) corporate safety incident rate. Her authority: labor scheduling, material requisitions, maintenance timing — no pricing, no capital approval, no product mix, no corporate safety policy. Audit each measure for controllability and prescribe the scorecard.",
    "Choices": {
      "A": "Keep all five — comprehensive scorecards motivate comprehensive management",
      "B": "Drop all five — no measure is perfectly controllable so none should count",
      "C": "Weight all five equally — equal weights are fair by construction",
      "D": "Audit: (1) unit cost — PARTIAL (labor/material usage controllable; price/mix/depreciation components not — split into controllable usage vs reported total); (2) plant spending — YES if truly direct and discretionary (verify no embedded allocations); (3) ROI — NO (capital base and pricing outside authority — replace with controllable margin); (4) delivery — PARTIAL (scheduling controllable; supplier/material-availability failures need a carve-out with cause coding); (5) safety rate — NO for bonuses (corporate policy compliance is a condition of employment, and incident-rate bonusing suppresses reporting). Prescribed scorecard: controllable usage + verified direct spending + controllable margin + delivery-with-carve-outs, each with documented boundaries; ROI and safety move to context/monitoring, not bonus drivers"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Measure-by-measure audit against stated authority (scheduling, requisitions, maintenance timing): (1) unit cost mixes controllable usage with uncontrollable prices/mix/depreciation → split and bonus only the usage leg; (2) plant spending qualifies only if direct-discretionary (audit for embedded allocations first); (3) ROI needs capital + pricing authority she lacks → replace with controllable margin; (4) delivery needs supplier-failure carve-outs with cause coding (schedule what you control, excuse coded external failures); (5) safety incident rates in bonuses suppress incident reporting (perverse safety incentive) → monitor separately, condition employment on compliance. Keep-all (option A) bonuses ROI, corporate safety policy, and supplier failures as though scheduled. Drop-all (option B) surrenders measurable scheduling/requisition/maintenance accountability to perfectionism. Equal-weights (option C) prices five unequal-controllability measures identically — fairness is controllability-matching, not arithmetic equality. Business interpretation: audit every scorecard line against the authority register — bonus what she controls, carve out what she doesn't, monitor the rest elsewhere. Common trap: comprehensive scorecards without controllability boundaries.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Performance Evaluation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-233",
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
    "ExplanationWrongA": "Option A bonuses capital bases, corporate policy, and supplier failures as though scheduled — comprehensiveness without boundaries measures luck.",
    "ExplanationWrongB": "Option B surrenders scheduling, requisition, and maintenance accountability to perfectionism — imperfect controllability still bounds most lines.",
    "ExplanationWrongC": "Option C prices unequal controllability identically — fairness matches measures to authority, never equalizes weights.",
    "ExplanationWrongD": "",
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
    "Topic": "B-C.234 relative performance evaluation",
    "MicroTopic": "relative performance evaluation",
    "UniqueConceptKey": "B-C-234-relative-performance-evaluation",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Two identical plants (same products, scale, vintage): Plant East controllable margin +$50,000 vs budget; Plant West −$30,000 vs budget. A recession cut industry volume 12%. East's manager claims superiority; West's cites the recession. Both face the same market. Evaluate relatively.",
    "Choices": {
      "A": "Relative verdict: same market + identical plants = controlled experiment — the $80,000 gap ($50,000 − (−$30,000)) is pure management difference with the recession differenced out. East outperformed by $80,000 on a level field; West's recession excuse fails because East faced it too. Caveat: verify comparability first (product mix shifts? one-time events? input sourcing differences?) — relative evaluation needs ceteris paribus checked, then the gap judges. Recommend: bonus East on the $80,000 relative edge, diagnose West's $30,000 process gap",
      "B": "Both satisfactory — recession excuses all shortfalls equally",
      "C": "Both need investigation — any budget miss regardless of direction signals broken standards",
      "D": "East superior — +$50,000 beats −$30,000 on any basis"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "RPE mechanics: identical plants × same market × same shock = the recession hits both budgets comparably (assuming budgets set pre-shock with similar assumptions) — differencing the outcomes ($50,000 − (−$30,000) = $80,000) removes the common shock, isolating management difference. Absolute-verdict (option D: +$50,000 wins) reaches the right ranking without the method — right answer, unearned; absolute gaps understate the edge when both clear (or both miss) due to shared shocks. Blanket-excuse (option B) lets East's $80,000 edge drown in shared sympathy — common shocks excuse no one differentially. Investigate-everything (option C) treats East's beat as suspicious — beats need validation, not investigation-by-default. Business interpretation: use internal peers as controls — same-market siblings difference out macro noise, leaving managed performance visible. The comparability caveat (mix, one-timers, sourcing) is the method's price of admission. Common trap: absolute budget comparisons under common shocks.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Performance Evaluation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-234",
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
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B drowns East's $80,000 edge in shared sympathy — common shocks difference out across peers; excuses need differential impact, not shared weather.",
    "ExplanationWrongC": "Option C investigates beats by default — validation (comparability checks) precedes investigation; beats with clean comparability earn rewards.",
    "ExplanationWrongD": "Option D ranks correctly without method — absolute gaps mislead whenever shared shocks push both the same direction; the $80,000 relative edge is the finding.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  }
];
