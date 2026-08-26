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
  "question_state": "Certified",
  "certification_session": "P2-060",
  "Part": 2,
  "Part2OnlyFlag": true,
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
  "question_state": "Certified",
  "certification_session": "P2-060",
  "Part": 2,
  "Part2OnlyFlag": true,
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
  "question_state": "Certified",
  "certification_session": "P2-060",
  "Part": 2,
  "Part2OnlyFlag": true,
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
},
  {
    "CaseID": "CBQ21-A2",
    "Title": "Lender Credit Review Analysis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute and interpret creditor-focused coverage ratios, including times interest earned",
      "Decompose return on equity using the three-component DuPont identity",
      "Assess earnings quality by distinguishing recurring operating performance from non-recurring items and working-capital-driven accruals"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborline Industrial Manufacturing, Inc., a mid-size producer of commercial HVAC components, is preparing for its annual credit review with Meridian National Bank ahead of renewing an 18,000,000 dollar revolving credit facility. CFO Elena Vasquez must deliver a ratio package and an earnings-quality assessment after FY2026 net income jumped roughly 60 percent on an 11.5 percent sales increase. The bank's credit committee has flagged receivables and inventory growth and asked specifically how much of FY2026 earnings is sustainable. Elena will present times-interest-earned coverage, a DuPont decomposition of return on equity, and a candid assessment of earnings quality to support the renewal request.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A2-E1",
        "CaseID": "CBQ21-A2",
        "Type": "table",
        "Title": "Exhibit 1 - Condensed Income Statements, FY2026 versus FY2025",
        "Purpose": "Provides the FY2026 and FY2025 income statement lines used for the TIE computation (Q1), the DuPont margin input and net income tie-out (Q2), identification of the non-recurring gain (Q3), sales growth rates (Q4), the disclosure-package items (Q5), and gross margin in the matching exercise (Q6).",
        "ReferencedBy": [
          "CBQ21-A2-Q1",
          "CBQ21-A2-Q2",
          "CBQ21-A2-Q3",
          "CBQ21-A2-Q4",
          "CBQ21-A2-Q5",
          "CBQ21-A2-Q6"
        ],
        "Headers": [
          "Line item",
          "FY2026",
          "FY2025"
        ],
        "Rows": [
          [
            "Net sales",
            "42,800,000",
            "38,400,000"
          ],
          [
            "Cost of goods sold",
            "29,960,000",
            "27,264,000"
          ],
          [
            "Gross profit",
            "12,840,000",
            "11,136,000"
          ],
          [
            "Selling, general and administrative expenses",
            "7,704,000",
            "6,720,000"
          ],
          [
            "Operating income (EBIT)",
            "5,136,000",
            "4,416,000"
          ],
          [
            "Interest expense",
            "1,284,000",
            "1,452,000"
          ],
          [
            "Gain on sale of surplus equipment",
            "900,000",
            "0"
          ],
          [
            "Income before income taxes",
            "4,752,000",
            "2,964,000"
          ],
          [
            "Income tax expense (25%)",
            "1,188,000",
            "741,000"
          ],
          [
            "Net income",
            "3,564,000",
            "2,223,000"
          ]
        ],
        "DataFormat": "USD whole dollars; percentages where labeled.",
        "AccuracyCheck": "Column sums verified: 42,800,000 - 29,960,000 = 12,840,000; 12,840,000 - 7,704,000 = 5,136,000; 5,136,000 - 1,284,000 + 900,000 = 4,752,000; 4,752,000 x 25% = 1,188,000; 4,752,000 - 1,188,000 = 3,564,000. Same checks pass for FY2025: 38,400,000 - 27,264,000 = 11,136,000; 11,136,000 - 6,720,000 = 4,416,000; 4,416,000 - 1,452,000 = 2,964,000; 2,964,000 - 741,000 = 2,223,000."
      },
      {
        "ExhibitID": "CBQ21-A2-E2",
        "CaseID": "CBQ21-A2",
        "Type": "table",
        "Title": "Exhibit 2 - Balance Sheet Data and Financing Memos",
        "Purpose": "Supplies average-balance inputs for asset turnover and the equity multiplier (Q2), working-capital growth rates used in the earnings-quality inference (Q4), and the debt and equity figures for the leverage reading in Q6.",
        "ReferencedBy": [
          "CBQ21-A2-Q2",
          "CBQ21-A2-Q4",
          "CBQ21-A2-Q6"
        ],
        "Headers": [
          "Balance sheet item",
          "FY2026",
          "FY2025"
        ],
        "Rows": [
          [
            "Cash and equivalents",
            "2,600,000",
            "2,150,000"
          ],
          [
            "Accounts receivable, net",
            "8,560,000",
            "6,420,000"
          ],
          [
            "Inventory",
            "7,480,000",
            "6,110,000"
          ],
          [
            "Other current assets",
            "1,360,000",
            "1,240,000"
          ],
          [
            "Total current assets",
            "20,000,000",
            "15,920,000"
          ],
          [
            "Total assets",
            "46,000,000",
            "41,200,000"
          ],
          [
            "Total current liabilities",
            "10,000,000",
            "9,280,000"
          ],
          [
            "Long-term debt",
            "13,000,000",
            "14,500,000"
          ],
          [
            "Total liabilities",
            "23,000,000",
            "23,780,000"
          ],
          [
            "Shareholders' equity",
            "23,000,000",
            "17,420,000"
          ],
          [
            "Memo: common stock issued during the year",
            "3,000,000",
            "-"
          ],
          [
            "Memo: dividends declared during the year",
            "984,000",
            "-"
          ]
        ],
        "DataFormat": "USD whole dollars at fiscal year end; memo rows are flows during the year; dash denotes not presented.",
        "AccuracyCheck": "Totals reconcile: current asset components sum to 20,000,000 (FY2026) and 15,920,000 (FY2025); liabilities plus equity equal total assets in both years (23,000,000 + 23,000,000 = 46,000,000; 23,780,000 + 17,420,000 = 41,200,000); FY2026 equity rolls forward as 17,420,000 + 3,564,000 net income + 3,000,000 issuance - 984,000 dividends = 23,000,000."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A2-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute Harborline's FY2026 times-interest-earned ratio (EBIT divided by interest expense). Enter as a plain number rounded to two decimal places (tolerance +/-0.01).",
        "Correct": "4.00",
        "Explanation": "Times interest earned divides earnings before interest and taxes by interest expense. Harborline's FY2026 EBIT is 5,136,000 (gross profit 12,840,000 less SG&A of 7,704,000) and interest expense is 1,284,000, so TIE = 5,136,000 / 1,284,000 = 4.00x. Coverage of four times comfortably services the revolver today, though the bank will also test durability using EBIT before the one-time gain: 4,236,000 / 1,284,000 = 3.30x. In business terms, EBIT could fall by three quarters before cash coverage of interest is threatened. The classic trap is using earnings before tax or net income in the numerator; both omit the required add-back of interest and understate true coverage.",
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
        "ItemID": "CBQ21-A2-Q2",
        "Type": "numeric",
        "Prompt": "Using Exhibits 1 and 2, compute Harborline's FY2026 return on equity through the three-component DuPont decomposition (net profit margin x total asset turnover x equity multiplier). Express the result as a percentage rounded to two decimal places (tolerance +/-0.01 percentage points) and use average total assets and average shareholders' equity.",
        "Correct": "17.63",
        "Explanation": "The DuPont identity decomposes ROE into net profit margin x total asset turnover x equity multiplier. Margin = 3,564,000 / 42,800,000 = 0.0833; turnover = 42,800,000 / 43,600,000 average assets = 0.9817; multiplier = 43,600,000 / 20,210,000 average equity = 2.1573. Multiplying: 0.0833 x 0.9817 x 2.1573 = 0.1763, i.e., 17.63 percent, which ties exactly to the direct computation of net income over average equity (3,564,000 / 20,210,000). For the lender, an equity multiplier above 2 shows ROE is materially leverage-assisted, so coverage and liquidity metrics carry extra weight in the credit decision. The common trap is using year-end rather than average balances for assets and equity, which inflates the multiplier and overstates ROE.",
        "Topic": "DuPont ROE decomposition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-14",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q3",
        "Type": "select",
        "Prompt": "In assessing FY2026 earnings quality for the credit committee, which observation represents the most significant limitation on the sustainability of reported net income?",
        "Correct": "B",
        "Choices": {
          "A": "Gross margin improved from 29.0 percent to 30.0 percent, indicating durable pricing power in the component business.",
          "B": "Reported net income includes a 900,000 pre-tax gain on the sale of surplus equipment; the gain is non-recurring and sits below operating income.",
          "C": "Interest expense declined from 1,452,000 to 1,284,000, flattering the year-over-year net income comparison.",
          "D": "The 3,000,000 common stock issuance raised book equity and mechanically inflated the reported return on equity."
        },
        "Explanation": "Earnings quality asks how much reported profit will recur. The 900,000 pre-tax gain on surplus equipment sits below operating income, is by nature non-recurring, and equals roughly 19 percent of pre-tax income (900,000 / 4,752,000 = 0.189), so sustainable covenant EBITDA is correspondingly lower than headline results suggest. Improving gross margin and declining interest expense are favorable, durable developments rather than limitations, and the equity issuance changes leverage, not the content of earnings. The trap is treating any sharp net-income jump as operating momentum; lenders strip identified one-time items before setting covenants and pricing.",
        "Topic": "Earnings quality",
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
        "ItemID": "CBQ21-A2-Q4",
        "Type": "select",
        "Prompt": "Receivables grew 33.3 percent and inventory grew 22.4 percent in FY2026 while net sales grew 11.5 percent. Based on Exhibits 1 and 2, which conclusion should anchor the earnings-quality section of the lender presentation?",
        "Correct": "D",
        "Choices": {
          "A": "The divergent growth rates establish deliberate channel stuffing and require immediate referral to securities regulators.",
          "B": "Working capital grew more slowly than sales, confirming that earnings converted fully into operating cash.",
          "C": "Inventory growth at roughly twice the rate of sales reflects superior demand planning that the bank should highlight.",
          "D": "Working capital is absorbing cash faster than operations generate it, so FY2026 earnings likely overstate cash generation and covenant headroom."
        },
        "Explanation": "Receivables rose 33.3 percent (2,140,000 / 6,420,000) and inventory rose 22.4 percent (1,370,000 / 6,110,000) against sales growth of 11.5 percent (4,400,000 / 38,400,000). When working capital outruns sales, accrual earnings run ahead of cash: the current ratio did improve to 2.00 from 1.72 (20,000,000 / 10,000,000 vs. 15,920,000 / 9,280,000), but largely because the 3,000,000 equity issuance funded receivables and inventory rather than debt reduction, as long-term debt fell only 1,500,000. The honest message to the credit committee is that FY2026 earnings overstate cash generation. The trap is citing the healthier liquidity ratios as proof of strength without tracing where the funding came from.",
        "Topic": "Working capital and earnings quality",
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
        "ItemID": "CBQ21-A2-Q5",
        "Type": "multi",
        "Prompt": "Which three actions should CFO Elena Vasquez include in the renewal package to address the bank's earnings-quality concerns? Select the three appropriate actions.",
        "Correct": [
          "Prepare a supplemental schedule presenting covenant EBITDA and operating results excluding the 900,000 non-recurring equipment-sale gain.",
          "Provide an aged accounts receivable schedule with customer concentration detail explaining the 2,140,000 increase in receivables.",
          "Include a reconciliation of net income to cash flow from operations highlighting the FY2026 conversion ratio."
        ],
        "Choices": {
          "A": "Prepare a supplemental schedule presenting covenant EBITDA and operating results excluding the 900,000 non-recurring equipment-sale gain.",
          "B": "Reclassify the equipment-sale gain into net sales so the revenue trend appears smoother across periods.",
          "C": "Provide an aged accounts receivable schedule with customer concentration detail explaining the 2,140,000 increase in receivables.",
          "D": "Request that the bank suspend quarterly covenant certificate filings for the renewal term to reduce administrative burden.",
          "E": "Include a reconciliation of net income to cash flow from operations highlighting the FY2026 conversion ratio."
        },
        "Explanation": "A credible lender package separates recurring from non-recurring content and explains balance-sheet drivers. Supplemental schedules excluding the 900,000 gain (A), aged receivables detail explaining the 2,140,000 build (C), and a net-income-to-operating-cash-flow reconciliation (E) each answer concerns the credit committee has already raised. Reclassifying a gain into net sales misstates revenue presentation, and asking to suspend covenant reporting weakens rather than builds lender confidence. The trap is padding the package with supportive but irrelevant schedules while leaving the one-time gain and the working-capital drain unexplained.",
        "Topic": "Lender disclosure package",
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
        "ItemID": "CBQ21-A2-Q6",
        "Type": "match",
        "Prompt": "Match each credit metric to its correct FY2026 value or reading, computed from Exhibits 1 and 2.",
        "LeftItems": [
          "Times interest earned (FY2026)",
          "Return on equity via DuPont (FY2026)",
          "Gross margin percentage (FY2026)",
          "Debt-to-equity at year-end FY2026"
        ],
        "RightItems": [
          "4.00x",
          "17.63%",
          "30.00%",
          "1.00",
          "12.00%"
        ],
        "Correct": {
          "Times interest earned (FY2026)": "4.00x",
          "Return on equity via DuPont (FY2026)": "17.63%",
          "Gross margin percentage (FY2026)": "30.00%",
          "Debt-to-equity at year-end FY2026": "1.00"
        },
        "Explanation": "Each metric reads directly from the exhibits: TIE = 5,136,000 / 1,284,000 = 4.00x; DuPont ROE = 3,564,000 / 20,210,000 average equity = 17.63 percent; gross margin = 12,840,000 / 42,800,000 = 30.00 percent; debt-to-equity = 23,000,000 / 23,000,000 = 1.00. The unused 12.00 percent figure is FY2026 operating margin (5,136,000 / 42,800,000), a profitability measure rather than a solvency or shareholder-return measure. Pairing each ratio with the right decision lens - coverage for interest service, returns for owners, margin for pricing power, leverage for solvency - is the core skill; the trap is quoting a ratio accurately while interpreting it against the wrong benchmark.",
        "Topic": "Ratio interpretation",
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
    "Industry": "Commercial HVAC components manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Harborline Industrial Manufacturing, Inc.",
    "Stakeholder": "Elena Vasquez, Chief Financial Officer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
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
      "Compute creditor-focused coverage from a condensed income statement",
      "Apply the DuPont identity with average balance-sheet bases and explain what drives ROE",
      "Evaluate earnings quality using non-recurring items, growth divergence, and cash conversion signals"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ21-C2",
    "Title": "Capacity-Constrained Line Decisions",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply relevant-cost analysis to keep-or-drop decisions by separating traceable avoidable costs from allocated common costs",
      "Evaluate an outsourcing proposal against internal manufacture using incremental contribution margin",
      "Integrate a special-order acceptance with a capacity-constrained product-mix change into a single quantified recommendation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Corvid Precision Components manufactures hydraulic valve assemblies (V-200) and standard fittings (F-100) in a single machining center capped at 60,000 machine hours per year, currently fully utilized. Corporate Controller Dana Whitfield must brief the Executive Committee, which is weighing three linked actions: dropping the F-100 line that reports a segment loss, accepting a one-time export order for V-200 units priced below list, and outsourcing F-100 production to a qualified supplier. The committee wants a single quantified recommendation that respects the capacity constraint. Dana's briefing must separate avoidable from allocated costs before any commitment is made.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C2-E1",
        "CaseID": "CBQ21-C2",
        "Type": "table",
        "Title": "Exhibit 1 - Product Line Operating Data and Machining Capacity",
        "Purpose": "Provides volumes, prices, unit variable costs, unit contribution margins, and machine-hour consumption for both lines; supports the segment computations (Q1, Q2), the outsourcing comparison (Q3), the combined recommendation and capacity feasibility check (Q4), and the special-order relevance reasoning (Q5, Q6).",
        "ReferencedBy": [
          "CBQ21-C2-Q1",
          "CBQ21-C2-Q2",
          "CBQ21-C2-Q3",
          "CBQ21-C2-Q4",
          "CBQ21-C2-Q5",
          "CBQ21-C2-Q6"
        ],
        "Headers": [
          "Product line",
          "Annual volume (units)",
          "Price per unit",
          "Variable cost per unit",
          "Contribution margin per unit",
          "Machine hours per unit",
          "Annual machine hours consumed"
        ],
        "Rows": [
          [
            "V-200 valve assemblies",
            "24,000",
            "$92",
            "$58",
            "$34",
            "2.0",
            "48,000"
          ],
          [
            "F-100 standard fittings",
            "30,000",
            "$36",
            "$22",
            "$14",
            "0.4",
            "12,000"
          ],
          [
            "Machining center capacity check",
            "-",
            "-",
            "-",
            "-",
            "-",
            "60,000 available; 60,000 consumed"
          ]
        ],
        "DataFormat": "USD whole dollars except per-unit amounts in dollars; hours in whole machine hours.",
        "AccuracyCheck": "Unit margins verified: 92 - 58 = 34; 36 - 22 = 14. Hours verified: 24,000 x 2.0 = 48,000; 30,000 x 0.4 = 12,000; 48,000 + 12,000 = 60,000, equaling available capacity."
      },
      {
        "ExhibitID": "CBQ21-C2-E2",
        "CaseID": "CBQ21-C2",
        "Type": "table",
        "Title": "Exhibit 2 - F-100 Profitability Detail and Transaction Terms",
        "Purpose": "Details F-100 contribution margin, the traceable fixed-cost breakdown, the corporate allocation, the supplier quote and retained supervision cost, and the special-order terms; feeds the segment result and drop penalty (Q1, Q2), the outsourcing advantage (Q3), the combined recommendation (Q4), and the matching values (Q6).",
        "ReferencedBy": [
          "CBQ21-C2-Q1",
          "CBQ21-C2-Q2",
          "CBQ21-C2-Q3",
          "CBQ21-C2-Q4",
          "CBQ21-C2-Q5",
          "CBQ21-C2-Q6"
        ],
        "Headers": [
          "Item",
          "Amount or terms"
        ],
        "Rows": [
          [
            "F-100 contribution margin (30,000 units x $14)",
            "$420,000"
          ],
          [
            "Traceable fixed: dedicated equipment lease",
            "$148,000"
          ],
          [
            "Traceable fixed: line-specific marketing",
            "$120,000"
          ],
          [
            "Total traceable fixed costs (avoidable if line ends)",
            "$268,000"
          ],
          [
            "Allocated corporate fixed costs charged to F-100 segment",
            "$210,000"
          ],
          [
            "Supplier quote: outsourced F-100 supply price per unit (delivered)",
            "$25"
          ],
          [
            "Line supervision cost retained if production is outsourced",
            "$32,000"
          ],
          [
            "Export offer: 6,000 V-200 units at $70 per unit; requires 2.0 machine hours per unit (12,000 hours total)",
            "One-time order; no incremental fixed cost"
          ]
        ],
        "DataFormat": "USD whole dollars except the per-unit supply price; terms column states transaction conditions.",
        "AccuracyCheck": "Traceable fixed verified: 148,000 + 120,000 = 268,000. Reported segment result verified: 420,000 - 268,000 - 210,000 = -58,000. Special-order hours verified: 6,000 x 2.0 = 12,000, exactly the hours freed by outsourcing F-100."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C2-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibits 1 and 2, compute F-100's segment result as currently reported (contribution margin less traceable fixed costs less allocated corporate fixed costs). Enter the LOSS as a positive whole dollar amount (tolerance +/- $1).",
        "Correct": "58000",
        "Explanation": "The reported segment result nets F-100's contribution margin against both traceable and allocated fixed costs: 420,000 - 268,000 - 210,000 = a 58,000 loss. This reported loss anchors the drop proposal now before the Executive Committee. Contribution margin itself is 30,000 units x (36 - 22) = 420,000, which more than covers the traceable costs the company would actually shed. In the briefing, present the 58,000 figure only as the reported result and label the 210,000 allocation as a common cost that persists regardless of the line's fate. The trap is letting an allocation drive a decision that cannot change it - the classic segment-reporting distortion tested on the CMA exam.",
        "Topic": "Segment reporting",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C2-Q2",
        "Type": "numeric",
        "Prompt": "If F-100 were dropped outright with no replacement use of the freed machine hours, by how many dollars would Corvid's annual operating income decrease? Enter as a positive whole dollar amount (tolerance +/- $1).",
        "Correct": "152000",
        "Explanation": "Dropping F-100 removes its contribution margin of 420,000 and saves only the traceable, avoidable fixed costs of 268,000 (equipment lease 148,000 plus line-specific marketing 120,000), so operating income falls by 152,000 per year (420,000 - 268,000). The allocated 210,000 stays with the company either way and is excluded from the computation. This 152,000 penalty explains why the raw reported segment loss understates the line's true economic value to Corvid. The trap is equating elimination of a reported segment loss with an equivalent operating-income gain; the loss figure includes unavoidable common costs that no decision can recover.",
        "Topic": "Avoidable cost analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C2-Q3",
        "Type": "select",
        "Prompt": "Before considering any use of the freed machine hours, what is the annual dollar advantage of outsourcing F-100 production versus continuing to manufacture it, based on Exhibits 1 and 2?",
        "Correct": "C",
        "Choices": {
          "A": "356,000 advantage - the swing from the reported 58,000 segment loss to the positive outsourced margin.",
          "B": "90,000 disadvantage - the added 3 per unit purchase cost across 30,000 units.",
          "C": "146,000 advantage - avoided traceable fixed costs of 268,000, less 90,000 of added purchase cost, less 32,000 of retained supervision.",
          "D": "178,000 advantage - the correct computation without subtracting the 32,000 of retained supervision."
        },
        "Explanation": "Outsourcing converts F-100 into a purchased-for-resale item: margin becomes 30,000 x (36 - 25) = 330,000, and 32,000 of supervision remains, giving 298,000 net versus 152,000 earned today - an annual advantage of 146,000. Cross-check: avoided traceable fixed 268,000, less added purchase cost of 3 per unit (90,000), less retained supervision 32,000 = 146,000; both routes agree. The 356,000 swing overstates the case because it credits the line with escaping allocated costs it never truly absorbed, and 178,000 forgets the supervisors kept on payroll. The trap is anchoring on the reported segment loss instead of comparing incremental streams.",
        "Topic": "Outsourcing relevant costs",
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
        "ItemID": "CBQ21-C2-Q4",
        "Type": "select",
        "Prompt": "Which combined course of action should Dana Whitfield recommend to the Executive Committee, and what is its total annual operating-income effect versus the status quo?",
        "Correct": "A",
        "Choices": {
          "A": "Outsource F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "B": "Drop F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "C": "Continue manufacturing F-100 and reject the export order because 70 is below the 92 list price on regular valve sales.",
          "D": "Drop F-100 production without replacement activity; eliminating the reported 58,000 segment loss raises operating income by that amount."
        },
        "Explanation": "The binding constraint is 60,000 machine hours, fully consumed (48,000 by V-200, 12,000 by F-100). Outsourcing releases 12,000 hours, exactly enough for the 6,000-unit export order at 2.0 hours each, so the order carries zero opportunity cost. The combined plan lifts operating income by 146,000 (outsourcing advantage) plus 72,000 (order contribution of 6,000 x (70 - 58)) = 218,000. Dropping instead of outsourcing destroys 152,000 of net contribution to free the same hours, making option B inferior despite its identical-sounding total, and option D actually reduces income by 152,000. The trap is evaluating the three actions in isolation when the shared capacity constraint links them.",
        "Topic": "Combined decision evaluation",
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
        "ItemID": "CBQ21-C2-Q5",
        "Type": "multi",
        "Prompt": "Which three considerations justify accepting the export order at 70 dollars per unit? Select the three appropriate statements.",
        "Correct": [
          "The order consumes machine hours freed by the outsourcing arrangement, so its opportunity cost is zero.",
          "The 70 offer price exceeds the 58 variable manufacturing cost per unit, generating positive contribution of 12 per unit.",
          "As a one-time transaction with an export distributor, the order is unlikely to disturb the 92 list price earned on regular V-200 sales."
        ],
        "Choices": {
          "A": "The order consumes machine hours freed by the outsourcing arrangement, so its opportunity cost is zero.",
          "B": "The 70 offer price exceeds the 58 variable manufacturing cost per unit, generating positive contribution of 12 per unit.",
          "C": "Allocating 210,000 of corporate fixed costs across the special-order units lowers their apparent profitability and should block acceptance.",
          "D": "As a one-time transaction with an export distributor, the order is unlikely to disturb the 92 list price earned on regular V-200 sales.",
          "E": "Extending the same 70 price to regular domestic customers next year would expand V-200 market share durably."
        },
        "Explanation": "At 70 versus 58 variable cost, each special unit contributes 12 on capacity whose alternative use has already been monetized through outsourcing, so the order faces zero opportunity cost (A) and price exceeds incremental variable cost (B). Because the buyer is a one-time export channel, erosion of the 92 list price is limited (D). Option C applies allocation thinking that is irrelevant to short-run capacity decisions, and option E describes precisely the channel-damage risk that the one-time structure avoids. The trap is applying full-cost logic - loading fixed cost or allocations per unit - onto a marginal-capacity pricing decision.",
        "Topic": "Special order relevance",
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
        "ItemID": "CBQ21-C2-Q6",
        "Type": "match",
        "Prompt": "Match each decision element to its correct dollar effect for the coming year, based on the case analysis.",
        "LeftItems": [
          "F-100 segment result as currently reported",
          "Annual penalty if F-100 is dropped outright with no replacement use of capacity",
          "Annual advantage of outsourcing F-100 before considering freed capacity",
          "Contribution margin generated by the export order"
        ],
        "RightItems": [
          "$58,000 segment loss",
          "$152,000 decrease",
          "$146,000 advantage",
          "$72,000 contribution",
          "$80,000 decrease"
        ],
        "Correct": {
          "F-100 segment result as currently reported": "$58,000 segment loss",
          "Annual penalty if F-100 is dropped outright with no replacement use of capacity": "$152,000 decrease",
          "Annual advantage of outsourcing F-100 before considering freed capacity": "$146,000 advantage",
          "Contribution margin generated by the export order": "$72,000 contribution"
        },
        "Explanation": "Each figure traces to the analysis: reported segment loss 58,000 (420,000 - 268,000 - 210,000); drop-without-replacement penalty 152,000 (420,000 - 268,000); outsourcing advantage 146,000 (298,000 net outsourced margin versus 152,000 insourced); order contribution 72,000 (6,000 units x 12). The unused 80,000-decrease figure belongs to the wrong combination - dropping F-100 while still taking the order nets 72,000 - 152,000 = negative 80,000. Pairing each element with its isolated effect lets the committee see why sequencing matters; the trap is letting the reported-loss anchor contaminate the incremental arithmetic.",
        "Topic": "Decision quantification",
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
    "Industry": "Industrial valves and fittings manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Corvid Precision Components",
    "Stakeholder": "Dana Whitfield, Corporate Controller",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
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
      "Identify avoidable versus allocated costs in keep-or-drop analyses",
      "Quantify outsourcing advantages using incremental contribution streams",
      "Sequence linked decisions under a binding capacity constraint and state the combined dollar effect"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ21-F1",
    "Title": "Misclassification Pressure and Escalation",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Quantify the financial-statement impact of an improper expense capitalization directed by senior management",
      "Identify the IMA Statement of Ethical Professional Practice standard breached by misleading classification",
      "Apply the IMA conflict-resolution pathway and SOX obligations, including documentation duties and escalation to those charged with governance"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Bluepine Foods, Inc., a frozen-meal manufacturer, is refinancing a 40,000,000 dollar term loan whose lenders will reprice off adjusted EBITDA trends. CFO Diane Kessler directed Corporate Controller Marcus Reyes to record the full 750,000 dollar plant-overhaul invoice package within Machinery and Equipment and to revisit the treatment after the year-end audit. Marcus determined that only 520,000 dollars qualifies for capitalization under ASC 360, leaving 230,000 dollars of routine maintenance improperly capitalized. He must quantify the misstatement and resolve the directive under the IMA Statement of Ethical Professional Practice and the Sarbanes-Oxley framework.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F1-E1",
        "CaseID": "CBQ21-F1",
        "Type": "email",
        "Title": "Exhibit 1 - Email from CFO Diane Kessler to Controller Marcus Reyes",
        "Purpose": "Establishes the management directive, its refinancing motive, the timing pressure, and the concealment instruction; frames every item's ethical analysis from quantification (Q1, Q2) through escalation and documentation duties (Q3-Q6).",
        "ReferencedBy": [
          "CBQ21-F1-Q1",
          "CBQ21-F1-Q2",
          "CBQ21-F1-Q3",
          "CBQ21-F1-Q4",
          "CBQ21-F1-Q5",
          "CBQ21-F1-Q6"
        ],
        "Body": "From: Diane Kessler, Chief Financial Officer\nTo: Marcus Reyes, Corporate Controller\nSubject: Overhaul invoice package - accounting treatment\n\nMarcus,\n\nWe close the term-loan refinancing in six weeks, and the lenders will reprice off our adjusted EBITDA trend. Record the full 750,000 Line 2 press invoice package to Machinery and Equipment this quarter. We can revisit the classification once the audit is behind us.\n\nPlease keep this between us until then; the plant controllers do not need the distraction. Our guidance range to the board, our covenant headroom, and our incentive targets all depend on hitting the number.\n\nDiane"
      },
      {
        "ExhibitID": "CBQ21-F1-E2",
        "CaseID": "CBQ21-F1",
        "Type": "table",
        "Title": "Exhibit 2 - Invoice Package Classification Schedule",
        "Purpose": "Splits the invoice package between capitalizable overhaul work and routine maintenance, states proper treatments, and provides division operating income and the effective tax rate; supplies the quantification inputs for Q1 and Q2 and context for the qualitative items.",
        "ReferencedBy": [
          "CBQ21-F1-Q1",
          "CBQ21-F1-Q2",
          "CBQ21-F1-Q3",
          "CBQ21-F1-Q4",
          "CBQ21-F1-Q5",
          "CBQ21-F1-Q6"
        ],
        "Headers": [
          "Invoice component",
          "Amount",
          "Proper treatment under ASC 360"
        ],
        "Rows": [
          [
            "Major overhaul - Line 2 press (extends useful life)",
            "$520,000",
            "Capitalize to Machinery and Equipment; depreciate over remaining life"
          ],
          [
            "Routine maintenance and calibration - multiple plants",
            "$230,000",
            "Expense as incurred; benefits current period"
          ],
          [
            "Total recorded to Machinery and Equipment per CFO direction",
            "$750,000",
            "Only the overhaul portion qualifies for capitalization"
          ],
          [
            "Preliminary division operating income (before any correction)",
            "$4,100,000",
            "Misclassification inflates this measure"
          ],
          [
            "Effective tax rate for the period",
            "25%",
            "Applies to quantify after-tax effects"
          ]
        ],
        "DataFormat": "USD whole dollars; tax rate in percent.",
        "AccuracyCheck": "Package reconciles: 520,000 + 230,000 = 750,000 recorded to Machinery and Equipment; the 230,000 routine-maintenance component is the entire misstatement because the 520,000 overhaul was properly capitalized."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F1-Q1",
        "Type": "numeric",
        "Prompt": "Per the classification analysis in Exhibit 2, and disregarding any related depreciation effects, by how many dollars does the CFO's directive overstate Bluepine's operating income this period? Enter as a whole dollar amount (tolerance +/- $1).",
        "Correct": "230000",
        "Explanation": "ASC 360 permits capitalization only for expenditures that extend an asset's useful life or increase its capacity; routine maintenance benefits only the current period and must be expensed as incurred. Of the 750,000 package, 520,000 qualifies as a major overhaul, leaving 230,000 improperly capitalized. Operating income is therefore overstated by the full 230,000, roughly 5.6 percent of the 4,100,000 preliminary division operating income - large enough to matter for covenant EBITDA and bonus targets. The trap is assuming an invoice package shares a single accounting treatment; mixed packages must be evaluated component by component before posting.",
        "Topic": "Expense misclassification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F1-Q2",
        "Type": "numeric",
        "Prompt": "Using Bluepine's 25 percent effective tax rate from Exhibit 2, by how many dollars is NET income overstated by the misclassification? Round to the nearest whole dollar (tolerance +/- $1).",
        "Correct": "172500",
        "Explanation": "With a 25 percent effective rate, the tax effect of the 230,000 pre-tax overstatement is 57,500 (230,000 x 0.25), so net income is overstated by 172,500 (230,000 x 0.75). Taxes do not excuse the misclassification; they merely scale its after-tax footprint, and lenders frequently define covenant EBITDA without tax effects anyway, keeping the full 230,000 in view. Marcus needs both measures when he briefs the audit committee: 230,000 overstating operating income and 172,500 overstating net income. The trap is stopping at the pre-tax figure and leaving governance without the bottom-line magnitude they will ask about first.",
        "Topic": "After-tax misstatement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F1-Q3",
        "Type": "select",
        "Prompt": "Which principle within the IMA Statement of Ethical Professional Practice is most directly compromised by recording routine maintenance as machinery and equipment?",
        "Correct": "B",
        "Choices": {
          "A": "Competence, because the plant engineering staff lacked the training to perform the overhaul work properly.",
          "B": "Credibility, because the classification presents financial information that fails to communicate fairly and objectively the sources and composition of reported operating income.",
          "C": "Confidentiality, because the invoice amounts were discussed with plant controllers outside the corporate finance function.",
          "D": "Integrity, because the controller accepted gifts from the overhaul vendor during the contract negotiation."
        },
        "Explanation": "The IMA Credibility standard requires members to communicate information fairly and objectively and to disclose all relevant information that could reasonably influence a user's understanding. Reclassifying maintenance as machinery changes what reported operating income appears to consist of and misleads EBITDA users - squarely a credibility failure. Competence concerns professional expertise and lawful performance, confidentiality protects unauthorized disclosure, and integrity is implicated by the pressure itself even though the defect in the reported numbers is credibility. The trap is defaulting to integrity terminology for every ethical conflict; classify by the specific duty the conduct breaches.",
        "Topic": "IMA credibility standard",
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
        "ItemID": "CBQ21-F1-Q4",
        "Type": "select",
        "Prompt": "After completing his written analysis, what is Marcus's appropriate first course of action under the IMA resolution pathway?",
        "Correct": "C",
        "Choices": {
          "A": "Resign immediately and file a retaliation claim under SOX Section 806 without raising the issue inside Bluepine.",
          "B": "Comply with the CFO's direction, since certification responsibility rests with the CEO and CFO rather than the controller.",
          "C": "Present the facts through Bluepine's established ethics escalation channel, advancing past the CFO to the audit committee because the CFO is implicated in the directive.",
          "D": "Discuss the reclassification informally with controllers at competing companies to gauge prevailing industry practice."
        },
        "Explanation": "Under the IMA resolution pathway, the first step is the organization's own established policy: present the facts to the next-higher managerial level not involved in the conflict. Because CFO Kessler originated the directive, escalation moves past her to those charged with governance - the audit committee or its chair - through Bluepine's ethics mechanism. Immediate resignation forfeits the chance to correct the misstatement internally, compliance leaves the controller complicit while transferring certification exposure upward, and external shop talk breaches confidentiality and accomplishes nothing. The trap is treating resignation or leaking as opening moves; the standards sequence internal escalation first.",
        "Topic": "Ethical conflict resolution",
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
        "ItemID": "CBQ21-F1-Q5",
        "Type": "multi",
        "Prompt": "Which three responses represent appropriate professional conduct for Marcus under the IMA Statement and the SOX framework? Select the three appropriate actions.",
        "Correct": [
          "Record the classification analysis, supporting invoices, and management directives contemporaneously in the accounting workpapers.",
          "Quantify the misstatement's effect on operating income, net income, and covenant metrics so the audit committee understands its magnitude.",
          "Escalate through Bluepine's established ethics channel and, if unresolved, present the matter to the audit committee."
        ],
        "Choices": {
          "A": "Postpone any correcting entry until the term-loan refinancing closes so the stronger EBITDA presentation is preserved through negotiations.",
          "B": "Record the classification analysis, supporting invoices, and management directives contemporaneously in the accounting workpapers.",
          "C": "Quantify the misstatement's effect on operating income, net income, and covenant metrics so the audit committee understands its magnitude.",
          "D": "Remove the CFO's email from the accounting files once the external auditors request invoice support.",
          "E": "Escalate through Bluepine's established ethics channel and, if unresolved, present the matter to the audit committee."
        },
        "Explanation": "Contemporaneous documentation (B), quantified impact (C), and escalation through recognized channels (E) align with IMA guidance and preserve the evidentiary record that SOX contemplates. Deferring correction until the refinancing closes knowingly maintains a misstatement through a financing event, and destroying or withholding the CFO's email once auditors ask would constitute obstruction of the kind SOX Section 802 criminalizes. The trap is believing that private discomfort plus eventual quiet correction satisfies a controller's duties; the standards demand affirmative communication through proper channels, supported by a documented record.",
        "Topic": "Ethical response actions",
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
        "ItemID": "CBQ21-F1-Q6",
        "Type": "match",
        "Prompt": "Match each professional duty or protection to the framework provision that establishes it.",
        "LeftItems": [
          "Communicating complete information fairly and objectively to financial statement users",
          "Officer certification of financial reports and disclosure controls in each periodic report",
          "Employment protection for individuals who report suspected securities law violations",
          "Criminal penalties for altering or destroying records to impede an official proceeding"
        ],
        "RightItems": [
          "IMA Statement of Ethical Professional Practice - Credibility standard",
          "SOX Section 302 - Corporate responsibility for financial reports",
          "SOX Section 806 - Whistleblower protection",
          "SOX Section 802 - Criminal document alteration penalties",
          "SOX Section 404 - Management assessment of internal controls"
        ],
        "Correct": {
          "Communicating complete information fairly and objectively to financial statement users": "IMA Statement of Ethical Professional Practice - Credibility standard",
          "Officer certification of financial reports and disclosure controls in each periodic report": "SOX Section 302 - Corporate responsibility for financial reports",
          "Employment protection for individuals who report suspected securities law violations": "SOX Section 806 - Whistleblower protection",
          "Criminal penalties for altering or destroying records to impede an official proceeding": "SOX Section 802 - Criminal document alteration penalties"
        },
        "Explanation": "Map each duty to its source: fair, objective communication of complete information is the IMA Credibility standard; officer certification of reports and disclosure controls each period sits in SOX Section 302; employment protection for reporting suspected securities violations is SOX Section 806; and criminal penalties for altering records to impede proceedings sit in SOX Section 802. Section 404 - management's internal-control assessment - is genuine law but matches none of the listed duties, making it the decoy. The trap is memorizing section numbers in isolation; anchor each provision to the specific obligation or protection it creates.",
        "Topic": "Governance frameworks",
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
    "Industry": "Frozen food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bluepine Foods, Inc.",
    "Stakeholder": "Marcus Reyes, Corporate Controller",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
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
      "Quantify pre-tax and after-tax effects of improperly capitalized period costs",
      "Classify ethical breaches against the IMA Statement's four standards",
      "Sequence the IMA resolution pathway and identify the SOX provisions governing certification, documentation, and whistleblower protection"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  }
