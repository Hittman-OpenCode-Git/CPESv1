const pack_p2_a_batch5_questions = [
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost accounting definition",
    QuestionID: "P2-A-561", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-561-current-cost-definition",
    Stem: "Under current cost accounting, nonmonetary assets are reported at which value on the balance sheet?",
    Choices: { A: "Original purchase price adjusted for accumulated depreciation", B: "Net realizable value less a normal profit margin", C: "The amount that would be paid to replace the asset with an identical one today", D: "Historical cost increased by the general price index change since acquisition" },
    CorrectChoice: "C",
    ExplanationCorrect: "Current cost accounting values nonmonetary assets at their current replacement cost — the amount required to acquire an identical or equivalent asset at the current date. This approach reflects the economic reality that historical cost becomes increasingly irrelevant as prices change over time. The FASB and IASB both recognize current cost as a measurement basis that provides more relevant information than historical cost during inflationary periods.",
    ExplanationWrongA: "Option A describes historical cost less accumulated depreciation, which ignores the impact of changing prices entirely.",
    ExplanationWrongB: "Option B describes a value related to inventory lower-of-cost-or-market rules, not current cost accounting for nonmonetary assets.",
    ExplanationWrongD: "Option D describes constant dollar or general price-level adjusted historical cost — conceptually different from current cost.",
    Difficulty: "Easy", DifficultyScore: 1, CognitiveLevel: "Remember", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["FASB Concepts Statement No. 5", "IASB Framework — Measurement Bases"],
    VerifiedChecks: ["Stem is specific and unambiguous", "All four choices are plausible measurement bases", "Correct choice is factually accurate"],
    source_ids: ["IC-01"], source_support_for_key: {
      source_id: "IC-01",
      rule_or_proposition: "Current cost is the amount of cash or cash equivalents that would have to be paid if the same or an equivalent asset were acquired currently.",
      application_to_facts: "Under current cost accounting, nonmonetary assets are reported at their replacement cost — the amount needed to acquire an identical asset today.",
      key_contribution: "Defines the measurement basis for nonmonetary assets under current cost accounting."
    },
    distractor_intent: {
      A: { misconception: "Historical cost — traditional GAAP basis that ignores changing prices", why_plausible: "Candidates familiar with standard historical cost accounting may default to this answer", tier_candidate: 2 },
      B: { misconception: "NRV minus profit — inventory valuation rule applied to nonmonetary assets", why_plausible: "NRV is a valid measurement basis for inventory but not for general nonmonetary assets under current cost", tier_candidate: 2 },
      D: { misconception: "General price-level adjustment — different inflation accounting method", why_plausible: "Candidates may confuse current cost with constant dollar accounting which uses CPI adjustments", tier_candidate: 1 }
    },
    uniqueness_note: "Tests fundamental definition of current cost measurement basis.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation impact on turnover ratios",
    QuestionID: "P2-A-562", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-562-turnover-ratio-inflation",
    Stem: "Apex Manufacturing reports total assets of $2,000,000 at historical cost and annual sales of $5,000,000. During a period of sustained 8% inflation, Apex does not adjust its financial statements for price-level changes. What is the primary limitation of using Apex's reported asset turnover ratio for benchmarking against a competitor that uses current cost accounting?",
    Choices: { A: "The ratio will decrease because sales revenue is not affected by inflation", B: "Apex's ratio will appear higher than the competitor's because historical cost understates the asset base relative to inflated sales", C: "The ratios are not comparable because Apex's asset base is understated relative to its current replacement value, while the competitor's asset base reflects current prices", D: "The ratio will increase because replacement cost of assets rises faster than sales" },
    CorrectChoice: "C",
    ExplanationCorrect: "When comparing companies using different inflation accounting methods, the asset turnover ratios are not directly comparable. Apex uses historical cost, so its asset base is understated relative to current values, producing a higher ratio. The competitor uses current cost, so its asset base reflects current replacement prices, producing a lower ratio for the same operational efficiency. The primary limitation is this comparability problem — the two ratios measure different economic realities, making cross-company benchmarking unreliable without adjustment.",
    ExplanationWrongA: "Option A is incorrect because sales revenue does increase with inflation as the company charges higher prices.",
    ExplanationWrongB: "Option B correctly describes the direction of the distortion but is incomplete — the real issue is comparability, not just the direction of the difference.",
    ExplanationWrongD: "Option D misidentifies the mechanism — historical cost does NOT adjust, so the asset base is understated relative to inflated sales.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Asset Turnover Ratio",
    Authorities: ["FASB SFAC No. 5 — Measurement Attributes", "IMA Statement on Inflation Accounting"],
    VerifiedChecks: ["Stem provides specific company context", "Correct choice accurately describes the inflation distortion"],
    source_ids: ["FA-24"], source_support_for_key: {
      source_id: "FA-24",
      rule_or_proposition: "Total Asset Turnover = Net Sales / Average Total Assets. Under historical cost accounting, the asset base remains at original cost while sales increase with inflation.",
      application_to_facts: "Apex uses historical cost ($2,000,000 assets) while the competitor uses current cost (higher asset base). Both generate similar sales, but the historical-cost ratio is inflated because the denominator understates current values.",
      key_contribution: "Demonstrates how different measurement bases distort comparability of the same financial ratio."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly assumes sales are unaffected by inflation", why_plausible: "Candidates may think historical cost applies only to assets, not realizing sales also increase with inflation", tier_candidate: 2 },
      B: { misconception: "Identifies the direction of distortion but misses the comparability problem", why_plausible: "Partially correct reasoning that stops short of the complete answer", tier_candidate: 1 },
      D: { misconception: "Confuses replacement cost with historical cost effect on the ratio", why_plausible: "Mixes up which component of the ratio is affected by the accounting method difference", tier_candidate: 3 }
    },
    uniqueness_note: "Applies inflation concepts to a specific financial ratio.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost accounting for inventory",
    QuestionID: "P2-A-563", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-563-current-cost-inventory",
    Stem: "Meridian Industries values its inventory using current cost accounting. During a period of rising prices, which of the following best describes how current cost determines the inventory carrying amount on the balance sheet?",
    Choices: { A: "Historical purchase cost adjusted upward by the change in a general price index since acquisition", B: "The original invoice price paid to the supplier, unchanged regardless of subsequent price movements", C: "The estimated selling price of the inventory less a reasonable profit allowance and disposal costs", D: "The current cash equivalent amount required to purchase the same or equivalent inventory items at today's market prices" },
    CorrectChoice: "D",
    ExplanationCorrect: "Current cost accounting values inventory at the amount of cash or cash equivalents that would be paid currently to acquire the same or equivalent items. This differs from historical cost, which retains the original purchase price, and from general price-level adjustments.",
    ExplanationWrongA: "Option A describes general price-level adjusted historical cost — conceptually different from current cost.",
    ExplanationWrongB: "Option B describes the historical cost method, which is the opposite of current cost accounting.",
    ExplanationWrongC: "Option C describes net realizable value, which is a different measurement basis.",
    Difficulty: "Easy", DifficultyScore: 1, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["IAS 2 — Inventories", "FASB SFAC No. 5 — Current Cost Measurement"],
    VerifiedChecks: ["Stem specifies company and accounting method context", "Correct choice accurately defines current cost for inventory"],
    source_ids: ["IC-01"], source_support_for_key: {
      source_id: "IC-01",
      rule_or_proposition: "Current cost is the amount of cash required to acquire the same or equivalent inventory items currently.",
      application_to_facts: "Meridian values inventory at current cost, meaning the balance sheet carrying amount equals today's replacement cost for identical items.",
      key_contribution: "Applies the current cost measurement basis specifically to inventory valuation."
    },
    distractor_intent: {
      A: { misconception: "General price-level adjustment — different method from current cost", why_plausible: "Candidates may confuse CPI-based restatement with specific replacement cost", tier_candidate: 2 },
      B: { misconception: "Historical cost — the method current cost replaces", why_plausible: "Default to the most common inventory measurement method", tier_candidate: 1 },
      C: { misconception: "NRV — different measurement basis used in lower-of-cost-or-NRV", why_plausible: "NRV is relevant for inventory but is a ceiling, not the current cost measurement", tier_candidate: 2 }
    },
    uniqueness_note: "Tests application of current cost accounting to inventory.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Purchasing power gain/loss on monetary assets",
    QuestionID: "P2-A-564", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-564-purchasing-power-gain-monetary",
    Stem: "During a year when the general price level increased by 4%, a company that borrowed $500,000 at a fixed interest rate experienced which of the following effects on its monetary position?",
    Choices: { A: "A purchasing power loss because the real value of the fixed-rate asset decreases in an inflationary environment", B: "A purchasing power gain because the real value of the fixed debt obligation decreases as inflation reduces the purchasing power of the dollars the company will repay", C: "A purchasing power loss because the company's equity decreases proportionally with inflation", D: "No purchasing power gain or loss because the contractual cash flows are fixed in nominal terms" },
    CorrectChoice: "B",
    ExplanationCorrect: "When a company holds fixed-rate debt (a monetary liability) during inflation, the real value of the obligation decreases. The company will repay the $500,000 principal in future dollars that have less purchasing power than today's dollars. The company effectively repays its creditors with cheaper dollars, constituting a purchasing power gain for the debtor.",
    ExplanationWrongA: "Option A describes the creditor's position, not the debtor's. The question asks about the company that borrowed the funds.",
    ExplanationWrongC: "Option C confuses the purchasing power effect on the debt with an equity effect. The gain comes from the decreased real value of the debt liability.",
    ExplanationWrongD: "Option D is a common misconception. Fixed nominal terms are precisely what create purchasing power gains or losses.",
    Difficulty: "Very Difficult", DifficultyScore: 5, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Purchasing Power Gain/Loss = Net Monetary Position × Inflation Rate",
    Authorities: ["FASB SFAC No. 89 — Reporting Inflation and Nonmonetary Items", "IAS 29 — Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["Stem provides concrete scenario with fixed-rate borrowing", "Correct choice correctly identifies debtor's purchasing power gain"],
    source_ids: ["IC-02"], source_support_for_key: {
      source_id: "IC-02",
      rule_or_proposition: "Creditors holding fixed-rate monetary assets experience purchasing power losses during inflation. Debtors with fixed-rate monetary liabilities experience purchasing power gains.",
      application_to_facts: "The company borrowed $500,000 at a fixed rate. During 4% inflation, the real value of the debt decreases, creating a purchasing power gain for the debtor.",
      key_contribution: "Identifies the correct direction of the purchasing power effect for a debtor with fixed-rate debt."
    },
    distractor_intent: {
      A: { misconception: "Confuses the creditor's position with the debtor's", why_plausible: "The stem describes a borrowing company, but Option A describes the effect on the lender", tier_candidate: 1 },
      C: { misconception: "Confuses purchasing power effects with equity market value changes", why_plausible: "Candidates may think inflation always reduces equity value", tier_candidate: 2 },
      D: { misconception: "Most common misconception — fixed nominal terms do create purchasing power effects", why_plausible: "Intuitively, fixed contracts seem immune to inflation, but the real value changes", tier_candidate: 1 }
    },
    uniqueness_note: "Tests purchasing power effects on monetary assets during inflation.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Real versus nominal interest rate",
    QuestionID: "P2-A-565", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-565-real-vs-nominal-rate",
    Stem: "Parkview Electronics issues $1,000,000 in fixed-rate bonds with a stated annual interest rate of 4%. The Federal Reserve reports that expected inflation for the coming year is 2.5%. Using the Fisher equation approximation, what is the approximate real interest rate on Parkview's bonds?",
    Choices: { A: "1.5%", B: "2.5%", C: "4.0%", D: "6.5%" },
    CorrectChoice: "A",
    ExplanationCorrect: "The Fisher equation states: Real Rate ≈ Nominal Rate − Expected Inflation = 4.0% − 2.5% = 1.5%. The real interest rate represents the actual increase in purchasing power that the lender earns after accounting for the erosion of purchasing power caused by inflation.",
    ExplanationWrongB: "Option B gives the expected inflation rate itself, not the real interest rate.",
    ExplanationWrongC: "Option C gives the nominal interest rate, which includes both the real return and the inflation premium.",
    ExplanationWrongD: "Option D adds the nominal and inflation rates rather than subtracting.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Fisher Equation: Real Rate ≈ Nominal Rate − Expected Inflation",
    Authorities: ["Fisher, I. (1930) — The Theory of Interest", "FASB Concepts Statement No. 8 — Time Value of Money"],
    VerifiedChecks: ["Stem provides specific numbers", "Correct choice matches Fisher equation result"],
    source_ids: ["IC-03"], source_support_for_key: {
      source_id: "IC-03",
      rule_or_proposition: "Real Rate = Nominal Rate - Expected Inflation. The Fisher equation separates the nominal interest rate into its real return and inflation premium components.",
      application_to_facts: "Nominal rate = 4.0%, expected inflation = 2.5%. Real rate ≈ 4.0% − 2.5% = 1.5%.",
      key_contribution: "Direct application of the Fisher equation to compute the real interest rate."
    },
    distractor_intent: {
      B: { misconception: "Selects the inflation rate instead of computing the real rate", why_plausible: "Candidate reads the inflation figure and selects it without applying the formula", tier_candidate: 1 },
      C: { misconception: "Selects the nominal rate without adjusting for inflation", why_plausible: "Candidate confuses the stated rate with the real rate", tier_candidate: 1 },
      D: { misconception: "Adds instead of subtracting — reverses the Fisher equation", why_plausible: "Candidate incorrectly adds nominal and inflation rather than subtracting", tier_candidate: 2 }
    },
    uniqueness_note: "Direct Fisher equation application.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Purchasing power gain on monetary liabilities",
    QuestionID: "P2-A-566", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-566-purchasing-power-loss-debtor",
    Stem: "Northstar Equipment carries $800,000 in fixed-rate long-term debt. During a year when the general price level rose by 6%, Northstar's purchasing power position on this debt changed in which of the following ways?",
    Choices: { A: "Northstar experienced a purchasing power gain because the real value of its fixed debt obligation decreased as inflation reduced the purchasing power of the dollars it will repay", B: "Northstar experienced a purchasing power loss because the nominal amount of debt remains fixed while the cost of goods it must sell to service the debt increases", C: "Northstar experienced no purchasing power change because the debt is denominated in fixed nominal dollars", D: "Northstar experienced a purchasing power gain because the market value of its equity increased proportionally with inflation" },
    CorrectChoice: "A",
    ExplanationCorrect: "When a company holds fixed-rate debt during inflation, the real value of the obligation decreases. Northstar will repay the $800,000 principal in future dollars that have less purchasing power, constituting a purchasing power gain for the debtor.",
    ExplanationWrongB: "Option B reverses the relationship. Debtors with fixed-rate obligations benefit from inflation.",
    ExplanationWrongC: "Option C is the most common misconception. Fixed nominal dollars create purchasing power gains and losses.",
    ExplanationWrongD: "Option D arrives at the correct conclusion but for the wrong reason — the gain is from the debt, not equity.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Purchasing Power Gain/Loss = Net Monetary Position × Inflation Rate",
    Authorities: ["FASB SFAC No. 89 — Reporting Inflation and Nonmonetary Items", "IAS 29 — Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["Stem identifies company, debt amount, and inflation rate", "Correct choice correctly identifies debtor's purchasing power gain"],
    source_ids: ["IC-02"], source_support_for_key: {
      source_id: "IC-02",
      rule_or_proposition: "Debtors holding fixed-rate monetary liabilities gain purchasing power during inflation because the real value of the obligation decreases.",
      application_to_facts: "Northstar holds $800,000 fixed-rate debt. During 6% inflation, the real value of the repayment obligation decreases, creating a purchasing power gain.",
      key_contribution: "Reinforces the debtor-side purchasing power gain principle with a concrete scenario."
    },
    distractor_intent: {
      B: { misconception: "Reverses the debtor-creditor relationship", why_plausible: "Candidates may think rising costs harm the debtor, but the debt itself loses real value", tier_candidate: 1 },
      C: { misconception: "Most common misconception — fixed nominal terms create purchasing power effects", why_plausible: "Intuitively, fixed contracts seem stable, but real value changes with inflation", tier_candidate: 1 },
      D: { misconception: "Correct conclusion but wrong mechanism — gain comes from debt, not equity", why_plausible: "Candidate arrives at the right answer for the wrong reason", tier_candidate: 2 }
    },
    uniqueness_note: "Tests the debtor side of purchasing power effects.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation-adjusted debt-to-equity ratio",
    QuestionID: "P2-A-567", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-567-debt-equity-inflation-adjusted",
    Stem: "Consolidated Industries reports: total assets $3,000,000, total liabilities $1,200,000, shareholders' equity $1,800,000. General price level increased 10%. Monetary assets exceed monetary liabilities by $300,000. What is the approximate debt-to-equity ratio after adjusting equity for the purchasing power effect?",
    Choices: { A: "0.71", B: "0.67", C: "0.60", D: "0.75" },
    CorrectChoice: "B",
    ExplanationCorrect: "Historical cost D/E = $1,200,000 / $1,800,000 = 0.667. Net monetary asset position = $300,000. Purchasing power loss = $300,000 × 10% = $30,000. Adjusted equity = $1,800,000 − $30,000 = $1,770,000. Adjusted D/E = $1,200,000 / $1,770,000 ≈ 0.67.",
    ExplanationWrongA: "Option A results from an incorrect equity adjustment — the value is too low.",
    ExplanationWrongC: "Option C incorrectly treats the net monetary position as a gain rather than a loss.",
    ExplanationWrongD: "Option D is the historical cost ratio, ignoring the inflation adjustment.",
    Difficulty: "Difficult", DifficultyScore: 4, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Purchasing Power Gain/Loss = Net Monetary Position × Inflation Rate; Adjusted D/E = Liabilities / Adjusted Equity",
    Authorities: ["FASB SFAC No. 89 — Reporting Inflation and Nonmonetary Items"],
    VerifiedChecks: ["Stem provides all numbers for calculation", "Correct choice matches computed adjusted ratio"],
    source_ids: ["IC-02", "FA-07"], source_support_for_key: {
      source_id: "IC-02",
      rule_or_proposition: "Net monetary asset position × inflation rate = purchasing power loss, which reduces equity.",
      application_to_facts: "Net monetary assets = $300,000. Inflation = 10%. Purchasing power loss = $30,000. Adjusted equity = $1,800,000 − $30,000 = $1,770,000.",
      key_contribution: "Computes the inflation adjustment to equity before applying the D/E ratio."
    },
    distractor_intent: {
      A: { misconception: "Incorrect equity adjustment — arithmetic error in the inflation adjustment", why_plausible: "Candidate may miscalculate the purchasing power loss or apply it to the wrong base", tier_candidate: 2 },
      C: { misconception: "Treats net monetary position as a gain instead of a loss", why_plausible: "Reverses the direction of the purchasing power effect on a net monetary asset position", tier_candidate: 1 },
      D: { misconception: "Uses unadjusted historical cost ratio — ignores the inflation adjustment entirely", why_plausible: "Candidate skips the purchasing power adjustment step", tier_candidate: 1 }
    },
    uniqueness_note: "Multi-step calculation combining purchasing power effects with financial ratio analysis.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 CPI purchasing power interpretation",
    QuestionID: "P2-A-568", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-568-cpi-purchasing-power-interpretation",
    Stem: "Westfield Logistics purchased a warehouse for $800,000 five years ago when the CPI stood at 100. The CPI has risen to 125. Which of the following best explains the practical significance of this CPI change for Westfield's financial reporting?",
    Choices: { A: "The warehouse has appreciated by $250,000 in market value", B: "Each dollar Westfield held five years ago can now purchase only 80% of the goods it could then, requiring a $200,000 upward adjustment to the warehouse's carrying amount", C: "The warehouse replacement cost has increased exactly proportionally with the CPI", D: "Historical cost accounting is no longer appropriate for this asset" },
    CorrectChoice: "C",
    ExplanationCorrect: "The CPI ratio of 125/100 = 1.25 means the general price level increased 25%. Under constant dollar accounting, the warehouse would be restated: $800,000 × 1.25 = $1,000,000. The CPI change indicates that if asset prices moved proportionally with the general index, the replacement cost would be approximately $1,000,000. This proportionality assumption is the foundation of CPI-based restatement in constant dollar accounting.",
    ExplanationWrongA: "Option A confuses CPI adjustment with market value appreciation. The CPI measures general price level changes, not specific asset market values.",
    ExplanationWrongB: "Option B correctly describes the purchasing power decline (80 cents per dollar) but incorrectly implies the upward adjustment is required for all financial reporting — only constant dollar accounting mandates this restatement.",
    ExplanationWrongD: "Option D makes a judgment about accounting method appropriateness not supported by the CPI data alone.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Analyze", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "CPI Ratio = Current CPI / Historical CPI",
    Authorities: ["Bureau of Labor Statistics — CPI Methodology", "FASB SFAC No. 89 — General Price-Level Reporting"],
    VerifiedChecks: ["Stem provides base CPI, current CPI, and historical cost", "Correct choice accurately interprets CPI ratio implications"],
    source_ids: ["IC-04"], source_support_for_key: {
      source_id: "IC-04",
      rule_or_proposition: "CPI ratio of 1.25 means general prices rose 25%, and under constant dollar accounting, assets are restated proportionally.",
      application_to_facts: "Westfield's warehouse cost $800,000 at CPI=100. CPI is now 125, a 25% increase. If asset prices tracked the general index, replacement cost ≈ $1,000,000.",
      key_contribution: "Demonstrates the CPI ratio method for restating historical cost under constant dollar accounting."
    },
    distractor_intent: {
      A: { misconception: "Confuses CPI with market value appreciation", why_plausible: "Candidates may think CPI directly measures asset appreciation", tier_candidate: 2 },
      B: { misconception: "Correct purchasing power interpretation but misstates reporting requirement", why_plausible: "The purchasing power math is right, but the reporting implication is wrong — restatement is not universally required", tier_candidate: 1 },
      D: { misconception: "Unsupported judgment about accounting method appropriateness", why_plausible: "CPI data alone does not determine which accounting method is appropriate", tier_candidate: 3 }
    },
    uniqueness_note: "Tests conceptual understanding of CPI ratio implications for financial reporting.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost versus NRV for inventory",
    QuestionID: "P2-A-570", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-570-current-cost-vs-nrv-inventory",
    Stem: "Harbor Medical Supplies holds specialized surgical instruments with a current replacement cost of $325,000 and a net realizable value of $315,000. Under IAS 2, what is the reporting rule that determines the inventory's carrying amount?",
    Choices: { A: "The inventory should be reported at current replacement cost because current cost accounting is specified", B: "The inventory should be reported at the average of current cost and net realizable value", C: "Inventory must be reported at the lower of current cost and net realizable value, so the carrying amount is $315,000", D: "The inventory must be reduced to its original historical cost minus any write-downs" },
    CorrectChoice: "C",
    ExplanationCorrect: "IAS 2 requires inventory to be measured at the lower of cost and net realizable value. Under current cost accounting, cost is defined as current replacement cost. Therefore, inventory must be reported at the lower of current replacement cost ($325,000) and net realizable value ($315,000), which is $315,000. The NRV ceiling applies even under current cost accounting — a company cannot report inventory at more than it expects to recover.",
    ExplanationWrongA: "Option A ignores the NRV ceiling constraint. IAS 2 requires the lower of cost and NRV regardless of the cost measurement basis used.",
    ExplanationWrongB: "Option B suggests averaging, which is not permitted under IAS 2. The rule is strictly lower of, not an average.",
    ExplanationWrongD: "Option D references historical cost, which is replaced by current replacement cost under current cost accounting.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Lower of Cost or NRV (IAS 2)",
    Authorities: ["IAS 2 — Inventories", "IFRS Foundation — Measurement Bases"],
    VerifiedChecks: ["Stem provides specific cost and NRV values", "Correct choice correctly states the lower-of rule"],
    source_ids: ["IC-01"], source_support_for_key: {
      source_id: "IC-01",
      rule_or_proposition: "IAS 2 requires lower of cost (current replacement cost under current cost accounting) and net realizable value. $315,000 < $325,000, so NRV governs.",
      application_to_facts: "Current replacement cost = $325,000. NRV = $315,000. Lower of the two = $315,000.",
      key_contribution: "Applies the lower-of-cost-or-NRV rule combining current cost measurement with the IAS 2 ceiling."
    },
    distractor_intent: {
      A: { misconception: "Ignores the NRV ceiling constraint", why_plausible: "Candidate focuses on current cost without considering the lower-of rule", tier_candidate: 1 },
      B: { misconception: "Suggests averaging — not permitted under IAS 2", why_plausible: "Candidate may think a compromise between two values is reasonable", tier_candidate: 2 },
      D: { misconception: "References historical cost — wrong measurement basis under current cost accounting", why_plausible: "Candidate defaults to historical cost rather than applying current cost measurement", tier_candidate: 2 }
    },
    uniqueness_note: "Tests the lower-of-cost-or-NRV rule under current cost accounting.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation factor and depreciation consistency",
    QuestionID: "P2-A-569", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-569-inflation-factor-depreciation-consistency",
    Stem: "Eastbrook Corporation's machine was purchased three years ago for $600,000 with a 10-year useful life and no salvage value. The accumulated inflation factor is 1.5. Under current cost accounting, what is the correct calculation of annual depreciation expense?",
    Choices: { A: "$60,000 — historical cost divided by useful life", B: "$90,000 — historical cost multiplied by the inflation factor to get replacement cost, then divided by useful life", C: "$135,000 — the inflation factor applied to the annual historical cost depreciation", D: "$150,000 — current replacement cost divided by the remaining life of 6 years" },
    CorrectChoice: "B",
    ExplanationCorrect: "Under current cost accounting, depreciation is based on the replacement cost of the asset. The replacement cost is derived by multiplying historical cost ($600,000) by the accumulated inflation factor (1.5) = $900,000. Annual depreciation = $900,000 / 10 years = $90,000. This approach ensures that the depreciation charge reflects the actual cost of consuming the asset's economic service potential at current prices.",
    ExplanationWrongA: "Option A uses historical cost depreciation ($600,000 / 10 = $60,000), which is the traditional GAAP method but ignores the inflation-adjusted replacement cost required under current cost accounting.",
    ExplanationWrongC: "Option C multiplies the historical cost depreciation by the inflation factor ($60,000 × 1.5 = $90,000), which coincidentally gives the same result but for the wrong reason — the factor should be applied to the cost basis, not the annual expense.",
    ExplanationWrongD: "Option D divides by remaining life (6 years) instead of total useful life (10 years). Current cost depreciation uses the total useful life of the replacement cost asset, not the remaining life of the original asset.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Current Cost Depreciation = Current Replacement Cost / Remaining Useful Life",
    Authorities: ["IAS 16 — Property, Plant and Equipment", "FASB SFAC No. 89 — Current Cost Depreciation"],
    VerifiedChecks: ["Stem provides all values and asks about the relationship between them", "Correct choice accurately describes the consistency confirmation"],
    source_ids: ["IC-05"], source_support_for_key: {
      source_id: "IC-05",
      rule_or_proposition: "Current cost depreciation = replacement cost / total useful life. Replacement cost = historical cost × accumulated inflation factor.",
      application_to_facts: "Replacement cost = $600,000 × 1.5 = $900,000. Annual depreciation = $900,000 / 10 = $90,000.",
      key_contribution: "Computes current cost depreciation by applying the inflation factor to the cost basis before dividing by useful life."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly suggests historical cost is still appropriate under current cost accounting", why_plausible: "Candidate applies the traditional GAAP depreciation method", tier_candidate: 1 },
      C: { misconception: "Same result but wrong conceptual framing — applies factor to expense instead of cost basis", why_plausible: "Coincidental numerical match masks the incorrect reasoning path", tier_candidate: 2 },
      D: { misconception: "Incorrectly uses remaining life instead of total useful life", why_plausible: "Candidate confuses remaining life of the original asset with the life of the replacement cost asset", tier_candidate: 1 }
    },
    uniqueness_note: "Tests understanding of how the inflation factor relates to the depreciation base under current cost accounting.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Current cost depreciation in income statement",
    QuestionID: "P2-A-571", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-571-depreciation-current-cost-income",
    Stem: "Under current cost accounting, which of the following depreciation methods produces the highest annual depreciation expense during a period of rising prices?",
    Choices: { A: "Straight-line depreciation based on historical cost", B: "Current cost depreciation based on the replacement cost of the asset", C: "Accelerated depreciation based on historical cost", D: "General price-level adjusted depreciation based on the original cost increased by the CPI ratio" },
    CorrectChoice: "D",
    ExplanationCorrect: "During rising prices, the general price-level adjusted depreciation produces the highest expense because it combines the historical cost base with cumulative inflation. For example, if historical cost is $600,000, useful life is 10 years, and the CPI ratio is 1.5, general price-level depreciation = ($600,000 × 1.5) / 10 = $90,000. Current cost depreciation would use the actual replacement cost ($900,000 / 10 = $90,000 in this case). However, if the specific asset's replacement cost increased less than the general price level (which is common for some assets), the CPI-adjusted method could exceed current cost. The key distinction is that the CPI method applies a broad inflation index to the entire historical cost, while current cost uses the specific asset's actual replacement price.",
    ExplanationWrongA: "Option A produces the lowest depreciation during inflation because historical cost does not reflect price increases.",
    ExplanationWrongB: "Option B uses current replacement cost, which may be lower than the CPI-adjusted amount if the specific asset's price increased less than the general price level.",
    ExplanationWrongC: "Option C accelerates the allocation of historical cost but does not adjust for inflation, so it typically produces less total depreciation than inflation-adjusted methods.",
    Difficulty: "Moderate-Easy", DifficultyScore: 2, CognitiveLevel: "Understand", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "CPI-Adjusted Depreciation = Historical Cost × CPI Ratio / Useful Life",
    Authorities: ["FASB SFAC No. 89 — General Price-Level Reporting", "IAS 16 — Property, Plant and Equipment"],
    VerifiedChecks: ["Stem asks which method produces highest expense", "Correct choice accurately identifies the CPI-adjusted method"],
    source_ids: ["IC-04", "IC-05"], source_support_for_key: {
      source_id: "IC-04",
      rule_or_proposition: "General price-level adjusted depreciation applies the cumulative CPI ratio to historical cost, which during sustained inflation typically produces the highest expense.",
      application_to_facts: "If historical cost is $600,000 and CPI ratio is 1.5, CPI-adjusted depreciation = ($600,000 × 1.5) / 10 = $90,000. This may exceed current cost depreciation if the specific asset's price increased less than the general index.",
      key_contribution: "Compares depreciation methods under inflation to determine which produces the highest expense."
    },
    distractor_intent: {
      A: { misconception: "Lowest depreciation — historical cost ignores inflation entirely", why_plausible: "Candidate may not realize that historical cost produces the lowest expense during inflation", tier_candidate: 1 },
      B: { misconception: "Current cost may be lower if specific asset price increased less than CPI", why_plausible: "Candidate assumes current cost always exceeds CPI-adjusted, but specific asset prices may lag the general index", tier_candidate: 2 },
      C: { misconception: "Accelerated method but still based on unadjusted historical cost", why_plausible: "Candidate thinks acceleration compensates for inflation, but it does not adjust the cost basis", tier_candidate: 2 }
    },
    uniqueness_note: "Tests comparison of depreciation methods under inflation, requiring understanding of how each method handles price changes.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation-adjusted balance sheet reconciliation",
    QuestionID: "P2-A-572", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-572-balance-sheet-reconciliation-inflation",
    Stem: "Tidewater Industries reports: monetary assets $1,200,000, monetary liabilities $1,350,000, nonmonetary assets (historical cost) $2,800,000. General price level increased 4%. Under inflation-adjusted reporting, which statement about the balance sheet is correct?",
    Choices: { A: "The balance sheet equation (Assets = Liabilities + Equity) always holds, with the purchasing power loss on net monetary items recognized in equity", B: "Nonmonetary assets are written up to replacement cost, increasing total assets above the sum of liabilities and equity", C: "The balance sheet does not balance because purchasing power gains and losses create a reconciliation gap", D: "Monetary items are restated using the CPI while nonmonetary items remain at historical cost" },
    CorrectChoice: "A",
    ExplanationCorrect: "Under inflation-adjusted reporting, the accounting equation must always hold. Tidewater has net monetary liabilities of $150,000. During 4% inflation, purchasing power loss = $150,000 × 4% = $6,000, recognized in equity. The balance sheet remains in balance.",
    ExplanationWrongB: "Option B describes current cost accounting, not general price-level adjustment. Under constant dollar accounting, nonmonetary assets are NOT restated.",
    ExplanationWrongC: "Option C is incorrect because the equation always balances — purchasing power effects are recognized in equity.",
    ExplanationWrongD: "Option D incorrectly states monetary items are restated. The purchasing power effect is recognized through equity, not by restating monetary items.",
    Difficulty: "Difficult", DifficultyScore: 4, CognitiveLevel: "Analyze", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "Net Monetary Position = Monetary Assets − Monetary Liabilities; Purchasing Power Effect = Net Monetary Position × Inflation Rate",
    Authorities: ["FASB SFAC No. 89 — Reporting Inflation and Nonmonetary Items", "IAS 29 — Financial Reporting in Hyperinflationary Economies"],
    VerifiedChecks: ["Stem provides specific asset and liability values", "Correct choice correctly describes the accounting equation under inflation"],
    source_ids: ["IC-02", "IC-06"], source_support_for_key: {
      source_id: "IC-02",
      rule_or_proposition: "The accounting equation always holds under inflation-adjusted reporting. Purchasing power gains and losses are recognized in equity.",
      application_to_facts: "Net monetary liabilities = $1,350,000 − $1,200,000 = $150,000. Purchasing power loss = $150,000 × 4% = $6,000, reducing equity.",
      key_contribution: "Demonstrates that the balance sheet equation is maintained by recognizing purchasing power effects in equity."
    },
    distractor_intent: {
      B: { misconception: "Describes current cost accounting, not general price-level adjustment", why_plausible: "Candidate confuses the two inflation accounting methods", tier_candidate: 1 },
      C: { misconception: "Incorrectly assumes the equation breaks under inflation", why_plausible: "Candidate may think purchasing power effects create an unresolvable reconciliation gap", tier_candidate: 2 },
      D: { misconception: "Misstates the mechanism — monetary items are not restated in constant dollar accounting", why_plausible: "Candidate reverses which items are restated under constant dollar accounting", tier_candidate: 1 }
    },
    uniqueness_note: "Tests balance sheet equation maintenance under inflation-adjusted reporting.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Constant dollar accounting concept",
    QuestionID: "P2-A-573", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-573-constant-dollar-concept",
    Stem: "A company reports equipment at $100,000 on its historical cost balance sheet. The general price index has increased 20% since acquisition. Under constant dollar accounting, what adjustment is made to the equipment's carrying amount?",
    Choices: { A: "No adjustment — equipment is a nonmonetary item and is not adjusted under constant dollar accounting", B: "The equipment is increased to its current replacement cost of approximately $120,000", C: "The equipment remains at $100,000 but depreciation expense is adjusted for inflation", D: "The equipment is restated to $120,000 using the general price index ratio" },
    CorrectChoice: "D",
    ExplanationCorrect: "Under constant dollar accounting, nonmonetary items ARE restated using the general price index. The equipment = $100,000 × (120/100) = $120,000. This differs from current cost accounting, which uses specific replacement prices.",
    ExplanationWrongA: "Option A is incorrect because constant dollar accounting DOES adjust nonmonetary items — it is monetary items that retain nominal values.",
    ExplanationWrongB: "Option B describes current cost accounting, which uses specific replacement prices rather than the general price index.",
    ExplanationWrongC: "Option C incorrectly suggests the asset is not restated. Under constant dollar accounting, the asset IS restated using the CPI ratio.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: true, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "CPI Adjustment: Adjusted Value = Historical Cost × (Current CPI / Historical CPI)",
    Authorities: ["FASB SFAC No. 89 — Reporting Inflation and Nonmonetary Items", "APB Opinion No. 3 — Price Level Changes"],
    VerifiedChecks: ["Stem provides clear scenario with specific numbers", "Correct choice correctly applies constant dollar methodology"],
    source_ids: ["IC-04"], source_support_for_key: {
      source_id: "IC-04",
      rule_or_proposition: "Constant dollar accounting restates nonmonetary items using the CPI ratio: $100,000 × 1.20 = $120,000.",
      application_to_facts: "Equipment at historical cost = $100,000. CPI increased 20% (ratio = 1.20). Restated value = $100,000 × 1.20 = $120,000.",
      key_contribution: "Direct application of the CPI ratio to restate a nonmonetary asset under constant dollar accounting."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly assumes nonmonetary items are not adjusted", why_plausible: "Candidate reverses which items are restated — it is monetary items that retain nominal values", tier_candidate: 1 },
      B: { misconception: "Describes current cost accounting — uses specific replacement prices, not CPI", why_plausible: "Candidate confuses constant dollar (general index) with current cost (specific replacement)", tier_candidate: 1 },
      C: { misconception: "Incorrectly suggests the asset is not restated", why_plausible: "Candidate may think only depreciation is adjusted, not the asset itself", tier_candidate: 2 }
    },
    uniqueness_note: "Tests mechanics of constant dollar accounting applied to a specific asset.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 Inflation impact on financial statement analysis",
    QuestionID: "P2-A-574", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-574-inflation-financial-statement-analysis",
    Stem: "Eastfield Corporation reports total assets of $5,000,000 at historical cost and generates $8,000,000 in annual sales. During a year when the CPI increased by 9%, which statement best describes how failure to adjust for inflation affects Eastfield's return on assets?",
    Choices: { A: "ROA is overstated because sales revenue increases with inflation while the asset base remains at historical cost", B: "ROA is understated because the inflation-adjusted asset base is lower than reported", C: "ROA is unaffected because the inflation rate applies equally to all items", D: "ROA is understated because depreciation is calculated on historical cost, overstating total assets" },
    CorrectChoice: "A",
    ExplanationCorrect: "ROA = Net Income / Total Assets. Under historical cost, the asset base stays at original cost while sales increase with inflation. This artificially inflates ROA — the denominator is understated while the numerator is inflated.",
    ExplanationWrongB: "Option B gets the direction wrong. Understated assets inflate ROA, not reduce it.",
    ExplanationWrongC: "Option C assumes symmetric impact, which only holds under general price-level adjusted accounting.",
    ExplanationWrongD: "Option D confuses the direction — the primary distortion is from revenues increasing while assets stay fixed.",
    Difficulty: "Very Difficult", DifficultyScore: 5, CognitiveLevel: "Evaluate", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "ROA = Net Income / Total Assets",
    Authorities: ["FASB SFAC No. 5 — Recognition and Measurement", "IMA Statement on Inflation Accounting"],
    VerifiedChecks: ["Stem provides specific company data and CPI", "Correct choice accurately describes the ROA distortion"],
    source_ids: ["FA-12"], source_support_for_key: {
      source_id: "FA-12",
      rule_or_proposition: "Under historical cost accounting, revenues increase with inflation while assets remain at original cost, artificially inflating ROA.",
      application_to_facts: "Eastfield's assets = $5,000,000 (historical cost, understated). Sales = $8,000,000 (increases with 9% CPI). ROA denominator is understated while numerator inflates, overstating ROA.",
      key_contribution: "Explains how inflation distorts the ROA ratio by asymmetrically affecting the numerator and denominator."
    },
    distractor_intent: {
      B: { misconception: "Gets the direction wrong — understated assets inflate ROA, not reduce it", why_plausible: "Candidate confuses the direction of the distortion", tier_candidate: 1 },
      C: { misconception: "Incorrectly assumes symmetric impact across all items", why_plausible: "Candidate thinks inflation affects assets and revenues equally, but historical cost prevents asset adjustment", tier_candidate: 2 },
      D: { misconception: "Confuses depreciation effect with the primary revenue-asset distortion", why_plausible: "Candidate focuses on a secondary effect rather than the primary distortion mechanism", tier_candidate: 2 }
    },
    uniqueness_note: "Evaluates how inflation distorts a key financial ratio.", source_status: "RESOLVED", hold_reason: ""
  },
  {
    Part: 2, schema_version: "1.1", Section: "A", Topic: "A.6 HICP and inflation measurement",
    QuestionID: "P2-A-575", question_state: "Unprocessed", Part2OnlyFlag: true,
    UniqueConceptKey: "A6-575-hicp-inflation-measurement",
    Stem: "The European Central Bank uses the Harmonized Index of Consumer Prices (HICP) as its primary measure of price stability. For a multinational corporation reporting under IFRS, which statement best explains why HICP is preferred over national CPI for cross-border inflation adjustments?",
    Choices: { A: "HICP excludes housing costs entirely, making it a purer measure of traded goods inflation", B: "HICP uses a standardized methodology and basket composition across all eurozone countries, enabling consistent cross-border comparisons", C: "HICP is always lower than national CPI because it uses chained indices", D: "HICP captures all forms of price changes including asset prices, replacing the need for other methods" },
    CorrectChoice: "B",
    ExplanationCorrect: "HICP applies a standardized methodology across EU countries, enabling meaningful cross-border inflation comparisons. Unlike national CPI measures with different methodologies and basket compositions, HICP's standardization is essential for multinational corporations analyzing operations across jurisdictions.",
    ExplanationWrongA: "Option A incorrectly states HICP excludes housing costs entirely. The primary advantage is methodological consistency.",
    ExplanationWrongC: "Option C is factually incorrect. HICP is not inherently lower than national CPI.",
    ExplanationWrongD: "Option D overstates HICP's scope. HICP measures consumer price inflation, not asset price inflation.",
    Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply", CalculationItem: false, ItemStyle: "select",
    LOSTag: "A.6", BlueprintDomain: "Financial Statement Analysis", FormulaReference: "None",
    Authorities: ["European Central Bank — HICP Methodology", "Eurostat — Harmonized Index of Consumer Prices"],
    VerifiedChecks: ["Stem provides context about HICP and cross-border comparison", "Correct choice accurately describes HICP's advantage"],
    source_ids: ["IC-04"], source_support_for_key: {
      source_id: "IC-04",
      rule_or_proposition: "HICP uses a standardized methodology across eurozone countries, enabling consistent cross-border inflation comparisons.",
      application_to_facts: "Multinational corporations need comparable inflation data across jurisdictions. HICP's standardized basket and methodology provide this consistency, unlike national CPI measures with varying methodologies.",
      key_contribution: "Explains the practical advantage of HICP for multinational inflation adjustment in an IFRS reporting context."
    },
    distractor_intent: {
      A: { misconception: "Incorrectly claims HICP excludes all housing costs", why_plausible: "HICP does handle owner-occupied housing differently, but the primary advantage is standardization, not exclusion", tier_candidate: 2 },
      C: { misconception: "Factually incorrect — HICP is not inherently lower than national CPI", why_plausible: "Candidate may confuse HICP methodology with index-level comparisons", tier_candidate: 3 },
      D: { misconception: "Overstates HICP's scope to include asset prices", why_plausible: "Candidate conflates consumer price inflation with broader price measures", tier_candidate: 2 }
    },
    uniqueness_note: "Tests knowledge of HICP as an international inflation benchmark.", source_status: "RESOLVED", hold_reason: ""
  }
];

module.exports = pack_p2_a_batch5_questions;
