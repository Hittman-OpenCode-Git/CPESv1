var casePackP2_1 = [
{
  "CaseID": "CBQ21-B1",
  "Title": "Cash Conversion Cycle and the Credit Line Renewal",
  "SectionTags": [
    "B"
  ],
  "BlueprintDomain": "Corporate Finance",
  "BlueprintObjectives": [
    "Manage working capital (cash, receivables, inventory, payables)",
    "Compute and interpret the cash conversion cycle"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Meridian Foods' CFO Ravi Patel must explain to the board why cash balances fell even as profit rose 10%. The controller has prepared operating data for the past two quarters, and the board has asked for a working-capital diagnosis before the November credit-line renewal.",
  "Industry": "Food processing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Meridian Foods",
  "Stakeholder": "CFO Ravi Patel",
  "BusinessFunction": "Treasury",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.1",
  "Tags": [
    "cash conversion cycle",
    "working capital",
    "DSO",
    "DIO",
    "DPO"
  ],
  "CreatedDate": "2026-08-23",
  "ModifiedDate": "2026-08-23",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [
    {
      "Date": "2026-08-23",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation"
    },
    {
      "Date": "2026-08-23",
      "Version": "1.1",
      "Author": "Case Author (external review repairs)",
      "Summary": "Stated the annualized-flow measurement convention in Exhibit 1; clarified Q2's cross-reference to Question 1; corrected the Q3 DPO distractor from 3.7 to 3.3 days"
    }
  ],
  "Dependencies": [],
  "LearningObjectives": [
    "Compute DIO, DSO, and DPO from operating data",
    "Compute and interpret the cash conversion cycle",
    "Quantify the cash released by a DSO target",
    "Match each working-capital component to its change"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-B1-E1",
      "CaseID": "CBQ21-B1",
      "Type": "table",
      "Title": "Exhibit 1 — Operating Data",
      "Purpose": "Provides sales, COGS, average balance-sheet accounts, and purchases for the CCC computation. Sales, COGS, and purchases are annualized run-rate amounts at each quarter-end; average working-capital balances are quarter-end averages, so the 365-day formulas apply directly.",
      "ReferencedBy": [
        "CBQ21-B1-Q1",
        "CBQ21-B1-Q2",
        "CBQ21-B1-Q3",
        "CBQ21-B1-Q6"
      ],
      "Headers": [
        "Quarter",
        "Sales",
        "COGS",
        "Average Inventory",
        "Average Receivables",
        "Average Payables",
        "Purchases"
      ],
      "Rows": [
        [
          "Q1",
          "$2,400,000",
          "$1,800,000",
          "$400,000",
          "$600,000",
          "$350,000",
          "$1,850,000"
        ],
        [
          "Q2",
          "$2,640,000",
          "$2,040,000",
          "$520,000",
          "$750,000",
          "$380,000",
          "$2,110,000"
        ]
      ],
      "DataFormat": "USD whole dollars",
      "AccuracyCheck": "Q2 sales and COGS are Q1 x 1.10; purchases reflect the inventory build"
    },
    {
      "ExhibitID": "CBQ21-B1-E2",
      "CaseID": "CBQ21-B1",
      "Type": "email",
      "Title": "Exhibit 2 — Board Request",
      "Purpose": "Sets the decision context: the board asks for the cash-flow diagnosis and the cash release from a 90-day DSO target.",
      "ReferencedBy": [
        "CBQ21-B1-Q4",
        "CBQ21-B1-Q5"
      ],
      "Body": "From: Board Audit Committee. Subject: Q2 cash position. Ravi — profit is up 10% but cash is down. Explain the gap, and quantify what we can recover from working capital if we tighten collections to a 90-day DSO target before the November credit-line renewal."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-B1-Q1",
      "Type": "numeric",
      "Prompt": "Enter Q2 days sales outstanding (DSO), rounded to one decimal.",
      "Correct": "103.7",
      "Explanation": "DSO = (Average Accounts Receivable / Net Credit Sales) x 365 = ($750,000 / $2,640,000) x 365 = 103.7 days, using the annualized run-rate sales shown in Exhibit 1. Receivables grew from $600,000 to $750,000 — 25% — while sales grew only 10%, so Meridian Foods is collecting more slowly. This is the leading driver of the cash drain CFO Ravi Patel must explain to the board.",
      "Topic": "Days sales outstanding",
      "Subtopic": "Receivables turnover in days",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "CB-10: DSO component (FA-05)",
      "CommonTrapReference": "Using ending rather than average receivables, or 360 days instead of 365.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "DSO",
        "receivables"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-B1-Q2",
      "Type": "numeric",
      "Prompt": "Enter the Q2 cash conversion cycle in days, rounded to one decimal.",
      "Correct": "131.0",
      "Explanation": "CCC = DIO + DSO - DPO. Q2 DIO = ($520,000 / $2,040,000) x 365 = 93.0 days; DSO = 103.7 days (from Question 1); DPO = ($380,000 / $2,110,000) x 365 = 65.7 days. CCC = 93.0 + 103.7 - 65.7 = 131.0 days. Meridian ties up roughly four and a half months of cash in inventory and receivables, net of supplier financing — the board's cash-drain explanation in one number.",
      "Topic": "Cash conversion cycle",
      "Subtopic": "CCC computation",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "CB-10: Cash Conversion Cycle",
      "CommonTrapReference": "Adding DPO instead of subtracting it, or using COGS instead of purchases in DPO.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "CCC",
        "DIO",
        "DPO"
      ],
      "Dependencies": [
        "CBQ21-B1-Q1"
      ]
    },
    {
      "ItemID": "CBQ21-B1-Q3",
      "Type": "select",
      "Prompt": "Which component contributed most to the CCC deterioration from Q1 to Q2?",
      "Correct": "A",
      "Choices": [
        "DSO, which lengthened 12.4 days as receivables grew faster than sales",
        "DIO, which lengthened 11.9 days as inventory built ahead of demand",
        "DPO, which shortened 3.3 days and offset the other components",
        "DIO and DSO contributed equally"
      ],
      "Explanation": "The three components moved 103.7 - 91.3 = +12.4 days (DSO), 93.0 - 81.1 = +11.9 days (DIO), and 65.7 - 69.1 = -3.3 days (DPO). DSO's 12.4-day worsening is the largest single driver, though inventory buildup and slightly faster supplier payment compounded it. The board should hear that collections are the priority, not purchasing.",
      "Topic": "CCC component analysis",
      "Subtopic": "Variance attribution",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "CB-10",
      "CommonTrapReference": "Attributing the change to the largest absolute level (inventory) rather than the largest change.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "attribution",
        "CCC"
      ],
      "Dependencies": [
        "CBQ21-B1-Q2"
      ]
    },
    {
      "ItemID": "CBQ21-B1-Q4",
      "Type": "select",
      "Prompt": "Per the board request in Exhibit 2, how much cash would a 90-day DSO target release, based on Q2 sales?",
      "Correct": "A",
      "Choices": [
        "Approximately $99,000",
        "Approximately $72,000",
        "Approximately $145,000",
        "The full $750,000 receivable balance"
      ],
      "Explanation": "Target receivables at a 90-day DSO = (90 / 365) x $2,640,000 = $650,959. Current receivables are $750,000, so the release is $750,000 - $650,959 = $99,041, approximately $99,000. This is the cash the board's collection push would free for the credit-line renewal. Only the reduction in DSO releases cash; the existing balance already reflects past sales.",
      "Topic": "Cash release from DSO reduction",
      "Subtopic": "Working-capital financing",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "CB-10: DSO component",
      "CommonTrapReference": "Treating the entire receivable balance, rather than the excess above target, as the cash release.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "DSO",
        "cash release"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-B1-Q5",
      "Type": "multi",
      "Prompt": "Which two actions would most directly shorten the cash conversion cycle?",
      "Correct": [
        "Tighten credit terms and collection follow-up to reduce DSO",
        "Negotiate longer payment terms with suppliers to extend DPO"
      ],
      "Choices": [
        "Tighten credit terms and collection follow-up to reduce DSO",
        "Negotiate longer payment terms with suppliers to extend DPO",
        "Increase safety stock to avoid stockouts",
        "Pay suppliers early to capture the 2% discount",
        "Extend customer terms further to win share"
      ],
      "Explanation": "CCC = DIO + DSO - DPO, so shortening the cycle means shrinking DSO (tighter credit and collections), shrinking DIO (leaner inventory), or extending DPO (longer supplier terms). Increasing safety stock raises DIO, early supplier payment shortens DPO, and looser customer terms raise DSO — each of these lengthens the cycle. For Meridian Foods, the two selected actions attack the two components that worsened most.",
      "Topic": "CCC management",
      "Subtopic": "Working-capital levers",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "CB-10",
      "CommonTrapReference": "Choosing actions that shorten individual components but lengthen the overall cycle (e.g., early supplier payment).",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "CCC",
        "levers"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-B1-Q6",
      "Type": "match",
      "Prompt": "Match each working-capital component to its Q1-to-Q2 change.",
      "Correct": {
        "DSO": "+12.4 days",
        "DIO": "+11.9 days",
        "DPO": "-3.3 days",
        "CCC": "+27.7 days"
      },
      "LeftItems": [
        "DSO",
        "DIO",
        "DPO",
        "CCC"
      ],
      "RightItems": [
        "+12.4 days",
        "+11.9 days",
        "-3.3 days",
        "+27.7 days"
      ],
      "Explanation": "Q1 to Q2: DSO 91.3 to 103.7 (+12.4 days); DIO 81.1 to 93.0 (+11.9 days); DPO 69.1 to 65.7 (-3.3 days); the net CCC worsened 103.3 to 131.0 (+27.7 days). Matching the components to their changes closes the diagnostic loop for CFO Ravi Patel's board presentation: slower collections, a modest inventory build, and slightly faster supplier payments combined to consume nearly a month of additional cash.",
      "Topic": "CCC changes",
      "Subtopic": "Component matching",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "CognitiveLevel": "Understand",
      "CalculationRequired": true,
      "FormulaReference": "CB-10",
      "CommonTrapReference": "Confusing the direction of DPO (a decrease in DPO lengthens the cycle).",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "CCC",
        "matching"
      ],
      "Dependencies": [
        "CBQ21-B1-Q2"
      ]
    }
  ]
},
{
  "CaseID": "CBQ21-C1",
  "Title": "Relevant Costing: Segment, Special Order, and Outsourcing",
  "SectionTags": [
    "C"
  ],
  "BlueprintDomain": "Decision Analysis",
  "BlueprintObjectives": [
    "Apply relevant costing to short-term decisions",
    "Evaluate segment, special-order, and make-or-buy decisions"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 35,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Cascade Kitchenware's Controller Nina Alvarez faces three short-term decisions before quarter-end: whether to drop the Bakeware line, whether to accept a private-label special order, and whether to outsource the handle component. The CFO wants one memo with the numbers and the governing principle behind each.",
  "Industry": "Kitchenware",
  "CompanyType": "Manufacturer",
  "CompanyName": "Cascade Kitchenware",
  "Stakeholder": "Controller Nina Alvarez",
  "BusinessFunction": "Cost accounting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.1",
  "Tags": [
    "relevant costing",
    "segment analysis",
    "special order",
    "outsourcing"
  ],
  "CreatedDate": "2026-08-23",
  "ModifiedDate": "2026-08-23",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [
    {
      "Date": "2026-08-23",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation"
    },
    {
      "Date": "2026-08-23",
      "Version": "1.1",
      "Author": "Case Author (external review repairs)",
      "Summary": "Reordered items to satisfy the numeric(2)-select(2)-multi-match progression; expanded Q3 to five choices with a relative-margin distractor that consumes the Cookware and Utensils exhibit rows; updated exhibit ReferencedBy"
    }
  ],
  "Dependencies": [],
  "LearningObjectives": [
    "Compute segment margin and apply the keep-or-drop rule",
    "Price a special order on incremental costs only",
    "Compare make-or-buy with risk-adjusted total cost of ownership",
    "Match each decision to its governing principle"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-C1-E1",
      "CaseID": "CBQ21-C1",
      "Type": "table",
      "Title": "Exhibit 1 — Segment Profitability",
      "Purpose": "Provides line-level sales, variable costs, traceable fixed costs, and allocated common costs for the keep-or-drop decision.",
      "ReferencedBy": [
        "CBQ21-C1-Q1",
        "CBQ21-C1-Q3"
      ],
      "Headers": [
        "Line",
        "Sales",
        "Variable Costs",
        "Traceable Fixed Costs",
        "Allocated Common Costs"
      ],
      "Rows": [
        [
          "Cookware",
          "$900,000",
          "$420,000",
          "$180,000",
          "$120,000"
        ],
        [
          "Bakeware",
          "$480,000",
          "$260,000",
          "$150,000",
          "$60,000"
        ],
        [
          "Utensils",
          "$620,000",
          "$340,000",
          "$110,000",
          "$80,000"
        ]
      ],
      "DataFormat": "USD whole dollars",
      "AccuracyCheck": "Common costs sum to $260,000 and would be reassigned to the remaining lines if Bakeware is dropped"
    },
    {
      "ExhibitID": "CBQ21-C1-E2",
      "CaseID": "CBQ21-C1",
      "Type": "table",
      "Title": "Exhibit 2 — Special Order and Supplier Data",
      "Purpose": "Provides the private-label order terms and the handle make-or-buy data.",
      "ReferencedBy": [
        "CBQ21-C1-Q2",
        "CBQ21-C1-Q4",
        "CBQ21-C1-Q5"
      ],
      "Headers": [
        "Item",
        "Value"
      ],
      "Rows": [
        [
          "Special order units",
          "3,000"
        ],
        [
          "Special order price per unit",
          "$42"
        ],
        [
          "Variable cost per unit (includes $3 commission NOT paid on this order)",
          "$34"
        ],
        [
          "Order-specific tooling",
          "$12,000"
        ],
        [
          "Annual handle volume",
          "20,000"
        ],
        [
          "In-house variable cost per handle",
          "$25"
        ],
        [
          "Supplier price per handle",
          "$22"
        ],
        [
          "Probability of a supplier failure",
          "5%"
        ],
        [
          "Cost of a supplier failure",
          "$150,000"
        ],
        [
          "Annual inspection savings if outsourced",
          "$25,000"
        ]
      ],
      "DataFormat": "USD",
      "AccuracyCheck": "Released Bakeware capacity can earn an $85,000 contribution from a new line (stated in the scenario)"
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-C1-Q1",
      "Type": "numeric",
      "Prompt": "Enter the Bakeware line segment margin in dollars.",
      "Correct": "70000",
      "Explanation": "Segment margin = Sales - Variable costs - Traceable fixed costs = $480,000 - $260,000 - $150,000 = $70,000. Allocated common costs are excluded because they continue regardless of the line. Bakeware contributes $70,000 toward Cascade Kitchenware's common costs — the starting point for Controller Nina Alvarez's keep-or-drop analysis.",
      "Topic": "Segment margin",
      "Subtopic": "Traceable vs common fixed costs",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-08: Incremental decision rule (segment margin)",
      "CommonTrapReference": "Deducting allocated common costs from segment margin.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "segment margin"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-C1-Q2",
      "Type": "numeric",
      "Prompt": "Enter the incremental profit from accepting the 3,000-unit special order, in dollars.",
      "Correct": "21000",
      "Explanation": "The relevant cost excludes the $3 commission not paid on the order: $34 - $3 = $31 per unit. Incremental profit = (Price - Relevant variable cost) x Units - Tooling = ($42 - $31) x 3,000 - $12,000 = $33,000 - $12,000 = $21,000. The order clears the relevant-cost floor with room to spare, so Alvarez should recommend accepting it even though the $42 price sits below full cost.",
      "Topic": "Special order pricing",
      "Subtopic": "Relevant cost floor",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-08: Incremental decision rule (special order)",
      "CommonTrapReference": "Using full absorption cost or failing to exclude the avoided commission.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "special order"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-C1-Q3",
      "Type": "select",
      "Prompt": "If Bakeware is dropped, the freed capacity can earn an $85,000 contribution from a new line. What is the income effect of dropping Bakeware?",
      "Correct": "A",
      "Choices": [
        "Drop the line; profit rises by $15,000",
        "Keep the line; dropping would reduce profit by $70,000",
        "Drop the line; profit rises by $145,000",
        "Keep the line; dropping would reduce profit by $10,000",
        "Drop Utensils instead, because its $170,000 segment margin is lower than Cookware's $300,000"
      ],
      "Explanation": "Dropping forfeits the $70,000 segment margin but frees capacity that earns $85,000: net effect = -$70,000 + $85,000 = +$15,000. The $60,000 of allocated common costs continues and is irrelevant, so the +$145,000 option double-counts it, and the -$10,000 option wrongly nets it against the margin. The Utensils-versus-Cookware comparison is a relative-margin fallacy: both lines have positive segment margins (Utensils $170,000, Cookware $300,000), so dropping either would reduce income unless its capacity earns more elsewhere. Controller Alvarez should recommend dropping Bakeware because the redeployment earns more than the line itself.",
      "Topic": "Keep-or-drop with capacity redeployment",
      "Subtopic": "Add-or-drop rule",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "DA-08: Incremental decision rule (add-or-drop)",
      "CommonTrapReference": "Stopping at the segment margin and ignoring the redeployment value, or comparing segment margins across lines.",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "keep-or-drop",
        "opportunity cost"
      ],
      "Dependencies": [
        "CBQ21-C1-Q1"
      ]
    },
    {
      "ItemID": "CBQ21-C1-Q4",
      "Type": "select",
      "Prompt": "Based on Exhibit 2, what are the expected annual savings from outsourcing the handles?",
      "Correct": "A",
      "Choices": [
        "Outsource; expected annual savings of $77,500",
        "Keep in-house; expected cost is $60,000 lower",
        "Outsource; expected annual savings of $52,500",
        "Keep in-house; control is worth more than the savings"
      ],
      "Explanation": "In-house cost = $25 x 20,000 = $500,000. Outsourced expected cost = ($22 x 20,000) + (5% x $150,000) - $25,000 = $440,000 + $7,500 - $25,000 = $422,500. Expected savings = $500,000 - $422,500 = $77,500. The risk-adjusted comparison still favors outsourcing: the expected failure penalty and the inspection savings both belong in the total cost of ownership.",
      "Topic": "Outsourcing with risk adjustment",
      "Subtopic": "Total cost of ownership",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "DA-10: Expected value in outsourcing comparison",
      "CommonTrapReference": "Ignoring the expected failure cost or the inspection savings.",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "outsourcing",
        "expected value"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-C1-Q5",
      "Type": "multi",
      "Prompt": "Which three cost items are relevant to the outsourcing decision?",
      "Correct": [
        "In-house variable cost of $25 per handle",
        "Expected supplier-failure cost",
        "The $25,000 inspection savings"
      ],
      "Choices": [
        "In-house variable cost of $25 per handle",
        "Expected supplier-failure cost",
        "The $25,000 inspection savings",
        "The allocated corporate overhead charged to the handle line",
        "The historical cost of the handle-making equipment"
      ],
      "Explanation": "Relevant items differ between the alternatives: variable cost disappears under outsourcing, the expected failure cost arises only under outsourcing, and the inspection savings accrue only under outsourcing. Allocated corporate overhead continues either way, and the historical equipment cost is sunk. These three are exactly the items Alvarez's total-cost-of-ownership comparison must include.",
      "Topic": "Relevant cost identification",
      "Subtopic": "Sunk vs avoidable vs incremental",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "DA-08",
      "CommonTrapReference": "Including allocated overhead or sunk equipment costs in a differential decision.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "relevant costs"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-C1-Q6",
      "Type": "match",
      "Prompt": "Match each decision to its governing principle.",
      "Correct": {
        "Special order pricing": "Price must cover incremental costs, not full costs",
        "Keep-or-drop segment": "Compare contribution margin with avoidable fixed costs",
        "Outsourcing": "Total cost of ownership, including risk-adjusted hidden costs",
        "Sunk costs": "Irrelevant to the decision"
      },
      "LeftItems": [
        "Special order pricing",
        "Keep-or-drop segment",
        "Outsourcing",
        "Sunk costs"
      ],
      "RightItems": [
        "Price must cover incremental costs, not full costs",
        "Compare contribution margin with avoidable fixed costs",
        "Total cost of ownership, including risk-adjusted hidden costs",
        "Irrelevant to the decision"
      ],
      "Explanation": "Each decision in Alvarez's memo carries its own test: special orders are priced against incremental costs; segment decisions compare contribution margin with avoidable fixed costs; outsourcing uses risk-adjusted total cost of ownership; and sunk costs are always excluded. The CFO's memo will close with this principle map so each number is traceable to a rule.",
      "Topic": "Decision rules",
      "Subtopic": "Governing principles",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "CognitiveLevel": "Understand",
      "CalculationRequired": false,
      "FormulaReference": "DA-08",
      "CommonTrapReference": "Applying one decision rule across all decision types.",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "decision rules"
      ],
      "Dependencies": []
    }
  ]
},
{
  "CaseID": "CBQ21-E1",
  "Title": "Capital Rationing and the Post-Audit",
  "SectionTags": [
    "E"
  ],
  "BlueprintDomain": "Investment Decisions",
  "BlueprintObjectives": [
    "Rank capital projects under a budget constraint",
    "Apply profitability index to capital rationing",
    "Interpret a post-audit variance"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Harborview Industries' capital committee has capped this year's spending at $5.0 million across six competing proposals. Controller Sam Okonkwo must also present the post-audit of last year's flagship project, which came in below forecast.",
  "Industry": "Industrial equipment",
  "CompanyType": "Manufacturer",
  "CompanyName": "Harborview Industries",
  "Stakeholder": "Controller Sam Okonkwo",
  "BusinessFunction": "Capital budgeting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.1",
  "Tags": [
    "capital rationing",
    "profitability index",
    "post-audit"
  ],
  "CreatedDate": "2026-08-23",
  "ModifiedDate": "2026-08-23",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [
    {
      "Date": "2026-08-23",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation"
    },
    {
      "Date": "2026-08-23",
      "Version": "1.1",
      "Author": "Case Author (external review repairs)",
      "Summary": "Q1 corrected to standard PI convention (1.33, PV of inflows / investment); Q2 rebuilt around the true optimum A+C+D+F ($5.0M, $1.48M) with the PI-greedy trap as a distractor; items reordered to numeric-numeric-select-select-multi-match; Q3/Q4 FormulaReference corrected from after-tax cash flow to post-audit variance analysis; Q5/Q6 blank FormulaReference fields populated; Q6 match text updated to standard PI terminology"
    }
  ],
  "Dependencies": [],
  "LearningObjectives": [
    "Compute the profitability index",
    "Select the NPV-maximizing project combination under a budget constraint",
    "Analyze post-audit variances by component",
    "Match capital budgeting tools to their purpose"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-E1-E1",
      "CaseID": "CBQ21-E1",
      "Type": "table",
      "Title": "Exhibit 1 — Capital Proposals",
      "Purpose": "Provides investment and NPV for the six proposals under the $5.0M rationing cap.",
      "ReferencedBy": [
        "CBQ21-E1-Q1",
        "CBQ21-E1-Q3"
      ],
      "Headers": [
        "Proposal",
        "Investment",
        "NPV"
      ],
      "Rows": [
        [
          "A",
          "$2,000,000",
          "$600,000"
        ],
        [
          "B",
          "$1,500,000",
          "$500,000"
        ],
        [
          "C",
          "$1,000,000",
          "$320,000"
        ],
        [
          "D",
          "$800,000",
          "$200,000"
        ],
        [
          "E",
          "$2,500,000",
          "$400,000"
        ],
        [
          "F",
          "$1,200,000",
          "$360,000"
        ]
      ],
      "DataFormat": "USD whole dollars",
      "AccuracyCheck": "Total investment $9.0M exceeds the $5.0M budget; NPVs are net of all cash flows"
    },
    {
      "ExhibitID": "CBQ21-E1-E2",
      "CaseID": "CBQ21-E1",
      "Type": "table",
      "Title": "Exhibit 2 — Post-Audit: Flagship Project",
      "Purpose": "Compares budgeted and actual results for the post-audit variance analysis.",
      "ReferencedBy": [
        "CBQ21-E1-Q2",
        "CBQ21-E1-Q4"
      ],
      "Headers": [
        "Item",
        "Budgeted",
        "Actual"
      ],
      "Rows": [
        [
          "Revenue",
          "$1,000,000",
          "$950,000"
        ],
        [
          "Variable costs",
          "$400,000",
          "$420,000"
        ],
        [
          "Fixed costs",
          "$250,000",
          "$260,000"
        ],
        [
          "Operating income",
          "$350,000",
          "$270,000"
        ]
      ],
      "DataFormat": "USD whole dollars",
      "AccuracyCheck": "Budgeted OI = 1,000,000 - 400,000 - 250,000; Actual OI = 950,000 - 420,000 - 260,000"
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-E1-Q1",
      "Type": "numeric",
      "Prompt": "Enter the profitability index of Proposal B, rounded to two decimal places.",
      "Correct": "1.33",
      "Explanation": "Profitability index = PV of future cash flows / Initial investment = 1 + (NPV / Investment) = 1 + ($500,000 / $1,500,000) = 1.33. The PI converts each proposal's NPV into a per-dollar ratio, which is exactly the ranking tool the $5.0 million cap requires. Proposal B returns $1.33 of present value per invested dollar — the highest of the six proposals — so it sits first in Controller Okonkwo's ranking.",
      "Topic": "Profitability index",
      "Subtopic": "PI computation",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "ID-02: Profitability Index",
      "CommonTrapReference": "Reporting the NPV-to-investment ratio (0.33) without adding 1, or dividing investment by NPV.",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "PI"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-E1-Q2",
      "Type": "numeric",
      "Prompt": "Enter the operating income variance in dollars from Exhibit 2; use a negative sign for unfavorable.",
      "Correct": "-80000",
      "Explanation": "Operating income variance = Actual - Budget = $270,000 - $350,000 = -$80,000 unfavorable. The post-audit's job is not to punish but to decompose this $80,000 miss into its drivers so Harborview's next forecasts learn from it: revenue came in $50,000 light while costs ran $30,000 over.",
      "Topic": "Post-audit variance",
      "Subtopic": "Operating income reconciliation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "ID-10: Post-Audit Variance Analysis",
      "CommonTrapReference": "Sign errors — reporting unfavorable variances as positive.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "post-audit"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-E1-Q3",
      "Type": "select",
      "Prompt": "Which combination maximizes total NPV within the $5.0 million budget?",
      "Correct": "C",
      "Choices": [
        "B, C, and A — $4.5M invested, NPV of $1.42M",
        "A, B, and F — $4.7M invested, NPV of $1.46M",
        "A, C, D, and F — $5.0M invested, NPV of $1.48M",
        "B, C, F, and D — $4.5M invested, NPV of $1.38M"
      ],
      "Explanation": "With indivisible projects, the optimum must be found by evaluating combinations, not by the PI-greedy sequence. Exhaustive check: A + C + D + F invests $2.0M + $1.0M + $0.8M + $1.2M = $5.0M — the entire budget — for NPV of $600K + $320K + $200K + $360K = $1,480,000. A + B + F ($4.7M, $1.46M) is close, but replacing B ($1.5M for $500K NPV) with C + D ($1.8M for $520K NPV) fits the cap and adds $20K. The PI-greedy order B, C, A stops at $4.5M and $1.42M because neither F nor D fits the remaining $0.5M. Lesson: PI (1.33, 1.32, 1.30, 1.30, 1.25, 1.16) is a screening tool under rationing, not a guarantee of the NPV-maximizing combination.",
      "Topic": "Capital rationing",
      "Subtopic": "PI ranking under a budget constraint",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "ID-02: Profitability Index (rationing)",
      "CommonTrapReference": "Assuming the PI-greedy sequence yields the global optimum with indivisible projects, or ranking by raw NPV alone.",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "rationing",
        "PI"
      ],
      "Dependencies": [
        "CBQ21-E1-Q1"
      ]
    },
    {
      "ItemID": "CBQ21-E1-Q4",
      "Type": "select",
      "Prompt": "Which component contributed most to the unfavorable post-audit variance?",
      "Correct": "A",
      "Choices": [
        "Revenue, unfavorable by $50,000",
        "Variable costs, unfavorable by $20,000",
        "Fixed costs, unfavorable by $10,000",
        "All three contributed equally"
      ],
      "Explanation": "Decomposition: revenue $950,000 - $1,000,000 = -$50,000; variable costs $420,000 - $400,000 = -$20,000 unfavorable; fixed costs $260,000 - $250,000 = -$10,000 unfavorable. Revenue's $50,000 miss is the largest driver, matching the $-80,000 total. Okonkwo should present revenue as the root cause and recommend re-examining the sales forecast assumptions.",
      "Topic": "Post-audit decomposition",
      "Subtopic": "Variance attribution",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "ID-10: Post-Audit Variance Analysis",
      "CommonTrapReference": "Focusing on cost variances when revenue explains most of the miss.",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "post-audit",
        "attribution"
      ],
      "Dependencies": [
        "CBQ21-E1-Q2"
      ]
    },
    {
      "ItemID": "CBQ21-E1-Q5",
      "Type": "multi",
      "Prompt": "Which three of the following are legitimate purposes of a capital project post-audit?",
      "Correct": [
        "Refining future cash-flow forecasts",
        "Identifying systematic estimation bias",
        "Holding managers accountable for controllable outcomes"
      ],
      "Choices": [
        "Refining future cash-flow forecasts",
        "Identifying systematic estimation bias",
        "Holding managers accountable for controllable outcomes",
        "Punishing managers for uncontrollable market variances",
        "Retroactively changing the acceptance criteria"
      ],
      "Explanation": "A post-audit improves future decisions by comparing forecasts with actuals, exposing whether estimates were systematically optimistic, and holding managers accountable for the outcomes they control. It is not a punishment tool for uncontrollable market swings, and changing acceptance criteria after the fact destroys the audit's learning value. These three purposes are why Harborview runs post-audits on every project above $1 million.",
      "Topic": "Post-audit purposes",
      "Subtopic": "Capital budgeting control",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "CognitiveLevel": "Understand",
      "CalculationRequired": false,
      "FormulaReference": "ID-10: Post-Audit Variance Analysis (conceptual purposes)",
      "CommonTrapReference": "Treating the post-audit as a punitive or hindsight exercise.",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "post-audit"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ21-E1-Q6",
      "Type": "match",
      "Prompt": "Match each capital budgeting tool to its purpose.",
      "Correct": {
        "NPV": "Primary criterion — measures dollar value added",
        "Profitability index": "Present value of inflows per dollar invested — ranks projects under rationing",
        "Payback": "Liquidity and risk screen — ignores the time value of money",
        "Post-audit": "Compares forecasted and actual results to improve future estimates"
      },
      "LeftItems": [
        "NPV",
        "Profitability index",
        "Payback",
        "Post-audit"
      ],
      "RightItems": [
        "Primary criterion — measures dollar value added",
        "Present value of inflows per dollar invested — ranks projects under rationing",
        "Liquidity and risk screen — ignores the time value of money",
        "Compares forecasted and actual results to improve future estimates"
      ],
      "Explanation": "NPV measures absolute value added and is the primary accept/reject criterion; the profitability index converts a project's present value of inflows into a per-dollar ratio that ranks projects when capital is rationed; payback screens liquidity and risk but ignores the time value of money; and the post-audit closes the loop by comparing forecasts with actuals. Okonkwo's committee presentation uses each tool in exactly this role.",
      "Topic": "Capital budgeting tools",
      "Subtopic": "Tool selection",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "CognitiveLevel": "Understand",
      "CalculationRequired": false,
      "FormulaReference": "ID-01 NPV; ID-02 PI; ID-03 Payback; ID-10 Post-Audit",
      "CommonTrapReference": "Using payback or PI as the primary criterion where NPV should govern.",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "NPV",
        "PI",
        "payback"
      ],
      "Dependencies": []
    }
  ]
}
,
{
 "CaseID": "CBQ21-A1",
 "Title": "Liquidity, Leverage, and the Credit Renewal",
 "SectionTags": [
  "A"
 ],
 "BlueprintDomain": "Financial Statement Analysis",
 "BlueprintObjectives": [
  "Compute and interpret liquidity ratios including the treatment of current portions of long-term debt",
  "Evaluate covenant compliance and prepare a remediation position for a lender"
 ],
 "PrimaryCompetency": "Calculation",
 "EstimatedMinutes": 30,
 "Difficulty": "Moderate",
 "DifficultyScore": 3,
 "ScenarioText": "Harborline Distributors must renew its $4 million revolving credit facility, and First Meridian Bank requires a current ratio of at least 1.50, a quick ratio of at least 1.00, and debt-to-equity no greater than 1.00 at fiscal year-end. Controller Dana Whitfield has assembled the draft balance sheet and operating data and must present the covenant certificate — including a credible remediation plan for any shortfall.",
 "Industry": "Wholesale distribution",
 "CompanyType": "Distributor",
 "CompanyName": "Harborline Distributors",
 "Stakeholder": "Controller Dana Whitfield",
 "BusinessFunction": "Treasury",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "current ratio",
  "quick ratio",
  "covenants",
  "credit renewal"
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
  "Compute current and quick ratios from a classified balance sheet",
  "Compute days sales outstanding using average receivables",
  "Test covenant thresholds and identify which fail",
  "Formulate an operationally credible remediation commitment"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ21-A1-E1",
   "CaseID": "CBQ21-A1",
   "Type": "table",
   "Title": "Exhibit 1 — Draft Year-End Balance Sheet Extract ($000)",
   "Purpose": "Provides the classified balance sheet amounts used for the current ratio, quick ratio, and debt-to-equity covenant tests.",
   "ReferencedBy": [
    "CBQ21-A1-Q1",
    "CBQ21-A1-Q2",
    "CBQ21-A1-Q4",
    "CBQ21-A1-Q6",
        "CBQ21-A1-Q3",
        "CBQ21-A1-Q5"
      ],
   "Headers": [
    "Line item",
    "Amount"
   ],
   "Rows": [
    [
     "Cash and equivalents",
     "$260"
    ],
    [
     "Accounts receivable",
     "$480"
    ],
    [
     "Inventory",
     "$520"
    ],
    [
     "Prepaid expenses",
     "$40"
    ],
    [
     "Total current assets",
     "$1,300"
    ],
    [
     "Accounts payable",
     "$420"
    ],
    [
     "Accrued liabilities",
     "$130"
    ],
    [
     "Current portion of long-term debt",
     "$250"
    ],
    [
     "Total current liabilities",
     "$800"
    ],
    [
     "Long-term debt",
     "$250"
    ],
    [
     "Shareholders' equity",
     "$1,150"
    ],
    [
     "Net property and equipment",
     "$900"
    ]
   ],
   "DataFormat": "USD thousands",
   "AccuracyCheck": "Total assets 2,200 = current liabilities 800 + long-term debt 250 + equity 1,150; totals foot internally"
  },
  {
   "ExhibitID": "CBQ21-A1-E2",
   "CaseID": "CBQ21-A1",
   "Type": "table",
   "Title": "Exhibit 2 — Operating Data ($000)",
   "Purpose": "Provides sales, cost of goods sold, and prior-year balances for DSO and days-in-inventory analysis supporting the covenant discussion.",
   "ReferencedBy": [
    "CBQ21-A1-Q3",
    "CBQ21-A1-Q5"
   ],
   "Headers": [
    "Item",
    "Amount"
   ],
   "Rows": [
    [
     "Net sales (all credit)",
     "$3,650"
    ],
    [
     "Cost of goods sold",
     "$2,560"
    ],
    [
     "Prior-year accounts receivable",
     "$430"
    ],
    [
     "Prior-year inventory",
     "$470"
    ]
   ],
   "DataFormat": "USD thousands; 365-day year convention",
   "AccuracyCheck": "Averages use (beginning + ending)/2; daily sales = 3,650/365 = 10.0"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ21-A1-Q1",
   "Type": "numeric",
   "Prompt": "Enter the current ratio, rounded to two decimals (answers within 0.01 accepted).",
   "Correct": "1.63",
   "Explanation": "Current ratio = Current assets ÷ Current liabilities = $1,300 ÷ $800 = 1.63 (per FA-01). The $250 current portion of long-term debt is properly included in current liabilities under ASC 470-10 because it comes due within twelve months — a classic exclusion error would report 1,300 ÷ 550 = 2.36 and mask the covenant pressure. At 1.63 versus the 1.50 floor, Harborline clears this test with modest headroom.",
   "Topic": "Current ratio",
   "Subtopic": "Covenant measurement",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "FA-01: Current Ratio",
   "CommonTrapReference": "Excluding the current portion of long-term debt from current liabilities.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "current ratio",
    "covenant"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-A1-Q2",
   "Type": "numeric",
   "Prompt": "Enter the quick ratio, rounded to two decimals (answers within 0.01 accepted).",
   "Correct": "0.93",
   "Explanation": "Quick ratio = (Cash + Receivables) ÷ Current liabilities = ($260 + $480) ÷ $800 = $740 ÷ $800 = 0.93 (per FA-02). Inventory and prepaids are excluded because they are the least certain to convert to cash quickly. At 0.93 versus the 1.00 floor, Harborline FAILS this covenant by seven points — the shortfall that drives the renewal conversation.",
   "Topic": "Quick ratio",
   "Subtopic": "Covenant measurement",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "FA-02: Quick Ratio",
   "CommonTrapReference": "Including inventory or prepaids in the numerator.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "quick ratio",
    "covenant"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-A1-Q3",
   "Type": "numeric",
   "Prompt": "Enter days sales outstanding (DSO) using average receivables, rounded to one decimal.",
   "Correct": "45.5",
   "Explanation": "DSO = Average receivables ÷ (Net credit sales ÷ 365) = (($480 + $430)/2) ÷ ($3,650/365) = $455 ÷ $10.0 = 45.5 days (per FA-05). Collections run about a month and a half behind sale; whether that is problematic depends on stated terms, but the aging composition matters more than the average — Exhibit 1 shows receivables at roughly 13% of annual sales.",
   "Topic": "Days sales outstanding",
   "Subtopic": "Receivables quality",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "FA-05: Days Sales Outstanding",
   "CommonTrapReference": "Using ending instead of average receivables, or a 360-day year.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "DSO",
    "receivables"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-A1-Q4",
   "Type": "select",
   "Prompt": "Based on Exhibits 1 and your computations, which covenant position does Harborline present at year-end?",
   "Correct": "B",
   "Choices": [
    "The company passes all three covenants with headroom on each",
    "The company passes the current-ratio and debt-to-equity tests but FAILS the quick-ratio test (0.93 versus 1.00)",
    "The company passes the quick ratio but fails the current-ratio test",
    "The company fails all three covenants"
   ],
   "Explanation": "Current ratio 1.63 ≥ 1.50 PASS; quick ratio 0.93 < 1.00 FAIL; debt-to-equity = ($800 + $250) ÷ $1,150 = 0.91 ≤ 1.00 PASS. Only the quick ratio binds. The pattern matters for the negotiation: the miss is a LIQUIDITY-composition problem (too much of the current asset base sits in inventory), not a solvency or earnings problem — which shapes what remediation the bank will accept.",
   "Topic": "Covenant compliance",
   "Subtopic": "Threshold testing",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "FA-01/FA-02/FA-07 composite test",
   "CommonTrapReference": "Testing each ratio against the wrong threshold or miscomputing total debt for D/E.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "covenants",
    "compliance"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-A1-Q5",
   "Type": "select",
   "Prompt": "Which diagnosis best explains the quick-ratio shortfall and points to the fastest compliant fix?",
   "Correct": "D",
   "Choices": [
    "Receivables are uncollectible in material amount and should be written down before certification",
    "The current portion of long-term debt was misclassified and should be moved to non-current liabilities",
    "Equity is sufficient to absorb the shortfall, so the covenant should be renegotiated rather than remediated",
    "Inventory dominates the current asset base — average inventory supports roughly 70.6 days of sales (495 ÷ 2,560 × 365) — so converting slow-moving stock into cash is the fastest path to restoring the quick ratio"
   ],
   "Explanation": "Average inventory of ($520 + $470)/2 = $495 represents 70.6 days of COGS — the heavy tail of the current asset cycle. Because quick assets are $740 against $800 required, converting just $60K of inventory into cash restores the ratio to exactly 1.00. Writing down receivables (A) worsens quick assets; reclassifying the current maturities (B) violates ASC 470-10 presentation; and equity cushions address solvency, not the liquidity composition the quick ratio measures (C).",
   "Topic": "Working capital composition",
   "Subtopic": "Remediation diagnosis",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "FA-04: Days Inventory Outstanding",
   "CommonTrapReference": "Confusing solvency (equity) with liquidity (asset composition).",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "inventory",
    "remediation"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-A1-Q6",
   "Type": "select",
   "Prompt": "Which presentation to First Meridian Bank best positions the renewal?",
   "Correct": "C",
   "Choices": [
    "Certify full compliance as computed, since 0.93 rounds to 1.0 at whole-number precision",
    "Disclose the breach and request a waiver without operational changes, relying on the 12-year relationship",
    "Commit to converting at least $60K of identified slow-moving inventory into cash by year-end — restoring the quick ratio to 1.00 — supported by an itemized liquidation schedule, alongside passing results on the other two covenants",
    "Repay the $250K current portion of long-term debt using proceeds drawn on the same revolving facility on the final day of the year"
   ],
   "Explanation": "The credible package pairs the measured breach with a specific, verifiable operational fix: $740 of quick assets plus $60 of converted inventory equals $800, exactly meeting the 1.00 floor. Option A misstates rounding conventions (the covenant tests reported figures). Option B forfeits negotiating leverage by asking for relief without remediation. Option D is circular financing — repaying the bank with the bank's own money leaves total obligations unchanged, violates typical revolver covenants against such usage, and lenders and auditors treat it as ineffective window dressing.",
   "Topic": "Credit negotiation strategy",
   "Subtopic": "Remediation commitment",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Proposing circular year-end financing that lenders treat as window dressing.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "negotiation",
    "window dressing"
   ],
   "Dependencies": []
  }
 ]
},
{
 "CaseID": "CBQ21-D1",
 "Title": "Quantifying Launch Risk Before the Board",
 "SectionTags": [
  "D"
 ],
 "BlueprintDomain": "Risk Management",
 "BlueprintObjectives": [
  "Compute inherent and residual expected loss under COSO ERM 2017",
  "Classify risk responses (reduce, share, avoid) and test them against risk appetite",
  "Recommend a board-ready risk position"
 ],
 "PrimaryCompetency": "Analysis",
 "EstimatedMinutes": 30,
 "Difficulty": "Moderate",
 "DifficultyScore": 3,
 "ScenarioText": "Kestrel Electronics prepares to launch a connected home device, and risk manager Omar Haddad has facilitated a quantified risk workshop ahead of the board review. The board's risk appetite statement caps EXPECTED loss from any single identified risk at $500,000 annually before management response. Omar must quantify the register, classify the proposed responses, and recommend which actions to fund.",
 "Industry": "Consumer electronics",
 "CompanyType": "Manufacturer",
 "CompanyName": "Kestrel Electronics",
 "Stakeholder": "Risk Manager Omar Haddad",
 "BusinessFunction": "Enterprise risk management",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "expected loss",
  "risk response",
  "risk appetite",
  "COSO ERM"
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
  "Compute expected loss as probability times impact",
  "Distinguish inherent from residual expected loss after mitigation",
  "Match responses to the reduce/share/avoid taxonomy",
  "Test exposure against a quantitative risk appetite threshold"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ21-D1-E1",
   "CaseID": "CBQ21-D1",
   "Type": "table",
   "Title": "Exhibit 1 — Launch Risk Register (Inherent)",
   "Purpose": "Provides the probability and impact estimates for the three material launch risks, used for expected-loss computation and appetite testing.",
   "ReferencedBy": [
    "CBQ21-D1-Q1",
    "CBQ21-D1-Q3",
    "CBQ21-D1-Q5",
        "CBQ21-D1-Q2"
      ],
   "Headers": [
    "Risk",
    "Description",
    "Probability",
    "Impact"
   ],
   "Rows": [
    [
     "R1",
     "Sole-source chip supply disruption",
     "25%",
     "$4.0M"
    ],
    [
     "R2",
     "Regulatory certification delay",
     "15%",
     "$2.0M"
    ],
    [
     "R3",
     "Warranty claims surge",
     "10%",
     "$1.0M"
    ]
   ],
   "DataFormat": "Probabilities are annual; impacts are estimated pretax effect",
   "AccuracyCheck": "Estimates from facilitated workshop with engineering and legal input"
  },
  {
   "ExhibitID": "CBQ21-D1-E2",
   "CaseID": "CBQ21-D1",
   "Type": "table",
   "Title": "Exhibit 2 — Candidate Responses",
   "Purpose": "Provides the cost and effect of each proposed response so residual risk and net benefit can be computed.",
   "ReferencedBy": [
    "CBQ21-D1-Q2",
    "CBQ21-D1-Q3",
    "CBQ21-D1-Q4",
    "CBQ21-D1-Q6"
   ],
   "Headers": [
    "Response",
    "Applied to",
    "Cost",
    "Effect"
   ],
   "Rows": [
    [
     "Dual-source chip contract",
     "R1",
     "$150K per year",
     "Cuts disruption probability to 10%"
    ],
    [
     "Warranty insurance policy",
     "R3",
     "$80K per year",
     "Transfers losses above $100K retained"
    ],
    [
     "Delay launch one quarter",
     "All",
     "Deferred margin (not quantified)",
     "Defers all three risks for the period"
    ]
   ],
   "DataFormat": "USD; probabilities annual",
   "AccuracyCheck": "Dual-source effect applies only to likelihood; impact unchanged at $4.0M"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ21-D1-Q1",
   "Type": "numeric",
   "Prompt": "Enter the INHERENT expected loss for R1 (sole-source chip disruption), in dollars.",
   "Correct": "1000000",
   "Explanation": "Expected loss = Probability × Impact (RM-01) = 0.25 × $4,000,000 = $1,000,000. This is the pre-response benchmark: absent any action, the market prices R1 as a $1M-per-year drag in expectation. Expected loss is a long-run weighted average — not the worst case — and it is the figure the board's $500K appetite threshold tests FIRST.",
   "Topic": "Expected loss",
   "Subtopic": "Inherent risk quantification",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "RM-01: Expected Loss",
   "CommonTrapReference": "Using worst-case impact instead of the probability-weighted expectation.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "expected loss",
    "inherent risk"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-D1-Q2",
   "Type": "numeric",
   "Prompt": "Enter the RESIDUAL expected loss for R1 after implementing the dual-source contract, in dollars.",
   "Correct": "400000",
   "Explanation": "Residual expected loss = revised probability × unchanged impact = 0.10 × $4,000,000 = $400,000 (RM-03 logic: controls reduce the risk level). Dual sourcing attacks LIKELIHOOD only — the impact stays $4.0M because a disruption still halts production when it occurs. Residual risk never reaches zero; it settles at the level the control can economically reach.",
   "Topic": "Residual expected loss",
   "Subtopic": "Control effectiveness",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "RM-03: Residual Risk",
   "CommonTrapReference": "Reducing the impact as well as the probability when only likelihood changed.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "residual risk",
    "controls"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-D1-Q3",
   "Type": "numeric",
   "Prompt": "Enter the net year-one economic benefit of the dual-source contract, in dollars.",
   "Correct": "450000",
   "Explanation": "Benefit = inherent EL − residual EL = $1,000,000 − $400,000 = $600,000 of expected-loss avoidance. Net benefit = $600,000 − $150,000 annual contract cost = +$450,000. The control pays for itself four-fold in expectation — the standard cost-benefit test for funding a risk response, before considering tail-risk preference beyond the expected value.",
   "Topic": "Mitigation cost-benefit",
   "Subtopic": "Response funding decision",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": true,
   "FormulaReference": "RM-01 extension: net benefit = EL avoided − control cost",
   "CommonTrapReference": "Comparing the contract cost to the IMPACT rather than to the expected-loss reduction.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "cost-benefit",
    "mitigation"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-D1-Q4",
   "Type": "select",
   "Prompt": "Classify each proposed response under the COSO ERM risk-response taxonomy.",
   "Correct": "B",
   "Choices": [
    "Dual sourcing = share; insurance = reduce; delay = accept",
    "Dual sourcing = REDUCE (lowers likelihood); insurance = SHARE (transfers excess loss); launch delay = AVOID (declines the exposed activity for the period)",
    "Dual sourcing = avoid; insurance = avoid; delay = reduce",
    "All three are variations of acceptance with contingency planning"
   ],
   "Explanation": "The taxonomy turns on mechanism. Dual sourcing changes the odds of the event — REDUCE. Insurance leaves the event's frequency untouched and transfers severity above the retention to a carrier — SHARE. Delaying the launch declines the exposure for that period entirely — AVOID (a temporary form; permanent avoidance would cancel the launch). Acceptance would mean keeping R1 at 25% with contingency funds set aside, which no proposal does.",
   "Topic": "Risk response classification",
   "Subtopic": "COSO ERM taxonomy",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Calling insurance 'reduce' — it changes who bears the loss, not whether the event occurs.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "reduce",
    "share",
    "avoid"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-D1-Q5",
   "Type": "select",
   "Prompt": "Against the board's appetite cap of $500K expected loss per initiative, which risk(s) require action BEFORE launch?",
   "Correct": "C",
   "Choices": [
    "All three risks breach the appetite threshold",
    "Each response cost sits below $500,000, so no funded action changes the appetite position",
    "Only R1 breaches — inherent expected loss of $1.0M exceeds the $500K cap; R2 ($300K) and R3 ($100K) sit inside appetite",
    "R1 and R2 both breach because their combined expected loss exceeds $500K"
   ],
   "Explanation": "Appetite tests compare each risk's EXPECTED loss to the threshold: R1 = $1.0M > $500K BREACH; R2 = 0.15 × $2.0M = $300K OK; R3 = 0.10 × $1.0M = $100K OK. Impacts alone are not the appetite metric (A confuses impact with expectation), and the cap reads on each single identified risk - aggregation is a separate portfolio question (D). Only R1 demands funded response before launch; after dual sourcing its residual of $400K moves inside appetite.",
   "Topic": "Risk appetite testing",
   "Subtopic": "Threshold escalation",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "RM-01 applied per risk against stated appetite",
   "CommonTrapReference": "Comparing impact instead of expected loss to the appetite threshold.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "appetite",
    "thresholds"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-D1-Q6",
   "Type": "select",
   "Prompt": "Which board recommendation best integrates the quantified analysis?",
   "Correct": "B",
   "Choices": [
    "Delay the launch one quarter regardless of cost, because any risk above zero appetite is unacceptable",
    "Fund the dual-source contract now — residual R1 expected loss of $400K moves inside the $500K appetite and the $450K net benefit is strongly positive — while monitoring R2 and R3 quarterly against the threshold",
    "Purchase warranty insurance immediately because transferring risk is always the preferred response",
    "Take no action: expected losses are averages, so no single year will realize them"
   ],
   "Explanation": "The analysis converges on one action: R1 is the sole appetite breach, the dual-source response brings it inside appetite, and its $450K net benefit clears the funding hurdle — the definition of a value-adding control. Delay (A) destroys launch economics to cure risks already inside appetite. Insurance (C) targets R3, which is not the breach, and 'always preferred' misstates the taxonomy. Waiting (D) ignores that appetite governs EXPOSURE, not realized outcomes — the breach exists today.",
   "Topic": "Board risk recommendation",
   "Subtopic": "Response selection",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Recommending responses for risks that already sit inside appetite.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation",
    "board reporting"
   ],
   "Dependencies": []
  }
 ]
}
,
{
 "CaseID": "CBQ21-B2",
 "Title": "Financing the Expansion",
 "SectionTags": [
  "B"
 ],
 "BlueprintDomain": "Corporate Finance",
 "BlueprintObjectives": [
  "Compute component costs of capital including tax effects",
  "Compute weighted average cost of capital at market-value weights",
  "Evaluate how incremental financing changes the marginal hurdle rate"
 ],
 "PrimaryCompetency": "Calculation",
 "EstimatedMinutes": 30,
 "Difficulty": "Moderate",
 "DifficultyScore": 3,
 "ScenarioText": "Northstar Capital's board approved a $40 million capacity expansion, and CFO Priya Nair must present the funding plan. The treasury team has compiled current market values and component-cost inputs, and the committee expects the proposal to state the applicable hurdle rate and defend the financing mix.",
 "Industry": "Industrial services",
 "CompanyType": "Service provider",
 "CompanyName": "Northstar Capital",
 "Stakeholder": "CFO Priya Nair",
 "BusinessFunction": "Capital structure planning",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "WACC",
  "CAPM",
  "cost of capital",
  "financing mix"
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
  "Compute after-tax cost of debt, cost of preferred, and CAPM cost of equity",
  "Weight components at market values to compute WACC",
  "Explain why incremental financing shifts the marginal cost of capital"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ21-B2-E1",
   "CaseID": "CBQ21-B2",
   "Type": "table",
   "Title": "Exhibit 1 — Current Capital Structure (Market Values)",
   "Purpose": "Provides the market-value weights and component inputs for the WACC computation.",
   "ReferencedBy": [
    "CBQ21-B2-Q1",
    "CBQ21-B2-Q2",
    "CBQ21-B2-Q3",
    "CBQ21-B2-Q4"
   ],
   "Headers": [
    "Component",
    "Market value",
    "Input"
   ],
   "Rows": [
    [
     "Long-term debt",
     "$60M",
     "Yield to maturity 6.0%"
    ],
    [
     "Preferred stock",
     "$20M",
     "Annual dividend $2.50 per share; market price $25"
    ],
    [
     "Common equity",
     "$120M",
     "Beta 1.20"
    ],
    [
     "Total capital",
     "$200M",
     ""
    ]
   ],
   "DataFormat": "USD millions except per-share amounts",
   "AccuracyCheck": "Weights: 30% debt, 10% preferred, 60% equity"
  },
  {
   "ExhibitID": "CBQ21-B2-E2",
   "CaseID": "CBQ21-B2",
   "Type": "table",
   "Title": "Exhibit 2 — Market Parameters",
   "Purpose": "Provides the tax rate and equity-market parameters required for component-cost formulas.",
   "ReferencedBy": [
    "CBQ21-B2-Q1",
    "CBQ21-B2-Q3",
    "CBQ21-B2-Q5",
    "CBQ21-B2-Q6"
   ],
   "Headers": [
    "Parameter",
    "Value"
   ],
   "Rows": [
    [
     "Marginal tax rate",
     "25%"
    ],
    [
     "Risk-free rate",
     "4.0%"
    ],
    [
     "Market risk premium",
     "5.5%"
    ]
   ],
   "DataFormat": "Percentages",
   "AccuracyCheck": "Inputs consistent with CAPM notation Rf + beta x MRP"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ21-B2-Q1",
   "Type": "numeric",
   "Prompt": "Enter the AFTER-TAX cost of debt in percent, rounded to two decimals.",
   "Correct": "4.50",
   "Explanation": "Interest is tax-deductible, so the effective cost of debt = pre-tax yield × (1 − t) = 6.0% × (1 − 0.25) = 4.50% (per CB-07). Only the after-tax figure belongs inside the WACC — using the 6.0% coupon-side yield overstates the debt component by a third and biases the whole average upward.",
   "Topic": "After-tax cost of debt",
   "Subtopic": "Tax shield",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "CB-07: After-Tax Cost of Debt = Rd x (1 - t)",
   "CommonTrapReference": "Entering the pre-tax yield directly into WACC.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "debt",
    "tax shield"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-B2-Q2",
   "Type": "numeric",
   "Prompt": "Enter the cost of preferred stock in percent, rounded to two decimals.",
   "Correct": "10.00",
   "Explanation": "Cost of preferred = annual dividend ÷ market price = $2.50 ÷ $25.00 = 10.00% (per CB-06). Preferred dividends carry NO tax shield — they are paid from after-tax dollars — so unlike debt there is no (1 − t) adjustment here; applying one is the classic error.",
   "Topic": "Cost of preferred stock",
   "Subtopic": "Dividend yield method",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "CB-06: Rp = Dp / Pp",
   "CommonTrapReference": "Applying the (1 - t) adjustment to preferred stock.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "preferred"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-B2-Q3",
   "Type": "numeric",
   "Prompt": "Enter the CAPM cost of common equity in percent, rounded to two decimals.",
   "Correct": "10.60",
   "Explanation": "CAPM: Re = Rf + beta × MRP = 4.0% + 1.20 × 5.5% = 4.0% + 6.6% = 10.60% (per CB-04). This is the return shareholders require for Northstar's systematic risk — the benchmark the business must beat on every incremental dollar of equity-funded investment.",
   "Topic": "Cost of equity",
   "Subtopic": "CAPM",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "CB-04: Re = Rf + b(Rm - Rf)",
   "CommonTrapReference": "Multiplying beta by the market RETURN instead of the risk premium.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "CAPM"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-B2-Q4",
   "Type": "numeric",
   "Prompt": "Enter Northstar's current WACC in percent, rounded to two decimals.",
   "Correct": "8.71",
   "Explanation": "Weights at market value: debt 60/200 = 0.30, preferred 20/200 = 0.10, equity 120/200 = 0.60. WACC = 0.30 × 4.50% + 0.10 × 10.00% + 0.60 × 10.60% = 1.35% + 1.00% + 6.36% = 8.71% (per CB-05). Market-value weighting matters because book weights would underweight the equity investors actually price at premium levels.",
   "Topic": "Weighted average cost of capital",
   "Subtopic": "Market-value weights",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "CB-05: WACC = (E/V)Re + (P/V)Rp + (D/V)Rd(1-t)",
   "CommonTrapReference": "Using book-value weights or omitting the preferred tranche.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "WACC"
   ],
   "Dependencies": [
    "CBQ21-B2-Q1",
    "CBQ21-B2-Q2",
    "CBQ21-B2-Q3"
   ]
  },
  {
   "ItemID": "CBQ21-B2-Q5",
   "Type": "select",
   "Prompt": "The committee proposes funding the entire $40M with new 6% debt because 'debt is the cheapest source.' Which evaluation is correct?",
   "Correct": "B",
   "Choices": [
    "The proposal is sound: 4.50% after-tax is below every other component, so the marginal cost of capital falls to 4.50%",
    "Incremental borrowing raises the leverage ratio and therefore the equity holders' required return, so the true marginal cost exceeds 4.50% and evaluating the project at today's 8.71% WACC understates the appropriate hurdle",
    "WACC is a fixed property of the firm and never changes with financing choices, so the hurdle remains 8.71% whatever the mix",
    "Because the expansion is a single project, component costs are irrelevant and any rate above zero is acceptable"
   ],
   "Explanation": "Financing decisions change the capital structure, and structure changes component costs: added debt concentrates operating risk on a thinner equity cushion, pushing the CAPM cost of equity upward (the leverage effect formalized in Modigliani-Miller with taxes and trade-off theory). The marginal cost of the NEXT dollar blends the cheap new debt with the now-more-expensive equity base — it sits between 4.50% and the rising equity cost, not at either endpoint. Evaluating a multi-decade asset at yesterday's 8.71% while loading on debt quietly subsidizes the project's apparent returns.",
   "Topic": "Marginal cost of capital",
   "Subtopic": "Leverage feedback",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Treating the cheapest source as THE marginal cost of a large financing package.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "leverage",
    "marginal cost"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-B2-Q6",
   "Type": "select",
   "Prompt": "Which funding recommendation best balances the competing considerations?",
   "Correct": "A",
   "Choices": [
    "Fund with a MIX — approximately $20M of new debt plus $20M from internally generated funds or equity — preserving interest coverage and rating headroom while still capturing the deductibility of a meaningful debt layer, and re-compute the marginal WACC on the post-transaction structure for the project's hurdle rate",
    "Fund entirely with new debt to maximize the tax shield, accepting whatever coverage ratios result",
    "Fund entirely with new equity to eliminate financial risk completely, regardless of dilution at current prices",
    "Defer the expansion until retained earnings fully cover the $40M internally"
   ],
   "Explanation": "The trade-off framework prices BOTH benefits and costs of debt: the shield argues for a meaningful debt layer, while distress risk, covenant headroom, and equity re-rating argue against concentrating a $40M program in one tranche. A balanced structure keeps the marginal WACC defensible and preserves capacity for future needs. All-debt (B) maximizes the shield but hands the committee a fragile balance sheet exactly when the new assets must ramp; all-equity (C) forfeits the shield and signals overpriced issuance if timed poorly; deferral (D) concedes strategic ground to competitors while cash accumulates.",
   "Topic": "Financing structure recommendation",
   "Subtopic": "Trade-off application",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Optimizing a single dimension (tax shield or risk) instead of the blended position.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation",
    "structure"
   ],
   "Dependencies": []
  }
 ]
},
{
 "CaseID": "CBQ21-E2",
 "Title": "Replacing the Packaging Line: Unequal Lives",
 "SectionTags": [
  "E"
 ],
 "BlueprintDomain": "Investment Decisions",
 "BlueprintObjectives": [
  "Compare mutually exclusive replacements with unequal lives using equivalent annual annuity",
  "Identify assumptions that drive the replacement decision",
  "Formulate a defensible replacement recommendation"
 ],
 "PrimaryCompetency": "Analysis",
 "EstimatedMinutes": 30,
 "Difficulty": "Difficult",
 "DifficultyScore": 4,
 "ScenarioText": "Meridian Foods' packaging line has three years left and costs $220,000 a year to operate and maintain; it could be sold today for $150,000 or fetch $40,000 in three years. A challenger system costs $600,000 installed, runs five years at $90,000 annually, and should realize $100,000 at replacement. Operations director Marcus Webb must recommend replace-now versus keep-three-more-years at a 10% cost of capital (tax effects excluded for comparability).",
 "Industry": "Food processing",
 "CompanyType": "Manufacturer",
 "CompanyName": "Meridian Foods",
 "Stakeholder": "Operations Director Marcus Webb",
 "BusinessFunction": "Capital budgeting",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "EAA",
  "replacement",
  "unequal lives"
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
  "Build present value of cost streams for defender and challenger",
  "Convert unequal-life cost streams to equivalent annual annuities",
  "Select and defend the replacement decision"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ21-E2-E1",
   "CaseID": "CBQ21-E2",
   "Type": "table",
   "Title": "Exhibit 1 — Defender Versus Challenger",
   "Purpose": "Provides the cash-relevant facts for both alternatives used in the annualized-cost comparison.",
   "ReferencedBy": [
    "CBQ21-E2-Q1",
    "CBQ21-E2-Q2",
    "CBQ21-E2-Q3",
    "CBQ21-E2-Q6",
    "CBQ21-E2-Q5"
   ],
   "Headers": [
    "Factor",
    "Defender (keep)",
    "Challenger (replace)"
   ],
   "Rows": [
    [
     "Remaining/new life",
     "3 years",
     "5 years"
    ],
    [
     "Annual operating cost",
     "$220,000",
     "$90,000"
    ],
    [
     "Salvage today",
     "$150,000",
     "n/a"
    ],
    [
     "Salvage at end of life",
     "$40,000 (year 3)",
     "$100,000 (year 5)"
    ],
    [
     "Installed cost",
     "n/a",
     "$600,000"
    ]
   ],
   "DataFormat": "USD; taxes excluded for comparability per the engagement scope",
   "AccuracyCheck": "Keeping the machine means forgoing today's $150,000 salvage — an opportunity cost at time zero"
  },
  {
   "ExhibitID": "CBQ21-E2-E2",
   "CaseID": "CBQ21-E2",
   "Type": "text",
   "Title": "Exhibit 2 — Discount Factors at 10%",
   "Purpose": "Provides the annuity and single-sum factors needed without external tables.",
   "ReferencedBy": [
    "CBQ21-E2-Q1",
    "CBQ21-E2-Q2",
    "CBQ21-E2-Q3",
    "CBQ21-E2-Q4"
   ],
   "Body": "PVIFA(10%, 3 years) = 2.48685\nPVIFA(10%, 5 years) = 3.79079\nPVIF(10%, year 3) = 0.75131\nPVIF(10%, year 5) = 0.62092"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ21-E2-Q1",
   "Type": "numeric",
   "Prompt": "Enter the PRESENT VALUE of keeping the defender for its remaining three years (costs positive), in dollars, within ±$500.",
   "Correct": "667054",
   "Explanation": "Keeping the machine sacrifices today's $150,000 sale (opportunity cost at t=0), pays $220,000 annually for three years, and recovers $40,000 at year three. PV = 150,000 + (220,000 × 2.48685) − (40,000 × 0.75131) = 150,000 + 547,107 − 30,053 = $667,054. The foregone salvage is the item analysts most often forget — selling the defender is half of the replace alternative.",
   "Topic": "Replacement analysis",
   "Subtopic": "Defender cost stream",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "PV of costs with opportunity cost of foregone salvage",
   "CommonTrapReference": "Omitting the foregone salvage value from the keep alternative.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "defender",
    "present value"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-E2-Q2",
   "Type": "numeric",
   "Prompt": "Enter the CHALLENGER's equivalent annual ANNUITY cost (a positive number), in dollars, within ±$500.",
   "Correct": "231899",
   "Explanation": "PV of challenger costs = 600,000 + (90,000 × 3.79079) − (100,000 × 0.62092) = 600,000 + 341,171 − 62,092 = $879,079. Spreading over five years: EAA = 879,079 ÷ 3.79079 = $231,899 per year. The EAA converts a lumpy five-year commitment into the constant annual figure that makes unequal lives comparable.",
   "Topic": "Equivalent annual annuity",
   "Subtopic": "Challenger annualization",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "ID-05: EAA = PV / PVIFA(r, n)",
   "CommonTrapReference": "Comparing raw PVs of unequal-lived alternatives directly.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "EAA",
    "challenger"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-E2-Q3",
   "Type": "numeric",
   "Prompt": "Enter the DEFENDER's equivalent annual annuity cost (a positive number), in dollars, within ±$500.",
   "Correct": "268233",
   "Explanation": "Defender EAA = 667,054 ÷ 2.48685 = $268,233 per year. Comparing the two annualized figures — $231,899 for the challenger against $268,233 for the defender — shows replacement saves roughly $36,300 EVERY YEAR on a like-for-like basis, which is the apples-to-apples comparison the unequal lives demand.",
   "Topic": "Equivalent annual annuity",
   "Subtopic": "Defender annualization",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": true,
   "FormulaReference": "ID-05: EAA = PV / PVIFA(r, n)",
   "CommonTrapReference": "Annualizing over the wrong life (using 5 years for the 3-year defender).",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "EAA",
    "defender"
   ],
   "Dependencies": [
    "CBQ21-E2-Q1"
   ]
  },
  {
   "ItemID": "CBQ21-E2-Q4",
   "Type": "select",
   "Prompt": "Why is the equivalent annual annuity method required here rather than comparing total present values of cost?",
   "Correct": "B",
   "Choices": [
    "Because EAA discounts costs twice, adding conservatism to replacement decisions",
    "Because the alternatives span UNEQUAL lives — the defender's 3-year cost stream and the challenger's 5-year stream are not directly comparable; annualizing places both on a per-year basis so the shorter option is not flattered by its earlier termination",
    "Because EAA ignores salvage values, simplifying the arithmetic",
    "Because the tax code requires annualized comparisons for equipment placed in service mid-year"
   ],
   "Explanation": "Total-PV comparisons bias decisions toward whichever alternative stops sooner: a 3-year cost stream will almost always show a smaller PV than a 5-year stream covering more years of service. Annualizing divides each PV by its own annuity factor, expressing both as cost-per-year-of-service and restoring comparability — the standard treatment for mutually exclusive replacements with unequal lives. Salvage is fully included (C), and no tax-timing rule drives the method (D).",
   "Topic": "Unequal lives methodology",
   "Subtopic": "EAA rationale",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Choosing the shorter-lived alternative because its undiscounted horizon looks cheaper.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "methodology"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-E2-Q5",
   "Type": "select",
   "Prompt": "Which development would MOST likely reverse the replace-now recommendation?",
   "Correct": "A",
   "Choices": [
    "Evidence that the challenger's operating cost escalates rapidly after year 2 — maintenance contracts stepping up sharply — raising its effective annual cost above the defender's $268,233",
    "A modest rise in general interest rates affecting both alternatives equally",
    "Discovery that the defender's paint color no longer matches the facility standard",
    "Confirmation that Product Z packaging volumes will grow 20%, requiring MORE machine-hours from whichever line is installed"
   ],
   "Explanation": "The decision rests on the challenger's $231,899 annualized cost staying below the defender's $268,233. If the challenger's own cost curve escalates steeply — aggressive service-contract step-ups being the usual culprit — its EAA climbs toward and past the defender's, flipping the ranking. Equal rate moves (B) hit both streams similarly and preserve the gap; cosmetic issues (C) are noise; higher volumes (D) raise the VALUE of the better machine, reinforcing replacement rather than reversing it.",
   "Topic": "Decision sensitivity",
   "Subtopic": "Ranking reversals",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Treating the EAA ranking as immutable without stress-testing its cost inputs.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "sensitivity"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ21-E2-Q6",
   "Type": "select",
   "Prompt": "Which recommendation should Marcus Webb present?",
   "Correct": "C",
   "Choices": [
    "Keep the defender through year 3 because its book value is low and disposal would trigger a loss",
    "Replace immediately, and additionally retire the defender early this quarter even before the challenger ships, to bank the $150,000 salvage sooner",
    "REPLACE NOW with the challenger — its equivalent annual cost of $231,899 beats the defender's $268,233 by roughly $36,300 per year — sequencing the cutover during scheduled downtime so the $150,000 defender sale closes on delivery day",
    "Solicit a third bid before acting, since two alternatives can never support a confident decision"
   ],
   "Explanation": "The annualized economics favor replacement decisively, and execution detail protects the value: cutting over during planned downtime avoids production loss, and closing the defender's sale on delivery day captures the $150,000 without carrying an idle asset. Book-value loss (A) is an accounting artifact irrelevant to cash economics. Early standalone disposal (B) strands production capability before the replacement arrives. Demanding endless bids (D) substitutes process for analysis — two well-specified, dominant/subordinate alternatives support action.",
   "Topic": "Replacement recommendation",
   "Subtopic": "Execution sequencing",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Letting accounting loss aversion override cash-economics superiority.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation"
   ],
   "Dependencies": []
  }
 ]
}
];
