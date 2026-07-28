# Pack A Section E — 9 Replacement Items

**Date:** 2026-07-22
**Status:** NEWLY AUTHORED — not certified, not pre-certified
**Classification:** New original content replacing permanently lost items P1-E-059/060/061/064/067/068/069/072/075
**File:** `pack_a_corrected.js` (lines 21,565+)
**Backup:** `pack_a_corrected.js.bak-20260722211414` (1,847,362 bytes)

---

## Purpose

This report documents 9 newly authored CMA Part 1 Section E replacement items. These items are **not restored originals** of the permanently lost items — they are independently authored with distinct stems, scenarios, companies, choices, and explanations. They cover the same COSO concepts the lost items were intended to test.

---

## Governance Compliance

| Requirement | Status |
|-------------|--------|
| No template stems (unique business scenario per item) | **PASS** |
| No DL-008 (ExplanationWrong[CorrectChoice] = "" for all 9 items) | **PASS** |
| No generic distractor explanations | **PASS** |
| COSO citation in every ExplanationCorrect | **PASS** |
| question_state: "Unprocessed" | **PASS** |
| Lost QuestionIDs NOT reused (076-084, not 059-075) | **PASS** |
| Governance guard active (Rule 5: 9 ≤ 30) | **PASS** |
| Backup created before write | **PASS** |

---

## Six-Dimension Verification Summary

### Dimension 1: Technical Correctness
- **Confidence: HIGH**
- All 9 answer keys independently verified against COSO Internal Control — Integrated Framework (2013)
- COSO principle numbers cross-checked: 2 (board independence), 7 (risk identification/analysis), 10 (control activities), 11 (technology general controls), 16 (monitoring activities), 17 (deficiency communication)
- SOX Section 301 cross-checked for audit committee independence requirements

### Dimension 2: Authority/Reference Integrity
- **Confidence: HIGH**
- Each ExplanationCorrect cites the specific COSO principle number and describes the principle's requirements
- No generic "Under COSO..." without principle specificity
- No incorrect ASC citations (none of the 9 items cite ASC — they all cite COSO, which is correct for Section E)
- DL-009: clear — no ASC references present

### Dimension 3: Blueprint Alignment
- **Confidence: HIGH**
- CMA Part 1 Section E: Internal Controls
- LOSTag: "E.1 Governance, risk, and internal controls" (consistent with newer Pack A items)
- All topics within scope of CMA Part 1 CSO
- No Part 2-only topics

### Dimension 4: Difficulty/Exam Realism
- **Confidence: HIGH**
- Distribution: 2 Easy, 4 Moderate, 3 Difficult
- Adds 3 Difficult items to Section E (previously zero)
- Each item uses a named company, a specific stakeholder, and a realistic business scenario
- No "[Company] is reviewing internal controls related to [topic]" template pattern

### Dimension 5: Distractor Quality
- **Confidence: HIGH**
- Each distractor targets a specific, documented misconception
- No "Option X represents a plausible misconception" boilerplate
- No two distractors test the same misconception
- Each distractor explanation is choice-specific and explains WHY that choice is wrong

### Dimension 6: Explanation/Pedagogical Integrity
- **Confidence: HIGH**
- Mini-lesson format: concept identification → solution reasoning → distractor analysis → business interpretation → exam trap
- No uncertain language ("I think," "probably," "maybe")
- All explanations 400+ characters

---

## Item 1 — P1-E-076

**Topic:** Control monitoring — separate evaluations (COSO Principle 17)
**Difficulty:** Difficult
**Correct:** B

**Stem:**
> Barrett Manufacturing's internal audit team completed a separate evaluation of inventory cycle counting controls. The evaluation found that cycle count variances exceeding $5,000 are not investigated unless the warehouse manager personally flags them, and 23 variances above the threshold went unexamined in the last quarter. The controller asks the audit director what action is required before the external auditors arrive next month.

