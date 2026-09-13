var MCQ_BANK_A_PART_62 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.068 business continuity for systems",
    "MicroTopic": "business continuity for systems",
    "UniqueConceptKey": "F-068-business-continuity-for-systems",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northstar is evaluating business continuity for systems in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It eliminates the need for controls because technology is automated",
      "B": "It should be documented only after an audit exception occurs",
      "C": "It is primarily a Part 2 capital budgeting calculation",
      "D": "Business continuity planning addresses how critical processes continue during system disruption"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Business continuity planning addresses how critical finance and operating processes continue during system disruption. The best answer focuses on resilience and continuity rather than assuming automated systems will always be available.",
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
    "QuestionID": "P1-F-068",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Automation does not eliminate disruption risk; automated systems can fail and still require continuity plans.",
    "ExplanationWrongB": "Continuity plans should be developed and tested before disruptions, not documented only after an audit exception.",
    "ExplanationWrongC": "Capital budgeting is unrelated to maintaining critical processes during system outages.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.069 real-time analytics use",
    "MicroTopic": "real-time analytics use",
    "UniqueConceptKey": "F-069-real-time-analytics-use",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Pacific Coast Logistics experienced a $340,000 inventory write-off last month when a temperature-controlled pharmaceutical shipment spoiled in a warehouse because the batch analytics dashboard (refreshed every 4 hours) did not detect a cooling unit failure until the next refresh cycle — by which time 18 pallets of product had exceeded the 2°C-8°C storage range. The COO, Raj Patel, must recommend an analytics architecture for three supply chain decision domains: (Domain 1) Cold Chain Monitoring — temperature, humidity, and door-open alerts from 2,400 IoT sensors across 12 warehouses, currently polled every 15 minutes; a real-time streaming architecture would cost $380,000 to implement with $95,000 annual cloud streaming costs; (Domain 2) Inventory Replenishment — reorder point calculations across 18,000 SKUs using daily batch processing of sales, returns, and receipt data; a real-time architecture would cost $620,000 to implement with $210,000 annual costs, but supply chain analysts indicate that reorder decisions are reviewed and approved weekly, making sub-daily frequency unnecessary; (Domain 3) Route Optimization — fleet routing for 340 delivery trucks using next-day batch processing of orders, traffic data, and vehicle availability; a real-time architecture would cost $520,000 to implement with $180,000 annual costs, but dispatchers report that routes are finalized by 6:00 PM for the following day and mid-route changes occur on fewer than 3% of deliveries. The CFO has capped the analytics modernization budget at $500,000 for implementation. The COO may recommend different architectures for different domains. Which architecture recommendation should he present?",
    "Choices": {
      "A": "Real-time streaming for Cold Chain Monitoring and Inventory Replenishment (Domains 1 and 2); batch for Route Optimization (Domain 3) — inventory is the second most time-sensitive domain and deserves real-time investment alongside temperature monitoring",
      "B": "Real-time streaming for Cold Chain Monitoring (Domain 1); maintain batch processing for Inventory Replenishment (Domain 2) and Route Optimization (Domain 3) — the temperature-control write-off directly justifies real-time investment in the domain where latency caused financial loss, while the other two domains have no demonstrated need for sub-daily processing",
      "C": "Real-time streaming for all three domains — a single architecture is easier to manage, the total cost ($1,520,000) can be phased over three fiscal years, and the competitive advantage of real-time supply chain visibility justifies the premium",
      "D": "Maintain batch processing for all three domains but reduce the Cold Chain Monitoring refresh interval from 4 hours to 15 minutes — this addresses the cooling unit detection gap without requiring a real-time architecture investment"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Targeted real-time deployment for Cold Chain Monitoring only is the correct recommendation. The analysis is driven by the principle of decision latency: analytics should be real-time only when the DECISION being supported requires real-time data. Domain 1 (Cold Chain Monitoring) meets this test definitively — the $340,000 write-off is direct evidence that a 4-hour data refresh interval creates decision latency that exceeds the acceptable response window for temperature excursions. At $380,000 implementation and $95,000 annual costs, the Domain 1 investment fits within the CFO's $500,000 cap and directly prevents recurrence of the specific loss event. Domain 2 (Inventory Replenishment) fails the decision-latency test: reorder decisions are made weekly, meaning daily batch processing already provides data 6 days before the decision is made — real-time adds cost without adding decision value. Domain 3 (Route Optimization) also fails: routes are finalized by 6:00 PM for the following day, next-day batch runs overnight, and fewer than 3% of deliveries require mid-route changes — the cost of real-time routing ($520,000 + $180,000/year) is catastrophic overprovisioning for a 3% exception rate. The CMA concept tested is that analytics architecture selection must be driven by the decision-making timeline, not by the availability of real-time technology — a core principle of technology investment governance.",
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
    "QuestionID": "P1-F-069",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Adding Inventory Replenishment (Domain 2) to the real-time scope along with Cold Chain Monitoring (Domain 1) exceeds the CFO's $500,000 implementation cap ($380,000 + $620,000 = $1,000,000 — double the budget). But even if budget were not a constraint, there is no documented business case for real-time inventory data: reorder decisions are made weekly. Real-time inventory data arriving at 3:47 PM on Tuesday is consumed in a decision process that runs on Friday — the real-time data sits unused for 52+ hours before the decision is made. This violates the decision-latency principle: if the decision process runs weekly, the data delivery frequency should match the decision frequency. Daily batch processing provides 100% of the decision-useful data at 0% of the real-time premium. The correct allocation targets real-time investment exclusively at the domain where decision latency caused a demonstrated financial loss.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Deploying real-time streaming for all three domains creates a uniform architecture that is easier to manage and certainly provides the most complete supply chain visibility. However, this approach ignores the fundamental question: does the DECISION being supported need real-time data? Inventory replenishment decisions are made weekly — receiving real-time inventory data on Tuesday for a decision that will be made on Friday provides zero additional decision value over daily batch. Route optimization decisions are made the evening before delivery — a real-time feed of traffic data at 10:00 AM for routes that were locked at 6:00 PM the previous day has no decision impact. The total cost of $1,520,000 exceeds the CFO's $500,000 cap by 3×, requiring budget reallocation from other initiatives. The governance principle is that technology architecture should be driven by business requirements, not technology capability — 'because we can' is not a valid justification for real-time investment.",
    "ExplanationWrongD": "Increasing the Cold Chain Monitoring refresh frequency from 4 hours to 15 minutes seems like a pragmatic, low-cost solution to the detection gap. However, the cooling unit failure was detected 4 hours late because the analytics dashboard REFRESHED every 4 hours — increasing the refresh to 15 minutes reduces the detection window but does not eliminate it. If the cooling unit fails at 2:03 PM and the dashboard refreshes at 2:00, 2:15, 2:30, and 2:45 PM, the failure is still not detected until the 2:15 PM refresh (12 minutes later) at best, and the 2:45 PM refresh (42 minutes later) at worst. For pharmaceutical cold chain storage where product begins degrading within minutes of temperature excursion, even a 15-minute detection window may be unacceptable. More importantly, this option does not specify the cost or technical feasibility of increasing IoT sensor polling from every 15 minutes to near-continuous polling — the 2,400 sensors may not be capable of the required polling frequency without hardware replacement. A 'faster batch' approach is not the same as a real-time streaming architecture and may not be achievable with the existing sensor infrastructure.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.070 data lake governance",
    "MicroTopic": "data lake governance",
    "UniqueConceptKey": "F-070-data-lake-governance",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Pioneer Analytics' Chief Data Officer is reviewing data lake ingestion quality across five source systems feeding the enterprise analytics platform: (Source-1) Point-of-Sale — completeness 99.1%, timeliness (avg delay: 12 min, SLA: 15 min), schema conformance 99.7%, daily volume 2.4M records; (Source-2) Web clickstream — completeness 94.5%, timeliness (avg delay: 8 min, SLA: 10 min), schema conformance 96.2%, daily volume 18M records; (Source-3) Inventory management — completeness 97.8%, timeliness (avg delay: 4.2 hours, SLA: 30 min), schema conformance 91.0%, daily volume 450K records; (Source-4) Customer service tickets — completeness 99.4%, timeliness (avg delay: 3 min), schema conformance 99.9%, daily volume 8,200 records; (Source-5) IoT sensor telemetry — completeness 88.3%, timeliness (avg delay: 2 min), schema conformance 85.5%, daily volume 72M records. The CDO has $400K to invest in data quality improvement and needs to prioritize the source that most degrades enterprise analytics reliability. Which source should be prioritized?",
    "Choices": {
      "A": "IoT sensor telemetry (Source-5) — at 88.3% completeness and 85.5% schema conformance, it has the worst quality metrics across dimensions and the highest daily volume amplifies each quality defect",
      "B": "Inventory management (Source-3) — the 4.2-hour average data delay against a 30-minute SLA means analytics dashboards are operating on data that is 7.5 hours stale, directly impacting supply chain decisions made from the analytics platform",
      "C": "Web clickstream (Source-2) — at 94.5% completeness with 18M daily records, the absolute number of missing or malformed records (~990K per day) is the largest raw count of source",
      "D": "Point-of-Sale (Source-1) — as the revenue-recording system, even small quality issues have disproportionate financial impact, and the 0.9% completeness gap could represent missing revenue transactions"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Inventory management (Source-3) should be prioritized. The critical metric is timeliness: a 4.2-hour average delay against a 30-minute SLA means the analytics platform is consuming inventory data that is, on average, 7.5× the acceptable latency. In operational terms, this means the supply chain dashboard may show stock levels, reorder points, and fulfillment status that are hours out of date — a warehouse could stock out, and the analytics platform would not reflect it until 4+ hours later. For a supply-chain-intensive business, stale inventory data directly causes stockouts, excess ordering, and misallocated logistics resources. While IoT telemetry (Choice A) has worse quality scores, IoT data is typically used for predictive maintenance and operational monitoring where timeliness is prioritized over completeness. Web clickstream (Choice C) has large absolute defect counts but clickstream analytics tolerate some data loss without material business impact. POS (Choice D) has the second-best quality metrics overall. Inventory's timeliness failure is the most operationally consequential because inventory management decisions depend on current data — stale inventory data has zero decision value.",
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
    "QuestionID": "P1-F-070",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "IoT sensor telemetry does have the worst completeness (88.3%) and schema conformance (85.5%), and at 72M daily records, each percentage point of quality loss represents 720,000 records. However, IoT analytics are typically designed for signal extraction from noisy data — a 12% data loss rate is often within the designed tolerance of predictive maintenance and operational monitoring algorithms. The quality metrics, while the worst, do not render the data unusable. By contrast, inventory data that is 4+ hours stale (Source-3) is operationally useless for real-time supply chain decisions. Quality must be evaluated in the context of how the data is used, not just absolute scores.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Web clickstream at 94.5% completeness loses approximately 990,000 records per day — the largest absolute defect count. However, clickstream analytics (user behavior, conversion funnels, A/B testing) are inherently statistical — conclusions are drawn from samples and trends, not individual records. Losing 5.5% of clickstream data may reduce statistical precision slightly but does not invalidate the analytics. Additionally, clickstream is the second-best performer on timeliness (8 min average, within SLA). The large absolute defect count is a function of the high volume (18M/day), not a high error rate. Inventory's timeliness failure is more consequential despite lower absolute defect counts.",
    "ExplanationWrongD": "Point-of-Sale data has excellent quality metrics: 99.1% completeness (second-best), 99.7% schema conformance (second-best), and 12-minute timeliness (within the 15-minute SLA). The 0.9% completeness gap translates to approximately 21,600 potentially missing transactions per day out of 2.4M — this is within normal operational tolerance for a POS system, where batch reconciliation processes catch and correct missing records during the daily close. Recommending the source with the second-best overall quality as the first investment priority misreads the metrics and would leave the genuine operational problem (inventory timeliness) unaddressed.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.071 unstructured data analysis",
    "MicroTopic": "unstructured data analysis",
    "UniqueConceptKey": "F-071-unstructured-data-analysis",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quartz is evaluating unstructured data analysis in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It eliminates the need for controls because technology is automated",
      "B": "Unstructured data analysis extracts insight from text, images, audio, or other non-tabular data",
      "C": "It should be documented only after an audit exception occurs",
      "D": "It is primarily a Part 2 capital budgeting calculation"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Unstructured data analysis extracts insight from non-tabular sources such as text, images, audio, emails, contracts, or service notes. It differs from ordinary spreadsheet or database analysis because the data usually need parsing, classification, or interpretation before use.",
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
    "QuestionID": "P1-F-071",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Automation does not eliminate controls; unstructured data still requires quality checks, privacy controls, and interpretation.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Analysis methods and controls should be defined before relying on outputs, not documented only after an audit exception.",
    "ExplanationWrongD": "Capital budgeting is unrelated to analyzing unstructured data sources.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.072 natural language processing use",
    "MicroTopic": "natural language processing use",
    "UniqueConceptKey": "F-072-natural-language-processing-use",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F4",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Riverview is evaluating natural language processing use in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "It eliminates the need for controls because technology is automated",
      "C": "It is primarily a Part 2 capital budgeting calculation",
      "D": "NLP can analyze text such as service notes, contracts, or customer complaints"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Natural language processing applies analytics to text, such as service notes, contracts, customer complaints, or policy documents. In finance transformation, NLP can help classify, summarize, or detect patterns in text, but results still require governance and validation.",
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
    "QuestionID": "P1-F-072",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "NLP use and controls should be documented before reliance, not only after an audit exception.",
    "ExplanationWrongB": "Automation does not eliminate controls; NLP outputs can be incomplete, biased, or misclassified without validation.",
    "ExplanationWrongC": "Capital budgeting is unrelated to text analytics and NLP use cases.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.073 optical character recognition invoice",
    "MicroTopic": "optical character recognition invoice",
    "UniqueConceptKey": "F-073-optical-character-recognition-invoice",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Summit is evaluating optical character recognition invoice in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "OCR converts scanned or image-based documents into machine-readable text",
      "B": "It should be documented only after an audit exception occurs",
      "C": "It eliminates the need for controls because technology is automated",
      "D": "It is primarily a Part 2 capital budgeting calculation"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Optical character recognition converts scanned or image-based documents, such as invoices, into machine-readable text. OCR can speed data capture, but finance teams still need validation controls because extraction errors can affect payments or records.",
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
    "QuestionID": "P1-F-073",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "OCR controls should be defined before use in invoice processing, not documented only after an audit exception.",
    "ExplanationWrongC": "Automation does not eliminate controls; OCR output can contain recognition errors that require validation or exception handling.",
    "ExplanationWrongD": "Capital budgeting is unrelated to OCR data capture in finance processes.",
    "question_state": "Certified",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.074 workflow automation approval",
    "MicroTopic": "workflow automation approval",
    "UniqueConceptKey": "F-074-workflow-automation-approval",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Titan is evaluating workflow automation approval in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It is primarily a Part 2 capital budgeting calculation",
      "B": "It should be documented only after an audit exception occurs",
      "C": "Workflow automation routes approvals and captures evidence according to rules",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Workflow automation routes approvals and captures evidence according to configured rules. In finance processes, it can improve consistency and audit trails, but approval rules, access rights, and exception handling still require control oversight.",
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
    "QuestionID": "P1-F-074",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Capital budgeting is unrelated to automated approval routing and workflow-control evidence.",
    "ExplanationWrongB": "Workflow rules and approval evidence should be designed before reliance, not documented only after an audit exception.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Automation does not eliminate controls; workflow rules, access, overrides, and exceptions still need review.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.075 electronic records retention",
    "MicroTopic": "electronic records retention",
    "UniqueConceptKey": "F-075-electronic-records-retention",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Umbra is evaluating electronic records retention in a finance transformation project. Which response is most appropriate?",
    "Choices": {
      "A": "It should be documented only after an audit exception occurs",
      "B": "Electronic records retention should follow policy, legal requirements, and secure disposal rules",
      "C": "It is primarily a Part 2 capital budgeting calculation",
      "D": "It eliminates the need for controls because technology is automated"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Electronic records retention should follow company policy, legal requirements, and secure disposal rules. Finance records must be retained long enough to support reporting, audit, and compliance needs, but disposed of securely when retention ends.",
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
    "QuestionID": "P1-F-075",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Retention policies should be established before records are created and stored, not documented only after an audit exception.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Capital budgeting is unrelated to electronic records retention and disposal governance.",
    "ExplanationWrongD": "Automation does not eliminate retention risk; automated records still need retention schedules, legal-hold handling, and secure disposal.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  }
];