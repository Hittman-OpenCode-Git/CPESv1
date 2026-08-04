// Enhanced 2026-style CMA Part 1 case simulations - Pack 2
// These cases are original study content and are not official IMA or Prometric material.


const ENHANCED_CASE_BASE2 = [
    {
        "CaseID": "CBQ2-A3",
        "Title": "Revenue Recognition and Receivables Valuation",
        "SectionTags": [
            "A"
        ],
        "Pack": 2,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Revenue recognition under ASC 606",
            "Inventory valuation methods (FIFO, LIFO, weighted average)"
        ],
        "Topic": "Receivables",
        "Subtopic": "Revenue recognition under ASC 606",
        "PrimaryCompetency": "Calculation",
        "SecondaryCompetencies": [
            "Analysis",
            "Conceptual"
        ],
        "Confidence": 100,
        "EstimatedMinutes": 31,
        "ExhibitCount": 1,
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze revenue recognition under ASC 606",
            "Analyze inventory valuation methods (FIFO, LIFO, weighted average)"
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
        "ScenarioText": "Vertex Solutions entered into a $500,000 contract to deliver hardware, installation, and 1 year of maintenance. Hardware was delivered Oct 1. The standalone prices are: Hardware $400k, Install $50k, Maintenance $100k. Vertex also has an A/R balance of $1,200,000 and uses an aging schedule for ADA.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "A/R Aging",
                "Headers": [
                    "Days",
                    "Amount",
                    "Uncollectible %"
                ],
                "Rows": [
                    [
                        "0-30",
                        "$800,000",
                        "1%"
                    ],
                    [
                        "31-60",
                        "$300,000",
                        "5%"
                    ],
                    [
                        ">60",
                        "$100,000",
                        "20%"
                    ]
                ],
                "ExhibitID": "CBQ2-A3-E1",
                "CaseID": "CBQ2-A3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "fill",
                "Prompt": "The method of estimating bad debt using an aging schedule is known as the ______ approach.",
                "Correct": "balance sheet",
                "Explanation": "The balance sheet approach (also called the aging method) estimates bad debt expense by focusing on the desired ending balance in the Allowance for Doubtful Accounts -- the amount needed to report accounts receivable at net realizable value on the balance sheet. This contrasts with the income statement approach, which estimates bad debt expense as a percentage of credit sales and focuses on matching the expense to the period's revenue. Under ASC 326, the expected credit loss model aligns with the balance sheet approach by requiring the ADA to reflect expected uncollectible amounts at each reporting date.",
                "Topic": "Receivables",
                "ItemID": "CBQ2-A3-Q5",
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
                "CaseID": "CBQ2-A3",
                "EstimatedMinutes": 3,
                "Pack": 2,
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
                "Prompt": "Calculate the transaction price allocated to the Hardware performance obligation (round to nearest whole dollar).",
                "Correct": 363636,
                "Explanation": "Under ASC 606, the transaction price ($500,000) is allocated to performance obligations based on their relative standalone selling prices. Hardware standalone price: $400,000. Total standalone: $400,000 + $50,000 + $100,000 = $550,000. Allocation to hardware = ($400,000 / $550,000) x $500,000 = $363,636 (rounded to nearest whole dollar). This represents the revenue Vertex will recognize when control of the hardware transfers to the customer upon delivery. A common error is to allocate the entire $500,000 to hardware or to divide equally among the three obligations.",
                "Topic": "ASC 606",
                "ItemID": "CBQ2-A3-Q1",
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
                "CaseID": "CBQ2-A3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Calculate the required ending balance in the Allowance for Doubtful Accounts.",
                "Correct": 43000,
                "Explanation": "Under the allowance method (ASC 326), the required ending balance in the Allowance for Doubtful Accounts is determined using an aging schedule that applies increasing uncollectible percentages to older receivables. 0-30 days: $800,000 x 1% = $8,000. 31-60 days: $300,000 x 5% = $15,000. Over 60 days: $100,000 x 20% = $20,000. Total required ADA balance = $8,000 + $15,000 + $20,000 = $43,000 (credit). This is the balance sheet approach -- the ADA is adjusted to the amount indicated by the aging analysis, reflecting the net realizable value of accounts receivable.",
                "Topic": "Receivables",
                "ItemID": "CBQ2-A3-Q2",
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
                "CaseID": "CBQ2-A3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "If the unadjusted ADA balance was a $5,000 debit, what is the bad debt expense?",
                "Correct": "$48,000",
                "Explanation": "When the unadjusted Allowance for Doubtful Accounts has a debit balance, the bad debt expense must be large enough to both eliminate the debit and establish the required credit balance. Required ending credit balance (from aging): $43,000. Current balance: $5,000 debit. Bad debt expense = $43,000 + $5,000 = $48,000. $38,000 incorrectly subtracts the debit balance instead of adding it -- this would leave the ADA $10,000 short. $43,000 ignores the existing debit balance, leaving the ADA at only $38,000 credit after adjustment (the $43k entry nets against the $5k debit). $5,000 is merely the existing debit balance amount, not the required expense to reach the target. Under the allowance method, the expense adjusts the ADA to the target balance determined by the aging schedule.",
                "Topic": "Receivables",
                "Choices": [
                    "$38,000",
                    "$43,000",
                    "$48,000",
                    "$5,000"
                ],
                "ItemID": "CBQ2-A3-Q4",
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
                "CaseID": "CBQ2-A3",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "Under ASC 606, which criteria indicate a distinct performance obligation?",
                "Correct": [
                    "Customer can benefit from good/service on its own",
                    "The promise is separately identifiable in the contract"
                ],
                "Explanation": "Under ASC 606-10-25-19, a promised good or service is distinct if both criteria are met: (1) the customer can benefit from the good or service on its own or together with other readily available resources, and (2) the promise is separately identifiable from other promises in the contract. Physical delivery and payment receipt are consequences of contract performance, not criteria for determining whether a performance obligation is distinct. A candidate selecting either 'The good is physically delivered' or 'Payment has been received' may confuse the timing of revenue recognition with the identification of performance obligations under ASC 606.",
                "Topic": "Revenue",
                "Choices": [
                    "Customer can benefit from good/service on its own",
                    "The promise is separately identifiable in the contract",
                    "The good is physically delivered",
                    "Payment has been received"
                ],
                "ItemID": "CBQ2-A3-Q3",
                "CognitiveLevel": "Evaluate",
                "Difficulty": "Difficult",
                "DifficultyScore": 4,
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ASC 606 requires revenue recognition when control transfers to the customer.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-A3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
        "CaseID": "CBQ2-A2",
        "Title": "Inventory Valuation and LCM",
        "SectionTags": [
            "A"
        ],
        "Pack": 2,
        "Section": "A",
        "BlueprintDomain": "External Financial Reporting Decisions",
        "BlueprintObjectives": [
            "Inventory"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Inventory",
        "Subtopic": "Inventory cost flow assumptions",
        "SecondaryCompetencies": [
            "Calculation"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Financial reporting",
        "CompanyName": "Oasis Retail",
        "CompanyType": "Retailer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 36,
        "ExhibitCount": 1,
        "Industry": "Retail",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze inventory valuation using FIFO method",
            "Apply lower of cost or market (LCM) rule",
            "Calculate inventory write-down under LCM",
            "Evaluate LCM ceiling and floor constraints",
            "Analyze inventory disclosure requirements"
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
        "Stakeholder": "Controller",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Oasis Retail uses FIFO. At year-end, physical inventory count shows 10,000 units. The historical cost is $15/unit. The current replacement cost is $12/unit. Net realizable value (NRV) is $13/unit, and NRV less normal profit margin is $10/unit.",
        "Exhibits": [
            {
                "Type": "text",
                "Title": "Inventory Note",
                "Body": "Oasis evaluates inventory on an item-by-item basis. No previous write-downs have been recorded for this product line.",
                "ExhibitID": "CBQ2-A2-E1",
                "CaseID": "CBQ2-A2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "What is the per-unit valuation for the inventory at year-end?",
                "Correct": 13,
                "Explanation": "Under ASC 330 (LCNRV for FIFO), inventory is reported at the lower of cost or net realizable value. Unit cost is $15. NRV (estimated selling price less costs of completion and disposal) is $13. Since NRV ($13) is below cost ($15), the inventory must be written down to $13 per unit. The write-down of $2 per unit ($15 - $13) is recognized as a loss in the current period's income statement, reducing both inventory on the balance sheet and net income.",
                "Topic": "Inventory",
                "ItemID": "CBQ2-A2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
                "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-A2",
                "DecisionTreeReference": "Financial Statement Ratios",
                "EstimatedMinutes": 5,
                "FormulaReference": "Inventory Turnover",
                "Pack": 2,
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
                "Prompt": "What is the total inventory write-down required?",
                "Correct": 20000,
                "Explanation": "Under ASC 330-10-35, when NRV falls below cost under FIFO, the write-down equals (Cost minus NRV) multiplied by the units on hand. This calculation produces the total inventory valuation adjustment: ($15 - $13) x 10,000 units = $20,000. The $20,000 write-down is recorded as a debit to Cost of Goods Sold (or a loss account) and a credit to Inventory. This ensures the balance sheet reports inventory at $130,000 (10,000 x $13) rather than the overstated $150,000 (10,000 x $15). The expense reduces reported earnings for the period.",
                "Topic": "Inventory",
                "ItemID": "CBQ2-A2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
                "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-A2",
                "DecisionTreeReference": "Financial Statement Ratios",
                "EstimatedMinutes": 5,
                "FormulaReference": "Inventory Turnover",
                "Pack": 2,
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
                "Prompt": "Under US GAAP for a FIFO firm, inventory is valued at:",
                "Correct": "Lower of cost or NRV",
                "Explanation": "Under ASC 330, inventory valuation follows the lower of cost or net realizable value (LCNRV) for FIFO and the lower of cost or market (LCM) for LIFO and retail methods. LCNRV compares cost to net realizable value (selling price less completion and disposal costs). LCM compares cost to market with a ceiling (NRV) and floor (NRV minus normal profit margin). For a manufacturer using FIFO, the correct valuation method is LCNRV.",
                "Topic": "Inventory",
                "Choices": [
                    "Lower of cost or NRV",
                    "Lower of cost or market",
                    "Historical cost",
                    "Fair value"
                ],
                "ItemID": "CBQ2-A2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
                "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-A2",
                "DecisionTreeReference": "Financial Statement Ratios",
                "EstimatedMinutes": 4,
                "FormulaReference": "Inventory Turnover",
                "Pack": 2,
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
                "Prompt": "Match the inventory valuation method to its primary characteristic.",
                "Correct": {
                    "LIFO": "Matches recent costs to revenue",
                    "FIFO": "Ending inventory reflects current costs",
                    "Weighted Average": "Smooths out price fluctuations"
                },
                "Explanation": "Under the inventory cost flow frameworks in ASC 330, LIFO (Last-In, First-Out) assigns the most recent (current-period) costs to cost of goods sold, which produces a better matching of current revenues with current costs on the income statement. FIFO (First-In, First-Out) assigns the oldest (earliest) costs to COGS and the most recent costs to ending inventory, which produces a balance sheet valuation closer to current replacement cost. For companies experiencing rising prices, LIFO results in higher COGS, lower gross margin, and lower taxable income compared to FIFO. This matching exercise requires candidates to identify which cost flow method aligns with each financial reporting objective.",
                "Topic": "Inventory",
                "LeftItems": [
                    "LIFO",
                    "FIFO",
                    "Weighted Average"
                ],
                "RightItems": [
    "Ending inventory reflects current costs",
    "Smooths out price fluctuations",
    "Matches recent costs to revenue",
    "Always yields highest income"
],
                "ItemID": "CBQ2-A2-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
                "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-A2",
                "DecisionTreeReference": "Financial Statement Ratios",
                "EstimatedMinutes": 6,
                "FormulaReference": "Inventory Turnover",
                "Pack": 2,
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
                "Prompt": "Which costs are capitalized into inventory?",
                "Correct": [
                    "Direct materials",
                    "Factory overhead",
                    "Direct labor"
                ],
                "Explanation": "Under ASC 330-10-30, inventory cost includes all costs necessary to bring the inventory to its present location and condition. This encompasses direct materials, direct labor, and manufacturing overhead (both variable and fixed). These product costs are capitalized as inventory on the balance sheet and expensed as COGS when the goods are sold. In contrast, selling, general, and administrative expenses are period costs. They are expensed in the period incurred regardless of production or sales levels. This distinction is critical for proper financial reporting: capitalizing SG&A would overstate assets and understate current expenses, violating the matching principle and GAAP.",
                "Topic": "Inventory",
                "Choices": [
                    "Direct materials",
                    "Factory overhead",
                    "Direct labor",
                    "Selling expenses"
                ],
                "ItemID": "CBQ2-A2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
                "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-A2",
                "DecisionTreeReference": "Financial Statement Ratios",
                "EstimatedMinutes": 5,
                "FormulaReference": "Inventory Turnover",
                "Pack": 2,
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
        "CaseID": "CBQ2-B1",
        "Title": "Production and Direct Materials Budgeting",
        "SectionTags": [
            "B"
        ],
        "Pack": 2,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Production Budget",
            "Materials Budget",
            "Budget sequence"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Production Budget",
        "Subtopic": "Direct materials planning",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Apex Manufacturing",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Easy",
        "DifficultyScore": 1,
        "EstimatedMinutes": 34,
        "ExhibitCount": 1,
        "Industry": "Industrial controls",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze production budget — unit calculation",
            "Analyze production budget — multi-period planning",
            "Analyze materials budget — quantity planning",
            "Analyze materials budget — cost calculation",
            "Analyze budget sequencing and dependencies"
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
        "Stakeholder": "Apex Manufacturing (Management)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Apex Manufacturing is preparing its Q1 budget. Projected sales: Jan 10,000 units, Feb 12,000 units, Mar 15,000 units. Desired ending finished goods is 20% of next month's sales. Each unit requires 3 lbs of raw material at $4/lb. Desired ending raw materials is 10% of next month's production needs.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Beginning Balances (Jan 1)",
                "Headers": [
                    "Account",
                    "Balance"
                ],
                "Rows": [
                    [
                        "Finished Goods",
                        "2,000 units"
                    ],
                    [
                        "Raw Materials",
                        "3,120 lbs"
                    ]
                ],
                "ExhibitID": "CBQ2-B1-E1",
                "CaseID": "CBQ2-B1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "How many units must Apex produce in January?",
                "Correct": 10400,
                "Explanation": "Sales (10,000) + End FG (12k * 20% = 2,400) - Beg FG (2,000) = 10,400.",
                "Topic": "Production Budget",
                "ItemID": "CBQ2-B1-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 4: Budget Order",
                "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Production Budget",
                "Pack": 2,
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
                "Prompt": "How many units must Apex produce in February?",
                "Correct": 12600,
                "Explanation": "Sales (12,000) + End FG (15k * 20% = 3,000) - Beg FG (2,400) = 12,600.",
                "Topic": "Production Budget",
                "ItemID": "CBQ2-B1-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 4: Budget Order",
                "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Production Budget",
                "Pack": 2,
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
                "Prompt": "How many pounds of raw material must be purchased in January?",
                "Correct": 31860,
                "Explanation": "Jan prod needs = 10,400 * 3 = 31,200. End RM = 12,600 * 3 * 10% = 3,780. Purch = 31,200 + 3,780 - 3,120 = 31,860 lbs.",
                "Topic": "Materials Budget",
                "ItemID": "CBQ2-B1-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Direct Materials Purchases",
                "Pack": 2,
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
                "Prompt": "What is the budgeted cost of raw material purchases for January?",
                "Correct": 127440,
                "Explanation": "31,860 lbs * $4 = $127,440.",
                "Topic": "Materials Budget",
                "ItemID": "CBQ2-B1-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Direct Materials Purchases",
                "Pack": 2,
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
                "Prompt": "Which budget must be prepared first?",
                "Correct": "Sales budget",
                "Explanation": "The sales budget drives all subsequent operating budgets.",
                "Topic": "Budget sequence",
                "Choices": [
                    "Production budget",
                    "Cash budget",
                    "Sales budget",
                    "Direct labor budget"
                ],
                "ItemID": "CBQ2-B1-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "CommonTrapReference": "Trap 4: Budget Order",
                "AccountingPrinciple": "Budgets follow sequence: Sales > Production > Materials > Labor > Overhead > Cash > Financial Statements.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-B1",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
        "CaseID": "CBQ2-B2",
        "Title": "Cash Budgeting and Forecasting",
        "SectionTags": [
            "B"
        ],
        "Pack": 2,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Cash collections",
            "Cash disbursements",
            "Cash budget",
            "Cash budget financing",
            "Cash budget analysis"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Cash Budget",
        "Subtopic": "Cash flow forecasting",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Harbor Medical Supplies",
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
            "Analyze cash collections",
            "Analyze cash disbursements",
            "Analyze cash budget",
            "Analyze cash budget financing",
            "Analyze cash budget analysis",
            "Analyze cash budget management"
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
        "Stakeholder": "Maria Chen (CFO)",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Harbor Medical Supplies closed December with weaker sales than forecast. CFO Maria Chen needs a January cash forecast to decide whether to draw on Harbor's $200,000 line of credit. The bank requires a $35,000 minimum compensating balance. If the projected deficit exceeds $100,000, Chen must negotiate extended payment terms with Harbor's largest supplier before the month-end purchasing deadline. The forecast must include total collections, total disbursements, the January cash position before financing, and the required borrowing.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Sales Forecast",
                "Headers": [
                    "Month",
                    "Sales"
                ],
                "Rows": [
                    [
                        "December (Actual)",
                        "$500,000"
                    ],
                    [
                        "January (Budget)",
                        "$600,000"
                    ]
                ],
                "ExhibitID": "CBQ2-B2-E1",
                "CaseID": "CBQ2-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 - Budget Policies",
                "Headers": [
                    "Item",
                    "Detail"
                ],
                "Rows": [
                    [
                        "Cash sales",
                        "20% of total sales"
                    ],
                    [
                        "Credit sales",
                        "80% of total sales"
                    ],
                    [
                        "Credit collected in month of sale",
                        "50%"
                    ],
                    [
                        "Credit collected in following month",
                        "45%"
                    ],
                    [
                        "Uncollectible",
                        "5% of credit sales"
                    ],
                    [
                        "Cost of goods sold",
                        "65% of sales; paid in month incurred"
                    ],
                    [
                        "Cash operating expenses (monthly)",
                        "$175,000"
                    ],
                    [
                        "Depreciation (monthly)",
                        "$18,000"
                    ],
                    [
                        "Equipment purchase (January)",
                        "$110,000"
                    ],
                    [
                        "Beginning cash balance (January 1)",
                        "$45,000"
                    ],
                    [
                        "Minimum required cash balance",
                        "$35,000"
                    ]
                ],
                "ExhibitID": "CBQ2-B2-E2",
                "CaseID": "CBQ2-B2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Enter total cash collections for January.",
                "Correct": "540000",
                "Explanation": "Cash sales: $600,000 x 20% = $120,000. January credit sales collected in January: ($600,000 x 80%) x 50% = $240,000. December credit sales collected in January: ($500,000 x 80%) x 45% = $180,000. Total = $120,000 + $240,000 + $180,000 = $540,000. A common error is to apply collection percentages to total sales instead of credit sales only.",
                "Topic": "Cash collections",
                "ItemID": "CBQ2-B2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Cash collections include cash sales and collections of prior credit sales.",
                "BusinessInterpretation": "January cash collections total $540,000 from three sources: $120,000 cash sales, $240,000 from current-month credit collections, and $180,000 from prior-month credit collections.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Collections",
                "Pack": 2,
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
                "Prompt": "Enter total cash disbursements for January.",
                "Correct": "675000",
                "Explanation": "Inventory purchases at COGS: $600,000 x 65% = $390,000. Cash operating expenses: $175,000. Equipment purchase: $110,000. Total = $390,000 + $175,000 + $110,000 = $675,000. Depreciation of $18,000 is a non-cash expense and must be excluded; including it is a common error.",
                "Topic": "Cash disbursements",
                "ItemID": "CBQ2-B2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Cash disbursements include inventory purchases (COGS), operating expenses, and capital expenditures. Depreciation is excluded as a non-cash expense.",
                "BusinessInterpretation": "Depreciation of $18,000 is a non-cash expense and must be excluded; including it is a common error.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Enter the ending cash balance before financing for January. Use a negative sign if the balance is negative.",
                "Correct": "-90000",
                "Explanation": "Beginning cash $45,000 + collections $540,000 - disbursements $675,000 = -$90,000. Before any borrowing, January cash is $90,000 below zero.",
                "Topic": "Cash budget",
                "ItemID": "CBQ2-B2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "CommonTrapReference": "Trap 5: Cash Budget",
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Budget",
                "Pack": 2,
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
                "Prompt": "What amount must Harbor borrow in January to meet the minimum cash balance?",
                "Choices": [
                    "$35,000",
                    "$90,000",
                    "$125,000",
                    "$200,000"
                ],
                "Correct": "$125,000",
                "Explanation": "The cash deficit before financing is $90,000. To reach the $35,000 minimum balance, the company must borrow $90,000 + $35,000 = $125,000.",
                "Topic": "Cash budget financing",
                "ItemID": "CBQ2-B2-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "BusinessInterpretation": "The $90,000 cash deficit requires borrowing of $125,000 to meet the $35,000 minimum compensating balance required by the bank.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 4,
                "FormulaReference": "Cash Budget",
                "Pack": 2,
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
                "Prompt": "CFO Chen is reviewing the preliminary January forecast. Select the statements that correctly describe how a change would affect the borrowing requirement.",
                "Choices": [
                    "Raising the cash-sales percentage from 20% to 30% would decrease the borrowing requirement",
                    "Delaying the $110,000 equipment purchase to February would eliminate the need for January borrowing",
                    "If the following-month collection rate increased from 45% to 50%, December credit collections in January would increase by $20,000",
                    "The 5% uncollectible portion of credit sales means $20,000 of December credit sales will never be collected"
                ],
                "Correct": [
                    "Raising the cash-sales percentage from 20% to 30% would decrease the borrowing requirement",
                    "If the following-month collection rate increased from 45% to 50%, December credit collections in January would increase by $20,000",
                    "The 5% uncollectible portion of credit sales means $20,000 of December credit sales will never be collected"
                ],
                "Explanation": "A 30% cash-sales rate increases January cash collections by $30,000, reducing the borrowing need. Without the equipment purchase, January cash would be $20,000, still $15,000 below the minimum, so borrowing would not be eliminated. The December collection increase: $400,000 x 5% = $20,000. The uncollectible portion of December credit sales: $400,000 x 5% = $20,000.",
                "Topic": "Cash budget analysis",
                "ItemID": "CBQ2-B2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 5,
                "FormulaReference": "Cash Budget",
                "Pack": 2,
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
                "Prompt": "Match each forecast risk to the correct management response.",
                "LeftItems": [
                    "Cash deficit exceeds $100,000 in January",
                    "December credit collections arrive slower than budgeted",
                    "Equipment supplier offers a January discount but payment is due in February",
                    "Actual January sales exceed budget by 15%"
                ],
                "RightItems": [
    "Increase reliance on the line of credit in January",
    "Increase both collections and COGS projections in the forecast",
    "Negotiate extended payment terms with suppliers",
    "Defer purchase to February, increasing January cash available"
],
                "Correct": {
                    "Cash deficit exceeds $100,000 in January": "Negotiate extended payment terms with suppliers",
                    "December credit collections arrive slower than budgeted": "Increase reliance on the line of credit in January",
                    "Equipment supplier offers a January discount but payment is due in February": "Defer purchase to February, increasing January cash available",
                    "Actual January sales exceed budget by 15%": "Increase both collections and COGS projections in the forecast"
                },
                "Explanation": "A deficit above $100,000 triggers the supplier negotiation contingency per the scenario. Slower December collections reduce January cash inflows, requiring more credit. Deferring the equipment purchase to February preserves January cash. Higher sales increase both cash inflows (collections) and cash outflows (COGS), so both budget lines must be updated.",
                "Topic": "Cash budget management",
                "ItemID": "CBQ2-B2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
                "BusinessInterpretation": "Higher sales increase both cash inflows (collections) and cash outflows (COGS), so both budget lines must be updated.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B2",
                "DecisionTreeReference": "Budget Sequence",
                "EstimatedMinutes": 6,
                "FormulaReference": "Cash Budget",
                "Pack": 2,
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
        "CaseID": "CBQ2-B3",
        "Title": "Sales Revenue Forecasting and Collection Analysis",
        "SectionTags": [
            "B"
        ],
        "Pack": 2,
        "Section": "B",
        "BlueprintDomain": "Planning, Budgeting, and Forecasting",
        "BlueprintObjectives": [
            "Sales forecasting",
            "Revenue budgeting",
            "Forecasting methods",
            "Cash collection analysis"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Sales forecasting",
        "Subtopic": "Cash flow forecasting",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Treasury and planning",
        "CompanyName": "Ventura Electronics",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "EstimatedMinutes": 40,
        "ExhibitCount": 2,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Analyze sales forecasting using trend growth method",
            "Apply sales forecasting across multiple product segments",
            "Calculate total budgeted sales revenue",
            "Evaluate seasonal adjustment vs trend growth methods",
            "Analyze factors affecting cash collections",
            "Match forecasting methodologies to business scenarios"
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
        "Stakeholder": "David Kim (Ventura Electronics (CEO))",
        "Tags": [],
        "ValidationVersion": "2.0",
        "Version": "1.0",
        "ScenarioText": "Ventura Electronics is preparing its Q3 sales budget. Budget Director David Kim must forecast revenue for two product segments and determine which factors will affect Q3 cash collections. The CEO needs the forecast before the June 30 supplier commitment deadline and wants to know which forecasting method is most reliable for each segment.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 - Actual Sales Data",
                "Headers": [
                    "Segment",
                    "Q1 Units",
                    "Q2 Units",
                    "Selling Price"
                ],
                "Rows": [
                    [
                        "Standard Components",
                        "10,000",
                        "12,000",
                        "$50"
                    ],
                    [
                        "Advanced Modules",
                        "4,000",
                        "5,000",
                        "$100"
                    ]
                ],
                "ExhibitID": "CBQ2-B3-E1",
                "CaseID": "CBQ2-B3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 - Collection and Forecast Policies",
                "Headers": [
                    "Policy",
                    "Detail"
                ],
                "Rows": [
                    [
                        "Q3 growth rate (both segments)",
                        "10% over Q2 actual units"
                    ],
                    [
                        "Cash sales (% of total)",
                        "30%"
                    ],
                    [
                        "Credit collected in quarter of sale",
                        "60%"
                    ],
                    [
                        "Credit collected in following quarter",
                        "35%"
                    ],
                    [
                        "Uncollectible (% of credit sales)",
                        "5%"
                    ]
                ],
                "ExhibitID": "CBQ2-B3-E2",
                "CaseID": "CBQ2-B3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Using the trend growth method, enter Standard Components' budgeted Q3 unit sales.",
                "Correct": "13200",
                "Explanation": "12,000 x 1.10 = 13,200 units. The trend growth method applies the historical growth rate to the most recent actual period. A common error is to apply the growth rate to Q1 instead of Q2.",
                "Topic": "Sales forecasting",
                "ItemID": "CBQ2-B3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
                "BusinessInterpretation": "cent actual period. A common error is to apply the growth rate to Q1 instead of Q2.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Using the trend growth method, enter Advanced Modules' budgeted Q3 unit sales.",
                "Correct": "5500",
                "Explanation": "5,000 x 1.10 = 5,500 units. Both segments share the same growth rate but use different base values.",
                "Topic": "Sales forecasting",
                "ItemID": "CBQ2-B3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Enter the total budgeted Q3 sales revenue (both segments combined).",
                "Correct": "1210000",
                "Explanation": "Standard: 13,200 x $50 = $660,000. Advanced: 5,500 x $100 = $550,000. Total = $660,000 + $550,000 = $1,210,000. A common error is to omit one segment or misapply the selling price.",
                "Topic": "Revenue budgeting",
                "ItemID": "CBQ2-B3-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "BusinessInterpretation": "0,000 = $1,210,000. A common error is to omit one segment or misapply the selling price.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Under what condition would David Kim most likely recommend using seasonal adjustment over the trend growth rate?",
                "Choices": [
                    "When historical data shows consistent quarterly patterns that repeat annually",
                    "When the company has less than 12 months of operating history",
                    "When management wants to minimize the sales forecast",
                    "When the economy enters a recession"
                ],
                "Correct": "When historical data shows consistent quarterly patterns that repeat annually",
                "Explanation": "Seasonal adjustment applies periodic multipliers to account for recurring patterns. If data does not exhibit consistent seasonality, trend methods are preferred.",
                "Topic": "Forecasting methods",
                "ItemID": "CBQ2-B3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Forecasting methods include trend analysis, seasonal adjustment, moving average, and regression.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "Which factors would cause Q3 cash collections to differ from the original forecast?",
                "Choices": [
                    "A higher percentage of credit customers pay in the quarter of sale",
                    "The uncollectible rate increases from 5% to 8%",
                    "Selling prices increase while unit sales remain unchanged",
                    "Depreciation expense is higher than budgeted"
                ],
                "Correct": [
                    "A higher percentage of credit customers pay in the quarter of sale",
                    "The uncollectible rate increases from 5% to 8%",
                    "Selling prices increase while unit sales remain unchanged"
                ],
                "Explanation": "Faster customer payment patterns change the timing of cash inflows. Higher uncollectible rates reduce total cash collected. Higher selling prices increase revenue and thus cash inflows. Depreciation is a non-cash expense and has no effect on cash collections.",
                "Topic": "Cash collection analysis",
                "ItemID": "CBQ2-B3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "MultipleConcepts",
                    "DistractorSimilarity"
                ],
                "BusinessInterpretation": "ncrease revenue and thus cash inflows. Depreciation is a non-cash expense and has no effect on cash collections.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Match each forecasting methodology to its correct description.",
                "LeftItems": [
                    "Trend analysis",
                    "Seasonal adjustment",
                    "Qualitative forecasting",
                    "Moving average"
                ],
                "RightItems": [
    "Splits costs into fixed and variable components using regression",
    "Smooths random fluctuations by averaging consecutive periods",
    "Projects future values based on historical growth rates",
    "Applies periodic multipliers to account for recurring patterns",
    "Relies on expert judgment when historical data is limited"
],
                "Correct": {
                    "Trend analysis": "Projects future values based on historical growth rates",
                    "Seasonal adjustment": "Applies periodic multipliers to account for recurring patterns",
                    "Qualitative forecasting": "Relies on expert judgment when historical data is limited",
                    "Moving average": "Smooths random fluctuations by averaging consecutive periods"
                },
                "Explanation": "Trend analysis extrapolates past rates. Seasonal adjustment uses periodic multipliers. Qualitative methods rely on expert judgment. Moving averages dampen period-to-period noise. Regression-based decomposition is a separate method and does not describe any of the listed items.",
                "Topic": "Forecasting methods",
                "ItemID": "CBQ2-B3-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "Terminology"
                ],
                "AccountingPrinciple": "Forecasting methods include trend analysis, seasonal adjustment, moving average, and regression.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-B3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-C1",
        "Title": "Flexible Budget and Sales Variance Analysis",
        "SectionTags": [
            "C"
        ],
        "Pack": 2,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Flexible budget variance analysis",
            "Sales volume and price variance computation",
            "Efficiency and spending variance interpretation",
            "Variance investigation decisions",
            "Performance reporting"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "Variance Analysis",
        "Subtopic": "Flexible budget analysis and sales variances",
        "SecondaryCompetencies": [
            "Calculation",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Northwood Manufacturing",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Industrial manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Compute and interpret flexible budget variances for revenue and cost components",
            "Distinguish between sales volume variance and sales price variance",
            "Analyze efficiency and spending variances to identify operational issues",
            "Apply variance investigation criteria using materiality and controllability thresholds",
            "Use flexible budget data to support performance evaluation decisions"
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
                "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
            }
        ],
        "Stakeholder": "Controller",
        "Tags": [
            "flexible budget",
            "variance analysis",
            "sales variance",
            "performance management"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Northwood Manufacturing produces industrial-grade pumps. The company uses a standard costing system and prepares flexible budgets for performance reporting. At the end of Q1, the controller prepared a variance report comparing actual results to the flexible budget. Senior management has asked for an interpretation of the variances to identify operational issues and determine whether corrective action is needed. Exhibit 1 shows the Q1 flexible budget variance report.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Q1 Flexible Budget Variance Report",
                "Headers": [
                    "Item",
                    "Actual",
                    "Flexible Budget",
                    "Variance",
                    "Variance %"
                ],
                "Rows": [
                    [
                        "Units produced and sold",
                        "4,800",
                        "5,000",
                        "200 U",
                        "4.0% U"
                    ],
                    [
                        "Sales revenue",
                        "$1,248,000",
                        "$1,250,000",
                        "$2,000 U",
                        "0.2% U"
                    ],
                    [
                        "Direct materials",
                        "$288,000",
                        "$250,000",
                        "$38,000 U",
                        "15.2% U"
                    ],
                    [
                        "Direct labor",
                        "$384,000",
                        "$375,000",
                        "$9,000 U",
                        "2.4% U"
                    ],
                    [
                        "Variable overhead",
                        "$120,000",
                        "$125,000",
                        "$5,000 F",
                        "4.0% F"
                    ],
                    [
                        "Fixed overhead",
                        "$180,000",
                        "$175,000",
                        "$5,000 U",
                        "2.9% U"
                    ],
                    [
                        "Operating income",
                        "$276,000",
                        "$325,000",
                        "$49,000 U",
                        "15.1% U"
                    ]
                ],
                "ExhibitID": "CBQ2-C1-E1",
                "CaseID": "CBQ2-C1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Match each variance category to the correct variance amount shown in Exhibit 1.",
                "LeftItems": [
                    "Sales price variance",
                    "Direct materials efficiency variance",
                    "Direct materials price variance",
                    "Labor rate variance"
                ],
                "RightItems": [
                    "Cannot be determined from a flexible budget report alone",
                    "Requires separate price and quantity data beyond the summary",
                    "Requires separate price and quantity data beyond the summary",
                    "Requires separate price and quantity data beyond the summary",
                    "Is exactly equal to the total static budget variance"
                ],
                "Correct": {
                    "Sales price variance": "Cannot be determined from a flexible budget report alone",
                    "Direct materials efficiency variance": "Requires separate price and quantity data beyond the summary",
                    "Direct materials price variance": "Requires separate price and quantity data beyond the summary",
                    "Labor rate variance": "Requires separate price and quantity data beyond the summary"
                },
                "Explanation": "A flexible budget report shows whether total costs were above or below the flexed amount but does not decompose variances into price and quantity components. The $38,000 unfavorable direct materials variance could be driven by higher material prices, excess usage, or both. To separate price from efficiency (quantity) effects, the accounting system must capture actual price per unit and actual quantity used separately from standard price and standard quantity. The sales price variance similarly requires knowing the actual selling price per unit compared to the standard or budgeted price. A candidate might assume the flexible budget report provides full variance decomposition, but standard costing systems require additional data to split variances into rate and efficiency components.",
                "Topic": "Flexible budget variance decomposition",
                "ItemID": "CBQ2-C1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Flexible budgeting separates volume effects from price and efficiency effects by flexing the budget to actual activity levels before comparing actual costs.",
                "BusinessInterpretation": "Management cannot evaluate purchasing performance or production efficiency from a total-variance report alone. Separate price and quantity sub-variances are needed to assign accountability.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-C1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Match each Q1 performance indicator to the most likely underlying cause.",
                "LeftItems": [
                    "Direct materials variance 15.2% unfavorable",
                    "Direct labor variance 2.4% unfavorable",
                    "Variable overhead 4.0% favorable",
                    "Sales volume 4.0% unfavorable"
                ],
                "RightItems": [
    "Fewer units sold than budgeted; investigate demand or market share changes",
    "Lower variable overhead spending or usage than expected at actual production levels",
    "Possible material waste or higher input prices requiring purchasing and production review",
    "Fixed overhead spending exceeded the budget; review fixed cost commitments",
    "Small labor inefficiency within normal tolerance; monitor but no immediate action"
],
                "Correct": {
                    "Direct materials variance 15.2% unfavorable": "Possible material waste or higher input prices requiring purchasing and production review",
                    "Direct labor variance 2.4% unfavorable": "Small labor inefficiency within normal tolerance; monitor but no immediate action",
                    "Variable overhead 4.0% favorable": "Lower variable overhead spending or usage than expected at actual production levels",
                    "Sales volume 4.0% unfavorable": "Fewer units sold than budgeted; investigate demand or market share changes"
                },
                "Explanation": "The 15.2% unfavorable direct materials variance is significant and exceeds any reasonable materiality threshold; management should investigate whether material prices increased or production used more materials than the standard allows. The 2.4% unfavorable labor variance is small in percentage terms and may fall within normal operating tolerance, but it should be monitored for trends. The favorable variable overhead variance could indicate lower utility rates, reduced indirect material usage, or a budgeting error. The 4.0% unfavorable sales volume variance suggests actual demand fell short of expectations; management should assess whether this is a temporary shortfall or a structural issue requiring pricing or promotion adjustments. A candidate might attribute the favorable variable overhead variance to good news without considering that it could reflect under-spending on maintenance or quality control.",
                "Topic": "Variance interpretation and investigation",
                "ItemID": "CBQ2-C1-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Variance investigation decisions should consider both the absolute dollar amount and the percentage deviation, as well as controllability and trend.",
                "BusinessInterpretation": "Management by exception directs attention to significant deviations. A 15% unfavorable variance in direct materials warrants immediate investigation, while a 2.4% variance may be within acceptable tolerance.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-C1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Match each flexible budget component to its correct formula.",
                "LeftItems": [
                    "Flexible budget revenue",
                    "Flexible budget direct materials cost",
                    "Flexible budget variable overhead cost",
                    "Sales volume variance in dollars"
                ],
                "RightItems": [
    "Actual units sold x Actual selling price per unit",
    "Actual units sold x Budgeted selling price per unit",
    "Actual units produced x Standard material cost per unit",
    "Actual units produced x Standard variable overhead rate per unit",
    "(Actual units sold - Budgeted units sold) x Budgeted contribution margin per unit"
],
                "Correct": {
                    "Flexible budget revenue": "Actual units sold x Budgeted selling price per unit",
                    "Flexible budget direct materials cost": "Actual units produced x Standard material cost per unit",
                    "Flexible budget variable overhead cost": "Actual units produced x Standard variable overhead rate per unit",
                    "Sales volume variance in dollars": "(Actual units sold - Budgeted units sold) x Budgeted contribution margin per unit"
                },
                "Explanation": "A flexible budget recomputes budgeted amounts using actual activity. Flexible budget revenue equals actual units sold times the budgeted selling price. Flexible budget costs equal actual production activity times standard cost per unit. The sales volume variance isolates the profit impact of selling more or fewer units than budgeted, computed as the difference in volume multiplied by the budgeted contribution margin per unit. A candidate who selects actual selling price for flexible budget revenue misunderstands that the flexible budget uses budgeted prices; the actual-versus-budget price comparison is captured separately in the sales price variance.",
                "Topic": "Flexible budget formulas",
                "ItemID": "CBQ2-C1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Flexible budgeting uses actual activity levels with standard or budgeted prices and rates to isolate volume-independent variances.",
                "BusinessInterpretation": "By flexing the budget to actual volumes, management can distinguish between variances caused by changes in activity levels and variances caused by operational efficiency or pricing.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-C1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Match each management action to the variance signal that would most likely trigger it.",
                "LeftItems": [
                    "Authorize overtime production",
                    "Renegotiate supplier contracts",
                    "Launch promotional campaign",
                    "Review fixed overhead commitments"
                ],
                "RightItems": [
    "Unfavorable direct materials price variance above threshold",
    "Unfavorable sales volume variance due to lost market share",
    "Favorable labor efficiency variance",
    "Favorable sales volume variance with backlog",
    "Unfavorable fixed overhead spending variance"
],
                "Correct": {
                    "Authorize overtime production": "Favorable sales volume variance with backlog",
                    "Renegotiate supplier contracts": "Unfavorable direct materials price variance above threshold",
                    "Launch promotional campaign": "Unfavorable sales volume variance due to lost market share",
                    "Review fixed overhead commitments": "Unfavorable fixed overhead spending variance"
                },
                "Explanation": "A favorable sales volume variance accompanied by a production backlog signals unmet demand; management may authorize overtime or additional shifts to capture foregone revenue. An unfavorable materials price variance that exceeds the investigation threshold requires purchasing to renegotiate supplier terms or seek alternative sources. An unfavorable sales volume variance caused by market share decline calls for demand-generating actions such as promotions or pricing adjustments. An unfavorable fixed overhead spending variance suggests that planned fixed costs were exceeded; management should review discretionary spending and fixed-cost commitments. A candidate might incorrectly match overtime authorization to an unfavorable labor variance, but overtime is a response to excess demand, not to labor cost overruns.",
                "Topic": "Variance-driven management decisions",
                "ItemID": "CBQ2-C1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Variance analysis is a diagnostic tool that guides management by exception toward areas requiring corrective action.",
                "BusinessInterpretation": "Variances are not merely accounting adjustments; they are signals that inform operational decisions such as capacity planning, procurement strategy, and pricing.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-C1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Match each variance type to the organizational unit most likely responsible for it.",
                "LeftItems": [
                    "Direct materials usage variance",
                    "Labor rate variance",
                    "Sales volume variance",
                    "Variable overhead spending variance"
                ],
                "RightItems": [
    "Human resources or union contract terms",
    "Department manager controlling indirect costs",
    "Production manager",
    "Sales and marketing department",
    "Corporate treasury"
],
                "Correct": {
                    "Direct materials usage variance": "Production manager",
                    "Labor rate variance": "Human resources or union contract terms",
                    "Sales volume variance": "Sales and marketing department",
                    "Variable overhead spending variance": "Department manager controlling indirect costs"
                },
                "Explanation": "The direct materials usage (efficiency) variance measures whether more or less material was used than the standard allows; the production manager controls usage through waste reduction, quality control, and employee training. The labor rate variance depends on the wage rates paid, which are typically determined by HR policies or collective bargaining agreements. The sales volume variance reflects the difference between actual and budgeted units sold, which is primarily the responsibility of the sales and marketing function. The variable overhead spending variance captures differences between actual and budgeted variable overhead rates, which are controlled by the department manager overseeing indirect costs. A candidate might assign the usage variance to purchasing, but purchasing is responsible for the price variance, not the quantity variance.",
                "Topic": "Variance responsibility accounting",
                "ItemID": "CBQ2-C1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Responsibility accounting assigns costs and variances to the manager who can most directly influence them.",
                "BusinessInterpretation": "Effective variance analysis must be paired with proper accountability. Assigning the materials usage variance to purchasing instead of production could lead to blaming the wrong manager and failing to address the root cause.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-C1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-C2",
        "Title": "Standard Cost Variance Computation",
        "SectionTags": [
            "C"
        ],
        "Pack": 2,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Direct materials price and quantity variance computation",
            "Direct labor rate and efficiency variance computation",
            "Variable overhead spending and efficiency variance analysis",
            "Standard cost card interpretation",
            "Integrated variance investigation decisions"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Standard Costing and Variance Analysis",
        "SecondaryCompetencies": [
            "Analysis",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Precision Components Inc.",
        "CompanyType": "Manufacturer",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 36,
        "ExhibitCount": 1,
        "Industry": "Precision manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Compute direct materials price and quantity variances from standard and actual data",
            "Compute direct labor rate and efficiency variances from standard and actual data",
            "Compute variable overhead spending and efficiency variances",
            "Interpret variance results to identify operational root causes",
            "Evaluate whether variances warrant investigation based on materiality and controllability"
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
                "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
            }
        ],
        "Stakeholder": "Plant Controller",
        "Tags": [
            "standard costing",
            "variance analysis",
            "direct materials",
            "direct labor",
            "overhead"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Precision Components Inc. manufactures specialized machine parts using a standard costing system. The plant controller has collected actual production data for March and needs to compute variances against the established standards. The standard cost card and actual results are provided in Exhibit 1. Management uses a materiality threshold of 5% of standard cost to determine which variances require formal investigation.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Standard Cost Card and March Actual Results",
                "Headers": [
                    "Item",
                    "Standard",
                    "Actual"
                ],
                "Rows": [
                    [
                        "Units produced",
                        "4,000",
                        "3,800"
                    ],
                    [
                        "Direct materials: pounds per unit",
                        "2.5 lbs",
                        "2.7 lbs"
                    ],
                    [
                        "Direct materials: price per pound",
                        "$12.00",
                        "$12.80"
                    ],
                    [
                        "Direct labor: hours per unit",
                        "1.2 hrs",
                        "1.3 hrs"
                    ],
                    [
                        "Direct labor: rate per hour",
                        "$22.00",
                        "$21.50"
                    ],
                    [
                        "Variable overhead: rate per DL hour",
                        "$8.00",
                        "$8.40"
                    ],
                    [
                        "Variable overhead: total incurred",
                        "",
                        "$41,496"
                    ]
                ],
                "ExhibitID": "CBQ2-C2-E1",
                "CaseID": "CBQ2-C2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Compute the direct materials price variance (enter as a positive number; indicate U or F after the number, e.g., 1234 F).",
                "Correct": "8208 U",
                "Explanation": "Actual pounds purchased = 3,800 units x 2.7 lbs = 10,260 lbs. Materials price variance = (Actual price - Standard price) x Actual quantity = ($12.80 - $12.00) x 10,260 = $0.80 x 10,260 = $8,208 unfavorable. The actual price exceeded the standard price, making this unfavorable. A candidate might use standard quantity instead of actual quantity when computing the price variance, but the price variance formula uses actual quantity to isolate the pure price effect.",
                "Topic": "Direct materials price variance",
                "ItemID": "CBQ2-C2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The direct materials price variance is (Actual Price - Standard Price) x Actual Quantity purchased.",
                "BusinessInterpretation": "A $8,208 unfavorable price variance signals that purchasing paid more per pound than expected, possibly due to supplier price increases, rush orders, or lower-quality substitutions.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Compute the direct materials quantity (usage) variance (enter as a positive number; indicate U or F).",
                "Correct": "9120 U",
                "Explanation": "Standard quantity allowed = 3,800 units x 2.5 lbs = 9,500 lbs. Actual quantity used = 3,800 units x 2.7 lbs = 10,260 lbs. Materials quantity variance = (Actual quantity - Standard quantity) x Standard price = (10,260 - 9,500) x $12.00 = 760 x $12.00 = $9,120 unfavorable. More material was used than the standard allows. A candidate might incorrectly use actual price instead of standard price in the quantity variance formula, but the standard price isolates the usage effect.",
                "Topic": "Direct materials quantity variance",
                "ItemID": "CBQ2-C2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The direct materials quantity variance is (Actual Quantity Used - Standard Quantity Allowed) x Standard Price.",
                "BusinessInterpretation": "The unfavorable $9,120 usage variance suggests production inefficiency, inferior material quality causing waste, or inadequate employee training. This exceeds the 5% threshold (5% of $114,000 = $5,700) and warrants investigation.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Compute the direct labor rate variance (enter as a positive number; indicate U or F).",
                "Correct": "2470 F",
                "Explanation": "Actual hours worked = 3,800 units x 1.3 hrs = 4,940 hours. Labor rate variance = (Actual rate - Standard rate) x Actual hours = ($21.50 - $22.00) x 4,940 = (-$0.50) x 4,940 = -$2,470 = $2,470 favorable. The actual wage rate was lower than the standard rate. A candidate might confuse favorable with unfavorable direction; a negative result when actual is less than standard produces a favorable variance.",
                "Topic": "Direct labor rate variance",
                "ItemID": "CBQ2-C2-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The direct labor rate variance is (Actual Rate - Standard Rate) x Actual Hours Worked.",
                "BusinessInterpretation": "A favorable rate variance could result from using lower-skilled employees or a wage rate freeze. However, management should verify that lower wage rates are not causing quality or efficiency problems.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Compute the direct labor efficiency variance (enter as a positive number; indicate U or F).",
                "Correct": "8360 U",
                "Explanation": "Standard hours allowed = 3,800 units x 1.2 hrs = 4,560 hours. Actual hours worked = 3,800 units x 1.3 hrs = 4,940 hours. Labor efficiency variance = (Actual hours - Standard hours) x Standard rate = (4,940 - 4,560) x $22.00 = 380 x $22.00 = $8,360 unfavorable. More labor hours were used than the standard allows. A candidate might use actual rate instead of standard rate, which would incorrectly include rate effects in the efficiency measure.",
                "Topic": "Direct labor efficiency variance",
                "ItemID": "CBQ2-C2-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "The direct labor efficiency variance is (Actual Hours - Standard Hours Allowed) x Standard Rate.",
                "BusinessInterpretation": "The $8,360 unfavorable efficiency variance (8.3% of $100,320 standard) exceeds the 5% threshold, suggesting training gaps, equipment issues, or poor production scheduling that increased labor time per unit.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Compute the variable overhead efficiency variance (enter as a positive number; indicate U or F).",
                "Correct": "3040 U",
                "Explanation": "Standard hours allowed = 3,800 units x 1.2 hrs = 4,560 hours. Actual hours = 4,940 hours. Variable overhead efficiency variance = (Actual hours - Standard hours) x Standard variable overhead rate = (4,940 - 4,560) x $8.00 = 380 x $8.00 = $3,040 unfavorable. The variance is driven by the same excess labor hours captured in the labor efficiency variance; variable overhead is applied based on direct labor hours. A candidate might compute this as (actual rate - standard rate) x actual hours, but that is the spending variance, not the efficiency variance.",
                "Topic": "Variable overhead efficiency variance",
                "ItemID": "CBQ2-C2-Q5",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "Variable overhead efficiency variance = (Actual Cost Driver - Standard Cost Driver Allowed) x Standard Variable Overhead Rate. When overhead is applied based on direct labor hours, this variance is directly linked to labor efficiency.",
                "BusinessInterpretation": "The unfavorable variable overhead efficiency variance reinforces the labor efficiency finding. Combined, the labor and overhead efficiency variances suggest a systemic productivity issue that requires root-cause analysis rather than isolated fixes.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C2",
                "EstimatedMinutes": 5,
                "Pack": 2,
                "ProductionStatus": "Draft",
                "Section": "C",
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
        "CaseID": "CBQ2-C3",
        "Title": "Investment Center Performance Evaluation",
        "SectionTags": [
            "C"
        ],
        "Pack": 2,
        "Section": "C",
        "BlueprintDomain": "Performance Management",
        "BlueprintObjectives": [
            "Return on investment (ROI) computation and analysis",
            "Residual income (RI) computation and analysis",
            "Comparison of ROI and RI for investment decisions",
            "Investment center performance measurement",
            "Goal congruence in decentralization"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Responsibility Accounting and Performance Measurement",
        "Subtopic": "Investment center performance evaluation",
        "SecondaryCompetencies": [
            "Calculation",
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Performance management",
        "CompanyName": "Phoenix Enterprises",
        "CompanyType": "Diversified holding company",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Diversified manufacturing and distribution",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Compute return on investment and residual income from divisional financial data",
            "Evaluate investment proposals using ROI and residual income frameworks",
            "Analyze the behavioral effects of ROI-based performance evaluation on manager decision-making",
            "Determine how residual income promotes goal congruence between divisional managers and corporate objectives",
            "Assess the impact of asset valuation methods on investment center performance metrics"
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
                "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
            }
        ],
        "Stakeholder": "Chief Financial Officer",
        "Tags": [
            "ROI",
            "residual income",
            "investment center",
            "decentralization",
            "goal congruence"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Phoenix Enterprises operates three investment centers (Divisions A, B, and C). The CFO is evaluating divisional performance for the fiscal year and considering a capital investment opportunity in Division A. The company uses return on investment as the primary performance metric but is also reviewing residual income to assess goal congruence. Exhibit 1 provides the divisional financial data for the current year.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Divisional Financial Data (Current Year)",
                "Headers": [
                    "Metric",
                    "Division A",
                    "Division B",
                    "Division C"
                ],
                "Rows": [
                    [
                        "Operating income",
                        "$480,000",
                        "$350,000",
                        "$600,000"
                    ],
                    [
                        "Total assets",
                        "$3,000,000",
                        "$2,500,000",
                        "$5,000,000"
                    ],
                    [
                        "Current liabilities",
                        "$400,000",
                        "$300,000",
                        "$500,000"
                    ],
                    [
                        "Required rate of return",
                        "12%",
                        "12%",
                        "12%"
                    ],
                    [
                        "Proposed investment - Division A",
                        "",
                        "",
                        ""
                    ],
                    [
                        "  Investment cost",
                        "$500,000",
                        "",
                        ""
                    ],
                    [
                        "  Expected annual operating income",
                        "$80,000",
                        "",
                        ""
                    ]
                ],
                "ExhibitID": "CBQ2-C3-E1",
                "CaseID": "CBQ2-C3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "Using the information in Exhibit 1, what is Division A's return on investment for the current year?",
                "Correct": "16.0%",
                "Choices": [
                    "16.0%",
                    "12.0%",
                    "18.5%",
                    "13.3%"
                ],
                "Explanation": "ROI = Operating income / Total assets = $480,000 / $3,000,000 = 16.0%. A candidate might compute 12% by confusing the required rate of return with ROI, or compute 18.5% by using net assets (total assets minus current liabilities = $2,600,000; $480,000 / $2,600,000 = 18.5%), but ROI conventionally uses total assets for investment center evaluation unless the company specifically defines invested capital as net assets.",
                "Topic": "Return on investment computation",
                "ItemID": "CBQ2-C3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "Return on investment is calculated as Operating Income divided by Total Assets (or Invested Capital, as defined by the organization).",
                "BusinessInterpretation": "Division A's 16% ROI exceeds the 12% required rate of return, indicating the division is generating economic value above the minimum threshold. However, ROI alone does not capture the dollar amount of value created.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "What is Division A's residual income for the current year?",
                "Correct": "$120,000",
                "Choices": [
                    "$120,000",
                    "$80,000",
                    "$200,000",
                    "$60,000"
                ],
                "Explanation": "Residual income = Operating income - (Required rate of return x Total assets) = $480,000 - (12% x $3,000,000) = $480,000 - $360,000 = $120,000. This represents the economic profit above the minimum required return. A candidate might select $80,000 (the proposed new investment's expected income) or $200,000 (subtracting the required return on net assets instead of total assets), but residual income uses the same asset base definition as the company's ROI computation.",
                "Topic": "Residual income computation",
                "ItemID": "CBQ2-C3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "Residual Income = Operating Income - (Required Rate of Return x Invested Capital). Unlike ROI (a ratio), RI is an absolute dollar measure.",
                "BusinessInterpretation": "Division A generated $120,000 of economic profit above the 12% minimum return. This absolute measure helps corporate management assess the dollar value added by each division.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "If the proposed $500,000 investment is accepted, what will Division A's new ROI be?",
                "Correct": "16.0%",
                "Choices": [
                    "16.0%",
                    "17.1%",
                    "14.5%",
                    "12.0%"
                ],
                "Explanation": "New operating income = $480,000 + $80,000 = $560,000. New total assets = $3,000,000 + $500,000 = $3,500,000. New ROI = $560,000 / $3,500,000 = 16.0%. The proposed investment earns exactly 16.0% ($80,000 / $500,000 = 16%), which matches the current ROI, so the division's ROI remains unchanged. A candidate might compute 17.1% by incorrectly dividing the new income by only the original asset base, or select 14.5% by various miscalculations. This demonstrates why ROI can sometimes be indifferent to value-creating investments when the project's ROI equals the division's current ROI.",
                "Topic": "ROI impact of new investments",
                "ItemID": "CBQ2-C3-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis",
                    "MultipleConcepts"
                ],
                "AccountingPrinciple": "When a project's ROI equals the division's current ROI, accepting the project does not change the division's overall ROI percentage.",
                "BusinessInterpretation": "A manager evaluated solely on ROI would be indifferent to this project even though it generates $80,000 of income above the 12% required return. This illustrates the potential for suboptimal decisions under ROI-based evaluation — a key argument for using residual income.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "If Division A is evaluated using residual income, should the manager accept the proposed $500,000 investment?",
                "Correct": "Yes, because residual income will increase by $20,000",
                "Choices": [
                    "Yes, because residual income will increase by $20,000",
                    "Yes, because residual income will increase by $80,000",
                    "No, because ROI will decrease",
                    "No, because the investment's ROI is below the current division ROI"
                ],
                "Explanation": "The proposed investment's residual income contribution = $80,000 - (12% x $500,000) = $80,000 - $60,000 = $20,000. Since residual income is positive, accepting the project increases the division's total residual income from $120,000 to $140,000. Under residual income evaluation, the manager has an incentive to accept any project earning above the required rate of return, which aligns with corporate wealth maximization. A candidate might select $80,000 by forgetting to subtract the capital charge, or select ROI-based reasons that would lead to rejecting value-creating projects.",
                "Topic": "Residual income and goal congruence",
                "ItemID": "CBQ2-C3-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Residual income promotes goal congruence because managers will accept any project with a positive residual income (return above the required rate), whereas ROI may cause managers to reject projects that reduce divisional ROI even if they create shareholder value.",
                "BusinessInterpretation": "This is a classic illustration of the advantage of residual income over ROI. The proposed project earns 16% (above the 12% required rate) and adds $20,000 of economic profit, but if evaluated on ROI alone, a manager might reject it because a low-ROI project would dilute the division's overall ROI percentage.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Which division had the best performance based on residual income?",
                "Correct": "Division A",
                "Choices": [
                    "Division C",
                    "Division A",
                    "Division B",
                    "Cannot be determined from the data provided"
                ],
                "Explanation": "Residual income calculations: Division A = $480,000 - (12% x $3,000,000) = $120,000. Division B = $350,000 - (12% x $2,500,000) = $350,000 - $300,000 = $50,000. Division C = $600,000 - (12% x $5,000,000) = $600,000 - $600,000 = $0. Division A has the highest residual income at $120,000. A candidate might select Division C based on absolute operating income ($600,000), which ignores the much larger asset base supporting that income. Division C's residual income of $0 means it earned exactly the required return but no economic profit above it. This illustrates why absolute income alone is a misleading performance measure for investment centers.",
                "Topic": "Divisional performance comparison",
                "ItemID": "CBQ2-C3-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "FinancialStatementAnalysis",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Residual income measures economic profit above the required return on invested capital, providing a direct comparison of value creation across divisions of different sizes.",
                "BusinessInterpretation": "Despite having the lowest operating income ($350,000), Division B has the least assets and earns $50,000 above its required return. Division A generates the most economic value ($120,000) even though its operating income is lower than Division C's. This demonstrates the importance of considering capital employed when evaluating investment center performance.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-C3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-D1",
        "Title": "Activity-Based Costing Implementation Analysis",
        "SectionTags": [
            "D"
        ],
        "Pack": 2,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Activity-based costing methodology and cost driver identification",
            "Comparison of traditional costing versus ABC",
            "ABC cost pool and driver selection",
            "Product cost distortion analysis under traditional systems",
            "Implementation considerations for ABC systems"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Activity-Based Costing",
        "Subtopic": "ABC system design and cost driver analysis",
        "SecondaryCompetencies": [
            "Analysis",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Apex Manufacturing",
        "CompanyType": "Manufacturer of electronic components",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 36,
        "ExhibitCount": 1,
        "Industry": "Electronics manufacturing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Identify appropriate cost drivers for ABC cost pools based on cause-and-effect relationships",
            "Evaluate the advantages of ABC over traditional volume-based costing",
            "Analyze product cost distortion when using a single plantwide overhead rate",
            "Select activities suitable for ABC cost pools using resource consumption patterns",
            "Assess implementation challenges and cost-benefit trade-offs of ABC systems"
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
                "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
            }
        ],
        "Stakeholder": "Cost Accounting Manager",
        "Tags": [
            "ABC",
            "cost drivers",
            "activity-based costing",
            "overhead allocation",
            "product costing"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Apex Manufacturing produces two electronic components: the Standard Board (high volume, simple assembly) and the Custom Board (low volume, complex assembly). The company currently uses a single plantwide overhead rate based on direct labor hours. The cost accounting manager suspects that this traditional approach is distorting product costs because the Custom Board consumes significantly more engineering change orders, quality inspections, and machine setups per unit than the Standard Board. The CFO has asked for an ABC analysis. Exhibit 1 shows the activity data for the current period.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Activity Data and Overhead Analysis",
                "Headers": [
                    "Activity",
                    "Cost Pool",
                    "Cost Driver",
                    "Standard Board",
                    "Custom Board",
                    "Total Driver Volume"
                ],
                "Rows": [
                    [
                        "Machine operations",
                        "$400,000",
                        "Machine hours",
                        "12,000",
                        "8,000",
                        "20,000"
                    ],
                    [
                        "Machine setups",
                        "$150,000",
                        "Number of setups",
                        "30",
                        "120",
                        "150"
                    ],
                    [
                        "Quality inspections",
                        "$90,000",
                        "Inspection hours",
                        "400",
                        "1,100",
                        "1,500"
                    ],
                    [
                        "Engineering changes",
                        "$60,000",
                        "Change orders",
                        "10",
                        "50",
                        "60"
                    ],
                    [
                        "Materials handling",
                        "$100,000",
                        "Material moves",
                        "200",
                        "300",
                        "500"
                    ],
                    [
                        "Total overhead",
                        "$800,000",
                        "",
                        "",
                        "",
                        ""
                    ],
                    [
                        "Direct labor hours",
                        "",
                        "Current allocation base",
                        "18,000",
                        "12,000",
                        "30,000"
                    ]
                ],
                "ExhibitID": "CBQ2-D1-E1",
                "CaseID": "CBQ2-D1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "multi",
                "Prompt": "Which activities shown in Exhibit 1 would benefit most from having their own cost pools in an ABC system rather than being lumped into a single overhead rate?",
                "Correct": [
                    "Engineering changes",
                    "Machine setups",
                    "Quality inspections"
                ],
                "Choices": [
                    "Engineering changes",
                    "Machine setups",
                    "Quality inspections",
                    "Direct materials",
                    "Direct labor"
                ],
                "Explanation": "Engineering changes, machine setups, and quality inspections are all non-volume-related activities whose consumption patterns differ significantly between Standard and Custom boards. Under a single plantwide rate based on direct labor hours, these costs would be allocated disproportionately to the high-volume Standard Board. Direct materials and direct labor are direct costs traced directly to products, not overhead activities that would be in a cost pool. A candidate might include all activities listed, but direct materials and labor are not part of overhead allocation — they are direct costs assigned by tracing.",
                "Topic": "ABC cost pool identification",
                "ItemID": "CBQ2-D1-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity",
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Activity-based costing assigns overhead to products based on each product's consumption of activities, using cause-and-effect cost drivers rather than a single volume-based allocation.",
                "BusinessInterpretation": "Products with complex, low-volume production processes (like the Custom Board) typically consume disproportionate shares of support activities. ABC captures this by using activity-specific cost drivers rather than spreading all overhead evenly across direct labor hours.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Which items represent valid criticisms of Apex's current single plantwide overhead rate approach?",
                "Correct": [
                    "High-volume products may be overcosted relative to their actual resource consumption",
                    "The system provides no incentive to manage non-labor overhead activities",
                    "Custom products' complexity is not reflected in the cost allocation"
                ],
                "Choices": [
                    "High-volume products may be overcosted relative to their actual resource consumption",
                    "The system provides no incentive to manage non-labor overhead activities",
                    "Custom products' complexity is not reflected in the cost allocation",
                    "Direct labor hours are always the most accurate allocation base",
                    "Single rates are more expensive to maintain than multiple rates"
                ],
                "Explanation": "Under a single plantwide rate, high-volume products absorb a large share of all overhead costs, including those driven by complexity rather than volume. This overcosts simple high-volume products and undercosts complex low-volume products. Since the allocation is based only on labor hours, there is no direct link between cost and cost driver for activities like setups or engineering changes, so managers have no cost signal to manage those activities. Single rates are actually less expensive to maintain than multiple ABC rates; this is one reason companies hesitate to adopt ABC. Direct labor hours are not inherently the most accurate base — accuracy depends on whether overhead costs are actually driven by labor hours.",
                "Topic": "Traditional costing limitations",
                "ItemID": "CBQ2-D1-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity",
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Volume-based allocation systems distort product costs when overhead is driven by factors other than production volume, such as product complexity, batch size, or setup time.",
                "BusinessInterpretation": "Management may be making incorrect pricing, product mix, or outsourcing decisions based on distorted cost information. A product that appears profitable under traditional costing may actually be unprofitable when its true consumption of support activities is recognized.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Assuming Apex adopts ABC, which cost drivers are most appropriate for the machining and setup cost pools?",
                "Correct": [
                    "Machine hours for the machining cost pool",
                    "Number of setups for the setup cost pool"
                ],
                "Choices": [
                    "Machine hours for the machining cost pool",
                    "Number of setups for the setup cost pool",
                    "Direct labor hours for the setup cost pool",
                    "Units produced for the machining cost pool",
                    "Inspection hours for the machining cost pool"
                ],
                "Explanation": "Machine hours are the appropriate cost driver for the machining pool because machining costs (power, maintenance, depreciation) vary with machine runtime. Number of setups is the appropriate driver for the setup pool because setup costs are incurred each time a production run is changed, regardless of how many units are produced afterward. Direct labor hours would not reflect setup activity. Units produced would dilute the cost of setups that occur per batch, not per unit. Inspection hours relate to quality costs, not machining.",
                "Topic": "ABC cost driver selection",
                "ItemID": "CBQ2-D1-Q3",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity",
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "ABC requires identifying a cost driver for each activity that has a cause-and-effect relationship with the costs in the cost pool.",
                "BusinessInterpretation": "The Custom Board has four times as many setups as the Standard Board (120 vs. 30), even though it uses fewer machine hours (8,000 vs. 12,000). Using setups as a driver will allocate setup costs much more heavily to the Custom Board, reflecting the true cost of its low-volume, high-complexity production.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Which of the following are valid reasons why Apex might choose NOT to implement a full ABC system?",
                "Correct": [
                    "The cost of data collection and system maintenance may exceed the benefits",
                    "Managers may be comfortable with the existing cost system and resist change",
                    "ABC requires significant judgment in defining activities and cost drivers"
                ],
                "Choices": [
                    "The cost of data collection and system maintenance may exceed the benefits",
                    "Managers may be comfortable with the existing cost system and resist change",
                    "ABC requires significant judgment in defining activities and cost drivers",
                    "ABC always produces lower product costs than traditional costing",
                    "ABC is prohibited under GAAP for external reporting"
                ],
                "Explanation": "ABC systems are expensive to implement and maintain. Data collection for activity volumes requires detailed tracking systems that many companies lack. Behavioral resistance is a common barrier — managers may distrust new cost numbers or fear unfavorable comparisons. ABC involves substantial judgment in defining activities, grouping cost pools, and selecting drivers. ABC does not always produce lower costs; it redistributes costs. ABC is not prohibited under GAAP; many companies use ABC for internal management and a simplified system for external reporting.",
                "Topic": "ABC implementation challenges",
                "ItemID": "CBQ2-D1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "ABC is a management accounting tool designed for internal decision-making. Companies may maintain separate systems for internal and external reporting.",
                "BusinessInterpretation": "The decision to implement ABC is a cost-benefit analysis. If the product mix is relatively simple or overhead is a small percentage of total cost, the benefits of ABC may not justify the implementation expense.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "If Apex uses a single plantwide rate based on direct labor hours, what is the overhead allocated to the Standard Board?",
                "Correct": "$480,000",
                "Choices": [
                    "$480,000",
                    "$320,000",
                    "$800,000",
                    "$200,000"
                ],
                "Explanation": "Plantwide overhead rate = $800,000 / 30,000 DL hours = $26.67 per DL hour (rounded). Overhead allocated to Standard Board = 18,000 DL hours x $26.67 = $480,000 (approximately). A candidate might compute $320,000 by using the Custom Board's hours instead, or $800,000 by assigning all overhead to the high-volume product. Under ABC, the allocation would likely shift because the Custom Board consumes a disproportionate share of non-volume-driven activities like setups and engineering changes.",
                "Topic": "Traditional cost allocation with plantwide rate",
                "ItemID": "CBQ2-D1-Q5",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "A plantwide overhead rate is computed as Total Estimated Overhead divided by Total Estimated Allocation Base (e.g., direct labor hours).",
                "BusinessInterpretation": "Under the traditional system, the Standard Board — a simple, high-volume product — receives 60% of all overhead ($480,000 / $800,000). Under ABC, this share would likely decrease because many overhead costs are driven by activities related to the Custom Board's complexity, not by volume.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D1",
                "EstimatedMinutes": 5,
                "Pack": 2,
                "ProductionStatus": "Draft",
                "Section": "D",
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
        "CaseID": "CBQ2-D2",
        "Title": "Joint Cost Allocation & Sell-or-Process-Further Decisions",
        "SectionTags": [
            "D"
        ],
        "Pack": 2,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Joint cost allocation — NRV method",
            "Joint cost allocation — physical-units method",
            "Sell-or-process-further analysis",
            "Joint cost concepts",
            "Joint costing terminology"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Cost Allocation",
        "Subtopic": "Joint cost allocation",
        "SecondaryCompetencies": [
            "Calculation",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "Gulf Coast Fisheries",
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
            "Analyze joint cost allocation — nrv method",
            "Analyze joint cost allocation — physical-units method",
            "Analyze sell-or-process-further analysis",
            "Analyze joint cost concepts",
            "Analyze joint costing terminology",
            "Analyze joint cost allocation methods"
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
        "ScenarioText": "Gulf Coast Fisheries processes raw tuna at a single split-off point into three products. The controller must allocate the $200,000 joint cost to main products for inventory valuation and advise management on whether to process products beyond split-off before the quarterly audit committee review.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Joint Cost & Production Data",
                "Headers": [
                    "Product",
                    "Units Produced",
                    "Sales Value at Split-Off",
                    "Further Processing Cost",
                    "Final Sales Value if Processed Further"
                ],
                "Rows": [
                    [
                        "Alpha (canned)",
                        "10,000",
                        "$100,000",
                        "$30,000",
                        "$150,000"
                    ],
                    [
                        "Beta (steaks)",
                        "5,000",
                        "$150,000",
                        "$20,000",
                        "$200,000"
                    ],
                    [
                        "Gamma (pet food – byproduct)",
                        "2,000",
                        "$20,000",
                        "$0",
                        "$20,000"
                    ]
                ],
                "ExhibitID": "CBQ2-D2-E1",
                "CaseID": "CBQ2-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            },
            {
                "Type": "table",
                "Title": "Exhibit 2 — Allocation Policy & Rules",
                "Headers": [
                    "Item",
                    "Detail"
                ],
                "Rows": [
                    [
                        "Total joint cost incurred before split-off",
                        "$200,000"
                    ],
                    [
                        "Byproduct treatment",
                        "NRV of byproduct deducted from joint cost before allocation to main products"
                    ],
                    [
                        "NRV method definition",
                        "Allocates joint cost based on final sales value minus further processing costs"
                    ],
                    [
                        "Physical-units method definition",
                        "Allocates joint cost based on units of output volume"
                    ],
                    [
                        "Sell-or-process-further rule",
                        "Process further only if incremental revenue exceeds incremental cost"
                    ]
                ],
                "ExhibitID": "CBQ2-D2-E2",
                "CaseID": "CBQ2-D2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Using the NRV method (net of byproduct), calculate the joint cost allocated to Alpha. Round to the nearest whole dollar.",
                "Correct": "72000",
                "Explanation": "Byproduct deduction: $200,000 − $20,000 = $180,000 net joint cost. Alpha NRV = $150,000 − $30,000 = $120,000. Beta NRV = $200,000 − $20,000 = $180,000. Total NRV = $300,000. Alpha allocation = $180,000 × ($120,000 / $300,000) = $72,000. The NRV method matches cost allocation to revenue-generating potential.",
                "Topic": "Joint cost allocation — NRV method",
                "ItemID": "CBQ2-D2-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Using the physical-units method (net of byproduct), calculate the joint cost allocated to Beta. Round to the nearest whole dollar.",
                "Correct": "60000",
                "Explanation": "Net joint cost after byproduct = $180,000. Total main-product units = 10,000 + 5,000 = 15,000. Beta units = 5,000. Allocation = $180,000 × (5,000 / 15,000) = $60,000. The physical-units method ignores relative value and allocates strictly by volume. A common trap is to include the byproduct units in the denominator.",
                "Topic": "Joint cost allocation — physical-units method",
                "ItemID": "CBQ2-D2-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
                "BusinessInterpretation": "The physical-units method allocates cost strictly by production volume. A common trap is to include the byproduct units in the denominator.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Should Beta be processed further based on the sell-or-process-further rule?",
                "Choices": [
                    "Yes, because incremental benefit is $30,000",
                    "Yes, because the final sales value is $200,000",
                    "No, because further processing costs exceed joint cost allocation",
                    "No, because Beta already has higher value at split-off"
                ],
                "Correct": "Yes, because incremental benefit is $30,000",
                "Explanation": "Incremental revenue = $200,000 − $150,000 = $50,000. Incremental cost = $20,000. Net benefit = $30,000. Joint costs are sunk and irrelevant to sell-or-process-further decisions; only incremental revenue and incremental cost matter.",
                "Topic": "Sell-or-process-further analysis",
                "ItemID": "CBQ2-D2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Process further only if incremental revenue exceeds incremental costs.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "Select the correct statements about joint cost allocation.",
                "Choices": [
                    "Byproduct revenue is typically deducted from joint cost before allocating to main products",
                    "Physical-units method can cause a high-value product to appear unprofitable",
                    "Joint costs are relevant for sell-or-process-further decisions",
                    "NRV method uses final sales value minus further processing costs as the allocation base"
                ],
                "Correct": [
                    "Byproduct revenue is typically deducted from joint cost before allocating to main products",
                    "Physical-units method can cause a high-value product to appear unprofitable",
                    "NRV method uses final sales value minus further processing costs as the allocation base"
                ],
                "Explanation": "Byproduct NRV is deducted to avoid distorting main-product margins. Physical-units allocation ignores value, so a high-value product may seem unprofitable. Joint costs are sunk and irrelevant for further-processing decisions — a common exam trap.",
                "Topic": "Joint cost concepts",
                "ItemID": "CBQ2-D2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "DistractorSimilarity"
                ],
                "BusinessInterpretation": "Byproduct NRV is deducted to avoid distorting main-product margins. Physical-units allocation ignores value, so a high-value product may seem unprofitable under that method.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Costs incurred after the split-off point that can be traced to individual products are called ______ costs.",
                "Correct": "separable",
                "Explanation": "Separable costs are incurred after split-off and are directly assignable to individual products. They are distinguished from joint costs, which are common costs incurred before split-off.",
                "Topic": "Joint costing terminology",
                "ItemID": "CBQ2-D2-Q5",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Match each joint cost allocation method to its allocation basis.",
                "LeftItems": [
                    "NRV method",
                    "Physical-units method",
                    "Sales-value-at-split-off method",
                    "Constant gross-margin NRV method"
                ],
                "RightItems": [
    "Volume of output",
    "Final sales value minus further processing costs",
    "Joint cost allocated so every product has the same gross margin percentage",
    "Market value at split-off point"
],
                "Correct": {
                    "NRV method": "Final sales value minus further processing costs",
                    "Physical-units method": "Volume of output",
                    "Sales-value-at-split-off method": "Market value at split-off point",
                    "Constant gross-margin NRV method": "Joint cost allocated so every product has the same gross margin percentage"
                },
                "Explanation": "Each method uses a different allocation base. NRV uses net realizable value (final value minus separable costs). Physical units use output volume. Sales-value-at-split-off uses market value at the split-off point. Constant gross-margin NRV back-allocates to achieve identical gross margin percentages across products.",
                "Topic": "Joint cost allocation methods",
                "ItemID": "CBQ2-D2-Q6",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
                "BusinessInterpretation": "NRV back-allocates to achieve identical gross margin percentages across products.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D2",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-D3",
        "Title": "Process Costing — Equivalent Units and Cost Allocation",
        "SectionTags": [
            "D"
        ],
        "Pack": 2,
        "Section": "D",
        "BlueprintDomain": "Cost Management",
        "BlueprintObjectives": [
            "Weighted-average equivalent unit computation",
            "FIFO equivalent unit computation",
            "Cost per equivalent unit and cost allocation",
            "Process costing for multiple departments",
            "Comparison of weighted-average and FIFO methods"
        ],
        "PrimaryCompetency": "Calculation",
        "Topic": "Process Costing",
        "Subtopic": "Equivalent units and cost allocation",
        "SecondaryCompetencies": [
            "Analysis"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Cost accounting",
        "CompanyName": "ChemFlow Processing",
        "CompanyType": "Chemical processor",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Chemical processing",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Compute equivalent units of production using the weighted-average method",
            "Compute equivalent units of production using the FIFO method",
            "Calculate cost per equivalent unit and allocate costs between completed units and work-in-process",
            "Analyze the impact of beginning WIP inventory treatment on unit costs",
            "Apply process costing concepts to a multi-department production environment"
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
                "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
            }
        ],
        "Stakeholder": "Cost Accounting Manager",
        "Tags": [
            "process costing",
            "equivalent units",
            "weighted-average",
            "FIFO",
            "WIP inventory"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "ChemFlow Processing produces a chemical compound in a continuous manufacturing process. All direct materials are added at the beginning of the production process, while conversion costs are incurred evenly throughout the process. The company uses process costing to compute unit costs. For March, the cost accountant needs to determine equivalent units using both the weighted-average and FIFO methods, then allocate total costs between completed units and ending work-in-process inventory. Exhibit 1 provides the production and cost data for March.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — March Production and Cost Data",
                "Headers": [
                    "Item",
                    "Amount"
                ],
                "Rows": [
                    [
                        "Beginning WIP (March 1)",
                        "5,000 units"
                    ],
                    [
                        "  Beginning completion: Materials",
                        "100%"
                    ],
                    [
                        "  Beginning completion: Conversion",
                        "40%"
                    ],
                    [
                        "  Beginning WIP cost: Materials",
                        "$30,000"
                    ],
                    [
                        "  Beginning WIP cost: Conversion",
                        "$12,000"
                    ],
                    [
                        "Units started in March",
                        "20,000 units"
                    ],
                    [
                        "Units completed and transferred out",
                        "18,000 units"
                    ],
                    [
                        "Ending WIP (March 31)",
                        "7,000 units"
                    ],
                    [
                        "  Ending completion: Materials",
                        "100%"
                    ],
                    [
                        "  Ending completion: Conversion",
                        "50%"
                    ],
                    [
                        "March costs added: Direct materials",
                        "$168,000"
                    ],
                    [
                        "March costs added: Conversion",
                        "$126,000"
                    ]
                ],
                "ExhibitID": "CBQ2-D3-E1",
                "CaseID": "CBQ2-D3",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "numeric",
                "Prompt": "Using the weighted-average method, compute the equivalent units for conversion costs.",
                "Correct": 21500,
                "Explanation": "Weighted-average EU for conversion = Units completed (18,000) + Ending WIP (7,000 units x 50% complete = 3,500 EU) = 18,000 + 3,500 = 21,500 EU. Under weighted-average, beginning WIP is treated as if it were started and completed in the current period; no separate calculation for beginning WIP completion is needed. A candidate might subtract beginning WIP or add separate EU for beginning WIP completion, but the weighted-average method combines beginning inventory costs with current period costs and computes a single EU total.",
                "Topic": "Weighted-average equivalent units",
                "ItemID": "CBQ2-D3-Q1",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Simple",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "FinancialStatementAnalysis"
                ],
                "AccountingPrinciple": "Under the weighted-average method, equivalent units = Units completed and transferred out + (Ending WIP units x Percentage complete). Beginning WIP is not separately tracked.",
                "BusinessInterpretation": "The weighted-average method simplifies costing by blending beginning and current period costs. It is widely used when inventory levels are stable and the additional precision of FIFO is not justified.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Using the FIFO method, compute the equivalent units for conversion costs.",
                "Correct": "19500",
                "Explanation": "FIFO EU for conversion = (Beginning WIP units x % to complete) + (Units started and completed) + (Ending WIP units x % complete). Beginning WIP completion: 5,000 units x (100% - 40%) = 5,000 x 60% = 3,000 EU. Units started and completed = 20,000 started - 7,000 ending = 13,000 units. Ending WIP: 7,000 x 50% = 3,500 EU. Total = 3,000 + 13,000 + 3,500 = 19,500. Wait — recalculating: Units started and completed = Units completed - Beginning WIP = 18,000 - 5,000 = 13,000. FIFO EU = (5,000 x 0.6) + 13,000 + (7,000 x 0.5) = 3,000 + 13,000 + 3,500 = 19,500. Correction: 19,500 EU.",
                "Topic": "FIFO equivalent units",
                "ItemID": "CBQ2-D3-Q2",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Under FIFO, equivalent units = (Beginning WIP x % to complete) + (Units started and completed) + (Ending WIP x % complete). Beginning WIP costs are kept separate and applied only to the current period's work.",
                "BusinessInterpretation": "FIFO provides a clearer picture of current period production costs by separating beginning WIP costs from current period costs, which is useful when input costs are changing over time.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D3",
                "EstimatedMinutes": 7,
                "Pack": 2,
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
                "Prompt": "Using the weighted-average method, compute the total cost per equivalent unit for conversion costs. Round to the nearest cent.",
                "Correct": "6.42",
                "Explanation": "Total conversion cost = Beginning WIP conversion ($12,000) + March conversion ($126,000) = $138,000. Weighted-average EU for conversion = 18,000 + (7,000 x 0.5) = 21,500. Cost per EU = $138,000 / 21,500 = $6.4186, rounded to $6.42. A candidate might forget to include beginning WIP costs in the numerator, resulting in a lower cost per EU ($126,000 / 21,500 = $5.86), but weighted-average combines beginning and current period costs.",
                "Topic": "Weighted-average cost per equivalent unit",
                "ItemID": "CBQ2-D3-Q3",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Weighted-average cost per EU = (Beginning WIP Cost + Current Period Cost) / Weighted-Average Equivalent Units.",
                "BusinessInterpretation": "The blended cost per EU smooths out periodic cost fluctuations, which can be helpful for stable pricing but may obscure rising or falling cost trends.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Using the weighted-average method, compute the cost of units completed and transferred out (conversion only). Round to the nearest whole dollar.",
                "Correct": 115535,
                "Explanation": "Cost per EU for conversion = $6.4186 (unrounded). Units completed = 18,000. Conversion cost assigned = 18,000 x $6.4186 = $115,535. Wait — let me recompute precisely. $138,000 / 21,500 EU = $6.418604651. $6.418604651 x 18,000 = $115,534.88, rounded to $115,535. Using rounded $6.42 x 18,000 = $115,560. Precision: $138,000 / 21,500 = 6.418604651. 6.418604651 * 18000 = 115534.88.",
                "Topic": "Cost allocation to completed units",
                "ItemID": "CBQ2-D3-Q4",
                "CognitiveLevel": "Apply",
                "CalculationComplexity": "Moderate",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "MultiStepCalculation"
                ],
                "AccountingPrinciple": "Cost of units completed = Units completed x Cost per equivalent unit.",
                "BusinessInterpretation": "The cost assigned to completed units becomes part of finished goods inventory and ultimately cost of goods sold. Accurate EU computation is essential for proper inventory valuation and income determination.",
                "CalculationRequired": true,
                "CaseID": "CBQ2-D3",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Under the weighted-average method, why is the conversion cost per EU different from what it would be under FIFO?",
                "Correct": "Weighted-average blends beginning WIP costs ($12,000) with March costs, while FIFO keeps them separate, so the denominators and numerators differ",
                "Choices": [
                    "Weighted-average blends beginning WIP costs ($12,000) with March costs, while FIFO keeps them separate, so the denominators and numerators differ",
                    "FIFO always produces a lower cost per EU because it assumes older costs are cheaper",
                    "Weighted-average uses a different definition of equivalent units that excludes ending WIP",
                    "FIFO ignores conversion costs entirely and assigns them only to direct materials"
                ],
                "Explanation": "Under weighted-average, beginning WIP costs ($12,000 conversion) are added to March costs ($126,000), and EU includes all work done on all units (21,500 EU). Under FIFO, beginning WIP costs remain separate and only March costs ($126,000) are divided by FIFO EU (19,500). The difference in both numerator and denominator produces a different cost per EU. FIFO does not automatically produce lower costs — the direction depends on whether costs are rising or falling. Weighted-average does not exclude ending WIP from EU. FIFO definitely includes conversion costs.",
                "Topic": "Method comparison — weighted-average vs FIFO",
                "ItemID": "CBQ2-D3-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "Terminology"
                ],
                "AccountingPrinciple": "The weighted-average method blends prior-period and current-period costs, while FIFO separates beginning inventory costs and values beginning WIP as a distinct batch.",
                "BusinessInterpretation": "In periods of rising costs, FIFO produces a higher cost per EU and a higher cost of goods sold, while weighted-average smooths the increase. Management should select the method that best reflects the actual production flow and cost behavior.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-D3",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-E1",
        "Title": "IT General Controls Assessment",
        "SectionTags": [
            "E"
        ],
        "Pack": 2,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "IT general controls framework and components",
            "Logical access controls",
            "Change management controls",
            "Computer operations controls",
            "System development lifecycle controls"
        ],
        "PrimaryCompetency": "Analysis",
        "Topic": "IT General Controls",
        "SecondaryCompetencies": [
            "Judgment",
            "Conceptual"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "DataGuard Systems",
        "CompanyType": "Financial services firm",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Financial services",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Identify IT general control categories and their purposes",
            "Match control activities to the IT risks they mitigate",
            "Distinguish between IT general controls and application controls",
            "Evaluate segregation of duties within IT functions",
            "Analyze IT control deficiencies and recommend remediation"
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
            }
        ],
        "Stakeholder": "Chief Information Officer",
        "Tags": [
            "IT controls",
            "access controls",
            "change management",
            "SDLC",
            "IS audit"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "DataGuard Systems, a financial services firm, processes confidential client data through its core banking platform. The internal audit team is conducting a review of IT general controls following a recent security incident involving unauthorized access to the production environment. The IT director has provided Exhibit 1 summarizing the current control environment. The audit team must identify gaps and recommend improvements.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — IT General Control Environment Summary",
                "Headers": [
                    "Control Area",
                    "Current Practice",
                    "Issue Identified"
                ],
                "Rows": [
                    [
                        "Logical access",
                        "Password-based authentication with 90-day rotation",
                        "Shared admin accounts exist; no multi-factor authentication"
                    ],
                    [
                        "Change management",
                        "System changes approved via email",
                        "No formal change advisory board; emergency changes not tracked"
                    ],
                    [
                        "Computer operations",
                        "Batch processing runs overnight",
                        "No independent review of job completion logs"
                    ],
                    [
                        "Program development",
                        "Developers have access to production data",
                        "No segregation between development, test, and production environments"
                    ],
                    [
                        "Physical security",
                        "Server room requires badge access",
                        "Visitor logs not maintained consistently"
                    ]
                ],
                "ExhibitID": "CBQ2-E1-E1",
                "CaseID": "CBQ2-E1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "match",
                "Prompt": "Match each IT general control category to the primary risk it addresses.",
                "LeftItems": [
                    "Logical access controls",
                    "Change management controls",
                    "Computer operations controls",
                    "Program development controls"
                ],
                "RightItems": [
    "Unauthorized or untested system modifications causing errors or security gaps",
    "Unauthorized users gaining system access",
    "Hardware theft or environmental damage to data center",
    "Processing errors, data loss, or incomplete processing going undetected",
    "Flawed or malicious code introduced into production systems"
],
                "Correct": {
                    "Logical access controls": "Unauthorized users gaining system access",
                    "Change management controls": "Unauthorized or untested system modifications causing errors or security gaps",
                    "Computer operations controls": "Processing errors, data loss, or incomplete processing going undetected",
                    "Program development controls": "Flawed or malicious code introduced into production systems"
                },
                "Explanation": "Logical access controls (passwords, MFA, account management) prevent unauthorized access. Change management ensures system modifications are authorized, tested, and documented. Computer operations controls monitor batch processing, backups, and job completion. Program development controls (SDLC, segregation of environments) prevent defective or unauthorized code from reaching production. Physical security risks (hardware theft, environmental damage) are addressed by physical access controls, not by the ITGC categories listed here. A candidate might confuse computer operations with logical access controls, but operations controls focus on system processing integrity, not user authentication.",
                "Topic": "IT general control categories",
                "ItemID": "CBQ2-E1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "IT general controls (ITGC) govern the overall IT environment and include logical access, change management, computer operations, and program development controls.",
                "BusinessInterpretation": "Weak ITGC can result in unauthorized transactions, data breaches, and unreliable financial reporting. COSO and COBIT frameworks emphasize ITGC as foundational to reliable financial systems.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Match each control deficiency identified in Exhibit 1 to the most appropriate remediation.",
                "LeftItems": [
                    "Shared admin accounts without MFA",
                    "Changes approved only via email",
                    "Developers accessing production data",
                    "No batch job completion review"
                ],
                "RightItems": [
    "Enforce environment segregation and restrict production access to operations team only",
    "Install video surveillance and biometric access controls in the server room",
    "Implement individual accounts with multi-factor authentication and periodic access reviews",
    "Establish a change advisory board with formal approval, testing, and rollback procedures",
    "Implement automated job monitoring with alerts for failures and independent review of logs"
],
                "Correct": {
                    "Shared admin accounts without MFA": "Implement individual accounts with multi-factor authentication and periodic access reviews",
                    "Changes approved only via email": "Establish a change advisory board with formal approval, testing, and rollback procedures",
                    "Developers accessing production data": "Enforce environment segregation and restrict production access to operations team only",
                    "No batch job completion review": "Implement automated job monitoring with alerts for failures and independent review of logs"
                },
                "Explanation": "Shared accounts eliminate individual accountability; each user should have a unique ID and MFA for administrative access. Email-based change approval lacks the structure of a formal change advisory board (CAB) with documented testing, approval, and rollback plans. Developers in production violates segregation of duties between development and operations; production access should be limited to the operations team. Batch job completion should be monitored automatically with independent review to detect failures or unauthorized changes. Physical security remediation (video surveillance) addresses a different control area not flagged as deficient in this scenario.",
                "Topic": "IT control remediation",
                "ItemID": "CBQ2-E1-Q2",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Control weaknesses should be remediated based on risk severity. The COBIT framework provides a structured approach to IT control assessment and remediation.",
                "BusinessInterpretation": "The deficiencies identified represent systemic ITGC weaknesses that could lead to material misstatements in financial reporting if they affect financial applications. Management should prioritize remediation based on the sensitivity of the affected systems.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "Match each IT control type to the correct description of its purpose.",
                "LeftItems": [
                    "Preventive control",
                    "Detective control",
                    "Corrective control",
                    "Compensating control"
                ],
                "RightItems": [
    "Provides alternative oversight when primary controls are not feasible",
    "Resolves issues after detection to restore normal operations",
    "Documents all system changes for audit trail purposes",
    "Stops errors or unauthorized actions before they occur",
    "Identifies errors or irregularities after they have occurred"
],
                "Correct": {
                    "Preventive control": "Stops errors or unauthorized actions before they occur",
                    "Detective control": "Identifies errors or irregularities after they have occurred",
                    "Corrective control": "Resolves issues after detection to restore normal operations",
                    "Compensating control": "Provides alternative oversight when primary controls are not feasible"
                },
                "Explanation": "Preventive controls (e.g., password policies, authorization requirements) stop problems before they happen. Detective controls (e.g., access logs, batch completion monitoring) find problems after they occur. Corrective controls (e.g., backup restoration, incident response plans) fix problems. Compensating controls (e.g., manual review when automated controls are lacking) provide alternative oversight. Documentation is not a control type; it supports all control types by providing evidence.",
                "Topic": "IT control types",
                "ItemID": "CBQ2-E1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Internal controls are classified as preventive, detective, corrective, or compensating based on when they operate relative to the risk event.",
                "BusinessInterpretation": "A well-designed IT control environment uses a mix of preventive and detective controls. Over-reliance on detective controls without preventive measures exposes the organization to unnecessary risk.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Match each application control type to its correct example.",
                "LeftItems": [
                    "Input validation",
                    "Processing control",
                    "Output control",
                    "Access control"
                ],
                "RightItems": [
    "Run-to-run control totals verifying data processed completely",
    "User authentication required to access the application",
    "Range check ensuring dollar amounts fall within expected limits",
    "Quarterly physical inventory count verification",
    "Review of printed reports for reasonableness before distribution"
],
                "Correct": {
                    "Input validation": "Range check ensuring dollar amounts fall within expected limits",
                    "Processing control": "Run-to-run control totals verifying data processed completely",
                    "Output control": "Review of printed reports for reasonableness before distribution",
                    "Access control": "User authentication required to access the application"
                },
                "Explanation": "Input validation checks data for accuracy and completeness before processing. Processing controls (e.g., control totals, limit checks) ensure data is processed correctly. Output controls verify that results are reasonable and complete before distribution. Access controls restrict who can use the application. Physical inventory counts are a general business control, not an application control.",
                "Topic": "Application controls vs IT general controls",
                "ItemID": "CBQ2-E1-Q4",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Application controls are specific to individual business applications and include input, processing, output, and access controls. They differ from IT general controls, which apply to the overall IT environment.",
                "BusinessInterpretation": "Strong application controls reduce the risk of material misstatements in financial data processed through business systems. Auditors test both ITGC and application controls to rely on automated controls.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Match each IT role to the correct segregation-of-duties conflict if the role is combined with others.",
                "LeftItems": [
                    "System administrator also performs user access reviews",
                    "Developer also moves code to production",
                    "IT operator also records changes in the change log",
                    "Database administrator also approves system access requests"
                ],
                "RightItems": [
    "The CFO could override system controls and approve their own transactions",
    "Access could be granted without independent approval, bypassing access controls",
    "Code could be deployed without independent testing or approval",
    "The administrator could grant excessive privileges and conceal the action during review",
    "Changes could be made without independent verification of completion"
],
                "Correct": {
                    "System administrator also performs user access reviews": "The administrator could grant excessive privileges and conceal the action during review",
                    "Developer also moves code to production": "Code could be deployed without independent testing or approval",
                    "IT operator also records changes in the change log": "Changes could be made without independent verification of completion",
                    "Database administrator also approves system access requests": "Access could be granted without independent approval, bypassing access controls"
                },
                "Explanation": "Segregation of duties in IT is critical: the person who administers systems should not review their own access changes. Developers should not have production migration rights. Operators should not self-approve their changes. Database administrators should not both request and approve access. These conflicts represent IT equivalent of the classic authorization-custody-recordkeeping segregation. The CFO scenario is not an IT role conflict.",
                "Topic": "IT segregation of duties",
                "ItemID": "CBQ2-E1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Segregation of duties applies to IT functions just as it does to financial functions. The person who authorizes, processes, and reviews IT changes should not be the same individual.",
                "BusinessInterpretation": "Inadequate IT segregation of duties was a contributing factor in several major financial reporting frauds. SOX compliance requires auditors to evaluate IT segregation as part of the control environment.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E1",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
        "CaseID": "CBQ2-E2",
        "Title": "Segregation of Duties and Internal Control Design",
        "SectionTags": [
            "E"
        ],
        "Pack": 2,
        "Section": "E",
        "BlueprintDomain": "Internal Controls",
        "BlueprintObjectives": [
            "Segregation of duties — authorization, custody, and recordkeeping",
            "Internal control design — preventive and detective controls",
            "COSO internal control framework components",
            "Fraud risk assessment in financial processes",
            "Control activity design and implementation"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Segregation of Duties and Internal Control Framework",
        "Subtopic": "Control environment and control activities",
        "SecondaryCompetencies": [
            "Analysis",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Internal audit",
        "CompanyName": "Atlas Distribution",
        "CompanyType": "Wholesale distributor",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 40,
        "ExhibitCount": 1,
        "Industry": "Wholesale distribution",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Identify segregation of duties conflicts in purchasing and cash disbursements",
            "Distinguish between preventive and detective controls",
            "Recognize the five COSO internal control framework components",
            "Identify fraud risk indicators in procurement processes",
            "Recommend control activities that address specific control weaknesses"
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
                "Summary": "Full content authoring — segregation of duties, control design, COSO framework, fraud risk, and control activities"
            }
        ],
        "Stakeholder": "Chief Audit Executive",
        "Tags": [
            "segregation of duties",
            "COSO",
            "internal controls",
            "fraud prevention",
            "control activities"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Atlas Distribution is a regional wholesale distributor of industrial supplies with 450 employees and annual revenue of $180 million. The company uses an enterprise resource planning (ERP) system for order-to-cash, procure-to-pay, and inventory management. During a routine audit, the internal audit team identified several control weaknesses in the purchasing and cash disbursements cycle. The CFO has requested a comprehensive review of segregation of duties and internal control design. The audit team must assess risks, identify gaps, and recommend controls aligned with the COSO framework.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Current Process: Purchasing and Cash Disbursements",
                "Headers": [
                    "Process Step",
                    "Performed By",
                    "Current Control",
                    "Issue"
                ],
                "Rows": [
                    [
                        "Purchase requisition",
                        "Department manager",
                        "Manual approval via email",
                        "No formal authorization limits or purchase order required"
                    ],
                    [
                        "Vendor selection",
                        "Purchasing agent",
                        "Three quotes required over $5,000",
                        "Same agent selects vendor and creates purchase order"
                    ],
                    [
                        "Goods receipt",
                        "Warehouse clerk",
                        "Paper receiving report",
                        "Receiving reports not reconciled to purchase orders"
                    ],
                    [
                        "Invoice processing",
                        "Accounts payable clerk",
                        "Three-way match (PO, receipt, invoice)",
                        "Clerk also processes payments and adjusts vendor records"
                    ],
                    [
                        "Check signing",
                        "Controller",
                        "Single signature required up to $50,000",
                        "No review of supporting documentation before signing"
                    ]
                ],
                "ExhibitID": "CBQ2-E2-E1",
                "CaseID": "CBQ2-E2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "multi",
                "Prompt": "An internal auditor is reviewing the segregation of duties in Atlas Distribution's purchasing and cash disbursements process (Exhibit 1). Select the process steps where inadequate segregation of duties creates a fraud risk. (Select all that apply.)",
                "Choices": [
                    "Department manager approves purchase requisition via email",
                    "Purchasing agent selects vendor and creates purchase order",
                    "Warehouse clerk completes paper receiving report",
                    "Accounts payable clerk performs three-way match and also processes payments and adjusts vendor records",
                    "Controller signs checks up to $50,000 without review of supporting documentation",
                    "Purchasing agent also approves credit memos from vendors"
                ],
                "Correct": [
                    "Accounts payable clerk performs three-way match and also processes payments and adjusts vendor records",
                    "Controller signs checks up to $50,000 without review of supporting documentation"
                ],
                "Explanation": "The accounts payable clerk combining three-way match, payment processing, and vendor record maintenance violates segregation of duties — the clerk could create a fictitious vendor, enter a fake invoice, match it to a receipt, process payment, and conceal the fraud by adjusting vendor records. The controller signing checks without reviewing support violates the authorization function — a check could be issued without evidence that goods were received or the invoice is valid. The department manager approving requisitions via email is a control weakness but not a segregation conflict. The purchasing agent selecting vendors and creating POs is a conflict but is common in small companies and partially mitigated by the three-quote requirement. The warehouse clerk completing receiving reports is a legitimate operational function with no incompatible combination. The agent approving credit memos is not part of the described process.",
                "Topic": "Segregation of duties — fraud risk identification",
                "ItemID": "CBQ2-E2-Q1",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Segregation of duties requires that authorization, custody of assets, and recordkeeping functions be performed by different individuals. COSO principle 10 states that control activities should include segregation of duties.",
                "BusinessInterpretation": "Combining incompatible duties in AP creates a high fraud risk. The three-way match is a detective control that loses its effectiveness when the same person can override or adjust records without independent review.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E2",
                "EstimatedMinutes": 7,
                "Pack": 2,
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
                "Prompt": "Atlas Distribution's audit team is designing preventive controls to address the weaknesses identified in Exhibit 1. Select the controls that are classified as PREVENTIVE controls. (Select all that apply.)",
                "Choices": [
                    "Require purchase orders for all purchases above $500 with automated approval routing based on dollar thresholds",
                    "Implement automated three-way match in the ERP system that blocks invoice payment unless PO and receipt match",
                    "Conduct monthly reconciliation of vendor statements to AP subledger",
                    "Require dual signatures on all checks above $10,000 with mandatory review of supporting documents",
                    "Perform quarterly audit of purchasing card transactions with random sampling",
                    "Restrict vendor record maintenance to a separate master data team outside of accounts payable"
                ],
                "Correct": [
                    "Require purchase orders for all purchases above $500 with automated approval routing based on dollar thresholds",
                    "Implement automated three-way match in the ERP system that blocks invoice payment unless PO and receipt match",
                    "Require dual signatures on all checks above $10,000 with mandatory review of supporting documents",
                    "Restrict vendor record maintenance to a separate master data team outside of accounts payable"
                ],
                "Explanation": "Preventive controls stop errors or fraud before they occur. Purchase order requirements prevent unauthorized purchases. Automated three-way match prevents payment without proper documentation. Dual signatures prevent unauthorized disbursements. Vendor record segregation prevents creation of fictitious vendors. Monthly reconciliations and quarterly audits are detective controls — they identify issues after the fact but do not prevent them.",
                "Topic": "Preventive vs detective controls",
                "ItemID": "CBQ2-E2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "COSO defines preventive controls as designed to avoid undesirable events. Detective controls identify undesirable events after they occur. An effective control system uses both types.",
                "BusinessInterpretation": "Preventive controls reduce fraud risk at the point of transaction, which is generally more cost-effective than detecting fraud after funds have left the organization. Management should prioritize preventive controls in high-risk areas like cash disbursements.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E2",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "According to the COSO Internal Control — Integrated Framework, which of the following are COMPONENTS of internal control? (Select all that apply.)",
                "Choices": [
                    "Control environment",
                    "Risk assessment",
                    "Profitability analysis",
                    "Information and communication",
                    "Control activities",
                    "Monitoring activities",
                    "Internal audit function"
                ],
                "Correct": [
                    "Control environment",
                    "Risk assessment",
                    "Information and communication",
                    "Control activities",
                    "Monitoring activities"
                ],
                "Explanation": "The COSO framework identifies five components of internal control: control environment, risk assessment, control activities, information and communication, and monitoring activities. Profitability analysis is a management reporting tool, not an internal control component. The internal audit function is an important governance function but is part of monitoring activities, not a separate component.",
                "Topic": "COSO internal control framework components",
                "ItemID": "CBQ2-E2-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "The COSO Internal Control — Integrated Framework identifies five components: control environment, risk assessment, control activities, information and communication, and monitoring activities. The 17 principles are organized under these five components.",
                "BusinessInterpretation": "Understanding COSO components is essential for auditors evaluating the design and effectiveness of internal controls. A weakness in any component can affect the overall control system.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E2",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "The internal audit team at Atlas Distribution is assessing fraud risk in the procurement process. Select the RED FLAGS that increase the risk of procurement fraud. (Select all that apply.)",
                "Choices": [
                    "A purchasing agent has held the same position for 10 years with no rotation",
                    "The same purchasing agent has the ability to create new vendor records in the system",
                    "Vendor invoices arrive electronically and are automatically entered into the AP system",
                    "One vendor has a significantly different address than all other vendors and the purchasing agent's home address",
                    "The company uses an approved vendor list that is reviewed annually",
                    "A purchasing agent frequently processes rush orders that bypass the three-quote requirement"
                ],
                "Correct": [
                    "The same purchasing agent has the ability to create new vendor records in the system",
                    "One vendor has a significantly different address than all other vendors and the purchasing agent's home address",
                    "A purchasing agent frequently processes rush orders that bypass the three-quote requirement"
                ],
                "Explanation": "A purchasing agent who can create vendor records could set up a fictitious vendor and approve purchases from it. A vendor address matching the agent's home address is a classic red flag for shell company fraud. Frequent rush orders bypassing controls indicate potential override of established procedures. Long tenure without rotation is a control weakness but not a direct red flag. Automated invoice entry and annual vendor list reviews are control strengths, not red flags.",
                "Topic": "Fraud risk indicators in procurement",
                "ItemID": "CBQ2-E2-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "AU-C 240 requires auditors to assess fraud risk factors including opportunities for management override of controls and unusual relationships with vendors.",
                "BusinessInterpretation": "Procurement fraud is one of the most common types of asset misappropriation. Red flags should trigger additional audit procedures such as vendor address verification and review of exception reports.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E2",
                "EstimatedMinutes": 6,
                "Pack": 2,
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
                "Prompt": "The audit team recommends implementing several new control activities. Select the activities that BEST address the weaknesses identified in Exhibit 1. (Select all that apply.)",
                "Choices": [
                    "Implement an automated purchase order system with approval routing based on dollar amount and department budget",
                    "Restrict vendor master maintenance to a separate team and require supporting documents for new vendor setup",
                    "Require the warehouse clerk to email receiving reports directly to the AP department",
                    "Segregate invoice processing from payment processing so the AP clerk cannot both match invoices and release payments",
                    "Require the controller to review a check register with supporting documentation before signing checks",
                    "Outsource the entire accounts payable function to a third-party provider"
                ],
                "Correct": [
                    "Implement an automated purchase order system with approval routing based on dollar amount and department budget",
                    "Restrict vendor master maintenance to a separate team and require supporting documents for new vendor setup",
                    "Segregate invoice processing from payment processing so the AP clerk cannot both match invoices and release payments",
                    "Require the controller to review a check register with supporting documentation before signing checks"
                ],
                "Explanation": "An automated PO system addresses the lack of formal authorization limits. Vendor master segregation prevents fictitious vendor setup. Segregating invoice processing from payment processing directly addresses the incompatible duty identified. Requiring the controller to review supporting documentation before signing addresses the current practice of signing without review. Emailing receiving reports adds no control benefit and outsourcing is a strategic decision beyond the scope of the identified weaknesses.",
                "Topic": "Control activity design and implementation",
                "ItemID": "CBQ2-E2-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "Control activities selected should directly address identified risks. COSO principle 11 requires that general control activities be designed and implemented to achieve objectives and respond to risks.",
                "BusinessInterpretation": "The recommended controls address specific control weaknesses identified in the audit. Implementation should be prioritized based on risk severity and cost-benefit analysis.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-E2",
                "EstimatedMinutes": 7,
                "Pack": 2,
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
        "CaseID": "CBQ2-F1",
        "Title": "Data Analytics Maturity",
        "SectionTags": [
            "F"
        ],
        "Pack": 2,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Data analytics maturity levels",
            "Data governance for analytics readiness"
        ],
        "PrimaryCompetency": "Judgment",
        "Topic": "Data analytics maturity",
        "Subtopic": "Data analytics classification",
        "SecondaryCompetencies": [],
        "Author": "Case Author",
        "BusinessFunction": "Technology and analytics",
        "CompanyName": "Meridian Retail Group",
        "CompanyType": "Technology provider",
        "Confidence": 100,
        "CreatedDate": "2026-07-20",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 34,
        "ExhibitCount": 1,
        "Industry": "Technology",
        "LastValidated": "2026-07-20",
        "LearningObjectives": [
            "Classify a data analytics practice by maturity level",
            "Distinguish descriptive from diagnostic analytics",
            "Recognize predictive analytics applications",
            "Evaluate data governance prerequisites for analytics readiness",
            "Identify prescriptive analytics applications"
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
        "Stakeholder": "Chief Data Officer",
        "Tags": [
            "data analytics",
            "analytics maturity",
            "descriptive analytics",
            "predictive analytics",
            "prescriptive analytics",
            "data governance"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "Meridian Retail Group operates 85 department stores across the Midwest with annual revenue of $420 million. The company recently hired a Chief Data Officer (CDO) to build an enterprise analytics capability. Currently, the finance team produces monthly sales reports in Excel using historical data, while the marketing team conducts simple campaign analysis. The CDO has proposed a three-phase analytics maturity roadmap. The board has asked for an assessment of current maturity and a plan to advance toward predictive and prescriptive analytics capabilities. The CDO has prepared a summary of current analytics practices across departments.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Current Analytics Practices by Department",
                "Headers": [
                    "Department",
                    "Analytics Type Used",
                    "Data Sources",
                    "Decision Support"
                ],
                "Rows": [
                    [
                        "Finance",
                        "Descriptive",
                        "Historical sales, GL",
                        "Monthly variance reports, budget vs actual"
                    ],
                    [
                        "Marketing",
                        "Descriptive / Diagnostic",
                        "Customer surveys, web traffic",
                        "Campaign ROI analysis, customer segmentation"
                    ],
                    [
                        "Supply Chain",
                        "Descriptive",
                        "Inventory levels, supplier lead times",
                        "Reorder point calculations, stockout reports"
                    ],
                    [
                        "Store Operations",
                        "Descriptive",
                        "POS data, labor schedules",
                        "Sales per square foot, labor cost percentage"
                    ]
                ],
                "ExhibitID": "CBQ2-F1-E1",
                "CaseID": "CBQ2-F1",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "select",
                "Prompt": "Based on the scenario, which level of analytics maturity best describes Meridian Retail Group's current state?",
                "Correct": "Descriptive analytics — reporting on historical performance",
                "Choices": [
                    "Descriptive analytics — reporting on historical performance",
                    "Diagnostic analytics — analyzing why something happened",
                    "Predictive analytics — forecasting future outcomes",
                    "Prescriptive analytics — recommending optimal actions",
                    "Cognitive analytics — autonomous decision-making by AI"
                ],
                "Explanation": "Meridian currently uses historical sales data for monthly variance reports and budget comparisons, which is descriptive analytics — answering \"what happened?\" Descriptive analytics summarizes past data to identify trends. Diagnostic analytics would answer \"why did it happen?\" through root cause analysis. Predictive analytics uses models to forecast what might happen. Prescriptive analytics recommends actions. Cognitive analytics involves AI-driven autonomous decisions. The company is not yet performing diagnostic analysis, as no root cause investigation or cause-effect analysis is described.",
                "Topic": "Analytics maturity levels",
                "ItemID": "CBQ2-F1-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Descriptive analytics forms the foundation of management reporting. The IMA Statement of Ethical Professional Practice emphasizes that management accountants should provide accurate and clear information, which begins with descriptive reporting.",
                "BusinessInterpretation": "Before a company can advance to predictive or prescriptive analytics, it must have a strong descriptive analytics foundation with clean, reliable data. Meridian's current Excel-based reporting is typical of organizations at Level 1 of the analytics maturity model.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "The CDO proposes implementing a dashboard that shows real-time sales by region, inventory turnover, and customer foot traffic. What type of analytics does this dashboard primarily enable?",
                "Correct": "Diagnostic analytics — the dashboard allows drill-down to understand performance drivers",
                "Choices": [
                    "Diagnostic analytics — the dashboard allows drill-down to understand performance drivers",
                    "Descriptive analytics — the dashboard simply displays historical data",
                    "Predictive analytics — the dashboard forecasts future sales trends",
                    "Prescriptive analytics — the dashboard recommends inventory reorder quantities",
                    "Operational analytics — the dashboard automates routine business decisions"
                ],
                "Explanation": "Real-time dashboards with drill-down capability enable diagnostic analytics, which answers \"why did it happen?\" Users can identify patterns, correlations, and root causes. While dashboards can display descriptive information (what happened), the real-time drill-down feature distinguishes it as diagnostic analytics by allowing users to explore underlying drivers. Predictive analytics would require statistical models or machine learning. Prescriptive analytics would require optimization algorithms that recommend specific actions. The term \"operational analytics\" is not a standard analytics maturity level.",
                "Topic": "Diagnostic analytics",
                "ItemID": "CBQ2-F1-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The COSO framework's information and communication component requires that relevant information be identified, captured, and communicated in a form and timeframe that enables management to make informed decisions.",
                "BusinessInterpretation": "Diagnostic analytics dashboards bridge the gap between descriptive reporting and predictive modeling. They are essential for identifying performance drivers and operational issues before they escalate.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "For the next phase of the analytics roadmap, the CDO wants to use historical sales data and external economic indicators to forecast next quarter's revenue. What type of analytics is being described?",
                "Correct": "Predictive analytics — using historical data and models to forecast future outcomes",
                "Choices": [
                    "Predictive analytics — using historical data and models to forecast future outcomes",
                    "Descriptive analytics — summarizing historical sales data in reports",
                    "Diagnostic analytics — analyzing why sales changed last quarter",
                    "Prescriptive analytics — determining the optimal pricing strategy",
                    "Confirmation analytics — validating existing business hypotheses"
                ],
                "Explanation": "Predictive analytics uses historical data, statistical models, and machine learning to forecast future events. The scenario explicitly describes forecasting next quarter's revenue, which is the defining characteristic of predictive analytics. Descriptive analytics only summarizes past data without forecasting. Diagnostic analytics explains past events. Prescriptive analytics suggests actions to achieve desired outcomes. \"Confirmation analytics\" is not a recognized analytics category in the standard maturity model.",
                "Topic": "Predictive analytics",
                "ItemID": "CBQ2-F1-Q3",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Management accountants increasingly use predictive analytics for budgeting and forecasting. The IMA's Management Accounting Competency Framework identifies data analytics and modeling as a key competency area.",
                "BusinessInterpretation": "Predictive analytics improves forecast accuracy by incorporating leading indicators and external data. Organizations with mature analytics capabilities can reduce forecasting error and respond faster to market changes.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F1",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "The supply chain team wants a tool that recommends optimal inventory reorder quantities and identifies the most cost-effective shipping routes. The tool should consider demand forecasts, supplier lead times, and freight rates. What type of analytics is required?",
                "Correct": "Prescriptive analytics — recommending optimal actions based on multiple variables and constraints",
                "Choices": [
                    "Prescriptive analytics — recommending optimal actions based on multiple variables and constraints",
                    "Descriptive analytics — reporting current inventory levels and shipping costs",
                    "Predictive analytics — forecasting when stockouts will occur",
                    "Diagnostic analytics — explaining why shipping costs increased",
                    "Automated analytics — replacing the supply chain team with AI"
                ],
                "Explanation": "Prescriptive analytics goes beyond predicting what will happen to recommend specific actions that optimize outcomes given defined constraints. The scenario requires optimizing inventory and shipping decisions using multiple variables, which is the hallmark of prescriptive analytics. Descriptive analytics would only report current status. Predictive analytics would forecast stockouts but wouldn't recommend order quantities. Diagnostic analytics would explain past variances. \"Automated analytics\" is not a standard category.",
                "Topic": "Prescriptive analytics",
                "ItemID": "CBQ2-F1-Q4",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "Prescriptive analytics supports the management function of decision-making by identifying optimal resource allocation. It aligns with cost-benefit analysis and constraint-based optimization taught in CMA curriculum.",
                "BusinessInterpretation": "Prescriptive analytics represents the highest maturity level and requires significant investment in data infrastructure, modeling expertise, and cross-functional data integration. Most organizations achieve this capability only after mastering descriptive and predictive analytics.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Before Meridian can advance its analytics maturity, it must address several data challenges. Which of the following is the MOST critical prerequisite for successful analytics implementation?",
                "Correct": "Establishing data governance policies to ensure data quality, consistency, and accessibility across departments",
                "Choices": [
                    "Establishing data governance policies to ensure data quality, consistency, and accessibility across departments",
                    "Purchasing the most advanced analytics software platform available",
                    "Hiring a team of data scientists with PhDs in machine learning",
                    "Creating a centralized data warehouse that consolidates all departmental data",
                    "Outsourcing all analytics functions to a third-party consulting firm"
                ],
                "Explanation": "Data governance is the foundational prerequisite for analytics maturity. Without consistent data definitions, quality standards, and access policies, analytics outputs are unreliable regardless of the tools or talent employed. While a data warehouse and skilled data scientists are valuable, they are less critical than governance. Purchasing advanced software without governance leads to \"garbage in, garbage out.\" Outsourcing bypasses the internal capability-building needed for sustainable analytics maturity.",
                "Topic": "Data governance and analytics readiness",
                "ItemID": "CBQ2-F1-Q5",
                "CognitiveLevel": "Evaluate",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "High",
                "DifficultyDrivers": [
                    "JudgmentRequired"
                ],
                "AccountingPrinciple": "The COSO principle of reliable data and information applies directly to analytics. Management accountants must ensure that data used for decision-making is accurate, complete, and timely — all governed by data governance policies.",
                "BusinessInterpretation": "Organizations that invest in analytics without first establishing data governance often struggle with inconsistent metrics, lack of trust in data, and failed analytics initiatives. Governance is the foundation upon which all analytics capabilities are built.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F1",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
        "CaseID": "CBQ2-F2",
        "Title": "Data Governance and Lifecycle Management",
        "SectionTags": [
            "F"
        ],
        "Pack": 2,
        "Section": "F",
        "BlueprintDomain": "Technology and Analytics",
        "BlueprintObjectives": [
            "Data governance framework and principles",
            "Data lifecycle management",
            "Data quality dimensions and controls",
            "Master data management",
            "Data privacy and regulatory compliance"
        ],
        "PrimaryCompetency": "Conceptual",
        "Topic": "Data Governance and Lifecycle Management",
        "Subtopic": "Data management, data quality, and governance frameworks",
        "SecondaryCompetencies": [
            "Analysis",
            "Judgment"
        ],
        "Author": "Case Author",
        "BusinessFunction": "Data governance and compliance",
        "CompanyName": "HealthPlus Insurance",
        "CompanyType": "Health insurance provider",
        "Confidence": 100,
        "CreatedDate": "2026-07-21",
        "Dependencies": [],
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "EstimatedMinutes": 33,
        "ExhibitCount": 1,
        "Industry": "Insurance",
        "LastValidated": "2026-07-21",
        "LearningObjectives": [
            "Identify data lifecycle stages and their governance requirements",
            "Recognize data quality dimensions and their business impact",
            "Apply data governance principles to regulatory compliance scenarios",
            "Evaluate data management controls for completeness and accuracy",
            "Distinguish between master data, transactional data, and metadata"
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
                "Summary": "Full content authoring — data governance, data lifecycle, data quality, and regulatory compliance"
            }
        ],
        "Stakeholder": "Chief Data Officer",
        "Tags": [
            "data governance",
            "data lifecycle",
            "data quality",
            "data privacy",
            "master data management",
            "metadata"
        ],
        "ValidationVersion": "2.0",
        "Version": "2.0",
        "ScenarioText": "HealthPlus Insurance is a regional health insurer with 1.2 million members and annual premium revenue of $3.8 billion. The company processes over 15 million claims annually through its core claims administration system. Recent regulatory audits revealed data quality issues that led to incorrect provider payments and compliance reporting errors. The newly appointed Chief Data Officer (CDO) is implementing a comprehensive data governance program. The data governance team has documented the current data management practices and identified gaps in data lifecycle governance, data quality controls, and regulatory compliance.",
        "Exhibits": [
            {
                "Type": "table",
                "Title": "Exhibit 1 — Current Data Management Practices Assessment",
                "Headers": [
                    "Data Lifecycle Stage",
                    "Current Practice",
                    "Issue Identified"
                ],
                "Rows": [
                    [
                        "Data creation / acquisition",
                        "Member enrollment data entered by call center; provider contracts scanned as PDF",
                        "No standardized data entry validation; duplicate member records estimated at 4%"
                    ],
                    [
                        "Data storage and maintenance",
                        "Claims data stored in legacy system; provider data in separate CRM",
                        "No master data management; provider and member data fragmented across 3 systems"
                    ],
                    [
                        "Data usage",
                        "Claims processors access member and provider data daily; analytics team runs ad hoc queries",
                        "No data usage tracking; analysts use different definitions for \"active member\""
                    ],
                    [
                        "Data archiving",
                        "Claims older than 7 years stored on tape backup",
                        "No consistent retention policy; some data purged prematurely"
                    ],
                    [
                        "Data disposal",
                        "Paper records shredded by third-party vendor",
                        "No certification of destruction; e-waste disposal unmonitored"
                    ]
                ],
                "ExhibitID": "CBQ2-F2-E1",
                "CaseID": "CBQ2-F2",
                "ValidationVersion": "2.0",
                "ReferencedBy": []
            }
        ],
        "Items": [
            {
                "Type": "fill",
                "Prompt": "Enter the term for the data management practice that ensures consistent, accurate, and uniform data across the enterprise by creating a single source of truth for critical business entities such as members and providers.",
                "Correct": "Master data management",
                "Explanation": "Master data management (MDM) is the practice of creating a single, consistent, and authoritative source of truth for core business entities such as customers, members, providers, and products. The scenario describes fragmented member and provider data across three systems, which is exactly the problem MDM addresses. Data governance establishes overall policies but MDM specifically enables consistency of master data entities.",
                "Topic": "Master data management",
                "ItemID": "CBQ2-F2-Q1",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Master data management supports the COSO principle that reliable data is essential for effective internal control. Consistent master data (vendors, customers, employees) is critical for financial reporting accuracy.",
                "BusinessInterpretation": "Organizations with fragmented master data across systems face increased risk of duplicate payments, incorrect reporting, and operational inefficiencies. MDM implementation is a foundational step in any data governance program.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Enter the data quality dimension that is violated when different departments use different definitions for \"active member,\" leading to inconsistent analytics results.",
                "Correct": "Consistency",
                "Explanation": "Consistency is the data quality dimension that requires data values to be the same across systems and according to common definitions. When different departments use different definitions for the same concept, data consistency is violated. Accuracy refers to whether data correctly reflects reality. Completeness measures whether all required data is present. Timeliness measures whether data is current. The core issue here is definitional inconsistency.",
                "Topic": "Data quality dimensions",
                "ItemID": "CBQ2-F2-Q2",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The FASB's qualitative characteristics of accounting information include consistency and comparability. Similarly, data quality frameworks require consistency across systems and time periods for reliable management reporting.",
                "BusinessInterpretation": "Inconsistent data definitions are one of the most common data quality issues in healthcare organizations and lead to unreliable KPIs, regulatory reporting errors, and management mistrust of analytics.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
                "Prompt": "Enter the term for the data that describes the structure, context, and meaning of other data — for example, the definition of \"claim status\" field, its data type, and allowable values.",
                "Correct": "Metadata",
                "Explanation": "Metadata is \"data about data\" that describes the structure, context, meaning, and lineage of data. Examples include field definitions, data types, allowable values, and business rules. Metadata management is a critical component of data governance because it enables users to understand what data means and how to use it consistently. Master data refers to core business entities. Transactional data records business events. Reference data is a subset of metadata defining allowable values.",
                "Topic": "Metadata management",
                "ItemID": "CBQ2-F2-Q3",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "Management accountants rely on metadata to ensure consistent application of accounting policies across reporting periods. The SEC's XBRL taxonomy is essentially a metadata standard for financial reporting.",
                "BusinessInterpretation": "Without proper metadata management, organizations struggle with data lineage tracing, impact analysis, and regulatory compliance. Metadata catalogs are a key enabler of self-service analytics.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F2",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "Enter the regulatory framework acronym that requires HealthPlus to protect member health information, including implementing data access controls, encryption, and breach notification procedures.",
                "Correct": "HIPAA",
                "Explanation": "HIPAA (Health Insurance Portability and Accountability Act) establishes national standards for protecting individuals' medical records and health information. It requires covered entities like HealthPlus to implement administrative, physical, and technical safeguards for protected health information (PHI). While other regulations may also apply (such as state privacy laws), HIPAA is the primary federal regulation governing health insurers' data privacy obligations.",
                "Topic": "Data privacy and regulatory compliance",
                "ItemID": "CBQ2-F2-Q4",
                "CognitiveLevel": "Understand",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Short",
                "DecisionComplexity": "Low",
                "DifficultyDrivers": [
                    "Terminology"
                ],
                "AccountingPrinciple": "SOX requires public companies to maintain internal controls over financial reporting, including controls over data integrity. HIPAA adds additional privacy and security requirements for healthcare entities.",
                "BusinessInterpretation": "Regulatory compliance is a key driver of data governance programs in the healthcare industry. Non-compliance can result in significant penalties, reputational damage, and loss of member trust.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F2",
                "EstimatedMinutes": 4,
                "Pack": 2,
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
                "Prompt": "Enter the term for the data lifecycle stage in which HealthPlus should implement a formal data retention schedule that specifies how long different types of data must be kept based on regulatory, legal, and business requirements.",
                "Correct": "Data archiving",
                "Explanation": "Data archiving is the lifecycle stage where data is moved from primary production systems to long-term storage according to a defined retention schedule. The scenario notes that HealthPlus lacks a consistent retention policy, with some data being purged prematurely. Data archiving ensures compliance with legal and regulatory requirements for data retention. Data storage focuses on maintaining current operational data. Data disposal is the final stage of secure data destruction after the retention period expires.",
                "Topic": "Data lifecycle management",
                "ItemID": "CBQ2-F2-Q5",
                "CognitiveLevel": "Analyze",
                "CalculationComplexity": "None",
                "ReadingComplexity": "Moderate",
                "DecisionComplexity": "Medium",
                "DifficultyDrivers": [
                    "Terminology",
                    "DistractorSimilarity"
                ],
                "AccountingPrinciple": "The Sarbanes-Oxley Act (SOX) requires public companies to retain audit-related records for 7 years. Data archiving policies must incorporate these and other regulatory retention requirements to ensure compliance.",
                "BusinessInterpretation": "A formal data retention and archiving policy reduces legal risk, ensures regulatory compliance, and controls storage costs. Many organizations discover they lack clear archiving policies during regulatory audits.",
                "CalculationRequired": false,
                "CaseID": "CBQ2-F2",
                "EstimatedMinutes": 5,
                "Pack": 2,
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
];

if (typeof module === 'object' && module.exports) module.exports = ENHANCED_CASE_BASE2;

function cloneEnhancedCase2(c, packLabel, index) {
  return {
    ...c,
    CaseID: `${c.CaseID}-${packLabel}`,
    Title: `${c.Title} (${packLabel} simulation)`,
    ScenarioText: `${c.ScenarioText} This is Pack ${packLabel}, case ${index + 1}; use all exhibits before answering.`
  };
}

const ENHANCED_CASE_BANK2_A = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'A', i));
const ENHANCED_CASE_BANK2_B = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'B', i));
const ENHANCED_CASE_BANK2_C = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'C', i));
const ENHANCED_CASE_BANK2_D = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'D', i));
const ENHANCED_CASE_BANK2_E = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'E', i));
const ENHANCED_CASE_BANK2_F = ENHANCED_CASE_BASE2.map((c, i) => cloneEnhancedCase2(c, 'F', i));


