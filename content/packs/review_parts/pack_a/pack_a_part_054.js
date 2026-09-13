var MCQ_BANK_A_PART_54 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.004 master data governance",
    "MicroTopic": "master data governance",
    "UniqueConceptKey": "F-004-master-data-governance",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Zephyr is standardizing customer, vendor, and item records before connecting procurement, sales, and general ledger systems. Which practice best reflects master data governance?",
    "Choices": {
      "A": "Allow each department to define vendor names and IDs independently",
      "B": "Assign ownership, definitions, approval rules, and maintenance standards for shared master records",
      "C": "Correct duplicate vendor records only when a payment error is found",
      "D": "Load legacy field into the new system without validation to avoid delaying implementation"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Master data governance establishes ownership, definitions, approval rules, and maintenance standards for shared data such as customers, vendors, and items.",
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
    "QuestionID": "P1-F-004",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Independent definitions create inconsistent master data and reconciliation problems across systems.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Waiting until a payment error is found is reactive; governance should prevent and detect duplicate records before processing errors occur.",
    "ExplanationWrongD": "Loading unvalidated legacy fields can migrate errors and undermine reports, controls, and analytics.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.005 data dictionary definitions",
    "MicroTopic": "data dictionary definitions",
    "UniqueConceptKey": "F-005-data-dictionary-definitions",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Apex Industries' data governance committee, chaired by Chief Data Officer Rebecca Okonkwo, must select a metadata standard for three legacy systems being migrated to a unified data platform: the billing system (custom flat-file format, 400+ fields, no existing metadata), the CRM (Salesforce with 200+ custom objects, partial metadata in SFDC format), and the general ledger (Oracle EBS, 150+ chart-of-account segments, inconsistent field definitions across 12 international subsidiaries). The committee has three options: (1) ISO 11179 — comprehensive international metadata registry standard, 18-month adoption timeline, $950K cost, 95% cross-system consistency target; (2) a lightweight custom JSON schema — 6-month adoption, $280K cost, estimated 70% cross-system consistency, no external audit support; (3) the Salesforce metadata framework extended to all systems — 10-month adoption, $520K cost, strong CRM fit but poor general ledger compatibility. The CFO requires auditable data lineage for the next year-end close. Which recommendation should the committee adopt?",
    "Choices": {
      "A": "Adopt the ISO 11179 standard because it provides the highest cross-system consistency, external audit support, and regulatory-grade metadata governance for financial reporting",
      "B": "Adopt the custom JSON schema because it is the fastest and cheapest option and the committee can enhance it later as needed",
      "C": "Adopt the Salesforce metadata framework because the CRM already uses it and extending it to two additional systems is a reasonable compromise",
      "D": "Defer the metadata standard decision and focus instead on manually documenting each legacy system's field definitions in a shared spreadsheet"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "ISO 11179 is the correct recommendation. The decision must be evaluated against the CFO's binding constraint: auditable data lineage for the next year-end close. ISO 11179, as an international metadata registry standard, provides: (1) a formal framework for documenting data element definitions, relationships, and lineage that external auditors recognize and can test against; (2) the highest cross-system consistency target (95%), which directly addresses the problem of 12 subsidiaries using inconsistent chart-of-account segment definitions in the general ledger; and (3) a governance model designed for regulatory environments. The $950K cost and 18-month timeline reflect the scope of a proper metadata foundation. A custom JSON schema (Choice B) may be faster and cheaper, but it lacks external audit recognition — an auditor cannot validate lineage defined in a proprietary schema with no independent standard to test against. The Salesforce framework (Choice C) is a single-vendor solution ill-suited to the general ledger's structured financial data requirements. Deferring (Choice D) abdicates governance responsibility and leaves the year-end close unauditable.",
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
    "QuestionID": "P1-F-005",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "The custom JSON schema is indeed the fastest (6 months) and cheapest ($280K) option, and 'enhancing later' sounds reasonable. However, the CFO's binding requirement is auditable data lineage for the year-end close. An auditor cannot independently verify metadata lineage defined in a custom, undocumented standard. Additionally, estimated 70% cross-system consistency means 30% of data elements remain ambiguous — directly contradicting the committee's purpose. 'Fast and cheap' fails when the output is unauditable. The ISO 11179 standard, while more expensive and slower, directly satisfies the CFO's requirement.",
    "ExplanationWrongC": "The Salesforce metadata framework works well for the CRM but was not designed for general ledger structures. Oracle EBS chart-of-account segments, with 150+ financial data elements across 12 subsidiaries, require metadata standards capable of representing hierarchical financial relationships, validation rules, and regulatory mappings. Extending a CRM-native framework to financial systems introduces a category mismatch — the framework lacks the semantic depth needed for general ledger metadata. ISO 11179 is specifically designed to handle heterogeneous system landscapes including financial systems.",
    "ExplanationWrongD": "A shared spreadsheet defers the governance decision rather than solving it. Spreadsheets lack version control, concurrency management, and the structured relationships needed for metadata lineage. The committee's mandate is to select a standard, not to create a temporary workaround that will need to be replaced before the year-end close. This option does not address the CFO's auditable lineage requirement — no auditor accepts a manually maintained spreadsheet as a metadata governance artifact.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.006 data life cycle retention",
    "MicroTopic": "data life cycle retention",
    "UniqueConceptKey": "F-006-data-life-cycle-retention",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beacon is designing governance for finance data from initial capture through use in reports and eventual disposal. Which response best describes data life cycle management?",
    "Choices": {
      "A": "Managing data creation, storage, use, sharing, archiving, retention, and disposal with appropriate controls at each stage",
      "B": "Setting retention periods primarily by storage cost limits rather than legal, operational, and audit requirements",
      "C": "Applying controls only while data are used in active dashboards",
      "D": "Deleting source records immediately after summarized reports are issued"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Data life cycle management covers creation, storage, use, sharing, archiving, retention, and disposal. Controls should address the risks at each stage.",
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
    "QuestionID": "P1-F-006",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Indefinite retention can increase privacy, storage, and legal exposure and does not reflect a governed retention policy.",
    "ExplanationWrongC": "Data still need controls before dashboard use and after active use, including storage, retention, and disposal.",
    "ExplanationWrongD": "Immediate deletion may violate retention, audit, legal, or operational requirements.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.007 data quality completeness",
    "MicroTopic": "data quality completeness",
    "UniqueConceptKey": "F-007-data-quality-completeness",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crescent is testing a data feed used for revenue dashboards. Several required invoice records and customer fields are missing from the file. Which data quality dimension is most directly affected?",
    "Choices": {
      "A": "Accuracy, because recorded amounts may not match source documents",
      "B": "Completeness, because required records or fields are missing",
      "C": "Timeliness, because current data were received after the reporting deadline",
      "D": "Authorization, because access rights may not match job responsibilities"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Completeness means all required records and fields are captured. Missing invoices or required customer fields directly indicate a completeness problem.",
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
    "QuestionID": "P1-F-007",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Accuracy concerns whether captured data correctly represent the underlying event; the stem focuses on missing data.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Timeliness concerns whether data are available when needed; the issue described is missing content.",
    "ExplanationWrongD": "Authorization concerns who can access or approve data, not whether the feed contains all required records and fields.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.008 data quality accuracy",
    "MicroTopic": "data quality accuracy",
    "UniqueConceptKey": "F-008-data-quality-accuracy",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Dakota is validating customer master data before using it in revenue analytics. A sample shows customer addresses and credit limits that differ from approved source documents. Which data quality dimension is most directly affected?",
    "Choices": {
      "A": "Completeness, because required records or fields are missing from the file",
      "B": "Accuracy, because recorded data do not faithfully represent the approved source information",
      "C": "Timeliness, because current data were received after the reporting deadline",
      "D": "Authorization, because dashboard users may have broader access than needed"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Accuracy means data correctly represent the underlying event, attribute, or approved source. Incorrect addresses or credit limits are accuracy problems even if the records are complete and available on time.",
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
    "QuestionID": "P1-F-008",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Completeness concerns missing required records or fields. The stem says the fields exist but contain values that differ from approved source documents.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Timeliness concerns whether data are available when needed; the problem described is wrong values, not late availability.",
    "ExplanationWrongD": "Authorization concerns user access or approval rights. It does not directly address whether the customer attributes are correct.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.009 data quality timeliness",
    "MicroTopic": "data quality timeliness",
    "UniqueConceptKey": "F-009-data-quality-timeliness",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Evergreen receives daily point-of-sale feeds for a margin dashboard, but the feed often arrives two days after managers make pricing decisions. Which data quality dimension is most directly affected?",
    "Choices": {
      "A": "Completeness, because required transaction counts and fields should reconcile to the source",
      "B": "Accuracy, because recorded amounts may not match the source documents",
      "C": "Timeliness, because data are not available when needed for decisions or reporting",
      "D": "Validity, because transaction codes may fail format and range checks"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Timeliness means data are available when needed for reporting, monitoring, or decisions. Late data can make analytics less useful even if the data are accurate and complete.",
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
    "QuestionID": "P1-F-009",
    "recertification_batch": "DL-047 Remediation Recertification — 2026-09-05",
    "recertification_date": "2026-09-05",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Completeness would be the issue if required records or fields were missing. The stem focuses on late arrival.",
    "ExplanationWrongB": "Accuracy would be the issue if values did not match source records. The stem does not indicate incorrect values.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Validity concerns whether transaction codes conform to required formats and ranges. The stem describes late arrival, not format failures — no facts suggest codes failed checks. The issue is availability when needed (timeliness), not conformance (validity).",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.010 data cleansing duplicate customers",
    "MicroTopic": "data cleansing duplicate customers",
    "UniqueConceptKey": "F-010-data-cleansing-duplicate-customers",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Frontier Distribution's data steward, Amara Osei, must select a customer de-duplication approach for the billing system, which contains 85,000 customer records with an estimated 12% duplicate rate. Three vendors have proposed different methodologies: (1) Rule-based matching — deterministic rules (exact name + address match), 92% merge confidence, $0.08 per record processed, 8% false-positive risk (incorrectly merging two distinct customers); (2) Machine learning fuzzy matching — probabilistic model trained on Frontier's data, 97% merge confidence, $0.22 per record processed, 3% false-positive risk, 4-week model training period; (3) Manual review — human reviewers validate every proposed match, 99.9% merge confidence, $1.15 per record processed, 0.1% false-positive risk, 12-week completion timeline. The controller has set a hard constraint: zero incorrectly merged customer accounts (false positives) in the audited financial statements, but needs the cleanup completed before the Q3 close. Which approach should Amara recommend?",
    "Choices": {
      "A": "Rule-based matching — it is the most cost-effective option and 92% accuracy is sufficient for customer master data",
      "B": "Machine learning fuzzy matching — it achieves the optimal balance of high merge confidence (97%), low false-positive risk (3%), and timely completion (4 weeks + processing) within budget",
      "C": "Manual review — it is the only approach that meets the controller's zero-false-positive constraint with 99.9% confidence",
      "D": "Postpone de-duplication until after Q3 close and perform a full manual review during the annual audit cycle"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The machine learning fuzzy matching approach is the correct recommendation. The controller's 'zero incorrectly merged accounts' constraint must be interpreted practically, not literally: 3% false-positive risk across the estimated 10,200 duplicates (85,000 × 12%) means approximately 306 records flagged for merge where the match is uncertain. These 306 can be routed to a small manual review queue — achieving effectively zero false positives in financial statements while completing before Q3 close. Rule-based matching (Choice A) leaves 816 potentially incorrect merges (8% of 10,200) — too many for practical manual review and materially above the controller's tolerance. Manual review (Choice C) satisfies the constraint absolutely but at $1.15/record for 85,000 records ($97,750) and 12 weeks, it misses the Q3 close deadline. The correct evaluation synthesizes the cost-quality-time trade-off: ML fuzzy matching + targeted manual review of low-confidence matches delivers both the quality requirement and the timing requirement.",
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
    "QuestionID": "P1-F-010",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Rule-based matching at 92% confidence produces an estimated 816 incorrect merges (8% false-positive rate × 10,200 duplicates). The controller's constraint is zero incorrectly merged accounts in the audited financial statements, and 816 errors is materially above that threshold. While $0.08/record ($6,800 total) is the cheapest option, cost is not the binding constraint here — the binding constraint is the controller's false-positive tolerance. '92% accuracy is sufficient' misjudges the controller's explicit requirement.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Manual review at 99.9% confidence does achieve the controller's quality constraint. However, at $1.15 per record ($97,750 total) and a 12-week completion timeline, it misses the Q3 close deadline — the second binding constraint. The controller needs the cleanup completed before Q3 close AND zero incorrectly merged accounts. The correct answer (ML fuzzy matching) satisfies both constraints by combining automated high-confidence matching with targeted manual review of low-confidence cases. Selecting manual review for the entire dataset over-engineers the solution at the expense of the timeline.",
    "ExplanationWrongD": "Deferring the cleanup past Q3 close directly violates the controller's explicit timing directive. Additionally, the duplicate rate of 12% means the Q3 financial statements will be prepared with materially inaccurate customer receivable data — aging reports, credit limits, and collections prioritization all depend on accurate customer master records. Postponing does not solve the problem; it extends the period during which financial reporting is compromised. The controller specifically requested completion before Q3 close.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.011 relational database primary key",
    "MicroTopic": "relational database primary key",
    "UniqueConceptKey": "F-011-relational-database-primary-key",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Granite is designing a relational table for vendor master records. The controller wants each vendor record to be uniquely identifiable so invoices can be joined to the correct vendor. Which database element best addresses this need?",
    "Choices": {
      "A": "A calculated field that totals monthly purchases by vendor category",
      "B": "A foreign key that stores the invoice number from each purchase transaction",
      "C": "A primary key, such as a unique vendor ID, assigned to each vendor record",
      "D": "A dashboard filter that hides inactive vendors from standard reports"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "A primary key uniquely identifies each record in a relational table, such as a customer ID, vendor ID, or invoice number. It supports accurate joins, prevents duplicate ambiguity, and helps maintain reliable transaction data.",
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
    "QuestionID": "P1-F-011",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "A calculated field can summarize activity but does not uniquely identify each master record.",
    "ExplanationWrongB": "A foreign key links to another table, but the vendor master table still needs its own unique primary key.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "A dashboard filter affects presentation and does not provide a unique identifier for database joins.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  }
];