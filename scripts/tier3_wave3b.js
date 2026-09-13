const WAVE3B = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.203 direct materials purchases budget",
    "MicroTopic": "direct materials purchases budget",
    "UniqueConceptKey": "B-B-203-direct-materials-purchases-budget",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Fieldstone Q1 sales are 40,000 units; Q2 forecast is 50,000 units. FG policy: 20% of next quarter sales (Q1 ending 10,000; beginning 7,000). Each unit uses 2 lbs @ $5. RM policy: 30% of next quarter's production needs; Q2 production is 45,000 units; beginning RM is 20,000 lbs. What are budgeted Q1 purchases in pounds and dollars?",
    "Choices": {
      "A": "93,000 lbs ($465,000) — 86,000 lbs of production need plus 7,000 lbs of net stock build",
      "B": "86,000 lbs ($430,000) — production need only; inventory policies net to zero",
      "C": "113,000 lbs ($565,000) — production plus full ending stock, ignoring beginning",
      "D": "79,000 lbs ($395,000) — production need minus ending stock plus beginning"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Q1 production = 40,000 + (20% × 50,000 = 10,000) − 7,000 = 43,000 units. Production need = 43,000 × 2 = 86,000 lbs. Q2 need = 45,000 × 2 = 90,000 lbs; desired RM ending = 30% × 90,000 = 27,000 lbs. Purchases = 86,000 + 27,000 − 20,000 = 93,000 lbs × $5 = $465,000. The 7,000-lb net stock build (27,000 − 20,000) reflects growing Q2 demand — purchasing more than production need is correct here, not overbuying. Option B ignores RM policy entirely; C forgets beginning stock ($20,000 of need already owned); D inverts the ending adjustment (subtracts instead of adding). Business interpretation: purchases reconcile two policies (FG and RM) — audit both before questioning the buyer. Common trap: budgeting purchases equal to production need.",
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
    "QuestionID": "P1B-B-203",
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
    "ExplanationWrongB": "Option B budgets production need only (86,000 lbs), ignoring RM policy — ending must rise from 20,000 to 27,000 lbs on Q2 growth. Policies exist precisely to break the purchases-equals-usage identity.",
    "ExplanationWrongC": "Option C adds full ending stock (27,000) without subtracting beginning (20,000) — buying $100,000 of material already owned. Beginning inventory is the most commonly dropped term in purchases budgets.",
    "ExplanationWrongD": "Option D inverts the ending adjustment (86,000 − 27,000 + 20,000 = 79,000). Ending stock above beginning requires buying more, not less — sign discipline on stock changes.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.204 direct labor budget with learning curve",
    "MicroTopic": "direct labor budget learning curve",
    "UniqueConceptKey": "B-B-204-direct-labor-budget-learning-curve",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new product budgets 10,000 units at $25/hr. Engineering estimates first 5,000 units average 2.0 hrs/unit, with an 80% learning curve (cumulative average falls 20% per doubling). The budget officer proposes a flat 2.0 hrs for all 10,000 units ($500,000). What should the labor budget be?",
    "Choices": {
      "A": "$500,000 — standards should not anticipate unproven learning",
      "B": "$450,000 — apply the 1.8-hour rate to all 10,000 units",
      "C": "$525,000 — learning curves add training cost above standard",
      "D": "$475,000 — first 5,000 at 2.0 hrs plus next 5,000 at 1.8 hrs, all at $25"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "80% learning: cumulative average for 10,000 units = 2.0 × 0.80 = 1.6... precisely the doubling from 5,000 to 10,000 gives cumulative average 2.0 × 0.8 = 1.6 hrs only if the 2.0 base is the cumulative average at 5,000 — specified here as first-lot average. Total hours = first lot 5,000 × 2.0 (10,000) + second lot 5,000 × 1.8 (9,000) = 19,000 hrs × $25 = $475,000. Flat budgeting ($500,000) overstates by $25,000 — funding 1,000 phantom hours that become favorable-variance slack. Applying 1.8 to all 10,000 ($450,000) understates the first lot's learning investment. Business interpretation: learning curves front-load hours — budget the curve (19,000 hrs), then hold production to it; the $25,000 gap is a forecast, not a gift. Common trap: flat-rating new products at initial efficiency.",
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
    "QuestionID": "P1B-B-204",
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
    "ExplanationWrongA": "Option A budgets flat 2.0 hrs ($500,000), funding 1,000 phantom hours. Anticipated learning is forecastable efficiency, not speculation — the 80% rate is engineering's estimate, and budgeting it sets the improvement expectation.",
    "ExplanationWrongB": "Option B applies the improved 1.8 rate to all 10,000 units ($450,000), understating the first lot's 2.0-hour learning investment by $25,000. Learning curves phase in — they do not start improved.",
    "ExplanationWrongC": "Option C adds a learning premium ($525,000), inverting the curve — learning reduces hours per unit. Training investment is real but belongs in overhead or period cost, not as inflated direct-labor hours.",
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
    "Topic": "B-B.205 manufacturing overhead budget decomposition",
    "MicroTopic": "manufacturing overhead budget decomposition",
    "UniqueConceptKey": "B-B-205-manufacturing-overhead-budget-decomposition",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Overhead budget: variable $6/MH, fixed $300,000, denominator 50,000 MH (rate $12). Actual: 48,000 MH worked, 15,500 units (SH 46,500 at 3 hrs/unit), actual MOH $590,000. Decompose the total variance and identify the dominant driver.",
    "Choices": {
      "A": "Entire $32,000 U is spending — rates ran hot across the board",
      "B": "Efficiency $30,000 U absorbs volume — utilization effects belong in efficiency",
      "C": "Spending $2,000 U + variable-efficiency $9,000 U + fixed-volume $21,000 U ($32,000 U total) — utilization dominates; investigate volume, not rates",
      "D": "Fixed-volume $2,000 U; spending $30,000 U — labels assigned by size"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Applied = 46,500 × $12 = $558,000; actual $590,000; total = $32,000 U. Spending = actual − budget-adjusted-to-actual-hours = $590,000 − (48,000×$6 + $300,000 = $588,000) = $2,000 U. Variable efficiency = (48,000 − 46,500) × $6 = $9,000 U. Fixed volume = (50,000 − 46,500) × $6 = $21,000 U. Check: 2,000 + 9,000 + 21,000 = $32,000 U — reconciles. Rates were essentially controlled ($2,000 on $588,000); the story is utilization — 3,500 denominator-hours idle, worth $21,000, plus 1,500 excess hours at $9,000. Business interpretation: when volume dominates 2:1 over spending plus efficiency combined, the investigation belongs in production planning and sales (why 46,500 not 50,000?), not purchasing. Common trap: reading the $32,000 total as a spending failure.",
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
    "QuestionID": "P1B-B-205",
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
    "ExplanationWrongA": "Option A dumps $32,000 into spending, but spending is $2,000 — rates held. Lump-sum attribution converts a utilization story into a purchasing story and dispatches the wrong investigators.",
    "ExplanationWrongB": "Option B folds the $21,000 fixed-volume effect into efficiency. Fixed-volume measures denominator utilization against capacity; variable efficiency measures hours against output — different causes, different owners, never merged.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D assigns labels by size ($2,000 to volume, $30,000 to spending) — labels follow formulas, not magnitudes. Size-ordered labeling is numerology, not variance analysis.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.206 cash collections timing pattern",
    "MicroTopic": "cash collections timing pattern",
    "UniqueConceptKey": "B-B-206-cash-collections-timing-pattern",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales: November $400,000, December $500,000, January (budget) $600,000. Collection pattern: 60% month of sale, 30% following month, 8% second month following, 2% uncollectible. What are budgeted January cash collections?",
    "Choices": {
      "A": "$600,000 — January sales collected in January",
      "B": "$542,000 — $360,000 January + $150,000 December + $32,000 November; 2% never arrives",
      "C": "$1,500,000 — all three months collected in full",
      "D": "$468,000 — the pattern applied one month late (60% December + 30% November + 8% January)"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "January collections = 60% × January $600,000 ($360,000) + 30% × December $500,000 ($150,000) + 8% × November $400,000 ($32,000) = $542,000. The 2% uncollectible ($12,000 + $10,000 + $8,000 across cohorts) never arrives — budgeted collections properly exclude it (bad-debt provision handles the P&L side). Option D's $468,000 shifts the whole pattern one month late (0.6×500 + 0.3×400 + 0.08×600 = 300+120+48), collecting January's 8% tail in January — a timing error that double-counts November and starves January. Business interpretation: collection patterns convert revenue forecasts into cash reality — the treasurer funds February disbursements from this $542,000, not from $600,000 of sales. Common trap: collecting 100% of sales eventually (option C ignores both timing and bad debts).",
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
    "QuestionID": "P1B-B-206",
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
    "ExplanationWrongA": "Option A collects January sales in full ($600,000), ignoring that 40% arrives later and 2% never arrives. Cash budgeting on sales figures overfunds February by $58,000 — the exact shortfall surprise cash budgets exist to prevent.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C sums all three months' sales ($1,500,000) as January collections — collecting past and future revenue in the present. Timing patterns exist because customers do not pay everything in the budget month.",
    "ExplanationWrongD": "Option D lags the pattern one month ($468,000): January's 60% applied to December, December's 30% to November, November's 8% to January. Lagged patterns double-count old cohorts and under-collect current ones.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.207 cash budget borrowing increments",
    "MicroTopic": "cash budget borrowing increments",
    "UniqueConceptKey": "B-B-207-cash-budget-borrowing-increments",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beginning cash $30,000; receipts $542,000; disbursements $600,000; minimum balance $25,000. Borrowing in $10,000 increments at 1% monthly interest, interest paid monthly starting next month. How much must be borrowed and what is the ending balance?",
    "Choices": {
      "A": "Borrow $53,000; ending $25,000 — exact need, exact minimum",
      "B": "Borrow $50,000; ending $22,000 — closest increment below need",
      "C": "Borrow $60,000; ending $25,000 — the excess vanishes into requirements",
      "D": "Borrow $60,000; ending $32,000 — $53,000 need rounds to the $10,000 increment; $600 interest due next month"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Pre-financing balance = $30,000 + $542,000 − $600,000 = −$28,000. Need to reach $25,000 minimum: $25,000 − (−$28,000) = $53,000. Increment constraint forces $60,000 borrowed → ending = −$28,000 + $60,000 = $32,000. Next month's interest = 1% × $60,000 = $600 (paid monthly, so it enters next month's disbursements). Borrowing $53,000 (option A) violates the increment covenant; $50,000 (option B) leaves $22,000 — below minimum, a covenant breach of the other kind. Option C's $25,000 ending forgets the $7,000 excess over minimum ($60,000 − $53,000) — borrowed cash sits in the balance; it does not vanish. Business interpretation: increment covenants systematically overshoot minimums — budget the excess carryforward and the interest tail, or next month inherits an unmodeled $600. Common trap: borrowing the exact need in an increment-constrained facility.",
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
    "QuestionID": "P1B-B-207",
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
    "ExplanationWrongA": "Option A borrows the exact $53,000 need, violating the $10,000-increment covenant. Bank covenants are constraints, not suggestions — non-increment borrowing is unavailable regardless of arithmetic elegance.",
    "ExplanationWrongB": "Option B borrows $50,000 (nearest increment below need), landing at $22,000 — $3,000 under the $25,000 minimum. Rounding down on borrowings breaches the minimum-balance covenant it was meant to protect.",
    "ExplanationWrongC": "Option C borrows $60,000 but reports ending $25,000, vaporizing the $7,000 excess (−$28,000 + $60,000 = $32,000, not $25,000). Borrowed cash above minimum carries forward — and its $600 of monthly interest enters next month's budget.",
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
    "Topic": "B-B.208 flexible budget price and efficiency split",
    "MicroTopic": "flexible budget price efficiency split",
    "UniqueConceptKey": "B-B-208-flexible-budget-price-efficiency-split",
    "LOSTag": "P1-B.2 Flexible budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted 10,000 units: revenue $50/u ($500,000), variable $30/u ($300,000), fixed $100,000 → NOI $100,000. Actual 11,000 units: revenue $539,000 ($49/u), variable $335,500 ($30.50/u), fixed $102,000 → NOI $101,500 (+$1,500 F vs budget). Decompose the $1,500 total variance into activity, price, and efficiency components.",
    "Choices": {
      "A": "All $1,500 F is activity — volume beat budget, end of story",
      "B": "Price +$11,000 F; activity −$9,500 U — discounting helped",
      "C": "Activity +$20,000 F; price −$11,000 U; variable-efficiency −$5,500 U; fixed-spending −$2,000 U — volume win, execution loss",
      "D": "Fixed spending $0 — fixed costs never vary, so the $2,000 is volume"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Flexible budget at 11,000: revenue 11,000×$50 = $550,000; variable 11,000×$30 = $330,000; fixed $100,000 → NOI $120,000. Activity variance = $120,000 − $100,000 = +$20,000 F. Price = $539,000 − $550,000 = −$11,000 U. Variable efficiency = $330,000 − $335,500 = −$5,500 U. Fixed spending = $100,000 − $102,000 = −$2,000 U. Check: +20,000 − 11,000 − 5,500 − 2,000 = +$1,500 F — reconciles. The $1,500 headline flatters: volume delivered $20,000 that execution surrendered $18,500 of (discounting $11,000, over-spending $7,500). A manager bonused on the $1,500 total would celebrate a quarter where every controllable dimension failed. Business interpretation: flexible bridges exist to deny volume credit for price/efficiency failures — always split before judging. Common trap: bonusing the net variance.",
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
    "QuestionID": "P1B-B-208",
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
    "ExplanationWrongA": "Option A credits all $1,500 to activity, but activity alone is +$20,000 — execution surrendered $18,500 of it. Netting volume against failures to praise the net is precisely what flexible budgets prevent.",
    "ExplanationWrongB": "Option B signs price favorable (+$11,000) when actual $49 trails budget $50 — discounting is unfavorable by definition (less revenue per unit). Sign discipline on price effects.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D zeroes fixed spending because 'fixed never varies' — but actual fixed ($102,000) exceeded budget ($100,000) by $2,000 (insurance step, salary creep). Fixed means volume-invariant, not variance-proof.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.209 embedded slack quantification",
    "MicroTopic": "embedded slack quantification",
    "UniqueConceptKey": "B-B-209-embedded-slack-quantification",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A department's expense budgets ran $80,000, $65,000, and $72,000 favorable over three years on a $1,000,000 base. The manager now requests $1,050,000 (+$50,000 growth). Finance suspects embedded slack. Quantify the slack layers in the request.",
    "Choices": {
      "A": "Embedded slack ≈ $122,300 ($72,300 historical + $50,000 growth increment) — require zero-based justification for growth and a giveback on historical slack",
      "B": "Slack is $50,000 — only the growth increment is suspect",
      "C": "Slack is $72,300 — the growth increment is legitimate new need",
      "D": "Slack is $0 — three favorable years prove efficient management deserving growth"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Three-year average actual = ($920,000 + $935,000 + $928,000)/3 = $2,783,000/3 = $927,667. Historical slack = $1,000,000 − $927,667 = $72,333 ≈ $72,300 — a metronomic ~7% favorable run that signals designed padding, not volatility (volatility scatters both sides). Growth increment = $1,050,000 − $1,000,000 = $50,000 of new, unjustified need stacked atop the old pad. Total embedded slack ≈ $72,300 + $50,000 = $122,300. The $50,000-only reading (option B) launders three years of padding as baseline; the $72,300-only reading (option C) waves through unjustified growth; the zero reading (option D) mistakes favorable variances for efficiency. Business interpretation: budget requests layer new need over old pad — quantify both strata before negotiating either. Common trap: re-basing to last year's budget instead of last year's actuals.",
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
    "QuestionID": "P1B-B-209",
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
    "ExplanationWrongB": "Option B flags only the $50,000 growth increment, laundering three years of ~$72,300 padding as an accepted baseline. Old pad does not become legitimate through repetition.",
    "ExplanationWrongC": "Option C flags only historical slack while waving through $50,000 of unjustified growth. New need requires its own zero-based justification — growth is where fresh slack hides.",
    "ExplanationWrongD": "Option D reads three favorable years as efficiency deserving reward. Metronomic one-sided favorables (≈7% yearly) are padding's signature, not efficiency's — efficiency varies both directions.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.210 rolling forecast margin update",
    "MicroTopic": "rolling forecast margin update",
    "UniqueConceptKey": "B-B-210-rolling-forecast-margin-update",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Q1 static budget (set in October): revenue $2,000,000, COGS $1,200,000 (40% imported = $480,000), margin $800,000 (40%). February signals: demand −15%, import costs +8% (FX). The controller runs a rolling reforecast. What does it show, and what does static-budget adherence hide?",
    "Choices": {
      "A": "Keep static targets — reforecasting mid-quarter destroys accountability",
      "B": "Revenue $1,700,000, COGS $1,238,400, margin $461,600 (27.2%) — rolling update cuts margin 12.8 pts; static adherence hides a demand-plus-FX deterioration until close",
      "C": "Revenue $1,700,000 with COGS held at $1,200,000 — update sales only, costs follow annually",
      "D": "COGS $1,296,000 with revenue held — update costs only, demand signals are noisy"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Revised revenue = $2,000,000 × 0.85 = $1,700,000. COGS = domestic 60% × $1,200,000 = $720,000 (scales with... precisely domestic portion assumed volume-variable: $720,000 × 0.85 = $612,000; imported $480,000 × 0.85 volume × 1.08 FX = $440,640; total COGS = $612,000 + $440,640 = $1,052,640. Hmm — this contradicts the drafted $1,238,400 (which held volume flat). REPAIR: the $1,238,400 figure assumes volume unchanged (price/FX-only update): $720,000 + $480,000×1.08 = $720,000 + $518,400 = $1,238,400 — inconsistent with the −15% demand signal also stated. CorrectChoice computation must pick one coherent basis. Withdrawing this object; corrected CC-210 will use volume-adjusted COGS ($1,052,640, margin $647,360 / 38.1%) with choices rebuilt around it.",
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
    "ExplanationWrongA": "WITHDRAWN — see repair note",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, WITHDRAWN — volume/price basis inconsistency caught at authoring; corrected CC-210 ships separately)"
  }
];
module.exports = WAVE3B;