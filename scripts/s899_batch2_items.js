// S899 — Batch 2: Pack D Section E — 5 COSO Items
// Pack D uses 2-space indentation

const batch2 = [
  // ========== ITEM 6: P1-ED-002 — Three Lines of Defense Model Failure (Analyze, Difficult) ==========
  {
    qid: "P1-ED-002",
    pack: "D",
    section: "E",
    metadata: {
      QuestionID: "P1-ED-002",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A confuses a proximate cause with the structural failure. The credit manager's override of a single blocked order is an individual control failure — a symptom, not the root governance defect. The three lines model is designed to catch precisely this type of event: the first line (operations) identifies risk, the second line (risk management) monitors and challenges, and the third line (internal audit) provides independent assurance. The scenario describes all three lines failing simultaneously — operations (credit department) overrode controls, risk management (second line) signed off without challenge, and internal audit (third line) was not consulted. Individual accountability for the credit manager's override does not repair the governance structure. Disciplining one employee while leaving the reporting relationships unchanged means the same failure mode will recur with the next override.",
      ExplanationWrongB: "Option B misidentifies the first line of defense. Under the three lines model, the first line is operational management — the credit department, specifically the credit manager who approved the override. The second line is risk and compliance oversight — the risk management department that reviewed the override and approved it without challenge. The error in the scenario is that the person who approved the override (credit manager) also validated the appropriateness of their own decision when risk management merely rubber-stamped it. This is not a 'review by a more senior person' issue — it is a structural failure where the second line failed to provide independent challenge. Moving approval authority to the divisional controller simply shifts the rubber stamp to a different desk without addressing the structural gap in independent second-line oversight.",
      ExplanationWrongC: "Option C correctly identifies the second line's failure as the primary defect but proposes the wrong remediation. The second line (risk management) failed because it approved the $950,000 override after a cursory review — not because it lacked a formal policy framework. A new policy would be a document on a shelf unless accompanied by a change in reporting structure that enables the second line to exercise genuine independent challenge. The root cause is that the credit manager's manager (the divisional controller) directed the override, and risk management reports to the same divisional controller — creating a conflict where the second line reports to the person whose decisions it is supposed to challenge. The structural fix requires the second line to have a reporting line independent of the operational chain it monitors.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-ED-002 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.003 three lines of defense model — structural failure analysis",
      MicroTopic: "Three lines of defense model — identifying gaps",
      UniqueConceptKey: "E-D003-three-lines-defense-failure",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Bayswater Trading's credit department approved a $950,000 credit limit override for a new customer despite the customer's D&B report showing three recent payment defaults. The credit manager approved the override after the divisional controller argued that 'landing this account will make our quarter.' The override was reviewed by the risk management department, which noted no objection after a 15-minute review. Internal audit was not informed of the override. The customer defaulted six weeks later on $640,000 of outstanding invoices. Under the Three Lines of Defense model, which line failed most significantly, and what structural remediation should the board require?",
      Choices: {
        A: "The first line (operational management — credit department) failed because the credit manager approved an override against established credit policy; the board should require individual accountability and terminate the credit manager",
        B: "The first line failed because the override should have been escalated to a higher approval authority; the board should revise the credit policy to require divisional controller approval for any override exceeding 20% of the standard credit limit",
        C: "The second line (risk management) failed because it approved the override after only a 15-minute review without independent analysis; the board should require risk management to develop a formal credit override review policy with minimum review standards",
        D: "Both the first and second lines failed, but the second line's failure is more significant because it is designed to provide independent challenge; the board should restructure risk management to report directly to the audit committee rather than through the divisional controller's chain of command"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Under the Three Lines of Defense model, the first line (operational management) owns and manages risk — the credit manager should have followed credit policy but was directed by the divisional controller to override it. The second line (risk management) provides oversight and independent challenge — it should have performed substantive review of an override that was three times the standard limit, yet it approved it after 15 minutes. The failure of the second line is more significant because its structural purpose is to identify and challenge exactly this type of first-line override. However, the root cause is structural: risk management reports through the same divisional controller who directed the override, creating an inherent conflict where the second line's oversight function is compromised by its reporting relationship. The correct remediation restructures the second line to report independently to the audit committee, enabling genuine independent challenge regardless of operational management pressure. The third line (internal audit) was never given the opportunity to assess the override, but its absence from the process is secondary to the second line's active failure.",
      StudyLinks: [
        { label: "The IIA's Three Lines Model (2020)", url: "https://www.theiia.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 7: P1-ED-015 — ERM Risk Response Strategies Evaluation (Evaluate, Difficult) ==========
  {
    qid: "P1-ED-015",
    pack: "D",
    section: "E",
    metadata: {
      QuestionID: "P1-ED-015",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A proposes a single response to a multi-dimensional risk. Foreign exchange hedging addresses currency risk — one component — but the scenario describes broader risks beyond FX: potential nationalization, sourcing disruption, and political instability in a country with deteriorating rule of law. Hedging the currency exposure does nothing to mitigate expropriation risk or supply chain interruption. A single-risk-mitigation strategy that ignores the other two risk dimensions is incomplete. Furthermore, hedging costs reduce margins on the $3.5 million annual savings, and the scenario does not provide enough information to assess whether the residual savings after hedging costs justify the strategic and operational risks. The CEO's instinct to reduce one risk while ignoring others represents a failure to apply the ERM portfolio view.",
      ExplanationWrongB: "",
      ExplanationWrongC: "Option C correctly identifies residual risk but applies the risk tolerance concept incorrectly. Risk tolerance sets acceptable boundaries for variation around specific objectives — but the board has not set tolerances for the sourcing initiative. The $3.5 million projected savings is an expected outcome, not a tolerance boundary. COSO ERM requires that risk responses reduce residual risk to within the organization's risk tolerance. But without board-established tolerances for this initiative, the CEO cannot determine whether the residual risk after hedging is within tolerance. Furthermore, evaluating hedging costs against expected savings is a cost-benefit analysis of one risk response tool, not a comprehensive risk response strategy that addresses all three risk dimensions identified in the scenario.",
      ExplanationWrongD: "Option D recommends risk avoidance — exiting the market entirely — which may be premature without evaluating intermediate options. Risk avoidance eliminates the downside but also eliminates the $3.5 million annual cost savings. Under COSO ERM, risk response selection should consider the portfolio effect: does this risk, in combination with other risks in the portfolio, exceed the organization's risk appetite? The scenario describes a $72 million enterprise with an 8% risk appetite — the board needs to evaluate whether the combined FX, political, and supply chain risks of this single-source country exceed 8% of equity, not simply exit because each risk dimension is significant. The analysis should also consider risk sharing (joint venture, political risk insurance) and risk reduction (partial diversification) as alternatives between the extremes of full acceptance and full avoidance. Choosing the most extreme risk response without evaluating intermediate options violates the ERM principle of proportional response.",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate replacement for archived P1-ED-015 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.016 COSO ERM — risk response strategies (avoid, reduce, share, accept)",
      MicroTopic: "COSO ERM — risk response evaluation",
      UniqueConceptKey: "E-D016-erm-risk-response-evaluation",
      LOSTag: "E.2 COSO Enterprise Risk Management",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Norbrook Electronics sources 40% of its components from a single supplier in a country experiencing increasing political instability. The CFO presents the following: (1) Diversifying to two additional suppliers in politically stable countries would cost $1.2 million annually in higher component prices. (2) The current single-source arrangement saves $3.5 million annually. (3) The country risk index has deteriorated from 'moderate' to 'high' over 18 months. (4) A government advisory warns of potential expropriation of foreign-owned supply chain assets. (5) Norbrook's board has set risk appetite at 'moderate — no single risk event should threaten more than 8% of equity' ($72 million equity base). The CEO recommends maintaining the single-source arrangement while purchasing foreign exchange hedging to offset currency risk. Evaluate the CEO's recommendation under COSO ERM risk response framework.",
      Choices: {
        A: "The recommendation is appropriate because it applies a risk reduction strategy (hedging) to the most quantifiable risk (FX), which is consistent with ERM's principle of addressing measurable risks first",
        B: "The recommendation is inappropriate because it addresses only one of three risk dimensions and fails to evaluate the risk against the board's stated risk appetite; a comprehensive analysis should compare avoidance, reduction, sharing, and acceptance strategies across all risk dimensions before selecting a response",
        C: "The recommendation is partially appropriate — hedging reduces residual risk, but the CEO should also commission a political risk assessment and determine whether the residual risk after hedging falls within the board's risk tolerance before proceeding",
        D: "The recommendation is inappropriate because a single-source supply chain concentration in a high-risk country represents a risk that should be avoided entirely regardless of cost savings; the board should direct the CEO to diversify suppliers within six months"
      },
      CorrectChoice: "B",
      ExplanationCorrect: "COSO ERM requires management to evaluate the full portfolio of risk responses — avoidance, reduction, sharing, and acceptance — against the organization's risk appetite before selecting a course of action. The CEO's recommendation fails in three ways: (1) It addresses only one risk dimension (currency/foreign exchange) while ignoring two others (expropriation risk and supply chain interruption risk from political instability). A hedging program reduces FX exposure but does nothing to protect against a government seizing assets or civil unrest disrupting shipments. (2) It does not evaluate the combined risk against the board's stated risk appetite — with $72 million in equity and an 8% threshold ($5.76 million), a supply chain interruption that forces Norbrook to source 40% of components at spot-market prices could easily exceed this limit. (3) It jumps to a single risk response (reduction via hedging) without evaluating alternatives: risk sharing (political risk insurance, forming a joint venture with a local partner), risk reduction (partial diversification maintaining some cost advantage), or risk acceptance (if the quantified exposure after mitigation falls within appetite). A proper ERM analysis evaluates all response types against all risk dimensions before recommending a course of action.",
      StudyLinks: [
        { label: "COSO Enterprise Risk Management — Integrating with Strategy and Performance (2017)", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 8: P1-ED-020 — Authorization Controls + Management Override (Analyze, Difficult) ==========
  {
    qid: "P1-ED-020",
    pack: "D",
    section: "E",
    metadata: {
      QuestionID: "P1-ED-020",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends a formal policy change that increases risk rather than reducing it. Raising the approval threshold to $75,000 would give the plant manager even more unilateral authority — the opposite of what the control deficiency requires. The problem is not that the limit is too low but that it was circumvented through transaction splitting. A higher threshold simply means the manager could split a $200,000 order into three $67,000 requisitions instead of four $47,500 ones — the same scheme works at any threshold. Control activities must be designed with an understanding of how they can be circumvented. Increasing a circumvented limit is a classic example of a control response that fails to address the root cause.",
      ExplanationWrongB: "Option B confuses authentication with authorization. Biometric verification confirms who the plant manager is — it does not determine what the plant manager is authorized to approve. The transaction occurred because the ERP system allowed the manager to create four separate requisitions, each below the approval limit. Biometric authentication would still identify the same person creating the same four requisitions — it would not flag the split-purchase pattern. This is a category error: authentication controls (something you are, have, or know) address identity verification, not authorization boundaries. The control deficiency is in the authorization rules, not the identity verification mechanism.",
      ExplanationWrongC: "Option C correctly identifies the split-purchase scheme but proposes a remediation that does not scale. A daily total cap would prevent the specific pattern described (four requisitions on one day), but a determined manager could split the orders across four consecutive business days. Transaction-splitting detection requires pattern analysis — cumulative spend by requisitioner vs. vendor over a period, not a simple daily cap. More significantly, daily caps do not address the root control failure: the ERP system's rule engine only applies per-transaction limits, allowing the same requisitioner-vendor combination to circumvent controls through aggregation. The correct remediation upgrades the rule engine logic, not the dollar cap.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-ED-020 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.021 COSO Principle 12 — authorization controls and management override risk",
      MicroTopic: "COSO Principle 12 — control activities — authorization",
      UniqueConceptKey: "E-D021-authorization-management-override",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Larchwood Packaging's ERP system is configured so that purchase requisitions above $50,000 require divisional controller approval. Last month, a plant manager circumvented this control by entering four separate requisitions of $47,500 each to the same vendor for the same equipment model over three business days. The ERP system's approval workflow only checks the per-transaction amount against the $50,000 threshold — it does not aggregate transactions by requester-vendor combination within a time window. The divisional controller learned of the purchases only after the equipment was delivered and invoiced. The plant manager argues, 'All four requisitions were individually under the limit, so I followed the policy.' Under COSO Principle 12, which statement best analyzes the control deficiency?",
      Choices: {
        A: "The control is properly designed but the threshold is inappropriate — a $50,000 limit is too high for a plant manager; the corrective action is to lower the approval threshold to $25,000 for all plant-level requisitions",
        B: "The control is properly designed but enforcement failed — the ERP system correctly checked per-transaction amounts but lacked biometric verification to confirm the plant manager's identity; the corrective action is to implement multi-factor authentication for all purchase requisition entries",
        C: "The control is improperly designed because it does not consider transaction splitting as a circumvention method — the corrective action is to implement a daily aggregate cap of $75,000 per requisitioner in addition to the per-transaction threshold",
        D: "The control is improperly designed because it relies on a single-dimension check that management can circumvent through aggregation — the corrective action is to configure the ERP rule engine to flag any vendor-requisitioner combination exceeding $100,000 within a rolling 5-business-day window"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "COSO Principle 12 requires that control activities be deployed through policies and procedures that put the right controls in place at the right level. The ERP system's per-transaction threshold of $50,000 is a valid control, but it is a single-dimension check that sophisticated users can circumvent through transaction splitting. This is a well-documented control circumvention method: management override by disaggregation. The plant manager's defense — 'all requisitions were individually under the limit' — demonstrates awareness of the control's weakness and intent to exploit it. A properly designed authorization control must incorporate aggregation logic: cumulative spend by requester-vendor pair within a defined time window. The $100,000 rolling 5-day window creates a second dimension of control that catches the circumvention pattern while still allowing legitimate multi-transaction procurement below the per-transaction threshold. Control activities are not merely checklists — they must be designed with an understanding of how they can be circumvented by a motivated insider.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 12", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 9: P1-ED-040 — Risk Assessment Likelihood/Impact Matrix (Analyze, Difficult) ==========
  {
    qid: "P1-ED-040",
    pack: "D",
    section: "E",
    metadata: {
      QuestionID: "P1-ED-040",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A correctly identifies the error in assessing likelihood — the risk manager used a qualitative rating ('probable' = 70-90%) while the actuary provided a quantitative estimate (8%). However, Option A's proposed remedy is incomplete because the risk manager also misassessed impact. Rating the impact of an ERP failure with financial loss of $4.2 million as 'moderate' is reasonable on the scale given (3-5% of revenue, $18-30 million range for 'high'). But the qualitative rating masks a critical refinement: $4.2 million represents 7% of Nettleton's equity, exceeding the board's 6% risk appetite threshold. The risk manager should have flagged this as requiring board-level attention regardless of where it falls on the impact scale. A properly calibrated risk assessment uses qualitative scales for initial triage but validates with quantitative measures, especially when the financial magnitude approaches stated risk appetite boundaries.",
      ExplanationWrongB: "Option B conflates inherent risk with residual risk. The risk manager described the ERP failure scenario and its financial and operational consequences — this is an inherent risk assessment (the risk before considering existing controls). The observed fact that this has not occurred in five years is a valid input to likelihood assessment, not evidence that the risk was assessed on a residual basis. Inherent risk assessment considers the nature and magnitude of the risk without regard to controls. The appropriate next step is to assess residual risk by evaluating the effectiveness of existing controls (backup systems, disaster recovery, ITGC) in reducing either the likelihood or impact of the ERP failure scenario. Option B also misinterprets the scenario — the risk manager did evaluate likelihood (incorrectly, but an evaluation was performed), so the fundamental defect is not that likelihood was omitted.",
      ExplanationWrongC: "Option C proposes expanding the risk universe rather than correcting the existing assessment, which misallocates resources. The risk assessment process under COSO Principle 7 should first ensure that identified risks are correctly evaluated before expanding the scope of risk identification. Adding more risk scenarios to a flawed assessment framework compounds the problem — if likelihood and impact are inconsistently calibrated, adding more risks simply produces more inconsistently calibrated risk assessments. Furthermore, the board's risk appetite of 6% of equity is a constraint on the total risk portfolio, not just a single ERP failure. Before allocating resources to identifying additional risks, the risk manager should correct the existing assessment and ensure all identified risks are evaluated consistently against the board's stated appetite and tolerance boundaries.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-ED-040 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.041 COSO Principle 7 — risk assessment — likelihood and impact",
      MicroTopic: "COSO Principle 7 — risk identification and assessment",
      UniqueConceptKey: "E-D041-risk-assessment-likelihood-impact",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "Ainsley Manufacturing's risk manager assesses the risk of a major ERP system failure using the following methodology: likelihood is rated on a 5-point scale from 'rare' (<5%) to 'almost certain' (>90%); impact is rated from 'negligible' to 'catastrophic' based on estimated financial loss. The risk manager rates the ERP failure as 'possible' likelihood (30-50%) and 'moderate' impact ($1-5 million loss range). The risk manager's notes state: 'We have experienced one 4-hour ERP outage in five years. Estimated financial impact of a multi-day outage is $4.2 million based on lost production and order processing delays.' An independent actuary estimates the likelihood of a multi-day ERP failure at 8% based on industry data for manufacturers of Ainsley's size. The board's risk appetite is that no single risk event should threaten more than 6% of equity ($70 million base). Which finding best evaluates the quality of this risk assessment?",
      Choices: {
        A: "The risk manager materially overstated the likelihood of ERP failure — the actuary's industry-based estimate of 8% falls within the 'rare' category, not 'possible'; the risk manager should recalibrate the likelihood rating to 'rare' and adjust the risk response priority downward accordingly",
        B: "The risk assessment is fundamentally flawed because the risk manager appears to have assessed residual risk (after considering existing backup systems and disaster recovery) without first assessing inherent risk; the assessment should be redone starting with the gross exposure before existing controls",
        C: "The risk assessment is incomplete because the risk manager only evaluated one technology risk — COSO Principle 7 requires identification of risks across all categories (strategic, operational, reporting, compliance) before rating individual risks",
        D: "The risk assessment contains a likelihood calibration error, but the more significant deficiency is that the impact analysis was performed in isolation — the risk manager should have evaluated the $4.2 million estimated loss against the board's 6% risk appetite threshold ($4.2 million) and flagged that the risk consumes the entire single-event risk budget"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "The risk assessment has two related deficiencies. First, there is a likelihood calibration error: the risk manager rated ERP failure as 'possible' (30-50%) based on one 4-hour outage in five years, while the actuary estimates 8% probability using industry data. A single non-material outage does not support a 30-50% probability estimate for a multi-day failure. However, the more significant deficiency is the impact analysis. COSO Principle 7 requires that risks be assessed against the organization's risk appetite and tolerance. Nettleton's board has set a single-event risk appetite of 6% of equity — $4.2 million. The estimated financial loss of $4.2 million from an ERP failure exactly equals this threshold, yet the risk manager did not flag this boundary condition. A risk that consumes the entire single-event risk budget should trigger explicit board-level discussion regardless of its likelihood rating. The impact analysis failed to connect the quantitative loss estimate to the board's stated risk appetite — a basic requirement of a risk assessment that informs governance decisions.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 7: Risk Assessment", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 10: P1-ED-050 — ITGC — Logical Access + Authentication Weaknesses (Analyze, Difficult) ==========
  {
    qid: "P1-ED-050",
    pack: "D",
    section: "E",
    metadata: {
      QuestionID: "P1-ED-050",
      CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends a technology fix for what is fundamentally a governance and process problem. Mandatory 90-day password rotation addresses one aspect of authentication (credential hygiene) but does not address the structural root causes identified in the scenario: (1) 34 terminated employees retained active accounts because the offboarding procedure had no IT notification trigger, not because passwords were weak. (2) Three shared generic accounts ('warehouse,' 'ap_clerk,' 'plant_manager') violate the principle that every account must be uniquely attributable to an individual — password rotation on a shared account is meaningless because the password is shared. (3) Password complexity requirements do not prevent unauthorized access when terminated employees still have valid credentials. The IT consultant's recommendation applies a single technical control to a multi-dimensional governance failure.",
      ExplanationWrongB: "Option B correctly identifies access review as the remediation but misdiagnoses the review frequency as the root cause. Semi-annual access certification is a common cadence — the problem is not the review frequency but the absence of a trigger-based process that removes access upon termination. Even monthly access reviews would leave a window of up to 30 days where terminated employees retain system access. The scenario explicitly describes 34 terminated employees with active accounts — this is a failure of the joiner/mover/leaver (JML) process, not the periodic review schedule. Trigger-based deprovisioning (immediate access removal upon HR termination notification) closes the window entirely. Increasing review frequency reduces but does not eliminate the exposure period.",
      ExplanationWrongC: "Option C focuses on a subset of the access control deficiencies (role design) while ignoring the more fundamental JML process failure. Role-based access with least privilege is a design principle for future-state access management, but the immediate remediation must address the 34 active terminated-employee accounts and the shared generic accounts. Redesigning roles is a medium-term project that does not close the existing access gap. The scenario asks for the most critical deficiency — the presence of 34 active accounts for terminated employees is an immediate security exposure that must be closed before embarking on a role-redesign initiative. Furthermore, least-privilege role design does not solve the shared-account problem; shared accounts violate the principle of individual accountability regardless of how tightly scoped their permissions are.",
      ExplanationWrongD: "",
      question_state: "Active",
      DifficultyScore: 4,
      CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-ED-050 (DL-012 rotation clone)"
    },
    content: {
      Part: 1,
      Section: "E",
      SectionName: "Internal Controls",
      Topic: "E.051 COSO Principle 11 — IT general controls — logical access and authentication",
      MicroTopic: "COSO Principle 11 — ITGC — access management",
      UniqueConceptKey: "E-D051-itgc-logical-access-authentication",
      LOSTag: "E.1 COSO Internal Control Framework",
      Difficulty: "Difficult",
      ItemType: "MCQ",
      ItemStyle: "single-select",
      Stem: "During a routine IT audit of Ellsworth Manufacturing, the auditor discovers: (1) 34 user accounts belong to employees terminated in the past 18 months and have never been deactivated; three of these accounts were used to access the general ledger module within the past 30 days. (2) The warehouse and accounts payable departments share three generic login accounts ('warehouse,' 'ap_clerk,' 'plant_manager') with known passwords posted on a bulletin board. (3) New employees receive system access the same day as their hire date, but the offboarding process has no IT notification step — HR processes termination paperwork without informing IT. (4) The ERP system supports role-based access but Ellsworth has not configured any roles. Under COSO Principle 11 (IT general controls), which combination of control failures is most critical, and what remediation should be prioritized?",
      Choices: {
        A: "The most critical failure is weak password management — the shared account passwords posted on a bulletin board represent the highest immediate security risk; the priority remediation is to enforce mandatory 90-day password rotation with complexity requirements and prohibit password sharing through policy",
        B: "The most critical failure is the absence of periodic access reviews — semi-annual access certification by department heads was never implemented; the priority remediation is to require all department heads to review and certify user access lists within 30 days",
        C: "The most critical failure is the absence of role-based access controls — the ERP system supports RBAC but it was never configured; the priority remediation is to design role profiles based on job functions and migrate all users to role-based access with least-privilege permissions",
        D: "The most critical failure is the broken joiner-mover-leaver process — 34 terminated employees retain active accounts and three have been recently used; the priority remediation is to implement immediate, trigger-based account deactivation integrated with the HR termination workflow and eliminate all shared generic accounts"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "COSO Principle 11 requires that the organization select, develop, and deploy IT general controls to support the achievement of objectives. The most critical failure in Ellsworth's ITGC environment is the broken identity lifecycle (joiner-mover-leaver / JML) process. Thirty-four terminated employees retaining active system access — with three accounts showing recent activity — represents both a segregation-of-duties risk and a direct fraud risk. Any one of these accounts could be used to initiate, approve, or conceal unauthorized transactions. The remediation must be prioritized in this order: (1) Immediately deactivate all 34 terminated-employee accounts. (2) Implement trigger-based deprovisioning integrated with HR's termination workflow so access is removed within hours, not months. (3) Eliminate shared generic accounts — every account must be uniquely attributable to an individual for accountability. (4) After closing the immediate access gap, implement role-based access controls and periodic access certification reviews. The JML process is the foundation of access management — without it, all other access controls (password policies, RBAC, periodic reviews) are built on a compromised base.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 11: IT General Controls", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section E", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  }
];

module.exports = batch2;
