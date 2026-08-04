// Enhanced 2026-style CMA Part 1 case simulations - Pack 3
// These cases are original study content and are not official IMA or Prometric material.


const ENHANCED_CASE_BASE3 = [
    {
        "CaseID": "CBQ3-A1",
        "Title": "Lease Accounting and Classification",
        "SectionTags": [
            "A"
        ],
        "Pack": 3,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "Subtopic": "Asset impairment testing",
        "PrimaryCompetency": "Calculation",
        "SecondaryCompetencies": [
            "Analysis",
            "Conceptual"
        ],
        "BlueprintObjectives": [
            "Lease accounting under ASC 842"
        ],
        "Topic": "Leases",
        "Confidence": 70,
        "EstimatedMinutes": 31,
        "ExhibitCount": 1,
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze lease accounting under ASC 842"
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
        "ScenarioText": "Meridian Logistics enters into a 5-year lease for a fleet of delivery trucks on January 1, Year 1. The trucks have an estimated economic life of 6 years and a fair value of $250,000. The lease requires annual payments of $55,000 at the end of each year. Meridian's incremental borrowing rate is 6%. The implicit rate is unknown.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Present Value Factors",
                "Headers": [
                    "Rate",
                    "Periods",
                    "PV of Ordinary Annuity"
                ],
                "Rows": [
                    [
                        "6%",
                        "5",
                        "4.212"
                    ],
                    [
                        "6%",
                        "6",
                        "4.917"
                    ]
                ],
                "ExhibitID": "CBQ3-A1-E1",
                "CaseID": "CBQ3-A1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "fill",
                "Prompt": "Under ASC 842, the lessee records a lease liability and a ______________ asset on the balance sheet.",
                "Correct": "right-of-use",
                "Explanation": "Under ASC 842, the lessee records a right-of-use (ROU) asset and a corresponding lease liability on the balance sheet for both operating and finance leases. This represents the lessee's right to use the leased asset over the lease term. The ROU asset is initially measured at the lease liability amount plus any prepayments, initial direct costs, and less lease incentives. This is a fundamental change from pre-ASC 842 guidance, under which operating leases were off-balance-sheet.",
                "Topic": "Lease Accounting",
                "ItemID": "CBQ3-A1-Q3",
                "CognitiveLevel": "Understand",
                "Difficulty": "Moderate-Easy",
                "DifficultyScore": 2,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology",
                    "MultipleConcepts"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ3-A1",
                "EstimatedMinutes": 3,
                "Pack": 3,
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
                "Prompt": "Calculate the present value of the lease payments (round to nearest dollar).",
                "Correct": 231660,
                "Explanation": "Under ASC 842, the present value of lease payments is calculated using the incremental borrowing rate (6%) since the implicit rate is unknown. Annual payment: $55,000. PV factor for 6% over 5 periods (ordinary annuity): 4.212. PV = $55,000 x 4.212 = $231,660. This present value is used to determine lease classification — if it equals or exceeds substantially all ($225,000 / 90% of $250,000 fair value), the lease is a finance lease. A common error is to use 6 periods (4.917) instead of 5, which would incorrectly yield $270,435.",
                "Topic": "Leases",
                "ItemID": "CBQ3-A1-Q1",
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
                "CaseID": "CBQ3-A1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "What is the lease liability balance at the end of Year 1 after the first payment? (Use the PV calculated previously).",
                "Correct": 190560,
                "Explanation": "Under ASC 842, the lease liability is amortized using the effective interest method. Beginning balance: $231,660. Interest expense for Year 1: $231,660 x 6% = $13,900. Principal reduction: $55,000 annual payment - $13,900 interest = $41,100. Ending lease liability: $231,660 - $41,100 = $190,560 (rounded). The $55,000 payment is split between interest expense (income statement) and lease liability reduction (balance sheet). A common error is to subtract the full $55,000 payment from the liability, ignoring that part of the payment represents interest rather than principal reduction.",
                "Topic": "Lease Amortization",
                "ItemID": "CBQ3-A1-Q4",
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
                "CaseID": "CBQ3-A1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Based on ASC 842, how should Meridian classify this lease?",
                "Correct": "Finance lease",
                "Explanation": "Under ASC 842, a lease is classified as a finance lease if any of five criteria are met. Here, the PV of lease payments ($231,660) exceeds substantially all (90%) of the fair value ($250,000 x 90% = $225,000). At 92.6%, the PV substantially exceeds substantially all of fair value — triggering finance lease classification. Operating lease ($231,660 > $225,000 rules this out), short-term lease (5-year term exceeds 12 months), and sale-leaseback (Meridian is the lessee, not a seller-lessee) are incorrect. A candidate reaching operating lease may have failed to compute or apply the PV/fair value test.",
                "Topic": "Lease Classification",
                "Choices": [
                    "Operating lease",
                    "Finance lease",
                    "Short-term lease",
                    "Sale-leaseback"
                ],
                "ItemID": "CBQ3-A1-Q2",
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
                "CaseID": "CBQ3-A1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Prompt": "Which of the following are criteria for a finance lease?",
                "Correct": [
                    "Lease term is major part of economic life",
                    "PV of lease payments equals or exceeds substantially all fair value",
                    "Ownership transfers at end of lease"
                ],
                "Explanation": "Under ASC 842-10-25-2, a lease is a finance lease if ANY of five criteria are met: (1) ownership transfers to the lessee by the end of the lease term; (2) the lessee has a purchase option reasonably certain to be exercised; (3) the lease term is for the major part of the asset's remaining economic life; (4) the present value of lease payments equals or exceeds substantially all of the fair value; (5) the asset is of a specialized nature with no alternative use to the lessor at the end of the term. The fourth option — 'The underlying asset is standard and easily replaced by the lessor' — is NOT a finance lease criterion; in fact, it may indicate an operating lease because the lessor can readily redeploy the asset.",
                "Topic": "Lease Criteria",
                "Choices": [
                    "Lease term is major part of economic life",
                    "PV of lease payments equals or exceeds substantially all fair value",
                    "Ownership transfers at end of lease",
                    "The underlying asset is standard and easily replaced by the lessor"
                ],
                "ItemID": "CBQ3-A1-Q5",
                "CognitiveLevel": "Evaluate",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ3-A1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
        "CaseID": "CBQ3-A2",
        "Title": "Cash Flow - Indirect Method",
        "SectionTags": [
            "A"
        ],
        "Pack": 3,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Cash Flows"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Cash Flows",
        "Subtopic": "Statement of cash flows preparation",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Financial reporting",
        "CompanyName": "Silverline Corp",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 36,
        "ExhibitCount": 1,
        "Industry": "Industrial equipment",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Calculate net cash from operating activities using indirect method",
            "Adjust net income for non-cash expenses and working capital changes",
            "Classify cash flows into operating, investing, and financing activities",
            "Reconcile gain/loss on asset sales in operating activities",
            "Analyze cash flow statement components and interrelationships"
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
        "Stakeholder": "Silverline Corp (Management)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Silverline Corp is preparing its Year 2 Statement of Cash Flows. Net income was $450,000. Depreciation expense was $60,000. The company sold equipment with a book value of $40,000 for $55,000, resulting in a gain. Accounts receivable increased by $25,000, Inventory decreased by $15,000, and Accounts Payable decreased by $30,000.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Additional Info",
                "Body": "Silverline declared and paid $50,000 in dividends and issued $100,000 in common stock during the year.",
                "ExhibitID": "CBQ3-A2-E1",
                "CaseID": "CBQ3-A2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the Net Cash Provided by Operating Activities.",
                "Correct": 455000,
                "Explanation": "NI(450k) + Depr(60k) - Gain(15k) - AR inc(25k) + Inv dec(15k) - AP dec(30k) = 455,000",
                "Topic": "Cash Flows",
                "ItemID": "CBQ3-A2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-A2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Calculate the Net Cash Provided by (Used in) Investing Activities.",
                "Correct": 55000,
                "Explanation": "Proceeds from sale of equipment = +$55,000. No other investing activities mentioned.",
                "Topic": "Cash Flows",
                "ItemID": "CBQ3-A2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-A2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Calculate the Net Cash Provided by Financing Activities.",
                "Correct": 50000,
                "Explanation": "Stock issuance (+100k) - Dividends paid (-50k) = +$50,000",
                "Topic": "Cash Flows",
                "ItemID": "CBQ3-A2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-A2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Where is the payment of dividends reported under US GAAP?",
                "Correct": "Financing activities",
                "Explanation": "Dividends paid are cash outflows from financing activities under US GAAP.",
                "Topic": "Cash Flows",
                "Choices": [
                    "Operating activities",
                    "Investing activities",
                    "Financing activities",
                    "Supplemental disclosures"
                ],
                "ItemID": "CBQ3-A2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-A2",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Type": "match",
                "Prompt": "Match the cash flow activity to its classification.",
                "Correct": {
                    "Depreciation expense": "Add back to Net Income (Operating)",
                    "Gain on sale of asset": "Deduct from Net Income (Operating)",
                    "Decrease in inventory": "Add to Net Income (Operating)",
                    "Decrease in accounts payable": "Deduct from Net Income (Operating)"
                },
                "Explanation": "Reconciling items for indirect method operating cash flows.",
                "Topic": "Cash Flows",
                "LeftItems": [
                    "Depreciation expense",
                    "Gain on sale of asset",
                    "Decrease in inventory",
                    "Decrease in accounts payable"
                ],
                "RightItems": [
                    "Add back to Net Income (Operating)",
                    "Deduct from Net Income (Operating)",
                    "Add to Net Income (Operating)",
                    "Report in Investing Activities"
                ],
                "ItemID": "CBQ3-A2-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology"
                ],
                "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-A2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        ],
        "question_state": "Certified",
        "pack_state": "Draft",
        "pedagogical_cluster": "",
        "question_tier": "Ungraded",
        "question_status": "Active"
    },
    {
        "CaseID": "CBQ3-B1",
        "Title": "Cash Collections Budgeting",
        "SectionTags": [
            "B"
        ],
        "Pack": 3,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Cash Budgeting",
            "Master Budget",
            "Working Capital Management",
            "Budget Types"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Cash Budgeting",
        "Subtopic": "Cash flow forecasting",
        "SecondaryCompetencies": [
            "Analysis",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Highland Retail",
        "CompanyType": "Retailer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 31,
        "ExhibitCount": 1,
        "Industry": "Retail",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze cash budgeting",
            "Analyze cash budgeting",
            "Analyze master budget",
            "Analyze working capital management",
            "Analyze budget types"
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
        "Stakeholder": "Highland Retail (Management)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Highland Retail is budgeting cash collections for Q2. Sales are 20% cash and 80% credit. Credit sales are collected: 50% in the month of sale, 40% in the month following, and 8% in the second month following (2% is uncollectible).",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Budgeted and Actual Sales",
                "Headers": [
                    "Month",
                    "Total Sales"
                ],
                "Rows": [
                    [
                        "February (Actual)",
                        "$200,000"
                    ],
                    [
                        "March (Actual)",
                        "$250,000"
                    ],
                    [
                        "April (Budget)",
                        "$300,000"
                    ],
                    [
                        "May (Budget)",
                        "$350,000"
                    ]
                ],
                "ExhibitID": "CBQ3-B1-E1",
                "CaseID": "CBQ3-B1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the total cash collected in April.",
                "Correct": 272800,
                "Explanation": "Cash sales: 300k * 20% = 60k. April credit: 300k * 80% * 50% = 120k. March credit: 250k * 80% * 40% = 80k. Feb credit: 200k * 80% * 8% = 12.8k. Total = 60k + 120k + 80k + 12.8k = 272,800.",
                "Topic": "Cash Budgeting",
                "ItemID": "CBQ3-B1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CommonTrapReference": "Trap 5: Cash Budget",
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Budget",
                "Pack": 3,
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
                "Prompt": "Calculate the Accounts Receivable balance at the end of April (arising from March and April sales only).",
                "Correct": 140000,
                "Explanation": "April uncollected: 300k * 80% * 50% = 120k. March uncollected: 250k * 80% * 10% = 20k. Total = 140,000.",
                "Topic": "Cash Budgeting",
                "ItemID": "CBQ3-B1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CommonTrapReference": "Trap 5: Cash Budget",
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Budget",
                "Pack": 3,
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
                "Type": "multi",
                "Prompt": "Which of the following budgets must be completed before the Cash Budget?",
                "Correct": [
                    "Sales Budget",
                    "Production Budget",
                    "Direct Materials Budget",
                    "Capital Expenditure Budget"
                ],
                "Explanation": "All operating budgets and capital budgets feed into the cash budget. Budgeted balance sheet is the last step.",
                "Topic": "Master Budget",
                "Choices": [
                    "Sales Budget",
                    "Production Budget",
                    "Direct Materials Budget",
                    "Capital Expenditure Budget",
                    "Budgeted Balance Sheet"
                ],
                "ItemID": "CBQ3-B1-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "If the company tightens credit terms to 2/10, net 30, what is the most likely immediate impact?",
                "Correct": "Accelerated cash inflows but potentially lower overall sales",
                "Explanation": "Discounts accelerate collections but tighter terms may deter some marginal credit customers.",
                "Topic": "Working Capital Management",
                "Choices": [
                    "Accelerated cash inflows but potentially lower overall sales",
                    "Decreased bad debt expense and higher sales volume",
                    "No change to cash flows",
                    "Higher inventory turnover"
                ],
                "ItemID": "CBQ3-B1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Prompt": "A budget that is continuously updated by adding a new month/quarter as the current one drops is called a __________ budget.",
                "Correct": "rolling",
                "Explanation": "Also known as a continuous or rolling budget.",
                "Topic": "Budget Types",
                "ItemID": "CBQ3-B1-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B1",
                "EstimatedMinutes": 3,
                "Pack": 3,
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
        "CaseID": "CBQ3-B2",
        "Title": "Direct Labor and Manufacturing Overhead Budget",
        "SectionTags": [
            "B"
        ],
        "Pack": 3,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Direct labor budget",
            "Manufacturing overhead budget",
            "Overhead application rate",
            "Overhead cost behavior",
            "Overhead application"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Direct Labor Budget",
        "Subtopic": "Direct labor and overhead planning",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Tech Assembly",
        "CompanyType": "Service provider",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Laboratory services",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze direct labor budget",
            "Analyze manufacturing overhead budget",
            "Analyze overhead application rate",
            "Analyze overhead cost behavior",
            "Analyze overhead application",
            "Analyze budget formulas"
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
        "Stakeholder": "Elena Torres (Tech Assembly (COO))",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "MedTech Assembly is preparing its labor and overhead budget for the third quarter. Production Manager Elena Torres needs to determine staffing requirements, total labor cost, and overhead application rates. The COO wants to know whether expanding to a second shift in September would reduce the overhead cost per unit enough to justify the investment.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Production Plan",
                "Headers": [
                    "Month",
                    "Budgeted Units",
                    "Direct Labor Hours per Unit"
                ],
                "Rows": [
                    [
                        "July",
                        "8,000",
                        "1.5"
                    ],
                    [
                        "August",
                        "10,000",
                        "1.5"
                    ],
                    [
                        "September",
                        "12,000",
                        "1.5"
                    ]
                ],
                "ExhibitID": "CBQ3-B2-E1",
                "CaseID": "CBQ3-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 - Cost Standards",
                "Headers": [
                    "Cost Component",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Direct labor rate per hour",
                        "$22"
                    ],
                    [
                        "Variable overhead rate per DLH",
                        "$8"
                    ],
                    [
                        "Fixed manufacturing overhead (monthly)",
                        "$180,000"
                    ],
                    [
                        "Denominator activity (monthly DLH)",
                        "15,000"
                    ]
                ],
                "ExhibitID": "CBQ3-B2-E2",
                "CaseID": "CBQ3-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Enter the budgeted direct labor cost for July.",
                "Correct": "264000",
                "Explanation": "8,000 units x 1.5 DLH per unit = 12,000 DLH. 12,000 DLH x $22 = $264,000. A common error is to use selling price or omit the DLH per unit.",
                "Topic": "Direct labor budget",
                "ItemID": "CBQ3-B2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "BusinessInterpretation": "H x $22 = $264,000. A common error is to use selling price or omit the DLH per unit.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Enter the total budgeted manufacturing overhead cost for July (variable + fixed).",
                "Correct": "276000",
                "Explanation": "Variable OH: 12,000 DLH x $8 = $96,000. Fixed OH: $180,000. Total = $96,000 + $180,000 = $276,000. A common error is to treat fixed overhead as variable or vice versa.",
                "Topic": "Manufacturing overhead budget",
                "ItemID": "CBQ3-B2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "BusinessInterpretation": "180,000 = $276,000. A common error is to treat fixed overhead as variable or vice versa.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Enter the predetermined total overhead rate per direct labor hour using denominator activity.",
                "Correct": "20",
                "Explanation": "Variable rate: $8/DLH. Fixed rate: $180,000 / 15,000 DLH = $12/DLH. Total rate: $8 + $12 = $20/DLH. A common error is to use only the variable or only the fixed rate.",
                "Topic": "Overhead application rate",
                "ItemID": "CBQ3-B2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "Terminology"
                ],
                "BusinessInterpretation": "$8 + $12 = $20/DLH. A common error is to use only the variable or only the fixed rate.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "What effect would adding a second shift in September have on budgeted fixed overhead cost?",
                "Choices": [
                    "Total fixed overhead cost increases proportionally with production hours",
                    "Total fixed overhead cost remains unchanged; per-unit fixed overhead decreases",
                    "Per-unit fixed overhead remains constant as production increases",
                    "Fixed overhead becomes a variable cost under the second shift"
                ],
                "Correct": "Total fixed overhead cost remains unchanged; per-unit fixed overhead decreases",
                "Explanation": "Fixed overhead is a capacity cost that does not change within the relevant range. Higher production volume spreads fixed costs over more units, reducing per-unit fixed overhead. Adding a second shift may eventually increase total fixed cost if capacity is exceeded, but within the existing range, total fixed cost stays constant.",
                "Topic": "Overhead cost behavior",
                "ItemID": "CBQ3-B2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Costs classified as variable, fixed, or mixed based on how total cost changes with activity.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "DecisionTreeReference": "Cost Behavior",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Prompt": "Select the true statements about manufacturing overhead budgeting.",
                "Choices": [
                    "Fixed manufacturing overhead per unit decreases as production volume increases",
                    "The predetermined overhead rate is calculated at the beginning of the budget period",
                    "Applied overhead equals the predetermined rate multiplied by actual activity",
                    "Variable manufacturing overhead is not included in the predetermined overhead rate"
                ],
                "Correct": [
                    "Fixed manufacturing overhead per unit decreases as production volume increases",
                    "The predetermined overhead rate is calculated at the beginning of the budget period",
                    "Applied overhead equals the predetermined rate multiplied by actual activity"
                ],
                "Explanation": "Fixed OH per unit decreases with higher volume (spreading effect). The predetermined rate is set before the period begins for timely product costing. Applied OH = predetermined rate x actual activity. Variable OH is always included in the predetermined rate.",
                "Topic": "Overhead application",
                "ItemID": "CBQ3-B2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Match each budget component to its correct calculation formula.",
                "LeftItems": [
                    "Direct labor budget",
                    "Variable overhead budget",
                    "Fixed overhead budget",
                    "Applied manufacturing overhead"
                ],
                "RightItems": [
    "Remains constant within the relevant range",
    "Units produced x DLH per unit x Wage rate",
    "Predetermined OH rate x Actual activity",
    "Units sold x Selling price",
    "Actual DLH x Variable OH rate per DLH"
],
                "Correct": {
                    "Direct labor budget": "Units produced x DLH per unit x Wage rate",
                    "Variable overhead budget": "Actual DLH x Variable OH rate per DLH",
                    "Fixed overhead budget": "Remains constant within the relevant range",
                    "Applied manufacturing overhead": "Predetermined OH rate x Actual activity"
                },
                "Explanation": "The direct labor budget is driven by production units, hours per unit, and wage rate. Variable overhead varies with actual DLH. Fixed overhead is capacity cost and stays constant. Applied OH uses the predetermined rate (combining variable and fixed) and actual activity. Units sold x selling price is the sales budget, not an overhead component.",
                "Topic": "Budget formulas",
                "ItemID": "CBQ3-B2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-B3",
        "Title": "Comprehensive Profit Planning Using CVP Analysis",
        "SectionTags": [
            "B"
        ],
        "Pack": 3,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Contribution margin",
            "Break-even analysis",
            "Margin of safety",
            "Target profit analysis",
            "CVP assumptions"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Strategic Planning",
        "Subtopic": "Cost-volume-profit analysis",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Coastal Drinks",
        "CompanyType": "Processor",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Food and beverage",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze contribution margin",
            "Analyze break-even analysis",
            "Analyze margin of safety",
            "Analyze target profit analysis",
            "Analyze cvp assumptions",
            "Analyze cvp formulas"
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
        "Stakeholder": "Rachel Nguyen (Coastal Drinks (CFO))",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Coastal Drinks is preparing its annual profit plan. CFO Rachel Nguyen must determine the break-even point, margin of safety, and the sales volume required to achieve target operating income under a proposed expansion. The board has approved a $500,000 capacity expansion that would increase total fixed costs. Rachel must determine whether the contribution margin can support the new cost structure within the existing capacity constraint.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Current Product Data",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Selling price per unit",
                        "$25"
                    ],
                    [
                        "Variable cost per unit",
                        "$15"
                    ],
                    [
                        "Total fixed costs (current)",
                        "$400,000"
                    ],
                    [
                        "Budgeted sales volume",
                        "60,000 units"
                    ]
                ],
                "ExhibitID": "CBQ3-B3-E1",
                "CaseID": "CBQ3-B3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 - Expansion Proposal",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Additional fixed costs if expansion approved",
                        "$500,000"
                    ],
                    [
                        "New total fixed costs",
                        "$900,000"
                    ],
                    [
                        "Target operating income under expansion",
                        "$300,000"
                    ],
                    [
                        "Maximum production capacity",
                        "100,000 units"
                    ]
                ],
                "ExhibitID": "CBQ3-B3-E2",
                "CaseID": "CBQ3-B3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Enter the contribution margin per unit.",
                "Correct": "10",
                "Explanation": "$25 - $15 = $10 per unit. Contribution margin is the amount remaining after variable costs to cover fixed costs and generate profit. A common error is to use gross margin or to omit per-unit classification.",
                "Topic": "Contribution margin",
                "ItemID": "CBQ3-B3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 1: Contribution Margin vs Gross Margin",
                "AccountingPrinciple": "Contribution Margin = Sales - Variable Costs. Measures amount available to cover fixed costs.",
                "BusinessInterpretation": "nd generate profit. A common error is to use gross margin or to omit per-unit classification.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "DecisionTreeReference": "Contribution Margin vs Gross Margin",
                "EstimatedMinutes": 5,
                "FormulaReference": "Contribution Margin",
                "Pack": 3,
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
                "Prompt": "Enter the break-even point in units under the current cost structure.",
                "Correct": "40000",
                "Explanation": "$400,000 / $10 = 40,000 units. Break-even is the point where total revenue equals total cost. A common error is to use selling price alone in the denominator.",
                "Topic": "Break-even analysis",
                "ItemID": "CBQ3-B3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "BusinessInterpretation": "equals total cost. A common error is to use selling price alone in the denominator.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "DecisionTreeReference": "Cost Behavior",
                "EstimatedMinutes": 5,
                "FormulaReference": "Break-even Point (Units)",
                "Pack": 3,
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
                "Prompt": "Enter the margin of safety in units at the budgeted sales volume under the current structure.",
                "Correct": "20000",
                "Explanation": "60,000 budgeted units - 40,000 break-even units = 20,000 units. Margin of safety measures how much sales can decline before reaching break-even. A common error is to express this in dollars without converting or to use the wrong base.",
                "Topic": "Margin of safety",
                "ItemID": "CBQ3-B3-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "BusinessInterpretation": "eaching break-even. A common error is to express this in dollars without converting or to use the wrong base.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "DecisionTreeReference": "Cost Behavior",
                "EstimatedMinutes": 5,
                "FormulaReference": "Margin of Safety",
                "Pack": 3,
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
                "Prompt": "Based on the capacity constraint, can Coastal achieve the $300,000 target operating income under the expansion?",
                "Choices": [
                    "Yes, the required volume of 80,000 units is within the 100,000 unit capacity",
                    "Yes, the expansion adds enough capacity to meet the target",
                    "No, the required volume of 120,000 units exceeds the 100,000 unit capacity",
                    "No, the contribution margin is too low to cover any fixed costs"
                ],
                "Correct": "No, the required volume of 120,000 units exceeds the 100,000 unit capacity",
                "Explanation": "Required volume = ($900,000 + $300,000) / $10 = 120,000 units. Since maximum capacity is 100,000 units, the target is not achievable without changing price, costs, or the target itself. This illustrates the importance of capacity constraints in profit planning.",
                "Topic": "Target profit analysis",
                "ItemID": "CBQ3-B3-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Prompt": "Which assumptions must hold for the CVP analysis to be valid?",
                "Choices": [
                    "Selling price remains constant at all volume levels",
                    "Variable cost per unit is constant",
                    "Total fixed costs remain constant within the relevant range",
                    "The sales mix shifts unpredictably during the budget period"
                ],
                "Correct": [
                    "Selling price remains constant at all volume levels",
                    "Variable cost per unit is constant",
                    "Total fixed costs remain constant within the relevant range"
                ],
                "Explanation": "CVP analysis assumes constant selling price, constant variable cost per unit, and fixed costs that remain fixed within the relevant range. A shifting sales mix would violate CVP assumptions because it changes the weighted-average contribution margin.",
                "Topic": "CVP assumptions",
                "ItemID": "CBQ3-B3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Match each CVP concept to its correct formula.",
                "LeftItems": [
                    "Contribution margin per unit",
                    "Break-even point (units)",
                    "Margin of safety (units)",
                    "Operating leverage"
                ],
                "RightItems": [
    "Total revenue minus total cost",
    "Contribution margin divided by operating income",
    "Fixed costs divided by contribution margin per unit",
    "Actual sales minus break-even sales",
    "Selling price minus variable cost per unit"
],
                "Correct": {
                    "Contribution margin per unit": "Selling price minus variable cost per unit",
                    "Break-even point (units)": "Fixed costs divided by contribution margin per unit",
                    "Margin of safety (units)": "Actual sales minus break-even sales",
                    "Operating leverage": "Contribution margin divided by operating income"
                },
                "Explanation": "CM per unit is selling price minus variable cost. Break-even units equals fixed costs divided by CM per unit. Margin of safety measures the cushion above break-even. Operating leverage indicates how sensitive operating income is to volume changes. Total revenue minus total cost is the profit equation, not any single CVP metric.",
                "Topic": "CVP formulas",
                "ItemID": "CBQ3-B3-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "Terminology",
                    "MultipleConcepts"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-B3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-C1",
        "Title": "Balanced Scorecard Metrics",
        "SectionTags": [
            "C"
        ],
        "Pack": 3,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Balanced Scorecard Metrics"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Balanced Scorecard Metrics",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Nexus Manufacturing",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Industrial automation",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze balanced scorecard metrics",
            "Analyze balanced scorecard metrics",
            "Analyze balanced scorecard metrics",
            "Analyze balanced scorecard metrics",
            "Analyze balanced scorecard metrics"
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
                "Summary": "Full content authoring — balanced scorecard KPI mapping to four perspectives"
            }
        ],
        "Stakeholder": "VP of Strategy",
        "Tags": [
            "balanced scorecard",
            "KPIs",
            "performance measurement",
            "strategy mapping",
            "leading indicators",
            "lagging indicators"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Nexus Manufacturing produces industrial automation components with 1,800 employees and annual revenue of $340 million. The company has strong financial performance but the CEO is concerned about lagging indicators in customer satisfaction and innovation. The strategy team has developed a balanced scorecard initiative to translate the company's strategic objectives into measurable KPIs across four perspectives: Financial, Customer, Internal Business Process, and Learning and Growth. Each question presents a set of business objectives that must be mapped to the correct balanced scorecard perspective.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Nexus Manufacturing Strategic Objectives and Current Performance",
                "Headers": [
                    "Strategic Objective",
                    "Current KPI",
                    "Target",
                    "Status"
                ],
                "Rows": [
                    [
                        "Increase shareholder value",
                        "ROCE",
                        "18%",
                        "On track at 16.5%"
                    ],
                    [
                        "Improve on-time delivery",
                        "On-time delivery rate",
                        "98%",
                        "Below target at 91%"
                    ],
                    [
                        "Reduce product defects",
                        "Defect rate per 1,000 units",
                        "< 2",
                        "Currently 4.7"
                    ],
                    [
                        "Increase employee certifications",
                        "% certified workforce",
                        "85%",
                        "Currently 62%"
                    ],
                    [
                        "Expand customer base",
                        "New customer acquisition",
                        "12% growth",
                        "Currently 5% growth"
                    ]
                ],
                "ExhibitID": "CBQ3-C1-E1",
                "CaseID": "CBQ3-C1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Nexus Manufacturing's strategy team has identified the following financial performance objectives. Match each objective to the correct balanced scorecard perspective indicator type.",
                "LeftItems": [
                    "Increase return on capital employed (ROCE) to 18%",
                    "Reduce cost of goods sold by 5% through process improvements",
                    "Increase revenue from new product lines to 25% of total sales",
                    "Achieve operating cash flow sufficient to fund capital expenditures"
                ],
                "RightItems": [
    "Financial — cost efficiency",
    "Financial — revenue growth",
    "Financial — liquidity and investment",
    "Customer — satisfaction",
    "Financial — profitability"
],
                "Correct": {
                    "Increase return on capital employed (ROCE) to 18%": "Financial — profitability",
                    "Reduce cost of goods sold by 5% through process improvements": "Financial — cost efficiency",
                    "Increase revenue from new product lines to 25% of total sales": "Financial — revenue growth",
                    "Achieve operating cash flow sufficient to fund capital expenditures": "Financial — liquidity and investment"
                },
                "Explanation": "All four objectives are Financial perspective metrics. ROCE measures profitability. COGS reduction measures cost efficiency. New product revenue measures revenue growth. Operating cash flow measures liquidity and investment capacity. The distractor \"Customer — satisfaction\" belongs to the Customer perspective, not Financial. In the balanced scorecard, financial objectives measure how the company creates value for shareholders through profitability, growth, and risk management.",
                "Topic": "Balanced scorecard — financial perspective",
                "ItemID": "CBQ3-C1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The balanced scorecard (Kaplan & Norton) translates strategy into operational objectives across four perspectives. Financial perspective measures focus on profitability, growth, and shareholder value — the lagging indicators of strategic success.",
                "BusinessInterpretation": "Financial perspective targets must be cascaded from strategic goals. ROCE is a common CMA topic that links the income statement and balance sheet in measuring overall business performance.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The Customer perspective of the balanced scorecard focuses on how the company creates value for its target customers. Match each customer objective to its specific measurement focus.",
                "LeftItems": [
                    "Improve on-time delivery rate from 91% to 98%",
                    "Increase Net Promoter Score (NPS) from +32 to +50",
                    "Reduce customer churn rate from 15% to 8%",
                    "Increase market share in industrial automation from 12% to 18%"
                ],
                "RightItems": [
    "Customer — customer loyalty and satisfaction",
    "Customer — customer retention",
    "Customer — operational excellence",
    "Financial — revenue growth",
    "Customer — market position"
],
                "Correct": {
                    "Improve on-time delivery rate from 91% to 98%": "Customer — operational excellence",
                    "Increase Net Promoter Score (NPS) from +32 to +50": "Customer — customer loyalty and satisfaction",
                    "Reduce customer churn rate from 15% to 8%": "Customer — customer retention",
                    "Increase market share in industrial automation from 12% to 18%": "Customer — market position"
                },
                "Explanation": "On-time delivery reflects operational excellence from the customer's perspective. NPS measures customer loyalty and satisfaction. Churn rate measures customer retention. Market share measures competitive position. The distractor \"Financial — revenue growth\" would belong to the Financial perspective. Customer perspective metrics are leading indicators of financial performance — satisfied, loyal customers drive future revenue growth.",
                "Topic": "Balanced scorecard — customer perspective",
                "ItemID": "CBQ3-C1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The balanced scorecard's customer perspective identifies targeted customer segments and measures the value proposition. Customer metrics are leading indicators that drive financial outcomes.",
                "BusinessInterpretation": "Companies with high customer satisfaction and retention typically achieve more predictable revenue growth and lower customer acquisition costs. These metrics are critical for long-term profitability.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The Internal Business Process perspective identifies the critical processes where the company must excel. Match each process improvement objective to the correct process type.",
                "LeftItems": [
                    "Reduce defect rate from 4.7 to below 2 per 1,000 units",
                    "Reduce order-to-delivery cycle time from 14 days to 7 days",
                    "Implement a supplier quality certification program",
                    "Automate inventory replenishment to reduce stockouts by 50%"
                ],
                "RightItems": [
    "Operations management — cycle time",
    "Supplier management — quality assurance",
    "Operations management — quality",
    "Customer management — satisfaction",
    "Inventory management — efficiency"
],
                "Correct": {
                    "Reduce defect rate from 4.7 to below 2 per 1,000 units": "Operations management — quality",
                    "Reduce order-to-delivery cycle time from 14 days to 7 days": "Operations management — cycle time",
                    "Implement a supplier quality certification program": "Supplier management — quality assurance",
                    "Automate inventory replenishment to reduce stockouts by 50%": "Inventory management — efficiency"
                },
                "Explanation": "Defect rate reduction is an operations quality metric. Cycle time reduction measures operational efficiency. Supplier certification is a supplier management process. Inventory automation is an inventory management process. The distractor \"Customer management — satisfaction\" would be a Customer perspective metric. Internal Business Process metrics focus on the processes that create and deliver the customer value proposition.",
                "Topic": "Balanced scorecard — internal business process perspective",
                "ItemID": "CBQ3-C1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The internal business process perspective in the balanced scorecard focuses on operations management, customer management, innovation, and regulatory/social processes that create value.",
                "BusinessInterpretation": "Operational excellence metrics (quality, cycle time, cost) are critical leading indicators. Improving internal processes typically has a direct impact on customer satisfaction and financial performance.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The Learning and Growth perspective focuses on the intangible assets needed to support the other perspectives. Match each capability-building objective to its correct focus area.",
                "LeftItems": [
                    "Increase employee certification rate from 62% to 85%",
                    "Implement an enterprise-wide CRM system to improve customer data analytics",
                    "Establish a culture of continuous improvement with 100% employee participation in Kaizen events",
                    "Launch a leadership development program for middle managers"
                ],
                "RightItems": [
    "Organization capital — culture and alignment",
    "Human capital — leadership development",
    "Human capital — employee skills and competencies",
    "Information capital — technology infrastructure",
    "Financial capital — investment returns"
],
                "Correct": {
                    "Increase employee certification rate from 62% to 85%": "Human capital — employee skills and competencies",
                    "Implement an enterprise-wide CRM system to improve customer data analytics": "Information capital — technology infrastructure",
                    "Establish a culture of continuous improvement with 100% employee participation in Kaizen events": "Organization capital — culture and alignment",
                    "Launch a leadership development program for middle managers": "Human capital — leadership development"
                },
                "Explanation": "Employee certifications build skills and competencies (human capital). CRM implementation builds technology infrastructure (information capital). Kaizen culture creates organizational alignment (organization capital). Leadership development builds human capital at the management level. The distractor \"Financial capital — investment returns\" belongs to the Financial perspective. Learning and Growth metrics are the most leading of all indicators — investments here drive improvements in internal processes, which drive customer satisfaction, which ultimately drives financial results.",
                "Topic": "Balanced scorecard — learning and growth perspective",
                "ItemID": "CBQ3-C1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The learning and growth perspective measures the organization's ability to innovate, improve, and learn. It includes human capital (skills), information capital (systems), and organization capital (culture, leadership).",
                "BusinessInterpretation": "Learning and growth metrics are the most leading indicators. Organizations that neglect employee development and technology infrastructure often see declining performance in the other three perspectives over time.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The balanced scorecard distinguishes between leading and lagging indicators. Match each KPI to its correct classification as a leading or lagging indicator of financial performance.",
                "LeftItems": [
                    "Employee training hours completed",
                    "Customer satisfaction score (NPS)",
                    "On-time delivery rate",
                    "Return on capital employed (ROCE)"
                ],
                "RightItems": [
    "Lagging indicator — measures the outcome of past strategic actions",
    "Lagging indicator — employee turnover rate",
    "Leading indicator — customer satisfaction predicts future revenue",
    "Leading indicator — operational quality drives customer retention",
    "Leading indicator — investments in human capital drive future performance"
],
                "Correct": {
                    "Employee training hours completed": "Leading indicator — investments in human capital drive future performance",
                    "Customer satisfaction score (NPS)": "Leading indicator — customer satisfaction predicts future revenue",
                    "On-time delivery rate": "Leading indicator — operational quality drives customer retention",
                    "Return on capital employed (ROCE)": "Lagging indicator — measures the outcome of past strategic actions"
                },
                "Explanation": "Leading indicators predict future performance. Training hours, NPS, and on-time delivery are all leading indicators — improvements in these areas should eventually drive financial results. ROCE is a lagging indicator because it measures the financial outcome of past decisions and actions. Employee turnover rate would also be a leading indicator (it predicts future workforce capability issues), not a lagging one. Understanding the difference between leading and lagging indicators is essential for balanced scorecard design.",
                "Topic": "Leading vs lagging indicators in balanced scorecard",
                "ItemID": "CBQ3-C1-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity",
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "The balanced scorecard theory emphasizes that leading indicators (performance drivers) predict lagging indicators (outcome measures). Financial measures are typically lagging while operational measures are often leading.",
                "BusinessInterpretation": "Management accountants should identify which leading indicators are most predictive of financial outcomes for their specific business. A well-designed scorecard has a balance of both types with clear cause-effect relationships.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-C2",
        "Title": "Transfer Pricing",
        "SectionTags": [
            "C"
        ],
        "Pack": 3,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Transfer Pricing"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Transfer Pricing",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Apex Components",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Evaluate transfer pricing methods for goal congruence",
            "Compute divisional operating income under market-based transfer pricing",
            "Analyze factors influencing transfer pricing decisions",
            "Match transfer pricing methods to business scenarios",
            "Evaluate behavioral implications of transfer pricing policy"
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
        "Stakeholder": "CFO",
        "Tags": [
            "transfer pricing",
            "goal congruence",
            "divisional performance"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Apex Components is a diversified industrial manufacturer organized into two divisions. Division A (Semiconductor Division) manufactures microchips that can be sold externally or transferred internally to Division B (Device Division), which uses the chips in finished IoT monitoring devices. The corporate controller is evaluating transfer pricing alternatives to ensure goal congruence while fairly measuring divisional performance.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: Division A — Cost and Capacity Data",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Variable manufacturing cost per chip",
                        "$30"
                    ],
                    [
                        "Fixed manufacturing cost per chip (at full capacity)",
                        "$12"
                    ],
                    [
                        "Full absorption cost per chip",
                        "$42"
                    ],
                    [
                        "External market price per chip",
                        "$50"
                    ],
                    [
                        "Annual production capacity (chips)",
                        "200,000"
                    ],
                    [
                        "External customer demand (chips)",
                        "150,000"
                    ],
                    [
                        "Internal demand from Division B (chips)",
                        "40,000"
                    ],
                    [
                        "Division B external selling price per IoT device",
                        "$120"
                    ],
                    [
                        "Division B other variable costs per device (excluding chip)",
                        "$55"
                    ],
                    [
                        "Division B fixed costs per device (at 40,000 units)",
                        "$18"
                    ],
                    [
                        "Division B external market demand (devices)",
                        "50,000"
                    ]
                ],
                "ExhibitID": "CBQ3-C2-E1",
                "CaseID": "CBQ3-C2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-C2-Q1",
                    "CBQ3-C2-Q2"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Division A Revenue and Income Under Different Transfer Prices (40,000 internal units)",
                "Headers": [
                    "",
                    "Market Price ($50)",
                    "Full Cost ($42)",
                    "Variable Cost ($30)",
                    "Negotiated ($46)"
                ],
                "Rows": [
                    [
                        "Internal revenue",
                        "$2,000,000",
                        "$1,680,000",
                        "$1,200,000",
                        "$1,840,000"
                    ],
                    [
                        "Internal variable cost",
                        "$1,200,000",
                        "$1,200,000",
                        "$1,200,000",
                        "$1,200,000"
                    ],
                    [
                        "Internal contribution margin",
                        "$800,000",
                        "$480,000",
                        "$0",
                        "$640,000"
                    ],
                    [
                        "External revenue (150,000 units)",
                        "$7,500,000",
                        "$7,500,000",
                        "$7,500,000",
                        "$7,500,000"
                    ],
                    [
                        "Total divisional contribution margin",
                        "$5,300,000",
                        "$4,980,000",
                        "$4,500,000",
                        "$5,140,000"
                    ],
                    [
                        "Division fixed costs (200,000 × $12)",
                        "$2,400,000",
                        "$2,400,000",
                        "$2,400,000",
                        "$2,400,000"
                    ],
                    [
                        "Division A operating income",
                        "$2,900,000",
                        "$2,580,000",
                        "$2,100,000",
                        "$2,740,000"
                    ]
                ],
                "ExhibitID": "CBQ3-C2-E2",
                "CaseID": "CBQ3-C2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-C2-Q2",
                    "CBQ3-C2-Q4"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "Using Exhibit 1 and Exhibit 2, if Division A sells all 150,000 chips externally at $50 and Division B must purchase chips from an external supplier at $52 per chip due to Division A's refusal to sell internally at market price, what is the impact on total company operating income compared to Division A selling 110,000 externally and 40,000 internally at $50?",
                "Correct": "Company operating income decreases by $80,000 — Division B pays $52 externally instead of $50 internally, adding $2 per chip × 40,000 = $80,000 in additional cost with no corresponding benefit to Division A",
                "Choices": [
                    "Company operating income decreases by $80,000 — Division B pays $52 externally instead of $50 internally, adding $2 per chip × 40,000 = $80,000 in additional cost with no corresponding benefit to Division A",
                    "Company operating income is unchanged — Division A still receives $50 per chip and Division B still pays $50 per chip regardless of the source",
                    "Company operating income increases by $80,000 — Division A saves capacity and Division B still sources chips at a competitive price",
                    "Company operating income decreases by $2,000,000 — the full internal revenue is lost when Division A refuses to sell internally"
                ],
                "Explanation": "When Division A sells externally and Division B buys externally, the total company cost increases by the $2 price difference ($52 external vs $50 internal) on 40,000 chips = $80,000. Division A's revenue is unchanged (it sells all 150,000 externally at $50 either way). The $80,000 is a deadweight loss to the company — it represents the profit that could have been retained if the internal transfer occurred at market price. This illustrates why goal congruence is critical: division managers optimized their individual P&Ls but suboptimized overall company profit.",
                "Topic": "Goal congruence failure — external sourcing cost impact",
                "ItemID": "CBQ3-C2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Goal congruence requires that decisions maximizing divisional profit also maximize company-wide profit. When internal transfers at market price are replaced by external purchases at a higher price, the company incurs an unnecessary cost that reduces overall profitability.",
                "BusinessInterpretation": "This scenario illustrates a classic transfer pricing conflict. Corporate policy should mandate internal transfers at market price when capacity exists. Some companies use dual pricing — crediting the selling division at market price while charging the buying division at cost — to resolve goal conflicts.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-C2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "The corporate controller is evaluating transfer pricing alternatives. Which of the following factors should be considered when designing Apex Components' transfer pricing policy? (Select all that apply.)",
                "Choices": [
                    "Transfer prices affect the reported profitability of each division and therefore affect performance evaluation and manager bonuses",
                    "Transfer pricing should encourage division managers to make decisions that maximize total company profit rather than individual division profit",
                    "The chosen transfer price determines the total taxable income of the company and must comply with arm's-length transaction requirements",
                    "Transfer prices should be set at the full absorption cost plus a markup to ensure both divisions share equally in the profit",
                    "When excess capacity exists, a variable cost transfer price may be appropriate for short-term decisions but should not be used for performance evaluation"
                ],
                "Correct": [
                    "Transfer prices affect the reported profitability of each division and therefore affect performance evaluation and manager bonuses",
                    "Transfer pricing should encourage division managers to make decisions that maximize total company profit rather than individual division profit",
                    "The chosen transfer price determines the total taxable income of the company and must comply with arm's-length transaction requirements",
                    "When excess capacity exists, a variable cost transfer price may be appropriate for short-term decisions but should not be used for performance evaluation"
                ],
                "Explanation": "Transfer pricing has behavioral, economic, and tax implications. Performance evaluation (choice 1) and goal congruence (choice 2) are the primary internal considerations. Tax authorities require arm's-length pricing (choice 3) under Section 482 of the Internal Revenue Code. Variable cost is acceptable for short-term decisions with excess capacity (choice 5). The distractor (choice 4) is incorrect because an equal profit split is not required — the transfer price should reflect market forces and cost structures rather than arbitrary profit sharing.",
                "Topic": "Transfer pricing policy design factors",
                "ItemID": "CBQ3-C2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Transfer pricing policy must balance three objectives: goal congruence, divisional autonomy, and performance evaluation fairness. Tax compliance adds a fourth external requirement — transfers across tax jurisdictions must use arm's-length pricing.",
                "BusinessInterpretation": "Multinational companies face additional complexity with cross-border transfer pricing, as tax rates differ by jurisdiction. The OECD Transfer Pricing Guidelines and IRS Section 482 provide the regulatory framework. Companies should document their transfer pricing methodology to defend against tax authority challenges.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Type": "select",
                "Prompt": "Apex Components currently evaluates division managers based on divisional operating income. Division A has sufficient capacity to meet both external and internal demand. According to the goal congruence principle, which transfer pricing method would be MOST appropriate for the internal transfer of chips from Division A to Division B?",
                "Correct": "Market-based transfer price of $50 per chip — when a perfectly competitive external market exists, market price preserves divisional autonomy and leads to optimal sourcing decisions",
                "Choices": [
                    "Market-based transfer price of $50 per chip — when a perfectly competitive external market exists, market price preserves divisional autonomy and leads to optimal sourcing decisions",
                    "Full cost-based transfer price of $42 per chip — this ensures Division A recovers all costs and Division B gets a lower input cost",
                    "Variable cost-based transfer price of $30 per chip — this maximizes overall company profit by showing the true incremental cost of the transfer",
                    "Negotiated transfer price of $46 per chip — this resolves disputes fairly between the two division managers"
                ],
                "Explanation": "Market-based transfer pricing is preferred when a perfectly competitive external market exists. At $50, Division A earns the same contribution margin ($20 per chip) on internal transfers as on external sales, so it is indifferent between selling internally or externally. Division B makes the sourcing decision based on the true opportunity cost to the company. Full cost ($42) overstates variable costs. Variable cost ($30) does not cover fixed costs and would understate Division A's performance. Negotiated prices ($46) are appropriate when no market price exists but are less transparent than market price when a competitive market is available.",
                "Topic": "Transfer pricing method selection — market-based",
                "ItemID": "CBQ3-C2-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "When a perfectly competitive external market exists, market-based transfer pricing promotes goal congruence because the transfer price equals the opportunity cost of the internal transfer. Both divisions make decisions that maximize divisional profit while also maximizing company-wide profit.",
                "BusinessInterpretation": "Market-based pricing is the preferred approach in decentralized organizations because it preserves divisional autonomy and provides objective performance benchmarks. When idle capacity exists, variable cost may be more appropriate for short-term decisions but should not be used for performance evaluation.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "Apex Components faces four distinct business scenarios. Match each scenario to the most appropriate transfer pricing method.",
                "LeftItems": [
                    "Division A has excess capacity and Division B needs 40,000 chips; no external buyer exists for these units",
                    "Division A sells identical chips externally at $50; the chip market is highly competitive with many suppliers",
                    "Division A's chips are customized for Division B and have no external market; costs are stable and well-documented",
                    "Division A is located in a low-tax country; Division B is in a high-tax country; the company wants to minimize total global tax"
                ],
                "RightItems": [
    "Negotiated or manipulated transfer price — tax-minimization strategies may justify prices that differ from pure economic transfer pricing, subject to arm's-length compliance",
    "Full cost plus markup — cost-based pricing is appropriate when no market benchmark exists; a markup ensures the selling division earns a reasonable return",
    "Dual pricing — credit the selling division at market price and charge the buying division at cost to resolve goal conflicts",
    "Variable cost — with idle capacity, the opportunity cost is zero, so any transfer price above variable cost adds to company profit without sacrificing external sales",
    "Market price — competitive market provides an objective, verifiable price that aligns divisional incentives with company goals"
],
                "Correct": {
                    "Division A has excess capacity and Division B needs 40,000 chips; no external buyer exists for these units": "Variable cost — with idle capacity, the opportunity cost is zero, so any transfer price above variable cost adds to company profit without sacrificing external sales",
                    "Division A sells identical chips externally at $50; the chip market is highly competitive with many suppliers": "Market price — competitive market provides an objective, verifiable price that aligns divisional incentives with company goals",
                    "Division A's chips are customized for Division B and have no external market; costs are stable and well-documented": "Full cost plus markup — cost-based pricing is appropriate when no market benchmark exists; a markup ensures the selling division earns a reasonable return",
                    "Division A is located in a low-tax country; Division B is in a high-tax country; the company wants to minimize total global tax": "Negotiated or manipulated transfer price — tax-minimization strategies may justify prices that differ from pure economic transfer pricing, subject to arm's-length compliance"
                },
                "Explanation": "Each scenario requires a different transfer pricing approach. With excess capacity, variable cost ($30) is appropriate because any contribution above variable cost benefits the company. With a competitive market, market price ($50) provides the correct economic signal. Customized products with no market require cost-based pricing — full cost plus a reasonable markup ensures the selling division recovers costs and earns a return. International tax considerations may override purely economic transfer pricing, but companies must navigate complex regulations including OECD guidelines and IRS Section 482. Dual pricing is an alternative internal solution but does not correspond to any single scenario.",
                "Topic": "Transfer pricing method selection — scenario matching",
                "ItemID": "CBQ3-C2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The appropriate transfer pricing method depends on market conditions, cost structures, capacity utilization, and organizational objectives. No single method is optimal in all situations. Management should select the method that best achieves goal congruence for the specific circumstances.",
                "BusinessInterpretation": "International transfer pricing is one of the most complex areas of tax and management accounting. The arm's-length standard requires that transfer prices between related parties be consistent with prices charged between unrelated parties for comparable transactions under comparable circumstances.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C2",
                "EstimatedMinutes": 8,
                "Pack": 3,
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
                "Type": "select",
                "Prompt": "Division B's manager argues that using market-based transfer pricing at $50 unfairly penalizes Division B because the chip cost represents a large portion of Division B's total product cost. Division B's external selling price is $120 per IoT device. What is the BEST response to this concern from a management accounting perspective?",
                "Correct": "Market-based transfer pricing reflects the true economic cost of the chip to the company. Division B should only produce the IoT device if it can generate sufficient profit given the $50 chip cost, which is the same cost Apex would incur if it sold the chip externally",
                "Choices": [
                    "Market-based transfer pricing reflects the true economic cost of the chip to the company. Division B should only produce the IoT device if it can generate sufficient profit given the $50 chip cost, which is the same cost Apex would incur if it sold the chip externally",
                    "Division B is correct — the transfer price should be reduced to variable cost ($30) to ensure Division B achieves a reasonable profit margin on the IoT device",
                    "Apex should use full cost ($42) because it represents the actual manufacturing cost and is the most objective measure available",
                    "The controller should set the transfer price at $46 as a compromise that splits the difference between Division B's preferred price and market price"
                ],
                "Explanation": "Market-based transfer pricing ($50) gives Division B the correct economic signal. If Division B cannot earn an adequate return at $50 per chip, it should not produce the device — the company is better off selling the chip externally at $50. Using variable cost ($30) would subsidize Division B and potentially lead to overproduction of devices that do not generate sufficient return. Full cost ($42) still understates opportunity cost when external demand exists. A negotiated compromise ($46) is arbitrary and does not provide the correct economic signal for sourcing decisions.",
                "Topic": "Goal congruence and divisional performance evaluation",
                "ItemID": "CBQ3-C2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Transfer pricing should not be used to subsidize downstream divisions. The transfer price should reflect the opportunity cost of the internal transfer. When a competitive market exists, the market price represents the correct opportunity cost for both the buying and selling divisions.",
                "BusinessInterpretation": "In practice, many companies use market-based pricing for performance evaluation but allow negotiated adjustments for strategic products. The key principle is that the transfer pricing system should not mask the true profitability of either division. Managers should be evaluated on results that reflect real economic performance.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
        "CaseID": "CBQ3-C3",
        "Title": "Flexible Budget Variances",
        "SectionTags": [
            "C"
        ],
        "Pack": 3,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Flexible Budget Variances"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Flexible Budget Variances",
        "Subtopic": "Flexible budget analysis",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Precision Manufacturing",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Industrial components manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Distinguish between static budget, flexible budget, and actual results",
            "Compute sales volume variance for operating income",
            "Calculate flexible budget variances for direct materials and labor",
            "Analyze the significance of favorable and unfavorable variances",
            "Apply variance analysis formulas to manufacturing scenarios"
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
        "Stakeholder": "CFO",
        "Tags": [
            "flexible budget",
            "variance analysis",
            "performance management"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Precision Manufacturing produces industrial control valves. The company uses a standard costing system and prepares monthly performance reports comparing actual results to both the static (master) budget and a flexible budget. The plant controller is reviewing the July performance report and needs to explain the variances to the production manager.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: July Budget and Actual Results",
                "Headers": [
                    "Item",
                    "Static Budget",
                    "Actual Results"
                ],
                "Rows": [
                    [
                        "Units produced and sold",
                        "10,000",
                        "12,000"
                    ],
                    [
                        "Selling price per unit",
                        "$75",
                        "$73"
                    ],
                    [
                        "Revenue",
                        "$750,000",
                        "$876,000"
                    ],
                    [
                        "Direct materials cost",
                        "$200,000",
                        "$252,000"
                    ],
                    [
                        "Direct labor cost",
                        "$150,000",
                        "$168,000"
                    ],
                    [
                        "Variable manufacturing overhead",
                        "$100,000",
                        "$126,000"
                    ],
                    [
                        "Fixed manufacturing overhead",
                        "$180,000",
                        "$185,000"
                    ],
                    [
                        "Variable selling & admin",
                        "$50,000",
                        "$62,000"
                    ],
                    [
                        "Fixed selling & admin",
                        "$40,000",
                        "$42,000"
                    ],
                    [
                        "Total costs",
                        "$720,000",
                        "$835,000"
                    ],
                    [
                        "Operating income",
                        "$30,000",
                        "$41,000"
                    ]
                ],
                "ExhibitID": "CBQ3-C3-E1",
                "CaseID": "CBQ3-C3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-C3-Q1",
                    "CBQ3-C3-Q2",
                    "CBQ3-C3-Q3"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Standard Cost per Unit",
                "Headers": [
                    "Cost Element",
                    "Standard Cost per Unit"
                ],
                "Rows": [
                    [
                        "Direct materials (2 lbs at $10/lb)",
                        "$20"
                    ],
                    [
                        "Direct labor (1.5 hrs at $10/hr)",
                        "$15"
                    ],
                    [
                        "Variable manufacturing overhead (1.5 hrs at $6.67/hr)",
                        "$10"
                    ],
                    [
                        "Total variable cost per unit",
                        "$45"
                    ],
                    [
                        "Budgeted fixed MOH per unit ($180,000 / 10,000 units)",
                        "$18"
                    ],
                    [
                        "Budgeted selling price per unit",
                        "$75"
                    ]
                ],
                "ExhibitID": "CBQ3-C3-E2",
                "CaseID": "CBQ3-C3",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-C3-Q3",
                    "CBQ3-C3-Q4"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "The production manager notes that actual revenue exceeded the static budget by $126,000 and believes performance was strong. However, the controller points out that actual sales volume was 12,000 units compared to the budgeted 10,000. Based on Exhibit 1, what is the sales volume variance for operating income?",
                "Correct": "Favorable $50,000 — the flexible budget shows expected operating income at 12,000 units is $80,000, compared to static budget operating income of $30,000, yielding a $50,000 favorable volume variance",
                "Choices": [
                    "Favorable $50,000 — the flexible budget shows expected operating income at 12,000 units is $80,000, compared to static budget operating income of $30,000, yielding a $50,000 favorable volume variance",
                    "Favorable $126,000 — actual revenue of $876,000 exceeded static budget revenue of $750,000, so the volume variance is favorable by $126,000",
                    "Unfavorable $11,000 — actual operating income of $41,000 exceeded the flexible budget operating income of $30,000 by $11,000",
                    "Favorable $11,000 — actual operating income of $41,000 exceeded static budget operating income of $30,000 by $11,000"
                ],
                "Explanation": "The sales volume variance isolates the effect of changes in sales volume on operating income while holding selling prices and costs at budgeted amounts. Per Exhibit 2, the standard contribution margin per unit is $75 selling price − $20 DM − $15 DL − $10 VOH − $5 VS&A = $25 per unit. Flexible budget operating income at 12,000 units = (12,000 × $25 CM) − $180,000 fixed MOH − $40,000 fixed S&A = $300,000 − $220,000 = $80,000. The static budget operating income at 10,000 units is $30,000. Sales volume variance = $80,000 − $30,000 = $50,000 Favorable. Equivalently, (12,000 − 10,000) × $25 = $50,000 F. A common error is to compare actual revenue ($876,000) to static budget revenue ($750,000) and claim a $126,000 F variance — this confuses the total revenue change with the volume-only effect. The flexible budget controls for volume changes and isolates the volume impact on profitability, which is $50,000 F attributable solely to selling 2,000 more units.",
                "Topic": "Sales volume variance for operating income",
                "ItemID": "CBQ3-C3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "CommonTrapReference": "Trap 6: Flexible Budget",
                "AccountingPrinciple": "The sales volume variance measures the difference between static budget and flexible budget operating income, isolating the effect of changes in sales volume while holding selling prices and costs at budgeted amounts.",
                "BusinessInterpretation": "Managers often confuse revenue increases from higher volume with true cost control. The flexible budget separates volume effects from price and efficiency effects, enabling more accurate performance evaluation.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-C3",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "Using Exhibit 1 and Exhibit 2, compute the flexible budget variance for direct materials. Compare actual direct materials cost to the flexible budget amount at 12,000 units.",
                "Correct": "Unfavorable $12,000 — flexible budget DM = 12,000 × $20 = $240,000; actual DM = $252,000; variance = $252,000 − $240,000 = $12,000 unfavorable (actual cost exceeded the flexible budget)",
                "Choices": [
                    "Unfavorable $12,000 — flexible budget DM = 12,000 × $20 = $240,000; actual DM = $252,000; variance = $252,000 − $240,000 = $12,000 unfavorable (actual cost exceeded the flexible budget)",
                    "Unfavorable $52,000 — static budget DM = $200,000; actual DM = $252,000; variance = $252,000 − $200,000 = $52,000 unfavorable",
                    "Favorable $12,000 — actual DM cost of $252,000 was less than the flexible budget amount of $264,000 when adjusted for actual volume",
                    "Favorable $48,000 — the company produced 2,000 more units than budgeted, so DM variance should be favorable because of economies of scale"
                ],
                "Explanation": "The flexible budget variance compares actual costs to what costs SHOULD have been at the actual activity level. At 12,000 units, the flexible budget allows $20 per unit for DM = $240,000. Actual DM was $252,000. The $12,000 unfavorable variance indicates that actual material cost per unit ($21.00 = $252,000 / 12,000) exceeded the standard ($20.00), suggesting either higher material prices or greater usage than standard. Comparing to the static budget ($200,000) would incorrectly include the volume effect in the variance.",
                "Topic": "Flexible budget variance computation — direct materials",
                "ItemID": "CBQ3-C3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 6: Flexible Budget",
                "AccountingPrinciple": "Flexible budget variance = Actual cost − Flexible budget cost at actual volume. It measures cost control independent of volume changes. A positive (unfavorable) variance means actual cost exceeded the standard allowed for actual output.",
                "BusinessInterpretation": "Flexible budget variances help distinguish between volume-driven cost increases (which may be justified) and inefficiency-driven increases (which require management attention). The $12,000 unfavorable DM variance warrants investigation into material pricing or usage.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-C3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Type": "multi",
                "Prompt": "The controller identified several variances. Which of the following statements correctly interpret the variance results shown in Exhibit 1? (Select all that apply.)",
                "Choices": [
                    "The favorable sales volume variance indicates that selling more units than budgeted contributed positively to operating income",
                    "The direct labor flexible budget variance is $12,000 unfavorable because actual DL of $168,000 exceeded the flexible budget of $180,000 at 12,000 units",
                    "Actual selling price of $73 per unit was $2 below the standard of $75, creating an unfavorable selling price variance of $24,000 (12,000 × $2)",
                    "Fixed manufacturing overhead variance of $5,000 unfavorable indicates actual fixed costs exceeded the budgeted amount",
                    "The total flexible budget variance for variable costs was unfavorable, meaning actual variable costs exceeded the standard costs allowed for actual output"
                ],
                "Correct": [
                    "The favorable sales volume variance indicates that selling more units than budgeted contributed positively to operating income",
                    "Actual selling price of $73 per unit was $2 below the standard of $75, creating an unfavorable selling price variance of $24,000 (12,000 × $2)",
                    "Fixed manufacturing overhead variance of $5,000 unfavorable indicates actual fixed costs exceeded the budgeted amount",
                    "The total flexible budget variance for variable costs was unfavorable, meaning actual variable costs exceeded the standard costs allowed for actual output"
                ],
                "Explanation": "The sales volume variance is favorable because volume increased. The selling price variance is unfavorable: ($75 − $73) × 12,000 = $24,000. Fixed MOH variance is $185,000 − $180,000 = $5,000 unfavorable. Total variable costs: flexible budget = $240,000 + $180,000 + $120,000 + $60,000 = $600,000; actual = $252,000 + $168,000 + $126,000 + $62,000 = $608,000; variance = $8,000 unfavorable. The distractor about DL is wrong because flexible budget DL = 12,000 × $15 = $180,000; actual = $168,000; the DL variance is actually $12,000 FAVORABLE (actual was less than flexible budget), not unfavorable.",
                "Topic": "Interpreting flexible budget variances",
                "ItemID": "CBQ3-C3-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "MultipleConcepts"
                ],
                "CommonTrapReference": "Trap 6: Flexible Budget",
                "AccountingPrinciple": "A comprehensive variance analysis decomposes the difference between actual and static budget results into: (1) volume variance — effect of operating at a different activity level, and (2) flexible budget variance — effect of price and efficiency differences at actual activity.",
                "BusinessInterpretation": "Variance analysis is most useful when it prompts corrective action. An unfavorable materials variance may indicate purchasing issues (price) or production issues (waste). Investigation should focus on variances that are significant, controllable, and non-random.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-C3",
                "EstimatedMinutes": 8,
                "Pack": 3,
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
                "Prompt": "Match each variance description to the correct variance formula for Precision Manufacturing's standard costing system.",
                "LeftItems": [
                    "Difference between actual revenue and flexible budget revenue at 12,000 units",
                    "Difference between flexible budget variable cost at 12,000 units and actual variable cost",
                    "Difference between static budget operating income and flexible budget operating income",
                    "Difference between actual fixed overhead and budgeted fixed overhead"
                ],
                "RightItems": [
    "Flexible budget variable cost variance — Sum of (actual cost − standard cost × actual units) for DM, DL, VOH, VS&A",
    "Sales volume variance — (Actual Units − Budgeted Units) × Standard Contribution Margin per Unit = (12,000 − 10,000) × $25 = $50,000 F",
    "Fixed overhead spending variance — Actual FOH − Budgeted FOH = $185,000 − $180,000 = $5,000 U",
    "Production volume variance — measures fixed overhead capacity utilization",
    "Selling price variance — (Actual Price − Standard Price) × Actual Quantity = ($73 − $75) × 12,000 = $24,000 U"
],
                "Correct": {
                    "Difference between actual revenue and flexible budget revenue at 12,000 units": "Selling price variance — (Actual Price − Standard Price) × Actual Quantity = ($73 − $75) × 12,000 = $24,000 U",
                    "Difference between flexible budget variable cost at 12,000 units and actual variable cost": "Flexible budget variable cost variance — Sum of (actual cost − standard cost × actual units) for DM, DL, VOH, VS&A",
                    "Difference between static budget operating income and flexible budget operating income": "Sales volume variance — (Actual Units − Budgeted Units) × Standard Contribution Margin per Unit = (12,000 − 10,000) × $25 = $50,000 F",
                    "Difference between actual fixed overhead and budgeted fixed overhead": "Fixed overhead spending variance — Actual FOH − Budgeted FOH = $185,000 − $180,000 = $5,000 U"
                },
                "Explanation": "The four variances represent the four components of the variance analysis framework. Selling price variance isolates price changes. Flexible budget variance isolates cost control. Sales volume variance isolates volume effects. Fixed overhead spending variance isolates fixed cost control. The production volume variance (distractor) relates to fixed overhead absorption and is a different concept from the spending variance.",
                "Topic": "Variance analysis formulas and classification",
                "ItemID": "CBQ3-C3-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 6: Flexible Budget",
                "AccountingPrinciple": "The complete variance analysis framework decomposes the static-budget-to-actual difference into: selling price variance, flexible budget cost variances, sales volume variance, and fixed overhead variances. Each component serves a different management purpose.",
                "BusinessInterpretation": "Using the full variance decomposition, managers can pinpoint: (1) whether sales achieved target pricing, (2) whether production controlled costs at actual volume, and (3) whether volume changes affected profitability as expected.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C3",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Type": "select",
                "Prompt": "The production manager is evaluated based on the flexible budget variance for manufacturing costs. Which statement BEST explains why the flexible budget is more appropriate than the static budget for evaluating the production manager's cost control?",
                "Correct": "The flexible budget adjusts allowed costs to actual production volume, so the production manager is evaluated only on cost elements within their control (price and efficiency), not on volume changes that are typically outside production management's control",
                "Choices": [
                    "The flexible budget adjusts allowed costs to actual production volume, so the production manager is evaluated only on cost elements within their control (price and efficiency), not on volume changes that are typically outside production management's control",
                    "The static budget is more appropriate because it represents the original plan; using a flexible budget after the fact allows managers to excuse poor performance by claiming volume differences",
                    "Both budgets should be used: the static budget for evaluating the sales department and the flexible budget for evaluating production; the production manager should be held accountable for the full $52,000 DM variance from static budget",
                    "The flexible budget is only useful when actual volume equals budgeted volume; since Precision Manufacturing sold 2,000 more units than planned, the static budget comparison is more meaningful"
                ],
                "Explanation": "The flexible budget holds the production manager accountable only for costs at the actual activity level. This is appropriate because the production manager can control cost per unit (efficiency and price) but typically cannot control sales volume (which depends on market conditions and the sales department). Using the static budget would penalize the manager for producing more units than planned, masking true cost control performance. The $52,000 unfavorable DM variance versus static budget includes $50,000 from additional volume and only $12,000 from actual cost overruns — a critical distinction.",
                "Topic": "Performance evaluation using flexible budgets",
                "ItemID": "CBQ3-C3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 6: Flexible Budget",
                "AccountingPrinciple": "Flexible budgets enable responsibility accounting by isolating controllable from non-controllable variances. Production managers should be evaluated on flexible budget variances (controllable), while sales volume variances are typically attributed to market conditions or sales management.",
                "BusinessInterpretation": "Well-designed performance measurement systems separate uncontrollable volume effects from controllable cost effects. This prevents penalizing managers for factors outside their control and maintains motivation. Many companies use a combination of static budgets for planning and flexible budgets for evaluation.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-C3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-D1",
        "Title": "Absorption vs Variable Costing Income Reconciliation",
        "SectionTags": [
            "D"
        ],
        "Pack": 3,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Absorption costing unit cost",
            "Variable costing unit cost",
            "Income reconciliation",
            "Costing method comparison",
            "Variable costing classification"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Cost Behavior",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Summit Furniture",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Furniture manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze absorption costing unit cost",
            "Analyze variable costing unit cost",
            "Analyze income reconciliation",
            "Analyze costing method comparison",
            "Analyze variable costing classification",
            "Analyze cost classification"
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
        "Stakeholder": "Controller",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Summit Furniture produces high-end wooden chairs. The controller is preparing the quarterly income statement and needs to reconcile absorption and variable costing results for management. Production exceeded sales as inventory was built for an upcoming promotion, and the CFO wants to understand the fixed-overhead deferral effect on reported income.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Operating Data",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Units produced",
                        "12,000"
                    ],
                    [
                        "Units sold",
                        "9,000"
                    ],
                    [
                        "Selling price per unit",
                        "$150"
                    ],
                    [
                        "Direct materials per unit",
                        "$40"
                    ],
                    [
                        "Direct labor per unit",
                        "$30"
                    ],
                    [
                        "Variable manufacturing overhead per unit",
                        "$20"
                    ],
                    [
                        "Fixed manufacturing overhead (total)",
                        "$240,000"
                    ],
                    [
                        "Variable selling & administrative per unit",
                        "$8"
                    ],
                    [
                        "Fixed selling & administrative (total)",
                        "$90,000"
                    ]
                ],
                "ExhibitID": "CBQ3-D1-E1",
                "CaseID": "CBQ3-D1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 — Costing Treatment Comparison",
                "Headers": [
                    "Item",
                    "Absorption Costing",
                    "Variable Costing"
                ],
                "Rows": [
                    [
                        "Product cost includes",
                        "DM, DL, VOH, FOH",
                        "DM, DL, VOH"
                    ],
                    [
                        "Fixed MOH classification",
                        "Inventoried as product cost",
                        "Expensed as period cost"
                    ],
                    [
                        "Period cost includes",
                        "VS&A, FS&A",
                        "FOH, VS&A, FS&A"
                    ],
                    [
                        "Income difference driver",
                        "FOH deferred in / released from inventory",
                        "None"
                    ]
                ],
                "ExhibitID": "CBQ3-D1-E2",
                "CaseID": "CBQ3-D1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the absorption costing unit product cost.",
                "Correct": "110",
                "Explanation": "DM $40 + DL $30 + VOH $20 + (FOH $240,000 / 12,000 units) = $40 + $30 + $20 + $20 = $110 per unit. Under absorption costing, fixed manufacturing overhead is allocated to each unit produced.",
                "Topic": "Absorption costing unit cost",
                "ItemID": "CBQ3-D1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-D1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Calculate the variable costing unit product cost.",
                "Correct": "90",
                "Explanation": "DM $40 + DL $30 + VOH $20 = $90 per unit. Under variable costing, fixed manufacturing overhead is treated as a period cost, not a product cost. A common trap is including FOH per unit in the variable product cost.",
                "Topic": "Variable costing unit cost",
                "ItemID": "CBQ3-D1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "BusinessInterpretation": "not a product cost. A common trap is including FOH per unit in the variable product cost.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Which costing method reports higher operating income, and by what amount?",
                "Choices": [
                    "Absorption costing is higher by $60,000",
                    "Variable costing is higher by $60,000",
                    "Absorption costing is higher by $240,000",
                    "Income is the same under both methods"
                ],
                "Correct": "Absorption costing is higher by $60,000",
                "Explanation": "Ending inventory = 12,000 − 9,000 = 3,000 units. FOH per unit = $240,000 / 12,000 = $20. FOH deferred = 3,000 × $20 = $60,000. When production exceeds sales, absorption costing defers more FOH in inventory, resulting in higher operating income than variable costing.",
                "Topic": "Income reconciliation",
                "ItemID": "CBQ3-D1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "MultipleConcepts"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-D1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "Select the correct statements about absorption vs variable costing.",
                "Choices": [
                    "When production exceeds sales, absorption costing income is higher",
                    "Variable costing treats fixed manufacturing overhead as a product cost",
                    "Absorption costing is required by GAAP for external financial reporting",
                    "The income difference equals the change in inventory units times the fixed overhead rate per unit"
                ],
                "Correct": [
                    "When production exceeds sales, absorption costing income is higher",
                    "Absorption costing is required by GAAP for external financial reporting",
                    "The income difference equals the change in inventory units times the fixed overhead rate per unit"
                ],
                "Explanation": "Production > sales increases inventory, deferring FOH. GAAP requires absorption costing for external reports. The income difference = FOH rate × change in inventory. Variable costing treats FOH as a period cost, not a product cost — that is a key distinguishing feature.",
                "Topic": "Costing method comparison",
                "ItemID": "CBQ3-D1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-D1",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Under variable costing, fixed manufacturing overhead is classified as a ______ cost.",
                "Correct": "period",
                "Explanation": "Variable costing expenses all fixed manufacturing overhead in the period incurred, classifying it as a period cost rather than a product cost.",
                "Topic": "Variable costing classification",
                "ItemID": "CBQ3-D1-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ3-D1",
                "EstimatedMinutes": 3,
                "Pack": 3,
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
                "Prompt": "Match each cost item to its classification under variable costing.",
                "LeftItems": [
                    "Direct materials",
                    "Direct labor",
                    "Variable manufacturing overhead",
                    "Fixed manufacturing overhead"
                ],
                "RightItems": [
                    "Product cost",
                    "Product cost",
                    "Product cost",
                    "Period cost"
                ],
                "Correct": {
                    "Direct materials": "Product cost",
                    "Direct labor": "Product cost",
                    "Variable manufacturing overhead": "Product cost",
                    "Fixed manufacturing overhead": "Period cost"
                },
                "Explanation": "Under variable costing, only variable manufacturing costs (DM, DL, VOH) are product costs. Fixed manufacturing overhead is always a period cost. This differs from absorption costing where all manufacturing costs — including FOH — are product costs.",
                "Topic": "Cost classification",
                "ItemID": "CBQ3-D1-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 2: Relevant Cost vs Total Cost",
                "AccountingPrinciple": "Relevant costs are future costs that differ between alternatives; sunk costs are irrelevant.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D1",
                "DecisionTreeReference": "Cost Classification",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-D2",
        "Title": "Job Order Costing & Overhead Application",
        "SectionTags": [
            "D"
        ],
        "Pack": 3,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Predetermined overhead rate",
            "Job cost sheet",
            "Overhead variance",
            "Overhead disposition",
            "Costing system types"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Job Order Costing",
        "Subtopic": "Overhead application",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Precision Machining",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Medical devices",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze predetermined overhead rate",
            "Analyze job cost sheet",
            "Analyze overhead variance",
            "Analyze overhead disposition",
            "Analyze costing system types",
            "Analyze job-order costing terminology"
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
        "Stakeholder": "Controller",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Precision Machining produces custom parts for medical device manufacturers. Each job is unique with different specifications. The controller must compute the predetermined overhead rate, apply overhead to Job 101 for billing, and determine whether overhead was over- or underapplied for the March monthly closing.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Budget & Actual Data (March)",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Estimated annual manufacturing overhead",
                        "$600,000"
                    ],
                    [
                        "Estimated annual direct labor hours",
                        "40,000"
                    ],
                    [
                        "Actual direct labor hours worked (March)",
                        "3,200"
                    ],
                    [
                        "Actual manufacturing overhead incurred (March)",
                        "$52,000"
                    ],
                    [
                        "Job 101 — Direct materials used",
                        "$8,500"
                    ],
                    [
                        "Job 101 — Direct labor (300 hours at $25/hour)",
                        "$7,500"
                    ]
                ],
                "ExhibitID": "CBQ3-D2-E1",
                "CaseID": "CBQ3-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 — Overhead Disposition Policy",
                "Headers": [
                    "Item",
                    "Policy"
                ],
                "Rows": [
                    [
                        "Overhead application base",
                        "Direct labor hours"
                    ],
                    [
                        "Normal costing approach",
                        "Predetermined OH rate × actual activity"
                    ],
                    [
                        "Immaterial over/underapplied OH",
                        "Closed to Cost of Goods Sold"
                    ],
                    [
                        "Material over/underapplied OH",
                        "Prorated among WIP, Finished Goods, and COGS"
                    ]
                ],
                "ExhibitID": "CBQ3-D2-E2",
                "CaseID": "CBQ3-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Calculate the predetermined overhead rate per direct labor hour.",
                "Correct": "15",
                "Explanation": "Predetermined OH rate = Estimated total OH / Estimated total activity = $600,000 / 40,000 DLH = $15 per DLH. This rate is established before the period begins and is used throughout the year to apply overhead to jobs.",
                "Topic": "Predetermined overhead rate",
                "ItemID": "CBQ3-D2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "Terminology"
                ],
                "AccountingPrinciple": "Predetermined overhead rate = Estimated total manufacturing overhead / Estimated total activity base.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D2",
                "DecisionTreeReference": "Job Order Costing",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Calculate the total cost of Job 101.",
                "Correct": "20500",
                "Explanation": "DM $8,500 + DL $7,500 + Applied OH (300 DLH × $15) = $8,500 + $7,500 + $4,500 = $20,500. A common trap is forgetting to apply overhead or using the actual OH rate instead of the predetermined rate.",
                "Topic": "Job cost sheet",
                "ItemID": "CBQ3-D2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "Terminology"
                ],
                "BusinessInterpretation": "+ $4,500 = $20,500. A common trap is forgetting to apply overhead or using the actual OH rate instead of the predetermin...",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "Was manufacturing overhead overapplied or underapplied for March, and by what amount?",
                "Choices": [
                    "Underapplied by $4,000",
                    "Overapplied by $4,000",
                    "Underapplied by $52,000",
                    "Overapplied by $48,000"
                ],
                "Correct": "Underapplied by $4,000",
                "Explanation": "Applied OH = 3,200 DLH × $15 = $48,000. Actual OH = $52,000. Underapplied = $52,000 − $48,000 = $4,000. Underapplied means actual costs exceeded applied amounts. A common trap is subtracting in the wrong direction.",
                "Topic": "Overhead variance",
                "ItemID": "CBQ3-D2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "BusinessInterpretation": "ed applied amounts. A common trap is subtracting in the wrong direction.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D2",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Prompt": "Select the correct statements about disposing of over/underapplied overhead.",
                "Choices": [
                    "Immaterial amounts are typically closed to Cost of Goods Sold",
                    "Material amounts should be prorated among WIP, Finished Goods, and COGS",
                    "Overapplied overhead is always treated as a liability on the balance sheet",
                    "The proration method is based on the ending balances of WIP, FG, and COGS before adjustment"
                ],
                "Correct": [
                    "Immaterial amounts are typically closed to Cost of Goods Sold",
                    "Material amounts should be prorated among WIP, Finished Goods, and COGS",
                    "The proration method is based on the ending balances of WIP, FG, and COGS before adjustment"
                ],
                "Explanation": "Small variances are closed to COGS for simplicity. Material variances require proration to accurately state ending inventory and COGS. Overapplied OH is a contra-cost adjustment, not a liability. Proration is based on the unadjusted account balances.",
                "Topic": "Overhead disposition",
                "ItemID": "CBQ3-D2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CalculationRequired": true,
                "CaseID": "CBQ3-D2",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "The system that accumulates costs by individual customer orders is called ______ costing.",
                "Correct": "job-order",
                "Explanation": "Job-order costing tracks costs for each unique job or customer order. It is used when products are customized rather than mass-produced in a continuous process.",
                "Topic": "Costing system types",
                "ItemID": "CBQ3-D2-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CalculationRequired": false,
                "CaseID": "CBQ3-D2",
                "EstimatedMinutes": 3,
                "Pack": 3,
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
                "Prompt": "Match each term to its correct description.",
                "LeftItems": [
                    "Predetermined overhead rate",
                    "Normal costing",
                    "Cost driver",
                    "Overapplied overhead"
                ],
                "RightItems": [
    "Applied OH exceeds actual OH incurred",
    "Activity base that causes overhead costs",
    "Estimated OH divided by estimated activity base",
    "Uses estimated rate to apply OH during the period"
],
                "Correct": {
                    "Predetermined overhead rate": "Estimated OH divided by estimated activity base",
                    "Normal costing": "Uses estimated rate to apply OH during the period",
                    "Cost driver": "Activity base that causes overhead costs",
                    "Overapplied overhead": "Applied OH exceeds actual OH incurred"
                },
                "Explanation": "The predetermined rate is set before the period. Normal costing applies this rate to actual activity. A cost driver is the allocation basis. Overapplied overhead means too much OH was applied to products.",
                "Topic": "Job-order costing terminology",
                "ItemID": "CBQ3-D2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "COSO ERM integrates strategy, objectives, and performance across the enterprise.",
                "BusinessInterpretation": "Overapplied overhead means too much OH was applied to products.",
                "CalculationRequired": true,
                "CaseID": "CBQ3-D2",
                "DecisionTreeReference": "COSO ERM",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-D3",
        "Title": "Cost Allocation (Step-Down)",
        "SectionTags": [
            "D"
        ],
        "Pack": 3,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Cost Allocation (Step-Down)"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Cost Allocation (Step-Down)",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Midwest Precision Machining",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Precision machining",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze cost allocation (step-down)",
            "Analyze cost allocation (step-down)",
            "Analyze cost allocation (step-down)",
            "Analyze cost allocation (step-down)",
            "Analyze cost allocation (step-down)"
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
                "Summary": "Full content authoring — service department cost allocation methods, allocation bases, and decision impact"
            }
        ],
        "Stakeholder": "VP of Manufacturing",
        "Tags": [
            "cost allocation",
            "service department",
            "direct method",
            "step-down method",
            "reciprocal method",
            "allocation bases",
            "cost pools"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Midwest Precision Machining operates two production departments (Machining and Assembly) and two service departments (Maintenance and IT Support). The cost accounting team is reviewing the annual cost allocation. The service departments provide support to each other: Maintenance maintains IT servers and cooling systems, while IT provides system support for Maintenance's inventory management software. The production managers want to understand how different allocation methods affect their departmental costs. The cost accounting team has prepared data on service department costs and usage statistics.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Service Department Costs and Usage Statistics",
                "Headers": [
                    "",
                    "Maintenance",
                    "IT Support",
                    "Machining",
                    "Assembly"
                ],
                "Rows": [
                    [
                        "Department direct costs before allocation",
                        "$240,000",
                        "$180,000",
                        "$800,000",
                        "$600,000"
                    ],
                    [
                        "Maintenance hours used",
                        "—",
                        "1,500",
                        "6,000",
                        "4,500"
                    ],
                    [
                        "IT support tickets logged",
                        "400",
                        "—",
                        "1,200",
                        "2,400"
                    ]
                ],
                "ExhibitID": "CBQ3-D3-E1",
                "CaseID": "CBQ3-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "multi",
                "Prompt": "The cost accounting team is evaluating which service department cost allocation method to use. Select the statements that correctly describe the characteristics of the THREE recognized cost allocation methods. (Select all that apply.)",
                "Choices": [
                    "The direct method allocates each service department's costs directly to production departments without recognizing inter-service-department services",
                    "The step-down method allocates service department costs sequentially, with partial recognition of inter-service-department services",
                    "The reciprocal method uses simultaneous equations to fully recognize all inter-service-department services",
                    "The dual-rate method separates fixed and variable costs for separate allocation",
                    "The direct method is the most accurate because it recognizes all service relationships"
                ],
                "Correct": [
                    "The direct method allocates each service department's costs directly to production departments without recognizing inter-service-department services",
                    "The step-down method allocates service department costs sequentially, with partial recognition of inter-service-department services",
                    "The reciprocal method uses simultaneous equations to fully recognize all inter-service-department services"
                ],
                "Explanation": "The three recognized methods are direct (ignores inter-service), step-down (partial recognition, sequential), and reciprocal (full recognition via equations). The dual-rate method is a variant that can be used with any of the three methods — it is not a separate allocation method. The direct method is actually the least accurate because it ignores inter-service relationships, not the most accurate.",
                "Topic": "Service department cost allocation methods",
                "ItemID": "CBQ3-D3-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Service department cost allocation methods (direct, step-down, reciprocal) determine how support costs are assigned to production departments. The reciprocal method is theoretically preferred but computationally complex.",
                "BusinessInterpretation": "The choice of allocation method can significantly affect product costs and departmental performance evaluations. Managers should understand how each method impacts their reported costs.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-D3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "When selecting allocation bases for service department costs, which of the following are APPROPRIATE allocation bases for the service departments described in Exhibit 1? (Select all that apply.)",
                "Choices": [
                    "Maintenance hours used is an appropriate allocation base for Maintenance department costs",
                    "Number of IT support tickets is an appropriate allocation base for IT Support department costs",
                    "Machine hours in Assembly is an appropriate allocation base for Maintenance costs because Assembly uses more machines",
                    "The number of employees in each department is an appropriate allocation base for both service departments",
                    "Direct labor hours in the production departments is the only acceptable allocation base per cost accounting standards"
                ],
                "Correct": [
                    "Maintenance hours used is an appropriate allocation base for Maintenance department costs",
                    "Number of IT support tickets is an appropriate allocation base for IT Support department costs"
                ],
                "Explanation": "Maintenance hours and IT support tickets are cause-effect allocation bases that reflect how production departments consume each service. Machine hours in Assembly is a potential base for Maintenance but Exhibit 1 shows maintenance hours as the measured driver. Number of employees is not given as a driver and may not have a cause-effect relationship with IT or maintenance costs. Direct labor hours is one possible base but not the only acceptable one. The best allocation base captures a cause-effect relationship between the service and its consumption.",
                "Topic": "Allocation base selection",
                "ItemID": "CBQ3-D3-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "CMA best practice recommends selecting allocation bases that reflect a cause-effect relationship between service costs and the activities that drive them. Both financial and non-financial measures can be appropriate bases.",
                "BusinessInterpretation": "Selecting inappropriate allocation bases can distort product costs and lead to poor pricing and outsourcing decisions. Regular review of allocation bases ensures they remain relevant as operations change.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-D3",
                "EstimatedMinutes": 5,
                "Pack": 3,
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
                "Prompt": "If Midwest Precision uses the step-down method starting with IT Support (because IT provides services to more departments), which statements correctly describe the allocation process? (Select all that apply.)",
                "Choices": [
                    "IT Support costs of $180,000 would first be allocated to Maintenance, Machining, and Assembly based on IT support tickets",
                    "After IT Support is allocated, Maintenance costs of $240,000 plus the allocated IT costs would be allocated to Machining and Assembly only",
                    "The step-down method requires deciding the sequence of allocation, typically starting with the department that provides the most service to other service departments",
                    "The reciprocal method would give the same result as the step-down method when only two service departments exist",
                    "Under the step-down method, once a service department's costs are allocated, no costs are allocated back to it from other service departments"
                ],
                "Correct": [
                    "IT Support costs of $180,000 would first be allocated to Maintenance, Machining, and Assembly based on IT support tickets",
                    "After IT Support is allocated, Maintenance costs of $240,000 plus the allocated IT costs would be allocated to Machining and Assembly only",
                    "The step-down method requires deciding the sequence of allocation, typically starting with the department that provides the most service to other service departments",
                    "Under the step-down method, once a service department's costs are allocated, no costs are allocated back to it from other service departments"
                ],
                "Explanation": "In step-down, IT's costs are allocated to Maintenance (400 tickets), Machining (1,200), and Assembly (2,400). Then Maintenance (now including allocated IT costs) is allocated only to the production departments since IT is already closed. The sequence typically starts with the department serving the most other service departments. Step-down and reciprocal do NOT give the same result — reciprocal is more accurate. Once closed, no costs return to a service department.",
                "Topic": "Step-down allocation method — sequence and mechanics",
                "ItemID": "CBQ3-D3-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The step-down (sequential) method partially recognizes inter-service-department services by allocating costs in a predetermined sequence. The chosen sequence can materially affect cost allocations to production departments.",
                "BusinessInterpretation": "Management should understand that the step-down sequence choice is a policy decision that can affect departmental profitability. Consistency in method application across periods is important for trend analysis.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-D3",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "The cost accounting team wants to implement the dual-rate method for allocating IT Support costs. Select the statements that correctly describe the dual-rate method. (Select all that apply.)",
                "Choices": [
                    "The dual-rate method separates fixed and variable costs into separate cost pools for allocation",
                    "Fixed IT Support costs should be allocated based on long-term capacity needs (e.g., peak-period ticket volume)",
                    "Variable IT Support costs should be allocated based on actual usage (e.g., actual tickets logged)",
                    "The dual-rate method can be used with any of the three allocation methods (direct, step-down, or reciprocal)",
                    "The dual-rate method always results in lower total allocated costs compared to the single-rate method"
                ],
                "Correct": [
                    "The dual-rate method separates fixed and variable costs into separate cost pools for allocation",
                    "Fixed IT Support costs should be allocated based on long-term capacity needs (e.g., peak-period ticket volume)",
                    "Variable IT Support costs should be allocated based on actual usage (e.g., actual tickets logged)",
                    "The dual-rate method can be used with any of the three allocation methods (direct, step-down, or reciprocal)"
                ],
                "Explanation": "The dual-rate method separates fixed and variable costs. Fixed costs are allocated based on capacity or long-term needs (not short-term usage). Variable costs are allocated based on actual usage. This method can be combined with any allocation method. The dual-rate method does not always result in lower costs — it provides more accurate cost information by reflecting the different behavior of fixed and variable costs.",
                "Topic": "Dual-rate versus single-rate cost allocation",
                "ItemID": "CBQ3-D3-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The dual-rate method is preferred for decision-making because it separately identifies fixed capacity costs and variable usage costs, enabling better cost management and performance evaluation.",
                "BusinessInterpretation": "Using a single rate can cause production managers to blame service departments for volume-driven cost fluctuations. The dual-rate method provides more equitable cost assignments and improves accountability.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-D3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "Midwest Precision's production manager in Assembly argues that service department allocations are arbitrary and distort product costs. Which arguments would VALIDLY support the use of service department cost allocations? (Select all that apply.)",
                "Choices": [
                    "Allocations encourage production managers to monitor and control their consumption of support services",
                    "Allocations ensure that product costs include the full cost of production, including support services",
                    "Allocations are required by GAAP for external financial reporting of inventory values",
                    "Allocations help justify pricing decisions by ensuring all costs are recovered in customer prices",
                    "Allocations should be avoided because they reduce the autonomy of production department managers"
                ],
                "Correct": [
                    "Allocations encourage production managers to monitor and control their consumption of support services",
                    "Allocations ensure that product costs include the full cost of production, including support services",
                    "Allocations are required by GAAP for external financial reporting of inventory values",
                    "Allocations help justify pricing decisions by ensuring all costs are recovered in customer prices"
                ],
                "Explanation": "Service department allocations are a fundamental cost accounting practice. They promote cost awareness in production departments, ensure full costing for inventory valuation (GAAP requires absorption costing), and support pricing decisions. These are valid justifications. Avoiding allocations because they reduce autonomy is not a valid argument — accountability for all costs is essential for accurate performance measurement.",
                "Topic": "Purpose and justification of cost allocations",
                "ItemID": "CBQ3-D3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "GAAP requires absorption costing for external reporting, which mandates allocation of both direct and indirect manufacturing costs (including service department costs) to products. Service department allocations also support internal decision-making.",
                "BusinessInterpretation": "While some degree of arbitrariness exists in allocation method choice, the benefits of full-cost awareness generally outweigh the limitations. Management should select allocation methods that balance accuracy with practicality.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-D3",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-E1",
        "Title": "COSO Enterprise Risk Management",
        "SectionTags": [
            "E"
        ],
        "Pack": 3,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "COSO Enterprise Risk Management"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "COSO Enterprise Risk Management",
        "Subtopic": "COSO internal control components",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "Enterprise Risk Management",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze coso enterprise risk management",
            "Analyze coso enterprise risk management",
            "Analyze coso enterprise risk management",
            "Analyze coso enterprise risk management",
            "Analyze coso enterprise risk management"
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
                "Summary": "Full content authoring — COSO ERM framework components and their application to enterprise risk management"
            }
        ],
        "Stakeholder": "Chief Risk Officer",
        "Tags": [
            "COSO ERM",
            "enterprise risk management",
            "governance and culture",
            "risk appetite",
            "risk assessment",
            "ERM framework"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "MedTech Devices manufactures specialized surgical instruments and has 2,400 employees across three production facilities. The board has mandated implementation of a formal enterprise risk management (ERM) program following a major product recall that cost $12 million. The Chief Risk Officer has adopted the COSO ERM 2017 framework and is training the leadership team on its five components and 20 principles. The training focuses on how each component contributes to integrating risk management with strategy and performance.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — MedTech Devices ERM Implementation Status",
                "Headers": [
                    "COSO ERM Component",
                    "Current State",
                    "Gap Identified"
                ],
                "Rows": [
                    [
                        "Governance and Culture",
                        "Board risk committee established; risk policy approved",
                        "Risk culture not consistently embedded at plant level"
                    ],
                    [
                        "Strategy and Objective-Setting",
                        "Strategic objectives defined; risk appetite statement drafted",
                        "Risk appetite not yet translated into operational limits for each facility"
                    ],
                    [
                        "Performance",
                        "Risk identification completed for all product lines",
                        "No formal risk quantification or prioritization using heat maps"
                    ],
                    [
                        "Review and Revision",
                        "Quarterly risk reviews scheduled",
                        "No process for assessing emerging risks or substantial changes"
                    ],
                    [
                        "Information, Communication, and Reporting",
                        "Monthly risk reports distributed to executives",
                        "No real-time risk dashboards; reporting is siloed by department"
                    ]
                ],
                "ExhibitID": "CBQ3-E1-E1",
                "CaseID": "CBQ3-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "The Chief Risk Officer is training department heads on the five COSO ERM 2017 components. Match each risk management activity to the correct ERM component.",
                "LeftItems": [
                    "Establishing the board's risk oversight structure and defining risk culture expectations",
                    "Defining risk appetite and aligning risk tolerances with strategic planning",
                    "Identifying and assessing risks that could affect the achievement of strategic objectives",
                    "Communicating risk information to stakeholders through structured reporting channels"
                ],
                "RightItems": [
    "Review and Revision",
    "Information, Communication, and Reporting",
    "Governance and Culture",
    "Performance",
    "Strategy and Objective-Setting"
],
                "Correct": {
                    "Establishing the board's risk oversight structure and defining risk culture expectations": "Governance and Culture",
                    "Defining risk appetite and aligning risk tolerances with strategic planning": "Strategy and Objective-Setting",
                    "Identifying and assessing risks that could affect the achievement of strategic objectives": "Performance",
                    "Communicating risk information to stakeholders through structured reporting channels": "Information, Communication, and Reporting"
                },
                "Explanation": "Governance and Culture establishes oversight and defines desired risk culture. Strategy and Objective-Setting integrates risk appetite with strategic planning. The Performance component involves identifying, assessing, and responding to risks. Information, Communication, and Reporting ensures risk data flows to decision-makers. The distractor \"Review and Revision\" involves monitoring and making changes to the ERM program, which is distinct from the activities listed above.",
                "Topic": "COSO ERM 2017 — five components",
                "ItemID": "CBQ3-E1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The COSO ERM 2017 framework (Enterprise Risk Management — Integrating with Strategy and Performance) has five components and 20 principles. It updates the 2004 framework to emphasize the linkage between risk and strategy.",
                "BusinessInterpretation": "A well-implemented ERM program helps organizations anticipate risks before they materialize. The COSO ERM framework is widely adopted and is referenced by the SEC and PCAOB in evaluating internal control over financial reporting.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "Match each ERM implementation activity at MedTech Devices to the correct COSO ERM component where the activity belongs.",
                "LeftItems": [
                    "Training plant managers on the company's risk culture expectations and ethical values",
                    "Setting operational risk limits for each facility based on the board's risk appetite statement",
                    "Developing a risk heat map to prioritize the top 10 risks across all product lines",
                    "Conducting semi-annual ERM program effectiveness reviews and updating the risk register"
                ],
                "RightItems": [
    "Review and Revision",
    "Performance",
    "Strategy and Objective-Setting",
    "Governance and Culture",
    "Information, Communication, and Reporting"
],
                "Correct": {
                    "Training plant managers on the company's risk culture expectations and ethical values": "Governance and Culture",
                    "Setting operational risk limits for each facility based on the board's risk appetite statement": "Strategy and Objective-Setting",
                    "Developing a risk heat map to prioritize the top 10 risks across all product lines": "Performance",
                    "Conducting semi-annual ERM program effectiveness reviews and updating the risk register": "Review and Revision"
                },
                "Explanation": "Risk culture training reinforces governance and desired culture. Setting risk limits operationalizes risk appetite within the Strategy and Objective-Setting component. Risk heat maps are part of the Performance component (risk assessment and prioritization). Periodic program reviews belong to Review and Revision, which monitors ERM effectiveness over time. The distractor \"Information, Communication, and Reporting\" involves reporting risk data, not conducting program reviews.",
                "Topic": "COSO ERM 2017 — applying components to implementation",
                "ItemID": "CBQ3-E1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Each COSO ERM component contains principles that describe the practices needed for effective ERM. The 20 principles are organized under the five components and represent the \"what\" of effective risk management.",
                "BusinessInterpretation": "Implementation should proceed component by component, with governance and culture as the foundation. Organizations that skip foundational components often struggle with ERM adoption.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "MedTech Devices has identified the following risks during the Performance component assessment. Match each risk to the most appropriate risk response strategy.",
                "LeftItems": [
                    "Regulatory risk: New FDA traceability requirements may increase compliance costs by $500,000",
                    "Supplier risk: Single-source supplier for titanium may face labor strike; probability is low but impact is severe",
                    "Technology risk: Current ERP system is obsolete and requires immediate upgrade to avoid operational disruption",
                    "Market risk: Competitor is launching a similar surgical instrument at a 15% lower price point"
                ],
                "RightItems": [
    "Mitigation — develop alternative supplier relationships and maintain safety stock",
    "Avoidance — discontinue all products in the affected category",
    "Acceptance — monitor competitor pricing and differentiate through quality and service",
    "Mitigation — implement ERP upgrade project with dedicated budget and timeline",
    "Acceptance — the cost of mitigation exceeds the potential impact; budget for compliance"
],
                "Correct": {
                    "Regulatory risk: New FDA traceability requirements may increase compliance costs by $500,000": "Acceptance — the cost of mitigation exceeds the potential impact; budget for compliance",
                    "Supplier risk: Single-source supplier for titanium may face labor strike; probability is low but impact is severe": "Mitigation — develop alternative supplier relationships and maintain safety stock",
                    "Technology risk: Current ERP system is obsolete and requires immediate upgrade to avoid operational disruption": "Mitigation — implement ERP upgrade project with dedicated budget and timeline",
                    "Market risk: Competitor is launching a similar surgical instrument at a 15% lower price point": "Acceptance — monitor competitor pricing and differentiate through quality and service"
                },
                "Explanation": "Risk responses include avoidance, reduction (mitigation), sharing (transfer), and acceptance. Regulatory compliance costs are accepted as a cost of doing business. Supplier risk is mitigated through alternative sourcing. Technology risk is mitigated through a planned upgrade. Competitive market risk is accepted with monitoring — the company's competitive advantage is quality, not price. Avoidance would mean exiting the product category, which is disproportionate for a competitive threat.",
                "Topic": "Risk response strategies — ERM Performance component",
                "ItemID": "CBQ3-E1-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO ERM identifies four risk responses: avoid, reduce (mitigate), share (transfer via insurance or hedging), and accept. The chosen response should align with the organization's risk appetite and the cost-benefit of the response.",
                "BusinessInterpretation": "Not all risks need to be mitigated. Acceptance is a valid strategy when mitigation costs exceed potential losses. Management should document the rationale for each risk response decision.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E1",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "The Review and Revision component requires MedTech Devices to assess changes that could affect ERM effectiveness. Match each change scenario to the correct ERM revision principle.",
                "LeftItems": [
                    "The company plans to acquire a smaller competitor with a different risk culture",
                    "The FDA has proposed new quality reporting requirements that could affect product clearance timelines",
                    "A key supplier experienced a data breach that could affect MedTech's supply chain systems",
                    "The risk committee's quarterly review found two emerging risks not previously identified"
                ],
                "RightItems": [
    "Pursue improvement in ERM — the risk identification process should be enhanced to capture emerging risks proactively",
    "Assess substantial change — the acquisition introduces new risks that must be integrated into the ERM program",
    "Assess substantial change — regulatory changes may require updates to compliance risk assessments",
    "Information and Communication — report the findings to the board",
    "Assess substantial change — third-party risk from supplier breach affects MedTech's risk profile"
],
                "Correct": {
                    "The company plans to acquire a smaller competitor with a different risk culture": "Assess substantial change — the acquisition introduces new risks that must be integrated into the ERM program",
                    "The FDA has proposed new quality reporting requirements that could affect product clearance timelines": "Assess substantial change — regulatory changes may require updates to compliance risk assessments",
                    "A key supplier experienced a data breach that could affect MedTech's supply chain systems": "Assess substantial change — third-party risk from supplier breach affects MedTech's risk profile",
                    "The risk committee's quarterly review found two emerging risks not previously identified": "Pursue improvement in ERM — the risk identification process should be enhanced to capture emerging risks proactively"
                },
                "Explanation": "All three external changes (acquisition, regulatory, supplier breach) require assessing substantial change under the ERM framework's Review and Revision component. The fourth item — finding unidentified risks — indicates a need for ERM program improvement rather than assessing a single change. Reporting to the board is part of Information and Communication, not Review and Revision.",
                "Topic": "COSO ERM — Review and Revision component",
                "ItemID": "CBQ3-E1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "The COSO ERM Review and Revision component includes assessing substantial change and pursuing improvement in ERM. Organizations must monitor changes in the external and internal environment that could affect risk management.",
                "BusinessInterpretation": "ERM is not a one-time implementation but an ongoing process. The Review and Revision component ensures the ERM program evolves with the organization's strategy and risk landscape.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E1",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "Match each ERM benefit described by MedTech's CRO to the correct COSO ERM component that primarily delivers that benefit.",
                "LeftItems": [
                    "Improved risk awareness and ethical decision-making throughout the organization",
                    "Better-informed strategic decisions because risk appetite is explicitly considered",
                    "Faster identification of operational risks through standardized risk assessment processes",
                    "More effective board oversight through structured risk reporting and dashboards"
                ],
                "RightItems": [
    "Strategy and Objective-Setting — integrates risk with strategic planning",
    "Review and Revision — evaluates ERM effectiveness",
    "Information, Communication, and Reporting — delivers risk data to decision-makers",
    "Governance and Culture — establishes tone at the top and risk culture",
    "Performance — provides systematic risk identification and assessment tools"
],
                "Correct": {
                    "Improved risk awareness and ethical decision-making throughout the organization": "Governance and Culture — establishes tone at the top and risk culture",
                    "Better-informed strategic decisions because risk appetite is explicitly considered": "Strategy and Objective-Setting — integrates risk with strategic planning",
                    "Faster identification of operational risks through standardized risk assessment processes": "Performance — provides systematic risk identification and assessment tools",
                    "More effective board oversight through structured risk reporting and dashboards": "Information, Communication, and Reporting — delivers risk data to decision-makers"
                },
                "Explanation": "Each ERM component delivers distinct benefits. Governance and Culture drives risk awareness. Strategy and Objective-Setting links risk to strategy. Performance enables systematic risk identification. Information and Communication provides reporting infrastructure. Review and Revision evaluates and improves the ERM program itself, which is not directly described by any of the listed benefits.",
                "Topic": "COSO ERM — benefits by component",
                "ItemID": "CBQ3-E1-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "ERM benefits include improved strategy formulation, enhanced risk response decisions, reduced operational surprises, and more effective allocation of capital. The COSO ERM framework provides the structure to realize these benefits.",
                "BusinessInterpretation": "Organizations that successfully implement ERM report better risk-adjusted decision-making and fewer significant risk events. The key is embedding ERM into existing management processes rather than creating parallel systems.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E1",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-E2",
        "Title": "Business Continuity and Disaster Recovery",
        "SectionTags": [
            "E"
        ],
        "Pack": 3,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Business Continuity and Disaster Recovery"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Business Continuity and Disaster Recovery",
        "SecondaryCompetencies": [
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "First Federal Credit Union",
        "CompanyType": "Financial services",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Financial services",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Evaluate disaster recovery site strategies based on business requirements",
            "Analyze RTO and RPO in the context of business continuity planning",
            "Identify critical components of a business continuity plan",
            "Match recovery strategies to business function criticality",
            "Evaluate governance and testing requirements for BCP effectiveness"
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
            "disaster recovery",
            "business continuity",
            "RTO",
            "RPO"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "First Federal Credit Union (FFCU) is a mid-sized financial institution with 45 branches, a centralized data center, and an online banking platform serving 120,000 members. The board of directors has directed management to strengthen the enterprise's business continuity and disaster recovery (BC/DR) program following a regional bank's highly publicized system outage that lasted 11 days. The internal audit department has been engaged to assess FFCU's current BC/DR readiness.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: FFCU Business Function Recovery Requirements",
                "Headers": [
                    "Business Function",
                    "Max Acceptable Downtime (RTO)",
                    "Max Data Loss (RPO)",
                    "Criticality"
                ],
                "Rows": [
                    [
                        "Online banking platform",
                        "2 hours",
                        "15 minutes",
                        "Critical"
                    ],
                    [
                        "Teller transaction processing",
                        "4 hours",
                        "1 hour",
                        "High"
                    ],
                    [
                        "Loan origination system",
                        "24 hours",
                        "4 hours",
                        "Medium"
                    ],
                    [
                        "Human resources portal",
                        "72 hours",
                        "24 hours",
                        "Low"
                    ],
                    [
                        "Email and collaboration",
                        "8 hours",
                        "4 hours",
                        "High"
                    ],
                    [
                        "Member call center system",
                        "2 hours",
                        "15 minutes",
                        "Critical"
                    ]
                ],
                "ExhibitID": "CBQ3-E2-E1",
                "CaseID": "CBQ3-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-E2-Q1",
                    "CBQ3-E2-Q2",
                    "CBQ3-E2-Q4"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Disaster Recovery Site Comparison",
                "Headers": [
                    "Site Type",
                    "Setup Cost",
                    "Recovery Time",
                    "Staffing",
                    "Best For"
                ],
                "Rows": [
                    [
                        "Hot site",
                        "$500K–$1M+ annually",
                        "Minutes to hours",
                        "Fully staffed",
                        "Critical systems with RTO < 4 hours"
                    ],
                    [
                        "Warm site",
                        "$150K–$400K annually",
                        "Hours to 1 day",
                        "Partially equipped",
                        "Important systems with RTO 4–24 hours"
                    ],
                    [
                        "Cold site",
                        "$50K–$100K annually",
                        "Days to weeks",
                        "Empty facility",
                        "Non-critical systems with RTO > 24 hours"
                    ],
                    [
                        "Cloud-based DRaaS",
                        "$100K–$300K annually",
                        "Minutes to hours",
                        "Managed by vendor",
                        "Variable; scalable for any criticality"
                    ]
                ],
                "ExhibitID": "CBQ3-E2-E2",
                "CaseID": "CBQ3-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-E2-Q1",
                    "CBQ3-E2-Q3"
                ]
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "FFCU's internal audit team identifies that the current disaster recovery plan has not been tested in 18 months and that backup tapes for the loan origination system are stored in the same building as the primary data center. Which BC/DR governance issue does this represent?",
                "Correct": "Inadequate testing and maintenance of the BCP — regular testing is essential to ensure the plan remains effective, and storing backups at the primary site defeats the purpose of geographic redundancy",
                "Choices": [
                    "Inadequate testing and maintenance of the BCP — regular testing is essential to ensure the plan remains effective, and storing backups at the primary site defeats the purpose of geographic redundancy",
                    "Excessive cost management — the credit union is appropriately minimizing costs by using existing facilities for backup storage",
                    "Acceptable practice — most financial institutions test their disaster recovery plans every 18-24 months, and on-site backup is standard procedure",
                    "A violation of GAAP — Generally Accepted Accounting Principles require quarterly disaster recovery testing and offsite storage of all backup media"
                ],
                "Explanation": "BCP best practices recommend testing at least annually (and preferably semi-annually for critical systems). An 18-month gap means the plan's assumptions and procedures may be outdated. Storing backups at the primary site exposes them to the same physical threats (fire, flood, power failure) that could disable the primary data center. Geographic separation of backups is a fundamental BC/DR principle. There is no GAAP requirement for BC/DR testing frequency, though regulators in the financial sector have specific expectations.",
                "Topic": "BC/DR governance and testing requirements",
                "ItemID": "CBQ3-E2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Internal control frameworks (COSO) require that organizations monitor their internal control systems through ongoing evaluations and separate evaluations. BCP testing is a form of monitoring that validates the effectiveness of disaster recovery controls.",
                "BusinessInterpretation": "Many organizations discover critical gaps during disaster recovery tests — often in areas like data synchronization, connectivity, or staff availability. Regular testing not only validates the plan but also trains staff on emergency procedures.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The BC/DR planning committee is developing the recovery strategy. According to COSO and IT governance frameworks, which of the following are essential components of an effective business continuity plan? (Select all that apply.)",
                "Choices": [
                    "A comprehensive risk assessment identifying threats that could disrupt operations (e.g., natural disasters, cyberattacks, utility failures)",
                    "Documented recovery procedures with assigned responsibilities, contact information, and escalation paths for each critical business function",
                    "A communication plan for notifying employees, customers, regulators, and other stakeholders during and after a disruption event",
                    "A guaranteed recovery time of zero for all systems — the plan should ensure no downtime under any circumstances",
                    "Regular training and awareness programs so that employees understand their BC/DR roles before an incident occurs"
                ],
                "Correct": [
                    "A comprehensive risk assessment identifying threats that could disrupt operations (e.g., natural disasters, cyberattacks, utility failures)",
                    "Documented recovery procedures with assigned responsibilities, contact information, and escalation paths for each critical business function",
                    "A communication plan for notifying employees, customers, regulators, and other stakeholders during and after a disruption event",
                    "Regular training and awareness programs so that employees understand their BC/DR roles before an incident occurs"
                ],
                "Explanation": "Risk assessment, documented procedures, communication plans, and training are all essential BCP components per COSO and ITIL/COBIT frameworks. The distractor (guaranteed zero downtime) is unrealistic — BCP aims to manage and minimize downtime within acceptable thresholds, not eliminate it entirely. BC/DR planning acknowledges that disruptions will occur and focuses on resilience and recovery rather than prevention of all possible failures.",
                "Topic": "Essential BCP components",
                "ItemID": "CBQ3-E2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO's risk assessment and monitoring components directly apply to BC/DR planning. The control environment should establish a culture of business resilience, and information/communication ensures stakeholders are informed during disruptions.",
                "BusinessInterpretation": "BC/DR is not just an IT issue — it requires cross-functional involvement including operations, communications, legal, HR, and finance. The accounting function should ensure that financial data is recoverable and that revenue cycle processes have continuity plans.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "Based on Exhibit 1, FFCU's online banking platform and member call center system both require a Recovery Time Objective (RTO) of 2 hours and a Recovery Point Objective (RPO) of 15 minutes. Using Exhibit 2, which disaster recovery strategy is MOST appropriate for these critical systems?",
                "Correct": "Hot site or Cloud-based DRaaS — both can achieve the required 2-hour RTO and 15-minute RPO, providing near-real-time data replication and rapid system failover",
                "Choices": [
                    "Hot site or Cloud-based DRaaS — both can achieve the required 2-hour RTO and 15-minute RPO, providing near-real-time data replication and rapid system failover",
                    "Cold site — it is the most cost-effective option and FFCU can accept some downtime for critical systems since 2 hours is a reasonable timeframe",
                    "Warm site — it balances cost and recovery speed; the 24-hour maximum recovery time is sufficient for all of FFCU's business functions",
                    "A single backup tape stored offsite — the RPO of 15 minutes can be achieved by taking backups every 15 minutes regardless of the recovery site type"
                ],
                "Explanation": "Critical systems with RTO of 2 hours and RPO of 15 minutes require active replication and rapid failover capabilities. Hot sites provide fully operational duplicate environments that can go live within minutes. Cloud-based Disaster Recovery as a Service (DRaaS) can achieve similar RTOs through automated failover to cloud infrastructure. Cold sites require days to become operational (too slow). Warm sites may be adequate for 4-24 hour RTOs but cannot reliably meet a 2-hour RTO. Backup tapes cannot provide 15-minute RPO because the time to physically transport and restore from tapes far exceeds 15 minutes.",
                "Topic": "Disaster recovery site selection",
                "ItemID": "CBQ3-E2-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "RTO defines the maximum acceptable downtime after a disaster. RPO defines the maximum acceptable data loss measured in time. These metrics drive the selection of appropriate recovery strategies and determine BC/DR investment levels.",
                "BusinessInterpretation": "Financial institutions face regulatory requirements for BC/DR under regulations such as FFIEC guidelines. The cost of the recovery solution should be proportionate to the financial and reputational impact of extended downtime.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "FFCU has identified four business functions that require different recovery strategies. Match each function to the most appropriate recovery approach based on Exhibits 1 and 2.",
                "LeftItems": [
                    "Online banking platform — RTO 2 hours; RPO 15 minutes; critical to member trust and regulatory compliance",
                    "Loan origination system — RTO 24 hours; RPO 4 hours; moderate impact if unavailable for a day",
                    "Human resources portal — RTO 72 hours; RPO 24 hours; low criticality, can tolerate extended downtime",
                    "Teller transaction processing — RTO 4 hours; RPO 1 hour; high impact on branch operations"
                ],
                "RightItems": [
    "Warm site with data replication — pre-staged environment with hourly data replication to meet the 4-hour RTO and 1-hour RPO",
    "Ignore — the function does not need any recovery plan",
    "Warm site — pre-configured hardware and network connectivity available; load backup data and resume operations within 24 hours",
    "Cold site or manual workaround — empty facility with power/cooling; acceptable for low-criticality functions that can be deferred",
    "Hot site or DRaaS — replicate systems in near-real-time to a geographically separate facility; automated failover within minutes"
],
                "Correct": {
                    "Online banking platform — RTO 2 hours; RPO 15 minutes; critical to member trust and regulatory compliance": "Hot site or DRaaS — replicate systems in near-real-time to a geographically separate facility; automated failover within minutes",
                    "Loan origination system — RTO 24 hours; RPO 4 hours; moderate impact if unavailable for a day": "Warm site — pre-configured hardware and network connectivity available; load backup data and resume operations within 24 hours",
                    "Human resources portal — RTO 72 hours; RPO 24 hours; low criticality, can tolerate extended downtime": "Cold site or manual workaround — empty facility with power/cooling; acceptable for low-criticality functions that can be deferred",
                    "Teller transaction processing — RTO 4 hours; RPO 1 hour; high impact on branch operations": "Warm site with data replication — pre-staged environment with hourly data replication to meet the 4-hour RTO and 1-hour RPO"
                },
                "Explanation": "Each business function's RTO and RPO determine the appropriate recovery strategy. Critical functions with RTO under 4 hours require hot sites or DRaaS. High-criticality functions with RTO 4-24 hours can use warm sites. Low-criticality functions with RTO over 24 hours can use cold sites or manual workarounds. The teller system (4-hour RTO, 1-hour RPO) is on the boundary between warm and hot — a warm site with frequent data replication can meet these requirements.",
                "Topic": "Matching recovery strategies to business requirements",
                "ItemID": "CBQ3-E2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "The cost of a recovery strategy should be proportionate to the financial and operational impact of system downtime. Organizations should classify functions by criticality and allocate BC/DR resources accordingly.",
                "BusinessInterpretation": "A tiered recovery approach is most cost-effective — critical systems get hot sites, important systems get warm sites, and non-critical systems use cold sites or manual procedures. This aligns BC/DR spending with business priorities.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E2",
                "EstimatedMinutes": 8,
                "Pack": 3,
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
                "Prompt": "FFCU's CFO asks whether BC/DR costs can be justified as a necessary business expense rather than discretionary spending. Which argument BEST supports the position that BC/DR is a necessary governance function?",
                "Correct": "BC/DR is a fiduciary responsibility — management has a duty to protect member assets and ensure continuity of critical financial services; regulatory bodies including the FFIEC and NCUA require financial institutions to have documented and tested BC/DR plans",
                "Choices": [
                    "BC/DR is a fiduciary responsibility — management has a duty to protect member assets and ensure continuity of critical financial services; regulatory bodies including the FFIEC and NCUA require financial institutions to have documented and tested BC/DR plans",
                    "BC/DR is discretionary — it only matters if a disaster occurs; the probability of a major disaster is low, so spending should be minimized",
                    "BC/DR is primarily an IT responsibility — the IT department should fund recovery solutions from its own operating budget without involving other departments",
                    "BC/DR costs should be capitalized as fixed assets because the recovery site has multi-year useful life, making the expense less impactful on current-period earnings"
                ],
                "Explanation": "BC/DR is a fiduciary and regulatory requirement for financial institutions. The FFIEC Business Continuity Management IT Examination Handbook and NCUA regulations mandate that credit unions maintain and test BC/DR plans. Management's duty of care includes ensuring that member transactions can be processed and member data protected during disruptions. The argument that BC/DR is discretionary ignores both regulatory requirements and the severe reputational and financial consequences of extended downtime.",
                "Topic": "BC/DR governance, fiduciary duty, and regulatory compliance",
                "ItemID": "CBQ3-E2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO internal control framework emphasizes that control activities (including BC/DR) are integral to an organization's governance structure. The monitoring component requires ongoing evaluation of control effectiveness, including periodic BC/DR testing.",
                "BusinessInterpretation": "The accounting function plays a key role in BC/DR beyond IT recovery — ensuring that financial records, accounts receivable/payable data, payroll systems, and regulatory filing systems have continuity plans. The cost of BC/DR is an insurance premium against potentially catastrophic business interruption.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-E2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
        "CaseID": "CBQ3-F1",
        "Title": "System Development Life Cycle (SDLC)",
        "SectionTags": [
            "F"
        ],
        "Pack": 3,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "System Development Life Cycle (SDLC)"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "System Development Life Cycle (SDLC)",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "Coastal Financial Services",
        "CompanyType": "Financial services",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Easy",
        "DifficultyScore": 1,
        "EstimatedMinutes": 29,
        "ExhibitCount": 1,
        "Industry": "Banking",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze system development life cycle (sdlc)",
            "Analyze system development life cycle (sdlc)",
            "Analyze system development life cycle (sdlc)",
            "Analyze system development life cycle (sdlc)",
            "Analyze system development life cycle (sdlc)"
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
                "Summary": "Full content authoring — SDLC phases, methodologies, and system development controls"
            }
        ],
        "Stakeholder": "VP of Information Technology",
        "Tags": [
            "SDLC",
            "system development",
            "waterfall",
            "agile",
            "systems analysis",
            "implementation",
            "user acceptance testing"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Coastal Financial Services is a regional bank with $2.1 billion in assets. The bank is replacing its legacy loan origination system with a modern cloud-based platform that integrates with the core banking system. The project will follow the System Development Life Cycle (SDLC) methodology. The IT governance committee has approved a budget of $1.8 million and an 18-month implementation timeline. The project team includes business analysts, developers, quality assurance testers, and business stakeholders from the lending division.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Loan Origination System Project Phases and Milestones",
                "Headers": [
                    "SDLC Phase",
                    "Key Activities",
                    "Deliverable",
                    "Estimated Duration"
                ],
                "Rows": [
                    [
                        "Planning",
                        "Feasibility study, cost-benefit analysis, project charter",
                        "Approved project charter",
                        "4 weeks"
                    ],
                    [
                        "Analysis",
                        "Requirements gathering, business process mapping, gap analysis",
                        "Functional requirements specification",
                        "8 weeks"
                    ],
                    [
                        "Design",
                        "System architecture, database design, UI/UX wireframes",
                        "Technical design document",
                        "6 weeks"
                    ],
                    [
                        "Implementation",
                        "Coding, unit testing, system integration testing",
                        "Tested and deployed system",
                        "14 weeks"
                    ],
                    [
                        "Maintenance",
                        "Post-implementation support, change management, performance monitoring",
                        "System operational",
                        "Ongoing"
                    ]
                ],
                "ExhibitID": "CBQ3-F1-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "fill",
                "Prompt": "Enter the single word that describes the SDLC phase where the project team defines functional requirements by gathering input from loan officers, credit analysts, and compliance stakeholders.",
                "Correct": "Analysis",
                "Explanation": "The Analysis phase (also called Requirements Analysis) involves gathering and documenting business requirements through interviews, workshops, and process observation. The output is a functional requirements specification. Planning is the phase that precedes Analysis and focuses on feasibility. Design follows Analysis and translates requirements into technical specifications.",
                "Topic": "SDLC phases — Analysis",
                "ItemID": "CBQ3-F1-Q1",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The SDLC is a project management framework for developing information systems. It provides structure and control over the system development process, which is critical for ensuring reliable financial systems.",
                "BusinessInterpretation": "The Analysis phase is the most critical for project success. Requirements errors discovered later in the SDLC are exponentially more expensive to fix. User involvement in this phase is essential.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Type": "fill",
                "Prompt": "Enter the two-word term for the testing phase where loan officers and credit analysts validate that the new system meets their business requirements before it is deployed to production.",
                "Correct": "User acceptance testing",
                "Explanation": "User acceptance testing (UAT) is the phase where end users validate that the system meets their business requirements and is ready for production use. UAT occurs after system integration testing and before go-live. Unit testing is done by developers. System integration testing verifies component interaction. UAT is the final quality gate before production deployment.",
                "Topic": "SDLC — testing phases",
                "ItemID": "CBQ3-F1-Q2",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "User acceptance testing is a critical control in the SDLC process. SOX-compliant organizations require UAT evidence before any financial system change is deployed to production.",
                "BusinessInterpretation": "Inadequate UAT is a common cause of failed system implementations. Users should test with real-world scenarios and data to ensure the system handles all business conditions correctly.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Type": "fill",
                "Prompt": "Enter the SDLC methodology name that uses iterative cycles (typically 2–4 weeks) with continuous stakeholder feedback, as opposed to completing all phases sequentially for the entire project.",
                "Correct": "Agile",
                "Explanation": "Agile is an iterative SDLC methodology that delivers working software in short cycles (sprints) with continuous stakeholder feedback. Waterfall is the traditional sequential methodology where each phase must be completed before the next begins. The scenario describes the iterative, feedback-driven approach characteristic of Agile development.",
                "Topic": "SDLC methodologies — Agile vs Waterfall",
                "ItemID": "CBQ3-F1-Q3",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Regardless of SDLC methodology (Waterfall or Agile), SOX requires that system changes be authorized, tested, and approved before deployment. The control objectives remain the same even as the methodology changes.",
                "BusinessInterpretation": "Agile methodologies are increasingly common in financial services because they deliver value faster and adapt to changing requirements. However, they require strong change management controls to maintain audit compliance.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Type": "fill",
                "Prompt": "Enter the two-word term for the SDLC concept that describes moving code or system changes from the development or testing environment to the live production environment.",
                "Correct": "Change management",
                "Explanation": "Change management in the SDLC context refers to the controlled process of moving system changes through development, testing, and into production. It includes authorization, testing, approval, and documentation requirements. Configuration management is related but focuses on maintaining consistency of system settings. Release management is a subset of change management focused on the deployment itself. The broader term encompassing the entire control process is change management.",
                "Topic": "Change management in SDLC",
                "ItemID": "CBQ3-F1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "IT change management is a key IT general control under SOX. Unauthorized or untested changes to financial systems can result in material misstatements. Formal change management procedures are required for SOX compliance.",
                "BusinessInterpretation": "Weak change management controls were a contributing factor in several major financial reporting failures. A formal change advisory board (CAB) should review and approve all production changes.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
                "Type": "fill",
                "Prompt": "Enter the two-word term for the environment that should be strictly separated from the development and testing environments to prevent unauthorized or untested code from affecting live operations.",
                "Correct": "Production environment",
                "Explanation": "The production environment is the live system where actual business transactions are processed. Segregation of environments is a critical IT control — developers should not have access to production, and code should only be moved to production through formal change management after testing in a separate environment. This is analogous to segregation of duties in financial processes.",
                "Topic": "Environment segregation in SDLC",
                "ItemID": "CBQ3-F1-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Segregation of environments (development, test, production) is an IT general control that prevents unauthorized changes to production systems. It is a SOX-relevant control that auditors test when evaluating ITGC.",
                "BusinessInterpretation": "Environment segregation is a fundamental control that prevents many types of IT-related fraud and errors. Organizations should implement automated deployment tools that enforce the segregation and maintain an audit trail.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F1",
                "EstimatedMinutes": 4,
                "Pack": 3,
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
        "CaseID": "CBQ3-F2",
        "Title": "Data Visualization",
        "SectionTags": [
            "F"
        ],
        "Pack": 3,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Data Visualization"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Data Visualization",
        "SecondaryCompetencies": [
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "Insight Analytics",
        "CompanyType": "Consulting",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Business intelligence consulting",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Select appropriate chart types for different data relationships",
            "Analyze dashboard design principles for management reporting",
            "Evaluate data visualization effectiveness and cognitive perception",
            "Apply data storytelling concepts to financial data communication",
            "Identify misleading visualizations and data integrity issues"
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
            "data visualization",
            "dashboard design",
            "data storytelling",
            "BI"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Insight Analytics is a business intelligence consulting firm that helps organizations improve their data visualization and reporting practices. One of their clients, a regional retail chain with 30 stores, has engaged Insight to redesign its management reporting dashboard. The current dashboard uses a mix of chart types, and management finds it difficult to quickly identify trends, outliers, and actionable insights. The engagement focuses on selecting appropriate visualizations, improving dashboard design, and ensuring data is presented without cognitive biases.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1: Client Monthly Management Dashboard — Current vs Recommended Design",
                "Headers": [
                    "Metric",
                    "Current Visualization",
                    "Problem",
                    "Recommended"
                ],
                "Rows": [
                    [
                        "Monthly revenue trend (24 months)",
                        "Pie chart showing each month as % of total",
                        "Pie chart is poor for trend comparison across many categories",
                        "Line chart — shows trend direction and seasonality clearly"
                    ],
                    [
                        "Sales by store for current month",
                        "Data table with 30 rows of numbers",
                        "Management cannot quickly identify best/worst performers",
                        "Bar chart sorted descending — highlights top and bottom stores instantly"
                    ],
                    [
                        "Revenue vs advertising spend relationship",
                        "Two separate line charts",
                        "Relationship between variables is not visible",
                        "Scatter plot with trend line — shows correlation visually"
                    ],
                    [
                        "Expense categories as % of total",
                        "Bar chart",
                        "Bar chart works but a different option may be better",
                        "Waterfall or treemap — shows composition and hierarchical structure"
                    ],
                    [
                        "Inventory turnover by product category",
                        "3D pie chart",
                        "3D perspective distorts perception of relative sizes",
                        "Horizontal bar chart — accurate comparison without 3D distortion"
                    ]
                ],
                "ExhibitID": "CBQ3-F2-E1",
                "CaseID": "CBQ3-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-F2-Q1",
                    "CBQ3-F2-Q2",
                    "CBQ3-F2-Q4"
                ]
            },
            {
                "Type": "table",
                "Title": "Exhibit 2: Data Visualization Best Practices Summary",
                "Headers": [
                    "Principle",
                    "Description",
                    "Application Example"
                ],
                "Rows": [
                    [
                        "Chart type matches data relationship",
                        "Line for trends, bar for comparisons, scatter for correlation, pie for composition (limited categories)",
                        "Use line chart for revenue trend, not pie chart"
                    ],
                    [
                        "Minimize cognitive load",
                        "Remove gridlines, 3D effects, decorative elements that do not convey information",
                        "Simplify dashboard to show only essential data-ink ratio"
                    ],
                    [
                        "Use color purposefully",
                        "Color should encode data (e.g., red = below target), not decorate",
                        "Highlight stores below target in red; use consistent color coding"
                    ],
                    [
                        "Provide context",
                        "Show benchmarks, targets, and prior periods for meaningful interpretation",
                        "Include budget line on actuals chart; show prior year comparison"
                    ],
                    [
                        "Tell a story",
                        "Arrange charts in logical sequence; annotate key insights; highlight what matters",
                        "Dashboard should lead viewer from overview → detail → action items"
                    ]
                ],
                "ExhibitID": "CBQ3-F2-E2",
                "CaseID": "CBQ3-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": [
                    "CBQ3-F2-Q3",
                    "CBQ3-F2-Q5"
                ]
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Based on Exhibit 1, each of the following retail metrics requires a specific chart type to communicate effectively. Match each data relationship to the most appropriate chart type.",
                "LeftItems": [
                    "Monthly revenue trend over 24 months showing seasonal patterns",
                    "Sales comparison across 30 stores to identify top and bottom performers",
                    "Relationship between advertising spend and weekly revenue",
                    "Proportion of total expenses by category (6 categories)"
                ],
                "RightItems": [
    "Bar chart sorted descending — enables rapid visual comparison across categories; best for ranking",
    "3D pie chart — visually engaging option that management prefers for presentations",
    "Line chart — best for continuous data over time; clearly shows trend direction, seasonality, and inflection points",
    "Scatter plot with trend line — reveals correlation between two continuous variables; shows outliers",
    "Treemap or pie chart — effective for showing part-to-whole relationships with limited categories"
],
                "Correct": {
                    "Monthly revenue trend over 24 months showing seasonal patterns": "Line chart — best for continuous data over time; clearly shows trend direction, seasonality, and inflection points",
                    "Sales comparison across 30 stores to identify top and bottom performers": "Bar chart sorted descending — enables rapid visual comparison across categories; best for ranking",
                    "Relationship between advertising spend and weekly revenue": "Scatter plot with trend line — reveals correlation between two continuous variables; shows outliers",
                    "Proportion of total expenses by category (6 categories)": "Treemap or pie chart — effective for showing part-to-whole relationships with limited categories"
                },
                "Explanation": "Line charts excel at showing trends over time. Bar charts sorted by value enable quick identification of best/worst performers. Scatter plots reveal relationships between two variables. Pie charts or treemaps effectively show composition with limited categories. 3D pie charts are explicitly NOT recommended because the 3D perspective distorts the visual perception of relative sizes, making accurate comparisons difficult.",
                "Topic": "Chart type selection based on data relationships",
                "ItemID": "CBQ3-F2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Data visualization is governed by principles of effective communication and cognitive psychology. The International Federation of Accountants (IFAC) and IMA emphasize that management accountants must communicate information clearly and effectively, which includes selecting appropriate visualization methods.",
                "BusinessInterpretation": "Poor chart selection can lead to incorrect business decisions. For example, using a pie chart for 24 months of data makes trend analysis impossible. Management accountants should develop data visualization literacy to ensure their reports drive correct decisions.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "The client's current dashboard uses a 3D pie chart to show inventory turnover by product category. The chart has 8 categories, and the 3D perspective makes the slice in front appear larger. According to Exhibit 2, what is the BEST recommendation?",
                "Correct": "Replace the 3D pie chart with a horizontal bar chart — 3D perspective creates visual distortion that misleads relative size perception; horizontal bar charts allow accurate comparison without distortion",
                "Choices": [
                    "Replace the 3D pie chart with a horizontal bar chart — 3D perspective creates visual distortion that misleads relative size perception; horizontal bar charts allow accurate comparison without distortion",
                    "Keep the 3D pie chart because it is more visually appealing and will keep management engaged during presentations",
                    "Remove the inventory turnover metric entirely — if it cannot be displayed effectively, it should not be included",
                    "Replace the 3D pie chart with a line chart — line charts are the most accurate chart type for all data visualization needs"
                ],
                "Explanation": "3D charts are a common data visualization pitfall. The 3D perspective distorts the relative size of slices — elements in the foreground appear larger than elements in the background even when they represent the same value. A horizontal bar chart is the best alternative because it enables precise comparison across all categories without distortion. Removing the metric is unnecessary when an effective alternative exists. Line charts are inappropriate for categorical composition data.",
                "Topic": "Avoiding misleading visualizations — 3D chart distortion",
                "ItemID": "CBQ3-F2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The IMA Statement of Ethical Professional Practice requires that management accountants communicate information fairly and objectively. Using visually distorted charts could be seen as a violation of the integrity and credibility standards.",
                "BusinessInterpretation": "Research in cognitive psychology shows that 3D effects and decorative elements reduce the accuracy of quantitative perception. The data-ink ratio concept (Edward Tufte) recommends maximizing the proportion of a chart's ink that conveys actual data rather than decoration.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "The client's CFO asks Insight Analytics to explain why the proposed dashboard replaces a data table showing 30 stores' sales numbers with a bar chart. Which argument BEST justifies this change?",
                "Correct": "Bar charts leverage pre-attentive processing — the human brain can rapidly compare bar lengths visually, while reading and comparing 30 numbers in a table requires sequential cognitive effort that is slower and more error-prone",
                "Choices": [
                    "Bar charts leverage pre-attentive processing — the human brain can rapidly compare bar lengths visually, while reading and comparing 30 numbers in a table requires sequential cognitive effort that is slower and more error-prone",
                    "Bar charts are always superior to data tables for any type of data presentation and should replace tables entirely in all management reports",
                    "Data tables are prohibited under GAAP for management reporting purposes — financial information must be presented in graphical format",
                    "The bar chart allows the CFO to identify exact dollar amounts more precisely than a data table would provide"
                ],
                "Explanation": "Visual perception research shows that the human brain processes certain visual attributes (length, position, color) pre-attentively — in less than 200 milliseconds without conscious effort. Comparing bar lengths is pre-attentive, while reading numbers requires serial cognitive processing. This is why bar charts enable faster pattern recognition than tables. However, tables can still be useful when exact values are needed — the best approach often combines a bar chart for pattern recognition with a supporting data table for precision.",
                "Topic": "Cognitive perception and pre-attentive processing in data visualization",
                "ItemID": "CBQ3-F2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The IMA's Management Accounting Competency Framework identifies communication as a key skill. Effective data visualization is part of communication competency — transforming raw data into actionable insights through appropriate visual representations.",
                "BusinessInterpretation": "Understanding pre-attentive processing helps management accountants design reports that communicate more effectively. For instance, using color to highlight variances, position to show ranking, and length to show magnitude enables executives to grasp key insights within seconds rather than minutes.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F2",
                "EstimatedMinutes": 6,
                "Pack": 3,
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
                "Prompt": "Insight Analytics proposes a redesigned dashboard following the principles in Exhibit 2. Which of the following dashboard design choices align with data visualization best practices? (Select all that apply.)",
                "Choices": [
                    "Removing background gridlines and reducing border clutter to focus attention on the data itself",
                    "Using red color coding to highlight stores that are below their monthly sales target",
                    "Adding a second Y-axis to a line chart so that revenue and profit margin can be shown on the same chart even though they have different scales",
                    "Including a sparkline next to each store's monthly number to show the 12-month trend in a compact format",
                    "Arranging charts in a logical left-to-right, top-to-bottom flow: executive summary → financial overview → operational detail → action items"
                ],
                "Correct": [
                    "Removing background gridlines and reducing border clutter to focus attention on the data itself",
                    "Using red color coding to highlight stores that are below their monthly sales target",
                    "Including a sparkline next to each store's monthly number to show the 12-month trend in a compact format",
                    "Arranging charts in a logical left-to-right, top-to-bottom flow: executive summary → financial overview → operational detail → action items"
                ],
                "Explanation": "Removing non-data elements (gridlines, decorative borders) follows the data-ink ratio principle. Purposeful color coding (red = below target) is a recommended practice. Sparklines provide compact trend context alongside current numbers. Logical chart arrangement supports data storytelling. The distractor (dual Y-axis) is problematic — different scales can mislead the viewer about the relationship between the two metrics; a better approach is to use separate charts with aligned time axes or indexed scales.",
                "Topic": "Dashboard design principles and best practices",
                "ItemID": "CBQ3-F2-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Effective management reporting follows principles of clarity, relevance, and reliability. The IMA's Statement on Management Accounting on Developing Comprehensive Performance Indicators emphasizes that performance reports should be designed to communicate information effectively to decision-makers.",
                "BusinessInterpretation": "Dashboard design directly affects decision quality. A well-designed dashboard reduces the time managers spend finding information and increases the time available for analysis and action. Poor dashboard design is a common but fixable source of operational inefficiency.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F2",
                "EstimatedMinutes": 7,
                "Pack": 3,
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
                "Prompt": "Insight Analytics trains the client's finance team on data storytelling. Match each data presentation goal to the visualization approach that BEST achieves it.",
                "LeftItems": [
                    "Show that Q4 sales are consistently higher than other quarters across three years",
                    "Identify which product categories have profit margins significantly above or below the company average",
                    "Communicate to the board that the company achieved its revenue target despite economic headwinds",
                    "Compare each store's actual sales to its individual target and prior year performance"
                ],
                "RightItems": [
    "3D exploded pie chart — makes the presentation visually impressive for the board meeting",
    "Small multiples (three line charts side by side) — enables comparison of quarterly patterns across years while maintaining consistent scale",
    "Diverging bar chart centered on the average — categories extending right are above average; left are below; zero line provides immediate reference",
    "Annotated KPI dashboard with trend arrow and variance callout — headline number, trend line, and contextual narrative guide interpretation",
    "Bullet chart for each store — shows actual vs target vs prior year in a compact, single-bar format with comparative benchmarks"
],
                "Correct": {
                    "Show that Q4 sales are consistently higher than other quarters across three years": "Small multiples (three line charts side by side) — enables comparison of quarterly patterns across years while maintaining consistent scale",
                    "Identify which product categories have profit margins significantly above or below the company average": "Diverging bar chart centered on the average — categories extending right are above average; left are below; zero line provides immediate reference",
                    "Communicate to the board that the company achieved its revenue target despite economic headwinds": "Annotated KPI dashboard with trend arrow and variance callout — headline number, trend line, and contextual narrative guide interpretation",
                    "Compare each store's actual sales to its individual target and prior year performance": "Bullet chart for each store — shows actual vs target vs prior year in a compact, single-bar format with comparative benchmarks"
                },
                "Explanation": "Each goal requires a specific visualization approach. Small multiples are ideal for comparing patterns across time periods. Diverging bar charts effectively show deviation from a reference point (average). Annotated KPI dashboards combine data with narrative context. Bullet charts are specifically designed for displaying performance against targets in limited space. 3D exploded pie charts are inappropriate — they introduce perceptual distortion and prioritize visual flair over accurate communication.",
                "Topic": "Data storytelling — matching visualization to communication goal",
                "ItemID": "CBQ3-F2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Long",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Data storytelling combines data visualization with narrative context to drive decision-making. The IMA's competence standard requires management accountants to present information in a format that facilitates understanding and appropriate action.",
                "BusinessInterpretation": "The most effective management reports combine three elements: data (accurate numbers), visual (appropriate charts), and narrative (context and interpretation). Reports that only provide numbers without context or visual structure are less likely to drive action.",
                "CalculationRequired": false,
                "CaseID": "CBQ3-F2",
                "EstimatedMinutes": 8,
                "Pack": 3,
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
    }
];;
 
