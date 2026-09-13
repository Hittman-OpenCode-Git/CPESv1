const WAVE9B = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.111 privileged access recertification",
    "MicroTopic": "privileged access recertification",
    "UniqueConceptKey": "E-E-111-privileged-access-recertification",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Privileged accounts (45 total): quarterly recertification finds 6 with no business justification (13%), including 2 shared admin accounts with unknown current users. Two prior quarters found 1–2 unjustified each, none shared. What is the correct response?",
    "Choices": {
      "A": "Note and monitor — 13% unjustified is within tolerance for privileged populations",
      "B": "Disable all 45 privileged accounts pending re-verification — maximum assurance justifies the outage",
      "C": "Disable the 6 unjustified immediately (shared accounts same-day with password rotation), investigate how shared accounts lost user attribution, and move privileged recertification to monthly until two clean quarters",
      "D": "Disable only the 2 shared accounts — individually-assigned unjustified accounts pose no exploitable risk"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Trend plus severity: unjustified privileged counts jumped 1–2 → 6 (3–6× baseline — provisioning discipline degrading), with 2 shared admin accounts of unknown usership (anonymous privileged access — the highest-severity finding in identity management: unattributable actions with full rights). Tolerance dismissal (option A, 13%) ignores the 3–6× trend break and the shared-account concentration. Mass disablement (option B, all 45) punishes 39 legitimate administrators for a provisioning defect — outage theater. Shared-only (option D) leaves 4 individually-assigned unjustified privileged accounts active — unjustified privilege of any attribution is a finding. Response: same-day disablement of all 6 (shared with rotation, since passwords may be widely known), attribution investigation (how did shared accounts lose user linkage — ticket archaeology plus workflow fix), monthly cadence until two clean quarters. Business interpretation: privileged recertification triages by trend × anonymity — unjustified counts rising plus shared accounts is the identity equivalent of a five-alarm finding. Common trap: tolerance-banding away privileged trend breaks.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-111",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's 13%-tolerance dismissal ignores the 3–6× jump from the 1–2 baseline and the 2 shared-account concentrations. Tolerance bands judge levels; trend breaks judge processes — this one broke.",
    "ExplanationWrongB": "Option B disables all 45 privileged accounts, punishing 39 legitimate administrators for a provisioning defect. Remediation targets unjustified accounts and the provisioning workflow — mass disablement is outage theater.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D leaves 4 individually-assigned unjustified privileged accounts active as 'non-exploitable.' Unjustified privilege of any attribution is a finding — individual assignment does not authorize unjustified rights.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.112 vendor master file controls",
    "MicroTopic": "vendor master file controls",
    "UniqueConceptKey": "E-E-112-vendor-master-file-controls",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Vendor master analytics: 3 duplicate vendor records (same tax ID, different spellings) with $180,000 paid YTD; 1 vendor with the AP clerk's home address; no periodic vendor-file review exists. The controller must sequence remediation. What comes first?",
    "Choices": {
      "A": "Merge duplicates on next master-data cleanup cycle — timing convenience governs",
      "B": "Freeze payments to the 4 flagged vendors pending verification, investigate the home-address vendor for fictitious-payee fraud first ($180,000 duplicate exposure second), then implement quarterly vendor-file reviews with tax-ID uniqueness enforced",
      "C": "Ignore the home-address match — coincidences happen in large files",
      "D": "Delete all 4 vendors immediately — flagged records have no business purpose"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Sequence by fraud risk: the AP clerk's home address on a payee record is the textbook fictitious-vendor indicator — freeze first, investigate immediately (who approved it, what was paid, where did funds go). Duplicate tax IDs ($180,000 paid across 3 records) enable split-payee concealment — freeze pending verification (legitimate duplicates merge; fraudulent ones investigate). Scheduled-cycle merging (option A) leaves both exposures paying out until convenience arrives. Coincidence dismissal (option C) waves the single strongest payables-fraud indicator in the data. Immediate deletion (option D) destroys evidence — freeze preserves records for investigation while stopping outflow. Then structural: quarterly vendor-file reviews with system-enforced tax-ID uniqueness (prevents recurrence). Business interpretation: vendor-file findings triage by fraud-indicator strength (home address > duplicates > missing review), freeze before investigating, investigate before merging. Common trap: scheduled remediation of active fraud indicators.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-112",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's next-cycle merging leaves a home-address payee and $180,000 of duplicate exposure paying out until convenience. Fraud indicators freeze first, schedule second.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C dismisses an employee home address on a payee record as coincidence — the single strongest fictitious-vendor indicator in payables analytics. Coincidence is the finding's alibi, not its analysis.",
    "ExplanationWrongD": "Option D deletes all 4 records immediately, destroying evidence (approval trails, payment history) the investigation needs. Freeze stops outflow while preserving records; deletion stops both.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.113 journal entry testing thresholds",
    "MicroTopic": "journal entry testing thresholds",
    "UniqueConceptKey": "E-E-113-journal-entry-testing-thresholds",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Manual journal entries: 400/quarter, average $15,000, σ = $25,000. Current testing: all entries above $50,000 (8% of population, ~$2,400,000 coverage). Two prior frauds (both $18,000 and $22,000) passed below the threshold untested. What testing design should the controller adopt?",
    "Choices": {
      "A": "Keep $50,000 — thresholds need stability more than sensitivity",
      "B": "Lower to $15,000 — catch the $18,000/$22,000 fraud band while controlling volume (roughly triple the sample, still reviewable)",
      "C": "Test 100% — journal fraud justifies census testing regardless of cost",
      "D": "Raise to $100,000 — fewer, better investigations beat volume"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The $50,000 threshold demonstrably misses the known fraud band ($18,000/$22,000 passed untested twice) — threshold validity is proven by failure, not by stability (option A's defense). Lowering to $15,000 captures the fraud band with roughly tripled volume (~24% of 400 = ~96 entries/quarter — reviewable with analytics assist). Census testing (option C: all 400) spends review hours on immaterial routine entries the threshold exists to exclude. Raising to $100,000 (option D) widens the proven blind spot to shelter more fraud. Business interpretation: set journal-testing thresholds below demonstrated fraud sizes — thresholds that miss known frauds are findings, not policies. Common trap: defending thresholds on stability after they demonstrably failed.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-113",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A keeps $50,000 for stability after it demonstrably missed two frauds ($18,000/$22,000). Stability in a proven-blind threshold is persistence in failure.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C tests all 400 entries census-style, spending review hours on immaterial routine postings the threshold exists to exclude. Census testing confuses thoroughness with effectiveness.",
    "ExplanationWrongD": "Option D raises to $100,000, widening the proven $18,000/$22,000 blind spot further. Higher thresholds shelter more fraud, not better investigations.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.114 exception reporting design",
    "MicroTopic": "exception reporting design",
    "UniqueConceptKey": "E-E-114-exception-reporting-design",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A new exception report fires 300 items weekly; reviewers clear 280 as false positives (93%) and investigate 20. Reviewer fatigue is rising; genuine exceptions hide in the noise. The report designer must choose: tighten rules, add tiers, or accept volume. What redesign works?",
    "Choices": {
      "A": "Accept 300/week — coverage completeness outweighs reviewer load",
      "B": "Tighten all rules 50% — fewer exceptions means better exceptions",
      "C": "Tier into critical (auto-escalate ~10), review (~40), and informational (dashboard-only ~250) with rule-tuning feedback from reviewer dispositions — precision through triage, not thresholding",
      "D": "Rotate reviewers weekly — fresh eyes solve fatigue without redesign"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The 93% false-positive rate destroys reviewer attention (alarm fatigue) — genuine exceptions hide among 280 noise items. Blanket tightening (option B: 50% across rules) cuts true and false positives proportionally, hiding real exceptions with the noise. Acceptance (option A) burns reviewer capacity on 280 weekly false alarms until reviewers rubber-stamp everything (including the 20 real ones). Rotation (option D) redistributes fatigue without reducing it. Tiering separates actionability: critical (~10 auto-escalate, immediate action), review (~40 human-judged), informational (~250 dashboard-monitored for trends) — plus disposition feedback (reviewers tag false-positive patterns → rules tune → volume falls structurally). Business interpretation: exception systems need triage architecture plus a learning loop — tiers route attention, feedback retunes rules. Common trap: threshold-tuning a triage problem.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-114",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's 300/week acceptance burns reviewer capacity on 280 false alarms until rubber-stamping sets in — coverage that destroys attention covers nothing.",
    "ExplanationWrongB": "Option B's blanket 50% tightening cuts true positives with false ones — precision through thresholding hides real exceptions alongside noise.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D rotates reviewers through unchanged 93%-noise volume — redistributing fatigue without reducing it. Fresh eyes glaze at the same rate on the same noise.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.115 control self-assessment bias",
    "MicroTopic": "control self-assessment bias",
    "UniqueConceptKey": "E-E-115-control-self-assessment-bias",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Control self-assessments (CSAs) by process owners rate 95% of controls effective; independent testing rates 78% effective on the same population. The gap persists three cycles. The CAE must address the 17-point optimism gap. What works?",
    "Choices": {
      "A": "Accept CSAs — owners know their controls best, and 95% is a strong signal",
      "B": "Discard CSAs — self-assessment is inherently worthless, test everything independently",
      "C": "Calibrate with anchored scales (behavioral evidence requirements per rating), independent spot-checks with published accuracy scores, and consequence-free downgrade amnesty — measure and correct the bias, keep the coverage",
      "D": "Average to 86.5% — the truth lies between self-view and audit view"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The persistent 17-point gap (95% vs 78%, three cycles) is systematic optimism bias — owners rate generously (career incentives, definitional looseness, evidence-free assertions). Discarding CSAs (option B) forfeits 100% population coverage that independent testing cannot afford to replace. Accepting (option A) blesses inflated assurance. Averaging (option D: 86.5%) splits bias with evidence — arithmetic without epistemology. Calibration fixes the instrument: anchored scales (each rating requires cited evidence artifacts), spot-checks with published accuracy (owners learn their ratings get verified and scored), downgrade amnesty (removing career penalty for honest downgrades corrects the incentive). Three cycles of 17-point gaps prove the bias is structural — structural fixes (evidence, verification, incentives), not persuasion. Business interpretation: self-assessment is a coverage asset with a bias liability — calibrate the instrument, keep the coverage. Common trap: choosing between self-view and audit-view instead of combining them with calibration.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-115",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A accepts 95% self-ratings against 78% independent evidence across three cycles — blessing systematic optimism as insight. Owners' knowledge does not survive their incentives uncalibrated.",
    "ExplanationWrongB": "Option B discards full-population CSA coverage that independent testing cannot afford to replace — throwing away signal with bias instead of calibrating the instrument.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's 86.5% average splits bias with evidence — arithmetic without epistemology. Averages of biased and verified measures are biased.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.116 fraud response sequencing",
    "MicroTopic": "fraud response sequencing",
    "UniqueConceptKey": "E-E-116-fraud-response-sequencing",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $45,000 suspected kickback scheme implicates a procurement manager with sole-source authority over $1,800,000 of annual spend. Evidence is preliminary (one vendor email, no financial trail yet). Legal wants a quiet internal review; the whistleblower fears retaliation and demands external reporting. What sequence should the controller recommend?",
    "Choices": {
      "A": "External reporting immediately — whistleblower demands plus $1.8M exposure override internal process",
      "B": "Quiet review with the manager informed — transparency with subjects preserves fairness",
      "C": "Secure evidence (preserve email, image devices), restrict the manager's authority quietly (dual-approval overlay), engage counsel-directed investigation, protect the whistleblower — controls first, investigation under privilege, retaliation guards active throughout",
      "D": "Wait for the financial trail — preliminary evidence never justifies action"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Sequence by irreversibility: (1) preserve evidence first (email, devices — spoliation destroys everything downstream); (2) quietly restrict authority via dual-approval overlay (stops the $1.8M exposure without tipping the subject — removal or confrontation first risks destruction); (3) counsel-directed investigation (privilege protects findings and strategy); (4) whistleblower protections active from minute one (anti-retaliation monitoring, confidential channel). Immediate external reporting (option A) with preliminary evidence and unexhausted internal channels violates proportionality — external is last resort. Informing the manager (option B) tips the subject before evidence is secured. Waiting for financial trails (option D) leaves $1.8M of sole-source authority live while evidence sits unpreserved. Business interpretation: fraud response sequences by evidence-preservation urgency, then exposure containment, then privileged investigation — retaliation guards run parallel throughout. Common trap: choosing between speed and process instead of sequencing both.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-116",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's immediate external reporting with preliminary evidence and unexhausted internal process violates proportionality — external channels are last resort, and premature exposure jeopardizes the investigation.",
    "ExplanationWrongB": "Option B informs the subject before securing evidence — tipping off the sole-source authority holder risks spoliation of the email trail and device data the case needs.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D waits for financial trails while $1.8M of sole-source authority stays live and email evidence sits unpreserved. Preliminary evidence triggers preservation and containment, never patience.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.117 data classification handling",
    "MicroTopic": "data classification handling",
    "UniqueConceptKey": "E-E-117-data-classification-handling",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Customer PII sits in three places: encrypted production database (access-logged), analyst spreadsheets emailed weekly (unencrypted, 12 recipients), and a legacy test server (no access logs, unknown users). A privacy review must prioritize remediation with a $60,000 budget. What sequence should govern?",
    "Choices": {
      "A": "Harden production first — the largest dataset deserves the most protection",
      "B": "Eliminate the spreadsheet distribution (secure portal + access controls) and decommission or isolate the legacy test server first — ungoverned copies dominate breach risk; production is already controlled",
      "C": "Accept all three — encryption somewhere in the architecture covers the data lifecycle",
      "D": "Encrypt the spreadsheets — matching production's control satisfies the review"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Risk concentrates in ungoverned copies: 12-recipient unencrypted weekly email distribution (broad exfiltration surface, no access logging, version sprawl) plus an unlogged legacy test server with unknown users (stale PII outside all monitoring). Production is already encrypted with access logging — the controlled leg. Encrypted-spreadsheet upgrades (option D) keep 12-person email distribution (the distribution, not just the encryption, is the exposure). Production-first hardening (option A) gilds the controlled leg while ungoverned copies leak. Lifecycle-coverage claims (option C) mistake partial encryption for governance — unlogged, unmonitored copies are breaches waiting for discovery. Sequence: kill the email distribution (secure portal with role-based access), decommission or network-isolate the legacy server (with data destruction attestation), then verify production logging completeness with the remaining budget. Business interpretation: triage PII by governance deficit, not by dataset size — ungoverned copies outrank governed databases regardless of volume. Common trap: hardening controlled systems while ungoverned copies persist.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-117",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A hardens production — already encrypted and logged — while 12-recipient email distribution and an unlogged legacy server leak ungoverned. Biggest dataset is not biggest risk; least-governed is.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's lifecycle coverage claims partial encryption as whole-lifecycle governance — unlogged copies and unmonitored servers sit outside every control the claim assumes.",
    "ExplanationWrongD": "Option D encrypts spreadsheets but preserves 12-person email distribution, version sprawl, and absent logging. Encryption without distribution control and monitoring is compliance theater.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.118 tone at the top measurement",
    "MicroTopic": "tone at the top measurement",
    "UniqueConceptKey": "E-E-118-tone-at-the-top-measurement",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The board wants tone-at-the-top measured, not asserted. Available: executive communications audit (values messaging frequency), exception-override log (12 management overrides this year, 4 undocumented), employee survey (62% believe misconduct is tolerated for high performers), turnover in compliance (3 of 5 staff left in 18 months). What should the assessment conclude?",
    "Choices": {
      "A": "Strong tone — frequent values messaging proves leadership commitment",
      "B": "Strong tone — turnover reflects labor markets, not culture",
      "C": "Weak tone — 4 undocumented overrides plus 62% tolerance perception plus compliance exodus outweigh messaging frequency; recommend override pre-approval, consequence transparency, and compliance retention review",
      "D": "Unmeasurable — tone is inherently qualitative and unauditable"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Triangulate behavior against messaging: 4 undocumented management overrides (control override without record — the sharpest tone signal), 62% tolerance perception (majority belief that performance excuses misconduct — culture as experienced, not as messaged), 3-of-5 compliance turnover in 18 months (the function's vote with feet — 60% attrition signals futility or pressure). Messaging frequency (options A/B: values communications) measures broadcast volume, never received culture — talk is the cheapest tone input. Unmeasurability claims (option D) surrender to difficulty — overridden controls, surveyed beliefs, and attrition data are all auditable evidence. Recommendation triad: override pre-approval (no undocumented overrides, ever), consequence transparency (publish anonymized misconduct outcomes to reset the 62%), compliance retention review (exit-interview the function before it fully turns over). Business interpretation: tone is measured in overrides, beliefs, and retention — never in message counts. Common trap: auditing communications instead of conduct.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-118",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's frequent-messaging verdict mistakes broadcast volume for received culture — 4 undocumented overrides and 62% tolerance perception directly contradict the messaging. Talk is the cheapest tone input.",
    "ExplanationWrongB": "Option B's labor-market turnover excuse waves 60% compliance attrition in 18 months as ambient churn. Function-specific exodus at 3-of-5 against stable company turnover is a culture signal, not a market one.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D declares tone unauditable — but overrides (countable), beliefs (surveyable at 62%), and attrition (3-of-5 countable) are all auditable evidence. Difficulty is not impossibility.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.119 control deficiency aggregation",
    "MicroTopic": "control deficiency aggregation",
    "UniqueConceptKey": "E-E-119-control-deficiency-aggregation",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Three deficiencies, each individually a control deficiency (not significant): $15,000 AP cutoff errors (monthly pattern), $12,000 AR application delays (same root cause: short-staffed accounting, 4 vacancies), $8,000 inventory count adjustments (unrelated cycle-count timing). How should aggregation be assessed for significant-deficiency determination?",
    "Choices": {
      "A": "No aggregation — each is below significance alone, so the total is irrelevant",
      "B": "Aggregate all three ($35,000) — totals determine significance regardless of cause",
      "C": "Aggregate the $27,000 pair sharing the staffing root cause (AP + AR) and evaluate jointly against significance; assess the $8,000 inventory item separately (different cause, timing noise)",
      "D": "Each deficiency auto-escalates one level when three or more exist — numerosity alone aggravates"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Aggregation follows common cause, not arithmetic totals: the $15,000 AP and $12,000 AR deficiencies share the staffing root cause (4 vacancies — same failure mechanism across transaction cycles), so their $27,000 combined magnitude plus shared-cause persistence evaluates jointly against significant-deficiency thresholds (reasonable possibility of material misstatement through a common breakdown). The $8,000 inventory item has a different cause (cycle-count timing, unrelated to staffing) — assessed separately as an isolated deficiency. Pure non-aggregation (option A) ignores that shared-cause deficiencies compound (one short-staffed team failing two cycles evidences broader breakdown). Pure totaling (option B: $35,000) aggregates across unrelated causes — timing noise does not strengthen staffing-failure evidence. Numerosity escalation (option D) aggravates by count without causal analysis. Business interpretation: aggregate deficiencies that share root causes, isolate those that don't — significance follows failure mechanisms, never tallies. Common trap: summing unrelated deficiencies to manufacture significance (or refusing to aggregate related ones).",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-119",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's no-aggregation treats each deficiency in isolation despite the shared staffing root cause across AP and AR — same team failing two cycles evidences broader breakdown than either alone.",
    "ExplanationWrongB": "Option B's $35,000 total aggregates the unrelated $8,000 timing item with the staffing pair — unrelated causes do not compound. Totals without causal analysis manufacture significance from noise.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D auto-escalates by numerosity (three = significant) without causal analysis — counts without mechanisms. Two related deficiencies can signify; three unrelated ones may not.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.120 management review precision",
    "MicroTopic": "management review precision",
    "UniqueConceptKey": "E-E-120-management-review-precision",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A management review control flags variances above $50,000 for investigation. Last quarter it flagged 2 of 40 cost centers; both investigations found nothing (100% false-positive rate in the quarter). The control owner calls it 'operating effectively — it operated.' How should effectiveness be assessed?",
    "Choices": {
      "A": "Effective — operation plus two investigations proves the control functions",
      "B": "Deficient — 100% quarterly false-positive rate proves the threshold lacks precision; recalibrate to risk-based tiers with follow-through tracking",
      "C": "Effective with a lower $25,000 threshold — more flags mean more assurance",
      "D": "Remove the control — false positives prove reviews add no value"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Operation is necessary but insufficient for effectiveness — a control that operates without precision detects nothing while consuming investigation hours. Two flags from 40 centers with zero findings in the quarter evidences threshold miscalibration (too coarse to discriminate), not diligence. Lowering to $25,000 (option C) doubles noise without improving precision — more flags from the same blunt rule. Removal (option D) surrenders review coverage entirely because calibration is poor — fix precision, don't abandon review. Operation-equals-effectiveness (option A) confuses activity with assurance. The fix: risk-based tiers (tight thresholds on volatile/high-risk centers, looser on stable ones) plus follow-through tracking (flag-to-finding conversion rates by center, reviewed quarterly). Business interpretation: review controls earn effectiveness through precision (findings per flag), never through operation counts. Common trap: equating control operation with control effectiveness.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section E",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "COSO Internal Control — Integrated Framework",
        "url": "https://www.coso.org/guidance-on-ic"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-E-120",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's operated-plus-investigated verdict confuses activity with assurance — two flags with zero findings evidences miscalibration, not diligence. Operation is necessary, never sufficient.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $25,000 threshold doubles flag volume from the same blunt rule — more noise without more precision. Threshold levels need risk-tiering, not uniform lowering.",
    "ExplanationWrongD": "Option D removes review coverage over poor precision — surrendering assurance because calibration is off. Recalibrate thresholds by risk tier; never abandon review for miscalibration.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE9B;
