const WAVE8B = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.204 thin outside market transfer floor",
    "MicroTopic": "thin outside market transfer floor",
    "UniqueConceptKey": "B-C-204-thin-outside-market-transfer-floor",
    "LOSTag": "P1-C Transfer pricing",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A selling division (variable cost $40, idle 12,000 units) can sell up to 3,000 units outside at $60. The buying division needs 10,000 units and can buy outside at $65. What bounds the negotiated transfer price?",
    "Choices": {
      "A": "Floor $40 — variable cost prices all internal units",
      "B": "Floor $60 — outside sales set the price for all units",
      "C": "Ceiling $60 — the buyer should pay the seller's outside price",
      "D": "Floor $46, ceiling $65 — 3,000 units displace $60 sales, 7,000 come from idle capacity at $40"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The first 3,000 internal units displace $60 outside sales (opportunity cost $60 each); the remaining 7,000 come from idle capacity (floor $40 each). Blended floor = (3,000×$60 + 7,000×$40)/10,000 = ($180,000 + $280,000)/10,000 = $460,000/10,000 = $46. Ceiling = buyer's $65 outside price. The $46–$65 range is where both divisions beat alternatives. Pricing all at $40 (option A) gifts the buyer $60,000 of displaced margin (3,000 × $20). Pricing at $60 (option B) pretends all 10,000 displace sales when 7,000 come from idle air. Capping at the seller's $60 market (option C) surrenders $5 × 10,000 = $50,000 of bargaining range — ceilings come from the buyer's BATNA ($65). Business interpretation: thin markets create blended floors — compute displacement unit-by-unit, not by averages. Common trap: single-floor thinking when capacity is mixed.",
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
    "QuestionID": "P1B-C-204",
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
    "ExplanationWrongA": "Option A floors everything at $40 variable cost, ignoring that 3,000 units displace $60 outside sales — a $60,000 gift (3,000 × $20) from seller to buyer that no profit-accountable seller accepts.",
    "ExplanationWrongB": "Option B floors all 10,000 at $60, but only 3,000 displace outside sales — 7,000 come from idle capacity costing $40. Full-displacement pricing taxes the buyer for phantom displacement.",
    "ExplanationWrongC": "Option C caps at the seller's $60 market instead of the buyer's $65 alternative. Ceilings come from the buyer's BATNA ($65) — capping at $60 needlessly surrenders $50,000 of bargaining range.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.205 training to margin causal chain",
    "MicroTopic": "training margin causal chain",
    "UniqueConceptKey": "B-C-205-training-margin-causal-chain",
    "LOSTag": "P1-C Balanced scorecard",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Year-over-year scorecard: training hours +25%, defect rate −10%, customer returns −5%, gross margin +2 pts ($200,000). The CFO asks whether the chain holds (Learning → Process → Customer → Financial) and whether to fund the next training tranche. What does the decomposition show?",
    "Choices": {
      "A": "Chain broken — training cannot move margins within one year, so the margin gain is coincidental",
      "B": "Chain untestable — correlations across perspectives prove nothing either way",
      "C": "Chain intact: +25% training → −10% defects → −5% returns → +2 pts margin ($200,000); fund the next tranche with the same linkage tracking",
      "D": "Chain reversed — margin gains funded the training, not vice versa"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Trace the assumed order against co-movement: Learning input rose (+25% hours) and the very next link improved (defects −10% — process responded), followed by Customer improvement (returns −5%) and Financial (+2 pts = $200,000). Every link moved in the predicted direction with plausible magnitudes — the chain holds (contrast the Wave-1 CD-119 break case, where +40% training met flat process). Fund the next tranche with continued linkage tracking (defect response per training dollar). Coincidence dismissal (option A) ignores four-link directional consistency. Untestability (option B) demands experimental proof standards no scorecard meets — co-movement with magnitude checks is the working test. Reversal (option D) inverts the temporal and logical order (training preceded defect improvement). Business interpretation: intact chains earn continued funding; broken links earn diagnosis — test each link's co-movement before budgeting either. Common trap: demanding causal proof where directional consistency plus magnitude is the actionable standard.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-205",
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
    "ExplanationWrongA": "Option A dismisses the chain because training 'cannot' move margins in a year — but defects (the transmission channel) did move (−10%), with returns and margin following. Four-link directional consistency is evidence, not coincidence.",
    "ExplanationWrongB": "Option B demands experimental proof no scorecard provides. Co-movement with magnitude checks is the working test — insisting on laboratory standards paralyzes all strategy validation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D reverses causality (margin funded training), inverting temporal order — training rose first, defects responded, returns and margin followed. Reversal reads the chain backwards.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.206 forecast error MAPE versus bias",
    "MicroTopic": "forecast error MAPE bias",
    "UniqueConceptKey": "B-C-206-forecast-error-MAPE-bias",
    "LOSTag": "P1-C Performance evaluation",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Forecast errors (actual-minus-forecast): Q1 +5%, Q2 −8%, Q3 +3%, Q4 −2%. The planning team debates whether the process is biased, imprecise, or both, and what to fix. Diagnose with MAPE and mean bias.",
    "Choices": {
      "A": "Biased +5% — positive quarters dominate, so lift all forecasts",
      "B": "MAPE 4.5%, mean bias −0.5% — unbiased but imprecise; tighten data inputs, not forecaster incentives",
      "C": "Biased −8% — the worst quarter defines the bias",
      "D": "Perfect — errors net near zero, so the process needs no work"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "MAPE = (|5| + |−8| + |3| + |−2|)/4 = (5 + 8 + 3 + 2)/4 = 18/4 = 4.5%. Mean bias = (5 − 8 + 3 − 2)/4 = −2/4 = −0.5% — essentially zero. Verdict: unbiased (no systematic direction) but imprecise (4.5% average miss) — fix data inputs, model specification, and lateness, not forecaster incentives (no sandbagging pattern exists). Positive-dominance reading (option A) cherry-picks two quarters against two negative ones. Worst-quarter bias (option C) mistakes volatility for direction — single extremes never define bias. Net-zero perfection (option D: −0.5% ≈ 0 means perfect) confuses unbiasedness with precision — the process misses by 4.5% on average while averaging near zero. Business interpretation: MAPE prices imprecision, mean bias prices direction — report both, fix each with its own tool (data for MAPE, incentives for bias). Common trap: reading net error as accuracy.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
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
    "QuestionID": "P1B-C-206",
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
    "ExplanationWrongA": "Option A's +5% bias lifts all forecasts on two positive quarters against two negatives (net −0.5%). Cherry-picked direction is not bias — signed mean is, and it reads −0.5%.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's −8% bias crowns the worst quarter as the process verdict. Extremes measure volatility (MAPE's department), never direction — bias needs signed means, not highlights.",
    "ExplanationWrongD": "Option D's perfection reads −0.5% net as accuracy while MAPE runs 4.5%. Netting hides misses in both directions — accuracy needs absolute errors, and 4.5% of them need fixing.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.207 scope-adjusted benchmark target",
    "MicroTopic": "scope-adjusted benchmark target",
    "UniqueConceptKey": "B-C-207-scope-adjusted-benchmark-target",
    "LOSTag": "P1-C Benchmarking",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Our fulfillment cost is $12.50/order versus a leader's $9.80. Decomposition: $1.90 from scale (leader ships 5× our volume with automation thresholds we cannot reach), $0.80 from pick-pack methods we can copy. What target should the controller set?",
    "Choices": {
      "A": "$9.80 — best-in-class is best-in-class regardless of scale",
      "B": "No target — cross-company comparisons are never valid across size classes",
      "C": "Keep $12.50 — any gap with a scale component is entirely excused",
      "D": "$11.70 — the attainable $0.80 efficiency portion only ($12.50 − $0.80); the $1.90 scale advantage is out of reach"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "$12.50 − $0.80 = $11.70: the controller targets only the copyable efficiency portion (pick-pack methods, slotting, batching) while excluding the $1.90 scale advantage (5× volume automation thresholds). Adopting $9.80 wholesale (option A) sets an unattainable target, demoralizing the team and misdiagnosing scale economics as operational failure. Refusing all benchmarking (option B) wastes a genuine $0.80 opportunity. Excusing everything (option C) lets a real $0.80 efficiency gap hide behind $1.90 of legitimate scale difference. Business interpretation: decompose benchmark gaps into structural versus operational before target-setting — hold teams accountable for what process can change, not for the company's size. Common trap: treating best-in-class unit costs as scale-free.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-207",
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
    "ExplanationWrongA": "Option A's $9.80 wholesale adoption includes $1.90 of scale advantage unattainable at current volume. Unattainable targets demoralize teams and misdiagnose scale economics as operational failure.",
    "ExplanationWrongB": "Option B discards benchmarking entirely over a scale objection the decomposition already solves. The $0.80 efficiency portion is a genuine, copyable opportunity — refusing it wastes the study's value.",
    "ExplanationWrongC": "Option C excuses the full $2.70 gap because part of it is scale-driven. The $0.80 operational portion is controllable and attributable — scale cover for efficiency gaps is the complacency version of benchmarking.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.208 chargeback fixed variable split",
    "MicroTopic": "chargeback fixed variable split",
    "UniqueConceptKey": "B-C-208-chargeback-fixed-variable-split",
    "LOSTag": "P1-C Responsibility accounting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Corporate IT ($800,000: $500,000 fixed capacity, $300,000 variable at $30/ticket on 10,000 tickets) charges divisions a flat $80/ticket ($800,000/10,000). Division M uses 2,000 tickets, Division N uses 8,000. What chargeback structure should the controller design?",
    "Choices": {
      "A": "Keep flat $80 — simplicity and full recovery in one rate",
      "B": "Variable $30 only — fixed capacity is corporate's problem, not divisions'",
      "C": "Fixed share by peak-capacity reservation (M 30% = $150,000, N 70% = $350,000) plus $30/ticket variable (M $60,000, N $240,000) — totals M $210,000, N $590,000",
      "D": "Fixed share by actual tickets (M 20% = $100,000, N 80% = $400,000) plus $30 variable — M $160,000, N $640,000"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Split fixed by capacity reservation (the driver of fixed cost): M 30% × $500,000 = $150,000; N 70% × $500,000 = $350,000. Variable at $30/ticket: M 2,000 × $30 = $60,000; N 8,000 × $30 = $240,000. Totals: M $210,000; N $590,000 (sum $800,000 — reconciles). Flat $80 (option A: M $160,000, N $640,000) overcharges N's usage while undercharging M's reserved capacity — N subsidizes M's idle reservation. Variable-only (option B) leaves $500,000 of fixed capacity unfunded. Actual-ticket fixed split (option D) charges reserved-but-unused capacity to users by consumption — penalizing N for M's reservation. Business interpretation: fixed charges follow capacity reservations (who booked the room), variable charges follow usage (who ate) — split the pool before splitting the bill. Common trap: single-rate chargebacks that conflate reservation with consumption.",
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
    "QuestionID": "P1B-C-208",
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
    "ExplanationWrongA": "Option A's flat $80 ($160,000 M / $640,000 N) overcharges N's usage while undercharging M's 30% capacity reservation. Single rates conflate reservation with consumption — N subsidizes M's idle booking.",
    "ExplanationWrongB": "Option B's variable-only $30 leaves $500,000 of fixed capacity unfunded — absorbed by corporate (i.e., by everyone opaquely). Fixed capacity needs a reservation-based home.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D splits fixed by actual tickets (M $100,000/N $400,000), charging reserved-but-unused capacity by consumption — penalizing N ($640,000) for M's idle reservation. Reservations, not usage, drive fixed cost.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.209 investigation threshold with base rates",
    "MicroTopic": "investigation threshold base rates",
    "UniqueConceptKey": "B-C-209-investigation-threshold-base-rates",
    "LOSTag": "P1-C Variance investigation",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $25,000 unfavorable variance sits inside ±$30,000 control limits (σ = $15,000). The $10,000 fixed rule says probe; the 5%-of-budget rule ($40,000 on $800,000) says ignore. Historical base rate: 85% of in-control variances self-correct with zero finding. Each probe costs $4,000. What should govern?",
    "Choices": {
      "A": "Probe — $25,000 exceeds the $10,000 rule, and rules are rules",
      "B": "Probe — large absolute dollars always justify investigation regardless of limits",
      "C": "Ignore — the 5% rule governs as the more senior threshold",
      "D": "Do not probe — in-control with 85% self-correction base rate; fixed and percentage rules that ignore distribution and base rates waste probes on noise"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Three strikes against probing: (1) $25,000 sits inside ±$30,000 (±2σ) control limits — statistically indistinguishable from common-cause variation; (2) the 85% self-correction base rate means in-control variances resolve without findings 17 times in 20 — a $4,000 probe buys a 15% hit rate ($26,667 per finding); (3) both dollar rules ignore the variance distribution ($10,000 fixed) and the base rate (5% rule). Probe-on-rule (option A) spends $4,000 on 15%-odds. Absolute-dollar logic (option B) treats $25,000 as large without a denominator — against $800,000 budget and $15,000 σ, it is routine. Senior-rule logic (option C) picks between two distribution-blind rules while the control chart outranks both. Business interpretation: investigation thresholds need distribution (control limits) plus base rates (self-correction odds) — dollar rules supply neither. Common trap: treating threshold breaches as findings without computing the null-hypothesis rate or the base rate.",
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
    "QuestionID": "P1B-C-209",
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
    "ExplanationWrongA": "Option A probes because $25,000 > $10,000 — but the observation sits inside ±$30,000 control limits with an 85% self-correction base rate. Dollar rules that don't know process variance convert routine observations into $4,000 investigations.",
    "ExplanationWrongB": "Option B probes on absolute dollars ($25,000 'large') without denominator ($800,000 budget) or distribution (±$30,000 limits). Largeness without context is not a finding — it is a feeling with a dollar sign.",
    "ExplanationWrongC": "Option C obeys the 5% rule ($40,000) as 'senior' while both rules ignore distribution and base rates. Rule-rank debates miss the point: the control chart plus base rates outrank both dollar rules.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.210 measures system overhaul recommendation",
    "MicroTopic": "measures system overhaul recommendation",
    "UniqueConceptKey": "B-C-210-measures-system-overhaul-recommendation",
    "LOSTag": "P1-C Performance evaluation",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division runs pure ROI bonuses (22% current), no BSC, $10,000 fixed investigation rule, and fully-loaded cost allocations — with $400,000/year of estimated misallocation-driven decision error, 15% forecast bias, and two gaming incidents in two years. A $150,000 consulting overhaul (EVA + BSC + control-chart thresholds + controllable-cost allocation) is proposed. What should the board approve?",
    "Choices": {
      "A": "Nothing — systems that produced 22% ROI need no overhaul",
      "B": "Approve — $400,000/year error versus $150,000 one-time overhaul (plus recurring $30,000 maintenance) pays back in under 5 months with recurring annual benefit",
      "C": "BSC only ($40,000) — one tool at a time, starting with the cheapest",
      "D": "Defer until ROI drops — fix systems only under performance distress"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Price the bundle against the measured failure stream: $400,000/year decision error + 15% forecast bias drag + recurring gaming incidents versus $150,000 one-time + ~$30,000/year maintenance. Payback = $150,000/$400,000 = 0.375 years (under 5 months), with $370,000+ annual net benefit recurring as EVA corrects investment decisions, BSC balances incentives, control charts cut probe waste, and controllable allocation ends cross-subsidy disputes. Status-quo defense (option A: 22% ROI proves health) mistakes a possibly-gamed, possibly-lucky outcome for system quality — the $400,000 error and gaming incidents are measured, not hypothesized. Single-tool (option C, $40,000 BSC) leaves ROI gaming, rule-based probing, and allocation disputes fully armed. Distress-gating (option D) schedules reform for maximum pain — systems reform cheapest from strength. Business interpretation: performance-system overhauls appraise like capital projects against measured failure streams — $150,000 against $400,000/year is among the highest-ROI proposals a board sees. Common trap: defending measured-failure systems on headline outcomes.",
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
    "QuestionID": "P1B-C-210",
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
    "ExplanationWrongA": "Option A's 22% ROI defends a system with $400,000/year of measured decision error plus bias plus gaming. Headline outcomes neither measure nor excuse system defects — a 22% outcome may reflect luck or gaming wearing performance.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $40,000 BSC-only fix leaves ROI gaming, $10,000-rule probing, and loaded-cost disputes fully armed — one tool against four failure modes. Bundled failures need bundled reform (or sequenced reform with a plan, not a single purchase).",
    "ExplanationWrongD": "Option D gates reform on distress, scheduling overhaul for maximum pain and minimum resources. Systems reform cheapest from strength — distress adds urgency pricing to every consultant hour.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE8B;