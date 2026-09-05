[
  {
    "CaseID": "CBQ22-C4",
    "Title": "Target Costing at SmartSense Electronics",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Compute allowable cost from market price and target margin",
      "Determine value-engineering gap and prioritize cost-reduction candidates",
      "Apply life-cycle pricing to evaluate long-run profitability of a new product",
      "Identify relevant costs in a target-costing framework"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "SmartSense Electronics is launching a new IoT temperature sensor. Market research indicates a competitive selling price of $48.00 per unit, and SmartSense requires a 35% gross margin to meet its return-on-investment hurdle. The engineering team's current cost estimate is $37.50 per unit. CFO Diane Wu must evaluate whether the product can meet the target cost, which components offer the greatest value-engineering opportunities, and how life-cycle costs affect the go-forward recommendation.",
    "Industry": "Consumer electronics",
    "CompanyType": "Manufacturer",
    "CompanyName": "SmartSense Electronics",
    "Stakeholder": "CFO Diane Wu",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["target costing", "value engineering", "life-cycle pricing", "gross margin"],
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
    "question_state": "Unprocessed",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Derive allowable cost from target price and required margin",
      "Compute the value-engineering gap between current and allowable cost",
      "Evaluate which cost components to reduce using value-engineering analysis",
      "Integrate life-cycle costs into a target-costing decision"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C4-E1",
        "CaseID": "CBQ22-C4",
        "Type": "table",
        "Title": "Exhibit 1 — Current Cost Build",
        "Purpose": "Provides the component-level cost breakdown of the proposed IoT sensor, used to compute the total current cost and identify value-engineering targets.",
        "ReferencedBy": [
          "CBQ22-C4-Q1",
          "CBQ22-C4-Q2",
          "CBQ22-C4-Q5"
        ],
        "Headers": ["Component", "Current Cost per Unit"],
        "Rows": [
          ["Temperature sensor module", "$12.80"],
          ["Printed circuit board (PCB)", "$8.40"],
          ["Housing and connectors", "$5.60"],
          ["Assembly labor", "$6.20"],
          ["Quality testing", "$2.80"],
          ["Packaging and shipping prep", "$1.70"],
          ["Total", "$37.50"]
        ],
        "DataFormat": "USD per unit; totals verified as sum of components",
        "AccuracyCheck": "12.80 + 8.40 + 5.60 + 6.20 + 2.80 + 1.70 = 37.50 — confirmed"
      },
      {
        "ExhibitID": "CBQ22-C4-E2",
        "CaseID": "CBQ22-C4",
        "Type": "text",
        "Title": "Exhibit 2 — Market Research Summary",
        "Purpose": "Provides competitive pricing context and life-cycle cost data needed for the life-cycle pricing evaluation.",
        "ReferencedBy": [
          "CBQ22-C4-Q3",
          "CBQ22-C4-Q4",
          "CBQ22-C4-Q6"
        ],
        "Body": "SmartSense's market research indicates that the competitive wholesale price for comparable IoT temperature sensors is $48.00 per unit. Two major competitors (TempTrak and SensiCore) already sell at this price point with similar specifications. SmartSense expects to sell 180,000 units over a 3-year product life. Beyond the manufacturing cost of $37.50 per unit, the following life-cycle costs have been identified: $420,000 in upfront tooling and模具 (mold) design, $180,000 in initial regulatory certification, $96,000 per year in warranty reserves (3-year life), and $0.85 per unit in end-of-life recycling compliance. The company's required return on investment for new products is 15% on total life-cycle costs."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C4-Q1",
        "Type": "numeric",
        "Prompt": "Enter the allowable cost per unit for SmartSense's sensor, given the market price and required gross margin.",
        "Correct": "31.20",
        "Explanation": "Under target costing, the allowable cost equals the market price multiplied by one minus the target gross margin percentage. Allowable cost = $48.00 × (1 − 0.35) = $48.00 × 0.65 = $31.20. This means SmartSense must reduce its per-unit cost from $37.50 to $31.20 — a reduction of $6.30 — to achieve the required 35% margin at the market-clearing price. The allowable cost is the ceiling; any cost above it erodes the target return.",
        "Topic": "Target costing",
        "Subtopic": "Allowable cost computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Allowable Cost = Market Price × (1 − Target Gross Margin %)",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["target costing", "allowable cost"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q2",
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
        "Tags": ["value engineering", "cost gap"],
        "Dependencies": ["CBQ22-C4-Q1"]
      },
      {
        "ItemID": "CBQ22-C4-Q3",
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
        "Tags": ["value engineering", "prioritization"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q4",
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
        "Tags": ["life-cycle pricing", "full cost"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q5",
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
        "Tags": ["relevant costing", "differential analysis"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q6",
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
        "Tags": ["recommendation", "target costing"],
        "Dependencies": ["CBQ22-C4-Q1", "CBQ22-C4-Q2", "CBQ22-C4-Q4"]
      }
    ]
  },
  {
    "CaseID": "CBQ22-C5",
    "Title": "Product Mix Under Two Constraints at Alpine Plastics",
    "SectionTags": ["C"],
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
    "Tags": ["linear programming", "product mix", "shadow price", "constraint analysis"],
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
    "question_state": "Unprocessed",
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
        "Headers": ["Resource", "Product A (per unit)", "Product B (per unit)", "Available Hours"],
        "Rows": [
          ["Extrusion machine hours", "2.0", "3.0", "3,000"],
          ["Packaging line hours", "1.5", "1.0", "2,400"],
          ["Demand limit (units)", "1,200", "800", "—"]
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
        "Headers": ["Item", "Product A", "Product B"],
        "Rows": [
          ["Selling price per unit", "$85.00", "$62.00"],
          ["Variable material cost", "$34.00", "$22.00"],
          ["Variable labor cost", "$15.00", "$12.00"],
          ["Variable overhead", "$12.00", "$10.00"]
        ],
        "DataFormat": "USD per unit",
        "AccuracyCheck": "CM_A = 85 − 34 − 15 − 12 = $24; CM_B = 62 − 22 − 12 − 10 = $18"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C5-Q1",
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
        "Tags": ["contribution margin", "per unit"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q2",
        "Type": "numeric",
        "Prompt": "Enter the maximum total contribution margin Alpine can achieve under the given constraints.",
        "Correct": "30000",
        "Explanation": "The optimal mix occurs at 600 units of A and 400 units of B. At this corner point: extrusion hours = 600 × 2.0 + 400 × 3.0 = 1,200 + 1,200 = 2,400 ≤ 3,000 (slack of 600); packaging hours = 600 × 1.5 + 400 × 1.0 = 900 + 400 = 1,300 ≤ 2,400 (slack of 1,100); demand for A = 600 ≤ 1,200; demand for B = 400 ≤ 800. Total CM = 600 × $24 + 400 × $18 = $14,400 + $7,200 = $21,600. However, evaluating all corner points: (0, 0) = $0; (1,200, 0) = $28,800; (0, 800) = $14,400; (1,200, 200) = $32,400; (600, 600) = $25,200. The maximum is $32,400 at 1,200 units of A and 200 units of B. Verification: extrusion = 1,200 × 2 + 200 × 3 = 3,000 (binding); packaging = 1,200 × 1.5 + 200 × 1 = 2,000 ≤ 2,400; demand A = 1,200 ≤ 1,200 (binding); demand B = 200 ≤ 800.",
        "Topic": "Linear programming",
        "Subtopic": "Optimal mix",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-06: WACM and graphical LP method",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": ["linear programming", "optimal mix"],
        "Dependencies": ["CBQ22-C5-Q1"]
      },
      {
        "ItemID": "CBQ22-C5-Q3",
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
        "Tags": ["binding constraint", "LP sensitivity"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q4",
        "Type": "select",
        "Prompt": "What is the shadow price of the binding extrusion constraint?",
        "Correct": "B",
        "Choices": [
          "$8.00 per hour — each additional extrusion hour increases total contribution margin by $8.00",
          "$0.00 per hour — the constraint is not truly limiting because packaging has slack",
          "$24.00 per hour — equal to the contribution margin per unit of Product A",
          "$12.00 per hour — the average of the two products' contribution margins"
        ],
        "Explanation": "The shadow price is the marginal value of one additional unit of a binding constraint's resource. If Alpine gains one additional extrusion hour (from 3,000 to 3,001), it can produce 0.5 more units of A (at 2 hours each), increasing total CM by 0.5 × $24 = $12.00. Alternatively, it can produce 0.333 more units of B (at 3 hours each), increasing CM by 0.333 × $18 = $6.00. The optimal use of the additional hour is to produce more A, yielding a shadow price of $12.00 per hour. However, this assumes A's demand is not yet saturated — at 1,200 units demand for A is already met at the optimal, so additional hours would go to B, yielding $6.00 per hour. The shadow price is thus $6.00 when A's demand is binding. A common trap is to equate shadow price with per-unit CM without considering the resource consumption rate.",
        "Topic": "Shadow price",
        "Subtopic": "Interpretation",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Shadow Price = ΔObjective / ΔConstraint RHS",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["shadow price", "sensitivity analysis"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q5",
        "Type": "multi",
        "Prompt": "Which THREE statements about Alpine's product mix are correct under what-if analysis? Select exactly three.",
        "Correct": [
          "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
          "If Product B's contribution margin rises to $24 per unit, the optimal mix shifts toward producing more B",
          "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
        ],
        "Choices": {
          "A": "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
          "B": "Increasing packaging capacity will always improve the optimal objective value",
          "C": "If Product B's contribution margin rises to $24 per unit, the optimal mix shifts toward producing more B",
          "D": "The shadow price of the extrusion constraint remains constant for all possible increases in capacity",
          "E": "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
        },
        "Explanation": "Statement A is correct: with 3,600 extrusion hours, the binding constraint shifts from extrusion to Product A's demand limit of 1,200 units (1,200 × 2 = 2,400 hours for A, leaving 1,200 hours for B, or 400 units of B at 3 hours each). Statement C is correct: if B's CM rises to $24, the CM per extrusion hour for B becomes $24/3 = $8, matching A's $24/2 = $12 per hour — B becomes relatively more attractive, shifting the mix. Statement E is correct: without A's demand limit, all 3,000 extrusion hours go to A (3,000/2 = 1,500 units), yielding $36,000 CM — higher than the constrained optimum. Statement B is false: packaging already has slack; adding more slack does not improve the objective. Statement D is false: the shadow price changes once the constraint is relaxed beyond the range where it remains binding.",
        "Topic": "What-if analysis",
        "Subtopic": "Sensitivity analysis",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["sensitivity analysis", "what-if"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C5-Q6",
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
        "Tags": ["constraint analysis", "mapping"],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-C6",
    "Title": "Staged Market Entry Decision at Cascade Therapeutics",
    "SectionTags": ["C"],
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
    "Tags": ["decision trees", "expected value", "EVPI", "maximin", "real options"],
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
    "question_state": "Unprocessed",
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
        "Headers": ["Market Scenario", "Probability", "Enter Immediately NPV", "Pilot Then Enter/Withdraw NPV", "Wait 12 Months NPV"],
        "Rows": [
          ["Large market", "0.30", "$28,000,000", "$24,800,000", "$18,000,000"],
          ["Medium market", "0.45", "$8,000,000", "$5,200,000", "$6,000,000"],
          ["Small market", "0.25", "−$10,000,000", "−$1,500,000", "$1,000,000"]
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
        "Tags": ["expected value", "EMV"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q2",
        "Type": "numeric",
        "Prompt": "Enter the expected value of perfect information (EVPI), in millions of dollars.",
        "Correct": "8500000",
        "Explanation": "EVPI = EV with perfect information − EV without perfect information. With perfect information, Cascade knows the market state before deciding: if large, enter (NPV $28M); if medium, enter ($8M); if small, wait ($1M). EV with PI = (0.30 × $28M) + (0.45 × $8M) + (0.25 × $1M) = $8.4M + $3.6M + $0.25M = $12.25M. EV without PI (best alternative) = $9.5M (immediate entry). EVPI = $12.25M − $9.5M = $2.75M. However, re-reading Exhibit 1, the Wait option yields $1M in the small market vs. −$10M for entry. With perfect info, in the small market Cascade would choose Wait ($1M). So EV with PI = 0.30×$28M + 0.45×$8M + 0.25×$1M = $12.25M. EVPI = $12.25M − $9.5M = $2.75M. A common trap is to use the maximum single payoff ($28M) instead of the probability-weighted best outcomes.",
        "Topic": "Expected value of perfect information",
        "Subtopic": "EVPI computation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-11: EVPI = EVwPI − EVwoPI",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["EVPI", "perfect information"],
        "Dependencies": ["CBQ22-C6-Q1"]
      },
      {
        "ItemID": "CBQ22-C6-Q3",
        "Type": "select",
        "Prompt": "Based on the expected value analysis, which entry strategy should Cascade pursue?",
        "Correct": "C",
        "Choices": [
          "Wait 12 months — it has the lowest downside risk across all scenarios",
          "Enter immediately — it has the highest EMV at $9.5 million and should be selected regardless of risk attitude",
          "Conduct the pilot study — it reduces the expected loss in the small-market scenario while preserving upside in the large-market scenario, and the $1.5 million pilot cost is less than the EVPI of $2.75 million",
          "Enter immediately — the $28 million large-market payoff dominates all other alternatives"
        ],
        "Explanation": "The pilot option has an EMV that must be computed from the posterior probabilities. Given the pilot signal accuracy, a favorable signal shifts probability toward large/medium markets, making entry more attractive, while an unfavorable signal shifts toward small market, favoring withdrawal. The pilot's EMV exceeds $9.5M because it allows Cascade to avoid the $10M loss in the small market (by withdrawing after an unfavorable signal) while capturing most of the large-market upside. The $1.5M pilot cost is less than the $2.75M EVPI, confirming that imperfect information has positive expected value. Choice B is incomplete — while immediate entry has the highest EMV among no-information alternatives, the pilot option provides partial information at a cost below EVPI. Choice A is the maximin criterion, not the EMV criterion.",
        "Topic": "Decision tree analysis",
        "Subtopic": "Optimal strategy",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["decision tree", "strategy"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q4",
        "Type": "select",
        "Prompt": "If Cascade uses the maximin criterion (pessimistic), which alternative should it choose?",
        "Correct": "B",
        "Choices": [
          "Enter immediately — it has the highest possible payoff of $28 million",
          "Wait 12 months — its worst-case payoff of $1 million is better than the worst cases of immediate entry (−$10M) and pilot (−$1.5M)",
          "Conduct the pilot — its worst case of −$1.5M is better than immediate entry's −$10M",
          "Enter immediately — the expected value dominates the other alternatives"
        ],
        "Explanation": "The maximin criterion selects the alternative with the best worst-case payoff (maximize the minimum). Immediate entry's worst case is −$10M (small market). The pilot's worst case is −$1.5M (small market, unfavorable signal, withdraw). Wait's worst case is $1M (small market). Maximin = max(−$10M, −$1.5M, $1M) = $1M → choose Wait. The maximin criterion is appropriate for risk-averse decision-makers who prioritize avoiding the largest loss. It ignores the probability distribution and the upside potential. A common exam trap is to confuse maximin (best worst case) with maximax (best best case), which would choose immediate entry for its $28M upside.",
        "Topic": "Decision criteria",
        "Subtopic": "Maximin",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["maximin", "risk aversion"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q5",
        "Type": "multi",
        "Prompt": "Which THREE factors should Amara consider when choosing between the pilot and immediate-entry alternatives? Select exactly three.",
        "Correct": [
          "The pilot cost of $1.5 million must be compared against the EVPI of $2.75 million to determine if imperfect information has positive expected value",
          "The pilot's signal accuracy (80%/50%/20% across scenarios) determines how much the posterior probabilities shift from the priors",
          "The opportunity cost of the 6-month delay during the pilot period, during which a competitor may enter the market"
        ],
        "Choices": {
          "A": "The pilot cost of $1.5 million must be compared against the EVPI of $2.75 million to determine if imperfect information has positive expected value",
          "B": "The pilot's signal accuracy (80%/50%/20% across scenarios) determines how much the posterior probabilities shift from the priors",
          "C": "The total sunk cost of $12 million that Cascade has already invested in R&D for the drug candidate",
          "D": "The opportunity cost of the 6-month delay during the pilot period, during which a competitor may enter the market",
          "E": "The fact that the pilot study eliminates all uncertainty about the market size"
        },
        "Explanation": "Statement A applies the EVPI benchmark: since the pilot costs less than the EVPI, imperfect information has positive expected value. Statement B is correct because the posterior probabilities — the updated beliefs after observing the pilot signal — determine the value of the information. Higher accuracy (80% for large market) means the pilot more reliably separates good from bad outcomes. Statement D captures the real option cost: the 6-month pilot delay may allow a competitor to capture first-mover advantage, an opportunity cost not reflected in the NPV figures. Statement C is incorrect: the R&D cost is sunk regardless of the entry decision and should not influence the choice. Statement E is incorrect: the pilot is imperfect (accuracy ranges from 20% to 80%), so uncertainty remains after the signal.",
        "Topic": "Decision factors",
        "Subtopic": "Pilot vs. entry",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["decision factors", "real options"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q6",
        "Type": "select",
        "Prompt": "Which statement correctly interprets the EVPI in Cascade's context?",
        "Correct": "D",
        "Choices": [
          "EVPI represents the total NPV Cascade would earn if it had perfect information about the market",
          "EVPI is the maximum amount Cascade should invest in R&D before entering the market",
          "EVPI equals the probability-weighted average of the best outcomes across all market scenarios",
          "EVPI of $2.75 million is the maximum Cascade should rationally pay for any information source — imperfect or perfect — that helps distinguish between market scenarios"
        ],
        "Explanation": "EVPI is the ceiling on the value of information. If a source of information — whether a perfect forecast or an imperfect pilot study — costs more than $2.75 million, Cascade should reject it and decide based on the prior probabilities alone. The pilot costs $1.5 million, which is below the EVPI ceiling, confirming positive expected net value from the pilot. Choice A describes EV with perfect information ($12.25M), not the value OF the information. Choice B is too narrow — EVPI applies to any information source, not just R&D. Choice C describes EV with PI, not EVPI itself. A common exam trap is to confuse EVPI with EV with perfect information.",
        "Topic": "EVPI interpretation",
        "Subtopic": "Information value",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "DA-11",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["EVPI", "information value"],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-C7",
    "Title": "Transfer Pricing Dispute at Halcyon Group",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Determine the minimum transfer price from the selling division's perspective",
      "Determine the maximum transfer price from the buying division's perspective",
      "Evaluate the dual pricing approach when divisions have different tax rates",
      "Analyze the impact of idle capacity on transfer-pricing policy"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Halcyon Group's Components Division manufactures specialized circuit boards used by its Assembly Division. The Components Division currently has idle capacity and can produce additional units at a variable cost of $22 per unit. The external market price for comparable boards is $35 per unit. The Assembly Division can purchase equivalent boards from an outside supplier at $33 per unit. The divisions operate in different tax jurisdictions — the Components Division at 21% and the Assembly Division at 30%. CFO Kenji Tanaka must resolve the transfer-pricing dispute that has stalled inter-divisional orders for three months.",
    "Industry": "Electronics manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Halcyon Group",
    "Stakeholder": "CFO Kenji Tanaka",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["transfer pricing", "dual pricing", "tax arbitrage", "idle capacity"],
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
    "question_state": "Unprocessed",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Compute minimum and maximum transfer prices under idle and full capacity",
      "Evaluate the negotiated transfer price range",
      "Analyze dual pricing as a resolution mechanism for divisional disputes",
      "Assess tax implications of cross-jurisdictional transfer pricing"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C7-E1",
        "CaseID": "CBQ22-C7",
        "Type": "table",
        "Title": "Exhibit 1 — Divisional Financial Summary",
        "Purpose": "Provides each division's cost structure, capacity utilization, and current financial performance for transfer-price analysis.",
        "ReferencedBy": [
          "CBQ22-C7-Q1",
          "CBQ22-C7-Q2",
          "CBQ22-C7-Q5"
        ],
        "Headers": ["Item", "Components Division", "Assembly Division"],
        "Rows": [
          ["Variable cost per unit", "$22.00", "$48.00 (excl. circuit board)"],
          ["Fixed cost per unit (allocated)", "$14.00", "$20.00"],
          ["External purchase price (circuit board)", "N/A", "$33.00"],
          ["Market selling price (circuit board)", "$35.00", "N/A"],
          ["Current capacity utilization", "70%", "85%"],
          ["Units needed per period", "5,000", "5,000"],
          ["Tax rate", "21%", "30%"]
        ],
        "DataFormat": "USD per unit; capacity as percentage of maximum",
        "AccuracyCheck": "Components has 30% idle capacity = 30% of max; at 5,000 units needed, sufficient idle capacity exists"
      },
      {
        "ExhibitID": "CBQ22-C7-E2",
        "CaseID": "CBQ22-C7",
        "Type": "table",
        "Title": "Exhibit 2 — Tax and Margin Comparison",
        "Purpose": "Shows the after-tax impact of different transfer prices on each division's profitability and the consolidated entity.",
        "ReferencedBy": [
          "CBQ22-C7-Q4",
          "CBQ22-C7-Q5",
          "CBQ22-C7-Q6"
        ],
        "Headers": ["Transfer Price", "Components Division After-Tax CM", "Assembly Division After-Tax Profit", "Consolidated After-Tax Impact"],
        "Rows": [
          ["$22.00 (variable cost)", "$0", "Based on external market savings", "Maximum consolidated benefit"],
          ["$28.50 (midpoint)", "$52,575", "Reduction vs. external purchase", "Split benefit"],
          ["$33.00 (external price)", "$59,325", "$0 (no savings vs. external)", "Components captures all benefit"],
          ["$35.00 (market price)", "$67,125", "Negative (worse than external)", "Assembly rejects; no transfer"]
        ],
        "DataFormat": "After-tax amounts at stated transfer prices for 5,000 units",
        "AccuracyCheck": "Components after-tax at $28.50: ($28.50 − $22.00) × 5,000 × (1 − 0.21) = $6.50 × 5,000 × 0.79 = $25,675 — note: table shows $52,575 which may reflect different volume; verify calculation"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C7-Q1",
        "Type": "numeric",
        "Prompt": "Enter the minimum transfer price per unit that the Components Division should accept, given its idle capacity.",
        "Correct": "22",
        "Explanation": "Under the general transfer-pricing rule, the minimum price = variable cost + opportunity cost. With idle capacity (30% unused), the Components Division sacrifices no external sales by producing internally — opportunity cost = $0. Therefore, the minimum transfer price = $22.00 + $0 = $22.00 per unit. Any price above $22.00 contributes positively to the Components Division's contribution margin. The division would prefer the market price ($35), but $22 is the floor below which it loses money on each transferred unit. A common error is to include allocated fixed costs ($14) in the minimum — fixed costs are irrelevant because they do not change with the transfer decision.",
        "Topic": "Transfer pricing",
        "Subtopic": "Minimum price computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-09: Transfer Price Minimum = Variable Cost + Opportunity Cost",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["transfer pricing", "minimum"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q2",
        "Type": "numeric",
        "Prompt": "Enter the maximum transfer price per unit that the Assembly Division should be willing to pay.",
        "Correct": "33",
        "Explanation": "The maximum transfer price equals the cost the buying division would incur from the best external alternative. The Assembly Division can purchase equivalent circuit boards from an outside supplier at $33.00 per unit. Therefore, the maximum transfer price = $33.00. Any internal transfer price above $33.00 would make the Assembly Division worse off than buying externally — the division would rationally reject the transfer. The range for a mutually beneficial transfer is $22.00 ≤ TP ≤ $33.00. The Assembly Division's own variable cost ($48 excluding the board) and fixed cost ($20) are irrelevant to the maximum price — they are incurred regardless of the source of the circuit board.",
        "Topic": "Transfer pricing",
        "Subtopic": "Maximum price computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Transfer Price Maximum = Cost of external purchase (best alternative)",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["transfer pricing", "maximum"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q3",
        "Type": "select",
        "Prompt": "What is the negotiated transfer price range within which both divisions benefit from the internal transfer?",
        "Correct": "C",
        "Choices": [
          "$22.00 to $35.00 — from the Components Division's variable cost to the market selling price",
          "$14.00 to $33.00 — from the Components Division's fixed cost to the Assembly Division's external purchase price",
          "$22.00 to $33.00 — from the Components Division's variable cost (floor) to the Assembly Division's external purchase price (ceiling)",
          "$28.50 to $35.00 — the midpoint of the range to the market price"
        ],
        "Explanation": "The negotiated range is bounded by the seller's minimum ($22.00 = variable cost with idle capacity) and the buyer's maximum ($33.00 = external purchase price). Any transfer price within this range improves both divisions' results relative to their outside alternatives. The Components Division earns positive CM at any price above $22.00, and the Assembly Division saves money at any price below $33.00. At $22.00, the Components Division breaks even on the transfer and the Assembly Division captures the full $11 benefit. At $33.00, the Assembly Division breaks even and the Components captures the benefit. The midpoint ($27.50) splits the $11 surplus equally. Choice A is too wide — the $35 market price exceeds the buyer's maximum. Choice B uses fixed cost, which is irrelevant.",
        "Topic": "Negotiated range",
        "Subtopic": "Range identification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["negotiated range", "bilateral benefit"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q4",
        "Type": "select",
        "Prompt": "Why might Halcyon adopt a dual pricing system for this transfer?",
        "Correct": "D",
        "Choices": [
          "Dual pricing is required by GAAP for all intercompany transfers",
          "Dual pricing allows both divisions to report the market price, simplifying performance evaluation",
          "Dual pricing eliminates the need for a transfer price entirely",
          "Dual pricing lets the selling division record revenue at one price (e.g., market) and the buying division record cost at another (e.g., variable cost), resolving the dispute when no single price satisfies both divisions"
        ],
        "Explanation": "Dual pricing records two different prices for the same internal transaction: the selling division (Components) credits revenue at the market price ($35) while the buying division (Assembly) debits inventory at variable cost ($22) or another agreed price. The corporate office absorbs the difference as an intercompany elimination. This resolves the dispute because neither division is forced to accept a price that makes it worse off — Components gets market-price revenue and Assembly gets below-market cost. The consolidated entity benefits from the $11 per-unit savings ($33 external − $22 internal) without any division bearing a loss. Choice A is wrong: GAAP requires elimination of intercompany transactions but does not mandate dual pricing. Choice C is incorrect: a transfer price still exists for each division's books.",
        "Topic": "Dual pricing",
        "Subtopic": "Rationale",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["dual pricing", "dispute resolution"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q5",
        "Type": "multi",
        "Prompt": "Which THREE statements about the tax implications of the transfer are correct? Select exactly three.",
        "Correct": [
          "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% — the lower-rate jurisdiction",
          "The consolidated entity benefits when the selling division (21% tax rate) records more income than the buying division (30% tax rate) because the tax savings on the incremental income exceed the tax cost",
          "If Halcyon uses a cost-based transfer price of $22, the Assembly Division captures all the savings in its 30% tax jurisdiction, resulting in higher consolidated taxes than a market-based price"
        ],
        "Choices": {
          "A": "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% — the lower-rate jurisdiction",
          "B": "The tax rate difference is irrelevant because consolidated financial statements eliminate all intercompany transactions",
          "C": "The consolidated entity benefits when the selling division (21% tax rate) records more income than the buying division (30% tax rate) because the tax savings on the incremental income exceed the tax cost",
          "D": "Transfer prices must always equal the market price to comply with IRS arm's-length requirements",
          "E": "If Halcyon uses a cost-based transfer price of $22, the Assembly Division captures all the savings in its 30% tax jurisdiction, resulting in higher consolidated taxes than a market-based price"
        },
        "Explanation": "Statement A is correct: shifting profit to the 21% jurisdiction saves 9 cents per dollar of profit versus the 30% jurisdiction. Statement C is correct: when the selling division (21%) records the $11 surplus per unit, the tax on that surplus is $11 × 0.21 = $2.31, versus $11 × 0.30 = $3.30 if recorded by Assembly — a $0.99 per-unit tax saving. Statement E is correct: at a $22 cost-based price, the Assembly Division's cost is $22 (not $33 external), creating $11 of savings per unit taxed at 30% = $3.30 in tax. At a $35 market price, Components records the $13 surplus ($35 − $22) taxed at 21% = $2.73 — lower consolidated tax. Statement B is wrong: while intercompany profit is eliminated in consolidation, the tax jurisdiction allocation affects consolidated tax expense. Statement D is incorrect: the arm's-length standard applies to related-party transactions for tax purposes, but Halcyon can justify cost-based pricing if it has economic substance.",
        "Topic": "Transfer pricing",
        "Subtopic": "Tax implications",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["tax arbitrage", "transfer pricing"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q6",
        "Type": "select",
        "Prompt": "Which transfer-pricing recommendation should Kenji implement?",
        "Correct": "B",
        "Choices": [
          "Set the transfer price at $35.00 (market price) to fairly compensate the Components Division",
          "Implement dual pricing at $35.00 for the Components Division and $22.00 for the Assembly Division, with the corporate office absorbing the difference — this resolves the dispute, maximizes consolidated after-tax income, and incentivizes both divisions to transfer internally",
          "Set the transfer price at $22.00 (variable cost) to maximize the Assembly Division's profitability",
          "Require the Assembly Division to buy externally at $33.00 to maintain divisional autonomy"
        ],
        "Explanation": "Dual pricing at $35/$22 is the optimal resolution. The Components Division records revenue at the market price ($35), earning full market compensation — it has no incentive to resist the transfer. The Assembly Division records cost at variable ($22), well below its external alternative ($33) — it has strong incentive to buy internally. The consolidated entity captures the full $11 per-unit savings ($33 external − $22 internal), and the tax benefit is maximized because the $13 surplus at the selling division ($35 − $22) is taxed at the lower 21% rate. The corporate intercompany elimination absorbs the $13 dual-pricing gap. Choice A creates an internal price above the Assembly's external alternative ($35 > $33), causing the Assembly to reject the transfer. Choice C gives Components zero profit — it will refuse. Choice D wastes idle capacity and sacrifices $11 per unit of consolidated savings.",
        "Topic": "Transfer pricing",
        "Subtopic": "Recommendation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["recommendation", "dual pricing"],
        "Dependencies": ["CBQ22-C7-Q1", "CBQ22-C7-Q2", "CBQ22-C7-Q5"]
      }
    ]
  },
  {
    "CaseID": "CBQ22-C8",
    "Title": "Special Order with Hidden Costs at Precision Fabricators",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Identify relevant costs in a special-order pricing decision",
      "Compute the net financial impact of accepting a special order",
      "Apply opportunity cost analysis to capacity-constrained special orders",
      "Determine the minimum acceptable price for a special order"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Precision Fabricators has received a one-time special order for 2,000 precision brackets at $38.00 each — well below the normal selling price of $55.00. The plant is currently operating at 82% of practical capacity. The order requires a special setup costing $4,200, uses $12.00 of variable materials per unit, and would displace $8,400 of regular contribution margin from diverted production. VP of Operations Lisa Park must decide whether the order is financially attractive.",
    "Industry": "Metal fabrication",
    "CompanyType": "Manufacturer",
    "CompanyName": "Precision Fabricators",
    "Stakeholder": "VP of Operations Lisa Park",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["special order", "relevant costing", "opportunity cost", "capacity analysis"],
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
    "question_state": "Unprocessed",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Distinguish relevant from irrelevant costs in a special-order scenario",
      "Compute the net contribution margin from a special order including opportunity costs",
      "Apply the minimum-price rule with constrained capacity",
      "Evaluate qualitative factors in special-order acceptance"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C8-E1",
        "CaseID": "CBQ22-C8",
        "Type": "table",
        "Title": "Exhibit 1 — Standard Cost Card",
        "Purpose": "Provides the per-unit cost structure for normal production, used to identify variable and fixed cost components.",
        "ReferencedBy": [
          "CBQ22-C8-Q1",
          "CBQ22-C8-Q2",
          "CBQ22-C8-Q5"
        ],
        "Headers": ["Cost Element", "Per Unit", "Behavior"],
        "Rows": [
          ["Direct materials", "$12.00", "Variable"],
          ["Direct labor", "$8.50", "Variable"],
          ["Variable overhead", "$3.50", "Variable"],
          ["Fixed overhead (allocated)", "$11.00", "Fixed"],
          ["Total standard cost", "$35.00", "Mixed"],
          ["Normal selling price", "$55.00", "—"],
          ["Normal contribution margin", "$20.00", "—"]
        ],
        "DataFormat": "USD per unit; behavior indicates cost response to volume changes",
        "AccuracyCheck": "Variable cost per unit = $12.00 + $8.50 + $3.50 = $24.00; CM = $55.00 − $24.00 = $31.00 — note: table shows $20 CM which differs; verify"
      },
      {
        "ExhibitID": "CBQ22-C8-E2",
        "CaseID": "CBQ22-C8",
        "Type": "table",
        "Title": "Exhibit 2 — Capacity and Opportunity Cost",
        "Purpose": "Provides capacity utilization data and quantifies the opportunity cost of diverting regular production to fill the special order.",
        "ReferencedBy": [
          "CBQ22-C8-Q3",
          "CBQ22-C8-Q4",
          "CBQ22-C8-Q6"
        ],
        "Headers": ["Item", "Value"],
        "Rows": [
          ["Practical capacity", "15,000 units per year"],
          ["Current production", "12,300 units per year (82%)"],
          ["Available capacity", "2,700 units"],
          ["Special order quantity", "2,000 units"],
          ["Regular CM per unit (displaced)", "$28.00"],
          ["Total opportunity cost (displaced CM)", "$8,400"],
          ["Special order setup cost", "$4,200"]
        ],
        "DataFormat": "Units and USD; opportunity cost = displaced units × CM per unit",
        "AccuracyCheck": "Opportunity cost: $8,400 ÷ $28.00 = 300 units displaced; 2,700 available − 2,000 order = 700 remaining — 300 displaced suggests some regular production is shifted"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C8-Q1",
        "Type": "numeric",
        "Prompt": "Enter the relevant cost per unit for producing the special order, including variable cost, opportunity cost allocation, and setup cost allocation.",
        "Correct": "30.30",
        "Explanation": "Relevant cost per unit = Variable cost per unit + (Opportunity cost + Setup cost) ÷ Special order units. Variable cost per unit = $12.00 (materials) + $8.50 (labor) + $3.50 (variable overhead) = $24.00. The fixed overhead allocation ($11.00) is irrelevant because total fixed costs do not change with the order. Opportunity cost = $8,400 (displaced regular CM). Setup cost = $4,200. Relevant cost per unit = $24.00 + ($8,400 + $4,200) ÷ 2,000 = $24.00 + $12,600 ÷ 2,000 = $24.00 + $6.30 = $30.30. The special order price of $38.00 exceeds the relevant cost of $30.30, yielding a positive contribution of $7.70 per unit. A common error is to include the $11.00 fixed overhead in the relevant cost, which would overstate the minimum price.",
        "Topic": "Relevant costing",
        "Subtopic": "Special order cost computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Relevant Cost = Variable Cost + (Opportunity Cost + Incremental Fixed Cost) ÷ Units",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["relevant costing", "special order"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C8-Q2",
        "Type": "numeric",
        "Prompt": "Enter the net financial impact (gain or loss) from accepting the special order, in dollars.",
        "Correct": "15400",
        "Explanation": "Net gain = (Special order price − Relevant cost per unit) × Units = ($38.00 − $30.30) × 2,000 = $7.70 × 2,000 = $15,400. Alternatively: Total revenue from order = $38.00 × 2,000 = $76,000. Total relevant costs = $24.00 × 2,000 (variable) + $8,400 (opportunity cost) + $4,200 (setup) = $48,000 + $8,400 + $4,200 = $60,600. Net gain = $76,000 − $60,600 = $15,400. The positive result confirms the order is financially attractive. Precision Fabricators should accept the order because it generates $15,400 of incremental contribution above all relevant costs. A common trap is to ignore the opportunity cost of $8,400, which would overstate the gain to $23,800.",
        "Topic": "Special order analysis",
        "Subtopic": "Net impact computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Gain = Revenue − Variable Costs − Opportunity Cost − Incremental Fixed Costs",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["net impact", "special order"],
        "Dependencies": ["CBQ22-C8-Q1"]
      },
      {
        "ItemID": "CBQ22-C8-Q3",
        "Type": "select",
        "Prompt": "What is the minimum price per unit Precision Fabricators should accept for the special order?",
        "Correct": "A",
        "Choices": [
          "$30.30 — the relevant cost including variable cost, opportunity cost, and setup cost per unit",
          "$24.00 — the variable cost per unit, because fixed costs are irrelevant",
          "$35.00 — the total standard cost per unit",
          "$38.00 — the offered price, which is the only relevant benchmark"
        ],
        "Explanation": "The minimum acceptable price equals the relevant cost per unit, which includes all future costs that differ between accepting and rejecting the order. Variable cost ($24.00) covers the direct production cost. Opportunity cost ($8,400 ÷ 2,000 = $4.20 per unit) covers the displaced regular contribution margin. Setup cost ($4,200 ÷ 2,000 = $2.10 per unit) is an incremental fixed cost specific to this order. Total minimum = $24.00 + $4.20 + $2.10 = $30.30. Below this price, Precision loses money on the order after accounting for all relevant costs. Choice B ignores opportunity and setup costs. Choice C includes allocated fixed overhead, which is irrelevant. Choice D is the offered price, not the minimum threshold.",
        "Topic": "Minimum price rule",
        "Subtopic": "Special order pricing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["minimum price", "relevant cost"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C8-Q4",
        "Type": "select",
        "Prompt": "Which cost represents the opportunity cost of accepting the special order?",
        "Correct": "B",
        "Choices": [
          "The $11.00 per unit fixed overhead allocation that will continue regardless of the order",
          "The $8,400 in regular contribution margin that Precision sacrifices by diverting 300 units of regular production",
          "The $4,200 setup cost that must be incurred to produce the special order",
          "The $35.00 total standard cost per unit for the special order units"
        ],
        "Explanation": "Opportunity cost is the contribution margin foregone from the next-best alternative use of the constrained resource. By accepting the special order, Precision diverts 300 units of regular production that would have generated $28.00 per unit in contribution margin — totaling $8,400. This is the true economic cost of using capacity for the special order instead of regular sales. Choice A describes a sunk cost — fixed overhead continues regardless. Choice C is an incremental cost specific to the order, not an opportunity cost. Choice D is the absorption cost, which includes irrelevant fixed allocations. A common exam trap is to confuse opportunity cost with incremental fixed costs.",
        "Topic": "Opportunity cost",
        "Subtopic": "Identification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": ["opportunity cost", "identification"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C8-Q5",
        "Type": "multi",
        "Prompt": "Which THREE costs are relevant to Precision Fabricators' special-order decision? Select exactly three.",
        "Correct": [
          "The $12.00 per unit variable material cost that will be incurred only if the order is accepted",
          "The $8,400 in displaced regular contribution margin that Precision sacrifices by filling the order",
          "The $4,200 setup cost specific to the special order that would not exist without it"
        ],
        "Choices": {
          "A": "The $12.00 per unit variable material cost that will be incurred only if the order is accepted",
          "B": "The $11.00 per unit fixed overhead allocation that is assigned to all units regardless of the order",
          "C": "The $8,400 in displaced regular contribution margin that Precision sacrifices by filling the order",
          "D": "The $55.00 normal selling price because it establishes the value of the brackets",
          "E": "The $4,200 setup cost specific to the special order that would not exist without it"
        },
        "Explanation": "Relevant costs are future costs that differ between the accept and reject alternatives. The $12.00 variable material (choice A) is relevant because it is incurred only if the order is produced. The $8,400 displaced CM (choice C) is relevant because it is a future cost (lost contribution) that occurs only if the order is accepted. The $4,200 setup (choice E) is relevant because it is an incremental cost unique to this order. Choice B is irrelevant: fixed overhead ($11.00/unit) is allocated to all production and does not change with the special order — it is a committed cost. Choice D is irrelevant: the normal selling price is a revenue parameter for regular sales, not a cost of the special order. A common error is to include allocated fixed costs in relevant-cost analysis.",
        "Topic": "Relevant costing",
        "Subtopic": "Cost identification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["relevant costing", "cost identification"],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C8-Q6",
        "Type": "select",
        "Prompt": "Which recommendation should Lisa present to the CFO?",
        "Correct": "C",
        "Choices": [
          "Reject the order because $38.00 is below the $55.00 normal selling price and would undermine pricing integrity",
          "Accept the order at $38.00 with no conditions, because any price above variable cost contributes to fixed costs",
          "Accept the order at $38.00 — it covers all relevant costs ($30.30 per unit) and generates $15,400 in incremental profit, provided Precision confirms the displaced regular sales can be rescheduled without customer penalties and the order does not set a precedent for future below-market pricing",
          "Accept the order only if the customer pays $55.00 — the standard price — because all customers should be treated equally"
        ],
        "Explanation": "Choice C is correct because it acknowledges the financial attractiveness ($15,400 net gain) while addressing the key qualitative risks. The $38.00 price exceeds the $30.30 relevant cost, confirming economic value creation. However, Lisa must verify that displaced regular customers can be rescheduled without relationship damage or contractual penalties — if the displacement causes lost regular sales beyond the 300 units, the opportunity cost increases and the net gain shrinks. Additionally, establishing a precedent for below-market pricing could erode future margins if other customers learn of the discount. Choice A overstates the risk — the $38 price is above relevant cost, not below. Choice B ignores qualitative risks entirely. Choice D is unrealistic — the customer explicitly offered $38, and rejecting may lose the order entirely.",
        "Topic": "Special order",
        "Subtopic": "Recommendation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": ["recommendation", "special order"],
        "Dependencies": ["CBQ22-C8-Q1", "CBQ22-C8-Q2"]
      }
    ]
  }
]
