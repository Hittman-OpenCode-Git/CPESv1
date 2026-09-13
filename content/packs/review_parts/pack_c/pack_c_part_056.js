const MCQ_BANK_C_PART_56 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.071 technology-enabled continuous auditing — evaluating implementation approach",
    "MicroTopic": "Continuous auditing implementation approach evaluation",
    "UniqueConceptKey": "F-C071-continuous-auditing-implementation",
    "LOSTag": "P1-F.5 Technology-enabled Auditing",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Healthcare Network operates 14 hospitals and processes approximately 2.3 million patient billing transactions annually. The internal audit director, Fatima Osei, has board approval to implement a continuous auditing program for the revenue cycle — specifically, to detect duplicate claims, coding errors, and billing for services not documented in patient records. Osei is evaluating three implementation approaches: Approach 1 — embed continuous auditing scripts directly in the Epic EHR and patient accounting systems using the hospital's existing SQL-based reporting infrastructure, managed by Osei's audit analytics team of three staff. Approach 2 — deploy a standalone continuous auditing platform (ACL/Galvanize) that extracts data nightly from the EHR, runs audit analytics on a separate server, and generates exception reports by 8:00 AM daily. Approach 3 — engage a Big Four firm's managed continuous auditing service that remotely monitors the hospital's billing data, provides monthly exception reports, and benchmarks results against 27 other healthcare systems. Osei must evaluate the trade-offs among cost (Approach 1: $185,000 annual operating cost; Approach 2: $340,000 annual license plus $95,000 for integration; Approach 3: $520,000 annual fee), auditor independence, timeliness of exception detection, depth of analytics, and data access control. Under the IIA International Standards and COSO Principle 11, which recommendation best balances these competing objectives?",
    "Choices": {
      "A": "Approach 1 (embedded scripts in EHR) — this approach provides the lowest cost ($185,000/year), real-time access to production data without data extraction latency, and keeps audit analytics entirely within Osei's team, preserving auditor independence. The SQL-based infrastructure leverages existing technology investments and avoids the integration complexity of a standalone platform or the data-sharing concerns of outsourcing.",
      "B": "Approach 2 (standalone continuous auditing platform) — this approach balances independence, analytical capability, and cost. Storing audit analytics on a separate server preserves auditor independence from IT-controlled production systems, the dedicated platform provides pre-built healthcare billing analytics that the SQL-based approach would require Osei's team to develop from scratch, and the $435,000 first-year total cost is justified by superior detection capability and a demonstrated audit analytics framework.",
      "C": "Approach 3 (outsourced continuous auditing service) — this approach provides maximum independence (external firm performs monitoring), the broadest analytical capability (benchmarking against 27 other healthcare systems identifies patterns invisible to single-system analysis), and transfers implementation risk to the service provider. The $520,000 annual fee is justified by the superior detection capability and the board-level credibility of an external service provider's findings.",
      "D": "A hybrid approach — implement Approach 1 for the first 12 months to establish baseline analytics and demonstrate value to the board using the existing SQL infrastructure ($185,000), then transition to Approach 2 in year two to scale the program with a dedicated platform. This avoids committing to a $435,000 investment before demonstrating that continuous auditing produces actionable findings."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the IIA International Standards (Attribute Standard 1100 — Independence and Objectivity, and Performance Standard 1220 — Due Professional Care) and COSO Principle 11, the continuous auditing implementation decision requires evaluating independence, analytical capability, cost, timeliness, and scalability as interdependent factors — not as independent criteria that can be optimized sequentially. Approach 2 (standalone platform) best balances these competing objectives when evaluated holistically. First, auditor independence is structurally protected by hosting audit analytics on a separate server. Under IIA Standard 1100, the internal audit activity must be independent, and audit personnel must be objective in performing their work. If audit scripts are embedded in production EHR systems (Approach 1), IT controls the script execution environment — IT can modify, disable, or deprioritize audit scripts during system maintenance, patch cycles, or performance incidents without audit's knowledge. This creates a structural dependency that compromises organizational independence, and under Standard 1100, such impairments must be disclosed to the board. Second, a dedicated continuous auditing platform provides pre-built healthcare billing analytics (duplicate claim detection, coding pattern analysis, service-to-documentation matching) that Osei's team of three would need to design, test, validate, and maintain from scratch under Approach 1. The $435,000 first-year cost must be evaluated against the opportunity cost of diverting three audit staff from other risk areas to build custom analytics — a resource allocation decision under Standard 1220's requirement to exercise due professional care in planning the engagement. Third, while Approach 3 (outsourced) offers benchmarking and maximum perceived independence, its monthly reporting cycle does not meet the timeliness requirement — detecting a duplicate claim pattern 30 days after submission means the hospital has already received and may have spent the overpayment, complicating recovery. Approach 2 provides daily exception detection (by 8:00 AM), which is sufficient for revenue cycle auditing where claims can be corrected before submission or within the payer's timely filing window. Approach 1 trades independence for real-time access. Approach 3 trades timeliness for independence. The hybrid approach (Option D) defers the independence problem for 12 months rather than solving it — embedding audit scripts in IT-controlled production systems for a full year is precisely the independence compromise that Standard 1100 is designed to prevent. By weighing these trade-offs collectively, Approach 2 emerges as the recommendation that preserves independence, provides adequate detection timeliness, leverages proven audit analytics, and justifies its cost through superior detection capability and reduced staff development burden.",
    "StudyLinks": [
      {
        "label": "IIA International Standards for the Professional Practice of Internal Auditing — Attribute Standard 1100 and Performance Standard 1220",
        "url": "https://www.theiia.org/en/standards/"
      },
      {
        "label": "COSO Internal Control — Integrated Framework (2013), Principle 11",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FC-071",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A correctly identifies the cost advantage and real-time data access of Approach 1 but underweights the auditor independence risk and the resource burden on Osei's team. Embedding audit scripts in production EHR systems means IT controls the execution environment — IT can modify, disable, or deprioritize audit scripts during system maintenance, patch cycles, or performance incidents without audit's knowledge. Under IIA Standard 1100, organizational independence requires that the chief audit executive report to a level that allows the internal audit activity to fulfill its responsibilities without interference. A structural dependency on IT-controlled production systems for audit analytics constitutes an independence limitation that must be disclosed to the board. Additionally, Osei's team of three audit analysts would need to design, test, validate, and maintain healthcare billing analytics from scratch using SQL — a significant development effort that diverts staff from other audit engagements, contrary to Standard 1220's requirement for efficient resource allocation. A candidate selecting this option may be optimizing for cost while underweighting the independence and resourcing dimensions of the evaluation, treating them as secondary considerations rather than as co-equal governance requirements under the IIA Standards.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C correctly identifies the independence and benchmarking advantages of Approach 3 but underweights two critical factors: timeliness of detection and the sustainability of capability transfer. Monthly exception reporting means that a systematic duplicate claim pattern operating for 30 days could generate hundreds of thousands of dollars in overpayments before the audit service identifies it — revenue cycle auditing requires detection cycles measured in days, not months, to enable recovery before claims are adjudicated. The $520,000 annual fee is also the highest-cost option and represents a recurring operating expense with no transfer of capability to Osei's team — at the end of the contract, Meridian has no internal continuous auditing capability. Under IIA Standard 1220, internal auditors must exercise due professional care by considering the extent of work needed to achieve the engagement's objectives. Permanently outsourcing a core audit function without developing internal capability may not satisfy the standard's expectation that the internal audit activity collectively possesses the knowledge and skills needed to fulfill its responsibilities. A candidate selecting this option may be treating outsourcing as a complete substitute for internal capability rather than evaluating whether it complements or undermines the internal audit function's long-term competence.",
    "ExplanationWrongD": "Option D correctly sequences implementation but defers the auditor independence problem for 12 months rather than solving it. During Phase 1, audit scripts run in production EHR systems controlled by IT — the same independence limitation exists for the entire first year. If the board has already approved the continuous auditing program based on Osei's assessment that it is necessary for effective revenue cycle assurance, adopting a known independence-compromised approach for a temporary period is not a defensible governance decision under IIA Standard 1100. Additionally, the hybrid approach assumes that Approach 1 will demonstrate sufficient value within 12 months to justify the Approach 2 investment, but if Approach 1 underperforms because the audit team cannot develop sufficiently sophisticated analytics with SQL alone, the board may interpret this as evidence that continuous auditing itself does not produce value — a false negative caused by the tool, not the concept. A candidate selecting this option may be treating sequential implementation as a risk mitigation strategy when it actually defers the key structural governance decision (independence) to a future period while accepting known independence impairment in the interim.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.072 technology-enabled continuous auditing — exception management threshold design and false-positive optimization",
    "MicroTopic": "Continuous auditing exception threshold design",
    "UniqueConceptKey": "F-C072-continuous-auditing-threshold-design",
    "LOSTag": "P1-F.5 Technology-enabled Auditing",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northstar Financial Services processes 4.7 million general ledger journal entries annually across 22 subsidiaries. The internal audit director, James Adebayo, deployed a continuous auditing module six months ago that applies 47 rules-based tests to every journal entry — including tests for unusual posting times (outside 7:00 AM–9:00 PM), round-dollar entries above $25,000, entries posted by authorized-but-unusual users, and manual entries to system-controlled accounts. The module generates 2,400 exception alerts per month. After six months of investigation, Adebayo's team has determined that only 72 of the approximately 14,400 cumulative exceptions (0.5%) represent genuine control failures — unauthorized entries, policy violations, or potential fraud indicators. The remaining 99.5% are false positives: legitimate period-end adjustments by authorized controllers, intercompany eliminations that match the rules' pattern profiles, and tax entries posted by the tax department outside normal hours during filing season. Investigating all 2,400 alerts requires 2.5 full-time equivalent audit staff and is not sustainable. Adebayo must evaluate four competing approaches to managing exception volume: tightening rule thresholds (reducing detection breadth to improve precision), deploying machine-learning triage (preserving detection breadth while improving precision through learned classification), increasing staffing (accepting the false-positive rate and scaling investigation capacity), or reducing to sampling (preserving detection breadth but sacrificing timeliness). Each approach involves distinct trade-offs among detection sensitivity, investigation efficiency, timeliness, and cost. Under COSO Principle 11 and the IIA Standards, which recommendation represents the most appropriate balance of these competing objectives?",
    "Choices": {
      "A": "Tighten the rule thresholds to reduce false positives — for example, raise the round-dollar threshold from $25,000 to $100,000, restrict unusual-hour detection to entries posted between midnight and 5:00 AM, and exclude the tax department and controller group from user-based rules. This mechanical approach will reduce exceptions by an estimated 65–75% with minimal implementation effort, but it also eliminates detection coverage for the threshold range that is excluded — a fraudulent entry of $95,000 would no longer be flagged.",
      "B": "Implement a machine-learning triage layer that scores each exception for the probability that it represents a genuine control failure, based on patterns identified in the 14,400 reviewed exceptions. The ML model learns which combinations of rules, users, accounts, amounts, and timing patterns correlate with genuine issues, and presents only high-probability exceptions (estimated top 15%) to auditors for investigation. Remaining exceptions are logged and reviewed quarterly for pattern changes. This approach preserves full detection breadth while reducing investigation volume through learned classification, and improves over time as each auditor investigation (confirmed issue or false positive) trains the model.",
      "C": "Increase the internal audit staff by two full-time employees dedicated to exception investigation — from 2.5 to 4.5 FTEs. This accepts the 99.5% false-positive rate as inherent to comprehensive continuous auditing and scales investigation capacity to match detection volume, treating the staffing increase as the cost of comprehensive detection coverage.",
      "D": "Accept the 99.5% false-positive rate as normal for continuous auditing and reduce investigation of low-severity exceptions to a quarterly sample (investigating 10% of each exception category). This preserves the full scope of detection rules while reducing investigation workload to approximately 240 exceptions per month, accepting that some genuine control failures in the unsampled 90% will not be detected for up to 90 days."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under COSO Principle 11 (technology general controls) and the IIA Performance Standards (Standard 1220 — Due Professional Care, and Standard 2310 — Identifying Information), the continuous auditing exception management decision requires balancing detection comprehensiveness, investigation efficiency, timeliness, and cost — objectives that are in genuine tension and require weighing competing trade-offs rather than optimizing any single dimension. The machine-learning triage approach (Option B) achieves the best balance across all four dimensions. First, it preserves the full scope of detection: all 47 rules continue to run against all 4.7 million journal entries, ensuring no detection gap is created. This addresses the fundamental limitation of threshold tightening (Option A), which reduces false positives by narrowing detection scope — raising the round-dollar threshold from $25,000 to $100,000 means a fraudulent entry of $95,000 would no longer be detected, trading precision for sensitivity. Second, ML triage addresses the root cause of the false-positive problem: the 47 rules-based tests produce high false-positive rates because they apply uniform numeric and temporal thresholds to a heterogeneous journal entry population. A tax department entry posted at 11:00 PM during filing season is operationally normal, not suspicious — but a fixed time-based rule cannot distinguish this contextual normality from an unauthorized entry by a staff accountant posted at 11:00 PM. ML triage learns these contextual patterns from the 14,400 reviewed exceptions and surfaces only those exceptions that match the profile of previously confirmed control failures, improving precision without sacrificing detection breadth. Third, ML triage is scalable — as Northstar grows to more subsidiaries and journal entry volumes increase, the ML model processes increasing exception volumes without requiring proportional increases in audit staffing. Adding two FTEs (Option C) treats the symptom (investigation workload) rather than the root cause (poor signal-to-noise ratio), and at 0.5% precision, each additional auditor would spend 99.5% of their time investigating false positives — an inefficient allocation of specialized assurance resources under Standard 1220. Fourth, ML triage preserves timely investigation of high-probability exceptions while logging lower-probability exceptions for quarterly pattern review. Reducing to quarterly sampling (Option D) preserves detection breadth but introduces a 90-day detection lag during which a fraudulent journal entry pattern could cause material financial statement misstatement before the relevant exception category is sampled. Under IIA Standard 2310, internal auditors must identify sufficient and appropriate information to achieve the engagement's objectives — ML triage improves the appropriateness of information by focusing auditor attention on the highest-probability exceptions while maintaining the sufficiency of the detection net through continuous rules-based screening of the full journal entry population. This recommendation represents the optimal balance between the competing demands of detection sensitivity and investigation efficiency.",
    "StudyLinks": [
      {
        "label": "IIA International Standards for the Professional Practice of Internal Auditing — Standard 1220 and Standard 2310",
        "url": "https://www.theiia.org/en/standards/"
      },
      {
        "label": "COSO Internal Control — Integrated Framework (2013), Principle 11",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FC-072",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A addresses the false-positive rate mechanically by raising thresholds, but this approach trades detection sensitivity for investigation efficiency in a way that creates perverse outcomes. The same thresholds that filter out false positives also filter out true positives that share the same numeric characteristics. A fraudulent round-dollar entry of $95,000 is economically more damaging than one of $105,000, but raising the threshold to $100,000 would exclude the more damaging entry while including the less damaging one — a result driven by an arbitrary cutoff, not by risk. Similarly, excluding the tax department and controller group from user-based rules creates a detection blind spot: these are precisely the individuals with the authority and access to post high-risk journal entries that could materially affect the financial statements. Excluding them from monitoring assumes that authority eliminates fraud risk — a control fallacy that contradicts COSO Principle 10's requirement to identify and assess fraud risk across all levels of the organization. A candidate selecting this option may be treating exception reduction as a threshold-tuning exercise rather than analyzing the fundamental cause of false positives: the rules lack contextual awareness. Threshold tightening is a blunt instrument that necessarily sacrifices detection sensitivity for investigation efficiency, making the trade-off explicit but failing to optimize it.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C treats the false-positive problem as a resourcing problem rather than an analytics design problem, and the economics do not support this approach. Adding two full-time auditors would increase investigation capacity but would not improve the 0.5% signal-to-noise ratio — each additional auditor would spend 99.5% of their time investigating exceptions that are confirmed to be false positives. This is an inefficient allocation of specialized internal audit resources, which should be directed toward high-judgment assurance activities rather than repetitive false-positive investigations. Under IIA Standard 1220, internal auditors must exercise due professional care by considering the extent of work needed to achieve the engagement's objectives — the standard requires efficient resource allocation, not unlimited investigation of all exceptions regardless of their quality. At an estimated fully-loaded cost of $150,000 per auditor, the $300,000 annual staffing increase would fund the first-year implementation of ML triage (Option B) with resources remaining, while producing an inferior outcome: the staffing approach provides no improvement in precision, no learning over time, and creates a permanent recurring cost with no scalability. A candidate selecting this option may be treating capacity as a substitute for capability, ignoring that the underlying problem is the quality of the exceptions generated, not the quantity of staff available to investigate them.",
    "ExplanationWrongD": "Option D preserves the breadth of detection but introduces a 90-day detection lag through quarterly sampling — a window during which a systematic journal entry fraud pattern could cause material financial statement misstatement before the relevant exception category is sampled. If a fraudulent pattern begins on day one of the quarter and the relevant exception category is not sampled until day 90, the perpetrator has had a full quarter to execute and potentially conceal the fraud before audit detection. Additionally, quarterly sampling at 10% per category means that many individual exceptions are never investigated — if a genuine control failure appears in the unsampled 90%, it escapes detection entirely, not merely detection delay. Under COSO Principle 11, monitoring activities should be performed on a timely basis — quarterly sampling for a program described as 'continuous auditing' fundamentally contradicts the purpose of continuous monitoring, which is to reduce the detection window from months to days. A candidate selecting this option may be conflating statistical sampling methodology (appropriate for periodic substantive testing) with continuous monitoring program design, which is designed to provide near-real-time detection of control failures.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.073 technology enabled continuous auditing",
    "MicroTopic": "technology enabled continuous auditing",
    "UniqueConceptKey": "F-C073-technology-enabled-continuous-auditing",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ashenford's internal audit function uses automated tools to continuously monitor transactions for anomalies rather than relying solely on periodic manual sampling. What approach is this?",
    "Choices": {
      "A": "Continuous auditing, using technology to monitor transactions on an ongoing basis",
      "B": "Sales forecasting, which projects future revenue",
      "C": "Standard costing, which sets predetermined cost benchmarks",
      "D": "Zero-based budgeting, which is unrelated to auditing"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Continuous auditing uses technology to automatically and frequently monitor transactions and controls, enabling earlier detection of anomalies than traditional periodic sampling.",
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
    "QuestionID": "P1-FC-073",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Choice B is incorrect because sales forecasting is a planning activity that projects future revenue based on historical trends, market conditions, and statistical models. The stem describes an ongoing audit monitoring process that reviews actual transactions for anomalies — retrospective detection, not prospective revenue estimation. A candidate may confuse forward-looking planning tools with backward-looking audit monitoring techniques.",
    "ExplanationWrongC": "Choice C is incorrect because zero-based budgeting is a financial planning methodology requiring managers to justify all expenses from scratch each period. It is unrelated to internal audit monitoring of transactions and controls. A candidate may confuse a budgeting technique with an audit methodology based on the shared concept of starting from a baseline.",
    "ExplanationWrongD": "Choice D is incorrect because standard costing establishes predetermined cost benchmarks for products and services to facilitate budgeting and variance analysis. The stem describes internal audit continuously monitoring transactions using automated tools — an assurance technology, not a cost accounting practice. A candidate may confuse any cost management technique with audit technology based on superficial similarities.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.074 technology enabled continuous auditing",
    "MicroTopic": "technology enabled continuous auditing",
    "UniqueConceptKey": "F-C074-technology-enabled-continuous-auditing",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Brookmoor's internal audit function uses automated tools to continuously monitor transactions for anomalies rather than relying solely on periodic manual sampling. What approach is this?",
    "Choices": {
      "A": "Sales forecasting, which projects future revenue",
      "B": "Continuous auditing, using technology to monitor transactions on an ongoing basis",
      "C": "Zero-based budgeting, which is unrelated to auditing",
      "D": "Standard costing, which sets predetermined cost benchmarks"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Continuous auditing uses automated tools to monitor transactions or controls on an ongoing basis. It improves timely detection of anomalies compared with periodic manual sampling, but still requires alert review, investigation, and follow-up.",
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
    "QuestionID": "P1-FC-074",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because sales forecasting projects future revenue expectations using historical data, trend analysis, and market assumptions. It is a financial planning and budgeting tool, not an audit methodology. The stem describes automated, ongoing review of actual transactions to identify anomalies — an audit monitoring function, not a revenue prediction exercise.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C is incorrect because zero-based budgeting is a budgeting technique that requires every expense to be justified from a zero base each period, rather than using prior-year spending as a starting point. The stem describes automated transaction monitoring and anomaly detection — continuous auditing — which is unrelated to the budget preparation process. A candidate may confuse any method involving ongoing review with the specific practice of continuous auditing.",
    "ExplanationWrongD": "Standard costing sets cost benchmarks; it is not continuous audit monitoring of transaction anomalies.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.075 technology enabled continuous auditing",
    "MicroTopic": "technology enabled continuous auditing",
    "UniqueConceptKey": "F-C075-technology-enabled-continuous-auditing",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Coalgate's internal audit function uses automated tools to continuously monitor transactions for anomalies rather than relying solely on periodic manual sampling. What approach is this?",
    "Choices": {
      "A": "Sales forecasting, which projects future revenue",
      "B": "Zero-based budgeting, which is unrelated to auditing",
      "C": "Continuous auditing, using technology to monitor transactions on an ongoing basis",
      "D": "Standard costing, which sets predetermined cost benchmarks"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Continuous auditing uses technology to automatically and frequently monitor transactions and controls, enabling earlier detection of anomalies than traditional periodic sampling.",
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
    "QuestionID": "P1-FC-075",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because sales forecasting projects future revenue using historical trends, economic indicators, and market analysis — it is a planning and budgeting activity. The stem describes continuous, automated review of actual transactions for anomalies, which is an audit monitoring function. A candidate may confuse any forward-looking analytical activity with the specific practice of continuous auditing.",
    "ExplanationWrongB": "Option B identifies zero-based budgeting, which is unrelated to the scenario. Coalgate's audit function is applying continuous auditing — automated tools that monitor transactions for anomalies on an ongoing basis rather than relying solely on periodic manual sampling. ZBB is a budgeting methodology with no monitoring function; the stem's emphasis on automation and continuous transaction monitoring points only to continuous auditing.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Standard costing sets predetermined cost benchmarks for variance analysis. It is a cost accounting technique, not an audit approach. The stem describes automated transaction monitoring for anomalies, which is continuous auditing.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  }
];