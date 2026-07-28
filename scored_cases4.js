// Enhanced 2026-style CMA Part 1 case simulations - Pack 4
// These cases are original study content and are not official IMA or Prometric material.


const ENHANCED_CASE_BASE4 = [
    {
        "CaseID": "CBQ4-A1",
        "Title": "Intangible Assets and Goodwill Impairment",
        "SectionTags": [
            "A"
        ],
        "Pack": 4,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Long-lived asset accounting including impairment",
            "Intangible asset recognition and amortization"
        ],
        "Topic": "Impairment",
        "Subtopic": "Asset impairment testing",
        "PrimaryCompetency": "Analysis",
        "SecondaryCompetencies": [
            "Calculation"
        ],
        "Confidence": 100,
        "EstimatedMinutes": 30,
        "ExhibitCount": 1,
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze long-lived asset accounting including impairment",
            "Analyze intangible asset recognition and amortization"
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
        "ScenarioText": "On January 1, Year 1, Orion Corp acquired 100% of the net assets of StarTech for $2,500,000. The fair value of StarTech's identifiable net assets was $2,100,000. Included in the identifiable assets was a patent with a 5-year remaining useful life and a trademark determined to have an indefinite life. At the end of Year 2, Orion assesses Goodwill for impairment. The reporting unit's carrying amount (including goodwill) is $2,400,000 and its fair value is $2,250,000.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Accounting Policy",
                "Body": "Orion uses US GAAP and performs annual impairment testing for indefinite-lived intangibles and goodwill. Step zero (qualitative assessment) was bypassed this year.",
                "ExhibitID": "CBQ4-A1-E1",
                "CaseID": "CBQ4-A1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [{
                "Type": "numeric",
                "Prompt": "Calculate the initial amount of Goodwill recognized on the acquisition date.",
                "Correct": 400000,
                "Explanation": "Under ASC 805 (Business Combinations), goodwill is calculated as the excess of the purchase price over the fair value of identifiable net assets acquired. Purchase price: $2,500,000. Fair value of identifiable net assets: $2,100,000. Goodwill = $2,500,000 - $2,100,000 = $400,000. This represents the future economic benefits arising from assets acquired that are not individually identified and separately recognized. Goodwill is not amortized but is tested for impairment annually at the reporting unit level under ASC 350-20. A common error is to include the patent or trademark value in the net assets total — these are already part of the $2,100,000 FV.",
                "Topic": "Goodwill",
                "ItemID": "CBQ4-A1-Q1",
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
                "CaseID": "CBQ4-A1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Calculate the goodwill impairment loss recognized at the end of Year 2.",
                "Correct": 150000,
                "Explanation": "Under ASC 350-20, goodwill impairment is tested at the reporting unit level using a simplified one-step test: compare the reporting unit's fair value to its carrying amount (including goodwill). Carrying amount: $2,400,000. Fair value: $2,250,000. Since carrying amount exceeds fair value, the impairment loss is the difference: $2,400,000 - $2,250,000 = $150,000. The impairment is limited to the total goodwill balance ($400,000), which is not exceeded here. After the write-down, Orion reports goodwill at $250,000. A common error is to apply the old two-step process or to confuse this with ASC 360 long-lived asset impairment.",
                "Topic": "Impairment",
                "ItemID": "CBQ4-A1-Q2",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "ASC 360 requires impairment testing when events indicate carrying amount may not be recoverable.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-A1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
{
                "Type": "match",
                "Prompt": "Match the asset to its correct amortization and impairment treatment under US GAAP.",
                "Correct": {
                    "Patent": "Amortized over useful life, tested for impairment if triggering event",
                    "Trademark": "Not amortized, tested for impairment at least annually",
                    "Goodwill": "Not amortized, tested for impairment at reporting unit level"
                },
                "Explanation": "Under ASC 350, intangible assets are classified as definite-lived or indefinite-lived. Patents have a finite useful life (5 years per the scenario) and are amortized over that period, with impairment testing required when a triggering event occurs. Trademarks with indefinite life and goodwill are NOT amortized but are tested for impairment at least annually (trademarks at the asset level, goodwill at the reporting unit level). The option 'Amortized over 15 years straight-line' is incorrect because the 15-year tax amortization rule (IRC Section 197) is not GAAP — under GAAP, intangible assets are amortized over their useful life or not amortized if indefinite.",
                "Topic": "Intangibles",
                "LeftItems": [
                    "Patent",
                    "Trademark",
                    "Goodwill"
                ],
                "RightItems": [
                    "Amortized over useful life, tested for impairment if triggering event",
                    "Not amortized, tested for impairment at least annually",
                    "Not amortized, tested for impairment at reporting unit level",
                    "Amortized over 15 years straight-line"
                ],
                "ItemID": "CBQ4-A1-Q3",
                "CognitiveLevel": "Analyze",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "BusinessInterpretation": "Definite-lived are amortized; indefinite-lived and goodwill are not, but face strict impairment rules.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-A1",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "If a reporting unit's fair value is greater than its carrying amount, what is the next step for goodwill impairment testing?",
                "Correct": "No impairment loss is recognized, and no further testing is required",
                "Explanation": "Under ASC 350-20, goodwill impairment testing uses a simplified one-step approach: if the reporting unit's fair value exceeds its carrying amount (including goodwill), no impairment exists and no further testing is required. The old two-step process (calculating implied fair value of goodwill) was eliminated by ASU 2017-04. A qualitative assessment (Step 0) is an optional screening step that was bypassed here per the exhibit. 'Recognize an impairment gain' is incorrect — impairment losses reduce the asset; gains are not recognized simply because FV exceeds carrying amount. A candidate selecting 'Calculate implied fair value of goodwill' is thinking of the pre-2017 two-step impairment test.",
                "Topic": "Impairment",
                "Choices": [
                    "No impairment loss is recognized, and no further testing is required",
                    "Calculate the implied fair value of goodwill",
                    "Perform a qualitative assessment",
                    "Recognize an impairment gain"
                ],
                "ItemID": "CBQ4-A1-Q5",
                "CognitiveLevel": "Analyze",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ASC 360 requires impairment testing when events indicate carrying amount may not be recoverable.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-A1",
                "EstimatedMinutes": 4,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
{
                "Type": "multi",
                "Prompt": "Which of the following would be capitalized as part of the cost of an internally developed patent?",
                "Correct": [
                    "Successful legal defense costs",
                    "Registration fees"
                ],
                "Explanation": "Under ASC 730, research and development costs are expensed as incurred — they are NOT capitalized as part of a patent's cost. Only direct costs of obtaining and defending the patent are capitalized. Successful legal defense costs are capitalized because they preserve the patent's economic benefit. Registration fees are a direct cost of obtaining the patent right. R&D costs are expensed (ASC 730-10-25-1) — this is a fundamental principle in U.S. GAAP. General administrative overhead is a period expense, not traceable to the patent. A candidate selecting R&D may not realize that U.S. GAAP requires immediate expensing of R&D unlike IFRS which may permit capitalization of development costs.",
                "Topic": "Intangibles",
                "Choices": [
                    "Successful legal defense costs",
                    "Registration fees",
                    "Research and development costs",
                    "General administrative overhead"
                ],
                "ItemID": "CBQ4-A1-Q4",
                "CognitiveLevel": "Evaluate",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-A1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            }],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ4-A2",
        "Title": "Contingencies and Warranty Liabilities",
        "SectionTags": [
            "A"
        ],
        "Pack": 4,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Warranties",
            "Contingencies"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Contingencies",
        "SecondaryCompetencies": [
            "Analysis",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Financial reporting",
        "CompanyName": "During Year",
        "CompanyType": "Company",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Easy",
        "DifficultyScore": 1,
        "EstimatedMinutes": 25,
        "ExhibitCount": 1,
        "Industry": "General business",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze warranties",
            "Analyze warranties",
            "Analyze contingencies",
            "Analyze contingencies",
            "Analyze contingencies"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Chief Information Officer",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "During Year 1, Nova Manufacturing introduced a new product carrying a 2-year warranty. Sales were $5,000,000. Nova estimates warranty costs will be 2% of sales in the first year and 3% in the second year. Actual warranty claims paid in Year 1 were $80,000. Separately, Nova is defending a lawsuit; legal counsel states a loss is probable and estimates the payout range between $200,000 and $500,000, with no amount in the range being a better estimate than any other.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Legal Claims Summary",
                "Headers": [
                    "Claim",
                    "Likelihood",
                    "Estimated Amount"
                ],
                "Rows": [
                    [
                        "Environmental Fine",
                        "Reasonably Possible",
                        "$100,000"
                    ],
                    [
                        "Patent Infringement",
                        "Probable",
                        "$200,000 - $500,000"
                    ]
                ],
                "ExhibitID": "CBQ4-A2-E1",
                "CaseID": "CBQ4-A2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [{
                "Type": "fill",
                "Prompt": "A contingent gain is generally recognized in the financial statements only when it is ____________.",
                "Correct": "realized",
                "Explanation": "Under ASC 450 and the conservatism principle, gain contingencies are NOT accrued in the financial statements until realized. Unlike loss contingencies (which may be accrued when probable), gains are only recognized when realized or realizable � typically when cash is received or the gain event is completed. This asymmetric treatment reflects the conservatism principle: anticipate no profits, but provide for all losses. Adequate disclosure of gain contingencies in the footnotes is permitted to avoid misleading financial statement users, but the gain itself is not recognized until realized.",
                "Topic": "Contingencies",
                "ItemID": "CBQ4-A2-Q5",
                "CognitiveLevel": "Understand",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-A2",
                "EstimatedMinutes": 3,
                "Pack": 4,
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
                "Prompt": "Calculate the total warranty expense reported on the Year 1 income statement.",
                "Correct": 250000,
                "Explanation": "Under ASC 460 (Guarantees), warranty expense is recognized in the same period as the related sale (matching principle). Total estimated warranty cost: 2% (Year 1 repairs) + 3% (Year 2 repairs) = 5% of sales. Year 1 sales: $5,000,000. Warranty expense = $5,000,000 x 5% = $250,000. This is recognized as an expense on the income statement with a corresponding warranty liability on the balance sheet. Actual claims paid ($80,000) reduce the liability but do NOT affect the expense recognized.",
                "Topic": "Warranties",
                "ItemID": "CBQ4-A2-Q1",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "FinancialStatementAnalysis"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-A2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Calculate the warranty liability balance at the end of Year 1.",
                "Correct": 170000,
                "Explanation": "The warranty liability at year-end equals the total expense recognized less actual warranty claims paid during the period. Total warranty expense (recognized at sale): $250,000. Actual claims paid in Year 1: $80,000. Ending warranty liability = $250,000 - $80,000 = $170,000. This liability represents the remaining estimated future warranty costs for products sold but not yet repaired. Under ASC 460, the liability is classified as current or noncurrent based on when claims are expected to be satisfied.",
                "Topic": "Warranties",
                "ItemID": "CBQ4-A2-Q2",
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
                "CaseID": "CBQ4-A2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "What amount should Nova accrue as a liability for the Patent Infringement lawsuit?",
                "Correct": 200000,
                "Explanation": "Under ASC 450 (Contingencies), a loss contingency is accrued when it is probable (likely to occur) and the amount can be reasonably estimated. When the estimated loss falls within a range ($200,000 - $500,000) and no amount within the range is a better estimate than any other, U.S. GAAP requires accrual of the MINIMUM amount: $200,000. The remaining $300,000 potential exposure ($500,000 - $200,000) is disclosed in the footnotes as a reasonably possible additional loss. A common error is to accrue the midpoint ($350,000) or the maximum ($500,000).",
                "Topic": "Contingencies",
                "ItemID": "CBQ4-A2-Q3",
                "CognitiveLevel": "Apply",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-A2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "How should Nova handle the Environmental Fine claim?",
                "Correct": "Disclose the nature and estimated amount in the footnotes only",
                "Explanation": "Under ASC 450, loss contingencies are classified into three categories: (1) probable and estimable � accrue; (2) reasonably possible � disclose in footnotes; (3) remote � no disclosure required. The environmental fine is reasonably possible (not probable), so Nova must disclose the nature and estimated amount in the footnotes but NOT accrue it. Accruing $100,000 is incorrect because accrual requires probability. Ignoring until probable violates disclosure requirements. Recording as an extraordinary loss is incorrect � extraordinary item classification was eliminated by ASU 2015-01.",
                "Topic": "Contingencies",
                "Choices": [
                    "Accrue $100,000 as a liability",
                    "Disclose the nature and estimated amount in the footnotes only",
                    "Ignore completely until it becomes probable",
                    "Record as an extraordinary loss"
                ],
                "ItemID": "CBQ4-A2-Q4",
                "CognitiveLevel": "Analyze",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-A2",
                "EstimatedMinutes": 4,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "A",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            }],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ4-B1",
        "Title": "Cost Estimation and High-Low Method",
        "SectionTags": [
            "B"
        ],
        "Pack": 4,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "High-Low",
            "Regression",
            "Cost Behavior"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "High-Low",
        "Subtopic": "Regression analysis for forecasting",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Apex Logistics",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Apply high-low method to estimate cost behavior",
            "Calculate variable cost per unit using high-low method",
            "Apply regression analysis for cost estimation",
            "Interpret regression output (R-squared, coefficients)",
            "Compare high-low method against regression analysis"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Production",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Apex Logistics (Management)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Apex Logistics wants to estimate the fixed and variable components of its warehouse maintenance costs. Over the past 6 months, the highest activity level was 8,000 machine hours with a total cost of $42,000. The lowest activity level was 5,000 machine hours with a total cost of $30,000. A regression analysis output shows an Intercept of $11,000, an X Variable 1 coefficient of $3.90, and an R-squared of 0.85.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Manager's Note",
                "Body": "We need to compare the High-Low method results against the Simple Linear Regression results to budget for 7,000 machine hours next month.",
                "ExhibitID": "CBQ4-B1-E1",
                "CaseID": "CBQ4-B1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the variable cost per machine hour using the High-Low method.",
                "Correct": 4,
                "Explanation": "Change in cost / Change in activity = ($42,000 - $30,000) / (8,000 - 5,000) = $12,000 / 3,000 = $4/hour.",
                "Topic": "High-Low",
                "ItemID": "CBQ4-B1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-B1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Calculate the total fixed cost using the High-Low method.",
                "Correct": 10000,
                "Explanation": "Total Cost - (VC/hr x Hours) = $42,000 - ($4 x 8,000) = $10,000.",
                "Topic": "High-Low",
                "ItemID": "CBQ4-B1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-B1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "What is the estimated total cost for 7,000 hours using the Regression model?",
                "Correct": 38300,
                "Explanation": "Y = a + bX = $11,000 + ($3.90 x 7,000) = $11,000 + $27,300 = $38,300.",
                "Topic": "Regression",
                "ItemID": "CBQ4-B1-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 19: Correlation",
                "AccountingPrinciple": "Regression analysis estimates relationship between variables: Y = a + bX.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B1",
                "DecisionTreeReference": "Regression",
                "EstimatedMinutes": 5,
                "FormulaReference": "Regression Equation",
                "Pack": 4,
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
                "Type": "select",
                "Prompt": "What does the R-squared value of 0.85 indicate?",
                "Correct": "85% of the variation in total cost is explained by machine hours",
                "Explanation": "R-squared (coefficient of determination) represents the proportion of variance in the dependent variable explained by the independent variable.",
                "Topic": "Regression",
                "Choices": [
                    "85% of the variation in total cost is explained by machine hours",
                    "The correlation coefficient is 0.85",
                    "There is an 85% probability that the cost prediction is perfectly accurate",
                    "Fixed costs are 85% of total costs"
                ],
                "ItemID": "CBQ4-B1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 19: Correlation",
                "AccountingPrinciple": "Regression analysis estimates relationship between variables: Y = a + bX.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B1",
                "DecisionTreeReference": "Regression",
                "EstimatedMinutes": 4,
                "FormulaReference": "Regression Equation",
                "Pack": 4,
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
                "Prompt": "What are the primary disadvantages of the High-Low method compared to regression?",
                "Correct": [
                    "It only uses two data points",
                    "It is heavily influenced by outliers"
                ],
                "Explanation": "High-Low is simple but ignores all intermediate data and is skewed by extreme highs/lows.",
                "Topic": "Cost Behavior",
                "Choices": [
                    "It only uses two data points",
                    "It is heavily influenced by outliers",
                    "It is too complex to calculate without statistical software",
                    "It cannot separate fixed from variable costs"
                ],
                "ItemID": "CBQ4-B1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Costs classified as variable, fixed, or mixed based on how total cost changes with activity.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-B1",
                "DecisionTreeReference": "Cost Behavior",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "B",
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
        "CaseID": "CBQ4-C1",
        "Title": "Standard Costing: 3-Way and 4-Way Overhead Variances",
        "SectionTags": [
            "C"
        ],
        "Pack": 4,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "VOH Variances",
            "FOH Variances",
            "Overhead Variances"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "VOH Variances",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Vanguard Manufacturing",
        "CompanyType": "Service provider",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Easy",
        "DifficultyScore": 1,
        "EstimatedMinutes": 30,
        "ExhibitCount": 1,
        "Industry": "Laboratory services",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze voh variances",
            "Analyze voh variances",
            "Analyze foh variances",
            "Analyze foh variances",
            "Analyze overhead variances"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Operations Manager",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Vanguard Manufacturing uses standard costing. The denominator level of activity is 10,000 direct labor hours (DLH). Standard fixed overhead is $50,000. Standard variable overhead is $3 per DLH. The standard requires 2 DLH per unit produced. Actual results for the period: Units produced: 4,800. Actual DLH: 9,800. Actual fixed overhead: $52,000. Actual variable overhead: $31,000.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Standard Rates",
                "Body": "Fixed OH Rate = $50,000 / 10,000 DLH = $5/DLH. Total Standard OH Rate = $8/DLH.",
                "ExhibitID": "CBQ4-C1-E1",
                "CaseID": "CBQ4-C1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the Variable Overhead Spending Variance (enter unfavorable as positive, favorable as negative, or just absolute value).",
                "Correct": 1600,
                "Explanation": "The Variable Overhead Spending Variance measures the difference between actual variable overhead incurred and the standard variable overhead allowed for actual hours worked. Actual VOH: $31,000. Standard VOH for actual hours: 9,800 DLH x $3/DLH = $29,400. Spending variance = $31,000 - $29,400 = $1,600 Unfavorable. This is unfavorable because Nova spent more on VOH ($31,000) than the standard allows for the hours actually worked ($29,400). The VOH spending variance combines both price and usage effects of variable overhead items and is the responsibility of the production supervisor.",
                "Topic": "VOH Variances",
                "ItemID": "CBQ4-C1-Q1",
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
                "CaseID": "CBQ4-C1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Variable Overhead Efficiency Variance.",
                "Correct": 600,
                "Explanation": "The Variable Overhead Efficiency Variance measures the difference between actual hours worked and the standard hours allowed for actual output, valued at the standard VOH rate. Standard hours for actual output: 4,800 units x 2 DLH/unit = 9,600 DLH. Actual hours: 9,800 DLH. Efficiency variance = (9,800 - 9,600) x $3/DLH = 200 x $3 = $600 Unfavorable. The 200 excess hours indicate lower labor efficiency, which drives higher variable overhead (since VOH is applied based on DLH). The efficiency variance is distinct from the spending variance � together they reconcile actual VOH to applied VOH (the 3-way analysis).",
                "Topic": "VOH Variances",
                "ItemID": "CBQ4-C1-Q2",
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
                "CaseID": "CBQ4-C1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Fixed Overhead Production-Volume Variance.",
                "Correct": 2000,
                "Explanation": "The Fixed Overhead Production-Volume Variance measures whether the company produced at, above, or below the denominator level of activity used to set the fixed overhead rate. Denominator hours: 10,000 DLH (budgeted capacity). Standard hours for actual output: 4,800 units x 2 DLH = 9,600 DLH. Volume variance = (10,000 - 9,600) x $5/DLH = 400 x $5 = $2,000 Unfavorable. The unfavorable variance means production volume was below the denominator level � the fixed overhead was underapplied because fewer units were produced than planned. This is NOT controllable by the production supervisor; it reflects capacity utilization decisions made at a higher management level.",
                "Topic": "FOH Variances",
                "ItemID": "CBQ4-C1-Q3",
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
                "CaseID": "CBQ4-C1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "numeric",
                "Prompt": "Calculate the Fixed Overhead Spending (Budget) Variance.",
                "Correct": 2000,
                "Explanation": "The Fixed Overhead Spending (Budget) Variance measures the difference between actual fixed overhead incurred and the budgeted fixed overhead. Actual FOH: $52,000. Budgeted FOH: $50,000. Spending variance = $52,000 - $50,000 = $2,000 Unfavorable. This unfavorable variance indicates Nova spent $2,000 more on fixed overhead than budgeted. Unlike variable overhead, the spending variance is the only controllable element for fixed overhead � the volume variance is a capacity utilization measure. In a 4-way analysis, FOH is split into spending variance and volume variance.",
                "Topic": "FOH Variances",
                "ItemID": "CBQ4-C1-Q4",
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
                "CaseID": "CBQ4-C1",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "C",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active"
            },
            {
                "Type": "select",
                "Prompt": "Which variance is NEVER considered controllable by the production supervisor?",
                "Correct": "Fixed overhead production-volume variance",
                "Explanation": "The fixed overhead production-volume variance is NEVER controllable by the production supervisor because it arises from the difference between the denominator activity level (set by top management for capacity planning) and actual production volume. The supervisor controls spending and efficiency on the shop floor but cannot influence how many units the company produces relative to budgeted capacity. VOH spending and efficiency variances are directly affected by supervisor decisions (material prices, labor efficiency). FOH spending variance reflects deviations from budget that may include supervisor-influenced items. But the volume variance is purely a function of whether production met the denominator level � a management decision, not a shop-floor performance measure.",
                "Topic": "Overhead Variances",
                "Choices": [
                    "Variable overhead spending variance",
                    "Variable overhead efficiency variance",
                    "Fixed overhead spending variance",
                    "Fixed overhead production-volume variance"
                ],
                "ItemID": "CBQ4-C1-Q5",
                "CognitiveLevel": "Analyze",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-C1",
                "EstimatedMinutes": 4,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "C",
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
        "CaseID": "CBQ4-C2",
        "Title": "Customer Profitability Analysis",
        "SectionTags": [
            "C"
        ],
        "Pack": 4,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Customer Profitability Analysis"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Customer Profitability Analysis",
        "Subtopic": "Activity-based costing",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Great Lakes Distribution",
        "CompanyType": "Distributor",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "Food distribution",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze customer profitability analysis",
            "Analyze customer profitability analysis",
            "Analyze customer profitability analysis",
            "Analyze customer profitability analysis",
            "Analyze customer profitability analysis"
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
                "Summary": "Full content authoring — customer profitability analysis using ABC cost hierarchy levels and profitability drivers"
            }
        ],
        "Stakeholder": "VP of Sales",
        "Tags": [
            "customer profitability",
            "ABC",
            "activity-based costing",
            "cost hierarchy",
            "customer-sustaining costs",
            "batch-level costs"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Great Lakes Distribution is a regional food distributor serving 450 grocery stores, restaurants, and institutions across five states. Annual revenue is $185 million. The company distributes over 4,000 products from 120 suppliers. Management has noticed that some customers require significantly more support than others but are charged similar prices. The CFO has initiated a customer profitability analysis using activity-based costing to identify which customers are profitable and which may need pricing adjustments or service level changes.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Customer ABC Cost Data (Selected Customers)",
                "Headers": [
                    "Customer",
                    "Annual Revenue",
                    "COGS",
                    "Order Count",
                    "Sales Visits",
                    "Special Requests",
                    "Delivery Stops"
                ],
                "Rows": [
                    [
                        "Corner Grocers (chain)",
                        "$2,450,000",
                        "$1,715,000",
                        "360",
                        "12",
                        "5",
                        "48"
                    ],
                    [
                        "Lakeside Restaurant",
                        "$185,000",
                        "$129,500",
                        "240",
                        "24",
                        "25",
                        "240"
                    ],
                    [
                        "County Hospital Kitchen",
                        "$620,000",
                        "$434,000",
                        "180",
                        "6",
                        "3",
                        "36"
                    ],
                    [
                        "Campus Dining (university)",
                        "$1,180,000",
                        "$826,000",
                        "300",
                        "8",
                        "2",
                        "120"
                    ]
                ],
                "ExhibitID": "CBQ4-C2-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Great Lakes Distribution uses the ABC cost hierarchy to classify activities. Match each activity cost to the correct hierarchy level.",
                "LeftItems": [
                    "Processing a customer's individual purchase order",
                    "Making a sales call to a retail customer",
                    "Product sourcing and supplier qualification for each product line",
                    "Receiving and storing a pallet of goods from a supplier"
                ],
                "RightItems": [
                    "Batch-level cost — each order requires order processing regardless of order size",
                    "Customer-sustaining cost — sales visits support the customer relationship, not individual orders",
                    "Product-sustaining cost — sourcing activities maintain the product line's availability in the assortment",
                    "Unit-level cost — receiving costs vary with each pallet of goods handled",
                    "Facility-sustaining cost — corporate overhead not traceable to specific activities"
                ],
                "Correct": {
                    "Processing a customer's individual purchase order": "Batch-level cost — each order requires order processing regardless of order size",
                    "Making a sales call to a retail customer": "Customer-sustaining cost — sales visits support the customer relationship, not individual orders",
                    "Product sourcing and supplier qualification for each product line": "Product-sustaining cost — sourcing activities maintain the product line's availability in the assortment",
                    "Receiving and storing a pallet of goods from a supplier": "Unit-level cost — receiving costs vary with each pallet of goods handled"
                },
                "Explanation": "Order processing is a batch-level cost because it is incurred each time a customer places an order, regardless of order size. Sales visits are customer-sustaining because they maintain the customer relationship. Product sourcing is product-sustaining — it supports individual products or product lines. Receiving individual pallets is unit-level (each pallet incurs receiving cost). Facility-sustaining costs (building rent, utilities) are not driven by any of these activities.",
                "Topic": "ABC cost hierarchy — activity classification",
                "ItemID": "CBQ4-C2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The ABC cost hierarchy classifies costs into unit-level, batch-level, product-sustaining, customer-sustaining, and facility-sustaining categories based on the cost driver that causes the cost to be incurred.",
                "BusinessInterpretation": "Understanding the cost hierarchy is essential for customer profitability analysis. A customer with many small orders may appear unprofitable if batch-level costs are not properly assigned to their orders.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-C2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "Based on the ABC cost hierarchy, match each cost driver to the cost it most appropriately drives.",
                "LeftItems": [
                    "Number of purchase orders placed",
                    "Number of sales calls made to each customer",
                    "Number of products carried in the product line",
                    "Number of delivery stops per route"
                ],
                "RightItems": [
                    "Batch-level — order entry, picking, and shipping costs vary with order count",
                    "Customer-sustaining — sales and account management costs vary with customer relationship intensity",
                    "Product-sustaining — category management and vendor compliance costs vary with product count",
                    "Batch-level — delivery routing and stop costs vary with each delivery stop",
                    "Unit-level — cost of goods sold varies with each unit sold"
                ],
                "Correct": {
                    "Number of purchase orders placed": "Batch-level — order entry, picking, and shipping costs vary with order count",
                    "Number of sales calls made to each customer": "Customer-sustaining — sales and account management costs vary with customer relationship intensity",
                    "Number of products carried in the product line": "Product-sustaining — category management and vendor compliance costs vary with product count",
                    "Number of delivery stops per route": "Batch-level — delivery routing and stop costs vary with each delivery stop"
                },
                "Explanation": "Order-related costs (processing, picking, shipping) are driven by the number of orders — a batch-level cost. Sales call costs are customer-sustaining because they relate to managing the customer relationship. Product line breadth drives product-sustaining costs. Delivery stops are batch-level — each stop incurs a fixed cost for driver time and fuel. Cost of goods sold is unit-level, but it is not driven by number of delivery stops.",
                "Topic": "Cost driver identification in ABC",
                "ItemID": "CBQ4-C2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ABC assigns costs to cost objects based on cause-effect relationships. Cost drivers should reflect the factor that causes the cost to be incurred. Choosing the right cost driver is critical for accurate cost assignment.",
                "BusinessInterpretation": "Using a single cost driver like revenue or COGS to allocate all customer-related costs can significantly distort customer profitability. Multiple cost drivers improve accuracy.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-C2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "Referring to Exhibit 1, Great Lakes Distribution wants to calculate customer-level profitability. Match each cost allocation approach to its correct description.",
                "LeftItems": [
                    "Allocating order processing costs to customers",
                    "Allocating sales visit costs to customers",
                    "Allocating delivery costs to customers",
                    "Allocating product sourcing costs to customers"
                ],
                "RightItems": [
                    "Use number of orders as the allocation base — each customer is charged proportionally to order count",
                    "Use number of sales visits as the allocation base — each customer is charged proportionally to visit frequency",
                    "Use number of delivery stops as the allocation base — each customer is charged proportionally to stop frequency",
                    "Use number of products purchased as the allocation base — customers buying from more product lines bear more sourcing cost",
                    "Use revenue as the allocation base — larger customers bear more cost regardless of service consumption"
                ],
                "Correct": {
                    "Allocating order processing costs to customers": "Use number of orders as the allocation base — each customer is charged proportionally to order count",
                    "Allocating sales visit costs to customers": "Use number of sales visits as the allocation base — each customer is charged proportionally to visit frequency",
                    "Allocating delivery costs to customers": "Use number of delivery stops as the allocation base — each customer is charged proportionally to stop frequency",
                    "Allocating product sourcing costs to customers": "Use number of products purchased as the allocation base — customers buying from more product lines bear more sourcing cost"
                },
                "Explanation": "Each cost should be allocated using the driver that reflects cause-effect. Orders drive order processing. Sales visits drive sales costs. Delivery stops drive delivery costs. Product breadth drives sourcing costs. Using revenue as an allocation base is a traditional (non-ABC) approach that can distort profitability — a high-revenue customer that buys only one product with few orders would subsidize a low-revenue customer with many small orders and many products.",
                "Topic": "Allocation base selection for customer profitability",
                "ItemID": "CBQ4-C2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ABC allocates costs based on cause-effect relationships. Using multiple cost drivers provides more accurate customer cost information than traditional single-pool allocation methods.",
                "BusinessInterpretation": "The choice of allocation base can change which customers appear profitable. Companies that switch from traditional costing to ABC often find that large, low-service customers are more profitable than previously believed.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-C2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "Using the data in Exhibit 1, classify each customer based on the likely profitability profile when ABC costing is applied.",
                "LeftItems": [
                    "Corner Grocers chain — $2.45M revenue, 360 orders, 12 sales visits",
                    "Lakeside Restaurant — $185K revenue, 240 orders, 24 sales visits, 25 special requests",
                    "County Hospital Kitchen — $620K revenue, 180 orders, 6 sales visits",
                    "Campus Dining — $1.18M revenue, 300 orders, 120 delivery stops"
                ],
                "RightItems": [
                    "High profit potential — high revenue, moderate service demands, 67% gross margin",
                    "Low profit potential — low revenue, very high service intensity relative to revenue",
                    "Moderate profit potential — mid-size revenue, low service intensity, efficient operations",
                    "Moderate profit potential — good revenue but higher delivery costs due to many delivery stops",
                    "Negative profit — costs exceed revenue"
                ],
                "Correct": {
                    "Corner Grocers chain — $2.45M revenue, 360 orders, 12 sales visits": "High profit potential — high revenue, moderate service demands, 67% gross margin",
                    "Lakeside Restaurant — $185K revenue, 240 orders, 24 sales visits, 25 special requests": "Low profit potential — low revenue, very high service intensity relative to revenue",
                    "County Hospital Kitchen — $620K revenue, 180 orders, 6 sales visits": "Moderate profit potential — mid-size revenue, low service intensity, efficient operations",
                    "Campus Dining — $1.18M revenue, 300 orders, 120 delivery stops": "Moderate profit potential — good revenue but higher delivery costs due to many delivery stops"
                },
                "Explanation": "Corner Grocers generates high revenue with moderate service demands and healthy 67% gross margin — the most profitable profile. Lakeside Restaurant generates only $185K but requires 240 orders and 24 sales visits — extremely high service intensity relative to revenue. County Hospital is efficient with only 180 orders and 6 visits. Campus Dining has good revenue but 120 delivery stops (one per delivery day) increases distribution costs. None of these customers would show negative profit, but Lakeside's profit margin would be very thin after ABC allocation.",
                "Topic": "Customer profitability analysis — interpreting results",
                "ItemID": "CBQ4-C2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Customer profitability analysis uses ABC to assign customer-related costs to individual customers. It reveals that not all revenue is profitable and helps management make pricing and service decisions.",
                "BusinessInterpretation": "The most revenue does not always equal the most profit. ABC customer analysis often reveals that a small percentage of customers generate the majority of profits. Service-level adjustments for low-profit customers can improve overall profitability.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-C2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "Based on the customer profitability analysis, Great Lakes Distribution is considering strategic actions. Match each potential action to the most appropriate customer situation.",
                "LeftItems": [
                    "Lakeside Restaurant shows very low profitability despite moderate total purchases",
                    "Corner Grocers chain is highly profitable and has potential to grow",
                    "County Hospital Kitchen has efficient operations and consistent ordering patterns",
                    "Campus Dining has good revenue but frequent small deliveries increase costs"
                ],
                "RightItems": [
                    "Reprice or restructure service — consider minimum order quantities or service fees for high-touch, low-revenue customers",
                    "Invest and grow — offer volume discounts or dedicated support to strengthen the relationship",
                    "Maintain — current service level is efficient and profitable; monitor for changes",
                    "Negotiate delivery schedule — consolidate deliveries to reduce stop frequency while maintaining service quality",
                    "Terminate relationship — costs exceed any possible revenue"
                ],
                "Correct": {
                    "Lakeside Restaurant shows very low profitability despite moderate total purchases": "Reprice or restructure service — consider minimum order quantities or service fees for high-touch, low-revenue customers",
                    "Corner Grocers chain is highly profitable and has potential to grow": "Invest and grow — offer volume discounts or dedicated support to strengthen the relationship",
                    "County Hospital Kitchen has efficient operations and consistent ordering patterns": "Maintain — current service level is efficient and profitable; monitor for changes",
                    "Campus Dining has good revenue but frequent small deliveries increase costs": "Negotiate delivery schedule — consolidate deliveries to reduce stop frequency while maintaining service quality"
                },
                "Explanation": "Different profit profiles require different strategies. Low-profit, high-touch customers may need pricing or service restructuring. High-profit customers should be retained and grown. Efficient, moderate-profit customers should be maintained with monitoring. Customers with cost drivers that can be modified (like delivery frequency) may become more profitable through operational changes. Termination is only appropriate when costs exceed any feasible pricing or service adjustment.",
                "Topic": "Strategic actions from customer profitability analysis",
                "ItemID": "CBQ4-C2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Customer profitability analysis informs strategic decisions including pricing, service level design, customer acquisition targeting, and relationship management. It links cost accounting to business strategy.",
                "BusinessInterpretation": "Not all customers should be treated equally. The 80/20 rule often applies — 80% of profits come from 20% of customers. Management should invest in high-profit customers and consider service changes for low-profit customers.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-C2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
        "CaseID": "CBQ4-D1",
        "Title": "Theory of Constraints & Throughput Contribution Analysis",
        "SectionTags": [
            "D"
        ],
        "Pack": 4,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Throughput contribution",
            "Optimal product mix — TOC",
            "TOC priority ranking",
            "Throughput accounting concepts",
            "TOC five focusing steps"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Contribution Margin",
        "Subtopic": "Bottleneck analysis",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Apex Electronics",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze throughput contribution",
            "Analyze optimal product mix — toc",
            "Analyze toc priority ranking",
            "Analyze throughput accounting concepts",
            "Analyze toc five focusing steps",
            "Analyze toc terminology"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Production",
        "QAReviewer": "Validator",
        "QuestionCount": 6,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Operations Manager",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Apex Electronics manufactures three products that all pass through Machine M7, which has limited monthly capacity. The operations manager must determine the optimal product mix to maximize throughput for the upcoming production cycle and present the plan to the plant manager.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Product Data & Machine M7 Capacity",
                "Headers": [
                    "Product",
                    "Selling Price",
                    "Direct Materials Cost",
                    "Time on Machine M7 (minutes per unit)",
                    "Monthly Demand (units)"
                ],
                "Rows": [
                    [
                        "Product X",
                        "$200",
                        "$80",
                        "15",
                        "500"
                    ],
                    [
                        "Product Y",
                        "$300",
                        "$120",
                        "20",
                        "400"
                    ],
                    [
                        "Product Z",
                        "$250",
                        "$100",
                        "10",
                        "600"
                    ],
                    [
                        "Machine M7 available capacity",
                        "200 hours per month",
                        "",
                        "",
                        ""
                    ]
                ],
                "ExhibitID": "CBQ4-D1-E1",
                "CaseID": "CBQ4-D1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 — TOC Definitions & Decision Rule",
                "Headers": [
                    "TOC Measure",
                    "Definition"
                ],
                "Rows": [
                    [
                        "Throughput",
                        "Sales price minus direct materials cost"
                    ],
                    [
                        "Operating expense",
                        "All costs except direct materials"
                    ],
                    [
                        "Inventory",
                        "Materials purchased but not yet sold"
                    ],
                    [
                        "Constraint (bottleneck)",
                        "Any resource whose capacity limits throughput"
                    ],
                    [
                        "TOC decision rule",
                        "Maximize throughput per unit of the bottleneck resource"
                    ]
                ],
                "ExhibitID": "CBQ4-D1-E2",
                "CaseID": "CBQ4-D1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the throughput contribution per unit for Product Z.",
                "Correct": "150",
                "Explanation": "Throughput = Selling price − Direct materials = $250 − $100 = $150 per unit. Only direct materials is treated as a truly variable cost in TOC throughput accounting.",
                "Topic": "Throughput contribution",
                "ItemID": "CBQ4-D1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-D1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Calculate the total monthly throughput contribution under the optimal product mix. Round to the nearest whole dollar.",
                "Correct": "144000",
                "Explanation": "Machine M7 capacity = 200 hrs × 60 = 12,000 minutes. Throughput per bottleneck minute: X = ($200 − $80)/15 = $8.00, Y = ($300 − $120)/20 = $9.00, Z = ($250 − $100)/10 = $15.00. Priority: Z first, then Y, then X. Z: 600 units × 10 min = 6,000 min, throughput = 600 × $150 = $90,000. Remaining: 6,000 min. Y: 6,000 / 20 = 300 units (limited by capacity, demand is 400), throughput = 300 × $180 = $54,000. Total = $90,000 + $54,000 = $144,000. Product X cannot be produced. A common trap is ranking by throughput per unit rather than per bottleneck minute.",
                "Topic": "Optimal product mix — TOC",
                "ItemID": "CBQ4-D1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Complex",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "BusinessInterpretation": "cannot be produced. A common trap is ranking by throughput per unit rather than per bottleneck minute.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-D1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Based on the TOC decision rule, which product should receive first priority in the production schedule?",
                "Choices": [
                    "Product Z, because it has the highest throughput per bottleneck minute",
                    "Product Y, because it has the highest throughput per unit",
                    "Product X, because it uses the fewest bottleneck minutes per unit",
                    "Product Y, because it has the highest selling price"
                ],
                "Correct": "Product Z, because it has the highest throughput per bottleneck minute",
                "Explanation": "Z has the highest throughput per bottleneck minute at $15.00, compared to Y at $9.00 and X at $8.00. TOC dictates maximizing throughput per unit of the constraint, not per unit of output or selling price.",
                "Topic": "TOC priority ranking",
                "ItemID": "CBQ4-D1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-D1",
                "EstimatedMinutes": 4,
                "Pack": 4,
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
                "Prompt": "Select the correct statements about throughput accounting as defined in the Theory of Constraints.",
                "Choices": [
                    "Direct materials is treated as the only truly variable cost",
                    "Direct labor is classified as an operating expense, not throughput",
                    "The goal is to maximize total throughput contribution given the bottleneck",
                    "Inventory is valued at full absorption cost including fixed overhead"
                ],
                "Correct": [
                    "Direct materials is treated as the only truly variable cost",
                    "Direct labor is classified as an operating expense, not throughput",
                    "The goal is to maximize total throughput contribution given the bottleneck"
                ],
                "Explanation": "TOC considers direct materials the only unit-level variable cost. Direct labor is typically fixed in the short term and classified as operating expense. The goal is throughput maximization, not cost minimization. TOC values inventory only at materials cost, not full absorption cost.",
                "Topic": "Throughput accounting concepts",
                "ItemID": "CBQ4-D1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-D1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "fill",
                "Prompt": "In TOC, the five focusing steps begin with: Identify the system's ______.",
                "Correct": "constraint",
                "Explanation": "The five focusing steps are: (1) Identify the constraint, (2) Exploit the constraint, (3) Subordinate everything else, (4) Elevate the constraint, (5) Repeat. Identifying the bottleneck is always the first step.",
                "Topic": "TOC five focusing steps",
                "ItemID": "CBQ4-D1-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-D1",
                "EstimatedMinutes": 3,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "Match each TOC measure to its correct definition.",
                "LeftItems": [
                    "Throughput",
                    "Operating expense",
                    "Inventory",
                    "Constraint"
                ],
                "RightItems": [
                    "Sales price minus direct materials",
                    "All costs except direct materials",
                    "Materials purchased but not yet sold",
                    "Resource that limits overall output"
                ],
                "Correct": {
                    "Throughput": "Sales price minus direct materials",
                    "Operating expense": "All costs except direct materials",
                    "Inventory": "Materials purchased but not yet sold",
                    "Constraint": "Resource that limits overall output"
                },
                "Explanation": "Throughput equals selling price minus direct materials only. Operating expense includes labor, rent, and depreciation — all non-materials costs. Inventory represents purchased materials not yet sold. The constraint is the bottleneck limiting throughput.",
                "Topic": "TOC terminology",
                "ItemID": "CBQ4-D1-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "COSO ERM integrates strategy, objectives, and performance across the enterprise.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D1",
                "DecisionTreeReference": "COSO ERM",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
        "CaseID": "CBQ4-D2",
        "Title": "Just-In-Time Manufacturing & Lean Waste Reduction",
        "SectionTags": [
            "D"
        ],
        "Pack": 4,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Inventory carrying cost — JIT",
            "JIT cost savings",
            "Setup reduction — SMED",
            "JIT system characteristics",
            "Kanban"
        ],
        "PrimaryCompetency": "Calculation",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Topic": "Lean",
        "Subtopic": "JIT inventory and waste reduction",
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Metro Components",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze inventory carrying cost — jit",
            "Analyze jit cost savings",
            "Analyze setup reduction — smed",
            "Analyze jit system characteristics",
            "Analyze kanban",
            "Analyze lean terminology"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Production",
        "QAReviewer": "Validator",
        "QuestionCount": 6,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Metro Components (Controller)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Metro Components is transitioning from traditional batch production to a just-in-time manufacturing cell layout. The plant controller must quantify the projected cost savings from lower inventory and defect reduction, and recommend JIT implementation practices to the continuous improvement steering committee.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Current vs JIT Target Comparison",
                "Headers": [
                    "Metric",
                    "Current (Batch System)",
                    "JIT Target"
                ],
                "Rows": [
                    [
                        "Raw materials inventory",
                        "$850,000",
                        "$250,000"
                    ],
                    [
                        "Work-in-process inventory",
                        "$420,000",
                        "$60,000"
                    ],
                    [
                        "Finished goods inventory",
                        "$310,000",
                        "$100,000"
                    ],
                    [
                        "Annual inventory carrying cost rate",
                        "20%",
                        "20%"
                    ],
                    [
                        "Average setup time per batch",
                        "8 hours",
                        "1 hour"
                    ],
                    [
                        "Defect rate (as percentage of output)",
                        "5%",
                        "1%"
                    ],
                    [
                        "Annual output (units)",
                        "100,000",
                        "100,000"
                    ],
                    [
                        "Average cost per defective unit",
                        "$50",
                        "$50"
                    ]
                ],
                "ExhibitID": "CBQ4-D2-E1",
                "CaseID": "CBQ4-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 — JIT/Lean Principles Reference",
                "Headers": [
                    "Concept",
                    "Description"
                ],
                "Rows": [
                    [
                        "Pull system",
                        "Production is triggered by downstream customer demand"
                    ],
                    [
                        "Cellular manufacturing",
                        "Machines arranged in sequence to reduce movement and WIP"
                    ],
                    [
                        "Kanban",
                        "Visual signal that authorizes production or material movement"
                    ],
                    [
                        "Kaizen",
                        "Continuous incremental improvement involving all employees"
                    ],
                    [
                        "SMED",
                        "Single-Minute Exchange of Die — reducing setup times"
                    ],
                    [
                        "Takt time",
                        "Production pace matching customer demand rate"
                    ]
                ],
                "ExhibitID": "CBQ4-D2-E2",
                "CaseID": "CBQ4-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the annual inventory carrying cost savings from transitioning to JIT. Round to the nearest whole dollar.",
                "Correct": "234000",
                "Explanation": "Current total inventory = $850,000 + $420,000 + $310,000 = $1,580,000. JIT total inventory = $250,000 + $60,000 + $100,000 = $410,000. Reduction = $1,170,000. Savings = $1,170,000 × 20% = $234,000. JIT reduces inventory levels across all three categories by producing only what is needed when it is needed.",
                "Topic": "Inventory carrying cost — JIT",
                "ItemID": "CBQ4-D2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-D2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Calculate the total annual savings including both inventory carrying cost reduction and defect cost reduction from transitioning to JIT. Round to the nearest whole dollar.",
                "Correct": "434000",
                "Explanation": "Inventory savings = $234,000 (from Q1). Defect reduction = 100,000 × (5% − 1%) × $50 = 4,000 × $50 = $200,000. Total = $234,000 + $200,000 = $434,000. JIT reduces defects through immediate detection and feedback in cellular layouts.",
                "Topic": "JIT cost savings",
                "ItemID": "CBQ4-D2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-D2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Which JIT practice is most directly responsible for reducing the setup time from 8 hours to 1 hour?",
                "Choices": [
                    "SMED (Single-Minute Exchange of Die)",
                    "Kanban pull signals",
                    "Takt time balancing",
                    "Heijunka (production leveling)"
                ],
                "Correct": "SMED (Single-Minute Exchange of Die)",
                "Explanation": "SMED techniques reduce setup times by converting internal setups (performed while machine is stopped) to external setups (performed while machine is running). Shorter setups enable smaller batch sizes, which reduce WIP and improve flexibility.",
                "Topic": "Setup reduction — SMED",
                "ItemID": "CBQ4-D2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-D2",
                "EstimatedMinutes": 4,
                "Pack": 4,
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
                "Prompt": "Select the characteristics that correctly apply to a JIT/lean manufacturing system.",
                "Choices": [
                    "Pull-based production triggered by customer demand",
                    "Large batch sizes to achieve economies of scale",
                    "Reduced work-in-process inventory between operations",
                    "Cross-trained employees who work in cellular layouts"
                ],
                "Correct": [
                    "Pull-based production triggered by customer demand",
                    "Reduced work-in-process inventory between operations",
                    "Cross-trained employees who work in cellular layouts"
                ],
                "Explanation": "JIT uses pull (demand-driven) production to minimize WIP. Large batch sizes are antithetical to JIT — they increase inventory and hide quality problems. Cellular layouts with cross-trained employees reduce movement and wait times.",
                "Topic": "JIT system characteristics",
                "ItemID": "CBQ4-D2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ4-D2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "fill",
                "Prompt": "In a JIT system, production is authorized by a visual signal called a ______ card.",
                "Correct": "kanban",
                "Explanation": "A kanban is a signal — often a physical card — that triggers production or material movement from an upstream operation. Kanban systems implement the pull principle in JIT manufacturing.",
                "Topic": "Kanban",
                "ItemID": "CBQ4-D2-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-D2",
                "EstimatedMinutes": 3,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "Match each lean concept to its correct description.",
                "LeftItems": [
                    "Cellular manufacturing",
                    "Kanban",
                    "Kaizen",
                    "Takt time"
                ],
                "RightItems": [
                    "Arranges machines in sequence to reduce movement and WIP",
                    "Visual signal that authorizes production",
                    "Continuous incremental improvement involving all employees",
                    "Production pace that matches customer demand rate"
                ],
                "Correct": {
                    "Cellular manufacturing": "Arranges machines in sequence to reduce movement and WIP",
                    "Kanban": "Visual signal that authorizes production",
                    "Kaizen": "Continuous incremental improvement involving all employees",
                    "Takt time": "Production pace that matches customer demand rate"
                },
                "Explanation": "Cellular manufacturing reduces transport and WIP. Kanban is the signaling mechanism. Kaizen is the philosophy of ongoing improvement. Takt time synchronizes production rate with customer demand.",
                "Topic": "Lean terminology",
                "ItemID": "CBQ4-D2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "COSO ERM integrates strategy, objectives, and performance across the enterprise.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D2",
                "DecisionTreeReference": "COSO ERM",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
        "CaseID": "CBQ4-D3",
        "Title": "Capacity Management Concepts",
        "SectionTags": [
            "D"
        ],
        "Pack": 4,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Capacity Management Concepts"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Capacity Management Concepts",
        "Subtopic": "Bottleneck analysis",
        "SecondaryCompetencies": [
            "Calculation"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Summit Furniture",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 35,
        "ExhibitCount": 2,
        "Industry": "Furniture manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Define and distinguish capacity measures: theoretical, practical, normal, and master-budget",
            "Compute fixed-overhead volume variance under different capacity denominator levels",
            "Analyze the financial statement impact of capacity choice on product cost and inventory valuation",
            "Identify bottleneck operations and apply theory of constraints concepts",
            "Evaluate capacity management strategies for financial performance optimization"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            },
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content reconstruction with business narrative, exhibits, and questions"
            }
        ],
        "Stakeholder": "Chief Information Officer",
        "Tags": [
            "capacity management",
            "theory of constraints",
            "fixed overhead variance",
            "bottleneck"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Summit Furniture manufactures high-end wooden chairs. The company operates a single production facility with three departments: Cutting, Assembly, and Finishing. The new CFO is reviewing the company's capacity management practices and has identified significant differences between theoretical capacity and actual utilization. The company currently uses practical capacity as the denominator level for fixed overhead allocation but is considering a change to master-budget capacity.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: Summit Furniture — Annual Capacity and Operating Data",
                "Headers": [
                    "Capacity Measure",
                    "Cutting Dept",
                    "Assembly Dept",
                    "Finishing Dept",
                    "Comments"
                ],
                "Rows": [
                    [
                        "Theoretical capacity (units)",
                        "50,000",
                        "50,000",
                        "50,000",
                        "Assumes 24/7 operation, no downtime, no delays"
                    ],
                    [
                        "Practical capacity (units)",
                        "38,000",
                        "42,000",
                        "40,000",
                        "Theoretical minus unavoidable downtime (maintenance, breaks, setup)"
                    ],
                    [
                        "Normal capacity (units)",
                        "32,000",
                        "32,000",
                        "32,000",
                        "Average customer demand over 5-year business cycle"
                    ],
                    [
                        "Master-budget capacity (units)",
                        "30,000",
                        "30,000",
                        "30,000",
                        "Expected production for the current year"
                    ],
                    [
                        "Actual production (units)",
                        "28,000",
                        "28,000",
                        "28,000",
                        "Actual output for the current year"
                    ],
                    [
                        "Total budgeted fixed MOH",
                        "$1,900,000",
                        "$1,260,000",
                        "$1,200,000",
                        "Annual fixed manufacturing overhead by department"
                    ]
                ],
                "ExhibitID": "CBQ4-D3-E1",
                "CaseID": "CBQ4-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-D3-Q1",
                    "CBQ4-D3-Q2",
                    "CBQ4-D3-Q4"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Fixed Overhead Variance Impact by Denominator Level Choice",
                "Headers": [
                    "Denominator Level",
                    "Fixed MOH Rate",
                    "Applied FOH (28,000 units)",
                    "Budget Variance",
                    "Volume Variance",
                    "Total Underapplied FOH"
                ],
                "Rows": [
                    [
                        "Theoretical (50,000)",
                        "$38.00/unit",
                        "$1,064,000",
                        "—",
                        "$836,000 U",
                        "$836,000 U"
                    ],
                    [
                        "Practical (38,000)",
                        "$50.00/unit",
                        "$1,400,000",
                        "—",
                        "$500,000 U",
                        "$500,000 U"
                    ],
                    [
                        "Normal (32,000)",
                        "$59.38/unit",
                        "$1,662,500",
                        "—",
                        "$237,500 U",
                        "$237,500 U"
                    ],
                    [
                        "Master-budget (30,000)",
                        "$63.33/unit",
                        "$1,773,333",
                        "—",
                        "$126,667 U",
                        "$126,667 U"
                    ]
                ],
                "ExhibitID": "CBQ4-D3-E2",
                "CaseID": "CBQ4-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-D3-Q2",
                    "CBQ4-D3-Q3"
                ]
            }
        ],
        "Items": [{
                "Type": "select",
                "Prompt": "Using Exhibit 2, what would be the difference in the fixed overhead volume variance if Summit Furniture changed its denominator level from practical capacity (38,000 units) to master-budget capacity (30,000 units)?",
                "Correct": "The volume variance would decrease from $500,000 unfavorable to $126,667 unfavorable — a $373,333 reduction — because a lower denominator level reduces the fixed overhead rate per unit and decreases the unfavorable volume variance",
                "Choices": [
                    "The volume variance would decrease from $500,000 unfavorable to $126,667 unfavorable — a $373,333 reduction — because a lower denominator level reduces the fixed overhead rate per unit and decreases the unfavorable volume variance",
                    "The volume variance would increase from $500,000 unfavorable to $836,000 unfavorable — using a lower denominator level increases the fixed rate and makes the volume variance more unfavorable",
                    "The volume variance would remain unchanged at $500,000 — the denominator level only affects the overhead rate, not the total volume variance amount",
                    "The volume variance would reverse from unfavorable to favorable — switching to a lower denominator level always produces a favorable volume variance"
                ],
                "Explanation": "The volume variance = (Denominator level − Actual production) × Fixed MOH rate. At practical capacity: (38,000 − 28,000) × $50 = $500,000 U. At master-budget: (30,000 − 28,000) × $63.33 = $126,667 U. Using a lower denominator level reduces the gap between denominator and actual production, producing a smaller unfavorable variance. However, the fixed MOH rate increases with the lower denominator, which increases product cost.",
                "Topic": "Fixed overhead volume variance under different denominator levels",
                "ItemID": "CBQ4-D3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Fixed overhead volume variance measures capacity utilization — it is favorable when actual production exceeds the denominator level and unfavorable when actual falls short. The choice of denominator level directly impacts the magnitude and interpretation of this variance.",
                "BusinessInterpretation": "Managers often prefer using master-budget capacity because it produces smaller volume variances, making their performance reports look better. However, this masks the real cost of unused capacity. Practical capacity is preferred for performance evaluation because it reveals true capacity utilization.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-D3",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "The CFO is evaluating the implications of the capacity denominator level choice. Which of the following statements correctly describe the impact of different capacity measures? (Select all that apply.)",
                "Choices": [
                    "Using theoretical capacity as the denominator level produces the highest fixed overhead rate per unit and the largest unfavorable volume variance when actual production is below theoretical",
                    "Master-budget capacity results in the lowest product cost per unit because the denominator is the smallest, giving the highest overhead rate",
                    "The volume variance is always zero when master-budget capacity equals actual production",
                    "Switching from practical to master-budget capacity would decrease Summit's inventory valuation per unit because the overhead rate is lower",
                    "GAAP requires companies to use practical capacity for external financial reporting and does not allow any other denominator level"
                ],
                "Correct": [
                    "Using theoretical capacity as the denominator level produces the highest fixed overhead rate per unit and the largest unfavorable volume variance when actual production is below theoretical",
                    "The volume variance is always zero when master-budget capacity equals actual production"
                ],
                "Explanation": "Theoretical capacity produces the lowest rate ($38) and largest unfavorable variance because of the large gap between denominator and actual. Master-budget capacity produces the highest rate ($63.33) and smallest variance. The volume variance is indeed zero when denominator equals actual. Statement 2 is wrong — master-budget gives the HIGHEST product cost per unit (not lowest). Statement 4 is wrong — switching from practical to master-budget INCREASES inventory valuation (higher rate × same units). Statement 5 is wrong — GAAP allows various denominator levels, though the chosen method must be consistently applied and disclosed.",
                "Topic": "Capacity measure implications on financial reporting",
                "ItemID": "CBQ4-D3-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Under GAAP (ASC 330-10-30-8), the allocation of fixed overhead to inventory should be based on the normal capacity of the production facilities. Abnormal amounts of idle facility costs should be recognized as a period cost rather than inventoried.",
                "BusinessInterpretation": "The denominator level choice is a significant accounting policy decision with real financial statement effects. Companies near debt covenants or bonus thresholds may be tempted to use lower denominator levels to reduce unfavorable volume variances and increase reported earnings.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D3",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Prompt": "Summit Furniture's Cutting Department can theoretically produce 50,000 units per year. After accounting for scheduled maintenance (2,000 hours), employee breaks and shift changes (1,500 hours), and machine setup time (3,500 hours), the practical capacity is 38,000 units. Which capacity measure should Summit use for fixed overhead allocation to BEST approximate the cost of unused capacity?",
                "Correct": "Practical capacity — it represents the maximum sustainable production under realistic operating conditions; using practical capacity highlights the cost of unused capacity (the difference between practical and actual) and avoids distorting product costs with the cost of idle facilities",
                "Choices": [
                    "Practical capacity — it represents the maximum sustainable production under realistic operating conditions; using practical capacity highlights the cost of unused capacity (the difference between practical and actual) and avoids distorting product costs with the cost of idle facilities",
                    "Theoretical capacity — it is the most conservative measure and ensures that all fixed costs are allocated to products, maximizing inventory valuation",
                    "Normal capacity — it smooths out business cycle fluctuations over multiple years and is preferred by GAAP for external financial reporting",
                    "Master-budget capacity — it aligns allocated overhead with the annual budget and minimizes unfavorable volume variances"
                ],
                "Explanation": "Practical capacity is considered the conceptually best denominator level for fixed overhead allocation because it reflects real-world production capability. Unused capacity costs (practical minus actual) are treated as a period cost rather than being buried in inventory values. Theoretical capacity is unattainable and leads to large unfavorable volume variances. Normal capacity is useful for long-term planning but can mask annual fluctuations. Master-budget capacity minimizes volume variances but may understate product costs if budgeted volume is significantly below practical capacity.",
                "Topic": "Capacity denominator level selection for fixed overhead allocation",
                "ItemID": "CBQ4-D3-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "CMA and IAS 2 recommend using practical capacity for fixed overhead allocation because it results in product costs that reflect actual production capability. The cost of unused capacity is expensed as a period cost rather than being inventoried, providing more relevant information for decision-making.",
                "BusinessInterpretation": "The denominator level choice directly affects inventory valuation, cost of goods sold, and reported earnings. Companies with declining utilization may report lower profits if they continue using practical capacity, as unused capacity costs flow through to the income statement rather than being deferred in inventory.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D3",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "The CFO must recommend a capacity management strategy for each department. Match each department's situation to the most appropriate capacity strategy using Exhibit 1.",
                "LeftItems": [
                    "Cutting Department — practical capacity is 38,000 but actual is only 28,000; 10,000 units of capacity are idle",
                    "Assembly Department — practical capacity is 42,000; this is the highest capacity in the plant; other departments limit total output to 28,000",
                    "Finishing Department — practical capacity is 40,000; new equipment would increase capacity to 55,000 but cost $2.5M",
                    "All departments — Summit's management wants to understand the true cost of carrying unused capacity over the business cycle"
                ],
                "RightItems": [
                    "Reduce unused capacity — investigate why 26% of practical capacity is idle; consider using excess capacity for new products or outsourcing selected operations to fill the gap",
                    "Identify as the bottleneck — this department currently does not limit output, but management should monitor it to ensure Assembly remains the constraint",
                    "Defer capital investment — current capacity exceeds demand; investing in additional capacity would increase fixed costs without increasing throughput",
                    "Use normal capacity for strategic planning — 32,000 units reflects average long-term demand; compare actual to normal to assess capacity utilization over the business cycle",
                    "Outsource all production — contract manufacturing eliminates capacity management concerns"
                ],
                "Correct": {
                    "Cutting Department — practical capacity is 38,000 but actual is only 28,000; 10,000 units of capacity are idle": "Reduce unused capacity — investigate why 26% of practical capacity is idle; consider using excess capacity for new products or outsourcing selected operations to fill the gap",
                    "Assembly Department — practical capacity is 42,000; this is the highest capacity in the plant; other departments limit total output to 28,000": "Identify as the bottleneck — this department currently does not limit output, but management should monitor it to ensure Assembly remains the constraint",
                    "Finishing Department — practical capacity is 40,000; new equipment would increase capacity to 55,000 but cost $2.5M": "Defer capital investment — current capacity exceeds demand; investing in additional capacity would increase fixed costs without increasing throughput",
                    "All departments — Summit's management wants to understand the true cost of carrying unused capacity over the business cycle": "Use normal capacity for strategic planning — 32,000 units reflects average long-term demand; compare actual to normal to assess capacity utilization over the business cycle"
                },
                "Explanation": "Each department requires a different capacity strategy. Cutting has significant idle capacity that should be addressed. Assembly has the highest capacity but is not the actual constraint — management should monitor but not over-invest. Finishing should defer capital investment since current capacity already exceeds demand. Normal capacity provides the best strategic view of long-term capacity utilization. Outsourcing all production is unnecessarily drastic — selected outsourcing to fill Cutting's idle capacity would be more appropriate.",
                "Topic": "Capacity management strategies — theory of constraints",
                "ItemID": "CBQ4-D3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The Theory of Constraints (TOC) holds that throughput is limited by the system's constraint (bottleneck). Management should identify, exploit, and elevate the constraint. Investments that increase capacity at non-constraint operations do not increase overall throughput.",
                "BusinessInterpretation": "Many manufacturers invest in capacity at the wrong places — adding capacity at non-bottleneck operations increases costs without increasing output. The key insight of TOC is that throughput is determined by the bottleneck, and idle capacity at non-bottleneck operations is not necessarily a problem.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D3",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Prompt": "Summit's CFO must recommend a denominator level to the board. The board is concerned about minimizing unfavorable volume variances to avoid explaining large write-offs to investors. Which recommendation BEST balances board concerns with sound accounting practice?",
                "Correct": "Use practical capacity and clearly disclose the cost of unused capacity as a separate line item in the management discussion — this provides transparency about capacity utilization and avoids distorting product costs while still informing investors about operational efficiency",
                "Choices": [
                    "Use practical capacity and clearly disclose the cost of unused capacity as a separate line item in the management discussion — this provides transparency about capacity utilization and avoids distorting product costs while still informing investors about operational efficiency",
                    "Use master-budget capacity to minimize the volume variance — the board's concern about investor perception is valid and should be the primary consideration in accounting policy",
                    "Use theoretical capacity — it produces the lowest product cost per unit, making Summit's products appear more competitive in the market",
                    "Eliminate fixed overhead allocation entirely — all fixed costs should be expensed as period costs to avoid any volume variances"
                ],
                "Explanation": "Practical capacity is the conceptually sound approach. The cost of unused capacity should be explicitly reported rather than hidden by choosing a lower denominator level. While master-budget capacity would minimize the volume variance, it would understate the true cost of capacity and overstate inventory values. Theoretical capacity is unrealistic. Eliminating fixed overhead allocation would violate GAAP absorption costing requirements for external reporting. Transparent disclosure allows investors to understand capacity utilization and management's strategy for addressing it.",
                "Topic": "Capacity policy — balancing accounting accuracy with stakeholder communication",
                "ItemID": "CBQ4-D3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The conceptual framework's representational faithfulness and neutrality suggest that accounting policies should reflect economic reality rather than be selected to achieve a particular financial reporting outcome. Practical capacity provides the most faithful representation of production capability.",
                "BusinessInterpretation": "The tension between accurate accounting and favorable reporting is a recurring theme in practice. While some companies choose denominator levels to minimize unfavorable variances, this masks important information about capacity utilization. The best approach combines sound accounting with transparent communication.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-D3",
                "EstimatedMinutes": 7,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "D",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Difficult",
                "DifficultyScore": 4
            }],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ4-E1",
        "Title": "COSO Internal Control Framework",
        "SectionTags": [
            "E"
        ],
        "Pack": 4,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "COSO Internal Control Framework"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "COSO Internal Control Framework",
        "Subtopic": "COSO internal control components",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "Summit Electronics",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 20,
        "ExhibitCount": 1,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze coso internal control framework",
            "Analyze coso internal control framework",
            "Analyze coso internal control framework",
            "Analyze coso internal control framework",
            "Analyze coso internal control framework"
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
                "Summary": "Full content authoring — COSO Internal Control — Integrated Framework components, principles, and limitations"
            }
        ],
        "Stakeholder": "Chief Audit Executive",
        "Tags": [
            "COSO",
            "internal control",
            "control environment",
            "risk assessment",
            "control activities",
            "monitoring",
            "SOX"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Summit Electronics manufactures printed circuit boards for the automotive industry with 1,200 employees and annual revenue of $275 million. The company is publicly traded and must comply with SOX Section 404 requirements. The internal audit team is evaluating the design and effectiveness of internal controls over financial reporting (ICFR) using the COSO Internal Control — Integrated Framework (2013). The CFO has asked the audit team to assess each COSO component and identify control deficiencies. The audit team has documented the current control environment and identified several areas requiring improvement.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Summit Electronics Control Environment Assessment",
                "Headers": [
                    "COSO Component",
                    "Current Assessment",
                    "Deficiency Identified"
                ],
                "Rows": [
                    [
                        "Control Environment",
                        "The board has an audit committee; code of conduct exists",
                        "Tone at the middle is inconsistent; plant managers tolerate minor inventory discrepancies"
                    ],
                    [
                        "Risk Assessment",
                        "Annual enterprise risk assessment conducted",
                        "Risk assessment does not specifically address financial reporting risks for new contracts"
                    ],
                    [
                        "Control Activities",
                        "Segregation of duties in AP and payroll; automated three-way match",
                        "No controls over manual journal entries; no independent review of standing data changes"
                    ],
                    [
                        "Information and Communication",
                        "Monthly financial reports distributed to department heads",
                        "No formal whistleblower hotline; communication of policies is ad hoc"
                    ],
                    [
                        "Monitoring Activities",
                        "Quarterly internal audit reviews; annual external audit",
                        "No ongoing monitoring of controls; audits are point-in-time only"
                    ]
                ],
                "ExhibitID": "CBQ4-E1-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "Summit Electronics' internal audit team has identified inconsistent tone at the middle, where plant managers tolerate minor inventory discrepancies. Which COSO component is primarily affected by this deficiency?",
                "Correct": "Control Environment — management's philosophy and operating style set the tone for control consciousness",
                "Choices": [
                    "Control Environment — management's philosophy and operating style set the tone for control consciousness",
                    "Risk Assessment — the risk of inventory misstatement should be formally assessed",
                    "Control Activities — physical inventory controls should prevent discrepancies",
                    "Information and Communication — inventory discrepancy data should be communicated to management",
                    "Monitoring Activities — periodic inventory audits would detect discrepancies"
                ],
                "Explanation": "The control environment is the foundation of the COSO framework. Inconsistent tone at the middle, where managers tolerate deviations from policies, represents a control environment deficiency even if individual control activities exist. While risk assessment, control activities, and monitoring are all relevant, the root cause is management's attitude and operating style — a control environment issue.",
                "Topic": "COSO — Control Environment component",
                "ItemID": "CBQ4-E1-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "The control environment sets the tone of an organization and influences the control consciousness of its people. It is the foundation for all other components of internal control.",
                "BusinessInterpretation": "Tone at the top is critical, but tone at the middle is equally important. Plant managers who tolerate small discrepancies create a culture where larger problems can develop. This is often the root cause of material weaknesses.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "The internal audit team noted that Summit Electronics' risk assessment does not specifically address financial reporting risks for new contracts. Which COSO principle is most directly violated by this gap?",
                "Correct": "The organization identifies and assesses changes that could significantly impact the system of internal control",
                "Choices": [
                    "The organization identifies and assesses changes that could significantly impact the system of internal control",
                    "The organization demonstrates a commitment to integrity and ethical values",
                    "The organization selects and develops control activities that mitigate risks to acceptable levels",
                    "The organization communicates internal control information to external parties",
                    "The organization evaluates and communicates internal control deficiencies in a timely manner"
                ],
                "Explanation": "COSO principle 9 states that the organization identifies and assesses changes that could significantly impact the system of internal control. New contracts represent a significant change that could introduce new financial reporting risks. Failure to assess these risks violates this principle. Commitment to integrity (principle 1) is a control environment principle. Control activities (principle 10-12) are responses to risk assessment, not the assessment itself.",
                "Topic": "COSO — Risk Assessment component and change assessment",
                "ItemID": "CBQ4-E1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO principle 9 requires organizations to identify and assess changes that could significantly impact internal control. This includes changes in the external environment, business model, and leadership.",
                "BusinessInterpretation": "When companies enter new types of contracts or new markets without assessing the financial reporting risks, they expose themselves to material misstatements. The risk assessment should be dynamic and updated for significant changes.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Summit Electronics has strong automated controls over accounts payable (three-way match) but no controls over manual journal entries. According to the COSO framework, which statement BEST describes the implication of this gap?",
                "Correct": "Control activities should be designed at various levels, including both automated and manual controls, to address all relevant risks",
                "Choices": [
                    "Control activities should be designed at various levels, including both automated and manual controls, to address all relevant risks",
                    "If automated controls are effective, manual controls are not required because preventive controls are superior to detective controls",
                    "Manual journal entries are not a significant risk because they are reviewed by the external auditor",
                    "The absence of controls over manual journal entries is not a deficiency because the three-way match controls are adequate",
                    "Manual journal entry controls are part of the monitoring component, not control activities"
                ],
                "Explanation": "The COSO framework requires that control activities be deployed at all levels and across all functions. Strong controls in one area do not compensate for missing controls in another area with significant risk. Manual journal entries are a known area of fraud risk and require specific controls such as approval, supporting documentation, and independent review. The external auditor's review is a monitoring activity, not a substitute for control activities.",
                "Topic": "COSO — Control Activities component design",
                "ItemID": "CBQ4-E1-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "COSO principle 10 requires that control activities be designed and implemented to achieve objectives and respond to risks. Control activities include approvals, authorizations, verifications, reconciliations, and segregation of duties.",
                "BusinessInterpretation": "Manual journal entries are a common area of fraud and material weakness. SOX auditors specifically test controls over manual journal entries as a standard procedure. This is a well-known high-risk area.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Summit Electronics lacks a formal whistleblower hotline and communicates policies only on an ad hoc basis. Which COSO principle is MOST directly affected by these gaps?",
                "Correct": "The organization communicates internal control information to personnel, including their roles and responsibilities in the internal control system",
                "Choices": [
                    "The organization communicates internal control information to personnel, including their roles and responsibilities in the internal control system",
                    "The organization demonstrates a commitment to attract, develop, and retain competent individuals",
                    "The organization deploys control activities through policies that establish what is expected",
                    "The organization selects and develops general controls over technology",
                    "The organization conducts ongoing and separate evaluations of internal control"
                ],
                "Explanation": "The Information and Communication component requires that the organization communicate internal control responsibilities to personnel, including how they can report concerns (whistleblower mechanism). Ad hoc communication and no whistleblower hotline violate this principle. Commitment to competent individuals (principle 4) is a control environment principle. Control activities through policies (principle 11) is related but focuses on deploying policies, not communicating them.",
                "Topic": "COSO — Information and Communication component",
                "ItemID": "CBQ4-E1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO principle 15 requires that the organization communicates internal control information externally and internally. Principle 14 requires that the organization obtains relevant information to support the functioning of internal control.",
                "BusinessInterpretation": "A whistleblower hotline is a key communication channel for reporting potential fraud and control violations. Its absence increases the risk that control deficiencies and fraud will go undetected and unreported.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Prompt": "Summit Electronics relies on quarterly internal audit reviews and annual external audits for monitoring, with no ongoing monitoring of controls. According to the COSO framework, which statement is MOST accurate?",
                "Correct": "Monitoring activities should include both ongoing evaluations (built into operations) and separate evaluations (periodic audits) to provide timely feedback on control effectiveness",
                "Choices": [
                    "Monitoring activities should include both ongoing evaluations (built into operations) and separate evaluations (periodic audits) to provide timely feedback on control effectiveness",
                    "Quarterly internal audits and annual external audits are sufficient for SOX compliance; ongoing monitoring is optional",
                    "Ongoing monitoring is part of the control activities component, not monitoring activities",
                    "Monitoring activities are only required for public companies; private companies may rely solely on separate evaluations",
                    "Separate evaluations (audits) are superior to ongoing monitoring because they are performed by independent parties"
                ],
                "Explanation": "The COSO framework specifies that monitoring should include both ongoing evaluations performed as part of normal operations (e.g., supervisory reviews, reconciliations, exception reports) and separate evaluations (internal/external audits). Relying solely on periodic audits means control deficiencies may go undetected for months. SOX does not prescribe the mix, but the SEC and PCAOB expect appropriate ongoing monitoring. Ongoing monitoring is part of the Monitoring component, not Control Activities.",
                "Topic": "COSO — Monitoring Activities component",
                "ItemID": "CBQ4-E1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "COSO principle 16 requires that the organization selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.",
                "BusinessInterpretation": "Point-in-time audits (separate evaluations) can become stale quickly. Ongoing monitoring built into operational processes provides real-time feedback and enables faster remediation of control deficiencies. Best practice is a combination of both approaches.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E1",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
        "CaseID": "CBQ4-E2",
        "Title": "Application IT Controls",
        "SectionTags": [
            "E"
        ],
        "Pack": 4,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Application IT Controls"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Application IT Controls",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "MedTech Devices",
        "CompanyType": "Medical device manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Medical devices",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Distinguish between input, processing, and output controls in IT application systems",
            "Evaluate the design and effectiveness of application controls for financial systems",
            "Analyze the role of edit checks in preventing data entry errors",
            "Match control types to specific risks in transaction processing",
            "Assess segregation of duties considerations within automated systems"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            },
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content reconstruction with business narrative, exhibits, and questions"
            }
        ],
        "Stakeholder": "Director of Internal Audit",
        "Tags": [
            "application controls",
            "edit checks",
            "input validation",
            "IT general controls"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "MedTech Devices manufactures surgical instruments and orthopedic implants. The company recently implemented a new enterprise resource planning (ERP) system to replace its legacy order-to-cash and procure-to-pay applications. The internal audit department is conducting a post-implementation review of the application controls in the new ERP system. The review focuses on input controls, processing controls, and output controls for the accounts payable, inventory, and order entry modules.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: ERP Application Control Summary — Key Input Controls",
                "Headers": [
                    "Control Name",
                    "Module",
                    "What It Does",
                    "Prevents"
                ],
                "Rows": [
                    [
                        "Purchase order limit check",
                        "Procure-to-Pay",
                        "Rejects PO lines where unit price exceeds authorized limit by more than 20%",
                        "Unauthorized price increases or data entry errors in PO pricing"
                    ],
                    [
                        "Vendor master validity check",
                        "Procure-to-Pay",
                        "Verifies vendor ID against approved vendor master table before processing invoice",
                        "Payments to unapproved or fictitious vendors"
                    ],
                    [
                        "Three-way match",
                        "Procure-to-Pay",
                        "Matches PO, receiving report, and invoice; flags discrepancies > $100",
                        "Payment for goods not ordered or not received"
                    ],
                    [
                        "Order quantity reasonableness check",
                        "Order-to-Cash",
                        "Warns if order quantity exceeds 200% of customer's average order",
                        "Unusually large orders that may be data entry errors or fraud"
                    ],
                    [
                        "Customer credit limit check",
                        "Order-to-Cash",
                        "Blocks order if customer would exceed credit limit after this order",
                        "Sales to customers beyond approved credit terms"
                    ],
                    [
                        "Completeness check on required fields",
                        "All modules",
                        "Prevents save/submit when mandatory fields are blank",
                        "Incomplete records that would break downstream processes"
                    ],
                    [
                        "Check digit on customer account number",
                        "Order-to-Cash",
                        "Validates account number format using modulus-10 algorithm",
                        "Transposition errors that would route order to wrong customer"
                    ]
                ],
                "ExhibitID": "CBQ4-E2-E1",
                "CaseID": "CBQ4-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-E2-Q1",
                    "CBQ4-E2-Q2",
                    "CBQ4-E2-Q4"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: IT Application Control Types — COSO Framework Mapping",
                "Headers": [
                    "Control Category",
                    "Definition",
                    "Examples",
                    "COSO Component"
                ],
                "Rows": [
                    [
                        "Input controls",
                        "Prevent or detect errors when data enters the system",
                        "Edit checks, validation rules, authorization requirements",
                        "Control Activities"
                    ],
                    [
                        "Processing controls",
                        "Ensure data is processed accurately and completely",
                        "Run-to-run totals, reasonableness checks, sequence checks",
                        "Control Activities"
                    ],
                    [
                        "Output controls",
                        "Verify processed output is accurate and distributed appropriately",
                        "Report review, reconciliation, distribution controls",
                        "Monitoring / Info & Communication"
                    ],
                    [
                        "Access controls",
                        "Limit system access to authorized users",
                        "User IDs, passwords, role-based permissions, segregation of duties",
                        "Control Activities / Risk Assessment"
                    ]
                ],
                "ExhibitID": "CBQ4-E2-E2",
                "CaseID": "CBQ4-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-E2-Q3",
                    "CBQ4-E2-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The internal audit team identified several scenarios where application controls should prevent or detect errors. Match each scenario to the appropriate application control from Exhibit 1.",
                "LeftItems": [
                    "An accounts payable clerk accidentally enters $25,000 instead of $2,500 for the unit price of a surgical instrument on a purchase order",
                    "A data entry operator creates an invoice referencing a vendor ID that does not exist in the approved vendor master table",
                    "An order entry clerk enters a customer account number as 48219 instead of 48129 — a transposition of two digits",
                    "An order processor attempts to enter a sales order for a customer whose outstanding balance already exceeds the approved credit limit"
                ],
                "RightItems": [
                    "Purchase order limit check — the entered unit price ($25,000) exceeds the 20% threshold above the expected price, triggering a rejection",
                    "Vendor master validity check — the system verifies the vendor ID against the approved master table and rejects the invoice when no match is found",
                    "Check digit validation — the modulus-10 algorithm detects the transposition error and rejects the account number as invalid",
                    "Customer credit limit check — the system blocks the order and notifies the order processor that the credit limit would be exceeded",
                    "Completeness check — ensures all required fields like customer name, address, and order date are filled"
                ],
                "Correct": {
                    "An accounts payable clerk accidentally enters $25,000 instead of $2,500 for the unit price of a surgical instrument on a purchase order": "Purchase order limit check — the entered unit price ($25,000) exceeds the 20% threshold above the expected price, triggering a rejection",
                    "A data entry operator creates an invoice referencing a vendor ID that does not exist in the approved vendor master table": "Vendor master validity check — the system verifies the vendor ID against the approved master table and rejects the invoice when no match is found",
                    "An order entry clerk enters a customer account number as 48219 instead of 48129 — a transposition of two digits": "Check digit validation — the modulus-10 algorithm detects the transposition error and rejects the account number as invalid",
                    "An order processor attempts to enter a sales order for a customer whose outstanding balance already exceeds the approved credit limit": "Customer credit limit check — the system blocks the order and notifies the order processor that the credit limit would be exceeded"
                },
                "Explanation": "Each input control addresses a specific data entry risk. Limit checks prevent extreme value errors. Validity checks prevent use of unauthorized master data. Check digits detect transposition errors. Credit limit checks prevent orders that exceed customer creditworthiness. Without these controls, MedTech could make payments to the wrong vendor at inflated prices or extend credit to customers who cannot pay.",
                "Topic": "Input control matching to data entry scenarios",
                "ItemID": "CBQ4-E2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "COSO's Control Activities component requires that control activities be designed and implemented to mitigate risks to the achievement of objectives. Application controls are a subset of control activities that operate within IT applications to ensure complete and accurate processing.",
                "BusinessInterpretation": "A well-designed application control framework prevents errors before they enter the financial system. Each control should be risk-based — high-risk transactions (e.g., large POs, new vendors) should have stronger controls than routine, low-value transactions.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "The internal audit team discovers that the three-way match control (matching PO, receiving report, and invoice) can be overridden by senior procurement managers. In the past 6 months, the override has been used 47 times for one particular vendor. Which control risk does this situation represent?",
                "Correct": "Control override by management — the three-way match is a key detective/preventive control; frequent overrides indicate that the control is not operating effectively and may allow erroneous or fraudulent payments to bypass control",
                "Choices": [
                    "Control override by management — the three-way match is a key detective/preventive control; frequent overrides indicate that the control is not operating effectively and may allow erroneous or fraudulent payments to bypass control",
                    "Segregation of duties failure — the procurement manager should not have system access that allows override of the three-way match control",
                    "Inadequate control design — the three-way match threshold of $100 is too low and should be increased to reduce false positives",
                    "Excessive monitoring — internal audit should focus on material risks rather than questioning legitimate management actions"
                ],
                "Explanation": "Management override of controls is one of the most significant internal control weaknesses identified in COSO and by the SEC. Even well-designed controls are ineffective if they can be routinely bypassed. Frequent overrides (47 times in 6 months for one vendor) indicate a control breakdown that could result in unauthorized payments. While segregation of duties is also a concern, the fundamental issue is that the control is being systematically overridden. The threshold ($100) seems reasonable — increasing it would weaken rather than strengthen controls.",
                "Topic": "Management override of controls and control effectiveness",
                "ItemID": "CBQ4-E2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO principle 10 states that the organization selects and develops control activities that mitigate risks to acceptable levels. Management override of controls is a red flag for fraud risk and is specifically addressed in AU-C 240 and PCAOB standards on fraud detection.",
                "BusinessInterpretation": "Control override should be treated as an exception that requires documentation, approval, and monitoring. When a single vendor requires 47 overrides in 6 months, it suggests either the control is poorly designed (false positives) or there is an inappropriate relationship with the vendor that warrants investigation.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "The ERP system includes processing controls in addition to input controls. According to Exhibit 2, which of the following are examples of processing controls that MedTech should have in place? (Select all that apply.)",
                "Choices": [
                    "A run-to-run control that compares the total dollar value of invoices entered in a batch to the total posted to the general ledger",
                    "A sequence check that verifies purchase order numbers are sequential and reports any gaps that may indicate deleted or missing transactions",
                    "A report that lists all payments made during the prior week, reviewed and signed by the accounts payable manager",
                    "A reasonableness check that compares weekly inventory write-offs to historical averages and flags significant deviations for review",
                    "A user login screen with password requirements — this prevents unauthorized access to the ERP system"
                ],
                "Correct": [
                    "A run-to-run control that compares the total dollar value of invoices entered in a batch to the total posted to the general ledger",
                    "A sequence check that verifies purchase order numbers are sequential and reports any gaps that may indicate deleted or missing transactions",
                    "A reasonableness check that compares weekly inventory write-offs to historical averages and flags significant deviations for review"
                ],
                "Explanation": "Run-to-run totals, sequence checks, and reasonableness checks are all processing controls — they operate on data during or after processing to ensure accuracy and completeness. The weekly payment report review is an output control (reviewing processed output). The user login screen is an access control, not a processing control. Processing controls ensure that data is not lost, duplicated, or incorrectly processed during system operations.",
                "Topic": "Processing controls — types and applications",
                "ItemID": "CBQ4-E2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Processing controls ensure the completeness, accuracy, and authorization of data during processing. They are a critical component of the COSO Control Activities component and are specifically addressed in the COBIT framework's DSS (Deliver, Service, and Support) domain.",
                "BusinessInterpretation": "Processing controls are often the weakest link in IT application control environments. Organizations invest heavily in input controls but may neglect processing controls, leaving gaps where data corruption or loss could occur during batch processing, data migration, or system interfaces.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "MedTech's internal audit team is classifying application controls by type. Match each control description to the correct control category using Exhibit 2.",
                "LeftItems": [
                    "When a receiving clerk enters the quantity received, the ERP system verifies that it does not exceed the quantity ordered by more than 10%",
                    "The ERP system assigns sequential batch numbers to all invoice batches; the accounting supervisor reviews a daily gap report for missing batches",
                    "The accounts payable manager reviews a weekly aged payables report and investigates any invoices older than 45 days",
                    "The ERP system restricts invoice entry to users in the AP Clerk role; procurement managers cannot enter invoices"
                ],
                "RightItems": [
                    "Input control — quantity reasonableness check prevents receiving errors from entering the system",
                    "Processing control — batch sequence verification ensures no invoice batches are lost or deleted during processing",
                    "Output control — periodic review of processed output ensures accuracy and triggers follow-up on anomalies",
                    "Access control — role-based security prevents users from performing incompatible functions",
                    "General IT control — relates to the overall IT environment rather than a specific application"
                ],
                "Correct": {
                    "When a receiving clerk enters the quantity received, the ERP system verifies that it does not exceed the quantity ordered by more than 10%": "Input control — quantity reasonableness check prevents receiving errors from entering the system",
                    "The ERP system assigns sequential batch numbers to all invoice batches; the accounting supervisor reviews a daily gap report for missing batches": "Processing control — batch sequence verification ensures no invoice batches are lost or deleted during processing",
                    "The accounts payable manager reviews a weekly aged payables report and investigates any invoices older than 45 days": "Output control — periodic review of processed output ensures accuracy and triggers follow-up on anomalies",
                    "The ERP system restricts invoice entry to users in the AP Clerk role; procurement managers cannot enter invoices": "Access control — role-based security prevents users from performing incompatible functions"
                },
                "Explanation": "Input controls prevent errors at the point of data entry. Processing controls verify data integrity during processing. Output controls ensure accurate reports reach the right people. Access controls prevent unauthorized actions. The question tests understanding of the four control categories from Exhibit 2. The receiving quantity check is input, batch sequence check is processing, report review is output, and role-based access is an access control.",
                "Topic": "Classifying application controls by category",
                "ItemID": "CBQ4-E2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO internal control framework and COBIT 2019 both emphasize that a layered approach to IT controls — combining input, processing, output, and access controls — provides defense-in-depth for financial data integrity.",
                "BusinessInterpretation": "Organizations should design application controls using a risk-based approach. High-risk, high-value transactions warrant multiple layers of control. Routine, low-value transactions may only need basic input controls. The control design should be proportionate to the risk.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "The same employee in MedTech's AP department can create new vendor records, enter invoices, and process payments in the ERP system. Management argues that the system's input controls (vendor validity check, three-way match) compensate for this lack of segregation. Which assessment BEST reflects the internal control risk?",
                "Correct": "Segregation of duties is severely compromised — one employee has end-to-end control over the vendor lifecycle (create, pay, reconcile); application controls reduce but do not eliminate the fraud risk, as the employee could create a fictitious vendor and process payments while manually overriding the three-way match",
                "Choices": [
                    "Segregation of duties is severely compromised — one employee has end-to-end control over the vendor lifecycle (create, pay, reconcile); application controls reduce but do not eliminate the fraud risk, as the employee could create a fictitious vendor and process payments while manually overriding the three-way match",
                    "The application controls are sufficient — the vendor validity check prevents payments to unapproved vendors, and the three-way match ensures payments are only for goods received; segregation of duties is not necessary",
                    "This is an acceptable practice in small companies — management override and segregation of duties concerns are only applicable to publicly traded companies under SOX Section 404",
                    "The risk is low because the ERP system logs all user activity — if the employee commits fraud, internal audit will detect it during the next quarterly audit"
                ],
                "Explanation": "Segregation of duties is a fundamental internal control principle. Allowing one person to create vendors, enter invoices, and process payments creates a fraud scenario: the employee could create a fictitious vendor, enter fake invoices, and authorize payments. While application controls (vendor validity check, three-way match) provide some mitigation, the risk remains significant because the same employee could potentially override or circumvent these controls. Activity logs are detective, not preventive — they only identify fraud after it has occurred.",
                "Topic": "Segregation of duties in automated systems",
                "ItemID": "CBQ4-E2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Segregation of duties requires that no single individual has control over two or more phases of a transaction (authorization, custody, recordkeeping). COSO principle 11 states that the organization selects and develops general control activities over technology to support the achievement of objectives.",
                "BusinessInterpretation": "Automation does not eliminate the need for segregation of duties — it changes how segregation is implemented. In ERP systems, segregation is enforced through role-based access controls and approval workflows. Detective controls (reconciliation, monitoring) are secondary to preventive controls (access restrictions).",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E2",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
        "CaseID": "CBQ4-E3",
        "Title": "Foreign Corrupt Practices Act (FCPA)",
        "SectionTags": [
            "E"
        ],
        "Pack": 4,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Foreign Corrupt Practices Act (FCPA)"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Foreign Corrupt Practices Act (FCPA)",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "Apex Components",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Industrial manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Analyze FCPA anti-bribery provisions and prohibited conduct",
            "Evaluate FCPA accounting and internal control requirements",
            "Distinguish between lawful facilitating payments and illegal bribes",
            "Assess FCPA compliance program design and implementation",
            "Evaluate consequences of FCPA violations for companies and individuals"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            },
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content reconstruction with business narrative, exhibits, and questions"
            }
        ],
        "Stakeholder": "Director of Internal Audit",
        "Tags": [
            "FCPA",
            "anti-bribery",
            "internal controls",
            "compliance",
            "foreign corrupt practices"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Apex Components, a U.S.-based industrial manufacturer, has been expanding into emerging markets in Southeast Asia and Latin America. The company's international sales have grown 40% year-over-year. During a routine internal audit of the new international operations, the internal audit team identified several transactions and practices that may raise concerns under the Foreign Corrupt Practices Act (FCPA). The board's audit committee has requested a comprehensive review of the company's FCPA compliance.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: FCPA Compliance Risk Assessment — Apex International Operations",
                "Headers": [
                    "Risk Scenario",
                    "Description",
                    "FCPA Concern",
                    "Risk Level"
                ],
                "Rows": [
                    [
                        "Foreign customs expediting fees",
                        "Sales manager paid $500 to customs official to expedite clearance of a shipment",
                        "Could be a facilitating payment (permissible) or a bribe depending on circumstances",
                        "Low-Medium"
                    ],
                    [
                        "Third-party agent commission",
                        "Agent in Country X receives 15% commission on government contracts; agent is related to a government procurement official",
                        "Red flag — commission to related party of government official suggests potential improper payment",
                        "High"
                    ],
                    [
                        "Charitable donation request",
                        "Foreign government minister requests $50,000 donation to his personal foundation; company wants to support community",
                        "Likely improper — donation to official's personal entity may be indirect bribe",
                        "High"
                    ],
                    [
                        "Client entertainment",
                        "Sales team hosted 10 government clients at a luxury resort ($1,200 per person) including spouses",
                        "Exceeds reasonable business entertainment threshold; potential FCPA issue",
                        "Medium"
                    ],
                    [
                        "Local partner joint venture",
                        "Proposed JV partner has government officials on its board; partner demands $100,000 \"advisory fee\"",
                        "High-risk — JV with government-affiliated entity requires enhanced due diligence",
                        "High"
                    ]
                ],
                "ExhibitID": "CBQ4-E3-E1",
                "CaseID": "CBQ4-E3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-E3-Q1",
                    "CBQ4-E3-Q2",
                    "CBQ4-E3-Q3",
                    "CBQ4-E3-Q4"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: FCPA — Two Main Provisions",
                "Headers": [
                    "Provision",
                    "Requirement",
                    "Key Elements",
                    "Penalties"
                ],
                "Rows": [
                    [
                        "Anti-bribery provisions (15 U.S.C. § 78dd-1)",
                        "Prohibits paying or offering anything of value to foreign officials to obtain or retain business",
                        "Covers any US person/company; applies to payments through third parties; no materiality threshold",
                        "Corporations: up to $2M per violation; Individuals: up to $250K and 20 years imprisonment"
                    ],
                    [
                        "Accounting provisions (15 U.S.C. § 78m(b))",
                        "Requires issuers to maintain accurate books/records and devise adequate internal accounting controls",
                        "Books and records must accurately reflect transactions; internal controls must provide reasonable assurance",
                        "Corporations: up to $25M per violation; Individuals: up to $5M and 20 years imprisonment"
                    ],
                    [
                        "Facilitating payments exception",
                        "Small payments to low-level officials to expedite routine non-discretionary government actions",
                        "Must be for routine action (processing permits, visas); cannot be for discretionary decision",
                        "Not prohibited, but must be accurately recorded in the books"
                    ],
                    [
                        "Affirmative defenses",
                        "Payment was lawful under foreign law OR was reasonable and bona fide business expense",
                        "Company must prove the payment was legal in the foreign country or was directly related to promotion/demonstration of products",
                        "Burden of proof on defendant"
                    ]
                ],
                "ExhibitID": "CBQ4-E3-E2",
                "CaseID": "CBQ4-E3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-E3-Q1",
                    "CBQ4-E3-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "Referring to Exhibit 1, the sales manager paid $500 to a customs official to expedite clearance of a shipment of emergency replacement parts. The payment was recorded as \"expediting fee\" in the books. Under the FCPA, which statement BEST characterizes this payment?",
                "Correct": "This may qualify as a facilitating payment if it was for a routine, non-discretionary government action (processing customs clearance) and was accurately recorded — however, the company should establish clear policies defining when facilitating payments are acceptable and require documentation",
                "Choices": [
                    "This may qualify as a facilitating payment if it was for a routine, non-discretionary government action (processing customs clearance) and was accurately recorded — however, the company should establish clear policies defining when facilitating payments are acceptable and require documentation",
                    "This is clearly a violation of the FCPA — any payment to a foreign government official is illegal regardless of amount or purpose",
                    "This is not an FCPA concern because $500 is below the materiality threshold for internal audit review",
                    "This is acceptable because the payment was properly recorded in the books as an expediting fee, satisfying the FCPA accounting provisions"
                ],
                "Explanation": "The FCPA's anti-bribery provisions include a narrow exception for facilitating payments (also called expediting payments) made to low-level officials to expedite routine, non-discretionary government actions such as customs clearance. However, this exception is interpreted narrowly by enforcement agencies. The payment must be accurately recorded. Companies should establish clear policies on whether facilitating payments are permitted, require approval, and must be documented. The $500 amount has no bearing on whether the FCPA applies — there is no materiality threshold under the anti-bribery provisions.",
                "Topic": "FCPA facilitating payments exception",
                "ItemID": "CBQ4-E3-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The FCPA contains a facilitating payments exception for payments to expedite routine governmental actions. However, DOJ and SEC guidance narrows this exception significantly. The payment must be accurately recorded in the books — making an improper payment and disguising it in the books violates both the anti-bribery and accounting provisions.",
                "BusinessInterpretation": "Many US companies prohibit all facilitating payments as a matter of policy, even though the FCPA provides an exception. The reputational risk and enforcement uncertainty often outweigh the operational convenience of such payments. Apex should consider whether its policy should be zero-tolerance.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E3",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "Apex's internal audit team discovers that the 15% commission paid to Agent X in Country X (Exhibit 1) was routed through a shell company in a third country and there is no written agreement defining the services provided. The agent is a cousin of the country's minister of procurement. What is the MOST significant FCPA risk?",
                "Correct": "This presents a high-risk red flag for indirect bribery — the FCPA prohibits corrupt payments through third parties; the combination of relationship to a government official, opaque payment structure, and lack of written agreement strongly suggests the commission may be a conduit for improper payments",
                "Choices": [
                    "This presents a high-risk red flag for indirect bribery — the FCPA prohibits corrupt payments through third parties; the combination of relationship to a government official, opaque payment structure, and lack of written agreement strongly suggests the commission may be a conduit for improper payments",
                    "The risk is low because the company is paying a legitimate agent a standard commission rate; the agent's family relationship is not relevant under the FCPA",
                    "The only risk is under local Country X law — the FCPA does not apply to payments made to foreign agents, only to direct payments to government officials",
                    "The risk is moderate but can be mitigated by requiring the agent to sign a standard compliance certification after the fact"
                ],
                "Explanation": "Third-party intermediaries are one of the most common FCPA violation mechanisms. Red flags include: relationship to a government official, unusual payment structures (shell company), lack of written agreement, and high commission rates. The FCPA explicitly prohibits corrupt payments made through third parties when the company knows or should know that some portion will go to a foreign official. Due diligence should have been conducted before retaining the agent. Retrospective compliance certifications do not cure the underlying risk.",
                "Topic": "Third-party intermediary risk under FCPA",
                "ItemID": "CBQ4-E3-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The FCPA's third-party payment prohibition applies when the company knows or has reason to know that a payment to an intermediary will be used to improperly influence a foreign official. The DOJ evaluates whether sufficient due diligence was conducted and whether red flags were ignored.",
                "BusinessInterpretation": "Third-party due diligence is a critical FCPA compliance activity. Companies should: (1) verify the identity and reputation of agents, (2) check for government affiliations, (3) ensure written agreements with clear scope of services, (4) pay commissions commensurate with services, and (5) conduct ongoing monitoring.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E3",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "Based on Exhibit 1 and Exhibit 2, which of the following actions should Apex Components take to strengthen its FCPA compliance program? (Select all that apply.)",
                "Choices": [
                    "Conduct enhanced due diligence on all third-party agents and intermediaries in high-risk countries before entering into agreements",
                    "Require all international employees to complete annual FCPA training covering anti-bribery provisions, red flags, and reporting procedures",
                    "Ignore the charitable donation request because it is a local cultural practice and the company should respect local customs",
                    "Implement a policy requiring all facilitating payments to be approved in advance by the compliance officer and documented in the accounting records",
                    "Terminate the proposed joint venture partner if due diligence confirms government officials on the board without legitimate business rationale"
                ],
                "Correct": [
                    "Conduct enhanced due diligence on all third-party agents and intermediaries in high-risk countries before entering into agreements",
                    "Require all international employees to complete annual FCPA training covering anti-bribery provisions, red flags, and reporting procedures",
                    "Implement a policy requiring all facilitating payments to be approved in advance by the compliance officer and documented in the accounting records",
                    "Terminate the proposed joint venture partner if due diligence confirms government officials on the board without legitimate business rationale"
                ],
                "Explanation": "Strengthening FCPA compliance requires proactive measures: pre-engagement due diligence, employee training, controlled facilitating payment procedures, and risk-based decisions on high-risk business relationships. The distractor (ignoring the donation request) is incorrect — cultural practices do not override FCPA requirements. The donation to a minister's personal foundation is a significant red flag and should be investigated, not accepted.",
                "Topic": "FCPA compliance program strengthening",
                "ItemID": "CBQ4-E3-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "An effective FCPA compliance program includes: tone at the top, written policies and procedures, training, due diligence on third parties, accounting controls, periodic testing, and reporting mechanisms. The DOJ's Evaluation of Corporate Compliance Programs guidance provides the framework for assessing program effectiveness.",
                "BusinessInterpretation": "The SEC and DOJ consider an effective compliance program as a mitigating factor in enforcement actions. Companies with robust compliance programs that self-report violations may receive reduced penalties or declinations. Apex should benchmark its program against the DOJ's guidance.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E3",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "The internal audit team classified each risk scenario from Exhibit 1 for further action. Match each scenario to the most appropriate compliance response.",
                "LeftItems": [
                    "Customs expediting fee — $500 paid to customs official; recorded as expense",
                    "Agent commission — 15% via shell company; agent related to procurement minister",
                    "Charitable donation request — $50,000 to minister's personal foundation",
                    "Luxury client entertainment — $1,200/person including spouses for government clients"
                ],
                "RightItems": [
                    "Permissible if properly approved and documented under company policy — establish clear policy on facilitating payments; continue monitoring",
                    "Investigate immediately and consider termination — red flags indicate likely improper payments; may require voluntary disclosure to DOJ",
                    "Decline and report to compliance committee — donation to personal entity of government official is presumptively improper; offer alternative legitimate charitable options",
                    "Review and strengthen expense policy — entertainment exceeding $500 per person should require pre-approval; spouse attendance is presumptively improper",
                    "No action needed — these are standard business practices in emerging markets"
                ],
                "Correct": {
                    "Customs expediting fee — $500 paid to customs official; recorded as expense": "Permissible if properly approved and documented under company policy — establish clear policy on facilitating payments; continue monitoring",
                    "Agent commission — 15% via shell company; agent related to procurement minister": "Investigate immediately and consider termination — red flags indicate likely improper payments; may require voluntary disclosure to DOJ",
                    "Charitable donation request — $50,000 to minister's personal foundation": "Decline and report to compliance committee — donation to personal entity of government official is presumptively improper; offer alternative legitimate charitable options",
                    "Luxury client entertainment — $1,200/person including spouses for government clients": "Review and strengthen expense policy — entertainment exceeding $500 per person should require pre-approval; spouse attendance is presumptively improper"
                },
                "Explanation": "Each scenario requires a different compliance response. The customs fee is borderline and needs policy clarification. The agent commission is a red flag requiring investigation and possibly voluntary disclosure. The charitable donation to a personal entity is presumptively improper. The entertainment expense exceeds reasonable business practice and requires policy strengthening. Ignoring any of these scenarios would create significant FCPA exposure.",
                "Topic": "FCPA compliance responses by risk scenario",
                "ItemID": "CBQ4-E3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The FCPA accounting provisions require issuers to maintain books and records that accurately reflect transactions and to devise and maintain adequate internal accounting controls. This means all payments — including facilitating payments and entertainment — must be properly recorded and controlled.",
                "BusinessInterpretation": "The DOJ expects companies to take prompt remedial action when FCPA issues are identified. Self-disclosure, cooperation, and remediation are key factors in determining whether the DOJ will prosecute, offer a declination, or impose a reduced penalty. Apex should consult with FCPA counsel promptly.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E3",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Prompt": "Apex's CFO argues that the company does not need separate FCPA-specific internal controls because the company already has a general internal control system. Referring to Exhibit 2, which response BEST addresses this argument?",
                "Correct": "The FCPA's accounting provisions specifically require issuers to maintain internal accounting controls sufficient to provide reasonable assurance that transactions are recorded as necessary to permit preparation of financial statements and to maintain accountability for assets — general controls may not be sufficient to detect and prevent improper foreign payments that could be disguised in the books",
                "Choices": [
                    "The FCPA's accounting provisions specifically require issuers to maintain internal accounting controls sufficient to provide reasonable assurance that transactions are recorded as necessary to permit preparation of financial statements and to maintain accountability for assets — general controls may not be sufficient to detect and prevent improper foreign payments that could be disguised in the books",
                    "The CFO is correct — the FCPA does not require separate controls beyond what SOX already requires for all public companies",
                    "Internal controls are only required for the anti-bribery provisions, not for the accounting provisions of the FCPA",
                    "The FCPA only applies to companies with more than $100 million in international revenue — Apex does not need separate controls if its international revenue is below this threshold"
                ],
                "Explanation": "The FCPA's accounting provisions apply to all SEC-reporting issuers and require that internal controls provide reasonable assurance that transactions are properly authorized and recorded. Standard internal controls may not adequately address FCPA-specific risks, such as disguised payments through third parties, unusual commission structures, or improper charitable contributions. Companies with international operations should implement FCPA-specific controls including: enhanced due diligence for third parties, approval controls for high-risk payments, and monitoring of international transactions.",
                "Topic": "FCPA accounting provisions and internal control requirements",
                "ItemID": "CBQ4-E3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The FCPA accounting provisions were added specifically because Congress recognized that bribery often involves falsification of books and records. The internal control requirements apply regardless of whether a company has foreign operations — they apply to all SEC registrants as part of the Securities Exchange Act of 1934.",
                "BusinessInterpretation": "The SEC and DOJ have brought FCPA enforcement actions based solely on the accounting provisions (falsifying records, inadequate controls) even when they could not prove an underlying bribe. This makes the accounting provisions a powerful enforcement tool. Companies should ensure their FCPA compliance program covers both the anti-bribery and accounting provisions comprehensively.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-E3",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
        "CaseID": "CBQ4-F1",
        "Title": "Cloud Computing Models",
        "SectionTags": [
            "F"
        ],
        "Pack": 4,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Cloud Computing Models"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Cloud Computing Models",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "MedTech Devices",
        "CompanyType": "Medical device manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Medical devices",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Distinguish between IaaS, PaaS, and SaaS cloud service models",
            "Evaluate cloud deployment models: public, private, hybrid, and community cloud",
            "Analyze cloud computing benefits and risks from a management accounting perspective",
            "Apply cloud economics and cost considerations to IT sourcing decisions",
            "Assess data security, compliance, and vendor lock-in risks of cloud adoption"
        ],
        "ModifiedDate": "2026-07-21",
        "ProductionStatus": "Draft",
        "QAReviewer": "Validator",
        "QuestionCount": 5,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            },
            {
                "Date": "2026-07-21",
                "Version": "2.0",
                "Author": "Case Author",
                "Summary": "Full content reconstruction with business narrative, exhibits, and questions"
            }
        ],
        "Stakeholder": "Chief Information Officer",
        "Tags": [
            "cloud computing",
            "IaaS",
            "PaaS",
            "SaaS",
            "IT strategy"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "MedTech Devices is evaluating a migration of its IT infrastructure and applications to the cloud. The company operates in a highly regulated industry (medical devices) and must comply with FDA quality system regulations, HIPAA data privacy requirements, and SOX financial reporting controls. The CFO has asked the IT steering committee to evaluate cloud options and present a recommendation. The committee includes representatives from IT, finance, legal, compliance, and operations.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: Cloud Service Models — Responsibility Matrix",
                "Headers": [
                    "Responsibility",
                    "On-Premise",
                    "IaaS",
                    "PaaS",
                    "SaaS"
                ],
                "Rows": [
                    [
                        "Applications",
                        "Customer",
                        "Customer",
                        "Customer",
                        "Vendor"
                    ],
                    [
                        "Data",
                        "Customer",
                        "Customer",
                        "Customer",
                        "Customer"
                    ],
                    [
                        "Runtime environment",
                        "Customer",
                        "Customer",
                        "Vendor",
                        "Vendor"
                    ],
                    [
                        "Middleware / OS",
                        "Customer",
                        "Customer",
                        "Vendor",
                        "Vendor"
                    ],
                    [
                        "Virtualization",
                        "Customer",
                        "Vendor",
                        "Vendor",
                        "Vendor"
                    ],
                    [
                        "Servers / Storage",
                        "Customer",
                        "Vendor",
                        "Vendor",
                        "Vendor"
                    ],
                    [
                        "Networking",
                        "Customer",
                        "Vendor",
                        "Vendor",
                        "Vendor"
                    ],
                    [
                        "Physical facility",
                        "Customer",
                        "Vendor",
                        "Vendor",
                        "Vendor"
                    ]
                ],
                "ExhibitID": "CBQ4-F1-E1",
                "CaseID": "CBQ4-F1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F1-Q1",
                    "CBQ4-F1-Q3"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Cloud Migration — Cost-Benefit Analysis (Annual)",
                "Headers": [
                    "Cost Category",
                    "Current On-Premise",
                    "Public Cloud (IaaS)",
                    "Public Cloud (SaaS)"
                ],
                "Rows": [
                    [
                        "Hardware/software licenses",
                        "$450,000",
                        "$0",
                        "$0"
                    ],
                    [
                        "Cloud subscription fees",
                        "$0",
                        "$320,000",
                        "$480,000"
                    ],
                    [
                        "IT staff (data center operations)",
                        "$280,000",
                        "$100,000",
                        "$60,000"
                    ],
                    [
                        "Facility costs (power, cooling, space)",
                        "$120,000",
                        "$0",
                        "$0"
                    ],
                    [
                        "Data migration (one-time)",
                        "—",
                        "$150,000",
                        "$200,000"
                    ],
                    [
                        "Training (one-time)",
                        "—",
                        "$40,000",
                        "$35,000"
                    ],
                    [
                        "Compliance/audit costs",
                        "$50,000",
                        "$70,000",
                        "$80,000"
                    ],
                    [
                        "Estimated downtime cost (annual)",
                        "$85,000",
                        "$35,000",
                        "$25,000"
                    ],
                    [
                        "Total annual cost (Year 1)",
                        "$985,000",
                        "$715,000",
                        "$880,000"
                    ],
                    [
                        "Total annual cost (Year 2+, steady state)",
                        "$985,000",
                        "$525,000",
                        "$645,000"
                    ]
                ],
                "ExhibitID": "CBQ4-F1-E2",
                "CaseID": "CBQ4-F1",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F1-Q2",
                    "CBQ4-F1-Q4"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The IT steering committee is evaluating different cloud service models for MedTech's applications. Using Exhibit 1, match each application requirement to the most appropriate cloud service model.",
                "LeftItems": [
                    "The HR department needs a payroll and benefits administration system; they want to avoid any hardware or software management and access it through a web browser",
                    "The IT team wants to build a custom inventory management application; they need a platform with development tools, database, and middleware but want to avoid managing underlying infrastructure",
                    "The data science team needs raw virtual servers, storage, and networking to run analytics workloads; they will manage the OS and applications themselves",
                    "The ERP system contains sensitive financial and patient data; MedTech needs maximum control and is considering keeping it on-premise"
                ],
                "RightItems": [
                    "SaaS — software is fully managed by the vendor and accessed via browser; the customer manages only data and user access",
                    "PaaS — provides development platform and runtime environment; vendor manages infrastructure, OS, and middleware; customer manages applications and data",
                    "IaaS — provides virtualized computing resources; customer manages OS, middleware, runtime, applications, and data; vendor manages physical infrastructure",
                    "On-premise — maximum control over all layers; customer manages everything including physical security; appropriate for highly regulated data",
                    "Community cloud — shared infrastructure among several organizations with common compliance concerns"
                ],
                "Correct": {
                    "The HR department needs a payroll and benefits administration system; they want to avoid any hardware or software management and access it through a web browser": "SaaS — software is fully managed by the vendor and accessed via browser; the customer manages only data and user access",
                    "The IT team wants to build a custom inventory management application; they need a platform with development tools, database, and middleware but want to avoid managing underlying infrastructure": "PaaS — provides development platform and runtime environment; vendor manages infrastructure, OS, and middleware; customer manages applications and data",
                    "The data science team needs raw virtual servers, storage, and networking to run analytics workloads; they will manage the OS and applications themselves": "IaaS — provides virtualized computing resources; customer manages OS, middleware, runtime, applications, and data; vendor manages physical infrastructure",
                    "The ERP system contains sensitive financial and patient data; MedTech needs maximum control and is considering keeping it on-premise": "On-premise — maximum control over all layers; customer manages everything including physical security; appropriate for highly regulated data"
                },
                "Explanation": "The shared responsibility model is key to understanding cloud services. SaaS provides the least customer responsibility (only data and access). PaaS provides a development platform. IaaS provides raw infrastructure. On-premise provides maximum control. The regulated nature of MedTech's data means that on-premise or a private cloud may be most appropriate for the ERP system, while less sensitive applications can use SaaS or IaaS.",
                "Topic": "Cloud service model selection — shared responsibility",
                "ItemID": "CBQ4-F1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Cloud service models follow a shared responsibility model where the allocation of control and compliance responsibilities varies by service type. Management accountants must understand these allocations to assess the impact on internal controls and financial reporting.",
                "BusinessInterpretation": "The shared responsibility model has significant implications for SOX compliance and audit. When using SaaS or PaaS, the company relies on the vendor's controls — the auditor will need a SOC 2 Type II report or equivalent assurance. The compliance burden does not disappear with cloud migration; it shifts from managing technology to managing vendor relationships.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-F1",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "Using Exhibit 2, the CFO asks whether cloud migration makes financial sense. Which statement BEST analyzes the financial impact of migrating from on-premise to IaaS?",
                "Correct": "IaaS offers significant long-term savings ($460,000/year in steady state) but requires $190,000 in one-time migration costs; the 5-month payback period is attractive, and the ongoing operational savings (reduced IT staff, no facility costs, lower downtime) support the business case",
                "Choices": [
                    "IaaS offers significant long-term savings ($460,000/year in steady state) but requires $190,000 in one-time migration costs; the 5-month payback period is attractive, and the ongoing operational savings (reduced IT staff, no facility costs, lower downtime) support the business case",
                    "Cloud migration is not financially beneficial — total Year 1 cost is $715,000 vs $985,000 on-premise, but the reduction in IT staff headcount makes this a bad decision for employee morale",
                    "SaaS is the best option because it has the lowest total cost in Year 1 ($880,000) and eliminates the need for IT staff entirely",
                    "The analysis is incomplete because it does not include the cost of potential data breaches, which makes cloud computing too risky for MedTech regardless of cost savings"
                ],
                "Explanation": "The IaaS business case is compelling: steady-state costs are $460,000 lower per year ($985,000 − $525,000), with a payback period of approximately 5 months on the incremental investment ($190,000 / $460,000 per year = 0.41 years or ~5 months, demonstrating a rapid return on the migration investment). SaaS steady-state is $340,000 lower but requires higher subscription costs. IT staff are not eliminated but redeployed to higher-value activities. Data breach risk exists for all deployment models and can be managed through appropriate security controls in any environment.",
                "Topic": "Cloud economics and cost-benefit analysis",
                "ItemID": "CBQ4-F1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Cloud migration decisions should be analyzed using total cost of ownership (TCO), including direct costs (subscriptions, migration) and indirect costs (training, compliance, downtime). The analysis should consider both quantitative and qualitative factors.",
                "BusinessInterpretation": "Cloud computing shifts IT spending from capital expenditure (hardware, facilities) to operating expenditure (subscriptions). This changes financial metrics like ROI, EBITDA, and capital allocation. Some companies prefer the OpEx model because it provides more flexibility and aligns costs with usage.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-F1",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "The compliance officer raises concerns about data security and regulatory compliance in the cloud. Based on Exhibit 1 and general cloud computing knowledge, which of the following are VALID concerns that MedTech should address in its cloud migration plan? (Select all that apply.)",
                "Choices": [
                    "In cloud models, MedTech retains responsibility for its data regardless of where it is stored; the company must ensure the cloud provider's controls meet FDA and HIPAA requirements",
                    "Data residency requirements may restrict where patient data can be stored; the cloud provider must offer data centers in approved geographic locations",
                    "Moving to the cloud eliminates the need for MedTech to maintain any internal controls because the cloud provider assumes all control responsibilities",
                    "Cloud service providers typically offer SOC 2 Type II reports that can be used to assess their controls; MedTech should review these reports as part of vendor due diligence",
                    "Vendor lock-in is a risk — migrating data and applications between cloud providers can be complex and costly"
                ],
                "Correct": [
                    "In cloud models, MedTech retains responsibility for its data regardless of where it is stored; the company must ensure the cloud provider's controls meet FDA and HIPAA requirements",
                    "Data residency requirements may restrict where patient data can be stored; the cloud provider must offer data centers in approved geographic locations",
                    "Cloud service providers typically offer SOC 2 Type II reports that can be used to assess their controls; MedTech should review these reports as part of vendor due diligence",
                    "Vendor lock-in is a risk — migrating data and applications between cloud providers can be complex and costly"
                ],
                "Explanation": "MedTech retains full responsibility for its data and compliance regardless of cloud deployment. Data residency requirements must be addressed. SOC 2 reports are the standard mechanism for evaluating cloud provider controls. Vendor lock-in is a real risk. The distractor is incorrect because internal controls are not eliminated — they shift from managing technology controls to managing vendor relationship controls, including contract review, SLA monitoring, and third-party audit oversight.",
                "Topic": "Cloud security, compliance, and vendor risk management",
                "ItemID": "CBQ4-F1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Under COSO and SOX, management is responsible for the design and effectiveness of internal controls over financial reporting regardless of whether systems are on-premise or in the cloud. Third-party service organization controls must be evaluated as part of the overall control environment (see AU-C 402 and SOC reporting).",
                "BusinessInterpretation": "Cloud adoption changes the nature of control but does not eliminate control responsibility. The accounting and compliance functions must develop new skills in vendor risk management, contract negotiation, and cloud service audit. Service Level Agreements (SLAs) become critical governance documents.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-F1",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Prompt": "MedTech's controller is concerned about capitalizing cloud implementation costs versus expensing them. Under current accounting guidance (ASC 350-40), which statement BEST describes how MedTech should account for the cloud migration costs shown in Exhibit 2?",
                "Correct": "Cloud implementation costs should be accounted for based on the nature of the cost — subscription fees are expensed as incurred; one-time migration costs (data migration, training) should be evaluated under the hosting arrangement guidance, with certain implementation costs capitalized if the arrangement is a service contract",
                "Choices": [
                    "Cloud implementation costs should be accounted for based on the nature of the cost — subscription fees are expensed as incurred; one-time migration costs (data migration, training) should be evaluated under the hosting arrangement guidance, with certain implementation costs capitalized if the arrangement is a service contract",
                    "All cloud migration costs should be capitalized as intangible assets and amortized over the expected useful life of the cloud service, similar to purchased software",
                    "All cloud costs must be expensed immediately under GAAP because cloud subscriptions are operating leases and do not meet the criteria for capitalization",
                    "Cloud costs should be expensed if the arrangement is SaaS but capitalized if the arrangement is IaaS or PaaS"
                ],
                "Explanation": "Under ASC 350-40 (Internal-Use Software) and related guidance on cloud computing arrangements, the accounting treatment depends on whether the arrangement includes a software license. If it is a service contract (typical SaaS), implementation costs are generally expensed, though certain costs (data conversion, testing) may be capitalized if certain criteria are met. Subscription fees are expensed as the service is received. The costs are NOT generally capitalized as intangible assets. The distinction is not simply SaaS vs IaaS but whether a software license exists.",
                "Topic": "Cloud computing accounting — capitalization vs expense",
                "ItemID": "CBQ4-F1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Under ASC 350-40 and ASU 2018-15, the accounting for cloud implementation costs depends on whether the arrangement is a software license or a service contract. If it is a service contract, implementation costs are generally expensed. If the arrangement includes a software license, the license costs are capitalized and amortized.",
                "BusinessInterpretation": "The distinction between cloud service arrangements and software licenses has significant financial statement implications. Companies migrating to cloud should carefully evaluate their accounting policies to ensure proper treatment. The SEC has shown interest in consistent application of these policies across companies.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-F1",
                "EstimatedMinutes": 7,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "The IT steering committee is considering different cloud deployment models. Match each deployment model to the scenario that BEST fits its characteristics.",
                "LeftItems": [
                    "MedTech's ERP system must comply with strict FDA and HIPAA requirements; the company wants dedicated infrastructure but has no need for a massive capital investment in a new data center",
                    "MedTech's R&D team needs a sandbox environment to test new analytics tools; they want low cost and do not need dedicated infrastructure",
                    "MedTech and two other medical device companies want to share a cloud environment that meets their common regulatory requirements while keeping costs lower than a fully private cloud",
                    "MedTech acquired a small distributor and needs to quickly integrate their IT systems without a long capital approval process"
                ],
                "RightItems": [
                    "Private cloud — dedicated infrastructure for a single organization; provides the highest security and compliance control while avoiding data center capital costs",
                    "Public cloud — resources shared across multiple organizations; lowest cost but least control; appropriate for development, testing, and non-sensitive workloads",
                    "Community cloud — shared infrastructure among several organizations with common compliance concerns (e.g., HIPAA, FDA); balances cost and compliance",
                    "Public cloud (rapid deployment) — quick provisioning, pay-as-you-go pricing; ideal for acquisitions, temporary workloads, or rapid scaling without capital investment",
                    "Hybrid cloud — combination of public and private; allows sensitive data to remain in private cloud while leveraging public cloud for elasticity"
                ],
                "Correct": {
                    "MedTech's ERP system must comply with strict FDA and HIPAA requirements; the company wants dedicated infrastructure but has no need for a massive capital investment in a new data center": "Private cloud — dedicated infrastructure for a single organization; provides the highest security and compliance control while avoiding data center capital costs",
                    "MedTech's R&D team needs a sandbox environment to test new analytics tools; they want low cost and do not need dedicated infrastructure": "Public cloud — resources shared across multiple organizations; lowest cost but least control; appropriate for development, testing, and non-sensitive workloads",
                    "MedTech and two other medical device companies want to share a cloud environment that meets their common regulatory requirements while keeping costs lower than a fully private cloud": "Community cloud — shared infrastructure among several organizations with common compliance concerns (e.g., HIPAA, FDA); balances cost and compliance",
                    "MedTech acquired a small distributor and needs to quickly integrate their IT systems without a long capital approval process": "Public cloud (rapid deployment) — quick provisioning, pay-as-you-go pricing; ideal for acquisitions, temporary workloads, or rapid scaling without capital investment"
                },
                "Explanation": "Each cloud deployment model serves different needs. Private cloud provides dedicated infrastructure for compliance-sensitive workloads. Public cloud provides low-cost, elastic resources. Community cloud allows regulated industries to share costs while maintaining compliance. Hybrid cloud is another option combining both but does not fit any of the specific scenarios presented. The key is matching deployment model to workload requirements — MedTech will likely need a multi-model strategy.",
                "Topic": "Cloud deployment models — public, private, community, hybrid",
                "ItemID": "CBQ4-F1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The choice of cloud deployment model affects financial reporting, internal controls, and compliance. Private cloud may require capitalization of infrastructure costs. Public cloud shifts costs to OpEx. The deployment model decision should consider both technical requirements and financial reporting implications.",
                "BusinessInterpretation": "Most large organizations use a multi-cloud, multi-model strategy — sensitive workloads on private cloud, development on public cloud, and industry collaboration on community cloud. The mix should be driven by data sensitivity, compliance requirements, cost optimization, and vendor strategy.",
                "CalculationRequired": false,
                "CaseID": "CBQ4-F1",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
        "CaseID": "CBQ4-F2",
        "Title": "Artificial Intelligence & ML",
        "SectionTags": [
            "F"
        ],
        "Pack": 4,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Artificial Intelligence & ML"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Artificial Intelligence & ML",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "OmniRetail",
        "CompanyType": "Retail chain",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Retail",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Distinguish supervised from unsupervised machine learning approaches",
            "Evaluate training data requirements for ML model development",
            "Identify overfitting risks in machine learning applications",
            "Compare ML-driven analytics with traditional rule-based analytics",
            "Analyze business applications of machine learning in retail"
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
                "Summary": "Full content authoring with realistic business scenario, exhibits, and diverse questions"
            }
        ],
        "Stakeholder": "VP of Analytics",
        "Tags": [
            "Machine Learning",
            "Demand Forecasting",
            "Fraud Detection",
            "Customer Segmentation",
            "Supervised Learning",
            "Unsupervised Learning"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "OmniRetail is a national retail chain operating 200 stores across the United States. The company recently launched an enterprise machine learning initiative to improve demand forecasting, fraud detection, and customer segmentation. The data science team trained models using three years of historical transaction data, point-of-sale records, inventory logs, and customer loyalty profiles. The initiative aims to reduce stockouts by 30%, identify fraudulent transactions in real time, and create targeted marketing campaigns based on customer purchasing behavior. The CFO has asked the VP of Analytics to evaluate the ML models' performance and determine whether the investment is delivering measurable business value.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Machine Learning Approaches and Retail Applications",
                "Headers": [
                    "Learning Type",
                    "Data Requirement",
                    "Retail Application",
                    "Output Type"
                ],
                "Rows": [
                    [
                        "Supervised Learning",
                        "Labeled historical data with known outcomes",
                        "Demand forecasting using past sales with known actual demand",
                        "Continuous value (regression) or class label (classification)"
                    ],
                    [
                        "Supervised Learning",
                        "Labeled transaction data with fraud flags",
                        "Fraud detection using approved and flagged transactions",
                        "Binary classification (fraud / not fraud)"
                    ],
                    [
                        "Unsupervised Learning",
                        "Unlabeled customer purchase history",
                        "Customer segmentation based on purchasing patterns",
                        "Cluster membership"
                    ],
                    [
                        "Unsupervised Learning",
                        "Unlabeled transaction data",
                        "Anomaly detection for identifying unusual transaction patterns",
                        "Anomaly score"
                    ]
                ],
                "ExhibitID": "CBQ4-F2-E1",
                "CaseID": "CBQ4-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F2-Q1",
                    "CBQ4-F2-Q2",
                    "CBQ4-F2-Q5"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - ML Implementation Results",
                "Body": "After six months of deployment, the demand forecasting model achieved 92% forecast accuracy across all 200 stores, compared to 78% accuracy under the previous rule-based system. The fraud detection model reviewed 4.5 million transactions, correctly identifying 1,240 fraudulent transactions while generating 85 false positives. The customer segmentation model identified 12 distinct customer clusters, enabling targeted promotions that increased basket size by 15% in three test markets. The data science team noted that the forecasting model performs well on stores with more than three years of data but shows significantly higher error rates on the 12 newest stores with limited historical data.",
                "ExhibitID": "CBQ4-F2-E2",
                "CaseID": "CBQ4-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F2-Q3",
                    "CBQ4-F2-Q4"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "OmniRetail's demand forecasting model requires historical sales data with known actual demand to predict future sales. Which type of machine learning does this approach represent?",
                "Correct": "Supervised learning",
                "Explanation": "Supervised learning uses labeled training data where input variables are paired with known output values. OmniRetail's demand forecasting model is trained on historical sales data with known actual demand, which provides the labeled outcomes needed for a supervised regression model to predict future demand.",
                "Topic": "Artificial Intelligence & ML",
                "Choices": [
                    "Supervised learning",
                    "Unsupervised learning",
                    "Reinforcement learning",
                    "Semi-supervised learning"
                ],
                "ItemID": "CBQ4-F2-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Machine learning classification relies on the fundamental distinction between supervised and unsupervised approaches based on data labeling requirements.",
                "BusinessInterpretation": "Retail demand forecasting models must use supervised learning with labeled historical data because the model needs known outcomes to learn the relationship between features and future demand.",
                "CaseID": "CBQ4-F2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "For each machine learning application at OmniRetail, select whether it uses supervised or unsupervised learning.",
                "Correct": {
                    "Demand forecasting": "Supervised learning",
                    "Fraud detection": "Supervised learning",
                    "Customer segmentation": "Unsupervised learning",
                    "Anomaly detection": "Unsupervised learning"
                },
                "Explanation": "Demand forecasting uses past sales data with known outcomes (supervised regression). Fraud detection trains on labeled transaction data indicating fraud status (supervised classification). Customer segmentation groups unlabeled customer data into clusters (unsupervised clustering). Anomaly detection identifies unusual patterns in unlabeled transaction data (unsupervised).",
                "Topic": "Artificial Intelligence & ML",
                "LeftItems": [
                    "Demand forecasting",
                    "Fraud detection",
                    "Customer segmentation",
                    "Anomaly detection"
                ],
                "RightItems": [
                    "Supervised learning",
                    "Unsupervised learning",
                    "Reinforcement learning",
                    "Semi-supervised learning"
                ],
                "ItemID": "CBQ4-F2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "JudgmentRequired"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Matching machine learning approaches to business applications requires applying the correct algorithmic paradigm based on data availability and business objectives.",
                "BusinessInterpretation": "Retailers must select the appropriate learning approach for each use case; demand forecasting and fraud detection benefit from labeled historical data, while customer segmentation leverages unlabeled data patterns.",
                "CaseID": "CBQ4-F2",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Prompt": "The data science team observes that the demand forecasting model performs poorly on stores with limited historical data. Which of the following factors are likely contributing to overfitting in the model? (Select all that apply.)",
                "Correct": [
                    "Training on insufficient data for newer stores",
                    "Model complexity exceeding the available training sample size",
                    "Learning noise from limited transaction records rather than general patterns"
                ],
                "Explanation": "Overfitting occurs when a model learns noise or random fluctuations in the training data rather than the underlying pattern. Limited data for newer stores means the model may memorize specific transactions rather than learning generalizable demand patterns. Excessive model complexity relative to sample size increases overfitting risk. A diverse and representative training dataset with sufficient volume reduces overfitting.",
                "Topic": "Artificial Intelligence & ML",
                "Choices": [
                    "Training on insufficient data for newer stores",
                    "Model complexity exceeding the available training sample size",
                    "Learning noise from limited transaction records rather than general patterns",
                    "Using a simpler model with fewer parameters than necessary"
                ],
                "ItemID": "CBQ4-F2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Overfitting analysis requires distinguishing between signal (generalizable patterns) and noise (data-specific random variation), analogous to distinguishing relevant from irrelevant variances in cost accounting.",
                "BusinessInterpretation": "Retailers rolling out ML models across stores with varying data histories must account for overfitting risk by adjusting model complexity or using transfer learning from data-rich stores.",
                "CaseID": "CBQ4-F2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "OmniRetail's fraud detection model uses machine learning rather than a traditional rule-based system with fixed thresholds. What is the primary advantage of the ML approach for this application?",
                "Correct": "ML models can adapt to evolving fraud patterns by learning from new transaction data without manual rule updates",
                "Explanation": "Machine learning models continuously learn from new data and can detect novel fraud patterns that rule-based systems would miss. Rule-based systems require manual updates whenever fraud tactics change, making them less effective against adaptive threats. ML models identify subtle, non-obvious patterns across multiple variables simultaneously, whereas rules typically check individual conditions.",
                "Topic": "Artificial Intelligence & ML",
                "Choices": [
                    "ML models can adapt to evolving fraud patterns by learning from new transaction data without manual rule updates",
                    "ML models always achieve 100% accuracy in detecting fraudulent transactions",
                    "Rule-based systems require more computational resources than ML models",
                    "ML models do not require any historical data to detect fraud effectively"
                ],
                "ItemID": "CBQ4-F2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "The comparison between ML and rule-based analytics mirrors the principle of continuous improvement in management accounting, where static standards are replaced by adaptive benchmarks.",
                "BusinessInterpretation": "Retail companies managing payment fraud benefit from ML models that dynamically adjust to emerging fraud patterns, reducing losses without requiring constant manual reprogramming of detection rules.",
                "CaseID": "CBQ4-F2",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "OmniRetail's customer segmentation model identified 12 distinct customer clusters using unsupervised learning. Which of the following are valid retail business applications of these segmentation results? (Select all that apply.)",
                "Correct": [
                    "Targeting high-value clusters with personalized promotions to increase basket size",
                    "Designing store layout and product placement strategies based on cluster purchasing patterns",
                    "Identifying underpenetrated customer segments for acquisition marketing campaigns"
                ],
                "Explanation": "Customer segmentation enables targeted marketing (personalized promotions to clusters with distinct preferences), merchandising strategy (tailoring product placement to cluster buying behavior), and customer acquisition (identifying segments with low current penetration for targeted outreach). Segmentation results inform strategic decisions but do not directly set inventory reorder quantities, which requires demand forecasting.",
                "Topic": "Artificial Intelligence & ML",
                "Choices": [
                    "Targeting high-value clusters with personalized promotions to increase basket size",
                    "Designing store layout and product placement strategies based on cluster purchasing patterns",
                    "Identifying underpenetrated customer segments for acquisition marketing campaigns",
                    "Setting optimal inventory reorder quantities and safety stock levels for each store"
                ],
                "ItemID": "CBQ4-F2-Q5",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Segmentation analysis supports strategic decision-making by identifying customer groups with different profitability profiles, aligning with customer profitability analysis in management accounting.",
                "BusinessInterpretation": "Retailers leverage unsupervised learning to segment customers, then use those segments to guide marketing spend, merchandising decisions, and customer acquisition strategies to maximize return on investment.",
                "CaseID": "CBQ4-F2",
                "EstimatedMinutes": 5,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ4-F3",
        "Title": "Data Privacy & Cryptography",
        "SectionTags": [
            "F"
        ],
        "Pack": 4,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Data Privacy & Cryptography"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Data Privacy & Cryptography",
        "Subtopic": "Cybersecurity controls",
        "SecondaryCompetencies": [
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "MedSecure Health",
        "CompanyType": "Healthcare technology company",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Healthcare technology",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Distinguish symmetric encryption from asymmetric encryption based on key structure",
            "Evaluate hashing applications for data integrity verification",
            "Analyze digital signature mechanisms for authentication and non-repudiation",
            "Identify data privacy compliance requirements under HIPAA",
            "Apply appropriate encryption methods to specific business use cases"
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
                "Summary": "Full content authoring with healthcare scenario, encryption method exhibits, and diverse question types"
            }
        ],
        "Stakeholder": "CISO",
        "Tags": [
            "Encryption",
            "Hashing",
            "Digital Signatures",
            "HIPAA",
            "Data Privacy",
            "Symmetric Encryption",
            "Asymmetric Encryption",
            "Compliance"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "MedSecure Health is a healthcare technology company that develops patient data management platforms used by hospitals and clinics across the United States. Following a third-party security audit, the CISO identified significant gaps in data protection controls, including unencrypted patient records at rest, lack of hashing for data integrity verification, and insufficient access controls for electronic protected health information (ePHI). MedSecure must implement comprehensive encryption and data privacy measures to maintain HIPAA compliance and protect patient data across transmission, storage, and backup systems. The CISO has proposed a tiered encryption strategy using symmetric encryption for database encryption, asymmetric encryption for secure key exchange, and hashing for data integrity verification.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Encryption Methods Comparison",
                "Headers": [
                    "Method",
                    "Key Structure",
                    "Speed",
                    "Primary Use Case",
                    "Key Management"
                ],
                "Rows": [
                    [
                        "Symmetric encryption",
                        "Single shared key for encryption and decryption",
                        "Fast",
                        "Bulk data encryption at rest",
                        "Key distribution is challenging; both parties must share the same key securely"
                    ],
                    [
                        "Asymmetric encryption",
                        "Public-private key pair",
                        "Slower than symmetric",
                        "Secure key exchange and digital signatures",
                        "Public key can be shared openly; private key must remain confidential"
                    ],
                    [
                        "Hashing",
                        "No key; one-way mathematical function",
                        "Very fast",
                        "Data integrity verification",
                        "No key management; same input always produces the same fixed-length output"
                    ]
                ],
                "ExhibitID": "CBQ4-F3-E1",
                "CaseID": "CBQ4-F3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F3-Q1",
                    "CBQ4-F3-Q2",
                    "CBQ4-F3-Q4"
                ]
            },
            {
                "Type": "text",
                "Title": "Exhibit 2 - HIPAA Compliance Requirements",
                "Body": "The HIPAA Security Rule requires covered entities and business associates to implement administrative, physical, and technical safeguards for electronic protected health information (ePHI). Technical safeguards include access controls (unique user identification, emergency access procedures, automatic logoff), audit controls (hardware, software, and procedural mechanisms to record and examine access), integrity controls (mechanisms to ensure ePHI is not improperly altered or destroyed), and transmission security (encryption of ePHI transmitted over electronic networks). The audit findings revealed that MedSecure Health's patient data platform lacked encryption for stored patient records, did not use hashing to verify data integrity during backups, and relied on a single-factor authentication system without encryption for data transmission between hospitals and the platform.",
                "ExhibitID": "CBQ4-F3-E2",
                "CaseID": "CBQ4-F3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ4-F3-Q3",
                    "CBQ4-F3-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "MedSecure Health plans to encrypt its patient database using a method that uses the same key for both encryption and decryption. Which encryption method does this describe?",
                "Correct": "Symmetric encryption",
                "Explanation": "Symmetric encryption uses a single shared key for both encryption and decryption, making it fast and efficient for bulk data encryption at rest. This is the appropriate method for encrypting large databases of patient records because of its speed advantage over asymmetric encryption.",
                "Topic": "Data Privacy & Cryptography",
                "Choices": [
                    "Symmetric encryption",
                    "Asymmetric encryption",
                    "Hashing",
                    "Digital signature"
                ],
                "ItemID": "CBQ4-F3-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Symmetric encryption's single-key structure enables fast bulk encryption, analogous to a single-key lock where the same key locks and unlocks the data.",
                "BusinessInterpretation": "Healthcare companies encrypting large patient databases should use symmetric encryption (such as AES) for performance, but must solve the key distribution challenge to ensure only authorized systems can decrypt the data.",
                "CaseID": "CBQ4-F3",
                "EstimatedMinutes": 4,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "Match each cryptographic method to its correct description.",
                "Correct": {
                    "Symmetric encryption": "Uses one shared key for both encryption and decryption",
                    "Asymmetric encryption": "Uses a public-private key pair for encryption and decryption",
                    "Hashing": "Produces a fixed-length output that cannot be reversed to the original input",
                    "Digital signature": "Uses a private key to sign and a public key to verify authenticity"
                },
                "Explanation": "Symmetric encryption uses one shared key for both operations. Asymmetric encryption uses a key pair where the public key encrypts and the private key decrypts (or vice versa for signatures). Hashing is a one-way function producing irreversible fixed-length output. Digital signatures use asymmetric cryptography where the signer's private key creates the signature and the corresponding public key verifies it.",
                "Topic": "Data Privacy & Cryptography",
                "LeftItems": [
                    "Symmetric encryption",
                    "Asymmetric encryption",
                    "Hashing",
                    "Digital signature"
                ],
                "RightItems": [
                    "Uses one shared key for both encryption and decryption",
                    "Uses a public-private key pair for encryption and decryption",
                    "Produces a fixed-length output that cannot be reversed to the original input",
                    "Uses a private key to sign and a public key to verify authenticity",
                    "Reverses encrypted data by applying the original transformation"
                ],
                "ItemID": "CBQ4-F3-Q2",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Understanding cryptographic method distinctions is essential for selecting appropriate controls to protect sensitive financial and personal data under compliance frameworks.",
                "BusinessInterpretation": "Organizations must match cryptographic methods to specific security needs: symmetric for bulk encryption, asymmetric for key exchange and signatures, and hashing for integrity verification.",
                "CaseID": "CBQ4-F3",
                "EstimatedMinutes": 8,
                "Pack": 4,
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
                "Type": "multi",
                "Prompt": "The CISO at MedSecure Health proposes using hashing to verify data integrity during patient record backups. Which of the following are characteristics of hashing that support this use case? (Select all that apply.)",
                "Correct": [
                    "Hashing produces a fixed-length output regardless of input size",
                    "Any change to the input data produces a completely different hash value",
                    "Hashing is a one-way function that cannot be reversed to recover the original data"
                ],
                "Explanation": "Hashing consistently produces the same fixed-length output for a given input, allowing verification by comparing hash values. Even a single character change in the input produces a completely different hash (avalanche effect), making tampering detectable. Hashing is one-way and cannot be reversed, which means it verifies integrity without exposing the original data. Encryption (not hashing) uses keys; hashing has no key structure.",
                "Topic": "Data Privacy & Cryptography",
                "Choices": [
                    "Hashing produces a fixed-length output regardless of input size",
                    "Any change to the input data produces a completely different hash value",
                    "Hashing is a one-way function that cannot be reversed to recover the original data",
                    "Hashing uses a public-private key pair to encrypt data for secure transmission"
                ],
                "ItemID": "CBQ4-F3-Q3",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Hash functions provide data integrity assurance by enabling detection of unauthorized changes, analogous to seal checks on physical inventory records.",
                "BusinessInterpretation": "Healthcare organizations use hashing (SHA-256) to verify that patient backup data has not been altered during storage or transmission, supporting HIPAA integrity control requirements.",
                "CaseID": "CBQ4-F3",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "MedSecure Health needs to securely share encryption keys with a hospital partner over the internet. The CISO recommends using a method where the hospital's public key encrypts the symmetric key and only the hospital's private key can decrypt it. Which cryptographic concept does this process describe?",
                "Correct": "Asymmetric encryption for secure key exchange",
                "Explanation": "Asymmetric encryption enables secure key exchange by allowing the sender to encrypt a symmetric key with the recipient's public key. Only the recipient's private key can decrypt it, ensuring that even if the encrypted message is intercepted, it cannot be read. This solves the key distribution problem inherent to symmetric encryption.",
                "Topic": "Data Privacy & Cryptography",
                "Choices": [
                    "Asymmetric encryption for secure key exchange",
                    "Symmetric encryption for bulk data protection",
                    "Hashing for message integrity verification",
                    "Digital signature for sender authentication"
                ],
                "ItemID": "CBQ4-F3-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "Asymmetric encryption's public-private key pair enables secure key exchange, which is essential for establishing encrypted communication channels for transmitting sensitive financial and healthcare data.",
                "BusinessInterpretation": "Healthcare organizations use asymmetric encryption (RSA or ECC) to securely exchange symmetric encryption keys, combining the security of asymmetric key exchange with the performance of symmetric bulk encryption.",
                "CaseID": "CBQ4-F3",
                "EstimatedMinutes": 6,
                "Pack": 4,
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
                "Prompt": "Based on the HIPAA Security Rule technical safeguards, which of the following controls should MedSecure Health implement to protect ePHI and maintain compliance? (Select all that apply.)",
                "Correct": [
                    "Encrypting patient records stored in the database to meet transmission and storage security requirements",
                    "Implementing audit controls that record and examine access to ePHI",
                    "Establishing unique user identification and automatic logoff for access control"
                ],
                "Explanation": "HIPAA technical safeguards require encryption of ePHI at rest and in transit (transmission security), audit controls to record access (audit controls), and access controls including unique user IDs and automatic logoff (access controls). Disaster recovery planning is an administrative safeguard, not a technical safeguard, under HIPAA's three-pronged framework.",
                "Topic": "Data Privacy & Cryptography",
                "Choices": [
                    "Encrypting patient records stored in the database to meet transmission and storage security requirements",
                    "Implementing audit controls that record and examine access to ePHI",
                    "Establishing unique user identification and automatic logoff for access control",
                    "Conducting quarterly disaster recovery drills for the patient data platform"
                ],
                "ItemID": "CBQ4-F3-Q5",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "AccountingPrinciple": "HIPAA technical safeguards require specific technology-focused controls (encryption, audit trails, access controls) distinct from administrative or physical safeguards, analogous to the separation of duties in internal control frameworks.",
                "BusinessInterpretation": "Healthcare technology companies must distinguish between technical, administrative, and physical safeguards when designing compliance programs to ensure all HIPAA Security Rule requirements are addressed appropriately.",
                "CaseID": "CBQ4-F3",
                "EstimatedMinutes": 6,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "F",
                "question_state": "Certified",
                "pack_state": "Draft",
                "pedagogical_cluster": "",
                "question_tier": "Ungraded",
                "question_status": "Active",
                "Difficulty": "Moderate",
                "DifficultyScore": 3
            }
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ4-B2",
        "Title": "Budgeted Balance Sheet and Financial Budget",
        "SectionTags": [
            "B"
        ],
        "Pack": 4,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Inventory budgeting",
            "Receivables budgeting",
            "Payables budgeting",
            "Cash budgeting",
            "Financial budget relationships"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Financial Budget",
        "Subtopic": "Financial budget preparation",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Ironworks Fabrication",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 30,
        "ExhibitCount": 2,
        "Industry": "Metal fabrication",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze inventory budgeting",
            "Analyze receivables budgeting",
            "Analyze payables budgeting",
            "Analyze cash budgeting",
            "Analyze financial budget relationships",
            "Analyze financial budget preparation"
        ],
        "ModifiedDate": "2026-07-20",
        "ProductionStatus": "Production",
        "QAReviewer": "Validator",
        "QuestionCount": 6,
        "Reviewer": "Accountant",
        "RevisionHistory": [
            {
                "Date": "2026-07-20",
                "Version": "1.0",
                "Author": "Case Author",
                "Summary": "Initial creation with metadata schema"
            }
        ],
        "Stakeholder": "Mark Sullivan (Controller)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Ironworks Fabrication has completed its Q1 operating budgets. Controller Mark Sullivan must project the March 31 balances for cash, accounts receivable, inventory, and accounts payable to complete the budgeted balance sheet. The CFO needs accurate projections to assess the company's liquidity position before the quarterly bank review.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Operating Budget Data (Q1)",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Budgeted Q1 sales (all on credit)",
                        "$1,000,000"
                    ],
                    [
                        "Budgeted Q1 cost of goods sold",
                        "$600,000"
                    ],
                    [
                        "Budgeted Q1 merchandise purchases",
                        "$650,000"
                    ],
                    [
                        "Q1 selling and administrative expenses (all cash)",
                        "$140,000"
                    ],
                    [
                        "Q1 equipment purchase (cash)",
                        "$100,000"
                    ],
                    [
                        "Q1 dividends declared and paid",
                        "$20,000"
                    ],
                    [
                        "Q1 interest expense (paid in cash)",
                        "$15,000"
                    ],
                    [
                        "Income tax rate (paid in quarter earned)",
                        "30%"
                    ]
                ],
                "ExhibitID": "CBQ4-B2-E1",
                "CaseID": "CBQ4-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 - Beginning Balances and Policies",
                "Headers": [
                    "Item",
                    "Amount or Detail"
                ],
                "Rows": [
                    [
                        "Cash (January 1)",
                        "$100,000"
                    ],
                    [
                        "Accounts receivable (December sales, all collected Q1)",
                        "$200,000"
                    ],
                    [
                        "Inventory (January 1)",
                        "$120,000"
                    ],
                    [
                        "Accounts payable (January 1, all paid Q1)",
                        "$100,000"
                    ],
                    [
                        "Credit sales collected in quarter of sale",
                        "70%"
                    ],
                    [
                        "Credit sales collected in following quarter",
                        "28%"
                    ],
                    [
                        "Uncollectible",
                        "2%"
                    ],
                    [
                        "Purchases paid in quarter of purchase",
                        "80%"
                    ],
                    [
                        "Purchases paid in following quarter",
                        "20%"
                    ]
                ],
                "ExhibitID": "CBQ4-B2-E2",
                "CaseID": "CBQ4-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Enter the ending inventory balance at March 31.",
                "Correct": "170000",
                "Explanation": "$120,000 beginning inventory + $650,000 purchases - $600,000 COGS = $170,000. The inventory balance is driven by the purchases budget and cost of goods sold. A common error is to confuse beginning and ending inventory in the formula.",
                "Topic": "Inventory budgeting",
                "ItemID": "CBQ4-B2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultipleConcepts"
                ],
                "BusinessInterpretation": "cost of goods sold. A common error is to confuse beginning and ending inventory in the formula.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Enter the ending accounts receivable balance at March 31 (gross, before allowance for doubtful accounts).",
                "Correct": "300000",
                "Explanation": "$1,000,000 x (28% + 2%) = $300,000. Gross A/R includes both the 28% expected to be collected in Q2 and the 2% estimated as uncollectible, because both amounts are still owed by customers. The allowance for doubtful accounts then reduces gross A/R to net realizable value of $280,000. A common error is to report the net A/R value instead of the gross amount.",
                "Topic": "Receivables budgeting",
                "ItemID": "CBQ4-B2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "BusinessInterpretation": "value of $280,000. A common error is to report the net A/R value instead of the gross amount.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Enter the ending accounts payable balance at March 31.",
                "Correct": "130000",
                "Explanation": "$650,000 x 20% = $130,000. Since 80% of Q1 purchases are paid in Q1, the remaining 20% become ending accounts payable. A common error is to forget that beginning AP was already paid in Q1 and should not be included in ending AP.",
                "Topic": "Payables budgeting",
                "ItemID": "CBQ4-B2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "BusinessInterpretation": "g accounts payable. A common error is to forget that beginning AP was already paid in Q1 and should not be included in e...",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "EstimatedMinutes": 5,
                "Pack": 4,
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
                "Type": "numeric",
                "Prompt": "Enter the ending cash balance at March 31.",
                "Correct": "31500",
                "Explanation": "Beginning $100,000 + Dec A/R collected $200,000 + Q1 sales collected ($1,000,000 x 70%) $700,000 - Beginning AP paid $100,000 - Q1 purchases paid ($650,000 x 80%) $520,000 - S&A $140,000 - Equipment $100,000 - Dividends $20,000 - Interest $15,000 - Income tax (($1,000,000 - $600,000 - $140,000 - $15,000) x 30% = $73,500) = $31,500. A common error is to omit depreciation (not present here) or to miscalculate taxable income.",
                "Topic": "Cash budgeting",
                "ItemID": "CBQ4-B2-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultipleConcepts"
                ],
                "CommonTrapReference": "Trap 5: Cash Budget",
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "BusinessInterpretation": "$73,500) = $31,500. A common error is to omit depreciation (not present here) or to miscalculate taxable income.",
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Budget",
                "Pack": 4,
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
                "Type": "select",
                "Prompt": "Which budgeted financial statement item is NOT directly affected by the sales collection assumption?",
                "Choices": [
                    "Ending cash balance",
                    "Ending accounts receivable balance",
                    "Ending inventory balance",
                    "Bad debt expense"
                ],
                "Correct": "Ending inventory balance",
                "Explanation": "Sales collection assumptions determine the timing of cash inflows (affecting cash balance), the amount of receivables outstanding (affecting A/R balance), and the estimated uncollectible amount (affecting bad debt expense). Inventory is determined by purchases and COGS, not by collection patterns.",
                "Topic": "Financial budget relationships",
                "ItemID": "CBQ4-B2-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology",
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "EstimatedMinutes": 4,
                "Pack": 4,
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
                "Type": "match",
                "Prompt": "Match each budgeted balance sheet line item to the primary budget or policy that determines it.",
                "LeftItems": [
                    "Cash",
                    "Accounts receivable",
                    "Inventory",
                    "Accounts payable"
                ],
                "RightItems": [
                    "Cash budget and collection/disbursement timing",
                    "Sales budget and credit collection policy",
                    "Cost of goods sold budget and purchases budget",
                    "Purchases budget and supplier payment terms",
                    "Production budget and labor efficiency"
                ],
                "Correct": {
                    "Cash": "Cash budget and collection/disbursement timing",
                    "Accounts receivable": "Sales budget and credit collection policy",
                    "Inventory": "Cost of goods sold budget and purchases budget",
                    "Accounts payable": "Purchases budget and supplier payment terms"
                },
                "Explanation": "Cash is determined by the cash budget, which incorporates all inflows and outflows. Accounts receivable depends on credit sales and collection timing. Inventory is a function of beginning balance, purchases, and COGS. Accounts payable depends on purchases and payment terms with suppliers. Production budget and labor efficiency affect manufacturing companies but are not the primary driver for any of these specific line items.",
                "Topic": "Financial budget preparation",
                "ItemID": "CBQ4-B2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology",
                    "MultipleConcepts"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ4-B2",
                "EstimatedMinutes": 6,
                "Pack": 4,
                "ProductionStatus": "Draft",
                "Section": "B",
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

