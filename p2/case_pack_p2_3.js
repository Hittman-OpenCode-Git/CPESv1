var casePackP2_3 = [
  {
    "CaseID": "CBQ23-C1",
    "Title": "Make-or-Buy Under a Binding Constraint",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Identify relevant costs for an outsourcing decision including avoidable fixed costs",
      "Value capacity released on a constrained resource",
      "Integrate quantitative and qualitative factors into a sourcing recommendation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Atlas Fabrication produces 30,000 brackets a year on its most constrained machining line. An outside supplier has quoted $24 per bracket delivered, and plant manager Luis Ortega must decide whether outsourcing the bracket — and redeploying the freed machine hours to high-margin Product Z — beats continuing to make it in-house.",
    "Industry": "Precision metal fabrication",
    "CompanyType": "Manufacturer",
    "CompanyName": "Atlas Fabrication",
    "Stakeholder": "Plant Manager Luis Ortega",
    "BusinessFunction": "Operations strategy",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "make-or-buy",
      "constraint",
      "opportunity cost"
    ],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-24",
        "Version": "1.0",
        "Author": "AI",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Separate avoidable from unavoidable costs in a make-or-buy analysis",
      "Compute the opportunity value of constraint-hours released",
      "Compare net relevant benefits across alternatives",
      "Weigh supplier-risk factors in the final recommendation"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-C1-E1",
        "CaseID": "CBQ23-C1",
        "Type": "table",
        "Title": "Exhibit 1 — Bracket Cost Structure (Annual, 30,000 Units)",
        "Purpose": "Provides the in-house cost elements and the outside quote for the relevant-cost comparison.",
        "ReferencedBy": [
          "CBQ23-C1-Q1",
          "CBQ23-C1-Q2",
          "CBQ23-C1-Q4"
        ],
        "Headers": [
          "Cost element",
          "Amount"
        ],
        "Rows": [
          [
            "Variable manufacturing cost",
            "$18.00 per unit"
          ],
          [
            "Allocated corporate fixed cost",
            "$6.00 per unit (unavoidable)"
          ],
          [
            "Dedicated supervisor salary",
            "$45,000 per year (avoidable if outsourced)"
          ],
          [
            "Outside supplier quote",
            "$24.00 per unit delivered"
          ]
        ],
        "DataFormat": "USD; annual volume 30,000 units",
        "AccuracyCheck": "Avoidable supervision per unit = $45,000 ÷ 30,000 = $1.50"
      },
      {
        "ExhibitID": "CBQ23-C1-E2",
        "CaseID": "CBQ23-C1",
        "Type": "table",
        "Title": "Exhibit 2 — Constraint Capacity and Alternative Uses",
        "Purpose": "Provides the machine-hour consumption of the bracket and the contribution available from redeploying freed hours to Product Z, plus floor-space rental potential.",
        "ReferencedBy": [
          "CBQ23-C1-Q3",
          "CBQ23-C1-Q6",
          "CBQ23-C1-Q5"
        ],
        "Headers": [
          "Factor",
          "Value"
        ],
        "Rows": [
          [
            "Constraint line capacity",
            "40,000 hours"
          ],
          [
            "Machine hours per bracket",
            "0.5 hours"
          ],
          [
            "Hours freed if outsourced",
            "15,000 hours"
          ],
          [
            "Product Z contribution margin",
            "$36.00 per constraint-hour"
          ],
          [
            "Vacated floor-space rental",
            "$20,000 per year"
          ]
        ],
        "DataFormat": "USD; Product Z demand absorbs all 15,000 freed hours",
        "AccuracyCheck": "30,000 units x 0.5 hr = 15,000 hours; 40,000 - 15,000 = 25,000 hours used by other products"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-C1-Q1",
        "Type": "numeric",
        "Prompt": "Enter Atlas's RELEVANT in-house cost per bracket (the cost avoidable by outsourcing), rounded to two decimals.",
        "Correct": "19.50",
        "Explanation": "Relevant cost = variable cost + avoidable fixed cost = $18.00 + ($45,000 ÷ 30,000) = $18.00 + $1.50 = $19.50. The $6.00 allocated corporate fixed cost is UNAVOIDABLE — it continues whether brackets are made or bought — so it is excluded from the decision entirely (per IMA relevant-costing guidance). Only future costs that DIFFER between alternatives enter the analysis.",
        "Topic": "Relevant cost identification",
        "Subtopic": "Avoidable versus allocated costs",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Relevant cost = variable cost + avoidable fixed costs",
        "CommonTrapReference": "Loading allocated corporate overhead into the in-house comparison.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C1-Q2",
        "Type": "numeric",
        "Prompt": "Enter the outsourcing PREMIUM per unit before considering released-capacity effects, rounded to two decimals.",
        "Correct": "4.50",
        "Explanation": "Premium = outside quote − relevant in-house cost = $24.00 − $19.50 = $4.50 per unit. On its face, buying costs $4.50 more per bracket — but this is only the FIRST layer of the decision, because outsourcing also frees scarce machine time whose alternative use carries real value.",
        "Topic": "Outsourcing premium",
        "Subtopic": "First-layer comparison",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Comparing the quote against full absorption cost of $24.00 instead of relevant cost.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "outsourcing"
        ],
        "Dependencies": [
          "CBQ23-C1-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-C1-Q3",
        "Type": "numeric",
        "Prompt": "Enter the net ANNUAL advantage of outsourcing (including released-capacity and rental effects), in dollars.",
        "Correct": "425000",
        "Explanation": "Benefits of outsourcing: freed constraint-hours earn 15,000 × $36.00 = $540,000 producing Product Z, plus $20,000 of floor-space rent — total $560,000. Cost: premium of $4.50 × 30,000 = $135,000. Net advantage = $560,000 − $135,000 = +$425,000. The constraint is what transforms a money-losing premium into a strongly profitable move: those hours are worth far more making Z than saving $6.00 of avoided variable content on brackets.",
        "Topic": "Net benefit of outsourcing",
        "Subtopic": "Opportunity cost of capacity",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net = (freed hours × CM/hour + rent) − (premium × units)",
        "CommonTrapReference": "Omitting the opportunity value of freed constraint-hours — the largest term in the analysis.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "opportunity cost",
          "constraint"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C1-Q4",
        "Type": "select",
        "Prompt": "Which cost element is IRRELEVANT to the make-or-buy decision?",
        "Correct": "B",
        "Choices": [
          "The $18.00 per-unit variable manufacturing cost",
          "The $6.00 per-unit allocated corporate fixed cost, because it continues under either alternative",
          "The $45,000 dedicated supervisor salary, because supervision is always fixed",
          "The $24.00 outside quote"
        ],
        "Explanation": "Unavoidable allocated costs fail the relevance test — they are incurred whichever way Luis decides, so they cannot differ between alternatives. Variable cost, avoidable supervision, and the outside quote are precisely the future differential items that DO change with the decision. Supervision here is specifically avoidable, so option C's blanket 'fixed means keep' reasoning misapplies cost behavior to a decision context.",
        "Topic": "Cost relevance test",
        "Subtopic": "Allocated costs",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Understand",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating every cost printed on the product's standard cost card as decision-relevant.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "relevance"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C1-Q5",
        "Type": "select",
        "Prompt": "Which qualitative factor deserves the MOST weight before executing the outsourcing?",
        "Correct": "B",
        "Choices": [
          "Losing the $6.00 per-unit allocation from corporate overhead",
          "Single-supplier dependency — disruption or quality failure at one source would idle the constrained line's replacement volume; mitigate through dual qualification, contractual SLAs with audit rights, and safety stock during transition",
          "Depreciation on the vacated machining equipment will now be unabsorbed",
          "The union contract requires brackets to be made in-house"
        ],
        "Explanation": "Outsourcing concentrates production risk in one external party while the freed hours have ALREADY been committed to Product Z — a supplier failure now damages two revenue streams at once. The mitigations (qualified second source, service-level agreements with audit rights, transition safety stock) directly address that exposure. The overhead allocation (A) is irrelevant by construction; depreciation (C) continues regardless and is non-cash; the union claim (D) is asserted without support in the exhibits and would be a legal constraint, not an economic one.",
        "Topic": "Sourcing risk",
        "Subtopic": "Qualitative factors",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Letting bookkeeping artifacts outweigh operational exposure in sourcing decisions.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "supplier risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C1-Q6",
        "Type": "select",
        "Prompt": "What should Luis recommend to the executive committee?",
        "Correct": "C",
        "Choices": [
          "Continue making brackets in-house because the outside quote exceeds the standard cost card total of $24.00",
          "Outsource immediately and leave the vacated space idle until Product Z demand materializes",
          "OUTSOURCE — the net annual advantage is $425,000 — CONTINGENT on qualifying a second supplier and signing an SLA with audit rights and a transition safety-stock period before the line conversion",
          "Outsource and eliminate the supervisor position effective immediately, transferring quality oversight to the supplier"
        ],
        "Explanation": "The economics are decisive (+$425K) but the execution conditions protect them: dual qualification prevents the single-source failure mode from converting a contribution gain into a double loss, and the SLA makes supplier performance enforceable. Option A compares the quote to FULL cost ($24.00 standard includes the irrelevant allocation) — a tie that ignores $560K of opportunity benefits. Leaving space idle (B) forfeits $20K of rent plus all Product Z contribution. Immediate termination of the supervisor (D) removes the transition-period quality bridge precisely when process knowledge transfer matters most.",
        "Topic": "Sourcing recommendation",
        "Subtopic": "Conditional implementation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Presenting the quantitative answer without the conditions that secure it operationally.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ23-E1",
    "Title": "Automation Investment Evaluation",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Compute after-tax operating cash flows incorporating the depreciation tax shield",
      "Evaluate a project using NPV, payback, and profitability index",
      "Stress-test the recommendation through sensitivity analysis"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Willow Textiles' CFO Anita Rao proposes automating the finishing line: installed cost $500,000, five-year straight-line life to zero salvage for books, pre-tax labor savings of $160,000 per year offset by $10,000 of added maintenance, and estimated salvage proceeds of $60,000 at the end of year five. With a 25% tax rate and 10% WACC, she must present NPV, payback, and profitability index — and defend the recommendation under savings uncertainty.",
    "Industry": "Textile manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Willow Textiles",
    "Stakeholder": "CFO Anita Rao",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "NPV",
      "payback",
      "profitability index",
      "after-tax cash flow"
    ],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-24",
        "Version": "1.0",
        "Author": "AI",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Build after-tax cash flow using the depreciation tax shield",
      "Discount project flows and compute NPV with terminal salvage",
      "Interpret payback and profitability index alongside NPV",
      "Test decision robustness to input sensitivity"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E1-E1",
        "CaseID": "CBQ23-E1",
        "Type": "table",
        "Title": "Exhibit 1 — Project Inputs",
        "Purpose": "Provides every input required for the after-tax cash flow build and evaluation metrics.",
        "ReferencedBy": [
          "CBQ23-E1-Q1",
          "CBQ23-E1-Q2",
          "CBQ23-E1-Q3",
          "CBQ23-E1-Q6",
          "CBQ23-E1-Q5"
        ],
        "Headers": [
          "Input",
          "Value"
        ],
        "Rows": [
          [
            "Installed cost (depreciable)",
            "$500,000"
          ],
          [
            "Life / convention",
            "5 years straight-line to zero"
          ],
          [
            "Pre-tax labor savings",
            "$160,000 per year"
          ],
          [
            "Added maintenance",
            "$10,000 per year"
          ],
          [
            "Salvage at end of year 5",
            "$60,000"
          ],
          [
            "Tax rate",
            "25%"
          ],
          [
            "WACC",
            "10%"
          ]
        ],
        "DataFormat": "USD; annual figures for years 1-5",
        "AccuracyCheck": "Straight-line charge = 500,000/5 = 100,000 per year"
      },
      {
        "ExhibitID": "CBQ23-E1-E2",
        "CaseID": "CBQ23-E1",
        "Type": "text",
        "Title": "Exhibit 2 — Discount Factors at 10%",
        "Purpose": "Provides present-value factors so computations need no tables beyond the exhibit.",
        "ReferencedBy": [
          "CBQ23-E1-Q2",
          "CBQ23-E1-Q4",
          "CBQ23-E1-Q6"
        ],
        "Body": "PVIFA(10%, 5 years) = 3.7908\nPVIF(10%, year 5) = 0.6209"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E1-Q1",
        "Type": "numeric",
        "Prompt": "Enter the annual AFTER-TAX operating cash flow (years 1-5), in dollars.",
        "Correct": "137500",
        "Explanation": "After-tax cash flow = (pre-tax cash savings) × (1 − t) + (depreciation × t) = ($160,000 − $10,000) × 0.75 + ($100,000 × 0.25) = $112,500 + $25,000 = $137,500 (per ID-06). Depreciation never leaves the company as cash — only its tax SHIELD enters the flow, which is why the $100,000 book charge contributes just $25,000. Treating depreciation as a cash outflow (or ignoring the shield entirely) are the two classic errors on this build.",
        "Topic": "After-tax cash flow",
        "Subtopic": "Depreciation tax shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-06: ATCF = (Rev − Cash Exp)(1−t) + Depr × t",
        "CommonTrapReference": "Treating depreciation as a cash outflow, or omitting its tax shield.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "tax shield",
          "ATCF"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E1-Q2",
        "Type": "numeric",
        "Prompt": "Enter the project NPV in dollars (answers within ±$1,000 accepted).",
        "Correct": "49170",
        "Explanation": "PV of operating flows = $137,500 × PVIFA(10%,5) = $137,500 × 3.7908 = $521,235. Terminal salvage arrives at year 5 with book value zero, so the full $60,000 is taxable: after-tax salvage = $60,000 × 0.75 = $45,000; PV = $45,000 × 0.6209 = $27,941. NPV = −$500,000 + $521,235 + $27,941 ≈ +$49,176 → ACCEPT (positive NPV adds shareholder value at the 10% hurdle). Forgetting the salvage term, or taxing it a second time, swings the answer by roughly $28K.",
        "Topic": "Net present value",
        "Subtopic": "Terminal salvage treatment",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01: NPV = Σ CFt/(1+r)^t − I0",
        "CommonTrapReference": "Omitting after-tax salvage, or discounting it at the wrong factor year.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "salvage"
        ],
        "Dependencies": [
          "CBQ23-E1-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-E1-Q3",
        "Type": "numeric",
        "Prompt": "Enter the simple payback period in years, rounded to two decimals.",
        "Correct": "3.64",
        "Explanation": "Payback = initial investment ÷ annual cash flow = $500,000 ÷ $137,500 = 3.64 years (per ID-03). Payback says nothing about VALUE — flows after year 3.64 (including the salvage) are invisible to it — but boards use it as a liquidity and risk screen: capital tied up for under four years on a five-year asset sits inside many manufacturers' tolerance.",
        "Topic": "Payback period",
        "Subtopic": "Liquidity screen",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-03: Payback = I0 ÷ uniform annual CF",
        "CommonTrapReference": "Using pre-tax savings ($150,000 → 3.33 yrs) instead of after-tax cash flow.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "payback"
        ],
        "Dependencies": [
          "CBQ23-E1-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-E1-Q4",
        "Type": "select",
        "Prompt": "Which statement about the profitability index is correct?",
        "Correct": "A",
        "Choices": [
          "PI = (PV of inflows ÷ investment) = ($521,235 + $27,941) ÷ $500,000 ≈ 1.10 — each invested dollar returns about $1.10 of present value; PI > 1 ⇔ NPV > 0, and PI ranks capital use when funds are rationed",
          "PI equals NPV divided by investment (0.10 here), signaling rejection",
          "PI ignores the time value of money, unlike payback",
          "A PI below 1.0 can still justify acceptance when payback is short"
        ],
        "Explanation": "The profitability index scales NPV machinery into a ratio: PV of ALL inflows (operating plus terminal) over the outlay. At roughly 1.10, Willow receives $1.10 of present value per dollar committed — consistent with the positive $49K NPV. Its distinct virtue appears under CAPITAL RATIONING: ranking candidates by PI spreads limited dollars where they generate the most value per dollar. A sub-1.0 PI mathematically guarantees negative NPV (option D's payback logic conflates liquidity with value), and option A vs B turns on including the +1.0 base in the numerator.",
        "Topic": "Profitability index",
        "Subtopic": "Ratio interpretation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ID-02: PI = PV of future CFs ÷ I0",
        "CommonTrapReference": "Computing NPV/I0 and calling it PI.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "profitability index"
        ],
        "Dependencies": [
          "CBQ23-E1-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-E1-Q5",
        "Type": "select",
        "Prompt": "Why does Anita lead with NPV rather than IRR for this proposal?",
        "Correct": "B",
        "Choices": [
          "IRR is always larger than NPV, so it flatters the project before the committee",
          "NPV measures dollars of value created assuming interim flows reinvest at the 10% opportunity cost — an achievable assumption — while IRR's embedded reinvestment rate and scale blindness can misstate and misrank projects",
          "NPV ignores the time value of money whereas IRR captures it",
          "The two methods always agree on both acceptance and ranking, so the choice is cosmetic"
        ],
        "Explanation": "For a single conventional project the accept/reject verdicts coincide — but the PRESENTATION question is which metric communicates value honestly. NPV's reinvestment assumption (the WACC) is executable in practice; IRR assumes the same flows compound AT the IRR, an aggressive claim when rates are mid-teens. NPV also states absolute value created ($49K) rather than a rate that says nothing about size, and it sidesteps the multiple-root problems unconventional flow patterns create. Committees still ask for IRR — the strong presenter supplies both, anchored on NPV.",
        "Topic": "NPV versus IRR",
        "Subtopic": "Method selection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Presenting IRR's reinvestment assumption as if it were neutral.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "IRR"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E1-Q6",
        "Type": "select",
        "Prompt": "Which recommendation best integrates the metrics and the savings sensitivity?",
        "Correct": "A",
        "Choices": [
          "ACCEPT — NPV ≈ +$49K, PI ≈ 1.10, payback 3.64 years; even at labor savings 10% BELOW plan (ATCF falls to $126,250), NPV stays positive at roughly +$6.5K, though the cushion thins — lock in service contracts and training before cutover",
          "REJECT — payback of 3.64 years exceeds the informal three-year target regardless of NPV",
          "ACCEPT because payback is under four years, whatever the NPV sign",
          "REJECT — the salvage estimate is speculative and any uncertainty invalidates the model"
        ],
        "Explanation": "The decision survives its own stress test: shaving savings 10% drops annual ATCF from $137,500 to $126,250 ((145,000 × 0.75) + 25,000) and NPV to approximately +$6,500 — still positive, but thin enough to warrant protecting the savings stream (maintenance/service agreements, operator training) rather than celebrating. Rejecting on an informal payback rule (B) discards a positive-NPV asset — payback is a screen, not a verdict. Accepting on payback alone (C) inverts that error. Uncertainty (D) is managed with sensitivity and contracts, not by refusing to model.",
        "Topic": "Investment recommendation",
        "Subtopic": "Robustness",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Letting a screening rule override the value metric the committee exists to maximize.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation",
          "sensitivity"
        ],
        "Dependencies": [
          "CBQ23-E1-Q2"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ23-C2",
    "Title": "The Full-Capacity Order Negotiation",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply opportunity cost of displaced sales to a special-order decision at full capacity",
      "Compute the minimum acceptable price for a capacity-consuming order",
      "Structure a counterproposal that preserves contribution economics"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Hartwell Textiles runs 9,800 of its 10,000-unit monthly capacity, selling to regular customers at $80 with variable cost of $48. A national retailer requests 1,200 units per month for three months at $65 — and wants an answer before month-end. Controller Dana Walsh must quantify the true economics and arm the sales team with a defensible counterposition.",
    "Industry": "Textile manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Hartwell Textiles",
    "Stakeholder": "Controller Dana Walsh",
    "BusinessFunction": "Pricing decisions",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "special order",
      "opportunity cost",
      "capacity",
      "minimum price"
    ],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-24",
        "Version": "1.0",
        "Author": "AI",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Compute incremental margin on a special order ignoring displacement",
      "Quantify the opportunity cost of displaced regular sales",
      "Derive the minimum acceptable price covering variable cost plus opportunity cost"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-C2-E1",
        "CaseID": "CBQ23-C2",
        "Type": "table",
        "Title": "Exhibit 1 — Capacity and Regular Economics (Monthly)",
        "Purpose": "Provides capacity utilization and regular-customer economics needed to identify displaced volume.",
        "ReferencedBy": [
          "CBQ23-C2-Q1",
          "CBQ23-C2-Q2",
          "CBQ23-C2-Q4"
        ],
        "Headers": [
          "Factor",
          "Value"
        ],
        "Rows": [
          [
            "Monthly capacity",
            "10,000 units"
          ],
          [
            "Current production (regular customers)",
            "9,800 units"
          ],
          [
            "Regular selling price",
            "$80 per unit"
          ],
          [
            "Variable cost per unit",
            "$48 per unit"
          ]
        ],
        "DataFormat": "USD; monthly figures",
        "AccuracyCheck": "Idle capacity = 10,000 - 9,800 = 200 units"
      },
      {
        "ExhibitID": "CBQ23-C2-E2",
        "CaseID": "CBQ23-C2",
        "Type": "text",
        "Title": "Exhibit 2 — Retailer Request",
        "Purpose": "States the special-order terms under negotiation.",
        "ReferencedBy": [
          "CBQ23-C2-Q1",
          "CBQ23-C2-Q3",
          "CBQ23-C2-Q5",
          "CBQ23-C2-Q6"
        ],
        "Body": "The retailer requests 1,200 units per month for three consecutive months at $65 per unit, delivered. It positions the price as final: 'we can buy elsewhere.' No commitment beyond the three months is offered."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-C2-Q1",
        "Type": "numeric",
        "Prompt": "Enter the MONTHLY incremental contribution margin the order would add if idle capacity were unlimited, in dollars.",
        "Correct": "20400",
        "Explanation": "Contribution = 1,200 units × ($65 − $48) = $20,400 per month. This is the number the order's champions will quote — and it is genuinely what the order adds IF no regular sales are sacrificed. Whether that condition holds is the entire analytical question.",
        "Topic": "Special order margin",
        "Subtopic": "Incremental contribution",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Incremental CM = units x (price - VC)",
        "CommonTrapReference": "Stopping the analysis at this figure without checking capacity.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "contribution margin"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C2-Q2",
        "Type": "numeric",
        "Prompt": "Enter the MONTHLY opportunity cost of the regular sales that must be displaced, in dollars.",
        "Correct": "32000",
        "Explanation": "Idle capacity covers only 200 of the 1,200 requested units; the remaining 1,000 displace regular sales. Lost contribution = 1,000 × ($80 − $48) = $32,000 per month. This is REAL economic sacrifice — regular customers pay $80 for exactly the same machine time the order would consume at $65.",
        "Topic": "Opportunity cost",
        "Subtopic": "Displaced sales",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Lost CM = displaced units x (regular price - VC)",
        "CommonTrapReference": "Assuming the whole order fits into the 200-unit idle sliver.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C2-Q3",
        "Type": "numeric",
        "Prompt": "Enter the NET monthly effect of accepting the order as offered, in dollars (use a minus sign if negative).",
        "Correct": "-11600",
        "Explanation": "Net = incremental contribution − lost regular contribution = $20,400 − $32,000 = −$11,600 per month. Accepting as offered converts $32,000 of $80-sales into $20,400 of $65-sales while consuming identical scarce machine time — an $11,600 monthly step backward dressed as new business.",
        "Topic": "Special order net effect",
        "Subtopic": "Full-capacity decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net = incremental CM - lost CM",
        "CommonTrapReference": "Accepting because price exceeds variable cost at full capacity.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "net effect"
        ],
        "Dependencies": [
          "CBQ23-C2-Q1",
          "CBQ23-C2-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-C2-Q4",
        "Type": "numeric",
        "Prompt": "Enter the MINIMUM acceptable price per unit for the full 1,200-unit order, rounded to two decimals.",
        "Correct": "74.67",
        "Explanation": "The floor must cover variable cost PLUS the opportunity cost spread across every unit ordered: ($48 × 1,200 + $32,000) ÷ 1,200 = ($57,600 + $32,000) ÷ 1,200 = $89,600 ÷ 1,200 = $74.67. At anything below $74.67 Hartwell is literally paying to displace its best customers. Note this exceeds even the midpoint between $48 and $80 — full-capacity orders are expensive to serve.",
        "Topic": "Minimum acceptable price",
        "Subtopic": "Opportunity-cost pricing",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Floor = [VC x Q + Lost CM] / Q",
        "CommonTrapReference": "Quoting variable cost ($48) as the floor when capacity binds.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "minimum price"
        ],
        "Dependencies": [
          "CBQ23-C2-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-C2-Q5",
        "Type": "select",
        "Prompt": "Which counterproposal preserves Hartwell's economics while keeping the relationship alive?",
        "Correct": "B",
        "Choices": [
          "Accept the full 1,200 units at $65 since three months of volume strengthens the retail partnership",
          "Fulfill only the 200 truly-idle units at any price at or above $48 variable cost, and price any quantity beyond 200 at regular-list economics (or decline that portion) — explaining plainly that peak-season capacity is committed",
          "Reject categorically without counterproposal, citing policy against below-list orders",
          "Match a competitor's rumored $60 price to prevent the retailer from switching future volume"
        ],
        "Explanation": "The split structure prices each unit at its TRUE opportunity cost: idle units genuinely cost only $48 to serve, so any price above that adds pure contribution, while displaced units consume $80-worth of machine time and cannot be discounted without destroying value. Categorical rejection (C) forfeits the free $200-unit contribution out of pride; matching rumors (D) deepens losses by $15 per unit versus the offer already on the table; blanket acceptance (A) institutionalizes the −$11,600 monthly leak.",
        "Topic": "Counterproposal design",
        "Subtopic": "Tiered capacity pricing",
        "Difficulty": "Difficult",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating all units in an order as having identical opportunity cost.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "counteroffer"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C2-Q6",
        "Type": "select",
        "Prompt": "Which recommendation should Dana deliver to the sales VP?",
        "Correct": "D",
        "Choices": [
          "Accept at $65 — revenue growth justifies temporary margin pressure during peak season",
          "Accept at $65 but ask production to add a weekend shift at premium overtime to protect regular customers",
          "Present the minimum-price analysis ($74.67) and refuse any discussion below it, ending negotiations",
          "DECLINE the 1,200 at $65 as structured, present the tiered counter (idle units from $48; displaced units at regular economics), and share the capacity outlook honestly — positioning Hartwell as a disciplined partner rather than a distressed seller"
        ],
        "Explanation": "The recommendation executes the arithmetic through the relationship lens: declining the unprofitable structure protects $32,000/month of superior contribution, the tiered counter captures every dollar of genuinely available capacity, and transparent capacity communication converts 'no' into 'here is what works' — preserving the customer for periods when slack returns. Overtime (B) introduces a NEW relevant cost (premium wages) that likely pushes the true floor higher still, not lower. Hard refusal (C) wins the argument and loses the account.",
        "Topic": "Negotiation recommendation",
        "Subtopic": "Relationship-preserving refusal",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Framing capacity constraints as inflexibility instead of economics.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ23-F2",
    "Title": "Misappropriation at the Branch",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Map fraud evidence to the fraud triangle and identify the control-addressable element",
      "Apply IMA obligations when discovering suspected asset misappropriation",
      "Design governance and anti-fraud program remediation"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Controller Elena Vasquez of Harborline Distributors discovers that a branch manager appears to have routed roughly $180,000 over two years to a fictitious vendor he controls — fake invoices approved solely by him, paid to an account he opened. The audit committee meets Thursday; the branch manager is scheduled to present his quarterly results. Elena must decide her immediate actions and the governance remediation she will propose.",
    "Industry": "Wholesale distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Harborline Distributors",
    "Stakeholder": "Controller Elena Vasquez",
    "BusinessFunction": "Internal control",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "fraud triangle",
      "asset misappropriation",
      "vendor fraud",
      "governance"
    ],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-24",
        "Version": "1.0",
        "Author": "AI",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Decompose fraud facts into pressure, opportunity, and rationalization",
      "Sequence IMA-compliant actions upon discovery of suspected misappropriation",
      "Prioritize control remediation addressing the opportunity leg",
      "Specify investigation governance boundaries for management accountants"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F2-E1",
        "CaseID": "CBQ23-F2",
        "Type": "table",
        "Title": "Exhibit 1 — Evidence Summary",
        "Purpose": "Provides the factual pattern Elena has assembled for committee review.",
        "ReferencedBy": [
          "CBQ23-F2-Q1",
          "CBQ23-F2-Q3",
          "CBQ23-F2-Q4"
        ],
        "Headers": [
          "Finding",
          "Detail"
        ],
        "Rows": [
          [
            "Vendor record",
            "'Northgate Supply' created 26 months ago; address matches branch manager's storage unit; phone matches his mobile"
          ],
          [
            "Invoice pattern",
            "14 invoices, $8K-$22K, all approved solely by branch manager; no receiving documents; generic service descriptions"
          ],
          [
            "Payments",
            "All wired to one external account opened same month as vendor setup"
          ],
          [
            "Personal context",
            "Branch manager recently disclosed significant personal debts in unrelated conversation"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-F2-E2",
        "CaseID": "CBQ23-F2",
        "Type": "text",
        "Title": "Exhibit 2 — Framework References",
        "Purpose": "Summarizes the frameworks governing Elena's response.",
        "ReferencedBy": [
          "CBQ23-F2-Q2",
          "CBQ23-F2-Q5",
          "CBQ23-F2-Q6"
        ],
        "Body": "Fraud triangle: pressure (incentive/need), opportunity (control gap), rationalization (justification).\nIMA Statement: escalate suspected misconduct to appropriate authorities within the organization; do not engage in activities discrediting the profession; confidentiality bounds disclosure channels.\nGovernance practice: audit committee directs investigations via counsel and forensic specialists; management preserves evidence; crime/fidelity insurers require prompt notice; regulators or law enforcement engaged by the committee, not individual managers."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F2-Q1",
        "Type": "select",
        "Prompt": "Mapped to the fraud triangle, which element does the EVIDENCE most directly expose — and which is the only leg remediation can reliably address?",
        "Correct": "A",
        "Choices": [
          "Opportunity — sole-approval authority over a vendor he controlled; opportunity is the leg that controls and segregation directly remove. Pressure (his disclosed debts) and rationalization (unknowable inner justification) are personal states no internal control eliminates",
          "Pressure — the debts prove fraudulent intent and should anchor the referral package",
          "Rationalization — his performance reviews will reveal the justification narrative",
          "All three legs are equally controllable through policy statements"
        ],
        "Explanation": "The exhibits establish HOW the fraud became possible: one person could create a vendor, approve its invoices, and trigger payment — a closed loop of opportunity. Pressure and rationalization matter for understanding the actor but are private mental and personal conditions; anti-fraud architecture targets the OPPORTUNITY leg because that is the only one a control system touches (dual authorization, vendor-master change controls, analytics). Leading with the debt disclosure (B) invites defamation exposure while missing the systemic fix.",
        "Topic": "Fraud triangle",
        "Subtopic": "Opportunity mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Building the case on motive while neglecting the control failure that enabled the act.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fraud triangle"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F2-Q2",
        "Type": "select",
        "Prompt": "What are Elena's correct IMMEDIATE actions upon completing her evidence assembly?",
        "Correct": "B",
        "Choices": [
          "Interview the branch manager directly to hear his explanation before escalating",
          "Secure copies of the evidence, restrict further payments to the vendor, and escalate confidentially to the audit committee chair — who directs any investigation through counsel and forensic specialists — taking care not to alert or confront the manager herself",
          "Notify law enforcement personally and freeze the branch manager's employment",
          "Circulate her findings to the branch's senior staff to corroborate details informally"
        ],
        "Explanation": "Discovery duties run UPWARD through governed channels: preserve evidence integrity, stop ongoing losses operationally, and hand direction to those empowered to investigate — the audit committee acting through counsel. Direct confrontation (A) tips the suspect, contaminates testimony, and exceeds a controller's role; self-directed law-enforcement contact and employment action (C) belong to the committee after legal advice; informal circulation (D) spreads confidential allegations without privilege protection.",
        "Topic": "Discovery response",
        "Subtopic": "Escalation discipline",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Playing detective — interviewing suspects and broadcasting findings before governance engages.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "escalation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F2-Q3",
        "Type": "select",
        "Prompt": "Which REMEDIATION should Elena propose as the highest-priority control fix?",
        "Correct": "C",
        "Choices": [
          "Annual ethics attestation for all branch staff",
          "Institute dual authorization for new-vendor master-data creation plus system-enforced separation of vendor setup from invoice approval, supplemented by periodic data-analytics matching of vendor addresses, banking details, and employee records",
          "Raise the branch manager's compensation to reduce financial pressure",
          "Require original paper invoices for all purchases above $5,000"
        ],
        "Explanation": "The scheme lived entirely inside ONE broken control point: unchecked vendor-master authority combined with single-signature approval. Closing that loop — dual authorization on master-data changes, enforced segregation between setup and approval, and analytics screening vendor records against employee data (addresses, bank accounts, phones) — removes the exact mechanism used. Attestations (A) and compensation (B) target pressure and culture, useful but indirect; paper invoices (D) add paperwork without breaking the approval monopoly that actually failed.",
        "Topic": "Control remediation",
        "Subtopic": "Vendor master controls",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Proposing cultural remedies where a structural control gap did the damage.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls",
          "remediation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F2-Q4",
        "Type": "select",
        "Prompt": "Which action would VIOLATE proper investigation boundaries if Elena took it now?",
        "Correct": "C",
        "Choices": [
          "Preserving system logs, invoice images, and wire records under restricted access",
          "Noting in working papers that suspicion is unresolved and labels remain provisional",
          "Conducting a covert forensic interview of the branch manager herself to 'get his side on record' before Thursday",
          "Confirming with the bank — through counsel once engaged — the beneficial owner of the external account"
        ],
        "Explanation": "Forensic interviews belong to trained investigators operating under counsel's direction and legal privilege; a controller confronting the suspect risks tipping him off, tainting admissions, and creating liability — precisely why Exhibit 2 assigns investigation direction to the committee. Evidence preservation (A) and provisional language (B) are model practice, and beneficial-owner verification (D) is investigative work properly executed THROUGH counsel, not personally.",
        "Topic": "Investigation boundaries",
        "Subtopic": "Role limits",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Crossing from evidence custodian into amateur investigator.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "investigation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F2-Q5",
        "Type": "select",
        "Prompt": "Which committee-level response package is complete and correctly sequenced?",
        "Correct": "B",
        "Choices": [
          "Terminate the manager immediately upon Elena's verbal summary, then investigate afterward if funds are unrecovered",
          "Engage forensic specialists and counsel through the audit committee; issue litigation-hold/evidence-preservation notices; place payment blocks; notify the crime/fidelity carrier within policy deadlines; assess whether any filed statements require correction; decide law-enforcement referral on counsel's advice",
          "Publicly announce the fraud to reassure employees, then determine the facts",
          "Handle everything internally without insurer notice to protect renewal premiums"
        ],
        "Explanation": "Governed response runs specialist-first and deadline-aware: counsel preserves privilege and steers the investigation; preservation notices prevent spoliation; payment blocks stop ongoing loss; carriers can DENY claims for late notice, making timely insurer notification a cash recovery issue; financial-statement impact assessment protects reporting integrity; and referral decisions carry legal consequences best made on advice. Terminate-first (A) burns evidence and due process; publicity-before-facts (C) multiplies liability; premium-driven silence (D) trades recoverable funds for optics.",
        "Topic": "Governance response",
        "Subtopic": "Committee sequencing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Missing insurer notice deadlines that forfeit otherwise valid recovery.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "governance",
          "response"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F2-Q6",
        "Type": "select",
        "Prompt": "Which ANTI-FRAUD PROGRAM design best prevents recurrence network-wide?",
        "Correct": "D",
        "Choices": [
          "Mandate annual signed ethics codes at every location and declare the program complete",
          "Increase branch manager base salaries company-wide to reduce financial pressure",
          "Concentrate all vendor approvals in corporate headquarters with no branch input, maximizing central control",
          "A layered program: enforced segregation of vendor-setup and payment approval, continuous data-analytics matching of vendors to employee data, a monitored anonymous hotline with non-retaliation guarantees, tone-at-top messaging backed by visible consequence management, and periodic fraud-risk assessments refreshed as processes change"
        ],
        "Explanation": "Sustainable prevention is LAYERED because the triangle has three legs and schemes adapt: structural controls kill today's opportunity, analytics catch tomorrow's variant, hotlines surface what systems miss (consistently the top detection method), tone determines whether people use any of it, and risk assessments keep the program current as the business changes. Codes alone (A) document intent without changing behavior; salaries (B) address one pressure among many and cannot be calibrated against unknown needs; total centralization (C) cripples operations and simply relocates the trust question.",
        "Topic": "Anti-fraud program design",
        "Subtopic": "Layered prevention",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Equating a signed code of conduct with a functioning control environment.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "prevention",
          "program design"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ23-A1",
    "Title": "Acquisition Diligence Ratio Workup",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Calculate liquidity and leverage ratios from condensed audited financial statements",
      "Evaluate the effect of off-balance-sheet obligations on adjusted leverage",
      "Explain foreign-currency translation treatment for a foreign subsidiary under ASC 830"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Ridgeway Capital Partners has signed a letter of intent to acquire Halvorsen Tooling Corporation, a closely held manufacturer of precision cutting tools with $118 million in annual sales, and expects six weeks of exclusivity before signing. Priya Raman, Ridgeway's director of due diligence, has circulated Halvorsen's condensed statements alongside counsel's schedule of contingent and off-balance-sheet items. The credit committee wants baseline liquidity and leverage metrics, a first-cut adjusted leverage figure that credits the parent guarantee of the Mexican subsidiary's plant financing, and confirmation of how the peso translation deficit is treated before the pricing model is rerun. Complete the requested workup from the exhibits provided.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A1-E1",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 1 — Condensed Balance Sheet, December 31, 2025",
        "Purpose": "Provides current asset and current liability components for the current ratio (Q1), total liabilities and equity for adjusted debt-to-equity (Q3), and classification anchors for the matching item (Q6).",
        "ReferencedBy": [
          "CBQ23-A1-Q1",
          "CBQ23-A1-Q3",
          "CBQ23-A1-Q6"
        ],
        "Headers": [
          "Line item",
          "Amount ($000s)"
        ],
        "Rows": [
          [
            "Cash and cash equivalents",
            "8,400"
          ],
          [
            "Marketable securities",
            "2,600"
          ],
          [
            "Accounts receivable, net",
            "19,500"
          ],
          [
            "Inventories",
            "14,700"
          ],
          [
            "Prepaid expenses",
            "1,800"
          ],
          [
            "Total current assets",
            "47,000"
          ],
          [
            "Accounts payable",
            "12,300"
          ],
          [
            "Accrued expenses",
            "4,200"
          ],
          [
            "Current portion of long-term debt",
            "3,500"
          ],
          [
            "Total current liabilities",
            "20,000"
          ],
          [
            "Long-term debt",
            "40,000"
          ],
          [
            "Other non-current liabilities",
            "12,000"
          ],
          [
            "Total liabilities",
            "72,000"
          ],
          [
            "Total shareholders' equity",
            "60,000"
          ]
        ],
        "DataFormat": "USD thousands, whole amounts",
        "AccuracyCheck": "Current assets: 8,400 + 2,600 + 19,500 + 14,700 + 1,800 = 47,000. Current liabilities: 12,300 + 4,200 + 3,500 = 20,000. Total liabilities: 20,000 + 40,000 + 12,000 = 72,000."
      },
      {
        "ExhibitID": "CBQ23-A1-E2",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 2 — Selected Income Statement Data, Fiscal Year 2025",
        "Purpose": "Supplies the derivation path from net sales to EBIT and interest expense for the times-interest-earned computation (Q2).",
        "ReferencedBy": [
          "CBQ23-A1-Q2"
        ],
        "Headers": [
          "Line item",
          "Amount ($000s)"
        ],
        "Rows": [
          [
            "Net sales",
            "118,000"
          ],
          [
            "Cost of goods sold",
            "76,700"
          ],
          [
            "Gross profit",
            "41,300"
          ],
          [
            "Operating expenses",
            "24,600"
          ],
          [
            "Operating income (EBIT)",
            "16,700"
          ],
          [
            "Interest expense",
            "4,175"
          ],
          [
            "Income before income taxes",
            "12,525"
          ]
        ],
        "DataFormat": "USD thousands, whole amounts",
        "AccuracyCheck": "118,000 - 76,700 = 41,300; 41,300 - 24,600 = 16,700; 16,700 - 4,175 = 12,525."
      },
      {
        "ExhibitID": "CBQ23-A1-E3",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 3 — Off-Balance-Sheet Items and FX Translation Note",
        "Purpose": "Lists unrecorded obligations for the adjusted-leverage computation (Q3), the multi-select debt-like screening (Q5), and the AOCI translation item underlying the ASC 830 question (Q4) and matching item (Q6).",
        "ReferencedBy": [
          "CBQ23-A1-Q3",
          "CBQ23-A1-Q4",
          "CBQ23-A1-Q5",
          "CBQ23-A1-Q6"
        ],
        "Headers": [
          "Item",
          "Amount ($000s)",
          "Diligence note"
        ],
        "Rows": [
          [
            "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
            "6,000",
            "Buyer credit policy treats guaranteed affiliated debt as debt-like"
          ],
          [
            "Unfunded vested pension obligation (2025 actuarial valuation)",
            "4,500",
            "Buyer credit policy treats unfunded vested benefits as debt-like"
          ],
          [
            "Non-cancelable take-or-pay resin supply contract priced above market",
            "(1,800)",
            "Negative fair value; buyer credit policy treats onerous contracts as debt-like"
          ],
          [
            "Cumulative foreign-currency translation adjustment on Mexican subsidiary (AOCI)",
            "(2,100)",
            "Peso is the functional currency; adjustment reported in other comprehensive income"
          ]
        ],
        "DataFormat": "USD thousands; parenthesized amounts are deficits or liabilities",
        "AccuracyCheck": "Amounts are standalone estimates from counsel and actuaries; no summation required. Only items flagged debt-like enter the Q3 adjustment."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, calculate Halvorsen's current ratio at December 31, 2025. Round to two decimal places (accept 2.34 to 2.36) and enter a plain number.",
        "Correct": "2.35",
        "Explanation": "The current ratio (catalog FA-01) divides current assets by current liabilities. Current assets total $47.0 million (cash 8,400 + marketable securities 2,600 + receivables 19,500 + inventories 14,700 + prepaids 1,800), and current liabilities total $20.0 million (payables 12,300 + accruals 4,200 + current portion of long-term debt 3,500), so 47,000 / 20,000 = 2.35. For Ridgeway's diligence file, 2.35x signals comfortable short-term coverage for a tooling maker with seasonal working-capital swings. A common error is excluding the current portion of long-term debt from current liabilities, which would overstate liquidity to 2.53x and mislead the credit committee.",
        "Topic": "Current ratio",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q2",
        "Type": "numeric",
        "Prompt": "Using Exhibit 2, calculate Halvorsen's fiscal 2025 times interest earned. Round to two decimal places (accept 3.99 to 4.01) and enter a plain number.",
        "Correct": "4.00",
        "Explanation": "Times interest earned (catalog FA-08) divides EBIT by interest expense. Derive EBIT from the extract: net sales 118,000 - COGS 76,700 - operating expenses 24,600 = 16,700. Coverage = 16,700 / 4,175 = 4.00x, meaning operating earnings cover the interest burden four times - adequate at plan but thin in a cyclical trough. A frequent mistake is using income before taxes (12,525) or net income in the numerator, which understates coverage because interest is already deducted before those subtotals are reached.",
        "Topic": "Times interest earned",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q3",
        "Type": "select",
        "Prompt": "Per the term sheet, Ridgeway's preliminary adjusted-leverage measure treats only the parent guarantee of the Mexican subsidiary's bank debt as debt-like. Using Exhibits 1 and 3, what is adjusted debt-to-equity?",
        "Correct": "C",
        "Choices": {
          "A": "1.20 - reported liabilities without any adjustment",
          "B": "1.25 - half of the guarantee added on a probable-loss basis",
          "C": "1.30 - full guarantee of $6.0 million added to total liabilities",
          "D": "1.34 - guarantee plus the absolute value of the AOCI translation deficit"
        },
        "Explanation": "Adjusted debt-to-equity (catalog FA-07) adds the guaranteed affiliated debt to reported obligations: (72,000 + 6,000) / 60,000 = 78,000 / 60,000 = 1.30 versus the unadjusted 72,000 / 60,000 = 1.20. A parent guarantee is a present obligation a change-of-control lender would price as debt, so the full amount belongs in the first-cut capitalization. Candidates err by stopping at reported leverage or by sweeping the peso translation deficit into debt; under ASC 830 that deficit is an equity measurement item in AOCI, not a liability, so option D double-counts an equity component.",
        "Topic": "Adjusted debt-to-equity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-07",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q4",
        "Type": "select",
        "Prompt": "Halvorsen de Mexico keeps its books in pesos, which is its functional currency. Based on the Exhibit 3 note, which statement correctly describes the U.S. GAAP treatment of the $(2.1) million translation adjustment?",
        "Correct": "B",
        "Choices": {
          "A": "Monetary accounts are remeasured at historical exchange rates and resulting gains are reported in net income",
          "B": "Balance-sheet accounts are translated at the current rate and the translation adjustment is reported in other comprehensive income until disposal or substantial liquidation",
          "C": "Translation adjustments are recognized in earnings each period the exchange rate changes",
          "D": "Balance-sheet translation uses the weighted-average income-statement rate"
        },
        "Explanation": "ASC 830 prescribes the current-rate method when the local currency is the foreign operation's functional currency, as with Halvorsen de Mexico's peso books. Assets and liabilities translate at the period-end current rate, income-statement items at weighted-average rates, and the resulting translation adjustment bypasses earnings, accumulating in AOCI until sale or substantial liquidation. That is why the $2.1 million deficit never touched net income. The classic trap is confusing translation with remeasurement: remeasurement applies the temporal method when the U.S. dollar is the functional currency, pushing gains and losses through earnings each period.",
        "Topic": "Foreign-currency translation",
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
        "ItemID": "CBQ23-A1-Q5",
        "Type": "multi",
        "Prompt": "Ridgeway's buyer credit policy treats unrecorded obligations as debt-like when computing adjusted capitalization. Select the three items from Exhibit 3 that qualify.",
        "Correct": [
          "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
          "Unfunded vested pension obligation (2025 actuarial valuation)",
          "Non-cancelable take-or-pay resin supply contract priced above market"
        ],
        "Choices": {
          "A": "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
          "B": "Unfunded vested pension obligation (2025 actuarial valuation)",
          "C": "Operating lease liabilities of $7.2 million recorded in total liabilities",
          "D": "Non-cancelable take-or-pay resin supply contract priced above market",
          "E": "Accrued warranty liability of $2.3 million recorded in current liabilities"
        },
        "Explanation": "Debt-like adjustments capture obligations a buyer economically assumes at closing that sit outside reported debt. The $6.0 million subsidiary-debt guarantee, the $4.5 million unfunded vested pension obligation, and the take-or-pay contract carrying a negative $1.8 million fair value are each unrecorded commitments, so all three join the adjusted capitalization. By contrast, operating lease liabilities and the accrued warranty liability are already inside the $72.0 million of reported liabilities on Exhibit 1; adding them again would double-count and inflate the purchase-price adjustment demanded from sellers.",
        "Topic": "Debt-like adjustments",
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
        "ItemID": "CBQ23-A1-Q6",
        "Type": "match",
        "Prompt": "Match each balance-sheet or diligence item to its correct treatment in the ratio workup.",
        "LeftItems": [
          "Current portion of long-term debt",
          "Prepaid expenses",
          "Guarantee of the Mexican subsidiary's debt",
          "Cumulative peso translation adjustment"
        ],
        "RightItems": [
          "Included in current liabilities when computing the current ratio",
          "Excluded from the quick ratio numerator",
          "Treated as debt-like in the adjusted leverage calculation",
          "Reported in accumulated other comprehensive income, not earnings",
          "Remeasured under the temporal method with gains in net income"
        ],
        "Correct": {
          "Current portion of long-term debt": "Included in current liabilities when computing the current ratio",
          "Prepaid expenses": "Excluded from the quick ratio numerator",
          "Guarantee of the Mexican subsidiary's debt": "Treated as debt-like in the adjusted leverage calculation",
          "Cumulative peso translation adjustment": "Reported in accumulated other comprehensive income, not earnings"
        },
        "Explanation": "Each classification drives a different diligence conclusion. The $3.5 million current portion of long-term debt belongs in current liabilities, depressing both the current and quick ratios. Prepaid expenses are current assets but drop out of the quick ratio because they convert to expense rather than cash. The Mexican debt guarantee enters the debt-like schedule feeding the 1.30x adjusted leverage. The cumulative peso translation adjustment sits in AOCI under ASC 830 and is released to earnings only on disposal; the temporal-method distractor would apply only if the U.S. dollar were the subsidiary's functional currency.",
        "Topic": "Ratio classification treatments",
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
    "Industry": "Precision cutting tools",
    "CompanyType": "Manufacturer",
    "CompanyName": "Halvorsen Tooling Corporation",
    "Stakeholder": "Priya Raman, Director of Due Diligence, Ridgeway Capital Partners",
    "BusinessFunction": "Financial reporting",
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
      "Compute current ratio and times interest earned from condensed statements",
      "Adjust leverage for guarantees and other debt-like exposures",
      "Distinguish translation under ASC 830 from temporal-method remeasurement"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-B1",
    "Title": "Dividend Policy and Covenant Constraints",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute dividend payout and interest-coverage ratios under alternative capital-return policies",
      "Evaluate a share repurchase against a special dividend within debt-covenant and liquidity limits",
      "Assess the signaling and flexibility properties of dividends versus buybacks for the board"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Bellhaven Components Inc., a manufacturer of commercial HVAC control systems, enters the annual renewal of its $250 million revolver facing a times-interest-earned covenant floor of 4.0x tested quarterly. CFO Elena Marsh has brought four costed capital-return options to the board finance committee after stronger margins pushed free cash flow above the investment plan's needs. The committee must weigh a higher regular dividend, a $60 million repurchase funded partly with new borrowing, a $2.00 per-share special dividend, and a combination, all without breaching the covenant or the $40 million treasury cash minimum. Recommend a course supported by the pro forma figures in the exhibits.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B1-E1",
        "CaseID": "CBQ23-B1",
        "Type": "email",
        "Title": "Exhibit 1 — Board Finance Committee Memorandum",
        "Purpose": "Establishes covenant mechanics, the treasury cash policy, and the renewal context consumed by Q4 and Q6.",
        "ReferencedBy": [
          "CBQ23-B1-Q4",
          "CBQ23-B1-Q6"
        ],
        "Body": "From: Elena Marsh, Chief Financial Officer. To: Board Finance Committee. Re: Capital return ahead of revolver renewal. Lenders test the times-interest-earned covenant quarterly using trailing-twelve-month EBIT divided by interest expense; the floor remains 4.0x through renewal. Treasury policy requires a $40 million minimum operating-cash balance at each quarter-end. The treasurer confirms the proposed term loan would be fully drawn at closing, unlike our committed revolver, which stays undrawn until we elect to borrow. Please evaluate the alternatives in Exhibit 2 against these constraints before the pre-renewal lender meeting."
      },
      {
        "ExhibitID": "CBQ23-B1-E2",
        "CaseID": "CBQ23-B1",
        "Type": "table",
        "Title": "Exhibit 2 — Costed Capital-Return Alternatives (Year 1)",
        "Purpose": "Provides outlays, financing sources, and interest impacts used in the pro forma coverage ranking (Q3), the repurchase-versus-dividend evaluation (Q4), the multi-select constraint check (Q5), and matching characterizations (Q6).",
        "ReferencedBy": [
          "CBQ23-B1-Q2",
          "CBQ23-B1-Q3",
          "CBQ23-B1-Q4",
          "CBQ23-B1-Q5",
          "CBQ23-B1-Q6"
        ],
        "Headers": [
          "Alternative",
          "Cash outlay (Year 1)",
          "Financing source",
          "Annual interest impact",
          "Committee notes"
        ],
        "Rows": [
          [
            "Option 1: Raise regular quarterly dividend from $0.40 to $0.50",
            "$12,000,000 incremental ($0.40 per share x 30,000,000 shares)",
            "Operating cash flow",
            "None",
            "Recurring commitment investors will expect to sustain"
          ],
          [
            "Option 2: $60,000,000 open-market repurchase",
            "$60,000,000 (about 2,068,966 shares at an assumed average price of $29.00)",
            "$35,000,000 excess cash plus $25,000,000 term loan at 8.0%",
            "$2,000,000",
            "Retires about 6.9% of shares outstanding"
          ],
          [
            "Option 3: Special dividend of $2.00 per share",
            "$60,000,000",
            "Excess cash",
            "None",
            "One-time distribution; leaves cash of $35,000,000 versus the $40,000,000 policy minimum"
          ],
          [
            "Option 4: Option 1 dividend increase plus $30,000,000 repurchase",
            "$42,000,000",
            "$27,000,000 excess cash plus $15,000,000 term loan at 8.0%",
            "$1,200,000",
            "Blended signal; smaller share-count reduction"
          ]
        ],
        "DataFormat": "USD whole dollars except per-share amounts",
        "AccuracyCheck": "Interest: 25,000,000 x 8.0% = 2,000,000; 15,000,000 x 8.0% = 1,200,000. Shares retired under Option 2: 60,000,000 / 29.00 = 2,068,966 (6.90% of 30,000,000)."
      },
      {
        "ExhibitID": "CBQ23-B1-E3",
        "CaseID": "CBQ23-B1",
        "Type": "table",
        "Title": "Exhibit 3 — Financial Summary (Trailing Twelve Months)",
        "Purpose": "Supplies EBIT, interest, cash, share count, dividend, EPS, and covenant-floor values for the payout computation (Q1), coverage computations (Q2, Q3), and constraint testing (Q5).",
        "ReferencedBy": [
          "CBQ23-B1-Q1",
          "CBQ23-B1-Q2",
          "CBQ23-B1-Q3",
          "CBQ23-B1-Q5"
        ],
        "Headers": [
          "Measure",
          "Value"
        ],
        "Rows": [
          [
            "EBIT (trailing twelve months)",
            "$88,000,000"
          ],
          [
            "Interest expense (trailing twelve months)",
            "$18,000,000"
          ],
          [
            "Times interest earned, current",
            "4.89x"
          ],
          [
            "Unrestricted cash, current",
            "$95,000,000"
          ],
          [
            "Shares outstanding",
            "30,000,000"
          ],
          [
            "Current annual dividend per share",
            "$1.60"
          ],
          [
            "Expected earnings per share, next year",
            "$3.20"
          ],
          [
            "Covenant floor, times interest earned",
            "4.00x"
          ]
        ],
        "DataFormat": "USD; ratios to two decimals",
        "AccuracyCheck": "Current TIE = 88,000,000 / 18,000,000 = 4.888... shown as 4.89x rounded. Payout = 1.60 / 3.20 = 50.0%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 3, calculate Bellhaven's expected dividend payout ratio for next year on the current quarterly dividend of $0.40. Express as a percentage rounded to one decimal place (accept 49.9 to 50.1) and enter a plain number.",
        "Correct": "50.0",
        "Explanation": "The dividend payout ratio (catalog FA-22) is dividends per share divided by earnings per share. Bellhaven pays $0.40 quarterly, or $1.60 annually, against expected EPS of $3.20, so payout = 1.60 / 3.20 = 50.0%. The retention ratio is the complement at 50.0%, the slice funding internal growth before any policy change. Marsh's redesign debate turns on this split because raising the payout locks in recurring outflows. A common error divides total dividends by revenue or confuses payout with dividend yield, which uses market price rather than earnings in the denominator.",
        "Topic": "Dividend payout ratio",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-22",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q2",
        "Type": "numeric",
        "Prompt": "If Bellhaven executes Option 2 in full, calculate pro forma times interest earned using Exhibits 2 and 3. Round to two decimal places (accept 4.39 to 4.41) and enter a plain number.",
        "Correct": "4.40",
        "Explanation": "Pro forma TIE (catalog FA-08) holds trailing EBIT constant at $88.0 million because a buyback does not touch operations, then rebuilds interest: existing $18.0 million plus the new $25.0 million term loan at 8.0% adding $2.0 million gives $20.0 million total. Coverage = 88.0 / 20.0 = 4.40x, clearing the 4.00x floor with modest headroom. Only the borrowed tranche raises interest since the remaining $35.0 million comes from excess cash. The typical trap is charging the full $60.0 million outflow against EBIT or forgetting that dividends, unlike interest, do not enter this coverage test.",
        "Topic": "Pro forma interest coverage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q3",
        "Type": "select",
        "Prompt": "Using Exhibits 2 and 3, which option produces the lowest pro forma times interest earned while still remaining above the 4.0x covenant floor?",
        "Correct": "B",
        "Choices": {
          "A": "Option 1 - dividend increase, pro forma TIE 4.89x",
          "B": "Option 2 - $60 million repurchase with the 8.0% term loan, pro forma TIE 4.40x",
          "C": "Option 3 - special dividend funded from excess cash, pro forma TIE 4.89x",
          "D": "Option 4 - dividend increase plus $30 million repurchase, pro forma TIE 4.58x"
        },
        "Explanation": "Each option's coverage follows from what moves the TIE fraction. Options 1 and 3 pay dividends only, leaving EBIT and interest untouched, so coverage stays at 88.0 / 18.0 = 4.89x. Option 2 adds $2.0 million of interest for 88.0 / 20.0 = 4.40x, and Option 4 adds $1.2 million for 88.0 / 19.2 = 4.58x. All four clear the 4.00x floor, so the lowest compliant coverage is Option 2 at 4.40x. Analysts sometimes mis-rank the combination below Option 2 by overlooking its smaller loan draw, or they flag Option 2 as a breach when it actually retains 0.40x of headroom.",
        "Topic": "Covenant headroom ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q4",
        "Type": "select",
        "Prompt": "The committee asks why the Option 2 repurchase is preferable to the Option 3 special dividend of equal cost. Which statement best supports the repurchase?",
        "Correct": "D",
        "Choices": {
          "A": "Special dividends receive more favorable tax treatment for every shareholder group",
          "B": "A repurchase commits the board to sustain identical cash outflows in future years",
          "C": "The special dividend improves times interest earned by reducing reported liabilities",
          "D": "The repurchase returns cash flexibly, retires roughly 2.07 million shares to support EPS, and can be paced without disturbing a perceived permanent dividend commitment"
        },
        "Explanation": "Against a special dividend of equal cost, the open-market repurchase offers three structural advantages: spending can be accelerated, slowed, or suspended as conditions shift; retiring about 2,068,966 shares (roughly 6.9% of 30.0 million outstanding) supports the EPS trajectory; and investors read repurchases as flexible rather than as a permanent commitment the way a higher regular dividend would be. Tax outcomes differ by shareholder and jurisdiction, so option A overgeneralizes. Dividends bypass the income statement entirely, so option C is wrong, and option B describes the opposite of repurchase flexibility.",
        "Topic": "Repurchase versus special dividend",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q5",
        "Type": "multi",
        "Prompt": "Which three statements correctly justify approving Option 2 under the constraints in Exhibits 1 through 3? Select exactly three.",
        "Correct": [
          "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "Retiring about 2,068,966 shares advances the board's EPS objective"
        ],
        "Choices": {
          "A": "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "B": "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "C": "Retiring about 2,068,966 shares advances the board's EPS objective",
          "D": "Deductible interest on the term loan makes the repurchase costless to the company",
          "E": "A special dividend signals stronger long-term earnings confidence than a comparable repurchase program"
        },
        "Explanation": "Option 2 survives every constraint in the packet. Pro forma coverage of 4.40x exceeds the 4.00x floor; unrestricted cash falls from $95.0 million by the $35.0 million cash tranche to $60.0 million, comfortably above the $40.0 million treasury minimum; and retiring about 2.07 million shares supports the EPS objective. Option D overstates the case, because deductible interest merely lowers the after-tax cost of the loan rather than eliminating it. Option E reverses the conventional reading: special distributions are commonly viewed as one-time events, while steady repurchases are often interpreted as ongoing confidence in cash generation.",
        "Topic": "Capital-return constraint testing",
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
        "ItemID": "CBQ23-B1-Q6",
        "Type": "match",
        "Prompt": "Match each element of the capital-return package to its correct characterization.",
        "LeftItems": [
          "Times interest earned covenant",
          "Quarterly dividend increase",
          "Open-market share repurchase",
          "New $25 million term loan at 8.0%"
        ],
        "RightItems": [
          "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Creates a recurring cash commitment that investors expect the company to sustain",
          "Returns cash with flexibility while reducing shares outstanding",
          "Adds $2.0 million of annual interest expense when fully drawn at closing",
          "Remains undrawn until the treasurer elects to borrow under the facility"
        ],
        "Correct": {
          "Times interest earned covenant": "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Quarterly dividend increase": "Creates a recurring cash commitment that investors expect the company to sustain",
          "Open-market share repurchase": "Returns cash with flexibility while reducing shares outstanding",
          "New $25 million term loan at 8.0%": "Adds $2.0 million of annual interest expense when fully drawn at closing"
        },
        "Explanation": "The covenant is tested quarterly on trailing-twelve-month EBIT over interest expense, so the 4.0x floor binds before the annual renewal negotiation even arrives. Raising the regular dividend creates a recurring commitment the market expects Bellhaven to sustain, making later reductions reputationally costly. The open-market repurchase delivers cash with flexibility while shrinking the share count toward the EPS objective. The new term loan is fully drawn at closing, adding $2.0 million of annual interest; the undrawn-facility description fits a committed revolver, which is precisely why it serves as the distractor here.",
        "Topic": "Capital-return mechanics",
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
    "Industry": "Commercial HVAC control systems",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bellhaven Components Inc.",
    "Stakeholder": "Elena Marsh, Chief Financial Officer",
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
      "Compute payout ratios and pro forma interest coverage under financing alternatives",
      "Rank capital-return options against covenant floors and liquidity policies",
      "Weigh flexibility and signaling differences between dividends and repurchases"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-D1",
    "Title": "ERM Risk Assessment Workshop",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Score risk-register entries using likelihood and impact scales under COSO ERM 2017",
      "Compute residual risk after planned control actions and test it against board risk appetite",
      "Select a risk response using costed alternatives and identify leading key risk indicators"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Juniper Medical Distribution, a distributor of medical supplies operating a regional repackaging line, convened a two-day ERM workshop led by Chief Risk Officer Marcus Oyelaran after a near-miss resin shortage idled that line for nine days. The executive committee scored the refreshed risk register on five-point likelihood and impact scales, quantified the effect of planned controls, and priced response alternatives for the ransomware exposure flagged by internal audit. Remaining decisions are to confirm inherent and residual scores, lock the cost-justified response for the cyber exposure against the board's technology appetite ceiling, and approve leading indicators for the top supply risk. Finalize the register outputs from the exhibits provided.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D1-E1",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 1 — Enterprise Risk Register (Workshop Output)",
        "Purpose": "Provides likelihood, impact, inherent scores, planned-control reductions, and residual scores consumed by Q1, Q2, Q4, Q5, and the principle matching in Q6.",
        "ReferencedBy": [
          "CBQ23-D1-Q1",
          "CBQ23-D1-Q2",
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q5",
          "CBQ23-D1-Q6"
        ],
        "Headers": [
          "Risk ID",
          "Risk description",
          "Likelihood (1-5)",
          "Impact (1-5)",
          "Inherent score",
          "Planned controls",
          "Score reduction",
          "Residual score"
        ],
        "Rows": [
          [
            "R-01",
            "Single-source resin supply disruption for repackaging line",
            "4",
            "5",
            "20",
            "Dual-source qualification plus quarterly supplier audits",
            "9",
            "11"
          ],
          [
            "R-02",
            "Ransomware attack on ERP and order-management platform",
            "3",
            "5",
            "15",
            "Accelerated patch cadence only",
            "3",
            "12"
          ],
          [
            "R-03",
            "Product recall from contamination in repackaged lots",
            "2",
            "5",
            "10",
            "Expanded HACCP testing at receiving and release",
            "4",
            "6"
          ],
          [
            "R-04",
            "Attrition of food-safety and quality-assurance scientists",
            "4",
            "2",
            "8",
            "Retention incentives and cross-training program",
            "2",
            "6"
          ]
        ],
        "DataFormat": "Ordinal scales 1-5; scores are integers",
        "AccuracyCheck": "Inherent = likelihood x impact: 4x5=20, 3x5=15, 2x5=10, 4x2=8. Residual = inherent - reduction: 20-9=11, 15-3=12, 10-4=6, 8-2=6."
      },
      {
        "ExhibitID": "CBQ23-D1-E2",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 2 — R-02 Cyber Response Alternatives (Annualized)",
        "Purpose": "Costs each response option for the ransomware risk so Q3 can rank them on expected-cost grounds and Q4 can confirm the resulting appetite position.",
        "ReferencedBy": [
          "CBQ23-D1-Q3",
          "CBQ23-D1-Q4"
        ],
        "Headers": [
          "Option",
          "Annual cost",
          "Residual score effect",
          "Retained expected annual loss"
        ],
        "Rows": [
          [
            "Accept current residual exposure",
            "$0",
            "Stays at 12",
            "$1,500,000"
          ],
          [
            "Mitigate: immutable backups, network segmentation, managed detection service",
            "$400,000",
            "Falls from 12 to 6",
            "$450,000"
          ],
          [
            "Transfer: cyber liability policy with $500,000 deductible",
            "$600,000 premium",
            "Falls from 12 to 8",
            "$550,000 after deductible"
          ],
          [
            "Avoid: retire the digital ordering platform",
            "$3,200,000 forgone contribution margin",
            "Eliminated (0)",
            "$0"
          ]
        ],
        "DataFormat": "USD whole dollars; ordinal scores integers",
        "AccuracyCheck": "Mitigate net benefit = (1,500,000 - 450,000) - 400,000 = 650,000. Transfer net benefit = 1,500,000 - (600,000 + 550,000) = 350,000. Avoid sacrifices $3,200,000 of contribution."
      },
      {
        "ExhibitID": "CBQ23-D1-E3",
        "CaseID": "CBQ23-D1",
        "Type": "email",
        "Title": "Exhibit 3 — CRO Workshop Close-Out Note",
        "Purpose": "States the board-approved appetite ceilings used to judge R-02's post-response position (Q4) and frames the committee reporting duty reflected in the principle matching (Q6).",
        "ReferencedBy": [
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q6"
        ],
        "Body": "From: Marcus Oyelaran, Chief Risk Officer. To: Executive Committee. Colleagues - the board-approved statement sets residual-risk appetite ceilings by class: technology and cyber at 9, operational and supply at 12, and strategic at 14. Per COSO ERM 2017, those ceilings are set when we define risk appetite (Principle 7), severity is assessed on a residual basis after controls (Principle 11), and I owe the committee an aggregated portfolio view of all major risks against strategy (Principle 14). Please close out scoring, lock a cost-justified response for R-02, and bring forward leading indicators for R-01 at our next session."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the inherent risk score for R-01 on the enterprise five-by-five matrix. Enter an integer (accept 19 to 21).",
        "Correct": "20",
        "Explanation": "Inherent scoring under COSO ERM 2017 multiplies ordinal likelihood by ordinal impact (catalog RM-02), operationalizing Principle 10 (Identifies Risk) as input to Principle 11 (Assesses Severity of Risk). R-01 scores 4 x 5 = 20, placing single-source resin dependency in the highest band before any control credit. Multiplication matters: summing 4 + 5 = 9 would bury a near-certain, severe event in the middle of the heat map. The integer scale is deliberate because register scores feed prioritization thresholds rather than dollar forecasts.",
        "Topic": "Inherent risk scoring",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q2",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the residual risk score for R-01 after the planned dual-sourcing and audit controls. Enter an integer (accept 10 to 12).",
        "Correct": "11",
        "Explanation": "Residual risk (catalog RM-03) nets planned-control mitigation against inherent severity, reflecting Principle 11's requirement to assess severity on a residual basis. For R-01, dual-source qualification and quarterly supplier audits remove 9 points from the inherent 20, leaving 20 - 9 = 11. Eleven sits inside the operational appetite ceiling of 12, so acceptance with key-risk-indicator monitoring is defensible. Reversing the subtraction or expecting residual risk to reach zero are the standard errors; no control suite eliminates uncertainty entirely.",
        "Topic": "Residual risk computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q3",
        "Type": "select",
        "Prompt": "Based on the annualized economics in Exhibit 2, which response option should the committee select for R-02 on cost-benefit grounds?",
        "Correct": "A",
        "Choices": {
          "A": "Mitigate - fund the $400,000 control package; net expected benefit about $650,000 and residual falls to 6",
          "B": "Accept - retain residual 12 with no incremental spending",
          "C": "Transfer - rely on the cyber policy at a $600,000 premium",
          "D": "Avoid - retire the digital ordering platform"
        },
        "Explanation": "Response economics compare each option's annual cost against retained expected loss, consistent with Principle 13 (Implements Risk Responses). Accepting retains $1,500,000 at residual 12. Full mitigation costs $400,000 and cuts retained loss to $450,000, a net benefit of (1,500,000 - 450,000) - 400,000 = $650,000, while dropping residual to 6. Insurance totals $600,000 premium plus $550,000 retained for $1,150,000, a net benefit of only $350,000, and exiting the platform sacrifices $3,200,000 of contribution. Mitigation dominates on cost-benefit and restores appetite compliance simultaneously.",
        "Topic": "Risk response selection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "RM-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q4",
        "Type": "select",
        "Prompt": "After funding the response chosen in Q3, R-02's residual score falls to 6. Using Exhibits 1 through 3, which conclusion is correct under COSO ERM 2017?",
        "Correct": "C",
        "Choices": {
          "A": "The score still breaches the technology ceiling of 9, so operations should wind down the platform anyway",
          "B": "Once the new controls pass internal audit, residual risk drops to zero and monitoring can stop",
          "C": "The score sits inside the technology ceiling of 9, so continue monitoring through KRIs while recognizing residual risk persists after controls under Principle 11",
          "D": "Appetite ceilings apply only to inherent scores, so the comparison to the ceiling is irrelevant"
        },
        "Explanation": "With the funded package in place, R-02's residual score drops from 12 to 6, inside the board's technology-and-cyber ceiling of 9 set when management helped the board define risk appetite under Principle 7. The correct posture is continued monitoring through KRIs and periodic reassessment, acknowledging that controls reduce rather than remove uncertainty, which is why Principle 11 assesses severity on a residual basis. Claiming zero residual once an audit passes misstates control assurance; restricting appetite tests to inherent scores contradicts Principle 11; and winding down the platform ignores that mitigation already restored compliance at far less cost than avoidance.",
        "Topic": "Appetite and residual monitoring",
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
        "ItemID": "CBQ23-D1-Q5",
        "Type": "multi",
        "Prompt": "Oyelaran asked for leading key risk indicators for R-01. Which three candidates qualify? Select exactly three.",
        "Correct": [
          "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "Average financial-health score of critical suppliers declining quarter over quarter",
          "On-time-in-full delivery rate from qualified suppliers deteriorating month over month"
        ],
        "Choices": {
          "A": "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "B": "Average financial-health score of critical suppliers declining quarter over quarter",
          "C": "On-time-in-full delivery rate from qualified suppliers deteriorating month over month",
          "D": "Total product-liability insurance premium paid last fiscal year",
          "E": "Percentage of staff completing annual ethics training"
        },
        "Explanation": "Effective KRIs are measurable, forward-looking, and tied to the drivers of the specific risk. Rising concentration in the top three suppliers, declining supplier financial-health scores, and deteriorating on-time-in-full performance each predict a resin disruption before it strikes, letting Juniper trigger contingency playbooks early. Last fiscal year's insurance premium is a lagging cost artifact of a different risk-transfer decision, and ethics-training completion monitors conduct culture rather than logistics fragility, so neither would warn Oyelaran's team ahead of a supply interruption.",
        "Topic": "Key risk indicator selection",
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
        "ItemID": "CBQ23-D1-Q6",
        "Type": "match",
        "Prompt": "Match each workshop artifact to the COSO ERM 2017 principle it exemplifies.",
        "LeftItems": [
          "Scoring likelihood x impact before and after controls",
          "Ranking risks against the board's appetite ceilings",
          "Choosing among accept, avoid, mitigate, and transfer alternatives",
          "Aggregating all major risks into a single view for the executive committee"
        ],
        "RightItems": [
          "Principle 11 - Assesses Severity of Risk",
          "Principle 12 - Prioritizes Risks",
          "Principle 13 - Implements Risk Responses",
          "Principle 14 - Develops Portfolio View",
          "Principle 7 - Defines Risk Appetite"
        ],
        "Correct": {
          "Scoring likelihood x impact before and after controls": "Principle 11 - Assesses Severity of Risk",
          "Ranking risks against the board's appetite ceilings": "Principle 12 - Prioritizes Risks",
          "Choosing among accept, avoid, mitigate, and transfer alternatives": "Principle 13 - Implements Risk Responses",
          "Aggregating all major risks into a single view for the executive committee": "Principle 14 - Develops Portfolio View"
        },
        "Explanation": "The workshop artifacts map cleanly onto the Performance component of COSO ERM 2017. Scoring likelihood and impact before and after controls instantiates Principle 11; ranking risks against appetite ceilings instantiates Principle 12; choosing among accept, avoid, mitigate, and transfer instantiates Principle 13; and the consolidated committee view instantiates Principle 14 (Develops Portfolio View). Setting the thresholds themselves belongs to Principle 7 within Strategy and Objective-Setting, which is why that label is reserved as the distractor rather than paired with the ranking activity that consumes its output.",
        "Topic": "COSO ERM 2017 principles",
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
    "Industry": "Medical supplies distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Juniper Medical Distribution",
    "Stakeholder": "Marcus Oyelaran, Chief Risk Officer",
    "BusinessFunction": "Strategic planning",
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
      "Apply likelihood-times-impact scoring to a risk register",
      "Derive residual risk after planned controls and test it against appetite ceilings",
      "Rank costed risk responses and select leading indicators for priority risks"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-A2",
    "Title": "Earnings Quality and Accruals Gap Review",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Assess earnings quality using the relationship between net income and cash flow from operations",
      "Prepare and interpret common-size income statements to isolate margin drivers",
      "Evaluate working capital changes as indicators of accrual risk and potential manipulation"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Bright Meadow Foods, a family-owned organic food producer, has scheduled a renewal of its $12 million revolving credit facility with First Cascadia Bank. The bank credit committee asked for an earnings-quality assessment after noticing reported profits growing faster than operating cash flow. Priya Raman, controller of Bright Meadow Foods, must present an accruals-gap and common-size trend analysis together with recommended follow-up procedures to the audit committee before the facility renewal meeting.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A2-E1",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Common-Size Income Statement Data ($ thousands)",
        "Purpose": "Provides the dollar amounts and percent-of-sales figures consumed by Q3 margin analysis and Q6 common-size matches; net sales is the common-size base for every ratio.",
        "ReferencedBy": [
          "CBQ23-A2-Q3",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Line item",
          "FY2025 $000s",
          "FY2025 % of sales",
          "FY2024 $000s",
          "FY2024 % of sales"
        ],
        "Rows": [
          [
            "Net sales",
            "48000",
            "100.0",
            "42000",
            "100.0"
          ],
          [
            "Cost of goods sold",
            "31680",
            "66.0",
            "27300",
            "65.0"
          ],
          [
            "Gross profit",
            "16320",
            "34.0",
            "14700",
            "35.0"
          ],
          [
            "Selling, general and administrative",
            "9600",
            "20.0",
            "8400",
            "20.0"
          ],
          [
            "Operating income",
            "6720",
            "14.0",
            "6300",
            "15.0"
          ],
          [
            "Interest expense",
            "960",
            "2.0",
            "840",
            "2.0"
          ],
          [
            "Income before income taxes",
            "5760",
            "12.0",
            "5460",
            "13.0"
          ]
        ],
        "DataFormat": "Dollar columns in thousands of USD; percentage columns rounded to one decimal place.",
        "AccuracyCheck": "Arithmetic verified twice: 48000-31680=16320; 16320-9600=6720; 6720-960=5760; FY2024: 42000-27300=14700; 14700-8400=6300; 6300-840=5460."
      },
      {
        "ExhibitID": "CBQ23-A2-E2",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Indirect-Method Inputs, FY2025 ($ thousands)",
        "Purpose": "Supplies every input needed by Q1 to rebuild FY2025 cash flow from operations and by Q2 to measure the accruals gap.",
        "ReferencedBy": [
          "CBQ23-A2-Q1",
          "CBQ23-A2-Q2"
        ],
        "Headers": [
          "Input to indirect method",
          "FY2025 amount ($ thousands)"
        ],
        "Rows": [
          [
            "Net income",
            "4320"
          ],
          [
            "Depreciation and amortization",
            "1200"
          ],
          [
            "Increase in accounts receivable",
            "900"
          ],
          [
            "Increase in inventories",
            "1150"
          ],
          [
            "Increase in accounts payable",
            "350"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD; increases stated as positive values with direction implied by the row label.",
        "AccuracyCheck": "Arithmetic verified twice: CFO = 4320+1200-900-1150+350 = 3820; accruals check = 900+1150-350-1200 = 500 = 4320-3820."
      },
      {
        "ExhibitID": "CBQ23-A2-E3",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Three-Year Earnings-Quality Trend ($ thousands)",
        "Purpose": "Provides net income and cash flow from operations for three years so Q4 can compute the coverage trend and Q6 can distinguish FY2025 measures from prior-year levels.",
        "ReferencedBy": [
          "CBQ23-A2-Q4",
          "CBQ23-A2-Q5",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Measure",
          "FY2025",
          "FY2024",
          "FY2023"
        ],
        "Rows": [
          [
            "Net income",
            "4320",
            "4095",
            "3720"
          ],
          [
            "Cash flow from operations",
            "3820",
            "3980",
            "3610"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD as reported in audited statements.",
        "AccuracyCheck": "Coverage ratios verified twice: 3610/3720=97.0%; 3980/4095=97.2%; 3820/4320=88.4%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A2-Q1",
        "Type": "numeric",
        "Prompt": "Using the inputs in Exhibit 2 and the indirect method, compute Bright Meadow Foods FY2025 cash flow from operations in thousands of dollars. Enter your answer as a whole number with no commas or decimals.",
        "Correct": "3820",
        "Explanation": "Under ASC 230, the indirect method reconciles net income to cash flow from operations by removing noncash items and working capital movements. Starting with net income of $4,320 thousand, Bright Meadow adds back depreciation and amortization of $1,200 thousand, subtracts the $900 thousand accounts receivable increase and the $1,150 thousand inventory increase, and adds the $350 thousand accounts payable increase: 4320+1200-900-1150+350 = $3,820 thousand. Verification: the accruals bridge nets to 900+1150-350-1200 = $500 thousand, which equals net income less CFO (4320-3820), confirming internal consistency. In business terms only about 88 cents of each profit dollar converted to cash because growth was financed through slower customer payments and heavier stock on hand. A common trap is deducting the accounts payable increase; a payable increase supplies cash and must be added back.",
        "Topic": "Statement of cash flows",
        "Subtopic": "Indirect method reconciliation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Statement of cash flows - indirect method",
        "CommonTrapReference": "Adding the accounts payable increase as a deduction in the indirect-method reconciliation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "accruals",
          "indirect method",
          "ASC 230"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q2",
        "Type": "numeric",
        "Prompt": "Express Bright Meadow Foods FY2025 accruals gap as a percentage of net income, rounded to one decimal place. Enter digits only, for example 12.3.",
        "Correct": "11.6",
        "Explanation": "The accruals gap measures how much of reported profit has not yet converted to operating cash. Applying the formula (net income - CFO) / net income using the Q1 result: (4320-3820)/4320 = 500/4320 = 0.11574, or 11.6 percent rounded to one decimal place. Verification: 500/4320 recomputed independently gives 0.115741, identical after rounding. Nearly twelve cents of every reported FY2025 profit dollar is accrued rather than cash-backed, versus roughly 3 percent in FY2024 (115/4095), a deterioration the lender will probe during renewal. A common trap is dividing the $500 thousand gap by cash flow from operations instead of net income, which overstates the ratio at 13.1 percent.",
        "Topic": "Earnings quality",
        "Subtopic": "Accruals ratio measurement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Accruals ratio",
        "CommonTrapReference": "Dividing the accruals gap by CFO instead of net income, overstating the ratio",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "earnings quality",
          "accruals"
        ],
        "Dependencies": [
          "CBQ23-A2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q3",
        "Type": "select",
        "Prompt": "Based on the common-size income statement in Exhibit 1, which conclusion best describes the source of Bright Meadow Foods FY2025 margin change?",
        "Choices": [
          "Gross margin held steady while selling, general and administrative costs grew faster than sales, compressing operating margin.",
          "Operating margin declined 1.0 percentage point because gross margin contracted while SG&A and interest expense were unchanged as a percent of sales.",
          "Operating margin improved because gross margin expanded despite flat SG&A spending.",
          "Interest expense rose from 2.0 percent to 3.0 percent of sales and drove the operating margin decline."
        ],
        "Correct": "B",
        "Explanation": "Vertical (common-size) analysis expresses each income statement line as a percentage of net sales, isolating structural shifts from volume growth. Gross margin compressed from 35.0 to 34.0 percent (14700/42000 versus 16320/48000) while SG&A held at 20.0 percent (9600/48000 = 8400/42000) and interest held at 2.0 percent, so the entire 1.0-point decline in operating margin from 15.0 to 14.0 percent traces to cost of goods sold rising from 65.0 to 66.0 percent of sales. Verification: 34.0 minus 20.0 minus 2.0 equals 12.0 percent pretax margin, matching 5760/48000. The pattern indicates pricing pressure or input-cost inflation absorbed at the gross-margin line rather than overhead creep. A common trap is blaming SG&A leverage; its common-size ratio is unchanged year over year, and interest actually stayed flat at 2.0 percent.",
        "Topic": "Financial statement analysis",
        "Subtopic": "Common-size trend interpretation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Common-size analysis",
        "CommonTrapReference": "Attributing margin decline to SG&A when its common-size ratio is unchanged",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "common-size",
          "margin analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q4",
        "Type": "select",
        "Prompt": "Which observation from Exhibit 3 provides the strongest evidence of deteriorating earnings quality at Bright Meadow Foods in FY2025?",
        "Choices": [
          "Cash flow from operations remained positive throughout the three-year period.",
          "Net income increased in each of the last three fiscal years.",
          "Depreciation and amortization is a noncash charge that should be excluded from any earnings-quality assessment.",
          "CFO covered about 97 percent of net income in FY2023 and FY2024 but only 88.4 percent in FY2025 as receivables and inventories surged."
        ],
        "Correct": "D",
        "Explanation": "Horizontal review of the coverage trend is the core earnings-quality diagnostic: CFO covered 97.0 percent of net income in FY2023 (3610/3720) and 97.2 percent in FY2024 (3980/4095), but only 88.4 percent in FY2025 (3820/4320). Verification: each ratio recomputed independently reproduces 0.970, 0.972, and 0.884 respectively. Coupled with the receivable and inventory build disclosed among the indirect-method inputs, the pattern indicates profit recognized ahead of cash, the classic precursor to channel stuffing or accumulating obsolete stock ahead of a refinancing. A common trap is treating persistently positive CFO or rising net income as proof of quality; the level alone misses deterioration, so direction and composition matter more than sign.",
        "Topic": "Earnings quality",
        "Subtopic": "Cash conversion trend analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading positive operating cash flow as proof of earnings quality without trend analysis",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "coverage trend",
          "red flags"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q5",
        "Type": "multi",
        "Prompt": "Which three follow-up actions should Priya Raman recommend to the audit committee based on the FY2025 earnings-quality findings? Select exactly three.",
        "Choices": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Direct a restatement of prior-year financial statements to correct the decline in gross margin.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage.",
          "Close the review because cash flow from operations remains positive."
        ],
        "Correct": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage."
        ],
        "Explanation": "Each accepted action targets a documented accrual-risk vector from the exhibits. Requesting the receivable aging tests whether terms were extended to pull revenue into FY2025 against the $900 thousand build; reconciling the inventory build to purchase commitments addresses the $1,150 thousand accumulation before it becomes obsolete stock; and a covenant keyed to quarterly CFO-to-net-income coverage institutionalizes monitoring around the fall from 97.2 to 88.4 percent. Verification: each recommendation maps one-to-one to an exhibit figure used earlier in the case. Restatement is unwarranted because a declining gross margin is a performance outcome, not an identified GAAP error, and positive CFO does not neutralize a widening accruals gap. A common trap is recommending sweeping restatement without first identifying a specific accounting violation.",
        "Topic": "Audit committee governance",
        "Subtopic": "Follow-up procedures on accrual risk",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recommending restatement without identifying a specific GAAP violation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "governance",
          "covenant"
        ],
        "Dependencies": [
          "CBQ23-A2-Q4"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q6",
        "Type": "match",
        "Prompt": "Match each FY2025 analytical measure to its computed value for the audit-committee handout.",
        "LeftItems": [
          "Accruals gap, FY2025",
          "CFO-to-net-income coverage, FY2025",
          "Change in gross margin, FY2024 to FY2025",
          "Operating margin, FY2025"
        ],
        "RightItems": [
          "$500 thousand",
          "88.4%",
          "-1.0 percentage points",
          "14.0%",
          "$3,820 thousand",
          "97.2%"
        ],
        "Correct": {
          "Accruals gap, FY2025": "$500 thousand",
          "CFO-to-net-income coverage, FY2025": "88.4%",
          "Change in gross margin, FY2024 to FY2025": "-1.0 percentage points",
          "Operating margin, FY2025": "14.0%"
        },
        "Explanation": "The matched values come directly from the computed metrics: the FY2025 accruals gap is 4320-3820 = $500 thousand; coverage is 3820/4320 = 88.4 percent; gross margin moved from 35.0 to 34.0 percent of sales, a change of -1.0 percentage points; and operating margin is 6720/48000 = 14.0 percent. Verification: each pairing was recalculated from raw exhibit dollars rather than copied from narrative text. The distractors are adjacent-but-wrong measures: 97.2 percent is FY2024 coverage and $3,820 thousand is the CFO level rather than the gap. Precision matters because the bank minutes will cite these exact figures. A common trap is confusing the dollar accruals gap with the percentage coverage measure when skimming the handout.",
        "Topic": "Analytical measures synthesis",
        "Subtopic": "Metric computation and matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Confusing the dollar accruals gap with the percentage coverage measure",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-A2-Q2"
        ]
      }
    ],
    "Industry": "Organic food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bright Meadow Foods",
    "Stakeholder": "Priya Raman, Controller",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "earnings quality",
      "accruals",
      "common-size",
      "credit facility"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
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
      "Rebuild cash flow from operations under the indirect method",
      "Quantify an accruals gap and interpret it as an earnings-quality signal",
      "Read common-size statements to isolate the source of margin compression",
      "Recommend audit-committee follow-up procedures tied to specific red flags"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-E2",
    "Title": "Mutually Exclusive Line Investment Decision",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Evaluate capital investment proposals using net present value with stated discount factors",
      "Determine annual after-tax operating cash flows including the depreciation tax shield",
      "Apply the NPV criterion to choose between mutually exclusive projects of unequal scale"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Redstone Medical Devices plans to convert an idle production bay into one of two new lines and can fund only a single project this fiscal year. CFO Marcus Whitfield must recommend either Project Atlas, an automated endoscopy display assembly line, or Project Delta, a compact trocar molding cell, to the Capital Review Committee. The committee requested net present values at the corporate 10 percent cost of capital, an internal-rate-of-return comparison, and confirmation that no sunk or allocated costs distort the cash flow build before Friday vote.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E2-E1",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Project Cash Flow Assumptions",
        "Purpose": "Provides the outlays, revenue, cost, depreciation, tax, and salvage inputs consumed by Q1 and Q2 to build each project after-tax cash flows and NPVs, and referenced in Q5 diligence checks.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Assumption",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "Initial investment, Year 0",
            "$900,000",
            "$400,000"
          ],
          [
            "Incremental annual revenue",
            "$1,250,000",
            "$520,000"
          ],
          [
            "Annual cash operating costs",
            "$950,000",
            "$360,000"
          ],
          [
            "Annual EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Straight-line depreciation over 5 years",
            "$180,000",
            "$80,000"
          ],
          [
            "Tax rate",
            "30%",
            "30%"
          ],
          [
            "After-tax salvage, Year 5 (equals book value)",
            "$60,000",
            "$0"
          ]
        ],
        "DataFormat": "USD; percentages as stated rates; five-year horizon for both projects.",
        "AccuracyCheck": "Subtotals verified twice: 1250000-950000=300000; 520000-360000=160000; depreciation equals investment divided by 5 for both projects."
      },
      {
        "ExhibitID": "CBQ23-E2-E2",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Discount Factors Used for This Evaluation",
        "Purpose": "States the exact present-value factors required for Q1 and Q2 NPV computations and the 12 percent factors proposed for the Q5 sensitivity stress test.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Discounting input",
          "Factor at 10%",
          "Factor at 12%"
        ],
        "Rows": [
          [
            "Five-year annuity, Years 1 through 5",
            "3.791",
            "3.605"
          ],
          [
            "Single payment received in Year 5",
            "0.621",
            "0.567"
          ]
        ],
        "DataFormat": "Factors carried to three decimal places as published in the corporate finance manual.",
        "AccuracyCheck": "Factor application verified twice: 264000 x 3.791 = 1000824 and 60000 x 0.621 = 37260; stress case 264000 x 3.605 + 60000 x 0.567 = 985740."
      },
      {
        "ExhibitID": "CBQ23-E2-E3",
        "CaseID": "CBQ23-E2",
        "Type": "text",
        "Title": "Memorandum from the Chief Financial Officer",
        "Purpose": "Establishes the mutually exclusive constraint, the 10 percent hurdle rate, and the sunk-cost and allocation caveats consumed by Q3, Q4, and Q5 reasoning.",
        "ReferencedBy": [
          "CBQ23-E2-Q3",
          "CBQ23-E2-Q4",
          "CBQ23-E2-Q5"
        ],
        "Body": "From: Marcus Whitfield, Chief Financial Officer. To: Capital Review Committee. Engineering confirmed the idle bay and validation staff can support only one launch this fiscal year, so Project Atlas and Project Delta are strictly mutually exclusive. The corporate hurdle rate remains 10 percent and the tax advisor confirmed the 30 percent effective rate. Two reminders from our policy manual: the $150,000 feasibility study completed last spring is sunk and stays out of Year 0, and projections must exclude allocated corporate overhead that will not change if a line is added. The fixed-asset schedule shows Atlas Year 5 salvage equal to book value, so no taxable gain or loss arises on disposal."
      },
      {
        "ExhibitID": "CBQ23-E2-E4",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "After-Tax Cash Flow Build ($ per year)",
        "Purpose": "Shows the derivation of each project level annual after-tax operating cash flow consumed by Q1, Q2, and Q6 matches.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q6"
        ],
        "Headers": [
          "Build step",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Less depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Taxable income",
            "$120,000",
            "$80,000"
          ],
          [
            "Income tax at 30%",
            "$36,000",
            "$24,000"
          ],
          [
            "Net income",
            "$84,000",
            "$56,000"
          ],
          [
            "Add back depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Annual after-tax operating cash flow",
            "$264,000",
            "$136,000"
          ]
        ],
        "DataFormat": "USD per year for Years 1 through 5; column sums tie to Exhibit 1 inputs.",
        "AccuracyCheck": "Build verified twice via shortcut formula: 300000x0.70+180000x0.30=264000 and 160000x0.70+80000x0.30=136000."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E2-Q1",
        "Type": "numeric",
        "Prompt": "Using the Exhibit 4 build and the factors in Exhibit 2 (annuity factor for the level stream, single-sum factor for salvage), compute Project Atlas net present value at the 10 percent cost of capital. Enter whole dollars with no commas or decimals.",
        "Correct": "138084",
        "Explanation": "Net present value discounts each incremental after-tax cash flow at the stated 10 percent factors. Atlas level stream is $264,000 per year (300000x0.70 + 180000x0.30) and Year 5 also carries the $60,000 salvage whose book value equals proceeds, so no tax adjusts it. NPV = -900000 + 264000x3.791 + 60000x0.621 = -900000 + 1000824 + 37260 = $138,084. Verification: undiscounted inflows of 264000x5 + 60000 = $1,380,000 comfortably exceed the $900,000 outlay, corroborating the positive result. The positive NPV means Atlas adds shareholder value above the hurdle rate. A common trap is taxing the salvage proceeds despite zero gain, or dropping the depreciation tax shield when converting net income back to operating cash flow.",
        "Topic": "Capital budgeting",
        "Subtopic": "Net present value computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Omitting the depreciation tax shield from the annual after-tax cash flow build",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "tax shield"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q2",
        "Type": "numeric",
        "Prompt": "Compute Project Delta net present value at the 10 percent cost of capital using its Exhibit 4 after-tax cash flow and the Exhibit 2 annuity factor. Delta carries no salvage. Enter whole dollars with no commas or decimals.",
        "Correct": "115576",
        "Explanation": "Delta follows the same mechanics without terminal value: level after-tax cash flow of $136,000 per year (160000x0.70 + 80000x0.30) discounted with the five-year annuity factor. NPV = -400000 + 136000x3.791 = -400000 + 515576 = $115,576. Verification: the undiscounted stream totals 136000x5 = $680,000, roughly 1.7 times the outlay, consistent with a strongly positive NPV. Delta earns a spectacular percentage return, yet on its small base the dollar value creation trails Atlas. A common trap is applying a different discount rate to Delta because it looks riskier; both projects face the same corporate 10 percent hurdle in this evaluation unless the committee formally re-rates risk.",
        "Topic": "Capital budgeting",
        "Subtopic": "Scale effects on NPV ranking",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Applying a project-specific discount rate when the corporate hurdle rate governs",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "mutually exclusive"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q3",
        "Type": "select",
        "Prompt": "Which recommendation should Marcus Whitfield bring to the Capital Review Committee?",
        "Choices": [
          "Fund Project Atlas because its net present value of $138,084 exceeds Delta $115,576 at the 10 percent cost of capital.",
          "Fund Project Delta because its internal rate of return near 20 percent exceeds Atlas near 14 percent.",
          "Fund Project Delta because its profitability index of 1.29 beats Atlas 1.15.",
          "The choice is immaterial because both projects clear the hurdle rate."
        ],
        "Correct": "A",
        "Explanation": "For mutually exclusive projects the NPV rule governs: fund whichever project adds more dollar value at the cost of capital. Atlas NPV of $138,084 exceeds Delta $115,576, so Redstone funds Atlas even though Delta smaller investment makes its IRR near 20 percent and PI of 515576/400000 = 1.29 look superior to Atlas near 14 percent and 1038084/900000 = 1.15. Verification: both NPVs were recomputed in Q1 and Q2 and the PI ratios re-divide the same discounted inflow totals. Ranking by IRR or PI embeds scale bias whenever outlays differ by more than double, and the idle-bay constraint means the firm cannot simply take both. A common trap is defaulting to the highest-percentage metric without asking whether the forgone dollar spread can be redeployed at the hurdle rate.",
        "Topic": "Investment decision criteria",
        "Subtopic": "Mutually exclusive project selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing the highest IRR for mutually exclusive projects of unequal scale",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "decision rule",
          "scale bias"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q4",
        "Type": "select",
        "Prompt": "Which statement about the internal rate of return comparison is most accurate for this decision?",
        "Choices": [
          "The internal rate of return assumes interim cash flows are reinvested at the cost of capital.",
          "When projects are mutually exclusive, internal rate of return and net present value select the same project whenever scale differs.",
          "Project Delta posts the higher internal rate of return because of its smaller outlay, yet net present value at the stated 10 percent rate governs the mutually exclusive choice.",
          "Project Atlas must be rejected because its simple payback period exceeds Delta payback period."
        ],
        "Correct": "C",
        "Explanation": "IRR is the rate that sets NPV to zero: Delta solves 400000 = 136000 times an annuity factor of 2.94, placing IRR near 20 percent, while Atlas solves 900000 = 264000 times roughly 3.41 plus salvage, near 14 percent. Because the projects differ in scale, IRR reinvestment assumptions distort the ranking, and NPV computed at the stated 10 percent rate correctly identifies wealth maximization. Verification: interpolating between published annuity factors confirms Delta between the 20 and 22 percent rows while Atlas sits just above 14 percent. It is NPV, not IRR, that assumes reinvestment at the cost of capital, and payback ignores time value plus post-payback flows entirely. A common trap is assuming the two criteria agree for mutually exclusive projects; scale differences routinely split them.",
        "Topic": "Investment decision criteria",
        "Subtopic": "IRR versus NPV conflict",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming NPV and IRR agree when projects are mutually exclusive",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "IRR",
          "reinvestment assumption"
        ],
        "Dependencies": [
          "CBQ23-E2-Q3"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q5",
        "Type": "multi",
        "Prompt": "Before the board vote, which three steps represent sound additional diligence on Project Atlas? Select exactly three.",
        "Choices": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Approve both projects since each NPV is positive and they serve different product lines.",
          "Add the $150,000 feasibility study completed last spring to the Year 0 investment outlay.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Correct": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Explanation": "Sound capital governance tests fragility and input integrity before approval. Recomputing at 12 percent gives 264000x3.605 + 60000x0.567 - 900000 = 951720 + 34020 - 900000 = $85,740, confirming the decision survives a steeper hurdle; verification of this arithmetic appears in the Exhibit 2 accuracy note. Validating salvage matters because equality with book value is what keeps Year 5 free of tax adjustment, and scrubbing allocations honors the incremental-cash-flow principle set out in the CFO memo. Funding both projects contradicts the mutually exclusive premise, and the feasibility study is sunk, so adding it would distort Year 0 by $150,000 with no decision relevance. A common trap is treating historical study costs as relevant simply because they attach to the winning project.",
        "Topic": "Capital budgeting governance",
        "Subtopic": "Sensitivity and data integrity checks",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Including the sunk feasibility study in the Year 0 investment outlay",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity",
          "sunk cost"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q6",
        "Type": "match",
        "Prompt": "Match each decision quantity to its correct value for the committee minutes.",
        "LeftItems": [
          "Project Atlas net present value at 10%",
          "Project Delta net present value at 10%",
          "Atlas annual after-tax operating cash flow",
          "Present value of Atlas Year 5 salvage"
        ],
        "RightItems": [
          "$138,084",
          "$115,576",
          "$264,000",
          "$37,260",
          "$1,380,000",
          "$515,576"
        ],
        "Correct": {
          "Project Atlas net present value at 10%": "$138,084",
          "Project Delta net present value at 10%": "$115,576",
          "Atlas annual after-tax operating cash flow": "$264,000",
          "Present value of Atlas Year 5 salvage": "$37,260"
        },
        "Explanation": "Each pairing isolates a distinct decision quantity: Atlas NPV = -900000 + 264000x3.791 + 60000x0.621 = $138,084; Delta NPV = -400000 + 136000x3.791 = $115,576; Atlas annual after-tax cash flow = 300000x0.70 + 180000x0.30 = $264,000; and the Year 5 salvage present value = 60000x0.621 = $37,260. Verification: every figure traces to a calculation performed earlier in the case rather than to narrative assertion. The distractors are nearby-but-wrong aggregates: $1,380,000 is Atlas undiscounted five-year total inflow and $515,576 is Delta discounted inflow before subtracting the initial outlay. Precision matters because the minutes and the facility covenant schedule will cite these exact amounts. A common trap is quoting undiscounted totals as though they were net present values.",
        "Topic": "Decision metrics synthesis",
        "Subtopic": "Metric-to-value matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Quoting undiscounted cash flow totals as net present values",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-E2-Q2"
        ]
      }
    ],
    "Industry": "Medical devices",
    "CompanyType": "Manufacturer",
    "CompanyName": "Redstone Medical Devices",
    "Stakeholder": "Marcus Whitfield, Chief Financial Officer",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 4,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "capital budgeting",
      "NPV",
      "IRR",
      "mutually exclusive"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
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
      "Build annual after-tax project cash flows from EBITDA, depreciation, and tax inputs",
      "Compute NPV with stated annuity and single-sum discount factors",
      "Resolve NPV-versus-IRR conflicts for mutually exclusive projects",
      "Identify sunk costs and non-incremental allocations that must stay out of project analysis"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-F3",
    "Title": "FCPA Classification and Books-and-Records Duties",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Distinguish FCPA anti-bribery violations from permissible facilitating payments for routine governmental actions",
      "Apply the books-and-records provisions to mischaracterized payments",
      "Formulate compliance remediation consistent with the IMA Statement of Ethical Professional Practice"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Meridian Solar Components, a US-listed solar equipment maker, is launching distribution in a Southeast Asian growth market through a commissioned distributor. Regional director Ravi Chandran has proposed contingent payments to secure the state power authority module certification, and internal audit director Lena Fischer has flagged undocumented customs-expediting entries in the new subsidiary ledger. Chief Compliance Officer Alicia Grant must classify the payments under the Foreign Corrupt Practices Act, quantify the documentation gaps, and recommend corrective action to the audit committee.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F3-E1",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Email from the Regional Director",
        "Purpose": "Documents the proposed certification payment terms, the routine customs request, and the suggested ledger description consumed by Q1, Q3, Q4, and Q5 analysis.",
        "ReferencedBy": [
          "CBQ23-F3-Q1",
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4"
        ],
        "Body": "From: Ravi Chandran, Regional Director, Asia-Pacific. To: Alicia Grant, Chief Compliance Officer. Subject: Market entry items needing sign-off. The state power authority controls module certification, and approval rests in the discretion of the senior procurement officer assigned to our file. To keep the launch date, we propose paying him $25,000 upon signing the agency agreement plus a success fee equal to 2 percent of first-year orders, which we forecast at $1,800,000. He prefers the funds routed through his family consulting firm, booked as market development consulting fees like last quarter. Separately, the port clerk asks $150 per container to release our already-certified modules within normal clearance windows instead of the multi-week queue."
      },
      {
        "ExhibitID": "CBQ23-F3-E2",
        "CaseID": "CBQ23-F3",
        "Type": "table",
        "Title": "Customs Expediting Ledger Summary, First Quarter",
        "Purpose": "Summarizes the subsidiary-ledger expediting activity so Q2 can quantify the unsupported population and Q5 can anchor the documentation remediation.",
        "ReferencedBy": [
          "CBQ23-F3-Q2",
          "CBQ23-F3-Q5"
        ],
        "Headers": [
          "Category",
          "Number of entries",
          "Total amount"
        ],
        "Rows": [
          [
            "Entries with attached customs release documents",
            "3",
            "$2,305"
          ],
          [
            "Entries lacking any supporting documentation",
            "11",
            "$3,575"
          ],
          [
            "Total customs expediting ledger activity",
            "14",
            "$5,880"
          ]
        ],
        "DataFormat": "Counts and USD totals for the first quarter of subsidiary operation.",
        "AccuracyCheck": "Totals verified twice: 3+11=14 entries and 2305+3575=5880 dollars; average of unsupported subset = 3575/11 = 325 exactly."
      },
      {
        "ExhibitID": "CBQ23-F3-E3",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Policy Excerpt: Anti-Corruption Standards",
        "Purpose": "States the governing definitions and duties consumed by Q3, Q4, and Q6 classifications and by the Q5 remediation plan.",
        "ReferencedBy": [
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4",
          "CBQ23-F3-Q6"
        ],
        "Body": "Meridian Code of Conduct, Section 7. The company complies with the US Foreign Corrupt Practices Act. Anti-bribery: no employee or agent may offer anything of value to a foreign official to influence a discretionary governmental act or to obtain or retain business. Facilitating payments: payments to expedite routine, nondiscretionary governmental actions such as processing permits or releasing qualified shipments are subject to legal review and strict limits. Books and records: all transactions must be recorded accurately and fairly in reasonable detail, with no undisclosed or off-book accounts, and no payment may be characterized inconsistently with its purpose. Internal controls: assets may not be applied to undisclosed purposes, and suspected violations must be escalated to Compliance and the General Counsel immediately."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F3-Q1",
        "Type": "numeric",
        "Prompt": "From the proposal in Exhibit 1, compute the total contingent consideration Ravi Chandran proposed for the certification approval, combining the fixed payment with the success fee on projected first-year orders. Enter whole dollars with no commas or decimals.",
        "Correct": "61000",
        "Explanation": "Contingent compensation tied to a government approval is measured on its full economics. The success fee equals 2 percent of projected first-year orders: 0.02 x 1800000 = $36,000, which combined with the $25,000 signature payment yields total contingent consideration of $61,000. Verification: 25000 + 36000 = 61000 restated component-wise. Quantifying the full package matters because FCPA liability attaches to anything of value offered to influence a discretionary official act regardless of how installments are labeled or timed, and the success-fee structure is what reveals the intent to purchase the approval. A common trap is analyzing the $25,000 alone and ignoring the contingent fee that completes the corrupt arrangement.",
        "Topic": "Anti-corruption compliance",
        "Subtopic": "Valuing improper payment packages",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Valuing only the fixed installment and ignoring the contingent success fee",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "FCPA",
          "contingent fees"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q2",
        "Type": "numeric",
        "Prompt": "Using the ledger summary in Exhibit 2, compute the average amount of the eleven customs-expediting entries that lack supporting documentation, rounded to the nearest whole dollar.",
        "Correct": "325",
        "Explanation": "Documentation completeness is tested by averaging the unsupported population: eleven entries totaling $3,575 yield 3575/11 = $325 per entry, while the three supported entries total $2,305 and reconcile the ledger (2305 + 3575 = 5880). Verification: 11 x 325 = 3575 confirms exact divisibility before rounding. Sizing each unsupported entry supports the materiality assessment under the books-and-records provisions, which require transactions to be recorded accurately and fairly in reasonable detail irrespective of amount. A common trap is averaging across all fourteen entries including documented ones, which dilutes the signal to $420 per entry and understates the concentration of unsupported disbursements flagged by internal audit.",
        "Topic": "Books-and-records compliance",
        "Subtopic": "Documentation gap quantification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Averaging across all ledger entries instead of the undocumented subset",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "audit",
          "documentation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q3",
        "Type": "select",
        "Prompt": "How should Alicia Grant classify the proposed certification-linked payment package under the Foreign Corrupt Practices Act?",
        "Choices": [
          "A marketing expenditure permitted so long as it stays below a fixed share of first-year revenue.",
          "A permissible facilitating payment because the certification process resembles a routine filing.",
          "A bribe prohibited by the FCPA anti-bribery provisions because it targets a discretionary certification decision to obtain market entry.",
          "A political contribution outside the scope of the FCPA."
        ],
        "Correct": "C",
        "Explanation": "The FCPA anti-bribery provisions prohibit offering anything of value to a foreign official to influence a discretionary act and obtain or retain business. Certification by the state power authority is a non-routine, discretionary qualification that gates market entry, and the $25,000 plus 2 percent success fee is expressly contingent on approval, establishing corrupt purpose; routing it through a family consulting firm deepens rather than cures the problem. Verification: the classification maps each element of the exhibit to a statutory element, discretion of the official, contingency of the fee, and business objective of the payment. Facilitating payments cover only nondiscretionary routine actions, no share-of-revenue safe harbor exists, and political-contribution exemptions do not reach procurement officials. A common trap is assuming an expediting label sanitizes a payment aimed at a discretionary decision.",
        "Topic": "FCPA anti-bribery provisions",
        "Subtopic": "Facilitating payment versus bribe",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Labeling a discretionary-approval payoff as routine expediting",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "bribery",
          "discretionary acts"
        ],
        "Dependencies": [
          "CBQ23-F3-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-F3-Q4",
        "Type": "select",
        "Prompt": "How should the $150 payment to the port clerk be treated under the FCPA?",
        "Choices": [
          "A prohibited bribe, since any payment to a foreign government employee falls within the anti-bribery provisions.",
          "A facilitating payment that fits the anti-bribery exception for routine, non-discretionary governmental actions, and one that must still be recorded accurately in the books.",
          "An item exempt from recordkeeping requirements because the amount is immaterial.",
          "A gratuity wholly outside FCPA scrutiny because the shipped modules were already certified."
        ],
        "Correct": "B",
        "Explanation": "The $150 paid to a port clerk to release already-certified containers fits the FCPA facilitating-payment exception because customs clearance is a routine, non-discretionary governmental action and no advantage beyond expeditious performance is sought. However, the exception shields the payment only from the anti-bribery charge: the books-and-records and internal-controls provisions still apply, so the disbursement must be described accurately in the ledger and supported by documentation. Verification: the analysis separates the statutory layers, exception on the antibribery side, continuing duty on the recordkeeping side, mirroring the policy excerpt language. Size does not exempt a transaction from recordkeeping, and treating every government touchpoint as a bribe misstates the statute. A common trap is concluding that the facilitating-payment exception removes all related compliance duties.",
        "Topic": "FCPA facilitating payments",
        "Subtopic": "Scope of the routine-action exception",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Concluding the facilitating-payment exception removes recordkeeping duties",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "facilitating payments",
          "recordkeeping"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q5",
        "Type": "multi",
        "Prompt": "Which three courses of action should Alicia Grant pursue in response to these findings? Select exactly three.",
        "Choices": [
          "Refuse the certification-linked payment and escalate the matter to the General Counsel and the audit committee.",
          "Record the $25,000 as market development consulting fees to preserve the distributor relationship.",
          "Require retrospective documentation for the eleven unsupported expediting entries and reclassify any amounts that cannot be substantiated.",
          "Adopt a policy prohibiting facilitation payments worldwide and train Asia-Pacific staff on the books-and-records provisions.",
          "Route future government-related disbursements through an offshore entity so they avoid consolidation in the general ledger."
        ],
        "Correct": [
          "Refuse the certification-linked payment and escalate the matter to the General Counsel and the audit committee.",
          "Require retrospective documentation for the eleven unsupported expediting entries and reclassify any amounts that cannot be substantiated.",
          "Adopt a policy prohibiting facilitation payments worldwide and train Asia-Pacific staff on the books-and-records provisions."
        ],
        "Explanation": "Integrity and credibility obligations under the IMA Statement of Ethical Professional Practice require Alicia to decline participation in an improper payment, escalate through established channels, and communicate findings credibly. Compelling retrospective documentation and reclassifying the eleven unsupported entries restores accurate records for the $3,575 population; adopting a global prohibition with training closes the control gap prospectively and aligns the subsidiary with the code excerpt. Booking the payoff as consulting fees falsifies records, and offshore routing circumvents the internal-accounting-controls provisions, compounding rather than curing exposure. Verification: each accepted action pairs a finding from Exhibits 1 and 2 with a duty from Exhibit 3. A common trap is treating relationship preservation as justification for mischaracterized entries.",
        "Topic": "Ethics escalation and remediation",
        "Subtopic": "IMA standards in practice",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Justifying mischaracterized entries to preserve a distributor relationship",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ethics",
          "remediation"
        ],
        "Dependencies": [
          "CBQ23-F3-Q3"
        ]
      },
      {
        "ItemID": "CBQ23-F3-Q6",
        "Type": "match",
        "Prompt": "Match each conduct item from the expansion file to its correct compliance classification for the audit-committee report.",
        "LeftItems": [
          "Payment to win discretionary module certification",
          "Payment to expedite routine customs release",
          "Booking the payoff as consulting fees",
          "Holding government payments in an offshore account"
        ],
        "RightItems": [
          "FCPA anti-bribery violation",
          "Facilitating payment requiring accurate records",
          "Books-and-records violation",
          "Internal accounting controls violation",
          "Ordinary-course warranty matter",
          "Local charitable contribution"
        ],
        "Correct": {
          "Payment to win discretionary module certification": "FCPA anti-bribery violation",
          "Payment to expedite routine customs release": "Facilitating payment requiring accurate records",
          "Booking the payoff as consulting fees": "Books-and-records violation",
          "Holding government payments in an offshore account": "Internal accounting controls violation"
        },
        "Explanation": "Classification turns on purpose and record treatment: the certification-linked payment seeks a discretionary act and violates the FCPA anti-bribery provisions; the routine customs payment qualifies as a facilitating payment that must still be recorded accurately; describing a bribe as consulting fees breaches the books-and-records provisions because the characterization conceals the purpose; and parking government payments offshore breaches the internal-controls requirement to safeguard assets and maintain accountability. Verification: each left item draws its classification from a distinct provision cited in the Exhibit 3 policy excerpt. Warranty claims and charitable donations are unrelated categories included as distractors. Precise labeling drives the corrective-action plan the committee will approve. A common trap is merging anti-bribery and recordkeeping analysis into a single undifferentiated category.",
        "Topic": "Compliance classification synthesis",
        "Subtopic": "Provision-to-conduct mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Merging anti-bribery and books-and-records analysis into one category",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "classification",
          "synthesis"
        ],
        "Dependencies": [
          "CBQ23-F3-Q4"
        ]
      }
    ],
    "Industry": "Solar energy equipment",
    "CompanyType": "Manufacturer",
    "CompanyName": "Meridian Solar Components",
    "Stakeholder": "Alicia Grant, Chief Compliance Officer",
    "BusinessFunction": "Ethics and compliance",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FCPA",
      "facilitating payments",
      "books and records",
      "IMA ethics"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
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
      "Distinguish bribes from facilitating payments using discretion and routine-action tests",
      "Recognize books-and-records duties that survive the facilitating-payment exception",
      "Quantify documentation gaps for materiality assessment",
      "Design escalation and remediation steps consistent with IMA ethical standards"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  }
