FormulaReference": "Statement of cash flows - indirect method",
        "CommonTrapReference": "Adding the accounts payable increase as a deduction in the indirect-method reconciliation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "accruals",
          "indirect method",
          "ASC 230"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Express Bright Meadow Foods FY2025 accruals gap as a percentage of net income, rounded to one decimal place. Enter digits only, for example 12.3.",
        "Correct": "11.6",
        "Explanation": "The accruals gap measures how much of reported profit has not yet converted to operating cash. Applying the formula (net income - CFO) / net income using the Q1 result: (4320-3820)/4320 = 500/4320 = 0.11574, or 11.6 percent rounded to one decimal place. Verification: 500/4320 recomputed independently gives 0.115741, identical after rounding. Nearly twelve cents of every reported FY2025 profit dollar is accrued rather than cash-backed, versus roughly 3 percent in FY2024 (115/4095), a deterioration the lender will probe during renewal. A common trap is dividing the $500 thousand gap by cash flow from operations instead of net income, which overstates the ratio at 13.1 percent.",
        "Topic": "Earnings quality",
        "Subtopic": "Accruals ratio measurement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Accruals ratio",
        "CommonTrapReference": "Dividing the accruals gap by CFO instead of net income, overstating the ratio",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "earnings quality",
          "accruals"
        ],
        "Dependencies": [
          "CBQ23-A2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on the common-size income statement in Exhibit 1, which conclusion best describes the source of Bright Meadow Foods FY2025 margin change?",
        "Choices": [
          "Gross margin held steady while selling, general and administrative costs grew faster than sales, compressing operating margin.",
          "Operating margin declined 1.0 percentage point because gross margin contracted while SG&A and interest expense were unchanged as a percent of sales.",
          "Operating margin improved because gross margin expanded despite flat SG&A spending.",
          "Interest expense rose from 2.0 percent to 3.0 percent of sales and drove the operating margin decline."
        ],
        "Correct": "B",
        "Explanation": "Vertical (common-size) analysis expresses each income statement line as a percentage of net sales, isolating structural shifts from volume growth. Gross margin compressed from 35.0 to 34.0 percent (14700/42000 versus 16320/48000) while SG&A held at 20.0 percent (9600/48000 = 8400/42000) and interest held at 2.0 percent, so the entire 1.0-point decline in operating margin from 15.0 to 14.0 percent traces to cost of goods sold rising from 65.0 to 66.0 percent of sales. Verification: 34.0 minus 20.0 minus 2.0 equals 12.0 percent pretax margin, matching 5760/48000. The pattern indicates pricing pressure or input-cost inflation absorbed at the gross-margin line rather than overhead creep. A common trap is blaming SG&A leverage; its common-size ratio is unchanged year over year, and interest actually stayed flat at 2.0 percent.",
        "Topic": "Financial statement analysis",
        "Subtopic": "Common-size trend interpretation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Common-size analysis",
        "CommonTrapReference": "Attributing margin decline to SG&A when its common-size ratio is unchanged",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "common-size",
          "margin analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which observation from Exhibit 3 provides the strongest evidence of deteriorating earnings quality at Bright Meadow Foods in FY2025?",
        "Choices": [
          "Cash flow from operations remained positive throughout the three-year period.",
          "Net income increased in each of the last three fiscal years.",
          "Depreciation and amortization is a noncash charge that should be excluded from any earnings-quality assessment.",
          "CFO covered about 97 percent of net income in FY2023 and FY2024 but only 88.4 percent in FY2025 as receivables and inventories surged."
        ],
        "Correct": "D",
        "Explanation": "Horizontal review of the coverage trend is the core earnings-quality diagnostic: CFO covered 97.0 percent of net income in FY2023 (3610/3720) and 97.2 percent in FY2024 (3980/4095), but only 88.4 percent in FY2025 (3820/4320). Verification: each ratio recomputed independently reproduces 0.970, 0.972, and 0.884 respectively. Coupled with the receivable and inventory build disclosed among the indirect-method inputs, the pattern indicates profit recognized ahead of cash, the classic precursor to channel stuffing or accumulating obsolete stock ahead of a refinancing. A common trap is treating persistently positive CFO or rising net income as proof of quality; the level alone misses deterioration, so direction and composition matter more than sign.",
        "Topic": "Earnings quality",
        "Subtopic": "Cash conversion trend analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading positive operating cash flow as proof of earnings quality without trend analysis",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "coverage trend",
          "red flags"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three follow-up actions should Priya Raman recommend to the audit committee based on the FY2025 earnings-quality findings? Select exactly three.",
        "Choices": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Direct a restatement of prior-year financial statements to correct the decline in gross margin.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage.",
          "Close the review because cash flow from operations remains positive."
        ],
        "Correct": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage."
        ],
        "Explanation": "Each accepted action targets a documented accrual-risk vector from the exhibits. Requesting the receivable aging tests whether terms were extended to pull revenue into FY2025 against the $900 thousand build; reconciling the inventory build to purchase commitments addresses the $1,150 thousand accumulation before it becomes obsolete stock; and a covenant keyed to quarterly CFO-to-net-income coverage institutionalizes monitoring around the fall from 97.2 to 88.4 percent. Verification: each recommendation maps one-to-one to an exhibit figure used earlier in the case. Restatement is unwarranted because a declining gross margin is a performance outcome, not an identified GAAP error, and positive CFO does not neutralize a widening accruals gap. A common trap is recommending sweeping restatement without first identifying a specific accounting violation.",
        "Topic": "Audit committee governance",
        "Subtopic": "Follow-up procedures on accrual risk",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recommending restatement without identifying a specific GAAP violation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "governance",
          "covenant"
        ],
        "Dependencies": [
          "CBQ23-A2-Q4"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each FY2025 analytical measure to its computed value for the audit-committee handout.",
        "LeftItems": [
          "Accruals gap, FY2025",
          "CFO-to-net-income coverage, FY2025",
          "Change in gross margin, FY2024 to FY2025",
          "Operating margin, FY2025"
        ],
        "RightItems": [
          "$500 thousand",
          "88.4%",
          "-1.0 percentage points",
          "14.0%",
          "$3,820 thousand",
          "97.2%"
        ],
        "Correct": {
          "Accruals gap, FY2025": "$500 thousand",
          "CFO-to-net-income coverage, FY2025": "88.4%",
          "Change in gross margin, FY2024 to FY2025": "-1.0 percentage points",
          "Operating margin, FY2025": "14.0%"
        },
        "Explanation": "The matched values come directly from the computed metrics: the FY2025 accruals gap is 4320-3820 = $500 thousand; coverage is 3820/4320 = 88.4 percent; gross margin moved from 35.0 to 34.0 percent of sales, a change of -1.0 percentage points; and operating margin is 6720/48000 = 14.0 percent. Verification: each pairing was recalculated from raw exhibit dollars rather than copied from narrative text. The distractors are adjacent-but-wrong measures: 97.2 percent is FY2024 coverage and $3,820 thousand is the CFO level rather than the gap. Precision matters because the bank minutes will cite these exact figures. A common trap is confusing the dollar accruals gap with the percentage coverage measure when skimming the handout.",
        "Topic": "Analytical measures synthesis",
        "Subtopic": "Metric computation and matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Confusing the dollar accruals gap with the percentage coverage measure",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-A2-Q2"
        ]
      }
    ],
    "Industry": "Organic food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bright Meadow Foods",
    "Stakeholder": "Priya Raman, Controller",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "earnings quality",
      "accruals",
      "common-size",
      "credit facility"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
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
      "Rebuild cash flow from operations under the indirect method",
      "Quantify an accruals gap and interpret it as an earnings-quality signal",
      "Read common-size statements to isolate the source of margin compression",
      "Recommend audit-committee follow-up procedures tied to specific red flags"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-E2",
    "Title": "Mutually Exclusive Line Investment Decision",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Evaluate capital investment proposals using net present value with stated discount factors",
      "Determine annual after-tax operating cash flows including the depreciation tax shield",
      "Apply the NPV criterion to choose between mutually exclusive projects of unequal scale"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Redstone Medical Devices plans to convert an idle production bay into one of two new lines and can fund only a single project this fiscal year. CFO Marcus Whitfield must recommend either Project Atlas, an automated endoscopy display assembly line, or Project Delta, a compact trocar molding cell, to the Capital Review Committee. The committee requested net present values at the corporate 10 percent cost of capital, an internal-rate-of-return comparison, and confirmation that no sunk or allocated costs distort the cash flow build before Friday vote.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E2-E1",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Project Cash Flow Assumptions",
        "Purpose": "Provides the outlays, revenue, cost, depreciation, tax, and salvage inputs consumed by Q1 and Q2 to build each project after-tax cash flows and NPVs, and referenced in Q5 diligence checks.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Assumption",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "Initial investment, Year 0",
            "$900,000",
            "$400,000"
          ],
          [
            "Incremental annual revenue",
            "$1,250,000",
            "$520,000"
          ],
          [
            "Annual cash operating costs",
            "$950,000",
            "$360,000"
          ],
          [
            "Annual EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Straight-line depreciation over 5 years",
            "$180,000",
            "$80,000"
          ],
          [
            "Tax rate",
            "30%",
            "30%"
          ],
          [
            "After-tax salvage, Year 5 (equals book value)",
            "$60,000",
            "$0"
          ]
        ],
        "DataFormat": "USD; percentages as stated rates; five-year horizon for both projects.",
        "AccuracyCheck": "Subtotals verified twice: 1250000-950000=300000; 520000-360000=160000; depreciation equals investment divided by 5 for both projects."
      },
      {
        "ExhibitID": "CBQ23-E2-E2",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Discount Factors Used for This Evaluation",
        "Purpose": "States the exact present-value factors required for Q1 and Q2 NPV computations and the 12 percent factors proposed for the Q5 sensitivity stress test.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Discounting input",
          "Factor at 10%",
          "Factor at 12%"
        ],
        "Rows": [
          [
            "Five-year annuity, Years 1 through 5",
            "3.791",
            "3.605"
          ],
          [
            "Single payment received in Year 5",
            "0.621",
            "0.567"
          ]
        ],
        "DataFormat": "Factors carried to three decimal places as published in the corporate finance manual.",
        "AccuracyCheck": "Factor application verified twice: 264000 x 3.791 = 1000824 and 60000 x 0.621 = 37260; stress case 264000 x 3.605 + 60000 x 0.567 = 985740."
      },
      {
        "ExhibitID": "CBQ23-E2-E3",
        "CaseID": "CBQ23-E2",
        "Type": "text",
        "Title": "Memorandum from the Chief Financial Officer",
        "Purpose": "Establishes the mutually exclusive constraint, the 10 percent hurdle rate, and the sunk-cost and allocation caveats consumed by Q3, Q4, and Q5 reasoning.",
        "ReferencedBy": [
          "CBQ23-E2-Q3",
          "CBQ23-E2-Q4",
          "CBQ23-E2-Q5"
        ],
        "Body": "From: Marcus Whitfield, Chief Financial Officer. To: Capital Review Committee. Engineering confirmed the idle bay and validation staff can support only one launch this fiscal year, so Project Atlas and Project Delta are strictly mutually exclusive. The corporate hurdle rate remains 10 percent and the tax advisor confirmed the 30 percent effective rate. Two reminders from our policy manual: the $150,000 feasibility study completed last spring is sunk and stays out of Year 0, and projections must exclude allocated corporate overhead that will not change if a line is added. The fixed-asset schedule shows Atlas Year 5 salvage equal to book value, so no taxable gain or loss arises on disposal."
      },
      {
        "ExhibitID": "CBQ23-E2-E4",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "After-Tax Cash Flow Build ($ per year)",
        "Purpose": "Shows the derivation of each project level annual after-tax operating cash flow consumed by Q1, Q2, and Q6 matches.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q6"
        ],
        "Headers": [
          "Build step",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Less depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Taxable income",
            "$120,000",
            "$80,000"
          ],
          [
            "Income tax at 30%",
            "$36,000",
            "$24,000"
          ],
          [
            "Net income",
            "$84,000",
            "$56,000"
          ],
          [
            "Add back depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Annual after-tax operating cash flow",
            "$264,000",
            "$136,000"
          ]
        ],
        "DataFormat": "USD per year for Years 1 through 5; column sums tie to Exhibit 1 inputs.",
        "AccuracyCheck": "Build verified twice via shortcut formula: 300000x0.70+180000x0.30=264000 and 160000x0.70+80000x0.30=136000."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the Exhibit 4 build and the factors in Exhibit 2 (annuity factor for the level stream, single-sum factor for salvage), compute Project Atlas net present value at the 10 percent cost of capital. Enter whole dollars with no commas or decimals.",
        "Correct": "138084",
        "Explanation": "Net present value discounts each incremental after-tax cash flow at the stated 10 percent factors. Atlas level stream is $264,000 per year (300000x0.70 + 180000x0.30) and Year 5 also carries the $60,000 salvage whose book value equals proceeds, so no tax adjusts it. NPV = -900000 + 264000x3.791 + 60000x0.621 = -900000 + 1000824 + 37260 = $138,084. Verification: undiscounted inflows of 264000x5 + 60000 = $1,380,000 comfortably exceed the $900,000 outlay, corroborating the positive result. The positive NPV means Atlas adds shareholder value above the hurdle rate. A common trap is taxing the salvage proceeds despite zero gain, or dropping the depreciation tax shield when converting net income back to operating cash flow.",
        "Topic": "Capital budgeting",
        "Subtopic": "Net present value computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Omitting the depreciation tax shield from the annual after-tax cash flow build",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "tax shield"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute Project Delta net present value at the 10 percent cost of capital using its Exhibit 4 after-tax cash flow and the Exhibit 2 annuity factor. Delta carries no salvage. Enter whole dollars with no commas or decimals.",
        "Correct": "115576",
        "Explanation": "Delta follows the same mechanics without terminal value: level after-tax cash flow of $136,000 per year (160000x0.70 + 80000x0.30) discounted with the five-year annuity factor. NPV = -400000 + 136000x3.791 = -400000 + 515576 = $115,576. Verification: the undiscounted stream totals 136000x5 = $680,000, roughly 1.7 times the outlay, consistent with a strongly positive NPV. Delta earns a spectacular percentage return, yet on its small base the dollar value creation trails Atlas. A common trap is applying a different discount rate to Delta because it looks riskier; both projects face the same corporate 10 percent hurdle in this evaluation unless the committee formally re-rates risk.",
        "Topic": "Capital budgeting",
        "Subtopic": "Scale effects on NPV ranking",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Applying a project-specific discount rate when the corporate hurdle rate governs",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "mutually exclusive"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which recommendation should Marcus Whitfield bring to the Capital Review Committee?",
        "Choices": [
          "Fund Project Atlas because its net present value of $138,084 exceeds Delta $115,576 at the 10 percent cost of capital.",
          "Fund Project Delta because its internal rate of return near 20 percent exceeds Atlas near 14 percent.",
          "Fund Project Delta because its profitability index of 1.29 beats Atlas 1.15.",
          "The choice is immaterial because both projects clear the hurdle rate."
        ],
        "Correct": "A",
        "Explanation": "For mutually exclusive projects the NPV rule governs: fund whichever project adds more dollar value at the cost of capital. Atlas NPV of $138,084 exceeds Delta $115,576, so Redstone funds Atlas even though Delta smaller investment makes its IRR near 20 percent and PI of 515576/400000 = 1.29 look superior to Atlas near 14 percent and 1038084/900000 = 1.15. Verification: both NPVs were recomputed in Q1 and Q2 and the PI ratios re-divide the same discounted inflow totals. Ranking by IRR or PI embeds scale bias whenever outlays differ by more than double, and the idle-bay constraint means the firm cannot simply take both. A common trap is defaulting to the highest-percentage metric without asking whether the forgone dollar spread can be redeployed at the hurdle rate.",
        "Topic": "Investment decision criteria",
        "Subtopic": "Mutually exclusive project selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing the highest IRR for mutually exclusive projects of unequal scale",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "decision rule",
          "scale bias"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which statement about the internal rate of return comparison is most accurate for this decision?",
        "Choices": [
          "The internal rate of return assumes interim cash flows are reinvested at the cost of capital.",
          "When projects are mutually exclusive, internal rate of return and net present value select the same project whenever scale differs.",
          "Project Delta posts the higher internal rate of return because of its smaller outlay, yet net present value at the stated 10 percent rate governs the mutually exclusive choice.",
          "Project Atlas must be rejected because its simple payback period exceeds Delta payback period."
        ],
        "Correct": "C",
        "Explanation": "IRR is the rate that sets NPV to zero: Delta solves 400000 = 136000 times an annuity factor of 2.94, placing IRR near 20 percent, while Atlas solves 900000 = 264000 times roughly 3.41 plus salvage, near 14 percent. Because the projects differ in scale, IRR reinvestment assumptions distort the ranking, and NPV computed at the stated 10 percent rate correctly identifies wealth maximization. Verification: interpolating between published annuity factors confirms Delta between the 20 and 22 percent rows while Atlas sits just above 14 percent. It is NPV, not IRR, that assumes reinvestment at the cost of capital, and payback ignores time value plus post-payback flows entirely. A common trap is assuming the two criteria agree for mutually exclusive projects; scale differences routinely split them.",
        "Topic": "Investment decision criteria",
        "Subtopic": "IRR versus NPV conflict",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming NPV and IRR agree when projects are mutually exclusive",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "IRR",
          "reinvestment assumption"
        ],
        "Dependencies": [
          "CBQ23-E2-Q3"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Before the board vote, which three steps represent sound additional diligence on Project Atlas? Select exactly three.",
        "Choices": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Approve both projects since each NPV is positive and they serve different product lines.",
          "Add the $150,000 feasibility study completed last spring to the Year 0 investment outlay.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Correct": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Explanation": "Sound capital governance tests fragility and input integrity before approval. Recomputing at 12 percent gives 264000x3.605 + 60000x0.567 - 900000 = 951720 + 34020 - 900000 = $85,740, confirming the decision survives a steeper hurdle; verification of this arithmetic appears in the Exhibit 2 accuracy note. Validating salvage matters because equality with book value is what keeps Year 5 free of tax adjustment, and scrubbing allocations honors the incremental-cash-flow principle set out in the CFO memo. Funding both projects contradicts the mutually exclusive premise, and the feasibility study is sunk, so adding it would distort Year 0 by $150,000 with no decision relevance. A common trap is treating historical study costs as relevant simply because they attach to the winning project.",
        "Topic": "Capital budgeting governance",
        "Subtopic": "Sensitivity and data integrity checks",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Including the sunk feasibility study in the Year 0 investment outlay",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity",
          "sunk cost"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each decision quantity to its correct value for the committee minutes.",
        "LeftItems": [
          "Project Atlas net present value at 10%",
          "Project Delta net present value at 10%",
          "Atlas annual after-tax operating cash flow",
          "Present value of Atlas Year 5 salvage"
        ],
        "RightItems": [
          "$138,084",
          "$115,576",
          "$264,000",
          "$37,260",
          "$1,380,000",
          "$515,576"
        ],
        "Correct": {
          "Project Atlas net present value at 10%": "$138,084",
          "Project Delta net present value at 10%": "$115,576",
          "Atlas annual after-tax operating cash flow": "$264,000",
          "Present value of Atlas Year 5 salvage": "$37,260"
        },
        "Explanation": "Each pairing isolates a distinct decision quantity: Atlas NPV = -900000 + 264000x3.791 + 60000x0.621 = $138,084; Delta NPV = -400000 + 136000x3.791 = $115,576; Atlas annual after-tax cash flow = 300000x0.70 + 180000x0.30 = $264,000; and the Year 5 salvage present value = 60000x0.621 = $37,260. Verification: every figure traces to a calculation performed earlier in the case rather than to narrative assertion. The distractors are nearby-but-wrong aggregates: $1,380,000 is Atlas undiscounted five-year total inflow and $515,576 is Delta discounted inflow before subtracting the initial outlay. Precision matters because the minutes and the facility covenant schedule will cite these exact amounts. A common trap is quoting undiscounted totals as though they were net present values.",
        "Topic": "Decision metrics synthesis",
        "Subtopic": "Metric-to-value matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Quoting undiscounted cash flow totals as net present values",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-E2-Q2"
        ]
      }
    ],
    "Industry": "Medical devices",
    "CompanyType": "Manufacturer",
    "CompanyName": "Redstone Medical Devices",
    "Stakeholder": "Marcus Whitfield, Chief Financial Officer",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 4,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "capital budgeting",
      "NPV",
      "IRR",
      "mutually exclusive"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
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
      "Build annual after-tax project cash flows from EBITDA, depreciation, and tax inputs",
      "Compute NPV with stated annuity and single-sum discount factors",
      "Resolve NPV-versus-IRR conflicts for mutually exclusive projects",
      "Identify sunk costs and non-incremental allocations that must stay out of project analysis"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-F3",
    "Title": "FCPA Classification and Books-and-Records Duties",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Distinguish FCPA anti-bribery violations from permissible facilitating payments for routine governmental actions",
      "Apply the books-and-records provisions to mischaracterized payments",
      "Formulate compliance remediation consistent with the IMA Statement of Ethical Professional Practice"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Meridian Solar Components, a US-listed solar equipment maker, is launching distribution in a Southeast Asian growth market through a commissioned distributor. Regional director Ravi Chandran has proposed contingent payments to secure the state power authority module certification, and internal audit director Lena Fischer has flagged undocumented customs-expediting entries in the new subsidiary ledger. Chief Compliance Officer Alicia Grant must classify the payments under the Foreign Corrupt Practices Act, quantify the documentation gaps, and recommend corrective action to the audit committee.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F3-E1",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Email from the Regional Director",
        "Purpose": "Documents the proposed certification payment terms, the routine customs request, and the suggested ledger description consumed by Q1, Q3, Q4, and Q5 analysis.",
        "ReferencedBy": [
          "CBQ23-F3-Q1",
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4"
        ],
        "Body": "From: Ravi Chandran, Regional Director, Asia-Pacific. To: Alicia Grant, Chief Compliance Officer. Subject: Market entry items needing sign-off. The state power authority controls module certification, and approval rests in the discretion of the senior procurement officer assigned to our file. To keep the launch date, we propose paying him $25,000 upon signing the agency agreement plus a success fee equal to 2 percent of first-year orders, which we forecast at $1,800,000. He prefers the funds routed through his family consulting firm, booked as market development consulting fees like last quarter. Separately, the port clerk asks $150 per container to release our already-certified modules within normal clearance windows instead of the multi-week queue."
      },
      {
        "ExhibitID": "CBQ23-F3-E2",
        "CaseID": "CBQ23-F3",
        "Type": "table",
        "Title": "Customs Expediting Ledger Summary, First Quarter",
        "Purpose": "Summarizes the subsidiary-ledger expediting activity so Q2 can quantify the unsupported population and Q5 can anchor the documentation remediation.",
        "ReferencedBy": [
          "CBQ23-F3-Q2",
          "CBQ23-F3-Q5"
        ],
        "Headers": [
          "Category",
          "Number of entries",
          "Total amount"
        ],
        "Rows": [
          [
            "Entries with attached customs release documents",
            "3",
            "$2,305"
          ],
          [
            "Entries lacking any supporting documentation",
            "11",
            "$3,575"
          ],
          [
            "Total customs expediting ledger activity",
            "14",
            "$5,880"
          ]
        ],
        "DataFormat": "Counts and USD totals for the first quarter of subsidiary operation.",
        "AccuracyCheck": "Totals verified twice: 3+11=14 entries and 2305+3575=5880 dollars; average of unsupported subset = 3575/11 = 325 exactly."
      },
      {
        "ExhibitID": "CBQ23-F3-E3",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Policy Excerpt: Anti-Corruption Standards",
        "Purpose": "States the governing definitions and duties consumed by Q3, Q4, and Q6 classifications and by the Q5 remediation plan.",
        "ReferencedBy": [
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4",
          "CBQ23-F3-Q6"
        ],
        "Body": "Meridian Code of Conduct, Section 7. The company complies with the US Foreign Corrupt Practices Act. Anti-bribery: no employee or agent may offer anything of value to a foreign official to influence a discretionary governmental act or to obtain or retain business. Facilitating payments: payments to expedite routine, nondiscretionary governmental actions such as processing permits or releasing qualified shipments are subject to legal review and strict limits. Books and records: all transactions must be recorded accurately and fairly in reasonable detail, with no undisclosed or off-book accounts, and no payment may be characterized inconsistently with its purpose. Internal controls: assets may not be applied to undisclosed purposes, and suspected violations must be escalated to Compliance and the General Counsel immediately."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "From the proposal in Exhibit 1, compute the total contingent consideration Ravi Chandran proposed for the certification approval, combining the fixed payment with the success fee on projected first-year orders. Enter whole dollars with no 