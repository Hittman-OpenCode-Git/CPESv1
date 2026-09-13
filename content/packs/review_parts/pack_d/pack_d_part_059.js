var MCQ_BANK_D_PART_59 = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.057 COSO Principle 17 — monitoring separate evaluations audit scope and frequency",
    "MicroTopic": "Separate evaluations audit scope risk alignment",
    "UniqueConceptKey": "E-D057-separate-evaluations-audit-scope-frequency",
    "LOSTag": "P1-E Internal controls",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Broadwater Credit Union, a $2.1 billion institution serving 180,000 members across 24 branches in three states, maintains an internal audit function directed by Maria Delgado. The audit program operates on a fixed rotation schedule: two branch audits per month, completing the full 24-branch cycle annually. However, the audit work program template was last revised in January 2022. Since then, Broadwater launched mobile deposit capture, peer-to-peer instant transfers, and remote check deposit, which now collectively process $18 million in monthly transaction volume across 94,000 digital transactions. The current audit program contains no testing procedures for mobile deposit daily limit enforcement, P2P transfer authorization workflows, or remote deposit duplicate detection logic. Delgado defends this approach, arguing that the fixed rotation schedule guarantees universal branch coverage and that digital banking platforms are protected by the vendor's standard security certifications. Between March 2024 and May 2025, a fraud scheme exploited mobile deposit daily limits — an individual deposited the same check image across six different branches — generating 340 fraudulent deposits totaling $840,000 before detection. Branch auditors had tested teller cash counts and vault reconciliations at all 24 branches during this period but never examined any mobile deposit controls. Which evaluation of Broadwater's monitoring activities under COSO Principle 17 is most accurate?",
    "Choices": {
      "A": "Broadwater's monitoring is adequate because the fixed rotation schedule ensures complete branch coverage annually, and the $840,000 loss is below the materiality threshold for a $2.1 billion institution, making it a cost of doing business rather than a control deficiency requiring remediation.",
      "B": "The monitoring deficiency is attributable to the vendor's failure to design adequate security features into the digital banking platform — Broadwater's internal audit function cannot reasonably be expected to test controls that the software vendor was contractually obligated to design and maintain.",
      "C": "Broadwater's monitoring is deficient under COSO Principle 17 because separate evaluations must be updated to reflect changes in the organization's risk profile, operating environment, and control structure. An audit program that has not been revised in four years despite the introduction of $216 million in annual digital transaction volume fails to evaluate whether controls over new, material business channels are designed appropriately and operating effectively.",
      "D": "The audit function performed adequately because the fraud scheme involved check image manipulation — a type of external fraud that internal controls cannot reasonably prevent regardless of audit scope, and for which internal audit bears no responsibility under COSO's monitoring principle."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under COSO Principle 17, the organization selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. Separate evaluations — including internal audits — must be scoped and conducted at a frequency sufficient to provide reasonable assurance about control effectiveness as risks evolve. Broadwater's audit program is deficient in two dimensions under this principle. First, the scope is outdated: the audit work program has not been revised in four years despite the introduction of digital banking channels that now process $18 million monthly ($216 million annually), representing a material and fundamentally different transaction channel from the teller-and-vault environment the program was designed to test. COSO explicitly requires that the scope of separate evaluations be adjusted as the organization's risk profile, operating environment, and control structure change. An audit program that tests only physical-cash controls at a time when digital transactions dominate the risk landscape is evaluating controls that are no longer the primary risk exposure. Second, the monitoring frequency is misaligned with risk velocity: branch-level vault reconciliations tested annually provided zero visibility into the mobile deposit channel where $840,000 in fraud accumulated over 14 months. The audit director's argument that vendor certifications protect digital channels reflects a misunderstanding of the auditor's responsibility — internal audit must independently test whether controls are designed and operating effectively, not rely on vendor representations that address the vendor's development process rather than the organization's specific control configuration. A common exam trap is to equate complete branch coverage with complete control coverage: visiting every branch annually does not mean testing every control that matters to the organization's current risk profile.",
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
    "QuestionID": "P1-ED-057",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly invokes materiality and a cost-of-doing-business rationale. Under COSO, the threshold for identifying a control deficiency is not whether a single loss exceeds a financial materiality benchmark — it is whether the organization's controls are designed to prevent or detect errors or fraud on a timely basis. An $840,000 fraud that went undetected for 14 months while the audit function visited every branch during that period is direct evidence that the controls being tested (vault cash counts, teller reconciliations) were not the controls at risk (mobile deposit limits, duplicate image detection). Furthermore, COSO does not recognize a cost-of-doing-business exemption for control deficiencies — a gap in control design or evaluation scope remains a gap regardless of whether the first discovered loss crossed an arbitrary dollar threshold. A candidate selecting this option may be conflating external audit's financial statement materiality framework with internal audit's separate obligation under COSO Principle 17 to evaluate control design and operating effectiveness across all material business processes, not just those whose failure would produce a material financial statement misstatement.",
    "ExplanationWrongB": "Option B incorrectly shifts responsibility to an external vendor. Under COSO Principle 17 and professional internal auditing standards, management and the board retain ultimate responsibility for internal control, even when business processes rely on third-party technology. The internal audit function is expected to include within its scope the controls governing outsourced or vendor-provided systems that process material transaction volumes. Relying on a vendor's security certifications without independent verification is not a defense — it is a scope deficiency. The auditor must test whether the controls actually operate as intended in the organization's specific environment, configured with its particular parameters and limits. Additionally, the fraud did not exploit a software vulnerability that the vendor failed to patch; it exploited a feature (mobile deposit) whose operational controls — daily limits per account, duplicate image detection — Broadwater itself was responsible for configuring, enforcing, and auditing. A candidate selecting this option may misunderstand the boundary between vendor responsibility for software architecture and organizational responsibility for internal control over financial transactions processed through that software.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D mischaracterizes the fraud as an inherently unpreventable external scheme that falls outside the scope of internal control. Check image manipulation via mobile deposit is a well-documented fraud vector in the banking industry, and internal controls specifically exist to mitigate it — including mobile deposit daily limits (which the fraudster circumvented by splitting deposits across six different branches), duplicate check image detection algorithms (which the audit program should have been updated to test), and transaction monitoring analytics (which would have flagged the same check image deposited at multiple branches within a short window). COSO does not exempt fraud categories from internal control scope based on whether the perpetrator is external or internal. The audit function's responsibility under Principle 17 extends to evaluating whether controls over all material transaction channels — including digital channels introduced since the last program update — are designed adequately and operating effectively. Dismissing the $840,000 loss as an unpreventable external event is precisely the type of inadequate risk assessment that a robust monitoring function is designed to challenge.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S60B -- DL-012 clone replacement"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.058 internal control cost benefit limitation",
    "MicroTopic": "internal control cost benefit limitation",
    "UniqueConceptKey": "E-D058-internal-control-cost-benefit-limitation",
    "LOSTag": "P1-E Internal controls",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ivorycrest's management decides not to implement an extremely costly control because the risk it addresses is low and infrequent. What limitation of internal control does this illustrate?",
    "Choices": {
      "A": "A control environment weakness",
      "B": "The inherent cost-benefit limitation of internal control design",
      "C": "Management override of existing controls",
      "D": "A segregation of duties failure"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the COSO Internal Control—Integrated Framework, internal control has inherent limitations, including the reality that controls must provide reasonable (not absolute) assurance while being cost-effective. Internal control has an inherent cost-benefit limitation: controls should provide reasonable, not absolute, assurance. Declining an extremely costly control for a low and infrequent risk reflects a judgment that the control cost exceeds the expected risk-reduction benefit.",
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
    "QuestionID": "P1-ED-058",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "A control environment weakness relates to the organization’s overall attitude toward controls, such as poor tone at the top. The decision described is a rational cost-benefit judgment — the cost of the control exceeds the expected benefit from reducing a low, infrequent risk.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Management override occurs when someone with authority intentionally bypasses established controls. Here, management is not overriding a control — they are making a deliberate decision not to implement one because its cost outweighs its risk-reduction benefit.",
    "ExplanationWrongD": "A segregation-of-duties failure combines incompatible duties; the issue is not task assignment but cost versus benefit.",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.059 COSO Principle 4 — board independence and oversight of related party transactions",
    "MicroTopic": "Board independence audit committee composition",
    "UniqueConceptKey": "E-D059-board-independence-related-party-oversight",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Thorne Industrial Manufacturing, a publicly traded producer of industrial fasteners with $890 million in annual revenue, has a nine-member board of directors. The board includes the sitting CEO, the company's former CFO (who retired two years ago but was immediately invited to join the board), and the company's outside legal counsel from a firm that bills Thorne $1.2 million annually in legal fees. The three-member audit committee is chaired by the former CFO. Over a three-year period, the audit committee approved related-party transactions with a metal supply company owned by the CEO's brother-in-law totaling $4.7 million. An SEC investigation subsequently determined that the prices paid under these contracts were 22% above prevailing market rates for comparable industrial-grade steel and aluminum. The audit committee's review of each of these transactions consisted of a single 15-minute agenda item during the quarterly committee meeting, with no competitive bidding analysis, no independent price benchmarking, and no discussion of alternatives. The audit committee chair stated that the committee relied on management's representation that the pricing was competitive. Which evaluation of the board's compliance with COSO Principle 4 is most accurate?",
    "Choices": {
      "A": "The board complies with COSO Principle 4 because the audit committee reviewed and approved each related-party transaction, which satisfies the oversight requirement — the pricing outcome, while unfavorable, does not invalidate the fact that independent review occurred.",
      "B": "The board violates COSO Principle 4 solely because the former CFO chairs the audit committee. Under SEC and exchange listing standards, a former CFO must observe a five-year cooling-off period before serving on the audit committee, and the two-year gap is insufficient regardless of other safeguards.",
      "C": "The related-party transactions are a management failure, not a board independence failure. The CEO's failure to disclose the family relationship to the supplier is the root cause — an independent board cannot detect related-party transactions that management does not properly disclose.",
      "D": "The board violates COSO Principle 4 because the audit committee lacks genuine independence — the former CFO's dual role and the absence of competitive benchmarking, independent price verification, and meaningful deliberation time mean the committee provided the appearance of oversight without its substance, and the board's broader composition further undermines independent judgment."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "COSO Principle 4 — within the Control Environment component — states that the board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control. Independence requires both structural conditions (composition, relationships, financial ties) and behavioral conditions (willingness to challenge, rigor of review, access to independent information). Thorne's board is deficient on both dimensions. Structurally: the presence of the sitting CEO as a board member creates a conflict for decisions that evaluate management's performance; the former CFO who retired only two years prior retains personal and professional relationships with the management team whose related-party transactions the audit committee reviews; and the outside legal counsel's firm receives $1.2 million annually, creating a financial dependence that compromises independent judgment. The audit committee chair — the former CFO — is the least independent person to evaluate related-party transactions that occurred during or shortly after their tenure as CFO. Behaviorally: a 15-minute agenda item for a $4.7 million related-party transaction series with no competitive benchmarking, no independent price verification, and no discussion of alternative suppliers is not oversight — it is ratification. Under COSO, the board's oversight role requires active inquiry, not passive acceptance of management representations. The absence of rigorous review procedures is itself a control deficiency in the control environment — the entity's highest-level governance body failed to exercise the skepticism and diligence that independence requires. An exam trap is to treat board composition requirements as a checklist (count independent directors) without evaluating whether the board's actual conduct satisfies the behavioral dimension of independence.",
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
    "QuestionID": "P1-ED-059",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A confuses the form of oversight with its substance. Under COSO Principle 4, board independence and oversight are not satisfied by the mere existence of a review step — the review must be competent, rigorous, and independent. A 15-minute agenda item that relies solely on management's representation that pricing is competitive, without any independent benchmarking or competitive analysis, is not meaningful oversight. The fact that $4.7 million in payments were made at prices 22% above market is evidence that the review process was substantively inadequate. COSO requires the board to exercise oversight of internal control, not merely to document that a meeting occurred. A candidate selecting this option may be applying a checklist mentality to board oversight, treating the existence of review procedures as sufficient regardless of whether those procedures are designed to actually detect problems.",
    "ExplanationWrongB": "Option B correctly identifies the former CFO as an independence concern but misstates the regulatory framework and oversimplifies the deficiency. While SEC rules and exchange listing standards impose cooling-off periods for audit committee members who served as officers of the company, the specific five-year period is not a bright-line COSO rule — it applies to the audit committee financial expert designation and Sarbanes-Oxley requirements. More critically, this option isolates the former CFO as the sole defect when the scenario describes a systemic independence failure: the sitting CEO on the board, the outside counsel receiving $1.2 million annually, and the audit committee's procedural deficiencies all independently violate Principle 4. Fixing the audit committee chair alone — without addressing the compromised board composition and the absence of rigorous review procedures — would not bring Thorne's governance into compliance with COSO Principle 4.",
    "ExplanationWrongC": "Option C misattributes the failure to management non-disclosure when the scenario explicitly states that the audit committee reviewed and approved the related-party transactions — meaning the relationship was disclosed and the committee was aware of it. The failure is not a detection gap caused by concealment; it is a substantive review gap. The audit committee knew about the transactions (they appeared on the quarterly agenda), knew about the supplier relationship (related-party transactions are categorized as such precisely because the relationship is known), and still approved $4.7 million in above-market payments after only 15 minutes of discussion. This is an oversight failure, not a disclosure failure. Under COSO Principle 4, the board's duty is not merely to be informed of related-party transactions but to exercise independent judgment about their terms and business justification — which requires more than management's assertion that the pricing is competitive.",
    "ExplanationWrongD": "",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S60B -- DL-012 clone replacement"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.060 COSO Principle 15 — external communication of material weakness",
    "MicroTopic": "External communication of material weakness",
    "UniqueConceptKey": "E-D060-external-communication-material-weakness",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Industries, a publicly traded manufacturer, discovers a material weakness in internal control over financial reporting in May. The CFO recommends disclosing the weakness only in the annual Form 10-K, due in February of the following year — eight months away. The general counsel disagrees, arguing that COSO Principle 15 and SEC disclosure requirements mandate earlier communication to external stakeholders. Which position is most consistent with COSO Principle 15 and SEC rules?",
    "Choices": {
      "A": "The CFO is correct — a material weakness is an internal operational matter that should be disclosed only in the annual 10-K after year-end procedures are complete.",
      "B": "The company must file a Form 8-K within four business days disclosing the material weakness, regardless of whether previously issued financial statements can still be relied upon.",
      "C": "The company should disclose the material weakness in its next quarterly Form 10-Q, because COSO Principle 15 requires communicating relevant internal control deficiencies to external parties in a timely manner, and withholding the information for eight months would deprive investors of material information.",
      "D": "The company should delay disclosure until remediation is complete, because an unremediated deficiency does not require external communication until the control weakness has been fully corrected."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "COSO Principle 15 requires organizations to communicate relevant internal control matters to external parties. Under SEC rules, a material weakness in internal control over financial reporting must be disclosed in the next periodic filing (10-Q or 10-K) in which management evaluates ICFR effectiveness. Withholding disclosure of a known material weakness for eight months while continuing to file quarterly reports would deprive investors of material information. The general counsel's position aligns with both COSO Principle 15's timely-communication imperative and SEC disclosure requirements. A common exam trap is to confuse the narrow Form 8-K trigger for non-reliance on prior financial statements (Item 4.02) with the broader periodic-reporting requirement for material weakness disclosure.",
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
    "QuestionID": "P1-ED-060",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly treats a material weakness as a purely operational matter deferrable to the annual 10-K. Under COSO Principle 15, relevant internal control deficiencies must be communicated in a timely manner — eight months is not timely when quarterly reports are filed. SEC rules require disclosure in the next periodic filing, which for a May discovery would typically be the Q2 or Q3 Form 10-Q.",
    "ExplanationWrongB": "Option B overstates the filing obligation. SEC Form 8-K Item 4.02 requires disclosure within four business days only when a company concludes previously issued financial statements should no longer be relied upon due to an error. Routine discovery of a material weakness without a restatement does not trigger an immediate 8-K.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D misstates the disclosure obligation. SEC guidance requires disclosure of the existence of a material weakness regardless of remediation status. Management must disclose it even if a remediation plan is underway. Waiting until remediation is complete would indefinitely defer disclosure of known control failures.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "upgrade_note": "S52 Phase 4 — Evaluate replacement for archived P1-ED-060 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.061 COSO Principle 12 — control activities dual approval threshold circumvention",
    "MicroTopic": "Dual approval control design circumvention",
    "UniqueConceptKey": "E-D061-dual-approval-threshold-circumvention",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E3",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Castleford Municipal Securities, a $340 million bond underwriting firm with 85 employees, requires dual signatures from two authorized officers on all wire transfers exceeding $50,000. All outgoing wires are logged in a daily wire activity report that the operations manager, Susan Okafur, reviews each morning. Over a 16-month period, a senior municipal bond trader, David Pressler, circumvented this control by executing 49 separate wire transfers — each for exactly $49,900, just under the dual-signature threshold — from the firm's operating account to a personal account he controlled at a different bank. The total funds transferred over the 16-month period was $2,445,100. Okafur reviewed the daily wire activity report every morning but focused exclusively on transfers above the $50,000 threshold, treating the sub-threshold transfers as independent, low-risk transactions. The fraud was discovered only when an external auditor, during the annual financial statement audit, performed a substantive analytical procedure comparing wire transfer frequency and volume to prior periods and identified an anomalous 49-transfer pattern to the same recipient account. The firm's external auditor had never previously tested wire activity below the dual-approval threshold. Which statement best evaluates the design of Castleford's dual-approval control under COSO Principle 12?",
    "Choices": {
      "A": "The dual-approval control is poorly designed because a bright-line dollar threshold, without complementary controls such as cumulative transfer monitoring or pattern-based analytics, is inherently vulnerable to structuring — the deliberate splitting of transactions into amounts just below the threshold to avoid triggering the control. COSO Principle 12 requires control activities to be designed at a level of precision sufficient to mitigate the assessed risk, and a threshold-based authorization control without aggregate monitoring fails this requirement when the risk is unauthorized cash disbursement.",
      "B": "The dual-approval control was properly designed and the failure was purely human — the operations manager should have noticed that 49 transfers to the same personal account at $49,900 each was an obvious pattern. COSO Principle 12 does not require controls to be automated or to detect intentional circumvention by a determined insider.",
      "C": "The dual-approval control is adequate because $50,000 is an industry-standard threshold for wire transfer authorization in the securities industry, and COSO Principle 12 does not prescribe specific dollar amounts or mandate analytical monitoring of transactions below the authorization threshold.",
      "D": "The control failure should be attributed to the external auditor's sampling methodology, not to the internal control design. If the external auditor had included sub-threshold wires in its annual testing scope, the fraud would have been detected within 12 months rather than 16 months."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "COSO Principle 12 states that the organization deploys control activities through policies that establish what is expected and procedures that put policies into action. A well-designed control activity must operate at a level of precision sufficient to address the assessed risk. Castleford's dual-approval control fails this standard in a fundamental way. The firm correctly identified the risk — unauthorized wire transfers that could lead to misappropriation of assets — and correctly selected a type of control (authorization/approval) appropriate to that risk. However, the control's design precision is insufficient because the mechanism (a single-attribute threshold) can be trivially subverted through structuring: the trader needed only to keep each transfer at $49,900 to bypass the control entirely. This is not a sophisticated exploitation of an obscure weakness — structuring transactions to avoid approval thresholds is one of the oldest and most well-documented control circumvention techniques. COSO Principle 12 implies that when a control relies on a quantitative trigger (a dollar threshold), management must consider whether the control is susceptible to structuring and, if so, whether complementary controls exist to detect aggregate patterns that individual transactions below the threshold do not reveal. In Castleford's case, the daily wire activity report existed but was not designed as a complementary detective control — it focused on the same $50,000 threshold it was meant to complement, merely duplicating the approval trigger rather than providing a different analytical lens. A properly designed control environment would pair the preventive dual-approval threshold with a detective control such as: cumulative wire transfer monitoring by recipient account, exception reporting for sub-threshold transfers that cluster around the threshold value, or periodic reconciliation of wire activity to authorized payees. An exam trap is to evaluate a control in isolation — asking only 'does the control exist?' — rather than evaluating whether the set of controls as a whole is sufficient to reduce the assessed risk to an acceptable level.",
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
    "QuestionID": "P1-ED-061",
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
    "ExplanationWrongB": "Option B mischaracterizes both COSO's requirements and the nature of the control failure. COSO Principle 12 does not require automation specifically, but it does require that control activities be designed to achieve their objective. When a control's design makes circumvention possible through a predictable, well-documented technique (structuring) — and the organization has no complementary controls to detect that technique — the control is poorly designed, not merely poorly executed. The operations manager's failure to identify the pattern is a symptom of the design defect: the daily wire report was structured around the same $50,000 threshold and did not present recipient-level aggregation or pattern analysis that would make anomalous activity visible. Expecting a human reviewer to mentally aggregate 49 transactions across 16 months from a transaction-level report is not a reasonable control reliance — it is an invitation to failure. A candidate selecting this option may be over-attributing control failures to individual performance deficiencies when the root cause is a structural control design gap.",
    "ExplanationWrongC": "Option C incorrectly appeals to industry practice as a substitute for control effectiveness analysis. Even if $50,000 is a common threshold in the securities industry, COSO Principle 12 requires that each organization evaluate whether its specific control activities are sufficient to address its specific assessed risks. Industry practice may inform that evaluation but does not replace it. An industry-standard threshold that can be circumvented through structuring is still a design weakness, regardless of how many other firms use the same threshold. Furthermore, the scenario's facts demonstrate the control's inadequacy: $2,445,100 was transferred undetected for 16 months. A candidate selecting this option may be applying a compliance mindset (the control matches industry practice) rather than a risk-based control design mindset (the control actually mitigates the assessed risk to an acceptable level).",
    "ExplanationWrongD": "Option D incorrectly shifts internal control responsibility to the external auditor. Under COSO, external audit is not a component of the organization's internal control system — it is an independent assurance activity. The organization, not its external auditor, bears primary responsibility for designing and maintaining effective internal controls. Relying on external audit sampling to detect control circumvention is a monitoring deficiency, not a design justification. Moreover, the external auditor's standard procedures test controls to support the ICFR opinion, not to provide continuous fraud detection. The fact that the external auditor eventually discovered the fraud through analytical procedures does not retroactively validate the absence of internal detective controls — $2.4 million was stolen because the firm had no internal mechanism to detect a structured circumvention of its own approval controls.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S60B -- DL-012 clone replacement"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.062 COSO Principle 9 — fraud risk management override of controls",
    "MicroTopic": "Management override of controls fraud risk",
    "UniqueConceptKey": "E-D062-management-override-fraud-risk",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ellsworth Foods, a family-owned food distribution company with $520 million in annual revenue and 1,200 employees, has operated under its founder and CEO, Harold Ellsworth, for 30 years. Harold is widely respected in the community, serves on the boards of two local charities, and personally signs every charitable contribution. The company maintains a formal code of conduct, an independent three-member audit committee, a whistleblower hotline managed by an external service provider, and annual fraud risk assessments conducted by the internal audit department. The controller, Rebecca Morse, recently discovered that Harold has been directing personal expenses through the company's accounts payable system for at least five years — including $340,000 for vacation property maintenance in four locations, $215,000 for his three children's private university tuition, $180,000 in country club dues and golf tournament sponsorships, and various other personal expenditures totaling approximately $1.8 million. The CFO and the accounts payable manager both approved each payment, citing Harold's explicit verbal or email instructions. The audit committee never received any reports about these transactions because Harold personally prepared the quarterly financial review package — including the schedule of significant disbursements and related-party transactions — that went to the committee, and he omitted all personal expenses from those schedules. Which facet of COSO Principle 9 did Ellsworth's governance structure fail to address?",
    "Choices": {
      "A": "The code of conduct was insufficiently detailed — it should have included a specific dollar threshold above which CEO expense reimbursements require independent audit committee pre-approval, which would have prevented the disbursements regardless of the CEO's intent.",
      "B": "Ellsworth's governance failed to address management override risk — COSO Principle 9 specifically requires organizations to assess the risk of management override of internal controls and design separate evaluations to address that risk. The combination of the CEO controlling both the disbursement initiation (via direct instructions to the CFO and AP manager) and the reporting to the audit committee (via personal preparation of the quarterly review package) created an unchecked override path that circumvented every existing control.",
      "C": "The primary failure was in the accounts payable manager and CFO, who should have refused to process personal expenses regardless of the CEO's instructions. COSO Principle 9's fraud risk assessment is satisfied by the existence of the whistleblower hotline, which either employee could have used to report the improper payments.",
      "D": "The primary failure was the audit committee's lack of diligence — a reasonably diligent audit committee member should have questioned why the quarterly review package was prepared personally by the CEO rather than by the CFO or internal audit, and this questioning would have revealed the omitted disbursements."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 9 — within the Risk Assessment component — requires the organization to identify, assess, and respond to risks, including the specific risk of management override of internal controls. Management override is a distinct fraud risk category because it operates differently from other fraud risks: it is perpetrated by individuals with the authority to direct transactions, suppress controls, and control the information flow to governance bodies. Ellsworth's governance structure addressed surface-level fraud risks (a code of conduct exists, an independent audit committee meets, a hotline is available, annual fraud risk assessments are conducted) but failed to address the specific risk that the CEO — the individual with the most authority — could both initiate improper payments and control their reporting. The two critical design gaps under COSO Principle 9 are: first, the CEO's ability to direct disbursements through the CFO and AP manager without any independent verification of business purpose, creating a single-point override path through verbal or email instruction; and second, the CEO's personal control over the quarterly financial review package provided to the audit committee, which allowed him to filter out transactions he did not want the committee to see. The second gap is particularly significant under COSO Principle 9 because it neutralized the audit committee's oversight — the committee's independence is meaningless if the information it receives is curated by the person whose activities it is supposed to oversee. A comprehensive fraud risk assessment under Principle 9 would have identified this concentration of disbursement authority and reporting control in a single individual as a high-risk condition requiring targeted antifraud controls, such as: audit committee review of all CEO-related disbursements, independent preparation of board materials by internal audit rather than management, and a control requiring dual authorization for payments exceeding a threshold regardless of the requestor's title. An exam trap is to equate the presence of antifraud program elements (code, hotline, committee) with an effective fraud risk assessment, when the assessment must specifically evaluate whether those elements can be overridden by the individuals who pose the greatest fraud risk — senior management.",
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
    "QuestionID": "P1-ED-062",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A proposes a code-of-conduct remedy that would be ineffective against the specific override pattern in this scenario. Adding a dollar threshold for audit committee pre-approval to the code of conduct assumes that the CEO would comply with the code — but the scenario demonstrates that Harold directed $1.8 million in personal expenses while ignoring the existing code of conduct, which presumably already prohibits personal use of company funds. A CEO who suppresses information from the audit committee by personally preparing the quarterly review package will not be deterred by additional language in a code of conduct. Furthermore, a dollar threshold would likely be circumvented through the same structuring technique Harold already employed — spreading expenses across five years and multiple categories. A candidate selecting this option may overestimate the preventive power of policy documents in an environment where the most senior individual controls both the transaction initiation and the information flow to governance, and may underestimate the need for structural control design changes rather than incremental policy additions.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C misassigns responsibility and misunderstands the power dynamics of management override. While the CFO and AP manager demonstrated poor ethical judgment in processing personal expenses, their failure is a symptom of the structural override condition, not the root cause. Employees who report to the CEO — particularly in a family-owned company where the founder has operated for 30 years — face genuine career risk when refusing a direct instruction. COSO Principle 9 does not place the primary burden of preventing management override on subordinate employees; it places the burden on the governance structure to design controls that detect or prevent override regardless of employee resistance. The whistleblower hotline is a reporting channel, not a preventive control — it requires an employee to initiate a report, which is precisely what the override environment suppresses. A candidate selecting this option may be applying an individual-accountability framework to what is fundamentally a governance design problem, expecting employees to serve as the primary defense against the most powerful person in the organization.",
    "ExplanationWrongD": "Option D identifies a valid observation — the audit committee should have questioned the CEO's personal preparation of the quarterly review package — but mischaracterizes the root cause. An audit committee that receives a financial review package from the CEO and relies on its completeness without independent verification is exercising insufficient skepticism, which is a symptom of the same override condition: the CEO controls the information flow. However, the audit committee's failure is a consequence of the structural condition described in Option B (the CEO controlled both disbursement initiation and reporting), not an independent defect. Moreover, the committee likely had no reason to suspect that the CEO was personally preparing the package — in many organizations, the CEO signs or presents materials that were compiled by the finance team, and the committee may not have known the CEO was the sole preparer. A candidate selecting this option may be over-attributing responsibility to the oversight body without examining why the oversight body was structurally prevented from receiving complete information.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S60B -- DL-012 clone replacement"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.063 COSO Principle 6 — risk identification external supply chain beyond tier one",
    "MicroTopic": "Supply chain risk identification tier depth",
    "UniqueConceptKey": "E-D063-supply-chain-risk-tier-depth",
    "LOSTag": "P1-E Internal controls",
    "primaryTheory": "E2",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Solstis Photovoltaic, a $1.4 billion solar panel manufacturer headquartered in Phoenix, Arizona, operates two production facilities that consume rare-earth minerals — tellurium, indium, and gallium — in the manufacture of high-efficiency photovoltaic cells. Solstis's risk assessment team, led by VP of Supply Chain Raj Mehta, rated supplier concentration risk as low because the company's three critical mineral suppliers — TerraMin GmbH (Germany), Andes Resources SA (Chile), and Pacific Elements Ltd. (Vietnam) — are based in three different countries on three different continents. The risk assessment was based exclusively on annual financial health reviews of each tier-1 supplier, covering liquidity ratios, debt covenants, and audit opinions. However, the assessment did not trace the supply chain beyond tier-1: TerraMin GmbH sources 85% of its raw tellurium from mines in the Atacama region of South America, and Andes Resources SA sources 90% of its indium from the same Atacama mining district. When the Atacama regional government imposed an export ban on unprocessed rare-earth minerals following a mining safety disaster, both TerraMin and Andes were unable to fulfill their supply contracts simultaneously. Solstis lost $6.8 million in production over seven weeks before securing alternative supply at a 40% price premium. Which evaluation of Solstis's risk identification under COSO Principle 6 is most accurate?",
    "Choices": {
      "A": "Solstis's risk identification was adequate because the company correctly diversified its supplier base across three countries and three continents — the simultaneous failure of two suppliers from a single regional event was a low-probability event that no reasonably diligent risk identification process would have been expected to anticipate.",
      "B": "Solstis's risk identification was incomplete because it failed to assess risk beyond tier-1 suppliers. COSO Principle 6 requires the organization to identify risks to the achievement of its objectives across the entity and to consider the full range of internal and external factors that could affect performance. A risk identification process that stops at tier-1 financial health reviews, without tracing the underlying physical supply chain to shared dependencies, fails to identify concentration risk that is hidden by geographic diversity at the tier-1 level.",
      "C": "Solstis's risk identification process met the COSO standard because financial health reviews of tier-1 suppliers are the recognized industry practice for supply chain risk assessment in the solar manufacturing sector, and COSO does not require organizations to audit their suppliers' suppliers.",
      "D": "The root cause was operational rather than a risk identification failure — Solstis should have maintained larger safety stock inventories of rare-earth minerals to buffer against supply disruptions, which is a supply chain management decision rather than a COSO governance deficiency."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "COSO Principle 6 — within the Risk Assessment component — requires the organization to identify risks that could affect the achievement of objectives and to analyze risks as a basis for determining how they should be managed. The principle explicitly states that risk identification must consider both internal and external factors and must be comprehensive — capturing risks at the entity, division, operating unit, and functional levels. Solstis's risk identification process is deficient in two critical respects. First, it assessed only tier-1 supplier financial health, treating each supplier as an independent risk source. However, supply chain risk is not additive — it is networked: two supposedly independent tier-1 suppliers can share a common dependency at tier-2 or tier-3, creating hidden concentration risk. By analyzing only the corporate headquarters location of each tier-1 supplier (Germany, Chile, Vietnam), Solstis's assessment created the illusion of geographic diversification while the underlying physical supply chain was concentrated in a single mining region — the Atacama. This is the supply chain equivalent of diversifying a portfolio by buying three stocks that all depend on the same underlying commodity. Second, the assessment's risk categories were too narrow: financial health (liquidity, debt, audit opinions) captures only counterparty credit risk, omitting geopolitical risk, regulatory risk, natural-resource concentration risk, and logistics disruption risk — all of which are standard supply chain risk categories that COSO Principle 6 expects a reasonably thorough risk identification process to consider. The $6.8 million production loss was not a black-swan event but the predictable consequence of a risk identification process that confused corporate geographic diversity with physical supply chain diversity. An exam trap is to evaluate risk identification by counting activities (three supplier reviews performed) rather than evaluating whether the activities actually achieved their objective (identifying the true concentration risk).",
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
    "QuestionID": "P1-ED-063",
    "question_state": "Certified",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly dismisses a foreseeable supply chain risk as a low-probability event. The simultaneous failure of two suppliers from a single regional event is not low-probability when those two suppliers depend on the same underlying resource — it is a correlated risk. The entire purpose of supply chain risk identification is to detect hidden correlations that make apparent diversification illusory. Solstis's assessment was designed in a way that was systematically incapable of detecting the concentration risk: by categorizing suppliers by corporate headquarters location rather than by the physical source of their raw materials, the assessment actively masked the shared dependency. COSO Principle 6 does not require organizations to predict specific events (a mining safety disaster in the Atacama) but does require them to identify risk categories that could affect objectives. Concentration of critical mineral supply in a single mining region is a risk category that should have been identified regardless of the specific triggering event.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C incorrectly appeals to industry practice as a defense against incomplete risk identification. COSO Principle 6 requires a comprehensive assessment of risks to the achievement of objectives — industry practice may inform the standard of care but does not define it. If industry practice (tier-1 financial reviews only) systematically fails to detect a material risk category (sub-tier geographic concentration), then industry practice is insufficient, not vindicated. Furthermore, the scenario demonstrates that the practice was incomplete: two suppliers failed simultaneously from the same cause, yet the risk assessment rated concentration risk as low. An assessment that produces a low risk rating for a condition that caused a $6.8 million loss is definitionally deficient. A candidate selecting this option may be applying a compliance-based risk mindset, where adherence to common practice substitutes for evaluation of whether the practice actually achieves the risk identification objective.",
    "ExplanationWrongD": "Option D attempts to reframe a risk identification failure as an inventory management issue. Safety stock is a risk response (mitigation) — it is one of several possible responses to an identified supply disruption risk. But risk response can only be selected after risk identification: Solstis could not decide how much safety stock to hold for rare-earth mineral disruptions if it never identified that its minerals were concentrated in a single geographic region. The risk identification failure (not knowing the true concentration risk) preceded and caused the absence of an appropriate risk response. Under COSO, risk identification, risk assessment, and risk response are sequential — an organization cannot design appropriate responses to risks it has not identified. A candidate selecting this option may be skipping ahead to the solution without recognizing that the prerequisite step (risk identification) was never properly performed.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S60B -- DL-012 clone replacement"
  }
];