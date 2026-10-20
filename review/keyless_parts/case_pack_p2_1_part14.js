     "CalculationRequired": false,
        "FormulaReference": "Risk Response Matrix: Avoid / Reduce / Share / Accept",
        "CommonTrapReference": "Classifying Supplier B as Reduce due to its 35% volume share, or misclassifying Supplier C as Accept because its volume share is the smallest.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "concentration risk",
          "heat map"
        ],
        "Dependencies": [
          "CBQ21-D4-Q3",
          "CBQ21-D4-Q5"
        ]
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-F5",
    "Title": "SOX Whistleblower Protections and Audit-Committee Reporting at Pinnacle Logistics",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Apply SOX Section 302 officer certification obligations and personal liability",
      "Identify SOX Section 806 whistleblower protections and reporting channels",
      "Determine the notification sequence when the immediate supervisor is implicated in an ethical conflict",
      "Classify internal control deficiencies under SOX Section 404",
      "Match governance facts to the correct regulatory or professional framework",
      "Formulate an integrated audit-committee response to CFO pressure"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Pinnacle Logistics, a regional freight and warehousing company, is completing its fiscal year-end close. Internal auditor Sarah Okafor discovers that CFO Daniel Grant directed the capitalization of $1,200,000 in software maintenance costs that should have been expensed under ASC 350-40 because they did not extend the software's useful life or add new functionality. Grant pressures Okafor to reclassify the entries to avoid triggering a restatement that would breach the company's debt covenants. Okafor must navigate the CFO's directive, her obligations under the IMA Statement of Ethical Professional Practice, and the Sarbanes-Oxley reporting framework, all while the audit committee chair awaits a resolution.",
    "Industry": "Freight and warehousing",
    "CompanyType": "Service provider",
    "CompanyName": "Pinnacle Logistics",
    "Stakeholder": "Internal Auditor Sarah Okafor",
    "BusinessFunction": "Internal Audit",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "SOX 302",
      "SOX 404",
      "SOX 806",
      "whistleblower",
      "audit committee",
      "IMA ethics",
      "ASC 350-40"
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
    "Dependencies": [],
    "LearningObjectives": [
      "Identify the SOX section that creates personal certification liability for the CFO",
      "Identify the SOX section that protects the auditor from retaliation",
      "Determine the correct notification sequence when the immediate supervisor is implicated",
      "Classify a material weakness under SOX 404",
      "Match governance facts to the governing regulatory framework",
      "Recommend an integrated audit-committee response"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F5-E1",
        "CaseID": "CBQ21-F5",
        "Type": "email",
        "Title": "Exhibit 1 — Email from CFO Daniel Grant to Internal Auditor Sarah Okafor",
        "Purpose": "Establishes the CFO's directive to reclassify improperly capitalized software maintenance costs, the motivation to avoid restatement, and the instruction to keep the matter confidential; frames every item's ethical and regulatory analysis.",
        "ReferencedBy": [
          "CBQ21-F5-Q1",
          "CBQ21-F5-Q2",
          "CBQ21-F5-Q3",
          "CBQ21-F5-Q4",
          "CBQ21-F5-Q5",
          "CBQ21-F5-Q6"
        ],
        "Body": "From: Daniel Grant, Chief Financial Officer\nTo: Sarah Okafor, Internal Auditor\nSubject: Software maintenance reclassification\n\nSarah,\n\nI have reviewed your draft findings on the software maintenance invoices. We need to keep the full $1.2M capitalized this quarter. Reclassifying any portion to expense would push us below the debt covenant threshold and likely trigger a restatement. Please adjust the classification memo to reflect the original treatment and keep this between us until the audit committee meeting next month. The board does not need this distraction during the close.\n\nDaniel"
      },
      {
        "ExhibitID": "CBQ21-F5-E2",
        "CaseID": "CBQ21-F5",
        "Type": "table",
        "Title": "Exhibit 2 — Software Maintenance Cost Analysis",
        "Purpose": "Provides the breakdown of software costs, the proper accounting treatment under ASC 350-40, the debt covenant ratio, and the audit committee meeting timeline; supplies the quantitative inputs and governance context for all items.",
        "ReferencedBy": [
          "CBQ21-F5-Q1",
          "CBQ21-F5-Q2",
          "CBQ21-F5-Q3",
          "CBQ21-F5-Q4",
          "CBQ21-F5-Q5",
          "CBQ21-F5-Q6"
        ],
        "Headers": [
          "Item",
          "Amount / Detail"
        ],
        "Rows": [
          [
            "Total software maintenance invoices",
            "$1,200,000"
          ],
          [
            "Proper treatment under ASC 350-40",
            "Expense as incurred — costs do not extend useful life or add functionality"
          ],
          [
            "Current treatment per CFO directive",
            "Capitalized to intangible assets"
          ],
          [
            "Debt covenant: adjusted EBITDA-to-interest ratio minimum",
            "3.0x"
          ],
          [
            "Projected ratio if maintenance is expensed",
            "2.8x (breach)"
          ],
          [
            "Audit committee meeting scheduled",
            "Two weeks from current date"
          ],
          [
            "Effective tax rate",
            "25%"
          ]
        ],
        "DataFormat": "USD whole dollars; ratio and tax rate in percent",
        "AccuracyCheck": "The $1,200,000 misstatement reduces EBITDA by $1,200,000 and net income by $900,000 after tax; the 2.8x ratio is below the 3.0x covenant minimum, confirming breach risk"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Daniel Grant personally certifies Pinnacle's quarterly financial reports. Under which SOX section does Grant face personal liability if he knowingly certifies financial statements that contain the misstated software maintenance costs?",
        "Correct": "A",
        "Choices": [
          "SOX Section 302, which requires the CEO and CFO to certify that financial statements are fairly presented and that disclosure controls are effective, with personal liability for knowing violations",
          "SOX Section 404, which requires management to assess the effectiveness of internal controls over financial reporting annually",
          "SOX Section 806, which provides whistleblower protection for employees who report suspected securities law violations",
          "SOX Section 802, which imposes criminal penalties for altering or destroying documents to impede an official proceeding"
        ],
        "Explanation": "Section 302 of the Sarbanes-Oxley Act requires the CEO and CFO to personally certify each periodic report, affirming that the financial statements are fairly presented in all material respects, that responsibility for internal control has been designated, and that any material weaknesses in internal control have been disclosed. Grant is the CFO who certifies, so a knowing certification of statements carrying the improperly capitalized $1,200,000 exposes him personally to civil liability under 302, with separate criminal exposure under Section 906 for knowingly certifying false financial statements. The other sections govern different roles: Section 404 is management's annual assessment of internal control over financial reporting, not officer certification; Section 806 protects employees from retaliation when they report suspected violations, which is the role Sarah Okafor is in rather than Grant's; and Section 802 criminalizes destroying or altering documents to impede a proceeding, which is not at issue here. A common trap is crediting the certifying officer with Section 806, because 806 is the section most often cited in whistleblower discussions — but it protects the reporter, not the officer who certifies.",
        "Topic": "SOX Section 302 officer certification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Confusing officer certification liability (SOX 302) with internal control assessment (SOX 404).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 302",
          "officer certification",
          "personal liability"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Sarah Okafor decides to report the CFO's directive to the audit committee chair. Under which SOX section is Okafor protected from termination, demotion, or other retaliation by Pinnacle Logistics?",
        "Correct": "A",
        "Choices": [
          "SOX Section 806, which prohibits retaliation against employees who report suspected violations of securities laws or SEC rules to a federal agency, Congress, or their supervisor",
          "SOX Section 301, which requires audit committees to establish procedures for receiving and addressing complaints about accounting matters",
          "SOX Section 404, which requires management to document and test internal controls and report material weaknesses annually",
          "SOX Section 906, which imposes criminal penalties on officers who knowingly certify false financial statements"
        ],
        "Explanation": "SOX Section 806, added by the Sarbanes-Oxley Act of 2002, provides whistleblower protection to employees of publicly traded companies who report suspected securities law violations in good faith. Retaliation — including termination, demotion, suspension, threats, or harassment — is prohibited, and the employee may seek reinstatement, double back pay, and litigation costs. Section 301 addresses audit committee procedures, not whistleblower employment protection; Section 404 covers internal control assessment; Section 906 imposes criminal penalties on certifying officers. The trap is selecting Section 301 because it mentions complaints, but Section 301 does not create employment protection for the reporter.",
        "Topic": "SOX Section 806 whistleblower protection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Selecting SOX 301 (audit committee procedures) instead of SOX 806 (whistleblower employment protection).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 806",
          "whistleblower",
          "retaliation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Okafor's immediate supervisor is CFO Grant, who directed the improper capitalization. Under the IMA Statement of Ethical Professional Practice and the SOX framework, which three actions represent the correct resolution sequence?",
        "Correct": [
          "Document the facts — the $1,200,000 misclassification, the CFO's directive, and the supporting evidence — in the internal audit workpapers contemporaneously",
          "Escalate past the CFO to the audit committee chair through the company's established ethics resolution channel, because the supervisor is implicated",
          "Notify the external auditors of the disputed classification and the CFO's reclassification directive so they can evaluate the financial statement impact"
        ],
        "Choices": [
          "Document the facts — the $1,200,000 misclassification, the CFO's directive, and the supporting evidence — in the internal audit workpapers contemporaneously",
          "Escalate past the CFO to the audit committee chair through the company's established ethics resolution channel, because the supervisor is implicated",
          "Notify the external auditors of the disputed classification and the CFO's reclassification directive so they can evaluate the financial statement impact",
          "Comply with the CFO's reclassification request temporarily and revisit the treatment after the audit committee meeting to avoid triggering a covenant breach",
          "Contact the SEC Enforcement Division directly as the immediate first step without first attempting internal escalation",
          "Share the findings informally with peers at competing logistics companies to assess industry norms before escalating"
        ],
        "Explanation": "The IMA Statement of Ethical Professional Practice requires members to follow the organization's established resolution policy. When the immediate supervisor is implicated, the member must escalate to the next-higher level — in Pinnacle's governance structure, the audit committee chair. Contemporaneous documentation preserves the evidentiary record, and notifying external auditors ensures the independent auditors can evaluate the classification for the financial statements. Complying temporarily maintains the misstatement and removes the auditor's ability to act in good faith; contacting the SEC before exhausting internal channels is premature under IMA guidance; and sharing facts externally breaches confidentiality. The trap is assuming external reporting or resignation are opening moves; the IMA framework sequences internal escalation first.",
        "Topic": "IMA ethical conflict resolution sequence",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming SEC reporting or resignation are first steps instead of internal escalation through the established ethics channel.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "IMA ethics",
          "escalation",
          "resolution sequence"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "If Pinnacle's $1,200,000 misclassification is not corrected before the year-end financial statements are issued, how would the deficiency be classified under SOX Section 404?",
        "Correct": "B",
        "Choices": [
          "AnControl deficiency, because the error is limited to a single transaction and does not involve the CEO or CFO",
          "A material weakness, because the misstatement is material and the CFO — a member of senior management — directed the improper accounting, indicating a more-than-remote likelihood that a material misstatement will not be prevented or detected on a timely basis",
          "A significant deficiency, because the error involves a material amount but is limited to software cost classification and does not affect the overall fairness of the financial statements",
          "Not reportable, because the proper treatment was identified during the internal audit and therefore the internal control system operated effectively"
        ],
        "Explanation": "Under AS 2201 (implementing SOX Section 404), a material weakness is a deficiency, or combination of deficiencies, in internal control over financial reporting such that there is a more-than-remote likelihood that a material misstatement will not be prevented or detected on a timely basis. The $1,200,000 amount is material relative to Pinnacle's financial statements, and critically, the CFO — the individual responsible for certifying financial statements under SOX 302 — directed the improper accounting. Senior management involvement elevates the deficiency beyond a significant deficiency because it indicates the entity-level controls are compromised. The fact that the error was identified by internal audit does not excuse the deficiency; the deficiency is that the control environment permitted the misstatement to occur. The trap is assuming that detection after the fact means the control operated effectively.",
        "Topic": "SOX Section 404 material weakness classification",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Classifying a management-directed material misstatement as a significant deficiency because it is limited to one line item.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX 404",
          "material weakness",
          "internal controls"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each fact from the Pinnacle Logistics scenario to the governance or regulatory framework that governs it.",
        "LeftItems": [
          "CFO personally certifying that financial statements are fairly presented",
          "Employee reporting a suspected securities violation with employment protection",
          "Management documenting and assessing internal controls over financial reporting",
          "Audit committee receiving and acting on complaints about accounting practices"
        ],
        "RightItems": [
          "SOX Section 302 — Corporate Responsibility for Financial Reports",
          "SOX Section 806 — Whistleblower Protection",
          "SOX Section 404 — Management Assessment of Internal Controls",
          "SOX Section 301 — Audit Committee Procedures",
          "Dodd-Frank Act — SEC Whistleblower Bounty Program"
        ],
        "Correct": {
          "CFO personally certifying that financial statements are fairly presented": "SOX Section 302 — Corporate Responsibility for Financial Reports",
          "Employee reporting a suspected securities violation with employment protection": "SOX Section 806 — Whistleblower Protection",
          "Management documenting and assessing internal controls over financial reporting": "SOX Section 404 — Management Assessment of Internal Controls",
          "Audit committee receiving and acting on complaints about accounting practices": "SOX Section 301 — Audit Committee Procedures"
        },
        "Explanation": "Each governance fact maps to a specific SOX provision: CFO certification liability is Section 302; employee whistleblower employment protection is Section 806; management's internal control documentation and assessment is Section 404; and audit committee responsibility for complaint procedures is Section 301. The Dodd-Frank Act's SEC Whistleblower Bounty Program is a genuine framework but does not match any of the four listed duties — it provides a financial incentive (10–30% of sanctions over $1M) rather than a governance procedure, making it the decoy. The trap is matching the audit committee to Section 806 because both relate to reporting; Section 301 specifically assigns the audit committee the duty to establish complaint procedures.",
        "Topic": "Governance framework mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Matching the audit committee to SOX 806 instead of SOX 301, or selecting Dodd-Frank as a duty rather than a bounty program.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "SOX sections",
          "governance mapping",
          "Dodd-Frank"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "The audit committee chair has received Okafor's report. Grant maintains that the reclassification is a reasonable judgment call and urges the committee to defer correction until after the debt covenant test. What is the most appropriate integrated response by the audit committee?",
        "Correct": "D",
        "Choices": [
          "Accept the CFO's judgment call and defer the reclassification decision to the next quarter to preserve the current covenant ratio",
          "Direct the controller to reclassify the $1,200,000 to expense and disclose the resulting covenant breach in the notes to the financial statements without notifying the external auditors",
          "Suspend Okafor from internal audit duties pending an investigation to determine whether her report was motivated by a personal grievance against the CFO",
          "Instruct management to correct the financial statements by expensing the $1,200,000, disclose the material weakness under SOX 404, notify the external auditors of the correction, and document the CFO's role in the misclassification for the board's governance review"
        ],
        "Explanation": "The audit committee's fiduciary duty requires it to act on credible evidence of a material misstatement directed by a senior officer. The correct response integrates all governance obligations: (1) correct the financial statements — the misstatement is unambiguous under ASC 350-40; (2) disclose the material weakness under SOX 404 — the CFO's involvement elevates the deficiency; (3) notify the external auditors — they must evaluate the correction and the internal control implications for their audit opinion; and (4) document the CFO's role — this protects the committee's oversight record and supports any subsequent personnel decisions. Deferral preserves the misstatement through a covenant test, which is unacceptable. Correcting without notifying the auditors deprives the independent audit of material information. Suspending the auditor retaliates against a protected whistleblower under SOX 806. The trap is treating this as a binary choice between correction and deferral; the audit committee must integrate correction, disclosure, external-auditor notification, and governance documentation into a single coordinated response.",
        "Topic": "Audit committee integrated response",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing deferral (preserves misstatement) or correction without auditor notification (incomplete response).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "audit committee",
          "material weakness",
          "integrated response"
        ],
        "Dependencies": []
      }
    ],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-B6",
    "Title": "Covered Interest Arbitrage and the FX Hedge Decision",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Apply international finance concepts including forward premiums and covered interest arbitrage",
      "Compare hedging alternatives for foreign-currency receivables"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Vantage Precision Components, a mid-size manufacturer of aerospace valve assemblies headquartered in Detroit, has invoiced its German distributor GEKO Luftfahrt GmbH for €5,000,000 due in 90 days. CFO Linda Hargrove must present the treasury committee with a recommendation on how to manage the euro exposure. The three options on the table are a forward contract, a money-market hedge, or remaining unhedged and accepting whatever spot rate prevails at settlement.",
    "Industry": "Aerospace manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Vantage Precision Components",
    "Stakeholder": "CFO Linda Hargrove",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FX",
      "forward hedge",
      "money-market hedge",
      "covered interest arbitrage"
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
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Calculate the annualized forward premium on a foreign currency",
      "Compute the USD proceeds of a money-market hedge on a euro receivable",
      "Compare forward, money-market, and unhedged alternatives for FX exposure",
      "Identify the condition under which covered interest arbitrage is profitable",
      "Evaluate which market factors determine hedge superiority",
      "Formulate a board-level FX hedging recommendation"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B6-E1",
        "CaseID": "CBQ21-B6",
        "Type": "table",
        "Title": "Exhibit 1 — Market FX and Interest Rates",
        "Purpose": "Provides spot rate, 90-day forward rate, and annualized borrowing and deposit rates in USD and EUR for forward premium, money-market hedge, and arbitrage computations.",
        "ReferencedBy": [
          "CBQ21-B6-Q1",
          "CBQ21-B6-Q2",
          "CBQ21-B6-Q3",
          "CBQ21-B6-Q4",
          "CBQ21-B6-Q5"
        ],
        "Headers": [
          "Item",
          "Value"
        ],
        "Rows": [
          [
            "Spot rate (USD per EUR)",
            "1.0850"
          ],
          [
            "90-day forward rate (USD per EUR)",
            "1.0920"
          ],
          [
            "EUR 90-day deposit rate (annualized)",
            "3.50%"
          ],
          [
            "USD 90-day deposit rate (annualized)",
            "4.80%"
          ],
          [
            "EUR 90-day borrowing rate (annualized)",
            "5.50%"
          ],
          [
            "USD 90-day borrowing rate (annualized)",
            "6.25%"
          ]
        ],
        "DataFormat": "FX rates as USD/EUR; interest rates annualized on 360-day basis",
        "AccuracyCheck": "Forward premium = 2.60% annualized; rate differential = 1.30% annualized"
      },
      {
        "ExhibitID": "CBQ21-B6-E2",
        "CaseID": "CBQ21-B6",
        "Type": "contract",
        "Title": "Exhibit 2 — Sales Contract Terms",
        "Purpose": "Establishes the receivable amount, currency, settlement date, and late-payment terms.",
        "ReferencedBy": [
          "CBQ21-B6-Q3",
          "CBQ21-B6-Q6"
        ],
        "Headers": [],
        "Rows": [],
        "Body": "Vantage Precision Components shipped aerospace valve assemblies to GEKO Luftfahrt GmbH under Invoice 2026-INV-0847. Amount: EUR 5,000,000, payable within 90 days of August 1 shipment (due November 1). Late payment accrues interest at EURIBOR plus 200 bps. Title transfers on delivery."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B6-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the annualized forward premium on the euro, expressed as a percentage rounded to two decimals. Use the 360-day year convention.",
        "Correct": "2.60",
        "Explanation": "Forward premium = (Forward - Spot) / Spot x (360/Days) x 100 = (1.0920 - 1.0850) / 1.0850 x (360/90) x 100 = (0.0070/1.0850) x 4 x 100 = 0.6452% x 4 = 2.60% annualized. A positive result means the euro trades at a forward premium against the dollar. The 360-day convention is standard in FX markets. A common error is using 365 days, yielding 2.56% and misstating the premium. This magnitude exceeds the USD-EUR deposit rate differential (4.80% - 3.50% = 1.30%) and drives the hedge comparison in subsequent questions.",
        "Topic": "Forward premium",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Using 365 days instead of 360 (FX convention)."
      },
      {
        "ItemID": "CBQ21-B6-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the guaranteed USD proceeds under a money-market hedge of the €5,000,000 receivable. Round to nearest whole dollar.",
        "Correct": "5426762",
        "Explanation": "Money-market hedge: (1) Borrow EUR today: €5,000,000 / (1 + 0.055 x 90/360) = €5,000,000 / 1.01375 = €4,942,316. (2) Convert at spot: €4,942,316 x 1.0850 = $5,362,413. (3) Invest USD 90 days: $5,362,413 x (1 + 0.048 x 90/360) = $5,362,413 x 1.012 = $5,426,762. The forward hedge yields €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher. A common error is using the EUR deposit rate instead of the EUR borrowing rate for the loan principal, understating proceeds.",
        "Topic": "Money-market hedge",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Money-market hedge framework",
        "CommonTrapReference": "Using EUR deposit rate instead of EUR borrowing rate for loan principal."
      },
      {
        "ItemID": "CBQ21-B6-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which hedging alternative yields the highest guaranteed USD proceeds for the €5,000,000 receivable?",
        "Correct": "A",
        "Choices": [
          "Forward hedge at $5,460,000 — the forward premium exceeds the interest rate differential, making the forward contract more valuable than the money-market hedge",
          "Money-market hedge at $5,426,762 — borrowing EUR at the lower rate and investing in USD earns a higher net return",
          "Remaining unhedged — the positive forward premium signals EUR appreciation, guaranteeing a higher spot rate at settlement",
          "Money-market hedge at $5,460,000 — the forward contract introduces counterparty risk that the money-market hedge eliminates"
        ],
        "Explanation": "The forward hedge locks in €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher than the money-market hedge of $5,426,762. The forward hedge wins because the forward premium (2.60%) exceeds the interest rate differential (4.80% - 3.50% = 1.30%). When the forward premium exceeds the rate differential, the forward rate offers more value than the synthetic rate replicable through borrowing and investing. Remaining unhedged is not guaranteed — the future spot rate is uncertain.",
        "Topic": "Hedge comparison",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Selecting money-market hedge by confusing EUR deposit rate with EUR borrowing rate."
      },
      {
        "ItemID": "CBQ21-B6-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Under the current rates, covered interest arbitrage would be profitable. Which condition best explains why?",
        "Correct": "A",
        "Choices": [
          "The forward premium of 2.60% exceeds the USD-EUR deposit rate differential of 1.30%, so borrowing EUR, converting at spot, investing in USD, and selling EUR forward generates a return above the USD deposit rate",
          "The spot rate of 1.0850 is below the forward rate of 1.0920, so purchasing EUR forward and selling EUR spot simultaneously yields a riskless profit of $0.007 per EUR",
          "The EUR borrowing rate of 5.50% is below the USD deposit rate of 4.80%, so borrowing EUR and investing in USD generates a positive carry without forward cover",
          "The USD borrowing rate of 6.25% exceeds the EUR deposit rate of 3.50%, creating a profit opportunity by borrowing USD and investing in EUR"
        ],
        "Explanation": "Covered interest arbitrage is profitable when the forward premium exceeds the interest rate differential. Here, the annualized forward premium on EUR is 2.60%, while the USD-EUR deposit rate differential is only 1.30%. A trader could borrow EUR, convert at spot, invest in USD, and sell EUR forward to lock in a return exceeding the USD deposit rate. Option B describes a simple forward-spot spread but ignores borrowing and investing costs. Option C is factually wrong: EUR borrowing rate (5.50%) exceeds USD deposit rate (4.80%). Option D borrows the higher-rate currency and invests in the lower-rate currency — a loss.",
        "Topic": "Covered interest arbitrage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CB-09: Interest rate parity",
        "CommonTrapReference": "Confusing the direction of the arbitrage — profitable strategy borrows low-rate currency."
      },
      {
        "ItemID": "CBQ21-B6-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two factors most directly determine why the forward hedge yields higher proceeds than the money-market hedge? (Select two.)",
        "Correct": [
          "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
          "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge"
        ],
        "Choices": [
          "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
          "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge",
          "The spot rate of 1.0850, which sets the initial conversion amount under both hedges",
          "The USD borrowing rate of 6.25%, which determines the cost of the forward contract premium",
          "The EUR borrowing rate of 5.50%, which sets the floor for the money-market hedge proceeds"
        ],
        "Explanation": "The forward hedge is superior because the forward rate (1.0920) determines the guaranteed USD proceeds under the forward contract, and the interest rate differential (USD deposit 4.80% minus EUR deposit 3.50% = 1.30%) determines the synthetic exchange rate achievable through the money-market hedge. When the forward premium (2.60%) exceeds this differential (1.30%), the forward contract offers more value. The spot rate affects both hedges equally and does not explain the difference..",
        "Topic": "Hedge factor analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "CB-09: Interest rate parity",
        "CommonTrapReference": "Selecting spot rate as a differentiator — it affects both hedges equally."
      },
      {
        "ItemID": "CBQ21-B6-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each hedging concept to its correct characterization for Vantage's €5,000,000 receivable.",
        "Correct": {
          "Forward hedge proceeds": "$5,460,000",
          "Money-market hedge proceeds": "$5,426,762",
          "Forward premium (annualized)": "2.60%",
          "Arbitrage condition": "Forward premium exceeds rate differential",
          "Unhedged risk": "EUR depreciation below 1.0850 at settlement"
        },
        "LeftItems": [
          "Forward hedge proceeds",
          "Money-market hedge proceeds",
          "Forward premium (annualized)",
          "Arbitrage condition",
          "Unhedged risk"
        ],
        "RightItems": [
          "$5,460,000",
          "$5,426,762",
          "2.60%",
          "Forward premium exceeds rate differential",
          "EUR depreciation below 1.0850 at settlement"
        ],
        "Explanation": "Forward hedge proceeds = €5,000,000 x 1.0920 = $5,460,000. Money-market hedge yields $5,426,762 after borrowing EUR, converting at spot, and investing in USD. Forward premium is 2.60% annualized. Covered interest arbitrage is profitable when forward premium exceeds the rate differential (2.60% > 1.30%). Unhedged exposure risks EUR depreciation below the spot rate of 1.0850, reducing the USD value at settlement.",
        "Topic": "FX hedging integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "CB-09: Forward/FX Premium or Discount",
        "CommonTrapReference": "Confusing money-market hedge proceeds with forward hedge proceeds."
      }
    ],
    "certification_session": "P2-PACK1-CERT-W2",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-C7",
    "Title": "Two-Constraint Product Mix and the Shadow Price at Velox Precision",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "C.5 — Capacity constra