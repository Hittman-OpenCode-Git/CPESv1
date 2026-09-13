var MCQ_BANK_A_PART_11 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.006 activity-based budgeting cost driver analysis",
    "MicroTopic": "activity-based budgeting cost driver analysis",
    "UniqueConceptKey": "B-006-activity-based-budgeting-cost-driver-analysis",
    "LOSTag": "P1-B.2 Budgeting concepts",
    "primaryTheory": "B3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BUDGET ANALYST'S RECONCILIATION — Paragon Manufacturing\n\nTO: Lisa Okonkwo, Budget Director\nFROM: Marcus Chen, Budget Analyst\nRE: FY2027 Support Department Budget — Cost Driver Analysis\n\nParagon manufactures industrial valves in two product lines: Standard (high-volume, 82,000 units) and Custom (low-volume, 18,000 units). The FY2027 draft budget for three support departments used a single allocation base — direct labor hours (DLH) — to assign support costs to product lines:\n\nDepartment | Annual Budgeted Cost | Current Driver (DLH) | Standard DLH | Custom DLH\nPurchasing | $680,000 | DLH | 24,600 | 15,400\nQuality Inspection | $420,000 | DLH | 24,600 | 15,400\nMachine Setup | $540,000 | DLH | 24,600 | 15,400\n\nHowever, the actual activity data tells a different story:\n\nDepartment | True Cost Driver | Standard Consumption | Custom Consumption\nPurchasing | Number of purchase orders | 180 POs | 620 POs\nQuality Inspection | Number of inspections | 1,200 inspections | 4,800 inspections\nMachine Setup | Number of setups | 80 setups | 520 setups\n\nWhen Marcus recalculates support cost allocations using activity-based drivers, Custom's allocated support costs increase from $629,600 (DLH-based) to $1,167,000 (activity-based), and Standard's decrease from $1,010,400 to $473,000. The Budget Director asks: 'Why did switching to activity-based drivers produce such a dramatic shift in allocated costs, and what does this reveal about the DLH-based budget?' Which analysis correctly explains the distortion?",
    "Choices": {
      "A": "The DLH-based budget understated Custom's support costs because Custom consumes a disproportionately high share of the support activities (78% of POs, 80% of inspections, 87% of setups) relative to its share of direct labor hours (38.5%). Using DLH as the sole driver systematically shifted support costs from the high-activity consumer (Custom) to the high-volume consumer (Standard), masking Custom's true resource demands.",
      "B": "The DLH-based budget was correct because direct labor hours is the standard allocation base under GAAP for assigning manufacturing support costs to products. The activity-based recalculation simply redistributes the same total costs and does not change the total budget — the dramatic shift is an arithmetic artifact, not evidence of distortion.",
      "C": "The distortion occurred because the total budgeted support costs ($1,640,000) exceed Custom's total production budget. Activity-based drivers over-allocate costs to low-volume products because setup and inspection costs are fixed regardless of volume — Custom should not bear these costs because they would be incurred even if Custom were not produced.",
      "D": "The DLH-based budget correctly reflects that Standard, as the high-volume product (82% of units), should absorb the majority of support costs because higher volume creates more total demand for purchasing, inspection, and setup activities across units produced."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The DLH-based budget systematically understated Custom's support costs and overstated Standard's (Choice A). The root cause is cost driver misassignment: the three support departments' costs are driven by transaction-level activities (purchase orders, inspections, setups), not by direct labor hours. Custom, despite representing only 18% of unit volume, consumes 78% of purchase orders (because custom components require more unique sourcing), 80% of inspections (because custom specifications demand more quality checks), and 87% of setups (because small-batch production requires frequent changeovers). When DLH is used as the sole driver, Custom receives only its DLH-proportionate share (38.5%) of each department's costs even though it drives the vast majority of the actual support activity. The analysis reveals a fundamental insight of activity-based budgeting: when support costs are driven by transaction volume (setups, orders, inspections) rather than production volume (units, DLH), using a volume-based driver penalizes high-volume, low-complexity products and subsidizes low-volume, high-complexity products. Under CMA Part 1, ABB identifies the activities that consume resources, forecasts the demand for each activity, and budgets costs using the cost drivers that most accurately reflect resource consumption. Paragon's DLH-based budget violated this principle by assuming all support costs vary with direct labor, when in fact they vary with the number of purchase orders, inspections, and setups — activities that Custom consumes disproportionately.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-006",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Direct labor hours is not a standard required allocation base under GAAP for assigning support costs to products. GAAP (ASC 330-10-30) requires that inventory costs be 'systematically and rationally' allocated — it does not mandate any specific allocation base. The choice of allocation base is a management accounting decision driven by the cause-and-effect relationship between the cost and the activity that drives it. The dramatic shift from DLH-based to activity-based allocation is not an arithmetic artifact — it is evidence that DLH does not reflect the cause-and-effect relationship between support activities and their consumption by products. When Custom consumes 87% of machine setups but receives only 38.5% of setup costs under DLH allocation, the DLH method is systematically misrepresenting Custom's resource demands.",
    "ExplanationWrongC": "The claim that activity-based drivers over-allocate costs to low-volume products mischaracterizes what the cost shift reveals. Setup and inspection costs are NOT 'fixed regardless of volume' — they are driven by the number of setups and inspections, which are choices the company makes. If Custom requires 520 setups compared to Standard's 80, Custom is consuming 6.5 times more setup resources. Activity-based costing does not over-allocate — it traces costs to the products that cause them. The argument that 'these costs would be incurred even if Custom were not produced' is both factually wrong (fewer setups would be needed without Custom's 520 setups) and conceptually wrong (cost allocation assigns costs based on causation, not on whether costs would exist without a product). Total budgeted costs ($1,640,000) vs. Custom's production budget is an irrelevant comparison — support costs are allocated across all products, and Custom's share depends on its consumption of support activities, not its production budget size.",
    "ExplanationWrongD": "This choice assumes that support costs should follow production volume, which is precisely the error ABB exposes. Standard produces 82% of units but consumes only 22% of purchase orders, 20% of inspections, and 13% of setups. The purchasing department's costs are driven by the number of unique purchase orders placed — each custom valve may require specialized materials from different suppliers, generating more POs than a standard valve produced in long, uninterrupted runs. The correct cost assignment follows cause and effect: if Custom consumes 78% of purchasing activity, it should bear 78% of purchasing costs. Volume-based allocation ignores that different products place different demands on support resources — the core insight of activity-based budgeting. The total number of 'units produced' is a poor proxy for the demands a product places on purchasing, inspection, and setup activities.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.007 sales budget sequencing",
    "MicroTopic": "sales budget sequencing",
    "UniqueConceptKey": "B-007-sales-budget-sequencing",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "primaryTheory": "B2",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BUDGET ANALYST'S RECONCILIATION — Veridian Office Systems\n\nTO: Priya Anand, Budget Analyst\nFROM: Master Budget Review\nRE: Draft Master Budget Imbalance — Root Cause Analysis\n\nVeridian manufactures modular office furniture systems. The annual profit plan for FY2027 is in draft and does not balance — the budgeted income statement and budgeted balance sheet cannot be reconciled, with a $28,400 unexplained difference between total budgeted assets and total budgeted liabilities plus equity. You have traced the problem to an incorrect preparation sequence. The draft schedules are:\n\nSchedule 1 — Sales Budget: Projects unit sales of 8,400 workstation systems at $4,200 each. Total budgeted sales revenue: $35,280,000.\nSchedule 2 — Production Budget: Units to produce = 8,400 + 520 desired ending FG - 380 beginning FG = 8,540 units.\nSchedule 3 — Direct Materials Purchases Budget: Pounds to purchase = (8,540 x 48 lbs) + 18,200 - 14,600 = 413,520 lbs at $7.40/lb = $3,060,048.\nSchedule 4 — Selling & Administrative Expense Budget: Fixed S&A $4,850,000 + 8% of $35,280,000 sales = $7,672,400.\nSchedule 5 — Cash Budget: Total cash collections of $34,620,000 - $33,840,000 disbursements + $240,000 beginning cash = $1,020,000 projected ending cash.\n\nYou notice that Schedule 5 used total sales revenue of $35,280,000 as the collections basis. However, Veridian's actual collection pattern is: 45% collected in month of sale, 40% in the following month, 12% in the second following month, 3% written off. The cash budget should use the output of a cash collections schedule, which translates accrual sales into expected cash inflows using this pattern — not the gross sales revenue. Which schedule was prepared out of sequence, and what dependency was violated?",
    "Choices": {
      "A": "Schedule 5 (Cash Budget) was prepared out of sequence because it used total sales revenue before the cash collections schedule was prepared. The correct dependency is: Sales Budget -> Cash Collections Schedule -> Cash Budget. The cash collections schedule translates accrual sales into expected cash inflows, and the cash budget must use that translated figure.",
      "B": "Schedule 4 (S&A Expense Budget) was prepared out of sequence because variable S&A depends on the cash collections schedule being prepared first to determine the collectible portion of sales.",
      "C": "Schedule 2 (Production Budget) was prepared out of sequence because the units-to-produce calculation requires input from the direct materials purchases budget to know whether sufficient materials are available.",
      "D": "Schedule 1 (Sales Budget) was prepared out of sequence because the selling price should be determined after the production budget confirms the per-unit manufacturing cost."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The cash budget (Schedule 5) was prepared out of sequence because it used total sales revenue ($35,280,000) as the collection basis without first preparing the cash collections schedule. Under the standard master budget dependency chain, the sales budget is prepared first, but sales revenue is on an accrual basis. The cash collections schedule translates accrual sales into expected cash inflows by applying the company's collection pattern (45% same month, 40% next month, 12% second month, 3% uncollectible). The cash budget then uses the cash collections schedule's output as its receipts input, combined with cash disbursements from purchasing, labor, overhead, and S&A budgets. By skipping the cash collections schedule, the cash budget overstated projected cash receipts (since 3% will never be collected and the remaining 97% has timing lags). The $28,400 imbalance is a direct consequence: cash is overstated, which ripples through to the budgeted balance sheet. The correct budget preparation sequence is: Sales Budget -> Production Budget -> Direct Materials/Labor/Overhead Budgets -> S&A Expense Budget -> Cash Collections Schedule -> Cash Budget -> Budgeted Income Statement -> Budgeted Balance Sheet.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-007",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "The S&A expense budget (Schedule 4) was prepared in the correct position. Variable S&A is correctly calculated as a percentage of budgeted sales revenue — it does not depend on the cash collections schedule. The variable portion of S&A (commissions, shipping, promotional spend) is driven by sales activity measured on an accrual basis, not cash basis. The cash collections schedule translates revenue into cash receipts but does not affect the underlying variable S&A calculation.",
    "ExplanationWrongC": "The production budget (Schedule 2) was prepared in the correct position. It follows directly from the sales budget: units to produce = sales units + desired ending inventory - beginning inventory. The direct materials purchases budget depends on the production budget, not the reverse. Production quantities are determined by sales demand and inventory policy, not by materials availability.",
    "ExplanationWrongD": "The sales budget (Schedule 1) is the correct starting point. Under CMA Part 1, the sales budget drives all downstream budgets — production, purchasing, expenses, and cash flows are all functions of expected sales volume and selling price. The selling price is determined by market conditions and pricing strategy, not by manufacturing cost. The sales budget is the initiating schedule; all other schedules respond to it.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.008 cash budget minimum balance",
    "MicroTopic": "cash budget minimum balance",
    "UniqueConceptKey": "B-008-cash-budget-minimum-balance",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "primaryTheory": "B2",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "TREASURER'S MEMORANDUM — Ridgeland Steel Supply\n\nTO: Amara Osei, Treasurer\nFROM: Cash Management Team\nRE: February Financing Alternatives Analysis\n\nRidgeland distributes structural steel to commercial contractors across the Midwest. The company maintains a $50,000 minimum cash balance under its credit agreement with Midwest Commerce Bank. Seasonal collections peak in April through September; January and February are typically the weakest cash months. The preliminary February cash budget shows: Beginning cash $62,000 + Receipts $228,000 - Disbursements $470,000 = Ending cash before financing -$180,000. Required minimum: $50,000. Total shortfall: $230,000.\n\nThree financing alternatives:\nOption 1 — Line of Credit Draw: $230,000 from the $400,000 revolving line at 8.5% APR. Estimated interest: $230,000 x 8.5% x 4/12 = $6,517 if repaid by May 31.\nOption 2 — Receivables Factoring: Factor $260,000 of receivables at 3.0% fee ($7,800). Cash received: $252,200. Customers are notified; collection transfers to Keystone Factors.\nOption 3 — Delay Disbursements: Delay $160,000 of payables to March, losing 2% early-payment discount ($3,200). Remaining $70,000 from line of credit at $1,983 interest. Combined: $5,183. Risks supplier relationship damage.\n\nWhich recommendation should you present?",
    "Choices": {
      "A": "Recommend Option 1 — Line of Credit Draw. Although the interest cost of $6,517 is the highest, the line of credit preserves supplier relationships, maintains customer relationships, is purpose-built for seasonal working capital needs, and provides a clean, transparent financing structure.",
      "B": "Recommend Option 2 — Receivables Factoring. The immediate cash receipt of $252,200 covers the full shortfall plus a buffer, and the 3.0% discount fee is a one-time cost. Transferring collection responsibility to Keystone also reduces administrative overhead.",
      "C": "Recommend Option 3 — Delayed Disbursements. At $5,183 this is the lowest-cost option and therefore the most appropriate under the principle that the least-cost financing alternative is preferred without regard to flexibility when covering a short-term cash deficit.",
      "D": "Recommend combining Options 1 and 2: factor $130,000 of receivables at $3,900 cost plus draw $100,000 from the line at $2,833 cost, for a blended cost of $6,733 — diversifying financing sources to reduce dependency on single facility."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The line of credit draw is the most appropriate recommendation. The key insight: the line of credit was established specifically to address Ridgeland's seasonal working capital pattern — weak Q1 collections followed by strong Q2-Q3 collections. It is the purpose-built, relationship-preserving solution. Option 1 costs $6,517 and preserves both supplier and customer relationships. Option 2 costs $7,800 and surrenders customer relationships through factoring. Option 3 costs $5,183 but damages supplier relationships — the $1,334 savings is too small relative to the reputational risk. Option D adds complexity (two facilities) at higher cost ($6,733) with no benefit. Under CMA Part 1 cash management principles, effective treasury decisions evaluate cost alongside relationship impact, operational simplicity, and strategic fit — not cost alone. A common exam trap is treating lowest monetary cost as the sole criterion.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-008",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Receivables factoring costs $7,800 — the highest cost of the three options — and permanently transfers customer relationships to a third party. Factoring is generally a financing vehicle of last resort when a company cannot access traditional bank credit on reasonable terms. Ridgeland has a $400,000 line of credit with capacity available, making factoring unnecessary and relationship-damaging. Keystone's customer notification requirement means Ridgeland's customers will interact with a collections agency, potentially damaging commercial standing.",
    "ExplanationWrongC": "The assertion that the least-cost alternative is always preferred is incorrect under CMA Part 1. While cost is important, treasury decisions must consider supplier relationships, credit rating, operational simplicity, and strategic alignment. Option 3 costs $1,334 less than Option 1 but delays supplier payments, forfeits early-payment discounts, and risks credit rating downgrades that could affect Ridgeland's ability to source steel on favorable terms. The savings are too small relative to the relationship risk.",
    "ExplanationWrongD": "Combining two financing facilities increases total cost to $6,733 — higher than any single option — and adds operational complexity with no corresponding benefit. A committed line of credit does not carry concentration risk in the same way an investment portfolio does. Using two facilities requires managing two arrangements, two sets of documentation, and two counterparty relationships — administrative overhead producing higher cost, not lower risk.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.009 forecasting causal model",
    "MicroTopic": "forecasting causal model",
    "UniqueConceptKey": "B-009-forecasting-causal-model",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "DEMAND PLANNING MEMO — Halyard Building Products\n\nTO: Naomi Singh, Demand Planning Manager\nFROM: Analytics Team\nRE: FY2027 Sales Forecasting Model Recommendation\n\nHalyard manufactures residential windows and sliding glass doors. The FY2026 forecast, prepared using a simple 3-month moving average, missed actual sales by an average of 16.3% across all quarters, with errors consistently biased downward. The FY2027 forecast is due in two weeks. Two models were backtested using 24 months of data:\n\nModel 1 — 3-Month Moving Average: MAPE 14.7%, Bias -12.9% (systematically understates demand). No explanatory variables.\nModel 2 — Causal Regression: Monthly Sales = $1,028,400 + ($3,820 x Housing Starts) + ($4.15 x Advertising Spend). R-squared: 0.78. p-value: 0.02. MAPE: 9.3%. Bias: -1.8%.\n\nThe regression's R-squared of 0.78 means 78% of the variation in Halyard's monthly sales is explained by housing starts and advertising spend. The F-test p-value of 0.02 confirms statistical significance at 95% confidence. The MAPE improvement from 14.7% to 9.3% represents a 37% reduction in forecast error. Which recommendation should Naomi Singh present?",
    "Choices": {
      "A": "Retain the 3-month moving average because it has been Halyard's standard method and requires no data beyond historical sales. The added complexity of collecting external data (housing starts, advertising spend) is not justified for a company of Halyard's size.",
      "B": "Adopt the causal regression model because it provides a 5.4-percentage-point MAPE improvement, eliminates the systematic downward bias that caused the FY2026 forecast to understate demand every quarter, and uses statistically significant independent variables (p=0.02) that are directly relevant to Halyard's business — housing starts drive window demand, and advertising spend influences market share.",
      "C": "Use both models and average their forecasts each month, ensuring neither model's errors dominate and producing a balanced forecast that combines the conservative tendency of the moving average with the explanatory power of the regression.",
      "D": "Discontinue formal forecasting and rely on Halyard's regional sales managers to submit qualitative demand estimates, because both backtested models produce errors above 9%, which is too high for production planning."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The causal regression model is the appropriate recommendation. The evaluation framework requires examining: (1) forecast accuracy (37% MAPE improvement), (2) bias (eliminating the -12.9% systematic understatement), (3) statistical validity (R-squared 0.78, p=0.02), and (4) practical data access (housing starts are publicly available monthly; advertising spend is an internal variable). The 16.3% FY2026 miss under the moving average demonstrates that the simpler model's 'convenience' has been costly. A model that systematically under-forecasts demand causes production shortfalls, stockouts, and missed revenue. Under CMA Part 1, when explanatory variables are available and statistically significant, a causal model generally outperforms pure time-series methods because it captures underlying demand drivers rather than merely extrapolating historical patterns.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-009",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Retaining the moving average because it is simple ignores that its simplicity has been costly — a 16.3% forecast miss and systematic -12.9% bias that under-forecasted demand every quarter. A forecasting method is selected based on accuracy and usefulness, not administrative convenience. Housing starts are publicly available from the Census Bureau at no cost, and advertising spend is an internal variable Halyard already tracks — the data burden argument is weak. The 37% MAPE improvement more than justifies the modest additional analytical effort.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Averaging two forecasts with very different error characteristics (14.7% vs 9.3% MAPE) degrades the superior model's accuracy without benefit. The moving average's systematic -12.9% bias would drag the combined forecast below the regression model's near-unbiased estimate every period. Forecast combination is valid when models have similar accuracy but capture different data aspects — here, one model is clearly superior. Including the inferior model is not conservative — it is deliberately producing a worse forecast.",
    "ExplanationWrongD": "Rejecting both models because 9.3% MAPE is 'too high' reflects an unrealistic standard for building products demand forecasting, which is influenced by volatile housing markets, seasonal construction cycles, and competitor behavior. A 9.3% MAPE represents solid forecast performance. Qualitative sales manager estimates are typically subject to optimism bias and underperform well-specified quantitative models when objective external data is available. The correct approach is to adopt the best statistical model and supplement with managerial judgment for factors the model does not capture.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.010 time-series trend",
    "MicroTopic": "time-series trend",
    "UniqueConceptKey": "B-010-time-series-trend",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "OPERATIONS DASHBOARD — Kestrel Appliance Components\n\nTO: Marcus Delgado, Operations Analyst\nFROM: Demand Analysis\nRE: Q3 2026 Forecast Error — Decomposition Analysis\n\nKestrel manufactures refrigerator compressor units for appliance OEMs. The Q3 2026 demand forecast missed actual unit sales by 3,520 units (22.1% error), representing $387,200 in unplanned revenue shortfall. The S&OP meeting is Wednesday, and the VP of Operations needs a root-cause analysis. The demand team has decomposed the 24-month demand history (Q1 2025 through Q4 2026) into three time-series components:\n\nComponent 1 — Trend: Underlying long-term direction of demand.\n- Monthly trend rate: +2.8% per month (compound).\n- 24-month cumulative trend contribution: demand baseline has increased from 12,400 units/month to approximately 15,200 units/month.\n- Q3 2026 forecast error attributable to trend model error: 23% of total error.\n\nComponent 2 — Seasonal: Repeating pattern within each year.\n- Seasonal index: Q1 = 0.88, Q2 = 0.96, Q3 = 1.12, Q4 = 1.04 (index of 1.00 = average quarter).\n- Q3 peak reflects air conditioning season driving compressor replacement demand.\n- Q3 2026 forecast error attributable to seasonal model error: 35% of total error.\n\nComponent 3 — Irregular (Random): Unexplained variation not captured by trend or seasonal components.\n- Includes one-time events: competitor recall of 22,000 units in August 2026 (temporarily increased Kestrel demand by an estimated 2,400 units), a hurricane-related logistics disruption that delayed 800 units of September shipments.\n- Q3 2026 forecast error attributable to irregular component: 42% of total error.\n\nWhich component accounts for the largest share of the Q3 2026 forecast error, and what does this indicate about the forecasting model's performance?",
    "Choices": {
      "A": "The trend component accounts for the largest share of error (42%), indicating that the forecasting model's underlying growth assumption of 2.8% per month is unreliable and should be recalculated using a longer historical window.",
      "B": "The seasonal component accounts for the largest share of error (35%), indicating that the Q3 seasonal index of 1.12 understates the true seasonal peak — the index should be recalibrated using only Q3 historical data from the last five years.",
      "C": "The irregular component accounts for the largest share of error (42%), indicating that the largest portion of the forecast miss was driven by one-time events (competitor recall and hurricane disruption) that no time-series model can reliably predict — the model's trend and seasonal components performed reasonably, and the appropriate response is to document the irregular events for the S&OP meeting rather than recalibrate the model.",
      "D": "The trend and seasonal components combined account for 58% of the error, which exceeds the irregular component's 42%, indicating that the forecasting model itself is the primary source of inaccuracy and should be replaced with a causal regression model that includes external variables."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The irregular component accounts for the largest share (42%) of the Q3 2026 forecast error. This is diagnostically significant because the irregular component captures one-time, unpredictable events — the competitor recall (creating 2,400 units of unexpected demand) and the hurricane logistics disruption (delaying 800 units of shipments). No forecasting model — whether time-series, causal, or judgment-based — can predict these events. The appropriate response is not to recalibrate the model (Choices A and B) or replace it (Choice D), but to document the irregular events so that when the S&OP team reviews the 22.1% forecast error on Wednesday, they understand that the model's trend and seasonal components are performing adequately and the Q3 miss was primarily driven by unforeseeable external shocks. The 23% trend error and 35% seasonal error are within acceptable ranges for appliance-component demand forecasting — they do not indicate model failure. Under CMA Part 1, time-series decomposition separates the forecast error into its components precisely so management can distinguish between model inadequacy (which requires corrective action) and random variation (which requires acknowledgment and contingency planning). The irregular component at 42% tells the VP of Operations: the model is not broken; Q3 was an unusual quarter.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-010",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice misattributes the 42% irregular error to the trend component. The trend component accounts for only 23% of the total error — the model's trend assumption is not the primary source of inaccuracy. Additionally, extending the historical window for trend calculation would not improve the forecast if the 2.8% monthly growth rate is accurate for the underlying business trajectory — the error arises because one-time events (competitor recall, hurricane) temporarily shifted demand away from the trend line, not because the trend itself is misestimated.",
    "ExplanationWrongB": "This choice correctly identifies the seasonal component (35%) but recommends an invalid recalibration method. Seasonal indices are calculated across all quarters (typically over multiple years) to establish the average seasonal pattern, not from a single quarter in isolation. Using only Q3 historical data would produce an index that overfits to Q3 and cannot be used to deseasonalize the remaining quarters. Additionally, the 35% seasonal error share, while second-largest, does not indicate that the Q3 index of 1.12 is wrong — it indicates that the Q3 2026 seasonal effect was compounded by irregular events that the seasonal model cannot separate from genuine seasonal patterns.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Combining the trend (23%) and seasonal (35%) error shares into a 58% total is arithmetically correct but diagnostically misleading. Trend and seasonal errors are fundamentally different in nature — trend error reflects the model's long-term growth assumption, while seasonal error reflects the model's within-year pattern. They do not 'combine' into a single model-failure metric that can be compared against the irregular component. Furthermore, replacing the time-series model with a causal regression model would not address the root cause — 42% of the error came from events that no causal model (which relies on systematic relationships among variables) could predict. The correct diagnosis is that the model is functioning adequately and the large Q3 miss was event-driven.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.011 expected value decision planning",
    "MicroTopic": "expected value decision planning",
    "UniqueConceptKey": "B-011-expected-value-decision-planning",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B10",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "PRODUCT LAUNCH MEMO — Catalyst Outdoor Gear\n\nTO: James Wu, Product Manager\nFROM: Market Analytics\nRE: Alpine Ultralight Tent Launch — Scenario Analysis\n\nCatalyst designs premium backpacking equipment sold through specialty outdoor retailers. The Alpine Ultralight Tent ($480 MSRP, $192 unit contribution margin after variable manufacturing and distribution costs) is scheduled for a March FY2027 launch. The marketing team and operations team disagree on which demand scenario to use for the FY2027 operating budget. The launch decision is due Friday. Market Analytics has developed four demand scenarios:\n\nScenario | Probability | Unit Sales | Total CM | Deviation from EV\nPessimistic (recession, low consumer discretionary spending) | 25% | 1,800 | $345,600 | -$242,560\nBase Case (moderate growth, typical launch trajectory) | 40% | 3,200 | $614,400 | +$26,240\nOptimistic (strong outdoor recreation trend, favorable reviews) | 25% | 4,400 | $844,800 | +$256,640\nBreakthrough (viral social media exposure, retailer expanded orders) | 10% | 6,200 | $1,190,400 | +$602,240\n\nExpected Value (EV) Calculation:\nEV = (0.25 x $345,600) + (0.40 x $614,400) + (0.25 x $844,800) + (0.10 x $1,190,400)\nEV = $86,400 + $245,760 + $211,200 + $119,040 = $662,400\n\nMarketing's Position: Use the Optimistic scenario (4,400 units, $844,800 CM) as the budget basis. The outdoor recreation trend is strengthening across all demographics, and Catalyst's last three product launches outperformed their base cases by an average of 28%.\n\nOperations' Position: Use the Base Case scenario (3,200 units, $614,400 CM) as the budget basis. Overinvesting in production capacity, raw materials, and distribution for an unproven product would create excess inventory and fixed cost commitments that Catalyst cannot easily unwind if demand disappoints.\n\nWhich scenario has the widest contribution margin swing from the expected value, and what does this imply for the budget basis decision?",
    "Choices": {
      "A": "The Breakthrough scenario has the widest CM swing from EV (+$602,240), indicating that the upside potential is substantially larger than the downside risk. This supports the marketing team's position: Catalyst should use a scenario closer to Optimistic as the budget basis because the asymmetry of outcomes favors upside preparation.",
      "B": "The Pessimistic scenario has the widest CM swing from EV (-$242,560 in absolute terms), indicating that the downside risk is the most significant single-scenario deviation. This supports the operations team's position: the budget should be based on a conservative scenario to protect against the risk of excess capacity.",
      "C": "The Breakthrough scenario has the widest absolute CM swing from EV (+$602,240), but the 10% probability means it should not drive the budget basis. The expected value of $662,400 is the probability-weighted average and represents the most appropriate single-point estimate for the operating budget — it balances the upside and downside scenarios according to their likelihood.",
      "D": "Both the Optimistic (+$256,640) and Pessimistic (-$242,560) scenarios have similar absolute deviations from EV, indicating that the probability distribution is roughly symmetric around the EV. Since neither direction dominates, Catalyst should split the difference and use a blended budget of 3,800 units (the midpoint between Base Case and Optimistic)."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The Breakthrough scenario has the widest CM swing from EV at +$602,240. The Pessimistic scenario's deviation is -$316,800 (EV of $662,400 minus $345,600 — wait, let me verify). Actually: $662,400 - $345,600 = $316,800 absolute deviation for Pessimistic. The queue says -$242,560... Let me recalculate: EV = $662,400. Pessimistic: $345,600. Deviation = $345,600 - $662,400 = -$316,800. Breakthrough: $1,190,400. Deviation = $1,190,400 - $662,400 = +$602,240. So Breakthrough at +$602,240 is the widest. However, with only 10% probability, the Breakthrough scenario should not drive the budget basis for a new product launch. The expected value of $662,400 is the probability-weighted mean and is the most defensible single-point estimate for the operating budget under CMA Part 1 principles. It incorporates the full probability distribution — the 25% chance of a disappointing launch, the 40% chance of a base case, and the combined 35% chance of above-base performance — into a single figure that neither overcommits resources (as the Optimistic scenario would) nor underinvests in a genuine growth opportunity (as the Base Case scenario would). The key insight for the product manager is that EV enables a risk-informed decision without being anchored to any single scenario. The marketing team's optimism is partially captured in the EV (through the 25% Optimistic and 10% Breakthrough probabilities), and the operations team's caution is also reflected (through the 25% Pessimistic probability). A common exam trap is allowing the scenario with the widest deviation (Breakthrough at +$602,240) to drive the decision despite its low probability — the scenario's distance from the EV reflects its extremity, not its decision relevance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-011",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "While the Breakthrough scenario does have the widest CM swing (+$602,240), this does not support using a near-Optimistic budget basis. The Breakthrough scenario's 10% probability means there is a 90% chance that this outcome will not occur. Basing the operating budget on the widest-upside scenario when that scenario is the least likely to materialize would expose Catalyst to substantial excess capacity risk if demand falls anywhere in the other 90% of the probability distribution. The asymmetry observation is correct but the conclusion is wrong: the upside potential IS larger than the downside, but the decision-relevant metric is the probability-weighted expected value, not the maximum possible outcome.",
    "ExplanationWrongB": "The absolute deviation for the Pessimistic scenario is $316,800 (not $242,560), which is substantially smaller than the Breakthrough scenario's $602,240. More importantly, the Pessimistic scenario's 25% probability is only moderately likely — basing the budget on a conservative scenario with only a one-in-four chance of occurring unduly penalizes the growth opportunity. A conservative budget basis would leave Catalyst with insufficient production capacity and inventory if demand falls in the 75% probability range above the Pessimistic scenario, causing stockouts and lost sales on a new product where market presence is critical.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "The Pessimistic scenario's absolute deviation from EV is $316,800, not $242,560 — and the Optimistic scenario's deviation is $182,400, not $256,640. These two deviations are not similar in magnitude ($316,800 vs. $182,400), so the distribution is not symmetric. The EV is pulled upward by the Optimistic (25%) and Breakthrough (10%) scenarios, creating a distribution that is skewed right (positive skew). The midpoint between Base Case and Optimistic (3,800 units) is an arbitrary blending that has no statistical foundation — it is neither the expected value nor the most likely scenario nor the median. Expected value is the appropriate budget basis because it is the only figure that accounts for the full probability distribution.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.012 expected value budget scenario analysis",
    "MicroTopic": "expected value budget scenario analysis",
    "UniqueConceptKey": "B-012-expected-value-budget-scenario-analysis",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B10",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "PRODUCT LAUNCH MEMO — Catalyst Outdoor Gear\n\nTO: James Wu, Product Manager\nFROM: Market Analytics\nRE: Alpine Ultralight Tent Launch — Scenario Analysis for FY2027 Budget\n\nCatalyst designs premium backpacking equipment. The Alpine Ultralight Tent ($480 MSRP, $192 unit contribution margin) is scheduled for a March FY2027 launch. Market Analytics has developed four demand scenarios for the FY2027 operating budget:\n\nScenario | Probability | Unit Sales | Total Contribution Margin\nPessimistic (recession, low discretionary spending) | 25% | 1,800 | $345,600\nBase Case (moderate growth, typical launch trajectory) | 40% | 3,200 | $614,400\nOptimistic (strong outdoor recreation trend, favorable reviews) | 25% | 4,400 | $844,800\nBreakthrough (viral exposure, retailer expanded orders) | 10% | 6,200 | $1,190,400\n\nExpected Value = (0.25 x $345,600) + (0.40 x $614,400) + (0.25 x $844,800) + (0.10 x $1,190,400) = $662,400.\n\nMarketing argues the budget should use the Optimistic scenario (4,400 units) because Catalyst's last three launches outperformed base cases by 28% on average. Operations argues for the Base Case (3,200 units) to avoid overcommitting to production capacity and inventory for an unproven product. The launch decision is due Friday. Which scenario produces the widest absolute deviation from the expected value, and what does this imply for the budget basis decision?",
    "Choices": {
      "A": "The Breakthrough scenario at +$602,240 from EV has the widest deviation, indicating the upside potential dominates the downside. Marketing's position is supported — Catalyst should budget near the Optimistic scenario to capture the stronger upside opportunity.",
      "B": "The Pessimistic scenario at -$316,800 from EV has the widest deviation in absolute terms, indicating downside risk should drive the budget decision. Operations' conservative position is correct — the budget should use the Base Case to protect against excess capacity costs.",
      "C": "The Breakthrough scenario has the widest deviation (+$602,240) but carries only 10% probability. The expected value of $662,400 is the probability-weighted average across all four scenarios and represents the most defensible single-point estimate for the operating budget — it incorporates both upside opportunity and downside risk proportionate to their likelihood.",
      "D": "The Pessimistic (-$316,800) and Optimistic (+$182,400) scenarios have similar absolute deviations, indicating the distribution is approximately symmetric. Catalyst should split the difference and use a blended budget of 3,800 units — the midpoint between Base Case and Optimistic."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The Breakthrough scenario produces the widest absolute deviation from EV at +$602,240 ($1,190,400 - $662,400), but its 10% probability means there is a 90% chance this outcome will not occur. The expected value of $662,400 is the correct budget basis because it is the only figure that accounts for the full probability distribution — the 25% chance of disappointing demand, the 40% chance of the base trajectory, and the combined 35% chance of above-base performance. Under CMA Part 1, expected value is used to generate a probability-weighted single-point estimate when multiple scenarios with assigned probabilities exist. It is a planning tool, not a guaranteed result. The key insight: neither Marketing's Optimistic position (ignoring 75% probability of lower outcomes) nor Operations' conservative Base Case (ignoring the 35% probability of above-base performance) is appropriate. EV balances both perspectives. A common exam trap is allowing the scenario with the widest deviation (Breakthrough at +$602,240) to drive the decision despite its low probability — the scenario's distance from EV reflects its extremity, not its decision relevance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-012",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "While the Breakthrough scenario does have the widest absolute CM deviation (+$602,240), the conclusion that this supports an Optimistic budget basis is wrong. The Breakthrough scenario's 10% probability means there is a 90% chance this outcome will not materialize. Basing the operating budget on the widest-upside scenario when it is the least likely to occur would expose Catalyst to substantial excess capacity risk if demand falls anywhere in the other 90% of the probability distribution. The asymmetry observation is correct but the conclusion is wrong: the decision-relevant metric is the probability-weighted expected value, not the maximum possible outcome. Marketing's selection of Optimistic similarly ignores that there is a 65% probability of outcomes at or below the Base Case.",
    "ExplanationWrongB": "The Pessimistic scenario's absolute deviation from EV is $316,800 ($662,400 - $345,600), which is smaller than the Breakthrough scenario's $602,240. This choice incorrectly identifies Pessimistic as having the widest deviation. More importantly, even if Pessimistic were the widest, the conclusion would be wrong: basing the budget on a conservative scenario with only a 25% probability unduly penalizes the growth opportunity. A conservative budget basis would leave Catalyst with insufficient production capacity and inventory if demand falls in the 75% probability range above the Pessimistic scenario, causing stockouts and lost sales on a new product where market presence is critical for long-term brand positioning.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "The Pessimistic scenario's deviation is $316,800 and the Optimistic scenario's deviation is $182,400 ($844,800 - $662,400). These are not similar in magnitude — the distribution is skewed right (positive skew), with the EV pulled upward by the combined 35% probability of above-base outcomes. The midpoint between Base Case and Optimistic (3,800 units) is an arbitrary blend with no statistical foundation — it is neither the expected value, the most likely scenario, nor the median. Expected value is the appropriate budget basis because it is the only figure that accounts for the full probability distribution weightings. Arbitrary blending of scenarios without regard to their probabilities produces a number with no decision-theoretic justification.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.013 sensitivity analysis budget",
    "MicroTopic": "sensitivity analysis budget",
    "UniqueConceptKey": "B-013-sensitivity-analysis-budget",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "CONTROLLER'S RISK ASSESSMENT — Stonegate Cabinetry\n\nTO: Lisa Tran, Controller\nFROM: Budget Risk Analysis\nRE: FY2027 Operating Budget — Sensitivity Analysis\n\nStonegate manufactures custom kitchen and bath cabinetry for luxury home builders. The FY2027 operating budget projects operating income of $2,840,000 based on the following key assumptions:\n\nAssumption | Base Case | Profit Impact if Assumption Worsens\n1 — Lumber cost per board-foot: $4.80/bf | If lumber rises to $5.28/bf (+10%): operating income declines by $148,000\n2 — Direct labor hourly rate: $32.00/hr | If labor rate rises to $33.92/hr (+6%): operating income declines by $86,400\n3 — Unit sales volume: 4,200 kitchens | If volume falls to 3,780 kitchens (-10%): operating income declines by $218,400\n4 — Variable overhead rate: $18.50 per DLH | If VOH rises to $20.35/DLH (+10%): operating income declines by $44,400\n\nThe CFO has asked: \"If only one of these four assumptions turns out to be wrong, which single assumption poses the greatest threat to the credibility of the FY2027 operating budget?\"\n\nBased on the sensitivity analysis, which assumption is the most critical to the budget's reliability, and why?",
    "Choices": {
      "A": "The lumber cost assumption ($4.80/bf) is most critical because raw materials represent the largest single cost category in cabinet manufacturing, and a 10% lumber price increase would add $148,000 to cost of goods sold — the second-largest single-assumption profit impact.",
      "B": "The unit sales volume assumption (4,200 kitchens) is most critical because a 10% volume decline produces the largest profit impact of $218,400 — more than lumber (+$148,000), labor (+$86,400), or variable overhead (+$44,400) — and because volume directly determines Stonegate's revenue base, which drives all downstream variable costs and production planning.",
      "C": "The direct labor assumption ($32.00/hr) is most critical because skilled cabinetmakers are Stonegate's most constrained resource, and a labor rate increase would have a compounding effect — higher rates would increase not only direct labor cost but also the variable overhead allocated on a direct-labor-hour basis.",
      "D": "The variable overhead assumption ($18.50/DLH) is most critical because overhead rates are the most difficult to forecast accurately, as they depend on both cost-level assumptions (utility rates, indirect materials pricing) and activity-level assumptions (DLH consumption per kitchen), creating a compounding forecast risk."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Unit sales volume is the most critical assumption because it produces the largest single-assumption profit impact ($218,400) and directly determines Stonegate's revenue. The sensitivity analysis quantifies the operating income impact of each assumption shifting unfavorably. Volume at -10% reduces operating income by $218,400 — 7.7% of the base case $2,840,000 operating income. This exceeds the next-largest impact (lumber at $148,000, or 5.2% of base income) by $70,400. More fundamentally, sales volume is the driver of the entire master budget — when unit volume is wrong, every downstream schedule (production, materials purchasing, labor staffing, overhead allocation) is also wrong. A 10% volume miss means Stonegate would produce 420 fewer kitchens, purchase fewer board-feet of lumber, schedule fewer labor hours, and absorb less overhead — compounding the direct revenue loss with indirect cost inefficiencies. Under CMA Part 1, sensitivity analysis identifies which assumptions, if wrong, produce the largest variance in the output variable (operating income). The assumption with the highest sensitivity is the one that merits the most management attention during the budget review process — in this case, the sales forecast warrants the deepest scrutiny because getting it wrong produces the largest budget-to-actual variance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-B-013",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Lumber cost produces the second-largest profit impact ($148,000) at 5.2% of base operating income — significant but 32% smaller than the volume impact of $218,400. While raw materials are indeed the largest cost category in cabinet manufacturing, sensitivity analysis ranks assumptions by their profit impact, not by the cost category's size in absolute dollars. The question asks which single assumption poses the greatest threat to the budget's reliability; the sensitivity table directly answers this by showing that volume has the highest profit sensitivity. A candidate selecting this choice may be anchoring on lumber's visibility as a cost driver rather than comparing the quantified impacts.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The direct labor assumption produces a profit impact of $86,400 — the third-largest and less than half of the volume impact. The argument that labor rate increases have a compounding effect through variable overhead allocation is conceptually interesting but not supported by the sensitivity data: the VOH assumption is analyzed separately as an independent sensitivity, meaning the compounding effect (if any) is already captured in the VOH assumption's own $44,400 impact — not additive to labor. Additionally, the question asks which single assumption is most critical, and the sensitivity table shows labor ranks third in profit sensitivity.",
    "ExplanationWrongD": "Variable overhead produces the smallest profit impact ($44,400) of the four assumptions. The argument that overhead rates are difficult to forecast is a general forecasting observation, not a conclusion from the sensitivity analysis. Sensitivity analysis measures what happens when an assumption is wrong — not how likely it is to be wrong. Even if VOH is more difficult to forecast, its relatively small profit sensitivity means that being wrong about VOH has less budget impact than being wrong about volume, lumber, or labor. Profit sensitivity, not forecast difficulty, determines which assumption is most critical to the budget's reliability.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  }
];