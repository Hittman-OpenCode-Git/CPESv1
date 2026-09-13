var MCQ_BANK_A_PART_57 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.028 AI model governance",
    "MicroTopic": "AI model governance",
    "UniqueConceptKey": "F-028-ai-model-governance",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northwind Financial Services' Chief Risk Officer has raised concerns about the AI-driven credit risk model used for commercial loan underwriting. The model, trained on five years of historical loan performance data, has shown a 23% increase in false-positive rejections of minority-owned business applications over the past eight months. The CIO, Rachel Torres, has been asked to evaluate three AI governance frameworks to address the bias detection and model explainability requirements before the next regulatory examination: (Framework X) NIST AI Risk Management Framework — requires continuous bias monitoring, model cards documenting training data demographics, adversarial fairness testing, and human-in-the-loop override for high-value decisions; estimated implementation cost $380,000 over 12 months; (Framework Y) EU AI Act compliance approach — mandates conformity assessments for high-risk AI, human oversight requirements, technical documentation of model logic, and transparency obligations to affected parties; estimated implementation cost $510,000 over 18 months, with potential $1.2M penalty exposure for non-compliance with fairness provisions; (Framework Z) Internal Model Governance Policy — Northwind's existing framework expanded to include quarterly bias audits, a cross-functional AI ethics committee, and documentation standards; estimated implementation cost $95,000 over 6 months. The board has directed that the selected framework must satisfy the upcoming regulatory examination AND be defensible to the bank's community reinvestment stakeholders. Which framework should the CIO recommend?",
    "Choices": {
      "A": "Pause AI model deployment until the regulatory examination is complete and the bias investigation is resolved, then select a framework afterward",
      "B": "Framework X (NIST AI RMF) — it provides the most comprehensive bias monitoring and fairness testing capabilities, aligns with U.S. regulatory expectations for model risk management (SR 11-7/OCC 2011-12), and establishes a repeatable governance cadence that satisfies both examiners and community stakeholders",
      "C": "Framework Y (EU AI Act) — it carries the highest compliance bar globally and prepares Northwind for international expansion, making it the most future-proof investment despite the higher cost and timeline",
      "D": "Framework Z (Internal Expansion) — it is the lowest cost ($95,000), fastest to implement (6 months), and leverages existing governance structures that the compliance team already understands"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Framework X (NIST AI RMF) is the correct recommendation. The NIST AI RMF is designed specifically for U.S. financial institutions and aligns directly with existing model risk management guidance (SR 11-7, OCC 2011-12) that examiners already apply to Northwind. Its four core functions — Map, Measure, Manage, Govern — map directly to the board's requirements: continuous bias monitoring addresses the 23% false-positive rate issue, model cards (documenting training data demographics, performance across subpopulations, and fairness metrics) provide defensible documentation for community stakeholders, and human-in-the-loop override preserves the bank's lending discretion for high-value decisions. At $380,000 and 12 months, it is more expensive than Framework Z but provides a nationally recognized standard that examiners and stakeholders will accept — a critical consideration when the board specifically cited regulatory examination readiness. The NIST framework also directly addresses the AI governance principles relevant to the CMA Part 1 Technology and Analytics domain: model validation, bias detection, documentation, and accountability.",
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
    "QuestionID": "P1-F-028",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Pausing all AI model deployment avoids immediate risk but creates its own governance problems. First, the credit risk model is currently IN production — pausing it means reverting to manual underwriting for commercial loans, which introduces its own bias risk (manual underwriting has historically shown higher, not lower, disparate impact). Second, regulators expect financial institutions to have active model governance, not model abandonment. Third, the board's directive is to SELECT a framework — this option defers the decision, which fails to satisfy the board's explicit instruction. The correct approach is to adopt a governance framework that manages AI risk while continuing responsible model use, not to eliminate AI use entirely.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The EU AI Act is the most stringent AI regulation globally and would certainly prepare Northwind for international expansion. However, Northwind is a U.S. community bank subject to U.S. regulatory examination — the EU AI Act's conformity assessment requirements, technical documentation standards, and transparency obligations are designed for entities operating in or targeting the EU market. Adopting an extraterritorial framework at $510,000 and 18 months over-prepares for a risk (international expansion) that the board did not prioritize, while potentially creating compliance reporting obligations that are inconsistent with U.S. regulatory expectations. The governance principle is proportionality: the framework should match the entity's actual regulatory environment and stakeholder requirements, not the highest possible bar globally.",
    "ExplanationWrongD": "Framework Z is attractive for its speed and cost — $95,000 and 6 months represents the path of least resistance. However, expanding an internal governance framework that was in place while the 23% bias rate developed raises a fundamental question: can the framework that permitted the bias be trusted to fix it? Internal frameworks lack the external credibility that a nationally recognized standard (like NIST AI RMF) provides. For a community bank facing regulatory examination and stakeholder scrutiny, a recognized external framework carries significantly more weight than an internally expanded policy. The governance concept tested here is that AI model governance requires recognized standards with independent verification, not merely internal policy updates.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.029 machine learning training data",
    "MicroTopic": "machine learning training data",
    "UniqueConceptKey": "F-029-machine-learning-training-data",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F4",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Zephyr is evaluating machine learning training data in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "Training data are used to fit a model; separate validation data help test performance",
      "B": "It is primarily a Part 2 capital budgeting calculation",
      "C": "It should be documented only after an audit exception occurs",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Training data are used to fit a machine-learning model, while separate validation or test data help evaluate whether the model performs on new observations. Separating these data helps reduce overfitting and supports model governance.",
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
    "QuestionID": "P1-F-029",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Capital budgeting is unrelated to machine-learning data sets and model validation.",
    "ExplanationWrongC": "Training and validation design should be documented before model reliance, not only after an audit exception.",
    "ExplanationWrongD": "Automation does not eliminate controls; machine-learning models need data governance, validation, and monitoring.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.030 blockchain shared ledger",
    "MicroTopic": "blockchain shared ledger",
    "UniqueConceptKey": "F-030-blockchain-shared-ledger",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Apex Industries processes 400+ intercompany transactions monthly across 8 subsidiaries in 5 countries. CFO Rebecca Okonkwo is evaluating two reconciliation approaches: (1) the current traditional process — each subsidiary closes its books independently, then intercompany balances are reconciled via email and spreadsheet, taking 12 business days post-month-end, costing $340K annually in finance staff time, with a 4.2% unresolved discrepancy rate at consolidation; (2) a blockchain-based shared ledger — all 8 subsidiaries record intercompany transactions to a permissioned distributed ledger visible to all entities in real time, $620K implementation cost, $180K annual operating cost, estimated 2-day close acceleration, projected 0.5% unresolved discrepancy rate. The audit committee has flagged intercompany reconciliation as a material weakness after a $1.8M prior-period adjustment. Which recommendation should the CFO present?",
    "Choices": {
      "A": "Retain the traditional process because $620K is too large an investment and the current 12-day close is acceptable",
      "B": "Adopt the blockchain shared ledger because it addresses the material weakness, reduces the discrepancy rate from 4.2% to 0.5%, accelerates close by 10 days, and the $280K annual savings ($340K current minus $180K operating) produces a 2.2-year payback on the $620K implementation",
      "C": "Adopt the blockchain shared ledger but only for the 3 largest subsidiaries to reduce implementation cost to approximately $300K",
      "D": "Hire two additional finance staff at $160K annually to manually accelerate the traditional reconciliation process"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Full blockchain adoption is the correct recommendation. The evaluation framework requires assessing the proposal against the audit committee's material weakness finding — the current 4.2% unresolved discrepancy rate produced a $1.8M adjustment. Blockchain reduces this to 0.5%, directly addressing the root cause. Financially: annual operating savings are $160K ($340K current process cost minus $180K blockchain operating cost), yielding a simple payback of 3.9 years on the $620K implementation — but this understates the value. The $1.8M prior-period adjustment represents a single year's cost of the material weakness. Eliminating that risk, plus the 10-day close acceleration (improving consolidated reporting timeliness), plus the control enhancement, justifies the investment even with a longer payback. More importantly, a $1.8M adjustment dwarfs the $620K implementation cost — one avoided adjustment pays for the investment more than twice over. The CFO should present the full-scope blockchain adoption as the financially and operationally superior choice.",
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
    "QuestionID": "P1-F-030",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Retaining a process that the audit committee has specifically designated as a material weakness is not a defensible CFO recommendation. The $620K implementation cost must be evaluated against the $1.8M prior-period adjustment caused by the current process — the adjustment alone is 2.9x the implementation cost. Additionally, 'the current 12-day close is acceptable' directly contradicts the audit committee's finding. A material weakness requires remediation, not acceptance.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Partial adoption creates a two-tier reconciliation environment: blockchain for 3 subsidiaries, traditional for 5. The material weakness stems from cross-entity reconciliation complexity — implementing blockchain partially means the 5 non-blockchain subsidiaries still require manual reconciliation with the 3 blockchain subsidiaries, preserving much of the current process's risk. The discrepancy rate improvement from 4.2% would be substantially diluted. Partial adoption also introduces the operational overhead of maintaining two reconciliation methodologies simultaneously. The material weakness finding argues for a unified solution.",
    "ExplanationWrongD": "Adding two finance staff to manually accelerate the existing spreadsheet-based process does not address the root cause of the material weakness — the process design, not staffing levels, creates the 4.2% discrepancy rate. More staff processing the same error-prone manual reconciliations may accelerate timing but will not materially reduce the unresolved discrepancy rate. Additionally, $160K in additional annual staffing, when the current process already costs $340K, would increase the total annual cost to $500K — making this the most expensive ongoing option. The audit committee expects process redesign, not staffing augmentation.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.031 cloud computing scalability risk",
    "MicroTopic": "cloud computing scalability risk",
    "UniqueConceptKey": "F-031-cloud-computing-scalability-risk",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cascade Manufacturing's legacy on-premises ERP system (installed 2009, SQL Server 2008 R2) suffered its third unplanned outage this quarter, each exceeding four hours of downtime. The ERP supports production scheduling, inventory management, and order fulfillment across three plants. The CTO, David Okonkwo, has evaluated three migration strategies with the following data: (Strategy 1) Lift-and-Shift to IaaS — migrate the existing ERP to cloud virtual machines with no code changes; migration cost $180,000, timeline 8 weeks, annual hosting cost $210,000, RTO improves from 18 hours to 4 hours, RPO improves from 24 hours to 8 hours, but the underlying SQL Server 2008 R2 architecture, custom scripts (47 undocumented stored procedures), and aging integrations (12 flat-file interfaces) remain unchanged; (Strategy 2) Refactor to Cloud-Native PaaS — rewrite the ERP using cloud-native database services (managed PostgreSQL), containerized application services, and API-based integrations; migration cost $1,100,000, timeline 32 weeks, annual hosting cost $340,000, RTO 30 minutes, RPO near-zero (continuous replication), eliminates all flat-file interfaces, but requires re-engineering the 47 stored procedures and retraining 31 finance and operations staff; (Strategy 3) Hybrid — keep the ERP core on-premises with upgraded hardware ($350,000), migration of reporting and analytics workloads to cloud ($160,000), maintaining the flat-file interfaces with cloud-based middleware; annual on-premises cost $190,000, annual cloud cost $130,000, RTO 6 hours for ERP core / 30 minutes for analytics, RPO 12 hours for ERP core / near-zero for analytics. The board has set a 24-month executive mandate: the selected strategy must reduce outage-driven production losses (currently $280,000 per outage event) by at least 60% AND position the company for eventual full cloud adoption. Which strategy should the CTO recommend?",
    "Choices": {
      "A": "Strategy 3 (Hybrid) — it balances cost ($700,000 total investment, $320,000/year), reduces analytics recovery to 30 minutes, and defers the risky ERP core migration until the technology is more proven",
      "B": "Replace the entire ERP with a new SaaS product — a modern cloud ERP eliminates migration, hosting, and maintenance costs associated with the legacy system",
      "C": "Strategy 2 (Refactor to Cloud-Native PaaS) — it eliminates the root causes of outages (aging architecture, undocumented stored procedures, flat-file interfaces), provides sub-hour RTO and near-zero RPO, and fully positions Cascade for cloud adoption, with the $1.1M investment recovering through outage avoidance within 24 months",
      "D": "Strategy 1 (Lift-and-Shift to IaaS) — it is the fastest (8 weeks) and cheapest ($180,000), reduces RTO from 18 hours to 4 hours (a 78% improvement), and satisfies the outage reduction mandate without disrupting operations with a rewrite"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Strategy 2 (Refactor to Cloud-Native PaaS) is the correct recommendation. The fundamental issue is that the three unplanned outages are caused by the ERP's underlying architecture — SQL Server 2008 R2 (end-of-life since July 2019), 47 undocumented stored procedures, and 12 flat-file interfaces that are brittle and difficult to diagnose. Lift-and-shift (Strategy 1) moves the same failing architecture to cloud VMs — it changes the LOCATION of the failure, not the CAUSE. Hybrid (Strategy 3) preserves the core failure surface while adding complexity (two environments to manage). Strategy 2 addresses the root cause by re-engineering the entire deployment: managed PostgreSQL eliminates the end-of-life database risk, containerized services enable rapid recovery (30-minute RTO vs. 18 hours), and API-based integrations replace the brittle flat-file interfaces. The $1.1M investment is recoverable: at $280,000 per outage and 3 outages per quarter, Cascade loses $840,000 per quarter ($3.36M annually) to downtime. Eliminating even 90% of outages recovers ~$3M in year one — the $1.1M investment pays back in under 5 months. The 32-week timeline is substantial but matches the board's 24-month mandate for full cloud positioning. This is a textbook application of technology investment evaluation: address root cause, not symptoms.",
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
    "QuestionID": "P1-F-031",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Strategy 3 is the compromise option — it avoids the risk and cost of an ERP core rewrite while gaining cloud benefits for analytics. However, it fundamentally fails the board's 24-month mandate to 'position the company for eventual full cloud adoption.' The hybrid approach increases architectural complexity (two environments, middleware layer for flat-file interfacing, multiple recovery procedures) and preserves the ERP core's outage vulnerability. The ERP core RTO remains at 6 hours with 12-hour RPO — meaning each ERP outage still costs Cascade $280,000+ in production losses, and 12 hours of data could be lost. The hybrid strategy purchases partial improvement at the cost of deferred architectural debt. For a board directive requiring full cloud positioning, a half-measure that preserves the legacy core is not the correct strategic choice.",
    "ExplanationWrongB": "Replacing the entire ERP with a new SaaS product is a legitimate long-term option but was not one of the three strategies the CTO evaluated. More importantly, ERP replacement is a 2-3 year, multi-million-dollar initiative that far exceeds the scope of the outage-reduction mandate. The board's 24-month timeline would likely be insufficient for a full ERP replacement. The correct approach is to evaluate the strategies that are ready for decision now, not to propose a fourth option that requires substantial additional analysis and carries its own implementation risks (data migration, user adoption, business process redesign). The CMA concept tested is cloud migration strategy evaluation within defined alternatives, not ERP vendor selection.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Strategy 1 superficially satisfies the mandate: at $180,000 and 8 weeks, it is fast and inexpensive, and it reduces RTO from 18 to 4 hours (a genuine improvement). However, it suffers from the 'lift-and-shift fallacy' — moving a broken architecture to the cloud does not fix the architecture. The SQL Server 2008 R2 database, 47 undocumented stored procedures, and 12 flat-file interfaces continue to be the outage root causes; they will produce the same failures on cloud VMs as they do on-premises. The cost structure is also misleading: $210,000/year for cloud hosting PLUS the cost of managing the legacy architecture (which engineering has indicated requires 2-3 FTEs at ~$130,000 each) results in total annual costs of $470,000-$600,000 with no architectural improvement. A candidate selecting this option has confused migration speed with architectural quality.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.032 cybersecurity phishing control",
    "MicroTopic": "cybersecurity phishing control",
    "UniqueConceptKey": "F-032-cybersecurity-phishing-control",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crescent is evaluating cybersecurity phishing control in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It is primarily a Part 2 capital budgeting calculation",
      "B": "It should be documented only after an audit exception occurs",
      "C": "Training, filtering, MFA, and reporting processes help reduce phishing risk",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Phishing risk is reduced through layered controls such as user training, email filtering, multifactor authentication, and clear reporting/escalation procedures. No single control eliminates phishing risk by itself.",
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
    "QuestionID": "P1-F-032",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Capital budgeting is unrelated to cybersecurity controls for phishing risk.",
    "ExplanationWrongB": "Phishing controls should be implemented proactively, not documented only after an audit exception.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Automation does not eliminate phishing risk; automated filters still need training, MFA, monitoring, and response processes.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.033 multi-factor authentication",
    "MicroTopic": "multi-factor authentication",
    "UniqueConceptKey": "F-033-multi-factor-authentication",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Apex Community Bank experienced a credential theft incident three weeks ago: an attacker obtained a treasury analyst's password through a phishing email and initiated two unauthorized wire transfers totaling $187,000 (both recovered by the correspondent bank within 24 hours, but Apex incurred $12,400 in recovery fees). The CISO, Maria Vasquez, must recommend an MFA deployment strategy for 340 employees across four user groups: (Group 1) Treasury and Wire Operations — 18 users who initiate/approve wire transfers averaging $4.2M daily; (Group 2) Commercial Lending — 45 users who access customer financial statements and underwriting data via a web portal; (Group 3) Branch Operations — 210 users who access the core banking system for teller transactions, cash handling, and account maintenance from fixed branch workstations; (Group 4) Executive Team — 12 users who access board reports, strategic planning documents, and the general ledger via mobile devices. Three MFA approaches are under evaluation: (Approach A) SMS One-Time Passcodes — $3/user/month ($12,240/year), works on any mobile phone, 4.2% of SMS codes fail to deliver within the 60-second window, and SMS is vulnerable to SIM-swap attacks; (Approach B) Authenticator App (TOTP) — $2.50/user/month ($10,200/year), requires smartphone installation, generates time-based codes offline, not vulnerable to SIM-swap but users can lose access if they change devices without backup codes; (Approach C) Hardware Security Keys (FIDO2) — $45/key one-time ($15,300 total for all 340 users), plus $18/user/year for management platform ($6,120/year), phishing-resistant (cryptographic binding to the origin domain prevents credential entry on fake sites), but requires physical key distribution and replacement for lost keys ($45 each, estimated 8% annual loss rate). The board has directed that the MFA strategy must prioritize the highest-risk user group with the strongest feasible protection while balancing cost and user experience for lower-risk groups. The CISO may recommend different approaches for different groups. Which recommendation should she present?",
    "Choices": {
      "A": "Hardware security keys for all 340 users — the board's directive emphasizes the strongest feasible protection, and the $15,300 one-time cost plus $6,120 annual management fee is well within Apex's $125,000 cybersecurity budget",
      "B": "Authenticator app for all 340 users — it balances security (not vulnerable to SIM-swap) with cost ($10,200/year), and the IT help desk can manage device changes through backup codes",
      "C": "Hardware security keys for Treasury/Wire Operations (Group 1); authenticator app for Commercial Lending and Executives (Groups 2 and 4); authenticator app for Branch Operations (Group 3) — prioritizing phishing-resistant protection for the highest-risk group while using cost-effective strong authentication for others",
      "D": "SMS OTP for 340 users — it is the only approach that works universally across devices (including employees without smartphones), costs only $12,240/year, and requires zero hardware distribution logistics"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The tiered approach (Approach C for Group 1, Authenticator App for Groups 2, 3, and 4) is the correct recommendation. The core governance principle is risk-based control selection: allocate the strongest controls to the highest-risk processes. Group 1 (Treasury/Wire Operations) processes $4.2M in daily wires — a credential compromise on this group represents existential financial risk. Hardware security keys (FIDO2) provide phishing-resistant authentication because they cryptographically bind to the origin domain; a phishing site cannot intercept the authentication because the key validates the actual domain. For Groups 2 and 4, the authenticator app provides strong, cost-effective protection (not vulnerable to SIM-swap, offline code generation) at $2.50/user/month. For Group 3 (Branch Operations, 210 users), the authenticator app is appropriate because teller workstations are fixed and controlled, reducing the phishing risk vector compared to mobile or web-based access. This tiered strategy addresses the board's directive to prioritize the highest-risk group (Treasury gets the strongest protection) while balancing cost — hardware keys for all 340 users ($15,300 + $6,120/year) would be excessive for tellers who access the core system from fixed internal workstations behind the bank's firewall. The CMA concept tested is applying the principle of proportionality in cybersecurity control selection.",
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
    "QuestionID": "P1-F-033",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Hardware security keys provide the strongest phishing-resistant protection of the three approaches. However, deploying them to all 340 users over-provisions security for low-risk groups (e.g., tellers at fixed branch workstations) at unnecessary cost. The annualized cost including 8% replacement rate is $15,300 + $6,120 + ($45 × 27 replacements) = approximately $22,635 in year one and ~$8,000 annually thereafter — manageable but wasteful. The more important argument is operational: hardware keys for 210 branch tellers create a key management burden (distribution, loss reporting, replacement, deprovisioning for departing employees) that the IT team must support. The governance principle is that control strength should be proportionate to risk — the strongest control is not always the correct control for every user group. Risk-tiered deployment applies the strongest protection where it is most needed and cost-effective protection where it is sufficient.",
    "ExplanationWrongB": "Deploying authenticator app to all 340 users avoids SIM-swap vulnerability and costs only $10,200/year — a clean, uniform solution. However, this approach treats all user groups as having equal risk, which they do not. Treasury analysts who initiate $4.2M daily in wires face a fundamentally different threat profile than branch tellers at fixed workstations. The authenticator app, while strong, is still vulnerable to real-time phishing attacks where the attacker proxies the authentication between the user and the legitimate site (adversary-in-the-middle attacks). Only hardware security keys (FIDO2) cryptographically prevent this attack class. For the highest-risk group processing millions in daily wire transfers, the marginal cost of hardware keys ($810 one-time for 18 users) relative to the risk exposure ($4.2M daily) is immaterial. A flat deployment treats all risk as equal, which violates the principle of risk-based control selection.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "SMS OTP is the most universally deployable option and the cheapest — but it is the LEAST secure of the three approaches. SMS codes are transmitted over the cellular network, which is not under Apex's control and is subject to interception. SIM-swap attacks (attackers convince the mobile carrier to transfer the victim's phone number to a new SIM card) specifically target SMS-based authentication and have been used in successful attacks on financial institutions. For a bank that just experienced a credential theft incident, recommending the weakest available authentication method — especially for treasury users who initiate wire transfers — would be difficult to defend to regulators and the board. A candidate selecting this option may be optimizing for cost and convenience without properly weighting the security risk of the specific user group being protected.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.034 least privilege access",
    "MicroTopic": "least privilege access",
    "UniqueConceptKey": "F-034-least-privilege-access",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Broadstreet Insurance Group's internal audit discovered a privilege escalation incident during the Q3 IT general controls review: a claims adjuster accessed the premium rating engine's configuration table (containing rate factors and underwriting rules for 240,000 policies) by exploiting a role inheritance flaw in the existing RBAC implementation. The current RBAC model has 47 roles, but 12 roles have inherited permissions from parent roles that were never formally approved — a configuration drift issue that has persisted since the ERP upgrade 18 months ago. The IT Audit Director, James Chen, must recommend an access control model for the underwriting and claims platforms. Three models are under evaluation: (Model 1) Refined RBAC with quarterly recertification — restructure the 47 roles into 31 cleanly defined roles, implement mandatory quarterly access reviews, and remove all inherited-parent-role permissions; implementation cost $270,000, annual recertification cost $85,000, estimated to prevent 94% of privilege escalation paths; (Model 2) Attribute-Based Access Control (ABAC) — grant access based on user attributes (department, job grade, clearance level), resource attributes (data classification, system zone), and environmental attributes (time of day, network location, device posture); implementation cost $640,000, annual policy maintenance cost $140,000, estimated to prevent 99.5% of privilege escalation paths but requires all 47 existing roles to be decomposed into attribute policies; (Model 3) Policy-Based Access Control (PBAC) — combines RBAC roles with attribute policies using a rules engine that evaluates both role membership and contextual attributes at access time; implementation cost $390,000, annual maintenance $110,000, estimated to prevent 98% of privilege escalation paths, and integrates with the existing identity provider. The Chief Risk Officer has specified that the model must be auditable (every access grant must be traceable to an approved policy) and must scale to accommodate the planned acquisition of a regional competitor's book of business (expected to add 85 users and 3 new departments within 18 months). Which model should the IT Audit Director recommend?",
    "Choices": {
      "A": "Model 1 (Refined RBAC) — it is the least expensive ($270,000), requires the least organizational change (staff already understand RBAC), and the quarterly recertification addresses the specific configuration drift issue that caused the incident",
      "B": "Model 2 (ABAC) — it provides the highest prevention rate (99.5%) and offers the most granular access control, which is the surest way to prevent recurrence of privilege escalation",
      "C": "A manual access control log reviewed by department managers weekly — formal access models add complexity and the incident was caused by human configuration errors, not model inadequacy",
      "D": "Model 3 (PBAC) — it provides attribute-level context without requiring full decomposition of all 47 roles, integrates with the existing identity provider, achieves 98% prevention, and preserves auditability through policy-traceable access grants"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Model 3 (PBAC) is the correct recommendation. The incident's root cause was not that RBAC itself is inadequate — it was that role inheritance (parent-to-child permission propagation) created configuration drift that went undetected for 18 months. PBAC addresses this by layering attribute policies on top of role membership: even if a role has an inherited permission, the policy engine evaluates contextual attributes (time, location, device) at access time, providing a second enforcement layer. At $390,000 implementation and $110,000 annual maintenance, PBAC is more expensive than refined RBAC but substantially less than full ABAC ($640,000). Critically, PBAC integrates with the existing identity provider — meaning the 85 users from the planned acquisition can be onboarded without rebuilding the entire access model. The 98% prevention rate, while slightly lower than ABAC's 99.5%, represents an acceptable residual risk given the substantial cost difference. The auditability requirement (traceable access grants) is satisfied because PBAC rules engines log both the role and the attribute policies that permitted each access. This is a direct application of COSO Principle 12 (control activities — the organization deploys control activities through policies and procedures): PBAC implements preventive controls (attribute-based policies) that directly address the configuration drift vulnerability while maintaining the scalability needed for the acquisition.",
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
    "QuestionID": "P1-F-034",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Model 1 (Refined RBAC) directly addresses the specific defect: configuration drift caused by inherited parent-role permissions. Restructuring from 47 to 31 cleanly defined roles and implementing quarterly recertification would likely prevent the specific exploitation path the claims adjuster used. At $270,000, it is the least expensive option. However, refined RBAC has a fundamental limitation: it controls access based on role membership alone, not on the context of the access request. The claims adjuster had the role but accessed the configuration table at 2:47 AM from an unrecognized IP address — RBAC alone cannot evaluate these contextual signals. Under PBAC, the late-night, non-standard-location access combined with the sensitive resource classification would have triggered a policy requiring secondary approval — even if the role inheritance was flawed. Refined RBAC fixes the known flaw but does not add the contextual protection layer that would catch novel exploitation patterns. The board's scalability requirement (85 new users, 3 new departments) also strains a pure RBAC model because role proliferation tends to recur as organizations grow. A candidate selecting this option is fixing the symptom (role inheritance flaw) without addressing the architectural limitation (lack of contextual access evaluation).",
    "ExplanationWrongB": "Model 2 (ABAC) provides the highest prevention rate (99.5%) and is the most architecturally elegant solution — access is determined by the complete set of user, resource, and environmental attributes. However, full ABAC implementation requires decomposing all 47 existing RBAC roles into attribute policies, a complex and time-consuming process that would likely delay deployment beyond the CRO's implicit timeline (the next audit cycle). The $640,000 implementation cost is 2.4× PBAC's cost for a 1.5-percentage-point improvement in prevention — diminishing returns on security investment. More importantly, ABAC's attribute-policy model is less intuitive for auditors to trace than PBAC's role-plus-policy model. When an auditor asks 'why was this access granted?' under ABAC, the answer requires evaluating the complete set of attribute conditions at that moment; under PBAC, it requires checking the role and the attribute policies. The governance concept tested is that security investment should follow the principle of reasonable assurance, not absolute assurance — the incremental benefit of ABAC over PBAC does not justify the incremental cost.",
    "ExplanationWrongC": "A manual access control log reviewed weekly by department managers would cost almost nothing to implement and places accountability with the people who know the staff best — the department managers. However, weekly manual review depends on managers consistently detecting anomalies across hundreds of access events. The privilege escalation incident occurred at 2:47 AM and involved a configuration table — it would be easily missed in a weekly manual review of access logs. The control objective here is to PREVENT unauthorized access at the time of the access attempt, not to DETECT it a week later. Automated, policy-based access controls (ABAC, PBAC) provide real-time prevention; manual review provides delayed detection. For a control environment that has already demonstrated vulnerability to privilege escalation, detection-only controls are insufficient. COSO Principle 10 requires organizations to select and develop control activities that contribute to the mitigation of risks to acceptable levels — manual log review is a detective control, not a preventive one, and detective controls alone cannot provide reasonable assurance for access management.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.035 encryption at rest and transit",
    "MicroTopic": "encryption at rest and transit",
    "UniqueConceptKey": "F-035-encryption-at-rest-and-transit",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Frontier Financial's security architect is reviewing encryption coverage across five data flow paths in the customer-to-report pipeline: (Path-1) Customer Portal → Web Application Firewall: TLS 1.3, certificate valid; (Path-2) Web App → ERP System: internal network, no encryption, justified as 'internal traffic'; (Path-3) ERP → Data Warehouse: nightly ETL batch over VPN, data at rest encrypted in DW (AES-256), data in transit during ETL is unencrypted within the VPN tunnel; (Path-4) Data Warehouse → BI Tool: queries over internal network, no encryption, BI tool connects via ODBC with basic authentication (no Kerberos, no certificate); (Path-5) BI Tool → Board Report PDF: PDF generated on BI server, emailed to CFO as attachment, email uses TLS but the PDF itself has no password protection or DRM. The security architect must identify all encryption coverage gaps that expose financial data. Which analysis is correct?",
    "Choices": {
      "A": "Only Path-2 has a gap — internal network traffic should be encrypted, and labeling traffic as 'internal' does not eliminate the risk of internal threats or network compromise",
      "B": "Paths 2, 4, and 5 have gaps — Path-2 lacks any encryption on financial transaction data between web app and ERP, Path-4 uses unencrypted ODBC with basic auth exposing query results, and Path-5 embeds financial data in an unprotected PDF distributed via email",
      "C": "Paths 2 and 4 have gaps — Path-5 is acceptable because the email transport layer uses TLS, which properly protects the PDF in transit",
      "D": "None of the paths have material gaps — VPN protects Path-3 transit, internal networks are trusted zones by design (Paths 2 and 4), and email TLS protects Path-5, making the current architecture defensible"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Paths 2, 4, and 5 have encryption gaps requiring remediation. Path-2: Financial transaction data flowing from web app to ERP over an internal network with no encryption violates the defense-in-depth principle — internal threats (malicious insider, compromised workstation) and lateral movement after perimeter breach both expose this traffic. Path-4: ODBC connections over the internal network using basic authentication transmit query results (which include the financial data powering the board report) unencrypted. Basic authentication also transmits credentials in a trivially decodable format (Base64, not encrypted). Path-5: The BI tool generates a PDF with sensitive financial data and emails it as an unprotected attachment. While the email transport uses TLS, the PDF itself has no protection — once delivered to the CFO's inbox, it can be forwarded, saved to unencrypted storage, or accessed if the CFO's device is compromised. TLS protects the pipe, not the artifact. Path-1 is correctly secured (TLS 1.3). Path-3's VPN tunnel provides adequate transit encryption, and AES-256 at rest in the DW is appropriate.",
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
    "QuestionID": "P1-F-035",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Identifying only Path-2 as a gap understates the scope. While Path-2 is a genuine encryption gap, Paths 4 and 5 also lack adequate protection. Path-4's unencrypted ODBC with basic authentication exposes both credentials and query results. Path-5's unprotected PDF distribution creates ongoing exposure long after the email transmission completes. A security architecture review that identifies only one of three gaps would leave the organization with a false sense of security about two significant exposure points.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This choice identifies Paths 2 and 4 correctly but incorrectly exempts Path-5. The claim that 'email TLS properly protects the PDF in transit' confuses transport-layer encryption with artifact-level protection. TLS encrypts the connection between mail servers, but: (1) the PDF exists as an unprotected file on the BI server before sending and on the CFO's device after receipt — both at-rest states are unprotected; (2) once delivered, the PDF can be forwarded to unauthorized recipients, saved to unencrypted local storage, or accessed via a compromised email account — all completely outside TLS's protection scope; and (3) email TLS is opportunistic (dependent on both servers supporting it) and provides no protection if either endpoint is compromised. Transport encryption protects the pipe, not the artifact. Path-5 is a genuine encryption gap.",
    "ExplanationWrongD": "The 'trusted internal network' assumption is the precise vulnerability that modern security architectures reject. The zero-trust model, now standard in financial services, assumes no network segment is inherently trusted. Path-2 and Path-4 both transit financial data unencrypted within the 'trusted' zone — but an attacker who gains access to any internal system (via phishing, compromised credentials, or lateral movement) can capture this traffic. Additionally, regulatory frameworks (GLBA, PCI DSS, state data protection laws) increasingly require encryption of financial data in transit regardless of network zone. 'Internal trusted zone' is not a recognized exemption from encryption requirements for financial data.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  }
];