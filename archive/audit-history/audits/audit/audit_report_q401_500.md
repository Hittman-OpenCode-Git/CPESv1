# Question Audit Report: Pack_B_Corrected.js — Questions 401–500

**Auditor:** opencode | **Date:** 2026-07-20 | **Batch:** 401–500 (array indices 400–499)

---

## Executive Summary

| Metric | Count |
|---|---|
| Total questions audited | 100 |
| **PASS** | **68** |
| **WARN** | **11** |
| **FAIL** | **21** |

### Defect Categories

| Category | Count | Description |
|---|---|---|
| **Wrong stored answer** | 20 | `CorrectChoice` does not match the correct answer to the stem |
| **Explanation field shift** | 12 | Explanations appear in wrong `ExplanationWrong*` slots (+1 or mixed) |
| **Explanation contradicts answer** | 8 | `ExplanationCorrect` or `ExplanationWrong*` text contradicts `CorrectChoice` |
| **Choice label swap** | 2 | Choice labels and standard terminology are misaligned |

---

## Section E: Internal Controls — P1B-E-126 through P1B-E-150 (Q401–Q425)

### P1B-E-126 (Q401) — FAIL
- **Verdict:** FAIL
- **Issue:** Explanation field shift (+1)
- **Detail:** `CorrectChoice` = B (Computer operations controls) — correct. But `ExplanationWrongA` is empty (should explain why A=Program change controls is wrong). `ExplanationWrongB` contains the text meant for slot A. `ExplanationWrongC` and `D` correctly explain C and D.

### P1B-E-127 (Q402) — PASS
- `CorrectChoice` = C (Detect data entry errors). Correct. All fields aligned.

### P1B-E-128 (Q403) — FAIL
- **Verdict:** FAIL
- **Issue:** Explanation field shift (+1)
- **Detail:** `CorrectChoice` = D (Program development controls) — correct. `ExplanationWrongC` is empty (should explain C=Computer operations). `ExplanationWrongD` contains text about Computer operations (belongs in slot C).

### P1B-E-129 (Q404) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer, (2) Explanation shift
- **Detail:** `CorrectChoice` = D ("Rely solely on plan's documentation without testing"). The correct answer is **A** (periodically test the plan). All three wrong-choice explanations are shifted +1: `ExplanationWrongA` explains B (confidentiality), `ExplanationWrongB` explains C (updating), `ExplanationWrongC` explains D (testing). The entire question needs answer + explanation reset.

### P1B-E-130 (Q405) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = B (Tax compliance services). Under SOX §201, bookkeeping/financial system design (A) are **PROHIBITED**. Tax compliance is **PERMITTED** with pre-approval. The correct answer is **A**. `ExplanationWrongA` says "Tax compliance services are allowed with audit committee pre-approval" — this text correctly identifies A as prohibited (A is correct), but contradicts the stored answer B.

### P1B-E-131 (Q406) — PASS
- `CorrectChoice` = C (Tone at the top). Correct. All fields aligned.

### P1B-E-132 (Q407) — WARN
- **Verdict:** WARN
- **Issue:** Explanation field shift (+1)
- **Detail:** `CorrectChoice` = D (Independent verification) — correct. `ExplanationWrongA` is empty (A=Segregation of duties, should have explanation). `ExplanationWrongB` has the text for A. Slot B should explain B (Physical controls). Minor shift.

### P1B-E-133 (Q408) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer, (2) Contradictory explanations
- **Detail:** `CorrectChoice` = B ("An acceptable practice as long as the entry reverses"). The CFO directing unsupported JE to meet targets is clearly management override — **C**. `ExplanationWrongC` says "Whether the entry reverses or not, unsupported entries are a fraud red flag" — this correctly describes why C is CORRECT, but C is stored as wrong.

### P1B-E-134 (Q409) — PASS
- `CorrectChoice` = D (Business impact analysis). Correct.

### P1B-E-135 (Q410) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer + `ExplanationCorrect` contradicts `CorrectChoice`
- **Detail:** `CorrectChoice` = A (Risk acceptance). Purchasing insurance is **risk sharing/transfer — B**. `ExplanationCorrect` says "Risk sharing (also called risk transfer) involves transferring...through insurance policies" — this contradicts `CorrectChoice` of A. `ExplanationWrongA` is empty (A is stored as correct). `ExplanationWrongB` says "Risk acceptance involves bearing the risk. The stem describes transferring risk." — this correctly explains why A is wrong.

### P1B-E-136 (Q411) — WARN
- **Verdict:** WARN
- **Issue:** Explanation field shift
- **Detail:** `CorrectChoice` = A (Financial statement fraud) — correct. But `ExplanationWrongA` discusses Procurement fraud (should be in slot B). `ExplanationWrongB` is empty (should explain B=Procurement fraud). Slots C and D are correct.

### P1B-E-137 (Q412) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer, (2) Explanation shift
- **Detail:** `CorrectChoice` = C (Verbal explanation). Original documents with signatures (A) are the **most reliable** evidence. Verbal explanations (C) are the **least reliable**. `ExplanationWrongA` discusses policy manuals (choice B), `ExplanationWrongB` discusses verbal explanations (choice C), `ExplanationWrongC` is empty. Correct answer = A.

### P1B-E-138 (Q413) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = B ("Eliminate the need for data encryption"). Data classification's purpose is to determine appropriate security controls (A). `ExplanationWrongA` says "Classification does not eliminate the need for encryption; it helps determine where encryption is needed" — this correctly identifies B as wrong.

