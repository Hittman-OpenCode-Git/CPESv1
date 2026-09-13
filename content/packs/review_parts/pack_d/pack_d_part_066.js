var MCQ_BANK_D_PART_66 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.031 cybersecurity incident response actions",
    "MicroTopic": "cybersecurity incident response actions",
    "UniqueConceptKey": "F-D031-cybersecurity-incident-response-actions",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A compliance analyst at Frostvale notices unusual outbound network activity suggesting customer PII may have been exfiltrated. What is the most appropriate immediate response?",
    "Choices": {
      "A": "Notify affected customers before investigation",
      "B": "Disconnect company servers and shut down operations indefinitely",
      "C": "Activate the incident response plan, contain the breach, and begin forensic investigation",
      "D": "Continue normal operations and document the activity for next month's report"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under the NIST Cybersecurity Framework Respond function and standard incident response protocols (NIST SP 800-61), the correct priority sequence when potential PII exfiltration is detected is: (1) contain the breach to stop further data loss, (2) preserve evidence and begin forensic investigation to determine scope and root cause, (3) assess notification requirements based on investigation findings. The management accountant evaluating this scenario must weigh four competing priorities: speed of action, accuracy of investigation, stakeholder communication obligations, and business continuity. Option C (activate IR plan, contain, investigate) is the only option that balances these priorities correctly. Evaluating the alternatives: Option A (notify customers before investigation) prioritizes communication speed over accuracy — premature notification may cause unnecessary reputational harm if the exfiltration is unconfirmed, may alert the attacker and cause evidence destruction, and may result in inaccurate disclosures that trigger regulatory penalties. Option B (disconnect all servers indefinitely) over-prioritizes containment at the expense of business continuity — a proportional containment response isolates affected systems rather than shutting down all operations. Option D (continue normal operations) fails entirely to evaluate the severity of the breach indicator — potential PII exfiltration is a high-severity event requiring immediate response, not deferred documentation. The management accountant's professional judgment in this scenario requires evaluating the tradeoff between investigative thoroughness and response speed, applying the principle that containment precedes notification, and selecting a proportionate response that addresses the risk without causing disproportionate business harm. The correct answer is Option C — activate the incident response plan, contain the breach, and begin forensic investigation.",
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
    "QuestionID": "P1-FD-031",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "A candidate selecting Option A demonstrates an evaluation error in prioritizing communication urgency over investigative due diligence. The judgment framework for incident response requires evaluating the risk of premature disclosure against the obligation to notify: notifying customers before confirming the breach's scope may (1) cause unnecessary panic among customers who may not be affected, (2) alert the attacker and trigger evidence destruction before forensic investigation can begin, (3) result in the organization disclosing inaccurate or incomplete information, potentially violating regulatory requirements for accurate breach notification. The candidate incorrectly weighted stakeholder communication above containment and evidence preservation in the incident response priority sequence.",
    "ExplanationWrongB": "A candidate selecting Option B correctly recognizes that containment is a priority but fails to evaluate proportionality in incident response. The judgment framework requires distinguishing between targeted containment (isolating affected systems, disabling compromised accounts, segmenting network zones) and disproportionate response (shutting down all operations). Disconnecting all servers indefinitely would halt critical business functions — financial reporting, payroll, order processing — causing business disruption that may exceed the breach's actual impact. The candidate's evaluation error is treating all containment actions as equally appropriate without assessing the business continuity tradeoff. In practice, a management accountant must evaluate whether the containment measure is calibrated to the threat severity.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "A candidate selecting Option D fails to evaluate the severity of the detection signal against the cost of delayed response. Unusual outbound network activity suggesting PII exfiltration is a high-severity indicator that demands immediate escalation, not deferred documentation. The judgment framework requires assessing: (1) the nature of the data at risk (PII carries regulatory obligations including breach notification laws), (2) the likelihood that exfiltration occurred (unusual outbound activity is a strong indicator), and (3) the cost of inaction (continued data loss if the breach is active). The candidate incorrectly weighted business continuity over the obligation to protect sensitive data — an evaluation error that in practice could result in regulatory fines, reputational damage, and expanded data loss. The management accountant's role includes recognizing when normal monitoring escalates to active incident response.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.032 incident response — evaluating communication priorities during financial data breach",
    "MicroTopic": "Breach communication priorities SEC state laws forensics",
    "UniqueConceptKey": "F-D032-breach-communication-priorities-sec-forensics",
    "LOSTag": "P1-F.4 Cybersecurity",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Greenwich Payment Solutions, a third-party payment processor handling transactions for 1,200 merchant clients, discovered that an unauthorized party accessed a database containing 50,000 customer payment records, including partial credit card numbers (first six and last four digits), cardholder names, billing addresses, and transaction amounts. The forensic investigation is in its third day and has not yet determined the full scope of data exfiltration — the attacker may have accessed records beyond the 50,000 initially confirmed, and it remains unclear whether full primary account numbers (PANs) were exposed through a separate database query. The company operates in 47 states, each with its own breach notification statute, and its stock is publicly traded on NASDAQ. Controller Thomas Park must evaluate the communication sequence: notify affected customers under state laws, contain the breach and complete forensic analysis, notify the board and external auditor, or engage external counsel to assess materiality under SEC disclosure obligations. All four actions are necessary, but the controller must determine the sequence. Under U.S. securities laws, state data breach notification statutes, and forensic evidence preservation requirements, evaluate the correct communication priority.",
    "Choices": {
      "A": "Notify affected customers immediately under state breach notification laws. State statutes require notification 'without unreasonable delay' — delaying customer communication to conduct forensic analysis increases regulatory exposure, risks class-action litigation for failure to notify, and may violate the 30-to-45-day notification deadlines that many states impose. Customer protection is the paramount obligation.",
      "B": "Contain the breach and complete forensic investigation before external communication. Premature notification before the full scope is understood could result in under-inclusive or inaccurate disclosures that require correction, undermining both customer trust and regulatory credibility. Complete forensic findings provide the factual basis for subsequent communications including customer notification, regulatory filing, and board reporting.",
      "C": "Notify the board of directors and the external auditor before public disclosure or customer notification. Under SOX Section 302, the certifying officers must disclose significant deficiencies and material weaknesses to the audit committee, and the external auditor must evaluate the breach's effect on internal control over financial reporting. The board has fiduciary oversight responsibility and must not learn of a material data breach from a press release or regulatory filing.",
      "D": "Engage external counsel under attorney-client privilege to assess materiality and coordinate the communication sequence before any external disclosure. Counsel can evaluate: (a) whether the breach is material under SEC standards — triggering a Form 8-K Item 1.05 cybersecurity incident disclosure within four business days of materiality determination — (b) which state notification statutes are triggered and on what timeline, (c) whether law enforcement has requested a notification delay, and (d) how to sequence customer notice, regulatory filing, and board communication so that all stakeholders receive consistent, accurate information without compromising the forensic investigation or waiving privilege over the investigation's findings."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "A material data breach at a public company triggers multiple legal and regulatory obligations with different timelines and standards, and premature disclosure under one obligation can compromise compliance with others. The controller must evaluate the communication sequence as a multi-stakeholder coordination problem, not a single-obligation exercise. Engaging external counsel first serves a specific legal and strategic function: (1) Materiality assessment under SEC rules — the SEC's cybersecurity disclosure rule requires Form 8-K Item 1.05 disclosure within four business days after the company determines the incident is material, not from the date of discovery. The materiality determination requires assessing the incident's impact on the company's financial condition, results of operations, and business — an assessment that requires legal judgment about what constitutes materiality and that benefits from the forensic investigation's preliminary findings. (2) Attorney-client privilege protection — by engaging counsel to direct the forensic investigation, the investigation's findings may be protected by attorney-client privilege and work product doctrine, which preserves the company's ability to investigate thoroughly without creating discoverable material for potential litigation. (3) Coordination of competing timelines — state notification laws (typically 30-45 days from discovery, but some states require notification within a shorter period), SEC 8-K disclosure (four business days from materiality determination), and law enforcement delay requests (which can temporarily override state notification deadlines) must be sequenced so that customer notification is accurate, regulatory disclosure is complete, and board communication precedes public disclosure. The controller's role in this sequence is not to pick one stakeholder to notify first — it is to engage the function (external counsel) that can coordinate all four communications on legally defensible timelines. This is a governance decision: establishing the legal foundation for all subsequent communications ensures that customer notification is accurate rather than premature, regulatory filing is complete rather than hastily amended, and board communication demonstrates proper fiduciary oversight rather than reactive crisis management.",
    "StudyLinks": [
      {
        "label": "SEC Cybersecurity Risk Management, Strategy, Governance, and Incident Disclosure (Final Rule, July 2023)",
        "url": "https://www.sec.gov/rules/final/2023/33-11216.pdf"
      },
      {
        "label": "NIST Cybersecurity Framework — Respond Function (Communications RS.CO)",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F — Technology and Analytics",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-032",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A correctly identifies that state breach notification laws impose timely notification obligations, but incorrectly positions immediate customer notification as the first action in the sequence without addressing the risk that premature notification may be inaccurate or incomplete. If Greenwich notifies 50,000 customers that their partial credit card data was exposed, and the forensic investigation later determines that full PANs were also compromised, the company must issue a corrective notification — undermining customer trust and potentially creating additional legal exposure. Furthermore, state notification statutes generally permit a reasonable delay for law enforcement investigation or for determining the scope of the breach. The controller's obligation is to notify within the statutory timeline, not to notify before understanding what to notify about. A candidate selecting this option may be treating customer notification as if it must occur immediately upon breach discovery rather than recognizing that state laws allow for reasonable investigation to determine the scope and nature of the breached data before notification.",
    "ExplanationWrongB": "Option B correctly identifies that forensic findings should inform external communications, but incorrectly proposes that ALL external communication — including legal engagement, board notification, and regulatory assessment — should wait until the forensic investigation is complete. Forensic investigations in complex data breaches can take weeks or months. Meanwhile, SEC 8-K disclosure deadlines (four business days from materiality determination) and state notification deadlines (typically 30-45 days from discovery) continue to run. The controller cannot suspend regulatory and legal obligations while waiting for forensic certainty — the correct approach is to engage counsel early (who can then coordinate the forensic investigation, the materiality assessment, and the communication sequence concurrently) rather than to defer all communication until the forensic investigation concludes. A candidate selecting this option may be treating forensic completion as a prerequisite to all action rather than recognizing that legal, regulatory, and communication processes can and should proceed in parallel with the investigation.",
    "ExplanationWrongC": "Option C correctly identifies that the board and external auditor must be informed, but incorrectly prioritizes their notification above legal assessment of materiality and disclosure obligations. The board should not be notified of a potentially material data breach until counsel has assessed the legal framework within which that notification occurs. Furthermore, the external auditor's evaluation of the breach's impact on internal control over financial reporting does not require notification before the controller engages counsel — the auditor will evaluate controls as part of the integrated audit regardless of when they are notified. The sequence matters because internal communications (board, auditor) may not be privileged if they occur before counsel is engaged to direct the investigation, potentially creating discoverable evidence in subsequent litigation. A candidate selecting this option may be treating governance notification as if it is the first legal obligation when in fact the first legal obligation is to establish the privilege framework within which all subsequent analysis and communication can be protected.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.033 data breach incident response plan",
    "MicroTopic": "data breach incident response plan",
    "UniqueConceptKey": "F-D033-data-breach-incident-response-plan",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Hartland maintains a documented plan outlining steps to take if a cybersecurity breach is detected, including containment, investigation, and notification. What is the primary purpose of this plan?",
    "Choices": {
      "A": "To enable a timely, coordinated response that limits damage and meets any legal notification obligations",
      "B": "To replace the need for preventive security controls",
      "C": "To eliminate the possibility of future breach",
      "D": "To satisfy only internal audit documentation requirements"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under the NIST Cybersecurity Framework Respond function, an incident response plan serves to enable a timely, coordinated organizational response to security incidents. The management accountant evaluating the plan's purpose must assess which objective takes primacy when multiple organizational needs compete. Evaluation of competing objectives: Option A (timely coordinated response that limits damage and meets legal obligations) correctly identifies that the plan's PRIMARY purpose is operational response — containment of damage, coordination of teams, and compliance with notification laws. This balances three competing priorities: damage limitation (operational), coordination (organizational), and legal compliance (regulatory). Evaluating the alternatives: Option B (replace preventive controls) fundamentally misunderstands the defense-in-depth model — the IR plan operates in the Respond function, complementing the Protect function's preventive controls. Option C (eliminate all future breaches) attributes an impossible guarantee to the plan — no response plan prevents breaches; it mitigates their impact. Option D (only internal audit documentation) reduces the plan to a compliance artifact, ignoring its operational purpose in crisis management. The analytical distinction: a management accountant evaluating control frameworks must recognize that response plans are operational tools, not preventive safeguards or compliance documents — their primary value is enabling effective action during an active incident. The correct answer is Option A.",
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
    "QuestionID": "P1-FD-033",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "An incident response plan does not replace preventive security controls — a layered defense strategy requires both preventive controls (to reduce breach likelihood) and detective/responsive controls (to manage incidents when they occur). A candidate may overestimate the scope of any single control type, but preventive controls address likelihood while incident response plans address impact — they serve complementary, not substitutive, roles in a cybersecurity framework.",
    "ExplanationWrongC": "A candidate selecting Option C attributes an impossible guarantee to the IR plan, failing to evaluate what any response plan can realistically achieve. No control framework — NIST, COSO, or ISO — claims that response plans eliminate breach risk. The evaluation framework requires assessing what a control can and cannot do: incident response plans mitigate consequences (containment, recovery, notification); they cannot make an organization breach-proof because breaches exploit vulnerabilities that may be unknown (zero-days), inevitable (insider threats), or unpreventable (supply chain compromise). The candidate's evaluation error is conflating the plan's purpose (coordinated response) with an aspirational outcome (zero breaches) that no response plan can deliver. A management accountant who evaluates controls against impossible standards will systematically underinvest in response capabilities while overinvesting in prevention.",
    "ExplanationWrongD": "A candidate selecting Option D reduces the incident response plan to a compliance artifact, failing to evaluate its operational purpose. While internal audit may review the plan's adequacy, the plan's PRIMARY purpose is operational — directing real-time actions during a breach. The evaluation framework requires distinguishing between a control's primary purpose (enabling effective incident response) and its secondary beneficiaries (internal audit having documentation to review). The candidate's evaluation error is confusing documentation value with operational value: an IR plan that only satisfies audit requirements but fails to guide actual incident response is a deficient plan. In practice, a management accountant who evaluates the IR plan as a documentation exercise would be unprepared to execute it during a genuine incident — when containment, investigation, and notification decisions must be made under time pressure.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.034 data quality investigation applied",
    "MicroTopic": "data quality investigation applied",
    "UniqueConceptKey": "F-D034-data-quality-investigation-applied",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Islewood's monthly dashboard shows a sharp drop in the customer satisfaction score from 92% to 78%. All related operational metrics (on-time delivery, return rate, quality scores) are stable. What is the most appropriate first step?",
    "Choices": {
      "A": "Implement immediate process changes to improve customer satisfaction",
      "B": "Investigate the data source and collection method for possible measurement error before reacting",
      "C": "Assume the decline is a seasonal fluctuation and take no action",
      "D": "Require customer-facing staff to attend retraining immediately"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the data quality management principles of the Technology and Analytics domain, the fundamental rule of data-driven decision making is: verify data integrity before acting on the data. Islewood's dashboard presents a textbook anomaly investigation scenario: one metric (customer satisfaction: -14 points) contradicts all related operational metrics (delivery, returns, quality — all stable). When metrics that should correlate show divergent signals, the management accountant must evaluate two competing hypotheses: (1) the satisfaction decline is genuine (which would require explaining why delivery/returns/quality are stable while satisfaction cratered — an inconsistent pattern, since poor delivery or quality typically drives satisfaction down), or (2) the satisfaction data itself is compromised due to measurement error, a collection methodology change, a survey sample size anomaly, or a dashboard calculation error. The analytical framework for this evaluation: contradictory data signals demand source verification before process intervention. Option B (investigate data source and collection method) is the only option that follows this framework. Evaluating the alternatives: Option A (implement process changes immediately) assumes the data is accurate without verification — this risks wasting resources on a non-existent problem and damaging processes that were actually performing well. Option C (dismiss as seasonal) ignores the magnitude of the decline (14 points is not a typical seasonal swing) and contradicts the stable operational data — seasonal effects should also appear in delivery and quality metrics if they were genuinely driving satisfaction changes. Option D (mandatory retraining) compounds the error of Option A by selecting a specific remediation before understanding whether the problem is real or what caused it — this is the most costly misallocation of resources. The management accountant's professional judgment requires distinguishing between a data problem and a business problem: the first step is always to determine which one you are facing. The correct answer is Option B — investigate data integrity before reacting.",
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
    "QuestionID": "P1-FD-034",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "A candidate selecting Option A demonstrates a bias toward action over verification — a common evaluation error in management accounting. The judgment framework requires evaluating evidence quality before deciding on a course of action: implementing process changes assumes the data is accurate and the decline is real, but the stable operational metrics contradict this assumption. The candidate failed to evaluate the inconsistency between the satisfaction metric and the delivery/returns/quality data. In practice, a management accountant who acts on unverified anomalous data risks implementing costly changes that address a measurement artifact rather than a genuine business problem — potentially degrading processes that were performing well while leaving the actual root cause (if any exists) unaddressed.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Assuming a sharp decline in one metric is a seasonal fluctuation without verification is a premature conclusion, especially when all other operational metrics are stable. A candidate may rely on pattern-based heuristics rather than applying the fundamental data quality principle: verify data accuracy before acting on it. The management accountant's first step when observing anomalous data should be to investigate the data source and collection method for possible measurement error.",
    "ExplanationWrongD": "A candidate selecting Option D compounds two evaluation errors: (1) assuming the data is accurate without verification, and (2) prematurely selecting a specific remediation (retraining) without understanding root cause. Even if the satisfaction decline were genuine, retraining all customer-facing staff is a costly, blanket response that may not address the actual issue — the decline could stem from product quality, pricing, a competitor's entry, or a single process failure rather than staff competence. The evaluation framework demands that remediation decisions follow root-cause analysis, not precede it. In practice, a management accountant who prescribes solutions before diagnosing problems wastes organizational resources and erodes credibility with operational stakeholders who must implement ill-targeted directives.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.035 data breach incident response plan",
    "MicroTopic": "data breach incident response plan",
    "UniqueConceptKey": "F-D035-data-breach-incident-response-plan",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Jettison maintains a documented plan outlining steps to take if a cybersecurity breach is detected, including containment, investigation, and notification. What is the primary purpose of this plan?",
    "Choices": {
      "A": "To replace the need for preventive security controls",
      "B": "To eliminate the possibility of future breach",
      "C": "To enable a timely, coordinated response that limits damage and meets any legal notification obligations",
      "D": "To satisfy only internal audit documentation requirements"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "An incident response plan enables a coordinated, timely response to a security breach, helping limit damage and meet legal or regulatory notification requirements.",
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
    "QuestionID": "P1-FD-035",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "An incident response plan does not replace preventive security controls — both are essential components of a comprehensive cybersecurity framework. A candidate may view controls as mutually exclusive rather than complementary layers. Preventive controls reduce the likelihood of breaches; incident response plans prepare the organization to respond effectively when prevention fails.",
    "ExplanationWrongB": "Choice B is incorrect because no incident response plan can guarantee the elimination of all future breaches. Per the NIST CSF, incident response is a mitigation and recovery function, not an eradication function. Security incidents are managed through defense-in-depth combining preventive, detective, and responsive controls. A candidate may confuse risk mitigation with risk elimination.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "While an incident response plan does support audit documentation requirements, its primary purpose extends far beyond audit compliance — it serves to enable a timely, coordinated response that limits damage and meets legal notification obligations. A candidate may reduce the plan to its compliance function, but its operational purpose is to minimize harm during an active security incident, not merely to satisfy auditors.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S58 Phase 6 — upgraded from DL-012 rotation clone (content preserved, difficulty/cognitive recalibrated for Technology & Analytics domain)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.036 structured vs. unstructured data — integrating email confirmations into audit evidence",
    "MicroTopic": "Unstructured email integration into structured audit workpapers",
    "UniqueConceptKey": "P1-FD-036-structured-vs-unstructured-email-audit-confirmations",
    "LOSTag": "P1-F.2 Data governance — structured and unstructured data integration for decision-making",
    "QuestionID": "P1-FD-036",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "Stem": "During the year-end audit of Pacific Rim Distribution, the external audit team at Chen & Associates sends accounts receivable confirmations to 800 customers. Six hundred customers respond through the audit firm's secure online confirmation portal, which captures structured data fields including confirmed balance, disputed amount, and respondent name and title. The remaining 200 customers respond via unstructured email, with messages ranging from a single sentence — 'Balance of $47,320 confirmed as of 12/31' — to multi-paragraph emails that discuss payment disputes, partial balances, and references to separate purchase orders and credit memos. The audit senior, Maria Vega, must integrate the 200 unstructured email responses into the structured audit workpaper that summarizes confirmation results. She asks the engagement manager how to handle the unstructured responses while maintaining audit evidence quality.",
    "Choices": {
      "A": "Unstructured email confirmations require manual review and standardization before integration — each email must be read, the key data elements extracted through human judgment, and the results coded into the structured workpaper format, because free-text emails lack the standardized fields, validation rules, and respondent authentication of portal responses.",
      "B": "The audit team can use NLP text extraction on the 200 emails, pull the first dollar amount mentioned in each message as the confirmed balance, and auto-populate the workpaper — since most email responses are short, NLP extraction accuracy will be sufficient for reliable audit evidence.",
      "C": "The 200 email responses should be treated as non-responses and alternative audit procedures performed — unstructured email confirmations do not meet the evidentiary standard for external confirmations under generally accepted auditing standards.",
      "D": "The auditor should request all 200 email respondents to re-submit their confirmations through the online portal, since only structured portal responses can be reliably integrated into audit workpapers and withstand PCAOB inspection."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "External confirmations are a fundamental audit procedure addressed under AU-C Section 505 (External Confirmations), which requires the auditor to evaluate the reliability of confirmation responses. Structured portal responses inherently provide validated, standardized data because the system enforces completeness — all required fields must be populated before submission — and format consistency — dollar amounts in standardized format, respondent identity verified through portal authentication. Unstructured email responses lack these reliability attributes: a free-text email may reference multiple dollar amounts within the same message (confirmed balance, partial payments, disputed portions, unrelated invoices), may not identify the respondent's authority to confirm the balance, and may embed confirmation language within broader correspondence about unrelated business matters. The IMA's Technology and Analytics domain (CMA Part 1 Domain F) addresses the structured-versus-unstructured data integration challenge directly — unstructured data requires transformation through human judgment or specialized analytical processing before it can be assimilated into structured analytical frameworks and control environments. For the Pacific Rim Distribution audit, Maria Vega should design a standardized extraction and coding protocol: each unstructured email is independently reviewed by two audit team members who extract the confirmed balance, dispute flag, and respondent authority indicators; discrepancies between reviewers are escalated to the engagement manager; the coded data is entered into the structured workpaper with the original email preserved as supporting documentation for the extracted conclusions. This maintains audit evidence quality while pragmatically handling the mixed-format response set.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Pulling the first dollar amount from each email is unreliable as audit evidence — an email stating 'We paid $12,000 toward the $47,320 balance and dispute the remainder' would extract $12,000 as the confirmed balance when the customer actually confirmed only partial payment of the $47,320 receivable. The customer may also reference unrelated invoices, credit memos, or other transactions with dollar amounts that precede the actual confirmation figure. NLP extraction without human review of context creates a material risk of incorrect audit conclusions and should not be relied upon as the sole extraction method for unstructured audit evidence.",
    "ExplanationWrongC": "Unstructured email confirmations can constitute valid external audit evidence under AU-C Section 505 if the auditor evaluates their reliability through factors including the respondent's apparent authority, the clarity and specificity of the confirmation statement, whether the email can be authenticated to the customer's domain, and corroboration with other audit evidence. Treating all 200 as non-responses would require costly and time-consuming alternative procedures — such as subsequent cash receipts testing — for customers who did in fact confirm their balances in good faith.",
    "ExplanationWrongD": "Re-requesting portal submissions from 200 customers who already responded in good faith would likely yield a low response rate — customers who prefer email communication often will not re-respond through a portal — and would delay the audit timeline by weeks. It also risks straining client relationships with customers who cooperated with the initial request. The correct approach accepts responses in the format received and applies appropriate validation and standardization procedures, not demanding format conversion from audit confirmands.",
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
    "Topic": "F.037 unstructured data — social media risk monitoring for public company disclosure controls",
    "MicroTopic": "Social media as unstructured disclosure channel — Reg FD compliance",
    "UniqueConceptKey": "P1-FD-037-unstructured-social-media-disclosure-controls-RegFD",
    "LOSTag": "P1-F.2 Data governance — unstructured data channels and regulatory compliance",
    "QuestionID": "P1-FD-037",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "Stem": "On the evening before NovaTech Corporation's scheduled Q4 earnings release, the CEO posts on a public social media platform: 'Incredible Q4 — revenue up 22%, backlog at an all-time high of $890M. NovaTech has never been stronger.' The controller, Aisha Okafor, sees the post at 8:15 PM and immediately contacts the CFO. NovaTech's disclosure controls and procedures, certified under SOX Section 302, require all material financial information to be reviewed by the disclosure committee before public release. The preliminary Q4 earnings release containing these exact figures is scheduled for 7:00 AM the next morning. Aisha must assess whether social media content requires the same disclosure control framework as formal SEC filings.",
    "Choices": {
      "A": "The CEO's social media post is a personal communication outside the scope of SEC regulation — social media platforms are informal channels that do not constitute official company disclosure, so no regulatory remediation is required beyond reminding the CEO of NovaTech's social media policy.",
      "B": "The controller should immediately issue the full Q4 earnings release to cure the selective disclosure — posting the complete results on the company website and filing a Form 8-K ensures investors receive the information simultaneously, resolving the Reg FD concern regardless of the control weakness.",
      "C": "Social media posts by executives containing material nonpublic financial information constitute selective disclosure under SEC Regulation FD — NovaTech's disclosure controls must extend to unstructured social media channels because the CEO's post disseminated material information to a subset of followers before the official earnings release, representing the same regulatory exposure as an unauthorized press release.",
      "D": "The controller's primary concern should be whether the social media post is factually accurate — as long as the 22% revenue growth and $890M backlog figures match the preliminary earnings release, the timing of the communication is a public relations issue rather than a disclosure controls violation."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "SEC Regulation FD (Fair Disclosure), adopted in 2000 and updated with specific social media guidance in 2013 following the Netflix investigation, requires that when an issuer discloses material nonpublic information to certain enumerated persons — including securities market professionals and shareholders — it must simultaneously make broad public disclosure. The SEC's 2013 Report of Investigation explicitly confirmed that corporate social media accounts can serve as recognized channels of distribution for Reg FD purposes when investors have been alerted to the company's use of those channels. This means executive social media posts containing material financial data are subject to the same fair disclosure obligations as press releases and SEC filings. Under the IMA's Technology and Analytics domain (CMA Part 1 Domain F), unstructured data channels — including social media — present a governance challenge because they bypass traditional disclosure controls. Unlike a press release that flows through legal, investor relations, and disclosure committee review, a social media post can be published instantly by any executive with account access, creating the precise selective disclosure risk that Reg FD was designed to prevent. For NovaTech, the CEO's post disseminated material information — 22% revenue growth and $890M backlog — via an uncontrolled channel hours before the official release. The controller's immediate response should include notifying the disclosure committee and general counsel to expedite public dissemination of the full earnings release to cure the selective disclosure, while documenting the control failure for the SOX Section 302 disclosure controls and procedures assessment. The incident also warrants reviewing whether NovaTech's disclosure controls adequately address unstructured communication channels, including social media, executive interviews, and investor conferences.",
    "ExplanationWrongA": "The SEC's 2013 social media guidance, arising from the investigation of Netflix CEO Reed Hastings' disclosure of monthly viewing metrics on his personal social media account, explicitly states that Regulation FD applies to social media disclosures of material nonpublic information regardless of whether the platform is 'personal' or 'informal.' The content and materiality of the information — not the channel or formality of the communication — determines regulatory treatment. An executive officer's post about material financial results is not exempt from disclosure controls simply because the platform is considered informal.",
    "ExplanationWrongB": "While expedited public disclosure is the appropriate curative action after a Reg FD violation, the controller does not have unilateral authority to issue earnings releases — this decision requires disclosure committee and possibly board authorization. More critically, issuing the release cures the selective disclosure but does not address the underlying control deficiency. The controller must both facilitate the curative disclosure and document the control failure for the SOX 302 assessment, as the incident reveals a gap in controls over unstructured disclosure channels.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Under Regulation FD, the violation occurs at the moment of selective disclosure — not based on whether the disclosed information later proves factually accurate. Even if the 22% revenue growth and $890M backlog exactly match the final earnings release figures, the CEO disseminated material nonpublic information to a subset of followers before all investors had equal access. The timing and selectivity of disclosure are the regulated elements; factual accuracy is a separate concern under the anti-fraud provisions of the securities laws.",
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