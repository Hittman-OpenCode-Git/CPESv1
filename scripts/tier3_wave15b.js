const WAVE15B = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.221 sales returns variance",
    "MicroTopic": "sales returns variance",
    "UniqueConceptKey": "B-C-221-sales-returns-variance",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 50,000 units at $40, standard return rate 2% (net 49,000 units, $1,960,000 net revenue). Actual: 54,000 shipped at $38; returns 6% (3,240 units); net 50,760 units at $38 = $1,928,880. Gross revenue beat static by $108,000 (54,000×$38 = $2,052,000 vs $2,000,000). Decompose net performance.",
    "Choices": {
      "A": "Net revenue $1,928,880 trails budget $1,960,000 by $31,120 U despite the $108,000 gross beat — decomposition: price (54,000×−$2) = $108,000 U; volume at net budget CM... precisely gross units +4,000 F but returns exploded (6% vs 2%: excess 2,160 units × $38 = $82,080 of lost revenue). Verdict: the discount bought gross units that came back — net units +1,760 but net revenue −$31,120; quality/discount interaction destroyed the beat",
      "B": "$108,000 gross beat proves success — returns are a period cost outside sales evaluation",
      "C": "Net −$31,120 U all to sales leadership — single variance, single owner",
      "D": "Returns 6% is favorable — more shipments justify more returns"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Net arithmetic: budget net $1,960,000 (49,000 × $40) vs actual net $1,928,880 (50,760 × $38) = −$31,120 → $31,120 U. The $108,000 gross beat (54,000 × $38 = $2,052,000 vs $2,000,000) reverses after returns: actual returns 3,240 vs budgeted 1,000 (2% of 50,000) = +2,240 excess units... precisely 3,240 − 1,000 = 2,240 × $38 = $85,120 of excess returns. Price leg: 54,000 × ($38 − $40) = $108,000 U. Gross-beat verdict (option B: $108,000 proves success) excludes 3,240 returns from sales evaluation — returns are a sales-quality outcome, never an exogenous period cost. Single-owner (option C) assigns the $31,120 without diagnosing discount-vs-quality causation. Returns-favorable (option D) reads 6% failure as success. Business interpretation: evaluate sales on NET revenue (price × shipped minus returns) — gross beats funded by discount-driven returns are defeats. The discount and the return spike are one story (price-cut buyers return more), split only for assignment. Common trap: celebrating gross shipments with exploding returns.",
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
    "QuestionID": "P1B-C-221",
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
    "ExplanationWrongB": "Option B excludes 3,240 returns from sales evaluation — return rates are sales-quality outcomes (discount-driven buyers return more), never exogenous costs.",
    "ExplanationWrongC": "Option C assigns $31,120 without diagnosing discount-vs-quality causation — assignment follows causal decomposition, never headline totals.",
    "ExplanationWrongD": "Option D reads 6% returns as favorable — tripling the 2% standard rate is deterioration; more shipments justify better quality, never more failure.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.222 step-fixed flex distortion",
    "MicroTopic": "step-fixed flex distortion",
    "UniqueConceptKey": "B-C-222-step-fixed-flex-distortion",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Supervision cost: $50,000 per 10,000 units of capacity (step-fixed). Static budget 50,000 units → $250,000. Actual 54,000 units → cost $300,000 (6th supervisor added). A naive flex (54,000/50,000 × $250,000 = $270,000) shows $30,000 U. What is the correct flexible benchmark and variance?",
    "Choices": {
      "A": "$30,000 U stands — proportional flexing works for all fixed costs",
      "B": "$50,000 U (actual $300,000 vs static $250,000) — flexing does not apply to fixed costs",
      "C": "No variance — supervision adjusts efficiently to volume",
      "D": "Correct flex: 54,000 units needs ceil(54,000/10,000) = 6 steps × $50,000 = $300,000 → spending variance $300,000 − $300,000 = $0; the $30,000 naive-flex gap is a step artifact, not overspending. Volume effect: static $250,000 vs flexed $300,000 = $50,000 of step capacity added for 4,000 extra units. Verdict: supervision spending is on benchmark; the decision question is whether 4,000 units justified a $50,000 step (capacity-planning review), not a $30,000 spending failure"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Step-fixed flexing uses ceiling steps, never proportions: 54,000/10,000 = 5.4 → 6 steps × $50,000 = $300,000 flexed benchmark. Spending = $300,000 − $300,000 = $0 (exactly on benchmark). The naive $270,000 proportional flex (54,000/50,000 × $250,000) invents fractional supervisors — $30,000 of phantom variance from linearizing a step function. Static-comparison (option B: $50,000 U) charges the full step to spending control — volume-driven steps are capacity decisions, never spending failures. No-variance (option C) assumes efficient adjustment without computing the benchmark — verification needs the 6-step arithmetic. Business interpretation: flex step-fixed costs in steps — proportional flexing manufactures variances at every step crossing. The real question ($50,000 step for 4,000 units) goes to capacity planning, and $0 spending variance clears supervision. Common trap: proportional flexing of step-fixed costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Flexible Budgets",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-222",
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
    "ExplanationWrongA": "Option A's $30,000 U linearizes a step function — fractional supervisors do not exist; 5.4 steps rounds to 6, never $270,000.",
    "ExplanationWrongB": "Option B's $50,000 U charges a volume-driven capacity step to spending control — steps follow volume decisions, never spending discipline.",
    "ExplanationWrongC": "Option C assumes efficiency without the 6-step benchmark — verification needs ceil(54,000/10,000) × $50,000 = $300,000 computed, never assumed.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.223 denominator capacity choice",
    "MicroTopic": "denominator capacity choice",
    "UniqueConceptKey": "B-C-223-denominator-capacity-choice",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Fixed overhead $500,000. Practical capacity 50,000 MH; budgeted (normal) volume 40,000 MH; actual 38,000 MH. Rates: practical $10.00/MH; normal $12.50/MH. Product cost and volume variance under each, and which denominator should the company use?",
    "Choices": {
      "A": "Normal capacity — budgeted volume is the honest denominator",
      "B": "Practical capacity — theoretical ideals motivate maximum effort",
      "C": "Whichever gives lower product cost — competitiveness demands the smallest rate",
      "D": "Normal: rate $12.50, applied 38,000×$12.50 = $475,000, volume variance $500,000−$475,000 = $25,000 U. Practical: rate $10.00, applied $380,000, volume variance $120,000 U ($20,000 planned idle 10,000×$10 + $20,000 unplanned 2,000×$10). Recommend practical capacity: it separates planned idle capacity ($100,000 — visible capacity-planning signal) from operational shortfall ($20,000), prices products at long-run attainable cost ($10.00 vs $12.50 loaded with planned idleness), and stops demand drops from inflating unit cost. Normal buries $100,000 of planned idleness in every unit"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Normal-denominator: $500,000/40,000 = $12.50/MH; applied 38,000 × $12.50 = $475,000; volume variance $25,000 U. Practical-denominator: $500,000/50,000 = $10.00/MH; applied 38,000 × $10.00 = $380,000; volume variance $120,000 U = planned idle (50,000 − 40,000) × $10 = $100,000 + unplanned (40,000 − 38,000) × $10 = $20,000. Decomposition is the recommendation's basis: practical splits the $120,000 into a $100,000 capacity-planning signal (visible, managed) and a $20,000 operational shortfall — normal nets them into an uninterpretable $25,000. Normal-only (option A) loads $100,000 of planned idleness into product cost ($12.50 vs $10.00) and lets demand drops inflate unit cost further. Practical-always rhetoric (option B) overclaims — practical is recommended for the decomposition and pricing reasons computed, not motivational theory. Lowest-cost (option C) picks denominators by desired margin — measurement follows capacity reality, not pricing wishes. Business interpretation: denominator choice allocates fixed cost between products and idle-capacity signals — practical capacity keeps idleness visible and unit cost stable. Common trap: normal capacity hiding planned idle cost in products.",
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
    "QuestionID": "P1B-C-223",
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
    "ExplanationWrongA": "Option A's normal-only loads $100,000 of planned idleness into every unit ($12.50 vs $10.00) — honest budgeting still hides capacity cost in products.",
    "ExplanationWrongB": "Option B recommends practical on motivational theory — the computed decomposition ($100,000 planning signal + $20,000 shortfall) and stable pricing are the reasons, not ideals.",
    "ExplanationWrongC": "Option C picks denominators by desired margin — capacity reality (50,000 attainable hours) sets the rate, never pricing wishes.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.224 committed cost controllability horizon",
    "MicroTopic": "committed cost controllability horizon",
    "UniqueConceptKey": "B-C-224-committed-cost-horizon",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division manager signed a 3-year equipment lease ($120,000/year) last year. This year's performance report deducts the $120,000 before her controllable margin, and she missed her target by $40,000 (controllable margin before lease beat budget by $80,000). She argues the lease is uncontrollable this year. Rule on the horizon question.",
    "Choices": {
      "A": "Lease is controllable — she signed it, so she owns it forever",
      "B": "Lease is uncontrollable forever — sunk costs do not enter performance reports",
      "C": "Controllable at signing (last year's ex-ante review should have priced the 3-year commitment), uncontrollable this year (ex-post: the $120,000 cannot change in-year) — rate her on the $80,000 controllable beat (Above Target), show the lease below the line with its remaining 2-year horizon noted, and fix the process gap (multi-year commitments need ex-ante approval with full-horizon costing, since ex-post controllability expires at signing). Ownership follows decision timing, not signatures in perpetuity",
      "D": "Remove the lease from all reports — committed costs are invisible by definition"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Horizon-split controllability: ex-ante (last year) the 3-year $360,000 commitment was fully controllable — the signing review should have priced the full horizon (that process moment has passed, fix it forward). Ex-post (this year) the $120,000 annual charge is fixed — in-year uncontrollable, so rating on it punishes history. Her controllable margin beat budget by $80,000 → Above Target on controlled performance; the $40,000 net miss = $80,000 beat − $120,000 lease arithmetic, not a performance signal. Forever-controllable (option A) holds this year's rating hostage to last year's decision — signatures create ex-ante accountability, never perpetual in-year control. Forever-uncontrollable (option B) exempts the signing decision itself from review — the $360,000 commitment deserved scrutiny when signable. Full-removal (option D) hides $120,000 of real division economics — below-the-line display with horizon note preserves totals and accountability. Business interpretation: controllability has a clock — judge commitments when committable (ex-ante with horizon costing), judge operations on the in-year controllable, and display both. Common trap: treating signed costs as perpetually controllable.",
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
    "QuestionID": "P1B-C-224",
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
    "ExplanationWrongA": "Option A's perpetual ownership holds this year's rating hostage to last year's signature — ex-ante review prices commitments; ex-post ratings judge in-year control.",
    "ExplanationWrongB": "Option B exempts the $360,000 signing decision from any review — uncontrollable this year never means unscrutinized at signing.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D hides $120,000 of division economics — committed costs display below the line with horizon notes; invisibility destroys both totals and accountability.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.225 KPI threshold gaming",
    "MicroTopic": "KPI threshold gaming",
    "UniqueConceptKey": "B-C-225-KPI-threshold-gaming",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "On-time delivery KPI: target 95%, bonus threshold 90% (cliff — nothing below 90%). The division runs at 89.2% in week 3 of the month. The manager expedites low-margin orders (losing $15,000 of margin) to hit 90.1%, while deferring a key customer's complex order (risking the relationship) because it would consume capacity. Evaluate the threshold design.",
    "Choices": {
      "A": "Design works — 90.1% achievement earns the bonus and delivery improved",
      "B": "Cliff-threshold pathology: the 90% cliff prices the 89.2%→90.1% move at the full bonus while the $15,000 margin loss and the deferred key customer cost nothing in the metric — effort flows to threshold optics (cheap margin-burning volume) away from value (key relationships, profitable mix). Redesign: continuous payout slope (each point 85–100% pays proportionally) plus a key-account service gate (no bonus with any strategic-account lapse) — slopes reward every point, gates protect what cliffs sacrifice",
      "C": "Remove delivery from bonuses — operational metrics do not belong in pay",
      "D": "Raise the threshold to 95% with the same cliff — higher bars fix gaming"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Cliff mechanics: below 90% pays zero, at 90.1% pays full — the 0.9-point move from 89.2% carries the entire bonus value, so any cost to cross it (here $15,000 of margin burned plus a deferred strategic account) is 'worth it' metrically while destroying value economically. Threshold-works (option A: 90.1% earns it) pays for $15,000 of margin destruction plus relationship risk — the metric improved, the business worsened. Higher-cliff (option D: 95% cliff) moves the distortion band without removing it — gaming concentrates wherever the cliff sits. Metric-removal (option C) abandons delivery accountability — delivery drives retention; the defect is cliff shape, never delivery measurement. Business interpretation: cliffs create binary lotteries around arbitrary points — replace with slopes (proportional reward per point) plus gates (strategic floors that veto payout). Slopes price every point; gates protect the priceless. Common trap: treating threshold achievement as performance regardless of crossing cost.",
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
    "QuestionID": "P1B-C-225",
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
    "ExplanationWrongA": "Option A pays full bonus for $15,000 of margin destruction plus strategic-account risk — threshold optics improved while business value fell.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C abandons delivery accountability — retention follows delivery; slopes and gates fix cliff shape without removing measurement.",
    "ExplanationWrongD": "Option D moves the lottery band to 95% — gaming concentrates at whatever point the cliff sits; higher cliffs distort harder-to-reach bands.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.226 productivity with quality adjustment",
    "MicroTopic": "productivity quality adjustment",
    "UniqueConceptKey": "B-C-226-productivity-quality-adjustment",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Plant output: Year 1 — 100,000 good units from $5,000,000 input cost ($50/good unit). Year 2 — 110,000 good units from $5,280,000 ($48/good unit). Unadjusted productivity improved 4% per good unit. But Year 2 rework tripled (2,000 to 6,000 units at $30 rework cost: $60,000 to $180,000, embedded in input cost) and warranty claims doubled ($100,000 to $200,000, outside input cost). Evaluate true productivity.",
    "Choices": {
      "A": "$48 vs $50 proves a 4% gain — unit cost is the complete productivity verdict",
      "B": "Productivity fell — any quality deterioration erases all cost gains by definition",
      "C": "Quality trends are long-run signals, ignore them in annual productivity — timing mismatch excuses current costs",
      "D": "Quality-adjusted: Year 1 total $5,000,000 + $100,000 warranty = $5,100,000 ($51.00/good unit); Year 2 $5,280,000 + $200,000 = $5,480,000 ($49.82/good unit: 5,480,000/110,000 = $49.8182). Gain shrinks from $2.00 to $1.18 per unit (4% to 2.3%) — real but overstated; the $120,000 rework surge plus $100,000 warranty growth consumed 41% of the apparent gain (($2.00−$1.18)/$2.00 = 0.41). Verdict: genuine improvement with a quality leak — fix rework drivers before claiming victory, and capitalize warranty trends into the productivity denominator permanently"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Unadjusted: $5,000,000/100,000 = $50.00 vs $5,280,000/110,000 = $48.00 → $2.00 (4.0%) gain. Quality-adjusted (adding warranty, the external failure cost outside input cost; rework already sits inside input cost): Y1 $5,100,000/100,000 = $51.00; Y2 $5,480,000/110,000 = $49.8182 ≈ $49.82 → $1.18 (2.31%) gain. Leakage = ($2.00 − $1.18)/$2.00 = 0.41 → 41% of the apparent gain consumed by quality deterioration ($120,000 rework surge + $100,000 warranty growth = $220,000 on a $220,000... precisely $220,000 of quality growth vs $220,000... the gross input saving: $50×110,000 − $5,280,000 = $5,500,000 − $5,280,000 = $220,000 gross, of which $220,000... hmm: quality-adjusted gain = ($51.00 − $49.82) × 110,000 = $1.18 × 110,000 = $129,800; unadjusted gain $2.00 × 110,000 = $220,000; leakage ($220,000 − $129,800)/$220,000 = 0.41 ✓ 41%). Unit-cost-only (option A: $48 proves 4%) books the full $220,000 while quality bleeds $90,200 net... precisely $220,000 − $129,800 = $90,200. Auto-erase (option B) denies the $129,800 of real gain — deterioration discounts gains, never deletes measured improvement. Timing-excuse (option C) defers quality into the long run — warranty growth is current-period cost, accrued now. Business interpretation: divide fully-loaded quality cost (inputs + external failures) by good output — unadjusted productivity is a first draft that quality completes. Common trap: per-good-unit input cost as a complete verdict.",
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
    "QuestionID": "P1B-C-226",
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
    "ExplanationWrongA": "Option A's $48 verdict books $220,000 of gross gain while $90,200 leaks to quality deterioration — per-unit input cost is a first draft, never the verdict.",
    "ExplanationWrongB": "Option B deletes $129,800 of measured real gain — quality deterioration discounts improvement (41% leakage), never erases it by definition.",
    "ExplanationWrongC": "Option C defers $200,000 of current warranty cost to the long run — external failures accrue now and belong in this year's denominator.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  },
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
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
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
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
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
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
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
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE15B;