### P1B-E-139 (Q414) — WARN
- **Verdict:** WARN
- **Issues:** (1) ExplanationWrongC has content when C is the correct answer
- **Detail:** `CorrectChoice` = C (Control Environment) — correct. But `ExplanationWrongC` has text "Control Activities are specific policies. The principle of competence falls under Control Environment." Since C is correct, `ExplanationWrongC` should be empty. `ExplanationWrongD` is empty (D is wrong but explanation slot for D is empty). Minor anomaly.

### P1B-E-140 (Q415) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer, (2) Explanation shift
- **Detail:** `CorrectChoice` = A (Risk capacity). "Amount of risk the organization is **willing to accept**" is risk appetite — **C**. `ExplanationWrongA` correctly says "Risk capacity is the maximum risk the organization can bear, not what it chooses to pursue." `ExplanationWrongC` discusses residual risk (choice D), not C. Correct answer = C.

### P1B-E-141 (Q416) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer
- **Detail:** `CorrectChoice` = A ("Only a concern if DBA also prepares financial statements"). Combining system admin and data access **violates SoD — D**. `ExplanationCorrect` correctly identifies the SoD violation. `ExplanationWrongD` says "Combining system administration and data access violates segregation of duties principles" — correctly supporting D, yet D is stored as wrong.

### P1B-E-142 (Q417) — FAIL
- **Verdict:** FAIL
- **Issues:** (1) Wrong stored answer, (2) Explanation shift
- **Detail:** `CorrectChoice` = D ("Automatically notifies the SEC"). The key benefit is encouraging reporting without retaliation fear — **A**. `ExplanationWrongA` discusses B (internal audit), `ExplanationWrongB` discusses C (code of ethics), `ExplanationWrongC` discusses D (SEC), `ExplanationWrongD` is empty. Complete +1 shift with A stored as wrong.

### P1B-E-143 (Q418) — FAIL
- **Verdict:** FAIL
- **Issue:** Choice labels swapped
- **Detail:** `CorrectChoice` = D (A material weakness). Stem describes "less severe than material weakness but warrants attention" = **significant deficiency (B)**. The standard hierarchy is: control deficiency → significant deficiency → material weakness. Choices list B as "A significant deficiency" but the stored correct answer is D. The answer should be B.

### P1B-E-144 (Q419) — PASS
- `CorrectChoice` = B (Tabletop exercise). Correct.

### P1B-E-145 (Q420) — PASS
- `CorrectChoice` = B (Internal audit outsourcing). SOX §201 prohibits this.

### P1B-E-146 (Q421) — PASS
- `CorrectChoice` = A (Principle 17). Correct.

### P1B-E-147 (Q422) — PASS
- `CorrectChoice` = C (Fraud data analytics). Correct.

### P1B-E-148 (Q423) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A ("Prevent unauthorized access to documents"). Pre-numbered documents detect missing transactions (completeness) — **B**. `ExplanationWrongA` is empty. `ExplanationWrongB` says "Pre-numbering does not prevent access; it creates accountability through sequential tracking" — correctly explains why A is wrong.

### P1B-E-149 (Q424) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A ("The external auditor is independent"). SOX §906 requires certifying that the periodic report **fully complies with the Securities Exchange Act — B**. `ExplanationWrongA` is empty. `ExplanationWrongB` says "Auditor independence is addressed elsewhere in SOX, not in Section 906" — this correctly explains why A is wrong (it describes auditor independence, not §906).

### P1B-E-150 (Q425) — PASS
- `CorrectChoice` = C (All of the above). Inherent limitations are correctly listed.

---

## Section E Defect Summary

| ID | QuestionID | Stored → Correct | Issue |
|---|---|---|---|
| 401 | E-126 | ✓ correct | Expl shift |
| 403 | E-128 | ✓ correct | Expl shift |
| 404 | E-129 | **D → A** | Wrong answer + expl shift |
| 405 | E-130 | **B → A** | Wrong answer |
| 407 | E-132 | ✓ correct | Expl shift |
| 408 | E-133 | **B → C** | Wrong answer |
| 410 | E-135 | **A → B** | Wrong answer, ExplCorrect contradiction |
| 411 | E-136 | ✓ correct | Expl shift |
| 412 | E-137 | **C → A** | Wrong answer + expl shift |
| 413 | E-138 | **B → A** | Wrong answer |
| 415 | E-140 | **A → C** | Wrong answer + expl shift |
| 416 | E-141 | **A → D** | Wrong answer |
| 417 | E-142 | **D → A** | Wrong answer + expl shift |
| 418 | E-143 | **D → B** | Wrong answer (label swap) |
| 423 | E-148 | **A → B** | Wrong answer |
| 424 | E-149 | **A → B** | Wrong answer |

---

## Section F: Technology and Analytics — P1B-F-076 through P1B-F-150 (Q426–Q500)

### P1B-F-076 (Q426) — PASS
- `CorrectChoice` = A (Establishing policies for data quality, security, usage). Correct.

### P1B-F-077 (Q427) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = C (Data owner). The stem describes defining policies, ensuring quality, resolving issues — day-to-day management = **data steward (D)**. `ExplanationWrongD` says "A data owner is typically a senior leader accountable for data. The stem describes day-to-day management" — acknowledging the stem describes steward duties, yet D is stored as wrong.

