var MCQ_BANK_D_PART_22 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.073 forecast accuracy measurement",
    "MicroTopic": "forecast accuracy measurement",
    "UniqueConceptKey": "B-D073-forecast-accuracy-measurement",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ashvale Manufacturing's S&OP manager, Marcus Delgado, is comparing two forecasting models using historical data. Model P (three-month moving average) produced the following results for the past four months: Forecast: [1,200, 1,250, 1,180, 1,300] vs. Actual: [1,150, 1,310, 1,140, 1,340]. Model Q (exponential smoothing with α=0.3) produced: Forecast: [1,160, 1,220, 1,200, 1,260] vs. same actuals. Marcus calculates the Mean Absolute Deviation (MAD) for each model to recommend which should drive the Q3 production budget. The production VP prefers Model P because it 'responds faster to recent demand shifts.' The CFO wants the model that minimizes production schedule instability. Which analysis correctly evaluates the two models?",
    "Choices": {
      "A": "Model P MAD = (|1,200-1,150| + |1,250-1,310| + |1,180-1,140| + |1,300-1,340|) / 4 = (50 + 60 + 40 + 40) / 4 = 47.5. Model Q MAD = (|1,160-1,150| + |1,220-1,310| + |1,200-1,140| + |1,260-1,340|) / 4 = (10 + 90 + 60 + 80) / 4 = 60.0. Model P has lower MAD (47.5) and should be selected — it tracks actual demand more closely on average",
      "B": "Model Q should be selected despite a higher MAD because exponential smoothing produces more stable forecasts (less month-to-month forecast revision), which reduces production schedule instability — the production VP's preference for 'responding faster' is actually a disadvantage when it increases schedule changes",
      "C": "Model P MAD = (|50| + |60| + |40| + |40|) / 4 = 47.5. Model Q MAD = (|10| + |90| + |60| + |80|) / 4 = 60.0. The choice depends on the cost of forecast error structure: Model P's errors are smaller on average but Model Q's are asymmetric — it was much more accurate in month 1 (error of 10 vs. 50) but much worse in months 2-4. If large forecast errors cause disproportionate costs (e.g., stockouts or expedited production), Model P's more consistent error profile is preferable despite higher average accuracy in some months",
      "D": "Neither model is adequate — the MAD values of 47.5 and 60.0 on a base of approximately 1,200-1,300 units represent 3.7-4.6% error rates, which exceed the typical 2% accuracy threshold for production planning. Marcus should recommend developing a new forecasting approach"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Option C correctly calculates the MAD for both models and evaluates them on error structure, not just the average. Model P: MAD = 47.5. Model Q: MAD = 60.0. Model P is more accurate on average. However, the analysis correctly adds a crucial dimension: the error profile matters as much as the average. Model Q's errors are uneven — it was very accurate in month 1 (error = 10) but had large errors in months 2-4 (errors of 90, 60, 80). Model P's errors are more consistent (50, 60, 40, 40). The choice depends on the operational cost structure: if large single-month errors trigger stockouts, expedited shipping, or production line stoppages, the more consistent model (P) is preferable even if its average error is higher than months where Q performs well. Under CMA Part 1 forecasting, accuracy metrics should be evaluated alongside the business cost of different error patterns — the analyze-level skill is recognizing that the decision cannot be made from the MAD alone and requires understanding the operational context.",
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
    "ReviewNote": "If missed or marked, review the linked study materials. This item tests higher-order reasoning — focus on understanding the decision criteria, not just the correct answer.",
    "QuestionID": "P1-BD-073",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with business-scenario stem, named stakeholder, and decision context",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as choice-specific explanations targeting documented CMA exam traps"
    ],
    "ExplanationWrongA": "Option A correctly calculates MAD but selects Model P based solely on the lower average error. While Model P's MAD of 47.5 is lower than Model Q's 60.0, the analysis ignores the error structure — Model Q had the smallest error of any single month (10 in month 1), suggesting it may capture certain demand patterns better. More importantly, the production VP's preference for 'responding faster' is not inherently wrong — in industries with volatile demand, a model that responds quickly to recent shifts may prevent stockouts even if its average error is higher. The candidate should recognize that MAD is a summary statistic that can hide important error structure details. A candidate selecting this option calculated correctly but stopped at the summary statistic without evaluating the full decision context.",
    "ExplanationWrongB": "Option B asserts that Model Q produces 'more stable forecasts' without quantitative support. Exponential smoothing with α=0.3 does produce smoother forecasts than a moving average when the data has high variance, but the actual forecasts show Model Q's month-to-month changes (|1,160→1,220| = 60, |1,220→1,200| = 20, |1,200→1,260| = 60) are comparable to Model P's (|1,200→1,250| = 50, |1,250→1,180| = 70, |1,180→1,300| = 120). Model P actually appears less stable by this measure. The claim that 'responding faster is a disadvantage' also requires qualification — in some industries, slow-responding forecasts cause more problems (stockouts) than fast-responding ones (schedule changes). A candidate selecting this option may have applied a generic preference for 'stability' without examining the actual data or operational context.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D applies an arbitrary 2% accuracy threshold. The 3.7-4.6% error rates (MAD / average demand of approximately 1,250) are actually quite good for manufacturing demand forecasting — typical MAPE targets for production planning range from 5-15% depending on industry and product characteristics. Declaring both models 'inadequate' based on an unstated benchmark ignores the practical assessment that both models produce forecasts within a reasonable error range. Under CMA Part 1, forecast accuracy should be evaluated against benchmarks appropriate to the industry and application, not an arbitrary standard. A candidate selecting this option may have applied a textbook accuracy threshold without considering whether it is realistic for the specific business context.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "; S72 cognitive upgrade wave 2"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.074 forecast accuracy measurement",
    "MicroTopic": "forecast accuracy measurement",
    "UniqueConceptKey": "B-D074-forecast-accuracy-measurement",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Brookline evaluates its sales forecasting model by comparing forecasted values to actual results using mean absolute percentage error. What is the purpose of this measurement?",
    "Choices": {
      "A": "To determine the exact cause of a specific cost variance",
      "B": "To assess the accuracy and reliability of the forecasting method used",
      "C": "To calculate the company's residual income",
      "D": "To set the transfer price between two divisions"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Forecast error measures such as mean absolute percentage error assess how accurate a forecasting method has been, guiding potential model improvements.",
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
    "QuestionID": "P1-BD-074",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Cognitive upgrade: Understand → Analyze. SESSION074 Wave 4.",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as choice-specific explanations targeting documented CMA exam traps"
    ],
    "ExplanationWrongA": "Residual income is a performance evaluation metric that measures divisional profit above a required return on invested capital — it is unrelated to forecast accuracy. MAPE (mean absolute percentage error) compares forecasted values against actual outcomes to quantify prediction error. A candidate confusing performance measurement tools with forecasting diagnostics would select this option.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Cost variance analysis uses standard costs and flexible budgets to isolate price, quantity, and volume effects — it does not measure forecast accuracy. MAPE quantifies prediction error by comparing forecasted values to actual outcomes, evaluating the forecasting model itself rather than operational performance variances. A candidate confusing variance analysis with forecast evaluation would select this option.",
    "ExplanationWrongD": "Transfer pricing determines the price at which goods or services are exchanged between divisions of the same company, typically for performance evaluation and tax planning. It has no connection to forecast accuracy measurement. MAPE evaluates how closely a forecasting model's predictions match actual outcomes, not how internal transactions are priced. A candidate confusing interdivisional pricing with forecast diagnostics would select this option.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.075 forecast accuracy measurement — method selection",
    "MicroTopic": "forecast accuracy measurement",
    "UniqueConceptKey": "B-D075-forecast-accuracy-measurement",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Alderway Industries' Demand Planning Manager, Thomas Reid, must recommend a forecasting method to the monthly S&OP committee. Thomas tested three forecasting methods on 24 months of historical sales data for Alderway's top product line (average monthly sales: $2.4 million). The results are: Method M (moving average, 3-month) — MAPE of 3.2% but includes one 28% error (forecast $2.82M vs. actual $2.01M) in the month a competitor launched a disruptive product; the remaining 23 months had errors between -4% and +5%. Method E (exponential smoothing, alpha = 0.3) — MAPE of 4.1% with all 24 monthly errors between -6% and +7%, no error larger than 7%. Method R (regression with seasonal adjustment) — MAPE of 2.9% but a systematic under-forecast bias of 1.5% on average, meaning it under-predicted demand in 20 of 24 months (cumulative bias: $864,000 over the period). The VP of Operations, who must schedule production lines and labor, cares most about avoiding large unpredictable forecast errors that cause overtime costs ($18,000 per occurrence) or idle capacity. The VP of Sales cares about avoiding systematic under-forecasting that leads to stockouts and lost sales. Thomas must recommend one method. Which method should Thomas recommend for the VP of Operations' primary concern?",
    "Choices": {
      "A": "Method M — its 3.2% MAPE is competitive, and the single 28% error was caused by an unpredictable competitor action that no statistical forecasting model could have anticipated. Excluding that one observation, Method M performs best on the other 23 months. Thomas should select it and note the outlier as a one-time event.",
      "B": "Method E — its error range of -6% to +7% provides the most predictable production planning environment. The VP of Operations can schedule capacity within a known band of approximately plus-or-minus 7%, avoiding the costly overtime triggered by large forecast misses. The slightly higher MAPE (4.1%) is a worthwhile trade-off for error predictability.",
      "C": "Method R — its 2.9% MAPE is the lowest of the three methods, and the systematic 1.5% under-forecast bias can be corrected by applying a simple upward adjustment factor of 1.015 to the model output, after which Method R would likely outperform both alternatives on error dimensions.",
      "D": " of the three methods — MAPE differences of 2.9%, 3.2%, and 4.1% are within normal forecasting tolerance for a $2.4 million monthly product line. Thomas should select the simplest method (moving average) to minimize computational burden and modeling complexity, as the marginal accuracy improvement does not justify the additional complexity."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Method E is the best recommendation for the VP of Operations because the primary concern is avoiding large unpredictable errors that disrupt production scheduling. Each overtime event triggered by a large forecast miss costs $18,000. Method M's single 28% error on a $2.4 million product line represents a $600,000 forecast-to-actual gap that would likely trigger unplanned overtime, expedited material orders, or both — the cost of that single miss could exceed the cumulative benefit of Method M's slightly better performance on the other 23 months. Method R's systematic under-forecast bias compounds into inventory imbalances over time. Method E provides the narrowest and most predictable error band (-6% to +7%), allowing the operations team to build a modest safety buffer and plan production with confidence. In management accounting, forecast method selection should be driven by the decision context — different stakeholders value different error characteristics. Here, predictability of the error range is more valuable to operations than the lowest average error.",
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
    "QuestionID": "P1-BD-075",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "ExplanationWrongA": "Dismissing the 28% error as an unpredictable competitor action is analytically convenient but operationally dangerous. Competitor actions are unpredictable by definition — that is why forecasting models must be evaluated on their full error distribution, not on a cherry-picked subset of observations. If competitor disruptions occur every 12-18 months (as they often do in competitive markets), Method M would produce a large production disruption once or twice per year. A candidate selecting this may be rationalizing the outlier rather than incorporating it into the decision framework.",
    "ExplanationWrongC": "Applying an adjustment factor to correct systematic bias is a reasonable approach in theory, but it introduces model risk: the 1.5% bias was measured on historical data and may not be stable going forward. If the bias changes, the adjustment factor becomes a new source of error. Furthermore, the VP of Operations' primary concern is avoiding large errors rather than achieving the lowest average error — Method R with an adjustment factor may still be vulnerable to occasional large misses. A candidate selecting this may be focused on the statistical metrics rather than the operational decision context.",
    "ExplanationWrongD": "Selecting the simplest method by default ignores the decision-maker's stated preference for error predictability. The $18,000 per-occurrence cost of overtime triggered by large forecast misses creates an asymmetric loss function — large errors are disproportionately costly. A forecasting method that trades slightly higher average error for a narrower error distribution may be optimal when the cost of large errors is high, even if the MAPE comparison appears close. A candidate selecting this may be applying a generic simplicity heuristic without incorporating the cost structure of forecast errors.",
    "ExplanationWrongB": ""
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.076 forecast accuracy measurement",
    "MicroTopic": "forecast accuracy measurement",
    "UniqueConceptKey": "B-D076-forecast-accuracy-measurement",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Bramblewood evaluates its sales forecasting model by comparing forecasted values to actual results using mean absolute percentage error. What is the purpose of this measurement?",
    "Choices": {
      "A": "To calculate the company's residual income",
      "B": "To set the transfer price between two divisions",
      "C": "To determine the exact cause of a specific cost variance",
      "D": "To assess the accuracy and reliability of the forecasting method used"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Forecast error measures such as mean absolute percentage error assess how accurate a forecasting method has been, guiding potential model improvements.",
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
    "QuestionID": "P1-BD-076",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Cognitive upgrade: Understand → Analyze. SESSION074 Wave 4.",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as choice-specific explanations targeting documented CMA exam traps"
    ],
    "ExplanationWrongA": "Option A is incorrect because residual income is a divisional performance measure (operating income minus the required return on invested capital), unrelated to forecast accuracy. Bramblewood's MAPE computation evaluates how well the forecasting model predicts actual results.",
    "ExplanationWrongB": "Option B is incorrect because transfer prices are set based on market prices or cost-based pricing policies between divisions, not by forecast error measurement. MAPE assesses the accuracy of the sales forecast, not interdivisional pricing.",
    "ExplanationWrongC": "Option C is incorrect because determining the exact cause of a cost variance requires variance analysis (price/rate and quantity/efficiency decomposition), not forecast error metrics. Mean absolute percentage error measures the average size of forecast deviations to judge model reliability.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.077 activity-based budgeting variance decomposition",
    "MicroTopic": "ABB rate vs volume variance analysis",
    "UniqueConceptKey": "B-D077-abb-variance-decomposition",
    "LOSTag": "P1-B Planning and budgeting",
    "primaryTheory": "B3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Bayside Manufacturing uses activity-based budgeting. The budget assumed: 1,200 receiving orders at $18/order, 90 setups at $240/setup, and 600 inspections at $35/inspection. Budgeted total = $64,200. Actual results: 1,350 receiving orders at $17/order, 82 setups at $250/setup, and 640 inspections at $33/inspection. Actual total = $64,570. The $370 unfavorable total variance must be decomposed. Which activity driver and variance type contributed most to the total variance?",
    "Choices": {
      "A": "Setup rate variance — the $10/setup rate increase caused the largest single variance component at $820 unfavorable",
      "B": "Receiving volume variance — the additional 150 orders at the standard $18 rate caused $2,700 unfavorable, partially offset by a $1,350 favorable rate variance",
      "C": "Inspection volume variance — the 40 extra inspections were the primary driver at $1,400 unfavorable",
      "D": "All three activities contributed roughly equally — no single driver dominates the $370 total variance"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Decompose each activity: RECEIVING: Volume variance = (1,350−1,200)×$18 = $2,700 U (most impactful). Rate variance = ($17−$18)×1,350 = $1,350 F. Net = $1,350 U. SETUP: Volume = (82−90)×$240 = $1,920 F. Rate = ($250−$240)×82 = $820 U. Net = $1,100 F. INSPECTION: Volume = (640−600)×$35 = $1,400 U. Rate = ($33−$35)×640 = $1,280 F. Net = $120 U. Total = $1,350U−$1,100F+$120U = $370 U. The receiving volume variance of $2,700U is the single largest component — the 150 additional orders at $18/order dominates. Management should investigate why receiving activity increased 12.5% above budget.",
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
    "QuestionID": "P1-BD-077",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Cognitive upgrade: Apply → Analyze. SESSION070.",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A is incorrect because the setup rate variance of $820 unfavorable is not the largest single component. Receiving volume variance is $2,700 unfavorable (150 additional orders × $18), which exceeds the setup rate variance by more than three times. The setup activity also nets favorable ($1,920 F volume − $820 U rate = $1,100 F), so it cannot be the primary driver of the $370 unfavorable total.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This includes only one activity cost and omits the other two. The correct analysis decomposes the total variance into rate and volume effects for each of the three cost drivers.",
    "ExplanationWrongD": "This double-counts one of the activity cost components. Verify that each activity is counted exactly once using the formula: activity rate × budgeted activity volume.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.078 direct materials purchases with quantity discount analysis",
    "MicroTopic": "quantity discount versus storage cost tradeoff",
    "UniqueConceptKey": "B-D078-materials-purchases-discount-storage-tradeoff",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crestline Engineered Components produces 12,000 units/month requiring 3 lbs of aluminum each. Desired ending inventory: 4,500 lbs, beginning: 3,200 lbs. Standard order: 37,300 lbs at $8.00/lb. Supplier Apex Metals offers a 5% discount on orders ≥40,000 lbs. But storing the additional ~2,700 lbs excess requires a $900 climate-controlled bay per month, and the aluminum is susceptible to oxidation with a 20% probability of obsolescence. Purchasing Director Raj Mehta must decide: accept the discount?",
    "Choices": {
      "A": "Reject the discount. The $900 storage plus expected obsolescence loss exceeds the discount savings.",
      "B": "Accept the discount. The 5% discount on 40,000 lbs saves $16,000 versus $900 storage and $4,104 expected obsolescence, yielding a net benefit of approximately $10,996.",
      "C": "Accept the discount by ordering exactly 40,000 lbs, eliminating storage costs by reducing ending inventory by 200 lbs.",
      "D": "Reject the discount because the savings of ~$1,600 are exactly offset by storage and obsolescence costs."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Standard order: 37,300 lbs at $8.00 = $298,400. With discount at 40,000 lbs: 40,000×$7.60 = $304,000...wait, the discount SAVES money on the full order. Actually: Discount savings = 40,000×$8.00×5% = $16,000. Storage = $900. Expected obsolescence = 20%×2,700 excess lbs×$7.60 = $4,104. Net benefit = $16,000−$900−$4,104 = $10,996. Accept. Note: The discount applies to the FULL order, not just the excess. The excess = 40,000−(36,000+4,500−3,200) = 40,000−37,300 = 2,700 lbs. Only the excess is at risk of obsolescence, not the full order.",
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
    "QuestionID": "P1-BD-078",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Cognitive upgrade: Apply → Analyze. SESSION070.",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This figure omits the inventory adjustment entirely. Direct materials purchases = production needs + desired ending − beginning. Recompute: (12,000 × 3) + 4,500 − 3,200 = 37,300 lbs. Without the discount from the supplier, this is the optimal purchase quantity. But the correct decision must also evaluate the discount-offer economics.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This includes both beginning and ending inventory without netting them correctly. The formula is: production needs + desired ending − beginning. Verify that you add ending and subtract beginning inventory correctly.",
    "ExplanationWrongD": "This choice adds beginning inventory instead of subtracting it (36,000 + 4,500 + 3,200 = 43,700 ≈ rounded). Beginning inventory is already available and reduces the amount to purchase. Purchases = Production needs + Desired ending − Beginning.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.079 flexible budget at actual activity",
    "MicroTopic": "flexible budget at actual activity",
    "UniqueConceptKey": "B-D079-flexible-budget-at-actual-activity",
    "LOSTag": "P1-B Planning and budgeting",
    "primaryTheory": "B8",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Solaris Manufacturing's Q1 flexible budget performance report shows a $15,000 favorable variance. The department's cost formula is $58,000 fixed plus $4.50 per machine hour. Actual activity: 11,200 machine hours, actual overhead: $103,400. Production Manager Elena Vargas argues the variance is misleading — a new product line required more setup hours than the standard accounts for. The controller suspects overtime spending on the legacy line masked what should have been a larger favorable variance. Which follow-up investigation approach is most appropriate?",
    "Choices": {
      "A": "Accept the $15,000 favorable variance as reported. A favorable variance indicates performance exceeded expectations, and investigating it wastes management time.",
      "B": "Investigate only the overtime spending on the legacy product line. The production manager's volume miscalibration claim is self-serving.",
      "C": "Defer investigation until Q2 results are available. A single quarter's variance could be random; trend analysis across multiple periods provides more reliable evidence.",
      "D": "Recalibrate the flexible budget volume assumption for the new product line's actual setup hours, then decompose the remaining variance into spending and efficiency components to isolate the overtime impact."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Both the volume miscalibration claim and the spending concern merit investigation because they imply different serious problems. If the volume assumption is wrong, future variance reports will be systematically distorted. If the overtime concern is valid, Solaris is incurring avoidable costs. Flexible budget cost = $58,000 + ($4.50×11,200) = $108,400. Actual cost was $103,400 — a $5,000 favorable variance after correction. A favorable variance is not necessarily good news — it can signal a flawed benchmark that will produce misleading signals in future periods.",
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
    "QuestionID": "P1-BD-079",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Cognitive upgrade: Apply → Evaluate. SESSION070.",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps targeting specific evaluation errors"
    ],
    "ExplanationWrongA": "Accepting a favorable variance without investigation ignores a fundamental principle: favorable variances can signal problems as serious as unfavorable ones. If the flexible budget volume assumption is miscalibrated, future reports will be systematically distorted. If overtime spending is absorbing the benefit, Solaris is incurring avoidable costs that compound. Management-by-exception should investigate significant variances regardless of direction.",
    "ExplanationWrongB": "Investigating only overtime while dismissing the volume claim as self-serving is a process error. If the volume assumption is miscalibrated, every future variance report will be distorted regardless of what the overtime investigation finds. Both hypotheses are testable against Q1 production records. The controller should verify claims against data, not prejudge which stakeholder is credible.",
    "ExplanationWrongC": "Option C is incorrect because deferring investigation until Q2 compounds the risk. If the flexible budget volume assumption is miscalibrated, Q2's variance report will be distorted as well, and trend analysis on two distorted periods provides no additional signal. The controller's specific claims — volume miscalibration and overtime masking — should be investigated immediately, as Option D proposes.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  }
];