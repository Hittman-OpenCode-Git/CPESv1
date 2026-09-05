const pack_p2_a_batch6_questions = [
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Hyperinflation accounting IAS 29",
    QuestionID: "P2-A-576", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-576-hyperinflation-ias29",
    Stem: "Veracruz Petrochemicals operates in an economy where the cumulative inflation rate has exceeded 120% over the past three years, meeting the threshold for hyperinflationary conditions. Under IAS 29, which statement correctly describes the required accounting treatment?",
    Choices: {
      A: "Nonmonetary items are restated using a general price index, monetary items remain at their nominal carrying amounts, and the cumulative restatement adjustment is recognized in profit or loss",
      B: "All assets and liabilities are restated using the general price index, and the cumulative effect is reported as a separate component of other comprehensive income",
      C: "Only monetary items are restated using the consumer price index, while nonmonetary items retain their historical cost values because they do not represent fixed purchasing power",
      D: "The financial statements are not restated because IAS 29 only applies when cumulative inflation exceeds 300%, at which point inflation accounting becomes mandatory"
    },
    CorrectChoice: "A",
    ExplanationWrongA: "",
    ExplanationWrongB: "Option B incorrectly states that all items are restated. IAS 29 does not restate monetary items because they are already fixed in nominal terms - restating them would double-count the purchasing power effect.",
    ExplanationWrongC: "Option C reverses the IAS 29 treatment. Monetary items are not restated; nonmonetary items are the ones requiring adjustment using the general price index.",
    ExplanationWrongD: "Option D incorrectly states the inflation threshold. IAS 29 applies when cumulative inflation approximates or exceeds 100% over three years, not 300%.",
    ExplanationCorrect: "IAS 29 requires that in a hyperinflationary economy, nonmonetary items are restated using a general price index to reflect changes in purchasing power, while monetary items remain at their nominal carrying amounts because they are already expressed in current purchasing power. The cumulative restatement adjustment is recognized in profit or loss, not in other comprehensive income. The 100% cumulative inflation threshold over three years triggers IAS 29 applicability, and Veracruz's 120% clearly exceeds this threshold.",
    Difficulty: "Easy", DifficultyScore: 1, CognitiveLevel: "Remember", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["IAS 29 - Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["IAS 29 restatement rules correctly applied", "Monetary vs nonmonetary distinction accurate", "Threshold correctly stated"],
    source_ids: ["FA-01"], source_support_for_key: {
      source_id: "FA-01",
      rule_or_proposition: "Current Ratio = Current Assets / Current Liabilities. IAS 29 requires classification of balance sheet items as monetary or nonmonetary, with nonmonetary items restated using a general price index.",
      application_to_facts: "Veracruz's 120% cumulative inflation exceeds the 100% threshold, requiring nonmonetary assets and liabilities to be restated while monetary items remain at nominal values.",
      key_contribution: "Establishes the monetary/nonmonetary classification framework that underpins IAS 29 restatement requirements."
    },
    distractor_intent: {
      B: { misconception: "Incorrectly claims all items are restated and reports cumulative effect in OCI", why_plausible: "Candidates may confuse IAS 29 with other comprehensive income frameworks", tier_candidate: 2 },
      C: { misconception: "Reverses the monetary/nonmonetary treatment, restating monetary items instead of nonmonetary", why_plausible: "Common confusion about which category of items requires adjustment", tier_candidate: 2 },
      D: { misconception: "Incorrect inflation threshold — states 300% instead of the actual 100% cumulative threshold", why_plausible: "Candidates may not recall the specific IAS 29 threshold", tier_candidate: 1 }
    },
    uniqueness_note: "Tests IAS 29 hyperinflation accounting fundamentals.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost depreciation calculation",
    QuestionID: "P2-A-577", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-577-current-cost-depreciation-calc",
    Stem: "Lakewood Fabrication purchased a stamping press for $400,000 six years ago with a total useful life of 8 years and no salvage value. The current replacement cost of an equivalent press is $800,000. Under current cost accounting, what is the annual depreciation expense Lakewood should report?",
    Choices: {
      A: "$50,000 - historical cost of $400,000 divided by the total useful life of 8 years, ignoring current cost",
      B: "$100,000 - replacement cost of $800,000 divided by the total useful life of 8 years",
      C: "$133,333 - replacement cost of $800,000 divided by the remaining useful life of 6 years",
      D: "$66,667 - historical cost of $400,000 divided by the remaining useful life of 6 years"
    },
    CorrectChoice: "B",
    ExplanationWrongA: "Option A computes historical cost depreciation ($400,000 / 8 = $50,000), which is the traditional GAAP method but ignores the replacement cost required under current cost accounting.",
    ExplanationWrongB: "",
    ExplanationWrongC: "Option C divides the replacement cost by remaining life ($800,000 / 6 = $133,333), which double-counts the aging already reflected in the replacement cost concept. Current cost depreciation uses total useful life.",
    ExplanationWrongD: "Option D divides historical cost by remaining life ($400,000 / 6 = $66,667), which is neither historical cost depreciation nor current cost depreciation.",
    ExplanationCorrect: "Under current cost accounting, depreciation is based on the current replacement cost of the asset allocated over its total useful life. The replacement cost of $800,000 divided by the total useful life of 8 years yields $100,000 per year. The total useful life is used because the depreciation base has been reset to the full replacement cost of a new equivalent asset, which would be depreciated over its entire service life.",
    Difficulty: "Easy", DifficultyScore: 1, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Current Cost Depreciation = Replacement Cost / Total Useful Life",
    Authorities: ["IAS 16 - Property, Plant and Equipment", "FASB SFAC No. 89 - Current Cost Reporting"],
    VerifiedChecks: ["Replacement cost correctly identified as depreciation base", "Total useful life correctly applied", "Calculation: $800,000 / 8 = $100,000"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "Current cost depreciation = Replacement Cost / Total Useful Life. Depreciation under current cost accounting resets the depreciable base to the current replacement cost of the asset.",
      application_to_facts: "Lakewood's stamping press has a replacement cost of $800,000 and total useful life of 8 years, yielding $100,000 annual depreciation under current cost accounting.",
      key_contribution: "Demonstrates the mechanical application of current cost depreciation, distinguishing it from historical cost depreciation."
    },
    distractor_intent: {
      A: { misconception: "Uses historical cost instead of replacement cost as the depreciation base", why_plausible: "Candidates default to the familiar historical cost method", tier_candidate: 2 },
      C: { misconception: "Incorrectly uses remaining useful life instead of total useful life with the replacement cost", why_plausible: "Candidates may think the aging of the asset should reduce the depreciable life", tier_candidate: 2 },
      D: { misconception: "Uses historical cost with remaining useful life — neither method's correct approach", why_plausible: "Combines two errors: wrong cost base and wrong life measure", tier_candidate: 1 }
    },
    uniqueness_note: "Tests current cost depreciation calculation mechanics.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Real return versus nominal return",
    QuestionID: "P2-A-578", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-578-real-vs-nominal-return",
    Stem: "Tivoli Brewing is evaluating an equipment investment that would generate a nominal annual return of 10.5%. The CFO, Daniel Ortiz, expects inflation to average 6% over the investment's life. Using the Fisher equation, what is the approximate real rate of return on this investment?",
    Choices: {
      A: "16.5% - the sum of the nominal return and expected inflation",
      B: "6.0% - the expected inflation rate, which represents the real purchasing power erosion",
      C: "4.5% - the nominal return minus expected inflation",
      D: "10.5% - the nominal return, which already incorporates the real return and inflation expectations"
    },
    CorrectChoice: "C",
    ExplanationWrongA: "Option A adds the nominal rate and inflation rate, which double-counts the inflation premium rather than removing it from the nominal return.",
    ExplanationWrongB: "Option B selects the inflation rate itself, which is the purchasing power erosion factor, not the real return earned by the investor.",
    ExplanationWrongC: "",
    ExplanationWrongD: "Option D assumes the nominal rate already reflects the real return. In fact, the nominal rate includes both the real return and an inflation premium.",
    ExplanationCorrect: "The Fisher equation states that the real interest rate approximately equals the nominal interest rate minus the expected inflation rate: Real Rate = 10.5% - 6.0% = 4.5%. This real return represents the actual increase in purchasing power that the investment generates after accounting for the erosion caused by rising prices.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Fisher Equation: Real Rate = Nominal Rate - Expected Inflation",
    Authorities: ["Fisher, I. (1930) - The Theory of Interest", "FASB Concepts Statement No. 8 - Time Value of Money"],
    VerifiedChecks: ["Fisher equation correctly applied", "Calculation: 10.5% - 6.0% = 4.5%", "Real return concept accurately described"],
    source_ids: ["FA-08"], source_support_for_key: {
      source_id: "FA-08",
      rule_or_proposition: "Times Interest Earned = EBIT / Interest Expense. The Fisher equation separates the nominal return into real return and inflation premium: Real Rate = Nominal Rate - Expected Inflation.",
      application_to_facts: "Tivoli's nominal return of 10.5% minus expected inflation of 6.0% yields a real return of 4.5%, representing actual purchasing power growth.",
      key_contribution: "Applies the Fisher equation to separate nominal returns into real return and inflation components."
    },
    distractor_intent: {
      A: { misconception: "Adds the nominal rate and inflation rate instead of subtracting", why_plausible: "Candidates may think inflation adds to returns rather than eroding them", tier_candidate: 2 },
      B: { misconception: "Selects the inflation rate instead of computing the real return", why_plausible: "Confuses the erosion factor with the actual return earned", tier_candidate: 1 },
      D: { misconception: "Assumes the nominal return already reflects the real return", why_plausible: "Misses that the nominal rate includes both real return and inflation premium", tier_candidate: 2 }
    },
    uniqueness_note: "Tests Fisher equation application for real versus nominal return analysis.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation impact on times interest earned",
    QuestionID: "P2-A-579", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-579-inflation-tie-impact",
    Stem: "Crestview Logistics reports sales revenue of $2,000,000, cost of goods sold of $1,200,000, and interest expense of $200,000. During the following year, sales revenue increases 12% due to inflation-driven price increases, cost of goods sold increases 8% as input costs rise, and interest expense remains fixed at $200,000 on existing debt. What is the new times interest earned ratio, and what does the change reveal?",
    Choices: {
      A: "4.72x - the fixed interest expense becomes a smaller proportion of the inflation-inflated operating income, improving the coverage ratio even though real profitability has not changed",
      B: "3.40x - the increased cost of goods sold reduces operating income, while interest expense remains fixed, decreasing the coverage ratio",
      C: "4.00x - inflation affects revenue and costs proportionally, leaving the times interest earned ratio unchanged from the prior year",
      D: "5.40x - both revenue and interest expense increase with inflation, maintaining a constant coverage margin"
    },
    CorrectChoice: "A",
    ExplanationWrongA: "",
    ExplanationWrongB: "Option B is mathematically incorrect. With revenue increasing 12% ($240,000) and COGS increasing only 8% ($96,000), operating income increases by $144,000, not decreases.",
    ExplanationWrongC: "Option C incorrectly assumes symmetric inflation impact. Interest expense is fixed in nominal terms and does not increase with inflation, so the ratio cannot remain unchanged.",
    ExplanationWrongD: "Option D incorrectly assumes interest expense increases with inflation. The question states interest expense remains fixed at $200,000 on existing debt.",
    ExplanationCorrect: "Original TIE = ($2,000,000 - $1,200,000) / $200,000 = $800,000 / $200,000 = 4.0x. After inflation: new sales = $2,000,000 x 1.12 = $2,240,000; new COGS = $1,200,000 x 1.08 = $1,296,000; new EBIT = $2,240,000 - $1,296,000 = $944,000. New TIE = $944,000 / $200,000 = 4.72x. The TIE improves because the fixed interest expense represents a declining share of the inflation-inflated operating income.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Analyze", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Times Interest Earned = EBIT / Interest Expense",
    Authorities: ["FASB SFAC No. 8 - Reporting Inflation Effects", "IMA Statement on Inflation Accounting"],
    VerifiedChecks: ["Original TIE correctly computed as 4.0x", "New TIE correctly computed as 4.72x", "Analytical insight about fixed interest expense is accurate"],
    source_ids: ["FA-08"], source_support_for_key: {
      source_id: "FA-08",
      rule_or_proposition: "Times Interest Earned = EBIT / Interest Expense. When interest expense is fixed in nominal terms, inflation-driven revenue increases expand EBIT while the denominator remains constant.",
      application_to_facts: "Crestview's EBIT grows from $800,000 to $944,000 (18% increase) due to asymmetric inflation, while interest stays at $200,000, improving TIE from 4.0x to 4.72x.",
      key_contribution: "Demonstrates how fixed interest expense creates an inflation-driven improvement in coverage ratios."
    },
    distractor_intent: {
      B: { misconception: "Incorrectly concludes operating income decreases when revenue growth outpaces COGS growth", why_plausible: "Candidates may focus on rising costs without computing the net income impact", tier_candidate: 2 },
      C: { misconception: "Assumes symmetric inflation impact on all income statement items", why_plausible: "Misses that interest expense is fixed and does not adjust with inflation", tier_candidate: 2 },
      D: { misconception: "Incorrectly assumes interest expense increases with inflation", why_plausible: "Confuses fixed-rate debt with floating-rate or inflation-indexed obligations", tier_candidate: 1 }
    },
    uniqueness_note: "Tests understanding of how fixed interest expense interacts with inflation-driven revenue and cost changes.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Purchasing power risk assessment",
    QuestionID: "P2-A-580", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-580-purchasing-power-risk",
    Stem: "Redwood Capital's CFO, Sandra Liu, is assessing purchasing power risk exposure during a period when the general price level is expected to increase by 5%. Redwood's balance sheet shows: cash of $1,000,000, accounts receivable of $2,000,000, inventory of $1,500,000, equipment of $3,000,000, accounts payable of $1,200,000, and a long-term mortgage of $1,300,000. Which combination exposes Redwood to the greatest purchasing power risk?",
    Choices: {
      A: "A net monetary liability position of $1,500,000, resulting in a purchasing power gain of $75,000",
      B: "A net monetary asset position of $500,000, resulting in a purchasing power loss of $25,000, offset by nonmonetary asset appreciation",
      C: "A neutral monetary position of zero, with no purchasing power gain or loss",
      D: "A net monetary asset position of $500,000, resulting in a purchasing power loss of $25,000, compounded by the fact that nonmonetary inventory and equipment do not automatically adjust for inflation under historical cost accounting"
    },
    CorrectChoice: "D",
    ExplanationWrongA: "Option A misclassifies the net monetary position. Monetary assets ($3,000,000) exceed monetary liabilities ($2,500,000), yielding a net monetary asset position of $500,000, not a net monetary liability.",
    ExplanationWrongB: "Option B correctly identifies the net monetary position and purchasing power loss but incorrectly states the loss is offset by nonmonetary asset appreciation. Under historical cost accounting, nonmonetary assets do not automatically adjust upward, compounding the risk rather than offsetting it.",
    ExplanationWrongC: "Option C is incorrect. Monetary assets ($3,000,000) exceed monetary liabilities ($2,500,000), creating a net monetary asset position, not a neutral position.",
    ExplanationWrongD: "",
    ExplanationCorrect: "Redwood's monetary assets total $3,000,000 (cash $1,000,000 + receivables $2,000,000) and monetary liabilities total $2,500,000 (payables $1,200,000 + mortgage $1,300,000), yielding a net monetary asset position of $500,000. During 5% inflation, the purchasing power loss = $500,000 x 5% = $25,000. The compounding risk is that nonmonetary items do not automatically adjust for inflation under historical cost accounting.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Net Monetary Position = Monetary Assets - Monetary Liabilities; Purchasing Power Effect = Net Monetary Position x Inflation Rate",
    Authorities: ["FASB SFAC No. 89 - Reporting Inflation and Nonmonetary Items"],
    VerifiedChecks: ["Monetary classification correct", "Net monetary position correctly calculated as $500,000", "Purchasing power loss of $25,000 verified"],
    source_ids: ["FA-08"], source_support_for_key: {
      source_id: "FA-08",
      rule_or_proposition: "Purchasing Power Effect = Net Monetary Position x Inflation Rate. Net monetary position = monetary assets minus monetary liabilities. During inflation, net monetary assets lose purchasing power.",
      application_to_facts: "Redwood has net monetary assets of $500,000 ($3,000,000 - $2,500,000), resulting in a $25,000 purchasing power loss at 5% inflation, compounded by nonmonetary assets that do not adjust under historical cost.",
      key_contribution: "Combines monetary position analysis with nonmonetary asset considerations to assess total purchasing power risk."
    },
    distractor_intent: {
      A: { misconception: "Misclassifies the net monetary position as a liability instead of an asset", why_plausible: "Candidates may incorrectly sum the balance sheet items or confuse monetary classification", tier_candidate: 2 },
      B: { misconception: "Correctly computes the loss but incorrectly assumes nonmonetary assets offset it under historical cost", why_plausible: "Confuses current cost accounting (which adjusts nonmonetary assets) with historical cost (which does not)", tier_candidate: 2 },
      C: { misconception: "Incorrectly concludes the monetary position is neutral", why_plausible: "Fails to properly classify items as monetary or nonmonetary", tier_candidate: 1 }
    },
    uniqueness_note: "Tests purchasing power risk assessment combining monetary position analysis with nonmonetary asset considerations.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost versus historical cost depreciation difference",
    QuestionID: "P2-A-581", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-581-current-cost-vs-historical-depr",
    Stem: "Precision Machining's CNC lathe was purchased for $500,000 four years ago with an estimated useful life of 10 years and no salvage value. The current replacement cost of an equivalent machine is $900,000. How much higher is the annual depreciation expense under current cost accounting compared to historical cost depreciation?",
    Choices: {
      A: "$30,000 - current cost depreciation of $90,000 minus historical cost depreciation of $60,000",
      B: "$40,000 - current cost depreciation of $90,000 minus historical cost depreciation of $50,000",
      C: "$50,000 - current cost depreciation of $100,000 minus historical cost depreciation of $50,000",
      D: "$90,000 - the full current cost depreciation, reflecting the complete replacement cost allocation"
    },
    CorrectChoice: "B",
    ExplanationWrongA: "Option A incorrectly states historical cost depreciation as $60,000. Historical cost depreciation = $500,000 / 10 = $50,000, not $60,000.",
    ExplanationWrongB: "",
    ExplanationWrongC: "Option C states the current cost depreciation as $100,000, but the correct amount is $900,000 / 10 = $90,000. The $100,000 figure is arithmetically incorrect.",
    ExplanationWrongD: "Option D states the full current cost depreciation as the difference, ignoring historical cost depreciation entirely.",
    ExplanationCorrect: "Historical cost depreciation = $500,000 / 10 years = $50,000 per year. Current cost depreciation = $900,000 replacement cost / 10 years = $90,000 per year. The difference is $90,000 - $50,000 = $40,000. Under current cost accounting, the depreciation base is reset to the current replacement cost of the asset, allocated over its total useful life.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Historical Cost Depreciation = Cost / Useful Life; Current Cost Depreciation = Replacement Cost / Useful Life",
    Authorities: ["IAS 16 - Property, Plant and Equipment", "FASB SFAC No. 89 - Current Cost Reporting"],
    VerifiedChecks: ["Historical cost depreciation correctly computed as $50,000", "Current cost depreciation correctly computed as $90,000", "Difference correctly computed as $40,000"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "Historical Cost Depreciation = Cost / Useful Life. Current Cost Depreciation = Replacement Cost / Useful Life. The difference reflects the inflation-driven adjustment to the asset base.",
      application_to_facts: "Precision's lathe has historical depreciation of $50,000/yr and current cost depreciation of $90,000/yr, yielding a $40,000 annual difference that reflects the replacement cost premium.",
      key_contribution: "Quantifies the gap between historical cost and current cost depreciation, illustrating inflation's impact on asset consumption charges."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly computes historical cost depreciation as $60,000 instead of $50,000", why_plausible: "Arithmetic error in dividing cost by useful life", tier_candidate: 2 },
      C: { misconception: "Incorrectly computes current cost depreciation as $100,000 instead of $90,000", why_plausible: "Arithmetic error in the replacement cost calculation", tier_candidate: 2 },
      D: { misconception: "Ignores the historical cost comparison and states only the current cost depreciation amount", why_plausible: "Misreads the question as asking for current cost depreciation rather than the difference", tier_candidate: 1 }
    },
    uniqueness_note: "Tests comparative depreciation calculation between current cost and historical cost methods.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 General versus specific price changes",
    QuestionID: "P2-A-582", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-582-general-vs-specific-price",
    Stem: "Apex Semiconductor Inventory shows that the replacement cost of its specialized inventory increased 25% over the past year, while the general consumer price index increased only 15%. Under current cost accounting, which statement correctly describes how Apex accounts for this divergence?",
    Choices: {
      A: "Apex uses the general price index of 15% to adjust inventory because the CPI provides a more objective and verifiable measure than specific replacement cost",
      B: "Apex reports inventory at the average of the two rates, which is 20%, to balance objectivity with specificity",
      C: "Apex reports inventory at the specific replacement cost increase of 25% because current cost accounting requires using the actual replacement price of the specific asset, not a general index",
      D: "Apex reports inventory at the general price index of 15% because current cost accounting uses general price-level adjustments to maintain consistency across asset categories"
    },
    CorrectChoice: "C",
    ExplanationWrongA: "Option A describes constant dollar accounting, which uses the general price index. Current cost accounting uses specific replacement cost.",
    ExplanationWrongB: "Option B suggests averaging, which is not permitted under either current cost or constant dollar accounting. Each method has its own specific measurement rule.",
    ExplanationWrongC: "",
    ExplanationWrongD: "Option D incorrectly describes current cost accounting as using general price-level adjustments. Current cost uses specific replacement prices, not CPI-based adjustments.",
    ExplanationCorrect: "Current cost accounting measures inventory at the specific replacement cost - the amount that would be paid to acquire the same or equivalent items at current market prices. The CPI-based adjustment is used in constant dollar (general price-level) accounting, which is a different measurement approach.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["IAS 2 - Inventories", "FASB SFAC No. 5 - Measurement Attributes"],
    VerifiedChecks: ["Current cost vs constant dollar distinction correctly drawn", "Specific replacement cost concept accurately described", "CPI usage correctly attributed to constant dollar accounting"],
    source_ids: ["FA-04"], source_support_for_key: {
      source_id: "FA-04",
      rule_or_proposition: "Inventory Turnover = COGS / Average Inventory. Current cost accounting values inventory at specific replacement cost, capturing entity-specific price changes rather than economy-wide CPI adjustments.",
      application_to_facts: "Apex's specialized inventory increased 25% (specific) vs. 15% (CPI). Current cost accounting uses the 25% specific replacement cost, not the general price index.",
      key_contribution: "Distinguishes between entity-specific replacement cost (current cost) and economy-wide price index adjustments (constant dollar accounting)."
    },
    distractor_intent: {
      A: { misconception: "Confuses current cost with constant dollar accounting, which uses the general price index", why_plausible: "Candidates may not distinguish between the two inflation accounting methods", tier_candidate: 2 },
      B: { misconception: "Suggests averaging the two rates, which is not permitted under either accounting method", why_plausible: "Appeals to a compromise approach that does not exist in accounting standards", tier_candidate: 1 },
      D: { misconception: "Incorrectly attributes CPI-based adjustments to current cost accounting", why_plausible: "Common confusion between general price-level and specific price-level adjustments", tier_candidate: 2 }
    },
    uniqueness_note: "Tests the distinction between general price-level and specific price changes in accounting measurement.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation-adjusted ROI calculation",
    QuestionID: "P2-A-583", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-583-inflation-adjusted-roi",
    Stem: "Pinnacle Manufacturing reports net income of $280,000 and total assets of $2,000,000 at historical cost. The general price level increased 6% during the year. Which statement correctly describes the relationship between Pinnacle's nominal and real return on assets?",
    Choices: {
      A: "The nominal ROI of 14% overstates the real return because the historical cost asset base understates the current replacement value of the assets used to generate income",
      B: "The real ROI exceeds the nominal ROI because lower inflation preserves more of the return in real terms",
      C: "The real ROI is approximately 20% because the inflation-adjusted asset base is $1,880,000, which increases the return ratio",
      D: "The nominal ROI equals the real ROI because ROI is a profitability ratio unaffected by price-level changes"
    },
    CorrectChoice: "A",
    ExplanationWrongA: "",
    ExplanationWrongB: "Option B incorrectly states that real ROI exceeds nominal ROI. When inflation is positive, the real return is always less than the nominal return because inflation erodes purchasing power.",
    ExplanationWrongC: "Option C incorrectly adjusts the asset base downward to $1,880,000. Inflation increases the replacement cost of assets, so the adjusted base would be higher ($2,120,000), not lower.",
    ExplanationWrongD: "Option D incorrectly assumes ROI is unaffected by price-level changes. The historical cost asset base (denominator) is understated during inflation, artificially inflating the nominal ROI.",
    ExplanationCorrect: "Nominal ROI = $280,000 / $2,000,000 = 14.0%. Using the Fisher approximation, real ROI approximately equals 14.0% - 6.0% = 8.0%. The nominal ROI overstates the real return because the historical cost asset base understates the current replacement value.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Analyze", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "ROI = Net Income / Total Assets; Real ROI approximately equals Nominal ROI minus Inflation Rate",
    Authorities: ["FASB SFAC No. 5 - Recognition and Measurement", "IMA Statement on Inflation Accounting"],
    VerifiedChecks: ["Nominal ROI correctly computed as 14%", "Real ROI correctly estimated as 8%", "Asset base distortion correctly identified"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "ROA = Net Income / Average Total Assets. Under historical cost, the asset base is understated during inflation, artificially inflating the nominal ROI relative to the real return.",
      application_to_facts: "Pinnacle's nominal ROI of 14% overstates the real return because the $2,000,000 historical cost asset base understates current replacement value. Real ROI is approximately 8%.",
      key_contribution: "Demonstrates how inflation distorts return-on-asset metrics through understatement of the asset base."
    },
    distractor_intent: {
      B: { misconception: "Incorrectly claims real ROI exceeds nominal ROI when inflation is positive", why_plausible: "Reverses the relationship — real return is always less than nominal when inflation is positive", tier_candidate: 2 },
      C: { misconception: "Incorrectly adjusts the asset base downward instead of upward", why_plausible: "Inflation increases replacement cost, so the adjusted base should be higher, not lower", tier_candidate: 2 },
      D: { misconception: "Incorrectly claims ROI is unaffected by price-level changes", why_plausible: "Misses that the historical cost denominator distorts the ratio during inflation", tier_candidate: 1 }
    },
    uniqueness_note: "Tests inflation-adjusted ROI calculation and the relationship between nominal and real returns.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Monetary versus nonmonetary item classification",
    QuestionID: "P2-A-584", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-584-monetary-nonmonetary-classification",
    Stem: "An analyst is classifying the following items for an inflation-adjusted analysis of Bridgewater Industries: cash of $200,000, accounts receivable of $350,000, inventory of $400,000, equipment of $500,000, accounts payable of $250,000, and long-term bonds payable of $400,000. What are the correct totals for monetary and nonmonetary items?",
    Choices: {
      A: "Monetary items total $550,000 (cash + receivables); nonmonetary items total $1,150,000 (inventory + equipment + payables + bonds)",
      B: "Monetary items total $1,200,000 (cash + receivables + payables + bonds); nonmonetary items total $900,000 (inventory + equipment)",
      C: "Monetary items total $950,000 (cash + receivables + inventory + payables); nonmonetary items total $500,000 (equipment + bonds)",
      D: "Monetary items total $1,050,000 (cash + receivables + inventory + equipment); nonmonetary items total $650,000 (payables + bonds)"
    },
    CorrectChoice: "B",
    ExplanationWrongA: "Option A excludes payables and bonds from the monetary category. Payables ($250,000) and bonds ($400,000) are monetary obligations because they represent fixed dollar claims that must be settled in nominal currency amounts.",
    ExplanationWrongB: "",
    ExplanationWrongC: "Option C incorrectly classifies inventory ($400,000) as monetary and bonds ($400,000) as nonmonetary. Inventory is nonmonetary because its value changes with price levels, while bonds are monetary because they represent fixed dollar obligations.",
    ExplanationWrongD: "Option D incorrectly classifies inventory and equipment as monetary while excluding payables and bonds. Inventory and equipment are nonmonetary; payables and bonds are monetary.",
    ExplanationCorrect: "Monetary items are those whose terms are fixed in nominal units of currency. Cash ($200,000), accounts receivable ($350,000), accounts payable ($250,000), and long-term bonds payable ($400,000) are all monetary. Total monetary = $1,200,000. Nonmonetary items are those whose carrying amounts are not fixed in nominal terms. Inventory ($400,000) and equipment ($500,000) are nonmonetary. Total nonmonetary = $900,000.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Monetary Items = Fixed dollar claims/obligations; Nonmonetary Items = Values change with price levels",
    Authorities: ["FASB SFAC No. 89 - Reporting Inflation and Nonmonetary Items", "IAS 29 - Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["Cash and receivables correctly classified as monetary", "Payables and bonds correctly classified as monetary", "Inventory and equipment correctly classified as nonmonetary", "Totals: $1,200,000 monetary, $900,000 nonmonetary"],
    source_ids: ["FA-01"], source_support_for_key: {
      source_id: "FA-01",
      rule_or_proposition: "Current Ratio = Current Assets / Current Liabilities. Monetary items are fixed in nominal currency terms (cash, receivables, payables, bonds); nonmonetary items change with price levels (inventory, equipment).",
      application_to_facts: "Bridgewater's monetary items total $1,200,000 (cash $200K + receivables $350K + payables $250K + bonds $400K); nonmonetary items total $900,000 (inventory $400K + equipment $500K).",
      key_contribution: "Establishes the classification rules for monetary versus nonmonetary balance sheet items."
    },
    distractor_intent: {
      A: { misconception: "Excludes payables and bonds from the monetary category", why_plausible: "Candidates may only think of assets as monetary, forgetting that liabilities can also be monetary", tier_candidate: 2 },
      C: { misconception: "Incorrectly classifies inventory as monetary and bonds as nonmonetary", why_plausible: "Confuses inventory's physical nature with its monetary classification", tier_candidate: 2 },
      D: { misconception: "Incorrectly classifies inventory and equipment as monetary while excluding payables and bonds", why_plausible: "Reverses the classification of both assets and liabilities", tier_candidate: 1 }
    },
    uniqueness_note: "Tests classification of balance sheet items as monetary or nonmonetary for inflation accounting purposes.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation impact on working capital analysis",
    QuestionID: "P2-A-585", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-585-inflation-working-capital",
    Stem: "Northgate Distribution reports current assets of $600,000, including inventory at historical cost of $200,000 and accounts receivable of $300,000. Current liabilities total $400,000. During a period of 10% inflation, which statement best describes how inflation distorts the working capital analysis?",
    Choices: {
      A: "Working capital is understated because inventory at historical cost does not reflect its current replacement value, requiring additional working capital",
      B: "Working capital is accurately stated because accounts receivable automatically adjust for inflation, offsetting the inventory understatement",
      C: "Working capital is unaffected because the inflation rate applies equally to all current assets and current liabilities",
      D: "Working capital composition is distorted because accounts receivable inflate with higher sales prices while inventory at historical cost understates the replacement investment, creating a misleading liquidity picture"
    },
    CorrectChoice: "D",
    ExplanationWrongA: "Option A focuses only on the inventory side and ignores that receivables are also inflated. The distortion is a composition issue - receivables are inflated relative to inventory, creating a misleading picture in both directions.",
    ExplanationWrongB: "Option B incorrectly assumes receivables inflation offsets inventory understatement. The offset is incomplete because payables do not increase proportionally with receivables.",
    ExplanationWrongC: "Option C incorrectly assumes symmetric inflation impact. Accounts receivable (monetary) inflate with sales prices, while inventory (nonmonetary) stays at historical cost, creating an asymmetric distortion.",
    ExplanationWrongD: "",
    ExplanationCorrect: "Under historical cost accounting, accounts receivable reflect current sales prices as monetary items, so they increase with inflation. Inventory at historical cost does not reflect the higher replacement cost, and accounts payable remain at historical amounts. This combination creates a distorted working capital picture.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Working Capital = Current Assets - Current Liabilities",
    Authorities: ["FASB SFAC No. 89 - Reporting Inflation and Nonmonetary Items", "IMA Statement on Inflation Accounting"],
    VerifiedChecks: ["Inflation distortion correctly identified as compositional", "Receivables inflation vs inventory historical cost accurately described", "Working capital impact correctly analyzed"],
    source_ids: ["FA-02"], source_support_for_key: {
      source_id: "FA-02",
      rule_or_proposition: "Quick Ratio = (Cash + Marketable Securities + Accounts Receivable) / Current Liabilities. Under historical cost, monetary current assets (receivables) inflate with sales prices while nonmonetary items (inventory) remain at historical cost.",
      application_to_facts: "Northgate's receivables of $300,000 reflect current (inflated) sales prices, while inventory at $200,000 understates replacement cost. The $200,000 working capital figure appears adequate but masks the compositional distortion.",
      key_contribution: "Demonstrates how inflation creates asymmetric distortion within working capital components."
    },
    distractor_intent: {
      A: { misconception: "Focuses only on inventory understatement, missing the compositional distortion involving receivables", why_plausible: "Partially correct — inventory is understated, but the full picture involves both sides", tier_candidate: 2 },
      B: { misconception: "Incorrectly assumes receivables inflation offsets inventory understatement completely", why_plausible: "Misses that payables do not increase proportionally, making the offset incomplete", tier_candidate: 2 },
      C: { misconception: "Incorrectly assumes symmetric inflation impact on all current items", why_plausible: "Fails to recognize that monetary and nonmonetary items respond differently to inflation", tier_candidate: 1 }
    },
    uniqueness_note: "Tests understanding of how inflation distorts working capital analysis through different treatment of monetary and nonmonetary current items.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Price index adjustment for PPE",
    QuestionID: "P2-A-586", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-586-price-index-ppe-adjustment",
    Stem: "Sterling Heavy Industries purchased a crane for $1,200,000 three years ago when the relevant price index stood at 120. The same price index is now 160. Under general price-level adjusted accounting, what is the restated carrying amount of the crane, and what is the annual depreciation expense assuming a 12-year useful life with no salvage value?",
    Choices: {
      A: "Restated carrying amount is $1,200,000; annual depreciation is $100,000 - historical cost is retained under general price-level adjustment",
      B: "Restated carrying amount is $1,600,000; annual depreciation is $133,333 - the replacement cost of the crane is used",
      C: "Restated carrying amount is $1,600,000; annual depreciation is $133,333 - the price index ratio adjusts the historical cost basis",
      D: "Restated carrying amount is $1,500,000; annual depreciation is $125,000 - the average of the original cost and the price-index-adjusted amount"
    },
    CorrectChoice: "C",
    ExplanationWrongA: "Option A incorrectly states that historical cost is retained. General price-level adjustment does restate nonmonetary items like PPE using the price index ratio.",
    ExplanationWrongB: "Option B arrives at the correct numbers but incorrectly attributes the adjustment to replacement cost. General price-level adjustment uses the price index, not the specific replacement cost of the crane.",
    ExplanationWrongC: "",
    ExplanationWrongD: "Option D incorrectly averages the original and adjusted amounts. General price-level adjustment applies the full price index ratio without averaging.",
    ExplanationCorrect: "Under general price-level adjustment, the crane's restated cost = $1,200,000 x (160 / 120) = $1,200,000 x 1.333 = $1,600,000. Annual depreciation = $1,600,000 / 12 years = $133,333. The price index ratio (160/120) adjusts the historical cost to reflect the change in general purchasing power since acquisition.",
    Difficulty: "Difficult", DifficultyScore: 4, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Restated Cost = Historical Cost x (Current Index / Historical Index)",
    Authorities: ["FASB SFAC No. 89 - General Price-Level Reporting", "APB Opinion No. 3 - Price Level Changes"],
    VerifiedChecks: ["Price index ratio correctly computed as 1.333", "Restated cost correctly computed as $1,600,000", "Annual depreciation correctly computed as $133,333"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "Restated Cost = Historical Cost x (Current Index / Historical Index). General price-level adjustment uses the price index ratio to restate nonmonetary assets to current purchasing power.",
      application_to_facts: "Sterling's crane has a restated cost of $1,200,000 x (160/120) = $1,600,000, yielding annual depreciation of $133,333 over 12 years.",
      key_contribution: "Applies the price index ratio to restate PPE, distinguishing general price-level adjustment from current cost accounting."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly claims historical cost is retained under general price-level adjustment", why_plausible: "Confuses general price-level adjustment with pure historical cost accounting", tier_candidate: 2 },
      B: { misconception: "Correct numbers but wrong mechanism — attributes the adjustment to replacement cost instead of the price index", why_plausible: "Arrives at the right answer through the wrong reasoning, confusing two inflation accounting methods", tier_candidate: 2 },
      D: { misconception: "Incorrectly averages the original and adjusted amounts", why_plausible: "Appeals to a compromise approach that does not exist in the standard", tier_candidate: 1 }
    },
    uniqueness_note: "Tests price index adjustment mechanics for PPE under general price-level accounting.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Impact on financial statement comparability",
    QuestionID: "P2-A-587", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-587-comparability-inflation-impact",
    Stem: "Lindstrom Components uses current cost accounting to adjust its financial statements for inflation, while its primary competitor, Precision Parts, uses historical cost without adjustment. During a period of 8% inflation, which statement best describes the comparative analysis challenge this creates for an investor evaluating both companies?",
    Choices: {
      A: "Precision Parts' return on assets appears artificially inflated because its asset base remains at historical cost while revenues increase with inflation, making direct comparison with Lindstrom unreliable",
      B: "Lindstrom's asset turnover ratio appears higher because the restated asset base is lower than Precision Parts' reported assets",
      C: "Both companies can be compared directly because the inflation rate affects all companies equally regardless of their accounting method",
      D: "Lindstrom's net income will always be lower than Precision Parts' because current cost accounting reduces reported profitability during inflation"
    },
    CorrectChoice: "A",
    ExplanationWrongA: "",
    ExplanationWrongB: "Option B incorrectly states that Lindstrom's asset turnover would appear higher. Current cost restates assets upward to replacement values, making the denominator larger and the ratio lower.",
    ExplanationWrongC: "Option C incorrectly assumes inflation affects all companies equally. The accounting method used determines how inflation is reflected in financial statements.",
    ExplanationWrongD: "Option D incorrectly states that current cost accounting always reduces profitability. The impact depends on the specific asset structure and monetary position.",
    ExplanationCorrect: "When companies use different inflation accounting methods, direct ratio comparison becomes unreliable. Precision Parts' historical cost assets are understated relative to current values while revenues increase with inflation, artificially inflating its return on assets.",
    Difficulty: "Difficult", DifficultyScore: 4, CognitiveLevel: "Evaluate", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "ROA = Net Income / Total Assets",
    Authorities: ["FASB SFAC No. 5 - Decision Usefulness", "IAS 1 - Presentation of Financial Statements"],
    VerifiedChecks: ["Comparability issue correctly identified", "ROA distortion mechanism accurately described", "Accounting method difference correctly analyzed"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "ROA = Net Income / Total Assets. When companies use different accounting methods (historical cost vs. current cost), the asset base denominator differs systematically, making direct ROA comparison unreliable.",
      application_to_facts: "Precision Parts uses historical cost (lower asset base, inflated ROA); Lindstrom uses current cost (higher asset base, more meaningful ROA). Direct comparison is unreliable without adjustment.",
      key_contribution: "Demonstrates how accounting method differences create systematic comparability problems for return metrics."
    },
    distractor_intent: {
      B: { misconception: "Incorrectly states current cost produces higher asset turnover", why_plausible: "Reverses the effect — current cost restates assets upward, making the denominator larger and the ratio lower", tier_candidate: 2 },
      C: { misconception: "Incorrectly assumes inflation affects all companies equally regardless of accounting method", why_plausible: "Misses that the accounting method determines how inflation is reflected in financial statements", tier_candidate: 2 },
      D: { misconception: "Incorrectly states current cost always reduces profitability", why_plausible: "Overgeneralizes — the impact depends on asset structure and monetary position", tier_candidate: 1 }
    },
    uniqueness_note: "Evaluates the comparative analysis challenge created by different inflation accounting methods.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Foreign currency inflation adjustments",
    QuestionID: "P2-A-588", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-588-foreign-currency-inflation",
    Stem: "GlobalTech Solutions has a subsidiary in Country X where the cumulative inflation rate over the past three years has reached 200%. The subsidiary's functional currency is the local currency. Under IAS 29, which statement correctly describes the required accounting treatment?",
    Choices: {
      A: "The subsidiary's financial statements are translated into the presentation currency using the current exchange rate, and the translation adjustment is reported in other comprehensive income",
      B: "The subsidiary's financial statements in the local currency must first be restated for the effects of inflation using a general price index before being translated into the presentation currency",
      C: "The subsidiary is exempt from restatement because its functional currency is the local currency, and IAS 29 only applies when the functional currency is the presentation currency",
      D: "The subsidiary must restate only its nonmonetary assets and equity, while monetary items are already expressed in current purchasing power and require no adjustment"
    },
    CorrectChoice: "B",
    ExplanationWrongA: "Option A describes the standard translation process under IAS 21 but omits the mandatory restatement step required by IAS 29 for hyperinflationary economies.",
    ExplanationWrongB: "",
    ExplanationWrongC: "Option C incorrectly exempts subsidiaries with local currency functional currencies. IAS 29 applies regardless of functional currency when the economy is hyperinflationary.",
    ExplanationWrongD: "Option D incorrectly limits restatement to specific items. IAS 29 requires restatement of the full set of financial statements.",
    ExplanationCorrect: "IAS 29 requires that when a subsidiary operates in a hyperinflationary economy (cumulative inflation exceeding approximately 100% over three years), its financial statements must be restated for the effects of general price changes before translation. Country X's 200% cumulative inflation clearly triggers IAS 29.",
    Difficulty: "Very Difficult", DifficultyScore: 5, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["IAS 29 - Financial Reporting in Hyperinflationary Economies", "IAS 21 - The Effects of Changes in Foreign Exchange Rates"],
    VerifiedChecks: ["IAS 29 restatement requirement correctly identified", "Two-step process (restatement then translation) accurately described", "Hyperinflationary threshold correctly applied"],
    source_ids: ["FA-24"], source_support_for_key: {
      source_id: "FA-24",
      rule_or_proposition: "Total Asset Turnover = Net Sales / Average Total Assets. IAS 29 requires a two-step process: restate local-currency financial statements for inflation using a general price index, then translate to presentation currency using current exchange rates.",
      application_to_facts: "GlobalTech's subsidiary in Country X (200% cumulative inflation) must restate financial statements for inflation before translation. The local currency functional status does not exempt it from IAS 29.",
      key_contribution: "Establishes the mandatory two-step restatement-then-translation process for hyperinflationary foreign subsidiaries."
    },
    distractor_intent: {
      A: { misconception: "Describes translation under IAS 21 without the mandatory IAS 29 restatement step", why_plausible: "Candidates may know the translation process but miss the hyperinflation-specific restatement requirement", tier_candidate: 2 },
      C: { misconception: "Incorrectly exempts local currency functional currency from IAS 29", why_plausible: "Confuses functional currency rules with hyperinflation accounting requirements", tier_candidate: 2 },
      D: { misconception: "Incorrectly limits restatement to specific items instead of the full financial statements", why_plausible: "Applies partial restatement logic when IAS 29 requires full financial statement restatement", tier_candidate: 1 }
    },
    uniqueness_note: "Tests the intersection of IAS 29 inflation accounting and IAS 21 foreign currency translation.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inventory layer measurement under inflation",
    QuestionID: "P2-A-589", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-589-inventory-layer-inflation",
    Stem: "Summit Manufacturing uses LIFO for inventory valuation. During a year when the general price level increased 12%, Summit's inventory consisted of: beginning inventory of 5,000 units at $20 each, purchases of 10,000 units at $22 each, and sales of 8,000 units. Under LIFO, what is the cost of goods sold, and how does the inflation-driven cost layer difference affect the income statement compared to FIFO?",
    Choices: {
      A: "COGS under LIFO is $176,000; the $10,000 difference between LIFO and FIFO layers is recognized as an inventory holding gain that increases net income",
      B: "COGS under LIFO is $160,000; LIFO allocates the oldest, lowest-cost layers to COGS first, resulting in lower expense and higher reported income during inflation",
      C: "COGS under LIFO is $192,000; LIFO assigns the most recent, highest-cost purchases to COGS, which is $26,000 more than FIFO's $166,000 COGS",
      D: "COGS under LIFO is $176,000; the $10,000 difference between LIFO and FIFO layers reduces taxable income under LIFO, deferring the inflation impact to a future period when inventory is liquidated"
    },
    CorrectChoice: "D",
    ExplanationWrongA: "Option A correctly states the LIFO COGS of $176,000 and the $10,000 layer difference, but incorrectly describes the difference as an inventory holding gain. The layer difference represents an inflation premium embedded in COGS that reduces taxable income, not a gain.",
    ExplanationWrongB: "Option B incorrectly states LIFO COGS as $160,000 and describes LIFO as allocating oldest costs first. LIFO assigns the most recent (highest during inflation) costs to COGS, which is the opposite of FIFO's treatment.",
    ExplanationWrongC: "Option C incorrectly states LIFO COGS as $192,000. LIFO COGS = 8,000 x $22 = $176,000, not $192,000.",
    ExplanationWrongD: "",
    ExplanationCorrect: "Under LIFO, the most recent costs are assigned to COGS first. Summit sold 8,000 units, all from the $22 purchase layer: COGS = 8,000 x $22 = $176,000. Under FIFO, COGS would be 5,000 x $20 + 3,000 x $22 = $166,000. The $10,000 difference represents the inflation premium embedded in the LIFO cost layers. LIFO's higher COGS reduces current taxable income, effectively deferring the tax impact of inflation to future periods.",
    Difficulty: "Very Difficult", DifficultyScore: 5, CognitiveLevel: "Analyze", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "LIFO COGS = Most Recent Units x Most Recent Cost",
    Authorities: ["ASC 330 - Inventory", "IAS 2 - Inventories"],
    VerifiedChecks: ["LIFO COGS correctly computed as $176,000", "FIFO COGS correctly computed as $166,000", "Inflation premium impact correctly analyzed"],
    source_ids: ["FA-04"], source_support_for_key: {
      source_id: "FA-04",
      rule_or_proposition: "Inventory Turnover = COGS / Average Inventory. LIFO assigns the most recent (highest during inflation) costs to COGS first, creating a $10,000 inflation premium over FIFO that reduces taxable income.",
      application_to_facts: "Summit's LIFO COGS of $176,000 (8,000 x $22) exceeds FIFO COGS of $166,000 by $10,000, deferring the inflation tax impact until inventory liquidation.",
      key_contribution: "Quantifies the LIFO-FIFO cost difference during inflation and its tax deferral implications."
    },
    distractor_intent: {
      A: { misconception: "Correct COGS but mischaracterizes the layer difference as a holding gain instead of an inflation premium", why_plausible: "Correctly identifies the $10,000 difference but misinterprets its accounting treatment", tier_candidate: 2 },
      B: { misconception: "Incorrectly uses oldest costs for LIFO (describes FIFO treatment instead)", why_plausible: "Reverses the LIFO cost flow assumption — LIFO uses most recent costs, not oldest", tier_candidate: 2 },
      C: { misconception: "Incorrectly computes LIFO COGS as $192,000 instead of $176,000", why_plausible: "Arithmetic error in applying the LIFO cost flow", tier_candidate: 1 }
    },
    uniqueness_note: "Tests LIFO inventory layer measurement and its interaction with inflation-driven cost differences.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Hyperinflation financial statement presentation",
    QuestionID: "P2-A-590", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-590-hyperinflation-presentation",
    Stem: "Meridian Industries operates in a hyperinflationary economy where cumulative inflation has exceeded 100% over three years. Under IAS 29, which financial statement component is restated using a general price index to reflect the loss of purchasing power?",
    Choices: {
      A: "Long-term debt - monetary liability restated to reflect the decreased real value using the general price index",
      B: "Common stock - equity component restated to reflect the change in purchasing power since issuance",
      C: "Property, plant and equipment - nonmonetary asset restated from historical cost using the general price index ratio to reflect current purchasing power",
      D: "Retained earnings - directly restated using the price index to incorporate cumulative inflation effects"
    },
    CorrectChoice: "C",
    ExplanationWrongA: "Option A incorrectly states that long-term debt is restated. Long-term debt is a monetary liability whose nominal value is fixed by contract and is not restated under IAS 29.",
    ExplanationWrongB: "Option B incorrectly states that common stock is restated. Common stock is a monetary equity component representing fixed nominal claims and is not restated.",
    ExplanationWrongC: "",
    ExplanationWrongD: "Option D incorrectly states that retained earnings is directly restated. Retained earnings is computed as a residual after restating all assets and liabilities, not directly adjusted using the price index.",
    ExplanationCorrect: "Under IAS 29, nonmonetary items are restated using a general price index to reflect the effects of inflation. Property, plant and equipment is a nonmonetary asset whose historical cost becomes increasingly irrelevant as prices change. Monetary items like long-term debt and common stock are not restated because they are already expressed in current purchasing power terms.",
    Difficulty: "Difficult", DifficultyScore: 4, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Restated Value = Historical Cost x (Current CPI / Historical CPI)",
    Authorities: ["IAS 29 - Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["Nonmonetary item correctly identified as PPE", "Monetary items correctly excluded from restatement", "IAS 29 restatement rules accurately applied"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "Restated Value = Historical Cost x (Current CPI / Historical CPI). IAS 29 requires nonmonetary items like PPE to be restated using the general price index, while monetary items are not restated.",
      application_to_facts: "Meridian's PPE is a nonmonetary asset requiring restatement. Long-term debt and common stock are monetary and not restated. Retained earnings is a residual, not directly restated.",
      key_contribution: "Identifies which financial statement components require IAS 29 restatement and which do not."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly claims monetary liability (long-term debt) is restated under IAS 29", why_plausible: "Confuses monetary items (fixed in nominal terms) with nonmonetary items (requiring restatement)", tier_candidate: 2 },
      B: { misconception: "Incorrectly claims equity (common stock) is restated under IAS 29", why_plausible: "Common stock represents fixed nominal claims and is monetary, not restated", tier_candidate: 2 },
      D: { misconception: "Incorrectly claims retained earnings is directly restated using the price index", why_plausible: "Retained earnings is a derived residual figure, not directly restated — candidates may not understand the mechanics", tier_candidate: 1 }
    },
    uniqueness_note: "Tests identification of which financial statement components require IAS 29 restatement.", source_status: "RESOLVED", hold_reason: ""
  }
];

module.exports = pack_p2_a_batch6_questions;
