on_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the value-engineering gap per unit — the amount by which the current cost exceeds the allowable cost.",
        "Correct": "6.30",
        "Explanation": "Value-engineering gap = Current cost − Allowable cost = $37.50 − $31.20 = $6.30 per unit. This gap represents the cost reduction that engineering must achieve through design changes, material substitution, or process improvement before the product can be launched at the required margin. Over 180,000 units, the total gap is $6.30 × 180,000 = $1,134,000 — a material shortfall that Diane must address before approving production. A common error is to compute the gap relative to selling price rather than relative to the allowable cost.",
        "Topic": "Value engineering",
        "Subtopic": "Gap computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Value-Engineering Gap = Current Cost − Allowable Cost",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "value engineering",
          "cost gap"
        ],
        "Dependencies": [
          "CBQ22-C4-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-C4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which component should SmartSense target FIRST for value-engineering cost reduction?",
        "Correct": "B",
        "Choices": [
          "Packaging and shipping prep ($1.70) because it has the lowest absolute cost and is easiest to change",
          "Printed circuit board (PCB) at $8.40 and the temperature sensor module at $12.80 because together they represent 56.5% of total cost and offer the greatest absolute reduction potential",
          "Quality testing ($2.80) because reducing inspection is the fastest way to cut cost",
          "Assembly labor ($6.20) because automation always yields the highest ROI"
        ],
        "Explanation": "Value engineering focuses on components with the largest cost share because even a modest percentage reduction yields the greatest absolute savings. The sensor module ($12.80) and PCB ($8.40) together total $21.20, or 56.5% of the $37.50 current cost. A 20% reduction across these two components saves $4.24 per unit — covering 67% of the $6.30 gap by itself. Targeting packaging ($1.70) or testing ($2.80) first would require implausibly large percentage cuts to close the gap. Assembly labor reduction depends on capital investment lead times that may exceed the launch window.",
        "Topic": "Value engineering",
        "Subtopic": "Component prioritization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "value engineering",
          "prioritization"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "When evaluating whether to proceed with the sensor, which statement about life-cycle pricing is correct?",
        "Correct": "D",
        "Choices": [
          "Life-cycle pricing only considers manufacturing cost — tooling and warranty are period expenses",
          "The $48.00 market price should be compared to the $37.50 manufacturing cost alone, ignoring upstream and downstream costs",
          "Life-cycle pricing assigns all non-manufacturing costs to the period incurred rather than allocating them to units",
          "Life-cycle pricing considers all costs from product inception through end-of-life — including tooling, certification, warranty, and disposal — and allocates them across expected unit volume to determine true per-unit profitability"
        ],
        "Explanation": "Life-cycle pricing evaluates profitability across the entire product life, not just the manufacturing phase. SmartSense's life-cycle costs include $420,000 in tooling, $180,000 in certification, $288,000 in warranty ($96,000 × 3 years), and $153,000 in recycling compliance ($0.85 × 180,000 units) — totaling $1,041,000 beyond manufacturing. Spread over 180,000 units, these add $5.78 per unit. The true life-cycle cost per unit is $37.50 + $5.78 = $43.28, which exceeds the $31.20 allowable cost by an even wider margin. Ignoring life-cycle costs understates the true cost and overstates projected profitability.",
        "Topic": "Life-cycle pricing",
        "Subtopic": "Conceptual framework",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "life-cycle pricing",
          "full cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which THREE costs are relevant to SmartSense's decision to proceed with or reject the sensor launch? Select exactly three.",
        "Correct": [
          "The $6.30 per-unit value-engineering gap between current and allowable cost",
          "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
          "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
        ],
        "Choices": {
          "A": "The $6.30 per-unit value-engineering gap between current and allowable cost",
          "B": "The $37.50 per-unit manufacturing cost because it is a sunk cost once the design is finalized",
          "C": "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
          "D": "The $48.00 market price because it is fixed by competitors and cannot be changed",
          "E": "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
        },
        "Explanation": "Relevant costs are future costs that differ between alternatives. The $6.30 gap (choice A) is relevant because it quantifies the cost reduction needed to make the project viable — it changes depending on whether SmartSense proceeds. The $420,000 tooling (choice C) is relevant because it is an avoidable future cost: if SmartSense cancels, the tooling expenditure is avoided entirely. The $0.85 recycling cost (choice E) is relevant because it is incurred only if production proceeds. The $37.50 manufacturing cost (B) is NOT relevant because it represents the current design estimate, not a differential cost between proceed and reject. The $48.00 market price (D) is a revenue parameter, not a cost — it is given and cannot be altered by SmartSense's decision.",
        "Topic": "Relevant costing",
        "Subtopic": "Cost identification",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing",
          "differential analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on the analysis, which recommendation should Diane present to the board?",
        "Correct": "C",
        "Choices": [
          "Proceed immediately — the $48.00 market price exceeds the $37.50 manufacturing cost, so the product is profitable on a per-unit basis",
          "Reject the product — the value-engineering gap of $6.30 is too large to close through component redesign",
          "Delay launch by two quarters to allow engineering to close the value-engineering gap through PCB redesign and sensor-module sourcing changes, contingent on achieving at least $5.00 of the $6.30 gap in renegotiated component contracts, and re-evaluate life-cycle costs after tooling commitments are finalized",
          "Launch at a higher price of $52.00 to cover the full life-cycle cost of $43.28 per unit while maintaining the 35% margin"
        ],
        "Explanation": "The correct recommendation balances the value-engineering gap against the life-cycle cost reality. Choice C is correct because it (a) acknowledges the gap must be closed before launch, (b) targets the highest-cost components (PCB and sensor module) for the most impactful reductions, (c) conditions the go-ahead on achieving concrete savings, and (d) schedules a re-evaluation after tooling commitments — the point of no return for the $420,000 investment. Choice A ignores the margin shortfall. Choice B is premature — the gap is addressable through component renegotiation. Choice D is unrealistic: competitors are at $48.00, and a $52.00 price likely destroys volume. A common exam trap is to focus only on manufacturing cost and ignore life-cycle costs entirely.",
        "Topic": "Target costing",
        "Subtopic": "Board recommendation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation",
          "target costing"
        ],
        "Dependencies": [
          "CBQ22-C4-Q1",
          "CBQ22-C4-Q2",
          "CBQ22-C4-Q4"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-C5",
    "Title": "Product Mix Under Two Constraints at Alpine Plastics",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Formulate a linear programming problem with two decision variables and two binding constraints",
      "Determine the optimal product mix using the graphical method and corner-point evaluation",
      "Interpret the shadow price of a binding constraint",
      "Conduct what-if analysis on constraint relaxation"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Alpine Plastics runs two extrusion lines producing industrial bins (Product A) and storage totes (Product B). Both products share two bottlenecks: extrusion machine hours and packaging line hours. Operations VP Raj Mehta must determine the product mix that maximizes total contribution margin given the available capacity and demand limits for each product.",
    "Industry": "Plastics manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Alpine Plastics",
    "Stakeholder": "Operations VP Raj Mehta",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "linear programming",
      "product mix",
      "shadow price",
      "constraint analysis"
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
    "question_state": "Archived",
    "archive_batch": "DL-P2-024-DEDUP",
    "archive_date": "2026-09-30",
    "archive_reason": "DL-P2-024 whole-case duplicate; survivor retained in p2/case_pack_p2_authored.js or p2/case_pack_p2_C4_C8.js",
    "certification_date": "2026-09-05",
    "certification_session": "P2-CERT-AUDIT-CASE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Calculate contribution margin per unit for each product",
      "Identify the feasible region and evaluate corner points graphically",
      "Determine which constraint is binding at the optimal solution",
      "Interpret the shadow price of the binding constraint for capacity decisions"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C5-E1",
        "CaseID": "CBQ22-C5",
        "Type": "table",
        "Title": "Exhibit 1 — Resource Requirements and Capacity",
        "Purpose": "Provides the per-unit resource requirements for each product on each machine and the total available hours per period.",
        "ReferencedBy": [
          "CBQ22-C5-Q1",
          "CBQ22-C5-Q2",
          "CBQ22-C5-Q3"
        ],
        "Headers": [
          "Resource",
          "Product A (per unit)",
          "Product B (per unit)",
          "Available Hours"
        ],
        "Rows": [
          [
            "Extrusion machine hours",
            "2.0",
            "3.0",
            "3,000"
          ],
          [
            "Packaging line hours",
            "1.5",
            "1.0",
            "2,400"
          ],
          [
            "Demand limit (units)",
            "1,200",
            "800",
            "—"
          ]
        ],
        "DataFormat": "Hours per unit; demand in units; available in hours per period",
        "AccuracyCheck": "Constraints are consistent with corner-point solution — see analysis"
      },
      {
        "ExhibitID": "CBQ22-C5-E2",
        "CaseID": "CBQ22-C5",
        "Type": "table",
        "Title": "Exhibit 2 — Unit Economics",
        "Purpose": "Provides selling price and variable cost data for computing contribution margin per unit.",
        "ReferencedBy": [
          "CBQ22-C5-Q1",
          "CBQ22-C5-Q4"
        ],
        "Headers": [
          "Item",
          "Product A",
          "Product B"
        ],
        "Rows": [
          [
            "Selling price per unit",
            "$85.00",
            "$62.00"
          ],
          [
            "Variable material cost",
            "$34.00",
            "$22.00"
          ],
          [
            "Variable labor cost",
            "$15.00",
            "$12.00"
          ],
          [
            "Variable overhead",
            "$12.00",
            "$10.00"
          ]
        ],
        "DataFormat": "USD per unit",
        "AccuracyCheck": "CM_A = 85 − 34 − 15 − 12 = $24; CM_B = 62 − 22 − 12 − 10 = $18"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the contribution margin per unit for Product A.",
        "Correct": "24",
        "Explanation": "Contribution margin per unit = Selling price − Variable costs = $85.00 − ($34.00 + $15.00 + $12.00) = $85.00 − $61.00 = $24.00. This per-unit contribution is what each unit of Product A contributes toward covering fixed costs and generating profit. The CM is the basis for comparing products when a constraint exists — ranking by CM per unit alone can be misleading when products consume scarce resources at different rates. A common trap is to use gross margin (which includes fixed overhead allocation) instead of contribution margin.",
        "Topic": "Contribution margin",
        "Subtopic": "Per-unit computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Contribution Margin = Selling Price − Total Variable Costs",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "contribution margin",
          "per unit"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the maximum total contribution margin Alpine can achieve under the given constraints.",
        "Correct": "32400",
        "Explanation": "The maximum total contribution margin is found by evaluating the feasible corner points: (0,0) = $0; (1,200 A, 0 B) = $28,800; (0, 800 B) = $14,400; and (1,200 A, 200 B) = $32,400, where A's demand limit binds and the remaining extrusion hours (3,000 − 2,400 = 600) produce 200 units of B at 3 hours each. Packaging at this corner uses 1,200 × 1.5 + 200 × 1.0 = 2,000 of 2,400 hours, leaving 400 hours of slack. Total CM = 1,200 × $24 + 200 × $18 = $28,800 + $3,600 = $32,400. The maximum is $32,400 at 1,200 units of A and 200 units of B, where extrusion (3,000 hours) and A's demand limit (1,200 units) are both binding. A common trap is to stop at (1,200, 0) = $28,800 without checking that leftover extrusion hours can still produce B, or to include the infeasible constraint intersection.",
        "Topic": "Linear programming",
        "Subtopic": "Optimal mix",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-06: WACM and graphical LP method",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "linear programming",
          "optimal mix"
        ],
        "Dependencies": [
          "CBQ22-C5-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-C5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "At the optimal product mix, which constraint is binding?",
        "Correct": "A",
        "Choices": [
          "The extrusion machine hours are fully utilized at 3,000 hours, making extrusion the binding constraint",
          "The packaging line hours are fully utilized at 2,400 hours, making packaging the binding constraint",
          "Both constraints are binding simultaneously at the optimal solution",
          "Neither constraint is binding because the optimal mix falls within all capacity limits"
        ],
        "Explanation": "At the optimal mix of 1,200 units of A and 200 units of B, extrusion hours consumed = 1,200 × 2.0 + 200 × 3.0 = 3,000 hours exactly — fully utilizing the 3,000-hour capacity. Packaging hours consumed = 1,200 × 1.5 + 200 × 1.0 = 2,000 hours, leaving 400 hours of slack. A binding constraint is one that is satisfied as an equality at the optimal solution — any reduction in the binding resource would force a lower objective value. The extrusion constraint limits Alpine's ability to produce more of either product, making it the bottleneck. A common error is to assume the tighter constraint (packaging, with 2,400 available vs. 3,000) is automatically binding.",
        "Topic": "Constraint analysis",
        "Subtopic": "Binding constraint identification",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "binding constraint",
          "LP sensitivity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the shadow price of the binding extrusion constraint?",
        "Correct": "A",
        "Choices": [
          "$6.00 per hour — each additional extrusion hour increases total contribution margin by $6.00 because the demand constraint on Product A is binding",
          "$0.00 per hour — the constraint is not truly limiting because packaging has slack",
          "$24.00 per hour — equal to the contribution margin per unit of Product A",
          "$12.00 per hour — the average of the two products' contribution margins"
        ],
        "Explanation": "At the optimal mix of 1,200 A and 200 B, both extrusion capacity (3,000 hours) and Product A's demand limit (1,200 units) are binding. An additional extrusion hour cannot produce more A because A's demand is already saturated, so the hour is used to produce 1/3 of a unit of B (3 hours per unit), adding $18 ÷ 3 = $6.00 of contribution margin. The shadow price of the binding extrusion constraint is therefore $6.00 per hour. The $12.00 figure is the trap: it is valid only if the added hour could be used for A ($24 ÷ 2 hours), but A's demand cap prevents that. $0.00 is wrong because extrusion is fully utilized, and $24.00 confuses per-unit CM with CM per hour.",
        "Topic": "Shadow price",
        "Subtopic": "Interpretation",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Shadow Price = ΔObjective / ΔConstraint RHS",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "shadow price",
          "sensitivity analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which THREE statements about Alpine's product mix are correct under what-if analysis? Select exactly three.",
        "Correct": [
          "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
          "If Product A's contribution margin per unit falls below $12.00, Product B becomes more profitable per extrusion hour and the optimal mix shifts toward producing more of Product B",
          "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
        ],
        "Choices": {
          "A": "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
          "B": "Increasing packaging capacity will always improve the optimal objective value",
          "C": "If Product A's contribution margin per unit falls below $12.00, Product B becomes more profitable per extrusion hour and the optimal mix shifts toward producing more of Product B",
          "D": "The shadow price of the extrusion constraint remains constant for all possible increases in capacity",
          "E": "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
        },
        "Explanation": "Statement A is correct: with 3,600 extrusion hours, A's demand limit of 1,200 units becomes the new binding constraint (1,200 × 2 = 2,400 hours for A, leaving 1,200 hours for 400 units of B). Statement C (repaired) is correct: A earns $24 ÷ 2 = $12 per extrusion hour versus B's $18 ÷ 3 = $6; if A's per-unit CM fell below $12, B's per-hour return would exceed A's and the mix would shift toward B. Statement E is correct: with no cap on A, all 3,000 hours produce 1,500 units of A and $36,000 of CM, above the constrained $32,400 optimum. Statement B is false: packaging has 400 hours of slack, so more packaging capacity cannot improve the objective. Statement D is false: the shadow price changes once capacity is relaxed enough that extrusion is no longer the limiting factor. The original statement C was false — if B's CM rose to $24, B would earn $24 ÷ 3 = $8 per hour, still below A's $12 per hour, so the mix would not shift toward B.",
        "Topic": "What-if analysis",
        "Subtopic": "Sensitivity analysis",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity analysis",
          "what-if"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each constraint concept from Alpine's analysis to its correct value or description.",
        "LeftItems": [
          "Binding constraint",
          "Shadow price of the binding constraint",
          "Slack on the non-binding constraint",
          "Maximum CM if packaging were also binding"
        ],
        "RightItems": [
          "Extrusion machine hours at 3,000 utilized",
          "The marginal value of one additional extrusion hour in terms of CM gain",
          "400 unused packaging hours at the optimal mix",
          "Total CM at the intersection of both constraints",
          "Demand limit on Product B at 800 units",
          "The average CM across both products"
        ],
        "Correct": {
          "Binding constraint": "Extrusion machine hours at 3,000 utilized",
          "Shadow price of the binding constraint": "The marginal value of one additional extrusion hour in terms of CM gain",
          "Slack on the non-binding constraint": "400 unused packaging hours at the optimal mix",
          "Maximum CM if packaging were also binding": "Total CM at the intersection of both constraints"
        },
        "Explanation": "The binding constraint is the one satisfied as an equality at the optimum — extrusion at 3,000 hours. The shadow price measures the marginal improvement in the objective per unit increase in the binding resource. Slack on a non-binding constraint is the unused capacity — packaging has 2,400 − 2,000 = 400 hours of slack. If packaging were also binding, the optimal would shift to the intersection of both resource constraints, yielding a different total CM. Distractors: the demand limit on B is not binding at the optimum (only 200 of 800 units used), and the average CM across products is a descriptive statistic, not a constraint concept.",
        "Topic": "Constraint analysis",
        "Subtopic": "Concept mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "constraint analysis",
          "mapping"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-C6",
    "Title": "Staged Market Entry Decision at Cascade Therapeutics",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Construct a decision tree with probability-weighted outcomes",
      "Compute expected monetary value for each decision alternative",
      "Derive the expected value of perfect information (EVPI)",
      "Apply maximin, maximax, and minimax regret decision criteria"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Cascade Therapeutics must decide whether to enter a new specialty pharmaceutical market. Three options are on the table: (a) enter immediately with a full $12 million investment, (b) spend $1.5 million on a 6-month pilot study before deciding to enter or withdraw, or (c) wait 12 months for a competitor's clinical trial results before committing. CEO Amara Okafor needs a decision-tree analysis that weighs probability-weighted payoffs against the costs of staged entry.",
    "Industry": "Pharmaceuticals",
    "CompanyType": "Manufacturer",
    "CompanyName": "Cascade Therapeutics",
    "Stakeholder": "CEO Amara Okafor",
    "BusinessFunction": "Strategic planning",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "decision trees",
      "expected value",
      "EVPI",
      "maximin",
      "real options"
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
    "question_state": "Archived",
    "archive_batch": "DL-P2-024-DEDUP",
    "archive_date": "2026-09-30",
    "archive_reason": "DL-P2-024 whole-case duplicate; survivor retained in p2/case_pack_p2_authored.js or p2/case_pack_p2_C4_C8.js",
    "certification_date": "2026-09-05",
    "certification_session": "P2-CERT-AUDIT-CASE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Construct decision trees with chance nodes and decision nodes",
      "Compute expected monetary value from probability-weighted payoffs",
      "Derive and interpret the expected value of perfect information",
      "Compare maximin, maximax, and minimax regret criteria for risk-averse and risk-seeking decision-makers"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C6-E1",
        "CaseID": "CBQ22-C6",
        "Type": "table",
        "Title": "Exhibit 1 — Market Probability Scenarios",
        "Purpose": "Provides the probability distribution over market-size scenarios and the corresponding NPV payoffs for each decision alternative.",
        "ReferencedBy": [
          "CBQ22-C6-Q1",
          "CBQ22-C6-Q2",
          "CBQ22-C6-Q3"
        ],
        "Headers": [
          "Market Scenario",
          "Probability",
          "Enter Immediately NPV",
          "Pilot Then Enter/Withdraw NPV",
          "Wait 12 Months NPV"
        ],
        "Rows": [
          [
            "Large market",
            "0.30",
            "$28,000,000",
            "$24,800,000",
            "$18,000,000"
          ],
          [
            "Medium market",
            "0.45",
            "$8,000,000",
            "$5,200,000",
            "$6,000,000"
          ],
          [
            "Small market",
            "0.25",
            "−$10,000,000",
            "−$1,500,000",
            "$1,000,000"
          ]
        ],
        "DataFormat": "Probabilities sum to 1.00; NPV in USD after all costs including the $12M entry investment or $1.5M pilot cost",
        "AccuracyCheck": "EV computation: 0.30×28M + 0.45×8M + 0.25×(−10M) = 8.4 + 3.6 − 2.5 = 9.5M for immediate entry"
      },
      {
        "ExhibitID": "CBQ22-C6-E2",
        "CaseID": "CBQ22-C6",
        "Type": "text",
        "Title": "Exhibit 2 — Pilot Study Information",
        "Purpose": "Describes the pilot study's capabilities and limitations, providing context for interpreting the staged-entry option.",
        "ReferencedBy": [
          "CBQ22-C6-Q4",
          "CBQ22-C6-Q5",
          "CBQ22-C6-Q6"
        ],
        "Body": "The pilot study costs $1.5 million and takes 6 months. It provides a signal (favorable or unfavorable) about market demand, but the signal is not perfectly accurate: given a truly large market, the pilot signals favorable 80% of the time and unfavorable 20% of the time. Given a medium market, the pilot signals favorable 50% of the time and unfavorable 50% of the time. Given a small market, the pilot signals favorable 20% of the time and unfavorable 80% of the time. After receiving the pilot signal, Cascade decides whether to proceed with full entry (total additional investment of $12 million) or withdraw. If Cascade withdraws, the only cost is the $1.5 million pilot expense. The wait option costs nothing upfront but delays revenue by 12 months, resulting in discounted payoffs shown in Exhibit 1."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C6-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the expected monetary value (EMV) of the immediate-entry alternative, in millions of dollars.",
        "Correct": "9500000",
        "Explanation": "EMV of immediate entry = Σ(Probability × NPV) = (0.30 × $28,000,000) + (0.45 × $8,000,000) + (0.25 × (−$10,000,000)) = $8,400,000 + $3,600,000 − $2,500,000 = $9,500,000. The expected value is a probability-weighted average of all possible outcomes. Even though there is a 25% chance of a $10 million loss, the large-market upside ($28M × 0.30 = $8.4M) drives the EMV to a positive $9.5M. This is the value Cascade should compare against the EMV of the pilot and wait alternatives. A common error is to weight the payoffs by equal probability (1/3 each) instead of using the given distribution.",
        "Topic": "Expected value",
        "Subtopic": "EMV computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-10: Expected Value = Σ(Pi × Outcomei)",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected value",
          "EMV"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the expected value of perfect information (EVPI), in dollars.",
        "Correct": "2750000",
        "Explanation": "EVPI = EV with perfect information − EV without perfect information. With perfect information Cascade knows the market state before choosing: large → enter at $28M, medium → enter at $8M, small → wait at $1M. EVwPI = 0.30 × $28M + 0.45 × $8M + 0.25 × $1M = $8.4M + $3.6M + $0.25M = $12.25M. EVwoPI is the best expected value without information — immediate entry at $9.5M, since the wait option is $8.35M and the pilot is $9.41M, both below $9.5M. EVPI = $12.25M − $9.5M = $2.75M. A common trap is to confuse EVPI with EVwPI ($12.25M), or to anchor on the single best payoff ($28M) instead of the probability-weighted best outcomes.",
        "Topic": "Expected value of perfect information",
        "Subtopic": "EVPI computation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-11: EVPI = EVwPI − EVwoPI",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "EVPI",
          "perfect information"
        ],
        "Dependencies": [
          "CBQ22-C6-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-C6-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on the expected value analysis, which entry strategy should Cascade pursue?",
        "Correct": "B",
        "Choices": [
          "Wait 12 months — it has the lowest downside risk across all scenarios",
          "Enter immediately — it has the highest EMV at $9.5 million and should be selected regardless of risk attitude",
          "Conduct the pilot study — it reduces the expected loss in the small-market scenario while preserving upside in the large-market scenario, and the $1.5 million pilot cost is less than the EVPI of $2.75 million",
          "Enter immediately — the $28 million large-market payoff dominates all other alternatives"
        ],
        "Explanation": "The pilot option's EMV is computed from the posterior probabilities. P(favorable) = 0.30×0.80 + 0.45×0.50 + 0.25×0.20 = 0.515; P(unfavorable) = 0.485. After a favorable signal: P(large)=0.24/0.515=46.6%, P(medium)=0.225/0.515=43.7%, P(small)=0.05/0.515=9.7%; entering yields 0.466×$24.8M + 0.437×$5.2M + 0.097×(−$1.5M) = $13.68M versus −$1.5M to withdraw, so Cascade enters. After an unfavorable signal: P(large)=0.06/0.485=12.4%, P(medium)=0.225/0.485=46.4%, P(small)=0.20/0.485=41.2%; entering yields 0.124×$24.8M + 0.464×$5.2M + 0.412×(−$1.5M) = $4.86M versus −$1.5M to withdraw, so Cascade still enters. Pilot EMV = 0.515×$13.68M + 0.485×$4.86M = $9.41M, which is BELOW immediate entry's $9.5M. Under the EMV criterion the optimal strategy is to enter immediately (Choice B). Choice C overstates the pilot's value: the pilot cost of $1.5M is below EVPI, but the pilot does not lift the decision above the $9.5M no-information optimum. Choice A is the maximin alternative, not the EMV choice.",
        "Topic": "Decision tree analysis",
        "Subtopic": "Optimal strategy",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "decision tree",
          "strategy"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "If Cascade uses the maximin criterion (pessimistic), which alternative should it choose?",
        "Correct": "B",
        "Choices": [
          "Enter immediately — it has the highest possible payoff of $28 million",
          "Wait 12 months — its worst-case payoff of $1 million is better than the worst cases of immediate entry (−$10M) and pilot (−$1.5M)",
          "Conduct the pilot — its worst case of −$1.5M is better than immediate entry's −$10M",
          "Enter immediately — the expected value dominates the other alternatives"
        ],
        "Explanation": "The maximin criterion selects the alternative with the best worst-case payoff (maximize the minimum). Immediate entry's worst case is −$10M (small market). The pilot's worst case is −$1.5M (small market, unfavorable signal, withdraw). Wait's worst case is $1M (small market). Maximin = max(−$10M, −$1.5M, $1M) = $1M → choose Wait. The maximin criterion is appropriate for risk-averse decision-makers who prioritize avoiding the largest loss. It ignores the probability distribution and the upside potential. A common exam trap is to confuse maximin (best worst case) with maximax (best best case), which would choose immediate entry for its $28M upside. The key values from the exhibits are 2750000.",
        "Topic": "Decision criteria",
        "Subtopic": "Maximin",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "maximin",
          "risk aversion"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q5",
        "question_state": "Certified",
        "certification_b