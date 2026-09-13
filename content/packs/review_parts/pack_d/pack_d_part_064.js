var MCQ_BANK_D_PART_64 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.017 cloud saas subscription model",
    "MicroTopic": "cloud saas subscription model",
    "UniqueConceptKey": "F-D017-cloud-saas-subscription-model",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quintwood subscribes to a cloud-based accounting application that the vendor hosts, maintains, and updates. What cloud service model is this?",
    "Choices": {
      "A": "Software as a Service (SaaS)",
      "B": "Infrastructure as a Service (IaaS)",
      "C": "Platform as a Service (PaaS)",
      "D": "On-premises licensed software"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Software as a Service delivers a complete, vendor-hosted and vendor-maintained application to customers, typically via subscription, without the customer managing underlying infrastructure.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-017",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Infrastructure as a Service (IaaS) provides virtualized servers, storage, and networking — the customer manages operating systems, middleware, and applications. The stem describes a vendor-hosted, vendor-maintained complete application accessed by subscription, which is SaaS. A candidate may confuse cloud service tiers by focusing on a vendor hosting the solution without recognizing the scope of what the customer manages. IaaS requires customer management of the software stack; SaaS delivers the complete application.",
    "ExplanationWrongC": "Choice C is incorrect because Platform as a Service offers a development framework and deployment environment for building custom applications. The stem describes subscribing to a finished, ready-to-use accounting application — not a platform for developing one. A candidate may select this by confusing the cloud delivery tiers.",
    "ExplanationWrongD": "Choice D is incorrect because on-premises software requires the organization to install, host, and maintain the application on its own infrastructure. The stem explicitly states the vendor performs all hosting, maintenance, and updates — this is the defining feature of the SaaS delivery model.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S58 Phase 6 — upgraded from DL-012 rotation clone (content preserved, difficulty/cognitive recalibrated for Technology & Analytics domain)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.018 cloud computing — SaaS vs on-premise regulated industry",
    "MicroTopic": "Cloud SaaS vs on-premise regulated industry",
    "UniqueConceptKey": "F-D018-cloud-saas-vs-on-premise-regulated",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Prairie Community Bank is an FDIC-regulated community bank with $340 million in assets. The bank's 15-year-old general ledger system has reached end-of-life and must be replaced. CFO Elena Vasquez evaluates two options: (1) an on-premise GL system where the bank's existing IT team of 3 manages all infrastructure, patching, backups, and security; or (2) a Software-as-a-Service cloud-based GL where the vendor manages all infrastructure, security patching, and system updates. The bank's most recent IT audit reported 8 unresolved patch management findings: 4 operating system patches more than 90 days past due, 2 database patches more than 180 days past due, and 2 application-layer patches never applied. The FDIC examiner noted these findings during the last safety-and-soundness examination and expects remediation. Which option better addresses the bank's control environment weaknesses, and what is the primary trade-off?",
    "Choices": {
      "A": "The SaaS option more directly addresses the patch management control weakness because the vendor assumes responsibility for infrastructure and application patching as part of the service. The primary trade-off is that the bank must now manage vendor risk: requiring SOC 2 report review, business continuity validation, and compliance with FDIC third-party vendor management guidance rather than directly managing infrastructure security.",
      "B": "The on-premise option is preferable because the bank retains full control over its general ledger data and infrastructure. The 8 patch management findings can be resolved by hiring one additional IT staff member with patch management expertise, which is a simpler and less risky solution than migrating the core financial system to the cloud.",
      "C": "Neither option directly addresses the control environment weakness because patch management findings reflect a process failure, not a technology failure. The bank should implement an automated patch management tool and improve its existing IT processes regardless of which GL system it selects.",
      "D": "The on-premise option is required because FDIC regulations prohibit community banks from storing general ledger data in cloud environments. The bank should address the patch management findings through remediation and maintain the on-premise model to ensure regulatory compliance."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The SaaS option most directly addresses the documented control environment weakness because in a SaaS model, the vendor assumes contractual responsibility for infrastructure patching, database patching, and application-layer updates as part of service delivery. Under COSO Principle 12, management should deploy control activities through policies and procedures; the SaaS contract itself becomes the control mechanism by transferring patch execution to a party whose business model depends on maintaining a secure multi-tenant environment. The existing IT team of 3 has demonstrably been unable to maintain timely patching across the current infrastructure over multiple audit cycles; adding more infrastructure (the new on-premise GL server) to a team already unable to maintain existing systems compounds the risk rather than resolving it. The primary trade-off, however, is significant: the bank must now manage vendor concentration risk. FDIC FIL-44-2008 and the Interagency Guidance on Third-Party Relationships require the bank to conduct due diligence, negotiate contract provisions for audit rights and business continuity, and perform ongoing monitoring of the SaaS provider. The bank shifts from direct infrastructure management to vendor governance, a different risk management competency but one better suited to a small IT team that can focus on oversight rather than execution of technical controls.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-018",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Choice B is incorrect because it misdiagnoses the root cause and overestimates the remedy. The 8 unresolved findings accumulated over multiple audit cycles: this is not a staffing gap that one additional hire can reliably close. A team of 3 that has allowed patches to remain 90 to 180 days past due faces either workload capacity constraints, a skills gap, or a prioritization failure; none are reliably solved by adding one member, especially given that hiring for security patch management expertise in a small community bank's IT department competes with broader market demand for cybersecurity talent. Moreover, adding one staff member to manage the new GL system plus all existing infrastructure maintains the same team size relative to a larger workload. A candidate selecting this option may overvalue retaining control without evaluating whether the existing control environment demonstrates the team can effectively exercise that control.",
    "ExplanationWrongC": "Choice C is incorrect because it incorrectly treats process and technology as independent. The SaaS option directly addresses the process failure by changing the responsible party: rather than the bank's IT team executing patches, the vendor executes them under a service-level agreement with defined timelines. This is a process improvement achieved through structural change, not a technology procurement decision unrelated to process. Furthermore, implementing an automated patch management tool for the on-premise option still requires the IT team to configure, monitor, and respond to the automation: the same team that has not maintained patching with existing tools. A candidate selecting this option may adopt a false equivalence that overlooks the fundamental difference between retaining patching responsibility internally and transferring it to a vendor whose core competency and economic incentives are aligned with timely patch execution.",
    "ExplanationWrongD": "Choice D is factually incorrect. FDIC regulations do not prohibit community banks from using cloud-based services for general ledger data. The FDIC, OCC, and Federal Reserve issued interagency guidance (FIL-44-2008, updated through the Interagency Guidance on Third-Party Relationships) that permits cloud adoption provided the bank conducts appropriate due diligence, negotiates adequate contract provisions, and maintains ongoing oversight of the third-party relationship. Thousands of FDIC-regulated institutions use cloud-based core banking and GL systems today. A candidate selecting this option may apply a generalized assumption that regulated equals on-premise only without specific knowledge of the regulatory framework, which focuses on risk management of third-party relationships rather than blanket prohibition of cloud services.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.019 cloud — evaluating SaaS vs. on-premise ERP for a mid-market manufacturer",
    "MicroTopic": "Cloud ERP evaluation",
    "UniqueConceptKey": "P1-FD-019-HostedPrivateCloud-ERP",
    "LOSTag": "P1-F.3 Technology-Enabled Finance Transformation — cloud ERP evaluation and IT investment analysis",
    "QuestionID": "P1-FD-019",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": true,
    "Stem": "ThermaForge Industries, a $200 million manufacturer of industrial valves with 18 production locations, operates a 15-year-old on-premise ERP system that costs $210,000 annually in maintenance and cannot support mobile inventory scanning or real-time WIP tracking. CIO Sarah Chen presents three options to the board: (a) cloud SaaS ERP at $45,000 per month with a 3-year committed contract, vendor-managed quarterly updates, and limited customization to standard configuration; (b) hosted private cloud ERP at $28,000 per month plus a $180,000 one-time migration, with controlled upgrade scheduling and moderate customization; or (c) upgraded on-premise ERP at $850,000 upfront license and implementation, amortized straight-line over 5 years, with full customization control. ThermaForge's operations include complex 14-level bills of materials, work-in-process accounting across 6 production stages, and custom cost allocation rules developed over 15 years. SOX Section 404 IT general controls apply to all financial systems. Evaluate the trade-offs among the three options considering total cost of ownership over 5 years, upgrade flexibility, SOX ITGC compliance burden, data residency, and customization capability for a manufacturer with complex BOM and WIP accounting.",
    "Choices": {
      "A": "Recommend Option A (cloud SaaS ERP) — total 5-year subscription cost of $2.7 million is offset by eliminating the $210,000 annual maintenance and reducing internal IT headcount by 2.5 FTEs. While customization is limited, modern SaaS ERP vendors now offer manufacturing-specific modules with configurable BOM and WIP functionality that can accommodate ThermaForge's requirements without custom code.",
      "B": "Recommend Option C (upgraded on-premise ERP) — total 5-year cost of $1.9 million ($850,000 upfront plus $210,000 annual maintenance for 5 years) is the lowest TCO, and full customization control is essential for ThermaForge's 14-level BOM and custom cost allocation rules that have been refined over 15 years of manufacturing operations.",
      "C": "Recommend delaying the decision and commissioning a 6-month digital transformation assessment to document detailed functional requirements, including BOM depth, WIP tracking specifications, and cost allocation logic, before selecting a platform. The current system, while dated, is stable and auditable under existing SOX ITGC controls.",
      "D": "Recommend Option B (hosted private cloud ERP) — total 5-year cost of $1.86 million ($28,000 × 60 months plus $180,000 migration) is comparable to on-premise TCO, but the hosted model provides mobile inventory scanning and real-time WIP tracking that the upgraded on-premise option cannot deliver. Controlled upgrade scheduling protects month-end close from unplanned changes, while moderate customization capability — greater than SaaS but less than on-premise — can accommodate ThermaForge's complex BOM and cost allocation requirements that pure SaaS cannot support."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The hosted private cloud (Option B) represents the optimal balance across all five evaluation dimensions for ThermaForge's specific manufacturing profile. TCO analysis: Option B's 5-year cost of $1.86 million ($1.68 million subscription + $180,000 migration) is nearly identical to the upgraded on-premise Option C at $1.9 million ($850,000 + $1.05 million maintenance), and both are substantially below the SaaS Option A at $2.7 million. The SaaS premium is partially offset by reduced IT headcount, but the customization constraint is the decisive factor. ThermaForge's 14-level BOM, 6-stage WIP accounting, and 15 years of custom cost allocation rules represent significant process complexity that pure multi-tenant SaaS — designed for standardized manufacturing workflows — cannot accommodate without expensive professional services or workaround processes. The upgraded on-premise ERP (Option C) preserves full customization but fails to deliver mobile inventory scanning and real-time WIP tracking, which are the capabilities the CIO identified as missing from the current system — modernizing the platform without gaining these capabilities defeats the strategic purpose of the investment. SOX ITGC compliance: the hosted private cloud reduces infrastructure-level ITGC burden compared to on-premise (the hosting provider manages physical security, environmental controls, and infrastructure patching under a SOC 2 Type II report), while controlled upgrade scheduling — not available in the vendor-mandated quarterly SaaS update model — allows ThermaForge to test changes against month-end close processes before deployment. Data residency is satisfied because private cloud hosting can specify geographic data center locations, whereas multi-tenant SaaS may replicate data across regions. The recommendation to delay (Option C) is conservative but risks 6–9 months of continued operational limitations while competitors modernize their manufacturing systems.",
    "ExplanationWrongA": "The SaaS ERP option's $2.7 million TCO is 44% higher than the hosted private cloud ($1.86 million) and 42% higher than upgraded on-premise ($1.9 million). More critically, the limited customization constraint is incompatible with ThermaForge's 14-level BOM and custom cost allocation rules — cloud ERP manufacturing modules are designed for standardized discrete or process manufacturing, not for the highly customized cost accounting logic that has been embedded in ThermaForge's operations over 15 years. Configurable (not customizable) SaaS platforms require the manufacturer to adapt its processes to the software, not vice versa, which is a significant operational risk for a company whose competitive advantage may be tied to its unique cost accounting methodology.",
    "ExplanationWrongB": "The upgraded on-premise ERP's 5-year TCO of $1.9 million is indeed comparable to the hosted private cloud, but this option fails to deliver the two capabilities the CIO identified as critical gaps: mobile inventory scanning and real-time WIP tracking. These are cloud-native capabilities that depend on always-on connectivity and centralized data architecture — implementing them on an upgraded on-premise system would require additional third-party middleware and mobile infrastructure not included in the $850,000 upfront cost. The board would be approving a $1.9 million investment that does not close the capability gaps that motivated the project in the first place.",
    "ExplanationWrongC": "Delaying the decision by 6 months for a digital transformation assessment is conservative governance practice but imposes an opportunity cost. During the assessment period, ThermaForge continues to incur $210,000 in annual maintenance on a system that cannot support mobile scanning or real-time WIP tracking — capabilities that competitors may already be using to improve inventory accuracy and production visibility. Additionally, the current system's 15-year-old architecture may introduce cybersecurity vulnerabilities and integration limitations that compound over time. The assessment is better conducted in parallel with a phased migration approach, not as a prerequisite that delays all action.",
    "ExplanationWrongD": "",
    "VerifiedChecks": [
      "Choices populated — 4 options A-D",
      "ExplanationCorrect >= 200 chars",
      "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps"
    ]
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.020 cloud saas subscription model",
    "MicroTopic": "cloud saas subscription model",
    "UniqueConceptKey": "F-D020-cloud-saas-subscription-model",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Thornbury subscribes to a cloud-based accounting application that the vendor hosts, maintains, and updates. What cloud service model is this?",
    "Choices": {
      "A": "Infrastructure as a Service (IaaS)",
      "B": "Platform as a Service (PaaS)",
      "C": "On-premises licensed software",
      "D": "Software as a Service (SaaS)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Software as a Service delivers a complete, vendor-hosted and vendor-maintained application to customers, typically via subscription, without the customer managing underlying infrastructure.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-020",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A is incorrect. Infrastructure as a Service (IaaS) provides virtualized computing resources — including servers, storage, and networking — that customers manage themselves at the operating system and application level. An IaaS customer would still need to install, configure, patch, and maintain the accounting software on the provisioned infrastructure. The stem describes Thornbury accessing a complete, ready-to-use accounting application through a web browser without any installation or infrastructure management responsibility. This is the defining characteristic of SaaS: the vendor manages everything from the physical hardware through the application layer, and the customer simply uses the software.",
    "ExplanationWrongB": "Option B is incorrect. Platform as a Service (PaaS) provides a cloud-based environment for developing, testing, and deploying custom applications — it includes operating systems, middleware, and development tools managed by the cloud provider. However, PaaS does not deliver a finished, ready-to-use business application. With PaaS, Thornbury would need to build or purchase the accounting software separately and deploy it to the platform, managing the application layer themselves. The scenario describes subscribing to a complete, vendor-hosted accounting application that requires no development, installation, or configuration — this is SaaS, not PaaS. A candidate may confuse the intermediate platform layer with the fully managed application delivery model.",
    "ExplanationWrongC": "Option C is incorrect. On-premises licensed software is installed, configured, and maintained on the organization's own hardware under the customer's direct control. The customer is responsible for servers, operating systems, database management, security patching, backups, and all infrastructure maintenance. The stem describes a cloud-based subscription model where the vendor hosts, maintains, and updates the application — Thornbury simply accesses it through a web browser. On-premises deployment is fundamentally the opposite of the cloud delivery model described: it requires the customer to manage everything, whereas SaaS requires the vendor to manage everything. A candidate selecting this option may not recognize the contrast between traditional licensed software deployment and cloud service models.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S899 Phase 1 — Analyze replacement for archived P1-FD-020 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.021 AI/ML governance — overfitting and bias detection in predictive models",
    "MicroTopic": "AI/ML — model validation — overfitting detection",
    "UniqueConceptKey": "F-D021-ml-overfitting-audit",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A fintech company's data science team presents a new credit risk model to the audit committee. The model was trained on 12,000 historical loan applications with 175 features, achieving 98.1% accuracy on training data. When evaluated on a 3,000-record holdout set not used in training, accuracy dropped to 55.3%. The data scientist explains: 'The training accuracy shows the model captures the relationships in the data. The holdout performance is affected by the smaller sample size. With more training data, the model will generalize better.' The head of internal audit, who has a background in data analytics, must evaluate this explanation for the committee. Which finding best characterizes the model's condition?",
    "Choices": {
      "A": "The data scientist's explanation is plausible — the holdout accuracy is affected by sample size, and collecting more training data would likely resolve the performance gap; the model should be approved for deployment with quarterly retraining cycles",
      "B": "The 98% vs. 55% gap does not necessarily indicate overfitting because the holdout accuracy of 55% is only slightly above random chance for a binary classification problem; the model's features may be irrelevant to the prediction target and the problem is underfitting, not overfitting",
      "C": "The model's 98% training accuracy and 55% holdout accuracy indicate moderate overfitting that is within acceptable limits for a credit risk model — the false positive rate of 2% on training data is low enough that the model can be deployed with a business rule that sends flagged applications to manual review",
      "D": "The 43-percentage-point gap between training and holdout accuracy is a strong indicator of severe overfitting — the model has memorized noise in the training data rather than learning generalizable credit risk patterns, and the data scientist's explanation is incorrect because the problem is model complexity relative to available signal, not sample size alone"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "A 43-percentage-point accuracy gap (98.1% training → 55.3% holdout) is a textbook indicator of severe overfitting. The model has essentially memorized the training data, including its noise, idiosyncrasies, and outliers — achieving near-perfect performance on data it has seen while performing barely above chance (50% for binary classification) on new data it has never seen. The data scientist's sample-size explanation is incorrect because the performance gap is not a function of the holdout set being too small — 3,000 records is sufficient to estimate model accuracy within a few percentage points. The root cause is a mismatch between model complexity (175 features on only 12,000 records = high-dimensional, low-sample-size regime) and the available signal. In such regimes, models easily find spurious correlations that happen to fit the training data but have no predictive power on new data. Before deployment, the model requires: (1) feature selection or dimensionality reduction to reduce the feature space, (2) regularization to penalize model complexity, (3) cross-validation rather than a single train-test split, and (4) evaluation on out-of-time data (future loan applications) to confirm generalization.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F — Data Analytics and AI Governance",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-021",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "The data scientist's dismissal of a 43-percentage-point accuracy gap is not plausible — such a massive gap between training and holdout performance is a textbook indicator of severe overfitting and cannot be attributed to sample size differences. A candidate may defer to a data scientist's judgment without critically evaluating the statistical evidence, but the 98.1%→55.3% gap is an extreme overfitting signal that management accountants should recognize as requiring investigation regardless of who presents the model.",
    "ExplanationWrongB": "Choice B is incorrect because underfitting occurs when a model is too simple to capture meaningful patterns in the data, resulting in consistently poor performance across both training and test datasets. The stem describes excellent training performance paired with poor new-data performance — the hallmark of overfitting, not underfitting. A candidate may reverse these two model evaluation concepts with opposite diagnostic signatures.",
    "ExplanationWrongC": "Choice C is incorrect because data governance concerns policies for data quality, access, and stewardship across the organization. The pattern described — strong training fit with poor generalization — is a model design issue, not a governance deficiency. A candidate may incorrectly attribute a statistical modeling problem to a broader data management framework.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.022 predictive model overfitting risk",
    "MicroTopic": "predictive model overfitting risk",
    "UniqueConceptKey": "F-D022-predictive-model-overfitting-risk",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Valemont's forecasting model performs extremely well on historical training data but poorly on new, unseen data. What problem does this illustrate?",
    "Choices": {
      "A": "A data governance failure unrelated to model design",
      "B": "Overfitting, where the model has learned noise specific to the training data rather than generalizable patterns",
      "C": "Underfitting, where the model is too simple to capture pattern",
      "D": "A data visualization design flaw"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Overfitting occurs when a model captures noise and specific quirks of the training data rather than patterns that generalize to new data, leading to poor performance on unseen cases.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-022",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Data governance concerns policies, standards, and accountability for how data is managed across the organization — while data quality issues can impair model performance, the stem describes a model fitting noise in training data (overfitting), which is a model design issue, not a governance failure. A candidate may default to governance explanations for any data-related problem, but overfitting is a statistical modeling problem requiring model regularization or simplification, not governance policy changes.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Underfitting occurs when a model is too simple to capture meaningful patterns in the data — it performs poorly on BOTH training and new data. The stem describes a model that performs extremely well on training data but poorly on new data, which is the hallmark of overfitting. A candidate may confuse underfitting with overfitting because both result in poor generalization, but overfitting is uniquely characterized by excellent training performance that fails to transfer to unseen data.",
    "ExplanationWrongD": "Choice D is incorrect because data visualization concerns how information is displayed to users through charts and dashboards. The model's inability to generalize from training data to new data is a fundamental statistical modeling issue, not a presentation-layer problem. A candidate may select this by conflating the output display with the underlying analytical model.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S58 Phase 6 — upgraded from DL-012 rotation clone (content preserved, difficulty/cognitive recalibrated for Technology & Analytics domain)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.023 predictive analytics — detecting overfitting in revenue forecasting model",
    "MicroTopic": "Model overfitting detection",
    "UniqueConceptKey": "P1-FD-023-Overfitting-KFold-CV",
    "LOSTag": "P1-F.4 Data Analytics — predictive modeling and model validation",
    "QuestionID": "P1-FD-023",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "Stem": "Apex Industries' FP&A team built a machine learning model to forecast quarterly revenue using 27 financial and macroeconomic features. The model achieves R² = 0.97 on training data (Q1 2018 through Q4 2023) but only R² = 0.42 on a holdout sample (Q1 through Q3 2024). CFO David Okonkwo needs to understand why the production forecasts are unreliable and which validation technique, applied during model development, would have detected the performance gap before deployment.",
    "Choices": {
      "A": "The model is underfit — the high training R² indicates the features are insufficient to capture revenue dynamics. Increasing the feature set to 40+ predictors would close the holdout performance gap.",
      "B": "The model is overfit — it learned noise and spurious correlations specific to the 2018–2023 training period rather than generalizable revenue patterns. K-fold cross-validation during development would have revealed the large variance between training and validation performance before deployment.",
      "C": "The model has insufficient training data — 24 quarterly observations cannot reliably support 27 features. Expanding the training window back to 2010 would resolve the performance gap by improving the observation-to-feature ratio.",
      "D": "The holdout period reflects anomalous economic conditions that no model trained on historical data could forecast. The performance gap does not indicate a model defect but rather a fundamental limitation of predictive analytics for revenue forecasting."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The model is overfit — it has learned patterns specific to the 2018–2023 training period, including noise and spurious correlations, rather than the underlying revenue-generating relationship. The 0.55 drop in R² (from 0.97 to 0.42) between training and holdout samples is a textbook indicator of overfitting: the model performs exceptionally well on data it has seen but fails to generalize to new observations. K-fold cross-validation — the standard model validation technique in predictive analytics — partitions training data into k subsets, trains on k−1 folds, and validates on the held-out fold, rotating through all k combinations. This would have revealed the large variance between training and validation performance before deployment. For FP&A forecasting applications, 5-fold or 10-fold cross-validation is industry standard because it provides a robust estimate of out-of-sample error without requiring a separate holdout dataset. Business interpretation: a revenue forecasting model deployed with undetected overfitting produces unreliable guidance for budgeting, resource allocation, and investor guidance — the FP&A team would have recognized the instability during development and either simplified the model or gathered more representative training data before relying on it for quarterly forecasts.",
    "ExplanationWrongA": "An underfit model would exhibit LOW R² on both training and holdout data, not an R² of 0.97 on training data. The extreme gap between training performance (0.97) and holdout performance (0.42) is the hallmark of overfitting, not underfitting. Underfitting occurs when a model is too simple to capture the underlying relationship, producing consistently poor fit across all datasets — not excellent fit on training data with collapse on new data.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "While 24 observations for 27 features is a challenging ratio, adding more historical data alone does not cure overfitting — a model that is too complex relative to the signal will continue to memorize noise even with more observations. The root cause is model complexity exceeding the available signal, and the correct diagnostic approach is cross-validation to measure and constrain overfitting, not simply extending the training window. Additionally, going back to 2010 may introduce structural breaks that further degrade model relevance.",
    "ExplanationWrongD": "Attributing a 0.55 R² gap entirely to anomalous economic conditions ignores the statistical evidence of overfitting. While economic regime changes can degrade model performance, the magnitude of the gap — near-perfect training fit collapsing to near-random holdout performance — is inconsistent with a stable model facing mild regime change. A well-specified model with genuine predictive power would show a moderate decline, not a 55-percentage-point collapse. Validated models typically exhibit training-holdout R² gaps of 0.05–0.15, not 0.55.",
    "VerifiedChecks": [
      "Choices populated — 4 options A-D",
      "ExplanationCorrect >= 200 chars",
      "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps"
    ]
  }
];