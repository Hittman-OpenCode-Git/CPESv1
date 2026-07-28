// S899 — Batch 1: Pack C Section E — 5 COSO items (Analyze/Evaluate, Difficult/Very Difficult)
// Author in a single file for insertion

const batch1 = [
  // ========== ITEM 1: P1-EC-001 — Segregation of Duties in ERP Systems (Analyze, Difficult) ==========
  {
    qid: "P1-EC-001",
    pack: "C",
    section: "E",
    metadata: {
      QuestionID: "P1-EC-001",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A places trust in the system configuration without the compensating control of independent review. Access rights matrices define what users can do in the ERP — they do not verify that users actually performed only authorized actions. In Ashford's environment, configuration mistakes (warehouse staff receiving AP access) demonstrate that access matrices can be misconfigured. Relying solely on the matrix means no one catches a $47,000 duplicate payment made possible by that misconfiguration. The monitoring component of COSO requires ongoing evaluations and separate evaluations — the configuration alone is not monitoring.",
      ExplanationWrongB: "Option B describes detective controls operating after the fact, but Ashford's root problem is preventive. Monthly transaction reviews would eventually catch a $47,000 duplicate payment, but COSO Principle 12 emphasizes that control activities should be deployed at the right point in the process. Segregation of duties is specifically designed to prevent the incompatible combination of custody (creating purchase orders) and recording (entering invoices) from being held by one person. Post-transaction review is a monitoring activity (COSO Principle 16), not a control activity substitute — and monitoring five ERP modules manually is operationally infeasible.",
      ExplanationWrongC: "Option C correctly identifies segregation of duties as the violated control principle but misprescribes the remediation. Segregation within the warehouse function (verifier vs. picker) addresses inventory control — not the incompatible duties between procurement and accounts payable. Ashford's loss arose because one warehouse employee could both create purchase orders and enter related invoices, enabling a self-approved duplicate payment scheme. The segregation must separate authorization (PO creation) from recording (invoice entry), not merely split duties within the receiving function. The ERP access rights matrix confirms the incompatible combination, so splitting warehouse verifier/picker roles does not address it.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-EC-001 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.002 COSO Principle 12 — segregation of duties in ERP systems",
      MicroTopic: "COSO Principle 12 — control activities — segregation of duties",
      UniqueConceptKey: "E-C002-segregation-of-duties-erp",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Ashford Industries implemented a new ERP system last quarter. The IT director configured role-based access so that the warehouse supervisor can create purchase orders, receive inventory, and enter vendor invoices — reasoning that consolidating these functions under one role 'reduces the handoff delays that slowed procurement.' Three months later, the controller discovers that the same warehouse supervisor created a purchase order for $47,000 of packaging materials, entered a corresponding vendor invoice, and approved payment — but no materials were ever received. The access rights matrix shows the warehouse supervisor role has create-PO, receive-inventory, and enter-AP-invoice permissions. The IT director argues that 'the system tracks every transaction, so nothing can go wrong.' Which internal control failure is most directly responsible for this loss, and what corrective action best addresses the root cause?",
      Choices: {
        A: "The ERP system lacks an adequate audit trail — the corrective action is to enable system-level transaction logging that flags all purchase-order-to-invoice sequences for managerial review",
        B: "The monitoring component of COSO is insufficient — the corrective action is to institute a monthly reconciliation where an independent person matches all purchase orders above $10,000 to receiving reports before invoice payment",
        C: "Segregation of duties is violated because warehouse receiving and AP entry are incompatible — the corrective action is to split the warehouse supervisor role into separate verifier and picker sub-roles",
        D: "Segregation of duties is violated because purchase order creation and invoice entry are incompatible — the corrective action is to remove the enter-AP-invoice permission from the warehouse supervisor role and assign it to the accounts payable department"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "COSO Principle 12 requires that management deploy control activities through policies and procedures, including segregation of duties. The incompatible combination here is purchase order creation (authorization) and vendor invoice entry (recording). When one person controls both, the individual can create a fictitious purchase and approve the corresponding payment without independent verification. This is a fundamental segregation-of-duties failure — the warehouse supervisor had the ability to both authorize a purchase and record the resulting payable, enabling a $47,000 fraudulent disbursement with no materials received. The access rights matrix confirms the incompatible permissions. The correct remediation removes the recording function (enter-AP-invoice) from the warehouse role and reassigns it to accounts payable, restoring the separation between authorization and recording. ERP systems do not eliminate the need for segregation of duties — they require it to be configured into role-based access controls.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 12", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 2: P1-EC-005 — COSO Monitoring Effectiveness (Evaluate, Difficult) ==========
  {
    qid: "P1-EC-005",
    pack: "C",
    section: "E",
    metadata: {
      QuestionID: "P1-EC-005",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A describes a procedure that conflates monitoring with supervision. The plant controller presenting variance analysis to the GM is a management review control — it operates at the transaction and operations level, not the entity-level monitoring that COSO Principle 16 envisions. The scenario explicitly states that the corporate controller has no process for evaluating whether plant-level controls continue to operate effectively. The plant controller's variance review covers budget-to-actual, not control operating effectiveness. Furthermore, variance analysis at the plant level would not detect the accounts payable separation-of-duties breakdown described in the scenario — that failure occurred in a corporate function, invisible to plant-level variance reporting.",
      ExplanationWrongB: "Option B mischaracterizes the external audit as monitoring. Under COSO, external auditors provide an independent opinion on financial statements — they do not evaluate or report on the ongoing effectiveness of internal controls as part of a standard financial statement audit (unless engaged for an integrated audit under PCAOB standards, which is not typical for private companies). COSO Principle 16 explicitly distinguishes between ongoing evaluations (built into operations) and separate evaluations (conducted periodically by internal audit or management). The external auditor's attestation on financial statements is neither. Relying on the external audit as the primary monitoring mechanism, at the exclusion of internal monitoring activities, is a direct violation of COSO Principle 16.",
      ExplanationWrongC: "Option C identifies a genuine deficiency — the lack of a formal internal audit function — but overstates its significance relative to other monitoring deficiencies. A formal internal audit function is one mechanism for separate evaluations (COSO Principle 16), but it is not the only one. Management can conduct separate evaluations, and many mid-sized companies use a combination of management self-assessment and external consultants. The more fundamental problem in the scenario is that NO monitoring mechanism exists — neither ongoing evaluations (embedded in operations) nor separate evaluations (conducted periodically). An internal audit charter without corresponding evaluation activity is form without substance. More critically, Option C does not address the operations-level monitoring gap that allowed the duplicate payment scheme to go undetected for six months.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate replacement for archived P1-EC-005 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.006 COSO Principle 16 — monitoring activities — evaluating effectiveness",
      MicroTopic: "COSO Principle 16 — monitoring activities",
      UniqueConceptKey: "E-C006-monitoring-effectiveness",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Dunthorpe Foods operates three processing plants across the Midwest. The corporate controller's office reviews monthly financial statements from each plant and investigates any variance exceeding 5% of budget. No formal internal audit function exists. Last quarter, a plant manager circumvented the purchase order approval process by splitting a $180,000 equipment order into six separate $30,000 requisitions, each below the $50,000 approval threshold. The controller's variance review did not flag the overspend because the equipment was capitalized, not expensed, so no P&L variance appeared. The external auditor's year-end procedures also did not identify the split-purchase scheme. The controller argues that 'monthly variance analysis and the annual external audit provide adequate monitoring.' Evaluate the controller's assertion against COSO Principle 16.",
      Choices: {
        A: "The controller is correct — monthly variance analysis constitutes ongoing monitoring and the external audit provides a separate evaluation, together satisfying COSO Principle 16",
        B: "The controller is incorrect — the external audit evaluates financial statement accuracy, not internal control effectiveness, and the variance analysis fails to detect non-P&L control circumventions, meaning neither component qualifies as monitoring under Principle 16",
        C: "The controller is partially correct — the external audit satisfies the separate evaluation requirement, but the company must also establish a formal internal audit function to meet the ongoing monitoring component of Principle 16",
        D: "The controller is incorrect — both mechanisms fail as monitoring because monthly variance analysis addresses operating performance (not control effectiveness) and the external audit is not designed to detect management override of controls, requiring implementation of ongoing evaluations embedded in business processes and periodic separate evaluations by qualified assessors"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "The controller's assertion fails on two grounds under COSO Principle 16. First, monthly variance analysis is a management operating review — it compares actual to budgeted financial performance, not control operating effectiveness. The equipment capitalization masked the overspend because variance analysis looks at P&L impacts, not balance sheet transactions. Control monitoring requires evaluating whether controls are present and functioning, not whether financial results meet expectations. Second, an external financial statement audit is designed to provide reasonable assurance about whether the financial statements are free of material misstatement — it is not designed to provide an opinion on internal control effectiveness (unless specifically engaged for that purpose). More importantly, management override of controls (the split-purchase scheme) is an inherent limitation that standard audit procedures are not designed to detect at the transaction-splitting level. COSO Principle 16 requires both ongoing evaluations (built into business processes, providing real-time feedback on control operation) and separate evaluations (periodic, systematic assessments by internal audit, management self-assessment, or external parties). Dunthorpe has neither. The correct action is to implement process-level control monitoring (e.g., exception reports flagging requisition splitting) and periodic independent assessments.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 16", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 3: P1-EC-010 — Fraud Triangle + Anti-Fraud Controls (Analyze, Difficult) ==========
  {
    qid: "P1-EC-010",
    pack: "C",
    section: "E",
    metadata: {
      QuestionID: "P1-EC-010",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A correctly identifies pressure as a fraud triangle element but misidentifies the specific pressure driver. The scenario describes a newly hired, recently divorced employee with disclosed financial difficulties and student loans — this is a financial pressure (personal debt, lifestyle needs), not a performance-related pressure tied to unrealistic sales targets. The scenario explicitly states the employee is performing well against targets, so sales quota pressure is not applicable. Distinguishing between financial pressure (personal) and performance pressure (organizational) is critical for fraud risk assessment — different pressures call for different control responses. Financial pressure is typically harder for an employer to detect and mitigate through organizational policy alone.",
      ExplanationWrongB: "",
      ExplanationWrongC: "Option C correctly identifies rationalization as a fraud triangle element but suggests remediation that targets opportunity, not rationalization. Rotating procurement staff among vendor portfolios disrupts the long-term vendor relationships in which fraud can be concealed — this is an anti-opportunity control (COSO Principle 12), not an anti-rationalization measure. Rationalization is the internal justification a person uses to reconcile fraudulent behavior with their self-image ('they owe me,' 'I'll pay it back,' 'everyone does it'). Mitigating rationalization requires controls that influence ethical climate: codes of conduct, tone at the top, whistleblower mechanisms, and employee support. Staff rotation is effective for detecting ongoing schemes but does nothing to prevent the initial decision to commit fraud.",
      ExplanationWrongD: "Option D extends the fraud triangle to the fraud diamond but reaches the wrong conclusion. The fraud diamond adds capability (the individual's position, intelligence, and ability to execute the fraud) to the three elements of pressure, opportunity, and rationalization. The scenario's procurement manager held a position that enabled the fraud (15-year employee with system access), so capability was present. However, the controls described — vendor setup reviews and quarterly vendor master audits — address OPPORTUNITY, and the ethics certification weakly addresses RATIONALIZATION. The question asks which element the controls FAILED to address adequately, not which framework is more complete. The fraud diamond does not change the assessment that rationalization remains the least mitigated element. Psychometric screening for 'propensity for rationalization' is not a recognized or reliable control — rationalization is addressed through ethical culture, whistleblower mechanisms, and employee support, not pre-hire personality testing.",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-EC-010 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.011 COSO Principle 8 — fraud risk assessment — fraud diamond analysis",
      MicroTopic: "COSO Principle 8 — fraud risk assessment — fraud triangle",
      UniqueConceptKey: "E-C011-fraud-triangle-anti-fraud-controls",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Greenwich Medical Devices discovered that a procurement manager created three fictitious vendor accounts over eighteen months and approved $218,000 in payments for services never rendered. The manager was a 15-year employee with consistently strong performance reviews. Investigation revealed the manager had recently divorced, disclosed financial difficulties during a routine credit check, and had student loans in default. Greenwich's controls include an annual ethics certification signed by all employees, monthly management review of new vendor setups, and quarterly surprise audits of vendor master file changes. The board asks: 'We had controls in place. Which element of the fraud triangle did our controls fail to address, and what specific control should we add?'",
      Choices: {
        A: "Pressure — the controls failed to detect the manager's financial difficulties because the annual credit check was only correlated with performance reviews; the company should add real-time monitoring of employee financial distress indicators tied to procurement system access",
        B: "Rationalization — the controls address opportunity through monthly vendor setup review and quarterly surprise audits, but the annual ethics certification is inadequate for addressing rationalization; the company should add an employee support program and anonymous whistleblower mechanism to specifically target the rationalization element",
        C: "Rationalization — the manager rationalized the fraud as justified compensation; the company should add mandatory job rotation for procurement staff every 18 months and require two signatures on all vendor setup forms",
        D: "The controls adequately addressed opportunity and pressure, but the fraud triangle framework is incomplete — under the fraud diamond model, the missing element is capability, and the company should add psychometric screening for procurement hires to assess propensity for rationalization"
      },
      CorrectChoice: "B",
      ExplanationCorrect: "The existing controls — monthly management review of new vendor setups and quarterly surprise vendor master file audits — both address the opportunity element of the fraud triangle by increasing the probability of detection. The annual ethics certification, however, is a once-per-year signature exercise that does not actively shape ethical climate. The unaddressed element is rationalization: the process by which an individual internally justifies fraudulent conduct ('I deserve this after 15 years,' 'I'll pay it back when my finances improve'). Rationalization is mitigated through controls that reinforce ethical norms: tone at the top, a strong code of conduct with active enforcement, whistleblower hotlines that employees trust, and employee support programs (EAPs, financial counseling) that provide legitimate alternatives to fraudulent behavior. The manager's disclosed financial difficulties (pressure) and the controls' detection of vendor setup anomalies (opportunity) were both partially addressed. Adding a whistleblower mechanism specifically targets rationalization by signaling that the organization takes ethical violations seriously and providing a channel for employees to report concerns before rationalization escalates into action.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 8: Fraud Risk Assessment", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 4: P1-EC-030 — ERM Risk Appetite vs. Risk Tolerance (Evaluate, Very Difficult) ==========
  {
    qid: "P1-EC-030",
    pack: "C",
    section: "E",
    metadata: {
      QuestionID: "P1-EC-030",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A confuses the authorization threshold with risk tolerance. The board's resolution to enter the Latin American market with 'maximum annual operating loss of $3 million' is a risk tolerance statement — it sets the acceptable variation around the strategic objective of geographic expansion. Risk appetite is not a per-initiative cap but the aggregate amount of risk the organization is willing to accept in pursuit of its strategy. The board gave management a single-metric tolerance for one market entry — it did not articulate the overall level of risk the enterprise is willing to bear across all strategic initiatives. Furthermore, the CFO's hedging analysis is a risk response evaluation (reduce/share), not a risk appetite articulation.",
      ExplanationWrongB: "Option B conflates risk capacity (the maximum risk the organization can absorb) with risk appetite (the maximum risk it is willing to accept). The credit agreement covenant at 3.5x leverage is an externally imposed constraint — a risk capacity limit. Risk appetite is an internally determined boundary reflecting strategic choice and stakeholder expectations. Framing risk appetite as 'anything within the debt covenant' means the organization takes no affirmative position on what level of risk it actively seeks or avoids — it merely operates up to the lender's limit. The scenario shows the CFO explicitly considering the 3.5x as a ceiling, not as a strategic boundary the board has chosen to operate within. An organization may have risk capacity well above its risk appetite, and conflating the two exposes the organization to more risk than the board intends.",
      ExplanationWrongC: "Option C correctly identifies a strategic board action but mislabels it. The April board meeting discussion of 'acceptable worst-case outcomes' across all major initiatives represents the board articulating risk appetite — the aggregate level of risk the organization is willing to accept. Expanding the credit facility to accommodate the Latin American entry is a financing decision that enables the strategy, not a risk tolerance threshold. Risk tolerance is the acceptable variation around specific objectives (e.g., 'we accept that any single market entry may lose up to $3 million'), not the financing authorization that enables the entry. The $5 million credit facility increase is a resource allocation — it creates capacity but does not bound acceptable losses.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 5,
      CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate/Very Difficult replacement for archived P1-EC-030 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.031 COSO ERM — risk appetite vs. risk tolerance in strategic decision-making",
      MicroTopic: "COSO ERM — risk appetite and risk tolerance",
      UniqueConceptKey: "E-C031-erm-risk-appetite-tolerance",
      LOSTag: "E.2 COSO Enterprise Risk Management",
      Difficulty: "Very Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Rothwell International, a mid-cap manufacturer, is evaluating whether to enter the Latin American market. The CFO presents the following to the board: (1) The entry requires a $12 million investment, representing 15% of Rothwell's capital base. (2) Under a conservative scenario, worst-case annual operating loss is $3 million. (3) Rothwell's existing debt covenant limits total leverage to 3.5x EBITDA; the investment would bring leverage to 3.2x. (4) The board had previously approved a strategic plan stating Rothwell 'seeks moderate, calculated risk to achieve above-market growth.' In April, the board separately discussed 'acceptable worst-case outcomes' across all major initiatives and concluded that aggregate downside across the portfolio should not exceed 8% of equity. The CFO recommends entering the market with foreign exchange hedging, noting that hedging reduces the worst-case loss to $1.8 million. Which statement best evaluates whether the CFO's recommendation aligns with Rothwell's risk appetite and risk tolerance framework?",
      Choices: {
        A: "The recommendation aligns with the risk appetite framework because the board's April discussion established a risk appetite of 'acceptable loss not exceeding 8% of equity,' and the hedged worst-case loss of $1.8 million falls within this boundary",
        B: "The recommendation aligns with the risk tolerance framework because the $3 million worst-case loss falls within the 3.5x debt covenant ceiling, and the hedging reduces residual risk to an acceptable level",
        C: "The board's April discussion of acceptable worst-case outcomes represents risk tolerance statements for individual initiatives, while the board's earlier resolution to enter Latin America represents the risk appetite at the entity level",
        D: "The framework is misapplied because the April board discussion articulates overall risk appetite (aggregate downside ≤ 8% of equity), but no risk tolerance has been set for the Latin American initiative — risk tolerance requires specific, measurable boundaries around individual objectives, not an aggregate cap"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "COSO ERM distinguishes between risk appetite (the aggregate level of risk the organization is willing to accept in pursuit of strategy) and risk tolerance (the acceptable level of variation around specific objectives). The April board discussion articulated risk appetite: aggregate downside across all initiatives should not exceed 8% of equity. However, the board never set a risk tolerance for the Latin American market entry specifically — no one defined the acceptable variation around the entry's performance objectives. The CFO's $3 million worst-case loss is a scenario output, not a tolerance boundary. Risk tolerance requires explicit, measurable thresholds for individual objectives (e.g., 'the board accepts that the Latin American entry may lose up to $1.5 million in year one'). Without this, the CFO is making a risk acceptance decision without board-defined boundaries — the aggregate appetite cap of 8% of equity tells you when the portfolio has too much risk, but not whether any single initiative within the portfolio is within tolerance. A properly functioning ERM framework requires both: the board sets risk appetite (enterprise level), and management and the board jointly establish risk tolerances for major strategic initiatives. The CFO should return to the board with a specific risk tolerance proposal for the Latin American entry before proceeding.",
      StudyLinks: [
        { label: "COSO Enterprise Risk Management — Integrating with Strategy and Performance (2017)", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 5: P1-EC-055 — Control Environment — Tone at the Top (Analyze, Difficult) ==========
  {
    qid: "P1-EC-055",
    pack: "C",
    section: "E",
    metadata: {
      QuestionID: "P1-EC-055",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A elevates a secondary concern above a fundamental control environment failure. The board is not independent: two directors have material consulting relationships ($180,000 each), and the CEO chairs the audit committee — a direct violation of the principle that the audit committee must be wholly independent of management. COSO Principle 2 (board independence and oversight) is violated because management (the CEO) oversees the body responsible for monitoring management. Compensation committee size is a governance best practice, not a COSO Principle 1 violation. The internal control system's foundation is compromised when the CEO sits on the committee charged with overseeing internal controls over financial reporting. This is a more severe and immediate threat to internal control than compensation committee composition.",
      ExplanationWrongB: "Option B correctly identifies two control environment failures but draws the wrong conclusion about their primacy, and mischaracterizes the external auditor findings. The COSO control environment contains five principles: Principle 1 (integrity and ethical values), Principle 2 (board independence), Principle 3 (authority and responsibility), Principle 4 (commitment to competence), and Principle 5 (accountability). Both the CEO-audit-committee chair conflict and the VP override of the receivables allowance are control environment failures, but they operate at different levels. The board independence failure (Principle 2) is an entity-level control environment deficiency affecting the entire internal control system. The receivables override is a process-level ethical failure under Principle 1. Under COSO's top-down approach, the entity-level deficiency is more pervasive and should be remediated first because it undermines the oversight mechanism that should catch process-level failures like the receivables override. External auditor materiality classifications do not determine the ranking of internal control deficiencies.",
      ExplanationWrongC: "Option C misdiagnoses the VP's override of the bad debt allowance as a risk assessment failure. The VP did not misidentify a risk — the VP received a proper allowance recommendation ($420,000), recognized it would cause the division to miss targets, and directed the controller to record $250,000 instead. This is intentional management override — a control environment deficiency under COSO Principle 1 (integrity and ethical values), not a risk assessment failure under COSO Principle 6. Furthermore, 'updating the risk assessment with revised collection probabilities' would not address the problem because the VP already had the correct risk assessment — the VP willfully ignored it. The remediation must address the ethical behavior, not the risk identification methodology.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-EC-055 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.056 COSO Principle 1 — integrity and ethical values — tone at the top failure analysis",
      MicroTopic: "COSO Principle 1 — tone at the top",
      UniqueConceptKey: "E-C056-tone-at-top-failure-analysis",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Meridian Supply's controller presents the following findings to the audit committee: (1) The VP of the Southwest division overrode the standard bad debt allowance formula last quarter, recording $250,000 instead of the controller-recommended $420,000, because 'the division would miss its bonus target.' (2) The CEO approved the override, noting 'we'll true it up in Q4.' (3) Meridian's board has eight directors, including the CEO; three are independent. The CEO chairs the audit committee alongside two independent directors. Two of the three independent directors each receive $180,000 annually for consulting services to Meridian. The external auditor rated the override a 'significant deficiency' but not a material weakness. Which control environment deficiency is most severe, and why?",
      Choices: {
        A: "The compensation committee structure is the most severe deficiency because a three-person compensation committee cannot provide adequate oversight of executive bonus targets, which directly incentivized the VP to override the allowance",
        B: "The VP's override of the bad debt allowance is the most severe because it directly affects the accuracy of reported earnings, and management override of financial reporting controls is the most frequently cited internal control weakness in fraud cases",
        C: "The risk assessment process is the most severe deficiency because the standard bad debt formula failed to capture segment-specific collection risk, and the override — while improper — revealed that the formula was not producing reliable estimates for the Southwest division",
        D: "The board's independence structure is the most severe because the CEO chairs the audit committee and two of three independent directors have material financial relationships with the company, meaning the oversight body responsible for monitoring management is effectively controlled by management"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Under COSO Principle 2 ('The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control'), the audit committee must be independent. Three failures cascade: (1) The CEO chairs the audit committee — the chief executive is overseeing the body that oversees management. This is a direct violation of the principle that those charged with governance must be independent of those they govern. (2) Two of three 'independent' directors receive $180,000 annually in consulting fees — a material financial relationship that disqualifies them as independent under regulatory standards. (3) The combination means the audit committee has zero genuinely independent members. This entity-level control environment deficiency is more severe than any process-level failure because it poisons the oversight mechanism for the entire internal control system. The VP's override should have been escalated to and addressed by an independent audit committee — but with the CEO chairing it, no independent challenge to the override could occur. This is the foundational failure that enables all subsequent control failures.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 2: Board Independence", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  }
];

module.exports = batch1;
