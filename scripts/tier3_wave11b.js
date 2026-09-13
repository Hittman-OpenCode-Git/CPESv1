const WAVE11B = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.111 cash conversion cycle budgeting",
    "MicroTopic": "cash conversion cycle budgeting",
    "UniqueConceptKey": "B-C111-cash-conversion-cycle-budgeting",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted: DIO 45 days, DSO 60 days, DPO 45 days (CCC 60 days). A working-capital program targets DIO 38 (−7), DSO 52 (−8), DPO 50 (+5) — CCC 40 days. Daily COGS $20,000, daily sales $30,000. What cash is released, and what breaks if DPO stretches unilaterally?",
    "Choices": {
      "A": "$480,000 released (DIO $140,000 + DSO $240,000 + DPO $100,000 at per-leg daily rates); unilateral DPO stretch without terms risks supply disruption that DIO/DSO gains cannot offset",
      "B": "$600,000 (20 days × $30,000 sales) — CCC days price at sales rate uniformly",
      "C": "No cash released — working-capital timing shifts never free cash, only re-time it",
      "D": "$1,200,000 (20 days × $60,000 combined daily flow) — all three legs stack at full rates"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Cash released: DIO -7 days at COGS daily rate $20,000 = $140,000 (inventory funds at cost); DSO -8 days at sales daily rate $30,000 = $240,000 (receivables fund at sales value); DPO +5 days at COGS rate $20,000 = $100,000 (payables fund purchases at cost). Total = $140,000 + $240,000 + $100,000 = $480,000 of permanently released cash (until growth re-traps it). Uniform-rate pricing (option B: 20 days at $30,000 = $600,000) misprices DIO/DPO legs at sales value. No-release claims (option C) deny that 20 fewer cycle days on $20,000-$30,000 daily flows free cash. Stacked-rate option D ($1,200,000 at $60,000 combined) double-counts days across legs with an invented rate. Business interpretation: price each CCC leg at its own daily flow (COGS for inventory/payables, sales for receivables) — and caveat DPO gains with supplier-terms risk. Common trap: uniform daily rates across heterogeneous legs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-111",
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
    "ExplanationWrongB": "Option B's $600,000 prices all 20 days at the $30,000 sales rate — DIO and DPO legs fund at COGS cost ($20,000/day), never sales value. Rate-per-leg discipline.",
    "ExplanationWrongC": "Option C denies release entirely — 20 fewer cycle days on $20,000–$30,000 daily flows frees $480,000 of previously trapped cash permanently (until growth re-traps it). Timing shifts at lower working levels are releases.",
    "ExplanationWrongD": "Option D's $1,200,000 stacks 20 days at a $60,000 combined rate — double-counting days across legs with an invented rate. Price each leg at its own daily flow.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.112 EOQ with safety stock budgeting",
    "MicroTopic": "EOQ safety stock budgeting",
    "UniqueConceptKey": "B-C112-EOQ-safety-stock-budgeting",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Annual demand 48,000 units, order cost $100, carrying cost $4/unit-year. Supplier lead time averages 10 days (σ 2 days); daily demand averages 131.5 units (σ 20). Service target 95% (z = 1.65). What are EOQ, safety stock, and reorder point?",
    "Choices": {
      "A": "EOQ 1,549 units; safety stock 446 units; ROP 1,761 units — independent-demand math with both variabilities",
      "B": "EOQ 1,549 units with zero safety stock — EOQ models assume certainty, so safety stock is always zero",
      "C": "EOQ 48,000 units (one annual order) — minimizes ordering cost absolutely",
      "D": "ROP 1,315 units (10-day demand only) — safety stock double-counts variability already in EOQ"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "EOQ = sqrt(2x48,000x100/4) = sqrt(2,400,000) = 1,549.19, about 1,549 units. Safety stock = 1.65 x sqrt(10x400 + 131.5-squared-x4) = 1.65 x sqrt(4,000 + 69,169) = 1.65 x 270.50 = 446.32, about 446 units. ROP = 10x131.5 + 446 = 1,315 + 446 = 1,761 units. Zero-safety-stock EOQ (option B) confuses lot-sizing certainty with demand certainty. Single-annual-order (option C: 48,000 units) minimizes ordering cost ($100) while maximizing carrying cost (24,000 average units x $4 = $96,000). Lead-time-only ROP (option D: 1,315) drops safety stock as double counting — EOQ sizes lots, safety stock covers variability; different jobs, both required. Business interpretation: let theory choose specification (through-origin where zero-means-zero for rates; full variance pooling for safety stock), then estimate within it. Common trap: fitting all data on completeness principle.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-112",
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
    "ExplanationWrongB": "Option B's zero safety stock confuses EOQ's certainty assumption (for lot sizing) with requirements planning (which faces real variability) — certainty inside EOQ never implies certainty in demand.",
    "ExplanationWrongC": "Option C's single annual order minimizes ordering cost ($100) while maximizing carrying cost (24,000 avg units × $4 = $96,000) — EOQ balances the two; extremes minimize neither total.",
    "ExplanationWrongD": "Option D's lead-time-only ROP (1,315) drops safety stock as 'double counting' — EOQ sizes lots, safety stock covers variability; different jobs, both required.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.113 JIT versus JIC budget tradeoffs",
    "MicroTopic": "JIT JIC budget tradeoffs",
    "UniqueConceptKey": "B-C113-JIT-JIC-budget-tradeoffs",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Current JIC: $200,000 average inventory ($8,000 carrying at 4%) with 99.2% fill rate. Proposed JIT: $40,000 inventory ($1,600 carrying) with 96.5% fill rate; each fill-rate point below 98% costs ~$25,000 in expediting/lost margin. Should operations switch, and what is the net?",
    "Choices": {
      "A": "Switch — $6,400 of carrying savings justify any fill-rate change",
      "B": "Stay JIC — fill rate never trades against carrying cost",
      "D": "Stay — JIT net is −$61,100 [($6,400 carrying saved) − ($67,500 fill-rate cost: 2.7 pts × $25,000)]; JIC's $8,000 carrying buys 99.2% service that JIT destroys",
      "C": "Switch with a $100,000 safety buffer — halfway inventories capture halfway benefits"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Carrying saved = $8,000 − $1,600 = $6,400/year. Fill-rate cost = (99.2% − 96.5%) = 2.7 points × $25,000 = $67,500/year. Net = $6,400 − $67,500 = −$61,100 — JIT destroys value here. Switch-on-savings (option A) prices $6,400 of carrying against unpriced service collapse. Never-trade (option B) states doctrine instead of arithmetic — trades clear when carrying savings exceed service costs (not here, but sometimes). Halfway buffer (option C) pays JIC-level inventory with JIT-level coordination complexity — worst of both architectures. Business interpretation: JIT/JIC decisions net carrying savings against fill-rate economics — compute both legs or decide on fashion. Common trap: treating inventory reduction as pure savings.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-113",
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
    "ExplanationWrongA": "Option A's switch saves $6,400 of carrying while destroying $67,500 of service economics — net −$61,100 presented as savings. Carrying-only framing.",
    "ExplanationWrongB": "Option B's never-trade doctrine refuses arithmetic — service levels trade against carrying costs wherever the numbers favor it (just not here, at −$61,100).",
    "ExplanationWrongC": "Option C's halfway buffer pays near-JIC inventory with JIT coordination overhead — halfway architectures capture neither system's economics.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.114 flexible budget with price index",
    "MicroTopic": "flexible budget price index",
    "UniqueConceptKey": "B-C114-flexible-budget-price-index",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 20,000 units, materials $10/unit ($200,000), labor $15/unit ($300,000), VOH $5/unit ($100,000). Actual: 22,000 units; materials $240,000; labor $340,000; VOH $115,000. A 5% general inflation index rose during the period. How should price versus efficiency be split, and what does the index change?",
    "Choices": {
      "A": "No index adjustment — flexible budgets use original standards, period",
      "B": "Spending variances only ($20,000 + $10,000 + $5,000 = $35,000 U); efficiency analysis requires physical measures unavailable here",
      "D": "At original standards: materials price +$20,000 U with efficiency $0 (22,000 × $10 = $220,000 vs $240,000; usage exactly standard); labor price +$10,000 U, efficiency $0; VOH +$5,000 U — then overlay: 5% index explains up to ~$30,000 of the $35,000 as inflation pass-through vs $5,000 controllable",
      "C": "Index-adjust all standards +5% first, then compute zero variances by construction"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Flexible at actual volume (original standards): materials 22,000 × $10 = $220,000 vs $240,000 → $20,000 U (all price — usage exactly 22,000 units, zero efficiency variance); labor 22,000 × $15 = $330,000 vs $340,000 → $10,000 U (all price); VOH 22,000 × $5 = $110,000 vs $115,000 → $5,000 U. Total $35,000 U, 100% price. Index overlay: 5% on the $600,000 flexible base ≈ $30,000 of general inflation — up to ~$30,000 of the $35,000 may be pass-through (uncontrollable) with ~$5,000 residual controllable. Standards-freeze absolutism (option A) reports $35,000 U without asking how much is inflation. Spending-only (option B) stops at labels ($20k/$10k/$5k) without the price/efficiency split the flexible budget exists to produce. Index-rebasing (option C) restates standards to actuals — zero variances by construction, zero information. Business interpretation: compute at original standards first (accountability baseline), then overlay the index as contextual analysis — rebase never, contextualize always. Common trap: rebasing standards to eliminate variances under review.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-114",
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
    "ExplanationWrongA": "Option A's standards-freeze reports $35,000 U without asking how much is 5% general inflation — accountability baselines need contextual overlays, not contextual blindness.",
    "ExplanationWrongB": "Option B stops at spending labels ($20k/$10k/$5k) without splitting price from efficiency — the flexible budget's core job (here: 100% price, 0% efficiency) goes undone.",
    "ExplanationWrongC": "Option C rebases standards +5% to manufacture zero variances — restating the baseline to actuals eliminates information by construction.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.115 control chart versus fixed threshold",
    "MicroTopic": "control chart fixed threshold",
    "UniqueConceptKey": "B-C115-control-chart-fixed-threshold",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Monthly expense variances (σ = $4,000): Jan +$3,000, Feb −$2,000, Mar +$11,000, Apr +$4,000. The $10,000 fixed rule flags March only. A control chart (±2σ = ±$8,000) flags March ($11,000) as out-of-control. Both agree here — but which system should govern going forward, and why does the agreement mislead?",
    "Choices": {
      "A": "Fixed $10,000 — agreement validates the threshold permanently",
      "B": "Control chart (±$8,000 with trend rules: 2-of-3 beyond 2σ... precisely 2-of-3 beyond ±2σ or 4-of-5 beyond ±1σ trigger) — agreement on one observation validates nothing; charts adapt to process variance while fixed rules blindly hold",
      "C": "Lower fixed to $8,000 — matching the chart's limit captures its value without chart complexity",
      "D": "Raise fixed to $12,000 — March was noise that both systems over-weighted"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Single-observation agreement proves nothing (both systems flag $11,000 — one by luck of threshold placement, one by distribution logic). The chart governs going forward because: (1) limits derive from process σ ($8,000 = 2σ), auto-calibrating when variance changes; (2) run rules (2-of-3 beyond 2σ, 4-of-5 beyond 1σ, 8-on-a-side) catch shifts fixed rules miss entirely (e.g., six straight +$7,000s = $42,000 of drift, zero fixed-rule flags); (3) fixed $10,000 is distribution-blind (right here by accident, wrong wherever σ differs). Threshold-matching (option C: lower to $8,000) copies the chart's number without its run rules or auto-calibration — numerology, not SPC. Agreement-permanence (option A) generalizes from n=1. Noise dismissal (option D: March as noise at $11,000 vs ±$8,000 limits) contradicts the distribution evidence. Business interpretation: govern by charts (distribution-aware, self-updating, run-sensitive), keep fixed rules only as backstops where SPC is impractical. Common trap: validating fixed thresholds by coincidental agreement.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-115",
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
    "ExplanationWrongA": "Option A's permanent validation from n=1 agreement generalizes a coincidence — fixed rules stay wrong wherever σ differs from the accident that aligned them here.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C copies $8,000 as a fixed threshold — the chart's number without its run rules or variance-tracking. Thresholds don't learn; charts do.",
    "ExplanationWrongD": "Option D dismisses $11,000 against ±$8,000 limits as noise — 2.75σ observations are assignable-cause evidence by definition, not noise.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.116 ratchet guard in participative budgets",
    "MicroTopic": "ratchet guard participative budgets",
    "UniqueConceptKey": "B-C116-ratchet-guard-participative-budgets",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division beat its budget 3 straight years by 8–10% (favorable), each followed by a ~9% budget cut ('ratcheting to actuals'). This year's draft requests +12% over last actual. Finance suspects padding against anticipated ratcheting. What mechanism breaks the cycle?",
    "Choices": {
      "A": "Ratchet harder — 12% cuts teach accurate forecasting fastest",
      "B": "Accept +12% — participation means trusting drafts",
      "D": "External benchmark anchor (industry cost-per-unit) plus a no-ratchet compact (budgets set from benchmarks, not prior actuals, for 3 years) plus shared savings split — breaks the pad-then-cut equilibrium with outside objectivity and credible commitment",
      "C": "Freeze budgets 3 years — stability ends gaming by removing annual stakes"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The pad-then-cut equilibrium: managers pad (+12% draft) because cuts follow beats (~9% ratchet); finance cuts because drafts pad. Breaking it needs external objectivity (industry cost-per-unit anchor — neither side's number) plus credible commitment (no-ratchet compact: budgets from benchmarks for 3 years, published and binding) plus shared savings (beat-the-benchmark gains split, so efficiency pays instead of getting confiscated). Harder ratcheting (option A: 12% cuts) intensifies padding incentives — the cycle's fuel. Blind trust (option B: +12%) funds the pad in full. Freezes (option C) lock stale numbers for 3 years while conditions move — stability without responsiveness. Business interpretation: ratchet equilibria break on outside anchors plus commitment devices plus shared gains — objectivity, credibility, and upside in one mechanism. Common trap: fighting gaming with stronger gaming incentives.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-116",
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
    "ExplanationWrongA": "Option A's harder ratcheting (12% cuts) intensifies the padding it punishes — the cycle's fuel presented as its cure. Stronger ratchets buy better-hidden pads.",
    "ExplanationWrongB": "Option B trusts +12% drafts as participation — funding pad in full while the ratchet threat that motivated it stands. Trust without commitment reform is credulity.",
    "ExplanationWrongC": "Option C's 3-year freeze locks stale numbers while conditions move — gaming pauses only because stakes pause; responsiveness dies with them.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.117 beyond budgeting suitability screen",
    "MicroTopic": "beyond budgeting suitability screen",
    "UniqueConceptKey": "B-C117-beyond-budgeting-suitability-screen",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A volatile-tech division (40% forecast error, 6-month product cycles) and a stable-utility division (5% error, 20-year assets) both run rigid annual budgets with gaming markers. The CFO proposes beyond budgeting (rolling forecasts, relative targets, decentralized allocation) for both. What is the correct scoping?",
    "Choices": {
      "A": "Both — beyond budgeting suits every organization equally by principle",
      "B": "Neither — annual budgets with gaming markers need enforcement, not philosophy",
      "D": "Tech division only — 40% error plus 6-month cycles make annual fixed targets destructive; the stable division's 5% error and long assets suit annual budgets (fix its gaming with targets, not architecture)",
      "C": "Utility division only — stability deserves innovation budgets first"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Suitability screens on volatility and clockspeed: tech (40% error, 6-month cycles) — annual fixed targets expire before ink dries, gaming markers signal target toxicity; rolling forecasts + relative targets + decentralized reallocation fit high-uncertainty clockspeed. Utility (5% error, 20-year assets) — annual budgets work (forecastable, long-horizon); its gaming markers need target redesign (relative/benchmark-anchored), not architecture replacement. Universal prescription (option A) rebuilds a working system alongside a broken one. Enforcement-only (option B) polices gaming without asking whether fixed targets cause it (in tech, they do). Utility-first (option C) innovates where annual budgets already fit while leaving tech's destructive targets in place — precisely backwards prioritization. Business interpretation: match budgeting architecture to uncertainty clockspeed — beyond budgeting where volatility breaks fixed targets, fixed budgets where stability sustains them. Common trap: prescribing architectures by principle instead of by fit.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-117",
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
    "ExplanationWrongA": "Option A's universal prescription rebuilds the utility's working annual system alongside tech's broken one — architecture follows fit (volatility × clockspeed), never principle alone.",
    "ExplanationWrongB": "Option B enforces gaming-plagued annual targets in tech without asking whether fixed targets cause the gaming (40% error says they do). Enforcement polishes a destructive architecture.",
    "ExplanationWrongC": "Option C innovates the stable division first while tech's 40%-error targets keep destroying value — backwards prioritization by comfort instead of by need.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.118 rolling horizon selection",
    "MicroTopic": "rolling horizon selection",
    "UniqueConceptKey": "B-C118-rolling-horizon-selection",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Two businesses: semiconductors (9-month visibility, 3-month lead times) and shipbuilding (36-month visibility, 18-month lead times). Finance proposes a uniform 12-month rolling horizon for both. What horizons should govern?",
    "Choices": {
      "A": "Uniform 12 months — comparability across divisions requires identical horizons",
      "D": "Semis 12 months (visibility 9 + lead 3); shipbuilding 48–54 months (visibility 36 + lead 18, rounded to planning buckets) — horizons cover visibility plus lead time per business",
      "C": "Semis 3 months, shipbuilding 18 months — lead times alone set horizons",
      "B": "Semis 9 months, shipbuilding 36 months — visibility alone sets horizons, lead times are operational detail"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Horizon rule: visibility window plus procurement lead time (decisions made today must cover what is foreseeable plus what is committable). Semis: 9 + 3 = 12 months. Shipbuilding: 36 + 18 = 54 months (bucketed 48–54 by planning calendar). Uniform 12 (option A) blinds shipbuilding to 42 months of visible, committable future — comparability purchased with strategic blindness. Lead-only (option C: 3/18) drops visibility (what's foreseeable shapes commitments). Visibility-only (option B: 9/36) drops lead time (commitments made today land after visibility ends — unplannable tail). Business interpretation: horizons = visibility + lead, per business clockspeed — uniform horizons fit uniform businesses only. Common trap: comparability-through-uniformity in heterogeneous operations.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-118",
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
    "ExplanationWrongA": "Option A's uniform 12 blinds shipbuilding to 42 months of visible committable future — comparability across divisions never justifies strategic blindness in one.",
    "ExplanationWrongB": "Option B's visibility-only (9/36) drops lead times — commitments made today land past visibility's end, leaving an unplannable tail where procurement actually happens.",
    "ExplanationWrongC": "Option C's lead-only (3/18) drops visibility — foreseeable demand shapes commitments; lead times alone plan procurement without purpose.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.119 materiality threshold design",
    "MicroTopic": "materiality threshold design",
    "UniqueConceptKey": "B-C119-materiality-threshold-design",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget variances: 200 line items, σ = $2,000 each, roughly independent. The $5,000 fixed investigation rule flags ~40 items/quarter consuming 120 review hours. The controller suspects most flags are noise. What threshold system should govern?",
    "Choices": {
      "A": "Keep $5,000 — stability beats recalibration churn",
      "D": "Risk-tiered thresholds ($2,000 volatile/critical lines, $8,000 stable lines) plus a $50,000 aggregate stop-loss review — allocate 120 hours by risk, not by fixed dollars; roughly halves noise flags while covering aggregates",
      "C": "Raise to $10,000 — halves flags by definition, solving the load problem",
      "B": "Lower to $2,000 — more flags mean more assurance, and hours expand to meet need"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Fixed-dollar thresholds ignore line risk: $5,000 on 200 lines with σ = $2,000 flags ~2.5σ+ events plus noise tails — roughly 40/quarter at high noise content. Risk-tiering ($2,000 on volatile/critical lines where small moves signal, $8,000 on stable lines where noise dominates) reallocates the same 120 hours toward informative flags. The $50,000 aggregate stop-loss catches correlated drift that line thresholds miss individually (200 lines × small same-direction moves = material aggregate). Keep-as-is (option A) defends noise-flagging on stability grounds. Raise-to-$10,000 (option C) halves flags by hiding real line-level signals with the noise. Lower-to-$2,000 (option B) multiplies noise flags until review hours explode. Business interpretation: threshold systems tier by line risk with aggregate backstops — fixed dollars tier nothing and backstop nothing. Common trap: tuning single thresholds instead of tiering the system.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-119",
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
    "ExplanationWrongA": "Option A's stability defense keeps flagging ~40/quarter mostly-noise — stability in a noisy system is persistent waste with a calm name.",
    "ExplanationWrongB": "Option B's $2,000 threshold multiplies noise flags until 120 hours explode past capacity — more flags without better precision is load without assurance.",
    "ExplanationWrongC": "Option C's $10,000 halves flags by hiding real line signals with noise — threshold-raising without tiering discards information indiscriminately.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.120 forecast value added analysis",
    "MicroTopic": "forecast value added analysis",
    "UniqueConceptKey": "B-C120-forecast-value-added-analysis",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Naive forecast (last-period actual) MAPE is 8%. Statistical model MAPE is 6%. Judgmental adjustments by planners achieve MAPE 7%. Each planning FTE costs $120,000/year; the statistical system costs $50,000/year; forecast-error cost is $200,000 per MAPE point on $50M revenue. What should the forecast process be?",
    "Choices": {
      "A": "Naive only — zero process cost beats all modeled alternatives",
      "B": "Statistical plus judgmental review gates (not blanket adjustments): 6% base with gated overrides for documented intelligence — $400,000 error-cost improvement over naive ($2pts × $200,000) for $50,000 system cost, then judgment adds value only where gated evidence clears",
      "C": "Judgmental only — human insight beats models at turning points, so 7% with full staffing suffices",
      "D": "Statistical plus mandatory judgmental adjustment on every line — two heads beat one model"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Value-added analysis prices each step: naive 8% → statistical 6% saves 2 points × $200,000 = $400,000/year for $50,000 system cost (8× return). Judgmental blanket adjustments (7%) DESTROY $200,000 of model value (6% → 7%) at full FTE cost — ungated judgment is negative value-added. Gated overrides (documented intelligence only: known customer wins/losses, confirmed disruptions) preserve the 6% base while adding judgment where evidence clears a gate. Naive-only (option A) saves $50,000 of system cost to spend $400,000 of error. Judgment-only (option C) pays full staffing for 7% (worse than the model's 6% at $50,000). Mandatory adjustment (option D) forces value-destroying touches on every line. Business interpretation: forecast value added measures each process step against the naive baseline — fund steps with positive FVA, gate or cut steps with negative FVA. Common trap: staffing judgment as a complement when it measures as a substitute.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-BC-120",
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
    "ExplanationWrongA": "Option A's naive-only saves $50,000 of system cost to spend $400,000 of error (8% vs 6%) — process savings that cost 8× in accuracy.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's judgment-only pays full FTE staffing for 7% (worse than the model's 6% at $50,000) — staffing a substitute that underperforms the system it replaces.",
    "ExplanationWrongD": "Option D mandates judgmental touches on every line, forcing value-destroying adjustments (6% → 7% measured) across the full forecast. Gates admit judgment where evidenced; mandates admit it everywhere including where it harms.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE11B;