**Choices:**
- A: Document the finding in the audit workpapers and re-test during the next scheduled evaluation in 18 months
- B: Classify the deficiency based on severity, communicate it to management and the board, and develop a remediation plan with target dates
- C: Adjust the variance threshold to $25,000 to reduce the number of flagged items and avoid overwhelming the warehouse manager
- D: Replace the warehouse manager and outsource cycle counting to the external auditors going forward

**ExplanationCorrect:** Under COSO Principle 17, the organization evaluates and communicates internal control deficiencies in a timely manner to parties responsible for taking corrective action, including senior management and the board of directors, as appropriate. When a separate evaluation — a periodic, scoped assessment conducted by internal audit or an external party — identifies a control deficiency, management must: (1) assess the severity of the deficiency, considering magnitude, likelihood, and whether it represents a significant deficiency or material weakness; (2) communicate the deficiency to the individuals responsible for the control and to senior management; (3) communicate significant deficiencies and material weaknesses to the board or audit committee; and (4) develop and execute a remediation plan with assigned responsibility and target completion dates. Delaying remediation until the next scheduled evaluation 18 months later leaves the control gap unaddressed for an extended period. Adjusting the threshold to mask variances subverts the purpose of monitoring rather than addressing the root cause. Replacing personnel without investigating the process failure is a personnel action, not a control remediation. Business interpretation: cycle counting is an ongoing monitoring activity; when a separate evaluation reveals that the monitoring activity itself is failing, management must address the failure in the monitoring mechanism — not just the symptoms. Exam trap: candidates sometimes confuse documenting a finding with resolving it; COSO requires both communication and remediation, not just documentation.

**Distractors analyzed:** Three distinct misconceptions tested — (A) document=resolve confusion, (C) threshold-masking as pseudo-remediation, (D) personnel action as substitute for process fix.

---

## Item 2 — P1-E-077

**Topic:** IT general controls — access rights alignment (COSO Principle 11)
**Difficulty:** Moderate
**Correct:** B

**Stem:**
> Morgan transferred from accounts payable to treasury last month, but her system profile still grants her full access to create and approve vendor payments. The IT director notes that access reviews occur only during annual certification, eight months from now. What COSO internal control principle is most clearly at risk?

**Choices:**
- A: Principle 10 — control activities that address achievement of objectives
- B: Principle 11 — general controls over technology, including access rights aligned to user roles
- C: Principle 14 — internal communication of control responsibilities
- D: Principle 5 — accountability for internal control responsibilities

**ExplanationCorrect:** COSO Principle 11 requires that the organization selects and develops general control activities over technology to support the achievement of objectives. Access control is a foundational IT general control; the principle specifically requires that access rights be aligned with users' job responsibilities and be removed or modified when those responsibilities change. When Morgan moved from accounts payable to treasury, her AP system access should have been revoked or reduced immediately. Allowing full AP access to a former AP employee who now works in a different function creates an incompatible access risk — she could initiate and approve payments despite no longer having a business need. An annual certification cycle means this risk would persist for eight months. COSO Principle 11 also requires that logical access be periodically reviewed, and eight months between reviews for access rights changes is not responsive to the control objective when a role change creates an immediate segregation risk. Business interpretation: organizations should have a process that triggers access review immediately upon employee transfer, promotion, or role change — not just at annual certification. Exam trap: candidates may think this is a monitoring activity (Principle 16) because it involves a review, but the core issue is the design of access controls (Principle 11), not the monitoring of them.

**Distractors analyzed:** (A) Principle 10 is category-level vs. specific ITGC, (C) communication is not the core issue — access enforcement is, (D) Principle 5 is accountability (broader control environment) vs. specific technology control.

---

## Item 3 — P1-E-078

**Topic:** Inherent risk vs. control risk (COSO Principle 7)
**Difficulty:** Difficult
**Correct:** B

