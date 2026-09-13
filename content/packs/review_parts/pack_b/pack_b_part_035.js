const MCQ_BANK_B_PART_35 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.093 cybersecurity",
    "MicroTopic": "CIA triad",
    "UniqueConceptKey": "B-F-093-CIA-triad",
    "LOSTag": "Cybersecurity — Confidentiality, Integrity, Availability",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Summit Technologies experienced a ransomware attack that encrypted critical financial data, making it inaccessible for several days. Which element of the CIA triad was most directly affected?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Availability ensures that data and systems are accessible to authorized users when needed. A ransomware attack encrypts data and prevents legitimate users from accessing it, directly impacting availability. While integrity and confidentiality could also be affected, the primary impact described is loss of access.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-093",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Availability",
      "B": "Confidentiality",
      "C": "Authenticity",
      "D": "Integrity"
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
    "ExplanationWrongB": "Authenticity concerns whether data is genuine. The primary impact is loss of access.",
    "ExplanationWrongC": "Authenticity verifies that data is genuine and unaltered. Ransomware primarily impacts availability by encrypting files and preventing access, not authenticity.",
    "ExplanationWrongD": "Integrity concerns data accuracy. While affected, the primary described impact is loss of access.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.094 cybersecurity",
    "MicroTopic": "cybersecurity controls",
    "UniqueConceptKey": "B-F-094-cybersecurity-controls",
    "LOSTag": "Cybersecurity — Confidentiality, Integrity, Availability",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Citadel Financial is implementing a defense-in-depth cybersecurity strategy. Which approach best describes this concept?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Defense in depth is a cybersecurity strategy that uses multiple layers of security controls throughout the IT environment. If one layer fails or is bypassed, subsequent layers provide continued protection. This approach recognizes that no single control is sufficient against all threats.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-094",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Implementing multiple layers of security controls so that if one layer fails, others provide protection",
      "B": "Relying solely on a strong firewall for security needs",
      "C": "Using only antivirus software to protect systems",
      "D": "Outsourcing security functions to a managed service provider"
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
    "ExplanationWrongB": "Relying solely on a firewall contradicts defense in depth's multi-layer approach.",
    "ExplanationWrongC": "Using only antivirus provides a single layer, not the multi-layer defense in depth concept.",
    "ExplanationWrongD": "Outsourcing security alone does not create defense in depth; multiple layers are still needed.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.095 information systems lifecycle",
    "MicroTopic": "SDLC phases",
    "UniqueConceptKey": "B-F-095-SDLC-phases",
    "LOSTag": "Information Systems Lifecycle",
    "primaryTheory": "F1",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Phoenix Corp is building a new financial consolidation system to replace a 15-year-old legacy Hyperion instance. The system must satisfy FDA Part 11 electronic records validation requirements because Phoenix manufactures medical devices and the consolidation system will store cost accounting data used in regulatory submissions. The VP of Engineering, Priya Nair, has gathered the following project characteristics: the requirements are well-documented (427 functional specifications written over 8 months by a dedicated business analysis team, approved by Finance, IT, and Quality Assurance); the project team of 18 developers and 4 QA engineers is co-located in Phoenix's Denver office; the FDA validation process requires formal documentation at each phase gate (requirements traceability matrix, design specification, test protocols, validation summary report) with no parallel-phase flexibility; the CFO needs the system operational within 14 months to align with the fiscal year; the existing Hyperion system's support contract expires in 16 months with no renewal option. Priya must recommend an SDLC methodology. The three options are: (Methodology 1) Waterfall — sequential phases (Requirements → Design → Implementation → Verification → Validation → Maintenance), each phase must be complete and formally signed off before the next begins; best fit for fixed requirements and regulated environments; risk: late discovery of integration issues during the Verification phase; (Methodology 2) Agile (Scrum) — iterative 3-week sprints delivering working software increments; requirements evolve through sprint retrospectives and stakeholder feedback; risk: FDA validation auditors may not accept evolving requirements as compliant with Part 11's documentation requirements for a 'validated system'; (Methodology 3) Hybrid (Waterfall with Agile Development Sprints) — formal Requirements and Design phases (Waterfall, satisfying FDA documentation), followed by iterative Development and Testing sprints (Agile, 3-week cycles within the approved design envelope), concluding with formal Verification and Validation phases (Waterfall). Which methodology should the VP recommend?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Methodology 3 (Hybrid) is the correct recommendation. It resolves the central tension in this project: the FDA Part 11 validation requirement demands fixed, documented requirements with formal phase-gate signoffs (Waterfall strengths), while the 14-month timeline with a hard 16-month legacy-system deadline demands the risk mitigation of early and frequent integration testing (Agile strength). The Hybrid approach sequences these appropriately: the Requirements and Design phases proceed in Waterfall (producing the traceability matrix and design specification that FDA auditors require as validation evidence), the Development and Testing phases proceed iteratively within the approved design envelope (catching integration issues early, when they cost less to fix), and the final Verification and Validation phases return to Waterfall (producing the formal test protocols and validation summary report). This is the SDLC governance principle tested: methodology selection is not ideological — it is a risk-management decision driven by regulatory constraints, timeline pressures, and integration complexity.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-095",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Methodology 3 (Hybrid) — it satisfies the FDA's documentation requirements through formal Requirements and Design phases while allowing iterative development within the approved design envelope, mitigating the integration-risk disadvantage of pure Waterfall without violating Part 11's validated-system requirements",
      "B": "Methodology 1 (Waterfall) — it is the proven methodology for FDA-regulated environments where requirements are stable and phase-gate documentation is mandatory; the 427 approved functional specifications indicate requirement stability, making Waterfall the lowest-risk choice",
      "C": "Methodology 2 (Agile) — iterative sprints will deliver working software faster, stakeholder feedback through sprint reviews will produce a higher-quality system, and many FDA-regulated organizations now use Agile with appropriate documentation overlays",
      "D": "The methodology decision should be deferred until the development team surveys which methodology the 18 developers have the most experience with, then select based on team capability"
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
    "ExplanationWrongB": "Pure Waterfall is indeed the traditional choice for FDA-regulated environments, and the 427 approved specifications suggest requirement stability. However, the 14-month timeline with a hard 16-month legacy-system deadline is the critical constraint. In a pure Waterfall project, integration testing does not occur until the Verification phase (month 10-12 in a 14-month project). Integration issues discovered at month 12 in a system that must replace a legacy system with a non-renewable contract by month 16 create a very narrow remediation window. The Hybrid methodology preserves Waterfall's documentation strengths while adding Agile's early-integration risk mitigation. The CMA candidate must analyze that in regulated SDLC decisions, compliance necessity and project risk mitigation must both be served.",
    "ExplanationWrongC": "Agile for FDA-regulated environments is possible and increasingly practiced, but it requires a mature Agile documentation overlay that Phoenix Corp has not indicated it possesses. Agile's core premise — requirements evolve through iterative feedback — conflicts directly with FDA Part 11's expectation that a validated system's requirements are established, documented, and approved before validation testing begins. An FDA auditor reviewing a system validation package will expect to see the approved requirements specification against which the system was validated. If those requirements changed during development through sprint retrospectives, the auditor will question whether the validation was conducted against the FINAL requirements. The Hybrid approach captures Agile's development benefits without triggering this regulatory concern.",
    "ExplanationWrongD": "Team experience is a valid consideration in methodology selection — a team unfamiliar with a methodology will struggle regardless of the methodology's theoretical fit. However, this is an implementation consideration, not a selection criterion. The methodology should be chosen based on project characteristics (regulatory environment, requirement stability, timeline pressure, integration risk), and then the team should be trained on or staffed for that methodology. Deferring the methodology decision to a team capability survey inverts the decision hierarchy: the project's regulatory and risk profile should determine the methodology, and the team should adapt to the methodology, not the reverse.",
    "CognitiveLevel": "Analyze",
    "DifficultyScore": 3,
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.096 ERP systems",
    "MicroTopic": "ERP overview",
    "UniqueConceptKey": "B-F-096-ERP-overview",
    "LOSTag": "ERP Systems",
    "primaryTheory": "F1",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Nexus Manufacturing is implementing an ERP system to replace its disconnected legacy applications for accounting, inventory, purchasing, and HR. A key benefit of an integrated ERP system is:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "ERP systems integrate business processes across an organization by using a shared database and common data definitions. This allows data entered in one module (e.g., a sales order) to flow automatically to related modules (e.g., inventory, accounting, shipping), improving data consistency and efficiency.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-096",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Each department maintains its own separate database for maximum flexibility",
      "B": "Data is entered once and flows seamlessly across modules, improving consistency and reducing redundant data entry",
      "C": "The ERP system eliminates the need for internal controls",
      "D": "ERP systems are less expensive than maintaining separate legacy systems"
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
    "ExplanationWrongA": "Maintaining separate databases is a limitation of legacy systems, not a feature of ERP.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "ERP systems do not eliminate the need for internal controls.",
    "ExplanationWrongD": "ERP systems are typically more expensive initially than maintaining legacy systems.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.097 ERP systems",
    "MicroTopic": "ERP risks",
    "UniqueConceptKey": "B-F-097-ERP-risks",
    "LOSTag": "ERP Systems",
    "primaryTheory": "F1",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Titan Industries is implementing a new ERP system. The implementation project is behind schedule and over budget. Which of the following is a common risk in ERP implementations that management should address?",
    "CorrectChoice": "C",
    "ExplanationCorrect": "ERP implementations pose several risks: significant business process changes, high implementation costs, lengthy timelines, data migration challenges, and user resistance. Inadequate training and organizational change management are recognized contributors to ERP project failures or underperformance.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-097",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "ERP implementations have no impact on business processes",
      "B": "ERP systems automatically configure themselves without customization",
      "C": "Inadequate user training and resistance to change can undermine the benefits of the new system",
      "D": "Segregation of duties controls are automatically configured and do not require adjustment"
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
    "ExplanationWrongA": "ERP implementations significantly impact business processes; they do not leave processes unchanged.",
    "ExplanationWrongB": "ERP systems require significant configuration and customization; they do not configure themselves automatically.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Segregation of duties must be carefully configured and maintained in ERP systems; it is not automatic.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.098 database management",
    "MicroTopic": "relational databases",
    "UniqueConceptKey": "B-F-098-relational-databases",
    "LOSTag": "Database Management",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Apex Corp uses a relational database for its accounting system. The database contains tables for customers, invoices, and payments. The relationship between customers and invoices is defined by a common field such as CustomerID. This structure allows:",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Relational databases organize data into related tables linked by common keys (e.g., CustomerID). This minimizes data redundancy and allows users to run queries that join data across tables. Structured Query Language (SQL) is used to define and manipulate data in relational databases.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-098",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Users to query and join related data across tables without duplicating data",
      "B": "Data to be stored redundantly in table for faster access",
      "C": "Data to be stored in unstructured documents",
      "D": "Only the database administrator to access data"
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
    "ExplanationWrongB": "Relational databases minimize data redundancy through normalization rather than storing data redundantly in every table.",
    "ExplanationWrongC": "Relational databases store structured data in tables, not unstructured documents.",
    "ExplanationWrongD": "Relational databases support multiple users with varying access levels.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.099 privacy regulations",
    "MicroTopic": "GDPR basics",
    "UniqueConceptKey": "B-F-099-GDPR-basics",
    "LOSTag": "Privacy Regulations (GDPR, CCPA)",
    "primaryTheory": "F6",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Global has customers in the European Union and must comply with the General Data Protection Regulation (GDPR). Under GDPR, which of the following is a right granted to data subjects?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "GDPR grants data subjects several rights including: the right to be informed, right of access, right to rectification, right to erasure (right to be forgotten), right to restrict processing, right to data portability, and right to object. These rights give individuals significant control over their personal data.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-099",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "The right to access their personal data and request its deletion under certain circumstances (right to be forgotten)",
      "B": "The right to prevent the company from using data analytics tools",
      "C": "The right to demand compensation for use of their data",
      "D": "The right to require the company to share their data with other customers"
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
    "ExplanationWrongB": "GDPR does not prevent companies from using data analytics; it regulates how personal data is processed.",
    "ExplanationWrongC": "GDPR does not grant compensation for any data use; it provides rights regarding processing.",
    "ExplanationWrongD": "GDPR provides data portability to the data subject, not sharing with all other customers.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.100 privacy regulations",
    "MicroTopic": "CCPA basics",
    "UniqueConceptKey": "B-F-100-CCPA-basics",
    "LOSTag": "Privacy Regulations (GDPR, CCPA)",
    "primaryTheory": "F6",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Vanguard Corp collects personal information from California residents for its marketing activities. Under the California Consumer Privacy Act (CCPA), consumers have the right to:",
    "CorrectChoice": "C",
    "ExplanationCorrect": "CCPA grants California consumers the right to know what personal information is collected, the right to delete personal information, the right to opt out of the sale of personal information, and the right to non-discrimination for exercising these rights. These requirements have significant implications for data management and accounting systems.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-100",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Request deletion of their personal information held by the business",
      "B": "Opt out of the sale of their personal information to third parties",
      "C": "All of the above",
      "D": "Request that a business disclose the categories and specific pieces of personal information collected about them"
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
    "ExplanationWrongA": "The right to delete is one right, but CCPA also grants the right to know and opt-out rights.",
    "ExplanationWrongB": "The opt-out right is one right, but CCPA also grants the right to know and delete.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "While the right to know what personal information is collected is a CCPA right, this is only one of several rights. 'All of the above' is the most complete answer.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.101 continuous monitoring",
    "MicroTopic": "continuous monitoring vs continuous audit",
    "UniqueConceptKey": "B-F-101-continuous-monitoring",
    "LOSTag": "Continuous Monitoring and Continuous Auditing",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor Corp has implemented automated tools that continuously monitor transactions for control exceptions, such as purchases from unauthorized vendors or journal entries exceeding threshold amounts. This approach is best described as:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Continuous monitoring is a management-driven process that uses automated controls and analytics to monitor business processes, transactions, and controls on an ongoing basis. Continuous auditing is performed by internal audit to provide independent assurance. Management owns continuous monitoring; internal audit owns continuous auditing.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-101",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Continuous auditing",
      "B": "Continuous monitoring",
      "C": "Compliance monitoring",
      "D": "Periodic auditing"
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
    "ExplanationWrongA": "Continuous auditing is performed by internal audit to test controls periodically. The stem describes management's ongoing monitoring, not periodic audit testing.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Compliance monitoring focuses specifically on regulatory adherence. The stem describes broader monitoring of all control exceptions, not just compliance.",
    "ExplanationWrongD": "Periodic auditing occurs at scheduled intervals. The stem describes continuous, automated monitoring, not periodic manual review.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.102 data analytics",
    "MicroTopic": "Benford's Law",
    "UniqueConceptKey": "B-F-102-Benfords-Law",
    "LOSTag": "Data Analytics Techniques",
    "primaryTheory": "F3",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "During an audit of accounts payable, the internal audit team at Orion Corp uses software to analyze the frequency distribution of the first digits of all invoice amounts, comparing them to the expected distribution. This data analytics technique is based on:",
    "CorrectChoice": "C",
    "ExplanationCorrect": "Benford's Law predicts that in naturally occurring numerical datasets, the digit 1 appears as the first digit about 30% of the time, 2 about 17.6%, and so on, with 9 appearing less than 5%. Significant deviations from this expected distribution may indicate data manipulation or fraud and warrant further investigation.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-102",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Monte Carlo simulation",
      "B": "Regression analysis",
      "C": "Benford's Law",
      "D": "Cluster analysis"
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
    "ExplanationWrongA": "Monte Carlo simulation models probability distributions for risk assessment. The described technique analyzes actual invoice digit patterns, not simulated probability outcomes.",
    "ExplanationWrongB": "Regression analysis models relationships between variables. The described technique examines digit frequency distributions to detect anomalies, not variable relationships.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Cluster analysis groups data into clusters to find natural groupings. The described technique compares actual digit frequencies against Benford's Law's expected distribution, not cluster memberships.",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.103 cybersecurity",
    "MicroTopic": "phishing and social engineering",
    "UniqueConceptKey": "B-F-103-phishing-social-engineering",
    "LOSTag": "Cybersecurity — Confidentiality, Integrity, Availability",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "An employee at Summit Corp received an email that appeared to be from the CEO requesting an urgent wire transfer to a new vendor. The email address was slightly different from the CEO's actual address. This type of attack is known as:",
    "CorrectChoice": "B",
    "ExplanationCorrect": "CEO fraud (also called business email compromise or whaling) is a sophisticated phishing attack where the attacker impersonates a senior executive and sends a fraudulent email to someone in finance/accounting, requesting an urgent wire transfer or payment. It exploits trust and authority rather than technical vulnerabilities.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-103",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Malware infection",
      "B": "Phishing (specifically CEO fraud or business email compromise)",
      "C": "Ransomware",
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
    "ExplanationWrongA": "While the email could be a delivery vector, the described attack is a social engineering fraud (BEC/CEO fraud), not a malware infection.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Ransomware encrypts files for payment. The described scenario of a fraudulent email request does not involve file encryption or ransom demands.",
    "ExplanationWrongD": "Denial of service overwhelms systems with traffic. The described scenario targets a user through email, not system availability.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.104 data governance",
    "MicroTopic": "data governance vs data management",
    "UniqueConceptKey": "B-F-104-data-governance-vs-management",
    "LOSTag": "Data Governance Frameworks",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cascade Corp is establishing a formal data governance program. Which of the following statements correctly distinguishes data governance from data management?",
    "CorrectChoice": "D",
    "ExplanationCorrect": "Data governance is the overarching framework of policies, processes, roles, and standards that define how data is managed. Data management (data architecture, data modeling, data quality, etc.) is the implementation of those governance policies. Governance provides the strategy; management provides the execution.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-104",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Data governance is only about data security, while data management covers everything else",
      "B": "Data management establishes policies; data governance implements technical solutions",
      "C": "Data governance and data management are synonymous terms",
      "D": "Data governance focuses on strategic policies and oversight; data management focuses on technical implementation and operational activities"
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
    "ExplanationWrongA": "Data governance is broader than just data security; it encompasses policies, standards, and oversight for all aspects of data management.",
    "ExplanationWrongB": "Data management does not establish policies; data governance sets policies. Data governance provides the framework; data management executes within that framework.",
    "ExplanationWrongC": "Data governance and data management are distinct concepts. Governance provides oversight and policies; management handles operational implementation.",
    "ExplanationWrongD": "",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "B-F.105 data quality",
    "MicroTopic": "data quality assessment",
    "UniqueConceptKey": "B-F-105-data-quality-assessment",
    "LOSTag": "Data Quality Dimensions",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "During a data quality assessment, Redwood Corp discovered that customer addresses in its billing system do not follow a standard format, some records contain inconsistent state abbreviations (e.g., CA vs Calif), and the same customer sometimes appears under slightly different names. These issues affect which data quality dimension?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Consistency (or consistency across systems and within a dataset) measures whether data values are free from contradiction and are presented in a uniform format. Inconsistent formats, abbreviations, and duplicate entries with different names indicate a lack of data consistency that can impair analysis and reporting.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1B-F-105",
    "question_state": "Certified",
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Consistency",
      "B": "Completeness",
      "C": "Accuracy",
      "D": "Timeliness"
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
    "ExplanationWrongB": "Completeness checks whether all required data is present. The issue described is about format and abbreviation consistency, not missing data.",
    "ExplanationWrongC": "Accuracy measures whether data reflects real-world values. The issue is about standard formatting and consistent abbreviations, not whether the values are correct.",
    "ExplanationWrongD": "Timeliness measures whether data is current and up-to-date. The issue of standard date formats and consistent abbreviations is about consistency, not timeliness.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "Part1OnlyFlag": true
  }
];