var pack_p2_a_part9 = [
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": true,
  "Choices": {
    "A": "0.30",
    "B": "0.12",
    "C": "0.15",
    "D": "0.42"
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Confusing the five Altman Z-score components — particularly mixing up X1 (WC/TA), X2 (RE/TA), and X3 (EBIT/TA), all of which use total assets as the denominator",
  "CorrectChoice": "A",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The Altman Z-score model uses five financial ratios weighted by coefficients to predict bankruptcy probability. X2 is defined as Retained Earnings / Total Assets and reflects cumulative profitability and the firm's age — older, consistently profitable firms accumulate higher retained earnings relative to their asset base, signaling lower bankruptcy risk. X2 = $2,400,000 / $8,000,000 = 0.30. In the five-factor model, X2 carries the third-largest coefficient weight (1.4 in the original public-manufacturing model), making retained earnings relative to total assets a meaningful discriminator between solvent and distressed firms. A candidate should memorize all five Z-score components: X1 = WC/TA, X2 = RE/TA, X3 = EBIT/TA, X4 = MVE/TL, and X5 = Sales/TA.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Option B (0.12) represents the X3 component of the Altman Z-score — Earnings Before Interest and Taxes divided by Total Assets ($960,000 / $8,000,000 = 0.12). While X3 measures operating efficiency and asset utilization independent of leverage and taxes, the question specifically asks for the X2 component, which uses retained earnings rather than EBIT as the numerator. A candidate selecting this option correctly identified that a ratio uses total assets as the denominator but confused which numerator belongs to the X2 slot.",
  "ExplanationWrongC": "Option C (0.15) represents the X1 component of the Altman Z-score — Working Capital divided by Total Assets ($1,200,000 / $8,000,000 = 0.15). X1 measures net liquid assets relative to total capitalization and is typically the most heavily weighted component. A candidate selecting this option correctly identified that total assets serves as denominator but selected the working capital numerator associated with X1 instead of the retained earnings numerator required for X2.",
  "ExplanationWrongD": "Option D (0.42) results from incorrectly summing retained earnings and EBIT before dividing by total assets: ($2,400,000 + $960,000) / $8,000,000 = $3,360,000 / $8,000,000 = 0.42. The Altman model keeps each ratio as a separate, independently weighted component — retained earnings and EBIT appear in distinct ratios (X2 and X3) because they measure different dimensions of financial health. Combining them into a single numerator defeats the model's purpose of capturing multiple independent predictors of distress.",
  "FormulaReference": "Altman Z-Score",
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-050",
  "Section": "A",
  "Stem": "Keystone Manufacturing has the following financial data: working capital of $1,200,000, total assets of $8,000,000, retained earnings of $2,400,000, EBIT of $960,000, market value of equity of $5,600,000, and sales of $12,000,000. Total liabilities are $5,000,000. Credit analyst David Chen is computing the Altman Z-score to assess Keystone's bankruptcy risk and needs the value of the retained earnings to total assets component. The X2 component of the Altman Z-score is closest to:",
  "Topic": "A.050 Altman Z-score component identification",
  "UniqueConceptKey": "A-050-altman-z-score-component-identification",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
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
    "A": "No; operating cash flow of $690,000 provides only 1.97 times coverage of principal, falling short of the 2.0 threshold.",
    "B": "No; operating cash flow of $545,000 provides only 1.56 times coverage of principal, falling substantially short of the 2.0 threshold.",
    "C": "Yes; operating cash flow of $985,000 provides 2.81 times coverage of principal, exceeding the 2.0 threshold.",
    "D": "Yes; operating cash flow of $1,165,000 provides 3.33 times coverage of principal, comfortably exceeding the 2.0 threshold."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Mishandling the signs of working capital changes in the indirect method — particularly adding increases in accounts receivable instead of subtracting, or subtracting depreciation instead of adding it back",
  "CorrectChoice": "C",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Operating cash flow under the indirect method begins with net income and adjusts for non-cash items and changes in working capital. The calculation: OCF = Net Income + Depreciation - Increase in Accounts Receivable + Decrease in Inventory + Increase in Accounts Payable = $780,000 + $220,000 - $90,000 + $45,000 + $30,000 = $985,000. Cash flow coverage of principal = $985,000 / $350,000 = 2.81. Since 2.81 exceeds the board's 2.0 threshold, Riverside meets the policy requirement and may proceed with additional borrowing analysis. A common error under the indirect method is mishandling the directional signs of working capital changes: decreases in assets (inventory declining) add to cash flow, while increases in assets (A/R growing) consume cash flow.",
  "ExplanationWrongA": "Option A is incorrect because it computes operating cash flow as net income minus the increase in accounts receivable only ($780,000 - $90,000 = $690,000), ignoring depreciation, the decrease in inventory, and the increase in accounts payable — three adjustments that collectively add $295,000 to operating cash flow. The resulting coverage of $690,000 / $350,000 = 1.97 falls below the 2.0 threshold.",
  "ExplanationWrongB": "Option B is incorrect because its operating cash flow computation of $545,000 subtracts depreciation instead of adding it back: $780,000 - $220,000 - $90,000 + $45,000 + $30,000 = $545,000. Depreciation is a non-cash expense that reduces net income but does not consume cash — under the indirect method, it must be added back to net income, not subtracted.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D is incorrect because it adds the increase in accounts receivable instead of subtracting it: $780,000 + $220,000 + $90,000 + $45,000 + $30,000 = $1,165,000. An increase in accounts receivable means that more revenue was recognized on an accrual basis than cash was collected from customers — the $90,000 represents uncollected sales that must be subtracted from net income to arrive at actual cash generated.",
  "FormulaReference": "Cash Flow Adequacy Ratio",
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-051",
  "Section": "A",
  "Stem": "Riverside Healthcare reported the following for the year: net income of $780,000, depreciation expense of $220,000, an increase in accounts receivable of $90,000, a decrease in inventory of $45,000, and an increase in accounts payable of $30,000. Annual required principal payments on long-term debt total $350,000. The board of directors has set a policy threshold requiring that operating cash flow cover mandatory principal payments by at least 2.0 times before approving additional borrowing. Senior accountant Fatima Osei must determine whether Riverside meets this threshold. Which of the following is correct?",
  "Topic": "A.051 cash flow adequacy for debt repayment",
  "UniqueConceptKey": "A-051-cash-flow-adequacy-for-debt-repayment",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
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
    "A": "Current ratio 2.50, quick ratio 1.00; the moderate gap reflects normal retail inventory levels, and the quick ratio of 1.00 indicates Bayview can meet all current obligations with liquid assets alone — acceptable for credit approval.",
    "B": "Current ratio 2.50, quick ratio 2.50; no meaningful divergence exists because all current assets, including inventory and prepaids, are readily convertible to cash within the normal operating cycle.",
    "C": "Current ratio 2.50, quick ratio 0.90; inventory accounts for 60% of current assets and the quick ratio of 0.90 is typical for retailers carrying seasonal inventory — the divergence is expected and does not warrant a credit concern.",
    "D": "Current ratio 2.50, quick ratio 0.90; the nearly threefold gap between the two ratios signals that Bayview is heavily dependent on inventory liquidation to satisfy short-term obligations, a material credit risk if inventory turnover slows."
  },
  "CognitiveLevel": "Analyze",
  "CommonTrapReference": "Omitting prepaid expenses from the quick ratio exclusion (only subtracting inventory); treating all current assets as quick assets; dismissing a sub-1.0 quick ratio as acceptable when paired with a strong current ratio without analyzing inventory dependency",
  "CorrectChoice": "D",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "Current ratio = $4,500,000 / $1,800,000 = 2.50. Quick ratio = (Current Assets - Inventory - Prepaid Expenses) / Current Liabilities = ($4,500,000 - $2,700,000 - $180,000) / $1,800,000 = $1,620,000 / $1,800,000 = 0.90. The divergence between 2.50 (current) and 0.90 (quick) — a roughly 2.8x gap — reveals that Bayview is structurally dependent on inventory to satisfy short-term obligations. For every $1.00 of current liabilities, Bayview has only $0.90 in cash and receivables; the remaining $1.60 of coverage comes from inventory ($1.50) and prepaids ($0.10). In credit analysis under ASC 205-10 going concern evaluation, a quick ratio below 1.0 when paired with a strong current ratio signals a potential liquidity timing mismatch: inventory must be sold and converted to receivables before cash is realized, while payables come due on fixed schedules. This is a material credit concern, particularly for a retailer whose inventory is subject to obsolescence, markdown, and seasonal demand shifts.",
  "ExplanationWrongA": "Option A is incorrect because it computes the quick ratio as ($4,500,000 - $2,700,000) / $1,800,000 = 1.00, omitting the $180,000 in prepaid expenses from the exclusion. Prepaid expenses are not quick assets — they represent future services already paid for and cannot be converted to cash to satisfy current liabilities. The correct quick ratio is 0.90. Moreover, a quick ratio of exactly 1.00 with a current ratio of 2.50 would still indicate heavy inventory dependency, not a clean bill of credit health.",
  "ExplanationWrongB": "Option B is incorrect because it treats all current assets as quick assets, reporting both ratios as 2.50. The quick ratio (acid-test ratio) is explicitly a more conservative measure that excludes inventory and prepaid expenses from the numerator — only cash, marketable securities, and accounts receivable qualify as quick assets. The purpose of the quick ratio is precisely to reveal whether short-term obligations can be met without relying on inventory liquidation.",
  "ExplanationWrongC": "Option C is incorrect because, while it correctly computes both ratios (current 2.50, quick 0.90), its interpretation understates the credit risk. A quick ratio below 1.0 is never 'expected and not a concern' in credit analysis — it means the company cannot pay all current liabilities from cash and near-cash resources even if inventory is excluded. For a revolving credit facility renewal, a lender would view 0.90 as a red flag requiring further analysis.",
  "ExplanationWrongD": "",
  "FormulaReference": "Quick Ratio (Acid-Test Ratio)",
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-052",
  "Section": "A",
  "Stem": "Bayview Retailers reports current assets of $4,500,000, consisting of cash of $450,000, accounts receivable of $1,170,000, inventory of $2,700,000, and prepaid expenses of $180,000. Current liabilities total $1,800,000. Credit analyst Sophie Tran is reviewing Bayview's liquidity for a revolving credit facility renewal and observes that the current ratio appears adequate but the quick ratio raises concerns. Which of the following correctly presents both ratios and explains the divergence in a credit context?",
  "Topic": "A.052 current ratio vs quick ratio credit divergence",
  "UniqueConceptKey": "A-052-current-ratio-vs-quick-ratio-credit-divergence",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": false,
  "Choices": {
    "A": "The debt-to-equity ratio rose from 0.92 to 1.35, signaling increased reliance on debt financing that elevates default risk.",
    "B": "The current ratio declined from 2.1 to 1.8, indicating weakened short-term liquidity that undermines refinancing flexibility.",
    "C": "The interest coverage ratio fell from 4.0x to 3.0x, directly measuring Midvale's diminished capacity to service debt from operating earnings.",
    "D": "Return on assets declined from 8.2% to 7.1%, reflecting deteriorating asset efficiency that reduces long-term earning power."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Conflating leverage deterioration with coverage deterioration in credit rating analysis",
  "CorrectChoice": "C",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The correct answer is C. The interest coverage ratio (EBIT / Interest expense) fell from $48M / $12M = 4.0x to $48M / $16M = 3.0x. Under ASC 205-10, going concern assessment requires evaluating an entity's ability to meet obligations as they come due. Credit rating agencies weight interest coverage heavily because it directly measures the margin of safety between operating earnings and debt service costs — the most immediate indicator of default probability. A decline from 4.0x to 3.0x crosses a commonly watched threshold in credit analysis, where cushions below 3.5x trigger heightened scrutiny. The debt-to-equity rise from share repurchases is a consequence, not the proximate cause — rating agencies consider coverage ratios before leverage ratios when assessing near-term credit risk.",
  "ExplanationWrongA": "Option A restates that the debt-to-equity ratio rose from 0.92 to 1.35. This is incorrect because the rise was driven primarily by share repurchases reducing equity, not by additional operational borrowing. A credit analyst would note that stable EBIT with growing interest expense makes coverage deterioration the more proximate credit concern than leverage shift alone.",
  "ExplanationWrongB": "Option B restates that the current ratio declined from 2.1 to 1.8. This is incorrect because a current ratio of 1.8 remains well above typical covenant thresholds and does not indicate imminent liquidity distress. Rating agencies downgrade on structural credit deterioration — declining interest coverage — not modest working capital movement that remains within normal ranges.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D restates that return on assets declined. This is incorrect because the decline is consistent with the increased asset base from refinanced debt, and a 110-basis-point ROA change alone does not trigger a rating downgrade. Profitability trends inform long-term credit views but interest coverage deterioration is the immediate downgrade catalyst.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-053",
  "Section": "A",
  "Stem": "Bancroft Bank's credit analysis team is reviewing Midvale Manufacturing's three-year financial history after a rating agency downgraded Midvale from BBB to BB. The senior credit officer, Elena Torres, must determine which ratio deterioration most likely triggered the downgrade. Midvale's EBIT has been stable at $48 million, with interest expense rising from $12 million to $16 million as the company refinanced floating-rate debt into higher fixed-rate obligations. Total debt grew from $240 million to $310 million, while equity contracted from $260 million to $230 million due to share repurchases.",
  "Topic": "A.053 credit rating migration coverage deterioration",
  "UniqueConceptKey": "A-053-credit-rating-migration-coverage-deterioration",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 842"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": false,
  "Choices": {
    "A": "True leverage is 1.03 when lease liabilities are reclassified as debt, nearly 45% higher than the reported 0.71, indicating substantially higher financial risk.",
    "B": "True leverage remains 0.71 because operating lease payments are periodic expenses that do not represent a fixed obligation comparable to debt principal.",
    "C": "True leverage improves to 0.68 because the right-of-use asset adds to the denominator, offsetting the lease liability and strengthening the balance sheet.",
    "D": "True leverage is 0.89 because only the current portion of lease liabilities should be counted as debt, matching the treatment of current maturities of long-term debt."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Accepting reported leverage ratios at face value without adjusting for off-balance-sheet obligations",
  "CorrectChoice": "A",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The correct answer is A. Under ASC 842, lessees recognize both a right-of-use asset and a lease liability for operating leases. The lease liability represents a genuine financial obligation that credit analysts must treat as debt. Crestview's true debt is $85M + $38M = $123M, and true debt-to-equity is $123M / $120M = 1.03. This 45% increase from the reported 0.71 represents a material change in risk assessment. Credit committees routinely adjust reported leverage for lease obligations because the lease liability has priority in bankruptcy, requires fixed cash outflows, and is economically indistinguishable from secured borrowing.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Option B restates that true leverage remains at 0.71. This is incorrect because operating lease liabilities under ASC 842 are fixed contractual obligations that must be satisfied from cash flows, placing them in the same category as debt for credit assessment. The periodic-expense characterization confuses income statement presentation with balance sheet obligation analysis.",
  "ExplanationWrongC": "Option C restates that true leverage improves to 0.68 because the right-of-use asset offsets the liability. This is incorrect because credit analysis measures debt obligations against equity, not net asset value. The right-of-use asset represents a contractual right to use property, not a financial asset available to repay creditors.",
  "ExplanationWrongD": "Option D restates that only the current portion of lease liabilities should be counted. This is incorrect because credit analysis evaluates total fixed obligations, not just amounts due within one year. The full $38 million in lease commitments represents a claim on future cash flows, and excluding the long-term portion systematically understates credit exposure.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-054",
  "Section": "A",
  "Stem": "Northfield Capital is evaluating a $40 million term loan request from Crestview Logistics, a regional trucking company. Crestview's reported balance sheet shows total debt of $85 million and shareholders' equity of $120 million, yielding a debt-to-equity ratio of 0.71. However, Crestview's notes disclose $38 million in operating lease commitments with an average remaining term of 7 years and a weighted-average discount rate of 6%. Under ASC 842, these leases are on the balance sheet as right-of-use assets and lease liabilities, but Crestview's controller excluded them from the debt-to-equity calculation. Credit analyst David Okonkwo must determine the true leverage position.",
  "Topic": "A.054 off-balance-sheet obligations true leverage",
  "UniqueConceptKey": "A-054-off-balance-sheet-obligations-true-leverage",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 470-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": false,
  "Choices": {
    "A": "The covenants are technically satisfied at reported levels, so the bank should waive any concern and extend the facility on existing terms without modification.",
    "B": "The bank should accelerate the loan immediately because any reclassification of expenses signals fraudulent intent by management, regardless of quantitative covenant compliance.",
    "C": "The bank should demand immediate repayment of all outstanding balances because any EBITDA adjustment, even for legitimate non-recurring items, constitutes a covenant default.",
    "D": "The bank should re-evaluate the credit on adjusted metrics because the reported ratios depend on accounting treatments that obscure economic reality, warranting a covenant reset or additional collateral."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Treating covenant compliance as a binary check-the-box exercise without evaluating economic substance",
  "CorrectChoice": "D",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The correct answer is D. Under ASC 470-10, creditors assess covenant compliance based on both contractual definitions and the economic substance of reported figures. Stonebridge's reported ratios technically exceed covenant thresholds, but the EBITDA figure is inflated by the $4.3 million warehouse sale gain — a non-recurring transaction — and the $2.1 million expense capitalization shifts current costs to future periods. Credit analysis doctrine requires examining whether accounting classifications reflect economic reality, not merely whether they satisfy contractual covenant arithmetic. The bank's credit officer should not accelerate the loan but should use the adjusted metrics to negotiate a covenant reset with tighter definitions of EBITDA or require additional collateral.",
  "ExplanationWrongA": "Option A restates that covenants are technically satisfied and no action is needed. This is incorrect because credit analysis must look through accounting treatments to underlying economic performance. A non-recurring gain and expense capitalization that mask genuine covenant breaches indicate elevated credit risk that warrants renegotiation, not passive acceptance.",
  "ExplanationWrongB": "Option B restates that the bank should accelerate the loan immediately. This is incorrect because reclassification of expenses does not automatically constitute fraud — it may reflect aggressive but defensible accounting interpretation. Proportional credit actions, not punitive loan acceleration, align with prudent banking practice.",
  "ExplanationWrongC": "Option C restates that immediate repayment should be demanded. This is incorrect because not all EBITDA adjustments represent a covenant default. The appropriate response is to evaluate adjusted metrics against the covenant's economic intent and negotiate revised terms, not to exercise the most extreme contractual remedy.",
  "ExplanationWrongD": "",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-055",
  "Section": "A",
  "Stem": "Fairview Community Bank holds a $15 million revolving credit facility with Stonebridge Construction. The credit agreement requires Stonebridge to maintain a fixed charge coverage ratio of at least 1.25x and a debt-to-EBITDA ratio not exceeding 3.5x. Stonebridge's CFO, Priya Nair, reports a fixed charge coverage ratio of 1.31x and a debt-to-EBITDA ratio of 3.2x for the fiscal year. However, the credit analyst notes that Stonebridge reclassified $2.1 million of operating expenses as capital expenditures and sold a warehouse at a $4.3 million gain, booking the gain in EBITDA. Without these adjustments, fixed charge coverage falls to 1.08x and debt-to-EBITDA rises to 4.6x. The credit officer must decide whether to waive the covenant breach.",
  "Topic": "A.055 covenant compliance economic substance",
  "UniqueConceptKey": "A-055-covenant-compliance-economic-substance",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": false,
  "Choices": {
    "A": "Hayes Manufacturing presents lower credit risk because its strong current and quick ratios demonstrate the ability to meet all obligations as they mature, which is the primary concern of any lender.",
    "B": "Neither borrower is creditworthy because both exhibit at least one material weakness — Hayes in solvency and Prescott in liquidity — and banks should not lend to companies with any financial ratio below industry norms.",
    "C": "Prescott Distribution presents lower credit risk because its positive equity cushion and moderate leverage indicate long-term viability, while its tight liquidity can be addressed through the loan proceeds and ongoing cash flow from operations.",
    "D": "Hayes Manufacturing presents lower credit risk because short-term liquidity metrics are the most reliable predictors of default within a 5-year horizon, and solvency concerns can be remedied through future profitability."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Treating liquidity and solvency as interchangeable measures in credit assessment",
  "CorrectChoice": "C",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The correct answer is C. Under ASC 205-10, the going concern assessment requires evaluating both liquidity and solvency, but the relative weight depends on the credit horizon. For a 5-year term loan, solvency — measured by positive equity and sustainable leverage — is the more critical dimension because liquidity ratios are point-in-time snapshots that can be addressed through loan proceeds, while insolvency (negative equity) represents a structural deficiency that persists unless the company generates sustained profitability. Prescott's current ratio of 1.1 is tight but not distressed; the $22 million equity cushion absorbs losses, and the 1.4 debt-to-equity ratio is moderate. Hayes's 3.1 current ratio masks the fundamental problem: when liabilities exceed assets by $8 million, the company is balance-sheet insolvent.",
  "ExplanationWrongA": "Option A restates that Hayes Manufacturing presents lower credit risk based on strong liquidity ratios. This is incorrect because for a 5-year term loan, solvency concerns dominate liquidity. A current ratio of 3.1 does not remedy negative equity of $8 million, which indicates the company's total obligations exceed its asset base and remains a structural vulnerability across the full loan term.",
  "ExplanationWrongB": "Option B restates that neither borrower is creditworthy. This is incorrect because professional credit analysis evaluates trade-offs between liquidity and solvency rather than applying a zero-tolerance standard. Prescott's tight liquidity is manageable with new loan proceeds and ongoing cash flow, and a single ratio below norms does not automatically disqualify an otherwise viable borrower.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Option D restates that short-term liquidity is the most reliable default predictor over a 5-year horizon. This is incorrect because empirical evidence shows that solvency ratios such as debt-to-equity and interest coverage have greater predictive power for default beyond short-term horizons. High liquidity does not protect a lender when the borrower has insufficient equity to absorb losses.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-056",
  "Section": "A",
  "Stem": "Oakmont Credit Union's loan committee is reviewing two borrowers. Hayes Manufacturing shows a current ratio of 3.1 and a quick ratio of 2.4 but has negative retained earnings and total liabilities exceeding total assets by $8 million. Prescott Distribution shows a current ratio of 1.1 and a quick ratio of 0.7 but has positive shareholders' equity of $22 million and debt-to-equity of 1.4. Both companies have operated for over 20 years. Committee chair Robert Okonkwo must determine which borrower presents the lower credit risk for a 5-year term loan.",
  "Topic": "A.056 liquidity solvency distinction credit decisions",
  "UniqueConceptKey": "A-056-liquidity-solvency-distinction-credit-decisions",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
},
{
  "Authorities": [
    "ASC 205-10"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "CalculationItem": false,
  "Choices": {
    "A": "The appropriate coverage ratio should be based on core operating income of $5.9 million because non-recurring items do not represent sustainable cash flow available for debt service, revealing a declining earnings trend masked by reported income growth.",
    "B": "The appropriate coverage ratio should be based on reported net income of $18.2 million because audited GAAP financial statements present the most reliable measure of a borrower's repayment capacity, and all recognized income is equally available to service debt.",
    "C": "The appropriate coverage ratio cannot be determined because the proportion of non-recurring items exceeds 50% of reported income, and the bank should decline the loan until Apex demonstrates at least three consecutive quarters of exclusively operating income growth.",
    "D": "The appropriate coverage ratio should include the litigation settlement and deferred tax release but exclude the facility sale gain, because cash-generating items improve repayment capacity even if they are non-recurring, while asset sale gains are one-time only."
  },
  "CognitiveLevel": "Evaluate",
  "CommonTrapReference": "Computing coverage ratios mechanically from reported net income without recasting for sustainable earnings",
  "CorrectChoice": "A",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ExplanationCorrect": "The correct answer is A. Under ASC 205-10, financial statement analysis for credit decisions requires distinguishing between sustainable earnings and transitory items. Apex's reported net income growth of 27% is misleading: $6.8M from litigation is a non-recurring legal recovery, $3.1M from a facility sale is a disposition gain, and $2.4M from a valuation allowance release is a non-cash accounting adjustment. None represents recurring operating cash flow available for debt service. Core operating income of $5.9 million, down from $7.1 million, reveals a 16.9% decline in the business that will actually generate loan repayment capacity. Basing the debt service coverage ratio on reported $18.2M would dramatically overstate Apex's ability to repay.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Option B restates that audited GAAP net income of $18.2 million should be used. This is incorrect because audited financial statements confirm compliance with recognition standards, not earnings sustainability. Credit analysis requires adjusting for non-recurring items because loan repayment depends on future cash flows from continuing operations, not on one-time gains already realized.",
  "ExplanationWrongC": "Option C restates that the bank should decline the loan pending three quarters of exclusively operating income growth. This is incorrect because a rigid numerical threshold for non-recurring items is not a recognized credit analysis standard. The bank can appropriately adjust coverage ratios to reflect sustainable earnings and negotiate loan terms reflecting the higher risk, rather than declining the application outright.",
  "ExplanationWrongD": "Option D restates that litigation settlement and deferred tax release income should be included but the facility sale gain excluded. This is incorrect because all three items — litigation recovery, disposition gain, and valuation allowance release — are non-recurring in nature and cannot be expected to recur for debt service across the loan term. Selectively including some non-recurring items while excluding others is analytically inconsistent.",
  "FormulaReference": null,
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "Part": 2,
  "Part2OnlyFlag": true,
  "QuestionID": "P2-A-057",
  "Section": "A",
  "Stem": "Summit Commercial Bank is evaluating a $25 million expansion loan for Apex Pharmaceuticals. Apex reported net income of $18.2 million, up 27% from the prior year. The credit analyst, Maria Vega, notes that $6.8 million of the income comes from a litigation settlement, $3.1 million from a gain on the sale of Apex's research facility, and $2.4 million from a deferred tax asset valuation allowance release. Core operating income from pharmaceutical sales was $5.9 million, down from $7.1 million in the prior year. The loan committee must assess Apex's earnings quality to determine the appropriate debt service coverage ratio.",
  "Topic": "A.057 earnings quality lending assessment",
  "UniqueConceptKey": "A-057-earnings-quality-lending-assessment",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Independent answer derived matches stored CorrectChoice",
    "Authority citation matches tested concept"
  ],
  "question_state": "Certified"
}
];
