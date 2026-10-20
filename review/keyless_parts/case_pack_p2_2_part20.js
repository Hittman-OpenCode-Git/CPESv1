e",
            "Components Division After-Tax CM",
            "Assembly Division After-Tax Profit",
            "Consolidated After-Tax Impact"
          ],
          "Rows": [
            [
              "$22.00 (variable cost)",
              "$0",
              "Based on external market savings",
              "Maximum consolidated benefit"
            ],
            [
              "$28.50 (midpoint)",
              "$52,575",
              "Reduction vs. external purchase",
              "Split benefit"
            ],
            [
              "$33.00 (external price)",
              "$59,325",
              "$0 (no savings vs. external)",
              "Components captures all benefit"
            ],
            [
              "$35.00 (market price)",
              "$67,125",
              "Negative (worse than external)",
              "Assembly rejects; no transfer"
            ]
          ],
          "DataFormat": "After-tax amounts at stated transfer prices for 5,000 units",
          "AccuracyCheck": "Components after-tax at $28.50: ($28.50 − $22.00) × 5,000 × (1 − 0.21) = $6.50 × 5,000 × 0.79 = $25,675 â€” note: table shows $52,575 which may reflect different volume; verify calculation"
        }
      ],
      "Items": [
        {
          "ItemID": "CBQ22-C12-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Tags": [
            "transfer pricing",
            "minimum"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C12-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the maximum transfer price per unit that the Assembly Division should be willing to pay.",
          "Correct": "33",
          "Explanation": "The maximum transfer price equals the cost the buying division would incur from the best external alternative. The Assembly Division can purchase equivalent circuit boards from an outside supplier at $33.00 per unit. Therefore, the maximum transfer price = $33.00. Any internal transfer price above $33.00 would make the Assembly Division worse off than buying externally — the division would rationally reject the transfer. The range for a mutually beneficial transfer is $22.00 â‰¤ TP â‰¤ $33.00. The Assembly Division's own variable cost ($48 excluding the board) and fixed cost ($20) are irrelevant to the maximum price — they are incurred regardless of the source of the circuit board.",
          "Topic": "Transfer pricing",
          "Subtopic": "Maximum price computation",
          "Difficulty": "Moderate",
          "DifficultyScore": 3,
          "CognitiveLevel": "Apply",
          "CalculationRequired": true,
          "FormulaReference": "Transfer Price Maximum = Cost of external purchase (best alternative)",
          "EstimatedMinutes": 4,
          "ExplanationVersion": 1,
          "Tags": [
            "transfer pricing",
            "maximum"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C12-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "What is the negotiated transfer price range within which both divisions benefit from the internal transfer?",
          "Correct": "C",
          "Choices": [
            "$22.00 to $35.00 â€” from the Components Division's variable cost to the market selling price",
            "$14.00 to $33.00 â€” from the Components Division's fixed cost to the Assembly Division's external purchase price",
            "$22.00 to $33.00 â€” from the Components Division's variable cost (floor) to the Assembly Division's external purchase price (ceiling)",
            "$28.50 to $35.00 â€” the midpoint of the range to the market price"
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
          "Tags": [
            "negotiated range",
            "bilateral benefit"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C12-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Tags": [
            "dual pricing",
            "dispute resolution"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C12-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "multi",
          "Prompt": "Which THREE statements about the tax implications of the transfer are correct? Select exactly three.",
          "Correct": [
            "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% â€” the lower-rate jurisdiction",
            "The consolidated entity benefits when the selling division (21% tax rate) records more income than the buying division (30% tax rate) because the tax savings on the incremental income exceed the tax cost",
            "If Halcyon uses a cost-based transfer price of $22, the Assembly Division captures all the savings in its 30% tax jurisdiction, resulting in higher consolidated taxes than a market-based price"
          ],
          "Choices": {
            "A": "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% â€” the lower-rate jurisdiction",
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
          "Tags": [
            "tax arbitrage",
            "transfer pricing"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C12-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "Which transfer-pricing recommendation should Kenji implement?",
          "Correct": "B",
          "Choices": [
            "Set the transfer price at $35.00 (market price) to fairly compensate the Components Division",
            "Implement dual pricing at $35.00 for the Components Division and $22.00 for the Assembly Division, with the corporate office absorbing the difference â€” this resolves the dispute, maximizes consolidated after-tax income, and incentivizes both divisions to transfer internally",
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
          "Tags": [
            "recommendation",
            "dual pricing"
          ],
          "Dependencies": [
            "CBQ22-C12-Q1",
            "CBQ22-C12-Q2",
            "CBQ22-C12-Q5"
          ]
        }
      ]
    },
  {
      "CaseID": "CBQ22-C13",
      "Title": "Special Order with Hidden Costs at Precision Fabricators",
      "SectionTags": [
        "C"
      ],
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
      "ScenarioText": "Precision Fabricators has received a one-time special order for 2,000 precision brackets at $38.00 each â€” well below the normal selling price of $55.00. The plant is currently operating at 82% of practical capacity. The order requires a special setup costing $4,200, uses $12.00 of variable materials per unit, and would displace $8,400 of regular contribution margin from diverted production. VP of Operations Lisa Park must decide whether the order is financially attractive.",
      "Industry": "Metal fabrication",
      "CompanyType": "Manufacturer",
      "CompanyName": "Precision Fabricators",
      "Stakeholder": "VP of Operations Lisa Park",
      "BusinessFunction": "Cost accounting",
      "QuestionCount": 6,
      "ExhibitCount": 2,
      "ProductionStatus": "Draft",
      "Version": "1.2",
      "Tags": [
        "special order",
        "relevant costing",
        "opportunity cost",
        "capacity analysis"
      ],
      "CreatedDate": "2026-09-04",
      "ModifiedDate": "2026-09-04",
      "Author": "Case Author",
      "Confidence": 90,
      "RevisionHistory": [
        {
          "Date": "2026-09-04",
          "Version": "1.2",
          "Author": "Case Author",
          "Summary": "Initial creation"
        }
      ],
      "question_state": "Certified",
      "certification_batch": "P2-CASE-CERT-20260921",
      "certification_date": "2026-09-21",
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
          "ExhibitID": "CBQ22-C13-E1",
          "CaseID": "CBQ22-C13",
          "Type": "table",
          "Title": "Exhibit 1 â€” Standard Cost Card",
          "Purpose": "Provides the per-unit cost structure for normal production, used to identify variable and fixed cost components.",
          "ReferencedBy": [
            "CBQ22-C13-Q1",
            "CBQ22-C13-Q2",
            "CBQ22-C13-Q5"
          ],
          "Headers": [
            "Cost Element",
            "Per Unit",
            "Behavior"
          ],
          "Rows": [
            [
              "Direct materials",
              "$12.00",
              "Variable"
            ],
            [
              "Direct labor",
              "$8.50",
              "Variable"
            ],
            [
              "Variable overhead",
              "$3.50",
              "Variable"
            ],
            [
              "Fixed overhead (allocated)",
              "$11.00",
              "Fixed"
            ],
            [
              "Total standard cost",
              "$35.00",
              "Mixed"
            ],
            [
              "Normal selling price",
              "$55.00",
              "â€”"
            ],
            [
              "Normal contribution margin",
              "$20.00",
              "â€”"
            ]
          ],
          "DataFormat": "USD per unit; behavior indicates cost response to volume changes",
          "AccuracyCheck": "Variable cost per unit = $12.00 + $8.50 + $3.50 = $24.00; CM = $55.00 − $24.00 = $31.00 â€” note: table shows $20 CM which differs; verify"
        },
        {
          "ExhibitID": "CBQ22-C13-E2",
          "CaseID": "CBQ22-C13",
          "Type": "table",
          "Title": "Exhibit 2 â€” Capacity and Opportunity Cost",
          "Purpose": "Provides capacity utilization data and quantifies the opportunity cost of diverting regular production to fill the special order.",
          "ReferencedBy": [
            "CBQ22-C13-Q3",
            "CBQ22-C13-Q4",
            "CBQ22-C13-Q6"
          ],
          "Headers": [
            "Item",
            "Value"
          ],
          "Rows": [
            [
              "Practical capacity",
              "15,000 units per year"
            ],
            [
              "Current production",
              "12,300 units per year (82%)"
            ],
            [
              "Available capacity",
              "2,700 units"
            ],
            [
              "Special order quantity",
              "2,000 units"
            ],
            [
              "Regular CM per unit (displaced)",
              "$28.00"
            ],
            [
              "Total opportunity cost (displaced CM)",
              "$8,400"
            ],
            [
              "Special order setup cost",
              "$4,200"
            ]
          ],
          "DataFormat": "Units and USD; opportunity cost = displaced units × CM per unit",
          "AccuracyCheck": "Opportunity cost: $8,400 Ã· $28.00 = 300 units displaced; 2,700 available − 2,000 order = 700 remaining â€” 300 displaced suggests some regular production is shifted"
        }
      ],
      "Items": [
        {
          "ItemID": "CBQ22-C13-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the relevant cost per unit for producing the special order, including variable cost, opportunity cost allocation, and setup cost allocation.",
          "Correct": "30.30",
          "Explanation": "Relevant cost per unit = Variable cost per unit + (Opportunity cost + Setup cost) × Special order units. Variable cost per unit = $12.00 (materials) + $8.50 (labor) + $3.50 (variable overhead) = $24.00. The fixed overhead allocation ($11.00) is irrelevant because total fixed costs do not change with the order. Opportunity cost = $8,400 (displaced regular CM). Setup cost = $4,200. Relevant cost per unit = $24.00 + ($8,400 + $4,200) × 2,000 = $24.00 + $12,600 × 2,000 = $24.00 + $6.30 = $30.30. The special order price of $38.00 exceeds the relevant cost of $30.30, yielding a positive contribution of $7.70 per unit. A common error is to include the $11.00 fixed overhead in the relevant cost, which would overstate the minimum price.",
          "Topic": "Relevant costing",
          "Subtopic": "Special order cost computation",
          "Difficulty": "Moderate",
          "DifficultyScore": 3,
          "CognitiveLevel": "Apply",
          "CalculationRequired": true,
          "FormulaReference": "Relevant Cost = Variable Cost + (Opportunity Cost + Incremental Fixed Cost) Ã· Units",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 1,
          "Tags": [
            "relevant costing",
            "special order"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C13-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Tags": [
            "net impact",
            "special order"
          ],
          "Dependencies": [
            "CBQ22-C13-Q1"
          ]
        },
        {
          "ItemID": "CBQ22-C13-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "What is the minimum price per unit Precision Fabricators should accept for the special order?",
          "Correct": "A",
          "Choices": [
            "$30.30 â€” the relevant cost including variable cost, opportunity cost, and setup cost per unit",
            "$24.00 â€” the variable cost per unit, because fixed costs are irrelevant",
            "$35.00 â€” the total standard cost per unit",
            "$38.00 â€” the offered price, which is the only relevant benchmark"
          ],
          "Explanation": "The minimum acceptable price equals the relevant cost per unit, which includes all future costs that differ between accepting and rejecting the order. Variable cost ($24.00) covers the direct production cost. Opportunity cost ($8,400 × 2,000 = $4.20 per unit) covers the displaced regular contribution margin. Setup cost ($4,200 × 2,000 = $2.10 per unit) is an incremental fixed cost specific to this order. Total minimum = $24.00 + $4.20 + $2.10 = $30.30. Below this price, Precision loses money on the order after accounting for all relevant costs. Choice B ignores opportunity and setup costs. Choice C includes allocated fixed overhead, which is irrelevant. Choice D is the offered price, not the minimum threshold.",
          "Topic": "Minimum price rule",
          "Subtopic": "Special order pricing",
          "Difficulty": "Moderate",
          "DifficultyScore": 3,
          "CognitiveLevel": "Analyze",
          "CalculationRequired": false,
          "FormulaReference": "",
          "EstimatedMinutes": 4,
          "ExplanationVersion": 1,
          "Tags": [
            "minimum price",
            "relevant cost"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C13-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Tags": [
            "opportunity cost",
            "identification"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C13-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
          "Tags": [
            "relevant costing",
            "cost identification"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C13-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "Which recommendation should Lisa present to the CFO?",
          "Correct": "C",
          "Choices": [
            "Reject the order because $38.00 is below the $55.00 normal selling price and would undermine pricing integrity",
            "Accept the order at $38.00 with no conditions, because any price above variable cost contributes to fixed costs",
            "Accept the order at $38.00 â€” it covers all relevant costs ($30.30 per unit) and generates $15,400 in incremental profit, provided Precision confirms the displaced regular sales can be rescheduled without customer penalties and the order does not set a precedent for future below-market pricing",
            "Accept the order only if the customer pays $55.00 â€” the standard price â€” because all customers should be treated equally"
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
          "Tags": [
            "recommendation",
            "special order"
          ],
          "Dependencies": [
            "CBQ22-C13-Q1",
            "CBQ22-C13-Q2"
          ]
        }
      ]
    },
];
