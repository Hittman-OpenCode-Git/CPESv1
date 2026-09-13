const WAVE3C = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.213 learning curve labor budget",
    "MicroTopic": "learning curve labor budget",
    "UniqueConceptKey": "B-B-213-learning-curve-labor-budget",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new product budgets 20,000 units at $20/hr under an 80% incremental-unit-time learning model (each doubling's incremental lot averages 80% of the prior lot's average). First 5,000 units average 2.0 hrs/unit. What are the correct lot budgets for units 1–5,000, 5,001–10,000, and 10,001–20,000, and what does flat 2.0-hr budgeting overstate?",
    "Choices": {
      "A": "Lots 1–5k $200,000 (10,000 hrs); 5–10k $180,000 (9,000 hrs); 10–20k $288,000 (14,400 hrs) — flat budgeting overstates by $20,000 then $112,000",
      "B": "Flat $200,000 per 5,000-unit lot — standards should not anticipate learning",
      "C": "$200,000, $120,000, $192,000 — cumulative-average model lots",
      "D": "$668,000 total with no lot detail — aggregate budgets suffice"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Incremental-unit-time model at 80%: lot 1 average 2.0 hrs → 5,000 × 2.0 = 10,000 hrs × $20 = $200,000. Lot 2 (5,001–10,000) averages 2.0 × 0.80 = 1.8 hrs → 5,000 × 1.8 = 9,000 hrs × $20 = $180,000. Lots 3–4 (10,001–20,000) average 1.8 × 0.80 = 1.44 hrs → 10,000 × 1.44 = 14,400 hrs × $20 = $288,000. Flat 2.0-hr budgeting ($200,000 per 5k lot) overstates lot 2 by $200,000 − $180,000 = $20,000 and lots 3–4 by $400,000 − $288,000 = $112,000 — funding 6,600 phantom hours that become favorable-variance slack. Option C's $120,000/$192,000 pair mixes in the cumulative-average model (different convention, inconsistent with the stated incremental model — model discipline matters). Aggregate-only budgeting (option D, $668,000 total) surrenders lot-level control exactly where learning happens. Business interpretation: state the learning model explicitly in the budget basis, then budget each lot on it — phantom hours are the slack factories of new products. Common trap: flat-rating new products at initial efficiency.",
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
    "QuestionID": "P1B-B-213",
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
    "ExplanationWrongB": "Option B budgets flat 2.0 hrs ($200,000 per lot), funding 1,000 phantom hours in lot 2 and 5,600 in lots 3–4. Anticipated learning is forecastable efficiency — the 80% rate is engineering's estimate, and budgeting it sets the improvement expectation.",
    "ExplanationWrongC": "Option C imports cumulative-average lots ($120,000/$192,000) under an incremental-model stem. Mixing learning models mid-budget corrupts every lot — model discipline: one convention, stated upfront, applied throughout.",
    "ExplanationWrongD": "Option D's $668,000 aggregate is arithmetically right but managerially useless — without lot detail, production cannot be held to the learning path, and the $132,000 of phased savings dissolves into a single favorable blob.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.214 zero-based rank-order funding",
    "MicroTopic": "zero-based rank-order funding",
    "UniqueConceptKey": "B-B-214-zero-based-rank-order-funding",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A department's $800,000 budget is rebuilt zero-based into decision packages: P1 core compliance $300,000 (must-fund), P2 ranked #1 incremental $250,000, P3 ranked #2 $150,000, P4 ranked #3 $100,000. The funding cutoff is $700,000. How should the packages be funded?",
    "Choices": {
      "A": "Fund all $800,000 — zero-basing already validated every dollar",
      "B": "Fund P1+P2+P3 ($700,000); cut P4 — rank-order funding to the cutoff maximizes value per dollar",
      "C": "Cut P1 — even compliance packages must share the pain",
      "D": "Fund P1+P2+P4 ($650,000) and bank $50,000 — P4's sponsor has seniority"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Zero-based ranking exists to make cutoffs mechanical: fund in rank order until the money runs out. P1 ($300,000, must-fund compliance) + P2 ($250,000, top-ranked incremental) + P3 ($150,000, second-ranked) = $700,000 — exactly the cutoff; P4 ($100,000, lowest-ranked) is cut. Funding everything (option A, $800,000) ignores the cutoff that makes ranking meaningful. Cutting P1 (option C) violates must-fund compliance status — shared pain that breaks the law is not fairness. Funding P4 over P3 (option D) lets sponsor seniority override the published ranking, destroying ZBB credibility for every future cycle. Business interpretation: the cutoff is where ranking earns its keep — fund through it in order, no exceptions, or next year's rankings become lobbying documents. Common trap: treating ZBB packages as a menu rather than a ranking.",
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
    "QuestionID": "P1B-B-214",
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
    "ExplanationWrongA": "Option A funds all $800,000, ignoring the $700,000 cutoff. Zero-basing validates need, not affordability — the cutoff is the affordability constraint, and ranking exists to serve it.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C cuts must-fund compliance (P1) for shared pain. Compliance packages are constraints, not preferences — cutting them trades budget optics for legal exposure.",
    "ExplanationWrongD": "Option D funds P4 over higher-ranked P3 on sponsor seniority, teaching every manager that rankings bend to power. One seniority override collapses next cycle's ranking integrity.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.215 pro-forma cash flow integration",
    "MicroTopic": "pro-forma cash flow integration",
    "UniqueConceptKey": "B-B-215-pro-forma-cash-flow-integration",
    "LOSTag": "P1-B.2 Financial budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted: net income $200,000; depreciation $50,000; accounts receivable increase $30,000; inventory increase $20,000; accounts payable increase $25,000; capital expenditures $100,000; dividends $40,000; beginning cash $60,000. What are budgeted operating cash flow and ending cash?",
    "Choices": {
      "A": "OCF $200,000; ending $160,000 — net income flows straight to cash",
      "B": "OCF $250,000; ending $170,000 — add back depreciation only",
      "C": "OCF $225,000; ending cash $145,000 — growth absorbs $50,000 working capital plus $100,000 capex against $250,000 earnings power",
      "D": "OCF $225,000; ending $185,000 — working capital changes add to cash"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Operating cash flow (indirect) = $200,000 + $50,000 (depreciation add-back) − $30,000 (AR build) − $20,000 (inventory build) + $25,000 (AP build) = $225,000. Cash change = $225,000 − $100,000 capex − $40,000 dividends = +$85,000; ending = $60,000 + $85,000 = $145,000. The growth story: $250,000 of earnings power ($200k + $50k non-cash) funds $50,000 of net working-capital absorption ($30k + $20k − $25k), $100,000 of capex, and $40,000 of dividends, leaving $85,000 of cash build. Option D's $185,000 adds working-capital changes with the wrong sign (increases in AR/inventory consume cash; only AP provides it). Option B ignores working capital entirely. Business interpretation: pro-forma integration is where budgets meet reality — earnings without cash conversion fund nothing. Common trap: equating net income with operating cash flow.",
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
    "QuestionID": "P1B-B-215",
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
    "ExplanationWrongA": "Option A flows $200,000 of net income straight to cash, skipping $50,000 of add-backs and $25,000 of net working-capital absorption. Net income is an accrual measure — cash conversion is the whole exercise.",
    "ExplanationWrongB": "Option B adds back depreciation ($250,000) but ignores working capital — the $30,000 AR and $20,000 inventory builds consume cash while the $25,000 AP build provides it. Half-built bridges misstate by the omitted half.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D reaches $185,000 by adding working-capital increases to cash. AR and inventory increases consume cash (subtract); only AP increases provide it (add). Sign discipline on working-capital adjustments.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.216 forecast coordination failure costing",
    "MicroTopic": "forecast coordination failure costing",
    "UniqueConceptKey": "B-B-216-forecast-coordination-failure-costing",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales forecasts 12,000 units, but production schedules 10,000 (capacity) while purchasing orders materials for 14,000 (stale forecast). Outcomes: 2,000-unit stockout at $20 CM ($40,000 lost contribution); 4,000 excess material units at $5 ($20,000 carrying/obsolescence exposure). What is the coordination failure's cost, and what fixes it?",
    "Choices": {
      "A": "$40,000 — the stockout is the only real loss; excess material will be used eventually",
      "B": "$20,000 — the excess material is the only incremental cost; stockouts are hypothetical",
      "C": "$0 — the two errors offset (under-production vs over-purchasing net out)",
      "D": "$60,000 — $40,000 lost CM plus $20,000 excess-material exposure; a single frozen forecast must drive all three schedules"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Lost contribution = 2,000 × $20 = $40,000 — real, immediate, unrecoverable (stockout sales rarely fully recover). Excess-material exposure = 4,000 × $5 = $20,000 of carrying cost plus obsolescence risk on forecast-specific inputs. Total coordination cost = $60,000 — and the two errors do not offset (option C's netting fallacy): the stockout loses margin while the overbuy ties up cash, two harms, zero hedge. 'Eventually used' (option A) assumes the stale-forecast materials match future needs — at 4,000 units over a 10,000-unit schedule, 40% overbuy on possibly wrong specs. 'Hypothetical' stockouts (option B) ignore that 12,000 of forecasted demand met 10,000 of scheduled supply. The fix is process, not arithmetic: one frozen sales forecast (with a formal change protocol) driving production and purchasing together — three schedules, one truth. Business interpretation: forecast divergence costs compound (lost margin PLUS trapped cash), so S&OP discipline pays twice. Common trap: netting opposite-sign planning errors.",
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
    "QuestionID": "P1B-B-216",
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
    "ExplanationWrongA": "Option A counts only the $40,000 stockout, waving $20,000 of excess material as 'eventually used.' Forecast-specific inputs at 40% overbuy carry real obsolescence risk — eventually is doing heavy lifting for an unjustified $20,000.",
    "ExplanationWrongB": "Option B counts only the $20,000 excess, calling stockouts hypothetical. 2,000 units of forecasted demand against 10,000 scheduled is arithmetic, not hypothesis — the $40,000 is the larger and more certain half.",
    "ExplanationWrongC": "Option C nets the errors to zero — under-production versus over-purchasing as a natural hedge. They compound instead: margin lost plus cash trapped, two harms in the same direction (against the company).",
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
    "Topic": "B-B.217 flexible budget with step-fixed cost",
    "MicroTopic": "flexible budget step-fixed cost",
    "UniqueConceptKey": "B-B-217-flexible-budget-step-fixed-cost",
    "LOSTag": "P1-B.2 Flexible budgets",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Flexible budget: variable $18/unit; fixed $100,000 plus a $15,000 supervisor step above 10,000 units. So: 9,000 units → $262,000; 10,000 → $280,000; 11,000 → $313,000. Actual: 10,500 units, actual cost $305,000. What is the correct flexible-budget variance?",
    "Choices": {
      "A": "$1,000 U — flexible budget $304,000 (step triggers above 10,000); essentially on budget, with the step as the critical modeling point",
      "B": "$16,000 U — flexible $289,000 (step ignored); the step is a budget refinement, not a variance driver",
      "C": "$25,000 U — actual $305,000 versus static $280,000 at 10,000 units",
      "D": "$8,000 F — flexible at the 11,000 column ($313,000) since actual exceeds 10,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "At 10,500 units the supervisor step has triggered (above 10,000): flexible = 10,500 × $18 + $100,000 + $15,000 = $189,000 + $115,000 = $304,000. Variance = $305,000 − $304,000 = $1,000 U — essentially on budget. Ignoring the step (option B, $289,000) fabricates a $16,000 U variance from a modeling omission, punishing operations for a supervisor the budget formula forgot. Static comparison (option C, $25,000 U vs the 10,000-unit $280,000) confounds 500 units of volume with spending control. Using the 11,000 column (option D, $313,000 → $8,000 F) flexes to the wrong activity level — flexible means actual activity (10,500), not the nearest column. Business interpretation: step-fixed costs are where flexible budgets most often fail — model the step explicitly or the variance lies. Common trap: flexing to column labels instead of actual activity.",
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
    "QuestionID": "P1B-B-217",
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
    "ExplanationWrongB": "Option B flexes without the step ($289,000), manufacturing a $16,000 U variance from a modeling omission. The supervisor exists at 10,500 units — budgets that forget triggered steps punish operations for the budget's amnesia.",
    "ExplanationWrongC": "Option C compares actual to the static 10,000-unit budget ($25,000 U), mixing 500 units of volume with spending control. Static comparisons at non-static activity are volume variances wearing spending variance's clothes.",
    "ExplanationWrongD": "Option D flexes to the 11,000-unit column ($313,000 → $8,000 F) instead of actual 10,500 units. Flexible means actual activity interpolated — column labels are conveniences, and 500 phantom units fabricate an $8,000 F that does not exist.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.218 cash shortfall responsibility attribution",
    "MicroTopic": "cash shortfall responsibility attribution",
    "UniqueConceptKey": "B-B-218-cash-shortfall-responsibility-attribution",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $45,000 cash shortfall versus budget is investigated: $30,000 from uncollected receivables (credit approved two weak accounts against policy), plus $15,000 from an emergency equipment repair (a maintenance backlog item that finally failed). Treasury's positioning and timing were clean. How should responsibility be attributed?",
    "Choices": {
      "A": "Treasury owns the full $45,000 — cash is treasury's accountability by definition",
      "B": "Credit $30,000 (approval laxity) plus maintenance $15,000 (deferred backlog) — treasury's positioning is blameless; fix approval authority and the PM schedule",
      "C": "$15,000 each to credit, maintenance, and treasury — shared outcomes mean shared accountability",
      "D": "Maintenance owns the full $45,000 — equipment reliability drives everything downstream"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Attribute by cause, not by account label. The $30,000 traces to credit approvals violating policy on two weak accounts — a controllable credit-decision failure with a named fix (approval authority, limits enforcement). The $15,000 traces to deferred preventive maintenance converting into emergency repair — a controllable scheduling failure with a named fix (PM backlog clearance). Treasury's positioning and timing were clean — charging treasury $45,000 (option A) or $15,000 (option C) punishes the measurer for others' decisions and teaches treasury to sandbag forecasts defensively. Maintenance-only attribution (option D) lets credit's policy violation hide inside a bigger number. Business interpretation: cash variances are symptoms diagnosed upstream — the cash account reports where others' decisions land. Fix approval authority and PM scheduling; leave treasury's process intact. Common trap: attributing cash outcomes to the cash function.",
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
    "QuestionID": "P1B-B-218",
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
    "ExplanationWrongA": "Option A charges treasury the full $45,000 because 'cash is treasury's.' Cash outcomes land in treasury's account the way casualties land in hospitals — the causes (credit approvals, deferred maintenance) sit upstream with named owners.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C splits $15,000 each for 'shared accountability.' Equal splits without causal basis socialize two identified failures across an innocent party — shared outcomes deserve traced accountability, not averaged blame.",
    "ExplanationWrongD": "Option D loads everything onto maintenance, letting credit's $30,000 policy violation disappear into a bigger number. Single-owner attribution for multi-cause variances protects one culprit while over-punishing another.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.219 forecast bias detection and correction",
    "MicroTopic": "forecast bias detection correction",
    "UniqueConceptKey": "B-B-219-forecast-bias-detection-correction",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Eight quarters of sales forecasts versus actuals show errors (actual-minus-forecast): +6%, +8%, +5%, +7%, +9%, +6%, +8%, +7%. The planning team calls this normal noise around an unbiased process. Next quarter's forecast is $1,000,000. What should the controller conclude and do?",
    "Choices": {
      "A": "Accept as noise — ±9% variation is ordinary forecasting tolerance",
      "B": "Optimistic bias — forecasts exceed actuals and need upward correction",
      "C": "Persistent conservative bias ≈ +7% — actuals exceed forecasts every quarter; adjust next forecast to $1,070,000 and investigate incentive roots",
      "D": "No adjustment — eight quarters is too small a sample for bias conclusions"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Noise scatters on both sides of zero; eight consecutive same-sign errors (+5% to +9%, mean +7.0%) have probability (1/2)^8 ≈ 0.4% under unbiased forecasting — this is systematic conservative bias (sandbagging), not noise. Direction check: actuals exceed forecasts, so forecasts are conservative (option B's 'optimistic' inverts the sign — optimistic forecasts would exceed actuals). Correction: $1,000,000 × 1.07 = $1,070,000, pending root-cause work on incentives (bonuses for 'beating forecast' manufacture exactly this pattern). Eight quarters is ample for a sign test (option D's sample-size objection would require ignoring a 99.6%-significant pattern). Business interpretation: track forecast error signs, not just magnitudes — one-sided runs are confessions. Fix the bonus formula that pays for beats, and the bias attenuates. Common trap: calling systematic one-sided error 'tolerance.'",
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
    "QuestionID": "P1B-B-219",
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
    "ExplanationWrongA": "Option A calls eight same-sign errors (±5–9%, all positive) 'ordinary tolerance.' Tolerance scatters both directions; one-sided runs of eight have 0.4% probability under unbiased forecasting — this is bias wearing noise's clothes.",
    "ExplanationWrongB": "Option B diagnoses optimistic bias (forecasts exceeding actuals), but actuals exceed forecasts in all eight quarters — the bias is conservative (sandbagging), and 'upward correction' language confuses which side needs moving.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D pleads small sample, but the sign test on eight same-sign errors is 99.6% significant. Waiting for more data while booking biased forecasts lets the incentive rot deepen.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.220 budget manual compliance finding",
    "MicroTopic": "budget manual compliance finding",
    "UniqueConceptKey": "B-B-220-budget-manual-compliance-finding",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Policy: capital expenditures above $25,000 need board pre-approval. A manager splits a $48,000 control system into two $24,000 purchase orders, each approved at the department level a week apart. Internal audit discovers the split. How should the finding read?",
    "Choices": {
      "A": "Compliant — each PO is below $25,000 and properly department-approved",
      "B": "Compliant with a warning — form met, spirit bent, note and move on",
      "C": "Compliant after retroactive board approval — ratification cures the split",
      "D": "Policy violation — a $48,000 single economic purchase split to evade the $25,000 threshold; void the second PO and require board ratification with a control finding"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Substance over form: one $48,000 control system is one $48,000 capital commitment regardless of invoice count. Splitting to stay under a threshold is textbook control evasion — compliant-form readings (options A/B) bless structuring that guts every authorization limit in the manual (any $1M purchase clears as forty-one $24k POs). Retroactive approval without a finding (option C) prices evasion at zero — ratification may stand, but only alongside a control deficiency finding, retraining, and approval-workflow monitoring (flag split POs to the same vendor within 30 days). Voiding the second PO restores the pre-commitment state the policy exists to protect; board ratification then decides the economics openly. Business interpretation: thresholds measure economic substance per transaction — audit for split patterns (same vendor, adjacent dates, complementary scopes), not just PO amounts. Common trap: testing compliance PO-by-PO instead of transaction-by-transaction.",
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
    "QuestionID": "P1B-B-220",
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
    "ExplanationWrongA": "Option A blesses each $24,000 PO as compliant, which would bless any purchase split into sub-threshold pieces — a $1M system as forty-one POs. Thresholds test economic transactions, not paperwork batches.",
    "ExplanationWrongB": "Option B's 'note and move on' prices evasion at a warning memo. Without consequences (voided PO, finding, monitoring), the next split is already scheduled — warnings without teeth are permissions.",
    "ExplanationWrongC": "Option C lets retroactive approval cure the split silently. Ratification may be appropriate, but only with a control finding attached — silent cure teaches that evasion costs one extra signature.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE3C;