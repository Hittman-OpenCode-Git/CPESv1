{
          "A": "Ignore — off-BS, not debt",
          "B": "Add full $8M — recourse guarantee is debt-like for covenant economics; disclose per ASC460",
          "C": "Add 50% only",
          "D": "Add only if JV defaults"
        },
        "Explanation": "Choice B: add the full $8M. A full-recourse guarantee is debt-like for covenant economics — if the JV fails, Horizon pays — and ASC 460 requires disclosure of the obligation. Choice A ignores off-balance-sheet leverage entirely (the error the recast exists to fix). Choice C invents a 50% haircut with no basis. Choice D waits for default, but covenants test capacity today, not after the loss materializes.",
        "Topic": "Guarantee",
        "Subtopic": "Treatment",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Off-BS ignore",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "guarantee"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Does Horizon breach the D/E covenant on recast? Next step?",
        "Correct": "A",
        "Choices": {
          "A": "Breach 1.45 >1.40 — request waiver and restructure synthetic to on-BS loan or reduce guarantee",
          "B": "Pass 1.45 <1.40",
          "C": "Breach only if TIE also breaches",
          "D": "Covenant tested on reported only"
        },
        "Explanation": "Choice A: breach. Recast D/E = (42 + 8 + 5.2) / 38 = 55.2 / 38 = 1.45, which exceeds the 1.40 maximum in Exhibit 2 (reported 1.10 passes only by hiding the exposures). The next step is requesting a waiver and restructuring — converting the synthetic to an on-balance-sheet loan or reducing the guarantee. Choice B misreads the inequality (1.45 is greater than 1.40). Choice C invents a TIE gate; each covenant stands alone. Choice D is wrong: lenders test economic leverage, which is exactly what the recast measures.",
        "Topic": "Covenant breach",
        "Subtopic": "Action",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reported test",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "covenant-breach"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two recast adjustments are required? (Select two)",
        "Correct": [
          "Add $8M JV guarantee to debt",
          "Add PV $5.2M synthetic lease to debt (and ROU asset, net equity 0)"
        ],
        "Choices": {
          "A": "Add $8M JV guarantee to debt",
          "B": "Add PV $5.2M synthetic lease to debt (and ROU asset, net equity 0)",
          "C": "Deduct ROU $6M from equity",
          "D": "Ignore synthetic lease",
          "E": "Add undiscounted $8M+6M"
        },
        "Explanation": "Recasting requires adding the $8M JV guarantee to debt as a full-recourse debt-like exposure and adding the synthetic lease PV $5.2M to debt (with a corresponding ROU asset, so net equity is unchanged). Deducting the $6M ROU from equity double-counts, and adding undiscounted $8M+$6M overstates the liability by ignoring present value.",
        "Topic": "Required",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ROU vs PV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "required"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match recast concept to Horizon",
        "Correct": {
          "JV guarantee $8M": "Full recourse debt-like — add to D/E",
          "Synthetic lease $6M ROU": "PV $5.2M liability, equity unchanged",
          "Recast D/E 1.45": "Reported 1.10 → breach 1.40",
          "Lease vs loan": "Loan on-BS transparent vs synthetic off-BS"
        },
        "LeftItems": [
          "JV guarantee $8M",
          "Synthetic lease $6M ROU",
          "Recast D/E 1.45",
          "Lease vs loan"
        ],
        "RightItems": [
          "Full recourse debt-like — add to D/E",
          "PV $5.2M liability, equity unchanged",
          "Reported 1.10 → breach 1.40",
          "Loan on-BS transparent vs synthetic off-BS"
        ],
        "Explanation": "The JV guarantee $8M is full-recourse debt-like and added to D/E; the synthetic lease $6M ROU corresponds to a PV $5.2M liability leaving equity unchanged; recast D/E rises from reported 1.10 to 1.45, breaching the 1.40 covenant; a loan on-balance-sheet is transparent versus the synthetic off-balance structure.",
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
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-B2",
    "Title": "EOQ and Commercial Paper at BuildCore Construction",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute EOQ and total cost (B.5)",
      "Compare CP vs trade credit"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "BuildCore Construction uses 12,000 tons of rebar annually at $400/ton. Ordering cost $60, carrying 20%. Supplier offers 2/10 net 40. Treasurer Alicia Gomez can also issue 30-day CP at 5.8%. She must decide EOQ and funding.",
    "Industry": "Construction",
    "CompanyType": "Contractor",
    "CompanyName": "BuildCore Construction",
    "Stakeholder": "Treasurer Alicia Gomez",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "EOQ",
      "commercial paper"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute EOQ",
      "Compute EAR trade",
      "Compare CP vs trade"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B2-E1",
        "CaseID": "CBQ23-B2",
        "Type": "table",
        "Title": "Exhibit 1 — Rebar Demand and Costs",
        "Purpose": "Provides D, S, H for EOQ.",
        "ReferencedBy": [
          "CBQ23-B2-Q1",
          "CBQ23-B2-Q2",
          "CBQ23-B2-Q6"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "Annual demand D",
            "12,000 tons"
          ],
          [
            "Cost per ton",
            "$400"
          ],
          [
            "Ordering cost S",
            "$60 per order"
          ],
          [
            "Carrying rate",
            "20% of cost"
          ],
          [
            "Daily usage (360d)",
            "33.33 tons"
          ]
        ],
        "DataFormat": "USD, tons",
        "AccuracyCheck": "H=80; EOQ 134"
      },
      {
        "ExhibitID": "CBQ23-B2-E2",
        "CaseID": "CBQ23-B2",
        "Type": "table",
        "Title": "Exhibit 2 — Funding Alternatives",
        "Purpose": "Provides trade terms and CP rate.",
        "ReferencedBy": [
          "CBQ23-B2-Q3",
          "CBQ23-B2-Q4",
          "CBQ23-B2-Q6"
        ],
        "Headers": [
          "Source",
          "Terms"
        ],
        "Rows": [
          [
            "Trade",
            "2/10 net 40 (30-day credit beyond discount)"
          ],
          [
            "Commercial paper",
            "5.8% annual, 30-day"
          ],
          [
            "Bank line",
            "9.0%"
          ]
        ],
        "DataFormat": "Annual rates",
        "AccuracyCheck": "Trade EAR 24.49%"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the EOQ in tons, rounded to nearest ton.",
        "Correct": "134",
        "Explanation": "EOQ balances ordering against carrying: EOQ = sqrt(2DS / H). From Exhibit 1, H = 20% x $400 = $80 per ton-year. EOQ = sqrt(2 x 12,000 x 60 / 80) = sqrt(18,000) = 134.16, rounded to 134 tons. Treasurer Gomez orders ~134 tons about 90 times a year (12,000 / 134). The trap is using cost per ton as H directly ($400 instead of $80), which understates the order size fivefold, or forgetting to annualize the carrying rate.",
        "Topic": "EOQ",
        "Subtopic": "√2DS/H",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.5 EOQ",
        "CommonTrapReference": "H=400",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "eoq"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter total annual ordering+carrying cost at EOQ, in dollars (nearest).",
        "Correct": "10733",
        "Explanation": "At EOQ the two cost legs are equal: annual ordering = (12,000 / 134.16) x 60 = 89.44 x 60 = $5,366.56, and annual carrying = (134.16 / 2) x 80 = 67.08 x 80 = $5,366.56. Total = $10,733.12, rounded to $10,733. Equality of the legs is the EOQ optimality proof — any other quantity raises one leg more than it lowers the other. The trap is computing only one leg, or using rounded EOQ (134) inconsistently across both legs.",
        "Topic": "EOQ total cost",
        "Subtopic": "TC",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.5 TC",
        "CommonTrapReference": "D/Q vs Q/2",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "eoq-total-cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Should BuildCore take the 2% discount? Compare to CP.",
        "Correct": "B",
        "Choices": {
          "A": "Skip discount — 2% small vs 5.8% CP",
          "B": "Take discount — trade EAR 24.49% >> CP 5.8%; borrowing via CP to take discount saves ~18.7 points",
          "C": "Indifferent — 2% =5.8%",
          "D": "Take discount only if EOQ >200"
        },
        "Explanation": "Choice B: take the discount. Forgoing 2/10 net 40 costs (2 / 98) x (360 / 30) = 2.0408% x 12 = 24.49% annualized (Exhibit 2 AccuracyCheck) — far above the 5.8% commercial-paper rate, so borrowing via CP to pay within 10 days saves roughly 18.7 points. Choice A compares the 2% nominal to 5.8% directly, confusing a 30-day rate with an annual one. Choice C equates them; choice D invents an EOQ condition irrelevant to funding.",
        "Topic": "Discount vs CP",
        "Subtopic": "Choice",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "2% small",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "discount-vs-cp"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the effective financing cost if forgoing discount and paying at 40?",
        "Correct": "A",
        "Choices": {
          "A": "24.49% — (2/98)×360/30, so forgoing costs 24.49% annualized",
          "B": "5.8% — same as CP",
          "C": "2.0% — discount rate",
          "D": "9.0% — bank line"
        },
        "Explanation": "Choice A: 24.49%. Paying at day 40 instead of day 10 means borrowing the 98% for 30 days at a 2% price: (2 / 98) x (360 / 30) = 24.49% annualized. That is the effective financing cost of forgoing the discount. Choice B substitutes the CP rate (the alternative, not the cost). Choice C quotes the nominal 2% without annualizing over the 30-day credit window. Choice D grabs the bank-line rate, which prices a different facility entirely.",
        "Topic": "Trade EAR",
        "Subtopic": "Computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "2% vs 5.8%",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "trade-ear"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two EOQ assumptions are violated if demand is seasonal? (Select two)",
        "Correct": [
          "Constant demand — EOQ assumes even usage, seasonality requires dynamic lot-sizing",
          "Instant replenishment — if lead time variable, safety stock needed"
        ],
        "Choices": {
          "A": "Constant demand — EOQ assumes even usage, seasonality requires dynamic lot-sizing",
          "B": "Instant replenishment — if lead time variable, safety stock needed",
          "C": "EOQ assumes zero carrying cost",
          "D": "EOQ requires 2/10 trade terms",
          "E": "EOQ requires CP issuance"
        },
        "Explanation": "Constant demand is violated when seasonality occurs — EOQ assumes even usage, so dynamic lot-sizing is required; instant replenishment is violated when lead time varies, so safety stock is needed to avoid stockouts. EOQ does not assume zero carrying cost or require specific trade terms..",
        "Topic": "Assumptions",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "EOQ always",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "assumptions"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match BuildCore concept to value",
        "Correct": {
          "EOQ 134 tons": "√2DS/H at H=80",
          "Trade EAR 24.49%": "(2/98)×360/30 — forgo cost",
          "CP 5.8%": "Cheaper than trade, use to take discount",
          "Funding choice": "Borrow CP to capture discount, EOQ for quantity"
        },
        "LeftItems": [
          "EOQ 134 tons",
          "Trade EAR 24.49%",
          "CP 5.8%",
          "Funding choice"
        ],
        "RightItems": [
          "√2DS/H at H=80",
          "(2/98)×360/30 — forgo cost",
          "Cheaper than trade, use to take discount",
          "Borrow CP to capture discount, EOQ for quantity"
        ],
        "Explanation": "EOQ 134 tons is √2DS/H at H=80; trade EAR 24.49% is (2/98)×360/30, the annualized cost of forgoing the discount; CP at 5.8% is cheaper than trade, so the funding choice is to borrow via commercial paper to capture the discount while using EOQ for quantity.",
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
    ]
  },
  {
    "CaseID": "CBQ23-C5",
    "Title": "Target Costing and Kaizen at FreshHarvest Foods",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply target costing (C.3)",
      "Apply kaizen and learning curve"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "FreshHarvest Foods launches a $28 botanical serum. Market price $28, required margin $6, current cost $24, kaizen goal 5% yr, learning 90% on labor. Director Lina Park must close the $2 gap.",
    "Industry": "Food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "FreshHarvest Foods",
    "Stakeholder": "Director Ops Lina Park",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "target costing",
      "kaizen"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute target cost",
      "Apply kaizen reduction",
      "Distinguish target vs cost-plus"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-C5-E1",
        "CaseID": "CBQ23-C5",
        "Type": "table",
        "Title": "Exhibit 1 — Market and Cost",
        "Purpose": "Provides market price, margin, current cost.",
        "ReferencedBy": [
          "CBQ23-C5-Q1",
          "CBQ23-C5-Q2",
          "CBQ23-C5-Q3",
          "CBQ23-C5-Q6"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "Market price",
            "$28.00"
          ],
          [
            "Required profit",
            "$6.00"
          ],
          [
            "Current cost",
            "$24.00"
          ],
          [
            "Target cost",
            "$22.00"
          ]
        ],
        "DataFormat": "USD per unit",
        "AccuracyCheck": "Target 28-6=22 gap 2"
      },
      {
        "ExhibitID": "CBQ23-C5-E2",
        "CaseID": "CBQ23-C5",
        "Type": "table",
        "Title": "Exhibit 2 — Kaizen and Learning",
        "Purpose": "Provides kaizen 5% and learning 90% for cost reduction.",
        "ReferencedBy": [
          "CBQ23-C5-Q2",
          "CBQ23-C5-Q4",
          "CBQ23-C5-Q5"
        ],
        "Headers": [
          "Initiative",
          "Detail",
          "Year1 Effect"
        ],
        "Rows": [
          [
            "Kaizen program",
            "5% reduction in conversion $12",
            "$0.60"
          ],
          [
            "Learning curve",
            "90% on labor $8, double volume",
            "$7.20"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "Kaizen $0.60 + learning $0.80=1.40 of 2.00 gap"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-C5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the target cost, in dollars.",
        "Correct": "22.00",
        "Explanation": "Target cost = market price less required profit: 28.00 - 6.00 = 22.00 — stated outright in Exhibit 1 and confirmed by its AccuracyCheck (gap 2.00 against current cost 24.00). Director Park's entire program works backward from this $22.00 ceiling. The trap is computing cost-plus (24 + 6 = 30) or carrying current cost forward; target costing starts from the market, never from incurred cost.",
        "Topic": "Target cost",
        "Subtopic": "Market minus profit",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.3 target",
        "CommonTrapReference": "Cost-plus",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "target-cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the Year1 kaizen-adjusted cost, in dollars.",
        "Correct": "23.40",
        "Explanation": "Year-1 kaizen attacks conversion cost only: 5% of $12.00 = $0.60 per Exhibit 2. Adjusted cost = 24.00 - 0.60 = 23.40, still $1.40 above the $22.00 target — which is why learning-curve savings must stack on top (Q5). The trap is applying 5% to the full $24.00 ($1.20): kaizen programs target controllable conversion activities, not materials already at market. Choice D mistakes the $6.00 profit requirement for a cost reduction.",
        "Topic": "Kaizen cost",
        "Subtopic": "Yr1 reduction",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.3 kaizen",
        "CommonTrapReference": "Target 22",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "kaizen-cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which costing approach is correct for FreshHarvest's launch?",
        "Correct": "B",
        "Choices": {
          "A": "Cost-plus 24+6=30, price at $30",
          "B": "Target 22 — design to $22 via kaizen/learning/value engineering; cost-plus ignores market price",
          "C": "Take current 24 as target",
          "D": "Add kaizen to cost 24.60"
        },
        "Explanation": "Choice B: target costing. With a $28.00 market price the product must be designed to the $22.00 target through kaizen, learning, and value engineering — price is given, cost is the variable. Choice A (cost-plus 24 + 6 = 30) prices $2.00 above market and concedes the launch. Choice C surrenders by accepting current cost as target. Choice D moves the wrong direction, adding kaizen to cost (24.60) instead of subtracting it. The approach trap is inside-out thinking: market-back, never cost-forward.",
        "Topic": "Target vs cost-plus",
        "Subtopic": "Choice",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Cost-plus",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "target-vs-cost-plus"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the kaizen cost reduction in Year1?",
        "Correct": "A",
        "Choices": {
          "A": "$0.60 — 5% of $12 conversion",
          "B": "$1.20 — 5% of $24 total",
          "C": "$0.00 — kaizen not quantified",
          "D": "$6.00 — profit margin"
        },
        "Explanation": "Choice A: $0.60 — 5% applied to the $12.00 conversion base per Exhibit 2, the only kaizen-eligible cost pool. Choice B misapplies the rate to total cost ($24.00), double-counting materials outside the program. Choice C denies that kaizen is quantified when Exhibit 2 states the Year-1 effect outright. Choice D confuses the $6.00 required profit with a cost reduction. Read the base before the rate: kaizen percentages attach to conversion, not to total unit cost.",
        "Topic": "Kaizen",
        "Subtopic": "Amount",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "5% of 24",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "kaizen"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two actions close the target gap? (Select two)",
        "Correct": [
          "Value-engineer packaging — save $0.80 while preserving function",
          "Negotiate material -10% via volume — save $0.70"
        ],
        "Choices": {
          "A": "Value-engineer packaging — save $0.80 while preserving function",
          "B": "Negotiate material -10% via volume — save $0.70",
          "C": "Raise price to $30",
          "D": "Allocate fixed cost arbitrarily",
          "E": "Add overhead to target"
        },
        "Explanation": "Value-engineering packaging saves $0.80 while preserving function, and negotiating material -10% via volume saves $0.70 on the $7 material cost. Raising price to $30 ignores the $28 market, and allocating fixed cost arbitrarily does not close the $2 target gap, which must be addressed via design-to-cost actions..",
        "Topic": "Actions",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Price increase",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "actions"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match FreshHarvest concept to value",
        "Correct": {
          "Target cost $22": "28 market -6 profit",
          "Gap $2": "24 current -22 target",
          "Kaizen $0.60": "5% of $12 conversion",
          "Learning $0.80": "90% labor reduces $8 to $7.20"
        },
        "LeftItems": [
          "Target cost $22",
          "Gap $2",
          "Kaizen $0.60",
          "Learning $0.80"
        ],
        "RightItems": [
          "28 market -6 profit",
          "24 current -22 target",
          "5% of $12 conversion",
          "90% labor reduces $8 to $7.20"
        ],
        "Explanation": "Target cost $22 is market price $28 minus required profit $6; the $2 gap is current cost $24 minus target $22; kaizen $0.60 is 5% of $12 conversion cost; learning $0.80 is the 90% curve reducing labor from $8.00 to $7.20 when volume doubles.",
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
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-D3",
    "Title": "Vendor Concentration at Atlas Components",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Identify vendor concentration risk (D.2)",
      "Build risk register and response"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Atlas Components sources 70% of chips from one supplier. Risk Mgr Omar Haddad must quantify concentration risk (L3 S5 $4M) and recommend dual-sourcing vs inventory buffer.",
    "Industry": "Electronics",
    "CompanyType": "Manufacturer",
    "CompanyName": "Atlas Components",
    "Stakeholder": "Risk Manager Omar Haddad",
    "BusinessFunction": "Risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "vendor risk",
      "concentration"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation Batch4"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute risk score and EL",
      "Build register",
      "Select response"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D3-E1",
        "CaseID": "CBQ23-D3",
        "Type": "table",
        "Title": "Exhibit 1 — Vendor Concentration",
        "Purpose": "Provides supplier share and risk rating.",
        "ReferencedBy": [
          "CBQ23-D3-Q1",
          "CBQ23-D3-Q2",
          "CBQ23-D3-Q3"
        ],
        "Headers": [
          "Supplier",
          "Share",
          "Single Source?",
          "Risk L",
          "Risk S"
        ],
        "Rows": [
          [
            "Alpha Chips",
            "70%",
            "Yes",
            "3",
            "5"
          ],
          [
            "Beta Chips",
            "20%",
            "No",
            "2",
            "3"
          ],
          [
            "Gamma Chips",
            "10%",
            "No",
            "1",
            "2"
          ]
        ],
        "DataFormat": "%",
        "AccuracyCheck": "Alpha L3 S5 score 15"
      },
      {
        "ExhibitID": "CBQ23-D3-E2",
        "CaseID": "CBQ23-D3",
        "Type": "table",
        "Title": "Exhibit 2 — Response Options",
        "Purpose": "Provides cost/effect of dual-source vs buffer.",
        "ReferencedBy": [
          "CBQ23-D3-Q4",
          "CBQ23-D3-Q5",
          "CBQ23-D3-Q6"
        ],
        "Headers": [
          "Response",
          "Cost",
          "Effect"
        ],
        "Rows": [
          [
            "Dual-source Alpha 70→40%",
            "$120k",
            "L 3→1"
          ],
          [
            "Safety stock 30 days",
            "$80k",
            "Impact $4M→$2M"
          ]
        ],
        "DataFormat": "USD annual",
        "AccuracyCheck": "Dual L3→1 score 15→5"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the risk score for Alpha Chips (L×S).",
        "Correct": "15",
        "Explanation": "Risk score = Likelihood x Severity on the 1-5 scale. Alpha Chips is L3 S5 per Exhibit 1, so the score is 3 x 5 = 15 — the highest in the register and the AccuracyCheck confirmation. Haddad reads 15 as top-priority attention, not as a dollar amount. The trap flagged in CommonTrapReference is adding (3 + 5 = 8) instead of multiplying; addition understates catastrophic-but-unlikely combinations the matrix is built to surface.",
        "Topic": "Risk score",
        "Subtopic": "Alpha",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "CommonTrapReference": "L+S",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk-score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the expected loss for Alpha if impact $4M and prob 8% (L3).",
        "Correct": "320000",
        "Explanation": "Expected loss = impact x probability. L3 maps to 8% and the impact is $4M, so EL = 0.08 x 4,000,000 = $320,000 — matching the residual EL in Exhibit 2's risk profile. This is the planning figure for reserves and response budgeting. The trap is using impact alone ($4M) without probability-weighting, which overstates the loss by more than tenfold and would misprice every response option in Q4-Q6.",
        "Topic": "EL",
        "Subtopic": "Alpha",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01",
        "CommonTrapReference": "Impact only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "el"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which risk register entry is most urgent?",
        "Correct": "A",
        "Explanation": "Choice A: Alpha. At 70% single-source with L3S5 (score 15) and $320k EL, Alpha dominates every register dimension — concentration, score, and dollars — so it is most urgent. Beta (20%, L2S3) and Gamma (10%, L1S2) are lower on all three axes. Choice D ('all equal') ignores the register's entire ranking logic; a register that cannot prioritize is decorative. The trap is treating single-source status alone as the ranking key rather than the scored combination.",
        "Topic": "Register priority",
        "Subtopic": "Urgent",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "All equal",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "register-priority"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Alpha 70% single source L3S5 score 15 EL 320k — top priority",
          "B": "Beta 20% — low",
          "C": "Gamma 10% — low",
          "D": "All equal"
        }
      },
      {
        "ItemID": "CBQ23-D3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which response classification is dual-sourcing Alpha?",
        "Correct": "A",
        "Explanation": "Choice A (Reduce): dual-sourcing lowers the likelihood leg (L3 to L1) by removing single-source fragility — the textbook Reduce response to a concentration risk. Choice B (Share) would transfer risk via insurance, which Exhibit 2 does not offer. Choice C (Avoid) means exiting the product, wildly disproportionate. Choice D (Accept) does nothing while a top-priority risk sits above tolerance. The classification trap is confusing the response verb with its cost row; match the MECHANISM (likelihood down) to the label.",
        "Topic": "Response",
        "Subtopic": "Taxonomy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Share",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "response"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Reduce — lowers likelihood L3→1",
          "B": "Share — insurance",
          "C": "Avoid — exit product",
          "D": "Accept — do nothing"
        }
      },
      {
        "ItemID": "CBQ23-D3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two metrics trigger escalation for Alpha? (Select two)",
        "Correct": [
          "Share 70% > appetite 50% — concentration breach",
          "Risk score 15 > tolerance 12"
        ],
        "Explanation": "Escalation triggers on breached thresholds. A: 70% concentration exceeds the 50% appetite — breach. B: score 15 exceeds tolerance 12 — breach. Both fire, so both are selected. Choice C states a true fact (single source invites a dual-sourcing plan) but it is not a threshold metric and triggers nothing by itself. Choices D and E cite Beta/Gamma, which breach nothing. The trap is selecting every true statement instead of only the metric breaches the prompt asks for..",
        "Topic": "Escalation",
        "Subtopic": "Metrics",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Share 70%",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
    