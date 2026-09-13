const MCQ_BANK_B_PART_39 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.145 information systems lifecycle",
    "MicroTopic": "system implementation strategies",
    "UniqueConceptKey": "B-F-145-system-implementation-strategies",
    "LOSTag": "Information Systems Lifecycle",
    "primaryTheory": "F1",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Eastwood Medical, a hospital network with 5 facilities, is integrating Epic (EHR) financial data into Workday (ERP) to create a unified financial reporting platform. The project replaces 5 separate billing-system-to-GL interfaces with a single Epic-Workday integration handling $1.4B in annual patient revenue transactions. The CIO, Robert Klein, has analyzed four implementation strategies: (Strategy 1) Big Bang — all 5 hospital interfaces cut over simultaneously on a single go-live date; all legacy interfaces are decommissioned on the same date; projected cutover cost $380,000; timeline 2-day cutover window; risk: if the integration fails, all 5 hospitals lose billing-to-GL connectivity simultaneously, affecting $11.7M in daily revenue recognition; (Strategy 2) Phased Rollout — hospitals converted one at a time over 5 consecutive months (1 hospital per month); each hospital operates on the new integration while remaining hospitals continue on legacy interfaces; projected cutover cost $620,000 (extended parallel operations); timeline 5 months; risk: the finance team must operate and reconcile across TWO different integration architectures during the transition, increasing close complexity and error risk; (Strategy 3) Parallel Run — all 5 hospitals operate BOTH the legacy interfaces and the new integration simultaneously for 3 months; revenue is recorded through the legacy system while the new integration output is validated against legacy results; after successful reconciliation for 3 consecutive month-end closes, legacy interfaces are decommissioned; projected cutover cost $890,000; timeline 3 months + 2-day cutover; risk: 3 months of dual data entry and reconciliation significantly increases the finance team's workload, and the validation creates 100% data redundancy during the parallel period; (Strategy 4) Pilot Conversion — Hospital 3 (the smallest facility, 12% of revenue volume) is converted first as a 30-day pilot; after successful pilot, the remaining 4 hospitals convert in a 2-month phased rollout (2 hospitals per month); projected cutover cost $510,000; timeline 3 months; risk: the pilot hospital runs the new integration alone for 30 days, creating a 1-legacy/1-new architecture that must be supported during the pilot. The CFO requires that revenue recognition must not be disrupted during the conversion (zero missed revenue postings) and the finance team's monthly close workload must not increase by more than 20% during the transition. Which strategy should the CIO recommend?",
    "CorrectChoice": "C",
    "ExplanationCorrect": "Strategy 4 (Pilot Conversion) is the correct recommendation. It satisfies both CFO constraints: (1) Revenue recognition continuity — the pilot hospital (12% of revenue volume) runs the new integration while the remaining 4 hospitals stay on stable legacy interfaces; if the pilot fails, at most $1.4M/day in revenue recognition is at risk (vs. $11.7M/day under Big Bang); (2) Close workload — during the 30-day pilot, only 1 of 5 hospitals is on the new integration, keeping the additional close complexity at approximately 15-18% (within the 20% cap); after successful pilot validation, the phased rollout converts 2 hospitals/month, maintaining manageable incremental complexity. At $510,000, Strategy 4 is $110,000 more expensive than Big Bang but provides a risk-mitigated learning path that the other strategies do not: Big Bang has no learning period (if it fails, all 5 hospitals fail simultaneously), Phased Rollout has no pre-scale validation (each hospital is the learning experience for the next), and Parallel Run validates thoroughly but at nearly double the cost and triple the finance team workload. The system implementation principle tested is that healthcare financial systems — where revenue recognition is a material financial reporting item — require a risk-calibrated implementation strategy that validates on low-risk components before scaling.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-145",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Strategy 3 (Parallel Run) — it provides the highest assurance of data accuracy through 3 months of side-by-side validation, and the $890,000 cost is justified by the elimination of revenue recognition risk for $1.4B in annual transactions",
      "B": "Strategy 1 (Big Bang) — it is the fastest (2 days vs. 3-5 months), cheapest ($380,000), and minimizes the period of dual-architecture complexity; a well-tested integration with a defined rollback plan makes this the most efficient choice",
      "C": "Strategy 4 (Pilot Conversion) — it validates the integration on the lowest-risk facility (12% of revenue volume) before expanding, provides a 30-day learning period to resolve issues before the larger facilities convert, limits the close-complexity increase by keeping 4 hospitals on legacy during the pilot, and costs $510,000 (mid-range among the four options)",
      "D": "Strategy 2 (Phased Rollout) — it balances speed and risk by converting hospitals one at a time with a manageable 5-month timeline and $620,000 cost, limiting disruption to one hospital at a time while providing learning between conversions"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "Parallel Run provides the highest data accuracy assurance through side-by-side validation, which is genuinely valuable for financial reporting integrity. However, 3 months of running dual interfaces at all 5 hospitals means every transaction is recorded twice, every reconciliation must verify both sources, and every month-end close processes twice the normal transaction volume. This would increase the finance team's close workload by approximately 60-80% — far exceeding the CFO's 20% cap. Additionally, $890,000 is $510,000 more than Big Bang and $380,000 more than Pilot Conversion — a significant premium for assurance that a successful pilot can provide at much lower cost. The principle is that implementation risk mitigation should be proportional to the risk — 100% redundancy for 3 months is disproportionate when a pilot-then-phased approach provides equivalent validation at lower cost.",
    "ExplanationWrongB": "Big Bang is attractive for its speed (2 days) and cost ($380,000 — $130,000 cheaper than Pilot Conversion). For non-critical systems, Big Bang can be the right choice. However, Eastwood's Epic-Workday integration processes $1.4B in annual patient revenue — a material financial reporting item where a cutover failure means $11.7M in daily unrecognized revenue. The 2-day cutover window provides zero learning or recovery time: the integration either works perfectly on day 1 or all 5 hospitals lose billing-to-GL connectivity. The 'well-tested integration with a defined rollback plan' assumption is only valid if the testing environment perfectly replicates the production environment, which is almost never the case for complex EHR-to-ERP integrations with unique data quality characteristics at each hospital. A risk of this magnitude on a material financial reporting item warrants a validated, evidence-based implementation, not a confidence assumption.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Phased Rollout reduces the blast radius of a failure (1 hospital at a time vs. 5 simultaneously) and provides learning between conversions. However, unlike Pilot Conversion, there is no pre-scale validation period — Hospital 1 IS the pilot, and any issues discovered during Hospital 1's conversion are ALREADY in production affecting $2.8M/day in revenue. Pilot Conversion's architecture — validate on the smallest hospital (12% of revenue), fix issues, then scale — is fundamentally safer because the learning occurs in a controlled environment before organizational-scale exposure. Phased Rollout without a pilot is learning IN production, which is acceptable for non-critical systems but not for a $1.4B revenue processing integration.",
    "CognitiveLevel": "Analyze",
    "DifficultyScore": 3,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.146 data governance",
    "MicroTopic": "data lineage",
    "UniqueConceptKey": "B-F-146-data-lineage",
    "LOSTag": "Data Governance Frameworks",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "During a financial audit, the auditor needs to trace a specific amount in the financial statements back to its source transactions, through all intermediate calculations and transformations. This tracking capability is known as:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Data lineage provides a visual map of data flow from source to destination, documenting every transformation, calculation, and movement along the way. This is critical for audit trails, impact analysis, and ensuring the accuracy and integrity of financial data.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-146",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Data mining",
      "B": "Data lineage",
      "C": "Data profiling",
      "D": "Data encryption"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "Data mining discovers patterns in large datasets. The described tracing of specific amounts requires tracking data transformations, not pattern discovery.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Data profiling examines data quality characteristics. The described need is tracing data origins and transformations, not assessing quality.",
    "ExplanationWrongD": "Data encryption protects data confidentiality. The described tracing requirement is about data provenance, not security.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.147 data quality",
    "MicroTopic": "data quality dimensions - timeliness",
    "UniqueConceptKey": "B-F-147-data-quality-timeliness",
    "LOSTag": "Data Quality Dimensions",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Titan Corp's management is concerned that the sales data used for weekly revenue reports is always three days old because of delays in data collection and processing. Which data quality dimension is most affected?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Timeliness measures whether data is current and available when needed. If data is consistently three days old, it may not be timely enough for decisions that require current information.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-147",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Timeliness",
      "B": "Completeness",
      "C": "Accuracy",
      "D": "Consistency"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Completeness checks whether all required data is present. The described issue is about data age, not missing data.",
    "ExplanationWrongC": "Accuracy measures whether data reflects real-world values. The described concern is about the delay, not the correctness of values.",
    "ExplanationWrongD": "Consistency concerns uniform formatting and representation. The described issue of data being three days old most directly affects timeliness.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.148 RPA",
    "MicroTopic": "RPA control considerations",
    "UniqueConceptKey": "B-F-148-RPA-control-considerations",
    "LOSTag": "Robotic Process Automation",
    "primaryTheory": "F4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor Distribution operates a network of 38 regional warehouses with a centralized SAP S/4HANA system. The finance team deployed 9 RPA bots to automate: goods-receipt-to-invoice matching, credit memo processing, inter-warehouse transfer reconciliation, and month-end accrual calculations. During a SOX ITGC audit, the IT Audit Manager, Leo Tran, identified three control deficiencies requiring remediation: (Deficiency A) Bot Credential Sharing — 6 of 9 bots authenticate to SAP using a single shared service account ('BOT_SVC_01') with broad authorization to post journal entries, create purchase orders, and approve invoices up to $100,000; the SAP audit log cannot distinguish which bot executed which transaction, making individual bot accountability impossible; exploitation scenario: if any of the 6 bots' runtime environments are compromised, the attacker can post journal entries and approve invoices up to $100,000 without detection; (Deficiency B) Unlogged Transaction Overrides — 3 bots (credit memo processing, inter-warehouse transfer, month-end accrual) have hardcoded exception-override logic that bypasses the standard SAP approval workflow when the bot encounters a data mismatch; in the past quarter, these 3 bots processed 47 transactions totaling $892,000 that bypassed the approval workflow entirely, with no compensating detective control to flag the bypassed approvals; (Deficiency C) Untested Exception-Handling Scripts — 7 of 9 bots contain exception-handling scripts that have never been tested against the full range of possible SAP error codes; the scripts were copied from a Stack Overflow post and modified by the RPA developer without formal testing; when a bot encounters an untested error code, it retries the transaction 5 times (generating duplicate postings in 2 documented instances) or terminates silently (abandoning unprocessed transactions in 4 documented instances). The IT Audit Manager must present these three deficiencies to the Audit Committee ranked by severity, with the highest-severity deficiency addressed first within the Q4 remediation budget of $280,000. Which deficiency should be ranked highest?",
    "CorrectChoice": "C",
    "ExplanationCorrect": "Deficiency A (Bot Credential Sharing) is the highest-severity deficiency. The SOX ITGC framework prioritizes access control deficiencies above all others because access controls are the foundation upon which all other internal controls depend (COSO Principle 10: Control Activities — 'selects and develops control activities that contribute to the mitigation of risks'). The shared BOT_SVC_01 credential with broad authorization creates a compound control failure: segregation of duties is eliminated (one credential can initiate, record, and approve transactions), individual accountability is impossible (the SAP audit log cannot attribute transactions to specific bots), and the blast radius of a single compromise spans 6 of 9 bots across 4 business processes with approval authority up to $100,000. This deficiency also amplifies Deficiencies B and C — the transaction overrides in Deficiency B and the duplicate postings in Deficiency C are executed using the uncontrolled credential from Deficiency A. Fixing the credential architecture (unique bot service accounts with least-privilege authorization) makes the other two deficiencies detectable, even if not yet fully remediated.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-148",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Deficiency C (Untested Exception-Handling Scripts) — affecting 7 of 9 bots, this is the most widespread deficiency; duplicate postings and silent terminations directly affect the completeness and accuracy of financial records across the widest range of business processes",
      "B": "Deficiency B (Unlogged Transaction Overrides) — 47 transactions totaling $892,000 bypassed the SAP approval workflow in a single quarter, representing actual (not theoretical) financial statement impact; the absence of compensating detective controls means management cannot identify which bypassed transactions may be inappropriate",
      "C": "Deficiency A (Bot Credential Sharing) — a single compromised bot runtime grants an attacker the ability to post journal entries and approve invoices up to $100,000 across 6 different business processes, with the shared credential making individual accountability impossible; this represents the most severe segregation-of-duties and access-control breakdown",
      "D": "three deficiencies are equally severe because they create a reasonable possibility that a material misstatement could occur and not be prevented or detected; the Audit Committee should authorize an emergency budget increase to remediate three simultaneously"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "Deficiency C affects the most bots (7 of 9) and has documented financial impact (2 duplicate postings, 4 abandoned transactions). However, the severity assessment distinguishes between errors (untested scripts producing duplicate or abandoned transactions) and control breakdowns (uncontrolled access enabling unauthorized transactions). Deficiency C is an operational-quality deficiency — the bots make mistakes due to inadequate testing. Deficiency A is a control-design deficiency — the architecture itself prevents accountability. Operational errors can be corrected through testing; control-design failures require architectural remediation. The SOX severity framework and PCAOB guidance (AS 2201) consistently rank design deficiencies above operating-effectiveness deficiencies.",
    "ExplanationWrongB": "Deficiency B is genuinely severe — $892,000 in transactions bypassing the approval workflow in one quarter is a material control failure with actual (not hypothetical) financial statement impact. The lack of compensating detective controls means management cannot assess whether these bypassed transactions were legitimate exceptions or unauthorized entries. However, the severity ranking framework under SOX considers not just the current impact but the remediation sequence. The unlogged overrides in Deficiency B are executed through BOT_SVC_01 — the same uncontrolled credential identified in Deficiency A. Remediating A first (unique bot credentials) makes B's overrides attributable to specific bots, transforming an undetectable set of unauthorized transactions into an auditable trail of bot-specific activity. Fixing B without A leaves the underlying access control breakdown unresolved.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "The Audit Committee specifically requested a SEVERITY RANKING, not a blanket classification. While all three deficiencies represent significant control weaknesses in the RPA environment, the professional standards (PCAOB AS 2201, COSO Principle 12) require the auditor to evaluate deficiencies both individually and in combination, and to assign severity classifications that guide management's remediation prioritization. Treating all three as equally severe defers the judgment that the Committee asked the IT Audit Manager to exercise. Additionally, the $280,000 Q4 budget constraint is real — recommending emergency budget increases for every finding is not a sustainable audit recommendation practice.",
    "CognitiveLevel": "Evaluate",
    "DifficultyScore": 4,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.149 privacy regulations",
    "MicroTopic": "cross-border data transfers",
    "UniqueConceptKey": "B-F-149-cross-border-data-transfers",
    "LOSTag": "Privacy Regulations (GDPR, CCPA)",
    "primaryTheory": "F6",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A U.S.-based company transfers personal data of EU customers to its headquarters in the United States for processing. Under GDPR, which mechanism permits this cross-border data transfer?",
    "CorrectChoice": "D",
    "ExplanationCorrect": "GDPR restricts transfers of personal data to countries outside the European Economic Area unless specific safeguards are in place. Standard Contractual Clauses (SCCs) are a commonly used mechanism, along with adequacy decisions (where the European Commission has deemed a country's protections adequate), binding corporate rules, or explicit consent.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-149",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "A simple email notification to customers",
      "B": "A verbal agreement between the company and its customers",
      "C": "No mechanism is needed because the company is U.S.-based",
      "D": "Standard Contractual Clauses (SCCs) or an adequacy decision by the European Commission"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "A simple email notification without obtaining explicit consent does not satisfy GDPR requirements for cross-border data transfers.",
    "ExplanationWrongB": "A verbal agreement between company and customers does not provide the documented consent required for cross-border data transfers.",
    "ExplanationWrongC": "GDPR applies to any company handling EU personal data regardless of the company's location, so a mechanism IS needed.",
    "ExplanationWrongD": "",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.150 data analytics",
    "MicroTopic": "analytics maturity model",
    "UniqueConceptKey": "B-F-150-analytics-maturity",
    "LOSTag": "Data Analytics Types",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A company's analytics capability has evolved from basic reporting (what happened) to understanding root causes, then to forecasting future trends, and finally to recommending optimal decisions. This progression through descriptive, diagnostic, predictive, and prescriptive analytics corresponds to which concept?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "The analytics maturity model describes the progression of organizational analytics capability from descriptive (what happened) to diagnostic (why it happened) to predictive (what will happen) to prescriptive (what should we do). Each level builds on the previous and requires more sophisticated tools, data, and skills.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-150",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "The SDLC lifecycle",
      "B": "The analytics maturity model",
      "C": "Data governance maturity",
      "D": "The COSO ERM framework"
    },
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax: Principles of Accounting, Technology and Analytics",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
    ],
    "ExplanationWrongA": "The SDLC lifecycle describes system development phases, not the progression of analytics capability.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Data governance maturity models focus on data policies, stewardship, and quality management. The described progression from descriptive to prescriptive analytics describes the analytics maturity model, not data governance maturity.",
    "ExplanationWrongD": "The COSO ERM framework addresses enterprise risk management, not the evolution of analytics capabilities.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  }
];