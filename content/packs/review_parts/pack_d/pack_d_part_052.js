var MCQ_BANK_D_PART_52 = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.008 COSO Principle 10 — control activities — evaluating compensating controls after workforce reduction",
    "MicroTopic": "Compensating controls and workforce reduction",
    "UniqueConceptKey": "E-D008-compensating-controls-workforce",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Birchwood Financial Services, a registered investment advisor with $6.8B in assets under management, reduced its accounting department from 12 to 6 staff during an operational restructuring. The controller, Elaine Voss, eliminated the requirement that bank reconciliations be reviewed by a second person, reasoning that the remaining staff are the most senior and experienced — their judgment replaces formal review. The AP supervisor, Gerald Nash (a 19-year employee with an unblemished record), now approves vendor invoices, enters them into the AP system, and performs the monthly bank reconciliation — a consolidation of duties that previously required three separate individuals. The CFO approved the restructuring plan after the controller represented that compensating controls are in place. Six months later, an external audit discovers that Nash approved $340,000 in payments to a fictitious vendor. Which best evaluates whether the compensating control rationale was adequate under COSO Principle 10?",
    "Choices": {
      "A": "The compensating control rationale was inadequate because it relied on a single attribute — staff seniority and experience — as a substitute for structural segregation of duties. COSO Principle 10 requires that control activities be deployed through policies that establish what is expected and procedures that put policies into action. Seniority is not a compensating control; it is an attribute of the control operator. A genuine compensating control would be a detective mechanism such as independent review of the bank reconciliation, positive pay verification, or vendor master file change reports reviewed by someone outside AP.",
      "B": "The compensating controls were adequate because Nash's 19-year tenure and clean record provided a stronger control than formal segregation of duties — long-tenured, trusted employees are statistically less likely to commit fraud.",
      "C": "The restructuring was compliant because control activities remained in place — the same tasks were simply performed by fewer, more experienced people, and efficiency gains are a recognized benefit of internal control optimization.",
      "D": "The compensating controls were adequate for the six months post-restructuring but inadequate for the prior 12 months, meaning the controller's rationale was directionally correct but the restructuring should have been implemented earlier."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "COSO Principle 10 requires that the organization selects and develops control activities that contribute to the mitigation of risks to acceptable levels. Control activities are the actions established through policies and procedures — they cannot be assumed from general characteristics of the people operating within the system. When Birchwood consolidated three segregated duties (invoice approval, data entry, and bank reconciliation) into a single individual, it eliminated the structural separation that prevents and detects errors or fraud. The controller's compensating control — seniority and experience — substitutes a personnel attribute for a control activity, which COSO does not recognize. Experience may reduce unintentional error probability, but it does nothing to prevent or detect intentional fraud. Genuine compensating controls would include: independent review of the bank reconciliation monthly, positive pay verification of vendor banking details, monthly vendor master file change reports reviewed by someone outside AP, surprise audits of the AP function, or mandatory rotation of bank reconciliation duties.",
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
    "QuestionID": "P1-ED-008",
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
    "ExplanationWrongB": "Option B makes a statistically unsupported assumption. Research on occupational fraud (including the ACFE Report to the Nations) consistently finds that long-tenured, trusted employees commit the largest frauds precisely because their tenure grants them knowledge of control weaknesses and their trusted status reduces scrutiny. The trusted insider is the prototypical fraud perpetrator in organizations with weak segregation of duties, not an exception. COSO Principle 10 makes no distinction based on employee tenure — control activities must be designed for the risk, not calibrated to perceived trustworthiness.",
    "ExplanationWrongC": "Option C incorrectly conflates efficiency with control effectiveness. Control activities are not fungible — consolidating incompatible duties into a single role eliminates a fundamental control rather than optimizing it. The same tasks performed by fewer people argument only holds when tasks are compatible. Invoice approval, system data entry, and bank reconciliation are classically incompatible duties because the person who can authorize and record payments should not be the person who verifies that the cash balance is correct.",
    "ExplanationWrongD": "Option D fundamentally misunderstands the compensating control concept by inventing a spurious timeline distinction. The question is whether the compensating control rationale was adequate at all. If the rationale is inadequate, it is inadequate regardless of when the fraud occurred. The candidate who selects this option is mistakenly treating the timing of fraud detection as evidence about control design adequacy.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.009 coso principle 12 access control erp exceptions",
    "MicroTopic": "COSO Principle 12 — access control ERP exceptions",
    "UniqueConceptKey": "E-D009-coso-principle-12-access-control-erp-exceptions",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Kestrel Manufacturing implemented a new ERP system in January. During the go-live period, the IT project team granted temporary elevated system access to 31 users — including accounts payable clerks, inventory analysts, and production schedulers — to resolve transaction errors and complete data migration validations. The controller, Elisa Vance, expected these elevated privileges to be revoked within 60 days of go-live. In July, a routine internal audit revealed that 19 of the 31 users still retained their elevated access, including an accounts payable clerk whose elevated privileges allowed both vendor master file maintenance and invoice payment approval. The clerk had created a fictitious vendor, 'Meridian Industrial Supply,' and approved three invoices totaling $87,400 to that vendor. The controller's review confirmed that no user access recertification had been performed since go-live and that the ERP's role-based access controls did not prevent a single user from both creating a vendor record and approving payments to that vendor. Under COSO Principle 12 (deploys control activities through policies and procedures), which two IT general control failures directly enabled this fraud?",
    "Choices": {
      "A": "Failure to perform periodic user access reviews that would have identified and revoked the 19 stale elevated-privilege accounts, and failure to enforce segregation of duties — the AP clerk's retained elevated access permitted the same individual to create a vendor record and approve payment to that vendor, combining incompatible functions that should reside with different individuals.",
      "B": "Failure to complete a post-implementation review of the ERP project that would have assessed whether access controls were functioning as designed, and failure to maintain an immutable audit log of privileged-user activity during and after the go-live period.",
      "C": "Failure to terminate temporary access upon ERP stabilization within the controller's expected 60-day window, and failure to configure the ERP's role-based access controls to prohibit AP clerks from accessing the vendor master file maintenance module.",
      "D": "Failure to require the controller's written approval for each individual elevated-access grant, and failure to reconcile the approved vendor master file against an authorized vendor listing before releasing payment to a newly created vendor record."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "COSO Principle 12 requires management to deploy control activities — the policies and procedures that ensure management's directives to mitigate risks are carried out — through IT general controls (ITGCs) and application controls. Two ITGC failures are evident in this scenario. First, the failure to perform periodic user access reviews (access recertification): ITGCs require that user access rights be periodically reviewed and validated against current job responsibilities. The 19 users still holding elevated access six months after go-live, with zero recertification performed, constitutes an access management control failure. Had a quarterly access review been conducted, the stale elevated privileges would have been identified, and the AP clerk's inappropriate access would have been revoked before the fraud occurred. Second, the failure to enforce segregation of duties (SoD) through access controls: ITGCs must enforce SoD rules that prevent a single user from performing incompatible functions. The AP clerk's elevated access permitted both vendor master file creation and invoice payment approval — two duties that must be segregated to prevent an employee from creating a fictitious vendor and then approving payments to it. The ERP's role-based access controls should have been configured to detect and prevent this SoD conflict, but they were not. Together, these two ITGC failures — no access recertification and no SoD enforcement — created the control gap that the AP clerk exploited. The controller's awareness that elevated access should be temporary does not substitute for the ITGCs that should have operationalized that policy.",
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
    "QuestionID": "P1-ED-009",
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
    "ExplanationWrongB": "A post-implementation review assesses whether the ERP project met its objectives, timeline, and budget — it is a project-governance activity, not a recurring IT general control. While such a review might note access control deficiencies, it would not have prevented the fraud, which occurred months after go-live due to ongoing failures in access management. Audit logging of privileged user activity is a detective control useful for forensic investigation, but the scenario describes preventive failures: access that should not have existed was neither identified nor removed, and incompatible duties were not segregated. Audit logs cannot prevent a fraud that occurs because access controls were never configured to block it.",
    "ExplanationWrongC": "This option identifies the correct proximate cause — temporary access was not terminated — but substitutes an operational expectation (the controller's 60-day window) for the systemic ITGC failure. COSO Principle 12 requires formal, recurring access reviews as a control activity, not reliance on an ad hoc expectation that temporary access will be removed. Furthermore, the suggestion that the ERP's role-based access controls should simply block AP clerks from the vendor master module addresses the symptom but not the principle: the core SoD failure is that one individual could both create a vendor and approve its payment, regardless of which specific system module enabled each function.",
    "ExplanationWrongD": "Requiring the controller's written approval for each elevated-access grant is a manual compensating control that does not address the systemic ITGC gaps. At scale, 31 individual approvals become administrative overhead without ensuring timely revocation. More critically, the suggestion to reconcile the vendor master file to an authorized listing is a detective control that operates after payment — the fraud had already occurred. A stronger control design would prevent a single user from executing both sides of an incompatible transaction in the first place, rather than detecting the result afterward. Both proposals treat symptoms rather than the root ITGC failures.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.010 access control least privilege",
    "MicroTopic": "access control least privilege",
    "UniqueConceptKey": "E-D010-access-control-least-privilege",
    "LOSTag": "P1-E Internal controls",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniperfield grants employees system access limited only to what is necessary to perform their specific job duties. What security principle is being applied?",
    "Choices": {
      "A": "The principle of maximum access for efficiency",
      "B": "The principle of least privilege",
      "C": "Risk transfer",
      "D": "Management override"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Least privilege limits each user to the access needed for current job duties. This access-control principle reduces unauthorized processing, data exposure, and misuse by avoiding excessive system permissions.",
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
    "QuestionID": "P1-ED-010",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Maximum access grants users broad system permissions beyond what their role requires, which increases the risk of unauthorized data access, modification, or fraud. The principle applied is the opposite — limiting access to only what is necessary.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Risk transfer shifts financial consequences to a third party, such as through insurance. Limiting user access based on job duties is a preventive access control, not a risk-financing strategy.",
    "ExplanationWrongD": "Management override is bypassing controls, not a principle for limiting user access.",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.011 COSO Principle 1 — integrity and ethics — evaluating code of conduct enforcement gaps",
    "MicroTopic": "Code of conduct enforcement consistency",
    "UniqueConceptKey": "E-D011-code-of-conduct-enforcement-gaps",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northwood Manufacturing's code of conduct states that violations will result in disciplinary action up to and including termination. Over a 3-year period, investigation records reveal: (1) a regional VP was found to have approved $120,000 in personal expenses on a corporate card — he received a written warning and was promoted 8 months later; (2) a plant manager falsified safety inspection records for 18 consecutive months — he was permitted to resign and received his full annual bonus; and (3) an accounts receivable clerk who recorded a $380 personal meal as a business expense was terminated immediately. The CEO states that 'we enforce our code of conduct consistently at all levels.' Evaluate whether the CEO's claim is consistent with COSO Principle 1.",
    "Choices": {
      "A": "The CEO's claim is supported because some form of disciplinary action was imposed in three cases, demonstrating that the organization addresses deviation from its standards of conduct.",
      "B": "The code of conduct should be revised to specify exact penalties for each category of violation to eliminate management discretion and ensure consistent enforcement outcomes across organizational levels.",
      "C": "The enforcement is adequate if the CEO was not personally aware of the specific investigation outcomes at the time the promotion decision was made, since accountability lies with the direct supervisors involved.",
      "D": "The CEO's claim is inconsistent with COSO Principle 1 because the pattern of outcomes shows that senior-level employees received disproportionately lenient treatment while a lower-level employee received the maximum penalty for a substantially smaller infraction."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The CEO's claim is contradicted by the documented outcomes. Under COSO Principle 1, the organization must demonstrate a commitment to integrity and ethical values, which requires that deviations from standards of conduct are addressed consistently and in a timely manner. The investigation records reveal a pattern of inverse proportionality between organizational rank and severity of consequence: the regional VP who misappropriated $120,000 received only a written warning and was subsequently promoted, effectively rewarding the misconduct; the plant manager who falsified safety records was permitted to resign with a full bonus, avoiding any financial consequence; yet the AR clerk was terminated immediately for a $380 infraction. This pattern signals to all employees that seniority confers effective immunity from the code of conduct's stated consequences. COSO Principle 1's supporting points emphasize that the organization evaluates adherence to its standards of conduct and addresses deviations in a timely and consistent manner. When a vice president is promoted after a six-figure expense fraud while a clerk is fired for a three-digit expense violation, the organization is not evaluating or addressing deviations consistently — it is applying a tiered system of accountability where consequences decline as rank rises.",
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
    "QuestionID": "P1-ED-011",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "The argument that any disciplinary action satisfies COSO Principle 1 misinterprets the standard. Principle 1 requires not merely that deviations are addressed, but that they are addressed consistently and proportionally. When a VP who misappropriated $120,000 receives a written warning and subsequent promotion while a clerk who recorded a $380 personal expense is terminated, the pattern of enforcement undermines rather than demonstrates commitment to ethical values. The existence of some consequence does not establish consistent enforcement when severity of consequences is not proportional to severity of violations.",
    "ExplanationWrongB": "While more specific penalty guidelines can improve consistency, this response misidentifies the root cause. The existing code already provides for disciplinary action up to and including termination, which grants management sufficient discretion to impose proportional consequences. The defect is not in the policy's wording but in how management exercised its discretion in a manner that systematically favored senior employees. COSO Principle 1 emphasizes demonstrated commitment through actions, not merely written policies.",
    "ExplanationWrongC": "This argument places undue reliance on the CEO's plausible deniability as a defense, which is inconsistent with COSO Principle 1's requirement that senior management sets the tone at the top. The CEO is responsible for establishing a culture where consistent enforcement is expected, monitored, and verified. Claiming ignorance of investigation outcomes does not excuse the organization from its obligation to maintain a control environment where disciplinary actions are administered consistently.",
    "ExplanationWrongD": "",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.012 COSO Principle 15 — external communication — evaluating SOC 2 Type II scope adequacy",
    "MicroTopic": "SOC 2 Type II report scope adequacy",
    "UniqueConceptKey": "E-D012-soc2-scope-adequacy",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "ClearTrust Payment Processing, a third-party payment processor serving 14 regional banks, provides each bank client with a SOC 2 Type II report covering the Trust Services Criteria of Security and Availability. The report scope explicitly excludes the Processing Integrity and Confidentiality criteria because ClearTrust's management determined these were not applicable to the payment processing function. One of its bank clients, Meridian Financial, subsequently discovers that ClearTrust experienced four processing integrity failures in the past year that resulted in incorrect payment amounts being posted to customer accounts, and that ClearTrust's encryption key management practices did not meet the bank's regulatory requirements. Evaluate whether ClearTrust's SOC 2 report scope adequately addresses Meridian's third-party risk assessment needs under COSO Principle 15.",
    "Choices": {
      "A": "The SOC 2 report scope is adequate because Security and Availability are the foundational Trust Services Criteria, and the other criteria are supplementary enhancements that do not apply to payment processing services.",
      "B": "The SOC 2 report scope is inadequate because Processing Integrity and Confidentiality are directly relevant to the payment processing function, and their exclusion means the report provides incomplete assurance regarding controls over the accuracy of transaction processing and the protection of sensitive customer information.",
      "C": "The SOC 2 report scope is adequate because each service organization has discretion under AICPA professional standards to determine which Trust Services Criteria are applicable to its operations and service commitments.",
      "D": "The adequacy of the SOC 2 report scope is irrelevant to Meridian Financial's risk assessment because the bank should rely on its own regulatory examination process and internal audit procedures rather than third-party assurance reports."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under COSO Principle 15, the organization communicates with external parties regarding matters affecting the functioning of internal control. For outsourced service providers, a SOC 2 Type II report is the primary mechanism for communicating design and operating effectiveness of controls to user entities. The AICPA Trust Services Criteria comprise five categories: Security (always required), Availability, Processing Integrity, Confidentiality, and Privacy. For a payment processing function, Processing Integrity is directly and fundamentally relevant — the criteria address whether system processing is complete, valid, accurate, timely, and authorized. The four documented processing integrity failures resulting in incorrect payment amounts being posted demonstrates this conclusively. Confidentiality is equally relevant because payment processing involves collecting, transmitting, and storing sensitive customer financial information, and the identified deficiencies in encryption key management directly threaten confidentiality. Management's exclusion of these criteria from the SOC 2 scope is not a legitimate exercise of professional judgment — it is a scope limitation that denies user entities assurance over the controls that matter most to their risk assessment.",
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
    "QuestionID": "P1-ED-012",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Security and Availability are essential but not sufficient for a payment processing service. Processing Integrity addresses whether system processing is complete, valid, accurate, timely, and authorized — all directly relevant when the service involves posting transaction amounts to customer accounts. Availability addresses whether the system is operational, but does not address whether it processes transactions correctly when operational. A bank relying solely on Security and Availability assurance would have zero visibility into whether payment amounts are correctly calculated and posted.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "While service organization management exercises professional judgment in scoping SOC 2 examinations, this discretion is bounded by the AICPA requirement to include all Trust Services Criteria relevant to the services provided. A payment processor handling financial transactions cannot credibly claim that Processing Integrity (which governs accuracy, completeness, and authorization of processing) and Confidentiality (which governs protection of sensitive information) are not applicable. Management's determination is objectively contradicted by the nature of the service itself and by the documented failures in both processing accuracy and data protection.",
    "ExplanationWrongD": "This argument improperly absolves the service organization of its responsibility to communicate relevant internal control information under COSO Principle 15. While Meridian retains ultimate responsibility for managing third-party risk, the SOC 2 Type II report is a key input prescribed by professional standards specifically for this purpose. Regulatory examinations are point-in-time assessments, and internal audit procedures at the bank level cannot independently test controls operated by the service provider with the same effectiveness as a SOC 2 examination performed by an independent service auditor with full access to the service organization's systems.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.013 COSO Principle 12 — control activities — evaluating IT-dependent manual control reliability",
    "MicroTopic": "IT-dependent manual control design limitations",
    "UniqueConceptKey": "E-D013-it-dependent-manual-control",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Bridgewater Credit Union's loan origination system automatically generates a daily exception report listing all loans approved above $500,000. The credit administration manager is responsible for manually reviewing this report each day and investigating any loans that appear to have bypassed the credit committee's mandatory approval threshold. During a regulatory examination, examiners discover that eight loans totaling $6.4 million were approved by a single loan officer who circumvented the committee requirement by splitting each large lending arrangement into three to four smaller loans, each individually below the $500,000 threshold. None of these loans appeared on the daily exception report. The manager states she 'reviewed every exception report that was generated and found nothing unusual.' Evaluate the design of this control activity under COSO Principle 12.",
    "Choices": {
      "A": "The control activity is well-designed because the manager performed her assigned review duties diligently and the system correctly generated exception reports according to its programmed parameters.",
      "B": "The control activity should be improved by lowering the exception report threshold from $500,000 to $250,000, making circumvention substantially more logistically difficult.",
      "C": "The control activity is poorly designed because it relies exclusively on a single transaction-level attribute — individual loan amount — that can be systematically circumvented through transaction splitting, and it lacks complementary detection mechanisms such as aggregate exposure monitoring by borrower or related-entity analysis.",
      "D": "The control deficiency is attributable to the loan officer's fraudulent circumvention and does not reflect a weakness in the control activity's design, since no preventive or detective control can eliminate the risk of deliberate employee misconduct."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under COSO Principle 12, the organization deploys control activities through policies that establish what is expected and through procedures that put those policies into action. A well-designed control activity must specifically address the risk it is intended to mitigate and must be designed with an awareness of how it could be circumvented. The Bridgewater Credit Union's exception report control has a fundamental design flaw: it uses a single attribute — individual loan amount exceeding $500,000 — as the sole criterion for generating exceptions. This creates a deterministically predictable circumvention path. Any knowledgeable insider can achieve the same economic result as a large loan while avoiding detection by disaggregating the transaction into smaller components below the threshold. A properly designed set of control activities would incorporate complementary detection mechanisms including: aggregation of loan exposures by borrower, related entity, or common beneficial owner across multiple applications within a defined time window; automated trend analysis comparing each loan officer's patterns against peers; and reconciliation of total approved exposures by officer against delegated credit authority limits on a rolling basis.",
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
    "QuestionID": "P1-ED-013",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "The fact that the manager performed her review duties diligently does not validate the design of the underlying control activity. If the control's detection logic contains a predictable circumvention path, then the control will systematically fail to identify certain violations regardless of how diligently the manual review is performed. The manager's conscientious review of a report that never contained the relevant exceptions provided false assurance. A well-designed control generates relevant exceptions for investigation.",
    "ExplanationWrongB": "Lowering the threshold from $500,000 to $250,000 would make circumvention incrementally more logistically difficult, but it does not address the fundamental vulnerability of relying on a single per-transaction attribute as the only detection criterion. A determined insider could still disaggregate a $6.4 million arrangement into 26 loans of approximately $246,000 each — all below the new threshold. The appropriate remedy is to design complementary detective controls that monitor for the circumvention pattern itself.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "COSO Principle 12 places responsibility for selecting and developing control activities on management, recognizing that controls must be designed with the assumption that some individuals will attempt to circumvent them. The presence of intentional misconduct does not excuse a poorly designed control — rather, it validates the necessity of designing controls that anticipate and detect circumvention attempts. If a control can be bypassed through a predictable and straightforward method, then the control design, not merely the individual's misconduct, represents a significant deficiency.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.014 independent verification control activity",
    "MicroTopic": "independent verification control activity",
    "UniqueConceptKey": "E-D014-independent-verification-control-activity",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Northfell has a supervisor recount inventory counted by warehouse staff before finalizing the count. What type of control activity is this?",
    "Choices": {
      "A": "A physical control over inventory storage only",
      "B": "Independent verification, checking the accuracy of work performed by others",
      "C": "A preventive control that stops errors before they occur",
      "D": "Segregation of duties, since only one person performs the recount"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "A supervisor recounting inventory counted by warehouse staff is independent verification. It is a detective control activity that checks the accuracy and completeness of work performed by others before the count is finalized.",
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
    "QuestionID": "P1-ED-014",
    "question_state": "Archived",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Physical inventory control restricts physical access to storage areas. The supervisor's recount is an independent verification activity — checking the accuracy of work performed by warehouse staff — not merely restricting physical access to the inventory location.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Preventive controls aim to stop errors before they occur. A supervisor recounting after the count is performed is detective — it identifies and corrects errors that have already occurred during the initial count.",
    "ExplanationWrongD": "Segregation of duties separates incompatible responsibilities; a one-person recount by a supervisor is independent verification, not the segregation concept itself.",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  }
];