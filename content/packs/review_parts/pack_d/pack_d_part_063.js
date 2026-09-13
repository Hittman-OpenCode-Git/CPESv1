var MCQ_BANK_D_PART_63 = [
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.010 business intelligence self service reporting",
    "MicroTopic": "business intelligence self service reporting",
    "UniqueConceptKey": "F-D010-business-intelligence-self-service-reporting",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F3",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniperfield enables business users to build their own reports and analyses from a governed data source without relying solely on IT. What is this capability called?",
    "Choices": {
      "A": "Robotic process automation",
      "B": "Self-service business intelligence",
      "C": "Data lineage tracing",
      "D": "Blockchain validation"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Self-service business intelligence allows business users to create their own reports and analyses directly from governed data sources, reducing dependence on IT for every request.",
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
    "QuestionID": "P1-FD-010",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A is incorrect. Robotic process automation (RPA) automates repetitive, rule-based manual tasks — such as copying data between screens, processing invoices, or reconciling entries — rather than enabling users to build reports and analyses. RPA follows pre-defined scripts and workflows; it does not provide a governed data access layer, visualization tools, or ad hoc query capabilities. A candidate may confuse automation of data entry processes with end-user reporting empowerment. Self-service BI platforms provide business users with direct access to curated data sources, drag-and-drop visualization tools, and the ability to create custom reports and dashboards without writing code or relying on IT.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C is incorrect. Data lineage tracing documents the origin, movement, and transformation of data as it flows through systems — it is a data governance and audit capability, not a report-building function. Data lineage answers questions such as where a particular data element came from, what transformations were applied, and who modified it. A candidate may associate data-related terminology with reporting capabilities, but data lineage tools do not provide dashboards, visualizations, or self-service analytics. Self-service BI platforms build reports and analyses on top of governed data; data lineage tracks the provenance of that data but does not itself empower business users to create reports without IT support.",
    "ExplanationWrongD": "Option D is incorrect. Blockchain is a decentralized, distributed ledger technology that provides tamper-resistant, immutable transaction records through cryptographic verification and consensus mechanisms. It has no relationship to business intelligence, reporting, or data analysis capabilities. A candidate may select this option by confusing emerging technology categories — blockchain's value proposition centers on trustless transaction recording and smart contract execution, not on enabling business users to build reports and dashboards. Self-service BI provides governed data access, visualization, and analytics capabilities that empower business users to answer questions independently without IT intervention.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "upgrade_note": "S899 Phase 1 — Evaluate replacement for archived P1-FD-010 (DL-012 rotation clone)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.011 cybersecurity — data encryption strategy evaluation after a breach",
    "MicroTopic": "Cybersecurity — encryption at rest and in transit — key management",
    "UniqueConceptKey": "F-D011-encryption-post-breach-evaluation",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Valebrook Financial suffered a data breach: an attacker accessed a database containing 180,000 customer records with encrypted credit card numbers. The post-incident investigation found: (1) The database used AES-256-GCM encryption with keys stored in a configuration file on a shared network drive. (2) The attacker obtained the encryption keys from a backup of the configuration file. (3) The database server and the key storage were on the same network segment with no network segmentation. (4) The incident response team recommends rotating all encryption keys and moving the key storage to a hardware security module (HSM). The CFO asks: 'Our data was encrypted. How was the attacker able to read it, and is the incident response team's recommendation sufficient?'",
    "Choices": {
      "A": "The data was hashed, not encrypted — hashing is reversible if the attacker obtains the salt value; the incident response team should recommend migrating from hashing to AES-256 encryption with proper key management",
      "B": "The encryption was cryptographically sound but the key management failed — the attacker obtained the keys from a weakly protected backup; the response team's HSM recommendation partially addresses the storage but does not address the root cause of hardcoded keys; the remediation should include moving keys from configuration files to environment variables managed by a secrets management service",
      "C": "The encryption was cryptographically sound but the key length was insufficient for financial data — AES-256 should be upgraded to AES-512; the incident response team's HSM recommendation is appropriate and sufficient because HSMs provide hardware-based key protection that would have prevented the backup from containing usable key material",
      "D": "The encryption was cryptographically sound but the key management architecture failed in multiple dimensions; the incident response team's HSM recommendation is necessary but insufficient — it addresses key storage but does not address the lack of network segmentation, the absence of key access auditing, and the failure to apply the principle that encryption keys should never be stored alongside the data they protect"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "AES-256-GCM is a cryptographically sound algorithm — the encryption itself was not broken. The breach resulted from a complete failure of key management architecture: (1) The encryption keys and the encrypted data were stored on the same network segment, directly violating the security principle that keys should be stored separately from the data they protect with independent access controls. (2) The keys were in a configuration file on a shared network drive — a file accessible to anyone with network access, with no key-specific access controls, auditing, or monitoring. (3) The backup of the configuration file created a second unprotected copy of the keys. The incident response team's HSM recommendation addresses key storage (preventing future backup-based key extraction) but is incomplete. A comprehensive remediation requires: (a) an HSM or key management service for key storage; (b) network segmentation separating the key management infrastructure from the database tier; (c) key access auditing that would have detected the attacker's access to the key file; (d) key rotation following the breach; and (e) applying the principle that encryption keys are the most sensitive asset in a cryptosystem and must be protected with controls proportionate to the data they protect.",
    "StudyLinks": [
      {
        "label": "NIST SP 800-57 — Recommendation for Key Management",
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
    "QuestionID": "P1-FD-011",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because segregation of duties is an internal control concept that divides transaction authorization, custody, and record-keeping responsibilities among different individuals to prevent fraud and errors. While essential for financial controls under the COSO framework, it does not directly address the confidentiality of data during storage or transmission. Encryption is the primary technical safeguard for this objective. A candidate may select this by conflating general internal controls with data security objectives.",
    "ExplanationWrongB": "Availability focuses on keeping systems accessible; encryption protects readability of data more directly than uptime.",
    "ExplanationWrongC": "AES-256-GCM is a widely accepted, cryptographically strong algorithm — the key length of 256 bits is more than sufficient for financial data. The attack vector described in the post-incident investigation identifies multiple key management failures (unencrypted key storage on the same server, a single hardcoded key shared across environments, no key rotation policy), not a cryptographic algorithm weakness. A candidate may assume any breach involving encryption indicates insufficient key strength, but the investigation evidence points to comprehensive key management architecture failure, not cryptographic algorithm inadequacy.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.012 encryption — evaluating encryption at rest vs. in transit for cloud-hosted financial data",
    "MicroTopic": "Encryption at-rest vs. in-transit defense-in-depth",
    "UniqueConceptKey": "F-D012-encryption-rest-vs-transit-defense-in-depth",
    "LOSTag": "P1-F.3 Data Governance",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Peregrine Manufacturing's controller, James Asante, is leading the migration of the company's general ledger, fixed asset subledger, and financial consolidation modules to a cloud-hosted ERP platform. The IT team has configured TLS 1.3 encryption for all data in transit between on-premises workstations and the cloud environment, and the cloud provider's network firewall policies restrict inbound traffic to authenticated corporate IP ranges. However, the IT director questions whether enabling AES-256 encryption at rest for the database files is necessary, arguing that financial data behind cloud provider firewalls and already encrypted during transmission does not present an additional attack surface. Asante must evaluate this claim against the company's SOX Section 404 internal control requirements. Under a defense-in-depth model for SOX-compliant financial data, which analysis is correct?",
    "Choices": {
      "A": "At-rest encryption is unnecessary because cloud provider firewalls and TLS 1.3 already protect financial data from external threats. Adding AES-256 at rest is redundant, increases encryption key management complexity, and introduces decryption latency during month-end close when the GL processes large journal entry batches — without meaningfully reducing residual risk.",
      "B": "Both encryption at rest and in transit are necessary under a defense-in-depth model. Firewalls are perimeter controls that protect network boundaries but do not protect data at rest from insider threats — such as a rogue cloud administrator with database access, a compromised privileged credential, or a misconfigured storage bucket that exposes database backup files to the public internet. SOX Section 404 requires controls that protect financial data at both the transmission and storage layers because a single control failure at either layer could result in unauthorized access to general ledger and consolidation data.",
      "C": "At-rest encryption alone is sufficient — if database files containing the general ledger are encrypted with AES-256, TLS 1.3 becomes redundant because data intercepted during transmission would be unreadable without the database-level decryption keys. The company can eliminate TLS 1.3 and reduce network overhead without reducing the security posture.",
      "D": "Encryption at rest is the cloud provider's responsibility under the shared responsibility model. The controller's SOX obligation is satisfied by confirming that the provider's SOC 2 Type II report includes encryption controls and is current and unqualified. Independent verification of encryption configuration would duplicate the external auditor's work."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the defense-in-depth principle — a foundational concept in both the NIST Cybersecurity Framework and COSO's internal control guidance for information security — financial data protection must employ multiple, independent layers of control so that the failure of any single control does not result in unauthorized access. Firewalls are network perimeter controls: they restrict which IP addresses can reach the cloud environment but provide zero protection against threats that originate from within the trusted network or from compromised credentials. TLS 1.3 protects data in transit between endpoints: it ensures that packets intercepted on the network are encrypted. But neither control protects the general ledger database files at rest on the cloud provider's storage infrastructure. A rogue cloud administrator with legitimate database credentials, a misconfigured S3 bucket or Azure Blob container that exposes backup files publicly, or a storage-level vulnerability could all bypass both the firewall and the TLS 1.3 protections. AES-256 encryption at rest protects against these storage-layer threats specifically, creating the second independent control layer that defense-in-depth requires. For SOX Section 404 compliance, management must demonstrate that controls over financial reporting systems are designed to address risks at multiple layers: access to financial data during transmission AND access to financial data at the storage layer. A control environment that protects only data in motion but leaves data at rest unencrypted is a single-layer defense that would not withstand scrutiny under a PCAOB audit, because the failure of any intermediary network control or credential compromise would expose the general ledger and consolidation data directly. The correct conclusion is that both controls are necessary, not redundant: they protect against different threat vectors at different layers of the technology stack.",
    "StudyLinks": [
      {
        "label": "NIST Cybersecurity Framework — Protect Function (Data Security PR.DS)",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F — Technology and Analytics",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-012",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly treats defense-in-depth layering as if the presence of two controls (firewall and TLS 1.3) eliminates the need for a third control (encryption at rest) because it assesses the residual risk from an external-threat-only perspective. This fails to account for insider threats, credential compromise, and storage-layer misconfigurations — all of which bypass the firewall and occur after TLS termination. Under the NIST CSF, defense-in-depth requires controls at independent layers specifically because different threat vectors defeat different controls. A candidate selecting this option may be evaluating security controls cumulatively rather than recognizing that each control in a layered defense protects against a distinct and independent threat category.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C incorrectly conflates transport-layer encryption (TLS 1.3) with storage-layer encryption (AES-256 at rest) as if they are interchangeable rather than complementary. TLS 1.3 protects data while it traverses the network between the user's workstation and the cloud server; once the data arrives at the server and is written to disk, TLS protection ends — the data exists as unencrypted database files on the storage volume. AES-256 at rest encrypts those stored files, protecting against threats that occur after the data has been received and decrypted from TLS. Furthermore, TLS 1.3 provides authentication of the communicating endpoints, which AES-256 at rest cannot provide. A candidate selecting this option may misunderstand that encryption modes protect data at different stages of its lifecycle and that no single encryption method covers both transmission and storage threats.",
    "ExplanationWrongD": "Option D incorrectly delegates SOX Section 404 responsibility to the cloud provider's SOC 2 audit. Under the shared responsibility model, the cloud provider is responsible for security OF the cloud (physical infrastructure, hypervisor, network), but the customer remains responsible for security IN the cloud — including configuring encryption, managing access controls, and verifying that financial data is protected in accordance with the company's internal control framework. A SOC 2 Type II report attests that the provider's controls operated effectively during the audit period; it does not attest that the customer properly configured those controls for its specific financial data. Furthermore, SOX Section 404 requires management — not the third-party provider — to assess and report on the effectiveness of internal control over financial reporting. A candidate selecting this option may be treating a third-party attestation as a substitute for management's own control assessment responsibility.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.013 data encryption at rest and in transit",
    "MicroTopic": "data encryption at rest and in transit",
    "UniqueConceptKey": "F-D013-data-encryption-at-rest-and-in-transit",
    "LOSTag": "P1-F Technology and analytics",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Mapleton encrypts sensitive financial data both when stored on servers and when transmitted across networks. What security objective does this primarily support?",
    "Choices": {
      "A": "Confidentiality, by protecting data from unauthorized access or interception",
      "B": "Availability, by ensuring systems remain accessible",
      "C": "Data governance, by defining data ownership",
      "D": "Segregation of duties within the finance department"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Encryption of data at rest and in transit primarily protects confidentiality, preventing unauthorized parties from reading sensitive information even if intercepted or accessed.",
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
    "QuestionID": "P1-FD-013",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Availability ensures systems and data remain accessible when needed by authorized users — encryption protects data readability, not system uptime. A candidate may conflate availability (keeping systems running) with confidentiality (keeping data unreadable to unauthorized parties). The stem describes encrypting data at rest and in transit, which specifically protects confidentiality by ensuring that even if data is intercepted or accessed, it cannot be read without the decryption key.",
    "ExplanationWrongC": "Choice C is incorrect because data governance establishes policies, standards, and accountability for data management across the organization. While governance may require encryption, the direct security objective served by encryption is confidentiality — preventing unauthorized disclosure — not the definition of data ownership or stewardship responsibilities.",
    "ExplanationWrongD": "Choice D is incorrect because segregation of duties is an internal control principle that divides responsibilities to prevent fraud and error within business processes. Encryption is a technical safeguard operating at the data layer, addressing confidentiality rather than procedural controls over human activities.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "upgrade_note": "S58 Phase 6 — upgraded from DL-012 rotation clone (content preserved, difficulty/cognitive recalibrated for Technology & Analytics domain)"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.014 encryption — key management trade-offs in financial systems",
    "MicroTopic": "Centralized vs. decentralized encryption key management",
    "UniqueConceptKey": "F-D014-encryption-key-management-centralized-vs-decentralized",
    "LOSTag": "P1-F.3 Data Governance",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Financial Services manages 47 separate encryption keys across its financial application landscape — separate keys for the general ledger database, accounts payable transaction logs, payroll master files, treasury workstation, budgeting system, and 42 other applications. Each application owner generates, rotates, and stores keys independently, with no centralized inventory of which keys exist, when they were last rotated, or who has access to them. The CISO, Priya Nair, proposes deploying a centralized hardware security module (HSM) to manage all 47 keys, but the application owners resist, citing integration complexity and concerns that HSM latency will slow end-of-quarter financial close processes when multiple applications simultaneously decrypt large data volumes. Nair must analyze the control deficiencies created by decentralized key management and recommend an approach that balances SOX compliance with operational feasibility. Under SOX and NIST key management standards, which analysis is correct?",
    "Choices": {
      "A": "Maintain the decentralized model because each application owner best understands their own system's key lifecycle requirements. Centralization would create a single point of failure — if the HSM experiences an outage, all 47 financial applications would be unable to decrypt data simultaneously, potentially delaying SEC filings. The current model distributes risk across independent key stores.",
      "B": "Deploy the HSM immediately and migrate 47 keys within the current quarter. The control deficiencies of the decentralized model — inability to prove key rotation to auditors, no centralized access logging, and no mechanism to revoke a compromised application owner's keys across systems — are SOX-significant deficiencies that justify operational disruption. Integration complexity is secondary to compliance.",
      "C": "Adopt centralized key management via HSM with a phased migration that prioritizes SOX-scoped financial reporting applications (GL, consolidation, AP, AR, treasury) first. This balances the control requirements — centralized key generation with FIPS 140-2 validated cryptography, automated key rotation logging, and role-based access auditing — with operational feasibility by spreading migration over three quarters, allowing application teams time to integrate the HSM API without disrupting financial close cycles. Non-SOX applications can migrate in subsequent phases.",
      "D": "Outsource encryption key management to the cloud provider's native key management service rather than deploying an on-premises HSM. This resolves the integration complexity that application owners cite — cloud-native KMS integrates with common financial applications via standard APIs — while providing the centralized visibility, access logging, and automated rotation that the CISO requires for SOX compliance."
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under NIST SP 800-57 (Recommendation for Key Management) and the SOX Section 404 requirement for effective controls over financial reporting systems, encryption key management must provide three capabilities that a decentralized model inherently lacks: (1) provable key inventory — the organization must know how many encryption keys protect financial data, when each was last rotated, and under what cryptographic standard each was generated; (2) centralized access auditability — every administrative action on a key (creation, rotation, revocation, access grant) must be logged to a tamper-evident audit trail that is independent of the application owner who performs the action; and (3) enforceable key lifecycle policy — key rotation intervals, cryptographic algorithm standards, and key length requirements must be enforced by the key management infrastructure, not by the compliance diligence of 47 individual application owners. The current decentralized model has none of these capabilities: no one can produce an inventory of all 47 keys, access to keys is logged only within each application's own logs (if at all), and key rotation depends on each owner remembering to perform it. These are control deficiencies under SOX — not necessarily material weaknesses, because compensating detective controls may exist, but significant enough that the external auditor would likely include them in a management letter. However, the CISO's recommended response must balance compliance with operational reality. A forced migration of all 47 applications in one quarter would almost certainly disrupt financial close processes and risk delayed filings — a self-inflicted control failure worse than the deficiency it addresses. The phased approach recognizes that financial reporting integrity is the primary SOX concern: migrating the 5-7 applications that directly feed the general ledger, consolidation system, and SEC disclosures first addresses the highest-risk keys. Non-SOX applications (budgeting, HR analytics, planning tools) can migrate later without affecting the current-year control assessment over financial reporting. This is a practical application of risk-based control design — applying the strongest controls to the highest-risk assets first and accepting a transition period for lower-risk assets.",
    "StudyLinks": [
      {
        "label": "NIST SP 800-57 — Recommendation for Key Management",
        "url": "https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev/5/final"
      },
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F — Technology and Analytics",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-FD-014",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly treats the decentralization of risk as a security benefit when in fact it creates a control assurance problem. A single point of failure concern is valid for availability, but HSMs are deployed in high-availability clusters specifically to address this — the CISO would deploy redundant HSMs, not a single device. More critically, this option ignores the SOX control deficiency: 47 independent key stores mean that no single person can attest to the completeness of key rotation, the adequacy of cryptographic standards, or the integrity of access controls. When an auditor asks 'Have all encryption keys protecting financial data been rotated within the last 12 months?' the organization cannot answer that question without polling 47 application owners individually — each of whom may respond based on memory rather than system-enforced evidence. A candidate selecting this option may be treating operational convenience (each team manages its own keys) as an acceptable control when it is precisely the absence of centralized governance that creates the SOX deficiency.",
    "ExplanationWrongB": "Option B correctly identifies the control deficiencies in the decentralized model but proposes a remediation timeline that is operationally reckless. Migrating 47 applications to an HSM in a single quarter — particularly applications that perform bulk decryption during financial close — creates a high probability of integration failures, key synchronization errors, and decryption latency that could delay quarter-end reporting. A forced migration that causes a late SEC filing is a self-inflicted control failure. The NIST Risk Management Framework and COSO both direct organizations to prioritize remediation based on risk — addressing the highest-risk keys first while managing transition risk is the correct approach. A candidate selecting this option may be treating SOX compliance as if it requires immediate remediation of every deficiency regardless of operational impact, when in fact SOX requires reasonable assurance — not perfect assurance achieved through reckless implementation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D correctly identifies that cloud-native key management services (AWS KMS, Azure Key Vault) can provide centralized visibility and automated rotation, but it presents outsourcing as if it eliminates all the integration complexity. In practice, each of the 47 applications would still need to be modified to call the cloud KMS API for key retrieval instead of reading keys from a local file or environment variable — the same integration work as an on-premises HSM. Additionally, cloud KMS introduces a new dependency: if the financial applications run on-premises, every decryption operation requires a network round-trip to the cloud provider, which introduces latency concerns during financial close that are equivalent to or worse than those of an on-premises HSM. More critically, the choice between on-premises HSM and cloud KMS does not resolve the core governance question — both are centralized key management models, and the correct answer is the governance approach (phased migration, risk-prioritized), not the specific technology platform. A candidate selecting this option may be treating a technology vendor choice as a substitute for a governance decision.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.015 cybersecurity — encryption strategy cloud migration",
    "MicroTopic": "Cybersecurity encryption strategy cloud migration",
    "UniqueConceptKey": "F-D015-cybersecurity-encryption-strategy-cloud-migration",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Brennan and Holt LLP is a 140-attorney law firm specializing in corporate litigation. The firm migrated its document management system to a cloud provider 14 months ago. IT Director Marcus Chen negotiated a key management arrangement where the cloud provider encrypts all data at rest using AES-256 and all data in transit using TLS 1.3, but the law firm — not the provider — generates, stores, and manages all encryption keys within the firm's on-premises hardware security module (HSM). During a client audit, the general counsel of a Fortune 500 client asks: 'Can the cloud provider's system administrators access our unencrypted documents, and what is the remaining confidentiality risk given your key management model?'",
    "Choices": {
      "A": "The cloud provider has full access to unencrypted documents because it manages the physical infrastructure and can bypass encryption at the hypervisor level. The remaining risk is that the provider's employees could access client data during routine maintenance.",
      "B": "The cloud provider cannot access unencrypted documents because it lacks the decryption keys, which the firm controls exclusively. The remaining risk is an insider threat at the law firm: anyone with access to the HSM or key management procedures could decrypt client data.",
      "C": "Neither the law firm nor the cloud provider can access unencrypted documents because AES-256 encryption is computationally irreversible once applied. The remaining risk is zero: the encryption provides absolute protection.",
      "D": "Both the law firm and the cloud provider have equal access to unencrypted documents because the provider holds the ciphertext and the firm holds the keys, making the protection symmetrical. The remaining risk is that an attacker who compromises either party gains full access."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The cloud provider cannot access unencrypted client documents because the firm exclusively holds the decryption keys under a customer-managed key model. AES-256 encryption without the corresponding cryptographic key is computationally infeasible to reverse with current technology. The provider's system administrators see only encrypted data blobs; they cannot read the underlying documents. Under the shared responsibility model, the cloud provider secures the infrastructure but key custody determines who can actually decrypt the data. Per NIST SP 800-57 guidance on key management, the security of encrypted data is only as strong as the controls protecting the cryptographic keys. The real remaining confidentiality risk shifts to Brennan and Holt itself: anyone with access to the on-premises HSM or the key management procedures can decrypt all client documents. This means the firm must implement strict access controls, key rotation, audit logging, and segregation of duties around HSM access to mitigate the insider threat. If a disgruntled IT administrator or compromised credential at the firm provides key access, the cloud provider's encryption provides no additional protection. The client should be informed that the key management model properly excludes the cloud provider from the trust boundary for decryption, but that the firm's internal key security controls are now the single point of confidentiality failure.",
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
    "QuestionID": "P1-FD-015",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because hypervisor-level access to the physical infrastructure does not grant the ability to reverse AES-256 encryption without the corresponding cryptographic keys. In the customer-managed key model described, the provider only holds ciphertext: encrypted data blobs that are mathematically useless without decryption keys. While hypervisor access is a valid concern in other cloud security models (such as those where the provider manages keys), the hold-your-own-key arrangement specifically addresses this risk by ensuring that even privileged cloud administrators cannot read plaintext. Physical infrastructure control and cryptographic access are separate security domains. A candidate selecting this option may be conflating infrastructure access with the ability to read encrypted data: managing the server does not confer the ability to decrypt data encrypted with a key the server operator does not possess.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C is incorrect on two counts. First, AES-256 encryption is not computationally irreversible: decryption with the correct key is by design fast and computationally trivial. The security of AES rests on the infeasibility of deriving the key through brute-force search given current computing capabilities, not on any mathematical irreversibility of the encryption function. Second, the law firm absolutely can access unencrypted documents because it controls the decryption keys; that is the intended design. Without the ability to decrypt, the firm would be unable to retrieve its own client documents, defeating the purpose of the document management system. A candidate selecting this option may confuse symmetric encryption algorithms like AES (designed to be reversible with the correct key) with one-way cryptographic hash functions like SHA-256 (designed to be irreversible).",
    "ExplanationWrongD": "Choice D is incorrect because access is not symmetrical between the law firm and the cloud provider. The firm holds the decryption keys and can read any document at will; the cloud provider holds only ciphertext and cannot read the documents. This is an asymmetric protection model by design: the firm retains exclusive control over decryption. The scenario correctly identifies that an attacker who compromises the firm's key management gains access, but it mischaracterizes the relationship as symmetrical. If an attacker compromises only the cloud provider (but not the firm's HSM), the attacker gains ciphertext only: zero access to unencrypted documents. A candidate selecting this option may be applying a both-sides-hold-something-therefore-they-are-equal heuristic rather than analyzing the cryptographic reality that key possession determines access.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate"
  },
  {
    "Part": 1,
    "Section": "F",
    "SectionName": "Technology and Analytics",
    "Topic": "F.016 cloud saas subscription model",
    "MicroTopic": "cloud saas subscription model",
    "UniqueConceptKey": "F-D016-cloud-saas-subscription-model",
    "LOSTag": "P1-F Technology and analytics",
    "primaryTheory": "F5",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Palisade subscribes to a cloud-based accounting application that the vendor hosts, maintains, and updates. What cloud service model is this?",
    "Choices": {
      "A": "Infrastructure as a Service (IaaS)",
      "B": "On-premises licensed software",
      "C": "Platform as a Service (PaaS)",
      "D": "Software as a Service (SaaS)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Software as a Service delivers a complete, vendor-hosted and vendor-maintained application to customers, typically via subscription, without the customer managing underlying infrastructure.",
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
    "QuestionID": "P1-FD-016",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Choice A is incorrect because Infrastructure as a Service provides virtualized computing resources such as servers, storage, and networking on a pay-as-you-go basis — it delivers raw infrastructure, not a finished, ready-to-use accounting application. The stem describes subscribing to an application that the vendor hosts, maintains, and updates, which is the defining characteristic of the Software as a Service model. A candidate may select this by confusing the infrastructure layer with the application layer of cloud computing.",
    "ExplanationWrongB": "Choice B is incorrect because on-premises licensed software is installed and maintained on the company's own hardware by its own IT staff. In the stem, the vendor hosts, maintains, and updates the application — this is the defining characteristic of a cloud service model, not on-premises deployment. A candidate may confuse the deployment location of the software.",
    "ExplanationWrongC": "Choice C is incorrect because Platform as a Service provides a development and runtime environment for building custom applications, not a finished accounting application ready for immediate use. The stem describes using a complete application, which distinguishes SaaS from PaaS. A candidate may confuse the cloud service tiers.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand"
  }
];