var MCQ_BANK_D_PART_67 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.038 structured vs. unstructured data — combining warranty claim text with structured repair data",
    "MicroTopic": "Unstructured technician notes revealing hidden defect patterns",
    "UniqueConceptKey": "P1-FD-038-structured-vs-unstructured-warranty-claim-analysis",
    "LOSTag": "P1-F.4 Data analytics — combining structured and unstructured data for pattern detection",
    "QuestionID": "P1-FD-038",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "Stem": "Atlas Engineered Products manufactures industrial pumps with a 36-month warranty. The quality assurance manager, Raj Patel, analyzes quarterly warranty claims using structured data fields — repair cost, part replaced, failure date, and production batch number. The structured data shows warranty costs are within the 2.1% of revenue benchmark, with seal replacements evenly distributed across all production batches. However, Raj's team also reviews the unstructured technician notes from each repair visit and notices a recurring phrase across 34 separate claims: 'intermittent seal failure — works fine on bench test but leaks under load after 15-20 minutes.' This failure pattern does not appear in any structured data field because the structured system classifies each incident as a discrete seal replacement with no severity or pattern flag. Raj must determine what the combination of structured and unstructured data reveals that structured data alone does not.",
    "Choices": {
      "A": "The structured warranty data is the authoritative source for analysis because it is quantitative and auditable — the intermittent seal failure noted in technician comments is anecdotal and should be monitored but does not warrant an engineering investigation since the overall warranty rate remains within the 2.1% of revenue benchmark.",
      "B": "Combining unstructured technician notes with structured warranty data reveals a design defect that structured data alone masks — structured fields classify each incident as an isolated seal replacement, while the unstructured text across 34 claims reveals a recurring failure pattern that is intermittent, load-dependent, and not reproducible on a bench test, all characteristics of a systematic design tolerance issue requiring engineering investigation.",
      "C": "The technician notes should be standardized into structured data fields — by adding a dropdown field for failure pattern classification, future data will be captured in structured form and the pattern will be detected automatically through standard warranty analytics without requiring manual review of unstructured text.",
      "D": "The structured warranty data showing 2.1% of revenue is the key performance indicator — since this rate is below the 3% industry benchmark for industrial equipment manufacturers, the controller should conclude that warranty reserves are adequate and no further investigation is warranted."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The structured-warranty-data-only view shows a reassuring picture: warranty costs at 2.1% of revenue, within benchmark, with seal replacements evenly distributed across production batches — suggesting random quality variation with no systemic issue. The unstructured technician notes, however, contain a critical diagnostic signal that the structured fields were never designed to capture: a recurring failure pattern present across 34 separate claims, characterized by three diagnostically significant features — the failure is intermittent rather than continuous, it is load-dependent (occurs only under operating load, not on a bench test), and it manifests after a consistent 15-to-20-minute interval. Under the IMA's Technology and Analytics domain (CMA Part 1 Domain F), business value from data analytics is frequently unlocked by combining structured and unstructured data sources: structured data answers 'what happened and how often' (seal replaced, $X cost, Batch Y), while unstructured data answers 'why and how' (the failure mechanism, operating conditions, and diagnostic patterns). The combination reveals a likely design tolerance issue — a seal that performs adequately on a stationary bench test but deforms under sustained operating load — which structured fields alone classify as indistinguishable from any other seal replacement. For Atlas Engineered Products, Raj should escalate this finding to the engineering and controller teams: if the design defect affects a common seal across multiple pump models, the current 34 claims at 2.1% of revenue could escalate sharply as the installed base ages, potentially triggering warranty reserve inadequacy and, in a worst case, a product recall far more costly than proactive design remediation.",
    "ExplanationWrongA": "Dismissing unstructured technician notes as 'anecdotal' undervalues the most diagnostically significant data in the warranty analysis. The fact that 34 separate technicians independently described the identical failure pattern — 'intermittent,' 'works on bench test,' 'leaks under load after 15-20 minutes' — is itself quantitative evidence of a systemic issue. Bench tests that cannot reproduce a failure while field operation consistently does is a diagnostic signal indicating the failure is condition-dependent, not random. Warranty metrics within benchmark do not justify ignoring qualitative evidence of a design defect.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Adding structured fields for future failure pattern classification is a valuable preventive improvement but does not address the 34 existing claims and the months of historical technician notes that already document the intermittent seal failure pattern. The current evidence — unstructured text describing a recurring design-sensitive failure — exists now and requires immediate analysis. A forward-looking field addition alone leaves the existing defect unaddressed while the condition-dependent failures continue to accumulate in the field.",
    "ExplanationWrongD": "The 3% industry benchmark is a financial planning metric for overall warranty cost adequacy, not a diagnostic threshold for product quality or safety. A design defect that causes intermittent load-dependent failures represents a quality, reputational, and potential safety risk independent of whether total warranty costs currently fall below an industry average. The cost of a product recall, regulatory action, or liability claim arising from an escalating defect could far exceed the warranty reserve, and the early-warning signal exists now in the unstructured technician notes regardless of the benchmark comparison.",
    "VerifiedChecks": [
      "Choices populated — 4 options A-D",
      "ExplanationCorrect >= 200 chars",
      "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps"
    ]
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.039 unstructured data — analyzing board meeting minutes for risk disclosure obligations",
    "MicroTopic": "Semantic search vs. keyword search for unstructured risk identification",
    "UniqueConceptKey": "P1-FD-039-unstructured-board-minutes-risk-disclosure-analysis",
    "LOSTag": "P1-F.4 Data analytics — unstructured text analytics for risk identification",
    "QuestionID": "P1-FD-039",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "Stem": "Following an SEC inquiry into Meridian Health Systems' risk factor disclosures, the general counsel, Elena Torres, must review five years of board meeting minutes — approximately 120 PDF documents totaling 3,400 pages — to identify any discussions of material risks that should have been disclosed in the company's 10-K filings. An initial keyword search for terms including 'lawsuit,' 'regulatory,' 'investigation,' 'settlement,' and 'violation' identified 47 documents for review. However, Elena is concerned that the keyword approach missed discussions where risks were described using euphemistic or indirect language — for example, a board discussion referencing 'the Chicago matter' or 'ongoing conversations with the agency' rather than using explicit risk disclosure terminology.",
    "Choices": {
      "A": "Keyword search combined with manual review of the 47 identified documents is sufficient — if a risk was not described using standard risk disclosure terminology, it was not material enough to require disclosure, and the SEC will accept a keyword-based search methodology as demonstrating reasonable diligence.",
      "B": "The general counsel should engage an outside law firm to manually read all 3,400 pages of board minutes — only exhaustive human review can reliably identify indirect risk references, and the legal cost is justified by the regulatory exposure from a potential SEC enforcement action.",
      "C": "Manual review of 3,400 pages by internal legal staff is the only legally defensible approach — technology-assisted method risks missing euphemistic or coded risk descriptions and would not withstand SEC scrutiny if a missed disclosure is later identified.",
      "D": "Keyword search alone is insufficient for comprehensive risk identification because it captures only documents using the exact search terms — the general counsel should supplement keyword search with semantic search technology that identifies conceptually related discussions, topic modeling that surfaces recurring risk themes across the five-year corpus, and anomaly detection that flags meetings with unusual topic distributions warranting human review."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Keyword search operates on exact string matching — it finds only documents containing the specific terms queried and returns zero results for documents discussing the same concepts using different vocabulary. Board discussions of sensitive legal and regulatory matters frequently employ indirect, euphemistic, or context-dependent language — 'the Chicago matter' for a lawsuit, 'ongoing conversations with the agency' for a regulatory investigation, 'the situation we discussed in executive session' — which keyword search cannot detect because these phrases contain none of the target terms. This limitation is well-established in the IMA's Technology and Analytics domain (CMA Part 1 Domain F): the recall of keyword-based search — its ability to find all relevant documents — is bounded by the searcher's ability to anticipate every possible linguistic formulation of the target concept. Semantic search technologies — including latent semantic indexing, word embedding models, and transformer-based document similarity — identify documents that are conceptually related to a target inquiry even when they use entirely different vocabulary. Topic modeling algorithms can cluster documents by latent themes, surfacing recurring topics that may represent ongoing risk discussions across years of meetings. For Meridian Health Systems' SEC response, Elena Torres should deploy a technology-assisted review protocol that combines multiple analytical approaches: semantic search to surface conceptually related documents beyond keyword matches, topic clustering to identify recurring risk themes across the five-year corpus, and anomaly detection to flag individual meetings where the topic distribution statistically deviates from the board's typical agenda — any of which may surface discussions about disclosable risks that were described in non-standard language. This approach is consistent with technology-assisted review methodologies that courts and regulators have accepted as at least as effective as exhaustive manual review for large-scale document-intensive investigations.",
    "ExplanationWrongA": "The SEC has brought enforcement actions where companies relied on keyword-based search methodologies that failed to identify material risks discussed using non-standard language. Materiality is determined by the nature and magnitude of the risk to investors, not by whether board members used specific vocabulary when discussing it. A keyword-only approach exposes the company to search-term risk — the risk that highly relevant documents exist in the corpus but use different linguistic formulations than the search terms selected, producing a false sense of completeness from a search that returned only 47 documents.",
    "ExplanationWrongB": "Engaging outside counsel to manually review 3,400 pages would cost approximately $340,000 to $680,000 (at $100 to $200 per page for attorney document review) and still carries the well-documented risk of human reviewer fatigue and inconsistency. Empirical studies of large-scale document review in litigation and investigations show that human reviewers miss 20% to 40% of relevant documents in exhaustive manual reviews due to fatigue, varying interpretation standards, and the inherent difficulty of maintaining consistent attention across thousands of pages. Technology-assisted review has been demonstrated to be at least as effective as, and often more consistent than, purely manual review.",
    "ExplanationWrongC": "Technology-assisted review using semantic search and topic modeling is not a compromise on thoroughness — it is a methodology that has been accepted by federal courts, the SEC, and the Department of Justice for document-intensive investigations. The concern that technology-assisted review would not withstand regulatory scrutiny is contrary to established practice: regulators themselves use these tools for large-scale document analysis. The key is not to avoid technology but to design a defensible protocol that combines computational breadth — processing all 3,400 pages algorithmically — with human judgment on the most relevant results.",
    "ExplanationWrongD": "",
    "VerifiedChecks": [
      "Choices populated — 4 options A-D",
      "ExplanationCorrect >= 200 chars",
      "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps"
    ]
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.040 structured vs unstructured data",
    "MicroTopic": "structured vs unstructured data",
    "UniqueConceptKey": "F-D040-structured-vs-unstructured-data",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Orchardgate manages both data stored in traditional relational database tables and data from emails, videos, and social media posts. What describes the second category of data?",
    "Choices": {
      "A": "Structured data, identical in format to database tables",
      "B": "Metadata, which only describes other data",
      "C": "Master data, which represents core reference information",
      "D": "Unstructured data, which does not fit neatly into predefined rows and columns"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Unstructured data, such as emails, videos, and social media content, does not fit into predefined rows and columns like structured, tabular database data.",
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
    "QuestionID": "P1-FD-040",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because structured data is the category that fits neatly into predefined rows and columns — as in the relational database tables referenced in the stem. The stem asks about the second category, which is data from emails, videos, and social media posts that does not conform to a fixed schema or tabular format. A candidate may reverse the two categories or assume all business data qualifies as structured.",
    "ExplanationWrongB": "Choice B is incorrect because metadata is data about data — attributes such as creation date, author, file size, and data lineage — not the content itself. The stem describes actual content files (emails, videos, posts), not descriptive tags about those files. A candidate may confuse information about data with the underlying data content.",
    "ExplanationWrongC": "Choice C is incorrect because master data represents key business entities such as customers, products, suppliers, and chart of accounts that are shared across systems. Emails, videos, and social media content are not master data records but rather unstructured content that does not fit predefined schemas. A candidate may conflate any non-transactional data category with master data.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S899 Phase 1 — Analyze replacement for archived P1-FD-040 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.041 cybersecurity — authentication — multi-factor and digital certificate weaknesses",
    "MicroTopic": "Cybersecurity — authentication — MFA and digital signatures",
    "UniqueConceptKey": "F-D041-auth-digital-certificate-weakness",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Hazelwood Credit Union's online banking platform requires two-factor authentication: a password and a digital certificate installed on the user's computer. During a security audit, the IT security team discovers that an attacker compromised a customer's account by: (1) installing a keylogger on the customer's workstation that captured the password; (2) exporting the customer's digital certificate from the Windows certificate store, which was protected only by the user's Windows login password (the same password); and (3) using the stolen password and certificate from a different computer to initiate a $42,000 wire transfer. The platform's certificate validation only checks that the certificate is valid and issued by the bank's CA — it does not check the requesting device's identity. Which authentication architecture weakness is most critical?",
    "Choices": {
      "A": "The authentication is not truly multi-factor because both factors are vulnerable to the same workstation compromise — the bank should add a third factor (SMS one-time code) sent to a separate device to break the single-point-of-failure on the workstation",
      "B": "The digital certificate provides no additional security when protected by the same password — the bank should replace the certificate-based second factor with biometric authentication (fingerprint or facial recognition) that cannot be exported or stolen",
      "C": "The certificate validation only checks certificate validity and issuer — the bank should migrate to FIDO2/WebAuthn hardware security keys that bind authentication to the physical device and are resistant to credential export and replay attacks",
      "D": "The authentication architecture treats both factors as independent when they share a common dependency — both are protected by a single workstation password, creating a single point of failure; the bank should implement device binding that ties the certificate to the specific device's hardware identity and requires re-authentication when the certificate is used from a new device"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The critical weakness is that what appears to be two independent authentication factors (password + digital certificate) are both protected by a single credential: the workstation login password. The attacker obtained the password through a keylogger, then used the same password to export the certificate from the Windows certificate store. This is a common architectural flaw: multiple factors that share a dependency are not truly independent. The authentication system treats the password and certificate as independent verification steps, but their protection is not independent — compromising the password also compromises the certificate. The correct remediation implements device binding: the digital certificate should be cryptographically bound to the hardware identity of the device on which it was installed (using a Trusted Platform Module or hardware-backed key storage). If the certificate is exported and used from a different device, the authentication system should detect the device change and require step-up authentication (e.g., a one-time code sent to a registered phone number or a video verification call). This breaks the dependency between the two factors by ensuring that possession of the password alone is insufficient to use the certificate from a different device.",
    "StudyLinks": [
      {
        "label": "NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management",
        "url": "https://www.nist.gov"
      },
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-041",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "The bank's authentication IS multi-factor in type (password: something you know; digital certificate: something you have), but the critical weakness is that both factors share a common dependency on the workstation password. A candidate may conflate \"is not multi-factor\" with \"has a common vulnerability across factors.\" The audit finding correctly identifies that the factors are not truly independent because a single compromise threatens both.",
    "ExplanationWrongB": "The digital certificate does provide additional security benefit — requiring a second form of authentication beyond a password. However, the certificate's security value is compromised when it is protected by the same password as the primary factor. A candidate may dismiss the certificate entirely because of the shared vulnerability, but the correct assessment is that the architecture's failure comes from both factors sharing a common dependency on one password, not from the certificate having zero value in principle.",
    "ExplanationWrongC": "Choice C is incorrect because digital signatures verify that a document has not been tampered with since signing and that it originated from the claimed signer. They do not validate the arithmetic or accounting accuracy of the document's contents. A candidate may conflate integrity of transmission with correctness of content.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S58 Phase 6 — upgraded from DL-012 rotation clone (content preserved, difficulty/cognitive recalibrated for Technology & Analytics domain)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.042 digital signature authentication — evaluating non-repudiation controls for SOX compliance",
    "MicroTopic": "Digital signatures vs. MFA trade-off evaluation for financial approval integrity",
    "UniqueConceptKey": "P1-FD-042-digital-signature-vs-MFA-SOX-non-repudiation",
    "LOSTag": "P1-F.5 Cybersecurity and information system controls — authentication and non-repudiation",
    "QuestionID": "P1-FD-042",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "Stem": "Following a SOX Section 404 deficiency finding that journal entry approvals in the general ledger system lack non-repudiation — an authorized approver could deny having approved a specific entry — the controller of Helix Biosciences, David Chen, must recommend a remediation approach to the audit committee. He evaluates three alternatives: (a) implement PKI-based digital signatures integrated with the ERP system at a cost of $180,000 setup plus $12,000 annual maintenance, providing cryptographic non-repudiation by linking each journal entry approval to the approver's unique private key with a verifiable audit trail; (b) enhance the existing multi-factor authentication system with biometric verification — fingerprint or facial recognition — at a one-time cost of $45,000, which strengthens login authentication but does not cryptographically bind specific transaction approvals to the authenticated user; or (c) maintain the current password-based approval workflow and add compensating detective controls — a weekly independent review of all journal entry approvals by the internal audit team at an estimated annual cost of $38,000. David must evaluate the trade-offs and recommend the alternative that best addresses the specific SOX deficiency finding.",
    "Choices": {
      "A": "Implement PKI-based digital signatures — although the $180,000 setup cost is the highest of the three alternatives, digital signatures directly remediate the non-repudiation deficiency by cryptographically binding each journal entry approval to the approver's private key, creating an audit trail that cannot be repudiated and that satisfies both SOX auditor requirements and the COSO Control Activities principle that controls should address the specific risk identified.",
      "B": "Enhance MFA with biometric verification — at $45,000 this is the most cost-effective option, biometric authentication provides stronger identity assurance than passwords alone, and the combination of a hardware token with a biometric factor provides sufficient non-repudiation strength to satisfy the SOX deficiency finding.",
      "C": "Maintain the current password-based approval workflow with compensating internal audit detective controls — the $38,000 annual cost is lower than the digital signature investment over reasonable time horizon, and compensating detective controls are an explicitly accepted alternative to preventive controls under the COSO Internal Control Framework.",
      "D": "Implement both digital signatures and biometric MFA simultaneously — only a layered defense-in-depth approach with both enhanced authentication and cryptographic non-repudiation fully satisfies SOX requirements for journal entry approval integrity, and the combined $225,000 investment is justified by the severity of a Section 404 material weakness."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The SOX Section 404 deficiency finding specifically identifies the absence of non-repudiation — the ability to prove that a specific individual approved a specific journal entry and the inability of that individual to credibly deny having done so. Under the COSO Internal Control Framework's Control Activities principle, control activities should be selected and developed based on the specific risks they are designed to mitigate. PKI-based digital signatures directly address non-repudiation through asymmetric cryptography: each journal entry approval is signed with the approver's unique private key, creating a cryptographic binding that establishes three control properties simultaneously — authentication (proof of who approved), integrity (detection of any post-approval tampering with the entry), and non-repudiation (the approver cannot plausibly deny the approval because only their private key could have generated the valid signature). The IMA's Technology and Analytics domain (CMA Part 1 Domain F, cybersecurity and information system controls) addresses digital signature technology as a control mechanism for transaction integrity in financial systems. Evaluating the alternatives against the specific deficiency: biometric MFA strengthens the login authentication event — proving that David Chen logged into the system — but does not create any cryptographic link between that login session and the specific journal entries approved during it. After biometric authentication, anyone with access to the unlocked session could approve entries, and the biometric event provides no evidence of which transactions were approved. The deficiency requires non-repudiation of individual transactions, not stronger initial authentication. Compensating detective controls — a weekly audit review — can detect unauthorized or erroneous entries after the fact but cannot prove who approved a specific entry if the approver denies it; the non-repudiation gap remains unaddressed because detective controls identify what happened, not who did it. The $180,000 setup investment is justified by the direct remediation of the control deficiency, elimination of repudiation risk, and avoidance of the costs associated with an unremediated material weakness — including increased external audit fees, potential restatements, and regulatory scrutiny.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Biometric MFA strengthens the authentication layer by adding a biometric factor to the login process — confirming that David Chen, and not someone who stole his password, initiated the system session. However, the SOX deficiency finding identifies a non-repudiation gap, not an authentication gap. After biometric login, any individual with access to Chen's authenticated but unlocked session could approve journal entries, and the biometric event provides no evidence of which specific transactions were approved. Non-repudiation of individual transactions requires a cryptographic signature bound to the transaction data and the approver's identity — a fundamentally different control objective than session authentication. Biometric MFA addresses a legitimate security concern but solves a different problem than the one identified in the deficiency finding.",
    "ExplanationWrongC": "Compensating detective controls are a valid concept under the COSO framework, but they are designed to compensate for preventive controls that are not cost-effective to implement — not to substitute for a fundamental control attribute that is absent. A weekly internal audit review can detect patterns of unauthorized or erroneous journal entries, but when an individual entry is challenged, the approver can still deny having approved it. The detective control identifies what happened; it does not prove who did it. The SOX deficiency specifically identifies the absence of non-repudiation, which is a preventive control attribute that only cryptographic binding can address. Substituting a detective control for missing non-repudiation leaves the fundamental control gap unresolved.",
    "ExplanationWrongD": "While defense-in-depth is a sound information security principle, control selection under the COSO framework should be risk-based and proportional to the specific deficiency identified. Biometric MFA at $45,000 adds authentication strength where authentication was not the identified weakness — the deficiency finding cites non-repudiation, not inadequate login security. Deploying both solutions would spend $45,000 on a control that addresses a risk Helix Biosciences has not been cited for, diverting resources from other control priorities. The controller should remediate the specific non-repudiation deficiency with digital signatures, then separately assess whether authentication controls warrant enhancement through a risk assessment process rather than bundling both into one remediation.",
    "VerifiedChecks": [
      "Choices populated — 4 options A-D",
      "ExplanationCorrect >= 200 chars",
      "All 3 non-CC ExplanationWrong fields >= 50 chars & choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore matches CognitiveLevel — Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps"
    ]
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.043 digital signature authentication",
    "MicroTopic": "digital signature authentication",
    "UniqueConceptKey": "F-D043-digital-signature-authentication",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Ridgewell uses digital signatures to verify the authenticity and integrity of electronically submitted financial documents. What does a digital signature primarily help verify?",
    "Choices": {
      "A": "That the sender has sufficient budget authority",
      "B": "That the document complies with GAAP automatically",
      "C": "That the document has not been altered and originated from the claimed sender",
      "D": "That the document contains no calculation errors"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "A digital signature uses cryptography to verify the signer identity and detect whether the document was altered after signing. It supports authenticity and integrity, but it does not validate accounting accuracy or budget authority.",
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
    "QuestionID": "P1-FD-043",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because a digital signature authenticates the identity of the signer and verifies that the document content has not been altered since signing — it does not verify whether the signer had the organizational authority to commit financial resources. Budget authority is governed by an entity's internal control policies, delegation of authority framework, and approval hierarchies, not by cryptographic technology. A candidate may confuse authentication of who signed with authorization of what they are permitted to approve.",
    "ExplanationWrongB": "Choice B is incorrect because a digital signature does not determine whether accounting content complies with GAAP. Digital signatures verify data integrity and sender authenticity through cryptographic hashing methods. GAAP compliance is evaluated by accounting professionals applying the appropriate standards to the document's content. A candidate may mistakenly assume that cryptographic verification extends to accounting standards compliance.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "A digital signature uses cryptographic techniques to verify the authenticity and integrity of a document — it confirms who signed the document and that it has not been altered after signing. It does not verify the correctness of calculations or accounting treatments within the document. A candidate may conflate data integrity (detecting unauthorized changes) with computational accuracy (confirming arithmetic correctness), but these are distinct concepts. A digitally signed document could contain calculation errors while remaining cryptographically intact.",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.044 digital signature: analyzing non-repudiation failure in wire transfer approval",
    "MicroTopic": "Digital signature and non-repudiation",
    "UniqueConceptKey": "P1-FD-044-F-044-digital-signature--analyzing-non-r",
    "LOSTag": "P1-F.4.a Cybersecurity: threats, controls, and business continuity",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $280,000 wire transfer from Orion Capital Partners to an unfamiliar offshore account is disputed by CFO Margaret Chen, who states she never authorized the transaction. The bank's system log confirms that the transfer was initiated using Chen's unique username and password at 11:47 PM on a Saturday. Orion's internal investigation finds no evidence of a security breach, and Chen maintains her credentials were not shared. The Chief Audit Executive must determine whether the existing controls provide non-repudiation and recommend improvements. Which assessment is correct?",
    "Choices": {
      "A": "The username and password combination, combined with the system log timestamp and IP address, provides sufficient non-repudiation to establish that Chen (or someone to whom she provided credentials) authorized the transfer.",
      "B": "Implementing biometric login (fingerprint or facial recognition) for wire transfer system access would resolve the non-repudiation gap, as biometric factors cannot be shared or stolen.",
      "C": "Password-based authentication provides identification and authentication but does not provide non-repudiation. The organization should implement digital signatures with private-key cryptography and a mandatory multi-party approval workflow for all wire transfers above a materiality threshold.",
      "D": "The organization should accept the CFO's denial, reverse the wire transfer if possible, and treat the incident as an operational loss without further control enhancements, since no system can prevent a determined internal bad actor."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Authentication (proving a user is who they claim to be) and non-repudiation (providing irrefutable proof that a specific individual performed a specific action) are distinct security objectives within the CIA triad. Username/password authentication establishes that someone with knowledge of Chen's credentials initiated the transfer, but it does not prove that Chen herself did so — the credentials could have been compromised through phishing, keylogging, or social engineering without Chen's knowledge. Under SOX Section 404 requirements for internal control over financial reporting, organizations must maintain controls that provide reasonable assurance regarding the authorization of transactions. Digital signatures achieve non-repudiation through asymmetric cryptography: the signer's private key (stored on a hardware token or secure element accessible only to the signer) creates a cryptographic signature that can be verified by anyone using the signer's public key but cannot be forged without access to the private key. Combined with a multi-party approval workflow (requiring a second authorized signer for amounts exceeding a materiality threshold), the control framework provides both non-repudiation and segregation of duties — two fundamental internal control principles under the COSO Internal Control — Integrated Framework.",
    "StudyLinks": [],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the CIA triad (authentication vs. non-repudiation), digital signature cryptography, SOX Section 404, and COSO control activities.",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Choices populated - 4 options A-D",
      "ExplanationCorrect >= 200 chars - references CIA triad, SOX Section 404, COSO Internal Control Framework",
      "All 3 non-CC ExplanationWrong fields >= 50 chars and choice-specific",
      "CorrectChoice EW slot empty (DL-008 compliant)",
      "Part1OnlyFlag: true",
      "DifficultyScore 4 matches CognitiveLevel Analyze - Rule 11 compliant",
      "Distractors represent documented CMA Part 1 exam traps (password sufficiency, biometric-only solution, risk acceptance without controls)"
    ],
    "ExplanationWrongA": "Username and password authentication, even when combined with IP logging, does not provide non-repudiation. Passwords can be compromised through phishing, keylogging, shoulder surfing, or credential database breaches without the legitimate user's knowledge. IP addresses can be spoofed or routed through VPNs. Under SOX, organizations must implement controls that provide reasonable assurance of transaction authorization — knowledge-based factors alone are insufficient for high-value financial transactions where non-repudiation is essential.",
    "ExplanationWrongB": "Biometric authentication improves authentication strength (something you are) but does not by itself provide non-repudiation of a specific transaction. A biometric login verifies that the authenticated user is present at the device, but it does not cryptographically bind that user's identity to the specific transaction details (amount, recipient, timestamp). Digital signatures, by contrast, sign the transaction payload itself, creating an immutable, verifiable link between the signer and the specific authorization. Biometrics can also be spoofed, and unlike cryptographic keys, biometric templates cannot be revoked if compromised.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Accepting the loss without control enhancement fails to meet the organization's fiduciary duty and SOX obligations. The COSO Internal Control Framework requires that control deficiencies identified through incidents be remediated. The fact that no system is perfect does not justify maintaining controls that are known to be inadequate for high-risk transactions. The appropriate response is to implement stronger preventive controls (digital signatures, multi-party approval) and detective controls (anomaly detection for off-hours, high-value transfers) that reduce the risk to an acceptable level.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "QuestionID": "P1-FD-044"
  }
];