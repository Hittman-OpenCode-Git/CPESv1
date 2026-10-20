",
          "Installed cost",
          "Annual after-tax cash savings",
          "Service life",
          "Salvage at end of life"
        ],
        "Rows": [
          [
            "Unit X — reciprocating compressor",
            "$420,000",
            "$158,000",
            "4 years",
            "$40,000"
          ],
          [
            "Unit Y — magnetic-bearing centrifugal",
            "$585,000",
            "$162,000",
            "6 years",
            "$30,000"
          ]
        ],
        "DataFormat": "USD whole dollars; end-of-year cash flows",
        "AccuracyCheck": "Both options quoted net of trade-in; savings are level annuities over each unit's life."
      },
      {
        "ExhibitID": "CBQ22-E1-E3",
        "CaseID": "CBQ22-E1",
        "Type": "email",
        "Title": "Exhibit 3 — Controller Memo: Budget Ceiling and Discounting Factors",
        "Purpose": "Fixes the $1,300,000 ceiling, the 10% discount rate, and the PV factors required for the EAA work in Q1 through Q3.",
        "ReferencedBy": [
          "CBQ22-E1-Q1",
          "CBQ22-E1-Q2",
          "CBQ22-E1-Q3"
        ],
        "Body": "From: Ana Souza, Corporate Controller\nTo: Priya Raman, VP Finance\nSubject: Parameters for Thursday's investment committee\n\nPriya — confirmed parameters for the packet: (1) the board's discretionary ceiling stands at $1,300,000 for this cycle; projects are indivisible and cannot be phased; (2) the corporate discount rate is 10%; (3) use these present-value factors: PVIFA(10%, 4 yrs) = 3.1699, PVIF(10%, 4 yrs) = 0.6830, PVIFA(10%, 6 yrs) = 4.3553, PVIF(10%, 6 yrs) = 0.5645. The two compressor candidates are strictly mutually exclusive — one slot, one replacement. Please show the package math and the annualized compressor comparison side by side.\n— Ana",
        "DataFormat": "Business email text; factors carried to four decimals",
        "AccuracyCheck": "Factors match standard 10% tables at four decimals; ceiling matches ScenarioText."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Ignoring the compressor decision, identify the affordable package of indivisible projects that maximizes aggregate NPV under the $1,300,000 ceiling, and report that maximum aggregate NPV in whole dollars (tolerance ±$1).",
        "Correct": "322000",
        "Explanation": "With a lumpy budget and indivisible projects, the defensible method is exhaustive comparison of feasible bundles on total NPV (ID-01). The bundle {P1, P2, P5} costs $620,000 + $340,000 + $300,000 = $1,260,000, within the $1,300,000 ceiling, and yields $148,800 + $95,200 + $78,000 = $322,000 of NPV. No feasible rival beats it: {P2, P3, P5} totals $302,800; {P1, P2, P4} totals $298,600; any four-project set costs at least $1,380,000 and violates the ceiling. Note the trap: funding in descending profitability-index order loads P2, P3, and P5 ($1,120,000), then nothing else fits the $180,000 remainder, freezing the portfolio at $302,800 — $19,200 short of the achievable maximum. PI screens value per dollar; it cannot see bundle interactions.",
        "Topic": "Capital rationing package selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the Exhibit 3 factors (PVIFA at 10% for 4 years = 3.1699; PVIF at 10% for 4 years = 0.6830), compute the equivalent annual annuity (EAA) of Unit X. Carry the NPV unrounded through the division and express the EAA in whole dollars (tolerance ±$50).",
        "Correct": "34122",
        "Explanation": "EAA converts a lump-sum NPV into a level annual equivalent using ID-05: EAA = NPV ÷ PVIFA(r, n). Unit X: NPV = −$420,000 + ($158,000 × 3.1699) + ($40,000 × 0.6830) = −$420,000 + $500,844.20 + $27,320 = $108,164.20. EAA = $108,164.20 ÷ 3.1699 ≈ $34,122 per year. Business meaning: owning and operating Unit X adds roughly $34,100 of value-equivalent cash benefit annually over its four-year service window. A common trap is dividing NPV by the asset's life in years ($108,164 ÷ 4 = $27,041), which ignores the time value of money and understates the annualized figure by about $7,100.",
        "Topic": "Equivalent annual annuity",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which replacement should the committee authorize, and on what basis? Use the Exhibit 3 factors (PVIFA 10%, 4 yrs = 3.1699; PVIF 10%, 4 yrs = 0.6830; PVIFA 10%, 6 yrs = 4.3553; PVIF 10%, 6 yrs = 0.5645).",
        "Correct": "A",
        "Choices": {
          "A": "Select Unit X; its equivalent annual annuity of about $34,122 exceeds Unit Y's $31,569 despite Unit Y's larger headline NPV",
          "B": "Select Unit Y; its NPV of $137,494 exceeds Unit X's $108,164, and raw NPV settles unequal-life replacements",
          "C": "Select Unit Y; spreading its cost over six years lowers its annual burden below Unit X's",
          "D": "Select neither unit; neither recovers its installed cost within the discounting horizon"
        },
        "Explanation": "For mutually exclusive assets with unequal lives, raw NPV misleads because benefits accrue over different horizons; the equivalent annual annuity (ID-05) puts both on a per-year footing. Unit Y: NPV = −$585,000 + ($162,000 × 4.3553) + ($30,000 × 0.5645) = −$585,000 + $705,558.60 + $16,935 = $137,493.60; EAA = $137,493.60 ÷ 4.3553 ≈ $31,569. Against Unit X's ≈$34,122 (from Q2), Unit X wins by about $2,553 per year even though Y shows the bigger NPV — its advantage is simply stretched over two extra years. Choice B commits the classic unequal-life trap; choice C inverts the arithmetic; choice D ignores that both NPVs are positive.",
        "Topic": "Unequal-life replacement decision",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Treasury staff proposed funding projects strictly in descending profitability-index order until the budget binds. Which statement best evaluates that rule for this year's slate?",
        "Correct": "C",
        "Choices": {
          "A": "The rule failed because the profitability index was computed against the wrong denominator for P3",
          "B": "The rule failed because a 10 percent discount rate was applied inconsistently across the five projects",
          "C": "The rule failed because highest-PI selection ignores indivisibility: the PI-ranked trio left too little budget for the large-NPV racking project, freezing the portfolio at $302,800 instead of the feasible $322,000",
          "D": "The rule failed because mutually exclusive projects were ranked as though they were independent"
        },
        "Explanation": "The profitability index (ID-02) correctly measures value created per dollar invested, but with indivisible projects and a lumpy ceiling it is a screening aid, not an optimizer. Descending PI loads P2 (1.28), P3 (1.27), and P5 (1.26) for $1,120,000; the $180,000 remainder fits neither P1 ($620,000) nor P4 ($260,000), locking in $302,800 of NPV. Exhaustive comparison shows {P1, P2, P5} at $1,260,000 delivers $322,000 — $19,200 better — because capital rationing requires evaluating whole bundles, not marginal rankings. Choices A and B invent computational errors the exhibit data contradict; choice D mislabels the slate, where the only mutual exclusivity sits in the separate compressor decision.",
        "Topic": "Profitability index under rationing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-02",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements about Bluewater's investment decisions are correct? Select exactly three.",
        "Correct": [
          "Profitability index is an efficient screen, but with indivisible projects the adopted package must come from comparing total NPV across feasible bundles",
          "Because Units X and Y deliver service over different horizons, their raw NPVs are not directly comparable without annualization",
          "The EAA comparison implicitly assumes both compressors can be replaced with economically similar assets when their lives expire"
        ],
        "Choices": {
          "A": "Profitability index is an efficient screen, but with indivisible projects the adopted package must come from comparing total NPV across feasible bundles",
          "B": "Adding dock-door automation to the adopted package is affordable because its $260,000 cost fits inside the budget headroom",
          "C": "Because Units X and Y deliver service over different horizons, their raw NPVs are not directly comparable without annualization",
          "D": "Raising the capital ceiling to $1,440,000 would leave this year's adopted package unchanged",
          "E": "The EAA comparison implicitly assumes both compressors can be replaced with economically similar assets when their lives expire"
        },
        "Explanation": "Statement A captures the rationing doctrine from Q1/Q4: PI screens, but bundle-level NPV decides. Statement C states the unequal-life problem that EAA (ID-05) solves, and statement E names EAA's standard replication assumption — chains of like-for-like replacement make annualized values comparable. Statement B fails arithmetically: the adopted package spends $1,260,000 of $1,300,000, leaving $40,000 of headroom, far short of P4's $260,000. Statement D fails because a $1,440,000 ceiling would admit {P1, P2, P3} at exactly $1,440,000 with $373,600 of NPV, displacing the current $322,000 package. The recurring candidate error is treating heuristics and single-snapshot NPVs as sufficient once constraints or unequal lives enter.",
        "Topic": "Rationing and EAA judgment",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each quantity from the Bluewater analysis to its correct value.",
        "LeftItems": [
          "Adopted package — aggregate NPV",
          "Profitability index — fleet telematics retrofit",
          "EAA — Unit Y",
          "Budget headroom after adopting the package"
        ],
        "RightItems": [
          "$322,000",
          "1.28",
          "$31,569",
          "$40,000",
          "$302,800",
          "1.24",
          "$34,122"
        ],
        "Correct": {
          "Adopted package — aggregate NPV": "$322,000",
          "Profitability index — fleet telematics retrofit": "1.28",
          "EAA — Unit Y": "$31,569",
          "Budget headroom after adopting the package": "$40,000"
        },
        "Explanation": "The adopted bundle {P1, P2, P5} aggregates $148,800 + $95,200 + $78,000 = $322,000 of NPV against a $1,260,000 outlay, leaving $40,000 of the ceiling unused. The telematics retrofit carries the menu's top profitability index: ($340,000 + $95,200) ÷ $340,000 = 1.28. Unit Y's annualized value is $137,493.60 ÷ 4.3553 ≈ $31,569, second to Unit X's $34,122. Distractors anchor real figures to wrong labels: $302,800 is the suboptimal PI-greedy portfolio, 1.24 is the ASRS project's index, and $34,122 is Unit X's EAA — matching them correctly requires separating package results from component metrics.",
        "Topic": "Investment-decision recap",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Refrigerated warehousing and distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Bluewater Cold Chain Logistics",
    "Stakeholder": "Priya Raman, Vice President of Finance",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Construct feasible project bundles under a capital ceiling and select on aggregate NPV",
      "Explain the indivisibility failure mode of profitability-index ranking",
      "Annualize unequal-life mutually exclusive investments with EAA for a defensible replacement choice"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-B2",
    "Title": "WACC Update and Working-Capital Review",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Blend debt tranches into a market-weighted pre-tax cost of debt",
      "Recalculate WACC from CAPM equity, preferred, and after-tax debt components at market-value weights",
      "Decompose the cash conversion cycle into DSO, DIO, and DPO to diagnose working-capital drift"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Silverpine Medical Devices manufactures infusion pumps and holds a $6,000,000 revolving credit facility that matures at quarter-end. Treasurer Luis Herrera must deliver an updated weighted average cost of capital to First Harbor Bank—which now prices renewals off the borrower's measured hurdle rate—after Silverpine closes a $4,000,000 term loan to fund capacity tooling. The bank's credit committee also flagged working-capital drift from covenant monitoring, so Luis pairs the WACC refresh with a cash-conversion-cycle diagnosis against the prior year. He must quantify the new component costs, recalculate WACC at market-value weights, and pinpoint which CCC component drove the deterioration before the renewal meeting.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B2-E1",
        "CaseID": "CBQ22-B2",
        "Type": "table",
        "Title": "Exhibit 1 — Post-Closing Capital Structure and Component Inputs",
        "Purpose": "Supplies market values and component inputs (debt YTMs, preferred dividend and net proceeds, CAPM inputs, tax rate) for the cost-of-debt blend in Q1, the WACC rebuild in Q2, and the metric match in Q6.",
        "ReferencedBy": [
          "CBQ22-B2-Q1",
          "CBQ22-B2-Q2",
          "CBQ22-B2-Q6"
        ],
        "Headers": [
          "Financing component",
          "Market value",
          "Component input"
        ],
        "Rows": [
          [
            "Existing term debt",
            "$8,000,000",
            "Pre-tax yield to maturity 6.00%"
          ],
          [
            "New term loan (closing this quarter)",
            "$4,000,000",
            "Pre-tax yield to maturity 8.00%"
          ],
          [
            "Preferred stock (40,000 shares)",
            "$2,000,000",
            "Annual dividend $3.75 per share; net proceeds $46.875 per share"
          ],
          [
            "Common equity (1,500,000 shares at $20)",
            "$30,000,000",
            "Risk-free rate 4.00%; beta 1.20; equity risk premium 5.50%"
          ],
          [
            "Marginal tax rate",
            "—",
            "25%"
          ]
        ],
        "DataFormat": "USD whole dollars; rates in percent; per-share amounts in dollars",
        "AccuracyCheck": "Component market values total $44,000,000; preferred yield check $3.75 ÷ $46.875 = 8.00%; CAPM equity cost 4.00% + 1.20 × 5.50% = 10.60%."
      },
      {
        "ExhibitID": "CBQ22-B2-E2",
        "CaseID": "CBQ22-B2",
        "Type": "table",
        "Title": "Exhibit 2 — Working-Capital Data, Current Versus Prior Year",
        "Purpose": "Provides the balances and flow bases for computing current-year DSO/DIO/DPO/CCC in Q4 and Q6, plus prior-year ratios for trend diagnosis.",
        "ReferencedBy": [
          "CBQ22-B2-Q4",
          "CBQ22-B2-Q5",
          "CBQ22-B2-Q6"
        ],
        "Headers": [
          "Working-capital measure",
          "Current year",
          "Prior year"
        ],
        "Rows": [
          [
            "Net credit sales",
            "$42,000,000",
            "$39,000,000"
          ],
          [
            "Cost of goods sold",
            "$27,300,000",
            "$25,600,000"
          ],
          [
            "Merchandise purchases",
            "$27,900,000",
            "$26,100,000"
          ],
          [
            "Year-end accounts receivable",
            "$5,600,000",
            "$4,800,000"
          ],
          [
            "Year-end inventory",
            "$3,300,000",
            "$2,700,000"
          ],
          [
            "Year-end accounts payable",
            "$3,100,000",
            "$3,650,000"
          ],
          [
            "DSO (days)",
            "—",
            "43.90"
          ],
          [
            "DIO (days)",
            "—",
            "41.50"
          ],
          [
            "DPO (days)",
            "—",
            "44.30"
          ],
          [
            "CCC (days)",
            "—",
            "41.10"
          ]
        ],
        "DataFormat": "USD whole dollars; ratios computed on a 365-day year; prior-year ratio cells are treasury-reported",
        "AccuracyCheck": "Current purchases tie to COGS plus the $600,000 inventory build ($27,300,000 + $600,000 = $27,900,000); prior-year CCC = 43.90 + 41.50 − 44.30 = 41.10 days."
      },
      {
        "ExhibitID": "CBQ22-B2-E3",
        "CaseID": "CBQ22-B2",
        "Type": "email",
        "Title": "Exhibit 3 — Bank Renewal Request",
        "Purpose": "Establishes the renewal trigger and the bank's expectation that the WACC update and CCC diagnosis support the credit package discussed in Q3 and Q5.",
        "ReferencedBy": [
          "CBQ22-B2-Q3",
          "CBQ22-B2-Q5"
        ],
        "Body": "From: Renata Cole, Relationship Manager, First Harbor Bank\nTo: Luis Herrera, Treasurer, Silverpine Medical Devices\nSubject: Revolver renewal — credit committee package\n\nLuis — the $6,000,000 revolver matures at quarter-end and the committee now benchmarks renewals against the borrower's own measured hurdle rate. Please send your refreshed weighted average cost of capital reflecting the $4,000,000 term loan closing this quarter. Separately, covenant monitoring shows working-capital drift; include a cash-conversion-cycle bridge versus last year identifying which lever moved. We value the relationship and want the renewal straightforward.",
        "DataFormat": "Business email text",
        "AccuracyCheck": "Facility size, maturity timing, and loan amount agree with ScenarioText and Exhibit 1."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the blended pre-tax cost of debt Silverpine should use after the new term loan closes, weighting the two tranches at their market values. Express as a percentage rounded to two decimal places (tolerance ±0.01).",
        "Correct": "6.67",
        "Explanation": "The economic cost of debt is the yield to maturity on each tranche, blended at market-value weights: (($8,000,000 × 6.00%) + ($4,000,000 × 8.00%)) ÷ $12,000,000 = ($480,000 + $320,000) ÷ $12,000,000 = $800,000 ÷ $12,000,000 = 6.6667% ≈ 6.67%. Using YTM rather than coupon anchors the cost to current market pricing of Silverpine's credit. A common trap is averaging the two rates equally (7.00%), which ignores the 2:1 weight of the legacy tranche; a second trap is quoting the pre-tax figure inside WACC — the after-tax application comes later via (1 − t), giving 6.6667% × 0.75 = 5.00%.",
        "Topic": "Blended cost of debt",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-07",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Recalculate Silverpine's WACC at the post-closing market-value capital structure: use CAPM for the cost of equity, the preferred yield implied by Exhibit 1, the blended after-tax cost of debt, and the 25 percent tax rate. Express as a percentage rounded to two decimal places (tolerance ±0.01).",
        "Correct": "8.95",
        "Explanation": "Components: cost of equity Re = 4.00% + 1.20 × 5.50% = 10.60% (CAPM, CB-04 logic within CB-05); cost of preferred Rp = $3.75 ÷ $46.875 = 8.00% (no tax shield on preferred dividends); blended after-tax Rd = 6.6667% × (1 − 0.25) = 5.00%. Market-value weights on V = $44,000,000: E/V = 30/44, P/V = 2/44, D/V = 12/44. WACC = (30/44 × 10.60%) + (2/44 × 8.00%) + (12/44 × 5.00%) = 7.2273% + 0.3636% + 1.3636% = 8.9545% ≈ 8.95%. Classic failures to avoid: skipping the (1 − t) adjustment on debt, dropping the preferred leg entirely, and substituting book values for the $44 million market-value base.",
        "Topic": "WACC recalculation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Before the new loan, WACC stood at 9.25 percent on the old structure. Which statement best explains the change to the recalculated figure for the bank committee?",
        "Correct": "C",
        "Choices": {
          "A": "The WACC rises because the marginal 8.00 percent coupon exceeds the legacy 6.00 percent cost of debt",
          "B": "The WACC is unchanged; swapping one debt source for another at market weights leaves the weighted average intact",
          "C": "The WACC falls from 9.25 percent to about 8.95 percent because shifting weight toward after-tax debt at roughly 5.00 percent more than offsets the higher coupon",
          "D": "The WACC falls because added leverage makes the equity component cheaper under CAPM"
        },
        "Explanation": "Substituting $4,000,000 of 8.00 percent debt for equity weight cuts the after-tax cost of the marginal dollars to about 5.00 percent — far below the 10.60 percent equity it displaces — so the weighted average drops from 9.25 percent ((0.75 × 10.60%) + (0.05 × 8.00%) + (0.20 × 4.50%)) to 8.95 percent. The coupon step-up matters less than the mix shift because interest is tax-deductible while equity returns are not. Choice D inverts CAPM: higher leverage raises equity beta and therefore the cost of equity. Committees read a falling WACC alongside rising leverage as cheaper but riskier funding — the narrative Luis should pair with the number.",
        "Topic": "Capital-structure effect on WACC",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Using a 365-day year, compute the current-year components and identify the primary driver of the cash-conversion-cycle deterioration the bank flagged.",
        "Correct": "B",
        "Choices": {
          "A": "Inventory accumulation is the primary driver, adding close to five days of CCC",
          "B": "Slower collections are the largest single driver: DSO lengthened by about 4.8 days, with faster supplier payments adding further pressure",
          "C": "The deterioration is optical; the CCC improved once the year's higher purchase volume is considered",
          "D": "Stretching payables is the main problem, since DPO fell by more than seven days"
        },
        "Explanation": "CCC = DIO + DSO − DPO (CB-10), each on 365 days. Current year: DSO = ($5,600,000 ÷ $42,000,000) × 365 = 48.67; DIO = ($3,300,000 ÷ $27,300,000) × 365 = 44.12; DPO = ($3,100,000 ÷ $27,900,000) × 365 = 40.56, using purchases (not COGS) as the DPO base. CCC = 48.67 + 44.12 − 40.56 = 52.23 days versus 41.10 last year. Component moves: DSO +4.77 days (the largest adverse swing), DIO +2.62, DPO −3.74 (paying suppliers faster). Choice D overstates the payable move and misreads direction; choice A inflates inventory's role; choice C contradicts the arithmetic. The trap is adding DPO rather than subtracting it, which flips the diagnosis.",
        "Topic": "Cash conversion cycle diagnosis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-10",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements about Silverpine's renewal package are correct? Select exactly three.",
        "Correct": [
          "Applying the refreshed 8.95 percent WACC as the discount rate suits capital projects whose risk profile mirrors the firm as a whole",
          "An eleven-day CCC deterioration ties up roughly $1.3 million of additional cash at current sales velocity, weakening the renewal narrative",
          "Negotiating longer supplier payment terms would raise DPO and shorten the cash conversion cycle"
        ],
        "Choices": {
          "A": "Applying the refreshed 8.95 percent WACC as the discount rate suits capital projects whose risk profile mirrors the firm as a whole",
          "B": "Because interest is deductible, the 6.67 percent blended pre-tax debt cost belongs in the WACC without tax adjustment",
          "C": "Book-value weights belong in the WACC because they anchor the bank to audited statements",
          "D": "An eleven-day CCC deterioration ties up roughly $1.3 million of additional cash at current sales velocity, weakening the renewal narrative",
          "E": "Negotiating longer supplier payment terms would raise DPO and shorten the cash conversion cycle"
        },
        "Explanation": "Statement A applies firm-wide WACC to average-risk projects — the correct scope discipline. Statement D quantifies the drift: 11.13 days × ($42,000,000 ÷ 365) ≈ $1,280,700 of incremental cash tied up, material to the credit story. Statement E is mechanically right: longer terms lift DPO, and DPO enters CCC negatively. Statement B fails because WACC requires the after-tax cost (6.6667% × 0.75 = 5.00%); deductibility is precisely why the adjustment exists. Statement C confuses reporting conventions with valuation theory — WACC uses market-value weights ($44,000,000 here), while book statements serve the bank's separate collateral analysis.",
        "Topic": "Renewal-readiness evaluation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each finance metric from the Silverpine refresh to its correct current-year value.",
        "LeftItems": [
          "Cost of equity (CAPM)",
          "Blended after-tax cost of debt",
          "DSO — current year",
          "CCC — current year"
        ],
        "RightItems": [
          "10.60%",
          "5.00%",
          "48.67 days",
          "52.23 days",
          "6.67%",
          "44.12 days",
          "9.25%"
        ],
        "Correct": {
          "Cost of equity (CAPM)": "10.60%",
          "Blended after-tax cost of debt": "5.00%",
          "DSO — current year": "48.67 days",
          "CCC — current year": "52.23 days"
        },
        "Explanation": "CAPM gives 4.00% + 1.20 × 5.50% = 10.60%. The blended pre-tax debt cost of 6.67% becomes 5.00% after the 25 percent tax shield — the figure that actually enters WACC. Receivables of $5,600,000 against $42,000,000 of credit sales put DSO at 48.67 days, and combining 44.12 days of inventory with 40.56 days of payables yields the 52.23-day cycle. Distractors map to near neighbors: 6.67% is the pre-tax blend, 44.12 days is DIO, and 9.25% is the prior-structure WACC — matching correctly requires keeping pre-tax versus after-tax and component-versus-composite distinctions straight.",
        "Topic": "Corporate-finance metric recap",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Medical device manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Silverpine Medical Devices",
    "Stakeholder": "Luis Herrera, Treasurer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Blend multiple debt tranches into a single weighted pre-tax cost of debt",
      "Rebuild WACC from CAPM, preferred, and after-tax debt components at market-value weights",
      "Diagnose working-capital deterioration by decomposing CCC into DSO, DIO, and DPO"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-C2",
    "Title": "Pressure Module Make-or-Buy Decision",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply relevant-cost concepts to make-versus-buy outsourcing decisions",
      "Incorporate opportunity costs of released capacity into differential analysis",
      "Evaluate qualitative factors that modify quantitative outsourcing conclusions"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Kestrel Instruments, a mid-sized manufacturer of environmental monitoring devices in Bend, Oregon, has seen demand for its PX-7 pressure sensor module stabilize at 24,000 units per year. Plant controller Dana Whitfield, CPA, must respond to a three-year outsourcing quotation from Vantage Micro Systems after the chief financial officer asked whether the freed assembly bay could be sublet to offset rising plant costs. Dana must build a relevant-cost analysis and recommend whether Kestrel should continue manufacturing the module or buy it from the supplier.",
    "Industry": "Precision instruments manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Kestrel Instruments",
    "Stakeholder": "Dana Whitfield, Plant Controller",
    "BusinessFunction": "Cost management",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "make-or-buy",
      "relevant costs",
      "opportunity cost",
      "outsourcing"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 94,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Separate avoidable from unavoidable costs in an outsourcing analysis",
      "Quantify the opportunity cost of released production space and its effect on a make-or-buy decision",
      "Compute the indifference purchase price between making and buying",
      "Weigh qualitative factors alongside quantitative results before recommending action"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C2-E1",
        "CaseID": "CBQ22-C2",
        "Type": "table",
        "Title": "PX-7 Module Annual Production Cost Summary (24,000 Units)",
        "Purpose": "Provides the full absorption cost structure of in-house PX-7 production, separating the fixed overhead pool into the avoidable supervision and lease portion and the unavoidable allocation portion used in every relevant-cost item.",
        "ReferencedBy": [
          "CBQ22-C2-Q1",
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q3",
          "CBQ22-C2-Q6"
        ],
        "Headers": [
          "Cost Component",
          "Per Unit",
          "Annual Total",
          "Behavior If Production Stops"
        ],
        "Rows": [
          [
            "Direct materials",
            "$14.00",
            "$336,000",
            "Avoided entirely"
          ],
          [
            "Direct labor",
            "$8.00",
            "$192,000",
            "Avoided entirely"
          ],
          [
            "Variable manufacturing overhead",
            "$5.00",
            "$120,000",
            "Avoided entirely"
          ],
          [
            "Avoidable fixed overhead (line supervision and equipment leases)",
            "$9.00",
            "$216,000",
            "Avoided with discontinuation"
          ],
          [
            "Unavoidable fixed overhead (depreciation and corporate allocations)",
            "$10.50",
            "$252,000",
            "Continues unchanged"
          ],
          [
            "Total manufacturing cost",
            "$46.50",
            "$1,116,000",
            "-"
          ]
        ],
        "DataFormat": "Currency in USD; per-unit rates to two decimals; annual totals in whole dollars at 24,000 units.",
        "AccuracyCheck": "Verified twice: 24,000 x $14 = $336,000; components sum to $1,116,000; per-unit column sums to $46.50; avoidable plus unavoidable fixed overhead = $216,000 + $252,000 = $468,000."
      },
      {
        "ExhibitID": "CBQ22-C2-E2",
        "CaseID": "CBQ22-C2",
        "Type": "email",
        "Title": "Supplier Quotation - Vantage Micro Systems",
        "Purpose": "Documents the external purchase offer, including unit price, price-hold term, and delivery terms consumed by the differential-analysis and qualitative-factor items.",
        "ReferencedBy": [
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q3",
          "CBQ22-C2-Q4",
          "CBQ22-C2-Q5"
        ],
        "Body": "From: Priya Nandakumar, Regional Sales Director, Vantage Micro Systems\nTo: Dana Whitfield, Plant Controller, Kestrel Instruments\nSubject: Quotation Q-4471 - PX-7 pressure sensor module\n\nDana, following your request for pricing on annual volumes up to 24,000 units, Vantage can supply the PX-7 module at $46.00 per unit, FOB destination, freight included. We will hold this price firm for three years against documented volume of 20,000 to 26,000 units annually. Tooling transfer would be complete within 90 days of award, and our facility is ISO 9001 certified with on-time delivery averaging 98.2 percent over the trailing four quarters. The offer requires 60 days written notice for termination and excludes any obligation for Kestrel plant overhead. Please confirm acceptance by October 15 so we can lock component supply contracts.\n\nPriya"
      },
      {
        "ExhibitID": "CBQ22-C2-E3",
        "CaseID": "CBQ22-C2",
        "Type": "table",
        "Title": "Alternative Uses of Released Assembly Bay (Annual Cash Effect)",
        "Purpose": "Establishes the best alternative use of the floor space freed by outsourcing, which determines the opportunity cost applied in the differential items and the match item.",
        "ReferencedBy": [
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q4",
          "CBQ22-C2-Q5",
          "CBQ22-C2-Q6"
        ],
        "Headers": [
          "Alternative Use",
          "Annual Net Cash Benefit",
          "Conditions"
        ],
        "Rows": [
          [
            "Sublease to Meridian Freight Works (cold stora