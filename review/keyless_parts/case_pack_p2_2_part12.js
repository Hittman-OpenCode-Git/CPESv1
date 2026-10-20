atch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "decision factors",
          "real options"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C6-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "EVPI",
          "information value"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-C7",
    "Title": "Transfer Pricing Dispute at Halcyon Group",
    "SectionTags": [
      "C"
    ],
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
    "Tags": [
      "transfer pricing",
      "dual pricing",
      "tax arbitrage",
      "idle capacity"
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
        "Headers": [
          "Item",
          "Components Division",
          "Assembly Division"
        ],
        "Rows": [
          [
            "Variable cost per unit",
            "$22.00",
            "$48.00 (excl. circuit board)"
          ],
          [
            "Fixed cost per unit (allocated)",
            "$14.00",
            "$20.00"
          ],
          [
            "External purchase price (circuit board)",
            "N/A",
            "$33.00"
          ],
          [
            "Market selling price (circuit board)",
            "$35.00",
            "N/A"
          ],
          [
            "Current capacity utilization",
            "70%",
            "85%"
          ],
          [
            "Units needed per period",
            "5,000",
            "5,000"
          ],
          [
            "Tax rate",
            "21%",
            "30%"
          ]
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
        "Headers": [
          "Transfer Price",
          "Components Division After-Tax CM",
          "Assembly Division After-Tax Profit",
          "Consolidated After-Tax Impact"
        ],
        "Rows": [
          [
            "$22.00 (variable cost)",
            "$0",
            "$38,500",
            "$38,500 — benefit taxed at 30% in Assembly; lowest after-tax among feasible prices"
          ],
          [
            "$27.50 (midpoint)",
            "$21,725",
            "$19,250",
            "$40,975 — benefit split between divisions"
          ],
          [
            "$33.00 (external price)",
            "$43,450",
            "$0",
            "$43,450 — maximum after-tax benefit; surplus taxed at 21% in Components"
          ],
          [
            "$35.00 (market price)",
            "$51,350 (only if Assembly accepted)",
            "−$7,000 (worse than external)",
            "$0 — Assembly rejects; no transfer"
          ]
        ],
        "DataFormat": "After-tax amounts at stated transfer prices for 5,000 units",
        "AccuracyCheck": "Components after-tax CM = (TP − $22.00) × 5,000 × (1 − 0.21); Assembly impact = ($33.00 − TP) × 5,000 × (1 − 0.30). Verified: at $28.50 → $25,675 / $15,750; at $33.00 → $43,450 / $0; at $22.00 → $0 / $38,500. At $35.00 Assembly is worse than external sourcing (−$7,000) so no transfer occurs."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C7-Q1",
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
        "ItemID": "CBQ22-C7-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "transfer pricing",
          "maximum"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "negotiated range",
          "bilateral benefit"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q4",
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
        "ItemID": "CBQ22-C7-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "tax arbitrage",
          "transfer pricing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C7-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
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
        "Tags": [
          "recommendation",
          "dual pricing"
        ],
        "Dependencies": [
          "CBQ22-C7-Q1",
          "CBQ22-C7-Q2",
          "CBQ22-C7-Q5"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-C8",
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
    "ScenarioText": "Precision Fabricators has received a one-time special order for 2,000 precision brackets at $38.00 each — well below the normal selling price of $55.00. The plant is currently operating at 89% of practical capacity. The order requires a special setup costing $4,200, uses $12.00 of variable materials per unit, and would displace $9,300 of regular contribution margin from diverted production. VP of Operations Lisa Park must decide whether the order is financially attractive.",
    "Industry": "Metal fabrication",
    "CompanyType": "Manufacturer",
    "CompanyName": "Precision Fabricators",
    "Stakeholder": "VP of Operations Lisa Park",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
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
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_date": "2026-09-30",
    "certification_session": "P2-HAND-SOLVE-WAVE",
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
            "—"
          ],
          [
            "Normal contribution margin",
            "$31.00",
            "—"
          ]
        ],
        "DataFormat": "USD per unit; behavior indicates cost response to volume changes",
        "AccuracyCheck": "Variable cost per unit = $12.00 + $8.50 + $3.50 = $24.00; Normal CM = $55.00 − $24.00 = $31.00; Total standard cost = $24.00 + $11.00 = $35.00. Consistent."
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
            "13,300 units per year (89%)"
          ],
          [
            "Available capacity",
            "1,700 units"
          ],
          [
            "Special order quantity",
            "2,000 units"
          ],
          [
            "Regular CM per unit (displaced)",
            "$31.00"
          ],
          [
            "Total opportunity cost (displaced CM)",
            "$9,300"
          ],
          [
            "Special order setup cost",
            "$4,200"
          ]
        ],
        "DataFormat": "Units and USD; opportunity cost = displaced units × CM per unit",
        "AccuracyCheck": "Available capacity 1,700 < order 2,000 → 300 units of regular production displaced; opportunity cost = 300 × $31.00 = $9,300. 13,300 + 1,700 = 15,000 practical capacity; 13,300/15,000 = 88.7% ≈ 89%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C8-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the relevant cost per unit for producing the special order, including variable cost, opportunity cost allocation, and setup cost allocation.",
        "Correct": "30.75",
        "Explanation": "Relevant cost per unit = Variable cost + (Opportunity cost + Setup cost) ÷ units. Variable cost = $12.00 + $8.50 + $3.50 = $24.00. The 2,000-unit order exceeds the 1,700 units of available capacity, so 300 units of regular production are displaced. Opportunity cost = 300 × $31.00 = $9,300. Setup = $4,200. Relevant cost per unit = $24.00 + ($9,300 + $4,200) ÷ 2,000 = $24.00 + $6.75 = $30.75. The $38.00 offer exceeds $30.75, contributing $7.25 per unit. The $11.00 fixed-overhead allocation is irrelevant — total fixed cost does not change with the order. A common error is to include it, or to ignore the opportunity cost of displaced regular sales.",
        "Topic": "Relevant costing",
        "Subtopic": "Special order cost computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Relevant Cost = Variable Cost + (Opportunity Cost + Incremental Fixed Cost) ÷ Units",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing",
          "special order"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C8-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the net financial impact (gain or loss) from accepting the special order, in dollars.",
        "Correct": "14500",
        "Explanation": "Net gain = (Special order price − Relevant cost per unit) × Units = ($38.00 − $30.75) × 2,000 = $7.25 × 2,000 = $14,500. Alternatively: revenue $38.00 × 2,000 = $76,000 less variable cost $24.00 × 2,000 = $48,000, less opportunity cost $9,300, less setup $4,200 → $76,000 − $61,500 = $14,500. The positive result confirms the order is financially attractive: it adds $14,500 of incremental profit above all relevant costs. A common trap is to ignore the $9,300 opportunity cost, which would overstate the gain to $23,800.",
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
          "CBQ22-C8-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-C8-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the minimum price per unit Precision Fabricators should accept for the special order?",
        "Correct": "A",
        "Choices": [
          "$30.75 — the relevant cost including variable cost, opportunity cost, and setup cost per unit",
          "$24.00 — the variable cost per unit, because fixed costs are irrelevant",
          "$35.00 — the total standard cost per unit",
          "$38.00 — the offered price, which is the only relevant benchmark"
        ],
        "Explanation": "The minimum acceptable price equals the relevant cost per unit: variable cost $24.00 + opportunity cost $9,300 ÷ 2,000 = $4.65 + setup $4,200 ÷ 2,000 = $2.10 → $30.75. Below this price Precision loses money on the order after covering all incremental and opportunity costs. Choice B ($24.00) ignores opportunity and setup costs. Choice C ($35.00) wrongly includes the allocated fixed-overhead allocation. Choice D is the offered price, not the minimum threshold.",
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
        "ItemID": "CBQ22-C8-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which cost represents the opportunity cost of accepting the special order?",
        "Correct": "B",
        "Choices": [
          "The $11.00 per unit fixed overhead allocation that will continue regardless of the order",
          "The $9,300 in regular contribution margin that Precision sacrifices by diverting 300 units of regular production",
          "The $4,200 setup cost that must be incurred to produce the special order",
          "The $35.00 total standard cost per unit for the special order units"
        ],
        "Explanation": "Opportunity cost is the contribution margin foregone from the next-best use of the constrained resource. Because the 2,000-unit order exceeds the 1,700 units of available capacity, 300 regular units are displaced, sacrificing 300 × $31.00 = $9,300 of regular contribution margin (the normal CM per unit from Exhibit 1). Choice A describes a sunk/committed fixed cost — fixed overhead continues regardless. Choice C is an incremental cost specific to the order, not an opportunity cost. Choice D is the absorption cost, which includes irrelevant fixed allocations. A common trap is to confuse opportunity cost with incremental fixed costs.",
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
        "ItemID": "CBQ22-C8-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which THREE costs are relevant to Precision Fabricators' special-order decision? Select exactly three.",
        "Correct": [
          "The $12.00 per unit variable material cost that will be incurred only if the order is accepted",
          "The $9,300 in displaced regular contribution margin that Precision sacrifices by filling the order",
          "The $4,200 setup cost specific to the special order that would not exist without it"
        ],
        "Choices": {
          "A": "The $12.00 per unit variable material cost that will be incurred only if the order is accepted",
          "B": "The $11.00 per unit fixed overhead allocation that is assigned to all units regardless of the order",
          "C": "The $9,300 in displaced regular contribution margin that Precision sacrifices by filling the order",
          "D": "The $55.00 normal selling price because it establishes the value of the brackets",
          "E": "The $4,200 setup cost specific to the special order that would not exist without it"
        },
        "Explanation": "Relevant costs are future costs that differ between accepting and rejecting the order. The $12.00 variable material (A) is incurred only if the order is produced. The $9,300 displaced CM (C) is the lost contribution from the 300 regular units pushed out because the order exceeds available capacity. The $4,200 setup (E) is incremental to this order. Choice B is irrelevant: the $11.00/unit fixed overhead is allocated to all production and does not change with the order. Choice D is irrelevant: the normal selling price is a revenue parameter for regular sales, not a cost of the order. A common error is to include allocated fixed costs in relevant-cost analysis..",
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
        "ItemID": "CBQ22-C8-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which recommendation should Lisa present to the CFO?",
        "Correct": "C",
        "Choices": [
          "Reject the order because $38.00 is below the $55.00 normal selling price and would undermine pricing integrity",
          "Accept the order at $38.00 with no conditions, because any price above variable cost contributes to fixed costs",
          "Accept the order at $38.00 — it covers all relevant costs ($30.75 per unit) and generates $14,500 in incremental profit, provided Precision confirms the displaced regular sales can be rescheduled without customer penalties and the order does not set a precedent for future below-market pricing",
          "Accept the order only if the customer pays $55.00 — the standard price — because all customers should be treated equally"
        ],
        "Explanation": "Choice C is correct: the $38.00 price exceeds the $30.75 relevant cost, yielding $14,500 of incremental profit, while acknowledging the qualitative risks — displaced regular customers must be rescheduled without penalties (otherwise the opportunity cost rises and the gain shrinks) and the discount must not establish a below-market pricing precedent. Choice A overstates the risk: $38.00 is above relevant cost even though it is below the $55.00 normal price. Choice B ignores the qualitative risks. Choice D is unrealistic — the customer offered $38.00 and insisting on $55.00 would likely lose the order entirely.",
        "Topic": "Special order",
        "Subtopic": "Recommendation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,