const casePackP2_1 = [
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
    "certification_session": "P2-HAND-SOLVE-WAVE",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
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
    "certification_session": "P2-HAND-SOLVE-WAVE",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
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
    "certification_session": "P2-HAND-SOLVE-WAVE",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Holding man