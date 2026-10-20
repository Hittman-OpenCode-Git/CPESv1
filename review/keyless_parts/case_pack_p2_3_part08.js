, the 10,000 kg internal order displaces 10,000 kg external sales"
          ]
        ],
        "DataFormat": "USD per kg; capacity in kg; opportunity cost = CM forgone",
        "AccuracyCheck": "Idle capacity minimum $22; full capacity minimum $22+$12=$34 = market price; internal need fits within 12,000 idle"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-C4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the Lerner index and point price elasticity of -2.50 in Exhibit 1, what is the profit-maximizing price per unit? Variable cost is $18.00. Round to nearest cent (e.g., 30.00).",
        "Correct": "30.00",
        "Explanation": "Lerner index (P-MC)/P = -1/Ed. With Ed=-2.50, -1/Ed=0.40, so optimal markup 40% of price. Solve (P-18)/P=0.40 → P-18=0.40P → 0.60P=18 → P=$30.00. At $30 contribution $12 per unit; $28 current price is $2 below optimum, leaving margin on table. Survey points corroborate elasticity estimate. Common error is applying markup on cost as 40% on cost = $25.20 or adding fixed costs to MC — profit max equates MR to marginal (variable) cost, not ATC.",
        "Topic": "Pricing with price elasticity",
        "Subtopic": "Lerner index — optimal markup",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Lerner Index: (P-MC)/P = -1/Ed",
        "CommonTrapReference": "Markup on cost vs margin on price; including fixed cost in MC.",
        "DecisionTreeReference": "Decision Analysis — Pricing; elasticity",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "elasticity"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 2, enter the expected value of perfect information (EVPI) for the launch-size decision. Round to nearest thousand dollars and enter as whole number (e.g., 600000 for $600,000).",
        "Correct": "600000",
        "Explanation": "EV without info: EV(Large)=0.40*2,800+0.60*(-400)=880; EV(Small)=0.40*1,200+0.60*600=840, so optimal without info is Large with $880k. With perfect info, choose Large if Strong ($2,800k) and Small if Weak ($600k). EVwPI=0.40*2,800+0.60*600=1,480. EVPI=EVwPI - EV(best without)=1,480-880=600k. EVPI is maximum any information can be worth; caps pilot test.",
        "Topic": "Decision under uncertainty",
        "Subtopic": "EV, EVwPI, EVPI",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "EV=ΣP*Payoff; EVwPI=ΣP*Max Payoff|state; EVPI=EVwPI-EV*",
        "CommonTrapReference": "Taking EVPI as EVwPI or using small launch as base.",
        "DecisionTreeReference": "Decision Analysis — EV, EVPI",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "EVPI"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Given the elasticity estimate in Exhibit 1, which pricing recommendation is most defensible?",
        "Correct": "B",
        "Choices": [
          "Adopt skimming price of $34 because EVPI proves customers will pay premium, so raising price well above $30 will increase profit regardless of elasticity",
          "Move price toward Lerner optimum of $30.00; because demand is elastic (-2.50), a price increase from $28 toward $30 trades smaller percentage volume loss for larger percentage margin gain up to optimum, while cut toward $26 would be profitable only if price were above optimum",
          "Cut price to $26 to pursue penetration because elastic demand means any price cut always increases profit",
          "Hold price at $28 because competitor's $27 price is lower, and game theory dictates matching competitor exactly"
        ],
        "Explanation": "Elastic demand means quantity is price-sensitive: profit maximized where MR=MC, Lerner locates at $30. Starting at $28 below optimum, move toward $30 raises margin faster than volume falls. Choice A confuses value of information with willingness to pay. Choice C overgeneralizes: profit not monotonic. Choice D invokes Bertrand matching trap — with differentiated skincare, profit-max is at marginal logic, not anchoring to $27.",
        "Topic": "Pricing strategy under elasticity",
        "Subtopic": "Skimming vs penetration",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Elasticity; Lerner optimum $30",
        "CommonTrapReference": "Any price cut is good when elastic; EVPI justifies premium.",
        "DecisionTreeReference": "Decision Analysis — Pricing strategy",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "skimming"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How should Luis evaluate the $95,000 pilot social-media test described in Exhibit 2?",
        "Correct": "D",
        "Choices": [
          "Purchase test because gross EVSI $165,000 exceeds EVPI $600,000, proving perfectly reliable",
          "Reject test because EVSI ($165,000) is less than EVPI ($600,000), so sample information can never be worthwhile",
          "Reject test because cost ($95,000) exceeds EV of optimal act without info ($880,000)",
          "Purchase test if reliability as stated, because gross EVSI about $165,000, net EVSI about $70,000 positive ($165k-$95k), and net EVSI can never exceed EVPI ($600k), so test adds value below ceiling"
        ],
        "Explanation": "EVSI = EV with sample info - EV without = $1,045k-$880k=$165k. Net EVSI=$165k-$95k=$70k >0, so purchasing justified. Crucial bounds: 0≤EVSI≤EVPI; sample cannot exceed perfect. Choice A inverts bound and claims perfect reliability from 65% test. Choice B misreads EVSI<EVPI as rejection. Choice C compares cost to total EV not incremental EVSI.",
        "Topic": "Value of information",
        "Subtopic": "EVSI, net EVSI, EVPI ceiling",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "EVSI=EVWSI-EV*; Net EVSI=EVSI-cost; 0≤EVSI≤EVPI",
        "CommonTrapReference": "EVSI>EVPI; comparing cost to total EV.",
        "DecisionTreeReference": "Decision Analysis — EVSI",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "EVSI"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which statements correctly state the minimum transfer-price floors and goal-congruence implications for the ester? Select all that apply.",
        "Correct": [
          "With 12,000 kg of idle capacity and an internal need of 10,000 kg, the minimum transfer price that Ingredients should accept is its variable cost of $22.00 per kg (opportunity cost is zero because no external sale is displaced)",
          "If Ingredients were operating at practical capacity (50,000 kg), the minimum transfer price for the 10,000 kg internal order would be $34.00 per kg ($22 variable cost + $12 contribution margin forgone on displaced external sales)",
          "Setting the transfer price at external market price of $34.00 when 12,000 kg of idle capacity exists would likely cause Finished Goods to reject an internal transfer that would increase corporate profit by about $12.00 per kg over variable cost ($120,000 total for 10,000 kg), harming goal congruence"
        ],
        "Choices": [
          "With 12,000 kg of idle capacity and an internal need of 10,000 kg, the minimum transfer price that Ingredients should accept is its variable cost of $22.00 per kg (opportunity cost is zero because no external sale is displaced)",
          "If Ingredients were operating at practical capacity (50,000 kg), the minimum transfer price for the 10,000 kg internal order would be $34.00 per kg ($22 variable cost + $12 contribution margin forgone on displaced external sales)",
          "Setting the transfer price at external market price of $34.00 when 12,000 kg of idle capacity exists would likely cause Finished Goods to reject an internal transfer that would increase corporate profit by about $12.00 per kg over variable cost ($120,000 total for 10,000 kg), harming goal congruence",
          "To maximize corporate profit, transfer price should always be set at variable cost ($22) regardless of capacity, because any higher price reduces divisional profit",
          "A dual-rate system (credit Ingredients at market $34 and charge Finished Goods at variable cost $22) preserves goal congruence and is acceptable for external financial reporting"
        ],
        "Explanation": "Minimum price = Variable cost + Opportunity cost. With idle capacity opportunity cost zero, floor $22. At full capacity 10,000 kg displaces external sales at $12 CM each, floor $34 = market price. Pricing at $34 when idle risks rejection of profitable corporate trade. Dual rates aid goal congruence internally but are not GAAP for external reporting.. The key values from the exhibits are 600000.",
        "Topic": "Transfer pricing with capacity constraints",
        "Subtopic": "Minimum price = VC + opportunity cost",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Min transfer price = Variable cost + (CM forgone / units)",
        "CommonTrapReference": "Opportunity cost zero at capacity; market price always optimal; dual-rate for external reporting.",
        "DecisionTreeReference": "Cost Management — Transfer pricing",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "transfer price"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-C4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each Veridian decision concept to its correct quantitative treatment.",
        "Correct": {
          "Profit-maximizing price with Ed = -2.50 and VC $18": "$30.00 — where (P-MC)/P = 0.40 = -1/Ed",
          "EVPI for the launch-size decision": "$600,000 — maximum worth of perfect demand information (EVwPI $1,480k minus EV* $880k)",
          "Pilot test economics ($95k cost, 65% reliability)": "Gross EVSI about $165k; net EVSI about $70k positive — purchase justified, capped by EVPI",
          "Idle-capacity transfer-price floor (12,000 kg idle)": "$22.00 variable cost — no opportunity cost as no external sale is displaced",
          "Full-capacity transfer-price floor": "$34.00 — $22 variable cost plus $12 contribution margin opportunity cost"
        },
        "LeftItems": [
          "Profit-maximizing price with Ed = -2.50 and VC $18",
          "EVPI for the launch-size decision",
          "Pilot test economics ($95k cost, 65% reliability)",
          "Idle-capacity transfer-price floor (12,000 kg idle)",
          "Full-capacity transfer-price floor"
        ],
        "RightItems": [
          "$30.00 — where (P-MC)/P = 0.40 = -1/Ed",
          "$600,000 — maximum worth of perfect demand information (EVwPI $1,480k minus EV* $880k)",
          "Gross EVSI about $165k; net EVSI about $70k positive — purchase justified, capped by EVPI",
          "$22.00 variable cost — no opportunity cost as no external sale is displaced",
          "$34.00 — $22 variable cost plus $12 contribution margin opportunity cost"
        ],
        "Explanation": "Lerner optimum $30 where margin equals 0.40 reciprocal of elasticity magnitude. EVPI $600k is prior-weighted perfect-information premium and absolute ceiling for research. Pilot raises EV to $1,045k; gross EVSI $165k minus $95k leaves $70k net benefit — within EVPI cap. Transfer floors pivot on opportunity cost.",
        "Topic": "Integrated pricing and decision analysis",
        "Subtopic": "Matching concepts to treatments",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Lerner; EVPI/EVSI; Transfer price floor",
        "CommonTrapReference": "Cross-matching EVPI to EVwPI or idle floor to opportunity-cost-inclusive price.",
        "DecisionTreeReference": "Decision Analysis — Integrated pricing, information value, transfer pricing",
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
    "CaseID": "CBQ23-F4",
    "Title": "The Override and the Restatement Risk at Beacon Manufacturing",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Evaluate fraud and fraudulent reporting — fraud triangle (F.4)",
      "Assess corporate governance and ethics — SOX 302/404, audit committee (F.5)",
      "Apply FCPA and whistleblower protections (F.6)"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 32,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Beacon Manufacturing's plant controller has bypassed the three-way match to accelerate shipments before quarter-end, and Internal Audit Director Priya Desai has found $420,000 of sales recorded before title transfer. The audit committee chair asks Desai to map the fraud-triangle, assess SOX 302 versus 404 implications, and propose the containment and reporting path before the 10-Q certification.",
    "Industry": "Automotive parts",
    "CompanyType": "Manufacturer",
    "CompanyName": "Beacon Manufacturing",
    "Stakeholder": "Internal Audit Director Priya Desai",
    "BusinessFunction": "Internal audit / Ethics",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "management override",
      "fraud triangle",
      "SOX 302",
      "SOX 404",
      "audit committee",
      "FCPA",
      "whistleblower",
      "ESG"
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
      "Map evidence to fraud-triangle legs and identify the control-addressable element",
      "Distinguish SOX 302 certification from 404 ICFR reporting and apply to management override",
      "Design audit committee oversight and whistleblower/FCPA reporting boundaries"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F4-E1",
        "CaseID": "CBQ23-F4",
        "Type": "email",
        "Title": "Exhibit 1 — Override Evidence (Excerpts)",
        "Purpose": "Provides the management override facts: three-way match bypass, shipments before title transfer, and the quarter-end pressure context for fraud-triangle and revenue assessment.",
        "ReferencedBy": [
          "CBQ23-F4-Q1",
          "CBQ23-F4-Q2",
          "CBQ23-F4-Q4",
          "CBQ23-F4-Q6"
        ],
        "Body": "From: Plant Controller (to shipping) — 'Ship the 12 orders tonight at $35k each; I'll clear the invoices in the morning before the match runs. We need the $420k to hit the forecast.'\nShipping log: 12 orders shipped Sep 28-29, FOB destination, customer acceptance not yet obtained; invoices dated Sep 29, recorded as Sep sales.\nQuarter-end memo: 'Every $100k of shipments moves EPS $0.02; make the quarter at any cost.'"
      },
      {
        "ExhibitID": "CBQ23-F4-E2",
        "CaseID": "CBQ23-F4",
        "Type": "text",
        "Title": "Exhibit 2 — Framework References: SOX, IMA, FCPA, and Whistleblower Protections",
        "Purpose": "Summarizes governance framework: fraud triangle, IMA standards, SOX 302/404, audit committee duties, FCPA books-and-records, SOX 806/Dodd-Frank whistleblower, ESG integrity.",
        "ReferencedBy": [
          "CBQ23-F4-Q1",
          "CBQ23-F4-Q2",
          "CBQ23-F4-Q3",
          "CBQ23-F4-Q4",
          "CBQ23-F4-Q5",
          "CBQ23-F4-Q6"
        ],
        "Body": "Fraud triangle: pressure (incentive/need, e.g., forecast/EPS target), opportunity (control gap, e.g., override of three-way match), rationalization (justification, e.g., 'borrow from next quarter').\nIMA Statement: Integrity (mitigate conflicts, refuse override), Credibility (fair disclosure), Competence (follow GAAP, revenue control), Confidentiality (proper channels).\nSOX 302: CEO/CFO quarterly certify fair presentation and disclosure controls; 404(a): management annual assessment of ICFR effectiveness; 404(b): auditor attestation on ICFR.\nFCPA books-and-records: accurate books required regardless of payment purpose; anti-bribery covers foreign officials to obtain business.\nSOX 806/Dodd-Frank 922: protect good-faith whistleblower reports; audit committee oversees investigation via counsel; confidentiality permits disclosure through proper authority.\nESG (F.7): sustainability disclosures must be subject to same ICFR discipline — greenwashing is a credibility/Integrity risk."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Mapped to the fraud triangle, which element does the Exhibit 1 evidence most directly expose — and which is the only leg remediation can reliably address?",
        "Correct": "A",
        "Choices": [
          "Opportunity — management override of the three-way match that allowed $420k of shipments before title transfer; opportunity is the leg that controls and segregation directly remove, while pressure (EPS target) and rationalization are personal states no control eliminates",
          "Pressure — the $420k proves fraudulent intent and should anchor the referral",
          "Rationalization — the plant controller's performance review will reveal the justification narrative",
          "All three legs are equally controllable through policy statements"
        ],
        "Explanation": "Exhibit 1 establishes HOW fraud became possible: one person could ship, invoice, and record before the control ran — classic opportunity via override. Pressure (forecast/EPS) and rationalization (borrow from next quarter) matter for understanding actor but are private mental states; anti-fraud architecture targets opportunity because that is the only leg a control system touches. Leading with intent proof misses systemic fix.",
        "Topic": "Fraud triangle",
        "Subtopic": "Opportunity mapping vs pressure/rationalization",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Fraud triangle — Cressey",
        "CommonTrapReference": "Building case on motive while neglecting control failure.",
        "DecisionTreeReference": "Fraud — triangle and red flags",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fraud triangle"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Under the IMA Statement and SOX framework, what is Desai's correct immediate stance on the $420k and the quarter-end certification?",
        "Correct": "B",
        "Choices": [
          "Certify and disclose after quarter-close to avoid missing forecast",
          "Decline to support certification as presented, document findings contemporaneously, and escalate to the audit committee with Exhibit 1, because the $420k recorded before title transfer overstates Q3 revenue and controlling the three-way match is a Credibility/Competence failure",
          "Quietly reverse the $420k in the next quarter without disclosure",
          "Tell the external auditor only and take no internal action"
        ],
        "Explanation": "Recording before title transfer (FOB destination, acceptance not obtained) overstates revenue — variable consideration/transfer-of-control failure under ASC 606/COSO. IMA Integrity/Credibility forbid participating in misleading presentation; Competence requires GAAP compliance. SOX 302 requires CEO/CFO certify fair presentation and disclosure controls — known overstatement makes certification false and exposes officers to liability (906). Contemporaneous documentation preserves evidence; audit committee escalation follows IMA path and SOX governance. Deferring correction leaves investors misled now and deepens complicity.",
        "Topic": "SOX certification and revenue overstatement",
        "Subtopic": "302 fair presentation and override",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "SOX 302; ASC 606 control transfer",
        "CommonTrapReference": "Deferring correction to next quarter or outsourcing responsibility to auditor.",
        "DecisionTreeReference": "SOX certification — fair presentation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 302"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How do SOX 302 and SOX 404 differ as applied to Beacon's override, and what is the correct ICFR implication?",
        "Correct": "C",
        "Choices": [
          "SOX 302 and 404 are identical — both are annual auditor attestations",
          "SOX 302 covers only ICFR effectiveness, leaving revenue presentation to auditors",
          "SOX 302 is the quarterly CEO/CFO certification of fair presentation and disclosure controls (including this quarter's $420k); SOX 404(a) is management's annual assessment of ICFR effectiveness and 404(b) the auditor's attestation — a management override that defeats the three-way match is a material weakness in ICFR that must be reported under 404 and indicates disclosure controls are ineffective under 302 even before year-end",
          "A material weakness under 404 cannot exist if the dollar amount is below $1 million, so Beacon has no weakness"
        ],
        "Explanation": "302 is quarterly, personal, and disclosure-oriented; 404 is annual, entity-level, and controls-oriented. Override of a key revenue control that allows $420k premature recognition is a classic material weakness — reasonable possibility of material misstatement — reportable under 404(a) and attestable under 404(b), and it makes disclosure controls ineffective under 302 for this quarter. Dollar-threshold claim in choice D invents a quantitative materiality rule that does not exist for ICFR material weakness.",
        "Topic": "SOX 302 vs 404",
        "Subtopic": "Quarterly certification vs annual ICFR assessment",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "SOX 302; SOX 404(a)/(b)",
        "CommonTrapReference": "Treating 302 and 404 as same period or same reporter.",
        "DecisionTreeReference": "Corporate governance — SOX framework",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 404"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which audit committee response package is complete and correctly sequenced?",
        "Correct": "B",
        "Choices": [
          "Terminate the plant controller immediately upon Desai's verbal summary, then investigate afterward",
          "Engage counsel and forensic specialists through the audit committee; issue litigation-hold/evidence-preservation notices; place shipment and billing holds; assess whether filed statements require correction; direct whistleblower protection and decide law-enforcement referral on counsel's advice; report ICFR material weakness and remediate three-way match with segregation and system-enforced compliance",
          "Publicly announce the issue to reassure employees, then determine facts",
          "Handle everything internally without external counsel to protect privilege"
        ],
        "Explanation": "Discovery duties run upward through governed channels: preserve evidence integrity, stop ongoing loss, and hand direction to audit committee acting through counsel. Litigation hold prevents spoliation; shipment/billing hold stops further override; correction assessment addresses prior filings; whistleblower protection (806) and counsel-directed referral manage legal exposure. Immediate termination before investigation risks missing co-conspirators and waiving privilege.",
        "Topic": "Audit committee governance",
        "Subtopic": "Investigation and remediation sequence",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "Audit committee oversight; SOX 806",
        "CommonTrapReference": "Terminating before investigating or announcing before facts.",
        "DecisionTreeReference": "Governance — investigation boundaries",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "audit committee"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three controls would most directly address the Beacon override and revenue-pressuring risks? (Select three.)",
        "Correct": [
          "System-enforced three-way match (PO, receiving, invoice) with no manual bypass without dual authorization and audit trail",
          "Cutoff control: FOB destination shipments require proof of delivery/customer acceptance before revenue recognition",
          "Anonymous whistleblower hotline with audit-committee oversight and SOX 806 non-retaliation training"
        ],
        "Choices": [
          "System-enforced three-way match (PO, receiving, invoice) with no manual bypass without dual authorization and audit trail",
          "Cutoff control: FOB destination shipments require proof of delivery/customer acceptance before revenue recognition",
          "Anonymous whistleblower hotline with audit-committee oversight and SOX 806 non-retaliation training",
          "Requiring original paper invoices for all purchases above $5,000",
          "Raising the revenue target by 10% to motivate accuracy"
        ],
        "Explanation": "The $420k exploited override of the three-way match and the lack of a cutoff/acceptance checkpoint — controls must close those exact mechanisms: system-enforced match with dual-authorization bypass audit, delivery/acceptance-based cutoff, and a protected channel for the next person in Desai's position. Paper invoices add friction without breaking the bypass; raising targets worsens pressure.",
        "Topic": "Fraud control remediation",
        "Subtopic": "Revenue and override controls",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "COSO IC; revenue cutoff",
        "CommonTrapReference": "Proposing cultural remedies where structural control gap did damage.",
        "DecisionTreeReference": "Internal controls — revenue and anti-fraud",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls",
          "hotline"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each Beacon fact to its correct governance or reporting treatment.",
        "Correct": {
          "Bypassing three-way match to ship $420k before title transfer": "Opportunity via management override — revenue overstated; control material weakness; disclosure controls ineffective",
          "Quarter-end EPS pressure memo — 'make the quarter at any cost'": "Pressure element of fraud triangle — incentive, not itself the controllable leg",
          "SOX 302 vs 404 question as applied": "302 quarterly CEO/CFO fair-presentation certification (this quarter); 404 annual management ICFR assessment and auditor attestation (year-end)",
          "IMA and whistleblower path when plant controller is involved": "Document contemporaneously, decline support for certification, escalate to audit committee via proper channels; SOX 806/Dodd-Frank protect good-faith report"
        },
        "LeftItems": [
          "Bypassing three-way match to ship $420k before title transfer",
          "Quarter-end EPS pressure memo — 'make the quarter at any cost'",
          "SOX 302 vs 404 question as applied",
          "IMA and whistleblower path when plant controller is involved"
        ],
        "RightItems": [
          "Opportunity via management override — revenue overstated; control material weakness; disclosure controls ineffective",
          "Pressure element of fraud triangle — incentive, not itself the controllable leg",
          "302 quarterly CEO/CFO fair-presentation certification (this quarter); 404 annual management ICFR assessment and auditor attestation (year-end)",
          "Document contemporaneously, decline support for certification, escalate to audit committee via proper channels; SOX 806/Dodd-Frank protect good-faith report"
        ],
        "Explanation": "Matching consolidates: override is opportunity and creates ICFR material weakness plus 302 failure; pressure memo is motive not control failure; 302/404 differ by period/reporter/scope; IMA path is documentation, refusal to support false certification, and audit-committee escalation with whistleblower protections. Together they show personal-benefit-free earnings pressure still corrupts governance.",
        "Topic": "Integrated ethics and governance",
        "Subtopic": "Matching fact to treatment",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "IMA standards; SOX 302/404; fraud triangle; SOX 806",
        "CommonTrapReference": "Cross-matching pressure to control or 302 to annual attestation.",
        "DecisionTreeReference": "Ethics — integrated fact-to-standard mapping",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "matching"
        ],
        "Dependencies": []
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-A4",
    "Title": "Synthetic Lease Recast at Horizon Telecom",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Recast off-balance-sheet guarantees (A.7)",
      "Analyze lease vs loan"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Horizon Telecom guarantees $8M of a supplier JV debt plus a $6M synthetic lease. Controller Mei Tanaka must recast leverage for covenant D/E ≤1.40 (reported D/E 1.10) and advise on lease vs loan.",
    "Industry": "Telecommunications",
    "CompanyType": "Service provider",
    "CompanyName": "Horizon Telecom",
    "Stakeholder": "Controller Mei Tanaka",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "synthetic lease",
      "guarantee"
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
      "Recast guarantee and synthetic lease",
      "Compute adjusted D/E, TIE",
      "Advise structure choice"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A4-E1",
        "CaseID": "CBQ23-A4",
        "Type": "table",
        "Title": "Exhibit 1 — Off-Balance Exposures",
        "Purpose": "Provides guarantee and synthetic lease terms for recast.",
        "ReferencedBy": [
          "CBQ23-A4-Q1",
          "CBQ23-A4-Q2",
          "CBQ23-A4-Q3",
          "CBQ23-A4-Q5"
        ],
        "Headers": [
          "Exposure",
          "Amount",
          "Terms"
        ],
        "Rows": [
          [
            "JV debt guarantee",
            "$8M",
            "Full recourse, 3yr"
          ],
          [
            "Synthetic lease (ROU $6M)",
            "$6M",
            "5yr, 5.8% implicit, PV $5.2M"
          ],
          [
            "Reported debt",
            "$42M",
            "As filed"
          ],
          [
            "Equity",
            "$38M",
            ""
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "Recast debt 55.2; D/E 1.45 breach"
      },
      {
        "ExhibitID": "CBQ23-A4-E2",
        "CaseID": "CBQ23-A4",
        "Type": "table",
        "Title": "Exhibit 2 — Covenant Package",
        "Purpose": "Provides covenant thresholds.",
        "ReferencedBy": [
          "CBQ23-A4-Q4",
          "CBQ23-A4-Q5",
          "CBQ23-A4-Q6"
        ],
        "Headers": [
          "Covenant",
          "Threshold",
          "Reported",
          "Recast"
        ],
        "Rows": [
          [
            "D/E max",
            "1.40",
            "1.10",
            "1.45"
          ],
          [
            "TIE min",
            "2.50",
            "2.86",
            "2.10"
          ]
        ],
        "DataFormat": "Ratios",
        "AccuracyCheck": "Recast TIE 2.10"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the recast debt-to-equity ratio, rounded to two decimals.",
        "Correct": "1.45",
        "Explanation": "The covenant measures debt to equity, so off-balance-sheet exposures that create an obligation are recast onto the balance sheet before the ratio is computed. Exhibit 1 lists reported debt of $42M and equity of $38M, plus two exposures the as-filed ratio of 1.10 ignores. The $8M JV debt guarantee is fully recourse over three years and is therefore a debt-like obligation, adding $8M. The synthetic lease has a right-of-use asset of $6M, but the exhibit states the lease payments carry a 5.8% implicit rate with a present value of $5.2M, and under ASC 842-20-25 the lease liability is measured at the present value of the remaining lease payments discounted at that rate, so $5.2M is the amount that enters debt. Recast debt = 42 + 8 + 5.2 = $55.2M; recast D/E = 55.2 / 38 = 1.4526, which rounds to 1.45. Recomputed independently: 55.2 / 38 = 1.45263. Against the 1.40 covenant maximum this is a breach, whereas the reported 1.10 appeared to leave 0.30 of headroom. A common trap is adding the full $6M right-of-use amount instead of the $5.2M discounted liability, which yields 1.47 and overstates the recast ratio.",
        "Topic": "Recast D/E",
        "Subtopic": "Leverage",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "A.7 recast",
        "CommonTrapReference": "Reported D/E",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recast-d/e"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the synthetic lease liability PV included in recast, in millions.",
        "Correct": "5.20",
        "Explanation": "The synthetic lease is off-balance-sheet but debt-like: Exhibit 1 gives its present value as $5.2M at the 5.8% implicit rate over 5 years (versus the $6M ROU gross). Controller Tanaka adds the $5.2M liability to recast debt, with the ROU asset leaving equity unchanged. The trap is adding the $6M gross ROU or the undiscounted payments instead of the PV — covenant economics price the liability, which is always the discounted measure.",
        "Topic": "Lease PV",
        "Subtopic": "Recast",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ASC842 PV",
        "CommonTrapReference": "ROU 6M",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "lease-pv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How should the $8M guarantee be treated for leverage?",
        "Correct": "B",
        "Choices": 