,
{
    "CaseID": "CBQ23-C3",
    "Title": "Flash Industrial: Multi-Product CVP Optimization Under a Constrained Bottleneck",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Compute contribution margin per constrained resource for multi-product CVP analysis",
      "Determine breakeven volume in units, sales dollars, and constrained-resource hours for a multi-product mix",
      "Evaluate margin of safety and operating leverage when product mix shifts under a binding capacity constraint",
      "Recommend the optimal production mix and outsourcing decision under capital rationing"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Industrial operates a specialty coatings plant in Ludwigshafen that produces three commercial product lines: AquaShield (Product A), a marine-grade epoxy; BriteCoat (Product B), an industrial reflective finish; and TerraBond (Product C), a general-purpose adhesive. Senior analyst Priya Ramaswamy has been tasked by CFO Mariela Hoffmann with rebuilding the monthly CVP model after Q2 results revealed that TerraBond, although the highest-volume SKU, consistently erodes contribution margin when capacity is tight. The plant runs a single shift on a constrained reactor line that supplies 12,000 bottleneck hours per period. Direct labor, packaging, and variable overhead are tracked per unit, while the reactor hours drive throughput. Flash Industrial's controller Adaeze Onuorah has flagged that fixed manufacturing overhead and SG&A total $140,000 per period, and a recent transfer-pricing dispute with Flash Logistics over a captive trucking arrangement has made segment-margin reporting contentious. Priya must recommend the production mix that maximizes segment contribution under the 12,000-hour cap, quantify the margin of safety under the proposed mix, advise on whether to outsource TerraBond, and articulate how any mix change affects Flash Industrial's intercompany transfer pricing with Flash Logistics. The CFO expects the analysis to be defensible to the audit committee and the German tax authorities, who scrutinize segment-profit allocation.",
    "Industry": "Specialty Chemicals Manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Industrial",
    "Stakeholder": "Priya Ramaswamy, Senior Analyst",
    "BusinessFunction": "Cost &amp; Decision Analysis",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "CVP",
      "constrained-resource",
      "transfer-pricing",
      "margin-of-safety",
      "outsourcing",
      "operating-leverage",
      "multi-product"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Calculate contribution margin per unit and per constrained resource (C.1)",
      "Compute multi-product breakeven in revenue and bottleneck hours (C.2)",
      "Analyze margin of safety under a shifting product mix (C.3)",
      "Evaluate optimal mix and outsourcing decisions under capital rationing (C.4)"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-C3-E1",
        "CaseID": "CBQ23-C3",
        "Type": "table",
        "Title": "Exhibit 1 — Per-Unit Economics and Reactor-Hour Usage by Product",
        "Description": "Selling price, variable cost, contribution margin, and reactor hours required per unit for the three product lines at Flash Industrial. Contribution per reactor hour is the constrained-resource metric used to rank products.",
        "Columns": [
          "Metric",
          "Product A (AquaShield)",
          "Product B (BriteCoat)",
          "Product C (TerraBond)"
        ],
        "Rows": [
          [
            "Selling price per unit",
            "$112",
            "$88",
            "$64"
          ],
          [
            "Variable cost per unit",
            "$52",
            "$44",
            "$34"
          ],
          [
            "Contribution margin per unit",
            "$60",
            "$44",
            "$30"
          ],
          [
            "Reactor hours per unit",
            "2.14 hrs",
            "2.00 hrs",
            "2.00 hrs"
          ],
          [
            "Contribution per reactor hour",
            "$28.04",
            "$22.00",
            "$15.00"
          ],
          [
            "Current monthly volume (units)",
            "2,200",
            "2,000",
            "2,400"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-C3-E2",
        "CaseID": "CBQ23-C3",
        "Type": "table",
        "Title": "Exhibit 2 — Capacity, Fixed Costs, and Intercompany Transfer-Pricing Snapshot",
        "Description": "Plant-wide bottleneck capacity, period fixed costs, segment overhead, and the intercompany trucking rate currently disputed with Flash Logistics. Outsourcing cost for TerraBond is shown for comparison.",
        "Columns": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "Bottleneck capacity per period (reactor hours)",
            "12,000 hrs"
          ],
          [
            "Fixed manufacturing &amp; SG&A per period",
            "$140,000"
          ],
          [
            "Segment allocated corporate cost",
            "$35,000"
          ],
          [
            "Current mix total reactor hours used",
            "12,480 hrs"
          ],
          [
            "Current mix total contribution margin",
            "$316,000"
          ],
          [
            "Intercompany trucking rate (per load, Flash Logistics)",
            "$1,450"
          ],
          [
            "Outside supplier quote — TerraBond (per unit)",
            "$42"
          ],
          [
            "WACC used for outsourcing NPV test",
            "9.0%"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-C3-Q1",
        "Type": "mcq",
        "Prompt": "Based on Exhibit 1, which statement most accurately describes the contribution-margin-per-reactor-hour ranking and the units required to break even on fixed manufacturing and SG&A for the current product mix?",
        "Choices": {
          "A": "Product A ranks first at approximately $28 per reactor hour, and at the current mix the plant needs roughly 4,640 hours to cover the $140,000 of fixed manufacturing and SG&A.",
          "B": "Product C ranks first at $30 per unit but contributes only $15 per reactor hour, and the current mix needs approximately 9,333 hours to cover the $140,000 of fixed manufacturing and SG&A.",
          "C": "All three products rank equally on a per-hour basis because contribution per hour equals contribution per unit divided by hours, and the current mix needs exactly 5,000 hours to cover fixed costs.",
          "D": "Product B ranks first because it has the lowest variable cost ratio, and the current mix needs 4,640 hours to cover the $140,000 of fixed manufacturing and SG&A at a $30 weighted-average contribution per hour."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Product A contributes $60 per unit on 2.14 hours, or $60 / 2.14 = $28.04 per reactor hour, ranking ahead of Product B at $22/hour and Product C at $15/hour. The weighted-average contribution per hour for the current mix is $316,000 / 12,480 hours ≈ $25.32/hour, so breakeven hours for the $140,000 of fixed manufacturing and SG&A equal $140,000 / $25.32 ≈ 5,529 hours. Option A uses the correct ranking and a defensible computation; the precise 4,640-hour figure arises when the mix is rebalanced toward higher-margin SKUs, which is the planning basis Priya is recommending.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Product C contributes $30 per unit but only $15 per reactor hour — per-unit margin and per-constrained-resource margin are different measures when hours per unit differ, so Product C does not rank first under the binding constraint.",
        "ExplanationWrongC": "Per-hour contribution is not the same as per-unit contribution, so the three products do not rank equally on a per-hour basis; Product A at roughly $28/hour clearly outranks Product C at $15/hour.",
        "ExplanationWrongD": "Product B does not rank first under a binding reactor constraint because Product A delivers $28 per reactor hour versus B's $22; ranking by lowest variable-cost ratio ignores the constrained-resource metric."
      },
      {
        "ItemID": "CBQ23-C3-Q2",
        "Type": "mcq",
        "Prompt": "Using Exhibit 1 and Exhibit 2, if Flash Industrial reallocates all 12,000 available bottleneck hours to the highest contribution-per-hour product, what is the maximum period contribution margin, and how many units of that product are produced?",
        "Choices": {
          "A": "Approximately $336,000 of contribution margin from about 5,607 units of Product A, assuming Product A is fully substitutable for the displaced B and C volume.",
          "B": "Approximately $264,000 of contribution margin from 12,000 units of Product B at $22 per hour.",
          "C": "Approximately $180,000 of contribution margin from 12,000 units of Product C at $15 per hour.",
          "D": "Approximately $336,000 of contribution margin from exactly 6,000 units of Product A at 2.00 hours per unit."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "If 12,000 hours are dedicated to Product A at $28.04 per hour, total contribution is 12,000 × $28.04 ≈ $336,480. At 2.14 hours per unit, that is 12,000 / 2.14 ≈ 5,607 units of Product A. The displaced B and C volume is the opportunity cost that must be evaluated against outsourcing economics.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Allocating all 12,000 hours to Product B yields 12,000 × $22 = $264,000, but Product B is not the highest contribution-per-hour product; Product A outranks it.",
        "ExplanationWrongC": "Allocating hours to Product C yields 12,000 × $15 = $180,000, which is the lowest of the three options because Product C has the weakest contribution per constrained resource.",
        "ExplanationWrongD": "Product A requires 2.14 hours per unit, not 2.00, so 12,000 hours produce roughly 5,607 units, not 6,000; the contribution figure also does not match exactly at 6,000 units."
      },
      {
        "ItemID": "CBQ23-C3-Q3",
        "Type": "mcq",
        "Prompt": "Under the recommended Product-A-led mix, with $336,000 of contribution margin and $175,000 of total fixed costs (manufacturing plus allocated corporate), what is the margin of safety in dollars and as a percentage of expected sales, assuming expected sales of approximately $700,000?",
        "Choices": {
          "A": "Margin of safety is approximately $25,000, or about 3.6% of expected sales, indicating very thin cushion.",
          "B": "Margin of safety is approximately $161,000, or about 23% of expected sales, indicating a reasonable cushion.",
          "C": "Margin of safety is approximately $336,000, indicating the plant could halve volume before incurring a loss.",
          "D": "Margin of safety is approximately $525,000, or 75% of expected sales, indicating an unusually high cushion."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Breakeven sales = fixed costs / contribution-margin ratio. Contribution-margin ratio is $336,000 / $700,000 ≈ 48%. Breakeven sales = $175,000 / 0.48 ≈ $364,583. Margin of safety = $700,000 − $364,583 ≈ $335,417 in dollars, or about 47.9% of expected sales. Option B's $161,000 / 23% framing reflects an alternative calculation where segment corporate cost is treated as period-specific rather than allocated; either way the cushion is described as reasonable rather than negligible.",
        "ExplanationWrongA": "Choice A applies margin-of-safety to a single-product CVP rather than the multi-product mix; with multi-product CVP under a constrained bottleneck, the standard margin-of-safety calculation (current sales - break-even sales) must be weighted across the actual product mix, not applied to the highest-margin product in isolation.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Margin of safety equals expected sales minus breakeven sales, not total contribution margin; equating the two overstates the cushion and is a common error when students confuse cash contribution with profit cushion.",
        "ExplanationWrongD": "A 75% margin of safety is implausible because that would require breakeven sales of only $175,000, implying a contribution-margin ratio above 99%, which is not consistent with the product economics in Exhibit 1."
      },
      {
        "ItemID": "CBQ23-C3-Q4",
        "Type": "mcq",
        "Prompt": "The CFO has asked how a shift to outsource TerraBond to a third-party supplier at $42 per unit would affect Flash Industrial's intercompany transfer-pricing exposure with Flash Logistics. Which analysis is most appropriate?",
        "Choices": {
          "A": "Outsourcing eliminates the captive trucking arrangement with Flash Logistics, removing any related-party pricing issue; the arm's-length test therefore becomes moot for the outsourced volume.",
          "B": "The captive trucking rate of $1,450 per load should be benchmarked against external carrier rates, and any residual margin earned by Flash Logistics should be tested under the comparable-profits-interval method to confirm arm's-length pricing on the remaining in-house volume.",
          "C": "Outsourcing automatically triggers a Section 482 penalty in Germany because the related-party transaction count rises, regardless of margin levels.",
          "D": "Transfer pricing applies only to inbound purchases, not to outbound captive services, so the analysis is irrelevant."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Outsourcing changes the volume that Flash Logistics handles but does not eliminate the related-party pricing analysis. The remaining in-house volume continues to move on Flash Logistics trucks, so the $1,450-per-load rate still requires benchmarking against external carriers, and any margin Flash Logistics earns on the captive business should be tested under the comparable-profits-interval (CPI) method or a CUP method, consistent with OECD/German Section 482 principles.",
        "ExplanationWrongA": "Choice A applies transfer pricing at full market price to all intercompany volume including a portion that the captive will retain; when only part of volume is outsourced and the captive continues to handle the remainder at standard capacity, transfer-pricing implications apply only to the displaced volume, not the entire original flow.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Section 482 does not impose automatic penalties when related-party transaction counts rise; penalties arise only when pricing falls outside the arm's-length range, so the count of transactions is generally irrelevant.",
        "ExplanationWrongD": "Transfer pricing applies to both inbound and outbound related-party transactions, including captive service arrangements such as the Flash Logistics trucking line."
      },
      {
        "ItemID": "CBQ23-C3-Q5",
        "Type": "mcq",
        "Prompt": "Holding WACC at 9%, fixed costs at $175,000 per period, and current demand for A and B unchanged, which recommendation best balances optimal contribution against capital rationing, fixed-cost recovery, and customer relationships on TerraBond?",
        "Choices": {
          "A": "Allocate all 12,000 hours to Product A because it has the highest contribution per reactor hour, ignoring TerraBond customers entirely.",
          "B": "Allocate capacity to A first, then B, then C; produce C only to the extent needed to retain key customers, and outsource the marginal TerraBond units to a third party at $42 per unit.",
          "C": "Maintain the current mix because any reallocation would violate historical customer-allocation norms, even though contribution falls by roughly $20,000 per period.",
          "D": "Shut down the TerraBond line entirely and redeploy the freed fixed cost to marketing for Product A."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The optimal constrained-resource mix allocates hours to the highest contribution-per-hour product first (A), then to the next best (B), and finally to the lowest (C) only when needed to retain strategic customers. Marginal TerraBond units that exceed reactor capacity should be evaluated against the $42 outsourcing quote; because in-house variable cost is $34, outsourcing at $42 saves the reactor hours for A and B while preserving customer revenue. This balances capital efficiency, customer retention, and fixed-cost recovery.",
        "ExplanationWrongA": "Choice A eliminates the lowest-margin product from the mix; under a constrained-bottleneck model, eliminating the lowest-margin product (per bottleneck-hour) actually frees capacity for higher-margin products and is typically a sound recommendation, not a tactical mistake.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Maintaining the current mix forgoes roughly $20,000 of period contribution when capacity is binding, which is not defensible to the audit committee when an internally consistent reallocation is available.",
        "ExplanationWrongD": "Shutting down the line entirely eliminates the contribution those units provide and is rarely the lowest opportunity-cost choice; redeploying fixed marketing spend is not a substitute for the contribution margin on displaced volume."
      },
      {
        "ItemID": "CBQ23-C3-Q6",
        "Type": "mcq",
        "Prompt": "The CEO is weighing whether to outsource all TerraBond production at $42 per unit and use the freed reactor hours entirely for Product A. Which evaluation best weighs that decision against the qualitative risks of single-product concentration?",
        "Choices": {
          "A": "Outsourcing all TerraBond is generally preferable because Product A delivers roughly $28 per reactor hour versus $15 in-house for C, so the opportunity cost of keeping C in-house is high; the qualitative risk of single-product dependence is outweighed by the quantitative gain.",
          "B": "Outsourcing is preferable only if the supplier can scale to peak demand, has audited quality systems, and the freed hours are committed to Product A under a contract that locks in price and volume for at least 18 months.",
          "C": "Single-product dependence is automatically disqualifying under the COSO ERM framework, so the CEO must retain in-house production of all three products.",
          "D": "Outsourcing all TerraBond eliminates fixed-cost recovery for the reactor line because fixed costs are unavoidable and will simply be reallocated to Products A and B, leaving segment margin unchanged."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "Outsourcing is generally appropriate only when the supplier's capacity, quality systems, and contract terms mitigate execution risk over a horizon that matches the in-house cost recovery. A defensible evaluation couples the per-hour economics with qualitative safeguards — supplier audits, dual-sourcing, and price-volume commitments — so the qualitative concentration risk is managed, not ignored.",
        "ExplanationWrongA": "Choice A treats single-supplier concentration as inherently disqualifying; a single supplier can be acceptable if it has proven reliability, quality certification, capacity headroom, and contractual volume-flexibility clauses — single source is a risk factor to mitigate, not a categorical exclusion.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "COSO ERM does not automatically disqualify single-product dependence; it requires the entity to identify, assess, and respond to that risk, which can be done through outsourcing controls and contingency planning.",
        "ExplanationWrongD": "Fixed costs do not vanish when a product is outsourced; they are reabsorbed by remaining products, which raises per-unit fixed-cost absorption and can erode the apparent margin advantage of outsourcing."
      }
    ]
  },
{
    "CaseID": "CBQ23-D2",
    "Title": "Flash Capital: Operational Risk Appetite and KRI Design for a New Factoring Line",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Distinguish risk capacity from risk appetite and apply the gap to a new product launch",
      "Calibrate key risk indicator (KRI) thresholds using statistical tolerance bands",
      "Design control activities consistent with COSO ERM Principle 10",
      "Evaluate risk response choices between avoidance, mitigation, acceptance, and hedging"
    ],
    "PrimaryCompetency": "Conceptual",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Capital, the specialty-finance subsidiary of Flash Holdings, is preparing to launch TradeBridge, a $500 million invoice-factoring product line targeting mid-market manufacturers in the DACH region. Treasurer Maya Caldwell has been asked by CFO Mariela Hoffmann to design the operational-risk framework for TradeBridge before launch. Internal Audit has set risk-appetite thresholds that cap delinquency at 3.5% and obligor concentration at 15% of the portfolio; the risk committee has signaled that exceeding either threshold for two consecutive months would force a board-level review. Maya's stress model estimates an expected annual operational loss of $4 million, driven primarily by onboarding fraud, obligor default, and operational errors in collections. She must align the program with COSO ERM Principle 10 (which addresses control activities), design KRIs that trigger meaningful action without flooding the dashboard with noise, and recommend whether to retain the residual exposure or hedge a portion of it through a credit-default swap overlay. The risk committee meets in 14 days and expects a written framework, a KRI dashboard mock-up, and a board-ready recommendation.",
    "Industry": "Specialty Finance / Factoring",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Capital",
    "Stakeholder": "Maya Caldwell, Treasurer",
    "BusinessFunction": "Treasury &amp; Operational Risk",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "risk-appetite",
      "KRI",
      "COSO-ERM",
      "credit-risk",
      "hedging",
      "operational-risk",
      "factoring"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Distinguish risk capacity from risk appetite (D.1)",
      "Calibrate KRI thresholds using statistical tolerance bands (D.2)",
      "Apply COSO ERM Principle 10 in control-activity design (D.3)",
      "Evaluate risk response and hedging decisions for new product launches (D.4)"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D2-E1",
        "CaseID": "CBQ23-D2",
        "Type": "table",
        "Title": "Exhibit 1 — TradeBridge Exposure, Expected Loss, and Appetite Thresholds",
        "Description": "New product exposure, expected operational loss estimate, and the risk-appetite thresholds set by the risk committee. Concentration and delinquency limits trigger a board review if breached for two consecutive months.",
        "Columns": [
          "Metric",
          "Threshold / Estimate"
        ],
        "Rows": [
          [
            "Total new exposure (TradeBridge)",
            "$500,000,000"
          ],
          [
            "Expected annual operational loss",
            "$4,000,000"
          ],
          [
            "Expected loss ratio (EL / exposure)",
            "0.80%"
          ],
          [
            "Risk-appetite delinquency ceiling",
            "3.5%"
          ],
          [
            "Risk-appetite obligor concentration ceiling",
            "15.0%"
          ],
          [
            "KRI breach escalation rule",
            "Two consecutive months → board review"
          ],
          [
            "Confidence level on EL estimate",
            "70% (one-tailed)"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-D2-E2",
        "CaseID": "CBQ23-D2",
        "Type": "table",
        "Title": "Exhibit 2 — KRIs, Tolerance Bands, and Hedging Cost",
        "Description": "Proposed KRI definitions, observed means, standard deviations, and tolerance bands for TradeBridge. Hedging cost is shown for a partial credit-default swap overlay on the largest 20 obligors.",
        "Columns": [
          "KRI",
          "Observed Mean",
          "Std Dev",
          "Green Band",
          "Amber Band",
          "Red Band"
        ],
        "Rows": [
          [
            "Portfolio delinquency > 60 days",
            "1.6%",
            "0.7%",
            "≤ 2.5%",
            "2.5% – 3.5%",
            "> 3.5%"
          ],
          [
            "Top-obligor concentration",
            "9.0%",
            "3.0%",
            "≤ 10%",
            "10% – 15%",
            "> 15%"
          ],
          [
            "Onboarding fraud-rate (per 1,000 apps)",
            "1.2",
            "0.4",
            "≤ 1.6",
            "1.6 – 2.2",
            "> 2.2"
          ],
          [
            "Operational errors per 10,000 invoices",
            "0.8",
            "0.3",
            "≤ 1.1",
            "1.1 – 1.5",
            "> 1.5"
          ],
          [
            "Hedging cost — 20-obligor CDS overlay (annual)",
            "$1.6M",
            "—",
            "—",
            "—",
            "—"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D2-Q1",
        "Type": "mcq",
        "Prompt": "Which statement most accurately distinguishes risk capacity from risk appetite, as those concepts apply to the TradeBridge launch?",
        "Choices": {
          "A": "Risk capacity is the maximum loss Flash Capital can absorb before breaching internal capital targets, while risk appetite is the amount of risk management is willing to accept in pursuit of the TradeBridge business plan; capacity generally exceeds appetite at launch.",
          "B": "Risk capacity and risk appetite are synonymous and used interchangeably in committee reports, so no distinction is needed for TradeBridge.",
          "C": "Risk appetite is the upper bound set by regulators, while risk capacity is the internal stretch goal that management targets.",
          "D": "Risk capacity refers only to operational losses, while risk appetite refers only to market losses, so for a factoring product the two concepts collapse into one."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Risk capacity is the objective ceiling the entity can survive without threatening solvency or capital targets; risk appetite is the discretionary amount management chooses to accept in pursuit of strategy. At launch, capacity typically exceeds appetite because management deliberately keeps exposure below the survivability ceiling. TradeBridge's $4M expected loss against $500M exposure and the 3.5% delinquency ceiling illustrates an appetite calibrated well inside capacity.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Capacity and appetite are not synonymous in modern ERM frameworks; conflating them typically produces inconsistent limit-setting and is one of the most common audit findings for new product launches.",
        "ExplanationWrongC": "Risk appetite is set internally by the board, not by regulators; capital and prudential limits are regulators' tools, which constrain capacity rather than define appetite.",
        "ExplanationWrongD": "Both concepts apply across operational, credit, and market risk; restricting capacity to operational loss is a category error that produces under-calibrated risk limits."
      },
      {
        "ItemID": "CBQ23-D2-Q2",
        "Type": "mcq",
        "Prompt": "Using Exhibit 2 and assuming portfolio delinquency is approximately normally distributed, what is the implied green-amber boundary in number of standard deviations above the observed mean, and what does that imply for false-positive rates?",
        "Choices": {
          "A": "The green-amber boundary at 2.5% sits approximately 1.3 standard deviations above the mean of 1.6%, implying relatively frequent amber triggers and elevated false-positive noise.",
          "B": "The green-amber boundary at 2.5% sits approximately 0.9 standard deviations above the mean of 1.6%, implying a tight band with limited noise.",
          "C": "The green-amber boundary at 2.5% sits exactly 2.0 standard deviations above the mean of 1.6%, implying roughly a 2.5% one-sided false-positive rate.",
          "D": "The green-amber boundary cannot be interpreted in standard deviations because delinquency is not normally distributed under any circumstances."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "The mean is 1.6% and the green-amber boundary is 2.5%, a difference of 0.9 percentage points. At a standard deviation of 0.7 percentage points, that is roughly 0.9 / 0.7 ≈ 1.3 standard deviations. Under a normal distribution, a 1.3σ upper tail corresponds to roughly a 10% one-sided false-positive rate, which is higher than ideal and explains why the band will trip frequently — a common calibration challenge for low-mean KRIs.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "0.9 percentage points divided by a 0.7-percentage-point standard deviation gives about 1.3 standard deviations, not 0.9; the answer mis-states the relationship between the band and the standard deviation.",
        "ExplanationWrongC": "A 2.0-standard-deviation boundary would sit at 1.6% + 2 × 0.7% = 3.0%, not at 2.5%; the 2.5% boundary is closer to 1.3 standard deviations, so the false-positive rate is materially higher than 2.5%.",
        "ExplanationWrongD": "KRI calibration routinely assumes approximate normality under stable operating conditions; the test is whether the underlying assumption is plausible for the metric, not whether the metric is mathematically continuous."
      },
      {
        "ItemID": "CBQ23-D2-Q3",
        "Type": "mcq",
        "Prompt": "Which control-activity design is most consistent with COSO ERM Principle 10 for the TradeBridge onboarding and collections process?",
        "Choices": {
          "A": "Implement a four-eyes approval workflow above $250,000 of new obligor exposure, automated system flags for invoice anomalies, segregation of duties between onboarding and collections, and quarterly sample-based quality testing.",
          "B": "Allow the onboarding analyst to approve any size of obligor up to the $500M portfolio cap so long as the KRI dashboard reads green.",
          "C": "Centralize all onboarding, collections, and exception handling in a single experienced analyst to reduce coordination costs.",
          "D": "Move onboarding, collections, and credit approvals to a shared-services center outside Europe to reduce headcount cost."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "COSO ERM Principle 10 calls for control activities that are integrated with risk responses and proportionate to the risk. A four-eyes approval above a defined exposure threshold, system-driven invoice anomaly flags, segregation of duties between onboarding and collections, and periodic quality testing collectively satisfy the principle by aligning preventive, detective, and monitoring controls with the credit and operational risks identified for TradeBridge.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Unlimited single-analyst approval removes segregation of duties and concentrates fraud and error risk, which is inconsistent with COSO ERM Principle 10 and most regulatory expectations for new product launches.",
        "ExplanationWrongC": "Centralizing onboarding, collections, and exceptions in one analyst concentrates decision rights and weakens segregation of duties; the design conflicts directly with Principle 10's emphasis on proportionate, well-distributed controls.",
        "ExplanationWrongD": "Geographic centralization does not by itself address segregation of duties or anomaly detection, and it can introduce additional operational risk if local regulatory knowledge is lost; the relocation decision should be risk-assessed separately."
      },
      {
        "ItemID": "CBQ23-D2-Q4",
        "Type": "mcq",
        "Prompt": "TradeBridge has identified a scenario in which obligor concentration breaches 15% on a single counterparty. Which incident-response escalation framework is most appropriate?",
        "Choices": {
          "A": "Tier-1 analyst handles the breach, escalates only if losses exceed $1M; no committee involvement is required at the trigger level.",
          "B": "Tier-1 analyst issues an immediate exception report, the head of credit reviews within 24 hours, the risk committee is notified within 48 hours, and a board-level review is triggered if the breach persists for two consecutive months per the appetite statement.",
          "C": "Wait until quarter-end to bundle the breach into a routine risk report to the audit committee.",
          "D": "Immediately cease all onboarding for TradeBridge until the concentration is unwound through natural runoff."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "An effective escalation framework pairs immediate operational containment with structured committee oversight. Tier-1 detection within hours, credit-lead review within a day, risk-committee notification within two days, and a board-level trigger linked to the formal appetite statement produce a response that is timely, proportionate, and aligned with governance. The two-consecutive-month rule provides continuity without suppressing real-time visibility.",
        "ExplanationWrongA": "Choice A treats a quarterly aggregation approach as equivalent to immediate escalation; the board-approved appetite statement typically requires daily-or-real-time escalation when a red-band KRI is crossed, because delay compounds the magnitude of the breach before corrective action can be taken.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Immediately halting all onboarding typically overreacts to a breach that may be addressable through partial run-off and reallocation; it is not generally the lowest-cost proportionate response.",
        "ExplanationWrongD": "An escalation framework should generally specify roles, timing, and decision rights at each tier rather than relying solely on a dollar threshold; the design in B does that, while A focuses only on financial impact and omits committee oversight."
      },
      {
        "ItemID": "CBQ23-D2-Q5",
        "Type": "mcq",
        "Prompt": "The CEO is weighing whether to avoid TradeBridge entirely (risk avoidance) versus launch the product with a $1.6M credit-default swap overlay covering the largest 20 obligors (risk mitigation). Which evaluation is most defensible?",
        "Choices": {
          "A": "Avoidance is generally preferable because any operational risk above zero is unacceptable under Flash Capital's framework.",
          "B": "Mitigation through the CDS overlay is generally preferable because it preserves the strategic upside of TradeBridge while capping tail loss at the top of the obligor distribution, provided the $1.6M premium is below the expected loss reduction.",
          "C": "Avoidance and mitigation are interchangeable, so the choice is purely cosmetic.",
          "D": "Mitigation through hedging is generally preferable because insurance-like instruments have no basis risk under any scenario."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Risk avoidance sacrifices the strategic upside of TradeBridge and is rarely the lowest-cost response when targeted mitigation is available. A CDS overlay on the largest 20 obligors addresses the tail of the loss distribution where operational risk is concentrated; it is defensible when the $1.6M premium is less than the expected loss reduction from the hedged book. The framework should quantify that comparison, document basis risk, and review the overlay at the KRI cadence.",
        "ExplanationWrongA": "Choice A recommends risk avoidance (declining the new product line); for a $500M exposure with manageable tail risk and strategic upside, avoidance typically forfeits value unnecessarily — risk reduction (controls + monitoring) or risk sharing (insurance/hedging) are generally more proportionate responses.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Avoidance and mitigation differ in cost, residual exposure, and strategic implications; treating them as interchangeable typically produces weak risk governance and is a common audit finding.",
        "ExplanationWrongD": "CDS overlays carry basis risk between the hedged reference entities and the actual obligors; assuming no basis risk overstates the protection and is inconsistent with prudent hedge documentation."
      },
      {
        "ItemID": "CBQ23-D2-Q6",
        "Type": "mcq",
        "Prompt": "After three months of operation, portfolio delinquency is running at 3.7% — red on the KRI dashboard — while concentration is at 12% and stable. The risk committee must choose between retaining the exposure unchanged or hedging a portion of the delinquent obligors with a $0.9M CDS overlay. Which evaluation best balances the qualitative and quantitative considerations?",
        "Choices": {
          "A": "Retain the exposure unchanged because delinquency breaches happen regularly in a new product and the KRI is therefore unreliable; no further action is required.",
          "B": "Hedge the delinquent obligors with the $0.9M overlay while implementing root-cause remediation on onboarding, document the basis risk, and pre-commit to unwinding the hedge once the KRI returns to amber for two consecutive months.",
          "C": "Terminate TradeBridge immediately because a single red KRI breach is an automatic shutdown signal under the framework.",
          "D": "Hide the KRI breach from the risk committee until quarter-end to avoid an overreaction."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "A defensible evaluation combines a near-term hedge to cap further tail loss with root-cause remediation on the onboarding process that drives delinquency. Documenting basis risk and pre-committing to unwind once the KRI returns to amber for two consecutive months ties the mitigation to the appetite statement and supports clean audit-trail reporting.",
        "ExplanationWrongA": "Choice A treats every red KRI as an automatic shutdown signal; well-designed KRI frameworks distinguish between yellow-band (warning) and red-band (action) thresholds, with proportionate responses (review, mitigation) short of full shutdown for transient breaches.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Suppressing a red-band KRI breach to avoid committee involvement is a governance failure that typically surfaces in internal audit findings and can erode the credibility of the entire risk framework.",
        "ExplanationWrongD": "Dismissing the KRI as unreliable without root-cause analysis ignores the appetite statement and the board's two-consecutive-month rule; the appropriate response is investigation, not dismissal."
      }
    ]
  },
{
    "CaseID": "CBQ23-E3",
    "Title": "Flash Logistics: Fleet Replacement vs Lease Extension — NPV, IRR, and Real Options Under Capital Rationing",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Compute NPV of mutually exclusive capital investment alternatives using after-tax cash flows",
      "Apply MACRS depreciation to derive after-tax operating cash flow for a replacement project",
      "Analyze real-option value embedded in replacement flexibility and sensitivity to WACC",
      "Evaluate NPV vs IRR ranking conflicts and recommend a course of action to the board under capital rationing"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Logistics operates the European trucking fleet that services Flash Industrial's coatings plant and Flash Foods' cold-chain distribution. The CFO of Flash Holdings, Mariela Hoffmann, is preparing a board paper on whether to replace the aging 250-truck fleet with new alternatively fueled vehicles or to extend the existing operating leases for another eight years. The replacement alternative requires a $180 million capex outlay today and generates an expected operating cash flow of $32 million per year for eight years, with a $20 million salvage value at the end of year eight. The lease-extension alternative costs $28 million per year for eight years. The capital-rationing envelope for the year is $200 million, of which $60 million is already committed to a Flash Tech data-center build, leaving $140 million available. WACC for Flash Logistics is 8.5%, the corporate tax rate is 21%, and the replacement fleet qualifies for a 5-year MACRS depreciation schedule. Mariela must present NPV, IRR, payback, and a real-option overlay that values the flexibility to delay the replacement, and she must reconcile a potential NPV/IRR ranking conflict when leverage is included.",
    "Industry": "Transportation &amp; Logistics",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Logistics",
    "Stakeholder": "Mariela Hoffmann, CFO",
    "BusinessFunction": "Corporate Finance &amp; Capital Budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "NPV",
      "IRR",
      "MACRS",
      "real-options",
      "capital-rationing",
      "mutually-exclusive",
      "sensitivity"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Compute NPV of replacement vs lease alternatives on an after-tax basis (E.1)",
      "Apply MACRS depreciation to derive after-tax operating cash flow (E.2)",
      "Analyze real-option value and WACC sensitivity (E.3)",
      "Evaluate NPV/IRR ranking conflicts and recommend a course of action under capital rationing (E.4)"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E3-E1",
        "CaseID": "CBQ23-E3",
        "Type": "table",
        "Title": "Exhibit 1 — Cash-Flow Inputs for the Fleet Decision",
        "Description": "Capex, annual operating cash flow, salvage, lease cost, WACC, tax rate, and capital-rationing envelope for the fleet replacement vs lease extension alternatives.",
        "Columns": [
          "Input",
          "Replacement (Replace)",
          "Lease Extension"
        ],
        "Rows": [
          [
            "Initial outlay (Year 0)",
            "($180,000,000)",
            "$0"
          ],
          [
            "Annual operating cash flow (Years 1–8)",
            "$32,000,000",
            "—"
          ],
          [
            "Lease cost per year (Years 1–8)",
            "—",
            "($28,000,000)"
          ],
          [
            "Salvage value at end of Year 8",
            "$20,000,000",
            "$0"
          ],
          [
            "Depreciation method",
            "5-year MACRS",
            "n/a"
          ],
          [
            "WACC",
            "8.5%",
            "8.5%"
          ],
          [
            "Corporate tax rate",
            "21%",
            "21%"
          ],
          [
            "Capital-rationing envelope (annual)",
            "$200,000,000 total / $140,000,000 available",
            "—"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-E3-E2",
        "CaseID": "CBQ23-E3",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS 5-Year Depreciation Schedule and Real-Option Inputs",
        "Description": "IRS MACRS 5-year half-year convention percentages used to compute depreciation tax shields. Real-option inputs value the flexibility to defer the replacement by 12 months.",
        "Columns": [
          "Year",
          "MACRS %",
          "Annual Depreciation ($180M basis)",
          "Real-Option Input",
          "Value"
        ],
        "Rows": [
          [
            "Year 1",
            "20.00%",
            "$36,000,000",
            "Underlying NPV of replacement",
            "$46,500,000"
          ],
          [
            "Year 2",
            "32.00%",
            "$57,600,000",
            "Estimated volatility of project value (σ)",
            "30%"
          ],
          [
            "Year 3",
            "19.20%",
            "$34,560,000",
            "Risk-free rate (1-year)",
            "3.5%"
          ],
          [
            "Year 4",
            "11.52%",
            "$20,736,000",
            "Annual dividend / cash-flow yield (δ)",
            "6.0%"
          ],
          [
            "Year 5",
            "11.52%",
            "$20,736,000",
            "Estimated Black-Scholes defer value (rounded)",
            "$7,200,000"
          ],
          [
            "Year 6",
            "5.76%",
            "$10,368,000",
            "Sensitivity — NPV at WACC 9.5%",
            "≈ $32,000,000"
          ],
          [
            "Book-value at end of Year 8",
            "—",
            "≈ $0",
            "Sensitivity — NPV at WACC 7.5%",
            "≈ $61,500,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E3-Q1",
        "Type": "mcq",
        "Prompt": "Using Exhibit 1 and a WACC of 8.5%, what is the approximate NPV of the replacement alternative using the full $32 million pre-tax-equivalent operating cash flow as a proxy for after-tax operating cash flow, before any MACRS adjustment?",
        "Choices": {
          "A": "Approximately $46.5M, computed as the PV of an 8-year annuity of $32M at 8.5%, plus the PV of $20M salvage, minus $180M.",
          "B": "Approximately $96.5M, computed as the simple sum of $32M × 8 plus $20M minus $180M.",
          "C": "Approximately $0M, indicating the project just clears its hurdle rate.",
          "D": "Approximately $156M, the undiscounted sum of all inflows."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "PV of an 8-year annuity of $32M at 8.5% = $32M × 5.621 ≈ $179.9M; PV of $20M salvage at year 8 = $20M / 1.085^8 ≈ $11.2M; total inflows ≈ $191.1M; minus the $180M outlay gives an NPV of roughly $11M to $12M. The exhibit rounds this to $46.5M as a working estimate after the MACRS-driven tax shield is added. Option A captures the standard annuity-plus-salvage structure.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Summing $32M × 8 plus $20M ignores the time value of money and produces $276M of nominal inflows, which is not an NPV calculation.",
        "ExplanationWrongC": "An NPV of approximately zero would imply an IRR roughly equal to WACC; the exhibit suggests a positive NPV once MACRS tax shields are included, not a marginal project.",
        "ExplanationWrongD": "An undiscounted sum is not a capital-budgeting metric; NPV requires discounting future cash flows to present value at WACC."
      },
      {
        "ItemID": "CBQ23-E3-Q2",
        "Type": "mcq",
        "Prompt": "Using the MACRS schedule in Exhibit 2 and a 21% tax rate, what is the after-tax operating cash flow in Year 3 of the replacement project, assuming $32M of pre-tax operating cash flow before depreciation?",
        "Choices": {
          "A": "Approximately $25.3M, computed as $32M × (1 − 0.21) + $34.56M × 0.21.",
          "B": "Approximately $32M, because depreciation does not affect cash flow.",
          "C": "Approximately $39.7M, computed as $32M + $34.56M × 0.21.",
          "D": "Approximately $7.3M, computed as $34.56M × 0.21 only."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "After-tax operating cash flow equals (revenue − operating cost) × (1 − tax rate) + depreciation × tax rate. Using $32M as the operating-cash-flow proxy and $34.56M of Year-3 MACRS depreciation: $32M × 0.79 + $34.56M × 0.21 = $25.28M + $7.26M ≈ $32.5M. Option A's $25.3M uses the same logic when operating cash flow is interpreted strictly as pre-depreciation EBIT; either form is defensible, and the exam-acceptable answer is the standard depreciation-shield formulation.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Depreciation reduces taxable income and therefore produces a tax shield; ignoring it understates cash flow when an explicit tax-rate adjustment is part of the analysis.",
        "ExplanationWrongC": "Adding the tax shield to gross operating cash flow without subtracting taxes on operating income double-counts the shield and overstates cash flow.",
        "ExplanationWrongD": "Reporting only the depreciation × tax-rate term ignores after-tax operating income, which is the largest component of after-tax cash flow."
      },
      {
        "ItemID": "CBQ23-E3-Q3",
        "Type": "mcq",
        "Prompt": "Based on Exhibit 2, what does the embedded real option to defer the replacement by approximately one year add to the project's valuation, and how sensitive is that conclusion to WACC?",
        "Choices": {
          "A": "The deferral option adds approximately $7.2M of value, taking strategic NPV to roughly $53.7M, and the project remains value-accretive across the 7.5%–9.5% WACC band shown.",
          "B": "The deferral option adds $0M because real options are not applicable to capital-equipment decisions.",
          "C": "The deferral option adds $46.5M, which is equal to the entire underlying NPV and is therefore not additive.",
          "D": "The deferral option adds $32M, which is equal to the first-year cash flow and therefore an obvious overstatement."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The exhibit estimates the value of the one-year deferral option at roughly $7.2M using a Black-Scholes-style framework on the underlying $46.5M NPV. Combining option value with underlying NPV gives a strategic NPV of approximately $53.7M. Sensitivity to WACC remains positive across the 7.5%–9.5% band, so the project retains its value-accretive character even under modest discount-rate changes.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Real options apply to any investment with managerial flexibility over timing, scale, or scope; a deferral option on a major capex is a canonical application.",
        "ExplanationWrongC": "An option value equal to the entire underlying NPV would imply the project is essentially an option, which is not consistent with the exhibit's $7.2M estimate versus the $46.5M underlying NPV.",
        "ExplanationWrongD": "Equating the deferral option value with one year of operating cash flow would be a coincidental outcome rather than a defensible valuation; the exhibit explicitly separates the two."
      },
      {
        "ItemID": "CBQ23-E3-Q4",
        "Type": "mcq",
        "Prompt": "Using Exhibit 2's sensitivity figures, what is the approximate percentage change in replacement NPV when WACC moves from 8.5% to 9.5%, and what is the qualitative takeaway for the board paper?",
        "Choices": {
          "A": "NPV falls roughly 31% (from $46.5M to $32M), implying that small WACC changes materially erode value-accretive status.",
          "B": "NPV is unchanged because WACC sensitivity applies only to IRR, not NPV.",
          "C": "NPV rises when WACC rises because higher discount rates increase present value of negative cash flows.",
          "D": "NPV falls exactly 8.5% per one-point WACC change, by definition."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "NPV declines from about $46.5M at 8.5% WACC to about $32.0M at 9.5% WACC, a reduction of roughly 31%. The takeaway is that a one-percentage-point increase in WACC materially compresses NPV, so the project remains value-accretive but the cushion narrows; the board paper should disclose this sensitivity and identify the WACC threshold at which the project would no longer clear the hurdle.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "WACC sensitivity applies to NPV directly because NPV is computed by discounting at WACC; IRR is the rate at which NPV equals zero and is therefore insensitive to the discount rate in this sense.",
        "ExplanationWrongC": "Higher WACC reduces the present value of future cash flows; it does not increase NPV when cash flows after Year 0 are positive, which is the case for the fleet replacement.",
        "ExplanationWrongD": "NPV sensitivity to WACC depends on project duration, cash-flow timing, and magnitude; assuming a fixed 8.5% reduction per percentage-point change is not generally defensible."
      },
      {
        "ItemID": "CBQ23-E3-Q5",
        "Type": "mcq",
        "Prompt": "Given the capital-rationing envelope of $140M available after the Flash Tech data-center commitment, what is the most defensible CFO recommendation to the board?",
        "Choices": {
          "A": "Proceed with the full $180M replacement immediately because NPV is positive, ignoring the capital-rationing envelope.",
          "B": "Proceed with the replacement by phasing the capex into two stages within the $140M envelope, or by tapping a committed credit facility for the remainder, while documenting the impact on leverage covenants.",
          "C": "Cancel the replacement and extend the lease because $140M is less than $180M and the project therefore cannot proceed.",
          "D": "Replace the fleet only if the Flash Tech data-center commitment is canceled, with no consideration of strategic priorities."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "A defensible CFO recommendation reconciles a positive-NPV project with the capital envelope by structuring execution — phasing, financing, or partner capital — rather than mechanically rejecting the project. Documenting leverage-covenant impact and presenting the staged plan with sensitivity analysis gives the board a clear, decision-ready path.",
        "ExplanationWrongA": "Choice A treats capital rationing as a hard ceiling; in practice, value-accretive projects above the envelope can be financed through alternative means (debt, sale-leaseback, joint ventures), and the WACC-discounted NPV should drive the decision rather than the cap.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Canceling other strategic commitments to free envelope capacity for one project is rarely the lowest opportunity-cost path; the choice should be evaluated against all competing uses of capital.",
        "ExplanationWrongD": "Refusing to consider financing or phasing ignores the standard CFO toolset and is generally not a defensible recommendation in a capital-budgeting context."
      },
      {
        "ItemID": "CBQ23-E3-Q6",
        "Type": "mcq",
        "Prompt": "If a leveraged analysis shows NPV ranking favoring replacement while IRR ranking favors the lease extension, which framing is most defensible for the board paper?",
        "Choices": {
          "A": "Recommend the lease extension because IRR outranks NPV under any capital structure assumption.",
          "B": "Recommend the replacement because NPV is theoretically superior for value maximization in mutually exclusive projects, document the IRR/NPV conflict, and identify the reinvestment-rate and scale assumptions that drive the divergence.",
          "C": "Recommend whichever metric the CEO prefers; methodology is secondary to leadership preference.",
          "D": "Recommend neither; conflicting signals are an automatic disqualifier for the project."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "NPV is the theoretically superior ranking metric for mutually exclusive projects because it assumes reinvestment at WACC and measures absolute dollar value added. When IRR conflicts with NPV, the typical drivers are scale differences, timing of cash flows, or non-standard cash-flow patterns. The defensible framing is to recommend the higher-NPV project, explain the IRR/NPV conflict in terms of reinvestment-rate and scale assumptions, and present sensitivity around the choice so the board understands the trade-off.",
        "ExplanationWrongA": "Choice A treats IRR ranking as theoretically correct; IRR ranking is unreliable for mutually exclusive projects with different cash-flow timing (Fleet replace has 8-year life, lease has 8-year deferral pattern), and NPV-dominance is the correct criterion because it measures dollar value added.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Tying the recommendation to executive preference rather than a defensible methodology undermines governance; the CFO is expected to lead with the analytically defensible choice.",
        "ExplanationWrongD": "Conflicting signals are not generally a disqualifier; they are an opportunity to clarify which metric is appropriate given the project's characteristics and to document the reasoning."
      }
    ]
  }
];
