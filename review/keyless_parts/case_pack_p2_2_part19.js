ion": "1.0",
          "Author": "Case Author",
          "Summary": "Initial creation"
        },
        {
          "Date": "2026-09-24",
          "Version": "1.1",
          "Author": "DL-063 Remediation",
          "Summary": "Quarantined for CBQ22-C10-Q4 answer-key/explanation inversion: stored Correct B ($0.00) contradicts EC conclusion $6.00; correct answer absent from choices. Flung question_state Certifiedâ†’In Audit."
        },
        {
          "Date": "2026-09-25",
          "Version": "1.2",
          "Author": "DL-063 Recertification",
          "Summary": "Re-certified after DL-063 remediation: key flipped Bâ†’D, Choice D replaced with $6.00 shadow price, Explanation rewritten"
        }
      ],
      "question_state": "Certified",
      "certification_batch": "P2-CASE-CERT-20260921",
      "certification_date": "2026-09-21",
      "recertification_batch": "DL-065-RECERT",
      "recertification_date": "2026-09-28",
      "quarantine_batch": "DL-063-QUARANTINE",
      "quarantine_date": "2026-09-24",
      "quarantine_reason": "DL-063: CBQ22-C10-Q4 answer-key/explanation inversion â€” stored Correct B ($0.00) contradicts EC conclusion $6.00; correct answer absent from choices",
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
          "ExhibitID": "CBQ22-C10-E1",
          "CaseID": "CBQ22-C10",
          "Type": "table",
          "Title": "Exhibit 1 â€” Resource Requirements and Capacity",
          "Purpose": "Provides the per-unit resource requirements for each product on each machine and the total available hours per period.",
          "ReferencedBy": [
            "CBQ22-C10-Q1",
            "CBQ22-C10-Q2",
            "CBQ22-C10-Q3"
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
              "â€”"
            ]
          ],
          "DataFormat": "Hours per unit; demand in units; available in hours per period",
          "AccuracyCheck": "Constraints are consistent with corner-point solution â€” see analysis"
        },
        {
          "ExhibitID": "CBQ22-C10-E2",
          "CaseID": "CBQ22-C10",
          "Type": "table",
          "Title": "Exhibit 2 â€” Unit Economics",
          "Purpose": "Provides selling price and variable cost data for computing contribution margin per unit.",
          "ReferencedBy": [
            "CBQ22-C10-Q1",
            "CBQ22-C10-Q4"
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
          "ItemID": "CBQ22-C10-Q1",
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
          "ItemID": "CBQ22-C10-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the maximum total contribution margin Alpine can achieve under the given constraints.",
          "Correct": "32400",
          "Explanation": "Evaluating the feasible corner points with CM_A = $24 and CM_B = $18: (0, 0) = $0; (1,200, 0) = 1,200 x $24 = $28,800 (extrusion 2,400 <= 3,000; packaging 1,800 <= 2,400); (0, 800) = 800 x $18 = $14,400 (extrusion 2,400 <= 3,000; packaging 800 <= 2,400); (1,200, 200) = 1,200 x $24 + 200 x $18 = $28,800 + $3,600 = $32,400 (extrusion 1,200 x 2.0 + 200 x 3.0 = 3,000, binding; packaging 1,200 x 1.5 + 200 x 1.0 = 2,000 <= 2,400; demand A 1,200 <= 1,200, binding; demand B 200 <= 800). The maximum is $32,400 at 1,200 units of A and 200 units of B, where extrusion is the binding constraint. A common trap is ranking by CM per unit alone ($24 versus $18 favors A unconditionally) without testing constraint consumption — the corner-point evaluation is required because extrusion and demand jointly bind.",
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
            "CBQ22-C10-Q1"
          ]
        },
        {
          "ItemID": "CBQ22-C10-Q3",
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
          "ItemID": "CBQ22-C10-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "What is the shadow price of the binding extrusion constraint?",
          "Correct": "D",
          "Choices": [
            "$8.00 per hour â€” each additional extrusion hour increases total contribution margin by $8.00",
            "$0.00 per hour â€” the constraint is not truly limiting because packaging has slack",
            "$24.00 per hour â€” equal to the contribution margin per unit of Product A",
            "$6.00 per hour â€” the marginal CM from producing 1/3 additional unit of B (A's demand is already met)"
          ],
          "Explanation": "The shadow price is the marginal value of one additional unit of a binding constraint's resource. At the optimal mix of 1,200 units of A and 200 units of B, extrusion is fully utilized (1,200 x 2.0 + 200 x 3.0 = 3,000 hours exactly). If Alpine gains one additional extrusion hour (3,001 total), Product A's demand limit (1,200 units) is already binding — A cannot increase. The extra hour must go to Product B, which requires 3 hours per unit, yielding 1/3 additional unit of B. The CM increase = (1/3) x $18 = $6.00. The shadow price of the extrusion constraint is $6.00 per hour.\n\nWhy each distractor is wrong:\n• Choice A ($8.00) has no derivable basis from the exhibit data — it is not CM per extrusion hour for either product ($24/2 = $12 for A, $18/3 = $6 for B).\n• Choice B ($0.00) conflates two errors: (1) extrusion IS binding (3,000/3,000 hours consumed), and (2) packaging having slack does not nullify the value of the binding constraint. A non-zero shadow price on a binding constraint is fundamental — slack on a different constraint is irrelevant here.\n• Choice C ($24.00) equates the shadow price with the contribution margin per unit of Product A, ignoring the 2:1 resource consumption ratio — each A unit consumes 2 extrusion hours, so the per-hour value is $24/2 = $12, still not the final answer.\n• Choice D ($6.00) is correct: the marginal CM from using the extra hour for B (A's demand is exhausted, packaging has slack).",
          "Topic": "Shadow price",
          "Subtopic": "Interpretation",
          "Difficulty": "Very Difficult",
          "DifficultyScore": 5,
          "CognitiveLevel": "Analyze",
          "CalculationRequired": true,
          "FormulaReference": "Shadow Price = Î”Objective / Î”Constraint RHS",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 2,
          "Tags": [
            "shadow price",
            "sensitivity analysis"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C10-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "multi",
          "Prompt": "Which THREE statements about Alpine's product mix are correct under what-if analysis? Select exactly three.",
          "Correct": [
            "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
            "If Product B's contribution margin rises to $40 per unit, the optimal mix shifts toward producing more B",
            "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
          ],
          "Choices": {
            "A": "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
            "B": "Increasing packaging capacity will always improve the optimal objective value",
            "C": "If Product B's contribution margin rises to $40 per unit, the optimal mix shifts toward producing more B",
            "D": "The shadow price of the extrusion constraint remains constant for all possible increases in capacity",
            "E": "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
          },
          "Explanation": "Statement A is correct: with 3,600 extrusion hours, the binding constraint shifts from extrusion to Product A's demand limit of 1,200 units (1,200 × 2 = 2,400 hours for A, leaving 1,200 hours for B, or 400 units of B at 3 hours each). Statement C is correct: if B's CM rises to $40, the CM per extrusion hour for B becomes $40/3 = $13.33, exceeding A's $24/2 = $12 per hour — B becomes relatively more attractive on the binding extrusion constraint, shifting the mix toward B. Statement E is correct: without A's demand limit, all 3,000 extrusion hours go to A (3,000/2 = 1,500 units), yielding $36,000 CM — higher than the constrained optimum. Statement B is false: packaging already has slack; adding more slack does not improve the objective. Statement D is false: the shadow price changes once the constraint is relaxed beyond the range where it remains binding.",
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
          "ItemID": "CBQ22-C10-Q6",
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
      "CaseID": "CBQ22-C11",
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
      "Version": "1.2",
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
          "Version": "1.2",
          "Author": "Case Author",
          "Summary": "Initial creation"
        }
      ],
      "question_state": "Certified",
      "certification_batch": "P2-CASE-CERT-20260921",
      "certification_date": "2026-09-21",
      "recertification_batch": "DL-063-RECERT",
      "recertification_date": "2026-09-25",
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
          "ExhibitID": "CBQ22-C11-E1",
          "CaseID": "CBQ22-C11",
          "Type": "table",
          "Title": "Exhibit 1 â€” Market Probability Scenarios",
          "Purpose": "Provides the probability distribution over market-size scenarios and the corresponding NPV payoffs for each decision alternative.",
          "ReferencedBy": [
            "CBQ22-C11-Q1",
            "CBQ22-C11-Q2",
            "CBQ22-C11-Q3"
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
          "ExhibitID": "CBQ22-C11-E2",
          "CaseID": "CBQ22-C11",
          "Type": "text",
          "Title": "Exhibit 2 â€” Pilot Study Information",
          "Purpose": "Describes the pilot study's capabilities and limitations, providing context for interpreting the staged-entry option.",
          "ReferencedBy": [
            "CBQ22-C11-Q4",
            "CBQ22-C11-Q5",
            "CBQ22-C11-Q6"
          ],
          "Body": "The pilot study costs $1.5 million and takes 6 months. It provides a signal (favorable or unfavorable) about market demand, but the signal is not perfectly accurate: given a truly large market, the pilot signals favorable 80% of the time and unfavorable 20% of the time. Given a medium market, the pilot signals favorable 50% of the time and unfavorable 50% of the time. Given a small market, the pilot signals favorable 20% of the time and unfavorable 80% of the time. After receiving the pilot signal, Cascade decides whether to proceed with full entry (total additional investment of $12 million) or withdraw. If Cascade withdraws, the only cost is the $1.5 million pilot expense. The wait option costs nothing upfront but delays revenue by 12 months, resulting in discounted payoffs shown in Exhibit 1."
        }
      ],
      "Items": [
        {
          "ItemID": "CBQ22-C11-Q1",
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
          "ItemID": "CBQ22-C11-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the expected value of perfect information (EVPI), in millions of dollars.",
          "Correct": "2750000",
          "Explanation": "EVPI = EV with perfect information - EV without perfect information. With perfect information, Cascade knows the market state before committing: if large, enter immediately (NPV $28,000,000); if medium, enter immediately ($8,000,000); if small, wait 12 months ($1,000,000, which dominates entering at -$10,000,000 and the pilot withdrawal outcome of -$1,500,000). EV with PI = (0.30 x $28,000,000) + (0.45 x $8,000,000) + (0.25 x $1,000,000) = $8,400,000 + $3,600,000 + $250,000 = $12,250,000. EV without PI (best no-information alternative) = $9,500,000 (immediate entry, per Q1). EVPI = $12,250,000 - $9,500,000 = $2,750,000. Perfect information is worth $2.75M because it avoids the $10M small-market loss while preserving full upside — so any information source costing less than $2.75M (such as the $1.5M pilot) has positive expected value. A common trap is to use the maximum single payoff ($28M) instead of the probability-weighted best outcomes.",
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
            "CBQ22-C11-Q1"
          ]
        },
        {
          "ItemID": "CBQ22-C11-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "Based on the expected value analysis, which entry strategy should Cascade pursue?",
          "Correct": "C",
          "Choices": [
            "Wait 12 months â€” it has the lowest downside risk across all scenarios",
            "Enter immediately â€” it has the highest EMV at $9.5 million and should be selected regardless of risk attitude",
            "Conduct the pilot study â€” it reduces the expected loss in the small-market scenario while preserving upside in the large-market scenario, and the $1.5 million pilot cost is less than the EVPI of $2.75 million",
            "Enter immediately â€” the $28 million large-market payoff dominates all other alternatives"
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
          "Tags": [
            "decision tree",
            "strategy"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C11-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "If Cascade uses the maximin criterion (pessimistic), which alternative should it choose?",
          "Correct": "B",
          "Choices": [
            "Enter immediately â€” it has the highest possible payoff of $28 million",
            "Wait 12 months â€” its worst-case payoff of $1 million is better than the worst cases of immediate entry (−$10M) and pilot (−$1.5M)",
            "Conduct the pilot â€” its worst case of −$1.5M is better than immediate entry's −$10M",
            "Enter immediately â€” the expected value dominates the other alternatives"
          ],
          "Explanation": "The maximin criterion selects the alternative with the best worst-case payoff (maximize the minimum). Immediate entry's worst case is −$10M (small market). The pilot's worst case is −$1.5M (small market, unfavorable signal, withdraw). Wait's worst case is $1M (small market). Maximin = max(−$10M, −$1.5M, $1M) = $1M â†’ choose Wait. The maximin criterion is appropriate for risk-averse decision-makers who prioritize avoiding the largest loss. It ignores the probability distribution and the upside potential. A common exam trap is to confuse maximin (best worst case) with maximax (best best case), which would choose immediate entry for its $28M upside.",
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
          "ItemID": "CBQ22-C11-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
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
          "ItemID": "CBQ22-C11-Q6",
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
            "EVPI of $2.75 million is the maximum Cascade should rationally pay for any information source â€” imperfect or perfect â€” that helps distinguish between market scenarios"
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
      "CaseID": "CBQ22-C12",
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
      "ScenarioText": "Halcyon Group's Components Division manufactures specialized circuit boards used by its Assembly Division. The Components Division currently has idle capacity and can produce additional units at a variable cost of $22 per unit. The external market price for comparable boards is $35 per unit. The Assembly Division can purchase equivalent boards from an outside supplier at $33 per unit. The divisions operate in different tax jurisdictions â€” the Components Division at 21% and the Assembly Division at 30%. CFO Kenji Tanaka must resolve the transfer-pricing dispute that has stalled inter-divisional orders for three months.",
      "Industry": "Electronics manufacturing",
      "CompanyType": "Manufacturer",
      "CompanyName": "Halcyon Group",
      "Stakeholder": "CFO Kenji Tanaka",
      "BusinessFunction": "Cost accounting",
      "QuestionCount": 6,
      "ExhibitCount": 2,
      "ProductionStatus": "Draft",
      "Version": "1.2",
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
        "Compute minimum and maximum transfer prices under idle and full capacity",
        "Evaluate the negotiated transfer price range",
        "Analyze dual pricing as a resolution mechanism for divisional disputes",
        "Assess tax implications of cross-jurisdictional transfer pricing"
      ],
      "Exhibits": [
        {
          "ExhibitID": "CBQ22-C12-E1",
          "CaseID": "CBQ22-C12",
          "Type": "table",
          "Title": "Exhibit 1 â€” Divisional Financial Summary",
          "Purpose": "Provides each division's cost structure, capacity utilization, and current financial performance for transfer-price analysis.",
          "ReferencedBy": [
            "CBQ22-C12-Q1",
            "CBQ22-C12-Q2",
            "CBQ22-C12-Q5"
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
          "ExhibitID": "CBQ22-C12-E2",
          "CaseID": "CBQ22-C12",
          "Type": "table",
          "Title": "Exhibit 2 â€” Tax and Margin Comparison",
          "Purpose": "Shows the after-tax impact of different transfer prices on each division's profitability and the consolidated entity.",
          "ReferencedBy": [
            "CBQ22-C12-Q4",
            "CBQ22-C12-Q5",
            "CBQ22-C12-Q6"
          ],
          "Headers": [
            "Transfer Pric