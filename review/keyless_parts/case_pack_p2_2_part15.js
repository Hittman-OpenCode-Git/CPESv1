 unsupported by the evidence.",
        "Topic": "Fraud indicators",
        "Subtopic": "Consciousness of guilt",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fraud indicators",
          "resignation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each piece of evidence from the Westfield investigation to the fraud-triangle element or control principle it most directly supports.",
        "LeftItems": [
          "Five entries debiting capital accounts and crediting expense accounts totaling $1.8M",
          "No supervisor approval signatures on any entry despite $50K dual-approval policy",
          "Subsidiary CFO and Controller roles combined in one person",
          "ERP capitalization-override flag activated March 30, 2026 by the subsidiary CFO"
        ],
        "RightItems": [
          "Opportunity — management override of capitalization controls",
          "Opportunity — segregation-of-duties failure",
          "Pressure — the direction of entries (expense-to-asset) indicates earnings manipulation motive",
          "Opportunity — bypass of system-level authorization controls",
          "Rationalization — the entries were intended to be reversed later",
          "Pressure — quarterly earnings targets created the motivation"
        ],
        "Correct": {
          "Five entries debiting capital accounts and crediting expense accounts totaling $1.8M": "Pressure — the direction of entries (expense-to-asset) indicates earnings manipulation motive",
          "No supervisor approval signatures on any entry despite $50K dual-approval policy": "Opportunity — management override of capitalization controls",
          "Subsidiary CFO and Controller roles combined in one person": "Opportunity — segregation-of-duties failure",
          "ERP capitalization-override flag activated March 30, 2026 by the subsidiary CFO": "Opportunity — bypass of system-level authorization controls"
        },
        "Explanation": "The evidence maps as follows: the consistent expense-to-asset direction (first pair) indicates PRESSURE — the motive is earnings inflation, not random error. The missing approval signatures (second pair) demonstrate OPPORTUNITY through management override of authorization controls. The combined CFO/Controller role (third pair) is OPPORTUNITY through segregation-of-duties failure — one person both authorizes and records. The ERP override activation (fourth pair) is OPPORTUNITY through system-level control bypass. Note that three of the four evidence items map to Opportunity — this is characteristic of management-override fraud, where the perpetrator's position creates multiple overlapping control gaps. The pressure element is inferred from the entry direction, not from a single piece of documentary evidence.",
        "Topic": "Evidence classification",
        "Subtopic": "Fraud-triangle mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "evidence mapping",
          "fraud triangle"
        ],
        "Dependencies": [
          "CBQ22-F5-Q1",
          "CBQ22-F5-Q3"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-F6",
    "Title": "SOX Compliance and Whistleblower Retaliation at Nexus Industries",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Identify SOX provisions applicable to earnings restatement and whistleblower retaliation",
      "Evaluate audit committee responsibilities under SOX and stock exchange listing standards",
      "Assess whistleblower protections under SOX §806 and Dodd-Frank §922",
      "Recommend governance actions proportional to the identified compliance failures"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Nexus Industries' audit committee must respond after a whistleblower alleges that management retaliated against the employee for reporting revenue-timing irregularities. The company recently restated Q2 earnings. The audit committee chair, Patricia Voss, must evaluate SOX 302/404/806 exposure, assess Dodd-Frank whistleblower protections, and recommend next steps to the full board.",
    "Industry": "Technology manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Nexus Industries",
    "Stakeholder": "Audit Committee Chair Patricia Voss",
    "BusinessFunction": "Corporate governance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "SOX",
      "whistleblower",
      "audit committee",
      "restatement",
      "Dodd-Frank",
      "retaliation"
    ],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-04",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Archived",
    "archive_batch": "DL-P2-024-DEDUP",
    "archive_date": "2026-09-30",
    "archive_reason": "DL-P2-024 whole-case duplicate; survivor retained in p2/case_pack_p2_authored.js or p2/case_pack_p2_C4_C8.js",
    "certification_date": "2026-09-05",
    "certification_session": "P2-CERT-AUDIT-CASE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Identify which SOX sections apply to earnings restatement, internal control failure, and whistleblower retaliation",
      "Evaluate the audit committee's specific responsibilities under SOX and listing standards",
      "Assess the scope of whistleblower protections under SOX §806 and Dodd-Frank",
      "Apply the legal test for retaliation to the facts presented",
      "Recommend governance actions that address both the restatement and the retaliation"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F6-E1",
        "CaseID": "CBQ22-F6",
        "Type": "text",
        "Title": "Exhibit 1 — Q2 Restatement Memo",
        "Purpose": "Provides the factual basis for the earnings restatement, establishing the scope and materiality of the original misstatement.",
        "ReferencedBy": [
          "CBQ22-F6-Q1",
          "CBQ22-F6-Q3",
          "CBQ22-F6-Q6"
        ],
        "Body": "MEMORANDUM — Nexus Industries Q2 Earnings Restatement\n\nDate: August 12, 2026\nFrom: Office of the General Counsel\nTo: Audit Committee\n\nSummary: Management has determined that Q2 revenue was overstated by $4.2M (2.8% of reported revenue) due to premature recognition of three channel-partner shipments that had not met ASC 606 transfer-of-control criteria at the recording date. The shipments were invoiced on June 28 (last day of Q2) but customer acceptance occurred in July.\n\nImpact: Q2 revenue reduced from $150.0M to $145.8M; Q2 operating income reduced from $22.5M to $18.3M; Q2 net income reduced from $16.9M to $13.7M (after 25% tax). The restatement was initiated after employee 'A.M.' reported the timing irregularity to the CFO on July 8.\n\nRestatement process: Q2 10-Q will be amended; prior-period comparatives will not be affected. External auditors have been notified and concur with the adjustment. Management's assessment of internal controls over financial reporting (SOX §404) identified the revenue-recognition override as a material weakness."
      },
      {
        "ExhibitID": "CBQ22-F6-E2",
        "CaseID": "CBQ22-F6",
        "Type": "email",
        "Title": "Exhibit 2 — Whistleblower Retaliation Complaint",
        "Purpose": "Provides the whistleblower's account of retaliation, establishing the factual basis for SOX §806 and Dodd-Frank analysis.",
        "ReferencedBy": [
          "CBQ22-F6-Q2",
          "CBQ22-F6-Q4",
          "CBQ22-F6-Q5"
        ],
        "Body": "From: A.M. (Employee, Revenue Accounting)\nTo: Audit Committee Chair Patricia Voss\nSubject: Retaliation Complaint — Confidential\n\nDear Ms. Voss,\n\nI am writing to report that I have been subjected to retaliation after reporting revenue-timing irregularities to the CFO on July 8, 2026.\n\nTimeline of events:\n- July 8: I reported to CFO Daniel Reeves that three June 28 shipments were recorded as Q2 revenue despite customer acceptance not occurring until July. I provided emails and shipping documents.\n- July 12: My manager, VP of Revenue Sarah Kim, informed me I was being 'reassigned' from the Q3 audit-preparation team, citing 'restructuring.'\n- July 19: My system access to the revenue subledger was revoked — the same access I need to perform my job functions.\n- July 26: I received a performance improvement plan (PIP) citing 'incomplete work product' — the same work product I was blocked from accessing.\n\nI believe these actions constitute retaliation for my good-faith report of accounting irregularities. I request protection under SOX §806 and any other applicable whistleblower statutes.\n\nSincerely,\nA.M."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F6-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which SOX section MOST directly addresses the CEO and CFO's personal certification obligations related to the Q2 restatement?",
        "Correct": "C",
        "Choices": [
          "SOX §404 — requires management assessment of internal controls, but does not create personal officer certification liability for the financial statements themselves",
          "SOX §806 — addresses whistleblower protections, not officer certification obligations",
          "SOX §302 — requires the CEO and CFO to personally certify that financial statements fairly present results and that disclosure controls are effective; §906 adds criminal penalties for knowing false certifications",
          "SOX §201 — restricts auditor services, which is irrelevant to officer certification"
        ],
        "Explanation": "SOX §302 requires the principal officers (CEO and CFO) to personally certify both that the financial statements fairly present the company's financial condition AND that disclosure controls and procedures are effective. When a restatement reveals that the originally certified statements were materially misstated, the officers' personal exposure under §302 is immediate — they certified statements they knew or should have known were inaccurate. Section §906 layers criminal penalties (up to $5M fine and 20 years imprisonment) for WILLFUL false certifications. Section 404 addresses internal controls but creates the separate material-weakness disclosure, not officer personal liability for statement accuracy. Section 806 addresses whistleblower protections. Section 201 restricts auditor services.",
        "Topic": "SOX certification",
        "Subtopic": "Officer obligations",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "SOX §302; §906",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 302",
          "officer certification"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F6-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the audit committee's PRIMARY responsibility regarding the whistleblower retaliation allegation?",
        "Correct": "A",
        "Choices": [
          "Independently investigate the retaliation claim — the audit committee must ensure the investigation is conducted by qualified personnel (internal audit, external counsel, or forensic specialists) who report directly to the committee, not to management",
          "Refer the complaint to HR for standard employee-relations processing — retaliation allegations follow the same procedure as any other workplace complaint",
          "Defer to management's explanation that the reassignment and PIP were legitimate business decisions unrelated to the July 8 report",
          "Notify the SEC immediately before completing any internal investigation"
        ],
        "Explanation": "The audit committee's responsibility under SOX §301 and NYSE/NASDAQ listing standards is to oversee the investigation of accounting and auditing matters, including whistleblower complaints. The committee must ensure the investigation is independent of management — meaning it is conducted by or reports directly to the committee, not through the management chain that is the subject of the complaint. HR processing (B) is insufficient because the complaint involves potential management misconduct. Deferring to management's explanation (C) compromises independence. SEC notification (D) is premature before the investigation establishes facts — premature external reporting can damage the company without establishing whether retaliation occurred.",
        "Topic": "Audit committee responsibility",
        "Subtopic": "Independent investigation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "SOX §301",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "audit committee",
          "investigation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F6-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three protections or provisions apply to employee A.M.? Select exactly three.",
        "Correct": [
          "SOX §806 — protects employees of publicly traded companies who report fraud to federal agencies, Congress, or internally, from retaliation including demotion, suspension, and harassment",
          "Dodd-Frank §922 — extends whistleblower protections to include a private right of action for retaliation and provides for double back pay plus litigation costs",
          "Company non-retaliation policy — Nexus's own code of conduct prohibits retaliation against good-faith reporters, providing an additional contractual remedy independent of federal statute"
        ],
        "Choices": {
          "A": "SOX §806 — protects employees of publicly traded companies who report fraud to federal agencies, Congress, or internally, from retaliation including demotion, suspension, and harassment",
          "B": "Dodd-Frank §922 — extends whistleblower protections to include a private right of action for retaliation and provides for double back pay plus litigation costs",
          "C": "Sarbanes-Oxley §404 — provides whistleblower protection through the internal control assessment process",
          "D": "Company non-retaliation policy — Nexus's own code of conduct prohibits retaliation against good-faith reporters, providing an additional contractual remedy independent of federal statute",
          "E": "SEC Rule 21F — provides financial awards to whistleblowers, which protects A.M. by incentivizing the report",
          "F": "OSHA whistleblower protection program — OSHA administers SOX §806 claims but does not provide an independent substantive protection"
        },
        "Explanation": "The three applicable protections are: SOX §806 (A) which specifically protects employees of publicly traded companies from retaliation for reporting fraud; Dodd-Frank §922 (B) which strengthens those protections with a private right of action and double back pay; and the company's own non-retaliation policy (D) which provides contractual remedies independent of federal law. Section 404 (C) addresses internal controls, not whistleblower protection — it is the internal-control assessment process, not a protection statute. Rule 21F (E) provides financial incentives for SEC whistleblower tips but does not itself provide retaliation protection — that comes from §806 and Dodd-Frank. OSHA (F) administers §806 claims but is the procedural mechanism, not an independent substantive protection.",
        "Topic": "Whistleblower protections",
        "Subtopic": "Applicable statutes",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "SOX §806; Dodd-Frank §922",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "whistleblower",
          "protections"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F6-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Applying the legal test for retaliation, which facts from A.M.'s complaint would MOST strongly support a retaliation claim?",
        "Correct": "B",
        "Choices": [
          "A.M. received a performance improvement plan citing incomplete work product — PIPs are routine management tools and do not alone indicate retaliation",
          "System access to the revenue subledger was revoked within 11 days of the report, directly blocking A.M. from performing the very job function related to the irregularity reported — the temporal proximity and functional connection create strong circumstantial evidence of retaliatory motive",
          "A.M. was reassigned from the Q3 audit-preparation team — reassignment is a legitimate business decision that does not require justification",
          "A.M. reported to the CFO rather than the audit committee — the reporting channel affects protection eligibility, not the retaliation analysis"
        ],
        "Explanation": "The strongest retaliation evidence is the SYSTEM ACCESS REVOCATION: it occurred 11 days after the report, directly targeted the specific function (revenue subledger access) related to A.M.'s disclosure, and made it impossible for A.M. to perform the job for which the subsequent PIP cited 'incomplete work product.' This creates a causal chain: report → access revoked → unable to work → PIP issued. The temporal proximity (11 days) plus the functional connection (access to the exact system A.M. flagged) satisfies both prongs of the retaliation test: (1) protected activity (the report) and (2) adverse action causally connected to it. The PIP (A) alone is weak — PIPs are common. Reassignment (C) alone is weak — legitimate restructuring occurs. The reporting channel (D) affects whether A.M. qualifies for protection, not whether retaliation occurred.",
        "Topic": "Retaliation test",
        "Subtopic": "Causal connection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "SOX §806; Dodd-Frank §922",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "retaliation",
          "causation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F6-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Under Dodd-Frank §922, what remedies are available to A.M. if retaliation is proven?",
        "Correct": "B",
        "Choices": [
          "Reinstatement with seniority plus single back pay — Dodd-Frank mirrors SOX §806 remedies exactly",
          "Reinstatement with seniority plus DOUBLE back pay, plus compensation for litigation costs including expert witness fees — Dodd-Frank strengthens SOX §806 remedies",
          "Monetary damages capped at the employee's annual salary — Dodd-Frank limits recovery to actual losses",
          "Criminal penalties against the retaliator — Dodd-Frank provides for imprisonment of managers who retaliate"
        ],
        "Explanation": "Dodd-Frank §922 significantly strengthens whistleblower remedies beyond SOX §806: it provides for REINSTATEMENT with full seniority PLUS DOUBLE back pay (not single back pay as under §806), plus compensation for litigation costs including expert witness fees and attorney fees. The double-back-pay remedy is a key distinction from SOX §806 — it creates a financial incentive for whistleblowers to pursue claims and a financial deterrent against retaliation. Option A understates the remedy (single back pay). Option C is incorrect — there is no cap on recovery. Option D is incorrect — Dodd-Frank does not provide criminal penalties for retaliation; criminal penalties apply to the underlying fraud, not the retaliatory act itself.",
        "Topic": "Dodd-Frank remedies",
        "Subtopic": "Whistleblower compensation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "Dodd-Frank §922",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "Dodd-Frank",
          "remedies"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F6-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which governance recommendation best addresses BOTH the restatement and the retaliation issues?",
        "Correct": "A",
        "Choices": [
          "Engage independent forensic counsel to investigate the retaliation claim, direct management to reverse the Q2 entries and file an amended 10-Q, require the CEO and CFO to re-certify under §302/§906, and restore A.M.'s system access and team assignment pending the investigation outcome",
          "Accept management's characterization that the reassignment was legitimate restructuring and focus solely on the Q2 restatement, since the retaliation complaint is an HR matter separate from financial reporting",
          "Terminate A.M. for breach of confidentiality — reporting to the audit committee before completing internal channels violates the company's chain-of-command policy",
          "Delay the restatement filing until the retaliation investigation is complete, since the two issues are interrelated and should be resolved simultaneously"
        ],
        "Explanation": "Option A addresses both issues comprehensively: independent forensic counsel ensures the retaliation investigation is credible and committee-overseen; the restatement corrects the financial misstatement; re-certification resets the officers' personal liability clock; and restoring A.M.'s access and assignment prevents further retaliation pending investigation while preserving the evidence chain. Option B incorrectly separates the issues — the retaliation arose FROM the restatement, making them inseparable. Option C (terminating A.M.) would compound the retaliation and expose Nexus to doubling damages under Dodd-Frank §922. Option D (delaying the restatement) violates the company's filing obligations — the restatement must be filed promptly regardless of parallel investigations; delaying could itself become a separate disclosure violation.",
        "Topic": "Governance recommendation",
        "Subtopic": "Integrated response",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "SOX §302; §806; Dodd-Frank §922",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "governance",
          "recommendation"
        ],
        "Dependencies": [
          "CBQ22-F6-Q3",
          "CBQ22-F6-Q4",
          "CBQ22-F6-Q5"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-B6",
    "Title": "Cost of Capital with Flotation at Orion Semiconductors",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute component costs of capital (debt, preferred stock, common equity) under flotation",
      "Calculate WACC using market-value weights adjusted for flotation costs",
      "Evaluate whether a project return exceeds the after-tax WACC"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Orion Semiconductors is evaluating a $55,000,000 expansion into advanced chip packaging. CFO Daniel Marsh must compute the after-tax cost of debt, cost of preferred stock, and cost of retained earnings and new common equity (including flotation) to determine whether the project expected return exceeds the company weighted average cost of capital. The target capital structure is 40% debt, 10% preferred, and 50% common equity.",
    "Industry": "Semiconductor manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Orion Semiconductors",
    "Stakeholder": "CFO Daniel Marsh",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "cost of capital",
      "WACC",
      "flotation costs",
      "CAPM",
      "YTM"
    ],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-04",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "certification_date": "2026-09-05",
    "certification_session": "P2-B6-REMEDIATE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Calculate the after-tax cost of debt using YTM",
      "Calculate the cost of preferred stock net of flotation",
      "Calculate the cost of retained earnings using CAPM",
      "Calculate the cost of new common equity adjusted for flotation",
      "Compute WACC using market-value weights",
      "Compare project return to WACC for investment decisions"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B6-E1",
        "CaseID": "CBQ22-B6",
        "Type": "table",
        "Title": "Exhibit 1 - Capital Structure and Market Data",
        "Purpose": "Provides bond characteristics, preferred and common equity market data, flotation costs, tax rate, and CAPM inputs.",
        "ReferencedBy": [
          "CBQ22-B6-Q1",
          "CBQ22-B6-Q2",
          "CBQ22-B6-Q3",
          "CBQ22-B6-Q4",
          "CBQ22-B6-Q6"
        ],
        "Headers": [
          "Metric",
          "Value"
        ],
        "Rows": [
          [
            "Outstanding bonds: 10-year, 7.5% coupon, semiannual",
            "$255,000,000 face value"
          ],
          [
            "Current bond price",
            "102.3% of par"
          ],
          [
            "Preferred stock: $4.98 dividend, perpetual",
            "400,000 shares outstanding"
          ],
          [
            "Current preferred price",
            "$60.50"
          ],
          [
            "Common shares outstanding",
            "12,000,000"
          ],
          [
            "Current market price per share",
            "$68.00"
          ],
          [
            "Expected dividend per share (D1)",
            "$3.40 (5.0% of $68.00)"
          ],
          [
            "Flotation cost on new common equity",
            "5.0% of issue price"
          ],
          [
            "Flotation cost on new preferred",
            "3.0% of issue price"
          ],
          [
            "Marginal tax rate",
            "25%"
          ],
          [
            "Risk-free rate",
            "4.2%"
          ],
          [
            "Market risk premium",
            "6.0%"
          ],
          [
            "Beta (equity)",
            "1.35"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ22-B6-E2",
        "CaseID": "CBQ22-B6",
        "Type": "table",
        "Title": "Exhibit 2 - Project Summary",
        "Purpose": "Provides expansion project investment, expected annual after-tax operating income, project life, and salvage value.",
        "ReferencedBy": [
          "CBQ22-B6-Q3",
          "CBQ22-B6-Q6"
        ],
        "Headers": [
          "Metric",
          "Value"
        ],
        "Rows": [
          [
            "Initial investment",
            "$55,000,000"
          ],
          [
            "Expected annual after-tax operating income",
            "$13,200,000"
          ],
          [
            "Project life",
            "12 years"
          ],
          [
            "Salvage value",
            "$0"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B6-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the after-tax cost of debt (rd x (1 - t)), rounded to two decimal places.",
        "Correct": "5.38%",
        "Explanation": "The after-tax cost of debt equals the YTM on Orion's bonds multiplied by (1 - tax rate). The bonds have a 7.5% annual coupon paid semiannually, 10 years remaining, trading at 102.3% of par. Solving the bond pricing equation yields a semiannual YTM of approximately 3.587%, or a simple annualized (APR) pre-tax YTM of 7.17%. After-tax cost = 7.17% x (1 - 0.25) = 5.38%. This uses the standard CMA convention of doubling the semiannual rate (APR) rather than compounding it into an effective annual rate, which would give 5.48%. Interest is tax-deductible under the Internal Revenue Code, creating a tax shield that reduces Orion's effective borrowing cost.",
        "Topic": "After-tax cost of debt",
        "Subtopic": "Yield-to-maturity approach",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-03",
        "ExplanationVersion": 1,
        "Tags": [
          "YTM",
          "cost of debt",
          "tax shield"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B6-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the cost of new common equity including flotation costs, rounded to two decimal places.",
        "Correct": "12.56%",
        "Explanation": "The cost of new common equity adjusts the retained-earnings cost for flotation. Using CAPM: rs = Rf + beta x MRP = 4.2% + 1.35 x 6.0% = 12.30%. Flotation costs are 5.0% of the $68.00 issue price, so net proceeds = $68.00 x (1 - 0.05) = $64.60. The dividend growth model gives re = D1 / (P0 x (1 - F)) + g. With D1 = $68.00 x 5% = $3.40 and implied growth g = rs - D1/P0 = 12.30% - 5.0% = 7.30%, the cost of new equity = $3.40/$64.60 + 7.30% = 5.26% + 7.30% = 12.56%. The flotation premium is 12.56% - 12.30% = 26 basis points, meaningful because equity is 74.1% of the market-value capital structure.",
        "Topic": "Cost of equity with flotation",
        "Subtopic": "New equity issuance costs",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-04",
        "ExplanationVersion": 1,
        "Tags": [
          "flotation",
          "new equity",
          "CAPM"
        ],
        "Dependencies": [
          "CBQ22-B6-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-B6-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on the WACC, should Orion proceed with the expansion?",
        "Correct": "A",
        "Choices": [
          "Yes, the project return exceeds WACC",
          "No, the project return is below WACC",
          "Yes, but only if financed entirely with debt",
          "Cannot be determined without IRR"
        ],
        "Explanation": "Market-value WACC using retained earnings: equity = 12,000,000 x $68.00 = $816,000,000 (74.1%), preferred = 400,000 x $60.50 = $24,200,000 (2.2%), debt = $255,000,000 x 1.023 = $260,865,000 (23.7%). Total = $1,101,065,000. Component costs: debt 5.38%, preferred 8.49% ($4.98/$58.685), retained earnings 12.30% (CAPM). WACC = 0.741 x 12.30% + 0.022 x 8.49% + 0.237 x 5.38% = 9.11% + 0.19% + 1.28% = 10.58%. The project generates $13.2M on a $55M investment, a simplified return of 24.00% that substantially exceeds the 10.58% hurdle. The expansion creates shareholder value regardless of financing mix.",
        "Topic": "WACC investment decision",
        "Subtopic": "Hurdle rate comparison",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-05",
        "ExplanationVersion": 1,
        "Tags": [
          "WACC",
          "investment decision",
          "NPV"
        ],
        "Dependencies": [
          "CBQ22-B6-Q1",
          "CBQ22-B6-Q2"
        ]
      },
      {
        "ItemID": "CBQ22-B6-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which component cost is most sensitive to the flotation-cost assumption?",
        "Correct": "C",
        "Choices": [
          "Cost of debt - bond pricing is volatile",
          "Cost of preferred - perpetual structure amplifies flotation impact",
          "Cost of new common equity - flotation adds 26 bps over retained earnings",
          "WACC is equally sensitive to all three components"
        ],
        "Explanation": "Flotation costs directly affect only newly issued securities, not retained earnings. For preferred stock, 3% flotation raises effective cost from 8.24% to 8.49%, a 25-basis-point increase on a component that is only 2.2% of total capital. For new common equity, 5% flotation raises cost from 12.30% to 12.56%, a 26-basis-point increase on a component that is 74.1% of total capital. Because equity dominates the capital structure, even a modest flotation premium produces the largest absolute WACC impact. The cost of debt is unaffected because existing bonds were issued previously - flotation applies only to new issuances.",
        "Topic": "Flotation sensitivity",
        "Subtopic": "Capital structure impact",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CB-04",
        "ExplanationVersion": 1,
        "Tags": [
          "flotation",
          "sensitivity",
          "equity dominance"
        ],
        "Dependencies": [
          "CBQ22-B6-Q2"
        ]
      },
      {
        "ItemID": "CBQ22-B6-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which of the following are valid reasons to use retained earnings rather than issue new equity?",
        "Correct": [
          "A",
          "B",
          "C"
        ],
        "Choices": [
          "Avoid flotation costs",
          "Maintain EPS if ROE > cost of equity",
          "Signal confidence to the market",
          "Reduce the debt-to-equity ratio",
          "Satisfy bond covenant requirements"
        ],
        "Explanation": "Three rationales favor retained earnings. A - Avoid flotation costs: issuing new shares incurs underwriting fees, legal costs, and registration expenses (5% for Orion), directly reducing net proceeds and raising the effective cost of equity. Retained earnings bypass these costs. B - Maintain EPS: when ROE exceeds the cost of equity, retaining earnings lets the equity base grow while generating returns above shareholders' required rate, supporting EPS growth without dilution. C - Market signaling: retaining earnings signals management confidence that internal projects can generate returns exceeding the cost of capital; issuing new equity may signal the stock is overvalued. D is incorrect: both retained earnings and new common equity increase the equity balance equally, so the debt-to-equity ratio does not change differently under either source - retention is not a distinguishing lever on leverage. E is incorrect: bond covenants typically restrict additional debt, not equity retention.",
        "Topic": "Retained earnings vs new equity",
        "Subtopic": "Financing policy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "CB-04",
        "ExplanationVersion": 1,
        "Tags": [
          "retained earnings",
          "flotation",
          "signaling"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B6-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "fill",
        "Prompt": "If Orion board requires a minimum 200-basis-point risk premium above WACC for expansion projects, what is the minimum acceptable project return?",
        "Correct": "12.58%",
        "Explanation": "The minimum acceptable project return equals WACC plus the board-mandated risk premium. The WACC using retained earnings is 10.58% (from Question 3: market-value weighted average of debt at 5.38%, preferred at 8.49%, and retained earnings at 12.30%, weighted 23.7%, 2.2%, and 74.1% respectively). Adding the 200-basis-point (2.00%) risk premium: 10.58% + 2.00% = 12.58%. Since the project expected return of 24.00% exceeds this hurdle, the project clears the risk-adjusted threshold. The risk premium compensates for project-specific uncertainty - semiconductor expansion into advanced chip packaging carries technology adoption risk, capacity utilization uncertainty, and competitive timing risk that generic WACC does not fully capture.",
        "Topic": "Risk-adjusted hurdle rate",
        "Subtopic": "Project-specific required return",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "CB-05",
        "ExplanationVersion": 1,
        "Tags": [
          "hurdle rate",
          "risk premium"
        ],
        "Dependencies": [
          "CBQ22-B6-Q3"
        ]
      }
    ]
  }
  ,  {
      "CaseID": "CBQ22-A7",
      "Title": "DuPont Decompositio