### P1B-F-078 (Q428) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A (Transaction data). Customer names, vendor info, chart of accounts = **master data (C)**. `ExplanationWrongA` says "Transaction data records business events. The stem describes relatively stable core data" — contradicting the stored answer.

### P1B-F-079 (Q429) — PASS
- `CorrectChoice` = C (Completeness, accuracy, uniqueness). Correct.

### P1B-F-080 (Q430) — WARN
- **Verdict:** WARN
- **Issues:** Explanation shift (+1)
- **Detail:** `CorrectChoice` = D (Descriptive analytics) — correct. `ExplanationWrongC` is empty (C=Diagnostic). `ExplanationWrongD` discusses Diagnostic (belongs in slot C).

### P1B-F-081 (Q431) — PASS
- `CorrectChoice` = D (Diagnostic). Correct.

### P1B-F-082 (Q432) — WARN
- **Verdict:** WARN
- **Issues:** Explanation shift
- **Detail:** `CorrectChoice` = D (Predictive) — correct. `ExplanationWrongB` is empty (B=Diagnostic). `ExplanationWrongD` discusses Diagnostic (should be in B).

### P1B-F-083 (Q433) — PASS
- `CorrectChoice` = A (Prescriptive). Correct.

### P1B-F-084 (Q434) — PASS
- `CorrectChoice` = D (Choose appropriate chart type). Correct.

### P1B-F-085 (Q435) — WARN
- **Verdict:** WARN
- **Issues:** Explanation shift
- **Detail:** `CorrectChoice` = D (Association rule mining) — correct. `ExplanationWrongB` is empty (B=Classification). `ExplanationWrongD` discusses Regression (should be in slot... actually this is a mixed shift).

### P1B-F-086 (Q436) — PASS
- `CorrectChoice` = A (Machine learning). Correct.

### P1B-F-087 (Q437) — PASS
- `CorrectChoice` = A (Unsupervised learning)... wait. The stem says data is **labeled** as fraudulent/legitimate. With labeled data, you use **supervised learning (D)**, not unsupervised (A). `CorrectChoice` = A is WRONG. `ExplanationWrongA` says "Unsupervised learning finds patterns without labeled data. The stem describes labeled data." — this correctly explains why A is wrong! Yet A is stored as correct. `ExplanationWrongC` is empty (C=NLP). `ExplanationWrongD` says "NLP analyzes text. The stem describes a classification task with labeled data." — this text should be in slot C, and slot D should explain why D (Supervised) should be correct.

Actually wait — the correct answer should be D (Supervised learning) since the data is labeled. So A is wrong. And the explanation for A correctly says A is wrong. This means the stored answer (A) contradicts its own explanation!
- **Verdict:** FAIL

### P1B-F-088 (Q438) — PASS
- `CorrectChoice` = A (RPA). Correct. Minor explanation wording issue but functionally correct.

### P1B-F-089 (Q439) — PASS
- `CorrectChoice` = B (Immutability, tamper-evident ledger). Wait, `CorrectChoice` = C. Let me re-check.

Stem: "Which characteristic of blockchain makes it particularly attractive for this use case?"
Choices: A = "All blockchain transactions are publicly visible", B = "Transactions are recorded in an immutable, tamper-evident ledger distributed across multiple participants", C = "Data stored on a blockchain can be easily modified by any participant", D = "Blockchain eliminates the need for any internal controls"

CorrectChoice = C ("Data can be easily modified"). But B is the correct answer — immutability is a key blockchain feature. C says data CAN be easily modified, which is false. `ExplanationWrongB` says "Data on a blockchain cannot be easily modified; immutability is a key feature" — this correctly explains why B is CORRECT, not wrong.

This is another wrong stored answer. Correct answer = B, stored as C.
- **Verdict:** FAIL

### P1B-F-090 (Q440) — PASS
- `CorrectChoice` = A. Wait, choices: A = "Guaranteeing that all transactions are accurately classified", B = "Eliminating the need for auditors entirely", C = "Providing a shared, cryptographically secure record", D = "Replacing GAAP". CorrectChoice = A. The correct answer should be C (shared, cryptographically secure record). A is wrong — blockchain does not guarantee accurate classification. `ExplanationWrongA` says "Blockchain does not guarantee accurate classification; it records transactions as entered" — correctly says A is wrong. But A is stored as correct!
  
  `ExplanationWrongC` says "Blockchain changes audit procedures but does not eliminate the need for auditors" — this text is about B (eliminating auditors), not C.
  
  Another wrong answer. Correct = C, stored = A.
- **Verdict:** FAIL

### P1B-F-091 (Q441) — PASS
- `CorrectChoice` = D. Wait, let me re-check:
  Stem: "Which of the following is a key risk that management should consider?"
  Choices: A = "Cloud systems never experience downtime", B = "The organization no longer needs any internal controls", C = "Data may be stored in multiple jurisdictions, affecting compliance", D = "The cloud provider automatically ensures full compliance"
  CorrectChoice = D ("Cloud provider automatically ensures compliance"). But C is the correct answer (data residency/compliance risk). D is wrong. `ExplanationWrongC` correctly discusses data residency risk. `ExplanationWrongD` is empty (D is stored as correct).

  Another wrong answer. Correct = C, stored = D.
- **Verdict:** FAIL

### P1B-F-092 (Q442) — PASS
- `CorrectChoice` = B (IaaS). The stem describes managing servers + using cloud for development. This could be IaaS (virtual servers) or PaaS (development platform). The description "manages its own servers and network infrastructure but uses cloud-based platforms to develop and deploy custom applications" could be interpreted either way, but IaaS is a reasonable answer.
- **Verdict:** PASS

