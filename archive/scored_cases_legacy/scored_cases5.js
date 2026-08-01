// Enhanced 2026-style CMA Part 1 case simulations - Pack 5
// These cases are original study content and are not official IMA or Prometric material.


const ENHANCED_CASE_BASE5 = [
    {
        "CaseID": "CBQ5-B2",
        "Title": "Bonds Payable and Effective Interest Amortization",
        "SectionTags": [
            "A"
        ],
        "Pack": 5,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "Topic": "Bonds",
        "PrimaryCompetency": "Calculation",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "BlueprintObjectives": [
            "Bond payable accounting and amortization"
        ],
        "Confidence": 70,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze bond payable accounting and amortization"
        ],
        "ProductionStatus": "Draft",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "QuestionCount": 5,
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "System Migration",
                "Summary": "Sprint 5.6B — Automated metadata population (Wave 1)"
            }
        ],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "On January 1, Year 1, Granite Corp issued $1,000,000 face value, 8% bonds. The bonds mature in 5 years and pay interest semi-annually on June 30 and December 31. The market (effective) yield at the time of issuance was 10%.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Present Value Factors (5%, 10 periods)",
                "Headers": [
                    "Factor Type",
                    "Value"
                ],
                "Rows": [
                    [
                        "PV of $1",
                        "0.6139"
                    ],
                    [
                        "PV of Ordinary Annuity",
                        "7.7217"
                    ]
                ],
                "ExhibitID": "CBQ5-B2-E1",
                "CaseID": "CBQ5-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "text",
                "Title": "Amortization Policy",
                "Body": "Granite uses the effective interest method for amortizing bond premiums and discounts under US GAAP.",
                "ExhibitID": "CBQ5-B2-E2",
                "CaseID": "CBQ5-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the cash interest payment made every six months.",
                "Correct": 40000,
                "Explanation": "The semiannual cash interest payment is determined by the bonds stated (coupon) rate, not the market yield. The cash payment is fixed by the bond contract: Face value: $1,000,000. Stated rate: 8% annual. Semiannual period: 6/12. Cash interest = $1,000,000 x 8% x (6/12) = $40,000. This $40,000 is paid each June 30 and December 31 regardless of the bonds carrying value. The difference between cash interest paid and interest expense (calculated using the market rate) is the discount or premium amortization under the effective interest method. A common error is to apply the 10% market rate to the face value instead of the 8% stated rate � the market rate drives the interest expense, not the cash payment.",
                "Topic": "Bonds",
                "ItemID": "CBQ5-B2-Q1",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-B2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the issue price of the bonds (round to nearest whole dollar).",
                "Correct": 922768,
                "Explanation": "The bond issue price is the present value of all future cash flows discounted at the market (effective) interest rate. Since the market rate (10%) exceeds the stated rate (8%), the bonds are issued at a discount. PV of principal ($1,000,000 due in 10 semiannual periods at 5%): $1,000,000 x 0.6139 = $613,900. PV of interest annuity ($40,000 per period for 10 periods at 5%): $40,000 x 7.7217 = $308,868. Issue price = $613,900 + $308,868 = $922,768. The bond discount = $1,000,000 - $922,768 = $77,232. Under ASC 470, this discount is amortized to interest expense over the bond life using the effective interest method. A common error is to use the stated rate (4% per period) as the discount rate instead of the market rate (5%).",
                "Topic": "Bonds",
                "ItemID": "CBQ5-B2-Q2",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-B2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the interest expense to be recorded for the first six months (ending June 30, Year 1).",
                "Correct": 46138,
                "Explanation": "Under the effective interest method (ASC 470), interest expense is calculated by multiplying the bonds carrying value at the beginning of the period by the market (effective) yield at issuance. Carrying value at issuance: $922,768. Market rate: 10% annual / 2 = 5% per semiannual period. Interest expense = $922,768 x 10% x (6/12) = $46,138. Note that interest expense ($46,138) exceeds the cash interest payment ($40,000) by $6,138 � this difference represents the amortization of the bond discount. Over the bonds 5-year life, total interest expense will exceed total cash interest by the $77,232 discount. A common error is to calculate interest expense as the face value times the stated rate ($1,000,000 x 8% x 1/2 = $40,000), which ignores the bond discount.",
                "Topic": "Bonds",
                "ItemID": "CBQ5-B2-Q3",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-B2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the carrying value of the bond immediately after the first interest payment on June 30.",
                "Correct": 928906,
                "Explanation": "Under the effective interest method, the bond discount is amortized each period by the difference between interest expense and cash interest paid. Interest expense for the first semiannual period: $922,768 x 5% = $46,138. Cash interest paid: $1,000,000 x 4% = $40,000. Discount amortization = $46,138 - $40,000 = $6,138. New carrying value = Beginning CV + Discount amortization = $922,768 + $6,138 = $928,906. The carrying value increases each period as the discount is amortized, converging to the face value ($1,000,000) at maturity. The unamortized discount after the first payment is $77,232 - $6,138 = $71,094. A common error is to subtract the amortization from carrying value (as if it were a premium) rather than adding it for a discount bond.",
                "Topic": "Bonds",
                "ItemID": "CBQ5-B2-Q4",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultipleConcepts"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-B2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "select",
                "Prompt": "How are bond issue costs treated under current US GAAP?",
                "Correct": "Deducted from the carrying value of the bond liability",
                "Explanation": "Under ASC 470 and ASU 2015-03, bond issue costs (underwriting fees, legal fees, printing, registration) are no longer capitalized as a separate deferred charge asset. Instead, they are reported as a direct deduction from the carrying value of the bond liability, similar to a discount. Capitalizing as a separate deferred charge was the pre-2015 treatment and is now incorrect under U.S. GAAP. Expensing immediately is incorrect � bond issue costs are amortized to interest expense over the bonds life using the effective interest method. Reporting as a reduction of equity is incorrect � issue costs relate to the debt, not equity. The deduction-from-carrying-value treatment aligns with the principle that issue costs reduce the net proceeds received and therefore increase the effective borrowing rate.",
                "Topic": "Bonds",
                "Choices": [
                    "Capitalized as a separate deferred charge asset",
                    "Expensed immediately in the period incurred",
                    "Deducted from the carrying value of the bond liability",
                    "Reported as a reduction of stockholders' equity"
                ],
                "ItemID": "CBQ5-B2-Q5",
                "CognitiveLevel": "Analyze",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-B2",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-A2",
        "Title": "Comprehensive Income and Stockholders' Equity",
        "SectionTags": [
            "A"
        ],
        "Pack": 5,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Comprehensive Income",
            "OCI",
            "Treasury Stock"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Comprehensive Income",
        "Subtopic": "Other comprehensive income items",
        "SecondaryCompetencies": [
            "Analysis",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Financial reporting",
        "CompanyName": "Silverline Industries",
        "CompanyType": "Service provider",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 25,
        "ExhibitCount": 1,
        "Industry": "Laboratory services",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Calculate comprehensive income including OCI components",
            "Identify OCI components in accordance with ASC 220",
            "Compute the equity impact of treasury stock transactions",
            "Compare cost method vs. par value method for treasury stock",
            "Define comprehensive income in the context of equity reporting"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Enhanced content — added AccountingPrinciple and BusinessInterpretation fields, updated learning objectives and tags"
            }
        ],
        "Stakeholder": "Chief Information Officer",
        "Tags": [
            "Comprehensive Income",
            "OCI",
            "Treasury Stock",
            "Equity",
            "ASC 220"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Silverline Industries reported Net Income of $500,000. During the year, they had foreign currency translation losses of $30,000, unrealized gains on trading securities of $15,000, unrealized gains on available-for-sale (AFS) debt securities of $40,000, and declared cash dividends of $50,000.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Treasury Stock",
                "Body": "Silverline also repurchased 10,000 shares of its $1 par value common stock for $15 per share using the cost method.",
                "ExhibitID": "CBQ5-A2-E1",
                "CaseID": "CBQ5-A2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-A2-Q3",
                    "CBQ5-A2-Q4"
                ]
            }
        ],
        "Items": [
            {
                "Type": "fill",
                "Prompt": "Comprehensive income includes all changes in equity during a period except those resulting from investments by and distributions to _________.",
                "Correct": "owners",
                "Explanation": "Standard definition of comprehensive income (excludes dividends and stock issuances).",
                "Topic": "Comprehensive Income",
                "ItemID": "CBQ5-A2-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology"
                ],
                "AccountingPrinciple": "ASC 220-10-20 defines comprehensive income as 'the change in equity of a business enterprise during a period from transactions and other events and circumstances from non-owner sources.' This definition explicitly excludes investments by owners (stock issuances) and distributions to owners (dividends). The accountant must distinguish between owner-focused equity changes and performance-focused comprehensive income.",
                "BusinessInterpretation": "This definition is fundamental to understanding the statement of comprehensive income. Management accountants should ensure the statement clearly separates owner transactions (investments and dividends, shown in the statement of stockholders' equity) from comprehensive income (shown in the statement of comprehensive income or combined income statement).",
                "CalculationRequired": false,
                "CaseID": "CBQ5-A2",
                "EstimatedMinutes": 3,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the total Comprehensive Income for the year.",
                "Correct": 510000,
                "Explanation": "Comprehensive Income = Net Income ($500k) + OCI items. OCI = AFS Gains ($40k) - Translation Losses ($30k) = $10k. Total CI = $510,000. Note: Trading security gains are already in Net Income.",
                "Topic": "Comprehensive Income",
                "ItemID": "CBQ5-A2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "ASC 220 defines comprehensive income as the change in equity from non-owner sources. OCI includes foreign currency translation adjustments, unrealized gains/losses on AFS debt securities, pension plan prior service costs, and certain hedging gains/losses. Trading security unrealized gains flow through net income, not OCI. Dividends are distributions to owners and do not affect comprehensive income.",
                "BusinessInterpretation": "Management accountants must prepare a statement of comprehensive income that reconciles net income to total comprehensive income. This is critical for communicating the full economic impact of operations beyond net income. Items such as foreign currency translation gains and losses can significantly affect reported equity even when net income is stable, so analysts must monitor both metrics.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-A2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "What is the total reduction to Stockholders' Equity resulting from the treasury stock purchase?",
                "Correct": 150000,
                "Explanation": "10,000 shares x $15 = $150,000. Under the cost method, a contra-equity account is created for the full cost.",
                "Topic": "Treasury Stock",
                "ItemID": "CBQ5-A2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "Under ASC 505-30, treasury stock is accounted for using either the cost method or the par value method. Under the cost method, the acquisition cost of treasury shares is debited to a contra-equity account (Treasury Stock) and total stockholders' equity is reduced by the full amount of cash paid. The par value of the shares and any additional paid-in capital originally attributed to those shares remain in their respective accounts.",
                "BusinessInterpretation": "The treasury stock purchase reduces total equity and available cash. Management accountants should note that while treasury stock does not affect net income, it reduces earnings per share denominator and can signal management's view that the stock is undervalued. The cost method is most common in practice due to its simplicity.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-A2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "If Silverline used the par value method instead of the cost method for treasury stock, how would the initial purchase affect total stockholders' equity?",
                "Correct": "The total reduction to equity would be exactly the same",
                "Explanation": "Whether using cost or par value method, the total dollars removed from Stockholders' Equity is the cash paid ($150,000). Only the specific account distributions differ.",
                "Topic": "Treasury Stock",
                "Choices": [
                    "The total reduction to equity would be exactly the same",
                    "The reduction to equity would be based only on the par value",
                    "It would increase total equity",
                    "It would create a liability instead of reducing equity"
                ],
                "ItemID": "CBQ5-A2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Under ASC 505-30, the cost method debits Treasury Stock for the full purchase price, while the par value method debits Treasury Stock only for par value and debits any excess to APIC � Treasury Stock. In both methods, total stockholders' equity is reduced by the same total amount (the cash paid). The difference is purely in how the reduction is distributed among equity sub-accounts.",
                "BusinessInterpretation": "While both methods yield the same total equity reduction, the par value method provides more detailed disclosure about the source of the equity reduction. Management accountants should be aware that the choice of method affects the balances in common stock, APIC, and treasury stock accounts, which can influence debt covenant computations and ratio analysis.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-A2",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "multi",
                "Prompt": "Which of the following items bypass the income statement and go directly to Other Comprehensive Income (OCI)?",
                "Correct": [
                    "Unrealized gains/losses on AFS debt securities",
                    "Foreign currency translation adjustments",
                    "Pension plan unamortized prior service costs"
                ],
                "Explanation": "Trading security gains flow through Net Income. Dividends reduce retained earnings directly. The others are classic OCI components (PUFI).",
                "Topic": "OCI",
                "Choices": [
                    "Unrealized gains/losses on AFS debt securities",
                    "Foreign currency translation adjustments",
                    "Pension plan unamortized prior service costs",
                    "Unrealized gains/losses on trading securities",
                    "Dividends paid"
                ],
                "ItemID": "CBQ5-A2-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ASC 220 defines other comprehensive income as revenues/expenses excluded from net income under GAAP.",
                "BusinessInterpretation": "The distinction between items that flow through net income versus OCI is critical for management accountants when preparing the statement of comprehensive income. Trading securities are held for short-term gain and their unrealized changes flow through net income; AFS debt securities are held longer-term and their unrealized changes go to OCI. Misclassifying these items misstates both net income and comprehensive income.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-A2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ,
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-B1",
        "Title": "Strategic Management and Forecasting",
        "SectionTags": [
            "B"
        ],
        "Pack": 5,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Forecasting",
            "Strategic Management",
            "Budgeting Methodologies"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Forecasting",
        "Subtopic": "Direct materials planning",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Apex Tech",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "Industrial controls",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Apply time-series forecasting techniques (simple moving average) to predict raw material costs",
            "Analyze strategic competitive factors using Porter's Five Forces framework",
            "Compare budgeting methodologies including zero-based and incremental approaches",
            "Distinguish internal (strengths/weaknesses) from external (opportunities/threats) factors in SWOT analysis",
            "Identify characteristics of exponential smoothing in forecasting"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Enhanced content — added AccountingPrinciple and BusinessInterpretation fields, updated learning objectives and tags"
            }
        ],
        "Stakeholder": "Apex Tech (CEO)",
        "Tags": [
            "Forecasting",
            "Porter's Five Forces",
            "Strategic Management",
            "Budgeting Methodologies",
            "SWOT"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Apex Tech is entering a new market for AI microchips. The CEO has requested a strategic analysis using Porter's Five Forces and a time-series forecast for raw material costs.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Raw Material Costs",
                "Headers": [
                    "Month",
                    "Cost per ton"
                ],
                "Rows": [
                    [
                        "January",
                        "$120"
                    ],
                    [
                        "February",
                        "$130"
                    ],
                    [
                        "March",
                        "$140"
                    ],
                    [
                        "April",
                        "$135"
                    ]
                ],
                "ExhibitID": "CBQ5-B1-E1",
                "CaseID": "CBQ5-B1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the forecasted cost for May using a 3-month simple moving average.",
                "Correct": 135,
                "Explanation": "(Feb $130 + Mar $140 + Apr $135) / 3 = $405 / 3 = $135.",
                "Topic": "Forecasting",
                "ItemID": "CBQ5-B1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Time-series forecasting methods (simple moving average, weighted moving average, exponential smoothing) are used in budgeting to predict costs and revenues based on historical patterns. The moving average method smooths short-term fluctuations but lags behind trends. Management accountants evaluate forecast accuracy using metrics such as mean absolute deviation (MAD) and mean squared error (MSE).",
                "BusinessInterpretation": "The simple moving average is a straightforward forecasting tool that controller Mia Chen can use for budgeting raw material costs. However, it gives equal weight to all periods in the window and lags behind trends. For AI microchip raw materials with potentially volatile pricing, a weighted moving average or exponential smoothing may produce more responsive forecasts. The controller should compare multiple methods and select the one with the lowest forecast error.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-B1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "B",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "match",
                "Prompt": "Match the strategic scenario to the correct component of Porter's Five Forces.",
                "Correct": {
                    "A startup invents a cheaper alternative material": "Threat of substitutes",
                    "Only two suppliers control 90% of the raw materials": "Bargaining power of suppliers",
                    "A major client demands a 10% price reduction": "Bargaining power of buyers",
                    "Low capital requirements allow new competitors to enter easily": "Threat of new entrants"
                },
                "Explanation": "Standard Porter's 5 Forces classification. The five forces are: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and intensity of competitive rivalry.",
                "Topic": "Strategic Management",
                "LeftItems": [
                    "A startup invents a cheaper alternative material",
                    "Only two suppliers control 90% of the raw materials",
                    "A major client demands a 10% price reduction",
                    "Low capital requirements allow new competitors to enter easily"
                ],
                "RightItems": [
    "Bargaining power of suppliers",
    "Threat of new entrants",
    "Threat of substitutes",
    "Bargaining power of buyers",
    "Intensity of competitive rivalry"
],
                "ItemID": "CBQ5-B1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Porter's Five Forces is a strategic analysis framework used to evaluate industry attractiveness and competitive position. The five forces are: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and intensity of competitive rivalry. This framework informs management's assessment of going-concern assumptions, budgeting inputs, and long-term strategic planning.",
                "BusinessInterpretation": "Management accountants use Porter's Five Forces to inform the financial planning process. For example, high supplier bargaining power may signal future raw material cost increases that should be incorporated into the budget. High threat of substitutes may compress profit margins and affect pricing strategy. The controller should integrate these strategic insights into financial forecasts and risk assessments.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-B1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "B",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "Which budgeting approach requires managers to justify every dollar of their budget from scratch each year?",
                "Correct": "Zero-based budgeting",
                "Explanation": "ZBB assumes a base of zero and requires justification for all expenses.",
                "Topic": "Budgeting Methodologies",
                "Choices": [
                    "Incremental budgeting",
                    "Zero-based budgeting",
                    "Activity-based budgeting",
                    "Kaizen budgeting"
                ],
                "ItemID": "CBQ5-B1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Zero-based budgeting (ZBB) requires each manager to justify their entire budget request from a zero base, rather than starting from the prior period's budget. In contrast, incremental budgeting starts from the prior year's actuals and adjusts for known changes. Activity-based budgeting (ABB) budgets costs based on planned activities and their cost drivers. Kaizen budgeting assumes continuous improvement and builds in cost reduction targets.",
                "BusinessInterpretation": "ZBB is more resource-intensive than incremental budgeting but can identify inefficiencies and reallocate resources to higher-value activities. Management accountants should consider the cost-benefit trade-off: ZBB provides rigorous cost justification but requires significant management time. For Apex Tech's AI microchip venture, ZBB may be appropriate for new R&D expenditures where historical benchmarks do not exist.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-B1",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "B",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "multi",
                "Prompt": "Which of the following represent internal factors in a SWOT analysis?",
                "Correct": [
                    "Strengths",
                    "Weaknesses"
                ],
                "Explanation": "Strengths and Weaknesses are internal. Opportunities and Threats are external.",
                "Topic": "Strategic Management",
                "Choices": [
                    "Strengths",
                    "Weaknesses",
                    "Opportunities",
                    "Threats"
                ],
                "ItemID": "CBQ5-B1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) is a strategic planning tool that evaluates internal factors (Strengths and Weaknesses) and external factors (Opportunities and Threats). Strengths and Weaknesses are within the organization's control, while Opportunities and Threats arise from the external environment. This framework informs strategic direction and resource allocation in the budgeting process.",
                "BusinessInterpretation": "Management accountants contribute to SWOT analysis by providing financial data that quantifies internal strengths (e.g., strong cash position, low cost structure) and weaknesses (e.g., high debt levels, aging equipment). External opportunities and threats (market growth, regulatory changes) must be translated into financial assumptions for the budget. The controller should ensure that strategic planning outputs are operationally linked to financial forecasts.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-B1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "B",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "fill",
                "Prompt": "A ______ smoothing forecast applies different weights to past data, usually assigning the highest weight to the most recent period.",
                "Correct": "exponential",
                "Explanation": "Exponential smoothing is a weighted moving average forecasting technique.",
                "Topic": "Forecasting",
                "ItemID": "CBQ5-B1-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Exponential smoothing is a weighted moving average technique that assigns exponentially decreasing weights to older observations. The smoothing constant (alpha, between 0 and 1) determines the weight given to the most recent observation. Higher alpha values make the forecast more responsive to recent changes but also more sensitive to random fluctuations. This method is widely used in short-term sales and cost forecasting.",
                "BusinessInterpretation": "Exponential smoothing is preferred over simple moving average when more recent data is more predictive of future outcomes. The controller should select the smoothing constant (alpha) based on the volatility of the data series � a higher alpha (e.g., 0.3�0.5) for volatile series and a lower alpha (e.g., 0.1�0.2) for stable series. Forecast accuracy should be back-tested before implementation in the budgeting process.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-B1",
                "EstimatedMinutes": 3,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "B",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-C1",
        "Title": "Direct Materials Mix and Yield Variances",
        "SectionTags": [
            "C"
        ],
        "Pack": 5,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Mix Variance",
            "Yield Variance",
            "Sales Mix Variance"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Mix Variance",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Highland Foods",
        "CompanyType": "Processor",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 1,
        "Industry": "Food and beverage",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Calculate the direct material mix variance for individual inputs using actual vs. standard mix proportions",
            "Calculate the direct material mix variance for multiple inputs and compute the total mix variance",
            "Evaluate whether yield variance arises when actual and standard total input quantities differ",
            "Explain when a sales mix variance occurs in a multi-product firm",
            "Interpret the combined effect of mix and yield variances on total material variance"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Enhanced content — added AccountingPrinciple and BusinessInterpretation fields, updated learning objectives and tags"
            }
        ],
        "Stakeholder": "Controller",
        "Tags": [
            "Mix Variance",
            "Yield Variance",
            "Sales Mix Variance",
            "Direct Materials",
            "Standard Costing"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Highland Foods manufactures a sports drink requiring two ingredients. The standard recipe calls for 60% Material A (at $2.00/lb) and 40% Material B (at $3.00/lb). The standard cost per pound of input is $2.40. During May, Highland used 10,000 lbs of total input to produce the expected output. The actual mix used was 5,000 lbs of A and 5,000 lbs of B. The actual prices paid equaled the standard prices.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Calculations Info",
                "Body": "Actual total input at standard mix = 6,000 lbs A and 4,000 lbs B. Enter unfavorable variances as positive numbers and favorable variances as negative numbers.",
                "ExhibitID": "CBQ5-C1-E1",
                "CaseID": "CBQ5-C1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the Direct Material Mix Variance for Material A.",
                "Correct": -2000,
                "Explanation": "(Actual Quantity - Actual Input at Std Mix) x Std Price = (5,000 - 6,000) x $2.00 = -2,000 (Favorable).",
                "Topic": "Mix Variance",
                "ItemID": "CBQ5-C1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The direct material mix variance isolates the portion of total material variance caused by using a different proportion of inputs than the standard mix. The formula is: (Actual Quantity − Actual Total Input at Standard Mix) × Standard Price. A favorable mix variance occurs when the actual mix uses a higher proportion of cheaper materials than the standard allows.",
                "BusinessInterpretation": "The mix variance helps the production manager and management accountant evaluate whether substitution decisions between materials are financially beneficial. A favorable mix variance from using more of the cheaper Material A may indicate cost savings, but the controller should verify that product quality is not compromised — excessive substitution could lead to customer dissatisfaction or increased waste.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Direct Material Mix Variance for Material B.",
                "Correct": 3000,
                "Explanation": "Under standard costing for direct materials, the materials yield variance measures the difference between actual input quantity and standard input quantity valued at the standard price. For Material B: Standard input for actual output is 4,000 units at $3.00 per unit = $12,000 standard. Actual input was 5,000 units at $3.00 = $15,000. Yield variance = (5,000 - 4,000) x $3.00 = $3,000 Unfavorable. An unfavorable yield variance indicates that more material was consumed than the standard allows for the actual output produced \u2014 requiring investigation into production efficiency, scrap rates, and quality of raw materials.",
                "Topic": "Mix Variance",
                "ItemID": "CBQ5-C1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The same mix variance formula is applied to Material B: (5,000 − 4,000) × $3.00 = +3,000 unfavorable. The unfavorable variance arises because the actual mix used 1,000 more pounds of the more expensive Material B than the standard mix specifies. Individually, each material's mix variance reveals which inputs are over- or under-used relative to the standard recipe.",
                "BusinessInterpretation": "The unfavorable mix variance for Material B ($3,000) offsets the favorable variance for Material A ($2,000), resulting in a net unfavorable total mix variance. The production manager should investigate why the mix deviated from the standard — possible causes include material shortages, equipment calibration issues, or operator error. Root cause analysis should precede any revision of the standard mix percentages.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Total Direct Material Mix Variance.",
                "Correct": 1000,
                "Explanation": "Under standard costing for direct materials, the materials quantity variance is the sum of the mix variance and the yield variance: Mix variance = -$2,000 Favorable (from Q1) + Yield variance = +$3,000 Unfavorable (from Q2) = Total quantity variance = +$1,000 Unfavorable. The $1,000 unfavorable quantity variance is the net result of using more Material B (unfavorable) offset by a shift toward the cheaper material A in the mix (favorable). Management should investigate whether the favorable mix savings were worth the unfavorable yield loss \u2014 if the total quantity variance is unfavorable, the net effect was that the lower-cost mix increased total material usage beyond what the standard allows.",
                "Topic": "Mix Variance",
                "ItemID": "CBQ5-C1-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "The total direct material mix variance is the sum of individual material mix variances: −$2,000 (F) + $3,000 (U) = $1,000 (U). This total mix variance is combined with the yield variance to compute the total material usage variance. A positive total mix variance indicates that the actual input mix was more expensive overall than the standard mix, even if actual total input quantity matched the standard.",
                "BusinessInterpretation": "The total mix variance of $1,000 unfavorable signals that Highland Foods' actual ingredient blend was costlier than the standard recipe. The management accountant should report this variance to production management with the recommendation to investigate whether the deviation was intentional (e.g., due to Material A shortage) or controllable. Understanding the split between mix and yield variance is essential for accurate performance evaluation.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "If the total actual input quantity (10,000 lbs) was exactly equal to the total standard input quantity allowed for actual output, what would the yield variance be?",
                "Correct": "Zero",
                "Explanation": "Yield variance measures the difference between actual total input quantity and standard total input quantity. If they are equal, yield variance is zero.",
                "Topic": "Yield Variance",
                "Choices": [
                    "Favorable",
                    "Unfavorable",
                    "Zero",
                    "Cannot be determined without actual prices"
                ],
                "ItemID": "CBQ5-C1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The yield variance measures the difference between the actual total quantity of inputs used and the standard total quantity allowed for actual output, valued at the standard weighted-average cost per input unit. If actual input equals standard input, the yield variance is zero regardless of the mix. Any variance is solely attributable to input quantity efficiency, not mix proportions.",
                "BusinessInterpretation": "The yield variance reflects production efficiency — whether the actual output from a given quantity of inputs matches the expected output. A zero yield variance means Highland Foods used exactly the expected total input pounds for the output achieved. Management accountants should track yield variance over time as an indicator of production process efficiency. Persistent unfavorable yield variances may indicate equipment issues, lower-quality inputs, or process inefficiencies requiring capital investment.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C1",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "multi",
                "Prompt": "In a multi-product firm, a sales mix variance arises when:",
                "Correct": [
                    "The proportion of high-margin to low-margin products sold differs from the budget"
                ],
                "Explanation": "Sales mix variance specifically isolates the impact of the shift in the relative ratio of products sold.",
                "Topic": "Sales Mix Variance",
                "Choices": [
                    "The actual total quantity sold differs from the budget",
                    "The proportion of high-margin to low-margin products sold differs from the budget",
                    "The actual selling price differs from the budget",
                    "Fixed costs change unexpectedly"
                ],
                "ItemID": "CBQ5-C1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Sales mix variance isolates the profit impact of selling a different proportion of products than budgeted. It is calculated as: (Actual Sales Mix Percentage − Budgeted Sales Mix Percentage) × Actual Total Units Sold × Budgeted Contribution Margin per Unit. A favorable sales mix variance occurs when the actual mix shifts toward higher-margin products.",
                "BusinessInterpretation": "The sales mix variance is a critical performance metric for multi-product firms like Highland Foods if they were to expand beyond a single product line. Management accountants should analyze sales mix variance alongside sales quantity variance to determine whether changes in total contribution margin are due to mix shifts or volume changes. A shift toward lower-margin products may signal pricing pressure or changing customer preferences that require strategic response.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-C2",
        "Title": "Responsibility Centers and ROI",
        "SectionTags": [
            "C"
        ],
        "Pack": 5,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Responsibility Centers and ROI"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Responsibility Centers and ROI",
        "Subtopic": "Investment center performance",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Responsibility Centers",
        "CompanyType": "Company",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "General business",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze responsibility centers and roi",
            "Analyze responsibility centers and roi",
            "Analyze responsibility centers and roi",
            "Analyze responsibility centers and roi",
            "Analyze responsibility centers and roi"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring — responsibility centers, ROI, RI, and performance measurement"
            }
        ],
        "Stakeholder": "Corporate Controller",
        "Tags": [
            "responsibility centers",
            "cost center",
            "profit center",
            "investment center",
            "ROI",
            "residual income",
            "performance measurement"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "OmniSource Retail Group operates a chain of 35 home improvement stores across the Southeast, with annual revenue of $620 million. The company has three types of retail formats: big-box warehouse stores, neighborhood hardware stores, and an e-commerce division. Each store manager is evaluated on financial performance. The corporate office uses a responsibility accounting system to measure and evaluate each center's performance. The CFO is reviewing the current performance measurement system and considering whether to use return on investment (ROI) or residual income (RI) for evaluating investment center managers.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Store Performance Data (Selected)",
                "Headers": [
                    "Store Type",
                    "Operating Income",
                    "Average Operating Assets",
                    "Net Revenue",
                    "Store Manager Title"
                ],
                "Rows": [
                    [
                        "Warehouse Store #4",
                        "$1,240,000",
                        "$8,500,000",
                        "$9,800,000",
                        "Store Director"
                    ],
                    [
                        "Neighborhood Store #12",
                        "$420,000",
                        "$2,100,000",
                        "$3,600,000",
                        "Store Manager"
                    ],
                    [
                        "E-commerce Division",
                        "$980,000",
                        "$4,200,000",
                        "$12,400,000",
                        "VP of E-commerce"
                    ],
                    [
                        "Distribution Center",
                        "N/A (cost center)",
                        "$6,800,000",
                        "N/A",
                        "Logistics Manager"
                    ]
                ],
                "CaseID": "CBQ5-C2-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "OmniSource uses responsibility accounting to classify each business unit. Match each unit to the correct type of responsibility center based on what its manager is accountable for.",
                "LeftItems": [
                    "Distribution Center — manager controls costs but does not set prices or make capital decisions",
                    "Neighborhood Store #12 — manager controls both revenue and costs; capital equipment decisions made centrally",
                    "Warehouse Store #4 — manager controls revenue, costs, and has authority to approve capital expenditures up to $25,000",
                    "E-commerce Division — manager controls revenue, costs, and all technology investment decisions"
                ],
                "RightItems": [
    "Profit center — accountable for both revenue and expenses, but not capital investment decisions",
    "Investment center — accountable for all financial results including technology ROI",
    "Revenue center — accountable for sales generation only",
    "Investment center — accountable for revenue, expenses, and return on invested capital",
    "Cost center — accountable for cost control and operational efficiency only"
],
                "Correct": {
                    "Distribution Center — manager controls costs but does not set prices or make capital decisions": "Cost center — accountable for cost control and operational efficiency only",
                    "Neighborhood Store #12 — manager controls both revenue and costs; capital equipment decisions made centrally": "Profit center — accountable for both revenue and expenses, but not capital investment decisions",
                    "Warehouse Store #4 — manager controls revenue, costs, and has authority to approve capital expenditures up to $25,000": "Investment center — accountable for revenue, expenses, and return on invested capital",
                    "E-commerce Division — manager controls revenue, costs, and all technology investment decisions": "Investment center — accountable for all financial results including technology ROI"
                },
                "Explanation": "A cost center manager is responsible only for costs (Distribution Center). A profit center manager controls both revenue and costs but not capital investments. An investment center manager controls revenue, costs, and capital deployment decisions. Both Warehouse Store #4 and the E-commerce Division qualify as investment centers because their managers have capital decision authority. A revenue center would only control sales, which does not match any of these units.",
                "Topic": "Responsibility center classification",
                "ItemID": "CBQ5-C2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Responsibility accounting classifies business units as cost centers, revenue centers, profit centers, or investment centers based on the types of decisions managers are authorized to make and for which they are held accountable.",
                "BusinessInterpretation": "The classification determines how manager performance is evaluated. An investment center manager should be evaluated on ROI or residual income, while a cost center manager should be evaluated on cost variance and efficiency metrics.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-C2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Using Exhibit 1 data, match each performance measure calculation to the correct result for Warehouse Store #4.",
                "LeftItems": [
                    "Return on Investment (ROI) = Operating Income / Average Operating Assets",
                    "Margin ratio = Operating Income / Net Revenue",
                    "Turnover ratio = Net Revenue / Average Operating Assets",
                    "Residual Income (RI) assuming 10% required rate of return"
                ],
                "RightItems": [
    "RI = $390,000 — $1,240,000 − (10% × $8,500,000)",
    "ROI = 14.6% — $1,240,000 / $8,500,000",
    "ROI = 10.2% — incorrect calculation using net income",
    "Margin = 12.7% — $1,240,000 / $9,800,000",
    "Turnover = 1.15 — $9,800,000 / $8,500,000"
],
                "Correct": {
                    "Return on Investment (ROI) = Operating Income / Average Operating Assets": "ROI = 14.6% — $1,240,000 / $8,500,000",
                    "Margin ratio = Operating Income / Net Revenue": "Margin = 12.7% — $1,240,000 / $9,800,000",
                    "Turnover ratio = Net Revenue / Average Operating Assets": "Turnover = 1.15 — $9,800,000 / $8,500,000",
                    "Residual Income (RI) assuming 10% required rate of return": "RI = $390,000 — $1,240,000 − (10% × $8,500,000)"
                },
                "Explanation": "ROI = Operating Income / Average Operating Assets = $1,240,000 / $8,500,000 = 14.6%. Margin = Operating Income / Revenue = 12.7%. Turnover = Revenue / Assets = 1.15. Residual Income = Operating Income − (Required Rate × Assets) = $1,240,000 − $850,000 = $390,000. The DuPont formula shows ROI = Margin × Turnover = 12.7% × 1.15 = 14.6%.",
                "Topic": "ROI, margin, turnover, and residual income calculations",
                "ItemID": "CBQ5-C2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "ROI = Operating Income / Average Operating Assets. The DuPont model decomposes ROI into margin (income/revenue) and turnover (revenue/assets). Residual Income = Operating Income − (Required Rate of Return × Operating Assets).",
                "BusinessInterpretation": "ROI is a relative measure (percentage) while RI is an absolute measure (dollars). ROI can lead to suboptimal decisions if managers reject projects earning below the current ROI but above the cost of capital.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "match",
                "Prompt": "The CFO is evaluating whether to use ROI or Residual Income (RI) for evaluating store managers. Match each performance measure characteristic to the correct metric (ROI or RI).",
                "LeftItems": [
                    "Expresses performance as a percentage, enabling comparison across stores of different sizes",
                    "May cause managers to reject profitable projects that earn less than the division's current ROI",
                    "Measures absolute dollar value created above the required return on invested capital",
                    "Aligns manager decisions with company-wide value creation when the same required rate is used"
                ],
                "RightItems": [
    "ROI — a potential disadvantage as managers may maximize their ROI rather than total company value",
    "RI — an absolute dollar measure that shows how much value was added above the cost of capital",
    "ROI — a relative measure that facilitates comparison across centers",
    "Net Income — the simplest performance metric",
    "RI — aligns managerial decisions with company-wide goal congruence when required rate equals cost of capital"
],
                "Correct": {
                    "Expresses performance as a percentage, enabling comparison across stores of different sizes": "ROI — a relative measure that facilitates comparison across centers",
                    "May cause managers to reject profitable projects that earn less than the division's current ROI": "ROI — a potential disadvantage as managers may maximize their ROI rather than total company value",
                    "Measures absolute dollar value created above the required return on invested capital": "RI — an absolute dollar measure that shows how much value was added above the cost of capital",
                    "Aligns manager decisions with company-wide value creation when the same required rate is used": "RI — aligns managerial decisions with company-wide goal congruence when required rate equals cost of capital"
                },
                "Explanation": "ROI facilitates comparison across divisions of different sizes but can cause suboptimal decision-making when managers reject projects that would decrease their ROI but increase company value. RI aligns with overall value creation (goal congruence) because any project earning above the required rate increases RI. Net Income does not consider the investment base required to generate the income.",
                "Topic": "ROI vs Residual Income — advantages and disadvantages",
                "ItemID": "CBQ5-C2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ROI and Residual Income (RI) are both measures of investment center performance. RI addresses a key limitation of ROI by using the same required rate of return, promoting goal congruence across divisions.",
                "BusinessInterpretation": "Many companies use both ROI and RI. ROI is used for external comparisons and benchmarking. RI is used internally for capital budgeting and manager evaluation to prevent suboptimal investment decisions.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-C2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "The E-commerce Division manager proposes a $1,000,000 technology upgrade expected to generate $130,000 in annual operating income. The corporate required rate of return is 10%. Match each analysis to the correct evaluation of this proposal.",
                "LeftItems": [
                    "Current E-commerce ROI: $980,000 / $4,200,000 = 23.3%",
                    "Proposed project ROI: $130,000 / $1,000,000 = 13.0%",
                    "Post-project E-commerce ROI: ($980,000 + $130,000) / ($4,200,000 + $1,000,000) = 21.0%",
                    "Project Residual Income: $130,000 − (10% × $1,000,000) = $30,000"
                ],
                "RightItems": [
    "RI is POSITIVE at $30,000, meaning the project adds value above the required return",
    "The blended ROI decreases from 23.3% to 21.0%, which may discourage the manager from accepting",
    "If evaluated on ROI, the manager may REJECT this project because 13.0% is below the current division ROI of 23.3%",
    "If evaluated on RI, the manager would REJECT this project because it reduces overall value",
    "The project ROI of 13.0% exceeds the 10% cost of capital, so it creates economic value"
],
                "Correct": {
                    "Current E-commerce ROI: $980,000 / $4,200,000 = 23.3%": "If evaluated on ROI, the manager may REJECT this project because 13.0% is below the current division ROI of 23.3%",
                    "Proposed project ROI: $130,000 / $1,000,000 = 13.0%": "The project ROI of 13.0% exceeds the 10% cost of capital, so it creates economic value",
                    "Post-project E-commerce ROI: ($980,000 + $130,000) / ($4,200,000 + $1,000,000) = 21.0%": "The blended ROI decreases from 23.3% to 21.0%, which may discourage the manager from accepting",
                    "Project Residual Income: $130,000 − (10% × $1,000,000) = $30,000": "RI is POSITIVE at $30,000, meaning the project adds value above the required return"
                },
                "Explanation": "This illustrates the goal congruence problem with ROI. The project earns 13% which exceeds the company's 10% cost of capital, so it should be accepted. However, if the manager is evaluated on ROI, they would reject it because it dilutes their division's ROI from 23.3% to 21.0%. Under RI, the project shows positive $30,000, so the RI-based evaluation would lead to the correct accept decision. The statement about RI rejecting is incorrect because any positive RI adds value.",
                "Topic": "Goal congruence — ROI vs Residual Income decision example",
                "ItemID": "CBQ5-C2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Goal congruence occurs when managers' incentives align with company-wide objectives. ROI-based evaluation can create goal conflicts; RI mitigates this by using the company's cost of capital as the benchmark.",
                "BusinessInterpretation": "This classic agency problem highlights why many companies use Economic Value Added (EVA) or similar residual income measures. The behavioral impact of performance metrics must be considered alongside financial theory.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C2",
                "EstimatedMinutes": 8,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "OmniSource's controller is designing a balanced performance measurement system. Match each performance dimension to the most appropriate metric from the given options.",
                "LeftItems": [
                    "Financial performance of investment centers",
                    "Customer satisfaction and market position",
                    "Internal process efficiency and quality",
                    "Employee development and innovation capability"
                ],
                "RightItems": [
    "Strategic — revenue growth rate measures market expansion",
    "Internal Process — defect rates and cycle time measure operational efficiency",
    "Customer — Net Promoter Score and market share track customer loyalty and competitive position",
    "Financial — ROI and Residual Income measure investment center profitability",
    "Learning and Growth — employee training hours and certification rates measure capability development"
],
                "Correct": {
                    "Financial performance of investment centers": "Financial — ROI and Residual Income measure investment center profitability",
                    "Customer satisfaction and market position": "Customer — Net Promoter Score and market share track customer loyalty and competitive position",
                    "Internal process efficiency and quality": "Internal Process — defect rates and cycle time measure operational efficiency",
                    "Employee development and innovation capability": "Learning and Growth — employee training hours and certification rates measure capability development"
                },
                "Explanation": "These four dimensions correspond to the balanced scorecard framework. ROI/RI are financial measures. NPS and market share are customer measures. Defect rates and cycle time are internal process measures. Training hours and certifications are learning and growth measures. \"Revenue growth rate\" could be financial, customer, or strategic depending on context, but here it is classified differently from the four balanced scorecard perspectives.",
                "Topic": "Balanced scorecard — linking metrics to performance dimensions",
                "ItemID": "CBQ5-C2-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The balanced scorecard (Kaplan & Norton) translates strategy into objectives and measures across four perspectives: Financial, Customer, Internal Business Process, and Learning and Growth.",
                "BusinessInterpretation": "Financial metrics alone are insufficient for performance evaluation. A balanced set of leading and lagging indicators provides a more complete picture of business health and future performance potential.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-C2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-D1",
        "Title": "Value Chain and Business Process Improvement",
        "SectionTags": [
            "D"
        ],
        "Pack": 5,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Value Chain and Business Process Improvement"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Value Chain and Business Process Improvement",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Heritage Furniture Company",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "Furniture manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Classify primary and support activities in Porter's value chain",
            "Distinguish between primary and support activities in the value chain framework",
            "Analyze value chain activities for cost reduction opportunities",
            "Identify process improvement methodologies for operational efficiency",
            "Evaluate benchmarking and strategic implications for process improvement"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Production",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring — Porter's value chain analysis, process improvement methodologies, and TQM"
            }
        ],
        "Stakeholder": "VP of Operations",
        "Tags": [
            "value chain",
            "Porter",
            "primary activities",
            "support activities",
            "process improvement",
            "TQM",
            "benchmarking",
            "business process reengineering"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Heritage Furniture Company manufactures mid-market residential furniture with 750 employees across two production facilities. Annual revenue is $145 million. The CEO has initiated a strategic cost reduction program after three consecutive years of declining margins. The operations team is analyzing the company's value chain using Michael Porter's framework to identify opportunities for cost reduction and process improvement. The company faces competitive pressure from lower-cost imported furniture and must improve operational efficiency while maintaining product quality.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Heritage Furniture Value Chain Analysis",
                "Headers": [
                    "Value Chain Activity",
                    "Current Annual Cost",
                    "Industry Benchmark",
                    "Gap",
                    "Improvement Opportunity"
                ],
                "Rows": [
                    [
                        "Inbound Logistics (raw material receiving, storage, inventory)",
                        "$3.2M",
                        "$2.8M",
                        "+14%",
                        "Implement just-in-time delivery to reduce warehousing costs"
                    ],
                    [
                        "Operations (cutting, assembly, finishing, quality inspection)",
                        "$38.5M",
                        "$35.0M",
                        "+10%",
                        "Reduce defect rate from 5.2% to 2.5% via Six Sigma"
                    ],
                    [
                        "Outbound Logistics (order processing, warehousing, shipping)",
                        "$4.8M",
                        "$4.2M",
                        "+14%",
                        "Automate order-to-ship process; zone delivery routing"
                    ],
                    [
                        "Marketing and Sales (advertising, sales force, showroom)",
                        "$11.2M",
                        "$10.5M",
                        "+7%",
                        "Shift marketing spend to digital; reduce showroom footprint"
                    ],
                    [
                        "Service (installation, warranty, customer support)",
                        "$2.3M",
                        "$2.0M",
                        "+15%",
                        "Implement self-service warranty portal; reduce call volume"
                    ]
                ],
                "CaseID": "CBQ5-D1-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Heritage Furniture's management team is analyzing primary activities in Porter's value chain. Match each business process to the correct primary activity category.",
                "LeftItems": [
                    "Negotiating with lumber suppliers and managing raw material inventory levels",
                    "Operating CNC cutting machines and managing the furniture assembly line",
                    "Managing finished goods warehousing and coordinating delivery to retail customers",
                    "Managing the showroom sales team and running digital advertising campaigns"
                ],
                "RightItems": [
    "Operations — activities that transform inputs into finished products",
    "Inbound Logistics — activities related to receiving, storing, and managing inputs",
    "Service — activities that maintain product value after purchase",
    "Outbound Logistics — activities that collect, store, and distribute finished goods to customers",
    "Marketing and Sales — activities that make customers aware of products and facilitate purchases"
],
                "Correct": {
                    "Negotiating with lumber suppliers and managing raw material inventory levels": "Inbound Logistics — activities related to receiving, storing, and managing inputs",
                    "Operating CNC cutting machines and managing the furniture assembly line": "Operations — activities that transform inputs into finished products",
                    "Managing finished goods warehousing and coordinating delivery to retail customers": "Outbound Logistics — activities that collect, store, and distribute finished goods to customers",
                    "Managing the showroom sales team and running digital advertising campaigns": "Marketing and Sales — activities that make customers aware of products and facilitate purchases"
                },
                "Explanation": "Inbound logistics covers receiving and storing inputs (lumber). Operations transforms inputs (cutting, assembly). Outbound logistics distributes finished goods. Marketing and Sales promotes products and generates sales. Service (warranty, installation) is the fifth primary activity not represented in these examples. Each primary activity in the value chain adds value that the customer is willing to pay for.",
                "Topic": "Porter's value chain — primary activities",
                "ItemID": "CBQ5-D1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-D1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Production",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Porter's value chain also includes support activities that enable the primary activities. Match each corporate function to the correct support activity category.",
                "LeftItems": [
                    "Managing employee recruitment, training, and performance evaluation processes",
                    "Developing the ERP system and maintaining the company website and e-commerce platform",
                    "Sourcing raw materials, negotiating supplier contracts, and managing vendor relationships",
                    "Designing new furniture collections and improving manufacturing processes"
                ],
                "RightItems": [
    "Procurement — sourcing and purchasing inputs including materials, equipment, and services",
    "Firm Infrastructure — general management, legal, accounting, and finance",
    "Technology Development — research and development for new products and process design",
    "Human Resource Management — recruiting, training, and developing employees",
    "Technology Development — systems, software, and process innovation to support operations"
],
                "Correct": {
                    "Managing employee recruitment, training, and performance evaluation processes": "Human Resource Management — recruiting, training, and developing employees",
                    "Developing the ERP system and maintaining the company website and e-commerce platform": "Technology Development — systems, software, and process innovation to support operations",
                    "Sourcing raw materials, negotiating supplier contracts, and managing vendor relationships": "Procurement — sourcing and purchasing inputs including materials, equipment, and services",
                    "Designing new furniture collections and improving manufacturing processes": "Technology Development — research and development for new products and process design"
                },
                "Explanation": "Support activities enable primary activities to function. HR Management covers people-related activities. Technology Development includes both IT systems AND product/process R&D. Procurement covers all purchasing activities across the enterprise. Firm Infrastructure (general management, accounting, legal) is not represented in these examples.",
                "Topic": "Porter's value chain — support activities",
                "ItemID": "CBQ5-D1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-D1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Production",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Based on the value chain analysis in Exhibit 1, match each cost reduction initiative to the value chain activity it targets.",
                "LeftItems": [
                    "Implement just-in-time (JIT) delivery from lumber suppliers to reduce warehousing costs by reducing raw material inventory levels",
                    "Apply Six Sigma DMAIC methodology to reduce the defect rate from 5.2% to 2.5% in the assembly and finishing processes",
                    "Automate the order-to-ship process and implement zone-based delivery routing to reduce shipping costs",
                    "Shift advertising spend from print catalogs to digital channels; reduce showroom square footage"
                ],
                "RightItems": [
    "Marketing and Sales — digital advertising is more cost-effective; smaller showroom reduces occupancy costs",
    "Service — self-service warranty portal reduces call center staffing requirements",
    "Inbound Logistics — JIT reduces raw material holding costs and improves inventory turnover",
    "Outbound Logistics — automation reduces labor costs; zone routing reduces fuel and driver costs",
    "Operations — Six Sigma reduces waste and rework costs by eliminating defects at the source"
],
                "Correct": {
                    "Implement just-in-time (JIT) delivery from lumber suppliers to reduce warehousing costs by reducing raw material inventory levels": "Inbound Logistics — JIT reduces raw material holding costs and improves inventory turnover",
                    "Apply Six Sigma DMAIC methodology to reduce the defect rate from 5.2% to 2.5% in the assembly and finishing processes": "Operations — Six Sigma reduces waste and rework costs by eliminating defects at the source",
                    "Automate the order-to-ship process and implement zone-based delivery routing to reduce shipping costs": "Outbound Logistics — automation reduces labor costs; zone routing reduces fuel and driver costs",
                    "Shift advertising spend from print catalogs to digital channels; reduce showroom square footage": "Marketing and Sales — digital advertising is more cost-effective; smaller showroom reduces occupancy costs"
                },
                "Explanation": "Each initiative targets a specific value chain activity as shown in Exhibit 1. JIT targets inbound logistics. Six Sigma targets manufacturing operations. Order automation and zone routing target outbound logistics. Digital marketing and showroom reduction target marketing and sales. Service portal automation (self-service warranty) would target the Service activity but is not listed as a current initiative.",
                "Topic": "Process improvement initiatives by value chain activity",
                "ItemID": "CBQ5-D1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-D1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Production",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Heritage Furniture is evaluating different process improvement methodologies. Match each methodology to its correct description and application.",
                "LeftItems": [
                    "Six Sigma — data-driven methodology for reducing process variation and defects",
                    "Benchmarking — comparing performance metrics to industry best practices",
                    "Business Process Reengineering (BPR) — fundamental redesign of business processes",
                    "Kaizen (Continuous Improvement) — small, incremental improvements by all employees"
                ],
                "RightItems": [
    "Empowering assembly line workers to suggest and implement small daily improvements to workstation layout and workflow",
    "Reducing defect rate from 5.2% to 2.5% using DMAIC — defining, measuring, analyzing, improving, and controlling",
    "Implementing an ERP system to integrate all business functions into a single platform",
    "Comparing Heritage's $38.5M operations cost to the $35.0M industry benchmark to identify the 10% gap",
    "Redesigning the entire order-to-cash process from scratch to eliminate non-value-added steps and achieve radical improvement"
],
                "Correct": {
                    "Six Sigma — data-driven methodology for reducing process variation and defects": "Reducing defect rate from 5.2% to 2.5% using DMAIC — defining, measuring, analyzing, improving, and controlling",
                    "Benchmarking — comparing performance metrics to industry best practices": "Comparing Heritage's $38.5M operations cost to the $35.0M industry benchmark to identify the 10% gap",
                    "Business Process Reengineering (BPR) — fundamental redesign of business processes": "Redesigning the entire order-to-cash process from scratch to eliminate non-value-added steps and achieve radical improvement",
                    "Kaizen (Continuous Improvement) — small, incremental improvements by all employees": "Empowering assembly line workers to suggest and implement small daily improvements to workstation layout and workflow"
                },
                "Explanation": "Six Sigma uses the DMAIC cycle for defect reduction. Benchmarking compares performance to external standards. BPR involves radical, top-down process redesign for breakthrough improvements. Kaizen relies on incremental, employee-driven improvements. ERP implementation is a tool that can support various methodologies but is not itself a process improvement methodology.",
                "Topic": "Process improvement methodologies — Six Sigma, BPR, Kaizen, Benchmarking",
                "ItemID": "CBQ5-D1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-D1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Production",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Heritage Furniture wants to assess which activities in its value chain are core competencies versus commodity activities. Match each assessment to the correct strategic implication.",
                "LeftItems": [
                    "Custom furniture design and hand-finishing techniques — competitors cannot replicate; customers pay premium pricing",
                    "Payroll processing and basic accounting — multiple third-party providers can perform at lower cost",
                    "Lumber procurement — several suppliers available; market is competitive and transparent",
                    "CNC cutting operations — machine cost is similar across competitors; no significant differentiation"
                ],
                "RightItems": [
    "Divest — sell this business unit entirely",
    "Manage for cost efficiency — operations cost must be at or below industry benchmark to remain competitive",
    "Core competency — invest in retaining and strengthening this capability; it provides competitive advantage",
    "Manage for cost efficiency — procurement costs should be minimized through competitive bidding and supplier management",
    "Outsource or automate — non-core activity that can be performed more efficiently by specialized providers"
],
                "Correct": {
                    "Custom furniture design and hand-finishing techniques — competitors cannot replicate; customers pay premium pricing": "Core competency — invest in retaining and strengthening this capability; it provides competitive advantage",
                    "Payroll processing and basic accounting — multiple third-party providers can perform at lower cost": "Outsource or automate — non-core activity that can be performed more efficiently by specialized providers",
                    "Lumber procurement — several suppliers available; market is competitive and transparent": "Manage for cost efficiency — procurement costs should be minimized through competitive bidding and supplier management",
                    "CNC cutting operations — machine cost is similar across competitors; no significant differentiation": "Manage for cost efficiency — operations cost must be at or below industry benchmark to remain competitive"
                },
                "Explanation": "Value chain analysis helps identify which activities are core competencies vs commodity activities. Core competencies (custom design) should be protected and invested in. Non-core support activities (payroll) can be outsourced. Commodity activities (procurement, standard operations) should be managed for cost efficiency without over-investing. Divestiture would be appropriate for a business unit or product line, not an individual activity within the value chain.",
                "Topic": "Core competency identification and strategic implications",
                "ItemID": "CBQ5-D1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Value chain analysis helps management identify activities that create competitive advantage. Core competencies should be protected, while non-core activities should be evaluated for cost reduction or outsourcing.",
                "BusinessInterpretation": "The decision to outsource should consider not just cost savings but also quality, reliability, and strategic risk. Activities that are performed better internally should remain in-house even if external costs appear lower.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D1",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Production",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-D2",
        "Title": "Six Sigma and Quality Control",
        "SectionTags": [
            "D"
        ],
        "Pack": 5,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Six Sigma and Quality Control"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Six Sigma and Quality Control",
        "Subtopic": "DMAIC methodology and cost of quality",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Quality management",
        "CompanyName": "Precision Auto Components",
        "CompanyType": "Automotive parts manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Automotive manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze the DMAIC methodology and its five phases for process improvement",
            "Analyze cost of quality (COQ) categories and their financial impact",
            "Calculate defect reduction savings using Six Sigma targets",
            "Evaluate the financial justification for quality improvement initiatives",
            "Analyze the relationship between prevention, appraisal, and failure costs"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring - Six Sigma DMAIC, cost of quality categories, defect reduction analysis, and quality initiative financial justification"
            }
        ],
        "Stakeholder": "Quality Director",
        "Tags": [
            "six sigma",
            "DMAIC",
            "cost of quality",
            "prevention",
            "appraisal",
            "internal failure",
            "external failure",
            "defect reduction",
            "quality management",
            "process improvement"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Precision Auto Components (PAC) is a Tier 2 automotive supplier that manufactures brake calipers for major OEMs under long-term supply contracts. Over the past 18 months, PAC has experienced increasing warranty claims and customer returns, with total quality-related costs reaching nearly $2 million per quarter. The VP of Operations has hired a Master Black Belt to lead a Six Sigma initiative targeting a 50% reduction in failure costs within 12 months. The quality director has prepared a cost of quality (COQ) report and defect rate data to establish the baseline and quantify potential savings. The initiative will follow the DMAIC methodology, and management needs to understand the financial justification before approving the $400,000 program budget for training, consulting, and process redesign.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Quality Cost Report (Current Quarter)",
                "Headers": [
                    "COQ Category",
                    "Cost",
                    "% of Total",
                    "Description"
                ],
                "Rows": [
                    [
                        "Prevention - Training",
                        "$180,000",
                        "9.0%",
                        "Employee quality training and certification programs"
                    ],
                    [
                        "Prevention - Design reviews",
                        "$95,000",
                        "4.8%",
                        "Design-for-manufacturability reviews on new products"
                    ],
                    [
                        "Prevention - Process documentation",
                        "$25,000",
                        "1.3%",
                        "Standard operating procedure updates"
                    ],
                    [
                        "Appraisal - In-process inspection",
                        "$210,000",
                        "10.6%",
                        "Inline quality checks during production"
                    ],
                    [
                        "Appraisal - Final testing",
                        "$145,000",
                        "7.3%",
                        "End-of-line functional testing for all products"
                    ],
                    [
                        "Internal Failure - Scrap and rework",
                        "$420,000",
                        "21.1%",
                        "Defective units that cannot be sold without rework"
                    ],
                    [
                        "Internal Failure - Machine downtime",
                        "$110,000",
                        "5.5%",
                        "Production stoppages due to quality issues"
                    ],
                    [
                        "External Failure - Warranty claims",
                        "$580,000",
                        "29.2%",
                        "Customer claims for defective products in the field"
                    ],
                    [
                        "External Failure - Returns and lost sales",
                        "$250,000",
                        "12.6%",
                        "Estimated cost of customer returns and reputational loss"
                    ],
                    [
                        "Total Quality Costs",
                        "$2,015,000",
                        "100.0%",
                        ""
                    ]
                ],
                "ExhibitID": "CBQ5-D2-E1",
                "CaseID": "CBQ5-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Six Sigma Initiative Details",
                "Body": "The Six Sigma team targets reducing total failure costs (internal + external) by 50% within 12 months through DMAIC-based process improvement. The program budget is $400,000 for external consultants, employee training, and process redesign implementation. Current annualized failure costs: Internal Failure ($530,000/quarter x 4 quarters = $2,120,000/year) + External Failure ($830,000/quarter x 4 quarters = $3,320,000/year) = $5,440,000/year total failure costs. Target: reduce by 50% = $2,720,000 in annualized savings before program costs.",
                "ExhibitID": "CBQ5-D2-E2",
                "CaseID": "CBQ5-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The Six Sigma team is planning the DMAIC project. Match each DMAIC phase to the correct activity that PAC's team would perform during that phase.",
                "LeftItems": [
                    "Define - the team defines the problem, project scope, and customer requirements",
                    "Measure - the team collects baseline data and measures current process performance",
                    "Analyze - the team identifies root causes of defects and process variation",
                    "Improve - the team develops and implements solutions to address root causes",
                    "Control - the team monitors the improved process to sustain gains"
                ],
                "RightItems": [
    "Collecting 90 days of production data showing that 85% of defects originate in the machining center's tolerance drift",
    "Designing a new brake caliper model with different specifications",
    "Implementing a weekly SPC review meeting and a monthly audit to ensure the temperature control system remains calibrated and operators follow the new procedure",
    "Documenting that the brake caliper defect rate is 6,210 ppm and setting a target of reducing it to 3,100 ppm within 12 months",
    "Installing temperature control sensors on the machining center and implementing a statistical process control (SPC) chart for real-time bore diameter monitoring",
    "Using a cause-and-effect diagram and hypothesis testing to determine that coolant temperature variation is the primary root cause of bore diameter defects"
],
                "Correct": {
                    "Define - the team defines the problem, project scope, and customer requirements": "Documenting that the brake caliper defect rate is 6,210 ppm and setting a target of reducing it to 3,100 ppm within 12 months",
                    "Measure - the team collects baseline data and measures current process performance": "Collecting 90 days of production data showing that 85% of defects originate in the machining center's tolerance drift",
                    "Analyze - the team identifies root causes of defects and process variation": "Using a cause-and-effect diagram and hypothesis testing to determine that coolant temperature variation is the primary root cause of bore diameter defects",
                    "Improve - the team develops and implements solutions to address root causes": "Installing temperature control sensors on the machining center and implementing a statistical process control (SPC) chart for real-time bore diameter monitoring",
                    "Control - the team monitors the improved process to sustain gains": "Implementing a weekly SPC review meeting and a monthly audit to ensure the temperature control system remains calibrated and operators follow the new procedure"
                },
                "Explanation": "Define sets the project charter and targets. Measure establishes the baseline and data collection. Analyze uses statistical tools to identify root causes. Improve implements solutions targeting those root causes. Control uses monitoring and documentation to sustain improvements. Designing a new product model is not part of DMAIC for an existing process improvement project; DMAIC improves existing processes, while DMADV (Design for Six Sigma) is used for new product/process design.",
                "Topic": "DMAIC phases and their application in manufacturing",
                "ItemID": "CBQ5-D2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "DMAIC (Define, Measure, Analyze, Improve, Control) is the core Six Sigma methodology for improving existing processes. It is a data-driven, structured approach to problem-solving that aims to reduce process variation and defects.",
                "BusinessInterpretation": "DMAIC projects typically take 4-6 months to complete. The Control phase is often neglected but is critical for sustaining improvements - without it, processes tend to revert to their pre-improvement performance within 6-12 months.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "The quality director needs to explain the cost of quality (COQ) categories to senior management. Match each quality cost item from Exhibit 1 to its correct COQ classification.",
                "LeftItems": [
                    "Employee quality training and certification programs costing $180,000 per quarter",
                    "Inline quality checks during production costing $210,000 per quarter",
                    "Scrapped materials and rework labor from defective brake calipers costing $420,000 per quarter",
                    "Customer warranty claims for field failures costing $580,000 per quarter"
                ],
                "RightItems": [
    "Appraisal cost - costs of measuring, inspecting, and testing products to ensure they meet quality standards",
    "Prevention cost - costs incurred to prevent defects from occurring in the first place; proactive spending that reduces all other quality costs",
    "External failure cost - costs of defects discovered AFTER the product reaches the customer; includes warranty claims, returns, and lost reputation",
    "Internal failure cost - costs of defects discovered BEFORE the product reaches the customer; includes scrap, rework, and downtime",
    "Design cost - costs of developing new products and features"
],
                "Correct": {
                    "Employee quality training and certification programs costing $180,000 per quarter": "Prevention cost - costs incurred to prevent defects from occurring in the first place; proactive spending that reduces all other quality costs",
                    "Inline quality checks during production costing $210,000 per quarter": "Appraisal cost - costs of measuring, inspecting, and testing products to ensure they meet quality standards",
                    "Scrapped materials and rework labor from defective brake calipers costing $420,000 per quarter": "Internal failure cost - costs of defects discovered BEFORE the product reaches the customer; includes scrap, rework, and downtime",
                    "Customer warranty claims for field failures costing $580,000 per quarter": "External failure cost - costs of defects discovered AFTER the product reaches the customer; includes warranty claims, returns, and lost reputation"
                },
                "Explanation": "The four COQ categories form a hierarchy. Prevention costs (training, design reviews) are proactive investments that reduce defects. Appraisal costs (inspection, testing) detect defects before products ship. Internal failure costs (scrap, rework) occur when defects are caught internally. External failure costs (warranty, returns) are the most expensive because they include reputational damage and lost future sales. The classic quality cost model shows that every dollar invested in prevention can save $10-$100 in failure costs.",
                "Topic": "Cost of quality - prevention, appraisal, internal failure, external failure",
                "ItemID": "CBQ5-D2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The cost of quality (COQ) framework classifies quality-related costs into four categories. The optimal quality investment level is where the marginal cost of prevention and appraisal equals the marginal benefit from reduced failure costs - typically well below zero defects in practice.",
                "BusinessInterpretation": "PAC's COQ report shows a classic imbalance: failure costs (68% of total quality costs) far exceed prevention costs (15%). This is typical of companies in the early stages of quality maturity. The Six Sigma investment aims to shift spending toward prevention, which will reduce total quality costs over time.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "numeric",
                "Prompt": "Using Exhibit 2 data, calculate the total annual net savings expected from the Six Sigma initiative after subtracting the program budget. Assume the target of 50% reduction in failure costs is achieved and all other costs remain constant. (Enter your answer as a positive whole number.)",
                "Correct": 2320000,
                "Explanation": "Total annualized failure costs = Internal Failure ($530,000/quarter x 4 = $2,120,000) + External Failure ($830,000/quarter x 4 = $3,320,000) = $5,440,000. Target reduction: 50% x $5,440,000 = $2,720,000 in annualized savings. Net savings = $2,720,000 - $400,000 program budget = $2,320,000 per year. The Six Sigma initiative generates a net positive return even in the first year, with an ROI of ($2,720,000 - $400,000) / $400,000 = 580%. In subsequent years, the full $2,720,000 savings would be realized with no program cost.",
                "Topic": "Six Sigma financial justification - net savings calculation",
                "ItemID": "CBQ5-D2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Cost-benefit analysis for quality initiatives compares the expected reduction in failure costs against the investment in prevention and appraisal activities. The net present value (NPV) of quality improvement projects is typically strongly positive when failure costs are high.",
                "BusinessInterpretation": "The 580% first-year ROI is realistic for companies with high failure costs implementing Six Sigma for the first time. Industry benchmarks suggest that Six Sigma initiatives at companies with immature quality systems typically achieve 4:1 to 10:1 returns in the first year.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-D2",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "Which of the following best describes the relationship between prevention costs and total quality costs in the cost of quality (COQ) model?",
                "Correct": "Increasing prevention costs typically reduces total quality costs because the reduction in failure costs far exceeds the increase in prevention spending",
                "Choices": [
                    "Increasing prevention costs typically reduces total quality costs because the reduction in failure costs far exceeds the increase in prevention spending",
                    "Total quality costs are minimized when prevention costs are zero because prevention is always more expensive than letting defects occur",
                    "Prevention costs and total quality costs have no predictable relationship because quality is independent of cost",
                    "Increasing prevention costs always increases total quality costs because prevention is an additional expense that cannot offset failure costs"
                ],
                "Explanation": "The COQ model shows that investing in prevention (training, design reviews, process controls) reduces the incidence of defects, which dramatically lowers internal and external failure costs. Since failure costs typically represent 60-80% of total quality costs in an immature quality system, a relatively small increase in prevention spending can yield a large reduction in total quality costs. The optimal point is where the marginal cost of prevention equals the marginal reduction in failure costs, which in practice occurs well above zero prevention spending.",
                "Topic": "Cost of quality - prevention vs. failure cost trade-off",
                "ItemID": "CBQ5-D2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The economic conformance model (also called the Juran model) shows that total quality costs are minimized not at zero defects but at the point where the marginal cost of prevention/appraisal equals the marginal cost of failure. However, modern quality philosophy (Taguchi, Deming) argues for continuous improvement toward zero defects.",
                "BusinessInterpretation": "PAC's current spending is heavily weighted toward failure costs (68%). Increasing prevention spending from 15% to 25-30% of total quality costs would likely reduce total quality costs by 30-40% over 12-24 months. This is the fundamental economic argument for investing in Six Sigma.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D2",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "multi",
                "Prompt": "The quality director is preparing a presentation to justify the Six Sigma program to the board. Which of the following statements are valid conclusions based on the data and analysis? Select all that apply.",
                "Correct": [
                    "The Six Sigma initiative has a first-year ROI exceeding 500%, making it a financially compelling investment",
                    "External failure costs ($830,000/quarter) represent the largest category of quality costs and offer the greatest savings opportunity",
                    "A 50% reduction in failure costs would reduce total quarterly quality costs from $2,015,000 to approximately $1,335,000, assuming prevention and appraisal costs remain constant",
                    "The current cost structure shows that PAC is spending significantly more on fixing defects than on preventing them, which is typical of a reactive quality culture"
                ],
                "Explanation": "All four statements are correct. (1) ROI = ($2,720,000 savings - $400,000 cost) / $400,000 = 580%. (2) External failure costs at $830,000/quarter (41% of total) represent the largest quality cost category. (3) Current quarterly failure costs = Internal Failure ($530,000) + External Failure ($830,000) = $1,360,000. A 50% reduction saves $680,000/quarter, reducing total quality costs from $2,015,000 to $1,335,000. (4) PAC spends only 15% on prevention vs 68% on failure costs, confirming a reactive quality culture. The statement suggesting focusing exclusively on appraisal costs is incorrect because appraisal costs detect defects but do not prevent them; the greatest leverage comes from prevention.",
                "Choices": [
                    "The Six Sigma initiative has a first-year ROI exceeding 500%, making it a financially compelling investment",
                    "External failure costs ($830,000/quarter) represent the largest single category of quality costs and offer the greatest savings opportunity",
                    "A 50% reduction in failure costs would reduce total quarterly quality costs from $2,015,000 to approximately $1,335,000, assuming prevention and appraisal costs remain constant",
                    "The current cost structure shows that PAC is spending significantly more on fixing defects than on preventing them, which is typical of a reactive quality culture",
                    "The Six Sigma program should focus exclusively on reducing appraisal costs since they are the second-largest category"
                ],
                "ItemID": "CBQ5-D2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Cost of quality analysis enables management to quantify the financial impact of quality problems and justify investments in prevention. The goal is to minimize total quality costs by finding the optimal balance between prevention/appraisal and failure costs.",
                "BusinessInterpretation": "The board presentation should emphasize that the $400,000 investment generates a 580% ROI in year one and ongoing savings in subsequent years. Quality improvement is not just an operational initiative but a significant value-creation opportunity.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-D2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-D3",
        "Title": "Transfer Pricing (Dual Pricing)",
        "SectionTags": [
            "D"
        ],
        "Pack": 5,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Transfer Pricing (Dual Pricing)"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Transfer Pricing (Dual Pricing)",
        "Subtopic": "Transfer pricing methods and goal congruence",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "IndusTech Manufacturing",
        "CompanyType": "Manufacturing",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Calculate the minimum transfer price using variable cost and opportunity cost analysis",
            "Evaluate transfer pricing methods for promoting goal congruence between divisions",
            "Compare market-based, cost-based, negotiated, and dual pricing approaches",
            "Analyze the advantages and disadvantages of dual pricing in a divisional structure",
            "Assess how transfer pricing decisions affect divisional performance evaluation and overall corporate profitability"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions"
            }
        ],
        "Stakeholder": "Corporate Controller",
        "Tags": [
            "transfer pricing",
            "dual pricing",
            "goal congruence",
            "divisional performance",
            "cost management"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "IndusTech Manufacturing has two divisions. Division A (Components) produces a specialized electronic component used in the company's final products. Division B (Assembly) assembles final products and sources components both internally and from external suppliers. Division A has annual production capacity of 50,000 units, currently selling 30,000 units per year externally at $75 per unit. Variable cost is $40 per unit, and fixed costs are $1,250,000 per year. Division B requires 15,000 additional components for a new product line and has received an external supplier quote of $70 per unit. Corporate management needs to establish a transfer pricing policy that promotes goal congruence, preserves divisional autonomy, and allows accurate performance evaluation.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Division A Cost and Capacity Data",
                "Headers": [
                    "Metric",
                    "Value"
                ],
                "Rows": [
                    [
                        "Annual production capacity",
                        "50,000 units"
                    ],
                    [
                        "Current external sales volume",
                        "30,000 units"
                    ],
                    [
                        "External market price per unit",
                        "$75"
                    ],
                    [
                        "Variable production cost per unit",
                        "$40"
                    ],
                    [
                        "Fixed manufacturing cost per unit (at capacity)",
                        "$25"
                    ],
                    [
                        "Fixed manufacturing costs per year",
                        "$1,250,000"
                    ],
                    [
                        "External supplier quote for Division B",
                        "$70 per unit"
                    ]
                ],
                "ExhibitID": "CBQ5-D3-E1",
                "CaseID": "CBQ5-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-D3-Q1",
                    "CBQ5-D3-Q2"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Transfer Pricing Policy Considerations",
                "Body": "IndusTech evaluates each division as a profit center. Managers are compensated on divisional profit. Four methods are under consideration: market-based (external market price), cost-based (production cost plus markup), negotiated (managers bargain for a price), and dual pricing (different prices for selling and buying divisions, with the difference eliminated in consolidation). The goal is to select a method aligning each division's decisions with maximizing total corporate profit.",
                "ExhibitID": "CBQ5-D3-E2",
                "CaseID": "CBQ5-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-D3-Q3",
                    "CBQ5-D3-Q4",
                    "CBQ5-D3-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Assuming Division A has excess capacity to produce the 15,000 components needed by Division B and no external sales would be forgone, what is the minimum transfer price per unit Division A should charge? Enter your answer as a whole number.",
                "Correct": "40",
                "Explanation": "The minimum transfer price equals variable cost plus opportunity cost. With excess capacity of 20,000 units (50,000 capacity minus 30,000 external sales), producing 15,000 for Division B does not require sacrificing external sales. Opportunity cost is $0, so minimum transfer price is $40 per unit (variable cost). At full capacity, the minimum would be $75 (market price), reflecting forgone external sales. The external supplier quote of $70 is a ceiling for negotiations but irrelevant to Division A's minimum.",
                "Topic": "Transfer Pricing (Dual Pricing)",
                "ItemID": "CBQ5-D3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The minimum transfer price = outlay cost (variable cost per unit) + opportunity cost (contribution margin on forgone external sales). When excess capacity exists, opportunity cost is zero, so the minimum is variable cost per unit.",
                "BusinessInterpretation": "Division A can accept any transfer price above $40 and improve profit. However, if the transfer price exceeds $70, Division B would buy externally, which may or may not benefit the company depending on capacity utilization.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-D3",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "Given that Division A has excess capacity and Division B has an external alternative at $70, which transfer pricing method best promotes goal congruence?",
                "Correct": "Dual pricing",
                "Explanation": "Dual pricing promotes goal congruence by giving each division a price aligned with its decisions. Division A records a cost-based price (variable cost $40), showing contribution on internal transfers. Division B records the market price ($75), making sourcing decisions based on economic cost. The difference is eliminated in consolidation. This avoids the conflict where market-based pricing ($75) incentivizes Division B to buy externally at $70 even when internal transfers benefit the company. Variable cost-only pricing doesn't let Division A recover fixed costs.",
                "Topic": "Transfer Pricing (Dual Pricing)",
                "Choices": [
                    "Dual pricing",
                    "Market-based pricing at $75 per unit",
                    "Full cost-plus pricing at $71.50 per unit",
                    "Variable cost-only pricing at $40 per unit",
                    "Negotiated pricing with no floor or ceiling"
                ],
                "ItemID": "CBQ5-D3-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Transfer pricing methods should align divisional incentives with corporate objectives. Dual pricing uses different prices for each division so the selling division recovers costs and the buying division makes market-based decisions, with differences eliminated in consolidation.",
                "BusinessInterpretation": "The behavioral impact of transfer pricing is critical. Even mathematically correct methods can fail if managers respond to performance evaluation incentives in ways that undermine corporate goals.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D3",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "match",
                "Prompt": "Match each transfer pricing method to the scenario where it would be most appropriate.",
                "Correct": {
                    "Market-based": "An active external market exists and divisions operate as independent profit centers",
                    "Cost-based": "No reliable market price exists and company wants simplicity in administration",
                    "Negotiated": "Divisions have equal bargaining power and management encourages autonomy",
                    "Dual pricing": "Divisions have conflicting objectives and corporate wants goal congruence"
                },
                "Topic": "Transfer Pricing (Dual Pricing)",
                "LeftItems": [
                    "Market-based",
                    "Cost-based",
                    "Negotiated",
                    "Dual pricing"
                ],
                "RightItems": [
    "Divisions have equal bargaining power and management encourages autonomy",
    "Division has no excess capacity and full external market demand exists",
    "Divisions have conflicting objectives and corporate wants goal congruence",
    "An active external market exists and divisions operate as independent profit centers",
    "No reliable market price exists and company wants simplicity in administration"
],
                "ItemID": "CBQ5-D3-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "Explanation": "Market-based pricing is ideal when an active external market exists. Cost-based pricing is simplest when no market price is available. Negotiated pricing works when divisions have balanced bargaining power. Dual pricing resolves conflict by providing different prices to each division and is best when divisions have conflicting objectives.",
                "AccountingPrinciple": "Each transfer pricing method suits different contexts. Market-based works with competitive external markets. Cost-based is useful when market prices are unavailable. Negotiated preserves autonomy but requires balanced bargaining power. Dual pricing resolves conflicts by providing different prices to each division.",
                "BusinessInterpretation": "No single transfer pricing method is universally optimal. Management must weigh simplicity, fairness, and behavioral incentives based on the specific operational context.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D3",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "Which of the following best describes dual pricing?",
                "Correct": "Dual pricing records the transfer at a cost-based price for the selling division and a market-based price for the buying division, with the difference eliminated in corporate consolidation",
                "Explanation": "Dual pricing uses two different prices for the same transaction: the selling division records a cost-based price (e.g., variable cost) while the buying division records a market-based price. This provides appropriate incentives to both divisions and addresses suboptimization. The difference is eliminated during consolidation. A disadvantage is that combined divisional profits exceed corporate profits before elimination, which can confuse performance evaluation.",
                "Topic": "Transfer Pricing (Dual Pricing)",
                "Choices": [
                    "Dual pricing records the transfer at a cost-based price for the selling division and a market-based price for the buying division, with the difference eliminated in corporate consolidation",
                    "Dual pricing requires both divisions to use the same transfer price for consistency in financial reporting",
                    "Dual pricing is most effective when divisions are evaluated as cost centers rather than profit centers",
                    "Dual pricing allows managers to select either market or cost pricing for their division individually"
                ],
                "ItemID": "CBQ5-D3-Q4",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Dual pricing is a sophisticated approach using two prices for the same transaction. It requires corporate-level elimination entries and is designed to address goal congruence problems when a single transfer price cannot provide appropriate incentives to both divisions.",
                "BusinessInterpretation": "While dual pricing promotes goal congruence, it complicates performance evaluation because the sum of divisional profits exceeds corporate profit before elimination. Managers may become confused about true divisional profitability.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D3",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "multi",
                "Prompt": "Which of the following statements about transfer pricing at IndusTech are valid conclusions? (Select all that apply.)",
                "Correct": [
                    "If Division A were at full capacity, the minimum transfer price would be $75 per unit to reflect forgone external sales",
                    "From a corporate perspective, internal transfers benefit the company as long as the transfer price exceeds Division A's variable cost of $40 when excess capacity exists",
                    "Dual pricing can resolve the conflict where market-based pricing would incentivize Division B to buy externally even when internal transfers benefit the overall company"
                ],
                "Explanation": "At full capacity, the $75 market price becomes the opportunity cost, making $75 the minimum transfer price. With excess capacity, any transfer price above $40 contributes to fixed cost recovery and corporate profit. Dual pricing resolves the specific conflict where Division B sees $75 vs $70 external and prefers external purchasing, while internal production at $40 variable cost benefits the company. The statement about negotiated pricing always being fairest is incorrect because outcomes depend on relative bargaining power. Claiming market-based pricing eliminates all disputes is false because market prices fluctuate and disagreements arise over what constitutes the market price.",
                "Topic": "Transfer Pricing (Dual Pricing)",
                "Choices": [
                    "If Division A were at full capacity, the minimum transfer price would be $75 per unit to reflect forgone external sales",
                    "From a corporate perspective, internal transfers benefit the company as long as the transfer price exceeds Division A's variable cost of $40 when excess capacity exists",
                    "Dual pricing can resolve the conflict where market-based pricing would incentivize Division B to buy externally even when internal transfers benefit the overall company",
                    "Negotiated pricing is always the fairest method because it allows both divisions to reach a mutually agreeable price",
                    "Market-based pricing eliminates all transfer pricing disputes because it uses an objective external benchmark",
                    "Segment margin is equally reliable under all transfer pricing methods for evaluating divisional performance"
                ],
                "ItemID": "CBQ5-D3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Transfer pricing affects divisional performance evaluation, tax burden, segment reporting, and managerial behavior. The optimal transfer price balances accurate performance measurement with company-wide profit maximization.",
                "BusinessInterpretation": "Management must consider both quantitative and qualitative factors including divisional autonomy, managerial incentives, and corporate culture when selecting a transfer pricing method.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-D3",
                "EstimatedMinutes": 8,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-E1",
        "Title": "Internal Auditing Standards",
        "SectionTags": [
            "E"
        ],
        "Pack": 5,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Internal Auditing Standards"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Internal Auditing Standards",
        "Subtopic": "IIA Standards framework and internal audit governance",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "First Continental Bank",
        "CompanyType": "Financial institution",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Banking",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Classify IIA Standards into Attribute, Performance, and Implementation categories",
            "Evaluate the independence and objectivity requirements for internal audit activities",
            "Analyze the essential components of an internal audit charter under IIA Standards",
            "Assess the requirements of a quality assurance and improvement program under IIA Standards",
            "Determine appropriate reporting relationships to ensure internal audit effectiveness and organizational independence"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions covering IIA Standards"
            }
        ],
        "Stakeholder": "Chief Audit Executive",
        "Tags": [
            "IIA Standards",
            "internal audit",
            "audit charter",
            "independence",
            "objectivity",
            "quality assurance"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "First Continental Bank is a regional financial institution with $15 billion in assets. Following a recent regulatory examination, the Federal Reserve identified deficiencies in the bank's internal audit function, including a lack of adherence to the IIA International Professional Practices Framework (IPPF). The Chief Audit Executive (CAE) has been directed by the Audit Committee to fully implement the IIA Standards within six months. The CAE must revise the internal audit charter, restructure the audit department's reporting relationships, and establish a quality assurance and improvement program. The internal audit department currently has 12 staff members who report administratively to the CFO and functionally to the Audit Committee. The regulatory examiners noted that the internal audit department had performed consulting engagements for the lending department, which they deemed a threat to objectivity.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - IIA Standards Categories",
                "Headers": [
                    "Category",
                    "Standard Number",
                    "Description"
                ],
                "Rows": [
                    [
                        "Attribute Standards",
                        "1000",
                        "Purpose, Authority, and Responsibility: charter must define audit activity's purpose, authority, and responsibility"
                    ],
                    [
                        "Attribute Standards",
                        "1100",
                        "Independence and Objectivity: internal audit activity must be independent and auditors must be objective"
                    ],
                    [
                        "Attribute Standards",
                        "1200",
                        "Proficiency and Due Professional Care: engagements must be performed with proficiency and due professional care"
                    ],
                    [
                        "Performance Standards",
                        "2000",
                        "Managing the Internal Audit Activity: CAE must manage the activity to ensure it adds value"
                    ],
                    [
                        "Performance Standards",
                        "2100",
                        "Nature of Work: evaluate and contribute to improvement of governance, risk management, and control"
                    ],
                    [
                        "Performance Standards",
                        "2200",
                        "Engagement Planning: auditors must develop and document a plan for each engagement"
                    ],
                    [
                        "Implementation Standards",
                        "1000.A1",
                        "The charter must include the nature of assurance services provided"
                    ],
                    [
                        "Implementation Standards",
                        "1000.C1",
                        "The nature of consulting services provided must be defined in the audit charter"
                    ]
                ],
                "ExhibitID": "CBQ5-E1-E1",
                "CaseID": "CBQ5-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-E1-Q1",
                    "CBQ5-E1-Q2"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Internal Audit Charter and Reporting Structure",
                "Body": "The IIA Standards require the internal audit charter to be approved by the board or audit committee. The charter must define purpose, authority, and responsibility; establish the CAE's functional reporting to the board and administrative reporting to the CEO; authorize access to records, personnel, and physical properties; and define the scope of assurance and consulting services. The audit committee approved a revised charter establishing the CAE's functional reporting to the Audit Committee and administrative reporting to the CEO, with a direct communication line to the Audit Committee chair. The charter prohibits internal auditors from assuming operational responsibilities or performing audit work in areas where they held operational roles within the past 12 months.",
                "ExhibitID": "CBQ5-E1-E2",
                "CaseID": "CBQ5-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-E1-Q3",
                    "CBQ5-E1-Q4",
                    "CBQ5-E1-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Match each IIA Standard category to the type of guidance it provides.",
                "Correct": {
                    "Attribute Standards": "Define the characteristics and capabilities required for internal audit activities and individuals",
                    "Performance Standards": "Describe the nature of internal audit work and quality criteria for measuring performance",
                    "Implementation Standards": "Apply Attribute and Performance Standards to specific engagement types such as assurance or consulting"
                },
                "Topic": "Internal Auditing Standards",
                "LeftItems": [
                    "Attribute Standards",
                    "Performance Standards",
                    "Implementation Standards"
                ],
                "RightItems": [
    "Apply Attribute and Performance Standards to specific engagement types such as assurance or consulting",
    "Define the characteristics and capabilities required for internal audit activities and individuals",
    "Describe the nature of internal audit work and quality criteria for measuring performance",
    "Establish the ethical requirements for internal audit professionals including integrity and confidentiality"
],
                "ItemID": "CBQ5-E1-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "Explanation": "Attribute Standards define the characteristics required for internal audit activities. Performance Standards describe the nature of internal audit work. Implementation Standards adapt Attribute and Performance Standards to specific engagement types such as assurance or consulting. The fourth option describes the Code of Ethics, which is a separate IIA framework.",
                "AccountingPrinciple": "The IIA Standards framework is structured hierarchically: Attribute Standards define who internal auditors must be, Performance Standards define what they must do, Implementation Standards adapt requirements to specific engagement types.",
                "BusinessInterpretation": "Understanding the IIA Standards categories helps audit committees and management evaluate whether the internal audit function operates in accordance with professional best practices.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "The internal audit department previously performed consulting engagements for the lending department. Based on IIA Standards, which action is MOST critical for preserving objectivity?",
                "Correct": "Prohibit internal auditors from performing assurance engagements in the lending department for a reasonable period after performing consulting work there",
                "Explanation": "IIA Standard 1130 addresses impairment to objectivity: internal auditors must not assume operational responsibility for activities they previously audited or consulted on. Consulting for the lending department creates a familiarity threat that could impair objectivity if the same auditors later perform assurance over those processes. A cooling-off period is the appropriate safeguard. Pre-approval by the Audit Committee improves governance but does not directly address the objectivity threat. Reporting in minutes ensures transparency but does not mitigate the impairment.",
                "Topic": "Internal Auditing Standards",
                "Choices": [
                    "Prohibit internal auditors from performing assurance engagements in the lending department for a reasonable period after performing consulting work there",
                    "Require the Audit Committee to pre-approve all consulting engagements before they are initiated",
                    "Report the lending department consulting engagements in the next audit committee meeting minutes",
                    "Discontinue all consulting engagements at the bank to avoid any appearance of impartiality"
                ],
                "ItemID": "CBQ5-E1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Objectivity requires internal auditors to maintain an impartial attitude. Consulting in an area later subject to assurance creates a self-review threat. IIA Standards require safeguards including cooling-off periods or using different auditors for assurance work.",
                "BusinessInterpretation": "Even if objectivity is not actually impaired, the appearance of impairment can undermine audit committee and regulator confidence in audit findings.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E1",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "The CAE has drafted a revised internal audit charter for Audit Committee approval. Based on IIA Standards, which elements MUST be included? (Select all that apply.)",
                "Correct": [
                    "The internal audit activity's purpose, authority, and responsibility",
                    "The CAE's functional and administrative reporting relationships",
                    "The scope of internal audit activities including assurance and consulting services"
                ],
                "Explanation": "Under IIA Standard 1000, the charter must define purpose, authority, and responsibility. It must establish reporting relationships (functional to the board, administrative to management) and define the scope of activities. While periodic review is recommended, specific duration (e.g., annual) is not mandated. Audit methodology belongs in procedures, not the charter. External auditor rotation is governed by other regulations like SOX.",
                "Topic": "Internal Auditing Standards",
                "Choices": [
                    "The internal audit activity's purpose, authority, and responsibility",
                    "The CAE's functional and administrative reporting relationships",
                    "The scope of internal audit activities including assurance and consulting services",
                    "A requirement that the charter be reviewed and approved by the board annually",
                    "The specific audit methodology and risk assessment procedures to be used"
                ],
                "ItemID": "CBQ5-E1-Q3",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The internal audit charter is the foundational governance document. IIA Standard 1000 specifies mandatory content, while 1000.A1 and 1000.C1 require assurance and consulting services to be defined separately.",
                "BusinessInterpretation": "A well-drafted charter provides the CAE with clear authority to access information and protects internal audit from management pressure by establishing direct audit committee access.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "Under the IIA Standards, which reporting structure best supports internal audit independence at First Continental Bank?",
                "Correct": "CAE reports functionally to the Audit Committee and administratively to the CEO, with direct access to the Audit Committee chair for sensitive matters",
                "Explanation": "IIA Standard 1110 requires the CAE to report functionally to the board (or audit committee) and administratively to the CEO. Functional reporting includes board approval of the audit plan, budget, and CAE appointment/removal. Administrative reporting covers day-to-day operations. The CAE must have direct communication with the board. Reporting to the CFO (the current structure) impairs independence because the internal audit function would be auditing processes managed by the CFO's organization.",
                "Topic": "Internal Auditing Standards",
                "Choices": [
                    "CAE reports functionally to the Audit Committee and administratively to the CEO, with direct access to the Audit Committee chair for sensitive matters",
                    "CAE reports functionally and administratively to the CFO, who has operational responsibility for financial reporting and accounting processes",
                    "CAE reports administratively to the Audit Committee and functionally to the CEO, maintaining independence through operational separation",
                    "CAE reports to the Chief Risk Officer since risk management and internal audit have complementary functions in the bank"
                ],
                "ItemID": "CBQ5-E1-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "IIA Standard 1110 requires the CAE to report functionally to the board for independence. Administrative reporting to management is acceptable for operational purposes, but functional reporting to management impairs organizational independence.",
                "BusinessInterpretation": "The regulatory finding about reporting to the CFO is a common deficiency. Many organizations restructure internal audit reporting to the audit committee as a first step in remediating independence concerns.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "The CAE needs to establish a Quality Assurance and Improvement Program (QAIP) under IIA Standards. Which of the following are required QAIP components? (Select all that apply.)",
                "Correct": [
                    "Ongoing internal monitoring of internal audit performance through project supervision and feedback",
                    "Periodic external assessments conducted at least once every five years by an independent reviewer",
                    "Internal self-assessments covering the internal audit activity's compliance with the Standards"
                ],
                "Explanation": "IIA Standard 1300 requires a QAIP covering all aspects of internal audit. It must include ongoing internal monitoring (project supervision, feedback, metrics), periodic internal self-assessments, and external assessments at least every five years by an independent qualified reviewer or assessment team. Performance metrics for individual auditors is an HR matter, not a QAIP requirement. Benchmarking against other audit functions is recommended best practice but not a mandatory QAIP component.",
                "Topic": "Internal Auditing Standards",
                "Choices": [
                    "Ongoing internal monitoring of internal audit performance through project supervision and feedback",
                    "Periodic external assessments conducted at least once every five years by an independent reviewer",
                    "Internal self-assessments covering the internal audit activity's compliance with the Standards",
                    "Annual performance metrics for each individual internal auditor for compensation purposes",
                    "Quarterly benchmarking of the internal audit activity against peer financial institutions"
                ],
                "ItemID": "CBQ5-E1-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "IIA Standard 1300 requires a QAIP including ongoing internal monitoring, periodic self-assessments, and external assessments every five years by an independent reviewer. The QAIP ensures the audit activity adds value and operates in conformance with Standards.",
                "BusinessInterpretation": "External assessments are a key regulatory expectation for internal audit functions at financial institutions. The CAE should plan for the cost and coordination of the five-year external assessment as part of the QAIP.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-E2",
        "Title": "Cybersecurity and Malware",
        "SectionTags": [
            "E"
        ],
        "Pack": 5,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Cybersecurity and Malware"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Cybersecurity and Malware",
        "Subtopic": "Malware types, incident response, and cybersecurity controls",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Information security and internal audit",
        "CompanyName": "Coastal Community Health System",
        "CompanyType": "Healthcare",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Healthcare",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze different types of malware including ransomware, trojans, phishing, and DDoS and their impact on internal controls",
            "Apply knowledge of malware characteristics to identify the most likely attack vector and appropriate response",
            "Evaluate cybersecurity controls across preventive, detective, and corrective categories",
            "Calculate the financial impact of a cybersecurity incident and assess the cost-effectiveness of control investments",
            "Analyze governance and control framework requirements for cybersecurity incident response and recovery"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions covering cybersecurity and malware"
            }
        ],
        "Stakeholder": "Chief Information Security Officer",
        "Tags": [
            "cybersecurity",
            "malware",
            "ransomware",
            "phishing",
            "incident response",
            "internal controls",
            "NIST"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Coastal Community Health System (CCHS) is a regional healthcare network with 3 hospitals, 28 outpatient clinics, and 12,000 employees serving 450,000 patients annually. The IT environment includes an electronic health records (EHR) system, patient billing and claims processing, laboratory information system, and interconnected medical devices. At 3:15 AM on a Tuesday, the IT operations team detected unusual encrypted file extensions appearing on the file server. By 6:00 AM, the EHR system was inaccessible, patient scheduling was disrupted, and ransom notes appeared on 2,400 workstations demanding 150 Bitcoin ($9.8 million equivalent) for decryption keys. A subsequent investigation revealed that an employee in the billing department clicked a phishing email containing a malicious attachment 72 hours earlier, which installed a remote access trojan. The trojan remained dormant for 48 hours while exfiltrating credentials, then deployed ransomware across the network. The incident resulted in 22 days of system downtime, diversion of emergency patients to other hospitals, and estimated financial losses of $18.2 million including ransom negotiation, system restoration, lost revenue, regulatory fines, and legal costs.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Malware Types and Incident Timeline",
                "Headers": [
                    "Malware Type",
                    "Method of Delivery",
                    "Primary Impact",
                    "Indicators of Compromise"
                ],
                "Rows": [
                    [
                        "Phishing email",
                        "Social engineering via deceptive email with malicious attachment",
                        "Initial access vector - bypassed human controls",
                        "Spoofed sender domain, urgent language, mismatched URL and link text"
                    ],
                    [
                        "Remote Access Trojan (RAT)",
                        "Disguised as an invoice PDF attachment; user double-clicked to install",
                        "Credential harvesting, persistent backdoor access, network reconnaissance",
                        "Unexpected outbound traffic, unusual process execution, registry changes"
                    ],
                    [
                        "Ransomware",
                        "Deployed via RAT after credential escalation; encrypted files across mapped drives",
                        "Encrypted EHR, file servers, and workstations; 22-day operational outage",
                        "Mass file renaming (.encrypted extension), ransom notes, file share encryption events"
                    ],
                    [
                        "DDoS (distraction attack)",
                        "Coordinated traffic flood targeting the public-facing patient portal",
                        "Patient portal unavailable during initial response; diverted IT attention from the ransomware",
                        "5x normal traffic volume from distributed IP addresses, portal timeout errors"
                    ]
                ],
                "ExhibitID": "CBQ5-E2-E1",
                "CaseID": "CBQ5-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-E2-Q1",
                    "CBQ5-E2-Q2",
                    "CBQ5-E2-Q5"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Cybersecurity Control Assessment",
                "Body": "Post-incident assessment identified these control gaps: (1) No mandatory cybersecurity awareness training for staff — phishing simulation had never been conducted. (2) Multi-factor authentication (MFA) was implemented for remote VPN access but not for internal system access, EHR access, or privileged administrative accounts. (3) Endpoint detection and response (EDR) software was installed on only 40% of workstations; the remaining 60% had only basic antivirus. (4) Network segmentation between the billing department workstations and the EHR server was inadequate — once the billing workstation was compromised, lateral movement to the EHR was unrestricted. (5) The backup strategy used daily backups to a network-attached storage device on the same network segment as production systems — ransomware encrypted both production and backup files. (6) The incident response plan had not been updated in 3 years and did not include specific ransomware containment procedures, communication protocols, or regulatory notification requirements.",
                "ExhibitID": "CBQ5-E2-E2",
                "CaseID": "CBQ5-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-E2-Q3",
                    "CBQ5-E2-Q4",
                    "CBQ5-E2-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The CISO is preparing an incident report for the board. Match each cybersecurity threat type to its role in the CCHS incident.",
                "Correct": {
                    "Phishing email": "The initial attack vector — a deceptive email with a malicious attachment bypassed human controls and delivered the trojan to the billing workstation",
                    "Remote Access Trojan (RAT)": "The persistence mechanism — remained undetected for 48 hours, exfiltrated credentials, and provided remote access for lateral movement",
                    "Ransomware": "The final payload — encrypted files across the network causing a 22-day operational outage and $18.2 million in estimated losses",
                    "DDoS (distraction attack)": "A coordinated traffic flood against the patient portal designed to divert IT resources during the ransomware deployment"
                },
                "Explanation": "The phishing email was the initial attack vector that bypassed human controls (no security awareness training had been conducted, per Exhibit 2). The RAT provided persistence — it allowed attackers to maintain access, harvest credentials, and conduct reconnaissance before deploying ransomware. Ransomware was the final destructive payload causing the $18.2 million in losses. The DDoS attack on the patient portal likely served as a distraction to occupy IT resources while ransomware encrypted systems — this is a common multi-vector attack pattern. Understanding each threat's role in the kill chain is critical for designing layered controls at each stage.",
                "Topic": "Cybersecurity and Malware",
                "LeftItems": [
                    "Phishing email",
                    "Remote Access Trojan (RAT)",
                    "Ransomware",
                    "DDoS (distraction attack)"
                ],
                "RightItems": [
    "The final payload — encrypted files across the network causing a 22-day operational outage and $18.2 million in estimated losses",
    "The initial attack vector — a deceptive email with a malicious attachment bypassed human controls and delivered the trojan to the billing workstation",
    "A coordinated traffic flood against the patient portal designed to divert IT resources during the ransomware deployment",
    "The persistence mechanism — remained undetected for 48 hours, exfiltrated credentials, and provided remote access for lateral movement",
    "A vulnerability scanning tool that identifies missing security patches across network devices and servers"
],
                "ItemID": "CBQ5-E2-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The COSO internal control framework applies to cybersecurity as a category of control activities. Preventive controls (awareness training, MFA, EDR) aim to stop attacks. Detective controls (monitoring, endpoint detection) identify active threats. Corrective controls (backups, incident response) limit damage after an incident.",
                "BusinessInterpretation": "Healthcare organizations are prime ransomware targets due to the criticality of patient data and operational dependence on EHR availability. The $18.2 million loss includes direct costs (ransom, restoration) and indirect costs (lost revenue, regulatory fines, reputational damage). Management accountants should ensure cybersecurity risk is quantified in ERM assessments.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "Based on the incident timeline, which control failure was the MOST critical enabler of the ransomware attack at CCHS?",
                "Correct": "Lack of mandatory cybersecurity awareness training — the phishing email was the initial attack vector, and without training, the employee had no basis to recognize the social engineering indicators",
                "Explanation": "The entire attack chain began with a phishing email that succeeded because no security awareness training had been conducted. While MFA, EDR, and network segmentation gaps all contributed to the severity, the root cause enabling the initial compromise was the human control failure — an untrained employee clicking a malicious attachment. Without the initial foothold, none of the later control gaps would have been exploited. MFA for internal systems would have reduced lateral movement, EDR on all workstations might have detected the RAT sooner, and network segmentation would have contained the ransomware. However, the most critical failure was the one that allowed the attack to begin.",
                "Topic": "Cybersecurity and Malware",
                "Choices": [
                    "Lack of mandatory cybersecurity awareness training — the phishing email was the initial attack vector, and without training, the employee had no basis to recognize the social engineering indicators",
                    "MFA was not applied to internal systems and privileged accounts — this allowed the RAT to escalate privileges after harvesting credentials from the billing workstation",
                    "EDR software was installed on only 40% of workstations — basic antivirus on the remaining 60% could not detect the RAT's credential-harvesting behavior before ransomware deployment",
                    "Backups were stored on the same network segment as production systems — this allowed ransomware to encrypt both source and backup files, preventing quick recovery"
                ],
                "ItemID": "CBQ5-E2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO framework emphasizes that the control environment — including the organization's commitment to competence and awareness — is the foundation for all other controls. A lack of security awareness training represents a control environment deficiency that undermines preventive controls.",
                "BusinessInterpretation": "The most cost-effective cybersecurity investment for most organizations is security awareness training. The IMA's guidance on cybersecurity recommends that management accountants advocate for a layered defense (defense-in-depth) where no single control failure can lead to catastrophic loss. Human controls (training) combined with technical controls (MFA, EDR, segmentation) create defense in depth.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Using Exhibit 2 data, the CISO proposes implementing MFA for all internal system access at a cost of $420,000 annually. Based on the incident, the probability of a similar attack in any given year without MFA is estimated at 12%, and with MFA it drops to 3%. Using expected value analysis, calculate the annual net benefit (or cost) of implementing MFA. The $18.2 million total loss is the exposure for a successful attack. Enter your answer as the nearest whole number in dollars. If the net benefit is negative, include the minus sign. Do not use commas or dollar signs.",
                "Correct": 1218000,
                "Explanation": "Expected loss without MFA: $18,200,000 x 12% = $2,184,000. Expected loss with MFA: $18,200,000 x 3% = $546,000. Risk reduction benefit: $2,184,000 - $546,000 = $1,638,000. Annual cost of MFA: $420,000. Net annual benefit: $1,638,000 - $420,000 = $1,218,000. The expected value analysis shows MFA provides a strongly positive net benefit, even before considering secondary benefits such as regulatory compliance, patient trust, and reduced insurance premiums. Answer: 1218000.",
                "Topic": "Cybersecurity and Malware",
                "Choices": [],
                "ItemID": "CBQ5-E2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Expected value analysis for cybersecurity investments: Annualized Loss Expectancy (ALE) = Single Loss Expectancy (SLE) x Annualized Rate of Occurrence (ARO). The risk reduction benefit equals the reduction in ALE from implementing the control. The net benefit is the risk reduction minus the annual control cost.",
                "BusinessInterpretation": "Management accountants should use expected value analysis to evaluate cybersecurity investments rather than relying solely on worst-case scenarios. The analysis shows MFA has a 3.9x return on investment ($1,638,000 benefit / $420,000 cost). In practice, most organizations find that preventive controls like MFA and awareness training have extremely favorable ROI compared to incident response and recovery costs.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-E2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "Based on Exhibit 2, which control improvements should CCHS implement to prevent a recurrence? (Select all that apply.)",
                "Correct": [
                    "Implement mandatory quarterly cybersecurity awareness training with phishing simulations for all employees to reduce the likelihood of successful social engineering attacks",
                    "Deploy endpoint detection and response (EDR) software on all workstations and servers to enable real-time threat detection and automated containment of malware",
                    "Implement network segmentation between administrative workstations and clinical systems to prevent lateral movement from compromised non-clinical devices to the EHR",
                    "Adopt the 3-2-1 backup strategy (3 copies, 2 media types, 1 offsite) with immutable or air-gapped backups to ensure recoverability even if ransomware penetrates the network"
                ],
                "Explanation": "All four controls address specific gaps identified in Exhibit 2: (1) Awareness training directly addresses the phishing root cause. (2) EDR on all endpoints provides detection capability that was missing on 60% of workstations. (3) Network segmentation would have prevented the RAT from moving from the billing workstation to the EHR server. (4) The 3-2-1 backup strategy with immutable/air-gapped backups ensures that even if ransomware reaches production systems, clean backups are available — addressing the single-network-segment backup failure. Writing incident reports without implementing root cause fixes does not prevent recurrence. Restricting internet access for all staff is impractical for healthcare operations where clinical staff need web access for research, drug databases, and telemedicine.",
                "Topic": "Cybersecurity and Malware",
                "Choices": [
                    "Implement mandatory quarterly cybersecurity awareness training with phishing simulations for all employees to reduce the likelihood of successful social engineering attacks",
                    "Deploy endpoint detection and response (EDR) software on all workstations and servers to enable real-time threat detection and automated containment of malware",
                    "Implement network segmentation between administrative workstations and clinical systems to prevent lateral movement from compromised non-clinical devices to the EHR",
                    "Adopt the 3-2-1 backup strategy (3 copies, 2 media types, 1 offsite) with immutable or air-gapped backups to ensure recoverability even if ransomware penetrates the network",
                    "Require all IT staff to write detailed post-incident reports for every security event to improve documentation and compliance with regulatory standards",
                    "Restrict all employee internet access to a pre-approved whitelist of healthcare websites to prevent any possible web-based attack vector"
                ],
                "ItemID": "CBQ5-E2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO framework's control activities component includes preventive controls (training, segmentation, backup strategy), detective controls (EDR, monitoring), and corrective controls (incident response, backup restoration). Defense in depth requires layers of controls so that failure of one layer does not compromise the entire system.",
                "BusinessInterpretation": "Management accountants should evaluate cybersecurity controls based on cost-effectiveness and alignment with the organization's risk appetite. The four selected controls address different layers of the kill chain: training (prevent initial access), EDR (detect and contain early), segmentation (limit blast radius), and backups (enable recovery). This layered approach is more effective than over-investing in any single control.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "The board asks whether paying the ransom was the right decision. Based on cybersecurity best practices and internal control principles, which response is MOST appropriate?",
                "Correct": "The decision to pay should be made collaboratively with law enforcement, cybersecurity experts, and legal counsel, considering data backups, decryption feasibility, and regulatory obligations — but prevention through layered controls is always the superior strategy",
                "Explanation": "Cybersecurity frameworks (NIST, COBIT) and law enforcement agencies (FBI, CISA) generally advise against paying ransoms because payments fund criminal enterprises and do not guarantee data recovery. However, the decision involves complex trade-offs including patient safety (access to health records), regulatory deadlines (HIPAA breach notification), and operational continuity. The best practice is a structured decision-making process involving all stakeholders. Preventive controls are always preferred because they avoid the ethical, financial, and operational dilemmas of ransom decisions. The statement that paying is always wrong oversimplifies the real-world decision. The statement that insurance makes it a business decision fails to account for ethical and legal considerations. The statement that the full ransom should always be paid immediately contradicts law enforcement guidance.",
                "Topic": "Cybersecurity and Malware",
                "Choices": [
                    "The decision to pay should be made collaboratively with law enforcement, cybersecurity experts, and legal counsel, considering data backups, decryption feasibility, and regulatory obligations — but prevention through layered controls is always the superior strategy",
                    "Paying the ransom is always wrong because it encourages further attacks; CCHS should restore from backups regardless of the time required, even if patient care is impacted",
                    "The ransom should always be paid immediately because the financial loss from extended downtime exceeds the ransom amount, and cyber insurance typically covers ransomware payments",
                    "The ransom should not be paid because HIPAA regulations prohibit healthcare organizations from making payments to cybercriminals under any circumstances"
                ],
                "ItemID": "CBQ5-E2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO ERM framework requires considering stakeholder interests, legal and regulatory compliance, and ethical values in risk response decisions. Cybersecurity incident response decisions involve complex trade-offs between financial, operational, legal, and ethical factors that should be governed by a pre-established incident response policy.",
                "BusinessInterpretation": "Management accountants should ensure that the organization has a pre-defined ransomware response policy approved by the board that addresses: when to involve law enforcement, the decision-making authority for ransom payment, communication protocols, regulatory notification timelines, and the role of cyber insurance. Having this policy in place before an incident is critical — making these decisions under 3 AM pressure without a framework is dangerous.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-E2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-E3",
        "Title": "Data Privacy Frameworks",
        "SectionTags": [
            "E"
        ],
        "Pack": 5,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Data Privacy Frameworks"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Data Privacy Frameworks",
        "Subtopic": "GDPR and CCPA compliance, data breach notification, data subject rights, and cross-border data transfer mechanisms",
        "SecondaryCompetencies": [
            "Calculation",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Compliance",
        "CompanyName": "DataBridge Solutions Inc.",
        "CompanyType": "Technology services",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 25,
        "ExhibitCount": 1,
        "Industry": "Technology",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Calculate GDPR administrative fine exposure using the tiered penalty framework",
            "Evaluate the expected value of privacy compliance program investments",
            "Identify GDPR data breach notification timelines and procedural requirements",
            "Distinguish between data subject rights under the GDPR",
            "Determine appropriate cross-border data transfer mechanisms under the GDPR"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full scenario authored — DataBridge Solutions GDPR/CCPA compliance analysis with calculation-based items and regulatory application"
            }
        ],
        "Stakeholder": "Management",
        "Tags": [
            "GDPR",
            "CCPA",
            "Data Privacy",
            "Compliance",
            "Data Breach"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "DataBridge Solutions Inc. is a mid-sized technology company headquartered in Chicago with 2,500 employees. It develops a customer analytics platform used by 600+ business clients across North America and Europe. The company recently expanded into the EU market, now processing data for approximately 15,000 EU data subjects, and serves 42,000 California consumers subject to the CCPA. The CFO has tasked the controller, Mia Chen, with evaluating the financial implications of GDPR and CCPA compliance requirements, assessing data breach exposure, and recommending an appropriate privacy compliance investment strategy. DataBridge currently has no dedicated privacy compliance program and relies on its general IT security policies. The board has asked for a cost-benefit analysis before approving a proposed compliance program budget.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "DataBridge Solutions — Selected Financial and Operational Data",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Global annual turnover",
                        "€800,000,000"
                    ],
                    [
                        "EU-derived revenue",
                        "€210,000,000"
                    ],
                    [
                        "California-derived revenue",
                        "$65,000,000"
                    ],
                    [
                        "Proposed annual privacy compliance program cost",
                        "€1,500,000"
                    ],
                    [
                        "Actuarial probability of material GDPR fine (without program)",
                        "30%"
                    ],
                    [
                        "Estimated average GDPR fine exposure (without program)",
                        "€8,000,000"
                    ],
                    [
                        "Probability of remediation and litigation costs (without program)",
                        "45%"
                    ],
                    [
                        "Estimated average remediation and litigation costs",
                        "€1,200,000"
                    ],
                    [
                        "Number of EU data subjects",
                        "15,200"
                    ],
                    [
                        "Number of California consumer records processed",
                        "42,000"
                    ],
                    [
                        "GDPR upper-tier fine maximum (fixed amount)",
                        "€20,000,000"
                    ],
                    [
                        "GDPR upper-tier fine rate",
                        "4% of global annual turnover"
                    ],
                    [
                        "GDPR lower-tier fine maximum (fixed amount)",
                        "€10,000,000"
                    ],
                    [
                        "GDPR lower-tier fine rate",
                        "2% of global annual turnover"
                    ]
                ],
                "ExhibitID": "CBQ5-E3-E1",
                "CaseID": "CBQ5-E3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-E3-Q1",
                    "CBQ5-E3-Q2"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "DataBridge Solutions Inc. has been found by a EU supervisory authority to have intentionally violated EU data subjects' rights under Article 83(5) of the GDPR. Based on the financial data provided in Exhibit 1, what is the maximum potential administrative fine DataBridge faces?",
                "Correct": "€32,000,000",
                "Explanation": "Under GDPR Article 83(5), for serious violations including infringement of data subject rights, the maximum fine is the higher of €20,000,000 or 4% of the undertaking's total worldwide annual turnover for the preceding financial year. DataBridge's global annual turnover is €800,000,000. 4% × €800,000,000 = €32,000,000. Since €32,000,000 exceeds €20,000,000, the maximum fine is €32,000,000.",
                "Topic": "Data Privacy Frameworks",
                "Choices": [
                    "€10,000,000",
                    "€16,000,000",
                    "€20,000,000",
                    "€32,000,000"
                ],
                "ItemID": "CBQ5-E3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "Terminology"
                ],
                "FormulaReferences": [
                    "Expected Value"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-E3",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "AccountingPrinciple": "Under GDPR Article 83(5), administrative fines for violations of data subject rights are assessed at the higher of €20,000,000 or 4% of total worldwide annual turnover. This tiered penalty structure creates a direct financial reporting and disclosure consideration: management must evaluate whether potential GDPR fine exposure constitutes a contingent liability requiring accrual or disclosure under IAS 37 / ASC 450. The 4% threshold means that large multinational companies face proportionally higher absolute exposure, which directly impacts risk assessment and compliance investment decisions.",
                "BusinessInterpretation": "For management accountants, this calculation demonstrates that GDPR fines scale with global revenue, not just EU revenue. A compliance program costing €1,500,000 annually must be evaluated against the expected value of fine exposure. The controller should ensure the board understands that GDPR exposure is a function of global turnover, making it a enterprise-wide risk rather than just a EU compliance issue. This analysis feeds directly into the risk assessment component of the COSO ERM framework.",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "Using the data in Exhibit 1, what is the expected annual net benefit (or cost) of implementing the proposed privacy compliance program? (Expected value of avoided losses minus program cost.)",
                "Correct": "€1,440,000",
                "Explanation": "Expected loss without the program = (30% × €8,000,000) + (45% × €1,200,000) = €2,400,000 + €540,000 = €2,940,000. The proposed program costs €1,500,000 annually. Expected net benefit = €2,940,000 − €1,500,000 = €1,440,000. Since the expected benefit is positive, the program is financially justified on an expected-value basis.",
                "Topic": "Data Privacy Frameworks",
                "Choices": [
                    "€1,500,000",
                    "€1,440,000",
                    "€2,400,000",
                    "€2,940,000"
                ],
                "ItemID": "CBQ5-E3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "DistractorSimilarity"
                ],
                "FormulaReferences": [
                    "Expected Value"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ5-E3",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "AccountingPrinciple": "Expected value analysis is a recognized risk quantification technique under both COSO ERM and management accounting best practices. The expected value of a compliance investment is computed as the probability-weighted average of avoided losses minus the cost of the investment. This approach aligns with IAS 37 provisions on recognizing provisions when a past event creates a probable outflow of resources, and informs the cost-benefit analysis that management accountants prepare for capital allocation decisions regarding compliance programs.",
                "BusinessInterpretation": "The controller should present this expected value analysis to the board alongside sensitivity analysis showing best-case and worst-case scenarios. A positive expected net benefit of €1,440,000 provides quantitative support for the compliance program investment. Management accountants should note that expected value is a planning tool — actual outcomes will vary — but it provides a rigorous framework for comparing investments with probabilistic outcomes, similar to capital budgeting under uncertainty.",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "DataBridge discovers that an employee inadvertently exposed a database containing personal data of 3,200 EU data subjects. Under the GDPR, within how many hours must DataBridge notify the appropriate supervisory authority of this data breach?",
                "Correct": "72 hours",
                "Explanation": "Under GDPR Article 33(1), the controller must notify the competent supervisory authority of a personal data breach without undue delay and, where feasible, within 72 hours of becoming aware of the breach. This 72-hour notification window is a key compliance requirement that organizations must build into their incident response procedures.",
                "Topic": "Data Privacy Frameworks",
                "Choices": [
                    "24 hours",
                    "48 hours",
                    "72 hours",
                    "96 hours"
                ],
                "ItemID": "CBQ5-E3-Q3",
                "CognitiveLevel": "Remember",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-E3",
                "EstimatedMinutes": 3,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "AccountingPrinciple": "GDPR Article 33 establishes a mandatory 72-hour breach notification requirement to the supervisory authority. If the breach poses a high risk to data subjects, Article 34 further requires communication to the data subjects without undue delay. From a financial reporting perspective, a data breach may trigger contingent liability disclosure requirements under IAS 37 / ASC 450, and the costs of breach response, notification, and potential fines should be accrued when probable and reasonably estimable.",
                "BusinessInterpretation": "Management accountants must ensure that incident response procedures include a clear notification timeline and that the finance function is immediately alerted when a breach occurs. The 72-hour window is short — organizations need pre-established notification protocols, including contact information for the lead supervisory authority, template notification forms, and a designated breach response team. The controller should verify that cyber liability insurance policies cover breach notification costs and regulatory fines.",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "An EU data subject submits a request to DataBridge demanding that the company delete all personal data collected about them and cease processing. Under the GDPR, which data subject right has been invoked?",
                "Correct": "Right to erasure (right to be forgotten)",
                "Explanation": "The right to erasure, also known as the right to be forgotten, is established under GDPR Article 17. It allows data subjects to request the deletion of their personal data without undue delay when certain grounds apply, such as the data is no longer necessary for the purpose for which it was collected, the data subject withdraws consent, or the data was unlawfully processed. This is distinct from the right to access (Article 15), right to rectification (Article 16), and right to data portability (Article 20).",
                "Topic": "Data Privacy Frameworks",
                "Choices": [
                    "Right to access",
                    "Right to rectification",
                    "Right to erasure (right to be forgotten)",
                    "Right to data portability"
                ],
                "ItemID": "CBQ5-E3-Q4",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-E3",
                "EstimatedMinutes": 3,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "AccountingPrinciple": "GDPR Article 17 (right to erasure) requires controllers to delete personal data without undue delay when specified conditions are met, including withdrawal of consent, objection to processing, or unlawful processing. Organizations must have documented procedures for handling data subject access requests (DSARs), including verification of identity, assessment of exemption applicability, and timely response within the one-month statutory period. Failure to comply with a valid erasure request can result in regulatory action and fines under Article 83(5).",
                "BusinessInterpretation": "Management accountants should be aware that the right to erasure has significant operational and record-keeping implications. Data must be deleted across all systems, including backups, archives, and third-party processors. The controller should ensure the organization maintains a data map showing where personal data resides and has automated deletion procedures. The cost of complying with erasure requests — including search, verification, deletion, and confirmation — should be tracked as a compliance cost.",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "DataBridge needs to transfer personal data of EU customers from its Irish subsidiary to its primary data center in Chicago for centralized analytics processing. Which GDPR-approved transfer mechanism is most appropriate for this recurring data transfer scenario?",
                "Correct": "Standard Contractual Clauses (SCCs)",
                "Explanation": "Standard Contractual Clauses (SCCs) are pre-approved model data protection clauses issued by the European Commission that controllers and processors can use to ensure adequate data protection for transfers to countries without an adequacy decision. SCCs are the most commonly used transfer mechanism for routine business-to-business data transfers. Binding Corporate Rules (BCRs) are an alternative but are more complex to implement and are typically used for intra-group transfers within a multinational corporate group. The Privacy Shield framework was invalidated by the Court of Justice of the European Union in the Schrems II decision (2020). A Data Protection Impact Assessment (DPIA) is a process requirement, not a transfer mechanism.",
                "Topic": "Data Privacy Frameworks",
                "Choices": [
                    "Binding Corporate Rules (BCRs)",
                    "Standard Contractual Clauses (SCCs)",
                    "Privacy Shield framework",
                    "Data Protection Impact Assessment (DPIA)"
                ],
                "ItemID": "CBQ5-E3-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ5-E3",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "E",
                "AccountingPrinciple": "Under GDPR Chapter V, transfers of personal data to third countries are prohibited unless the controller provides appropriate safeguards, including Standard Contractual Clauses (SCCs), Binding Corporate Rules (BCRs), or an adequacy decision by the European Commission. The SCCs adopted by the European Commission in June 2021 (2021/914) are the most accessible mechanism for most organizations. From a financial reporting perspective, cross-border data transfer compliance affects the valuation of intangible assets (customer data), the assessment of contingent liabilities for potential GDPR violations, and disclosure requirements for risks related to international operations.",
                "BusinessInterpretation": "Management accountants supporting international operations should verify that the organization has executed valid SCCs with all third-party data processors receiving EU personal data. The controller should also monitor regulatory developments — adequacy decisions, SCC updates, and enforcement trends — as these directly affect compliance costs and risk exposure. The invalidation of Privacy Shield demonstrates that reliance on a single transfer mechanism creates regulatory risk; organizations should maintain alternative mechanisms.",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-F1",
        "Title": "Big Data Characteristics",
        "SectionTags": [
            "F"
        ],
        "Pack": 5,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Big Data Characteristics"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Big Data Characteristics",
        "Subtopic": "Big data V's, analytics applications, and data governance",
        "SecondaryCompetencies": [
            "Calculation"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Management accounting and analytics",
        "CompanyName": "OmniMart Retail",
        "CompanyType": "Retail",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Retail",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze the characteristics of big data using the 4 Vs framework",
            "Apply big data analytics techniques to management accounting decision-making",
            "Evaluate the costs and benefits of a big data implementation initiative using quantitative analysis",
            "Assess data governance, quality, and security considerations for big data in a retail environment",
            "Analyze organizational and strategic considerations for implementing a big data analytics program"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions covering big data characteristics and analytics"
            }
        ],
        "Stakeholder": "Chief Financial Officer",
        "Tags": [
            "big data",
            "analytics",
            "data governance",
            "4 Vs",
            "data quality",
            "management accounting",
            "decision support"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "OmniMart Retail is a national chain with 450 stores and annual revenue of $6.2 billion. The company collects transaction data from point-of-sale systems, customer loyalty program interactions, e-commerce clickstream behavior, supply chain RFID tags, and social media sentiment feeds. The CFO has proposed launching a Big Data Analytics Initiative to convert this data into actionable insights for pricing optimization, inventory management, customer segmentation, and fraud detection. The initiative requires a $3.5 million first-year investment in data infrastructure (Hadoop cluster, data lake, ETL pipeline) and $1.8 million in annual ongoing costs for cloud storage, data engineering staff, and analytics software licenses. The projected annual benefit from reduced inventory holding costs, improved pricing margins, and fraud loss reduction is estimated at $4.2 million, but only if data quality standards are met and the organization adopts a data-driven culture. The management accounting team must evaluate whether the initiative creates value and recommend governance controls to ensure data veracity.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Big Data Initiative Projections",
                "Headers": [
                    "Category",
                    "Year 1",
                    "Year 2",
                    "Year 3"
                ],
                "Rows": [
                    [
                        "Data infrastructure (servers, storage, ETL)",
                        "$2,100,000",
                        "$450,000",
                        "$475,000"
                    ],
                    [
                        "Data engineering and analytics staffing",
                        "$1,200,000",
                        "$1,260,000",
                        "$1,323,000"
                    ],
                    [
                        "Software licenses and cloud services",
                        "$200,000",
                        "$210,000",
                        "$220,500"
                    ],
                    [
                        "Total costs",
                        "$3,500,000",
                        "$1,920,000",
                        "$2,018,500"
                    ],
                    [
                        "Projected benefits - inventory reduction",
                        "$1,800,000",
                        "$2,100,000",
                        "$2,400,000"
                    ],
                    [
                        "Projected benefits - pricing optimization",
                        "$1,400,000",
                        "$1,600,000",
                        "$1,800,000"
                    ],
                    [
                        "Projected benefits - fraud loss reduction",
                        "$400,000",
                        "$450,000",
                        "$500,000"
                    ],
                    [
                        "Total projected benefits",
                        "$3,600,000",
                        "$4,150,000",
                        "$4,700,000"
                    ],
                    [
                        "Net annual benefit (cost)",
                        "$100,000",
                        "$2,230,000",
                        "$2,681,500"
                    ]
                ],
                "ExhibitID": "CBQ5-F1-E1",
                "CaseID": "CBQ5-F1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F1-Q2",
                    "CBQ5-F1-Q3"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Data Sources and Quality Issues",
                "Body": "The internal audit team assessed OmniMart's data environment and reported the following: (1) Point-of-sale data is captured in real time across all 450 stores, generating 12 million transaction records per day. (2) The loyalty program captures 4 million customer profiles with purchase history but 22% of profiles have incomplete demographic data. (3) E-commerce clickstream data arrives at 50,000 events per minute and is stored in raw format without validation. (4) RFID inventory tags from the supply chain have a 3% read failure rate, causing data gaps in inventory tracking. (5) Social media sentiment data is unstructured text requiring natural language processing and has no established accuracy benchmark. (6) Three different systems record cost data using different product categorization schemes, making cross-system analysis difficult without manual reconciliation.",
                "ExhibitID": "CBQ5-F1-E2",
                "CaseID": "CBQ5-F1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F1-Q1",
                    "CBQ5-F1-Q4",
                    "CBQ5-F1-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "OmniMart's data environment exhibits characteristics of all four Vs of big data. Match each V to the data characteristic it describes.",
                "Correct": {
                    "Volume": "The massive scale of data generated from 12 million daily POS transactions and 4 million customer profiles",
                    "Velocity": "The high speed of data generation requiring real-time processing of 50,000 clickstream events per minute",
                    "Variety": "The diverse data formats including structured POS data, semi-structured RFID feeds, and unstructured social media text",
                    "Veracity": "The uncertainty and quality concerns arising from 22% incomplete profiles, 3% RFID read failures, and unreconciled cost data"
                },
                "Explanation": "Volume refers to the sheer quantity of data generated; OmniMart's 12 million daily POS transactions create massive data scale. Velocity describes the speed of data creation and the need for rapid processing; 50,000 clickstream events per minute requires real-time or near-real-time processing. Variety captures the different formats; OmniMart has structured (POS, RFID), semi-structured (clickstream logs), and unstructured (social media text) data. Veracity addresses data quality and trustworthiness; incomplete customer profiles, RFID read failures, and inconsistent product categorizations all introduce uncertainty into the data. Value, sometimes called the fifth V, refers to the business insights extracted, but is not one of the core four Vs. Volume of customer profiles refers to scale, not format. Velocity of cost data recording is not about speed of processing but about frequency of updates.",
                "Topic": "Big Data Characteristics",
                "LeftItems": [
                    "Volume",
                    "Velocity",
                    "Variety",
                    "Veracity"
                ],
                "RightItems": [
    "The uncertainty and quality concerns arising from 22% incomplete profiles, 3% RFID read failures, and unreconciled cost data",
    "The diverse data formats including structured POS data, semi-structured RFID feeds, and unstructured social media text",
    "The massive scale of data generated from 12 million daily POS transactions and 4 million customer profiles",
    "The business value derived from analyzing data to create competitive advantage and improve decision-making",
    "The high speed of data generation requiring real-time processing of 50,000 clickstream events per minute"
],
                "ItemID": "CBQ5-F1-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The 4 Vs of big data (Volume, Velocity, Variety, Veracity) form the foundational framework for characterizing and managing big data. Understanding each V helps management accountants assess data suitability for decision-making and identify the analytical approaches required.",
                "BusinessInterpretation": "In a retail context, management accountants must evaluate whether big data initiatives address all four Vs simultaneously. A high-volume, high-velocity data stream with poor veracity can produce misleading analyses, while data with high variety requires sophisticated integration and normalization before it supports reliable decisions.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F1",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "OmniMart's management accounting team wants to use the big data initiative to improve inventory management. Which application of big data analytics is BEST suited for reducing inventory holding costs?",
                "Correct": "Predictive analytics using POS and RFID data to forecast demand at the store-SKU level and automate replenishment timing, reducing safety stock requirements",
                "Explanation": "Predictive analytics applied to POS and RFID data allows OmniMart to forecast demand patterns at granular store and SKU levels, enabling just-in-time replenishment that reduces safety stock and holding costs. This directly addresses the inventory reduction benefit projected in Exhibit 1. Descriptive analytics of historical sales shows what happened but does not predict future demand. Prescriptive analytics using social media sentiment on pricing can inform markdown timing but does not directly target inventory holding cost reduction. Diagnostic analytics of supply chain disruptions identifies problems after they occur rather than preventing excess inventory.",
                "Topic": "Big Data Characteristics",
                "Choices": [
                    "Predictive analytics using POS and RFID data to forecast demand at the store-SKU level and automate replenishment timing, reducing safety stock requirements",
                    "Descriptive analytics using historical sales dashboards to summarize last quarter's inventory turnover ratios by region",
                    "Prescriptive analytics using social media sentiment analysis to determine the optimal markdown percentage for seasonal merchandise",
                    "Diagnostic analytics using supply chain disruption reports to identify the root causes of delayed shipments from distribution centers"
                ],
                "ItemID": "CBQ5-F1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Big data analytics in management accounting includes descriptive (what happened), diagnostic (why it happened), predictive (what will happen), and prescriptive (what should we do) analytics. Each type supports different decisions, with predictive and prescriptive analytics offering the highest value for forward-looking cost management.",
                "BusinessInterpretation": "Retailers with big data capabilities increasingly use real-time demand sensing at the SKU-location level to optimize inventory, reduce markdowns, and improve working capital. Management accountants should evaluate analytics proposals based on their direct impact on cost levers and projected ROI, not technical sophistication alone.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F1",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Using the projections in Exhibit 1, calculate the total net benefit (benefits minus costs) for the three-year period. Enter your answer as a whole number in dollars. Do not use commas or dollar signs.",
                "Correct": 5011500,
                "Explanation": "Total costs over 3 years: $3,500,000 + $1,920,000 + $2,018,500 = $7,438,500. Total benefits over 3 years: $3,600,000 + $4,150,000 + $4,700,000 = $12,450,000. Net benefit: $12,450,000 - $7,438,500 = $5,011,500. Alternatively, summing annual net amounts: Year 1 net = $100,000, Year 2 net = $2,230,000, Year 3 net = $2,681,500, total = $5,011,500. Entered as 5011500 without commas or dollar signs.",
                "Topic": "Big Data Characteristics",
                "Choices": [],
                "ItemID": "CBQ5-F1-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Capital investment analysis for technology projects requires comparing multi-period costs and benefits. Management accountants should consider net present value when material time value of money exists, but simple payback and total net benefit are commonly used screening metrics.",
                "BusinessInterpretation": "The three-year total net benefit of $5,011,500 suggests the initiative creates positive value, but management should also consider the payback period (approximately 1.5 years based on cumulative benefits exceeding cumulative costs), qualitative risks from data quality issues, and ongoing operational costs beyond Year 3.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-F1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "The management accounting team must design data governance controls to address the veracity challenges identified in Exhibit 2. Which controls are MOST appropriate? (Select all that apply.)",
                "Correct": [
                    "Implement automated data validation rules at the point of capture for clickstream and RFID data to flag incomplete or anomalous records in real time",
                    "Establish a data stewardship program with assigned owners for each major data domain (customer, product, inventory, supply chain) responsible for quality standards",
                    "Create a master data management (MDM) system to standardize product categorization codes across all three source systems, enabling reliable cross-system analysis"
                ],
                "Explanation": "Veracity concerns arise from: RFID read failures (3%), incomplete customer profiles (22%), unvalidated clickstream data, and inconsistent product categorization. Automated validation rules address the first two by rejecting or flagging bad data at ingestion. A data stewardship program assigns accountability for ongoing quality. Master data management resolves the categorization inconsistency by creating a single authoritative source of truth for product data. Adding more raw data without resolving quality issues compounds rather than solves the problem. Running analyses separately and manually comparing results is inefficient and still requires reconciliation — proper data governance should prevent the inconsistency at the source.",
                "Topic": "Big Data Characteristics",
                "Choices": [
                    "Implement automated data validation rules at the point of capture for clickstream and RFID data to flag incomplete or anomalous records in real time",
                    "Establish a data stewardship program with assigned owners for each major data domain (customer, product, inventory, supply chain) responsible for quality standards",
                    "Create a master data management (MDM) system to standardize product categorization codes across all three source systems, enabling reliable cross-system analysis",
                    "Increase the volume of data collected from additional sources to dilute the impact of quality issues through statistical averaging",
                    "Run all analyses separately on each system and manually compare results to identify discrepancies before making decisions"
                ],
                "ItemID": "CBQ5-F1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Data governance frameworks include data quality management (accuracy, completeness, timeliness), data stewardship (accountability), master data management (single source of truth), and data security. The COSO internal control framework applies to data as a key business asset requiring control activities.",
                "BusinessInterpretation": "Management accountants increasingly serve as data stewards and control owners for financial and operational data used in reporting and decision-making. The IMA's Statement on Management Accounting on business analytics emphasizes that data governance is a prerequisite for reliable analytics, not an afterthought.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F1",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "The CFO is concerned about organizational readiness for the Big Data Analytics Initiative. Which factor is MOST critical for the initiative's long-term success?",
                "Correct": "Establishing a data-driven culture where management decisions are consistently informed by analytics, supported by executive sponsorship and change management",
                "Explanation": "Research on big data initiative failures consistently identifies organizational and cultural factors as the primary barrier to success, ahead of technical challenges. Without a data-driven culture and executive sponsorship, even the best analytical tools produce insights that are ignored or overridden by intuition. Technology infrastructure, while important, is an enabler rather than a driver of success. Data scientist hiring is necessary but insufficient if the organization does not value data-informed decisions. Privacy compliance is mandatory but focuses on risk avoidance rather than value creation.",
                "Topic": "Big Data Characteristics",
                "Choices": [
                    "Establishing a data-driven culture where management decisions are consistently informed by analytics, supported by executive sponsorship and change management",
                    "Purchasing the most advanced data infrastructure and analytics software platforms available on the market",
                    "Hiring the largest possible team of data scientists with advanced degrees in machine learning and statistics",
                    "Implementing strict data privacy and security policies that limit data access to only the analytics team"
                ],
                "ItemID": "CBQ5-F1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The IMA's Management Accounting Competency Framework identifies technology and analytics as a core competency area, emphasizing that management accountants must interpret and communicate analytical findings, not just produce them. Organizational change management is essential for analytics adoption.",
                "BusinessInterpretation": "Companies that successfully leverage big data invest as much in change management and analytical talent development as in technology. The management accountant's role includes bridging the gap between technical analytics and business decision-making by translating data insights into actionable recommendations supported by cost-benefit analysis.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F1",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-F2",
        "Title": "Robotic Process Automation (RPA)",
        "SectionTags": [
            "F"
        ],
        "Pack": 5,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Robotic Process Automation (RPA)"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Robotic Process Automation (RPA)",
        "Subtopic": "RPA suitability assessment, implementation economics, and governance",
        "SecondaryCompetencies": [
            "Analysis",
            "Calculation"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Finance transformation and accounting operations",
        "CompanyName": "Meridian Financial Services",
        "CompanyType": "Financial services",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Financial services",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze RPA characteristics and identify processes suitable for automation",
            "Evaluate the appropriate applications of RPA in accounting and finance operations",
            "Calculate the net financial benefit of an RPA implementation using cost-benefit analysis",
            "Assess which finance processes are appropriate for RPA versus other automation approaches",
            "Analyze governance, control, and risk considerations when implementing RPA in a financial services environment"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions covering RPA concepts and applications"
            }
        ],
        "Stakeholder": "Chief Financial Officer",
        "Tags": [
            "RPA",
            "automation",
            "robotic process automation",
            "finance transformation",
            "internal controls",
            "cost-benefit analysis"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Meridian Financial Services is a mid-sized insurance and wealth management firm with $4.8 billion in assets under management. The accounting operations team processes 45,000 invoices annually, performs 12,000 account reconciliations per month, generates 3,800 financial reports per quarter, and handles 8,500 vendor payment transactions each month. The CFO has initiated a finance transformation project evaluating Robotic Process Automation (RPA) to improve efficiency, reduce errors, and free up staff for higher-value analysis. The accounts payable department currently employs 12 full-time equivalents (FTEs) and the general ledger team employs 8 FTEs. An RPA consulting firm has proposed deploying software bots to automate invoice processing (data extraction and ERP entry), bank reconciliation, intercompany matching, and standard journal entry posting. The initial implementation would require $450,000 in software licenses and infrastructure, $320,000 in consulting and implementation costs, and $95,000 in training. Annual ongoing costs are estimated at $180,000 for license maintenance, bot support, and infrastructure. The projected annual labor savings are $620,000 from reduced FTE requirements, with an additional $85,000 in error reduction benefits.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - RPA Suitability Assessment",
                "Headers": [
                    "Process",
                    "Volume (Monthly)",
                    "Rule-Based?",
                    "Data Format",
                    "Exceptions Rate",
                    "RPA Suitable?"
                ],
                "Rows": [
                    [
                        "Invoice data entry to ERP",
                        "3,750 invoices",
                        "Yes - vendor, PO, GL fields",
                        "Standardized PDF/EDI",
                        "4%",
                        "Yes"
                    ],
                    [
                        "Bank account reconciliation",
                        "12,000 accounts",
                        "Yes - match rules defined",
                        "Structured CSV/OFX",
                        "8%",
                        "Yes"
                    ],
                    [
                        "Intercompany transaction matching",
                        "2,400 pairs",
                        "Yes - elimination rules",
                        "Structured GL extracts",
                        "6%",
                        "Yes"
                    ],
                    [
                        "Standard journal entry posting",
                        "800 entries",
                        "Yes - recurring templates",
                        "Structured spreadsheet",
                        "1%",
                        "Yes"
                    ],
                    [
                        "Complex loss reserve estimation",
                        "150 analyses",
                        "No - actuarial judgment",
                        "Multiple unstructured",
                        "35%",
                        "No"
                    ],
                    [
                        "Vendor contract negotiation",
                        "200 renewals",
                        "No - strategic judgment",
                        "Legal text (unstructured)",
                        "N/A",
                        "No"
                    ],
                    [
                        "Financial statement note drafting",
                        "85 notes",
                        "No - narrative judgment",
                        "Unstructured text",
                        "N/A",
                        "No"
                    ]
                ],
                "ExhibitID": "CBQ5-F2-E1",
                "CaseID": "CBQ5-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F2-Q1",
                    "CBQ5-F2-Q2",
                    "CBQ5-F2-Q3",
                    "CBQ5-F2-Q4"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Internal Audit Assessment of RPA Control Risks",
                "Body": "The internal audit team identified the following control considerations for RPA implementation: (1) Bots use attended (user-triggered) and unattended (scheduled) modes. Unattended bots process 70% of transactions and require exception-handling protocols. (2) Each bot operates under a single service account with access to ERP, bank portals, and vendor master data. Segregation of duties between bot operation and bot oversight must be maintained. (3) Audit logs capture bot execution timestamps, input/output values, and error codes. The current retention policy is 90 days, but the audit team recommends 12 months. (4) Process changes in underlying systems (ERP upgrades, bank portal changes) can cause bot failures. A change management protocol is needed to coordinate system updates with bot maintenance. (5) The bot's service account creates a potential SOD conflict because the bot can initiate, approve, and post transactions without human intervention unless supervisory review controls are configured for high-value transactions.",
                "ExhibitID": "CBQ5-F2-E2",
                "CaseID": "CBQ5-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F2-Q4",
                    "CBQ5-F2-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The CFO's team is preparing a training deck on RPA for the audit committee. Match each RPA characteristic to its correct description.",
                "Correct": {
                    "Rule-based processing": "RPA bots execute predefined, structured steps following explicit business rules without deviation or judgment",
                    "User interface interaction": "RPA bots interact with applications through the same user interface as human users, requiring no system integration changes",
                    "Exception handling": "Bots flag transactions that fall outside predefined parameters for human review, with automated routing to the appropriate team member",
                    "Attended vs unattended mode": "Attended bots run on user desktops with human triggers; unattended bots run on servers on scheduled intervals without human intervention"
                },
                "Explanation": "RPA is characterized by rule-based processing following predefined logic rather than artificial intelligence or machine learning. Bots interact with systems at the UI layer, simulating keystrokes and clicks, which makes them lightweight to deploy but sensitive to UI changes. Exception handling is critical because RPA works best for high-volume, low-exception processes — Exhibit 1 shows the most suitable processes have 1-8% exception rates. Attended bots assist individual users with specific tasks, while unattended bots run continuously on virtual servers for high-volume batch processing.",
                "Topic": "Robotic Process Automation (RPA)",
                "LeftItems": [
                    "Rule-based processing",
                    "User interface interaction",
                    "Exception handling",
                    "Attended vs unattended mode"
                ],
                "RightItems": [
    "RPA bots interact with applications through the same user interface as human users, requiring no system integration changes",
    "RPA bots execute predefined, structured steps following explicit business rules without deviation or judgment",
    "Attended bots run on user desktops with human triggers; unattended bots run on servers on scheduled intervals without human intervention",
    "Bots flag transactions that fall outside predefined parameters for human review, with automated routing to the appropriate team member",
    "RPA bots use machine learning algorithms to self-optimize process execution over time based on historical patterns"
],
                "ItemID": "CBQ5-F2-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "RPA is a technology that configures software bots to emulate human interactions with digital systems. Unlike AI, RPA follows predefined rules and does not learn or make judgments. Management accountants evaluating RPA must understand these characteristics to identify suitable processes and set appropriate expectations with stakeholders.",
                "BusinessInterpretation": "The distinction between RPA and AI is frequently misunderstood. Management accountants should be precise: RPA is ideal for structured, rules-based, high-volume processes (like those in Exhibit 1), while processes requiring judgment or handling unstructured data require AI, cognitive automation, or human judgment.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "Based on the data in Exhibit 1, which finance process is the STRONGEST candidate for RPA implementation at Meridian?",
                "Correct": "Invoice data entry to ERP — it is high-volume (3,750 per month), entirely rule-based with structured data, and has the second-lowest exception rate at 4%",
                "Explanation": "Invoice data entry to ERP meets all RPA suitability criteria: high volume, rule-based processing, structured data format, and low exception rate. The process is repetitive and standardized, requiring the bot to extract vendor name, PO number, GL code, and amount from invoices and enter these into the ERP. Bank reconciliation also is suitable but involves matching transactions across multiple systems. Standard journal entry posting has the lowest exception rate (1%) but lower volume (800 per month). Complex loss reserve estimation requires actuarial judgment and is unsuitable for RPA. Vendor contract negotiation involves strategic judgment and is not rule-based.",
                "Topic": "Robotic Process Automation (RPA)",
                "Choices": [
                    "Invoice data entry to ERP — it is high-volume (3,750 per month), entirely rule-based with structured data, and has the second-lowest exception rate at 4%",
                    "Complex loss reserve estimation — this area has the highest financial impact and would benefit most from automation of actuarial calculations",
                    "Vendor contract negotiation — automating the initial contract draft would save the most legal and procurement staff time across 200 annual renewals",
                    "Bank account reconciliation — this process has the highest monthly volume at 12,000 accounts, making it the most impactful RPA candidate"
                ],
                "ItemID": "CBQ5-F2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "RPA is most effective for high-volume, rules-based, structured processes with low exception rates. Processes requiring professional judgment, unstructured data handling, or strategic decision-making are not suitable for RPA. Management accountants should evaluate automation candidates against these criteria before recommending investment.",
                "BusinessInterpretation": "The strongest RPA candidates typically involve data movement between systems, validation against rules, and standard calculations. At Meridian, the accounts payable invoice processing function is the classic RPA use case, and RPA implementations in AP are among the most common and successful in financial services.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Using the scenario data, calculate the annual net benefit (annual benefits minus annual ongoing costs) for the RPA initiative in Year 2, after implementation costs have been incurred. Enter your answer as a whole number in dollars. Do not use commas or dollar signs.",
                "Correct": 525000,
                "Explanation": "Year 2 ongoing costs: $180,000 (license maintenance, bot support, infrastructure). Year 2 benefits: $620,000 (labor savings) + $85,000 (error reduction) = $705,000. Year 2 net benefit: $705,000 - $180,000 = $525,000. In Year 1, the initial implementation costs of $450,000 (licenses/infrastructure) + $320,000 (consulting) + $95,000 (training) create a negative net benefit of -$340,000, but from Year 2 onward the initiative generates a steady $525,000 annual net benefit. The payback period is approximately 1.65 years ($865,000 investment / $525,000 annual return).",
                "Topic": "Robotic Process Automation (RPA)",
                "Choices": [],
                "ItemID": "CBQ5-F2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "TimePressure"
                ],
                "AccountingPrinciple": "Capital investment analysis for automation projects should consider implementation costs, ongoing operating costs, labor savings, and qualitative benefits (error reduction, faster processing, improved compliance). Payback period and net present value are commonly used evaluation methods for RPA investments.",
                "BusinessInterpretation": "RPA implementations typically have negative first-year net benefits due to upfront implementation costs. The business case relies on multi-year analysis. Management accountants should present Year 1 losses and subsequent-year returns together to give decision-makers the full picture, including the payback period.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-F2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "Which of the following processes from Exhibit 1 are appropriate candidates for RPA? (Select all that apply.)",
                "Correct": [
                    "Invoice data entry to ERP — structured data, rule-based extraction and posting, low exception rate",
                    "Bank account reconciliation — high-volume matching of structured data against defined reconciliation rules",
                    "Intercompany transaction matching — rule-based elimination entries using structured GL data with manageable exceptions",
                    "Standard journal entry posting — recurring, template-driven entries with virtually no exceptions"
                ],
                "Explanation": "All four processes share RPA-suitability characteristics: high volume, rule-based processing, structured data, and low exception rates (1% to 8%). Complex loss reserve estimation requires actuarial judgment and has a 35% exception rate, making it unsuitable for RPA. Vendor contract negotiation and financial statement note drafting involve strategic and narrative judgment with unstructured data, requiring human expertise rather than automation. The distinction is between rule-based processes suitable for RPA and judgment-based work requiring cognitive skills.",
                "Topic": "Robotic Process Automation (RPA)",
                "Choices": [
                    "Invoice data entry to ERP — structured data, rule-based extraction and posting, low exception rate",
                    "Bank account reconciliation — high-volume matching of structured data against defined reconciliation rules",
                    "Intercompany transaction matching — rule-based elimination entries using structured GL data with manageable exceptions",
                    "Standard journal entry posting — recurring, template-driven entries with virtually no exceptions",
                    "Complex loss reserve estimation — this process has high financial materiality and would benefit most from automation"
                ],
                "ItemID": "CBQ5-F2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "RPA suitability requires rule-based processing, structured digital data, high transaction volume, low exception rates, and stable systems. Processes requiring professional judgment, unstructured data, or strategic analysis should not be automated with RPA. Management accountants should use these criteria to scope RPA initiatives realistically.",
                "BusinessInterpretation": "The 80/20 rule applies: 80% of RPA value typically comes from automating 20% of processes — the high-volume, low-exception, rule-based ones. Trying to automate judgment-heavy processes with RPA leads to excessive exception handling that undermines the business case. Such processes may be candidates for AI or cognitive automation instead.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F2",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "Based on Exhibit 2, which internal control enhancement is MOST critical to address the segregation of duties (SOD) risk created by the RPA implementation?",
                "Correct": "Configure supervisory review and approval workflows for all high-value transactions processed by unattended bots, ensuring no transaction exceeds a defined threshold without human authorization",
                "Explanation": "Exhibit 2 identifies that the bot's service account can initiate, approve, and post transactions without human intervention, creating a SOD conflict. The most critical control is implementing supervisory review for high-value transactions, so the bot automates the process flow but a human authorizes material transactions before posting. Extending audit log retention improves monitoring but does not prevent unauthorized transactions. Assigning a dedicated bot administrator manages bot operations but does not address transaction-level SOD. Restricting bots to attended mode only would eliminate 70% of the projected efficiency gains and does not address the underlying SOD risk for transactions the bot still processes.",
                "Topic": "Robotic Process Automation (RPA)",
                "Choices": [
                    "Configure supervisory review and approval workflows for all high-value transactions processed by unattended bots, ensuring no transaction exceeds a defined threshold without human authorization",
                    "Extend the audit log retention period from 90 days to 12 months as recommended by internal audit to ensure sufficient forensic evidence is available",
                    "Assign a dedicated bot administrator to manage bot schedules, credentials, and exception queues, separate from the accounting staff performing manual processes",
                    "Restrict all bots to attended mode only, ensuring a human user is present and supervising every bot action to prevent any unauthorized transactions"
                ],
                "ItemID": "CBQ5-F2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "RPA introduces new internal control risks including segregation of duties conflicts (bot service accounts that can execute complete transaction cycles), access control risks, process integrity risks from system changes, and audit trail completeness. The COSO framework's control activities component should be applied to address these risks through authorization, approval, and monitoring controls.",
                "BusinessInterpretation": "Regulators in financial services expect that RPA implementations maintain the same level of internal control as manual processes. The bot does not eliminate the need for segregation of duties — it shifts the control point to exception monitoring and supervisory review for high-value transactions. Management accountants should ensure RPA business cases include the cost of control enhancements, not just labor savings.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F2",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-F3",
        "Title": "Blockchain and Distributed Ledgers",
        "SectionTags": [
            "F"
        ],
        "Pack": 5,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Blockchain and Distributed Ledgers"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Blockchain and Distributed Ledgers",
        "Subtopic": "Blockchain fundamentals, smart contracts, and accounting applications",
        "SecondaryCompetencies": [
            "Analysis",
            "Calculation"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Supply chain finance and accounting operations",
        "CompanyName": "GlobalLink Foods",
        "CompanyType": "Food distribution",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Food distribution and supply chain",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze blockchain characteristics including distributed ledger, immutability, consensus mechanisms, and smart contracts",
            "Apply blockchain concepts to identify suitable accounting and supply chain applications",
            "Calculate the financial impact of smart contract automation on payment processing costs",
            "Evaluate the advantages and limitations of distributed ledger technology for management accounting",
            "Assess implementation, governance, and control considerations for blockchain adoption in a supply chain network"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring with exhibits, scenario, and five differentiated questions covering blockchain concepts and applications"
            }
        ],
        "Stakeholder": "Chief Financial Officer",
        "Tags": [
            "blockchain",
            "distributed ledger",
            "smart contracts",
            "supply chain",
            "consensus",
            "immutability",
            "accounting technology"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "GlobalLink Foods is a $3.2 billion international food distributor sourcing fresh produce, grains, and proteins from 1,200 suppliers across 45 countries. The company processes 28,000 supplier invoices monthly with payment terms that vary by region and product type. The CFO is evaluating a blockchain-based supply chain platform proposed by a consortium of three major distributors and six large food retailers. The proposed permissioned blockchain network would record every transfer of custody from farm to distribution center on an immutable distributed ledger, with smart contracts automating payment releases when delivery conditions are met. The estimated implementation cost is $2.8 million for the first year (network setup, node deployment, integration with existing ERP) and $650,000 in annual ongoing costs (node maintenance, consortium fees, smart contract audits). Projected annual benefits include $1.4 million in reduced payment processing costs, $850,000 in lower dispute resolution expenses, and $300,000 in inventory financing cost savings from reduced float times. The supply chain currently loses $2.3 million annually to payment disputes, inventory discrepancies, and reconciliation delays — issues the blockchain platform is designed to address.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Blockchain Concepts and Applications",
                "Headers": [
                    "Concept",
                    "Description",
                    "Accounting Application"
                ],
                "Rows": [
                    [
                        "Distributed ledger",
                        "A shared, synchronized database maintained by multiple independent network participants",
                        "All supply chain participants share a single version of custody events, eliminating reconciliation between separate systems"
                    ],
                    [
                        "Immutability",
                        "Once recorded, data cannot be altered or deleted without network consensus",
                        "Creates an audit trail for inventory movements and title transfers that cannot be retroactively modified"
                    ],
                    [
                        "Smart contracts",
                        "Self-executing code on the blockchain that automatically enforces and executes contract terms",
                        "Automated payment release when delivery confirmation and quality inspection data meet predefined thresholds"
                    ],
                    [
                        "Consensus mechanism",
                        "The process by which network participants agree on the validity of new transactions added to the ledger",
                        "Ensures only verified custody transfers are recorded, reducing the risk of fraudulent or duplicate invoices"
                    ],
                    [
                        "Permissioned blockchain",
                        "A blockchain where access is restricted to approved participants with known identities",
                        "Only vetted suppliers, distributors, and retailers can view or add transaction data, protecting competitive information"
                    ]
                ],
                "ExhibitID": "CBQ5-F3-E1",
                "CaseID": "CBQ5-F3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F3-Q1",
                    "CBQ5-F3-Q2",
                    "CBQ5-F3-Q4"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - Implementation Analysis",
                "Body": "GlobalLink's current payment process: (1) Supplier ships goods and emails invoice. (2) Receiving team inspects delivery and enters receipt into ERP (3-5 day lag). (3) AP clerk matches invoice to PO and receipt - 8% of invoices require manual intervention. (4) Payment is scheduled per terms, averaging 32 days from invoice date. Disputes occur on 6% of invoices, taking an average of 18 days and $215 each to resolve. With the blockchain and smart contract solution: smart contracts would automatically execute payment upon verified delivery and quality inspection data recorded on the blockchain, reducing payment cycles to 5 days and eliminating 90% of disputes through automated verification of terms. GlobalLink's weighted average cost of capital is 9%.",
                "ExhibitID": "CBQ5-F3-E2",
                "CaseID": "CBQ5-F3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ5-F3-Q2",
                    "CBQ5-F3-Q3",
                    "CBQ5-F3-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The CFO is presenting blockchain fundamentals to the board. Match each blockchain concept to its correct accounting application.",
                "Correct": {
                    "Distributed ledger": "A shared database across network participants that eliminates reconciliation between separate organizational systems",
                    "Immutability": "Data permanence that prevents retroactive alteration of records, strengthening audit trail reliability",
                    "Smart contracts": "Self-executing code that automatically triggers actions such as payment release when predefined delivery conditions are met",
                    "Consensus mechanism": "A validation process where network participants agree on transaction validity before records are added to the ledger"
                },
                "Explanation": "A distributed ledger is shared across network participants so that all parties see the same data simultaneously, eliminating the need for bilateral reconciliation. Immutability means records cannot be changed once consensus is achieved — this is critical for audit trails because it prevents retroactive modification of inventory or transaction records. Smart contracts are self-executing programs on the blockchain that automatically enforce and execute contract terms. Consensus mechanisms ensure all participants agree on the validity of transactions before they are permanently recorded, preventing fraudulent or duplicate entries. A permissioned blockchain restricts participation to vetted identities, which is essential for business networks that require privacy.",
                "Topic": "Blockchain and Distributed Ledgers",
                "LeftItems": [
                    "Distributed ledger",
                    "Immutability",
                    "Smart contracts",
                    "Consensus mechanism"
                ],
                "RightItems": [
    "A validation process where network participants agree on transaction validity before records are added to the ledger",
    "Self-executing code that automatically triggers actions such as payment release when predefined delivery conditions are met",
    "A shared database across network participants that eliminates reconciliation between separate organizational systems",
    "A cryptographic technique that encrypts all transaction data so only authorized participants can read the contents",
    "Data permanence that prevents retroactive alteration of records, strengthening audit trail reliability"
],
                "ItemID": "CBQ5-F3-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Blockchain technology offers management accountants a shared, immutable ledger that can reduce reconciliation effort, improve audit trail reliability, and enable automated transaction execution through smart contracts. Understanding these concepts is essential for evaluating blockchain adoption opportunities.",
                "BusinessInterpretation": "Blockchain does not replace ERP systems — it complements them by providing a trusted data layer between organizations. Management accountants should evaluate blockchain for use cases involving multiple parties that currently reconcile data across separate systems, such as intercompany transactions, supply chain finance, and trade finance.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F3",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2
            },
            {
                "Type": "select",
                "Prompt": "Based on Exhibit 1, which blockchain application offers the GREATEST potential benefit to GlobalLink's accounting operations?",
                "Correct": "Smart contracts that automate payment release upon verified delivery — this directly addresses the $2.3 million annual loss from disputes, delays, and reconciliation by eliminating 90% of disputes and reducing the payment cycle from 32 to 5 days",
                "Explanation": "The smart contract application most directly addresses GlobalLink's core pain points: payment disputes (6% of invoices, 18-day resolution, $215 each), reconciliation delays (3-5 day lag in receipt entry), and extended payment cycles (32 days). Smart contracts automate payment when delivery conditions recorded on the blockchain match contract terms, eliminating most disputes and dramatically reducing the payment cycle. The distributed ledger eliminates reconciliation between supplier and buyer systems. Immutability creates a reliable audit trail but is preventive rather than directly addressing current financial losses. The consensus mechanism validates transactions but the smart contract is what automates the financial settlement.",
                "Topic": "Blockchain and Distributed Ledgers",
                "Choices": [
                    "Smart contracts that automate payment release upon verified delivery — this directly addresses the $2.3 million annual loss from disputes, delays, and reconciliation by eliminating 90% of disputes and reducing the payment cycle from 32 to 5 days",
                    "Distributed ledger that gives all supply chain participants access to the same custody records — this eliminates the need for suppliers to send invoices and buyers to manually match them to receipts",
                    "Immutability that creates a permanent record of all inventory movements — this ensures auditors can verify every custody transfer without relying on paper documentation from multiple parties",
                    "Consensus mechanism that validates all transactions before they are recorded — this prevents any single supplier from recording fraudulent deliveries that would trigger unauthorized payments"
                ],
                "ItemID": "CBQ5-F3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Smart contracts are self-executing programs on a blockchain that automatically enforce contract terms. In accounting, they can automate revenue recognition, payment processing, and intercompany settlements by executing transactions when predefined conditions recorded on the ledger are satisfied.",
                "BusinessInterpretation": "The greatest ROI from blockchain in supply chain finance typically comes from payment automation and dispute reduction rather than from the ledger itself. Management accountants should quantify the working capital benefit of faster payment cycles in addition to direct cost savings when building the blockchain business case.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F3",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "numeric",
                "Prompt": "Using the data in Exhibit 2, calculate the annual working capital benefit from reducing the payment cycle from 32 days to 5 days. GlobalLink processes $2.4 billion in annual supplier payments. Use a 365-day year. Enter your answer as the nearest whole number in dollars. Do not use commas or dollar signs.",
                "Correct": 15978082,
                "Explanation": "Days reduced: 32 - 5 = 27 days. Annual payment volume: $2,400,000,000. Working capital released: $2,400,000,000 x (27/365) = $177,534,247. Annual benefit at 9% WACC: $177,534,247 x 0.09 = $15,978,082. Each day reduction in payment cycle frees approximately $6,575,342 in working capital ($2.4B / 365). At a 9% cost of capital, each day saved is worth $591,781. The 27-day reduction is therefore worth $15,978,082 annually.",
                "Topic": "Blockchain and Distributed Ledgers",
                "Choices": [],
                "ItemID": "CBQ5-F3-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "TimePressure"
                ],
                "AccountingPrinciple": "Working capital management evaluates the cash conversion cycle including days payables outstanding (DPO). Reducing the payment cycle through smart contract automation improves supplier relationships but may increase the company's cash conversion cycle by reducing DPO. The net working capital benefit equals the released cash multiplied by the cost of capital.",
                "BusinessInterpretation": "The working capital benefit from faster payment is $15,978,082 annually — far exceeding the projected $1.4 million in payment processing savings. Management accountants should include working capital benefits in blockchain business cases as they often represent the largest quantifiable value, though they may need to balance faster supplier payments against the company's own cash flow objectives.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-F3",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "multi",
                "Prompt": "Which of the following are advantages of implementing a permissioned blockchain for GlobalLink's supply chain? (Select all that apply.)",
                "Correct": [
                    "Single shared version of custody events eliminates the need for bilateral reconciliation between GlobalLink and each of its 1,200 suppliers",
                    "Immutability of recorded transactions provides auditors with reliable evidence of custody transfers and delivery confirmation that cannot be altered retroactively",
                    "Smart contracts reduce dispute resolution costs by automating payment terms verification and eliminating 90% of manual dispute processing",
                    "All network participants use the same data, reducing the risk of inventory discrepancies between supplier shipping records and buyer receiving records"
                ],
                "Explanation": "A shared distributed ledger provides one authoritative record that all participants access, eliminating the cost and delay of reconciling separate systems. Immutability strengthens the audit trail. Smart contracts automate verification and payment execution, directly reducing dispute costs. Shared data consistency across participants eliminates inventory discrepancies. The statement about unlimited data storage is incorrect — blockchain is not designed for high-volume data storage; it stores transaction references and hashes, with detailed data typically stored off-chain. The statement about eliminating all manual effort is overly broad — blockchain reduces manual reconciliation but does not eliminate all manual processes; receiving inspection, quality testing, and exception handling still require human involvement.",
                "Topic": "Blockchain and Distributed Ledgers",
                "Choices": [
                    "Single shared version of custody events eliminates the need for bilateral reconciliation between GlobalLink and each of its 1,200 suppliers",
                    "Immutability of recorded transactions provides auditors with reliable evidence of custody transfers and delivery confirmation that cannot be altered retroactively",
                    "Smart contracts reduce dispute resolution costs by automating payment terms verification and eliminating 90% of manual dispute processing",
                    "All network participants use the same data, reducing the risk of inventory discrepancies between supplier shipping records and buyer receiving records",
                    "The blockchain provides unlimited, low-cost storage for all contract documents, inspection photos, and temperature sensor data"
                ],
                "ItemID": "CBQ5-F3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Permissioned blockchains offer advantages for multi-party business processes including: shared single source of truth (reducing reconciliation), immutability (strengthening audit trails), smart contract automation (reducing manual processing), and data consistency (improving inventory and financial accuracy). However, blockchain is not a storage solution for large data volumes.",
                "BusinessInterpretation": "The most significant advantage for GlobalLink is the elimination of reconciliation between its systems and 1,200 suppliers' systems. Management accountants should evaluate blockchain adoption by quantifying the current cost of reconciliation, disputes, and data inconsistencies across the supply chain network, which often reveals a compelling ROI even before considering working capital benefits.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F3",
                "EstimatedMinutes": 7,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "select",
                "Prompt": "The internal audit team is evaluating control considerations for the blockchain implementation. Which control concern is MOST significant for GlobalLink's management accountants?",
                "Correct": "Smart contract code errors or logic flaws could execute incorrect payments automatically without human intervention, requiring rigorous testing and audit of contract code before deployment",
                "Explanation": "Smart contracts execute automatically when conditions are met — if the contract code contains errors, payments could be processed incorrectly at machine speed and volume without the safety net of manual review. This represents the most significant control concern because the automation of payment execution removes the human verification step that currently catches errors. Permissioned blockchain access controls are important but are a standard IT control. The 51% attack is a theoretical concern for public blockchains but is not material for a permissioned network with vetted participants. Immutability is generally a benefit, not a concern, but if incorrect data is recorded, getting the network to agree on a correction requires formal governance processes.",
                "Topic": "Blockchain and Distributed Ledgers",
                "Choices": [
                    "Smart contract code errors or logic flaws could execute incorrect payments automatically without human intervention, requiring rigorous testing and audit of contract code before deployment",
                    "Permissioned blockchain access controls may not be adequate to prevent unauthorized participants from viewing sensitive supplier pricing and contract terms",
                    "A 51% attack on the blockchain network could allow malicious participants to reverse transactions and create fraudulent custody records",
                    "Immutability of the blockchain means that incorrectly recorded data cannot be corrected under any circumstances, creating permanent errors in the audit trail"
                ],
                "ItemID": "CBQ5-F3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Blockchain introduces new internal control considerations: smart contract risk (code errors causing incorrect automated execution), oracle risk (external data feeds to the blockchain may be inaccurate), key management risk (loss of private keys), and governance risk (managing network rule changes). The COSO framework's risk assessment and control activities must address these technology-specific risks.",
                "BusinessInterpretation": "From a management accounting perspective, the smart contract risk is the most critical because it directly impacts payment accuracy and financial controls. Management accountants should ensure that smart contract development follows the same rigorous change management and testing protocols as ERP system changes, and that financial controls (segregation of duties, authorization limits, reconciliation) are mapped to the automated processes.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-F3",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ5-C3",
        "Title": "Sales Quantity and Volume Variances",
        "SectionTags": [
            "C"
        ],
        "Pack": 5,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Sales Quantity and Volume Variances"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Sales Quantity and Volume Variances",
        "Subtopic": "Market size and market share variance analysis",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "EverFresh Beverage",
        "CompanyType": "Beverage manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Beverage manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze sales volume variance and its decomposition into mix and quantity components",
            "Analyze sales mix variance and its impact on profitability",
            "Analyze market size and market share variances within the quantity variance",
            "Calculate and interpret the sales quantity variance",
            "Evaluate sales performance using variance analysis for management decisions"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content authoring — sales quantity, volume, mix, market size, and market share variance analysis"
            }
        ],
        "Stakeholder": "VP of Sales",
        "Tags": [
            "sales volume variance",
            "sales quantity variance",
            "sales mix variance",
            "market size variance",
            "market share variance",
            "variance analysis",
            "performance management"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "EverFresh Beverage Company manufactures premium juice blends and flavored water products distributed nationally through grocery and convenience store chains. The company has two product lines: EverFresh Premium Juice Blends (higher margin) and EverFresh Flavored Water (standard margin). At the end of the second quarter, the VP of Sales is reviewing the sales performance report. Total industry volume for the ready-to-drink beverage category grew by 25%, but EverFresh's market share declined from 25% to 23% as new competitors entered the premium segment. The CFO has prepared a variance analysis to decompose the sales volume variance into sales mix variance, sales quantity variance, and the further decomposition of quantity variance into market size and market share effects. Management needs to understand whether the sales team's performance was effective and where corrective actions are needed.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Budgeted and Actual Sales Data",
                "Headers": [
                    "Metric",
                    "Budget",
                    "Actual"
                ],
                "Rows": [
                    [
                        "Premium Juice Blends — units sold",
                        "40,000",
                        "50,000"
                    ],
                    [
                        "Flavored Water — units sold",
                        "60,000",
                        "65,000"
                    ],
                    [
                        "Total units sold",
                        "100,000",
                        "115,000"
                    ],
                    [
                        "Premium Juice Blends — contribution margin per unit",
                        "$18.00",
                        "$18.00"
                    ],
                    [
                        "Flavored Water — contribution margin per unit",
                        "$10.00",
                        "$10.00"
                    ],
                    [
                        "Total industry volume (units)",
                        "400,000",
                        "500,000"
                    ],
                    [
                        "EverFresh market share",
                        "25%",
                        "23%"
                    ]
                ],
                "ExhibitID": "CBQ5-C3-E1",
                "CaseID": "CBQ5-C3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 — Variance Analysis Framework",
                "Body": "Sales Volume Variance = Sales Mix Variance + Sales Quantity Variance. Sales Quantity Variance = Market Size Variance + Market Share Variance. Budgeted weighted-average contribution margin = $13.20 per unit (computed as 40,000 × $18 + 60,000 × $10 = $1,320,000 total contribution ÷ 100,000 budgeted units). Use the convention: enter unfavorable variances as positive numbers, favorable variances as negative numbers.",
                "ExhibitID": "CBQ5-C3-E2",
                "CaseID": "CBQ5-C3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the total Sales Volume Variance for EverFresh Beverage for the second quarter. Use the convention: favorable = negative, unfavorable = positive.",
                "Correct": -230000,
                "Explanation": "Sales Volume Variance = Σ[(Actual Qty − Budget Qty) × Budgeted CM per unit]. Premium: (50,000 − 40,000) × $18 = $180,000 F. Water: (65,000 − 60,000) × $10 = $50,000 F. Total = $230,000 Favorable. The overall variance is favorable because EverFresh sold 15,000 more total units than budgeted. The sales volume variance captures both the change in total quantity and the change in product mix.",
                "Topic": "Sales Volume Variance",
                "ItemID": "CBQ5-C3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Sales Volume Variance = Σ[(Actual Quantity − Budgeted Quantity) × Budgeted Contribution Margin per Unit] for each product. It represents the total profit impact of selling a different volume and mix than planned.",
                "BusinessInterpretation": "A favorable sales volume variance means the company generated more contribution margin from sales volume than budgeted. However, this aggregate measure does not reveal whether the improvement came from market growth, market share gains, or changes in product mix — requiring further decomposition.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C3",
                "EstimatedMinutes": 6,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "match",
                "Prompt": "The CFO needs to explain each variance component to the VP of Sales. Match each variance concept to the correct calculated result based on the data in Exhibit 1.",
                "LeftItems": [
                    "Sales Volume Variance = $230,000 F — total impact of selling different volumes at budgeted margins",
                    "Sales Quantity Variance = (Total Actual Units − Total Budget Units) × Budgeted WACM",
                    "Market Size Variance = (Actual Industry − Budget Industry) × Budget Share × Budgeted WACM",
                    "Market Share Variance = (Actual Share − Budget Share) × Actual Industry × Budgeted WACM"
                ],
                "RightItems": [
                    "$198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix",
                    "$330,000 Favorable — the overall beverage market grew by 100,000 units; EverFresh would have captured 25% of that growth at budget, yielding 25,000 additional units × $13.20 WACM",
                    "$132,000 Unfavorable — EverFresh's market share dropped from 25% to 23%; on an actual market of 500,000 units, this 2% decline represents 10,000 lost units × $13.20 WACM",
                    "$32,000 Favorable — EverFresh sold a higher proportion of Premium Juice Blends (43.5% actual vs 40% budget) which carry a higher $18 CM, increasing total contribution beyond the quantity-only effect",
                    "$230,000 Unfavorable — an incorrect aggregation that reverses the sign"
                ],
                "Correct": {
                    "Sales Volume Variance = $230,000 F — total impact of selling different volumes at budgeted margins": "$198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix",
                    "Sales Quantity Variance = (Total Actual Units − Total Budget Units) × Budgeted WACM": "$198,000 Favorable — EverFresh sold 15,000 more total units than budgeted; at the budgeted weighted-average CM of $13.20, this generated $198,000 of additional contribution margin regardless of product mix",
                    "Market Size Variance = (Actual Industry − Budget Industry) × Budget Share × Budgeted WACM": "$330,000 Favorable — the overall beverage market grew by 100,000 units; EverFresh would have captured 25% of that growth at budget, yielding 25,000 additional units × $13.20 WACM",
                    "Market Share Variance = (Actual Share − Budget Share) × Actual Industry × Budgeted WACM": "$132,000 Unfavorable — EverFresh's market share dropped from 25% to 23%; on an actual market of 500,000 units, this 2% decline represents 10,000 lost units × $13.20 WACM"
                },
                "Explanation": "Sales Volume Variance ($230,000 F) = Sales Mix Variance ($32,000 F) + Sales Quantity Variance ($198,000 F). Sales Quantity Variance ($198,000 F) = Market Size Variance ($330,000 F) + Market Share Variance ($132,000 U). The market grew significantly, which created a large favorable market size variance. However, EverFresh lost market share to new competitors, generating an unfavorable market share variance that partially offset the market growth benefit. The favorable mix variance indicates consumers shifted toward the higher-margin Premium Juice Blends.",
                "Topic": "Sales variance decomposition — mix, quantity, market size, and market share",
                "ItemID": "CBQ5-C3-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The sales volume variance is decomposed into sales mix variance (change in proportion of products sold) and sales quantity variance (change in total units). The quantity variance is further decomposed into market size variance (change in overall industry volume) and market share variance (change in the company's portion of that market).",
                "BusinessInterpretation": "Understanding the drivers of sales variance is critical for evaluating sales team performance. The market share variance directly reflects competitive performance and is the most actionable metric for the sales team. The market size variance is largely outside management's control but helps contextualize overall results.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C3",
                "EstimatedMinutes": 8,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Market Share Variance for EverFresh Beverage. Use the convention: favorable = negative, unfavorable = positive.",
                "Correct": 132000,
                "Explanation": "Market Share Variance = (Actual Share − Budget Share) × Actual Industry Volume × Budgeted WACM = (23% − 25%) × 500,000 × $13.20 = (−2% × 500,000) × $13.20 = −10,000 × $13.20 = $132,000 Unfavorable. The negative sign indicates the variance is unfavorable because EverFresh captured a smaller portion of the market than planned. At the budgeted weighted-average contribution margin of $13.20 per unit, the 10,000-unit shortfall from market share losses translates to $132,000 of lost contribution margin.",
                "Topic": "Market Share Variance",
                "ItemID": "CBQ5-C3-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Market Share Variance = (Actual Market Share % − Budgeted Market Share %) × Actual Industry Volume × Budgeted Weighted-Average CM per Unit. It isolates the effect of gaining or losing market share, holding industry volume constant at actual levels.",
                "BusinessInterpretation": "The unfavorable market share variance of $132,000 signals competitive erosion. Management should investigate whether the share loss was driven by pricing actions, new competitor entries, distribution gaps, or product quality issues. This is the most actionable variance for the sales and marketing teams.",
                "CalculationRequired": true,
                "CaseID": "CBQ5-C3",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            },
            {
                "Type": "select",
                "Prompt": "EverFresh's VP of Sales argues that the sales team should be evaluated on the market share variance rather than the total sales volume variance. Which of the following best supports this argument?",
                "Correct": "Market share variance isolates the portion of sales performance that is within the sales team's direct control, excluding industry-wide growth they did not cause",
                "Choices": [
                    "Market share variance isolates the portion of sales performance that is within the sales team's direct control, excluding industry-wide growth they did not cause",
                    "Total sales volume variance is always the best measure of sales team performance because it captures the full economic impact of their actions",
                    "Market share variance is less useful because it depends on the actual industry volume, which is an estimate subject to measurement error",
                    "Market share variance should not be used because a declining market share can be offset by market growth, making it misleading"
                ],
                "Explanation": "Market share variance is the most appropriate measure of sales team effectiveness because it isolates the team's ability to capture or lose market position independent of industry-wide volume changes. The total sales volume variance includes the market size effect, which is driven by macroeconomic factors, competitor actions, and consumer trends that are outside the sales team's control. Using total volume alone could mask a loss of competitive position during a growing market — exactly the situation EverFresh faces. Market share data is commonly available from industry trade groups and syndicated data providers.",
                "Topic": "Performance evaluation — choosing the right variance metric",
                "ItemID": "CBQ5-C3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Responsibility accounting holds managers accountable only for items they can control. Market share variance is more controllable by the sales team than market size variance, which depends on overall industry conditions beyond their influence.",
                "BusinessInterpretation": "In practice, many companies evaluate sales teams on both market share variance (controllable) and total sales volume variance (overall impact). A balanced scorecard approach might weight market share more heavily for sales teams while including total volume at the executive level.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-C3",
                "EstimatedMinutes": 4,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            },
            {
                "Type": "multi",
                "Prompt": "Based on the variance analysis, which of the following conclusions are valid? Select all that apply.",
                "Correct": [
                    "EverFresh benefited from favorable market conditions as the overall beverage market expanded by 100,000 units",
                    "The favorable sales mix variance indicates that customers purchased proportionally more premium products than budgeted",
                    "Despite the overall favorable volume variance, management should investigate the root cause of the market share decline",
                    "If EverFresh had maintained its 25% market share, total sales would have been approximately 125,000 units instead of 115,000 units"
                ],
                "Explanation": "All four statements are correct. (1) Market grew by 100,000 units (500,000 actual − 400,000 budget). (2) Premium Juice Blends made up 43.5% of actual sales vs 40% budgeted, generating a favorable mix variance. (3) The $132,000 unfavorable market share variance signals competitive erosion that requires management attention. (4) At 25% share of 500,000 units = 125,000 units, compared to 115,000 actual units. The statement about price increases is incorrect because there were no selling price changes in the data; the scenario specifically states contribution margins remained at budgeted levels.",
                "Topic": "Variance interpretation and management action",
                "Choices": [
                    "EverFresh benefited from favorable market conditions as the overall beverage market expanded by 100,000 units",
                    "The favorable sales mix variance indicates that customers purchased proportionally more premium products than budgeted",
                    "Despite the overall favorable volume variance, management should investigate the root cause of the market share decline",
                    "If EverFresh had maintained its 25% market share, total sales would have been approximately 125,000 units instead of 115,000 units",
                    "The favorable total volume variance was primarily driven by price increases on premium products"
                ],
                "ItemID": "CBQ5-C3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Variance analysis provides actionable information for management. Favorable aggregate variances can mask underlying unfavorable components that require corrective action.",
                "BusinessInterpretation": "This case illustrates why managers should never rely solely on aggregate variance amounts. A favorable total variance can coexist with serious competitive problems (declining market share). The most valuable insight from variance analysis often comes from the decomposition, not the total.",
                "CalculationRequired": false,
                "CaseID": "CBQ5-C3",
                "EstimatedMinutes": 5,
                "Pack": 5,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    }
];

if (typeof module === 'object' && module.exports) module.exports = ENHANCED_CASE_BASE5;

function cloneEnhancedCase5(c, packLabel, index) {
  return {
    ...c,
    CaseID: `${c.CaseID}-${packLabel}`,
    Title: `${c.Title} (${packLabel} simulation)`,
    ScenarioText: `${c.ScenarioText} This is Pack ${packLabel}, case ${index + 1}; use all exhibits before answering.`
  };
}

const ENHANCED_CASE_BANK5_A = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'A', i));
const ENHANCED_CASE_BANK5_B = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'B', i));
const ENHANCED_CASE_BANK5_C = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'C', i));
const ENHANCED_CASE_BANK5_D = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'D', i));
const ENHANCED_CASE_BANK5_E = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'E', i));
const ENHANCED_CASE_BANK5_F = ENHANCED_CASE_BASE5.map((c, i) => cloneEnhancedCase5(c, 'F', i));
