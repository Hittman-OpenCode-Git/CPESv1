var MCQ_BANK_A_PART_55 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.012 database referential integrity",
    "MicroTopic": "database referential integrity",
    "UniqueConceptKey": "F-012-database-referential-integrity",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor configures its sales database so an invoice cannot be saved unless the customer ID already exists in the approved customer master table. Which database control is being applied?",
    "Choices": {
      "A": "Encryption at rest, because stored customer and invoice records are unreadable without a key",
      "B": "Data visualization, because exceptions are summarized in a dashboard chart",
      "C": "Referential integrity, because relationships between related tables must remain valid",
      "D": "Role-based access, because users receive permissions based on job responsibilities"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Referential integrity helps ensure relationships between tables remain valid, such as requiring an invoice customer ID to exist in the customer master table. This prevents orphan records and supports reliable reporting.",
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
    "QuestionID": "P1-F-012",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Encryption protects confidentiality of stored data; it does not by itself require valid relationships between tables.",
    "ExplanationWrongB": "Visualization can display exceptions but does not enforce valid database relationships.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Role-based access limits what users can do; it is different from enforcing valid links between invoice and customer tables.",
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
    "Topic": "F.013 data warehouse purpose",
    "MicroTopic": "data warehouse purpose",
    "UniqueConceptKey": "F-013-data-warehouse-purpose",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Iris wants finance users to analyze multi-year sales, inventory, and margin trends using data integrated from ERP, CRM, and warehouse systems. Which architecture best fits this reporting need?",
    "Choices": {
      "A": "An online transaction-processing table used only to enter current sales orders",
      "B": "A local spreadsheet maintained independently by each regional manager",
      "C": "A data warehouse that stores integrated historical data optimized for reporting and analysis",
      "D": "A system log that records failed login attempts for cybersecurity monitoring"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "A data warehouse integrates historical data from multiple sources so users can report, analyze trends, and support management decisions. The CMA trap is confusing a warehouse with an operational transaction system or unrelated control evidence.",
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
    "QuestionID": "P1-F-013",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "An online transaction-processing table supports current transaction entry, not integrated multi-year analytical reporting across systems.",
    "ExplanationWrongB": "Independent local spreadsheets create version and governance risk and do not provide an integrated reporting architecture.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "A security log is useful control evidence, but it is not designed to integrate finance data for trend analysis.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.014 ETL process controls",
    "MicroTopic": "ETL process controls",
    "UniqueConceptKey": "F-014-etl-process-controls",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniper is loading sales and inventory data from operating systems into a finance data warehouse. Which control best supports completeness and accuracy during the ETL process?",
    "Choices": {
      "A": "Reconcile extracted, transformed, and loaded records to source totals and approved validation rules",
      "B": "Review dashboard colors and labels after users begin relying on the report",
      "C": "Let analysts manually adjust warehouse totals outside change control when reports appear unusual",
      "D": "Limit review to whether final reports open successfully in the reporting tool"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "ETL controls help ensure data extracted from sources, transformed by rules, and loaded into reporting systems remains complete and accurate. Reconciliations to source totals and validation rules are key controls.",
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
    "QuestionID": "P1-F-014",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Presentation review may improve readability, but it does not verify that source data were completely and accurately extracted, transformed, and loaded.",
    "ExplanationWrongC": "Manual adjustments outside change control can create integrity and audit-trail problems rather than controlling ETL processing.",
    "ExplanationWrongD": "A report opening successfully does not prove the underlying source-to-target data are complete or accurate.",
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
    "Topic": "F.015 business intelligence dashboard",
    "MicroTopic": "business intelligence dashboard",
    "UniqueConceptKey": "F-015-business-intelligence-dashboard",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Keystone Industries' FP&A team has distributed the monthly CFO dashboard showing a 4.2% consolidated gross margin decline (42.8% → 38.6%) across three product lines: Standard (60% of revenue, margin declined from 44% to 41%), Premium (25% of revenue, margin declined from 48% to 40%), and Custom (15% of revenue, margin declined from 30% to 28%). Three KPIs are flagged: (KPI-1) raw material cost index up 8.3% quarter-over-quarter, (KPI-2) Premium line on-time delivery dropped from 94% to 79%, driving $420K in customer concessions, (KPI-3) Standard line production volume increased 18% but labor efficiency variance is 12% unfavorable. The FP&A analyst must identify which three KPIs are driving the margin decline and recommend which one to address first. Which analysis is correct?",
    "Choices": {
      "A": "KPI-1 is the primary driver across all three product lines — rising raw material costs compress margins regardless of product mix, and addressing supplier contracts is the first priority",
      "B": "KPI-2 (Premium delivery collapse) is the primary driver — the 14 percentage-point delivery decline caused $420K in concessions, and Premium contributes disproportionately to margin (40% margin on 25% of revenue = highest margin product), making its decline the largest single factor in the 4.2% consolidated drop",
      "C": "KPI-3 (Standard line labor inefficiency) is the primary driver — Standard represents 60% of revenue, so its 12% unfavorable labor efficiency variance has the largest absolute dollar impact on margins",
      "D": "All three KPIs contribute equally — the 4.2% margin decline is evenly distributed across raw materials, Premium delivery, and Standard labor efficiency, so no single KPI should be prioritized"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "KPI-2 (Premium delivery collapse) is the primary driver requiring first action. To decompose the 4.2% margin decline: Premium line contributed disproportionately because its margin dropped 8 percentage points (48% → 40%), the largest absolute decline of any product, and its 25% revenue share means each margin point lost represents a larger dollar impact than Standard's 3-point decline on 60% share. The $420K in concessions is a direct, quantifiable cost of the delivery failure — this is pure margin leakage that stops immediately when delivery is restored. KPI-1 (raw materials) affects all three products but explains the Standard line's 3-point decline more than Premium's 8-point decline — Premium's margin collapse is too large to be explained by raw materials alone. KPI-3 (labor efficiency) affects Standard only and its 12% variance, while significant, operates on lower-margin Standard product. The correct analysis identifies that the largest-margin product experiencing the largest percentage-point decline, with a directly traceable operational root cause (delivery failure → concessions), is the first priority for remediation.",
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
    "QuestionID": "P1-F-015",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Rising raw material costs (KPI-1) do compress margins across all product lines, but they explain only a portion of the decline. If raw materials were the primary driver, we would expect roughly proportional margin compression across all three product lines. Instead, Premium dropped 8 percentage points while Standard dropped 3 and Custom dropped 2 — the pattern is concentrated in Premium, not uniform across all lines. This pattern points to a product-specific issue (KPI-2, Premium delivery failure) rather than a common input cost issue. Supplier contract renegotiation is a longer-term remedy that does not address the immediate $420K in monthly concessions.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Standard line labor inefficiency (KPI-3) is a real concern — 12% unfavorable on 60% of revenue is material. However, Standard's margin decline was only 3 percentage points (44% → 41%), and the labor efficiency variance affects conversion cost, which is a component of COGS but not the sole driver. More importantly, Standard's volume increased 18% during the same period. Labor efficiency often declines during volume ramps as new workers are added or overtime increases — this is typically transitory and self-correcting as the workforce stabilizes. The $420K in Premium concessions from KPI-2 is a larger, more immediate margin impact than the labor variance from KPI-3.",
    "ExplanationWrongD": "The three KPIs do not contribute equally. The 4.2% consolidated margin decline can be decomposed: KPI-2 (Premium) accounts for approximately 2.0-2.5 percentage points of the decline (8-point margin drop × 25% revenue = 2.0 points from Premium alone, plus the direct $420K concession expense), KPI-1 (raw materials) accounts for roughly 1.0-1.5 points across all lines, and KPI-3 (Standard labor) accounts for roughly 0.5-1.0 points. Saying they contribute equally is factually incorrect — the data clearly shows Premium's disproportionate impact. Equally distributing attention across three KPIs with unequal impact is an inefficient allocation of management focus.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.016 data visualization misleading axis",
    "MicroTopic": "data visualization misleading axis",
    "UniqueConceptKey": "F-016-data-visualization-misleading-axis",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Lumen reviews a chart showing quarterly gross margin percentages. The vertical axis starts at 28% instead of zero, making a small margin change appear dramatic. What is the main concern?",
    "Choices": {
      "A": "The chart lacks enough color variation to distinguish departments",
      "B": "The report should be converted to a transaction-entry screen before analysis",
      "C": "The chart needs a larger source data file even if the scale is unchanged",
      "D": "A truncated or inconsistent axis can exaggerate or hide trends"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "A misleading visualization can distort interpretation even when the underlying data are accurate. Truncated, inconsistent, or poorly scaled axes may exaggerate or hide trends, so finance users should review chart design before relying on the conclusion.",
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
    "QuestionID": "P1-F-016",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Color can affect readability, but the stem describes a scale problem that changes how the trend appears.",
    "ExplanationWrongB": "A transaction-entry screen would not address misleading chart scaling in an analytical report.",
    "ExplanationWrongC": "Adding more data does not correct the misleading effect of a truncated or inconsistent axis.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.017 descriptive analytics dashboard",
    "MicroTopic": "descriptive analytics dashboard",
    "UniqueConceptKey": "F-017-descriptive-analytics-dashboard",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian asks finance to show last quarter sales by region, product line, and customer segment in a dashboard. Which analytics category is being used?",
    "Choices": {
      "A": "Diagnostic analytics, because it isolates why a margin variance occurred",
      "B": "Predictive analytics, because it estimates next quarter sales from a model",
      "C": "Descriptive analytics, because it summarizes what happened",
      "D": "Prescriptive analytics, because it recommends the best pricing action"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Descriptive analytics summarizes historical or current results, such as sales by region, budget variances, or dashboard KPIs. It answers what happened rather than why it happened, what will happen, or what action should be taken.",
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
    "QuestionID": "P1-F-017",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Diagnostic analytics investigates why results occurred; the stem asks for summarizing historical sales by category.",
    "ExplanationWrongB": "Predictive analytics estimates future outcomes; the stem describes reporting last quarter results.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Prescriptive analytics recommends actions; the dashboard in the stem summarizes historical results.",
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
    "Topic": "F.018 diagnostic analytics root cause",
    "MicroTopic": "diagnostic analytics root cause",
    "UniqueConceptKey": "F-018-diagnostic-analytics-root-cause",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northstar finds that contribution margin declined despite higher sales volume. Finance analyzes price changes, sales mix, discounting, and input-cost trends to identify the cause. Which analytics category is being used?",
    "Choices": {
      "A": "Descriptive analytics, because it reports the decline in contribution margin",
      "B": "Diagnostic analytics, because it investigates why results occurred",
      "C": "Predictive analytics, because it forecasts next period contribution margin",
      "D": "Prescriptive analytics, because it automatically selects the optimal corrective action"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Diagnostic analytics investigates why results occurred by drilling into drivers, exceptions, relationships, or process causes. In CMA work, it helps explain variances or performance changes rather than merely displaying the result.",
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
    "QuestionID": "P1-F-018",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Descriptive analytics would report what happened; the stem focuses on identifying the underlying cause.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Predictive analytics estimates future outcomes; the stem analyzes causes of a result that already occurred.",
    "ExplanationWrongD": "Prescriptive analytics recommends actions. The stem describes root-cause investigation, not automated action selection.",
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
    "Topic": "F.019 predictive analytics forecast",
    "MicroTopic": "predictive analytics forecast",
    "UniqueConceptKey": "F-019-predictive-analytics-forecast",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Orion uses historical demand, seasonality, and promotion data to estimate next quarter unit sales for a revenue forecast. Which analytics category is being used?",
    "Choices": {
      "A": "Descriptive analytics, because it summarizes prior-period sales by product",
      "B": "Diagnostic analytics, because it explains why a prior variance occurred",
      "C": "Prescriptive analytics, because it selects the production schedule under constraints",
      "D": "Predictive analytics, because it estimates what is likely to happen using data patterns"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Predictive analytics uses historical data patterns, statistical relationships, or models to estimate likely future outcomes. It supports forecasting and risk assessment, but results still depend on data quality, assumptions, and model validation.",
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
    "QuestionID": "P1-F-019",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Descriptive analytics summarizes what happened; the stem asks about estimating next quarter unit sales.",
    "ExplanationWrongB": "Diagnostic analytics explains why results occurred; the stem describes forecasting future demand.",
    "ExplanationWrongC": "Prescriptive analytics recommends an action under objectives and constraints. The stem focuses on estimating future sales.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "certification_date": "2026-07-24",
    "certification_batch": "Session 68 Wave 1",
    "CognitiveLevel": "Apply"
  }
];