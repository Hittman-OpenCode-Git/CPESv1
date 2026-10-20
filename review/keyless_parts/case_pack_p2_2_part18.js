22-F9-Q1", "CBQ22-F9-Q3"]
        }
      ]
    },
  {
      "CaseID": "CBQ22-F10",
      "Title": "SOX Compliance and Whistleblower Retaliation at Nexus Industries",
      "SectionTags": ["F"],
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
      "Tags": ["SOX", "whistleblower", "audit committee", "restatement", "Dodd-Frank", "retaliation"],
      "CreatedDate": "2026-09-04",
      "ModifiedDate": "2026-09-04",
      "Author": "Case Author",
      "Confidence": 90,
      "RevisionHistory": [
        {"Date": "2026-09-04", "Version": "1.0", "Author": "Case Author", "Summary": "Initial creation"}
      ],
      "question_state": "Certified",
      "certification_batch": "P2-CASE-CERT-20260921",
      "certification_date": "2026-09-21",
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
          "ExhibitID": "CBQ22-F10-E1",
          "CaseID": "CBQ22-F10",
          "Type": "text",
          "Title": "Exhibit 1 — Q2 Restatement Memo",
          "Purpose": "Provides the factual basis for the earnings restatement, establishing the scope and materiality of the original misstatement.",
          "ReferencedBy": ["CBQ22-F10-Q1", "CBQ22-F10-Q3", "CBQ22-F10-Q6"],
          "Body": "MEMORANDUM — Nexus Industries Q2 Earnings Restatement\n\nDate: August 12, 2026\nFrom: Office of the General Counsel\nTo: Audit Committee\n\nSummary: Management has determined that Q2 revenue was overstated by $4.2M (2.8% of reported revenue) due to premature recognition of three channel-partner shipments that had not met ASC 606 transfer-of-control criteria at the recording date. The shipments were invoiced on June 28 (last day of Q2) but customer acceptance occurred in July.\n\nImpact: Q2 revenue reduced from $150.0M to $145.8M; Q2 operating income reduced from $22.5M to $18.3M; Q2 net income reduced from $16.9M to $13.7M (after 25% tax). The restatement was initiated after employee 'A.M.' reported the timing irregularity to the CFO on July 8.\n\nRestatement process: Q2 10-Q will be amended; prior-period comparatives will not be affected. External auditors have been notified and concur with the adjustment. Management's assessment of internal controls over financial reporting (SOX §404) identified the revenue-recognition override as a material weakness."
        },
        {
          "ExhibitID": "CBQ22-F10-E2",
          "CaseID": "CBQ22-F10",
          "Type": "email",
          "Title": "Exhibit 2 — Whistleblower Retaliation Complaint",
          "Purpose": "Provides the whistleblower's account of retaliation, establishing the factual basis for SOX §806 and Dodd-Frank analysis.",
          "ReferencedBy": ["CBQ22-F10-Q2", "CBQ22-F10-Q4", "CBQ22-F10-Q5"],
          "Body": "From: A.M. (Employee, Revenue Accounting)\nTo: Audit Committee Chair Patricia Voss\nSubject: Retaliation Complaint — Confidential\n\nDear Ms. Voss,\n\nI am writing to report that I have been subjected to retaliation after reporting revenue-timing irregularities to the CFO on July 8, 2026.\n\nTimeline of events:\n- July 8: I reported to CFO Daniel Reeves that three June 28 shipments were recorded as Q2 revenue despite customer acceptance not occurring until July. I provided emails and shipping documents.\n- July 12: My manager, VP of Revenue Sarah Kim, informed me I was being 'reassigned' from the Q3 audit-preparation team, citing 'restructuring.'\n- July 19: My system access to the revenue subledger was revoked — the same access I need to perform my job functions.\n- July 26: I received a performance improvement plan (PIP) citing 'incomplete work product' — the same work product I was blocked from accessing.\n\nI believe these actions constitute retaliation for my good-faith report of accounting irregularities. I request protection under SOX §806 and any other applicable whistleblower statutes.\n\nSincerely,\nA.M."
        }
      ],
      "Items": [
        {
          "ItemID": "CBQ22-F10-Q1",
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
          "Tags": ["SOX 302", "officer certification"],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-F10-Q2",
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
          "Tags": ["audit committee", "investigation"],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-F10-Q3",
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
          "Tags": ["whistleblower", "protections"],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-F10-Q4",
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
          "Tags": ["retaliation", "causation"],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-F10-Q5",
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
          "Tags": ["Dodd-Frank", "remedies"],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-F10-Q6",
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
          "Tags": ["governance", "recommendation"],
          "Dependencies": ["CBQ22-F10-Q3", "CBQ22-F10-Q4", "CBQ22-F10-Q5"]
        }
      ]
    },
  {
      "CaseID": "CBQ22-C9",
      "Title": "Target Costing at SmartSense Electronics",
      "SectionTags": [
        "C"
      ],
      "BlueprintDomain": "Decision Analysis",
      "BlueprintObjectives": [
        "Compute allowable cost from market price and target margin",
        "Determine value-engineering gap and prioritize cost-reduction candidates",
        "Apply life-cycle pricing to evaluate long-run profitability of a new product",
        "Identify relevant costs in a target-costing framework"
      ],
      "PrimaryCompetency": "Calculation",
      "EstimatedMinutes": 30,
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ScenarioText": "SmartSense Electronics is launching a new IoT temperature sensor. Market research indicates a competitive selling price of $48.00 per unit, and SmartSense requires a 35% gross margin to meet its return-on-investment hurdle. The engineering team's current cost estimate is $37.50 per unit. CFO Diane Wu must evaluate whether the product can meet the target cost, which components offer the greatest value-engineering opportunities, and how life-cycle costs affect the go-forward recommendation.",
      "Industry": "Consumer electronics",
      "CompanyType": "Manufacturer",
      "CompanyName": "SmartSense Electronics",
      "Stakeholder": "CFO Diane Wu",
      "BusinessFunction": "Cost accounting",
      "QuestionCount": 6,
      "ExhibitCount": 2,
      "ProductionStatus": "Draft",
      "Version": "1.2",
      "Tags": [
        "target costing",
        "value engineering",
        "life-cycle pricing",
        "gross margin"
      ],
      "CreatedDate": "2026-09-04",
      "ModifiedDate": "2026-09-04",
      "Author": "Case Author",
      "Confidence": 90,
      "RevisionHistory": [
        {
          "Date": "2026-09-04",
          "Version": "1.2",
          "Author": "Case Author",
          "Summary": "Initial creation"
        }
      ],
      "question_state": "Certified",
      "certification_batch": "P2-CASE-CERT-20260921",
      "certification_date": "2026-09-21",
      "recertification_batch": "DL-065-RECERT",
      "recertification_date": "2026-09-28",
      "Part": 2,
      "Part2OnlyFlag": true,
      "LearningObjectives": [
        "Derive allowable cost from target price and required margin",
        "Compute the value-engineering gap between current and allowable cost",
        "Evaluate which cost components to reduce using value-engineering analysis",
        "Integrate life-cycle costs into a target-costing decision"
      ],
      "Exhibits": [
        {
          "ExhibitID": "CBQ22-C9-E1",
          "CaseID": "CBQ22-C9",
          "Type": "table",
          "Title": "Exhibit 1 â€” Current Cost Build",
          "Purpose": "Provides the component-level cost breakdown of the proposed IoT sensor, used to compute the total current cost and identify value-engineering targets.",
          "ReferencedBy": [
            "CBQ22-C9-Q1",
            "CBQ22-C9-Q2",
            "CBQ22-C9-Q5"
          ],
          "Headers": [
            "Component",
            "Current Cost per Unit"
          ],
          "Rows": [
            [
              "Temperature sensor module",
              "$12.80"
            ],
            [
              "Printed circuit board (PCB)",
              "$8.40"
            ],
            [
              "Housing and connectors",
              "$5.60"
            ],
            [
              "Assembly labor",
              "$6.20"
            ],
            [
              "Quality testing",
              "$2.80"
            ],
            [
              "Packaging and shipping prep",
              "$1.70"
            ],
            [
              "Total",
              "$37.50"
            ]
          ],
          "DataFormat": "USD per unit; totals verified as sum of components",
          "AccuracyCheck": "12.80 + 8.40 + 5.60 + 6.20 + 2.80 + 1.70 = 37.50 â€” confirmed"
        },
        {
          "ExhibitID": "CBQ22-C9-E2",
          "CaseID": "CBQ22-C9",
          "Type": "text",
          "Title": "Exhibit 2 â€” Market Research Summary",
          "Purpose": "Provides competitive pricing context and life-cycle cost data needed for the life-cycle pricing evaluation.",
          "ReferencedBy": [
            "CBQ22-C9-Q3",
            "CBQ22-C9-Q4",
            "CBQ22-C9-Q6"
          ],
          "Body": "SmartSense's market research indicates that the competitive wholesale price for comparable IoT temperature sensors is $48.00 per unit. Two major competitors (TempTrak and SensiCore) already sell at this price point with similar specifications. SmartSense expects to sell 180,000 units over a 3-year product life. Beyond the manufacturing cost of $37.50 per unit, the following life-cycle costs have been identified: $420,000 in upfront tooling andæ¨¡å…· (mold) design, $180,000 in initial regulatory certification, $96,000 per year in warranty reserves (3-year life), and $0.85 per unit in end-of-life recycling compliance. The company's required return on investment for new products is 15% on total life-cycle costs."
        }
      ],
      "Items": [
        {
          "ItemID": "CBQ22-C9-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the allowable cost per unit for SmartSense's sensor, given the market price and required gross margin.",
          "Correct": "31.20",
          "Explanation": "Under target costing, the allowable cost equals the market price multiplied by one minus the target gross margin percentage. Allowable cost = $48.00 × (1 − 0.35) = $48.00 × 0.65 = $31.20. This means SmartSense must reduce its per-unit cost from $37.50 to $31.20 — a reduction of $6.30 — to achieve the required 35% margin at the market-clearing price. The allowable cost is the ceiling; any cost above it erodes the target return.",
          "Topic": "Target costing",
          "Subtopic": "Allowable cost computation",
          "Difficulty": "Moderate",
          "DifficultyScore": 3,
          "CognitiveLevel": "Apply",
          "CalculationRequired": true,
          "FormulaReference": "Allowable Cost = Market Price × (1 − Target Gross Margin %)",
          "EstimatedMinutes": 4,
          "ExplanationVersion": 1,
          "Tags": [
            "target costing",
            "allowable cost"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C9-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "numeric",
          "Prompt": "Enter the value-engineering gap per unit â€” the amount by which the current cost exceeds the allowable cost.",
          "Correct": "6.30",
          "Explanation": "Value-engineering gap = Current cost − Allowable cost = $37.50 − $31.20 = $6.30 per unit. This gap represents the cost reduction that engineering must achieve through design changes, material substitution, or process improvement before the product can be launched at the required margin. Over 180,000 units, the total gap is $6.30 × 180,000 = $1,134,000 — a material shortfall that Diane must address before approving production. A common error is to compute the gap relative to selling price rather than relative to the allowable cost.",
          "Topic": "Value engineering",
          "Subtopic": "Gap computation",
          "Difficulty": "Moderate",
          "DifficultyScore": 3,
          "CognitiveLevel": "Apply",
          "CalculationRequired": true,
          "FormulaReference": "Value-Engineering Gap = Current Cost − Allowable Cost",
          "EstimatedMinutes": 4,
          "ExplanationVersion": 1,
          "Tags": [
            "value engineering",
            "cost gap"
          ],
          "Dependencies": [
            "CBQ22-C9-Q1"
          ]
        },
        {
          "ItemID": "CBQ22-C9-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "Which component should SmartSense target FIRST for value-engineering cost reduction?",
          "Correct": "B",
          "Choices": [
            "Packaging and shipping prep ($1.70) because it has the lowest absolute cost and is easiest to change",
            "Printed circuit board (PCB) at $8.40 and the temperature sensor module at $12.80 because together they represent 56.5% of total cost and offer the greatest absolute reduction potential",
            "Quality testing ($2.80) because reducing inspection is the fastest way to cut cost",
            "Assembly labor ($6.20) because automation always yields the highest ROI"
          ],
          "Explanation": "Value engineering focuses on components with the largest cost share because even a modest percentage reduction yields the greatest absolute savings. The sensor module ($12.80) and PCB ($8.40) together total $21.20, or 56.5% of the $37.50 current cost. A 20% reduction across these two components saves $4.24 per unit — covering 67% of the $6.30 gap by itself. Targeting packaging ($1.70) or testing ($2.80) first would require implausibly large percentage cuts to close the gap. Assembly labor reduction depends on capital investment lead times that may exceed the launch window.",
          "Topic": "Value engineering",
          "Subtopic": "Component prioritization",
          "Difficulty": "Difficult",
          "DifficultyScore": 4,
          "CognitiveLevel": "Analyze",
          "CalculationRequired": false,
          "FormulaReference": "",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 1,
          "Tags": [
            "value engineering",
            "prioritization"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C9-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "When evaluating whether to proceed with the sensor, which statement about life-cycle pricing is correct?",
          "Correct": "D",
          "Choices": [
            "Life-cycle pricing only considers manufacturing cost â€” tooling and warranty are period expenses",
            "The $48.00 market price should be compared to the $37.50 manufacturing cost alone, ignoring upstream and downstream costs",
            "Life-cycle pricing assigns all non-manufacturing costs to the period incurred rather than allocating them to units",
            "Life-cycle pricing considers all costs from product inception through end-of-life â€” including tooling, certification, warranty, and disposal â€” and allocates them across expected unit volume to determine true per-unit profitability"
          ],
          "Explanation": "Life-cycle pricing evaluates profitability across the entire product life, not just the manufacturing phase. SmartSense's life-cycle costs include $420,000 in tooling, $180,000 in certification, $288,000 in warranty ($96,000 × 3 years), and $153,000 in recycling compliance ($0.85 × 180,000 units) — totaling $1,041,000 beyond manufacturing. Spread over 180,000 units, these add $5.78 per unit. The true life-cycle cost per unit is $37.50 + $5.78 = $43.28, which exceeds the $31.20 allowable cost by an even wider margin. Ignoring life-cycle costs understates the true cost and overstates projected profitability.",
          "Topic": "Life-cycle pricing",
          "Subtopic": "Conceptual framework",
          "Difficulty": "Difficult",
          "DifficultyScore": 4,
          "CognitiveLevel": "Analyze",
          "CalculationRequired": false,
          "FormulaReference": "",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 1,
          "Tags": [
            "life-cycle pricing",
            "full cost"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C9-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "multi",
          "Prompt": "Which THREE costs are relevant to SmartSense's decision to proceed with or reject the sensor launch? Select exactly three.",
          "Correct": [
            "The $37.50 per-unit manufacturing cost that will be incurred only if the product is launched",
            "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
            "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
          ],
          "Choices": {
            "A": "The $6.30 per-unit value-engineering gap between current and allowable cost",
            "B": "The $37.50 per-unit manufacturing cost that will be incurred only if the product is launched",
            "C": "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
            "D": "The $48.00 market price because it is fixed by competitors and cannot be changed",
            "E": "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
          },
          "Explanation": "Relevant costs are future costs that differ between the proceed and reject alternatives. The $37.50 manufacturing cost (choice B) is relevant: it is a future cost incurred only if the product launches, and the design is not yet finalized, so it is not sunk. The $420,000 tooling (choice C) is relevant because it is an avoidable future cost: if SmartSense cancels, the tooling expenditure is avoided entirely. The $0.85 recycling cost (choice E) is relevant because it is incurred only if production proceeds. The $6.30 value-engineering gap (choice A) is a derived metric, not a cost that will be incurred. The $48.00 market price (choice D) is a revenue parameter, not a cost, and it is given and cannot be altered by SmartSense's decision.",
          "Topic": "Relevant costing",
          "Subtopic": "Cost identification",
          "Difficulty": "Difficult",
          "DifficultyScore": 4,
          "CognitiveLevel": "Evaluate",
          "CalculationRequired": false,
          "FormulaReference": "",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 1,
          "Tags": [
            "relevant costing",
            "differential analysis"
          ],
          "Dependencies": []
        },
        {
          "ItemID": "CBQ22-C9-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
          "Type": "select",
          "Prompt": "Based on the analysis, which recommendation should Diane present to the board?",
          "Correct": "C",
          "Choices": [
            "Proceed immediately â€” the $48.00 market price exceeds the $37.50 manufacturing cost, so the product is profitable on a per-unit basis",
            "Reject the product â€” the value-engineering gap of $6.30 is too large to close through component redesign",
            "Delay launch by two quarters to allow engineering to close the value-engineering gap through PCB redesign and sensor-module sourcing changes, contingent on achieving at least $5.00 of the $6.30 gap in renegotiated component contracts, and re-evaluate life-cycle costs after tooling commitments are finalized",
            "Launch at a higher price of $52.00 to cover the full life-cycle cost of $43.28 per unit while maintaining the 35% margin"
          ],
          "Explanation": "The correct recommendation balances the value-engineering gap against the life-cycle cost reality. Choice C is correct because it (a) acknowledges the gap must be closed before launch, (b) targets the highest-cost components (PCB and sensor module) for the most impactful reductions, (c) conditions the go-ahead on achieving concrete savings, and (d) schedules a re-evaluation after tooling commitments — the point of no return for the $420,000 investment. Choice A ignores the margin shortfall. Choice B is premature — the gap is addressable through component renegotiation. Choice D is unrealistic: competitors are at $48.00, and a $52.00 price likely destroys volume. A common exam trap is to focus only on manufacturing cost and ignore life-cycle costs entirely.",
          "Topic": "Target costing",
          "Subtopic": "Board recommendation",
          "Difficulty": "Difficult",
          "DifficultyScore": 4,
          "CognitiveLevel": "Evaluate",
          "CalculationRequired": false,
          "FormulaReference": "",
          "EstimatedMinutes": 5,
          "ExplanationVersion": 1,
          "Tags": [
            "recommendation",
            "target costing"
          ],
          "Dependencies": [
            "CBQ22-C9-Q1",
            "CBQ22-C9-Q2",
            "CBQ22-C9-Q4"
          ]
        }
      ]
    },
  {
      "CaseID": "CBQ22-C10",
      "Title": "Product Mix Under Two Constraints at Alpine Plastics",
      "SectionTags": [
        "C"
      ],
      "BlueprintDomain": "Decision Analysis",
      "BlueprintObjectives": [
        "Formulate a linear programming problem with two decision variables and two binding constraints",
        "Determine the optimal product mix using the graphical method and corner-point evaluation",
        "Interpret the shadow price of a binding constraint",
        "Conduct what-if analysis on constraint relaxation"
      ],
      "PrimaryCompetency": "Calculation",
      "EstimatedMinutes": 30,
      "Difficulty": "Very Difficult",
      "DifficultyScore": 5,
      "ScenarioText": "Alpine Plastics runs two extrusion lines producing industrial bins (Product A) and storage totes (Product B). Both products share two bottlenecks: extrusion machine hours and packaging line hours. Operations VP Raj Mehta must determine the product mix that maximizes total contribution margin given the available capacity and demand limits for each product.",
      "Industry": "Plastics manufacturing",
      "CompanyType": "Manufacturer",
      "CompanyName": "Alpine Plastics",
      "Stakeholder": "Operations VP Raj Mehta",
      "BusinessFunction": "Cost accounting",
      "QuestionCount": 6,
      "ExhibitCount": 2,
      "ProductionStatus": "Draft",
      "Version": "1.2",
      "Tags": [
        "linear programming",
        "product mix",
        "shadow price",
        "constraint analysis"
      ],
      "CreatedDate": "2026-09-04",
      "ModifiedDate": "2026-09-24",
      "Author": "Case Author",
      "Confidence": 90,
      "RevisionHistory": [
        {
          "Date": "2026-09-04",
          "Vers