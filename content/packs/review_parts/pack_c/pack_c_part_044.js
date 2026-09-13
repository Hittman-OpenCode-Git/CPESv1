const MCQ_BANK_C_PART_44 = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.038 COSO Principle 11 -- IT general controls access migration",
    "MicroTopic": "COSO Principle 11 -- IT general controls access migration",
    "UniqueConceptKey": "E-C038-coso-principle-11-itgc-access-migration",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E7",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Healthcare Solutions, a regional healthcare services provider with 4,200 employees, completed a migration from a legacy on-premise ERP system to a cloud-based ERP platform in January 2026. Six months after go-live, an internal audit identified that 23% of user accounts (966 of 4,200) retained access permissions from the legacy system that conflict with their new role-based access assignments in the cloud ERP. Specifically, 312 accounts in the accounts payable department retained general ledger posting access that was appropriate in the legacy system but was explicitly removed from the AP role in the new system's security design. An additional 198 accounts had purchase order approval limits in the new system that exceeded their legacy-system limits by an average of 340%, with no corresponding change in job responsibilities or documented business justification. The migration project plan required that all user access be re-certified by department heads before go-live, but the certification was completed for only 61% of departments. The remaining 39% went live with legacy permissions mapped automatically by a conversion script. Which IT general control area most directly failed, and what is the primary remediation required?",
    "Choices": {
      "A": "Access control -- the legacy-to-cloud role mapping process failed to ensure that permissions in the new system were restricted to those necessary for each user's current job responsibilities. The primary remediation requires an enterprise-wide access recertification for all 4,200 accounts and implementation of periodic user access reviews.",
      "B": "Change management -- the ERP migration was implemented without adequate end-to-end testing of the role-mapping conversion scripts, allowing legacy permissions to propagate into the production environment. The primary remediation requires re-executing the role-mapping migration with corrected conversion scripts in a controlled change window.",
      "C": "Segregation of duties -- the 312 AP accounts with general ledger posting access represent an incompatible function combination that creates material fraud risk. The primary remediation requires immediate revocation of GL posting access from AP department users, followed by a segregation-of-duties conflict analysis across departments.",
      "D": "System operations -- the cloud ERP vendor failed to properly configure the role-based access controls during the implementation phase that were specified in the statement of work. The primary remediation requires the vendor to perform a root cause analysis and implement corrective configuration changes under the service level agreement."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "COSO Principle 11 requires that the organization select and develop general control activities over technology to support the achievement of objectives. IT general controls (ITGCs) encompass access security, change management, system operations, and program development controls. Access control is the ITGC domain that governs how users are granted, modified, and revoked access to information systems. The principle of least privilege -- that users should have only the access necessary to perform their assigned job responsibilities -- is a foundational access control concept. Three facts in this scenario point to an access control failure rather than a change management or segregation-of-duties failure: (1) the cloud ERP migration involved a deliberate role redesign where AP users were explicitly not supposed to have GL posting access, yet 312 accounts retained it, indicating the role-to-permission mapping was never validated against the new security design; (2) purchase order approval limits increased by an average of 340% without business justification, indicating that permissions were not calibrated to actual job responsibilities; and (3) the department head recertification -- which is an access control activity, not a change management control -- was completed for only 61% of departments, meaning 39% of users went live with unverified access. The root cause is that the access provisioning process failed to ensure that permissions granted in the new system were appropriate, authorized, and aligned with job responsibilities. Remediation must address the access control lifecycle: an immediate enterprise-wide recertification to correct the current state, and implementation of periodic user access reviews to prevent recurrence. Option A correctly identifies the ITGC domain and the proportionate remediation. The business interpretation is that technology migrations create concentrated access control risk because role definitions, permission models, and user populations shift simultaneously. A rigorous access recertification process both before and after migration is essential to maintaining the principle of least privilege and ensuring that no user carries forward permissions that are no longer appropriate.",
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
    "QuestionID": "P1-EC-038",
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
    "ExplanationWrongB": "Option B attributes the failure to change management, which governs how changes to IT systems are authorized, tested, and migrated to production. While the ERP migration was a significant change, the specific failure identified -- retained legacy permissions and inflated approval limits -- is an access provisioning issue, not a change testing defect. The conversion scripts may have executed correctly from a technical standpoint by migrating the data as specified, but the access control validation step that should have verified permissions against the new role design was not performed. Additionally, re-executing the entire role-mapping migration would be operationally disruptive and disproportionate when the same outcome can be achieved through access recertification in the live production environment. A candidate selecting this option may be categorizing any post-migration issue as a change management failure without analyzing whether the deficient control belongs to the change management domain or the access management domain.",
    "ExplanationWrongC": "Option C correctly identifies that AP users holding GL posting access represents a segregation of duties concern, but it misdiagnoses the scope and root cause. The segregation of duties issue affecting the 312 accounts is a symptom of the broader access control failure, not the primary control deficiency. Remediation focused exclusively on revoking GL access from AP users would leave the 654 other accounts with inappropriate permissions unaddressed -- including the 198 accounts with unjustified purchase order approval limit increases. Furthermore, segregation of duties is a control objective, not a control activity; access controls (including role design, permission assignment, and periodic recertification) are the mechanisms that enforce segregation of duties. A candidate selecting this option may be correctly identifying a specific control weakness but failing to recognize that it is one manifestation of a systemic access management breakdown requiring enterprise-wide remediation rather than a targeted revocation.",
    "ExplanationWrongD": "Option D incorrectly assigns responsibility for the access control failure to the cloud ERP vendor. Under the shared responsibility model that governs cloud computing, the vendor is responsible for the security OF the cloud (infrastructure security, platform security, physical security), but the customer is responsible for security IN the cloud -- including user access management, role configuration, permission assignment, and access recertification. The 23% permission conflict rate, the incomplete department head recertification, and the purchase order approval limit escalation are all customer-side access management failures that fall squarely within Meridian's responsibility. A candidate selecting this option may misunderstand the shared responsibility model, incorrectly assuming that the cloud vendor bears responsibility for all control failures in a cloud environment. The remediation must be performed by Meridian, not the vendor, because access provisioning, role design, and user recertification are customer responsibilities under any cloud service model.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.039 COSO Principle 3 -- authority and responsibility -- evaluating control breakdowns in matrix organizations with dual reporting lines",
    "MicroTopic": "Authority and responsibility in matrix organizations",
    "UniqueConceptKey": "E-C039-matrix-reporting-control",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Atlas Global operates a matrix organizational structure where regional controllers report dually to the Regional Vice President (who controls their compensation, promotion, and performance reviews) and to the Corporate Controller (who provides functional guidance on accounting policy). During the Q2 close, the Asia-Pacific Regional VP instructed the regional controller to defer recognition of $3.2 million in inventory write-downs until Q3, when a new regional profit-sharing plan resets the baseline. The regional controller documented the instruction in an email to the Corporate Controller, noting \"per discussion with RVP, Q2 inventory valuation maintained at cost.\" The Corporate Controller acknowledged receipt but took no action, citing the RVP's authority over regional operations. The write-downs were ultimately recorded in Q3 after an internal whistleblower report to the audit committee. Under COSO Principle 3, which of the following best evaluates the control breakdown at Atlas Global?",
    "Choices": {
      "A": "The regional controller independently decided to defer the write-down and should be held solely accountable, as COSO Principle 3 places control responsibility on the individual performing the accounting function.",
      "B": "The organizational structure created accountability ambiguity because the dual-reporting arrangement allowed the RVP to exercise de facto control over accounting decisions while the Corporate Controller's functional authority lacked enforcement mechanisms.",
      "C": "The Corporate Controller acted appropriately by deferring to the RVP's operational authority because COSO Principle 3 establishes that the highest-ranking executive in a reporting line has final authority over decisions within that line.",
      "D": "The matrix structure is inherently incompatible with COSO Principle 3, and Atlas Global should restructure to a purely functional reporting model where controllers report exclusively to the Corporate Controller."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 3 requires that management establish, with board oversight, the structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives. The critical requirement is that authority and responsibility are clearly assigned and that accountability mechanisms function effectively — particularly where reporting lines are shared. Atlas Global's matrix structure exhibits a specific control breakdown: the formal reporting structure gives the Corporate Controller functional authority over accounting policy, but the practical authority — control over compensation, performance evaluations, and career progression — rests entirely with the Regional VP. When the RVP directed an accounting treatment that violated GAAP, the Corporate Controller received notification but had no mechanism to enforce compliance. The regional controller correctly escalated the issue, but the Corporate Controller's acknowledgment without action demonstrates that the functional reporting line had become ceremonial rather than operational. COSO Principle 3 does not prescribe a particular organizational structure — it requires that whatever structure exists has clearly assigned responsibilities and effective accountability. Atlas Global's matrix structure could work if (1) the Corporate Controller had authority to override accounting decisions made under regional pressure, (2) compensation decisions for controllers were shared between the functional and regional reporting lines, or (3) an escalation protocol existed for disputes between the two reporting authorities. The absence of any of these mechanisms is the COSO Principle 3 failure.",
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
    "QuestionID": "P1-EC-039",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice incorrectly places sole accountability on the regional controller while absolving the reporting structure of responsibility. The regional controller's email to the Corporate Controller demonstrates that the controller recognized the accounting treatment was questionable and attempted to escalate. COSO Principle 3's requirement for clear authority and responsibility operates at the organizational level — when a manager with compensation authority overrides a controller's professional judgment, and the functional supervisor takes no action, the control failure is structural, not individual. Holding the regional controller solely accountable ignores that the controller operated within a system that (a) gave the RVP the power to direct the accounting treatment and (b) provided no effective recourse to the Corporate Controller. In practice, a controller facing termination for refusing a supervisor's directive faces an untenable position that the internal control structure — not the individual — should have prevented.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This choice fundamentally misunderstands COSO Principle 3. The Corporate Controller's functional authority over accounting policy exists precisely to ensure GAAP compliance regardless of operational preferences. When the Corporate Controller received notification that the RVP was directing a GAAP-violating accounting treatment and took no action, the Corporate Controller failed in their oversight duty. The RVP's operational authority includes decisions about pricing, production levels, and market strategy — it does not extend to overriding GAAP for financial reporting. COSO Principle 3 requires that reporting lines ensure accountability; here, the Corporate Controller had functional responsibility without functional authority, which is precisely the governance gap that Principle 3's reporting-line design requirement is intended to prevent.",
    "ExplanationWrongD": "This choice proposes an extreme structural solution that COSO does not mandate. Matrix organizations are common in global enterprises and are not inherently incompatible with Principle 3. The framework requires that reporting lines and authority assignments be clear, enforceable, and aligned with organizational objectives — regardless of whether the structure is functional, divisional, or matrix. Restructuring to a purely functional model would involve significant organizational disruption and cost, and similar control breakdowns could occur in any structure if accountability mechanisms are not properly designed. COSO Principle 3 asks organizations to evaluate whether their existing structure provides appropriate authority and responsibility allocation — not to adopt any single prescribed structure. The correct remediation is to strengthen the Corporate Controller's enforcement authority, not to eliminate the matrix structure entirely.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S52 Phase 4 — Evaluate replacement for archived P1-EC-039 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.040 it general controls access",
    "MicroTopic": "it general controls access",
    "UniqueConceptKey": "E-C040-it-general-controls-access",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E7",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Oleander requires periodic review of user access rights to ensure employees only retain system access appropriate to their current role. What category of control is this?",
    "Choices": {
      "A": "An application control embedded in transaction processing only",
      "B": "A budgetary control over IT spending",
      "C": "A physical control over the data center only",
      "D": "An IT general control over logical access"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Periodic review of user access is an IT general control over logical access. It supports least privilege by confirming that access rights still match current job responsibilities and removing obsolete or excessive permissions. Under the COSO Control Activities component, IT general controls over logical access support the principle that access to information systems should be restricted to authorized users.",
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
    "QuestionID": "P1-EC-040",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Application controls are specific to individual transaction-processing applications. Periodic access-rights review is a system-wide IT general control that applies across multiple applications and supports the logical access domain.",
    "ExplanationWrongB": "A budgetary control over IT spending does not validate whether users have appropriate system permissions.",
    "ExplanationWrongC": "Physical data-center controls restrict physical entry; the stem concerns logical access rights inside systems.",
    "ExplanationWrongD": "",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.041 management override risk",
    "MicroTopic": "management override risk",
    "UniqueConceptKey": "E-C041-management-override-risk",
    "LOSTag": "P1-E Internal controls",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Pinehollow's CEO instructs the controller to bypass a normal approval control to record a favorable adjusting entry near year-end. What internal control limitation does this illustrate?",
    "Choices": {
      "A": "Management override of controls",
      "B": "Segregation of duties working exactly as designed",
      "C": "An IT general control weakness",
      "D": "A cost-benefit limitation of control design"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under the COSO Internal Control—Integrated Framework, management override is recognized as an inherent limitation of internal control — no system of internal control can fully prevent senior management from bypassing prescribed policies and procedures. Analysis of the scenario: a CEO directing the controller to skip a normal approval control for a favorable year-end adjustment is a textbook case of management override. The key analytical elements are: (1) the actor has authority (CEO), (2) an existing control is being intentionally bypassed (the approval control), (3) the motivation is outcome-driven (favorable adjustment near year-end suggests earnings management pressure), and (4) the override targets the control environment's integrity. Distinguishing override from other control limitations: segregation of duties concerns incompatible duties being assigned to one person (not applicable — the CEO and controller are separate individuals); IT general control weaknesses involve system-level deficiencies (the override is a human bypass of a process control); cost-benefit limitations concern whether a control is worth implementing (the control already exists — it is being overridden, not omitted). The correct answer is Option A because management override is the only limitation that describes a person with authority intentionally bypassing an existing control. The candidate must recognize that override is about authority, not design failure.",
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
    "QuestionID": "P1-EC-041",
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
    "ExplanationWrongB": "A candidate selecting Option B may analyze the scenario as an SoD failure, reasoning that the controller should not have been able to process the entry alone. However, the analytical framework must separate SoD failures from override: SoD failures occur when incompatible duties are combined (e.g., the same person authorizes and records), while override occurs when a person with authority intentionally bypasses an existing control. The scenario describes two separate individuals (CEO + controller) — the SoD is intact, but the control is being overridden by management pressure, not broken by design.",
    "ExplanationWrongC": "A candidate selecting Option C may analyze the bypass as a system-level deficiency. However, the override described is a human override of a process-level approval control — the CEO is instructing the controller to skip a step, not exploiting a software vulnerability. Distinguishing ITGC weaknesses from override requires analyzing whether the bypass was technological (system access, logical security) or behavioral (management pressure). The override here is purely behavioral.",
    "ExplanationWrongD": "A candidate selecting Option D may reason that the control should not exist if management can override it anyway, but this analysis conflates two distinct concepts: cost-benefit limitation concerns the decision to not implement a control (ex ante), while override concerns the deliberate bypass of a control that already exists (ex post). The control IS implemented — the issue is that the CEO is choosing to circumvent it. No amount of cost-benefit analysis would prevent a CEO from applying pressure to bypass an existing control.",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.042 COSO Principle 9 -- risk response -- evaluating control design adequacy after risk identification",
    "MicroTopic": "Risk response and control design adequacy",
    "UniqueConceptKey": "E-C042-coso-p9-risk-response",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E2",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Paragon Manufacturing, a $740 million industrial equipment producer, identified through its annual risk assessment that supply chain disruption from single-source suppliers constituted its highest-rated operational risk (likelihood: high, impact: critical). The risk committee, chaired by CFO David Chen, approved a response plan consisting of: (1) quarterly business review meetings with each single-source supplier; (2) a requirement that suppliers submit quarterly financial health certifications; and (3) a $500,000 contingency reserve for expedited shipping if a supplier fails. The internal audit director, Sofia Reyes, reviewed the response plan and noted that: the quarterly meetings had no defined agenda for supply continuity assessment; the financial health certifications were self-reported with no verification; and the $500,000 reserve represented less than 3 days of production revenue ($740M / 250 days ~= $3M/day). Reyes concluded that the risk response was not proportionate to the assessed risk severity. Under COSO Principle 9, which of the following best evaluates the risk response?",
    "Choices": {
      "A": "The risk response is adequate because the risk committee identified and approved specific actions, and COSO Principle 9 requires management to select and develop control activities — it does not prescribe the scale of the response.",
      "B": "The risk response is inconsistent with the assessed risk severity because the selected controls and contingency measures are not proportionate to the high-likelihood, critical-impact risk identified — the controls operate at an administrative level while the risk demands substantive operational mitigation.",
      "C": "The risk response should focus exclusively on financial contingency reserves — if the reserve were increased to $15 million (approximately 5 days of production), the risk would be adequately mitigated regardless of the design quality of the other controls.",
      "D": "Paragon should immediately terminate single-source supplier relationships and dual-source component — COSO Principle 9 requires that the response eliminate the risk entirely when the assessed impact is critical."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 9 requires the organization to identify and assess changes that could significantly impact the system of internal control, and to select, develop, and deploy control activities that contribute to the mitigation of risks to acceptable levels. The key concept is proportionality — when a risk is assessed as high-likelihood and critical-impact, the response must be commensurate with that severity. Paragon's response operates at an administrative level (quarterly meetings with undefined agendas, self-reported certifications with no verification) while the risk is operational (production stoppage from supplier failure). The $500,000 contingency reserve is objectively insufficient: at ~$3M/day in production revenue, $500,000 covers less than 4 hours of revenue, not 3 days as Option C states. Controls that work on paper but do not materially affect the assessed risk are not proportionate. COSO Principle 9 expects the organization to evaluate whether the selected controls actually reduce the risk to an acceptable level, not merely to select some controls and declare the risk addressed.",
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
    "QuestionID": "P1-EC-042",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A reduces COSO Principle 9 to a checkbox exercise — identify risks, select any controls, done. COSO requires that control activities contribute to the mitigation of risks to acceptable levels. Controls that are demonstrably inadequate relative to assessed risk severity (high-likelihood, critical-impact) do not satisfy this requirement. The fact that the risk committee approved the plan does not validate the plan — the board is accountable for ensuring that risk responses are proportionate. A candidate selecting this option may be confusing the existence of a risk response process with the effectiveness of the response.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C incorrectly treats financial reserves as a complete substitute for operational risk mitigation. While increasing the contingency reserve would improve the financial buffer, COSO Principle 9 expects control activities to address the risk through multiple dimensions. A supplier failure disrupts not only revenue but also customer relationships, production schedules, and workforce utilization — cash reserves mitigate the financial impact but do not prevent the operational disruption. Furthermore, reserves alone create no incentive for proactive supplier risk management.",
    "ExplanationWrongD": "Option D proposes eliminating the risk entirely when COSO Principle 9 recognizes that risk response includes multiple strategies: avoidance, reduction, sharing, and acceptance. Dual-sourcing every component would be cost-prohibitive for a $740M manufacturer, and COSO does not mandate risk avoidance as the sole acceptable response for high-severity risks. The appropriate response is to design controls proportionate to the risk — which may include strategic dual-sourcing of the most critical components, verified supplier financial monitoring, and adequate contingency reserves — not to mandate a single extreme strategy.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S56 Phase 5 — Evaluate replacement for archived P1-EC-042 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.043 COSO Principle 3 -- authority and responsibility -- evaluating matrix reporting structure conflicts",
    "MicroTopic": "Authority delegation and matrix reporting conflicts",
    "UniqueConceptKey": "E-C043-coso-p3-authority-responsibility",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Pinnacle Aerospace, a $4.2 billion defense contractor, restructured into a matrix organization where division controllers report jointly to their division president (for operational matters) and to the corporate controller (for financial reporting and internal control matters). The corporate controller, James Thornton, discovered that three division controllers had approved $18 million in revenue recognition on long-term contracts using percentage-of-completion estimates provided by division program managers, despite the corporate controller's office having issued guidance requiring independent cost-to-complete verification. When Thornton questioned the division controllers, all three stated that their division presidents had directed them to use the program managers' estimates because 'corporate doesn't understand the program realities.' The division presidents' compensation was 40% tied to division revenue targets. Under COSO Principle 3, which of the following best evaluates the authority and responsibility deficiency?",
    "Choices": {
      "A": "The matrix structure is functioning as designed because the division controllers properly escalated the issue to both reporting lines — the corporate controller was informed and the division presidents exercised their operational authority as the matrix intended.",
      "B": "The matrix structure created an authority conflict where division controllers faced competing directives from two reporting lines with misaligned incentives — the corporate controller's financial reporting authority was operationally subordinate to the division presidents' compensation-driven directives, and the controllers lacked structural protection to uphold the corporate authority.",
      "C": "The deficiency is limited to the division presidents' compensation design — if revenue targets were removed from their bonus calculations, the matrix reporting structure would be effective without changes to authority delegation.",
      "D": "Pinnacle should abandon the matrix structure entirely and return to a purely functional organization where controllers report exclusively to the corporate controller, because COSO Principle 3 prohibits dual reporting lines for control-related functions."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 3 requires management to establish, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives. When an organization adopts a matrix structure with dual reporting lines, the principle requires that the authority relationships be designed so that control-related responsibilities are not subordinated to operational incentives. Pinnacle's structure formally assigned financial reporting authority to the corporate controller but failed to provide the division controllers with structural protection to exercise that authority when it conflicted with division presidents' directives. The division presidents' compensation (40% revenue-based) created an incentive to adopt aggressive revenue estimates, and the controllers lacked any mechanism — such as a mandatory escalation protocol, a requirement that corporate controller approval precede revenue recognition, or protection from retaliation — to uphold the corporate authority. The matrix structure itself is not the deficiency; the deficiency is that the structure established formal dual reporting without ensuring that control-related authority was operationally enforceable when it conflicted with operational authority. In practice, organizations with matrix structures must ensure that the 'dotted line' for internal control carries sufficient weight that it cannot be overridden by the 'solid line' for operations when control issues are at stake.",
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
    "QuestionID": "P1-EC-043",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly characterizes the matrix as functioning properly when the evidence demonstrates it failed to protect corporate financial reporting authority. The corporate controller learned of the violations after $18 million had already been recognized — the escalation was retroactive discovery, not proactive compliance. The division controllers followed the operational directive rather than the corporate directive, demonstrating that when the two reporting lines conflicted, the operational line (with compensation consequences) prevailed over the control line. This is evidence of a structural authority deficiency, not a properly functioning matrix.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C treats a structural authority issue as a compensation design issue. While the division presidents' 40% revenue-based compensation created the incentive for aggressive estimates, removing revenue from their bonus formula would not address the underlying authority problem: the controllers had no structural mechanism to uphold corporate financial reporting directives when they conflicted with their operational superiors' instructions. Even without revenue-based compensation, division presidents have operational incentives (schedule pressure, customer commitments, resource allocation) that may conflict with conservative accounting. The structural remedy must ensure that control-related authority is enforceable regardless of operational incentives.",
    "ExplanationWrongD": "Option D proposes eliminating the matrix structure rather than fixing it. COSO Principle 3 does not prohibit matrix organizations — many companies operate effective matrix structures for control functions. The principle requires that reporting lines and authority be designed to support the functioning of internal control. The remedy is to strengthen the corporate reporting line so that corporate financial reporting authority is operationally enforceable — for example, by requiring corporate controller pre-approval for significant accounting estimates, establishing a mandatory escalation protocol for conflicts, and ensuring that performance evaluations for division controllers include meaningful input from the corporate controller. The matrix structure is not the problem; the weak design of the control reporting line is.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S56 Phase 5 — Evaluate replacement for archived P1-EC-043 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.044 COSO Principle 13 -- information quality -- evaluating data reliability from outsourced third-party service providers for financial reporting",
    "MicroTopic": "Information quality from outsourced service providers",
    "UniqueConceptKey": "E-C044-outsourced-information-quality",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Clearwater Health System outsourced its patient billing and collections function to RevCycle Partners, a third-party revenue cycle management firm. Clearwater's financial reporting relies on monthly billing data files transmitted by RevCycle through an automated interface that posts directly to Clearwater's general ledger. During a recent external audit, the auditors identified that 14% of accounts receivable aged over 180 days had been reclassified as \"current\" by RevCycle's system because the firm's aging algorithm automatically resets the aging date each time a partial payment is received — even token payments of $1. The reclassification inflated Clearwater's reported current assets by $4.7 million and understated the allowance for doubtful accounts. RevCycle's SOC 1 Type II report for the period noted no exceptions related to the billing system's logic. Under COSO Principle 13, which of the following best characterizes Clearwater's information quality deficiency?",
    "Choices": {
      "A": "Clearwater's reliance on the SOC 1 report was sufficient because an unqualified report provides reasonable assurance over third-party controls, and the aging algorithm issue is inherent to outsourced arrangements.",
      "B": "The organization obtained and processed relevant data from the third-party service provider, but failed to evaluate the quality and integrity of that data before using it to prepare financial statements.",
      "C": "RevCycle Partners bears sole responsibility for the information quality deficiency because the SOC 1 report covered the billing system and the aging algorithm was operating as designed.",
      "D": "Clearwater should bring the billing function back in-house because COSO Principle 13 establishes that financial reporting data cannot be sourced from external service providers."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 13 requires that the organization obtain or generate and use relevant, quality information to support the functioning of internal control. The principle specifically addresses that information must be of sufficient quality — appropriate, current, complete, accurate, accessible, and provided on a timely basis. Clearwater's deficiency is that the organization accepted RevCycle's data at face value without evaluating its quality before relying on it for financial reporting. While the data transmission mechanism (automated interface posting to the general ledger) was technically sound, the substance of the data was unreliable because the underlying aging algorithm systematically misstated receivable classification. Clearwater's control failure is that it treated the SOC 1 report as a complete substitute for its own data quality procedures. A SOC 1 Type II report provides assurance over the design and operating effectiveness of the service organization's controls — it does not guarantee that the data generated by those controls is appropriate for the user organization's specific financial reporting needs. COSO Principle 13 expects the user organization to assess whether the information received from external parties meets its quality requirements. In this case, Clearwater should have implemented its own analytical procedures — such as comparing AR aging trends against historical patterns, validating the aging reset logic, or reconciling the third-party data to independently maintained records — before relying on the data for financial statement preparation.",
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
    "QuestionID": "P1-EC-044",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice incorrectly treats an unqualified SOC 1 report as conclusive evidence of information quality for financial reporting. SOC 1 reports address the service organization's controls over processing — they do not address whether the processed data produces results that are appropriate for the user organization's specific reporting needs. The SOC 1 report confirmed that RevCycle's billing system operated as designed, which it did — but the design itself contained a flaw (automatic aging reset on partial payments) that materially affected Clearwater's financial statements. COSO Principle 13 places the ultimate responsibility for information quality on the organization using the information, not on the third party that generates it. Reliance on a SOC 1 report without independent validation of the data output is insufficient.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This choice attempts to shift accountability to the service provider, but COSO Principle 13 establishes that the user organization is responsible for evaluating the quality of information it uses for financial reporting, regardless of who generated it. RevCycle's system operated as designed, and the SOC 1 report confirmed this — the problem is that Clearwater did not verify whether the system's design outputs met its own financial reporting quality requirements. In an outsourced arrangement, the user organization retains responsibility for its financial statements under GAAP. The service organization may be contractually liable for damages caused by system defects, but contractual liability does not discharge the organization's internal control responsibility under COSO Principle 13. The $1 token payment reclassification mechanism was discoverable through routine analytical procedures or data validation that Clearwater should have performed.",
    "ExplanationWrongD": "This choice proposes an extreme and unnecessary remedy. COSO does not prohibit the use of third-party service providers for financial reporting data — many organizations outsource payroll processing, benefits administration, revenue cycle management, and other functions. Principle 13 requires that the organization evaluate the quality of information from all sources, internal and external. The appropriate response is not to insource every function but to implement data quality validation procedures appropriate to the outsourced arrangement, such as reconciling key data points, validating algorithm logic, and performing trend analysis on third-party reports. An organization can fully satisfy COSO Principle 13 while using outsourced services, provided it maintains appropriate information quality controls over the data it consumes.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S52 Phase 4 — Analyze replacement for archived P1-EC-044 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.045 COSO Principle 17 -- deficiency evaluation -- evaluating severity classification of control deficiencies",
    "MicroTopic": "Control deficiency severity classification",
    "UniqueConceptKey": "E-C045-coso-p17-deficiency-severity",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Riverbend Community Bank, a $3.8 billion financial institution, identified four control deficiencies during its annual internal control evaluation. The Chief Audit Executive, Maria Gonzalez, classified them as follows: (1) three bank tellers shared a single cash drawer logon credential because new credentials were delayed — classified as a 'control deficiency'; (2) the loan officer who approved commercial loans also performed the annual independent loan review for the same loans — classified as a 'significant deficiency'; (3) the IT department had not applied security patches to the core banking system for 14 months, affecting 240,000 customer accounts — also classified as a 'significant deficiency'; and (4) the CFO had overridden the allowance for loan loss calculation prepared by the credit risk team for three consecutive quarters, each time reducing the allowance by $2-4 million to meet consensus earnings estimates — classified as a 'significant deficiency.' The external auditor disagreed with the classifications. Under COSO Principle 17, which classification appears most clearly inconsistent with the severity criteria?",
    "Choices": {
      "A": "Deficiency 1 should have been classified as a significant deficiency because credential-sharing incident in a regulated bank represents a material weakness regardless of duration or controls applied.",
      "B": "Deficiency 3 should have been classified as a material weakness because unpatched security vulnerabilities affecting 240,000 customer accounts for 14 months represent a reasonable possibility that a material misstatement or loss could occur and not be prevented or detected on a timely basis.",
      "C": "Deficiency 4 (CFO override of loan loss allowance) should have been classified as a material weakness because management override of a significant accounting estimate for three consecutive quarters to meet earnings targets represents a deficiency where there is a reasonable possibility that a material misstatement of the financial statements will not be prevented or detected.",
      "D": "Deficiency 2 should have been classified as a material weakness because segregation of duties deficiency in a lending function at a regulated bank automatically qualifies as a material weakness under COSO Principle 17, regardless of compensating controls."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "COSO Principle 17 requires the organization to evaluate and communicate internal control deficiencies in a timely manner to those parties responsible for taking corrective action. The severity classification framework distinguishes between control deficiencies, significant deficiencies, and material weaknesses based on the magnitude of potential misstatement and the likelihood of occurrence. The CFO's override of the loan loss allowance calculation for three consecutive quarters to meet consensus earnings estimates is the clearest misclassification: management override of a significant accounting estimate made for the specific purpose of meeting earnings targets is a textbook indicator of a material weakness. The key factors are: (1) the override was recurring (three consecutive quarters), not isolated; (2) the magnitude was material ($2-4 million per quarter for a $3.8 billion bank); (3) override was specifically motivated by earnings targets, indicating intentional bias; and (4) the CFO is the most senior financial officer, meaning the override could not be prevented by lower-level controls. A material weakness exists when there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis — management override of this nature creates precisely that condition.",
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
    "QuestionID": "P1-EC-045",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly applies an automatic material-weakness rule to credential-sharing. While credential-sharing is a control deficiency, classification as a significant deficiency or material weakness depends on magnitude and likelihood. Three tellers sharing a logon temporarily due to credential processing delays — with existing compensating controls — could reasonably be classified as a control deficiency (the lowest severity tier) if the bank assessed that the potential misstatement was not material and not reasonably possible. COSO does not prescribe automatic classification rules based on deficiency type alone. A candidate selecting this option may be applying rigid severity rules without considering the specific circumstances.",
    "ExplanationWrongB": "Option B correctly identifies that unpatched security vulnerabilities for 14 months affecting 240,000 accounts is a serious deficiency, but classification as a material weakness vs. significant deficiency depends on whether there is a reasonable possibility of material financial statement misstatement. If compensating controls exist (such as network segmentation, intrusion detection systems, and daily reconciliation procedures), the deficiency could reasonably be classified as a significant deficiency rather than a material weakness. This is a professional judgment call, not a clearly incorrect classification. Option C presents a much clearer misclassification.",
    "ExplanationWrongD": "Option D applies an incorrect bright-line rule. Not every segregation of duties deficiency automatically qualifies as a material weakness — severity depends on the magnitude of potential misstatement and the existence of compensating controls. A loan officer also performing the independent review of the same loans is a significant deficiency because it impairs the objectivity of the review, but classification as a material weakness would require the additional assessment that a material misstatement could reasonably result. COSO Principle 17 requires judgment-based evaluation, not automatic classification by deficiency type.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S56 Phase 5 — Evaluate replacement for archived P1-EC-045 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.046 COSO Principle 16 -- monitoring -- evaluating continuous monitoring design vs. point-in-time evaluation trade-offs",
    "MicroTopic": "Continuous monitoring design and evaluation frequency",
    "UniqueConceptKey": "E-C046-coso-p16-monitoring",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Columbia Health System, a 12-hospital network, relies on an automated third-party billing system that processes $2.8 billion in annual patient charges. The internal audit function performs an annual review of billing controls each December, covering a two-week sample period. During the current year, a coding error in a software update applied in March caused systematic overbilling of Medicare patients for evaluation and management services, generating an estimated $14 million in overpayments over nine months before the December audit identified the issue. The CFO, Dr. Samuel Park, noted that the annual audit 'worked as designed — it identified the error within the same fiscal year' and proposed maintaining the current annual audit cycle. The Chief Compliance Officer disagreed, arguing that a nine-month detection lag for a systematic billing error is not consistent with effective monitoring. Under COSO Principle 16, which of the following best evaluates the monitoring design?",
    "Choices": {
      "A": "The annual audit cycle satisfies COSO Principle 16 because the error was detected within the same fiscal year, and COSO does not prescribe specific monitoring frequencies — annual evaluations are sufficient for billing controls.",
      "B": "The monitoring design is inadequate because a point-in-time annual review cannot provide timely detection of systematic errors introduced mid-cycle — COSO Principle 16 expects monitoring to be ongoing and integrated into operations, with frequency calibrated to the velocity at which errors can accumulate material impact.",
      "C": "The deficiency is that internal audit tested only a two-week sample period — if the sample period covered a full month, the monitoring design would be adequate regardless of evaluation frequency.",
      "D": "Columbia should replace the annual internal audit review with a continuous automated monitoring tool that tests 100% of transactions — COSO Principle 16 requires continuous monitoring for financially significant processes."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 16 requires the organization to select, develop, and perform ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. The key distinction is that the frequency and nature of monitoring must be calibrated to the risk being monitored. For a billing system processing $2.8 billion annually, a systematic coding error introduced in March and operating undetected for nine months before the December audit represents a monitoring frequency gap: the annual point-in-time review is too infrequent relative to the velocity at which a systematic error can accumulate material impact ($14 million at approximately $1.56 million per month). COSO Principle 16 expects organizations to consider the rate of change, the significance of the process, and the potential magnitude of undetected errors when designing monitoring activities. The annual audit 'worked as designed' only if the design objective was annual detection — but COSO's objective is timely detection. A monitoring activity that allows a $14 million systematic error to operate for nine months is not adequately frequent. The appropriate remediation is to supplement the annual separate evaluation with ongoing monitoring activities — such as monthly automated reasonableness tests, trend analysis of Medicare billing by CPT code, or exception reporting for changes in average charge per encounter.",
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
    "QuestionID": "P1-EC-046",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A treats detection within the fiscal year as sufficient, ignoring the concept of material accumulation velocity. A systematic error accumulating at ~$1.56 million per month over nine months means the organization operated with materially misstated billing for three fiscal quarters. COSO Principle 16's expectation of timely detection is not satisfied by detecting the error in December that began in March — timeliness is measured relative to the rate at which undetected errors can become material, not relative to the fiscal year boundary. A candidate selecting this option may be confusing calendar-based evaluation cycles with risk-based monitoring frequency.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C misdiagnoses the deficiency as a sample size issue rather than a monitoring frequency issue. While a two-week sample from $2.8 billion in annual transactions is a limited sample, expanding it to one month would not address the fundamental problem: a point-in-time review conducted once per year cannot detect errors introduced mid-cycle for nine months regardless of the sample period's duration. The deficiency is temporal (too infrequent), not statistical (too small a sample). A candidate selecting this option may be focusing on audit methodology rather than monitoring design principles.",
    "ExplanationWrongD": "Option D prescribes a specific technological solution (100% automated continuous monitoring) that COSO does not mandate. COSO Principle 16 recognizes that both ongoing monitoring (built into normal recurring operations) and separate evaluations (periodic audits) are valid monitoring activities. The principle requires that the combination of ongoing and separate evaluations be sufficient — not that every process be continuously monitored at 100%. For a $2.8 billion billing system, monthly automated analytics combined with the annual internal audit would likely constitute adequate monitoring without requiring 100% continuous transaction testing. A candidate selecting this option may be over-engineering the solution rather than evaluating the principle.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "upgrade_note": "S56 Phase 5 — Analyze replacement for archived P1-EC-046 (DL-012 rotation clone)"
  }
];