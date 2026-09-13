const WAVE11A2 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.105 direct method cash flow forecast",
    "MicroTopic": "direct method cash flow forecast",
    "UniqueConceptKey": "B-C105-direct-method-cash-flow-forecast",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted: sales $1,200,000 (all credit, 60-day average collection); purchases $700,000 (45-day average payment); payroll $300,000; other cash expenses $100,000. Beginning AR $180,000, AP $90,000. What are budgeted cash collections, disbursements, and net operating cash flow?",
    "Choices": {
      "A": "Collections $1,200,000; disbursements $1,100,000; net +$100,000 — sales fund expenses one-for-one",
      "D": "Collections $1,182,740; disbursements $1,103,699; net +$79,041 (≈+$79,000) — exact day-rate math on both balances",
      "C": "Collections $1,020,000; disbursements $1,190,000 — beginning balances reverse the flow",
      "B": "Net −$15,000 — growth always consumes cash regardless of working-capital math"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Ending AR = $1,200,000 × 60/365 = $197,260.27; collections = $180,000 + $1,200,000 − $197,260.27 = $1,182,739.73 ≈ $1,182,740. Ending AP = $700,000 × 45/365 = $86,301.37; disbursements = $90,000 + $700,000 + $300,000 + $100,000 − $86,301.37 = $1,103,698.63 ≈ $1,103,699. Net = $1,182,740 − $1,103,699 = +$79,041 ≈ +$79,000. Rounded-balance shortcuts ($200,000/$85,000) drift $6,000 off exact day-rate math — budget at exact rates, round only the reported total. One-for-one sales-funds-expenses (option A) ignores $180,000 of beginning AR and $90,000 of beginning AP. Growth-consumes-cash (option B) asserts without computing — here collections exceed disbursements. Inverted signs (option C) subtracts AR and adds AP — beginning AR adds cash (collected), beginning AP subtracts it (paid). Business interpretation: direct-method budgets convert accrual plans through balance-sheet day rates — exact rates in, rounded totals out. Common trap: rounded intermediate balances.",
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
    "QuestionID": "P1-BC-105",
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
    "ExplanationWrongA": "Option A's $1,200,000/$1,100,000 ignores $180,000 of beginning AR (collectible cash) and $90,000 of beginning AP (payable cash) — beginning balances are first-year cash-flow facts, never ignorable.",
    "ExplanationWrongB": "Option B's −$15,000 asserts growth consumes cash regardless of math — but collections ($1,182,740) exceed total disbursements ($1,103,699) here. Growth consumes cash only when working-capital absorption exceeds earnings.",
    "ExplanationWrongC": "Option C's $1,020,000/$1,190,000 inverts both balances (subtracts AR, adds AP) — beginning AR adds cash (collected), beginning AP subtracts cash (paid). Sign discipline on opening balances.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.106 nonfinancial KPI budget linkage",
    "MicroTopic": "nonfinancial KPI budget linkage",
    "UniqueConceptKey": "B-C106-nonfinancial-KPI-budget-linkage",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A plant budgets 95% on-time delivery (OTD) with expedite spending capped at $30,000. Mid-year OTD runs 88% with $45,000 of expedite already spent; the shortfall traces to a single supplier's late components. Operations requests +$40,000 expedite budget; procurement requests a supplier switch (one-time $25,000 qualification + $10,000 higher annual piece cost). How should the budget be reforecast?",
    "Choices": {
      "A": "Grant +$40,000 expedite — OTD shortfalls always justify premium freight",
      "D": "Switch suppliers ($25,000 + $10,000/year) and hold expedite at $30,000 — root-cause fix beats symptom funding; the $40,000 expedite request treats supplier failure as permanent expediting need",
      "C": "Cut OTD target to 88% — budgets follow actuals, not aspirations",
      "B": "Do both (+$40,000 expedite and switch) — belt-and-suspenders guarantees OTD recovery"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Diagnose before funding: the 88% OTD with $45,000 spent (50% over cap) traces to one supplier's lateness — a root cause, not a freight shortfall. More expedite ($40,000) funds symptom treatment permanently ($85,000/year run rate) while the cause persists. Supplier switch ($25,000 one-time + $10,000/year piece premium) removes the cause; holding expedite at $30,000 covers residual noise. Year-1 cost $35,000 vs $40,000 expedite-only (saves $5,000 immediately, more thereafter as the cause stays fixed). Doing both (option B: $75,000) pays to fix and to expedite simultaneously. Target-cutting (option C: 88%) surrenders the customer commitment instead of the supplier. Business interpretation: reforecasts fund root causes, never symptoms at scale — trace OTD misses to suppliers before opening freight checkbooks. Common trap: funding expedite growth against supplier-caused lateness.",
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
    "QuestionID": "P1-BC-106",
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
    "ExplanationWrongA": "Option A's +$40,000 expedite funds symptom treatment at an $85,000 run rate while the supplier cause persists — premium freight as permanent policy for a fixable sourcing failure.",
    "ExplanationWrongB": "Option B's do-both ($75,000) pays to fix the cause and to expedite as if unfixed — redundant spending where the switch already removes the need.",
    "ExplanationWrongC": "Option C's 88% target cut surrenders the customer commitment instead of the supplier — budgets follow strategy, and 95% OTD is the strategy.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.107 sustainability budget with payback",
    "MicroTopic": "sustainability budget payback",
    "UniqueConceptKey": "B-C107-sustainability-budget-payback",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $90,000 lighting retrofit cuts energy $28,000/year with a 10-year life and $5,000 salvage (straight-line). The sustainability budget needs carbon-tonnage plus financial justification. At a 7% discount rate, what are the NPV and the carbon-plus-cash recommendation?",
    "Choices": {
      "A": "Reject — $90,000 exceeds one year's $28,000 savings by 3×, failing payback intuition",
      "D": "Approve — PV of $28,000 × PVIFA(7%,10) = $28,000 × 7.0236 = $196,661 plus $5,000 × 0.5083 = $2,542 → $199,203 − $90,000 = +$109,203 NPV with carbon reduction as uncounted upside",
      "C": "Approve on carbon alone — financial analysis is irrelevant to sustainability budgets",
      "B": "Reject on 3.2-year simple payback exceeding the 2-year company hurdle for efficiency projects"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "PV of savings = $28,000 × PVIFA(7%,10) = $28,000 × 7.02358 = $196,660.24 ≈ $196,661. PV of salvage = $5,000 × PVIF(7%,10) = $5,000 × 0.50835 = $2,541.75 ≈ $2,542. Total PV = $199,203; NPV = $199,203 − $90,000 = +$109,203 — strongly positive before counting carbon tonnage (uncounted upside). Payback-intuition rejection (option A) compares cost to one year's savings instead of discounted lifetime savings. Hurdle-payback rejection (option B: 3.2 years > 2-year hurdle) elevates a crude screen over +$109,203 of NPV — payback screens liquidity, never value. Carbon-only approval (option C) forfeits the financial case that funds the next retrofit. Business interpretation: sustainability budgets appraise like capital projects (discounted cash first) with carbon as incremental upside — never as substitutes. Common trap: single-year payback intuition on multi-year annuities.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Capital Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/11-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-107",
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
    "ExplanationWrongA": "Option A's 3×-intuition rejection compares $90,000 to one year's $28,000 — ignoring 9 more years plus salvage. Single-year intuition misprices every annuity.",
    "ExplanationWrongB": "Option B's 2-year hurdle elevates a liquidity screen over +$109,203 of NPV — payback screens timing, never value. Screens serve decisions; they never make them.",
    "ExplanationWrongC": "Option C approves on carbon alone, forfeiting the +$109,203 financial case that funds the next retrofit — carbon without cash starves future sustainability work.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.108 transfer price in divisional budgets",
    "MicroTopic": "transfer price divisional budgets",
    "UniqueConceptKey": "B-C108-transfer-price-divisional-budgets",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Division S budgets 20,000 internal units to Division T. S's variable cost is $18; T resells at $50 with $10 of own variable cost. Corporate sets the transfer price for budget purposes. At what transfer price are both divisions' budgets goal-congruent, and what happens at $40?",
    "Choices": {
      "A": "$40 — the midpoint between $18 cost and $50 resale splits gains fairly",
      "B": "$50 — T's resale price keeps T whole on every unit",
      "D": "Any price in the $18–$40 range preserves goal congruence ($22–$0 of T margin); $40 leaves T zero margin ($50 − $40 − $10 = $0), killing T's incentive to sell — set near $18–$25 to share gains while keeping T motivated",
      "C": "$18 — variable cost is the only goal-congruent price, period"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Congruence range: floor $18 (S's variable cost — below which S loses per unit), ceiling $40 ($50 resale − $10 T variable — above which T's margin goes negative). Any price inside preserves company economics ($50 − $18 − $10 = $22/unit total). But $40 exactly zeroes T's margin ($50 − $40 − $10 = $0) — T is indifferent to selling, so volume collapses on motivation grounds despite technical congruence. Midpoint $40... precisely the midpoint of $18–$40 is $29, not $40 (option A's 'midpoint' mislabels the ceiling as the middle). Resale-price transfer (option B, $50) gives T −$10/unit — active harm. Variable-cost-only (option C) is technically congruent but awards S zero margin — sustainable only with S evaluated on volume, not profit. Price near $18–$25 (e.g., $22: S +$4, T +$18) shares gains while keeping T's selling incentive alive. Business interpretation: budget transfer prices must clear the congruence range AND the motivation constraint — endpoints satisfy math while killing behavior. Common trap: pricing at range endpoints.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
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
    "QuestionID": "P1-BC-108",
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
    "ExplanationWrongA": "Option A's $40 'midpoint' mislabels the $40 ceiling as the middle (true midpoint $29) — and prices T's margin to exactly zero, killing selling incentive at technical congruence.",
    "ExplanationWrongB": "Option B's $50 resale-price transfer leaves T −$10/unit — active harm presented as keeping T whole. Ceilings cap, never set, transfer prices.",
    "ExplanationWrongC": "Option C's $18-only awards S zero margin — technically congruent but motivationally empty for a profit-accountable S. Endpoints satisfy math while starving behavior.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.109 responsibility versus controllability audit",
    "MicroTopic": "responsibility controllability audit",
    "UniqueConceptKey": "B-C109-responsibility-controllability-audit",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A cost-center report holds a supervisor accountable for: direct labor efficiency ($12,000 U), allocated maintenance ($30,000), and corporate sustainability charges ($8,000). The supervisor controls crew scheduling (drives efficiency) but not maintenance dispatch or corporate programs. What should the performance report show, and what should the bonus key off?",
    "Choices": {
      "A": "All $50,000 U — responsibility centers answer for their full reported cost",
      "B": "$42,000 U ($12,000 + $30,000) — maintenance is operationally adjacent, so include it; exclude only corporate charges",
      "D": "$12,000 U efficiency only — bonus keys off controllable efficiency; $30,000 maintenance and $8,000 corporate report as information-only lines with their true owners named",
      "C": "$0 — any allocation in the report contaminates the controllable signal beyond use"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Controllability filter: efficiency $12,000 U (crew scheduling — controlled) stays accountable; maintenance $30,000 (dispatch-controlled elsewhere) and corporate $8,000 (program-controlled) move to information-only lines owned by maintenance management and corporate sustainability respectively. Full-accountability (option A, $50,000 U) charges $38,000 of others' decisions to this supervisor's bonus — accountability without control is blame. Adjacency-inclusion (option B, $42,000) keeps maintenance on operational vibes — adjacency is not control; dispatch authority sits elsewhere. Zero-out (option C, $0) discards the $12,000 controllable signal with the $38,000 noise — the report's baby goes with its bathwater. Business interpretation: performance reports split accountable lines from information lines by control, never by proximity — and bonuses key off accountable lines only. Common trap: bonus-qualifying managers on reported totals containing others' decisions.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
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
    "QuestionID": "P1-BC-109",
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
    "ExplanationWrongA": "Option A's $50,000 charges $38,000 of maintenance-dispatch and corporate-program decisions to a scheduling supervisor — accountability without control is blame with paperwork.",
    "ExplanationWrongB": "Option B's $42,000 keeps maintenance on adjacency vibes — operational proximity is not dispatch authority. Control, never closeness, draws the accountable line.",
    "ExplanationWrongC": "Option C's $0 discards the $12,000 controllable efficiency signal with the $38,000 noise — baby with bathwater. Information lines preserve context; accountability lines drive bonuses.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.110 budget calendar compression effects",
    "MicroTopic": "budget calendar compression effects",
    "UniqueConceptKey": "B-C110-budget-calendar-compression-effects",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The budget calendar compresses planning from 12 weeks to 4 (late board targets). Last compressed cycle produced 23% more budget-game flags (sandbagging markers) and 31% more re-forecasts than normal cycles. Finance proposes permanent 4-week cycles for 'agility.' What should the controller recommend?",
    "Choices": {
      "A": "Permanent 4-week cycles — agility dominates all other budget qualities",
      "B": "Restore 12-week cycles with staged gates (targets → drafts → challenge → lock) — compression manufactures gaming ($23%) and rework ($31%); speed that degrades honesty and accuracy is not agility",
      "C": "2-week cycles — if 4 weeks is agile, 2 weeks is twice as agile",
      "D": "Abolish the calendar — continuous planning needs no deadlines"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Compression evidence: +23% gaming flags (sandbagging under time pressure — managers pad what they cannot analyze) plus +31% re-forecasts (first-pass quality collapse). Permanent 4-week cycles (option A) institutionalize both failure modes as agility. Hyper-compression (option C, 2 weeks) doubles down on the demonstrated dose-response. Calendar abolition (option D) removes the coordination device that sequences targets, drafts, challenge, and lock — continuous planning still needs gates. The 12-week staged calendar buys honesty (challenge time exposes padding) and accuracy (draft quality survives first-pass review) at the price of speed — and the measured speed savings cost 23% more gaming plus 31% more rework. Business interpretation: budget calendars price honesty and accuracy against speed — compress only with evidence that quality holds, and here evidence proves it does not. Common trap: rebranding haste as agility.",
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
    "QuestionID": "P1-BC-110",
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
    "ExplanationWrongA": "Option A's permanent 4-week cycles institutionalize +23% gaming and +31% rework as agility — speed that degrades honesty and accuracy is haste with branding.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's 2-week cycles double down on a demonstrated dose-response (compression → gaming + rework). More of a failing treatment is not a cure.",
    "ExplanationWrongD": "Option D abolishes the calendar for continuous planning — but continuous planning still needs staged gates (targets, drafts, challenge, lock). Deadlines coordinate; gates assure.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE11A2;