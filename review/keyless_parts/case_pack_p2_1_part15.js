ints and product mix"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Velox Precision manufactures two products—Alpha and Beta—at its Midwest facility. Each requires CNC machining and final inspection, both capacity-constrained. The plant manager must determine the optimal product mix and evaluate whether acquiring additional CNC hours at $15/hr would be profitable.",
    "Industry": "Precision manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Velox Precision",
    "Stakeholder": "Plant Manager",
    "BusinessFunction": "Operations",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "shadow price",
      "linear programming",
      "product mix",
      "capacity constraint"
    ],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-04",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Compute contribution margin per unit of a constrained resource",
      "Determine the optimal product mix using the corner-point method",
      "Identify binding versus non-binding constraints",
      "Calculate the shadow price of a binding resource constraint",
      "Evaluate capacity expansion decisions by comparing shadow price to acquisition cost"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C7-E1",
        "CaseID": "CBQ21-C7",
        "Type": "table",
        "Title": "Exhibit 1 — Production Resource Requirements",
        "Purpose": "Provides per-unit resource requirements, CMs, and monthly capacity for CNC machining and inspection.",
        "ReferencedBy": [
          "CBQ21-C7-Q1",
          "CBQ21-C7-Q2",
          "CBQ21-C7-Q3",
          "CBQ21-C7-Q4",
          "CBQ21-C7-Q5",
          "CBQ21-C7-Q6"
        ],
        "Headers": [
          "Resource",
          "Alpha (per unit)",
          "Beta (per unit)",
          "Monthly Capacity"
        ],
        "Rows": [
          [
            "CNC machining hours",
            "4",
            "2",
            "120"
          ],
          [
            "Inspection hours",
            "2",
            "4",
            "80"
          ],
          [
            "Contribution margin",
            "$60",
            "$48",
            "—"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-C7-E2",
        "CaseID": "CBQ21-C7",
        "Type": "table",
        "Title": "Exhibit 2 — Market Demand and Expansion Options",
        "Purpose": "Provides demand limits and cost of acquiring additional CNC machining hours.",
        "ReferencedBy": [
          "CBQ21-C7-Q2",
          "CBQ21-C7-Q5",
          "CBQ21-C7-Q6"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Maximum monthly demand — Alpha",
            "20 units"
          ],
          [
            "Maximum monthly demand — Beta",
            "15 units"
          ],
          [
            "Cost of additional CNC machining hour",
            "$15 per hour"
          ],
          [
            "Additional inspection hours available",
            "Not available from current supplier"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C7-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "What is the contribution margin per inspection hour for product Alpha? Round to two decimals.",
        "Correct": "30.00",
        "Explanation": "Alpha generates $60 CM per unit and requires 2 inspection hours per unit. CM per inspection hour = $60 / 2 = $30.00. For comparison, Beta yields $48 / 4 = $12.00 per inspection hour. Alpha is 2.5 times more efficient at converting inspection hours into contribution margin. This per-unit-of-resource analysis is the first step when a single resource is scarce, though with two constraints the final mix requires simultaneous consideration of all resource limits.",
        "Topic": "Contribution margin per constrained resource",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CM per unit of constrained resource",
        "CommonTrapReference": "Using the wrong resource denominator (e.g., CNC hours instead of inspection hours)."
      },
      {
        "ItemID": "CBQ21-C7-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "At the optimal product mix, what is the total monthly contribution margin? Enter as a whole number.",
        "Correct": "1680",
        "Explanation": "The feasible region has five corner points: (0,0), (20,0), (20,10), (10,15), and (0,15). Evaluating Z = 60A + 48B: $0, $1,200, $1,680, $1,320, and $720 respectively. The maximum occurs at 20 Alpha and 10 Beta for total CM of $1,680. At this point, inspection hours = 2(20) + 4(10) = 80 (fully consumed), CNC hours = 4(20) + 2(10) = 100 out of 120 available. The Alpha demand constraint at 20 units is also binding.",
        "Topic": "Optimal product mix — corner-point method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Linear programming — corner-point method",
        "CommonTrapReference": "Evaluating only interior points and missing corner solutions."
      },
      {
        "ItemID": "CBQ21-C7-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "At the optimal product mix, which resource constraint is binding?",
        "Correct": "B",
        "Choices": [
          "CNC machining hours, because all 120 hours are consumed",
          "Inspection hours, because all 80 hours are consumed",
          "Both CNC machining and inspection hours are fully consumed",
          "Neither resource constraint is binding; both have remaining capacity"
        ],
        "Explanation": "At the optimal mix of 20 Alpha and 10 Beta, CNC hours used = 4(20) + 2(10) = 100 out of 120 available, leaving 20 hours of slack. Inspection hours used = 2(20) + 4(10) = 80 out of 80 available, leaving zero slack. A constraint is binding when it holds with equality at the optimal solution. Since inspection hours are fully consumed, inspection is the binding constraint. The CNC constraint is non-binding, meaning additional CNC hours would not increase the objective function value.",
        "Topic": "Binding versus non-binding constraints",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Linear programming — constraint slack analysis",
        "CommonTrapReference": "Assuming the first-listed constraint is the binding one."
      },
      {
        "ItemID": "CBQ21-C7-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the shadow price of one additional inspection hour?",
        "Correct": "C",
        "Choices": [
          "$0.00 per hour",
          "$6.00 per hour",
          "$12.00 per hour",
          "$30.00 per hour"
        ],
        "Explanation": "Shadow price = increase in total CM from one additional unit of the binding constraint. Increasing inspection from 80 to 81 hours with Alpha at 20 units (demand binding): 2(20) + 4B = 81, so B = 10.25. New total CM = 60(20) + 48(10.25) = $1,692. Shadow price = $1,692 - $1,680 = $12.00 per inspection hour. This holds as long as the same constraints remain binding (up to about 100 hours, when Beta demand becomes binding).",
        "Topic": "Shadow price computation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Linear programming — shadow price",
        "CommonTrapReference": "Confusing CM per inspection hour ($30) with the shadow price ($12)."
      },
      {
        "ItemID": "CBQ21-C7-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which statements about Velox's capacity situation are correct? (Select all that apply.)",
        "Correct": [
          "A",
          "C",
          "E"
        ],
        "Choices": [
          "The shadow price of CNC machining hours is $0.00 per hour",
          "Acquiring additional CNC machining hours at $15 per hour would increase total CM",
          "At the optimal mix, 20 CNC machining hours remain unused",
          "The optimal product mix is 20 Alpha and 15 Beta",
          "The shadow price of inspection hours is $12.00 per hour"
        ],
        "Explanation": "A is correct: CNC has 20 hours of slack at the optimal mix, so its shadow price is zero — additional CNC hours have no marginal value. B is incorrect: acquiring CNC at $15/hr when the shadow price is $0 increases costs without increasing CM. C is correct: 4(20) + 2(10) = 100 CNC hours used out of 120 available, leaving 20 unused. D is incorrect: the optimal mix is 20 Alpha and 10 Beta, not 15 Beta; producing 15 Beta would require reducing Alpha due to inspection constraint. E is correct: the shadow price of the binding inspection constraint is $12.00/hr.",
        "Topic": "Shadow price interpretation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Linear programming — shadow price and slack",
        "CommonTrapReference": "Assuming all capacity has positive value."
      },
      {
        "ItemID": "CBQ21-C7-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each resource metric to its value at the optimal product mix.",
        "Correct": {
          "CNC machining hours used": "100 hours",
          "Inspection hours used": "80 hours",
          "CNC machining hours slack": "20 hours",
          "Shadow price of inspection hours": "$12.00 per hour"
        },
        "LeftItems": [
          "CNC machining hours used",
          "Inspection hours used",
          "CNC machining hours slack",
          "Shadow price of inspection hours"
        ],
        "RightItems": [
          "100 hours",
          "80 hours",
          "20 hours",
          "$12.00 per hour"
        ],
        "Explanation": "At 20 Alpha and 10 Beta: CNC used = 4(20) + 2(10) = 100 hours. Inspection used = 2(20) + 4(10) = 80 hours (fully consumed). CNC slack = 120 - 100 = 20 hours. Shadow price of inspection = $12.00/hr (the marginal value of one additional inspection hour). Velox should prioritize expanding inspection capacity if available below $12/hr, and should not acquire additional CNC hours at any positive cost given current demand and resource structure.",
        "Topic": "Integrated resource analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Linear programming — resource utilization and shadow price",
        "CommonTrapReference": "Confusing resource used with resource available."
      }
    ],
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-E5",
    "Title": "Deferral and Abandonment Options at Ironridge Mining",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Evaluate real options including deferral, abandonment, and expansion",
      "Compute option-adjusted net present value",
      "Analyze mutually exclusive option interactions"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Ironridge Mining is evaluating a copper mine with a 10-year life. Base-case NPV (without options) is −$8M at 12% WACC. Management has: (a) a deferral option — wait 2 years to see copper prices, then decide; value = $6M; (b) an abandonment option — sell equipment for $4M after year 3; value = $3M; (c) an expansion option — double capacity after year 5 if demand is strong; value = $5M. The CFO must compute option-adjusted NPV and recommend whether to proceed, defer, or reject.",
    "Industry": "Mining and natural resources",
    "CompanyType": "Manufacturer",
    "CompanyName": "Ironridge Mining",
    "Stakeholder": "CFO",
    "BusinessFunction": "Corporate Finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "real options",
      "deferral",
      "abandonment",
      "expansion",
      "option-adjusted NPV"
    ],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-04",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Compute option-adjusted NPV by summing static NPV and embedded option values",
      "Distinguish deferral, abandonment, and expansion options",
      "Identify mutually exclusive real options",
      "Perform sensitivity analysis on individual option values",
      "Formulate an integrated investment recommendation"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-E5-E1",
        "CaseID": "CBQ21-E5",
        "Type": "table",
        "Title": "Exhibit 1 — Copper Mine Project Financial Summary",
        "Purpose": "Provides base-case financial parameters including static NPV before options.",
        "ReferencedBy": [
          "CBQ21-E5-Q1",
          "CBQ21-E5-Q2",
          "CBQ21-E5-Q4"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Initial investment",
            "$50,000,000"
          ],
          [
            "Annual after-tax cash flows (years 1–10)",
            "$7,440,000"
          ],
          [
            "Discount rate (WACC)",
            "12%"
          ],
          [
            "Project life",
            "10 years"
          ],
          [
            "Static NPV (no options)",
            "($8,000,000)"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-E5-E2",
        "CaseID": "CBQ21-E5",
        "Type": "table",
        "Title": "Exhibit 2 — Real Option Valuations",
        "Purpose": "Provides estimated value, exercise trigger, and exercise price/condition for each real option.",
        "ReferencedBy": [
          "CBQ21-E5-Q1",
          "CBQ21-E5-Q2",
          "CBQ21-E5-Q3",
          "CBQ21-E5-Q4",
          "CBQ21-E5-Q5",
          "CBQ21-E5-Q6"
        ],
        "Headers": [
          "Option",
          "Type",
          "Exercise Point",
          "Exercise Price/Condition",
          "Estimated Value"
        ],
        "Rows": [
          [
            "Deferral",
            "Timing (call on waiting)",
            "Year 2",
            "Commit $50M or walk away",
            "$6,000,000"
          ],
          [
            "Abandonment",
            "Put (salvage floor)",
            "Year 3",
            "Sell equipment for $4,000,000",
            "$3,000,000"
          ],
          [
            "Expansion",
            "Call on additional capacity",
            "Year 5",
            "Invest $30,000,000 to double capacity",
            "$5,000,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-E5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the option-adjusted NPV considering all three real options. Enter your answer in dollars.",
        "Correct": "6000000",
        "Explanation": "Option-adjusted NPV = Static NPV + Sum of option values = ($8,000,000) + $6,000,000 + $3,000,000 + $5,000,000 = $6,000,000. Since the result is positive, the project creates value when all embedded options are considered. A common error is using only the static NPV and rejecting the project, ignoring the substantial value in management's flexibility to defer, abandon, or expand.",
        "Topic": "Real options — option-adjusted NPV",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
        "CommonTrapReference": "Using only static NPV and ignoring embedded options."
      },
      {
        "ItemID": "CBQ21-E5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the option-adjusted NPV considering only the deferral and abandonment options (exclude expansion). Enter in dollars.",
        "Correct": "1000000",
        "Explanation": "Option-adjusted NPV = ($8,000,000) + $6,000,000 + $3,000,000 = $1,000,000. Even without the expansion option, the combined deferral and abandonment values ($9,000,000) exceed the $8,000,000 static NPV shortfall by $1,000,000. This demonstrates the project's viability does not depend on a single option but on the aggregate flexibility available to management.",
        "Topic": "Real options — partial option-adjusted NPV",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
        "CommonTrapReference": "Forgetting to exclude the expansion option value when the question asks for deferral + abandonment only."
      },
      {
        "ItemID": "CBQ21-E5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which pair of real options is most likely mutually exclusive for Ironridge Mining?",
        "Correct": "B",
        "Choices": [
          "Deferral and expansion",
          "Deferral and abandonment",
          "Abandonment and expansion",
          "All three options can be exercised simultaneously regardless of management's initial decision"
        ],
        "Explanation": "The deferral and abandonment options are mutually exclusive because exercising the deferral option means management has not yet committed capital. If management defers, there is no operational asset to abandon at year 3 — the abandonment option applies only after the project has commenced and equipment has been purchased. Understanding which options are mutually exclusive is critical because adding the values of non-independent options overstates the true flexibility embedded in the project.",
        "Topic": "Real options — mutually exclusive options",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Real options theory",
        "CommonTrapReference": "Selecting all options as simultaneously exercisable without considering operational reality."
      },
      {
        "ItemID": "CBQ21-E5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "The expansion option's value declines from $5M to $2M due to lower copper demand. Deferral ($6M) and abandonment ($3M) unchanged. Which statement best describes the revised project?",
        "Correct": "A",
        "Choices": [
          "Option-adjusted NPV falls to $3M, but the project remains acceptable because deferral and abandonment alone exceed the static NPV shortfall",
          "Option-adjusted NPV falls to $1M, making the project only marginally acceptable",
          "Option-adjusted NPV falls to negative $2M, and the project should be rejected",
          "Option-adjusted NPV remains at $6M because the deferral option fully compensates for the reduced expansion value"
        ],
        "Explanation": "Revised option-adjusted NPV = ($8M) + $6M + $3M + $2M = $3M. The project remains acceptable because deferral and abandonment alone ($9M) exceed the $8M shortfall by $1M. The expansion provides an additional $2M cushion but is not critical to acceptance. A candidate who computes negative $2M has likely subtracted the $3M reduction rather than adding the remaining $2M expansion value.",
        "Topic": "Real options — sensitivity analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
        "CommonTrapReference": "Subtracting the reduction instead of adding the remaining option value."
      },
      {
        "ItemID": "CBQ21-E5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which statements about the relative value of Ironridge's real options are correct? (Select all that apply.)",
        "Correct": [
          "A",
          "B",
          "C"
        ],
        "Choices": [
          "The deferral option contributes the most value at $6,000,000",
          "The abandonment option contributes the least value at $3,000,000",
          "The expansion option at $5,000,000 exceeds the abandonment option by $2,000,000",
          "The deferral option alone exceeds the sum of the abandonment and expansion options",
          "All three options together contribute $16,000,000"
        ],
        "Explanation": "A is correct: deferral at $6M is the most valuable single option. B is correct: abandonment at $3M is the least valuable. C is correct: expansion $5M exceeds abandonment $3M by $2M. D is incorrect: deferral $6M does NOT exceed abandonment + expansion ($8M). E is incorrect: total is $6M + $3M + $5M = $14M, not $16M.",
        "Topic": "Real options — relative option values",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Real options theory",
        "CommonTrapReference": "Confusing deferral option value with total option value, or miscounting the sum."
      },
      {
        "ItemID": "CBQ21-E5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each decision scenario to the appropriate recommendation for Ironridge's board.",
        "Correct": {
          "All three options exercisable": "Option-adjusted NPV is $6M; recommend acceptance",
          "Expansion drops to $2M": "Option-adjusted NPV is $3M; project remains acceptable",
          "Only one option can be exercised": "No single option offsets the $8M shortfall; reject unless options can be combined",
          "Deferral drops to $2M": "Option-adjusted NPV is $2M; acceptable but with reduced margin"
        },
        "LeftItems": [
          "All three options exercisable",
          "Expansion drops to $2M",
          "Only one option can be exercised",
          "Deferral drops to $2M"
        ],
        "RightItems": [
          "Option-adjusted NPV is $6M; recommend acceptance",
          "Option-adjusted NPV is $3M; project remains acceptable",
          "No single option offsets the $8M shortfall; reject unless options can be combined",
          "Option-adjusted NPV is $2M; acceptable but with reduced margin"
        ],
        "Explanation": "All three: ($8M) + $6M + $3M + $5M = $6M → accept. Expansion $2M: ($8M) + $6M + $3M + $2M = $3M → acceptable. One option only: best case is deferral $6M, yielding ($8M) + $6M = ($2M) → still negative, reject. Deferral $2M: ($8M) + $2M + $3M + $5M = $2M → positive but thin margin.",
        "Topic": "Real options — integrated recommendation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "Option-adjusted NPV",
        "CommonTrapReference": "Thinking a single option can offset the entire static NPV shortfall."
      }
    ],
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  }
];
