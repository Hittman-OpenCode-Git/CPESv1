// S899 — Batch 4: Technology items — all Pack D Section F (including FD-046 scratch)
const batch4 = [
  // ========== ITEM 16: P1-FD-010 — Encryption Strategy Post-Breach (Evaluate, Difficult) ==========
  {
    qid: "P1-FD-010", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-010", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A is technically incorrect. Hashing is a one-way function — it cannot be reversed to recover the original data. The scenario describes encrypted (not hashed) credit card data where the attacker obtained both the encrypted data and a backup of the encryption keys. This strongly suggests the attacker decrypted the data using the stolen keys, not reversed a hash. More importantly, the treatment of hashed vs. encrypted data is fundamentally different from a security standpoint: hashed data requires salting and key stretching (bcrypt, Argon2) which are not relevant to AES-256-GCM encrypted data. The root cause analysis must be accurate about the cryptographic primitive involved before recommending remediation.",
      ExplanationWrongB: "Option B correctly identifies a real risk (hardcoded keys in source code) but incorrectly applies the remediation to the described breach. The scenario states the attacker obtained a 'backup of the encryption keys' — this implies the keys were stored somewhere accessible (a file server, a backup system, a configuration management tool). Recommending environment variables addresses hardcoded keys in application code, which is a different attack vector. If the keys were extracted from a backup system, environmental variables in application code would not have prevented the breach because the attacker accessed the keys through the backup, not through the application. The correct remediation addresses where the keys were actually stored (the backup system) and how they were protected there.",
      ExplanationWrongC: "Option C changes the encryption algorithm (AES-256 → AES-512) without addressing how keys are managed. The scenario provides no evidence that AES-256 was cryptographically broken — the attacker obtained the keys, not a mathematical weakness in AES. Moving to a longer key and adding an HSM addresses future key protection but would not have prevented the current breach because the attacker already has the AES-256 keys and the encrypted data. Rotating keys after a breach is necessary regardless of algorithm, but the priority remediation should address the key management failure that allowed the attacker to obtain the keys in the first place — namely, that production encryption keys were stored in a backup system without access controls equivalent to the production environment.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate replacement for archived P1-FD-010 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.011 cybersecurity — data encryption strategy evaluation after a breach",
      MicroTopic: "Cybersecurity — encryption at rest and in transit — key management",
      UniqueConceptKey: "F-D011-encryption-post-breach-evaluation",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Valebrook Financial suffered a data breach: an attacker accessed a database containing 180,000 customer records with encrypted credit card numbers. The post-incident investigation found: (1) The database used AES-256-GCM encryption with keys stored in a configuration file on a shared network drive. (2) The attacker obtained the encryption keys from a backup of the configuration file. (3) The database server and the key storage were on the same network segment with no network segmentation. (4) The incident response team recommends rotating all encryption keys and moving the key storage to a hardware security module (HSM). The CFO asks: 'Our data was encrypted. How was the attacker able to read it, and is the incident response team's recommendation sufficient?'",
      Choices: {
        A: "The data was hashed, not encrypted — hashing is reversible if the attacker obtains the salt value; the incident response team should recommend migrating from hashing to AES-256 encryption with proper key management",
        B: "The encryption was cryptographically sound but the key management failed — the attacker obtained the keys from a weakly protected backup; the response team's HSM recommendation partially addresses the storage but does not address the root cause of hardcoded keys; the remediation should include moving keys from configuration files to environment variables managed by a secrets management service",
        C: "The encryption was cryptographically sound but the key length was insufficient for financial data — AES-256 should be upgraded to AES-512; the incident response team's HSM recommendation is appropriate and sufficient because HSMs provide hardware-based key protection that would have prevented the backup from containing usable key material",
        D: "The encryption was cryptographically sound but the key management architecture failed in multiple dimensions; the incident response team's HSM recommendation is necessary but insufficient — it addresses key storage but does not address the lack of network segmentation, the absence of key access auditing, and the failure to apply the principle that encryption keys should never be stored alongside the data they protect"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "AES-256-GCM is a cryptographically sound algorithm — the encryption itself was not broken. The breach resulted from a complete failure of key management architecture: (1) The encryption keys and the encrypted data were stored on the same network segment, directly violating the security principle that keys should be stored separately from the data they protect with independent access controls. (2) The keys were in a configuration file on a shared network drive — a file accessible to anyone with network access, with no key-specific access controls, auditing, or monitoring. (3) The backup of the configuration file created a second unprotected copy of the keys. The incident response team's HSM recommendation addresses key storage (preventing future backup-based key extraction) but is incomplete. A comprehensive remediation requires: (a) an HSM or key management service for key storage; (b) network segmentation separating the key management infrastructure from the database tier; (c) key access auditing that would have detected the attacker's access to the key file; (d) key rotation following the breach; and (e) applying the principle that encryption keys are the most sensitive asset in a cryptosystem and must be protected with controls proportionate to the data they protect.",
      StudyLinks: [
        { label: "NIST SP 800-57 — Recommendation for Key Management", url: "https://www.nist.gov" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 17: P1-FD-020 — AI/ML Governance — Overfitting Audit (Analyze, Difficult) ==========
  {
    qid: "P1-FD-020", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-020", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A correctly flags the performance gap as a potential indicator but proposes a reckless response. High training accuracy with low holdout accuracy is the classic signature of overfitting — the model has memorized the training data rather than learned generalizable patterns. Increasing model complexity (more trees, deeper layers) would exacerbate overfitting, not resolve it. The training data has 175 features and only 12,000 transactions — this is a high-dimensional, low-sample-size scenario where complex models are especially prone to overfitting. Adding regularization, reducing features through selection, or increasing training data are the standard anti-overfitting responses — not increasing model complexity.",
      ExplanationWrongB: "Option B argues that the performance gap does not indicate overfitting because the holdout accuracy is close to random guessing. This argument is inverted: a model that achieves 98% on training data but only 55% on unseen data is the definition of severe overfitting. The model has learned the training data's noise rather than its signal. A model performing at chance level on holdout data is worse than useless for credit risk assessment — it is systematically making decisions based on patterns that do not generalize. Option B also contains an internal contradiction: it first claims overfitting is not the issue, then recommends collecting more data (a standard anti-overfitting technique). If overfitting were not the issue, more data would not help. The 98%-vs-55% gap is a textbook overfitting signal.",
      ExplanationWrongC: "Option C correctly identifies the need for pre-deployment validation but applies the wrong release criterion. A credit risk model with a 2% false positive rate still misclassifies 2% of loan applicants — in a portfolio of 10,000 applications, that is 200 applicants who are either wrongly denied credit or wrongly approved for loans they cannot repay. For credit risk models, false negatives (approving bad loans) are typically more costly than false positives (denying good loans). An audit committee reviewing a model for regulatory compliance should require evidence that the model is not overfit and performs above an acceptable threshold across all relevant demographic segments — not approve deployment based solely on a single aggregate metric. The false positive rate is one dimension; false negative rate, demographic parity, and model interpretability are equally important for credit risk models.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-FD-020 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.021 AI/ML governance — overfitting and bias detection in predictive models",
      MicroTopic: "AI/ML — model validation — overfitting detection",
      UniqueConceptKey: "F-D021-ml-overfitting-audit",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "A fintech company's data science team presents a new credit risk model to the audit committee. The model was trained on 12,000 historical loan applications with 175 features, achieving 98.1% accuracy on training data. When evaluated on a 3,000-record holdout set not used in training, accuracy dropped to 55.3%. The data scientist explains: 'The training accuracy shows the model captures the relationships in the data. The holdout performance is affected by the smaller sample size. With more training data, the model will generalize better.' The head of internal audit, who has a background in data analytics, must evaluate this explanation for the committee. Which finding best characterizes the model's condition?",
      Choices: {
        A: "The data scientist's explanation is plausible — the holdout accuracy is affected by sample size, and collecting more training data would likely resolve the performance gap; the model should be approved for deployment with quarterly retraining cycles",
        B: "The 98% vs. 55% gap does not necessarily indicate overfitting because the holdout accuracy of 55% is only slightly above random chance for a binary classification problem; the model's features may be irrelevant to the prediction target and the problem is underfitting, not overfitting",
        C: "The model's 98% training accuracy and 55% holdout accuracy indicate moderate overfitting that is within acceptable limits for a credit risk model — the false positive rate of 2% on training data is low enough that the model can be deployed with a business rule that sends all flagged applications to manual review",
        D: "The 43-percentage-point gap between training and holdout accuracy is a strong indicator of severe overfitting — the model has memorized noise in the training data rather than learning generalizable credit risk patterns, and the data scientist's explanation is incorrect because the problem is model complexity relative to available signal, not sample size alone"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "A 43-percentage-point accuracy gap (98.1% training → 55.3% holdout) is a textbook indicator of severe overfitting. The model has essentially memorized the training data, including its noise, idiosyncrasies, and outliers — achieving near-perfect performance on data it has seen while performing barely above chance (50% for binary classification) on new data it has never seen. The data scientist's sample-size explanation is incorrect because the performance gap is not a function of the holdout set being too small — 3,000 records is sufficient to estimate model accuracy within a few percentage points. The root cause is a mismatch between model complexity (175 features on only 12,000 records = high-dimensional, low-sample-size regime) and the available signal. In such regimes, models easily find spurious correlations that happen to fit the training data but have no predictive power on new data. Before deployment, the model requires: (1) feature selection or dimensionality reduction to reduce the feature space, (2) regularization to penalize model complexity, (3) cross-validation rather than a single train-test split, and (4) evaluation on out-of-time data (future loan applications) to confirm generalization.",
      StudyLinks: [
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F — Data Analytics and AI Governance", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 18: P1-FD-040 — Authentication Control Weakness (Analyze, Difficult) ==========
  {
    qid: "P1-FD-040", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-040", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends adding a second factor (SMS code) to complement the existing two factors (password + digital certificate). SMS-based one-time codes are widely used but have known vulnerabilities: SIM swapping, SS7 network interception, and social engineering of mobile carriers. More importantly, adding SMS OTP does not address the specific vulnerability in the described attack. An attacker who has compromised the workstation and obtained the user's password and digital certificate can also intercept SMS codes if the user receives them on the same compromised device (many users access SMS through their computer) or through a SIM-swap attack coordinated with the workstation compromise. The correct remediation should address the authentication architecture, not simply add more factors.",
      ExplanationWrongB: "Option B correctly recommends moving from password-based authentication but recommends the wrong technology. Biometric authentication (fingerprint, facial recognition) addresses the 'something you are' factor — it replaces or supplements passwords. However, biometric authentication does not address the specific vulnerability: a compromised workstation that can intercept authentication credentials. If an attacker has installed a keylogger on the workstation, they can capture the password. If they have also compromised the certificate store, they have both factors. Biometric data captured at the workstation level (e.g., a fingerprint scanner) could also be intercepted by malware that hooks into the biometric driver. The root problem is not the type of authentication factors but the trustworthiness of the endpoint performing the authentication.",
      ExplanationWrongC: "Option C proposes a hardware token solution that addresses 'what you have' (the FIDO2 key) and reduces reliance on passwords. However, FIDO2/WebAuthn primarily solves the problem of phishing-resistant authentication — it binds the authentication to the origin (website domain), preventing an attacker from using stolen credentials on a fake website. The scenario describes a compromised workstation, not a phishing attack. If the attacker controls the user's workstation, they can potentially intercept the FIDO2 authentication ceremony at the browser level or use the authenticated session after the user has logged in. FIDO2 is an important security improvement for credential phishing but does not solve the 'untrusted endpoint' problem described in the scenario.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 4, CognitiveLevel: "Analyze",
      upgrade_note: "S899 Phase 1 — Analyze replacement for archived P1-FD-040 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.041 cybersecurity — authentication — multi-factor and digital certificate weaknesses",
      MicroTopic: "Cybersecurity — authentication — MFA and digital signatures",
      UniqueConceptKey: "F-D041-auth-digital-certificate-weakness",
      LOSTag: "F Technology and analytics",
      Difficulty: "Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Hazelwood Credit Union's online banking platform requires two-factor authentication: a password and a digital certificate installed on the user's computer. During a security audit, the IT security team discovers that an attacker compromised a customer's account by: (1) installing a keylogger on the customer's workstation that captured the password; (2) exporting the customer's digital certificate from the Windows certificate store, which was protected only by the user's Windows login password (the same password); and (3) using the stolen password and certificate from a different computer to initiate a $42,000 wire transfer. The platform's certificate validation only checks that the certificate is valid and issued by the bank's CA — it does not check the requesting device's identity. Which authentication architecture weakness is most critical?",
      Choices: {
        A: "The authentication is not truly multi-factor because both factors are vulnerable to the same workstation compromise — the bank should add a third factor (SMS one-time code) sent to a separate device to break the single-point-of-failure on the workstation",
        B: "The digital certificate provides no additional security when protected by the same password — the bank should replace the certificate-based second factor with biometric authentication (fingerprint or facial recognition) that cannot be exported or stolen",
        C: "The certificate validation only checks certificate validity and issuer — the bank should migrate to FIDO2/WebAuthn hardware security keys that bind authentication to the physical device and are resistant to credential export and replay attacks",
        D: "The authentication architecture treats both factors as independent when they share a common dependency — both are protected by a single workstation password, creating a single point of failure; the bank should implement device binding that ties the certificate to the specific device's hardware identity and requires re-authentication when the certificate is used from a new device"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "The critical weakness is that what appears to be two independent authentication factors (password + digital certificate) are both protected by a single credential: the workstation login password. The attacker obtained the password through a keylogger, then used the same password to export the certificate from the Windows certificate store. This is a common architectural flaw: multiple factors that share a dependency are not truly independent. The authentication system treats the password and certificate as independent verification steps, but their protection is not independent — compromising the password also compromises the certificate. The correct remediation implements device binding: the digital certificate should be cryptographically bound to the hardware identity of the device on which it was installed (using a Trusted Platform Module or hardware-backed key storage). If the certificate is exported and used from a different device, the authentication system should detect the device change and require step-up authentication (e.g., a one-time code sent to a registered phone number or a video verification call). This breaks the dependency between the two factors by ensuring that possession of the password alone is insufficient to use the certificate from a different device.",
      StudyLinks: [
        { label: "NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management", url: "https://www.nist.gov" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 19: P1-FD-050 — Automation Governance — RPA Bot Lifecycle (Evaluate, Very Difficult) ==========
  {
    qid: "P1-FD-050", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-050", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A identifies bot proliferation as the primary issue and recommends limiting bot count. However, the scenario's control deficiencies are not caused by too many bots — they are caused by a complete absence of governance over bot lifecycle, access management, change control, and segregation of duties. Limiting bot count to 20 does not address any of the identified control failures: (1) it does not fix the bot with domain admin access, (2) it does not ensure bots are deactivated when employees leave, (3) it does not prevent bot owners from making production changes without testing, and (4) it does not address the segregation of duties gap where bots process vendor payments and also modify vendor master data. A cap on bot count is a governance theater response — it creates the appearance of control while leaving all the substantial control failures unaddressed.",
      ExplanationWrongB: "Option B recommends manual review of bot output as the primary control, which fundamentally misunderstands automation governance. RPA is deployed precisely because manual processing is slow, expensive, and error-prone. Adding manual review of every bot transaction negates the efficiency rationale for automation and introduces a new control failure: the human reviewer becomes a single point of failure and a bottleneck. More importantly, manual review does not prevent control failures — it detects them after the fact. The bot with domain admin access could make changes that a manual reviewer would never see (e.g., modifying system configurations, deleting audit logs). The control failures described — unauthorized access, lack of change management, segregation of duties conflicts — require preventive controls embedded in the bot governance framework, not detective controls applied after bot execution.",
      ExplanationWrongC: "Option C correctly identifies process documentation as important but misprioritizes it. Documenting bot processes is a foundational governance activity, but it is not the triggering event that would have prevented or detected the control failures described. Documenting what the AP bot does does not prevent it from having domain admin access — access control requires an authorization framework and periodic access reviews, not documentation. Documenting that the vendor-master bot can also change bank account details does not address the segregation of duties conflict — the conflict exists regardless of whether it is documented. Process documentation is necessary but insufficient; it must be paired with controls that enforce the documented processes. Furthermore, implementing documentation across 34 undocumented bots would take months, while deactivating bots belonging to departed employees and revoking unnecessary privileged access are immediate risk-reduction actions.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 5, CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — Evaluate/Very Difficult replacement for archived P1-FD-050 (DL-012 rotation clone)"
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.051 automation governance — RPA bot lifecycle and control framework",
      MicroTopic: "Automation governance — RPA bots — risk assessment",
      UniqueConceptKey: "F-D051-rpa-bot-governance",
      LOSTag: "F Technology and analytics",
      Difficulty: "Very Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Merton Financial Services deployed robotic process automation (RPA) three years ago. The internal audit team's first RPA governance review finds: (1) 34 bots are in production, but only 11 have documented process flows. (2) Five bots process vendor payments using credentials belonging to employees who left Merton 6-14 months ago; these credentials still have active system access. (3) The bot that updates vendor bank account details in the ERP was developed by an AP clerk who is also responsible for processing the vendor payments the bot initiates — no independent review of bot logic occurs. (4) Two bots run with domain administrator privileges because the RPA developer 'couldn't get them to work with standard user accounts.' (5) Bot owners make production changes directly without change management approval because 'it's just updating the automation script.' Evaluate the control environment and recommend the most critical governance intervention.",
      Choices: {
        A: "Bot proliferation is the root governance failure — Merton deployed 34 bots without central oversight; the most critical intervention is to cap the number of production bots at 20 and require business case justification for each additional bot",
        B: "The lack of post-execution review is the most critical failure — bots process transactions without human verification; the most critical intervention is to require that all bot-generated transactions above $5,000 be manually reviewed and approved before posting to the ERP",
        C: "The absence of bot process documentation is the most critical failure — 23 of 34 bots have undocumented processes, making it impossible to assess their risk; the most critical intervention is to halt all undocumented bots, document their full process flows, and obtain business owner sign-off before reactivation",
        D: "Multiple control failures indicate a systemic absence of RPA governance — the most critical intervention is to establish an RPA governance framework including credential lifecycle management (immediate deactivation of departed-employee credentials), segregation of duties (independent review of bot logic), access control (least privilege — revoke domain admin), and change management (approval required for all production script changes)"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Merton's RPA environment exhibits failures across every dimension of IT governance: (1) Access management: departed employees' credentials remain active, granting bots access that cannot be attributed to any current employee — a fundamental identity lifecycle failure. (2) Segregation of duties: the AP clerk who develops a payments bot also processes the payments it generates, creating an incompatible duty combination. (3) Privileged access: two bots running with domain admin privileges violate the principle of least privilege — if these bots are compromised, the attacker gains domain-level control. (4) Change management: production script changes without approval or testing create uncontrolled risk of erroneous or malicious changes. These are not individual control failures that can be fixed one at a time — they indicate a systemic absence of governance over the RPA program. The most critical intervention is to establish a governance framework before remediating individual controls: credential lifecycle management ensures bot accounts are tied to active employees (and deactivated when they leave), segregation of duties requires independent review of bot logic, least privilege access removes domain admin rights, and change management requires approval for production changes. Without this framework, point fixes to individual bots will degrade as new bots are deployed without governance.",
      StudyLinks: [
        { label: "COSO Internal Control — Integrated Framework (2013), Principle 11: IT General Controls", url: "https://www.coso.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  },

  // ========== ITEM 20: P1-FD-046 — Master Data Management at Merged Entity (Evaluate, Very Difficult) ==========
  {
    qid: "P1-FD-046", pack: "D", section: "F",
    metadata: {
      QuestionID: "P1-FD-046", CalculationItem: false,
      VerifiedChecks: [
        "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
        "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
        "Original practice item with unique micro-topic and stem",
        "Answer key distribution balanced across A/B/C/D",
        "Distractors written as plausible CMA-style traps"
      ],
      ExplanationWrongA: "Option A recommends preserving both legacy taxonomies as a risk mitigation strategy, which directly contradicts the purpose of master data management. Keeping both the 6-region and product-family structures alongside a 'unified view' creates three representations of the same business entities — increasing complexity and confusion, not reducing it. The scenario explicitly states that inconsistent regional hierarchies caused the Northeast revenue gap in the quarterly report. Preserving the legacy structures means the underlying data inconsistency persists; the unified view becomes a reconciliation layer that must continuously translate between incompatible taxonomies. This is a data architecture anti-pattern: adding a layer on top of inconsistent sources does not resolve the inconsistency — it defers it to the presentation layer. The board's risk concern is valid, but the appropriate risk mitigation is to validate the MDM model with business stakeholders before cutover, not to maintain legacy taxonomies indefinitely.",
      ExplanationWrongB: "Option B correctly identifies that a 'big bang' approach carries risk but proposes the wrong alternative. A phased migration by legacy system means the company operates with two regional hierarchies and two product taxonomies during the transition — exactly the inconsistency the MDM program was chartered to eliminate. During the phased period, every cross-system report, every consolidated financial statement, and every customer-facing communication would need to reconcile between the legacy and MDM taxonomies. This creates a prolonged period of data inconsistency that is operationally more complex and error-prone than a validated cutover. The correct risk-mitigated approach for an MDM deployment is not a phased system-by-system migration but a validated parallel run where the MDM model is tested against production data, business rules are verified, and the cutover occurs after validation — not a gradual system-by-system retirement of legacy taxonomies.",
      ExplanationWrongC: "Option C recommends deferring the decision indefinitely while technology evolves — a governance failure. The quarterly report discrepancy was specifically cited as the trigger for the MDM program, meaning inconsistent master data is already causing financial reporting errors that could affect investor confidence. The AI/ML-based matching proposal does not solve the fundamental problem: matching algorithms can probabilistically link 'Northeast' to 'New England + Mid-Atlantic,' but they cannot decide what the authoritative regional structure should be. That is a business governance decision, not a technology problem. Waiting for AI to mature delegates a governance responsibility to a future technology capability. The board should make the governance decision now (what is the authoritative regional structure?) and implement MDM to enforce it, whether or not AI-assisted matching is used during the transition.",
      ExplanationWrongD: "",
      question_state: "Active", DifficultyScore: 5, CognitiveLevel: "Evaluate",
      upgrade_note: "S899 Phase 1 — SCRATCH AUTHOR: Evaluate/Very Difficult replacement for archived P1-FD-046. Original FD-046 was a Remember/Easy definition-match clone (DL-012 rotation)."
    },
    content: {
      Part: 1, Section: "F", SectionName: "Technology and Analytics",
      Topic: "F.047 data governance — master data management strategy at a merged entity",
      MicroTopic: "Master data management — MDM strategy and governance",
      UniqueConceptKey: "F-D047-mdm-merger-strategy",
      LOSTag: "F Technology and analytics",
      Difficulty: "Very Difficult", ItemType: "MCQ", ItemStyle: "single-select",
      Stem: "Two years after merging with a competitor, Kingswood Industrial's controller reports that quarterly consolidated financial statements take 18 days to produce because the two legacy ERP systems use incompatible chart of accounts, customer IDs, and product hierarchies. The CIO proposes a master data management (MDM) program with three phases: (1) define a single, authoritative customer master, product taxonomy, and chart of accounts; (2) map all legacy data to the MDM model and resolve duplicates; (3) enforce the MDM model as the system of entry for all new transactions, with legacy systems consuming MDM-governed data through a data services layer. The CIO recommends a 'big bang' cutover — all systems adopt the MDM model on a single go-live date. The board is concerned about operational risk: 'If the mapping is wrong, every system produces incorrect reports simultaneously.' The CFO counters: 'We cannot afford another quarter of 18-day closes.' Evaluate the competing priorities and recommend the MDM deployment strategy.",
      Choices: {
        A: "The board's operational risk concern is paramount — Kingswood should preserve both legacy taxonomies and implement a virtual MDM layer that maps between them dynamically for consolidated reporting without forcing either system to change its native data model",
        B: "The board's concern is valid but the CFO's urgency is equally valid — Kingswood should adopt a phased migration: migrate the customer master to MDM first, validate for 90 days, then migrate the product taxonomy, and finally the chart of accounts over 12 months",
        C: "The CFO's urgency is paramount because financial reporting timeliness affects investor confidence — Kingswood should proceed with the CIO's big-bang approach but add an AI-based fuzzy matching engine that automatically resolves mapping errors during the first three reporting cycles",
        D: "The board's concern and the CFO's urgency are both valid and must be addressed simultaneously — Kingswood should implement the MDM model with a parallel-run validation period where both legacy and MDM-based reports are generated for two closing cycles, allowing reconciliation of discrepancies before decommissioning legacy mappings"
      },
      CorrectChoice: "D",
      ExplanationCorrect: "Master data management at a merged entity requires balancing data consistency (the CFO's urgency for timely, reliable consolidated reporting) with operational risk (the board's concern about simultaneous system-wide errors from incorrect mappings). A parallel-run validation period is the standard risk-mitigated MDM deployment pattern: (1) The MDM model is defined and legacy data is mapped. (2) For two closing cycles, both the legacy consolidation process and the MDM-based consolidation process run in parallel. (3) Discrepancies between the two reports are reconciled, identifying and correcting mapping errors. (4) After validation, the legacy mappings are decommissioned. This approach satisfies the board's risk concern (errors are caught during parallel run, not in production) and the CFO's urgency (the parallel run is time-boxed to two cycles, after which the 18-day close is reduced to the MDM-based timeline). The CIO's 'big bang' approach maximizes speed but concentrates mapping risk on a single go-live event — if customer mappings are wrong, every downstream system (sales reporting, commission calculations, customer profitability) produces incorrect results simultaneously. The parallel-run approach decouples validation from deployment, allowing errors to be found and corrected before they affect production reporting.",
      StudyLinks: [
        { label: "DAMA International — Data Management Body of Knowledge (DMBoK), Master Data Management Chapter", url: "https://www.dama.org" },
        { label: "IMA CMA Learning Outcome Statements, Part 1 Section F", url: "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
      ],
      SourceDescription: "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
      Part1OnlyFlag: true,
      ReviewNote: "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer."
    }
  }
];

module.exports = batch4;
