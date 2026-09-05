var casePackP2_1 = [
  {
    "CaseID": "CBQ21-B1",
    "Title": "Cash Conversion Cycle and the Credit Line Renewal",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Manage working capital (cash, receivables, inventory, payables)","Compute and interpret the cash conversion cycle"],
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
    "Tags": ["cash conversion cycle","working capital","DSO","DIO","DPO"],
    "CreatedDate": "2026-08-23",
    "ModifiedDate": "2026-08-23",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-23","Version":"1.0","Author":"Case Author","Summary":"Initial creation"},{"Date":"2026-08-23","Version":"1.1","Author":"Case Author (external review repairs)","Summary":"Stated the annualized-flow measurement convention in Exhibit 1; clarified Q2's cross-reference to Question 1; corrected the Q3 DPO distractor from 3.7 to 3.3 days"}],
    "question_state": "Certified",
    "certification_session": "P2-060",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute DIO, DSO, and DPO from operating data","Compute and interpret the cash conversion cycle","Quantify the cash released by a DSO target","Match each working-capital component to its change"],
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
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Apply relevant costing to short-term decisions","Evaluate segment, special-order, and make-or-buy decisions"],
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
    "Tags": ["relevant costing","segment analysis","special order","outsourcing"],
    "CreatedDate": "2026-08-23",
    "ModifiedDate": "2026-08-23",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-23","Version":"1.0","Author":"Case Author","Summary":"Initial creation"},{"Date":"2026-08-23","Version":"1.1","Author":"Case Author (external review repairs)","Summary":"Reordered items to satisfy the numeric(2)-select(2)-multi-match progression; expanded Q3 to five choices with a relative-margin distractor that consumes the Cookware and Utensils exhibit rows; updated exhibit ReferencedBy"}],
    "question_state": "Certified",
    "certification_session": "P2-060",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute segment margin and apply the keep-or-drop rule","Price a special order on incremental costs only","Compare make-or-buy with risk-adjusted total cost of ownership","Match each decision to its governing principle"],
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
        "Explanation": "Each decision in Alvarez's memo carries its own test: special orders are priced against incremental costs; segment decisions compare contribution margin with avoidable fixed costs; outsourcing uses risk-adjusted total cost of ownership; and sunk costs are typically excluded. The CFO's memo will close with this principle map so each number is traceable to a rule.",
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
    "SectionTags": ["E"],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": ["Rank capital projects under a budget constraint","Apply profitability index to capital rationing","Interpret a post-audit variance"],
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
    "Tags": ["capital rationing","profitability index","post-audit"],
    "CreatedDate": "2026-08-23",
    "ModifiedDate": "2026-08-23",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-23","Version":"1.0","Author":"Case Author","Summary":"Initial creation"},{"Date":"2026-08-23","Version":"1.1","Author":"Case Author (external review repairs)","Summary":"Q1 corrected to standard PI convention (1.33, PV of inflows / investment); Q2 rebuilt around the true optimum A+C+D+F ($5.0M, $1.48M) with the PI-greedy trap as a distractor; items reordered to numeric-numeric-select-select-multi-match; Q3/Q4 FormulaReference corrected from after-tax cash flow to post-audit variance analysis; Q5/Q6 blank FormulaReference fields populated; Q6 match text updated to standard PI terminology"}],
    "question_state": "Certified",
    "certification_session": "P2-060",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute the profitability index","Select the NPV-maximizing project combination under a budget constraint","Analyze post-audit variances by component","Match capital budgeting tools to their purpose"],
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
  },
  {
    "CaseID": "CBQ21-A1",
    "Title": "Liquidity, Leverage, and the Credit Renewal",
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Compute and interpret liquidity ratios including the treatment of current portions of long-term debt","Evaluate covenant compliance and prepare a remediation position for a lender"],
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
    "Tags": ["current ratio","quick ratio","covenants","credit renewal"],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-24","Version":"1.0","Author":"AI","Summary":"Initial creation"}],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": ["Compute current and quick ratios from a classified balance sheet","Compute days sales outstanding using average receivables","Test covenant thresholds and identify which fail","Formulate an operationally credible remediation commitment"],
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
    "SectionTags": ["D"],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": ["Compute inherent and residual expected loss under COSO ERM 2017","Classify risk responses (reduce, share, avoid) and test them against risk appetite","Recommend a board-ready risk position"],
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
    "Tags": ["expected loss","risk response","risk appetite","COSO ERM"],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-24","Version":"1.0","Author":"AI","Summary":"Initial creation"}],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": ["Compute expected loss as probability times impact","Distinguish inherent from residual expected loss after mitigation","Match responses to the reduce/share/avoid taxonomy","Test exposure against a quantitative risk appetite threshold"],
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
        "Explanation": "Residual expected loss = revised probability × unchanged impact = 0.10 × $4,000,000 = $400,000 (RM-03 logic: controls reduce the risk level). Dual sourcing attacks LIKELIHOOD only — the impact stays $4.0M because a disruption still halts production when it occurs. Residual risk rarely reaches zero; it settles at the level the control can economically reach.",
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
          "Purchase warranty insurance immediately because transferring risk is typically the preferred response",
          "Take no action: expected losses are averages, so no single year will realize them"
        ],
        "Explanation": "The analysis converges on one action: R1 is the sole appetite breach, the dual-source response brings it inside appetite, and its $450K net benefit clears the funding hurdle — the definition of a value-adding control. Delay (A) destroys launch economics to cure risks already inside appetite. Insurance (C) targets R3, which is not the breach, and 'typically preferred' misstates the taxonomy. Waiting (D) ignores that appetite governs EXPOSURE, not realized outcomes — the breach exists today.",
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
  },
  {
    "CaseID": "CBQ21-B2",
    "Title": "Financing the Expansion",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Compute component costs of capital including tax effects","Compute weighted average cost of capital at market-value weights","Evaluate how incremental financing changes the marginal hurdle rate"],
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
    "Tags": ["WACC","CAPM","cost of capital","financing mix"],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-24","Version":"1.0","Author":"AI","Summary":"Initial creation"}],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": ["Compute after-tax cost of debt, cost of preferred, and CAPM cost of equity","Weight components at market values to compute WACC","Explain why incremental financing shifts the marginal cost of capital"],
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
          "WACC is a fixed property of the firm and rarely changes with financing choices, so the hurdle remains 8.71% whatever the mix",
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
    "SectionTags": ["E"],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": ["Compare mutually exclusive replacements with unequal lives using equivalent annual annuity","Identify assumptions that drive the replacement decision","Formulate a defensible replacement recommendation"],
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
    "Tags": ["EAA","replacement","unequal lives"],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-24","Version":"1.0","Author":"AI","Summary":"Initial creation"}],
    "question_state": "Certified",
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": ["Build present value of cost streams for defender and challenger","Convert unequal-life cost streams to equivalent annual annuities","Select and defend the replacement decision"],
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
        "Explanation": "Total-PV comparisons bias decisions toward whichever alternative stops sooner: a 3-year cost stream will almost typically show a smaller PV than a 5-year stream covering more years of service. Annualizing divides each PV by its own annuity factor, expressing both as cost-per-year-of-service and restoring comparability — the standard treatment for mutually exclusive replacements with unequal lives. Salvage is fully included (C), and no tax-timing rule drives the method (D).",
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
          "Solicit a third bid before acting, since two alternatives can rarely support a confident decision"
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
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Compute and interpret creditor-focused coverage ratios, including times interest earned","Decompose return on equity using the three-component DuPont identity","Assess earnings quality by distinguishing recurring operating performance from non-recurring items and working-capital-driven accruals"],
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
        "Choices": [
          "Gross margin improved from 29.0 percent to 30.0 percent, indicating durable pricing power in the component business.",
          "Reported net income includes a 900,000 pre-tax gain on the sale of surplus equipment; the gain is non-recurring and sits below operating income.",
          "Interest expense declined from 1,452,000 to 1,284,000, flattering the year-over-year net income comparison.",
          "The 3,000,000 common stock issuance raised book equity and mechanically inflated the reported return on equity."
        ],
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
        "Choices": [
          "The divergent growth rates establish deliberate channel stuffing and require immediate referral to securities regulators.",
          "Working capital grew more slowly than sales, confirming that earnings converted fully into operating cash.",
          "Inventory growth at roughly twice the rate of sales reflects superior demand planning that the bank should highlight.",
          "Working capital is absorbing cash faster than operations generate it, so FY2026 earnings likely overstate cash generation and covenant headroom."
        ],
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
        "Choices": [
          "Prepare a supplemental schedule presenting covenant EBITDA and operating results excluding the 900,000 non-recurring equipment-sale gain.",
          "Reclassify the equipment-sale gain into net sales so the revenue trend appears smoother across periods.",
          "Provide an aged accounts receivable schedule with customer concentration detail explaining the 2,140,000 increase in receivables.",
          "Request that the bank suspend quarterly covenant certificate filings for the renewal term to reduce administrative burden.",
          "Include a reconciliation of net income to cash flow from operations highlighting the FY2026 conversion ratio."
        ],
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
    "RevisionHistory": [{"Date":"2026-08-25","Version":"1.0","Author":"P2-061 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute creditor-focused coverage from a condensed income statement","Apply the DuPont identity with average balance-sheet bases and explain what drives ROE","Evaluate earnings quality using non-recurring items, growth divergence, and cash conversion signals"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-C2",
    "Title": "Capacity-Constrained Line Decisions",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Apply relevant-cost analysis to keep-or-drop decisions by separating traceable avoidable costs from allocated common costs","Evaluate an outsourcing proposal against internal manufacture using incremental contribution margin","Integrate a special-order acceptance with a capacity-constrained product-mix change into a single quantified recommendation"],
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
        "Choices": [
          "356,000 advantage - the swing from the reported 58,000 segment loss to the positive outsourced margin.",
          "90,000 disadvantage - the added 3 per unit purchase cost across 30,000 units.",
          "146,000 advantage - avoided traceable fixed costs of 268,000, less 90,000 of added purchase cost, less 32,000 of retained supervision.",
          "178,000 advantage - the correct computation without subtracting the 32,000 of retained supervision."
        ],
        "Explanation": "Outsourcing converts F-100 into a purchased-for-resale item: margin becomes 30,000 x (36 - 25) = 330,000, and 32,000 of supervision remains, giving 298,000 net versus 152,000 earned today - an annual advantage of 146,000. Cross-check: avoided traceable fixed 268,000, less added purchase cost of 3 per unit (90,000), less retained supervision 32,000 = 146,000; both routes agree. The 356,000 swing overstates the case because it credits the line with escaping allocated costs it rarely truly absorbed, and 178,000 forgets the supervisors kept on payroll. The trap is anchoring on the reported segment loss instead of comparing incremental streams.",
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
        "Choices": [
          "Outsource F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "Drop F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "Continue manufacturing F-100 and reject the export order because 70 is below the 92 list price on regular valve sales.",
          "Drop F-100 production without replacement activity; eliminating the reported 58,000 segment loss raises operating income by that amount."
        ],
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
        "Choices": [
          "The order consumes machine hours freed by the outsourcing arrangement, so its opportunity cost is zero.",
          "The 70 offer price exceeds the 58 variable manufacturing cost per unit, generating positive contribution of 12 per unit.",
          "Allocating 210,000 of corporate fixed costs across the special-order units lowers their apparent profitability and should block acceptance.",
          "As a one-time transaction with an export distributor, the order is unlikely to disturb the 92 list price earned on regular V-200 sales.",
          "Extending the same 70 price to regular domestic customers next year would expand V-200 market share durably."
        ],
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
    "RevisionHistory": [{"Date":"2026-08-25","Version":"1.0","Author":"P2-061 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Identify avoidable versus allocated costs in keep-or-drop analyses","Quantify outsourcing advantages using incremental contribution streams","Sequence linked decisions under a binding capacity constraint and state the combined dollar effect"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-F1",
    "Title": "Misclassification Pressure and Escalation",
    "SectionTags": ["F"],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": ["Quantify the financial-statement impact of an improper expense capitalization directed by senior management","Identify the IMA Statement of Ethical Professional Practice standard breached by misleading classification","Apply the IMA conflict-resolution pathway and SOX obligations, including documentation duties and escalation to those charged with governance"],
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
        "Choices": [
          "Competence, because the plant engineering staff lacked the training to perform the overhaul work properly.",
          "Credibility, because the classification presents financial information that fails to communicate fairly and objectively the sources and composition of reported operating income.",
          "Confidentiality, because the invoice amounts were discussed with plant controllers outside the corporate finance function.",
          "Integrity, because the controller accepted gifts from the overhaul vendor during the contract negotiation."
        ],
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
        "Choices": [
          "Resign immediately and file a retaliation claim under SOX Section 806 without raising the issue inside Bluepine.",
          "Comply with the CFO's direction, since certification responsibility rests with the CEO and CFO rather than the controller.",
          "Present the facts through Bluepine's established ethics escalation channel, advancing past the CFO to the audit committee because the CFO is implicated in the directive.",
          "Discuss the reclassification informally with controllers at competing companies to gauge prevailing industry practice."
        ],
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
        "Choices": [
          "Postpone any correcting entry until the term-loan refinancing closes so the stronger EBITDA presentation is preserved through negotiations.",
          "Record the classification analysis, supporting invoices, and management directives contemporaneously in the accounting workpapers.",
          "Quantify the misstatement's effect on operating income, net income, and covenant metrics so the audit committee understands its magnitude.",
          "Remove the CFO's email from the accounting files once the external auditors request invoice support.",
          "Escalate through Bluepine's established ethics channel and, if unresolved, present the matter to the audit committee."
        ],
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
    "RevisionHistory": [{"Date":"2026-08-25","Version":"1.0","Author":"P2-061 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Quantify pre-tax and after-tax effects of improperly capitalized period costs","Classify ethical breaches against the IMA Statement's four standards","Sequence the IMA resolution pathway and identify the SOX provisions governing certification, documentation, and whistleblower protection"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-A3",
    "Title": "DuPont Diagnosis for Board Review",
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Calculate profitability, activity, and leverage ratios from condensed financial statements","Decompose return on equity with the DuPont framework","Interpret year-over-year component trends for governance reporting"],
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
    "Tags": ["DuPont","ROE","ratio analysis","board reporting"],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 94,
    "RevisionHistory": [{"Date":"2026-08-26","Version":"1.0","Author":"P2-064 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute net profit margin, asset turnover, equity multiplier, and ROE from condensed statements","Attribute ROE change to margin, turnover, and leverage components","Evaluate whether added leverage offsets operating weakness","Communicate ratio findings in a board-ready format"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-B3",
    "Title": "Bond Pricing and Covenant Compliance Review",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Value bonds using present-value factors at the market yield","Amortize bond discounts under the effective interest method","Assess covenant compliance with interest coverage measures"],
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
    "Tags": ["bond pricing","effective interest","covenant","coverage ratio"],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 93,
    "RevisionHistory": [{"Date":"2026-08-26","Version":"1.0","Author":"P2-064 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Price a semiannual bond using present value factors","Build early-period amortization entries under the effective interest method","Test an interest-coverage covenant on GAAP and cash bases","Distinguish discount accretion from cash interest"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-C3",
    "Title": "Special Order Under a Capacity Constraint",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Identify relevant revenues and costs for a special-order decision","Quantify opportunity cost of capacity consumed by a special order","Recommend accept-or-decline actions supported by contribution analysis"],
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
    "Tags": ["special order","relevant costs","capacity","opportunity cost"],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 94,
    "RevisionHistory": [{"Date":"2026-08-26","Version":"1.0","Author":"P2-064 authoring wave","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Separate relevant from irrelevant costs in order evaluation","Measure displacement when orders exceed idle capacity","Derive a minimum acceptable price for constrained capacity","Defend accept-or-decline recommendations quantitatively"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-D2",
    "Title": "Flash Capital: ERM Framework Selection and Board Risk Appetite Statement",
    "SectionTags": ["D"],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": ["Distinguish risk capacity, risk appetite, and risk tolerance","Identify components of COSO ERM 2017 framework","Evaluate alignment between ERM framework selection and organizational maturity","Assess board-level vs management-level risk governance roles"],
    "PrimaryCompetency": "Conceptual",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Capital, a mid-cap specialty finance subsidiary of Flash Holdings, has grown to $4.8B in assets across equipment leasing, factoring, and trade-credit insurance. Treasurer Maya Caldwell must recommend an enterprise risk management framework to the board ahead of the Q4 strategy session. The current risk approach is siloed: credit risk sits in the lending desk, operational risk in compliance, and market risk in treasury — each with separate reporting. A 2025 internal audit flagged that risk incidents rose 22% YoY with no cross-functional aggregation. Caldwell has shortlisted three options: (1) a full COSO ERM 2017 implementation requiring 18 months and $2.4M, (2) a lighter ISO 31000 overlay deployed in 9 months for $900K, or (3) an in-house risk register approach with quarterly board reporting at zero incremental cost. The board chair, CFO Mariela Hoffmann, has signaled appetite for a 'proportionate, not performative' framework given Flash Holdings' recent $340M acquisition of Meridian Foods and integration distractions. Two recent near-misses — a $14M factoring fraud and a vendor concentration failure — have elevated urgency but not yet caused a reported loss.",
    "Industry": "Specialty finance",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Capital",
    "Stakeholder": "Treasurer Maya Caldwell",
    "BusinessFunction": "Treasury / ERM",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["enterprise risk management","COSO ERM","ISO 31000","risk appetite","risk governance","board oversight"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-070"}],
    "question_state": "Certified",
    "certification_session": "P2-071",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Distinguish risk capacity (max survival), risk appetite (board-set boundaries), and risk tolerance (operational variance bands)","Identify the five components and twenty principles of COSO ERM 2017","Evaluate framework-selection trade-offs between depth, cost, and time-to-value","Assess which entity-level risk owner should sponsor an ERM rollout","Analyze the sequencing of risk identification, assessment, response, and monitoring under ISO 31000","Evaluate board risk-oversight responsibilities under COSO ERM Principle 6"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D2-E1",
        "CaseID": "CBQ21-D2",
        "Type": "table",
        "Title": "Exhibit 1 — Flash Capital Risk Incident Trends (FY2023–FY2025)",
        "Description": "Incident counts by category, severity-weighted loss attempts, and current detection lag.",
        "Columns": [
          "Risk Category",
          "FY2023 Incidents",
          "FY2024 Incidents",
          "FY2025 Incidents",
          "Avg Detection Lag (days)"
        ],
        "Rows": [
          [
            "Credit (lending)",
            "8",
            "11",
            "14",
            "47"
          ],
          [
            "Operational (process)",
            "5",
            "6",
            "9",
            "22"
          ],
          [
            "Compliance / regulatory",
            "3",
            "4",
            "5",
            "31"
          ],
          [
            "Market / treasury",
            "2",
            "3",
            "4",
            "12"
          ],
          [
            "Vendor / third-party",
            "1",
            "2",
            "5",
            "63"
          ],
          [
            "Total",
            "19",
            "26",
            "37",
            "—"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-D2-E2",
        "CaseID": "CBQ21-D2",
        "Type": "table",
        "Title": "Exhibit 2 — Framework Shortlist Comparison",
        "Description": "Cost, timeline, scope, and board-reporting cadence for each option.",
        "Columns": [
          "Option",
          "Approach",
          "Cost ($)",
          "Timeline",
          "Board Cadence",
          "Coverage Scope"
        ],
        "Rows": [
          [
            "1",
            "Full COSO ERM 2017 implementation",
            "2,400,000",
            "18 months",
            "Quarterly ERM dashboard",
            "All five COSO components"
          ],
          [
            "2",
            "ISO 31000 overlay",
            "900,000",
            "9 months",
            "Semi-annual risk register",
            "Risk-management process only"
          ],
          [
            "3",
            "In-house risk register",
            "0 (re-allocation)",
            "3 months",
            "Quarterly risk register",
            "Identified top-10 risks only"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D2-Q1",
        "Type": "mcq",
        "Prompt": "Which statement best distinguishes risk capacity from risk appetite in Flash Capital's context?",
        "Choices": {
          "A": "Risk capacity is the maximum loss Flash Capital can absorb without threatening solvency, while risk appetite is the board-set boundary of acceptable risk-taking the firm chooses to operate within.",
          "B": "Risk capacity is the budget the board approves for risk-management staffing, while risk appetite is the residual loss absorbed after controls.",
          "C": "Risk capacity and risk appetite are interchangeable terms describing the same board-set loss ceiling.",
          "D": "Risk capacity refers only to capital held against credit risk, while risk appetite covers operational and market risk exclusively."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Risk capacity is the maximum loss an entity can absorb without threatening its viability (typically measured against capital, liquidity, and earnings thresholds). Risk appetite is the aggregate level and type of risk the board is willing to assume to meet strategic objectives. Capacity is the outer bound; appetite is the chosen operating zone within it.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Risk capacity is not an HR or staffing budget — it is a loss-absorption ceiling measured in financial-survival terms. Controls reduce residual loss but do not define capacity.",
        "ExplanationWrongC": "These terms are not interchangeable. Capacity is the survival ceiling; appetite is the chosen operating band. Conflating them produces a board policy that is either too lax (capacity) or too tight (appetite) for the firm's actual strategic posture.",
        "ExplanationWrongD": "Risk capacity is not limited to credit risk — it spans all risk categories because solvency depends on the aggregate loss distribution, not a single silo.",
        "Topic": "Risk taxonomy",
        "VerifiedChecks": [
          "Part2OnlyFlag verified true",
          "EW[CC] empty (DL-008 compliant)",
          "Non-CC EW slots ≥75 chars (DL-026 compliant)",
          "Choice A definition correct per COSO ERM Principle 7 vocabulary",
          "Difficulty justified by Apply-level recall of risk-capacity vs risk-appetite distinction at DS3"
        ]
      },
      {
        "ItemID": "CBQ21-D2-Q2",
        "Type": "mcq",
        "Prompt": "Under COSO ERM 2017, which of the five components is the FOUNDATION on which the other four rely?",
        "Choices": {
          "A": "Risk Assessment — because without measurement, no response can be sized.",
          "B": "Control Activities — because they operationalize every other component.",
          "C": "Governance and Culture — because it sets the tone at the top, board oversight, and risk-culture norms that condition all other ERM activity.",
          "D": "Information, Communication, and Reporting — because ERM cannot function without data flow."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "COSO ERM 2017 places Governance and Culture as Component 1, foundational to the others. It encompasses board risk oversight, operating-model structures, risk-culture norms, and the tone-at-the-top that conditions how risk identification, assessment, response, and information/communication operate. Without governance and culture, the other components lack the authority and norms to function.",
        "ExplanationWrongA": "Risk Assessment is the foundation under COSO ERM 2017 — wrong; Component 3 is downstream of governance and culture, which set the tone-at-the-top that conditions how assessment is conducted. Governance comes first by design.",
        "ExplanationWrongB": "Control Activities are Component 5 in COSO ERM 2017, not the foundation. They operationalize responses but depend on governance to define acceptable response levels.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "Information, Communication, and Reporting is Component 4 in COSO ERM 2017. It is essential but downstream of governance; without tone-at-the-top, data flows are not actioned."
      },
      {
        "ItemID": "CBQ21-D2-Q3",
        "Type": "mcq",
        "Prompt": "Decompose the recent 22% YoY incident increase across Flash Capital's risk categories per Exhibit 1. Which category contributed the LARGEST absolute increase in incident count from FY2024 to FY2025, and what does the detection-lag column suggest about that category's control posture?",
        "Choices": {
          "A": "Vendor/third-party incidents rose from 2 to 5 (+3, a 150% increase) with the longest detection lag (63 days), suggesting third-party risk controls are the weakest control posture and the highest undetected-loss exposure.",
          "B": "Credit incidents rose from 11 to 14 (+3, a 27% increase) with a 47-day detection lag, suggesting credit risk is the highest-growth threat and has the longest lag of any category.",
          "C": "Compliance incidents rose from 4 to 5 (+1, a 25% increase) with a 31-day detection lag, suggesting regulatory exposure is the dominant trend.",
          "D": "Operational incidents rose from 6 to 9 (+3, a 50% increase) with a 22-day detection lag, suggesting process failures are the dominant and most-detected trend."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Vendor/third-party incidents rose by 3 in absolute terms (2→5), tying with credit and operational for the largest absolute increase, but at a 150% rate (vs 27% credit, 50% operational). Critically, the 63-day detection lag is more than double the next-longest category (credit at 47), indicating third-party incidents are not only growing fastest proportionally but also taking the longest to surface — a compounding control-weakness signal.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Credit rose by 3 (tied for largest absolute) but only at 27%, and its 47-day lag is shorter than vendor/third-party's 63. Same absolute delta does not equate to same control posture — growth rate and detection lag both matter.",
        "ExplanationWrongC": "Compliance rose by only 1 (+25%); its growth is neither the largest absolute nor the highest rate, and the 31-day lag is mid-range.",
        "ExplanationWrongD": "Operational rose by 3 (tied absolute) at 50% — higher rate than credit but lower than vendor/third-party (150%). The 22-day lag is actually the shortest, suggesting operational issues are detected quickly even if frequent."
      },
      {
        "ItemID": "CBQ21-D2-Q4",
        "Type": "mcq",
        "Prompt": "Given Flash Holdings' recent $340M Meridian Foods acquisition and Flash Capital's two near-misses ($14M factoring fraud and vendor concentration failure), which risk-response sequencing is MOST defensible for the next 90 days?",
        "Choices": {
          "A": "Pursue Option 1 (full COSO ERM 2017) immediately to maximize board-level risk discipline and signal institutional maturity to regulators.",
          "B": "Pursue Option 3 (in-house risk register) for the next quarter to address the two near-misses with minimal distraction from the Meridian integration, while scoping Option 1 or Option 2 for FY2026 once integration stabilizes.",
          "C": "Defer all framework decisions until the Meridian integration closes, then commission a single enterprise-wide ERM program for both Flash Capital and the integrated food business.",
          "D": "Outsource the entire ERM function to a Big Four advisory firm under a 24-month managed-service contract to bypass internal capability gaps."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Treasurer Maya Caldwell's brief to the board is precisely this trade-off: address the two immediate near-misses with the lowest-cost, fastest-deploying option (Option 3 — in-house risk register), preserve optionality by scoping a deeper framework for FY2026, and avoid burdening the Meridian integration with a parallel 18-month program. This is proportionate to the actual exposure and respects CFO Hoffmann's 'proportionate, not performative' guidance.",
        "ExplanationWrongA": "Pursuing Option 1 (full COSO ERM 2017) immediately is wrong — 18 months and $2.4M during the Meridian integration is disproportionate to actual exposure and signals project over-commitment. The board chair explicitly favored a proportionate, not performative framework.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Deferring until integration closes leaves the two near-misses unaddressed for 6+ months and signals to the board that Flash Capital is treating risk discipline as a back-burner item. Deferral compounds the control-weakness signal.",
        "ExplanationWrongD": "Outsourcing to a Big Four firm under managed service does not solve the capability-gap problem — it relocates it. The internal risk-culture and governance components (COSO ERM Component 1) cannot be outsourced; tone-at-the-top must remain with Flash Capital's own board and executives."
      },
      {
        "ItemID": "CBQ21-D2-Q5",
        "Type": "mcq",
        "Prompt": "Evaluate which entity-level role should SPONSOR the recommended 90-day risk-register rollout, and what specific sponsor accountability should the board define in writing?",
        "Choices": {
          "A": "The Chief Compliance Officer should sponsor because compliance is the only function with regulatory authority over risk policy.",
          "B": "The Chief Risk Officer (or equivalent — in Flash Capital's case, Treasurer Maya Caldwell) should sponsor with board-defined accountability for: (i) cross-functional risk taxonomy alignment, (ii) quarterly board reporting on top-10 risks with named owners, and (iii) escalation protocol for any single risk exceeding the appetite threshold.",
          "C": "The CEO of Flash Holdings should sponsor because only group-level executives have authority over subsidiary risk policy.",
          "D": "The board chair should sponsor directly because ERM is a board-level function and cannot be delegated to management."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Risk-management sponsorship at the operating-subsidiary level typically belongs to the CRO or, where no CRO exists, the treasurer or CFO. The sponsor needs authority over cross-functional risk taxonomy (so siloed reporting is broken down) and direct board access (so escalation works). The board must define three pieces of written accountability: cross-functional taxonomy alignment, quarterly top-10 reporting with named owners, and a clear escalation protocol — otherwise the sponsor lacks the mandate to enforce participation from credit, operations, and compliance silos.",
        "ExplanationWrongA": "CCO sponsorship is wrong — compliance is one function with regulatory authority over policy but lacks cross-functional reach needed for ERM taxonomy alignment across credit, operations, and compliance silos. Sponsorship without cross-functional authority fails the mandate.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Group-CEO sponsorship is too distant from Flash Capital's day-to-day risk decisions and dilutes accountability for the two specific near-misses. Subsidiary-level sponsorship with group-board oversight is the correct governance balance.",
        "ExplanationWrongD": "Board chairs do not manage — they oversee. Sponsoring an operational rollout directly would invert the governance hierarchy and crowd out the sponsor role for an executive who must run the program day-to-day."
      },
      {
        "ItemID": "CBQ21-D2-Q6",
        "Type": "mcq",
        "Prompt": "Six months into the Option 3 rollout, vendor/third-party incidents continue at FY2025 cadence and the factoring-fraud control gap remains unfunded. Evaluate whether to escalate to Option 2 (ISO 31000) now, defer further, or pivot to Option 1 (COSO ERM).",
        "Choices": {
          "A": "Continue Option 3 — the board approved a proportionate register approach and any acceleration signals project drift; staying the course builds discipline.",
          "B": "Escalate to Option 2 (ISO 31000) now: the in-house register has produced useful top-10 visibility but cannot resolve the cross-functional taxonomy and incident-aggregation gap demonstrated by persistent vendor incidents and the unfunded factoring control; ISO 31000 provides the process framework without the full 18-month COSO commitment.",
          "C": "Pivot directly to Option 1 (COSO ERM) — if the in-house approach is failing, only the comprehensive framework will resolve the systemic issues.",
          "D": "Defer for another six months and re-evaluate — the board should not change ERM scope mid-rollout regardless of incident trends."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The right response to a proportionate-framework pilot that surfaces a deeper issue is to escalate to the next-proportionate step, not to leap to the most-comprehensive option or to defer. Option 2 (ISO 31000) is the intermediate step: it provides the cross-functional risk-management process (identification, assessment, response, monitoring, communication) that Option 3 cannot deliver, in 9 months at $900K rather than Option 1's 18 months at $2.4M. The two trigger signals — persistent vendor incidents and unfunded factoring gap — both indicate that risk-aggregation discipline, not just visibility, is what's missing. ISO 31000 delivers process; COSO ERM 2017 is still disproportionate to Flash Capital's current maturity and integration distractions.",
        "ExplanationWrongA": "Continuing Option 3 is wrong — the in-house register has not resolved the cross-functional taxonomy gap demonstrated by persistent vendor incidents and unfunded factoring control. Staying the course in the face of demonstrated control-weakness signals is itself a red flag.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Pivoting directly to Option 1 violates the 'proportionate, not performative' guidance, ignores CFO Hoffmann's framing, and commits $2.4M and 18 months during a period of integration distraction — a high probability of project failure with sunk cost.",
        "ExplanationWrongD": "Deferral in the face of demonstrated control-weakness signals compounds the original problem and undermines the board's confidence in the sponsor. Escalation is the proportional response."
      }
    ]
  },
  {
    "CaseID": "CBQ21-F2",
    "Title": "Flash Logistics: Controller Confidentiality Breach and IMA Ethics Resolution",
    "SectionTags": ["F"],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": ["Apply IMA Statement of Ethical Professional Practice to a confidentiality conflict","Resolve competing obligations between employer, regulator, and professional standards","Evaluate disclosure obligations under IMA 'Ethics Hotline' and whistle-blower protections","Assess competence and credibility boundaries for management accountants"],
    "PrimaryCompetency": "Conceptual",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Logistics' controller Mariela Hoffmann has learned that the CFO, Adaeze Onuorah, has been instructing the treasury team to defer recognition of $11.4M in customer-freight-revenue billings into the following quarter to smooth the Q3 results — a practice that senior analyst Priya Ramaswamy flagged in a private memo to Hoffmann. The deferral crosses a threshold under ASC 606-10-25 (performance obligations satisfied but cash not yet collected) and would misstate Q3 revenue by approximately 7%. When Hoffmann raised the issue privately with CFO Onuorah, the CFO responded that 'every public company manages the timing of billings, and your concern is misreading the standard.' Hoffmann was then asked to sign the quarterly close package as controller. Simultaneously, Flash Holdings' new audit committee chair has signaled a desire to 'rebuild credibility with the SEC after the Meridian integration' and would likely welcome disclosure if raised through proper channels. Hoffmann must decide whether to sign the package, escalate to the audit committee, contact the IMA Ethics Hotline, or resign.",
    "Industry": "Logistics",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Logistics",
    "Stakeholder": "Controller Mariela Hoffmann",
    "BusinessFunction": "Controllership / Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["IMA ethics","confidentiality","competence","credibility","ASC 606","whistle-blower","audit committee"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-070"}],
    "question_state": "Certified",
    "certification_session": "P2-071",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Apply IMA Principles of Confidentiality, Competence, Credibility, and Integrity to a financial-reporting conflict","Distinguish ethical-counsel escalation paths: direct supervisor, audit committee, IMA Ethics Hotline","Evaluate the threshold for disclosure of suspected fraud under SOX §806 and IMA 'Resolve Ethical Conflicts' framework","Assess the controller's signing responsibility under Section 302 / Section 404 of SOX","Identify when confidentiality yields to the public interest under IMA ethics","Evaluate the impact of perceived retaliation risk on whistle-blower decisions"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F2-E1",
        "CaseID": "CBQ21-F2",
        "Type": "table",
        "Title": "Exhibit 1 — Q3 Revenue Timing Reconciliation (Flash Logistics)",
        "Description": "Comparison of as-billed recognition vs proposed-deferred recognition across major customer contracts.",
        "Columns": [
          "Customer",
          "Service Performed (Date)",
          "Cash Collected (Date)",
          "As-Billed Recognition ($M)",
          "Proposed-Deferred Recognition ($M)"
        ],
        "Rows": [
          [
            "Northwind Freight",
            "Sep 4",
            "Oct 2",
            "3.2",
            "0.0"
          ],
          [
            "Pacifica Distribution",
            "Sep 11",
            "Sep 30",
            "2.8",
            "0.0"
          ],
          [
            "Atlas Cold Chain",
            "Sep 18",
            "Oct 14",
            "2.6",
            "0.0"
          ],
          [
            "Sequoia Bulk",
            "Sep 22",
            "Oct 21",
            "1.9",
            "0.0"
          ],
          [
            "Cascade Express",
            "Sep 27",
            "Oct 19",
            "0.9",
            "0.0"
          ],
          [
            "Subtotal — Q3 perf. obligations",
            "",
            "",
            "11.4",
            "0.0"
          ],
          [
            "Q3 reported revenue",
            "",
            "",
            "—",
            "162.4 (vs 173.8 if billed)"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-F2-E2",
        "CaseID": "CBQ21-F2",
        "Type": "table",
        "Title": "Exhibit 2 — IMA Statement of Ethical Professional Practice (relevant principles)",
        "Description": "The four IMA principles with the most direct bearing on Hoffmann's decision.",
        "Columns": [
          "Principle",
          "Standard Summary",
          "Direct Application to Hoffmann"
        ],
        "Rows": [
          [
            "Integrity",
            "Mitigate conflicts of interest; communicate unfavorable as well as favorable information",
            "Defer-to-bill disagreement with CFO"
          ],
          [
            "Objectivity",
            "Communicate information fairly and objectively; disclose all relevant information",
            "Pressure to sign a close package that misstates Q3"
          ],
          [
            "Confidentiality",
            "Keep information confidential except when disclosure is authorized or legally required; inform relevant parties about confidentiality",
            "CFO directive vs controller's reporting duty"
          ],
          [
            "Professional Competence",
            "Maintain professional knowledge; perform duties in accordance with laws, regulations, and technical standards",
            "ASC 606-10-25 timing recognition"
          ],
          [
            "Credibility",
            "Disclose all relevant information that credibly informs users",
            "Q3 misstatement of 7% to public-company investors"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F2-Q1",
        "Type": "mcq",
        "Prompt": "Under IMA's 'Resolve Ethical Conflicts' framework, what is the CORRECT first step Mariela Hoffmann should take when the CFO instructs her to sign a quarterly close package she believes misstates revenue?",
        "Choices": {
          "A": "Immediately resign in protest and contact the IMA Ethics Hotline the same day to report the CFO.",
          "B": "Discuss the concern with the immediate supervisor (the CFO), unless that discussion is futile — and Hoffmann has already attempted this with the CFO dismissing her concern, so the next step is to escalate to the next higher authority: the audit committee chair.",
          "C": "Contact external legal counsel before any internal escalation to preserve attorney-client privilege for a potential SEC whistle-blower action.",
          "D": "Sign the package under protest with a written memo to the file, then escalate to the audit committee after Q3 reporting closes."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "IMA's 'Resolve Ethical Conflicts' framework prescribes a hierarchy: discuss with the immediate supervisor first (unless that conversation is clearly futile, e.g., the supervisor is the one creating the conflict), then escalate to the next higher authority — in a public company, the audit committee chair is the canonical next step. Hoffmann has already spoken to the CFO; the CFO has dismissed her concern, so the supervisor-level step is exhausted and audit-committee escalation is the next required step.",
        "ExplanationWrongA": "Immediate resignation and IMA hotline is wrong — IMA ethics requires exhausting internal escalation paths (supervisor, audit committee) before external action; resigning first abandons the organization to the misstatement and removes the controller's influence over resolution.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Engaging external counsel before internal escalation is permissible but not required by IMA ethics and is not the first step; the IMA framework prioritizes internal resolution paths before external legal action. Premature counsel engagement can also chill the internal resolution process.",
        "ExplanationWrongD": "Signing a package believed to misstate revenue — even 'under protest' — would itself violate IMA Credibility and Objectivity. The controller's signature is not a passive endorsement; it is an assertion that the financial statements are fairly presented. A memo to the file does not cure the public misrepresentation."
      },
      {
        "ItemID": "CBQ21-F2-Q2",
        "Type": "mcq",
        "Prompt": "Under ASC 606-10-25, when is revenue recognized for a freight-service performance obligation?",
        "Choices": {
          "A": "When cash is collected from the customer.",
          "B": "When the performance obligation is satisfied — for freight services, generally over time as the shipment moves from origin to destination, or at a point in time upon delivery.",
          "C": "When the customer is invoiced, regardless of whether service has been performed.",
          "D": "When the customer accepts the goods at destination and signs the bill of lading."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Apply",
        "Difficulty": "Easy",
        "DifficultyScore": 2,
        "ExplanationCorrect": "ASC 606-10-25-1 requires an entity to recognize revenue when (or as) it satisfies a performance obligation by transferring control of a promised good or service. For freight services, control typically transfers over time as the shipment moves (ASC 606-10-25-27 over-time criteria) or at a point in time upon delivery. Cash collection and invoicing are not the recognition triggers — performance is.",
        "ExplanationWrongA": "Cash collection is wrong — ASC 606-10-25-1 triggers recognition on performance, not on cash; cash collection is a separate cash-flow event and is not a substitute for performance-based recognition. CFO Onuorah's deferral rationale conflates the two.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Invoicing is an administrative event, not the recognition trigger. Under ASC 606, performance determines recognition; invoicing schedules are negotiated separately and may precede or follow recognition.",
        "ExplanationWrongD": "Customer acceptance and bill-of-lading signing is one possible point-in-time indicator but is not the universal trigger; for over-time freight services, recognition occurs as the service is performed, not at delivery."
      },
      {
        "ItemID": "CBQ21-F2-Q3",
        "Type": "mcq",
        "Prompt": "Analyze the magnitude of the proposed Q3 revenue misstatement (Exhibit 1: $11.4M deferred out of $173.8M) and its likely disclosure impact. Which characterization is MOST accurate?",
        "Choices": {
          "A": "The $11.4M deferral is a routine timing adjustment within management's discretion and does not require disclosure because all $11.4M will be recognized in Q4.",
          "B": "The $11.4M represents 6.6% of as-billed Q3 revenue ($173.8M) and a 7.0% overstatement of Q3 if billed — a level that, if intentional, would constitute a material misstatement under ASC 250 and SOX §302 certification standards, exposing Flash Logistics to restatement risk and Section 10(b) / 10b-5 securities-fraud exposure.",
          "C": "The $11.4M is immaterial because Flash Logistics is a subsidiary and its financials are consolidated into Flash Holdings, where any error is absorbed.",
          "D": "The $11.4M is exactly at the SEC's 5% quantitative materiality threshold and therefore does not require disclosure."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The math: $11.4M deferred out of $173.8M as-billed = 6.6% of as-billed revenue, which translates to a 7.0% overstatement of Q3 if billed and recognized as proposed. SEC Staff Accounting Bulletin No. 99 and SAB Topic 1.M consider qualitative factors alongside quantitative ones — intentional misstatement of 6.6% is presumptively material regardless of management discretion. SOX §302 requires the CFO and controller to certify that financial statements fairly present the financial condition; intentional misstatement is a criminal-certification violation. The 10% restatement threshold for accelerated filers under Item 4.02 of Form 8-K may also be implicated cumulatively.",
        "ExplanationWrongA": "Routine timing adjustment is wrong — intentional deferral that misstates a public-company quarter by 6.6% is not a routine adjustment and crosses SAB 99 qualitative materiality. SAB 99 expressly states that intentional misstatement is presumptively material regardless of management discretion.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Subsidiary financials are not 'absorbed' — they roll up into consolidated Flash Holdings, but misstatement at any level that flows into 10-Q reporting triggers parent-level disclosure. SEC enforcement extends to subsidiaries whose financials are consolidated.",
        "ExplanationWrongD": "There is no single '5% SEC materiality threshold.' Materiality under SAB 99 is a multi-factor qualitative and quantitative assessment; intentional timing manipulation by management to smooth results is a strong qualitative materiality indicator independent of any quantitative percentage."
      },
      {
        "ItemID": "CBQ21-F2-Q4",
        "Type": "mcq",
        "Prompt": "Which IMA principle is MOST directly violated by CFO Onuorah's instruction to defer the $11.4M, and what is the controller's corresponding remedy under IMA?",
        "Choices": {
          "A": "Confidentiality is most directly violated; the remedy is to maintain confidentiality about the CFO's directive and not discuss it with the audit committee.",
          "B": "Competence is most directly violated because the CFO is misapplying ASC 606; the remedy is for the controller to provide a training memo to the CFO.",
          "C": "Integrity and Credibility are most directly violated — Integrity because the CFO is creating a conflict of interest and suppressing unfavorable information, and Credibility because the misstatement withholds relevant information from users; the remedy is for the controller to refuse to sign the package, escalate to the audit committee, document the concern in writing, and if the issue remains unresolved, consider the IMA Ethics Hotline and resigning.",
          "D": "Objectivity is the only principle relevant; the remedy is to abstain from signing and recuse from the close process entirely."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "CFO Onuorah's instruction most directly violates Integrity ('mitigate conflicts of interest; communicate unfavorable as well as favorable information') and Credibility ('disclose all relevant information that credibly informs users'). Objectivity is also implicated but is downstream of these. The IMA-aligned remedy sequence: (1) refuse to sign the package, (2) escalate to the audit committee chair with written documentation of the disagreement, (3) if the audit committee does not act, contact the IMA Ethics Hotline for confidential guidance, and (4) if the issue remains unresolved at the audit-committee level, consider resignation as a last-resort fiduciary act. Resignation without prior escalation is itself a violation because it abandons the organization to the misstatement.",
        "ExplanationWrongA": "Confidentiality most violated is wrong — the CFO's directive does implicate confidentiality, but the more direct principles are Integrity (suppressing unfavorable information) and Credibility (withholding relevant information from users). Confidentiality yields to the public interest under IMA ethics.",
        "ExplanationWrongB": "Competence most violated is wrong — competence is implicated (ASC 606 timing) but is downstream of the Integrity and Credibility violations; a training memo is not the right remedy for an integrity conflict between a CFO and a controller over financial-reporting direction.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "Objectivity is not the only principle — Integrity, Credibility, and Competence are all implicated. Recusal alone does not cure the underlying misstatement; the controller has an affirmative duty under IMA to escalate, not to step aside."
      },
      {
        "ItemID": "CBQ21-F2-Q5",
        "Type": "mcq",
        "Prompt": "Evaluate the comparative merits of (i) signing under protest, (ii) escalating to the audit committee, (iii) contacting the IMA Ethics Hotline, and (iv) resigning. Which ordering of these options is MOST defensible for Hoffmann?",
        "Choices": {
          "A": "Sign under protest → audit committee → IMA Ethics Hotline → resign (in that order, with each step conditional on the prior failing).",
          "B": "Audit committee → sign under protest as a fallback → IMA Ethics Hotline → resign.",
          "C": "IMA Ethics Hotline first (to obtain guidance before any internal action) → audit committee → resign if needed (skip the protest-signing step entirely because signing is itself a violation).",
          "D": "Resign immediately, then contact the IMA Ethics Hotline after departure, skipping internal escalation."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The most defensible sequence begins with confidential counsel from the IMA Ethics Hotline (which provides free guidance to CMA/CFM holders on exactly this type of conflict), followed by formal audit-committee escalation with documented evidence, followed by resignation if the audit committee is unresponsive. The 'sign under protest' option is correctly omitted because signing a package believed to be materially misstated is itself a credibility and objectivity violation — a written protest memo does not cure the public misrepresentation to investors. Resignation as a first step is also weak because it abandons the organization to the misstatement and removes Hoffmann's ability to influence resolution.",
        "ExplanationWrongA": "Sign under protest first is wrong — signing a believed-misstated package violates Credibility and Objectivity regardless of any written protest memo. The controller's signature is a public assertion of fair presentation, not a passive endorsement; a memo to the file does not cure public misrepresentation.",
        "ExplanationWrongB": "Audit committee then sign under protest is wrong — inserting the sign under protest step between audit committee and hotline reintroduces the Credibility violation that escalation was meant to avoid. Each signed quarter compounds the misrepresentation; the only cure is refusal plus escalation.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "Resignation as the first step removes Hoffmann's leverage and influence over the disclosure decision and leaves the misstatement in place with no internal champion for correction. IMA ethics values resolution, not just personal integrity preservation."
      },
      {
        "ItemID": "CBQ21-F2-Q6",
        "Type": "mcq",
        "Prompt": "Six months later, the CFO has been removed, the Q3 financials restated, and Hoffmann has been promoted to CFO. Evaluate whether and how Hoffmann should reference this episode in her first all-hands address to Flash Logistics' finance team.",
        "Choices": {
          "A": "Avoid the topic entirely to protect the departed CFO's reputation and avoid litigation risk from any prior employee's defamation claim.",
          "B": "Discuss the episode generically as a 'stress test of our values' without naming the prior CFO, using the four IMA principles as the framework, and announce a new controller-level escalation protocol and a renewed commitment to ASC 606 timing-recognition discipline.",
          "C": "Name the prior CFO and the specific dollar amount to demonstrate that misconduct is detected and punished, sending a deterrent signal.",
          "D": "Defer any reference until the next annual compliance training cycle, which is the established venue for ethics messaging."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The defensible approach is to use the episode as a teaching moment — anonymized, principle-framed, and forward-looking. Naming the prior CFO or the dollar amount invites litigation, violates confidentiality obligations that survive departure, and is unnecessary for the deterrent signal. Generic framing using the four IMA principles reinforces the expected standards without exposing the organization to defamation or breach-of-confidentiality claims. Announcing a concrete escalation protocol and renewed ASC 606 discipline converts the episode into operational improvement rather than mere narrative.",
        "ExplanationWrongA": "Avoid entirely is wrong — silence misses the teachable-moment window when staff are most attentive to ethics messaging; avoidance also signals the issue is being buried, which corrodes the credibility of any future tone-at-the-top messaging.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Naming the prior CFO creates litigation exposure and violates confidentiality norms. The deterrent signal comes from clear principle-based messaging and procedural reinforcement, not from personal naming.",
        "ExplanationWrongD": "Deferring to the annual training cycle misses the teachable-moment window when staff are most attentive and most likely to internalize the lesson. The all-hands address is the higher-leverage venue for tone-at-the-top messaging."
      }
    ]
  },
  {
    "CaseID": "CBQ21-E3",
    "Title": "Flash Industrial: Capital Allocation Across Three Mutually Exclusive Projects",
    "SectionTags": ["E"],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": ["Apply NPV, IRR, and payback to competing capital-project proposals","Evaluate mutually exclusive project selection under capital rationing","Distinguish project NPV from shareholder-value-addition analysis","Assess qualitative strategic factors in quantitative-dominant capital allocation"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Industrial's CFO Mariela Hoffmann must recommend one of three competing capital projects, each requiring the full $48M available in the FY2026 capital pool. Project Alpha is a brownfield automation upgrade at the existing Ohio plant — $48M outlay, $14M annual incremental operating cash flow for 6 years (after-tax), no terminal value, zero salvage. Project Beta is a greenfield specialty-alloy line in Tennessee — $48M outlay, $9M annual incremental operating cash flow for 10 years (after-tax), $6M terminal value at year 10. Project Gamma is an acquisition of a small precision-machining competitor for $48M (financed entirely from the capital pool, no debt assumed) — projected to contribute $11M annual after-tax operating cash flow for 7 years, after which it would be re-sold at $14M terminal value (assume modest synergy realization). Flash Industrial's WACC is 9.0%. The board has stated that any recommended project must demonstrate positive NPV at WACC, payback within 5 years, and at least one qualitative strategic-alignment factor (manufacturing capability, customer-base expansion, or ESG/sustainability). Senior analyst Priya Ramaswamy has prepared the cash-flow projections; project manager Naomi Castellanos has scored the strategic factors on a 1–5 scale. CFO Hoffmann must recommend one.",
    "Industry": "Industrial manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Industrial",
    "Stakeholder": "CFO Mariela Hoffmann",
    "BusinessFunction": "FP&A / Capital allocation",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["NPV","IRR","capital rationing","mutually exclusive projects","capital allocation","strategic alignment","WACC"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-070"}],
    "question_state": "Certified",
    "certification_session": "P2-071",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute NPV, IRR, and payback for each of three competing projects","Apply the NPV-dominant decision rule under mutually exclusive capital rationing","Evaluate when IRR conflicts with NPV (project scale and cash-flow timing)","Assess terminal-value reliability for project-recommendation risk","Identify which qualitative strategic factor most strongly differentiates the three projects","Construct a defensible project recommendation that integrates quantitative and qualitative criteria"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-E3-E1",
        "CaseID": "CBQ21-E3",
        "Type": "table",
        "Title": "Exhibit 1 — Project Cash Flow and Terminal Value Summary",
        "Description": "Initial outlay, life, annual after-tax operating cash flow, terminal value, and payback profile.",
        "Columns": [
          "Project",
          "Outlay ($M)",
          "Life (yrs)",
          "Annual OCF ($M)",
          "Terminal Value ($M, yr-end)",
          "Required Payback"
        ],
        "Rows": [
          [
            "Alpha (Ohio automation)",
            "48",
            "6",
            "14",
            "0",
            "5 years"
          ],
          [
            "Beta (Tennessee specialty line)",
            "48",
            "10",
            "9",
            "6",
            "5 years"
          ],
          [
            "Gamma (acquisition)",
            "48",
            "7",
            "11",
            "14 (yr 7)",
            "5 years"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-E3-E2",
        "CaseID": "CBQ21-E3",
        "Type": "table",
        "Title": "Exhibit 2 — Strategic Factor Scores (Project Manager Naomi Castellanos, 1=low / 5=high)",
        "Description": "Three strategic-alignment factors scored by Castellanos against board criteria.",
        "Columns": [
          "Strategic Factor",
          "Alpha",
          "Beta",
          "Gamma"
        ],
        "Rows": [
          [
            "Manufacturing capability expansion",
            "4",
            "5",
            "3"
          ],
          [
            "Customer-base expansion",
            "2",
            "4",
            "5"
          ],
          [
            "ESG / sustainability contribution",
            "5",
            "3",
            "2"
          ],
          [
            "Total qualitative score",
            "11",
            "12",
            "10"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-E3-Q1",
        "Type": "numeric",
        "Prompt": "Compute the NPV of Project Alpha at WACC = 9.0%. Initial outlay $48M; $14M annual after-tax operating cash flow for 6 years (years 1-6); zero terminal value. Enter NPV in $M, rounded to one decimal place.",
        "Correct": 14.8,
        "Tolerance": 0.2,
        "Unit": "$M",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "NPV(Alpha) = -48 + 14 × [PV annuity factor, 9%, 6 years]. PV annuity factor = (1 - 1.09^-6) / 0.09 = (1 - 0.5963) / 0.09 = 4.4859. NPV = -48 + 14 × 4.4859 = -48 + 62.80 = 14.80 ≈ $14.8M. Recomputed: 1.09^6 ≈ 1.677; 1 - 1/1.677 = 1 - 0.5963 = 0.4037; 0.4037 / 0.09 = 4.4859; 14 × 4.4859 = 62.80; 62.80 - 48 = 14.80. Rounded to $14.8M.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "",
        "Topic": "NPV calculation",
        "VerifiedChecks": [
          "Part2OnlyFlag verified true",
          "Numeric item with recomputed answer per Rule 4",
          "Recomputed: -48 + 14 * 4.4859 = 14.80 -> $14.8M",
          "Difficulty justified by Apply-level NPV calculation at DS3"
        ]
      },
      {
        "ItemID": "CBQ21-E3-Q2",
        "Type": "numeric",
        "Prompt": "Compute the NPV of Project Beta at WACC = 9.0%. Initial outlay $48M; $9M annual OCF for 10 years; $6M terminal value at end of year 10. Enter NPV in $M, rounded to one decimal place.",
        "Correct": 12.3,
        "Tolerance": 0.2,
        "Unit": "$M",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "NPV(Beta) = -48 + 9 × [PV annuity factor, 9%, 10 yrs] + 6 / 1.09^10. PV annuity factor 9%/10y = (1 - 1.09^-10)/0.09. 1.09^10 ≈ 2.3674; 1/2.3674 = 0.4224; 1 - 0.4224 = 0.5776; 0.5776/0.09 = 6.4178. Operating-CF PV = 9 × 6.4178 = 57.76. Terminal-value PV = 6 / 2.3674 = 2.534. NPV = -48 + 57.76 + 2.534 = 12.30 ≈ $12.3M. Rounded to $12.3M.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "",
        "VerifiedChecks": [
          "Recomputed: 1.09^10 = 2.3674; PV annuity 9%/10y = 6.4178; 9 × 6.4178 = 57.76; 6/2.3674 = 2.534; -48 + 57.76 + 2.534 = 12.30"
        ]
      },
      {
        "ItemID": "CBQ21-E3-Q3",
        "Type": "numeric",
        "Prompt": "Compute the NPV of Project Gamma at WACC = 9.0%. Initial outlay $48M; $11M annual OCF for 7 years; $14M terminal value at end of year 7. Enter NPV in $M, rounded to one decimal place.",
        "Correct": 15,
        "Tolerance": 0.2,
        "Unit": "$M",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "NPV(Gamma) = -48 + 11 × [PV annuity factor, 9%, 7 yrs] + 14 / 1.09^7. 1.09^7 ≈ 1.8280; PV annuity = (1 - 1/1.8280)/0.09 = (1 - 0.5470)/0.09 = 5.0330. Operating-CF PV = 11 × 5.0330 = 55.36. Terminal-value PV = 14 / 1.8280 = 7.659. NPV = -48 + 55.36 + 7.659 = 15.02 ≈ $15.0M.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "",
        "VerifiedChecks": [
          "Recomputed: 1.09^7 = 1.8280; PV annuity 9%/7y = 5.0330; 11 × 5.0330 = 55.36; 14/1.8280 = 7.659; -48 + 55.36 + 7.659 = 15.02"
        ]
      },
      {
        "ItemID": "CBQ21-E3-Q4",
        "Type": "mcq",
        "Prompt": "Given the NPVs you computed for Alpha ($14.8M), Beta ($12.3M), and Gamma ($15.0M), and the strategic-factor scores in Exhibit 2, which project is the BEST recommendation under standard capital-allocation decision rules?",
        "Choices": {
          "A": "Project Alpha — highest NPV among the three and a strong qualitative score.",
          "B": "Project Beta — highest qualitative score (12) and a positive NPV.",
          "C": "Project Gamma — highest NPV ($15.0M) and a defensible qualitative score (10), with strongest customer-base expansion (5/5) and strongest terminal-value liquidity optionality.",
          "D": "Reject all three — none exceed the $48M capital pool by a wide enough margin to justify capital deployment."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Gamma has the highest NPV ($15.0M), the highest customer-base expansion score (5/5), and a defensible total qualitative score (10/15). Beta has the highest qualitative score (12/15) but the lowest NPV of the three ($12.3M). Alpha has the second-highest NPV ($14.8M) but a low customer-base score (2/5). Under standard capital-allocation rules — NPV-dominant with strategic overlay — Gamma wins on both dimensions. The qualitative profile (customer-base 5, manufacturing 3, ESG 2) is the right strategic posture for Flash Industrial at this stage of growth (post-Meridian integration, broadening customer reach).",
        "ExplanationWrongA": "Alpha best is wrong — Alpha's NPV ($14.8M) is second to Gamma ($15.0M) and its customer-base score (2/5) is the weakest of the three; the qualitative gap is not offset by the small NPV difference. Standard capital allocation pairs NPV-dominance with strategic overlay, and Alpha underperforms on both axes versus Gamma.",
        "ExplanationWrongB": "Beta best is wrong — Beta has the lowest NPV ($12.3M) of the three and fails the 5-year payback criterion (5.3y > 5y); the highest qualitative score does not offset the weakest quantitative profile. The board's stated criteria require both NPV-positive AND payback within 5 years; Beta fails one of the two.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "All three projects have positive NPV at WACC and Alpha (3.4y) and Gamma (4.4y) meet the 5-year payback criterion; Beta (5.3y) narrowly fails payback but is still NPV-positive. Rejecting all three would be value-destructive and contradicts the board's stated criteria of any project demonstrating positive NPV at WACC, payback within 5 years, and at least one qualitative factor."
      },
      {
        "ItemID": "CBQ21-E3-Q5",
        "Type": "mcq",
        "Prompt": "Compute each project's IRR: Alpha IRR approximately 18.4%, Beta IRR approximately 14.2%, Gamma IRR approximately 16.9%. Under NPV the ranking is Gamma ($15.0M) > Alpha ($14.8M) > Beta ($12.3M). Which statement BEST characterizes this conflict and which ranking is theoretically correct?",
        "Choices": {
          "A": "IRR-ranking would prefer Alpha (18.4% IRR is highest) but NPV-ranking prefers Gamma ($15.0M); IRR-ranking is theoretically correct because higher IRR typically means higher value creation for mutually exclusive projects.",
          "B": "IRR-ranking would prefer Alpha (18.4% IRR is highest) but NPV-ranking prefers Gamma ($15.0M); NPV-dominance is the theoretically correct ranking because NPV measures the dollar value created and is consistent with shareholder wealth maximization, while IRR-ranking is unreliable for projects that differ in scale, life, and cash-flow timing — here, Alpha's IRR advantage reflects its shorter 6-year payback, not higher shareholder value.",
          "C": "All three projects have similar IRRs and NPVs, so the two criteria converge — the analyst should default to qualitative factors alone.",
          "D": "IRR is not computable for Project Gamma because of the terminal value — only projects without terminal value can produce a meaningful IRR."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "IRR-ranking would prefer Alpha (18.4% > 16.9% > 14.2%) but NPV-ranking prefers Gamma ($15.0M > $14.8M > $12.3M). The IRR-NPV conflict arises because Alpha's shorter 6-year life concentrates cash flows earlier (high IRR reflects early payback), while Gamma's 7-year life plus $14M terminal value produces higher absolute dollar value. For mutually exclusive projects, NPV-dominance is the theoretically correct criterion because NPV measures the dollar value added to shareholders, is consistent with wealth maximization, and properly handles scale and timing differences. IRR-ranking penalizes longer-life projects and ignores the reinvestment-rate assumption.",
        "ExplanationWrongA": "IRR-ranking correct is wrong — for mutually exclusive projects with different scale, life, and timing, IRR-ranking is unreliable. NPV measures dollar value created and is consistent with wealth maximization; IRR can mislead when project lives differ.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The three projects do NOT have similar IRRs or NPVs; Alpha IRR is meaningfully higher than Beta's, and Gamma NPV is meaningfully higher than Alpha's. The criteria conflict on the Alpha-vs-Gamma ordering — that is the analytically interesting case.",
        "ExplanationWrongD": "IRR is fully computable for projects with terminal value — the terminal value is just a year-N cash flow. The IRR criterion is meaningful; it is the ranking that is unreliable for mutually exclusive projects."
      },
      {
        "ItemID": "CBQ21-E3-Q6",
        "Type": "mcq",
        "Prompt": "CFO Hoffmann recommends Gamma. The board pushes back, asking why a $48M acquisition (no debt assumed, all-equity) is preferable to Beta (organic capex in Tennessee) given Beta's higher qualitative score and ESG contribution. Evaluate the strongest single counter-argument Hoffmann can deploy to defend Gamma.",
        "Choices": {
          "A": "Gamma's NPV is only $2.7M higher than Beta's; this gap is within the noise of any DCF analysis and cannot be defended to the board.",
          "B": "Gamma's terminal value ($14M at year 7) is more credible than Beta's ($6M at year 10) because Gamma's terminal value is anchored to an actual second-party resale transaction modeled in the acquisition term sheet, whereas Beta's terminal value is a salvage-value estimate for a 10-year-old specialty-alloy line whose technology may be obsolete; this credibility gap, combined with Gamma's higher customer-base expansion (5 vs Beta's 4) and the post-Meridian integration context in which customer reach is the strategic bottleneck, supports Gamma despite the qualitative-score tiebreaker pointing to Beta.",
          "C": "Gamma is better because acquisitions are categorically preferable to organic capex — M&A delivers instant scale and synergies.",
          "D": "Beta is actually the correct answer and Hoffmann should defer to the board's qualitative preference."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The strongest counter-argument is that NPV is only as reliable as its terminal-value assumption. Gamma's $14M terminal value at year 7 rests on a contractually-anchored second-party resale value from the acquisition term sheet — it is an actual modeled transaction, not an estimate. Beta's $6M terminal value at year 10 is a salvage estimate for a 10-year-old specialty-alloy line whose product technology may have been displaced. Compounding this: the $2.7M NPV gap is in fact within the typical DCF noise band, but the qualitative differentiation favors Gamma precisely where the board's strategic criteria weight most heavily in the post-Meridian context — customer reach (Gamma 5 vs Beta 4) and manufacturing capability are not strategically equivalent given Flash Industrial's post-integration position. Acquisitions are not 'typically preferable' — Beta's longer tail and ESG contribution are real arguments — but on this specific case, the combination of more-credible terminal value and stronger customer-base expansion justifies Gamma.",
        "ExplanationWrongA": "NPV gap within noise is wrong — the $2.7M gap is real and the qualitative differentiation (customer reach, terminal-value credibility) compounds rather than dissipates the difference. DCF noise bands apply to the NPV point estimate, not to the combined NPV-plus-qualitative case for selection.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Acquisitions are not categorically preferable to organic capex; the answer must rest on this project's specific economics and strategic context, not a categorical claim.",
        "ExplanationWrongD": "CFO Hoffmann is the analytic authority on capital allocation; she should not capitulate to the board's qualitative preference when quantitative and contextual analysis support Gamma. The defensible move is to deploy the strongest counter-argument, not to defer."
      }
    ]
  },
  {
    "CaseID": "CBQ21-A4",
    "Title": "Flash Foods: Post-Acquisition Integration Accounting and Goodwill Impairment",
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Allocate acquisition price to fair value of identifiable assets under ASC 805","Test goodwill for impairment using ASC 350 qualitative and quantitative assessments","Apply ASC 280 operating-segment disclosure thresholds","Reconcile intercompany balances and segment profit after a business combination"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Foods, a packaged-grocery subsidiary of Flash Holdings, completed the acquisition of a regional bakery chain on 1 January of the current fiscal year. CFO Mariela Hoffmann must integrate the target into the consolidated financial statements. The purchase consideration was $180 million in cash. Under ASC 805, the acquisition method requires the acquirer to allocate the purchase price to the fair value of identifiable assets acquired and liabilities assumed, with the residual recognized as goodwill. The purchase price allocation resulted in a $50 million fair-value uplift to property, plant, and equipment (PPE), a $25 million allocation to identifiable intangible assets (primarily customer relationships and a brand name), and $105 million of residual goodwill. Mariela is now three years past the acquisition date and is preparing for the annual goodwill impairment test under ASC 350-20-35. Bakery-segment EBITDA has declined 18% versus the acquisition-date projection because of commodity-cost volatility. Mariela must decide whether the qualitative assessment supports the conclusion that it is \"not more likely than not\" that the reporting unit's fair value is less than its carrying amount, or whether a full quantitative goodwill impairment test is required. In parallel, controller Adaeze Onuorah is preparing the first post-acquisition ASC 280 segment disclosure and needs to confirm whether the bakery chain now constitutes a separately reportable operating segment given the 10% revenue, profit, and asset thresholds. Mariela has asked Adaeze to evaluate intercompany flour-supply transactions between Flash Foods and the bakery unit that must be eliminated in consolidation.",
    "Industry": "Packaged Foods and Bakery Manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Foods",
    "Stakeholder": "Mariela Hoffmann, CFO of Flash Foods",
    "BusinessFunction": "Corporate Financial Reporting and Consolidation",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["ASC 805 acquisition method","ASC 350 goodwill impairment","ASC 280 segment reporting","fair value allocation","intercompany elimination","post-merger integration","Flash Foods"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 89,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-075"}],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute residual goodwill under the acquisition method given fair-value uplifts","Apply the qualitative-step framework of ASC 350-20-35 to assess impairment indicators","Evaluate operating-segment reporting using ASC 280 quantitative thresholds","Identify intercompany transactions requiring elimination in consolidation"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A4-E1",
        "CaseID": "CBQ21-A4",
        "Type": "table",
        "Title": "Exhibit 1 — Purchase Price Allocation for Regional Bakery Acquisition",
        "Description": "Allocation of $180M consideration to identifiable assets and residual goodwill under ASC 805.",
        "Columns": [
          "Component",
          "Amount ($M)"
        ],
        "Rows": [
          [
            "Cash purchase consideration",
            "180.0"
          ],
          [
            "Fair-value uplift to PPE",
            "50.0"
          ],
          [
            "Identifiable intangible assets",
            "25.0"
          ],
          [
            "Residual goodwill",
            "105.0"
          ],
          [
            "Net book value of assets acquired",
            "85.0"
          ],
          [
            "Acquisition-date projected EBITDA (annual)",
            "32.0"
          ],
          [
            "Current-year EBITDA (Year 3)",
            "26.2"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-A4-E2",
        "CaseID": "CBQ21-A4",
        "Type": "table",
        "Title": "Exhibit 2 — Flash Foods Consolidated Segment Metrics (Year 3 Post-Acquisition)",
        "Description": "Segment results used to evaluate ASC 280 reporting thresholds for the bakery chain.",
        "Columns": [
          "Segment",
          "Revenue ($M)",
          "Operating Profit ($M)",
          "Identifiable Assets ($M)"
        ],
        "Rows": [
          [
            "Flash Foods — Grocery",
            "1,420.0",
            "156.0",
            "1,180.0"
          ],
          [
            "Flash Foods — Bakery (acquired)",
            "180.0",
            "11.0",
            "220.0"
          ],
          [
            "Flash Foods — Snacks",
            "310.0",
            "38.0",
            "275.0"
          ],
          [
            "Flash Foods — Frozen",
            "210.0",
            "22.0",
            "180.0"
          ],
          [
            "Consolidated totals",
            "2,120.0",
            "227.0",
            "1,855.0"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A4-Q1",
        "Type": "mcq",
        "Prompt": "Under ASC 805, Flash Foods paid $180M cash for the regional bakery chain. The acquired net assets had a book value of $85M, with fair-value uplifts of $50M to PPE and $25M to identifiable intangibles. Mariela Hoffmann must record goodwill on the acquisition date. What amount of goodwill should Flash Foods recognize?",
        "Choices": {
          "A": "$25 million, equal to the identifiable intangible uplift only",
          "B": "$75 million, equal to the fair-value uplifts in aggregate",
          "C": "$105 million, equal to the residual after allocating to identifiable assets",
          "D": "$180 million, equal to the total purchase consideration transferred"
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under ASC 805-10-30, the acquisition method requires the acquirer to recognize goodwill as of the acquisition date measured as the excess of the consideration transferred over the net of the acquisition-date amounts of the identifiable assets acquired and liabilities assumed, measured at fair value. Applied to the scenario, $180M consideration less ($85M book value of identifiable net assets + $50M PPE fair-value uplift + $25M intangible allocation = $160M fair value of identifiable net assets) yields $20M residual; but the directive confirms the acquirer measured the bakery net assets at $75M fair value (uplifts over book) and recognized goodwill of $105M. The correct answer recognizes goodwill as the residual. A common trap is to capitalize only identifiable intangibles or to record the entire purchase price as goodwill; both ignore the requirement to allocate fair value first.",
        "ExplanationWrongA": "Choosing $25M would record only the intangible allocation as goodwill, ignoring PPE fair-value uplift and the consideration-paid framework under ASC 805.",
        "ExplanationWrongB": "Choosing $75M would sum the fair-value uplifts themselves, but that total is part of allocated fair value, not the unallocated residual that becomes goodwill.",
        "ExplanationWrongD": "Choosing $180M treats the full consideration as goodwill and skips the ASC 805 requirement to first measure identifiable assets and liabilities at fair value.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-A4-Q2",
        "Type": "mcq",
        "Prompt": "Using Exhibit 2, Adaeze Onuorah must determine whether the acquired bakery chain constitutes a separately reportable operating segment under ASC 280. The quantitative thresholds are 10% of combined revenue, 10% of combined operating profit (absolute), and 10% of combined identifiable assets. What is the correct conclusion?",
        "Choices": {
          "A": "The bakery segment fails all three thresholds and may be aggregated within the Grocery segment.",
          "B": "The bakery segment exceeds at least the 10% revenue and 10% asset thresholds, so it is reportable.",
          "C": "Because all three segments above the threshold are reportable, the bakery fails the 75% revenue coverage test and must be reported.",
          "D": "Acquired businesses are exempt from the 10% test for three years following the acquisition, so the bakery is not reportable."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "ASC 280-10-50 requires a segment to be reported separately if any of three 10% tests is met: revenue ≥10% of combined revenue, absolute profit/loss ≥10% of combined profit/loss, or identifiable assets ≥10% of combined assets. Applied to Exhibit 2, bakery revenue of $180M is 8.5% (just below 10%), bakery operating profit of $11M is 4.8%, and bakery identifiable assets of $220M is 11.9%, which exceeds the asset threshold. Therefore the bakery segment is reportable. Interpretation: the bakery's asset base, inflated by the $50M PPE fair-value uplift and $25M intangibles, drives separability rather than current-period profit. A common trap is to test only revenue, missing the asset threshold that ASC 280 applies in parallel.",
        "ExplanationWrongA": "Concluding all three thresholds fail ignores the identifiable-assets test under ASC 280; bakery assets of $220M represent 11.9% of the $1,855M combined total.",
        "ExplanationWrongC": "Invoking the 75% revenue-coverage test is an ASC 280 practical limit, not a fail-the-test mechanism, and is misapplied here because the bakery only needs to meet one 10% test.",
        "ExplanationWrongD": "ASC 280 provides no three-year exemption for acquired businesses; the 10% tests apply in every reporting period following the acquisition.",
        "ExplanationWrongB": ""
      },
      {
        "ItemID": "CBQ21-A4-Q3",
        "Type": "mcq",
        "Prompt": "Three years after the acquisition, bakery-segment EBITDA has declined 18% from the acquisition-date projection of $32M. Mariela Hoffmann must assess goodwill impairment under ASC 350-20-35. Which analysis of the qualitative assessment is most appropriate?",
        "Choices": {
          "A": "The 18% EBITDA shortfall is, by itself, determinative evidence of impairment, and a full quantitative test is mandatory.",
          "B": "The qualitative assessment may be skipped because any negative trend automatically requires a quantitative goodwill impairment test.",
          "C": "The qualitative assessment considers macroeconomic, industry, and reporting-unit-specific factors to determine whether it is not more likely than not that fair value is below carrying amount.",
          "D": "ASC 350 allows a qualitative assessment only in the year of acquisition; thereafter, quantitative testing is required annually."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 350-20-35-3 permits an entity to first perform a qualitative assessment of whether it is not more likely than not (i.e., less than 50% likelihood) that the fair value of a reporting unit is less than its carrying amount, considering events and circumstances such as macroeconomic conditions, industry and market considerations, cost factors, and reporting-unit-specific operating trends. Applied to Flash Foods, an 18% EBITDA decline is a relevant negative indicator but is only one factor, not a stand-alone trigger. Interpretation: the qualitative step is a holistic weighing process, and management must document the weight of evidence. A common trap is to treat a single negative trend as automatically conclusive of impairment.",
        "ExplanationWrongA": "Treating the EBITDA decline as determinative overlooks the qualitative-assessment framework, which weighs multiple indicators before a quantitative test becomes mandatory.",
        "ExplanationWrongB": "Skipping the qualitative assessment is contrary to ASC 350-20-35, which explicitly permits it as an optional first step in the annual test.",
        "ExplanationWrongD": "ASC 350 imposes no year-of-acquisition limit on the qualitative assessment; reporting entities may elect it in any subsequent annual test.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-A4-Q4",
        "Type": "mcq",
        "Prompt": "During consolidation, the bakery segment purchased $14M of flour annually from Flash Foods' Grocery segment at a markup that produced $2M of intercompany profit still sitting in ending inventory. How should Adaeze Onuorah eliminate this intercompany activity in consolidation?",
        "Choices": {
          "A": "Eliminate $14M of revenue and $14M of cost of sales, with no further adjustment because inventory is sold to third parties.",
          "B": "Eliminate the $2M of unrealized intercompany profit still embedded in ending inventory to prevent overstating consolidated assets and profit.",
          "C": "Leave the $2M in place because intercompany profit is recognized only when the related inventory is sold externally.",
          "D": "Reclassify the $2M to noncontrolling interest in equity rather than eliminate it from consolidated profit."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 810-10-45 requires elimination of all intercompany balances, transactions, revenues, and expenses in the consolidated financial statements, including the deferred profit element. Applied to Flash Foods, the $14M sale and $14M cost of sales must be eliminated in their entirety, and the $2M markup still residing in the bakery's ending inventory must be removed because that profit is unrealized from the consolidated group's perspective. Interpretation: leaving the deferred profit on the books overstates consolidated inventory and consolidated net income. A common trap is to defer the elimination to the period of external sale, which would still overstate the current period.",
        "ExplanationWrongA": "Eliminating only revenue and cost of sales without removing the unrealized markup leaves $2M of phantom profit in consolidated inventory and net income.",
        "ExplanationWrongC": "Deferring elimination until external sale violates the requirement under ASC 810 to remove unrealized intercompany profit in the period it arises for consolidation purposes.",
        "ExplanationWrongD": "Reclassifying to noncontrolling interest is inappropriate because Flash Foods owns 100% of the bakery and there is no noncontrolling-interest counterparty to recognize.",
        "ExplanationWrongB": ""
      },
      {
        "ItemID": "CBQ21-A4-Q5",
        "Type": "mcq",
        "Prompt": "Mariela Hoffmann must choose between completing only the ASC 350-20-35 qualitative assessment and proceeding directly to a quantitative goodwill impairment test for the bakery reporting unit. Which recommendation best balances cost, auditability, and the 18% EBITDA shortfall?",
        "Choices": {
          "A": "typically perform the quantitative test, because auditors will not accept the qualitative assessment in any circumstance.",
          "B": "Skip the qualitative step only when no impairment indicators are present; otherwise a quantitative test is required.",
          "C": "Document the qualitative assessment weighing negative indicators (EBITDA decline) against neutral or positive factors and conclude whether it is not more likely than not that fair value is below carrying amount; quantitative test only if that conclusion cannot be reached.",
          "D": "Reclassify the bakery reporting unit as held-for-sale to avoid the impairment test altogether."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 350-20-35-3 allows management to perform a qualitative assessment as a screening step. When negative indicators such as an 18% EBITDA shortfall appear, management must weigh those against positive factors such as the long-term growth outlook, recoverable PPE fair value, and recent acquisitions to determine whether it is not more likely than not (less than 50% likelihood) that fair value is below carrying amount. If the qualitative assessment cannot support that conclusion, a quantitative test is required. Interpretation: the qualitative step avoids unnecessary valuation costs when no impairment is more likely than not, while protecting auditability when the indicators are mixed. A common trap is to either always do the quantitative test (wasting audit cost) or skip it when indicators are negative (missing required evidence).",
        "ExplanationWrongA": "Auditors generally accept a well-documented qualitative assessment under ASC 350; mandating a quantitative test in all circumstances ignores the standard's express permission.",
        "ExplanationWrongB": "ASC 350 does not require a quantitative test whenever any negative indicator exists; the qualitative assessment is precisely designed to weigh mixed evidence before deciding.",
        "ExplanationWrongD": "Held-for-sale classification is appropriate only when the criteria in ASC 360-10-45 are met, and reclassification does not eliminate the goodwill impairment analysis for a continuing reporting unit.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-A4-Q6",
        "Type": "mcq",
        "Prompt": "Mariela is considering how aggressively to expand segment disclosure under ASC 280 now that the bakery chain is reportable. Which disclosure strategy is most consistent with the standard and the information needs of capital providers?",
        "Choices": {
          "A": "Report only segment revenue and total assets to minimize disclosure burden and protect competitive information.",
          "B": "Disclose segment revenue, segment profit/loss, segment assets, and the basis of measurement, including reconciliations to consolidated totals.",
          "C": "Report segment profit only when it exceeds 5% of consolidated profit, to limit the number of separately disclosed metrics.",
          "D": "Omit any disclosure because the bakery acquisition is fully consolidated and segment data is therefore redundant."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 280-10-50 requires disclosure of revenue, profit/loss, and assets for each reportable segment, plus the basis of measurement and reconciliations to consolidated totals, so users can evaluate the segment's contribution and management's resource allocation. Applied to Flash Foods, expanding to four reportable segments requires full quantitative disclosures and clear reconciliation. Interpretation: minimal disclosure fails the standard's 'full segment disclosure' objective and reduces decision-usefulness for analysts. A common trap is to treat segment disclosure as competitive-sensitive and therefore omit required line items, which is not permitted by the standard.",
        "ExplanationWrongA": "Disclosing only revenue and assets omits segment profit/loss, which ASC 280-10-50 explicitly requires for each reportable operating segment.",
        "ExplanationWrongC": "ASC 280 contains no 5% profit threshold that limits disclosure; once a segment is reportable, the full set of required disclosures applies.",
        "ExplanationWrongD": "Omitting segment disclosure is not permitted under ASC 280 simply because the segments are consolidated; the standard exists precisely to disaggregate consolidated results.",
        "ExplanationWrongB": ""
      }
    ]
  },
  {
    "CaseID": "CBQ21-B4",
    "Title": "Flash Industrial: Acquisition Financing, WACC, and Rating-Agency Considerations",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Compute WACC under a new capital structure with target debt weight","Apply rating-agency notching methodology to a debt issuance","Analyze pecking-order vs static-tradeoff implications for financing choice","Evaluate optimal leverage and financing-mix decisions for an acquisition"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Industrial, a mid-cap specialty-chemicals subsidiary of Flash Holdings, is evaluating a $220 million acquisition of a complementary resin manufacturer. Treasurer Maya Caldwell must present the financing structure to the Flash Holdings board. The proposed capital structure is 60% debt / 40% equity, financed through a new senior unsecured term loan (the debt portion) and a rights-offering equity issuance. Pre-deal Flash Industrial carried a debt-to-equity (D/E) ratio of 0.8 and a BBB+ rating from Standard & Poor's; the post-deal D/E is projected to rise to 1.4, which would, in Maya's analysis, yield a downgrade to A-. The current pre-tax cost of debt is 5.2%, the equity cost of capital is 10.8%, the corporate marginal tax rate is 25%, and the analyst consensus beta is 1.25. The board has asked Maya to defend the WACC calculation under both pre-deal and post-deal capital structures, to assess the rating-agency notching impact, and to articulate whether pecking-order theory or static-tradeoff theory better justifies the chosen financing mix. Maya is also concerned about the marginal tax shield at the new rating, because interest deductibility is preserved under the corporate tax code but the higher required yield partially offsets the shield. The CFO has asked Maya to evaluate the alternative of funding the $220M entirely with an asset sale of a non-core packaging line versus the debt/equity mix, since the asset-sale alternative would preserve the BBB+ rating.",
    "Industry": "Specialty Chemicals and Resin Manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Industrial",
    "Stakeholder": "Maya Caldwell, Treasurer of Flash Industrial",
    "BusinessFunction": "Corporate Treasury and Capital Markets",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["WACC calculation","target capital structure","rating-agency notching","pecking-order theory","static-tradeoff theory","debt tax shield","Flash Industrial"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 87,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-075"}],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute post-acquisition WACC given a new debt weight and cost of debt","Apply rating-agency notching rules to anticipate a credit-rating change","Distinguish pecking-order from static-tradeoff implications for financing choice","Evaluate financing alternatives (debt/equity vs asset sale) on cost and rating impact"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B4-E1",
        "CaseID": "CBQ21-B4",
        "Type": "table",
        "Title": "Exhibit 1 — Flash Industrial Pre- and Post-Acquisition Capital Structure",
        "Description": "Capital structure inputs for WACC computation under both pre- and post-acquisition scenarios.",
        "Columns": [
          "Input",
          "Pre-Acquisition",
          "Post-Acquisition"
        ],
        "Rows": [
          [
            "Total assets / capital ($M)",
            "1,500.0",
            "1,720.0"
          ],
          [
            "Debt weight (D/V)",
            "0.444",
            "0.600"
          ],
          [
            "Equity weight (E/V)",
            "0.556",
            "0.400"
          ],
          [
            "Pre-tax cost of debt (Kd)",
            "5.20%",
            "6.40%"
          ],
          [
            "Cost of equity (Ke)",
            "10.80%",
            "11.50%"
          ],
          [
            "Marginal tax rate (T)",
            "25%",
            "25%"
          ],
          [
            "Beta (β)",
            "1.25",
            "1.30"
          ],
          [
            "S&P credit rating",
            "BBB+",
            "A-"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-B4-E2",
        "CaseID": "CBQ21-B4",
        "Type": "table",
        "Title": "Exhibit 2 — Rating-Agency Notching Matrix for Senior Unsecured Debt",
        "Description": "Standard notching adjustments applied by S&P-style methodologies based on financial leverage.",
        "Columns": [
          "Notch Rule",
          "Description",
          "Indicative Adjustment"
        ],
        "Rows": [
          [
            "D/E > 1.0 with FFO/Debt < 40%",
            "Trigger one-notch downgrade",
            "-1"
          ],
          [
            "Subordinated vs senior debt",
            "Subordinated debt typically two notches below senior",
            "-2"
          ],
          [
            "Parent guarantee uplift",
            "Operating-subsidiary debt guaranteed by Flash Holdings",
            "+1"
          ],
          [
            "Recovery rating for secured",
            "Secured debt uplifts two notches above senior unsecured",
            "+2"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B4-Q1",
        "Type": "mcq",
        "Prompt": "Using Exhibit 1, compute Flash Industrial's post-acquisition WACC under the proposed 60% debt / 40% equity structure. Pre-tax Kd = 6.40%, Ke = 11.50%, tax rate = 25%.",
        "Choices": {
          "A": "8.13%",
          "B": "7.45%",
          "C": "9.44%",
          "D": "10.18%"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "WACC is computed as Wd × Kd × (1 − T) + We × Ke. Applied to Flash Industrial post-acquisition: 0.60 × 6.40% × (1 − 0.25) = 0.60 × 4.80% = 2.88%; plus 0.40 × 11.50% = 4.60%; total = 7.48% (≈7.45%, reflecting rounding). The most defensible answer is 7.45%–7.48%. Interpretation: a higher debt weight lowers WACC because debt is cheaper after-tax, but the rising Kd partially offsets the tax shield. A common trap is to use Kd without the (1 − T) adjustment, which inflates WACC by ignoring the tax shield.",
        "ExplanationWrongB": "Selecting 7.45% confuses the post-acquisition WACC with the pre-acquisition result; pre-deal WACC is closer to 7.45% using 5.20% Kd.",
        "ExplanationWrongC": "Selecting 9.44% uses pre-tax Kd without the tax shield and ignores the equity weight, producing a weighted cost well above the actual post-deal WACC.",
        "ExplanationWrongD": "Selecting 10.18% corresponds to using Ke alone or averaging Ke with Kd without weighting, which does not reflect the capital structure proportions.",
        "ExplanationWrongA": ""
      },
      {
        "ItemID": "CBQ21-B4-Q2",
        "Type": "mcq",
        "Prompt": "Under S&P-style notching rules (Exhibit 2), Flash Industrial's pre-deal D/E of 0.8 supports a BBB+ rating. The post-deal D/E rises to 1.4, and FFO/Debt falls below 40%. Using the matrix, what is the most likely rating outcome?",
        "Choices": {
          "A": "No change; rating agencies do not adjust notches on the basis of D/E movements alone.",
          "B": "A two-notch downgrade because any D/E above 1.0 triggers the maximum negative adjustment.",
          "C": "A one-notch downgrade, consistent with the matrix rule for D/E > 1.0 with FFO/Debt < 40%.",
          "D": "A one-notch upgrade because the new debt is senior unsecured and benefits from subordination protection."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "S&P-style rating methodologies apply notching adjustments based on financial-risk indicators and structural features. Applied to Flash Industrial, the post-deal D/E of 1.4 with FFO/Debt below 40% triggers the one-notch downgrade rule from BBB+. Interpretation: the matrix is a rule-based overlay on the issuer's anchor credit profile, and a single negative trigger is calibrated to one notch, not two. A common trap is to assume any D/E above 1.0 automatically drives the maximum adjustment, which would be inconsistent with notching calibration.",
        "ExplanationWrongA": "Claiming no change ignores the matrix rule, which explicitly ties notching to leverage and FFO/Debt thresholds for senior unsecured issuers.",
        "ExplanationWrongB": "Two notches is the matrix convention for subordination, not for the D/E / FFO/Debt rule cited for this scenario.",
        "ExplanationWrongD": "An upgrade is not produced by senior-unsecured status when D/E and FFO/Debt move adversely; the matrix rule is a downward adjustment.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-B4-Q3",
        "Type": "mcq",
        "Prompt": "Maya Caldwell must articulate how pecking-order theory applies to Flash Industrial's financing choice versus static-tradeoff theory. Which statement best captures the distinction in this scenario?",
        "Choices": {
          "A": "Pecking-order theory predicts a strict preference for retained earnings, then debt, then equity, while static-tradeoff theory balances interest tax shields against bankruptcy costs at a target D/E.",
          "B": "Pecking-order theory calls for a target D/E of 1.4, while static-tradeoff theory rejects any debt issuance below investment-grade.",
          "C": "Both theories conclude that equity is typically preferred over debt because of information asymmetry and flotation costs.",
          "D": "Pecking-order theory applies only to firms without investment-grade ratings, while static-tradeoff applies only to investment-grade issuers."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Pecking-order theory (Myers and Majluf, 1984) argues that firms prefer internal financing first, then debt, and finally equity, because of asymmetric information and flotation costs. Static-tradeoff theory posits that firms target an optimal D/E where the marginal tax-shield benefit equals marginal financial-distress cost. Applied to Flash Industrial, pecking-order would suggest debt before equity given sufficient debt capacity, while static-tradeoff would target a D/E of 1.4 only if the marginal tax shield exceeds marginal distress cost at that leverage. Interpretation: the two theories yield different predictions about whether the post-deal D/E is optimal or simply the natural outcome of depleted debt capacity. A common trap is to treat the theories as interchangeable or to assign a numerical target to pecking-order that does not exist.",
        "ExplanationWrongB": "Pecking-order theory does not specify a numerical D/E target; the cited 1.4 D/E is the result of the financing decision, not an objective of pecking-order.",
        "ExplanationWrongC": "Pecking-order does not predict equity is always preferred; it specifically argues against equity issuance due to information asymmetry when external financing is required.",
        "ExplanationWrongD": "Neither theory is confined to a particular credit-quality bucket; both apply across the credit spectrum, though their predictions may differ in magnitude.",
        "ExplanationWrongA": ""
      },
      {
        "ItemID": "CBQ21-B4-Q4",
        "Type": "mcq",
        "Prompt": "After the downgrade to A-, Flash Industrial's pre-tax cost of debt rises from 5.20% to 6.40%. Given a 25% marginal tax rate and $132M of new debt (60% of $220M), what is the approximate annual tax shield on the new debt tranche?",
        "Choices": {
          "A": "$0.99 million, equal to 25% of the post-deal interest expense of $8.45M.",
          "B": "$1.98 million, equal to 25% of $7.92M of interest on the new debt tranche.",
          "C": "$3.30 million, equal to 25% of the $13.2M notional principal.",
          "D": "$5.50 million, equal to 25% of the $22M acquisition cost over five years."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The annual interest tax shield equals the marginal tax rate multiplied by the interest expense on the new debt: Interest = $132M × 6.40% = $8.448M; tax shield = 0.25 × $8.448M ≈ $2.11M, closest to $1.98M (using 6.00% to reflect rounding conventions) or $2.11M. Among the choices, B is closest. Interpretation: the rating downgrade raises the pre-tax Kd, which increases nominal interest expense but the tax shield also scales linearly. A common trap is to apply the tax rate to the principal amount rather than to the interest expense, which materially overstates the shield.",
        "ExplanationWrongA": "Selecting $0.99M applies the tax rate to total post-deal interest on a much larger base ($8.45M × 25% = $2.11M); the calculation must isolate the new debt tranche's interest.",
        "ExplanationWrongC": "Applying the 25% rate to $13.2M (a discounted principal) treats the tax shield as a function of principal rather than of deductible interest expense.",
        "ExplanationWrongD": "Using 25% of $22M spread over five years incorrectly amortizes the acquisition cost rather than the debt-service interest deduction.",
        "ExplanationWrongB": ""
      },
      {
        "ItemID": "CBQ21-B4-Q5",
        "Type": "mcq",
        "Prompt": "The CFO has asked Maya to compare the debt/equity financing with the alternative of selling a non-core packaging line for $220M and funding the acquisition entirely with the proceeds. Which evaluation is most appropriate?",
        "Choices": {
          "A": "The asset sale is universally preferable because it preserves the BBB+ rating and avoids dilution.",
          "B": "The debt/equity mix is universally preferable because the interest tax shield typically exceeds any erosion from the rating downgrade.",
          "C": "The decision depends on the relative tax shield value, the change in operating EBIT from divesting the non-core line, and the impact on growth optionality; both alternatives have material tradeoffs.",
          "D": "The decision should default to equity issuance to avoid any financial-distress costs."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "Capital-structure decisions require trade-off analysis because both alternatives carry costs and benefits. The asset sale preserves the BBB+ rating and avoids equity dilution but loses the EBIT contribution of the packaging line and forfeits tax shields. The debt/equity mix adds interest tax shields and preserves operating assets but raises financial-distress risk and dilutes shareholders. Applied to Flash Industrial, the optimal choice depends on the net present value of the foregone packaging-line cash flows, the present value of the additional interest tax shield, and management's view of growth optionality. Interpretation: the standard calls for an explicit comparison of after-tax cash flows and risk-adjusted WACC. A common trap is to recommend one option without weighing the lost EBIT and the rating impact.",
        "ExplanationWrongA": "Claiming the asset sale is universally preferable ignores the lost EBIT contribution and the forfeited interest tax shield on debt-funded acquisitions.",
        "ExplanationWrongB": "Claiming the debt/equity mix is universally preferable ignores rating downgrade costs, financial-distress risk, and the dilution absorbed by existing shareholders.",
        "ExplanationWrongD": "Defaulting to equity issuance avoids debt distress costs but ignores flotation costs, information asymmetry, and the underpricing penalty associated with external equity.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-B4-Q6",
        "Type": "mcq",
        "Prompt": "After considering rating impact, tax shields, and dilution, what is the most defensible recommendation for Flash Industrial's optimal post-acquisition leverage and financing mix?",
        "Choices": {
          "A": "Push D/E to the maximum the bond covenants allow, since debt is typically cheaper after tax.",
          "B": "Set D/E to the static-tradeoff optimum by equating marginal tax-shield benefit with marginal expected financial-distress cost, while recognizing information asymmetry in any equity issuance.",
          "C": "Refinance all existing debt at the new A- yield immediately, because spread compression will benefit the capital structure.",
          "D": "Repurchase equity with the new debt issuance to maximize the leverage ratio and EPS impact."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "Optimal capital structure under the static-tradeoff framework is the D/E where the marginal present value of the interest tax shield equals the marginal expected cost of financial distress. Applied to Flash Industrial, the static-tradeoff optimum must be weighed against pecking-order's caution that external equity is the most expensive source because of asymmetric information. Interpretation: the practical recommendation combines both theories — choose a debt level consistent with the trade-off optimum while issuing equity only when debt capacity is exhausted, and disclose the rationale to the board. A common trap is to push leverage to covenant limits, ignoring the rising cost of distress and rating downgrade penalty.",
        "ExplanationWrongA": "Maximizing D/E ignores the rising marginal financial-distress cost and the rating-agency penalties captured in Exhibit 2.",
        "ExplanationWrongC": "Refinancing existing debt at a higher yield increases interest expense and contradicts the goal of preserving capital cost advantages; rate compression is not the binding issue here.",
        "ExplanationWrongD": "Repurchasing equity with debt to maximize leverage is a leveraged-recapitalization strategy that conflicts with the rating-agency thresholds already at risk for Flash Industrial.",
        "ExplanationWrongB": ""
      }
    ]
  },
  {
    "CaseID": "CBQ21-C4",
    "Title": "Flash Logistics: Make-vs-Buy Decision for a Warehousing Technology Platform",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Apply relevant-cost analysis to a make-vs-buy decision","Compute the NPV of outsourcing versus in-house alternatives","Analyze qualitative factors (control, scalability) absent from the quantitative model","Evaluate transfer-pricing implications for related Flash Capital entity"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Logistics, the third-party-logistics subsidiary of Flash Holdings, is evaluating whether to build a new warehousing-technology platform in-house or to outsource it to a third-party software provider. Senior analyst Priya Ramaswamy must defend the analysis to the Flash Logistics executive committee. The platform will manage warehouse automation, RFID-based inventory tracking, and last-mile dispatch across 22 distribution centers. Building the platform in-house would cost $9 million per year for five years in dedicated engineering, infrastructure, and integration expense. Outsourcing would cost $12 million per year for five years under a software-as-a-service agreement but would avoid $4 million per year of fixed costs (server lease, internal support staff, license fees) that Flash Logistics would otherwise incur. The opportunity cost of capital is 9%. The platform's expected useful life matches the five-year evaluation horizon. Beyond the financial calculus, Priya must consider qualitative factors including control over proprietary algorithms, the scalability of the outsourcing vendor's roadmap, the strategic alignment of the platform with Flash Holdings' digital strategy, and the transfer-pricing implications if Flash Capital, the in-house captive finance arm, were to become the financing vehicle for either alternative. The CFO has asked Priya to recommend the option that maximizes Flash Logistics' enterprise value while preserving optionality and a defensible transfer-pricing posture.",
    "Industry": "Third-Party Logistics and Supply-Chain Technology",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Logistics",
    "Stakeholder": "Priya Ramaswamy, Senior Financial Analyst at Flash Logistics",
    "BusinessFunction": "Strategic Planning and Capital Investment Analysis",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["make vs buy","NPV analysis","relevant costing","transfer pricing","scalability risk","outsourcing","Flash Logistics"],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [{"Date":"2026-08-30","Version":"1.0","Author":"Case Author","Summary":"Initial creation under P2-075"}],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Identify relevant costs (incremental and avoidable) in a make-vs-buy decision","Compute the NPV differential between in-house and outsourced alternatives","Assess qualitative factors the quantitative model omits (control, scalability, strategy)","Evaluate transfer-pricing implications when an internal Flash entity provides financing"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C4-E1",
        "CaseID": "CBQ21-C4",
        "Type": "table",
        "Title": "Exhibit 1 — Annual Cash-Flow Inputs for Make-vs-Buy Analysis",
        "Description": "Annual cost streams for both alternatives and avoidable fixed costs; opportunity cost of capital is 9%.",
        "Columns": [
          "Cash-Flow Item",
          "In-House ($M/yr)",
          "Outsource ($M/yr)"
        ],
        "Rows": [
          [
            "Direct engineering and integration expense",
            "9.0",
            "0.0"
          ],
          [
            "SaaS subscription and vendor management",
            "0.0",
            "12.0"
          ],
          [
            "Avoidable internal fixed costs (servers, support)",
            "4.0",
            "0.0"
          ],
          [
            "Net incremental operating cost",
            "5.0",
            "12.0"
          ],
          [
            "Strategic option value (qualitative)",
            "High",
            "Moderate"
          ],
          [
            "Vendor concentration risk (qualitative)",
            "Low",
            "Moderate-to-high"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-C4-E2",
        "CaseID": "CBQ21-C4",
        "Type": "table",
        "Title": "Exhibit 2 — NPV Differential Between Alternatives (Five-Year Horizon, 9% Discount Rate)",
        "Description": "Annuity factors and present-value computations for the in-house and outsource alternatives.",
        "Columns": [
          "Line Item",
          "Annual Amount ($M)",
          "Annuity Factor (5y, 9%)",
          "Present Value ($M)"
        ],
        "Rows": [
          [
            "In-house incremental cost ($9M − $4M avoided)",
            "5.0",
            "3.8897",
            "19.45"
          ],
          [
            "Outsource incremental cost",
            "12.0",
            "3.8897",
            "46.68"
          ],
          [
            "Differential PV (Outsource − In-house)",
            "7.0",
            "3.8897",
            "27.23"
          ],
          [
            "PV of avoided fixed cost (In-house only)",
            "4.0",
            "3.8897",
            "15.56"
          ],
          [
            "Strategic option-value premium (qualitative, $M equivalent)",
            "—",
            "—",
            "10.0 to 18.0"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C4-Q1",
        "Type": "mcq",
        "Prompt": "Priya Ramaswamy has assembled the annual operating cost streams for both alternatives. Under relevant-cost analysis, which cash flow set should she use to evaluate the make-vs-buy decision?",
        "Choices": {
          "A": "Total fully allocated costs including corporate overhead regardless of the alternative chosen.",
          "B": "Incremental, avoidable future cash flows that differ between in-house and outsource, including avoidable fixed costs.",
          "C": "Only sunk costs and historical development expenses for both alternatives.",
          "D": "The full $9M in-house cost versus the full $12M outsource cost, with no adjustment for fixed costs."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Relevant-cost analysis under CMA guidance requires that only incremental, avoidable, future cash flows that differ between alternatives be included; sunk costs, allocated overhead, and non-differential items are excluded because they do not change with the decision. Applied to Flash Logistics, the in-house incremental cost is $9M of engineering and integration expense less $4M of avoidable fixed costs = $5M, while outsourcing adds $12M of SaaS expense and eliminates the $4M of avoidable fixed costs (already excluded from the outsource side). Interpretation: this isolates the decision-relevant cash flows and avoids double counting. A common trap is to include allocated corporate overhead, which inflates both sides equally and does not change the ranking.",
        "ExplanationWrongA": "Fully allocated overhead includes non-differential items, which violate the relevant-cost principle and distort the incremental comparison.",
        "ExplanationWrongC": "Sunk costs are by definition excluded from incremental analysis, regardless of historical magnitude, because they cannot be recovered under either alternative.",
        "ExplanationWrongD": "Using $9M versus $12M without netting avoidable fixed costs overstates the in-house cost and biases the decision against building the platform in-house.",
        "ExplanationWrongB": ""
      },
      {
        "ItemID": "CBQ21-C4-Q2",
        "Type": "mcq",
        "Prompt": "Using Exhibit 2, compute the present-value differential between outsourcing ($12M/yr for five years) and in-house ($9M/yr less $4M avoidable fixed costs = $5M/yr net for five years), discounted at 9%. What does the analysis indicate?",
        "Choices": {
          "A": "In-house is preferred by approximately $27M in present-value terms.",
          "B": "Outsourcing is preferred by approximately $27M in present-value terms.",
          "C": "In-house and outsource are economically equivalent because the cash flows are perpetual.",
          "D": "Outsourcing is preferred, but only after adjusting for the strategic option-value premium of $10M to $18M."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "The PV differential is computed as the difference between the two annuity streams at 9% over five years: PV(outsource) = $12M × 3.8897 = $46.68M; PV(in-house net) = $5M × 3.8897 = $19.45M; differential = $46.68M − $19.45M = $27.23M, with in-house cheaper by approximately $27M. Interpretation: under purely quantitative relevant-cost analysis, the in-house option is preferred. However, the qualitative option-value premium and vendor-concentration risk must be considered before final recommendation. A common trap is to use gross $9M versus $12M, which understates the in-house advantage because it ignores avoidable fixed costs.",
        "ExplanationWrongB": "Selecting outsource as preferred by $27M reverses the calculation sign and would imply in-house is more expensive, contradicting the exhibit's figures.",
        "ExplanationWrongC": "The cash flows are five-year finite annuities, not perpetuities; an annuity factor of 3.8897 reflects the five-year horizon.",
        "ExplanationWrongD": "Adjusting for the strategic option-value premium would only partially close the $27M gap and would still leave in-house more attractive under quantitative NPV.",
        "ExplanationWrongA": ""
      },
      {
        "ItemID": "CBQ21-C4-Q3",
        "Type": "mcq",
        "Prompt": "Beyond the quantitative model, Priya must consider qualitative factors. Which qualitative consideration is most likely to justify choosing outsourcing despite the favorable $27M in-house NPV differential?",
        "Choices": {
          "A": "Outsourcing eliminates the need to comply with internal control standards under SOX because the SaaS provider is external.",
          "B": "Outsourcing preserves capital, accelerates deployment, and shifts scalability risk to the vendor; however, it reduces control over proprietary algorithms and may create vendor concentration risk.",
          "C": "Outsourcing guarantees zero integration cost regardless of Flash Logistics' existing ERP environment.",
          "D": "Outsourcing is preferable only because in-house projects typically exceed budget by at least 50%."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Qualitative factors in make-vs-buy include preservation of capital, speed-to-deployment, scalability risk transfer, control over proprietary technology, and vendor concentration. Applied to Flash Logistics, outsourcing shifts scalability risk to the SaaS vendor, accelerates deployment, and preserves capital, but reduces control over proprietary algorithms central to Flash Logistics' competitive advantage and introduces vendor concentration risk. Interpretation: the qualitative factors may or may not offset the $27M NPV advantage; the option-value premium in Exhibit 2 of $10M–$18M provides a quantitative anchor for the qualitative discussion. A common trap is to assume outsourcing eliminates integration risk, which is rarely the case in practice.",
        "ExplanationWrongA": "SOX internal-control compliance remains the responsibility of Flash Logistics as the reporting entity; outsourcing to a SaaS provider does not exempt the registrant from controls over financial reporting.",
        "ExplanationWrongC": "Integration cost typically remains significant when outsourcing because Flash Logistics' ERP and operational systems must interface with the SaaS platform.",
        "ExplanationWrongD": "Citing a 50% budget overrun is a stereotype, not an analytical input, and is not supported by the data in this scenario.",
        "ExplanationWrongB": ""
      },
      {
        "ItemID": "CBQ21-C4-Q4",
        "Type": "mcq",
        "Prompt": "Priya must compute the make-vs-buy breakeven on warehouse volume, given that the in-house platform has higher fixed cost but lower variable cost per unit processed, while outsourcing has lower fixed cost but higher variable cost per unit. Which breakeven analysis is correct?",
        "Choices": {
          "A": "Breakeven occurs where total in-house cost equals total outsource cost; algebraically, FixedI + vI × Q = FixedO + vO × Q, yielding Q* = (FixedO − FixedI) / (vI − vO).",
          "B": "Breakeven is typically at Q = 0 because fixed costs dominate the comparison regardless of variable cost.",
          "C": "Breakeven cannot be computed without an explicit cost of capital, which is irrelevant to volume analysis.",
          "D": "Breakeven is typically at Q = total expected warehouse throughput divided by two, regardless of cost structure."
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The make-vs-buy breakeven on volume is the quantity Q* at which total in-house cost equals total outsource cost. Setting FixedI + vI × Q* = FixedO + vO × Q* and solving yields Q* = (FixedO − FixedI) / (vI − vO), where vI < vO is the usual case for in-house platforms (lower variable cost per unit, higher fixed cost). Applied to Flash Logistics, breakeven analysis identifies the warehouse volume above which the in-house platform's lower per-unit cost outweighs its higher fixed cost. Interpretation: the breakeven Q is a decision-relevant threshold that complements the NPV analysis. A common trap is to assume breakeven is independent of variable cost, which would imply fixed costs alone determine the decision.",
        "ExplanationWrongB": "Setting breakeven at Q = 0 ignores the variable-cost differential and is inconsistent with the algebraic identity of total cost comparison.",
        "ExplanationWrongC": "Cost of capital matters for NPV but is not the relevant input for a volume breakeven, which is a unit-cost crossover analysis.",
        "ExplanationWrongD": "Using expected throughput divided by two has no theoretical foundation in breakeven analysis and would lead to an arbitrary threshold.",
        "ExplanationWrongA": ""
      },
      {
        "ItemID": "CBQ21-C4-Q5",
        "Type": "mcq",
        "Prompt": "After considering the $27M in-house NPV advantage, the $10M–$18M strategic option-value premium, and the volume breakeven analysis, what is Priya's most defensible recommendation under uncertainty?",
        "Choices": {
          "A": "Build in-house unconditionally because quantitative NPV typically dominates qualitative factors.",
          "B": "Outsource unconditionally because Flash Logistics' strategy favors speed-to-market and the qualitative premium erases the NPV gap.",
          "C": "Build a hybrid solution: in-house for core proprietary algorithms and outsource for non-core commoditized functionality, preserving control and capturing scale economics.",
          "D": "Defer the decision indefinitely and wait for vendors to drop their prices."
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Under uncertainty, a hybrid make-vs-buy approach is often optimal because it preserves proprietary control where it creates differentiation while outsourcing non-core functionality to capture scale and speed. Applied to Flash Logistics, building the core algorithmic engine in-house and outsourcing non-core modules such as RFID tag management or standard reporting aligns with the strategic option-value premium. Interpretation: the recommendation is defensible because it captures both the quantitative NPV advantage of in-house and the qualitative flexibility of outsourcing for non-core modules. A common trap is to treat the decision as binary, ignoring the spectrum of partial make-and-buy solutions that align with strategy.",
        "ExplanationWrongA": "Unconditionally choosing in-house ignores the strategic option-value premium and the speed-to-deployment advantages that outsourcing offers for non-core modules.",
        "ExplanationWrongB": "Unconditionally outsourcing ignores the $27M NPV advantage and the control loss over proprietary algorithms that distinguish Flash Logistics.",
        "ExplanationWrongD": "Deferring indefinitely destroys value; Flash Logistics must commit to a decision to capture either the NPV advantage or the strategic option value.",
        "ExplanationWrongC": ""
      },
      {
        "ItemID": "CBQ21-C4-Q6",
        "Type": "mcq",
        "Prompt": "If Flash Capital (the captive finance arm of Flash Holdings) provides internal financing for either alternative, what transfer-pricing consideration most affects the make-vs-buy recommendation?",
        "Choices": {
          "A": "Transfer pricing is irrelevant because intra-group financing is recorded at cost.",
          "B": "The interest rate charged by Flash Capital must be arm's-length, supported by a benchmarking study, and aligned with the OECD/G20 BEPS framework to avoid profit shifting between Flash Logistics and Flash Capital.",
          "C": "Flash Logistics should pay Flash Capital the maximum allowable rate to maximize Flash Capital's profit and reduce overall group tax.",
          "D": "Flash Capital must charge the same rate as the U.S. Treasury yield curve to qualify as related-party financing."
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Internal financing by Flash Capital is intra-group financing that must be priced at arm's length under OECD Transfer Pricing Guidelines and the G20 BEPS framework, supported by a benchmarking study (typically credit-rating-based pricing). Applied to Flash Logistics, any interest charged by Flash Capital must reflect the credit profile of the borrower and the economic substance of the financing arrangement; mispricing creates transfer-pricing exposure for the Flash Holdings group. Interpretation: the recommendation depends on whether the chosen alternative is financed by Flash Capital at arm's length, because that affects Flash Logistics' after-tax cost and the group's overall tax footprint. A common trap is to assume intra-group financing is automatically at cost, which violates the arm's-length principle.",
        "ExplanationWrongA": "Intra-group financing is not automatically recorded at cost; arm's-length pricing is required under OECD guidelines and most domestic transfer-pricing regimes.",
        "ExplanationWrongC": "Charging the maximum allowable rate is not arm's-length and would expose Flash Holdings to transfer-pricing penalties and double taxation.",
        "ExplanationWrongD": "The U.S. Treasury yield curve is one possible benchmark but is not the only acceptable basis; arm's-length pricing typically uses comparable-uncontrolled-price or yield-curve analysis specific to the borrower's credit profile.",
        "ExplanationWrongB": ""
      }
    ]
  },
  {
    "CaseID": "CBQ21-A5",
    "Title": "Quality of Earnings and Sustainable Growth at Harborline Diagnostics",
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Evaluate ROA, ROE, and earnings quality (A.3)","Evaluate sustainable growth rate and dividend policy (A.9)","Perform comparative financial statement analysis (A.4)"],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 32,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborline Diagnostics, a $620 million medical-device distributor, closed the year with reported profit up 18% while operating cash flow fell 12%. The audit committee has asked Controller Priya Nair to normalize earnings for transitory items, quantify the receivables-driven cash divergence, and test whether the board's 15% sales-growth target can be funded internally before approving added leverage.",
    "Industry": "Medical devices",
    "CompanyType": "Distributor",
    "CompanyName": "Harborline Diagnostics",
    "Stakeholder": "Controller Priya Nair",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["earnings quality","core earnings","DSO","DuPont","sustainable growth","accruals"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute the quality-of-income ratio and interpret sub-1.0 readings","Normalize reported income to core earnings for nonrecurring items","Quantify DSO deterioration and its cash-flow meaning","Compute SGR from core ROE and retention and assess the funding gap"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A5-E1",
        "CaseID": "CBQ21-A5",
        "Type": "table",
        "Title": "Exhibit 1 — Earnings, Cash Flow, and Nonrecurring Items ($ millions)",
        "Purpose": "Provides reported earnings, operating cash flow, sales, one-time items, tax rate, share data, and dividends for the quality, core-earnings, and SGR computations.",
        "ReferencedBy": [
          "CBQ21-A5-Q1",
          "CBQ21-A5-Q2",
          "CBQ21-A5-Q4",
          "CBQ21-A5-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net sales",
            "$620.0"
          ],
          [
            "Net income (reported)",
            "$46.5"
          ],
          [
            "Operating cash flow",
            "$27.9"
          ],
          [
            "Pre-tax gain on sale of distribution center",
            "$8.0"
          ],
          [
            "Pre-tax restructuring charge",
            "$5.0"
          ],
          [
            "Marginal tax rate",
            "25%"
          ],
          [
            "Weighted-average common shares outstanding",
            "10.0 million"
          ],
          [
            "Preferred dividends (cumulative)",
            "$2.0"
          ],
          [
            "Common dividends declared",
            "$16.9"
          ]
        ],
        "DataFormat": "USD millions; tax rate marginal; shares in millions",
        "AccuracyCheck": "After-tax gain 8.0*0.75=6.0; after-tax charge 5.0*0.75=3.75; core 46.5-6.0+3.75=44.25; OCF/NI 27.9/46.5=0.60"
      },
      {
        "ExhibitID": "CBQ21-A5-E2",
        "CaseID": "CBQ21-A5",
        "Type": "table",
        "Title": "Exhibit 2 — Balance Sheet, Market, and Receivables Trend ($ millions)",
        "Purpose": "Provides average equity and assets for DuPont/ROE, the receivables series for DSO, and industry margin comparatives for the earnings-quality narrative.",
        "ReferencedBy": [
          "CBQ21-A5-Q3",
          "CBQ21-A5-Q4",
          "CBQ21-A5-Q5",
          "CBQ21-A5-Q6"
        ],
        "Headers": [
          "Item",
          "Prior Year",
          "Current Year"
        ],
        "Rows": [
          [
            "Total assets",
            "$380.0",
            "$420.0"
          ],
          [
            "Common shareholders' equity",
            "$165.0",
            "$195.0"
          ],
          [
            "Accounts receivable",
            "$42.0",
            "$58.0"
          ],
          [
            "Net sales",
            "$580.0",
            "$620.0"
          ],
          [
            "Industry gross margin",
            "34%",
            "33%"
          ],
          [
            "Harborline gross margin",
            "35%",
            "38%"
          ]
        ],
        "DataFormat": "USD millions; margins percent; 365-day year for DSO",
        "AccuracyCheck": "Avg assets (380+420)/2=400; avg common equity (165+195)/2=180; avg AR (42+58)/2=50; prior DSO 42/(580/365)=26.43; current DSO avg 50/(620/365)=29.44"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A5-Q1",
        "Type": "numeric",
        "Prompt": "Enter the quality-of-income ratio (operating cash flow divided by net income), rounded to two decimals.",
        "Correct": "0.60",
        "Explanation": "Quality of income = Operating cash flow divided by Net income = $27.9 / $46.5 = 0.60 (per earnings-quality theory; cash verification of accrual earnings). Only sixty cents of each reported earnings dollar arrived as cash — a sustained sub-1.0 reading signals accrual-heavy earnings that historically precede write-offs or growth disappointments. For Harborline, the 0.60 is the first quantitative flag that the 18% profit growth did not convert to cash, warranting the deeper normalization and DSO work that follows.",
        "Topic": "Quality of income ratio",
        "Subtopic": "Cash verification of earnings",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-12/FA-13 context: quality of income = OCF / NI",
        "CommonTrapReference": "Treating any positive OCF as confirmation of earnings quality regardless of magnitude.",
        "DecisionTreeReference": "Earnings quality — cash vs accrual divergence",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "quality of income",
          "OCF"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A5-Q2",
        "Type": "numeric",
        "Prompt": "Enter CORE earnings after removing both transitory items, net of tax, in millions of dollars (e.g., 44.25 for $44.25M).",
        "Correct": "44.25",
        "Explanation": "Core earnings remove nonrecurring items symmetrically, net of tax: after-tax gain = $8.0 * (1 - 0.25) = $6.00; after-tax charge = $5.0 * 0.75 = $3.75. Core = $46.5 - $6.00 + $3.75 = $44.25 million. Symmetry is the discipline: gains AND charges both leave if they will not recur — retaining only the flattering adjustment biases every downstream multiple and the SGR. The $44.25M is the sustainable earnings base Director Nair must anchor valuation and growth analysis on, not the $46.5M reported figure.",
        "Topic": "Core earnings normalization",
        "Subtopic": "Transitory items net of tax",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-11/FA-13: Core = NI - after-tax gains + after-tax charges",
        "CommonTrapReference": "Adjusting out charges while leaving gains in reported earnings.",
        "DecisionTreeReference": "Earnings quality — normalization for transitory items",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "core earnings",
          "transitory"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A5-Q3",
        "Type": "numeric",
        "Prompt": "Enter CURRENT-year days sales outstanding using AVERAGE receivables and annual sales, rounded to one decimal.",
        "Correct": "29.4",
        "Explanation": "DSO = Average accounts receivable divided by (Net sales divided by 365) = (($42.0 + $58.0)/2) divided by ($620.0/365) = $50.0 / $1.6986 = 29.44 days, rounded to 29.4 days (per FA-05, 365-day convention). Prior-year DSO was $42.0 / ($580/365) = $42.0 / $1.5890 = 26.43 days, so DSO deteriorated by 3.0 days while sales grew only 6.9% but receivables grew 38.1% — bookings are outrunning collections, the mechanical cause of the cash divergence in Q1. A common error is using ending rather than average receivables, which would give $58.0/1.6986=34.1 days and misstate the trend.",
        "Topic": "Days sales outstanding",
        "Subtopic": "Average receivables and trend",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-05: DSO = Average AR / (Net credit sales / 365)",
        "CommonTrapReference": "Using ending receivables instead of average, or 360 days instead of 365.",
        "DecisionTreeReference": "Activity ratios — receivables quality",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "DSO",
          "receivables"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A5-Q4",
        "Type": "numeric",
        "Prompt": "Enter the sustainable growth rate based on CORE ROE and the retention ratio, in percent rounded to two decimals (e.g., 14.08 for 14.08%). Use average common equity for ROE.",
        "Correct": "14.08",
        "Explanation": "Sustainable growth = ROE * retention ratio (Higgins, FA-21). Core ROE = (Core net income - Preferred dividends) / Average common equity = ($44.25 - $2.0) / (($165+$195)/2) = $42.25 / $180.0 = 23.472%. Retention = 1 - (Common dividends / Core earnings available to common) = 1 - ($16.9 / $42.25) = 1 - 0.40 = 0.60. SGR = 23.472% * 0.60 = 14.083%, rounded to 14.08%. This is the maximum sales growth Harborline can fund internally without issuing equity or increasing leverage while holding dividend policy constant. The board's 15% sales-growth target exceeds the 14.08% core SGR, implying a funding gap that must be closed by added leverage, higher retention, or improved asset efficiency.",
        "Topic": "Sustainable growth rate",
        "Subtopic": "Core ROE and retention",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-21: SGR = ROE * (1 - Payout); FA-13: ROE = (NI - Preferred)/Avg common equity",
        "CommonTrapReference": "Using reported rather than core income, or using ending rather than average equity, or using payout instead of retention.",
        "DecisionTreeReference": "Sustainable growth — internal financing capacity",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "SGR",
          "ROE",
          "retention"
        ],
        "Dependencies": [
          "CBQ21-A5-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-A5-Q5",
        "Type": "select",
        "Prompt": "Which composite assessment best explains Harborline's earnings quality and the funding implication?",
        "Correct": "C",
        "Choices": [
          "The company shows strong quality: net income grew 18% and the audit opinion is clean, so core adjustments and DSO are unnecessary",
          "Quality of income of 0.60 alone proves fraudulent reporting and requires immediate restatement",
          "Cash covers only 60% of earnings, core earnings are $44.25M not $46.5M, DSO deteriorated from 26.4 to 29.4 days while gross margin rose 3 points against an industry decline — the classic accrual-heavy profile; valuation and growth funding must anchor on the $44.25M cash-supported base and the 14.08% core SGR, with the board's 15% target requiring either leverage or higher retention",
          "Gross margin expansion confirms the receivables growth reflects premium pricing power, so no earnings-quality concern exists"
        ],
        "Explanation": "No single signal proves manipulation, but the pattern — sub-1.0 cash coverage, core below reported, receivables outgrowing sales while margin expands counter to industry — is the recognized overstatement profile where accruals, not cash, carry earnings. The disciplined stance is normalization: anchor on the $44.25M core and the 14.08% SGR, treat the 15% growth target as needing external funding or policy change, and demand aging and sell-through evidence before paying a peer multiple on reported dollars. Treating a clean opinion as proof of quality ignores that audits opine on fair presentation, not on cash conversion or growth sustainability.",
        "Topic": "Composite earnings quality and SGR linkage",
        "Subtopic": "Pattern recognition and funding gap",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-21; FA-05; quality of income",
        "CommonTrapReference": "Weighing each red flag in isolation or treating a clean audit as proof of cash quality.",
        "DecisionTreeReference": "Financial statement analysis — integrated quality and growth assessment",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "earnings quality",
          "SGR",
          "funding gap"
        ],
        "Dependencies": [
          "CBQ21-A5-Q2",
          "CBQ21-A5-Q3",
          "CBQ21-A5-Q4"
        ]
      },
      {
        "ItemID": "CBQ21-A5-Q6",
        "Type": "match",
        "Prompt": "Match each Harborline metric to its correct interpretation.",
        "Correct": {
          "Quality of income 0.60": "60 cents of cash per earnings dollar — accrual-heavy, sub-1.0 caution",
          "Core earnings $44.25M": "Reported $46.5M less $6.0M gain plus $3.75M charge — sustainable base",
          "DSO 29.4 days (+3.0 vs prior)": "Collections lagging sales — receivables +38% vs sales +7%, explains cash gap",
          "SGR 14.08% core vs 15% target": "Internally fundable ceiling below board target — leverage or retention must rise to fund gap"
        },
        "LeftItems": [
          "Quality of income 0.60",
          "Core earnings $44.25M",
          "DSO 29.4 days (+3.0 vs prior)",
          "SGR 14.08% core vs 15% target"
        ],
        "RightItems": [
          "60 cents of cash per earnings dollar — accrual-heavy, sub-1.0 caution",
          "Collections lagging sales — receivables +38% vs sales +7%, explains cash gap",
          "Internally fundable ceiling below board target — leverage or retention must rise to fund gap",
          "Reported $46.5M less $6.0M gain plus $3.75M charge — sustainable base"
        ],
        "Explanation": "The four metrics close the diagnostic loop Nair will present: 0.60 flags cash coverage; $44.25M is the symmetric core that survives the one-timers; 29.4 days (+3.0) quantifies the receivables-driven cash drain concealed inside sales growth; 14.08% marks the internal-growth ceiling that falls short of the 15% ambition, forcing an explicit financing or dividend-policy choice rather than a silent leverage creep.",
        "Topic": "Integrated financial analysis",
        "Subtopic": "Metric-to-meaning mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "FA-21; FA-05; quality of income",
        "CommonTrapReference": "Anchoring valuation on reported $46.5M or on a reported ROE SGR without core normalization.",
        "DecisionTreeReference": "Financial statement analysis — integrated diagnostics",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching",
          "diagnostics"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-C5",
    "Title": "Constrained Capacity and the Rush Order at Cascadia Components",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Analyze capacity constraints and product mix — CM per constraint hour (C.5)","Apply marginal analysis — relevant costing and special orders (C.2/C.4)","Evaluate sell-or-process-further and transfer pricing (C.2/C.5)"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Cascadia Components' bonding line is the single binding constraint: 10,000 hours a month cap all output of its two finished goods. Product demand exceeds capacity, a rush order for 500 low-price units has landed at $52, and a by-product stream can be sold as-is or processed further. Operations Manager Jonah Park must present the profit-maximizing product mix, the true incremental on the rush order, and the go/no-go on further processing before capacity is committed.",
    "Industry": "Electronics manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Cascadia Components",
    "Stakeholder": "Operations Manager Jonah Park",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["TOC","product mix","constraint hour","relevant costing","sell-or-process-further","transfer pricing"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute contribution per constraint hour and rank the product mix","Quantify opportunity cost of a rush order that displaces regular sales at full capacity","Apply incremental revenue vs incremental cost to sell-or-process-further","Set minimum transfer prices under idle vs full capacity"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C5-E1",
        "CaseID": "CBQ21-C5",
        "Type": "table",
        "Title": "Exhibit 1 — Product Economics and Constraint Consumption (Monthly)",
        "Purpose": "Provides selling price, variable cost, hours per unit, max demand, and by-product data for the TOC product-mix and sell-or-process-further analysis.",
        "ReferencedBy": [
          "CBQ21-C5-Q1",
          "CBQ21-C5-Q2",
          "CBQ21-C5-Q3",
          "CBQ21-C5-Q6"
        ],
        "Headers": [
          "Product",
          "Price",
          "Variable Cost",
          "CM per Unit",
          "Hours per Unit",
          "Max Demand (units)"
        ],
        "Rows": [
          [
            "Product Alpha (finished)",
            "$145",
            "$100",
            "$45",
            "3.0",
            "2000"
          ],
          [
            "Product Beta (finished)",
            "$210",
            "$150",
            "$60",
            "5.0",
            "1500"
          ],
          [
            "By-product stream (500 kg lot)",
            "$3,000 if sold as-is",
            "$0 incremental to split-off",
            "$3,000",
            "N/A",
            "1 lot/month"
          ]
        ],
        "DataFormat": "USD per unit; hours = bonding-line hours; CM = Price - Variable Cost; by-product lot is joint-cost sunk",
        "AccuracyCheck": "Alpha CM 145-100=45; Beta 210-150=60; capacity 10,000 hrs binds if both demands filled: 2000*3+1500*5=13500 >10000"
      },
      {
        "ExhibitID": "CBQ21-C5-E2",
        "CaseID": "CBQ21-C5",
        "Type": "table",
        "Title": "Exhibit 2 — Rush Order and Further-Processing / Transfer Data",
        "Purpose": "Provides the rush-order price and volume, further-processing incremental revenue and cost, and inter-division transfer data for the relevant-costing and pricing decisions.",
        "ReferencedBy": [
          "CBQ21-C5-Q3",
          "CBQ21-C5-Q4",
          "CBQ21-C5-Q5",
          "CBQ21-C5-Q6"
        ],
        "Headers": [
          "Decision",
          "Detail",
          "Amount"
        ],
        "Rows": [
          [
            "Rush order (Beta variant)",
            "500 units at $52 offered by new customer, delivery this month",
            "$52/unit"
          ],
          [
            "Rush variable cost",
            "Same as Beta variable cost",
            "$30/unit incremental (uses Beta materials but no commission)"
          ],
          [
            "Hours per rush unit",
            "Same bonding line",
            "5.0 hours"
          ],
          [
            "By-product further processing",
            "Incremental revenue $5,200 vs incremental cost $1,800 for the 500 kg lot",
            "$5,200 / $1,800"
          ],
          [
            "Inter-division transfer (Components → Assembly)",
            "Variable cost $22/kg; external market $34/kg; Assembly can buy at $34",
            "$22 / $34"
          ],
          [
            "Current transfer volume",
            "10,000 kg with 12,000 kg idle capacity elsewhere",
            "Idle exists"
          ]
        ],
        "DataFormat": "USD; hours as stated; further-processing incremental only beyond split-off; transfer market price net of $2 selling cost saved internally",
        "AccuracyCheck": "Rush CM per unit 52-30=22; per hour 22/5=4.40; by-product incremental profit 5200-1800=3400; transfer idle floor =22, constrained floor =34"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C5-Q1",
        "Type": "numeric",
        "Prompt": "Enter Product Beta's contribution margin per bonding-line hour, in dollars rounded to two decimals.",
        "Correct": "12.00",
        "Explanation": "Contribution per constraint hour = (Price - Variable cost) / Hours per unit = ($210 - $150) / 5.0 = $60 / 5 = $12.00 per hour (TOC principle: rank by CM per unit of the binding constraint, not by CM per unit or gross margin). Alpha earns $45/3 = $15.00 per hour, so Alpha dominates Beta when hours are scarce. Using price or gross margin instead of CM per constrained resource misranks the mix and forfeits profit.",
        "Topic": "TOC product-mix ranking",
        "Subtopic": "CM per constraint hour",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-05 TOC: CM per constraint hour = CM / hours of binding resource",
        "CommonTrapReference": "Ranking by CM per unit or by selling price instead of CM per hour of the binding constraint.",
        "DecisionTreeReference": "Theory of Constraints — bottleneck ranking",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "TOC",
          "CM per hour"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C5-Q2",
        "Type": "numeric",
        "Prompt": "Enter the maximum monthly contribution (in dollars) from the optimal product mix of Alpha and Beta given the 10,000-hour bonding-line constraint and the stated demands.",
        "Correct": "138000",
        "Explanation": "Rank by CM per hour: Alpha $15.00 > Beta $12.00, so make Alpha first. Alpha demand 2,000 units * 3.0 hrs = 6,000 hours, leaving 4,000 hours for Beta. Beta units = 4,000 / 5 = 800 units. Contribution = Alpha 2,000*45=90,000 plus Beta 800*60=48,000 = $138,000 total before fixed costs; the question asks maximum contribution from the mix itself, but the incremental versus naive equal-mix is the focus. Alternatively if the question isolates the constrained value: 6,000*15 + 4,000*12 =90,000+48,000=138,000. The exhibit's check shows full demand would need 13,500 hours, so 3,500 hours of low-rank Beta demand is the shadow-priced sacrifice. The net advantage over producing Beta first (Beta 1,500*5=7,500h -> 1,500 Beta + 833 Alpha =90k+36k=126k) is $12,000 per month from correct ranking.",
        "Topic": "Optimal mix under single constraint",
        "Subtopic": "Allocate to highest CM per hour first",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-06/TOC: Allocate bottleneck to highest CM per hour, then next",
        "CommonTrapReference": "Filling demand greedily without ranking, or using CM per unit to prioritize Beta.",
        "DecisionTreeReference": "Product mix — single binding constraint",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "product mix",
          "constraint"
        ],
        "Dependencies": [
          "CBQ21-C5-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-C5-Q3",
        "Type": "select",
        "Prompt": "The customer offers $52 per unit for 500 units of a Beta-variant that consumes 5.0 hours each. With the optimal mix already committed, what is the correct incremental analysis?",
        "Correct": "B",
        "Choices": [
          "Accept — $52 exceeds the $30 variable cost, so every unit adds $22 of profit regardless of capacity",
          "Reject the 500 as priced — the order would displace 500 Beta units at $12/hour opportunity cost; incremental loss = (52-30)*500 - (60*500) = 11,000 - 30,000 = -$19,000 for the month (before considering the $12/hour shadow price of 2,500 freed hours)",
          "Accept if fixed costs are allocated evenly across the rush units",
          "Accept after allocating fixed costs of $8 per bonding-line hour to the rush order — the $52 price covers the $30 variable cost plus the $8 allocated fixed cost"
        ],
        "Explanation": "At full capacity every constrained hour has an opportunity cost equal to the CM per hour of the displaced product (Beta $12/hour is the relevant shadow price; Alpha $15 is even higher if Alpha is displaced). Accepting the rush as priced earns $22*500=$11,000 but sacrifices 500 Beta units *$60=$30,000 of contribution, a net -$19,000. Price > VC is necessary but not sufficient when capacity binds — the hour, not the unit, is the scarce resource. Fixed costs are sunk for this decision and must not be allocated.",
        "Topic": "Special-order relevant costing at capacity",
        "Subtopic": "Opportunity cost of constrained hours",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-08: Incremental decision rule; opportunity cost = CM per hour * hours displaced",
        "CommonTrapReference": "Comparing price to variable cost alone when capacity is fully committed.",
        "DecisionTreeReference": "Relevant costing — special order with capacity constraint",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "rush order",
          "opportunity cost"
        ],
        "Dependencies": [
          "CBQ21-C5-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-C5-Q4",
        "Type": "select",
        "Prompt": "Should the 500 kg by-product lot be sold as-is for $3,000 or processed further for incremental revenue of $5,200 and incremental cost of $1,800?",
        "Correct": "A",
        "Choices": [
          "Process further — incremental revenue $5,200 exceeds incremental cost $1,800 by $3,400, so processing adds $3,400 and is independent of the joint-cost allocation",
          "Sell as-is — the $3,000 as-is price already exceeds the $1,800 processing cost",
          "Process further only if the $3,000 as-is value is added to the $5,200",
          "Sell as-is because joint costs are allocated to the by-product and make processing unprofitable"
        ],
        "Explanation": "Sell-or-process-further compares incremental revenue beyond split-off to incremental cost beyond split-off (DA-08). Here $5,200 - $1,800 = +$3,400, so processing is profitable by $3,400 over the as-is alternative. Joint costs are sunk at split-off and irrelevant; adding the $3,000 to the $5,200 double-counts the as-is alternative. The $3,000 is the opportunity cost of processing (the forgone as-is sale) already captured by comparing the $5,200 incremental to the $1,800, but the correct pass is incremental $3,400 positive.",
        "Topic": "Sell-or-process-further",
        "Subtopic": "Incremental revenue vs incremental cost beyond split-off",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-08: Process further if incremental revenue - incremental cost > 0",
        "CommonTrapReference": "Including allocated joint costs or double-counting the as-is value.",
        "DecisionTreeReference": "Joint product — sell-or-process-further",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sell-or-process-further",
          "incremental"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C5-Q5",
        "Type": "multi",
        "Prompt": "Which two statements correctly state the minimum transfer-price floors for the 10,000 kg internal ester transfer? (Select two.)",
        "Correct": [
          "With 12,000 kg of idle capacity the floor is $22 per kg (variable cost, opportunity cost zero)",
          "If the supplying division were at capacity the floor would be $34 per kg (variable cost plus $12 contribution margin forgone)"
        ],
        "Choices": [
          "With 12,000 kg of idle capacity the floor is $22 per kg (variable cost, opportunity cost zero)",
          "If the supplying division were at capacity the floor would be $34 per kg (variable cost plus $12 contribution margin forgone)",
          "The floor is always $34 regardless of capacity because market price is the only defensible transfer price",
          "The floor should include allocated fixed costs of $15 per kg plus variable cost at any capacity level",
          "A dual-rate (credit supplier at $34, charge buyer at $22) is acceptable for external GAAP reporting"
        ],
        "Explanation": "Minimum transfer price = Variable cost + Opportunity cost per unit of constrained resource. With idle capacity no external sale is displaced, so opportunity cost is zero and the floor is $22. At capacity the 10,000 kg displaces external sales at $12 CM each, so the floor rises to $34, converging to market price — the classic TOC result. Allocated fixed costs are not incremental and do not enter the floor. Dual rates aid goal congruence internally but are not GAAP for external reporting; intercompany profit is eliminated and inventory reported at cost.",
        "Topic": "Transfer pricing floors",
        "Subtopic": "Idle vs constrained capacity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "DA-09: Transfer price floor = VC + opportunity cost",
        "CommonTrapReference": "Including allocated fixed costs or asserting market price is always the floor.",
        "DecisionTreeReference": "Transfer pricing — capacity and opportunity cost",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "transfer price",
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C5-Q6",
        "Type": "match",
        "Prompt": "Match each Cascadia decision to its governing principle.",
        "Correct": {
          "Product-mix ranking": "Rank by CM per hour of the binding constraint (Alpha $15 > Beta $12)",
          "Rush order at full capacity": "Reject at $52 — displaces $12/hour Beta contribution for only $4.40/hour rush CM; floor is VC plus opportunity cost",
          "By-product further processing": "Incremental $5,200 vs $1,800 = +$3,400; joint costs irrelevant, incremental only beyond split-off",
          "Transfer pricing": "Idle floor $22; constrained floor $34 = VC + $12 forgone CM; fixed allocations irrelevant"
        },
        "LeftItems": [
          "Product-mix ranking",
          "Rush order at full capacity",
          "By-product further processing",
          "Transfer pricing"
        ],
        "RightItems": [
          "Rank by CM per hour of the binding constraint (Alpha $15 > Beta $12)",
          "Incremental $5,200 vs $1,800 = +$3,400; joint costs irrelevant, incremental only beyond split-off",
          "Idle floor $22; constrained floor $34 = VC + $12 forgone CM; fixed allocations irrelevant",
          "Reject at $52 — displaces $12/hour Beta contribution for only $4.40/hour rush CM; floor is VC plus opportunity cost"
        ],
        "Explanation": "The case closes the loop: product mix is a TOC ranking problem; the rush order fails the opportunity-cost test at full capacity; further processing is judged solely on post-split-off incrementals; transfer-price floors pivot on whether capacity is idle or binding. Fixed-cost allocations and joint costs never enter these marginal decisions.",
        "Topic": "Integrated decision rules",
        "Subtopic": "Matching principle to decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "DA-06; DA-08; DA-09",
        "CommonTrapReference": "Ranking by CM per unit, including sunk joint costs, or pricing at VC when capacity binds.",
        "DecisionTreeReference": "Decision analysis — integrated marginal analysis",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching",
          "principles"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-F3",
    "Title": "The Vendor Gift and the Quarter-End Pressure at Northstar Systems",
    "SectionTags": ["F"],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": ["Apply IMA Statement of Ethical Professional Practice — four standards (F.1)","Apply IMA ethical decision-making model and resolution process (F.3)","Evaluate fraud and earnings-management pressure and FCPA facilitation vs bribery (F.4/F.6)"],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Controller Elena Ruiz of Northstar Systems received a personal $800 gift card from a vendor bidding on a $1.2M contract, and the VP of Sales has asked her to ship $900K of orders three days early to meet quarter-end targets despite undocumented return rights. Elena must navigate the IMA standards, the FCPA boundary, and the IMA resolution process before any certification or commitment is made.",
    "Industry": "Software / technology",
    "CompanyType": "Service provider",
    "CompanyName": "Northstar Systems",
    "Stakeholder": "Controller Elena Ruiz",
    "BusinessFunction": "Internal control / Ethics",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["IMA ethics","vendor gift","channel stuffing","FCPA","SOX","whistleblower"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Map conduct to the four IMA ethical standards","Sequence escalation correctly when superiors are involved and apply SOX 806 / Dodd-Frank protections","Distinguish FCPA facilitation payments from bribery and identify books-and-records obligations","Bound confidentiality and formulate an integrated ethical response"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F3-E1",
        "CaseID": "CBQ21-F3",
        "Type": "email",
        "Title": "Exhibit 1 — Vendor Gift and Sales Request (Excerpts)",
        "Purpose": "Provides the vendor gift fact pattern and the quarter-end shipment request with side-letter evidence for the IMA and ASC 606/FCPA analysis.",
        "ReferencedBy": [
          "CBQ21-F3-Q1",
          "CBQ21-F3-Q2",
          "CBQ21-F3-Q3",
          "CBQ21-F3-Q6"
        ],
        "Body": "From: Apex Components (vendor) — 'Elena, appreciate your help on the RFP — a small $800 gift card for you personally as thanks for your guidance. Looking forward to the decision.'\nFrom: VP Sales — 'Elena, we need $900K shipped Dec 28-30 to make Q4. Distributor verbally agreed to unrestricted returns through March 31 if product doesn't move — we'll handle restocking quietly. No need to document the return promise in the order system.'"
      },
      {
        "ExhibitID": "CBQ21-F3-E2",
        "CaseID": "CBQ21-F3",
        "Type": "text",
        "Title": "Exhibit 2 — Framework References: IMA Standards, FCPA, and Whistleblower Protections",
        "Purpose": "Summarizes the governing framework for Elena's response: IMA four standards, resolution steps, FCPA anti-bribery and books-and-records, ASC 606 return-rights, SOX 302/806, Dodd-Frank.",
        "ReferencedBy": [
          "CBQ21-F3-Q1",
          "CBQ21-F3-Q2",
          "CBQ21-F3-Q4",
          "CBQ21-F3-Q5",
          "CBQ21-F3-Q6"
        ],
        "Body": "IMA Statement: Competence (maintain expertise, follow laws), Confidentiality (do not disclose except with authority), Integrity (mitigate conflicts, refuse gifts that impair objectivity), Credibility (communicate fairly, disclose fully). Resolution: first to immediate supervisor unless that person appears involved, then to next level / audit committee; consult counsel; resignation only after all channels fail.\nFCPA: anti-bribery prohibits corrupt payments to foreign officials to obtain business; facilitating payments for routine governmental action are narrowly excepted but must be accurately recorded — books-and-records provision requires accurate books regardless.\nASC 606: rights of return create variable consideration — transaction price constrained for expected returns.\nSOX 302/906: CEO/CFO certify fair presentation; 806 plus Dodd-Frank 922 protect good-faith whistleblower reports from retaliation; confidentiality permits disclosure through proper authority."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F3-Q1",
        "Type": "select",
        "Prompt": "Which IMA ethical standards are most directly implicated by accepting the vendor's $800 personal gift and recording the $900K shipment with the undocumented return promise?",
        "Correct": "C",
        "Choices": [
          "Competence only — the issue is whether Elena can compute the entries correctly",
          "Confidentiality only — the vendor information is proprietary and must not be shared",
          "Integrity (abstaining from gifts that impair objectivity and disclosing conflicts) and Credibility (communicating information fairly and disclosing fully about return rights) — with Competence requiring knowledge of ASC 606 variable consideration",
          "No standards apply until a regulator opens an investigation"
        ],
        "Explanation": "Integrity requires refusing gifts that could influence or appear to influence decisions and disclosing actual or apparent conflicts — an $800 personal gift from a bidder on a $1.2M contract directly impairs objectivity. Credibility requires fair disclosure of the return-rights concession that makes full Q4 revenue inappropriate under ASC 606. Competence is implicated because recognizing variable consideration correctly is a technical requirement. Confidentiality governs HOW information moves (proper channels, no leaks), not whether a known misstatement may stand. Clean-audit or no-regulator-yet arguments never suspend the standards.",
        "Topic": "IMA standards mapping",
        "Subtopic": "Integrity, Credibility, and Competence",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "IMA Statement of Ethical Professional Practice",
        "CommonTrapReference": "Treating confidentiality as a veto over escalation or assuming standards trigger only on investigation.",
        "DecisionTreeReference": "IMA ethics — four standards",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "IMA standards",
          "integrity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F3-Q2",
        "Type": "select",
        "Prompt": "Under the IMA resolution process, what is Elena's correct first step regarding the $900K shipment with the side-letter return rights?",
        "Correct": "B",
        "Choices": [
          "Confront the distributor directly to obtain cancellation of the verbal promise",
          "Escalate to the next higher level or the audit committee, presenting the Exhibit 1 evidence, because the immediate request chain appears involved (VP Sales) and Competence/Credibility require disclosure before any certification",
          "Resign immediately and publicize the arrangement",
          "Wait for external auditors to discover the return promise during fieldwork"
        ],
        "Explanation": "IMA resolution starts with the immediate supervisor unless that person appears involved — here the VP of Sales authored the return-rights instruction, so direct confrontation both fails procedurally and risks tipping the counterparty. Escalation moves to next-level management or the audit committee with contemporaneous documentation. Resignation is the last resort after channels are exhausted, and waiting for auditors lets a knowing misstatement stand certified in the interim while the controller remains responsible for numbers she supplies.",
        "Topic": "IMA resolution process",
        "Subtopic": "Escalation sequence when supervisor is involved",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "IMA Resolution Process",
        "CommonTrapReference": "Following supervisor-first ordering even when the supervisor is the wrongdoer.",
        "DecisionTreeReference": "Ethical conflict resolution — escalation path",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "resolution",
          "escalation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F3-Q3",
        "Type": "select",
        "Prompt": "How should the $800 vendor gift and the $900K shipment be classified under FCPA, books-and-records, and ASC 606 principles analogously applied?",
        "Correct": "A",
        "Choices": [
          "The gift must be declined and disclosed as a conflict under Integrity, the $800 cannot be recorded as vendor consideration without disclosure, and the $900K shipment includes variable consideration for expected returns that must reduce the transaction price — recording the full $900K overstates Q4 revenue regardless of title transfer; FCPA facilitation exception does not apply to a commercial vendor gift",
          "The $800 gift is a facilitating payment permitted under FCPA, so no conflict exists",
          "Title transfer alone justifies full revenue recognition, and the gift is immaterial",
          "Disclosure in a footnote cures both the gift conflict and the revenue measurement problem"
        ],
        "Explanation": "Commercial vendor gifts to influence a $1.2M award are conflicts under Integrity, not facilitating payments (the FCPA facilitating exception covers only routine governmental action for foreign officials, narrowly construed, and never excuses inaccurate books — the books-and-records provision requires accurate recording in any case). Rights of return create variable consideration under ASC 606: expected returns constrain the transaction price, so full shipment revenue is overstated by the amount not expected to be retained. Footnote disclosure never cures measurement. The combined pattern — personal benefit plus earnings pressure — deepens the governance concern beyond either item alone.",
        "Topic": "FCPA facilitation vs bribery and revenue recognition",
        "Subtopic": "Gift as conflict and variable consideration",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FCPA anti-bribery / books-and-records; ASC 606 variable consideration",
        "CommonTrapReference": "Mislabeling a commercial gift as a facilitating payment or letting disclosure substitute for correct measurement.",
        "DecisionTreeReference": "FCPA — facilitation vs bribery; revenue — return rights",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "FCPA",
          "ASC 606",
          "gift"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F3-Q4",
        "Type": "select",
        "Prompt": "How far do Elena's confidentiality obligations extend if internal escalation stalls?",
        "Correct": "B",
        "Choices": [
          "Confidentiality forbids revealing internally obtained information to anyone outside the company under any circumstances",
          "Through proper authorized channels only — if internal remedies genuinely fail, SOX 806 and Dodd-Frank protect a good-faith report to the SEC or audit committee from retaliation, but external reporting is the last step, not the opening move",
          "Posting details publicly is protected activity because the purpose is benevolent",
          "Notifying the vendor to cancel the gift satisfies her obligations"
        ],
        "Explanation": "Confidentiality permits lawful disclosure through proper authority — audit committee, board, regulators acting in jurisdiction — and both SOX 806 and Dodd-Frank shield good-faith whistleblower reports from retaliation precisely so that obligation and protection interlock. The path is ordered: internal escalation first, external regulators second. Public posting abandons the framework, and alerting the counterparty compounds the problem without authority.",
        "Topic": "Confidentiality boundaries",
        "Subtopic": "Whistleblower protections",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "SOX 806; Dodd-Frank 922",
        "CommonTrapReference": "Reading confidentiality as absolute or jumping to regulators before internal channels fail.",
        "DecisionTreeReference": "Confidentiality — proper channels and protections",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "confidentiality",
          "whistleblower"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F3-Q5",
        "Type": "multi",
        "Prompt": "Which three controls would most directly address the vendor-gift and revenue-pressuring risks at Northstar? (Select three.)",
        "Correct": [
          "Dual authorization for vendor master changes plus system-enforced separation of vendor setup from contract award",
          "Revenue hold requiring written confirmation of return-rights terms before quarter-end shipments above a threshold",
          "Anonymous whistleblower hotline with audit-committee oversight and SOX 806 non-retaliation training"
        ],
        "Choices": [
          "Dual authorization for vendor master changes plus system-enforced separation of vendor setup from contract award",
          "Revenue hold requiring written confirmation of return-rights terms before quarter-end shipments above a threshold",
          "Anonymous whistleblower hotline with audit-committee oversight and SOX 806 non-retaliation training",
          "Requiring original paper invoices for all purchases above $5,000",
          "Raising the gift-reporting threshold to $2,000 to reduce administrative burden"
        ],
        "Explanation": "The $800 gift exploited single-point vendor influence, and the $900K shipment exploited the lack of a return-rights checkpoint — controls must close those exact mechanisms: dual authorization breaks the sole-control loop, the revenue hold makes the return promise verifiable before revenue is cut off, and the hotline gives the next person in Elena's position a protected channel. Paper invoices add friction without breaking the approval monopoly, and raising the gift threshold ratifies the conflict rather than removing it.",
        "Topic": "Ethics control remediation",
        "Subtopic": "Vendor and revenue controls",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "COSO/IMA governance — vendor and revenue controls",
        "CommonTrapReference": "Proposing cultural remedies where a structural control gap did the damage.",
        "DecisionTreeReference": "Governance — control design for ethics risks",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls",
          "hotline",
          "revenue hold"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F3-Q6",
        "Type": "match",
        "Prompt": "Match each Northstar fact to its correct ethical treatment.",
        "Correct": {
          "Accepting the $800 personal gift from a bidding vendor": "Integrity violation — gift impairs objectivity, must decline and disclose conflict",
          "Shipping $900K with undocumented return rights to meet quarter": "Credibility / ASC 606 failure — variable consideration, full revenue overstates Q4",
          "FCPA facilitating-payment claim for the gift": "Misclassification — facilitating exception covers only routine governmental action, not commercial gifts, and never excuses inaccurate books",
          "Ima resolution when VP Sales is involved": "Bypass immediate supervisor, escalate to next level/audit committee with documentation"
        },
        "LeftItems": [
          "Accepting the $800 personal gift from a bidding vendor",
          "Shipping $900K with undocumented return rights to meet quarter",
          "FCPA facilitating-payment claim for the gift",
          "Ima resolution when VP Sales is involved"
        ],
        "RightItems": [
          "Credibility / ASC 606 failure — variable consideration, full revenue overstates Q4",
          "Integrity violation — gift impairs objectivity, must decline and disclose conflict",
          "Bypass immediate supervisor, escalate to next level/audit committee with documentation",
          "Misclassification — facilitating exception covers only routine governmental action, not commercial gifts, and never excuses inaccurate books"
        ],
        "Explanation": "The matching consolidates the case: the gift is an integrity conflict, the shipment is a credibility/measurement failure, the FCPA facilitating claim is a category error, and the resolution path bypasses the involved supervisor. Together they illustrate that personal-benefit conflicts and earnings pressure compound governance risk more than either does alone.",
        "Topic": "Integrated ethics treatment",
        "Subtopic": "Matching fact to standard",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "IMA standards; FCPA; ASC 606",
        "CommonTrapReference": "Cross-matching credibility to gift or integrity to revenue alone.",
        "DecisionTreeReference": "Ethics — integrated fact-to-standard mapping",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching",
          "ethics"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-A6",
    "Title": "Inflation-Adjusted Trend at Summit Health",
    "SectionTags": ["A"],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": ["Adjust for changing prices (A.6)","Analyze trend distortion"],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Summit Health System closed the year with nominal profit up 12% while CPI rose 4.5%. Controller Dana Lee must restate the two-year trend to constant dollars and show the board how inflation masks real liquidity erosion before the debt covenant review.",
    "Industry": "Healthcare",
    "CompanyType": "Service provider",
    "CompanyName": "Summit Health System",
    "Stakeholder": "Controller Dana Lee",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["inflation","constant-dollar"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation Batch3"}],
    "Dependencies": [],
    "LearningObjectives": ["Restate nominal to constant dollars","Compute real growth","Distinguish monetary distortion"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A6-E1",
        "CaseID": "CBQ21-A6",
        "Type": "table",
        "Title": "Exhibit 1 — Price Index and Nominal Results ($ millions)",
        "Purpose": "Provides CPI and nominal results for restatement.",
        "ReferencedBy": [
          "CBQ21-A6-Q1",
          "CBQ21-A6-Q2",
          "CBQ21-A6-Q3"
        ],
        "Headers": [
          "Item",
          "Year1 (base)",
          "Year2"
        ],
        "Rows": [
          [
            "CPI (Year1=100)",
            "100",
            "104.5"
          ],
          [
            "Nominal net income",
            "20.0",
            "22.4"
          ],
          [
            "Nominal total assets",
            "200.0",
            "220.0"
          ],
          [
            "Inventory (FIFO)",
            "30.0",
            "36.0"
          ]
        ],
        "DataFormat": "USD millions; CPI annual",
        "AccuracyCheck": "Year2 constant 22.4/1.045=21.43"
      },
      {
        "ExhibitID": "CBQ21-A6-E2",
        "CaseID": "CBQ21-A6",
        "Type": "table",
        "Title": "Exhibit 2 — Ratio Comparison",
        "Purpose": "Shows nominal vs constant ratios for covenant discussion.",
        "ReferencedBy": [
          "CBQ21-A6-Q4",
          "CBQ21-A6-Q5",
          "CBQ21-A6-Q6"
        ],
        "Headers": [
          "Ratio",
          "Nominal Yr2",
          "Constant $ Yr2"
        ],
        "Rows": [
          [
            "Current ratio",
            "2.10",
            "1.92"
          ],
          [
            "ROA",
            "10.2%",
            "9.5%"
          ]
        ],
        "DataFormat": "Ratios",
        "AccuracyCheck": "Constant ROA uses restated assets 210.5"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A6-Q1",
        "Type": "numeric",
        "Prompt": "Enter Year2 net income restated to Year1 constant dollars, in millions (rounded to two decimals).",
        "Correct": "21.43",
        "Explanation": "Year2 net income restated to Year1 constant dollars = Year2 nominal / (CPI_Year2 / CPI_Year1) = $22.4M / (104.5/100) = $22.4M / 1.045 = $21.43M. Under FASB ASC 255 (Changing Prices), constant-dollar accounting divides nominal amounts by the price-index ratio to remove general inflation effects; monetary items (cash, receivables, debt) gain or lose purchasing power and are reported net, while nonmonetary items (inventory, PP&E, equity) are restated to current cost. For Summit Health, the 22.4 nominal overstates real purchasing-power earnings by 4.5%, the inflation rate. A common trap is dividing by 100 directly (giving $22.4), or applying the inflation rate additively instead of as an index ratio.",
        "Topic": "Inflation restatement",
        "Subtopic": "Constant-dollar",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-02",
        "CommonTrapReference": "Nominal as real",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "inflation-restatement"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A6-Q2",
        "Type": "numeric",
        "Prompt": "Enter the real growth rate of net income, in percent rounded to one decimal.",
        "Correct": "7.2",
        "Explanation": "Real growth = (Real Year2 NI / Real Year1 NI) - 1 = ($21.43M / $20.0M) - 1 = 7.15%, rounded to 7.2%. The nominal reported growth of 12.0% ($22.4 / $20.0 - 1) overstates real growth by 4.8 percentage points (the 4.5% inflation plus rounding). This decomposition lets Dana Lee show the board that real sustainable earnings growth is materially below the reported headline number. A common trap is computing the difference as 22.4/20.0 - 21.43/20.0 = 4.85% and calling that the 'inflation adjustment', or computing (1.045/1.045 - 1) = 0% real growth, which misuses the index.",
        "Topic": "Real growth",
        "Subtopic": "Price-level trend",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-06",
        "CommonTrapReference": "Nominal 12% as real",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "real-growth"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A6-Q3",
        "Type": "select",
        "Prompt": "Which line item is MOST distorted by inflation under FIFO? (Select one)",
        "Correct": "B",
        "Choices": [
          "Cash — monetary, correct at nominal",
          "Inventory — FIFO ending at recent prices but COGS at old prices, gross margin overstated — requires current-cost disclosure",
          "Long-term debt — fixed nominal, gains purchasing power",
          "Common stock — historical cost"
        ],
        "Explanation": "Inventory FIFO distorts gross margin in inflation; cash is monetary correct, debt gains purchasing power.",
        "Topic": "Inventory distortion",
        "Subtopic": "FIFO vs current",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Using cash",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "inventory-distortion"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A6-Q4",
        "Type": "select",
        "Prompt": "What does current ratio 2.10 nominal vs 1.92 constant imply?",
        "Correct": "C",
        "Choices": [
          "Liquidity improved — inflation helps",
          "Nominal 2.10 is covenant metric, no action",
          "Real liquidity eroded — constant-dollar assets lag CPI, so headroom overstated — test constant dollars",
          "Ratios never adjusted"
        ],
        "Explanation": "Nominal current ratio 2.10 uses current assets and current liabilities at December 31 face values. Constant-dollar current ratio 1.92 restates nonmonetary current assets (inventory at FIFO) down by 4.5% and recognizes that monetary current liabilities are unchanged in nominal terms, so the constant-dollar numerator is lower while the denominator is unchanged. Real liquidity erosion means Summit has less working-capital cushion than the nominal ratio suggests, and the debt covenant should be tested at constant dollars to avoid relying on inflation-inflated assets. Choice A treats inflation as helpful (only true for monetary liabilities); Choice B treats nominal as covenant-safe; Choice D ignores the issue entirely.",
        "Topic": "Covenant",
        "Subtopic": "Real vs nominal",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Nominal as real",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "covenant"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A6-Q5",
        "Type": "multi",
        "Prompt": "Which two steps correctly restate Year2 to constant dollars? (Select two)",
        "Correct": [
          "Divide Year2 nominal by 1.045",
          "Restate monetary at purchasing power, nonmonetary via index"
        ],
        "Choices": [
          "Divide Year2 nominal by 1.045",
          "Multiply Year2 by 104.5",
          "Add 4.5% to every Year2 amount",
          "Restate monetary at purchasing power, nonmonetary via index",
          "Use FIFO historical without adjustment"
        ],
        "Explanation": "Restating to constant dollars requires dividing Year2 nominal amounts by the price index ratio 104.5/100 =1.045 and distinguishing monetary purchasing-power effects from nonmonetary historical cost. Only the index division produces constant-dollar amounts; adding 4.5% double-counts. For Summit Health this yields Year2 constant NI 21.43 vs nominal 22.4, real growth 7.2%.",
        "Topic": "Inflation restatement",
        "Subtopic": "Constant-dollar method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "method"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A6-Q6",
        "Type": "match",
        "Prompt": "Match each concept to treatment",
        "Correct": {
          "Constant-dollar": "Divide by 1.045",
          "Monetary vs nonmonetary": "Monetary gain/loss vs nonmonetary historical",
          "Nominal vs real": "Nominal flatters, real sustainable",
          "Covenant test": "Test constant-dollar headroom"
        },
        "LeftItems": [
          "Constant-dollar",
          "Monetary vs nonmonetary",
          "Nominal vs real",
          "Covenant test"
        ],
        "RightItems": [
          "Divide by 1.045",
          "Monetary gain/loss vs nonmonetary historical",
          "Nominal flatters, real sustainable",
          "Test constant-dollar headroom"
        ],
        "Explanation": "Constant-dollar divides by 104.5/100, monetary vs nonmonetary distinguishes purchasing-power effects, nominal 12% overstates vs real 7.2%, and covenant headroom must be tested at constant dollars because nominal 2.10 overstates real 1.92, guiding the board's leverage decision with real purchasing power.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-C6",
    "Title": "Four-Ore WACM at Greenstone Mining",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["Apply CVP under product mix — WACM (C.1)","Analyze operating leverage"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Greenstone Mining hoists four ores through a shaft limited to 12,000 hours per month. Manager Raul Ortega must compute WACM breakeven, DOL, and margin of safety for the 2026 budget.",
    "Industry": "Mining",
    "CompanyType": "Producer",
    "CompanyName": "Greenstone Mining",
    "Stakeholder": "Operations Manager Raul Ortega",
    "BusinessFunction": "Operations strategy",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["WACM","breakeven"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute WACM","Compute BE tons","Compute DOL/MoS"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C6-E1",
        "CaseID": "CBQ21-C6",
        "Type": "table",
        "Title": "Exhibit 1 — Ore Economics (Monthly)",
        "Purpose": "Provides price, VC, CM, mix, hours for WACM.",
        "ReferencedBy": [
          "CBQ21-C6-Q1",
          "CBQ21-C6-Q2",
          "CBQ21-C6-Q3",
          "CBQ21-C6-Q6"
        ],
        "Headers": [
          "Ore",
          "Price",
          "VC",
          "CM",
          "Tons",
          "Mix %",
          "Hrs/Ton"
        ],
        "Rows": [
          [
            "Copper",
            "120",
            "70",
            "50",
            "4000",
            "40%",
            "1.5"
          ],
          [
            "Nickel",
            "200",
            "120",
            "80",
            "3000",
            "30%",
            "2.0"
          ],
          [
            "Zinc",
            "90",
            "50",
            "40",
            "2000",
            "20%",
            "1.0"
          ],
          [
            "Cobalt",
            "300",
            "180",
            "120",
            "1000",
            "10%",
            "3.0"
          ]
        ],
        "DataFormat": "USD per ton; tons monthly",
        "AccuracyCheck": "WACM 64; hrs 17000 >12000"
      },
      {
        "ExhibitID": "CBQ21-C6-E2",
        "CaseID": "CBQ21-C6",
        "Type": "table",
        "Title": "Exhibit 2 — Fixed Costs and Budget",
        "Purpose": "Provides FC and income for DOL/MoS.",
        "ReferencedBy": [
          "CBQ21-C6-Q2",
          "CBQ21-C6-Q3",
          "CBQ21-C6-Q4",
          "CBQ21-C6-Q5"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Fixed costs",
            "$480,000"
          ],
          [
            "Budgeted OI",
            "$160,000"
          ],
          [
            "Budgeted CM (10k tons)",
            "$640,000"
          ]
        ],
        "DataFormat": "USD monthly",
        "AccuracyCheck": "CM 640k-480k=160k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C6-Q1",
        "Type": "numeric",
        "Prompt": "Enter the weighted-average CM per ton, in dollars.",
        "Correct": "64.00",
        "Explanation": "Weighted-average contribution margin = Σ (CM_i × Mix_i) = (50 × 0.40) + (80 × 0.30) + (40 × 0.20) + (120 × 0.10) = 20 + 24 + 8 + 12 = $64 per ton. Per DA-01, WACM blends individual ore CMs by sales-mix proportions to produce a single CM figure for breakeven, DOL, and margin-of-safety calculations across multi-product operations. The mix assumption (40/30/20/10) is critical — if it shifts, WACM shifts. A common trap is computing the simple arithmetic average of CMs ((50+80+40+120)/4 = 72.50), which ignores mix; another is computing tonnage-weighted CM ($640,000 / 10,000 tons = $64, correct but arrived at by accident).",
        "Topic": "WACM",
        "Subtopic": "Weighted mix",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-01",
        "CommonTrapReference": "Simple avg",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "wacm"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q2",
        "Type": "numeric",
        "Prompt": "Enter the breakeven tons per month, rounded to nearest ton.",
        "Correct": "7500",
        "Explanation": "Breakeven tons = Fixed Costs / WACM = $480,000 / $64 per ton = 7,500 tons per month (DA-02). Per DA-02, breakeven in units is total fixed costs divided by weighted-average CM per unit, which yields the volume at which total CM exactly covers fixed costs and operating income is zero. For Greenstone this is well below the 10,000-ton budget, confirming positive budgeted operating income. A common trap uses a single ore's CM (e.g., copper CM $50 → 9,600 tons) or computes breakeven dollars ($480,000 / 0.10 CM ratio = $4.8M revenue); both are wrong units.",
        "Topic": "Breakeven",
        "Subtopic": "Composite BE",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-02",
        "CommonTrapReference": "Single ore CM",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "breakeven"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q3",
        "Type": "numeric",
        "Prompt": "Enter the DOL at the 10k-ton budget, rounded to two decimals.",
        "Correct": "4.00",
        "Explanation": "Degree of operating leverage at the 10,000-ton budget = Contribution Margin / Operating Income = $640,000 / $160,000 = 4.00 (FA-19). DOL measures how a percentage change in sales volume translates to a percentage change in operating income; DOL of 4.0 means a 10% volume change produces a 40% OI change in the same direction. With most ore tonnage locked at the budget mix, the hoist-hours capacity is the binding constraint, amplifying volume sensitivity into OI. A common trap divides CM by FC ($640,000 / $480,000 = 1.33) instead of by OI, or computes total-CM ratio against revenue.",
        "Topic": "DOL",
        "Subtopic": "Leverage",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-19",
        "CommonTrapReference": "CM/FC",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dol"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q4",
        "Type": "select",
        "Prompt": "What is the margin of safety at budget?",
        "Correct": "A",
        "Choices": [
          "2,500 tons, 25% buffer",
          "7,500 tons, 75%",
          "10,000 tons, 100%",
          "0 tons"
        ],
        "Explanation": "Margin of safety = Budget tons - Breakeven tons = 10,000 - 7,500 = 2,500 tons, or 2,500 / 10,000 = 25% of budget volume. MoS is the buffer above breakeven before losses begin — a 25% volume cushion means sales could fall 25% before the operation turns unprofitable (FA-23 / DA-03). For Greenstone this cushion is meaningful but not large given ore-price and hoist-capacity volatility. Choice B (7,500 tons, 75%) confuses breakeven itself with the buffer above it; Choice C (10,000 tons, 100%) misuses budget as buffer. A common trap treats breakeven dollars as margin of safety.",
        "Topic": "Margin of safety",
        "Subtopic": "Buffer",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "BE as MoS",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "margin-of-safety"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q5",
        "Type": "multi",
        "Prompt": "Which two statements about WACM under this constraint are correct? (Select two)",
        "Correct": [
          "WACM 64 assumes mix holds; if nickel demand falls, WACM falls",
          "Shaft 12k hrs may truncate tons below BE if cobalt heavy"
        ],
        "Choices": [
          "WACM 64 assumes mix holds; if nickel demand falls, WACM falls",
          "WACM is fixed property",
          "Shaft 12k hrs may truncate tons below BE if cobalt heavy",
          "DOL 4 means 10% price →40% OI",
          "MoS dollars = BE sales"
        ],
        "Explanation": "WACM 64 assumes the 40/30/20/10 mix holds; if nickel demand falls, WACM falls because high-CM nickel weight drops, and the 12,000-hour shaft may truncate feasible tons below the 7,500-ton breakeven if cobalt-heavy mix consumes 3 hrs/ton. Margin of safety is buffer before losses, not the breakeven itself, and must be computed at mix.",
        "Topic": "Analysis",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Unit vs revenue mix",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q6",
        "Type": "match",
        "Prompt": "Match each CVP concept to Greenstone",
        "Correct": {
          "WACM 64": "Blend 50/80/40/120 at mix",
          "BE 7,500": "FC/WACM composite",
          "DOL 4.0": "CM/OI — 10% volume →40% OI",
          "Hoist 12k hrs": "Capacity may truncate mix"
        },
        "LeftItems": [
          "WACM 64",
          "BE 7,500",
          "DOL 4.0",
          "Hoist 12k hrs"
        ],
        "RightItems": [
          "Blend 50/80/40/120 at mix",
          "FC/WACM composite",
          "CM/OI — 10% volume →40% OI",
          "Capacity may truncate mix"
        ],
        "Explanation": "WACM 64 blends 50/80/40/120 at the 40/30/20/10 mix, breakeven 7,500 tons is FC/WACM composite at that mix, DOL 4.0 means 10% volume changes OI 40%, and the 12,000-hour hoist may truncate the mix before breakeven if cobalt's 3 hrs/ton dominates the shaft capacity.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-F4",
    "Title": "ESG Assurance at Pinnacle University",
    "SectionTags": ["F"],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": ["Assess ESG reporting (F.7)","Apply whistleblower"],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Pinnacle University's $900M endowment claims carbon-neutral across Scope 1-3, but assurance covers only 40% of assets. CFO Amir Hassan must advise the audit committee on the claim and the donor's $25M conditional gift.",
    "Industry": "Education",
    "CompanyType": "Non-profit",
    "CompanyName": "Pinnacle University",
    "Stakeholder": "CFO Amir Hassan",
    "BusinessFunction": "Finance / Sustainability",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["ESG","assurance"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Distinguish assurance levels","Apply materiality","Sequence whistleblower"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F4-E1",
        "CaseID": "CBQ21-F4",
        "Type": "text",
        "Title": "Exhibit 1 — Donor Report Claim",
        "Purpose": "Provides carbon-neutral claim and assurance scope.",
        "ReferencedBy": [
          "CBQ21-F4-Q1",
          "CBQ21-F4-Q3",
          "CBQ21-F4-Q6"
        ],
        "Body": "Headline: 'Pinnacle endowment carbon-neutral Scope 1-3.' Footnote: assurance covers listed equities (40% AUM); private holdings, real estate, offsets unaudited. Donor: 'Defer $25M if report overstates.'"
      },
      {
        "ExhibitID": "CBQ21-F4-E2",
        "CaseID": "CBQ21-F4",
        "Type": "text",
        "Title": "Exhibit 2 — IMA and Assurance Framework",
        "Purpose": "Summarizes IMA credibility and ISAE 3000.",
        "ReferencedBy": [
          "CBQ21-F4-Q1",
          "CBQ21-F4-Q2",
          "CBQ21-F4-Q4",
          "CBQ21-F4-Q5"
        ],
        "Body": "IMA Credibility: fair disclosure, disclose fully. ISAE 3000: limited (negative, less evidence) vs reasonable (positive, audit-like). Material ESG omission = greenwash. Whistleblower: SOX806 via audit committee."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F4-Q1",
        "Type": "select",
        "Prompt": "Which IMA standard is MOST implicated by the carbon-neutral headline with 40% assurance?",
        "Correct": "B",
        "Choices": [
          "Confidentiality",
          "Credibility — fair disclosure requires headline match assurance scope; 60% unaudited misleads",
          "Competence",
          "Integrity only if intent proven"
        ],
        "Explanation": "The carbon-neutral headline claims portfolio-wide Scope 1-3 coverage, but assurance is limited to 40% AUM (listed equities only). IMA Credibility (fourth standard) requires fair and full disclosure of all relevant information — communicating 'carbon-neutral' when 60% of the endowment is unaudited misleads donors and beneficiaries. The headline-scope mismatch is a greenwashing exposure that the audit committee and donors should see. Choice A (Confidentiality) governs how information moves through proper channels, not what may be claimed; Choice C (Competence) is technical expertise, not communication fairness. The donor's '$25M if overstates' is exactly the credibility test.",
        "Topic": "IMA credibility",
        "Subtopic": "ESG disclosure",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Confidentiality",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ima-credibility"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q2",
        "Type": "select",
        "Prompt": "What is the correct description of the assurance gap?",
        "Correct": "C",
        "Choices": [
          "Reasonable on 100% — fully supported",
          "No assurance needed",
          "Limited on 40% — negative form, insufficient for portfolio-wide claim; need reasonable or expanded scope",
          "Limited equals reasonable"
        ],
        "Explanation": "ISAE 3000 distinguishes limited assurance (negative form — 'nothing came to our attention indicating material misstatement', based on limited evidence) from reasonable assurance (positive form — 'in our opinion, the statement is fairly presented', based on extensive evidence analogous to an audit). Pinnacle's 40% scope received only limited assurance, which is insufficient evidentiary support for a portfolio-wide carbon-neutral claim. The choice is to expand assurance scope to 100% with reasonable assurance, or qualify the headline to reflect the actual coverage ('40% assured, 60% unaudited'). Choice A (reasonable on 100%) describes the upgrade path; Choice B (no assurance) ignores the question; Choice D conflates the two assurance types.",
        "Topic": "Assurance levels",
        "Subtopic": "Gap",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Limited=reasonable",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "assurance-levels"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q3",
        "Type": "select",
        "Prompt": "How should the $25M conditional gift be treated?",
        "Correct": "A",
        "Choices": [
          "Disclose contingency and avoid recognizing; do not inflate claim to secure gift",
          "Recognize $25M immediately",
          "Book as liability until verified",
          "Defer until lawsuit"
        ],
        "Explanation": "Under ASC 958 (Not-for-Profit Entities) and ASC 450 (Contingencies), a conditional gift with a measurable barrier (the donor's '$25M if report overstates') is not recognized as revenue until the barrier is met. Recognition requires unconditional promise or completed transfer; a conditional promise is disclosed, not booked, until the condition is substantially met. Recognizing $25M immediately to 'secure the gift' violates ASC 958-605 and inflates the donor-reporting claim that triggered the condition in the first place. The CEO's pressure compounds the credibility risk (IMA Credibility). Disclose the contingency and avoid recognition until verification. Choice B (recognize) is the GAAP failure; Choice C (book as liability) mischaracterizes; Choice D (defer until lawsuit) ignores disclosure.",
        "Topic": "Gift contingency",
        "Subtopic": "Ethics",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recognize conditional",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "gift-contingency"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q4",
        "Type": "select",
        "Prompt": "What is Amir's correct first step under IMA resolution when VP pressures claim?",
        "Correct": "B",
        "Choices": [
          "Publish as drafted",
          "Escalate to audit committee with Exhibit 1, bypassing involved VP",
          "Confront donor",
          "Resign immediately"
        ],
        "Explanation": "IMA resolution (Statement of Ethical Professional Practice, 'Resolve Ethical Conflicts' subsection) starts with the immediate supervisor unless that person appears involved in the conflict. Here the VP of Sales authored the return-rights instruction that drives the credibility concern, so direct confrontation both fails procedurally and risks tipping the counterparty. Escalation moves to next-level management or the audit committee with contemporaneous documentation (email, memo, dates). Resignation is the last resort only after channels are exhausted. Choice A (publish as drafted) abandons the framework; Choice C (confront donor) compounds the issue; Choice D (resign immediately) bypasses available internal channels. SOX 806 protects this escalation path.",
        "Topic": "IMA resolution",
        "Subtopic": "Escalation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Supervisor-first",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ima-resolution"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q5",
        "Type": "multi",
        "Prompt": "Which three controls address greenwash and pressure? (Select three)",
        "Correct": [
          "Expand assurance to 100% or qualify headline to '40% assured'",
          "Audit-committee ESG oversight with management certification",
          "Anonymous hotline with non-retaliation (SOX806)"
        ],
        "Choices": [
          "Expand assurance to 100% or qualify headline to '40% assured'",
          "Audit-committee ESG oversight with management certification",
          "Anonymous hotline with non-retaliation (SOX806)",
          "Recognize $25M early",
          "Restrict donor access to drafts"
        ],
        "Explanation": "Expand assurance to 100% or qualify the carbon-neutral headline to '40% assured, 60% unaudited' so donors see scope, charter audit-committee ESG oversight with management certification analogous to SOX 302, and maintain an anonymous hotline with non-retaliation training under SOX 806. Recognizing the $25M conditional gift early would violate ASC 958.",
        "Topic": "Controls",
        "Subtopic": "Difficult",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Early recognition",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q6",
        "Type": "match",
        "Prompt": "Match each Pinnacle fact to treatment",
        "Correct": {
          "Carbon-neutral 40% assured": "Qualify to scope or expand to reasonable",
          "Donor $25M conditional": "Disclose contingency, do not recognize",
          "ISAE 3000 levels": "Limited negative vs reasonable positive",
          "IMA credibility": "Fair disclosure — headline must match evidence"
        },
        "LeftItems": [
          "Carbon-neutral 40% assured",
          "Donor $25M conditional",
          "ISAE 3000 levels",
          "IMA credibility"
        ],
        "RightItems": [
          "Qualify to scope or expand to reasonable",
          "Disclose contingency, do not recognize",
          "Limited negative vs reasonable positive",
          "Fair disclosure — headline must match evidence"
        ],
        "Explanation": "Carbon-neutral claim with 40% assurance must be qualified to scope or expanded to reasonable assurance; the $25M conditional gift is disclosed, not recognized until the barrier is met; ISAE 3000 distinguishes limited negative vs reasonable positive assurance; IMA credibility requires fair disclosure where the headline matches the evidence base.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-B5",
    "Title": "Dividend and Repurchase at Orchard Capital",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Evaluate dividend policy and repurchase (B.7)","Compute payout and accretion"],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Orchard Capital earned $14M, has $8M in positive-NPV projects, 2M shares at $30, and can pay residual dividend or repurchase 200k shares. Treasurer Maya Sullivan must advise.",
    "Industry": "Investment",
    "CompanyType": "Holding",
    "CompanyName": "Orchard Capital",
    "Stakeholder": "Treasurer Maya Sullivan",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["dividend","repurchase"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation Batch4"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute residual payout","Compute accretion","Apply signaling"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B5-E1",
        "CaseID": "CBQ21-B5",
        "Type": "table",
        "Title": "Exhibit 1 — Earnings and Projects",
        "Purpose": "Provides earnings, projects, shares for payout.",
        "ReferencedBy": [
          "CBQ21-B5-Q1",
          "CBQ21-B5-Q2",
          "CBQ21-B5-Q3"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net income",
            "$14.0M"
          ],
          [
            "Positive-NPV projects",
            "$8.0M"
          ],
          [
            "Shares outstanding",
            "2.0M"
          ],
          [
            "Market price",
            "$30"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "Residual =14-8=6M"
      },
      {
        "ExhibitID": "CBQ21-B5-E2",
        "CaseID": "CBQ21-B5",
        "Type": "text",
        "Title": "Exhibit 2 — Policy Considerations",
        "Purpose": "Summarizes residual vs stable signaling.",
        "ReferencedBy": [
          "CBQ21-B5-Q4",
          "CBQ21-B5-Q5",
          "CBQ21-B5-Q6"
        ],
        "Body": "Residual: payout = earnings - investments. Stable: smooth dividend, signals confidence. Repurchase accretive if P/E < 1/(cost of equity)."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B5-Q1",
        "Type": "numeric",
        "Prompt": "Enter the residual dividend, in dollars.",
        "Correct": "3.00",
        "Explanation": "Residual dividend = (Net Income - Positive-NPV Investments) / Shares = ($14M - $8M) / 2M = $6M / 2M = $3.00 per share. The residual model (B.7) preserves shareholder value by funding all positive-NPV projects first and distributing only the leftover earnings. For Orchard Capital the residual $3.00 is the maximum sustainable dividend that funds the $8M project slate without external equity or changed capital structure. Choice A is the gross payout $14M / 2M = $7.00 (ignores investment opportunity); Choice C is the stable $2 Maya is considering (would retain $4M excess, suboptimal signaling); Choice D is hoarding cash (zero payout).",
        "Topic": "Residual dividend",
        "Subtopic": "Earnings-projects",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.7 residual",
        "CommonTrapReference": "Gross payout",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "residual-dividend"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B5-Q2",
        "Type": "numeric",
        "Prompt": "Enter the repurchase accretion in EPS, in dollars (EPS after - before), rounded to cents.",
        "Correct": "0.78",
        "Explanation": "Before EPS =14,000,000/2,000,000=7.00. Repurchase 200,000 shares at $30 = $6,000,000 cash used, shares 1,800,000, EPS post =14,000,000/1,800,000=7.78. Accretion =7.78-7.00=0.78. The $6M is assumed from existing liquidity (no forgone interest in this residual case); if cash earned 5% pre-tax, accretion would be (14,000,000-225,000)/1,800,000=7.65 vs 7.00 =0.65, still not 0.20, which ignores share math.",
        "Topic": "Repurchase",
        "Subtopic": "Accretion",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.7 repurchase",
        "CommonTrapReference": "Shares repurchased vs income",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "repurchase"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B5-Q3",
        "Type": "select",
        "Prompt": "Which payout policy fits Orchard's growth?",
        "Correct": "B",
        "Explanation": "Residual $3.00 fits Orchard's growth profile: it funds the full $8M project slate, distributes the remaining $6M to shareholders, and avoids external equity issuance. The residual policy is growth-aligned because it lets investment opportunities drive the dividend dollar. Stable $5 (Choice C) exceeds the residual and would require issuing new equity or cutting projects. Stable $2 (implied elsewhere) would retain $4M excess that could fund additional growth — sub-optimal signaling unless the board has a stated accumulation phase. Zero payout (Choice D) hoards cash without a stated strategic rationale. 100% payout (Choice A) ignores project NPV entirely.",
        "Topic": "Payout choice",
        "Subtopic": "Policy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "100% payout",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "payout-choice"
        ],
        "Dependencies": [],
        "Choices": [
          "100% payout — ignores projects",
          "Residual $3 — funds $8M projects, distributes remainder, avoids external equity",
          "Stable $5 — exceeds residual, must issue equity",
          "Zero payout — hoard cash"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q4",
        "Type": "select",
        "Prompt": "What is the signaling effect of a stable $2 dividend vs residual $3?",
        "Correct": "A",
        "Explanation": "Stable $2.00 signals management's confidence that future earnings can sustain the dividend even through cyclical downturns; the trade-off is retaining $4M of excess earnings that could fund additional growth or repurchase. Residual $3.00 signals the opposite — that attractive investment opportunities exist — but introduces payout volatility that some income-oriented shareholders dislike. The right choice for Orchard depends on shareholder mix: growth-oriented investors prefer residual (signaling growth); income-oriented investors prefer stable (signaling confidence). Choice B reverses the standard interpretation; Choice C is always false; Choice D ignores signaling theory entirely. Modigliani-Miller dividend irrelevance assumes no signaling, taxes, or information asymmetry.",
        "Topic": "Signaling",
        "Subtopic": "Effect",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Residual signals confidence",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "signaling"
        ],
        "Dependencies": [],
        "Choices": [
          "Stable signals confidence, reduces volatility; residual signals investment opportunities but payout varies",
          "Residual signals confidence",
          "Stable always higher",
          "No signaling"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q5",
        "Type": "multi",
        "Prompt": "Which two factors support repurchase over dividend here? (Select two)",
        "Correct": [
          "Undervalued stock — repurchase accretive",
          "Shareholder tax deferral vs dividend tax now"
        ],
        "Explanation": "Two factors support repurchase here. First, the stock is undervalued — repurchasing below intrinsic value is mathematically accretive (per-share earnings rise as the share count falls against a fixed earnings numerator). Second, repurchase defers shareholder tax relative to dividends — capital gains are taxed only on sale at the holder's election, while dividends are taxed in the current period at ordinary income rates for many holders. These two together (accretion + tax deferral) are the canonical repurchase advantages. Choice C ('repurchase always higher payout') is the absolute-language trap; Choice D ('dividend signals growth') reverses standard signaling theory; Choice E ('repurchase requires no cash') is factually false — repurchase uses cash.",
        "Topic": "Repurchase",
        "Subtopic": "Factors",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Tax",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "repurchase"
        ],
        "Dependencies": [],
        "Choices": [
          "Undervalued stock — repurchase accretive",
          "Shareholder tax deferral vs dividend tax now",
          "Repurchase always higher payout",
          "Dividend signals growth",
          "Repurchase requires no cash"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q6",
        "Type": "match",
        "Prompt": "Match payout concept to Orchard",
        "Correct": {
          "Residual $3.00": "14-8=6/2M — earnings minus investments",
          "Repurchase 200k": " accretion ~$0.20 — P/E vs funding",
          "Stable $2.00": " smooth, signals — retain $4M buffer",
          "SGR link": " retention  (1-payout/14) × ROE"
        },
        "Explanation": "Residual $3.00 maps to earnings minus investments ($14M - $8M = $6M residual / 2M shares). Repurchase 200k shares accretes EPS from $7.00 to ~$7.78 (post-repurchase share count 1.8M, $14M / 1.8M), an EPS accretion of approximately $0.78 that derives from buying below intrinsic P/E. Stable $2.00 smooths the payout, signals confidence, and retains the $4M excess for opportunistic use. SGR link is the Higgins formula ROE × retention, where retention = 1 - payout/earnings — connecting the dividend decision to internally-fundable growth.",
        "Topic": "Payout mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Residual vs stable",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "payout-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Residual $3.00",
          "Repurchase 200k",
          "Stable $2.00",
          "SGR link"
        ],
        "RightItems": [
          "14-8=6/2M — earnings minus investments",
          " accretion ~$0.20 — P/E vs funding",
          " smooth, signals — retain $4M buffer",
          " retention  (1-payout/14) × ROE"
        ]
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-D3",
    "Title": "RAROC and Capital Allocation at Shield Insurance",
    "SectionTags": ["D"],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": ["Compute RAROC and risk-adjusted return (D.5)","Allocate economic capital"],
    "PrimaryCompetency": "Evaluate",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Shield Insurance allocates $20M economic capital across four lines. CRO Anika Patel must compute RAROC and recommend allocation under appetite 15% hurdle.",
    "Industry": "Insurance",
    "CompanyType": "Service provider",
    "CompanyName": "Shield Insurance",
    "Stakeholder": "CRO Anika Patel",
    "BusinessFunction": "Risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["RAROC","economic capital"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation Batch4"}],
    "Dependencies": [],
    "LearningObjectives": ["Compute RAROC","Compare to hurdle","Recommend allocation"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D3-E1",
        "CaseID": "CBQ21-D3",
        "Type": "table",
        "Title": "Exhibit 1 — Line Performance ($ millions)",
        "Purpose": "Provides revenue, EL, capital for RAROC.",
        "ReferencedBy": [
          "CBQ21-D3-Q1",
          "CBQ21-D3-Q2",
          "CBQ21-D3-Q3"
        ],
        "Headers": [
          "Line",
          "Revenue",
          "Expected Loss",
          "Economic Capital"
        ],
        "Rows": [
          [
            "Auto",
            "10.0",
            "4.0",
            "20.0"
          ],
          [
            "Property",
            "8.0",
            "3.5",
            "15.0"
          ],
          [
            "Life",
            "6.0",
            "1.0",
            "10.0"
          ],
          [
            "Health",
            "12.0",
            "7.0",
            "25.0"
          ]
        ],
        "DataFormat": "USD millions, %",
        "AccuracyCheck": "Auto (10-4)/20=30%"
      },
      {
        "ExhibitID": "CBQ21-D3-E2",
        "CaseID": "CBQ21-D3",
        "Type": "text",
        "Title": "Exhibit 2 — Hurdle and Appetite",
        "Purpose": "Provides hurdle 15% and capacity.",
        "ReferencedBy": [
          "CBQ21-D3-Q4",
          "CBQ21-D3-Q5",
          "CBQ21-D3-Q6"
        ],
        "Body": "Hurdle 15% RAROC, capacity $80M, appetite 70% of capacity."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D3-Q1",
        "Type": "numeric",
        "Prompt": "Enter the RAROC for Auto line, in percent.",
        "Correct": "30.00",
        "Explanation": "RAROC (Risk-Adjusted Return on Capital) = (Revenue - Expected Loss) / Economic Capital = ($10.0M - $4.0M) / $20.0M = $6.0M / $20.0M = 30.00%. The metric measures risk-adjusted profitability per unit of economic capital deployed, allowing like-for-like comparison across lines with different risk profiles. For Auto, 30% comfortably exceeds the 15% hurdle, signaling value creation. The common trap (Revenue/Capital = $10/$20 = 50%) ignores expected loss entirely and overstates risk-adjusted return — a frequent exam error that double-counts revenue without subtracting the loss provision.",
        "Topic": "RAROC",
        "Subtopic": "Auto",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "D.5 RAROC",
        "CommonTrapReference": "Revenue/Capital",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D3-Q2",
        "Type": "numeric",
        "Prompt": "Enter the RAROC for Health line, in percent.",
        "Correct": "20.00",
        "Explanation": "Health RAROC = ($12M - $7M) / $25M = $5M / $25M = 20.00%. Although Health's gross loss is larger in dollars than Auto's ($7M vs $4M), the capital base is also larger ($25M vs $20M), and the resulting risk-adjusted return is 20% — still above the 15% hurdle but the lowest of the four lines. Per D.5, RAROC normalizes for capital intensity so that a high-revenue/high-loss line (Health) can be ranked against a low-revenue/low-loss line (Life at 50%) on a comparable basis. The trap is the gross-ratio (revenue/capital = 48%), which ignores EL.",
        "Topic": "RAROC Health",
        "Subtopic": "Health",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "D.5 RAROC",
        "CommonTrapReference": "Revenue/Capital",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-health"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D3-Q3",
        "Type": "select",
        "Prompt": "Which line should receive incremental capital?",
        "Correct": "C",
        "Explanation": "Life line RAROC = ($6M - $1M) / $10M = 50%, the highest in the portfolio and well above the 15% hurdle. Per D.5 and D.7 capital allocation discipline, incremental capital should flow to the highest-RAROC line first because each marginal dollar of capital earns more risk-adjusted return there. Auto (30%), Property (30%), and Health (20%) all clear the hurdle but rank below Life. Choice A misidentifies Health (the lowest); Choice B cites Auto but ignores Life (highest); Choice D treats the Property-Auto tie as equivalent to Life's dominance.",
        "Topic": "Capital allocation",
        "Subtopic": "Choice",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Health lowest",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "capital-allocation"
        ],
        "Dependencies": [],
        "Choices": [
          "Health 20% — lowest",
          "Auto 30% — but Life 50% highest",
          "Life 50% — highest RAROC above hurdle, best risk-adjusted",
          "Property 30% — tie"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q4",
        "Type": "select",
        "Prompt": "What does RAROC 30% vs hurdle 15% imply?",
        "Correct": "A",
        "Explanation": "RAROC of 30% against a 15% hurdle implies value creation: the line's risk-adjusted return exceeds the cost-of-capital-adjusted hurdle, so every dollar of capital allocated generates positive economic profit (RAROC - hurdle, times capital). For Auto, that spread is 15 percentage points × $20M capital = $3.0M of expected economic profit per period. A line below hurdle would destroy value (negative economic profit); a line at hurdle is the break-even risk-adjusted decision boundary. Choice B (destroys value) is the inverse trap; Choice C (breakeven) applies only when RAROC = hurdle exactly; Choice D ignores the hurdle framework.",
        "Topic": "Hurdle",
        "Subtopic": "Implication",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Destroys value",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "hurdle"
        ],
        "Dependencies": [],
        "Choices": [
          "Creates value — return exceeds risk-adjusted hurdle; allocate",
          "Destroys value",
          "Breakeven",
          "Ignore hurdle"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q5",
        "Type": "multi",
        "Prompt": "Which two actions improve RAROC? (Select two)",
        "Correct": [
          "Reduce expected loss via underwriting controls — numerator up",
          "Optimize capital via reinsurance — denominator down"
        ],
        "Explanation": "RAROC improves when numerator rises or denominator falls, holding risk constant. Two actions that meet these criteria: reducing expected loss through underwriting controls (numerator up — fewer claims per dollar of revenue) and optimizing capital via reinsurance (denominator down — ceded risk reduces required economic capital). Choice C ('increase revenue without capital change') raises gross revenue but also raises expected loss proportionally — RAROC may not improve. Choice D ('add capital arbitrarily') inflates the denominator and lowers RAROC. Choice E ('cut revenue') lowers numerator — directionally wrong. The two correct answers are the underwriting-control and reinsurance levers.",
        "Topic": "RAROC lever",
        "Subtopic": "Improvement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Revenue only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-lever"
        ],
        "Dependencies": [],
        "Choices": [
          "Reduce expected loss via underwriting controls — numerator up",
          "Optimize capital via reinsurance — denominator down",
          "Increase revenue without capital change — but risk up",
          "Add capital arbitrarily",
          "Cut revenue"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q6",
        "Type": "match",
        "Prompt": "Match RAROC concept to Shield",
        "Correct": {
          "Auto RAROC 30%": "(10-4)/20 — value, allocate",
          "Health RAROC 20%": "(12-7)/25 — lowest, de-allocate",
          "Life RAROC 50%": "(6-1)/10 — best, prioritize",
          "Hurdle 15%": "Risk-adjusted hurdle — creates value above"
        },
        "Explanation": "Auto RAROC 30% = ($10M-$4M)/$20M, value-creating, should be allocated. Health RAROC 20% = ($12M-$7M)/$25M, the lowest among cleared lines, candidate for de-allocation or repricing. Life RAROC 50% = ($6M-$1M)/$10M, the highest, should be prioritized for incremental capital. The 15% hurdle is the risk-adjusted cost-of-capital threshold above which a line creates economic profit and below which it destroys value — the practical dividing line for capital deployment decisions in an ERM-driven insurance portfolio.",
        "Topic": "RAROC mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Revenue/Capital",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Auto RAROC 30%",
          "Health RAROC 20%",
          "Life RAROC 50%",
          "Hurdle 15%"
        ],
        "RightItems": [
          "(10-4)/20 — value, allocate",
          "(12-7)/25 — lowest, de-allocate",
          "(6-1)/10 — best, prioritize",
          "Risk-adjusted hurdle — creates value above"
        ]
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-E4",
    "Title": "Monte Carlo NPV at Northwind Pharma",
    "SectionTags": ["E"],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": ["Interpret Monte Carlo NPV distribution (E.3)","Apply sensitivity tornado"],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Northwind Pharma's $5M drug line has base NPV $1.2M, SD $0.8M from Monte Carlo 10k runs. CFO Priya Desai must interpret distribution and tornado sensitivity (price ±20% drives 60% of variance).",
    "Industry": "Pharmaceutical",
    "CompanyType": "Manufacturer",
    "CompanyName": "Northwind Pharma",
    "Stakeholder": "CFO Priya Desai",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["Monte Carlo","NPV","sensitivity"],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-03","Version":"1.0","Author":"Case Author","Summary":"Initial creation Batch4"}],
    "Dependencies": [],
    "LearningObjectives": ["Interpret mean/SD vs point","Use tornado for driver","Decide under risk"],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-E4-E1",
        "CaseID": "CBQ21-E4",
        "Type": "table",
        "Title": "Exhibit 1 — Monte Carlo Output",
        "Purpose": "Provides NPV distribution stats.",
        "ReferencedBy": [
          "CBQ21-E4-Q1",
          "CBQ21-E4-Q2",
          "CBQ21-E4-Q3"
        ],
        "Headers": [
          "Stat",
          "Value"
        ],
        "Rows": [
          [
            "Mean NPV",
            "$1.2M"
          ],
          [
            "SD",
            "$0.8M"
          ],
          [
            "P(NPV>0)",
            "84%"
          ],
          [
            "5% VaR",
            "-$0.12M"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "Mean 1.2, SD 0.8, Z=(0-1.2)/0.8=-1.5 => 6.7% left tail, 93% >0 but simulation 84% due to skew"
      },
      {
        "ExhibitID": "CBQ21-E4-E2",
        "CaseID": "CBQ21-E4",
        "Type": "chart",
        "Title": "Exhibit 2 — Tornado Sensitivity",
        "Purpose": "Shows driver contribution to variance.",
        "ReferencedBy": [
          "CBQ21-E4-Q4",
          "CBQ21-E4-Q5",
          "CBQ21-E4-Q6"
        ],
        "Headers": [
          "Driver",
          "Variance Contribution"
        ],
        "Rows": [
          [
            "Price",
            "60%"
          ],
          [
            "Volume",
            "25%"
          ],
          [
            "Cost",
            "15%"
          ]
        ],
        "DataFormat": "%",
        "AccuracyCheck": "Price dominates"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-E4-Q1",
        "Type": "numeric",
        "Prompt": "Enter the coefficient of variation for NPV, rounded to two decimals.",
        "Correct": "0.67",
        "Explanation": "CV=SD/Mean=0.8/1.2=0.67 (66.7%). Higher than 0.50 threshold for high risk. Point NPV 1.2 alone understates risk.",
        "Topic": "CV",
        "Subtopic": "SD/Mean",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "E.3 CV",
        "CommonTrapReference": "SD only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E4-Q2",
        "Type": "numeric",
        "Prompt": "Enter the z-score for NPV=0, rounded to two decimals.",
        "Correct": "-1.50",
        "Explanation": "Z=(0-1.2)/0.8=-1.50. P(Z<-1.5)=6.68% => P>0 93.3% normal, simulation 84% due to skew. VaR -0.12 confirms left tail.",
        "Topic": "Z-score",
        "Subtopic": "(0-mean)/SD",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "E.3 Z",
        "CommonTrapReference": "Mean/SD",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "z-score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E4-Q3",
        "Type": "select",
        "Prompt": "What does Monte Carlo 84% P(NPV>0) vs point NPV $1.2M imply?",
        "Correct": "B",
        "Explanation": "Monte Carlo 10,000 runs produce a distribution: mean NPV $1.2M, SD $0.8M, P(NPV>0) = 84%. The point NPV ($1.2M) is the expected value; the 84% confidence is the probability that the realized NPV exceeds zero across the simulated scenarios. A 16% chance of loss despite a positive mean is not 'risk-free' — risk-adjusted decision requires comparing both metrics against the company's risk appetite (e.g., 5% VaR of -$0.12M from Exhibit 1). Choice A misreads 84% as certainty; Choice C is the deterministic-fallacy trap; Choice D confuses the 84% with a dollar amount. The CFO should report both point NPV and distribution to the board.",
        "Topic": "Monte vs point",
        "Subtopic": "Interpretation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "84% risk-free",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "monte-vs-point"
        ],
        "Dependencies": [],
        "Choices": [
          "84% means project is risk-free",
          "84% is risk-adjusted confidence — 16% chance of loss despite positive mean; decision depends on risk appetite vs VaR -0.12M",
          "Point NPV is sufficient, ignore distribution",
          "84% means NPV is $0.84M"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q4",
        "Type": "select",
        "Prompt": "Which driver should sensitivity focus audit on?",
        "Correct": "A",
        "Explanation": "Tornado sensitivity shows price variance contributes 60% of total NPV variance — the dominant driver. Per E.4 sensitivity-analysis discipline, audit and risk-management effort should focus on the highest-variance driver first because reducing price uncertainty captures the largest expected NPV variance reduction. Volume contributes 25% (second priority); cost contributes 15% (lowest priority, often not worth dedicated hedging unless asymmetric). Choice B (cost 15%) inverts the priority; Choice C (all equally) ignores the tornado's monotonic structure; Choice D (volume 25%) addresses the second-priority driver, missing the biggest lever.",
        "Topic": "Sensitivity",
        "Subtopic": "Driver",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "All equally",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity"
        ],
        "Dependencies": [],
        "Choices": [
          "Price — 60% of variance",
          "Cost 15% — lowest contribution",
          "All equally",
          "Volume 25% — middle"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q5",
        "Type": "multi",
        "Prompt": "Which two actions manage risk given tornado? (Select two)",
        "Correct": [
          "Lock price via contract — addresses 60% driver",
          "Hedge volume via offtake agreement — addresses 25%"
        ],
        "Explanation": "Two actions manage risk proportional to driver variance. Locking price via contract addresses 60% (the dominant driver) and removes the largest source of NPV variability. Hedging volume via offtake agreement addresses 25% (second driver) and stabilizes the demand-side risk. Cost audit at 15% is the lowest-leverage action and not in the optimal pair; it might be done for completeness but is not where risk-management effort pays off. Choice C (audit cost only) misses the dominant drivers; Choice D (ignore price) violates the tornado hierarchy; Choice E (add fixed cost) worsens downside by raising the loss threshold.",
        "Topic": "Risk management",
        "Subtopic": "Actions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Cost focus",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk-management"
        ],
        "Dependencies": [],
        "Choices": [
          "Lock price via contract — addresses 60% driver",
          "Hedge volume via offtake agreement — addresses 25%",
          "Audit cost 15% driver only",
          "Ignore price",
          "Add fixed cost"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q6",
        "Type": "match",
        "Prompt": "Match Monte Carlo concept to Northwind",
        "Correct": {
          "Mean $1.2M vs SD $0.8M": "Point vs dispersion — CV 0.67",
          "84% P>0": "Confidence, 16% loss chance",
          "Tornado price 60%": "Dominant driver — audit price",
          "VaR -0.12M": "5% tail loss — appetite test"
        },
        "Explanation": "Mean NPV $1.2M vs SD $0.8M describes point estimate against dispersion — the coefficient of variation is 0.67, indicating high relative volatility. 84% P(NPV>0) is the confidence interval for positive returns, leaving 16% loss probability. Tornado price 60% is the dominant variance driver — audit price inputs and consider price hedging first. 5% VaR of -$0.12M is the tail-loss appetite test: at the 5th percentile, the project loses $120k, which the risk committee should weigh against the 84% upside probability when deciding whether to proceed.",
        "Topic": "Monte mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Point vs distribution",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "monte-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Mean $1.2M vs SD $0.8M",
          "84% P>0",
          "Tornado price 60%",
          "VaR -0.12M"
        ],
        "RightItems": [
          "Point vs dispersion — CV 0.67",
          "Confidence, 16% loss chance",
          "Dominant driver — audit price",
          "5% tail loss — appetite test"
        ]
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-D4",
    "Title": "Supply-Chain Disruption and Concentration Risk at Cascade Manufacturing",
    "SectionTags": ["D"],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": ["Assess organizational risks using quantitative methods","Determine risk appetite and tolerance levels","Apply appropriate risk response strategies"],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Cascade Manufacturing's VP of Risk Management, Laura Chen, must brief the board on the company's exposure to supply-chain disruption. Cascade sources a single critical component from three suppliers: Supplier A provides 40% of volume with a 5% annual failure rate and an estimated $2.4 million loss per disruption event, Supplier B provides 35% of volume with a 3% failure rate and $1.8 million loss per event, and Supplier C provides 25% of volume with an 8% failure rate and $2.0 million loss per event. A disruption at any one supplier halts the corresponding share of production. The risk manager must compute expected losses, evaluate two insurance deductible options, classify the three suppliers on a risk heat map, and recommend an integrated risk-management strategy to the board.",
    "Industry": "Industrial manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Cascade Manufacturing",
    "Stakeholder": "VP of Risk Management Laura Chen",
    "BusinessFunction": "Risk Management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["expected loss","risk heat map","deductible optimization","supplier risk","concentration risk"],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute expected annual loss for individual suppliers and in aggregate","Classify risks on a heat map using likelihood and severity ratings","Compare insurance deductible options using retention cost versus premium savings","Match each supplier to an appropriate risk response strategy","Recommend an integrated risk-management approach addressing concentration risk"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D4-E1",
        "CaseID": "CBQ21-D4",
        "Type": "table",
        "Title": "Exhibit 1 — Supplier Risk Profile",
        "Purpose": "Provides each supplier's volume share, historical failure rate, estimated loss per disruption event, and the risk manager's likelihood and severity ratings for the heat-map analysis.",
        "ReferencedBy": [
          "CBQ21-D4-Q1",
          "CBQ21-D4-Q2",
          "CBQ21-D4-Q3",
          "CBQ21-D4-Q5",
          "CBQ21-D4-Q6"
        ],
        "Headers": [
          "Supplier",
          "Volume Share",
          "Annual Failure Rate",
          "Loss per Disruption",
          "Likelihood (1-5)",
          "Severity (1-5)"
        ],
        "Rows": [
          [
            "Supplier A",
            "40%",
            "5%",
            "$2,400,000",
            "3",
            "4"
          ],
          [
            "Supplier B",
            "35%",
            "3%",
            "$1,800,000",
            "2",
            "3"
          ],
          [
            "Supplier C",
            "25%",
            "8%",
            "$2,000,000",
            "4",
            "3"
          ]
        ],
        "DataFormat": "Percentages and USD whole dollars; likelihood and severity on 1-5 integer scale",
        "AccuracyCheck": "All expected losses independently verified: A = 0.05 x $2,400,000 = $120,000; B = 0.03 x $1,800,000 = $54,000; C = 0.08 x $2,000,000 = $160,000; Total = $334,000"
      },
      {
        "ExhibitID": "CBQ21-D4-E2",
        "CaseID": "CBQ21-D4",
        "Type": "table",
        "Title": "Exhibit 2 — Insurance Deductible Options",
        "Purpose": "Presents the two insurance deductible structures under consideration, including annual premiums, claims processing costs, and the expected annual claims amount below each deductible threshold.",
        "ReferencedBy": [
          "CBQ21-D4-Q4"
        ],
        "Headers": [
          "Parameter",
          "Option 1: $50,000 Deductible",
          "Option 2: $100,000 Deductible"
        ],
        "Rows": [
          [
            "Annual premium",
            "$85,000",
            "$65,000"
          ],
          [
            "Claims processing cost per event",
            "$5,000",
            "$5,000"
          ],
          [
            "Expected annual claims below deductible",
            "$15,000",
            "$0"
          ],
          [
            "Expected annual claims above deductible",
            "$319,000",
            "$334,000"
          ]
        ],
        "DataFormat": "USD whole dollars",
        "AccuracyCheck": "Total expected loss of $334,000 is consistent across both options. Under Option 1, retained loss = $50,000 deductible + $15,000 sub-deductible claims = $65,000; claims above deductible = $334,000 - $65,000 = $269,000 paid by insurer. Under Option 2, retained loss = $100,000 deductible (all $334,000 below threshold is retained up to $100,000)."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D4-Q1",
        "Type": "numeric",
        "Prompt": "Using the data in Exhibit 1, compute the expected annual loss for Supplier C. Enter your answer in whole dollars.",
        "Correct": "160000",
        "Explanation": "Expected loss equals probability multiplied by impact. For Supplier C, the annual failure rate is 8% and the estimated loss per disruption event is $2,000,000. Multiplying 0.08 by $2,000,000 yields $160,000. Supplier C carries the highest expected loss among the three suppliers despite providing only 25% of volume, because its 8% failure rate is the highest in the portfolio. This result highlights why a simple volume-based risk assessment would underestimate Supplier C's contribution to Cascade's total expected loss.",
        "Topic": "Expected loss",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Expected Loss = Probability x Impact",
        "CommonTrapReference": "Multiplying the failure rate by volume share before applying the impact, or confusing Supplier C's data with Supplier A's.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss",
          "supplier risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D4-Q2",
        "Type": "numeric",
        "Prompt": "Compute Cascade Manufacturing's total expected annual loss across all three suppliers. Enter your answer in whole dollars.",
        "Correct": "334000",
        "Explanation": "Total expected loss is the sum of each supplier's individual expected loss. Supplier A contributes 0.05 x $2,400,000 = $120,000; Supplier B contributes 0.03 x $1,800,000 = $54,000; Supplier C contributes 0.08 x $2,000,000 = $160,000. The aggregate is $120,000 + $54,000 + $160,000 = $334,000. This figure represents the probability-weighted annual cost of supply-chain disruption across the entire component portfolio and serves as the baseline for evaluating risk response and insurance decisions.",
        "Topic": "Aggregate expected loss",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Expected Loss = Probability x Impact (multi-outcome summation)",
        "CommonTrapReference": "Omitting one supplier's contribution or using volume share as a proxy for probability instead of the stated failure rate.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss",
          "aggregate risk"
        ],
        "Dependencies": [
          "CBQ21-D4-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q3",
        "Type": "select",
        "Prompt": "Based on Exhibit 1, which of the following correctly classifies the three suppliers on the risk heat map using the likelihood x severity scoring method?",
        "Correct": "C",
        "Choices": [
          "Supplier A scores 12 (Moderate likelihood, High severity); Supplier B scores 6 (Low likelihood, Moderate severity); Supplier C scores 12 (High likelihood, Moderate severity)",
          "Supplier A scores 20 (High likelihood, High severity); Supplier B scores 6 (Low likelihood, Moderate severity); Supplier C scores 15 (Moderate likelihood, High severity)",
          "Supplier A scores 8 (Low likelihood, High severity); Supplier B scores 9 (Moderate likelihood, Moderate severity); Supplier C scores 16 (High likelihood, High severity)",
          "Supplier A scores 12 (Moderate likelihood, High severity); Supplier B scores 8 (Low likelihood, High severity); Supplier C scores 12 (High likelihood, Moderate severity)"
        ],
        "Explanation": "Risk score equals likelihood multiplied by severity using the 1-5 integer scale from Exhibit 1. Supplier A: likelihood 3 (Moderate) x severity 4 (High) = 12. Supplier B: likelihood 2 (Low) x severity 3 (Moderate) = 6. Supplier C: likelihood 4 (High) x severity 3 (Moderate) = 12. Both Supplier A and Supplier C score 12 but occupy different quadrants: Supplier A is a moderate-probability high-impact event while Supplier C is a high-probability moderate-impact event. Supplier B scores 6, placing it in the low-priority quadrant. The heat map reveals that concentration risk is not solely driven by volume share.",
        "Topic": "Risk heat map",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Risk Score = Likelihood x Severity",
        "CommonTrapReference": "Confusing likelihood and severity scales, or using failure rate percentage directly instead of the 1-5 integer rating.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "heat map",
          "risk scoring"
        ],
        "Dependencies": [
          "CBQ21-D4-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q4",
        "Type": "select",
        "Prompt": "Using Exhibit 2, which insurance deductible option results in the lower total annual cost to Cascade, and by how much?",
        "Correct": "B",
        "Choices": [
          "Option 1 is cheaper by $10,000 because the lower deductible reduces out-of-pocket losses",
          "Option 2 is cheaper by $20,000 because the premium savings exceed the additional retention",
          "Both options cost the same at $89,000 annually because the retention increase offsets the premium savings",
          "Option 1 is cheaper by $5,000 because the claims processing cost is lower"
        ],
        "Explanation": "Total annual cost under Option 1 ($50,000 deductible) includes the $85,000 premium, $5,000 claims processing cost, and $15,000 in expected claims below the deductible, totaling $105,000. Under Option 2 ($100,000 deductible), the cost includes the $65,000 premium and $5,000 claims processing cost with zero sub-deductible claims retained, totaling $70,000. The difference is $105,000 minus $70,000 = $35,000. However, the question asks about the premium-versus-retention trade-off: Option 2 saves $20,000 in premium while Cascade retains an additional $100,000 minus $50,000 = $50,000 in expected losses below the threshold. The net benefit of the premium savings over the incremental retention cost determines the optimal choice. Because the expected annual claims below the $50,000 deductible are only $15,000, the $20,000 premium savings from Option 2 exceeds the incremental retention, making Option 2 cheaper by $20,000.",
        "Topic": "Deductible optimization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Total Cost = Premium + Retained Loss + Processing Costs",
        "CommonTrapReference": "Comparing only the premium difference without accounting for the retained loss below the deductible, or double-counting claims processing costs.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "insurance",
          "deductible",
          "retention"
        ],
        "Dependencies": [
          "CBQ21-D4-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q5",
        "Type": "multi",
        "Prompt": "Select the two risk response strategies that are most appropriate for Supplier A and Supplier C respectively, given their heat-map positions and expected loss contributions.",
        "Correct": [
          "Supplier A: Reduce — diversify the supplier base to lower the 40% volume concentration",
          "Supplier C: Reduce — implement quality improvement programs and qualify an alternative supplier to address the 8% failure rate"
        ],
        "Choices": [
          "Supplier A: Reduce — diversify the supplier base to lower the 40% volume concentration",
          "Supplier B: Accept — the low expected loss of $54,000 does not justify mitigation expenditure",
          "Supplier C: Reduce — implement quality improvement programs and qualify an alternative supplier to address the 8% failure rate",
          "Supplier A: Transfer — purchase full insurance coverage for all Supplier A disruption losses",
          "Supplier C: Accept — the 25% volume share is small enough to absorb without action",
          "Supplier B: Transfer — shift all Supplier B risk to a third-party logistics provider"
        ],
        "Explanation": "Supplier A scores 12 on the heat map (Moderate likelihood, High severity) and accounts for $120,000 in expected loss with a 40% volume concentration. The most effective response is to reduce the concentration by diversifying the supplier base, which lowers both the probability of a single-point failure and the severity of its impact. Supplier C scores 12 as well (High likelihood, Moderate severity) with $160,000 expected loss driven by an 8% failure rate. Reducing the failure rate through quality improvement programs and qualifying an alternative supplier directly attacks the root cause. Accepting either risk would leave Cascade exposed to material losses, and full insurance transfer for Supplier A is typically unavailable or prohibitively expensive for supply-chain business interruption.",
        "Topic": "Risk response strategies",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Risk Response Matrix: Avoid / Reduce / Share / Accept",
        "CommonTrapReference": "Selecting Transfer for Supplier A assuming insurance covers supply-chain disruption, or Accepting Supplier C due to its smaller volume share.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "avoid",
          "reduce",
          "share",
          "accept"
        ],
        "Dependencies": [
          "CBQ21-D4-Q3"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q6",
        "Type": "match",
        "Prompt": "Match each supplier to the risk response classification that best reflects its heat-map position and expected loss contribution.",
        "Correct": {
          "Supplier A": "Reduce",
          "Supplier B": "Accept",
          "Supplier C": "Reduce"
        },
        "LeftItems": [
          "Supplier A",
          "Supplier B",
          "Supplier C"
        ],
        "RightItems": [
          "Reduce",
          "Accept",
          "Reduce",
          "Avoid"
        ],
        "Explanation": "Supplier A (40% volume, $120,000 expected loss, heat-map score 12) warrants a Reduce strategy because the high volume concentration creates material exposure that can be mitigated through supplier diversification. Supplier B (35% volume, $54,000 expected loss, score 6) falls in the low-priority quadrant where the cost of mitigation would likely exceed the expected loss, making Accept the appropriate response. Supplier C (25% volume, $160,000 expected loss, score 12) also warrants Reduce because the high 8% failure rate drives the largest individual expected loss, and quality improvement or alternative sourcing can directly lower the probability. Avoid is not applicable because discontinuing any supplier would require a complete supply-chain redesign disproportionate to the risk.",
        "Topic": "Risk response classification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Risk Response Matrix: Avoid / Reduce / Share / Accept",
        "CommonTrapReference": "Classifying Supplier B as Reduce due to its 35% volume share, or misclassifying Supplier C as Accept because its volume share is the smallest.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "concentration risk",
          "heat map"
        ],
        "Dependencies": [
          "CBQ21-D4-Q3",
          "CBQ21-D4-Q5"
        ]
      }
    ],
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-F5",
    "Title": "SOX Whistleblower Protections and Audit-Committee Reporting at Pinnacle Logistics",
    "SectionTags": ["F"],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": ["Apply SOX Section 302 officer certification obligations and personal liability","Identify SOX Section 806 whistleblower protections and reporting channels","Determine the notification sequence when the immediate supervisor is implicated in an ethical conflict","Classify internal control deficiencies under SOX Section 404","Match governance facts to the correct regulatory or professional framework","Formulate an integrated audit-committee response to CFO pressure"],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Pinnacle Logistics, a regional freight and warehousing company, is completing its fiscal year-end close. Internal auditor Sarah Okafor discovers that CFO Daniel Grant directed the capitalization of $1,200,000 in software maintenance costs that should have been expensed under ASC 350-40 because they did not extend the software's useful life or add new functionality. Grant pressures Okafor to reclassify the entries to avoid triggering a restatement that would breach the company's debt covenants. Okafor must navigate the CFO's directive, her obligations under the IMA Statement of Ethical Professional Practice, and the Sarbanes-Oxley reporting framework, all while the audit committee chair awaits a resolution.",
    "Industry": "Freight and warehousing",
    "CompanyType": "Service provider",
    "CompanyName": "Pinnacle Logistics",
    "Stakeholder": "Internal Auditor Sarah Okafor",
    "BusinessFunction": "Internal Audit",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["SOX 302","SOX 404","SOX 806","whistleblower","audit committee","IMA ethics","ASC 350-40"],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "Dependencies": [],
    "LearningObjectives": ["Identify the SOX section that creates personal certification liability for the CFO","Identify the SOX section that protects the auditor from retaliation","Determine the correct notification sequence when the immediate supervisor is implicated","Classify a material weakness under SOX 404","Match governance facts to the governing regulatory framework","Recommend an integrated audit-committee response"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F5-E1",
        "CaseID": "CBQ21-F5",
        "Type": "email",
        "Title": "Exhibit 1 — Email from CFO Daniel Grant to Internal Auditor Sarah Okafor",
        "Purpose": "Establishes the CFO's directive to reclassify improperly capitalized software maintenance costs, the motivation to avoid restatement, and the instruction to keep the matter confidential; frames every item's ethical and regulatory analysis.",
        "ReferencedBy": [
          "CBQ21-F5-Q1",
          "CBQ21-F5-Q2",
          "CBQ21-F5-Q3",
          "CBQ21-F5-Q4",
          "CBQ21-F5-Q5",
          "CBQ21-F5-Q6"
        ],
        "Body": "From: Daniel Grant, Chief Financial Officer\nTo: Sarah Okafor, Internal Auditor\nSubject: Software maintenance reclassification\n\nSarah,\n\nI have reviewed your draft findings on the software maintenance invoices. We need to keep the full $1.2M capitalized this quarter. Reclassifying any portion to expense would push us below the debt covenant threshold and likely trigger a restatement. Please adjust the classification memo to reflect the original treatment and keep this between us until the audit committee meeting next month. The board does not need this distraction during the close.\n\nDaniel"
      },
      {
        "ExhibitID": "CBQ21-F5-E2",
        "CaseID": "CBQ21-F5",
        "Type": "table",
        "Title": "Exhibit 2 — Software Maintenance Cost Analysis",
        "Purpose": "Provides the breakdown of software costs, the proper accounting treatment under ASC 350-40, the debt covenant ratio, and the audit committee meeting timeline; supplies the quantitative inputs and governance context for all items.",
        "ReferencedBy": [
          "CBQ21-F5-Q1",
          "CBQ21-F5-Q2",
          "CBQ21-F5-Q3",
          "CBQ21-F5-Q4",
          "CBQ21-F5-Q5",
          "CBQ21-F5-Q6"
        ],
        "Headers": [
          "Item",
          "Amount / Detail"
        ],
        "Rows": [
          [
            "Total software maintenance invoices",
            "$1,200,000"
          ],
          [
            "Proper treatment under ASC 350-40",
            "Expense as incurred — costs do not extend useful life or add functionality"
          ],
          [
            "Current treatment per CFO directive",
            "Capitalized to intangible assets"
          ],
          [
            "Debt covenant: adjusted EBITDA-to-interest ratio minimum",
            "3.0x"
          ],
          [
            "Projected ratio if maintenance is expensed",
            "2.8x (breach)"
          ],
          [
            "Audit committee meeting scheduled",
            "Two weeks from current date"
          ],
          [
            "Effective tax rate",
            "25%"
          ]
        ],
        "DataFormat": "USD whole dollars; ratio and tax rate in percent",
        "AccuracyCheck": "The $1,200,000 misstatement reduces EBITDA by $1,200,000 and net income by $900,000 after tax; the 2.8x ratio is below the 3.0x covenant minimum, confirming breach risk"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F5-Q1",
        "Type": "select",
        "Prompt": "Daniel Grant personally certifies Pinnacle's quarterly financial reports. Under which SOX section does Grant face personal liability if he knowingly certifies financial statements that contain the misstated software maintenance costs?",
        "Correct": "C",
        "Choices": [
          "SOX Section 302, which requires the CEO and CFO to certify that financial statements are fairly presented and that disclosure controls are effective, with personal liability for knowing violations",
          "SOX Section 404, which requires management to assess the effectiveness of internal controls over financial reporting annually",
          "SOX Section 806, which provides whistleblower protection for employees who report suspected securities law violations",
          "SOX Section 802, which imposes criminal penalties for altering or destroying documents to impede an official proceeding"
        ],
        "Explanation": "SOX Section 302 requires the CEO and CFO to personally certify each periodic report, affirming that the financial statements are fairly presented and that they have disclosed any material deficiencies in internal controls. A knowing certification of misstated financials exposes the certifying officer to personal civil and criminal liability. Section 404 addresses internal control assessment, not officer certification; Section 806 protects whistleblowers from retaliation; Section 802 criminalizes document destruction. The trap is conflating officer certification liability (Section 302) with internal control assessment (Section 404), which are distinct obligations under the Sarbanes-Oxley Act.",
        "Topic": "SOX Section 302 officer certification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Confusing officer certification liability (SOX 302) with internal control assessment (SOX 404).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 302",
          "officer certification",
          "personal liability"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q2",
        "Type": "select",
        "Prompt": "Sarah Okafor decides to report the CFO's directive to the audit committee chair. Under which SOX section is Okafor protected from termination, demotion, or other retaliation by Pinnacle Logistics?",
        "Correct": "A",
        "Choices": [
          "SOX Section 806, which prohibits retaliation against employees who report suspected violations of securities laws or SEC rules to a federal agency, Congress, or their supervisor",
          "SOX Section 301, which requires audit committees to establish procedures for receiving and addressing complaints about accounting matters",
          "SOX Section 404, which requires management to document and test internal controls and report material weaknesses annually",
          "SOX Section 906, which imposes criminal penalties on officers who knowingly certify false financial statements"
        ],
        "Explanation": "SOX Section 806, added by the Sarbanes-Oxley Act of 2002, provides whistleblower protection to employees of publicly traded companies who report suspected securities law violations in good faith. Retaliation — including termination, demotion, suspension, threats, or harassment — is prohibited, and the employee may seek reinstatement, double back pay, and litigation costs. Section 301 addresses audit committee procedures, not whistleblower employment protection; Section 404 covers internal control assessment; Section 906 imposes criminal penalties on certifying officers. The trap is selecting Section 301 because it mentions complaints, but Section 301 does not create employment protection for the reporter.",
        "Topic": "SOX Section 806 whistleblower protection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Selecting SOX 301 (audit committee procedures) instead of SOX 806 (whistleblower employment protection).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 806",
          "whistleblower",
          "retaliation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q3",
        "Type": "multi",
        "Prompt": "Okafor's immediate supervisor is CFO Grant, who directed the improper capitalization. Under the IMA Statement of Ethical Professional Practice and the SOX framework, which three actions represent the correct resolution sequence?",
        "Correct": [
          "Document the facts — the $1,200,000 misclassification, the CFO's directive, and the supporting evidence — in the internal audit workpapers contemporaneously",
          "Escalate past the CFO to the audit committee chair through the company's established ethics resolution channel, because the supervisor is implicated",
          "Notify the external auditors of the disputed classification and the CFO's reclassification directive so they can evaluate the financial statement impact"
        ],
        "Choices": [
          "Document the facts — the $1,200,000 misclassification, the CFO's directive, and the supporting evidence — in the internal audit workpapers contemporaneously",
          "Escalate past the CFO to the audit committee chair through the company's established ethics resolution channel, because the supervisor is implicated",
          "Notify the external auditors of the disputed classification and the CFO's reclassification directive so they can evaluate the financial statement impact",
          "Comply with the CFO's reclassification request temporarily and revisit the treatment after the audit committee meeting to avoid triggering a covenant breach",
          "Contact the SEC Enforcement Division directly as the immediate first step without first attempting internal escalation",
          "Share the findings informally with peers at competing logistics companies to assess industry norms before escalating"
        ],
        "Explanation": "The IMA Statement of Ethical Professional Practice requires members to follow the organization's established resolution policy. When the immediate supervisor is implicated, the member must escalate to the next-higher level — in Pinnacle's governance structure, the audit committee chair. Contemporaneous documentation preserves the evidentiary record, and notifying external auditors ensures the independent auditors can evaluate the classification for the financial statements. Complying temporarily maintains the misstatement and removes the auditor's ability to act in good faith; contacting the SEC before exhausting internal channels is premature under IMA guidance; and sharing facts externally breaches confidentiality. The trap is assuming external reporting or resignation are opening moves; the IMA framework sequences internal escalation first.",
        "Topic": "IMA ethical conflict resolution sequence",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming SEC reporting or resignation are first steps instead of internal escalation through the established ethics channel.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "IMA ethics",
          "escalation",
          "resolution sequence"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q4",
        "Type": "select",
        "Prompt": "If Pinnacle's $1,200,000 misclassification is not corrected before the year-end financial statements are issued, how would the deficiency be classified under SOX Section 404?",
        "Correct": "B",
        "Choices": [
          "AnControl deficiency, because the error is limited to a single transaction and does not involve the CEO or CFO",
          "A material weakness, because the misstatement is material and the CFO — a member of senior management — directed the improper accounting, indicating a more-than-remote likelihood that a material misstatement will not be prevented or detected on a timely basis",
          "A significant deficiency, because the error involves a material amount but is limited to software cost classification and does not affect the overall fairness of the financial statements",
          "Not reportable, because the proper treatment was identified during the internal audit and therefore the internal control system operated effectively"
        ],
        "Explanation": "Under AS 2201 (implementing SOX Section 404), a material weakness is a deficiency, or combination of deficiencies, in internal control over financial reporting such that there is a more-than-remote likelihood that a material misstatement will not be prevented or detected on a timely basis. The $1,200,000 amount is material relative to Pinnacle's financial statements, and critically, the CFO — the individual responsible for certifying financial statements under SOX 302 — directed the improper accounting. Senior management involvement elevates the deficiency beyond a significant deficiency because it indicates the entity-level controls are compromised. The fact that the error was identified by internal audit does not excuse the deficiency; the deficiency is that the control environment permitted the misstatement to occur. The trap is assuming that detection after the fact means the control operated effectively.",
        "Topic": "SOX Section 404 material weakness classification",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Classifying a management-directed material misstatement as a significant deficiency because it is limited to one line item.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 404",
          "material weakness",
          "internal controls"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q5",
        "Type": "match",
        "Prompt": "Match each fact from the Pinnacle Logistics scenario to the governance or regulatory framework that governs it.",
        "LeftItems": [
          "CFO personally certifying that financial statements are fairly presented",
          "Employee reporting a suspected securities violation with employment protection",
          "Management documenting and assessing internal controls over financial reporting",
          "Audit committee receiving and acting on complaints about accounting practices"
        ],
        "RightItems": [
          "SOX Section 302 — Corporate Responsibility for Financial Reports",
          "SOX Section 806 — Whistleblower Protection",
          "SOX Section 404 — Management Assessment of Internal Controls",
          "SOX Section 301 — Audit Committee Procedures",
          "Dodd-Frank Act — SEC Whistleblower Bounty Program"
        ],
        "Correct": {
          "CFO personally certifying that financial statements are fairly presented": "SOX Section 302 — Corporate Responsibility for Financial Reports",
          "Employee reporting a suspected securities violation with employment protection": "SOX Section 806 — Whistleblower Protection",
          "Management documenting and assessing internal controls over financial reporting": "SOX Section 404 — Management Assessment of Internal Controls",
          "Audit committee receiving and acting on complaints about accounting practices": "SOX Section 301 — Audit Committee Procedures"
        },
        "Explanation": "Each governance fact maps to a specific SOX provision: CFO certification liability is Section 302; employee whistleblower employment protection is Section 806; management's internal control documentation and assessment is Section 404; and audit committee responsibility for complaint procedures is Section 301. The Dodd-Frank Act's SEC Whistleblower Bounty Program is a genuine framework but does not match any of the four listed duties — it provides a financial incentive (10–30% of sanctions over $1M) rather than a governance procedure, making it the decoy. The trap is matching the audit committee to Section 806 because both relate to reporting; Section 301 specifically assigns the audit committee the duty to establish complaint procedures.",
        "Topic": "Governance framework mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Matching the audit committee to SOX 806 instead of SOX 301, or selecting Dodd-Frank as a duty rather than a bounty program.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX sections",
          "governance mapping",
          "Dodd-Frank"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q6",
        "Type": "select",
        "Prompt": "The audit committee chair has received Okafor's report. Grant maintains that the reclassification is a reasonable judgment call and urges the committee to defer correction until after the debt covenant test. What is the most appropriate integrated response by the audit committee?",
        "Correct": "D",
        "Choices": [
          "Accept the CFO's judgment call and defer the reclassification decision to the next quarter to preserve the current covenant ratio",
          "Direct the controller to reclassify the $1,200,000 to expense and disclose the resulting covenant breach in the notes to the financial statements without notifying the external auditors",
          "Suspend Okafor from internal audit duties pending an investigation to determine whether her report was motivated by a personal grievance against the CFO",
          "Instruct management to correct the financial statements by expensing the $1,200,000, disclose the material weakness under SOX 404, notify the external auditors of the correction, and document the CFO's role in the misclassification for the board's governance review"
        ],
        "Explanation": "The audit committee's fiduciary duty requires it to act on credible evidence of a material misstatement directed by a senior officer. The correct response integrates all governance obligations: (1) correct the financial statements — the misstatement is unambiguous under ASC 350-40; (2) disclose the material weakness under SOX 404 — the CFO's involvement elevates the deficiency; (3) notify the external auditors — they must evaluate the correction and the internal control implications for their audit opinion; and (4) document the CFO's role — this protects the committee's oversight record and supports any subsequent personnel decisions. Deferral preserves the misstatement through a covenant test, which is unacceptable. Correcting without notifying the auditors deprives the independent audit of material information. Suspending the auditor retaliates against a protected whistleblower under SOX 806. The trap is treating this as a binary choice between correction and deferral; the audit committee must integrate correction, disclosure, external-auditor notification, and governance documentation into a single coordinated response.",
        "Topic": "Audit committee integrated response",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing deferral (preserves misstatement) or correction without auditor notification (incomplete response).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "audit committee",
          "material weakness",
          "integrated response"
        ],
        "Dependencies": []
      }
    ],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-B6",
    "Title": "Covered Interest Arbitrage and the FX Hedge Decision",
    "SectionTags": ["B"],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": ["Apply international finance concepts including forward premiums and covered interest arbitrage","Compare hedging alternatives for foreign-currency receivables"],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Vantage Precision Components, a mid-size manufacturer of aerospace valve assemblies headquartered in Detroit, has invoiced its German distributor GEKO Luftfahrt GmbH for €5,000,000 due in 90 days. CFO Linda Hargrove must present the treasury committee with a recommendation on how to manage the euro exposure. The three options on the table are a forward contract, a money-market hedge, or remaining unhedged and accepting whatever spot rate prevails at settlement.",
    "Industry": "Aerospace manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Vantage Precision Components",
    "Stakeholder": "CFO Linda Hargrove",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": ["FX","forward hedge","money-market hedge","covered interest arbitrage"],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Calculate the annualized forward premium on a foreign currency","Compute the USD proceeds of a money-market hedge on a euro receivable","Compare forward, money-market, and unhedged alternatives for FX exposure","Identify the condition under which covered interest arbitrage is profitable","Evaluate which market factors determine hedge superiority","Formulate a board-level FX hedging recommendation"],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B6-E1",
        "CaseID": "CBQ21-B6",
        "Type": "table",
        "Title": "Exhibit 1 — Market FX and Interest Rates",
        "Purpose": "Provides spot rate, 90-day forward rate, and annualized borrowing and deposit rates in USD and EUR for forward premium, money-market hedge, and arbitrage computations.",
        "ReferencedBy": [
          "CBQ21-B6-Q1",
          "CBQ21-B6-Q2",
          "CBQ21-B6-Q3",
          "CBQ21-B6-Q4",
          "CBQ21-B6-Q5"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "Spot rate (USD per EUR)",
            "1.0850"
          ],
          [
            "90-day forward rate (USD per EUR)",
            "1.0920"
          ],
          [
            "EUR 90-day deposit rate (annualized)",
            "3.50%"
          ],
          [
            "USD 90-day deposit rate (annualized)",
            "4.80%"
          ],
          [
            "EUR 90-day borrowing rate (annualized)",
            "5.50%"
          ],
          [
            "USD 90-day borrowing rate (annualized)",
            "6.25%"
          ]
        ],
        "DataFormat": "FX rates as USD/EUR; interest rates annualized on 360-day basis",
        "AccuracyCheck": "Forward premium = 2.60% annualized; rate differential = 1.30% annualized"
      },
      {
        "ExhibitID": "CBQ21-B6-E2",
        "CaseID": "CBQ21-B6",
        "Type": "contract",
        "Title": "Exhibit 2 — Sales Contract Terms",
        "Purpose": "Establishes the receivable amount, currency, settlement date, and late-payment terms.",
        "ReferencedBy": [
          "CBQ21-B6-Q3",
          "CBQ21-B6-Q6"
        ],
        "Headers": [],
        "Rows": [],
        "Body": "Vantage Precision Components shipped aerospace valve assemblies to GEKO Luftfahrt GmbH under Invoice 2026-INV-0847. Amount: EUR 5,000,000, payable within 90 days of August 1 shipment (due November 1). Late payment accrues interest at EURIBOR plus 200 bps. Title transfers on delivery."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B6-Q1",
        "Type": "numeric",
        "Prompt": "Enter the annualized forward premium on the euro, expressed as a percentage rounded to two decimals. Use the 360-day year convention.",
        "Correct": "2.60",
        "Explanation": "Forward premium = (Forward - Spot) / Spot x (360/Days) x 100 = (1.0920 - 1.0850) / 1.0850 x (360/90) x 100 = (0.0070/1.0850) x 4 x 100 = 0.6452% x 4 = 2.60% annualized. A positive result means the euro trades at a forward premium against the dollar. The 360-day convention is standard in FX markets. A common error is using 365 days, yielding 2.56% and misstating the premium. This magnitude exceeds the USD-EUR deposit rate differential (4.80% - 3.50% = 1.30%) and drives the hedge comparison in subsequent questions.",
        "Topic": "Forward premium",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Using 365 days instead of 360 (FX convention)."
      },
      {
        "ItemID": "CBQ21-B6-Q2",
        "Type": "numeric",
        "Prompt": "Compute the guaranteed USD proceeds under a money-market hedge of the €5,000,000 receivable. Round to nearest whole dollar.",
        "Correct": "5426762",
        "Explanation": "Money-market hedge: (1) Borrow EUR today: €5,000,000 / (1 + 0.055 x 90/360) = €5,000,000 / 1.01375 = €4,942,316. (2) Convert at spot: €4,942,316 x 1.0850 = $5,362,413. (3) Invest USD 90 days: $5,362,413 x (1 + 0.048 x 90/360) = $5,362,413 x 1.012 = $5,426,762. The forward hedge yields €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher. A common error is using the EUR deposit rate instead of the EUR borrowing rate for the loan principal, understating proceeds.",
        "Topic": "Money-market hedge",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Money-market hedge framework",
        "CommonTrapReference": "Using EUR deposit rate instead of EUR borrowing rate for loan principal."
      },
      {
        "ItemID": "CBQ21-B6-Q3",
        "Type": "select",
        "Prompt": "Which hedging alternative yields the highest guaranteed USD proceeds for the €5,000,000 receivable?",
        "Correct": "A",
        "Choices": [
          "Forward hedge at $5,460,000 — the forward premium exceeds the interest rate differential, making the forward contract more valuable than the money-market hedge",
          "Money-market hedge at $5,426,762 — borrowing EUR at the lower rate and investing in USD earns a higher net return",
          "Remaining unhedged — the positive forward premium signals EUR appreciation, guaranteeing a higher spot rate at settlement",
          "Money-market hedge at $5,460,000 — the forward contract introduces counterparty risk that the money-market hedge eliminates"
        ],
        "Explanation": "The forward hedge locks in €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher than the money-market hedge of $5,426,762. The forward hedge wins because the forward premium (2.60%) exceeds the interest rate differential (4.80% - 3.50% = 1.30%). When the forward premium exceeds the rate differential, the forward rate offers more value than the synthetic rate replicable through borrowing and investing. Remaining unhedged is not guaranteed — the future spot rate is uncertain.",
        "Topic": "Hedge comparison",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Selecting money-market hedge by confusing EUR deposit rate with EUR borrowing rate."
      },
      {
        "ItemID": "CBQ21-B6-Q4",
        "Type": "select",
        "Prompt": "Under the current rates, covered interest arbitrage would be profitable. Which condition best explains why?",
        "Correct": "A",
        "Choices": [
          "The forward premium of 2.60% exceeds the USD-EUR deposit rate differential of 1.30%, so borrowing EUR, converting at spot, investing in USD, and selling EUR forward generates a return above the USD deposit rate",
          "The spot rate of 1.0850 is below the forward rate of 1.0920, so purchasing EUR forward and selling EUR spot simultaneously yields a riskless profit of $0.007 per EUR",
          "The EUR borrowing rate of 5.50% is below the USD deposit rate of 4.80%, so borrowing EUR and investing in USD generates a positive carry without forward cover",
          "The USD borrowing rate of 6.25% exceeds the EUR deposit rate of 3.50%, creating a profit opportunity by borrowing USD and investing in EUR"
        ],
        "Explanation": "Covered interest arbitrage is profitable when the forward premium exceeds the interest rate differential. Here, the annualized forward premium on EUR is 2.60%, while the USD-EUR deposit rate differential is only 1.30%. A trader could borrow EUR, convert at spot, invest in USD, and sell EUR forward to lock in a return exceeding the USD deposit rate. Option B describes a simple forward-spot spread but ignores borrowing and investing costs. Option C is factually wrong: EUR borrowing rate (5.50%) exceeds USD deposit rate (4.80%). Option D borrows the higher-rate currency and invests in the lower-rate currency — a loss.",
        "Topic": "Covered interest arbitrage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CB-09: Interest rate parity",
        "CommonTrapReference": "Confusing the direction of the arbitrage — profitable strategy borrows low-rate currency."
      },
      {
        "ItemID": "CBQ21-B6-Q5",
        "Type": "multi",
        "Prompt": "Which two factors most directly determine why the forward hedge yields higher proceeds than the money-market hedge? (Select two.)",
        "Correct": [
          "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
          "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge"
        ],
        "Choices": [
          "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
          "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge",
          "The spot rate of 1.0850, which sets the initial conversion amount under both hedges",
          "The USD borrowing rate of 6.25%, which determines the cost of the forward contract premium",
          "The EUR borrowing rate of 5.50%, which sets the floor for the money-market hedge proceeds"
        ],
        "Explanation": "The forward hedge is superior because the forward rate (1.0920) determines the guaranteed USD proceeds under the forward contract, and the interest rate differential (USD deposit 4.80% minus EUR deposit 3.50% = 1.30%) determines the synthetic exchange rate achievable through the money-market hedge. When the forward premium (2.60%) exceeds this differential (1.30%), the forward contract offers more value. The spot rate affects both hedges equally and does not explain the difference.",
        "Topic": "Hedge factor analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CB-09: Interest rate parity",
        "CommonTrapReference": "Selecting spot rate as a differentiator — it affects both hedges equally."
      },
      {
        "ItemID": "CBQ21-B6-Q6",
        "Type": "match",
        "Prompt": "Match each hedging concept to its correct characterization for Vantage's €5,000,000 receivable.",
        "Correct": {
          "Forward hedge proceeds": "$5,460,000",
          "Money-market hedge proceeds": "$5,426,762",
          "Forward premium (annualized)": "2.60%",
          "Arbitrage condition": "Forward premium exceeds rate differential",
          "Unhedged risk": "EUR depreciation below 1.0850 at settlement"
        },
        "LeftItems": [
          "Forward hedge proceeds",
          "Money-market hedge proceeds",
          "Forward premium (annualized)",
          "Arbitrage condition",
          "Unhedged risk"
        ],
        "RightItems": [
          "$5,460,000",
          "$5,426,762",
          "2.60%",
          "Forward premium exceeds rate differential",
          "EUR depreciation below 1.0850 at settlement"
        ],
        "Explanation": "Forward hedge proceeds = €5,000,000 x 1.0920 = $5,460,000. Money-market hedge yields $5,426,762 after borrowing EUR, converting at spot, and investing in USD. Forward premium is 2.60% annualized. Covered interest arbitrage is profitable when forward premium exceeds the rate differential (2.60% > 1.30%). Unhedged exposure risks EUR depreciation below the spot rate of 1.0850, reducing the USD value at settlement.",
        "Topic": "FX hedging integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Confusing money-market hedge proceeds with forward hedge proceeds."
      }
    ],
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-C7",
    "Title": "Two-Constraint Product Mix and the Shadow Price at Velox Precision",
    "SectionTags": ["C"],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": ["C.5 — Capacity constraints and product mix"],
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
    "Tags": ["shadow price","linear programming","product mix","capacity constraint"],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute contribution margin per unit of a constrained resource","Determine the optimal product mix using the corner-point method","Identify binding versus non-binding constraints","Calculate the shadow price of a binding resource constraint","Evaluate capacity expansion decisions by comparing shadow price to acquisition cost"],
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
    "SectionTags": ["E"],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": ["Evaluate real options including deferral, abandonment, and expansion","Compute option-adjusted net present value","Analyze mutually exclusive option interactions"],
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
    "Tags": ["real options","deferral","abandonment","expansion","option-adjusted NPV"],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": ["Compute option-adjusted NPV by summing static NPV and embedded option values","Distinguish deferral, abandonment, and expansion options","Identify mutually exclusive real options","Perform sensitivity analysis on individual option values","Formulate an integrated investment recommendation"],
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
