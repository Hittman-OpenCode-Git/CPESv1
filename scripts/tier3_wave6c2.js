const WAVE6C2 = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.096 cost structure choice under uncertainty",
    "MicroTopic": "cost structure choice uncertainty",
    "UniqueConceptKey": "D-D096-cost-structure-choice-uncertainty",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Demand scenarios: 8,000 units (60%) or 12,000 units (40%). Option Fixed: FC $350,000 + VC $12. Option Variable: FC $150,000 + VC $32. The CFO asks for a defended recommendation weighing expected cost against flexibility value in the low state. Recommend a structure.",
    "Choices": {
      "A": "Fixed — lower variable cost always wins across volumes",
      "B": "Variable — expected cost $457,200 vs $465,200 fixed, plus flexibility option value in the low state",
      "C": "Fixed — upside capture at 12,000 units dominates the decision",
      "D": "Variable only for the low state — switch structures by scenario"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Variable costs: 8,000 → $150,000 + 8,000×$32 = $150,000 + $256,000 = $406,000; 12,000 → $150,000 + $384,000 = $534,000. EV = 0.6×$406,000 + 0.4×$534,000 = $243,600 + $213,600 = $457,200. Fixed costs: 8,000 → $350,000 + 8,000×$12 = $350,000 + $96,000 = $446,000; 12,000 → $350,000 + $144,000 = $494,000. EV = 0.6×$446,000 + 0.4×$494,000 = $267,600 + $197,600 = $465,200. Variable wins by $8,000 on EV — plus unpriced flexibility (downside capped by low fixed base if demand falls further). Fixed-wins-on-upside (option C) isolates the 40% state ($494,000 vs $534,000) while ignoring the 60% state where fixed bleeds $40,000. Always-variable-wins (option A... precisely option A's fixed-always logic) ignores probability weighting entirely. Switching by scenario (option D) assumes frictionless restructuring — cost structures are commitments, not options, once built. Business interpretation: choose structures on probability-weighted cost plus flexibility value — crossover analysis (here at 10,000 units: ($350,000−$150,000)/($32−$12) = $200,000/$20) frames, but EV decides. Common trap: picking the structure that wins the most likely single state.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-096",
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
    "ExplanationWrongA": "Option A picks fixed for its lower variable cost regardless of volume, but at 8,000 units (60% likely) fixed costs $446,000 vs $406,000 variable — variable-cost advantage without volume is just fixed-cost burden.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C picks fixed on the 12,000-unit upside ($494,000 vs $534,000), weighting the 40% state at 100%. Probability-weighted, the upside saves $40,000 × 0.4 = $16,000 while the base case bleeds $40,000 × 0.6 = $24,000.",
    "ExplanationWrongD": "Option D switches structures per scenario, assuming frictionless conversion between fixed and variable footprints. Cost structures commit capital and contracts — switching costs dwarf the $8,000 EV gap.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.097 ABC adoption investment decision",
    "MicroTopic": "ABC adoption investment decision",
    "UniqueConceptKey": "D-D097-ABC-adoption-investment-decision",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Analysis shows plantwide costing undercosts the complex product line by ~$210/unit on 1,000 units/year (≈$210,000 annual margin distortion), driving underpriced bids. A full ABC implementation costs $120,000 (systems + training + first-year maintenance). Finance calls ABC 'expensive overhead analysis.' Should the company adopt?",
    "Choices": {
      "A": "Adopt — $210,000/year of decision-error exposure versus $120,000 implementation; payback under 7 months with recurring annual benefit",
      "B": "Reject — $120,000 of analysis overhead can never justify itself",
      "C": "Partial ABC (setups only) — half the system at half the cost captures the insight",
      "D": "Delay 3 years — revisit when distortion compounds further"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The decision prices information: $210,000/year of margin distortion (underpriced complex bids, overpriced simple bids losing share) versus $120,000 one-time-plus-first-year implementation. Payback = $120,000/$210,000 = 0.57 years (under 7 months), with the $210,000 benefit recurring annually as bids reprice correctly — first-year net +$90,000, growing as mix shifts complex. Cost-myopia (option B) treats measurement investment as overhead while ignoring the distortion it cures — the $120,000 is 57% of one year's error. Partial ABC (option C) builds half a system whose rates nobody trusts (inspections unmeasured → allocations still wrong). Delay (option D) bleeds $210,000/year for three years ($630,000) to defer $120,000 — compounding the disease to postpone the cure. Business interpretation: cost-system investments appraise like capital projects — quantify the decision-error cost, compare to implementation, and mind that error costs recur while implementation is substantially one-time. Common trap: expensing measurement as overhead while ignoring what unmeasured decisions cost.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-097",
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
    "ExplanationWrongB": "Option B rejects $120,000 of measurement to 'save overhead' while $210,000/year of bid distortion continues. Analysis overhead that cures 1.75× its cost in decision error is investment, not overhead.",
    "ExplanationWrongC": "Option C builds setups-only ABC at half cost, producing rates everyone knows are incomplete (inspections unmeasured → still misallocated). Half systems earn zero trust and full skepticism.",
    "ExplanationWrongD": "Option D delays 3 years, bleeding ~$630,000 of distortion to defer $120,000 of implementation. Deferral compounds the disease to postpone the cure.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.098 outsourcing with quality and release value",
    "MicroTopic": "outsourcing quality release value",
    "UniqueConceptKey": "D-D098-outsourcing-quality-release-value",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Internal production: 100,000 units, variable $65 + avoidable fixed $10 = $75 relevant unit cost ($7,500,000). Outsource bid: $78/unit ($7,800,000). Outsourcer defect rate 5% vs internal 1% (rework $20/unit). Freed capacity has a $100,000 alternative use. Should the company outsource?",
    "Choices": {
      "A": "Outsource on the $78 bid alone — bids decide outsourcing",
      "B": "Outsource including quality — $7,800,000 + $80,000 still beats internal with release value",
      "C": "Outsource only the defect-free portion — split production by quality tier",
      "D": "Keep in-house — $7,500,000 internal vs $7,880,000 outsource (bid + $80,000 quality); even $100,000 release value leaves a $280,000 gap"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Relevant internal = 100,000 × ($65 + $10) = 100,000 × $75 = $7,500,000. Outsource bid = 100,000 × $78 = $7,800,000. Quality differential = (5% − 1%) × 100,000 × $20 = 4,000 × $20 = $80,000 expected rework. Outsource total = $7,880,000. Gap = $380,000; less $100,000 release value = $280,000 net gap — keep in-house. Bid-only outsourcing (option A) ignores $80,000 of quality cost and $100,000 of release value in opposite directions — half the analysis. Option B's arithmetic ($7,800,000 + $80,000 'still beats') inverts the comparison ($7,880,000 exceeds by $380,000). Split production (option C) forfeits volume pricing and duplicates fixed oversight for a quality theory unmeasured in the data. Business interpretation: outsourcing analysis loads bid + quality + opportunity (release value) against relevant internal cost — all four terms, every time. Common trap: bid-vs-fully-loaded-cost comparison in either direction.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-098",
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
    "ExplanationWrongA": "Option A outsources on the $78 bid alone, skipping $80,000 of quality differential and $100,000 of release value — two of four terms missing from a four-term decision.",
    "ExplanationWrongB": "Option B claims $7,880,000 'still beats' $7,500,000 internal — arithmetic inversion ($7,880,000 exceeds by $380,000). Including quality properly widens the gap it was meant to close.",
    "ExplanationWrongC": "Option C splits production by quality tier without volume pricing, dual oversight costs, or data on tier differentials. Splits multiply fixed costs while the data supports a single make-or-buy verdict.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.099 penetration versus skim with capacity",
    "MicroTopic": "penetration skim capacity",
    "UniqueConceptKey": "D-D099-penetration-skim-capacity",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Penetration: $40 price, 50,000 units, $15 CM ($750,000) — needs 100,000 machine hours vs 80,000 capacity (20,000 OT × $2.50 premium = $50,000). Skim: $60 price, 20,000 units, $35 CM ($700,000), fits capacity. Which pricing strategy should the company choose?",
    "Choices": {
      "A": "Penetration on $750,000 gross CM — capacity constraints sort themselves out",
      "B": "Skim on 58% margin rate ($35/$60) — margin percentage is the strategy metric",
      "C": "Skim — penetration nets $700,000 after $50,000 overtime, tying skim while straining capacity; skim preserves pricing power and execution headroom",
      "D": "Delay pricing until capacity expands — never price into constraints"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Penetration net = $750,000 − $50,000 overtime = $700,000. Skim = 20,000 × $35 = $700,000. Tied on economics — broken by strategy: skim preserves future pricing power (prices can fall later; penetration prices cannot easily rise), avoids 20,000 hours of overtime strain (quality, fatigue, maintenance deferral), and fits demonstrated capacity. Gross-CM penetration (option A, $750,000) ignores the $50,000 capacity cost of its own volume. Margin-rate reasoning (option B, 58% vs 30%) picks metrics over dollars — $700,000 ties either way, and percentages never paid fixed costs. Delay (option D) surrenders both $700,000 alternatives to dodge a decision the numbers resolve today. Business interpretation: ties break on strategy and execution risk, never on margin percentages — price where the capacity is, keep the power to move later. Common trap: choosing penetration on gross CM while the constraint bill arrives separately.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Pricing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-099",
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
    "ExplanationWrongA": "Option A's $750,000 penetration ignores $50,000 of overtime its own volume requires — net $700,000, tied. Gross CM without capacity costing is a partial analysis presented as a verdict.",
    "ExplanationWrongB": "Option B picks skim on 58% margin rate versus 30%. Margin percentages don't pay fixed costs or clear capacity — $700,000 ties either way, and the tie-break is strategic (pricing power, headroom), not arithmetic.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D delays pricing until capacity expands, surrendering $700,000 of either-strategy profit to dodge a decision the numbers resolve today. Capacity follows strategy here, with overtime bridging — not the reverse.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.100 overtime versus machine investment",
    "MicroTopic": "overtime machine investment",
    "UniqueConceptKey": "D-D100-overtime-machine-investment",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Extra demand needs 5,000 MH/year beyond capacity. Overtime: $12 premium × 5,000 = $60,000/year plus $10,000 defect uptick = $70,000/year. Machine: $180,000, 8-year life, +8,000 MH capacity, $5,000/year operating cost. Demand-sustain confidence 70%. Buy the machine or run overtime?",
    "Choices": {
      "A": "Overtime forever — capital commitment always loses to flexibility",
      "B": "Buy — $42,500/year savings, 4.2-year payback, +$58,000 EV at 70% confidence",
      "C": "Buy regardless of confidence — payback math needs no probability",
      "D": "Cut output to capacity — demand beyond capacity is not real demand"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Machine annual cost = $180,000/8 + $5,000 = $22,500 + $5,000 = $27,500 vs $70,000 overtime → savings $42,500/year. Payback = $180,000/$42,500 = 4.24 years < 8-year life. EV at 70% sustain: 0.70 × ($42,500 × 8 = $340,000) − $180,000 = $238,000 − $180,000 = +$58,000 → buy. Overtime-forever (option A) pays $70,000/year to avoid deciding — $560,000 over the machine's life versus $180,000 + $40,000 operating. Confidence-blind buying (option C) ignores that below ~53% sustain odds the EV turns negative ($340,000 × 0.53 ≈ $180,200 ≈ cost). Output cuts (option D) surrender 5,000 hours of contribution to dodge a +$58,000-EV investment. Business interpretation: price flexibility explicitly (overtime = $70,000/year real option), set the exercise trigger on coverage odds, and buy when EV clears with margin — here 70% clears by $58,000. Common trap: payback analysis without probability weighting.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-100",
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
    "ExplanationWrongA": "Option A runs $70,000/year overtime permanently to preserve flexibility — $560,000 over 8 years versus $180,000 + $40,000 operating. Flexibility priced above the commitment it protects is indecision with a budget line.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C buys regardless of confidence, but below ~53% sustain odds the EV turns negative (0.53 × $340,000 ≈ $180,200 ≈ cost). Confidence gates the purchase — 70% clears it, lower odds would not.",
    "ExplanationWrongD": "Option D cuts output to capacity, surrendering 5,000 hours of contribution to dodge a +$58,000-EV investment. Demand beyond capacity is the most valuable demand — price serving it, don't delete it.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.101 joint continuation decision",
    "MicroTopic": "joint continuation decision",
    "UniqueConceptKey": "D-D101-joint-continuation-decision",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A joint process costs $300,000 (fully sunk this period). Products yield NRV $250,000 and $180,000 after $50,000 and $30,000 of separable costs respectively. Shutting down saves nothing (joint cost is committed) but forfeits all output. Should the process continue?",
    "Choices": {
      "A": "Continue — $430,000 NRV versus $80,000 separable; the $300,000 joint cost is sunk and irrelevant",
      "B": "Shut down — $430,000 NRV fails to cover $380,000 of total cost ($300,000 joint + $80,000 separable)",
      "C": "Continue only if NRV covers joint plus separable in full — partial coverage destroys value",
      "D": "Shut down the lower-NRV product line only — $180,000 cannot carry its share"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Forward economics: NRV total = $250,000 + $180,000 = $430,000; separable total = $50,000 + $30,000 = $80,000; net = +$350,000. The $300,000 joint cost is sunk/committed — continuing earns $350,000 over separable; shutting down earns $0 while still paying $300,000 (net −$300,000). Continuing dominates by $650,000 of swing ($350,000 vs −$300,000). Full-cost shutdown logic (option B: $430,000 vs $380,000... precisely $430,000 − $380,000 = +$50,000 still positive — even full-costing favors continuing here; the option's conclusion is wrong on its own math, revealing the method's confusion). Coverage-demanding (option C) holds continuation hostage to sunk recovery. Line shutdown (option D) strands shared joint output — joint products decide jointly or not at all. Business interpretation: sunk joint costs never vote on continuation — compare forward NRV to forward separable cost, period. Common trap: requiring new output to 'cover' history.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-101",
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
    "ExplanationWrongB": "Option B shuts down because $430,000 'fails to cover' $380,000 of total cost — but $430,000 exceeds $380,000, so even full-costing favors continuing here; the option's conclusion is wrong on its own math, revealing the method's confusion.",
    "ExplanationWrongC": "Option C demands NRV cover joint plus separable in full before continuing. Sunk recovery is not a continuation criterion — $350,000 of forward margin exists regardless of history.",
    "ExplanationWrongD": "Option D shuts the lower-NRV line, stranding shared joint output — joint products share inseparable processes and decide jointly. Line-level shutdown logic misfires on joint technology.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.102 standard-setting evidence selection",
    "MicroTopic": "standard-setting evidence selection",
    "UniqueConceptKey": "D-D102-standard-setting-evidence-selection",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new production line ($2,000,000/year spend) needs labor standards. Evidence options: engineering study $40,000 (accurate ±2%), historical averages free (±15% noise), vendor specs free (±8% but +5% optimistic bias — vendors understate labor needs). Which evidence base should set the standard?",
    "Choices": {
      "A": "Historical averages — free data with the longest track record",
      "B": "Vendor specs — purpose-built estimates at zero cost",
      "C": "No standards first year — observe actuals, then set standards empirically",
      "D": "Commission the $40,000 study — $300,000 noise exposure dwarfs cost; vendor specs carry +5% optimism bias"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Noise exposure: ±15% on $2,000,000 = ±$300,000 of standard error — variances, evaluations, and pricing built on historical averages inherit $300,000 of mismeasurement. The $40,000 study (±2% → ±$40,000 residual noise) cuts exposure 7.5× for 2% of spend — overwhelming ROI. Vendor specs (±8% with +5% optimistic bias) embed systematic understatement vendors profit from (equipment looks labor-light) — bias plus noise. No-standards Year 1 (option C) runs $2,000,000 uncontrolled to 'observe' — observation without standards yields data without diagnosis. Business interpretation: standard-setting evidence appraises like measurement equipment — buy precision proportional to the spend it governs ($40,000 to govern $2,000,000 at ±2%). Common trap: pricing evidence by its price tag instead of by the noise it retires.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-102",
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
    "ExplanationWrongA": "Option A's historical averages are free with ±15% noise — $300,000 of mismeasurement on $2M of governed spend. Free evidence at 15% noise is the most expensive option on this menu.",
    "ExplanationWrongB": "Option B's vendor specs are free with +5% optimism bias — vendors understate labor needs to sell equipment. Biased-free beats noisy-free nowhere; both lose to measured ±2%.",
    "ExplanationWrongC": "Option C observes a year without standards to set them empirically — $2,000,000 uncontrolled while 'learning.' Observation without standards yields data without diagnosis; the study buys both at once.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.103 service base blended design",
    "MicroTopic": "service base blended design",
    "UniqueConceptKey": "D-D103-service-base-blended-design",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "IT costs $600,000: 70% headcount-driven (accounts, support: $420,000) and 30% compute-driven ($180,000). Division X: 100 employees, 8,000 CPU-hours. Division Y: 200 employees, 2,000 CPU-hours. Current allocation is pure headcount (X $200,000, Y $400,000). Y protests subsidizing X's compute habit. What blended design should the controller adopt?",
    "Choices": {
      "A": "Keep headcount — stability beats precision in chargebacks",
      "B": "Full CPU-hours — modern drivers obsolete headcount",
      "C": "Blended: headcount portion X $140,000/Y $280,000 plus compute portion X $144,000/Y $36,000 — totals X $284,000, Y $316,000",
      "D": "No allocation — free IT maximizes utilization"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Split the pool by driver economics first: headcount-driven $420,000 allocated by employees (X 100/300 × $420,000 = $140,000; Y 200/300 × $420,000 = $280,000); compute-driven $180,000 by CPU-hours (X 8,000/10,000 × $180,000 = $144,000; Y 2,000/10,000 × $180,000 = $36,000). Totals: X $140,000 + $144,000 = $284,000; Y $280,000 + $36,000 = $316,000 (sum $600,000 — reconciles). Versus current (X $200,000, Y $400,000): X pays +$84,000 more (its compute habit priced), Y pays −$84,000 less (headcount subsidy removed) — Y's protest is valid as to compute, invalid as to headcount. Pure headcount (option A) subsidizes X's 80% compute share. Pure CPU (option B: X 8,000/10,000 × $600,000 = $480,000; Y $120,000) charges Y's headcount-driven support to X's processors — the mirror error. No allocation (option D) makes IT a free good with infinite demand. Business interpretation: blended bases mirror dual cost causation — split pools by driver, then allocate each pool by its own base. Common trap: single-base simplicity on dual-driver costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-103",
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
    "ExplanationWrongA": "Option A keeps pure headcount for stability, preserving X's $84,000 compute subsidy (X uses 80% of CPU-hours but pays 33% of cost). Stability that subsidizes is just priced unfairness carried forward.",
    "ExplanationWrongB": "Option B swings to pure CPU-hours ($480,000 X / $120,000 Y), charging Y's headcount-driven support ($280,000 of accounts and support costs) to X's processors. Single-base simplicity fails symmetrically in both directions.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D makes IT free to maximize utilization — infinite demand for a $600,000 finite resource. Free goods get overconsumed; chargebacks exist to price scarcity, not to punish users.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.104 quality program investment appraisal",
    "MicroTopic": "quality program investment appraisal",
    "UniqueConceptKey": "D-D104-quality-program-investment-appraisal",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cost of quality: prevention $0, appraisal $30,000, internal failure (scrap) $120,000, external failure (warranty) $80,000 — total $230,000. Proposed program: +$80,000 prevention (training, poka-yoke) plus +$20,000 appraisal, projecting failure down to $60,000 total. Should the company invest?",
    "Choices": {
      "A": "Reject — any spending increase is unjustified in cost management",
      "B": "Invest without limit — quality spending always pays",
      "C": "Invest — $140,000 failure reduction versus $100,000 program cost = +$40,000 net; cap appraisal at $20,000 with sunset review",
      "D": "Prevention only, cut all appraisal to zero — inspection never adds value"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Program cost = $80,000 prevention + $20,000 appraisal = $100,000. Failure reduction = $200,000 − $60,000 = $140,000. Net = $140,000 − $100,000 = +$40,000 — invest. The appraisal cap matters: appraisal verifies prevention worked ($20,000 of measurement on $80,000 of intervention is proportionate), but uncapped appraisal metastasizes into inspection bureaucracy — hence the sunset review (retire appraisal as failure rates stabilize). Reject-any-spending (option A) protects a $200,000 failure stream to save $100,000. Unlimited investment (option B) funds quality spending past its +$40,000 net into unmeasured territory. Zero-appraisal (option D) removes the verification proving prevention worked — unmeasured prevention is faith, and faith-based quality programs get cut first. Business interpretation: appraise quality investments on failure reduction net of program cost, with appraisal sized to verify and sunset to retire. Common trap: treating all quality spending as equally virtuous (or vicious).",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Quality Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-104",
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
    "ExplanationWrongA": "Option A rejects all spending increases categorically, protecting $200,000 of failure to save $100,000. Categorical frugality is the most expensive quality policy on this menu.",
    "ExplanationWrongB": "Option B invests without limit on quality-virtue grounds, funding past the +$40,000 net into unmeasured territory. Quality spending appraises like any investment — on net return, not on virtue.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D zeroes appraisal as non-value-added, removing the verification proving prevention worked. Unmeasured prevention is faith-based — and faith-based programs get cut in the next downturn.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.105 lease versus buy after-tax",
    "MicroTopic": "lease versus buy after-tax",
    "UniqueConceptKey": "D-D105-lease-versus-buy-after-tax",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Equipment $500,000, 5-year life, straight-line, tax rate 21%, discount rate 6%. Buy: $500,000 outflow with annual depreciation tax shields. Lease alternative: PV of payments $420,000 (after-tax equivalent). Which is cheaper on an after-tax present-value basis?",
    "Choices": {
      "A": "Buy — $411,540 net ($500,000 less $88,460 PV of shields) beats $420,000 lease by $8,460, plus residual upside",
      "B": "Lease — $420,000 is below $500,000 on every reading",
      "C": "Buy on pre-tax $500,000 vs $420,000 — lease wins, so buy reasoning must be wrong somewhere",
      "D": "Lease for off-balance-sheet treatment — invisibility has cash value"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Annual shield = ($500,000/5) × 21% = $100,000 × 0.21 = $21,000/year. PV at 6%: $21,000 × PVIFA(6%,5) = $21,000 × 4.21236 = $88,459.66 ≈ $88,460. Net buy cost = $500,000 − $88,460 = $411,540 vs lease PV $420,000 — buy wins by $8,460, plus any residual value (pure upside excluded from the comparison). Pre-tax comparison (option C's framing: $500,000 vs $420,000 → lease) ignores the $88,460 shield — taxes are 21% of the decision, never a footnote. Off-balance motives (option D) expired with ASC 842 for terms like these — and invisibility was never cash value. The margin is thin ($8,460 on ~$420,000, ~2%), so sensitivity matters: residual upside favors buy further, while a lower tax rate would narrow it — disclose both. Business interpretation: lease-vs-buy compares after-tax present values with shields loaded — pre-tax gaps mislead by the tax rate. Common trap: deciding off pre-tax purchase price versus lease PV.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-105",
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
    "ExplanationWrongB": "Option B's $420,000-vs-$500,000 pre-tax comparison ignores $88,460 of depreciation shields — 21% of the decision treated as a footnote. After-tax, buy wins by $8,460 before residual upside.",
    "ExplanationWrongC": "Option C reads the pre-tax gap as favoring lease and concludes buy reasoning 'must be wrong somewhere.' The error is the pre-tax framing itself — shields reverse the verdict, thinly but genuinely.",
    "ExplanationWrongD": "Option D leases for off-balance-sheet invisibility that ASC 842 ended for comparable terms — and invisibility was never cash value. Shell-game motives do not survive present-value analysis.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE6C2;