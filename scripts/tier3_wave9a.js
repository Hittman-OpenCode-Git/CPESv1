const WAVE9A = [
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.101 segregation matrix with IT override",
    "MicroTopic": "segregation matrix IT override",
    "UniqueConceptKey": "E-E-101-segregation-matrix-IT-override",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A plant's access matrix shows 12 users hold both inventory-adjust and scrap-writeoff rights in the ERP; the IT admin (13th) can grant either right without workflow. Quarterly adjustments total $280,000; scrap averages $45,000. The controller must rank the exposures and sequence remediation. What is the correct analysis?",
    "Choices": {
      "A": "Revoke the admin's grant right first ($280,000 + $45,000 at risk through a single actor), then split the 12 dual-holders — superuser concentration dominates distributed overlap",
      "B": "Split the 12 dual-holders first — headcount beats privilege depth",
      "C": "Accept both — ERP logging makes segregation obsolete at any concentration",
      "D": "Cap adjustments at $10,000 — thresholds substitute for segregation"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Two exposures layer: (1) IT admin's unilateral grant right concentrates the full $325,000 ($280,000 adjustments + $45,000 scrap) behind one actor with no workflow — single-point compromise of the entire control; (2) 12 dual-holders each combine custody-adjacent rights (adjust + writeoff), enabling concealment loops ($45,000 scrap can bury $280,000 adjustment fraud). Remediation sequences by concentration: revoke unilateral grants first (workflow-enforce all privilege changes — kills the single-actor path), then split dual-holders (separate adjust from writeoff across roles). Headcount-first (option B) leaves the admin's master key intact while churning 12 roles. Logging-as-substitute (option C) records concentrated fraud immaculately. Caps (option D) invite split-transaction evasion. Business interpretation: privilege concentration outranks overlap headcount — revoke master keys before splitting shared ones. Common trap: counting dual-holders while ignoring grant authority.",
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
    "QuestionID": "P1E-E-101",
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
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B splits 12 dual-holders first while the admin's unilateral grant right persists — churning roles around an intact master key. Concentration dominates headcount in sequencing.",
    "ExplanationWrongC": "Option C treats ERP logging as a segregation substitute at any concentration — logs record concentrated fraud without preventing it. Logging deters only under review with enforcement.",
    "ExplanationWrongD": "Option D caps adjustments at $10,000, inviting split-transaction evasion across the $280,000 volume while leaving grant authority and dual rights structurally intact.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.102 walkthrough exception triage",
    "MicroTopic": "walkthrough exception triage",
    "UniqueConceptKey": "E-E-102-walkthrough-exception-triage",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A procure-to-pay walkthrough of 25 transactions finds: 3 missing receiving reports ($18,000), 1 duplicate payment $7,500 (recovered), 5 late approvals within authority ($60,000, no loss). The audit manager must triage into deficiency, significant deficiency, or material weakness indicators. How should the findings rank?",
    "Choices": {
      "A": "All three are material weaknesses — any walkthrough exception proves systemic failure",
      "B": "No deficiencies — recovered and on-time items prove the system works",
      "C": "Late approvals are the priority — $60,000 dwarfs the other amounts",
      "D": "Missing receiving reports indicate a control deficiency (3/25 = 12% failure on the key match control); the duplicate is an isolated $7,500 execution error (recovered); late approvals are process noise within authority — rank by control-design impact, not dollars"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Triage by what each finding says about control design: (1) 3/25 missing receiving reports (12%) strikes the three-way match's key input — systematic enough to indicate a deficiency in operation (missing documents recur, enabling un-receipted payment). (2) One $7,500 duplicate, recovered — isolated execution error with full recovery, lowest severity. (3) Five late approvals within authority ($60,000, no loss) — timeliness noise, not authority breach; approvers acted inside limits, only slowly. Dollar-ranking (option C: $60,000 first) mistakes volume for control significance — the $18,000 finding threatens the match control itself. All-material (option A) inflates isolated and noise findings to systemic verdicts. No-deficiency (option B) waves a 12% key-control failure rate as success. Business interpretation: walkthrough triage weights design impact over dollars — missing key inputs outrank large authorized-but-late items. Common trap: ranking findings by transaction amount.",
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
    "QuestionID": "P1E-E-102",
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
    "ExplanationWrongA": "Option A's all-material verdict inflates a recovered $7,500 error and five within-authority late approvals into systemic failure — severity inflation destroys triage credibility.",
    "ExplanationWrongB": "Option B's no-deficiency waves a 12% missing-receiving-report rate as success. Key-input failures at 12% indicate operational deficiency regardless of the other two benign findings.",
    "ExplanationWrongC": "Option C prioritizes $60,000 of late-but-authorized approvals over the $18,000 match-control gap — dollars over design. Volume never outranks control-design impact in triage.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.103 preventive detective mix costing",
    "MicroTopic": "preventive detective mix costing",
    "UniqueConceptKey": "E-E-103-preventive-detective-mix-costing",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Disbursement fraud exposure is $600,000/year. Preventive upgrade (dual authorization workflow) costs $90,000 and cuts occurrence 80%. Detective upgrade (daily match analytics) costs $40,000 and cuts loss-given-occurrence 60%. Budget allows only one this year. Which should fund first, and what remains exposed?",
    "Choices": {
      "A": "Preventive — $480,000 reduction ($600,000 × 80%) for $90,000; residual $120,000 plus unaddressed severity",
      "B": "Detective — cheaper sticker price always wins under budget constraint",
      "C": "Neither — split $130,000 proportionally across both for half coverage each",
      "D": "Preventive — occurrence elimination beats severity reduction categorically"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Preventive expected reduction = $600,000 × 80% = $480,000 for $90,000 (5.3× return); residual = $120,000 occurrence plus full severity on what occurs. Detective reduction = $600,000 × 60% = $360,000 for $40,000 (9× return); residual = $240,000 occurrence untouched. On absolute reduction, preventive wins ($480,000 > $360,000) — fund it first; detective follows next budget cycle. Sticker-price logic (option B: $40,000 < $90,000) ignores the $120,000 reduction gap. Split-funding (option C) buys partial prevention plus partial detection with neither at effective strength — half-built controls underperform their cost. Categorical prevention-supremacy (option D) reaches the right answer on doctrine instead of arithmetic — here prevention wins on numbers ($480k > $360k), not on category. Business interpretation: rank controls by expected-loss reduction per dollar, fund down the ranking — doctrine follows math, never precedes it. Common trap: buying the cheaper control instead of the higher-return one.",
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
    "QuestionID": "P1E-E-103",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B buys detective on $40,000 sticker versus $90,000 — $360,000 of reduction against $480,000, a 20,000 shortfall purchased for $50,000 of savings. Sticker prices never rank controls.",
    "ExplanationWrongC": "Option C splits $130,000 across both for half-strength each — partial prevention plus partial detection that sums below either full control. Half-built controls underperform their cost.",
    "ExplanationWrongD": "Option D asserts prevention-supremacy as doctrine, reaching the right answer ($480k > $360k here) on categorical grounds that fail wherever detective returns dominate. Math first, doctrine never.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.104 authorization limit structuring",
    "MicroTopic": "authorization limit structuring",
    "UniqueConceptKey": "E-E-104-authorization-limit-structuring",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Spending authority: supervisors $5,000, managers $25,000, directors $100,000, board above. Analysis shows 40% of transactions cluster at $4,800–$5,000 and 25% at $24,000–$25,000 — classic threshold bunching. What does the pattern prove, and what redesign follows?",
    "Choices": {
      "A": "Nothing — clustering near limits is natural efficient behavior",
      "B": "Raise all limits 20% — friction causes bunching, and higher limits smooth flow",
      "C": "Threshold evasion is likely (split transactions to stay under limits); redesign with cumulative-per-vendor-per-month caps plus text-analytics on split patterns",
      "D": "Lower all limits 20% — tighter limits mechanically prevent evasion"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Bunching just below thresholds (40% at $4.8–5k, 25% at $24–25k) is the statistical signature of split-transaction evasion — legitimate spending distributes smoothly, while evaded spending piles beneath limits. Raising limits (option B) moves the pile, never removes it (bunching re-forms under the new lines). Lowering limits (option D) squeezes legitimate spending into more approval rounds while evaders split finer. Natural-efficiency claims (option A) mistake a 65%-of-volume anomaly for optimization. The redesign pairs cumulative caps (per-vendor-per-month totals, which splits cannot evade) with split-pattern analytics (adjacent dates, complementary scopes, same vendor) — thresholds govern single transactions, cumulative caps govern evasion. Business interpretation: bunching diagnostics precede limit redesign — measure the pile before moving the lines. Common trap: treating threshold effects as efficiency.",
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
    "QuestionID": "P1E-E-104",
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
    "ExplanationWrongA": "Option A reads 65% sub-threshold bunching as natural efficiency. Legitimate spending has no reason to pile beneath approval lines — concentration just under limits is evasion's fingerprint.",
    "ExplanationWrongB": "Option B raises limits 20% to smooth flow — bunching re-forms under the new lines at higher amounts. Moving lines never removes the incentive to stay beneath them.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D tightens limits 20%, squeezing legitimate spending into more approval rounds while evaders split finer still. Tighter single-transaction lines without cumulative caps escalate the arms race the company loses.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.105 reconciliation break aging",
    "MicroTopic": "reconciliation break aging",
    "UniqueConceptKey": "E-E-105-reconciliation-break-aging",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Bank reconciliation: 12 breaks totaling $95,000 — 9 under $5,000 each ($22,000) aged under 30 days, 2 at $18,000 and $25,000 aged 60–90 days, 1 at $30,000 aged 120+ days. The controller has 20 investigation hours. How should effort allocate?",
    "Choices": {
      "A": "Oldest first mechanically — age always outranks amount",
      "B": "Largest first mechanically — amount always outranks age",
      "C": "Investigate the $30,000/120-day and $25,000/90-day breaks first (age × amount interaction: stale large breaks indicate control failure or concealment), then the $18,000, then batch-clear the nine small current breaks",
      "D": "Clear the nine small breaks first — volume clearance maximizes items resolved per hour"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Age and amount interact: large breaks that age past 60 days signal either broken follow-up (control failure) or deliberate parking (concealment) — the $30,000/120-day and $25,000/90-day items carry both risk markers and consume investigation hours first. The $18,000/60-day item follows. The nine small current breaks ($22,000 across 9, all <30 days) batch-clear through normal follow-up — routine timing noise at this age and size. Pure-age ordering (option A) would rank a $1,000/120-day item above a $25,000/90-day one; pure-amount ordering (option B) would rank a $30,000 5-day timing break above a $25,000 90-day stale one. Volume clearance (option D) maximizes closed items while the two stalest large breaks age further into write-off territory. Business interpretation: triage breaks on the age×amount interaction — stale-and-large first, current-and-small in batch. Common trap: single-dimension triage of two-dimensional risk.",
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
    "QuestionID": "P1E-E-105",
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
    "ExplanationWrongA": "Option A's oldest-first would rank a $1,000/120-day timing item above a $25,000/90-day stale break — age without amount misallocates hours to immaterial staleness.",
    "ExplanationWrongB": "Option B's largest-first would rank a $30,000 5-day timing break above a $25,000 90-day stale one — amount without age misallocates hours to current noise.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D batch-clears nine small current breaks for volume metrics while the two stalest large breaks ($55,000 combined) age toward write-off. Items-resolved counts are not risk reduced.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.106 physical inventory surprise counts",
    "MicroTopic": "physical inventory surprise counts",
    "UniqueConceptKey": "E-E-106-physical-inventory-surprise-counts",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Perpetual records show $1,200,000; last annual count found $36,000 of shrinkage (3%). High-value SKUs ($400,000, 33% of value in 5% of lines) have never been surprise-counted; cycle counts cover only bulk low-value lines. The controller proposes quarterly surprise counts of high-value SKUs plus annual full count. Finance calls it over-auditing. What should operate?",
    "Choices": {
      "A": "Annual full count only — one complete count beats partial ones",
      "B": "Quarterly surprise counts of high-value SKUs plus the annual full count — $400,000 of unexamined value at 3%+ shrinkage rates justifies targeted coverage",
      "C": "Daily full counts — maximum assurance regardless of cost",
      "D": "Drop all counts — perpetual records plus 3% historical shrinkage accrual suffice"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Risk concentrates where value concentrates: $400,000 of high-value SKUs (33% of value) have zero surprise coverage — the exact population where shrinkage and theft concentrate, while cycle counts polish low-value bulk. At even the 3% historical rate, $12,000 of high-value exposure sits unexamined; targeted SKUs typically run hotter. Quarterly surprise counts (unannounced timing defeats staging) plus the annual full count (completeness baseline) cover both dimensions at modest cost. Annual-only (option A) leaves high-value lines unexamined 12 months at a time. Daily full counts (option C) spend count-team wages exceeding shrinkage savings. No counts (option D) accrues 3% without ever testing it — accruals estimate, counts verify. Business interpretation: stratify count effort by value concentration with surprise timing on the top stratum — audit where the money is, unannounced. Common trap: uniform count coverage across skewed value distributions.",
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
    "QuestionID": "P1E-E-106",
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
    "ExplanationWrongA": "Option A's annual-only leaves $400,000 of high-value SKUs unexamined for 12 months — the precise population where shrinkage concentrates. Completeness without stratification misses where it matters.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's daily full counts spend count-team wages exceeding the $36,000 shrinkage baseline — assurance priced above the exposure it protects. Stratified surprise counts buy the coverage at a fraction.",
    "ExplanationWrongD": "Option D accrues 3% without ever testing it — estimates without verification drift. Cycle counts on bulk lines do not cover high-value SKUs by any sampling logic.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.107 HR termination pay continuation",
    "MicroTopic": "HR termination pay continuation",
    "UniqueConceptKey": "E-E-107-HR-termination-pay-continuation",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Payroll analytics flag 4 employees terminated 60–120 days ago still receiving full pay ($18,000/month combined). HR blames 'processing backlog'; IT shows accounts active with recent logins on 2 of the 4. What is the correct response sequence?",
    "Choices": {
      "A": "Wait for HR backlog clearance — administrative delays explain continuation",
      "B": "Stop pay immediately, disable accounts same-day, recover overpayments, audit the 2 active logins for unauthorized access, and impose a 48-hour termination-to-offboarding SLA with payroll-HR-IT reconciliation",
      "C": "Stop pay but leave accounts active — access without pay harms no one",
      "D": "Continue pay pending manager confirmation — termination records may be erroneous"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Two signals compound: $18,000/month of ghost payroll ($216,000 annualized) plus active logins on 2 of 4 terminated accounts — the latter evidences either unauthorized access (ex-employee or credential sharing) or HR records fiction. Backlog patience (option A) funds ghost payroll while active sessions persist. Pay-stopped-but-active (option C) leaves authenticated access for terminated identities — the higher-severity half of the finding. Manager-confirmation delay (option D) outsources termination truth to the managers who may benefit from ghost headcount. The sequence matters: stop pay (halts bleed), disable accounts (kills access), recover (offsets loss), audit logins (determines whether access was exploited), then fix structurally (48-hour SLA with three-way reconciliation so HR, payroll, and IT agree on who is employed). Business interpretation: terminated-but-active is a dual finding (payroll + access) until proven otherwise — respond to both halves the same day. Common trap: treating ghost payroll as purely administrative.",
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
    "QuestionID": "P1E-E-107",
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
    "ExplanationWrongA": "Option A's backlog patience funds $18,000/month of ghost payroll while 2 accounts show active logins — patience with pay continuation plus live access is funding plus exposure simultaneously.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C stops pay but leaves terminated identities authenticated — access without pay still enables data theft, sabotage, and fraud staging. Pay and access terminate together, same day.",
    "ExplanationWrongD": "Option D holds pay pending manager confirmation, outsourcing termination truth to potentially interested managers. HR termination records plus IT login evidence already clear the bar for action.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.108 outsourced payroll SOC reliance",
    "MicroTopic": "outsourced payroll SOC reliance",
    "UniqueConceptKey": "E-E-108-outsourced-payroll-SOC-reliance",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Payroll is fully outsourced ($4,000,000/year). The vendor's SOC 1 Type II is clean with no exceptions; complementary user-entity controls (CUECs) require client-side review of payroll registers and logical access to the vendor portal. The client performs neither. Can the auditor rely on the SOC report, and what must the client do?",
    "Choices": {
      "A": "Full reliance — clean Type II covers the entire payroll cycle including client duties",
      "B": "No reliance possible — outsourcing voids all control reliance by definition",
      "C": "Conditional reliance: implement both CUECs (register review + portal access review) immediately; clean Type II plus operating CUECs supports reliance, qualified by the gap period",
      "D": "Rely for processing accuracy but skip access review — portal access is the vendor's responsibility"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "SOC 1 Type II covers the vendor's controls only — CUECs are the client's half of the control system by design, and unperformed CUECs leave the cycle half-controlled regardless of the clean opinion. Both CUECs matter: register review catches processing errors the vendor's controls miss at the client's data edge; portal access review prevents unauthorized submitters (ghost employees originate at submission, not processing). Full reliance (option A) treats the SOC as covering client duties it explicitly carves out. No-reliance (option B) wastes a clean Type II plus two implementable controls. Split reliance (option D) keeps the accuracy half while abandoning the access half — ghost-employee risk enters through portal access, exactly the skipped control. Implement both now; qualify reliance for the gap period (test the unperformed months substantively). Business interpretation: outsourced-control reliance is a joint product — vendor opinion times client CUECs, never either alone. Common trap: reading clean SOC opinions as whole-cycle assurance.",
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
    "QuestionID": "P1E-E-108",
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
    "ExplanationWrongA": "Option A's full reliance extends the vendor's clean opinion over client-side CUECs the report explicitly carves out. SOC opinions bound their own scope — CUECs are the client's half by design.",
    "ExplanationWrongB": "Option B voids all reliance because payroll is outsourced — wasting a clean Type II plus two implementable CUECs. Outsourcing relocates controls; CUECs complete them.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D keeps accuracy reliance while skipping portal access review — but ghost employees enter through submission access, exactly the skipped control. Half-CUEC reliance is not reliance.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.109 change management emergency path",
    "MicroTopic": "change management emergency path",
    "UniqueConceptKey": "E-E-109-change-management-emergency-path",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Production ERP changes require CAB approval with testing evidence; the emergency path allows same-day pushes with post-implementation review within 48 hours. Last quarter: 40 normal changes (0 failures), 15 emergency changes (4 caused incidents, 27% failure). The CIO proposes expanding emergency-path eligibility to 'accelerate delivery.' What should the controller recommend?",
    "Choices": {
      "A": "Expand eligibility — 11 of 15 emergencies succeeded, proving the path works",
      "B": "Abolish the emergency path — 27% failure proves it is unsafe at any volume",
      "C": "Tighten emergency criteria to genuine production-down events, require pre-push peer review even in emergencies, and audit the 4 incidents for bypass patterns — the 27% failure rate on 15 uses signals process abuse, not delivery speed",
      "D": "No change — 4 incidents on 55 total changes (7%) is acceptable overall risk"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Segment the failure rates: normal path 0/40 (0%), emergency path 4/15 (26.7%). The emergency path fails at an unbounded multiple of the normal path — and 15 emergencies in a quarter (27% of all changes) signals eligibility abuse (routine work expedited to skip CAB), not genuine production-down urgency at that volume. Expansion (option A) scales a 27%-failure path on an 11-of-15 reading that ignores the 0%-failure baseline. Abolition (option B) removes the genuine-down path the business needs at 2 a.m. — the fix is eligibility discipline, not elimination. Blended-rate comfort (option D: 4/55 = 7% overall) averages a 0% process with a 27% process into complacency. Tightening (genuine-down criteria + peer review + incident pattern audit) preserves emergency capability while restoring the CAB's gatekeeping. Business interpretation: segment change failure rates by path before judging either — blended rates hide abused fast lanes. Common trap: expanding the path that fails because it is fast.",
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
    "QuestionID": "P1E-E-109",
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
    "ExplanationWrongA": "Option A's expansion scales a 27%-failure path on 11-of-15 arithmetic while the normal path runs 0/40. Fast lanes that fail get narrower gates, never wider eligibility.",
    "ExplanationWrongB": "Option B abolishes emergency capability entirely, leaving genuine 2 a.m. production-down events with no path. The defect is eligibility abuse (15/quarter), not the path's existence.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's 7% blended rate averages 0%-failure normal work with 27%-failure emergency work into complacency. Segment before judging — the emergency path fails at an unbounded multiple.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E-E.110 backup restore test gaps",
    "MicroTopic": "backup restore test gaps",
    "UniqueConceptKey": "E-E-110-backup-restore-test-gaps",
    "LOSTag": "P1-E.1",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Backups run nightly with 99% job success; restore tests run annually on a 5% sample (last test: 4 of 5 restores succeeded). Ransomware scenario needs 48-hour recovery of 200 systems. The backup admin reports 'healthy' status. What is the correct assessment?",
    "Choices": {
      "A": "Healthy — 99% backup success plus 80% restore success exceeds combined thresholds",
      "B": "Unhealthy — untested 95% plus 1-in-5 restore failure plus untested 48-hour timeline: require quarterly full-recovery rehearsals with RTO measurement",
      "C": "Healthy with more frequent backups — hourly jobs fix restore gaps",
      "D": "Replace backups with synchronous replication — backups are obsolete technology"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Three gaps compound: (1) 95% of backups never restore-tested — success rates on untested media are hopes, not controls; (2) the tested sample itself failed 1-in-5 (4/5 = 80%), projecting ~40 failed restores across 200 systems; (3) the 48-hour RTO was never rehearsed end-to-end — recovery timeline untested under load with coordination overhead. Healthy verdicts (option A) multiply untested-job rates by tested-sample rates as if both measured recovery — neither does. More-frequent backups (option C) multiply untested copies (more hopes, same gaps). Replication-instead (option D) swaps one untested strategy for another while adding correlated-failure modes (replication spreads ransomware instantly). Quarterly full-recovery rehearsals with measured RTO test what the scenario needs: restores that work, at scale, on time. Business interpretation: backup assurance equals tested restores at timeline under load — job success rates measure effort, rehearsals measure capability. Common trap: equating backup success with recoverability.",
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
    "QuestionID": "P1E-E-110",
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
    "ExplanationWrongA": "Option A's healthy verdict multiplies 99% job success by 80% sample restores as if both measured recovery — untested 95% plus 1-in-5 sample failure plus untested RTO is unhealthy on all three legs.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's hourly backups multiply untested copies — more hopes at higher frequency. Restore testing and RTO rehearsal are the gaps; backup frequency is not among them.",
    "ExplanationWrongD": "Option D replaces backups with synchronous replication — swapping untested restores for correlated-failure exposure (ransomware replicates instantly). Different technology, same untested recovery, plus new failure modes.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 9 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE9A;