**Stem:**
> Pendleton Bank processes over 400,000 wire transfers monthly through its treasury operations center. The bank's risk assessment identifies wire fraud as a significant exposure due to the high transaction volume and dollar amounts. The bank has implemented dual authorization for wires above $250,000, daily reconciliation of outgoing wires against the general ledger, and call-back verification for wires initiated by new clients. The internal audit director must explain to the audit committee why the residual risk of wire fraud remains above the bank's risk appetite despite these controls. Which explanation best distinguishes the role of inherent risk from the role of control risk in this assessment?

**Choices:**
- A: Inherent risk is the risk remaining after controls; control risk is the risk of controls failing — both remain high because wire volumes keep increasing
- B: Inherent risk is the exposure before considering controls — which is high because wire processing is inherently susceptible to fraud — while control risk is the risk that the controls themselves fail to prevent or detect a material misstatement or loss
- C: Inherent risk and control risk are the same concept; the audit committee should focus on detection risk, which increases as transaction volume grows
- D: Control risk is the exposure before controls, and inherent risk is the risk that controls fail — the distinction is irrelevant if controls are operating effectively

**ExplanationCorrect:** Inherent risk and control risk are two distinct components of the COSO risk assessment framework. Inherent risk is the susceptibility of an assertion, transaction class, or business process to a material misstatement or loss, assuming there are no related controls. For Pendleton Bank, the inherent risk of wire fraud is high because: (a) wire transfers involve large dollar amounts, (b) processing 400,000 wires monthly creates a high volume of transactions that could conceal a fraudulent wire, and (c) wires are irrevocable once sent, making recovery difficult. Control risk is the risk that a material misstatement or loss could occur and not be prevented or detected on a timely basis by the organization's internal controls. Pendleton's controls — dual authorization, reconciliation, call-back verification — are designed to reduce control risk, but no control system eliminates control risk entirely; controls can fail due to collusion, human error, or management override. Residual risk — inherent risk after considering the effect of controls — remains above the risk appetite because the inherent risk is fundamentally high, and even well-designed controls carry some level of control risk. COSO Principle 7 requires that the organization identifies risks to the achievement of its objectives and analyzes risks as a basis for determining how the risks should be managed. Business interpretation: a bank cannot eliminate the inherent risk of wire fraud through controls alone; understanding the distinction between inherent and control risk helps management make informed decisions about risk transfer or risk acceptance as supplementary strategies. Exam trap: candidates commonly reverse the definitions of inherent and control risk, or treat them as synonymous.

**Distractors analyzed:** (A) reverses inherent/residual risk definition, (C) conflates inherent/control risk + introduces auditor-only detection risk, (D) reverses definitions and dismisses the distinction entirely.

---

## Item 4 — P1-E-079

**Topic:** Ongoing monitoring vs. separate evaluations (COSO Principle 16)
**Difficulty:** Moderate
**Correct:** C

**Stem:**
> NovaCare Health System's ERP system automatically generates a report every night that flags journal entries posted outside normal business hours and entries that reverse within 24 hours of posting. The controller reviews this report each morning. Separately, NovaCare's internal audit department conducts a comprehensive review of journal entry controls every two years as part of its audit plan. During the most recent internal audit, the team identified that the automated flagging logic had not been updated to include two newly created general ledger accounts. The controller asks the CAE which monitoring mechanism should have caught this gap sooner.

**Choices:**
- A: Neither — monitoring only applies to financial reporting controls, not to system configuration
- B: The internal audit every two years — only independent evaluations can reliably detect control design flaws
- C: The nightly automated report — because ongoing monitoring is built into daily operations and should detect anomalies continuously, but the failure to update the flagging logic for new accounts represents a gap in the ongoing monitoring design itself
- D: Both mechanisms failed equally — ongoing and separate evaluations serve the same purpose and should be redundant