// === MIGRATED STANDARD CASES (Session 60) ===
const MIGRATED_CASE_BASE_B = [
  {
    "CaseID": "CASE-B12",
    "Title": "Financial Reporting Analysis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "External Financial Reporting Decisions",
    "EstimatedMinutes": 30,
    "ScenarioText": "Alpine Manufacturing is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section A, External Financial Reporting Decisions. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Alpine Manufacturing sold goods on December 28, 2026, with terms FOB shipping point. Goods left the shipping dock on December 29 and arrived January 3. Alpine's fiscal year ends December 31. When should Alpine recognize revenue?",
        "Choices": [
          "December 28, when the sales order was entered",
          "December 31, when Alpine closes its books",
          "January 3, when the goods arrive at the customer",
          "December 29, when control and risk of loss transfer to the buyer"
        ],
        "Correct": "December 29, when control and risk of loss transfer to the buyer",
        "Explanation": "Under ASC 606 / IFRS 15, revenue is recognized when control transfers to the customer. For FOB shipping point terms, control transfers when goods are shipped—on December 29. Option A (December 28) is incorrect because the order-entry date is not the transfer-of-control event. Option B (December 31) incorrectly uses the fiscal-year-end date, which does not determine revenue recognition timing. Option C (January 3) reflects FOB destination treatment, where control transfers on arrival rather than shipment.",
        "Topic": "Revenue recognition",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B12-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Alpine Manufacturing has a building with carrying amount of $820,000 and fair value of $610,000. The building generates cash flows from continuing use. How should Alpine account for this under IFRS?",
        "Choices": [
          "Write the building up to fair value",
          "Ignore the decline because market fluctuations are temporary",
          "Perform an impairment test; if recoverable amount is below carrying amount, recognize an impairment loss",
          "Amortize the difference over 10 years"
        ],
        "Correct": "Perform an impairment test; if recoverable amount is below carrying amount, recognize an impairment loss",
        "Explanation": "Under IAS 36 (Impairment of Assets), an asset is impaired when its carrying amount exceeds its recoverable amount. The recoverable amount is the higher of fair value less costs to sell and value in use. Since the building's carrying amount ($820,000) exceeds its fair value ($610,000), Alpine must perform an impairment test. Option A (write up to fair value) is incorrect—IFRS does not permit upward revaluation for assets already impaired unless the asset is carried under the revaluation model. Option B (ignore the decline) is incorrect because a significant fair value decline is an impairment indicator requiring testing. Option D (amortize the difference) is incorrect—impairment losses are recognized immediately, not amortized over time.",
        "Topic": "Asset impairment",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B12-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Alpine Manufacturing issued $500,000 of 10-year bonds at 96 on January 1, 2026. Alpine uses straight-line amortization. Stated coupon rate is 8%. What is annual interest expense?",
        "Choices": [
          "$42,000",
          "$48,000",
          "$38,000",
          "$40,000"
        ],
        "Correct": "$42,000",
        "Explanation": "Under U.S. GAAP, bond interest expense includes both the contractual cash interest payment and the amortization of any discount or premium. Cash interest = $500,000 × 8% = $40,000. The bond was issued at 96, generating a discount of $500,000 − $480,000 = $20,000. Straight-line amortization = $20,000 / 10 = $2,000. Total annual interest expense = $40,000 + $2,000 = $42,000. Option B ($48,000) incorrectly uses an inflated amortization amount. Option C ($38,000) subtracts the amortization instead of adding it. Option D ($40,000) reflects only the stated cash interest, omitting discount amortization entirely — this is the cash outflow, not the expense under accrual accounting.",
        "Topic": "Long-term liabilities",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B12-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Alpine Manufacturing purchased equipment for $240,000 with an estimated 8-year useful life and residual value of $24,000 using straight-line depreciation. After 3 years, the useful life was revised to 10 total years with residual value of $18,000. What is the annual depreciation in year 4?",
        "Choices": [
          "$22,200",
          "$27,000",
          "$19,286",
          "$20,143"
        ],
        "Correct": "$20,143",
        "Explanation": "Under U.S. GAAP (ASC 360), a change in accounting estimate (such as a revision to useful life or residual value) is applied prospectively: the current book value is depreciated over the remaining useful life using the new estimates. Book value at year 3: $240,000 − [($240,000 − $24,000) / 8 × 3] = $240,000 − $81,000 = $159,000. Remaining life after revision to 10 total years: 10 − 3 = 7 years. Revised annual depreciation = ($159,000 − $18,000) / 7 = $141,000 / 7 = $20,143 (independently recomputed 2026-07-25). Option A ($22,200) results from dividing the original cost minus new residual over the new total life without considering accumulated depreciation: ($240,000 − $18,000) / 10. Option B ($27,000) uses the original annual depreciation of ($240,000 − $24,000) / 8 without any revision. Option C ($19,286) uses the original residual value instead of the revised residual: ($159,000 − $24,000) / 7 = $19,286. The prior stored value of $21,750 was an arithmetic error in the authoring template.",
        "Topic": "Fixed assets and depreciation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B12-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Alpine Manufacturing sold a piece of equipment and wants to classify the proceeds on the statement of cash flows under IFRS. Which classification is correct?",
        "Choices": [
          "Investing activity",
          "Financing activity",
          "Operating activity",
          "Financing or operating at the entity's election"
        ],
        "Correct": "Investing activity",
        "Explanation": "Under both IFRS (IAS 7) and U.S. GAAP (ASC 230), proceeds from the sale of property, plant, and equipment are classified as investing activities because they represent the disposal of long-term assets. Option B (financing activity) is incorrect—financing activities involve changes in equity and borrowings, such as issuing stock or bonds. Option C (operating activity) is incorrect—operating activities relate to the principal revenue-producing activities of the entity, not asset disposals. Option D (financing or operating at the entity's election) is incorrect—classification of PPE sale proceeds is not elective under either IFRS or U.S. GAAP.",
        "Topic": "Statement of cash flows",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B12-Q5"
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
    "CaseID": "CASE-B13",
    "Title": "Budgeting and Forecasting Review",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Planning, Budgeting, and Forecasting",
    "EstimatedMinutes": 30,
    "ScenarioText": "Bridgeport Industries is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section B, Planning, Budgeting, and Forecasting. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Bridgeport Industries prepares a 12-quarter rolling budget by adding a new quarter as each quarter ends. Which term describes this approach?",
        "Choices": [
          "Kaizen budget",
          "Continuous budget",
          "Static budget",
          "Flexible budget"
        ],
        "Correct": "Continuous budget",
        "Explanation": "A continuous (rolling) budget is updated by adding a new period as the current period ends, maintaining a constant planning horizon — for example, a 12-quarter budget that adds Q13 when Q1 concludes. Option A (kaizen budget) is incorrect — kaizen budgeting incorporates continuous improvement targets into the budget, not rolling time horizons. Option C (static budget) is prepared for a single level of activity and is not updated throughout the period. Option D (flexible budget) adjusts for actual activity levels but does not add new future periods.",
        "Topic": "Budgeting concepts",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B13-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Bridgeport Industries expects sales of 54,000 units. Desired ending FG inventory is 6,500 units and beginning FG inventory is 4,200 units. Each unit requires 3 lb of direct material. Desired ending DM inventory is 8,000 lb and beginning DM inventory is 5,600 lb. How many pounds of direct material must be purchased?",
        "Choices": [
          "171,300 lb",
          "168,900 lb",
          "162,000 lb",
          "173,700 lb"
        ],
        "Correct": "171,300 lb",
        "Explanation": "Bridgeport Industries' direct materials purchases require a two-step calculation consistent with the master budget sequence. Step 1 — Required production: 54,000 budgeted sales + 6,500 desired ending FG − 4,200 beginning FG = 56,300 units. Step 2 — Material purchases: (56,300 units × 3 lb) = 168,900 lb needed for production, plus 8,000 lb desired ending DM, minus 5,600 lb beginning DM = 171,300 lb. Option B (168,900 lb) reflects only the production requirement without the ending inventory adjustment — stopping after the first step is a common error. Option C (162,000 lb) uses only sales units × 3 lb, ignoring inventory adjustments entirely. Option D (173,700 lb) misapplies the beginning DM balance.",
        "Topic": "Production and materials budgets",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B13-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Bridgeport Industries has beginning cash of $34,000, expects cash receipts of $412,000 and disbursements of $398,000. Minimum ending cash is $30,000. Borrowings are in $1,000 increments. What is the ending cash balance after any necessary borrowing?",
        "Choices": [
          "$18,000",
          "$30,000",
          "$48,000",
          "$78,000"
        ],
        "Correct": "$48,000",
        "Explanation": "Bridgeport Industries' cash budget follows standard cash forecasting methodology. Cash available before financing = beginning cash $34,000 + receipts $412,000 − disbursements $398,000 = $48,000. Since $48,000 already exceeds the required $30,000 minimum by $18,000, no borrowing is triggered. Option A ($18,000) incorrectly computes the shortfall from the minimum instead of the available cash. Option B ($30,000) incorrectly selects the minimum cash balance requirement rather than the computed ending cash balance. Bridgeport must maintain a minimum of $30,000, but the ending cash balance after all receipts and disbursements is $48,000 — the minimum is a constraint that only triggers borrowing when the computed balance falls below it. Option D ($78,000) appears to add borrowing to cover an incorrectly computed deficit. For Bridgeport's treasury, the controller can report that projected cash flows are self-funding this period with no need to draw on any credit facility.",
        "Topic": "Cash budgeting",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B13-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Bridgeport Industries uses regression to forecast overhead: y = $18,400 + $22.50x, where x is machine hours. The relevant range is 3,000 to 7,000 hours. If 5,200 hours are budgeted, what is forecast overhead?",
        "Choices": [
          "$175,500",
          "$135,400",
          "$40,900",
          "$117,000"
        ],
        "Correct": "$135,400",
        "Explanation": "Under managerial accounting cost estimation principles, regression analysis separates total cost into fixed and variable components using the formula y = a + bx, where a is the fixed cost and b is the variable rate per unit. For Bridgeport, y = $18,400 + ($22.50 × 5,200 machine hours) = $18,400 + $117,000 = $135,400. The forecast is valid because 5,200 hours falls within the stated relevant range of 3,000 to 7,000 hours — regression-based forecasts are only reliable within the range of observed activity and should not be extrapolated beyond it. $117,000 captures only the variable component ($22.50 × 5,200), incorrectly omitting the $18,400 fixed cost — a common error when candidates treat total cost as purely variable. $175,500 likely reflects applying an incorrect variable rate or misreading the regression coefficients. $40,900 appears to result from an arithmetic misapplication of the formula, possibly using an incorrect activity level.",
        "Topic": "Forecasting techniques",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B13-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Bridgeport Industries is comparing top-down and participative budgeting. Which best describes a key trade-off?",
        "Choices": [
          "Top-down budgeting eliminates all variance",
          "Top-down budgets can be faster but may lack buy-in; participative budgets improve motivation but may introduce slack",
          "Participative budgeting is prohibited under the IMA Statement of Ethical Professional Practice",
          "Participative budgets always produce more accurate forecasts than top-down budgets"
        ],
        "Correct": "Top-down budgets can be faster but may lack buy-in; participative budgets improve motivation but may introduce slack",
        "Explanation": "Under standard budgeting principles and behavioral management accounting theory, the choice between top-down (authoritative) and participative (bottom-up) budgeting involves a well-established trade-off. Top-down budgets are set by senior management and can be developed quickly with alignment to strategic goals, but because lower-level managers and employees have no input, they may lack commitment to the targets. Participative budgets involve those responsible for achieving the budget in the setting process, which improves motivation, ownership, and information quality — but creates the risk of budgetary slack, where managers intentionally understate revenue or overstate costs to make targets easier to achieve. \"Top-down budgeting eliminates all variance\" is incorrect because variances arise from operational factors regardless of budget-setting method. \"Participative budgeting is prohibited under the IMA Statement of Ethical Professional Practice\" is false — the Statement addresses competence, confidentiality, integrity, and credibility, and participative budgeting is not prohibited. \"Participative budgets always produce more accurate forecasts\" overstates the case — accuracy depends on the quality of input, not the process alone.",
        "Topic": "Budget behavior",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B13-Q5"
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
    "CaseID": "CASE-B14",
    "Title": "Performance Management Review",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Performance Management",
    "EstimatedMinutes": 30,
    "ScenarioText": "Coastal Distribution is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section C, Performance Management. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Coastal Distribution paid direct labor $449,820 for 34,200 hours worked. Standard rate is $13.50 per hour. What is the labor rate variance?",
        "Choices": [
          "$11,880 unfavorable",
          "$11,880 favorable",
          "$34,200 unfavorable",
          "$449,820 unfavorable"
        ],
        "Correct": "$11,880 favorable",
        "Explanation": "Under standard costing and variance analysis principles, the labor rate variance isolates the effect of paying a different rate per hour than the standard. The formula is: Labor Rate Variance = Actual Hours × (Actual Rate − Standard Rate). Coastal paid $449,820 for 34,200 hours, yielding an actual rate of $449,820 ÷ 34,200 = $13.15 per hour. The variance = 34,200 × ($13.15 − $13.50) = 34,200 × (−$0.35) = −$11,880. Because the actual rate ($13.15) is less than the standard rate ($13.50), Coastal spent less than expected per hour, making the variance favorable. A favorable labor rate variance may result from using less experienced (lower-paid) workers, which could have offsetting efficiency consequences. $11,880 unfavorable reverses the sign — failing to recognize that actual below standard produces a favorable variance. $34,200 represents the actual hours rather than a dollar variance, confusing unit count with cost impact. $449,820 is the total actual direct labor cost, not the isolated rate effect.",
        "Topic": "Labor variances",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B14-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Coastal Distribution budgeted 10,000 machine hours for maintenance cost of $215,000. Actual hours were 10,850 and actual maintenance cost was $229,000. The flexible budget formula is $65,000 fixed plus $15 per machine hour. What is the flexible-budget variance?",
        "Choices": [
          "$1,250 favorable",
          "$1,250 unfavorable",
          "$14,000 favorable",
          "$14,000 unfavorable"
        ],
        "Correct": "$1,250 unfavorable",
        "Explanation": "Under flexible budgeting principles, the flexible-budget variance compares actual results to what the budget should have been at the actual activity level — isolating whether spending was controlled, not whether volume differed. Coastal's flexible budget at 10,850 actual machine hours = $65,000 fixed + ($15 × 10,850) = $65,000 + $162,750 = $227,750. Actual maintenance cost was $229,000, so the flexible-budget variance = $229,000 − $227,750 = $1,250 unfavorable, meaning Coastal spent $1,250 more than the flexible budget allowed for the actual hours worked. $1,250 favorable reverses the sign, a common error when candidates subtract actual from budget instead of budget from actual. $14,000 favorable and $14,000 unfavorable both compare actual ($229,000) to the static master budget ($215,000) — this is the static-budget variance, not the flexible-budget variance. The static budget is based on the original 10,000 hours and does not adjust for the higher activity level.",
        "Topic": "Flexible budget variance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B14-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Coastal Distribution budgeted sales of 22,000 units at $44 contribution margin per unit. Actual sales were 23,100 units. What is the sales volume variance?",
        "Choices": [
          "$23,100 favorable",
          "$48,400 favorable",
          "$48,400 unfavorable",
          "$44,000 favorable"
        ],
        "Correct": "$48,400 favorable",
        "Explanation": "Under standard costing and contribution margin analysis, the sales volume variance measures the effect of selling a different quantity than budgeted, valued at the standard contribution margin per unit. This isolates the volume effect from the selling price effect. Sales Volume Variance = Standard Contribution Margin per Unit × (Actual Units Sold − Budgeted Units Sold). For Coastal: $44 × (23,100 − 22,000) = $44 × 1,100 = $48,400 favorable. Because actual units (23,100) exceeded budgeted units (22,000), Coastal generated $48,400 more contribution margin than planned from volume alone — a favorable result indicating stronger-than-expected demand or sales execution. $23,100 uses the unit difference (1,100) multiplied by something other than the contribution margin — possibly the selling price or a confusion of the variance driver. $48,400 unfavorable reverses the sign, failing to recognize that selling more units than budgeted produces a favorable volume variance. $44,000 appears to use the contribution margin per unit as the variance itself, neglecting to multiply by the unit difference.",
        "Topic": "Sales volume variance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B14-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Coastal Distribution reports controllable profit of $485,000 and average operating assets of $3,200,000. Required return is 11%. What is residual income?",
        "Choices": [
          "$133,000",
          "$352,000",
          "$485,000",
          "$533,000"
        ],
        "Correct": "$133,000",
        "Explanation": "Under responsibility accounting and investment center performance measurement, residual income (RI) measures the profit an investment center generates above the minimum required return on its operating assets. The formula is: Residual Income = Controllable Profit − (Required Rate of Return × Average Operating Assets). For Coastal: RI = $485,000 − (0.11 × $3,200,000) = $485,000 − $352,000 = $133,000. Coastal's investment center earned $133,000 more than the 11% required return, indicating value creation above the cost of capital. Unlike return on investment (ROI), residual income encourages managers to accept all projects exceeding the required return, avoiding the underinvestment problem where high-ROI divisions reject projects that would dilute their percentage return. $352,000 is the imputed cost (0.11 × $3,200,000) — the required return itself, not the excess above it. $485,000 is the controllable profit without subtracting the required return. $533,000 appears to add the required return rather than subtract it.",
        "Topic": "Investment centers",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B14-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Coastal Distribution uses a balanced scorecard. Which perspective includes employee training hours and system upgrade completion rates?",
        "Choices": [
          "Internal business process",
          "Customer",
          "Financial",
          "Learning and growth"
        ],
        "Correct": "Learning and growth",
        "Explanation": "Under the balanced scorecard framework developed by Kaplan and Norton, the four perspectives — financial, customer, internal business process, and learning and growth — form a causal chain where learning and growth enables process improvements, which drive customer satisfaction, which produces financial results. The learning and growth perspective captures the organization's intangible assets: human capital (employee skills and training), information capital (systems and technology), and organizational capital (culture and alignment). Employee training hours measure investment in workforce capabilities, and system upgrade completion rates measure progress on technology infrastructure — both foundational to long-term competitive capability. The internal business process perspective focuses on operational efficiency metrics such as cycle time, defect rates, and throughput rather than capability-building measures. The customer perspective tracks market-facing outcomes like satisfaction, retention, and share. The financial perspective measures traditional financial outcomes like revenue growth and profitability.",
        "Topic": "Balanced scorecard",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B14-Q5"
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
    "CaseID": "CASE-B15",
    "Title": "Cost Management Analysis",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Cost Management",
    "EstimatedMinutes": 30,
    "ScenarioText": "Dominion Chemicals is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section D, Cost Management. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Dominion Chemicals has 8,000 units in ending work in process, 100% complete as to materials and 60% complete as to conversion. Using the weighted-average method, how many equivalent units are in ending WIP for conversion?",
        "Choices": [
          "8,000",
          "3,200",
          "4,800",
          "14,800"
        ],
        "Correct": "4,800",
        "Explanation": "Under process costing and the weighted-average method per cost accounting standards, equivalent units represent the amount of work done during the period expressed in terms of fully completed units. For conversion costs (direct labor plus manufacturing overhead applied to work in process), equivalent units in ending WIP = Physical Units × Percentage of Completion. Dominion's ending WIP: 8,000 physical units × 60% complete for conversion = 4,800 equivalent units. This means the 8,000 partially completed units represent the same conversion cost as 4,800 fully completed units. 8,000 assumes 100% completion, ignoring that conversion is only 60% complete — a common error when candidates treat all units as fully complete. 3,200 results from 8,000 × 40%, incorrectly applying the incomplete percentage (the portion remaining) instead of the complete percentage. 14,800 appears to add 8,000 + some other figure rather than multiplying, confusing total physical units with equivalent units.",
        "Topic": "Process costing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B15-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Dominion Chemicals has an inspection activity pool of $312,000 and 6,500 inspection hours. Product X used 340 inspection hours. What inspection cost is assigned to Product X under ABC?",
        "Choices": [
          "$312,000",
          "$16,320",
          "$48.00",
          "$29,400"
        ],
        "Correct": "$16,320",
        "Explanation": "Under activity-based costing (ABC), overhead is assigned to products based on their consumption of activities rather than a single volume-based driver. The process involves two stages: first, calculate an activity rate by dividing the activity cost pool by the total activity driver quantity; second, assign cost to the cost object by multiplying the activity rate by the quantity consumed. For Dominion's inspection activity: Activity Rate = $312,000 ÷ 6,500 inspection hours = $48 per inspection hour. Cost assigned to Product X = $48 × 340 hours = $16,320. ABC assigns costs more accurately than traditional costing by recognizing that products consuming more inspection resources should bear proportionally more inspection cost. $312,000 is the total pool cost, not the amount assigned to a single product. $48.00 is the activity rate per hour, not the total cost assigned to Product X. $29,400 does not correspond to a recognizable calculation path and likely reflects a computational error.",
        "Topic": "Activity-based costing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B15-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Dominion Chemicals inspects raw materials upon receipt to detect defects before production. In a cost of quality report, this is classified as:",
        "Choices": [
          "External failure cost",
          "Prevention cost",
          "Internal failure cost",
          "Appraisal cost"
        ],
        "Correct": "Appraisal cost",
        "Explanation": "Under the cost of quality (COQ) framework used in management accounting, quality costs are classified into four categories forming a prevention-appraisal-failure model. Appraisal costs are incurred to detect defects through inspection, testing, and verification activities — determining whether products or materials conform to quality standards before they reach customers. Dominion's incoming materials inspection is a classic appraisal activity: it identifies defective raw materials before they enter production, preventing defective inputs from becoming defective outputs. Prevention costs are incurred to prevent defects from occurring in the first place (e.g., quality training, supplier certification, design reviews). Internal failure costs arise when defects are detected before delivery (e.g., scrap, rework, downtime). External failure costs occur when defects reach customers (e.g., warranty claims, returns, lost reputation). Dominion inspects to detect, not prevent — making this an appraisal cost. Organizations generally find that investing in prevention is more cost-effective than relying on appraisal and failure detection.",
        "Topic": "Cost of quality",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B15-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Dominion Chemicals wants to design quality into its processes to reduce waste and defects. Which approach is most closely associated with this goal?",
        "Choices": [
          "Appraisal cost emphasis",
          "Scrap and rework optimization",
          "Prevention cost emphasis",
          "External failure cost acceptance"
        ],
        "Correct": "Prevention cost emphasis",
        "Explanation": "Under total quality management (TQM) and lean manufacturing principles, designing quality into processes — often called \"building quality in\" rather than \"inspecting quality in\" — emphasizes prevention over detection. Prevention costs include activities such as quality training, supplier certification, process design reviews, and preventive maintenance, all aimed at ensuring defects never occur. The economic logic is well-established: it is less expensive to prevent a defect than to find and fix one after it occurs. An appraisal cost emphasis relies on inspection (detection), which catches defects but does not eliminate their root causes. Scrap and rework optimization manages failure costs rather than preventing them, and both scrap and rework represent waste — the very thing lean and quality programs seek to eliminate. External failure cost acceptance is the least desirable approach, as it means defects reach customers, producing warranty claims, reputation damage, and lost business. Dominion's goal of designing quality into processes aligns directly with a prevention-focused quality strategy.",
        "Topic": "Lean and quality",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B15-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Dominion Chemicals has two service departments that provide services to each other and to three production departments. Which allocation method best captures reciprocal services?",
        "Choices": [
          "Step method",
          "Direct method",
          "Reciprocal method",
          "Single-rate method"
        ],
        "Correct": "Reciprocal method",
        "Explanation": "Under cost accounting allocation principles, three methods exist for allocating service department costs to production departments: direct, step, and reciprocal. The reciprocal method is the most theoretically precise because it uses simultaneous equations to fully recognize all inter-service-department relationships — when two service departments provide services to each other (mutual or reciprocal services), the reciprocal method allocates costs in both directions simultaneously. For Dominion, with two service departments providing services to each other and to three production departments, the reciprocal method captures the full cost interaction. The direct method ignores all inter-service-department services, allocating each service department's costs only to production departments — the simplest but least accurate. The step (sequential) method recognizes some inter-service-department services by allocating costs in a sequence, but once a department's costs are allocated, it receives no further allocations — only partially recognizing reciprocal relationships. The single-rate method is a different concept (combining fixed and variable costs into one rate), not an allocation-sequence method.",
        "Topic": "Service department allocation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B15-Q5"
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
    "CaseID": "CASE-B16",
    "Title": "Internal Control Assessment",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Internal Controls",
    "EstimatedMinutes": 30,
    "ScenarioText": "Ember Technologies is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section E, Internal Controls. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Ember Technologies is evaluating its internal control system against the COSO framework. Which set lists the five COSO internal control components?",
        "Choices": [
          "Authorization, custody, recordkeeping, reconciliation, review",
          "Planning, organizing, directing, controlling, reporting",
          "Control environment, risk assessment, control activities, information and communication, monitoring",
          "Prevention, detection, correction, recovery, assessment"
        ],
        "Correct": "Control environment, risk assessment, control activities, information and communication, monitoring",
        "Explanation": "Under the COSO Internal Control — Integrated Framework (2013), internal control consists of five integrated components: Control Environment (the tone at the top, including integrity, ethical values, and board oversight), Risk Assessment (identifying and analyzing risks to achieving objectives), Control Activities (policies and procedures that ensure management directives are carried out), Information and Communication (capturing and exchanging relevant information to support control functioning), and Monitoring Activities (ongoing and separate evaluations of control performance). These five components form the COSO cube, with each component relevant to all entity levels and all categories of objectives (operations, reporting, and compliance). \"Authorization, custody, recordkeeping, reconciliation, review\" lists control activities and segregation concepts but is not the COSO component set. \"Planning, organizing, directing, controlling, reporting\" describes management functions, not internal control components. \"Prevention, detection, correction, recovery, assessment\" describes control types or objectives but not the COSO framework.",
        "Topic": "COSO framework",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B16-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Ember Technologies's CEO emphasizes integrity, ethical values, and commitment to competence. Which COSO component does this primarily strengthen?",
        "Choices": [
          "Control environment",
          "Risk assessment",
          "Monitoring activities",
          "Control activities"
        ],
        "Correct": "Control environment",
        "Explanation": "Under the COSO Internal Control — Integrated Framework (2013), the Control Environment is the foundation for all other components of internal control. It sets the tone of an organization, influencing the control consciousness of its people. COSO identifies several principles within the control environment, including: (1) the organization demonstrates commitment to integrity and ethical values, (2) the board demonstrates independence from management and exercises oversight, (3) management establishes structures, reporting lines, and appropriate authorities and responsibilities, (4) the organization demonstrates commitment to attract, develop, and retain competent individuals, and (5) the organization holds individuals accountable for their internal control responsibilities. Ember's CEO emphasizing integrity, ethical values, and commitment to competence directly strengthens the control environment — these are the foundational cultural and behavioral elements upon which all other controls depend. Without a strong control environment, even well-designed control activities, risk assessment procedures, and monitoring mechanisms will be undermined by a culture that does not value internal control.",
        "Topic": "COSO framework",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B16-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Ember Technologies uses periodic management reviews of internal control performance and follows up on identified deficiencies. Which COSO component does this represent?",
        "Choices": [
          "Information and communication",
          "Risk assessment",
          "Monitoring activities",
          "Control environment"
        ],
        "Correct": "Monitoring activities",
        "Explanation": "Under the COSO Internal Control — Integrated Framework (2013), Monitoring Activities assess whether each of the five components of internal control is present and functioning. COSO identifies two types of monitoring: ongoing monitoring (built into routine operations, including regular management reviews and supervisory activities) and separate evaluations (periodic, scope-defined assessments such as internal audit reviews). A critical element of effective monitoring is timely follow-up on identified deficiencies — evaluating findings, communicating them to responsible parties, and ensuring corrective action is taken. Ember's periodic management reviews of control performance represent ongoing monitoring, and the follow-up on identified deficiencies reflects the deficiency-evaluation and remediation cycle that COSO requires. Information and Communication involves capturing and sharing relevant data, not evaluating control effectiveness. Risk Assessment involves identifying and analyzing risks to the achievement of objectives, not reviewing existing controls' performance. The Control Environment establishes the tone and foundation for controls, not their ongoing evaluation.",
        "Topic": "COSO framework",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B16-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Ember Technologies is assessing fraud risks in its procurement process. The fraud triangle identifies three conditions that generally exist when fraud occurs. Which set is correct?",
        "Choices": [
          "Prevention, detection, and correction",
          "Authorization, custody, and recordkeeping",
          "Motive, means, and opportunity",
          "Incentive or pressure, opportunity, and rationalization"
        ],
        "Correct": "Incentive or pressure, opportunity, and rationalization",
        "Explanation": "Under the fraud triangle framework, widely adopted in both professional standards (including AU-C Section 240, Consideration of Fraud in a Financial Statement Audit, and the COSO Fraud Risk Management Guide), three conditions are generally present when fraud occurs: (1) Incentive or Pressure — a reason or motivation to commit fraud (e.g., financial difficulties, performance-based compensation targets); (2) Opportunity — a perceived ability to commit fraud without detection (e.g., weak internal controls, inadequate segregation of duties); and (3) Rationalization or Attitude — the ability to justify the fraudulent act as acceptable (e.g., \"the company owes me,\" \"everyone does it\"). When Ember assesses fraud risks in procurement, it should evaluate all three conditions — which employees face pressure, what control gaps create opportunity, and whether the ethical culture tolerates rationalization. \"Prevention, detection, correction\" describes internal control objectives. \"Authorization, custody, recordkeeping\" describes segregation of duties. \"Motive, means, opportunity\" uses different terminology and is not the fraud triangle.",
        "Topic": "Fraud controls",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B16-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Ember Technologies's internal audit function reports directly to the audit committee. This reporting structure primarily strengthens which aspect of internal control?",
        "Choices": [
          "Segregation of duties in accounts payable",
          "Speed of financial reporting",
          "Budget accuracy for production departments",
          "Independence and objectivity of the internal audit function"
        ],
        "Correct": "Independence and objectivity of the internal audit function",
        "Explanation": "Under the Institute of Internal Auditors (IIA) International Standards for the Professional Practice of Internal Auditing and COSO governance principles, the internal audit function's organizational positioning is critical to its effectiveness. When the internal audit function reports directly to the audit committee (a subcommittee of the board of directors composed of independent directors) rather than to operating management, it gains structural independence — the ability to carry out audits and report findings without fear of management interference or retaliation. The audit committee provides an independent oversight channel, ensuring audit findings are heard at the board level and that management cannot suppress unfavorable reports. Segregation of duties in accounts payable is a control activity at the transaction level, not primarily a function of the audit reporting structure. Speed of financial reporting and budget accuracy are operational metrics unaffected by the internal audit reporting line. The reporting structure strengthens the governance architecture — the \"tone at the top\" and board oversight — which in turn enables all other controls to function with greater integrity.",
        "Topic": "Internal audit",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B16-Q5"
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
    "CaseID": "CASE-B17",
    "Title": "Analytics and Technology Governance",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Technology and Analytics",
    "EstimatedMinutes": 30,
    "ScenarioText": "Forest Products Co. is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section F, Technology and Analytics. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Forest Products Co. wants to use analytics to understand why customer returns increased last quarter. Which type of analytics is most appropriate?",
        "Choices": [
          "Predictive analytics",
          "Descriptive analytics",
          "Diagnostic analytics",
          "Prescriptive analytics"
        ],
        "Correct": "Diagnostic analytics",
        "Explanation": "Under the data analytics maturity framework, analytics is categorized into four types of increasing sophistication: Descriptive analytics answers \"what happened?\" by summarizing historical data. Diagnostic analytics answers \"why did it happen?\" by drilling down into data to identify root causes and relationships. Predictive analytics answers \"what might happen?\" using statistical models and machine learning to forecast future outcomes. Prescriptive analytics answers \"what should we do?\" by recommending optimal actions based on predictive models and optimization algorithms. Forest Products Co. wants to understand why customer returns increased — this is the diagnostic question at the heart of root cause analysis, making diagnostic analytics the appropriate tool. Descriptive analytics would only confirm the increase occurred, not explain it. Predictive analytics would forecast future return rates but not explain the past increase. Prescriptive analytics would recommend actions to reduce returns once the cause is understood.",
        "Topic": "Data analytics types",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B17-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Forest Products Co. is implementing a new accounting system and wants formal checkpoints. Which sequence reflects the systems development life cycle?",
        "Choices": [
          "Revenue, expense, asset, liability, equity",
          "Requirements analysis, design, configuration, testing, implementation, maintenance",
          "Direct material, direct labor, overhead, period cost",
          "Planning, budgeting, forecasting, variance analysis"
        ],
        "Correct": "Requirements analysis, design, configuration, testing, implementation, maintenance",
        "Explanation": "Under the systems development life cycle (SDLC) framework, a structured methodology for developing and implementing information systems, the standard phases are: (1) Requirements Analysis — defining what the system must do through stakeholder interviews, process documentation, and specification development; (2) Design — creating the system architecture, data models, user interfaces, and integration specifications; (3) Configuration (or Development/Build) — coding, configuring the software, and building the system to specifications; (4) Testing — unit testing, integration testing, user acceptance testing, and parallel testing to verify the system works correctly; (5) Implementation — deploying the system into production through cutover methods such as direct, parallel, phased, or pilot conversion; and (6) Maintenance — ongoing support, bug fixes, enhancements, and operational monitoring. The SDLC provides formal checkpoints (phase-gate reviews) at each transition point. \"Revenue, expense, asset, liability, equity\" lists financial statement elements. \"Direct material, direct labor, overhead, period cost\" lists cost classifications. \"Planning, budgeting, forecasting, variance analysis\" describes the management accounting cycle, not system development.",
        "Topic": "Systems development life cycle",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B17-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Forest Products Co. wants to automate repetitive accounts payable tasks that follow clear rules. Which technology is best suited for this?",
        "Choices": [
          "Robotic process automation",
          "Data warehouse",
          "Blockchain",
          "Machine learning"
        ],
        "Correct": "Robotic process automation",
        "Explanation": "Under the technology and automation domain of financial systems, robotic process automation (RPA) is specifically designed for tasks that are rules-based, repetitive, high-volume, and involve structured data with stable processes. RPA software bots mimic human interactions with digital systems — logging into applications, reading data from spreadsheets or screens, applying predefined rules, and entering outputs into other systems. Forest's accounts payable tasks (invoice matching, data entry, payment processing) fit the RPA profile perfectly: they follow clear if-then rules, process high volumes of structured transactions, and operate within stable, well-defined workflows. A data warehouse is a repository for storing and managing large datasets for analytics, not an automation tool. Blockchain is a distributed ledger technology suited for transaction verification and traceability across multiple parties, not for automating internal AP processes. Machine learning is suited for tasks requiring pattern recognition from data (e.g., fraud detection, demand forecasting), where rules are not explicitly programmed; it is over-engineered for simple rules-based automation where RPA is more appropriate and cost-effective.",
        "Topic": "Robotic process automation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B17-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Forest Products Co. discovers that customer names and addresses are recorded differently in sales, billing, and logistics systems. Which practice best addresses this issue?",
        "Choices": [
          "Eliminating all customer data validation",
          "Data governance with master data management and standard definitions",
          "Deleting all customer records and re-entering them",
          "Using a separate spreadsheet for each system"
        ],
        "Correct": "Data governance with master data management and standard definitions",
        "Explanation": "Under data governance frameworks and the COSO principle related to information quality, data governance establishes the policies, standards, roles, and accountability mechanisms that ensure data is accurate, consistent, complete, and available across the organization. Master data management (MDM) is a key component of data governance — it creates a single, authoritative source of truth for critical business entities such as customers, products, suppliers, and chart of accounts. Forest's problem (customer names and addresses recorded differently across sales, billing, and logistics) is a classic master data inconsistency — the same entity has conflicting representations in different systems. Data governance with MDM establishes standard data definitions, naming conventions, and a single master record that all systems reference, eliminating the inconsistency at its source. Eliminating validation makes the problem worse by removing data quality checks. Deleting and re-entering records is a temporary fix that does not prevent recurrence. Separate spreadsheets compound the problem by adding yet another inconsistent data source.",
        "Topic": "Data governance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B17-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Forest Products Co. wants to reduce unauthorized access to its financial systems. Which control is most effective?",
        "Choices": [
          "Disabling system logs to save storage",
          "Allowing all employees full system access",
          "Shared passwords for convenience",
          "Multi-factor authentication and periodic access reviews"
        ],
        "Correct": "Multi-factor authentication and periodic access reviews",
        "Explanation": "Under COSO internal control principles and cybersecurity frameworks (including NIST and ISO 27001), access controls are a fundamental control activity to protect information assets. Multi-factor authentication (MFA) requires at least two of three authentication factors — something you know (password), something you have (token or device), and something you are (biometric) — significantly reducing the risk that a compromised password alone grants unauthorized access. Periodic access reviews ensure that user permissions remain appropriate as roles change, employees transfer departments, or individuals leave the organization (a process sometimes called access recertification). Together, MFA and periodic access reviews implement the principle of least privilege while maintaining ongoing vigilance. Disabling system logs eliminates the audit trail needed to detect unauthorized access — making the problem worse. Allowing all employees full system access violates least-privilege and segregation of duties principles. Shared passwords eliminate individual accountability for system actions and make revoking access for a single person impossible.",
        "Topic": "Cybersecurity",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B17-Q5"
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
    "CaseID": "CASE-B18",
    "Title": "Financial Statement Analysis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "External Financial Reporting Decisions",
    "EstimatedMinutes": 30,
    "ScenarioText": "Gateway Logistics is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section A, External Financial Reporting Decisions. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Gateway Logistics uses the FIFO method for inventory. In a period of rising prices, which statement is true about FIFO compared to weighted average?",
        "Choices": [
          "FIFO results in lower net income and lower ending inventory",
          "FIFO results in lower net income and higher ending inventory",
          "FIFO results in higher net income and higher ending inventory",
          "FIFO results in higher net income and lower ending inventory"
        ],
        "Correct": "FIFO results in higher net income and higher ending inventory",
        "Explanation": "Under U.S. GAAP inventory valuation and ASC 330, the first-in, first-out (FIFO) cost flow assumption assigns the oldest inventory costs to cost of goods sold and the most recent costs to ending inventory. In a period of rising prices, the older, lower-cost inventory units flow to COGS first, while the newer, higher-cost units remain in ending inventory. This produces three effects: (1) COGS is lower (older, cheaper costs expensed), (2) ending inventory on the balance sheet is higher (reflects recent, higher purchase costs — closer to current replacement cost), and (3) net income is higher (lower COGS increases gross margin and net income). The weighted-average method would blend old and new costs, producing intermediate values between FIFO and LIFO. \"Lower net income and higher ending inventory\" is inconsistent — lower COGS (FIFO in rising prices) cannot simultaneously produce lower net income. \"Higher net income and lower ending inventory\" describes LIFO in rising prices, not FIFO. \"Lower net income and lower ending inventory\" also describes LIFO in rising prices.",
        "Topic": "Inventory valuation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B18-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Gateway Logistics has a defined benefit pension plan. Which component of pension cost is calculated using the projected benefit obligation and a discount rate?",
        "Choices": [
          "Service cost",
          "Amortization of prior service cost",
          "Actual return on plan assets",
          "Interest cost"
        ],
        "Correct": "Interest cost",
        "Explanation": "Under ASC 715 (Compensation — Retirement Benefits), the net periodic pension cost for a defined benefit plan includes several components: service cost, interest cost, expected return on plan assets, amortization of prior service cost, and amortization of actuarial gains and losses. Interest cost specifically represents the increase in the projected benefit obligation (PBO) due to the passage of time — as each period passes, the discounted present value of future benefit payments grows closer to the payment date, increasing the obligation. It is calculated as: Beginning PBO × Discount Rate. Service cost is the present value of benefits earned by employees during the current period for services rendered — a different component driven by additional employee service, not the time value of money. The actual return on plan assets represents investment income earned on plan assets held to fund the obligation. Amortization of prior service cost relates to plan amendments that change benefits for prior service periods, recognized over future service years rather than expensed immediately.",
        "Topic": "Pensions and postretirement benefits",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B18-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Gateway Logistics leases equipment under a 5-year lease that transfers substantially all risks and rewards of ownership. Under IFRS, Gateway should classify this as:",
        "Choices": [
          "A finance lease with a right-of-use asset and lease liability recognized",
          "An operating lease with only rental expense disclosed",
          "An operating lease with a contingent liability footnote",
          "A capital lease with no asset recognition"
        ],
        "Correct": "A finance lease with a right-of-use asset and lease liability recognized",
        "Explanation": "Under IFRS 16 (Leases), a lessee classifies a lease as a finance lease when it transfers substantially all the risks and rewards incidental to ownership of the underlying asset to the lessee. For Gateway's 5-year equipment lease that transfers substantially all risks and rewards, IFRS 16 requires the lessee to recognize both a right-of-use asset (representing the right to use the leased asset over the lease term) and a lease liability (representing the obligation to make lease payments) on the balance sheet. The right-of-use asset is initially measured at cost (lease liability plus initial direct costs, less incentives) and subsequently depreciated. The lease liability is initially measured at the present value of lease payments and subsequently adjusted for interest accretion and payments made. \"An operating lease with only rental expense disclosed\" describes the pre-IFRS 16 operating lease treatment, where off-balance-sheet financing was possible — this approach has been largely eliminated for lessees under IFRS 16. \"An operating lease with a contingent liability footnote\" mischaracterizes both the classification and the disclosure treatment. \"A capital lease with no asset recognition\" is internally contradictory — finance leases require asset recognition on the balance sheet.",
        "Topic": "Leases",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B18-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Gateway Logistics has $2,400,000 in current assets, $1,100,000 in current liabilities, and $600,000 in inventory. What is the quick ratio?",
        "Choices": [
          "1.64",
          "2.18",
          "1.18",
          "0.55"
        ],
        "Correct": "1.64",
        "Explanation": "Under financial statement analysis and ratio analysis per U.S. GAAP reporting standards, the quick ratio (acid-test ratio) measures a company's ability to meet its short-term obligations using its most liquid assets — those that can be converted to cash quickly without significant loss of value. The formula is: Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities. Inventory is excluded because it is typically the least liquid current asset — it must be sold, often on credit, before generating cash. For Gateway: ($2,400,000 − $600,000) ÷ $1,100,000 = $1,800,000 ÷ $1,100,000 = 1.64. A quick ratio of 1.64 means Gateway has $1.64 in quick assets for every $1.00 of current liabilities, indicating strong short-term liquidity. 2.18 equals $2,400,000 ÷ $1,100,000, which is the current ratio — including inventory, it overstates liquidity by counting an asset that cannot directly pay obligations. 1.18 equals ($2,400,000 − $1,100,000) ÷ $1,100,000, which subtracts current liabilities from current assets instead of inventory. A candidate reaching this answer may have computed the current ratio (2.18) and then subtracted 1, effectively calculating net working capital divided by current liabilities, which is not the quick ratio. 0.55 equals $600,000 ÷ $1,100,000, dividing only inventory by current liabilities — this is not a standard liquidity measure.",
        "Topic": "Financial statement analysis",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B18-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Gateway Logistics signed a contract to provide delivery services over 24 months. Under IFRS 15, how should revenue be recognized?",
        "Choices": [
          "Recognize revenue when cash is received each month",
          "Recognize all revenue at contract signing",
          "Recognize revenue only at the end of 24 months",
          "Recognize revenue over time as the services are provided"
        ],
        "Correct": "Recognize revenue over time as the services are provided",
        "Explanation": "Under IFRS 15 (Revenue from Contracts with Customers), the core principle is that an entity recognizes revenue to depict the transfer of promised goods or services to customers in an amount that reflects the consideration to which the entity expects to be entitled. For performance obligations satisfied over time, IFRS 15 requires that revenue be recognized over time if any of three criteria are met: (1) the customer simultaneously receives and consumes the benefits as the entity performs, (2) the entity's performance creates or enhances an asset the customer controls, or (3) the entity's performance does not create an asset with alternative use and the entity has an enforceable right to payment. Gateway's 24-month delivery service contract meets the first criterion — the customer receives and consumes the delivery benefit each month as Gateway performs. Revenue is recognized using an appropriate measure of progress (often straight-line over time for level service contracts). Recognizing revenue when cash is received (cash-basis) violates the accrual principle. Recognizing all revenue at contract signing ignores that no services have yet been provided. Recognizing at the end of 24 months defers revenue despite services being provided.",
        "Topic": "Revenue recognition",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B18-Q5"
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
    "CaseID": "CASE-B19",
    "Title": "Forecasting and Budget Strategies",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Planning, Budgeting, and Forecasting",
    "EstimatedMinutes": 30,
    "ScenarioText": "Heritage Construction is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section B, Planning, Budgeting, and Forecasting. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Heritage Construction starts each budget cycle from zero, requiring every department to justify each expense rather than referencing prior-period spending. Which budgeting approach is being used?",
        "Choices": [
          "Incremental budgeting",
          "Zero-based budgeting",
          "Kaizen budgeting",
          "Continuous budgeting"
        ],
        "Correct": "Zero-based budgeting",
        "Explanation": "Under standard budgeting principles, zero-based budgeting (ZBB) requires every department to build its budget from a zero base each cycle, justifying every expenditure regardless of prior-period spending levels. Heritage Construction's practice of requiring each department to justify expenses from scratch is the defining characteristic of ZBB. \"Incremental budgeting\" is incorrect because incremental budgeting adjusts prior-year figures by a percentage or inflation factor rather than requiring fresh justification. \"Kaizen budgeting\" is incorrect because kaizen budgeting emphasizes continuous, incremental cost reductions throughout the budget period rather than starting from zero. \"Continuous budgeting\" is incorrect because continuous (rolling) budgeting adds a future period as each current period ends to maintain a constant planning horizon, not requiring re-justification of all expenses.",
        "Topic": "Budgeting concepts",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B19-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Heritage Construction estimates each additional unit of training reduces assembly errors by a consistent percentage. Which forecasting approach best describes this pattern?",
        "Choices": [
          "Time-series moving average",
          "Learning curve model",
          "Regression analysis",
          "Monte Carlo simulation"
        ],
        "Correct": "Learning curve model",
        "Explanation": "The learning curve model, rooted in managerial accounting's treatment of production efficiency, captures the phenomenon where each doubling of cumulative output results in a consistent percentage reduction in time, cost, or errors. Heritage Construction's observation that training reduces assembly errors by a consistent percentage is a textbook learning curve pattern. \"Time-series moving average\" is incorrect because moving averages smooth historical data over time to identify trends, not model the percentage improvement from cumulative experience. \"Regression analysis\" is incorrect because regression models the statistical relationship between a dependent variable and one or more independent variables rather than the cumulative-experience-based improvement curve. \"Monte Carlo simulation\" is incorrect because Monte Carlo simulation uses random sampling to model probability distributions and assess risk, not to capture deterministic learning-driven error reduction.",
        "Topic": "Forecasting techniques",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B19-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Heritage Construction expects first-quarter sales of $1,400,000, of which 30% are cash sales and 70% are on credit. Credit sales are collected 60% in the quarter of sale and 40% in the next quarter. What are total cash collections for Q1?",
        "Choices": [
          "$1,400,000",
          "$1,260,000",
          "$420,000",
          "$1,008,000"
        ],
        "Correct": "$1,008,000",
        "Explanation": "Under the cash budget component of the master budget, total cash collections must distinguish between cash sales and credit sales with their respective collection timing. For Heritage Construction: cash sales are collected immediately at 30 percent of $1,400,000 = $420,000. Credit sales are $1,400,000 × 70 percent = $980,000, of which 60 percent is collected in Q1 = $588,000. Total Q1 collections = $420,000 + $588,000 = $1,008,000. $1,400,000 incorrectly assumes all sales are collected in cash during Q1, ignoring the 40 percent of credit sales deferred to Q2. $1,260,000 incorrectly applies the 60 percent collection rate to total sales rather than credit sales only. $420,000 incorrectly counts only cash sales and ignores the collection of Q1 credit sales entirely. A common exam trap is applying collection percentages to total sales rather than credit sales alone.",
        "Topic": "Cash budgeting",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B19-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Heritage Construction's strategic plan calls for a 15% market share increase over 3 years. The operating budget should be most closely linked to which element of strategic planning?",
        "Choices": [
          "The external auditor's management letter",
          "A summary of industry benchmarks without action steps",
          "Specific measurable objectives, action plans, and resource allocations to achieve the strategic goal",
          "The prior year budget adjusted for inflation"
        ],
        "Correct": "Specific measurable objectives, action plans, and resource allocations to achieve the strategic goal",
        "Explanation": "Under the strategic planning and budgeting framework, the operating budget serves as the mechanism that operationalizes long-term strategy into actionable annual plans. Budgets translate broad strategic goals like Heritage Construction's 15 percent market share increase into specific, measurable objectives with defined resource allocations and action plans. \"The external auditor's management letter\" is incorrect because the management letter communicates internal control findings and recommendations from the external audit, not strategic planning elements. \"A summary of industry benchmarks without action steps\" is incorrect because comparative analysis without linked action plans does not operationalize strategy or allocate resources. \"The prior year budget adjusted for inflation\" is incorrect because this describes incremental budgeting, which passively extends past spending patterns rather than actively linking resources to forward-looking strategic objectives. The core budgeting principle is alignment: resources follow strategy.",
        "Topic": "Strategic planning",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B19-Q4"
      },
      {
        "Type": "numeric",
        "Prompt": "Heritage Construction expects sales of 2,500 units at $300 selling price per unit. Variable cost is 60% of sales and fixed costs are $180,000. What is the budgeted operating income?",
        "Correct": "$120,000",
        "Explanation": "Under the contribution-format budgeted income statement, operating income is derived by first computing contribution margin (sales minus variable costs) and then subtracting fixed costs. For Heritage Construction: sales revenue = 2,500 units × $300 = $750,000. Variable costs at 60 percent of sales = $750,000 × 0.60 = $450,000. Contribution margin = $750,000 − $450,000 = $300,000. Budgeted operating income = contribution margin of $300,000 − fixed costs of $180,000 = $120,000. A common error is to apply the variable cost percentage to unit count rather than sales dollars. Another common error is to subtract fixed costs before computing contribution margin, confusing the traditional income statement format with the contribution format used for internal planning.",
        "Topic": "Budgeted income statement",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B19-Q5"
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
    "CaseID": "CASE-B20",
    "Title": "Performance Metrics and Evaluation",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Performance Management",
    "EstimatedMinutes": 30,
    "ScenarioText": "Ironclad Security is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section C, Performance Management. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Ironclad Security evaluated an investment center that generated $180,000 of controllable profit with average operating assets of $900,000. The required return is 12%. What is the return on investment (ROI)?",
        "Choices": [
          "18.0%",
          "12.0%",
          "20.0%",
          "15.0%"
        ],
        "Correct": "20.0%",
        "Explanation": "Return on investment (ROI), the primary performance metric for investment centers under responsibility accounting, measures how efficiently a division uses its asset base to generate profit. ROI = Controllable Profit ÷ Average Operating Assets. For Ironclad Security: $180,000 ÷ $900,000 = 0.20 = 20.0 percent. 18.0 percent incorrectly uses the required return as a base rather than computing the actual ratio. 12.0 percent represents the required rate of return (hurdle rate), not the ROI — this is the minimum acceptable return, not the actual return achieved. 15.0 percent results from an erroneous computation. The 20.0 percent ROI exceeds Ironclad's 12 percent required return, indicating the division is generating returns above the cost of capital.",
        "Topic": "Investment centers",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B20-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Ironclad Security's service division wants to charge the security installation division for consulting support. Which transfer pricing method would best preserve divisional autonomy and motivate performance?",
        "Choices": [
          "Full-cost transfer price",
          "No transfer price should be used",
          "Variable-cost transfer price",
          "Market-based transfer price"
        ],
        "Correct": "Market-based transfer price",
        "Explanation": "Under responsibility accounting and decentralization principles, transfer prices should promote goal congruence while preserving divisional autonomy. A market-based transfer price uses an external market price as the benchmark, giving both the buying and selling divisions an objective reference point that neither can manipulate. For Ironclad Security, this best preserves autonomy because each division transacts at prices comparable to those available from external parties, and performance is measured against market standards. \"Full-cost transfer price\" is incorrect because full-cost pricing can pass on the selling division's inefficiencies and does not provide the same motivation for cost control. \"No transfer price should be used\" is incorrect because without a transfer price, divisional performance cannot be measured independently. \"Variable-cost transfer price\" is incorrect because while variable-cost pricing supports short-run decision-making, the selling division cannot cover its fixed costs, discouraging investment and penalizing the selling division's performance.",
        "Topic": "Transfer pricing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B20-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Ironclad Security produces two products: alarms with contribution margin of $85 per unit and cameras with $65 per unit. Budgeted mix was 60% alarms and 40% cameras. Actual mix was 55% alarms and 45% cameras, with total actual units sold of 10,000. What is the sales mix variance?",
        "Choices": [
          "$10,000 unfavorable",
          "$10,000 favorable",
          "$5,000 unfavorable",
          "$15,000 unfavorable"
        ],
        "Correct": "$10,000 unfavorable",
        "Explanation": "The sales mix variance, a Level 3 variance in standard costing, measures the effect on contribution margin of selling products in a proportion different from the budgeted mix. For Ironclad Security: the budgeted mix was 60 percent alarms (CM $85) and 40 percent cameras (CM $65), producing a weighted-average CM of ($85 × 0.60) + ($65 × 0.40) = $77.00 per unit. The actual mix at 55 percent alarms and 45 percent cameras yields ($85 × 0.55) + ($65 × 0.45) = $76.00 per unit. The shift from alarms (higher CM) to cameras (lower CM) reduces the average contribution by $1.00 per unit. With 10,000 actual units sold, the sales mix variance = ($76.00 − $77.00) × 10,000 = $10,000 unfavorable. $10,000 favorable incorrectly reverses the direction of the variance. $5,000 unfavorable likely multiplies by only 5,000 units instead of the full 10,000. $15,000 unfavorable may have used the absolute percentage shift without netting.",
        "Topic": "Sales mix variance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B20-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Ironclad Security tracks on-time delivery percentage, customer satisfaction score, and defect rate. Which balanced scorecard perspective do these measures primarily belong to?",
        "Choices": [
          "Financial perspective",
          "Customer perspective",
          "Learning and growth perspective",
          "Internal business process perspective"
        ],
        "Correct": "Customer perspective",
        "Explanation": "Under the Balanced Scorecard framework developed by Kaplan and Norton, the customer perspective captures how the organization is perceived by its target customers through measures of the customer value proposition. On-time delivery percentage, customer satisfaction scores, and defect rates all directly reflect the customer's experience with Ironclad Security's products and services. \"Financial perspective\" is incorrect because the financial perspective focuses on profitability, revenue growth, and shareholder value measures — not customer-facing operational metrics. \"Learning and growth perspective\" is incorrect because learning and growth addresses employee capabilities, information systems, and organizational culture — the infrastructure for long-term improvement rather than current customer outcomes. \"Internal business process perspective\" is incorrect because while on-time delivery and defect rates also reflect internal process performance, these three measures are selected here as customer-facing indicators of what the customer actually experiences, making the customer perspective the primary classification.",
        "Topic": "Balanced scorecard",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B20-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Ironclad Security's controller recommends evaluating the monitoring systems division using segment margin instead of contribution margin. Which is the best reason for this recommendation?",
        "Choices": [
          "Contribution margin cannot be calculated for service companies",
          "Segment margin ignores all variable costs",
          "Contribution margin is never used for performance evaluation",
          "Segment margin deducts direct fixed costs, giving a more complete picture of a segment's profitability"
        ],
        "Correct": "Segment margin deducts direct fixed costs, giving a more complete picture of a segment's profitability",
        "Explanation": "Under responsibility accounting and segment reporting principles, segment margin is superior to contribution margin for evaluating segment profitability because it deducts the direct fixed costs that are traceable to and attributable to the specific segment. For Ironclad Security's monitoring systems division, segment margin reflects whether the division generates enough contribution to cover its own dedicated fixed costs and contribute to common corporate overhead. \"Contribution margin cannot be calculated for service companies\" is incorrect because contribution margin — revenue minus variable costs — is calculable for any entity with identifiable variable costs, including service companies. \"Segment margin ignores all variable costs\" is incorrect because segment margin is computed as contribution margin minus direct fixed costs, so it retains variable costs in its calculation. \"Contribution margin is never used for performance evaluation\" is incorrect because contribution margin is widely used for short-term decision-making (e.g., special orders, make-or-buy) and is a critical intermediate performance measure.",
        "Topic": "Segment performance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B20-Q5"
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
    "CaseID": "CASE-B21",
    "Title": "Cost Systems and Lean Operations",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Cost Management",
    "EstimatedMinutes": 30,
    "ScenarioText": "Jasper Medical Devices is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section D, Cost Management. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Jasper Medical Devices uses process costing with the weighted-average method. In March, 12,000 units were completed and transferred out. Ending WIP had 3,000 units that were 100% complete as to materials and 40% complete as to conversion. Total conversion cost was $68,400. What is the cost per equivalent unit for conversion?",
        "Choices": [
          "$6.84",
          "$5.18",
          "$4.56",
          "$5.70"
        ],
        "Correct": "$5.18",
        "Explanation": "Under the weighted-average method of process costing, equivalent units of production combine completed units with partially completed ending work-in-process units, weighted by their percentage of completion. For Jasper Medical Devices: equivalent units for conversion = 12,000 completed units + (3,000 WIP units × 40 percent complete for conversion) = 12,000 + 1,200 = 13,200 equivalent units. Cost per equivalent unit for conversion = $68,400 total conversion cost ÷ 13,200 equivalent units = $5.182 per unit, rounded to $5.18. $6.84 incorrectly divides $68,400 by only 10,000 units, possibly subtracting the ending WIP units entirely rather than including their equivalent portion. $4.56 incorrectly treats all 3,000 WIP units as fully complete for conversion ($68,400 / 15,000 = $4.56) rather than applying the 40 percent completion rate. $5.70 results from an arithmetic error such as dividing by a miscalculated equivalent-unit total. A common exam trap is forgetting to apply the completion percentage to ending WIP units.",
        "Topic": "Process costing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B21-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Jasper Medical Devices wants to determine the maximum allowable cost for a new monitoring device based on a competitive market price of $400 and a required profit margin of 25%. Which approach is being used?",
        "Choices": [
          "Life-cycle costing",
          "Variable costing",
          "Target costing",
          "Kaizen costing"
        ],
        "Correct": "Target costing",
        "Explanation": "Target costing is a strategic cost management technique in which the allowable cost of a product is determined by starting with a competitive market price and subtracting the required profit margin. Jasper Medical Devices' approach — starting from the $400 market price and subtracting the 25 percent required margin to arrive at the maximum allowable cost — is the defining characteristic of target costing. The resulting target cost becomes the design-to-cost constraint. \"Life-cycle costing\" is incorrect because life-cycle costing tracks and manages all costs from R&D through disposal over the product's entire life, rather than deriving a cost target from market price. \"Variable costing\" is incorrect because variable costing is an inventory valuation method that capitalizes only variable manufacturing costs, not a cost-planning approach driven by market price. \"Kaizen costing\" is incorrect because kaizen costing focuses on continuous, incremental cost reductions during the production phase of existing products, rather than establishing cost targets during the design phase for new products.",
        "Topic": "Target costing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B21-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Jasper Medical Devices uses a just-in-time production system. Which characteristic is most consistent with JIT?",
        "Choices": [
          "High raw material inventory levels",
          "Inspection at the end of the production line only",
          "Pull-based production that produces only what is needed when it is needed",
          "Large batch sizes to achieve economies of scale"
        ],
        "Correct": "Pull-based production that produces only what is needed when it is needed",
        "Explanation": "Just-in-time (JIT) manufacturing, a core element of lean production philosophy, is fundamentally a demand-pull system where production is triggered by actual customer demand rather than forecast-driven push scheduling. Under JIT, each workstation produces only when the downstream workstation signals a need, minimizing work-in-process inventory and exposing process inefficiencies. Jasper Medical Devices' adoption of JIT aligns with pull-based production that produces only what is needed, when it is needed. \"High raw material inventory levels\" is incorrect because JIT explicitly seeks to minimize all inventory levels through techniques such as supplier partnerships and frequent small-lot deliveries. \"Inspection at the end of the production line only\" is incorrect because JIT emphasizes quality at the source, with operators inspecting their own work at each step. \"Large batch sizes to achieve economies of scale\" is incorrect because JIT favors small batch sizes and quick changeovers to maintain flexibility and reduce inventory, rejecting the traditional economies-of-scale batch-sizing logic.",
        "Topic": "Lean manufacturing",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B21-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Jasper Medical Devices's value chain includes R&D, design, production, marketing, distribution, and customer service. Under a value chain framework, cost reduction efforts should:",
        "Choices": [
          "Allocate equal resources to every activity",
          "Focus only on production costs",
          "Eliminate the R&D function to reduce costs",
          "Consider interdependencies across all activities rather than minimizing each activity independently"
        ],
        "Correct": "Consider interdependencies across all activities rather than minimizing each activity independently",
        "Explanation": "Under Michael Porter's value chain framework, a firm's activities are interdependent — cost reduction in one activity (e.g., design) may increase or decrease costs in another (e.g., production or customer service). Effective value chain analysis requires understanding these linkages rather than managing each activity in isolation. For Jasper Medical Devices, considering interdependencies across R&D, design, production, marketing, distribution, and customer service avoids the risk of suboptimization. \"Allocate equal resources to every activity\" is incorrect because value chain analysis identifies which activities create the most value and allocates resources accordingly, not equally. \"Focus only on production costs\" is incorrect because this approach ignores upstream activities (design decisions that lock in production costs) and downstream activities (service costs that affect customer retention). \"Eliminate the R&D function to reduce costs\" is incorrect because R&D is a critical value-creating activity; eliminating it would reduce costs in the short term but destroy long-term competitive advantage — the exact suboptimization that value chain analysis seeks to prevent.",
        "Topic": "Value chain analysis",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B21-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Jasper Medical Devices reports inspection costs of $55,000, rework costs of $38,000, customer warranty claims of $72,000, and quality training of $25,000. What is total prevention and appraisal cost?",
        "Choices": [
          "$97,000",
          "$80,000",
          "$190,000",
          "$63,000"
        ],
        "Correct": "$80,000",
        "Explanation": "Under the cost of quality (COQ) framework, quality costs are classified into four categories: prevention costs (avoiding defects), appraisal costs (detecting defects), internal failure costs (correcting defects before delivery), and external failure costs (correcting defects after delivery). For Jasper Medical Devices: prevention costs = quality training of $25,000. Appraisal costs = inspection of $55,000. Total prevention and appraisal costs (also called costs of conformance) = $25,000 + $55,000 = $80,000. Rework ($38,000) is an internal failure cost, and customer warranty claims ($72,000) are external failure costs — both are costs of non-conformance, not included in the prevention-plus-appraisal subtotal. $97,000 incorrectly includes a failure cost component. $190,000 incorrectly sums all four cost categories, failing to distinguish conformance from non-conformance costs. $63,000 results from an arithmetic error or misclassification. An important principle is that investment in prevention and appraisal typically reduces the much larger internal and external failure costs.",
        "Topic": "Cost of quality",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section D",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B21-Q5"
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
    "CaseID": "CASE-B22",
    "Title": "Internal Controls and Risk Management",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Internal Controls",
    "EstimatedMinutes": 30,
    "ScenarioText": "Kinetic Energy Corp is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section E, Internal Controls. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Kinetic Energy Corp identifies a risk that its turbines may fail, causing production downtime and safety incidents. The risk likelihood is remote but impact is severe. Which response is most appropriate?",
        "Choices": [
          "Eliminate all turbine production permanently",
          "Ignore the risk because likelihood is remote",
          "Guarantee that no failure will ever occur",
          "Implement controls to reduce risk, transfer through insurance, or accept if cost of control exceeds benefit"
        ],
        "Correct": "Implement controls to reduce risk, transfer through insurance, or accept if cost of control exceeds benefit",
        "Explanation": "Under the COSO Enterprise Risk Management Framework, risk response strategies fall into four categories: avoidance (exiting the activity), reduction (implementing controls to lower likelihood or impact), sharing (transferring via insurance or outsourcing), and acceptance (taking no action when the cost of control exceeds the benefit). For Kinetic Energy Corp's turbine failure risk — remote likelihood but severe impact — a single response is rarely sufficient. Implementing controls to reduce the risk, transferring residual exposure through insurance, and accepting the remaining portion after a cost-benefit analysis represents a prudent, layered risk response. \"Eliminate all turbine production permanently\" represents risk avoidance, which is disproportionate for a remote-likelihood risk and would destroy the business's core operations. \"Ignore the risk because likelihood is remote\" incorrectly assumes that low likelihood alone justifies inaction, ignoring the severe impact dimension. \"Guarantee that no failure will ever occur\" is impossible in practice; no control system can eliminate all risk.",
        "Topic": "Risk assessment",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B22-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Kinetic Energy Corp is redesigning its purchase-to-pay process. Which segregation of duties violation is most concerning?",
        "Choices": [
          "The internal auditor reports findings to the audit committee",
          "The controller reviews monthly bank reconciliations",
          "The same employee can create a purchase order, receive goods, and approve payment",
          "The warehouse manager conducts periodic inventory counts"
        ],
        "Correct": "The same employee can create a purchase order, receive goods, and approve payment",
        "Explanation": "Under the COSO Internal Control Framework, segregation of duties is a fundamental control activity that divides transaction processing responsibilities among different individuals to reduce the risk of error or fraud. The three incompatible functions in the expenditure cycle are authorization (creating purchase orders), custody (receiving goods), and record-keeping/payment approval (approving vendor payments). When the same employee at Kinetic Energy Corp performs all three, they could create a fictitious purchase order, falsely confirm receipt of goods that were never delivered, and approve payment to a fraudulent vendor. \"The internal auditor reports findings to the audit committee\" describes proper governance — internal audit should report directly to the audit committee to maintain independence. \"The controller reviews monthly bank reconciliations\" is a detective control and represents appropriate oversight, not a segregation concern. \"The warehouse manager conducts periodic inventory counts\" describes proper custody and verification procedures, with no incompatible function combination. The key principle is that no single employee should control all phases of a transaction from initiation to completion.",
        "Topic": "Segregation of duties",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B22-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Kinetic Energy Corp's management is documenting controls for financial reporting. Which control is an example of an IT general control?",
        "Choices": [
          "A report that flags unmatched invoices",
          "Input validation on a purchase order screen",
          "Automated three-way match in the ERP system",
          "User access management and program change controls"
        ],
        "Correct": "User access management and program change controls",
        "Explanation": "Under the COSO framework and IT governance standards, information technology controls are categorized as IT general controls (ITGCs) or application controls. ITGCs apply across all systems and include user access management, program change controls, computer operations, and systems development controls. Application controls, by contrast, are specific to individual business processes or transactions. Kinetic Energy Corp's user access management and program change controls operate at the system-wide level, making them ITGCs. \"A report that flags unmatched invoices\" is an application control — it operates on a specific transaction type within the accounts payable process. \"Input validation on a purchase order screen\" is an application control — it validates data entry at the point of input for a specific business function. \"Automated three-way match in the ERP system\" is an application control — it compares purchase order, receiving report, and invoice data for a specific procurement transaction. A common exam trap is confusing system-wide ITGCs with transaction-specific application controls.",
        "Topic": "IT controls",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B22-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Kinetic Energy Corp performs control self-assessments in each operating unit. Which statement best describes the purpose of a CSA?",
        "Choices": [
          "External auditors assume full responsibility for internal control",
          "CSA replaces the need for all other monitoring activities",
          "CSA is performed only when fraud is suspected",
          "Process owners evaluate control effectiveness and identify improvement opportunities"
        ],
        "Correct": "Process owners evaluate control effectiveness and identify improvement opportunities",
        "Explanation": "Under the COSO Internal Control Framework's Monitoring component, control self-assessment (CSA) is a technique in which process owners and operating personnel — those closest to the day-to-day controls — formally evaluate the design and operating effectiveness of controls within their areas of responsibility. For Kinetic Energy Corp, CSAs empower process owners to identify control weaknesses and improvement opportunities based on their direct operational knowledge. \"External auditors assume full responsibility for internal control\" is incorrect because management, not external auditors, bears responsibility for internal control over financial reporting; auditors provide independent assurance but do not assume ownership. \"CSA replaces the need for all other monitoring activities\" is incorrect because CSA is one component of the monitoring mix, complementing — not replacing — ongoing monitoring, separate evaluations, and internal audit reviews. \"CSA is performed only when fraud is suspected\" is incorrect because CSA is a proactive, ongoing monitoring technique applied regularly as part of the control environment, not a reactive fraud investigation tool.",
        "Topic": "Monitoring and evaluation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B22-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Kinetic Energy Corp wants to ensure clear communication of control responsibilities and financial reporting policies throughout the organization. Which COSO component does this primarily support?",
        "Choices": [
          "Risk assessment",
          "Control activities",
          "Information and communication",
          "Control environment"
        ],
        "Correct": "Information and communication",
        "Explanation": "Under the COSO Internal Control — Integrated Framework (2013), the Information and Communication component ensures that relevant, quality information is identified, captured, and communicated in a form and timeframe that enables personnel at all levels to carry out their internal control responsibilities. Kinetic Energy Corp's focus on clearly communicating control responsibilities and financial reporting policies throughout the organization directly supports this component by ensuring the downward, upward, and cross-functional flow of information. \"Risk assessment\" is incorrect because risk assessment involves identifying and analyzing risks to the achievement of objectives, not the communication of policies and responsibilities. \"Control activities\" is incorrect because control activities are the policies and procedures (such as approvals, verifications, and reconciliations) that help ensure management directives are carried out — not the communication infrastructure itself. \"Control environment\" is incorrect because the control environment sets the tone at the top through integrity, ethical values, board oversight, and organizational structure — while it influences communication, the specific function of disseminating policies and responsibilities falls under Information and Communication.",
        "Topic": "COSO framework",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section E",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B22-Q5"
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
    "CaseID": "CASE-B23",
    "Title": "Data Analytics and Systems Strategy",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Technology and Analytics",
    "EstimatedMinutes": 30,
    "ScenarioText": "Liberty Packaging is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section F, Technology and Analytics. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Liberty Packaging wants to build a central repository that captures structured transaction data from its ERP for reporting and analysis. Which type of system best serves this need?",
        "Choices": [
          "General ledger",
          "Data lake",
          "Data warehouse",
          "Blockchain"
        ],
        "Correct": "Data warehouse",
        "Explanation": "Under enterprise data architecture principles, a data warehouse is a centralized repository designed to store structured, processed, and transformed data extracted from operational systems such as ERPs, optimized for query, reporting, and business analysis. Liberty Packaging's need for a repository that captures structured transaction data for reporting and analysis is the classic data warehouse use case. \"General ledger\" is incorrect because the general ledger is a specific financial accounting module within the ERP that records financial transactions — it is a source system that feeds data to a warehouse, not the centralized analytical repository itself. \"Data lake\" is incorrect because a data lake stores raw, unstructured, or semi-structured data in its native format for future processing, whereas Liberty Packaging's requirement is for structured, ready-to-analyze data — the data warehouse domain. \"Blockchain\" is incorrect because blockchain is a distributed ledger technology designed for immutable, decentralized transaction recording with consensus mechanisms, not a repository optimized for business intelligence querying and reporting.",
        "Topic": "Data management",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B23-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Liberty Packaging wants to detect unusual patterns in procurement transactions that may indicate fraud. Which technique is best suited?",
        "Choices": [
          "Simple ratio calculation",
          "Manual spreadsheet review of all transactions",
          "Descriptive statistics of revenue only",
          "Data mining with anomaly detection algorithms"
        ],
        "Correct": "Data mining with anomaly detection algorithms",
        "Explanation": "Under data analytics methodology, data mining involves applying algorithms to large datasets to discover patterns, relationships, and anomalies that would not be apparent through manual review. Anomaly detection algorithms are specifically designed to identify transactions or patterns that deviate significantly from expected behavior — making them the most effective technique for Liberty Packaging's fraud detection objective. \"Simple ratio calculation\" is incorrect because while ratios can highlight broad trends, they lack the pattern-recognition sophistication needed to detect subtle or novel fraud patterns buried in large transaction volumes. \"Manual spreadsheet review of all transactions\" is incorrect because manual review of all procurement transactions is impractical at scale, prone to human error, and cannot systematically identify complex multi-variable anomalies. \"Descriptive statistics of revenue only\" is incorrect for two reasons: descriptive statistics merely summarize what happened rather than identifying outliers, and limiting analysis to revenue alone ignores procurement transactions where the fraud patterns would most likely appear. The power of data mining lies in its ability to process volumes of data across multiple dimensions that exceed human review capacity.",
        "Topic": "Data mining",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B23-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Liberty Packaging is implementing a new ERP system. The project team is currently configuring user roles and permissions. Which SDLC phase are they in?",
        "Choices": [
          "Requirements analysis",
          "Maintenance",
          "Testing",
          "Design and configuration"
        ],
        "Correct": "Design and configuration",
        "Explanation": "Under the Systems Development Life Cycle (SDLC) framework, the design and configuration phase follows requirements analysis and precedes testing. During this phase, the project team translates requirements into system specifications, including configuring user roles, permissions, workflows, screens, and reports within the ERP system. Liberty Packaging's activity of configuring user roles and permissions is squarely in the design and configuration phase. \"Requirements analysis\" is incorrect because the requirements phase involves gathering and documenting business needs and user requirements — defining what the system should do — not configuring how it will do it. \"Maintenance\" is incorrect because maintenance occurs after go-live and involves ongoing support, patches, and minor enhancements to a live production system. \"Testing\" is incorrect because testing occurs after configuration is complete and involves verifying that configured roles, permissions, and processes function as intended — testing the configuration that Liberty Packaging's team is currently building. The SDLC sequence is: planning, requirements analysis, design and configuration, development/build, testing, implementation, and maintenance.",
        "Topic": "Systems development life cycle",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B23-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Liberty Packaging uses a dashboard that shows real-time production yield, on-time delivery, and cost per unit. This combination of metrics is best described as:",
        "Choices": [
          "A strategic plan",
          "A balanced set of performance indicators incorporating efficiency, quality, and cost",
          "An external audit report",
          "A cash flow forecast"
        ],
        "Correct": "A balanced set of performance indicators incorporating efficiency, quality, and cost",
        "Explanation": "Under performance measurement and dashboard design principles, a well-constructed operational dashboard presents key performance indicators (KPIs) across multiple performance dimensions to give decision-makers a balanced, multi-faceted view of operations. Liberty Packaging's dashboard — showing real-time production yield (efficiency), on-time delivery (quality/customer service), and cost per unit (financial/cost) — exemplifies a balanced set of indicators spanning efficiency, quality, and cost. \"A strategic plan\" is incorrect because a strategic plan is a forward-looking document that defines long-term goals, objectives, and resource allocations, not a real-time operational display of current performance metrics. \"An external audit report\" is incorrect because an external audit report provides independent assurance on financial statements or internal controls, not real-time operational performance monitoring. \"A cash flow forecast\" is incorrect because a cash flow forecast projects future cash inflows and outflows, focused on liquidity and timing, rather than showing a multi-dimensional operational performance snapshot.",
        "Topic": "Data visualization",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B23-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Liberty Packaging wants to ensure that personally identifiable information collected from EU customers is handled properly. Which regulation imposes the most relevant requirements?",
        "Choices": [
          "FASB",
          "SOX",
          "COSO",
          "GDPR"
        ],
        "Correct": "GDPR",
        "Explanation": "The General Data Protection Regulation (GDPR) is the European Union's comprehensive data privacy regulation that governs the collection, processing, storage, and transfer of personal data of individuals located in the EU, regardless of where the processing entity is based. Liberty Packaging's collection of personally identifiable information from EU customers directly triggers GDPR compliance obligations, including requirements for consent, data subject access rights, data portability, breach notification, and the appointment of a data protection officer where applicable. \"FASB\" is incorrect because the Financial Accounting Standards Board establishes U.S. GAAP accounting standards for financial reporting, not data privacy regulations. \"SOX\" (Sarbanes-Oxley Act) is incorrect because SOX governs corporate financial reporting, internal controls, and auditor independence for U.S. public companies — it addresses financial reporting integrity, not personal data privacy. \"COSO\" is incorrect because COSO provides internal control and enterprise risk management frameworks that guide control design and evaluation, not binding data privacy regulations. A management accountant must recognize the extraterritorial reach of GDPR and its significant compliance implications for any organization handling EU personal data.",
        "Topic": "Data privacy and security",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section F",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B23-Q5"
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
    "CaseID": "CASE-B24",
    "Title": "Advanced Financial Reporting",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "External Financial Reporting Decisions",
    "EstimatedMinutes": 30,
    "ScenarioText": "Meadowbrook Farms is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section A, External Financial Reporting Decisions. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Meadowbrook Farms acquired a smaller competitor for $3,200,000. The fair value of identifiable net assets acquired was $2,700,000. How should Meadowbrook account for the excess?",
        "Choices": [
          "Recognize $500,000 as goodwill and test for impairment annually",
          "Record $500,000 as a gain on bargain purchase",
          "Amortize $500,000 over 10 years",
          "Recognize $500,000 as an expense immediately"
        ],
        "Correct": "Recognize $500,000 as goodwill and test for impairment annually",
        "Explanation": "Under ASC 805 (Business Combinations) and IFRS 3, goodwill arises when the consideration transferred exceeds the fair value of identifiable net assets acquired. For Meadowbrook Farms, the excess is $3,200,000 − $2,700,000 = $500,000, representing the value of unidentifiable assets such as brand reputation, customer relationships, and synergies expected from the acquisition. Goodwill is not amortized under either U.S. GAAP or IFRS; instead, it must be tested for impairment at least annually, and more frequently if impairment indicators arise. Recording the excess as a gain on bargain purchase is incorrect because a bargain purchase occurs only when the fair value of net assets exceeds the consideration paid — the opposite of Meadowbrook's situation. Amortization over 10 years reflects the outdated treatment of goodwill before ASC 350 and IFRS 3 eliminated systematic amortization. Immediate expensing is incorrect because the $500,000 represents a future economic benefit (an asset), not a period cost.",
        "Topic": "Business combinations",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B24-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Meadowbrook Farms reports warranty expense of $145,000 for financial reporting but deducts only $98,000 on its tax return. The tax rate is 25%. This difference will reverse in future periods. How should this be reported?",
        "Choices": [
          "Recognize a deferred tax liability of $47,000",
          "Recognize a deferred tax asset of $11,750",
          "Recognize a deferred tax liability of $11,750",
          "Recognize a deferred tax asset of $47,000"
        ],
        "Correct": "Recognize a deferred tax asset of $11,750",
        "Explanation": "Under ASC 740 (Income Taxes), a temporary difference arises when an expense is recognized in one period for financial reporting purposes but in a different period for tax purposes. Meadowbrook Farms recognized $145,000 of warranty expense for book purposes but only deducted $98,000 on its tax return, creating a $47,000 temporary difference ($145,000 − $98,000). Because the tax deduction will occur in future periods when the warranty costs are actually paid, this is a deductible temporary difference that gives rise to a deferred tax asset. The deferred tax asset equals $47,000 × 25% = $11,750. The $47,000 deferred tax asset option incorrectly treats the gross temporary difference rather than the tax-effected amount. The $11,750 deferred tax liability option confuses the direction — deferred tax liabilities arise from taxable temporary differences where the tax deduction occurs before the book expense. The $47,000 deferred tax liability option makes both errors simultaneously, applying the wrong direction and the wrong amount.",
        "Topic": "Income taxes",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B24-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Meadowbrook Farms holds 35% of the voting shares of a feed supplier and can exercise significant influence. Meadowbrook should account for this investment using:",
        "Choices": [
          "The fair value method only",
          "The equity method",
          "The cost method",
          "Consolidation"
        ],
        "Correct": "The equity method",
        "Explanation": "Under ASC 323 (Investments — Equity Method and Joint Ventures) and IAS 28 (Investments in Associates and Joint Ventures), an investor that holds 20% to 50% of the voting shares and can exercise significant influence over the investee must use the equity method. Meadowbrook Farms's 35% ownership stake falls squarely within this range, and the ability to exercise significant influence over the feed supplier is explicitly stated. Under the equity method, Meadowbrook would initially record the investment at cost and subsequently adjust the carrying amount to recognize its proportionate share of the supplier's earnings or losses, with dividends treated as a return of the investment. The fair value method alone is insufficient because it does not reflect the investor's share of the investee's underlying earnings — it is reserved for investments without significant influence. The cost method applies only when the investor lacks significant influence and the fair value is not readily determinable. Consolidation is required when the investor holds a controlling financial interest, typically more than 50% of voting shares.",
        "Topic": "Investments in equity securities",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B24-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Meadowbrook Farms changed its inventory valuation method from FIFO to weighted average to better reflect cost trends. This change should be applied:",
        "Choices": [
          "Only in the notes to the financial statements without changing inventory values",
          "Retrospectively with prior periods restated",
          "Prospectively only",
          "By recording a cumulative adjustment in current-year revenue"
        ],
        "Correct": "Retrospectively with prior periods restated",
        "Explanation": "Under ASC 250 (Accounting Changes and Error Corrections) and IAS 8 (Accounting Policies, Changes in Accounting Estimates and Errors), a voluntary change in accounting principle — such as switching from FIFO to weighted-average cost for inventory valuation — must be applied retrospectively. Retrospective application means Meadowbrook Farms must restate all prior periods presented in the financial statements as though the weighted-average method had always been used, adjusting the opening balance of retained earnings for the earliest period presented for the cumulative effect of the change. This ensures comparability and consistency across reporting periods, which are fundamental qualitative characteristics of financial reporting. The prospective-only approach is reserved for changes in accounting estimates (such as useful life or salvage value revisions), not changes in accounting principle. Recording a cumulative adjustment in current-year revenue is improper because the change affects cost of goods sold and inventory valuation, not revenue, and because it would distort the current period's operating results. Disclosure only in the notes without restating prior-period inventory values would violate the comparability requirement.",
        "Topic": "Accounting changes",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B24-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Meadowbrook Farms reports in two operating segments: Dairy and Crops. Dairy has revenue of $4,200,000, Crops has $2,100,000, and unallocated corporate revenue is $800,000. Total combined revenue is $7,100,000. The 10% revenue threshold for a reportable segment is:",
        "Choices": [
          "$630,000",
          "$420,000",
          "$7,100,000",
          "$800,000"
        ],
        "Correct": "$630,000",
        "Explanation": "Under IFRS 8 (Operating Segments) and ASC 280 (Segment Reporting), an operating segment is reportable if its reported revenue is 10% or more of the combined revenue of all operating segments. The combined revenue includes only revenue from operating segments, not unallocated corporate revenue. Meadowbrook Farms has two operating segments: Dairy with $4,200,000 and Crops with $2,100,000, yielding combined segment revenue of $6,300,000. The unallocated corporate revenue of $800,000 is excluded from the denominator. The 10% revenue threshold is therefore $6,300,000 × 10% = $630,000. $420,000 likely divides $4,200,000 (Dairy only) by 10 rather than using combined segment revenue. $7,100,000 incorrectly treats total combined revenue (including unallocated corporate revenue) as the threshold itself rather than computing 10% of qualifying revenue. $800,000 incorrectly uses only the unallocated corporate revenue, which is excluded from the threshold calculation by both IFRS 8 and ASC 280.",
        "Topic": "Segment reporting",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section A",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B24-Q5"
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
    "CaseID": "CASE-B25",
    "Title": "Budgeting Techniques and Analysis",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Planning, Budgeting, and Forecasting",
    "EstimatedMinutes": 30,
    "ScenarioText": "Nexus Automotive is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section B, Planning, Budgeting, and Forecasting. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Nexus Automotive builds its annual budget by starting with projected sales, then determining production, materials, labor, and overhead requirements. This sequence is an example of:",
        "Choices": [
          "Capital budgeting",
          "Kaizen budgeting",
          "Activity-based budgeting",
          "The master budget process flowing from the sales budget"
        ],
        "Correct": "The master budget process flowing from the sales budget",
        "Explanation": "The master budget is a comprehensive set of budgets covering all phases of an organization's operations for a specific period, and its preparation follows a logical, sequential flow that begins with the sales budget. At Nexus Automotive, starting with projected sales is the correct approach because sales volume drives production requirements, which in turn determine direct materials, direct labor, and manufacturing overhead budgets — all of which feed into the budgeted financial statements. This sales-driven sequencing is a foundational principle of master budgeting. Capital budgeting refers specifically to long-term investment planning for fixed assets and is a component within the master budget, not the overarching process itself. Kaizen budgeting emphasizes continuous, incremental improvement targets embedded in the budget rather than the sales-to-production sequencing. Activity-based budgeting uses activity cost drivers as the starting point rather than sales volume, focusing on the cost of activities required to produce and sell products.",
        "Topic": "Master budget",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B25-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Nexus Automotive incorporates continuous improvement targets into its budget, expecting a 3% reduction in material waste each quarter. Which budget approach is this?",
        "Choices": [
          "Zero-based budgeting",
          "Kaizen budgeting",
          "Incremental budgeting",
          "Static budgeting"
        ],
        "Correct": "Kaizen budgeting",
        "Explanation": "Kaizen budgeting is a budgeting approach rooted in the Japanese concept of continuous improvement (kaizen), where the budget incorporates explicit, systematic cost reduction targets over time. Nexus Automotive's expectation of a 3% reduction in material waste each quarter is a textbook example of kaizen budgeting — the budget is not merely a projection of current conditions but embeds an ongoing commitment to operational efficiency gains. This approach is frequently used in lean manufacturing environments where waste elimination and process refinement are core operating philosophies. Zero-based budgeting requires managers to justify every dollar of every budget line item from scratch each period, without reference to prior-period spending levels — there is no mention of re-justifying activities in the scenario. Incremental budgeting adjusts the prior year's budget by a fixed percentage or anticipated change, which is the opposite of building in explicit improvement targets. A static budget is prepared for a single level of activity and does not incorporate continuous improvement expectations — it is a fixed benchmark, not a tool for driving change.",
        "Topic": "Budgeting concepts",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B25-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Nexus Automotive projects that each additional dollar spent on preventive maintenance reduces repair costs by $0.40. If the budget for preventive maintenance is $75,000, what is the maximum expected reduction in repair costs?",
        "Choices": [
          "$40,000",
          "$75,000",
          "$30,000",
          "$187,500"
        ],
        "Correct": "$30,000",
        "Explanation": "This question applies a simple proportional cost-benefit relationship to forecast the impact of preventive maintenance spending on repair costs. For each additional dollar spent on preventive maintenance, Nexus Automotive expects repair costs to decline by $0.40. With a preventive maintenance budget of $75,000, the maximum expected reduction in repair costs is $75,000 × 0.40 = $30,000. This modeling approach is analogous to regression-based forecasting, where the slope coefficient measures the expected change in the dependent variable (repair costs) per unit change in the independent variable (preventive maintenance spending). The $40,000 option likely results from applying an incorrect coefficient of approximately $0.533 to the $75,000 budget. The $75,000 option incorrectly assumes a dollar-for-dollar relationship (a coefficient of 1.0) between spending and reduction. The $187,500 option incorrectly divides $75,000 by 0.40 rather than multiplying, reversing the relationship entirely.",
        "Topic": "Forecasting techniques",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B25-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Nexus Automotive prepares a budget at 85,000 units of activity and then calculates what costs should be at 78,000 and 92,000 units. Which type of budget provides this capability?",
        "Choices": [
          "Continuous budget",
          "Capital budget",
          "Flexible budget",
          "Static budget"
        ],
        "Correct": "Flexible budget",
        "Explanation": "A flexible budget is a budget that adjusts or flexes for changes in the volume of activity, enabling performance evaluation across a range of activity levels rather than at a single point. Nexus Automotive computes budgeted costs at 85,000 units and then determines what costs should be at both 78,000 and 92,000 units — this is the defining characteristic of a flexible budget. The key advantage for performance evaluation is that actual costs can be compared to the budgeted costs at the actual level of activity achieved, isolating genuine cost control issues from volume-driven variances. A continuous (rolling) budget adds a future period as each current period expires, maintaining a constant planning horizon, but does not inherently provide multi-level cost calculations. A capital budget addresses long-term investment decisions and is unrelated to operating cost behavior across activity levels. A static budget is prepared for a single, fixed level of activity and cannot be adjusted when actual volume differs from the planned level.",
        "Topic": "Flexible budgeting",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B25-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Nexus Automotive budgeted sales of 8,000 units at $215 per unit. Actual units sold were 8,600 at an average price of $210. What is the sales price variance?",
        "Choices": [
          "$129,000 favorable",
          "$43,000 unfavorable",
          "$40,000 unfavorable",
          "$43,000 favorable"
        ],
        "Correct": "$43,000 unfavorable",
        "Explanation": "The sales price variance isolates the effect of selling price differences, holding volume constant at actual units sold. The formula is: (actual selling price − budgeted selling price) × actual units sold. For Nexus Automotive: ($210 − $215) × 8,600 = −$5 × 8,600 = $43,000 unfavorable. The variance is unfavorable because the actual average price of $210 is below the budgeted price of $215 — Nexus earned $5 less per unit than planned across all 8,600 units sold. It is important to distinguish this from the sales volume variance, which isolates the volume effect by holding price constant, and from the total sales variance, which combines both price and volume effects. $129,000 favorable appears to have multiplied the price difference by budgeted units rather than actual units. $40,000 unfavorable likely used the wrong unit count or a rounding approximation. $43,000 favorable incorrectly labels the direction — actual price below budgeted price always produces an unfavorable price variance.",
        "Topic": "Sales variances",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section B",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B25-Q5"
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
    "CaseID": "CASE-B26",
    "Title": "Comprehensive Performance Management",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Performance Management",
    "EstimatedMinutes": 30,
    "ScenarioText": "Omega Instruments is preparing for a CMA-style review meeting. The controller provides operating facts, draft analyses, and management questions tied to CMA Part 1 Section C, Performance Management. The team must apply the underlying concepts rather than memorize labels. Use the facts in each item and select or calculate the best response. This original case set is designed to mirror the short business-case flow expected in 2026 while staying within Part 1 learning outcomes.",
    "Items": [
      {
        "Type": "select",
        "Prompt": "Omega Instruments's Assembly division budgeted 11,200 direct labor hours for March but actually used 11,900 hours. Standard rate is $22 per hour. Actual rate paid was $22.80 per hour. What is the labor efficiency variance?",
        "Choices": [
          "$15,400 favorable",
          "$5,880 unfavorable",
          "$15,400 unfavorable",
          "$9,520 unfavorable"
        ],
        "Correct": "$15,400 unfavorable",
        "Explanation": "The labor efficiency (quantity) variance measures whether workers used more or fewer hours than the standard allowed for the actual output, evaluated at the standard rate to isolate the efficiency effect. The formula is: standard rate × (actual hours − standard hours allowed). Omega Instruments used 11,900 actual hours against a standard allowance of 11,200 hours. At the standard rate of $22 per hour: $22 × (11,900 − 11,200) = $22 × 700 = $15,400 unfavorable. The variance is unfavorable because workers required 700 more hours than the standard allowed, consuming more labor resources than planned. The actual rate of $22.80 is deliberately excluded from this calculation — it affects only the labor rate (price) variance, not the efficiency variance. $5,880 unfavorable may result from misapplying the rate difference to the efficiency calculation. $15,400 favorable incorrectly labels the direction — using more hours than standard is unfavorable, not favorable. $9,520 unfavorable likely computed the labor rate variance instead ($22.80 − $22.00) × 11,900 = $9,520 U.",
        "Topic": "Labor efficiency variance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B26-Q1"
      },
      {
        "Type": "select",
        "Prompt": "Omega Instruments applies variable overhead at $6.50 per direct labor hour. Actual variable overhead was $76,585 and actual hours were 11,900. What is the variable overhead spending variance?",
        "Choices": [
          "$76,585 unfavorable",
          "$765 unfavorable",
          "$4,550 unfavorable",
          "$765 favorable"
        ],
        "Correct": "$765 favorable",
        "Explanation": "The variable overhead spending variance measures whether the actual variable overhead cost per unit of the allocation base (here, direct labor hours) differs from the standard rate. The formula is: actual variable overhead − (standard variable overhead rate × actual hours). For Omega Instruments, actual variable overhead was $76,585, and the expected cost at the standard rate applied to actual hours is $6.50 × 11,900 = $77,350. The difference is $76,585 − $77,350 = −$765, which is $765 favorable because actual spending was lower than the standard would predict for the actual level of activity. Note that the spending variance differs from the variable overhead efficiency variance, which compares actual hours to standard hours allowed at the standard rate — this variance isolates only the price/spending component. $76,585 unfavorable incorrectly treats the entire actual cost as the variance. $765 unfavorable reverses the direction. $4,550 unfavorable may have compared actual variable overhead to a budgeted amount based on the original planned hours rather than actual hours.",
        "Topic": "Variable overhead variance",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B26-Q2"
      },
      {
        "Type": "select",
        "Prompt": "Omega Instruments measures manufacturing cycle efficiency by dividing processing time by total cycle time. Which scenario indicates the highest efficiency?",
        "Choices": [
          "Processing time of 5 hours, inspection time of 0.5 hours, move time of 0.5 hours, queue time of 1 hour",
          "Processing time of 2 hours, inspection time of 0.5 hours, move time of 0.5 hours, queue time of 0.5 hours",
          "Processing time of 4 hours, inspection time of 1 hour, move time of 1 hour, queue time of 2 hours",
          "Processing time of 3 hours, inspection time of 2 hours, move time of 2 hours, queue time of 3 hours"
        ],
        "Correct": "Processing time of 5 hours, inspection time of 0.5 hours, move time of 0.5 hours, queue time of 1 hour",
        "Explanation": "Manufacturing cycle efficiency (MCE) measures the proportion of total cycle time that is spent on value-added processing activities. The formula is MCE = processing time ÷ total cycle time, where total cycle time includes processing time, inspection time, move time, and queue time. Higher MCE ratios indicate that more of the total throughput time is devoted to actually transforming the product rather than waiting, moving, or being inspected. For the scenario with 5 hours processing time: total cycle time = 5 + 0.5 + 0.5 + 1 = 7 hours, MCE = 5 ÷ 7 = 71.4%. For the scenario with 2 hours processing time: total cycle time = 2 + 0.5 + 0.5 + 0.5 = 3.5 hours, MCE = 2 ÷ 3.5 = 57.1%. For the scenario with 4 hours processing time: total cycle time = 4 + 1 + 1 + 2 = 8 hours, MCE = 4 ÷ 8 = 50.0%. For the scenario with 3 hours processing time: total cycle time = 3 + 2 + 2 + 3 = 10 hours, MCE = 3 ÷ 10 = 30.0%. The scenario with 5 hours of processing and the lowest non-processing time yields the highest MCE at 71.4%. A common error is to assume the highest absolute processing time cannot yield the best ratio, but MCE is a relative measure — the low inspection, move, and queue times more than compensate.",
        "Topic": "Manufacturing cycle efficiency",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B26-Q3"
      },
      {
        "Type": "select",
        "Prompt": "Omega Instruments uses a responsibility accounting system. The manager of the Calibration Division can influence revenues, variable costs, and some fixed costs but does not make capital expenditure decisions. This division should be evaluated as:",
        "Choices": [
          "A revenue center",
          "A profit center",
          "An investment center",
          "A cost center"
        ],
        "Correct": "A profit center",
        "Explanation": "Under responsibility accounting, organizational units are classified based on the financial outcomes for which their managers are held accountable. A profit center manager has authority over both revenues and costs — effectively responsible for the unit's operating income. The Calibration Division manager at Omega Instruments influences revenues, variable costs, and some fixed costs, which fits the profit center profile precisely. The key distinguishing factor is that this manager does not make capital expenditure decisions, meaning the division is not an investment center. A revenue center manager would be responsible only for generating revenue (such as a sales territory), with no authority over costs — but the scenario explicitly states the manager influences costs. A cost center manager is responsible only for minimizing costs for a given level of output or service, with no influence over revenue generation — this does not match the Calibration Division's scope of authority. An investment center manager has authority over revenues, costs, and capital investment decisions, which exceeds the authority described.",
        "Topic": "Responsibility accounting",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B26-Q4"
      },
      {
        "Type": "select",
        "Prompt": "Omega Instruments wants to align executive bonus compensation with long-term shareholder value creation rather than short-term earnings. Which performance metric best supports this objective?",
        "Choices": [
          "Economic value added",
          "Direct material price variance",
          "Sales volume variance",
          "Standard cost variance"
        ],
        "Correct": "Economic value added",
        "Explanation": "Economic value added (EVA) is a residual income-based performance metric that measures the value a business unit creates in excess of the required return on invested capital. EVA = net operating profit after taxes (NOPAT) − (invested capital × weighted average cost of capital). By explicitly charging for the cost of all capital employed — both debt and equity — EVA aligns management incentives with long-term shareholder value creation. Omega Instruments's objective of linking executive bonuses to long-term value rather than short-term earnings is precisely what EVA is designed to achieve: managers are rewarded only when returns exceed the firm's cost of capital, discouraging decisions that inflate short-term accounting earnings while destroying economic value. The direct material price variance, sales volume variance, and standard cost variance are all short-term, single-period operational metrics. These variance measures focus on narrow cost or revenue components and do not account for the capital invested to generate those results. A manager evaluated solely on these variances might reduce costs by deferring necessary maintenance or purchasing lower-quality materials, actions that boost short-term variances at the expense of long-term value.",
        "Topic": "Incentive compensation",
        "StudyLinks": [
          {
            "label": "IMA CMA Learning Outcome Statements, Section C",
            "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
          }
        ],
        "question_state": "Certified",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ProductionStatus": "Draft",
        "ItemID": "CASE-B26-Q5"
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

