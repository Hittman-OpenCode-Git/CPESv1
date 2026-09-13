var MCQ_BANK_A_PART_16 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.049 sales budget seasonality adjustment",
    "MicroTopic": "sales budget seasonality adjustment",
    "UniqueConceptKey": "B-049-sales-budget-seasonality-adjustment",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "primaryTheory": "B5",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cascade's sales are highly seasonal, with 40% of annual volume occurring in Q4. When building the annual sales budget, what should Cascade do to avoid understating working capital needs earlier in the year?",
    "Choices": {
      "A": "Ignore seasonality and divide the annual total evenly across quarters",
      "B": "Budget each quarter based on its historical share of annual sales",
      "C": "Budget the entire year's sales in Q4 only",
      "D": "Use only the prior year's Q4 actuals to set the full annual budget"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Budgets should reflect known seasonal patterns; allocating sales based on each quarter's historical share produces a more realistic profile of cash flow and working capital needs than an even quarterly split.",
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
    "QuestionID": "P1-B-049",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Ignoring seasonality and spreading sales evenly across quarters would significantly understate Q4 sales (40% of annual volume) and overstate Q1-Q3, leading to distorted working capital projections. A seasonal business must reflect the timing of revenue inflows to accurately plan for cash, inventory, and financing needs throughout the year.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Budgeting 100% of annual sales in Q4 ignores the other 60% of annual volume that occurs in Q1-Q3. This would severely understate working capital and resource needs during the first three quarters. The sales budget should allocate revenue to each quarter in proportion to when it is actually expected to occur.",
    "ExplanationWrongD": "Using only prior-year Q4 actuals ignores all other quarters and assumes Q4 is the entire business. A proper seasonal budget uses historical seasonal patterns (percentages by quarter) applied to the current year's total sales forecast — not a single quarter's data — to project revenue timing and related resource requirements.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.050 exponential smoothing alpha evaluation",
    "MicroTopic": "exponential smoothing alpha evaluation",
    "UniqueConceptKey": "B-050-exponential-smoothing-alpha-evaluation",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "DEMAND PLANNING MEMO — Ridgeway Consumer Products\n\nTO: Naomi Singh, Demand Planning Manager\nFROM: Analytics Team\nRE: FY2027 Forecasting Model — Alpha Parameter Selection\n\nRidgeway sells products through three channels with distinct demand patterns:\n\nChannel | Demand Volatility (CV) | Monthly Sales | Current Forecast MAPE\nRetail Grocery | 8% (stable) | $2,400,000 | 4.2%\nOnline Direct | 28% (volatile) | $1,200,000 | 18.6%\nWholesale Club | 14% (moderate) | $1,800,000 | 9.1%\n\nRidgeway uses simple exponential smoothing for all channels with a uniform alpha of 0.20. The model is: Forecast(t+1) = alpha x Actual(t) + (1-alpha) x Forecast(t). The Analytics Team tested alternative alpha values using 24 months of back-data:\n\nAlpha | Retail Grocery MAPE | Online Direct MAPE | Wholesale Club MAPE\n0.10 | 3.8% | 24.2% | 11.4%\n0.20 | 4.2% | 18.6% | 9.1%\n0.60 | 7.1% | 12.4% | 10.6%\n0.85 | 11.3% | 9.2% | 13.9%\n\nThe Demand Planning Manager must recommend alpha values for each channel individually rather than applying the uniform 0.20 across all channels. Which recommendation best applies exponential smoothing principles to the three channels' distinct demand profiles?",
    "Choices": {
      "A": "Retain the uniform alpha of 0.20 for all three channels because it represents the middle of the tested range and has been Ridgeway's standard. Consistency across channels simplifies the forecasting process and avoids the risk of overfitting alpha values to historical data.",
      "B": "Apply a low alpha (0.10) to Retail Grocery (stable demand — a low alpha avoids overreacting to random noise), a high alpha (0.85) to Online Direct (volatile demand — a high alpha captures rapid shifts in the online channel), and retain 0.20 for Wholesale Club as the moderate-volatility channel where the current alpha already produces the best back-tested MAPE.",
      "C": "Apply a high alpha (0.85) to three channels because it produces the lowest MAPE for Online Direct, which has the largest forecast error and therefore represents the greatest improvement opportunity. A uniform high alpha will maximize responsiveness across channels.",
      "D": "Discontinue exponential smoothing entirely for Online Direct and Wholesale Club and replace with causal regression models because these channels show MAPE above 9% at tested alpha levels, indicating exponential smoothing is an inappropriate methodology for channels with demand variability."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The optimal alpha differs by channel because the smoothing constant represents a trade-off between responsiveness and stability. For Retail Grocery (CV 8%, stable demand), a low alpha of 0.10 produces the lowest MAPE (3.8%) because demand is inherently predictable — high alpha values overreact to small random fluctuations, degrading accuracy (MAPE rises to 11.3% at alpha 0.85). For Online Direct (CV 28%, volatile demand), a high alpha of 0.85 produces the best MAPE (9.2%) because when demand is inherently volatile, the model needs to respond quickly to genuine demand shifts rather than averaging them out — low alpha values are too sluggish (MAPE 24.2% at alpha 0.10). For Wholesale Club (CV 14%, moderate), the current alpha of 0.20 already produces the best back-tested MAPE (9.1%). Under CMA Part 1, exponential smoothing is not a one-size-fits-all methodology — the alpha parameter should be tuned to each data series' characteristics. The general principle: high alpha (near 1.0) for volatile, rapidly changing demand where recent observations carry the most predictive signal; low alpha (near 0.0) for stable demand where deviations are more likely noise than signal. A common exam trap is treating alpha as a uniform constant across all products or channels.",
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
    "QuestionID": "P1-B-050",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Retaining a uniform alpha of 0.20 across all channels ignores the back-test evidence that channel-specific alphas produce meaningfully lower forecast errors. The principle of consistency across channels does not override forecast accuracy when the channels have fundamentally different demand characteristics. Retail Grocery would achieve a 9.5% improvement in MAPE (4.2% to 3.8%) using alpha 0.10; Online Direct would achieve a 50.5% MAPE reduction (18.6% to 9.2%) using alpha 0.85. The 'simplicity' argument ignores that applying the same alpha to channels with 8% vs. 28% demand volatility is not simple — it is simplistic. The correct approach tunes the parameter to each channel's data while maintaining the same methodological framework (exponential smoothing).",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Applying a high alpha uniformly because Online Direct has the largest MAPE treats the worst-performing channel as the template for all channels, ignoring that Retail Grocery's MAPE more than doubles (4.2% to 11.3%) at alpha 0.85. The correct approach optimizes alpha per channel — what improves one channel's forecast can degrade another's. Online Direct's high volatility justifies a responsive alpha, but Retail Grocery's stability justifies a smooth alpha. A uniform solution sacrifices accuracy in two channels to address one channel's problem, when the methodology allows independent parameter selection per channel at no additional cost.",
    "ExplanationWrongD": "Discontinuing exponential smoothing because some MAPE values exceed 9% sets an unrealistic accuracy threshold. All forecasting methods produce errors — the question is whether the method is appropriate for the data's characteristics, not whether it achieves zero error. Online Direct's MAPE of 9.2% at alpha 0.85 represents a 50% improvement over the current 18.6% — the method is clearly appropriate when properly tuned. Causal regression models require external predictor variables and are not automatically superior to time-series methods — they introduce their own data requirements, model specification risks, and maintenance burdens. The evidence shows exponential smoothing works well for all three channels when parameterized appropriately.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.051 selling and administrative expense budget components",
    "MicroTopic": "selling and administrative expense budget components",
    "UniqueConceptKey": "B-051-selling-and-administrative-expense-budget-components",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "primaryTheory": "B2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Which of the following would typically be included in the selling and administrative expense budget rather than the production-related budgets?",
    "Choices": {
      "A": "Direct materials purchases",
      "B": "Factory overhead depreciation",
      "C": "Sales commissions and advertising costs",
      "D": "Direct labor for production workers"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Sales commissions and advertising are selling expenses, included in the selling and administrative expense budget, distinct from production-related budgets like direct materials, direct labor, and factory overhead.",
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
    "QuestionID": "P1-B-051",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Direct materials purchases are a production cost, tracked in the direct materials purchases budget — not the selling and administrative expense budget. Production-related costs flow through the manufacturing budgets (materials, labor, overhead), while S&A expenses cover non-manufacturing functions such as sales, marketing, and corporate administration.",
    "ExplanationWrongB": "Factory overhead depreciation is a manufacturing cost included in the manufacturing overhead budget and the cost of goods manufactured schedule, not in S&A. Selling and administrative expenses are period costs incurred outside the factory for functions such as selling, distribution, and general corporate management.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Direct labor for production workers is a manufacturing cost captured in the direct labor budget, which feeds into the cost of goods manufactured. Selling and administrative expenses are non-manufacturing period costs that include items like sales salaries, commissions, advertising, office rent, and executive compensation.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.052 budget slack ethical considerations",
    "MicroTopic": "budget slack ethical considerations",
    "UniqueConceptKey": "B-052-budget-slack-ethical-considerations",
    "LOSTag": "P1-B.1 Budgeting concepts and strategic planning",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A department manager deliberately overstates expected costs in the budget to make it easier to show favorable variances later. Under IMA ethical standards, this behavior most directly violates which principle?",
    "Choices": {
      "A": "Confidentiality",
      "B": "Integrity",
      "C": "Legal compliance",
      "D": "Credentialing"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Deliberately misrepresenting budget figures to create artificial favorable outcomes violates the integrity standard, which requires honest and forthright communication of financial information.",
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
    "QuestionID": "P1-B-052",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Confidentiality concerns protecting sensitive information from unauthorized disclosure. While a manager should not disclose budget details inappropriately, deliberately overstating costs to create slack is a misrepresentation of financial information — a direct violation of integrity, not confidentiality. The IMA standard for confidentiality addresses information safeguarding, not honesty in reporting.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Creating budgetary slack, while ethically problematic, is not necessarily illegal. The IMA Statement of Ethical Professional Practice lists four standards — competence, confidentiality, integrity, and credibility. Legal compliance is a broader obligation embedded within these standards, but the question asks which IMA principle is most directly violated, which is integrity.",
    "ExplanationWrongD": "Credentialing relates to maintaining professional certifications (CMA, CPA) and is not one of the four IMA ethical standards. The IMA standards are competence, confidentiality, integrity, and credibility. Deliberately overstating costs is a knowing misrepresentation that violates the integrity standard, which requires mitigation of actual conflicts of interest and refraining from conduct that would prejudice carrying out duties ethically.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.053 production budget units 37",
    "MicroTopic": "production budget units 37",
    "UniqueConceptKey": "B-053-production-budget-units-37",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "primaryTheory": "B2",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Delta expects sales of 16,810 units next month and wants ending finished goods inventory equal to 20% of the following month sales of 18,940 units. Beginning inventory is 3,140 units. What production is required?",
    "Choices": {
      "A": "19,950 units",
      "B": "17,458 units",
      "C": "20,598 units",
      "D": "13,670 units"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Production = Sales + Desired ending inventory - Beginning inventory. Desired ending = 20% of next month's sales (18,940) = 3,788 units. Production = 16,810 + 3,788 - 3,140 = 17,458 units.",
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
    "QuestionID": "P1-B-053",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice adds beginning inventory (3,140 units) instead of subtracting it. Beginning inventory is available from prior production and reduces, not increases, the units needed. Production = 16,810 + 3,788 - 3,140 = 17,458 units.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This choice adds desired ending inventory (3,788 units) to sales but does not subtract beginning inventory (3,140 units). Beginning inventory is already on hand and reduces required production.",
    "ExplanationWrongD": "This choice subtracts beginning inventory (3,140 units) from sales but does not add desired ending inventory (3,788 units). Production must meet both sales demand and the target ending inventory level.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.054 direct materials purchases budget 38",
    "MicroTopic": "direct materials purchases budget 38",
    "UniqueConceptKey": "B-054-direct-materials-purchases-budget-38",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Evergreen's purchasing department is setting next month's material order for a product requiring 5 pounds per unit. The company plans to manufacture 12,040 units, wants 6,080 pounds in ending materials inventory, and expects 2,880 pounds in beginning materials inventory. How many pounds should be purchased?",
    "Choices": {
      "A": "57,320 pounds",
      "B": "63,400 pounds",
      "C": "60,200 pounds",
      "D": "66,280 pounds"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Material purchases equal production needs plus desired ending inventory minus beginning inventory. Production needs are 12,040 x 5 = 60,200 pounds, so purchases = 60,200 + 6,080 - 2,880 = 63,400 pounds.",
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
    "QuestionID": "P1-B-054",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This subtracts beginning inventory from production needs but omits desired ending inventory.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This is only the material required for production and ignores the inventory policy.",
    "ExplanationWrongD": "This adds desired ending inventory to production needs but fails to subtract beginning materials inventory.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.055 cash collections schedule 39",
    "MicroTopic": "cash collections schedule 39",
    "UniqueConceptKey": "B-055-cash-collections-schedule-39",
    "LOSTag": "P1-B.4 Annual profit plan and supporting schedules",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Frontier expects current-month credit and cash sales of $265,800; 35% is collected in the month of sale. Prior-month sales were $220,200, and 60% will be collected this month. What cash collections are budgeted?",
    "Choices": {
      "A": "$93,030",
      "B": "$313,230",
      "C": "$486,000",
      "D": "$225,150"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Budgeted cash collections combine the portion collected from current-month sales with the portion collected from prior-month sales. Frontier collects ($265,800 x 35%) + ($220,200 x 60%) = $93,030 + $132,120 = $225,150.",
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
    "QuestionID": "P1-B-055",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This includes only current-month collections of $265,800 x 35% and omits the prior-month receivable collection.",
    "ExplanationWrongB": "This adds current-month collections to all prior-month sales, instead of collecting only 60% of prior-month sales this month.",
    "ExplanationWrongC": "This adds current-month and prior-month sales in full, which is a sales total rather than cash collected this month.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.056 flexible budget cost 40",
    "MicroTopic": "flexible budget cost 40",
    "UniqueConceptKey": "B-056-flexible-budget-cost-40",
    "LOSTag": "P1-B.2 Budgeting concepts",
    "primaryTheory": "B8",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Granite has fixed manufacturing support cost of $62,000 and variable support cost of $8 per unit. At actual output of 14,600 units, what is the flexible budget for support cost?",
    "Choices": {
      "A": "$188,800",
      "B": "$116,800",
      "C": "$178,800",
      "D": "$62,000"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "For a flexible budget, variable support cost changes with actual output while fixed support cost stays fixed in total. Granite's flexible budget = $62,000 + ($8 x 14,600 units) = $62,000 + $116,800 = $178,800.",
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
    "QuestionID": "P1-B-056",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This overstates the total by $10,000; the correct flexible budget adds fixed cost once to variable cost at actual output.",
    "ExplanationWrongB": "This is only the variable cost portion, $8 x 14,600 units, and excludes fixed support cost.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This includes only fixed support cost and ignores the variable support cost incurred at 14,600 units.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  }
];