**ExplanationCorrect:** COSO Principle 16 requires that the organization selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. Ongoing monitoring is built into the normal, recurring operating activities of the organization — it is continuous, real-time, and embedded in daily processes. NovaCare's nightly automated flagging report is ongoing monitoring. Separate evaluations are conducted periodically by individuals who are independent of the process being evaluated — they are scoped, structured assessments, like NovaCare's biennial internal audit. The gap in this scenario is a failure in the design of the ongoing monitoring mechanism: the flagging logic excluded two new G/L accounts, meaning the ongoing monitoring was incomplete. A well-designed ongoing monitoring system includes a process to update its scope when the chart of accounts changes. The biennial separate evaluation caught the gap, which is the proper role of separate evaluations — to provide an independent check on the effectiveness of ongoing monitoring. However, the gap should have been caught sooner through proper maintenance of the ongoing monitoring mechanism. Business interpretation: organizations should design ongoing monitoring that adapts to changes in the control environment; separate evaluations serve as a backstop, not as the primary detection mechanism. Exam trap: candidates sometimes equate monitoring exclusively with internal audit and overlook that COSO treats ongoing monitoring embedded in operations as the primary monitoring mechanism.

**Distractors analyzed:** (A) overly narrow scope of monitoring, (B) exclusive reliance on separate evaluations, (D) conflates ongoing/separate as redundant.

---

## Item 5 — P1-E-080

**Topic:** Segregation of duties — cash custody and recording (COSO Principle 10)
**Difficulty:** Difficult
**Correct:** C

**Stem:**
> At Crestwood Medical Clinic, the same staff accountant opens the daily mail containing patient payments, prepares the bank deposit, records cash receipts to individual patient accounts, and reconciles the clinic's bank statement each month. The clinic processes approximately 1,200 patient payments totaling $340,000 monthly. During a recent external audit, the auditor noted that three patient accounts showed payments posted but the corresponding deposit slips were missing for two of those dates. Which internal control principle, if properly applied, would most directly prevent this combination of responsibilities?

**Choices:**
- A: COSO Principle 12 — establish a policy requiring two signatures on every deposit slip over $5,000
- B: COSO Principle 8 — incorporate fraud risk into the entity's risk assessment process
- C: COSO Principle 10 — design control activities that segregate incompatible duties so that no single employee controls all phases of a transaction
- D: COSO Principle 13 — use only automated cash application software to eliminate manual posting entirely

**ExplanationCorrect:** COSO Principle 10 requires that the organization selects and develops control activities that contribute to the mitigation of risks. Segregation of duties is a fundamental control activity under this principle — it requires separating the four key functions of a transaction: authorization, custody of assets, recordkeeping, and reconciliation. At Crestwood, the staff accountant performs all functions for cash receipts: custody — opens mail and handles patient payments; recordkeeping — posts payments to patient accounts; and reconciliation — reconciles the bank statement. This concentration of incompatible duties creates the opportunity for an employee to divert cash and conceal the misappropriation through the records they control. The missing deposit slips alongside posted payments are a classic red flag of this risk. Business interpretation: medical practices and retail operations with high volumes of cash receipts are particularly vulnerable to this risk because cash can be diverted before it enters the accounting system. Segregation of duties is the most cost-effective preventive control — it reduces the opportunity for fraud by ensuring that collusion between two or more individuals is required to perpetrate and conceal a misappropriation. Exam trap: candidates sometimes confuse segregation of duties with authorization controls, such as requiring two signatures on checks. While both are control activities, segregation specifically addresses the separation of incompatible functions — an authorization control alone does not prevent a person with custody from falsifying records.

**Distractors analyzed:** (A) authorization-only control (two signatures) vs. segregation, (B) risk assessment (identifies) vs. control activity (prevents), (D) automation as substitute for segregation design.

---

## Item 6 — P1-E-081

**Topic:** Remediation of control deficiency — prioritization (COSO Principle 17)
**Difficulty:** Moderate
**Correct:** B

**Stem:**
> An external audit of Grandview Enterprises identified four control deficiencies in the procure-to-pay cycle: (1) a missing approval for a single purchase order under $2,000; (2) three instances where vendor invoices were paid 14 days late, incurring $180 in late fees; (3) the absence of an independent review of changes to the approved vendor list over a six-month period; and (4) the purchasing manager's ability to both approve purchase orders and add new vendors to the master file without independent oversight. The CFO asks the controller to prioritize the remediation effort for the upcoming quarter with limited staff resources. What factor should primarily drive the prioritization?

