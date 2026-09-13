const MCQ_BANK_C_PART_41 = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.011 COSO Principle 7 — risk severity — inherent vs. residual risk after control failure",
    "MicroTopic": "Inherent vs. residual risk assessment",
    "UniqueConceptKey": "E-C011-inherent-residual-risk",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Westbrook Health System operates a pharmacy narcotics tracking system across six hospitals. The automated reconciliation control does not flag discrepancies for quantities under 50 units per transaction. The enterprise risk assessment rated narcotics diversion risk as Low - Residual based on the assumption that the monthly physical inventory audit would identify cumulative discrepancies. An internal audit revealed that $340,000 in Schedule II narcotics — approximately 17,000 dosage units — were unaccounted for over 14 months, with individual transactions averaging 38 units each, systematically below the threshold. The pharmacy director asserts the risk assessment was correct because the detective control was supposed to catch this. Which best evaluates whether the risk assessment properly distinguished inherent from residual risk?",
    "Choices": {
      "A": "The risk assessment was correct because the residual rating reflected the existence of the monthly inventory audit, and the loss resulted from audit execution failure.",
      "B": "The assessment properly distinguished inherent from residual risk. The $340,000 loss demonstrates that no control system can eliminate risk, consistent with COSO's reasonable assurance.",
      "C": "The assessment failed because it treated the detective control as fully effective without evaluating whether a monthly count could realistically detect small-quantity discrepancies aggregating across six facilities. The Low rating was based on an invalid assumption about control effectiveness.",
      "D": "The error was that inherent risk was understated. Narcotics diversion should have been rated High - Inherent regardless of compensating controls."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "COSO Principle 7 requires organizations to identify and assess risks. A critical component is the distinction between inherent risk and residual risk. Westbrook's assessment failed because it conflated the existence of a control with the effectiveness of that control. It assumed the monthly audit would detect small discrepancies, but did not evaluate whether: (1) a monthly detective control can identify transactions deliberately structured below a known 50-unit threshold; (2) cumulative discrepancies across six facilities can be detected by a single monthly count; (3) the 14-month gap indicates continuous control failure. The residual risk rating assumed the control was effective when it was structurally incapable of addressing the specific risk vector.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-011",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice treats the existence of a compensating control as sufficient for a Low rating, without evaluating design effectiveness. The monthly audit was structurally incapable of detecting the fraud pattern — transactions below 50 units, aggregated across facilities over 14 months. A control that cannot detect the very risk it addresses does not warrant a low residual risk rating, regardless of whether it exists on paper.",
    "ExplanationWrongB": "COSO's reasonable assurance presumes controls are designed to be effective. When a risk assessment rates residual risk as Low because of a detective control structurally incapable of detecting the fraud vector, the control design was never adequate to provide reasonable assurance. A monthly count that misses 17,000 units over 14 months is not providing reasonable assurance under COSO Principle 7.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This misidentifies the locus of error. The inherent risk rating may be correct — the failure is in residual risk evaluation. The risk assessment's error was assuming the detective control was effective when it could not detect transactions below the known system threshold. This is a residual risk assessment failure, not an inherent risk assessment failure.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.012 COSO Principle 3 — organizational structure — decentralized operations and control consistency",
    "MicroTopic": "Decentralized control consistency across operating units",
    "UniqueConceptKey": "E-C012-decentralized-control-consistency",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "GlobalMart Retail operates in 12 countries with a decentralized model where each country GM designs local control procedures. A fraud investigation uncovered that three Southeast Asian country GMs colluded to authorize $1.8M in payments to shell companies they controlled. Each had set local approval thresholds at $500,000 (far above the $50,000 corporate guideline), eliminated vendor verification as administratively burdensome, and routed payments through a shared services center that relied on local manager attestations without independent verification. The corporate controller defends the structure, stating COSO encourages tailoring controls to local operating environments. Under COSO Principle 3, which best evaluates the control environment weakness?",
    "Choices": {
      "A": "The controller's position is defensible because COSO Principle 3 endorses decentralized control design, and the fraud reflects individual misconduct.",
      "B": "The primary failure is that the shared services center did not independently verify vendor legitimacy. Once strengthened, the structure is compliant.",
      "C": "GlobalMart's structure is compliant because corporate guidelines existed. The managers' failure to comply is an operating effectiveness issue, not design.",
      "D": "The organizational structure failed because it delegated control design authority to country managers without ensuring that local procedures operated within corporate-defined boundaries. COSO Principle 3 requires that delegated authority be exercised within established parameters."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "COSO Principle 3 requires management to establish structures, reporting lines, and appropriate authorities and responsibilities. The principle's points of focus include defining, assigning, and limiting authorities. GlobalMart's structure failed because it delegated control design authority without boundaries and monitoring. While COSO acknowledges tailoring controls to local environments, this does not mean each unit can override corporate standards. The key deficiency: country managers could raise thresholds 10x above guidelines without escalation, eliminate controls entirely, and route payments through a center relying on their own attestations — creating a self-certifying control loop.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-012",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "COSO Principle 3 does not endorse unfettered decentralized design. The principle requires authorities to be defined, assigned, and limited. The defense conflates tailoring (adjusting within boundaries) with abdication (allowing managers to set thresholds 10x above guidelines and eliminate core controls). When a structure permits systematic circumvention without detection, the structure itself is the control deficiency.",
    "ExplanationWrongB": "This isolates the failure to a single point. The shared services center's reliance on local attestations was a design feature of the structure, not an independent failure. Even with independent verification, the structural problem remains: country managers could eliminate local controls and set far-higher thresholds without escalation or monitoring.",
    "ExplanationWrongC": "The distinction between design and operating effectiveness is misapplied. COSO Principle 3 addresses structural design. The structure permitted local managers to override corporate guidelines without escalation — this is a design deficiency. When three managers independently circumvent controls over an extended period without detection, the structure is poorly designed, not just poorly operated.",
    "ExplanationWrongD": "",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.013 COSO Principle 17 — monitoring — continuous vs. periodic evaluation after ERP migration",
    "MicroTopic": "COSO Principle 17 — monitoring after ERP change",
    "UniqueConceptKey": "E-C013-monitoring-erp-migration",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beacon Manufacturing migrated to a new ERP system 8 months ago. The project team disbanded after go-live. No one has reviewed whether the automated three-way match control (purchase order, receiving report, vendor invoice) still operates correctly in the new system. An AP clerk discovers that the new ERP receiving module does not populate a required field, causing the three-way match to auto-approve all invoices regardless of discrepancies. $280,000 in duplicate payments have been processed. Which COSO principle was most directly violated?",
    "Choices": {
      "A": "COSO Principle 1 — the control environment failed because management did not establish a culture that emphasizes the importance of internal control over financial reporting.",
      "B": "COSO Principle 17 — the organization failed to evaluate whether existing controls continued to function as intended after a significant system change.",
      "C": "COSO Principle 7 — the risk assessment process failed to identify ERP migration as a risk event requiring specific control validation.",
      "D": "COSO Principle 10 — the control activities were improperly designed because the three-way match relied on a field that the new ERP could not populate."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under COSO Principle 17 (Ongoing and/or Separate Evaluations), organizations must evaluate whether internal controls continue to function as intended, particularly after significant changes to systems or processes. Beacon Manufacturing's ERP migration was a major system change that should have triggered both ongoing monitoring and separate evaluations of automated controls. The project team's disbandment after go-live without any post-implementation control testing represents a fundamental monitoring gap. The three-way match control — an automated preventive control designed to prevent duplicate payments — was silently failing for 8 months because no one verified it operated correctly in the new ERP environment. COSO Principle 17 specifies that evaluations should be performed by personnel with sufficient objectivity and competence, and the frequency and scope should be commensurate with the significance of the change. A new ERP implementation is one of the highest-risk system changes an organization can undergo, warranting intensive post-implementation control validation. In practice, management accountants should ensure that every significant system migration includes a formal post-implementation control review as part of the project plan, not as an afterthought.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-013",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly attributes the failure to the control environment (COSO Principle 1). While the control environment establishes the tone for the organization, there is no evidence that Beacon's management failed to demonstrate a commitment to integrity or accountability. The scenario describes a specific breakdown in evaluating whether an automated control continued to operate correctly after a system change — this is a monitoring deficiency under Principle 17, not a control environment failure.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C incorrectly identifies this as a risk assessment failure. Under COSO Principle 7, organizations must identify risks to the achievement of objectives. While Beacon arguably should have identified ERP migration as a risk event requiring control validation, the scenario indicates the migration was completed — the defect is that no one subsequently evaluated whether the migrated control was still functioning. The risk assessment might have been adequate (the migration was planned and executed), but the monitoring activities after the change were missing. This is a post-change evaluation failure under Principle 17, not a pre-change risk identification failure under Principle 7. The temporal distinction — before versus after the change — is the critical differentiator.",
    "ExplanationWrongD": "Option D incorrectly characterizes this as a control activities failure. Under COSO Principle 10 (Selects and Develops Control Activities), the three-way match control was properly designed and selected — it worked correctly in the legacy system. The failure is that the organization did not evaluate the control after the system change to confirm it still functioned as designed. This is a monitoring deficiency (Principle 17), not a control activities deficiency (Principle 10). The auto-approval was caused by a data field issue introduced during migration, not by an inherent flaw in the control design.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.014 fraud triangle elements",
    "MicroTopic": "fraud triangle elements",
    "UniqueConceptKey": "E-C014-fraud-triangle-elements",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E4",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Nightingale's internal auditors assess opportunity, pressure, and rationalization when evaluating fraud risk in a department. What model are they applying?",
    "Choices": {
      "A": "The five forces model",
      "B": "The fraud triangle",
      "C": "The balanced scorecard",
      "D": "The COSO ERM cube"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the COSO Internal Control—Integrated Framework, information about fraud risk gathered through the fraud triangle supports the Risk Assessment component (Principles 6–9). The fraud triangle frames fraud risk around pressure, opportunity, and rationalization. Internal auditors use these factors to assess where fraud could occur and which controls should reduce opportunity or improve detection. Organizations use the fraud triangle alongside COSO's Risk Assessment component to evaluate the likelihood and impact of fraudulent financial reporting.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework overview",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-014",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "The five forces model is a competitive strategy framework for analyzing industry profitability, not a fraud-risk assessment model. The stem describes evaluating opportunity, pressure, and rationalization — the fraud triangle's three elements.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The balanced scorecard links performance measures to strategy across financial, customer, internal process, and learning perspectives. It does not assess fraud conditions using the pressure-opportunity-rationalization framework.",
    "ExplanationWrongD": "COSO ERM addresses enterprise risk management broadly, but the specific three-factor fraud model in the stem is the fraud triangle.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.015 COSO Principle 14 — internal communication — control deficiency escalation to board",
    "MicroTopic": "COSO Principle 14 — control deficiency escalation",
    "UniqueConceptKey": "E-C015-communication-escalation",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The internal audit director at Pinnacle Financial identified a material weakness in loan loss reserve estimation 7 months ago. The CFO instructed her to handle it at the operational level and not include it in the audit committee package. The director complied. The weakness was discovered by regulators during a routine exam, resulting in a consent order. Evaluate the internal control failure under the COSO framework.",
    "Choices": {
      "A": "The failure is primarily a control environment deficiency because the board of directors failed to exercise proper oversight of the financial reporting process.",
      "B": "The failure is primarily a monitoring deficiency because internal audit did not perform adequate ongoing evaluations of loan loss estimation procedures.",
      "C": "The failure is primarily a communication deficiency under COSO Principle 14 because material control deficiencies were not communicated to those charged with governance.",
      "D": "The failure is primarily a risk assessment deficiency because the organization did not identify changes in the lending portfolio that created the material weakness."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under COSO Principle 14 (Communicates Internally), the organization must communicate to the board of directors matters of significance relating to internal control. The CFO's instruction to the internal audit director to suppress a material weakness finding from the audit committee package represents a direct violation of this principle. COSO Principle 14 explicitly requires that relevant and timely information about internal control deficiencies be communicated to those parties responsible for taking corrective action and to those charged with governance — specifically the board or audit committee. When the CFO instructed the internal audit director to handle it at the operational level, the CFO was effectively blocking the communication channel between internal audit and the board. The IIA Standards (Standard 2060) similarly require the chief audit executive to report periodically to the board on significant risk exposures and control issues. The regulator's discovery of the material weakness 7 months later — and the resulting consent order — illustrates the consequence of this communication breakdown. In practice, management accountants and internal auditors must understand that the internal audit function's reporting line to the board is a fundamental governance safeguard that cannot be overridden by operational management, regardless of title.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-015",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly identifies this as a control environment failure. The board was never informed of the material weakness because the CFO deliberately suppressed the finding, preventing the board from exercising its oversight function. The board cannot oversee what it does not know. The root cause is the communication blockage (Principle 14), not a control environment deficiency in board oversight.",
    "ExplanationWrongB": "Option B incorrectly characterizes this as a monitoring failure. Under COSO Principle 16, internal audit did perform monitoring — the director identified the material weakness and communicated it to management. The monitoring activity functioned correctly. The breakdown occurred when the CFO suppressed the finding, preventing the monitoring results from reaching the board. This is a communication deficiency under Principle 14, not a monitoring deficiency under Principle 16.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D incorrectly attributes the failure to risk assessment. The material weakness was already identified — the internal audit director found it. The failure is in communicating that identified risk upward to the board, which falls under Principle 14 (internal communication). Risk assessment addresses identification and analysis of risks; communication addresses the flow of information to the right parties.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.016 COSO Principle 13 — information quality — data integrity after system integration",
    "MicroTopic": "COSO Principle 13 — data integrity after integration",
    "UniqueConceptKey": "E-C016-information-quality-integration",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Two divisions of Orion Logistics were merged and their legacy inventory systems were integrated via a custom middleware layer. Fourteen months post-integration, a physical count reveals that 22% of SKU records have quantity discrepancies exceeding 30% between the integrated system and physical counts. The root cause: the middleware truncates item descriptions over 80 characters, causing records with long descriptions to be silently dropped during synchronization. Which COSO principle was most directly violated?",
    "Choices": {
      "A": "COSO Principle 13 — the organization failed to obtain and use relevant, quality information to support internal control functioning because the middleware corrupted inventory data during integration.",
      "B": "COSO Principle 10 — the organization failed to establish adequate control activities, specifically reconciliation procedures, to detect the inventory quantity discrepancies after integration.",
      "C": "COSO Principle 16 — the organization failed to conduct ongoing monitoring that would have detected the 22% inventory discrepancy within a reasonable time after the system integration.",
      "D": "COSO Principle 14 — the organization failed to communicate internally because the middleware truncation issue was not communicated to operational management or IT after the integration."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under COSO Principle 13 (Uses Relevant and Quality Information), the organization must obtain, generate, and use relevant, quality information to support the functioning of internal controls. The middleware truncation defect at Orion Logistics caused systematic, silent data loss — 22% of SKU records had quantity discrepancies exceeding 30% between the integrated system and physical reality because records with long item descriptions were dropped during synchronization. This is a failure of information quality, specifically the completeness and accuracy dimensions. COSO Principle 13 requires that information be accurate (free from error), complete (contains all relevant data), and current. The truncation at 80 characters meant that records were not complete — they were entirely absent from the integrated system. Furthermore, the silent nature of the failure (no error logs, no alerts) violated the requirement that information processing be transparent and verifiable. In the context of system integration, management accountants must ensure that data mapping, transformation rules, and middleware configurations that affect financial records are tested for edge cases and that reconciliation controls exist to detect data loss after integration.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-016",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B incorrectly identifies this as a control activities failure. While a reconciliation control between the integrated system and physical counts could have detected the discrepancy earlier, the root cause is the information quality defect — the middleware silently dropping records. Control activities rely on quality information to function; when the underlying information is corrupted or incomplete, control activities cannot compensate. The primary deficiency is Principle 13 (information quality), not Principle 10 (control activities). Adding more controls would not fix the source data corruption.",
    "ExplanationWrongC": "Option C incorrectly characterizes this as a monitoring failure. While a properly designed monitoring program might have caught the 22% discrepancy sooner, the monitoring function would still rely on identifying that the integrated system data was inaccurate — the root cause is that the data itself was corrupted at the middleware layer. Monitoring evaluates whether controls are working; information quality ensures the data those controls consume is trustworthy.",
    "ExplanationWrongD": "Option D incorrectly attributes this to an internal communication failure. While the middleware truncation issue was not communicated to IT or operations, the primary problem is not that information about the defect failed to flow — it is that the information (the inventory records themselves) was destroyed during transfer. This is an information quality deficiency under Principle 13, not a communication breakdown under Principle 14.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.017 COSO ERM — risk response — evaluating accept vs. transfer for cyber insurance gap",
    "MicroTopic": "COSO ERM — cyber risk response evaluation",
    "UniqueConceptKey": "E-C017-risk-response-cyber",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E2",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Triton Technologies, a SaaS provider processing healthcare data, maintains a $2M cyber insurance policy with a $500K deductible. A ransomware attack encrypts patient data across 3 data centers. The ransom demand is $4.2M. The investigation reveals Triton had conducted a cyber risk assessment 9 months ago that identified this exact scenario (ransomware encrypting multi-region data centers) as moderate likelihood, catastrophic impact. Management's documented risk response was accept because the insurance policy was deemed adequate. The actual restoration cost (forensic investigation, system rebuild, regulatory notification, and business interruption) is $8.1M — exceeding both the insurance coverage and Triton's cash reserves. Evaluate whether management's risk response decision properly evaluated the accept vs. transfer options under COSO ERM.",
    "Choices": {
      "A": "The risk identification process was inadequate because Triton failed to identify the ransomware scenario in its risk assessment, leading to an unsupported risk response decision.",
      "B": "The risk response was inadequate because management should have selected avoidance — discontinuing healthcare data processing — given the catastrophic impact rating assigned to the ransomware scenario.",
      "C": "The risk response selection was adequate because management correctly used insurance to share risk; the problem was only that the policy limit was insufficient for the actual loss amount.",
      "D": "Management's risk response selection was inadequate because they accepted a catastrophic risk based on an incomplete evaluation of the true financial exposure — the residual retained risk exceeded the organization's capacity to absorb losses."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Management's risk response selection process was inadequate because they accepted a catastrophic risk based on an analysis that considered only direct insurance coverage limits, not the full spectrum of financial consequences including forensic investigation, system rebuild, regulatory penalties, and business interruption losses. Under COSO ERM (Enterprise Risk Management — Integrating with Strategy and Performance, 2017), risk response options — accept, avoid, pursue, reduce, and share (transfer) — must be evaluated against the organization's risk appetite and the full severity of the risk on an inherent and residual basis. Triton's risk assessment correctly identified the scenario but management's evaluation of the accept response was fundamentally flawed in three respects: (1) The residual risk after insurance (deductible plus excess over policy limit is $500K plus $6.1M equals $6.6M) exceeded Triton's cash reserves, meaning the organization could not absorb the loss; (2) The insurance policy at $2M covered only about 25% of the $8.1M actual loss, making the transfer response largely ineffective given the gap between coverage and exposure; (3) Management's documentation treated the insurance policy as a complete transfer of risk when in reality it was only a partial transfer — the retained risk was catastrophic. In practice, management accountants evaluating cyber risk must model total cost scenarios, not just ransom demand amounts, when recommending risk responses.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-017",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A is incorrect because the scenario indicates Triton did identify the risk. Their cyber risk assessment 9 months prior explicitly identified ransomware encrypting multi-region data centers as a specific scenario with moderate likelihood and catastrophic impact. The risk identification process functioned correctly. The failure occurred in the subsequent step — evaluating which risk response to apply. Management chose the wrong response based on incomplete analysis.",
    "ExplanationWrongB": "Option B is incorrect because avoidance — ceasing to process healthcare data — would be an extreme response that abandons Triton's core business model as a healthcare SaaS provider. COSO ERM does not require cessation of business activities simply because risks exist; it requires proportionate risk responses. The appropriate response for a catastrophic-impact, moderate-likelihood risk is typically a combination of reduction (enhanced cybersecurity controls) and transfer (adequate insurance coverage), not avoidance.",
    "ExplanationWrongC": "Option C is incorrect because it suggests the risk response selection was adequate — merely that the insurance coverage was insufficient. This confuses the risk response evaluation with the implementation of the response. Accepting a risk with catastrophic consequences when the residual exposure of $6.6M exceeds the organization's capacity to absorb is not an adequate risk response, regardless of the insurance policy. The inadequacy of the insurance should have been identified during the evaluation process before accept was selected.",
    "ExplanationWrongD": "",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.018 COSO Principle 9 — fraud risk — override of controls by senior management",
    "MicroTopic": "COSO Principle 9 — management override of controls",
    "UniqueConceptKey": "E-C018-fraud-risk-override",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The CEO of Sterling Pharmaceuticals directed the controller to record $3.1M in revenue from a consignment arrangement with a distributor where the product could be returned for full credit at any time. The controller noted that ASC 606 prohibits revenue recognition for consignment arrangements but the CEO responded, 'I'm ordering you to book it. This deal is critical to hitting our quarterly guidance.' The controller complied after the CEO promised to take full responsibility. Three weeks after quarter-end, the distributor returned 94% of the product. Evaluate the control failure under COSO Principle 9.",
    "Choices": {
      "A": "The failure is a control environment deficiency under COSO Principle 1 because the CEO did not demonstrate a commitment to integrity and ethical values in the revenue recognition decision.",
      "B": "The failure is a fraud risk deficiency under COSO Principle 9 because the organization lacked controls to prevent management override of the controller's correct revenue recognition determination.",
      "C": "The failure is a monitoring deficiency under COSO Principle 16 because the organization's review procedures failed to detect the improper revenue entry within the quarterly reporting period.",
      "D": "The failure is an information and communication deficiency under COSO Principle 14 because the controller did not communicate the improper revenue recognition to the audit committee or external auditors."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under COSO Principle 9 (Identifies and Analyzes Significant Change that Could Impact Internal Controls, with a specific focus on fraud risk), the organization must consider the potential for fraud in assessing risks to the achievement of objectives, and specifically must consider how fraud could occur. A key sub-element of Principle 9 is the consideration of management override of controls — the risk that senior management may circumvent established policies and procedures for personal gain or to meet stakeholder expectations. The CEO's demand to record revenue from a consignment arrangement directly violates ASC 606's core principle that revenue is recognized when control transfers to the customer. In a consignment arrangement, the distributor holds inventory that can be returned for full credit at any time — control has not transferred, and revenue recognition is explicitly prohibited. The CEO's statement 'I'm ordering you to book it' combined with the promise to 'take full responsibility' is a textbook example of management override: the controller identified the correct accounting treatment, the CEO overruled it, and the CEO used positional authority to pressure the controller into compliance. The 94% return rate confirms the transaction lacked economic substance. In practice, Principle 9 requires organizations to establish controls specifically designed to prevent management override, including whistleblower hotlines, mandatory audit committee review of significant non-standard journal entries, and a strong control environment that empowers controllers to escalate concerns to the board.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-018",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly attributes this to a control environment failure. While the CEO's behavior indicates a severe ethical failure, COSO specifically addresses management override of controls for fraudulent purposes under Principle 9 (fraud risk assessment), not under the control environment principles. The distinction is important: Principle 1 establishes the overall ethical culture; Principle 9 specifically requires the organization to separately assess the risk of management override of controls. The conduct here is so specifically a fraud risk — deliberate override of accounting standards to meet earnings targets — that COSO's separate principle for fraud risk (Principle 9) is the more precise answer.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C incorrectly characterizes this as a monitoring failure. The controller identified the issue but was overruled, indicating that the detection mechanism worked but the escalation path and anti-override safeguards did not. Monitoring detects control failures; Principle 9 establishes the controls and escalation pathways that prevent override in the first place. The distinction is between detecting a problem after it occurs and preventing the override from succeeding.",
    "ExplanationWrongD": "Option D incorrectly identifies this as an information and communication failure. The controller did communicate the correct accounting treatment to the CEO, so communication within the function was technically adequate — the right information was transmitted. The failure is that the CEO used positional authority to override this communication, which is a fraud risk issue under Principle 9, not a communication breakdown.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.019 COSO Principle 17 -- monitoring deficiency aggregation -- severity classification and reporting thresholds",
    "MicroTopic": "Monitoring deficiency aggregation and reporting thresholds",
    "UniqueConceptKey": "E-C019-monitoring-deficiency-aggregation",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Novara Financial Services operates three business lines — retail banking, wealth management, and commercial lending — each independently rated as low-risk by the internal control monitoring function. Over the past six quarters, the internal audit team has identified the same IT access control weakness in all three divisions: temporary contractor accounts that remain active an average of 42 days after contract termination. Each division's quarterly monitoring report classifies the finding as \"low severity\" because the exposure per account is below $5,000 and no actual loss has been recorded. However, when aggregated across the three divisions, 127 dormant accounts with cumulative transaction exposure of $1.8 million remain active. Novara COSO monitoring framework requires escalation only for \"high\" or \"critical\" severity findings. Under COSO Principle 17, which of the following best describes the monitoring deficiency at Novara?",
    "Choices": {
      "A": "The monitoring framework is functioning as designed because each finding was correctly classified as low severity at the business-line level under the organization's established criteria.",
      "B": "Novara's monitoring frequency is inadequate and should be increased from quarterly to monthly to detect the access control weakness earlier in the contractor lifecycle.",
      "C": "The organization's monitoring process fails to evaluate the aggregated significance of related deficiencies identified across the entity, which may collectively represent a material weakness despite being individually classified as low severity.",
      "D": "The internal audit function should be replaced by an external firm because the monitoring evaluations produced inconsistent severity ratings across the three business lines."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "COSO Principle 17 requires the organization to evaluate and communicate internal control deficiencies in a timely manner to parties responsible for taking corrective action, including senior management and the board of directors as appropriate. A critical sub-element of this principle is that the organization must assess the significance of deficiencies not only individually but also in the aggregate. When related deficiencies exist across multiple business units, divisions, or processes, their combined effect may constitute a material weakness even if each individual finding is evaluated as low severity under existing thresholds. Novara's monitoring framework contains a structural gap: it classifies findings at the single-entity level using a fixed dollar threshold ($5,000 per account exposure), but has no mechanism to aggregate related findings across business lines before assigning a severity rating. The 127 dormant contractor accounts represent a systematic access control failure — exact same root cause, exact same control gap, repeated across three divisions. When aggregated, the $1.8 million in cumulative transaction exposure and the pattern of undetected accounts persisting an average of 42 days post-termination would reasonably warrant a \"high severity\" classification under any risk-based monitoring framework. In practice, a CMA candidate evaluating monitoring effectiveness should look for whether the organization assesses deficiency significance at the entity level, not merely at the business-unit or transaction level. The presence of a common root cause across multiple reporting units is a strong indicator that the monitoring framework needs to incorporate entity-level aggregation before severity classification.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-EC-019",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice incorrectly accepts the organization's existing severity classification framework as sufficient. COSO Principle 17's monitoring guidance explicitly states that deficiencies should be evaluated for their significance at the entity level, not merely within the reporting unit where they were identified. The fact that each business line followed Novara's established classification criteria does not mean the monitoring framework is effective — it means the criteria themselves are deficient because they lack an entity-level aggregation step. A monitoring process that systematically classifies recurring, related deficiencies as low severity due to a design gap in the aggregation methodology is precisely the kind of monitoring deficiency that COSO Principle 17 is intended to detect and correct.",
    "ExplanationWrongB": "This choice identifies a symptom (detection timing) rather than the root cause. While more frequent monitoring might detect contractor access issues sooner, the fundamental failure is not about timing — it is about the monitoring framework's inability to recognize that 127 instances of the same control failure constitute a systemic breakdown. Even monthly monitoring would still classify each finding as low severity under Novara's existing criteria, because the aggregation step is missing at every monitoring frequency. Increasing monitoring cadence without fixing the aggregation methodology would simply generate more low-severity findings that never trigger escalation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This choice proposes changing who conducts monitoring rather than addressing how monitoring conclusions are reached. The problem is not that internal audit produced inconsistent ratings — the ratings were consistent across all three divisions (all classified as low severity). The problem is that the severity classification methodology itself is defective because it cannot detect the aggregated significance of related deficiencies. Replacing internal audit with an external firm would produce the same outcome if the external firm applies the same entity-level severity criteria that lack an aggregation mechanism. COSO Principle 17 focuses on the quality and completeness of the monitoring evaluation process, not on who performs it.",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S52 Phase 4 — Analyze replacement for archived P1-EC-019 (DL-012 rotation clone)",
    "dl031_review_note": "Downgraded from Analyze->Apply — stem describes COSO Principle 17 deficiency aggregation scenario (DL-031)"
  }
];