if (typeof module === 'object' && module.exports) module.exports = ENHANCED_CASE_BASE4;

function cloneEnhancedCase4(c, packLabel, index) {
  return {
    ...c,
    CaseID: `${c.CaseID}-${packLabel}`,
    Title: `${c.Title} (${packLabel} simulation)`,
    ScenarioText: `${c.ScenarioText} This is Pack ${packLabel}, case ${index + 1}; use all exhibits before answering.`
  };
}

const ENHANCED_CASE_BANK4_A = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'A', i));
const ENHANCED_CASE_BANK4_B = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'B', i));
const ENHANCED_CASE_BANK4_C = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'C', i));
const ENHANCED_CASE_BANK4_D = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'D', i));
const ENHANCED_CASE_BANK4_E = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'E', i));
const ENHANCED_CASE_BANK4_F = ENHANCED_CASE_BASE4.map((c, i) => cloneEnhancedCase4(c, 'F', i));


// === MIGRATED STANDARD CASES (Session 60) ===
const MIGRATED_CASE_BASE_D = [
    {
        "CaseID": "CASE-D1",
        "Title": "Long-Term Debt and Lease Reporting",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Alderway Manufacturing issued bonds at a premium to finance new equipment and also leases a fleet of delivery trucks. The controller is finalizing year-end disclosures covering bond premium amortization, lease classification, and related balance sheet presentation under current U.S. GAAP.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Alderway issued bonds at a premium and uses the effective interest method. How should the premium be treated over the bond term?",
                "Choices": [
                    "Amortize the premium as a reduction of interest expense over the bond term",
                    "Recognize the entire premium as revenue at issuance",
                    "Ignore the premium since it does not affect cash flows",
                    "Add the premium to interest expense each period"
                ],
                "Correct": "Amortize the premium as a reduction of interest expense over the bond term",
                "Explanation": "Under ASC 470, when bonds are issued at a premium (issue price > face value), the premium is amortized as a reduction of interest expense over the bond term using the effective interest method. Each period, interest expense equals the carrying value times the market rate which is less than the cash interest paid. The difference reduces the premium and the carrying value converges to face value at maturity. The other options are incorrect: recognizing premium as revenue at issuance violates the matching principle; ignoring the premium misstates the liability; adding the premium to interest expense would double-count and inflate expense improperly.",
                "CognitiveLevel": "Understand",
                "Topic": "Long-Term Debt and Lease Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D1-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Alderway leases delivery trucks as lessee under a lease that does not transfer ownership or contain a bargain purchase option. How should this lease generally be reported on the balance sheet?",
                "Choices": [
                    "Recognize a right-of-use asset and a corresponding lease liability",
                    "Record no asset or liability since it is an operating lease",
                    "Record only a footnote disclosure with no balance sheet impact",
                    "Record the asset only, with no liability"
                ],
                "Correct": "Recognize a right-of-use asset and a corresponding lease liability",
                "Explanation": "Under ASC 842, lessees must recognize a right-of-use (ROU) asset and a corresponding lease liability on the balance sheet for both operating and finance leases. This eliminates the pre-ASC 842 practice of keeping operating leases off-balance-sheet. The liability represents the present value of future lease payments; the ROU asset represents the right to use the underlying asset. Recording no asset/liability was the old operating lease treatment (now incorrect). Footnote-only disclosure is insufficient for GAAP. Recording only the asset without the liability violates double-entry accounting and ASC 842 requirements.",
                "CognitiveLevel": "Understand",
                "Topic": "Long-Term Debt and Lease Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D1-Q2"
            },
            {
                "Type": "numeric",
                "Prompt": "Alderway issues a 1,000,000 face value bond at a price that includes a 40,000 premium. Using straight-line amortization over a 10-year term, how much premium is amortized in the first year?",
                "Correct": "4000",
                "Explanation": "Under ASC 470, bond premium reduces the effective borrowing cost. Annual amortization = Total premium / Bond term. Alderway issued bonds at a $40,000 premium over a 10-year term. Annual amortization = $40,000 / 10 = $4,000. This reduces interest expense each year, bringing the carrying value down to face value at maturity. The effective interest method is preferred under GAAP but straight-line is acceptable when results are not materially different. A common error is to add the amortization to interest expense (as with a discount) rather than subtract it (premium).",
                "CognitiveLevel": "Apply",
                "Topic": "Long-Term Debt and Lease Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D1-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select items that would typically be capitalized as part of the cost of a self-constructed asset.",
                "Choices": [
                    "Direct materials and labor used in construction",
                    "Interest incurred during the construction period",
                    "Routine repairs performed after the asset is placed in service",
                    "Overhead directly attributable to construction"
                ],
                "Correct": [
                    "Direct materials and labor used in construction",
                    "Interest incurred during the construction period",
                    "Overhead directly attributable to construction"
                ],
                "Explanation": "Under ASC 360 and ASC 835-20, the cost of a self-constructed asset includes all costs directly attributable to construction: (1) direct materials and labor used in construction; (2) overhead directly attributable to construction activities; and (3) interest costs incurred during the construction period (capitalized interest). Routine repairs and maintenance after the asset is placed in service are expensed as period costs, not capitalized. A candidate may incorrectly select routine repairs if they confuse capitalizable improvements with expensed maintenance. The interest capitalization period ends when the asset is substantially complete and ready for its intended use.",
                "CognitiveLevel": "Evaluate",
                "Topic": "Long-Term Debt and Lease Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D1-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A legal obligation to dismantle and remove a long-lived asset at the end of its life is recognized as an asset retirement ______.",
                "Correct": "obligation",
                "Explanation": "Under ASC 410-20, an Asset Retirement Obligation (ARO) is a legal obligation associated with the retirement of a tangible long-lived asset. The ARO is initially measured at the present value of estimated future dismantlement, restoration, or remediation costs. The offsetting debit is added to the carrying amount of the related long-lived asset (asset retirement cost) and depreciated over the asset useful life. The liability is accreted over time through accretion expense, increasing the ARO to the expected future settlement amount. This ensures the entity recognizes the retirement cost systematically over the asset life rather than as a lump sum at retirement.",
                "CognitiveLevel": "Understand",
                "Topic": "Long-Term Debt and Lease Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D1-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Draft",
        "DifficultyScore": 3,
        "Version": "1.0",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-24",
        "Author": "Migration Agent",
        "Confidence": 85,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D2",
        "Title": "Master Budget Preparation for a Manufacturer",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Bramblewood Furniture is preparing its annual master budget, starting with a sales forecast and flowing through production, direct labor, and cash collections, while evaluating whether its current incremental budgeting approach should change.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Which budget is typically prepared first in Bramblewood's master budget process because other budgets depend on it?",
                "Choices": [
                    "The sales budget",
                    "The direct labor budget",
                    "The capital expenditures budget",
                    "The selling and administrative expense budget"
                ],
                "Correct": "The sales budget",
                "Explanation": "The sales budget is the starting point of the master budget because virtually all other budgets depend on projected sales volume. The production budget then translates sales into required units, which drives materials, labor, and overhead budgets. Preparing the cash budget first is incorrect because cash flows depend on sales and production levels. The production budget follows, not precedes, the sales budget. The capital expenditure budget is prepared separately for long-term investments, not as the master budget starting point.",
                "CognitiveLevel": "Understand",
                "Topic": "Master Budget Preparation for a Manufacturer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D2-Q1"
            },
            {
                "Type": "numeric",
                "Prompt": "Bramblewood plans to produce 6,000 units, each requiring 1.5 direct labor hours at a rate of 20 per hour. What is the total budgeted direct labor cost?",
                "Correct": "180000",
                "Explanation": "The direct labor budget translates production requirements into labor hours and cost. Budgeted production: 6,000 units. Standard hours per unit: 1.5 DLH. Total budgeted hours: 6,000 x 1.5 = 9,000 DLH. Standard labor rate: $20 per DLH. Total direct labor cost = 9,000 DLH x $20 = $180,000. This cost flows into the cost of goods manufactured budget and ultimately the income statement. A common error is to multiply the 1.5 hours by the rate first ($30) and then forget to multiply by the 6,000 units.",
                "CognitiveLevel": "Apply",
                "Topic": "Master Budget Preparation for a Manufacturer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D2-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Bramblewood currently builds its budget by adjusting last year's actual results by an inflation factor. What is a key drawback of this incremental approach?",
                "Choices": [
                    "It can perpetuate prior inefficiencies without requiring cost justification",
                    "It requires zero-based justification for every account",
                    "It guarantees the most efficient resource allocation",
                    "It removes the need for a sales forecast"
                ],
                "Correct": "It can perpetuate prior inefficiencies without requiring cost justification",
                "Explanation": "Incremental budgeting adjusts the prior period budget by a percentage or absolute amount without re-examining whether each cost is necessary. This approach can perpetuate prior inefficiencies without requiring cost justification. In contrast, zero-based budgeting requires managers to justify every cost from scratch each period. Activity-based budgeting ties costs to activities and drivers. Kaizen budgeting incorporates continuous improvement targets. A candidate selecting incremental budgeting because it requires less management input is thinking of simplicity but missing the embedded-inefficiency risk.",
                "CognitiveLevel": "Analyze",
                "Topic": "Master Budget Preparation for a Manufacturer",
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
                "question_state": "Certified",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D2-Q3"
            },
            {
                "Type": "numeric",
                "Prompt": "Bramblewood historically collects 70% of credit sales in the month of sale and 30% in the following month. If March credit sales are 300,000 and February credit sales were 250,000, what are budgeted cash collections in March?",
                "Correct": "285000",
                "Explanation": "The cash collections schedule estimates when credit sales convert to cash. The company collects 70% in the month of sale and 30% in the following month. March collections: 70% of March sales collected in March ($300,000 x 0.70 = $210,000) plus 30% of February sales collected in March ($250,000 x 0.30 = $75,000). Total March collections = $210,000 + $75,000 = $285,000. This schedule is critical for the cash budget, which determines borrowing needs or excess cash for investment. A common error is to apply the 30% to March instead of February.",
                "CognitiveLevel": "Apply",
                "Topic": "Master Budget Preparation for a Manufacturer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D2-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A recurring pattern in sales data that repeats at regular intervals, such as every quarter, is called ______ in time series forecasting.",
                "Correct": "seasonality",
                "Explanation": "Seasonality is a predictable, recurring pattern in a time series that occurs at regular calendar intervals such as quarterly retail sales peaking in Q4 or ice cream sales rising in summer months. It must be accounted for in forecasting because failing to adjust for seasonal patterns leads to systematic forecast errors. Seasonality is distinguished from trend (long-term directional movement), cyclical variation (longer economic cycles), and irregular/random variation (unpredictable fluctuations). In CMA exam contexts, seasonality is often addressed through seasonal indices or same-period comparisons.",
                "CognitiveLevel": "Understand",
                "Topic": "Master Budget Preparation for a Manufacturer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D2-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Draft",
        "DifficultyScore": 3,
        "Version": "1.0",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-24",
        "Author": "Migration Agent",
        "Confidence": 85,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D3",
        "Title": "Variance Analysis and Responsibility Accounting",
        "SectionTags": [
            "C"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Castlebrook Electronics investigates significant labor and overhead variances from the current quarter and is redesigning its responsibility accounting structure to better align manager evaluation with actual control.",
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Castlebrook paid direct labor at 21 per hour instead of the 19.50 standard rate, using 3,000 actual hours. What is the labor rate variance?",
                "Correct": "4500",
                "Explanation": "The labor rate variance measures the difference between actual and standard labor rates for the hours actually worked. Formula: Actual hours x (Actual rate - Standard rate). Actual hours: 3,000. Actual rate: $21.00/DLH. Standard rate: $19.50/DLH. Labor rate variance = 3,000 x ($21.00 - $19.50) = 3,000 x $1.50 = $4,500 Unfavorable. The unfavorable result means the company paid $1.50 more per hour than the standard allows. This variance is generally the responsibility of the production supervisor or human resources.",
                "CognitiveLevel": "Apply",
                "Topic": "Variance Analysis and Responsibility Accounting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D3-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Castlebrook's division manager controls pricing and costs but has no authority over the level of assets invested in the division. What type of responsibility center is most appropriate for evaluation?",
                "Choices": [
                    "A profit center, evaluated on operating income",
                    "An investment center, evaluated on ROI",
                    "A cost center, evaluated only on cost variances",
                    "A revenue center, evaluated only on sales dollars"
                ],
                "Correct": "A profit center, evaluated on operating income",
                "Explanation": "In responsibility accounting, a profit center manager controls both revenues and costs but does NOT have authority over asset investment decisions. The appropriate performance measure is operating income (or segment margin). A cost center evaluates only costs (no revenue responsibility). An investment center evaluates return on assets because the manager controls revenues, costs, and asset investments. A revenue center evaluates only revenues. A candidate selecting investment center may be thinking that all senior managers control investments, but the question specifically limits the manager authority to revenue and costs only.",
                "CognitiveLevel": "Analyze",
                "Topic": "Variance Analysis and Responsibility Accounting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D3-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Castlebrook sells two products in a mix that differs from the budgeted mix, even though total unit sales matched budget. What variance captures this effect?",
                "Choices": [
                    "The sales mix variance",
                    "The sales price variance",
                    "The sales volume variance in total units",
                    "The direct materials price variance"
                ],
                "Correct": "The sales mix variance",
                "Explanation": "The sales mix variance measures the impact on contribution margin when the actual sales mix (proportion of each product sold) differs from the budgeted mix, while holding total unit volume constant. If higher-margin products represent a smaller share of actual sales than planned, the sales mix variance is unfavorable. This variance is distinct from the sales quantity/volume variance (total units effect) and the sales price variance (selling price effect). Together, mix and quantity variances explain the total sales volume variance.",
                "CognitiveLevel": "Understand",
                "Topic": "Variance Analysis and Responsibility Accounting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D3-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select factors management should consider before concluding a large favorable material price variance is purely positive.",
                "Choices": [
                    "Whether lower-quality materials were purchased to achieve the favorable price",
                    "Whether the favorable variance will cause offsetting unfavorable quantity variances later",
                    "Whether supplier relationships were harmed by aggressive price negotiation",
                    "Whether the variance should be ignored entirely since it is favorable"
                ],
                "Correct": [
                    "Whether lower-quality materials were purchased to achieve the favorable price",
                    "Whether the favorable variance will cause offsetting unfavorable quantity variances later",
                    "Whether supplier relationships were harmed by aggressive price negotiation"
                ],
                "Explanation": "A favorable price variance is NOT automatically good and requires investigation for hidden costs. All three correct choices represent genuine risks: lower-quality materials purchased could increase scrap, rework, or warranty costs; the favorable price variance may cause offsetting unfavorable quantity/efficiency variances; aggressive price negotiation may damage long-term supplier relationships. Simply congratulating the purchasing manager without investigation is incorrect as variance analysis must examine both favorable and unfavorable variances for root causes. A favorable variance in one area often creates unfavorable variances elsewhere in the system.",
                "CognitiveLevel": "Evaluate",
                "Topic": "Variance Analysis and Responsibility Accounting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D3-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: When performance measures motivate managers to act in ways that benefit both their division and the overall company, this is called ______.",
                "Correct": "goal congruence",
                "Explanation": "Goal congruence is the alignment of individual manager goals with overall organizational objectives. When performance measures are well-designed, a manager acting in their own best interest also serves the company best interest. For example, evaluating a division on ROI may cause managers to reject investments that exceed the company cost of capital but would lower their division ROI, creating a goal congruence problem. Alternative measures like residual income can reduce this conflict. Goal congruence is a central concern in responsibility accounting, transfer pricing, and balanced scorecard design.",
                "CognitiveLevel": "Understand",
                "Topic": "Variance Analysis and Responsibility Accounting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-D3-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Draft",
        "DifficultyScore": 3,
        "Version": "1.0",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-24",
        "Author": "Migration Agent",
        "Confidence": 85,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D4",
        "Title": "Activity-Based Costing and Service Allocation",
        "SectionTags": [
            "D"
        ],
        "BlueprintDomain": "Cost Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Deepwater Marine Supply implements activity-based costing for its production overhead and evaluates different service department cost allocation methods, while also analyzing its cost structure for break-even planning.",
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Deepwater's order processing activity pool has 210,000 of cost and 1,400 orders processed. Product line M generates 95 orders. What order processing cost is assigned to Product line M?",
                "Correct": "14250",
                "Explanation": "Under activity-based costing (ABC), overhead costs are assigned to products based on their consumption of activities rather than using a single volume-based allocation base. The activity rate is calculated by dividing the total activity pool cost by the total activity driver volume: $210,000 / 1,400 orders = $150 per order. The cost assigned to Product line M = activity rate x orders for Product M = $150 x 95 = $14,250. ABC provides more accurate product costing than traditional allocation because different products consume overhead activities at different rates, revealed through multiple cost drivers. A common error is to divide 1,400 by 95 instead of multiplying the rate by the order quantity, or to use the total pool cost ($210,000) as the assigned cost without computing the per-order rate.",
                "Topic": "Activity-Based Costing and Service Allocation",
                "CognitiveLevel": "Apply",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D4-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Deepwater allocates service department costs using simultaneous equations that fully recognize services provided between service departments in both directions. What method is this?",
                "Choices": [
                    "The reciprocal method",
                    "The direct method",
                    "The step-down method",
                    "The dual-rate method"
                ],
                "Correct": "The reciprocal method",
                "Explanation": "Under cost accounting standards for service department cost allocation, the reciprocal method allocates service department costs using simultaneous equations that fully recognize mutual services provided between service departments in both directions. This is the most theoretically accurate allocation approach because it captures all interdepartmental service flows. The direct method ignores all services between service departments entirely, allocating service costs only to production departments. The step-down method recognizes services flowing in one direction (from higher-ranked to lower-ranked departments) but not reciprocally. The dual-rate method separates costs into fixed and variable components for allocation purposes and is a different concept from the reciprocal allocation approach. The direct method is simplest, step-down is intermediate, and reciprocal is most accurate. A candidate may confuse the reciprocal method with the step-down method, which also considers interdepartmental services but only partially and in one direction.",
                "Topic": "Activity-Based Costing and Service Allocation",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D4-Q2"
            },
            {
                "Type": "numeric",
                "Prompt": "Deepwater sells a product for 60 per unit with variable costs of 35 per unit and fixed costs of 100,000. How many units must be sold to break even?",
                "Correct": "4000",
                "Explanation": "Under cost-volume-profit (CVP) analysis, the break-even point is the sales level at which total revenues equal total costs, resulting in zero operating income. Break-even in units = Fixed costs / Contribution margin per unit. Contribution margin per unit = Selling price - Variable cost per unit = $60 - $35 = $25. Break-even units = $100,000 / $25 = 4,000 units. At this volume, Deepwater's contribution margin exactly covers its fixed costs, with zero profit or loss. Each additional unit sold beyond 4,000 generates $25 of operating income. A common exam trap is to divide fixed costs by the selling price ($100,000 / $60 = 1,667 units) instead of using the contribution margin — this ignores variable costs entirely and produces a dangerously low break-even estimate. Another error is computing the contribution margin ratio instead of per-unit contribution margin, or dividing by contribution margin ratio applied to dollar sales rather than unit sales.",
                "Topic": "Activity-Based Costing and Service Allocation",
                "CognitiveLevel": "Apply",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D4-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics of the step-down method of service department cost allocation.",
                "Choices": [
                    "It allocates costs sequentially based on a ranking of service departments",
                    "It recognizes some but not all reciprocal services between service departments",
                    "It ignores all services provided between service departments entirely",
                    "It allocates costs of all service departments simultaneously using equations"
                ],
                "Correct": [
                    "It allocates costs sequentially based on a ranking of service departments",
                    "It recognizes some but not all reciprocal services between service departments"
                ],
                "Explanation": "Under cost accounting standards for service department cost allocation, the step-down (sequential) method allocates service department costs in a predetermined sequence based on a ranking of service departments, typically by the magnitude of services provided to other service departments. Two characteristics are correct: 'It allocates costs sequentially based on a ranking of service departments' — this is the defining operational feature of the step-down method, requiring departments to be ordered before allocation begins. 'It recognizes some but not all reciprocal services between service departments' — the step-down method acknowledges interdepartmental services flowing forward in the ranking sequence but not in reverse, making it a compromise between the direct method (which ignores all interdepartmental services) and the reciprocal method (which fully recognizes all mutual services using simultaneous equations). 'It ignores all services between service departments entirely' describes the direct method, not step-down. 'It allocates costs of all service departments simultaneously using equations' describes the reciprocal method. The step-down method balances computational simplicity with improved accuracy over the direct method.",
                "Topic": "Activity-Based Costing and Service Allocation",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D4-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A cost containing both a fixed base amount and a variable usage-based amount is called a ______ cost.",
                "Correct": "mixed",
                "Explanation": "Under cost behavior classification in managerial accounting, a mixed cost (also called a semivariable cost) contains both a fixed component and a variable component. The fixed base amount is incurred regardless of activity level (e.g., a monthly equipment lease with a flat fee), while the variable usage-based portion fluctuates with the level of activity (e.g., a per-hour operating charge). A common example is a utility bill with a fixed monthly service charge plus a variable charge per kilowatt-hour consumed. Understanding mixed costs is essential for accurate cost estimation, budgeting, and CVP analysis — they must be separated into their fixed and variable components using methods such as the high-low method or regression analysis before break-even calculations can be performed. A common error is to classify a mixed cost as purely variable (understating total costs at low volumes) or purely fixed (ignoring volume sensitivity).",
                "Topic": "Activity-Based Costing and Service Allocation",
                "CognitiveLevel": "Remember",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D4-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S524 Wave 2 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (ASC, CVP framework, ABC standards). Added CognitiveLevel metadata (Apply/Understand/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D5",
        "Title": "IT General Controls and Risk Governance",
        "SectionTags": [
            "E"
        ],
        "BlueprintDomain": "Internal Controls",
        "EstimatedMinutes": 25,
        "ScenarioText": "Elmsworth Financial Group is strengthening its IT general controls around system access and change management while also formalizing its enterprise risk management response strategies for identified operational risks.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Elmsworth grants employees system access limited only to what is necessary for their specific job duties. What security principle is this?",
                "Choices": [
                    "The principle of least privilege",
                    "The principle of maximum access for efficiency",
                    "Management override",
                    "Risk transfer"
                ],
                "Correct": "The principle of least privilege",
                "Explanation": "Under the COSO Internal Control Framework and IT general controls, the principle of least privilege is a fundamental access control concept that limits each user's system access rights to only the minimum necessary to perform their assigned job duties. This preventive control reduces the risk of unauthorized access, data breaches, and both intentional and accidental misuse of systems. The principle of maximum access for efficiency is the opposite of sound security practice and would increase control risk rather than mitigate it. Management override refers to management's ability to bypass established controls — this is a risk to be mitigated through compensating controls, not a control principle itself. Risk transfer involves shifting financial consequences of a risk to a third party (such as through insurance) and is an ERM response strategy, not an access control principle. Least privilege is essential for maintaining effective segregation of duties in automated systems and is a foundational element of the COSO control activities component. A common exam trap is confusing access control principles with risk response strategies — least privilege is a preventive control, not an ERM response.",
                "Topic": "IT General Controls and Risk Governance",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D5-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Elmsworth requires all software changes to be tested, approved, and documented before moving into the production environment. What type of control is this?",
                "Choices": [
                    "An IT general control over change management",
                    "An application control embedded in a specific transaction",
                    "A physical control over hardware only",
                    "A segregation of duties control unrelated to IT"
                ],
                "Correct": "An IT general control over change management",
                "Explanation": "Under COSO Internal Control — Integrated Framework and IT governance standards, change management controls that require testing, approval, and documentation before changes go live are classified as IT general controls (ITGCs). ITGCs apply broadly across the entire IT environment rather than to specific transactions or applications. Application controls are embedded within specific business processes or transactions (such as input validation checks, limit checks, or three-way matching) and operate at the transaction level, not at the system-wide change management level. Physical controls protect tangible assets like hardware and facilities — change management is a logical and procedural control, not a physical one. While segregation of duties intersects with change management (ensuring no single person develops, tests, and implements changes without oversight), the control described is fundamentally a change management ITGC. A common exam pitfall is confusing IT general controls (enterprise-wide, supporting the overall IT environment) with application controls (transaction-specific, embedded in individual business processes).",
                "Topic": "IT General Controls and Risk Governance",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D5-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Elmsworth decides to purchase insurance to address a significant identified risk rather than eliminate the underlying activity. What ERM response is this?",
                "Choices": [
                    "Risk transfer (sharing)",
                    "Risk avoidance",
                    "Risk acceptance",
                    "Risk appetite"
                ],
                "Correct": "Risk transfer (sharing)",
                "Explanation": "Under the COSO Enterprise Risk Management — Integrating with Strategy and Performance framework, risk transfer (also called risk sharing) involves shifting some or all of the financial consequences of a risk to a third party. Purchasing insurance is the prototypical example — Elmsworth pays a premium to transfer the financial impact of a potential loss to an insurer while continuing the underlying activity. Risk avoidance eliminates the activity giving rise to the risk entirely (e.g., discontinuing a product line or exiting a market). Risk acceptance involves acknowledging the risk and bearing the consequences without specific mitigating action — appropriate when the cost of mitigation exceeds the potential loss or when the risk falls within the organization's risk appetite. Risk appetite is the amount and type of risk an organization is willing to accept in pursuit of its objectives — it is a governance parameter that sets boundaries for response decisions, not a response strategy itself. Understanding the four ERM response categories (avoid, reduce, share/transfer, accept) is essential for management accountants advising on risk governance. A candidate may confuse risk transfer with risk avoidance — insurance transfers the financial impact but does not eliminate the underlying activity or exposure.",
                "Topic": "IT General Controls and Risk Governance",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D5-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select elements that make up the three lines of defense model.",
                "Choices": [
                    "Operational management",
                    "Risk and compliance oversight functions",
                    "Internal audit",
                    "External investors"
                ],
                "Correct": [
                    "Operational management",
                    "Risk and compliance oversight functions",
                    "Internal audit"
                ],
                "Explanation": "Under the Institute of Internal Auditors (IIA) Three Lines of Defense Model, an organization's internal control and risk management structure is organized into three distinct but coordinated layers. The first line is operational management, which owns and manages risks through day-to-day controls and procedures embedded in business operations — these managers are directly responsible for identifying and managing the risks in their areas. The second line consists of risk management and compliance oversight functions that establish policies, monitor risk exposures, and provide guidance independently of operational management but still within management's structure. The third line is internal audit, which provides independent, objective assurance on the effectiveness of governance, risk management, and internal controls through systematic, disciplined evaluations. External investors are not part of the internal Three Lines of Defense model — they are external stakeholders who rely on the effectiveness of the organization's governance structure but are not organized as a control assurance function. The model helps organizations clarify roles, avoid overlaps, and identify gaps in control responsibilities. A common exam trap is confusing external audit (independent but not part of the model) with internal audit (the third line).",
                "Topic": "IT General Controls and Risk Governance",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D5-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: An independent party checking the accuracy of work performed by someone else, such as recounting inventory, is called ______ verification.",
                "Correct": "independent",
                "Explanation": "Under COSO's control activities component, independent verification involves a person who is independent of the original transaction preparer checking the accuracy and completeness of work performed by others. In the inventory context, this means having an employee who does not have custody of the inventory perform counts and reconcile them to the perpetual records, ensuring the work of the inventory custodian is verified. This control activity supports the segregation of duties principle by ensuring that authorization, custody, recordkeeping, and verification are separated among different individuals. Independent verification can be performed on a periodic or surprise basis and is considered primarily a detective control, though it also serves a preventive function by deterring errors and irregularities through the knowledge that work will be checked. A common example beyond inventory is a supervisor reviewing a bank reconciliation prepared by a staff accountant. Understanding independent verification is essential for designing effective internal controls and for CMA exam questions on the COSO control activities component.",
                "Topic": "IT General Controls and Risk Governance",
                "CognitiveLevel": "Remember",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D5-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S524 Wave 2 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with COSO, IIA, and NIST authoritative citations. Added CognitiveLevel metadata (Understand/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D6",
        "Title": "Data Governance and Automation Oversight",
        "SectionTags": [
            "F"
        ],
        "BlueprintDomain": "Technology and Analytics",
        "EstimatedMinutes": 25,
        "ScenarioText": "Fernhollow Retail Group is expanding its use of robotic process automation for finance tasks while establishing stronger data governance and cybersecurity risk assessment practices.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Fernhollow establishes a center of excellence to govern, monitor, and audit the software bots deployed across its finance department. What risk is this primarily designed to address?",
                "Choices": [
                    "The risk of unmonitored or poorly controlled automation introducing errors or control gaps",
                    "The risk of insufficient office space for employees",
                    "The risk of foreign currency translation errors",
                    "The risk of missing a sales forecast target"
                ],
                "Correct": "The risk of unmonitored or poorly controlled automation introducing errors or control gaps",
                "Explanation": "Under information systems governance and IT control frameworks, robotic process automation (RPA) involves software bots executing repetitive, rule-based tasks previously performed by humans. Establishing a center of excellence (CoE) for automation governance is a critical IT control that addresses the specific risk of unmonitored or poorly controlled automation introducing errors, control gaps, or compliance violations. Without proper governance, bots may execute incorrectly without detection, bypass established approval workflows, operate with outdated business rules, or create audit trail deficiencies. A CoE provides standardized development, testing, monitoring, version control, and auditing of bots — ensuring that automation enhances rather than weakens the control environment. Insufficient office space is a facilities management concern unrelated to automation governance. Foreign currency translation is a financial reporting issue under ASC 830, not an automation risk. Missing a sales forecast is a planning and performance variance matter, not an automation-specific control concern. Management accountants must understand both the efficiency benefits and the governance requirements of automation technologies, as uncontrolled RPA can undermine internal controls and create significant operational and compliance risks.",
                "Topic": "Data Governance and Automation Oversight",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D6-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Fernhollow conducts a formal assessment to identify, categorize, and prioritize its cybersecurity risks using a recognized framework. What is a commonly referenced framework for this purpose?",
                "Choices": [
                    "The NIST Cybersecurity Framework",
                    "The COSO ERM cube exclusively",
                    "The balanced scorecard",
                    "The DuPont model"
                ],
                "Correct": "The NIST Cybersecurity Framework",
                "Explanation": "Under information security and cybersecurity governance standards, the NIST (National Institute of Standards and Technology) Cybersecurity Framework is the most commonly referenced framework for identifying, assessing, managing, and communicating cybersecurity risk. It consists of five core functions — Identify, Protect, Detect, Respond, and Recover — providing a systematic approach applicable across organizations of all sizes and sectors. The COSO ERM cube is a broader enterprise risk management framework addressing all categories of risk (strategic, operational, reporting, compliance), not exclusively cybersecurity — while it can encompass cybersecurity risk assessment, it is not primarily designed for that purpose. The balanced scorecard is a strategic performance management tool that translates strategy into measures across four perspectives (financial, customer, internal process, learning and growth). The DuPont model is a financial analysis framework that decomposes return on equity into profit margin, asset turnover, and financial leverage components. Understanding which framework applies to which domain is essential for management accountants — NIST is the specialized cybersecurity framework, while COSO addresses enterprise-wide internal control and risk management.",
                "Topic": "Data Governance and Automation Oversight",
                "CognitiveLevel": "Remember",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D6-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Fernhollow subscribes to a cloud-based accounting application that the vendor hosts, maintains, and updates. What cloud service model is this?",
                "Choices": [
                    "Software as a Service (SaaS)",
                    "Infrastructure as a Service (IaaS)",
                    "Platform as a Service (PaaS)",
                    "On-premises licensed software"
                ],
                "Correct": "Software as a Service (SaaS)",
                "Explanation": "Under information systems and cloud computing governance, cloud services are categorized into three primary service models. Software as a Service (SaaS) delivers a complete, vendor-hosted and maintained application to customers via the internet, typically on a subscription basis. The vendor manages all infrastructure, platform, middleware, and application software — the customer only configures and uses the application through a web browser. Examples include cloud-based accounting systems, CRM platforms, and office productivity suites. Infrastructure as a Service (IaaS) provides virtualized computing resources (servers, storage, networking) that customers manage and configure themselves — the customer has more control but also more responsibility. Platform as a Service (PaaS) provides a development and deployment environment (operating system, programming language execution environment, database) without managing the underlying infrastructure. On-premises licensed software is installed and maintained on the organization's own hardware, with the organization responsible for all maintenance and updates — the opposite of a vendor-managed cloud model. Management accountants must understand these service models to evaluate total cost of ownership, data security and privacy considerations, and internal control implications when organizations adopt cloud-based financial systems.",
                "Topic": "Data Governance and Automation Oversight",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D6-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics that describe unstructured data.",
                "Choices": [
                    "Does not fit neatly into predefined rows and columns",
                    "Includes formats like emails, videos, and social media posts",
                    "Is identical in format to traditional relational database tables",
                    "Requires different analytical techniques than structured data"
                ],
                "Correct": [
                    "Does not fit neatly into predefined rows and columns",
                    "Includes formats like emails, videos, and social media posts",
                    "Requires different analytical techniques than structured data"
                ],
                "Explanation": "Under data governance and analytics standards, unstructured data is information that does not have a predefined data model or is not organized in a predefined manner. Three characteristics are correct: 'Does not fit neatly into predefined rows and columns' — unlike structured data in relational databases, unstructured data lacks a consistent schema and cannot be easily stored in traditional row-and-column tables. 'Includes formats like emails, videos, and social media posts' — these are classic examples of unstructured data that organizations increasingly analyze for business insights using specialized tools. 'Requires different analytical techniques than structured data' — tools such as natural language processing, image recognition, text mining, and machine learning are needed to extract meaning from unstructured sources, rather than traditional SQL queries. 'Is identical in format to traditional relational database tables' is incorrect — this describes structured data, the opposite of unstructured data. Organizations also encounter semi-structured data (such as XML or JSON files) that has some organizational properties but does not conform to rigid relational database schemas. Understanding data types and their analytical requirements is essential for management accountants as data analytics capabilities become increasingly integrated into the finance function.",
                "Topic": "Data Governance and Automation Oversight",
                "CognitiveLevel": "Understand",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D6-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A single, authoritative, and consistent source of core business data such as customers or products, shared across systems, is called ______ data management.",
                "Correct": "master",
                "Explanation": "Under data governance standards, master data management (MDM) establishes a single, authoritative, and consistent source of core business data — such as customers, products, suppliers, and chart of accounts — shared across multiple systems and applications. MDM ensures data consistency, reduces duplication, and improves data quality by designating one system or process as the authoritative source (the 'golden record'). When a customer's address changes, it should be updated in the master data source and propagated to all consuming systems rather than being updated independently in each system, which would create inconsistencies. Master data is distinct from transactional data (individual business events like sales orders and invoices) and reference data (standardized code tables like country codes, currency codes, and industry classifications). Effective MDM is a critical component of data governance that supports reliable financial reporting, consistent analytics, and operational efficiency across the enterprise. A common confusion is distinguishing master data management from database management — MDM focuses on data consistency and authoritative sourcing across the enterprise, while database management focuses on the technical storage and retrieval of data.",
                "Topic": "Data Governance and Automation Oversight",
                "CognitiveLevel": "Remember",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "ProductionStatus": "Production",
                "ItemID": "CASE-D6-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S524 Wave 2 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with IT governance, NIST, cloud computing, and data governance authoritative citations. Added CognitiveLevel metadata (Understand/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D7",
        "Title": "Revenue, Investments, and Fair Value Reporting",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Granville Instruments holds a mix of debt and equity investments and recently entered a contract with variable consideration due to a right of return, requiring careful application of classification and revenue recognition rules.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Granville purchases equity securities it intends to actively trade for short-term profit. How should changes in fair value be recognized?",
                "Choices": [
                    "Recognize unrealized gains and losses in net income each period",
                    "Recognize unrealized gains and losses in other comprehensive income",
                    "Defer all gains and losses until the securities are sold",
                    "Record the securities at historical cost with no remeasurement"
                ],
                "Correct": "Recognize unrealized gains and losses in net income each period",
                "Explanation": "Under ASC 321, equity securities with readily determinable fair values are classified into trading, available-for-sale, or held-to-maturity categories based on management's intent. Trading securities — those bought and held principally for sale in the near term to generate income from short-term price fluctuations — are measured at fair value on each reporting date with unrealized holding gains and losses recognized in net income (earnings) for the period. This is distinct from available-for-sale debt securities, where unrealized gains and losses are recorded in other comprehensive income until realized. Deferring all gains and losses until sale applies only to held-to-maturity debt securities and is incorrect for actively traded equity positions. Recording at historical cost with no remeasurement is incorrect for all equity securities with readily determinable fair values, which must be measured at fair value under GAAP. A common exam trap is confusing the trading securities treatment (unrealized G/L in net income) with the AFS debt treatment (unrealized G/L in OCI) — the distinction turns on management's intent for the security.",
                "Topic": "Revenue, Investments, and Fair Value Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D7-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Granville sells products with a right of return and estimates some sales will be returned. How should this affect revenue recognition?",
                "Choices": [
                    "Recognize revenue net of an estimated returns allowance",
                    "Recognize the full sales amount with no adjustment",
                    "Defer all revenue until the return period expires",
                    "Recognize revenue only for units definitely not returned"
                ],
                "Correct": "Recognize revenue net of an estimated returns allowance",
                "Explanation": "Under ASC 606, Revenue from Contracts with Customers, when a contract includes a right of return, the transaction price must be adjusted for variable consideration. The seller estimates the amount of expected returns using either the expected value method or the most likely amount method and recognizes revenue net of this returns allowance, along with a corresponding refund liability on the balance sheet. An asset for the right to recover returned goods is also recognized at the former carrying amount less recovery costs. Recognizing full revenue with no adjustment ignores the contractual right of return and overstates revenue in the period of sale. Deferring all revenue until the return period expires is overly conservative and violates the core revenue recognition principle — ASC 606 specifically requires estimation, not deferral. Recognizing revenue only for units definitely not returned treats transactions with return rights as if they are unrecognizable, when ASC 606 provides a clear framework for estimation. A common exam trap is treating returns as a separate contra-revenue account without establishing the corresponding refund liability and return asset, which is required under the new standard for a complete recognition picture.",
                "Topic": "Revenue, Investments, and Fair Value Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D7-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Granville has an unrealized gain on an available-for-sale debt security at year-end. Where should this gain be reported?",
                "Choices": [
                    "In other comprehensive income, not in net income",
                    "In net income immediately",
                    "As a direct increase to retained earnings with no income statement effect",
                    "As deferred revenue on the balance sheet"
                ],
                "Correct": "In other comprehensive income, not in net income",
                "Explanation": "Under ASC 320, Investments — Debt Securities, available-for-sale (AFS) debt securities are measured at fair value on the balance sheet, with unrealized holding gains and losses excluded from net income and reported in other comprehensive income (OCI) until realized through sale or impaired by credit losses. This treatment reflects that AFS securities may be sold before maturity, so fair value is relevant on the balance sheet, but management has not committed to trading them, so volatility is excluded from net income. In contrast, trading securities report unrealized G/L directly in net income. A direct increase to retained earnings bypasses both net income and OCI, which is not permitted under GAAP — all changes in net assets from non-owner sources must flow through either the income statement or OCI. Deferred revenue applies to unearned customer payments, not to investment gains. The distinction between trading (net income) and AFS (OCI) treatment for unrealized gains is one of the most tested concepts on the CMA Part 1 exam. A common exam trap is selecting 'net income' for AFS securities because fair value accounting seems to imply income statement recognition — but GAAP specifically isolates AFS unrealized G/L in OCI to avoid earnings volatility from securities not intended for active trading.",
                "Topic": "Revenue, Investments, and Fair Value Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D7-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select events that would qualify as a recognized (Type I) subsequent event requiring adjustment to the financial statements.",
                "Choices": [
                    "Evidence of a condition, such as customer bankruptcy, that existed at the balance sheet date",
                    "Settlement of a lawsuit for an amount different from what was accrued, based on conditions existing at year-end",
                    "A major casualty loss, such as a fire, occurring after year-end with no prior related condition",
                    "A stock split declared and effective after year-end"
                ],
                "Correct": [
                    "Evidence of a condition, such as customer bankruptcy, that existed at the balance sheet date",
                    "Settlement of a lawsuit for an amount different from what was accrued, based on conditions existing at year-end"
                ],
                "Explanation": "Under ASC 855, Subsequent Events, recognized (Type I) subsequent events provide additional evidence about conditions that existed at the balance sheet date and require adjustment to the financial statements. Evidence of customer bankruptcy showing the customer was financially troubled before year-end requires an adjustment to the allowance for doubtful accounts — the condition (financial distress) existed at the balance sheet date. Settlement of a lawsuit for an amount different from the accrual, when the underlying events occurred before year-end, requires adjusting the accrual to the settlement amount — again, the condition pre-existed. In contrast, a major casualty loss such as a fire occurring after year-end with no prior related condition is a nonrecognized (Type II) event requiring footnote disclosure only — the loss relates to conditions arising after the balance sheet date. A stock split declared and effective after year-end is also a Type II event requiring disclosure only, though it affects per-share amounts presented in subsequent periods. The key distinction tested on the CMA exam is whether the event provides evidence about conditions existing at the balance sheet date (adjust financial statements = Type I) or conditions that arose after the balance sheet date (disclose only = Type II). A common exam trap is classifying all material post-balance-sheet events as requiring adjustment — only those confirming pre-existing conditions qualify.",
                "Topic": "Revenue, Investments, and Fair Value Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Analyze",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D7-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: An investment representing 20% to 50% ownership with significant influence is generally accounted for using the ______ method.",
                "Correct": "equity",
                "Explanation": "Under ASC 323, Investments — Equity Method and Joint Ventures, an investor that owns 20% to 50% of an investee's voting stock is presumed to have significant influence over the investee, requiring use of the equity method. Under this method, the investment is initially recorded at cost and subsequently adjusted upward for the investor's share of the investee's earnings and downward for dividends received (which are treated as a return of investment, not income). This contrasts with the fair value method for investments below 20% ownership without significant influence, the cost method for equity investments without readily determinable fair values, and consolidation for controlling interests above 50% ownership. The 20-50% ownership range is the classic exam indicator for the equity method — candidates should recognize that 'significant influence' is the conceptual trigger, with the 20-50% range serving as a rebuttable presumption that can be overcome by evidence to the contrary. A common error on the CMA exam is applying the fair value method to a 25% investment because 'we do not control it' — significant influence, not control, is the criterion for the equity method. The distinction between fair value, equity method, and consolidation is fundamental to investment accounting under U.S. GAAP.",
                "Topic": "Revenue, Investments, and Fair Value Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D7-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S525 Wave 3 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (ASC 321, ASC 606, ASC 320, ASC 855, ASC 323). Added CognitiveLevel metadata (Understand/Analyze/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D8",
        "Title": "Forecasting Techniques for a Growing Retailer",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Hawkridge Home Goods is refining its sales forecasting process using time series analysis and evaluating a shift toward activity-based budgeting to better align resources with actual cost drivers.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Hawkridge builds its budget by first identifying activities and their cost drivers, then budgeting resources based on expected activity levels. What budgeting approach is this?",
                "Choices": [
                    "Activity-based budgeting",
                    "Incremental budgeting",
                    "Zero-based budgeting",
                    "Kaizen budgeting"
                ],
                "Correct": "Activity-based budgeting",
                "Explanation": "Under the IMA CMA Content Specification Outline for Planning, Budgeting, and Forecasting (Section B), activity-based budgeting (ABB) is a budgeting approach that starts by identifying activities and their cost drivers, then budgets resources based on expected activity volumes. Unlike incremental budgeting, which adjusts prior-period budgets by a percentage or increment without challenging the underlying activities, ABB requires identifying the activities that drive costs and allocating resources according to expected activity demand. Zero-based budgeting requires justifying every expense from scratch each period regardless of prior budgets — this is resource-justification, not activity-driven cost estimation. Kaizen budgeting embeds continuous improvement targets into the budget, expecting ongoing cost reductions period-over-period. ABB is particularly valuable when an organization wants to understand the causal relationship between activities, resource consumption, and output, enabling better cost management and operational efficiency decisions. A common exam trap is confusing ABB with zero-based budgeting — ABB focuses on activity drivers as the basis for resource allocation, while ZBB focuses on justifying all expenditures from a zero base without reference to prior periods.",
                "Topic": "Forecasting Techniques for a Growing Retailer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D8-Q1"
            },
            {
                "Type": "numeric",
                "Prompt": "Hawkridge needs 18,000 units of a component for production, wants ending inventory of 3,000 units, and has beginning inventory of 2,500 units. How many units should be purchased?",
                "Correct": "18500",
                "Explanation": "Under the direct materials purchases budget within the master budget framework, the formula for units to purchase is: Required purchases = Budgeted production usage + Desired ending inventory − Beginning inventory. Substituting: 18,000 + 3,000 − 2,500 = 18,500 units to be purchased. This formula ensures that enough materials are acquired to meet production needs while maintaining the target ending inventory level, accounting for what is already on hand. The desired ending inventory of 3,000 units serves as a buffer against supply disruptions or unexpected demand spikes, while beginning inventory of 2,500 units represents materials already available in the warehouse. A common error is to add beginning inventory instead of subtracting it (18,000 + 3,000 + 2,500 = 23,500), which double-counts materials already in stock and leads to over-purchasing. Another error is to calculate only the production requirement of 18,000 without considering the inventory change, which would result in insufficient materials to maintain the desired ending balance. This calculation is part of the budget sequence: sales budget → production budget → direct materials budget → direct labor budget → overhead budget, with each step feeding the next.",
                "Topic": "Forecasting Techniques for a Growing Retailer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CognitiveLevel": "Apply",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D8-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Hawkridge evaluates its sales forecasting model by comparing forecasted values to actual results using a forecast error measure. What is the purpose of this evaluation?",
                "Choices": [
                    "To assess the accuracy and reliability of the forecasting method used",
                    "To determine the exact cause of a specific cost variance",
                    "To calculate the company's residual income",
                    "To set the transfer price between two divisions"
                ],
                "Correct": "To assess the accuracy and reliability of the forecasting method used",
                "Explanation": "Under forecasting standards in the IMA CMA Part 1 Section B syllabus, evaluating forecast error serves a specific purpose: to assess the accuracy and reliability of the forecasting method used. Forecast error measures — such as mean absolute deviation (MAD), mean squared error (MSE), and mean absolute percentage error (MAPE) — quantify how closely forecasted values match actual historical results, enabling management to compare alternative forecasting models and select the most reliable one. Determining the exact cause of a specific cost variance is the purpose of variance analysis (Section C), not forecast error measurement — forecast evaluation operates at the aggregate model level, not the individual variance level. Calculating residual income (operating income minus a required return on assets) is a performance measurement tool under Section C, unrelated to forecasting. Setting transfer prices between divisions addresses internal pricing for goods and services transferred between responsibility centers, also a Section C concept. Understanding which analytical tool serves which purpose is essential for CMA candidates — forecast error measures evaluate forecasting models, variance analysis investigates specific cost deviations, and performance measures evaluate outcomes relative to benchmarks. A common exam trap is confusing the evaluation of a forecast (accuracy measurement) with the evaluation of actual performance against a budget (variance analysis).",
                "Topic": "Forecasting Techniques for a Growing Retailer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D8-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics that distinguish a capital expenditure budget from an operating budget.",
                "Choices": [
                    "It plans and controls long-term investments in fixed assets",
                    "It typically spans a horizon longer than a single operating year",
                    "It focuses on planned revenue and expense for the year",
                    "It is unrelated to any long-term asset planning"
                ],
                "Correct": [
                    "It plans and controls long-term investments in fixed assets",
                    "It typically spans a horizon longer than a single operating year"
                ],
                "Explanation": "Under the master budget framework in the IMA CMA Part 1 Section B syllabus, a capital expenditure budget is distinct from an operating budget in several key dimensions. Two correct characteristics: 'It plans and controls long-term investments in fixed assets' — this is the core purpose of a capital expenditure budget, encompassing acquisitions of property, plant, equipment, and major technology investments that generate returns over extended periods. 'It typically spans a horizon longer than a single operating year' — capital expenditure budgets cover multi-year planning periods because fixed asset investments have long useful lives and require extended planning, financing, and implementation timelines that extend beyond the annual operating cycle. 'It focuses on planned revenue and expense for the year' is incorrect — this describes the operating budget, not the capital expenditure budget. 'It is unrelated to any long-term asset planning' is the direct opposite of the capital expenditure budget's fundamental function. The capital expenditure budget and operating budget are complementary — capital investments approved in the capex budget generate depreciation expense, maintenance costs, and productive capacity that flow into future operating budgets. A common exam trap is confusing the capital expenditure budget with the cash budget — the capex budget identifies investments needed, while the cash budget determines whether sufficient cash is available to fund them.",
                "Topic": "Forecasting Techniques for a Growing Retailer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D8-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Calculating a three-month average of sales to smooth out short-term fluctuations before forecasting is called a moving ______.",
                "Correct": "average",
                "Explanation": "Under time series forecasting methods in the Section B syllabus, a moving average is a technique that calculates the arithmetic mean of a specified number of consecutive prior-period observations to smooth out short-term random fluctuations and reveal the underlying trend in a data series. For example, a three-month moving average for April would average January, February, and March actuals. As each new period's actual data becomes available, the oldest observation is dropped and the newest is added — hence the term 'moving.' Moving averages are simple to compute and effective at dampening random noise, but they lag behind actual trends and weight all periods equally regardless of recency. Other time series components include trend (long-term directional movement), seasonal variation (regular patterns within a year), cyclical variation (multi-year economic cycles), and irregular or random variation (unpredictable residuals). Exponential smoothing is an alternative technique that applies declining weights to older observations and is more responsive to recent data. A common CMA exam error is confusing a moving average with a weighted moving average or exponential smoothing — the unweighted moving average treats all periods in the window identically, while other methods assign different weights. Understanding which smoothing technique applies to which data pattern is essential for accurate forecasting.",
                "Topic": "Forecasting Techniques for a Growing Retailer",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D8-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S525 Wave 3 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (ABB standards, direct materials budget formula, forecast error measurement, capital budgeting framework, time series methods). Added CognitiveLevel metadata (Understand/Apply/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D9",
        "Title": "Total Quality Management and Segment Reporting",
        "SectionTags": [
            "C"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Inglewood Precision Tools adopts a total quality management philosophy across all departments and is also revising its segmented income statement to better reflect divisional profitability before common cost allocations.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Inglewood adopts a company-wide philosophy emphasizing continuous improvement and customer satisfaction as the responsibility of every employee. What management approach is this?",
                "Choices": [
                    "Total quality management (TQM)",
                    "Zero-based budgeting",
                    "Standard costing",
                    "Activity-based costing"
                ],
                "Correct": "Total quality management (TQM)",
                "Explanation": "Under the IMA CMA Part 1 Performance Management syllabus (Section C), Total Quality Management (TQM) is a company-wide management philosophy that emphasizes continuous improvement (kaizen), defect prevention rather than detection, customer satisfaction as the ultimate measure of quality, and the involvement of every employee in quality improvement efforts. TQM represents a fundamental shift from traditional quality control — which inspects for defects at the end of production — to quality assurance, which builds quality into processes from the start. Key TQM principles include customer focus, continuous improvement, employee empowerment, fact-based decision making using statistical process control, and supplier partnerships. Zero-based budgeting is a budgetary approach requiring justification of all expenses from zero — a Section B topic unrelated to quality management philosophies. Standard costing establishes predetermined costs for products, while activity-based costing assigns overhead based on cost drivers identified through activity analysis — both are Section D cost management concepts, not quality philosophies. A common CMA exam trap is confusing TQM with lean manufacturing or Six Sigma — TQM is the overarching quality management philosophy, while lean and Six Sigma are specific methodologies that operate within or alongside a TQM framework.",
                "Topic": "Total Quality Management and Segment Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D9-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Inglewood prepares a segmented income statement showing each division's segment margin after deducting only costs traceable to that division. What is the purpose of the segment margin?",
                "Choices": [
                    "To evaluate segment profitability before allocating common, untraceable corporate costs",
                    "To determine the exact bonus payable to each division manager",
                    "To calculate consolidated net income directly",
                    "To replace the need for a companywide income statement"
                ],
                "Correct": "To evaluate segment profitability before allocating common, untraceable corporate costs",
                "Explanation": "Under responsibility accounting and segment reporting in the IMA CMA Part 1 Section C syllabus, segment margin represents the contribution of a business segment (division, product line, geographic region) to covering common corporate costs and generating profit. It is calculated as segment revenue minus all costs directly traceable to that segment, including both variable costs and traceable fixed costs. The fundamental purpose of segment margin is to evaluate segment profitability before allocating common, untraceable corporate costs — costs that would continue to exist even if the segment were eliminated, such as the CEO's salary or corporate headquarters expenses. Determining the exact bonus payable to each division manager is one potential use of segment data but not the primary purpose — bonuses may incorporate qualitative factors, team performance, and strategic objectives beyond segment margin alone. Calculating consolidated net income directly is incorrect because consolidated net income requires deducting all common corporate costs after aggregating segment contributions. Replacing the companywide income statement is incorrect because segmented reporting complements, rather than replaces, consolidated reporting — both are required for comprehensive performance evaluation. A common exam trap is treating all fixed costs as traceable, which inflates the segment margin — only costs that would disappear if the segment were eliminated should be deducted to arrive at segment margin.",
                "Topic": "Total Quality Management and Segment Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D9-Q2"
            },
            {
                "Type": "numeric",
                "Prompt": "Inglewood has operating income of 520,000, average operating assets of 4,000,000, and a required rate of return of 11%. What is residual income?",
                "Correct": "80000",
                "Explanation": "Under performance measurement standards in the IMA CMA Part 1 Section C syllabus, residual income measures how much operating income exceeds the minimum required return on the assets employed by a division or investment center. The formula is: Residual income = Operating income − (Required rate of return × Average operating assets). Substituting the given values: $520,000 − (11% × $4,000,000) = $520,000 − $440,000 = $80,000. A positive residual income of $80,000 indicates that Inglewood's division is generating returns above the 11% required rate, creating value beyond the minimum expected return. Residual income overcomes a key limitation of return on investment (ROI) as a performance measure — ROI can discourage managers from accepting projects with returns above the cost of capital but below the current division ROI, while residual income encourages any investment that exceeds the required rate of return. A common error is to multiply operating income by the required rate ($520,000 × 11% = $57,200) instead of applying the rate to average assets, or to subtract the product from assets rather than from operating income. Residual income is widely used alongside ROI for divisional performance evaluation and incentive compensation design.",
                "Topic": "Total Quality Management and Segment Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CognitiveLevel": "Apply",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D9-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select measures that would typically appear on a segmented income statement to evaluate divisional performance.",
                "Choices": [
                    "Segment revenue",
                    "Traceable fixed costs",
                    "Segment margin",
                    "Consolidated net income only"
                ],
                "Correct": [
                    "Segment revenue",
                    "Traceable fixed costs",
                    "Segment margin"
                ],
                "Explanation": "Under responsibility accounting and segment reporting in the IMA CMA Part 1 Section C syllabus, a segmented income statement reports financial results by business segment (division, product line, geographic region) to enable performance evaluation at the segment level. Three correct measures appear on a segmented income statement: 'Segment revenue' — the top line, representing sales attributable to each segment and forming the basis for all subsequent profitability calculations. 'Traceable fixed costs' — costs that are directly attributable to and incurred because of the segment's existence, such as a division manager's salary or depreciation on division-specific equipment. These costs would be eliminated if the segment were discontinued, distinguishing them from common fixed costs that persist regardless. 'Segment margin' — segment revenue minus all variable costs and traceable fixed costs, representing the segment's contribution to covering common corporate costs and generating enterprise-wide profit. 'Consolidated net income only' is incorrect — consolidation alone obscures individual segment performance, which is precisely why segmented reporting is necessary. The segmented income statement is a core tool for evaluating responsibility centers, making resource allocation decisions, and identifying underperforming units within a diversified organization. A common exam trap is misclassifying common fixed costs as traceable, which inflates the apparent profitability of certain segments.",
                "Topic": "Total Quality Management and Segment Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D9-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Analyzing profitability by individual customer account rather than by product line is called customer ______ analysis.",
                "Correct": "profitability",
                "Explanation": "Under performance management and profitability analysis in the IMA CMA Part 1 Section C syllabus, customer profitability analysis evaluates the net profit generated by individual customers or customer segments by comparing revenues earned from each customer against the full cost of serving that customer, including product costs, selling costs, distribution costs, and customer-specific service costs. This analysis often reveals that a small percentage of customers generate the majority of profits (the 80/20 rule), while some customers may actually be unprofitable when all service, support, and special handling costs are considered. Customer profitability analysis enables management to make strategic decisions about pricing, service levels, customer retention efforts, and resource allocation across the customer base. It is distinct from product profitability analysis (evaluating profitability by product line) and channel profitability analysis (evaluating by distribution channel). The activity-based costing framework is frequently employed to trace customer-specific costs such as order processing, expedited delivery, special packaging, and after-sales technical support. Understanding customer profitability is essential for management accountants advising on customer relationship management, pricing strategy, and profitability improvement initiatives. A common confusion is analyzing only gross margin by customer, which ignores the significant selling, general, and administrative costs that may vary substantially across customers.",
                "Topic": "Total Quality Management and Segment Reporting",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D9-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S525 Wave 3 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (TQM framework, responsibility accounting, residual income formula, segment reporting standards, customer profitability analysis). Added CognitiveLevel metadata (Understand/Apply/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D10",
        "Title": "Process Costing and Cost-Volume-Profit Analysis",
        "SectionTags": [
            "D"
        ],
        "BlueprintDomain": "Cost Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Juniperfield Beverages uses process costing for its bottling line and is analyzing cost-volume-profit relationships to support pricing decisions for a new product launch.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Juniperfield uses the FIFO method of process costing. How does this method treat costs from beginning work in process inventory?",
                "Choices": [
                    "It keeps beginning work in process costs separate from current period costs",
                    "It combines beginning work in process costs with current period costs into one average",
                    "It ignores beginning work in process entirely",
                    "It transfers beginning inventory directly to cost of goods sold without recalculation"
                ],
                "Correct": "It keeps beginning work in process costs separate from current period costs",
                "Explanation": "Under process costing standards in the IMA CMA Part 1 Section D syllabus, the FIFO (first-in, first-out) method treats beginning work in process inventory costs separately from current period costs. Costs from the prior period's partially completed units are kept distinct, and a separate cost per equivalent unit is calculated for work performed during the current period. The equivalent units under FIFO equal: units completed from beginning WIP (the remaining work needed to finish them) + units started and completed during the period + equivalent units in ending WIP. In contrast, the weighted-average method combines beginning WIP costs with current period costs and computes a single blended cost per equivalent unit. Ignoring beginning WIP entirely is incorrect — both FIFO and weighted average account for it, they just differ in how they compute the per-unit cost applied. Transferring beginning inventory directly to COGS ignores the fact that beginning WIP units need additional work to be completed, and that work costs must be tracked. A common exam trap is confusing when FIFO process costing is beneficial — it is preferred when input costs are changing significantly, as it isolates current-period cost performance from prior-period cost levels.",
                "Topic": "Process Costing and Cost-Volume-Profit Analysis",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D10-Q1"
            },
            {
                "Type": "numeric",
                "Prompt": "Juniperfield has budgeted sales of 600,000 and a break-even point of 420,000 in sales dollars. What is the margin of safety?",
                "Correct": "180000",
                "Explanation": "Under cost-volume-profit (CVP) analysis in the IMA CMA Part 1 Section D syllabus, the margin of safety measures the amount by which actual or budgeted sales exceed the break-even point. It represents the cushion or buffer before the company begins incurring losses. The formula is: Margin of safety = Budgeted (or actual) sales − Break-even sales. Substituting: $600,000 − $420,000 = $180,000. This means Juniperfield's sales can decline by up to $180,000 (30% of budgeted sales) before reaching the break-even point and incurring operating losses. The margin of safety can also be expressed as a percentage: $180,000 / $600,000 = 30%. A higher margin of safety indicates lower operating risk — the company can withstand a larger sales decline before becoming unprofitable. Companies with high fixed costs and high operating leverage typically have narrower margins of safety, making them more vulnerable to sales downturns. A common exam error is subtracting the break-even point from contribution margin instead of from budgeted sales, or confusing margin of safety dollars with the margin of safety ratio. The margin of safety is a key metric for assessing business risk and is often used alongside the degree of operating leverage.",
                "Topic": "Process Costing and Cost-Volume-Profit Analysis",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CognitiveLevel": "Apply",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D10-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Juniperfield has a high proportion of fixed costs relative to variable costs. What effect does this have on the degree of operating leverage?",
                "Choices": [
                    "A higher degree of operating leverage, meaning profit is more sensitive to sales volume changes",
                    "A lower degree of operating leverage with less sensitivity to volume changes",
                    "No effect on operating leverage since it depends only on price",
                    "A guarantee that the company will always be profitable"
                ],
                "Correct": "A higher degree of operating leverage, meaning profit is more sensitive to sales volume changes",
                "Explanation": "Under cost behavior and CVP analysis in the IMA CMA Part 1 Section D syllabus, the degree of operating leverage (DOL) measures the sensitivity of operating income to changes in sales volume. The formula is: DOL = Contribution margin / Operating income. A cost structure with a high proportion of fixed costs relative to variable costs produces a higher degree of operating leverage. This means that for a given percentage change in sales, operating income will change by a larger percentage — profits are more sensitive to sales volume fluctuations. The amplification works in both directions: in good times, high DOL magnifies profit growth; in downturns, it magnifies losses. A lower DOL (consistent with high variable costs and low fixed costs) produces less sensitivity to volume changes. Operating leverage is not 'no effect' because fixed costs are the very source of operating leverage — variable costs change proportionally with volume and do not create leverage. 'Always profitable' is incorrect — high fixed costs increase break-even points and risk, creating no guarantee of profitability. Understanding operating leverage is critical for management accountants evaluating cost structure decisions, pricing strategies, and risk exposure. A common exam trap is confusing operating leverage with financial leverage — operating leverage relates to fixed operating costs, while financial leverage relates to fixed financing costs such as interest.",
                "Topic": "Process Costing and Cost-Volume-Profit Analysis",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D10-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select factors required to compute a meaningful combined break-even point when a company sells multiple products.",
                "Choices": [
                    "An assumption of a constant sales mix between products",
                    "Contribution margin data for each product",
                    "Total fixed costs for the company",
                    "Identical selling prices for all products"
                ],
                "Correct": [
                    "An assumption of a constant sales mix between products",
                    "Contribution margin data for each product",
                    "Total fixed costs for the company"
                ],
                "Explanation": "Under multi-product cost-volume-profit (CVP) analysis in the IMA CMA Part 1 Section D syllabus, computing a combined break-even point for a company selling multiple products requires three essential elements. First, 'An assumption of a constant sales mix between products' — because products have different contribution margins and selling prices, the relative proportion of each product sold must be assumed stable. Any change in the sales mix changes the weighted-average contribution margin and thus the break-even point. Second, 'Contribution margin data for each product' — the contribution margin per unit (selling price minus variable cost per unit) for each individual product is required to compute the weighted-average contribution margin that serves as the denominator in the multi-product break-even formula. Third, 'Total fixed costs for the company' — fixed costs are typically common across all products and must be covered by the aggregate contribution from all products before any profit is earned. 'Identical selling prices for all products' is incorrect — if all products had identical selling prices, they would effectively be the same product, and the multi-product aspect would be irrelevant. Multi-product CVP analysis is essential for management accountants evaluating product mix decisions, sales strategy, and break-even targets in diversified companies. A common exam trap is applying the single-product break-even formula without adjusting for sales mix.",
                "Topic": "Process Costing and Cost-Volume-Profit Analysis",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D10-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Ongoing, incremental cost reduction targets applied to a product already in production is called ______ costing.",
                "Correct": "kaizen",
                "Explanation": "Under cost management standards in the IMA CMA Part 1 Section D syllabus, kaizen costing is a cost reduction methodology that focuses on achieving small, continuous, incremental cost reductions for products already in production. Derived from the Japanese term for 'continuous improvement,' kaizen costing sets ongoing cost reduction targets — typically each period — requiring cross-functional teams to identify and eliminate waste, improve efficiency, and streamline processes. This contrasts with target costing, which is applied during the product design and development phase before production begins, establishing a target cost based on market-allowable price minus desired profit. Standard costing establishes predetermined costs for variance analysis and performance evaluation. Activity-based costing assigns overhead costs to products based on their consumption of activities and cost drivers. Kaizen costing is particularly relevant in lean manufacturing environments where continuous improvement is embedded in the organizational culture. A common exam trap is confusing kaizen costing with target costing — kaizen operates on existing products during production, while target costing operates on new products during design.",
                "Topic": "Process Costing and Cost-Volume-Profit Analysis",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D10-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S526 Wave 4 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (FIFO process costing, CVP margin of safety/operating leverage, multi-product break-even, kaizen costing). Added CognitiveLevel metadata (Understand/Apply/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D11",
        "Title": "Vendor Fraud Prevention and Audit Oversight",
        "SectionTags": [
            "E"
        ],
        "BlueprintDomain": "Internal Controls",
        "EstimatedMinutes": 25,
        "ScenarioText": "Kelso Industrial Parts strengthens controls over its vendor master file and payment approval process after identifying gaps during an internal audit, while also reviewing the audit committee's oversight role.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Kelso restricts the ability to add or modify vendor records to a small group of employees separate from those who approve invoice payments. What risk does this control primarily address?",
                "Choices": [
                    "The risk of fictitious vendor fraud or unauthorized changes to payment details",
                    "The risk of inventory obsolescence",
                    "The risk of foreign currency translation errors",
                    "The risk of incorrect revenue recognition timing"
                ],
                "Correct": "The risk of fictitious vendor fraud or unauthorized changes to payment details",
                "Explanation": "Under the COSO Internal Control Framework and fraud prevention standards in the IMA CMA Part 1 Section E syllabus, restricting and segregating vendor master file maintenance from invoice payment approval is a fundamental segregation-of-duties control that primarily addresses the risk of fictitious vendor fraud and unauthorized changes to payment details. When the same individual can both create or modify vendor records and approve payments, the risk arises that a fraudulent employee could set up a fictitious vendor (or redirect an existing vendor's bank details to their own account) and then approve payments to that vendor. By separating these responsibilities, a second person reviews new or changed vendor records before payments can be processed, significantly reducing this fraud risk. Inventory obsolescence risk is managed through inventory management controls and periodic physical counts — unrelated to vendor master file segregation. Foreign currency translation errors relate to financial reporting under ASC 830. Incorrect revenue recognition timing relates to ASC 606 compliance. A common exam trap is confusing physical controls (like locking inventory) with segregation of duties controls — vendor master file controls are preventive, process-level controls, while physical controls protect tangible assets. The COSO control activities component specifically emphasizes segregation of duties as a key preventive control.",
                "Topic": "Vendor Fraud Prevention and Audit Oversight",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D11-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Kelso's board audit committee oversees financial reporting, the external auditor relationship, and internal audit. What is the primary purpose of this oversight?",
                "Choices": [
                    "To provide independent oversight of financial reporting integrity and internal control effectiveness",
                    "To prepare the company's financial statements directly",
                    "To replace the need for external audits entirely",
                    "To set employee compensation for all departments"
                ],
                "Correct": "To provide independent oversight of financial reporting integrity and internal control effectiveness",
                "Explanation": "Under the COSO Internal Control Framework and corporate governance standards in the IMA CMA Part 1 Section E syllabus, the audit committee — a subcommittee of the board of directors composed of independent directors — provides independent oversight of financial reporting integrity, internal control effectiveness, and the external audit function. The audit committee is responsible for appointing, compensating, and overseeing the external auditors; reviewing the scope and results of the audit; discussing significant accounting policies and estimates with management and auditors; and overseeing internal audit's independence and effectiveness. The audit committee does NOT prepare financial statements — that is management's responsibility under Section 302 of the Sarbanes-Oxley Act. It does NOT replace external audits — audits remain a statutory requirement for public companies. It does NOT set employee compensation — that is typically handled by the compensation committee or management, not the audit committee. The audit committee's independence from management is its most critical characteristic — members must be financially literate and independent of management influence. A common exam trap is confusing the audit committee's oversight role (review and monitor) with management's execution role (prepare and implement). This distinction is central to the COSO monitoring component and Sarbanes-Oxley compliance requirements.",
                "Topic": "Vendor Fraud Prevention and Audit Oversight",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D11-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Kelso requires multi-factor authentication for employees accessing financial systems remotely. What is the primary purpose of this control?",
                "Choices": [
                    "To reduce the risk of unauthorized access to financial systems and data",
                    "To eliminate the need for any other IT general controls",
                    "To ensure compliance with balanced scorecard metrics",
                    "To replace the need for segregation of duties"
                ],
                "Correct": "To reduce the risk of unauthorized access to financial systems and data",
                "Explanation": "Under IT general controls and the COSO Internal Control Framework in the IMA CMA Part 1 Section E syllabus, multi-factor authentication (MFA) is a logical access control that requires users to provide two or more verification factors to gain access to a system — typically something they know (password), something they have (token or phone), and/or something they are (biometric). The primary purpose of MFA is to reduce the risk of unauthorized access to financial systems and data by adding layers of authentication beyond a single password. Even if a password is compromised through phishing, brute force, or credential theft, an attacker still cannot access the system without the additional authentication factors. MFA does NOT eliminate the need for other IT general controls — it is one control within a layered defense that should also include access reviews, change management, segregation of duties, and monitoring. It does NOT ensure compliance with balanced scorecard metrics, which are strategic performance management tools (Section C). It does NOT replace segregation of duties — MFA controls who accesses the system, while segregation of duties controls what that person can do once inside. A common exam trap is confusing authentication controls (MFA, passwords, biometrics — verifying identity) with authorization controls (access rights, role-based permissions — determining what the verified user is permitted to do). Both are complementary components of the COSO control activities category.",
                "Topic": "Vendor Fraud Prevention and Audit Oversight",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D11-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select controls that would help reduce the risk of duplicate or fraudulent vendor payments at Kelso.",
                "Choices": [
                    "Independent review before payment release",
                    "Automated duplicate invoice detection",
                    "Segregation of vendor setup from payment approval",
                    "Allowing any employee to add new vendors without review"
                ],
                "Correct": [
                    "Independent review before payment release",
                    "Automated duplicate invoice detection",
                    "Segregation of vendor setup from payment approval"
                ],
                "Explanation": "Under the COSO Internal Control Framework and fraud prevention standards in the IMA CMA Part 1 Section E syllabus, reducing the risk of duplicate or fraudulent vendor payments requires multiple, overlapping preventive and detective controls. Three controls are specifically effective: 'Independent review before payment release' — having a second person, independent of the original invoice processing, review large or unusual payments before they are released provides a detective control that catches errors or intentional manipulation. 'Automated duplicate invoice detection' — system-based matching of invoice numbers, amounts, dates, and vendor identifiers to flag potential duplicate submissions is a highly effective preventive/detective control that operates continuously without manual effort. 'Segregation of vendor setup from payment approval' — ensuring the person who creates or modifies vendor records cannot also approve payments to those vendors is a fundamental preventive control that addresses the root cause of many vendor fraud schemes. 'Allowing any employee to add new vendors without review' is incorrect and represents the absence of a control — unrestricted vendor setup ability is precisely the condition that enables fictitious vendor fraud. These controls collectively implement the COSO principles of segregation of duties, proper authorization, and independent checks on performance.",
                "Topic": "Vendor Fraud Prevention and Audit Oversight",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D11-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Assigning owners, due dates, and verification steps to ensure identified control deficiencies are corrected is called ______ tracking.",
                "Correct": "remediation",
                "Explanation": "Under the COSO Internal Control Framework's monitoring component in the IMA CMA Part 1 Section E syllabus, remediation tracking is the systematic process of assigning ownership, due dates, and verification steps to ensure identified control deficiencies are corrected and validated. When internal or external audits identify control gaps — such as missing segregation of duties, lack of access reviews, or inadequate documentation — remediation tracking ensures these findings do not remain unresolved indefinitely. Each deficiency is assigned to a responsible owner, a target completion date, and specific corrective actions. Verification steps confirm that the remediation was implemented effectively and that the control now operates as designed. Remediation tracking is a critical element of the COSO monitoring component — without it, control deficiencies identified through ongoing and separate evaluations may never be addressed, rendering the monitoring process ineffective. A common exam trap is confusing remediation tracking (correcting identified control gaps) with risk assessment (identifying risks before designing controls) or with internal audit planning (scheduling audits based on risk). The distinction is important: risk assessment identifies what could go wrong, internal audit evaluates whether controls address those risks, and remediation tracking ensures that identified control failures get fixed.",
                "Topic": "Vendor Fraud Prevention and Audit Oversight",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "COSO Internal Control Framework overview",
                        "url": "https://www.coso.org/guidance-on-ic"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D11-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S526 Wave 4 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (COSO IC/ERM, vendor fraud controls, audit committee governance, MFA access controls, remediation tracking). Added CognitiveLevel metadata (Understand/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D12",
        "Title": "Cybersecurity and Predictive Analytics Program",
        "SectionTags": [
            "F"
        ],
        "BlueprintDomain": "Technology and Analytics",
        "EstimatedMinutes": 25,
        "ScenarioText": "Lockhaven Insurance Group is expanding its use of predictive analytics for claims fraud detection while strengthening incident response planning and access encryption practices.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Lockhaven builds a model to forecast which insurance claims are most likely to be fraudulent. What type of analytics is this?",
                "Choices": [
                    "Predictive analytics",
                    "Descriptive analytics",
                    "Diagnostic analytics",
                    "Prescriptive analytics only, with no forecasting element"
                ],
                "Correct": "Predictive analytics",
                "Explanation": "Under the technology and analytics standards in the IMA CMA Part 1 Section F syllabus, data analytics is categorized into four progressive types. Predictive analytics uses historical data, statistical algorithms, and machine learning techniques to identify the likelihood of future outcomes — such as which insurance claims are most likely to be fraudulent. It answers the question 'What is likely to happen?' Descriptive analytics summarizes what has already happened (e.g., 'How many fraudulent claims were detected last quarter?'). Diagnostic analytics examines why something happened by identifying patterns and relationships in data (e.g., 'Why did fraud claims increase in a specific region?'). Prescriptive analytics recommends actions based on predicted outcomes (e.g., 'Which claims should be prioritized for investigation?'). While prescriptive analytics may incorporate predictive elements, predictive analytics is specifically about forecasting future probabilities, not prescribing actions. Lockhaven building a model to forecast fraud likelihood is a textbook example of predictive analytics. A common exam trap is confusing predictive analytics (forecasting outcomes) with prescriptive analytics (recommending actions). Understanding the analytics maturity progression — descriptive → diagnostic → predictive → prescriptive — is essential for management accountants evaluating data analytics capabilities.",
                "Topic": "Cybersecurity and Predictive Analytics Program",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D12-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Lockhaven encrypts sensitive financial data both when stored on servers and when transmitted across networks. What security objective does this primarily support?",
                "Choices": [
                    "Confidentiality, by protecting data from unauthorized access or interception",
                    "Availability, by ensuring systems remain accessible",
                    "Data governance, by defining data ownership",
                    "Segregation of duties within the finance department"
                ],
                "Correct": "Confidentiality, by protecting data from unauthorized access or interception",
                "Explanation": "Under information security and the NIST Cybersecurity Framework referenced in the IMA CMA Part 1 Section F syllabus, the CIA triad — Confidentiality, Integrity, and Availability — defines the three core security objectives for protecting information assets. Encryption of data both at rest (stored on servers) and in transit (transmitted across networks) primarily supports the confidentiality objective by protecting data from unauthorized access or interception. If encrypted data is intercepted or stolen, it remains unreadable without the decryption key. Availability focuses on ensuring systems and data are accessible when needed — addressed through redundancy, backup, and disaster recovery, not encryption. Data governance defines policies for data ownership, classification, and quality — a broader data management concept, not a specific security objective addressed by encryption. Segregation of duties within the finance department is an internal control over financial processes — distinct from technical information security controls like encryption. Encryption also contributes indirectly to integrity (tampering with encrypted data typically renders it unreadable), but its primary and most direct purpose is protecting confidentiality. A common exam trap is confusing the three CIA triad components — encryption is fundamentally a confidentiality control, not an availability or integrity control.",
                "Topic": "Cybersecurity and Predictive Analytics Program",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D12-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Lockhaven maintains a documented plan outlining steps to take if a cybersecurity breach is detected, including containment and notification. What is the primary purpose of this plan?",
                "Choices": [
                    "To enable a timely, coordinated response that limits damage and meets legal notification obligations",
                    "To eliminate the possibility of any future breach",
                    "To replace the need for preventive security controls",
                    "To satisfy only internal audit documentation requirements"
                ],
                "Correct": "To enable a timely, coordinated response that limits damage and meets legal notification obligations",
                "Explanation": "Under the NIST Cybersecurity Framework's Respond function and IT governance in the IMA CMA Part 1 Section F syllabus, an incident response plan (IRP) is a documented, structured approach that outlines the steps an organization should take when a cybersecurity breach is detected. The primary purpose is to enable a timely, coordinated response that limits damage, contains the breach, preserves evidence for forensic analysis, restores normal operations, and meets legal and regulatory notification obligations (such as state data breach notification laws and SEC reporting requirements). An IRP does NOT eliminate the possibility of any future breach — no plan can guarantee prevention of all attacks, which is why defense-in-depth strategies combine preventive, detective, and responsive controls. It does NOT replace preventive security controls — response planning complements firewalls, access controls, and encryption, but does not substitute for them. It is NOT solely for internal audit documentation — while audit may review IRP adequacy, the plan serves operational, legal, regulatory, and reputational purposes far beyond internal documentation. The NIST framework organizes incident response under the Respond function, which also includes communications, analysis, mitigation, and improvements. A common exam trap is confusing incident response (reacting to a detected breach) with business continuity planning (maintaining operations during a disruption) or disaster recovery (restoring IT systems after a catastrophic event).",
                "Topic": "Cybersecurity and Predictive Analytics Program",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D12-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics of big data commonly referenced in technology and analytics discussions.",
                "Choices": [
                    "Volume",
                    "Velocity",
                    "Variety",
                    "Depreciation"
                ],
                "Correct": [
                    "Volume",
                    "Velocity",
                    "Variety"
                ],
                "Explanation": "Under data governance and analytics standards in the IMA CMA Part 1 Section F syllabus, big data is commonly characterized by the 'Three Vs' — Volume, Velocity, and Variety. Volume refers to the enormous scale of data generated, from terabytes to petabytes and beyond, far exceeding the capacity of traditional database management systems. Velocity refers to the speed at which data is generated, collected, and processed — in many modern applications, data streams in real time (e.g., social media feeds, sensor data, financial market transactions) and requires near-instantaneous processing. Variety refers to the diverse formats and types of data, including structured data (rows and columns in relational databases), semi-structured data (XML, JSON), and unstructured data (emails, videos, images, social media posts, audio files). Some frameworks add additional Vs such as Veracity (data quality and trustworthiness) and Value (business utility of the data), but the original and most commonly tested triad is Volume, Velocity, and Variety. Depreciation is an accounting concept related to the systematic allocation of a fixed asset's cost over its useful life — completely unrelated to big data characteristics. A common exam trap is confusing big data Vs with other business frameworks. The Three Vs are widely tested on the CMA Part 1 exam under the Technology and Analytics section.",
                "Topic": "Cybersecurity and Predictive Analytics Program",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D12-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A model that performs extremely well on training data but poorly on new, unseen data suffers from ______.",
                "Correct": "overfitting",
                "Explanation": "Under data analytics and predictive modeling in the IMA CMA Part 1 Section F syllabus, overfitting is a fundamental modeling error that occurs when a statistical or machine learning model captures noise and random variations specific to the training dataset rather than the underlying patterns that generalize to new, unseen data. An overfitted model performs exceptionally well on training data — achieving near-perfect accuracy — but performs poorly when applied to new data because it has essentially 'memorized' the training examples instead of learning the true relationships. Overfitting is typically caused by excessive model complexity (too many parameters relative to the number of observations), insufficient training data, or training for too many iterations. The solution involves techniques such as cross-validation (splitting data into training and validation sets), regularization (penalizing model complexity), pruning (simplifying decision trees), or collecting more training data. The opposite problem — underfitting — occurs when a model is too simple to capture the underlying pattern, performing poorly on both training and new data. Understanding overfitting is critical for management accountants involved in predictive analytics, forecasting, and data-driven decision making. A common exam trap is confusing overfitting (model too complex, memorizing noise) with underfitting (model too simple, missing the pattern).",
                "Topic": "Cybersecurity and Predictive Analytics Program",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "NIST Cybersecurity Framework",
                        "url": "https://www.nist.gov/cyberframework"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D12-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S526 Wave 4 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (predictive analytics types, CIA triad encryption, NIST incident response, big data 3 Vs, overfitting). Added CognitiveLevel metadata (Understand/Remember). Added distractor rationale for select and multi items. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D13",
        "Title": "Business Combinations and Comprehensive Income",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Mapleton Health Systems completed a business combination during the year and must also determine the appropriate presentation of comprehensive income items alongside its consolidated financial statements.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Mapleton acquires a company in a business combination. How should identifiable assets acquired and liabilities assumed be measured?",
                "Choices": [
                    "At their acquisition-date fair values",
                    "At the acquirer's historical book values",
                    "At the target's original historical cost",
                    "At replacement cost only for inventory"
                ],
                "Correct": "At their acquisition-date fair values",
                "Explanation": "Under ASC 805 (Business Combinations) and the IMA CMA Part 1 Section A syllabus, the acquisition method requires that identifiable assets acquired and liabilities assumed in a business combination be measured at their acquisition-date fair values. This principle applies regardless of whether the assets were previously carried at historical cost, amortized cost, or any other basis on the target's books. Fair value is defined under ASC 820 as the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date. Limited exceptions exist — for example, deferred tax assets and liabilities are measured under ASC 740, and certain employee benefit obligations follow specific guidance — but fair value measurement is the default rule. Measuring at the acquirer's historical book values (Option B) would ignore the economics of the transaction: the acquirer paid fair value, so the assets should be recorded at fair value. Using the target's original historical cost (Option C) is incorrect because the target's books reflect prices paid sometimes years earlier — the acquisition establishes a new basis. Replacement cost only for inventory (Option D) is a narrow application that ignores the comprehensive fair value measurement requirement for all identifiable assets. A common exam trap is confusing the acquisition method's measurement basis with push-down accounting (where the acquiree's standalone statements may reflect the acquirer's basis) or with the pooling-of-interests method (eliminated under current GAAP).",
                "Topic": "Business Combinations and Comprehensive Income",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D13-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Mapleton wants to present net income and other comprehensive income items. What presentation formats are acceptable under U.S. GAAP?",
                "Choices": [
                    "A single continuous statement, or two separate but consecutive statements",
                    "Only within the statement of retained earnings",
                    "Only as a footnote disclosure with no statement presentation",
                    "Only combined with the statement of cash flows"
                ],
                "Correct": "A single continuous statement, or two separate but consecutive statements",
                "Explanation": "Under ASC 220 (Comprehensive Income) and the IMA CMA Part 1 Section A syllabus, U.S. GAAP permits two presentation formats for comprehensive income. Option 1 is a single continuous statement of comprehensive income that begins with net income at the top, lists each component of other comprehensive income (OCI) below, and culminates in total comprehensive income at the bottom — all on one face. Option 2 is two separate but consecutive statements: an income statement ending with net income, immediately followed by a statement of comprehensive income that begins with net income, adds or subtracts OCI items, and arrives at total comprehensive income. Both formats must be presented with equal prominence to the other financial statements. OCI components typically include unrealized gains and losses on available-for-sale debt securities (ASC 320), foreign currency translation adjustments (ASC 830), certain pension and postretirement benefit plan adjustments (ASC 715), and changes in the fair value of certain hedging instruments (ASC 815). Presenting only within the statement of retained earnings (Option B) is incorrect — comprehensive income is broader, encompassing all changes in equity from non-owner sources. Footnote-only presentation (Option C) is inadequate — ASC 220 requires statement presentation. Combining with the statement of cash flows (Option D) would confuse the distinct purposes of these two statements: cash flows show sources and uses of cash, while comprehensive income shows total changes in equity from non-owner sources. A common exam trap is confusing comprehensive income presentation with OCI reclassification adjustments — certain OCI items are later reclassified to net income (recycling), while others remain permanently in accumulated OCI.",
                "Topic": "Business Combinations and Comprehensive Income",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D13-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Mapleton discovers a material error from two years ago that understated depreciation expense. How should this be corrected?",
                "Choices": [
                    "As a prior period adjustment, restating the beginning balance of retained earnings",
                    "As a change in accounting estimate, applied prospectively only",
                    "As an unusual or infrequent item in the current period's income statement",
                    "Ignored since the error relates to a prior period"
                ],
                "Correct": "As a prior period adjustment, restating the beginning balance of retained earnings",
                "Explanation": "Under ASC 250 (Accounting Changes and Error Corrections) and the IMA CMA Part 1 Section A syllabus, material errors discovered in previously issued financial statements must be corrected through prior period adjustments — not through the current period's income statement. The correction involves restating the affected prior period financial statements as if the error never occurred. In the year of discovery, the cumulative effect of the error on periods prior to those presented is reflected in the carrying amounts of assets and liabilities as of the beginning of the first period presented, with an offsetting adjustment (net of tax) to the opening balance of retained earnings for that period. For Mapleton's scenario — an understatement of depreciation expense two years ago — the correction would increase accumulated depreciation (a contra-asset, reducing net assets) and decrease the beginning balance of retained earnings by the after-tax cumulative effect. The company must also disclose the nature of the error, the effect on each financial statement line item, and the cumulative effect on prior periods. Treatment as a change in accounting estimate (Option B) is incorrect — a change in estimate (such as a revised useful life) is applied prospectively, while an error correction requires retroactive restatement. Reporting as an unusual/infrequent item in current income (Option C) would inappropriately penalize the current period for a prior-period error. Ignoring the error (Option D) violates the materiality principle and could mislead financial statement users. A common exam trap is confusing an error correction (retrospective restatement) with a change in accounting principle (also retrospective under ASC 250, but with different disclosure requirements) or a change in estimate (prospective).",
                "Topic": "Business Combinations and Comprehensive Income",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D13-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select items that are classified as financing activities on the statement of cash flows.",
                "Choices": [
                    "Repayment of long-term note payable principal",
                    "Proceeds from issuing common stock",
                    "Payment of cash dividends to shareholders",
                    "Cash received from customers for services rendered"
                ],
                "Correct": [
                    "Repayment of long-term note payable principal",
                    "Proceeds from issuing common stock",
                    "Payment of cash dividends to shareholders"
                ],
                "Explanation": "Under ASC 230 (Statement of Cash Flows) and the IMA CMA Part 1 Section A syllabus, cash flows are classified into three categories: operating, investing, and financing. Financing activities include transactions that affect the entity's debt and equity capital structure. 'Repayment of long-term note payable principal' is a financing outflow — it reduces the company's debt obligations. Note that only the principal repayment is classified as financing; interest payments are classified as operating activities under U.S. GAAP (though IFRS permits classification as either operating or financing). 'Proceeds from issuing common stock' is a financing inflow — it represents capital raised from shareholders. 'Payment of cash dividends to shareholders' is a financing outflow — dividends represent a return on capital to equity holders and reduce retained earnings. Note that under U.S. GAAP, dividends paid are always classified as financing activities. 'Cash received from customers for services rendered' is incorrect for financing — this is a classic operating activity, representing cash inflows from the entity's primary revenue-generating activities. Other common operating activities include payments to suppliers, payments to employees, and interest and tax payments. Investing activities include purchases and sales of property, plant, and equipment, acquisitions of other businesses, and purchases and sales of debt and equity securities of other entities. A common exam trap is confusing the classification of dividends: dividends received (from investments in other companies' stock) are operating activities, while dividends paid (to the company's own shareholders) are financing activities.",
                "Topic": "Business Combinations and Comprehensive Income",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D13-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Goodwill is tested at least annually for ______ by comparing the reporting unit's fair value to its carrying amount.",
                "Correct": "impairment",
                "Explanation": "Under ASC 350 (Intangibles — Goodwill and Other) and the IMA CMA Part 1 Section A syllabus, goodwill arising from a business combination is not amortized but is instead tested for impairment at least annually, or more frequently if events or changes in circumstances indicate that the carrying amount of a reporting unit may exceed its fair value (triggering events). Under current U.S. GAAP, entities have the option to first perform a qualitative assessment (Step 0) to determine whether it is more likely than not (greater than 50% likelihood) that the fair value of a reporting unit is less than its carrying amount. If the qualitative assessment indicates potential impairment, or if the entity elects to skip the qualitative test, a quantitative impairment test is performed comparing the reporting unit's fair value to its carrying amount including goodwill. If the carrying amount exceeds fair value, an impairment loss is recognized for the excess, limited to the total amount of goodwill allocated to that reporting unit. Goodwill impairment cannot be reversed in subsequent periods under U.S. GAAP (unlike IFRS, which also tests goodwill at the cash-generating-unit level but previously permitted reversal under certain older standards). A common exam trap is confusing goodwill impairment testing (annual, qualitative option available) with the impairment testing of indefinite-lived intangible assets (also annual, with a similar qualitative screen option) or with the impairment testing of long-lived assets held and used under ASC 360 (triggered by events, using undiscounted cash flows as a screening test before fair value measurement).",
                "Topic": "Business Combinations and Comprehensive Income",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Financial Accounting",
                        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D13-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S527 Wave 5 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (ASC 805 business combinations, ASC 220 comprehensive income, ASC 250 error corrections, ASC 230 cash flow classification, ASC 350 goodwill impairment). Added CognitiveLevel metadata (Understand x3, Remember x1). Added distractor rationale for all items. Difficulty recalibrated per Wave 2 standard (select/multi/fill → Moderate-Easy/2). Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D14",
        "Title": "Budget Committees and Cost Estimation Techniques",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Norwood Peak Manufacturing relies on a cross-functional budget committee to review departmental budgets and uses the high-low method to estimate cost behavior for a new production line.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Norwood Peak forms a budget committee of senior managers from each functional area to review and approve departmental budgets. What is the main benefit of this structure?",
                "Choices": [
                    "Cross-functional review and coordination aligning departmental budgets with company goals",
                    "Elimination of the need for a sales forecast",
                    "A guarantee that no budgetary slack will ever occur",
                    "Removal of the finance department from the budgeting process"
                ],
                "Correct": "Cross-functional review and coordination aligning departmental budgets with company goals",
                "Explanation": "Under the IMA CMA Part 1 Section B syllabus (Planning, Budgeting, and Forecasting), a budget committee is a standing group — typically composed of senior managers from each functional area (operations, sales, marketing, finance, human resources) — that reviews, coordinates, and approves departmental budgets before they are consolidated into the master budget. The primary benefit is cross-functional review and coordination: each department head presents and defends their budget assumptions, and other committee members can challenge those assumptions from the perspective of their own functions. This process surfaces inconsistencies (e.g., the sales department's sales forecast doesn't align with production's capacity plan), identifies unrealistic projections, and ensures that all departmental budgets collectively support the company's strategic goals. A budget committee does NOT eliminate the need for a sales forecast (Option B) — the sales forecast is typically the starting point and driver of most other budgets. It does NOT guarantee zero budgetary slack (Option C) — while committee review can reduce slack by exposing inflated cost estimates or sandbagged revenue targets, determined managers can still embed undetected padding. It does NOT remove the finance department (Option D) — finance is typically a core committee member, providing analytical support, consolidating budgets, and ensuring consistency with financial constraints. A common exam trap is confusing the budget committee's advisory and coordination role with the line managers' ownership responsibility — the committee reviews and recommends, but department managers remain accountable for executing their budgeted plans.",
                "Topic": "Budget Committees and Cost Estimation Techniques",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D14-Q1"
            },
            {
                "Type": "numeric",
                "Prompt": "Norwood Peak's highest activity level is 10,000 machine hours costing 86,000, and its lowest activity level is 7,000 machine hours costing 68,000. What is the estimated variable cost per machine hour using the high-low method?",
                "Correct": "6",
                "Explanation": "Under cost estimation techniques in the IMA CMA Part 1 Section B syllabus, the high-low method is a straightforward technique for separating mixed costs into their fixed and variable components using only two data points: the highest and lowest activity levels. Step 1 — Calculate the variable cost per unit (the slope): Variable cost per unit = (Cost at highest activity − Cost at lowest activity) / (Highest activity − Lowest activity). Substituting: ($86,000 − $68,000) / (10,000 machine hours − 7,000 machine hours) = $18,000 / 3,000 = $6.00 per machine hour. This means every additional machine hour adds $6.00 to total cost. Step 2 — Calculate the fixed cost component (if the question had asked for it): Fixed cost = Total cost at high point − (Variable rate × High activity) = $86,000 − ($6 × 10,000) = $86,000 − $60,000 = $26,000. Verify at low point: $68,000 − ($6 × 7,000) = $68,000 − $42,000 = $26,000 ✓. The total cost equation is therefore: Total cost = $26,000 + $6.00 per machine hour. The high-low method's primary advantage is simplicity and quick application. Its primary limitation is its reliance on only two data points — if either the high or low point is an outlier (e.g., an unusually expensive month due to a one-time repair), the resulting cost function will be distorted. More sophisticated methods like least-squares regression use all available data points and provide statistical measures of fit (R-squared, standard error), making them more reliable but computationally intensive. A common exam trap is using any pair other than the highest and lowest activity levels — the method's name specifies the extreme points, not arbitrary pairs. Another common error is selecting points based on highest and lowest costs rather than highest and lowest activity — the independent variable (activity) determines which points to use, not the dependent variable (cost).",
                "Topic": "Budget Committees and Cost Estimation Techniques",
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
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CognitiveLevel": "Apply",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D14-Q2"
            },
            {
                "Type": "select",
                "Prompt": "Norwood Peak experiences a significant unexpected change in raw material prices mid-year. What is an appropriate management response?",
                "Choices": [
                    "Update the budget or use variance analysis to explain the impact",
                    "Ignore the change and hold managers to the original budget without adjustment",
                    "Discontinue budgeting for the remainder of the year",
                    "Retroactively change all prior period financial statements"
                ],
                "Correct": "Update the budget or use variance analysis to explain the impact",
                "Explanation": "Under the IMA CMA Part 1 Section B syllabus (Planning, Budgeting, and Forecasting), when a significant unanticipated event occurs — such as a major raw material price change — management has two primary, complementary responses. First, the budget can be updated or revised: a flexible budget adjusts cost expectations to the actual activity level and updated input prices, providing a realistic benchmark for performance evaluation. Some organizations use rolling or continuous budgets that are updated regularly (monthly or quarterly), naturally incorporating new information. Second, variance analysis can be used to explain the impact: if the original static budget is retained for performance evaluation, the total variance between actual results and the static budget should be decomposed into components. A flexible budget variance isolates the portion of the total variance attributable to cost control (actual costs vs. what costs should have been given actual activity and updated prices), separating it from the planning variance caused by the unexpected price change outside management's control. Ignoring the change (Option B) holds managers accountable for factors beyond their control, which is demotivating and violates the controllability principle of responsibility accounting. Discontinuing budgeting entirely (Option C) removes a critical planning and control tool — even in volatile environments, budgets remain valuable for coordination and resource allocation. Retroactively changing prior period statements (Option D) is inappropriate — prior periods reflect the conditions that existed at the time; only current and future periods should reflect the new cost environment. A common exam trap is confusing budget revision with prior period restatement — budgets are forward-looking plans that can be revised, while prior financial statements are historical records requiring specific justification (error correction) for changes.",
                "Topic": "Budget Committees and Cost Estimation Techniques",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D14-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select components of the operating budget as distinguished from the financial budget.",
                "Choices": [
                    "Sales budget",
                    "Direct materials budget",
                    "Cash budget",
                    "Capital expenditures budget"
                ],
                "Correct": [
                    "Sales budget",
                    "Direct materials budget"
                ],
                "Explanation": "Under the IMA CMA Part 1 Section B syllabus (Planning, Budgeting, and Forecasting), the master budget is divided into two major components: the operating budget and the financial budget. The operating budget includes all budgets related to the entity's revenue-generating and production activities — it culminates in the budgeted (pro forma) income statement. Key components of the operating budget in sequential order are: sales budget (the foundation and starting point of the entire master budget, estimating units sold and selling price), production budget (units to produce = budgeted sales + desired ending inventory − beginning inventory), direct materials budget (materials needed for production, plus desired ending inventory, minus beginning inventory, multiplied by cost per unit), direct labor budget (hours required × hourly rate), manufacturing overhead budget (variable + fixed overhead), ending finished goods inventory budget, and selling and administrative expense budget. The 'Sales budget' and 'Direct materials budget' are therefore both operating budget components. The 'Cash budget' (Option C) is part of the financial budget, not the operating budget. The financial budget includes the cash budget (cash receipts, cash disbursements, financing, and ending cash balance), the capital expenditures budget, and the budgeted balance sheet. The 'Capital expenditures budget' (Option D) is also part of the financial budget, covering planned acquisitions of long-term assets. A common exam trap is confusing the operating budget (income statement items — revenues and expenses) with the financial budget (balance sheet and cash flow items — assets, liabilities, equity, and cash). Another trap is assuming all budgets with dollar amounts are financial budgets — the operating budget also uses dollars, but for operating revenues and expenses rather than financial position.",
                "Topic": "Budget Committees and Cost Estimation Techniques",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D14-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A budgeting approach that builds assumed continuous, incremental cost reductions into the budget is called ______ budgeting.",
                "Correct": "kaizen",
                "Explanation": "Under the IMA CMA Part 1 Section B syllabus (Planning, Budgeting, and Forecasting), kaizen budgeting is a budgeting approach that explicitly incorporates assumed continuous, incremental cost reductions into the budget for each successive period. Derived from the Japanese term for 'continuous improvement,' kaizen budgeting differs fundamentally from traditional static budgeting: rather than using the prior period's actual costs as the baseline for the next period's budget, kaizen budgeting sets progressively lower cost targets, assuming that ongoing improvement activities (waste reduction, process streamlining, efficiency gains, supplier negotiations) will reduce costs period by period. For example, a kaizen budget might assume a 2% cost reduction per quarter, building that reduction into the budget before the period begins — this makes cost improvement an explicit expectation rather than a hoped-for outcome. Kaizen budgeting is particularly effective in lean manufacturing environments where continuous improvement is culturally embedded and cross-functional teams actively pursue cost reduction opportunities. It contrasts with traditional incremental budgeting (which adds an inflation factor to last year's budget), zero-based budgeting (which requires justifying every expense from zero each period), and activity-based budgeting (which budgets based on the cost of activities required to produce the budgeted output). A common exam trap is confusing kaizen budgeting (continuous improvement targets built into budgets) with kaizen costing (continuous improvement targets applied to existing products' production costs) — both share the kaizen philosophy but operate in different domains: budgeting vs. cost management. The key distinction on the CMA exam is that kaizen budgeting is a planning tool (Section B), while kaizen costing is a cost management tool (Section D).",
                "Topic": "Budget Committees and Cost Estimation Techniques",
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
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D14-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S527 Wave 5 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (IMA CMA Section B: budget committee governance, high-low method with fixed-cost verification, flexible budget response to input price changes, operating vs. financial budget classification, kaizen budgeting). Added CognitiveLevel metadata (Understand x2, Apply x1, Remember x1). Added distractor rationale for select and multi items. Numeric Q2 independently recalculated ($18,000 / 3,000 = $6.00). Difficulty recalibrated per Wave 2 standard. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-D15",
        "Title": "Transfer Pricing and Value-Based Management",
        "SectionTags": [
            "C",
            "D"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Overbrook Chemicals operates multiple divisions that transfer intermediate products internally and has adopted economic value added as a key performance metric to guide capital allocation and executive compensation.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Overbrook uses a dual-rate transfer pricing system, charging the buying division variable cost and crediting the selling division with variable cost plus a fixed fee. What is the primary purpose of this approach?",
                "Choices": [
                    "To encourage internal transfers at variable cost while still compensating the selling division for fixed costs",
                    "To guarantee the selling division reports a loss every period",
                    "To eliminate the need for any transfer pricing policy",
                    "To always match the external market price exactly"
                ],
                "Correct": "To encourage internal transfers at variable cost while still compensating the selling division for fixed costs",
                "Explanation": "Under transfer pricing in the IMA CMA Part 1 Section C syllabus (Performance Management), a dual-rate transfer pricing system addresses a fundamental conflict in transfer pricing: the buying division wants to pay no more than variable cost (since paying more reduces its own profit), while the selling division needs to cover both variable and fixed costs to remain viable. The dual-rate approach resolves this conflict by using TWO different transfer prices for the same transaction: the buying division is charged only the variable cost per unit (typically standard variable cost, not actual, to avoid passing on the selling division's inefficiencies), while the selling division is credited with variable cost PLUS a fixed fee (lump-sum periodic payment or per-unit fixed allocation) that covers its fixed costs and provides a reasonable return. This structure achieves two objectives simultaneously: the buying division faces a marginal cost decision that encourages optimal internal transfer volume (since variable cost is the economically correct price for short-run make-or-buy decisions), while the selling division is not penalized for transferring internally — it recovers its full costs and can show a segment profit. Dual-rate pricing does NOT guarantee the selling division always reports a loss (it credits the selling division for fixed costs on every transfer, supporting profitability). It does NOT eliminate the need for transfer pricing policy (it is a specific type of policy). It does NOT always match the external market price — in fact, the variable-cost leg may be below the external market price if the selling division has a cost advantage, which is precisely why the buying division is motivated to transfer internally. A common exam trap is confusing dual-rate pricing with two-part tariff pricing — both involve two components, but two-part tariffs are used in external pricing (fixed access fee + per-unit usage fee), while dual-rate transfer pricing is internal to the organization.",
                "Topic": "Transfer Pricing and Value-Based Management",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D15-Q1"
            },
            {
                "Type": "select",
                "Prompt": "Overbrook ties executive compensation to economic value added to encourage long-term value creation. What is this approach broadly called?",
                "Choices": [
                    "Value-based management",
                    "Zero-based budgeting",
                    "Activity-based costing",
                    "Standard costing"
                ],
                "Correct": "Value-based management",
                "Explanation": "Under the IMA CMA Part 1 Section C syllabus (Performance Management), value-based management (VBM) is a comprehensive management approach that aligns a company's overall strategy, performance measurement, capital allocation, and compensation systems with the objective of maximizing shareholder value. The core premise is that traditional accounting metrics — such as net income, earnings per share, or return on investment — can diverge from value creation because they do not explicitly account for the cost of capital. VBM addresses this by adopting value-based metrics (primarily economic value added, or EVA) as the central performance measure. Under VBM, executive compensation is tied to EVA improvement or absolute EVA levels, ensuring that managers are rewarded only when they generate returns exceeding the cost of capital — this aligns management's incentives with shareholder interests. VBM also influences capital allocation: projects and divisions that generate positive EVA receive capital, while those destroying value are restructured or divested. Zero-based budgeting (Option B) is a budgeting approach requiring justification of all expenses from zero each period — it is unrelated to shareholder value measurement. Activity-based costing (Option C) is a cost assignment methodology that allocates overhead based on activities and cost drivers — it supports cost management but is not a broad performance management philosophy. Standard costing (Option D) is a cost control technique using predetermined costs for variance analysis — an operational tool, not a strategic management framework. A common exam trap is confusing the tool (EVA) with the management philosophy (VBM): EVA is the metric, while VBM is the organizational system built around that metric. VBM integrates strategy formulation, target setting, performance measurement, incentive compensation, and capital budgeting — making it far broader than any single metric.",
                "Topic": "Transfer Pricing and Value-Based Management",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D15-Q2"
            },
            {
                "Type": "numeric",
                "Prompt": "Overbrook's setup activity pool has 240,000 of cost and 1,600 setup hours. Division Q uses 120 setup hours. What setup cost is assigned to Division Q?",
                "Correct": "18000",
                "Explanation": "Under activity-based costing (ABC) in the IMA CMA Part 1 Section D syllabus (Cost Management), overhead costs are assigned using a two-stage process. In the first stage, overhead costs are accumulated into activity cost pools — in this case, the setup activity pool with $240,000 of total cost. In the second stage, costs are assigned to cost objects (products, customers, or in this case, a division) based on each object's consumption of the cost driver. Step 1 — Compute the activity rate: Activity rate = Total cost in activity pool / Total activity driver volume = $240,000 / 1,600 setup hours = $150 per setup hour. This rate represents the cost of consuming one setup hour of the company's setup resources. Step 2 — Assign cost to Division Q: Setup cost assigned = Activity rate × Division Q's consumption of the driver = $150 per setup hour × 120 setup hours = $18,000. This is the amount of setup overhead cost traced to Division Q based on its actual demand for setup resources. The fundamental logic of ABC is that products or divisions that consume more of a particular activity should bear more of that activity's cost — this is the cause-and-effect principle. Traditional volume-based costing might instead allocate the $240,000 based on a single driver like machine hours or direct labor hours, which could systematically over- or under-cost divisions depending on their relative consumption of setup activities versus the base driver. A common exam trap is dividing by the wrong denominator — ensure you use total driver volume (1,600 hours for the entire setup pool), not Division Q's usage (120 hours), when computing the activity rate. Another trap is multiplying the activity rate by an incorrect number of setup hours — always confirm that the quantity you multiply by is the division's actual consumption of the specific activity driver.",
                "Topic": "Transfer Pricing and Value-Based Management",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate",
                "DifficultyScore": 3,
                "CognitiveLevel": "Apply",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D15-Q3"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics of negotiated transfer pricing.",
                "Choices": [
                    "It preserves divisional autonomy",
                    "Managers reach a mutually acceptable price",
                    "It guarantees the companywide-optimal outcome in every case",
                    "It is set unilaterally by corporate headquarters with no input"
                ],
                "Correct": [
                    "It preserves divisional autonomy",
                    "Managers reach a mutually acceptable price"
                ],
                "Explanation": "Under transfer pricing in the IMA CMA Part 1 Section C syllabus (Performance Management), negotiated transfer pricing allows the managers of the buying and selling divisions to bargain and agree on a transfer price that is mutually acceptable — typically within a range bounded by the selling division's variable cost (the floor — the seller won't transfer below this because it would lose money on every unit) and the external market price (the ceiling — the buyer won't pay more because it could purchase externally for less). 'It preserves divisional autonomy' is correct — negotiated transfer pricing respects the decentralized decision-making authority of divisional managers. In a decentralized organization, divisional managers are empowered to make decisions in their division's best interest, and forcing a transfer price upon them would undermine that autonomy. 'Managers reach a mutually acceptable price' is correct — the defining characteristic of negotiated pricing is that both parties voluntarily agree to the price, reflecting each division's economic interests. 'It guarantees the companywide-optimal outcome in every case' is incorrect — while negotiated pricing can lead to optimal outcomes, it does not guarantee them. Managers may fail to reach agreement (dysfunctional behavior), the negotiation process itself may consume significant time and resources (dysfunctional cost), or the agreed-upon price may reflect the relative bargaining power of the parties rather than economic efficiency. 'It is set unilaterally by corporate headquarters with no input' is incorrect and describes dictated or mandated transfer pricing — the opposite approach, where top management imposes a price without divisional input. A common exam trap is confusing the advantages and disadvantages of different transfer pricing methods: negotiated pricing preserves autonomy but is time-consuming; cost-based pricing is simple but may distort decisions; market-based pricing is objective but may not exist for intermediate products with no external market.",
                "Topic": "Transfer Pricing and Value-Based Management",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Understand",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D15-Q4"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A positive economic value added indicates the division generated returns greater than its cost of ______.",
                "Correct": "capital",
                "Explanation": "Under the IMA CMA Part 1 Section C syllabus (Performance Management), economic value added (EVA) is a residual income measure that determines whether a division or company has generated returns in excess of its cost of capital. The basic formula is: EVA = Net operating profit after tax (NOPAT) − (Invested capital × Weighted-average cost of capital). Equivalently: EVA = (Return on invested capital − WACC) × Invested capital. A positive EVA means the division generated after-tax operating profit greater than the dollar cost of the capital employed to generate that profit — in other words, the company created shareholder value by earning more than what investors (both debt and equity holders) require as a return. A negative EVA means the division destroyed value — the returns generated were insufficient to cover the cost of the capital invested. The cost of capital is the weighted-average cost of the company's debt and equity financing, reflecting the minimum return that providers of capital expect to earn given the risk of the investment. EVA is superior to traditional accounting measures like net income or return on investment (ROI) for performance evaluation because it explicitly charges managers for the capital they consume. ROI can create dysfunctional incentives: a manager might reject a project that earns 12% (above the company's 10% cost of capital) if their division's current ROI is 15%, because accepting the project would lower their average ROI — even though the project creates value. EVA avoids this problem: any project earning more than the cost of capital increases EVA. A common exam trap is confusing EVA (after-tax, cost of capital explicit) with residual income (which can use a before-tax required rate of return) or with return on investment (which is a ratio, not a dollar measure).",
                "Topic": "Transfer Pricing and Value-Based Management",
                "StudyLinks": [
                    {
                        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
                        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
                    },
                    {
                        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
                        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
                    }
                ],
                "question_state": "Certified",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CognitiveLevel": "Remember",
                "ProductionStatus": "Production",
                "ItemID": "CASE-D15-Q5"
            }
        ],
        "question_state": "Certified",
        "ProductionStatus": "Production",
        "DifficultyScore": 3,
        "Version": "1.1",
        "CreatedDate": "2026-07-24",
        "ModifiedDate": "2026-07-26",
        "Author": "Migration Agent",
        "Confidence": 95,
        "RevisionHistory": [
            {
                "Date": "2026-07-24",
                "Version": "1.0",
                "Author": "Session 60 Migration",
                "Summary": "Migrated from MCQ pack to scored_cases file. Added governance metadata."
            },
            {
                "Date": "2026-07-26",
                "Version": "1.1",
                "Author": "S527 Wave 5 CAQS Certification",
                "Summary": "Expanded all 5 item explanations with authoritative citations (IMA CMA Sections C/D: dual-rate transfer pricing, value-based management/EVA, ABC activity rate computation, negotiated transfer pricing, EVA cost of capital). Added CognitiveLevel metadata (Understand x2, Apply x1, Remember x1). Added distractor rationale for all items. Numeric Q3 independently recalculated ($240,000/1,600 = $150/hr × 120 = $18,000). Difficulty recalibrated per Wave 2 standard. Certified: 5/5 items passed all 6 CAQS dimensions."
            }
        ],
        "ExhibitCount": 0,
        "QuestionCount": 5,
        "Difficulty": "Moderate"
    }
];
