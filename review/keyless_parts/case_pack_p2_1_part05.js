 + $4,400,000 = $7,200,000). Verified twice."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 2, compute Northwind Ceramics' FY2025 net profit margin as a percentage of net sales. Enter the percentage rounded to two decimal places (digits only).",
        "Correct": "6.00",
        "Explanation": "Governing principle: profitability ratios measure how much of each sales dollar becomes profit after all costs and taxes (financial statement analysis standards). Net profit margin = Net income / Net sales = $750,000 / $12,500,000 = 0.0600 = 6.00%. In board terms, Northwind kept about six cents of every FY2025 sales dollar. A common trap is dividing net income by total assets or equity instead of sales, which produces turnover or return measures rather than margin.",
        "Topic": "Profitability ratios",
        "Subtopic": "Net profit margin",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net profit margin = Net income / Net sales",
        "CommonTrapReference": "Dividing net income by assets or equity instead of sales produces turnover or ROE, not margin",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using three-step DuPont decomposition with the year-end balances shown in Exhibits 2 and 3, compute Northwind Ceramics' FY2025 return on equity as a percentage. Round to two decimal places (digits only).",
        "Correct": "15.63",
        "Explanation": "Governing principle: the three-step DuPont model decomposes ROE into margin, activity, and leverage. ROE = Net profit margin x Total asset turnover x Equity multiplier = 0.0600 x 1.5625 x 1.6667 = 15.63%. Cross-check: Net income / Equity = $750,000 / $4,800,000 = 15.63%, confirming internal consistency of the exhibits. Economically, Northwind earned about 15.6 cents per dollar of shareholder capital in FY2025. The common trap is importing an average-balance convention into a presentation whose stated basis is year-end balances.",
        "Topic": "Return on equity",
        "Subtopic": "DuPont decomposition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ROE = Margin x Turnover x Equity Multiplier",
        "CommonTrapReference": "Mixing average-balance conventions into a year-end balance presentation distorts turnover",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "At the strategy session, Elena must attribute the year-over-year ROE decline to its source. Based on Exhibits 2 and 3, which statement should she present?",
        "Choices": [
          "Total asset turnover improved enough to offset most of the margin decline.",
          "Financial leverage fell during FY2025 and dragged ROE down with it.",
          "Net profit margin contracted from 7.50% to 6.00% and is the primary driver of the ROE decline.",
          "Deterioration in times interest earned is the main reason ROE declined."
        ],
        "Correct": "C",
        "Explanation": "Governing principle: DuPont diagnosis attributes ROE change to its components rather than to non-DuPont ratios. Holding FY2024 turnover (1.64) and multiplier (1.64) constant, the margin fall from 7.50% to 6.00% alone would cut ROE from 20.11% to about 16.09%, roughly four points - far larger than the turnover drag (under one point), while higher leverage actually cushions the fall. EBIT dropped from $1,440,000 to $1,240,000 despite higher sales, confirming margin weakness. Traps: blaming leverage reverses its favorable direction; times interest earned is not a DuPont component at all.",
        "Topic": "Ratio trend interpretation",
        "Subtopic": "Component attribution",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Attributing ROE declines to leverage when leverage rose and cushioned the fall",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "The company's lender reviews Northwind's credit file annually. Compute FY2025 times interest earned from Exhibit 2 and choose the correct figure.",
        "Choices": [
          "4.13 times, computed as net income plus interest expense divided by interest expense.",
          "5.17 times, computed as operating income (EBIT) divided by interest expense.",
          "4.17 times, computed as pre-tax income divided by interest expense.",
          "6.89 times, computed as EBIT divided by after-tax interest expense."
        ],
        "Correct": "B",
        "Explanation": "Governing principle: coverage ratios compare operating profit available to service debt against financing cost. Times interest earned = EBIT / Interest expense = $1,240,000 / $240,000 = 5.17 times (FY2024 was $1,440,000 / $260,000 = 5.54 times). Coverage weakened modestly yet remains comfortable for a manufacturer with stable demand. Traps: using pre-tax income ($1,000,000 / $240,000 = 4.17) omits the interest add-back; using net income plus interest ($990,000 / $240,000 = 4.13) skips the tax gross-up; dividing by after-tax interest ($1,240,000 / $180,000 = 6.89) misapplies a capital-structure adjustment outside its purpose.",
        "Topic": "Leverage ratios",
        "Subtopic": "Times interest earned",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Times interest earned = EBIT / Interest expense",
        "CommonTrapReference": "Omitting the interest add-back or the tax gross-up when building numerator EBIT",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three conclusions are supported by the DuPont analysis of the two years shown in Exhibits 2 and 3?",
        "Choices": [
          "Net profit margin fell from 7.50% to 6.00% and is the largest contributor to the ROE decline.",
          "Total asset turnover rose above 1.60 times in FY2025.",
          "Higher financial leverage partially offset the impact of the weaker operating margin on ROE.",
          "Return on equity declined by more than four percentage points year over year.",
          "The company reduced its reliance on debt financing during FY2025."
        ],
        "Correct": [
          "Net profit margin fell from 7.50% to 6.00% and is the largest contributor to the ROE decline.",
          "Higher financial leverage partially offset the impact of the weaker operating margin on ROE.",
          "Return on equity declined by more than four percentage points year over year."
        ],
        "Explanation": "Relevant principle: component trend analysis within the DuPont framework. Statement one is true: margin fell 7.50% to 6.00% and contributes the largest share of the decline. Turnover claim fails: it slipped from 1.64 to 1.56 times, below 1.60. Leverage offset is true: the multiplier rose from 1.64 to 1.67, softening the fall. The magnitude claim is true: ROE fell from 20.11% to 15.63%, a 4.48-point drop. Debt-reduction is false: liabilities grew faster than equity ($400,000 vs $400,000 on a smaller base), raising leverage. The trap is treating any single-component move as proof overall returns improved.",
        "Topic": "Financial statement analysis",
        "Subtopic": "DuPont component trends",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading a single-component improvement as proof that overall returns improved",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Prepare the board scorecard Elena will distribute: match each metric to its correct value for the year indicated, using Exhibits 2 and 3.",
        "LeftItems": [
          "FY2025 net profit margin",
          "FY2025 total asset turnover",
          "FY2025 equity multiplier",
          "FY2024 return on equity"
        ],
        "RightItems": [
          "6.00%",
          "1.56 times",
          "1.67 times",
          "20.11%",
          "7.50%",
          "1.64 times"
        ],
        "Correct": {
          "FY2025 net profit margin": "6.00%",
          "FY2025 total asset turnover": "1.56 times",
          "FY2025 equity multiplier": "1.67 times",
          "FY2024 return on equity": "20.11%"
        },
        "Explanation": "Each metric follows directly from the exhibits: margin = $750,000 / $12,500,000 = 6.00%; turnover = $12,500,000 / $8,000,000 = 1.56 times; multiplier = $8,000,000 / $4,800,000 = 1.67 times; prior-year ROE = $885,000 / $4,400,000 = 20.11%. The distractors are deliberate near-misses: 7.50% is the FY2024 margin and 1.64 times matches FY2024 turnover. Matching exercises reward precise period alignment - pairing a prior-year figure with a current-year label is the classic scorecard error and would misstate the board's trend narrative.",
        "Topic": "Ratio computation",
        "Subtopic": "Year-over-year metrics",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Pairing prior-year values with current-year labels in matching scorecards",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Ceramic tile manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Northwind Ceramics",
    "Stakeholder": "CFO Elena Marsh",
    "BusinessFunction": "Financial reporting and analysis",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "DuPont",
      "ROE",
      "ratio analysis",
      "board reporting"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 94,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute net profit margin, asset turnover, equity multiplier, and ROE from condensed statements",
      "Attribute ROE change to margin, turnover, and leverage components",
      "Evaluate whether added leverage offsets operating weakness",
      "Communicate ratio findings in a board-ready format"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-B3",
    "Title": "Bond Pricing and Covenant Compliance Review",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Value bonds using present-value factors at the market yield",
      "Amortize bond discounts under the effective interest method",
      "Assess covenant compliance with interest coverage measures"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 31,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Copperline Manufacturing plans a five-year, $10,000,000 bond issue to fund a new press line at its Dayton plant. With market yields at 8% against a 6% coupon, treasury expects a discounted sale. CFO Dana Whitaker must confirm the issue price, validate the effective-interest amortization schedule, and reassure lender First Meridian Bank that the interest-coverage covenant will hold in year one.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B3-E1",
        "CaseID": "CBQ21-B3",
        "Type": "table",
        "Title": "Exhibit 1 - Bond Terms and Present Value Factors",
        "Purpose": "Supplies every input needed to price the issue and build the early amortization periods under the effective interest method.",
        "ReferencedBy": [
          "CBQ21-B3-Q1",
          "CBQ21-B3-Q2",
          "CBQ21-B3-Q3",
          "CBQ21-B3-Q5",
          "CBQ21-B3-Q6"
        ],
        "Headers": [
          "Term",
          "Value"
        ],
        "Rows": [
          [
            "Face value",
            "$10,000,000"
          ],
          [
            "Stated coupon rate (annual)",
            "6%"
          ],
          [
            "Payment frequency",
            "Semiannual"
          ],
          [
            "Term to maturity",
            "5 years"
          ],
          [
            "Semiannual coupon payment",
            "$300,000"
          ],
          [
            "Market yield at issuance (annual)",
            "8%"
          ],
          [
            "Periodic market rate",
            "4% per half-year"
          ],
          [
            "Number of periods",
            "10"
          ],
          [
            "PV of $1 at 4%, 10 periods",
            "0.67556"
          ],
          [
            "PV of ordinary annuity of $1 at 4%, 10 periods",
            "8.11090"
          ]
        ],
        "DataFormat": "US dollars; rates are nominal annual unless noted; factors carried to five decimals",
        "AccuracyCheck": "Coupon = $10,000,000 x 6% / 2 = $300,000; price = $300,000 x 8.11090 + $10,000,000 x 0.67556 = $9,188,870. Computed twice independently."
      },
      {
        "ExhibitID": "CBQ21-B3-E2",
        "CaseID": "CBQ21-B3",
        "Type": "email",
        "Title": "Exhibit 2 - Lender Covenant Inquiry",
        "Purpose": "States the covenant definition (EBIT over GAAP interest expense, floor 4.0x) and projected EBIT consumed by the compliance decision.",
        "ReferencedBy": [
          "CBQ21-B3-Q4",
          "CBQ21-B3-Q5"
        ],
        "Body": "From: Marcus Bell, Treasurer, Copperline Manufacturing. To: Dana Whitaker, CFO. Subject: Coverage headroom on the new notes. Dana - First Meridian confirmed the covenant language on the proposed notes: EBIT divided by GAAP interest expense must stay at or above 4.0 times, tested annually starting at issuance. Our planning estimate for next-year EBIT is $3,600,000. Before we sign, please confirm the year-one GAAP interest expense implied by the discounted issue and tell me whether we clear the covenant, including how the number differs from the $600,000 of cash coupons we will actually pay each year."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the present value factors in Exhibit 1, compute the issue price of Copperline's bond offering. Round to the nearest whole dollar (digits only).",
        "Correct": "9188870",
        "Explanation": "Governing principle: bond valuation under ASC 835 prices debt at the present value of future cash flows discounted at the market yield. Price = PV of coupons + PV of face = $300,000 x 8.11090 + $10,000,000 x 0.67556 = $2,433,270 + $6,755,600 = $9,188,870. Investors pay $811,130 less than face because the 6% coupon trails the 8% market yield they require. The common trap is discounting cash flows at the stated rate, which would circularly produce par value regardless of market conditions.",
        "Topic": "Bond valuation",
        "Subtopic": "Present value pricing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Bond price = PV(coupons) + PV(face) at market yield",
        "CommonTrapReference": "Discounting bond cash flows at the stated coupon rate instead of the market yield",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Under the effective interest method beginning from the issue price, compute Copperline's interest expense for Period 2 (the second semiannual period). Round to the nearest whole dollar (digits only).",
        "Correct": "370257",
        "Explanation": "Governing principle: the effective interest method (ASC 835) charges each period at the periodic market rate applied to carrying value. Period 1 expense = $9,188,870 x 4% = $367,555; discount amortized = $367,555 - $300,000 = $67,555; carrying value rises to $9,256,425. Period 2 expense = $9,256,425 x 4% = $370,257. Expense grows every period because accretion walks carrying value up toward face. The trap is reusing the issue price as the base each period, which freezes expense and defeats the compounding logic of the method.",
        "Topic": "Debt amortization",
        "Subtopic": "Effective interest method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Effective interest = Carrying value x Periodic market rate",
        "CommonTrapReference": "Reapplying the periodic rate to the issue price instead of the growing carrying value",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-B3-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-B3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "For the audit committee briefing, which characterization of the issuance is accurate?",
        "Choices": [
          "Sold at a discount of $811,130 because the 8% market yield exceeds the 6% coupon rate.",
          "Sold at par because the stated rate and the market rate both compound semiannually.",
          "Sold at a premium of $811,130 because investors reward above-market coupons.",
          "Sold at a discount of $188,870 reflecting underwriting fees deducted at closing."
        ],
        "Correct": "A",
        "Explanation": "Issuance economics follow from comparing coupon to market yield. Because the 8% market yield exceeds the 6% stated rate, investors bid the price down to $9,188,870 - a discount of $10,000,000 - $9,188,870 = $811,130 carried in Discount on Bonds Payable and recognized as extra interest cost over the term. Business meaning: Copperline pays the market rate in substance through cheaper proceeds plus accretion. Traps: calling it a premium reverses the rate relationship; quoting $188,870 invents a magnitude tied to no exhibit figure and confuses the discount with issuance costs.",
        "Topic": "Debt issuance",
        "Subtopic": "Discount recognition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Calling a below-coupon issuance a premium or misstating the discount magnitude",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Marcus needs an answer for First Meridian before signing. Applying the covenant definition stated in Exhibit 2, which conclusion should Dana deliver?",
        "Choices": [
          "Coverage is about 6.00 times measured on cash coupons, satisfying the covenant without further analysis.",
          "Coverage is about 4.50 times applying the 8% market yield to face value, satisfying the covenant.",
          "Coverage is about 4.88 times on GAAP interest expense, breaching the covenant because lenders test only cash interest.",
          "Coverage is about 4.88 times on GAAP interest expense, clearing the 4.0x covenant, with cash-basis coverage higher at about 6.00 times."
        ],
        "Correct": "D",
        "Explanation": "Covenant testing applies the agreement's own definition: projected EBIT over GAAP interest expense. Year-one GAAP interest = $367,555 + $370,257 = $737,812; coverage = $3,600,000 / $737,812 = 4.88 times, above the 4.0x floor. Cash-basis coverage = $3,600,000 / $600,000 = 6.00 times, higher because cash coupons exclude discount accretion. Treasury can assure First Meridian of compliance with headroom. Traps: substituting cash coupons understates the GAAP denominator the agreement names; applying the 8% yield to face gives $800,000 and 4.50 times; inverting the basis rule reaches the opposite conclusion from the same ratio.",
        "Topic": "Credit analysis",
        "Subtopic": "Interest coverage covenant",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Interest coverage = EBIT / Interest expense",
        "CommonTrapReference": "Testing covenants on cash interest when the agreement defines GAAP interest expense",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements about the notes and the covenant position are accurate?",
        "Choices": [
          "Effective interest expense increases each semiannual period as discount amortization raises the carrying value.",
          "Lifetime interest cost totals $3,811,130, comprising $3,000,000 of coupons plus the $811,130 discount.",
          "The opening carrying amount of the notes exceeds face value at the date of issuance.",
          "Straight-line amortization would hold periodic interest expense equal to the $300,000 cash coupon.",
          "Measured on cash interest instead of GAAP expense, covenant coverage appears stronger because cash coupons exclude discount accretion."
        ],
        "Correct": [
          "Effective interest expense increases each semiannual period as discount amortization raises the carrying value.",
          "Lifetime interest cost totals $3,811,130, comprising $3,000,000 of coupons plus the $811,130 discount.",
          "Measured on cash interest instead of GAAP expense, covenant coverage appears stronger because cash coupons exclude discount accretion."
        ],
        "Explanation": "Statement one is true: expense steps from $367,555 to $370,257, then $373,067 and $375,990, tracking carrying-value growth. Lifetime cost is true: ten coupons of $300,000 total $3,000,000, plus the $811,130 discount, equals $3,811,130. Opening-above-face is false: a discount means carrying value starts below face. Straight-line-equals-coupon is false: straight-line expense would be $381,113 per period ($300,000 + $81,113 of amortization). Cash-versus-GAAP is true: $600,000 cash is smaller than $737,812 GAAP expense, so cash-basis coverage screens stronger. The trap is equating interest expense with cash paid on discounted debt..",
        "Topic": "Long-term debt",
        "Subtopic": "Discount accretion effects",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Equating interest expense with cash coupons and missing discount accretion",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Complete the treasury memo Marcus will file with the loan package: match each schedule element to its correct amount.",
        "LeftItems": [
          "Issue price at date of sale",
          "Period 1 interest expense",
          "Period 2 discount amortization",
          "Carrying value after Period 3"
        ],
        "RightItems": [
          "$9,188,870",
          "$367,555",
          "$70,257",
          "$9,399,749",
          "$600,000",
          "$811,130"
        ],
        "Correct": {
          "Issue price at date of sale": "$9,188,870",
          "Period 1 interest expense": "$367,555",
          "Period 2 discount amortization": "$70,257",
          "Carrying value after Period 3": "$9,399,749"
        },
        "Explanation": "Derivations from Exhibit 1 and the pricing step: issue price $9,188,870; Period 1 expense $9,188,870 x 4% = $367,555; Period 2 amortization = $370,257 - $300,000 = $70,257; carrying value after Period 3 = $9,188,870 + $67,555 + $70,257 + $73,067 = $9,399,749. Distractors are real but misplaced figures: $600,000 is a full year of cash coupons and $811,130 is the total discount. Typical scheduling errors come from skipping the round-to-dollar step or amortizing before accruing interest in the early periods.",
        "Topic": "Amortization schedule",
        "Subtopic": "Early-period balances",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "Effective interest = Carrying value x Periodic market rate",
        "CommonTrapReference": "Skipping dollar rounding or amortizing before accruing interest in early periods",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-B3-Q1"
        ]
      }
    ],
    "Industry": "Capital equipment manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Copperline Manufacturing",
    "Stakeholder": "CFO Dana Whitaker",
    "BusinessFunction": "Treasury and corporate finance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "bond pricing",
      "effective interest",
      "covenant",
      "coverage ratio"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 93,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Price a semiannual bond using present value factors",
      "Build early-period amortization entries under the effective interest method",
      "Test an interest-coverage covenant on GAAP and cash bases",
      "Distinguish discount accretion from cash interest"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-C3",
    "Title": "Special Order Under a Capacity Constraint",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Identify relevant revenues and costs for a special-order decision",
      "Quantify opportunity cost of capacity consumed by a special order",
      "Recommend accept-or-decline actions supported by contribution analysis"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Silverpine Furniture runs its Oregon workshop near practical capacity filling standing orders from regional retailers. Purchasing director Priya Raman of Cascadia Home Stores proposes a one-time purchase of 3,000 accent chairs at $150 per unit, well below the regular price, with six-week delivery. CFO Rebecca Hale must recommend whether founder Sam Ortiz should accept, quantifying relevant costs, the cost of displaced orders, and the minimum price at which the deal creates value.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C3-E1",
        "CaseID": "CBQ21-C3",
        "Type": "table",
        "Title": "Exhibit 1 - Monthly Operating Data, Regular Operations",
        "Purpose": "Provides volumes, prices, variable costs, and fixed overhead consumed by the contribution, opportunity-cost, and pricing computations.",
        "ReferencedBy": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q2",
          "CBQ21-C3-Q3",
          "CBQ21-C3-Q5",
          "CBQ21-C3-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Current monthly production",
            "18,000 units"
          ],
          [
            "Practical monthly capacity",
            "20,000 units"
          ],
          [
            "Regular wholesale price per unit",
            "$240"
          ],
          [
            "Variable manufacturing cost per unit",
            "$132"
          ],
          [
            "Variable selling expense per unit",
            "$18"
          ],
          [
            "Fixed manufacturing overhead per month",
            "$1,296,000"
          ]
        ],
        "DataFormat": "US dollars; volumes in units per month",
        "AccuracyCheck": "Regular contribution per unit = $240 - $132 - $18 = $90; idle capacity = 20,000 - 18,000 = 2,000 units; allocated fixed overhead = $1,296,000 / 18,000 = $72 per unit. Verified twice."
      },
      {
        "ExhibitID": "CBQ21-C3-E2",
        "CaseID": "CBQ21-C3",
        "Type": "email",
        "Title": "Exhibit 2 - Customer Offer",
        "Purpose": "States the special-order terms consumed throughout the decision: 3,000 units, $150 price, buyer-handled distribution, seller-funded one-time jig.",
        "ReferencedBy": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q3",
          "CBQ21-C3-Q4",
          "CBQ21-C3-Q5"
        ],
        "Body": "From: Priya Raman, Purchasing Director, Cascadia Home Stores. To: Tom Alderman, Sales Director, Silverpine Furniture. Subject: One-time buy - Cascade accent chairs. Tom - our spring promotion needs 3,000 Cascade accent chairs delivered within six weeks of purchase-order acceptance. We can pay $150 per unit. Two conditions: your team builds the required finishing jig at your cost as a one-time setup, and we handle all outbound freight and store marketing ourselves. If the numbers work on your side, we can wire a deposit immediately."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Setting aside capacity effects and the one-time setup for the moment, compute the incremental contribution margin the Cascadia order itself would generate. Round to the nearest whole dollar (digits only).",
        "Correct": "54000",
        "Explanation": "Governing principle: relevant costing includes only future, differential cash flows affected by the decision. The order incurs variable manufacturing of $132 per unit and no variable selling expense because Cascadia handles freight and marketing (Exhibit 2). Incremental contribution = 3,000 x ($150 - $132) = $54,000. This figure is gross of capacity effects and the one-time jig, so it is an upper bound before displacement. Traps: deducting the $18 selling expense this order avoids, or burdening the order with fixed manufacturing overhead that continues either way.",
        "Topic": "Relevant costing",
        "Subtopic": "Incremental contribution",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Incremental CM = Units x (Offer price - Variable cost per unit)",
        "CommonTrapReference": "Burdening special orders with fixed overhead or excluded selling expenses",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the opportunity cost of regular contribution displaced if Silverpine accepts the Cascadia order at current production levels. Round to the nearest whole dollar (digits only).",
        "Correct": "90000",
        "Explanation": "Governing principle: opportunity cost is the contribution forgone on the best alternative use of scarce capacity. Idle capacity = 20,000 - 18,000 = 2,000 units, so the 3,000-unit order displaces 1,000 units of regular production (18,000 + 3,000 - 20,000). Regular contribution per unit = $240 - $132 - $18 = $90. Opportunity cost = 1,000 x $90 = $90,000. Traps: assuming the entire order displaces regular sales, overstating the cost at $270,000; or ignoring displacement entirely because the offer looks profitable viewed in isolation from Exhibit 1 capacity data.",
        "Topic": "Opportunity cost",
        "Subtopic": "Capacity constraints",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Opportunity cost = Displaced units x Regular CM per unit",
        "CommonTrapReference": "Displacing the full order quantity instead of the excess over idle capacity",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Weighing all relevant amounts from Exhibits 1 and 2, what should Rebecca Hale recommend to Sam Ortiz?",
        "Choices": [
          "Accept: the order adds $42,000 of profit after tooling and lifts plant utilization.",
          "Decline: accepting would cut profit by $48,000 after tooling and displaced contribution.",
          "Accept: the order adds $54,000 of contribution at no additional fixed cost.",
          "Decline: accepting would cut profit by $102,000 once tooling and lost contribution are counted."
        ],
        "Correct": "B",
        "Explanation": "Short-run decisions compare incremental contribution against avoidable costs plus opportunity cost (contribution-margin decision framework). Accepting yields $54,000 contribution - $12,000 jig - $90,000 displaced contribution = -$48,000, so Silverpine should decline: displaced regular units earn $90 each versus the order's $18, so filling to capacity destroys value. Traps: stopping at $42,000 (omitting opportunity cost) supports exactly the wrong call; reporting -$102,000 nets only the outflows ($90,000 + $12,000) and drops the order's own $54,000 contribution from the comparison.",
        "Topic": "Special orders",
        "Subtopic": "Accept-or-decline analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net effect = Incremental CM - Avoidable costs - Opportunity cost",
        "CommonTrapReference": "Judging the order on contribution alone without the opportunity cost of lost sales",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-C3-Q1",
          "CBQ21-C3-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-C3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "If Silverpine counter-offers instead of walking away, what minimum unit price leaves the company indifferent between accepting and declining the 3,000-unit order?",
        "Choices": [
          "$132, equal to variable manufacturing cost per unit.",
          "$150, matching the price Cascadia originally offered.",
          "$166, covering variable cost plus tooling and displaced contribution spread across the order.",
          "$184, adding the avoided selling expense back onto the indifference price."
        ],
        "Correct": "C",
        "Explanation": "Indifference pricing sets the net benefit of acceptance to zero: 3,000 x (P - $132) - $12,000 - $90,000 = 0, so P - $132 = $102,000 / 3,000 = $34 and P = $166 per unit. Above $166 the deal beats displaced production; below it, declining preserves more profit. Business meaning: scarce capacity, not book cost, sets the floor. Traps: quoting the $132 variable floor ignores what capacity is worth; anchoring on the offered $150 confirms rather than tests the deal; adding the avoided $18 selling expense back onto the floor overstates the requirement at $184.",
        "Topic": "Pricing decisions",
        "Subtopic": "Indifference price",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Minimum price = Variable cost + (Avoidable cost + Opportunity cost) / Order units",
        "CommonTrapReference": "Quoting variable cost as the floor when capacity is scarce",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Dependencies": [
          "CBQ21-C3-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-C3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements about the decision analysis are accurate?",
        "Choices": [
          "The $12,000 finishing jig is a relevant cost because it is incurred only if the order is accepted.",
          "Fixed m