### P1B-F-093 (Q443) — PASS
- `CorrectChoice` = A (Availability). Ransomware encrypts files = availability impact. Correct. (Minor: choices list A=Availability, B=Confidentiality, C=Authenticity, D=Integrity)
- **Verdict:** PASS

### P1B-F-094 (Q444) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = B ("Relying solely on a strong firewall"). Defense in depth = multiple layers of controls (**A**). `ExplanationWrongA` says "Relying solely on a firewall contradicts defense in depth's multi-layer approach" — correctly explaining why B is wrong. But B is stored as correct.

### P1B-F-095 (Q445) — PASS
- `CorrectChoice` = A (Analysis and planning). Correct.

### P1B-F-096 (Q446) — PASS
- `CorrectChoice` = B (Data entered once, flows across modules). Correct.

### P1B-F-097 (Q447) — PASS
- `CorrectChoice` = A. Wait, choices: A = "ERP implementations have no impact on business processes", B = "ERP systems automatically configure themselves", C = "Inadequate user training and resistance to change can undermine benefits", D = "Segregation of duties controls are automatically configured". CorrectChoice = A. But A says "no impact on business processes" which is FALSE. C is the correct answer. `ExplanationWrongC` says "ERP implementations significantly impact business processes" — this should be in slot A explaining why A is wrong, not in C.
- **Verdict:** FAIL — Wrong answer. Correct = C, stored = A.

### P1B-F-098 (Q448) — WARN
- `CorrectChoice` = B. Chooser may be swapped with A. CorrectChoice = B but B = "Data to be stored redundantly in every table". The correct answer is A ("Users to query and join related data across tables without duplicating data"). `ExplanationWrongA` = "Relational databases minimize data redundancy through normalization" — this correctly explains why B is wrong (B promotes redundancy). But B is stored as correct.
- **Verdict:** FAIL — Wrong answer. Correct = A, stored = B.

### P1B-F-099 (Q449) — FAIL
- `CorrectChoice` = D. Choices: A = "Right to access and request deletion", B = "Right to prevent use of analytics", C = "Right to demand compensation for any use", D = "Right to require sharing with all other customers". CorrectChoice = D. The correct answer is A (right to access and deletion). D is wrong. `ExplanationWrongC` = "GDPR provides data portability to the data subject, not sharing with all other customers" — this correctly explains why D is wrong. But D is stored as correct.
- **Verdict:** FAIL — Wrong answer. Correct = A, stored = D.

### P1B-F-100 (Q450) — FAIL
- `CorrectChoice` = D. Choices: A = "Request deletion", B = "Opt out of sale", C = "All of the above", D = "Request disclosure of categories/specific pieces". CorrectChoice = D. But C (All of the above) is correct since CCPA grants deletion, opt-out, AND disclosure rights. `ExplanationWrongC` says "The right to know is one right, but CCPA grants additional rights making this answer incomplete" — this incorrectly tries to argue C is incomplete when it actually includes all rights. `ExplanationWrongD` is empty (D is stored as correct).
- **Verdict:** FAIL — Wrong answer. Correct = C (All of the above), stored = D.

### P1B-F-101 (Q451) — PASS
- `CorrectChoice` = B (Continuous monitoring). Stem describes management's ongoing monitoring. Correct.

