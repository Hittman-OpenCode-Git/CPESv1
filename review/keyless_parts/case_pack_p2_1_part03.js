ate": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter Northstar's current WACC in percent, rounded to two decimals.",
        "Correct": "8.71",
        "Explanation": "Weights at market value: debt 60/200 = 0.30, preferred 20/200 = 0.10, equity 120/200 = 0.60. WACC = 0.30 × 4.50% + 0.10 × 10.00% + 0.60 × 10.60% = 1.35% + 1.00% + 6.36% = 8.71% (per CB-05). Market-value weighting matters because book weights would underweight the equity investors actually price at premium levels.",
        "Topic": "Weighted average cost of capital",
        "Subtopic": "Market-value weights",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-05: WACC = (E/V)Re + (P/V)Rp + (D/V)Rd(1-t)",
        "CommonTrapReference": "Using book-value weights or omitting the preferred tranche.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "WACC"
        ],
        "Dependencies": [
          "CBQ21-B2-Q1",
          "CBQ21-B2-Q2",
          "CBQ21-B2-Q3"
        ]
      },
      {
        "ItemID": "CBQ21-B2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "The committee proposes funding the entire $40M with new 6% debt because 'debt is the cheapest source.' Which evaluation is correct?",
        "Correct": "B",
        "Choices": [
          "The proposal is sound: 4.50% after-tax is below every other component, so the marginal cost of capital falls to 4.50%",
          "Incremental borrowing raises the leverage ratio and therefore the equity holders' required return, so the true marginal cost exceeds 4.50% and evaluating the project at today's 8.71% WACC understates the appropriate hurdle",
          "WACC is a fixed property of the firm and rarely changes with financing choices, so the hurdle remains 8.71% whatever the mix",
          "Because the expansion is a single project, component costs are irrelevant and any rate above zero is acceptable"
        ],
        "Explanation": "Financing decisions change the capital structure, and structure changes component costs: added debt concentrates operating risk on a thinner equity cushion, pushing the CAPM cost of equity upward (the leverage effect formalized in Modigliani-Miller with taxes and trade-off theory). The marginal cost of the NEXT dollar blends the cheap new debt with the now-more-expensive equity base — it sits between 4.50% and the rising equity cost, not at either endpoint. Evaluating a multi-decade asset at yesterday's 8.71% while loading on debt quietly subsidizes the project's apparent returns.",
        "Topic": "Marginal cost of capital",
        "Subtopic": "Leverage feedback",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating the cheapest source as THE marginal cost of a large financing package.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "leverage",
          "marginal cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which funding recommendation best balances the competing considerations?",
        "Correct": "A",
        "Choices": [
          "Fund with a MIX — approximately $20M of new debt plus $20M from internally generated funds or equity — preserving interest coverage and rating headroom while still capturing the deductibility of a meaningful debt layer, and re-compute the marginal WACC on the post-transaction structure for the project's hurdle rate",
          "Fund entirely with new debt to maximize the tax shield, accepting whatever coverage ratios result",
          "Fund entirely with new equity to eliminate financial risk completely, regardless of dilution at current prices",
          "Defer the expansion until retained earnings fully cover the $40M internally"
        ],
        "Explanation": "The trade-off framework prices BOTH benefits and costs of debt: the shield argues for a meaningful debt layer, while distress risk, covenant headroom, and equity re-rating argue against concentrating a $40M program in one tranche. A balanced structure keeps the marginal WACC defensible and preserves capacity for future needs. All-debt (B) maximizes the shield but hands the committee a fragile balance sheet exactly when the new assets must ramp; all-equity (C) forfeits the shield and signals overpriced issuance if timed poorly; deferral (D) concedes strategic ground to competitors while cash accumulates.",
        "Topic": "Financing structure recommendation",
        "Subtopic": "Trade-off application",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Optimizing a single dimension (tax shield or risk) instead of the blended position.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation",
          "structure"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-E2",
    "Title": "Replacing the Packaging Line: Unequal Lives",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Compare mutually exclusive replacements with unequal lives using equivalent annual annuity",
      "Identify assumptions that drive the replacement decision",
      "Formulate a defensible replacement recommendation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Meridian Foods' packaging line has three years left and costs $220,000 a year to operate and maintain; it could be sold today for $150,000 or fetch $40,000 in three years. A challenger system costs $600,000 installed, runs five years at $90,000 annually, and should realize $100,000 at replacement. Operations director Marcus Webb must recommend replace-now versus keep-three-more-years at a 10% cost of capital (tax effects excluded for comparability).",
    "Industry": "Food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Meridian Foods",
    "Stakeholder": "Operations Director Marcus Webb",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "EAA",
      "replacement",
      "unequal lives"
    ],
    "CreatedDate": "2026-08-24",
    "ModifiedDate": "2026-08-24",
    "Author": "AI",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-24",
        "Version": "1.0",
        "Author": "AI",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Build present value of cost streams for defender and challenger",
      "Convert unequal-life cost streams to equivalent annual annuities",
      "Select and defend the replacement decision"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-E2-E1",
        "CaseID": "CBQ21-E2",
        "Type": "table",
        "Title": "Exhibit 1 — Defender Versus Challenger",
        "Purpose": "Provides the cash-relevant facts for both alternatives used in the annualized-cost comparison.",
        "ReferencedBy": [
          "CBQ21-E2-Q1",
          "CBQ21-E2-Q2",
          "CBQ21-E2-Q3",
          "CBQ21-E2-Q6",
          "CBQ21-E2-Q5"
        ],
        "Headers": [
          "Factor",
          "Defender (keep)",
          "Challenger (replace)"
        ],
        "Rows": [
          [
            "Remaining/new life",
            "3 years",
            "5 years"
          ],
          [
            "Annual operating cost",
            "$220,000",
            "$90,000"
          ],
          [
            "Salvage today",
            "$150,000",
            "n/a"
          ],
          [
            "Salvage at end of life",
            "$40,000 (year 3)",
            "$100,000 (year 5)"
          ],
          [
            "Installed cost",
            "n/a",
            "$600,000"
          ]
        ],
        "DataFormat": "USD; taxes excluded for comparability per the engagement scope",
        "AccuracyCheck": "Keeping the machine means forgoing today's $150,000 salvage — an opportunity cost at time zero"
      },
      {
        "ExhibitID": "CBQ21-E2-E2",
        "CaseID": "CBQ21-E2",
        "Type": "text",
        "Title": "Exhibit 2 — Discount Factors at 10%",
        "Purpose": "Provides the annuity and single-sum factors needed without external tables.",
        "ReferencedBy": [
          "CBQ21-E2-Q1",
          "CBQ21-E2-Q2",
          "CBQ21-E2-Q3",
          "CBQ21-E2-Q4"
        ],
        "Body": "PVIFA(10%, 3 years) = 2.48685\nPVIFA(10%, 5 years) = 3.79079\nPVIF(10%, year 3) = 0.75131\nPVIF(10%, year 5) = 0.62092"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-E2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the PRESENT VALUE of keeping the defender for its remaining three years (costs positive), in dollars, within ±$500.",
        "Correct": "667054",
        "Explanation": "Keeping the machine sacrifices today's $150,000 sale (opportunity cost at t=0), pays $220,000 annually for three years, and recovers $40,000 at year three. PV = 150,000 + (220,000 × 2.48685) − (40,000 × 0.75131) = 150,000 + 547,107 − 30,053 = $667,054. The foregone salvage is the item analysts most often forget — selling the defender is half of the replace alternative.",
        "Topic": "Replacement analysis",
        "Subtopic": "Defender cost stream",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "PV of costs with opportunity cost of foregone salvage",
        "CommonTrapReference": "Omitting the foregone salvage value from the keep alternative.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "defender",
          "present value"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the CHALLENGER's equivalent annual ANNUITY cost (a positive number), in dollars, within ±$500.",
        "Correct": "231899",
        "Explanation": "PV of challenger costs = 600,000 + (90,000 × 3.79079) − (100,000 × 0.62092) = 600,000 + 341,171 − 62,092 = $879,079. Spreading over five years: EAA = 879,079 ÷ 3.79079 = $231,899 per year. The EAA converts a lumpy five-year commitment into the constant annual figure that makes unequal lives comparable.",
        "Topic": "Equivalent annual annuity",
        "Subtopic": "Challenger annualization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-05: EAA = PV / PVIFA(r, n)",
        "CommonTrapReference": "Comparing raw PVs of unequal-lived alternatives directly.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "EAA",
          "challenger"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the DEFENDER's equivalent annual annuity cost (a positive number), in dollars, within ±$500.",
        "Correct": "268233",
        "Explanation": "Defender EAA = 667,054 ÷ 2.48685 = $268,233 per year. Comparing the two annualized figures — $231,899 for the challenger against $268,233 for the defender — shows replacement saves roughly $36,300 EVERY YEAR on a like-for-like basis, which is the apples-to-apples comparison the unequal lives demand.",
        "Topic": "Equivalent annual annuity",
        "Subtopic": "Defender annualization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-05: EAA = PV / PVIFA(r, n)",
        "CommonTrapReference": "Annualizing over the wrong life (using 5 years for the 3-year defender).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "EAA",
          "defender"
        ],
        "Dependencies": [
          "CBQ21-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-E2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Why is the equivalent annual annuity method required here rather than comparing total present values of cost?",
        "Correct": "B",
        "Choices": [
          "Because EAA discounts costs twice, adding conservatism to replacement decisions",
          "Because the alternatives span UNEQUAL lives — the defender's 3-year cost stream and the challenger's 5-year stream are not directly comparable; annualizing places both on a per-year basis so the shorter option is not flattered by its earlier termination",
          "Because EAA ignores salvage values, simplifying the arithmetic",
          "Because the tax code requires annualized comparisons for equipment placed in service mid-year"
        ],
        "Explanation": "Total-PV comparisons bias decisions toward whichever alternative stops sooner: a 3-year cost stream will almost typically show a smaller PV than a 5-year stream covering more years of service. Annualizing divides each PV by its own annuity factor, expressing both as cost-per-year-of-service and restoring comparability — the standard treatment for mutually exclusive replacements with unequal lives. Salvage is fully included (C), and no tax-timing rule drives the method (D).",
        "Topic": "Unequal lives methodology",
        "Subtopic": "EAA rationale",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing the shorter-lived alternative because its undiscounted horizon looks cheaper.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "methodology"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which development would MOST likely reverse the replace-now recommendation?",
        "Correct": "A",
        "Choices": [
          "Evidence that the challenger's operating cost escalates rapidly after year 2 — maintenance contracts stepping up sharply — raising its effective annual cost above the defender's $268,233",
          "A modest rise in general interest rates affecting both alternatives equally",
          "Discovery that the defender's paint color no longer matches the facility standard",
          "Confirmation that Product Z packaging volumes will grow 20%, requiring MORE machine-hours from whichever line is installed"
        ],
        "Explanation": "The decision rests on the challenger's $231,899 annualized cost staying below the defender's $268,233. If the challenger's own cost curve escalates steeply — aggressive service-contract step-ups being the usual culprit — its EAA climbs toward and past the defender's, flipping the ranking. Equal rate moves (B) hit both streams similarly and preserve the gap; cosmetic issues (C) are noise; higher volumes (D) raise the VALUE of the better machine, reinforcing replacement rather than reversing it.",
        "Topic": "Decision sensitivity",
        "Subtopic": "Ranking reversals",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating the EAA ranking as immutable without stress-testing its cost inputs.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which recommendation should Marcus Webb present?",
        "Correct": "C",
        "Choices": [
          "Keep the defender through year 3 because its book value is low and disposal would trigger a loss",
          "Replace immediately, and additionally retire the defender early this quarter even before the challenger ships, to bank the $150,000 salvage sooner",
          "REPLACE NOW with the challenger — its equivalent annual cost of $231,899 beats the defender's $268,233 by roughly $36,300 per year — sequencing the cutover during scheduled downtime so the $150,000 defender sale closes on delivery day",
          "Solicit a third bid before acting, since two alternatives can rarely support a confident decision"
        ],
        "Explanation": "The annualized economics favor replacement decisively, and execution detail protects the value: cutting over during planned downtime avoids production loss, and closing the defender's sale on delivery day captures the $150,000 without carrying an idle asset. Book-value loss (A) is an accounting artifact irrelevant to cash economics. Early standalone disposal (B) strands production capability before the replacement arrives. Demanding endless bids (D) substitutes process for analysis — two well-specified, dominant/subordinate alternatives support action.",
        "Topic": "Replacement recommendation",
        "Subtopic": "Execution sequencing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Letting accounting loss aversion override cash-economics superiority.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-A2",
    "Title": "Lender Credit Review Analysis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute and interpret creditor-focused coverage ratios, including times interest earned",
      "Decompose return on equity using the three-component DuPont identity",
      "Assess earnings quality by distinguishing recurring operating performance from non-recurring items and working-capital-driven accruals"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborline Industrial Manufacturing, Inc., a mid-size producer of commercial HVAC components, is preparing for its annual credit review with Meridian National Bank ahead of renewing an 18,000,000 dollar revolving credit facility. CFO Elena Vasquez must deliver a ratio package and an earnings-quality assessment after FY2026 net income jumped roughly 60 percent on an 11.5 percent sales increase. The bank's credit committee has flagged receivables and inventory growth and asked specifically how much of FY2026 earnings is sustainable. Elena will present times-interest-earned coverage, a DuPont decomposition of return on equity, and a candid assessment of earnings quality to support the renewal request.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A2-E1",
        "CaseID": "CBQ21-A2",
        "Type": "table",
        "Title": "Exhibit 1 - Condensed Income Statements, FY2026 versus FY2025",
        "Purpose": "Provides the FY2026 and FY2025 income statement lines used for the TIE computation (Q1), the DuPont margin input and net income tie-out (Q2), identification of the non-recurring gain (Q3), sales growth rates (Q4), the disclosure-package items (Q5), and gross margin in the matching exercise (Q6).",
        "ReferencedBy": [
          "CBQ21-A2-Q1",
          "CBQ21-A2-Q2",
          "CBQ21-A2-Q3",
          "CBQ21-A2-Q4",
          "CBQ21-A2-Q5",
          "CBQ21-A2-Q6"
        ],
        "Headers": [
          "Line item",
          "FY2026",
          "FY2025"
        ],
        "Rows": [
          [
            "Net sales",
            "42,800,000",
            "38,400,000"
          ],
          [
            "Cost of goods sold",
            "29,960,000",
            "27,264,000"
          ],
          [
            "Gross profit",
            "12,840,000",
            "11,136,000"
          ],
          [
            "Selling, general and administrative expenses",
            "7,704,000",
            "6,720,000"
          ],
          [
            "Operating income (EBIT)",
            "5,136,000",
            "4,416,000"
          ],
          [
            "Interest expense",
            "1,284,000",
            "1,452,000"
          ],
          [
            "Gain on sale of surplus equipment",
            "900,000",
            "0"
          ],
          [
            "Income before income taxes",
            "4,752,000",
            "2,964,000"
          ],
          [
            "Income tax expense (25%)",
            "1,188,000",
            "741,000"
          ],
          [
            "Net income",
            "3,564,000",
            "2,223,000"
          ]
        ],
        "DataFormat": "USD whole dollars; percentages where labeled.",
        "AccuracyCheck": "Column sums verified: 42,800,000 - 29,960,000 = 12,840,000; 12,840,000 - 7,704,000 = 5,136,000; 5,136,000 - 1,284,000 + 900,000 = 4,752,000; 4,752,000 x 25% = 1,188,000; 4,752,000 - 1,188,000 = 3,564,000. Same checks pass for FY2025: 38,400,000 - 27,264,000 = 11,136,000; 11,136,000 - 6,720,000 = 4,416,000; 4,416,000 - 1,452,000 = 2,964,000; 2,964,000 - 741,000 = 2,223,000."
      },
      {
        "ExhibitID": "CBQ21-A2-E2",
        "CaseID": "CBQ21-A2",
        "Type": "table",
        "Title": "Exhibit 2 - Balance Sheet Data and Financing Memos",
        "Purpose": "Supplies average-balance inputs for asset turnover and the equity multiplier (Q2), working-capital growth rates used in the earnings-quality inference (Q4), and the debt and equity figures for the leverage reading in Q6.",
        "ReferencedBy": [
          "CBQ21-A2-Q2",
          "CBQ21-A2-Q4",
          "CBQ21-A2-Q6"
        ],
        "Headers": [
          "Balance sheet item",
          "FY2026",
          "FY2025"
        ],
        "Rows": [
          [
            "Cash and equivalents",
            "2,600,000",
            "2,150,000"
          ],
          [
            "Accounts receivable, net",
            "8,560,000",
            "6,420,000"
          ],
          [
            "Inventory",
            "7,480,000",
            "6,110,000"
          ],
          [
            "Other current assets",
            "1,360,000",
            "1,240,000"
          ],
          [
            "Total current assets",
            "20,000,000",
            "15,920,000"
          ],
          [
            "Total assets",
            "46,000,000",
            "41,200,000"
          ],
          [
            "Total current liabilities",
            "10,000,000",
            "9,280,000"
          ],
          [
            "Long-term debt",
            "13,000,000",
            "14,500,000"
          ],
          [
            "Total liabilities",
            "23,000,000",
            "23,780,000"
          ],
          [
            "Shareholders' equity",
            "23,000,000",
            "17,420,000"
          ],
          [
            "Memo: common stock issued during the year",
            "3,000,000",
            "-"
          ],
          [
            "Memo: dividends declared during the year",
            "984,000",
            "-"
          ]
        ],
        "DataFormat": "USD whole dollars at fiscal year end; memo rows are flows during the year; dash denotes not presented.",
        "AccuracyCheck": "Totals reconcile: current asset components sum to 20,000,000 (FY2026) and 15,920,000 (FY2025); liabilities plus equity equal total assets in both years (23,000,000 + 23,000,000 = 46,000,000; 23,780,000 + 17,420,000 = 41,200,000); FY2026 equity rolls forward as 17,420,000 + 3,564,000 net income + 3,000,000 issuance - 984,000 dividends = 23,000,000."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute Harborline's FY2026 times-interest-earned ratio (EBIT divided by interest expense). Enter as a plain number rounded to two decimal places (tolerance +/-0.01).",
        "Correct": "4.00",
        "Explanation": "Times interest earned divides earnings before interest and taxes by interest expense. Harborline's FY2026 EBIT is 5,136,000 (gross profit 12,840,000 less SG&A of 7,704,000) and interest expense is 1,284,000, so TIE = 5,136,000 / 1,284,000 = 4.00x. Coverage of four times comfortably services the revolver today, though the bank will also test durability using EBIT before the one-time gain: 4,236,000 / 1,284,000 = 3.30x. In business terms, EBIT could fall by three quarters before cash coverage of interest is threatened. The classic trap is using earnings before tax or net income in the numerator; both omit the required add-back of interest and understate true coverage.",
        "Topic": "Times interest earned",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibits 1 and 2, compute Harborline's FY2026 return on equity through the three-component DuPont decomposition (net profit margin x total asset turnover x equity multiplier). Express the result as a percentage rounded to two decimal places (tolerance +/-0.01 percentage points) and use average total assets and average shareholders' equity.",
        "Correct": "17.63",
        "Explanation": "The DuPont identity decomposes ROE into net profit margin x total asset turnover x equity multiplier. Margin = 3,564,000 / 42,800,000 = 0.0833; turnover = 42,800,000 / 43,600,000 average assets = 0.9817; multiplier = 43,600,000 / 20,210,000 average equity = 2.1573. Multiplying: 0.0833 x 0.9817 x 2.1573 = 0.1763, i.e., 17.63 percent, which ties exactly to the direct computation of net income over average equity (3,564,000 / 20,210,000). For the lender, an equity multiplier above 2 shows ROE is materially leverage-assisted, so coverage and liquidity metrics carry extra weight in the credit decision. The common trap is using year-end rather than average balances for assets and equity, which inflates the multiplier and overstates ROE.",
        "Topic": "DuPont ROE decomposition",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-14",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "In assessing FY2026 earnings quality for the credit committee, which observation represents the most significant limitation on the sustainability of reported net income?",
        "Correct": "B",
        "Choices": [
          "Gross margin improved from 29.0 percent to 30.0 percent, indicating durable pricing power in the component business.",
          "Reported net income includes a 900,000 pre-tax gain on the sale of surplus equipment; the gain is non-recurring and sits below operating income.",
          "Interest expense declined from 1,452,000 to 1,284,000, flattering the year-over-year net income comparison.",
          "The 3,000,000 common stock issuance raised book equity and mechanically inflated the reported return on equity."
        ],
        "Explanation": "Earnings quality asks how much reported profit will recur. The 900,000 pre-tax gain on surplus equipment sits below operating income, is by nature non-recurring, and equals roughly 19 percent of pre-tax income (900,000 / 4,752,000 = 0.189), so sustainable covenant EBITDA is correspondingly lower than headline results suggest. Improving gross margin and declining interest expense are favorable, durable developments rather than limitations, and the equity issuance changes leverage, not the content of earnings. The trap is treating any sharp net-income jump as operating momentum; lenders strip identified one-time items before setting covenants and pricing.",
        "Topic": "Earnings quality",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Receivables grew 33.3 percent and inventory grew 22.4 percent in FY2026 while net sales grew 11.5 percent. Based on Exhibits 1 and 2, which conclusion should anchor the earnings-quality section of the lender presentation?",
        "Correct": "D",
        "Choices": [
          "The divergent growth rates establish deliberate channel stuffing and require immediate referral to securities regulators.",
          "Working capital grew more slowly than sales, confirming that earnings converted fully into operating cash.",
          "Inventory growth at roughly twice the rate of sales reflects superior demand planning that the bank should highlight.",
          "Working capital is absorbing cash faster than operations generate it, so FY2026 earnings likely overstate cash generation and covenant headroom."
        ],
        "Explanation": "Receivables rose 33.3 percent (2,140,000 / 6,420,000) and inventory rose 22.4 percent (1,370,000 / 6,110,000) against sales growth of 11.5 percent (4,400,000 / 38,400,000). When working capital outruns sales, accrual earnings run ahead of cash: the current ratio did improve to 2.00 from 1.72 (20,000,000 / 10,000,000 vs. 15,920,000 / 9,280,000), but largely because the 3,000,000 equity issuance funded receivables and inventory rather than debt reduction, as long-term debt fell only 1,500,000. The honest message to the credit committee is that FY2026 earnings overstate cash generation. The trap is citing the healthier liquidity ratios as proof of strength without tracing where the funding came from.",
        "Topic": "Working capital and earnings quality",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three actions should CFO Elena Vasquez include in the renewal package to address the bank's earnings-quality concerns? Select the three appropriate actions.",
        "Correct": [
          "Prepare a supplemental schedule presenting covenant EBITDA and operating results excluding the 900,000 non-recurring equipment-sale gain.",
          "Provide an aged accounts receivable schedule with customer concentration detail explaining the 2,140,000 increase in receivables.",
          "Include a reconciliation of net income to cash flow from operations highlighting the FY2026 conversion ratio."
        ],
        "Choices": [
          "Prepare a supplemental schedule presenting covenant EBITDA and operating results excluding the 900,000 non-recurring equipment-sale gain.",
          "Reclassify the equipment-sale gain into net sales so the revenue trend appears smoother across periods.",
          "Provide an aged accounts receivable schedule with customer concentration detail explaining the 2,140,000 increase in receivables.",
          "Request that the bank suspend quarterly covenant certificate filings for the renewal term to reduce administrative burden.",
          "Include a reconciliation of net income to cash flow from operations highlighting the FY2026 conversion ratio."
        ],
        "Explanation": "A credible lender package separates recurring from non-recurring content and explains balance-sheet drivers. Supplemental schedules excluding the 900,000 gain (A), aged receivables detail explaining the 2,140,000 build (C), and a net-income-to-operating-cash-flow reconciliation (E) each answer concerns the credit committee has already raised. Reclassifying a gain into net sales misstates revenue presentation, and asking to suspend covenant reporting weakens rather than builds lender confidence. The trap is padding the package with supportive but irrelevant schedules while leaving the one-time gain and the working-capital drain unexplained.",
        "Topic": "Lender disclosure package",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each credit metric to its correct FY2026 value or reading, computed from Exhibits 1 and 2.",
        "LeftItems": [
          "Times interest earned (FY2026)",
          "Return on equity via DuPont (FY2026)",
          "Gross margin percentage (FY2026)",
          "Debt-to-equity at year-end FY2026"
        ],
        "RightItems": [
          "4.00x",
          "17.63%",
          "30.00%",
          "1.00",
          "12.00%"
        ],
        "Correct": {
          "Times interest earned (FY2026)": "4.00x",
          "Return on equity via DuPont (FY2026)": "17.63%",
          "Gross margin percentage (FY2026)": "30.00%",
          "Debt-to-equity at year-end FY2026": "1.00"
        },
        "Explanation": "Each metric reads directly from the exhibits: TIE = 5,136,000 / 1,284,000 = 4.00x; DuPont ROE = 3,564,000 / 20,210,000 average equity = 17.63 percent; gross margin = 12,840,000 / 42,800,000 = 30.00 percent; debt-to-equity = 23,000,000 / 23,000,000 = 1.00. The unused 12.00 percent figure is FY2026 operating margin (5,136,000 / 42,800,000), a profitability measure rather than a solvency or shareholder-return measure. Pairing each ratio with the right decision lens - coverage for interest service, returns for owners, margin for pricing power, leverage for solvency - is the core skill; the trap is quoting a ratio accurately while interpreting it against the wrong benchmark.",
        "Topic": "Ratio interpretation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Commercial HVAC components manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Harborline Industrial Manufacturing, Inc.",
    "Stakeholder": "Elena Vasquez, Chief Financial Officer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute creditor-focused coverage from a condensed income statement",
      "Apply the DuPont identity with average balance-sheet bases and explain what drives ROE",
      "Evaluate earnings quality using non-recurring items, growth divergence, and cash conversion signals"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-C2",
    "Title": "Capacity-Constrained Line Decisions",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply relevant-cost analysis to keep-or-drop decisions by separating traceable avoidable costs from allocated common costs",
      "Evaluate an outsourcing proposal against internal manufacture using incremental contribution margin",
      "Integrate a special-order acceptance with a capacity-constrained product-mix change into a single quantified recommendation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Corvid Precision Components manufactures hydraulic valve assemblies (V-200) and standard fittings (F-100) in a single machining center capped at 60,000 machine hours per year, currently fully utilized. Corporate Controller Dana Whitfield must brief the Executive Committee, which is weighing three linked actions: dropping the F-100 line that reports a segment loss, accepting a one-time export order for V-200 units priced below list, and outsourcing F-100 production to a qualif