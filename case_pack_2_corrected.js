// CMA Part 1 Exam Simulator — Case Pack 2 (25 Cases)
// Generated: SESSION 916-917 Case Study Reconsolidation
// Source: Consolidated from scored_cases.js through scored_cases5.js
// Architecture: 3-pack × 25-case structure for 2026 blueprint alignment

const CASE_PACK_2 = [
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
    "EstimatedMinutes": 30,
    "ExhibitCount": 1,
    "LastValidated": "2026-07-20",
    "CompanyName": "Vertex Solutions",
    "CompanyType": "Service provider",
    "Industry": "Technology services",
    "Stakeholder": "Vertex Solutions (Controller)",
    "BusinessFunction": "Revenue accounting",
    "LearningObjectives": [
      "Analyze revenue recognition under ASC 606",
      "Analyze inventory valuation methods (FIFO, LIFO, weighted average)"
    ],
    "ProductionStatus": "Production",
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
      }
    ],
    "question_state": "Certified",
    "pack_state": "Production",
    "pedagogical_cluster": "",
    "question_tier": "Ungraded",
    "question_status": "Active"
  },
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
    "EstimatedMinutes": 25,
    "ExhibitCount": 1,
    "LastValidated": "2026-07-20",
    "CompanyName": "Meridian Logistics",
    "CompanyType": "Service provider",
    "Industry": "Logistics",
    "Stakeholder": "Meridian Logistics (Controller)",
    "BusinessFunction": "Financial reporting",
    "LearningObjectives": [
      "Analyze lease accounting under ASC 842"
    ],
    "ProductionStatus": "Production",
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
    "pack_state": "Production",
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
    "EstimatedMinutes": 30,
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
          "Depreciation expense": "Add back to Net Income (Operating) — non-cash expense that reduced net income but did not consume cash",
          "Gain on sale of asset": "Deduct from Net Income (Operating) — remove non-operating gain included in net income that belongs in investing activities",
          "Decrease in inventory": "Add to Net Income (Operating) — decrease in current asset released cash, increasing operating cash flow",
          "Decrease in accounts payable": "Deduct from Net Income (Operating) — decrease in current liability consumed cash, reducing operating cash flow"
        },
        "Explanation": "Under the indirect method (ASC 230), net income is adjusted for non-cash items and changes in working capital to derive operating cash flow. Depreciation is a non-cash expense that reduced net income — it is added back because no cash was consumed. Gains on asset sales inflate net income but are investing activities — they must be deducted from operating cash flow to remove the non-operating gain. A decrease in inventory means less cash was tied up in inventory — this is added to operating cash flow. A decrease in accounts payable means more cash was used to pay suppliers than the expense recognized — this is deducted from operating cash flow. The key exam distinction: non-cash addbacks (depreciation, amortization) vs. working capital adjustments (changes in current assets and liabilities).",
        "Topic": "Cash Flows",
        "LeftItems": [
          "Depreciation expense",
          "Gain on sale of asset",
          "Decrease in inventory",
          "Decrease in accounts payable"
        ],
        "RightItems": [
        "Add to Net Income (Operating) — decrease in current asset released cash, increasing operating cash flow",
        "Deduct from Net Income (Operating) — decrease in current liability consumed cash, reducing operating cash flow",
        "Add back to Net Income (Operating) — non-cash expense that reduced net income but did not consume cash",
        "Deduct from Net Income (Operating) — remove non-operating gain included in net income that belongs in investing activities",
        "Report in Investing Activities — cash flow from purchase or sale of long-term assets"
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
    "CompanyName": "Orion Corp",
    "CompanyType": "Manufacturer",
    "Industry": "Technology",
    "Stakeholder": "Orion Corp (CFO)",
    "BusinessFunction": "Financial reporting",
    "LearningObjectives": [
      "Analyze long-lived asset accounting including impairment",
      "Analyze intangible asset recognition and amortization"
    ],
    "ProductionStatus": "Production",
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
    "Items": [
      {
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
        "Not amortized, tested for impairment at least annually",
        "Not amortized, tested for impairment at reporting unit level",
        "Amortized over useful life, tested for impairment if triggering event",
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
      }
    ],
    "question_state": "Certified",
    "pack_state": "Production",
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
    "EstimatedMinutes": 30,
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
        "Increase both collections and COGS projections in the forecast",
        "Defer purchase to February, increasing January cash available",
        "Issue new shares of common stock to raise additional cash",
        "Increase reliance on the line of credit in January",
        "Negotiate extended payment terms with suppliers",
        "Liquidate long-term investments to cover the shortfall"
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
    "EstimatedMinutes": 30,
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
        "Relies on expert judgment when historical data is limited",
        "Splits costs into fixed and variable components using regression",
        "Smooths random fluctuations by averaging consecutive periods",
        "Applies periodic multipliers to account for recurring patterns",
        "Projects future values based on historical growth rates"
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
    "EstimatedMinutes": 25,
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
        "Explanation": "A rolling budget (also known as a continuous budget or perpetual budget) is a budget that is continuously updated by adding a new period (month or quarter) as the current period is completed, maintaining a constant planning horizon. Under this approach, Highland Retail would drop January and add April once January closes, always maintaining a forward-looking window of the same length. Rolling budgets are a fundamental planning tool in CMA Part 1 Section B (Planning, Budgeting, and Forecasting) and offer a key advantage over static annual budgets: they prevent the organization from operating in the final months of a fiscal year with a nearly expired plan. For Highland Retail's cash collections scenario, a rolling budget would ensure Q2 collection assumptions are continually refreshed with the most recent actual data from February and March, improving forecast accuracy for April and May credit sales collections. A common CMA exam trap is to confuse a rolling budget with a flexible budget — the flexible budget adjusts costs for different activity levels, while the rolling budget extends the time horizon.",
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
    "pack_state": "Production",
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
    "EstimatedMinutes": 30,
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
        "Units sold x Selling price",
        "Predetermined OH rate x Actual activity",
        "Actual DLH x Variable OH rate per DLH",
        "Remains constant within the relevant range",
        "Units produced x DLH per unit x Wage rate"
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
    "EstimatedMinutes": 30,
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
    "EstimatedMinutes": 20,
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
        "Financial — revenue growth",
        "Financial — profitability",
        "Financial — cost efficiency",
        "Customer — satisfaction",
        "Financial — liquidity and investment"
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
        "Customer — customer retention",
        "Financial — revenue growth",
        "Customer — operational excellence",
        "Customer — customer loyalty and satisfaction",
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
        "Supplier management — quality assurance",
        "Inventory management — efficiency",
        "Customer management — satisfaction",
        "Operations management — quality",
        "Operations management — cycle time"
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
        "Information capital — technology infrastructure",
        "Human capital — employee skills and competencies",
        "Human capital — leadership development",
        "Financial capital — investment returns",
        "Organization capital — culture and alignment"
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
        "Lagging indicator — employee turnover rate",
        "Lagging indicator — measures the outcome of past strategic actions",
        "Leading indicator — investments in human capital drive future performance",
        "Leading indicator — customer satisfaction predicts future revenue",
        "Leading indicator — operational quality drives customer retention"
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
    "EstimatedMinutes": 35,
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
    "Stakeholder": "Management",
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
        "Type": "match",
        "Prompt": "Apex Components faces four distinct business scenarios. Match each scenario to the most appropriate transfer pricing method.",
        "LeftItems": [
          "Division A has excess capacity and Division B needs 40,000 chips; no external buyer exists for these units",
          "Division A sells identical chips externally at $50; the chip market is highly competitive with many suppliers",
          "Division A's chips are customized for Division B and have no external market; costs are stable and well-documented",
          "Division A is located in a low-tax country; Division B is in a high-tax country; the company wants to minimize total global tax"
        ],
        "RightItems": [
        "Full cost plus markup — cost-based pricing is appropriate when no market benchmark exists; a markup ensures the selling division earns a reasonable return",
        "Negotiated or manipulated transfer price — tax-minimization strategies may justify prices that differ from pure economic transfer pricing, subject to arm's-length compliance",
        "Variable cost — with idle capacity, the opportunity cost is zero, so any transfer price above variable cost adds to company profit without sacrificing external sales",
        "Dual pricing — credit the selling division at market price and charge the buying division at cost to resolve goal conflicts",
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
    "EstimatedMinutes": 30,
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
    "Stakeholder": "Management",
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
        "Production volume variance — measures fixed overhead capacity utilization",
        "Sales volume variance — (Actual Units − Budgeted Units) × Standard Contribution Margin per Unit = (12,000 − 10,000) × $25 = $50,000 F",
        "Fixed overhead spending variance — Actual FOH − Budgeted FOH = $185,000 − $180,000 = $5,000 U",
        "Flexible budget variable cost variance — Sum of (actual cost − standard cost × actual units) for DM, DL, VOH, VS&A",
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
    "Stakeholder": "Management",
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
    "EstimatedMinutes": 30,
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
        "Selling and administrative expense — period cost under both methods, never inventoried",
        "Product cost — direct materials (variable, traceable to units produced)",
        "Period cost — fixed manufacturing overhead (expensed in period incurred under variable costing)",
        "Inventoriable cost — absorbed into inventory under both costing methods",
        "Product cost — direct labor (variable, traceable to units produced)",
        "Product cost — variable manufacturing overhead (indirect, varies with production volume)"
],
        "Correct": {
          "Direct materials": "Product cost — direct materials (variable, traceable to units produced)",
          "Direct labor": "Product cost — direct labor (variable, traceable to units produced)",
          "Variable manufacturing overhead": "Product cost — variable manufacturing overhead (indirect, varies with production volume)",
          "Fixed manufacturing overhead": "Period cost — fixed manufacturing overhead (expensed in period incurred under variable costing)"
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
    "EstimatedMinutes": 30,
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
        "Applied overhead divided by estimated activity",
        "Applied OH exceeds actual OH incurred",
        "Estimated OH divided by estimated activity base",
        "Actual overhead divided by actual activity base",
        "Activity base that causes overhead costs",
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
    "EstimatedMinutes": 20,
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
        "Materials purchased but not yet sold",
        "Sales price minus direct materials",
        "All costs except direct materials",
        "Contribution margin per unit",
        "Net operating income",
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
        "Production pace that matches customer demand rate",
        "Just-in-time (JIT) — a philosophy of producing only what is needed, when needed",
        "Visual signal that authorizes production",
        "Arranges machines in sequence to reduce movement and WIP",
        "Continuous incremental improvement involving all employees",
        "Value stream mapping — documents the flow of materials and information from supplier to customer"
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
    "EstimatedMinutes": 20,
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
        "Performance",
        "Governance and Culture",
        "Review and Revision",
        "Information, Communication, and Reporting",
        "Strategy and Objective-Setting"
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
        "Acceptance — monitor competitor pricing and differentiate through quality and service",
        "Acceptance — the cost of mitigation exceeds the potential impact; budget for compliance",
        "Mitigation — implement ERP upgrade project with dedicated budget and timeline",
        "Avoidance — discontinue all products in the affected category"
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
        "Information and Communication — report the findings to the board",
        "Assess substantial change — third-party risk from supplier breach affects MedTech's risk profile",
        "Assess substantial change — the acquisition introduces new risks that must be integrated into the ERM program",
        "Assess substantial change — regulatory changes may require updates to compliance risk assessments",
        "Pursue improvement in ERM — the risk identification process should be enhanced to capture emerging risks proactively"
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
        "Review and Revision — evaluates ERM effectiveness",
        "Governance and Culture — establishes tone at the top and risk culture",
        "Information, Communication, and Reporting — delivers risk data to decision-makers",
        "Strategy and Objective-Setting — integrates risk with strategic planning",
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
    "EstimatedMinutes": 30,
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
    "Stakeholder": "Management",
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
        "Type": "match",
        "Prompt": "FFCU has identified four business functions that require different recovery strategies. Match each function to the most appropriate recovery approach based on Exhibits 1 and 2.",
        "LeftItems": [
          "Online banking platform — RTO 2 hours; RPO 15 minutes; critical to member trust and regulatory compliance",
          "Loan origination system — RTO 24 hours; RPO 4 hours; moderate impact if unavailable for a day",
          "Human resources portal — RTO 72 hours; RPO 24 hours; low criticality, can tolerate extended downtime",
          "Teller transaction processing — RTO 4 hours; RPO 1 hour; high impact on branch operations"
        ],
        "RightItems": [
        "Warm site — pre-configured hardware and network connectivity available; load backup data and resume operations within 24 hours",
        "Cold site or manual workaround — empty facility with power/cooling; acceptable for low-criticality functions that can be deferred",
        "Ignore — the function does not need any recovery plan",
        "Hot site or DRaaS — replicate systems in near-real-time to a geographically separate facility; automated failover within minutes",
        "Warm site with data replication — pre-staged environment with hourly data replication to meet the 4-hour RTO and 1-hour RPO"
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
    "EstimatedMinutes": 20,
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
    "EstimatedMinutes": 30,
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
    "Stakeholder": "Management",
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
        "Scatter plot with trend line — reveals correlation between two continuous variables; shows outliers",
        "Treemap or pie chart — effective for showing part-to-whole relationships with limited categories",
        "Bar chart sorted descending — enables rapid visual comparison across categories; best for ranking",
        "3D pie chart — visually engaging option that management prefers for presentations",
        "Line chart — best for continuous data over time; clearly shows trend direction, seasonality, and inflection points"
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
        "Type": "match",
        "Prompt": "Insight Analytics trains the client's finance team on data storytelling. Match each data presentation goal to the visualization approach that BEST achieves it.",
        "LeftItems": [
          "Show that Q4 sales are consistently higher than other quarters across three years",
          "Identify which product categories have profit margins significantly above or below the company average",
          "Communicate to the board that the company achieved its revenue target despite economic headwinds",
          "Compare each store's actual sales to its individual target and prior year performance"
        ],
        "RightItems": [
        "Bullet chart for each store — shows actual vs target vs prior year in a compact, single-bar format with comparative benchmarks",
        "Annotated KPI dashboard with trend arrow and variance callout — headline number, trend line, and contextual narrative guide interpretation",
        "Diverging bar chart centered on the average — categories extending right are above average; left are below; zero line provides immediate reference",
        "3D exploded pie chart — makes the presentation visually impressive for the board meeting",
        "Small multiples (three line charts side by side) — enables comparison of quarterly patterns across years while maintaining consistent scale"
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
    "Stakeholder": "Management",
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
        "On-premise — maximum control over all layers; customer manages everything including physical security; appropriate for highly regulated data",
        "SaaS — software is fully managed by the vendor and accessed via browser; the customer manages only data and user access",
        "Community cloud — shared infrastructure among several organizations with common compliance concerns",
        "IaaS — provides virtualized computing resources; customer manages OS, middleware, runtime, applications, and data; vendor manages physical infrastructure",
        "PaaS — provides development platform and runtime environment; vendor manages infrastructure, OS, and middleware; customer manages applications and data"
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
        "Public cloud — resources shared across multiple organizations; lowest cost but least control; appropriate for development, testing, and non-sensitive workloads",
        "Private cloud — dedicated infrastructure for a single organization; provides the highest security and compliance control while avoiding data center capital costs",
        "Public cloud (rapid deployment) — quick provisioning, pay-as-you-go pricing; ideal for acquisitions, temporary workloads, or rapid scaling without capital investment",
        "Hybrid cloud — combination of public and private; allows sensitive data to remain in private cloud while leveraging public cloud for elasticity",
        "Community cloud — shared infrastructure among several organizations with common compliance concerns (e.g., HIPAA, FDA); balances cost and compliance"
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
  }
];

// UI Catalog Aliases — resolves the 0-case display bug for Packs A/E
const CASE_BANK_B = CASE_PACK_2;
const MIGRATED_CASE_BASE_B = CASE_PACK_2;
const CASE_BANK_E = CASE_PACK_2;
const MIGRATED_CASE_BASE_E = CASE_PACK_2;
