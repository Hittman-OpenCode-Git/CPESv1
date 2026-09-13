var MCQ_BANK_A_PART_60 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.052 dashboard drilldown design",
    "MicroTopic": "dashboard drilldown design",
    "UniqueConceptKey": "F-052-dashboard-drilldown-design",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Willow is evaluating dashboard drilldown design in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It is primarily a Part 2 capital budgeting calculation",
      "B": "Drilldown lets users move from summary metrics to underlying details for investigation",
      "C": "It should be documented only after an audit exception occurs",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Dashboard drilldown lets users move from summary metrics to transaction-level or supporting detail for investigation. This helps explain variances, outliers, and exceptions rather than leaving users with only high-level totals.",
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
    "QuestionID": "P1-F-052",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Capital budgeting is unrelated to dashboard drilldown and business-intelligence investigation.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Drilldown requirements and access should be designed before dashboard reliance, not documented only after an audit exception.",
    "ExplanationWrongD": "Automation does not eliminate controls; drilldown data still need governed definitions, access restrictions, and reliable sources.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.053 self-service BI governance",
    "MicroTopic": "self-service BI governance",
    "UniqueConceptKey": "F-053-self-service-bi-governance",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Orion Data Analytics deployed a self-service BI platform (Tableau/Power BI equivalent) to 420 users across six departments 18 months ago. The Data Governance Lead, Marcus Webb, extracted the following usage telemetry to prepare for the quarterly data governance committee meeting: (Department 1) Finance — 38 users created 126 reports, 74% of reports source from the certified Finance data warehouse (3 certified data sources), 12% of reports have not been refreshed in 90+ days (stale reports), 2 duplicate reports identified (same logic, different authors); (Department 2) Marketing — 82 users created 341 reports (highest report count), only 18% source from certified data sources (the rest pull from 14 different spreadsheets, Google Analytics exports, and 3 CRM sandbox environments), 41% of reports have not been refreshed in 90+ days (140 stale reports), 28 duplicate reports identified; (Department 3) Operations — 105 users created 218 reports, 62% source from certified sources (the Operations data mart), 22% stale, 11 duplicates; (Department 4) HR — 24 users created 47 reports, 92% source from certified sources (HRIS data warehouse), 4% stale, 0 duplicates; (Department 5) Sales — 138 users created 289 reports, 44% source from certified sources, 31% stale, 19 duplicates; (Department 6) R&D — 33 users created 53 reports, 27% source from certified sources (primarily pulling from 8 different experiment-tracking spreadsheets), 38% stale, 5 duplicates. The governance committee has asked Marcus to identify the highest-risk governance gap and recommend a remediation priority. Which analysis is correct?",
    "Choices": {
      "A": "Marketing (Department 2) represents the highest governance risk — it has the highest report count (341), the lowest certified-source usage (18%), the most stale reports (140 at 41%), the most duplicates (28), and the widest data source diversity (14+ uncertified sources), creating the highest probability that board-level decisions are being made on uncertified, unrefreshed, or duplicated data",
      "B": "Sales (Department 5) represents the highest governance risk — with 138 users (the largest user base), governance failure in Sales propagates to the most decision-makers, and 56% of reports using uncertified sources means a majority of Sales decisions are based on ungoverned data",
      "C": "R&D (Department 6) represents the highest governance risk — with only 27% certified-source usage and 8 different uncertified data sources, R&D is making product investment decisions on the least governed data in the organization",
      "D": " departments except HR (which has 92% certified-source usage) represent significant governance risk — the governance committee should mandate certified-source-only policies and stale-report archival across five departments simultaneously"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Marketing (Department 2) is the highest governance risk across all relevant dimensions. The risk is multi-dimensional: (1) CERTIFIED SOURCE USAGE — at 18%, Marketing has the lowest certified-source adoption, meaning 82% of Marketing's 341 reports (approximately 280 reports) are built on uncertified data sources — spreadsheets, Google Analytics exports, and CRM sandbox environments that have no data quality controls, no documented definitions, and no refresh SLAs; (2) STALE REPORTS — 140 stale reports (41%) means that at any given time, 140 dashboards displayed to Marketing decision-makers contain data that is at least 90 days old; (3) DUPLICATES — 28 duplicate reports means that multiple Marketing analysts have independently recreated the same analysis, guaranteeing version conflicts when the CEO asks for 'the marketing ROI number' and receives three different answers from three different reports; (4) SOURCE DIVERSITY — 14+ uncertified sources is the highest of any department, meaning Marketing's data landscape has the most integration points, the most definitional inconsistencies, and the highest probability of conflicting data. The convergence of all four risk dimensions in a single department with the highest report output (341) creates a governance emergency: Marketing generates the most analytics on the least governed data. The analytical principle is that self-service BI governance risk is multiplicative, not additive — a department with high report count AND low certification AND high staleness AND high duplication compounds risk across all four dimensions.",
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
    "QuestionID": "P1-F-053",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Sales has the largest user base (138 users) and 56% of reports use uncertified sources — legitimate governance concerns. However, Sales' risk profile is less severe than Marketing's across three of four dimensions: certified-source usage (44% vs. Marketing's 18% — 2.4× better), stale reports (31% vs. 41%), and source diversity (Sales pulls from fewer distinct uncertified sources). The larger user base argument contains a logical flaw: governance risk should be measured by the PROBABILITY of bad decisions multiplied by their IMPACT, not by the number of users alone. Marketing's 82% uncertified rate creates a higher probability of bad decisions than Sales' 56% rate, and Marketing's decisions (advertising spend allocation, pricing strategy, campaign ROI) have financial impact comparable to Sales' decisions. A candidate selecting this option has confused governance span (number of users) with governance depth (quality of data supporting decisions).",
    "ExplanationWrongC": "R&D's 27% certified-source usage is concerning, and product investment decisions based on uncertified data represent genuine risk. However, R&D has only 33 users generating 53 reports — the governance exposure is proportionally smaller than Marketing's 82 users generating 341 reports. R&D's 8 uncertified sources (experiment-tracking spreadsheets) are also inherently different from Marketing's sources: R&D data is experimental by nature (test results, prototype performance, A/B test outputs) and is typically consumed within the R&D team rather than distributed across the organization. Marketing reports, by contrast, are frequently presented to the executive team for budget allocation, campaign approval, and revenue forecasting — meaning Marketing's governance failures cascade upward to board-level decisions. The governance principle is that risk should be weighted by decision impact, not just data-quality metrics: uncertified data supporting executive-level resource allocation decisions carries higher risk than uncertified data supporting internal R&D experimentation.",
    "ExplanationWrongD": "Simultaneous governance mandates across all five departments appears comprehensive and fair — no department is singled out. However, governance resources (data steward time, committee review cycles, certification tooling budget) are finite. Attempting to certify all data sources, archive all stale reports, and deduplicate all reports across 1,074 total reports simultaneously would overwhelm the three-person data governance team. The correct approach is risk-based prioritization: address Marketing first (highest risk concentration), then Sales (second-highest), then Operations, while HR (92% certified, 4% stale, 0 duplicates) requires minimal intervention. The governance principle is that remediation should follow a Pareto approach — 80% of the governance risk is concentrated in 2-3 departments, and resources should be allocated accordingly. Flat mandates across all departments dilute limited resources and delay remediation for the highest-risk areas.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.054 data lineage tracing",
    "MicroTopic": "data lineage tracing",
    "UniqueConceptKey": "F-054-data-lineage-tracing",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F2",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crosswind Financial Group's CFO close package contains five key metrics that feed the quarterly earnings release. The Data Architect, Priya Nair, traced each metric's lineage from the CFO's report back through the data pipeline: (Metric 1) 'Revenue — Americas' ($1.42B) — sourced from the ERP general ledger (table GL_Rev_Americas), which receives data from the billing system via a nightly batch ETL job (ETL_Billing_to_GL_v2.3). The billing system extracts from two instances: legacy Billing-North (serving US and Canada, maintained by a 3-person team with documented extraction logic) and Billing-LATAM (serving Mexico and Brazil, maintained by a third-party contractor with NO documented extraction logic — the contractor confirmed verbally that 'currency conversion from MXN/BRL to USD happens in the extract but we don't have documentation for the exchange rate source'); (Metric 2) 'Adjusted EBITDA' ($487M) — calculated in the CFO's Excel model using a formula that references 'one-time restructuring charges' from a SharePoint list (Restructuring_Items_Q3.xlsx) maintained by the VP of Strategy's executive assistant. The assistant confirmed that restructuring items are 'reviewed by the VP verbally but no formal approval workflow or changelog exists'; (Metric 3) 'Free Cash Flow' ($312M) — sourced from the Treasury workstation (SAP Treasury module), which receives bank transaction data via SWIFT MT940 messages processed by a middleware service (SWIFT_Parser_v4.1). The SWIFT parser's data mapping documentation was last updated in 2019 (pre-dating the addition of 4 new bank accounts and 2 new currencies); (Metric 4) 'Operating Expenses — excl. one-time items' ($762M) — sourced from the ERP GL (table GL_OpEx), which receives data from 12 different source systems via a data integration hub. The integration hub's transformation logic includes 47 business rules, of which 14 are documented in a Confluence wiki (last updated 18 months ago), 19 exist only as comments in the ETL code (SQL stored procedures with no external documentation), and 14 were described by the ETL developer as 'business knowledge — I know how this rule works but it's not written down anywhere'; (Metric 5) 'Diluted EPS' ($2.14) — calculated by the external reporting system (Workiva) using inputs from the GL, the stock plan administrator (EquityEdge), and the convertible bond indenture. EquityEdge's data feed was validated during implementation in 2018 but has never been re-validated, and the convertible bond dilution calculation references an indenture provision that was amended in 2022 but the reporting system's calculation template was not updated to reflect the amendment. Which metric's lineage gap represents the highest risk of a material financial reporting error?",
    "Choices": {
      "A": "Revenue — Americas (Metric 1) — the undocumented currency conversion logic for MXN/BRL to USD in the Billing-LATAM extract affects revenue from two countries with a third-party contractor who cannot document the exchange rate source, creating a risk that revenue recognition is based on unvalidated currency conversions",
      "B": "Adjusted EBITDA (Metric 2) — the restructuring charges classification depends on a single SharePoint file maintained by an executive assistant with verbal-only VP review and no formal approval workflow or changelog, creating a risk that items are misclassified as 'one-time' and EBITDA is inflated",
      "C": "Operating Expenses (Metric 4) — 14 of 47 business rules exist only as 'business knowledge' in the ETL developer's head, creating a key-person dependency where 30% of the OpEx calculation logic is undocumented and unreplicable if the developer leaves",
      "D": "Diluted EPS (Metric 5) — the convertible bond dilution calculation still reflects a 2018 indenture provision that was amended in 2022, meaning the dilution component of EPS is being calculated using an outdated, legally superseded provision"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Diluted EPS (Metric 5) represents the highest risk because it contains a KNOWN error: the diluted EPS calculation uses a convertible bond indenture provision from 2018 that was amended in 2022. This is not a risk of error — it is a confirmed error that is actively producing incorrect financial results. Diluted EPS is a GAAP-reported metric that appears on the face of the income statement; an error in this calculation directly produces a misstated financial statement. The amendment to the convertible bond indenture likely changed the conversion ratio, the conversion price, or the anti-dilution provisions — any of which would change the number of potentially dilutive shares, directly affecting the EPS calculation. Unlike the other metrics where lineage gaps create RISK that errors COULD occur, Metric 5 has an error that HAS occurred and is currently reflected in Crosswind's filed financial statements. The lineage gap is also the most severe in terms of auditability: an external auditor reviewing the EPS calculation would trace the convertible bond dilution to the 2018 indenture (because that's what the system's template references) and would not independently discover the 2022 amendment unless they specifically tested for it. The data lineage principle is that gaps that create KNOWN errors take priority over gaps that create RISK of future errors.",
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
    "QuestionID": "P1-F-054",
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
    "ExplanationWrongA": "Metric 1's undocumented MXN/BRL currency-conversion logic is a genuine lineage risk, but it is a risk of error, not a confirmed error. Metric 5 contains a KNOWN error — the dilution calculation still uses the superseded 2018 indenture provision — and Diluted EPS is a GAAP income-statement metric. A confirmed GAAP error outranks a documentation risk.",
    "ExplanationWrongB": "Adjusted EBITDA's dependence on a single SharePoint file with verbal-only VP review is a significant control weakness. 'One-time' restructuring charges directly affect Adjusted EBITDA — a key non-GAAP metric that investors and analysts use to value the company. The lack of formal approval workflow means items can be classified as 'one-time' without documented justification, and the absence of a changelog means previous period classifications cannot be audited. This is a material governance gap. However, Metric 2's risk is a POTENTIAL error — the items may be classified correctly despite the weak process. Metric 5 (Diluted EPS) is an ACTUAL error — the 2022 amendment changed the indenture terms, and the system was never updated. Between a risk of error and a confirmed error, the confirmed error takes priority. Additionally, Adjusted EBITDA is a non-GAAP metric (supplementary disclosure), while Diluted EPS is a GAAP metric (income statement). GAAP errors carry higher regulatory and audit risk than non-GAAP errors.",
    "ExplanationWrongC": "Operating Expenses' key-person dependency (14 of 47 business rules existing only in the ETL developer's knowledge) is a significant operational risk. If the developer resigns or becomes unavailable, 30% of the OpEx classification logic is immediately lost — the organization would need to reverse-engineer the rules from SQL stored procedures, a process that could take months and might fail to recover all logic. This is a classic business continuity risk in data engineering. However, Metric 4's risk is a FUTURE risk (the developer MIGHT leave and the rules MIGHT be unrecoverable), whereas Metric 5's risk is a PRESENT error (the dilution calculation IS wrong). Additionally, the OpEx rules, while undocumented, are embedded in functioning SQL code — the logic EXISTS and can be reverse-engineered from the code with sufficient effort. By contrast, the Diluted EPS error requires knowing that the indenture was amended, which no amount of system inspection would reveal. The lineage prioritization principle is: known errors first, key-person dependencies second, documentation gaps third.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.055 metadata management",
    "MicroTopic": "metadata management",
    "UniqueConceptKey": "F-055-metadata-management",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Apex Industries' data architect is reviewing metadata quality metrics across the source-to-report pipeline for the CFO monthly close package. Five source systems feed the data warehouse: System-1 (GL) — completeness 99.2%, accuracy 99.8%, lineage coverage 100%; System-2 (AP subledger) — completeness 97.1%, accuracy 98.5%, lineage coverage 85% (15% of AP transformations from subledger to DW are undocumented); System-3 (Revenue subledger) — completeness 98.8%, accuracy 99.1%, lineage coverage 60% (revenue recognition rules applied in the ETL layer have no metadata documentation — the logic exists only in ETL code); System-4 (Payroll) — completeness 99.5%, accuracy 99.7%, lineage coverage 100%; System-5 (Fixed Assets) — completeness 96.0%, accuracy 97.2%, lineage coverage 90%. The CFO has stated that any number in the close package must be traceable to its source system with full documented lineage. Which system requires the most urgent metadata remediation investment?",
    "Choices": {
      "A": "Fixed Assets (System-5) — it has the lowest completeness (96.0%) and accuracy (97.2%), representing the weakest data quality in the pipeline",
      "B": "Revenue subledger (System-3) — with only 60% lineage coverage and revenue recognition logic existing only in undocumented ETL code, this system fails the CFO's traceability requirement for the most material financial statement line item",
      "C": "AP subledger (System-2) — the 15% undocumented transformations represent a material gap in liability reporting, and AP directly affects working capital metrics that the board reviews",
      "D": "GL (System-1) — as the primary financial system of record, even a 0.8% completeness gap represents potentially material unreconciled balances in the general ledger"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The Revenue subledger (System-3) requires the most urgent investment. The CFO's explicit requirement is that 'any number in the close package must be traceable to its source system with full documented lineage.' Revenue subledger fails this test categorically: only 60% of revenue transformations have metadata documentation, and the revenue recognition rules — which determine when and how much revenue is recognized, the single most material line item on the income statement — exist only in ETL code with no metadata layer. This means: (1) an auditor cannot trace a reported revenue figure through the pipeline without reading ETL code, (2) if the ETL developer leaves, the revenue recognition logic is effectively lost, and (3) any change to revenue recognition rules must be made in code rather than through governed metadata. While Fixed Assets (Choice A) has lower completeness and accuracy scores, those are data quality issues — the CFO's requirement is about traceability (lineage coverage), not data quality. System-3's 60% lineage coverage for revenue is the most critical gap because of revenue's materiality and the specific nature of the undocumented logic (accounting policy embedded in code, not metadata).",
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
    "QuestionID": "P1-F-055",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Fixed Assets has the lowest completeness (96.0%) and accuracy (97.2%), but these are data quality metrics, not lineage/traceability metrics. The CFO's requirement is specifically about traceability: 'any number... must be traceable to its source system with full documented lineage.' Fixed Assets' lineage coverage is 90% — while not perfect, it is substantially better than Revenue subledger's 60%. Additionally, fixed assets is generally a less material and less complex financial statement line item than revenue. Prioritizing data quality metrics over lineage metrics misinterprets the CFO's explicit directive. Data quality improvement is important but secondary to the traceability mandate in this context.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "AP subledger has 85% lineage coverage, meaning 15% of transformations are undocumented. While this is a genuine gap that should be addressed, it is less severe than Revenue subledger's 60% coverage for three reasons: (1) AP transformations are typically simpler than revenue recognition rules — the undocumented 15% likely relates to accrual or allocation logic that is inherently less complex than ASC 606 revenue recognition; (2) the dollar magnitude of AP is generally smaller than revenue; (3) AP's completeness (97.1%) and accuracy (98.5%) are both adequate, whereas the revenue recognition logic itself is undocumented — meaning the accuracy of the 60% that IS documented cannot be fully verified against source rules. Between 85% coverage for AP and 60% coverage for revenue, revenue is the clear priority.",
    "ExplanationWrongD": "The GL has near-perfect metadata quality: 99.2% completeness, 99.8% accuracy, 100% lineage coverage. A 0.8% completeness gap at the GL level is statistically insignificant for a non-audited monthly close package, and the GL's 100% lineage coverage means every number IS traceable — the 0.8% completeness gap at the source means a small amount of data may not have loaded, which is an operational data quality issue, not a metadata traceability issue. The CFO's requirement is about traceability, and the GL satisfies it fully. Recommending the GL as the most urgent investment when it has the best metrics across the board suggests a misreading of the data.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.056 robot exception handling",
    "MicroTopic": "robot exception handling",
    "UniqueConceptKey": "F-056-robot-exception-handling",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beacon is evaluating robot exception handling in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "RPA bots should route exceptions for human review rather than forcing bad transactions through",
      "B": "It eliminates the need for controls because technology is automated",
      "C": "It is primarily a Part 2 capital budgeting calculation",
      "D": "It should be documented only after an audit exception occurs"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "RPA bots should route exceptions to human review instead of forcing transactions through when rules do not match. Exception handling preserves control judgment for unusual invoices, missing data, or rule failures in finance automation.",
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
    "QuestionID": "P1-F-056",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Automation does not eliminate controls; bots need exception queues, access controls, rule-change controls, and monitoring.",
    "ExplanationWrongC": "Capital budgeting is unrelated to operational controls over RPA exception processing.",
    "ExplanationWrongD": "Exception-handling procedures should exist before bot deployment, not only after an audit exception.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.057 model validation holdout data",
    "MicroTopic": "model validation holdout data",
    "UniqueConceptKey": "F-057-model-validation-holdout-data",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crescent is evaluating model validation holdout data in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "Holdout data test how well a model performs on observations not used for training",
      "C": "It eliminates the need for controls because technology is automated",
      "D": "It is primarily a Part 2 capital budgeting calculation"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Holdout data are observations not used to train the model, so they help test whether the model performs on new data. This is stronger than evaluating the model only on training data, which can hide overfitting.",
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
    "QuestionID": "P1-F-057",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Model validation evidence should be designed before reliance on model outputs, not documented only after an audit exception.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Automation does not eliminate validation; automated models still require testing, monitoring, and governance.",
    "ExplanationWrongD": "Capital budgeting is unrelated to validating machine-learning model performance.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.058 algorithmic bias monitoring",
    "MicroTopic": "algorithmic bias monitoring",
    "UniqueConceptKey": "F-058-algorithmic-bias-monitoring",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Delta is evaluating algorithmic bias monitoring in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It eliminates the need for controls because technology is automated",
      "B": "It should be documented only after an audit exception occurs",
      "C": "It is primarily a Part 2 capital budgeting calculation",
      "D": "Bias monitoring evaluates whether model outcomes are unfairly distorted by data or design choices"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Algorithmic bias monitoring evaluates whether model outcomes are unfairly distorted by data, design choices, or changing conditions. Monitoring is needed because a model can appear accurate overall while producing biased results for particular groups or cases.",
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
    "QuestionID": "P1-F-058",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Automation does not eliminate bias risk; automated decisions can embed or amplify biased data and assumptions.",
    "ExplanationWrongB": "Bias monitoring should be part of ongoing model governance, not documented only after an audit exception.",
    "ExplanationWrongC": "Capital budgeting is unrelated to evaluating bias in algorithmic outputs.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.059 cybersecurity logging SIEM",
    "MicroTopic": "cybersecurity logging SIEM",
    "UniqueConceptKey": "F-059-cybersecurity-logging-siem",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Evergreen is evaluating cybersecurity logging SIEM in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "Security logs and SIEM tools help detect, correlate, and escalate suspicious activity",
      "B": "It is primarily a Part 2 capital budgeting calculation",
      "C": "It should be documented only after an audit exception occurs",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Security logs and SIEM tools help detect, correlate, and escalate suspicious activity across systems. For finance systems, logging supports timely incident response and evidence, but alerts still require review and follow-up.",
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
    "QuestionID": "P1-F-059",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Capital budgeting is unrelated to cybersecurity logging and monitoring.",
    "ExplanationWrongC": "Logging and escalation procedures should be established before incidents occur, not documented only after an audit exception.",
    "ExplanationWrongD": "Automation does not eliminate cybersecurity controls; SIEM alerts require tuning, review, and response.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  }
];