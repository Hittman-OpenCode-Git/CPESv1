rtification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A5-Q4",
        "Type": "numeric",
        "Prompt": "Enter Crestline's inventory turnover ratio for Year 3, rounded to two decimals.",
        "Correct": "4.50",
        "Explanation": "Inventory turnover = COGS / Ending Inventory = $3,780,000 / $840,000 = 4.50. The declining turnover from Year 1 (4.88 using ending inventory) indicates inventory is moving more slowly, tying up cash and increasing carrying costs. This is consistent with the broader working capital deterioration.",
        "Topic": "Activity ratios",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used sales ($5,400,000) instead of COGS in the numerator.",
        "ExplanationWrongB": "This answer may have computed days inventory outstanding (365 / 4.50 = 81.1 days) instead of the turnover ratio.",
        "ExplanationWrongC": "This answer likely used average total assets or a different denominator, conflating inventory turnover with asset turnover.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A5-Q5",
        "Type": "select",
        "Prompt": "Given the three-year trends, which area should Diane prioritize for immediate improvement?",
        "Correct": "C",
        "Choices": [
          "Reducing long-term debt to lower the interest burden and improve the debt-to-equity ratio",
          "Increasing sales volume to leverage fixed costs and improve the operating margin",
          "Tightening credit terms and improving collections to reduce DSO and free working capital",
          "Reducing inventory levels through just-in-time purchasing to improve the current ratio"
        ],
        "Explanation": "DSO has increased by 20.5% over three years while receivables grew 37.5% against only 12.5% sales growth. Tightening credit terms and improving collections would directly address the fastest-growing asset category, reduce bad-debt risk, and free working capital. While inventory turnover is also declining, DSO deterioration is more pronounced and quicker to remedy.",
        "Topic": "Working capital management",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Long-term debt has been constant at $960,000 across all three years — there is no increasing debt burden to address.",
        "ExplanationWrongB": "",
        "ExplanationWrongD": "While inventory turnover is declining, DSO deterioration is more severe (20.5% increase vs. inventory decline) and quicker to fix.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A5-Q6",
        "Type": "select",
        "Prompt": "What should Diane present to the board as Crestline's most significant financial risk?",
        "Correct": "D",
        "Choices": [
          "Insufficient liquidity — the current ratio may fall below 2.0 if receivables growth continues",
          "Excessive leverage — the debt-to-equity ratio limits future borrowing capacity",
          "Declining profitability — COGS as a percentage of sales has increased from 65% to 70%",
          "Deteriorating asset management — receivables and inventory are growing faster than sales, consuming cash"
        ],
        "Explanation": "The most significant risk is receivables growing 37.5% and inventory growing 31.3% against only 12.5% sales growth. This means working capital is being consumed by slower collections and excess stock, increasing carrying costs, bad-debt exposure, and obsolescence risk. While margin compression is serious, it is a symptom of the broader operational efficiency problem.",
        "Topic": "Financial risk assessment",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "The current ratio has remained stable around 3.0 and is not at risk of falling below 2.0 based on current trends.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Margin compression is real but is a symptom of poor asset management, not the root cause.",
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
    "CaseID": "CBQ23-A6",
    "Title": "DuPont Decomposition of ROE Decline",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Decompose ROE using the three-component DuPont model",
      "Identify the primary driver of ROE deterioration",
      "Evaluate management improvement strategies through DuPont analysis"
    ],
    "LearningObjectives": [
      "Decompose ROE using the three-component DuPont model",
      "Identify the primary driver of ROE deterioration",
      "Evaluate management improvement strategies through DuPont analysis"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Precision Castparts' board has noted that ROE declined from 16.00% two years ago to 12.32% this year despite revenue growth. CFO Marcus Liu must use DuPont decomposition to identify whether the decline stems from profitability, asset efficiency, or financial leverage, and recommend which lever management should pull to restore returns.",
    "Industry": "Aerospace components manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Precision Castparts",
    "Stakeholder": "CFO Marcus Liu",
    "BusinessFunction": "Financial Reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "DuPont",
      "ROE",
      "profitability",
      "leverage"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A6-E1",
        "CaseID": "CBQ23-A6",
        "Type": "financial-statement",
        "Title": "Exhibit 1 — Income Statement (Current Year)",
        "Purpose": "Provides current-year income statement for DuPont decomposition.",
        "ReferencedBy": [
          "CBQ23-A6-Q1",
          "CBQ23-A6-Q2"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net Sales",
            "$5,000,000"
          ],
          [
            "Cost of Goods Sold",
            "$3,200,000"
          ],
          [
            "Gross Profit",
            "$1,800,000"
          ],
          [
            "Operating Expenses",
            "$1,200,000"
          ],
          [
            "Operating Income",
            "$600,000"
          ],
          [
            "Interest Expense",
            "$48,000"
          ],
          [
            "Income Before Tax",
            "$552,000"
          ],
          [
            "Income Tax Expense (25%)",
            "$138,000"
          ],
          [
            "Net Income",
            "$414,000"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-A6-E2",
        "CaseID": "CBQ23-A6",
        "Type": "financial-statement",
        "Title": "Exhibit 2 — Balance Sheet Comparison",
        "Purpose": "Provides beginning and ending balance sheet data for average calculations.",
        "ReferencedBy": [
          "CBQ23-A6-Q1",
          "CBQ23-A6-Q2",
          "CBQ23-A6-Q3"
        ],
        "Headers": [
          "Item",
          "Beginning of Year",
          "End of Year"
        ],
        "Rows": [
          [
            "Total Assets",
            "$4,000,000",
            "$4,200,000"
          ],
          [
            "Total Liabilities",
            "$1,500,000",
            "$1,600,000"
          ],
          [
            "Shareholders' Equity",
            "$2,500,000",
            "$2,600,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A6-Q1",
        "Type": "numeric",
        "Prompt": "Enter Precision Castparts' profit margin (net income / sales) for the current year, expressed as a percentage rounded to two decimals.",
        "Correct": "8.28",
        "Explanation": "Profit margin = Net Income / Net Sales = $414,000 / $5,000,000 = 8.28%. This is the first DuPont component, measuring how much of each revenue dollar flows to the bottom line. The current margin of 8.28% compares to 8.00% two years ago, indicating slight improvement in profitability per dollar of sales.",
        "Topic": "DuPont decomposition — profit margin",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used operating income ($600,000) instead of net income, computing operating margin of 12.00%.",
        "ExplanationWrongB": "This answer may have used gross profit ($1,800,000) in the numerator, computing gross margin of 36.00%.",
        "ExplanationWrongC": "This answer likely used beginning-of-year equity or total assets in the denominator rather than net sales.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A6-Q2",
        "Type": "numeric",
        "Prompt": "Enter Precision Castparts' asset turnover for the current year, rounded to two decimals.",
        "Correct": "1.22",
        "Explanation": "Asset turnover = Net Sales / Average Total Assets = $5,000,000 / [($4,000,000 + $4,200,000) / 2] = $5,000,000 / $4,100,000 = 1.22. This measures how efficiently assets generate revenue. The declining turnover from 1.33 two years ago to 1.22 today indicates assets are growing faster than sales.",
        "Topic": "DuPont decomposition — asset turnover",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used ending assets ($4,200,000) rather than average assets, producing $5,000,000 / $4,200,000 = 1.19.",
        "ExplanationWrongB": "This answer may have used total assets from two years ago rather than the current year average.",
        "ExplanationWrongC": "This answer likely reversed the formula, computing assets / sales instead of sales / assets.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A6-Q3",
        "Type": "numeric",
        "Prompt": "Enter Precision Castparts' equity multiplier for the current year, rounded to two decimals.",
        "Correct": "1.62",
        "Explanation": "Equity multiplier = Average Total Assets / Average Shareholders' Equity = $4,100,000 / $2,550,000 = 1.61. Using ending values: $4,200,000 / $2,600,000 = 1.62. The two-year-ago value was 1.56. The equity multiplier measures financial leverage — how much assets are financed by debt versus equity.",
        "Topic": "DuPont decomposition — equity multiplier",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used total liabilities instead of total assets in the numerator.",
        "ExplanationWrongB": "This answer may have computed the debt-to-equity ratio ($1,600,000 / $2,600,000 = 0.62) instead of the equity multiplier.",
        "ExplanationWrongC": "This answer likely reversed the formula, computing equity / assets instead of assets / equity.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A6-Q4",
        "Type": "select",
        "Prompt": "Based on the DuPont decomposition, which factor is the PRIMARY driver of Precision Castparts' ROE decline from 16.00% to 12.32%?",
        "Correct": "C",
        "Choices": [
          "Declining profit margin — rising COGS have reduced net income as a percentage of sales",
          "Increasing financial leverage — the company has taken on more debt relative to equity",
          "Declining asset turnover — total assets have grown faster than sales, reducing revenue per dollar of assets",
          "Rising interest expense — higher debt levels have increased the interest burden"
        ],
        "Explanation": "Asset turnover declined from 1.33 to 1.22 (an 8.3% decrease), while profit margin actually improved slightly (8.00% to 8.28%) and the equity multiplier increased modestly (1.56 to 1.62). The asset turnover decline is the largest negative contributor to ROE deterioration.",
        "Topic": "DuPont analysis — driver identification",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Profit margin actually improved from 8.00% to 8.28%, so it is not the driver of ROE decline.",
        "ExplanationWrongB": "",
        "ExplanationWrongD": "Interest expense remained constant at $48,000 and is already captured in the profit margin calculation.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A6-Q5",
        "Type": "select",
        "Prompt": "Which strategy would MOST effectively restore Precision Castparts' ROE toward its prior 16% level?",
        "Correct": "A",
        "Choices": [
          "Improve asset turnover by divesting underutilized assets or increasing sales from existing capacity",
          "Increase financial leverage by borrowing to repurchase shares, raising the equity multiplier",
          "Cut operating expenses to improve the profit margin above 10%",
          "Reduce the tax rate through tax planning strategies to increase net income"
        ],
        "Explanation": "Since asset turnover is the primary driver of ROE decline, the most direct remedy is improving it. Divesting underutilized assets reduces the denominator while maintaining or growing sales, directly increasing turnover. Increasing leverage raises ROE but also raises financial risk and does not address the root cause.",
        "Topic": "DuPont-based strategy",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Profit margin is not the primary ROE driver — it actually improved. Cutting expenses would provide a marginal benefit.",
        "ExplanationWrongD": "Tax planning provides a marginal improvement and does not address the operational efficiency problem.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A6-Q6",
        "Type": "select",
        "Prompt": "What should Marcus caution the board about regarding the equity multiplier trend?",
        "Correct": "D",
        "Choices": [
          "The equity multiplier is too high and should be reduced immediately to lower financial risk",
          "The equity multiplier is too low and the company should borrow more to take advantage of tax shields",
          "The equity multiplier has no impact on ROE and should be ignored in the analysis",
          "The equity multiplier increased from 1.56 to 1.62, indicating modestly rising leverage; further increases would boost ROE but raise financial risk"
        ],
        "Explanation": "The equity multiplier increased from 1.56 to 1.62, reflecting a shift toward more debt financing. While this contributes positively to ROE, it also increases financial risk. Marcus should note that pursuing higher leverage to mask the asset turnover problem would be a short-term fix with long-term consequences.",
        "Topic": "Leverage risk assessment",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "At 1.62, the equity multiplier implies a debt-to-equity ratio of approximately 0.62, which is moderate.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The equity multiplier is the third component of the DuPont model and directly affects ROE.",
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
    "CaseID": "CBQ23-A7",
    "Title": "Operating and Financial Leverage Assessment",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute the degree of operating leverage and its impact on earnings volatility",
      "Compute the degree of financial leverage and combined leverage",
      "Evaluate the risk implications of leverage for capital structure decisions"
    ],
    "LearningObjectives": [
      "Compute the degree of operating leverage and its impact on earnings volatility",
      "Compute the degree of financial leverage and combined leverage",
      "Evaluate the risk implications of leverage for capital structure decisions"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Meridian Industrial's CEO Sandra Kowalski is evaluating a $15 million expansion that would add $2.4 million in annual fixed costs against projected $8 million in new revenue. Before approving, she needs the CFO to quantify the company's current operating and financial leverage and assess how the expansion would affect the risk profile.",
    "Industry": "Industrial automation",
    "CompanyType": "Manufacturer",
    "CompanyName": "Meridian Industrial",
    "Stakeholder": "CEO Sandra Kowalski",
    "BusinessFunction": "Corporate Finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "operating leverage",
      "financial leverage",
      "combined leverage",
      "breakeven"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A7-E1",
        "CaseID": "CBQ23-A7",
        "Type": "financial-statement",
        "Title": "Exhibit 1 — Current Income Statement",
        "Purpose": "Provides current-year cost structure for leverage computation.",
        "ReferencedBy": [
          "CBQ23-A7-Q1",
          "CBQ23-A7-Q2",
          "CBQ23-A7-Q3"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Revenue",
            "$25,000,000"
          ],
          [
            "Variable Costs (60%)",
            "$15,000,000"
          ],
          [
            "Contribution Margin",
            "$10,000,000"
          ],
          [
            "Fixed Operating Costs",
            "$8,000,000"
          ],
          [
            "Operating Income (EBIT)",
            "$2,000,000"
          ],
          [
            "Interest Expense",
            "$500,000"
          ],
          [
            "Income Before Tax",
            "$1,500,000"
          ],
          [
            "Income Tax Expense (30%)",
            "$450,000"
          ],
          [
            "Net Income",
            "$1,050,000"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-A7-E2",
        "CaseID": "CBQ23-A7",
        "Type": "table",
        "Title": "Exhibit 2 — Expansion Pro Forma",
        "Purpose": "Provides projected cost structure if expansion is approved.",
        "ReferencedBy": [
          "CBQ23-A7-Q3",
          "CBQ23-A7-Q4",
          "CBQ23-A7-Q5"
        ],
        "Headers": [
          "Item",
          "Current",
          "Post-Expansion"
        ],
        "Rows": [
          [
            "Revenue",
            "$25,000,000",
            "$33,000,000"
          ],
          [
            "Variable Costs",
            "$15,000,000",
            "$19,800,000"
          ],
          [
            "Contribution Margin",
            "$10,000,000",
            "$13,200,000"
          ],
          [
            "Fixed Operating Costs",
            "$8,000,000",
            "$10,400,000"
          ],
          [
            "Operating Income (EBIT)",
            "$2,000,000",
            "$2,800,000"
          ],
          [
            "Annual Debt Service (new $15M at 8%)",
            "$500,000",
            "$1,700,000"
          ],
          [
            "Net Income",
            "$1,050,000",
            "$770,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A7-Q1",
        "Type": "numeric",
        "Prompt": "Enter Meridian's current degree of operating leverage (DOL), rounded to two decimals.",
        "Correct": "5.00",
        "Explanation": "DOL = Contribution Margin / Operating Income = $10,000,000 / $2,000,000 = 5.00. This means a 1% change in revenue produces a 5% change in operating income. A DOL of 5.00 indicates high operating leverage with a significant proportion of fixed costs relative to variable costs.",
        "Topic": "Operating leverage",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used net income ($1,050,000) instead of operating income in the denominator.",
        "ExplanationWrongB": "This answer may have used fixed costs ($8,000,000) in the numerator instead of contribution margin.",
        "ExplanationWrongC": "This answer likely reversed the formula, computing Operating Income / Contribution Margin = 0.20.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A7-Q2",
        "Type": "numeric",
        "Prompt": "Enter Meridian's current degree of financial leverage (DFL), rounded to two decimals.",
        "Correct": "1.33",
        "Explanation": "DFL = Operating Income / Income Before Tax = $2,000,000 / $1,500,000 = 1.33. This means a 1% change in operating income produces a 1.33% change in net income. The DFL of 1.33 indicates moderate financial leverage from the $500,000 interest expense.",
        "Topic": "Financial leverage",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used net income instead of income before tax, or used contribution margin instead of operating income.",
        "ExplanationWrongB": "This answer may have computed DFL as (Operating Income - Interest) / Operating Income = 0.75.",
        "ExplanationWrongC": "This answer likely used total assets or equity in the computation rather than the income-statement-based formula.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A7-Q3",
        "Type": "numeric",
        "Prompt": "Enter Meridian's current degree of combined leverage (DCL), rounded to two decimals.",
        "Correct": "6.67",
        "Explanation": "DCL = DOL x DFL = 5.00 x 1.33 = 6.67. Alternatively, DCL = Contribution Margin / Income Before Tax = $10,000,000 / $1,500,000 = 6.67. This means a 1% change in revenue produces a 6.67% change in net income.",
        "Topic": "Combined leverage",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely added DOL and DFL instead of multiplying them (5.00 + 1.33 = 6.33).",
        "ExplanationWrongB": "This answer may have used net income in the denominator of the direct formula.",
        "ExplanationWrongC": "This answer likely squared one of the leverage components or used an incorrect formula.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A7-Q4",
        "Type": "select",
        "Prompt": "How would the expansion affect Meridian's operating leverage?",
        "Correct": "A",
        "Choices": [
          "DOL would decrease because the higher revenue base dilutes the fixed-cost burden",
          "DOL would increase because fixed operating costs rise from $8M to $10.4M while the contribution margin ratio remains constant",
          "DOL would remain unchanged because the variable cost ratio stays at 60%",
          "DOL would become undefined because the expansion would push the company to breakeven"
        ],
        "Explanation": "The degree of operating leverage measures how sensitively operating income responds to a change in sales, and it is the ratio of contribution margin to operating income. Exhibit 1 gives current contribution margin of $10,000,000 and operating income of $2,000,000, so current DOL = 10,000,000 / 2,000,000 = 5.00. Exhibit 2's post-expansion column gives contribution margin of $13,200,000 and operating income of $2,800,000, so post-expansion DOL = 13,200,000 / 2,800,000 = 4.71. Recomputed independently: 13,200,000 / 2,800,000 = 4.7143. Because 4.71 is lower than 5.00, the expansion REDUCES measured operating leverage: the larger revenue base spreads the fixed-cost burden over more contribution. A common error is reading a higher absolute fixed-cost base ($8M rising to $10.4M) as higher leverage, but the ratio is what DOL measures. The economic risk still rises, because a 1% revenue decline now costs a larger absolute sum in operating income and net income falls from $1,050,000 to $770,000 even as revenue grows — which is why Q5 identifies the net-income decline as the real concern rather than the leverage ratio.",
        "Topic": "Leverage change analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "While the DOL ratio decreases from 5.00 to 4.71, the absolute fixed-cost exposure increases by $2.4M, raising risk.",
        "ExplanationWrongC": "The variable cost ratio remaining constant does not prevent DOL from changing — fixed costs increased.",
        "ExplanationWrongD": "The expansion maintains positive operating income of $2,800,000, well above breakeven.",
        "ExplanationWrongB": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A7-Q5",
        "Type": "select",
        "Prompt": "What is the MOST significant concern about the expansion's impact on Meridian's risk profile?",
        "Correct": "A",
        "Choices": [
          "Net income decreases from $1.05M to $0.77M despite revenue growth, as higher interest expense consumes the operating income gain",
          "The DOL decreases, which means the company becomes less risky overall",
          "Variable costs increase proportionally with revenue, which is unsustainable",
          "The contribution margin ratio increases, indicating improved cost structure"
        ],
        "Explanation": "The expansion increases revenue by $8M but net income actually falls from $1.05M to $0.77M because the $1.2M additional annual interest expense exceeds the $800K increase in operating income. The debt service burden of $1.7M makes the company more vulnerable to revenue shortfalls.",
        "Topic": "Leverage risk assessment",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Variable costs increasing proportionally with revenue is expected behavior for variable costs.",
        "ExplanationWrongD": "The contribution margin ratio remains at 40%, unchanged from the current 40%. There is no improvement.",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A7-Q6",
        "Type": "select",
        "Prompt": "What should Sandra decide regarding the expansion?",
        "Correct": "C",
        "Choices": [
          "Approve the expansion — the higher DOL will amplify returns once revenue grows beyond the breakeven",
          "Reject the expansion — the negative net income impact proves the project destroys value",
          "Defer the expansion until operating leverage can be reduced through variable-cost outsourcing, or restructure the financing to reduce the fixed interest burden",
          "Approve the expansion but immediately issue equity to pay down the new debt"
        ],
        "Explanation": "The expansion's economics are marginal — net income declines and leverage increases. However, the project is not inherently value-destroying; the issue is the financing structure. Deferring allows Meridian to negotiate lower-cost financing, reduce operating leverage by converting fixed costs to variable, or wait for existing capacity utilization to improve.",
        "Topic": "Leverage-based capital decision",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "Approving without addressing the net income decline and increased risk would expose the company to higher earnings volatility.",
        "ExplanationWrongB": "",
        "ExplanationWrongD": "Issuing equity to pay down debt is reactive and dilutive. A better approach is to restructure financing before approval.",
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
    "CaseID": "CBQ23-A8",
    "Title": "Working Capital Efficiency Diagnosis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute the cash conversion cycle and its components",
      "Evaluate the impact of working capital policy changes on cash flow",
      "Recommend working capital strategies to improve liquidity"
    ],
    "LearningObjectives": [
      "Compute the cash conversion cycle and its components",
      "Evaluate the impact of working capital policy changes on cash flow",
      "Recommend working capital strategies to improve liquidity"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Crest Foods' controller James Park is under pressure from the bank to reduce reliance on a $1.5 million line of credit. He needs to diagnose the company's working capital efficiency by computing the cash conversion cycle and evaluating specific policy changes to free cash.",
    "Industry": "Regional food distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Crest Foods",
    "Stakeholder": "Controller James Park",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "working capital",
      "cash conversion cycle",
      "receivables",
      "inventory"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A8-E1",
        "CaseID": "CBQ23-A8",
        "Type": "financial-statement",
        "Title": "Exhibit 1 — Income Statement and Purchases Data",
        "Purpose": "Provides revenue, COGS, and purchases data for working capital ratio computation.",
        "ReferencedBy": [
          "CBQ23-A8-Q1",
          "CBQ23-A8-Q2"
        ],
        "Headers": [
          "Item",
          "Annual Amount"
        ],
        "Rows": [
          [
            "Net Sales (all on credit)",
            "$10,000,000"
          ],
          [
            "Cost of Goods Sold",
            "$7,500,000"
          ],
          [
            "Purchases (all on credit)",
            "$7,800,000"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-A8-E2",
        "CaseID": "CBQ23-A8",
        "Type": "financial-statement",
        "Title": "Exhibit 2 — Balance Sheet (Current Year)",
        "Purpose": "Provides working capital account balances for ratio computation.",
        "ReferencedBy": [
          "CBQ23-A8-Q1",
          "CBQ23-A8-Q3"
        ],
        "Headers": [
          "Item",
          "Balance"
        ],
        "Rows": [
          [
            "Accounts Receivable",
            "$1,200,000"
          ],
          [
            "Inventory",
            "$1,000,000"
          ],
          [
            "Accounts Payable",
            "$665,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A8-Q1",
        "Type": "numeric",
        "Prompt": "Enter Crest Foods' days sales outstanding (DSO), rounded to the nearest whole number.",
        "Correct": "44",
        "Explanation": "DSO = (Accounts Receivable / Annual Credit Sales) x 365 = ($1,200,000 / $10,000,000) x 365 = 43.8 = 44 days. This measures the average number of days to collect payment after a sale. A DSO of 44 days against typical net-30 terms indicates customers are paying approximately two weeks late.",
        "Topic": "Receivables management",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used COGS instead of sales in the numerator, or used a 360-day year.",
        "ExplanationWrongB": "This answer may have used inventory or accounts payable instead of accounts receivable.",
        "ExplanationWrongC": "This answer likely computed the accounts receivable turnover (8.33) instead of DSO.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A8-Q2",
        "Type": "numeric",
        "Prompt": "Enter Crest Foods' cash conversion cycle in days, rounded to the nearest whole number.",
        "Correct": "61",
        "Explanation": "The cash conversion cycle is the number of days cash is tied up between paying for inventory and collecting from customers: CCC = DSO + DIO − DPO. DSO = (Accounts receivable / Net sales) × 365 = ($1,200,000 / $10,000,000) × 365 = 43.8 days. DIO = (Inventory / COGS) × 365 = ($1,000,000 / $7,500,000) × 365 = 48.7 days. DPO = (Accounts payable / Purchases) × 365 = ($665,000 / $7,800,000) × 365 = 31.1 days. CCC = 43.8 + 48.7 − 31.1 = 61.35 days, which rounds to 61 days. Recomputed independently: 43.80 + 48.67 − 31.12 = 61.35, so the answer is 61. Note that DPO uses Purchases ($7,800,000) rather than COGS ($7,500,000) because accounts payable arises from purchases, not from cost of goods sold; substituting COGS would overstate DPO to 32.4 days and understate the cycle by roughly one day. A common error is adding DPO rather than subtracting it, which would give 124 days.",
        "Topic": "Cash conversion cycle",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely omitted DPO from the calculation (DSO + DIO = 93) or used incorrect component values.",
        "ExplanationWrongB": "This answer may have added DPO instead of subtracting it, or used sales instead of purchases for DPO.",
        "ExplanationWrongC": "This answer likely used 360 days instead of 365, or miscomputed one of the component ratios.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A8-Q3",
        "Type": "numeric",
        "Prompt": "If Crest tightens credit terms to net-30 and reduces DSO to 30 days, how much working capital would be freed, in dollars?",
        "Correct": "383562",
        "Explanation": "Freed working capital = Reduction in DSO x Daily Sales = (44 - 30) x ($10,000,000 / 365) = 14 x $27,397.26 = $383,562. This represents cash that would no longer be tied up in receivables, available to reduce the line of credit or invest elsewhere.",
        "Topic": "Working capital improvement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLe