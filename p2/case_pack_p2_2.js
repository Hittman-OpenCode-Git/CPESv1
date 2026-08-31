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
  }
,
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
  }
];
