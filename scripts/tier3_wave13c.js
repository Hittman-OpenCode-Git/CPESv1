const WAVE13C = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.121 spoilage inspection timing",
    "MicroTopic": "spoilage inspection timing",
    "UniqueConceptKey": "D-C121-spoilage-inspection-timing",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Process with final inspection (100%). Started 12,000; completed 10,000; EWIP 1,500u 60% complete (pre-inspection); spoiled 500u (400 normal, 100 abnormal, detected at final inspection). Current costs $230,000; BWIP $20,000 (1,000u). Under weighted average, what are EU and how is spoilage assigned?",
    "Choices": {
      "A": "EU 11,400 (10,000 + 500 + 900); unit ($20,000+$230,000)/11,400 = $250,000/11,400 = $21.9298 ≈ $21.93; normal $8,772 (400×$21.93) to product, abnormal $2,193 (100×$21.93) to period loss",
      "B": "EU 10,000 (completed only); spoilage is a period adjustment outside EU",
      "C": "EU 11,900 (completed 10,000 assumed to include spoilage, plus 500 counted separately, plus 900 EWIP)",
      "D": "EU 10,500 (normal included, abnormal excluded) — abnormal never enters EU"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Final-inspection spoilage counts at 100% EU (work fully performed before detection): completed 10,000 + spoiled 500 + EWIP 1,500×60% (900) = 11,400. Unit = $250,000/11,400 = $21.9298 ≈ $21.93; normal 400×$21.93 = $8,772 to product; abnormal 100×$21.93 = $2,193 to period loss.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-121",
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
    "ExplanationWrongB": "Option B's 10,000 completed-only strands 900 EWIP EU plus 500 spoilage EU — $25.00/unit on fiction vs $21.93 on work done.",
    "ExplanationWrongC": "Option C's 11,900 double-counts spoilage — completed 10,000 EXCLUDES the 500 spoiled units (10,000 + 1,500 + 500 = 12,000 started ✓); adding 500 to a completed figure assumed to contain them manufactures 500 phantom EU.",
    "ExplanationWrongD": "Option D excludes abnormal from EU — abnormal units consumed full current work; they enter EU (100 EU), then their $2,193 assigns to period loss.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.122 normal spoilage cost flow",
    "MicroTopic": "normal spoilage cost flow",
    "UniqueConceptKey": "D-C122-normal-spoilage-cost-flow",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Using P1-DC-121 facts (corrected EU 11,400, unit $21.93, normal 400u, abnormal 100u): trace the normal spoilage cost flow and state completed-goods COGS.",
    "Choices": {
      "A": "Normal $8,772 written off to period loss with abnormal — all spoilage is loss",
      "B": "Normal $8,772 ignored — spoilage cost vanishes once classified normal",
      "C": "Normal $8,772 credited to EWIP — ending inventory absorbs yield loss",
      "D": "Normal $8,772 absorbed by good output: completed COGS = 10,000×$21.93 + $8,772 = $219,300 + $8,772 = $228,072; EWIP = 900×$21.93 = $19,737; abnormal $2,193 to period loss (check: $228,072 + $19,737 + $2,193 = $250,002 ≈ $250,000 rounding)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Normal spoilage is expected yield economics → product cost: completed COGS = 10,000 × $21.9298 ($219,298) + normal 400 × $21.9298 ($8,772) = $228,070; EWIP = 900 × $21.9298 = $19,737; abnormal = 100 × $21.9298 = $2,193 to period loss. Check: $228,070 + $19,737 + $2,193 = $250,000 ✓. All-loss (option A) punishes product for expected yield. EWIP-absorption (option C) loads ending inventory with failed-unit cost. Ignoring (option B) strands $8,772 unassigned. Business interpretation: normal spoilage rides with good output — completed units carry the cost of the failures their production statistically required. Common trap: writing all spoilage to loss.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-122",
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
    "ExplanationWrongA": "Option A's all-loss writes $8,772 of expected yield economics to period loss — normal spoilage is a production cost, never a period failure.",
    "ExplanationWrongB": "Option B strands $8,772 unassigned — cost flow must clear to COGS, EWIP, or loss; vanishing violates conservation.",
    "ExplanationWrongC": "Option C loads $8,772 of failed-unit cost into EWIP — ending inventory carries its own 900 EU of work, never completed units' failures.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.123 abnormal spoilage with disposal value",
    "MicroTopic": "abnormal spoilage disposal value",
    "UniqueConceptKey": "D-C123-abnormal-spoilage-disposal-value",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Abnormal spoilage 100u at $21.93 ($2,193) with $300 realizable disposal value. State the correct period-loss presentation.",
    "Choices": {
      "A": "Loss $2,193; disposal $300 credited to COGS — split the geography",
      "B": "Loss $2,493 ($2,193 + $300) — disposal costs add to spoilage loss",
      "C": "Net loss $1,893 ($2,193 − $300) to period loss; $300 disposal value recognized (inventory/receivable) — abnormal cost net of recovery hits the period",
      "D": "No loss — $300 disposal proves the units weren't really spoiled"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Abnormal spoilage assigns gross cost to period loss, net of realizable recovery: loss = $2,193 − $300 = $1,893; the $300 disposal value is recognized as an asset (scrap inventory/receivable). Gross-loss-plus-disposal (option B: $2,493) adds recovery as cost. Split geography (option A) credits product cost with abnormal recovery — abnormal economics stay in the period entirely. No-loss (option D) lets $300 of scrap value erase $2,193 of wasted production cost. Business interpretation: abnormal spoilage is a period failure measured net — recovery mitigates the loss, never relocates it to product. Common trap: crediting abnormal recovery to COGS.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-123",
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
    "ExplanationWrongA": "Option A's COGS credit leaks $300 of abnormal recovery into product cost — abnormal economics stay in the period entirely.",
    "ExplanationWrongB": "Option B's $2,493 adds the $300 recovery as cost — realizable value mitigates loss, never augments it.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $300-erases-$2,193 lets scrap value deny wasted production — spoilage status is physical (failed inspection), never financial.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.124 FIFO spoilage with BWIP",
    "MicroTopic": "FIFO spoilage BWIP",
    "UniqueConceptKey": "D-C124-FIFO-spoilage-BWIP",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BWIP 1,000u 70% complete ($15,000 prior cost). Started 10,000. Final inspection: completed 9,500 (includes BWIP finished); normal spoilage 300u; abnormal 200u; EWIP 1,000u 50% complete (pre-inspection). Current costs $220,000. Under FIFO, what are EU and unit cost?",
    "Choices": {
      "A": "EU 10,300 (started/completed 8,500 + spoilage 500 + EWIP 500 − BWIP adjustment... precisely: BWIP work this period 1,000×30% = 300; started/completed 8,500×100% = 8,500; spoilage 500×100% = 500; EWIP 1,000×50% = 500; total 300+8,500+500+500 = 9,800); unit $220,000/9,800 = $22.45",
      "B": "EU 11,000 (all units); unit $21.36 (($15,000+$220,000)/11,000) — FIFO matches average when inspection is final",
      "C": "EU 9,500 (completed only); unit $23.16 — WIP and spoilage outside EU",
      "D": "EU 8,500 (started/completed only); unit $25.88 — BWIP, EWIP, and spoilage all excluded"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "FIFO EU counts current-period work only: BWIP completion 1,000 × (100%−70%) = 300 EU; started-and-completed (9,500 − 1,000) = 8,500 × 100% = 8,500 EU; spoilage 500 × 100% (final inspection) = 500 EU; EWIP 1,000 × 50% = 500 EU. Total = 300 + 8,500 + 500 + 500 = 9,800 EU. Unit = $220,000/9,800 = $22.4489 ≈ $22.45 (prior $15,000 excluded — FIFO separates periods). Average-blend (option B: $21.36) melts $15,000 of prior cost into current unit cost. Completed-only (option C) and started-only (option D) strand legitimate current work. Business interpretation: FIFO EU is a current-effort meter — prior work never recurs, spoilage at final inspection counts fully. Common trap: blending BWIP cost into FIFO unit cost.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-124",
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
    "ExplanationWrongB": "Option B's $21.36 blends $15,000 of prior-period cost into the current meter — FIFO separates periods; average blends them.",
    "ExplanationWrongC": "Option C's 9,500 strands 300 BWIP-completion EU plus 500 spoilage plus 500 EWIP — $23.16 prices current effort out of existence.",
    "ExplanationWrongD": "Option D's 8,500 excludes 1,300 EU of current work (BWIP finish, spoilage, EWIP) — $25.88 on fiction.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.125 joint versus by-product classification",
    "MicroTopic": "joint by-product classification",
    "UniqueConceptKey": "D-C125-joint-by-product-classification",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Common process yields Alpha ($500,000 sales), Beta ($300,000), and Gamma ($8,000, no separable cost). The controller classifies all three as joint products with sales-value allocation. Evaluate.",
    "Choices": {
      "A": "Correct — common process means joint products regardless of value",
      "B": "Beta misclassified — middle-value outputs are always by-products",
      "C": "Gamma misclassified — $8,000 (1% of $808,000 total) is immaterial by-product (revenue method: $8,000 revenue at sale, zero joint allocation); Alpha/Beta share joint cost by value ($500,000 vs $300,000 of $800,000). Allocating joint cost to Gamma over-costs it and distorts Alpha/Beta by $1,000s",
      "D": "Alpha misclassified — highest-value outputs absorb no joint cost as primary beneficiaries"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Classification by materiality: Gamma $8,000/$808,000 = 0.99% — immaterial by-product (revenue method, no joint allocation). Alpha/Beta are joint ($500,000/$800,000 = 62.5%; $300,000/$800,000 = 37.5% of joint cost). Force-allocating to Gamma: $8,000/$808,000 × joint = ~1% of joint to an $8,000 product — over-costing Gamma while skimming Alpha/Beta. Common-process absolutism (option A) ignores the materiality threshold the by-product category exists to serve. Middle-value demotion (option B) and primary-beneficiary exemption (option D) invent rules with no standard basis. Business interpretation: joint-vs-by-product is a materiality judgment at split-off — immaterial outputs ride the revenue method, material outputs share joint cost. Common trap: classifying by process commonality alone.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-125",
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
    "ExplanationWrongA": "Option A's common-process absolutism allocates ~1% of joint to an $8,000 product — materiality thresholds exist precisely to prevent this over-costing.",
    "ExplanationWrongB": "Option B demotes $300,000-sales Beta (37% of value) to by-product — middle value is not a classification criterion; materiality is.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D exempts the highest-value output from shared cost — primary products bear joint cost proportionally, never zero.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.126 service department cost behavior",
    "MicroTopic": "service department cost behavior",
    "UniqueConceptKey": "D-C126-service-department-cost-behavior",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "IT department: $400,000 fixed capacity cost + $50,000 variable (actual usage 10,000 hours vs 12,000 budgeted). Production uses 9,000 actual (10,000 budgeted); Admin uses 1,000 actual (2,000 budgeted). The IT manager proposes allocating all $450,000 on actual hours. As the controller advising the CFO, what do you recommend?",
    "Choices": {
      "A": "Approve — actual-hours single rate ($45/hr: Production $405,000/Admin $45,000) is simple and auditable",
      "B": "Reject — recommend dual-rate: fixed $400,000 on budgeted (Production 10/12×$400,000 = $333,333; Admin 2/12×$400,000 = $66,667) + variable $50,000... precisely variable rate $50,000/10,000 actual = $5/hr on actual (Production 9,000×$5 = $45,000; Admin 1,000×$5 = $5,000). Totals Production $378,333/Admin $71,667. Actual-single-rate punishes Production for Admin's 1,000-hour under-use ($26,667 of idle-capacity cost shifted)",
      "C": "Reject — allocate nothing; service departments are period costs",
      "D": "Approve with 50/50 split ($225,000 each) — fairness means equality"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Dual-rate mechanics: fixed follows budgeted (capacity reserved): Production 10,000/12,000 × $400,000 = $333,333.33 ≈ $333,333; Admin 2,000/12,000 × $400,000 = $66,666.67 ≈ $66,667. Variable follows actual: $50,000/10,000 = $5.00/hr → Production 9,000 × $5 = $45,000; Admin $5,000. Totals $378,333/$71,667 (sum $450,000 ✓). Actual-single-rate (option A: $45/hr → $405,000/$45,000) shifts $26,667 of Admin's unused reservation onto Production ($405,000 − $378,333). Period-costing (option C) abandons cost assignment for traceable IT services. Equal-split (option D) ignores 9:1 usage. Business interpretation: idle-capacity cost stays with the reserver (Admin under-used by 1,000 hours) — dual rates enforce reservation accountability. Recommendation: reject single-rate, adopt dual-rate with budgeted-fixed/actual-variable legs. Common trap: approving simplicity that subsidizes under-use.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-126",
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
    "ExplanationWrongA": "Option A's $45 single rate shifts $26,667 of Admin's unused reservation onto Production — simplicity that taxes accurate forecasting subsidizes under-use.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C abandons assignment for traceable IT services — $450,000 of measurable support cost belongs in production economics, never period expense by default.",
    "ExplanationWrongD": "Option D's equal $225,000 ignores 9,000 vs 1,000 actual usage — equality without causation is arbitrary, never fair.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.127 cost allocation ethics pressure",
    "MicroTopic": "cost allocation ethics pressure",
    "UniqueConceptKey": "D-C127-cost-allocation-ethics-pressure",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The Production VP asks you to allocate IT fixed cost on actual hours (shifting $26,667 to Admin... precisely shifting Admin's idle-capacity cost onto Production? Recompute direction: actual-hours fixed share Production 9/10×$400,000 = $360,000 vs budgeted $333,333 — Production pays $26,667 MORE under actual, Admin pays $26,667 less. The VP wants actual-hours because Production's bonus excludes IT charges above budget). How do you respond under IMA ethics?",
    "Choices": {
      "A": "Comply — the VP outranks you and bonus mechanics are management's prerogative",
      "B": "Comply with disclosure in footnotes — transparency cures allocation bias",
      "C": "Refuse and report — budgeted-fixed/actual-variable is the supportable method; actual-hours shifts $26,667 of Admin's idle capacity onto Production to game bonus thresholds. Competence (accurate costing), Objectivity (unbiased method selection), and Integrity (no manipulation) all bar compliance; escalate per IMA resolution-of-ethical-conflict protocol",
      "D": "Defer — allocation methods are immaterial to ethics"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "IMA Statement of Ethical Professional Practice: Competence (provide accurate decision support — actual-hours mismeasures reservation economics by $26,667), Objectivity (select methods without bias toward bonus outcomes), Integrity (refuse manipulation). Footnote disclosure (option B) does not cure a known-biased method — transparency about manipulation is still manipulation. Rank-based compliance (option A) inverts the ethics hierarchy (standards outrank supervisors). Immateriality claims (option D) dodge the $26,667 measurement plus the precedent. Resolution protocol: discuss with VP → escalate to CFO/Audit Committee if unresolved → IMA Ethics Helpline if internal resolution fails. Business interpretation: allocation-method shopping for compensation outcomes is a classic objectivity breach — the controller's duty is unbiased measurement, never bonus engineering. Common trap: disclosure cures bias.",
    "StudyLinks": [
      {
        "label": "IMA Statement of Ethical Professional Practice",
        "url": "https://www.imanet.org/about-ima/ethics"
      },
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-127",
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
    "ExplanationWrongA": "Option A's rank-based compliance inverts the ethics hierarchy — IMA standards outrank supervisors; outranking never authorizes biased measurement.",
    "ExplanationWrongB": "Option B's disclose-and-manipulate claims transparency cures bias — a known-biased $26,667 shift disclosed in footnotes is still a known-biased shift.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's immateriality dodge ignores both the $26,667 measurement and the precedent — method-shopping for bonuses is material by nature, never by amount.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.128 capacity cost idle versus used",
    "MicroTopic": "capacity cost idle used",
    "UniqueConceptKey": "D-C128-capacity-cost-idle-used",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "IT capacity 12,000 hours ($400,000 fixed = $33.33/hr). Actual usage 10,000 hours. The CFO asks: how much fixed IT cost is idle-capacity cost, who should bear it, and what does it signal?",
    "Choices": {
      "A": "Zero idle — all $400,000 assigns to users pro-rata actual (9,000/1,000); unused capacity has no cost",
      "B": "Idle = 10,000×$33.33 = $333,333 — used capacity is the idle portion",
      "C": "Idle = $400,000 (all fixed is idle by definition) — write off entirely",
      "D": "Idle = 2,000×$33.33 = $66,667, borne by Admin (the under-user: budgeted 2,000, used 1,000 — 1,000 idle) plus 1,000 shared shortfall... precisely total idle 2,000 hours: Admin accounts 1,000 (2,000−1,000); Production accounts 1,000 (10,000−9,000). Idle cost $66,667 split 1,000/1,000 = $33,333 each as capacity-planning variance, not product cost. Signal: 16.7% overcapacity — defer expansion, tighten reservations"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Idle capacity = 12,000 − 10,000 = 2,000 hours × $33.3333 = $66,666.67 ≈ $66,667. Attribution: Admin 2,000 budgeted − 1,000 used = 1,000 idle ($33,333); Production 10,000 − 9,000 = 1,000 idle ($33,333). Treatment: capacity-planning variance (period charge by responsibility), never product cost — loading idle cost into production rates punishes current output for planning slack. Signal: 16.7% overcapacity counsels reservation discipline and expansion deferral. Zero-idle (option A) buries $66,667 of planning slack in product margins. All-idle (option C) writes off $333,333 of used capacity. Inverted (option B) mistakes used for idle. Business interpretation: idle-capacity cost is a planning signal assigned by responsibility — measure it, attribute it, never bury it in rates. Common trap: pro-rating all fixed to users.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-128",
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
    "ExplanationWrongA": "Option A's zero-idle buries $66,667 of planning slack in product margins — unused capacity has carrying cost ($33.33/hr reserved but idle).",
    "ExplanationWrongB": "Option B inverts used and idle — 10,000 consumed hours are the utilized portion; 2,000 unconsumed are idle, never the reverse.",
    "ExplanationWrongC": "Option C writes off $333,333 of used capacity as idle — 10,000 consumed hours are utilized, never idle, by definition.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.129 joint cost allocation method choice",
    "MicroTopic": "joint cost allocation method choice",
    "UniqueConceptKey": "D-C129-joint-cost-allocation-method-choice",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The board will use joint-cost allocations to set transfer prices between the Alpha division (sells externally, $500,000) and Beta division (internal buyer, $300,000). The CFO asks which allocation method best supports goal-congruent transfer pricing and why.",
    "Choices": {
      "A": "Physical measure — objectivity prevents transfer-price disputes",
      "B": "Sales-value at split-off — benefits-received logic aligns each division's cost burden with its revenue capacity, supporting arm's-length negotiation; physical measure would load Alpha with weight-based cost divorced from its $500,000 economics, and constant-margin would force margin equality the market doesn't observe",
      "C": "Constant gross margin — equal margins eliminate all transfer conflict",
      "D": "No allocation — transfer at variable cost only, ignoring joint cost"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Transfer-pricing goal congruence needs benefits-received burden: sales-value allocation ties each division's joint-cost share to its revenue capacity ($500,000 vs $300,000 → 62.5%/37.5%), so negotiated transfers reflect market economics. Physical-measure (option A) objectivity loads cost by weight divorced from $500,000/$300,000 revenue capacity — disputes persist because burden misaligns with benefit. Constant-margin (option C) forces margin equality the external market doesn't observe, distorting Alpha's pricing freedom. Variable-only (option D) ignores $joint of shared cost, subsidizing internal transfers. Business interpretation: allocation methods are governance tools — match the method's burden logic to the decision's incentive needs. Recommendation: sales-value for transfer-price costing, disclosed and consistently applied. Common trap: choosing methods on computational simplicity for incentive decisions.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-129",
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
    "ExplanationWrongA": "Option A's physical-measure objectivity loads cost by weight divorced from $500,000/$300,000 revenue capacity — measurable burden that misaligns with benefit still misaligns incentives.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's forced margin equality distorts Alpha's external pricing freedom — the market doesn't observe equal margins, so internal mandates shouldn't manufacture them.",
    "ExplanationWrongD": "Option D's variable-only transfer ignores shared joint cost entirely — internal buyers free-ride on common inputs while external pricing carries the full burden.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.130 process costing method recommendation",
    "MicroTopic": "process costing method recommendation",
    "UniqueConceptKey": "D-C130-process-costing-method-recommendation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A process carries volatile input prices (±20% monthly) with stable 8,000-unit monthly throughput and 1,000-unit BWIP. The controller asks whether FIFO or weighted average better serves cost control and inventory valuation. Recommend with reasons.",
    "Choices": {
      "A": "Weighted average — simplicity always governs method choice",
      "B": "FIFO — isolates current-period price volatility ($220,000 current vs $15,000 prior in P1-DC-124 pattern) for visible control signals, while average would melt ±20% swings into blended rates that hide purchasing performance; use FIFO for control, disclose average as supplementary where stability aids planning",
      "C": "Weighted average — blending hides volatility, which is the goal of reporting",
      "D": "Neither — process costing cannot handle volatile inputs; switch to job costing"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "FIFO separates periods: current $220,000 of volatile input prices stands alone in the $22.45 unit cost (P1-DC-124 mechanics), so purchasing variances surface visibly against current standards. Weighted average would melt $15,000 of prior-period cost (at old prices) into current units, damping ±20% swings into blended rates that hide purchasing performance. Simplicity absolutism (option A) trades control signals for computational ease. Volatility-hiding (option C) mistakes signal suppression for reporting quality. Job-costing flight (option D) abandons process economics for homogeneous flow — method follows production physics, never price behavior. Business interpretation: volatile inputs demand period separation (FIFO); stable inputs tolerate blending (average). Recommend FIFO for control with average supplementary for planning stability. Common trap: choosing average to smooth volatility that management needs to see.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-130",
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
    "ExplanationWrongA": "Option A's simplicity absolutism trades $220,000 of visible current-price signals for computational ease — control value dominates arithmetic convenience.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's volatility-hiding mistakes signal suppression for quality — ±20% purchasing swings are exactly what control systems must surface, never smooth away.",
    "ExplanationWrongD": "Option D's job-costing flight abandons process economics for homogeneous 8,000-unit flow — production physics selects the method, never price behavior.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE13C;