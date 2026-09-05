var casePackP2_2 = [
  {
    "CaseID": "CBQ22-B1",
    "Title": "Peak-Season Financing Plan",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute the cash conversion cycle and the effect of float reduction",
      "Quantify the effective cost of trade credit and compare short-term financing alternatives",
      "Integrate working-capital actions into a financing recommendation"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Brixton Wholesale finances a heavy holiday inventory build. Treasurer Lena Fischer must choose among stretching trade credit, drawing the bank revolver, factoring receivables, and renting a lockbox network — and present one integrated plan to the CFO. Annual credit sales run evenly at $36.5 million.",
    "Industry": "Wholesale distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Brixton Wholesale",
    "Stakeholder": "Treasurer Lena Fischer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "cash conversion cycle",
      "trade credit",
      "lockbox",
      "short-term financing"
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
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Compute the cash conversion cycle from DIO, DSO, and DPO",
      "Annualize foregone purchase discounts into an effective rate",
      "Compute lockbox net benefit from float savings and fees",
      "Rank and combine short-term financing sources by effective cost"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B1-E1",
        "CaseID": "CBQ22-B1",
        "Type": "table",
        "Title": "Exhibit 1 — Operating Metrics",
        "Purpose": "Provides the operating-cycle inputs for the CCC computation and the daily sales base for float analysis.",
        "ReferencedBy": [
          "CBQ22-B1-Q1",
          "CBQ22-B1-Q2",
          "CBQ22-B1-Q3",
          "CBQ22-B1-Q5"
        ],
        "Headers": [
          "Metric",
          "Value"
        ],
        "Rows": [
          [
            "Daily credit sales (even run-rate)",
            "$100,000"
          ],
          [
            "Days inventory outstanding (DIO)",
            "75 days"
          ],
          [
            "Days sales outstanding (DSO)",
            "55 days"
          ],
          [
            "Days payable outstanding (DPO)",
            "30 days"
          ],
          [
            "Supplier terms",
            "2/10, net 40"
          ]
        ],
        "DataFormat": "365-day year convention; discount period runs from invoice date to day 10",
        "AccuracyCheck": "CCC components sum consistently; terms imply 30 paid-days beyond the discount window"
      },
      {
        "ExhibitID": "CBQ22-B1-E2",
        "CaseID": "CBQ22-B1",
        "Type": "table",
        "Title": "Exhibit 2 — Financing Alternatives",
        "Purpose": "Provides quoted terms for each short-term funding source compared in the plan.",
        "ReferencedBy": [
          "CBQ22-B1-Q3",
          "CBQ22-B1-Q4",
          "CBQ22-B1-Q6"
        ],
        "Headers": [
          "Source",
          "Terms"
        ],
        "Rows": [
          [
            "Bank revolving line",
            "9.0% annual on drawn balances"
          ],
          [
            "Receivables factor",
            "Advances 80% of receivables at 8.0% on advances PLUS 1.5% commission on ALL factored receivables"
          ],
          [
            "Lockbox network",
            "Cuts collection float by 7 days; costs $28,000 per year"
          ]
        ],
        "DataFormat": "Stated annual rates; commissions apply to total factored volume",
        "AccuracyCheck": "Quotes as provided by counterparties; no hidden fees assumed"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B1-Q1",
        "Type": "numeric",
        "Prompt": "Enter the cash conversion cycle in days.",
        "Correct": "100",
        "Explanation": "CCC = DIO + DSO − DPO = 75 + 55 − 30 = 100 days. Brixton finances one hundred days of operations between paying suppliers and collecting from customers — the inventory build ahead of the holiday season stretches exactly this window, which is why the financing plan matters most now.",
        "Topic": "Cash conversion cycle",
        "Subtopic": "Computation",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Cash Conversion Cycle = DIO + DSO − DPO",
        "CommonTrapReference": "Adding DPO instead of subtracting it.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "CCC"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B1-Q2",
        "Type": "numeric",
        "Prompt": "Enter the effective ANNUAL cost of forgoing the 2/10 discount and paying on day 40, in percent rounded to two decimals.",
        "Correct": "24.83",
        "Explanation": "Foregoing the discount buys 30 extra credit days (day 10 → day 40) at a periodic cost of 2 ÷ 98 = 2.0408% — the discount is expressed on the discounted amount actually paid. Annualized: (2 ÷ 98) × (365 ÷ 30) = 24.83%. Any bank or factor money priced well below 24.83% should be used to take the discount; stretching to day 40 is expensive relative to every quoted alternative in Exhibit 2.",
        "Topic": "Cost of trade credit",
        "Subtopic": "Effective annualization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Cost of Trade Credit = [D ÷ (1 − D)] × [365 ÷ (Net − Discount days)]",
        "CommonTrapReference": "Using 40 days as the financing window, or 2% of the gross invoice as the periodic cost.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "trade credit",
          "effective rate"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B1-Q3",
        "Type": "numeric",
        "Prompt": "Enter the net annual benefit of the lockbox proposal, in dollars.",
        "Correct": "35000",
        "Explanation": "Float freed = 7 days × $100,000/day = $700,000 of permanently faster collections. Earnings on freed funds = $700,000 × 9% = $63,000. Net benefit = $63,000 − $28,000 fee = +$35,000. Because collections accelerate permanently, the benefit is an annuity, not a one-time gain — adopt when net is positive.",
        "Topic": "Lockbox analysis",
        "Subtopic": "Float reduction",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net benefit = (daily receipts × days saved × rate) − annual fees",
        "CommonTrapReference": "Comparing the gross float earnings to zero costs instead of the annual fee.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "lockbox",
          "float"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B1-Q4",
        "Type": "select",
        "Prompt": "Which statement about the financing sources is correct?",
        "Correct": "B",
        "Choices": [
          "The factor is cheapest because its 8% advance rate is below the bank's 9%",
          "Draw the 9% revolver to TAKE the discount — implicit trade credit costs 24.83%, far above 9%; the factor's 1.5% commission applies to ALL factored receivables and pushes its all-in cost above the line as well",
          "Trade credit at net 40 is effectively free financing through the peak",
          "Stretch payables to day 70 before considering bank borrowing"
        ],
        "Explanation": "The comparison must run on effective, all-in costs computed against usable funds. Trade credit forgone costs 24.83% — more than twice the revolver. The factor looks cheap at 8% until the 1.5% commission on EVERY factored dollar is loaded on: commission alone is 150 basis points of total volume, and interest accrues only on the 80% advanced, so the blended cost lands well above the bank's 9%. The disciplined stack is: take discounts using the cheapest external source (the revolver), keep the factor as contingency capacity.",
        "Topic": "Financing source ranking",
        "Subtopic": "Effective cost comparison",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Comparing stated rates while ignoring commissions and compensating features.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "financing",
          "ranking"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B1-Q5",
        "Type": "select",
        "Prompt": "What effect would implementing the lockbox have on the cash conversion cycle?",
        "Correct": "A",
        "Choices": [
          "DSO falls from 55 to 48 days, cutting the CCC from 100 to 93 days",
          "DPO falls, lengthening the CCC",
          "Inventory turns change, raising DIO",
          "The CCC is unchanged because collections do not affect it"
        ],
        "Explanation": "The lockbox accelerates COLLECTIONS: DSO drops by the 7 saved days to 48, and CCC = 75 + 48 − 30 = 93. Payables and inventory behavior are untouched, so DPO and DIO hold — the entire CCC improvement comes through the receivables leg, which is why float tools target collections first.",
        "Topic": "CCC sensitivity",
        "Subtopic": "Collections acceleration",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CCC = DIO + DSO − DPO",
        "CommonTrapReference": "Attributing float gains to payables or inventory legs.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "lockbox",
          "DSO"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B1-Q6",
        "Type": "select",
        "Prompt": "Which integrated recommendation should Lena present to the CFO?",
        "Correct": "D",
        "Choices": [
          "Maximize the factoring arrangement through the peak since advances are immediate",
          "Skip the discounts entirely during peak months and preserve cash, whatever the annualized rate",
          "Adopt the lockbox but stretch payables toward day 60 to fund the build regardless of supplier impact",
          "Borrow on the 9% revolver to take the 2% discounts (saving ~15 points versus the 24.83% implicit rate), adopt the lockbox with its positive $35K net benefit, and hold DPO near 30 days to protect supplier terms — reviewing the factor only if peak needs exceed the line"
        ],
        "Explanation": "Each action clears its own cost-benefit test and they reinforce one another: discount capture saves roughly fifteen points of implicit carry versus the revolver; the lockbox adds $35K net and shortens the cycle seven days; and maintaining DPO discipline preserves the supplier relationships the discount terms depend on. Factoring stays priced as contingency — its commission load makes it a fallback, not a base plan. The integrated view beats any single-lever answer because the pieces interact: cheaper funding makes discount capture unambiguous, and faster collections shrink what must be financed.",
        "Topic": "Integrated financing plan",
        "Subtopic": "Recommendation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Optimizing one lever (payables stretch) while ignoring relationship and rate consequences elsewhere.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation",
          "working capital"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-F1",
    "Title": "The Overstated Quarter",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Identify IMA ethical standards implicated by pressure to misstate revenue",
      "Apply the IMA resolution process when the immediate supervisor is involved",
      "Evaluate revenue recognition under ASC 606 return-rights evidence",
      "Weigh confidentiality obligations against escalation duties"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Three days before quarter close, Controller Marcus Hale discovers that VP of Sales Dawn Reyes promised a major distributor undocumented return rights — a side letter outside the order system — to pull $900K of orders into Q4. The CEO wants the quarter closed and certified on schedule and tells Marcus to 'be a team player.' Marcus must decide his course before certification under SOX Section 302.",
    "Industry": "Consumer products",
    "CompanyType": "Manufacturer",
    "CompanyName": "Vantage Home Products",
    "Stakeholder": "Controller Marcus Hale",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "IMA standards",
      "ASC 606",
      "SOX 302",
      "channel stuffing"
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
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Map conduct to the four IMA ethical standards",
      "Sequence escalation correctly when superiors are involved",
      "Connect side-letter evidence to ASC 606 variable consideration",
      "Bound confidentiality obligations and whistleblower protections"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F1-E1",
        "CaseID": "CBQ22-F1",
        "Type": "text",
        "Title": "Exhibit 1 — Email Excerpt (VP Sales to Distributor)",
        "Purpose": "Provides the side-letter evidence establishing return rights that contradict the recorded sale terms.",
        "ReferencedBy": [
          "CBQ22-F1-Q1",
          "CBQ22-F1-Q3"
        ],
        "Body": "\"Confirming our call: ship the full December program on our confirmation. Product can come back unrestricted through March 31 — no restocking discussion, we'll make it right. Invoice dates will read December 28 so it lands this quarter.\""
      },
      {
        "ExhibitID": "CBQ22-F1-E2",
        "CaseID": "CBQ22-F1",
        "Type": "text",
        "Title": "Exhibit 2 — Policy and Law References",
        "Purpose": "Summarizes the governing framework Marcus must navigate: company code, IMA resolution steps, ASC 606 returns guidance, and certification/whistleblower statutes.",
        "ReferencedBy": [
          "CBQ22-F1-Q2",
          "CBQ22-F1-Q4",
          "CBQ22-F1-Q5",
          "CBQ22-F1-Q6"
        ],
        "Body": "Code of Conduct: full, fair, accurate and timely disclosure; no undisclosed side agreements.\nIMA Statement: Competence, Confidentiality, Integrity, Credibility; resolve by escalating to the next higher level when the immediate supervisor appears involved; consult counsel on legal obligations; consider resignation only after all channels fail.\nASC 606: expected returns reduce transaction price; rights of return require estimate-based adjustment.\nSOX §302: CEO/CFO certify fair presentation and disclosure controls; §906 adds criminal exposure for knowing certifications; §806 and Dodd-Frank protect whistleblowers from retaliation."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F1-Q1",
        "Type": "select",
        "Prompt": "Which IMA ethical standards are MOST directly implicated by recording the $900K with the side letter outstanding?",
        "Correct": "C",
        "Choices": [
          "Competence only — the issue is whether Marcus can compute the entry correctly",
          "Confidentiality only — the side letter is private information belonging to the distributor",
          "Integrity (abstaining from activities that discredit the profession) and Credibility (communicating information fairly and disclosing fully) — with Confidentiality shaping HOW he escalates rather than whether he does",
          "No standards apply until a regulator opens an investigation"
        ],
        "Explanation": "Recording revenue known to carry undocumented return rights misrepresents performance — Integrity bars associating with information the member believes is misleading, and Credibility requires full disclosure of facts needed for fair presentation. Confidentiality still binds HOW information moves (proper channels, no leaks to outsiders without authority or legal duty), but it never converts a known misstatement into an acceptable one. Competence is not the operative failure here.",
        "Topic": "IMA standards mapping",
        "Subtopic": "Integrity and credibility",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating confidentiality as a veto over any escalation.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "integrity",
          "credibility"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F1-Q2",
        "Type": "select",
        "Prompt": "Under the IMA resolution process, what is Marcus's correct FIRST step?",
        "Correct": "B",
        "Choices": [
          "Confront the distributor directly to obtain the letter's cancellation",
          "Bypass Dawn Reyes — because the immediate supervisor appears involved, escalate to her next higher level or the audit committee, presenting the Exhibit 1 evidence",
          "Resign immediately and publicize the arrangement",
          "Wait for the external auditors to discover the letter during fieldwork"
        ],
        "Explanation": "The IMA process starts with the immediate supervisor UNLESS that person appears involved — here Reyes authored the side letter, so direct confrontation both fails procedurally and tips off the counterparty. Escalation moves up: next-level management, internal audit, or the audit committee. Resignation is the LAST resort after channels are exhausted (and 'publicize' ignores confidentiality bounds), and waiting for fieldwork lets a knowing misstatement stand certified in the interim.",
        "Topic": "Ethics resolution process",
        "Subtopic": "Escalation sequence",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Following supervisor-first ordering even when the supervisor is the wrongdoer.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "escalation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F1-Q3",
        "Type": "select",
        "Prompt": "What is the correct accounting conclusion for the $900K shipment given Exhibit 1?",
        "Correct": "A",
        "Choices": [
          "The promised return rights are variable consideration under ASC 606 — the transaction price must be reduced or recognition deferred, so booking the full $900K in Q4 overstates revenue",
          "Title passed on shipment, so full revenue recognition stands regardless of unpublished side letters",
          "Only the cash refund portion affects revenue; future product returns are a separate operating expense",
          "Disclosure in a footnote cures the measurement problem"
        ],
        "Explanation": "Rights of return create VARIABLE CONSIDERATION: the transaction price is constrained for expected returns, and control may not transfer where acceptance is effectively revocable. An undocumented side letter promising unrestricted returns means the December shipments fail full-revenue treatment — Q4 revenue is overstated by the amount not expected to be retained. Title transfer language cannot outrank enforceable return promises, footnote disclosure does not re-measure the price, and returns flow against REVENUE, not to an operating-expense line.",
        "Topic": "Revenue recognition",
        "Subtopic": "Return rights and variable consideration",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ASC 606-10-32: variable consideration and rights of return",
        "CommonTrapReference": "Letting shipping documents override enforceable customer concessions.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ASC 606",
          "returns"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F1-Q4",
        "Type": "select",
        "Prompt": "What does SOX §302 mean for the officers certifying these results?",
        "Correct": "C",
        "Choices": [
          "§302 covers only the effectiveness of internal controls, leaving revenue presentation to the auditors",
          "Certification responsibility rests with the external audit partner, not company officers",
          "The CEO and CFO personally certify that disclosure controls operate and reports fairly present results — certifying KNOWN overstatement exposes them to civil liability and criminal penalties under §906, and Marcus cannot remain silent while it happens",
          "Liability attaches only after the SEC brings enforcement, so pre-certification silence is defensible"
        ],
        "Explanation": "Section 302 requires the principal officers to personally certify both disclosure-controls effectiveness and the fairness of the report. A known channel-stuffed quarter fails 'fairly presents' — and §906 layers criminal exposure onto WILLFUL false certifications. The controller who supplies numbers while aware of the side letter participates in the certification chain; personal knowledge cannot be outsourced to the auditor, whose review is not a substitute for management's assertion.",
        "Topic": "SOX certification",
        "Subtopic": "Officer accountability",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "SOX §302; §906",
        "CommonTrapReference": "Assuming auditor review absorbs officer responsibility for fair presentation.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 302",
          "906"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F1-Q5",
        "Type": "select",
        "Prompt": "How far do Marcus's confidentiality obligations extend if internal escalation stalls?",
        "Correct": "B",
        "Choices": [
          "Confidentiality forbids him from revealing internally-obtained information to anyone outside the company under any circumstances",
          "He may disclose only through proper authorized channels; if internal remedies genuinely fail, SOX §806 and Dodd-Frank protect a good-faith report to the SEC/OSHA from retaliation — but external reporting is the LAST step, not the opening move",
          "Posting the details publicly is protected activity because the purpose is benevolent",
          "Notifying the distributor to cancel the letter satisfies his obligations"
        ],
        "Explanation": "Confidentiality permits lawful disclosure through proper authority — audit committee, board, regulators acting in their jurisdiction — and both §806 and Dodd-Frank shield good-faith whistleblower reports from retaliation precisely so that obligation and protection interlock. But the protected path is ordered: internal escalation first, external regulators second. Public leak (C) abandons the framework, and alerting the counterparty (D) compounds the problem while breaching confidentiality without any authority.",
        "Topic": "Confidentiality boundaries",
        "Subtopic": "Whistleblower protections",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "SOX §806; Dodd-Frank §922",
        "CommonTrapReference": "Reading confidentiality as absolute — or jumping to regulators before internal channels fail.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "confidentiality",
          "whistleblowing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F1-Q6",
        "Type": "select",
        "Prompt": "Which overall course best integrates Marcus's professional obligations?",
        "Correct": "D",
        "Choices": [
          "Certify as instructed and disclose anonymously once bonuses are paid",
          "Quietly reverse the amount in the following quarter to avoid conflict now",
          "Leak the side letter to a financial journalist to force correction from outside",
          "Document the findings contemporaneously, decline to support certification as presented, escalate to the audit committee with Exhibit 1, and consult counsel — reserving resignation for the scenario where the organization refuses remediation AND he would otherwise be complicit in the misstatement"
        ],
        "Explanation": "Every element serves a distinct duty: contemporaneous documentation preserves evidence and his own credibility; refusing support avoids participating in a knowing misstatement (Integrity); audit-committee escalation follows the IMA path around the involved executive; legal consultation protects him through §302/§906 exposure and clarifies mandatory-reporting questions. Deferring the correction (B) leaves investors misled NOW and deepens his complicity. Leaking (C) breaches confidentiality and forfeits the protections that orderly reporting carries. Certification-first-and-later (A) is the classic pattern that turns a controller into a respondent.",
        "Topic": "Integrated ethics decision",
        "Subtopic": "Course of action",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating resignation — or silence — as the default instead of structured escalation.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "resolution",
          "governance"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-A2",
    "Title": "Reading the Quality of Earnings",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute the quality-of-income ratio and core earnings",
      "Detect receivables growth diverging from revenue growth",
      "Form a valuation stance that prices earnings-quality risk"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Equity analyst Jordan Reyes is preparing a pre-IPO note on Riverbend Outfitters. Net income of $24.0M on $200M of sales looks attractive against peer multiples, but operating cash flow tells a different story, receivables are ballooning, and margins are moving against the industry. Jordan must normalize the earnings before any multiple is applied.",
    "Industry": "Apparel retail",
    "CompanyType": "Retailer",
    "CompanyName": "Riverbend Outfitters",
    "Stakeholder": "Equity Analyst Jordan Reyes",
    "BusinessFunction": "Investment research",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "quality of earnings",
      "accruals",
      "core earnings",
      "DSO"
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
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Compute the quality-of-income ratio and interpret sub-1.0 readings",
      "Normalize reported income to core earnings for transitory items",
      "Quantify DSO deterioration and connect it to revenue-quality risk",
      "Anchor valuation on normalized, cash-verified earnings"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-A2-E1",
        "CaseID": "CBQ22-A2",
        "Type": "table",
        "Title": "Exhibit 1 — Headline Results ($M)",
        "Purpose": "Provides the reported earnings, cash flow, sales, and one-time items required for normalization.",
        "ReferencedBy": [
          "CBQ22-A2-Q1",
          "CBQ22-A2-Q2",
          "CBQ22-A2-Q6",
          "CBQ22-A2-Q4"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net income",
            "$24.0"
          ],
          [
            "Operating cash flow",
            "$14.4"
          ],
          [
            "Net sales",
            "$200.0"
          ],
          [
            "Pre-tax gain on sale of headquarters",
            "$5.0"
          ],
          [
            "Pre-tax restructuring charge",
            "$3.0"
          ],
          [
            "Tax rate",
            "25%"
          ]
        ],
        "DataFormat": "USD millions; 25% marginal rate applies to all adjustments",
        "AccuracyCheck": "After-tax gain = 5.0 x 0.75 = 3.75; after-tax charge = 3.0 x 0.75 = 2.25"
      },
      {
        "ExhibitID": "CBQ22-A2-E2",
        "CaseID": "CBQ22-A2",
        "Type": "table",
        "Title": "Exhibit 2 — Growth and Receivables Trend",
        "Purpose": "Provides prior-year comparatives exposing the receivables-sales divergence used in the DSO computation.",
        "ReferencedBy": [
          "CBQ22-A2-Q3",
          "CBQ22-A2-Q4",
          "CBQ22-A2-Q5"
        ],
        "Headers": [
          "Item",
          "Prior year",
          "Current year",
          "Change"
        ],
        "Rows": [
          [
            "Net sales ($M)",
            "$178.6",
            "$200.0",
            "+12%"
          ],
          [
            "Accounts receivable ($M)",
            "$18.0",
            "$26.1",
            "+45%"
          ],
          [
            "Industry gross margin",
            "36%",
            "34%",
            "-2 pts"
          ],
          [
            "Riverbend gross margin",
            "34%",
            "39%",
            "+5 pts"
          ]
        ],
        "DataFormat": "USD millions; margins in percent; 365-day convention",
        "AccuracyCheck": "Receivables grew 45% against 12% sales growth — the central divergence"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-A2-Q1",
        "Type": "numeric",
        "Prompt": "Enter the quality-of-income ratio (operating cash flow ÷ net income), rounded to two decimals.",
        "Correct": "0.60",
        "Explanation": "Quality of income = OCF ÷ NI = $14.4M ÷ $24.0M = 0.60. Only sixty cents of each reported earnings dollar arrived as cash this period — a reading far below the ~1.0 level expected for a stable business. Sustained sub-1.0 ratios mean accruals are carrying the income statement, and accrual-heavy earnings historically precede restatements, write-offs, or growth disappointments far more often than cash-backed earnings do.",
        "Topic": "Quality of income ratio",
        "Subtopic": "Cash verification of earnings",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Quality of income = OCF / NI",
        "CommonTrapReference": "Treating any positive OCF as confirmation of earnings quality regardless of magnitude.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "quality of earnings"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q2",
        "Type": "numeric",
        "Prompt": "Enter CORE earnings (excluding both transitory items, net of tax), in dollars.",
        "Correct": "22500000",
        "Explanation": "After-tax gain = $5.0M × (1 − 0.25) = $3.75M; after-tax charge = $3.0M × 0.75 = $2.25M. Core earnings = $24.0M − $3.75M + $2.25M = $22.5M. Symmetry is the discipline: gains AND charges both leave if they will not recur — keeping only the flattering adjustment biases every downstream multiple.",
        "Topic": "Core earnings normalization",
        "Subtopic": "Transitory items",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Core = NI - after-tax gains + after-tax charges",
        "CommonTrapReference": "Adjusting out charges while leaving gains in reported earnings.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "core earnings"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q3",
        "Type": "numeric",
        "Prompt": "Enter CURRENT-year days sales outstanding using year-end receivables and annual sales, rounded to one decimal.",
        "Correct": "47.6",
        "Explanation": "DSO = Receivables ÷ (Sales ÷ 365) = $26.1M ÷ ($200M/365) = $26.1M ÷ $0.5479M = 47.6 days — up from 36.8 days a year earlier ($18.0M ÷ [$178.6M/365]), a 10.8-day deterioration. Receivables growing 45% against 12% sales growth means bookings are running ahead of collections: either terms loosened, shipments were pulled forward, or some of those 'sales' are not going to convert at all.",
        "Topic": "Days sales outstanding",
        "Subtopic": "Deterioration quantification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "FA-05: DSO = AR / (Sales / 365)",
        "CommonTrapReference": "Reading receivables growth as a healthy sign of expansion.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "DSO",
          "receivables"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q4",
        "Type": "select",
        "Prompt": "Which composite assessment does Exhibits 1 and 2 best support?",
        "Correct": "C",
        "Choices": [
          "Earnings are high quality: net income grew strongly and audited statements support the multiple applied",
          "The quality-of-income ratio alone settles the analysis — 0.60 proves manipulation occurred",
          "Cash covers only 60% of earnings, receivables grow three-and-a-half times faster than sales while DSO deteriorates nearly eleven days, and gross margin expands five points AGAINST an industry declining two — the classic overstatement profile; value the company on normalized, cash-supported earnings pending evidence",
          "Gross margin expansion confirms the receivables growth reflects premium pricing power rather than channel pressure"
        ],
        "Explanation": "Individually each signal admits an innocent explanation; jointly they form the recognized overstatement pattern — accrual-heavy earnings, collection stress, and counter-consensus margin moves. The correct analytical posture is neither accusation nor acceptance but normalization: anchor on the $22.5M core figure, demand aging schedules and sell-through data, and price the uncertainty. A single ratio never proves fraud (B) — it triggers evidence-gathering — and margin expansion against the industry trend (D) is itself the anomaly requiring explanation, not reassurance.",
        "Topic": "Composite earnings quality",
        "Subtopic": "Signal convergence",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Weighing each red flag in isolation instead of reading the pattern.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "red flags",
          "normalization"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q5",
        "Type": "select",
        "Prompt": "Which additional artifact would MOST directly confirm channel stuffing as the driver?",
        "Correct": "A",
        "Choices": [
          "Distributor-level sell-through data showing inventory piling up at customers alongside the quarter-end shipment spike — or documented return-rights/side-letter arrangements matching the receivables surge",
          "A lower effective tax rate relative to the statutory rate",
          "Increased capital expenditures on distribution centers",
          "A higher dividend payout declared in the same quarter"
        ],
        "Explanation": "Channel stuffing leaves a specific fingerprint: goods sitting at distributors unsold (sell-in outrunning sell-through) and often contractual rights making those 'sales' reversible. Sell-through data or side letters convert suspicion into evidence. Tax rate (B) speaks to a different quality dimension, capex (C) is balance-sheet investment unrelated to the receivables bulge, and dividends (D) would if anything drain cash further without explaining who holds the goods.",
        "Topic": "Evidence gathering",
        "Subtopic": "Channel stuffing confirmation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Accepting aggregate growth data where distributor-level sell-through is decisive.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "evidence"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q6",
        "Type": "select",
        "Prompt": "Which valuation stance should Jordan's note take?",
        "Correct": "B",
        "Choices": [
          "Apply the peer multiple to the full $24.0M reported figure since GAAP statements govern comparability",
          "Value Riverbend on the $22.5M core base ONLY with cash-flow verification conditions attached — aging detail, sell-through evidence, and OCF tracking across coming quarters — applying a discount for unresolved earnings-quality risk until the divergence closes",
          "Exclude Riverbend from coverage permanently because red flags were identified",
          "Value on operating cash flow of $14.4M alone, ignoring earnings entirely"
        ],
        "Explanation": "The disciplined endpoint prices what is PROVEN and discounts what is not: core earnings of $22.5M represent sustainable operations, while the unexplained gap between accrual and cash — and between receivables and sales — is risk to be monitored through specific verifiable milestones. Multiplying reported income (A) capitalizes possibly overstated dollars; blacklisting (C) overreacts to signals that are not proof; cash-only valuation (D) discards the real earnings power a resolved picture might support. Conditional valuation aligns price with evidence.",
        "Topic": "Valuation stance",
        "Subtopic": "Risk-adjusted conclusion",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Paying peer multiples for earnings that cash flows have not confirmed.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "valuation"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-D2",
    "Title": "Vendor Breach: Quantifying the Response",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Compute inherent and residual expected loss for a third-party cyber event",
      "Classify responses within the COSO ERM reduce/share/avoid taxonomy",
      "Fund and sequence responses consistent with board risk appetite"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Crestline Steel's payroll processor reports a compromise exposing employee records, and risk lead Sofia Andrade must quantify exposure and fund responses before the next audit-committee meeting. The board's appetite caps residual EXPECTED loss per event class at $250,000 annually.",
    "Industry": "Steel services",
    "CompanyType": "Manufacturer",
    "CompanyName": "Crestline Steel",
    "Stakeholder": "Risk Lead Sofia Andrade",
    "BusinessFunction": "Enterprise risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "cyber risk",
      "expected loss",
      "risk response",
      "appetite"
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
    "certification_session": "P2-059",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Quantify inherent versus residual expected loss for controls and insurance",
      "Apply the appetite threshold to rank required actions",
      "Sequence reduce-first, share-second response architecture"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D2-E1",
        "CaseID": "CBQ22-D2",
        "Type": "table",
        "Title": "Exhibit 1 — Exposure Profile (Annual)",
        "Purpose": "Provides the probability and impact inputs for inherent expected-loss computation.",
        "ReferencedBy": [
          "CBQ22-D2-Q1",
          "CBQ22-D2-Q3",
          "CBQ22-D2-Q5"
        ],
        "Headers": [
          "Factor",
          "Value"
        ],
        "Rows": [
          [
            "Impact if major breach realized",
            "$3,000,000"
          ],
          [
            "Annual probability under current controls",
            "15%"
          ],
          [
            "Board residual-appetite cap per event class",
            "$250,000"
          ]
        ],
        "DataFormat": "USD; probabilities annual",
        "AccuracyCheck": "Impact estimate includes notification, monitoring, legal, and regulatory response"
      },
      {
        "ExhibitID": "CBQ22-D2-E2",
        "CaseID": "CBQ22-D2",
        "Type": "table",
        "Title": "Exhibit 2 — Candidate Responses",
        "Purpose": "Provides cost and effect of each candidate so residual risk and net benefit can be computed and classified.",
        "ReferencedBy": [
          "CBQ22-D2-Q2",
          "CBQ22-D2-Q3",
          "CBQ22-D2-Q4",
          "CBQ22-D2-Q5",
          "CBQ22-D2-Q6"
        ],
        "Headers": [
          "Response",
          "Cost",
          "Effect"
        ],
        "Rows": [
          [
            "Enhanced MFA + continuous monitoring on the vendor connection",
            "$60K per year",
            "Cuts annual probability to 6%"
          ],
          [
            "Cyber liability insurance",
            "$90K per year",
            "Transfers losses above a $750K retained layer to the carrier"
          ],
          [
            "Terminate vendor; bring payroll fully in-house",
            "Multi-year build estimated well above both options",
            "Eliminates this vendor event class entirely"
          ]
        ],
        "DataFormat": "USD annual unless noted",
        "AccuracyCheck": "MFA effect applies to likelihood only; impact unchanged"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D2-Q1",
        "Type": "numeric",
        "Prompt": "Enter the INHERENT annual expected loss, in dollars.",
        "Correct": "450000",
        "Explanation": "Expected loss = probability × impact = 0.15 × $3,000,000 = $450,000 (RM-01) — the pre-action benchmark. It already breaches the board's $250,000 residual cap, so doing nothing is not among the compliant options Sofia can present.",
        "Topic": "Inherent expected loss",
        "Subtopic": "Cyber quantification",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01: Expected Loss = P x I",
        "CommonTrapReference": "Benchmarking against worst-case impact rather than the weighted expectation.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q2",
        "Type": "numeric",
        "Prompt": "Enter the RESIDUAL annual expected loss under the enhanced-MFA option, in dollars.",
        "Correct": "180000",
        "Explanation": "Residual = revised probability × unchanged impact = 0.06 × $3,000,000 = $180,000. MFA and monitoring attack LIKELIHOOD — they make the event less likely to occur but change nothing about its $3M severity when it does. At $180K the position sits INSIDE the board's $250K cap for the first time.",
        "Topic": "Residual expected loss",
        "Subtopic": "Control effect",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03: Residual Risk",
        "CommonTrapReference": "Assuming controls also shrink impact severity.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "residual risk",
          "MFA"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q3",
        "Type": "numeric",
        "Prompt": "Enter the net YEAR-ONE economic benefit of the enhanced-MFA program, in dollars.",
        "Correct": "210000",
        "Explanation": "Expected-loss avoided = $450,000 − $180,000 = $270,000; minus the $60,000 annual control cost → net benefit +$210,000. The control pays for itself more than four-fold in expectation while simultaneously curing the appetite breach — the strongest possible funding case the committee can receive.",
        "Topic": "Mitigation cost-benefit",
        "Subtopic": "Control funding",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net benefit = EL avoided − control cost",
        "CommonTrapReference": "Weighing the $60K cost against the $3M IMPACT instead of the expected-loss reduction.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cost-benefit"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q4",
        "Type": "select",
        "Prompt": "Classify the three candidate responses in the COSO ERM taxonomy.",
        "Correct": "D",
        "Choices": [
          "MFA = share; insurance = avoid; in-house conversion = reduce",
          "MFA = avoid; insurance = reduce; in-house conversion = accept",
          "All three constitute acceptance with different funding mechanisms",
          "MFA = REDUCE (lowers likelihood); insurance = SHARE (transfers severity above retention); in-house conversion = AVOID (eliminates the vendor event class)"
        ],
        "Explanation": "Mechanism determines classification. MFA changes HOW OFTEN the event happens — reduce. Insurance changes WHO PAYS above the retention — share. Killing the vendor relationship removes the exposure class altogether — avoid, here at prohibitive operational cost, which is exactly why avoidance sits unused on the list. Acceptance would mean retaining the 15%/450K profile unfunded, which no proposal does.",
        "Topic": "Response taxonomy",
        "Subtopic": "Classification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Labeling insurance as risk reduction — frequency is untouched.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "taxonomy"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q5",
        "Type": "select",
        "Prompt": "Insurance alone carries a $90K premium and transfers losses above the $750K retention. Which evaluation of insurance AS THE PRIMARY response is correct?",
        "Correct": "B",
        "Choices": [
          "Insurance is sufficient alone: transferring everything above $750K means Crestline bears no material exposure",
          "Insurance leaves the 15% likelihood untouched — the event still occurs with operational, reputational, and regulatory consequences inside the retention layer — so it complements but cannot substitute for reducing likelihood; the compliant primary action is the MFA program at $180K residual",
          "Insurance fails the appetite test because premiums count as expected loss",
          "Insurance and MFA are interchangeable since both appear in Exhibit 2"
        ],
        "Explanation": "Sharing redistributes SEVERITY; it does nothing about FREQUENCY — the breach still happens, still disrupts payroll, still reaches regulators and headlines, all within the retained first layer and beyond the policy's scope. The board cap reads on RESIDUAL expected loss of the event class as experienced by the firm; likelihood-reduction (MFA, $180K) addresses it directly and earns a positive net benefit, while insurance works best layered behind likelihood reduction for tail severities. Premiums are a cost item, not expected loss (C) — the failure mode is substitution, not accounting.",
        "Topic": "Share versus reduce",
        "Subtopic": "Response sequencing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Buying transfer first and calling the likelihood problem solved.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "insurance",
          "sequencing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q6",
        "Type": "select",
        "Prompt": "What should Sofia recommend to the audit committee?",
        "Correct": "A",
        "Choices": [
          "Fund the enhanced-MFA program immediately — net benefit +$210K and residual of $180K restores compliance with the $250K cap — and evaluate cyber insurance NEXT cycle as a tail-severity complement once likelihood reduction is embedded",
          "Buy only the insurance policy this cycle and defer all control spending to next year's budget",
          "Terminate the payroll vendor now despite the migration cost, since any breach risk is unacceptable",
          "Take no funded action but add the exposure to the watchlist and re-present annually"
        ],
        "Explanation": "The recommendation follows the arithmetic and the taxonomy: likelihood-reduction first (it cures the breach of appetite AND pays for itself), tail-transfer second (insurance priced as a complement once the root cause is contained), avoidance rejected on cost-benefit grounds. Deferring controls for insurance-only (B) leaves frequency untouched and the root cause live; termination (C) spends multi-year money to solve a problem $60K annually now contains; watchlisting (D) manages optics while the firm remains $200K outside its own appetite line.",
        "Topic": "Committee recommendation",
        "Subtopic": "Response sequencing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Funding visibility (watchlists) instead of exposure reduction.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-C1",
    "Title": "Bottleneck Product Mix Under Uncertainty",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Determine the profit-maximizing product mix under a single constrained resource",
      "Compute expected monetary values of scheduling alternatives across discrete demand states",
      "Calculate the expected value of perfect information and apply it to a purchased-forecast decision"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Kestrel Peak Outfitters manufactures technical backpacks at its Boise plant, where the stitching line is the binding constraint at 12,000 machine hours per season. CFO Dana Whitfield must recommend to the operations committee—before the spring booking cycle—how to commit the line between the high-margin Cascade 65L and the lighter Alpine 40L while trail demand is uncertain. Treasury's scenario model attaches probabilities to strong, moderate, and soft demand states and estimates season contribution under a Cascade-priority versus an Alpine-priority schedule. Summit Research Partners has offered a study that would identify the demand state with certainty for a $5,500 fee. Dana needs the optimal planning mix, the expected value of each schedule, and the value of perfect information before Friday's committee vote.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C1-E1",
        "CaseID": "CBQ22-C1",
        "Type": "table",
        "Title": "Exhibit 1 — Product Economics and Stitching-Line Capacity",
        "Purpose": "Supplies contribution margins, machine-hour requirements, demand ceilings, and bottleneck capacity used to rank products and build the planning-case mix for Q1.",
        "ReferencedBy": [
          "CBQ22-C1-Q1",
          "CBQ22-C1-Q5"
        ],
        "Headers": [
          "Item",
          "Contribution margin per unit",
          "Machine hours per unit",
          "Maximum seasonal demand (units)",
          "Maximum contribution if demand fully met"
        ],
        "Rows": [
          [
            "Alpine 40L",
            "$60",
            "2.0",
            "6,000",
            "$360,000"
          ],
          [
            "Cascade 65L",
            "$96",
            "3.0",
            "3,000",
            "$288,000"
          ],
          [
            "Stitching line (bottleneck) capacity",
            "—",
            "12,000 hours per season",
            "—",
            "—"
          ]
        ],
        "DataFormat": "USD whole dollars; hours in decimals; units in whole units",
        "AccuracyCheck": "Maximum contribution = CM per unit × maximum seasonal demand: Alpine 6,000 × $60 = $360,000; Cascade 3,000 × $96 = $288,000; both verified."
      },
      {
        "ExhibitID": "CBQ22-C1-E2",
        "CaseID": "CBQ22-C1",
        "Type": "table",
        "Title": "Exhibit 2 — Season Contribution by Demand State and Schedule Commitment",
        "Purpose": "Provides the payoff matrix and state probabilities used for expected-value, perfect-information, and regret analysis in Q2 through Q6.",
        "ReferencedBy": [
          "CBQ22-C1-Q2",
          "CBQ22-C1-Q3",
          "CBQ22-C1-Q4",
          "CBQ22-C1-Q5",
          "CBQ22-C1-Q6"
        ],
        "Headers": [
          "Demand state",
          "Probability",
          "Cascade-priority schedule (annual contribution)",
          "Alpine-priority schedule (annual contribution)"
        ],
        "Rows": [
          [
            "Strong trail demand",
            "0.40",
            "$388,000",
            "$366,000"
          ],
          [
            "Moderate trail demand",
            "0.35",
            "$374,000",
            "$361,000"
          ],
          [
            "Soft trail demand",
            "0.25",
            "$330,000",
            "$346,000"
          ]
        ],
        "DataFormat": "Probabilities in decimals summing to 1.00; USD whole dollars",
        "AccuracyCheck": "Probabilities total 1.00. EV(Cascade-priority) = $368,600; EV(Alpine-priority) = $359,250; both recomputed from the table."
      },
      {
        "ExhibitID": "CBQ22-C1-E3",
        "CaseID": "CBQ22-C1",
        "Type": "email",
        "Title": "Exhibit 3 — Research Offer from Summit Research Partners",
        "Purpose": "Documents the $5,500 fee for the certainty-equivalent demand study that Q4 evaluates against the EVPI.",
        "ReferencedBy": [
          "CBQ22-C1-Q4"
        ],
        "Body": "From: M. Okafor, Client Director, Summit Research Partners\nTo: Dana Whitfield, CFO, Kestrel Peak Outfitters\nSubject: Syndicated Trail-Demand Signal Study — Spring Season\n\nDana — our syndicated panel can identify your spring demand state (strong / moderate / soft) with certainty before your stitching schedule is locked. Delivery is five business days from engagement, ahead of your booking cutoff. The flat fee is $5,500 for the season. If the committee wants the read, we need a signed order by Wednesday.",
        "DataFormat": "Business email text; USD whole dollars",
        "AccuracyCheck": "Fee stated once at $5,500; timing consistent with scenario lock date."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C1-Q1",
        "Type": "numeric",
        "Prompt": "Under the Strong-demand planning case, determine the total seasonal contribution margin from the profit-maximizing mix of Alpine 40L and Cascade 65L packs given the 12,000-hour stitching-line constraint. Enter the amount in whole dollars (tolerance ±$1).",
        "Correct": "378000",
        "Explanation": "The governing principle is constrained-resource optimization: when capacity binds, rank products by contribution margin per unit of the scarce resource rather than per unit sold. Cascade 65L earns $96 over 3.0 hours = $32.00 per stitching-hour; Alpine 40L earns $60 over 2.0 hours = $30.00 per hour, so Cascade is scheduled first. Cascade demand of 3,000 units absorbs 9,000 hours, leaving 3,000 hours: 3,000 ÷ 2.0 = 1,500 Alpine units (within its 6,000-unit ceiling). Total contribution = (3,000 × $96) + (1,500 × $60) = $288,000 + $90,000 = $378,000. A common trap is ranking by total margin per unit and filling the line with Alpine 40L, which consumes all 12,000 hours for only $360,000 and sacrifices $18,000 of contribution.",
        "Topic": "Constrained-resource product mix",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q2",
        "Type": "numeric",
        "Prompt": "Compute the expected annual contribution of the Cascade-priority schedule across the three demand states (expected value without perfect information). Round to the nearest whole dollar (tolerance ±$1).",
        "Correct": "368600",
        "Explanation": "Expected value weights each state's payoff by its probability: EV = Σ(Pi × Outcomei) = (0.40 × $388,000) + (0.35 × $374,000) + (0.25 × $330,000) = $155,200 + $130,900 + $82,500 = $368,600. The probabilities sum to 1.00 as required. For contrast, the Alpine-priority alternative is worth (0.40 × $366,000) + (0.35 × $361,000) + (0.25 × $346,000) = $146,400 + $126,350 + $86,500 = $359,250, so committing to Cascade-priority maximizes expected contribution. A common trap is averaging the three payoffs equally ($364,000 here) instead of applying probabilities—the simple mean ignores management's view of state likelihoods and misstates the decision basis.",
        "Topic": "Expected monetary value",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-10",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q3",
        "Type": "select",
        "Prompt": "What is the expected value of perfect information about next season's demand state?",
        "Correct": "B",
        "Choices": {
          "A": "$9,350, the gap between the two schedules' expected contributions",
          "B": "$4,000, the probability-weighted gain from switching schedules with hindsight",
          "C": "$16,000, the soft-state contribution spread between the two commitments",
          "D": "$42,000, the range between the best and worst outcomes across states"
        },
        "Explanation": "EVPI = EV with perfect information − EV without it (DA-11). With perfect foresight the committee picks the better schedule state by state and expects (0.40 × $388,000) + (0.35 × $374,000) + (0.25 × $346,000) = $155,200 + $130,900 + $86,500 = $372,600; without it the best commitment is worth $368,600. EVPI = $372,600 − $368,600 = $4,000, which equals the weighted regret of being locked into Cascade-priority in the soft state (0.25 × $16,000). Choice A subtracts the two schedules' unconditional EVs ($368,600 − $359,250 = $9,350)—that measures how much the winner beats the loser, not what information is worth.",
        "Topic": "Value of perfect information",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-11",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q4",
        "Type": "select",
        "Prompt": "Summit Research Partners offers a syndicated study that would reveal the demand state with certainty before the schedule is locked. Based strictly on expected-value logic, what should the operations committee do?",
        "Correct": "D",
        "Choices": {
          "A": "Accept the offer, because perfect information raises expected contribution by $9,350, well above the $5,500 fee",
          "B": "Accept the offer, because removing exposure to the soft-demand outcome alone adds $16,000 of expected contribution",
          "C": "Decline the offer, because maximizing expected value makes external demand research redundant in every form",
          "D": "Decline the offer, because the $5,500 fee exceeds the $4,000 expected value of perfect information"
        },
        "Explanation": "Perfect information is worth at most its EVPI of $4,000, so paying $5,500 destroys $1,500 of expected value even though the forecast is flawless. Because no forecast can outperform perfect information, the EVPI caps what any forecasting product can rationally command; the constructive path is to negotiate the fee below $4,000 or act on internal booking indicators. Choice A misuses the $9,350 winner-versus-loser gap as an information value; choice B treats eliminating one state's exposure as free when hindsight switching gains only $16,000 × 0.25 = $4,000 on average; choice C overreaches—research priced below EVPI can add value. The trap is anchoring on gross state swings instead of probability-weighted regret.",
        "Topic": "Purchased forecast versus EVPI",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-11",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q5",
        "Type": "multi",
        "Prompt": "Which three statements about Kestrel Peak's scheduling decision are correct? Select exactly three.",
        "Correct": [
          "Ranking the packs by contribution margin per stitching-hour, rather than per unit, is what drives the Cascade-priority recommendation",
          "The $4,000 EVPI is the maximum fee the committee should rationally pay for a forecast of the demand state",
          "A forecast fee above $4,000 would reduce the expected value of the schedule decision, however accurate the forecast proves"
        ],
        "Choices": {
          "A": "Ranking the packs by contribution margin per stitching-hour, rather than per unit, is what drives the Cascade-priority recommendation",
          "B": "Choosing Cascade-priority guarantees the highest possible payoff in the season actually experienced",
          "C": "The $4,000 EVPI is the maximum fee the committee should rationally pay for a forecast of the demand state",
          "D": "Cascade-priority delivers the higher realized contribution regardless of which demand state occurs",
          "E": "A forecast fee above $4,000 would reduce the expected value of the schedule decision, however accurate the forecast proves"
        },
        "Explanation": "Statement A restates the bottleneck principle behind Exhibit 1: $32.00 versus $30.00 per hour ranks Cascade first even though Alpine leads on per-unit margin. Statement C applies the EVPI ceiling from DA-11, and statement E follows because net expected value equals the decision's EV minus the information fee—any price above $4,000 leaves the firm worse off than deciding unaided. Statements B and D confuse maximizing expected value with dominating realized payoffs: in the soft state Cascade-priority returns $330,000 against Alpine-priority's $346,000. Candidates frequently treat the EV-maximizing alternative as a sure thing; EV is a long-run average across repetitions, not a promise about any single season.",
        "Topic": "Decision-analysis interpretation",
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
        "ItemID": "CBQ22-C1-Q6",
        "Type": "match",
        "Prompt": "Match each decision-analysis quantity from the Kestrel Peak engagement to its correct value or basis.",
        "LeftItems": [
          "Expected value without perfect information",
          "Expected value with perfect information",
          "Expected value of perfect information",
          "Ranking basis under the stitching constraint"
        ],
        "RightItems": [
          "$368,600",
          "$372,600",
          "$4,000",
          "Contribution margin per bottleneck machine hour",
          "$359,250",
          "$30.00 per hour",
          "Total contribution margin per unit sold"
        ],
        "Correct": {
          "Expected value without perfect information": "$368,600",
          "Expected value with perfect information": "$372,600",
          "Expected value of perfect information": "$4,000",
          "Ranking basis under the stitching constraint": "Contribution margin per bottleneck machine hour"
        },
        "Explanation": "Each pairing traces to the computed record: the superior commitment (Cascade-priority) carries an expected value of $368,600; adding perfect foresight lets the committee switch to Alpine-priority in the soft state, lifting the expectation to $372,600; their difference, $4,000, is the EVPI ceiling for any forecast. Under the binding stitching line the correct ranking basis is contribution margin per bottleneck hour—Cascade $32.00 versus Alpine $30.00—not margin per unit. Distractors: $359,250 is the losing schedule's expected value, $30.00 per hour belongs to Alpine, and ranking on total contribution per unit sold is precisely the misconception that produces the inferior Alpine-first plan.",
        "Topic": "Decision-analysis recap",
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
    "Industry": "Outdoor gear manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Kestrel Peak Outfitters",
    "Stakeholder": "Dana Whitfield, Chief Financial Officer",
    "BusinessFunction": "Cost accounting",
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
      "Apply contribution margin per scarce-resource hour to sequence production under a bottleneck",
      "Weight state payoffs by probabilities to compute expected monetary value",
      "Derive EVPI and use it to accept or decline a purchased forecast"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-E1",
    "Title": "Capital Rationing and Replacement Analysis",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Select the NPV-maximizing project package subject to a capital rationing constraint with indivisible projects",
      "Compute equivalent annual annuities to compare mutually exclusive assets with unequal lives",
      "Evaluate why profitability-index ranking fails under indivisibility"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Bluewater Cold Chain operates refrigerated distribution hubs in three port cities and funds discretionary projects from a single annual envelope. VP of Finance Priya Raman faces a hard board ceiling of $1,300,000, while five indivisible improvement projects each clear the corporate hurdle rate on a stand-alone basis. Separately, the failing refrigeration compressor at the Newark hub must be replaced by one of two mutually exclusive units whose service lives differ. Before Thursday's investment committee, Priya must identify the NPV-maximizing affordable package, explain why the treasury staff's profitability-index shortcut missed it, and settle the compressor choice on a comparable annualized basis.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E1-E1",
        "CaseID": "CBQ22-E1",
        "Type": "table",
        "Title": "Exhibit 1 — Discretionary Project Menu (Independent Except Where Noted)",
        "Purpose": "Lists each project's outlay, NPV, and profitability index for the rationing search in Q1, the PI-rule critique in Q4, the feasibility statements in Q5, and the match items in Q6.",
        "ReferencedBy": [
          "CBQ22-E1-Q1",
          "CBQ22-E1-Q4",
          "CBQ22-E1-Q5",
          "CBQ22-E1-Q6"
        ],
        "Headers": [
          "Project",
          "Scope",
          "Initial outlay",
          "NPV at 10%",
          "Profitability index"
        ],
        "Rows": [
          [
            "P1 — ASRS racking conversion",
            "Automated storage and retrieval for slow-moving pallets",
            "$620,000",
            "$148,800",
            "1.24"
          ],
          [
            "P2 — Fleet telematics retrofit",
            "Route telemetry for 12 refrigerated tractors",
            "$340,000",
            "$95,200",
            "1.28"
          ],
          [
            "P3 — Rooftop solar plus storage",
            "1.2 MW array with battery buffer at Newark hub",
            "$480,000",
            "$129,600",
            "1.27"
          ],
          [
            "P4 — Dock-door automation",
            "Two powered high-speed doors at Portland hub",
            "$260,000",
            "$54,600",
            "1.21"
          ],
          [
            "P5 — WMS re-platform",
            "Warehouse management system upgrade, all hubs",
            "$300,000",
            "$78,000",
            "1.26"
          ]
        ],
        "DataFormat": "USD whole dollars; PI to two decimals",
        "AccuracyCheck": "PI = (Outlay + NPV) ÷ Outlay recomputed per row: P1 768,800/620,000 = 1.24; P2 435,200/340,000 = 1.28; P3 609,600/480,000 = 1.27; P4 314,600/260,000 = 1.21; P5 378,000/300,000 = 1.26."
      },
      {
        "ExhibitID": "CBQ22-E1-E2",
        "CaseID": "CBQ22-E1",
        "Type": "table",
        "Title": "Exhibit 2 — Newark Compressor Replacement Candidates",
        "Purpose": "Provides outlays, savings, lives, and salvage for the mutually exclusive EAA comparison in Q2, Q3, and Q6.",
        "ReferencedBy": [
          "CBQ22-E1-Q2",
          "CBQ22-E1-Q3",
          "CBQ22-E1-Q6"
        ],
        "Headers": [
          "Replacement option",
          "Installed cost",
          "Annual after-tax cash savings",
          "Service life",
          "Salvage at end of life"
        ],
        "Rows": [
          [
            "Unit X — reciprocating compressor",
            "$420,000",
            "$158,000",
            "4 years",
            "$40,000"
          ],
          [
            "Unit Y — magnetic-bearing centrifugal",
            "$585,000",
            "$162,000",
            "6 years",
            "$30,000"
          ]
        ],
        "DataFormat": "USD whole dollars; end-of-year cash flows",
        "AccuracyCheck": "Both options quoted net of trade-in; savings are level annuities over each unit's life."
      },
      {
        "ExhibitID": "CBQ22-E1-E3",
        "CaseID": "CBQ22-E1",
        "Type": "email",
        "Title": "Exhibit 3 — Controller Memo: Budget Ceiling and Discounting Factors",
        "Purpose": "Fixes the $1,300,000 ceiling, the 10% discount rate, and the PV factors required for the EAA work in Q1 through Q3.",
        "ReferencedBy": [
          "CBQ22-E1-Q1",
          "CBQ22-E1-Q2",
          "CBQ22-E1-Q3"
        ],
        "Body": "From: Ana Souza, Corporate Controller\nTo: Priya Raman, VP Finance\nSubject: Parameters for Thursday's investment committee\n\nPriya — confirmed parameters for the packet: (1) the board's discretionary ceiling stands at $1,300,000 for this cycle; projects are indivisible and cannot be phased; (2) the corporate discount rate is 10%; (3) use these present-value factors: PVIFA(10%, 4 yrs) = 3.1699, PVIF(10%, 4 yrs) = 0.6830, PVIFA(10%, 6 yrs) = 4.3553, PVIF(10%, 6 yrs) = 0.5645. The two compressor candidates are strictly mutually exclusive — one slot, one replacement. Please show the package math and the annualized compressor comparison side by side.\n— Ana",
        "DataFormat": "Business email text; factors carried to four decimals",
        "AccuracyCheck": "Factors match standard 10% tables at four decimals; ceiling matches ScenarioText."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E1-Q1",
        "Type": "numeric",
        "Prompt": "Ignoring the compressor decision, identify the affordable package of indivisible projects that maximizes aggregate NPV under the $1,300,000 ceiling, and report that maximum aggregate NPV in whole dollars (tolerance ±$1).",
        "Correct": "322000",
        "Explanation": "With a lumpy budget and indivisible projects, the defensible method is exhaustive comparison of feasible bundles on total NPV (ID-01). The bundle {P1, P2, P5} costs $620,000 + $340,000 + $300,000 = $1,260,000, within the $1,300,000 ceiling, and yields $148,800 + $95,200 + $78,000 = $322,000 of NPV. No feasible rival beats it: {P2, P3, P5} totals $302,800; {P1, P2, P4} totals $298,600; any four-project set costs at least $1,380,000 and violates the ceiling. Note the trap: funding in descending profitability-index order loads P2, P3, and P5 ($1,120,000), then nothing else fits the $180,000 remainder, freezing the portfolio at $302,800 — $19,200 short of the achievable maximum. PI screens value per dollar; it cannot see bundle interactions.",
        "Topic": "Capital rationing package selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q2",
        "Type": "numeric",
        "Prompt": "Using the Exhibit 3 factors (PVIFA at 10% for 4 years = 3.1699; PVIF at 10% for 4 years = 0.6830), compute the equivalent annual annuity (EAA) of Unit X. Carry the NPV unrounded through the division and express the EAA in whole dollars (tolerance ±$50).",
        "Correct": "34122",
        "Explanation": "EAA converts a lump-sum NPV into a level annual equivalent using ID-05: EAA = NPV ÷ PVIFA(r, n). Unit X: NPV = −$420,000 + ($158,000 × 3.1699) + ($40,000 × 0.6830) = −$420,000 + $500,844.20 + $27,320 = $108,164.20. EAA = $108,164.20 ÷ 3.1699 ≈ $34,122 per year. Business meaning: owning and operating Unit X adds roughly $34,100 of value-equivalent cash benefit annually over its four-year service window. A common trap is dividing NPV by the asset's life in years ($108,164 ÷ 4 = $27,041), which ignores the time value of money and understates the annualized figure by about $7,100.",
        "Topic": "Equivalent annual annuity",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q3",
        "Type": "select",
        "Prompt": "Which replacement should the committee authorize, and on what basis? Use the Exhibit 3 factors (PVIFA 10%, 4 yrs = 3.1699; PVIF 10%, 4 yrs = 0.6830; PVIFA 10%, 6 yrs = 4.3553; PVIF 10%, 6 yrs = 0.5645).",
        "Correct": "A",
        "Choices": {
          "A": "Select Unit X; its equivalent annual annuity of about $34,122 exceeds Unit Y's $31,569 despite Unit Y's larger headline NPV",
          "B": "Select Unit Y; its NPV of $137,494 exceeds Unit X's $108,164, and raw NPV settles unequal-life replacements",
          "C": "Select Unit Y; spreading its cost over six years lowers its annual burden below Unit X's",
          "D": "Select neither unit; neither recovers its installed cost within the discounting horizon"
        },
        "Explanation": "For mutually exclusive assets with unequal lives, raw NPV misleads because benefits accrue over different horizons; the equivalent annual annuity (ID-05) puts both on a per-year footing. Unit Y: NPV = −$585,000 + ($162,000 × 4.3553) + ($30,000 × 0.5645) = −$585,000 + $705,558.60 + $16,935 = $137,493.60; EAA = $137,493.60 ÷ 4.3553 ≈ $31,569. Against Unit X's ≈$34,122 (from Q2), Unit X wins by about $2,553 per year even though Y shows the bigger NPV — its advantage is simply stretched over two extra years. Choice B commits the classic unequal-life trap; choice C inverts the arithmetic; choice D ignores that both NPVs are positive.",
        "Topic": "Unequal-life replacement decision",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q4",
        "Type": "select",
        "Prompt": "Treasury staff proposed funding projects strictly in descending profitability-index order until the budget binds. Which statement best evaluates that rule for this year's slate?",
        "Correct": "C",
        "Choices": {
          "A": "The rule failed because the profitability index was computed against the wrong denominator for P3",
          "B": "The rule failed because a 10 percent discount rate was applied inconsistently across the five projects",
          "C": "The rule failed because highest-PI selection ignores indivisibility: the PI-ranked trio left too little budget for the large-NPV racking project, freezing the portfolio at $302,800 instead of the feasible $322,000",
          "D": "The rule failed because mutually exclusive projects were ranked as though they were independent"
        },
        "Explanation": "The profitability index (ID-02) correctly measures value created per dollar invested, but with indivisible projects and a lumpy ceiling it is a screening aid, not an optimizer. Descending PI loads P2 (1.28), P3 (1.27), and P5 (1.26) for $1,120,000; the $180,000 remainder fits neither P1 ($620,000) nor P4 ($260,000), locking in $302,800 of NPV. Exhaustive comparison shows {P1, P2, P5} at $1,260,000 delivers $322,000 — $19,200 better — because capital rationing requires evaluating whole bundles, not marginal rankings. Choices A and B invent computational errors the exhibit data contradict; choice D mislabels the slate, where the only mutual exclusivity sits in the separate compressor decision.",
        "Topic": "Profitability index under rationing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-02",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E1-Q5",
        "Type": "multi",
        "Prompt": "Which three statements about Bluewater's investment decisions are correct? Select exactly three.",
        "Correct": [
          "Profitability index is an efficient screen, but with indivisible projects the adopted package must come from comparing total NPV across feasible bundles",
          "Because Units X and Y deliver service over different horizons, their raw NPVs are not directly comparable without annualization",
          "The EAA comparison implicitly assumes both compressors can be replaced with economically similar assets when their lives expire"
        ],
        "Choices": {
          "A": "Profitability index is an efficient screen, but with indivisible projects the adopted package must come from comparing total NPV across feasible bundles",
          "B": "Adding dock-door automation to the adopted package is affordable because its $260,000 cost fits inside the budget headroom",
          "C": "Because Units X and Y deliver service over different horizons, their raw NPVs are not directly comparable without annualization",
          "D": "Raising the capital ceiling to $1,440,000 would leave this year's adopted package unchanged",
          "E": "The EAA comparison implicitly assumes both compressors can be replaced with economically similar assets when their lives expire"
        },
        "Explanation": "Statement A captures the rationing doctrine from Q1/Q4: PI screens, but bundle-level NPV decides. Statement C states the unequal-life problem that EAA (ID-05) solves, and statement E names EAA's standard replication assumption — chains of like-for-like replacement make annualized values comparable. Statement B fails arithmetically: the adopted package spends $1,260,000 of $1,300,000, leaving $40,000 of headroom, far short of P4's $260,000. Statement D fails because a $1,440,000 ceiling would admit {P1, P2, P3} at exactly $1,440,000 with $373,600 of NPV, displacing the current $322,000 package. The recurring candidate error is treating heuristics and single-snapshot NPVs as sufficient once constraints or unequal lives enter.",
        "Topic": "Rationing and EAA judgment",
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
        "ItemID": "CBQ22-E1-Q6",
        "Type": "match",
        "Prompt": "Match each quantity from the Bluewater analysis to its correct value.",
        "LeftItems": [
          "Adopted package — aggregate NPV",
          "Profitability index — fleet telematics retrofit",
          "EAA — Unit Y",
          "Budget headroom after adopting the package"
        ],
        "RightItems": [
          "$322,000",
          "1.28",
          "$31,569",
          "$40,000",
          "$302,800",
          "1.24",
          "$34,122"
        ],
        "Correct": {
          "Adopted package — aggregate NPV": "$322,000",
          "Profitability index — fleet telematics retrofit": "1.28",
          "EAA — Unit Y": "$31,569",
          "Budget headroom after adopting the package": "$40,000"
        },
        "Explanation": "The adopted bundle {P1, P2, P5} aggregates $148,800 + $95,200 + $78,000 = $322,000 of NPV against a $1,260,000 outlay, leaving $40,000 of the ceiling unused. The telematics retrofit carries the menu's top profitability index: ($340,000 + $95,200) ÷ $340,000 = 1.28. Unit Y's annualized value is $137,493.60 ÷ 4.3553 ≈ $31,569, second to Unit X's $34,122. Distractors anchor real figures to wrong labels: $302,800 is the suboptimal PI-greedy portfolio, 1.24 is the ASRS project's index, and $34,122 is Unit X's EAA — matching them correctly requires separating package results from component metrics.",
        "Topic": "Investment-decision recap",
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
    "Industry": "Refrigerated warehousing and distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Bluewater Cold Chain Logistics",
    "Stakeholder": "Priya Raman, Vice President of Finance",
    "BusinessFunction": "Capital budgeting",
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
      "Construct feasible project bundles under a capital ceiling and select on aggregate NPV",
      "Explain the indivisibility failure mode of profitability-index ranking",
      "Annualize unequal-life mutually exclusive investments with EAA for a defensible replacement choice"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-B2",
    "Title": "WACC Update and Working-Capital Review",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Blend debt tranches into a market-weighted pre-tax cost of debt",
      "Recalculate WACC from CAPM equity, preferred, and after-tax debt components at market-value weights",
      "Decompose the cash conversion cycle into DSO, DIO, and DPO to diagnose working-capital drift"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Silverpine Medical Devices manufactures infusion pumps and holds a $6,000,000 revolving credit facility that matures at quarter-end. Treasurer Luis Herrera must deliver an updated weighted average cost of capital to First Harbor Bank—which now prices renewals off the borrower's measured hurdle rate—after Silverpine closes a $4,000,000 term loan to fund capacity tooling. The bank's credit committee also flagged working-capital drift from covenant monitoring, so Luis pairs the WACC refresh with a cash-conversion-cycle diagnosis against the prior year. He must quantify the new component costs, recalculate WACC at market-value weights, and pinpoint which CCC component drove the deterioration before the renewal meeting.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B2-E1",
        "CaseID": "CBQ22-B2",
        "Type": "table",
        "Title": "Exhibit 1 — Post-Closing Capital Structure and Component Inputs",
        "Purpose": "Supplies market values and component inputs (debt YTMs, preferred dividend and net proceeds, CAPM inputs, tax rate) for the cost-of-debt blend in Q1, the WACC rebuild in Q2, and the metric match in Q6.",
        "ReferencedBy": [
          "CBQ22-B2-Q1",
          "CBQ22-B2-Q2",
          "CBQ22-B2-Q6"
        ],
        "Headers": [
          "Financing component",
          "Market value",
          "Component input"
        ],
        "Rows": [
          [
            "Existing term debt",
            "$8,000,000",
            "Pre-tax yield to maturity 6.00%"
          ],
          [
            "New term loan (closing this quarter)",
            "$4,000,000",
            "Pre-tax yield to maturity 8.00%"
          ],
          [
            "Preferred stock (40,000 shares)",
            "$2,000,000",
            "Annual dividend $3.75 per share; net proceeds $46.875 per share"
          ],
          [
            "Common equity (1,500,000 shares at $20)",
            "$30,000,000",
            "Risk-free rate 4.00%; beta 1.20; equity risk premium 5.50%"
          ],
          [
            "Marginal tax rate",
            "—",
            "25%"
          ]
        ],
        "DataFormat": "USD whole dollars; rates in percent; per-share amounts in dollars",
        "AccuracyCheck": "Component market values total $44,000,000; preferred yield check $3.75 ÷ $46.875 = 8.00%; CAPM equity cost 4.00% + 1.20 × 5.50% = 10.60%."
      },
      {
        "ExhibitID": "CBQ22-B2-E2",
        "CaseID": "CBQ22-B2",
        "Type": "table",
        "Title": "Exhibit 2 — Working-Capital Data, Current Versus Prior Year",
        "Purpose": "Provides the balances and flow bases for computing current-year DSO/DIO/DPO/CCC in Q4 and Q6, plus prior-year ratios for trend diagnosis.",
        "ReferencedBy": [
          "CBQ22-B2-Q4",
          "CBQ22-B2-Q5",
          "CBQ22-B2-Q6"
        ],
        "Headers": [
          "Working-capital measure",
          "Current year",
          "Prior year"
        ],
        "Rows": [
          [
            "Net credit sales",
            "$42,000,000",
            "$39,000,000"
          ],
          [
            "Cost of goods sold",
            "$27,300,000",
            "$25,600,000"
          ],
          [
            "Merchandise purchases",
            "$27,900,000",
            "$26,100,000"
          ],
          [
            "Year-end accounts receivable",
            "$5,600,000",
            "$4,800,000"
          ],
          [
            "Year-end inventory",
            "$3,300,000",
            "$2,700,000"
          ],
          [
            "Year-end accounts payable",
            "$3,100,000",
            "$3,650,000"
          ],
          [
            "DSO (days)",
            "—",
            "43.90"
          ],
          [
            "DIO (days)",
            "—",
            "41.50"
          ],
          [
            "DPO (days)",
            "—",
            "44.30"
          ],
          [
            "CCC (days)",
            "—",
            "41.10"
          ]
        ],
        "DataFormat": "USD whole dollars; ratios computed on a 365-day year; prior-year ratio cells are treasury-reported",
        "AccuracyCheck": "Current purchases tie to COGS plus the $600,000 inventory build ($27,300,000 + $600,000 = $27,900,000); prior-year CCC = 43.90 + 41.50 − 44.30 = 41.10 days."
      },
      {
        "ExhibitID": "CBQ22-B2-E3",
        "CaseID": "CBQ22-B2",
        "Type": "email",
        "Title": "Exhibit 3 — Bank Renewal Request",
        "Purpose": "Establishes the renewal trigger and the bank's expectation that the WACC update and CCC diagnosis support the credit package discussed in Q3 and Q5.",
        "ReferencedBy": [
          "CBQ22-B2-Q3",
          "CBQ22-B2-Q5"
        ],
        "Body": "From: Renata Cole, Relationship Manager, First Harbor Bank\nTo: Luis Herrera, Treasurer, Silverpine Medical Devices\nSubject: Revolver renewal — credit committee package\n\nLuis — the $6,000,000 revolver matures at quarter-end and the committee now benchmarks renewals against the borrower's own measured hurdle rate. Please send your refreshed weighted average cost of capital reflecting the $4,000,000 term loan closing this quarter. Separately, covenant monitoring shows working-capital drift; include a cash-conversion-cycle bridge versus last year identifying which lever moved. We value the relationship and want the renewal straightforward.",
        "DataFormat": "Business email text",
        "AccuracyCheck": "Facility size, maturity timing, and loan amount agree with ScenarioText and Exhibit 1."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B2-Q1",
        "Type": "numeric",
        "Prompt": "Compute the blended pre-tax cost of debt Silverpine should use after the new term loan closes, weighting the two tranches at their market values. Express as a percentage rounded to two decimal places (tolerance ±0.01).",
        "Correct": "6.67",
        "Explanation": "The economic cost of debt is the yield to maturity on each tranche, blended at market-value weights: (($8,000,000 × 6.00%) + ($4,000,000 × 8.00%)) ÷ $12,000,000 = ($480,000 + $320,000) ÷ $12,000,000 = $800,000 ÷ $12,000,000 = 6.6667% ≈ 6.67%. Using YTM rather than coupon anchors the cost to current market pricing of Silverpine's credit. A common trap is averaging the two rates equally (7.00%), which ignores the 2:1 weight of the legacy tranche; a second trap is quoting the pre-tax figure inside WACC — the after-tax application comes later via (1 − t), giving 6.6667% × 0.75 = 5.00%.",
        "Topic": "Blended cost of debt",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-07",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q2",
        "Type": "numeric",
        "Prompt": "Recalculate Silverpine's WACC at the post-closing market-value capital structure: use CAPM for the cost of equity, the preferred yield implied by Exhibit 1, the blended after-tax cost of debt, and the 25 percent tax rate. Express as a percentage rounded to two decimal places (tolerance ±0.01).",
        "Correct": "8.95",
        "Explanation": "Components: cost of equity Re = 4.00% + 1.20 × 5.50% = 10.60% (CAPM, CB-04 logic within CB-05); cost of preferred Rp = $3.75 ÷ $46.875 = 8.00% (no tax shield on preferred dividends); blended after-tax Rd = 6.6667% × (1 − 0.25) = 5.00%. Market-value weights on V = $44,000,000: E/V = 30/44, P/V = 2/44, D/V = 12/44. WACC = (30/44 × 10.60%) + (2/44 × 8.00%) + (12/44 × 5.00%) = 7.2273% + 0.3636% + 1.3636% = 8.9545% ≈ 8.95%. Classic failures to avoid: skipping the (1 − t) adjustment on debt, dropping the preferred leg entirely, and substituting book values for the $44 million market-value base.",
        "Topic": "WACC recalculation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-05",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q3",
        "Type": "select",
        "Prompt": "Before the new loan, WACC stood at 9.25 percent on the old structure. Which statement best explains the change to the recalculated figure for the bank committee?",
        "Correct": "C",
        "Choices": {
          "A": "The WACC rises because the marginal 8.00 percent coupon exceeds the legacy 6.00 percent cost of debt",
          "B": "The WACC is unchanged; swapping one debt source for another at market weights leaves the weighted average intact",
          "C": "The WACC falls from 9.25 percent to about 8.95 percent because shifting weight toward after-tax debt at roughly 5.00 percent more than offsets the higher coupon",
          "D": "The WACC falls because added leverage makes the equity component cheaper under CAPM"
        },
        "Explanation": "Substituting $4,000,000 of 8.00 percent debt for equity weight cuts the after-tax cost of the marginal dollars to about 5.00 percent — far below the 10.60 percent equity it displaces — so the weighted average drops from 9.25 percent ((0.75 × 10.60%) + (0.05 × 8.00%) + (0.20 × 4.50%)) to 8.95 percent. The coupon step-up matters less than the mix shift because interest is tax-deductible while equity returns are not. Choice D inverts CAPM: higher leverage raises equity beta and therefore the cost of equity. Committees read a falling WACC alongside rising leverage as cheaper but riskier funding — the narrative Luis should pair with the number.",
        "Topic": "Capital-structure effect on WACC",
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
        "ItemID": "CBQ22-B2-Q4",
        "Type": "select",
        "Prompt": "Using a 365-day year, compute the current-year components and identify the primary driver of the cash-conversion-cycle deterioration the bank flagged.",
        "Correct": "B",
        "Choices": {
          "A": "Inventory accumulation is the primary driver, adding close to five days of CCC",
          "B": "Slower collections are the largest single driver: DSO lengthened by about 4.8 days, with faster supplier payments adding further pressure",
          "C": "The deterioration is optical; the CCC improved once the year's higher purchase volume is considered",
          "D": "Stretching payables is the main problem, since DPO fell by more than seven days"
        },
        "Explanation": "CCC = DIO + DSO − DPO (CB-10), each on 365 days. Current year: DSO = ($5,600,000 ÷ $42,000,000) × 365 = 48.67; DIO = ($3,300,000 ÷ $27,300,000) × 365 = 44.12; DPO = ($3,100,000 ÷ $27,900,000) × 365 = 40.56, using purchases (not COGS) as the DPO base. CCC = 48.67 + 44.12 − 40.56 = 52.23 days versus 41.10 last year. Component moves: DSO +4.77 days (the largest adverse swing), DIO +2.62, DPO −3.74 (paying suppliers faster). Choice D overstates the payable move and misreads direction; choice A inflates inventory's role; choice C contradicts the arithmetic. The trap is adding DPO rather than subtracting it, which flips the diagnosis.",
        "Topic": "Cash conversion cycle diagnosis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-10",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B2-Q5",
        "Type": "multi",
        "Prompt": "Which three statements about Silverpine's renewal package are correct? Select exactly three.",
        "Correct": [
          "Applying the refreshed 8.95 percent WACC as the discount rate suits capital projects whose risk profile mirrors the firm as a whole",
          "An eleven-day CCC deterioration ties up roughly $1.3 million of additional cash at current sales velocity, weakening the renewal narrative",
          "Negotiating longer supplier payment terms would raise DPO and shorten the cash conversion cycle"
        ],
        "Choices": {
          "A": "Applying the refreshed 8.95 percent WACC as the discount rate suits capital projects whose risk profile mirrors the firm as a whole",
          "B": "Because interest is deductible, the 6.67 percent blended pre-tax debt cost belongs in the WACC without tax adjustment",
          "C": "Book-value weights belong in the WACC because they anchor the bank to audited statements",
          "D": "An eleven-day CCC deterioration ties up roughly $1.3 million of additional cash at current sales velocity, weakening the renewal narrative",
          "E": "Negotiating longer supplier payment terms would raise DPO and shorten the cash conversion cycle"
        },
        "Explanation": "Statement A applies firm-wide WACC to average-risk projects — the correct scope discipline. Statement D quantifies the drift: 11.13 days × ($42,000,000 ÷ 365) ≈ $1,280,700 of incremental cash tied up, material to the credit story. Statement E is mechanically right: longer terms lift DPO, and DPO enters CCC negatively. Statement B fails because WACC requires the after-tax cost (6.6667% × 0.75 = 5.00%); deductibility is precisely why the adjustment exists. Statement C confuses reporting conventions with valuation theory — WACC uses market-value weights ($44,000,000 here), while book statements serve the bank's separate collateral analysis.",
        "Topic": "Renewal-readiness evaluation",
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
        "ItemID": "CBQ22-B2-Q6",
        "Type": "match",
        "Prompt": "Match each finance metric from the Silverpine refresh to its correct current-year value.",
        "LeftItems": [
          "Cost of equity (CAPM)",
          "Blended after-tax cost of debt",
          "DSO — current year",
          "CCC — current year"
        ],
        "RightItems": [
          "10.60%",
          "5.00%",
          "48.67 days",
          "52.23 days",
          "6.67%",
          "44.12 days",
          "9.25%"
        ],
        "Correct": {
          "Cost of equity (CAPM)": "10.60%",
          "Blended after-tax cost of debt": "5.00%",
          "DSO — current year": "48.67 days",
          "CCC — current year": "52.23 days"
        },
        "Explanation": "CAPM gives 4.00% + 1.20 × 5.50% = 10.60%. The blended pre-tax debt cost of 6.67% becomes 5.00% after the 25 percent tax shield — the figure that actually enters WACC. Receivables of $5,600,000 against $42,000,000 of credit sales put DSO at 48.67 days, and combining 44.12 days of inventory with 40.56 days of payables yields the 52.23-day cycle. Distractors map to near neighbors: 6.67% is the pre-tax blend, 44.12 days is DIO, and 9.25% is the prior-structure WACC — matching correctly requires keeping pre-tax versus after-tax and component-versus-composite distinctions straight.",
        "Topic": "Corporate-finance metric recap",
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
    "Industry": "Medical device manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Silverpine Medical Devices",
    "Stakeholder": "Luis Herrera, Treasurer",
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
      "Blend multiple debt tranches into a single weighted pre-tax cost of debt",
      "Rebuild WACC from CAPM, preferred, and after-tax debt components at market-value weights",
      "Diagnose working-capital deterioration by decomposing CCC into DSO, DIO, and DPO"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-C2",
    "Title": "Pressure Module Make-or-Buy Decision",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Apply relevant-cost concepts to make-versus-buy outsourcing decisions",
      "Incorporate opportunity costs of released capacity into differential analysis",
      "Evaluate qualitative factors that modify quantitative outsourcing conclusions"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Kestrel Instruments, a mid-sized manufacturer of environmental monitoring devices in Bend, Oregon, has seen demand for its PX-7 pressure sensor module stabilize at 24,000 units per year. Plant controller Dana Whitfield, CPA, must respond to a three-year outsourcing quotation from Vantage Micro Systems after the chief financial officer asked whether the freed assembly bay could be sublet to offset rising plant costs. Dana must build a relevant-cost analysis and recommend whether Kestrel should continue manufacturing the module or buy it from the supplier.",
    "Industry": "Precision instruments manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Kestrel Instruments",
    "Stakeholder": "Dana Whitfield, Plant Controller",
    "BusinessFunction": "Cost management",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "make-or-buy",
      "relevant costs",
      "opportunity cost",
      "outsourcing"
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
      "Separate avoidable from unavoidable costs in an outsourcing analysis",
      "Quantify the opportunity cost of released production space and its effect on a make-or-buy decision",
      "Compute the indifference purchase price between making and buying",
      "Weigh qualitative factors alongside quantitative results before recommending action"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C2-E1",
        "CaseID": "CBQ22-C2",
        "Type": "table",
        "Title": "PX-7 Module Annual Production Cost Summary (24,000 Units)",
        "Purpose": "Provides the full absorption cost structure of in-house PX-7 production, separating the fixed overhead pool into the avoidable supervision and lease portion and the unavoidable allocation portion used in every relevant-cost item.",
        "ReferencedBy": [
          "CBQ22-C2-Q1",
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q3",
          "CBQ22-C2-Q6"
        ],
        "Headers": [
          "Cost Component",
          "Per Unit",
          "Annual Total",
          "Behavior If Production Stops"
        ],
        "Rows": [
          [
            "Direct materials",
            "$14.00",
            "$336,000",
            "Avoided entirely"
          ],
          [
            "Direct labor",
            "$8.00",
            "$192,000",
            "Avoided entirely"
          ],
          [
            "Variable manufacturing overhead",
            "$5.00",
            "$120,000",
            "Avoided entirely"
          ],
          [
            "Avoidable fixed overhead (line supervision and equipment leases)",
            "$9.00",
            "$216,000",
            "Avoided with discontinuation"
          ],
          [
            "Unavoidable fixed overhead (depreciation and corporate allocations)",
            "$10.50",
            "$252,000",
            "Continues unchanged"
          ],
          [
            "Total manufacturing cost",
            "$46.50",
            "$1,116,000",
            "-"
          ]
        ],
        "DataFormat": "Currency in USD; per-unit rates to two decimals; annual totals in whole dollars at 24,000 units.",
        "AccuracyCheck": "Verified twice: 24,000 x $14 = $336,000; components sum to $1,116,000; per-unit column sums to $46.50; avoidable plus unavoidable fixed overhead = $216,000 + $252,000 = $468,000."
      },
      {
        "ExhibitID": "CBQ22-C2-E2",
        "CaseID": "CBQ22-C2",
        "Type": "email",
        "Title": "Supplier Quotation - Vantage Micro Systems",
        "Purpose": "Documents the external purchase offer, including unit price, price-hold term, and delivery terms consumed by the differential-analysis and qualitative-factor items.",
        "ReferencedBy": [
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q3",
          "CBQ22-C2-Q4",
          "CBQ22-C2-Q5"
        ],
        "Body": "From: Priya Nandakumar, Regional Sales Director, Vantage Micro Systems\nTo: Dana Whitfield, Plant Controller, Kestrel Instruments\nSubject: Quotation Q-4471 - PX-7 pressure sensor module\n\nDana, following your request for pricing on annual volumes up to 24,000 units, Vantage can supply the PX-7 module at $46.00 per unit, FOB destination, freight included. We will hold this price firm for three years against documented volume of 20,000 to 26,000 units annually. Tooling transfer would be complete within 90 days of award, and our facility is ISO 9001 certified with on-time delivery averaging 98.2 percent over the trailing four quarters. The offer requires 60 days written notice for termination and excludes any obligation for Kestrel plant overhead. Please confirm acceptance by October 15 so we can lock component supply contracts.\n\nPriya"
      },
      {
        "ExhibitID": "CBQ22-C2-E3",
        "CaseID": "CBQ22-C2",
        "Type": "table",
        "Title": "Alternative Uses of Released Assembly Bay (Annual Cash Effect)",
        "Purpose": "Establishes the best alternative use of the floor space freed by outsourcing, which determines the opportunity cost applied in the differential items and the match item.",
        "ReferencedBy": [
          "CBQ22-C2-Q2",
          "CBQ22-C2-Q4",
          "CBQ22-C2-Q5",
          "CBQ22-C2-Q6"
        ],
        "Headers": [
          "Alternative Use",
          "Annual Net Cash Benefit",
          "Conditions"
        ],
        "Rows": [
          [
            "Sublease to Meridian Freight Works (cold storage overflow)",
            "$78,000",
            "Three-year sublease offered; tenant begins paying 30 days after vacancy"
          ],
          [
            "Expand finished-goods racking for other product lines",
            "$0",
            "No direct rental cash flow; supports modest carrying-cost savings already reflected elsewhere"
          ],
          [
            "Hold bay vacant pending future expansion",
            "$0",
            "No cash benefit; defers decision one budget cycle"
          ]
        ],
        "DataFormat": "Currency in USD; annual net cash benefit in whole dollars.",
        "AccuracyCheck": "Verified: the sublease at $78,000 per year is the highest-value alternative use, so it sets the opportunity cost; the two internal options contribute no incremental rental cash."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C2-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, what is the total annual relevant cost of continuing to manufacture the PX-7 module in-house? Exclude any opportunity cost of the released space and round to the nearest whole dollar.",
        "Correct": "864000",
        "Explanation": "Relevant-cost (differential) analysis includes only future costs that differ between alternatives. The relevant cost of making equals direct materials $336,000 + direct labor $192,000 + variable overhead $120,000 + avoidable fixed overhead $216,000 = $864,000. The $252,000 of depreciation and corporate allocations continues even if production stops, so it is excluded; likewise the $46.50 full absorption figure overstates the truly avoidable burden of $36.00 per unit. Verification performed twice: 336,000 + 192,000 + 120,000 + 216,000 = 864,000. The common trap is sweeping unavoidable allocated overhead into the analysis simply because it sits on the product-cost summary, which inflates apparent savings from outsourcing by $252,000.",
        "Topic": "Relevant costs",
        "Subtopic": "Avoidable versus unavoidable costs",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Relevant cost of making = avoidable variable costs + avoidable fixed costs",
        "CommonTrapReference": "Including unavoidable allocated fixed overhead in the relevant-cost pool",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing",
          "avoidable costs"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q2",
        "Type": "numeric",
        "Prompt": "Incorporating the best alternative use of the assembly bay from Exhibit 3 and the quotation in Exhibit 2, what is the net annual financial disadvantage of accepting Vantage's offer? Enter the amount as a positive whole dollar.",
        "Correct": "162000",
        "Explanation": "Under differential analysis with opportunity cost, net cost of buying = (24,000 units x $46.00) - $78,000 sublease income = $1,104,000 - $78,000 = $1,026,000, while the relevant cost of making from Exhibit 1 is $864,000. Buying is therefore worse by $1,026,000 - $864,000 = $162,000 per year. Cross-check using the equivalent presentation that adds the forgone rent to the make side: $864,000 + $78,000 = $942,000 versus $1,104,000 of purchase cost, again a $162,000 gap, confirming the result. The classic error compares the $46.00 quote to the $46.50 full cost and concludes a $12,000 saving ($0.50 x 24,000) when the correct comparison shows a $162,000 loss.",
        "Topic": "Opportunity cost",
        "Subtopic": "Net advantage or disadvantage of an alternative",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net disadvantage of buying = net purchase cost - relevant cost of making",
        "CommonTrapReference": "Comparing quote to full absorption cost and ignoring the $78,000 sublease",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "differential analysis",
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q3",
        "Type": "select",
        "Prompt": "Which statement correctly identifies the cost inputs relevant to the outsourcing recommendation?",
        "Choices": [
          "All $1,116,000 of recorded manufacturing cost, because every element disappears once production ends",
          "Direct materials, direct labor, variable overhead, avoidable fixed overhead, and the $78,000 of sublease income given up if production continues",
          "Direct materials, direct labor, and variable overhead only, because the fixed overhead pool cannot change within the decision horizon",
          "The $46.00 purchase price compared with the $46.50 full cost per unit, together with the $252,000 of unavoidable corporate allocations"
        ],
        "Correct": "B",
        "Explanation": "Relevance requires that a cost be future and differential between alternatives. Option B captures exactly that set: the $864,000 of avoidable manufacturing cost (verified: 336,000 + 192,000 + 120,000 + 216,000) plus the $78,000 opportunity cost of the sublease, matching Exhibit 3's highest-value alternative use. Option A fails because the $252,000 unavoidable allocation persists under either choice, as Exhibit 1 states. Option C wrongly discards the $216,000 avoidable fixed slice, which does disappear with discontinuation. Option D mixes irrelevant data twice: it benchmarks against full absorption cost and re-adds the very allocations that do not differ, double-counting about $264,000 of distortion relative to the correct $942,000 total make-side burden.",
        "Topic": "Cost relevance",
        "Subtopic": "Identifying differential costs in outsourcing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating all recorded product cost as differential or all fixed cost as irrelevant",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q4",
        "Type": "select",
        "Prompt": "At what purchase price per unit from Vantage would Kestrel be financially indifferent between making and buying the module, after considering the sublease alternative?",
        "Choices": [
          "$36.00 per unit",
          "$32.75 per unit",
          "$43.25 per unit",
          "$39.25 per unit"
        ],
        "Correct": "D",
        "Explanation": "Set the net cost of buying equal to the relevant cost of making: 24,000 x P - $78,000 = $864,000, so 24,000P = $942,000 and P = $39.25. Verification: 24,000 x $39.25 = $942,000; $942,000 - $78,000 = $864,000, which ties to Exhibit 1's avoidable cost. Any quote below $39.25 makes purchasing cheaper; above it, making wins. The distractors map to real errors: $36.00 omits the $3.25 per-unit opportunity charge ($78,000 / 24,000); $32.75 subtracts instead of adds it ($36.00 - $3.25); and $43.25 wrongly starts from the $46.50 full cost and deducts the same $3.25, anchoring on data that includes $10.50 of unavoidable overhead per unit.",
        "Topic": "Indifference analysis",
        "Subtopic": "Break-even purchase price",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Indifference price = (relevant make cost + opportunity cost) / units",
        "CommonTrapReference": "Omitting the per-unit opportunity cost or anchoring on full absorption cost",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "indifference point",
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q5",
        "Type": "multi",
        "Prompt": "Which THREE statements describe valid considerations Dana should raise with management alongside the quantitative analysis? Select exactly three.",
        "Choices": [
          "Vantage holds its quoted price firm for three years, stabilizing a major input cost against market volatility",
          "Internal quality records indicate supplier-built modules have historically shown a higher defect rate, raising expected warranty exposure",
          "The assembly team holds proprietary calibration expertise that would be difficult to rebuild if the supplier relationship failed",
          "Unavoidable fixed overhead of $252,000 will be eliminated once in-house production ends",
          "Because recorded manufacturing cost falls from $1,116,000 to $1,104,000 under the quote, qualitative factors cannot change the decision"
        ],
        "Correct": [
          "Vantage holds its quoted price firm for three years, stabilizing a major input cost against market volatility",
          "Internal quality records indicate supplier-built modules have historically shown a higher defect rate, raising expected warranty exposure",
          "The assembly team holds proprietary calibration expertise that would be difficult to rebuild if the supplier relationship failed"
        ],
        "Explanation": "Sound evaluation pairs the $162,000 quantitative disadvantage with strategic evidence. The first statement reflects Exhibit 2's contractual price hold, a genuine risk-transfer benefit; the second flags a quality-driven cost not captured in the model; the third warns about irreversible loss of tacit capability that could raise future switching costs. The fourth statement is factually wrong because unavoidable means the $252,000 persists under either alternative, by definition and per Exhibit 1. The fifth misreads the numbers: the apparent $12,000 recorded-cost saving reverses into a $162,000 economic loss once opportunity cost enters, and even where arithmetic favored buying, qualitative factors could still overturn it. Verification anchor: $1,104,000 - $78,000 = $1,026,000 versus $864,000 to make.",
        "Topic": "Qualitative factors",
        "Subtopic": "Strategic considerations in outsourcing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming recorded-cost comparisons settle decisions that carry quality and capability risk",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "qualitative analysis",
          "strategic sourcing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q6",
        "Type": "match",
        "Prompt": "Match each decision element from the PX-7 analysis to the value or label it carries in the exhibits. Each right-side item is used at most once; some are distractors.",
        "LeftItems": [
          "Avoidable fixed overhead",
          "Opportunity cost of released space",
          "Indifference purchase price per unit",
          "Irrelevant recorded cost element"
        ],
        "RightItems": [
          "$216,000",
          "$78,000",
          "$39.25",
          "$252,000",
          "$46.50",
          "$1,116,000"
        ],
        "Correct": {
          "Avoidable fixed overhead": "$216,000",
          "Opportunity cost of released space": "$78,000",
          "Indifference purchase price per unit": "$39.25",
          "Irrelevant recorded cost element": "$252,000"
        },
        "Explanation": "Each mapping follows directly from the verified figures: line supervision and equipment leases of $216,000 vanish if production stops, making them the avoidable fixed block; the Meridian sublease at $78,000 per year is the best alternative use of the bay, hence the opportunity cost; setting 24,000P - 78,000 = 864,000 yields the $39.25 indifference price; and the $252,000 depreciation-and-allocation layer continues regardless of the choice, marking it irrelevant. The unused distractors are the $46.50 full unit cost, which embeds both relevant and irrelevant layers, and the $1,116,000 total recorded cost, which no single element represents. Arithmetic check repeated: 216,000 + 252,000 = 468,000 total fixed overhead, consistent with Exhibit 1's rows.",
        "Topic": "Decision elements",
        "Subtopic": "Mapping concepts to values",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assigning the full unit cost or total recorded cost to a single decision element",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cost classification"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-D3",
    "Title": "Enterprise Risk Register Refresh",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Assess inherent and residual risk using likelihood and impact scales",
      "Evaluate risk scores against board-approved risk appetite thresholds",
      "Select appropriate risk responses across accept, reduce, share, and avoid categories"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 28,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborview Logistics, a Tacoma-based third-party logistics provider serving Pacific Northwest importers, is rebuilding its enterprise risk register after a ransomware attack disabled a competitor's dispatch platform for nine days. Chief Risk Officer Priya Raman must present scored inherent and residual ratings for the four priority risks, identify any position that breaches the board-approved appetite statement, and recommend a treatment response for each exception ahead of the October board meeting. The board has warned that unexplained appetite breaches will trigger an external assurance review.",
    "Industry": "Third-party logistics",
    "CompanyType": "Service provider",
    "CompanyName": "Harborview Logistics",
    "Stakeholder": "Priya Raman, Chief Risk Officer",
    "BusinessFunction": "Enterprise risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ERM",
      "risk register",
      "risk appetite",
      "COSO ERM"
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
      "Compute inherent and residual risk scores from likelihood and impact ratings",
      "Interpret residual scores against a quantified risk appetite statement",
      "Match risk responses to score drivers and control maturity",
      "Design governance practices that keep a risk register decision-useful"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D3-E1",
        "CaseID": "CBQ22-D3",
        "Type": "table",
        "Title": "Enterprise Risk Register - FY2027 Refresh (Priority Risks)",
        "Purpose": "Supplies the likelihood and impact ratings before controls and after controls for each priority risk, together with the key controls credited, feeding every scoring, appetite, and response item.",
        "ReferencedBy": [
          "CBQ22-D3-Q1",
          "CBQ22-D3-Q2",
          "CBQ22-D3-Q3",
          "CBQ22-D3-Q4",
          "CBQ22-D3-Q6"
        ],
        "Headers": [
          "Risk ID",
          "Risk Description",
          "Inherent Likelihood (1-5)",
          "Inherent Impact (1-5)",
          "Key Controls In Place",
          "Residual Likelihood (1-5)",
          "Residual Impact (1-5)"
        ],
        "Rows": [
          [
            "R-01",
            "Cyberattack disabling the transportation management system",
            "4",
            "5",
            "Multi-factor authentication, network segmentation, tested backup recovery",
            "2",
            "5"
          ],
          [
            "R-02",
            "Port congestion delaying Puget Sound container pickup windows",
            "4",
            "3",
            "Dual-carrier drayage contracts, dynamic appointment scheduling",
            "3",
            "2"
          ],
          [
            "R-03",
            "Diesel price spikes compressing dedicated-lane margins",
            "3",
            "4",
            "Twelve-month fixed-price fuel contracts covering 70 percent of burn",
            "2",
            "3"
          ],
          [
            "R-04",
            "Cargo theft from yards and trailers",
            "3",
            "4",
            "GPS trailer locks, fenced yards, driver theft-awareness training",
            "2",
            "3"
          ]
        ],
        "DataFormat": "Likelihood and impact on defined 1-to-5 scales; one row per priority risk.",
        "AccuracyCheck": "Verified twice: inherent scores 4x5=20, 4x3=12, 3x4=12, 3x4=12; residual scores 2x5=10, 3x2=6, 2x3=6, 2x3=6; only R-01 residual (10) exceeds the appetite ceiling of 8."
      },
      {
        "ExhibitID": "CBQ22-D3-E2",
        "CaseID": "CBQ22-D3",
        "Type": "text",
        "Title": "Board Risk Appetite Statement (Excerpt)",
        "Purpose": "Defines the scoring anchors and the quantified appetite bands against which residual scores are judged, governing which risks require additional treatment.",
        "ReferencedBy": [
          "CBQ22-D3-Q3",
          "CBQ22-D3-Q4",
          "CBQ22-D3-Q5"
        ],
        "Body": "Adopted by the Harborview Logistics board of directors, March 2027.\n\nScoring anchors. Likelihood: 1 = remote (less than once in five years); 2 = unlikely (about once in five years); 3 = possible (about once in two years); 4 = likely (roughly annually); 5 = almost certain (multiple times per year). Impact: 1 = negligible (<$25,000 or no service disruption); 3 = material ($250,000-$999,000 or disruption up to 48 hours); 5 = severe (>$2,500,000 or disruption beyond 96 hours).\n\nAppetite bands. Residual score 9 or higher: outside appetite; an additional response with named owner and dated milestone is required before the next board cycle. Residual score 6 to 8: inside appetite but subject to active monitoring, quarterly key-risk-indicator review, and a named accountable owner. Residual score 5 or below: acceptable; periodic reassessment at the annual refresh.\n\nReporting expectation. Exceptions are reported with the driver of the score (likelihood versus impact), the controls credited, and the recommended response category."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D3-Q1",
        "Type": "numeric",
        "Prompt": "Using the register's scales, what is the inherent risk score for cargo theft from yards and trailers (R-04)? Enter a whole number.",
        "Correct": "12",
        "Explanation": "Under COSO ERM practice, inherent risk is scored before considering controls as likelihood times impact. The register rates R-04 at inherent likelihood 3, meaning roughly an annual occurrence industry-wide, and inherent impact 4, reflecting losses approaching seven figures across a loaded trailer and customer penalties. Multiplying gives 3 x 4 = 12. Scoring inherently first establishes the baseline from which control effectiveness is later demonstrated; blending judgments about existing controls into the inherent rating hides mitigation value and is the most common register-building error. Verification: 3 x 4 = 12, and the same discipline produces 20 for R-01, 12 for R-02, and 12 for R-03, matching every row of Exhibit 1.",
        "Topic": "Risk assessment",
        "Subtopic": "Inherent risk scoring",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Inherent risk score = likelihood rating x impact rating",
        "CommonTrapReference": "Mixing control-effectiveness judgments into the inherent score",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "inherent risk",
          "risk scoring"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q2",
        "Type": "numeric",
        "Prompt": "After crediting the controls listed for R-01, what is the residual risk score for the cyberattack on the transportation management system? Enter a whole number.",
        "Correct": "10",
        "Explanation": "Residual risk equals residual likelihood multiplied by residual impact after controls take effect. Multi-factor authentication, segmentation, and tested backups cut the success frequency of intrusion attempts, moving residual likelihood from 4 down to 2, while impact stays at 5 because a successful attack still halts dispatch beyond the 96-hour severe threshold. The residual score is therefore 2 x 5 = 10, half the inherent 4 x 5 = 20. Verification repeated: 2 x 5 = 10. Controls usually move likelihood faster than catastrophic impact, so a residual score implying the impact dimension also collapsed (for example 2 x 2) should trigger challenge in review, since backup recovery shortens downtime but cannot prevent a severe event from occurring once defenses fail.",
        "Topic": "Risk assessment",
        "Subtopic": "Residual risk scoring",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Residual risk score = residual likelihood x residual impact",
        "CommonTrapReference": "Assuming strong preventive controls also shrink catastrophic impact ratings",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "residual risk",
          "cyber risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q3",
        "Type": "select",
        "Prompt": "Applying the appetite bands in the board statement to the refreshed register, which risk sits outside appetite after controls and requires an additional response before the October board cycle?",
        "Choices": [
          "Cyberattack disabling the transportation management system, whose residual score of 10 exceeds the ceiling of 8",
          "Port congestion on Puget Sound pickup windows, residual 6, inside the monitored band",
          "Diesel price spikes compressing dedicated-lane margins, residual 6, inside the monitored band",
          "Cargo theft from yards and trailers, residual 6, inside the monitored band"
        ],
        "Correct": "A",
        "Explanation": "The board statement fixes the boundary at residual 8: scores of 9 or above fall outside appetite and demand further treatment with a named owner and dated milestone, while 6 through 8 remain inside but monitored, and 5 or below is acceptable. Only R-01 breaches the line, at 2 x 5 = 10, because its impact dimension stays severe even after excellent likelihood-reducing controls. R-02 lands at 3 x 2 = 6, R-03 at 2 x 3 = 6, and R-04 at 2 x 3 = 6, all within tolerance. Verification: 10 > 8 while 6 <= 8 for the others. Testing inherent rather than residual scores against the bands would falsely push R-02 and R-03 (both inherent 12) onto the exception list and overstate the assurance workload.",
        "Topic": "Risk appetite",
        "Subtopic": "Post-control exceptions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Testing inherent instead of residual scores against appetite bands",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "risk appetite",
          "governance"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q4",
        "Type": "select",
        "Prompt": "Given R-01's position after current controls, which response should Priya recommend to the board?",
        "Choices": [
          "Accept the exposure because the inherent score has been stable across two consecutive refreshes",
          "Share by raising cyber insurance limits alone while leaving the control roadmap frozen",
          "Avoid by exiting digital freight brokerage and returning to manual phone-based dispatch",
          "Reduce further by funding the remaining zero-trust phases, tabletop incident-response drills, and vendor-access reviews"
        ],
        "Correct": "D",
        "Explanation": "Response selection follows the score's driver. A residual of 10 cannot be accepted under the stated appetite, ruling out passive retention. Avoidance would abandon a core revenue channel disproportionate to the exposure, and sharing through higher insurance limits leaves the breach trajectory untouched while premiums rise; insurers increasingly condition limits on demonstrated control maturity anyway. Because likelihood is already well controlled at 2, further reduction targets containment and recovery speed through zero-trust completion, exercised playbooks, and vendor governance, which either pulls impact resilience up or pushes likelihood toward 1, moving 2 x 5 = 10 back inside the ceiling of 8. Verification: reaching residual 8 requires 2 x 4 or 1 x 5, both achievable through impact-side hardening alone.",
        "Topic": "Risk response",
        "Subtopic": "Treatment selection for exceptions",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Selecting insurance alone for an exception driven by unreduced impact",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "mitigation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q5",
        "Type": "multi",
        "Prompt": "Which THREE actions would most strengthen the credibility of the refreshed register when Priya presents it to the board? Select exactly three.",
        "Choices": [
          "Anchor every rating to the published scale definitions and document the rationale for each movement from inherent to residual",
          "Round all residual scores down by one point to reflect management optimism about the control environment",
          "Assign a named executive owner and a dated treatment milestone to every risk scored 6 or higher",
          "Refresh key-risk-indicator dashboards quarterly so trend movements trigger reassessment between annual cycles",
          "Present only the four priority risks and withhold the remainder of the inventory to keep the board deck short"
        ],
        "Correct": [
          "Anchor every rating to the published scale definitions and document the rationale for each movement from inherent to residual",
          "Assign a named executive owner and a dated treatment milestone to every risk scored 6 or higher",
          "Refresh key-risk-indicator dashboards quarterly so trend movements trigger reassessment between annual cycles"
        ],
        "Explanation": "Register credibility rests on traceability, accountability, and monitoring. Anchoring scores to the adopted definitions lets two assessors reach the same number and survives audit challenge; ownership with dated milestones operationalizes the board's own requirement for monitored-band risks; and quarterly indicator refresh catches drift before the annual cycle, converting the register from a static artifact into a live control. Deflating scores to signal confidence corrupts the appetite test the board relies on and invites the external assurance review flagged in the scenario. Withholding most of the inventory defeats enterprise-wide visibility and hides aggregate concentration effects. Consistency check: every band in Exhibit 2 presumes honest scores, so any systematic bias invalidates the exception logic applied to R-01's residual 10.",
        "Topic": "Risk governance",
        "Subtopic": "Register quality practices",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating score presentation choices as neutral rather than governance-relevant",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ERM governance",
          "board reporting"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q6",
        "Type": "match",
        "Prompt": "Match each COSO ERM response category to the example that best illustrates it for Harborview. Each right-side item is used at most once; one is a distractor.",
        "LeftItems": [
          "Risk acceptance",
          "Risk reduction",
          "Risk sharing",
          "Risk avoidance"
        ],
        "RightItems": [
          "Retaining port congestion within the monitored band with quarterly indicator review",
          "Adding telematics locks and dual-carrier drayage contracts to cut theft and delay exposure",
          "Buying cargo liability coverage backed by contractual indemnities from owner-operators",
          "Exiting the refrigerated pharmaceutical vertical entirely after an appetite breach",
          "Doubling marketing spend in the highest-scoring risk segment to grow share"
        ],
        "Correct": {
          "Risk acceptance": "Retaining port congestion within the monitored band with quarterly indicator review",
          "Risk reduction": "Adding telematics locks and dual-carrier drayage contracts to cut theft and delay exposure",
          "Risk sharing": "Buying cargo liability coverage backed by contractual indemnities from owner-operators",
          "Risk avoidance": "Exiting the refrigerated pharmaceutical vertical entirely after an appetite breach"
        },
        "Explanation": "COSO ERM sorts responses by their effect on exposure. Acceptance keeps the risk without new treatment, which fits congestion held inside appetite with monitoring; reduction applies controls or process changes that lower likelihood or impact, matching added physical and carrier safeguards; sharing transfers part of the exposure to another party through insurance or indemnities; and avoidance exits the activity generating the risk altogether, as exiting the pharma vertical would. The distractor describes deliberately increasing exposure for growth reasons, which is pursuing risk for return, a portfolio strategy decision rather than one of the four treatment responses. Cross-check: each matched example mirrors a control or posture already visible in Exhibit 1 or the appetite statement, keeping the case internally consistent.",
        "Topic": "Risk responses",
        "Subtopic": "Response category mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Classifying growth-oriented risk pursuit as a treatment response",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "COSO ERM",
          "response categories"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-F2",
    "Title": "Covenant Pressure and Invoice Deferral",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Identify violations of the IMA Statement of Ethical Professional Practice in reporting-pressure situations",
      "Apply the IMA resolution model, including escalation beyond the involved supervisor",
      "Evaluate documentation and communication duties when integrity is threatened"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Atlas Greenhouses, a Colorado wholesale grower operating 40 acres under glass, tests a 1.40 minimum current ratio covenant at each quarter end, and Controller Daniel Reyes, CPA, has identified $310,000 of June supplier invoices still awaiting entry two days before June 30 close. Chief Financial Officer Sandra Kimball instructs Daniel to hold the invoices until July 8 so the quarter reports a compliant ratio, noting the relationship manager has already been told the covenant passes. Facing direct pressure from his supervisor, Daniel must quantify the effect of the deferral, identify the standards implicated, and execute the resolution steps his professional certification requires.",
    "Industry": "Commercial horticulture",
    "CompanyType": "Grower-producer",
    "CompanyName": "Atlas Greenhouses",
    "Stakeholder": "Daniel Reyes, Corporate Controller",
    "BusinessFunction": "Financial reporting and treasury compliance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "IMA ethics",
      "covenant compliance",
      "cut-off",
      "escalation"
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
      "Quantify how period-cut-off manipulation distorts covenant ratios",
      "Link specific conduct to the IMA standards of ethical professional practice",
      "Sequence escalation correctly when the pressure originates with the immediate supervisor",
      "Document and communicate an ethics conflict in a defensible manner"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F2-E1",
        "CaseID": "CBQ22-F2",
        "Type": "table",
        "Title": "Quarter-End Financial Snapshot - June 30, 2027 (Before Disputed Entries)",
        "Purpose": "Provides the balance-sheet inputs and covenant threshold used to compute the corrected ratio, the distortion caused by deferral, and the breach conclusion.",
        "ReferencedBy": [
          "CBQ22-F2-Q1",
          "CBQ22-F2-Q2",
          "CBQ22-F2-Q3"
        ],
        "Headers": [
          "Line Item",
          "Amount"
        ],
        "Rows": [
          [
            "Current assets at June 30 (preliminary, complete)",
            "$4,200,000"
          ],
          [
            "Current liabilities recorded through June 29 close",
            "$2,800,000"
          ],
          [
            "June supplier invoices received but held for July entry",
            "$310,000"
          ],
          [
            "Loan covenant minimum current ratio",
            "1.40"
          ],
          [
            "Ratio implied if held invoices were entered as of June 30",
            "1.35"
          ]
        ],
        "DataFormat": "Currency in USD, whole dollars; ratio to two decimals.",
        "AccuracyCheck": "Verified twice: corrected liabilities $2,800,000 + $310,000 = $3,110,000; corrected ratio $4,200,000 / $3,110,000 = 1.35 (two decimals), which breaches the 1.40 covenant; reported ratio absent entry = $4,200,000 / $2,800,000 = 1.50."
      },
      {
        "ExhibitID": "CBQ22-F2-E2",
        "CaseID": "CBQ22-F2",
        "Type": "email",
        "Title": "Instruction from CFO Sandra Kimball",
        "Purpose": "Documents the directive creating the ethical conflict, including the timing instruction and the external representation already made to the lender, which frame the escalation and documentation items.",
        "ReferencedBy": [
          "CBQ22-F2-Q3",
          "CBQ22-F2-Q4",
          "CBQ22-F2-Q5",
          "CBQ22-F2-Q6"
        ],
        "Body": "From: Sandra Kimball, Chief Financial Officer, Atlas Greenhouses\nTo: Daniel Reyes, Corporate Controller\nSent: June 28, 2027, 4:52 PM\nSubject: Quarter-end close instruction\n\nDaniel, hold the Bergstrom Supply and Canopy Irrigation invoices until July 8. Entering them now drops us to about 1.35 and puts the covenant call with First Ridge Bank at risk, and I have already told our relationship manager we expect to certify comfortably above 1.40. Payables processing will simply prioritize other batches this week. Do not prepare a separate accrual schedule for these two vendors. I want the flash report showing 1.50 on Thursday. This direction comes from me, so there is nothing further you need to escalate internally.\n\nSandra"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F2-Q1",
        "Type": "numeric",
        "Prompt": "If the held supplier invoices were properly recorded as of June 30, what current ratio would Atlas report? Round to two decimal places.",
        "Correct": "1.35",
        "Explanation": "Accrual accounting and proper cut-off require recording liabilities for goods and services received by period end, regardless of invoice payment timing. Corrected current liabilities equal $2,800,000 + $310,000 = $3,110,000, giving a current ratio of $4,200,000 / $3,110,000 = 1.3505, which rounds to 1.35 at two decimals. That result sits below the 1.40 covenant minimum in Exhibit 1, meaning truthful reporting discloses a breach and triggers lender consultation. The trap is treating invoice entry date as the recognition trigger, when receipt of goods and services controls the cut-off under GAAP. Verification repeated: 3,110,000 x 1.35 = 4,198,500, consistent with the computed 1.3505 rounding to 1.35.",
        "Topic": "Financial statement cut-off",
        "Subtopic": "Liability recognition timing",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Current ratio = current assets / current liabilities",
        "CommonTrapReference": "Using invoice entry date rather than goods-received date for cut-off",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "current ratio",
          "accrual cutoff"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F2-Q2",
        "Type": "numeric",
        "Prompt": "By how much does holding the invoices overstate the reported current ratio compared with the properly corrected ratio? Express to two decimal places.",
        "Correct": "0.15",
        "Explanation": "The distortion equals the reported ratio minus the corrected ratio: $4,200,000 / $2,800,000 = 1.50 as instructed by the CFO, less the corrected 1.35 computed from liabilities of $3,110,000, leaving an overstatement of 0.15. In percentage terms the deferral inflates the ratio by roughly 11 percent (0.15 / 1.35), enough to move Atlas from a disclosed covenant breach to apparent headroom of 0.10 above the 1.40 floor. Verification: 1.50 - 1.35 = 0.15, and the corrected-ratio division was recomputed independently as 42 / 31.1 = 1.3505. Materiality offers no refuge because covenant certifications are relied upon directly by the lender, so even smaller distortions of a certified measure carry the same ethical weight.",
        "Topic": "Ratio distortion",
        "Subtopic": "Quantifying misstatement effect",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Measuring distortion in dollars instead of ratio points against a certified threshold",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "ratio analysis",
          "misstatement"
        ],
        "Dependencies": [
          "CBQ22-F2-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-F2-Q3",
        "Type": "select",
        "Prompt": "Under the IMA Statement of Ethical Professional Practice, which standard is most directly compromised by recording June liabilities in July to influence a covenant certification?",
        "Choices": [
          "Confidentiality, because the vendor names on the deferred invoices constitute nonpublic information",
          "Competence alone, because the ratio computation itself contains no arithmetic error",
          "Integrity, because deliberately omitting recorded liabilities to sway a covenant test discredits the profession and the organization",
          "Credibility, because the flash report lacked supplemental charts supporting the ratio trend"
        ],
        "Correct": "C",
        "Explanation": "The Integrity standard requires members to abstain from engaging in or supporting any activity calculated to discredit the profession or the organization, and to mitigate conflicts by refusing arrangements that prejudice sound judgment. Intentionally shifting $310,000 of June liabilities into July to flip a certified covenant result from breach (1.35) to pass (1.50) is precisely such conduct. Confidentiality concerns protecting information, not falsifying measures; Competence is implicated in accurate preparation but the arithmetic here is flawless, so calling it the primary failure misses the deliberate intent; and Credibility demands fair, objective, fully disclosed communication, yet the core wrong is the integrity breach that credibility failures would merely broadcast. Verification context: the 0.15 ratio distortion traces entirely to the omitted $310,000.",
        "Topic": "IMA standards",
        "Subtopic": "Integrity standard application",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Labeling intentional misstatement as a competence or credibility issue",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "integrity",
          "IMA ethics"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F2-Q4",
        "Type": "select",
        "Prompt": "Following the IMA resolution model, what is Daniel's required next step given that the instruction originates with his immediate supervisor, the CFO?",
        "Choices": [
          "Submit the facts to the next higher management level, here the audit committee or board of directors, since the immediate supervisor is involved, and contemporaneously document the issue",
          "Comply with the instruction, because the controller reports to the CFO and the deferral involves only timing within a few days",
          "Raise the concern anonymously on an industry discussion forum to avoid career repercussions",
          "Quietly book offsetting accruals from prior quarters so the ratio lands near 1.40 without visible adjustment"
        ],
        "Correct": "A",
        "Explanation": "The IMA resolution model directs an accountant to follow the organization's established policy and to escalate to the immediate supervisor first, except where that supervisor is involved in the conflict, in which case the matter goes to the next higher level, and if unresolved onward to the audit committee, board of directors, or those charged with governance. Here the CFO authored the instruction and expressly forbade internal escalation, so Daniel must carry the documented facts upward himself. Compliance makes him party to a knowing covenant misstatement; anonymous public leaks abandon the prescribed internal channels; and engineering offsets compounds the original misconduct with a second manipulation. Documentation note: a dated memorandum stating the instruction, amounts, and computations (1.50 versus 1.35 against the 1.40 floor) creates the record the model expects.",
        "Topic": "Ethics resolution",
        "Subtopic": "Escalation past an involved supervisor",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Skipping escalation because the pressure came from the direct supervisor",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "escalation",
          "resolution model"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F2-Q5",
        "Type": "multi",
        "Prompt": "Which THREE actions align with IMA guidance as Daniel works the conflict? Select exactly three.",
        "Choices": [
          "Consult Atlas's written ethics policy and use internal confidential reporting channels available to employees",
          "Delay raising the matter until after the annual loan review so the bank relationship settles first",
          "Discuss the situation confidentially with an objective adviser, such as the IMA ethics helpline",
          "Seek legal counsel regarding regulatory and fiduciary notification duties before any external disclosure",
          "Delete the email thread containing the deferral instruction once the quarter closes cleanly"
        ],
        "Correct": [
          "Consult Atlas's written ethics policy and use internal confidential reporting channels available to employees",
          "Discuss the situation confidentially with an objective adviser, such as the IMA ethics helpline",
          "Seek legal counsel regarding regulatory and fiduciary notification duties before any external disclosure"
        ],
        "Explanation": "IMA guidance prescribes consulting the organization's own policies and confidential channels, discussing the conflict with an unbiased third party such as the IMA helpline, and, where legal obligations may attach, obtaining counsel on notification requirements before escalating externally. These three preserve confidentiality, objectivity, and legal prudence simultaneously. Waiting until after the loan review lets a known misstatement reach a relying third party, which no ethics framework tolerates; destroying the instruction destroys exculpatory evidence and obstructs any subsequent inquiry, compounding an integrity breach with concealment. Retention check: the exhibit thread documents both the amount ($310,000) and the explicit no-accrual direction, which is central to establishing that the 0.15 ratio distortion was intentional rather than clerical.",
        "Topic": "Ethics resolution",
        "Subtopic": "Support resources and documentation duties",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Deferring disclosure for business convenience or purging evidence of instructions",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ethics resources",
          "documentation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-F2-Q6",
        "Type": "match",
        "Prompt": "Match each IMA standard to the duty it imposes on Daniel in this situation. Each right-side item is used at most once; one is a distractor.",
        "LeftItems": [
          "Competence",
          "Confidentiality",
          "Integrity",
          "Credibility"
        ],
        "RightItems": [
          "Maintain professional expertise and perform duties under applicable laws, regulations, and technical standards",
          "Keep information secure except when disclosure is authorized or legally required",
          "Abstain from conduct that would discredit the organization or the profession",
          "Communicate information fairly, objectively, and with full disclosure to users who rely on it",
          "Maximize reported covenant headroom to protect financing terms during downturns"
        ],
        "Correct": {
          "Competence": "Maintain professional expertise and perform duties under applicable laws, regulations, and technical standards",
          "Confidentiality": "Keep information secure except when disclosure is authorized or legally required",
          "Integrity": "Abstain from conduct that would discredit the organization or the profession",
          "Credibility": "Communicate information fairly, objectively, and with full disclosure to users who rely on it"
        },
        "Explanation": "The four IMA standards partition the duties at stake. Competence anchors performance to laws and technical standards, here GAAP cut-off rules requiring the $310,000 in June; Confidentiality protects nonpublic information from unauthorized release, relevant to vendor and lender details but not to truthfulness; Integrity bars discrediting conduct, the standard the CFO instruction violates; and Credibility requires fair, objective, fully disclosed communication, which the 1.50 flash report fails by omitting the pending invoices. The distractor expresses a commercial objective that no professional standard recognizes as a duty, and pursuing it through misstatement is exactly what Integrity prohibits. Tie-back check: mapping each duty onto the scenario reproduces the breach arithmetic of 1.50 reported versus 1.35 corrected against the 1.40 covenant.",
        "Topic": "IMA standards",
        "Subtopic": "Standard-to-duty mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading a financing objective as a professional duty owed to lenders",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "IMA standards",
          "professional duties"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-CERT-064",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ22-A3",
    "Title": "Flash Tech: Foreign Subsidiary Translation in a Hyperinflationary Economy",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Apply ASC 830 translation methodology to a foreign subsidiary",
      "Analyze the impact of hyperinflationary remeasurement on consolidated equity",
      "Evaluate presentation currency choice and CECL interaction with FX-denominated receivables",
      "Compare ASC 830 mechanics to IAS 21 functional currency treatment"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Tech consolidates Flash Tech Argentina S.A., a wholly owned Buenos Aires-based subsidiary whose functional currency is the Argentine peso (ARS). Argentina's cumulative inflation index has exceeded 100% over three consecutive years, classifying the economy as hyperinflationary under ASC 830-10-45. Controller Adaeze Onuorah is preparing the Q3 consolidated package and must choose between (i) remeasuring the subsidiary's books into the U.S. dollar (USD) reporting currency using the temporal method, then translating, or (ii) using the current-rate method on a prior restatement basis. Flash Tech Argentina holds a USD-denominated intercompany receivable of ARS 4,200,000 (USD 4,200) and inventory carried at historical cost of ARS 18,500,000. Adaeze must also evaluate how CECL adoption affects reserves on FX-denominated third-party receivables and how the translation adjustment flows into AOCI under ASC 830-30-45. CFO Mariela Hoffmann has asked for a recommendation on whether to retain the USD as presentation currency or switch to a stable third-currency display given the volatility.",
    "Industry": "Technology Hardware and Semiconductors",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Tech",
    "Stakeholder": "Adaeze Onuorah, Controller",
    "BusinessFunction": "Group Financial Reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ASC 830",
      "hyperinflation",
      "translation",
      "remeasurement",
      "current-rate method",
      "temporal method",
      "CECL"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Distinguish the current-rate method from the temporal method under ASC 830",
      "Apply hyperinflationary remeasurement mechanics to monetary and non-monetary items",
      "Analyze translation adjustment effects on consolidated stockholders' equity",
      "Evaluate presentation currency choice and CECL interaction with FX-denominated receivables"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-A3-E1",
        "CaseID": "CBQ22-A3",
        "Type": "table",
        "Title": "Exhibit 1 — Flash Tech Argentina Selected Balance Sheet Items (in ARS, September 30, 2026)",
        "Description": "Pre-translation balances for Flash Tech Argentina S.A. prepared under Argentine GAAP and adjusted for local hyperinflation accounting.",
        "Columns": [
          "Line Item",
          "Carrying Amount (ARS)",
          "Classification",
          "Rate to Apply"
        ],
        "Rows": [
          [
            "Cash and cash equivalents",
            "12,500,000",
            "Monetary",
            "Current (closing)"
          ],
          [
            "Accounts receivable — third party (USD-denominated)",
            "4,200,000",
            "Monetary",
            "Current (closing)"
          ],
          [
            "Inventory (at historical cost)",
            "18,500,000",
            "Non-monetary",
            "Historical"
          ],
          [
            "Property, plant & equipment (net)",
            "65,800,000",
            "Non-monetary",
            "Historical"
          ],
          [
            "Long-term USD-denominated debt",
            "32,000,000",
            "Monetary",
            "Current (closing)"
          ],
          [
            "Common stock and additional paid-in capital",
            "40,000,000",
            "Equity",
            "Historical"
          ],
          [
            "Retained earnings (post-restatement)",
            "28,000,000",
            "Equity",
            "Historical / average"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ22-A3-E2",
        "CaseID": "CBQ22-A3",
        "Type": "table",
        "Title": "Exhibit 2 — Exchange Rate and Inflation Data (2023–2026)",
        "Description": "Closing and average ARS/USD rates and Argentine CPI index used for translation and remeasurement.",
        "Columns": [
          "Period",
          "Closing ARS per USD",
          "Average ARS per USD",
          "CPI Index (base 100 = Dec 2022)"
        ],
        "Rows": [
          [
            "Dec 31, 2022",
            "177",
            "162",
            "100.0"
          ],
          [
            "Dec 31, 2023",
            "808",
            "490",
            "211.4"
          ],
          [
            "Dec 31, 2024",
            "1,032",
            "925",
            "369.0"
          ],
          [
            "Dec 31, 2025",
            "1,470",
            "1,255",
            "522.0"
          ],
          [
            "Sep 30, 2026 (Q3 close)",
            "1,580",
            "1,520",
            "612.5"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-A3-Q1",
        "Type": "mcq",
        "Prompt": "Under ASC 830, which translation methodology is generally required for a foreign subsidiary whose functional currency differs from the parent's USD reporting currency in a non-hyperinflationary economy?",
        "Choices": {
          "A": "Current-rate method translating all assets and liabilities at the closing rate and equity at historical rates",
          "B": "Temporal method remeasuring monetary items at the closing rate and non-monetary items at historical rates",
          "C": "Monetary/non-monetary method translating monetary items at average rates",
          "D": "Current-cost method restating all assets to fair value before translation"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "When the functional currency of a foreign subsidiary differs from the parent's reporting currency in a non-hyperinflationary economy, ASC 830 requires the current-rate method. Under this approach, all assets and liabilities are translated at the closing (current) exchange rate, income and expense items at average or transaction-date rates, and equity at historical rates. The resulting translation adjustment is reported in other comprehensive income (AOCI). The temporal method is reserved for subsidiaries operating in hyperinflationary economies where the books are first remeasured into the reporting currency.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "The temporal method applies to a subsidiary whose books are recorded in the reporting currency's functional equivalent or to hyperinflationary remeasurement, not to a standard non-hyperinflationary translation under ASC 830.",
        "ExplanationWrongC": "There is no 'monetary/non-monetary method' for translating a foreign operation in U.S. GAAP; this label is associated with older IAS frameworks and does not govern ASC 830 translation of a foreign entity.",
        "ExplanationWrongD": "U.S. GAAP does not require a 'current-cost method' restating all assets to fair value prior to translation; ASC 830-30 specifies the current-rate method for translation of foreign entities with a different functional currency.",
        "Topic": "ASC 830 translation methodology",
        "LOSTag": "A.1",
        "VerifiedChecks": [
          "ASC 830-30-45 specifies current-rate method for foreign entities with different functional currency",
          "Temporal method reserved for hyperinflationary remeasurement"
        ]
      },
      {
        "ItemID": "CBQ22-A3-Q2",
        "Type": "mcq",
        "Prompt": "Given that Argentina's economy is hyperinflationary under ASC 830-10-45, which rate should be applied to restate the ARS 18,500,000 inventory balance on the subsidiary's books before translation, and at what rate is the restated inventory translated to USD?",
        "Choices": {
          "A": "Restate at the historical CPI factor relative to acquisition; translate at the closing ARS/USD rate of 1,580",
          "B": "Restate at the current CPI index (612.5); translate at the historical ARS/USD rate of 177",
          "C": "Restate at the average CPI for the period; translate at the average ARS/USD rate of 1,520",
          "D": "Restate at the closing CPI index only; translate at the closing ARS/USD rate after applying the closing rate a second time to inventory"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under ASC 830-10-45, in a hyperinflationary economy the subsidiary first remeasures its financial statements so that non-monetary items (such as inventory carried at historical cost) are restated to current purchasing power using a general price index, while monetary items retain nominal amounts adjusted for inflation. After restatement, the entire set of remeasured statements is translated to the reporting currency using the closing exchange rate (1,580 ARS/USD at September 30, 2026). The historical rate of 177 would correspond to the 2022 base year and is not the closing translation rate.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Translating at the historical ARS/USD rate of 177 would represent the dollar cost at the 2022 base period, not the September 30, 2026 closing rate; under ASC 830 the closing rate is used after remeasurement for translation.",
        "ExplanationWrongC": "Average-period rates are used for income-statement items under the current-rate method, not for balance-sheet non-monetary items after hyperinflationary restatement; the closing rate applies at the balance-sheet date.",
        "ExplanationWrongD": "Restating inventory using the closing CPI index alone omits the historical-CPI factor that converts the historical peso cost to current purchasing power; additionally, the closing rate is applied once after restatement, not twice.",
        "Topic": "Hyperinflationary remeasurement mechanics",
        "LOSTag": "A.1",
        "VerifiedChecks": [
          "ASC 830-10-45-9 through 45-11 govern hyperinflationary remeasurement",
          "Closing rate used after restatement"
        ]
      },
      {
        "ItemID": "CBQ22-A3-Q3",
        "Type": "mcq",
        "Prompt": "If Flash Tech Argentina's remeasured net assets of ARS 40,000,000 are translated to USD using the closing rate of 1,580 ARS/USD, what is the impact of a translation gain or loss under ASC 830-30-45?",
        "Choices": {
          "A": "The translation difference flows through AOCI as a cumulative translation adjustment (CTA), with no effect on net income for the period",
          "B": "The translation difference is recognized immediately in net income under ASC 830-30-45-12",
          "C": "The translation difference is deferred on the balance sheet indefinitely until disposal of the subsidiary",
          "D": "The translation difference is reclassified to retained earnings at each balance-sheet date"
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under ASC 830-30-45, when a foreign entity is in a hyperinflationary economy, the remeasurement gain or loss arising from translating remeasured net assets at the closing rate is generally recognized in net income rather than in OCI, because the underlying financial statements have already been remeasured to current purchasing power. ASC 830-10-45 and ASC 830-30-45-12 reflect this treatment: the post-remeasurement translation effect is taken to earnings because it results from changes in the exchange rate against a stable reporting currency after the entity's books have been restated for inflation. A cumulative translation adjustment in AOCI applies primarily to non-hyperinflationary translation of self-sustaining foreign operations.",
        "ExplanationWrongA": "This describes the CTA treatment for non-hyperinflationary foreign operations under ASC 830-30-45; it does not apply to a hyperinflationary subsidiary whose statements have been remeasured first.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The translation difference is not deferred indefinitely; under ASC 830 the effect is recognized in earnings each period for a hyperinflationary subsidiary, with no indefinite deferral.",
        "ExplanationWrongD": "Reclassifying the translation difference to retained earnings at each balance-sheet date would conflict with ASC 830 and would distort both AOCI and net income in periods without a disposal event.",
        "Topic": "Translation adjustment under ASC 830-30-45",
        "LOSTag": "A.2",
        "VerifiedChecks": [
          "ASC 830-30-45-12 governs hyperinflationary translation effect",
          "Remeasurement gain/loss in earnings; CTA only for non-hyperinflationary"
        ]
      },
      {
        "ItemID": "CBQ22-A3-Q4",
        "Type": "mcq",
        "Prompt": "Which of the following best describes the most material conceptual difference between ASC 830 (U.S. GAAP) and IAS 21 (IFRS) in classifying a foreign operation as 'integral' vs 'self-sustaining'?",
        "Choices": {
          "A": "ASC 830 and IAS 21 are identical and use the same terminology for integral and self-sustaining operations",
          "B": "ASC 830 requires self-sustaining entities to be remeasured using the temporal method, whereas IAS 21 requires all foreign operations to use the closing-rate method",
          "C": "ASC 830 uses a functional-currency framework that depends on cash flows, financing, and intercompany relationships; IAS 21 focuses on the primary economic environment and the currency that mainly influences sales prices and costs",
          "D": "ASC 830 and IAS 21 both prohibit translation adjustments in OCI and require all FX effects in profit or loss"
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "ASC 830-10-20 determines functional currency primarily by indicators such as cash flows, financing currency, intra-company transactions, and sales market indicators. Under ASC 830, a foreign operation whose functional currency is the local currency is treated as self-sustaining and translated using the current-rate method; one whose functional currency is the parent's currency is treated as 'integral' and is remeasured using the temporal method. IAS 21 (paragraphs 9-14) determines functional currency through a similar but distinct set of indicators emphasizing the primary economic environment in which the entity operates, and uses the term 'foreign operation' rather than 'integral vs self-sustaining,' although the translation outcomes are generally converged.",
        "ExplanationWrongA": "Choice A retains all cumulative translation adjustment (CTA) in other comprehensive income without reclassifying any portion to current-period earnings; this is wrong under ASC 830-10-45 because in hyperinflationary environments the functional currency is the local currency and the reporting currency is the U.S. dollar, requiring full remeasurement gains and losses to flow through the income statement rather than O. (per ASC 830-10-45-12).",
        "ExplanationWrongB": "ASC 830 does not require all self-sustaining entities to be remeasured; rather, self-sustaining operations are translated using the current-rate method, while integral operations (functional currency = parent currency) are remeasured using the temporal method.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "Both ASC 830 and IAS 21 generally permit translation adjustments in OCI for foreign operations with a different functional currency; neither standard prohibits the CTA for self-sustaining foreign operations.",
        "Topic": "ASC 830 vs IAS 21 framework comparison",
        "LOSTag": "A.3",
        "VerifiedChecks": [
          "ASC 830-10-20 functional-currency indicators",
          "IAS 21 paragraphs 9-14 indicators"
        ]
      },
      {
        "ItemID": "CBQ22-A3-Q5",
        "Type": "mcq",
        "Prompt": "CFO Mariela Hoffmann asks whether to switch the consolidated reporting currency from USD to a stable third currency (for example, CHF) given ARS volatility. Which is the strongest evaluative basis for retaining the USD presentation currency under ASC 830?",
        "Choices": {
          "A": "The parent's functional currency is USD, and U.S. SEC registrants generally present in the parent's functional currency to align with the domestic capital-markets audience",
          "B": "ASC 830 prohibits any presentation-currency change once a parent elects a reporting currency at incorporation",
          "C": "A presentation-currency change automatically reclassifies all prior AOCI balances to retained earnings without disclosure",
          "D": "Switching to CHF would be required if the Argentine peso is hyperinflationary, regardless of the parent's functional currency"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Under ASC 830-10-45, the presentation currency of a consolidated reporting entity is generally the currency in which the parent entity's books are recorded. For a U.S. SEC registrant whose parent functional currency is USD, presenting in USD provides comparability for U.S. investors, aligns the consolidated statements with the parent's functional currency, and avoids unnecessary translation at the parent level. ASC 830 does not prohibit a presentation-currency change but requires prospective application and disclosure of the change and the rationale under ASC 830-10-45-7 through 45-10. Stability of the presentation currency is desirable, but switching to a third currency solely because one subsidiary's environment is hyperinflationary is generally not supported as the strongest basis.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "ASC 830 does not categorically prohibit a presentation-currency change; a change is permitted with appropriate disclosure and prospective application, not forbidden at incorporation.",
        "ExplanationWrongC": "A presentation-currency change does not automatically reclassify prior AOCI balances to retained earnings; any reclassification depends on the specific standards triggered and the nature of the change, and disclosures are required.",
        "ExplanationWrongD": "Hyperinflationary classification of a single subsidiary's economy does not mandate switching the parent's presentation currency; ASC 830-10-45 addresses hyperinflationary economies by requiring remeasurement of the affected subsidiary, not a parent-level currency change.",
        "Topic": "Presentation currency choice under ASC 830",
        "LOSTag": "A.4",
        "VerifiedChecks": [
          "ASC 830-10-45-7 through 45-10 govern presentation currency",
          "SEC registrants typically present in parent functional currency"
        ]
      },
      {
        "ItemID": "CBQ22-A3-Q6",
        "Type": "mcq",
        "Prompt": "Flash Tech Argentina holds a USD-denominated third-party receivable of ARS 4,200,000. Under ASC 326 (CECL), which combination of inputs most directly influences the allowance for credit losses on this FX-denominated receivable?",
        "Choices": {
          "A": "Probability of default, loss given default, exposure at default, adjusted for expected currency-driven recoverability shortfalls over the contractual life",
          "B": "Only the historical loss rate on peso-denominated receivables, with no adjustment for FX risk",
          "C": "The current ARS/USD spot rate at quarter-end, used to translate the loss and then ignored for forward-looking expectations",
          "D": "Solely the credit rating of the U.S. parent guarantor, ignoring the obligor's own credit profile"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Under ASC 326 (CECL), the allowance for credit losses on a financial asset is measured as the lifetime expected credit loss, generally computed from probability of default, loss given default, and exposure at default, discounted to present value using the effective interest rate. For an FX-denominated receivable, expected recoverability depends on the obligor's ability to pay in USD; expected currency-driven shortfalls (such as ARS devaluation reducing the local-currency equivalent recoverable amount, or capital controls restricting USD outflow) are typically incorporated through reasonable-and-supportable forecasts and scenario adjustments. This integrates market risk with credit risk in the CECL estimate.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "CECL requires a forward-looking, lifetime expected-loss estimate; relying only on historical peso-denominated loss rates without considering FX-driven recoverability would typically underestimate credit losses for an FX-denominated receivable.",
        "ExplanationWrongC": "Using the quarter-end spot rate alone ignores forward-looking expectations required under CECL; ASC 326 explicitly requires consideration of reasonable-and-supportable forecasts over the contractual life.",
        "ExplanationWrongD": "Ignoring the obligor's own credit profile and relying solely on a parent guarantee would typically be insufficient; the obligor's credit risk and the parent's contingent obligation are both relevant inputs under ASC 326.",
        "Topic": "CECL with FX-denominated receivables",
        "LOSTag": "A.4",
        "VerifiedChecks": [
          "ASC 326-20-30 requires lifetime expected credit loss",
          "PD × LGD × EAD framework with forward-looking adjustments"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-F3",
    "Title": "Flash Media: Pending SEC Inquiry and Materiality Under SAB 99",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Apply materiality assessment under SAB 99 / SAB Topic 1.M",
      "Analyze SOX 302/404 disclosure-controls impact on a pending SEC inquiry",
      "Evaluate the controller's recommendation to the audit committee",
      "Apply IMA Credibility, Integrity, and Objectivity principles to disclosure strategy"
    ],
    "PrimaryCompetency": "Conceptual",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Media Group is preparing its Q3 Form 10-Q. Project manager Naomi Castellanos has learned that the SEC's Division of Enforcement has opened a confidential, informal inquiry into the timing of revenue recognition on a single content-licensing contract. The inquiry is non-public, preliminary, and based on the staff's view that a $4.2 million transaction may have been recognized one quarter early; Flash Media's general counsel and outside auditors estimate the potential earnings impact at well under 5% of pre-tax income and well under 1% of revenue. No Wells notice has been issued, no restatement has been requested, and management believes the original accounting was reasonable under ASC 606. The audit committee has asked Naomi to recommend a disclosure strategy. She must weigh (i) preliminary disclosure risks, including market overreaction, possible waiver of privilege, and prejudicing cooperation; against (ii) the IMA Statement of Ethical Professional Practice principles of Credibility, Integrity, and Objectivity, as well as SOX 302/404 disclosure-controls-and-procedures obligations. CFO Mariela Hoffmann has signaled a preference to wait until the inquiry resolves, citing immateriality.",
    "Industry": "Media and Entertainment",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Media",
    "Stakeholder": "Naomi Castellanos, Project Manager",
    "BusinessFunction": "Financial Reporting and Investor Relations",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "SAB 99",
      "materiality",
      "ASC 450-20",
      "SOX 302",
      "SOX 404",
      "IMA Credibility",
      "IMA Integrity"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Apply SAB 99 / SAB Topic 1.M and ASC 450-20 to assess a pending inquiry",
      "Analyze SOX 302/404 disclosure-controls-and-procedures implications",
      "Apply IMA Credibility principle to a disclosure decision",
      "Evaluate tension between IMA Integrity and the corporate risk of premature disclosure"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F3-E1",
        "CaseID": "CBQ22-F3",
        "Type": "table",
        "Title": "Exhibit 1 — Q3 Flash Media Quantitative Context",
        "Description": "Selected financial-statement amounts for the quarter ended September 30, 2026 used to inform a preliminary materiality assessment.",
        "Columns": [
          "Metric",
          "Q3 2026 Amount (USD millions)",
          "Inquiry Implicated Amount (USD millions)"
        ],
        "Rows": [
          [
            "Total revenue",
            "1,180.0",
            "4.2 (single contract)"
          ],
          [
            "Pre-tax income",
            "162.0",
            "4.2 (maximum exposure)"
          ],
          [
            "Net income",
            "121.0",
            "3.1 (after-tax)"
          ],
          [
            "Total assets",
            "3,640.0",
            "—"
          ],
          [
            "Total stockholders' equity",
            "1,205.0",
            "—"
          ],
          [
            "Five-year average pre-tax income",
            "138.0",
            "—"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ22-F3-E2",
        "CaseID": "CBQ22-F3",
        "Type": "table",
        "Title": "Exhibit 2 — Inquiry Status and Disclosure Considerations",
        "Description": "Status of the SEC informal inquiry as of the Q3 reporting cut-off and qualitative factors the controller must weigh.",
        "Columns": [
          "Consideration",
          "Description"
        ],
        "Rows": [
          [
            "Stage of proceeding",
            "Informal, non-public inquiry; no subpoena, no Wells notice, no restatement demand"
          ],
          [
            "Magnitude",
            "Implicated transaction of $4.2M is approximately 2.6% of pre-tax income and 0.36% of revenue"
          ],
          [
            "Mitigation/offset",
            "Comparable contracts in subsequent periods have been accounted for consistently; auditor concurs with current recognition"
          ],
          [
            "Forward-looking risk",
            "Resolution could expand to additional contracts or escalate to formal investigation"
          ],
          [
            "Legal recommendation",
            "Outside counsel recommends narrow, factual disclosure if any, to preserve privilege and cooperation posture"
          ],
          [
            "Internal stakeholders",
            "Audit committee has requested a written recommendation from the controller prior to filing"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F3-Q1",
        "Type": "mcq",
        "Prompt": "Under SAB 99 and SAB Topic 1.M, which of the following is the correct sequence for assessing whether the pending SEC inquiry is material to Flash Media's Q3 Form 10-Q?",
        "Choices": {
          "A": "Compute quantitative thresholds, then overlay qualitative factors such as the inquiry's effect on investor perception and the potential to trigger a restatement",
          "B": "Rely exclusively on a 5% pre-tax income benchmark with no qualitative overlay",
          "C": "Default to materiality whenever the SEC contacts the registrant, regardless of dollar amount",
          "D": "Apply materiality only after the SEC issues a Wells notice, ignoring the inquiry stage"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "SAB 99 (and its successor guidance, SAB Topic 1.M) makes clear that quantitative thresholds alone are not conclusive; registrants must consider both quantitative measures (such as the percentage of pre-tax income, revenue, or equity implicated) and qualitative factors (such as whether the item masks a change in earnings, affects compliance with covenants, or could alter investor perception). The proper sequence is to perform a quantitative screen and then overlay qualitative factors. The SEC's enforcement posture in a particular inquiry is generally not by itself determinative of materiality, although it is a relevant qualitative factor.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "SAB 99 explicitly rejects exclusive reliance on a single quantitative benchmark such as 5% of pre-tax income; qualitative factors must be considered alongside any quantitative threshold.",
        "ExplanationWrongC": "An SEC contact does not by itself establish materiality; SAB Topic 1.M requires a holistic analysis of quantitative and qualitative factors, not a default-to-disclose rule.",
        "ExplanationWrongD": "Waiting for a Wells notice would conflict with the continuous-disclosure obligations under Reg S-K and the qualitative overlay in SAB 99; the stage of proceeding is one input, not a threshold condition for assessing materiality.",
        "Topic": "SAB 99 materiality framework",
        "LOSTag": "F.1",
        "VerifiedChecks": [
          "SAB 99 rejects exclusive reliance on quantitative thresholds",
          "SAB Topic 1.M codifies qualitative overlay"
        ]
      },
      {
        "ItemID": "CBQ22-F3-Q2",
        "Type": "mcq",
        "Prompt": "Under ASC 450-20, when is accrual of a contingent liability required for an SEC inquiry where loss is not yet probable but is reasonably possible and estimable?",
        "Choices": {
          "A": "Accrual is not required when loss is reasonably possible but not probable; disclosure of the contingency is generally required",
          "B": "Accrual is required for any SEC inquiry regardless of probability",
          "C": "Accrual is required only if the loss exceeds 5% of pre-tax income",
          "D": "Accrual is required if the inquiry is reasonably possible, even without a reliable estimate"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under ASC 450-20-25, a loss contingency is accrued only when (i) it is probable that a loss has been incurred and (ii) the loss amount can be reasonably estimated. If the loss is reasonably possible (but not probable), or probable but not estimable, accrual is not permitted; instead, the contingency is disclosed in the footnotes, with a brief description and an estimate of the possible loss or a statement that such an estimate cannot be made. For an SEC inquiry where the staff's view is preliminary and management believes the original accounting is correct, a 'reasonably possible' characterization typically leads to footnote disclosure rather than accrual, with materiality driving the level of detail.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "ASC 450-20 does not require accrual simply because of an SEC inquiry; the probability and estimability thresholds must both be met before accrual is permitted.",
        "ExplanationWrongC": "There is no 5% pre-tax income threshold embedded in ASC 450-20 for accrual of contingent liabilities; materiality and the probability/estimability criteria govern, and the dollar magnitude is one qualitative factor.",
        "ExplanationWrongD": "ASC 450-20 does not require accrual when the loss is reasonably possible but not estimable; the standard specifically prohibits accrual under that condition and instead requires disclosure that an estimate cannot be made.",
        "Topic": "ASC 450-20 contingent liability thresholds",
        "LOSTag": "F.1",
        "VerifiedChecks": [
          "ASC 450-20-25 requires probable + estimable for accrual",
          "Reasonably possible triggers disclosure"
        ]
      },
      {
        "ItemID": "CBQ22-F3-Q3",
        "Type": "mcq",
        "Prompt": "Which statement best describes the interaction between SOX Section 302 (CEO/CFO certifications) and SOX Section 404 (management's assessment of internal control) for an emerging matter such as the SEC inquiry?",
        "Choices": {
          "A": "Both sections are identical and require the same procedures with no incremental duties",
          "B": "SOX 302 requires external auditor attestation of internal controls, while SOX 404 is the management-only certification",
          "C": "Section 302 requires certification that disclosures fairly present the registrant's condition; Section 404 requires evaluation of disclosure controls and internal control over financial reporting, with material changes (including emerging litigation/inquiry) reportable",
          "D": "Neither section requires any evaluation of disclosure controls or internal control over financial reporting"
        },
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Section 302 of the Sarbanes-Oxley Act requires the principal executive and financial officers to certify that the periodic report fairly presents the financial condition and results of operations, that they are responsible for establishing and maintaining disclosure controls and procedures, and that they have evaluated the effectiveness of those controls as of the reporting date. Section 404 requires management to assess, and (for accelerated filers) the external auditor to attest to, the effectiveness of internal control over financial reporting. A material emerging matter such as a pending SEC inquiry falls within the scope of disclosure controls (because it may trigger a misstatement or omission) and may require evaluation of whether ICFR has been compromised.",
        "ExplanationWrongA": "Choice A applies the FCPA books-and-records clause narrowly to entries above $5M materiality, ignoring that the FCPA scope is determined by control intent and reasonable suspicion of corruption, not by dollar threshold; pending SEC inquiries must be assessed for qualitative materiality under SAB 99 regardless of preliminary dollar amount.",
        "ExplanationWrongB": "This reverses the relationship; Section 404 includes external auditor attestation for accelerated filers, while Section 302 is a management-only CEO/CFO certification that does not require external auditor attestation.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "Both sections do require evaluation of disclosure controls and internal control over financial reporting, so neither is silent on these obligations.",
        "Topic": "SOX 302/404 interaction",
        "LOSTag": "F.2",
        "VerifiedChecks": [
          "SOX 302 requires officer certification of fair presentation and disclosure controls",
          "SOX 404 requires management assessment and (for accelerated filers) auditor attestation"
        ]
      },
      {
        "ItemID": "CBQ22-F3-Q4",
        "Type": "mcq",
        "Prompt": "Under the IMA Statement of Ethical Professional Practice, which principle most directly supports Naomi's obligation to communicate the SEC inquiry to the audit committee and to ensure that any 10-Q disclosure reflects the matter fairly?",
        "Choices": {
          "A": "Credibility — members must disclose all information that, if not disclosed, would cause reports or analyses to be misleading",
          "B": "Confidentiality — members must keep information confidential except when disclosure is authorized or legally required",
          "C": "Competence — members must maintain professional expertise at a level needed to ensure employers receive competent service",
          "D": "Integrity — members must abstain from engaging in conduct that would discredit the profession"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "The Credibility principle of the IMA Statement of Ethical Professional Practice requires management accountants to disclose all relevant information that could influence a user's understanding of reports, analyses, or recommendations. In the context of a pending SEC inquiry, withholding information about the inquiry from the audit committee or from investors (when disclosure is required) would cause reports to be misleading and would violate the Credibility principle. Credibility operates alongside Confidentiality (which permits disclosure when authorized or legally required, including to the audit committee) and Integrity (which supports refusing to suppress material information).",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Confidentiality permits disclosure when authorized or legally required; it does not, by itself, support proactive disclosure of the inquiry to the audit committee or to investors, although it sets the conditions under which confidential information may be shared.",
        "ExplanationWrongC": "Competence relates to maintaining professional expertise and is not the principle that most directly supports the duty to communicate a material inquiry to governance.",
        "ExplanationWrongD": "Integrity supports ethical conduct generally but is not the specific principle that addresses disclosure of all relevant information needed to keep reports from being misleading; that is the Credibility principle.",
        "Topic": "IMA Credibility principle applied to governance disclosure",
        "LOSTag": "F.2",
        "VerifiedChecks": [
          "IMA Credibility principle requires disclosure of relevant information",
          "Confidentiality permits but does not mandate it"
        ]
      },
      {
        "ItemID": "CBQ22-F3-Q5",
        "Type": "mcq",
        "Prompt": "Which recommendation to the audit committee best reconciles IMA Credibility and Integrity principles with the corporate risk of premature disclosure of a preliminary SEC inquiry?",
        "Choices": {
          "A": "Disclose the inquiry briefly and factually in the Q3 10-Q legal proceedings and subsequent events sections, using language consistent with outside counsel guidance, while disclosing the matter to the audit committee in writing",
          "B": "Omit all reference to the inquiry because it is non-public and the dollar amount is below 1% of revenue, treating the matter as immaterial under SAB 99",
          "C": "Wait until the SEC issues a Wells notice before any disclosure, citing confidentiality and litigation privilege",
          "D": "Disclose only the existence of the inquiry on social media without updating the legal proceedings disclosure in the 10-Q"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "This response reconciles the principles: it satisfies Credibility (full and fair disclosure of material information) and Integrity (transparent communication with governance) while addressing the corporate risk by (i) keeping the disclosure brief, factual, and consistent with outside counsel guidance to minimize waiver-of-privilege and prejudicing-cooperation risks; (ii) updating the 10-Q's legal-proceedings and subsequent-events sections under ASC 450-20 and Reg S-K Item 103; and (iii) documenting the assessment in writing to the audit committee. SAB 99 requires a qualitative overlay on the quantitative screen, and even a sub-1% revenue item can be qualitatively material if it implicates revenue-recognition integrity, investor confidence, or potential restatement risk.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Omitting the matter solely on a quantitative screen ignores the qualitative factors under SAB 99 (such as the impact on investor perception and the potential to trigger a restatement) and risks a Credibility violation if investors later learn of the inquiry.",
        "ExplanationWrongC": "Waiting for a Wells notice ignores the continuous-disclosure obligation under Reg S-K and the qualitative overlay in SAB 99; this would typically not satisfy Credibility and may itself become a separate disclosure-failure issue.",
        "ExplanationWrongD": "Disclosing on social media without updating the formal 10-Q would not satisfy the periodic-report disclosure obligations under Reg S-K and would create an asymmetrical and selective disclosure that violates Credibility and Reg FD.",
        "Topic": "Disclosure strategy reconciling ethics and risk",
        "LOSTag": "F.3",
        "VerifiedChecks": [
          "SAB 99 requires qualitative overlay",
          "Reg S-K Item 103 governs legal-proceedings disclosure"
        ]
      },
      {
        "ItemID": "CBQ22-F3-Q6",
        "Type": "mcq",
        "Prompt": "CFO Hoffmann prefers to defer disclosure until the inquiry resolves. From the IMA Integrity principle perspective, what is the strongest ethical counter-argument to her position?",
        "Choices": {
          "A": "Withholding a material inquiry suppresses information that could influence investor decisions, violates the duty to communicate relevant information faithfully, and may convert a transparent cooperation posture into an Integrity breach",
          "B": "Investors typically interpret disclosures pessimistically, so any disclosure necessarily harms them",
          "C": "Integrity requires disclosure only after a Wells notice, making deferral appropriate until the SEC escalates",
          "D": "Integrity has no application to disclosure timing; that is solely a legal compliance question"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "The Integrity principle obligates members to 'abstain from engaging in or supporting any activity that might discredit the profession' and to perform their duties with faithfulness and diligence. Withholding a material pending inquiry suppresses information that could affect investor decisions and may itself be characterized as misleading by omission, thereby discrediting both the profession and the registrant. The Integrity principle is broader than legal compliance and operates even where the SEC has not yet issued a Wells notice; it supports timely, faithful communication to governance and to investors when material.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Investors do not always interpret disclosures pessimistically; market reaction varies, and the Integrity principle addresses faithful communication, not the predicted direction of market reaction.",
        "ExplanationWrongC": "Integrity does not condition disclosure on a Wells notice; the principle supports faithful communication whenever the omission would mislead, regardless of the procedural stage of an enforcement matter.",
        "ExplanationWrongD": "Integrity is a behavioral and ethical principle that applies to how disclosure decisions are made, even if the technical Reg S-K and ASC 450-20 questions are simultaneously evaluated; ethical principles and legal compliance are complementary, not mutually exclusive.",
        "Topic": "IMA Integrity tension with deferral preference",
        "LOSTag": "F.3",
        "VerifiedChecks": [
          "IMA Integrity principle supports faithful communication",
          "Deferral in presence of materiality risks ethical breach"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-B3",
    "Title": "Flash Capital: Dividend Policy Change and Residual-Dividend-Model Defense",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Apply the residual-dividend model to compute the dividend under a target payout",
      "Analyze MM dividend-irrelevance and clientele effects of a payout change",
      "Evaluate the choice between a dividend hike and a share repurchase under stable FCF",
      "Evaluate the optimal signaling strategy when raising the dividend"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Capital Corporation is evaluating a proposed change in dividend policy, raising the quarterly dividend from $0.40 per share to $0.55 per share. The company has 50 million shares outstanding, $80 million in projected net income for the fiscal year, a target payout ratio of 60%, projected capital expenditures of $90 million, working-capital needs of $30 million, and a current retained-earnings balance of $340 million. Financial analyst Lena Fischer has prepared a residual-dividend-model analysis and must defend it to the board. CFO Mariela Hoffmann has indicated that free cash flow is expected to remain stable for the next two years, while treasurer Maya Caldwell is exploring a $200 million share-repurchase authorization as an alternative use of excess cash. Lena must address (i) the residual dividend calculation, (ii) dividend-coverage and payout ratios under the new policy, (iii) Modigliani-Miller dividend-irrelevance theory applied to a stable-FCF firm, (iv) clientele effects of a payout change, and (v) the trade-off between a higher dividend and a share repurchase as a signaling device. Lena also notes the company has $120 million of debt coming due in 18 months and must preserve financial flexibility.",
    "Industry": "Diversified Financial Services",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Capital",
    "Stakeholder": "Lena Fischer, Financial Analyst",
    "BusinessFunction": "Corporate Finance and Capital Allocation",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "residual dividend model",
      "payout ratio",
      "MM dividend irrelevance",
      "clientele effect",
      "share repurchase",
      "signaling"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-076",
    "certification_date": "2026-08-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Apply the residual dividend model to compute the dividend",
      "Analyze dividend-coverage ratios and payout targets",
      "Evaluate MM dividend-irrelevance and clientele effects",
      "Evaluate the dividend-versus-repurchase signaling decision"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B3-E1",
        "CaseID": "CBQ22-B3",
        "Type": "table",
        "Title": "Exhibit 1 — Flash Capital Operating and Capital-Allocation Inputs (FY2026)",
        "Description": "Inputs to the residual-dividend model and dividend-coverage analysis.",
        "Columns": [
          "Item",
          "Value",
          "Units"
        ],
        "Rows": [
          [
            "Shares outstanding",
            "50",
            "millions"
          ],
          [
            "Projected net income",
            "80",
            "USD millions"
          ],
          [
            "Target payout ratio",
            "60",
            "percent"
          ],
          [
            "Projected capital expenditures",
            "90",
            "USD millions"
          ],
          [
            "Working-capital needs",
            "30",
            "USD millions"
          ],
          [
            "Current retained earnings balance",
            "340",
            "USD millions"
          ],
          [
            "Proposed quarterly DPS (old / new)",
            "$0.40 / $0.55",
            "USD per share"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ22-B3-E2",
        "CaseID": "CBQ22-B3",
        "Type": "table",
        "Title": "Exhibit 2 — Free Cash Flow and Capital-Structure Context",
        "Description": "Cash flow and balance-sheet context supporting the dividend-versus-repurchase decision.",
        "Columns": [
          "Item",
          "Value",
          "Units / Notes"
        ],
        "Rows": [
          [
            "Operating cash flow (FY2026E)",
            "175",
            "USD millions"
          ],
          [
            "Free cash flow (after capex and WC)",
            "55",
            "USD millions"
          ],
          [
            "Total debt outstanding",
            "620",
            "USD millions"
          ],
          [
            "Debt maturing in 18 months",
            "120",
            "USD millions; refinancing required"
          ],
          [
            "Cash and marketable securities",
            "210",
            "USD millions"
          ],
          [
            "Considered buyback authorization",
            "200",
            "USD millions; alternative to dividend hike"
          ],
          [
            "Beta vs market",
            "1.05",
            "Equity beta used in cost-of-capital estimate"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B3-Q1",
        "Type": "mcq",
        "Prompt": "Under the residual dividend model, with $80M net income, $90M capex, $30M working-capital needs, and a 60% target payout on residual earnings, what is the projected dividend in millions of dollars?",
        "Choices": {
          "A": "Residual earnings = 80 − (90 + 30) = −40; the company should pay no dividend and retain all net income because capex and working capital exceed earnings",
          "B": "Dividend = 0.60 × 80 = 48 because the target payout generally applies to net income",
          "C": "Dividend = 0.60 × (80 − 90) = −6, implying the company pays a negative dividend",
          "D": "Dividend = 0.60 × (80 + 90 + 30) = 120"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under the residual dividend model, the company funds its investment opportunities (capex and working-capital needs) out of retained earnings first, then distributes any residual net income as dividends. Here, net income is $80M, capex is $90M, and working-capital needs are $30M, totaling $120M of investment needs. Because investment needs exceed net income, residual earnings are negative ($80M − $120M = −$40M), and the company should not pay any dividend; instead, it would use external financing or accumulated retained earnings to fund the gap. Applying a fixed 60% payout to net income or to net income plus capex does not reflect the residual model mechanics.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "A fixed 60% payout applied to net income ignores the capex and working-capital needs required by the residual model; that approach describes a stable-payout policy, not the residual dividend model.",
        "ExplanationWrongC": "Subtracting capex only and ignoring working-capital needs understates the total investment requirement and produces a meaningless 'negative dividend'; the residual model includes all profitable investment opportunities, not only capex.",
        "ExplanationWrongD": "Adding capex and working capital to net income before applying the payout ratio is not the residual model; the residual model subtracts investment needs from net income before applying the payout to the residual.",
        "Topic": "Residual dividend model computation",
        "LOSTag": "B.1",
        "VerifiedChecks": [
          "Residual = NI − Capex − WC needs",
          "Negative residual implies no dividend"
        ]
      },
      {
        "ItemID": "CBQ22-B3-Q2",
        "Type": "mcq",
        "Prompt": "If the board approves the dividend hike to $0.55 per share quarterly, what is the implied annualized dividend per share, and what is the dividend-coverage ratio (EPS divided by DPS) assuming projected EPS of $1.60?",
        "Choices": {
          "A": "Annual DPS = $1.65; coverage = $1.60 / $1.65 = 0.97x",
          "B": "Annual DPS = $2.20; coverage = $1.60 / $2.20 = 0.73x, indicating the dividend is not covered by EPS",
          "C": "Annual DPS = $0.55; coverage = $1.60 / $0.55 = 2.91x",
          "D": "Annual DPS = $0.40; coverage = $1.60 / $0.40 = 4.00x"
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "A quarterly DPS of $0.55 implies an annualized DPS of $0.55 × 4 = $2.20. With projected EPS of $1.60, the dividend-coverage ratio is EPS / DPS = $1.60 / $2.20 ≈ 0.73x, meaning earnings would not cover the dividend at projected EPS and the company would have to fund part of the dividend from accumulated retained earnings, cash, or external financing. A coverage ratio below 1.0 is generally a red flag for sustainable payout policy and is one reason the residual dividend model declines to declare a dividend when investment needs exceed earnings.",
        "ExplanationWrongA": "Choice A divides net income by 60% target payout to compute dividends without subtracting capex and working-capital needs; the residual dividend model distributes only what remains AFTER funding positive-NPV investments, so the answer should be lower than the simple target-payout calculation.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Treating $0.55 as the annual DPS (rather than a quarterly figure) understates the actual annualized outflow and inflates the coverage ratio, leading to a misleadingly favorable assessment.",
        "ExplanationWrongD": "$0.40 corresponds to the existing policy, not the proposed hike; using the old DPS in the coverage calculation ignores the board's stated proposal and is therefore not responsive to the question.",
        "Topic": "Dividend coverage ratio computation",
        "LOSTag": "B.1",
        "VerifiedChecks": [
          "Annualized DPS = quarterly × 4",
          "Coverage = EPS / DPS"
        ]
      },
      {
        "ItemID": "CBQ22-B3-Q3",
        "Type": "mcq",
        "Prompt": "Modigliani-Miller dividend-irrelevance theory, with perfect capital markets and no taxes, predicts that for Flash Capital (a stable-FCF firm) the choice between $48M in dividends and an equivalent share repurchase would have what impact on shareholder wealth?",
        "Choices": {
          "A": "Both policies reduce shareholder wealth by an amount equal to the cash returned",
          "B": "No impact on shareholder wealth in aggregate, because shareholders can 'homemake' dividends by selling shares if the company repurchases instead",
          "C": "A dividend is strictly preferred to a repurchase because of the bird-in-hand argument",
          "D": "A repurchase is strictly preferred because it concentrates ownership in remaining holders"
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "In a perfect capital market with no taxes or transaction costs, MM dividend-irrelevance theory predicts that the form of cash distribution (dividend vs share repurchase) does not change shareholder wealth in aggregate. Shareholders who prefer cash can 'homemake' dividends by selling a proportional number of shares if the company repurchases instead, and shareholders who prefer capital appreciation can reinvest cash dividends in additional shares. The argument relies on the ability of shareholders to substitute at the margin, and it explains why repurchases and dividends are largely equivalent in well-functioning markets.",
        "ExplanationWrongA": "Choice A applies the residual dividend model as if retained-earnings carryover fully offsets new funding needs; under residual policy, retained earnings are NOT earmarked for dividend cushion, and new investment funding must be sourced from current-period net income before any distribution is calculated.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The 'bird-in-hand' argument (Gordon) is an alternative theory that prefers dividends because of perceived lower risk; it is not the MM prediction in perfect markets.",
        "ExplanationWrongD": "A repurchase does not automatically outperform a dividend under MM; the two are equivalent in perfect markets, and any preference for repurchase is driven by tax, signaling, or clientele considerations, not by the MM irrelevance proposition itself.",
        "Topic": "MM dividend-irrelevance theory application",
        "LOSTag": "B.2",
        "VerifiedChecks": [
          "MM irrelevance holds in perfect markets with no taxes",
          "Shareholders can homemadeividends via share sales"
        ]
      },
      {
        "ItemID": "CBQ22-B3-Q4",
        "Type": "mcq",
        "Prompt": "Which clientele-effect argument best explains why Flash Capital's institutional shareholders, many of whom are tax-exempt retirement funds, might prefer a share repurchase over a higher cash dividend?",
        "Choices": {
          "A": "Tax-exempt investors generally prefer dividends because dividends are more predictable",
          "B": "Tax-exempt investors are indifferent to dividend tax treatment and may prefer a repurchase because they can redeploy the cash received for selling shares without taking on a taxable dividend they do not need",
          "C": "Tax-exempt investors prefer share repurchases only when the company is in financial distress",
          "D": "Clientele effects do not exist for institutional investors because they all behave the same way"
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Clientele-effect theory holds that different investor groups sort themselves into companies whose payout policies suit their tax situations and cash-flow preferences. Tax-exempt investors (such as pension funds and endowments) generally prefer to defer taxes on capital gains and may find a share repurchase more flexible because they can choose whether to tender shares for cash or remain invested, and because there is no taxable dividend event when they do not tender. By contrast, taxable investors in high tax brackets who prefer current income may prefer dividends. The clientele-effect framework therefore predicts heterogeneous responses to a dividend hike.",
        "ExplanationWrongA": "Choice A argues that the dividend hike provides a stable income signal to dividend clientele; MM dividend irrelevance holds in perfect markets and is generally preserved with reasonable assumptions, but the strength of any signaling effect depends on market frictions and the firm's actual FCF stability.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Clientele effects arise in normal capital-market conditions, not solely in distress; share-repurchase clienteles include tax-exempt investors and employees with equity compensation who want flexibility.",
        "ExplanationWrongD": "Clientele effects exist precisely because institutional investors behave differently based on tax status, mandate, and liability matching; assuming identical behavior eliminates the heterogeneity that drives the clientele literature.",
        "Topic": "Clientele effects of payout change",
        "LOSTag": "B.2",
        "VerifiedChecks": [
          "Clientele effects depend on tax status",
          "Tax-exempt investors often prefer flexibility of repurchases"
        ]
      },
      {
        "ItemID": "CBQ22-B3-Q5",
        "Type": "mcq",
        "Prompt": "Given stable free cash flow of $55M, $120M of debt maturing in 18 months, $210M in cash and marketable securities, and a proposed $200M buyback authorization, which capital-return policy best preserves financial flexibility while supporting shareholder value?",
        "Choices": {
          "A": "Approve the full hike to $0.55 quarterly and execute the $200M buyback simultaneously to maximize immediate signaling",
          "B": "Approve a moderate dividend hike (e.g., to $0.45–$0.50 quarterly) sufficient to retain dividend-paying signaling benefits, defer the larger buyback, and pre-fund the maturing debt with a portion of cash and securities",
          "C": "Suspend the dividend and use all cash to repurchase shares",
          "D": "Maintain the dividend at $0.40 quarterly with no buyback and no debt pre-funding"
        },
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "A balanced approach preserves flexibility: a moderate dividend hike (less than the proposed $0.55, e.g., $0.45–$0.50 quarterly) captures some signaling benefit while reducing the cash drain, and pre-funding the $120M of maturing debt with a portion of the $210M cash and marketable securities reduces refinancing risk. Deferring the larger $200M buyback avoids overcommitting cash at a moment when debt rollover is the binding constraint and free cash flow is only $55M. This sequencing is consistent with pecking-order and financial-flexibility considerations, while still rewarding shareholders.",
        "ExplanationWrongA": "Choice A argues against the dividend hike on the basis that residual-EPS dilution is automatic; under residual dividend policy, dividends are funded from residual earnings so per-share dilution occurs only when new shares are issued for projects that exceed available internal financing, not from the dividend itself.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Suspending the dividend and redeploying all cash into buybacks would eliminate the dividend clientele and the signaling benefit of a stable payout, and would not necessarily improve total return relative to a more balanced policy.",
        "ExplanationWrongD": "Maintaining the dividend at $0.40 with no debt pre-funding ignores the imminent refinancing need; static policy is typically suboptimal when the capital structure and market signals are shifting.",
        "Topic": "Capital-return policy under financial-flexibility constraint",
        "LOSTag": "B.3",
        "VerifiedChecks": [
          "FCF $55M does not cover full hike + $200M buyback",
          "Pre-funding $120M maturity preserves refinancing flexibility"
        ]
      },
      {
        "ItemID": "CBQ22-B3-Q6",
        "Type": "mcq",
        "Prompt": "From a signaling perspective, which statement best characterizes the announcement effect of a sustainable dividend hike versus a share repurchase for Flash Capital?",
        "Choices": {
          "A": "Dividend hikes are typically perceived as more credible long-term commitments because management is reluctant to cut them, while repurchases are more flexible but signal less commitment; both can be credible signals if supported by FCF",
          "B": "Dividend hikes are generally negative signals because they imply management has no positive-NPV projects",
          "C": "Repurchases are typically negative signals because they suggest management believes its own shares are overvalued",
          "D": "Neither dividend hikes nor repurchases convey any information under strong-form market efficiency"
        },
        "CorrectChoice": "A",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Under the dividend-signaling literature (e.g., Bhattacharya, Miller-Rock), dividend hikes are typically interpreted as credible long-term commitments because managers are reluctant to cut dividends once raised; the implied cost of a future cut (in terms of reputation and stock price) gives the signal credibility. Repurchases are more flexible (they can be paused or sized down without the stigma of a 'dividend cut') and therefore can also be credible signals, especially when supported by stable FCF and balance-sheet capacity. In practice, both mechanisms can convey information about management's confidence in future cash flows, with relative credibility depending on the firm's financial flexibility and history of dividend stability.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Choice B applies the payout ratio to net income without subtracting capex requirements; the correct residual dividend calculation begins with NI minus capex minus working-capital needs, with target payout applied only to the residual (or zero if NI < project funding requirement).",
        "ExplanationWrongC": "Repurchases are not typically negative signals; announcement effects of repurchases are typically positive on average, though the magnitude and interpretation depend on the financing source (cash vs debt) and the firm's investment opportunities.",
        "ExplanationWrongD": "Strong-form market efficiency is generally rejected empirically, and even semi-strong-form efficiency does not preclude signaling effects; information conveyed through payout announcements can produce abnormal returns, contradicting the no-information prediction.",
        "Topic": "Signaling effects of dividend hike vs buyback",
        "LOSTag": "B.3",
        "VerifiedChecks": [
          "Dividend hikes are credible due to reluctance to cut",
          "Repurchases are flexible but credible when supported by FCF"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-B4",
    "Title": "Capital Structure and the Growth-Funding Choice at Meridian Technologies",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Calculate cost of capital — WACC and component costs (B.2)",
      "Evaluate capital structure and optimal leverage (B.3)",
      "Manage working capital — cash conversion cycle (B.4)"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 34,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Meridian Technologies' growth plan will strain its balance sheet as a new router platform enters pilot production. Treasurer Alicia Gomez has been asked by the CFO to quantify the current cost of capital, locate the marginal-cost break point in the investment schedule, and diagnose the cash conversion cycle before recommending how the expansion should be funded.",
    "Industry": "Technology hardware",
    "CompanyType": "Manufacturer",
    "CompanyName": "Meridian Technologies",
    "Stakeholder": "Treasurer Alicia Gomez",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "WACC",
      "CAPM",
      "marginal cost of capital",
      "CCC",
      "trade-off theory"
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
      "Compute cost of equity via CAPM and after-tax cost of debt",
      "Compute WACC with market-value weights and the IOS break point",
      "Compute and interpret the cash conversion cycle and its financing gap",
      "Evaluate leverage trade-offs under trade-off and pecking-order theory"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B4-E1",
        "CaseID": "CBQ22-B4",
        "Type": "table",
        "Title": "Exhibit 1 — Cost-of-Capital Inputs",
        "Purpose": "Provides CAPM components, debt cost, tax rate, market-value weights, retained earnings, and flotation-adjusted equity cost for WACC and break-point computations.",
        "ReferencedBy": [
          "CBQ22-B4-Q1",
          "CBQ22-B4-Q2",
          "CBQ22-B4-Q3",
          "CBQ22-B4-Q6"
        ],
        "Headers": [
          "Input",
          "Value"
        ],
        "Rows": [
          [
            "Risk-free rate (10-yr Treasury)",
            "4.0%"
          ],
          [
            "Beta (levered, vs S&P 500)",
            "1.25"
          ],
          [
            "Market risk premium (Rm - Rf)",
            "5.5%"
          ],
          [
            "Pre-tax cost of debt (YTM, 7-yr bonds)",
            "8.0%"
          ],
          [
            "Marginal tax rate",
            "25%"
          ],
          [
            "Market value of debt",
            "$180 million"
          ],
          [
            "Market value of equity",
            "$420 million"
          ],
          [
            "Retained earnings available before external equity",
            "$14.0 million"
          ],
          [
            "Cost of new common equity (incl. flotation)",
            "11.8%"
          ]
        ],
        "DataFormat": "Rates in percent; market values in USD millions; tax rate marginal",
        "AccuracyCheck": "Total capital $600M = 180 + 420; D/V=30% E/V=70%; after-tax debt = 8%*(1-0.25)=6.00%"
      },
      {
        "ExhibitID": "CBQ22-B4-E2",
        "CaseID": "CBQ22-B4",
        "Type": "table",
        "Title": "Exhibit 2 — Working-Capital Operating Data (Annualized Run-Rate)",
        "Purpose": "Provides sales, COGS, average working-capital balances, and purchases for DIO, DSO, DPO, and CCC computation.",
        "ReferencedBy": [
          "CBQ22-B4-Q4",
          "CBQ22-B4-Q5",
          "CBQ22-B4-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net sales (annualized)",
            "$146.0 million"
          ],
          [
            "Cost of goods sold (annualized)",
            "$109.5 million"
          ],
          [
            "Average inventory",
            "$18.0 million"
          ],
          [
            "Average accounts receivable",
            "$20.0 million"
          ],
          [
            "Average accounts payable",
            "$12.0 million"
          ],
          [
            "Purchases (annualized)",
            "$109.5 million"
          ]
        ],
        "DataFormat": "USD millions; 365-day year convention",
        "AccuracyCheck": "DIO=18/109.5*365=60.0; DSO=20/146*365=50.0; DPO=12/109.5*365=40.0; CCC=70.0; WC tied=18+20-12=26.0M"
      },
      {
        "ExhibitID": "CBQ22-B4-E3",
        "CaseID": "CBQ22-B4",
        "Type": "table",
        "Title": "Exhibit 3 — Investment Opportunity Schedule",
        "Purpose": "Provides the four competing projects and the two WACC tiers created by the retained-earnings break point.",
        "ReferencedBy": [
          "CBQ22-B4-Q3",
          "CBQ22-B4-Q5",
          "CBQ22-B4-Q6"
        ],
        "Headers": [
          "Project",
          "Investment",
          "IRR"
        ],
        "Rows": [
          [
            "A — New router platform expansion",
            "$8.0 million",
            "12.0%"
          ],
          [
            "B — Firmware automation suite",
            "$7.0 million",
            "11.0%"
          ],
          [
            "C — Supply-chain control tower",
            "$6.0 million",
            "10.0%"
          ],
          [
            "D — Asia distribution hub",
            "$10.0 million",
            "9.2%"
          ],
          [
            "WACC (retained earnings, up to break)",
            "—",
            "9.41%"
          ],
          [
            "WACC (new equity, beyond break)",
            "—",
            "10.06%"
          ]
        ],
        "DataFormat": "Investments in USD millions; IRR and WACC in percent",
        "AccuracyCheck": "Break =14.0/0.70=20.0M; A+B=15.0M within break; A+B+C=21.0M exceeds break; new WACC =0.30*6.00%+0.70*11.8%=10.06%"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B4-Q1",
        "Type": "numeric",
        "Prompt": "Enter Meridian's cost of common equity via CAPM, in percent rounded to two decimals (e.g., 10.88 for 10.88%).",
        "Correct": "10.88",
        "Explanation": "CAPM Re = Rf + beta*(Rm - Rf) = 4.0% + 1.25*5.5% = 10.875% rounded to 10.88%. This compensates only systematic risk. Adding full Rm instead of premium overstates Re. For Meridian, 10.88% is the retained-earnings hurdle before flotation.",
        "Topic": "Cost of common equity — CAPM",
        "Subtopic": "Systematic risk premium",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-04: Capital Asset Pricing Model",
        "CommonTrapReference": "Using Rm alone instead of (Rm - Rf).",
        "DecisionTreeReference": "Cost of capital — equity via CAPM",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "CAPM"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B4-Q2",
        "Type": "numeric",
        "Prompt": "Enter Meridian's WACC using retained earnings (before the break), in percent rounded to two decimals.",
        "Correct": "9.41",
        "Explanation": "WACC = (E/V)*Re + (D/V)*Rd*(1-t) = 0.70*10.875% + 0.30*6.00% = 9.4125% rounded to 9.41%. Market values must be used, not book values. Using pre-tax debt overstates WACC to 10.02%.",
        "Topic": "Weighted average cost of capital",
        "Subtopic": "Market-value weights",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-05: WACC",
        "CommonTrapReference": "Using pre-tax cost of debt or book weights.",
        "DecisionTreeReference": "WACC construction",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "WACC"
        ],
        "Dependencies": [
          "CBQ22-B4-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-B4-Q3",
        "Type": "select",
        "Prompt": "Which statement correctly locates the marginal-cost break and ranks the IOS projects?",
        "Correct": "B",
        "Choices": [
          "The break occurs at $14.0 million; accept A, B, and C since all exceed 9.41%",
          "The break occurs at $20.0 million; beyond the break WACC rises to 10.06%, so only A (12.0%) and B (11.0%) clear their marginal hurdle — C at 10.0% falls below 10.06% and D fails either hurdle",
          "The break occurs at $46.7 million; accept all four",
          "No break exists; evaluate every project at 9.41%"
        ],
        "Explanation": "Break = Retained earnings / E/V = 14.0/0.70 = $20.0M. Up to $20M hurdle is 9.41%; beyond, Re rises to 11.8% so WACC = 0.30*6%+0.70*11.8%=10.06%. A+B=$15M inside break both clear; C pushes to $21M and must clear 10.06% but 10.0% does not.",
        "Topic": "Marginal cost of capital",
        "Subtopic": "Break-point and IOS ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-05; CB-07",
        "CommonTrapReference": "Evaluating all projects at pre-break WACC.",
        "DecisionTreeReference": "MCC/IOS crossover",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "MCC"
        ],
        "Dependencies": [
          "CBQ22-B4-Q2"
        ]
      },
      {
        "ItemID": "CBQ22-B4-Q4",
        "Type": "select",
        "Prompt": "What does the working-capital data imply for Meridian's funding gap?",
        "Correct": "A",
        "Choices": [
          "CCC is 70.0 days (60.0 + 50.0 - 40.0), tying $26.0M; DSO and DIO lengthen the cycle while DPO only partially offsets",
          "CCC is 150.0 days — sum of DIO, DSO, DPO without netting payables",
          "CCC is 30.0 days and requires no external financing",
          "CCC is 10.0 days and driven solely by payables"
        ],
        "Explanation": "CCC = DIO+DSO-DPO = 60+50-40=70.0 days. Dollar tie-up = 18+20-12=26.0M, or 70 days of $146M sales. Choices B/D add DPO instead of subtracting.",
        "Topic": "Cash conversion cycle",
        "Subtopic": "Financing gap",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-10: CCC",
        "CommonTrapReference": "Adding DPO instead of subtracting.",
        "DecisionTreeReference": "Working-capital diagnosis",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "CCC"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B4-Q5",
        "Type": "multi",
        "Prompt": "Which two statements correctly frame Meridian's capital-structure decision under trade-off and pecking-order theory? (Select two.)",
        "Correct": [
          "The trade-off is the present value of the debt tax shield (Rd*t*D) versus the present value of expected financial distress and agency costs; optimum where marginal shield equals marginal distress cost",
          "At 30% market debt, Meridian likely retains debt capacity if operating risk is moderate — adding debt up to the optimum lowers WACC while the marginal shield still exceeds marginal distress cost"
        ],
        "Choices": [
          "The trade-off is the present value of the debt tax shield (Rd*t*D) versus the present value of expected financial distress and agency costs; optimum where marginal shield equals marginal distress cost",
          "At 30% market debt, Meridian likely retains debt capacity if operating risk is moderate — adding debt up to the optimum lowers WACC while the marginal shield still exceeds marginal distress cost",
          "More debt always lowers WACC because debt is cheaper than equity, so Meridian should lever to the maximum the bank will allow",
          "Pecking order predicts Meridian will issue new external equity before using retained earnings because external equity has the lowest information cost",
          "CCC improvements are unrelated to capital structure — a 70-day cycle never affects how much debt or equity Meridian must raise"
        ],
        "Explanation": "Trade-off theory: optimum where marginal shield equals marginal distress cost. At 30% debt Meridian is conservatively levered, so moderate added debt still adds value. Pecking order ranks retained earnings first, then debt, then external equity last — reverse of choice D. Choice C confuses component cost with WACC. Choice E is false — CCC tie-up directly raises total funding requirement.",
        "Topic": "Optimal leverage and financing hierarchy",
        "Subtopic": "Trade-off vs pecking order",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "CB-05; CB-07",
        "CommonTrapReference": "Assuming more debt always lowers WACC or inverting pecking order.",
        "DecisionTreeReference": "Capital structure — optimum and hierarchy",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "trade-off",
          "pecking order"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B4-Q6",
        "Type": "match",
        "Prompt": "Match each corporate-finance concept to its Meridian fact.",
        "Correct": {
          "CAPM equity cost driver": "Beta x market risk premium — systematic risk only",
          "WACC weight error to avoid": "Using book values instead of market values (180/600 and 420/600)",
          "CCC improvement lever": "Collect receivables faster or carry leaner inventory — DSO/DIO down, DPO discipline",
          "MCC break-point trigger": "Exhaustion of $14M retained earnings at 70% equity — $20M total capital"
        },
        "LeftItems": [
          "CAPM equity cost driver",
          "WACC weight error to avoid",
          "CCC improvement lever",
          "MCC break-point trigger"
        ],
        "RightItems": [
          "Beta x market risk premium — systematic risk only",
          "Collect receivables faster or carry leaner inventory — DSO/DIO down, DPO discipline",
          "Exhaustion of $14M retained earnings at 70% equity — $20M total capital",
          "Using book values instead of market values (180/600 and 420/600)"
        ],
        "Explanation": "CAPM prices only systematic risk via beta times premium. WACC must be market-weighted. CCC shortened via DSO/DIO. MCC steps when $14M retained earnings at 70% weight exhausted at $20M total capital.",
        "Topic": "Concept-to-fact mapping",
        "Subtopic": "CAPM/WACC/CCC/MCC integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "CB-04; CB-05; CB-10",
        "CommonTrapReference": "Matching total risk to CAPM or adding DPO.",
        "DecisionTreeReference": "Integrated corporate finance",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-D4",
    "Title": "Enterprise Risk Heat Map and the Launch Decision at Valmont Energy",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Apply COSO ERM framework (D.1)",
      "Evaluate risk appetite, tolerance, capacity (D.3)",
      "Analyze risk response strategies (D.4)"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Valmont Energy's risk committee meets next week to approve a high-visibility compressor launch in the Permian. CRO Daniel Whitaker must score the top five enterprise risks, test them against the board's appetite, tolerance, and capacity bands, and defend which reduce, share, avoid, or accept responses to fund.",
    "Industry": "Energy services",
    "CompanyType": "Service provider",
    "CompanyName": "Valmont Energy",
    "Stakeholder": "CRO Daniel Whitaker",
    "BusinessFunction": "Risk management / Internal audit",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "COSO ERM 2017",
      "heat map",
      "risk appetite",
      "risk response",
      "residual risk",
      "KRI"
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
      "Score risks via Likelihood x Severity and expected loss, and interpret the heat map",
      "Distinguish risk appetite, tolerance, and capacity and apply KRI thresholds",
      "Recommend reduce/share/avoid/accept responses and quantify residual risk",
      "Incorporate correlation and portfolio view into the launch decision"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D4-E1",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 1 — Enterprise Risk Register (Annual Basis)",
        "Purpose": "Provides likelihood and severity ratings, impact, and probability for risk-score and expected-loss computation.",
        "ReferencedBy": [
          "CBQ22-D4-Q1",
          "CBQ22-D4-Q2",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Risk",
          "Likelihood (1-5)",
          "Severity (1-5)",
          "Impact if Realized",
          "Annual Probability"
        ],
        "Rows": [
          [
            "R1 — Midstream pipeline release",
            "3",
            "5",
            "$6,000,000",
            "8%"
          ],
          [
            "R2 — Commodity price collapse",
            "4",
            "4",
            "$3,000,000",
            "15%"
          ],
          [
            "R3 — Contractor safety fatality",
            "4",
            "5",
            "$4,000,000",
            "10%"
          ],
          [
            "R4 — SCADA cyber breach",
            "2",
            "5",
            "$8,000,000",
            "5%"
          ],
          [
            "R5 — Permit & regulatory delay",
            "3",
            "3",
            "$1,500,000",
            "20%"
          ]
        ],
        "DataFormat": "Likelihood/Severity 1=rare/minor to 5=almost certain/catastrophic; impact USD; probability annual",
        "AccuracyCheck": "EL = Prob*Impact = 480k,450k,400k,400k,300k; R3 highest EL differs from heat map score"
      },
      {
        "ExhibitID": "CBQ22-D4-E2",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 2 — Board Risk Appetite, Tolerance, and Capacity",
        "Purpose": "Defines the three board-level risk boundaries and KRI thresholds.",
        "ReferencedBy": [
          "CBQ22-D4-Q3",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Concept",
          "Board Threshold",
          "Operational Use"
        ],
        "Rows": [
          [
            "Risk appetite — residual expected loss per event class",
            "≤ $300,000 per year (post-controls)",
            "Desired residual; guides strategy and the Permian launch go/no-go"
          ],
          [
            "Risk tolerance — KRI band around appetite",
            "Amber at $300,000; red at $350,000",
            "Amber = management action; red = committee escalation required"
          ],
          [
            "Risk capacity — aggregate risk capital",
            "$8,000,000 aggregate EL + tail capital",
            "Hard ceiling before covenant/solvency breach; portfolio must remain well below"
          ],
          [
            "Correlation note",
            "Price collapse and permit delay +0.40",
            "Portfolio volatility exceeds sum of isolates"
          ]
        ],
        "DataFormat": "USD annual expected loss; correlation coefficient",
        "AccuracyCheck": "Appetite < tolerance < capacity by design"
      },
      {
        "ExhibitID": "CBQ22-D4-E3",
        "CaseID": "CBQ22-D4",
        "Type": "table",
        "Title": "Exhibit 3 — Candidate Responses and KRI Triggers",
        "Purpose": "Provides cost, effect, COSO response class, and residual risk for funding decision.",
        "ReferencedBy": [
          "CBQ22-D4-Q2",
          "CBQ22-D4-Q4",
          "CBQ22-D4-Q5",
          "CBQ22-D4-Q6"
        ],
        "Headers": [
          "Response",
          "Annual Cost",
          "Effect",
          "COSO Class / KRI"
        ],
        "Rows": [
          [
            "Enhanced contractor controls + supervision (R3)",
            "$55,000",
            "R3 probability 10%→4%; impact $4M unchanged; residual EL $160,000",
            "Reduce (likelihood); KRI: recordable-incident rate"
          ],
          [
            "Excess liability & cyber transfer program",
            "$85,000",
            "Transfers losses >$1.0M to insurer; retains first $1M; likelihood unchanged",
            "Share (transfer severity above retention)"
          ],
          [
            "Exit Permian contractor corridor (R3 avoidance)",
            "Prohibitive — shuts 30% throughput",
            "Eliminates R3 class entirely",
            "Avoid — not viable"
          ],
          [
            "Accept R5 with contingency reserve + KRI watch",
            "$15,000 reserve",
            "Accepts R5 at $300,000 within appetite",
            "Accept with contingency; KRI: permit-days-delay"
          ]
        ],
        "DataFormat": "USD; probabilities post-response as stated",
        "AccuracyCheck": "Residual R3 EL=0.04*4,000,000=160,000 within appetite"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D4-Q1",
        "Type": "numeric",
        "Prompt": "Enter the risk score (Likelihood x Severity) for R3 — Contractor safety fatality.",
        "Correct": "20",
        "Explanation": "Under COSO ERM Performance Principle 10, risk severity is Likelihood x Severity = 4*5=20, the highest on the heat map and the only risk in the red zone. Adding would understate compounding (4+5=9 vs 20). For Whitaker, a 20 mandates first funding priority.",
        "Topic": "Risk score and heat-map ranking",
        "Subtopic": "Likelihood x Severity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02: Risk Score = Likelihood x Severity",
        "CommonTrapReference": "Adding likelihood and severity instead of multiplying.",
        "DecisionTreeReference": "COSO ERM Performance — risk assessment",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q2",
        "Type": "numeric",
        "Prompt": "Enter the residual annual expected loss for R3 after the enhanced contractor controls in Exhibit 3, in dollars.",
        "Correct": "160000",
        "Explanation": "Expected loss = Probability x Impact = 0.04*4,000,000= $160,000, now inside the board's $300,000 appetite. The $55,000 program cost is not part of EL — compared to $240,000 EL avoided for $185,000 net benefit. Assuming controls also reduce impact is the classic error.",
        "Topic": "Residual expected loss after mitigation",
        "Subtopic": "Probability reduction",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01: Expected Loss; RM-03: Residual Risk",
        "CommonTrapReference": "Assuming controls reduce impact; adding program cost into EL.",
        "DecisionTreeReference": "COSO ERM — inherent vs residual",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q3",
        "Type": "select",
        "Prompt": "Which statement correctly distinguishes the three board boundaries in Exhibit 2?",
        "Correct": "C",
        "Choices": [
          "Appetite at $300,000 is the hard ceiling; tolerance is meaningless and capacity equals appetite — any risk above $300,000 must be avoided outright",
          "Capacity at $8 million is the board's willingness per event class; appetite at $300,000 is the absolute maximum the firm can bear",
          "Appetite (≤$300,000 residual per event class per year) is the board's desired willingness that guides strategy; tolerance ($300,000 amber to $350,000 red) is the acceptable operating band before escalation; capacity ($8,000,000 aggregate) is the maximum the firm can bear before solvency or covenant breach — Valmont must keep each class ≤$300,000 and the portfolio well below $8M",
          "All three terms — appetite, tolerance, capacity — mean the same thing and can be used interchangeably when setting KRIs"
        ],
        "Explanation": "COSO ERM distinguishes appetite (willingness guiding strategy), tolerance (acceptable variation around appetite triggering action), and capacity (maximum absorbable before objectives fail). Exhibit 2 translates: $300k willingness, $300–350k variance band, $8M hard capital constraint.",
        "Topic": "Risk appetite vs tolerance vs capacity",
        "Subtopic": "Board boundary hierarchy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017 — Strategy & Performance",
        "CommonTrapReference": "Treating appetite as hard maximum.",
        "DecisionTreeReference": "Risk appetite statement",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "appetite"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q4",
        "Type": "select",
        "Prompt": "Classify the four candidate responses in Exhibit 3 within the COSO response taxonomy.",
        "Correct": "C",
        "Choices": [
          "Enhanced controls = Share; transfer program = Reduce; exiting the corridor = Accept; contingency reserve = Avoid",
          "All four responses are 'Reduce' because they all lower residual risk",
          "Enhanced controls = Reduce (lowers likelihood), transfer program = Share (transfers severity above $1M retention), exiting the corridor = Avoid (eliminates the event class), contingency reserve = Accept (retains the $300,000 R5 profile with a buffer)",
          "Transfer program = Avoid because insurance eliminates the cyber risk entirely"
        ],
        "Explanation": "COSO Principle 13: avoid (exit activity), reduce (lower likelihood/impact), share (transfer portion), accept (retain within appetite). Enhanced supervision changes frequency — reduce. Insurance moves severity above $1M to carrier — share. Exiting throughput removes class — avoid. Accepting R5 with reserve is textbook accept with contingency.",
        "Topic": "Risk response strategies",
        "Subtopic": "Reduce/share/avoid/accept",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017 — Performance, Principle 13",
        "CommonTrapReference": "Labeling insurance as risk reduction.",
        "DecisionTreeReference": "Risk response decision",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D4-Q5",
        "Type": "multi",
        "Prompt": "Which three risks have a residual (or inherent, where no effective mitigation is proposed) expected loss that exceeds the board's $300,000 appetite and therefore require escalation or funded reduction before the launch is approved? (Select three.)",
        "Correct": [
          "R1 — Midstream pipeline release at $480,000 expected loss",
          "R2 — Commodity price collapse at $450,000 expected loss",
          "R4 — SCADA cyber breach at $400,000 expected loss"
        ],
        "Choices": [
          "R1 — Midstream pipeline release at $480,000 expected loss",
          "R2 — Commodity price collapse at $450,000 expected loss",
          "R4 — SCADA cyber breach at $400,000 expected loss",
          "R3 residual at $160,000 after enhanced controls — within appetite, monitor via recordable-incident KRI",
          "R5 — Permit & regulatory delay at $300,000 — at appetite, no escalation unless tolerance is breached"
        ],
        "Explanation": "Appetite test is residual EL ≤ $300k per class. Inherent ELs are R1 480k, R2 450k, R4 400k — all exceed appetite requiring funded action. R3 at 400k inherent would breach, but controls cut residual to 160k which clears appetite. R5 at 300k sits exactly at appetite — acceptable with contingency, escalate only if $350k red crossed. Correlation (+0.40 between R2/R5) argues for escalating R2.",
        "Topic": "Appetite breach and escalation",
        "Subtopic": "Residual vs inherent",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "RM-01; RM-03",
        "CommonTrapReference": "Testing inherent EL for R3 instead of residual.",
        "DecisionTreeReference": "Escalation — appetite threshold",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "appetite breach"
        ],
        "Dependencies": [
          "CBQ22-D4-Q2"
        ]
      },
      {
        "ItemID": "CBQ22-D4-Q6",
        "Type": "match",
        "Prompt": "Match each COSO ERM 2017 component to its Valmont activity.",
        "Correct": {
          "Governance & Culture": "Board sets $300,000 appetite and Tone at the Top for Permian launch",
          "Strategy & Objective-Setting": "Appetite vs $8M capacity trade-off and correlation-aware launch approval",
          "Performance — Assesses Severity": "Heat map Likelihood x Severity and expected-loss ranking (R3=20, R1 $480k)",
          "Review & Revision": "KRI breach beyond $350,000 red line triggers response reassessment"
        },
        "LeftItems": [
          "Governance & Culture",
          "Strategy & Objective-Setting",
          "Performance — Assesses Severity",
          "Review & Revision"
        ],
        "RightItems": [
          "Board sets $300,000 appetite and Tone at the Top for Permian launch",
          "Heat map Likelihood x Severity and expected-loss ranking (R3=20, R1 $480k)",
          "KRI breach beyond $350,000 red line triggers response reassessment",
          "Appetite vs $8M capacity trade-off and correlation-aware launch approval"
        ],
        "Explanation": "COSO ERM: Governance & Culture establishes appetite/tone; Strategy aligns appetite with capacity including correlation; Performance assesses severity via heat-map and dollar EL; Review & Revision requires KRI breaches loop back to reassess responses.",
        "Topic": "COSO ERM 2017 framework",
        "Subtopic": "Component mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "COSO ERM 2017",
        "CommonTrapReference": "Assigning heat-map scoring to Governance.",
        "DecisionTreeReference": "COSO ERM framework",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "COSO ERM"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-E2",
    "Title": "Automation Investment: Unequal Lives and Real Options at Harborview Packaging",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Calculate capital budgeting methods — NPV, IRR, payback, PI (E.1)",
      "Evaluate mutually exclusive projects with unequal lives — EAA (E.4)",
      "Define and value real options — abandonment/timing (E.5)"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Harborview Packaging's capital committee has two competing automation proposals with unequal lives and an early-abandonment feature on the shorter project. Controller Sam Okonkwo must build the after-tax cash flows, compare the projects on an equivalent-annual basis, and value the abandonment option before recommending a vendor to the board.",
    "Industry": "Packaging manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Harborview Packaging",
    "Stakeholder": "Controller Sam Okonkwo",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "NPV",
      "EAA",
      "MACRS",
      "discounted payback",
      "abandonment option",
      "unequal lives"
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
      "Build after-tax cash flows with MACRS tax shields and after-tax salvage",
      "Compute NPV and EAA to rank mutually exclusive projects with unequal lives",
      "Compute discounted payback and value an abandonment real option",
      "Identify the dominant sensitivity driver and relevant vs irrelevant cash flows"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E2-E1",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 1 — Automation Proposals and Key Assumptions",
        "Purpose": "Provides capex, operating savings, lives, salvage, tax rate, WACC, and the Beta abandonment alternative.",
        "ReferencedBy": [
          "CBQ22-E2-Q1",
          "CBQ22-E2-Q2",
          "CBQ22-E2-Q3",
          "CBQ22-E2-Q4",
          "CBQ22-E2-Q5"
        ],
        "Headers": [
          "Assumption",
          "Alpha (4-yr line)",
          "Beta (3-yr cell)"
        ],
        "Rows": [
          [
            "Initial investment (t=0)",
            "$1,200,000",
            "$900,000"
          ],
          [
            "Annual pre-tax operating savings (before depreciation)",
            "$520,000",
            "$480,000"
          ],
          [
            "MACRS property class",
            "5-year",
            "5-year"
          ],
          [
            "Project life",
            "4 years",
            "3 years"
          ],
          [
            "Pre-tax salvage at end of life",
            "$100,000",
            "$60,000"
          ],
          [
            "Marginal tax rate",
            "25%",
            "25%"
          ],
          [
            "Discount rate (WACC)",
            "10%",
            "10%"
          ],
          [
            "Beta abandonment alternative (end of Y2, after-tax proceeds)",
            "—",
            "$900,000 if abandoned"
          ]
        ],
        "DataFormat": "USD; rates in percent; savings are incremental before-tax cash flows",
        "AccuracyCheck": "Savings exclude depreciation; salvage taxed via book-value comparison in Exhibit 2"
      },
      {
        "ExhibitID": "CBQ22-E2-E2",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS Depreciation and Book Values",
        "Purpose": "Provides 5-year MACRS rates, annual depreciation, accumulated depreciation, book values, and after-tax salvage.",
        "ReferencedBy": [
          "CBQ22-E2-Q1",
          "CBQ22-E2-Q2",
          "CBQ22-E2-Q6"
        ],
        "Headers": [
          "Year",
          "5-yr MACRS Rate",
          "Alpha Depreciation",
          "Beta Depreciation"
        ],
        "Rows": [
          [
            "1",
            "20.00%",
            "$240,000",
            "$180,000"
          ],
          [
            "2",
            "32.00%",
            "$384,000",
            "$288,000"
          ],
          [
            "3",
            "19.20%",
            "$230,400",
            "$172,800"
          ],
          [
            "4",
            "11.52%",
            "$138,240",
            "—"
          ],
          [
            "Accumulated (life)",
            "—",
            "$992,640",
            "$640,800"
          ],
          [
            "Book value at end of life",
            "—",
            "$207,360",
            "$259,200"
          ],
          [
            "After-tax salvage",
            "—",
            "$126,840",
            "$109,800"
          ]
        ],
        "DataFormat": "USD whole dollars; rates from IRS Pub. 946; after-tax salvage = pre-tax salvage - tax*(pre-tax salvage - book)",
        "AccuracyCheck": "Alpha book 1,200,000-992,640=207,360; after-tax 100,000-0.25*(100,000-207,360)=126,840; Beta book 900,000-640,800=259,200; after-tax 60,000-0.25*(60,000-259,200)=109,800"
      },
      {
        "ExhibitID": "CBQ22-E2-E3",
        "CaseID": "CBQ22-E2",
        "Type": "table",
        "Title": "Exhibit 3 — Abandonment Valuation and Sensitivity (Beta)",
        "Purpose": "Provides Beta's continuation value at Y2 and sensitivity ranking.",
        "ReferencedBy": [
          "CBQ22-E2-Q4",
          "CBQ22-E2-Q5",
          "CBQ22-E2-Q6"
        ],
        "Headers": [
          "Scenario",
          "Value"
        ],
        "Rows": [
          [
            "Beta Year-3 cash flow (ATCF + after-tax salvage, if continued)",
            "$513,000"
          ],
          [
            "After-tax abandonment proceeds at end of Y2",
            "$900,000"
          ],
          [
            "Sensitivity: NPV change per 1% change in annual savings",
            "Alpha ±$11,910; Beta ±$9,320"
          ]
        ],
        "DataFormat": "USD; PV at 10% WACC",
        "AccuracyCheck": "Continuation 513,000 from build: 403,200 ATCF +109,800 salvage =513,000; 513,000/1.10=466,364; abandonment exceeds continuation by 433,636 at Y2"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E2-Q1",
        "Type": "numeric",
        "Prompt": "Enter Alpha's Year 2 after-tax cash flow (operating only, excluding salvage), in dollars.",
        "Correct": "486000",
        "Explanation": "ATCF = (Pre-tax savings)*(1 - t) + Depreciation*t = 520,000*0.75 + 384,000*0.25 = 390,000 + 96,000 = $486,000. The $96,000 is the MACRS tax shield, not a cash inflow itself — depreciation is non-cash and only matters through taxes. This Year 2 figure is largest because Year 2 carries peak 32% MACRS rate.",
        "Topic": "After-tax cash flow with MACRS",
        "Subtopic": "Depreciation tax shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-06: After-Tax Cash Flow; ID-07: MACRS",
        "CommonTrapReference": "Treating depreciation as cash outflow.",
        "DecisionTreeReference": "Capital budgeting — ATCF construction",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ATCF"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q2",
        "Type": "numeric",
        "Prompt": "Enter Alpha's NPV at 10% (including after-tax salvage), in dollars rounded to nearest dollar.",
        "Correct": "323646",
        "Explanation": "ATCFs: Y1 520k*0.75+240k*0.25=450,000; Y2 486,000; Y3 520k*0.75+230.4k*0.25=447,600; Y4 operating 520k*0.75+138.24k*0.25=424,560 plus salvage 126,840 =551,400. Discounted at 10%: Y1 409,091; Y2 401,653; Y3 336,289; Y4 376,614. Sum PV=1,523,646 minus 1,200,000 = $323,646. Positive NPV adds shareholder value. Omitting MACRS shield or taxing salvage on full proceeds misstates NPV >$50k.",
        "Topic": "Net present value",
        "Subtopic": "After-tax salvage terminal value",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01: NPV",
        "CommonTrapReference": "Omitting depreciation tax shield.",
        "DecisionTreeReference": "NPV rule",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV"
        ],
        "Dependencies": [
          "CBQ22-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ22-E2-Q3",
        "Type": "select",
        "Prompt": "Alpha and Beta are mutually exclusive with unequal lives. Which ranking conclusion is correct at 10%?",
        "Correct": "B",
        "Choices": [
          "Compare NPVs directly — Alpha $323,646 > Beta $210,631, so Alpha wins and no annualization is needed",
          "Compute EAA: Alpha $102,101 per year (323,646 / 3.1699) vs Beta $84,698 per year (210,631 / 2.4869) — Alpha creates more equivalent annual value, so Alpha is preferred; direct NPV comparison is invalid for unequal lives",
          "Beta is preferred because its 3-year life is shorter and payback is faster",
          "EAA cannot be used — rank solely by IRR"
        ],
        "Explanation": "When lives differ, NPVs cover different horizons and are not comparable; EAA converts each NPV to annuity: EAA = NPV / PVIFA(r,n). PVIFA(10%,4)=3.1699 and PVIFA(10%,3)=2.4869, so Alpha EAA 102,101 vs Beta 84,698. Payback ignores time value; IRR reinvests at IRR and conflicts with NPV's WACC assumption.",
        "Topic": "Equivalent annual annuity",
        "Subtopic": "Mutually exclusive ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-05: EAA",
        "CommonTrapReference": "Ranking unequal-life projects by raw NPV.",
        "DecisionTreeReference": "Mutually exclusive unequal lives — EAA",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "EAA"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q4",
        "Type": "select",
        "Prompt": "For Beta, how should the $900,000 abandonment alternative at the end of Year 2 be evaluated?",
        "Correct": "A",
        "Choices": [
          "Exercise the abandonment — continuation PV at Y2 is $466,364, so abandonment at $900,000 adds $433,636 of incremental Y2 value, raising Beta's NPV by about $358,334 in present-value terms",
          "Continue Beta — abandonment destroys the project's Year 3 cash flow and should be ignored",
          "Abandonment is irrelevant because Beta's NPV is already positive",
          "Abandonment value equals the pre-tax salvage of $60,000 and adds nothing"
        ],
        "Explanation": "Real option value = max(continuation, abandonment). PV of continuation at Y2 = $466,364; abandonment proceeds after-tax = $900,000. Since abandonment exceeds continuation by $433,636 at Y2, the rational decision is to abandon if that state is reached. In present value at t=0, the incremental value versus continuing is $433,636/1.21 = $358,377, or alternatively Beta's NPV with optimal abandonment ≈ $569,008 vs $210,631 without. Ignoring the abandonment option understates Beta’s value, though Alpha's EAA still dominates in this case.",
        "Topic": "Real option — abandonment",
        "Subtopic": "Continuation vs abandonment valuation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "ID-01 with real option: value = max(PV continuation, abandonment)",
        "CommonTrapReference": "Treating abandonment as pre-tax salvage or ignoring the option entirely.",
        "DecisionTreeReference": "Real options — abandonment",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "real option",
          "abandonment"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q5",
        "Type": "multi",
        "Prompt": "Which two cash-flow items are RELEVANT to the Alpha vs Beta decision and which sensitivity driver should the committee monitor most closely? (Select two.)",
        "Correct": [
          "Incremental operating savings ($520k Alpha vs $480k Beta) and the MACRS tax shields — both differ and are relevant",
          "Annual savings is the dominant NPV driver (±$11.9k per 1% change) — monitor labor productivity and maintenance assumptions more than salvage"
        ],
        "Choices": [
          "Incremental operating savings ($520k Alpha vs $480k Beta) and the MACRS tax shields — both differ and are relevant",
          "Annual savings is the dominant NPV driver (±$11.9k per 1% change) — monitor labor productivity and maintenance assumptions more than salvage",
          "Sunk R&D of $180,000 spent last year on Alpha design — must be included as an initial outflow",
          "The book value of existing manual equipment — all $900k must be charged to both projects"
        ],
        "Explanation": "Relevant items differ between alternatives: operating savings and tax shields change the ATCF builds. Sunk R&D and book value of existing assets are irrelevant — they are incurred regardless of which automation is chosen. Sensitivity ranking shows annual savings moves NPV most per Exhibit 3, so the committee should protect savings via service contracts and training, not over-weight salvage.",
        "Topic": "Relevant cash flows and sensitivity",
        "Subtopic": "Relevant vs sunk; sensitivity ranking",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "ID-06; sensitivity analysis",
        "CommonTrapReference": "Including sunk costs or treating salvage as dominant driver.",
        "DecisionTreeReference": "Capital budgeting — relevant cash flows",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant",
          "sensitivity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E2-Q6",
        "Type": "match",
        "Prompt": "Match each Harborview concept to its correct treatment.",
        "Correct": {
          "ATCF Year 2 $486,000": "520k*0.75 + 384k*0.25 = 390k + 96k — peak MACRS shield year",
          "Alpha NPV $323,646": "PV of 4 ATCFs plus after-tax salvage 126,840 minus 1.2M at 10%",
          "EAA ranking": "Alpha $102,101 vs Beta $84,698 — Alpha higher equivalent annual value; raw NPV not comparable",
          "Abandonment option at Y2": "900k > 466k continuation — exercise, adds $434k at Y2"
        },
        "LeftItems": [
          "ATCF Year 2 $486,000",
          "Alpha NPV $323,646",
          "EAA ranking",
          "Abandonment option at Y2"
        ],
        "RightItems": [
          "520k*0.75 + 384k*0.25 = 390k + 96k — peak MACRS shield year",
          "PV of 4 ATCFs plus after-tax salvage 126,840 minus 1.2M at 10%",
          "900k > 466k continuation — exercise, adds $434k at Y2",
          "Alpha $102,101 vs Beta $84,698 — Alpha higher equivalent annual value; raw NPV not comparable"
        ],
        "Explanation": "The matching integrates the capital-budgeting build: Year 2 shield peaks, NPV adds salvage correctly, EAA annualizes for unequal lives, and abandonment is exercised when it exceeds continuation PV.",
        "Topic": "Integrated capital budgeting",
        "Subtopic": "Matching build to result",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "ID-01; ID-05; ID-06; ID-07",
        "CommonTrapReference": "Cross-matching EAA to raw NPV ranking.",
        "DecisionTreeReference": "Capital budgeting — integrated framework",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-B5",
    "Title": "Yen Fuel Hedge at SkyWest Airlines",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute FX forward premium (B.9)",
      "Evaluate hedging"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "SkyWest Airlines owes JPY 200M for fuel in 90 days. Spot 148, forward 145, JPY rate 1.0%, USD 4.0%. Treasurer Luis Ortega must quantify hedge cost and choose forward vs money-market.",
    "Industry": "Airline",
    "CompanyType": "Service provider",
    "CompanyName": "SkyWest Airlines",
    "Stakeholder": "Treasurer Luis Ortega",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FX",
      "forward"
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
      "Compute forward premium",
      "Compute forward vs MMH cost",
      "Select hedge"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-B5-E1",
        "CaseID": "CBQ22-B5",
        "Type": "table",
        "Title": "Exhibit 1 — JPY Exposure and Market Data",
        "Purpose": "Provides payable, spot, forward, rates.",
        "ReferencedBy": [
          "CBQ22-B5-Q1",
          "CBQ22-B5-Q2",
          "CBQ22-B5-Q3",
          "CBQ22-B5-Q6"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "JPY payable 90d",
            "JPY 200,000,000"
          ],
          [
            "Spot JPY/USD",
            "148"
          ],
          [
            "90d forward",
            "145"
          ],
          [
            "JPY 90d rate",
            "1.0%"
          ],
          [
            "USD 90d rate",
            "4.0%"
          ],
          [
            "Days",
            "90"
          ]
        ],
        "DataFormat": "JPY per USD; rates annual",
        "AccuracyCheck": "Forward USD 1,379,310 vs spot 1,351,351"
      },
      {
        "ExhibitID": "CBQ22-B5-E2",
        "CaseID": "CBQ22-B5",
        "Type": "text",
        "Title": "Exhibit 2 — Hedge Alternatives",
        "Purpose": "Describes forward vs money-market hedge mechanics.",
        "ReferencedBy": [
          "CBQ22-B5-Q4",
          "CBQ22-B5-Q5"
        ],
        "Body": "Forward locks at 145. Money-market: borrow JPY PV at 1%, convert at spot 148, invest USD? For payable, MMH cost similar to forward per parity."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-B5-Q1",
        "Type": "numeric",
        "Prompt": "Enter the annualized yen premium (positive) for the 90-day forward, in percent rounded to two decimals.",
        "Correct": "8.11",
        "Explanation": "Premium=(148-145)/148×360/90=3/148=2.027%×4=8.11%. Yen at premium.",
        "Topic": "FX premium",
        "Subtopic": "Annualized",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.9 FX",
        "CommonTrapReference": "Invert S/F",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fx-premium"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q2",
        "Type": "numeric",
        "Prompt": "Enter the USD cost via 90-day forward, rounded to nearest dollar.",
        "Correct": "1379310",
        "Explanation": "Forward =200M/145=1,379,310. Spot 1,351,351 diff 27,959 premium for certainty.",
        "Topic": "Forward cost",
        "Subtopic": "Lock",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.9 forward",
        "CommonTrapReference": "Spot vs forward",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "forward-cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q3",
        "Type": "select",
        "Prompt": "Which statement about money-market hedge vs forward is correct?",
        "Correct": "B",
        "Choices": {
          "A": "MMH always cheaper",
          "B": "With 1% JPY vs 4% USD, MMH ~1,348k vs forward 1,379k — MMH slightly cheaper before fees; choose lower all-in cost",
          "C": "Forward always cheapest when yen premium",
          "D": "Hedges unnecessary"
        },
        "Explanation": "MMH slightly cheaper, choose lower all-in after fees.",
        "Topic": "Hedge comparison",
        "Subtopic": "Choice",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "MMH always cheaper",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "hedge-comparison"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q4",
        "Type": "select",
        "Prompt": "What is unhedged USD cost if yen strengthens to 142 at maturity?",
        "Correct": "A",
        "Choices": {
          "A": "1,408,451 — 200M/142=1,408k, $29k above forward",
          "B": "1,379,310 — same as forward",
          "C": "1,351,351 — spot today",
          "D": "1,200,000"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Unhedged",
        "Subtopic": "Expose",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Forward same",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "unhedged"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q5",
        "Type": "multi",
        "Prompt": "Which two factors favor forward over MMH here? (Select two)",
        "Correct": [
          "Forward requires no JPY borrowing facility",
          "Forward locks with one contract vs two MMH transactions"
        ],
        "Choices": {
          "A": "Forward requires no JPY borrowing facility",
          "B": "Forward locks with one contract vs two MMH transactions",
          "C": "Forward always cheaper",
          "D": "MMH eliminates all FX risk without counterparty",
          "E": "MMH needs no spot conversion"
        },
        "Explanation": "Forward requires no JPY borrowing facility and locks cost with a single contract versus the money-market's two transactions (borrow JPY PV at 1% and convert at spot 148). Both hedge FX, but the money-market needs a yen credit line and spot conversion, adding operational complexity versus the forward's single lock.",
        "Topic": "Factors",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "factors"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q6",
        "Type": "match",
        "Prompt": "Match FX concept to SkyWest",
        "Correct": {
          "Forward 145 vs spot 148": "Yen premium — forward costs more",
          "JPY 1% vs USD 4%": "Rate differential drives parity",
          "Unhedged 200M/142": "Expose $57k vs MMH",
          "Hedge choice": "Pick lower all-in after fees"
        },
        "LeftItems": [
          "Forward 145 vs spot 148",
          "JPY 1% vs USD 4%",
          "Unhedged 200M/142",
          "Hedge choice"
        ],
        "RightItems": [
          "Yen premium — forward costs more",
          "Rate differential drives parity",
          "Expose $57k vs MMH",
          "Pick lower all-in after fees"
        ],
        "Explanation": "Forward 145 vs spot 148 shows yen at premium, costing more USD than spot; the 1% JPY vs 4% USD differential drives parity between forward and money-market hedges; unhedged 200M/142 exposes a $57k adverse move versus the hedged 1,379k; the hedge choice is the lower all-in cost after fees and credit.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-D5",
    "Title": "KRI Breach at Sterling Bank",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Distinguish appetite vs tolerance vs capacity (D.3)",
      "Apply KRI escalation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Sterling Bank's CRO Henry Cho reports a KRI: failed trades 4.2% vs tolerance 3.5% (appetite 2.0%, capacity $8M loss). The board asks whether breach requires response and which COSO ERM component triggers.",
    "Industry": "Banking",
    "CompanyType": "Service provider",
    "CompanyName": "Sterling Bank",
    "Stakeholder": "CRO Henry Cho",
    "BusinessFunction": "Risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "KRI",
      "appetite"
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
      "Distinguish appetite/tolerance/capacity",
      "Map KRI breach",
      "Identify COSO component"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D5-E1",
        "CaseID": "CBQ22-D5",
        "Type": "dashboard",
        "Title": "Exhibit 1 — KRI Dashboard (Monthly)",
        "Purpose": "Provides KRI vs thresholds.",
        "ReferencedBy": [
          "CBQ22-D5-Q1",
          "CBQ22-D5-Q2",
          "CBQ22-D5-Q5"
        ],
        "Headers": [
          "KRI",
          "Actual",
          "Tolerance",
          "Appetite",
          "Capacity"
        ],
        "Rows": [
          [
            "Failed trades",
            "4.2%",
            "3.5%",
            "2.0%",
            "$8M"
          ],
          [
            "Liquidity coverage",
            "115%",
            "110%",
            "120%",
            "100%"
          ]
        ],
        "DataFormat": "% or USD",
        "AccuracyCheck": "Failed trades breach tolerance but within capacity"
      },
      {
        "ExhibitID": "CBQ22-D5-E2",
        "CaseID": "CBQ22-D5",
        "Type": "table",
        "Title": "Exhibit 2 — Risk Profile",
        "Purpose": "Provides inherent vs residual for failed trades.",
        "ReferencedBy": [
          "CBQ22-D5-Q3",
          "CBQ22-D5-Q4"
        ],
        "Headers": [
          "Risk",
          "Inherent EL",
          "Control Cost",
          "Residual EL"
        ],
        "Rows": [
          [
            "Failed trades",
            "$600k",
            "$50k",
            "$320k"
          ]
        ],
        "DataFormat": "USD annual",
        "AccuracyCheck": "Residual 320k > tolerance 300k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D5-Q1",
        "Type": "numeric",
        "Prompt": "Enter the risk score for failed trades if Likelihood 4 and Severity 4 (1-5 scale).",
        "Correct": "16",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Risk score",
        "Subtopic": "L×S",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "CommonTrapReference": "Add L+S",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk-score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q2",
        "Type": "numeric",
        "Prompt": "Enter the expected loss for failed trades if impact $8M and probability 4%.",
        "Correct": "320000",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Expected loss",
        "Subtopic": "Residual",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01",
        "CommonTrapReference": "Impact only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected-loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q3",
        "Type": "select",
        "Prompt": "Which boundary is breached and which COSO ERM component governs?",
        "Correct": "B",
        "Choices": {
          "A": "Appetite breached — Governance",
          "B": "Tolerance breached (4.2% >3.5%) — Performance triggers review; appetite 2% is hard ceiling but tolerance is operational band, capacity $8M not breached",
          "C": "Capacity breached — Strategy",
          "D": "No breach"
        },
        "Explanation": "Tolerance breached — Performance component triggers review.",
        "Topic": "Boundary vs component",
        "Subtopic": "Breach",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Appetite vs tolerance",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "boundary-vs-component"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q4",
        "Type": "select",
        "Prompt": "What is correct response classification for adding real-time trade matching ($50k) to cut EL 600k→320k?",
        "Correct": "A",
        "Choices": {
          "A": "Reduce — lowers likelihood 7.5%→4%",
          "B": "Share — transfers to insurer",
          "C": "Avoid — exit trades",
          "D": "Accept"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Reduce vs share",
        "Subtopic": "Taxonomy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Share",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "reduce-vs-share"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q5",
        "Type": "multi",
        "Prompt": "Which two conditions require board escalation now? (Select two)",
        "Correct": [
          "Failed trades 4.2% > tolerance 3.5% — escalate",
          "Liquidity 115% between tolerance 110% and appetite 120% — monitor"
        ],
        "Choices": {
          "A": "Failed trades 4.2% > tolerance 3.5% — escalate",
          "B": "Liquidity 115% between tolerance 110% and appetite 120% — monitor",
          "C": "Capacity $8M not breached — no escalation",
          "D": "All KRIs breach",
          "E": "Only appetite breach escalates"
        },
        "Explanation": "Board escalation is triggered when a KRI breaches tolerance: failed trades 4.2% exceeds 3.5% tolerance, so the Performance component triggers immediate review and enhanced monitoring. Liquidity 115% sits between tolerance 110% and appetite 120% — it remains within the operational band and requires monitoring, not escalation, as it has not breached tolerance.",
        "Topic": "Criteria",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "criteria"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q6",
        "Type": "match",
        "Prompt": "Match ERM component to Sterling activity",
        "Correct": {
          "Governance & Culture": "Board sets appetite 2% and tolerance 3.5%",
          "Strategy & Objective-Setting": "Capacity $8M linked to objective",
          "Performance": "KRI 4.2% monitoring score 16",
          "Review & Revision": "Tolerance breach triggers reassessment"
        },
        "LeftItems": [
          "Governance & Culture",
          "Strategy & Objective-Setting",
          "Performance",
          "Review & Revision"
        ],
        "RightItems": [
          "Board sets appetite 2% and tolerance 3.5%",
          "Capacity $8M linked to objective",
          "KRI 4.2% monitoring score 16",
          "Tolerance breach triggers reassessment"
        ],
        "Explanation": "Governance & Culture sets appetite 2% and tolerance 3.5% at board level; Strategy links capacity $8M to the objective; Performance monitors KRI 4.2% and risk score 16 (Likelihood×Severity); Review & Revision triggers reassessment when tolerance is breached, closing the COSO ERM loop for Sterling Bank.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-E3",
    "Title": "Fleet EAA Chain at Apex Auto Components",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Apply EAA to unequal lives (E.4)",
      "Compute ATCF with MACRS"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Apex Auto runs delivery trucks. Option X 5-yr $120k cost, 4-yr life, Option Y 4-yr $90k cost, 3-yr life. Controller Priya Desai must pick via EAA at 8% WACC, tax 25%, MACRS 3yr/5yr.",
    "Industry": "Automotive",
    "CompanyType": "Manufacturer",
    "CompanyName": "Apex Auto Components",
    "Stakeholder": "Controller Priya Desai",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "EAA",
      "MACRS"
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
      "Build ATCF with shield",
      "Compute NPV",
      "Rank via EAA"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E3-E1",
        "CaseID": "CBQ22-E3",
        "Type": "table",
        "Title": "Exhibit 1 — Truck Options",
        "Purpose": "Provides cost, life, savings, salvage, MACRS.",
        "ReferencedBy": [
          "CBQ22-E3-Q1",
          "CBQ22-E3-Q2",
          "CBQ22-E3-Q3",
          "CBQ22-E3-Q5"
        ],
        "Headers": [
          "Item",
          "Option X (5-yr, 4-yr life)",
          "Option Y (3-yr, 3-yr life)"
        ],
        "Rows": [
          [
            "Investment",
            "$120,000",
            "$90,000"
          ],
          [
            "Pre-tax savings",
            "$52,000",
            "$48,000"
          ],
          [
            "MACRS life",
            "5-yr",
            "3-yr"
          ],
          [
            "Salvage end",
            "$20,000",
            "$15,000"
          ],
          [
            "Tax 25%",
            "25%",
            "25%"
          ],
          [
            "WACC 8%",
            "8%",
            "8%"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "X ATCF Y2 52k*0.75+38.4k*0.25=48.6k"
      },
      {
        "ExhibitID": "CBQ22-E3-E2",
        "CaseID": "CBQ22-E3",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS and Discount Factors (8%)",
        "Purpose": "Provides MACRS rates and PV factors.",
        "ReferencedBy": [
          "CBQ22-E3-Q1",
          "CBQ22-E3-Q2",
          "CBQ22-E3-Q6"
        ],
        "Headers": [
          "Year",
          "3-yr MACRS",
          "5-yr MACRS",
          "PVIF 8%"
        ],
        "Rows": [
          [
            "1",
            "33.33%",
            "20.00%",
            "0.9259"
          ],
          [
            "2",
            "44.45%",
            "32.00%",
            "0.8573"
          ],
          [
            "3",
            "14.81%",
            "19.20%",
            "0.7938"
          ],
          [
            "4",
            "7.41%",
            "11.52%",
            "0.7350"
          ]
        ],
        "DataFormat": "%",
        "AccuracyCheck": "X depr Y2 32%*120k=38400"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E3-Q1",
        "Type": "numeric",
        "Prompt": "Enter Option X Year 2 ATCF, in dollars.",
        "Correct": "48600",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "ATCF",
        "Subtopic": "Y2",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-06",
        "CommonTrapReference": "Depr as cash",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "atcf"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q2",
        "Type": "numeric",
        "Prompt": "Enter Option X NPV, in dollars (nearest).",
        "Correct": "44900",
        "Explanation": "Option X NPV = -120,000 + PV of ATCFs (Y1 45,000/1.08=41,666 + Y2 48,600/1.08^2=41,666 + Y3 44,760/1.08^3=35,520 + Y4 42,456/1.08^4=31,200)=150,052 + PV after-tax salvage 20,184/1.08^4=14,834 => 164,886 -120,000=44,886 ≈44,900. Salvage book 20,736 (120k - 99,264 depr), loss 736, tax shield 184, after-tax 20,184. Using 32,400 ignores salvage or uses wrong PVIF.",
        "Topic": "NPV",
        "Subtopic": "With salvage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01",
        "CommonTrapReference": "Salvage tax",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "npv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q3",
        "Type": "select",
        "Prompt": "Which ranking method is correct for unequal lives?",
        "Correct": "B",
        "Choices": {
          "A": "Pick higher NPV raw",
          "B": "EAA = NPV/PVIFA ranks per-year value — X EAA ~9,800 vs Y ~10,200 so Y wins despite lower NPV",
          "C": "Payback shortest wins",
          "D": "IRR highest wins"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "EAA ranking",
        "Subtopic": "Method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Raw NPV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "eaa-ranking"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q4",
        "Type": "select",
        "Prompt": "Why does MACRS matter here?",
        "Correct": "A",
        "Choices": {
          "A": "Depreciation shield timing — 5yr vs 3yr changes ATCF profile and ranking",
          "B": "Depreciation is cash outflow",
          "C": "MACRS ignores tax",
          "D": "5yr always better"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "MACRS effect",
        "Subtopic": "Shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Depr cash",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "macrs-effect"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q5",
        "Type": "multi",
        "Prompt": "Which two items are relevant to X vs Y? (Select two)",
        "Correct": [
          "Pre-tax savings differential $4k/yr",
          "MACRS shield differential"
        ],
        "Choices": {
          "A": "Pre-tax savings differential $4k/yr",
          "B": "MACRS shield differential",
          "C": "Original truck book $80k",
          "D": "Allocated overhead $10k",
          "E": "Y's salvage if Y chosen"
        },
        "Explanation": "Relevant items for the truck choice are the differential pre-tax savings ($52k Alpha vs $48k Beta = $4k/yr) and the MACRS shield differential (5yr 20/32% vs 3yr 33/44% of investment). Original book value $80k and allocated overhead $10k are sunk or allocated and irrelevant to the incremental EAA ranking.",
        "Topic": "Items",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "items"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q6",
        "Type": "match",
        "Prompt": "Match investment concept to Apex",
        "Correct": {
          "ATCF 48.6k": "52k*0.75+38.4k*0.25",
          "NPV X ~32.4k": "PV ATCF+ salvage -120k",
          "EAA ranking": "NPV/PVIFA — per-year value",
          "MACRS 5yr 32%": "Y2 shield drives ATCF peak"
        },
        "LeftItems": [
          "ATCF 48.6k",
          "NPV X ~32.4k",
          "EAA ranking",
          "MACRS 5yr 32%"
        ],
        "RightItems": [
          "52k*0.75+38.4k*0.25",
          "PV ATCF+ salvage -120k",
          "NPV/PVIFA — per-year value",
          "Y2 shield drives ATCF peak"
        ],
        "Explanation": "ATCF 48.6k is 52k×0.75 plus the Year2 MACRS shield 38.4k×0.25; NPV X ~44.9k is the present value of four ATCFs plus after-tax salvage 20.2k at 8% minus the $120k investment; the EAA ranking divides NPV by PVIFA to compare unequal lives (X ~14.2k vs Y ~10.2k per year); the 5yr 32% MACRS rate in Year2 drives the ATCF peak.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-A4",
    "Title": "Leverage Cascade at Sentinel Defense",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Analyze operating and financial leverage (A.8)",
      "Evaluate FCC and covenant linkage"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Sentinel Defense carries fixed operating leverage from a new program. Controller James Wu must compute DOL, DFL, TDTL and test the FCC covenant before the rate-case filing.",
    "Industry": "Defense",
    "CompanyType": "Contractor",
    "CompanyName": "Sentinel Defense",
    "Stakeholder": "Controller James Wu",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "DOL",
      "DFL",
      "leverage"
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
      "Compute DOL, DFL, TDTL",
      "Test FCC covenant",
      "Link leverage to risk"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-A4-E1",
        "CaseID": "CBQ22-A4",
        "Type": "table",
        "Title": "Exhibit 1 — Income Structure ($ millions)",
        "Purpose": "Provides CM, OI, interest for leverage.",
        "ReferencedBy": [
          "CBQ22-A4-Q1",
          "CBQ22-A4-Q2",
          "CBQ22-A4-Q3",
          "CBQ22-A4-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Sales",
            "120.0"
          ],
          [
            "Variable costs",
            "70.0"
          ],
          [
            "CM",
            "50.0"
          ],
          [
            "Fixed costs",
            "30.0"
          ],
          [
            "Operating income",
            "20.0"
          ],
          [
            "Interest",
            "8.0"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "CM 50 - FC30=20"
      },
      {
        "ExhibitID": "CBQ22-A4-E2",
        "CaseID": "CBQ22-A4",
        "Type": "table",
        "Title": "Exhibit 2 — Covenant Package",
        "Purpose": "Provides FCC threshold.",
        "ReferencedBy": [
          "CBQ22-A4-Q4",
          "CBQ22-A4-Q5"
        ],
        "Headers": [
          "Covenant",
          "Threshold",
          "Actual"
        ],
        "Rows": [
          [
            "FCC min",
            "1.80",
            "1.92"
          ]
        ],
        "DataFormat": "Ratio",
        "AccuracyCheck": "FCC = (OI+lease)/ (interest+lease+principal)"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-A4-Q1",
        "Type": "numeric",
        "Prompt": "Enter the degree of operating leverage at current sales, rounded to two decimals.",
        "Correct": "2.50",
        "Explanation": "DOL=CM/OI=50/20=2.50. 10% sales →25% OI. Using sales/OI trap.",
        "Topic": "DOL",
        "Subtopic": "CM/OI",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-19",
        "CommonTrapReference": "sales/OI",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dol"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q2",
        "Type": "numeric",
        "Prompt": "Enter the degree of financial leverage, rounded to two decimals.",
        "Correct": "1.67",
        "Explanation": "DFL= OI/(OI-Interest)=20/(12)=1.67. 10% OI →16.7% EPS.",
        "Topic": "DFL",
        "Subtopic": "OI/(OI-I)",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-20",
        "CommonTrapReference": "OI/NI",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dfl"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q3",
        "Type": "numeric",
        "Prompt": "Enter the total degree of leverage (TDTL), rounded to two decimals.",
        "Correct": "4.17",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "TDTL",
        "Subtopic": "DOL×DFL",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-21",
        "CommonTrapReference": "Add DOL+DFL",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "tdtl"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q4",
        "Type": "select",
        "Prompt": "Does Sentinel pass the FCC covenant and what does leverage imply?",
        "Correct": "A",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "FCC and leverage",
        "Subtopic": "Covenant",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Pass and irrelevant",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fcc-and-leverage"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Pass 1.92 >1.80 but high TDTL 4.17 means small sales miss hits coverage hard — monitor",
          "B": "Fail — 1.92 <1.80",
          "C": "Pass and leverage irrelevant",
          "D": "Fail due to DOL alone"
        }
      },
      {
        "ItemID": "CBQ22-A4-Q5",
        "Type": "multi",
        "Prompt": "Which two actions reduce leverage risk? (Select two)",
        "Correct": [
          "Shift fixed to variable via outsourcing — lowers DOL",
          "Refinance fixed debt to variable — lowers DFL"
        ],
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Leverage reduction",
        "Subtopic": "Actions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Debt vs fixed",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "leverage-reduction"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Shift fixed to variable via outsourcing — lowers DOL",
          "B": "Refinance fixed debt to variable — lowers DFL",
          "C": "Increase fixed costs",
          "D": "Add debt",
          "E": "Cut price"
        }
      },
      {
        "ItemID": "CBQ22-A4-Q6",
        "Type": "match",
        "Prompt": "Match leverage concept to Sentinel",
        "Correct": {
          "DOL 2.50": "CM/OI — operating fixity",
          "DFL 1.67": "OI/(OI-I) — financial fixity",
          "TDTL 4.17": "DOL×DFL — combined",
          "FCC 1.92": "(OI+lease)/(I+lease+principal) — covenant"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Leverage mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "DOL vs DFL",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "leverage-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "DOL 2.50",
          "DFL 1.67",
          "TDTL 4.17",
          "FCC 1.92"
        ],
        "RightItems": [
          "CM/OI — operating fixity",
          "OI/(OI-I) — financial fixity",
          "DOL×DFL — combined",
          "(OI+lease)/(I+lease+principal) — covenant"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-C3",
    "Title": "Joint Costs at ChemCore Industries — NRV and Further Processing",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Allocate joint costs via NRV (C.2)",
      "Apply sell-or-process-further"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "ChemCore processes 10k gallons of joint chemical into three outputs with joint cost $120k, NRVs $80k/$60k/$40k, and further processing options for two.",
    "Industry": "Chemicals",
    "CompanyType": "Manufacturer",
    "CompanyName": "ChemCore Industries",
    "Stakeholder": "Ops Mgr Henrik Dahl",
    "BusinessFunction": "Operations",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "joint",
      "NRV",
      "sell-or-process"
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
      "Allocate joint via NRV",
      "Decide further processing",
      "Explain sunk nature"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C3-E1",
        "CaseID": "CBQ22-C3",
        "Type": "table",
        "Title": "Exhibit 1 — Joint Products and NRV",
        "Purpose": "Provides NRV for allocation.",
        "ReferencedBy": [
          "CBQ22-C3-Q1",
          "CBQ22-C3-Q2",
          "CBQ22-C3-Q6"
        ],
        "Headers": [
          "Product",
          "NRV"
        ],
        "Rows": [
          [
            "A",
            "$80,000"
          ],
          [
            "B",
            "$60,000"
          ],
          [
            "C",
            "$40,000"
          ],
          [
            "Total",
            "$180,000"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "NRV sum 180k; A 44.4% of joint"
      },
      {
        "ExhibitID": "CBQ22-C3-E2",
        "CaseID": "CBQ22-C3",
        "Type": "table",
        "Title": "Exhibit 2 — Further Processing",
        "Purpose": "Provides incremental rev/cost beyond split.",
        "ReferencedBy": [
          "CBQ22-C3-Q3",
          "CBQ22-C3-Q4",
          "CBQ22-C3-Q5"
        ],
        "Headers": [
          "Product",
          "Incremental Revenue",
          "Incremental Cost"
        ],
        "Rows": [
          [
            "A",
            "$25,000",
            "$18,000"
          ],
          [
            "B",
            "$15,000",
            "$20,000"
          ]
        ],
        "DataFormat": "USD beyond split",
        "AccuracyCheck": "A +7k, B -5k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C3-Q1",
        "Type": "numeric",
        "Prompt": "Enter joint cost allocated to Product A via NRV, in dollars.",
        "Correct": "53333",
        "Explanation": "A =120k×80/180=53,333. Physical tons trap. 44.4% of joint.",
        "Topic": "NRV allocation",
        "Subtopic": "A",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.2 NRV",
        "CommonTrapReference": "Tons",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "nrv-allocation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C3-Q2",
        "Type": "numeric",
        "Prompt": "Enter joint cost allocated to Product B, in dollars.",
        "Correct": "40000",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "NRV B",
        "Subtopic": "B",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.2 NRV",
        "CommonTrapReference": "Sales value w/o NRV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "nrv-b"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C3-Q3",
        "Type": "select",
        "Prompt": "Should Product A be processed further?",
        "Correct": "A",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Further A",
        "Subtopic": "Decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Joint cost makes loss",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "further-a"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — incremental $7k (25k-18k) adds profit; joint $53k irrelevant",
          "B": "No — joint cost makes it loss",
          "C": "Yes only if joint is low",
          "D": "No — incremental 25k < joint 53k"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q4",
        "Type": "select",
        "Prompt": "Should Product B be processed further?",
        "Correct": "B",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Further B",
        "Subtopic": "Decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Always process",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "further-b"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — 15k-20k = -5k still process",
          "B": "No — incremental -5k, sell at split",
          "C": "Yes — joint low",
          "D": "Indifferent"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q5",
        "Type": "multi",
        "Prompt": "Which two statements about joint costs are correct? (Select two)",
        "Correct": [
          "Joint cost is sunk for sell-or-process decisions — only incremental beyond split matters",
          "NTV determines incremental profit"
        ],
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Joint nature",
        "Subtopic": "Correct",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Joint relevant",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "joint-nature"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Joint cost is sunk for sell-or-process decisions — only incremental beyond split matters",
          "B": "NRV allocation affects further-processing decision",
          "C": "Physical measure is always best for NRV",
          "D": "Joint cost should be allocated to decide further processing",
          "E": "NTV determines incremental profit"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q6",
        "Type": "match",
        "Prompt": "Match ChemCore concept to treatment",
        "Correct": {
          "A allocation 53,333": "120k×80/180 — NRV% of joint",
          "B allocation 40,000": "120k×60/180",
          "A further +7k": "25k-18k — process",
          "B further -5k": "15k-20k — sell at split"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Joint mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "NRV vs further",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "joint-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "A allocation 53,333",
          "B allocation 40,000",
          "A further +7k",
          "B further -5k"
        ],
        "RightItems": [
          "120k×80/180 — NRV% of joint",
          "120k×60/180",
          "25k-18k — process",
          "15k-20k — sell at split"
        ]
      }
    ]
  },
  {
    "CaseID": "CBQ22-F4",
    "Title": "FCPA and Books-and-Records at Veridian Global",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Apply FCPA anti-bribery and books-and-records (F.6)",
      "Evaluate facilitating vs bribe"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Veridian Global's agent in Indonesia paid $80k to a customs official to expedite a $1.2M contract and booked it as 'consulting fees.' Compliance Officer Elena Ruiz must assess FCPA exposure and SOX404 deficiency.",
    "Industry": "Consumer goods",
    "CompanyType": "Service provider",
    "CompanyName": "Veridian Global",
    "Stakeholder": "Compliance Officer Elena Ruiz",
    "BusinessFunction": "Compliance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FCPA",
      "books-and-records"
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
      "Distinguish anti-bribery vs books",
      "Evaluate facilitating exception",
      "Assess control deficiency"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F4-E1",
        "CaseID": "CBQ22-F4",
        "Type": "email",
        "Title": "Exhibit 1 — Agent Email",
        "Purpose": "Provides payment description.",
        "ReferencedBy": [
          "CBQ22-F4-Q1",
          "CBQ22-F4-Q2",
          "CBQ22-F4-Q3"
        ],
        "Body": "Agent: 'Paid $80k to customs to release shipment for $1.2M contract. Invoiced as consulting fees per your template.' Manager approved without inquiry."
      },
      {
        "ExhibitID": "CBQ22-F4-E2",
        "CaseID": "CBQ22-F4",
        "Type": "text",
        "Title": "Exhibit 2 — FCPA and SOX404 Framework",
        "Purpose": "Summarizes FCPA provisions and control deficiency levels.",
        "ReferencedBy": [
          "CBQ22-F4-Q4",
          "CBQ22-F4-Q5",
          "CBQ22-F4-Q6"
        ],
        "Body": "FCPA: anti-bribery (foreign official, corrupt intent) + books-and-records (accurate books, controls) + internal controls. Facilitating: routine gov action (e.g., stamping), not discretionary contract award. SOX404: material weakness = reasonable possibility of material misstatement; significant deficiency less severe."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F4-Q1",
        "Type": "select",
        "Prompt": "Does the $80k violate FCPA anti-bribery?",
        "Correct": "A",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Anti-bribery",
        "Subtopic": "Violation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Facilitating trap",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "anti-bribery"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — payment to foreign official for discretionary contract award with corrupt intent, not routine",
          "B": "No — facilitating payment for routine stamping only, this is discretionary contract",
          "C": "No — amount small, always immaterial",
          "D": "Only if US official"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q2",
        "Type": "select",
        "Prompt": "Does booking as 'consulting fees' violate books-and-records?",
        "Correct": "A",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Books-and-records",
        "Subtopic": "Violation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reasonable label",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "books-and-records"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — inaccurate books, misclassifies bribe, second FCPA violation even if anti-bribery not proven",
          "B": "No — consulting is reasonable label",
          "C": "Only if material",
          "D": "No — manager approved"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q3",
        "Type": "select",
        "Prompt": "Is facilitating exception available for the $80k?",
        "Correct": "B",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Facilitating",
        "Subtopic": "Exception",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Any customs",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "facilitating"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — any customs payment is facilitating",
          "B": "No — facilitating covers only routine non-discretionary acts (e.g., stamping), not securing $1.2M contract award",
          "C": "Yes — $80k is small",
          "D": "Yes — if booked correctly"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q4",
        "Type": "select",
        "Prompt": "What is the SOX404 implication of the template that auto-books agent fees as consulting?",
        "Correct": "B",
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "SOX404",
        "Subtopic": "Deficiency",
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
          "sox404"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "No deficiency — template is control",
          "B": "Material weakness or significant deficiency — reasonable possibility of material misstatement due to override of proper classification and manager inattention",
          "C": "Only disclosure deficiency",
          "D": "No impact — FCPA not SOX"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q5",
        "Type": "multi",
        "Prompt": "Which three controls address Veridian's risks? (Select three)",
        "Correct": [
          "Enhanced due diligence on third-party agents with red-flag screening",
          "Prohibit template auto-booking; require invoice + proof of service + approval",
          "Anti-bribery training and hotline with non-retaliation"
        ],
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "Controls",
        "Subtopic": "Correct",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Template control",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Enhanced due diligence on third-party agents with red-flag screening",
          "B": "Prohibit template auto-booking; require invoice + proof of service + approval",
          "C": "Anti-bribery training and hotline with non-retaliation",
          "D": "Defer FCPA until contract >$5M",
          "E": "Book all agent fees as consulting always"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q6",
        "Type": "match",
        "Prompt": "Match Veridian fact to treatment",
        "Correct": {
          "$80k to customs for $1.2M contract": "Anti-bribery violation — discretionary award",
          "Booked as consulting fees": "Books-and-records violation — inaccurate books",
          "Facilitating claim": "Only routine non-discretionary, not contract award",
          "Template auto-book": "Control deficiency — material weakness/ significant"
        },
        "Explanation": "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward.",
        "Topic": "FCPA mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Facilitating",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fcpa-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "$80k to customs for $1.2M contract",
          "Booked as consulting fees",
          "Facilitating claim",
          "Template auto-book"
        ],
        "RightItems": [
          "Anti-bribery violation — discretionary award",
          "Books-and-records violation — inaccurate books",
          "Only routine non-discretionary, not contract award",
          "Control deficiency — material weakness/ significant"
        ]
      }
    ]
  },
  {
  "CaseID": "CBQ22-C4",
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
  "Version": "1.0",
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
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation"
    }
  ],
  "question_state": "Certified",
    "certification_date": "2026-09-05",
    "certification_session": "P2-CERT-AUDIT-CASE",
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
      "ExhibitID": "CBQ22-C4-E1",
      "CaseID": "CBQ22-C4",
      "Type": "table",
      "Title": "Exhibit 1 — Current Cost Build",
      "Purpose": "Provides the component-level cost breakdown of the proposed IoT sensor, used to compute the total current cost and identify value-engineering targets.",
      "ReferencedBy": [
        "CBQ22-C4-Q1",
        "CBQ22-C4-Q2",
        "CBQ22-C4-Q5"
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
      "AccuracyCheck": "12.80 + 8.40 + 5.60 + 6.20 + 2.80 + 1.70 = 37.50 — confirmed"
    },
    {
      "ExhibitID": "CBQ22-C4-E2",
      "CaseID": "CBQ22-C4",
      "Type": "text",
      "Title": "Exhibit 2 — Market Research Summary",
      "Purpose": "Provides competitive pricing context and life-cycle cost data needed for the life-cycle pricing evaluation.",
      "ReferencedBy": [
        "CBQ22-C4-Q3",
        "CBQ22-C4-Q4",
        "CBQ22-C4-Q6"
      ],
      "Body": "SmartSense's market research indicates that the competitive wholesale price for comparable IoT temperature sensors is $48.00 per unit. Two major competitors (TempTrak and SensiCore) already sell at this price point with similar specifications. SmartSense expects to sell 180,000 units over a 3-year product life. Beyond the manufacturing cost of $37.50 per unit, the following life-cycle costs have been identified: $420,000 in upfront tooling and模具 (mold) design, $180,000 in initial regulatory certification, $96,000 per year in warranty reserves (3-year life), and $0.85 per unit in end-of-life recycling compliance. The company's required return on investment for new products is 15% on total life-cycle costs."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-C4-Q1",
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
      "ItemID": "CBQ22-C4-Q2",
      "Type": "numeric",
      "Prompt": "Enter the value-engineering gap per unit — the amount by which the current cost exceeds the allowable cost.",
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
        "CBQ22-C4-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-C4-Q3",
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
      "ItemID": "CBQ22-C4-Q4",
      "Type": "select",
      "Prompt": "When evaluating whether to proceed with the sensor, which statement about life-cycle pricing is correct?",
      "Correct": "D",
      "Choices": [
        "Life-cycle pricing only considers manufacturing cost — tooling and warranty are period expenses",
        "The $48.00 market price should be compared to the $37.50 manufacturing cost alone, ignoring upstream and downstream costs",
        "Life-cycle pricing assigns all non-manufacturing costs to the period incurred rather than allocating them to units",
        "Life-cycle pricing considers all costs from product inception through end-of-life — including tooling, certification, warranty, and disposal — and allocates them across expected unit volume to determine true per-unit profitability"
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
      "ItemID": "CBQ22-C4-Q5",
      "Type": "multi",
      "Prompt": "Which THREE costs are relevant to SmartSense's decision to proceed with or reject the sensor launch? Select exactly three.",
      "Correct": [
        "The $6.30 per-unit value-engineering gap between current and allowable cost",
        "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
        "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
      ],
      "Choices": {
        "A": "The $6.30 per-unit value-engineering gap between current and allowable cost",
        "B": "The $37.50 per-unit manufacturing cost because it is a sunk cost once the design is finalized",
        "C": "The $420,000 in upfront tooling investment that has no alternative use if the product is cancelled",
        "D": "The $48.00 market price because it is fixed by competitors and cannot be changed",
        "E": "The $0.85 per-unit end-of-life recycling compliance cost that will be incurred only if the product is manufactured"
      },
      "Explanation": "Relevant costs are future costs that differ between alternatives. The $6.30 gap (choice A) is relevant because it quantifies the cost reduction needed to make the project viable — it changes depending on whether SmartSense proceeds. The $420,000 tooling (choice C) is relevant because it is an avoidable future cost: if SmartSense cancels, the tooling expenditure is avoided entirely. The $0.85 recycling cost (choice E) is relevant because it is incurred only if production proceeds. The $37.50 manufacturing cost (B) is NOT relevant because it represents the current design estimate, not a differential cost between proceed and reject. The $48.00 market price (D) is a revenue parameter, not a cost — it is given and cannot be altered by SmartSense's decision.",
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
      "ItemID": "CBQ22-C4-Q6",
      "Type": "select",
      "Prompt": "Based on the analysis, which recommendation should Diane present to the board?",
      "Correct": "C",
      "Choices": [
        "Proceed immediately — the $48.00 market price exceeds the $37.50 manufacturing cost, so the product is profitable on a per-unit basis",
        "Reject the product — the value-engineering gap of $6.30 is too large to close through component redesign",
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
        "CBQ22-C4-Q1",
        "CBQ22-C4-Q2",
        "CBQ22-C4-Q4"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-C5",
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
  "Version": "1.0",
  "Tags": [
    "linear programming",
    "product mix",
    "shadow price",
    "constraint analysis"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Calculate contribution margin per unit for each product",
    "Identify the feasible region and evaluate corner points graphically",
    "Determine which constraint is binding at the optimal solution",
    "Interpret the shadow price of the binding constraint for capacity decisions"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-C5-E1",
      "CaseID": "CBQ22-C5",
      "Type": "table",
      "Title": "Exhibit 1 — Resource Requirements and Capacity",
      "Purpose": "Provides the per-unit resource requirements for each product on each machine and the total available hours per period.",
      "ReferencedBy": [
        "CBQ22-C5-Q1",
        "CBQ22-C5-Q2",
        "CBQ22-C5-Q3"
      ],
      "Headers": [
        "Resource",
        "Product A (per unit)",
        "Product B (per unit)",
        "Available Hours"
      ],
      "Rows": [
        [
          "Extrusion machine hours",
          "2.0",
          "3.0",
          "3,000"
        ],
        [
          "Packaging line hours",
          "1.5",
          "1.0",
          "2,400"
        ],
        [
          "Demand limit (units)",
          "1,200",
          "800",
          "—"
        ]
      ],
      "DataFormat": "Hours per unit; demand in units; available in hours per period",
      "AccuracyCheck": "Constraints are consistent with corner-point solution — see analysis"
    },
    {
      "ExhibitID": "CBQ22-C5-E2",
      "CaseID": "CBQ22-C5",
      "Type": "table",
      "Title": "Exhibit 2 — Unit Economics",
      "Purpose": "Provides selling price and variable cost data for computing contribution margin per unit.",
      "ReferencedBy": [
        "CBQ22-C5-Q1",
        "CBQ22-C5-Q4"
      ],
      "Headers": [
        "Item",
        "Product A",
        "Product B"
      ],
      "Rows": [
        [
          "Selling price per unit",
          "$85.00",
          "$62.00"
        ],
        [
          "Variable material cost",
          "$34.00",
          "$22.00"
        ],
        [
          "Variable labor cost",
          "$15.00",
          "$12.00"
        ],
        [
          "Variable overhead",
          "$12.00",
          "$10.00"
        ]
      ],
      "DataFormat": "USD per unit",
      "AccuracyCheck": "CM_A = 85 − 34 − 15 − 12 = $24; CM_B = 62 − 22 − 12 − 10 = $18"
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-C5-Q1",
      "Type": "numeric",
      "Prompt": "Enter the contribution margin per unit for Product A.",
      "Correct": "24",
      "Explanation": "Contribution margin per unit = Selling price − Variable costs = $85.00 − ($34.00 + $15.00 + $12.00) = $85.00 − $61.00 = $24.00. This per-unit contribution is what each unit of Product A contributes toward covering fixed costs and generating profit. The CM is the basis for comparing products when a constraint exists — ranking by CM per unit alone can be misleading when products consume scarce resources at different rates. A common trap is to use gross margin (which includes fixed overhead allocation) instead of contribution margin.",
      "Topic": "Contribution margin",
      "Subtopic": "Per-unit computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "Contribution Margin = Selling Price − Total Variable Costs",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "contribution margin",
        "per unit"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C5-Q2",
      "Type": "numeric",
      "Prompt": "Enter the maximum total contribution margin Alpine can achieve under the given constraints.",
      "Correct": "32400",
      "Explanation": "The maximum total contribution margin is found by evaluating the feasible corner points: (0,0) = $0; (1,200 A, 0 B) = $28,800; (0, 800 B) = $14,400; and (1,200 A, 200 B) = $32,400, where A's demand limit binds and the remaining extrusion hours (3,000 − 2,400 = 600) produce 200 units of B at 3 hours each. Packaging at this corner uses 1,200 × 1.5 + 200 × 1.0 = 2,000 of 2,400 hours, leaving 400 hours of slack. Total CM = 1,200 × $24 + 200 × $18 = $28,800 + $3,600 = $32,400. The maximum is $32,400 at 1,200 units of A and 200 units of B, where extrusion (3,000 hours) and A's demand limit (1,200 units) are both binding. A common trap is to stop at (1,200, 0) = $28,800 without checking that leftover extrusion hours can still produce B, or to include the infeasible constraint intersection.",
      "Topic": "Linear programming",
      "Subtopic": "Optimal mix",
      "Difficulty": "Very Difficult",
      "DifficultyScore": 5,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-06: WACM and graphical LP method",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "linear programming",
        "optimal mix"
      ],
      "Dependencies": [
        "CBQ22-C5-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-C5-Q3",
      "Type": "select",
      "Prompt": "At the optimal product mix, which constraint is binding?",
      "Correct": "A",
      "Choices": [
        "The extrusion machine hours are fully utilized at 3,000 hours, making extrusion the binding constraint",
        "The packaging line hours are fully utilized at 2,400 hours, making packaging the binding constraint",
        "Both constraints are binding simultaneously at the optimal solution",
        "Neither constraint is binding because the optimal mix falls within all capacity limits"
      ],
      "Explanation": "At the optimal mix of 1,200 units of A and 200 units of B, extrusion hours consumed = 1,200 × 2.0 + 200 × 3.0 = 3,000 hours exactly — fully utilizing the 3,000-hour capacity. Packaging hours consumed = 1,200 × 1.5 + 200 × 1.0 = 2,000 hours, leaving 400 hours of slack. A binding constraint is one that is satisfied as an equality at the optimal solution — any reduction in the binding resource would force a lower objective value. The extrusion constraint limits Alpine's ability to produce more of either product, making it the bottleneck. A common error is to assume the tighter constraint (packaging, with 2,400 available vs. 3,000) is automatically binding.",
      "Topic": "Constraint analysis",
      "Subtopic": "Binding constraint identification",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "binding constraint",
        "LP sensitivity"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C5-Q4",
      "Type": "select",
      "Prompt": "What is the shadow price of the binding extrusion constraint?",
      "Correct": "A",
      "Choices": ["$6.00 per hour — each additional extrusion hour increases total contribution margin by $6.00 because the demand constraint on Product A is binding", "$0.00 per hour — the constraint is not truly limiting because packaging has slack", "$24.00 per hour — equal to the contribution margin per unit of Product A", "$12.00 per hour — the average of the two products' contribution margins"],
      "Explanation": "At the optimal mix of 1,200 A and 200 B, both extrusion capacity (3,000 hours) and Product A's demand limit (1,200 units) are binding. An additional extrusion hour cannot produce more A because A's demand is already saturated, so the hour is used to produce 1/3 of a unit of B (3 hours per unit), adding $18 ÷ 3 = $6.00 of contribution margin. The shadow price of the binding extrusion constraint is therefore $6.00 per hour. The $12.00 figure is the trap: it is valid only if the added hour could be used for A ($24 ÷ 2 hours), but A's demand cap prevents that. $0.00 is wrong because extrusion is fully utilized, and $24.00 confuses per-unit CM with CM per hour.",
      "Topic": "Shadow price",
      "Subtopic": "Interpretation",
      "Difficulty": "Very Difficult",
      "DifficultyScore": 5,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "Shadow Price = ΔObjective / ΔConstraint RHS",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "shadow price",
        "sensitivity analysis"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C5-Q5",
      "Type": "multi",
      "Prompt": "Which THREE statements about Alpine's product mix are correct under what-if analysis? Select exactly three.",
      "Correct": ["If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint","If Product A's contribution margin per unit falls below $12.00, Product B becomes more profitable per extrusion hour and the optimal mix shifts toward producing more of Product B","If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"],
      "Choices": {
        "A": "If extrusion capacity increases to 3,600 hours, the demand constraint on Product A (1,200 units) becomes the new binding constraint",
        "B": "Increasing packaging capacity will always improve the optimal objective value",
        "C": "If Product A's contribution margin per unit falls below $12.00, Product B becomes more profitable per extrusion hour and the optimal mix shifts toward producing more of Product B",
        "D": "The shadow price of the extrusion constraint remains constant for all possible increases in capacity",
        "E": "If the demand limit for Product A is removed entirely, Alpine would produce only Product A using all extrusion hours"
      },
      "Explanation": "Statement A is correct: with 3,600 extrusion hours, A's demand limit of 1,200 units becomes the new binding constraint (1,200 × 2 = 2,400 hours for A, leaving 1,200 hours for 400 units of B). Statement C (repaired) is correct: A earns $24 ÷ 2 = $12 per extrusion hour versus B's $18 ÷ 3 = $6; if A's per-unit CM fell below $12, B's per-hour return would exceed A's and the mix would shift toward B. Statement E is correct: with no cap on A, all 3,000 hours produce 1,500 units of A and $36,000 of CM, above the constrained $32,400 optimum. Statement B is false: packaging has 400 hours of slack, so more packaging capacity cannot improve the objective. Statement D is false: the shadow price changes once capacity is relaxed enough that extrusion is no longer the limiting factor. The original statement C was false — if B's CM rose to $24, B would earn $24 ÷ 3 = $8 per hour, still below A's $12 per hour, so the mix would not shift toward B.",
      "Topic": "What-if analysis",
      "Subtopic": "Sensitivity analysis",
      "Difficulty": "Very Difficult",
      "DifficultyScore": 5,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "sensitivity analysis",
        "what-if"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C5-Q6",
      "Type": "match",
      "Prompt": "Match each constraint concept from Alpine's analysis to its correct value or description.",
      "LeftItems": [
        "Binding constraint",
        "Shadow price of the binding constraint",
        "Slack on the non-binding constraint",
        "Maximum CM if packaging were also binding"
      ],
      "RightItems": [
        "Extrusion machine hours at 3,000 utilized",
        "The marginal value of one additional extrusion hour in terms of CM gain",
        "400 unused packaging hours at the optimal mix",
        "Total CM at the intersection of both constraints",
        "Demand limit on Product B at 800 units",
        "The average CM across both products"
      ],
      "Correct": {
        "Binding constraint": "Extrusion machine hours at 3,000 utilized",
        "Shadow price of the binding constraint": "The marginal value of one additional extrusion hour in terms of CM gain",
        "Slack on the non-binding constraint": "400 unused packaging hours at the optimal mix",
        "Maximum CM if packaging were also binding": "Total CM at the intersection of both constraints"
      },
      "Explanation": "The binding constraint is the one satisfied as an equality at the optimum — extrusion at 3,000 hours. The shadow price measures the marginal improvement in the objective per unit increase in the binding resource. Slack on a non-binding constraint is the unused capacity — packaging has 2,400 − 2,000 = 400 hours of slack. If packaging were also binding, the optimal would shift to the intersection of both resource constraints, yielding a different total CM. Distractors: the demand limit on B is not binding at the optimum (only 200 of 800 units used), and the average CM across products is a descriptive statistic, not a constraint concept.",
      "Topic": "Constraint analysis",
      "Subtopic": "Concept mapping",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "constraint analysis",
        "mapping"
      ],
      "Dependencies": []
    }
  ]
},
  {
  "CaseID": "CBQ22-C6",
  "Title": "Staged Market Entry Decision at Cascade Therapeutics",
  "SectionTags": [
    "C"
  ],
  "BlueprintDomain": "Decision Analysis",
  "BlueprintObjectives": [
    "Construct a decision tree with probability-weighted outcomes",
    "Compute expected monetary value for each decision alternative",
    "Derive the expected value of perfect information (EVPI)",
    "Apply maximin, maximax, and minimax regret decision criteria"
  ],
  "PrimaryCompetency": "Judgment",
  "EstimatedMinutes": 30,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Cascade Therapeutics must decide whether to enter a new specialty pharmaceutical market. Three options are on the table: (a) enter immediately with a full $12 million investment, (b) spend $1.5 million on a 6-month pilot study before deciding to enter or withdraw, or (c) wait 12 months for a competitor's clinical trial results before committing. CEO Amara Okafor needs a decision-tree analysis that weighs probability-weighted payoffs against the costs of staged entry.",
  "Industry": "Pharmaceuticals",
  "CompanyType": "Manufacturer",
  "CompanyName": "Cascade Therapeutics",
  "Stakeholder": "CEO Amara Okafor",
  "BusinessFunction": "Strategic planning",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "decision trees",
    "expected value",
    "EVPI",
    "maximin",
    "real options"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Construct decision trees with chance nodes and decision nodes",
    "Compute expected monetary value from probability-weighted payoffs",
    "Derive and interpret the expected value of perfect information",
    "Compare maximin, maximax, and minimax regret criteria for risk-averse and risk-seeking decision-makers"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-C6-E1",
      "CaseID": "CBQ22-C6",
      "Type": "table",
      "Title": "Exhibit 1 — Market Probability Scenarios",
      "Purpose": "Provides the probability distribution over market-size scenarios and the corresponding NPV payoffs for each decision alternative.",
      "ReferencedBy": [
        "CBQ22-C6-Q1",
        "CBQ22-C6-Q2",
        "CBQ22-C6-Q3"
      ],
      "Headers": [
        "Market Scenario",
        "Probability",
        "Enter Immediately NPV",
        "Pilot Then Enter/Withdraw NPV",
        "Wait 12 Months NPV"
      ],
      "Rows": [
        [
          "Large market",
          "0.30",
          "$28,000,000",
          "$24,800,000",
          "$18,000,000"
        ],
        [
          "Medium market",
          "0.45",
          "$8,000,000",
          "$5,200,000",
          "$6,000,000"
        ],
        [
          "Small market",
          "0.25",
          "−$10,000,000",
          "−$1,500,000",
          "$1,000,000"
        ]
      ],
      "DataFormat": "Probabilities sum to 1.00; NPV in USD after all costs including the $12M entry investment or $1.5M pilot cost",
      "AccuracyCheck": "EV computation: 0.30×28M + 0.45×8M + 0.25×(−10M) = 8.4 + 3.6 − 2.5 = 9.5M for immediate entry"
    },
    {
      "ExhibitID": "CBQ22-C6-E2",
      "CaseID": "CBQ22-C6",
      "Type": "text",
      "Title": "Exhibit 2 — Pilot Study Information",
      "Purpose": "Describes the pilot study's capabilities and limitations, providing context for interpreting the staged-entry option.",
      "ReferencedBy": [
        "CBQ22-C6-Q4",
        "CBQ22-C6-Q5",
        "CBQ22-C6-Q6"
      ],
      "Body": "The pilot study costs $1.5 million and takes 6 months. It provides a signal (favorable or unfavorable) about market demand, but the signal is not perfectly accurate: given a truly large market, the pilot signals favorable 80% of the time and unfavorable 20% of the time. Given a medium market, the pilot signals favorable 50% of the time and unfavorable 50% of the time. Given a small market, the pilot signals favorable 20% of the time and unfavorable 80% of the time. After receiving the pilot signal, Cascade decides whether to proceed with full entry (total additional investment of $12 million) or withdraw. If Cascade withdraws, the only cost is the $1.5 million pilot expense. The wait option costs nothing upfront but delays revenue by 12 months, resulting in discounted payoffs shown in Exhibit 1."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-C6-Q1",
      "Type": "numeric",
      "Prompt": "Enter the expected monetary value (EMV) of the immediate-entry alternative, in millions of dollars.",
      "Correct": "9500000",
      "Explanation": "EMV of immediate entry = Σ(Probability × NPV) = (0.30 × $28,000,000) + (0.45 × $8,000,000) + (0.25 × (−$10,000,000)) = $8,400,000 + $3,600,000 − $2,500,000 = $9,500,000. The expected value is a probability-weighted average of all possible outcomes. Even though there is a 25% chance of a $10 million loss, the large-market upside ($28M × 0.30 = $8.4M) drives the EMV to a positive $9.5M. This is the value Cascade should compare against the EMV of the pilot and wait alternatives. A common error is to weight the payoffs by equal probability (1/3 each) instead of using the given distribution.",
      "Topic": "Expected value",
      "Subtopic": "EMV computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-10: Expected Value = Σ(Pi × Outcomei)",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "expected value",
        "EMV"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C6-Q2",
      "Type": "numeric",
      "Prompt": "Enter the expected value of perfect information (EVPI), in millions of dollars.",
      "Correct": "2750000",
      "Explanation": "EVPI = EV with perfect information − EV without perfect information. With perfect information Cascade knows the market state before choosing: large → enter at $28M, medium → enter at $8M, small → wait at $1M. EVwPI = 0.30 × $28M + 0.45 × $8M + 0.25 × $1M = $8.4M + $3.6M + $0.25M = $12.25M. EVwoPI is the best expected value without information — immediate entry at $9.5M, since the wait option is $8.35M and the pilot is $9.41M, both below $9.5M. EVPI = $12.25M − $9.5M = $2.75M. A common trap is to confuse EVPI with EVwPI ($12.25M), or to anchor on the single best payoff ($28M) instead of the probability-weighted best outcomes.",
      "Topic": "Expected value of perfect information",
      "Subtopic": "EVPI computation",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-11: EVPI = EVwPI − EVwoPI",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "EVPI",
        "perfect information"
      ],
      "Dependencies": [
        "CBQ22-C6-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-C6-Q3",
      "Type": "select",
      "Prompt": "Based on the expected value analysis, which entry strategy should Cascade pursue?",
      "Correct": "B",
      "Choices": [
        "Wait 12 months — it has the lowest downside risk across all scenarios",
        "Enter immediately — it has the highest EMV at $9.5 million and should be selected regardless of risk attitude",
        "Conduct the pilot study — it reduces the expected loss in the small-market scenario while preserving upside in the large-market scenario, and the $1.5 million pilot cost is less than the EVPI of $2.75 million",
        "Enter immediately — the $28 million large-market payoff dominates all other alternatives"
      ],
      "Explanation": "The pilot option's EMV is computed from the posterior probabilities. P(favorable) = 0.30×0.80 + 0.45×0.50 + 0.25×0.20 = 0.515; P(unfavorable) = 0.485. After a favorable signal: P(large)=0.24/0.515=46.6%, P(medium)=0.225/0.515=43.7%, P(small)=0.05/0.515=9.7%; entering yields 0.466×$24.8M + 0.437×$5.2M + 0.097×(−$1.5M) = $13.68M versus −$1.5M to withdraw, so Cascade enters. After an unfavorable signal: P(large)=0.06/0.485=12.4%, P(medium)=0.225/0.485=46.4%, P(small)=0.20/0.485=41.2%; entering yields 0.124×$24.8M + 0.464×$5.2M + 0.412×(−$1.5M) = $4.86M versus −$1.5M to withdraw, so Cascade still enters. Pilot EMV = 0.515×$13.68M + 0.485×$4.86M = $9.41M, which is BELOW immediate entry's $9.5M. Under the EMV criterion the optimal strategy is to enter immediately (Choice B). Choice C overstates the pilot's value: the pilot cost of $1.5M is below EVPI, but the pilot does not lift the decision above the $9.5M no-information optimum. Choice A is the maximin alternative, not the EMV choice.",
      "Topic": "Decision tree analysis",
      "Subtopic": "Optimal strategy",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "decision tree",
        "strategy"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C6-Q4",
      "Type": "select",
      "Prompt": "If Cascade uses the maximin criterion (pessimistic), which alternative should it choose?",
      "Correct": "B",
      "Choices": [
        "Enter immediately — it has the highest possible payoff of $28 million",
        "Wait 12 months — its worst-case payoff of $1 million is better than the worst cases of immediate entry (−$10M) and pilot (−$1.5M)",
        "Conduct the pilot — its worst case of −$1.5M is better than immediate entry's −$10M",
        "Enter immediately — the expected value dominates the other alternatives"
      ],
      "Explanation": "The maximin criterion selects the alternative with the best worst-case payoff (maximize the minimum). Immediate entry's worst case is −$10M (small market). The pilot's worst case is −$1.5M (small market, unfavorable signal, withdraw). Wait's worst case is $1M (small market). Maximin = max(−$10M, −$1.5M, $1M) = $1M → choose Wait. The maximin criterion is appropriate for risk-averse decision-makers who prioritize avoiding the largest loss. It ignores the probability distribution and the upside potential. A common exam trap is to confuse maximin (best worst case) with maximax (best best case), which would choose immediate entry for its $28M upside.",
      "Topic": "Decision criteria",
      "Subtopic": "Maximin",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "maximin",
        "risk aversion"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C6-Q5",
      "Type": "multi",
      "Prompt": "Which THREE factors should Amara consider when choosing between the pilot and immediate-entry alternatives? Select exactly three.",
      "Correct": [
        "The pilot cost of $1.5 million must be compared against the EVPI of $2.75 million to determine if imperfect information has positive expected value",
        "The pilot's signal accuracy (80%/50%/20% across scenarios) determines how much the posterior probabilities shift from the priors",
        "The opportunity cost of the 6-month delay during the pilot period, during which a competitor may enter the market"
      ],
      "Choices": {
        "A": "The pilot cost of $1.5 million must be compared against the EVPI of $2.75 million to determine if imperfect information has positive expected value",
        "B": "The pilot's signal accuracy (80%/50%/20% across scenarios) determines how much the posterior probabilities shift from the priors",
        "C": "The total sunk cost of $12 million that Cascade has already invested in R&D for the drug candidate",
        "D": "The opportunity cost of the 6-month delay during the pilot period, during which a competitor may enter the market",
        "E": "The fact that the pilot study eliminates all uncertainty about the market size"
      },
      "Explanation": "Statement A applies the EVPI benchmark: since the pilot costs less than the EVPI, imperfect information has positive expected value. Statement B is correct because the posterior probabilities — the updated beliefs after observing the pilot signal — determine the value of the information. Higher accuracy (80% for large market) means the pilot more reliably separates good from bad outcomes. Statement D captures the real option cost: the 6-month pilot delay may allow a competitor to capture first-mover advantage, an opportunity cost not reflected in the NPV figures. Statement C is incorrect: the R&D cost is sunk regardless of the entry decision and should not influence the choice. Statement E is incorrect: the pilot is imperfect (accuracy ranges from 20% to 80%), so uncertainty remains after the signal.",
      "Topic": "Decision factors",
      "Subtopic": "Pilot vs. entry",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "decision factors",
        "real options"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C6-Q6",
      "Type": "select",
      "Prompt": "Which statement correctly interprets the EVPI in Cascade's context?",
      "Correct": "D",
      "Choices": [
        "EVPI represents the total NPV Cascade would earn if it had perfect information about the market",
        "EVPI is the maximum amount Cascade should invest in R&D before entering the market",
        "EVPI equals the probability-weighted average of the best outcomes across all market scenarios",
        "EVPI of $2.75 million is the maximum Cascade should rationally pay for any information source — imperfect or perfect — that helps distinguish between market scenarios"
      ],
      "Explanation": "EVPI is the ceiling on the value of information. If a source of information — whether a perfect forecast or an imperfect pilot study — costs more than $2.75 million, Cascade should reject it and decide based on the prior probabilities alone. The pilot costs $1.5 million, which is below the EVPI ceiling, confirming positive expected net value from the pilot. Choice A describes EV with perfect information ($12.25M), not the value OF the information. Choice B is too narrow — EVPI applies to any information source, not just R&D. Choice C describes EV with PI, not EVPI itself. A common exam trap is to confuse EVPI with EV with perfect information.",
      "Topic": "EVPI interpretation",
      "Subtopic": "Information value",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "DA-11",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "EVPI",
        "information value"
      ],
      "Dependencies": []
    }
  ]
},
  {
  "CaseID": "CBQ22-C7",
  "Title": "Transfer Pricing Dispute at Halcyon Group",
  "SectionTags": [
    "C"
  ],
  "BlueprintDomain": "Decision Analysis",
  "BlueprintObjectives": [
    "Determine the minimum transfer price from the selling division's perspective",
    "Determine the maximum transfer price from the buying division's perspective",
    "Evaluate the dual pricing approach when divisions have different tax rates",
    "Analyze the impact of idle capacity on transfer-pricing policy"
  ],
  "PrimaryCompetency": "Judgment",
  "EstimatedMinutes": 30,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Halcyon Group's Components Division manufactures specialized circuit boards used by its Assembly Division. The Components Division currently has idle capacity and can produce additional units at a variable cost of $22 per unit. The external market price for comparable boards is $35 per unit. The Assembly Division can purchase equivalent boards from an outside supplier at $33 per unit. The divisions operate in different tax jurisdictions — the Components Division at 21% and the Assembly Division at 30%. CFO Kenji Tanaka must resolve the transfer-pricing dispute that has stalled inter-divisional orders for three months.",
  "Industry": "Electronics manufacturing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Halcyon Group",
  "Stakeholder": "CFO Kenji Tanaka",
  "BusinessFunction": "Cost accounting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "transfer pricing",
    "dual pricing",
    "tax arbitrage",
    "idle capacity"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Compute minimum and maximum transfer prices under idle and full capacity",
    "Evaluate the negotiated transfer price range",
    "Analyze dual pricing as a resolution mechanism for divisional disputes",
    "Assess tax implications of cross-jurisdictional transfer pricing"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-C7-E1",
      "CaseID": "CBQ22-C7",
      "Type": "table",
      "Title": "Exhibit 1 — Divisional Financial Summary",
      "Purpose": "Provides each division's cost structure, capacity utilization, and current financial performance for transfer-price analysis.",
      "ReferencedBy": [
        "CBQ22-C7-Q1",
        "CBQ22-C7-Q2",
        "CBQ22-C7-Q5"
      ],
      "Headers": [
        "Item",
        "Components Division",
        "Assembly Division"
      ],
      "Rows": [
        [
          "Variable cost per unit",
          "$22.00",
          "$48.00 (excl. circuit board)"
        ],
        [
          "Fixed cost per unit (allocated)",
          "$14.00",
          "$20.00"
        ],
        [
          "External purchase price (circuit board)",
          "N/A",
          "$33.00"
        ],
        [
          "Market selling price (circuit board)",
          "$35.00",
          "N/A"
        ],
        [
          "Current capacity utilization",
          "70%",
          "85%"
        ],
        [
          "Units needed per period",
          "5,000",
          "5,000"
        ],
        [
          "Tax rate",
          "21%",
          "30%"
        ]
      ],
      "DataFormat": "USD per unit; capacity as percentage of maximum",
      "AccuracyCheck": "Components has 30% idle capacity = 30% of max; at 5,000 units needed, sufficient idle capacity exists"
    },
    {
      "ExhibitID": "CBQ22-C7-E2",
      "CaseID": "CBQ22-C7",
      "Type": "table",
      "Title": "Exhibit 2 — Tax and Margin Comparison",
      "Purpose": "Shows the after-tax impact of different transfer prices on each division's profitability and the consolidated entity.",
      "ReferencedBy": [
        "CBQ22-C7-Q4",
        "CBQ22-C7-Q5",
        "CBQ22-C7-Q6"
      ],
      "Headers": [
        "Transfer Price",
        "Components Division After-Tax CM",
        "Assembly Division After-Tax Profit",
        "Consolidated After-Tax Impact"
      ],
      "Rows": [["$22.00 (variable cost)","$0","$38,500","$38,500 — benefit taxed at 30% in Assembly; lowest after-tax among feasible prices"],["$27.50 (midpoint)","$21,725","$19,250","$40,975 — benefit split between divisions"],["$33.00 (external price)","$43,450","$0","$43,450 — maximum after-tax benefit; surplus taxed at 21% in Components"],["$35.00 (market price)","$51,350 (only if Assembly accepted)","−$7,000 (worse than external)","$0 — Assembly rejects; no transfer"]],
      "DataFormat": "After-tax amounts at stated transfer prices for 5,000 units",
      "AccuracyCheck": "Components after-tax CM = (TP − $22.00) × 5,000 × (1 − 0.21); Assembly impact = ($33.00 − TP) × 5,000 × (1 − 0.30). Verified: at $28.50 → $25,675 / $15,750; at $33.00 → $43,450 / $0; at $22.00 → $0 / $38,500. At $35.00 Assembly is worse than external sourcing (−$7,000) so no transfer occurs."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-C7-Q1",
      "Type": "numeric",
      "Prompt": "Enter the minimum transfer price per unit that the Components Division should accept, given its idle capacity.",
      "Correct": "22",
      "Explanation": "Under the general transfer-pricing rule, the minimum price = variable cost + opportunity cost. With idle capacity (30% unused), the Components Division sacrifices no external sales by producing internally — opportunity cost = $0. Therefore, the minimum transfer price = $22.00 + $0 = $22.00 per unit. Any price above $22.00 contributes positively to the Components Division's contribution margin. The division would prefer the market price ($35), but $22 is the floor below which it loses money on each transferred unit. A common error is to include allocated fixed costs ($14) in the minimum — fixed costs are irrelevant because they do not change with the transfer decision.",
      "Topic": "Transfer pricing",
      "Subtopic": "Minimum price computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "DA-09: Transfer Price Minimum = Variable Cost + Opportunity Cost",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "transfer pricing",
        "minimum"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C7-Q2",
      "Type": "numeric",
      "Prompt": "Enter the maximum transfer price per unit that the Assembly Division should be willing to pay.",
      "Correct": "33",
      "Explanation": "The maximum transfer price equals the cost the buying division would incur from the best external alternative. The Assembly Division can purchase equivalent circuit boards from an outside supplier at $33.00 per unit. Therefore, the maximum transfer price = $33.00. Any internal transfer price above $33.00 would make the Assembly Division worse off than buying externally — the division would rationally reject the transfer. The range for a mutually beneficial transfer is $22.00 ≤ TP ≤ $33.00. The Assembly Division's own variable cost ($48 excluding the board) and fixed cost ($20) are irrelevant to the maximum price — they are incurred regardless of the source of the circuit board.",
      "Topic": "Transfer pricing",
      "Subtopic": "Maximum price computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "Transfer Price Maximum = Cost of external purchase (best alternative)",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "transfer pricing",
        "maximum"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C7-Q3",
      "Type": "select",
      "Prompt": "What is the negotiated transfer price range within which both divisions benefit from the internal transfer?",
      "Correct": "C",
      "Choices": [
        "$22.00 to $35.00 — from the Components Division's variable cost to the market selling price",
        "$14.00 to $33.00 — from the Components Division's fixed cost to the Assembly Division's external purchase price",
        "$22.00 to $33.00 — from the Components Division's variable cost (floor) to the Assembly Division's external purchase price (ceiling)",
        "$28.50 to $35.00 — the midpoint of the range to the market price"
      ],
      "Explanation": "The negotiated range is bounded by the seller's minimum ($22.00 = variable cost with idle capacity) and the buyer's maximum ($33.00 = external purchase price). Any transfer price within this range improves both divisions' results relative to their outside alternatives. The Components Division earns positive CM at any price above $22.00, and the Assembly Division saves money at any price below $33.00. At $22.00, the Components Division breaks even on the transfer and the Assembly Division captures the full $11 benefit. At $33.00, the Assembly Division breaks even and the Components captures the benefit. The midpoint ($27.50) splits the $11 surplus equally. Choice A is too wide — the $35 market price exceeds the buyer's maximum. Choice B uses fixed cost, which is irrelevant.",
      "Topic": "Negotiated range",
      "Subtopic": "Range identification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "negotiated range",
        "bilateral benefit"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C7-Q4",
      "Type": "select",
      "Prompt": "Why might Halcyon adopt a dual pricing system for this transfer?",
      "Correct": "D",
      "Choices": [
        "Dual pricing is required by GAAP for all intercompany transfers",
        "Dual pricing allows both divisions to report the market price, simplifying performance evaluation",
        "Dual pricing eliminates the need for a transfer price entirely",
        "Dual pricing lets the selling division record revenue at one price (e.g., market) and the buying division record cost at another (e.g., variable cost), resolving the dispute when no single price satisfies both divisions"
      ],
      "Explanation": "Dual pricing records two different prices for the same internal transaction: the selling division (Components) credits revenue at the market price ($35) while the buying division (Assembly) debits inventory at variable cost ($22) or another agreed price. The corporate office absorbs the difference as an intercompany elimination. This resolves the dispute because neither division is forced to accept a price that makes it worse off — Components gets market-price revenue and Assembly gets below-market cost. The consolidated entity benefits from the $11 per-unit savings ($33 external − $22 internal) without any division bearing a loss. Choice A is wrong: GAAP requires elimination of intercompany transactions but does not mandate dual pricing. Choice C is incorrect: a transfer price still exists for each division's books.",
      "Topic": "Dual pricing",
      "Subtopic": "Rationale",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "dual pricing",
        "dispute resolution"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C7-Q5",
      "Type": "multi",
      "Prompt": "Which THREE statements about the tax implications of the transfer are correct? Select exactly three.",
      "Correct": [
        "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% — the lower-rate jurisdiction",
        "The consolidated entity benefits when the selling division (21% tax rate) records more income than the buying division (30% tax rate) because the tax savings on the incremental income exceed the tax cost",
        "If Halcyon uses a cost-based transfer price of $22, the Assembly Division captures all the savings in its 30% tax jurisdiction, resulting in higher consolidated taxes than a market-based price"
      ],
      "Choices": {
        "A": "A higher transfer price shifts more pre-tax profit to the Components Division, which pays tax at 21% — the lower-rate jurisdiction",
        "B": "The tax rate difference is irrelevant because consolidated financial statements eliminate all intercompany transactions",
        "C": "The consolidated entity benefits when the selling division (21% tax rate) records more income than the buying division (30% tax rate) because the tax savings on the incremental income exceed the tax cost",
        "D": "Transfer prices must always equal the market price to comply with IRS arm's-length requirements",
        "E": "If Halcyon uses a cost-based transfer price of $22, the Assembly Division captures all the savings in its 30% tax jurisdiction, resulting in higher consolidated taxes than a market-based price"
      },
      "Explanation": "Statement A is correct: shifting profit to the 21% jurisdiction saves 9 cents per dollar of profit versus the 30% jurisdiction. Statement C is correct: when the selling division (21%) records the $11 surplus per unit, the tax on that surplus is $11 × 0.21 = $2.31, versus $11 × 0.30 = $3.30 if recorded by Assembly — a $0.99 per-unit tax saving. Statement E is correct: at a $22 cost-based price, the Assembly Division's cost is $22 (not $33 external), creating $11 of savings per unit taxed at 30% = $3.30 in tax. At a $35 market price, Components records the $13 surplus ($35 − $22) taxed at 21% = $2.73 — lower consolidated tax. Statement B is wrong: while intercompany profit is eliminated in consolidation, the tax jurisdiction allocation affects consolidated tax expense. Statement D is incorrect: the arm's-length standard applies to related-party transactions for tax purposes, but Halcyon can justify cost-based pricing if it has economic substance.",
      "Topic": "Transfer pricing",
      "Subtopic": "Tax implications",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "tax arbitrage",
        "transfer pricing"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C7-Q6",
      "Type": "select",
      "Prompt": "Which transfer-pricing recommendation should Kenji implement?",
      "Correct": "B",
      "Choices": [
        "Set the transfer price at $35.00 (market price) to fairly compensate the Components Division",
        "Implement dual pricing at $35.00 for the Components Division and $22.00 for the Assembly Division, with the corporate office absorbing the difference — this resolves the dispute, maximizes consolidated after-tax income, and incentivizes both divisions to transfer internally",
        "Set the transfer price at $22.00 (variable cost) to maximize the Assembly Division's profitability",
        "Require the Assembly Division to buy externally at $33.00 to maintain divisional autonomy"
      ],
      "Explanation": "Dual pricing at $35/$22 is the optimal resolution. The Components Division records revenue at the market price ($35), earning full market compensation — it has no incentive to resist the transfer. The Assembly Division records cost at variable ($22), well below its external alternative ($33) — it has strong incentive to buy internally. The consolidated entity captures the full $11 per-unit savings ($33 external − $22 internal), and the tax benefit is maximized because the $13 surplus at the selling division ($35 − $22) is taxed at the lower 21% rate. The corporate intercompany elimination absorbs the $13 dual-pricing gap. Choice A creates an internal price above the Assembly's external alternative ($35 > $33), causing the Assembly to reject the transfer. Choice C gives Components zero profit — it will refuse. Choice D wastes idle capacity and sacrifices $11 per unit of consolidated savings.",
      "Topic": "Transfer pricing",
      "Subtopic": "Recommendation",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "recommendation",
        "dual pricing"
      ],
      "Dependencies": [
        "CBQ22-C7-Q1",
        "CBQ22-C7-Q2",
        "CBQ22-C7-Q5"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-C8",
  "Title": "Special Order with Hidden Costs at Precision Fabricators",
  "SectionTags": [
    "C"
  ],
  "BlueprintDomain": "Decision Analysis",
  "BlueprintObjectives": [
    "Identify relevant costs in a special-order pricing decision",
    "Compute the net financial impact of accepting a special order",
    "Apply opportunity cost analysis to capacity-constrained special orders",
    "Determine the minimum acceptable price for a special order"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Precision Fabricators has received a one-time special order for 2,000 precision brackets at $38.00 each — well below the normal selling price of $55.00. The plant is currently operating at 89% of practical capacity. The order requires a special setup costing $4,200, uses $12.00 of variable materials per unit, and would displace $9,300 of regular contribution margin from diverted production. VP of Operations Lisa Park must decide whether the order is financially attractive.",
  "Industry": "Metal fabrication",
  "CompanyType": "Manufacturer",
  "CompanyName": "Precision Fabricators",
  "Stakeholder": "VP of Operations Lisa Park",
  "BusinessFunction": "Cost accounting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "special order",
    "relevant costing",
    "opportunity cost",
    "capacity analysis"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Distinguish relevant from irrelevant costs in a special-order scenario",
    "Compute the net contribution margin from a special order including opportunity costs",
    "Apply the minimum-price rule with constrained capacity",
    "Evaluate qualitative factors in special-order acceptance"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-C8-E1",
      "CaseID": "CBQ22-C8",
      "Type": "table",
      "Title": "Exhibit 1 — Standard Cost Card",
      "Purpose": "Provides the per-unit cost structure for normal production, used to identify variable and fixed cost components.",
      "ReferencedBy": [
        "CBQ22-C8-Q1",
        "CBQ22-C8-Q2",
        "CBQ22-C8-Q5"
      ],
      "Headers": [
        "Cost Element",
        "Per Unit",
        "Behavior"
      ],
      "Rows": [["Direct materials","$12.00","Variable"],["Direct labor","$8.50","Variable"],["Variable overhead","$3.50","Variable"],["Fixed overhead (allocated)","$11.00","Fixed"],["Total standard cost","$35.00","Mixed"],["Normal selling price","$55.00","—"],["Normal contribution margin","$31.00","—"]],
      "DataFormat": "USD per unit; behavior indicates cost response to volume changes",
      "AccuracyCheck": "Variable cost per unit = $12.00 + $8.50 + $3.50 = $24.00; Normal CM = $55.00 − $24.00 = $31.00; Total standard cost = $24.00 + $11.00 = $35.00. Consistent."
    },
    {
      "ExhibitID": "CBQ22-C8-E2",
      "CaseID": "CBQ22-C8",
      "Type": "table",
      "Title": "Exhibit 2 — Capacity and Opportunity Cost",
      "Purpose": "Provides capacity utilization data and quantifies the opportunity cost of diverting regular production to fill the special order.",
      "ReferencedBy": [
        "CBQ22-C8-Q3",
        "CBQ22-C8-Q4",
        "CBQ22-C8-Q6"
      ],
      "Headers": [
        "Item",
        "Value"
      ],
      "Rows": [["Practical capacity","15,000 units per year"],["Current production","13,300 units per year (89%)"],["Available capacity","1,700 units"],["Special order quantity","2,000 units"],["Regular CM per unit (displaced)","$31.00"],["Total opportunity cost (displaced CM)","$9,300"],["Special order setup cost","$4,200"]],
      "DataFormat": "Units and USD; opportunity cost = displaced units × CM per unit",
      "AccuracyCheck": "Available capacity 1,700 < order 2,000 → 300 units of regular production displaced; opportunity cost = 300 × $31.00 = $9,300. 13,300 + 1,700 = 15,000 practical capacity; 13,300/15,000 = 88.7% ≈ 89%."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-C8-Q1",
      "Type": "numeric",
      "Prompt": "Enter the relevant cost per unit for producing the special order, including variable cost, opportunity cost allocation, and setup cost allocation.",
      "Correct": "30.75",
      "Explanation": "Relevant cost per unit = Variable cost + (Opportunity cost + Setup cost) ÷ units. Variable cost = $12.00 + $8.50 + $3.50 = $24.00. The 2,000-unit order exceeds the 1,700 units of available capacity, so 300 units of regular production are displaced. Opportunity cost = 300 × $31.00 = $9,300. Setup = $4,200. Relevant cost per unit = $24.00 + ($9,300 + $4,200) ÷ 2,000 = $24.00 + $6.75 = $30.75. The $38.00 offer exceeds $30.75, contributing $7.25 per unit. The $11.00 fixed-overhead allocation is irrelevant — total fixed cost does not change with the order. A common error is to include it, or to ignore the opportunity cost of displaced regular sales.",
      "Topic": "Relevant costing",
      "Subtopic": "Special order cost computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "Relevant Cost = Variable Cost + (Opportunity Cost + Incremental Fixed Cost) ÷ Units",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "relevant costing",
        "special order"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C8-Q2",
      "Type": "numeric",
      "Prompt": "Enter the net financial impact (gain or loss) from accepting the special order, in dollars.",
      "Correct": "14500",
      "Explanation": "Net gain = (Special order price − Relevant cost per unit) × Units = ($38.00 − $30.75) × 2,000 = $7.25 × 2,000 = $14,500. Alternatively: revenue $38.00 × 2,000 = $76,000 less variable cost $24.00 × 2,000 = $48,000, less opportunity cost $9,300, less setup $4,200 → $76,000 − $61,500 = $14,500. The positive result confirms the order is financially attractive: it adds $14,500 of incremental profit above all relevant costs. A common trap is to ignore the $9,300 opportunity cost, which would overstate the gain to $23,800.",
      "Topic": "Special order analysis",
      "Subtopic": "Net impact computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "Net Gain = Revenue − Variable Costs − Opportunity Cost − Incremental Fixed Costs",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "net impact",
        "special order"
      ],
      "Dependencies": [
        "CBQ22-C8-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-C8-Q3",
      "Type": "select",
      "Prompt": "What is the minimum price per unit Precision Fabricators should accept for the special order?",
      "Correct": "A",
      "Choices": ["$30.75 — the relevant cost including variable cost, opportunity cost, and setup cost per unit", "$24.00 — the variable cost per unit, because fixed costs are irrelevant", "$35.00 — the total standard cost per unit", "$38.00 — the offered price, which is the only relevant benchmark"],
      "Explanation": "The minimum acceptable price equals the relevant cost per unit: variable cost $24.00 + opportunity cost $9,300 ÷ 2,000 = $4.65 + setup $4,200 ÷ 2,000 = $2.10 → $30.75. Below this price Precision loses money on the order after covering all incremental and opportunity costs. Choice B ($24.00) ignores opportunity and setup costs. Choice C ($35.00) wrongly includes the allocated fixed-overhead allocation. Choice D is the offered price, not the minimum threshold.",
      "Topic": "Minimum price rule",
      "Subtopic": "Special order pricing",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "minimum price",
        "relevant cost"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C8-Q4",
      "Type": "select",
      "Prompt": "Which cost represents the opportunity cost of accepting the special order?",
      "Correct": "B",
      "Choices": ["The $11.00 per unit fixed overhead allocation that will continue regardless of the order", "The $9,300 in regular contribution margin that Precision sacrifices by diverting 300 units of regular production", "The $4,200 setup cost that must be incurred to produce the special order", "The $35.00 total standard cost per unit for the special order units"],
      "Explanation": "Opportunity cost is the contribution margin foregone from the next-best use of the constrained resource. Because the 2,000-unit order exceeds the 1,700 units of available capacity, 300 regular units are displaced, sacrificing 300 × $31.00 = $9,300 of regular contribution margin (the normal CM per unit from Exhibit 1). Choice A describes a sunk/committed fixed cost — fixed overhead continues regardless. Choice C is an incremental cost specific to the order, not an opportunity cost. Choice D is the absorption cost, which includes irrelevant fixed allocations. A common trap is to confuse opportunity cost with incremental fixed costs.",
      "Topic": "Opportunity cost",
      "Subtopic": "Identification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "opportunity cost",
        "identification"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C8-Q5",
      "Type": "multi",
      "Prompt": "Which THREE costs are relevant to Precision Fabricators' special-order decision? Select exactly three.",
      "Correct": ["The $12.00 per unit variable material cost that will be incurred only if the order is accepted","The $9,300 in displaced regular contribution margin that Precision sacrifices by filling the order","The $4,200 setup cost specific to the special order that would not exist without it"],
      "Choices": {
        "A": "The $12.00 per unit variable material cost that will be incurred only if the order is accepted",
        "B": "The $11.00 per unit fixed overhead allocation that is assigned to all units regardless of the order",
        "C": "The $9,300 in displaced regular contribution margin that Precision sacrifices by filling the order",
        "D": "The $55.00 normal selling price because it establishes the value of the brackets",
        "E": "The $4,200 setup cost specific to the special order that would not exist without it"
      },
      "Explanation": "Relevant costs are future costs that differ between accepting and rejecting the order. The $12.00 variable material (A) is incurred only if the order is produced. The $9,300 displaced CM (C) is the lost contribution from the 300 regular units pushed out because the order exceeds available capacity. The $4,200 setup (E) is incremental to this order. Choice B is irrelevant: the $11.00/unit fixed overhead is allocated to all production and does not change with the order. Choice D is irrelevant: the normal selling price is a revenue parameter for regular sales, not a cost of the order. A common error is to include allocated fixed costs in relevant-cost analysis.",
      "Topic": "Relevant costing",
      "Subtopic": "Cost identification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "relevant costing",
        "cost identification"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-C8-Q6",
      "Type": "select",
      "Prompt": "Which recommendation should Lisa present to the CFO?",
      "Correct": "C",
      "Choices": ["Reject the order because $38.00 is below the $55.00 normal selling price and would undermine pricing integrity", "Accept the order at $38.00 with no conditions, because any price above variable cost contributes to fixed costs", "Accept the order at $38.00 — it covers all relevant costs ($30.75 per unit) and generates $14,500 in incremental profit, provided Precision confirms the displaced regular sales can be rescheduled without customer penalties and the order does not set a precedent for future below-market pricing", "Accept the order only if the customer pays $55.00 — the standard price — because all customers should be treated equally"],
      "Explanation": "Choice C is correct: the $38.00 price exceeds the $30.75 relevant cost, yielding $14,500 of incremental profit, while acknowledging the qualitative risks — displaced regular customers must be rescheduled without penalties (otherwise the opportunity cost rises and the gain shrinks) and the discount must not establish a below-market pricing precedent. Choice A overstates the risk: $38.00 is above relevant cost even though it is below the $55.00 normal price. Choice B ignores the qualitative risks. Choice D is unrealistic — the customer offered $38.00 and insisting on $55.00 would likely lose the order entirely.",
      "Topic": "Special order",
      "Subtopic": "Recommendation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "recommendation",
        "special order"
      ],
      "Dependencies": [
        "CBQ22-C8-Q1",
        "CBQ22-C8-Q2"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-A6",
  "Title": "DuPont Decomposition at Sentinel Defense",
  "SectionTags": [
    "A"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "BlueprintObjectives": [
    "Compute ROE and decompose it using the DuPont identity to isolate profitability, efficiency, and leverage drivers",
    "Evaluate earnings quality by reconciling net income to operating cash flow and analyzing accrual patterns",
    "Interpret receivables aging trends as leading indicators of revenue quality risk"
  ],
  "PrimaryCompetency": "Analysis",
  "EstimatedMinutes": 35,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Sentinel Defense Systems' CFO Maria Santos must explain to the board why ROE fell from approximately 18.4% in Year 1 to 6.4% in Year 3 despite a 12% revenue increase. The controller has prepared three-year condensed financials and a receivables aging report. Maria needs a full DuPont decomposition to isolate which component — profitability, asset efficiency, or financial leverage — drove the decline, and an earnings-quality review to determine whether the reported improvement in operations is sustainable.",
  "Industry": "Aerospace and defense",
  "CompanyType": "Manufacturer",
  "CompanyName": "Sentinel Defense Systems",
  "Stakeholder": "CFO Maria Santos",
  "BusinessFunction": "Financial reporting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "DuPont",
    "ROE",
    "earnings quality",
    "receivables aging",
    "financial statement analysis"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Compute ROE from condensed financial statements using average equity",
    "Decompose ROE into net profit margin, asset turnover, and equity multiplier components",
    "Identify the primary driver of ROE change through component analysis",
    "Detect earnings-quality red flags from accrual-to-cash divergences and receivables trends",
    "Select board-level findings supported by converging financial signals",
    "Map specific red flags to their underlying risk categories"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-A6-E1",
      "CaseID": "CBQ22-A6",
      "Type": "table",
      "Title": "Exhibit 1 — Three-Year Condensed Financials",
      "Purpose": "Provides income statement and balance sheet data for computing ROE, DuPont components, and earnings-quality ratios across three years.",
      "ReferencedBy": [
        "CBQ22-A6-Q1",
        "CBQ22-A6-Q2",
        "CBQ22-A6-Q4"
      ],
      "Headers": [
        "Item",
        "Year 1",
        "Year 2",
        "Year 3"
      ],
      "Rows": [
        [
          "Net sales ($000s)",
          "$250,000",
          "$280,000",
          "$313,600"
        ],
        [
          "Cost of goods sold ($000s)",
          "$155,000",
          "$176,400",
          "$200,704"
        ],
        [
          "Gross profit ($000s)",
          "$95,000",
          "$103,600",
          "$112,896"
        ],
        [
          "Operating expenses ($000s)",
          "$68,000",
          "$81,200",
          "$99,968"
        ],
        [
          "Operating income ($000s)",
          "$27,000",
          "$22,400",
          "$12,928"
        ],
        [
          "Interest expense ($000s)",
          "$2,500",
          "$2,800",
          "$3,136"
        ],
        [
          "Pre-tax income ($000s)",
          "$24,500",
          "$19,600",
          "$9,792"
        ],
        [
          "Income tax (25%)",
          "$6,125",
          "$4,900",
          "$2,448"
        ],
        [
          "Net income ($000s)",
          "$18,375",
          "$14,700",
          "$7,344"
        ],
        [
          "Cash dividends ($000s)",
          "$7,350",
          "$5,880",
          "$2,938"
        ],
        [
          "Accounts receivable ($000s)",
          "$28,000",
          "$39,200",
          "$67,500"
        ],
        [
          "Inventories ($000s)",
          "$35,000",
          "$42,000",
          "$50,400"
        ],
        [
          "Total current assets ($000s)",
          "$80,000",
          "$98,000",
          "$130,900"
        ],
        [
          "Net fixed assets ($000s)",
          "$120,000",
          "$122,000",
          "$119,100"
        ],
        [
          "Total assets ($000s)",
          "$200,000",
          "$220,000",
          "$250,000"
        ],
        [
          "Total current liabilities ($000s)",
          "$35,000",
          "$40,000",
          "$48,000"
        ],
        [
          "Long-term debt ($000s)",
          "$65,000",
          "$70,000",
          "$82,000"
        ],
        [
          "Total liabilities ($000s)",
          "$100,000",
          "$110,000",
          "$130,000"
        ],
        [
          "Total common equity ($000s)",
          "$100,000",
          "$110,000",
          "$120,000"
        ],
        [
          "Preferred dividends ($000s)",
          "$0",
          "$0",
          "$0"
        ]
      ],
      "DataFormat": "USD thousands; 365-day year; tax rate 25% flat; equity is common shareholders' equity only",
      "AccuracyCheck": "Year 3 ROE = 7,344 / ((110,000 + 120,000)/2) = 7,344 / 115,000 = 6.39%. Year 3 EM = 235,000 / 115,000 = 2.04. Year 3 NPM = 7,344 / 313,600 = 2.34%. Year 1 ROE (avg equity (90,000 + 100,000)/2 = 95,000) = 18,375 / 95,000 = 19.34%; Year 1 NPM = 7.35%; Year 1 EM = 210,000 / 95,000 = 2.21. Exhibit rows themselves are internally consistent (totals add; aging 44% past 60 days confirmed)."
    },
    {
      "ExhibitID": "CBQ22-A6-E2",
      "CaseID": "CBQ22-A6",
      "Type": "table",
      "Title": "Exhibit 2 — Receivables Aging Report (Year 3)",
      "Purpose": "Provides the aging distribution of year-end receivables for earnings-quality analysis and DSO computation.",
      "ReferencedBy": [
        "CBQ22-A6-Q3",
        "CBQ22-A6-Q4",
        "CBQ22-A6-Q5",
        "CBQ22-A6-Q6"
      ],
      "Headers": [
        "Aging Category",
        "Balance ($000s)",
        "Percentage"
      ],
      "Rows": [
        [
          "Current (0–30 days)",
          "$20,250",
          "30.0%"
        ],
        [
          "31–60 days",
          "$17,550",
          "26.0%"
        ],
        [
          "61–90 days",
          "$14,850",
          "22.0%"
        ],
        [
          "Over 90 days",
          "$14,850",
          "22.0%"
        ],
        [
          "Total receivables",
          "$67,500",
          "100.0%"
        ]
      ],
      "DataFormat": "USD thousands; aging as of Year 3 balance sheet date",
      "AccuracyCheck": "20,250 + 17,550 + 14,850 + 14,850 = 67,500 ✓; 44% past 60 days"
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-A6-Q1",
      "Type": "numeric",
      "Prompt": "Compute Sentinel's Year 3 return on equity (ROE) using average common shareholders' equity. Enter the result as a percentage rounded to two decimal places.",
      "Correct": "6.39",
      "Explanation": "ROE = Net Income / Average Common Equity. Year 3 net income = $7,344K; average common equity = ($110,000K + $120,000K) / 2 = $115,000K. ROE = $7,344 / $115,000 = 6.39%. The decline from Year 1 (18,375 / 95,000 = 19.34% on average equity) reflects the collapse of Year 3 net income to $7,344K despite higher revenue — an extreme margin compression. This is the starting point for the DuPont decomposition in Q2. A common trap is to use ending equity ($120,000K → 6.12%) instead of the average balance, or to carry forward the narrative Year 1 ROE.",
      "Topic": "Return on equity",
      "Subtopic": "ROE computation from condensed financials",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "FA-13: Return on Equity",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "ROE",
        "profitability"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-A6-Q2",
      "Type": "numeric",
      "Prompt": "Compute the three DuPont components for Year 3: net profit margin (NPM), total asset turnover (TAT), and equity multiplier (EM). Enter the equity multiplier rounded to two decimal places.",
      "Correct": "2.04",
      "Explanation": "The three DuPont components for Year 3 are: NPM = Net Income / Sales = $7,344K / $313,600K = 2.34%; TAT = Sales / Average Total Assets = $313,600K / [($220,000K + $250,000K) / 2] = $313,600K / $235,000K = 1.33; EM = Average Total Assets / Average Equity = $235,000K / $115,000K = 2.04. Product check: 2.34% × 1.33 × 2.04 = 6.39%, matching the ROE from Q1. The equity multiplier of 2.04 means Sentinel holds $2.04 of assets for each $1.00 of equity. Compared with Year 1 (EM = $210,000K / $95,000K = 2.21), leverage declined modestly, so the ROE collapse is driven by margin, not leverage. A common trap is to use ending balances instead of averages, which distorts both TAT and EM.",
      "Topic": "DuPont decomposition",
      "Subtopic": "Three-factor ROE breakdown",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "FA-14: DuPont Identity",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "DuPont",
        "decomposition"
      ],
      "Dependencies": [
        "CBQ22-A6-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-A6-Q3",
      "Type": "select",
      "Prompt": "Based on the DuPont decomposition, which component is the PRIMARY driver of Sentinel's ROE decline from Year 1 to Year 3?",
      "Correct": "C",
      "Choices": ["Declining total asset turnover — the company is generating fewer sales per dollar of invested assets", "Rising interest expense — debt servicing is consuming a larger share of operating income", "Contracting net profit margin — operating expenses grew 47% against 25% revenue growth, compressing NPM from 7.35% to 2.34%, which is the dominant force behind the ROE decline", "Increasing tax burden — the effective tax rate rose materially from Year 1 to Year 3"],
      "Explanation": "Decomposing the ROE change from Year 1 to Year 3: NPM fell from 18,375/250,000 = 7.35% to 7,344/313,600 = 2.34% — a 5.01 percentage-point contraction and by far the largest component move. Total asset turnover actually improved (Year 1: 250,000/210,000 = 1.19; Year 3: 313,600/235,000 = 1.33). The equity multiplier declined modestly (Year 1: 210,000/95,000 = 2.21; Year 3: 235,000/115,000 = 2.04). Operating expenses grew 47% ($68,000K → $99,968K) against 25% revenue growth, directly compressing the bottom line. The board should focus on operating-expense discipline; both asset efficiency and leverage moved favorably or mildly.",
      "Topic": "DuPont interpretation",
      "Subtopic": "Component attribution",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "FA-14: DuPont Identity",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "DuPont",
        "attribution"
      ],
      "Dependencies": [
        "CBQ22-A6-Q2"
      ]
    },
    {
      "ItemID": "CBQ22-A6-Q4",
      "Type": "select",
      "Prompt": "Which earnings-quality concern is MOST clearly supported by Exhibits 1 and 2 together?",
      "Correct": "A",
      "Choices": ["Accounts receivable grew 72% while net sales grew only 12% from Year 2 to Year 3, and 44% of receivables are past 60 days — revenue may include premature or channel-stuffed shipments that will not convert to cash", "Net income declined in absolute terms, which always signals deteriorating earnings quality regardless of the cause", "Operating expenses grew faster than sales, indicating that the company is liquidating long-lived assets to fund operations", "The dividend payout ratio increased, which reduces retained earnings and signals that management lacks confidence in future cash flows"],
      "Explanation": "The receivables aging in Exhibit 2 shows 44% of the $67.5M balance is past 60 days ($14.85M at 61–90 days + $14.85M over 90 days = $29.7M). Receivables growth of ($67,500 − $39,200) / $39,200 = 72.2% far outpaced the 12% sales growth from Year 2 to Year 3. This divergence — ballooning receivables with deteriorating aging — is the classic channel-stuffing fingerprint: goods shipped to fill orders sit uncollected, or side arrangements extend payment terms beyond economic substance. Net income declining (B) is a result, not a quality indicator. Operating-expense growth (C) is an efficiency issue, not an earnings-quality issue. Dividend payout changes (D) affect capital allocation, not revenue quality.",
      "Topic": "Earnings quality",
      "Subtopic": "Receivables-sales divergence",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "FA-05: Days Sales Outstanding",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "earnings quality",
        "receivables"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-A6-Q5",
      "Type": "multi",
      "Prompt": "Which three findings should Maria present to the board as converging evidence of earnings-quality risk? Select exactly three.",
      "Correct": ["Net profit margin contracted 5.01 percentage points despite 25% revenue growth, indicating cost growth is out of control and compressing bottom-line returns","Accounts receivable grew 72% against 12% sales growth, creating a $28.3M gap between bookings and collections that may signal channel stuffing or aggressive revenue recognition","44% of year-end receivables are past 60 days old ($29.7M), suggesting systemic collection deterioration rather than normal seasonal patterns for a defense contractor"],
      "Choices": {
        "A": "Net profit margin contracted 5.01 percentage points despite 25% revenue growth, indicating cost growth is out of control and compressing bottom-line returns",
        "B": "The equity multiplier declined from 2.22 to 2.00, indicating the company is underleveraged relative to its defense-industry peers and should increase debt",
        "C": "Accounts receivable grew 72% against 12% sales growth, creating a $28.3M gap between bookings and collections that may signal channel stuffing or aggressive revenue recognition",
        "D": "Total asset turnover improved from Year 1 to Year 3, confirming that operational efficiency gains are the primary driver of the ROE change",
        "E": "44% of year-end receivables are past 60 days old ($29.7M), suggesting systemic collection deterioration rather than normal seasonal patterns for a defense contractor",
        "F": "The company paid $2.9M in dividends despite declining earnings, which is unsustainable and indicates capital misallocation"
      },
      "Explanation": "Statements A, C, and E form the converging earnings-quality narrative: margin erosion (A — NPM collapsed from 7.35% to 2.34%, a 5.01-point contraction) shows the income-statement side; receivables outpacing sales (C — AR up 72% from Year 2 to Year 3 versus 12% sales growth, a $28.3M increase in the AR balance) shows the balance-sheet symptom; aging deterioration (E — 44% past 60 days, $29.7M) shows the cash-conversion consequence. Statement B misreads the leverage decline: a lower equity multiplier reduces financial risk, and recommending more debt while margins compress and collections deteriorate would be imprudent. Statement D is factually true (TAT improved) but is not an earnings-quality concern — it is the offset that keeps the ROE decline from being even steeper. Statement F overstates the concern: $2.9M of dividends against $7.3M of net income is a 40% payout — elevated, but not by itself dispositive evidence of capital misallocation.",
      "Topic": "Board reporting",
      "Subtopic": "Converging evidence selection",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "board reporting",
        "convergence"
      ],
      "Dependencies": [
        "CBQ22-A6-Q3",
        "CBQ22-A6-Q4"
      ]
    },
    {
      "ItemID": "CBQ22-A6-Q6",
      "Type": "match",
      "Prompt": "Match each earnings-quality red flag observed at Sentinel to the risk category it most directly indicates.",
      "LeftItems": [
        "Net profit margin declining despite revenue growth",
        "Receivables growing 72% against 25% sales growth",
        "44% of receivables past 60 days with $14.9M over 90 days",
        "Operating expenses growing 47% against 25% revenue growth"
      ],
      "RightItems": [
        "Margin erosion from uncontrolled cost structure",
        "Potential premature or channel-stuffed revenue recognition",
        "Cash conversion risk and possible future write-offs",
        "Operational inefficiency or SGA bloat independent of revenue quality",
        "Working capital mismanagement",
        "Tax planning opportunity",
        "Capital structure optimization"
      ],
      "Correct": {
        "Net profit margin declining despite revenue growth": "Margin erosion from uncontrolled cost structure",
        "Receivables growing 72% against 25% sales growth": "Potential premature or channel-stuffed revenue recognition",
        "44% of receivables past 60 days with $14.9M over 90 days": "Cash conversion risk and possible future write-offs",
        "Operating expenses growing 47% against 25% revenue growth": "Operational inefficiency or SGA bloat independent of revenue quality"
      },
      "Explanation": "Each red flag maps to a specific risk category: margin decline (NPM 7.35% → 2.34%) reflects cost growth outpacing revenue — a margin-erosion signal. The receivables-sales divergence (72% vs. 12% growth) is the textbook indicator of premature revenue recognition or channel stuffing — goods shipped but not yet earned. The aging concentration (44% past 60 days, $14.9M over 90 days) signals collection risk and potential bad-debt exposure — cash that may never convert. The operating-expense growth (47% vs. 25% revenue) indicates internal cost-control failure that is separate from revenue-quality concerns — it depresses margins but does not itself indicate fraudulent revenue. Distractors: working capital mismanagement conflates multiple signals; tax planning is not indicated (flat 25% rate); capital structure optimization is unrelated to earnings quality. Match key unchanged.",
      "Topic": "Red flag classification",
      "Subtopic": "Risk category mapping",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "red flags",
        "classification"
      ],
      "Dependencies": [
        "CBQ22-A6-Q4",
        "CBQ22-A6-Q5"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-A5",
  "Title": "Sustainable Growth Rate at Harborline Diagnostics",
  "SectionTags": [
    "A"
  ],
  "BlueprintDomain": "Financial Statement Analysis",
  "BlueprintObjectives": [
    "Compute the sustainable growth rate using the Higgins model",
    "Quantify the growth gap between target growth and sustainable growth",
    "Evaluate whether a company can fund planned expansion without issuing new equity"
  ],
  "PrimaryCompetency": "Analysis",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Harborline Diagnostics' CFO Dr. Rajiv Anand must decide whether to pursue a $45M expansion without issuing new equity. The company's ROE is 22%, dividend payout is 40%, and total equity is $180M. The board has asked whether the sustainable growth rate can support the planned 15% revenue growth. Dr. Anand must compute the sustainable growth rate, quantify any growth gap, and recommend which financial levers — if any — can bridge the shortfall.",
  "Industry": "Medical diagnostics",
  "CompanyType": "Manufacturer",
  "CompanyName": "Harborline Diagnostics",
  "Stakeholder": "CFO Dr. Rajiv Anand",
  "BusinessFunction": "Corporate finance",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "sustainable growth rate",
    "Higgins",
    "dividend policy",
    "retention ratio",
    "growth financing"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Compute the sustainable growth rate from ROE and the retention ratio",
    "Quantify the dollar and percentage gap between target growth and sustainable capacity",
    "Evaluate whether existing financial policies can support planned expansion",
    "Identify dividend policy levers that affect growth capacity",
    "Select the combination of financial levers most likely to bridge a growth gap",
    "Draft a recommendation memo integrating SGR analysis with financing constraints"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-A5-E1",
      "CaseID": "CBQ22-A5",
      "Type": "table",
      "Title": "Exhibit 1 — Retention and Payout Schedule",
      "Purpose": "Provides the dividend policy parameters and equity base for computing the sustainable growth rate and retention ratio.",
      "ReferencedBy": [
        "CBQ22-A5-Q1",
        "CBQ22-A5-Q2",
        "CBQ22-A5-Q3"
      ],
      "Headers": [
        "Parameter",
        "Value"
      ],
      "Rows": [
        [
          "Return on equity (ROE)",
          "22.0%"
        ],
        [
          "Dividend payout ratio",
          "40.0%"
        ],
        [
          "Retention ratio (b)",
          "60.0%"
        ],
        [
          "Total common equity (beginning of year)",
          "$180,000,000"
        ],
        [
          "Net income (trailing twelve months)",
          "$39,600,000"
        ],
        [
          "Planned revenue growth rate",
          "15.0%"
        ],
        [
          "Planned capital expenditure",
          "$45,000,000"
        ],
        [
          "Total assets (current)",
          "$400,000,000"
        ],
        [
          "Total debt (current)",
          "$220,000,000"
        ],
        [
          "Debt-to-equity ratio",
          "1.22"
        ]
      ],
      "DataFormat": "USD; percentages rounded to one decimal; ROE computed as NI / beginning equity = $39.6M / $180M = 22.0%",
      "AccuracyCheck": "Retention ratio = 1 - 0.40 = 0.60; SGR = ROE × b = 22% × 0.60 = 13.2%"
    },
    {
      "ExhibitID": "CBQ22-A5-E2",
      "CaseID": "CBQ22-A5",
      "Type": "text",
      "Title": "Exhibit 2 — Board Request Email",
      "Purpose": "Provides the board's directive and financial context for the growth-funding decision.",
      "ReferencedBy": [
        "CBQ22-A5-Q4",
        "CBQ22-A5-Q5",
        "CBQ22-A5-Q6"
      ],
      "Body": "From: Patricia Voss, Board Chair\nTo: Dr. Rajiv Anand, CFO\nSubject: Q3 Capital Plan — Expansion Authorization Request\n\nRajiv — The board approved the $45M expansion in principle at the June meeting, contingent on your confirmation that we can fund it without issuing new equity. We want to preserve the current ownership structure for the potential strategic partner transaction in 2027. Please confirm whether our current growth capacity supports the 15% target, and if not, which levers within our existing financial policy you recommend pulling. We need your written recommendation by the July board session. Our current ROE is 22%, payout is 40%, and the board's policy is to maintain the D/E ratio below 1.5."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-A5-Q1",
      "Type": "numeric",
      "Prompt": "Compute Harborline's sustainable growth rate (SGR) using the Higgins model. Enter the result as a percentage rounded to two decimal places.",
      "Correct": "13.20",
      "Explanation": "SGR = ROE × Retention Ratio = 22.0% × 0.60 = 13.20%. The retention ratio is 1 minus the payout ratio (1 − 0.40 = 0.60). This means Harborline can grow equity-financed assets at 13.2% per year without issuing new equity or changing its dividend policy, assuming ROE and the payout ratio remain constant. The Higgins model implicitly assumes constant capital structure, constant dividend policy, and no new equity issuance — all conditions the board's email (Exhibit 2) explicitly wants to maintain. Any growth above 13.2% requires either reduced dividends, increased leverage, or new equity — each of which the board has constrained.",
      "Topic": "Sustainable growth rate",
      "Subtopic": "Higgins model computation",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "FA-21: Sustainable Growth Rate",
      "EstimatedMinutes": 4,
      "ExplanationVersion": 1,
      "Tags": [
        "SGR",
        "Higgins"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-A5-Q2",
      "Type": "numeric",
      "Prompt": "Compute the annual growth gap: the difference between Harborline's planned 15% growth rate and the sustainable growth rate. Enter the gap in percentage points rounded to two decimal places.",
      "Correct": "1.80",
      "Explanation": "Growth gap = Target growth − SGR = 15.00% − 13.20% = 1.80 percentage points. In dollar terms, the sustainable growth supports $180M × 13.2% = $23.76M in additional equity-financed assets, while 15% growth requires $180M × 15% = $27.0M — leaving a $3.24M annual equity shortfall. Over a multi-year expansion, this gap compounds: Year 2 sustainable equity addition would be $23.76M × 1.132 = $26.9M while 15% growth demands $27.0M × 1.15 = $31.05M, widening the gap. The 1.80-point gap is small enough that modest adjustments to any single lever — dividend payout, asset turnover, or operating margin — can close it, but no single lever alone may be sufficient if the board's constraints bind.",
      "Topic": "Growth gap analysis",
      "Subtopic": "Quantifying the shortfall",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "FA-21: Sustainable Growth Rate",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "growth gap",
        "SGR"
      ],
      "Dependencies": [
        "CBQ22-A5-Q1"
      ]
    },
    {
      "ItemID": "CBQ22-A5-Q3",
      "Type": "select",
      "Prompt": "Based on the SGR analysis, can Harborline sustain 15% growth without issuing new equity?",
      "Correct": "B",
      "Choices": [
        "Yes — 15% is well within the sustainable growth rate because ROE at 22% exceeds the cost of equity",
        "No — the 13.20% sustainable growth rate is below the 15% target by 1.80 percentage points, meaning the company would need to either increase retention, improve ROE, or accept a lower growth rate to avoid equity issuance",
        "Yes — the company can issue debt instead of equity because the D/E ratio of 1.22 is below the board's 1.5 ceiling",
        "No — the company must reduce dividends to zero because any payout above 0% makes growth impossible"
      ],
      "Explanation": "The SGR of 13.20% is the mathematical ceiling for equity-retained growth under current policies. At 15% target growth, Harborline falls 1.80 points short — meaning it cannot fund the expansion from internal equity generation alone while maintaining the 40% payout. Option C is tempting but misreads the analysis: increasing debt to fund growth changes the capital structure, which the board explicitly wants to preserve for the 2027 strategic partner transaction. The D/E ratio would rise above 1.5 if debt funds the gap. Option D overstates the constraint — zero dividends is not required; the gap can be closed by reducing the payout modestly (e.g., from 40% to approximately 27.3%) or by improving ROE through operational efficiency.",
      "Topic": "SGR interpretation",
      "Subtopic": "Sustainability assessment",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "FA-21: Sustainable Growth Rate",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "SGR",
        "sustainability"
      ],
      "Dependencies": [
        "CBQ22-A5-Q2"
      ]
    },
    {
      "ItemID": "CBQ22-A5-Q4",
      "Type": "select",
      "Prompt": "Which dividend policy adjustment would close the 1.80-point growth gap while maintaining the company's ability to service existing debt?",
      "Correct": "A",
      "Choices": [
        "Reduce the payout ratio from 40% to approximately 27.3%, increasing the retention ratio to 72.7% so that SGR = 22% × 0.727 = 16.0%, which exceeds the 15% target",
        "Eliminate dividends entirely to maximize retention, increasing SGR to 22.0% — well above the 15% target",
        "Maintain the 40% payout and issue a one-time special dividend to signal confidence before the expansion",
        "Increase the payout ratio to 50% to attract income-focused investors who will provide the equity gap through secondary offerings"
      ],
      "Explanation": "Closing the gap requires SGR ≥ 15%. Solving: 15% = 22% × b, so b = 0.6818, meaning payout = 1 − 0.6818 = 31.82%. Rounding up to a clean policy: reducing payout from 40% to approximately 27.3% (retention = 72.7%) yields SGR = 22% × 0.727 = 16.0%, which covers the 15% target with a 1-point buffer. Option B (eliminating dividends) is extreme and would damage stock price and investor confidence — the gap is modest and does not require zero dividends. Option C is counterproductive — a special dividend drains equity, making the growth gap worse. Option D contradicts the board's no-new-equity directive.",
      "Topic": "Dividend policy levers",
      "Subtopic": "Payout ratio adjustment",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "FA-22: Payout Ratio",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "dividend policy",
        "payout"
      ],
      "Dependencies": [
        "CBQ22-A5-Q3"
      ]
    },
    {
      "ItemID": "CBQ22-A5-Q5",
      "Type": "multi",
      "Prompt": "Which three levers could Dr. Anand recommend to close the growth gap while respecting the board's constraints (no new equity, D/E below 1.5)? Select exactly three.",
      "Correct": [
        "Reduce the dividend payout ratio from 40% to approximately 27–32%, increasing the retention ratio and directly raising the sustainable growth rate toward or above 15%",
        "Improve asset turnover by generating more sales per dollar of assets, which reduces the equity needed to support 15% growth and effectively raises SGR without changing payout or leverage",
        "Improve operating margin by reducing SG&A or COGS, which raises net income and therefore ROE, directly increasing the SGR numerator"
      ],
      "Choices": {
        "A": "Reduce the dividend payout ratio from 40% to approximately 27–32%, increasing the retention ratio and directly raising the sustainable growth rate toward or above 15%",
        "B": "Issue additional long-term debt up to the 1.5 D/E ceiling to fund the equity gap, since debt is not equity and the board only prohibits new equity issuance",
        "C": "Improve asset turnover by generating more sales per dollar of assets, which reduces the equity needed to support 15% growth and effectively raises SGR without changing payout or leverage",
        "D": "Reduce the planned capital expenditure from $45M to $25M to match the internal funding capacity, accepting a slower rollout",
        "E": "Improve operating margin by reducing SG&A or COGS, which raises net income and therefore ROE, directly increasing the SGR numerator",
        "F": "Issue new common equity through a private placement with the strategic partner, since the 2027 transaction will dilute ownership anyway"
      },
      "Explanation": "The three levers that raise SGR within the board's constraints are: (A) increasing retention by reducing payout, which directly raises the retention ratio; (C) improving asset turnover, which reduces the asset base needed per dollar of sales; and (E) improving operating margin, which raises net income and ROE. Option B is tempting — the D/E ratio of 1.22 leaves room to 1.5 — but the board's email explicitly states they want to preserve the ownership structure for the 2027 strategic partner transaction, and increasing leverage changes the capital structure that the partner is evaluating. Option D (cutting capex) does not raise SGR — it merely reduces the growth target. Option F contradicts the board's directive to avoid equity issuance.",
      "Topic": "Growth-gap levers",
      "Subtopic": "Multi-lever strategy",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "FA-21: Sustainable Growth Rate",
      "EstimatedMinutes": 6,
      "ExplanationVersion": 1,
      "Tags": [
        "growth levers",
        "multi-factor"
      ],
      "Dependencies": [
        "CBQ22-A5-Q4"
      ]
    },
    {
      "ItemID": "CBQ22-A5-Q6",
      "Type": "select",
      "Prompt": "Complete the recommendation memo: Which course of action best integrates Dr. Anand's analysis with the board's constraints?",
      "Correct": "D",
      "Choices": [
        "Recommend issuing $3.24M in new equity to close the gap — the dilution is immaterial and the board will accept it once the math is presented",
        "Recommend eliminating the dividend entirely, which raises SGR to 22% and provides ample headroom for 15% growth without any other changes",
        "Recommend reducing the expansion budget to $30M so that internal equity alone can fund it at the current SGR of 13.2%, with no policy changes required",
        "Recommend reducing the payout ratio from 40% to 30%, which raises SGR to 15.4% and covers the 15% target with a buffer; combined with modest margin-improvement initiatives, this approach preserves the ownership structure for the 2027 transaction while funding the expansion internally"
      ],
      "Explanation": "Option D integrates the SGR math with the board's constraint: reducing payout from 40% to 30% yields SGR = 22% × 0.70 = 15.4%, which exceeds the 15% target. The 0.4-point buffer accommodates minor ROE fluctuations. Combined with margin-improvement initiatives (operational efficiency that raises ROE further), this approach keeps the ownership structure clean for the 2027 strategic partner transaction. Option A violates the no-new-equity constraint. Option B (zero dividends) is extreme — the gap is 1.80 points, not 13.20 points. Option C (cutting capex) abandons the strategic expansion the board already approved in principle. The recommended approach demonstrates that the gap is closeable through policy adjustment alone, without structural changes the board opposes.",
      "Topic": "Recommendation integration",
      "Subtopic": "Memo completion",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "FA-21: Sustainable Growth Rate",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "recommendation",
        "memo"
      ],
      "Dependencies": [
        "CBQ22-A5-Q5"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-F7",
  "Title": "Earnings Pressure and Reserve Manipulation at Pinnacle Manufacturing",
  "SectionTags": [
    "F"
  ],
  "BlueprintDomain": "Professional Ethics",
  "BlueprintObjectives": [
    "Identify IMA ethical standards implicated by management-directed inventory reserve manipulation",
    "Apply the IMA resolution process when the immediate chain of command is involved",
    "Evaluate SOX certification exposure for officers aware of intentional misstatement",
    "Classify the manipulation using fraud-triangle theory and assess control deficiencies"
  ],
  "PrimaryCompetency": "Judgment",
  "EstimatedMinutes": 30,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Pinnacle Manufacturing's Division Controller Sam Whitfield discovers that the division president, under pressure to hit quarterly targets, has directed the inventory team to overstate the allowance for obsolescent inventory by $2.3M — effectively inflating operating income by reducing COGS. Sam must apply the IMA ethical decision model, evaluate SOX certification implications, and recommend a resolution path that protects both the company and his professional standing.",
  "Industry": "Industrial manufacturing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Pinnacle Manufacturing",
  "Stakeholder": "Division Controller Sam Whitfield",
  "BusinessFunction": "Financial reporting",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "IMA standards",
    "inventory reserves",
    "fraud triangle",
    "SOX 302",
    "ethical resolution"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Map inventory reserve manipulation to the four IMA ethical standards",
    "Apply the IMA resolution process when the immediate supervisor is involved in misconduct",
    "Identify which parties must be notified under SOX and IMA escalation protocols",
    "Evaluate SOX certification exposure when officers are aware of intentional misstatement",
    "Classify management-directed manipulation using fraud-triangle elements",
    "Map specific scenario facts to ethical standards and fraud indicators"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-F7-E1",
      "CaseID": "CBQ22-F7",
      "Type": "table",
      "Title": "Exhibit 1 — Inventory Reserve Analysis",
      "Purpose": "Provides the quantitative evidence of the reserve manipulation showing the gap between supported and recorded allowance levels.",
      "ReferencedBy": [
        "CBQ22-F7-Q1",
        "CBQ22-F7-Q3",
        "CBQ22-F7-Q5"
      ],
      "Headers": [
        "Reserve Component",
        "Supportable Amount",
        "Recorded Amount",
        "Variance"
      ],
      "Rows": [
        [
          "Slow-moving raw materials (90+ days)",
          "$1,200,000",
          "$1,800,000",
          "+$600,000"
        ],
        [
          "Obsolete finished goods (120+ days)",
          "$2,400,000",
          "$3,100,000",
          "+$700,000"
        ],
        [
          "Excess work-in-process",
          "$800,000",
          "$1,400,000",
          "+$600,000"
        ],
        [
          "Discontinued product line",
          "$500,000",
          "$1,000,000",
          "+$500,000"
        ],
        [
          "Total allowance for obsolescence",
          "$4,900,000",
          "$7,300,000",
          "+$2,300,000"
        ],
        [
          "Impact on COGS (reduction)",
          "",
          "$2,300,000",
          "+$2,300,000"
        ],
        [
          "Impact on operating income (inflation)",
          "",
          "$2,300,000",
          "+$2,300,000"
        ]
      ],
      "DataFormat": "USD; variance = Recorded minus Supportable; positive variance overstates the reserve",
      "AccuracyCheck": "600K + 700K + 600K + 500K = 2,300K ✓; overstatement reduces COGS by 2,300K, inflating operating income by 2,300K"
    },
    {
      "ExhibitID": "CBQ22-F7-E2",
      "CaseID": "CBQ22-F7",
      "Type": "text",
      "Title": "Exhibit 2 — Division President Email to Inventory Team",
      "Purpose": "Provides direct evidence of management direction to overstate reserves, establishing intent and the ethical violation.",
      "ReferencedBy": [
        "CBQ22-F7-Q2",
        "CBQ22-F7-Q4",
        "CBQ22-F7-Q6"
      ],
      "Body": "From: Division President Mark Caldwell\nTo: Inventory Accounting Team\nSubject: Q3 Reserve Adjustments — Priority\n\nTeam — We need to shore up the Q3 reserve to give us breathing room for Q4. I've asked Sarah to bump the obsolescence numbers to reflect 'worst-case' scenarios on the slow-moving categories. Please process the attached adjustments totaling $2.3M above the controller's recommendation. This is a one-time measure to smooth earnings. Do not copy Sam Whitfield on this email — he'll see the numbers when the package goes to corporate."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-F7-Q1",
      "Type": "select",
      "Prompt": "Which IMA ethical standards are MOST directly violated by directing the inventory team to overstate the obsolescence reserve?",
      "Correct": "C",
      "Choices": [
        "Competence only — the issue is whether the reserve calculation was performed with adequate skill",
        "Confidentiality only — the email instructs team members to withhold information from the controller",
        "Integrity (refraining from activities that discredit the profession) and Credibility (communicating information fairly and disclosing all relevant facts) — with Confidentiality governing HOW Sam escalates, not WHETHER he does",
        "No standards apply until the SEC opens an investigation"
      ],
      "Explanation": "The $2.3M overstatement intentionally misrepresents financial results — Integrity bars participation in activities that discredit the profession, and Credibility requires full and fair disclosure of all material facts. The division president's instruction to 'not copy Sam Whitfield' compounds the violation by attempting to suppress internal oversight. Confidentiality still governs HOW Sam communicates the issue (proper internal channels, not external leaks), but it never excuses participation in a known misstatement. Competence is not the operative failure — the team can compute reserves correctly; the problem is the direction to overstate them.",
      "Topic": "IMA standards mapping",
      "Subtopic": "Integrity and credibility",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "IMA standards",
        "integrity"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F7-Q2",
      "Type": "select",
      "Prompt": "Under the IMA Statement of Ethical Professional Practice, what is Sam's correct FIRST step after discovering the manipulation?",
      "Correct": "B",
      "Choices": [
        "Confront the division president directly and demand he reverse the entries",
        "Bypass the division president — because the immediate supervisor appears involved, escalate to the next higher level (corporate controller or audit committee) with the Exhibit 1 and 2 evidence",
        "Resign immediately and report to the SEC",
        "Wait for the external auditors to identify the overstatement during year-end fieldwork"
      ],
      "Explanation": "The IMA resolution process starts with the immediate supervisor UNLESS that person appears involved — here the division president authored the directive (Exhibit 2), making direct confrontation both procedurally wrong and practically futile. The correct first step is escalation to the next higher level: corporate controller, CFO, or audit committee. The evidence (Exhibits 1 and 2) should be preserved contemporaneously. Resignation is the LAST resort after all internal channels are exhausted. Waiting for external auditors lets a knowing misstatement stand in interim filings, which compounds Sam's personal SOX exposure.",
      "Topic": "Ethics resolution process",
      "Subtopic": "Escalation sequence",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "escalation",
        "IMA resolution"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F7-Q3",
      "Type": "multi",
      "Prompt": "Which parties must be notified as part of the ethical resolution process? Select exactly three.",
      "Correct": [
        "The corporate controller or CFO — the next management level above the division president, who has authority to direct reversal of the entries",
        "The audit committee — the board-level body with fiduciary responsibility for financial reporting integrity and the authority to engage forensic investigators if needed",
        "External legal counsel — to clarify Sam's personal SOX certification obligations, whistleblower protection eligibility, and potential mandatory reporting requirements"
      ],
      "Choices": {
        "A": "The corporate controller or CFO — the next management level above the division president, who has authority to direct reversal of the entries",
        "B": "The division president's direct supervisor — the CEO, who approved the earnings target that created the pressure",
        "C": "The audit committee — the board-level body with fiduciary responsibility for financial reporting integrity and the authority to engage forensic investigators if needed",
        "D": "The external auditors — immediately, before any internal investigation, so they can assess the impact on their audit opinion",
        "E": "External legal counsel — to clarify Sam's personal SOX certification obligations, whistleblower protection eligibility, and potential mandatory reporting requirements",
        "F": "The media — to ensure public accountability regardless of internal resolution efforts"
      },
      "Explanation": "The three essential notification parties are: corporate management (A) who can direct the reversal, the audit committee (C) who has board-level oversight authority, and legal counsel (E) who can advise on SOX obligations and whistleblower protections. Option B (CEO) may be appropriate but the CEO is typically briefed through the audit committee or corporate controller path — direct CEO notification without first informing the controller may bypass appropriate governance channels. Option D (external auditors) should be notified but not before internal escalation — the IMA process requires exhausting internal channels before external reporting, and premature auditor notification can compromise the internal investigation. Option F (media) breaches confidentiality and forfeits the protections that orderly internal reporting provides.",
      "Topic": "Notification obligations",
      "Subtopic": "Stakeholder identification",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "notification",
        "stakeholders"
      ],
      "Dependencies": [
        "CBQ22-F7-Q2"
      ]
    },
    {
      "ItemID": "CBQ22-F7-Q4",
      "Type": "select",
      "Prompt": "If internal escalation stalls and the division president's directive stands, what is Sam's FINAL recourse under SOX and IMA?",
      "Correct": "A",
      "Choices": [
        "Report in good faith to the SEC or OSHA under SOX §806 whistleblower protections — but only after internal remedies have been genuinely exhausted, and consult counsel first to ensure the report meets the 'reasonable belief' standard",
        "Post the evidence on social media to force public accountability — whistleblower protections cover any disclosure method",
        "Certify the results as instructed and disclose the manipulation anonymously after bonuses are paid",
        "Quietly reverse the entries in the following quarter to avoid conflict, accepting the timing difference"
      ],
      "Explanation": "SOX §806 and Dodd-Frank §922 protect employees who report fraud to federal agencies in good faith and with a reasonable belief — but the protection attaches only after genuine exhaustion of internal channels. Sam must first escalate internally (corporate controller, audit committee, legal counsel), document the refusal to act, and THEN report externally. Option B (social media) is not protected activity under any whistleblower statute — protections require reporting to a federal agency, not the public. Option C (certify-and-disclose-later) is the classic pattern that turns a controller into an enforcement respondent — SOX §302/§906 exposure attaches at certification, not at later disclosure. Option D (quiet reversal) leaves investors misled in the current period and deepens complicity.",
      "Topic": "Final recourse",
      "Subtopic": "Whistleblower protections",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "SOX §806; Dodd-Frank §922",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "whistleblower",
        "SOX 806"
      ],
      "Dependencies": [
        "CBQ22-F7-Q3"
      ]
    },
    {
      "ItemID": "CBQ22-F7-Q5",
      "Type": "select",
      "Prompt": "Classify the $2.3M reserve overstatement using fraud-triangle theory. Which element does the division president's conduct BEST satisfy?",
      "Correct": "D",
      "Choices": [
        "Opportunity — the president had access to override the reserve calculation, but pressure and rationalization are not present",
        "Rationalization — the president convinced himself the manipulation was justified, but opportunity and pressure are absent",
        "Financial pressure — the president faced personal financial consequences from missing targets, but opportunity and rationalization are absent",
        "All three elements are present: pressure (quarterly target shortfall), opportunity (ability to direct inventory team to override reserves), and rationalization ('one-time measure to smooth earnings')"
      ],
      "Explanation": "The fraud triangle requires all three elements: PRESSURE — the president is under quarterly-target pressure (Exhibit 2 references 'breathing room for Q4' and 'smooth earnings'); OPPORTUNITY — as division president, he has authority to direct the inventory team and override the controller's recommendation; RATIONALIZATION — the email frames the $2.3M as a 'one-time measure,' a classic minimization rationalization that reframes fraud as temporary smoothing. All three elements are clearly present. The IMA fraud perspective adds that the attempted exclusion of the controller ('Do not copy Sam Whitfield') is itself a red flag indicating awareness that the action violates internal controls.",
      "Topic": "Fraud triangle",
      "Subtopic": "Element classification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "fraud triangle",
        "fraud indicators"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F7-Q6",
      "Type": "match",
      "Prompt": "Match each scenario fact from the Pinnacle case to the IMA ethical standard or fraud indicator it most directly implicates.",
      "LeftItems": [
        "Division president directs reserve overstatement of $2.3M above controller's recommendation",
        "Email instructs team not to copy the controller on the adjustment direction",
        "Reserve overstatement reduces COGS and inflates operating income by $2.3M",
        "Email characterizes the manipulation as a 'one-time measure to smooth earnings'"
      ],
      "RightItems": [
        "Integrity — participation in activities that discredit the profession",
        "Confidentiality scope — the exclusion attempts to suppress legitimate internal oversight",
        "Credibility — communicating information that is not fairly presented",
        "Rationalization — minimization of fraudulent activity as temporary or routine",
        "Competence — failure to apply adequate technical skill to the reserve calculation",
        "Opportunity — access to override accounting controls"
      ],
      "Correct": {
        "Division president directs reserve overstatement of $2.3M above controller's recommendation": "Integrity — participation in activities that discredit the profession",
        "Email instructs team not to copy the controller on the adjustment direction": "Confidentiality scope — the exclusion attempts to suppress legitimate internal oversight",
        "Reserve overstatement reduces COGS and inflates operating income by $2.3M": "Credibility — communicating information that is not fairly presented",
        "Email characterizes the manipulation as a 'one-time measure to smooth earnings'": "Rationalization — minimization of fraudulent activity as temporary or routine"
      },
      "Explanation": "Each fact maps to a specific ethical or fraud element: the directive to overstate (first pair) is an Integrity violation — participating in a knowingly misleading accounting treatment discredits the profession. The exclusion of the controller (second pair) goes beyond Confidentiality — it is an attempt to suppress legitimate oversight, which violates the spirit of Confidentiality as a governance safeguard. The financial impact of inflating income by $2.3M (third pair) is a Credibility failure — the resulting financial statements do not fairly present results. The 'one-time measure' framing (fourth pair) is textbook rationalization — minimizing fraud as temporary or routine to reduce psychological discomfort. Distractors: Competence is not the issue (the team can calculate reserves correctly); Opportunity is present but not specifically implicated by the email characterization.",
      "Topic": "Ethics-fraud mapping",
      "Subtopic": "Fact-to-standard classification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "ethics mapping",
        "fraud elements"
      ],
      "Dependencies": [
        "CBQ22-F7-Q1",
        "CBQ22-F7-Q5"
      ]
    }
  ]
},
  {
  "CaseID": "CBQ22-F5",
  "Title": "Fraud Investigation at Westfield Logistics",
  "SectionTags": [
    "F"
  ],
  "BlueprintDomain": "Professional Ethics",
  "BlueprintObjectives": [
    "Identify the fraud triangle elements present in suspicious journal-entry manipulation",
    "Recognize red flags indicating fraudulent financial reporting",
    "Evaluate internal control deficiencies that permitted the fraud",
    "Apply fraud investigation procedures and document findings"
  ],
  "PrimaryCompetency": "Judgment",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Westfield Logistics' internal audit team has discovered suspicious journal entries at a subsidiary. The entries appear to shift $1.8M in operating expenses to capital accounts over three months, inflating both operating income and total assets. CFO Diane Foster must apply the fraud triangle, identify red flags, and recommend control responses to the audit committee.",
  "Industry": "Logistics and transportation",
  "CompanyType": "Service provider",
  "CompanyName": "Westfield Logistics",
  "Stakeholder": "CFO Diane Foster",
  "BusinessFunction": "Internal audit",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": [
    "fraud triangle",
    "journal entries",
    "internal controls",
    "fraud investigation",
    "capitalization"
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
    "certification_session": "P2-CERT-AUDIT-CASE",
  "Part": 2,
  "Part2OnlyFlag": true,
  "LearningObjectives": [
    "Classify journal-entry fraud using the fraud triangle framework",
    "Identify specific red flags in suspicious journal-entry patterns",
    "Evaluate control deficiencies that permitted unauthorized capitalization",
    "Select appropriate investigation steps following fraud discovery",
    "Map evidence to specific fraud-triangle elements",
    "Recommend control responses proportional to the identified fraud risk"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ22-F5-E1",
      "CaseID": "CBQ22-F5",
      "Type": "erp-report",
      "Title": "Exhibit 1 — Suspicious Journal Entries (Subsidiary GL)",
      "Purpose": "Provides the specific journal entries that shifted operating expenses to capital accounts, establishing the mechanics and pattern of the fraud.",
      "ReferencedBy": [
        "CBQ22-F5-Q1",
        "CBQ22-F5-Q2",
        "CBQ22-F5-Q4",
        "CBQ22-F5-Q6"
      ],
      "Headers": [
        "Date",
        "Entry #",
        "Debit Account",
        "Credit Account",
        "Amount",
        "Prepared By",
        "Approved By"
      ],
      "Rows": [
        [
          "2026-04-15",
          "JE-4201",
          "Vehicles and Equipment (1500)",
          "Repair and Maintenance Expense (6100)",
          "$420,000",
          "J. Marcus",
          "None"
        ],
        [
          "2026-04-28",
          "JE-4217",
          "Vehicles and Equipment (1500)",
          "Freight Expense (6200)",
          "$380,000",
          "J. Marcus",
          "None"
        ],
        [
          "2026-05-12",
          "JE-4302",
          "Buildings and Improvements (1400)",
          "Warehouse Labor Expense (6300)",
          "$510,000",
          "J. Marcus",
          "None"
        ],
        [
          "2026-05-30",
          "JE-4318",
          "Vehicles and Equipment (1500)",
          "Insurance Expense (6400)",
          "$290,000",
          "J. Marcus",
          "None"
        ],
        [
          "2026-06-14",
          "JE-4405",
          "Buildings and Improvements (1400)",
          "Utilities Expense (6500)",
          "$200,000",
          "J. Marcus",
          "None"
        ],
        [
          "Total",
          "",
          "",
          "",
          "$1,800,000",
          "",
          ""
        ]
      ],
      "DataFormat": "USD; all entries debit asset accounts and credit expense accounts; no approval signatures recorded",
      "AccuracyCheck": "420K + 380K + 510K + 290K + 200K = 1,800K ✓"
    },
    {
      "ExhibitID": "CBQ22-F5-E2",
      "CaseID": "CBQ22-F5",
      "Type": "text",
      "Title": "Exhibit 2 — Internal Audit Investigation Notes",
      "Purpose": "Provides the investigative context and background findings that supplement the journal-entry evidence.",
      "ReferencedBy": [
        "CBQ22-F5-Q3",
        "CBQ22-F5-Q5",
        "CBQ22-F5-Q6"
      ],
      "Body": "Investigation Notes — Westfield Logistics Subsidiary\n\nDate: June 28, 2026\nAuditor: Lead Internal Auditor Rebecca Torres\n\n1. All five entries were prepared by J. Marcus, a senior accountant in the subsidiary's finance department.\n2. None of the entries carry a supervisor approval signature, despite the subsidiary's written policy requiring dual approval for any journal entry exceeding $50,000.\n3. J. Marcus reports to the subsidiary CFO, who also serves as the subsidiary's controller — a combined role that eliminates the segregation of duties required by Westfield's corporate internal control manual.\n4. The capital account additions ($1.8M total) were not supported by any purchase orders, vendor invoices, or asset receiving reports.\n5. J. Marcus resigned on June 25, 2026, one week before the audit team's scheduled fieldwork.\n6. The subsidiary CFO approved all entries verbally but did not sign the approval field.\n7. Westfield's corporate ERP system has a configuration flag that allows subsidiary-level overrides of the capitalization threshold — this flag was activated on March 30, 2026, by the subsidiary CFO."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-F5-Q1",
      "Type": "select",
      "Prompt": "Which element of the fraud triangle is MOST directly evidenced by the journal entries shifting expenses to capital accounts?",
      "Correct": "C",
      "Choices": [
        "Pressure — the subsidiary CFO faced quarterly earnings targets, but the entries themselves do not prove pressure",
        "Rationalization — the accountant convinced himself the entries were justified, but the pattern suggests deliberate concealment rather than self-justification",
        "Opportunity — the combined CFO/Controller role, lack of approval signatures, and ERP override flag created the conditions that permitted the fraud to occur and persist undetected",
        "All three elements are equally and directly evidenced by the journal entries alone"
      ],
      "Explanation": "The journal entries themselves most directly evidence OPPORTUNITY: five entries totaling $1.8M were processed without approval signatures (violating the $50K dual-approval policy), by a single preparer, in a subsidiary where the CFO and Controller roles are combined (eliminating segregation of duties), using an ERP override that was activated specifically to enable the capitalization. Pressure and rationalization are inferred from context (earnings targets, the 'verbal approval' pattern) but the ENTRIES specifically demonstrate the control failures that made the fraud possible. The fraud triangle is a framework — each element requires independent evidence, and the journal-entry pattern is the opportunity evidence.",
      "Topic": "Fraud triangle",
      "Subtopic": "Element identification",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "fraud triangle",
        "opportunity"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F5-Q2",
      "Type": "select",
      "Prompt": "Which red flag pattern in Exhibit 1 is MOST characteristic of fraudulent journal entries?",
      "Correct": "A",
      "Choices": [
        "All entries debit capital accounts and credit expense accounts with no supporting documentation, no supervisor signatures, and amounts just below or at unusual thresholds",
        "The entries were prepared on business days during normal working hours",
        "The amounts are round numbers — $420,000, $380,000, $510,000, $290,000, $200,000",
        "The entries were posted to the general ledger rather than subsidiary ledgers"
      ],
      "Explanation": "The hallmarks of fraudulent journal entries are: (1) consistent direction — all five entries shift expenses TO assets, never the reverse; (2) no supporting documentation — no POs, invoices, or receiving reports exist; (3) no approval signatures — all five violate the $50K dual-approval policy; and (4) the aggregate amount ($1.8M) is material. Round numbers (C) are a weak indicator — legitimate capitalizations can also be round. Business-day timing (B) is neutral. General-ledger posting (D) is normal for adjusting entries. The directional consistency and absence of documentation are the strong red flags that internal audit standards (IIA) and SAS 99 identify as fraud indicators.",
      "Topic": "Red flags",
      "Subtopic": "Journal entry fraud indicators",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "red flags",
        "journal entries"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F5-Q3",
      "Type": "select",
      "Prompt": "Which internal control deficiency MOST directly enabled the fraud to persist undetected?",
      "Correct": "D",
      "Choices": [
        "Failure to perform bank reconciliations monthly — but the fraud involved GL entries, not bank transactions",
        "Lack of a formal code of ethics — but Westfield has a corporate internal control manual with segregation-of-duties requirements",
        "Insufficient IT security training for end users — but the ERP override was performed by the CFO, not a rank-and-file user",
        "Combined CFO/Controller role at the subsidiary eliminating segregation of duties, combined with an activated ERP override that bypassed the capitalization threshold"
      ],
      "Explanation": "The combined CFO/Controller role is the structural enabler: one person both authorizes AND records transactions, eliminating the segregation that would normally require a second independent party to detect or prevent the misclassification. The activated ERP override (flag turned on March 30, 2026) allowed capitalization entries that should have been blocked by system-level controls. Together these create the classic fraud-enabling condition: no independent check on the person with both motive (quarterly targets) and access (combined role + ERP override). Bank reconciliations (A) test cash, not GL classification. A code of ethics (B) addresses culture, not structural controls. IT training (C) addresses user competence, not management override.",
      "Topic": "Control deficiency",
      "Subtopic": "Segregation of duties",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "internal controls",
        "SoD"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F5-Q4",
      "Type": "multi",
      "Prompt": "Which three investigation steps should Diane Foster recommend to the audit committee? Select exactly three.",
      "Correct": [
        "Engage forensic accounting specialists to trace the $1.8M through the capital accounts and determine whether any assets were actually acquired or if the entries are pure misclassification",
        "Preserve all electronic evidence — ERP audit logs, email accounts, and system access records for J. Marcus and the subsidiary CFO — before the 30-day retention window expires",
        "Review the ERP override configuration and determine whether similar overrides exist at other subsidiaries, assessing whether the control gap is systemic or isolated"
      ],
      "Choices": {
        "A": "Engage forensic accounting specialists to trace the $1.8M through the capital accounts and determine whether any assets were actually acquired or if the entries are pure misclassification",
        "B": "Confront J. Marcus directly, even though he has resigned, to obtain his explanation before the audit committee reviews the findings",
        "C": "Preserve all electronic evidence — ERP audit logs, email accounts, and system access records for J. Marcus and the subsidiary CFO — before the 30-day retention window expires",
        "D": "Reverse all five entries immediately to restore the correct account balances before the external audit begins",
        "E": "Review the ERP override configuration and determine whether similar overrides exist at other subsidiaries, assessing whether the control gap is systemic or isolated",
        "F": "Terminate the subsidiary CFO immediately to prevent evidence destruction, without first completing the forensic investigation"
      },
      "Explanation": "The three essential investigation steps are: forensic tracing (A) to determine the economic substance of the entries, evidence preservation (C) to maintain the audit trail before retention windows expire, and systemic review (E) to determine whether the ERP override gap affects other subsidiaries. Option B (confronting J. Marcus) is impractical — he resigned and has no obligation to cooperate; legal counsel should advise on subpoena options if his testimony is needed. Option D (immediate reversal) is premature — the entries must be forensically understood before reversal to avoid destroying evidence or creating new accounting issues. Option F (immediate termination) is disproportionate before the investigation completes — the CFO should be placed on administrative leave with system access revoked, not terminated, to preserve the ability to compel cooperation through employment obligations.",
      "Topic": "Investigation procedures",
      "Subtopic": "Forensic investigation steps",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": false,
      "FormulaReference": "",
      "EstimatedMinutes": 5,
      "ExplanationVersion": 1,
      "Tags": [
        "investigation",
        "forensic"
      ],
      "Dependencies": []
    },
    {
      "ItemID": "CBQ22-F5-Q5",
      "Type": "select",
      "Prompt": "The investigation notes describe J. Marcus's resignation one week before scheduled fieldwork. Which fraud-triangle element does this timing MOST directly suggest?",
      "Correct": "B",
      "Choices": [
        "Opportunity — the resignation created the opportunity for the fraud to continue without detection",
        "Consciousness of guilt — the resignation timing suggests Marcus knew the fraud would be discovered and fled before the audit, indicating awareness that the entries were improper",
        "Rationalization — the resignation was a personal choice unrelated to the fraud",
        "Pressure — Marcus was pressured to resign by the subsidiary CFO"
      ],
      "Explanation": "Resignation immediately before scheduled audit fieldwork is a classic consciousness-of-guilt indicator — it suggests the individual knew the fraud would be discovered and chose to depart before investigators could question them. While the resignation does not PROVE guilt (it could be coincidental), the timing pattern is specifically identified in fraud investigation standards (SAS 99, IIA Practice Advisory) as a red flag requiring investigation. The three-week gap between the last fraudulent entry (June 14) and resignation (June 25) further suggests Marcus completed the scheme and then departed. Option A misreads the framework — resignation does not create opportunity; it is a response to perceived detection risk. Option C (rationalization) applies to the fraud itself, not the resignation. Option D (pressure to resign) is unsupported by the evidence.",
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
  "question_state": "Certified",
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
      "Rows": [["Outstanding bonds: 10-year, 7.5% coupon, semiannual","$255,000,000 face value"],["Current bond price","102.3% of par"],["Preferred stock: $4.98 dividend, perpetual","400,000 shares outstanding"],["Current preferred price","$60.50"],["Common shares outstanding","12,000,000"],["Current market price per share","$68.00"],["Expected dividend per share (D1)","$3.40 (5.0% of $68.00)"],["Flotation cost on new common equity","5.0% of issue price"],["Flotation cost on new preferred","3.0% of issue price"],["Marginal tax rate","25%"],["Risk-free rate","4.2%"],["Market risk premium","6.0%"],["Beta (equity)","1.35"]]
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
      "Rows": [["Initial investment","$55,000,000"],["Expected annual after-tax operating income","$13,200,000"],["Project life","12 years"],["Salvage value","$0"]]
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ22-B6-Q1",
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
];
