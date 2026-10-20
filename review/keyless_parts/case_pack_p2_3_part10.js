    "ExplanationVersion": 1,
        "Tags": [
          "escalation"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Share 70% > appetite 50% — concentration breach",
          "B": "Risk score 15 > tolerance 12",
          "C": "Single source yes — requires dual-sourcing plan",
          "D": "Beta 20% breaches",
          "E": "Gamma breaches"
        }
      },
      {
        "ItemID": "CBQ23-D3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match Atlas vendor risk to treatment",
        "Correct": {
          "Alpha 70% L3S5": "Score 15 — top priority",
          "EL 320k": "8%×4M — EL",
          "Dual-source 70→40%": "Reduce L3→1 — $120k",
          "Safety stock 30 days": "Reduce impact 4M→2M — $80k"
        },
        "Explanation": "Each mapping pairs the Exhibit 1-2 fact with its treatment. Alpha 70% L3S5 is score 15, top priority (Q1-Q3). EL 320k is 8% of $4M (Q2). Dual-sourcing 70% to 40% is Reduce, cutting L3 to L1 for $120k. Safety stock 30 days is Reduce on the impact leg, $4M to $2M for $80k. The mapping trap is crossing cost rows (attaching $120k to the buffer) or swapping likelihood and impact legs; verify each pair against its own exhibit row.",
        "Topic": "Vendor mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Concentration",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "vendor-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Alpha 70% L3S5",
          "EL 320k",
          "Dual-source 70→40%",
          "Safety stock 30 days"
        ],
        "RightItems": [
          "Score 15 — top priority",
          "8%×4M — EL",
          "Reduce L3→1 — $120k",
          "Reduce impact 4M→2M — $80k"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-E4",
    "Title": "Capital Rationing at Harborview Renewal",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Rank projects under $6M cap via PI (E.6)",
      "Evaluate post-audit variance"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Harborview Renewal has $6M cap and five projects with NPVs and investments. Controller Sam Okonkwo must rank via PI and test post-audit variance $80k vs $350k budget.",
    "Industry": "Energy",
    "CompanyType": "Service provider",
    "CompanyName": "Harborview Renewal",
    "Stakeholder": "Controller Sam Okonkwo",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "PI",
      "rationing",
      "post-audit"
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
        "Summary": "Initial creation Batch4"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute PI",
      "Select optimum under cap",
      "Decompose post-audit"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E4-E1",
        "CaseID": "CBQ23-E4",
        "Type": "table",
        "Title": "Exhibit 1 — Projects under $6M Cap",
        "Purpose": "Provides investment/NPV for PI ranking.",
        "ReferencedBy": [
          "CBQ23-E4-Q1",
          "CBQ23-E4-Q2",
          "CBQ23-E4-Q3",
          "CBQ23-E4-Q6"
        ],
        "Headers": [
          "Project",
          "Investment",
          "NPV"
        ],
        "Rows": [
          [
            "A",
            "$2.0M",
            "$0.60M"
          ],
          [
            "B",
            "$1.5M",
            "$0.50M"
          ],
          [
            "C",
            "$1.0M",
            "$0.32M"
          ],
          [
            "D",
            "$0.8M",
            "$0.20M"
          ],
          [
            "E",
            "$2.5M",
            "$0.40M"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "PI 1+NPV/Inv: B 1.33 > C1.32 > A1.30 > D1.25 > E1.16"
      },
      {
        "ExhibitID": "CBQ23-E4-E2",
        "CaseID": "CBQ23-E4",
        "Type": "table",
        "Title": "Exhibit 2 — Post-Audit Flagship",
        "Purpose": "Provides budgeted vs actual for variance.",
        "ReferencedBy": [
          "CBQ23-E4-Q4",
          "CBQ23-E4-Q5"
        ],
        "Headers": [
          "Item",
          "Budget",
          "Actual"
        ],
        "Rows": [
          [
            "Revenue",
            "$1.00M",
            "$0.95M"
          ],
          [
            "Variable costs",
            "$0.40M",
            "$0.42M"
          ],
          [
            "Fixed costs",
            "$0.25M",
            "$0.26M"
          ],
          [
            "OI",
            "$0.35M",
            "$0.27M"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "Variance -80k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the PI for Project B, rounded to two decimals.",
        "Correct": "1.33",
        "Explanation": "The profitability index expresses a project's present value of inflows per dollar invested, and it is defined as one plus the ratio of NPV to initial investment. Exhibit 1 shows Project B requiring $1.5M of investment to produce an NPV of $0.50M. PI = 1 + NPV / Investment = 1 + 0.50 / 1.5 = 1.33. Recomputed independently: 0.50 / 1.5 = 0.3333, and 1 + 0.3333 = 1.33. Reading the result: B returns $1.33 of value for every $1.00 committed, so it clears a 1.00 hurdle and would rank above any project below that mark when capital is rationed. A common trap is reporting NPV/Investment (0.33) without the leading one, which understates the return per dollar and would wrongly rank B below a project at the 1.00 threshold.",
        "Topic": "PI",
        "Subtopic": "B",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-02 PI",
        "CommonTrapReference": "NPV/Inv",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "pi"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the total NPV of the optimal $6M-cap portfolio (choose combination maximizing NPV), in millions to two decimals.",
        "Correct": "1.62",
        "Explanation": "With indivisible projects and a binding $6.0M capital cap, the optimal portfolio is the feasible combination with the highest total NPV, which requires enumerating subsets rather than ranking by profitability index. Exhibit 1 lists Project A at $2.0M investment and $0.60M NPV, B at $1.5M and $0.50M, C at $1.0M and $0.32M, D at $0.8M and $0.20M, and E at $2.5M and $0.40M. Testing all combinations that fit the cap, A + B + C + D consumes $5.3M and returns NPV of $0.60 + $0.50 + $0.32 + $0.20 = $1.62M, which exceeds the next-best alternatives (A + B + E at $1.50M and A + B + C at $1.42M). Project E cannot be added: A + B + C + D + E would require $7.8M, well past the cap, and no combination containing E beats $1.62M within the constraint. Total NPV = $1.62M. Recomputed independently: 0.60 + 0.50 + 0.32 + 0.20 = 1.62. A common trap is stopping at the PI ranking, which would suggest favouring C on efficiency grounds, but C alone returns only $0.32M and the cap permits absorbing all four profitable projects rather than concentrating on the best ratio.",
        "Topic": "Optimal NPV",
        "Subtopic": "Cap",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-02 rationing",
        "CommonTrapReference": "PI greedy",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "optimal-npv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Why does PI greedy fail here?",
        "Correct": "B",
        "Explanation": "Choice B: PI-greedy fills B, C, A for $4.5M at NPV 1.42, leaving $1.5M idle — but indivisible project D ($0.8M, NPV 0.20) still fits, lifting the bundle to A+B+C+D at $5.3M with NPV 1.62, which beats greedy 1.42. Ranking is a screen; the integer optimum decides. Choice A claims greedy is always optimal (absolute cue, disproven by the numbers). Choice C is backwards: PI is built from NPV. Choice D invokes book values the exhibits never use.",
        "Topic": "PI greedy",
        "Subtopic": "Limitation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "PI always optimal",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "pi-greedy"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "PI greedy always optimal",
          "B": "PI greedy picks B,C,A =4.5M NPV1.42 but leaves $1.5M unused that could add D 0.20 => A+B+C+D 5.3M NPV1.62 > greedy 1.42, so indivisible projects need integer programming not just ranking",
          "C": "PI ignores NPV",
          "D": "PI uses book values"
        }
      },
      {
        "ItemID": "CBQ23-E4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which component drove the -$80k post-audit variance most?",
        "Correct": "A",
        "Explanation": "Choice A: revenue drove the miss. Budget-to-actual in Exhibit 2: revenue 1.00M to 0.95M (-50k), variable 0.40M to 0.42M (-20k), fixed 0.25M to 0.26M (-10k), summing to the -80k OI variance. Revenue's -50k is the largest leg, so investigation starts there. Choices B and C name real but smaller legs; choice D flattens a ranked decomposition into equality. Decompose before concluding: the biggest absolute leg gets priority.",
        "Topic": "Post-audit",
        "Subtopic": "Driver",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Variable",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "post-audit"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Revenue -50k unfavorable",
          "B": "Variable -20k unfavorable",
          "C": "Fixed -10k unfavorable",
          "D": "All equal"
        }
      },
      {
        "ItemID": "CBQ23-E4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two post-audit purposes are legitimate? (Select two)",
        "Correct": [
          "Refine future forecasts — learn from 50k revenue miss",
          "Identify optimistic bias — revenue over-forecast"
        ],
        "Explanation": "Post-audits exist to learn, not to punish. Refining future forecasts from the $50k revenue miss (A) and naming the optimistic bias behind the over-forecast (B) both improve the next capital decision — the legitimate purposes. Choice C turns review into punishment, which suppresses honest reporting. Choice D rewrites acceptance criteria after the fact, gaming the process. Choice E ignores the variance, wasting the lesson. Select learning uses; reject blame, hindsight edits, and neglect.",
        "Topic": "Post-audit",
        "Subtopic": "Purposes",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Punitive",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "post-audit"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Refine future forecasts — learn from 50k revenue miss",
          "B": "Identify optimistic bias — revenue over-forecast",
          "C": "Punish manager for -80k",
          "D": "Change acceptance criteria retroactively",
          "E": "Ignore variance"
        }
      },
      {
        "ItemID": "CBQ23-E4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match capital budgeting tool to Harborview",
        "Correct": {
          "PI 1.33": "1+NPV/Inv — B ranks first",
          "Optimal 5.3M NPV1.62": "A+B+C+D — integer optimum, not just PI order",
          "Post-audit -80k": "Revenue -50k biggest driver",
          "Greedy vs optimum": "Greedy 4.5M 1.42 < optimum 1.62"
        },
        "Explanation": "Each tool maps to its Harborview result from Q1-Q5. PI 1.33 = 1 + NPV/Inv puts B first. The integer optimum A+B+C+D at $5.3M with NPV 1.62 beats PI-order greedy (1.42). The -80k post-audit variance is revenue-led (-50k biggest driver). And greedy-versus-optimum (1.42 < 1.62) is the indivisibility lesson. The mapping trap is re-sorting by PI rank or re-adding greedy leftovers; each pair restates a computed conclusion, so verify against its source item.",
        "Topic": "Tool mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "PI vs NPV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "tool-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "PI 1.33",
          "Optimal 5.3M NPV1.62",
          "Post-audit -80k",
          "Greedy vs optimum"
        ],
        "RightItems": [
          "1+NPV/Inv — B ranks first",
          "A+B+C+D — integer optimum, not just PI order",
          "Revenue -50k biggest driver",
          "Greedy 4.5M 1.42 < optimum 1.62"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-F5",
    "Title": "Override and Channel Stuffing at Beacon Retail",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Apply fraud triangle and override controls (F.4)",
      "Apply SOX302 vs 404 and whistleblower"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Beacon Retail's controller overrode the 3-way match to ship $420k unordered goods on Dec 28 with side-letter return rights through March, pressured by 'make the quarter' memo. Audit Dir Priya Desai must assess override, SOX, and whistleblower path.",
    "Industry": "Retail",
    "CompanyType": "Service provider",
    "CompanyName": "Beacon Retail",
    "Stakeholder": "Audit Director Priya Desai",
    "BusinessFunction": "Internal audit",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "override",
      "channel stuffing",
      "SOX"
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
        "Summary": "Initial creation Batch4"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Map to fraud triangle",
      "Distinguish SOX302 vs 404",
      "Sequence whistleblower"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F5-E1",
        "CaseID": "CBQ23-F5",
        "Type": "email",
        "Title": "Exhibit 1 — Override Memo and Side Letter",
        "Purpose": "Provides override instruction and side-letter return terms.",
        "ReferencedBy": [
          "CBQ23-F5-Q1",
          "CBQ23-F5-Q2",
          "CBQ23-F5-Q4"
        ],
        "Body": "Memo: 'Make the quarter at any cost — ship the $420k even without PO.' Side letter: 'Product may be returned unrestricted through March 31, no restocking.' Shipped Dec 28, no customer acceptance."
      },
      {
        "ExhibitID": "CBQ23-F5-E2",
        "CaseID": "CBQ23-F5",
        "Type": "text",
        "Title": "Exhibit 2 — SOX and IMA Framework",
        "Purpose": "Summarizes SOX302 quarterly certification vs SOX404 annual ICFR and IMA resolution.",
        "ReferencedBy": [
          "CBQ23-F5-Q3",
          "CBQ23-F5-Q5",
          "CBQ23-F5-Q6"
        ],
        "Body": "SOX302: CEO/CFO quarterly certify disclosure controls and fair presentation. SOX404: annual management ICFR assessment + auditor attestation. IMA: escalate to audit committee when supervisor involved, SOX806 protects."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which fraud triangle leg does the $420k override most directly demonstrate?",
        "Correct": "A",
        "Explanation": "Choice A (Opportunity): the override IS the leg. The memo supplies pressure ('make the quarter'), the 'for the company' framing supplies rationalization — but the act of bypassing the 3-way match plus the side letter is the control breach that creates the opening, and opportunity is the only triangle leg controls can shrink. Choice B mistakes the memo for the act; choice C mistakes the justification for the mechanism; choice D flattens a diagnostic framework into mush. Desai fixes opportunity first because it is controllable.",
        "Topic": "Fraud triangle",
        "Subtopic": "Opportunity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Pressure",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fraud-triangle"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Opportunity — override of 3-way match and side-letter return creates control breach that enables misstatement",
          "B": "Pressure — memo 'make quarter' is pressure, rationalization is 'for company', but the act of overriding is opportunity (the only controllable leg)",
          "C": "Rationalization — memo justifies",
          "D": "All equally — pressure is the act"
        }
      },
      {
        "ItemID": "CBQ23-F5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How should the $420k shipment be accounted under ASC606?",
        "Correct": "B",
        "Explanation": "Choice B: defer the $420k. The side letter grants unrestricted return through March 31 with no customer acceptance, so control has not transferred and the consideration is variable — recognizing December revenue is channel stuffing that overstates Q4. Choice A books on shipment, ignoring the return right entirely. Choice C invents a 10% reserve with no basis in the letter. Choice D discloses without entry, but the goods moved and inventory is misstated with no adjustment. Under ASC 606, no control transfer means no revenue.",
        "Topic": "ASC606",
        "Subtopic": "Revenue",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Shipment = revenue",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "asc606"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Recognize full $420k Dec 28 — shipment = control transfer",
          "B": "Defer — side-letter return through March means control not transferred, variable consideration, channel stuffing — overstates Q4 revenue",
          "C": "Recognize net of 10% reserve",
          "D": "Disclose only — no entry"
        }
      },
      {
        "ItemID": "CBQ23-F5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How do SOX302 and SOX404 differ for this override?",
        "Correct": "C",
        "Explanation": "Choice C states the Exhibit 2 split exactly: SOX 302 is the quarterly CEO/CFO certification of fair presentation and disclosure controls — which this quarter fails on both counts — while SOX 404 is the annual management ICFR assessment plus auditor attestation that will capture the year-end deficiency. Choice A erases the cadence difference; choice B reverses it; choice D moves certification to the auditor when 302 explicitly puts it on management. The trap is memorizing numbers without owners and frequencies.",
        "Topic": "SOX302 vs 404",
        "Subtopic": "Difference",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Both annual",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sox302-vs-404"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Both annual — no difference",
          "B": "302 annual, 404 quarterly — reversed",
          "C": "302 quarterly CEO/CFO certify fair presentation and disclosure controls (this quarter fails); 404 annual management ICFR assessment + auditor attestation (year-end deficiency)",
          "D": "302 is auditor attestation — management not certify"
        }
      },
      {
        "ItemID": "CBQ23-F5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the ICFR implication of overriding the 3-way match for $420k?",
        "Correct": "B",
        "Explanation": "Choice B: material weakness or significant deficiency. Overriding a key application control (3-way match) to ship $420k unordered goods creates a reasonable possibility of material misstatement, and management override is itself an indicator of ineffective ICFR. Choice A calls override 'discretion' — discretion ends where control design begins. Choice C understates to disclosure-only when the balance sheet is misstated. Choice D assumes $420k immaterial without analysis and ignores that override indicators do not scale with the invoice.",
        "Topic": "ICFR deficiency",
        "Subtopic": "Material weakness",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "No deficiency",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "icfr-deficiency"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "No deficiency — override is management discretion",
          "B": "Material weakness or significant deficiency — override of key control creates reasonable possibility of material misstatement; indicator of ineffectiveness",
          "C": "Only disclosure deficiency",
          "D": "Insignificant — $420k immaterial"
        }
      },
      {
        "ItemID": "CBQ23-F5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three controls address Beacon's risks? (Select three)",
        "Correct": [
          "Enforce 3-way match with system block, no override without dual authorization and audit trail",
          "Cutoff control: FOB destination + proof of delivery before revenue",
          "Whistleblower hotline with audit-committee oversight and SOX806 training"
        ],
        "Explanation": "Three controls answer Beacon's three failures. Enforcing the 3-way match with a system block plus dual authorization and audit trail (A) removes the override path. Cutoff discipline — FOB destination plus proof of delivery before revenue (B) — kills channel stuffing at the design level. A whistleblower hotline with audit-committee oversight and SOX 806 training (C) routes the next memo around a pressured controller, per Exhibit 2. Choices D and E legalize the violation (override allowed; book regardless of side letter) and are the opposite of controls..",
        "Topic": "Controls",
        "Subtopic": "Correct",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "3-way vs 2-way",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Enforce 3-way match with system block, no override without dual authorization and audit trail",
          "B": "Cutoff control: FOB destination + proof of delivery before revenue",
          "C": "Whistleblower hotline with audit-committee oversight and SOX806 training",
          "D": "Allow override for quarter-end shipments",
          "E": "Book revenue on shipment regardless of side letter"
        }
      },
      {
        "ItemID": "CBQ23-F5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match Beacon fact to governance",
        "Correct": {
          "Override $420k via 3-way bypass": "Opportunity — control breach, material weakness",
          "Side letter return through March": "Variable consideration — defer, channel stuffing",
          "Memo 'make quarter at any cost'": "Pressure leg — not controllable via controls",
          "SOX302 vs 404": "Quarterly cert vs annual ICFR attestation"
        },
        "Explanation": "Each Beacon fact maps to its governance treatment from Q1-Q5. The $420k 3-way bypass is Opportunity (control breach, material weakness). The side letter through March is variable consideration requiring deferral (channel stuffing). The 'make the quarter at any cost' memo is the Pressure leg, which controls cannot remove — only opportunity is controllable. SOX 302 versus 404 is quarterly management certification versus annual ICFR assessment plus attestation. The mapping trap is filing the memo under opportunity or the side letter under disclosure-only.",
        "Topic": "Beacon mapping",
        "Subtopic": "Integration",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Override vs pressure",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "beacon-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Override $420k via 3-way bypass",
          "Side letter return through March",
          "Memo 'make quarter at any cost'",
          "SOX302 vs 404"
        ],
        "RightItems": [
          "Opportunity — control breach, material weakness",
          "Variable consideration — defer, channel stuffing",
          "Pressure leg — not controllable via controls",
          "Quarterly cert vs annual ICFR attestation"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-A5",
    "Title": "Three-Year Ratio Trend Analysis",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute liquidity, activity, and profitability ratios from comparative financial statements",
      "Interpret ratio trends across multiple periods to identify deterioration",
      "Evaluate management performance using ratio-based benchmarks"
    ],
    "LearningObjectives": [
      "Compute liquidity, activity, and profitability ratios from comparative financial statements",
      "Interpret ratio trends across multiple periods to identify deterioration",
      "Evaluate management performance using ratio-based benchmarks"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Crestline Manufacturing's board has requested a financial health assessment after three years of mixed results. CFO Diane Whitfield must compute key ratios from the comparative statements and explain what the trends reveal about the company's liquidity, efficiency, and profitability.",
    "Industry": "Industrial equipment manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Crestline Manufacturing",
    "Stakeholder": "CFO Diane Whitfield",
    "BusinessFunction": "Financial Reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "question_state": "Certified",
    "Part2OnlyFlag": true,
    "Version": "1.0",
    "Tags": [
      "ratio analysis",
      "liquidity",
      "profitability",
      "trend analysis"
    ],
    "CreatedDate": "2026-09-05",
    "ModifiedDate": "2026-09-05",
    "Author": "AI Author",
    "Confidence": 90,
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A5-E1",
        "CaseID": "CBQ23-A5",
        "Type": "financial-statement",
        "Title": "Exhibit 1 — Comparative Income Statement",
        "Purpose": "Provides three-year revenue, cost, and profitability data for ratio computation.",
        "ReferencedBy": [
          "CBQ23-A5-Q1",
          "CBQ23-A5-Q2",
          "CBQ23-A5-Q3"
        ],
        "Headers": [
          "Item",
          "Year 1",
          "Year 2",
          "Year 3"
        ],
        "Rows": [
          [
            "Net Sales",
            "$4,800,000",
            "$5,100,000",
            "$5,400,000"
          ],
          [
            "Cost of Goods Sold",
            "$3,120,000",
            "$3,468,000",
            "$3,780,000"
          ],
          [
            "Gross Profit",
            "$1,680,000",
            "$1,632,000",
            "$1,620,000"
          ],
          [
            "Operating Expenses",
            "$1,080,000",
            "$1,122,000",
            "$1,170,000"
          ],
          [
            "Operating Income",
            "$600,000",
            "$510,000",
            "$450,000"
          ],
          [
            "Interest Expense",
            "$48,000",
            "$48,000",
            "$48,000"
          ],
          [
            "Income Before Tax",
            "$552,000",
            "$462,000",
            "$402,000"
          ],
          [
            "Income Tax Expense (25%)",
            "$138,000",
            "$115,500",
            "$100,500"
          ],
          [
            "Net Income",
            "$414,000",
            "$346,500",
            "$301,500"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-A5-E2",
        "CaseID": "CBQ23-A5",
        "Type": "financial-statement",
        "Title": "Exhibit 2 — Comparative Balance Sheet",
        "Purpose": "Provides asset, liability, and equity data for ratio computation.",
        "ReferencedBy": [
          "CBQ23-A5-Q1",
          "CBQ23-A5-Q3",
          "CBQ23-A5-Q4"
        ],
        "Headers": [
          "Item",
          "Year 1",
          "Year 2",
          "Year 3"
        ],
        "Rows": [
          [
            "Cash",
            "$320,000",
            "$290,000",
            "$260,000"
          ],
          [
            "Accounts Receivable",
            "$480,000",
            "$560,000",
            "$660,000"
          ],
          [
            "Inventory",
            "$640,000",
            "$720,000",
            "$840,000"
          ],
          [
            "Total Current Assets",
            "$1,440,000",
            "$1,570,000",
            "$1,760,000"
          ],
          [
            "Net Fixed Assets",
            "$1,920,000",
            "$1,930,000",
            "$1,940,000"
          ],
          [
            "Total Assets",
            "$3,360,000",
            "$3,500,000",
            "$3,700,000"
          ],
          [
            "Current Liabilities",
            "$480,000",
            "$520,000",
            "$580,000"
          ],
          [
            "Long-Term Debt",
            "$960,000",
            "$960,000",
            "$960,000"
          ],
          [
            "Shareholders' Equity",
            "$1,920,000",
            "$2,020,000",
            "$2,160,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A5-Q1",
        "Type": "numeric",
        "Prompt": "Enter Crestline's current ratio for Year 3, rounded to two decimals.",
        "Correct": "3.03",
        "Explanation": "Current ratio = Current Assets / Current Liabilities = $1,760,000 / $580,000 = 3.03. This measures short-term liquidity — the ability to cover obligations due within one year. A ratio above 3.0 indicates strong liquidity, but the composition has shifted: cash declined while receivables and inventory grew, suggesting less liquid current assets.",
        "Topic": "Liquidity ratios",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used Year 2 figures ($1,570,000 / $520,000 = 3.02) or reversed the numerator and denominator.",
        "ExplanationWrongB": "This answer may have excluded inventory from current assets, computing the quick ratio instead of the current ratio.",
        "ExplanationWrongC": "This answer likely used average current assets rather than ending balances, or included long-term debt in the denominator.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A5-Q2",
        "Type": "numeric",
        "Prompt": "Enter Crestline's net profit margin for Year 3, expressed as a percentage rounded to two decimals.",
        "Correct": "5.58",
        "Explanation": "Net profit margin = Net Income / Net Sales = $301,500 / $5,400,000 = 5.58%. Despite revenue growing from $4.8M to $5.4M over three years, net income fell from $414,000 to $301,500. The margin compression reflects both rising COGS (from 65% to 70% of sales) and growing operating expenses.",
        "Topic": "Profitability ratios",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "This answer likely used operating income ($450,000) instead of net income, computing operating margin of 8.33%.",
        "ExplanationWrongB": "This answer may have used Year 1 or Year 2 net income with Year 3 sales, or applied an incorrect tax rate.",
        "ExplanationWrongC": "This answer likely used gross profit ($1,620,000) in the numerator, computing gross margin of 30%.",
        "ExplanationWrongD": "",
        "certification_session": "P2-CERT-WAVE",
        "certification_date": "2026-09-30",
        "certification_batch": "P2-HAND-SOLVE-WAVE"
      },
      {
        "ItemID": "CBQ23-A5-Q3",
        "Type": "select",
        "Prompt": "Which ratio trend most clearly signals deteriorating operational efficiency at Crestline?",
        "Correct": "B",
        "Choices": [
          "The current ratio declined from 3.00 to 3.03, indicating weaker short-term liquidity",
          "Days sales outstanding increased from 36.5 to 44.0 days, indicating slower receivables collection",
          "The debt-to-equity ratio remained constant at 0.50, indicating unchanged leverage",
          "The net profit margin declined from 8.63% to 5.58%, indicating lower profitability"
        ],
        "Explanation": "DSO increased from 36.5 days (Year 1: $480K / $4.8M x 365) to 44.0 days (Year 3: $660K / $5.4M x 365), a 20.5% increase. This directly measures receivables management efficiency. While the profit margin decline (D) is significant, it reflects cost issues rather than operational efficiency in asset utilization.",
        "Topic": "Efficiency analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "question_state": "Certified",
        "Part2OnlyFlag": true,
        "ExplanationWrongA": "The current ratio actually improved slightly from 3.00 to 3.03 — it did not decline. This choice misreads the data.",
        "ExplanationWrongC": "Debt-to-equity remaining constant at 0.50 indicates no change in leverage, which is neutral rather than a deterioration signal.",
        "ExplanationWrongD": "The profit margin decline reflects cost control issues, not operational efficiency in asset utilization. DSO is a direct efficiency metric.",
        "ExplanationWrongB": "",
        "certification_session": "P2-CERT-WAVE",
        "ce