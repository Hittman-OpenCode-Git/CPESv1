   "Score risks via Likelihood x Severity and expected loss, and interpret the heat map",
      "Distinguish risk appetite, tolerance, and capacity and apply KRI thresholds",
      "Recommend reduce/share/avoid/accept responses and quantify residual risk",
      "Incorporate correlation and portfolio view into the launch decision"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D4-E1",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 1 — Enterprise Risk Register (Annual Basis)",
        "Purpose": "Provides likelihood and severity ratings, impact, and probability for risk-score and expected-loss computation.",
        "ReferencedBy": [
          "CBQ22-D4-Q1",
          "CBQ22-D4-Q2",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Risk",
          "Likelihood (1-5)",
          "Severity (1-5)",
          "Impact if Realized",
          "Annual Probability"
        ],
        "Rows": [
          [
            "R1 — Midstream pipeline release",
            "3",
            "5",
            "$6,000,000",
            "8%"
          ],
          [
            "R2 — Commodity price collapse",
            "4",
            "4",
            "$3,000,000",
            "15%"
          ],
          [
            "R3 — Contractor safety fatality",
            "4",
            "5",
            "$4,000,000",
            "10%"
          ],
          [
            "R4 — SCADA cyber breach",
            "2",
            "5",
            "$8,000,000",
            "5%"
          ],
          [
            "R5 — Permit & regulatory delay",
            "3",
            "3",
            "$1,500,000",
            "20%"
          ]
        ],
        "DataFormat": "Likelihood/Severity 1=rare/minor to 5=almost certain/catastrophic; impact USD; probability annual",
        "AccuracyCheck": "EL = Prob*Impact = 480k,450k,400k,400k,300k; R3 highest EL differs from heat map score"
      },
      {
        "ExhibitID": "CBQ22-D4-E2",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 2 — Board Risk Appetite, Tolerance, and Capacity",
        "Purpose": "Defines the three board-level risk boundaries and KRI thresholds.",
        "ReferencedBy": [
          "CBQ22-D4-Q3",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Concept",
          "Board Threshold",
          "Operational Use"
        ],
        "Rows": [
          [
            "Risk appetite — residual expected loss per event class",
            "≤ $300,000 per year (post-controls)",
            "Desired residual; guides strategy and the Permian launch go/no-go"
          ],
          [
            "Risk tolerance — KRI band around appetite",
            "Amber at $300,000; red at $350,000",
            "Amber = management action; red = committee escalation required"
          ],
          [
            "Risk capacity — aggregate risk capital",
            "$8,000,000 aggregate EL + tail capital",
            "Hard ceiling before covenant/solvency breach; portfolio must remain well below"
          ],
          [
            "Correlation note",
            "Price collapse and permit delay +0.40",
            "Portfolio volatility exceeds sum of isolates"
          ]
        ],
        "DataFormat": "USD annual expected loss; correlation coefficient",
        "AccuracyCheck": "Appetite < tolerance < capacity by design"
      },
      {
        "ExhibitID": "CBQ22-D4-E3",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 3 — Candidate Responses and KRI Triggers",
        "Purpose": "Provides cost, effect, COSO response class, and residual risk for funding decision.",
        "ReferencedBy": [
          "CBQ22-D4-Q2",
          "CBQ22-D4-Q4",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Response",
          "Annual Cost",
          "Effect",
          "COSO Class / KRI"
        ],
        "Rows": [
          [
            "Enhanced contractor controls + supervision (R3)",
            "$55,000",
            "R3 probability 10%→4%; impact $4M unchanged; residual EL $160,000",
            "Reduce (likelihood); KRI: recordable-incident rate"
          ],
          [
            "Excess liability & cyber transfer program",
            "$85,000",
            "Transfers losses >$1.0M to insurer; retains first $1M; likelihood unchanged",
            "Share (transfer severity above retention)"
          ],
          [
            "Exit Permian contractor corridor (R3 avoidance)",
            "Prohibitive — shuts 30% throughput",
            "Eliminates R3 class entirely",
            "Avoid — not viable"
          ],
          [
            "Accept R5 with contingency reserve + KRI watch",
            "$15,000 reserve",
            "Accepts R5 at $300,000 within appetite",
            "Accept with contingency; KRI: permit-days-delay"
          ]
        ],
        "DataFormat": "USD; probabilities post-response as stated",
        "AccuracyCheck": "Residual R3 EL=0.04*4,000,000=160,000 within appetite"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the risk score (Likelihood x Severity) for R3 — Contractor safety fatality.",
        "Correct": "20",
        "Explanation": "Under COSO ERM Performance Principle 10, risk severity is Likelihood x Severity = 4*5=20, the highest on the heat map and the only risk in the red zone. Adding would understate compounding (4+5=9 vs 20). For Whitaker, a 20 mandates first funding priority.",
        "Topic": "Risk score and heat-map ranking",
        "Subtopic": "Likelihood x Severity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02: Risk Score = Likelihood x Severity",
        "CommonTrapReference": "Adding likelihood and severity instead of multiplying.",
        "DecisionTreeReference": "COSO ERM Performance — risk assessment",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the residual annual expected loss for R3 after the enhanced contractor controls in Exhibit 3, in dollars.",
        "Correct": "160000",
        "Explanation": "Expected loss = Probability x Impact = 0.04*4,000,000= $160,000, now inside the board's $300,000 appetite. The $55,000 program cost is not part of EL — compared to $240,000 EL avoided for $185,000 net benefit. Assuming controls also reduce impact is the classic error.",
        "Topic": "Residual expected loss after mitigation",
        "Subtopic": "Probability reduction",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01: Expected Loss; RM-03: Residual Risk",
        "CommonTrapReference": "Assuming controls reduce impact; adding program cost into EL.",
        "DecisionTreeReference": "COSO ERM — inherent vs residual",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which statement correctly distinguishes the three board boundaries in Exhibit 2?",
        "Correct": "C",
        "Choices": [
          "Appetite at $300,000 is the hard ceiling; tolerance is meaningless and capacity equals appetite — any risk above $300,000 must be avoided outright",
          "Capacity at $8 million is the board's willingness per event class; appetite at $300,000 is the absolute maximum the firm can bear",
          "Appetite (≤$300,000 residual per event class per year) is the board's desired willingness that guides strategy; tolerance ($300,000 amber to $350,000 red) is the acceptable operating band before escalation; capacity ($8,000,000 aggregate) is the maximum the firm can bear before solvency or covenant breach — Valmont must keep each class ≤$300,000 and the portfolio well below $8M",
          "All three terms — appetite, tolerance, capacity — mean the same thing and can be used interchangeably when setting KRIs"
        ],
        "Explanation": "COSO ERM distinguishes appetite (willingness guiding strategy), tolerance (acceptable variation around appetite triggering action), and capacity (maximum absorbable before objectives fail). Exhibit 2 translates: $300k willingness, $300–350k variance band, $8M hard capital constraint.",
        "Topic": "Risk appetite vs tolerance vs capacity",
        "Subtopic": "Board boundary hierarchy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017 — Strategy & Performance",
        "CommonTrapReference": "Treating appetite as hard maximum.",
        "DecisionTreeReference": "Risk appetite statement",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "appetite"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Classify the four candidate responses in Exhibit 3 within the COSO response taxonomy.",
        "Correct": "C",
        "Choices": [
          "Enhanced controls = Share; transfer program = Reduce; exiting the corridor = Accept; contingency reserve = Avoid",
          "All four responses are 'Reduce' because they all lower residual risk",
          "Enhanced controls = Reduce (lowers likelihood), transfer program = Share (transfers severity above $1M retention), exiting the corridor = Avoid (eliminates the event class), contingency reserve = Accept (retains the $300,000 R5 profile with a buffer)",
          "Transfer program = Avoid because insurance eliminates the cyber risk entirely"
        ],
        "Explanation": "COSO Principle 13: avoid (exit activity), reduce (lower likelihood/impact), share (transfer portion), accept (retain within appetite). Enhanced supervision changes frequency — reduce. Insurance moves severity above $1M to carrier — share. Exiting throughput removes class — avoid. Accepting R5 with reserve is textbook accept with contingency.",
        "Topic": "Risk response strategies",
        "Subtopic": "Reduce/share/avoid/accept",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017 — Performance, Principle 13",
        "CommonTrapReference": "Labeling insurance as risk reduction.",
        "DecisionTreeReference": "Risk response decision",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three risks have a residual (or inherent, where no effective mitigation is proposed) expected loss that exceeds the board's $300,000 appetite and therefore require escalation or funded reduction before the launch is approved? (Select three.)",
        "Correct": [
          "R1 — Midstream pipeline release at $480,000 expected loss",
          "R2 — Commodity price collapse at $450,000 expected loss",
          "R4 — SCADA cyber breach at $400,000 expected loss"
        ],
        "Choices": [
          "R1 — Midstream pipeline release at $480,000 expected loss",
          "R2 — Commodity price collapse at $450,000 expected loss",
          "R4 — SCADA cyber breach at $400,000 expected loss",
          "R3 residual at $160,000 after enhanced controls — within appetite, monitor via recordable-incident KRI",
          "R5 — Permit & regulatory delay at $300,000 — at appetite, no escalation unless tolerance is breached"
        ],
        "Explanation": "Appetite test is residual EL ≤ $300k per class. Inherent ELs are R1 480k, R2 450k, R4 400k — all exceed appetite requiring funded action. R3 at 400k inherent would breach, but controls cut residual to 160k which clears appetite. R5 at 300k sits exactly at appetite — acceptable with contingency, escalate only if $350k red crossed. Correlation (+0.40 between R2/R5) argues for escalating R2.",
        "Topic": "Appetite breach and escalation",
        "Subtopic": "Residual vs inherent",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "RM-01; RM-03",
        "CommonTrapReference": "Testing inherent EL for R3 instead of residual.",
        "DecisionTreeReference": "Escalation — appetite threshold",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "appetite breach"
        ],
        "Dependencies": [
          "CBQ22-D4-Q2"
        ]
      },
      {
        "ItemID": "CBQ22-D4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each COSO ERM 2017 component to its Valmont activity.",
        "Correct": {
          "Governance & Culture": "Board sets $300,000 appetite and Tone at the Top for Permian launch",
          "Strategy & Objective-Setting": "Appetite vs $8M capacity trade-off and correlation-aware launch approval",
          "Performance — Assesses Severity": "Heat map Likelihood x Severity and expected-loss ranking (R3=20, R1 $480k)",
          "Review & Revision": "KRI breach beyond $350,000 red line triggers response reassessment"
        },
        "LeftItems": [
          "Governance & Culture",
          "Strategy & Objective-Setting",
          "Performance — Assesses Severity",
          "Review & Revision"
        ],
        "RightItems": [
          "Board sets $300,000 appetite and Tone at the Top for Permian launch",
          "Heat map Likelihood x Severity and expected-loss ranking (R3=20, R1 $480k)",
          "KRI breach beyond $350,000 red line triggers response reassessment",
          "Appetite vs $8M capacity trade-off and correlation-aware launch approval"
        ],
        "Explanation": "COSO ERM: Governance & Culture establishes appetite/tone; Strategy aligns appetite with capacity including correlation; Performance assesses severity via heat-map and dollar EL; Review & Revision requires KRI breaches loop back to reassess responses.",
        "Topic": "COSO ERM 2017 framework",
        "Subtopic": "Component mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017",
        "CommonTrapReference": "Assigning heat-map scoring to Governance.",
        "DecisionTreeReference": "COSO ERM framework",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "COSO ERM"
        ],
        "Dependencies": []
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-E2",
    "Title": "Automation Investment: Unequal Lives and Real Options at Harborview Packaging",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Calculate capital budgeting methods — NPV, IRR, payback, PI (E.1)",
      "Evaluate mutually exclusive projects with unequal lives — EAA (E.4)",
      "Define and value real options — abandonment/timing (E.5)"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Harborview Packaging's capital committee has two competing automation proposals with unequal lives and an early-abandonment feature on the shorter project. Controller Sam Okonkwo must build the after-tax cash flows, compare the projects on an equivalent-annual basis, and value the abandonment option before recommending a vendor to the board.",
    "Industry": "Packaging manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Harborview Packaging",
    "Stakeholder": "Controller Sam Okonkwo",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "NPV",
      "EAA",
      "MACRS",
      "discounted payback",
      "abandonment option",
      "unequal lives"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Build after-tax cash flows with MACRS tax shields and after-tax salvage",
      "Compute NPV and EAA to rank mutually exclusive projects with unequal lives",
      "Compute discounted payback and value an abandonment real option",
      "Identify the dominant sensitivity driver and relevant vs irrelevant cash flows"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E2-E1",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 1 — Automation Proposals and Key Assumptions",
        "Purpose": "Provides capex, operating savings, lives, salvage, tax rate, WACC, and the Beta abandonment alternative.",
        "ReferencedBy": [
          "CBQ22-E2-Q1",
          "CBQ22-E2-Q2",
          "CBQ22-E2-Q3",
          "CBQ22-E2-Q4",
          "CBQ22-E2-Q5"
        ],
        "Headers": [
          "Assumption",
          "Alpha (4-yr line)",
          "Beta (3-yr cell)"
        ],
        "Rows": [
          [
            "Initial investment (t=0)",
            "$1,200,000",
            "$900,000"
          ],
          [
            "Annual pre-tax operating savings (before depreciation)",
            "$520,000",
            "$480,000"
          ],
          [
            "MACRS property class",
            "5-year",
            "5-year"
          ],
          [
            "Project life",
            "4 years",
            "3 years"
          ],
          [
            "Pre-tax salvage at end of life",
            "$100,000",
            "$60,000"
          ],
          [
            "Marginal tax rate",
            "25%",
            "25%"
          ],
          [
            "Discount rate (WACC)",
            "10%",
            "10%"
          ],
          [
            "Beta abandonment alternative (end of Y2, after-tax proceeds)",
            "—",
            "$900,000 if abandoned"
          ]
        ],
        "DataFormat": "USD; rates in percent; savings are incremental before-tax cash flows",
        "AccuracyCheck": "Savings exclude depreciation; salvage taxed via book-value comparison in Exhibit 2"
      },
      {
        "ExhibitID": "CBQ22-E2-E2",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS Depreciation and Book Values",
        "Purpose": "Provides 5-year MACRS rates, annual depreciation, accumulated depreciation, book values, and after-tax salvage.",
        "ReferencedBy": [
          "CBQ22-E2-Q1",
          "CBQ22-E2-Q2",
          "CBQ22-E2-Q6"
        ],
        "Headers": [
          "Year",
          "5-yr MACRS Rate",
          "Alpha Depreciation",
          "Beta Depreciation"
        ],
        "Rows": [
          [
            "1",
            "20.00%",
            "$240,000",
            "$180,000"
          ],
          [
            "2",
            "32.00%",
            "$384,000",
            "$288,000"
          ],
          [
            "3",
            "19.20%",
            "$230,400",
            "$172,800"
          ],
          [
            "4",
            "11.52%",
            "$138,240",
            "—"
          ],
          [
            "Accumulated (life)",
            "—",
            "$992,640",
            "$640,800"
          ],
          [
            "Book value at end of life",
            "—",
            "$207,360",
            "$259,200"
          ],
          [
            "After-tax salvage",
            "—",
            "$126,840",
            "$109,800"
          ]
        ],
        "DataFormat": "USD whole dollars; rates from IRS Pub. 946; after-tax salvage = pre-tax salvage - tax*(pre-tax salvage - book)",
        "AccuracyCheck": "Alpha book 1,200,000-992,640=207,360; after-tax 100,000-0.25*(100,000-207,360)=126,840; Beta book 900,000-640,800=259,200; after-tax 60,000-0.25*(60,000-259,200)=109,800"
      },
      {
        "ExhibitID": "CBQ22-E2-E3",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 3 — Abandonment Valuation and Sensitivity (Beta)",
        "Purpose": "Provides Beta's continuation value at Y2 and sensitivity ranking.",
        "ReferencedBy": [
          "CBQ22-E2-Q4",
          "CBQ22-E2-Q5",
          "CBQ22-E2-Q6"
        ],
        "Headers": [
          "Scenario",
          "Value"
        ],
        "Rows": [
          [
            "Beta Year-3 cash flow (ATCF + after-tax salvage, if continued)",
            "$513,000"
          ],
          [
            "After-tax abandonment proceeds at end of Y2",
            "$900,000"
          ],
          [
            "Sensitivity: NPV change per 1% change in annual savings",
            "Alpha ±$11,910; Beta ±$9,320"
          ]
        ],
        "DataFormat": "USD; PV at 10% WACC",
        "AccuracyCheck": "Continuation 513,000 from build: 403,200 ATCF +109,800 salvage =513,000; 513,000/1.10=466,364; abandonment exceeds continuation by 433,636 at Y2"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter Alpha's Year 2 after-tax cash flow (operating only, excluding salvage), in dollars.",
        "Correct": "486000",
        "Explanation": "ATCF = (Pre-tax savings)*(1 - t) + Depreciation*t = 520,000*0.75 + 384,000*0.25 = 390,000 + 96,000 = $486,000. The $96,000 is the MACRS tax shield, not a cash inflow itself — depreciation is non-cash and only matters through taxes. This Year 2 figure is largest because Year 2 carries peak 32% MACRS rate.",
        "Topic": "After-tax cash flow with MACRS",
        "Subtopic": "Depreciation tax shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-06: After-Tax Cash Flow; ID-07: MACRS",
        "CommonTrapReference": "Treating depreciation as cash outflow.",
        "DecisionTreeReference": "Capital budgeting — ATCF construction",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ATCF"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter Alpha's NPV at 10% (including after-tax salvage), in dollars rounded to nearest dollar.",
        "Correct": "323646",
        "Explanation": "ATCFs: Y1 520k*0.75+240k*0.25=450,000; Y2 486,000; Y3 520k*0.75+230.4k*0.25=447,600; Y4 operating 520k*0.75+138.24k*0.25=424,560 plus salvage 126,840 =551,400. Discounted at 10%: Y1 409,091; Y2 401,653; Y3 336,289; Y4 376,614. Sum PV=1,523,646 minus 1,200,000 = $323,646. Positive NPV adds shareholder value. Omitting MACRS shield or taxing salvage on full proceeds misstates NPV >$50k.",
        "Topic": "Net present value",
        "Subtopic": "After-tax salvage terminal value",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01: NPV",
        "CommonTrapReference": "Omitting depreciation tax shield.",
        "DecisionTreeReference": "NPV rule",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV"
        ],
        "Dependencies": [
          "CBQ22-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-E2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Alpha and Beta are mutually exclusive with unequal lives. Which ranking conclusion is correct at 10%?",
        "Correct": "B",
        "Choices": [
          "Compare NPVs directly — Alpha $323,646 > Beta $210,631, so Alpha wins and no annualization is needed",
          "Compute EAA: Alpha $102,101 per year (323,646 / 3.1699) vs Beta $84,698 per year (210,631 / 2.4869) — Alpha creates more equivalent annual value, so Alpha is preferred; direct NPV comparison is invalid for unequal lives",
          "Beta is preferred because its 3-year life is shorter and payback is faster",
          "EAA cannot be used — rank solely by IRR"
        ],
        "Explanation": "When lives differ, NPVs cover different horizons and are not comparable; EAA converts each NPV to annuity: EAA = NPV / PVIFA(r,n). PVIFA(10%,4)=3.1699 and PVIFA(10%,3)=2.4869, so Alpha EAA 102,101 vs Beta 84,698. Payback ignores time value; IRR reinvests at IRR and conflicts with NPV's WACC assumption.",
        "Topic": "Equivalent annual annuity",
        "Subtopic": "Mutually exclusive ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-05: EAA",
        "CommonTrapReference": "Ranking unequal-life projects by raw NPV.",
        "DecisionTreeReference": "Mutually exclusive unequal lives — EAA",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "EAA"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "For Beta, how should the $900,000 abandonment alternative at the end of Year 2 be evaluated?",
        "Correct": "A",
        "Choices": [
          "Exercise the abandonment — continuation PV at Y2 is $466,364, so abandonment at $900,000 adds $433,636 of incremental Y2 value, raising Beta's NPV by about $358,334 in present-value terms",
          "Continue Beta — abandonment destroys the project's Year 3 cash flow and should be ignored",
          "Abandonment is irrelevant because Beta's NPV is already positive",
          "Abandonment value equals the pre-tax salvage of $60,000 and adds nothing"
        ],
        "Explanation": "Real option value = max(continuation, abandonment). PV of continuation at Y2 = $466,364; abandonment proceeds after-tax = $900,000. Since abandonment exceeds continuation by $433,636 at Y2, the rational decision is to abandon if that state is reached. In present value at t=0, the incremental value versus continuing is $433,636/1.21 = $358,377, or alternatively Beta's NPV with optimal abandonment ≈ $569,008 vs $210,631 without. Ignoring the abandonment option understates Beta’s value, though Alpha's EAA still dominates in this case.",
        "Topic": "Real option — abandonment",
        "Subtopic": "Continuation vs abandonment valuation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-01 with real option: value = max(PV continuation, abandonment)",
        "CommonTrapReference": "Treating abandonment as pre-tax salvage or ignoring the option entirely.",
        "DecisionTreeReference": "Real options — abandonment",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "real option",
          "abandonment"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two cash-flow items are RELEVANT to the Alpha vs Beta decision and which sensitivity driver should the committee monitor most closely? (Select two.)",
        "Correct": [
          "Incremental operating savings ($520k Alpha vs $480k Beta) and the MACRS tax shields — both differ and are relevant",
          "Annual savings is the dominant NPV driver (±$11.9k per 1% change) — monitor labor productivity and maintenance assumptions more than salvage"
        ],
        "Choices": [
          "Incremental operating savings ($520k Alpha vs $480k Beta) and the MACRS tax shields — both differ and are relevant",
          "Annual savings is the dominant NPV driver (±$11.9k per 1% change) — monitor labor productivity and maintenance assumptions more than salvage",
          "Sunk R&D of $180,000 spent last year on Alpha design — must be included as an initial outflow",
          "The book value of existing manual equipment — all $900k must be charged to both projects"
        ],
        "Explanation": "Relevant items differ between alternatives: operating savings and tax shields change the ATCF builds. Sunk R&D and book value of existing assets are irrelevant — they are incurred regardless of which automation is chosen. Sensitivity ranking shows annual savings moves NPV most per Exhibit 3, so the committee should protect savings via service contracts and training, not over-weight salvage.",
        "Topic": "Relevant cash flows and sensitivity",
        "Subtopic": "Relevant vs sunk; sensitivity ranking",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ID-06; sensitivity analysis",
        "CommonTrapReference": "Including sunk costs or treating salvage as dominant driver.",
        "DecisionTreeReference": "Capital budgeting — relevant cash flows",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant",
          "sensitivity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each Harborview concept to its correct treatment.",
        "Correct": {
          "ATCF Year 2 $486,000": "520k*0.75 + 384k*0.25 = 390k + 96k — peak MACRS shield year",
          "Alpha NPV $323,646": "PV of 4 ATCFs plus after-tax salvage 126,840 minus 1.2M at 10%",
          "EAA ranking": "Alpha $102,101 vs Beta $84,698 — Alpha higher equivalent annual value; raw NPV not comparable",
          "Abandonment option at Y2": "900k > 466k continuation — exercise, adds $434k at Y2"
        },
        "LeftItems": [
          "ATCF Year 2 $486,000",
          "Alpha NPV $323,646",
          "EAA ranking",
          "Abandonment option at Y2"
        ],
        "RightItems": [
          "520k*0.75 + 384k*0.25 = 390k + 96k — peak MACRS shield year",
          "PV of 4 ATCFs plus after-tax salvage 126,840 minus 1.2M at 10%",
          "900k > 466k continuation — exercise, adds $434k at Y2",
          "Alpha $102,101 vs Beta $84,698 — Alpha higher equivalent annual value; raw NPV not comparable"
        ],
        "Explanation": "The matching integrates the capital-budgeting build: Year 2 shield peaks, NPV adds salvage correctly, EAA annualizes for unequal lives, and abandonment is exercised when it exceeds continuation PV.",
        "Topic": "Integrated capital budgeting",
        "Subtopic": "Matching build to result",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "ID-01; ID-05; ID-06; ID-07",
        "CommonTrapReference": "Cross-matching EAA to raw NPV ranking.",
        "DecisionTreeReference": "Capital budgeting — integrated framework",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-B5",
    "Title": "Yen Fuel Hedge at SkyWest Airlines",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute FX forward premium (B.9)",
      "Evaluate hedging"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "SkyWest Airlines owes JPY 200M for fuel in 90 days. Spot 148, forward 145, JPY rate 1.0%, USD 4.0%. Treasurer Luis Ortega must quantify hedge cost and choose forward vs money-market.",
    "Industry": "Airline",
    "CompanyType": "Service provider",
    "CompanyName": "SkyWest Airlines",
    "Stakeholder": "Treasurer Luis Ortega",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FX",
      "forward"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute forward premium",
      "Compute forward vs MMH cost",
      "Select hedge"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B5-E1",
        "CaseID": "CBQ22-B5",
        "Type": "table",
        "Title": "Exhibit 1 — JPY Exposure and Market Data",
        "Purpose": "Provides payable, spot, forward, rates.",
        "ReferencedBy": [
          "CBQ22-B5-Q1",
          "CBQ22-B5-Q2",
          "CBQ22-B5-Q3",
          "CBQ22-B5-Q6"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "JPY payable 90d",
            "JPY 200,000,000"
          ],
          [
            "Spot JPY/USD",
            "148"
          ],
          [
            "90d forward",
            "145"
          ],
          [
            "JPY 90d rate",
            "1.0%"
          ],
          [
            "USD 90d rate",
            "4.0%"
          ],
          [
            "Days",
            "90"
          ]
        ],
        "DataFormat": "JPY per USD; rates annual",
        "AccuracyCheck": "Forward USD 1,379,310 vs spot 1,351,351"
      },
      {
        "ExhibitID": "CBQ22-B5-E2",
        "CaseID": "CBQ22-B5",
        "Type": "text",
        "Title": "Exhibit 2 — Hedge Alternatives",
        "Purpose": "Describes forward vs money-market hedge mechanics.",
        "ReferencedBy": [
          "CBQ22-B5-Q4",
          "CBQ22-B5-Q5"
        ],
        "Body": "Forward locks at 145. Money-market: borrow JPY PV at 1%, convert at spot 148, invest USD? For payable, MMH cost similar to forward per parity."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the annualized yen premium (positive) for the 90-day forward, in percent rounded to two decimals.",
        "Correct": "8.11",
        "Explanation": "The 90-day forward at 145 is quoted below spot at 148, so the yen trades at a forward premium and the annualized hedge cost is measured against spot. The 90-day premium is (Spot - Forward) / Spot = (148 - 145) / 148 = 2.027% for the quarter. Annualizing over a 360-day money-market convention gives 2.027% x (360 / 90) = 8.11%. Recomputed independently: 3 / 148 = 0.020270, times 4 = 0.081081, which rounds to 8.11%. The economic reading is that SkyWest pays 8.11% annualized to lock in 145 yen per dollar on the JPY 200M fuel payable, against a JPY 90-day rate of 1.0% and a USD 90-day rate of 4.0%; the premium therefore exceeds the rate differential, so the forward is more expensive than a money-market hedge and Luis Ortega needs to compare the two before committing. The common trap is annualizing with a 365-day divisor, which would understate the premium, or dividing by the forward rate instead of spot, which reverses the sign.",
        "Topic": "FX premium",
        "Subtopic": "Annualized",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.9 FX",
        "CommonTrapReference": "Invert S/F",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fx-premium"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the USD cost via 90-day forward, rounded to nearest dollar.",
        "Correct": "1379310",
        "Explanation": "A forward contract locks the dollar cost of the yen payable at the contracted rate, so the USD amount SkyWest will pay in 90 days is the yen obligation divided by the forward rate. Exhibit 1 gives a JPY payable of 200,000,000 and a 90-day forward rate of 145 yen per dollar. USD cost via forward = 200,000,000 / 145 = $1,379,310. Recomputed independently: 200,000,000 / 145 = 1,379,310.34, which rounds to $1,379,310. For comparison, converting the same obligation at today's spot rate of 148 would produce 200,000,000 / 148 = $1,351,351, a difference of $27,959. That gap is the price of certainty: the yen is quoted at a forward premium, so locking th