,
  {
    "CaseID": "CBQ21-A3",
    "Title": "DuPont Diagnosis for Board Review",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Calculate profitability, activity, and leverage ratios from condensed financial statements",
      "Decompose return on equity with the DuPont framework",
      "Interpret year-over-year component trends for governance reporting"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Northwind Ceramics, a mid-sized producer of glazed porcelain tile, watched return on equity slide even though sales grew during FY2025. Board chair Alan Whitfield has asked CFO Elena Marsh to explain the decline using DuPont decomposition ahead of the autumn strategy session, so the board can judge whether softer margins or balance-sheet choices deserve priority attention.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A3-E1",
        "CaseID": "CBQ21-A3",
        "Type": "email",
        "Title": "Exhibit 1 - Finance Committee Request",
        "Purpose": "Frames the board task: attribute the ROE decline by DuPont component and assess coverage soundness.",
        "ReferencedBy": [
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q5",
          "CBQ21-A3-Q6"
        ],
        "Body": "From: Alan Whitfield, Chair, Finance Committee, Northwind Ceramics Board of Directors. To: Elena Marsh, CFO. Subject: ROE walk for the autumn strategy session. Elena - the committee wants a clear walk from last year's return on equity to this year's before we meet. Please come prepared to show which DuPont component moved the needle, what the balance sheet contributed, and whether our coverage position remains sound. Keep it brief, and attach the condensed statements as support."
      },
      {
        "ExhibitID": "CBQ21-A3-E2",
        "CaseID": "CBQ21-A3",
        "Type": "table",
        "Title": "Exhibit 2 - Condensed Income Statements",
        "Purpose": "Provides sales, operating income, interest, tax, and net income for both fiscal years consumed by margin, DuPont, and coverage computations.",
        "ReferencedBy": [
          "CBQ21-A3-Q1",
          "CBQ21-A3-Q2",
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q4",
          "CBQ21-A3-Q6"
        ],
        "Headers": [
          "Line Item",
          "FY2025",
          "FY2024"
        ],
        "Rows": [
          [
            "Net sales",
            "$12,500,000",
            "$11,800,000"
          ],
          [
            "Operating income (EBIT)",
            "$1,240,000",
            "$1,440,000"
          ],
          [
            "Interest expense",
            "$240,000",
            "$260,000"
          ],
          [
            "Income before income taxes",
            "$1,000,000",
            "$1,180,000"
          ],
          [
            "Income tax expense (25%)",
            "$250,000",
            "$295,000"
          ],
          [
            "Net income",
            "$750,000",
            "$885,000"
          ]
        ],
        "DataFormat": "US dollars, whole dollars; fiscal years ended December 31",
        "AccuracyCheck": "EBIT minus interest equals pre-tax income in both years; tax at 25% reconciles to net income ($1,000,000 x 0.75 = $750,000; $1,180,000 x 0.75 = $885,000). Verified twice."
      },
      {
        "ExhibitID": "CBQ21-A3-E3",
        "CaseID": "CBQ21-A3",
        "Type": "table",
        "Title": "Exhibit 3 - Condensed Balance Sheets",
        "Purpose": "Provides year-end assets, liabilities, and equity used for turnover, equity multiplier, and return on equity.",
        "ReferencedBy": [
          "CBQ21-A3-Q2",
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q5",
          "CBQ21-A3-Q6"
        ],
        "Headers": [
          "Line Item",
          "FY2025",
          "FY2024"
        ],
        "Rows": [
          [
            "Total assets",
            "$8,000,000",
            "$7,200,000"
          ],
          [
            "Total liabilities",
            "$3,200,000",
            "$2,800,000"
          ],
          [
            "Total shareholders' equity",
            "$4,800,000",
            "$4,400,000"
          ]
        ],
        "DataFormat": "US dollars, whole dollars; year-end balances are the stated measurement basis",
        "AccuracyCheck": "Liabilities plus equity equals total assets in both years ($3,200,000 + $4,800,000 = $8,000,000; $2,800,000 + $4,400,000 = $7,200,000). Verified twice."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A3-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 2, compute Northwind Ceramics' FY2025 net profit margin as a percentage of net sales. Enter the percentage rounded to two decimal places (digits only).",
        "Correct": "6.00",
        "Explanation": "Governing principle: profitability ratios measure how much of each sales dollar becomes profit after all costs and taxes (financial statement analysis standards). Net profit margin = Net income / Net sales = $750,000 / $12,500,000 = 0.0600 = 6.00%. In board terms, Northwind kept about six cents of every FY2025 sales dollar. A common trap is dividing net income by total assets or equity instead of sales, which produces turnover or return measures rather than margin.",
        "Topic": "Profitability ratios",
        "Subtopic": "Net profit margin",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net profit margin = Net income / Net sales",
        "CommonTrapReference": "Dividing net income by assets or equity instead of sales produces turnover or ROE, not margin",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q2",
        "Type": "numeric",
        "Prompt": "Using three-step DuPont decomposition with the year-end balances shown in Exhibits 2 and 3, compute Northwind Ceramics' FY2025 return on equity as a percentage. Round to two decimal places (digits only).",
        "Correct": "15.63",
        "Explanation": "Governing principle: the three-step DuPont model decomposes ROE into margin, activity, and leverage. ROE = Net profit margin x Total asset turnover x Equity multiplier = 0.0600 x 1.5625 x 1.6667 = 15.63%. Cross-check: Net income / Equity = $750,000 / $4,800,000 = 15.63%, confirming internal consistency of the exhibits. Economically, Northwind earned about 15.6 cents per dollar of shareholder capital in FY2025. The common trap is importing an average-balance convention into a presentation whose stated basis is year-end balances.",
        "Topic": "Return on equity",
        "Subtopic": "DuPont decomposition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ROE = Margin x Turnover x Equity Multiplier",
        "CommonTrapReference": "Mixing average-balance conventions into a year-end balance presentation distorts turnover",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q3",
        "Type": "select",
        "Prompt": "At the strategy session, Elena must attribute the year-over-year ROE decline to its source. Based on Exhibits 2 and 3, which statement should she present?",
        "Choices": [
          "Total asset turnover improved enough to offset most of the margin decline.",
          "Financial leverage fell during FY2025 and dragged ROE down with it.",
          "Net profit margin contracted from 7.50% to 6.00% and is the primary driver of the ROE decline.",
          "Deterioration in times interest earned is the main reason ROE declined."
        ],
        "Correct": "C",
        "Explanation": "Governing principle: DuPont diagnosis attributes ROE change to its components rather than to non-DuPont ratios. Holding FY2024 turnover (1.64) and multiplier (1.64) constant, the margin fall from 7.50% to 6.00% alone would cut ROE from 20.11% to about 16.09%, roughly four points - far larger than the turnover drag (under one point), while higher leverage actually cushions the fall. EBIT dropped from $1,440,000 to $1,240,000 despite higher sales, confirming margin weakness. Traps: blaming leverage reverses its favorable direction; times interest earned is not a DuPont component at all.",
        "Topic": "Ratio trend interpretation",
        "Subtopic": "Component attribution",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Attributing ROE declines to leverage when leverage rose and cushioned the fall",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q4",
        "Type": "select",
        "Prompt": "The company's lender reviews Northwind's credit file annually. Compute FY2025 times interest earned from Exhibit 2 and choose the correct figure.",
        "Choices": [
          "4.13 times, computed as net income plus interest expense divided by interest expense.",
          "5.17 times, computed as operating income (EBIT) divided by interest expense.",
          "4.17 times, computed as pre-tax income divided by interest expense.",
          "6.89 times, computed as EBIT divided by after-tax interest expense."
        ],
        "Correct": "B",
        "Explanation": "Governing principle: coverage ratios compare operating profit available to service debt against financing cost. Times interest earned = EBIT / Interest expense = $1,240,000 / $240,000 = 5.17 times (FY2024 was $1,440,000 / $260,000 = 5.54 times). Coverage weakened modestly yet remains comfortable for a manufacturer with stable demand. Traps: using pre-tax income ($1,000,000 / $240,000 = 4.17) omits the interest add-back; using net income plus interest ($990,000 / $240,000 = 4.13) skips the tax gross-up; dividing by after-tax interest ($1,240,000 / $180,000 = 6.89) misapplies a capital-structure adjustment outside its purpose.",
        "Topic": "Leverage ratios",
        "Subtopic": "Times interest earned",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Times interest earned = EBIT / Interest expense",
        "CommonTrapReference": "Omitting the interest add-back or the tax gross-up when building numerator EBIT",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q5",
        "Type": "multi",
        "Prompt": "Which three conclusions are supported by the DuPont analysis of the two years shown in Exhibits 2 and 3?",
        "Choices": [
          "Net profit margin fell from 7.50% to 6.00% and is the largest contributor to the ROE decline.",
          "Total asset turnover rose above 1.60 times in FY2025.",
          "Higher financial leverage partially offset the impact of the weaker operating margin on ROE.",
          "Return on equity declined by more than four percentage points year over year.",
          "The company reduced its reliance on debt financing during FY2025."
        ],
        "Correct": [
          "Net profit margin fell from 7.50% to 6.00% and is the largest contributor to the ROE decline.",
          "Higher financial leverage partially offset the impact of the weaker operating margin on ROE.",
          "Return on equity declined by more than four percentage points year over year."
        ],
        "Explanation": "Relevant principle: component trend analysis within the DuPont framework. Statement one is true: margin fell 7.50% to 6.00% and contributes the largest share of the decline. Turnover claim fails: it slipped from 1.64 to 1.56 times, below 1.60. Leverage offset is true: the multiplier rose from 1.64 to 1.67, softening the fall. The magnitude claim is true: ROE fell from 20.11% to 15.63%, a 4.48-point drop. Debt-reduction is false: liabilities grew faster than equity ($400,000 vs $400,000 on a smaller base), raising leverage. The trap is treating any single-component move as proof overall returns improved.",
        "Topic": "Financial statement analysis",
        "Subtopic": "DuPont component trends",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading a single-component improvement as proof that overall returns improved",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q6",
        "Type": "match",
        "Prompt": "Prepare the board scorecard Elena will distribute: match each metric to its correct value for the year indicated, using Exhibits 2 and 3.",
        "LeftItems": [
          "FY2025 net profit margin",
          "FY2025 total asset turnover",
          "FY2025 equity multiplier",
          "FY2024 return on equity"
        ],
        "RightItems": [
          "6.00%",
          "1.56 times",
          "1.67 times",
          "20.11%",
          "7.50%",
          "1.64 times"
        ],
        "Correct": {
          "FY2025 net profit margin": "6.00%",
          "FY2025 total asset turnover": "1.56 times",
          "FY2025 equity multiplier": "1.67 times",
          "FY2024 return on equity": "20.11%"
        },
        "Explanation": "Each metric follows directly from the exhibits: margin = $750,000 / $12,500,000 = 6.00%; turnover = $12,500,000 / $8,000,000 = 1.56 times; multiplier = $8,000,000 / $4,800,000 = 1.67 times; prior-year ROE = $885,000 / $4,400,000 = 20.11%. The distractors are deliberate near-misses: 7.50% is the FY2024 margin and 1.64 times matches FY2024 turnover. Matching exercises reward precise period alignment - pairing a prior-year figure with a current-year label is the classic scorecard error and would misstate the board's trend narrative.",
        "Topic": "Ratio computation",
        "Subtopic": "Year-over-year metrics",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Pairing prior-year values with current-year labels in matching scorecards",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Ceramic tile manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Northwind Ceramics",
    "Stakeholder": "CFO Elena Marsh",
    "BusinessFunction": "Financial reporting and analysis",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "DuPont",
      "ROE",
      "ratio analysis",
      "board reporting"
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
      "Compute net profit margin, asset turnover, equity multiplier, and ROE from condensed statements",
      "Attribute ROE change to margin, turnover, and leverage components",
      "Evaluate whether added leverage offsets operating weakness",
      "Communicate ratio findings in a board-ready format"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ21-B3",
    "Title": "Bond Pricing and Covenant Compliance Review",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Value bonds using present-value factors at the market yield",
      "Amortize bond discounts under the effective interest method",
      "Assess covenant compliance with interest coverage measures"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 31,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Copperline Manufacturing plans a five-year, $10,000,000 bond issue to fund a new press line at its Dayton plant. With market yields at 8% against a 6% coupon, treasury expects a discounted sale. CFO Dana Whitaker must confirm the issue price, validate the effective-interest amortization schedule, and reassure lender First Meridian Bank that the interest-coverage covenant will hold in year one.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B3-E1",
        "CaseID": "CBQ21-B3",
        "Type": "table",
        "Title": "Exhibit 1 - Bond Terms and Present Value Factors",
        "Purpose": "Supplies every input needed to price the issue and build the early amortization periods under the effective interest method.",
        "ReferencedBy": [
          "CBQ21-B3-Q1",
          "CBQ21-B3-Q2",
          "CBQ21-B3-Q3",
          "CBQ21-B3-Q5",
          "CBQ21-B3-Q6"
        ],
        "Headers": [
          "Term",
          "Value"
        ],
        "Rows": [
          [
            "Face value",
            "$10,000,000"
          ],
          [
            "Stated coupon rate (annual)",
            "6%"
          ],
          [
            "Payment frequency",
            "Semiannual"
          ],
          [
            "Term to maturity",
            "5 years"
          ],
          [
            "Semiannual coupon payment",
            "$300,000"
          ],
          [
            "Market yield at issuance (annual)",
            "8%"
          ],
          [
            "Periodic market rate",
            "4% per half-year"
          ],
          [
            "Number of periods",
            "10"
          ],
          [
            "PV of $1 at 4%, 10 periods",
            "0.67556"
          ],
          [
            "PV of ordinary annuity of $1 at 4%, 10 periods",
            "8.11090"
          ]
        ],
        "DataFormat": "US dollars; rates are nominal annual unless noted; factors carried to five decimals",
        "AccuracyCheck": "Coupon = $10,000,000 x 6% / 2 = $300,000; price = $300,000 x 8.11090 + $10,000,000 x 0.67556 = $9,188,870. Computed twice independently."
      },
      {
        "ExhibitID": "CBQ21-B3-E2",
        "CaseID": "CBQ21-B3",
        "Type": "email",
        "Title": "Exhibit 2 - Lender Covenant Inquiry",
        "Purpose": "States the covenant definition (EBIT over GAAP interest expense, floor 4.0x) and projected EBIT consumed by the compliance decision.",
        "ReferencedBy": [
          "CBQ21-B3-Q4",
          "CBQ21-B3-Q5"
        ],
        "Body": "From: Marcus Bell, Treasurer, Copperline Manufacturing. To: Dana Whitaker, CFO. Subject: Coverage headroom on the new notes. Dana - First Meridian confirmed the covenant language on the proposed notes: EBIT divided by GAAP interest expense must stay at or above 4.0 times, tested annually starting at issuance. Our planning estimate for next-year EBIT is $3,600,000. Before we sign, please confirm the year-one GAAP interest expense implied by the discounted issue and tell me whether we clear the covenant, including how the number differs from the $600,000 of cash coupons we will actually pay each year."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B3-Q1",
        "Type": "numeric",
        "Prompt": "Using the present value factors in Exhibit 1, compute the issue price of Copperline's bond offering. Round to the nearest whole dollar (digits only).",
        "Correct": "9188870",
        "Explanation": "Governing principle: bond valuation under ASC 835 prices debt at the present value of future cash flows discounted at the market yield. Price = PV of coupons + PV of face = $300,000 x 8.11090 + $10,000,000 x 0.67556 = $2,433,270 + $6,755,600 = $9,188,870. Investors pay $811,130 less than face because the 6% coupon trails the 8% market yield they require. The common trap is discounting cash flows at the stated rate, which would circularly produce par value regardless of market conditions.",
        "Topic": "Bond valuation",
        "Subtopic": "Present value pricing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Bond price = PV(coupons) + PV(face) at market yield",
        "CommonTrapReference": "Discounting bond cash flows at the stated coupon rate instead of the market yield",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q2",
        "Type": "numeric",
        "Prompt": "Under the effective interest method beginning from the issue price, compute Copperline's interest expense for Period 2 (the second semiannual period). Round to the nearest whole dollar (digits only).",
        "Correct": "370257",
        "Explanation": "Governing principle: the effective interest method (ASC 835) charges each period at the periodic market rate applied to carrying value. Period 1 expense = $9,188,870 x 4% = $367,555; discount amortized = $367,555 - $300,000 = $67,555; carrying value rises to $9,256,425. Period 2 expense = $9,256,425 x 4% = $370,257. Expense grows every period because accretion walks carrying value up toward face. The trap is reusing the issue price as the base each period, which freezes expense and defeats the compounding logic of the method.",
        "Topic": "Debt amortization",
        "Subtopic": "Effective interest method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Effective interest = Carrying value x Periodic market rate",
        "CommonTrapReference": "Reapplying the periodic rate to the issue price instead of the growing carrying value",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-B3-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-B3-Q3",
        "Type": "select",
        "Prompt": "For the audit committee briefing, which characterization of the issuance is accurate?",
        "Choices": [
          "Sold at a discount of $811,130 because the 8% market yield exceeds the 6% coupon rate.",
          "Sold at par because the stated rate and the market rate both compound semiannually.",
          "Sold at a premium of $811,130 because investors reward above-market coupons.",
          "Sold at a discount of $188,870 reflecting underwriting fees deducted at closing."
        ],
        "Correct": "A",
        "Explanation": "Issuance economics follow from comparing coupon to market yield. Because the 8% market yield exceeds the 6% stated rate, investors bid the price down to $9,188,870 - a discount of $10,000,000 - $9,188,870 = $811,130 carried in Discount on Bonds Payable and recognized as extra interest cost over the term. Business meaning: Copperline pays the market rate in substance through cheaper proceeds plus accretion. Traps: calling it a premium reverses the rate relationship; quoting $188,870 invents a magnitude tied to no exhibit figure and confuses the discount with issuance costs.",
        "Topic": "Debt issuance",
        "Subtopic": "Discount recognition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Calling a below-coupon issuance a premium or misstating the discount magnitude",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q4",
        "Type": "select",
        "Prompt": "Marcus needs an answer for First Meridian before signing. Applying the covenant definition stated in Exhibit 2, which conclusion should Dana deliver?",
        "Choices": [
          "Coverage is about 6.00 times measured on cash coupons, satisfying the covenant without further analysis.",
          "Coverage is about 4.50 times applying the 8% market yield to face value, satisfying the covenant.",
          "Coverage is about 4.88 times on GAAP interest expense, breaching the covenant because lenders test only cash interest.",
          "Coverage is about 4.88 times on GAAP interest expense, clearing the 4.0x covenant, with cash-basis coverage higher at about 6.00 times."
        ],
        "Correct": "D",
        "Explanation": "Covenant testing applies the agreement's own definition: projected EBIT over GAAP interest expense. Year-one GAAP interest = $367,555 + $370,257 = $737,812; coverage = $3,600,000 / $737,812 = 4.88 times, above the 4.0x floor. Cash-basis coverage = $3,600,000 / $600,000 = 6.00 times, higher because cash coupons exclude discount accretion. Treasury can assure First Meridian of compliance with headroom. Traps: substituting cash coupons understates the GAAP denominator the agreement names; applying the 8% yield to face gives $800,000 and 4.50 times; inverting the basis rule reaches the opposite conclusion from the same ratio.",
        "Topic": "Credit analysis",
        "Subtopic": "Interest coverage covenant",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Interest coverage = EBIT / Interest expense",
        "CommonTrapReference": "Testing covenants on cash interest when the agreement defines GAAP interest expense",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q5",
        "Type": "multi",
        "Prompt": "Which three statements about the notes and the covenant position are accurate?",
        "Choices": [
          "Effective interest expense increases each semiannual period as discount amortization raises the carrying value.",
          "Lifetime interest cost totals $3,811,130, comprising $3,000,000 of coupons plus the $811,130 discount.",
          "The opening carrying amount of the notes exceeds face value at the date of issuance.",
          "Straight-line amortization would hold periodic interest expense equal to the $300,000 cash coupon.",
          "Measured on cash interest instead of GAAP expense, covenant coverage appears stronger because cash coupons exclude discount accretion."
        ],
        "Correct": [
          "Effective interest expense increases each semiannual period as discount amortization raises the carrying value.",
          "Lifetime interest cost totals $3,811,130, comprising $3,000,000 of coupons plus the $811,130 discount.",
          "Measured on cash interest instead of GAAP expense, covenant coverage appears stronger because cash coupons exclude discount accretion."
        ],
        "Explanation": "Statement one is true: expense steps from $367,555 to $370,257, then $373,067 and $375,990, tracking carrying-value growth. Lifetime cost is true: ten coupons of $300,000 total $3,000,000, plus the $811,130 discount, equals $3,811,130. Opening-above-face is false: a discount means carrying value starts below face. Straight-line-equals-coupon is false: straight-line expense would be $381,113 per period ($300,000 + $81,113 of amortization). Cash-versus-GAAP is true: $600,000 cash is smaller than $737,812 GAAP expense, so cash-basis coverage screens stronger. The trap is equating interest expense with cash paid on discounted debt.",
        "Topic": "Long-term debt",
        "Subtopic": "Discount accretion effects",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Equating interest expense with cash coupons and missing discount accretion",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q6",
        "Type": "match",
        "Prompt": "Complete the treasury memo Marcus will file with the loan package: match each schedule element to its correct amount.",
        "LeftItems": [
          "Issue price at date of sale",
          "Period 1 interest expense",
          "Period 2 discount amortization",
          "Carrying value after Period 3"
        ],
        "RightItems": [
          "$9,188,870",
          "$367,555",
          "$70,257",
          "$9,399,749",
          "$600,000",
          "$811,130"
        ],
        "Correct": {
          "Issue price at date of sale": "$9,188,870",
          "Period 1 interest expense": "$367,555",
          "Period 2 discount amortization": "$70,257",
          "Carrying value after Period 3": "$9,399,749"
        },
        "Explanation": "Derivations from Exhibit 1 and the pricing step: issue price $9,188,870; Period 1 expense $9,188,870 x 4% = $367,555; Period 2 amortization = $370,257 - $300,000 = $70,257; carrying value after Period 3 = $9,188,870 + $67,555 + $70,257 + $73,067 = $9,399,749. Distractors are real but misplaced figures: $600,000 is a full year of cash coupons and $811,130 is the total discount. Typical scheduling errors come from skipping the round-to-dollar step or amortizing before accruing interest in the early periods.",
        "Topic": "Amortization schedule",
        "Subtopic": "Early-period balances",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "Effective interest = Carrying value x Periodic market rate",
        "CommonTrapReference": "Skipping dollar rounding or amortizing before accruing interest in early periods",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-B3-Q1"
        ]
      }
    ],
    "Industry": "Capital equipment manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Copperline Manufacturing",
    "Stakeholder": "CFO Dana Whitaker",
    "BusinessFunction": "Treasury and corporate finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "bond pricing",
      "effective interest",
      "covenant",
      "coverage ratio"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 93,
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
      "Price a semiannual bond using present value factors",
      "Build early-period amortization entries under the effective interest method",
      "Test an interest-coverage covenant on GAAP and cash bases",
      "Distinguish discount accretion from cash interest"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ21-C3",
    "Title": "Special Order Under a Capacity Constraint",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Identify relevant revenues and costs for a special-order decision",
      "Quantify opportunity cost of capacity consumed by a special order",
      "Recommend accept-or-decline actions supported by contribution analysis"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Silverpine Furniture runs its Oregon workshop near practical capacity filling standing orders from regional retailers. Purchasing director Priya Raman of Cascadia Home Stores proposes a one-time purchase of 3,000 accent chairs at $150 per unit, well below the regular price, with six-week delivery. CFO Rebecca Hale must recommend whether founder Sam Ortiz should accept, quantifying relevant costs, the cost of displaced orders, and the minimum price at which the deal creates value.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C3-E1",
        "CaseID": "CBQ21-C3",
        "Type": "table",
        "Title": "Exhibit 1 - Monthly Operating Data, Regular Operations",
        "Purpose": "Provides volumes, prices, variable costs, and fixed overhead consumed by the contribution, opportunity-cost, and pricing computations.",
        "ReferencedBy": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q2",
          "CBQ21-C3-Q3",
          "CBQ21-C3-Q5",
          "CBQ21-C3-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Current monthly production",
            "18,000 units"
          ],
          [
            "Practical monthly capacity",
            "20,000 units"
          ],
          [
            "Regular wholesale price per unit",
            "$240"
          ],
          [
            "Variable manufacturing cost per unit",
            "$132"
          ],
          [
            "Variable selling expense per unit",
            "$18"
          ],
          [
            "Fixed manufacturing overhead per month",
            "$1,296,000"
          ]
        ],
        "DataFormat": "US dollars; volumes in units per month",
        "AccuracyCheck": "Regular contribution per unit = $240 - $132 - $18 = $90; idle capacity = 20,000 - 18,000 = 2,000 units; allocated fixed overhead = $1,296,000 / 18,000 = $72 per unit. Verified twice."
      },
      {
        "ExhibitID": "CBQ21-C3-E2",
        "CaseID": "CBQ21-C3",
        "Type": "email",
        "Title": "Exhibit 2 - Customer Offer",
        "Purpose": "States the special-order terms consumed throughout the decision: 3,000 units, $150 price, buyer-handled distribution, seller-funded one-time jig.",
        "ReferencedBy": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q3",
          "CBQ21-C3-Q4",
          "CBQ21-C3-Q5"
        ],
        "Body": "From: Priya Raman, Purchasing Director, Cascadia Home Stores. To: Tom Alderman, Sales Director, Silverpine Furniture. Subject: One-time buy - Cascade accent chairs. Tom - our spring promotion needs 3,000 Cascade accent chairs delivered within six weeks of purchase-order acceptance. We can pay $150 per unit. Two conditions: your team builds the required finishing jig at your cost as a one-time setup, and we handle all outbound freight and store marketing ourselves. If the numbers work on your side, we can wire a deposit immediately."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C3-Q1",
        "Type": "numeric",
        "Prompt": "Setting aside capacity effects and the one-time setup for the moment, compute the incremental contribution margin the Cascadia order itself would generate. Round to the nearest whole dollar (digits only).",
        "Correct": "54000",
        "Explanation": "Governing principle: relevant costing includes only future, differential cash flows affected by the decision. The order incurs variable manufacturing of $132 per unit and no variable selling expense because Cascadia handles freight and marketing (Exhibit 2). Incremental contribution = 3,000 x ($150 - $132) = $54,000. This figure is gross of capacity effects and the one-time jig, so it is an upper bound before displacement. Traps: deducting the $18 selling expense this order avoids, or burdening the order with fixed manufacturing overhead that continues either way.",
        "Topic": "Relevant costing",
        "Subtopic": "Incremental contribution",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Incremental CM = Units x (Offer price - Variable cost per unit)",
        "CommonTrapReference": "Burdening special orders with fixed overhead or excluded selling expenses",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C3-Q2",
        "Type": "numeric",
        "Prompt": "Compute the opportunity cost of regular contribution displaced if Silverpine accepts the Cascadia order at current production levels. Round to the nearest whole dollar (digits only).",
        "Correct": "90000",
        "Explanation": "Governing principle: opportunity cost is the contribution forgone on the best alternative use of scarce capacity. Idle capacity = 20,000 - 18,000 = 2,000 units, so the 3,000-unit order displaces 1,000 units of regular production (18,000 + 3,000 - 20,000). Regular contribution per unit = $240 - $132 - $18 = $90. Opportunity cost = 1,000 x $90 = $90,000. Traps: assuming the entire order displaces regular sales, overstating the cost at $270,000; or ignoring displacement entirely because the offer looks profitable viewed in isolation from Exhibit 1 capacity data.",
        "Topic": "Opportunity cost",
        "Subtopic": "Capacity constraints",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Opportunity cost = Displaced units x Regular CM per unit",
        "CommonTrapReference": "Displacing the full order quantity instead of the excess over idle capacity",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C3-Q3",
        "Type": "select",
        "Prompt": "Weighing all relevant amounts from Exhibits 1 and 2, what should Rebecca Hale recommend to Sam Ortiz?",
        "Choices": [
          "Accept: the order adds $42,000 of profit after tooling and lifts plant utilization.",
          "Decline: accepting would cut profit by $48,000 after tooling and displaced contribution.",
          "Accept: the order adds $54,000 of contribution at no additional fixed cost.",
          "Decline: accepting would cut profit by $102,000 once tooling and lost contribution are counted."
        ],
        "Correct": "B",
        "Explanation": "Short-run decisions compare incremental contribution against avoidable costs plus opportunity cost (contribution-margin decision framework). Accepting yields $54,000 contribution - $12,000 jig - $90,000 displaced contribution = -$48,000, so Silverpine should decline: displaced regular units earn $90 each versus the order's $18, so filling to capacity destroys value. Traps: stopping at $42,000 (omitting opportunity cost) supports exactly the wrong call; reporting -$102,000 nets only the outflows ($90,000 + $12,000) and drops the order's own $54,000 contribution from the comparison.",
        "Topic": "Special orders",
        "Subtopic": "Accept-or-decline analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net effect = Incremental CM - Avoidable costs - Opportunity cost",
        "CommonTrapReference": "Judging the order on contribution alone without the opportunity cost of lost sales",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-C3-Q4",
        "Type": "select",
        "Prompt": "If Silverpine counter-offers instead of walking away, what minimum unit price leaves the company indifferent between accepting and declining the 3,000-unit order?",
        "Choices": [
          "$132, equal to variable manufacturing cost per unit.",
          "$150, matching the price Cascadia originally offered.",
          "$166, covering variable cost plus tooling and displaced contribution spread across the order.",
          "$184, adding the avoided selling expense back onto the indifference price."
        ],
        "Correct": "C",
        "Explanation": "Indifference pricing sets the net benefit of acceptance to zero: 3,000 x (P - $132) - $12,000 - $90,000 = 0, so P - $132 = $102,000 / 3,000 = $34 and P = $166 per unit. Above $166 the deal beats displaced production; below it, declining preserves more profit. Business meaning: scarce capacity, not book cost, sets the floor. Traps: quoting the $132 variable floor ignores what capacity is worth; anchoring on the offered $150 confirms rather than tests the deal; adding the avoided $18 selling expense back onto the floor overstates the requirement at $184.",
        "Topic": "Pricing decisions",
        "Subtopic": "Indifference price",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Minimum price = Variable cost + (Avoidable cost + Opportunity cost) / Order units",
        "CommonTrapReference": "Quoting variable cost as the floor when capacity is scarce",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-C3-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-C3-Q5",
        "Type": "multi",
        "Prompt": "Which three statements about the decision analysis are accurate?",
        "Choices": [
          "The $12,000 finishing jig is a relevant cost because it is incurred only if the order is accepted.",
          "Fixed manufacturing overhead charged at $72 per unit is a relevant cost of the order.",
          "Accepting displaces 1,000 units of regular production because idle capacity is only 2,000 units.",
          "The $18 variable selling expense belongs in the special order's incremental cost per unit.",
          "At the offered $150 price the order should be declined because its contribution falls short of the opportunity cost of displaced sales."
        ],
        "Correct": [
          "The $12,000 finishing jig is a relevant cost because it is incurred only if the order is accepted.",
          "Accepting displaces 1,000 units of regular production because idle capacity is only 2,000 units.",
          "At the offered $150 price the order should be declined because its contribution falls short of the opportunity cost of displaced sales."
        ],
        "Explanation": "Statement one is true: the jig is order-specific and avoidable, hence relevant. The overhead claim is false: the $72 charge ($1,296,000 / 18,000 units) continues regardless of the decision and is irrelevant. Displacement is true: 2,000 idle units against a 3,000-unit order forces 1,000 regular units out. The selling-expense claim is false: Cascadia handles distribution, so the $18 does not arise on this order. The final statement is true: $18 of unit contribution cannot cover the $34 blended burden of tooling plus displaced contribution. The trap is treating allocated fixed cost as decision-relevant.",
        "Topic": "Decision analysis",
        "Subtopic": "Cost relevance",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating allocated fixed cost and avoided selling expense as decision-relevant",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C3-Q6",
        "Type": "match",
        "Prompt": "Summarize the decision inputs for the leadership meeting: match each quantity to its correct value.",
        "LeftItems": [
          "Contribution margin per regular unit",
          "Idle capacity before the special order",
          "Special-order contribution margin per unit",
          "Minimum acceptable special-order price"
        ],
        "RightItems": [
          "$90",
          "2,000 units",
          "$18",
          "$166",
          "$72",
          "$240"
        ],
        "Correct": {
          "Contribution margin per regular unit": "$90",
          "Idle capacity before the special order": "2,000 units",
          "Special-order contribution margin per unit": "$18",
          "Minimum acceptable special-order price": "$166"
        },
        "Explanation": "From Exhibit 1 and the offer analysis: regular contribution per unit = $240 - $132 - $18 = $90; idle capacity = 20,000 - 18,000 = 2,000 units; special-order contribution = $150 - $132 = $18 per unit; minimum price = $132 + ($12,000 + $90,000) / 3,000 = $166. Distractors are real figures from the case that do not belong in incremental analysis: $72 is allocated fixed overhead per unit and $240 is the regular catalog price. Substituting catalog price into relevant-cost schedules is the classic special-order error this matching drill reinforces against.",
        "Topic": "Contribution analysis",
        "Subtopic": "Decision inputs",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Substituting catalog price for relevant-cost figures in decision summaries",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Furniture manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Silverpine Furniture",
    "Stakeholder": "CFO Rebecca Hale",
    "BusinessFunction": "Cost management and pricing",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "special order",
      "relevant costs",
      "capacity",
      "opportunity cost"
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
      "Separate relevant from irrelevant costs in order evaluation",
      "Measure displacement when orders exceed idle capacity",
      "Derive a minimum acceptable price for constrained capacity",
      "Defend accept-or-decline recommendations quantitatively"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  }
];
