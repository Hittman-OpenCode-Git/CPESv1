# Pack A Section E — Six-Dimension Verification (P1-E-076 through P1-E-084)

**Date:** 2026-07-22
**Scope:** READ/VERIFY ONLY — no writes, no certification decisions
**Items:** 9 newly authored Section E items in `pack_a_corrected.js`
**Status:** All items at `question_state: "Unprocessed"` — not certified

---

## DL-008 — ExplanationWrong[CorrectChoice] Re-Check (Stop Condition)

Each item's `CorrectChoice` letter mapped to its `ExplanationWrong{X}` slot value in the source file:

| QID | Correct | Slot | Value (line) | Result |
|-----|---------|------|-------------|--------|
| P1-E-076 | B | ExplanationWrongB | `""` (21613) | **PASS** |
| P1-E-077 | B | ExplanationWrongB | `""` (21665) | **PASS** |
| P1-E-078 | B | ExplanationWrongB | `""` (21717) | **PASS** |
| P1-E-079 | C | ExplanationWrongC | `""` (21770) | **PASS** |
| P1-E-080 | C | ExplanationWrongC | `""` (21822) | **PASS** |
| P1-E-081 | B | ExplanationWrongB | `""` (21873) | **PASS** |
| P1-E-082 | B | ExplanationWrongB | `""` (21925) | **PASS** |
| P1-E-083 | B | ExplanationWrongB | `""` (21977) | **PASS** |
| P1-E-084 | B | ExplanationWrongB | `""` (22029) | **PASS** |

**All 9 items: PASS. No DL-008 violation. Stop condition NOT triggered.**

---

## Item 1: P1-E-076 — Control Monitoring / Separate Evaluations

**Topic:** What action is required when a separate evaluation identifies a control deficiency
**COSO Principle:** 17 (deficiency evaluation and communication)
**Difficulty:** Difficult
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
The answer key (B) correctly describes the four-step remediation process under COSO Principle 17: classify severity, communicate to management and board, develop remediation plan with target dates. Independent verification against COSO 2013 confirms Principle 17 requires "timely communication of deficiencies to parties responsible for corrective action, including senior management and the board." The four numbered steps in ExplanationCorrect are accurate and complete.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Internal Control — Integrated Framework (2013), Principle 17
- **Verification:** Principle 17 covers "evaluates and communicates internal control deficiencies." The cited principle number matches the concept tested (deficiency communication/remediation).
- **Cross-references:** ExplanationWrongC correctly references Principle 12 (control activities); ExplanationWrongD correctly references PCAOB/AICPA auditor independence standards. All secondary citations are accurate.
- **No ASC citation present** (correct for Section E — COSO is the primary framework).

### 3. Blueprint Alignment — **PASS (HIGH)**
- LOSTag: "E.1 Governance, risk, and internal controls" — correct for CMA Part 1 Section E
- Tests "monitoring activities" and "deficiency communication" within the COSO Monitoring component
- No Part 2 content
- Difficulty: Difficult — appropriate for a multi-step process question requiring judgment about deficiency severity and remediation timing

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Barrett Manufacturing (manufacturing context)
- Stakeholder: Controller asks audit director (realistic chain of communication)
- Business trigger: External auditors arriving next month creates time pressure
- Realistic scenario: Cycle count variances going uninvestigated is a genuine monitoring failure
- Dollar figure ($5,000 threshold) is commercially reasonable for inventory variance investigation

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** "Document and re-test in 18 months" — tests document-vs-resolve confusion. Specific misconception: believing documentation alone = remediation.
- **C:** "Raise threshold to $25,000" — tests threshold-masking as pseudo-remediation. Realistic: organizations sometimes adjust thresholds rather than fix the process.
- **D:** "Replace manager and outsource to auditor" — tests personnel action as substitute for process fix + misunderstands auditor independence. Two misconceptions layered.
- All three are choice-specific, non-boilerplate, and map to distinct cognitive errors.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: mini-lesson format (concept → process → scenario analysis → business interpretation → exam trap). 1,100+ chars.
- ExplanationWrongA/C/D: each addresses the specific error in that choice, explains the misconception, and contrasts with the correct approach.
- No "represents a plausible misconception" template.
- No uncertain language.

**Overall: PASS**

---

## Item 2: P1-E-077 — IT General Controls — Access

**Topic:** COSO Principle most at risk when access is not deprovisioned after role change
**COSO Principle:** 11 (general controls over technology)
**Difficulty:** Moderate
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B (Principle 11) correctly identifies that access rights alignment to user roles falls under IT general controls. Principle 11 covers logical access, segregation of duties within IT, and periodic access reviews. Independent verification confirms Principle 11 is the correct principle for role-based access management.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 11 — verified. This principle encompasses "general control activities over technology" including "access rights aligned to user roles."
- **Secondary citations:** ExplanationWrongA references Principle 10 (broader control activities) — distinction is valid (11 is more specific). ExplanationWrongC references Principle 14 (communication) — correctly distinguished. ExplanationWrongD references Principle 5 (accountability) — correctly identified as a control environment concept rather than a technology control.
- **No ASC citation** — correct.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests IT general controls within the Control Activities component
- LOSTag: E.1 — appropriate
- Moderate difficulty — appropriate for a principle-classification question

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named employee: Morgan (person, not generic "an employee")
- Realistic scenario: AP→Treasury transfer without access revocation happens commonly in organizations
- Annual certification timing (8 months) creates a realistic urgency
- Stakeholder: IT director

### 5. Distractor Quality — **PASS (HIGH)**
- **A (Principle 10):** Tests the misconception that all control activities fall under the broadest principle. Candidate must recognize Principle 11 as the specific ITGC standard.
- **C (Principle 14):** Tests confusion between communication and enforcement. The deficiency is in access control design, not communication about it.
- **D (Principle 5):** Tests the distinction between control environment (accountability) and control activities (ITGC). Both are valid COSO principles, but only P11 is the specific match.
- All four choices are COSO principle numbers — strong distractor design because they all cite valid COSO concepts, requiring the candidate to know which principle covers which domain.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: mini-lesson. Distinguishes monitoring activity (Principle 16) from the deficient control design (Principle 11) — critical exam trap.
- All ExplanationWrong* are choice-specific and explain why the wrong principle doesn't match.

**Overall: PASS**

---

## Item 3: P1-E-078 — Inherent Risk vs. Control Risk

**Topic:** Distinguishing inherent risk from control risk
**COSO Principle:** 7 (risk identification and analysis)
**Difficulty:** Difficult
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B provides the correct definitions: inherent risk = exposure before controls; control risk = risk controls fail. Independent verification against COSO Principle 7 and the audit risk model confirms these definitions are accurate. The distinction between residual risk (risk remaining after controls) and inherent risk (risk before controls) is correctly maintained.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 7 — requires "identification and analysis of risks." Verified: risk analysis inherently requires distinguishing risk types.
- **No ASC citation** — correct.
- **Detection risk reference** in ExplanationWrongC: correctly identified as an external auditor concept (not management's concern). This is an accurate distinction.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests risk assessment component of COSO
- LOSTag: E.1 — appropriate
- Difficult — appropriate. Inherent/control risk distinction is a conceptual topic that candidates frequently confuse, and the question requires analyzing a complex scenario rather than recalling definitions.

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Pendleton Bank
- Realistic scale: 400,000 wires/month is commercially reasonable for a bank
- Named controls: dual authorization ($250K threshold), daily reconciliation, call-back verification — all genuine wire fraud controls
- Stakeholder: Internal audit director explaining to audit committee
- The residual-risk-above-appetite framing mirrors actual risk committee discussions

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** Reverses inherent/residual risk. "Both remain high because volumes keep increasing" — this is a realistic candidate error (treating trend commentary as definition).
- **C:** Conflates inherent=control risk + introduces auditor-only detection risk. Tests the common error of mixing audit risk model concepts.
- **D:** Reverses definitions AND dismisses the distinction. Tests the "if controls work, why distinguish?" fallacy.
- All four test different layers of the same core misconception (reversing or conflating risk types).

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: 1,300+ chars. Full concept → scenario → definitions → residual risk analysis → business interpretation (bank can't eliminate inherent risk → risk transfer/acceptance strategies) → exam trap.
- ExplanationWrongC correctly identifies detection risk as an external auditor concept — important pedagogical distinction for CMA candidates.

**Overall: PASS**

---

## Item 4: P1-E-079 — COSO Monitoring Activities (Ongoing vs. Separate)

**Topic:** Distinguishing ongoing monitoring from separate evaluations
**COSO Principle:** 16 (monitoring activities)
**Difficulty:** Moderate
**Correct:** C

### 1. Technical Correctness — **PASS (HIGH)**
Answer C correctly identifies that: (a) the nightly automated report is ongoing monitoring, (b) the gap is a failure in the ongoing monitoring design (not updating flagging logic for new accounts), and (c) the separate evaluation caught the gap, which is its proper backstop role. COSO Principle 16 explicitly recognizes both ongoing and separate evaluations, and the explanation correctly characterizes the relationship: ongoing monitoring is primary; separate evaluations are a backstop.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 16 — verified. Principle 16 covers "ongoing and/or separate evaluations."
- **No ASC citation** — correct.
- **No false claim** about what Principle 16 requires — accurately described.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests monitoring component of COSO — specifically the distinction between two types of monitoring
- LOSTag: E.1 — appropriate
- Moderate difficulty — appropriate for a classification/distinction question

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: NovaCare Health System (healthcare context)
- Realistic ERP feature: automated journal entry flagging for off-hours/reversal patterns
- Realistic gap: chart of accounts not updated in monitoring logic
- Stakeholder: Controller asking CAE (Chief Audit Executive) — correct reporting line
- Two-year audit cycle is realistic for internal audit planning

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** "Monitoring only applies to financial reporting" — tests overly narrow scope of COSO. Operations and compliance objectives are also in scope.
- **B:** "Only separate evaluations detect design flaws" — tests over-reliance on internal audit. Candidate must understand ongoing monitoring can also detect control design issues.
- **D:** "Both are redundant" — tests conflating ongoing vs. separate as interchangeable. They are complementary.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect clearly distinguishes ongoing (continuous, embedded, real-time) from separate (periodic, independent, scoped).
- Exam trap: "candidates sometimes equate monitoring exclusively with internal audit" — correct pedagogical note.

**Overall: PASS**

---

## Item 5: P1-E-080 — Segregation of Duties — Cash Custody and Recording

**Topic:** Which COSO principle prevents concentration of incompatible cash-handling duties
**COSO Principle:** 10 (control activities — segregation of duties)
**Difficulty:** Difficult
**Correct:** C

### 1. Technical Correctness — **PASS (HIGH)**
Answer C (Principle 10) correctly identifies that segregation of incompatible duties is a control activity under Principle 10. The four-functions framework (authorization, custody, recordkeeping, reconciliation) is the standard COSO segregation model. The scenario correctly identifies that the employee performs all three: custody (opens mail), recordkeeping (posts payments), and reconciliation (bank rec).

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 10 — verified. Covers "selection and development of control activities" including segregation of duties.
- **Secondary citations:** Principle 12 (control activities policy), Principle 8 (fraud risk assessment), Principle 13 (technology controls) — all correctly cited and distinguished.
- **No ASC citation** — correct.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests control activities component — segregation of duties (core CMA Part 1 concept)
- LOSTag: E.1 — appropriate
- Difficult — appropriate for a scenario requiring identification of the specific control activity principle among four valid but distinct COSO principles

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Crestwood Medical Clinic — realistic name for a healthcare practice
- Volume: 1,200 payments/$340,000 monthly — commercially reasonable
- Auditor finding: missing deposit slips with posted payments — this is actual red-flag language used by auditors
- Named stakeholder: external auditor — correct role for this type of finding

### 5. Distractor Quality — **PASS (HIGH)**
- **A (Principle 12):** Dual authorization — tests confusion between authorization controls and segregation. Common CMA trap: authorization ≠ segregation.
- **B (Principle 8):** Fraud risk assessment — tests the "assess vs. prevent" distinction. Identifies risk but doesn't actively prevent it.
- **D (Principle 13):** Automation as substitute — tests over-reliance on IT. Automation doesn't segregate custody from the process.
- All four choices cite valid COSO principle numbers — candidate must select the correct one.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: comprehensive. Traces the four-function segregation model through the specific scenario facts. Business interpretation: medical/retail cash-heavy environments highlighted as vulnerable.
- Exam trap: "confuse segregation with authorization controls" — correctly identifies the P10/P12 distinction trap.

**Overall: PASS**

---

## Item 6: P1-E-081 — Remediation of Control Deficiency — Prioritization

**Topic:** What factor primarily drives deficiency remediation prioritization
**COSO Principle:** 17 (deficiency evaluation and communication)
**Difficulty:** Moderate
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B (severity and pervasiveness) correctly identifies the risk-based prioritization framework. Independent verification: COSO Principle 17 requires timely communication, and related PCAOB/SOX guidance on deficiency evaluation uses severity, pervasiveness, likelihood, and compensating controls as the prioritization framework. The four-factor framework presented in ExplanationCorrect (severity, pervasiveness, likelihood, compensating controls) is accurate.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 17 — verified. Though P17 focuses on communication, the remediation prioritization framework is the companion PCAOB AS 2201 standard, which is correctly referenced in ExplanationWrongA ("COSO and PCAOB guidance").
- **Cross-reference:** PCAOB guidance correctly cited alongside COSO.
- **No ASC citation** — correct.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests monitoring/deficiency remediation within COSO
- LOSTag: E.1 — appropriate
- Moderate — appropriate for a judgment/prioritization question with multiple competing priorities

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Grandview Enterprises
- Four deficiencies with realistic dollar amounts and descriptions: PO under $2,000 (immaterial), $180 late fees (quantifiable but minor), unreviewed vendor list changes (monitoring gap), segregation failure (critical). All four are commercially realistic.
- Stakeholder: CFO asking controller — correct reporting line
- Limited staff resources — realistic constraint for remediation planning

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** Dollar-impact-only — tests "quantifiable costs bias." Common error: over-weighting visible costs.
- **C:** Chronological/FIFO — tests non-risk-based approach. "First in, first out" is a natural mental model but wrong for risk management.
- **D:** Simplest-first/progress-demonstration — tests political prioritization over risk-based. Realistic management pressure to "show action."

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: structured four-factor framework with specific application to each deficiency in the scenario.
- Exam trap: "default to remediating the largest dollar impact" — correctly identified.

**Overall: PASS**

---

## Item 7: P1-E-082 — IT Change Management — Emergency Bypass

**Topic:** Is an emergency code change that bypasses all change management a control deficiency?
**COSO Principle:** 11 (general controls over technology)
**Difficulty:** Moderate
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B correctly identifies the bypass as a control deficiency. Key concept: emergency changes still need an emergency procedure (authorization, testing, post-implementation review, documentation) — not a complete bypass. Independent verification: COSO Principle 11, COBIT, and ITIL all require emergency change management procedures that preserve the essential elements of control. The answer correctly distinguishes between "emergency procedure" and "complete bypass."

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 11 — verified for IT general controls including change management.
- **Supplementary frameworks:** COBIT and ITIL correctly referenced as IT governance standards.
- **No ASC citation** — correct.
- **Verification of four elements:** Authorization, testing, post-implementation review, and documentation are the standard components of IT change management — accurately listed.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests IT general controls — change management (a sub-component of Principle 11)
- LOSTag: E.1 — appropriate
- Moderate — appropriate for a scenario requiring judgment about whether an incident is a deficiency

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Harbor Analytics
- Realistic scenario: month-end close rounding error preventing trial balance from balancing
- Controller verbal approval over phone — realistic informal emergency authorization
- Six-week gap before audit review — realistic timeline for IT audit cycles
- Outcome bias trap: "change fixed the error, books closed on time" — this is exactly the kind of outcome-swallows-process reasoning that occurs in real organizations

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** "No deficiency — change worked and was authorized" — tests outcome bias. Excellent CMA trap: evaluate design, not outcome.
- **C:** "Management override — report to audit committee" — tests over-escalation. Candidate must distinguish abuse of authority from emergency with inadequate procedure.
- **D:** "Operations issue — deadlines justify suspension" — tests the "business urgency overrides controls" fallacy.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: outcome bias identified as the "exam trap." The four-element emergency procedure framework is clearly laid out.
- ExplanationWrongC: correctly distinguishes genuine emergency from malicious override — important nuance.

**Overall: PASS**

---

## Item 8: P1-E-083 — Vendor Master File Segregation

**Topic:** What segregation of duties failure enabled a fictitious vendor scheme
**COSO Principle:** 10 (control activities — segregation of duties)
**Difficulty:** Easy
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B correctly identifies that combining vendor creation (custody/authorization) with purchase order entry (transaction initiation) is an incompatible duty combination. This is exactly the segregation of duties framework under COSO. The scenario — fictitious vendor with payments processed but no goods received — is a textbook procurement fraud scheme (the "shell vendor" pattern).

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 10 — verified for segregation of duties.
- **Supporting practice references:** W-9/TIN matching, three-way match — all correctly positioned as detective/deterrent controls (not segregation).
- **No ASC citation** — correct.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests control activities — segregation of duties in procurement
- LOSTag: E.1 — appropriate
- Easy — appropriate for a straightforward segregation-incompatible-duties identification question

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: Woodland Supply
- Named fictitious vendor: "W Supply Co." with P.O. box matching relative — realistic fraud detail
- Dollar amount: $7,400 — commercially reasonable for a small procurement fraud
- Stakeholder: Controller discovering the scheme — correct reporting line

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** Receiving department failure — tests understanding that this scheme bypasses physical goods entirely. Candidate must recognize that three-way match is downstream from the fraud point.
- **C:** Tax ID verification — tests substituting a general best practice for the specific segregation failure. Good trap: verification may have value but doesn't address the root cause.
- **D:** Internal audit failure — tests the monitoring-vs-control-activity distinction. Internal audit is monitoring; the deficiency is in control design.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: clearly traces how the three-way match (a detective control) cannot catch this scheme because goods never arrive. Business interpretation notes this is a "well-documented fraud scheme in procurement."
- Exam trap: "focus on the payments already made (the symptom) rather than the control design failure (the root cause)" — correct.

**Overall: PASS**

---

## Item 9: P1-E-084 — Audit Committee Oversight — Independence

**Topic:** Most apparent governance deficiency in a compromised audit committee
**COSO Principle:** 2 (board independence and oversight)
**Difficulty:** Easy
**Correct:** B

### 1. Technical Correctness — **PASS (HIGH)**
Answer B correctly identifies four governance deficiencies: (1) impaired independence (CEO's brother), (2) insufficient financial expertise (1/3 CPA), (3) no executive sessions, (4) failure to act on repeated significant deficiencies. Independent verification: SOX Section 301 explicitly requires audit committee independence; CEO sibling is a disqualifying relationship. COSO Principle 2 requires board independence. All four points are accurate.

### 2. Authority/Reference Integrity — **PASS (HIGH)**
- **Named standard:** COSO Principle 2 — verified. Covers "board demonstrates independence from management."
- **Cross-reference:** SOX Section 301 — verified. Requires all audit committee members to be independent.
- **Stock exchange listing standards** — correctly referenced as requiring at least three members.
- **No ASC citation** — correct.

### 3. Blueprint Alignment — **PASS (HIGH)**
- Tests control environment — governance and board oversight
- LOSTag: E.1 — appropriate
- Easy — appropriate for a straightforward governance-identification question with clear facts

### 4. Difficulty/Exam Realism — **PASS (HIGH)**
- Named company: SignalPoint Technologies
- Specific committee composition: CEO's brother (marketing), retired ops manager, CPA independent director — each role is specific and realistic
- Two years of unremediated significant deficiencies — realistic governance failure pattern
- Executive session detail: "never held an executive session without management present" — realistic for a weak audit committee

### 5. Distractor Quality — **PASS (HIGH)**
- **A:** "Meets too frequently" — tests the reverse: quarterly is the minimum, not excessive. Candidate must know audit committee meeting frequency norms.
- **C:** "Five-member minimum" — tests SOX knowledge. SOX does not prescribe a specific minimum number; listing standards require three, which is met.
- **D:** "CEO attendance is the only issue" — tests oversimplification. Candidate must recognize that multiple governance failures exist beyond the CEO's presence.

### 6. Explanation/Pedagogical Integrity — **PASS (HIGH)**
- ExplanationCorrect: structured around three dimensions of committee effectiveness (composition, process, action) — pedagogical framework that reinforces the concept.
- Exam trap: "focus exclusively on CEO's attendance" — correctly identified as the oversimplification error.

**Overall: PASS**

---

## ALL 9 ITEMS: PASS on all six dimensions.

---

## Stem-Duplication Check (Targeted)

### Pair 1: P17 — P1-E-076 vs. P1-E-081

| Dimension | P1-E-076 | P1-E-081 |
|-----------|----------|----------|
| **Stem structure** | Narrative: internal audit completed evaluation → found deficiency → controller asks audit director what to do | List-based: four deficiencies enumerated → CFO asks controller to prioritize |
| **Sentence count** | 3 sentences | 1 long sentence + 1 question |
| **Opening pattern** | "[Company]'s internal audit team completed a separate evaluation..." | "An external audit of [Company] identified four control deficiencies..." |
| **Scenario type** | Single deficiency discovered through monitoring | Multiple deficiencies requiring prioritization judgment |
| **Stakeholder** | Controller → Audit Director | CFO → Controller |
| **Company** | Barrett Manufacturing | Grandview Enterprises |
| **What's tested** | What TO DO when a deficiency is found | How to PRIORITIZE among multiple deficiencies |
| **Choice structure** | 4 action options (document, classify/remediate, adjust threshold, replace personnel) | 4 prioritization criteria (dollar impact, severity/pervasiveness, chronological, simplest-first) |
| **Correct answer type** | Process action (classify → communicate → remediate) | Decision criterion (severity and pervasiveness) |

**Assessment: NOT template-adjacent.** While both cite Principle 17, the stems have fundamentally different structures (narrative single-deficiency vs. enumerated multi-deficiency), different question types (action vs. prioritization criterion), different choice structures, and different stakeholder pairings. The only shared element is the COSO principle number, which is appropriate since both test different aspects of Principle 17. **PASS — no template adjacency.**

---

### Pair 2: P11 — P1-E-077 vs. P1-E-082

| Dimension | P1-E-077 | P1-E-082 |
|-----------|----------|----------|
| **Stem structure** | Short: employee transferred → access not revoked → IT director notes infrequent reviews → which principle at risk? | Long narrative: developer bypassed change mgmt for emergency fix → controller verbally approved → fix worked → IT audit reviews six weeks later → classify the override |
| **Sentence count** | 3 sentences | 5 sentences |
| **Opening pattern** | "[Name] transferred from [dept] to [dept]..." | "During the month-end close, a senior developer at [Company] deployed a code change directly to the production..." |
| **Scenario type** | Access control failure (role change) | Change management failure (emergency bypass) |
| **Stakeholder** | IT director (mentioned) | Controller (verbally approved), IT audit manager (reviewer) |
| **Company** | (Morgan — individual, no company named) | Harbor Analytics |
| **What's tested** | Which COSO PRINCIPLE NUMBER is most at risk | Whether the incident IS a control deficiency (classification judgment) |
| **Choice structure** | 4 COSO principle numbers | 4 deficiency classification judgments |
| **Correct answer type** | Principle identification | Deficiency assessment |

**Assessment: NOT template-adjacent.** The two items under P11 test completely different competencies: P1-E-077 tests principle identification (which COSO component governs this?), while P1-E-082 tests deficiency classification (is this a deficiency at all?). Stems have different narrative structures (short employee scenario vs. long incident narrative), different choice types (principle numbers vs. assessment statements), and different cognitive demands. **PASS — no template adjacency.**

---

### Pair 3: P10 — P1-E-080 vs. P1-E-083

| Dimension | P1-E-080 | P1-E-083 |
|-----------|----------|----------|
| **Stem structure** | Detailed: employee does all four cash functions → auditor finds missing deposit slips → which principle prevents this? | Scenario: purchasing clerks control both PO entry and vendor creation → controller discovers fictitious vendor → which segregation failure enabled this? |
| **Sentence count** | 4 sentences | 3 sentences |
| **Opening pattern** | "At [Company], the same staff accountant opens the daily mail..." | "At [Company], the purchasing clerks enter purchase orders..." |
| **Scenario type** | Cash receipts — custody + recording + reconciliation concentration | Vendor master — creation + transaction initiation concentration |
| **Auditor finding** | Missing deposit slips (suggests cash diversion) | Fictitious vendor with relative's P.O. box ($7,400 payments) |
| **Stakeholder** | External auditor (noted the finding) | Controller (discovered the scheme) |
| **Company** | Crestwood Medical Clinic (healthcare) | Woodland Supply (wholesale/supply) |
| **What's tested** | Which COSO PRINCIPLE prevents the combination | Which SEGREGATION FAILURE enabled the scheme |
| **Choice structure** | 4 COSO principle numbers | 4 specific failure reasons (receiving, incompatible duties, tax ID, internal audit) |
| **Correct answer type** | Principle identification (P10) | Failure identification (incompatible PO+vendor duties) |

**Assessment: NOT template-adjacent.** While both test COSO Principle 10 (segregation of duties), they differ on every structural dimension: one asks "which principle" (COCO), the other "which failure" (root cause); one uses principle-number choices, the other uses narrative failure descriptions; one scenario is cash receipts, the other is vendor master; one has auditor findings, the other has controller discovery; companies and industries differ. Both begin "At [Company]," but this is natural English for location-setting — it does not constitute a template. **PASS — no template adjacency.** However, both items use the "At [Company], [role] [does action]..." introductory clause. This is an extremely common case-study convention, not a template artifact. Both would read naturally in any CMA-style exam.

---

## Stem-Duplication Check: VERDICT

**All three principle pairs: PASS. No stop condition triggered.** No pair reads as template-adjacent. All six items use distinct narrative structures, choice types, and cognitive demands appropriate to their individual topics.

---

## Summary

| Dimension | 076 | 077 | 078 | 079 | 080 | 081 | 082 | 083 | 084 |
|-----------|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| 1. Technical correctness | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 2. Authority/reference | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 3. Blueprint alignment | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 4. Difficulty/realism | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 5. Distractor quality | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 6. Explanation/pedagogy | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| DL-008 (ExpWrong[CC]="") | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

**All 9 items: 54/54 dimension checks PASS. Zero failures.**

---

## Findings Summary

No defects found. No COSO principle miscitations. No template-adjacent stem structure. No DL-008 violations. All ExplanationWrong* fields are choice-specific and non-boilerplate. All ExplanationCorrect fields follow the CAQS mini-lesson format with concept identification, solution reasoning, business interpretation, and exam trap.

**Certification recommendation: DEFERRED** — this report presents verification findings only. Certification decisions require user approval per CAQS §1.7.2 and documented distractor tier maps per BUILD_TIME_VERIFICATION_STANDARD.md.