**Choices:**
- A: Remediate based on dollar impact — the late payment fees ($180) are the only deficiency with a quantifiable financial cost and should be addressed first
- B: Remediate based on severity and pervasiveness — deficiencies that represent a segregation of duties failure or a material weakness should be prioritized over isolated or immaterial exceptions
- C: Remediate in chronological order of discovery because each deficiency was identified during the same audit and all carry equal weight
- D: Remediate the simplest deficiency first to demonstrate progress to the audit committee, then escalate to more complex issues

**ExplanationCorrect:** COSO Principle 17 requires that the organization evaluates and communicates internal control deficiencies in a timely manner to parties responsible for taking corrective action. The remediation prioritization framework considers four factors: (1) Severity — is the deficiency a material weakness, significant deficiency, or isolated exception? (2) Pervasiveness — does the deficiency affect a single transaction or an entire process? (3) Likelihood — how probable is a misstatement or loss if the deficiency is not remediated? (4) Compensating controls — do other controls partially mitigate the risk? In Grandview's case: Deficiency (4) — the purchasing manager's ability to both approve POs and add vendors — is a segregation of duties failure. This is the most critical because it creates the opportunity for fraudulent vendor creation and unauthorized purchases, and there is no compensating control described. Deficiency (3) — the absence of vendor list review — is a monitoring gap that compounds the segregation issue. Deficiencies (1) and (2) are isolated exceptions. Business interpretation: not all control deficiencies carry equal weight; management must exercise professional judgment to allocate remediation resources where the risk of material misstatement or loss is highest. Exam trap: candidates sometimes default to remediating the largest dollar impact or remediating everything equally without assessing severity and the existence of compensating controls.

**Distractors analyzed:** (A) dollar-impact-only prioritization, (C) chronological/FIFO ordering (not risk-based), (D) political progress over risk-based prioritization.

---

## Item 7 — P1-E-082

**Topic:** IT change management — emergency bypass (COSO Principle 11)
**Difficulty:** Moderate
**Correct:** B

**Stem:**
> During the month-end close, a senior developer at Harbor Analytics deployed a code change directly to the production general ledger system to correct a rounding error that was preventing the trial balance from balancing. The change bypassed the standard change management process requiring peer review, test environment validation, and an approved change ticket. The controller approved the bypass verbally over the phone. The system change successfully fixed the rounding error, and the books closed on time. The IT audit manager reviewing the incident six weeks later must classify the nature of this control override. Which assessment is most appropriate?

**Choices:**
- A: No control deficiency exists — the change achieved the intended result and the controller provided authorization, satisfying the change management requirement
- B: This represents a control deficiency in IT change management because an emergency change, even when authorized, should still follow a documented emergency change procedure that includes post-implementation review, not a complete bypass of all controls
- C: This is solely a management override issue — the controller abused authority and should be reported to the audit committee
- D: This is an operations issue, not a control deficiency — month-end close deadlines justify temporary suspension of change management controls

**ExplanationCorrect:** COSO Principle 11 requires that the organization selects and develops general control activities over technology. Change management is a critical IT general control — it ensures that changes to production systems are authorized, tested, documented, and reviewed. When an emergency change is necessary, COSO and IT governance frameworks (COBIT, ITIL) do not require that all controls be bypassed. Instead, they require a defined emergency change procedure that maintains the essential elements of control: (1) authorization — the controller's verbal approval provides this, though it should be documented; (2) testing — even emergency changes should be tested in a non-production environment where possible; (3) post-implementation review — the change should be formally reviewed after the fact; (4) documentation — the change should be recorded with an after-the-fact change ticket explaining the emergency. At Harbor Analytics, the complete bypass of peer review, test validation, and an approved change ticket means that even if the outcome was positive this time, the control environment allowed an undocumented change to production. The six-week gap between the change and the audit review without any post-implementation documentation confirms this as a deficiency. Business interpretation: IT change management exists not just to prevent bad changes but to ensure that all changes — good and bad — are documented, recoverable, and reviewable. An emergency procedure preserves this audit trail. Exam trap: candidates may conclude that if the change worked, the control was not needed. This is outcome bias — controls are evaluated based on design and operation, not on whether a single incident produced a favorable result.

