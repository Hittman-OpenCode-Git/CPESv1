// S899 — Batch 3: Technology items — 4 Pack C + 1 Pack D
const batch3 = [
  // ========== ITEM 11: P1-FC-005 — Data Analytics Method Selection (Analyze, Difficult) ==========
  {
    qid: "P1-FC-005", pack: "C", section: "F",
    metadata: {
      QuestionID: "P1-FC-005", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A correctly identifies the descriptive analytics performed (dashboards, transaction search) but fails to recognize that descriptive analytics alone cannot answer the CFO's forward-looking question. Descriptive analytics answers 'what happened' — it can show that total travel spend is $4.7 million but cannot predict what it would have been under different policy conditions. Detecting five employees with $200K+ spend is anomaly detection within descriptive analytics (identifying outliers in historical data). The core question is predictive: what would spend have been if the policy were enforced? Answering this requires a different analytical method that models a counterfactual scenario, not merely describing the observed one. Confusing descriptive outlier detection with predictive modeling is a common exam trap.",
      ExplanationWrongB: "Option B correctly identifies the need for a predictive method but selects the wrong one. Time-series forecasting projects historical patterns into the future — it would answer 'what will travel spend be next year if current trends continue?' But the CFO's question is counterfactual: 'what would spend have been under different policy conditions?' This requires a method that can model the relationship between policy enforcement (an input variable) and travel spend (the output variable). Regression analysis estimates this relationship using historical data where the policy was and was not enforced, then predicts the counterfactual outcome. Time-series forecasting extrapolates patterns but cannot isolate the policy effect from other factors that influence travel spend over time.",
      ExplanationWrongC: "Option C correctly diagnoses the limitation of descriptive analytics but misclassifies the analytics type required. Prescriptive analytics recommends actions based on predictive model outputs — it would answer 'what should we do to reduce travel spend?' after the predictive analysis is complete. The CFO's question is one step upstream: 'what would spend have been?' — a predictive question that must be answered before any prescriptive recommendation can be made. Furthermore, prescriptive analytics typically requires optimization or simulation models that build on predictive outputs. Jumping to prescriptive analytics skips the necessary predictive step. The sequence is descriptive → diagnostic → predictive → prescriptive, and the CFO's question sits squarely at the predictive stage.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-FC-005 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.006 data analytics — selecting the appropriate method for a business problem",
      MicroTopic: "Data analytics — descriptive vs. diagnostic vs. predictive vs. prescriptive",
      UniqueConceptKey: "F-C006-analytics-method-selection",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "The CFO of Pemberton Healthcare asks the data analytics team: 'Our travel and entertainment spend rose 18% last year to $4.7 million. I need to know what the spend would have been if we had enforced the pre-approval policy for all trips above $2,500.' The analytics team has access to: (1) two years of detailed T&E transaction data with employee, department, amount, date, and purpose fields; (2) the policy enforcement log showing that pre-approval was required for only 40% of eligible trips; and (3) a dashboard showing monthly T&E spend by department with year-over-year comparisons. Which analytics methodology should the team apply to answer the CFO's question, and why?",
      Choices: {
        A: "Descriptive analytics using transaction search and filtering — the team should query all trips above $2,500 that lacked pre-approval, sum the spend, and report the total as the policy non-compliance cost",
        B: "Predictive analytics using time-series forecasting — the team should model the historical T&E spend trend, project what spend would have been without the policy change, and compare to actuals",
        C: "Prescriptive analytics using optimization modeling — the team should build a model that minimizes T&E spend subject to policy constraints and recommend the optimal enforcement rate",
        D: "Predictive analytics using regression analysis — the team should build a model with pre-approval status as an independent variable to estimate the counterfactual spend that would have occurred had pre-approval been enforced for all trips above $2,500"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "The CFO's question is fundamentally predictive and counterfactual: it asks what would have happened under different conditions. This requires a method that can estimate the causal effect of the policy (pre-approval enforcement) on the outcome (T&E spend). Regression analysis is well-suited because: (1) it can model the relationship between the independent variable (pre-approval status: enforced vs. not enforced) and the dependent variable (spend amount); (2) it can control for confounding factors (department, trip purpose, employee seniority) that might otherwise bias the estimate; (3) it produces a counterfactual prediction — the model estimates what spend would have been for non-enforced trips if they had been enforced, all else equal. The analytics maturity model progresses from descriptive (what happened?) to diagnostic (why did it happen?) to predictive (what will/might happen?) to prescriptive (what should we do?). The CFO's question sits at the predictive layer, requiring a method that estimates an unobserved outcome under hypothetical conditions. Regression analysis, by estimating the partial effect of each variable on the outcome, is the appropriate predictive method for this counterfactual question.",
      StudyLinks: [
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F — Data Analytics", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 12: P1-FC-016 — Cloud Computing Model Selection (Evaluate, Difficult) ==========
  {
    qid: "P1-FC-016", pack: "C", section: "F",
    metadata: {
      QuestionID: "P1-FC-016", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends IaaS, which gives the organization maximum control over the operating system, middleware, and applications. While this provides the most flexibility for custom configuration, it also retains the maximum security and compliance burden on the customer. Under the shared responsibility model, the IaaS customer is responsible for securing the OS, applications, and data — all of the PHI protection layers that concern the compliance officer. IaaS is most appropriate when the organization needs to run custom applications or requires specific OS-level configurations. Aldenbury's requirements describe a standard database workload with HIPAA compliance needs — not a custom infrastructure build. IaaS would require Aldenbury to manage database patching, encryption key rotation, and audit logging — responsibilities that PaaS providers handle as part of the managed service.",
      ExplanationWrongB: "Option B correctly identifies PaaS as the appropriate model for the database workload but overreaches on the incremental recommendation. A hybrid cloud architecture addresses a different problem: organizations that want to keep some workloads on-premises while moving others to the cloud. The scenario describes a single decision — where to host one database — and provides no evidence that Aldenbury has other on-premises workloads that should remain on-premises. Recommending a hybrid architecture without that evidence adds complexity and cost without justification. The correct analysis evaluates each workload independently against cloud model criteria: the database workload fits PaaS; the question does not provide information about other workloads that would warrant a hybrid recommendation.",
      ExplanationWrongC: "Option C correctly identifies PaaS and points to the service most critical for a database migration, but the security concern is overstated. Major cloud providers' PaaS database offerings (e.g., Azure SQL Database, Amazon RDS) are HIPAA-eligible services that include encryption at rest, encryption in transit, audit logging, and access controls as configurable features. The compliance officer's concern is valid only if the organization fails to configure these features — which is a configuration issue, not a model-selection issue. SaaS applications for PHI exist and are used in healthcare, but a SaaS model would not fit Aldenbury's described need (the application is built in-house on a database, which PaaS serves better). The evaluation should consider whether the PaaS provider offers HIPAA-eligible services (they do) and whether the organization can configure them correctly, rather than defaulting to SaaS for all PHI workloads.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate replacement for archived P1-FC-016 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.017 cloud computing — IaaS, PaaS, SaaS model selection with control implications",
      MicroTopic: "Cloud computing service models — selection criteria",
      UniqueConceptKey: "F-C017-cloud-model-selection",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Aldenbury Medical Group plans to migrate its patient scheduling database to the cloud. The IT director recommends Platform as a Service (PaaS), arguing that 'the database is standard SQL Server, so managing operating system patches and database engine updates doesn't add value — we should offload that to the provider.' The compliance officer objects, noting that 'the database contains protected health information (PHI), and HIPAA requires that we maintain control over the computing environment that processes PHI.' The database supports an internally developed application that the in-house development team will continue to maintain. Evaluate the compliance officer's objection against the shared responsibility model.",
      Choices: {
        A: "The compliance officer's objection supports selecting IaaS — with IaaS, Aldenbury retains full control over the operating system and database engine, satisfying the HIPAA requirement to control the PHI processing environment while the cloud provider only manages physical infrastructure",
        B: "The compliance officer's objection is valid for PaaS but supports a hybrid approach — Aldenbury should use PaaS for the development and test environments but retain the production PHI database on-premises, creating a hybrid architecture that satisfies both IT efficiency and compliance requirements",
        C: "The compliance officer's objection is valid but misapplied — PaaS databases in healthcare cloud environments may not meet HIPAA security requirements; Aldenbury should select Software as a Service (SaaS) because SaaS vendors accept full HIPAA compliance responsibility through Business Associate Agreements",
        D: "The compliance officer's objection misunderstands the shared responsibility model — under PaaS, the provider manages the OS and database engine, but Aldenbury retains responsibility for data security, access controls, encryption, and audit logging, satisfying HIPAA requirements through configuration rather than infrastructure ownership"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Under the cloud shared responsibility model, security and compliance are shared between the cloud provider and the customer. The division of responsibility depends on the service model: in IaaS, the customer manages more (OS, middleware, applications, data); in PaaS, the provider manages the infrastructure, OS, and database engine while the customer retains responsibility for data, access management, and application-level security; in SaaS, the provider manages nearly everything. The compliance officer's objection conflates 'control' with 'ownership.' HIPAA does not require that the covered entity own the servers — it requires that PHI be protected through administrative, physical, and technical safeguards. Under PaaS: (1) Aldenbury controls who can access the database (identity and access management), (2) Aldenbury configures encryption (at rest and in transit), (3) Aldenbury manages audit logging and monitoring, and (4) the cloud provider's HIPAA-eligible PaaS services are covered by a Business Associate Agreement (BAA). The provider managing OS patches does not diminish Aldenbury's compliance — it strengthens it by ensuring the underlying platform is maintained to security standards. The correct model for a standard database workload with a custom application is PaaS: the organization retains application and data control while offloading infrastructure management that provides no competitive advantage.",
      StudyLinks: [
        { label: "NIST SP 800-145 — The NIST Definition of Cloud Computing", url: "https://www.nist.gov" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 13: P1-FC-045 — Data Quality Root Cause Analysis (Analyze, Difficult) ==========
  {
    qid: "P1-FC-045", pack: "C", section: "F",
    metadata: {
      QuestionID: "P1-FC-045", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A blames the users for a system design problem. The 'Customer Region' drop-down is inconsistent with other regional hierarchy references because the CRM system was configured with a different regional taxonomy than the ERP and data warehouse. Asking users to 'check the existing taxonomy' requires them to manually cross-reference three systems before entering data — a process that is both inefficient and error-prone. Data quality management addresses issues at the system level (standardization, master data) before pushing responsibility to data entry. The root cause is not user behavior — it is the absence of a master data management framework that enforces a single regional taxonomy across all systems. Retraining users on a broken process increases frustration without fixing the underlying inconsistency.",
      ExplanationWrongB: "Option B correctly identifies the data integration failure but proposes the wrong data quality dimension as the root cause. Completeness means all required data is present — the scenario does not describe missing data. All 2,300 customers have a region assigned; the problem is that different systems assign different region values to the same customer. This is a consistency problem (same entity, different values) and an accuracy problem (some values are wrong relative to the authoritative source). The variance report already identifies the inconsistency — what is needed is not another consistency check but a root-cause analysis of why the inconsistency exists and a master data management solution to prevent recurrence. Adding a data profiling tool for completeness checks would not detect the 340-customer mismatch because all records are complete — they just contain inconsistent values.",
      ExplanationWrongC: "Option C correctly identifies the taxonomy problem but incorrectly attributes it to timeliness. Data timeliness refers to whether data is current and available when needed — this is not the issue. The regional hierarchy in the ERP (the authoritative source) is updated quarterly; the problem is that the CRM system uses a different regional structure entirely, not that the ERP data is out of date. Establishing a quarterly data steward review may catch inconsistencies after they occur but does not prevent them — the root cause is that two systems were configured with incompatible regional taxonomies at implementation. The solution is to align the taxonomies through master data management, not to increase the review frequency of data that will continue to be inconsistently entered because the underlying taxonomies differ.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-FC-045 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.046 data governance — data quality dimensions and root cause analysis",
      MicroTopic: "Data quality — accuracy, completeness, consistency, timeliness, validity",
      UniqueConceptKey: "F-C046-data-quality-root-cause",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Oakmere Industries' quarterly sales dashboard shows that the Northeast region's revenue differs by $1.8 million between the CRM system report and the ERP general ledger. Investigation reveals: (1) The CRM system classifies 340 customers under 'Northeast' using a 4-region taxonomy, while the ERP uses a 6-region structure where those same customers are split between 'New England' and 'Mid-Atlantic.' (2) The data warehouse ETL process maps CRM's 'Northeast' to the first matching ERP region found ('New England'), discarding the Mid-Atlantic customers' revenue. (3) Three sales representatives manually enter their own regional classifications that override the system-assigned region. (4) The variance was first detected six months ago but was attributed to 'timing differences' and not investigated. Which data quality dimension is the root cause, and what governance mechanism should prevent recurrence?",
      Choices: {
        A: "Data accuracy — sales representatives entering manual regional classifications that override system assignments; the solution is to disable manual region override and retrain sales representatives on the existing taxonomy",
        B: "Data consistency — the CRM and ERP systems use different regional taxonomies causing the ETL process to silently drop data; the solution is to implement a data profiling tool that validates cross-system consistency after every ETL run",
        C: "Data timeliness — the six-month delay between detection and investigation allowed the error to compound; the solution is to establish a monthly data steward review of all cross-system variance reports exceeding $100,000",
        D: "Data consistency at the master data level, compounded by a failed ETL mapping rule that silently discarded data — the root solution is to implement a master data management program that defines a single, authoritative regional taxonomy enforced across all systems and validated by the ETL process"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Three data quality failures cascade: (1) The CRM and ERP systems were implemented with incompatible regional taxonomies (4 regions vs. 6 regions). This is a master data consistency failure — the same business concept (sales region) is represented differently across systems. (2) The ETL mapping rule that maps CRM's 'Northeast' to only the first matching ERP region and silently discards non-matching data is an integration design defect — it should have flagged unmapped regions as exceptions requiring resolution, not silently dropped them. (3) Allowing sales representatives to manually override system-assigned regions introduces individual data entry errors on top of the structural taxonomy mismatch. The root solution addresses governance at the master data level: a master data management (MDM) program defines the authoritative regional taxonomy once and enforces it across all consuming systems. The ETL process must validate that all source data maps to the MDM-defined taxonomy and flag exceptions for resolution — never silently drop data. This prevents recurrence of the structural inconsistency rather than merely detecting it after the fact.",
      StudyLinks: [
        { label: "DAMA International — Data Management Body of Knowledge (DMBoK), Data Quality Chapter", url: "https://www.dama.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 14: P1-FC-050 — AI/ML — Supervised vs. Unsupervised Learning (Evaluate, Very Difficult) ==========
  {
    qid: "P1-FC-050", pack: "C", section: "F",
    metadata: {
      QuestionID: "P1-FC-050", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A correctly identifies that the problem has labeled data (known fraudulent transactions from confirmed investigations), making supervised classification viable. However, the analysis fails to consider that fraud patterns evolve. A supervised model trained on historical confirmed fraud cases learns to detect patterns that were fraudulent in the past — it will not detect novel fraud techniques that differ from historical patterns because those patterns do not appear in the training data. Fraud detection is one of the canonical use cases where a hybrid approach is recommended: supervised learning for known patterns plus unsupervised anomaly detection for new, previously unseen patterns. Recommending supervised classification alone ignores the specific fraud-domain requirement for detecting unknown fraud types.",
      ExplanationWrongB: "Option B correctly identifies that unsupervised learning can detect novel patterns (clustering unidentified transactions into anomalous groups). However, it incorrectly recommends unsupervised learning alone. The scenario explicitly states that the bank has labeled data — 14 months of transactions with confirmed fraud outcomes. Discarding this labeled data would waste the most valuable resource in fraud detection: known fraud cases. Unsupervised learning alone would cluster transactions but would not be able to distinguish between fraudulent anomalies and merely unusual-but-legitimate transactions. The clusters would need to be manually reviewed and labeled, which is the very process the bank already performed for 14 months. The labeled data should be used to train a supervised classifier for known fraud patterns, with unsupervised anomaly detection layered on top for unknown patterns.",
      ExplanationWrongC: "Option C correctly identifies reinforcement learning's suitability for sequential decision-making where feedback occurs after actions. However, fraud detection is not a sequential decision problem in the reinforcement learning paradigm. In RL, an agent takes actions in an environment and receives rewards/penalties that guide future actions. Fraud detection is a classification/pattern-recognition problem: given a transaction's attributes, classify it as fraudulent or legitimate. The 'reward signal' described (confirmed fraud → penalty for false negative) is simply the labeled outcome that supervised learning already uses. Reinforcement learning adds complexity (state-space modeling, exploration-exploitation trade-offs, policy optimization) without adding capability beyond what supervised + unsupervised learning already provides for this use case. The problem structure (classify transactions → receive confirmed outcomes → update model) maps naturally to supervised classification with periodic retraining, not RL.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 5, CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate/Very Difficult replacement for archived P1-FC-050 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.051 artificial intelligence — supervised vs. unsupervised vs. reinforcement learning — method selection",
      MicroTopic: "AI/ML — supervised vs. unsupervised learning — method selection",
      UniqueConceptKey: "F-C051-ml-method-selection",
      LOSTag: "F Technology and analytics",
      Difficulty: "Very Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "A regional bank's fraud analytics team is designing a machine learning system to detect fraudulent credit card transactions. The bank has: (1) 14 months of labeled transaction data where each transaction is marked as 'fraudulent' or 'legitimate' based on confirmed investigation outcomes; (2) 3,100 features per transaction including amount, merchant category, time, location, device fingerprint, and velocity metrics; (3) historical data showing that fraud patterns shift significantly every 6-8 months as criminals adapt to detection methods; (4) a requirement to flag suspicious transactions for human review within 200 milliseconds of authorization. The team lead proposes using supervised classification (gradient boosting) trained on the labeled data, retrained monthly. The data scientist argues for unsupervised anomaly detection because 'fraud patterns evolve faster than our labels can capture.' The compliance officer insists on 'an interpretable model where every flagged transaction can be explained to regulators.' Evaluate the competing approaches.",
      Choices: {
        A: "The team lead is correct — supervised classification is the appropriate choice because the bank has 14 months of labeled data with confirmed fraud outcomes, enabling the model to learn known fraud patterns with high precision; unsupervised learning would produce too many false positives requiring human review",
        B: "The data scientist is correct — unsupervised anomaly detection should be used exclusively because fraud is adversarial: criminals actively change their behavior to evade detection, meaning patterns in historical labeled data will not predict future fraud; unsupervised methods can detect any transaction that deviates from normal behavior regardless of whether the specific fraud pattern was previously observed",
        C: "The compliance officer is partially correct — a reinforcement learning approach should be used because fraud detection is a sequential decision problem where the model's decisions (flag/approve) receive delayed feedback (confirmed fraud or legitimate), allowing the model to continuously learn and adapt",
        D: "A hybrid approach is required — supervised classification should detect known fraud patterns from the labeled data, while unsupervised anomaly detection should flag novel patterns not present in training data; both models should be deployed in parallel with a business rule layer for interpretability, and retraining frequency should match the observed fraud pattern evolution cycle"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Fraud detection is a canonical use case for hybrid ML architectures because it combines two distinct sub-problems: (1) detecting known fraud patterns (where supervised learning excels — the 14 months of labeled data provides a training signal for known schemes), and (2) detecting novel or evolving fraud patterns (where unsupervised anomaly detection is necessary — criminals adapt to evade detection, so patterns in historical data may not appear in future transactions). Neither approach alone is sufficient. Supervised-only systems are blind to novel fraud types because the model never saw them in training. Unsupervised-only systems cannot leverage the valuable labeled data and produce high false-positive rates because they flag all anomalies, not just fraudulent ones (e.g., a customer's first large purchase at a jewelry store is anomalous but legitimate). The hybrid solution deploys both models in parallel: the supervised classifier scores transactions for known fraud patterns, the unsupervised anomaly detector flags transactions that deviate from normal behavior, and a business rule layer (interpretable, regulator-explainable) combines the scores to generate review flags. The retraining frequency must match the observed fraud evolution cycle (6-8 months) to capture new labeled patterns without overfitting to transient fraud campaigns. The 200ms latency requirement is achievable with gradient-boosted tree models and pre-computed features.",
      StudyLinks: [
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F — AI and Machine Learning", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 15: P1-FD-002 — API vs. ETL vs. Middleware (Analyze, Difficult) ==========
  {
    qid: "P1-FD-002", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-002", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends ETL for a use case that is fundamentally real-time. The scenario specifies that inventory availability must reflect orders within seconds — ETL's batch processing model (typically hourly or daily) would create inventory discrepancies where two sales channels show different stock levels for the same product. An ETL process that runs every 30 minutes means customers could order products that have already sold out on the website, generating cancellations and customer dissatisfaction. ETL is the right tool for the historical reporting use case (Option D acknowledges this), but it is the wrong tool for real-time inventory synchronization. Both requirements (real-time sync + historical reporting) need different integration approaches for different data flows, not a single pattern applied universally.",
      ExplanationWrongB: "Option B recommends middleware (ESB/enterprise service bus) for what is essentially a point-to-point integration between two systems. Middleware is most valuable when many systems need to communicate in a hub-and-spoke pattern with message transformation, routing, and orchestration. The scenario describes two systems (ERP and e-commerce) — a classic point-to-point integration. Introducing an ESB adds infrastructure complexity, a new single point of failure, and ongoing maintenance costs that are disproportionate to the integration's scope. The integration requirement is straightforward: the e-commerce platform needs real-time inventory availability and must send orders to the ERP. Two API endpoints (GET inventory, POST order) satisfy both requirements without the overhead of a middleware layer.",
      ExplanationWrongC: "Option C correctly recommends API-based integration but overcomplicates the architecture by proposing an event-driven pattern for a synchronous request-response use case. Event-driven architecture is appropriate when changes in one system should be consumed asynchronously by multiple downstream systems. Here, the e-commerce platform needs to check inventory at the moment a customer views a product page — a synchronous request-response pattern. Publishing inventory changes as events would require the e-commerce platform to maintain its own inventory cache and process events to keep it current, adding complexity and the risk of cache staleness. The APM's 12-month data requirement is satisfied by the ERP's standard reporting module, not by an event-driven integration. For two-system, request-response integration, REST APIs are the appropriate choice.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-FD-002 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.003 system integration — API vs. ETL vs. middleware — selection criteria",
      MicroTopic: "System integration architectures — API, ETL, middleware",
      UniqueConceptKey: "F-D003-integration-architecture-selection",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Barstow Outdoor Gear is integrating its on-premises ERP system with a new cloud-based e-commerce platform. The requirements are: (1) real-time inventory availability must be displayed on the website, updated within 5 seconds of any ERP inventory change; (2) online orders must flow into the ERP for fulfillment within 30 seconds of customer submission; (3) the e-commerce platform must be able to query the ERP for customer order history to display on the 'My Account' page; (4) the finance team needs a daily extract of all online orders for reconciliation, which will be loaded into a data warehouse. No other systems will be integrated in the next 24 months. Which integration architecture best satisfies these requirements?",
      Choices: {
        A: "ETL-based integration — a batch ETL process should extract orders from the e-commerce platform and load them into the ERP every 30 minutes, with a separate extract from ERP to e-commerce for inventory updates on the same schedule",
        B: "Middleware-based integration using an enterprise service bus (ESB) — an ESB should mediate all communications between ERP and e-commerce, transforming messages between the two systems' data formats and providing guaranteed delivery",
        C: "API-based integration with event-driven architecture — REST APIs should provide real-time inventory queries and order submission, with an event stream (e.g., Kafka) publishing inventory changes that the e-commerce platform subscribes to for cache updates",
        D: "API-based integration with REST endpoints — RESTful APIs should provide real-time inventory queries (GET /inventory/{sku}) and order submission (POST /orders), supplemented by a daily ETL extract from the ERP to the data warehouse for finance reconciliation"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "The requirements describe two distinct integration patterns. For real-time operations: the inventory availability display and order submission require sub-second response times and synchronous request-response communication — REST APIs are the standard and simplest solution for this pattern. Two simple endpoints (GET inventory, POST order) satisfy both real-time requirements without the overhead of middleware, event streaming, or message queues. For historical reporting: the finance team's daily reconciliation extract is a batch-oriented data movement pattern — ETL is the correct tool. Attempting to serve the reporting use case through real-time APIs would be inefficient (querying individual orders one at a time) and would load the operational ERP during business hours. Conversely, attempting to serve real-time inventory through ETL would introduce latency (30-minute batches vs. 5-second requirement) and inventory accuracy problems. The principle is: use the right integration pattern for each data flow, not one pattern for all flows. REST APIs for synchronous operational integration; ETL for batch analytical data movement.",
      StudyLinks: [
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F — Information Systems", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  }
];

module.exports = batch3;
