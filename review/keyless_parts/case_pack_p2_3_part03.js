0,000 (about 2,068,966 shares at an assumed average price of $29.00)",
            "$35,000,000 excess cash plus $25,000,000 term loan at 8.0%",
            "$2,000,000",
            "Retires about 6.9% of shares outstanding"
          ],
          [
            "Option 3: Special dividend of $2.00 per share",
            "$60,000,000",
            "Excess cash",
            "None",
            "One-time distribution; leaves cash of $35,000,000 versus the $40,000,000 policy minimum"
          ],
          [
            "Option 4: Option 1 dividend increase plus $30,000,000 repurchase",
            "$42,000,000",
            "$27,000,000 excess cash plus $15,000,000 term loan at 8.0%",
            "$1,200,000",
            "Blended signal; smaller share-count reduction"
          ]
        ],
        "DataFormat": "USD whole dollars except per-share amounts",
        "AccuracyCheck": "Interest: 25,000,000 x 8.0% = 2,000,000; 15,000,000 x 8.0% = 1,200,000. Shares retired under Option 2: 60,000,000 / 29.00 = 2,068,966 (6.90% of 30,000,000)."
      },
      {
        "ExhibitID": "CBQ23-B1-E3",
        "CaseID": "CBQ23-B1",
        "Type": "table",
        "Title": "Exhibit 3 — Financial Summary (Trailing Twelve Months)",
        "Purpose": "Supplies EBIT, interest, cash, share count, dividend, EPS, and covenant-floor values for the payout computation (Q1), coverage computations (Q2, Q3), and constraint testing (Q5).",
        "ReferencedBy": [
          "CBQ23-B1-Q1",
          "CBQ23-B1-Q2",
          "CBQ23-B1-Q3",
          "CBQ23-B1-Q5"
        ],
        "Headers": [
          "Measure",
          "Value"
        ],
        "Rows": [
          [
            "EBIT (trailing twelve months)",
            "$88,000,000"
          ],
          [
            "Interest expense (trailing twelve months)",
            "$18,000,000"
          ],
          [
            "Times interest earned, current",
            "4.89x"
          ],
          [
            "Unrestricted cash, current",
            "$95,000,000"
          ],
          [
            "Shares outstanding",
            "30,000,000"
          ],
          [
            "Current annual dividend per share",
            "$1.60"
          ],
          [
            "Expected earnings per share, next year",
            "$3.20"
          ],
          [
            "Covenant floor, times interest earned",
            "4.00x"
          ]
        ],
        "DataFormat": "USD; ratios to two decimals",
        "AccuracyCheck": "Current TIE = 88,000,000 / 18,000,000 = 4.888... shown as 4.89x rounded. Payout = 1.60 / 3.20 = 50.0%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 3, calculate Bellhaven's expected dividend payout ratio for next year on the current quarterly dividend of $0.40. Express as a percentage rounded to one decimal place (accept 49.9 to 50.1) and enter a plain number.",
        "Correct": "50.0",
        "Explanation": "The dividend payout ratio (catalog FA-22) is dividends per share divided by earnings per share. Bellhaven pays $0.40 quarterly, or $1.60 annually, against expected EPS of $3.20, so payout = 1.60 / 3.20 = 50.0%. The retention ratio is the complement at 50.0%, the slice funding internal growth before any policy change. Marsh's redesign debate turns on this split because raising the payout locks in recurring outflows. A common error divides total dividends by revenue or confuses payout with dividend yield, which uses market price rather than earnings in the denominator.",
        "Topic": "Dividend payout ratio",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-22",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "If Bellhaven executes Option 2 in full, calculate pro forma times interest earned using Exhibits 2 and 3. Round to two decimal places (accept 4.39 to 4.41) and enter a plain number.",
        "Correct": "4.40",
        "Explanation": "Pro forma TIE (catalog FA-08) holds trailing EBIT constant at $88.0 million because a buyback does not touch operations, then rebuilds interest: existing $18.0 million plus the new $25.0 million term loan at 8.0% adding $2.0 million gives $20.0 million total. Coverage = 88.0 / 20.0 = 4.40x, clearing the 4.00x floor with modest headroom. Only the borrowed tranche raises interest since the remaining $35.0 million comes from excess cash. The typical trap is charging the full $60.0 million outflow against EBIT or forgetting that dividends, unlike interest, do not enter this coverage test.",
        "Topic": "Pro forma interest coverage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Using Exhibits 2 and 3, which option produces the lowest pro forma times interest earned while still remaining above the 4.0x covenant floor?",
        "Correct": "B",
        "Choices": {
          "A": "Option 1 - dividend increase, pro forma TIE 4.89x",
          "B": "Option 2 - $60 million repurchase with the 8.0% term loan, pro forma TIE 4.40x",
          "C": "Option 3 - special dividend funded from excess cash, pro forma TIE 4.89x",
          "D": "Option 4 - dividend increase plus $30 million repurchase, pro forma TIE 4.58x"
        },
        "Explanation": "Each option's coverage follows from what moves the TIE fraction. Options 1 and 3 pay dividends only, leaving EBIT and interest untouched, so coverage stays at 88.0 / 18.0 = 4.89x. Option 2 adds $2.0 million of interest for 88.0 / 20.0 = 4.40x, and Option 4 adds $1.2 million for 88.0 / 19.2 = 4.58x. All four clear the 4.00x floor, so the lowest compliant coverage is Option 2 at 4.40x. Analysts sometimes mis-rank the combination below Option 2 by overlooking its smaller loan draw, or they flag Option 2 as a breach when it actually retains 0.40x of headroom.",
        "Topic": "Covenant headroom ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "The committee asks why the Option 2 repurchase is preferable to the Option 3 special dividend of equal cost. Which statement best supports the repurchase?",
        "Correct": "D",
        "Choices": {
          "A": "Special dividends receive more favorable tax treatment for every shareholder group",
          "B": "A repurchase commits the board to sustain identical cash outflows in future years",
          "C": "The special dividend improves times interest earned by reducing reported liabilities",
          "D": "The repurchase returns cash flexibly, retires roughly 2.07 million shares to support EPS, and can be paced without disturbing a perceived permanent dividend commitment"
        },
        "Explanation": "Against a special dividend of equal cost, the open-market repurchase offers three structural advantages: spending can be accelerated, slowed, or suspended as conditions shift; retiring about 2,068,966 shares (roughly 6.9% of 30.0 million outstanding) supports the EPS trajectory; and investors read repurchases as flexible rather than as a permanent commitment the way a higher regular dividend would be. Tax outcomes differ by shareholder and jurisdiction, so option A overgeneralizes. Dividends bypass the income statement entirely, so option C is wrong, and option B describes the opposite of repurchase flexibility.",
        "Topic": "Repurchase versus special dividend",
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
        "ItemID": "CBQ23-B1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements correctly justify approving Option 2 under the constraints in Exhibits 1 through 3? Select exactly three.",
        "Correct": [
          "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "Retiring about 2,068,966 shares advances the board's EPS objective"
        ],
        "Choices": {
          "A": "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "B": "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "C": "Retiring about 2,068,966 shares advances the board's EPS objective",
          "D": "Deductible interest on the term loan makes the repurchase costless to the company",
          "E": "A special dividend signals stronger long-term earnings confidence than a comparable repurchase program"
        },
        "Explanation": "Option 2 survives every constraint in the packet. Pro forma coverage of 4.40x exceeds the 4.00x floor; unrestricted cash falls from $95.0 million by the $35.0 million cash tranche to $60.0 million, comfortably above the $40.0 million treasury minimum; and retiring about 2.07 million shares supports the EPS objective. Option D overstates the case, because deductible interest merely lowers the after-tax cost of the loan rather than eliminating it. Option E reverses the conventional reading: special distributions are commonly viewed as one-time events, while steady repurchases are often interpreted as ongoing confidence in cash generation.",
        "Topic": "Capital-return constraint testing",
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
        "ItemID": "CBQ23-B1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each element of the capital-return package to its correct characterization.",
        "LeftItems": [
          "Times interest earned covenant",
          "Quarterly dividend increase",
          "Open-market share repurchase",
          "New $25 million term loan at 8.0%"
        ],
        "RightItems": [
          "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Creates a recurring cash commitment that investors expect the company to sustain",
          "Returns cash with flexibility while reducing shares outstanding",
          "Adds $2.0 million of annual interest expense when fully drawn at closing",
          "Remains undrawn until the treasurer elects to borrow under the facility"
        ],
        "Correct": {
          "Times interest earned covenant": "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Quarterly dividend increase": "Creates a recurring cash commitment that investors expect the company to sustain",
          "Open-market share repurchase": "Returns cash with flexibility while reducing shares outstanding",
          "New $25 million term loan at 8.0%": "Adds $2.0 million of annual interest expense when fully drawn at closing"
        },
        "Explanation": "The covenant is tested quarterly on trailing-twelve-month EBIT over interest expense, so the 4.0x floor binds before the annual renewal negotiation even arrives. Raising the regular dividend creates a recurring commitment the market expects Bellhaven to sustain, making later reductions reputationally costly. The open-market repurchase delivers cash with flexibility while shrinking the share count toward the EPS objective. The new term loan is fully drawn at closing, adding $2.0 million of annual interest; the undrawn-facility description fits a committed revolver, which is precisely why it serves as the distractor here.",
        "Topic": "Capital-return mechanics",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Commercial HVAC control systems",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bellhaven Components Inc.",
    "Stakeholder": "Elena Marsh, Chief Financial Officer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 3,
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
      "Compute payout ratios and pro forma interest coverage under financing alternatives",
      "Rank capital-return options against covenant floors and liquidity policies",
      "Weigh flexibility and signaling differences between dividends and repurchases"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-D1",
    "Title": "ERM Risk Assessment Workshop",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Score risk-register entries using likelihood and impact scales under COSO ERM 2017",
      "Compute residual risk after planned control actions and test it against board risk appetite",
      "Select a risk response using costed alternatives and identify leading key risk indicators"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Juniper Medical Distribution, a distributor of medical supplies operating a regional repackaging line, convened a two-day ERM workshop led by Chief Risk Officer Marcus Oyelaran after a near-miss resin shortage idled that line for nine days. The executive committee scored the refreshed risk register on five-point likelihood and impact scales, quantified the effect of planned controls, and priced response alternatives for the ransomware exposure flagged by internal audit. Remaining decisions are to confirm inherent and residual scores, lock the cost-justified response for the cyber exposure against the board's technology appetite ceiling, and approve leading indicators for the top supply risk. Finalize the register outputs from the exhibits provided.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D1-E1",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 1 — Enterprise Risk Register (Workshop Output)",
        "Purpose": "Provides likelihood, impact, inherent scores, planned-control reductions, and residual scores consumed by Q1, Q2, Q4, Q5, and the principle matching in Q6.",
        "ReferencedBy": [
          "CBQ23-D1-Q1",
          "CBQ23-D1-Q2",
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q5",
          "CBQ23-D1-Q6"
        ],
        "Headers": [
          "Risk ID",
          "Risk description",
          "Likelihood (1-5)",
          "Impact (1-5)",
          "Inherent score",
          "Planned controls",
          "Score reduction",
          "Residual score"
        ],
        "Rows": [
          [
            "R-01",
            "Single-source resin supply disruption for repackaging line",
            "4",
            "5",
            "20",
            "Dual-source qualification plus quarterly supplier audits",
            "9",
            "11"
          ],
          [
            "R-02",
            "Ransomware attack on ERP and order-management platform",
            "3",
            "5",
            "15",
            "Accelerated patch cadence only",
            "3",
            "12"
          ],
          [
            "R-03",
            "Product recall from contamination in repackaged lots",
            "2",
            "5",
            "10",
            "Expanded HACCP testing at receiving and release",
            "4",
            "6"
          ],
          [
            "R-04",
            "Attrition of food-safety and quality-assurance scientists",
            "4",
            "2",
            "8",
            "Retention incentives and cross-training program",
            "2",
            "6"
          ]
        ],
        "DataFormat": "Ordinal scales 1-5; scores are integers",
        "AccuracyCheck": "Inherent = likelihood x impact: 4x5=20, 3x5=15, 2x5=10, 4x2=8. Residual = inherent - reduction: 20-9=11, 15-3=12, 10-4=6, 8-2=6."
      },
      {
        "ExhibitID": "CBQ23-D1-E2",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 2 — R-02 Cyber Response Alternatives (Annualized)",
        "Purpose": "Costs each response option for the ransomware risk so Q3 can rank them on expected-cost grounds and Q4 can confirm the resulting appetite position.",
        "ReferencedBy": [
          "CBQ23-D1-Q3",
          "CBQ23-D1-Q4"
        ],
        "Headers": [
          "Option",
          "Annual cost",
          "Residual score effect",
          "Retained expected annual loss"
        ],
        "Rows": [
          [
            "Accept current residual exposure",
            "$0",
            "Stays at 12",
            "$1,500,000"
          ],
          [
            "Mitigate: immutable backups, network segmentation, managed detection service",
            "$400,000",
            "Falls from 12 to 6",
            "$450,000"
          ],
          [
            "Transfer: cyber liability policy with $500,000 deductible",
            "$600,000 premium",
            "Falls from 12 to 8",
            "$550,000 after deductible"
          ],
          [
            "Avoid: retire the digital ordering platform",
            "$3,200,000 forgone contribution margin",
            "Eliminated (0)",
            "$0"
          ]
        ],
        "DataFormat": "USD whole dollars; ordinal scores integers",
        "AccuracyCheck": "Mitigate net benefit = (1,500,000 - 450,000) - 400,000 = 650,000. Transfer net benefit = 1,500,000 - (600,000 + 550,000) = 350,000. Avoid sacrifices $3,200,000 of contribution."
      },
      {
        "ExhibitID": "CBQ23-D1-E3",
        "CaseID": "CBQ23-D1",
        "Type": "email",
        "Title": "Exhibit 3 — CRO Workshop Close-Out Note",
        "Purpose": "States the board-approved appetite ceilings used to judge R-02's post-response position (Q4) and frames the committee reporting duty reflected in the principle matching (Q6).",
        "ReferencedBy": [
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q6"
        ],
        "Body": "From: Marcus Oyelaran, Chief Risk Officer. To: Executive Committee. Colleagues - the board-approved statement sets residual-risk appetite ceilings by class: technology and cyber at 9, operational and supply at 12, and strategic at 14. Per COSO ERM 2017, those ceilings are set when we define risk appetite (Principle 7), severity is assessed on a residual basis after controls (Principle 11), and I owe the committee an aggregated portfolio view of all major risks against strategy (Principle 14). Please close out scoring, lock a cost-justified response for R-02, and bring forward leading indicators for R-01 at our next session."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the inherent risk score for R-01 on the enterprise five-by-five matrix. Enter an integer (accept 19 to 21).",
        "Correct": "20",
        "Explanation": "Inherent scoring under COSO ERM 2017 multiplies ordinal likelihood by ordinal impact (catalog RM-02), operationalizing Principle 10 (Identifies Risk) as input to Principle 11 (Assesses Severity of Risk). R-01 scores 4 x 5 = 20, placing single-source resin dependency in the highest band before any control credit. Multiplication matters: summing 4 + 5 = 9 would bury a near-certain, severe event in the middle of the heat map. The integer scale is deliberate because register scores feed prioritization thresholds rather than dollar forecasts.",
        "Topic": "Inherent risk scoring",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the residual risk score for R-01 after the planned dual-sourcing and audit controls. Enter an integer (accept 10 to 12).",
        "Correct": "11",
        "Explanation": "Residual risk (catalog RM-03) nets planned-control mitigation against inherent severity, reflecting Principle 11's requirement to assess severity on a residual basis. For R-01, dual-source qualification and quarterly supplier audits remove 9 points from the inherent 20, leaving 20 - 9 = 11. Eleven sits inside the operational appetite ceiling of 12, so acceptance with key-risk-indicator monitoring is defensible. Reversing the subtraction or expecting residual risk to reach zero are the standard errors; no control suite eliminates uncertainty entirely.",
        "Topic": "Residual risk computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on the annualized economics in Exhibit 2, which response option should the committee select for R-02 on cost-benefit grounds?",
        "Correct": "A",
        "Choices": {
          "A": "Mitigate - fund the $400,000 control package; net expected benefit about $650,000 and residual falls to 6",
          "B": "Accept - retain residual 12 with no incremental spending",
          "C": "Transfer - rely on the cyber policy at a $600,000 premium",
          "D": "Avoid - retire the digital ordering platform"
        },
        "Explanation": "Response economics compare each option's annual cost against retained expected loss, consistent with Principle 13 (Implements Risk Responses). Accepting retains $1,500,000 at residual 12. Full mitigation costs $400,000 and cuts retained loss to $450,000, a net benefit of (1,500,000 - 450,000) - 400,000 = $650,000, while dropping residual to 6. Insurance totals $600,000 premium plus $550,000 retained for $1,150,000, a net benefit of only $350,000, and exiting the platform sacrifices $3,200,000 of contribution. Mitigation dominates on cost-benefit and restores appetite compliance simultaneously.",
        "Topic": "Risk response selection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "RM-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "After funding the response chosen in Q3, R-02's residual score falls to 6. Using Exhibits 1 through 3, which conclusion is correct under COSO ERM 2017?",
        "Correct": "C",
        "Choices": {
          "A": "The score still breaches the technology ceiling of 9, so operations should wind down the platform anyway",
          "B": "Once the new controls pass internal audit, residual risk drops to zero and monitoring can stop",
          "C": "The score sits inside the technology ceiling of 9, so continue monitoring through KRIs while recognizing residual risk persists after controls under Principle 11",
          "D": "Appetite ceilings apply only to inherent scores, so the comparison to the ceiling is irrelevant"
        },
        "Explanation": "With the funded package in place, R-02's residual score drops from 12 to 6, inside the board's technology-and-cyber ceiling of 9 set when management helped the board define risk appetite under Principle 7. The correct posture is continued monitoring through KRIs and periodic reassessment, acknowledging that controls reduce rather than remove uncertainty, which is why Principle 11 assesses severity on a residual basis. Claiming zero residual once an audit passes misstates control assurance; restricting appetite tests to inherent scores contradicts Principle 11; and winding down the platform ignores that mitigation already restored compliance at far less cost than avoidance.",
        "Topic": "Appetite and residual monitoring",
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
        "ItemID": "CBQ23-D1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Oyelaran asked for leading key risk indicators for R-01. Which three candidates qualify? Select exactly three.",
        "Correct": [
          "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "Average financial-health score of critical suppliers declining quarter over quarter",
          "On-time-in-full delivery rate from qualified suppliers deteriorating month over month"
        ],
        "Choices": {
          "A": "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "B": "Average financial-health score of critical suppliers declining quarter over quarter",
          "C": "On-time-in-full delivery rate from qualified suppliers deteriorating month over month",
          "D": "Total product-liability insurance premium paid last fiscal year",
          "E": "Percentage of staff completing annual ethics training"
        },
        "Explanation": "Effective KRIs are measurable, forward-looking, and tied to the drivers of the specific risk. Rising concentration in the top three suppliers, declining supplier financial-health scores, and deteriorating on-time-in-full performance each predict a resin disruption before it strikes, letting Juniper trigger contingency playbooks early. Last fiscal year's insurance premium is a lagging cost artifact of a different risk-transfer decision, and ethics-training completion monitors conduct culture rather than logistics fragility, so neither would warn Oyelaran's team ahead of a supply interruption. This explanation directly addresses why the selected choice is correct based on the exhibit data.",
        "Topic": "Key risk indicator selection",
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
        "ItemID": "CBQ23-D1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each workshop artifact to the COSO ERM 2017 principle it exemplifies.",
        "LeftItems": [
          "Scoring likelihood x impact before and after controls",
          "Ranking risks against the board's appetite ceilings",
          "Choosing among accept, avoid, mitigate, and transfer alternatives",
          "Aggregating all major risks into a single view for the executive committee"
        ],
        "RightItems": [
          "Principle 11 - Assesses Severity of Risk",
          "Principle 12 - Prioritizes Risks",
          "Principle 13 - Implements Risk Responses",
          "Principle 14 - Develops Portfolio View",
          "Principle 7 - Defines Risk Appetite"
        ],
        "Correct": {
          "Scoring likelihood x impact before and after controls": "Principle 11 - Assesses Severity of Risk",
          "Ranking risks against the board's appetite ceilings": "Principle 12 - Prioritizes Risks",
          "Choosing among accept, avoid, mitigate, and transfer alternatives": "Principle 13 - Implements Risk Responses",
          "Aggregating all major risks into a single view for the executive committee": "Principle 14 - Develops Portfolio View"
        },
        "Explanation": "The workshop artifacts map cleanly onto the Performance component of COSO ERM 2017. Scoring likelihood and impact before and after controls instantiates Principle 11; ranking risks against appetite ceilings instantiates Principle 12; choosing among accept, avoid, mitigate, and transfer instantiates Principle 13; and the consolidated committee view instantiates Principle 14 (Develops Portfolio View). Setting the thresholds themselves belongs to Principle 7 within Strategy and Objective-Setting, which is why that label is reserved as the distractor rather than paired with the ranking activity that consumes its output.",
        "Topic": "COSO ERM 2017 principles",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Medical supplies distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Juniper Medical Distribution",
    "Stakeholder": "Marcus Oyelaran, Chief Risk Officer",
    "BusinessFunction": "Strategic planning",
    "QuestionCount": 6,
    "ExhibitCount": 3,
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
      "Apply likelihood-times-impact scoring to a risk register",
      "Derive residual risk after planned controls and test it against appetite ceilings",
      "Rank costed risk responses and select leading indicators for priority risks"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ23-A2",
    "Title": "Earnings Quality and Accruals Gap Review",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Assess earnings quality using the relationship between net income and cash flow from operations",
      "Prepare and interpret common-size income statements to isolate margin drivers",
      "Evaluate working capital changes as indicators of accrual risk and potential manipulation"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Bright Meadow Foods, a family-owned organic food producer, has scheduled a renewal of its $12 million revolving credit facility with First Cascadia Bank. The bank credit committee asked for an earnings-quality assessment after noticing reported profits growing faster than operating cash flow. Priya Raman, controller of Bright Meadow Foods, must present an accruals-gap and common-size trend analysis together with recommended follow-up procedures to the audit committee before the facility renewal meeting.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A2-E1",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Common-Size Income Statement Data ($ thousands)",
        "Purpose": "Provides the dollar amounts and percent-of-sales figures consumed by Q3 margin analysis and Q6 common-size matches; net sales is the common-size base for every ratio.",
        "ReferencedBy": [
          "CBQ23-A2-Q3",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Line item",
          "FY2025 $000s",
          "FY2025 % of sales",
          "FY2024 $000s",
          "FY2024 % of sales"
        ],
        "Rows": [
          [
            "Net sales",
            "48000",
            "100.0",
            "42000",
            "100.0"
          ],
          [
            "Cost of goods sold",
            "31680",
            "66.0",
            "27300",
            "65.0"
          ],
          [
            "Gross profit",
            "16320",
            "34.0",
            "14700",
            "35.0"
          ],
          [
            "Selling, general and administrative",
            "9600",
            "20.0",
            "8400",
            "20.0"
          ],
          [
            "Operating income",
            "6720",
            "14.0",
            "6300",
            "15.0"
          ],
          [
            "Interest expense",
            "960",
            "2.0",
            "840",
            "2.0"
          ],
          [
            "Income before income taxes",
            "5760",
            "12.0",
            "5460",
            "13.0"
          ]
        ],
        "DataFormat": "Dollar columns in thousands of USD; percentage columns rounded to one decimal place.",
        "AccuracyCheck": "Arithmetic verified twice: 48000-31680=16320; 16320-9600=6720; 6720-960=5760; FY2024: 42000-27300=14700; 14700-8400=6300; 6300-840=5460."
      },
      {
        "ExhibitID": "CBQ23-A2-E2",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Indirect-Method Inputs, FY2025 ($ thousands)",
        "Purpose": "Supplies every input needed by Q1 to rebuild FY2025 cash flow from operations and by Q2 to measure the accruals gap.",
        "ReferencedBy": [
          "CBQ23-A2-Q1",
          "CBQ23-A2-Q2"
        ],
        "Headers": [
          "Input to indirect method",
          "FY2025 amount ($ thousands)"
        ],
        "Rows": [
          [
            "Net income",
            "4320"
          ],
          [
            "Depreciation and amortization",
            "1200"
          ],
          [
            "Increase in accounts receivable",
            "900"
          ],
          [
            "Increase in inventories",
            "1150"
          ],
          [
            "Increase in accounts payable",
            "350"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD; increases stated as positive values with direction implied by the row label.",
        "AccuracyCheck": "Arithmetic verified twice: CFO = 4320+1200-900-1150+350 = 3820; accruals check = 900+1150-350-1200 = 500 = 4320-3820."
      },
      {
        "ExhibitID": "CBQ23-A2-E3",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Three-Year Earnings-Quality Trend ($ thousands)",
        "Purpose": "Provides net income and cash flow from operations for three years so Q4 can compute the coverage trend and Q6 can distinguish FY2025 measures from prior-year levels.",
        "ReferencedBy": [
          "CBQ23-A2-Q4",
          "CBQ23-A2-Q5",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Measure",
          "FY2025",
          "FY2024",
          "FY2023"
        ],
        "Rows": [
          [
            "Net income",
            "4320",
            "4095",
            "3720"
          ],
          [
            "Cash flow from operations",
            "3820",
            "3980",
            "3610"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD as reported in audited statements.",
        "AccuracyCheck": "Coverage ratios verified twice: 3610/3720=97.0%; 3980/4095=97.2%; 3820/4320=88.4%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the inputs in Exhibit 2 and the indirect method, compute Bright Meadow Foods FY2025 cash flow from operations in thousands of dollars. Enter your answer as a whole number with no commas or decimals.",
        "Correct": "3820",
        "Explanation": "Under ASC 230, the indirect method reconciles net income to cash flow from operations by removing noncash items and working capital movements. Starting with net income of $4,320 thousand, Bright Meadow adds back depreciation and amortization of $1,200 thousand, subtracts the $900 thousand accounts receivable increase and the $1,150 thousand inventory increase, and adds the $350 thousand accounts payable increase: 4320+1200-900-1150+350 = $3,820 thousand. Verification: the accruals bridge nets to 900+1150-350-1200 = $500 thousand, which equals net income less CFO (4320-3820), confirming internal consistency. In business terms only about 88 cents of each profit dollar converted to cash because growth was financed through slower customer payments and heavier stock on hand. A common trap is deducting the accounts payable increase; a payable increase supplies cash and must be added back.",
        "Topic": "Statement of cash flows",
        "Subtopic": "Indirect method reconciliation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "