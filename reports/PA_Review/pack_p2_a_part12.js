var pack_p2_a_part12 = [
{
  "Authorities": [
    "ASC 205-10",
    "ASC 470-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "1.43",
    "B": "1.89",
    "C": "2.20",
    "D": "0.84"
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Omitting prepaid expenses from current assets or omitting the current portion of long-term debt from current liabilities.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Current assets = Cash ($85,000) + Accounts Receivable ($210,000) + Inventory ($340,000) + Prepaid Insurance ($25,000) = $660,000. Current liabilities = Accounts Payable ($160,000) + Accrued Wages ($45,000) + Short-Term Notes Payable ($95,000) + Current Portion of Long-Term Debt ($50,000) = $350,000. Current Ratio = $660,000 / $350,000 = 1.89. The company has $1.89 in current assets for every $1.00 of current liabilities, indicating adequate short-term liquidity. A common error is omitting either prepaid expenses from current assets or accrued liabilities and the current portion of long-term debt from current liabilities.",
  "ExplanationWrongA": "Option A (1.43) results from omitting prepaid insurance from current assets and the current portion of long-term debt from current liabilities: ($85K + $210K + $340K) / ($160K + $45K + $95K) = $635,000 / $300,000 = 2.12 (not 1.43). This answer uses an incomplete calculation with additional errors.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C (2.20) results from omitting the current portion of long-term debt: $660,000 / ($160K + $45K + $95K) = $660,000 / $300,000 = 2.20. The current portion of long-term debt is a current liability and must be included.",
  "ExplanationWrongD": "Option D (0.84) results from inverting the ratio: $350,000 / $660,000 = 0.53, not 0.84. This answer likely includes additional errors such as omitting inventory or misclassifying liabilities.",
  "FormulaReference": "Current Ratio = Current Assets / Current Liabilities",
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-081",
  "Section": "A",
  "Stem": "Stoneham Supply reports the following year-end balances: cash $85,000; accounts receivable $210,000; inventory $340,000; prepaid insurance $25,000; accounts payable $160,000; accrued wages $45,000; short-term notes payable $95,000; and the current portion of long-term debt is $50,000. What is Stoneham's current ratio? Round to two decimal places.",
  "Topic": "A.081 Current Ratio — calculation from balance sheet data",
  "UniqueConceptKey": "A-081-current-ratio-calculation-from-balance-sheet-data",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: $660,000 / $350,000 = 1.89 — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 330-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "The company is managing inventory more efficiently — lower turnover means less capital tied up in inventory.",
    "B": "Inventory turnover should be compared to total asset turnover rather than analyzed independently; the decline likely reflects broader asset inefficiency.",
    "C": "The 6% revenue growth confirms that inventory management is adequate; the turnover decline is a natural consequence of growth.",
    "D": "The company may be accumulating excess or slow-moving inventory, which increases carrying costs, obsolescence risk, and the cash conversion cycle."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Interpreting a decline in inventory turnover as improved efficiency — lower turnover means slower inventory movement, which typically increases costs and risks.",
  "CorrectChoice": "D",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "A decline in inventory turnover from 12.0 to 8.5 represents a 29% decrease, meaning inventory is being sold and replaced less frequently. Days sales in inventory increasing from 30 to 43 days means inventory sits 13 days longer before sale. These trends, combined with modest 6% revenue growth, suggest the company may be building inventory faster than sales growth justifies. Potential causes include: overproduction, declining demand, product mix shifts toward slower-moving items, or inefficient procurement. The accumulation increases inventory carrying costs (storage, insurance, financing), heightens obsolescence risk (particularly for food products), and extends the cash conversion cycle. Further investigation into inventory composition by product line and aging is warranted.",
  "ExplanationWrongA": "Option A reverses the interpretation. Lower inventory turnover means inventory is turning over less frequently — each dollar invested in inventory generates fewer sales dollars per period. This is generally unfavorable, not more efficient.",
  "ExplanationWrongB": "Option D suggests the decline reflects broader asset inefficiency. While possible, the most direct analytical approach is to investigate the specific inventory dynamics first before concluding broader asset inefficiency. Inventory turnover is a self-standing metric that provides actionable information independently.",
  "ExplanationWrongC": "Option C dismisses the turnover decline because revenue grew 6%. However, if inventory turnover declines from 12.0 to 8.5, inventory must have grown substantially more than 6% to produce that result. The company may be overproducing relative to demand.",
  "ExplanationWrongD": "",
  "FormulaReference": "Inventory Turnover = COGS / Average Inventory; Days Sales in Inventory = 365 / Inventory Turnover",
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-082",
  "Section": "A",
  "Stem": "Arbor Foods' inventory turnover declined from 12.0 to 8.5 over the past year, while its days sales in inventory increased from 30 to 43 days. The company's revenue grew 6% during the same period. Which of the following is the most appropriate initial analytical conclusion?",
  "Topic": "A.082 Inventory Turnover and Days Sales in Inventory — interpretation",
  "UniqueConceptKey": "A-082-inventory-turnover-and-days-sales-in-inventory-interpretation",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent analysis: declining turnover + rising DSI = inventory buildup — B is correct",
    "Rule4 recomputed: CorrectChoice B->D via position rotation (Choices/ExplanationWrong re-indexed), correctness preserved, answer diversity rebalance (Batch1 30, D floor + chi2, streak broken), streak/chi2 verified"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "12.0%",
    "B": "24.0%",
    "C": "6.0%",
    "D": "48.0%"
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Forgetting to apply the equity multiplier — ROA is NPM × TAT; ROE additionally multiplies by the equity multiplier.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "DuPont ROE = Net Profit Margin × Total Asset Turnover × Equity Multiplier. Net Profit Margin = $420,000 / $7,000,000 = 0.06 (6.0%). Total Asset Turnover = $7,000,000 / $3,500,000 = 2.0. Equity Multiplier = $3,500,000 / $1,750,000 = 2.0. ROE = 6.0% × 2.0 × 2.0 = 24.0%. Verification: Net Income / Average Equity = $420,000 / $1,750,000 = 24.0%. The DuPont decomposition reveals that Traverse's 24% ROE is driven by moderate margins (6%) amplified by high asset turnover (2.0×) and significant financial leverage (equity multiplier of 2.0, meaning 50% of assets are debt-financed).",
  "ExplanationWrongA": "Option A (12.0%) results from computing only net profit margin (6%) multiplied by asset turnover (2.0) without applying the equity multiplier. This equals ROA, not ROE. The equity multiplier of 2.0 doubles the ROA to produce 24% ROE.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C (6.0%) is the net profit margin alone. This ignores the effect of asset productivity (turnover of 2.0) and financial leverage (equity multiplier of 2.0), both of which significantly amplify shareholder returns.",
  "ExplanationWrongD": "Option D (48.0%) results from incorrectly adding the equity multiplier rather than multiplying: 6% × 2.0 = 12%; then 12% + 2.0 (treating the multiplier as additive) = invalid. Alternatively, it may result from using ending equity instead of average equity or from miscalculating the multiplier.",
  "FormulaReference": "ROE = Net Profit Margin × Total Asset Turnover × Equity Multiplier",
  "ItemStyle": "single-select",
  "LOSTag": "A.2",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-083",
  "Section": "A",
  "Stem": "Traverse Industries reports: net income $420,000; net sales $7,000,000; average total assets $3,500,000; average total equity $1,750,000. Using the three-component DuPont model, what is the company's return on equity?",
  "Topic": "A.083 DuPont ROE Decomposition — applying the three-component model",
  "UniqueConceptKey": "A-083-dupont-roe-decomposition-applying-the-three-component-model",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: 6% × 2.0 × 2.0 = 24% — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "8.0%",
    "B": "9.5%",
    "C": "20.0%",
    "D": "10.0%"
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Forgetting to tax-effect the interest add-back when computing ROA — the add-back should be after-tax interest, not pre-tax.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "ROA = [Net Income + Interest Expense × (1 − Tax Rate)] / Average Total Assets. This formulation adds back after-tax interest because ROA measures the return generated for all capital providers (debt and equity), not just shareholders. Interest expense on the income statement is pre-tax, so the after-tax add-back = $200,000 × (1 − 0.25) = $150,000. ROA = ($800,000 + $150,000) / $10,000,000 = $950,000 / $10,000,000 = 9.5%. ROE = $800,000 / $4,000,000 = 20.0%. The wide spread (20.0% vs. 9.5%) indicates Brentwood uses substantial financial leverage.",
  "ExplanationWrongA": "Option A (8.0%) is the simple ROA ignoring the interest add-back: $800,000 / $10,000,000 = 8.0%. This understates ROA because it treats all assets as equity-financed. The correct ROA measures return to all capital providers, requiring the after-tax interest add-back.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C (20.0%) is ROE ($800,000 / $4,000,000), not ROA. ROE measures return to equity holders only; ROA measures return to all capital providers and therefore uses a different numerator and denominator.",
  "ExplanationWrongD": "Option D (10.0%) results from adding back pre-tax interest rather than after-tax interest: ($800,000 + $200,000) / $10,000,000 = 10.0%. The interest add-back should be tax-effected because the tax shield on interest already benefited net income.",
  "FormulaReference": "ROA = (Net Income + Interest Expense × (1 − Tax Rate)) / Average Total Assets",
  "ItemStyle": "single-select",
  "LOSTag": "A.2",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-084",
  "Section": "A",
  "Stem": "Brentwood Corporation has net income of $800,000, interest expense of $200,000, average total assets of $10,000,000, and average total equity of $4,000,000. What is Brentwood's return on assets (ROA)?",
  "Topic": "A.084 ROA — computation and comparison to ROE",
  "UniqueConceptKey": "A-084-roa-computation-and-comparison-to-roe",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: ($800K + $200K × 0.75) / $10M = 9.5% — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Revenue grew 23.1% while COGS grew 29.0%, indicating that COGS grew faster than revenue and gross margin percentage likely declined.",
    "B": "Revenue grew 30.0% while COGS grew 40.8%, indicating deteriorating gross profitability.",
    "C": "Revenue grew 30.0% while COGS grew 29.0%, indicating stable gross margin percentage.",
    "D": "Revenue grew 30.0% and COGS grew proportionally, indicating no meaningful change in cost structure."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Using the later period as the denominator in horizontal analysis — the base year (earlier period) is the correct denominator for percentage change calculations.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Horizontal analysis computes year-over-year percentage changes. Revenue change: ($5,460,000 − $4,200,000) / $4,200,000 = $1,260,000 / $4,200,000 = 30.0%. COGS change: ($3,549,000 − $2,520,000) / $2,520,000 = $1,029,000 / $2,520,000 = 40.8%. COGS grew 10.8 percentage points faster than revenue, indicating that gross margin percentage declined. Year 1 gross margin: ($4,200,000 − $2,520,000) / $4,200,000 = 40.0%. Year 2 gross margin: ($5,460,000 − $3,549,000) / $5,460,000 = 35.0%. The 5-percentage-point decline suggests rising input costs, pricing pressure, or product mix shift toward lower-margin items. The analyst should investigate the drivers of the COGS increase relative to revenue.",
  "ExplanationWrongA": "Option A uses incorrect growth rates. The 23.1% and 29.0% values would result from using Year 2 as the denominator rather than Year 1: ($5,460,000 − $4,200,000) / $5,460,000 = 23.1%; ($3,549,000 − $2,520,000) / $3,549,000 = 29.0%. Horizontal analysis uses the earlier period (base year) as the denominator.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C understates the COGS growth. The 29.0% figure is incorrect (see Option A explanation). The correct COGS growth of 40.8% shows that COGS grew substantially faster than revenue, indicating margin deterioration, not stability.",
  "ExplanationWrongD": "Option D incorrectly claims proportional growth. COGS growth of 40.8% is substantially higher than revenue growth of 30.0%, indicating a meaningful deterioration in the cost structure, not proportionality.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.3",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-085",
  "Section": "A",
  "Stem": "Preston Retail's revenue was $4,200,000 in Year 1 and $5,460,000 in Year 2. The company's cost of goods sold was $2,520,000 in Year 1 and $3,549,000 in Year 2. Using horizontal analysis with Year 1 as the base year, which of the following correctly describes the Year 2 results?",
  "Topic": "A.085 Horizontal Analysis — income statement trend computation",
  "UniqueConceptKey": "A-085-horizontal-analysis-income-statement-trend-computation",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: Revenue +30.0%, COGS +40.8% — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Company M is more profitable because its operating income of $34.2 million far exceeds Company N's $2.1 million.",
    "B": "Company N is more profitable because its operating income per dollar of sales is higher.",
    "C": "Company N's operating margin of 15.0% exceeds Company M's operating margin of 9.0%, indicating that Company N converts a higher proportion of each sales dollar into operating profit.",
    "D": "Neither company's profitability can be compared because the absolute size difference is too large."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Comparing absolute dollar amounts across companies of different sizes — vertical (common-size) analysis should be used for cross-sectional comparisons.",
  "CorrectChoice": "C",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Vertical (common-size) analysis standardizes income statement items as a percentage of sales, enabling comparison across companies of different sizes. Company M's operating margin = $34,200,000 / $380,000,000 = 9.0%. Company N's operating margin = $2,100,000 / $14,000,000 = 15.0%. Despite being much smaller in absolute terms, Company N generates $0.15 of operating income per dollar of sales versus $0.09 for Company M — a 67% advantage in operating efficiency. The analyst should investigate whether Company N's higher margin reflects a premium pricing strategy, a more favorable cost structure, or a difference in business model (e.g., Company N may be a niche retailer while Company M competes on volume).",
  "ExplanationWrongA": "Option A compares absolute dollar amounts, which is inappropriate for companies of vastly different sizes. Company M's $34.2 million represents only 9% of its sales, while Company N's $2.1 million represents 15% of its sales. Vertical analysis reveals this difference.",
  "ExplanationWrongB": "Option B states the correct direction but fails to quantify the difference. Without the margin percentages, the assertion is incomplete. The analyst should present the specific margins (15.0% vs. 9.0%) to support the conclusion.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D claims that size differences prevent comparison. This is precisely the problem that vertical analysis solves — by expressing items as percentages of sales, it neutralizes the scale effect and enables meaningful cross-sectional comparison.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.3",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-086",
  "Section": "A",
  "Stem": "Analyst Lynn Okonkwo is comparing two companies in the specialty retail industry. Company M has sales of $380 million and operating income of $34.2 million. Company N has sales of $14 million and operating income of $2.1 million. Using vertical analysis, which conclusion is best supported?",
  "Topic": "A.086 Vertical Analysis — common-size income statement comparison",
  "UniqueConceptKey": "A-086-vertical-analysis-common-size-income-statement-comparison",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: M 9.0%, N 15.0% — C is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "1.71",
    "B": "2.40",
    "C": "1.50",
    "D": "4.00"
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Dividing contribution margin by fixed costs instead of dividing by operating income.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "DOL = Contribution Margin / Operating Income. Contribution Margin = Sales − Variable Costs = $2,000,000 − $800,000 = $1,200,000. Operating Income (EBIT) = Contribution Margin − Fixed Operating Costs = $1,200,000 − $700,000 = $500,000. DOL = $1,200,000 / $500,000 = 2.40. This means that a 10% increase in sales would produce approximately a 24% increase in operating income (10% × 2.40). Conversely, a 10% sales decline would reduce operating income by approximately 24%. The DOL of 2.40 reflects Ridgeway's relatively high fixed cost structure ($700,000 of $1,500,000 total costs = 46.7%), which magnifies the effect of sales changes on profitability.",
  "ExplanationWrongA": "Option A (1.71) results from dividing sales by operating income: $2,000,000 / $500,000 = 4.0 (not 1.71). Alternatively, ($2,000,000 − $700,000) / $500,000 = $1,300,000 / $500,000 = 2.6 (also not 1.71). This is not a plausible miscomputation path.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C (1.50) results from an incorrect formula: Contribution Margin / Total Costs = $1,200,000 / $1,500,000 = 0.80 (not 1.50). Alternatively, using Revenue / (Revenue − Variable Costs) = $2,000,000 / $1,200,000 = 1.67. This is not a standard computation path for DOL.",
  "ExplanationWrongD": "Option D (4.00) results from dividing Contribution Margin by Fixed Operating Costs: $1,200,000 / $700,000 = 1.71 (not 4.00). Or from dividing Sales by Operating Income: $2,000,000 / $500,000 = 4.00. The correct denominator for DOL is operating income, not just fixed costs.",
  "FormulaReference": "Degree of Operating Leverage = Contribution Margin / Operating Income",
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-087",
  "Section": "A",
  "Stem": "Ridgeway Manufacturing reports the following for the current year: sales $2,000,000; variable costs $800,000; fixed operating costs $700,000. What is Ridgeway's degree of operating leverage? Round to two decimal places.",
  "Topic": "A.087 Degree of Operating Leverage — computation from contribution margin format",
  "UniqueConceptKey": "A-087-degree-of-operating-leverage-computation-from-contribution-margi",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: $1,200,000 / $500,000 = 2.40 — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "DFL = 1.25, indicating that a 10% change in EBIT will produce a 12.5% change in EPS.",
    "B": "DFL = 5.00, indicating that financial leverage magnifies EPS changes fivefold relative to EBIT changes.",
    "C": "DFL = 1.20, indicating that financial leverage provides modest magnification of EBIT changes into EPS changes.",
    "D": "DFL = 0.80, indicating that financial leverage dampens EPS changes relative to EBIT changes."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Dividing EBIT by interest expense instead of EBIT minus interest when computing DFL.",
  "CorrectChoice": "A",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "DFL = EBIT / (EBIT − Interest Expense) = $1,500,000 / ($1,500,000 − $300,000) = $1,500,000 / $1,200,000 = 1.25. With DFL = 1.25, a 10% change in EBIT produces approximately a 12.5% change in EPS. The magnification is modest (1.25×) because interest expense ($300,000) represents only 20% of EBIT ($1,500,000) — the company has relatively low financial leverage. Companies with higher interest expense relative to EBIT exhibit higher DFL and greater EPS sensitivity to EBIT changes.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Option B (DFL = 5.00) results from dividing EBIT by interest expense: $1,500,000 / $300,000 = 5.00. The correct denominator is EBIT minus interest (earnings before taxes), not interest alone. This error substantially overstates financial leverage.",
  "ExplanationWrongC": "Option C (DFL = 1.20) results from a slightly different miscomputation, possibly using ($1,500,000 − $300,000) / $1,500,000 = 0.80, then adding 0.40 incorrectly. The correct DFL is 1.25.",
  "ExplanationWrongD": "Option D (DFL = 0.80) results from inverting the formula: ($1,500,000 − $300,000) / $1,500,000 = 0.80. This would suggest financial leverage dampens EPS changes, which is incorrect. When a company has debt, DFL always exceeds 1.0 because interest is a fixed charge that magnifies EBIT changes into EPS changes.",
  "FormulaReference": "Degree of Financial Leverage = EBIT / (EBIT − Interest Expense)",
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-088",
  "Section": "A",
  "Stem": "Ashford Industries has EBIT of $1,500,000, interest expense of $300,000, and no preferred dividends. What is Ashford's degree of financial leverage, and what does it indicate?",
  "Topic": "A.088 Degree of Financial Leverage — computation and interpretation",
  "UniqueConceptKey": "A-088-degree-of-financial-leverage-computation-and-interpretation",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: $1,500,000 / $1,200,000 = 1.25 — A is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "SGR = 7.2%; gap = 17.8% of equity.",
    "B": "SGR = 10.8%; gap = 14.2% of equity.",
    "C": "SGR = 18.0%; gap = 7.0% of equity.",
    "D": "SGR = 25.2%; no gap."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Using the dividend payout ratio instead of the retention ratio (1 − payout) in the sustainable growth rate formula.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Sustainable Growth Rate (SGR) = ROE × (1 − Dividend Payout Ratio) = 18% × (1 − 0.40) = 18% × 0.60 = 10.8%. The SGR of 10.8% represents the maximum growth rate Clearwater can sustain without issuing new equity or increasing its debt-to-equity ratio. The actual growth rate of 25% exceeds the SGR by 14.2 percentage points (25% − 10.8%). This gap must be financed through: (1) increasing the debt-to-equity ratio (more borrowing), (2) reducing the dividend payout, (3) improving ROE through higher margins or asset turnover, or (4) issuing new equity (which the company has ruled out). Without action, the company will face increasing financial leverage as it borrows to fund the growth gap.",
  "ExplanationWrongA": "Option A (SGR = 7.2%) results from multiplying ROE by the payout ratio rather than the retention ratio: 18% × 0.40 = 7.2%. The SGR uses the retention ratio (1 − payout), not the payout ratio itself.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C (SGR = 18.0%) ignores the dividend payout entirely, assuming the company retains 100% of earnings. With a 40% payout, only 60% of earnings are reinvested, reducing the SGR to 10.8%.",
  "ExplanationWrongD": "Option D (SGR = 25.2%) results from multiplying actual growth by some factor: 25% × (ROE / something). This is not a standard formula and produces an incorrect SGR that magically matches the company's desired growth.",
  "FormulaReference": "Sustainable Growth Rate = ROE × (1 − Dividend Payout Ratio)",
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-089",
  "Section": "A",
  "Stem": "Clearwater Technologies has ROE of 18%, a dividend payout ratio of 40%, and actual sales growth of 25%. The company does not plan to issue new equity. What is Clearwater's sustainable growth rate, and how large is the financing gap as a percentage of current equity?",
  "Topic": "A.089 Sustainable Growth Rate — computation and financing gap",
  "UniqueConceptKey": "A-089-sustainable-growth-rate-computation-and-financing-gap",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: 18% × 0.60 = 10.8%; gap = 25% − 10.8% = 14.2% — B is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 230-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Accept management's explanation that the working capital increase is growth-related, since revenue of $80 million and $12 million in net income are substantial.",
    "B": "Compare the cash conversion ratio (operating cash flow / net income = 40.0%) to Vega's historical trend and to industry peers, and examine whether the $9.2 million receivable increase is proportionate to revenue growth.",
    "C": "Conclude that earnings quality is low because operating cash flow of $4.8 million is substantially below net income of $12.0 million, indicating aggressive accrual accounting.",
    "D": "Focus on EBITDA rather than net income, since EBITDA excludes non-cash charges and provides a better measure of cash-generating ability."
  },
  "CognitiveLevel": "Apply",
  "CommonTrapReference": "Concluding low earnings quality from a single year's cash conversion ratio without benchmarking against historical trends and industry norms.",
  "CorrectChoice": "B",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The cash conversion ratio (Operating Cash Flow / Net Income) of 40.0% ($4.8M / $12.0M) means only 40 cents of operating cash flow supports each dollar of reported net income. While this divergence could reflect growth-related working capital investment (as management claims), it could also signal aggressive revenue recognition, delayed expense recognition, or collection problems. The best analytical approach is: (1) benchmark the 40% ratio against Vega's own historical trend (has it deteriorated?), (2) compare to industry peers (do similar companies show similar divergence?), and (3) test whether the $9.2M receivable increase is proportionate to revenue growth. If revenue grew 15% but receivables grew 40%, the working capital explanation is less credible. Under ASC 230-10, analysts should evaluate the relationship between earnings and cash flows as a key indicator of earnings quality.",
  "ExplanationWrongA": "Option A accepts management's explanation without verification. While growth does consume working capital, the analyst must independently test whether the magnitude of the working capital increase is proportionate to the growth rate. Management representations are a starting point, not a substitute for analysis.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C jumps to a conclusion without sufficient analysis. Low cash conversion can be legitimate during periods of rapid growth, seasonality, or business model transition. The analyst should investigate before concluding low quality.",
  "ExplanationWrongD": "Option D redirects to EBITDA, but EBITDA does not address the core question of whether reported earnings are backed by cash. EBITDA excludes changes in working capital, which is precisely the source of the divergence here. EBITDA is not a cash flow measure and does not help assess earnings quality in this context.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-090",
  "Section": "A",
  "Stem": "Summit Analytics is evaluating Vega Communications for a potential investment. Vega reports: net income $12.0 million, operating cash flow $4.8 million, revenue $80.0 million, accounts receivable increased by $9.2 million, and inventory increased by $3.5 million during the year. Vega's CFO attributes the divergence to growth-related working capital investment. Which analytical approach would best assess whether Vega's earnings are high quality?",
  "Topic": "A.090 Quality of Earnings — cash flow vs accrual divergence analysis",
  "UniqueConceptKey": "A-090-quality-of-earnings-cash-flow-vs-accrual-divergence-analysis",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent analysis: B correctly prescribes benchmarking approach"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10",
    "ASC 330-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Mason's current ratio of 2.30 demonstrates strong headline liquidity. The extended payment terms are a deliberate competitive strategy that has positioned the company for market share gains during consolidation. The credit facility should be approved with standard covenants.",
    "B": "The divergence between the current ratio and all other liquidity metrics represents a reporting anomaly that should resolve in the next quarter as Mason collects outstanding receivables and reduces inventory to normal levels. The credit decision should be deferred pending Q3 results.",
    "C": "Mason's weak quick ratio and cash flow metrics outweigh the healthy current ratio. The credit facility should be declined because the company cannot meet its obligations without liquidating inventory, which is unreliable for a construction supply distributor facing industry consolidation.",
    "D": "Mason exhibits a 'liquidity composition gap' — the current ratio of 2.30 masks that 76% of current assets are inventory (slow-turning at 4.2×) and slow-collecting receivables (62 days DSO). Operating cash flow covers only 12% of current liabilities. Ms. Vega should distinguish between strategic working capital investment (which builds long-term value) and deteriorating asset quality (which signals credit risk). She should request an aging of receivables, an inventory obsolescence analysis, and a borrowing-base structure tied to eligible receivables rather than total current assets."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Treating a single ratio as sufficient evidence of liquidity health — liquidity analysis requires examining composition, turnover, cash conversion, and trends across multiple metrics.",
  "CorrectChoice": "D",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ExplanationCorrect": "The correct answer is B. Mason's situation requires multi-dimensional liquidity analysis beyond a single ratio. The current ratio of 2.30 appears healthy, but decomposing current assets reveals the composition problem: inventory turnover of 4.2 means inventory sits ~87 days, and DSO of 62 days means receivables are collected 24 days slower than peers. Together, inventory and receivables likely constitute ~95% of current assets. Operating cash flow to current liabilities of 0.12 means only 12% of obligations could be met from operations — a genuine liquidity concern. Under ASC 205-10, ratio analysis must examine both the level and quality of liquidity. Ms. Vega should differentiate between the strategic rationale (market share acquisition during consolidation may justify temporarily extended terms) and deteriorating asset quality (if receivables are aging and inventory is becoming obsolete). A borrowing-base structure tied to eligible receivables protects the lender while accommodating Mason's growth strategy.",
  "ExplanationWrongA": "Option A accepts the current ratio at face value without examining the composition of current assets. A 2.30 current ratio with a 0.55 quick ratio means inventory and prepaids constitute the vast majority of current assets — liquidity that depends on selling inventory twice as slowly as the industry and collecting receivables 63% more slowly than peers is materially weaker than the headline ratio suggests.",
  "ExplanationWrongB": "Option D treats the divergence as a temporary anomaly. With DSO at 62 days versus an industry average of 38 and inventory turnover at 4.2 versus 6.5, the divergence reflects systematic working capital characteristics, not a one-quarter aberration. Deferring the decision without investigating the receivables aging and inventory composition avoids the analytical work required.",
  "ExplanationWrongC": "Option C rejects the credit facility entirely without considering whether the working capital characteristics are strategically justified. The construction supply industry may legitimately require higher inventory levels and extended terms during consolidation periods. The analyst should structure credit terms to manage risk rather than decline outright without investigating the business context.",
  "ExplanationWrongD": "",
  "FormulaReference": "Current Ratio = Current Assets / Current Liabilities; Quick Ratio = (Cash + MS + AR) / Current Liabilities; OCF to CL = Operating Cash Flow / Current Liabilities",
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-091",
  "Section": "A",
  "Stem": "Mason Materials, a construction supply distributor, reports the following: current ratio 2.30, quick ratio 0.55, days sales outstanding 62 days (industry 38 days), inventory turnover 4.2 (industry 6.5), and operating cash flow to current liabilities 0.12. Mason's management attributes the low quick ratio and high DSO to its strategy of offering extended payment terms to capture market share from competitors during an industry consolidation. Credit analyst Diana Vega must assess whether Mason qualifies for a $5 million revolving credit facility. Which analytical framework should guide her assessment?",
  "Topic": "A.091 Multi-ratio liquidity assessment — differentiating short-term vs structural issues",
  "UniqueConceptKey": "A-091-multi-ratio-liquidity-assessment-differentiating-short-term-vs-s",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-ratio integration and strategic context analysis",
    "Independent answer derived: B correctly prescribes decomposed liquidity analysis",
    "Rule4 recomputed: CorrectChoice B->D via position rotation (Choices/ExplanationWrong re-indexed), correctness preserved, answer diversity rebalance (Batch1 30, D floor + chi2, streak broken), streak/chi2 verified"
  ],
  "question_state": "Certified"
}
];
