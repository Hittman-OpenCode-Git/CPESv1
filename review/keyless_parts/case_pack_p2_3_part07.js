king strategic NPV to roughly $53.7M, and the project remains value-accretive across the 7.5%–9.5% WACC band shown.",
        "Explanation": "The exhibit estimates the value of the one-year deferral option at roughly $7.2M using a Black-Scholes-style framework on the underlying $46.5M NPV. Combining option value with underlying NPV gives a strategic NPV of approximately $53.7M. Sensitivity to WACC remains positive across the 7.5%–9.5% band, so the project retains its value-accretive character even under modest discount-rate changes.",
        "Topic": "Real option to defer",
        "question_state": "Certified",
        "Prompt": "Based on Exhibit 2, what does the embedded real option to defer the replacement by approximately one year add to the project's valuation, and how sensitive is that conclusion to WACC?",
        "Choices": [
          "The deferral option adds approximately $7.2M of value, taking strategic NPV to roughly $53.7M, and the project remains value-accretive across the 7.5%–9.5% WACC band shown.",
          "The deferral option adds $0M because real options are not applicable to capital-equipment decisions.",
          "The deferral option adds $46.5M, which is equal to the entire underlying NPV and is therefore not additive.",
          "The deferral option adds $32M, which is equal to the first-year cash flow and therefore an obvious overstatement."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The exhibit estimates the value of the one-year deferral option at roughly $7.2M using a Black-Scholes-style framework on the underlying $46.5M NPV. Combining option value with underlying NPV gives a strategic NPV of approximately $53.7M. Sensitivity to WACC remains positive across the 7.5%–9.5% band, so the project retains its value-accretive character even under modest discount-rate changes.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Real options apply to any investment with managerial flexibility over timing, scale, or scope; a deferral option on a major capex is a canonical application.",
        "ExplanationWrongC": "An option value equal to the entire underlying NPV would imply the project is essentially an option, which is not consistent with the exhibit's $7.2M estimate versus the $46.5M underlying NPV.",
        "ExplanationWrongD": "Equating the deferral option value with one year of operating cash flow would be a coincidental outcome rather than a defensible valuation; the exhibit explicitly separates the two.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-E3-Q4",
        "Type": "select",
        "Correct": "NPV falls roughly 31% (from $46.5M to $32M), implying that small WACC changes materially erode value-accretive status.",
        "Explanation": "NPV declines from about $46.5M at 8.5% WACC to about $32.0M at 9.5% WACC, a reduction of roughly 31%. The takeaway is that a one-percentage-point increase in WACC materially compresses NPV, so the project remains value-accretive but the cushion narrows; the board paper should disclose this sensitivity and identify the WACC threshold at which the project would no longer clear the hurdle.",
        "Topic": "NPV sensitivity to WACC",
        "question_state": "Certified",
        "Prompt": "Using Exhibit 2's sensitivity figures, what is the approximate percentage change in replacement NPV when WACC moves from 8.5% to 9.5%, and what is the qualitative takeaway for the board paper?",
        "Choices": [
          "NPV falls roughly 31% (from $46.5M to $32M), implying that small WACC changes materially erode value-accretive status.",
          "NPV is unchanged because WACC sensitivity applies only to IRR, not NPV.",
          "NPV rises when WACC rises because higher discount rates increase present value of negative cash flows.",
          "NPV falls exactly 8.5% per one-point WACC change, by definition."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "NPV declines from about $46.5M at 8.5% WACC to about $32.0M at 9.5% WACC, a reduction of roughly 31%. The takeaway is that a one-percentage-point increase in WACC materially compresses NPV, so the project remains value-accretive but the cushion narrows; the board paper should disclose this sensitivity and identify the WACC threshold at which the project would no longer clear the hurdle.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "WACC sensitivity applies to NPV directly because NPV is computed by discounting at WACC; IRR is the rate at which NPV equals zero and is therefore insensitive to the discount rate in this sense.",
        "ExplanationWrongC": "Higher WACC reduces the present value of future cash flows; it does not increase NPV when cash flows after Year 0 are positive, which is the case for the fleet replacement.",
        "ExplanationWrongD": "NPV sensitivity to WACC depends on project duration, cash-flow timing, and magnitude; assuming a fixed 8.5% reduction per percentage-point change is not generally defensible.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-E3-Q5",
        "Type": "select",
        "Correct": "Proceed with the replacement by phasing the capex into two stages within the $140M envelope, or by tapping a committed credit facility for the remainder, while documenting the impact on leverage covenants.",
        "Explanation": "A defensible CFO recommendation reconciles a positive-NPV project with the capital envelope by structuring execution — phasing, financing, or partner capital — rather than mechanically rejecting the project. Documenting leverage-covenant impact and presenting the staged plan with sensitivity analysis gives the board a clear, decision-ready path.",
        "Topic": "Capital rationing and phasing",
        "question_state": "Certified",
        "Prompt": "Given the capital-rationing envelope of $140M available after the Flash Tech data-center commitment, what is the most defensible CFO recommendation to the board?",
        "Choices": [
          "Proceed with the full $180M replacement immediately because NPV is positive, ignoring the capital-rationing envelope.",
          "Proceed with the replacement by phasing the capex into two stages within the $140M envelope, or by tapping a committed credit facility for the remainder, while documenting the impact on leverage covenants.",
          "Cancel the replacement and extend the lease because $140M is less than $180M and the project therefore cannot proceed.",
          "Replace the fleet only if the Flash Tech data-center commitment is canceled, with no consideration of strategic priorities."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "A defensible CFO recommendation reconciles a positive-NPV project with the capital envelope by structuring execution — phasing, financing, or partner capital — rather than mechanically rejecting the project. Documenting leverage-covenant impact and presenting the staged plan with sensitivity analysis gives the board a clear, decision-ready path.",
        "ExplanationWrongA": "Choice A treats capital rationing as a hard ceiling; in practice, value-accretive projects above the envelope can be financed through alternative means (debt, sale-leaseback, joint ventures), and the WACC-discounted NPV should drive the decision rather than the cap.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Canceling other strategic commitments to free envelope capacity for one project is rarely the lowest opportunity-cost path; the choice should be evaluated against all competing uses of capital.",
        "ExplanationWrongD": "Refusing to consider financing or phasing ignores the standard CFO toolset and is generally not a defensible recommendation in a capital-budgeting context.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-E3-Q6",
        "Type": "select",
        "Correct": "Recommend the replacement because NPV is theoretically superior for value maximization in mutually exclusive projects, document the IRR/NPV conflict, and identify the reinvestment-rate and scale assumptions that drive the divergence.",
        "Explanation": "NPV is the theoretically superior ranking metric for mutually exclusive projects because it assumes reinvestment at WACC and measures absolute dollar value added. When IRR conflicts with NPV, the typical drivers are scale differences, timing of cash flows, or non-standard cash-flow patterns. The defensible framing is to recommend the higher-NPV project, explain the IRR/NPV conflict in terms of reinvestment-rate and scale assumptions, and present sensitivity around the choice so the board understands the trade-off.",
        "Topic": "NPV-IRR ranking conflict",
        "question_state": "Certified",
        "Prompt": "If a leveraged analysis shows NPV ranking favoring replacement while IRR ranking favors the lease extension, which framing is most defensible for the board paper?",
        "Choices": [
          "Recommend the lease extension because IRR outranks NPV under any capital structure assumption.",
          "Recommend the replacement because NPV is theoretically superior for value maximization in mutually exclusive projects, document the IRR/NPV conflict, and identify the reinvestment-rate and scale assumptions that drive the divergence.",
          "Recommend whichever metric the CEO prefers; methodology is secondary to leadership preference.",
          "Recommend neither; conflicting signals are an automatic disqualifier for the project."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "NPV is the theoretically superior ranking metric for mutually exclusive projects because it assumes reinvestment at WACC and measures absolute dollar value added. When IRR conflicts with NPV, the typical drivers are scale differences, timing of cash flows, or non-standard cash-flow patterns. The defensible framing is to recommend the higher-NPV project, explain the IRR/NPV conflict in terms of reinvestment-rate and scale assumptions, and present sensitivity around the choice so the board understands the trade-off.",
        "ExplanationWrongA": "Choice A treats IRR ranking as theoretically correct; IRR ranking is unreliable for mutually exclusive projects with different cash-flow timing (Fleet replace has 8-year life, lease has 8-year deferral pattern), and NPV-dominance is the correct criterion because it measures dollar value added.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Tying the recommendation to executive preference rather than a defensible methodology undermines governance; the CFO is expected to lead with the analytically defensible choice.",
        "ExplanationWrongD": "Conflicting signals are not generally a disqualifier; they are an opportunity to clarify which metric is appropriate given the project's characteristics and to document the reasoning.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-A3",
    "Title": "Foreign Exposure and Leverage Quality at Atlas Pacific",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Assess foreign operations translation vs transaction exposure (A.5)",
      "Analyze off-balance-sheet financing — lease capitalization (A.7)",
      "Analyze leverage and coverage — D/E, DFL, fixed-charge coverage (A.8)"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 34,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Atlas Pacific, a $620 million industrial equipment manufacturer with a Yokohama subsidiary, closed December with yen appreciation and a new five-year operating lease portfolio. Controller Mei Tanaka must quantify transaction and translation effects and the lease-capitalization impact on the senior credit facility covenants ahead of the January audit committee meeting.",
    "Industry": "Manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Atlas Pacific",
    "Stakeholder": "Controller Mei Tanaka",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ASC 830",
      "transaction vs translation",
      "lease capitalization",
      "leverage quality",
      "covenants",
      "DFL"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Calculate transaction remeasurement gain/loss and distinguish it from CTA translation to OCI",
      "Measure effect of capitalizing operating leases on D/E and fixed-charge coverage and evaluate covenant headroom",
      "Interpret DFL, TIE, and tangible net worth to assess financial risk"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A3-E1",
        "CaseID": "CBQ23-A3",
        "Type": "table",
        "Title": "Exhibit 1 — Foreign Currency Exposure and Subsidiary Data",
        "Purpose": "Provides JPY monetary liability, spot rates, and subsidiary functional-currency indicators to distinguish transaction remeasurement from translation.",
        "ReferencedBy": [
          "CBQ23-A3-Q1",
          "CBQ23-A3-Q3",
          "CBQ23-A3-Q5"
        ],
        "Headers": [
          "Item",
          "Detail",
          "Amount / Rate"
        ],
        "Rows": [
          [
            "JPY-denominated accounts payable (tooling)",
            "Incurred Jan 18, outstanding at Dec 31 — JPY 120,000,000",
            "JPY 120,000,000"
          ],
          [
            "Historical spot rate at incurrence (Jan 18)",
            "JPY per USD",
            "JPY 148 per USD"
          ],
          [
            "Year-end spot rate (Dec 31)",
            "Remeasurement rate for monetary items",
            "JPY 142 per USD"
          ],
          [
            "Average rate for year",
            "Income statement translation",
            "JPY 144 per USD"
          ],
          [
            "Subsidiary functional-currency indicators",
            "Sales, labor, materials, debt in JPY; operations autonomous; cash flows JPY",
            "JPY functional currency"
          ],
          [
            "Subsidiary net assets at Dec 31",
            "Functional currency",
            "JPY 640,000,000"
          ],
          [
            "Cumulative translation adjustment, beginning (credit)",
            "In AOCI",
            "$210,000"
          ]
        ],
        "DataFormat": "JPY amounts in yen; rates JPY per USD; USD whole dollars",
        "AccuracyCheck": "JPY120M/148=810,811; JPY120M/142=845,071; pre-tax loss 34,260. Indicators support JPY functional per ASC 830-10-45."
      },
      {
        "ExhibitID": "CBQ23-A3-E2",
        "CaseID": "CBQ23-A3",
        "Type": "table",
        "Title": "Exhibit 2 — Operating Lease Disclosure — Undiscounted Future Payments",
        "Purpose": "Provides undiscounted operating lease payments and discount rate to estimate lease liability/ROU asset for leverage-adjusted ratios.",
        "ReferencedBy": [
          "CBQ23-A3-Q2",
          "CBQ23-A3-Q4",
          "CBQ23-A3-Q5"
        ],
        "Headers": [
          "Fiscal Year",
          "Payment (USD)"
        ],
        "Rows": [
          [
            "2027",
            "$2,400,000"
          ],
          [
            "2028",
            "$2,400,000"
          ],
          [
            "2029",
            "$2,400,000"
          ],
          [
            "2030",
            "$1,800,000"
          ],
          [
            "2031",
            "$1,200,000"
          ],
          [
            "Total undiscounted",
            "$10,200,000"
          ],
          [
            "Incremental borrowing rate / discount rate",
            "6.0% annual"
          ],
          [
            "Remaining lease term",
            "5 years"
          ]
        ],
        "DataFormat": "USD whole dollars; discount rate effective annual; payments at year-end",
        "AccuracyCheck": "PV at 6%: Yr1 2,264,151; Yr2 2,135,991; Yr3 2,015,086; Yr4 1,425,769; Yr5 896,710; sum 8,737,707"
      },
      {
        "ExhibitID": "CBQ23-A3-E3",
        "CaseID": "CBQ23-A3",
        "Type": "table",
        "Title": "Exhibit 3 — Consolidated Capital Structure and Covenant Package (Pre-Adjustment, GAAP)",
        "Purpose": "Provides GAAP debt, equity, earnings, and lender-defined covenant thresholds to assess reported vs lease-adjusted leverage.",
        "ReferencedBy": [
          "CBQ23-A3-Q2",
          "CBQ23-A3-Q4",
          "CBQ23-A3-Q5",
          "CBQ23-A3-Q6"
        ],
        "Headers": [
          "Metric",
          "Amount (USD)"
        ],
        "Rows": [
          [
            "Total interest-bearing debt (GAAP)",
            "$42,000,000"
          ],
          [
            "Total stockholders' equity (including AOCI)",
            "$38,000,000"
          ],
          [
            "Less: Goodwill and intangibles (deduct for TNW)",
            "$8,500,000"
          ],
          [
            "Tangible net worth (GAAP) — equity minus intangibles",
            "$29,500,000"
          ],
          [
            "EBIT — 12 months",
            "$9,600,000"
          ],
          [
            "Interest expense — contractual coupon",
            "$3,360,000"
          ],
          [
            "Operating lease expense — straight-line rent in SG&A",
            "$2,400,000"
          ],
          [
            "Scheduled current portion of LT debt — principal due next 12 months",
            "$1,500,000"
          ],
          [
            "Covenant 1: Tangible Net Worth — minimum",
            "$28,000,000"
          ],
          [
            "Covenant 2: Debt-to-Equity — maximum",
            "1.40x"
          ],
          [
            "Covenant 3: Fixed-Charge Coverage — minimum",
            "1.80x; defined as (EBIT + Lease Expense) / (Interest + Lease Expense + Principal Due)"
          ]
        ],
        "DataFormat": "USD whole dollars; ratios to two decimals",
        "AccuracyCheck": "GAAP D/E 42/38=1.11 passes 1.40; TNW 29,500 passes 28,000; GAAP FCC (9,600+2,400)/(3,360+2,400+1,500)=1.65x fails 1.80; TIE 9,600/3,360=2.86; DFL 9,600/(9,600-3,360)=1.54"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the pre-tax foreign currency transaction (remeasurement) loss recognized in earnings for the JPY 120,000,000 accounts payable, as a positive amount rounded to nearest dollar. Ignore taxes.",
        "Correct": "34260",
        "Explanation": "Under ASC 830, foreign currency transactions remeasured at current spot with gain/loss in earnings, distinct from translation of JPY-functional subsidiary (current-rate method, CTA to OCI). Recorded at JPY148: 120M/148=810,811. Remeasured at JPY142: 120M/142=845,070. Increase 34,260 is loss that reduces pre-tax income (845,070.42 less 810,810.81 equals 34,259.59, rounded to the nearest dollar). Average rate applies to income translation, not monetary remeasurement. CTA never shelters transaction loss.",
        "Topic": "Foreign currency transaction remeasurement",
        "Subtopic": "Monetary liability at current spot vs CTA",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ASC 830 Remeasurement: USD = FC amount / (FC per USD spot)",
        "CommonTrapReference": "Confusing translation (CTA to OCI) with remeasurement (gain/loss to income).",
        "DecisionTreeReference": "Foreign Currency — functional currency vs remeasurement",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "ASC 830"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Assuming operating leases are capitalized at present value of future payments discounted at 6.0%, what is Atlas's lease-adjusted debt-to-equity ratio at Dec 31? Use GAAP equity $38,000,000 as denominator. Round to two decimals (e.g., 1.34).",
        "Correct": "1.34",
        "Explanation": "PV from Exhibit 2: Yr1 2,400,000*0.9434=2,264,151; Yr2*0.89=2,135,991; Yr3*0.8396=2,015,086; Yr4 1,800,000*0.7921=1,425,769; Yr5 1,200,000*0.7473=896,710; sum 8,737,707. Adjusted debt = 42,000,000+8,737,707=50,737,707. Adjusted D/E = 50,737,707/38,000,000=1.335=1.34. GAAP D/E 1.11, so capitalization consumes $8.7M headroom. Equity unchanged at inception (liability = ROU asset).",
        "Topic": "Off-balance-sheet financing — lease capitalization",
        "Subtopic": "PV of operating leases and adjusted D/E",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "PV — annuity/single sum; Adjusted D/E = (Debt + PV leases)/Equity",
        "CommonTrapReference": "Adding undiscounted payments or deducting PV from equity.",
        "DecisionTreeReference": "Leases — operating vs finance",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "ASC 842"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which statement correctly applies ASC 830 to Atlas Pacific's Japanese subsidiary and the JPY 120,000,000 payable?",
        "Correct": "A",
        "Choices": [
          "The subsidiary's functional currency is JPY, so its statements are translated using the current-rate method with CTA in AOCI; the JPY 120,000,000 payable is a foreign currency transaction remeasured at Dec 31 spot with the $34,260 loss in earnings",
          "The subsidiary's functional currency is USD because the parent reports in USD, so temporal method applies and both CTA and $34k are in earnings",
          "Because yen strengthened, the payable should be remeasured at average rate and deferred in OCI as part of CTA",
          "The subsidiary should use temporal method with historical rates and net transaction loss against CTA so no earnings impact is reported"
        ],
        "Explanation": "JPY indicators (sales, labor, debt in JPY; autonomous operations) make JPY functional per ASC 830-10-45. JPY-functional entities use current-rate method: CTA in OCI. Monetary payable is transaction under ASC 830-20 remeasured at current spot with loss in earnings. Choice B misstates functional currency; C uses average for monetary item and misclassifies to OCI; D nets transaction against CTA which is prohibited.",
        "Topic": "Foreign operations — functional currency",
        "Subtopic": "Current-rate vs temporal; CTA vs earnings",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ASC 830",
        "CommonTrapReference": "Using parent currency as functional; netting transaction into CTA.",
        "DecisionTreeReference": "Foreign Currency — current-rate vs temporal",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "functional currency"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which evaluation of leverage amplification and coverage best reflects economic reality?",
        "Correct": "C",
        "Choices": [
          "Capitalizing leases improves TIE because EBIT unchanged and only equity is reduced, so leverage quality is stronger after adjustment",
          "Atlas's DFL is 2.86x and fixed-charge coverage is 1.54x, indicating 10% EBIT decline cuts EPS only 10%",
          "GAAP TIE is 2.86x (9,600/3,360) but economically adjusted TIE is about 2.47x (9,600/3,884 including $524k imputed lease interest), and GAAP fixed-charge coverage under lender formula is 1.65x, below 1.80x minimum; leverage adds financial risk even though D/E remains within limit",
          "Because lease liability equals ROU asset at inception, capitalization has no effect on any ratio and covenants are unaffected"
        ],
        "Explanation": "DFL = EBIT/(EBIT-Interest) = 9,600/(9,600-3,360)=1.54, so 10% EBIT change moves EBT 15.4% — financial risk. Imputed lease interest first year ~8,738k*6%=524k, so adjusted interest 3,884k and adjusted TIE 9,600/3,884=2.47 deteriorating from 2.86. FCC under agreement (EBIT+Lease)/(Interest+Lease+Principal)=12,000/7,260=1.65 fails 1.80 even on GAAP basis. Choice A inverts TIE logic; B swaps TIE/DFL; D ignores debt rise.",
        "Topic": "Leverage and coverage analysis",
        "Subtopic": "DFL, TIE, fixed-charge coverage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "DFL = EBIT/(EBIT-Interest); TIE = EBIT/Interest; FCC = (EBIT+Lease)/(Interest+Lease+Principal)",
        "CommonTrapReference": "Confusing DOL/DFL; treating lease capitalization as neutral.",
        "DecisionTreeReference": "Leverage — operating vs financial",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "DFL"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which conclusions about covenant compliance and required actions are correct? Select all that apply.",
        "Correct": [
          "On a lease-adjusted basis D/E is about 1.34x, which technically complies with 1.40x but leaves only about $2.5M incremental debt capacity ($53.2M limit minus $50.7M adjusted debt) versus $11.2M on GAAP basis",
          "Tangible net worth is $29.5M ($38.0M minus $8.5M), which complies with $28.0M floor, and at lease-capitalization inception TNW is unchanged because ROU asset equals liability",
          "Fixed-charge coverage under credit agreement formula is about 1.65x and therefore breaches 1.80x minimum even before lease-adjustment debate, requiring waiver planning"
        ],
        "Choices": [
          "The $34,260 remeasurement loss should be deferred in AOCI as part of CTA",
          "On a lease-adjusted basis D/E is about 1.34x, which technically complies with 1.40x but leaves only about $2.5M incremental debt capacity ($53.2M limit minus $50.7M adjusted debt) versus $11.2M on GAAP basis",
          "Tangible net worth is $29.5M ($38.0M minus $8.5M), which complies with $28.0M floor, and at lease-capitalization inception TNW is unchanged because ROU asset equals liability",
          "Fixed-charge coverage under credit agreement formula is about 1.65x and therefore breaches 1.80x minimum even before lease-adjustment debate, requiring waiver planning",
          "The subsidiary CTA should be reported in earnings together with the $34,260 transaction loss"
        ],
        "Explanation": "Covenants must be evaluated on GAAP and economically adjusted bases. GAAP D/E 1.11, adjusted 1.34 both comply but headroom collapses by $8.7M. TNW 38-8.5=29.5 passes 28.0; at inception ASC 842 liability equals ROU asset so TNW neutral. FCC 1.65 <1.80 is breach on covenant's own definition requiring waiver. Choices A/E confuse transaction (earnings) with translation (OCI).",
        "Topic": "Covenant compliance",
        "Subtopic": "D/E headroom, TNW, FCC breach",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Covenant headroom: Max debt = Equity x Max D/E; TNW = Equity - intangibles; FCC per agreement",
        "CommonTrapReference": "Treating FCC breach as cured by lease capitalization.",
        "DecisionTreeReference": "Financial statement analysis — leverage",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "covenants"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each Atlas Pacific concept to its correct analytical treatment.",
        "Correct": {
          "Transaction remeasurement of the JPY 120M payable": "Remeasured at Dec 31 spot (JPY 142); $34k loss in earnings — increases USD liability",
          "Translation of the JPY-functional subsidiary": "Current-rate method — assets/liabilities at current spot, income at average; CTA to AOCI",
          "Lease capitalization effect at inception": "Assets and liabilities each rise about $8.74M; equity unchanged; D/E rises 1.11 to 1.34",
          "Degree of financial leverage (DFL)": "EBIT/(EBIT-Interest)=1.54x; magnifies EPS sensitivity to EBIT changes",
          "Tangible net worth covenant": "Equity ($38.0M) minus goodwill/intangibles ($8.5M)=$29.5M versus $28.0M floor — passes"
        },
        "LeftItems": [
          "Transaction remeasurement of the JPY 120M payable",
          "Translation of the JPY-functional subsidiary",
          "Lease capitalization effect at inception",
          "Degree of financial leverage (DFL)",
          "Tangible net worth covenant"
        ],
        "RightItems": [
          "Remeasured at Dec 31 spot (JPY 142); $34k loss in earnings — increases USD liability",
          "Current-rate method — assets/liabilities at current spot, income at average; CTA to AOCI",
          "Assets and liabilities each rise about $8.74M; equity unchanged; D/E rises 1.11 to 1.34",
          "EBIT/(EBIT-Interest)=1.54x; magnifies EPS sensitivity to EBIT changes",
          "Equity ($38.0M) minus goodwill/intangibles ($8.5M)=$29.5M versus $28.0M floor — passes"
        ],
        "Explanation": "Matching consolidates: monetary transaction uses current spot and hits earnings; JPY-functional subsidiary translated via current-rate with CTA in OCI; lease gross-up raises D/E while TNW neutral at inception; DFL quantifies amplification; TNW deducts intangibles.",
        "Topic": "Integrated leverage and foreign exposure",
        "Subtopic": "Matching treatments",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "ASC 830; ASC 842; DFL; TNW",
        "CommonTrapReference": "Cross-matching CTA to earnings or lease PV to equity reduction.",
        "DecisionTreeReference": "Integrated analysis",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-C4",
    "Title": "Pricing, Uncertainty, and Transfer Pricing at Veridian Consumer",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Evaluate pricing decisions — skimming vs penetration and price elasticity (C.3)",
      "Evaluate business decision models under uncertainty — EV, EVPI, EVSI (C.6)",
      "Evaluate transfer pricing with capacity constraints (C.2/C.5)"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 34,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Veridian Consumer, a $480 million skincare manufacturer, will launch a botanical serum with uncertain holiday demand and a new internal transfer of its active ester between the Ingredients and Finished Goods divisions. Director of FP&A Luis Ortega must recommend a defensible price grounded in elasticity, quantify the value of perfect and sample information for the launch quantity, and set a transfer-pricing policy that holds under both idle and full-capacity conditions.",
    "Industry": "Consumer packaged goods",
    "CompanyType": "Manufacturer",
    "CompanyName": "Veridian Consumer",
    "Stakeholder": "Director of FP&A Luis Ortega",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "price elasticity",
      "optimal markup",
      "EV, EVPI, EVSI",
      "transfer pricing",
      "opportunity cost"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Apply Lerner index to determine profit-maximizing price and evaluate skimming vs penetration",
      "Calculate EV, EV with perfect information, and EVPI for a newsvendor decision",
      "Calculate EVSI and net benefit of sample information and decide purchase",
      "Evaluate minimum transfer-price floors with idle versus full capacity"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-C4-E1",
        "CaseID": "CBQ23-C4",
        "Type": "table",
        "Title": "Exhibit 1 — Demand, Cost, and Elasticity Assessment (Serum)",
        "Purpose": "Provides variable cost, current price/volume, and point elasticity to derive profit-maximizing price.",
        "ReferencedBy": [
          "CBQ23-C4-Q1",
          "CBQ23-C4-Q3",
          "CBQ23-C4-Q6"
        ],
        "Headers": [
          "Item",
          "Data"
        ],
        "Rows": [
          [
            "Variable cost per unit (finished serum)",
            "$18.00"
          ],
          [
            "Current price",
            "$28.00"
          ],
          [
            "Current volume at $28",
            "180,000 units"
          ],
          [
            "Estimated point price elasticity at $28 (Ed)",
            "-2.50 (elastic)"
          ],
          [
            "Survey corroboration — price $30",
            "150,000 units"
          ],
          [
            "Survey corroboration — price $26",
            "210,000 units"
          ],
          [
            "Serum line fixed costs (avoidable if discontinued)",
            "$1,450,000"
          ],
          [
            "Competitor benchmark price",
            "$27.00; cross-price elasticity +0.60"
          ]
        ],
        "DataFormat": "USD per unit; elasticity dimensionless; volume in units",
        "AccuracyCheck": "Lerner-optimal price: (P-18)/P=0.40 → P=18/0.60=30.00; survey volumes imply arc elasticity -2.4, corroborating -2.50"
      },
      {
        "ExhibitID": "CBQ23-C4-E2",
        "CaseID": "CBQ23-C4",
        "Type": "table",
        "Title": "Exhibit 2 — Launch Quantity Payoff Matrix and Information Economics ($000s)",
        "Purpose": "Provides newsvendor payoff matrix, state probabilities, and sample-information reliability to compute EV, EVPI, and EVSI.",
        "ReferencedBy": [
          "CBQ23-C4-Q2",
          "CBQ23-C4-Q4",
          "CBQ23-C4-Q6"
        ],
        "Headers": [
          "Holiday Demand State",
          "Probability",
          "Payoff — Launch Large (80k units)",
          "Payoff — Launch Small (45k units)"
        ],
        "Rows": [
          [
            "Strong",
            "0.40",
            "$2,800",
            "$1,200"
          ],
          [
            "Weak",
            "0.60",
            "-$400",
            "$600"
          ],
          [
            "Pilot social-media test — cost",
            "$95",
            "Predicts Strong with 65% accuracy when truly Strong; predicts Weak with 65% when truly Weak",
            "65% accuracy when truly Strong; predicts Weak with 65% when truly Weak"
          ]
        ],
        "DataFormat": "Payoffs in thousands USD ($000s); probabilities sum to 1.00; test reliability conditional",
        "AccuracyCheck": "EV Large 0.4*2,800+0.6*(-400)=880; EV Small=0.4*1,200+0.6*600=840; EVwPI=0.4*2,800+0.6*600=1,480; EVPI=600; pilot 65% yields EVWSI ~1,045, EVSI 165, net 70"
      },
      {
        "ExhibitID": "CBQ23-C4-E3",
        "CaseID": "CBQ23-C4",
        "Type": "table",
        "Title": "Exhibit 3 — Transfer Pricing: Active Ester (Ingredients → Finished Goods)",
        "Purpose": "Provides variable cost, external price, capacity, and opportunity cost to determine minimum transfer-price floors under idle vs constrained capacity.",
        "ReferencedBy": [
          "CBQ23-C4-Q5",
          "CBQ23-C4-Q6"
        ],
        "Headers": [
          "Division / Metric",
          "Detail / Amount"
        ],
        "Rows": [
          [
            "Ingredients Division — variable cost per kg (ester)",
            "$22.00"
          ],
          [
            "Ingredients Division — external market price per kg",
            "$34.00 (net if sold externally; $2 selling cost saved internally)"
          ],
          [
            "Ingredients Division — contribution margin on external sales",
            "$12.00 per kg ($34 - $22)"
          ],
          [
            "Ingredients Division — practical capacity",
            "50,000 kg"
          ],
          [
            "Ingredients Division — current external sales",
            "38,000 kg"
          ],
          [
            "Ingredients Division — idle capacity",
            "12,000 kg"
          ],
          [
            "Internal requirement — Finished Goods needs",
            "10,000 kg for serum"
          ],
          [
            "Finished Goods — external purchase price (if not sourcing internally)",
            "$34.00 per kg"
          ],
          [
            "Full-capacity scenario",
            "If at 50,000 kg