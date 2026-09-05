var pack_p2_a_part13 = [
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "The ROE increase is primarily driven by improved operational efficiency, as evidenced by the asset turnover increase from 1.25 to 1.40.",
    "B": "The ROE increase is primarily driven by increased financial leverage, as the equity multiplier rose from 2.00 to 2.50 — meaning the proportion of debt financing increased from 50% to 60% of total assets. The declining net profit margin (6.0% to 5.4%) signals weakening operational profitability that is being masked by leverage.",
    "C": "The ROE increase is driven by all three components equally, each contributing approximately 1.3 percentage points to the total 3.9 percentage point increase.",
    "D": "The ROE increase is not explainable through the three-component DuPont model because net profit margin declined; the reported ROE of 18.9% must contain a calculation error."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Attributing ROE changes to a single factor without decomposing the relative contribution of each DuPont component.",
  "CorrectChoice": "B",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ExplanationCorrect": "DuPont decomposition isolates each driver of ROE change. Year 1 ROE = 6.0% × 1.25 × 2.00 = 15.0%. Year 2 ROE = 5.4% × 1.40 × 2.50 = 18.9%. The 3.9 percentage point increase is driven by: (1) Margin effect: the decline from 6.0% to 5.4% reduces ROE by 1.2 points (if turnover and leverage were constant). (2) Turnover effect: the increase from 1.25 to 1.40 adds approximately 1.3 points. (3) Leverage effect: the increase from 2.00 to 2.50 adds approximately 3.8 points — the largest contributor. The equity multiplier increase from 2.00 to 2.50 means Hayden's debt-to-equity ratio rose from 1.0 to 1.5. The analyst should investigate whether the higher leverage is sustainable or whether the declining margin signals competitive pressure that could make the debt burden problematic in a downturn.",
  "ExplanationWrongA": "Option A attributes the ROE increase primarily to asset turnover, which contributed approximately 1.3 points. However, the leverage increase (equity multiplier from 2.00 to 2.50) contributed roughly three times as much. Operational improvement through turnover is positive, but it is not the primary driver of the ROE change.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C claims equal contributions from all three components. The leverage effect was approximately 3.8 points (the dominant driver), the turnover effect approximately 1.3 points, and the margin effect was actually negative (−1.2 points). The contributions are highly unequal, not balanced.",
  "ExplanationWrongD": "Option D claims the ROE is mathematically impossible because margin declined. ROE can increase even when margin declines if turnover or leverage increase sufficiently to offset. The 18.9% ROE is readily verifiable: 5.4% × 1.40 × 2.50 = 18.9%. There is no calculation error.",
  "FormulaReference": "ROE = Net Profit Margin × Total Asset Turnover × Equity Multiplier",
  "ItemStyle": "single-select",
  "LOSTag": "A.2",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-092",
  "Section": "A",
  "Stem": "Hayden Corp's ROE increased from 15.0% in Year 1 to 18.9% in Year 2, yet its net profit margin declined from 6.0% to 5.4%. The analyst decomposes the change using the DuPont model with the following data:\n\n| Component | Year 1 | Year 2 |\n|-----------|--------|--------|\n| Net Profit Margin | 6.0% | 5.4% |\n| Total Asset Turnover | 1.25 | 1.40 |\n| Equity Multiplier | 2.00 | 2.50 |\n\nWhich conclusion about Hayden's ROE increase is best supported by the DuPont decomposition?",
  "Topic": "A.092 DuPont decomposition — diagnosing ROE changes across two periods",
  "UniqueConceptKey": "A-092-dupont-decomposition-diagnosing-roe-changes-across-two-periods",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: Y1 15.0%, Y2 18.9% — B correctly identifies leverage as primary driver"
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
    "A": "The CFO's claim is supported: revenue grew 32% (from $100M to $132M), confirming strong execution. The operating income decline from $20M to $13.2M is entirely attributable to SG&A growth, which represents planned investment for future growth.",
    "B": "Horizontal analysis of each line item reveals that COGS grew 54% ($60M to $92.4M) while revenue grew only 32%, indicating the primary driver of profit erosion is gross margin compression (from 40.0% to 30.0%), not SG&A. Vertical analysis confirms the gross margin declined 10 percentage points, while SG&A remained constant at 20% of revenue. The CFO's attribution to SG&A investment misrepresents the actual cost dynamics.",
    "C": "Both COGS and SG&A grew proportionally with revenue, increasing by exactly 32% over the period. The operating income decline is therefore attributable to fixed costs that did not scale with revenue, consistent with the CFO's explanation.",
    "D": "The operating income trend is irrelevant to assessing the CFO's claim because revenue growth is the primary indicator of execution quality. Operating income should be assessed over a full business cycle, not a two-year window."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Accepting management's attribution of financial results without independently verifying through horizontal and vertical analysis.",
  "CorrectChoice": "B",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ExplanationCorrect": "Horizontal analysis: Revenue growth = ($132M − $100M) / $100M = 32%. COGS growth = ($92.4M − $60M) / $60M = 54%. SG&A growth = ($26.4M − $20M) / $20M = 32%. The key finding is that COGS grew 22 percentage points faster than revenue, driving gross margin compression. Vertical (common-size) analysis: Year 1 gross margin = $40M / $100M = 40.0%. Year 3 gross margin = $39.6M / $132M = 30.0%. Year 1 SG&A = 20.0% of revenue. Year 3 SG&A = 20.0% of revenue (unchanged). The CFO's claim that operating income decline is attributable to SG&A investment is factually incorrect — SG&A remained at exactly 20% of revenue throughout. The gross margin compression of 10 percentage points is the actual driver, likely caused by rising input costs, pricing pressure, or product mix deterioration. This analysis demonstrates why both horizontal and vertical techniques should be applied together to assess financial statement trends accurately.",
  "ExplanationWrongA": "Option A accepts the CFO's claim without verifying it against the data. The analysis shows SG&A remained at exactly 20% of revenue throughout, disproving the claim that SG&A growth drove the decline. The gross margin compression is the actual driver.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C incorrectly claims COGS grew proportionally with revenue. COGS grew 54% while revenue grew 32% — a 22-percentage-point gap that is far from proportional. SG&A did grow proportionally (32%), which is precisely why it cannot explain the operating income decline.",
  "ExplanationWrongD": "Option D dismisses operating income analysis as irrelevant. While business cycle context is valuable, the two-year trend shows a clear and specific pattern — gross margin compression while SG&A remains constant — that is diagnostic regardless of cycle length. An analyst should not defer analysis of a clear trend.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.3",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-093",
  "Section": "A",
  "Stem": "Apex Manufacturing's income statement shows the following trends over three years:\n\n| Line Item | Year 1 | Year 2 | Year 3 |\n|-----------|--------|--------|--------|\n| Revenue ($M) | 100 | 120 | 132 |\n| COGS ($M) | 60 | 78 | 92.4 |\n| Gross Profit ($M) | 40 | 42 | 39.6 |\n| SG&A ($M) | 20 | 24 | 26.4 |\n| Operating Income ($M) | 20 | 18 | 13.2 |\n\nAfter presenting these results, the CFO states that revenue growth of 32% over two years demonstrates strong execution and that operating income declined only because of planned investments in the sales force reflected in SG&A. Which analysis most accurately evaluates the CFO's claim?",
  "Topic": "A.093 Horizontal and vertical analysis — integrated financial statement assessment",
  "UniqueConceptKey": "A-093-horizontal-and-vertical-analysis-integrated-financial-statement",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: revenue +32%, COGS +54%, GM 40%→30%, SG&A constant at 20% — B is correct"
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
    "A": "ForgeCo faces greater risk because it has higher interest expense ($6M vs. $1M), making it more vulnerable to default in a downturn.",
    "B": "PrecisionParts faces greater risk because its higher variable cost ratio (60% vs. 30%) means costs will not decline proportionally with sales, compressing margins further in a downturn.",
    "C": "ForgeCo faces greater risk because its combined leverage (DOL × DFL) is significantly higher. Its high fixed operating costs ($25M) amplify the EBIT impact of a sales decline, and its high interest expense ($6M) further amplifies the EPS impact.",
    "D": "Both companies face equal risk because they have identical EBIT, identical sales, and operate in the same industry facing the same 15% sales decline."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Comparing companies on current profitability alone without analyzing the leverage-driven variability in their earnings.",
  "CorrectChoice": "C",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ExplanationCorrect": "ForgeCo: Contribution Margin = $50M × (1 − 0.30) = $35M. Operating Income = $35M − $25M = $10M. DOL = $35M / $10M = 3.50. DFL = $10M / ($10M − $6M) = 2.50. Combined Leverage = 3.50 × 2.50 = 8.75. A 15% sales decline produces approximately a 131% decline in EPS (15% × 8.75 = 131.25%). PrecisionParts: Contribution Margin = $50M × (1 − 0.60) = $20M. Operating Income = $20M − $10M = $10M. DOL = $20M / $10M = 2.00. DFL = $10M / ($10M − $1M) = 1.11. Combined Leverage = 2.00 × 1.11 = 2.22. The same 15% sales decline produces approximately a 33% EPS decline. ForgeCo's combined leverage of 8.75 versus 2.22 means its earnings are nearly four times more sensitive to sales changes. While both companies report the same EBIT today, their risk profiles are dramatically different. Under ASC 205-10, financial statement analysis must assess not only current profitability but also the earnings variability implied by the cost structure and capital structure.",
  "ExplanationWrongA": "Option A correctly identifies ForgeCo's higher interest expense as a risk factor but omits the operating leverage component. ForgeCo's high fixed operating costs ($25M) create substantial operating leverage that amplifies the EBIT decline before interest is even considered. The combined effect of both leverages is the relevant risk measure.",
  "ExplanationWrongB": "Option B incorrectly identifies PrecisionParts as facing greater risk. While higher variable costs mean a lower DOL (costs adjust more with sales), this reduces, not increases, earnings variability. Companies with high variable costs have lower operating leverage and therefore lower earnings risk from sales declines.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D treats identical current EBIT as implying identical risk. Current profitability is a level measure; risk is about variability. Two companies with the same EBIT can have dramatically different sensitivity to sales changes depending on their fixed-to-variable cost mix and the proportion of debt in their capital structure.",
  "FormulaReference": "DOL = CM / EBIT; DFL = EBIT / (EBIT − Interest); Combined Leverage = DOL × DFL",
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-094",
  "Section": "A",
  "Stem": "Two companies in the industrial machinery sector — ForgeCo and PrecisionParts — report identical EBIT of $10 million and identical sales of $50 million. However, their cost structures and capital structures differ materially:\n\n| Metric | ForgeCo | PrecisionParts |\n|--------|---------|----------------|\n| Variable Costs / Sales | 30% | 60% |\n| Fixed Operating Costs | $25M | $10M |\n| Interest Expense | $6M | $1M |\n| Tax Rate | 25% | 25% |\n\nAn economic downturn is expected to reduce industry sales by 15% next year. Which company faces greater total earnings risk, and why?",
  "Topic": "A.094 Operating and financial leverage — combined leverage effect on earnings variability",
  "UniqueConceptKey": "A-094-operating-and-financial-leverage-combined-leverage-effect-on-ear",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent calculation: ForgeCo CL=8.75, PrecisionParts CL=2.22 — C is correct"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 230-10",
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Orion's earnings quality is deteriorating across all three dimensions — cash conversion (OCF/NI declining from 1.15 to 0.51), collection efficiency (DSO expanding from 41 to 67 days), and earnings composition (non-recurring items rising from 2% to 19%). While the CFO's explanations are plausible individually, the convergence of all three indicators in the same direction warrants heightened skepticism about whether reported earnings reflect sustainable operating performance.",
    "B": "Orion's earnings quality remains strong because revenue growth accelerated to 14% in Year 3, confirming strong market demand. The cash conversion decline and DSO increase are natural consequences of growth, and the restructuring charges represent genuine value-creating investments.",
    "C": "Orion's earnings quality cannot be assessed from these four indicators alone. A complete assessment requires calculating at least ten additional ratios and reviewing the full audit opinion.",
    "D": "Orion's earnings quality improved because the company is investing in growth through strategic acquisitions, as evidenced by restructuring charges. The declining cash conversion ratio is a temporary artifact that will reverse as synergies materialize."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Evaluating earnings quality indicators in isolation rather than looking for convergence — multiple indicators deteriorating simultaneously is a stronger signal than any single indicator.",
  "CorrectChoice": "A",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "ExplanationCorrect": "Option A correctly identifies the convergence of three independent earnings quality indicators as a pattern that warrants skepticism. Cash conversion declining from 1.15 to 0.51 means that in Year 1, operating cash flow exceeded net income (high quality), but by Year 3, only 51 cents of cash backed each dollar of earnings. DSO expanding from 41 to 67 days (a 63% increase) while revenue grew only 14% suggests receivables are accumulating faster than sales. Non-recurring items rising from 2% to 19% of net income means nearly one-fifth of reported earnings derive from items the company itself classifies as non-recurring. Under ASC 230-10 and ASC 205-10, when multiple earnings quality indicators deteriorate simultaneously, the analyst should investigate whether aggressive accounting practices, rather than legitimate business strategy, explain the pattern. The CFO's explanations may be accurate, but the convergence of indicators requires independent verification rather than acceptance at face value.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Option B accepts the CFO's explanations without scrutiny. While revenue grew 14% in Year 3, the 67-day DSO means a substantial portion of that revenue has not been collected. Growth accompanied by deteriorating cash conversion and expanding receivables is a classic pattern of low-quality earnings, not healthy expansion.",
  "ExplanationWrongC": "Option C claims the four indicators are insufficient, but the convergence of cash conversion, DSO, and non-recurring items all deteriorating in the same direction provides substantial diagnostic information. While additional analysis is always valuable, the pattern is sufficiently clear to reach a preliminary assessment.",
  "ExplanationWrongD": "Option D treats the deterioration as a positive indicator of investment. While restructuring charges from acquisitions may generate future value, the simultaneous decline in cash conversion and expansion of DSO are not typical features of value-creating acquisitions. These patterns more commonly indicate integration problems, revenue quality issues, or aggressive accounting.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-095",
  "Section": "A",
  "Stem": "Investment analyst Rachel Tran reviews three earnings quality indicators for Orion Medical Devices:\n\n| Indicator | Year 1 | Year 2 | Year 3 |\n|-----------|--------|--------|--------|\n| Cash Conversion Ratio (OCF/NI) | 1.15 | 0.92 | 0.51 |\n| Days Sales Outstanding | 41 | 48 | 67 |\n| Unusual/Non-Recurring Items (% of NI) | 2% | 8% | 19% |\n| Revenue Growth | 12% | 10% | 14% |\n\nOrion's CFO explains that the declining cash conversion reflects a strategic decision to offer extended payment terms to hospital networks during a consolidation wave, and that the non-recurring items primarily represent restructuring charges from acquired facilities that will generate significant synergies in future periods. Which assessment of Orion's earnings quality is best supported?",
  "Topic": "A.095 Earnings quality — comprehensive assessment across multiple dimensions",
  "UniqueConceptKey": "A-095-earnings-quality-comprehensive-assessment-across-multiple-dimens",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-dimensional earnings quality assessment with strategic context",
    "Independent analysis: A correctly identifies convergence pattern as earnings quality concern"
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
    "A": "Support the CEO's debt-funded expansion — Wellington's 22% historical growth rate demonstrates the business model works, and European market entry represents a logical next step that will generate returns exceeding the cost of debt.",
    "B": "Recommend that Wellington reduce its growth target to the sustainable growth rate of 12% (16% ROE × 0.75 retention ratio) and abandon the European expansion to preserve financial flexibility.",
    "C": "Recommend a blended financing approach: reduce the dividend payout from 25% to 15% to increase retained earnings, issue a portion of the $40 million as equity to moderate the leverage increase, and phase the European entry over three years rather than one. This trades off maximum growth speed for financial resilience.",
    "D": "Recommend that Wellington maintain the 22% growth rate, fund the European expansion entirely with retained earnings by suspending dividends, and keep the debt-to-equity ratio at the current 1.8 level."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Selecting between binary extremes (all debt or no growth) when a blended strategy that balances growth with financial sustainability is often the correct recommendation.",
  "CorrectChoice": "C",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "ExplanationCorrect": "The correct answer is C. The sustainable growth rate under current policy is 16% × 0.75 = 12%, meaning Wellington is already growing at nearly double its self-funding capacity. The 22% historical growth has already pushed debt-to-equity to 1.8 (63% above the industry average) and TIE to 3.2× (half the industry average). Accelerating to 30% with 100% debt financing would push leverage toward 3.0× and TIE below 2.0× — levels that risk covenant violations and rating downgrades. Option C offers a realistic middle path: reducing the payout ratio to 15% increases the SGR to 13.6%, an equity issuance moderates the leverage increase, and phased entry reduces the peak financing requirement. While this sacrifices maximum growth speed, it preserves financial flexibility and avoids the binary choice between reckless leveraging and abandoning growth entirely. Financial strategy should balance growth ambition with capital structure sustainability.",
  "ExplanationWrongA": "Option A accepts the CEO's proposal without addressing the financial risk. A debt-to-equity ratio approaching 3.0 with TIE below 2.0× would likely violate existing covenants and potentially trigger a credit rating downgrade. Historical growth does not guarantee future returns, particularly in a new geographic market with different competitive dynamics.",
  "ExplanationWrongB": "Option B recommends abandoning growth entirely to maintain the SGR. While the SGR is 12%, companies can and do grow above their SGR by adjusting capital structure, dividend policy, or equity issuance. Reducing growth to the SGR is the most conservative option but may sacrifice legitimate value-creation opportunities.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D is mathematically infeasible. Funding a $40 million expansion entirely with retained earnings while suspending dividends would require $40 million of net income available for retention. At ROE of 16%, this implies equity of $250 million, meaning net income of $40 million — exactly matching the requirement. But this ignores that the company is already growing at 22%, which itself consumes retained earnings for working capital and fixed asset investment. The $40 million for European entry is incremental to ongoing growth needs.",
  "FormulaReference": "Sustainable Growth Rate = ROE × (1 − Dividend Payout Ratio)",
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-096",
  "Section": "A",
  "Stem": "Wellington Outdoor Gear has grown revenue at 22% annually for five years, funded primarily through retained earnings and increasing debt. Current financial profile: ROE 16%, dividend payout ratio 25%, debt-to-equity ratio 1.8 (industry average 1.1), and times interest earned 3.2× (industry average 6.5×). The board has approved a plan to accelerate growth to 30% annually by entering the European market, requiring $40 million in additional capital. The CEO proposes funding the expansion entirely with additional debt, arguing that Wellington's growth trajectory justifies higher leverage. The CFO counters that the debt-to-equity ratio would approach 3.0 and TIE would fall below 2.0×, potentially violating existing debt covenants. Which recommendation best addresses the strategic-financial tension?",
  "Topic": "A.096 Sustainable growth — evaluating growth strategy against financial constraints",
  "UniqueConceptKey": "A-096-sustainable-growth-evaluating-growth-strategy-against-financial",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-stakeholder strategic trade-off analysis",
    "Independent analysis: C correctly recommends blended financing approach"
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
    "A": "Both companies achieve similar ROE because they operate in the same industry with identical competitive pressures. The ratio differences are immaterial variations expected in any industry comparison.",
    "B": "MedCore achieves its 24% ROE through operational excellence — high gross margin (28% vs. 18%), high inventory turnover (14.0 vs. 8.0), and low DSO (22 vs. 35 days) — with conservative financial leverage (D/E 0.40). PharmaLink achieves its 22% ROE by compensating for weaker operations (lower margin, slower turnover, slower collections) with substantially higher financial leverage (D/E 1.80 vs. 0.40).",
    "C": "PharmaLink's higher ROE of 22% (vs. MedCore's 24%) suggests PharmaLink is the superior operator because it achieves nearly the same return with a lower gross margin, demonstrating better cost control.",
    "D": "MedCore's higher gross margin of 28% is unsustainable and likely reflects aggressive revenue recognition. PharmaLink's 18% gross margin is more consistent with the industry median, making its ROE more reliable."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Comparing companies on ROE alone without decomposing how each achieves its return — high-ROE companies can have very different risk profiles.",
  "CorrectChoice": "B",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "ExplanationCorrect": "Option B correctly identifies that similar ROE can be achieved through fundamentally different business model configurations. MedCore's DuPont decomposition: high margin (28% gross, 10% operating) drives profitability; high inventory turnover (14.0) and low DSO (22 days) drive asset efficiency; and a conservative D/E of 0.40 means the equity multiplier is modest (~1.40). PharmaLink's DuPont: weaker operations in every dimension (18% gross margin, 8.0 inventory turnover, 35 days DSO) are offset by an equity multiplier of approximately 2.80 (D/E of 1.80). The leverage compensates for operational weakness. Under ASC 205-10, cross-sectional analysis must examine how each DuPont component contributes to ROE — two companies with similar ROE may have dramatically different risk profiles. MedCore's ROE is 'higher quality' in the sense that it derives from operational strength rather than financial engineering. PharmaLink's ROE is more fragile because it depends on leverage that could become problematic if interest rates rise or EBITDA declines.",
  "ExplanationWrongA": "Option A dismisses the ratio differences as immaterial. The differences are substantial — MedCore's gross margin is 56% higher, inventory turnover is 75% higher, and D/E is 78% lower than PharmaLink's. These differences reveal fundamentally different business models and risk profiles.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C incorrectly interprets PharmaLink as the superior operator. PharmaLink's ROE of 22% on a lower gross margin would indeed be impressive if the margin difference were the only factor. However, PharmaLink's ROE is achievable only because of its high leverage (D/E 1.80), which increases financial risk. The lower margin is not a sign of cost control — operating margin of 6% versus MedCore's 10% confirms operational underperformance.",
  "ExplanationWrongD": "Option D speculates about revenue recognition without evidence. MedCore's higher gross margin could reflect a differentiated product mix, superior supplier relationships, or a more favorable customer mix — all legitimate competitive advantages. The analyst should investigate before concluding aggressive accounting.",
  "FormulaReference": "ROE = Net Profit Margin × Total Asset Turnover × Equity Multiplier",
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-097",
  "Section": "A",
  "Stem": "Three competing pharmaceutical distributors report the following ratios:\n\n| Ratio | MedCore | PharmaLink | HealthChain | Industry Median |\n|-------|---------|------------|-------------|-----------------|\n| Gross Margin | 28% | 18% | 22% | 22% |\n| Operating Margin | 10% | 6% | 8% | 8% |\n| Inventory Turnover | 14.0 | 8.0 | 11.0 | 10.0 |\n| DSO | 22 days | 35 days | 28 days | 30 days |\n| Debt-to-Equity | 0.40 | 1.80 | 0.90 | 1.00 |\n| ROE | 24% | 22% | 20% | 18% |\n\nMedCore and PharmaLink report nearly identical ROE (24% vs. 22%). Which statement best explains how these two companies achieve similar ROE through fundamentally different business models?",
  "Topic": "A.097 Comparative ratio analysis — cross-sectional interpretation with industry context",
  "UniqueConceptKey": "A-097-comparative-ratio-analysis-cross-sectional-interpretation-with-i",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-company DuPont decomposition and business model analysis",
    "Independent analysis: B correctly explains ROE parity through different business models"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 280-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Divest Consumables because it has the lowest revenue growth (3%), the lowest operating income ($10.5M), and the highest capital expenditure intensity (17.1% of revenue vs. 12.2% for Equipment and 5.6% for Services).",
    "B": "Retain Consumables because it generates $10.5M in operating income on $90M of assets — an 11.7% return on assets that exceeds the 10% WACC. While lower-growth, it is value-accretive. The capital should instead be reallocated within Consumables to improve its growth rate.",
    "C": "Divest Consumables and reallocate its $90M in assets to the Services division, which generates the highest margin (15.0% vs. Equipment's 15.0% — they are equal) and the highest growth (15%). This maximizes consolidated ROI.",
    "D": "The data is insufficient for a divestiture decision because it does not include cash flow from operations, working capital balances, or the potential sale price of the Consumables division."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Recommending divestiture based on incomplete data — segment profitability is necessary but not sufficient for capital allocation decisions.",
  "CorrectChoice": "D",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "ExplanationCorrect": "While the segment data provides useful profitability indicators, a divestiture decision requires additional information that is not presented. Specifically: (1) Cash flow from operations by division — operating income is an accrual measure; cash generation may differ materially due to working capital and depreciation differences. (2) Working capital investment — a division with high operating income but heavy working capital requirements may consume more cash than it generates. (3) Potential sale price — Consumables generates $10.5M of operating income; at a typical 8-10× multiple, it could sell for $84-105M. Whether the sale proceeds, reinvested in higher-growth divisions, exceed Consumables' ongoing value depends on this price. (4) Inter-division dependencies — Consumables may supply critical inputs to Equipment, making divestiture operationally disruptive. Under ASC 280-10 (Segment Reporting), segment profitability is one input to capital allocation decisions but is not sufficient alone. A complete divestiture analysis requires cash flow data, sale valuation, and operational interdependency assessment.",
  "ExplanationWrongA": "Option A focuses on revenue growth and capital intensity but does not address whether Consumables creates or destroys value. Its operating ROA of 11.7% (after adjusting for allocated overhead) exceeds the 10% WACC, suggesting it is value-accretive despite low growth. Low growth alone does not justify divestiture if the division earns returns above its cost of capital.",
  "ExplanationWrongB": "Option B correctly notes that Consumables earns above its cost of capital but recommends retaining it without considering the opportunity cost — whether the $90M in assets could generate higher returns if redeployed to Equipment or Services. The capital allocation question is not whether Consumables creates value, but whether it creates more value than the alternative use of its assets.",
  "ExplanationWrongC": "Option C recommends divesting and reallocating to Services but does not verify that Services can absorb an additional $90M in capital at its current 15% ROI. The marginal return on additional investment in Services may be lower than the average return if the highest-return projects have already been funded.",
  "ExplanationWrongD": "",
  "FormulaReference": "Return on Assets = Operating Income / Total Assets",
  "ItemStyle": "single-select",
  "LOSTag": "A.2",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-098",
  "Section": "A",
  "Stem": "Nexus Industries operates three divisions. The CFO has proposed divesting the Consumables division to focus capital on the Equipment and Services divisions. Selected data:\n\n| Division | Revenue | Operating Income | Identifiable Assets | Capital Expenditures | Revenue Growth |\n|----------|---------|-----------------|--------------------|---------------------|----------------|\n| Equipment | $180M | $27M | $150M | $22M | 8% |\n| Services | $90M | $13.5M | $60M | $5M | 15% |\n| Consumables | $70M | $10.5M | $90M | $12M | 3% |\n\nNexus's corporate overhead is $8M, allocated equally to divisions for performance reporting. The WACC is 10%. Which recommendation regarding the proposed divestiture is best supported by the data?",
  "Topic": "A.098 Profitability analysis — evaluating segment performance and capital allocation",
  "UniqueConceptKey": "A-098-profitability-analysis-evaluating-segment-performance-and-capita",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-dimensional capital allocation analysis",
    "Independent analysis: D correctly identifies data insufficiency for divestiture decision"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 470-10",
    "ASC 460-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "Mr. Rios is correct — debt-to-EBITDA is $420M / $115M = 3.65×, which rounds to 3.7×. Without the joint venture guarantee and using only on-balance-sheet debt, the ratio technically satisfies the covenant. Fixed charge coverage = ($115M + $14M) / ($38M + $14M + $6M/(1−0.25)) = $129M / $60M = 2.15×, which exceeds 1.5×. Sutton is in compliance.",
    "B": "Mr. Rios is incorrect — the debt-to-EBITDA covenant is violated. Including the $22M joint venture guarantee (which represents a contingent obligation that the lender would consider), total debt is $442M and the ratio is $442M / $115M = 3.84×, exceeding the 3.5× cap. The certification should disclose the violation and negotiate a waiver or amendment.",
    "C": "Mr. Rios is incorrect on both covenants. Debt-to-EBITDA is $420M / $115M = 3.65× (violation at the 3.5× cap). Fixed charge coverage excludes operating lease payments and preferred dividends, making the ratio $115M / $38M = 3.03× — far above the 1.5× floor, so only the leverage covenant is violated.",
    "D": "Mr. Rios should certify compliance because the joint venture guarantee is not recognized under GAAP and the fixed charge coverage ratio substantially exceeds the required minimum. The debt-to-EBITDA ratio of 3.65× is a borderline violation that is immaterial for a company of Sutton's size."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Certifying covenant compliance using only GAAP-reported amounts while ignoring off-balance-sheet obligations and lender-defined debt definitions in credit agreements.",
  "CorrectChoice": "B",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "ExplanationCorrect": "Two issues undermine the compliance certification. First, debt-to-EBITDA: while GAAP-only debt of $420M / $115M EBITDA = 3.65×, lenders typically define debt to include contingent obligations such as guarantees of unconsolidated entities. Including the $22M JV guarantee produces $442M / $115M = 3.84×, clearly exceeding the 3.5× cap. Second, fixed charge coverage: the proper calculation is (EBITDA − Maintenance Capex) / (Interest + Operating Lease Payments + Preferred Dividends / (1 − t)). Using the standard calculation: ($115M − $18M) / ($38M + $14M + $6M / 0.75) = $97M / $60M = 1.62×, which exceeds 1.5×. The leverage covenant is violated regardless of whether the JV guarantee is included. Under ASC 470-10, management must consider the full economic substance of credit arrangements when certifying compliance, not just GAAP recognition thresholds.",
  "ExplanationWrongA": "Option A incorrectly calculates the ratios and excludes the JV guarantee. Debt-to-EBITDA of 3.65× already violates the 3.5× covenant (even without the guarantee). The fixed charge coverage calculation omits maintenance capex from the numerator and incorrectly includes EBITDA rather than (EBITDA − Maintenance Capex) as the starting point.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Option C correctly identifies the leverage covenant violation but incorrectly computes fixed charge coverage. Operating lease payments and preferred dividends should be included in the denominator (adjusted for taxes on preferred dividends). The correct denominator is $38M + $14M + $8M = $60M, producing coverage of 1.62× (not 3.03×). The fixed charge covenant is met, but only barely.",
  "ExplanationWrongD": "Option D recommends certifying compliance despite a known covenant violation. Materiality is not a defense for covenant violations — debt covenants are binary (either satisfied or breached), not subject to materiality thresholds. Certifying false compliance could trigger cross-default provisions across all of Sutton's debt agreements and potentially constitute securities fraud if Sutton has public debt.",
  "FormulaReference": "Debt-to-EBITDA = Total Debt / EBITDA; Fixed Charge Coverage = (EBITDA − Maintenance Capex) / (Interest + Lease Payments + Preferred Dividends/(1−t))",
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-099",
  "Section": "A",
  "Stem": "CFO Javier Rios of Sutton Energy must certify compliance with two loan covenants: (1) debt-to-EBITDA ≤ 3.5×, and (2) fixed charge coverage ratio ≥ 1.5×. Sutton reports: total debt $420M, EBITDA $115M, interest expense $38M, operating lease payments $14M, preferred dividends $6M, and maintenance capital expenditures of $18M. The tax rate is 25%. Sutton's auditor notes that the company has guaranteed $22M of debt for an unconsolidated joint venture — this guarantee is not recognized on Sutton's balance sheet. Mr. Rios states that Sutton is in full compliance with both covenants. Which assessment of the compliance certification is most appropriate?",
  "Topic": "A.099 Integrated leverage and coverage — covenant compliance scenario",
  "UniqueConceptKey": "A-099-integrated-leverage-and-coverage-covenant-compliance-scenario",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by multi-covenant compliance with off-balance-sheet complexity",
    "Independent calculation: D/EBITDA 3.65-3.84× violates 3.5× cap — B is correct"
  ],
  "question_state": "Certified"
}
];
