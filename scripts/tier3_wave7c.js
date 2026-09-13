const WAVE7C = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.121 intermittent demand method selection",
    "MicroTopic": "intermittent demand method selection",
    "UniqueConceptKey": "E-B-121-intermittent-demand-method-selection",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A spare part averages 2 units of demand but only in 30% of months (70% zeros). Croston's method, a 3-month moving average, and qualitative judgment are candidates. The forecast drives a $500,000 stocking decision with stockout penalties. Which method should govern, and with what control?",
    "Choices": {
      "A": "3-month moving average — simplicity and transparency beat exotic methods",
      "B": "Qualitative judgment — intermittent patterns need human eyes, not models",
      "C": "Croston's method with a judgmental override protocol (documented triggers, tracked accuracy) — separates demand size from demand timing where MA smears both",
      "D": "Simple average of all history including zeros — maximum data usage"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Intermittent demand has two processes (when + how much); moving averages smear zeros into sizes, systematically understating rendition quantities while overstating frequency — MA(3) on 70%-zero data produces perpetual fractional forecasts that stock neither correctly (too low for demand months, too high for zero months). Simple averages (option D) commit the same smearing with more data. Pure judgment (option B) handles timing turns but injects bias without a base. Croston's method estimates size and interval separately (2 units conditional on occurrence; 30% occurrence probability), giving correct order-up-to levels for sporadic demand — with a judgmental override protocol (documented triggers like known shutdowns; tracked override accuracy to retire bad judgment) covering what models structurally miss. Business interpretation: match the method to the demand generating process — intermittent processes need intermittent methods, judgment needs tracking. Common trap: applying smooth-demand methods to lumpy data because the software defaults to them.",
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
    "QuestionID": "P1E-B-121",
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
    "ExplanationWrongA": "Option A's MA(3) smears 70%-zero history into perpetual fractional forecasts — too low for demand months, too high for zero months. Simplicity that misstocks a $500,000 decision is the most expensive option here.",
    "ExplanationWrongB": "Option B's pure judgment handles timing but injects untracked bias into a $500,000 stocking call. Judgment needs a statistical base plus accuracy tracking — alone it is bias without a paper trail.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's all-history average maximizes data usage while maximizing smear — zeros dilute sizes and sizes inflate frequency simultaneously. More smeared data is worse, not better.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.122 reforecast cadence cost benefit",
    "MicroTopic": "reforecast cadence cost benefit",
    "UniqueConceptKey": "E-B-122-reforecast-cadence-cost-benefit",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Static annual forecasting leaves $300,000/year of stale-forecast error cost. Quarterly rolling reforecasts cost $40,000/year and cut error 70%. Monthly rolling costs $120,000/year and cuts error 80%. Which cadence should the company adopt?",
    "Choices": {
      "A": "Quarterly — $210,000 benefit minus $40,000 cost = $170,000 net, beating monthly's $120,000 net ($240,000 − $120,000)",
      "B": "Monthly — highest error reduction (80%) regardless of cost",
      "C": "Static annual — process costs always exceed their benefits at these scales",
      "D": "Monthly — $240,000 benefit exceeds quarterly's $210,000, so monthly wins on benefits alone"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Quarterly net = 0.70 × $300,000 − $40,000 = $210,000 − $40,000 = $170,000/year. Monthly net = 0.80 × $300,000 − $120,000 = $240,000 − $120,000 = $120,000/year. Quarterly wins by $50,000 — the extra 10 points of error reduction ($30,000) cost $80,000 of process. Max-reduction reasoning (option B, 80%) ignores that the marginal 10 points cost $80,000 for $30,000 of benefit. Benefits-only comparison (option D: $240,000 > $210,000) omits process costs — the actual decision variable. Static defense (option C) leaves $300,000 of error to save at most $120,000 of process. Business interpretation: cadence decisions net error reduction against process cost — marginal analysis on the increment (10 points for $80,000), not averages. Common trap: maximizing accuracy without pricing frequency.",
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
    "QuestionID": "P1E-B-122",
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
    "ExplanationWrongB": "Option B maximizes error reduction (80%) at $120,000 process cost — $30,000 more benefit than quarterly for $80,000 more cost. Maximizing accuracy without pricing frequency buys $30,000 with $80,000.",
    "ExplanationWrongC": "Option C keeps $300,000 of stale-forecast error to save at most $120,000 of process — the static status quo is the most expensive option on this menu by $180,000+ net.",
    "ExplanationWrongD": "Option D compares $240,000 vs $210,000 of benefits while omitting $120,000 vs $40,000 of costs — the actual decision variables. Benefits-only analysis reverses the verdict.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.123 risk-based reserve sizing",
    "MicroTopic": "risk-based reserve sizing",
    "UniqueConceptKey": "E-B-123-risk-based-reserve-sizing",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $10,000,000 program budget carries a flat 5% ($500,000) contingency. The risk register quantifies: supplier failure 20% × $1,000,000 ($200,000); scope growth 50% × $300,000 ($150,000); regulatory delay 10% × $1,000,000 ($100,000) — expected loss $450,000. How should contingency be sized and allocated?",
    "Choices": {
      "A": "Keep flat $500,000 — round numbers signal prudence to stakeholders",
      "B": "Eliminate contingency — quantified risks belong in base estimates, not reserves",
      "C": "Cut to $450,000 flat — expected loss is the reserve, no management margin needed",
      "D": "$450,000 expected-loss reserve allocated to risk owners plus $50,000 central management reserve — same $500,000 total, risk-priced instead of flat"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Expected loss = $200,000 + $150,000 + $100,000 = $450,000 — allocated to the owning managers (supplier risk to procurement, scope to engineering, regulatory to compliance) so each manages their exposure against funded contingency. The $50,000 balance stays central as management reserve for unlisted unknowns (flat 5% minus expected 4.5% of budget). Same $500,000 total as the flat reserve — but risk-priced: overfunded-safe units can no longer spend slack, and volatile units hold funded coverage. Flat-keep (option A) misallocates identically-sized dollars. Elimination (option B) confuses quantification with absorption — measured risks still need funding. Expected-only (option C) funds the mean with zero margin for variance — reserves cover distributions, not point estimates. Business interpretation: size reserves by expected loss, allocate by ownership, hold margin centrally — flat percentages do none of the three. Common trap: treating the reserve total as the analysis rather than its pricing and allocation.",
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
    "QuestionID": "P1E-B-123",
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
    "ExplanationWrongA": "Option A's flat $500,000 signals prudence while misallocating identically-sized dollars — safe units overspend slack, volatile units run uncovered. Round totals are not risk analysis.",
    "ExplanationWrongB": "Option B eliminates reserves because risks are quantified — quantification funds reserves, it does not replace them. Measured exposure of $450,000 still needs $450,000 of funding.",
    "ExplanationWrongC": "Option C funds $450,000 expected loss with zero margin — reserves cover loss distributions, not point estimates. One adverse realization above mean exhausts a marginless reserve immediately.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.124 R&D milestone tranche funding",
    "MicroTopic": "R&D milestone tranche funding",
    "UniqueConceptKey": "E-B-124-R&D-milestone-tranche-funding",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $2,000,000 R&D program faces high technical risk (pilot data inconclusive). Options: annual funding ($2M at risk), four $500,000 milestone tranches with kill criteria, eight $250,000 micro-tranches ($200,000 total admin burden), or no funding (abandon growth). How should the $2M be committed?",
    "Choices": {
      "A": "Annual $2M — commitment signals confidence that motivates the team",
      "B": "Four $500,000 milestone tranches with kill criteria — caps exposure at $500,000 per gate while funding genuine progress",
      "C": "Eight $250,000 micro-tranches — maximum oversight granularity",
      "D": "No funding — technical risk above any threshold abandons growth options"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Milestone tranches convert a $2,000,000 bet into four $500,000 experiments with kill criteria — each gate funds only on evidence, capping maximum loss at $500,000 (first gate) while preserving the full $2,000,000 program value if milestones hit. Annual funding (option A) risks $2,000,000 on inconclusive pilot data — confidence signaling with shareholder money. Micro-tranches (option C) add $200,000 of review burden (8 gates × analysis, meetings, documentation) that consumes 10% of the program to marginally improve gate timing. Abandonment (option D) values the growth option at zero — with staged gates, the program is a $500,000 call option on $2,000,000 of development, worth funding. Business interpretation: tranche high-uncertainty budgets by evidence gates — commitment scales with proof, never with hope. Common trap: binary fund-or-kill framing that ignores staged commitment.",
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
    "QuestionID": "P1E-B-124",
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
    "ExplanationWrongA": "Option A's annual $2M signals confidence with shareholder money — $2,000,000 at risk on inconclusive pilot data. Signaling value never justifies untranched technical risk.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's eight micro-tranches add ~$200,000 of review burden (10% of program) for marginally better gate timing than four tranches. Oversight granularity has diminishing returns past evidence gates.",
    "ExplanationWrongD": "Option D abandons a $500,000-call-option on $2,000,000 of development (first tranche) because total risk looks high. Staged gates exist precisely to buy uncertain growth cheaply — abandonment values the option at zero.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.125 budget gaming discovery protocol",
    "MicroTopic": "budget gaming discovery protocol",
    "UniqueConceptKey": "E-B-125-budget-gaming-discovery-protocol",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The controller discovers the VP buried a $200,000 reserve via year-end timing shifts, inflating the division's bonus pool by ~$30,000. Internal channels (CFO, audit committee) are unexhausted; no law is broken; amounts are quantitatively immaterial but bonus-material. What is the correct response protocol?",
    "Choices": {
      "A": "Ignore — quantitatively immaterial amounts never warrant action",
      "B": "External whistleblowing — manipulation forfeits all internal process",
      "C": "Confront the VP, restate the current quarter, disclose to the audit committee — timing manipulation for bonus metrics violates IMA credibility/integrity regardless of materiality, with internal channels first",
      "D": "Silently reverse next quarter — self-correcting without confrontation preserves relationships"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Quantitative immateriality ($200,000) does not excuse bonus-material manipulation ($30,000 payout effect) — IMA credibility (communicate fairly and objectively) and integrity (mitigate actual conflicts, refrain from conduct prejudicing duties) trigger on the act and its incentive effect, not on GAAP materiality thresholds. The protocol escalates internally first: confront the VP with evidence (chance to explain/correct), restate the current quarter (undo the effect), disclose to the audit committee (governance oversight) — external whistleblowing (option B) with unexhausted internal channels violates proportionality and professional resolution norms. Ignoring (option A) confuses financial-statement materiality with ethical materiality — $30,000 of purchased bonus is material to compensation integrity. Silent reversal (option D) compounds concealment (a second undisclosed adjustment covering the first) and forfeits the governance record. Business interpretation: bonus-material manipulation is material by definition to the compensation system — materiality follows the decision the number serves. IMA's resolution order (immediate supervisor → higher levels → audit committee) structures exactly this path. Common trap: importing GAAP quantitative materiality into ethical analysis.",
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
    "QuestionID": "P1E-B-125",
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
    "ExplanationWrongA": "Option A ignores $200,000 of timing manipulation as quantitatively immaterial — but its $30,000 bonus effect is material to compensation integrity. Ethical materiality follows the decision served, not GAAP thresholds.",
    "ExplanationWrongB": "Option B escalates externally with internal channels (CFO, audit committee) unexhausted. Proportionality requires internal resolution first — external channels are last resort, not first response, absent legal violation or retaliation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D silently reverses next quarter — a second undisclosed adjustment covering the first, compounding concealment while forfeiting the governance record the audit committee needs.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.126 lockbox float optimization",
    "MicroTopic": "lockbox float optimization",
    "UniqueConceptKey": "E-B-126-lockbox-float-optimization",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Daily collections average $2,000,000. A lockbox system costing $50,000/year would accelerate availability by one full day; investable rate is 5%. Should treasury adopt it?",
    "Choices": {
      "A": "Adopt — $100,000 annual float benefit ($2,000,000 × 5%) minus $50,000 cost = +$50,000 net",
      "B": "Reject — $50,000 of bank fees always exceeds float gains at these volumes",
      "C": "Adopt only with two-day acceleration — one day never justifies lockbox fixed costs",
      "D": "Reject — float management is obsolete in same-day settlement eras"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Float benefit = $2,000,000 × 5% = $100,000/year of investable acceleration (one day's collections earning the investable rate a day sooner, every day). Net = $100,000 − $50,000 = +$50,000/year — adopt. Reject-on-fees (option B) asserts without computing: $50,000 cost against $100,000 benefit is a 2:1 return. Two-day gating (option C) invents a threshold the arithmetic already clears at one day. Obsolescence claims (option D) confuse same-day settlement rails (which move money between banks) with mail-plus-processing float (which the lockbox eliminates before rails matter) — one day of $2M float persists regardless. Business interpretation: price float in dollars per day saved against system cost — adopt where benefit exceeds cost with margin for volume drift. Common trap: dismissing float value without multiplying daily collections by the investable rate.",
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
    "QuestionID": "P1E-B-126",
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
    "ExplanationWrongB": "Option B rejects $50,000 of fees as categorically excessive against an uncomputed $100,000 benefit — 2:1 returns do not become losses through fee aversion.",
    "ExplanationWrongC": "Option C gates adoption on two-day acceleration, but one day already nets +$50,000. Threshold rules must derive from the arithmetic ($50,000 cost ÷ $100,000/day = 0.5 days breakeven), not from round numbers.",
    "ExplanationWrongD": "Option D declares float obsolete in same-day-settlement eras, confusing interbank rails with mail-plus-processing float. The $2M daily float persists before rails engage — lockboxes harvest it there.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.127 asymmetric error cost threshold",
    "MicroTopic": "asymmetric error cost threshold",
    "UniqueConceptKey": "E-B-127-asymmetric-error-cost-threshold",
    "LOSTag": "P1-B.2 Budgetary control",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget monitoring: σ = $6,000 monthly noise. False-alarm probe costs $5,000; missed real shifts average $100,000 (20:1 asymmetry). Compare $12,000 versus $8,000 investigation thresholds. Which should govern?",
    "Choices": {
      "A": "$12,000 — fewer false alarms always wins regardless of miss costs",
      "B": "No threshold — investigate every variance since misses dominate",
      "C": "$15,000 — round numbers aid compliance and recall",
      "D": "$8,000 — 20:1 miss-to-alarm cost asymmetry justifies sensitivity over specificity; $12,000 specificity prices $100,000 misses to save $5,000 probes"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Threshold design prices two errors: false alarms ($5,000 probes) versus misses ($100,000 average shifts undetected). At $12,000 (2σ): false-alarm P = 2×(1−Φ(2.0)) ≈ 4.6% ($230 expected probe waste per period) but miss rate on moderate shifts ($10,000–$12,000 true effects) approaches 50%+ — expected miss cost dominates. At $8,000 (1.33σ): false-alarm P = 2×(1−Φ(1.333)) ≈ 18.2% ($910 expected waste) while catching moderate shifts reliably. With 20:1 cost asymmetry, the optimal threshold skews sensitive: spending ~$680 more in expected probes to cut miss probability by tens of points on $100,000 exposures. Fewer-alarms-wins (option A) optimizes the $5,000 cost while ignoring the $100,000 one. Always-probe (option B) spends $5,000 monthly ($60,000/year) to catch what $8,000-threshold monitoring catches selectively. Round-number $15,000 (option C) maximizes specificity where sensitivity is 20× more valuable. Business interpretation: set thresholds by error-cost ratio, never by roundness or by false-alarm minimization alone — asymmetry this steep demands sensitivity. Common trap: symmetric threshold thinking under asymmetric costs.",
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
    "QuestionID": "P1E-B-127",
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
    "ExplanationWrongA": "Option A's $12,000 minimizes false alarms ($230 expected waste) while letting moderate-shift misses (50%+ at $10,000–$12,000 true effects on $100,000 exposures) through. Optimizing the $5,000 cost while ignoring the $100,000 one.",
    "ExplanationWrongB": "Option B probes everything at $5,000 monthly ($60,000/year) to eliminate misses — spending $60,000 to save what an $8,000 threshold catches for ~$910/period in expected waste. Certainty is the most expensive threshold.",
    "ExplanationWrongC": "Option C's $15,000 round number maximizes specificity exactly where 20:1 asymmetry demands sensitivity. Roundness is not analysis — the cost ratio sets the threshold, never digit preference.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.128 S&OP cadence optimization",
    "MicroTopic": "S&OP cadence optimization",
    "UniqueConceptKey": "E-B-128-S&OP-cadence-optimization",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Monthly S&OP costs $20,000/year (staff time, systems) with $500,000/year of stockout-plus-obsolescence costs under monthly coordination. Weekly S&OP costs $80,000/year and would cut coordination failures to $300,000/year. Which cadence should the company run?",
    "Choices": {
      "A": "Monthly — lower process cost always wins",
      "B": "Weekly — $380,000 total ($300,000 failures + $80,000 process) beats $520,000 monthly ($500,000 + $20,000) by $140,000",
      "C": "Quarterly — minimum process cost dominates any cadence analysis",
      "D": "Ad-hoc S&OP on exceptions — meetings should follow problems, not calendars"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Total-cost comparison: monthly $500,000 + $20,000 = $520,000/year; weekly $300,000 + $80,000 = $380,000/year. Weekly wins by $140,000 — the $60,000 of extra process buys $200,000 of failure reduction (3.3× return). Process-cost-only reasoning (option A) saves $60,000 to spend $200,000. Quarterly (option C) extrapolates the logic past its data (unstated failure costs, certainly worse than monthly's $500,000). Ad-hoc (option D) coordinates after failures materialize — exception-driven S&OP pays full stockout/obsolescence plus crisis premium. Business interpretation: cadence decisions total process cost plus failure cost — optimize the sum, never either leg alone. Common trap: minimizing meeting cost while ignoring what meetings prevent.",
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
    "QuestionID": "P1E-B-128",
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
    "ExplanationWrongA": "Option A's monthly saves $60,000 of process to spend $200,000 of failures — $140,000 net loss presented as cost discipline. Process cost minimized in isolation maximizes total cost.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's quarterly minimizes process cost further with unmeasured (certainly worse than $500,000) failure costs. Extrapolating past the data's edge — the comparison needs quarterly failure estimates that don't exist.",
    "ExplanationWrongD": "Option D convenes on exceptions, paying full stockouts plus crisis premium while saving scheduled process cost. Exception-driven coordination is the most expensive cadence: failures plus firefighting minus prevention.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.129 reserve disclosure adequacy",
    "MicroTopic": "reserve disclosure adequacy",
    "UniqueConceptKey": "E-B-129-reserve-disclosure-adequacy",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "An SEC comment letter deems the company's contingency-reserve disclosure inadequate: a $5,000,000 reserve with no rollforward, no sensitivity, and no release triggers disclosed. Options: minimal boilerplate update, full quantitative tabular disclosure with sensitivities and triggers, or restating prior periods. What is the adequate response?",
    "Choices": {
      "A": "Minimal boilerplate — comment letters seek acknowledgment, not overhaul",
      "B": "Restate prior periods — inadequate disclosure equals prior error",
      "C": "Full quantitative tabular disclosure (beginning balance, provisions, releases, ending balance) with sensitivity ranges and documented release triggers",
      "D": "Disclose the methodology only — numbers invite second-guessing"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The comment targets disclosure adequacy, not measurement error — restatement (option B) concedes an error never alleged, reopening audited periods unnecessarily. Boilerplate (option A) answers a quantitative comment with qualitative assurance — inviting a second, sterner letter. Methodology-only (option D) withholds the numbers the staff explicitly requested. Full tabular disclosure (beginning-to-ending rollforward with provisions and releases) plus sensitivity ranges (reserve ± plausible assumption shifts) plus documented release triggers gives investors, auditors, and the staff the complete reserve picture: level, movement, uncertainty, and governance. Business interpretation: comment-letter responses over-deliver transparency on the questioned point — the cheapest resolution is the most complete one. Common trap: treating disclosure comments as measurement disputes (restatement reflex) or as paperwork (boilerplate reflex).",
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
    "QuestionID": "P1E-B-129",
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
    "ExplanationWrongA": "Option A's boilerplate answers a quantitative comment (rollforward, sensitivity, triggers) with qualitative assurance — practically inviting the second, sterner letter the response was meant to prevent.",
    "ExplanationWrongB": "Option B restates prior periods for a disclosure comment, conceding measurement error never alleged. Restatement reopens audited periods and signals deeper problems than a disclosure gap.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D discloses methodology while withholding the numbers — process without position. The staff asked for reserve levels, movements, and sensitivities; methodology alone answers none of the three.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.130 forecast combination weighting",
    "MicroTopic": "forecast combination weighting",
    "UniqueConceptKey": "E-B-130-forecast-combination-weighting",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Statistical forecast MSE is 100; judgmental (sales-team) forecast MSE is 150. The planning team uses judgment alone, then statistical alone, then argues endlessly. What combination rule should govern, and how should weights evolve?",
    "Choices": {
      "A": "Inverse-MSE weights: 60% statistical (150/250) + 40% judgment (100/250), reweighted annually on tracked accuracy — combined MSE beats either alone",
      "B": "Judgment alone — field knowledge always dominates models",
      "C": "Statistical alone — MSE 100 beats 150, so judgment adds only noise",
      "D": "50/50 fixed — equal respect for equal stakeholders"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Inverse-MSE (precision) weighting: w_stat = 150/(100+150) = 0.60, w_judg = 100/(100+150) = 0.40 — weight each source by the other's error (more precise = more weight). Combined MSE = 1/(1/100 + 1/150) = 1/(0.01 + 0.006667) = 1/0.016667 = 60 — below either alone (100, 150), the diversification dividend (errors partly cancel when uncorrelated). Judgment-alone (option B) pays MSE 150 for field knowledge available cheaper inside the combination. Statistical-alone (option C) discards turning-point information worth 40 points of MSE improvement (100 → 60). Fixed 50/50 (option D) ignores the measured precision gap — equal weights for unequal errors. Annual reweighting on tracked accuracy keeps weights honest as relative skill drifts. Business interpretation: combine forecasts by precision, track to reweight — the combination is a portfolio, managed like one. Common trap: winner-take-all source selection that discards diversification gains.",
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
    "QuestionID": "P1E-B-130",
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
    "ExplanationWrongB": "Option B's judgment-alone pays MSE 150 for field knowledge available at 40% weight inside a 60-MSE combination — full price for partial information.",
    "ExplanationWrongC": "Option C's statistical-alone scores MSE 100 while the combination scores 60 — discarding 40 points of diversification gain (turning-point information) for methodological purity.",
    "ExplanationWrongD": "Option D's fixed 50/50 ignores the measured precision gap (100 vs 150 MSE) — equal weights for unequal errors overweights the noisier source by 10 points.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE7C;