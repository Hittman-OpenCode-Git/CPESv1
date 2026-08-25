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
}
,
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
}
];
