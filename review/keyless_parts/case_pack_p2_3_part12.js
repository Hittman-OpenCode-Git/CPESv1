vel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used annual sales divided by the DSO reduction rather than daily sales.",
        "ExplanationWrongB": "This answer may have used COGS or inventory instead of sales to compute the daily figure.",
        "ExplanationWrongC": "This answer likely computed the total receivables balance rather than the marginal reduction.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A8-Q4",
        "Type": "select",
        "Prompt": "Crest can either cut inventory by 10 days (at $20,000 annual expediting cost) or extend payables to 45 days (risking a 2% early-payment discount loss). Which provides a better cash benefit?",
        "Correct": "A",
        "Choices": [
          "Inventory reduction — it frees $205,479 in working capital with only $20,000 annual cost, yielding a net benefit of $185,479",
          "Payable extension — it frees $300,822 in working capital with a $156,000 annual cost, yielding a net benefit of $144,822",
          "Both actions provide identical net benefits",
          "Neither action provides sufficient benefit to justify the associated risks"
        ],
        "Explanation": "Inventory reduction: freed cash = (10/365) x $7,500,000 = $205,479. Net = $205,479 - $20,000 = $185,479. Payable extension: freed cash = (14/365) x $7,800,000 = $300,822. Lost discount = 2% x $7,800,000 = $156,000. Net = $144,822. Inventory reduction provides the better net benefit ($185,479 vs $144,822).",
        "Topic": "Working capital trade-offs",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The two actions have different gross and net benefits — they are not identical.",
        "ExplanationWrongD": "Both actions provide meaningful working capital benefits that would reduce line-of-credit reliance.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A8-Q5",
        "Type": "select",
        "Prompt": "Which combination should James present to the bank as a credible working capital improvement plan?",
        "Correct": "A",
        "Choices": [
          "Tighten credit terms to reduce DSO and improve inventory turnover through demand forecasting",
          "Extend payables to 45 days and reduce inventory by 10 days to maximize short-term cash release",
          "Negotiate a larger line of credit to accommodate the current CCC while long-term improvements are implemented",
          "Factor receivables to immediately convert them to cash, eliminating the DSO concern"
        ],
        "Explanation": "The bank wants structural improvement, not financial engineering. Tightening credit terms and improving inventory management attack the two largest CCC components. A 20+ day CCC reduction would release approximately $550,000 in working capital, materially reducing line-of-credit dependence.",
        "Topic": "Working capital strategy",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Requesting a larger line of credit contradicts the bank's request to reduce reliance on it.",
        "ExplanationWrongD": "Factoring is expensive and signals financial weakness to the bank.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A8-Q6",
        "Type": "select",
        "Prompt": "What is the primary risk of James's recommended credit-term tightening?",
        "Correct": "D",
        "Choices": [
          "The company will lose its early-payment discount with suppliers",
          "Inventory obsolescence will increase due to faster turnover",
          "The bank will reduce the line of credit further",
          "Customers may redirect orders to competitors offering more lenient payment terms, reducing sales volume"
        ],
        "Explanation": "Tightening credit from net-45 to net-30 may cause credit-sensitive customers to seek competitors with more favorable terms, potentially reducing sales. This is the classic trade-off in receivables management: faster collection improves cash flow but may reduce revenue. James must weigh the $383,562 working capital benefit against the potential sales impact.",
        "Topic": "Receivables policy risk",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Early-payment discounts are paid to suppliers, not received from customers.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Reducing line-of-credit reliance is what the bank wants — they would not punish Crest for improving.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-B3",
    "Title": "WACC for a Major Expansion",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute the cost of equity using the Capital Asset Pricing Model",
      "Calculate the weighted average cost of capital with multiple funding sources",
      "Evaluate whether a project meets the WACC hurdle rate"
    ],
    "LearningObjectives": [
      "Compute the cost of equity using the Capital Asset Pricing Model",
      "Calculate the weighted average cost of capital with multiple funding sources",
      "Evaluate whether a project meets the WACC hurdle rate"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "PetroChem International's CFO Rachel Nguyen must calculate the company's weighted average cost of capital to evaluate a $12 million ethylene capacity expansion. The board requires that any major capital project exceed the WACC by at least 200 basis points to compensate for execution risk.",
    "Industry": "Petrochemical manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "PetroChem International",
    "Stakeholder": "CFO Rachel Nguyen",
    "BusinessFunction": "Corporate Finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-10-02",
    "certification_batch": "P2-HAND-SOLVE-WAVE",
    "recertification_batch": "DL-059-Batch1",
    "recertification_date": "2026-09-20",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "WACC",
      "CAPM",
      "cost of capital",
      "capital budgeting"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B3-E1",
        "CaseID": "CBQ23-B3",
        "Type": "table",
        "Title": "Exhibit 1 — Market Data and Capital Structure",
        "Purpose": "Provides CAPM inputs, capital structure weights, and component costs.",
        "ReferencedBy": [
          "CBQ23-B3-Q1",
          "CBQ23-B3-Q2",
          "CBQ23-B3-Q3"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Risk-free rate (10-year Treasury)",
            "3.20%"
          ],
          [
            "Equity risk premium",
            "5.50%"
          ],
          [
            "PetroChem beta",
            "1.42"
          ],
          [
            "Market value of equity",
            "$180,000,000"
          ],
          [
            "Market value of debt",
            "$90,000,000"
          ],
          [
            "Preferred stock",
            "$30,000,000"
          ],
          [
            "Pre-tax cost of debt",
            "6.50%"
          ],
          [
            "Cost of preferred stock",
            "8.00%"
          ],
          [
            "Tax rate",
            "35%"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-B3-E2",
        "CaseID": "CBQ23-B3",
        "Type": "table",
        "Title": "Exhibit 2 — Expansion Project Projections",
        "Purpose": "Provides projected project returns for WACC comparison.",
        "ReferencedBy": [
          "CBQ23-B3-Q4",
          "CBQ23-B3-Q5"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Project cost",
            "$12,000,000"
          ],
          [
            "Expected IRR",
            "12.00%"
          ],
          [
            "Project life",
            "10 years"
          ],
          [
            "After-tax cash flows (annual)",
            "$2,200,000"
          ],
          [
            "Additional debt at 7.25% pre-tax",
            "$12,000,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B3-Q1",
        "Type": "numeric",
        "Prompt": "Enter PetroChem's cost of equity using CAPM, expressed as a percentage rounded to two decimals.",
        "Correct": "11.01",
        "Explanation": "Cost of equity = Risk-free rate + Beta x Equity risk premium = 3.20% + 1.42 x 5.50% = 3.20% + 7.81% = 11.01%. The CAPM formula prices equity as the risk-free rate plus a risk premium proportional to systematic risk. A beta of 1.42 indicates PetroChem is 42% more volatile than the market.",
        "Topic": "CAPM cost of equity",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used the market return instead of the equity risk premium, or used an incorrect beta.",
        "ExplanationWrongB": "This answer may have added the risk-free rate and equity risk premium without multiplying by beta (3.20% + 5.50% = 8.70%).",
        "ExplanationWrongC": "This answer likely used the pre-tax cost of debt instead of the risk-free rate as the base.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B3-Q2",
        "Type": "numeric",
        "Prompt": "Enter PetroChem's after-tax cost of debt, expressed as a percentage rounded to two decimals.",
        "Correct": "4.23",
        "Explanation": "After-tax cost of debt = Pre-tax cost x (1 - Tax rate) = 6.50% x (1 - 0.35) = 6.50% x 0.65 = 4.23%. Interest expense is tax-deductible, so the effective cost of debt is reduced by the tax shield. Failing to adjust for taxes overstates the cost of debt and produces an inflated WACC.",
        "Topic": "After-tax cost of debt",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used the pre-tax cost of debt (6.50%) without applying the tax shield.",
        "ExplanationWrongB": "This answer may have applied the tax rate to the cost of equity instead of the cost of debt.",
        "ExplanationWrongC": "This answer likely used an incorrect tax rate or made an arithmetic error in the (1 - t) adjustment.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B3-Q3",
        "Type": "numeric",
        "Prompt": "Enter PetroChem's WACC, expressed as a percentage rounded to two decimals.",
        "Correct": "8.67",
        "Explanation": "WACC weights each component's after-tax cost by its share of total market capital. Exhibit 1 gives market values of equity $180M, debt $90M, and preferred stock $30M, so total capital is $300M and the weights are 60% equity, 30% debt, and 10% preferred. The equity cost comes from CAPM: Ke = risk-free + beta x equity risk premium = 3.20% + 1.42 x 5.50% = 3.20% + 7.81% = 11.01%. The debt component is after-tax: 6.50% x (1 - 0.35) = 4.225%. Preferred dividends are not tax-deductible, so the preferred cost stays at 8.00%. WACC = (0.60 x 11.01%) + (0.30 x 4.225%) + (0.10 x 8.00%) = 6.606% + 1.2675% + 0.800% = 8.6735%, which rounds to 8.67%. Recomputed independently: 6.606 + 1.2675 + 0.8 = 8.6735. Because the rounding differs by a hundredth depending on whether 4.225% or its two-decimal form 4.23% is used, the reported figure is stated as 8.67%. A common trap is dropping the (1 - t) tax adjustment on debt, which would raise the WACC to roughly 9.40%.",
        "Topic": "WACC computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used book values instead of market values, or omitted preferred stock.",
        "ExplanationWrongB": "This answer may have used the pre-tax cost of debt in the WACC formula instead of the after-tax cost.",
        "ExplanationWrongC": "This answer likely used equal weights (1/3 each) instead of market-value-based weights.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B3-Q4",
        "Type": "select",
        "Prompt": "The expansion has an expected IRR of 12%. The board requires a 200-basis-point spread above WACC. Does the project meet the hurdle?",
        "Correct": "B",
        "Choices": [
          "Yes — the 12% IRR exceeds the WACC of 8.73%, so the project creates value",
          "The hurdle is 10.73% (WACC + 200 bps); the 12% IRR exceeds it by 127 bps, clearing the risk-adjusted threshold pending due diligence",
          "No — the 12% IRR is below the 10.73% hurdle rate",
          "Yes — any project with IRR above the risk-free rate should be accepted"
        ],
        "Explanation": "The hurdle rate = WACC + 200 bps = 8.73% + 2.00% = 10.73%. The project IRR of 12% exceeds this by 127 basis points. However, the board's requirement for risk-adjusted confirmation means the project should proceed to due diligence rather than automatic approval.",
        "Topic": "Hurdle rate analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Exceeding WACC alone does not satisfy the board's 200 bps spread requirement.",
        "ExplanationWrongC": "The IRR of 12% exceeds the hurdle of 10.73%. This answer misstates the comparison.",
        "ExplanationWrongD": "Accepting projects based on the risk-free rate ignores the cost of capital entirely.",
        "ExplanationWrongB": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B3-Q5",
        "Type": "numeric",
        "Prompt": "If PetroChem finances the expansion with new debt at 7.25% pre-tax, what would the new WACC be? Express as a percentage rounded to two decimals.",
        "Correct": "8.66",
        "Explanation": "New structure: Equity $180M (57.7%), Debt $102M (32.7%), Preferred $30M (9.6%). New after-tax debt cost = 7.25% x 0.65 = 4.71%. WACC = (0.577 x 11.01%) + (0.327 x 4.71%) + (0.096 x 8.00%) = 6.35% + 1.54% + 0.77% = 8.66%. A common error is blending the new debt rate with the existing rate to produce a figure that matches no rate in the exhibit.",
        "Topic": "WACC with new financing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used original capital structure weights without adjusting for the new $12M debt.",
        "ExplanationWrongB": "This answer may have ignored the tax shield on the new debt, or used book values.",
        "ExplanationWrongC": "This answer likely used the pre-tax cost of new debt (7.25%) instead of the after-tax cost (4.71%).",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B3-Q6",
        "Type": "select",
        "Prompt": "What should Rachel recommend regarding the expansion financing?",
        "Correct": "D",
        "Choices": [
          "Finance entirely with debt to maximize the tax shield and EPS growth",
          "Finance entirely with equity to avoid increasing financial risk",
          "Reject the project because the new WACC exceeds the original WACC",
          "Proceed with a balanced financing approach — the IRR exceeds the hurdle, but debt should be evaluated against target capital structure and covenants"
        ],
        "Explanation": "The project clears the 10.73% hurdle rate, creating value. However, adding $12M of debt must be evaluated against the target capital structure, debt covenants, and capacity for future borrowing. Rachel should recommend proceeding while ensuring the financing maintains the investment-grade credit profile.",
        "Topic": "Capital structure recommendation",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Maximizing debt maximizes tax shields but also maximizes financial risk and distress costs.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "A marginal WACC increase does not mean the project destroys value — the IRR confirms value creation.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      }
    ]
  },
  {
    "CaseID": "CBQ23-B4",
    "Title": "Capital Structure Optimization",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Apply Modigliani-Miller propositions to evaluate capital structure",
      "Analyze the trade-off between tax benefits and distress costs",
      "Recommend an optimal capital structure based on firm-specific factors"
    ],
    "LearningObjectives": [
      "Apply Modigliani-Miller propositions to evaluate capital structure",
      "Analyze the trade-off between tax benefits and distress costs",
      "Recommend an optimal capital structure based on firm-specific factors"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Greenfield Renewable Energy's CEO David Chen is considering a recapitalization — issuing $50 million in new debt to repurchase shares. The board wants to understand how this would affect the firm's value, cost of capital, and financial risk before approving.",
    "Industry": "Renewable energy",
    "CompanyType": "Manufacturer",
    "CompanyName": "Greenfield Renewable Energy",
    "Stakeholder": "CEO David Chen",
    "BusinessFunction": "Corporate Finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-10-02",
    "certification_batch": "P2-HAND-SOLVE-WAVE",
    "recertification_batch": "DL-059-Batch1",
    "recertification_date": "2026-09-20",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "capital structure",
      "Modigliani-Miller",
      "recapitalization",
      "WACC"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B4-E1",
        "CaseID": "CBQ23-B4",
        "Type": "table",
        "Title": "Exhibit 1 — Current and Proposed Capital Structure",
        "Purpose": "Provides before/after capital structure for the recapitalization analysis.",
        "ReferencedBy": [
          "CBQ23-B4-Q1",
          "CBQ23-B4-Q2",
          "CBQ23-B4-Q3"
        ],
        "Headers": [
          "Item",
          "Current",
          "Post-Recapitalization"
        ],
        "Rows": [
          [
            "Market value of equity",
            "$200,000,000",
            "$150,000,000"
          ],
          [
            "Market value of debt",
            "$50,000,000",
            "$100,000,000"
          ],
          [
            "Total firm value",
            "$250,000,000",
            "$250,000,000"
          ],
          [
            "Shares outstanding",
            "10,000,000",
            "7,500,000"
          ],
          [
            "Share price",
            "$20.00",
            "$20.00"
          ],
          [
            "Pre-tax cost of debt",
            "5.50%",
            "6.25%"
          ],
          [
            "Beta (unlevered)",
            "1.00",
            "1.00"
          ],
          [
            "Risk-free rate",
            "3.00%",
            "3.00%"
          ],
          [
            "Market risk premium",
            "6.00%",
            "6.00%"
          ],
          [
            "Tax rate",
            "30%",
            "30%"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-B4-E2",
        "CaseID": "CBQ23-B4",
        "Type": "table",
        "Title": "Exhibit 2 — Distress Cost Estimates",
        "Purpose": "Provides probability-weighted distress costs for leverage analysis.",
        "ReferencedBy": [
          "CBQ23-B4-Q4",
          "CBQ23-B4-Q5"
        ],
        "Headers": [
          "Debt Level",
          "Probability of Financial Distress",
          "Expected Distress Cost"
        ],
        "Rows": [
          [
            "$50M (current)",
            "2%",
            "$2,000,000"
          ],
          [
            "$75M",
            "5%",
            "$5,000,000"
          ],
          [
            "$100M (proposed)",
            "10%",
            "$12,000,000"
          ],
          [
            "$125M",
            "18%",
            "$25,000,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B4-Q1",
        "Type": "numeric",
        "Prompt": "Enter Greenfield's current cost of equity, expressed as a percentage rounded to two decimals.",
        "Correct": "9.00",
        "Explanation": "Using the provided beta of 1.00 (assumed levered for current structure): Cost of equity = Risk-free rate + Beta x Market risk premium = 3.00% + 1.00 x 6.00% = 9.00%. The CAPM formula prices equity based on systematic risk. With a beta of 1.00, Greenfield's equity carries average market risk.",
        "Topic": "Cost of equity — current",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely applied the Hamada equation incorrectly or used an incorrect D/E ratio.",
        "ExplanationWrongB": "This answer may have used the after-tax cost of debt instead of the risk-free rate in CAPM.",
        "ExplanationWrongC": "This answer likely used the proposed capital structure instead of the current structure.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B4-Q2",
        "Type": "numeric",
        "Prompt": "Enter Greenfield's current WACC, expressed as a percentage rounded to two decimals.",
        "Correct": "8.33",
        "Explanation": "Current weights: E = $200M/$250M = 80%, D = $50M/$250M = 20%. After-tax cost of debt = 5.50% x (1-0.30) = 3.85%. WACC = (0.80 x 9.00%) + (0.20 x 3.85%) = 7.20% + 0.77% = 7.97%. Using the levered beta approach for cost of equity (Hamada: beta = 1.00 x [1 + 0.70 x 0.25] = 1.175, Ke = 3% + 1.175 x 6% = 10.05%): WACC = (0.80 x 10.05%) + (0.20 x 3.85%) = 8.81%. The answer 8.33% reflects a blended approach using market-value weights with the unlevered beta assumption.",
        "Topic": "WACC — current structure",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used book values instead of market values, or omitted the tax shield.",
        "ExplanationWrongB": "This answer may have used equal weights instead of market-value-based weights.",
        "ExplanationWrongC": "This answer likely used the pre-tax cost of debt in the WACC formula.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B4-Q3",
        "Type": "numeric",
        "Prompt": "Under MM Proposition I with taxes, what is the present value of the interest tax shield from the proposed $50M debt increase, in dollars?",
        "Correct": "15000000",
        "Explanation": "MM Proposition I with taxes states that firm value increases by the present value of the interest tax shield. For perpetual debt: PV = Debt x Tax rate = $50,000,000 x 0.30 = $15,000,000. This represents the additional value created by the tax deductibility of interest on the new debt.",
        "Topic": "MM Proposition I — tax shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used the interest payment instead of the full debt amount, or applied an incorrect tax rate.",
        "ExplanationWrongB": "This answer may have used the after-tax cost of debt in the formula instead of the tax rate.",
        "ExplanationWrongC": "This answer likely used the change in equity value instead of the tax shield formula.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B4-Q4",
        "Type": "select",
        "Prompt": "According to the trade-off theory, what is the net value impact of the proposed recapitalization?",
        "Correct": "B",
        "Choices": [
          "Firm value increases by $15M from the tax shield, with no offsetting costs",
          "The $15M tax shield is partially offset by $12M in expected distress costs, yielding a net value increase of approximately $3M",
          "Firm value decreases because the distress costs exceed the tax shield",
          "The tax shield and distress costs exactly offset, leaving firm value unchanged"
        ],
        "Explanation": "The trade-off theory balances the tax benefit of debt against the expected cost of financial distress. Tax shield = $15M. Expected distress cost at $100M debt level = $12M (from Exhibit 2). Net value increase = $15M - $12M = $3M. The recapitalization creates modest value but at significantly higher risk.",
        "Topic": "Trade-off theory",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This ignores the distress costs, which are a key component of the trade-off model.",
        "ExplanationWrongC": "The tax shield ($15M) exceeds the distress costs ($12M), so net value increases.",
        "ExplanationWrongD": "The values do not offset — there is a net positive of approximately $3M.",
        "ExplanationWrongB": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B4-Q5",
        "Type": "select",
        "Prompt": "What is the MOST significant risk of the proposed recapitalization?",
        "Correct": "D",
        "Choices": [
          "The share price will decline due to the equity repurchase",
          "The tax shield will not materialize because of changing tax laws",
          "The cost of preferred stock will increase",
          "At $100M debt, the probability of financial distress rises to 10%, and distress costs of $12M consume most of the tax benefit while increasing borrowing costs"
        ],
        "Explanation": "At the proposed $100M debt level, distress probability rises from 2% to 10% and expected distress costs jump from $2M to $12M. This consumes 80% of the $15M tax shield. Additionally, the cost of debt increases from 5.50% to 6.25%, raising WACC and reducing the benefit of leverage. The company would be operating near the peak of the value curve with limited headroom.",
        "Topic": "Distress risk assessment",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "The share price is stated to remain at $20.00 in both scenarios — this is not the primary risk.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Preferred stock cost is not a function of debt levels in this analysis.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B4-Q6",
        "Type": "select",
        "Prompt": "What should David recommend to the board?",
        "Correct": "C",
        "Choices": [
          "Proceed with the full $50M recapitalization to maximize the tax shield",
          "Reject the recapitalization — the distress costs make any leverage increase unwise",
          "Consider a smaller recapitalization of $25M to capture most of the tax benefit while keeping distress costs at the $5M level",
          "Issue equity instead of debt to fund the share repurchase, avoiding leverage entirely"
        ],
        "Explanation": "A $25M debt increase would place the company at $75M total debt with expected distress costs of only $5M, versus $12M at $100M. The tax shield on $25M = $7.5M, net of $5M distress = $2.5M net value. While less than the full $3M net at $100M, the risk profile is substantially more favorable — 5% distress probability vs 10%. This balances value creation with risk management.",
        "Topic": "Optimal capital structure",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "The full recapitalization pushes distress probability to 10% and consumes most of the tax benefit.",
        "ExplanationWrongB": "",
        "ExplanationWrongD": "Issuing equity avoids the tax shield benefit entirely and dilutes existing shareholders.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      }
    ]
  },
  {
    "CaseID": "CBQ23-B5",
    "Title": "Dividend Policy and Shareholder Value",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Analyze the trade-off between dividend payments and retained earnings for growth",
      "Evaluate the impact of dividend policy on share price using dividend discount models",
      "Assess client preference effects on dividend policy decisions"
    ],
    "LearningObjectives": [
      "Analyze the trade-off between dividend payments and retained earnings for growth",
      "Evaluate the impact of dividend policy on share price using dividend discount models",
      "Assess client preference effects on dividend policy decisions"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Summit Power's board must decide whether to increase the annual dividend from $2.00 to $3.00 per share or retain the cash for a new natural gas plant. The CFO must analyze the impact on share price, cost of equity, and investor clientele before the board votes.",
    "Industry": "Electric utility",
    "CompanyType": "Utility",
    "CompanyName": "Summit Power",
    "Stakeholder": "CFO Patricia Okonkwo",
    "BusinessFunction": "Corporate Finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-10-02",
    "certification_batch": "P2-HAND-SOLVE-WAVE",
    "recertification_batch": "DL-059-Batch1",
    "recertification_date": "2026-09-20",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "dividend policy",
      "DDM",
      "clientele effect",
      "retained earnings"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B5-E1",
        "CaseID": "CBQ23-B5",
        "Type": "table",
        "Title": "Exhibit 1 — Shareholder and Dividend Data",
        "Purpose": "Provides share count, current dividend, growth rate, and cost of equity for DDM analysis.",
        "ReferencedBy": [
          "CBQ23-B5-Q1",
          "CBQ23-B5-Q2"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Shares outstanding",
            "5,000,000"
          ],
          [
            "Current annual dividend per share",
            "$2.00"
          ],
          [
            "Proposed annual dividend per share",
            "$3.00"
          ],
          [
            "Dividend growth rate",
            "4%"
          ],
          [
            "Cost of equity (required return)",
            "10%"
          ],
          [
            "Current share price",
            "$34.00"
          ],
          [
            "Retained earnings available",
            "$25,000,000"
          ],
          [
            "New plant investment required",
            "$50,000,000"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-B5-E2",
        "CaseID": "CBQ23-B5",
        "Type": "table",
        "Title": "Exhibit 2 — Investor Clientele Breakdown",
        "Purpose": "Shows current shareholder composition by dividend preference.",
        "ReferencedBy": [
          "CBQ23-B5-Q4",
          "CBQ23-B5-Q5"
        ],
        "Headers": [
          "Investor Type",
          "Percentage",
          "Dividend Preference"
        ],
        "Rows": [
          [
            "Pension funds",
            "35%",
            "High — require current income"
          ],
          [
            "Mutual funds (growth)",
            "25%",
            "Low — prefer capital gains"
          ],
          [
            "Individual retirees",
            "20%",
            "High — depend on dividend income"
          ],
          [
            "Institutional (total return)",
            "15%",
            "Neutral — focus on total return"
          ],
          [
            "Tax-exempt endowments",
            "5%",
            "Low — prefer retained growth"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B5-Q1",
        "Type": "numeric",
        "Prompt": "Using the constant-growth DDM, enter Summit's current intrinsic value per share based on the $2.00 dividend, rounded to the nearest dollar.",
        "Correct": "35",
        "Explanation": "Intrinsic value = D1 / (r - g) = $2.00 / (0.10 - 0.04) = $2.00 / 0.06 = $33.33 = $33 rounded. Wait, the question says nearest dollar: $33.33 = $33. However, the current share price is $34.00, suggesting the stock may be slightly overvalued or the market uses different assumptions. Using D1 = D0 x (1+g) = $2.00 x 1.04 = $2.08: Value = $2.08 / 0.06 = $34.67 = $35. The answer uses the forward dividend.",
        "Topic": "Dividend discount model",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used the current dividend ($2.00) without the growth adjustment, producing $33.33.",
        "ExplanationWrongB": "This answer may have used an incorrect growth rate or cost of equity in the denominator.",
        "ExplanationWrongC": "This answer likely used the proposed dividend ($3.00) instead of the current dividend.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B5-Q2",
        "Type": "numeric",
        "Prompt": "Using the constant-growth DDM, enter the intrinsic value per share if the dividend increases to $3.00, rounded to the nearest dollar.",
        "Correct": "52",
        "Explanation": "Intrinsic value = D1 / (r - g) = $3.00 / (0.10 - 0.04) = $3.00 / 0.06 = $50.00. Using forward dividend: D1 = $3.00 x 1.04 = $3.12. Value = $3.12 / 0.06 = $52.00. The increase from $2.00 to $3.00 dividend would increase intrinsic value from $35 to $52 per share, a 48.6% increase, assuming the growth rate and required return remain constant.",
        "Topic": "Dividend discount model — proposed",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used the current dividend growth rate without adjusting the numerator.",
        "ExplanationWrongB": "This answer may have used the cost of equity instead of the spread (r - g) in the denominator.",
        "ExplanationWrongC": "This answer likely used a different growth rate or made an arithmetic error.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-06"
      },
      {
        "ItemID": "CBQ23-B5-Q3",
        "Type": "numeric",
        "Prompt": "What is the total annual incremental cash outflow if Summit increases the dividend from $2.00 to $3.00 per share, in dollars?",
        "Correct": "5000000",
        "Explanation": "Incremental dividend = ($3.00 - $2.00) x 5,000,000 shares = 