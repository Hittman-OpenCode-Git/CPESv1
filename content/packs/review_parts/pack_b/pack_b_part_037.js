const MCQ_BANK_B_PART_37 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.119 cybersecurity",
    "MicroTopic": "network security controls",
    "UniqueConceptKey": "B-F-119-network-security-controls",
    "LOSTag": "Cybersecurity — Confidentiality, Integrity, Availability",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Atlas Corp has implemented a firewall, intrusion detection system, and network segmentation to separate the accounting network from other parts of the organization. These are examples of which type of security control?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Technical controls (also called logical controls) are security mechanisms implemented through technology, including firewalls, intrusion detection systems, encryption, access control lists, and network segmentation. They protect systems and data through automated technical means.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-119",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Technical (logical) controls",
      "B": "Administrative controls",
      "C": "Corrective controls",
      "D": "Physical controls"
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
    "ExplanationWrongB": "Administrative controls are policies, procedures, and training. Firewalls, IDS, and network segmentation are technical (logical) controls implemented through technology.",
    "ExplanationWrongC": "Corrective controls address issues after detection. The described controls are preventive, not corrective.",
    "ExplanationWrongD": "Physical controls involve tangible barriers like locks and fences. Firewalls and IDS are logical/technical measures.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.120 AI and machine learning",
    "MicroTopic": "AI risks in accounting",
    "UniqueConceptKey": "B-F-120-AI-risks-accounting",
    "LOSTag": "Artificial Intelligence and Machine Learning",
    "primaryTheory": "F4",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quantum Dynamics processes 45,000 expense reports monthly across operations in 12 countries, consuming approximately 4,200 person-hours per month in manual classification of line items into 87 general ledger account codes. CFO Priya Nair has approved deployment of a supervised machine learning model trained on three years of historical data representing 540,000 labeled transactions. The model achieved 94% classification accuracy in holdout testing against human-classified records. Over a six-month phased rollout, the model is projected to reduce manual classification effort by 85%, saving an estimated $1.7M annually. Controller Marcus Webb's implementation review identified that the training data contains expense reports classified by a department that experienced 40% staff turnover during the three-year training window, with several interim contractors performing classifications using inconsistent criteria. Webb must submit his pre-deployment risk assessment to the audit committee. From the perspective of financial reporting integrity — specifically the risk of material misstatement in the general ledger — which concern should Webb designate as the MOST critical?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Systematic replication of training-data errors — commonly termed 'garbage in, garbage out' in machine learning contexts — represents the most critical financial reporting risk when deploying ML models in accounting processes. The controller's specific finding that a department with 40% staff turnover and inconsistent contractor classifications contributed training data is a red flag: the model learned classification patterns from a period when the human classifiers themselves were unreliable. A supervised learning model optimizes to reproduce the patterns in its training data, not to discover the 'correct' classification according to GAAP or company policy. If 6% of training transactions were misclassified — a plausible rate given the staffing instability Webb documented — the model will learn to misclassify similar future transactions approximately 6% of the time. Crucially, these errors are systematic rather than random: the model learns specific misclassification patterns (e.g., 'all invoices from Vendor X with 'consulting' in the description go to Account 6200') and applies them consistently. The 94% testing accuracy reported by the data science team was measured against the same potentially flawed human classifications — the model may be 94% accurate at replicating human decisions while both the model and the humans are wrong on the same transactions. This creates a financial reporting risk where material misstatements accumulate systematically across thousands of transactions without the random variation that would trigger variance analysis flags. Under COSO's internal control framework, the integrity of data feeding automated classification systems is a critical IT general control — when input data integrity cannot be verified, the automated control is unreliable regardless of its technical sophistication.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-120",
    "recertification_batch": "EV Explanation Enrichment and DL-009 Citation Repair",
    "recertification_date": "2026-09-05",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "The model may systematically replicate and amplify historical misclassification patterns embedded in the training data, producing confidently wrong classifications that are statistically indistinguishable from correct ones without transaction-level human review.",
      "B": "The model's internal decision logic is not transparent to external auditors, who will be unable to trace a specific expense line-item classification to a verifiable rule or policy, creating a material weakness in the audit trail.",
      "C": "The model will require periodic retraining as expense patterns, vendor categories, and GL account structures evolve, creating a recurring operational commitment that was not factored into the $1.7M projected annual savings.",
      "D": "Employees may learn to describe expenses using terminology that triggers preferential classification by the model, creating a new category of control risk not addressed by existing expense policy training or compliance monitoring."
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
    "ExplanationWrongB": "Model explainability — the so-called 'black box' problem — is a legitimate governance concern for ML deployments in financial systems, but it is secondary to the risk of systematic misclassification for two reasons. First, the financial reporting impact of an unexplainable correct classification is zero: if the model correctly classifies a transaction, the fact that its reasoning path is opaque does not create a misstatement. The material risk is incorrect classifications, regardless of whether they can be explained. Second, model interpretability techniques — including LIME (Local Interpretable Model-Agnostic Explanations), SHAP (Shapley Additive Explanations), and feature importance analysis — provide auditors with tools to understand model decision drivers even for complex architectures. External audit standards (PCAOB AS 1105, AICPA AU-C 315) require auditors to understand automated controls, not to reverse-engineer every algorithmic decision. An auditor can validate the model through substantive testing of outputs and evaluation of model governance controls without tracing each classification to a deterministic rule. The controller should prioritize ensuring the model's outputs are correct; explaining correct outputs is the secondary concern.",
    "ExplanationWrongC": "The retraining and maintenance concern is a legitimate operational consideration — expense classification patterns do evolve as vendors change, new GL accounts are created, and business processes are reorganized — but it is not a financial reporting integrity risk. Retraining is an operational expense, not a source of misstatement. If the model requires retraining at an annual cost of $200,000, the net savings are $1.5M rather than $1.7M — an operational variance, not a reporting error. Furthermore, the controller's pre-deployment risk assessment to the audit committee is focused on whether the system will produce reliable financial information, not whether the projected savings will fully materialize. The distinction between an operating-expense concern and a financial-reporting-integrity concern is fundamental: a control that costs more than expected is an operations problem; a control that systematically produces incorrect financial data is a reporting problem. The audit committee's charter is oversight of the latter. Webb should address retraining costs in the implementation budget, not in the financial reporting risk assessment.",
    "ExplanationWrongD": "Adversarial input — employees gaming the classification model by learning which keywords or phrasings trigger favorable account coding — is a genuine risk in ML deployments, but it is both less probable and less systematically damaging than training-data contamination for this specific implementation. For adversarial input to be a material risk, three conditions must all hold: employees must (1) understand the model's classification boundaries well enough to craft effective adversarial descriptions, (2) have a financial or convenience incentive to manipulate classifications, and (3) operate at sufficient scale to produce material misstatements. Condition (1) is unlikely in the near term because Quantum Dynamics is deploying the model internally — employees do not have access to the model's decision boundaries or feature weights. Condition (2) varies by employee population, but expense report classification offers limited personal benefit from manipulation compared to, for example, sales credit assignment or bonus-linked metrics. Condition (3) would require coordinated behavior across many employees. By contrast, the training-data contamination Webb has already documented is systematically embedded at scale from day one of deployment — every single transaction the model processes may be affected, not just those from employees attempting to game the system.",
    "CognitiveLevel": "Evaluate",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.121 blockchain",
    "MicroTopic": "smart contracts",
    "UniqueConceptKey": "B-F-121-smart-contracts",
    "LOSTag": "Blockchain Fundamentals in Accounting",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Orion Supply Chain is deploying a blockchain-based smart contract system for its purchase-to-pay (P2P) process. Under the new system, when a goods receipt is confirmed in the warehouse management system (WMS), a smart contract on a permissioned blockchain automatically: (Step 1) validates the receipt against the corresponding purchase order terms (quantity, price, delivery date); (Step 2) if validation passes, initiates an automated payment from Orion's bank via API; (Step 3) records the transaction on the blockchain as an immutable, time-stamped entry visible to Orion, the supplier, and Orion's external auditors. The Controller, Grace Liu, has identified four risk scenarios that must be analyzed before the system goes live: (Risk 1) Oracle Data Manipulation — the smart contract relies on the WMS to provide the 'goods received' trigger; if the WMS is compromised (either internally by a warehouse supervisor or externally through a cyberattack) and sends a false goods-receipt confirmation, the smart contract will automatically initiate payment for goods never received; (Risk 2) Irreversible Payment Execution — once the smart contract initiates payment via API, the transaction is irreversible; if the goods are subsequently found to be defective or the quantity is incorrect, Orion must pursue recovery through the supplier outside the system — the smart contract provides no reversal mechanism; (Risk 3) Smart Contract Code Vulnerability — the smart contract logic (written in Solidity) may contain coding errors; if a flaw in the validation logic allows payment when quantity or price mismatches exist, every transaction processed through the flawed code is affected until the contract is patched (which requires blockchain consensus, not a simple code update); (Risk 4) Blockchain Fork or Consensus Failure — if the permissioned blockchain experiences a fork (divergent transaction histories on different nodes) or a consensus failure, the payment records Orion relies on for financial reporting may differ from the supplier's records, creating a reconciliation gap that is fundamentally different from traditional ERP reconciliation because there is no central authority to arbitrate. Which risk represents the highest financial reporting concern?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Risk 1 (Oracle Data Manipulation) is the highest financial reporting concern. The 'oracle problem' in blockchain systems is the fundamental challenge that smart contracts must trust external data sources (oracles) to trigger on-chain actions, but the blockchain's immutability and consensus mechanisms provide no protection over the oracle itself. For Orion's P2P system, the WMS is the oracle — and it operates outside the blockchain's trust boundary. If the WMS reports a false goods receipt, the smart contract will execute an irreversible payment, and the blockchain will immutably record this fraudulent transaction as a legitimate system event. Critically, neither Orion's internal controls nor the external auditors can distinguish a genuine WMS-triggered payment from a fraudulent one by examining the blockchain ledger alone — both records would appear identical. This is a financial reporting risk because it means the auditor cannot rely on the blockchain record as audit evidence without also auditing the WMS oracle — the same control the blockchain was intended to strengthen. The technology risk analysis principle tested is that blockchain solves the problem of tamper-proof RECORDING of transactions, but it does not solve the problem of VALIDATING the inputs that trigger those transactions.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-121",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Risk 2 (Irreversible Payment Execution) — once a smart contract executes a payment, the funds cannot be recovered through the system, meaning payment error (whether from a compromised oracle, a code bug, or a business dispute) becomes a permanent loss that affects the income statement",
      "B": "Risk 1 (Oracle Data Manipulation) — the 'oracle problem' is the most severe risk because the smart contract's payment decision depends entirely on the integrity of the WMS data feed; a compromised WMS can trigger unauthorized payments at scale with no human review between the data input and the payment execution, and the fraudulent transactions would appear as legitimate, system-processed payments on the blockchain",
      "C": "Risk 3 (Smart Contract Code Vulnerability) — a coding error in the validation logic is a systematic defect that would affect transaction processed by the contract, not just isolated transactions, making it the risk with the widest potential financial statement impact",
      "D": "Risk 4 (Blockchain Fork) — if Orion's financial records and the supplier's records diverge due to a blockchain fork, the external auditors cannot rely on either party's records as the single source of truth, fundamentally undermining the audit trail for P2P transactions"
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
    "ExplanationWrongA": "Irreversible payment execution is a significant operational risk — every erroneous payment is a permanent loss. However, for financial reporting purposes, an irreversible payment to a legitimate supplier (even if for the wrong goods) is still a correctly recorded liability extinguishment; the financial reporting concern is whether the transaction SHOULD have occurred, not whether it can be reversed. Oracle manipulation (Risk 1) is the root cause of most erroneous payments; addressing the oracle problem prevents the irreversible payments, while addressing only the irreversibility would still leave the system vulnerable to fraud. In risk analysis, the root cause ranks above the consequence.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "A smart contract code vulnerability is a real and serious risk — the DAO hack of 2016 demonstrated that smart contract bugs can have massive financial consequences. However, code vulnerabilities can be mitigated through pre-deployment auditing, formal verification, and testing — standard software quality assurance practices that, while more complex on blockchain, are achievable. The oracle problem (Risk 1) is fundamentally harder to mitigate because it requires securing a system external to the blockchain (the WMS) that has its own attack surface, access controls, and operational risks. A perfectly coded smart contract with a compromised oracle is still a compromised payment system.",
    "ExplanationWrongD": "A blockchain fork creating divergent records between Orion and its supplier is a genuine financial reporting concern — the external auditor must determine which set of records is reliable. However, this risk is specific to permissionless (public) blockchains where forks are a governance mechanism. Orion is deploying a PERMISSIONED blockchain where the consensus participants are known (Orion, key suppliers, the auditor node), making forks far less likely and, if they occur, resolvable through the consortium's governance process rather than through competitive mining. The risk is not zero, but it is substantially lower than the oracle problem, which affects every transaction regardless of blockchain architecture.",
    "CognitiveLevel": "Analyze",
    "DifficultyScore": 3,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.122 cloud computing",
    "MicroTopic": "cloud vendor management",
    "UniqueConceptKey": "B-F-122-cloud-vendor-management",
    "LOSTag": "Cloud Computing Risks and Controls",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Orion Industrial, a manufacturer of heavy equipment with $2.4B in annual revenue, is migrating its financial reporting system (Oracle Hyperion) from an on-premises data center to the cloud. The IT Director, Marcus Chen, has evaluated three cloud service providers against the controller's requirements for SOC 2 Type II coverage, FedRAMP authorization (Orion holds several Department of Defense contracts requiring FedRAMP Moderate), and latency benchmarks for the monthly consolidation process that aggregates data from 6 regional ERP instances. The evaluation data is: (Provider A) AWS — SOC 2 Type II for all in-scope services, FedRAMP Moderate authorized, East-US-1 region latency to Orion's headquarters: 4.2ms average, 3-year reserved instance pricing $1.38M, 24/7 premium support included, 327 certified compliance controls under AWS Artifact; the controller noted that AWS's shared responsibility model requires Orion to configure its own database encryption at rest; (Provider B) Azure — SOC 2 Type II for all in-scope services, FedRAMP High authorized (exceeds Moderate requirement), East-US region latency 5.8ms, 3-year reserved instance pricing $1.61M, 24/7 support $96,000 additional, 298 certified compliance controls; Azure offers native Oracle Hyperion migration tooling that AWS does not; (Provider C) GCP — SOC 2 Type II for all in-scope services, FedRAMP Moderate authorized, US-East4 latency 7.1ms, 3-year committed-use pricing $1.12M, 24/7 support $108,000 additional, 241 certified compliance controls; GCP's data processing agreement terms for defense contractors received pushback from Orion's legal team during the RFI phase. The CFO has set a 3-year total cost ceiling of $1.75M (including support) and requires that the provider's compliance documentation must be sufficient for the external auditors to rely on without supplemental assessments. Which provider should the IT Director recommend?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Provider A (AWS) is the correct recommendation. The evaluation requires comparing three providers across five weighted criteria: (1) Compliance sufficiency — all three meet SOC 2 Type II and FedRAMP Moderate, but AWS's 327 certified compliance controls are the most extensive, providing the strongest auditor-reliance case; (2) Performance — 4.2ms latency is well within acceptable range for the monthly consolidation process; (3) Cost — $1.38M all-inclusive is $370,000 under the $1.75M ceiling, providing budget contingency; (4) Risk — the shared-responsibility encryption configuration is a documented, standard operational task that Orion's IT team performs competently, unlike the unresolved GCP legal concerns or Azure's support surcharge; (5) Fit — AWS meets all stated requirements without exceeding them at additional cost (Azure's FedRAMP High is over-compliance that adds cost without benefit). The technology governance principle tested is that vendor selection in a regulated environment must balance compliance sufficiency with cost efficiency — 'better than required' compliance (Azure FedRAMP High) is not a value-add when the requirement is Moderate.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-122",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Provider A (AWS) — it meets all technical requirements (SOC 2 Type II, FedRAMP Moderate, sub-5ms latency), is the lowest compliant-cost option at $1.38M all-inclusive, offers the most certified compliance controls (327) for auditor reliance, and the shared-responsibility encryption configuration is a manageable operational task",
      "B": "Provider B (Azure) — FedRAMP High authorization exceeds Orion's Moderate requirement and provides the strongest compliance posture, native Oracle Hyperion migration tooling reduces implementation risk, and $1.706M (including support) is within the CFO's $1.75M ceiling",
      "C": "Provider C (GCP) — $1.228M total cost is the cheapest option, $522,000 under the CFO's ceiling, and FedRAMP Moderate authorization satisfies the DOD contract requirement",
      "D": "Defer the migration decision until Orion's legal team resolves the data processing agreement standards across all three providers, then re-evaluate"
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
    "ExplanationWrongB": "Azure offers two genuine advantages: FedRAMP High authorization (stronger than required) and native Oracle Hyperion migration tooling. The migration tooling reduces implementation risk, which is a valid consideration. However, $1.706M leaves only $44,000 in budget contingency, which is thin for an 18-month migration project. More importantly, FedRAMP High is over-compliance for a financial reporting system — the additional controls (which cover high-impact systems where data loss would cause 'severe or catastrophic' adverse effects) add complexity to the audit process without corresponding benefit for a consolidation system that processes financial data, not classified defense information. The governance principle is proportionality: control frameworks should match the data classification, not exceed it.",
    "ExplanationWrongC": "GCP is the cheapest at $1.228M, but the legal team's pushback on the data processing agreement during RFI is a material red flag for a company with DOD contracts. Defense contract data processing requirements under DFARS 252.204-7012 are strict about data sovereignty and subcontractor flow-down — if GCP's standard DPA terms conflict with Orion's DOD obligations, the apparent $522,000 savings could be consumed by legal remediation costs and contract non-compliance penalties. Cost savings that introduce compliance uncertainty are not real savings. The 241 certified controls (vs. AWS's 327) also provide less auditor-reliance documentation.",
    "ExplanationWrongD": "Deferring the decision for legal resolution is a reasonable project management instinct but carries operational costs. During the deferral period, Orion continues to operate the aging on-premises Hyperion system, which has its own reliability and cost issues (the evaluation was triggered by the need to retire the on-premises data center lease, which expires in 14 months). The DPA concern is specific to GCP — AWS and Azure had no legal pushback. The correct approach is to select a provider that has no legal concerns (AWS or Azure) rather than delaying the entire migration for a single vendor's contracting issue.",
    "CognitiveLevel": "Evaluate",
    "DifficultyScore": 4,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.123 data analytics",
    "MicroTopic": "diagnostic analytics techniques",
    "UniqueConceptKey": "B-F-123-diagnostic-analytics-techniques",
    "LOSTag": "Data Analytics Types",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "After noticing a spike in customer returns, Apex Retail's management drills down into the data by product category, region, time period, and customer segment to identify the root cause. Which analytics technique is being used?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Drill-down analysis is a diagnostic analytics technique that involves disaggregating data by various dimensions (product, region, time, customer) to identify patterns and root causes. It goes beyond describing what happened to explain why it happened.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-123",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Predictive analytics — forecasting future returns",
      "B": "Diagnostic analytics — drill-down and root cause analysis",
      "C": "Descriptive analytics — summarizing return rates",
      "D": "Prescriptive analytics — recommending actions to reduce returns"
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
    "ExplanationWrongA": "Predictive analytics forecasts future outcomes. The described analysis is investigating past data to understand current return patterns.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Descriptive analytics summarizes what happened. The stem describes drilling down to identify root causes, which is diagnostic analytics.",
    "ExplanationWrongD": "Prescriptive analytics recommends actions. The described analysis explores existing data rather than recommending future actions.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.124 database management",
    "MicroTopic": "SQL basics",
    "UniqueConceptKey": "B-F-124-SQL-basics",
    "LOSTag": "Database Management",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor Corp's accounting team needs to retrieve a list of all vendors with outstanding balances greater than ,000 from the accounts payable database. Which of the following is the appropriate language to perform this query?",
    "CorrectChoice": "D",
    "ExplanationCorrect": "SQL (Structured Query Language) is the standard language for querying and manipulating data in relational databases. A SQL query such as SELECT * FROM Vendors WHERE Balance > 10000 would retrieve the desired information. SQL skills are increasingly important for accounting professionals working with data.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-124",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Python",
      "B": "HTML",
      "C": "Java",
      "D": "Structured Query Language (SQL)"
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
    "ExplanationWrongA": "Python is a general-purpose programming language used for data analysis but is not the standard query language for relational databases.",
    "ExplanationWrongB": "HTML is a markup language for web page structure, not a database query language.",
    "ExplanationWrongC": "Java is a general-purpose programming language, not a dedicated database query language like SQL.",
    "ExplanationWrongD": "",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.125 privacy regulations",
    "MicroTopic": "data subject access requests",
    "UniqueConceptKey": "B-F-125-data-subject-access-request",
    "LOSTag": "Privacy Regulations (GDPR, CCPA)",
    "primaryTheory": "F6",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A customer of Silverline Corp has submitted a request under GDPR asking for a copy of all personal data the company holds about them. This is known as a:",
    "CorrectChoice": "A",
    "ExplanationCorrect": "A Data Subject Access Request (DSAR) is a request from an individual to access their personal data held by an organization. Under GDPR, organizations must respond to DSARs within one month (with possible extensions) and provide the requested information in a commonly used electronic format.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-125",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Data subject access request (DSAR)",
      "B": "Data portability request",
      "C": "Consent withdrawal",
      "D": "Right to erasure request"
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
    "ExplanationWrongB": "A data portability request asks for data transfer to another organization. The described request is for a copy of data held, not for transfer.",
    "ExplanationWrongC": "Consent withdrawal involves revoking permission for data processing. The described request is for accessing a copy of personal data, which is a DSAR, not withdrawing consent.",
    "ExplanationWrongD": "A right to erasure request asks for data deletion. The described request asks for a copy of data, not its deletion.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.126 data mining",
    "MicroTopic": "clustering",
    "UniqueConceptKey": "B-F-126-clustering",
    "LOSTag": "Data Mining",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cascade Marketing wants to segment its customer database into groups with similar purchasing behaviors and demographic characteristics to target promotions more effectively. The data mining technique most appropriate for this task is:",
    "CorrectChoice": "C",
    "ExplanationCorrect": "Clustering is an unsupervised learning technique that groups similar data points together based on their characteristics without using predefined labels. It is ideal for customer segmentation where the goal is to identify naturally occurring groups with similar purchasing behaviors and demographics.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-126",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Classification",
      "B": "Regression",
      "C": "Clustering",
      "D": "Association rule mining"
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
    "ExplanationWrongA": "Classification assigns data to predefined categories. The stem describes finding natural groups based on purchasing behaviors, which is clustering.",
    "ExplanationWrongB": "Regression predicts numerical values. The described task involves grouping customers, not predicting a numerical outcome.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Association rule mining finds relationships between items in transactions. The described task is grouping customers, not finding item associations.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.127 information systems lifecycle",
    "MicroTopic": "agile vs waterfall",
    "UniqueConceptKey": "B-F-127-agile-vs-waterfall",
    "LOSTag": "Information Systems Lifecycle",
    "primaryTheory": "F1",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Phoenix Corp is choosing between waterfall and agile methodologies for a new financial reporting system. Which of the following is a characteristic of the agile approach?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Agile methodology emphasizes iterative development, continuous stakeholder involvement, adaptive planning, and frequent delivery of working software increments. Unlike waterfall (which follows sequential phases), agile accommodates changing requirements and delivers value incrementally throughout the project.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-127",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Development proceeds in iterative cycles with continuous stakeholder feedback and adaptation",
      "B": "The project is delivered in a single final release",
      "C": "requirements are fully defined at the beginning and changes are discouraged",
      "D": "Testing occurs only at the end of the project"
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
    "ExplanationWrongB": "Single final release describes the waterfall approach, not the iterative delivery cycle of agile.",
    "ExplanationWrongC": "Defining all requirements up front and discouraging changes describes the waterfall approach. Agile embraces changing requirements and iterative development.",
    "ExplanationWrongD": "Testing only at end describes traditional waterfall. Agile includes testing throughout each iteration.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.128 data visualization",
    "MicroTopic": "data storytelling",
    "UniqueConceptKey": "B-F-128-data-storytelling",
    "LOSTag": "Data Visualization",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Summit Corp's finance team has created a presentation for the board that combines data visualizations with narrative explanations to communicate the key drivers of the company's financial performance. This approach is known as:",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Data storytelling combines data visualizations with narrative context to communicate insights effectively. It goes beyond simply presenting charts by providing context, explaining what the data means, and recommending actions. This approach makes data more accessible and actionable for decision-makers.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-128",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Data storytelling",
      "B": "Data mining",
      "C": "Financial reporting",
      "D": "Statistical analysis"
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
    "ExplanationWrongB": "Data mining discovers patterns in large datasets. The described activity is presenting known insights, not discovering new patterns.",
    "ExplanationWrongC": "Financial reporting summarizes financial transactions in standard report formats. The described presentation combines narrative context with visualizations to communicate insights, which is data storytelling, not standard financial reporting.",
    "ExplanationWrongD": "Statistical analysis applies mathematical techniques to data. The described presentation combines existing data with narrative, which is financial reporting.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.129 cybersecurity",
    "MicroTopic": "ransomware",
    "UniqueConceptKey": "B-F-129-ransomware",
    "LOSTag": "Cybersecurity — Confidentiality, Integrity, Availability",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Redwood Inc's accounting files were encrypted by malware, and the attackers demanded payment in cryptocurrency to restore access. This type of attack is known as:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Ransomware is a type of malware that encrypts the victim's files and demands payment (ransom) for the decryption key. It poses a significant threat to accounting data availability and integrity. Prevention includes regular backups, security updates, user training, and access controls.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-129",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Phishing",
      "B": "Ransomware",
      "C": "Man-in-the-middle",
      "D": "Denial of service"
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
    "ExplanationWrongA": "Phishing is a social engineering technique to obtain sensitive information. The described attack involved file encryption and ransom demand, which is ransomware.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Man-in-the-middle intercepts communications between parties. The described attack uses deceptive email to deliver malware, not communication interception.",
    "ExplanationWrongD": "Denial of service overwhelms system availability. The described attack targeted data access through encryption, not system availability.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.130 master data management",
    "MicroTopic": "MDM benefits",
    "UniqueConceptKey": "B-F-130-MDM-benefits",
    "LOSTag": "Master Data Management",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Titan Industries has multiple business units that maintain separate customer databases with inconsistent naming conventions and duplicate records. Implementing a master data management (MDM) program would primarily help by:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Master data management creates a single, trusted, and consistent view of core business entities (customers, products, vendors) across the enterprise. It addresses inconsistencies, duplicates, and fragmentation by establishing data standards, matching rules, and governance processes.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-130",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Eliminating the need for data security",
      "B": "Creating a single, consistent, authoritative source of master data across the organization",
      "C": "Automating customer communications",
      "D": "Replacing existing databases with a single file server"
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
    "ExplanationWrongA": "MDM does not eliminate the need for data security; it complements security by establishing consistent data standards and governance.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Automating customer communications is a CRM function, not a primary MDM objective.",
    "ExplanationWrongD": "Replacing databases with a single file server would reduce capability, not improve data management.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.131 RPA",
    "MicroTopic": "RPA governance",
    "UniqueConceptKey": "B-F-131-RPA-governance",
    "LOSTag": "Robotic Process Automation",
    "primaryTheory": "F4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northland Bank deployed 14 robotic process automation (RPA) bots over the past 18 months across retail banking operations — account opening verification, wire transfer reconciliation, dormant account fee assessment, and regulatory report data extraction. The bots were deployed by individual department heads without a centralized governance framework. An internal audit review identified three categories of control deficiencies: (Category 1) Access Management — 8 of 14 bots run under shared generic credentials with domain-admin-level privileges; bot credential rotation has never been performed; 2 bots belonging to terminated employees are still executing scheduled tasks; estimated remediation cost $215,000 for PAM (Privileged Access Management) integration and bot-specific service accounts; (Category 2) Change Control — 5 bots' automation scripts were modified in the past quarter without change documentation, testing, or approval; one modified bot (wire transfer reconciliation) processed $3.4M in transfers using an incorrect currency conversion rate for 6 days before the error was detected, resulting in a $47,000 correction; estimated remediation cost $165,000 for bot lifecycle management tool and SDLC integration; (Category 3) Exception Handling — 11 of 14 bots lack documented exception-handling procedures; when bots encounter data anomalies (missing fields, format changes, system timeouts), they either stop silently (4 instances resulting in unreconciled transactions) or continue processing with default values (7 instances resulting in incorrect postings); estimated remediation cost $140,000 for exception-handling framework and bot monitoring dashboard. The Internal Audit Director, Sarah Kwan, must prioritize remediation within a $350,000 budget approved by the Audit Committee, with the requirement that financial reporting integrity risks be addressed before operational efficiency concerns. Which category should the Audit Director prioritize first?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Category 1 (Access Management) is the correct first priority. Access management is foundational to all other controls under the COSO Internal Control Framework's Control Activities principle. A bot with domain-admin credentials and no credential rotation — especially bots run by terminated employees — can execute ANY transaction in ANY system, bypassing all segregation of duties, approval workflows, and audit trails. This is not a theoretical risk: the fact that bots for terminated employees are still executing means the organization has lost control over WHO is processing transactions through its financial systems. The CMA candidate must recognize the control hierarchy: without access management, change control is irrelevant (an unauthorized actor can modify scripts regardless of the change control process) and exception handling is irrelevant (a compromised bot can be instructed to suppress exceptions). At $215,000 and $135,000 remaining for Category 2 initiation, this approach addresses the foundational control deficiency first while making progress on the secondary deficiency.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-131",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Category 1 (Access Management) — uncontrolled privileged access is the most severe control deficiency: domain-admin bots with no credential rotation and active terminated-employee bots create a direct risk of unauthorized financial transaction processing; at $215,000, it leaves $135,000 to begin addressing Category 2",
      "B": "Category 2 (Change Control) — undocumented bot modifications have already caused a $47,000 financial loss through the currency conversion error; without change control, bot execution is an untested, unapproved change to the financial reporting process",
      "C": "Category 3 (Exception Handling) — bots silently failing or processing incorrect data directly affects the completeness and accuracy of financial records; 11 of 14 bots lack exception handling, making this the most widespread deficiency",
      "D": "All three categories are equally critical; the Audit Director should present a supplemental funding request for $170,000 to remediate all three simultaneously"
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
    "ExplanationWrongB": "Category 2 (Change Control) is genuinely important — the $47,000 currency conversion error is a real, quantifiable financial statement impact and demonstrates that undocumented bot changes have material consequences. However, change control protects against UNINTENTIONAL errors by AUTHORIZED developers. Category 1's access management deficiency means that UNAUTHORIZED actors (including terminated employees' still-running bots) can modify bot scripts outside any change management process. Fixing change control before access management means you have a well-documented process for approving changes while unauthorized actors continue making undocumented changes through unmanaged credentials. The control sequence must be: establish who can act, then control how they act.",
    "ExplanationWrongC": "Category 3 (Exception Handling) affects the widest number of bots (11 of 14) and directly impacts financial record completeness and accuracy. Silent bot failures mean unreconciled transactions accumulate undetected. However, exception handling is an operational effectiveness control, not a foundational control. If bot access is compromised (Category 1 deficiency), exception handling logs can be suppressed or altered by an attacker, rendering the exception monitoring dashboard useless. The principle is that detective controls (exception monitoring) depend on the integrity of preventive controls (access management). You cannot rely on a monitoring dashboard when the underlying system access is uncontrolled.",
    "ExplanationWrongD": "Supplemental funding is a reasonable escalation when all three deficiencies are critical. However, the Audit Committee explicitly directed prioritization within the $350,000 budget — they want the Internal Audit Director to exercise professional judgment about control hierarchy, not to escalate the resource question. Additionally, simultaneous remediation of all three deficiencies across 14 bots in a single project carries significant project risk: the bots are actively processing financial transactions, and changing access, change control, and exception handling simultaneously creates integration complexity. A phased, risk-prioritized approach that addresses the most severe deficiency first, stabilizes the control environment, then layers on additional controls is the sounder governance approach.",
    "CognitiveLevel": "Evaluate",
    "DifficultyScore": 4,
    "Part1OnlyFlag": true
  }
];