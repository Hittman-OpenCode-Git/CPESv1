var MCQ_BANK_A_PART_61 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.060 third-party vendor cyber risk",
    "MicroTopic": "third-party vendor cyber risk",
    "UniqueConceptKey": "F-060-third-party-vendor-cyber-risk",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Frontier Financial Services' CISO, David Okonkwo, must select a vendor cyber risk assessment methodology for 45 third-party vendors with access to Frontier's customer financial data. Three approaches are under evaluation: (1) Questionnaire-based — vendors complete a standardized SIG (Standardized Information Gathering) questionnaire, Frontier reviews responses, 85% coverage of NIST CSF controls, $450 per vendor, 3-week turnaround, 40% estimated false-negative rate (vendors understate risks); (2) On-site audit — Frontier's internal audit team visits vendor facilities, tests controls directly, 98% coverage of NIST CSF controls, $8,500 per vendor, 12-week turnaround, 5% false-negative rate, but can only complete 8 audits per year; (3) Continuous monitoring — automated external scanning of vendor attack surfaces plus real-time threat intelligence feeds, 70% coverage of NIST CSF controls, $1,200 per vendor annually, immediate activation, 15% false-negative rate, no on-premises visibility. The board requires all 45 vendors assessed within 12 months. Which recommendation should the CISO present?",
    "Choices": {
      "A": "Continuous monitoring for all 45 vendors — it provides immediate coverage at $54K annually, satisfies the 12-month timeline, and the 15% false-negative rate is acceptable for automated external monitoring",
      "B": "Questionnaire-based for all 45 vendors — at $20,250 total it is the most cost-effective and completes within 3 weeks, well within the 12-month board requirement",
      "C": "On-site audit only — targeting the 8 highest-risk vendors annually over 5-6 years, providing the highest assurance (98% coverage, 5% false-negative) where it matters most",
      "D": "A tiered approach: questionnaire-based for 45 vendors ($20,250, baseline coverage), continuous monitoring for the 20 vendors with the highest data access ($24,000, enhanced detection), and on-site audit for the 8 most critical vendors ($68,000) — total $112,250, within 12 months"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Continuous monitoring for all 45 vendors is the correct recommendation. The board's binding constraint is all 45 vendors assessed within 12 months. Continuous monitoring satisfies this at $54,000 annually with immediate activation. On-site audit (Choice C) provides the highest assurance but can only assess 8 vendors per year — this leaves 37 vendors unassessed beyond the 12-month deadline. Questionnaire-based (Choice B) is cheapest ($20,250) and fastest (3 weeks) but has a 40% false-negative rate — meaning nearly half of vendor risks would be unreported, creating a false sense of security. The tiered approach (Choice D) is conceptually appealing but at $112,250 it applies three different methodologies to overlapping vendor populations, creating inconsistent risk ratings that complicate board reporting. The 15% false-negative rate for continuous monitoring is acceptable when weighed against the alternative of leaving 37 vendors unassessed (on-site only) or under-assessed (questionnaire only). Continuous monitoring provides a uniform methodology, satisfies the timeline, and at $54,000 is within the range of reasonable cybersecurity budget allocation.",
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
    "QuestionID": "P1-F-060",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Questionnaire-based assessment at $20,250 is indeed the cheapest and fastest option. However, the 40% false-negative rate is the fatal flaw: it means 4 out of every 10 vendors with actual cyber risks will report no issues. For a financial services firm with 45 vendors holding customer financial data, a 40% undetected risk rate is not defensible to regulators or the board. Questionnaires rely on vendor self-reporting with no independent verification. Cost efficiency does not compensate for a methodology that provides unreliable risk intelligence. The board needs actual risk visibility, not inexpensive but unreliable self-assessments.",
    "ExplanationWrongC": "On-site audit provides the gold standard of assurance (98% coverage, 5% false-negative rate). However, at 8 per year, it would take 5-6 years to assess all 45 vendors. The board's explicit requirement is 12 months — this approach misses the deadline by 4-5 years. Additionally, while the 8 most critical vendors receive excellent coverage, the remaining 37 vendors receive zero assessment during the 12-month window. Concentrating high assurance on a small subset while leaving the majority unassessed does not satisfy the board's mandate: all 45 vendors assessed within 12 months.",
    "ExplanationWrongD": "The tiered approach appears to combine the best of all three methodologies. However, it creates three methodological challenges: (1) vendors assessed by different methods receive incomparable risk ratings — a 'Medium' risk from questionnaire cannot be compared to a 'Medium' risk from on-site audit; (2) the 8 on-site audited vendors are also in the continuous monitoring and questionnaire pools, meaning resources are tripled on the highest-risk vendors while lower-risk vendors receive single-method assessments — the exact inverse of what risk-based allocation should produce; (3) the board receives three different risk reporting streams with different confidence levels and coverage scopes, complicating governance oversight. A single uniform methodology applied to all vendors provides consistent, comparable risk intelligence that the board can act on.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.061 SOC report use",
    "MicroTopic": "SOC report use",
    "UniqueConceptKey": "F-061-soc-report-use",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Granite is evaluating SOC report use in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "SOC reports can provide assurance about a service organization s controls relevant to user entities",
      "B": "It should be documented only after an audit exception occurs",
      "C": "It eliminates the need for controls because technology is automated",
      "D": "It is primarily a Part 2 capital budgeting calculation"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "SOC reports provide information about controls at a service organization that may affect a user entity. They help management and auditors evaluate outsourced system risks, but they do not replace the user entity s own control responsibilities.",
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
    "QuestionID": "P1-F-061",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "SOC reporting is planned assurance evidence; it is not something documented only after an audit exception.",
    "ExplanationWrongC": "Use of a service organization or automated system does not eliminate controls; it shifts some control evaluation to vendor oversight.",
    "ExplanationWrongD": "Capital budgeting is unrelated to assurance over outsourced service-organization controls.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.062 mobile device management",
    "MicroTopic": "mobile device management",
    "UniqueConceptKey": "F-062-mobile-device-management",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor is evaluating mobile device management in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It is primarily a Part 2 capital budgeting calculation",
      "B": "Mobile device management can enforce encryption, remote wipe, and access policies",
      "C": "It should be documented only after an audit exception occurs",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Mobile device management can enforce security settings such as encryption, remote wipe, device configuration, and access policies. These controls reduce the risk that lost or unmanaged devices expose finance systems or data.",
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
    "QuestionID": "P1-F-062",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Capital budgeting is unrelated to endpoint controls over mobile devices.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Mobile-device policies should be configured before access is granted, not documented only after an audit exception.",
    "ExplanationWrongD": "Automation does not eliminate endpoint risk; mobile access still needs configuration, monitoring, and access controls.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.063 segregation of duties in ERP",
    "MicroTopic": "segregation of duties in ERP",
    "UniqueConceptKey": "F-063-segregation-of-duties-in-erp",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F1",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Iris is evaluating segregation of duties in ERP in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "It eliminates the need for controls because technology is automated",
      "C": "ERP role design should prevent incompatible duties such as vendor setup and payment approval",
      "D": "It is primarily a Part 2 capital budgeting calculation"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "ERP segregation of duties uses role design to prevent incompatible access, such as allowing the same user to set up vendors and approve payments. Proper role design reduces fraud and error risk in integrated finance processes.",
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
    "QuestionID": "P1-F-063",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "ERP role conflicts should be prevented and reviewed before reliance on the system, not documented only after an audit exception.",
    "ExplanationWrongB": "Automation does not eliminate segregation-of-duties risk; integrated ERP systems still need restricted roles and conflict monitoring.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Capital budgeting is unrelated to ERP access design and segregation of duties.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.064 role-based access control",
    "MicroTopic": "role-based access control",
    "UniqueConceptKey": "F-064-role-based-access-control",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniper is evaluating role-based access control in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It eliminates the need for controls because technology is automated",
      "B": "It is primarily a Part 2 capital budgeting calculation",
      "C": "It should be documented only after an audit exception occurs",
      "D": "Role-based access assigns permissions based on job roles rather than ad hoc individual grants"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Role-based access control assigns permissions based on defined job roles rather than ad hoc individual grants. This supports least privilege, easier review, and more consistent access control in finance systems.",
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
    "QuestionID": "P1-F-064",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Automation does not eliminate logical access risk; automated systems still require controlled role design and review.",
    "ExplanationWrongB": "Capital budgeting is unrelated to role-based permissions and access administration.",
    "ExplanationWrongC": "Access roles should be approved and maintained before system use, not documented only after an audit exception.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.065 password policy weakness",
    "MicroTopic": "password policy weakness",
    "UniqueConceptKey": "F-065-password-policy-weakness",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Keystone Industries' IT auditor is analyzing authentication failure patterns from the identity management system to identify high-risk accounts requiring immediate remediation. The data shows three clusters: (Cluster-1) 87 failed login attempts from IP addresses in 6 countries over 72 hours targeting 3 C-suite accounts (CEO, CFO, COO) — all attempts between 11 PM and 4 AM local time, 12 attempts used passwords that were within 2 characters of the actual password; (Cluster-2) 214 failed login attempts from a single internal IP address targeting 18 accounts in the AP department — attempts during business hours, 98% were 'caps lock on' errors immediately followed by successful login; (Cluster-3) 46 failed login attempts from a known compromised VPN endpoint targeting 2 system administrator accounts — attempts used valid usernames and previously breached passwords found on the dark web, spread across 3 weeks, all attempts after 8 PM. Which cluster represents the highest-priority risk requiring immediate remediation?",
    "Choices": {
      "A": "Cluster-2 (AP department) — with 214 attempts across 18 accounts during business hours, this represents the highest volume of authentication failures and could indicate a coordinated insider threat",
      "B": "Cluster-3 (system administrators) — the combination of a known compromised endpoint, valid credentials from dark-web breaches, privileged accounts with full system access, and a slow-spread attack pattern over 3 weeks indicates a likely credential-stuffing attack targeting privileged access",
      "C": "Cluster-1 (C-suite) — targeting executive accounts with near-correct passwords from multiple foreign IPs at unusual hours suggests a sophisticated spear-phishing or credential-harvesting campaign against the organization's highest-value targets",
      "D": "All three clusters are equally concerning and should be addressed simultaneously with a mandatory organization-wide password reset"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Cluster-3 (system administrators) is the highest-priority risk. The risk assessment must consider three factors: (1) account privilege level — system administrator accounts have unrestricted access to all systems and data, making compromise catastrophic; (2) credential quality — the attacker is using valid usernames paired with known breached passwords from dark-web databases, meaning these are not guesses but confirmed working credentials from other breaches where users reused passwords; (3) attack sophistication — the slow spread over 3 weeks and after-hours timing indicates a deliberate attempt to avoid detection. Cluster-1 (C-suite) is concerning but C-suite accounts, while high-profile, typically have fewer system privileges than administrator accounts. The near-correct passwords suggest the attacker has some intelligence but not valid credentials yet. Cluster-2 (AP department) is a non-malicious pattern — 'caps lock' errors followed by successful login is consistent with normal user behavior, not an attack. The system administrator cluster requires immediate password reset, forced multi-factor authentication enrollment, and dark-web credential monitoring — before the attacker succeeds.",
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
    "QuestionID": "P1-F-065",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Cluster-2 has the highest volume (214 attempts), but volume without risk context is misleading. The pattern of 'caps lock on' errors immediately followed by successful login is overwhelmingly consistent with normal user behavior — employees typing passwords with caps lock accidentally enabled, then correcting and logging in successfully. There is no evidence of credential harvesting, brute force, or credential stuffing. Labeling this as a 'coordinated insider threat' ignores the benign error pattern. An auditor who flags caps-lock errors as the highest-priority risk would misdirect the security team's resources away from genuine threats (Clusters 1 and 3).",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Cluster-1 is a legitimate and serious threat: targeting executive accounts, near-correct passwords (suggesting prior reconnaissance), multi-country IP distribution, and after-hours timing all indicate a targeted attack. C-suite accounts also have elevated privileges (financial system approvals, wire transfer authority, access to board materials). However, the critical distinction is that Cluster-1 attackers are still GUESSING — 12 attempts with near-correct passwords means they have not yet succeeded. Cluster-3 attackers have WORKING CREDENTIALS from dark-web breaches — they are not guessing, they are testing confirmed passwords. The system administrator cluster is one successful login away from complete system compromise. Between a sophisticated guessing attack (Cluster-1) and a confirmed credential attack on privileged accounts (Cluster-3), the confirmed credential attack on privileged accounts is the higher immediate priority.",
    "ExplanationWrongD": "Simultaneous response to all three clusters is resource-inefficient and fails to apply risk-based prioritization — a core principle of both IT audit and COSO Principle 8 (risk assessment). Cluster-2 is a benign user behavior pattern requiring no remediation. Cluster-1 requires investigation but has no confirmed compromise. Cluster-3 is a confirmed active attack on privileged accounts with valid credentials. An organization-wide password reset would: (1) impact all users for the sake of one cluster, (2) not address the root cause (password reuse across systems) — users would likely reset to the same password, and (3) fail to implement multi-factor authentication, which is the appropriate compensating control for credential-stuffing attacks. Risk-based prioritization means addressing Cluster-3 immediately, investigating Cluster-1, and deprioritizing Cluster-2.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.066 patch management",
    "MicroTopic": "patch management",
    "UniqueConceptKey": "F-066-patch-management",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Lumen is evaluating patch management in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "It is primarily a Part 2 capital budgeting calculation",
      "C": "Patch management reduces known vulnerability exposure through timely testing and deployment",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Patch management identifies, tests, approves, and deploys updates to reduce exposure to known vulnerabilities. The CMA control issue is balancing timely remediation with testing so patches do not disrupt critical finance systems.",
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
    "QuestionID": "P1-F-066",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Patch management should be part of an ongoing control process, not documented only after an audit exception.",
    "ExplanationWrongB": "Capital budgeting is not the issue; patch management addresses cybersecurity and system-control risk.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Automation does not eliminate patch risk; automated systems still require timely updates and change control.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.067 vulnerability scanning",
    "MicroTopic": "vulnerability scanning",
    "UniqueConceptKey": "F-067-vulnerability-scanning",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian is evaluating vulnerability scanning in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "It is primarily a Part 2 capital budgeting calculation",
      "C": "Vulnerability scans identify weaknesses that require prioritization and remediation",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Vulnerability scanning identifies known weaknesses in systems or configurations so management can prioritize remediation based on risk. A scan is a detection tool; it does not itself fix issues or replace control follow-up.",
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
    "QuestionID": "P1-F-067",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Scanning should be performed as part of ongoing security monitoring, not documented only after an audit exception.",
    "ExplanationWrongB": "Capital budgeting is unrelated to identifying technical vulnerabilities in systems.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Automation does not eliminate controls; scan results require review, prioritization, and remediation tracking.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  }
];