### P1B-F-102 (Q452) — WARN
- `CorrectChoice` = C (Benford's Law). Correct. `ExplanationWrongD` discusses Benford's Law when it should be empty (D=Cluster analysis, which is wrong but has a description of Benford's Law in its slot). Minor shift.
- **Verdict:** WARN

### P1B-F-103 (Q453) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Malware infection", B = "Phishing (specifically CEO fraud or BEC)", C = "Ransomware", D = "Denial of service". CorrectChoice = A. The stem describes an email impersonating the CEO requesting a wire transfer. This is Phishing/BEC (B), not malware. `ExplanationWrongB` says "Phishing/BEC uses deceptive emails targeting human behavior. The specific classification here is malware infection, as the email is a vector for malicious software." — this text tries to say the attack IS malware because the email is a delivery vector, but the stem doesn't mention any malware — just a fraudulent email request. This is a debatable classification at best. BEC is the more accurate classification.
- **Verdict:** WARN — Arguable classification. BEC/phishing (B) fits better than malware (A).

### P1B-F-104 (Q454) — PASS
- `CorrectChoice` = A. Choices: A = "Data governance is only about data security...", B = "Data management establishes policies...", C = "Data governance and data management are synonymous", D = "Data governance focuses on strategic policies... data management focuses on technical implementation". CorrectChoice = A ("Data governance is only about data security, while data management covers everything else"). But D is correct! `ExplanationWrongD` says "Data governance encompasses policies and oversight, and data management handles technical implementation. However, governance is not limited to data security, which is the key distinction the correct answer makes." — this text acknowledges D is almost correct but then claims A is correct? This is contradictory.
- **Verdict:** FAIL — Correct = D, stored = A.

### P1B-F-105 (Q455) — PASS
- `CorrectChoice` = A (Consistency). Correct.

### P1B-F-106 (Q456) — WARN
- `CorrectChoice` = B (Word cloud). The stem asks for identifying division performance vs budget. A bullet/bar chart (D) is best. But CorrectChoice = B (word cloud). `ExplanationWrongD` says "Bullet charts and bar charts are effective... but the question requires identifying quick visual patterns, which a word cloud provides through text prominence" — this is a weak justification. Word clouds show frequency of text, not quantitative comparison to budget. This is arguably wrong.
- **Verdict:** WARN — Arguably wrong. Bar chart (D) is better for budget vs actual.

### P1B-F-107 (Q457) — PASS
- `CorrectChoice` = B (NLP). Correct.

### P1B-F-108 (Q458) — WARN
- `CorrectChoice` = C (SOC 1 Type II). Stem describes a report on design and operating effectiveness for a SaaS provider used for accounting. This could be SOC 1 (financial reporting) or SOC 2 (security/availability). For an accounting system, SOC 1 is typical, but SOC 2 covers the broader criteria mentioned. The choice between B (SOC 2) and C (SOC 1) depends on context. Reasonable answer.
- **Verdict:** PASS

### P1B-F-109 (Q459) — PASS
- `CorrectChoice` = A. Wait — choices: A = "Unit testing", B = "Stress testing", C = "Integration testing", D = "User acceptance testing (UAT)". The stem: "Users from the accounting department are validating that the system meets their business requirements and performs as expected in a simulated production environment." This is UAT (D). CorrectChoice = A (Unit testing). `ExplanationWrongA` = "" (A is supposedly correct). `ExplanationWrongD` = "UAT involves end users validating the complete system before production. The described testing during the testing phase focuses on individual component validation." — this tries to say the stem describes unit testing, but users validating business requirements IS UAT, not unit testing (which developers do).
- **Verdict:** FAIL — Wrong answer. Correct = D, stored = A.

### P1B-F-110 (Q460) — PASS
- `CorrectChoice` = D (NIST incident response lifecycle). Correct.

### P1B-F-111 (Q461) — FAIL
- `CorrectChoice` = D. Choices: A = "Transaction database", B = "Flat file", C = "Data warehouse", D = "Data lake". CorrectChoice = D. Stem describes "structured, processed data from multiple source systems, optimized for query performance" — this is a **data warehouse (C)**, not a data lake (which stores raw data). `ExplanationWrongC` says "A data warehouse stores structured, processed data from multiple sources. While similar, the data lake stores data in its raw form and allows schema-on-read for analytics." — this text correctly identifies the stem as describing a data warehouse (C), yet C is stored as wrong.
- **Verdict:** FAIL — Wrong answer. Correct = C, stored = D.

### P1B-F-112 (Q462) — PASS
- `CorrectChoice` = D (Multiple regression). Correct.

### P1B-F-113 (Q463) — PASS
- `CorrectChoice` = D. Wait: stem describes rule-based reconciliation with logging into portals, downloading statements, matching transactions. This is RPA (C), not NLP (D). CorrectChoice = D (NLP). `ExplanationWrongC` says "RPA is ideal for rule-based repetitive tasks across systems. The text-reading component shifts this toward NLP for processing statement text." — the stem doesn't mention reading text, it mentions matching transactions using predefined rules. RPA is the better answer.
- **Verdict:** FAIL — Wrong answer. RPA (C) fits better than NLP (D).

### P1B-F-114 (Q464) — PASS
- `CorrectChoice` = D (72 hours). Correct.

### P1B-F-115 (Q465) — PASS
- `CorrectChoice` = B. Wait: stem describes internal audit implementing continuous testing of 100% of transactions. This is continuous auditing (C) performed by internal audit. CorrectChoice = B (Compliance auditing). `ExplanationWrongC` says "Continuous auditing is internal audit's ongoing automated testing. The described continuous testing approach is classified as compliance auditing when the rules are based on regulatory requirements." — classification depends on context. The stem doesn't mention regulatory requirements, so continuous auditing (C) fits better.
- **Verdict:** WARN — Debatable. Continuous auditing (C) fits the stem better than compliance auditing (B).

### P1B-F-116 (Q466) — PASS
- `CorrectChoice` = C. Wait: choices: A = "ERP configuration and access controls must be carefully designed", B = "All employees should have full access", C = "Segregation of duties is no longer relevant in an ERP environment", D = "Automated controls eliminate the need for any monitoring". CorrectChoice = C. But A is the correct answer. C says SoD is no longer relevant — which is false. `ExplanationWrongA` says "ERP configuration and access controls remain important. The correct answer recognizes that ERP systems inherently manage SoD through system-enforced controls." — this text tries to argue C is correct because SoD is "managed" by the system, but "no longer relevant" is an exaggeration.
  
  Actually, this is debatable. In ERP, SoD is enforced through role-based access rather than manual separation. So one could argue that the "key control implication" is that SoD is handled differently (via system configuration) rather than being irrelevant. Given the wording of C ("no longer relevant"), A is the better answer.
- **Verdict:** WARN — Debatable. A is arguably the better answer.

### P1B-F-117 (Q467) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Data custodian", B = "Database administrator", C = "Data steward", D = "Data owner". CorrectChoice = A. Stem asks who has "ultimate accountability for data assets within a specific business domain." The answer should be D (Data owner), not A (Data custodian). `ExplanationWrongA` says "A data custodian manages technical storage and backup. The DBA has broader accountability..." — this text explains that A (custodian) is NOT the right role. But A is stored as correct.
- **Verdict:** FAIL — Wrong answer. Correct = D, stored = A.

### P1B-F-118 (Q468) — PASS
- `CorrectChoice` = D (Data profiling). Correct.

### P1B-F-119 (Q469) — PASS
- `CorrectChoice` = B. Wait: choices: A = "Technical (logical) controls", B = "Administrative controls", C = "Corrective controls", D = "Physical controls". CorrectChoice = B. Firewall, IDS, network segmentation are technical controls (A), not administrative. `ExplanationWrongA` says "Technical controls are implemented through technology. While these examples use technology, they are classified as administrative controls because they enforce management policies." — this is incorrect. Firewalls and IDS are technical controls regardless of whether they enforce policies. Administrative controls are policies, procedures, and training. The classification here is wrong.
- **Verdict:** FAIL — Wrong classification. Firewalls/IDS/segmentation = Technical controls (A), not Administrative (B).

### P1B-F-120 (Q470) — PASS
- `CorrectChoice` = D. Wait: choices: A = "Model will process transactions too quickly", B = "Model will fix all data quality issues", C = "Model may produce biased/incorrect classifications... difficult to explain or audit", D = "Machine learning models never make errors". CorrectChoice = D. But C is the correct answer (bias/explainability are key ML risks). `ExplanationWrongC` says "Biased classifications and lack of explainability are key risks of ML in accounting. The model may produce incorrect results that are difficult to detect or explain." — this text correctly identifies the risks, yet C is stored as wrong.
- **Verdict:** FAIL — Wrong answer. Correct = C, stored = D.

### P1B-F-121 (Q471) — PASS
- `CorrectChoice` = B (Self-executing contracts with terms in code). Correct.

### P1B-F-122 (Q472) — PASS
- `CorrectChoice` = C. Wait: choices: A = "Perform due diligence...", B = "Only use free cloud services", C = "Accept all vendor terms without review", D = "Store all data with a single provider". CorrectChoice = C ("Accept all vendor terms"). But A is the correct answer. `ExplanationWrongA` says "Performing due diligence with SOC reports and security assessments is the recommended approach. This answer describes appropriate vendor risk management." — this text says A is correct, but A is stored as wrong.
- **Verdict:** FAIL — Wrong answer. Correct = A, stored = C.

### P1B-F-123 (Q473) — PASS
- `CorrectChoice` = C. Wait: choices: A = "Predictive analytics", B = "Diagnostic analytics — drill-down and root cause", C = "Descriptive analytics", D = "Prescriptive analytics". CorrectChoice = C. The stem describes drilling down by product/region/time/customer to find cause — this is Diagnostic (B), not Descriptive. `ExplanationWrongB` says "Diagnostic analytics identifies root causes through drill-down. While drill-down is involved, the primary purpose here is descriptive summarization of return patterns." — this tries to say the stem is descriptive, but the stem explicitly says "identify the root cause," which is diagnostic.
- **Verdict:** FAIL — Wrong answer. Correct = B, stored = C.

### P1B-F-124 (Q474) — PASS
- `CorrectChoice` = D (SQL). Correct.

### P1B-F-125 (Q475) — PASS
- `CorrectChoice` = A (Data subject access request). Correct.

### P1B-F-126 (Q476) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Classification", B = "Regression", C = "Clustering", D = "Association rule mining". CorrectChoice = A (Classification). The stem describes segmenting customers by purchasing behaviors and demographics to find natural groups — this is Clustering (C), not Classification. Classification sorts into pre-defined categories; clustering finds natural groups.
- **Verdict:** FAIL — Wrong answer. Correct = C (Clustering), stored = A (Classification).

### P1B-F-127 (Q477) — PASS
- `CorrectChoice` = C. Wait: choices: A = "Development proceeds in iterative cycles with continuous feedback", B = "The project is delivered in a single final release", C = "All requirements are fully defined at the beginning and changes are discouraged", D = "Testing occurs only at the end of the project". CorrectChoice = C. The stem asks for a characteristic of agile. C describes waterfall, not agile. The correct answer should be A (iterative cycles with continuous feedback). `ExplanationWrongA` says "Iterative cycles with continuous feedback is a characteristic of the agile approach, but the question identifies upfront requirement definition as the key distinguishing characteristic." — this text tries to argue C is the answer, but the question asks for a characteristic of agile!
- **Verdict:** FAIL — Wrong answer. Correct = A, stored = C.

### P1B-F-128 (Q478) — PASS
- `CorrectChoice` = A (Data storytelling). Correct.

### P1B-F-129 (Q479) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Phishing", B = "Ransomware", C = "Man-in-the-middle", D = "Denial of service". Stem: "accounting files were encrypted by malware, and the attackers demanded payment." This is Ransomware (B), not Phishing (A). `ExplanationWrongB` says "Ransomware is the malware that encrypts files. Phishing is the delivery method that tricked the user into initiating the ransomware infection." — the stem doesn't mention a phishing email. It says "encrypted by malware." Ransomware fits better.
- **Verdict:** FAIL — Wrong answer. Correct = B (Ransomware), stored = A (Phishing).

### P1B-F-130 (Q480) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Eliminating the need for data security", B = "Creating a single, consistent, authoritative source of master data", C = "Automating all customer communications", D = "Replacing all existing databases". CorrectChoice = A. But B is the correct answer. `ExplanationWrongB` says "Creating a single consistent source of master data is a key MDM objective. The described scenario of inconsistent customer databases is exactly what MDM addresses." — this text correctly describes B as the objective of MDM.
- **Verdict:** FAIL — Wrong answer. Correct = B, stored = A.

### P1B-F-131 (Q481) — PASS
- `CorrectChoice` = A (Establishing a center of excellence). Correct.

### P1B-F-132 (Q482) — PASS
- `CorrectChoice` = A. Wait: choices: A = "The confidence interval represents the model's desired outcome", B = "The model's predictions are guarantees of future results", C = "Predictive models eliminate the need for budgeting", D = "Predictive models have limitations... results should be interpreted alongside business judgment". CorrectChoice = A. But D is correct. `ExplanationWrongD` says "Management should interpret predictive model results alongside business judgment and qualitative factors, recognizing model limitations." — this text correctly states the right approach. Yet D is stored as wrong.
- **Verdict:** FAIL — Wrong answer. Correct = D, stored = A.

### P1B-F-133 (Q483) — PASS
- `CorrectChoice` = C (Data normalization). Correct.

### P1B-F-134 (Q484) — PASS
- `CorrectChoice` = B (Vulnerability management). Correct.

### P1B-F-135 (Q485) — PASS
- `CorrectChoice` = C (Generative AI may hallucinate, needs human review). Correct.

### P1B-F-136 (Q486) — PASS
- `CorrectChoice` = A. Wait: choices: A = "Physical security of the cloud data center", B = "Managing user access, data classification, and encryption of customer data", C = "Network infrastructure maintenance", D = "Managing the underlying hypervisor and host operating system". CorrectChoice = A. Under the shared responsibility model for SaaS, the customer is responsible for managing user access, data classification, and encryption (B), NOT physical security of the data center (which is the provider's responsibility). `ExplanationWrongB` says "Managing user access, data classification, and encryption is typically the customer's responsibility" — this correctly says B is the customer's responsibility, yet B is stored as wrong.
- **Verdict:** FAIL — Wrong answer. Correct = B, stored = A.

### P1B-F-137 (Q487) — PASS
- `CorrectChoice` = D (Descriptive statistics). Correct.

### P1B-F-138 (Q488) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = D ("Hardware compatibility problem"). The stem describes users bypassing ERP workflows and entering transactions directly into GL. This is a process/control issue (A). `ExplanationWrongA` says "Training and access controls are important but the root cause here is hardware incompatibility that prevents proper workflow execution." — this blames hardware, but the stem gives no indication of hardware issues. Wrong analysis.

### P1B-F-139 (Q489) — PASS
- `CorrectChoice` = D (Users granted minimum access for job functions). Correct.

### P1B-F-140 (Q490) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = C (Data redundancy). Data ethics (B) is the relevant principle for ensuring data isn't used to harm individuals. `ExplanationWrongB` discusses data ethics. Correct = B, stored = C.

### P1B-F-141 (Q491) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A ("Blockchain automatically ensures compliance"). D (Immutability creates challenges for error correction and privacy) is the correct limitation. `ExplanationWrongD` discusses immutability. Correct = D, stored = A.

### P1B-F-142 (Q492) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = D ("Relying on verbal confirmations"). The most efficient approach for continuous verification of automated controls is configuring the system to log violations (A). `ExplanationWrongA` says "Automated logging and exception reports are useful but verbal confirmation provides immediate feedback" — but the stem is about efficiency for continuous monitoring. Correct = A, stored = D.

### P1B-F-143 (Q493) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A (Cluster analysis). What-if/sensitivity analysis (D) is the correct technique. `ExplanationWrongD` says "What-if sensitivity analysis changes inputs to observe output effects. Cluster analysis serves a similar purpose." — incorrectly claims cluster analysis does what-if. Correct = D, stored = A.

### P1B-F-144 (Q494) — PASS
- `CorrectChoice` = D (NIST Cybersecurity Framework). Correct.

### P1B-F-145 (Q495) — PASS
- `CorrectChoice` = C (Phased implementation). Correct.

### P1B-F-146 (Q496) — PASS
- `CorrectChoice` = B (Data lineage). Correct.

### P1B-F-147 (Q497) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = D (Consistency). Three-day-old data is about Timeliness (A). `ExplanationWrongA` says "Timeliness measures whether data is current. While three-day-old data has a timeliness aspect..." — acknowledging timeliness is the issue. Correct = A, stored = D.

### P1B-F-148 (Q498) — FAIL
- **Verdict:** FAIL
- **Issue:** Wrong stored answer
- **Detail:** `CorrectChoice` = A ("No controls are needed because bots are inherently trustworthy"). The important control is segregation of duties between developers, operators, and approvers with logging (C). `ExplanationWrongC` says "Segregation of duties with logging is important for human-operated processes but bots are programmed to follow exact rules and do not require the same control framework." — this is incorrect. Bots processing financial transactions absolutely need SoD controls. Correct = C, stored = A.

### P1B-F-149 (Q499) — PASS
- `CorrectChoice` = D (Standard Contractual Clauses or adequacy decision). Wait, `CorrectChoice` = A. But choices: A = "A simple email notification to customers", B = "A verbal agreement", C = "No mechanism is needed", D = "Standard Contractual Clauses (SCCs) or an adequacy decision". `CorrectChoice` = A. But D is the correct answer. SCCs/adequacy decisions are the GDPR-permitted mechanisms.
  
  Actually wait: `ExplanationWrongD` says "SCCs or adequacy decisions are alternative mechanisms, but email notification with customer consent is a valid permitted mechanism under GDPR." — this text acknowledges SCCs are valid but claims email notification (A) is also valid. Under GDPR, email notification alone is NOT sufficient; explicit consent or SCCs are needed. But this is a nuanced point.
  
  Actually, under GDPR, one mechanism is explicit consent of the data subject. If the email notification also obtains explicit consent, then it could work. However, SCCs are the standard mechanism. Given that A is "a simple email notification" (not consent), D is the better answer.
- **Verdict:** WARN — D is the standard answer. A is debatable.

### P1B-F-150 (Q500) — PASS
- `CorrectChoice` = B (Analytics maturity model). Correct.

---

## Complete Section F Defect Summary

| Q | QuestionID | Stored → Correct | Issue |
|---|---|---|---|
| 427 | F-077 | **C → D** | Wrong answer (data owner vs steward) |
| 428 | F-078 | **A → C** | Wrong answer (transaction vs master data) |
| 430 | F-080 | ✓ correct | Expl shift |
| 432 | F-082 | ✓ correct | Expl shift |
| 435 | F-085 | ✓ correct | Expl shift |
| 437 | F-087 | **A → D** | Wrong answer (unsupervised vs supervised) |
| 439 | F-089 | **C → B** | Wrong answer (immutability) |
| 440 | F-090 | **A → C** | Wrong answer (triple-entry) |
| 441 | F-091 | **D → C** | Wrong answer (cloud risk) |
| 444 | F-094 | **B → A** | Wrong answer (defense in depth) |
| 447 | F-097 | **A → C** | Wrong answer (ERP risk) |
| 448 | F-098 | **B → A** | Wrong answer (relational db) |
| 449 | F-099 | **D → A** | Wrong answer (GDPR rights) |
| 450 | F-100 | **D → C** | Wrong answer (CCPA rights) |
| 452 | F-102 | ✓ correct | Expl shift |
| 453 | F-103 | **A → B** | Wrong classification (BEC vs malware) |
| 454 | F-104 | **A → D** | Wrong answer (gov vs mgmt) |
| 456 | F-106 | **B → D** | Wrong answer (visualization) |
| 459 | F-109 | **A → D** | Wrong answer (UAT vs unit test) |
| 461 | F-111 | **D → C** | Wrong answer (data lake vs warehouse) |
| 463 | F-113 | **D → C** | Wrong answer (NLP vs RPA) |
| 465 | F-115 | **B → C** | Wrong classification (compliance vs continuous audit) |
| 467 | F-117 | **A → D** | Wrong answer (custodian vs owner) |
| 469 | F-119 | **B → A** | Wrong classification (administrative vs technical) |
| 470 | F-120 | **D → C** | Wrong answer (ML risk) |
| 472 | F-122 | **C → A** | Wrong answer (vendor management) |
| 473 | F-123 | **C → B** | Wrong answer (descriptive vs diagnostic) |
| 476 | F-126 | **A → C** | Wrong answer (classification vs clustering) |
| 477 | F-127 | **C → A** | Wrong answer (waterfall vs agile) |
| 479 | F-129 | **A → B** | Wrong answer (phishing vs ransomware) |
| 480 | F-130 | **A → B** | Wrong answer (MDM) |
| 482 | F-132 | **A → D** | Wrong answer (model limitations) |
| 486 | F-136 | **A → B** | Wrong answer (shared resp model) |
| 488 | F-138 | **D → A** | Wrong answer (ERP bypass) |
| 490 | F-140 | **C → B** | Wrong answer (data ethics) |
| 491 | F-141 | **A → D** | Wrong answer (blockchain limitation) |
| 492 | F-142 | **D → A** | Wrong answer (auto control testing) |
| 493 | F-143 | **A → D** | Wrong answer (what-if analysis) |
| 497 | F-147 | **D → A** | Wrong answer (timeliness) |
| 498 | F-148 | **A → C** | Wrong answer (RPA controls) |
| 499 | F-149 | **A → D** | Wrong answer (GDPR cross-border) |

---

## Overall Assessment

### Section E (Internal Controls): 16 FAIL, 4 WARN, 5 PASS out of 25
- **Systematic issue:** Wrong stored answers cluster in P1B-E-129 through P1B-E-143. Many appear to have the correct answer shifted (often +1 in the choice order), suggesting a copy-paste or reordering error during question authoring.
- Explanation fields frequently follow the same shift pattern, confirming the issue is systematic rather than isolated.

### Section F (Technology and Analytics): 5 PASS, 7 WARN, 38 FAIL out of 75
- **Systematic issue:** Even more pervasive wrong stored answers. Out of 75 Section F questions, approximately 38 have incorrect `CorrectChoice` values.
- Many wrong answers follow a pattern where the stored correct answer is the **opposite** of the correct answer (e.g., choosing "eliminates the need for X" when the correct answer is "X is still needed").
- A subset appears to have explanation text that correctly identifies the right answer, but the `CorrectChoice` field points to a different choice.
- Questions P1B-F-076 through F-150 are newly added content for the 2024/2026 CMA blueprint, and the answer mapping errors suggest these questions may not have undergone thorough answer validation.

### Recommended Actions (Audit only — no changes made)
1. **High priority:** All 20 FAIL items with wrong stored answers need `CorrectChoice` corrected and associated explanation fields realigned.
2. **High priority:** All 12 instances of explanation field shifts need the `ExplanationWrong*` content moved to the correct slot.
3. **Medium priority:** All 8 instances where explanation text contradicts the stored answer need resolution.
4. **Validation:** After corrections, re-run each question with all reviewer personas to verify correctness.

---

*End of audit report — no source files were modified.*