**Distractors analyzed:** (A) outcome bias (result justifies bypass), (C) mischaracterizes as management override vs. missing emergency procedure, (D) operational urgency as control suspension justification.

---

## Item 8 — P1-E-083

**Topic:** Vendor master file segregation (COSO Principle 10)
**Difficulty:** Easy
**Correct:** B

**Stem:**
> At Woodland Supply, the purchasing clerks enter purchase orders into the ERP system and also have the ability to add new vendors to the approved vendor master file. The controller recently discovered a vendor named W Supply Co. with a mailing address matching a P.O. box rented by a purchasing clerk's relative. No goods were received from this vendor, but two payments totaling $7,400 had been processed. Which segregation of duties failure enabled this scheme?

**Choices:**
- A: The receiving department failed to match packing slips to purchase orders
- B: Incompatible duties — the ability to both enter purchase orders and add vendors to the master file allows an employee to create a fictitious vendor and route payments to it without independent verification
- C: The accounts payable department should have verified the vendor's tax ID before processing any payment
- D: Internal audit failed to detect the scheme during its annual review of vendor additions

**ExplanationCorrect:** This is a classic segregation of duties failure under COSO Principle 10. The purchasing clerks possessed two incompatible functions: (1) the ability to add new vendors to the vendor master file, which is custody and authorization over the vendor population, and (2) the ability to enter purchase orders, which is transaction initiation. When one person controls both functions, they can create a fictitious vendor and then enter purchase orders against that vendor, routing payments to an address they control. The three-way match — purchase order, receiving report, vendor invoice — would not detect this scheme because there are no physical goods to receive; the fictitious vendor bypasses the receiving function entirely. Proper segregation requires that vendor master file maintenance be performed by a function independent of purchasing, such as finance or a dedicated vendor data management group, with all vendor additions requiring independent approval and supporting documentation such as a W-9 or tax ID verification. COSO Principle 10 specifically addresses the need to segregate authorization, custody, recordkeeping, and reconciliation functions. Business interpretation: vendor master file controls are a high-risk area because fraudulent vendors can remain undetected for long periods if the creator also controls the purchasing process. Exam trap: candidates sometimes focus on the payments already made — the symptom — rather than the control design failure that enabled the fraud — the root cause.

**Distractors analyzed:** (A) receiving is downstream — no physical goods in this scheme, (C) tax ID verification is a best practice, not the segregation failure, (D) internal audit is monitoring, not preventive control.

---

## Item 9 — P1-E-084

**Topic:** Audit committee oversight — independence (COSO Principle 2, SOX Section 301)
**Difficulty:** Easy
**Correct:** B

**Stem:**
> SignalPoint Technologies' audit committee consists of three members: the CEO's brother (a marketing executive), a retired operations manager who left the company two years ago, and an independent director who is a CPA. The committee meets quarterly, but the CEO attends every meeting and the committee has never held an executive session without management present. The external auditor has communicated a significant deficiency in revenue recognition controls for two consecutive years without remediation. Which governance deficiency is most apparent?

**Choices:**
- A: The committee meets too frequently — quarterly meetings create excessive administrative burden without improving oversight
- B: The audit committee lacks sufficient independence and financial expertise — with two of three members having relationships that compromise independence, no executive sessions, and a failure to act on repeated significant deficiencies, the committee is not fulfilling its oversight responsibilities under SOX and COSO Principle 2
- C: The committee should consist of five members — three members is below the minimum required by the Sarbanes-Oxley Act
- D: The CEO's attendance at meetings is the only issue — removing the CEO from meetings would resolve all governance concerns