if (typeof module === 'object' && module.exports) module.exports = ENHANCED_CASE_BASE3;

function cloneEnhancedCase3(c, packLabel, index) {
  return {
    ...c,
    CaseID: `${c.CaseID}-${packLabel}`,
    Title: `${c.Title} (${packLabel} simulation)`,
    ScenarioText: `${c.ScenarioText} This is Pack ${packLabel}, case ${index + 1}; use all exhibits before answering.`
  };
}

const ENHANCED_CASE_BANK3_A = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'A', i));
const ENHANCED_CASE_BANK3_B = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'B', i));
const ENHANCED_CASE_BANK3_C = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'C', i));
const ENHANCED_CASE_BANK3_D = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'D', i));
const ENHANCED_CASE_BANK3_E = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'E', i));
const ENHANCED_CASE_BANK3_F = ENHANCED_CASE_BASE3.map((c, i) => cloneEnhancedCase3(c, 'F', i));


// === MIGRATED STANDARD CASES (Session 60) ===
const MIGRATED_CASE_BASE_C = [
    {
        "CaseID": "CASE-C1",
        "Title": "Revenue Recognition and Lease Accounting Review",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Alderbrook Systems sells industrial sensors bundled with a two-year maintenance service and also leases a portion of its warehouse space to a third party. The controller is preparing year-end disclosures covering revenue recognition for the bundled contracts, lease classification for the warehouse arrangement, and related balance sheet presentation under current U.S. GAAP.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Alderbrook sells a sensor with a distinct two-year maintenance plan for a single contract price. How should the transaction price be recognized?",
                "Choices": [
                    "Allocate the transaction price to the sensor and maintenance performance obligations and recognize revenue as each is satisfied",
                    "Recognize all revenue when the sensor ships",
                    "Defer all revenue until the maintenance period ends",
                    "Recognize revenue only when cash is collected"
                ],
                "Correct": "Allocate the transaction price to the sensor and maintenance performance obligations and recognize revenue as each is satisfied",
                "Explanation": "Under ASC 606, Revenue is allocated to each distinct performance obligation and recognized as each is satisfied, not all at delivery or all at contract end. Distractors reflect common errors: recognizing all revenue at shipment ignores the maintenance performance obligation; deferring all revenue until maintenance ends ignores that the sensor performance obligation is satisfied at delivery; recognizing revenue only on cash collection follows cash-basis accounting, which is not permitted under U.S. GAAP.",
                "Topic": "Revenue Recognition and Lease Accounting Review",
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
                "ItemID": "CASE-C1-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Alderbrook leases warehouse space to a third party for five years. As lessor, if the lease transfers substantially all risks and rewards of ownership, how should it be classified?",
                "Choices": [
                    "As a finance lease",
                    "As an operating lease automatically regardless of terms",
                    "As a service contract",
                    "As a sale with no lease recognition"
                ],
                "Correct": "As a finance lease",
                "Explanation": "Under ASC 842, A lease that transfers substantially all risks and rewards of ownership to the lessee is classified as a finance lease from the lessor's perspective. Distractors reflect common misunderstandings: an operating lease is not automatic regardless of terms — classification depends on the substance of the arrangement; a lease is not a service contract because it conveys control of an identified asset; a lease is not a sale because it transfers the right to use, not outright ownership.",
                "Topic": "Revenue Recognition and Lease Accounting Review",
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
                "ItemID": "CASE-C1-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Alderbrook receives a $120,000 upfront payment for a 24-month maintenance contract on January 1. Using straight-line recognition, how much revenue should be recognized in the first 6 months?",
                "Correct": "30000",
                "Explanation": "Under ASC 606, Revenue recognized = 120,000 / 24 months x 6 months = 30,000.",
                "Topic": "Revenue Recognition and Lease Accounting Review",
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
                "ItemID": "CASE-C1-Q3",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "multi",
                "Prompt": "Select the criteria that must generally be met to recognize revenue from a performance obligation satisfied over time.",
                "Choices": [
                    "The customer simultaneously receives and consumes the benefits",
                    "The entity's performance creates or enhances an asset the customer controls",
                    "The asset does NOT have an alternative use and the entity has an enforceable right to payment for performance completed to date",
                    "Revenue is always recognized over time regardless of these criteria"
                ],
                "Correct": [
                    "The customer simultaneously receives and consumes the benefits",
                    "The entity's performance creates or enhances an asset the customer controls",
                    "The asset does NOT have an alternative use and the entity has an enforceable right to payment for performance completed to date"
                ],
                "Explanation": "Under ASC 606-10-25-27, a performance obligation is satisfied over time if any of three criteria are met: (1) the customer simultaneously receives and consumes the benefits; (2) the entity's performance creates or enhances an asset the customer controls; or (3) the asset does not have an alternative use to the entity and the entity has an enforceable right to payment for performance completed to date. The first two choices represent criteria (1) and (2). The third choice is the corrected criterion (3). The fourth choice is incorrect because revenue is not always recognized over time — it depends on meeting one of these criteria.",
                "Topic": "Revenue Recognition and Lease Accounting Review",
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
                "ItemID": "CASE-C1-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Under the five-step revenue recognition model, the step that involves determining the total consideration expected in exchange for goods or services is called determining the ______.",
                "Correct": "transaction price",
                "Explanation": "Under ASC 606, The transaction price is the amount of consideration an entity expects to be entitled to in exchange for transferring promised goods or services.",
                "Topic": "Revenue Recognition and Lease Accounting Review",
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
                "ItemID": "CASE-C1-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C2",
        "Title": "Budgeting and Forecasting for a Seasonal Retailer",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Brightwater Outfitters is a seasonal outdoor retailer preparing its annual master budget. Sales are highly seasonal, peaking in Q2 and Q3. The finance team must build a sales forecast using regression analysis, translate it into a production and cash budget, and evaluate the risk of budgetary slack from store managers.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Brightwater uses regression analysis on five years of quarterly sales data to project next year's sales. What is the main advantage of this technique over simple trend extrapolation?",
                "Choices": [
                    "It quantifies the statistical relationship between sales and identified independent variables",
                    "It removes all forecasting risk",
                    "It requires no historical data",
                    "It guarantees the forecast will be exact"
                ],
                "Correct": "It quantifies the statistical relationship between sales and identified independent variables",
                "Explanation": "In management accounting practice, Regression analysis quantifies the relationship between a dependent variable and independent variables based on historical data, providing a more rigorous basis than simple extrapolation. Distractors reflect common errors: overstating the technique — regression provides a statistical basis but does not eliminate forecasting risk; fundamentally misunderstanding regression — it requires historical data to identify relationships; no forecasting technique guarantees exact results — regression provides a best-fit estimate with measurable error.",
                "Topic": "Budgeting and Forecasting for a Seasonal Retailer",
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
                "ItemID": "CASE-C2-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Brightwater forecasts Q3 sales of 60,000 units, wants ending inventory of 8,000 units, and has beginning inventory of 6,000 units. How many units should be produced in Q3?",
                "Correct": "62000",
                "Explanation": "In management accounting practice, Production = Budgeted sales + Desired ending inventory - Beginning inventory = 60,000 + 8,000 - 6,000 = 62,000 units.",
                "Topic": "Budgeting and Forecasting for a Seasonal Retailer",
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
                "ItemID": "CASE-C2-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Several store managers consistently submit budget forecasts well below what they later achieve. What risk does this suggest?",
                "Choices": [
                    "Budgetary slack, where targets are deliberately understated to be easily achievable",
                    "A necessary and unavoidable forecasting error",
                    "Evidence that the company should stop budgeting",
                    "A sign that the sales budget should be prepared last"
                ],
                "Correct": "Budgetary slack, where targets are deliberately understated to be easily achievable",
                "Explanation": "In management accounting practice, Consistently beating conservative targets by a wide margin suggests managers built budgetary slack into their submissions to make targets easier to achieve. Distractors reflect common errors: dismissing the pattern as unavoidable — consistent, wide-margin outperformance is often deliberate slack, not random error; overreacting by suggesting budgeting be eliminated — the problem is the process design, not budgeting itself; confusing budget sequence — the sales budget is the starting point of the master budget and must be prepared first.",
                "Topic": "Budgeting and Forecasting for a Seasonal Retailer",
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
                "ItemID": "CASE-C2-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select items typically included in a cash budget.",
                "Choices": [
                    "Cash collections from customers",
                    "Cash disbursements for purchases and operating expenses",
                    "Planned financing activities such as loan draws or repayments",
                    "Noncash depreciation expense"
                ],
                "Correct": [
                    "Cash collections from customers",
                    "Cash disbursements for purchases and operating expenses",
                    "Planned financing activities such as loan draws or repayments"
                ],
                "Explanation": "In management accounting practice, A cash budget includes cash collections, cash disbursements, and financing activity but excludes noncash items like depreciation, which do not affect cash.",
                "Topic": "Budgeting and Forecasting for a Seasonal Retailer",
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
                "ItemID": "CASE-C2-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A budget that is updated periodically by adding a new period as the oldest period is dropped, keeping a constant planning horizon, is called a ______ forecast.",
                "Correct": "rolling",
                "Explanation": "In management accounting practice, A rolling forecast continuously extends the planning horizon, adding a new period as each period concludes.",
                "Topic": "Budgeting and Forecasting for a Seasonal Retailer",
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
                "ItemID": "CASE-C2-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C3",
        "Title": "Performance Evaluation Across Divisions",
        "SectionTags": [
            "C"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Cedarline Industries operates three divisions with different levels of managerial control over assets, costs, and pricing. The corporate controller is redesigning the performance evaluation system to align manager incentives with the level of control each manager actually has, and is also reviewing a proposed transfer pricing policy between two divisions.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "The manager of Cedarline's Northern Division controls division costs, revenue, and the assets invested in the division. What type of responsibility center is most appropriate for evaluation?",
                "Choices": [
                    "An investment center",
                    "A cost center",
                    "A revenue center",
                    "A discretionary expense center"
                ],
                "Correct": "An investment center",
                "Explanation": "Under responsibility accounting, A manager who controls costs, revenue, and asset investment should be evaluated as an investment center, typically using ROI, residual income, or EVA. Distractors reflect common errors: a cost center is too narrow because it ignores the revenue and asset dimensions this manager controls; a revenue center also omits cost and asset accountability; a discretionary expense center applies where outputs are not measurable in monetary terms, which is not the case here.",
                "Topic": "Performance Evaluation Across Divisions",
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
                "ItemID": "CASE-C3-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Cedarline's Eastern Division reports operating income of 360,000 on average operating assets of 2,400,000, with a required rate of return of 12%. What is residual income?",
                "Correct": "72000",
                "Explanation": "Under responsibility accounting, Residual income = Operating income - (Required rate x Average assets) = 360,000 - (0.12 x 2,400,000) = 360,000 - 288,000 = 72,000.",
                "Topic": "Performance Evaluation Across Divisions",
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
                "ItemID": "CASE-C3-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Two Cedarline divisions negotiate a transfer price between the market price and the selling division's variable cost. What is the primary advantage of this approach?",
                "Choices": [
                    "It preserves divisional autonomy while reaching a mutually acceptable price",
                    "It guarantees the companywide optimal transfer price in every case",
                    "It removes the need for any market price reference",
                    "It always maximizes the buying division's reported profit"
                ],
                "Correct": "It preserves divisional autonomy while reaching a mutually acceptable price",
                "Explanation": "Under responsibility accounting, Negotiated transfer pricing preserves divisional autonomy and allows managers to reach a price both consider acceptable, though it does not guarantee a companywide-optimal outcome. Distractors reflect common errors: overstating the outcome — negotiated pricing may produce a suboptimal result if divisions cannot agree or prioritize their own interests; misrepresenting the need for market reference — the negotiation range is bounded by market price (ceiling) and variable cost (floor); assuming negotiation always maximizes the buyer's profit — a higher transfer price reduces buyer profit.",
                "Topic": "Performance Evaluation Across Divisions",
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
                "ItemID": "CASE-C3-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select measures commonly used to evaluate an investment center.",
                "Choices": [
                    "Return on investment",
                    "Residual income",
                    "Economic value added",
                    "Direct labor efficiency variance only"
                ],
                "Correct": [
                    "Return on investment",
                    "Residual income",
                    "Economic value added"
                ],
                "Explanation": "Under responsibility accounting, Investment centers are typically evaluated using ROI, residual income, and economic value added, all of which incorporate the assets invested, unlike a cost-only variance measure.",
                "Topic": "Performance Evaluation Across Divisions",
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
                "ItemID": "CASE-C3-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: The principle stating that managers should be evaluated only on revenues, costs, or assets they can influence is called the ______ principle.",
                "Correct": "controllability",
                "Explanation": "Under responsibility accounting, The controllability principle holds that performance evaluation should be limited to items a manager can actually influence or control.",
                "Topic": "Performance Evaluation Across Divisions",
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
                "ItemID": "CASE-C3-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C4",
        "Title": "Cost Management in a Manufacturing Redesign",
        "SectionTags": [
            "D"
        ],
        "BlueprintDomain": "Cost Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Driftwood Manufacturing produces custom furniture and is redesigning its costing system, moving from a single plantwide overhead rate to activity-based costing while also evaluating joint cost allocation for two products emerging from a shared finishing process.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Driftwood implements activity-based costing and must choose a cost driver for its machine setup activity pool. What characteristic should this driver have?",
                "Choices": [
                    "A strong cause-and-effect relationship with the costs in that activity pool",
                    "The lowest possible numerical value each period",
                    "Identical values to the direct labor hour driver used elsewhere",
                    "No relationship to the actual setup activity performed"
                ],
                "Correct": "A strong cause-and-effect relationship with the costs in that activity pool",
                "Explanation": "Under cost accounting standards, An effective ABC cost driver has a strong cause-and-effect relationship with the costs incurred in that specific activity pool. Distractors reflect common errors: selecting a driver based on magnitude rather than relevance to the activity; using the same driver for all pools defeats the purpose of ABC and reverts to traditional absorption costing; a driver with no causal relationship to the activity is meaningless.",
                "Topic": "Cost Management in a Manufacturing Redesign",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C4-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Driftwood's setup activity pool has 156,000 of cost and 1,200 setup hours. Product line X uses 80 setup hours. What setup cost is assigned to Product line X?",
                "Correct": "10400",
                "Explanation": "Under cost accounting standards, Activity rate = 156,000 / 1,200 = 130 per hour. Cost assigned = 130 x 80 = 10,400.",
                "Topic": "Cost Management in a Manufacturing Redesign",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C4-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Driftwood allocates joint costs to two products based on their relative sales value at the split-off point. What method is being used?",
                "Choices": [
                    "The sales value at split-off method",
                    "The physical units method",
                    "The first-in first-out method",
                    "The high-low method"
                ],
                "Correct": "The sales value at split-off method",
                "Explanation": "Under cost accounting standards, The sales value at split-off method allocates joint costs based on each joint product's relative sales value at the point where products become separately identifiable. Distractors reflect common errors: the physical units method allocates joint costs based on weight or volume, not economic value at split-off; FIFO is an inventory flow assumption, not a joint cost allocation method; the high-low method is a cost estimation technique, not a joint cost allocation method.",
                "Topic": "Cost Management in a Manufacturing Redesign",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C4-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select costs that would be classified as prevention costs in a cost of quality report.",
                "Choices": [
                    "Employee quality training",
                    "Process design improvements to reduce defects",
                    "Supplier quality certification programs",
                    "Warranty claim payments after shipment"
                ],
                "Correct": [
                    "Employee quality training",
                    "Process design improvements to reduce defects",
                    "Supplier quality certification programs"
                ],
                "Explanation": "Under cost accounting standards, Prevention costs are incurred to avoid producing defective output, including training, process design, and supplier certification; warranty claims are external failure costs.",
                "Topic": "Cost Management in a Manufacturing Redesign",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C4-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: The range of activity within which assumptions about fixed and variable cost behavior remain valid is called the ______ range.",
                "Correct": "relevant",
                "Explanation": "Under cost accounting standards, The relevant range is the band of activity levels over which assumed cost behavior patterns hold true.",
                "Topic": "Cost Management in a Manufacturing Redesign",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C4-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C5",
        "Title": "Internal Control Assessment for a Growing Company",
        "SectionTags": [
            "E"
        ],
        "BlueprintDomain": "Internal Controls",
        "EstimatedMinutes": 25,
        "ScenarioText": "Emberton Logistics has grown quickly and its internal audit team is assessing control weaknesses in cash handling, purchasing, and IT access, while also evaluating the company's overall control environment ahead of a planned external audit.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Emberton has one employee who opens mail, records cash receipts, and prepares bank deposits. What control weakness does this create?",
                "Choices": [
                    "A lack of segregation of duties between asset custody and recordkeeping",
                    "An overly strong control environment",
                    "A physical access weakness only related to the mailroom",
                    "An IT general control deficiency only"
                ],
                "Correct": "A lack of segregation of duties between asset custody and recordkeeping",
                "Explanation": "Under the COSO Internal Control Framework, Combining cash custody and recordkeeping in one role increases the risk that theft could occur and be concealed in the records. Distractors reflect common errors: mischaracterizing the problem — combining incompatible duties weakens controls, not strengthens them; narrowing the issue to physical access only misses the segregation-of-duties gap; this is a control activity weakness, not an IT general control issue.",
                "Topic": "Internal Control Assessment for a Growing Company",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C5-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Emberton's board and executives consistently emphasize integrity and ethical behavior in company communications and training. What COSO component does this reflect?",
                "Choices": [
                    "The control environment",
                    "Risk assessment",
                    "Monitoring activities",
                    "Information and communication"
                ],
                "Correct": "The control environment",
                "Explanation": "Under the COSO Internal Control Framework, The control environment, often summarized as tone at the top, reflects the integrity and ethical values set by leadership. Distractors reflect common errors: risk assessment involves identifying and analyzing risks to achieving objectives, not establishing ethical values; monitoring involves ongoing evaluations of control effectiveness, not tone at the top; information and communication deals with the flow of relevant information, not the ethical foundation set by leadership.",
                "Topic": "Internal Control Assessment for a Growing Company",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C5-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Emberton requires periodic review of employee system access to ensure privileges match current job roles. What type of control is this?",
                "Choices": [
                    "An IT general control over logical access",
                    "A physical control over the data center",
                    "A budgetary control over IT spending",
                    "An application control embedded in transaction processing"
                ],
                "Correct": "An IT general control over logical access",
                "Explanation": "Under the COSO Internal Control Framework, Periodic access reviews are an IT general control that ensures logical access rights remain appropriate for each employee's current role. Distractors reflect common errors: a physical control restricts physical access to facilities, not logical system access; a budgetary control concerns spending limits, not security access rights; application controls are embedded in specific business processes, while periodic access review is an entity-wide IT general control.",
                "Topic": "Internal Control Assessment for a Growing Company",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C5-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select elements of the fraud triangle.",
                "Choices": [
                    "Perceived pressure",
                    "Perceived opportunity",
                    "Rationalization",
                    "Segregation of duties"
                ],
                "Correct": [
                    "Perceived pressure",
                    "Perceived opportunity",
                    "Rationalization"
                ],
                "Explanation": "Under the COSO Internal Control Framework, The fraud triangle consists of perceived pressure, perceived opportunity, and rationalization; segregation of duties is a control, not an element of the fraud triangle.",
                "Topic": "Internal Control Assessment for a Growing Company",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C5-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: When management or executives bypass established controls to achieve a desired outcome, this is called management ______.",
                "Correct": "override",
                "Explanation": "Under the COSO Internal Control Framework, Management override occurs when individuals with authority bypass established controls, a limitation no control system can fully prevent.",
                "Topic": "Internal Control Assessment for a Growing Company",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C5-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C6",
        "Title": "Technology Transformation and Data Governance",
        "SectionTags": [
            "F"
        ],
        "BlueprintDomain": "Technology and Analytics",
        "EstimatedMinutes": 25,
        "ScenarioText": "Fairhaven Analytics is implementing a new ERP system and building out a data governance program, while also evaluating robotic process automation for repetitive finance tasks and strengthening cybersecurity monitoring.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Fairhaven establishes clear ownership, standard definitions, and quality requirements for its enterprise data. What concept does this describe?",
                "Choices": [
                    "Data governance",
                    "Data visualization",
                    "Robotic process automation",
                    "Predictive analytics"
                ],
                "Correct": "Data governance",
                "Explanation": "Under information systems governance, Data governance establishes ownership, definitions, and quality standards for how data is managed across an organization. Distractors reflect common errors: data visualization presents data graphically, not establishing ownership or governance rules; RPA automates repetitive tasks and is unrelated to data governance; predictive analytics forecasts future outcomes and does not set data management policies.",
                "Topic": "Technology Transformation and Data Governance",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C6-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Fairhaven automates a repetitive, rules-based invoice data entry task between two systems. What technology is best suited to this task?",
                "Choices": [
                    "Robotic process automation",
                    "Blockchain",
                    "Predictive analytics",
                    "Data visualization"
                ],
                "Correct": "Robotic process automation",
                "Explanation": "Under information systems governance, RPA is well suited to repetitive, rules-based, high-volume tasks such as data entry between systems. Distractors reflect common errors: blockchain is a distributed ledger technology, not an automation tool for data entry between existing systems; predictive analytics forecasts outcomes from data, not performing the automation function; data visualization presents information, not automating transaction processing.",
                "Topic": "Technology Transformation and Data Governance",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C6-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Fairhaven's security policy addresses protecting data from unauthorized disclosure, unauthorized modification, and ensuring systems remain accessible. What framework do these three objectives represent?",
                "Choices": [
                    "The confidentiality, integrity, and availability (CIA) triad",
                    "The COSO Internal Control Framework",
                    "The balanced scorecard",
                    "The fraud triangle"
                ],
                "Correct": "The confidentiality, integrity, and availability (CIA) triad",
                "Explanation": "Under information systems governance, The CIA triad represents the three foundational objectives of information security: confidentiality, integrity, and availability. Distractors reflect common errors: the COSO Internal Control Framework addresses control objectives, not specifically confidentiality, integrity, and availability; the balanced scorecard is a strategic performance management framework; the fraud triangle explains conditions for fraud, not information security objectives.",
                "Topic": "Technology Transformation and Data Governance",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C6-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select dimensions commonly used to assess data quality.",
                "Choices": [
                    "Accuracy",
                    "Completeness",
                    "Consistency",
                    "Network bandwidth"
                ],
                "Correct": [
                    "Accuracy",
                    "Completeness",
                    "Consistency"
                ],
                "Explanation": "Under information systems governance, Data quality is typically assessed on dimensions like accuracy, completeness, consistency, timeliness, and validity; network bandwidth is an infrastructure metric, not a data quality dimension.",
                "Topic": "Technology Transformation and Data Governance",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C6-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A system that improves its performance on a task over time by learning patterns from data, without explicit reprogramming, is called ______ learning.",
                "Correct": "machine",
                "Explanation": "Under information systems governance, Machine learning allows systems to improve performance on a task by learning from data rather than through explicit reprogramming.",
                "Topic": "Technology Transformation and Data Governance",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C6-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C7",
        "Title": "Consolidated Reporting and Impairment Review",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Gladstone Holdings recently acquired a smaller competitor and must account for the business combination, test goodwill for impairment, and evaluate a held-for-sale classification for a discontinued product line.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Gladstone acquires a company in a business combination. How should identifiable assets acquired and liabilities assumed be measured?",
                "Choices": [
                    "At their acquisition-date fair values",
                    "At the acquirer's historical book values",
                    "At the target's original historical cost",
                    "At replacement cost only"
                ],
                "Correct": "At their acquisition-date fair values",
                "Explanation": "Under the acquisition method, identifiable assets acquired and liabilities assumed are measured at acquisition-date fair value. Distractors reflect common errors: the acquisition method requires fair value at the acquisition date, not the acquirer's historical book values; the target's original historical cost is irrelevant — a new basis of accounting is established at fair value; replacement cost is not the GAAP measurement basis for business combinations.",
                "Topic": "Consolidated Reporting and Impairment Review",
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
                "ItemID": "CASE-C7-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Gladstone performs its annual goodwill impairment test. What is the correct approach?",
                "Choices": [
                    "Compare the reporting unit's fair value to its carrying amount and recognize impairment for any excess of carrying value over fair value",
                    "Amortize goodwill on a straight-line basis over 40 years",
                    "Never test goodwill unless the reporting unit is sold",
                    "Increase goodwill whenever fair value exceeds carrying amount"
                ],
                "Correct": "Compare the reporting unit's fair value to its carrying amount and recognize impairment for any excess of carrying value over fair value",
                "Explanation": "Under ASC 350, Goodwill is tested at least annually by comparing the reporting unit's fair value to its carrying amount, with impairment recognized for any excess of carrying value over fair value. Distractors reflect common errors: goodwill amortization over 40 years was the pre-2001 approach — ASC 350 replaced amortization with impairment testing; goodwill must be tested at least annually, not only when the unit is sold; GAAP only recognizes impairment write-downs, not upward revaluation of goodwill.",
                "Topic": "Consolidated Reporting and Impairment Review",
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
                "ItemID": "CASE-C7-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Gladstone classifies a discontinued product line's assets as held for sale. How should these assets be measured?",
                "Choices": [
                    "At the lower of carrying amount or fair value less costs to sell",
                    "At historical cost with no further adjustment",
                    "At fair value with gains recognized immediately",
                    "At replacement cost regardless of fair value"
                ],
                "Correct": "At the lower of carrying amount or fair value less costs to sell",
                "Explanation": "Under ASC 360, Assets held for sale are measured at the lower of carrying amount or fair value less costs to sell, and depreciation ceases once classified as held for sale. Distractors reflect common errors: ignoring the lower-of rule would overstate the asset if fair value less costs to sell is below carrying amount; GAAP prohibits immediate gain recognition — only impairment losses are recognized; replacement cost is irrelevant for held-for-sale measurement.",
                "Topic": "Consolidated Reporting and Impairment Review",
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
                "ItemID": "CASE-C7-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select items that should be disclosed for a loss contingency that is reasonably possible but not probable and is estimable.",
                "Choices": [
                    "The nature of the contingency",
                    "An estimate of the possible loss or range of loss",
                    "A statement in the notes rather than an accrued liability",
                    "Full accrual of the maximum possible loss on the balance sheet"
                ],
                "Correct": [
                    "The nature of the contingency",
                    "An estimate of the possible loss or range of loss",
                    "A statement in the notes rather than an accrued liability"
                ],
                "Explanation": "Under ASC 450, A reasonably possible (not probable) loss contingency is disclosed in the notes describing the nature and estimated amount, without accruing a liability.",
                "Topic": "Consolidated Reporting and Impairment Review",
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
                "ItemID": "CASE-C7-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A component that meets held-for-sale criteria and represents a strategic shift is presented separately as ______ operations, net of tax.",
                "Correct": "discontinued",
                "Explanation": "Under ASC 205-20, A component meeting the discontinued-operation criteria is presented separately as discontinued operations, net of tax.",
                "Topic": "Consolidated Reporting and Impairment Review",
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
                "ItemID": "CASE-C7-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C8",
        "Title": "Master Budget Development for a Manufacturer",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Hearthstone Appliances is building its annual master budget, starting with a sales forecast and flowing through production, direct materials, and cash budgets, while also evaluating whether to adopt zero-based budgeting for overhead departments.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Which budget is typically prepared first in Hearthstone's master budget process because other budgets depend on it?",
                "Choices": [
                    "The sales budget",
                    "The direct labor budget",
                    "The capital expenditures budget",
                    "The selling and administrative expense budget"
                ],
                "Correct": "The sales budget",
                "Explanation": "In management accounting practice, The sales budget is typically prepared first because production, purchasing, and other budgets are derived from projected sales. Distractors reflect common errors: the direct labor budget is prepared after the production budget, which depends on the sales budget; the capital expenditures budget is independent of the operating budget cycle; the selling and administrative expense budget depends on sales volume and is prepared after the sales budget.",
                "Topic": "Master Budget Development for a Manufacturer",
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
                "ItemID": "CASE-C8-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Hearthstone's highest activity level is 9,000 machine hours costing 74,000, and its lowest activity level is 6,000 machine hours costing 59,000. What is the estimated variable cost per machine hour using the high-low method?",
                "Correct": "5",
                "Explanation": "In management accounting practice, Variable cost per unit = (74,000 - 59,000) / (9,000 - 6,000) = 15,000 / 3,000 = 5.00 per hour.",
                "Topic": "Master Budget Development for a Manufacturer",
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
                "ItemID": "CASE-C8-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Hearthstone considers requiring every overhead department to justify all costs from a zero base each year. What budgeting technique is this?",
                "Choices": [
                    "Zero-based budgeting",
                    "Incremental budgeting",
                    "Kaizen budgeting",
                    "Activity-based budgeting only"
                ],
                "Correct": "Zero-based budgeting",
                "Explanation": "In management accounting practice, Zero-based budgeting requires justification of all costs each period starting from zero, rather than adjusting the prior year's budget. Distractors reflect common errors: incremental budgeting adjusts the prior period's budget without requiring zero-base justification; kaizen budgeting incorporates continuous incremental cost reductions, not starting from zero; activity-based budgeting allocates costs based on activities, not zero-base justification.",
                "Topic": "Master Budget Development for a Manufacturer",
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
                "ItemID": "CASE-C8-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select factors that typically increase the risk of budgetary slack.",
                "Choices": [
                    "Participative budgeting with little oversight",
                    "Compensation tied closely to meeting easily achievable targets",
                    "Lack of review of submitted budget assumptions",
                    "Independent verification of all budget assumptions by finance"
                ],
                "Correct": [
                    "Participative budgeting with little oversight",
                    "Compensation tied closely to meeting easily achievable targets",
                    "Lack of review of submitted budget assumptions"
                ],
                "Explanation": "In management accounting practice, Budgetary slack risk increases when managers set their own targets with limited oversight, especially when compensation rewards easily beaten targets and assumptions go unverified.",
                "Topic": "Master Budget Development for a Manufacturer",
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
                "ItemID": "CASE-C8-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A budgeting approach that builds assumed continuous, incremental cost reductions into the budget is called ______ budgeting.",
                "Correct": "kaizen",
                "Explanation": "In management accounting practice, Kaizen budgeting incorporates assumed ongoing, incremental improvements and cost reductions directly into the budget.",
                "Topic": "Master Budget Development for a Manufacturer",
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
                "ItemID": "CASE-C8-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C9",
        "Title": "Balanced Scorecard and Variance Investigation",
        "SectionTags": [
            "C"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Ironvale Components has implemented a balanced scorecard to track performance across four perspectives and is also investigating significant sales and cost variances identified during the quarterly review.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Ironvale wants to link strategy to financial and nonfinancial measures across the organization. Which framework uses four perspectives to accomplish this?",
                "Choices": [
                    "The balanced scorecard, using financial, customer, internal process, and learning and growth perspectives",
                    "A single-metric ROI dashboard",
                    "A static budget variance report",
                    "A cash flow statement only"
                ],
                "Correct": "The balanced scorecard, using financial, customer, internal process, and learning and growth perspectives",
                "Explanation": "Under responsibility accounting, The balanced scorecard translates strategy into objectives across financial, customer, internal process, and learning and growth perspectives. Distractors reflect common errors: a single-metric ROI dashboard lacks the multi-perspective approach of the balanced scorecard; a static budget variance report does not link strategy to financial and nonfinancial measures; the cash flow statement is a single financial statement, not a multi-perspective framework.",
                "Topic": "Balanced Scorecard and Variance Investigation",
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
                "ItemID": "CASE-C9-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Ironvale budgeted to sell units at 40 each but actually sold them at 37 each, with actual volume of 15,000 units. What is the sales price variance?",
                "Correct": "45000",
                "Explanation": "Under responsibility accounting, Sales price variance = (Actual price - Budgeted price) x Actual units = (37 - 40) x 15,000 = -45,000, or 45,000 Unfavorable.",
                "Topic": "Balanced Scorecard and Variance Investigation",
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
                "ItemID": "CASE-C9-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Ironvale's controller reviews only variances exceeding a set dollar threshold rather than every line item. What principle is being applied?",
                "Choices": [
                    "Management by exception",
                    "Zero-based budgeting",
                    "The controllability principle",
                    "Kaizen costing"
                ],
                "Correct": "Management by exception",
                "Explanation": "Under responsibility accounting, Management by exception directs attention to variances exceeding a predetermined threshold, an efficient use of limited management time. Distractors reflect common errors: zero-based budgeting is a budgeting technique, not a variance investigation principle; the controllability principle governs evaluation responsibility, not variance selection; kaizen costing builds continuous improvements into cost standards, unrelated to investigation thresholds.",
                "Topic": "Balanced Scorecard and Variance Investigation",
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
                "ItemID": "CASE-C9-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select nonfinancial measures that would typically appear in the customer perspective of a balanced scorecard.",
                "Choices": [
                    "Customer satisfaction score",
                    "On-time delivery rate",
                    "Customer retention rate",
                    "Return on investment"
                ],
                "Correct": [
                    "Customer satisfaction score",
                    "On-time delivery rate",
                    "Customer retention rate"
                ],
                "Explanation": "Under responsibility accounting, The customer perspective focuses on measures like satisfaction, delivery performance, and retention; ROI belongs to the financial perspective.",
                "Topic": "Balanced Scorecard and Variance Investigation",
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
                "ItemID": "CASE-C9-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Decomposing return on investment into profit margin multiplied by asset turnover is known as the ______ method.",
                "Correct": "DuPont",
                "Explanation": "Under responsibility accounting, The DuPont method decomposes ROI into profit margin (income/sales) multiplied by asset turnover (sales/assets).",
                "Topic": "Balanced Scorecard and Variance Investigation",
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
                "ItemID": "CASE-C9-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C10",
        "Title": "Process Costing and Standard Cost Variances",
        "SectionTags": [
            "D"
        ],
        "BlueprintDomain": "Cost Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Junction Textiles uses process costing for its high-volume fabric line and standard costing for variance analysis, and is evaluating whether to switch from absorption costing to variable costing for internal reporting.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Junction uses the weighted average method of process costing. How does this method treat beginning work in process inventory costs?",
                "Choices": [
                    "It combines beginning work in process costs with current period costs to compute cost per equivalent unit",
                    "It excludes beginning inventory costs entirely",
                    "It transfers beginning inventory costs directly to finished goods without recalculation",
                    "It expenses beginning inventory costs immediately"
                ],
                "Correct": "It combines beginning work in process costs with current period costs to compute cost per equivalent unit",
                "Explanation": "Under cost accounting standards, The weighted average method blends beginning work in process costs with current period costs into a single average cost per equivalent unit. Distractors reflect common errors: excluding beginning inventory costs describes FIFO, not weighted average; transferring beginning WIP costs directly without recalculation is also a FIFO characteristic; expensing beginning WIP costs immediately is incorrect — they represent inventory, not an expense.",
                "Topic": "Process Costing and Standard Cost Variances",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C10-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Junction has 14,000 units in ending work in process that are 70% complete as to conversion cost. How many equivalent units of conversion cost are in ending WIP?",
                "Correct": "9800",
                "Explanation": "Under cost accounting standards, Equivalent units = Physical units x Percentage complete = 14,000 x 0.70 = 9,800 equivalent units.",
                "Topic": "Process Costing and Standard Cost Variances",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C10-Q2",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "select",
                "Prompt": "Junction switches from absorption costing to variable costing for internal reports. How does this change affect fixed manufacturing overhead treatment?",
                "Choices": [
                    "It is expensed entirely in the period incurred rather than included in inventory cost",
                    "It is capitalized into inventory identically under both methods",
                    "It is eliminated from all reports",
                    "It is allocated only to finished goods, never work in process"
                ],
                "Correct": "It is expensed entirely in the period incurred rather than included in inventory cost",
                "Explanation": "Under variable costing, fixed manufacturing overhead is a period expense, unlike absorption costing where it is included in unit product cost and inventoried. Distractors reflect common errors: capitalizing all fixed overhead into inventory describes absorption costing, not variable costing; fixed overhead is not eliminated — it is still reported, but as a period expense instead of inventoried cost; the question is period expense vs. inventoried cost, not finished goods vs. WIP classification.",
                "Topic": "Process Costing and Standard Cost Variances",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C10-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select costs that would be classified as internal failure costs in a cost of quality report.",
                "Choices": [
                    "Scrap from defective units identified before shipment",
                    "Rework of units found defective during production",
                    "Downtime caused by in-process quality issues",
                    "Warranty claims from customers after shipment"
                ],
                "Correct": [
                    "Scrap from defective units identified before shipment",
                    "Rework of units found defective during production",
                    "Downtime caused by in-process quality issues"
                ],
                "Explanation": "Under cost accounting standards, Internal failure costs arise from defects detected before shipment, such as scrap, rework, and related downtime; warranty claims are external failure costs.",
                "Topic": "Process Costing and Standard Cost Variances",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C10-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A costing approach that starts with a market-based target price, subtracts desired profit, and drives product design to meet the resulting allowable cost is called ______ costing.",
                "Correct": "target",
                "Explanation": "Under cost accounting standards, Target costing starts with a market-based price, subtracts desired profit margin, and designs the product to meet the resulting cost target.",
                "Topic": "Process Costing and Standard Cost Variances",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C10-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C11",
        "Title": "Control Weaknesses in Accounts Payable",
        "SectionTags": [
            "E"
        ],
        "BlueprintDomain": "Internal Controls",
        "EstimatedMinutes": 25,
        "ScenarioText": "Kestrel Freight identifies several control gaps in its accounts payable process during an internal review, including duplicate payment risk, inadequate approval thresholds, and insufficient evidence of management review.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Kestrel discovers it paid two invoices with the same vendor, invoice number, and amount. What control would best prevent this in the future?",
                "Choices": [
                    "System duplicate checks combined with independent review before payment release",
                    "Disabling invoice-number validation since vendors may reuse numbers",
                    "Allowing payment preparers to reconcile their own work only",
                    "Recording duplicate payments as prepaid expenses without follow-up"
                ],
                "Correct": "System duplicate checks combined with independent review before payment release",
                "Explanation": "Under the COSO Internal Control Framework, Automated duplicate checks combined with independent review before payment release reduce the risk of duplicate payments. Distractors reflect common errors: disabling invoice-number validation removes a key detection control; allowing payment preparers to reconcile their own work violates segregation of duties; recording duplicates as prepaid expenses conceals the error rather than detecting it.",
                "Topic": "Control Weaknesses in Accounts Payable",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C11-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Kestrel finds that managers split large purchases into smaller amounts to avoid approval thresholds. What control response is most appropriate?",
                "Choices": [
                    "Monitor split purchases and enforce approval limits based on total related commitments",
                    "Raise approval limits for all employees without review",
                    "Allow verbal approvals with no evidence",
                    "Treat split purchases as favorable spending variances"
                ],
                "Correct": "Monitor split purchases and enforce approval limits based on total related commitments",
                "Explanation": "Under the COSO Internal Control Framework, Controls should monitor for and aggregate related purchases to prevent circumvention of authorization thresholds through splitting. Distractors reflect common errors: raising approval limits without review weakens the control environment further; verbal approvals without evidence are not auditable; misclassifying split purchases as favorable variances obscures the control weakness.",
                "Topic": "Control Weaknesses in Accounts Payable",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C11-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Kestrel's managers approve journal entries but retain no evidence of their review. What control improvement is needed?",
                "Choices": [
                    "Retain evidence showing the reviewer, timing, scope, and resolution of exceptions",
                    "Assume system access alone proves review occurred",
                    "Rely solely on oral statements after year-end",
                    "Delete evidence periodically to reduce storage costs"
                ],
                "Correct": "Retain evidence showing the reviewer, timing, scope, and resolution of exceptions",
                "Explanation": "Under the COSO Internal Control Framework, Control operation should be evidenced, documenting who reviewed, when, the scope of review, and how exceptions were resolved. Distractors reflect common errors: system access logs show who logged in, not whether a meaningful review was performed; oral statements are not contemporaneous evidence and are unreliable; destroying evidence undermines auditability.",
                "Topic": "Control Weaknesses in Accounts Payable",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C11-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select controls that help reduce the risk of duplicate or fraudulent vendor payments.",
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
                "Explanation": "Under the COSO Internal Control Framework, Independent review, automated duplicate detection, and segregating vendor setup from payment approval all reduce fraud and error risk in accounts payable.",
                "Topic": "Control Weaknesses in Accounts Payable",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C11-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Assigning owners, due dates, and verification steps to ensure identified control deficiencies are corrected is called ______ tracking.",
                "Correct": "remediation",
                "Explanation": "Under the COSO Internal Control Framework, Remediation tracking assigns ownership and deadlines to ensure control deficiencies are actually corrected and verified.",
                "Topic": "Control Weaknesses in Accounts Payable",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C11-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C12",
        "Title": "Enterprise Analytics and Cybersecurity Program",
        "SectionTags": [
            "F"
        ],
        "BlueprintDomain": "Technology and Analytics",
        "EstimatedMinutes": 25,
        "ScenarioText": "Larkspur Financial Services is expanding its use of predictive analytics for credit risk scoring while strengthening its cybersecurity program against phishing and unauthorized access threats.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Larkspur builds a model to forecast which loan applicants are most likely to default. What type of analytics is this?",
                "Choices": [
                    "Predictive analytics",
                    "Descriptive analytics",
                    "Diagnostic analytics",
                    "Prescriptive analytics only, with no forecasting element"
                ],
                "Correct": "Predictive analytics",
                "Explanation": "Under information systems governance, Predictive analytics uses historical data and models to forecast future outcomes, such as default likelihood. Distractors reflect common errors: descriptive analytics summarizes what has already happened, not forecasting; diagnostic analytics explains why something happened, not predicting future outcomes; prescriptive analytics recommends actions based on predictions, but the question describes building a forecast model, which is predictive.",
                "Topic": "Enterprise Analytics and Cybersecurity Program",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C12-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Larkspur employees receive fraudulent emails designed to trick them into revealing login credentials. What type of threat is this?",
                "Choices": [
                    "Phishing, a form of social engineering attack",
                    "A distributed denial-of-service attack",
                    "A physical access control failure",
                    "A data governance policy gap"
                ],
                "Correct": "Phishing, a form of social engineering attack",
                "Explanation": "Under information systems governance, Phishing is a social engineering attack using deceptive messages to trick individuals into revealing sensitive information. Distractors reflect common errors: a DDoS attack overwhelms systems with traffic, not tricking individuals; a physical access failure relates to unauthorized facility entry, not digital social engineering; a data governance gap relates to data management policies, not cybersecurity threats.",
                "Topic": "Enterprise Analytics and Cybersecurity Program",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C12-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Larkspur requires periodic review of user access rights so employees retain only access appropriate to their current role. What category of control is this?",
                "Choices": [
                    "An IT general control over logical access",
                    "A physical control over the data center only",
                    "A budgetary control over IT spending",
                    "An application control embedded in transaction processing only"
                ],
                "Correct": "An IT general control over logical access",
                "Explanation": "Under information systems governance, Periodic access reviews are an IT general control ensuring logical access remains appropriate to current job responsibilities. Distractors reflect common errors: a physical control restricts physical facility access, not logical system access rights; a budgetary control governs IT spending, not user access appropriateness; application controls operate at the transaction level, while periodic role-based access reviews are entity-wide IT general controls.",
                "Topic": "Enterprise Analytics and Cybersecurity Program",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C12-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select big data characteristics commonly used to describe large, fast-moving, diverse datasets.",
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
                "Explanation": "Under information systems governance, Big data is commonly characterized by volume, velocity, and variety; depreciation is an unrelated accounting concept.",
                "Topic": "Enterprise Analytics and Cybersecurity Program",
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
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C12-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: The security framework built on confidentiality, integrity, and ______ is commonly called the CIA triad.",
                "Correct": "availability",
                "Explanation": "Under information systems governance, The CIA triad consists of confidentiality, integrity, and availability, the three foundational objectives of information security.",
                "Topic": "Enterprise Analytics and Cybersecurity Program",
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
                "ProductionStatus": "Draft",
                "ItemID": "CASE-C12-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C13",
        "Title": "Deferred Taxes and Fair Value Measurement",
        "SectionTags": [
            "A"
        ],
        "BlueprintDomain": "External Financial Reporting Decisions",
        "EstimatedMinutes": 25,
        "ScenarioText": "Meridian Peak Corp uses different depreciation methods for book and tax purposes, creating deferred tax effects, and also holds several financial instruments requiring fair value measurement at different levels of the hierarchy.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Meridian uses straight-line depreciation for books and accelerated depreciation for taxes. What does this create?",
                "Choices": [
                    "Book-tax timing differences that can create deferred tax assets or liabilities",
                    "A permanent difference requiring no future reversal",
                    "No tax effect until the asset is sold",
                    "A discontinued operations classification"
                ],
                "Correct": "Book-tax timing differences that can create deferred tax assets or liabilities",
                "Explanation": "Under ASC 740, Temporary differences between financial reporting and tax bases create deferred tax assets or liabilities that will reverse in future periods. Distractors reflect common errors: depreciation method differences are temporary, not permanent — the total depreciation over the asset's life is the same under both methods; the tax effect of temporary differences is recognized immediately through deferred tax accounts; discontinued operations relates to strategic shifts, not book-tax differences.",
                "Topic": "Deferred Taxes and Fair Value Measurement",
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
                "ItemID": "CASE-C13-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Meridian values an investment using quoted prices for identical assets in active markets. How should this be classified in the fair value hierarchy?",
                "Choices": [
                    "Level 1",
                    "Level 2",
                    "Level 3",
                    "Not part of the fair value hierarchy"
                ],
                "Correct": "Level 1",
                "Explanation": "Under ASC 820, Level 1 inputs are quoted prices in active markets for identical assets or liabilities. Distractors reflect common errors: Level 2 uses observable inputs other than quoted prices for identical assets; Level 3 uses unobservable inputs; quoted prices in active markets for identical assets are the defining characteristic of Level 1.",
                "Topic": "Deferred Taxes and Fair Value Measurement",
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
                "ItemID": "CASE-C13-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Meridian has a three-month Treasury bill purchased near maturity. How should it be classified?",
                "Choices": [
                    "As a cash equivalent, since it is highly liquid with an original maturity of three months or less",
                    "As a financing activity because the government issued it",
                    "Excluded from cash equivalents until sold",
                    "As inventory since it is a short-term investment"
                ],
                "Correct": "As a cash equivalent, since it is highly liquid with an original maturity of three months or less",
                "Explanation": "Under U.S. GAAP, Cash equivalents are highly liquid short-term investments with original maturities generally of three months or less. Distractors reflect common errors: the issuer of the instrument is irrelevant to cash equivalent classification — it is determined by liquidity and maturity; Treasury bills with original maturities of three months or less are cash equivalents by definition; a Treasury bill is a financial instrument, not inventory.",
                "Topic": "Deferred Taxes and Fair Value Measurement",
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
                "ItemID": "CASE-C13-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select characteristics of Level 3 fair value inputs.",
                "Choices": [
                    "Unobservable inputs",
                    "Used when little or no market activity exists for the asset",
                    "Based on the entity's own assumptions about market participant assumptions",
                    "Quoted prices for identical assets in active markets"
                ],
                "Correct": [
                    "Unobservable inputs",
                    "Used when little or no market activity exists for the asset",
                    "Based on the entity's own assumptions about market participant assumptions"
                ],
                "Explanation": "Under ASC 820, Level 3 inputs are unobservable and used when little or no market activity exists, relying on the entity's own assumptions; quoted prices for identical assets describe Level 1.",
                "Topic": "Deferred Taxes and Fair Value Measurement",
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
                "ItemID": "CASE-C13-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Under U.S. GAAP, treasury stock repurchases are recorded as a reduction of ______, not as an operating expense.",
                "Correct": "equity",
                "Explanation": "Under U.S. GAAP, Treasury stock transactions are equity transactions; repurchases reduce equity and are not recognized as an expense.",
                "Topic": "Deferred Taxes and Fair Value Measurement",
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
                "ItemID": "CASE-C13-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C14",
        "Title": "Sensitivity Analysis and Cash Flow Planning",
        "SectionTags": [
            "B"
        ],
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "EstimatedMinutes": 25,
        "ScenarioText": "Nightingale Devices is building a sensitivity analysis into its annual budget to model different sales and cost scenarios, while its cash budget signals a potential shortfall in an upcoming quarter.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Nightingale models several scenarios by changing key assumptions such as sales volume and material cost. What technique is this?",
                "Choices": [
                    "Sensitivity (what-if) analysis",
                    "Zero-based budgeting",
                    "Standard costing",
                    "Responsibility accounting"
                ],
                "Correct": "Sensitivity (what-if) analysis",
                "Explanation": "In management accounting practice, Sensitivity or what-if analysis models how budgeted outcomes change under different assumptions, helping assess risk. Distractors reflect common errors: zero-based budgeting requires justifying all costs from zero, not scenario modeling; standard costing sets predetermined cost targets for variance analysis, not what-if analysis; responsibility accounting aligns evaluation with managerial control, not scenario testing.",
                "Topic": "Sensitivity Analysis and Cash Flow Planning",
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
                "ItemID": "CASE-C14-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Nightingale's cash budget projects a shortfall next quarter. What is the primary purpose of identifying this in advance?",
                "Choices": [
                    "To arrange financing or adjust operations before the shortage occurs",
                    "To immediately liquidate long-term assets without planning",
                    "To increase dividends despite the shortfall",
                    "To ignore the shortfall since it is only a forecast"
                ],
                "Correct": "To arrange financing or adjust operations before the shortage occurs",
                "Explanation": "In management accounting practice, The cash budget helps management anticipate financing needs so arrangements can be made proactively rather than reactively. Distractors reflect common errors: rushing to liquidate long-term assets is a panic response — the cash budget provides lead time for orderly financing; increasing dividends during a projected shortfall would worsen the liquidity position; ignoring a forecasted shortfall defeats the purpose of cash budgeting.",
                "Topic": "Sensitivity Analysis and Cash Flow Planning",
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
                "ItemID": "CASE-C14-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "numeric",
                "Prompt": "Nightingale calculates a three-month moving average of monthly sales of 40,000, 44,000, and 48,000 units. What is the moving average for the next forecast period?",
                "Correct": "44000",
                "Explanation": "In management accounting practice, Moving average = (40,000 + 44,000 + 48,000) / 3 = 132,000 / 3 = 44,000 units.",
                "Topic": "Sensitivity Analysis and Cash Flow Planning",
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
                "ItemID": "CASE-C14-Q3",
                "CognitiveLevel": "Apply"
            },
            {
                "Type": "multi",
                "Prompt": "Select items that would typically increase the reliability of a rolling forecast compared to a static annual budget.",
                "Choices": [
                    "Frequent updates reflecting current conditions",
                    "Incorporation of most recent actual results",
                    "A fixed horizon that never changes",
                    "Ability to react quickly to changing assumptions"
                ],
                "Correct": [
                    "Frequent updates reflecting current conditions",
                    "Incorporation of most recent actual results",
                    "Ability to react quickly to changing assumptions"
                ],
                "Explanation": "In management accounting practice, Rolling forecasts improve reliability through frequent updates and quick reaction to changing conditions; a fixed, unchanging horizon describes a static budget, not a rolling forecast.",
                "Topic": "Sensitivity Analysis and Cash Flow Planning",
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
                "ItemID": "CASE-C14-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: A technique that models declining average labor time per unit as cumulative production doubles is called a ______ curve.",
                "Correct": "learning",
                "Explanation": "In management accounting practice, A learning curve models the predictable decline in average labor time per unit as cumulative output doubles.",
                "Topic": "Sensitivity Analysis and Cash Flow Planning",
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
                "ItemID": "CASE-C14-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    },
    {
        "CaseID": "CASE-C15",
        "Title": "Quality Costs and Lean Process Improvement",
        "SectionTags": [
            "C",
            "D"
        ],
        "BlueprintDomain": "Performance Management",
        "EstimatedMinutes": 25,
        "ScenarioText": "Oakhurst Precision manufactures machined parts and is analyzing its cost of quality report while implementing lean manufacturing principles to reduce waste, alongside a review of nonfinancial performance metrics.",
        "Items": [
            {
                "Type": "select",
                "Prompt": "Oakhurst invests in employee training and improved process design to reduce the likelihood of producing defective units. How is this cost classified in a cost of quality report?",
                "Choices": [
                    "A prevention cost",
                    "An appraisal cost",
                    "An internal failure cost",
                    "An external failure cost"
                ],
                "Correct": "A prevention cost",
                "Explanation": "Under responsibility accounting, Prevention costs are incurred to avoid producing defective output before it occurs, such as training and process design. Distractors reflect common errors: appraisal costs detect defects after they occur (e.g., inspection); internal failure costs arise from defects detected before shipment; external failure costs arise when defective products reach customers. Training and process design aim to prevent defects from occurring — they are prevention costs.",
                "Topic": "Quality Costs and Lean Process Improvement",
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
                "ItemID": "CASE-C15-Q1",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Oakhurst implements lean manufacturing to eliminate non-value-added activities and reduce inventory. What is a central goal of this approach?",
                "Choices": [
                    "Eliminating waste and non-value-added activities throughout production",
                    "Maximizing inventory levels to avoid stockouts",
                    "Increasing batch sizes to reduce the number of setups",
                    "Eliminating all quality control inspections"
                ],
                "Correct": "Eliminating waste and non-value-added activities throughout production",
                "Explanation": "Under responsibility accounting, Lean manufacturing focuses on eliminating waste and non-value-added activities, often through smaller batches and continuous improvement. Distractors reflect common errors: building high inventory levels is the opposite of lean — lean pursues just-in-time production; increasing batch sizes contradicts lean principles of smaller batches and quick changeovers; lean retains quality control as essential — the goal is to build quality into the process.",
                "Topic": "Quality Costs and Lean Process Improvement",
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
                "ItemID": "CASE-C15-Q2",
                "CognitiveLevel": "Understand"
            },
            {
                "Type": "select",
                "Prompt": "Oakhurst tracks on-time delivery rate and defect rate alongside financial results. What is the primary benefit of these nonfinancial measures?",
                "Choices": [
                    "They provide leading indicators of future financial performance",
                    "They replace the need for any financial statements",
                    "They guarantee improved financial results automatically",
                    "They are required only for external regulatory reporting"
                ],
                "Correct": "They provide leading indicators of future financial performance",
                "Explanation": "Under responsibility accounting, Nonfinancial measures often serve as leading indicators of future financial results and give insight not captured by financial data alone. Distractors reflect common errors: overstating the role — nonfinancial measures complement, not replace, financial statements; providing leading indicators, not guarantees of improved financial results; nonfinancial measures are internal management tools, not mandated external regulatory requirements.",
                "Topic": "Quality Costs and Lean Process Improvement",
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
                "ItemID": "CASE-C15-Q3",
                "CognitiveLevel": "Analyze"
            },
            {
                "Type": "multi",
                "Prompt": "Select costs that would be classified as appraisal costs in a cost of quality report.",
                "Choices": [
                    "Incoming materials inspection",
                    "In-process quality audits",
                    "Final product testing before shipment",
                    "Warranty repairs after sale"
                ],
                "Correct": [
                    "Incoming materials inspection",
                    "In-process quality audits",
                    "Final product testing before shipment"
                ],
                "Explanation": "Under responsibility accounting, Appraisal costs are incurred to detect defects before products reach customers, including inspection, audits, and testing; warranty repairs are external failure costs.",
                "Topic": "Quality Costs and Lean Process Improvement",
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
                "ItemID": "CASE-C15-Q4",
                "CognitiveLevel": "Evaluate"
            },
            {
                "Type": "fill",
                "Prompt": "Fill in the blank: Comparing a company's processes and performance against best-in-class organizations to identify improvement opportunities is called ______.",
                "Correct": "benchmarking",
                "Explanation": "Under responsibility accounting, Benchmarking compares an organization's processes and performance against best-in-class practices to identify improvement opportunities.",
                "Topic": "Quality Costs and Lean Process Improvement",
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
                "ItemID": "CASE-C15-Q5",
                "CognitiveLevel": "Understand"
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
        "QuestionCount": 5,
        "ExhibitCount": 0,
        "Difficulty": "Moderate"
    }
];