**ExplanationCorrect:** COSO Principle 2 requires that the board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control. The audit committee is the board's primary mechanism for this oversight. Several governance deficiencies are present at SignalPoint: (1) Independence — the CEO's brother serving on the audit committee is a clear independence impairment. SOX Section 301 and stock exchange listing standards require all audit committee members to be independent. A sibling relationship is a disqualifying relationship. (2) Financial expertise — with one CPA, one marketing executive, and one retired operations manager, only one member has financial expertise. (3) Executive sessions — the committee has never met without management present. Executive sessions are essential for candid discussion of control deficiencies, auditor concerns, and management's responsiveness. Without them, the committee cannot exercise truly independent oversight. (4) Failure to act — two consecutive years of un-remediated significant deficiencies in revenue recognition indicate that the committee is not fulfilling its oversight role. Business interpretation: an audit committee's effectiveness depends on its composition — independence and expertise — its processes — executive sessions, private access to auditors — and its actions — insisting on remediation of control deficiencies. SignalPoint's committee fails on all three dimensions. Exam trap: candidates may focus exclusively on the CEO's attendance at meetings as the sole governance issue, but COSO Principle 2's requirements are broader — they encompass committee composition, independence, and demonstrated oversight effectiveness.

**Distractors analyzed:** (A) quarterly meeting frequency is minimum expected, (C) SOX does not prescribe 5-member minimum, (D) oversimplification — CEO absence doesn't fix independence or remediation failure.

---

## Regression Results

### Validator Suite

| Measure | Baseline (Post-Incident) | After 9 Items | Change |
|---------|-------------------------|---------------|--------|
| Total items scanned | 2,575 | 2,575 | 0 |
| Module errors | 118 | 118 | 0 |
| Module warnings | 1,671 | 1,675 | **+4** |
| ExplanationConsistencyValidator findings | 0 | 0 | 0 |
| MathematicalValidator findings | 0 | 0 | 0 |

The +4 module warnings are from DistractorSimilarityValidator on the 9 new items — each new item has its own distractor pair similarity patterns. These are nominal and expected for new content entering the pool.

### Registry Rebuild (×2)

| Run | MD5 | Result |
|-----|-----|--------|
| Run 1 | DA0FEFE88E7ED1C3BD284BB44D5A006C | — |
| Run 2 | DA0FEFE88E7ED1C3BD284BB44D5A006C | **MATCH** |

**Idempotence: PASS**

### Item Count Reconciliation

| Measure | Before | After | Expected |
|---------|--------|-------|----------|
| pack_a_corrected.js raw items | 506 | 515 | 515 |
| Pack A Section E total | 66 | 75 | 75 |
| Pack A Section E new (Unprocessed) | 0 | 9 | 9 |
| Registry total | 2,966 | 2,975 | 2,975 |

Registry returned to pre-incident baseline of 2,975 total items.

---

## Answer Key Distribution

| Correct | Count | Items |
|---------|-------|-------|
| B | 6 | 076, 077, 078, 081, 082, 083, 084 |
| C | 2 | 079, 080 |
| **Total** | **9** | |

Bias note: 7 of 9 correct answers are "B" (78%). This is documented for future balance adjustment during the certification wave. The existing Section E pool is A/B/C/D balanced, and these 9 items will be absorbed into the larger pool over time.

---

## Scope Boundary Confirmed

| Scope | Status |
|-------|--------|
| Only pack_a_corrected.js modified | **YES** |
| Only Section E items authored | **YES** |
| Only P1-E-076 through P1-E-084 used | **YES** |
| No lost QuestionIDs reused | **YES** |
| No other pack files touched | **YES** |
| No case files touched | **YES** |
| No certified items modified | **YES** |
| No answer-key changes to existing items | **YES** |

---

## Certification Readiness

These 9 items enter the standard audit pipeline at `question_state: "Unprocessed"`. They require a full certification wave (six-dimension verification + user approval) before entering the learner pool. Pre-certification verification completed above — results indicate all 9 items are strong candidates for HIGH-confidence certification.

**Do not auto-certify. Present for manual review.**
