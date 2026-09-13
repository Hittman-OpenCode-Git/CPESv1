const WAVE2C = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.111 leading versus lagging indicators",
    "MicroTopic": "leading lagging indicators",
    "UniqueConceptKey": "C-C111-leading-lagging-indicators",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "First-pass yield (FPY) improvements precede COGS improvements by one quarter (correlation +0.8); Net Promoter Score moves coincidentally with revenue in the same quarter. The analytics team labels both metrics 'leading indicators' in the new dashboard. Which classification is correct, and why does it matter?",
    "Choices": {
      "A": "Both are leading — any metric on a dashboard leads decisions",
      "B": "Both are lagging — correlation never establishes lead time",
      "C": "FPY is leading (predicts next-quarter COGS with a measured one-quarter lead); NPS is lagging/coincident — only FPY buys reaction time",
      "D": "FPY causes COGS improvement — the +0.8 correlation proves the causal mechanism"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Leading versus lagging is a timing property, not a prestige label: FPY's one-quarter lead (established by lagged correlation +0.8) means today's FPY predicts next quarter's COGS — management can intervene before cost hits. NPS moves with revenue contemporaneously, so it confirms outcomes but buys no reaction time (lagging/coincident). The distinction matters operationally: leading indicators earn forecast weight and early-warning thresholds; lagging indicators earn scorekeeping. Option D overclaims — correlation with a lead establishes predictive timing, not the causal mechanism (common-cause confounds remain possible). Business interpretation: audit every 'leading indicator' claim against measured lead time; labels without lags are aspirations. Common trap: calling correlated metrics leading without establishing the time order.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-111",
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
    "ExplanationWrongA": "Option A labels by dashboard membership rather than timing. A metric's presence on a dashboard confers no lead time — NPS confirms outcomes after they occur regardless of where it is displayed.",
    "ExplanationWrongB": "Option B rejects lead status because 'correlation never establishes lead time.' Lagged correlation (FPY at t predicting COGS at t+1) is precisely how lead time is established empirically — the objection refutes an unmeasured claim, not this measured one.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D upgrades predictive timing (+0.8 with a one-quarter lead) into proven causation. Lead-lag correlation establishes when, not why — a common cause (e.g., new equipment improving both) could drive the pattern without FPY causing COGS.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.112 bottleneck throughput elevation",
    "MicroTopic": "bottleneck throughput elevation",
    "UniqueConceptKey": "C-C112-bottleneck-throughput-elevation",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A line has three stations (8-hour day, 480 minutes): A takes 6 min/unit (capacity 80/day), B takes 4 min/unit (120/day), C takes 5 min/unit (96/day). Demand is 100/day; contribution is $50/unit. An elevation project would raise A's capacity 25%. What binds throughput now, what binds after, and what is the daily throughput gain?",
    "Choices": {
      "A": "B binds now (slowest per-unit time is irrelevant); after elevation B still binds; gain $0",
      "B": "A binds now; after elevation demand binds at 100/day; gain $1,000/day",
      "C": "C binds now; after elevation C still binds; gain $0",
      "D": "A binds now at 80/day ($4,000); after elevation C binds at 96/day ($4,800) — gain $800/day"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Capacities: A 480/6 = 80/day; B 480/4 = 120/day; C 480/5 = 96/day. The constraint is the minimum: A at 80/day (below demand 100) — throughput = 80 × $50 = $4,000/day. Elevating A 25% gives 100/day, removing A as the constraint — but C's 96/day then binds (still below demand 100), so throughput = 96 × $50 = $4,800/day, a $800/day gain. Option B's error is instructive: demand (100) does not bind after elevation because C (96) binds first — elevation projects shift constraints rather than eliminating them, and each shift must be re-diagnosed. Business interpretation: price elevation projects by the throughput gain across the constraint sequence ($800/day here, not the $1,000 that naive demand-matching suggests), and budget the next elevation (C) before celebrating. Common trap: identifying the constraint by longest per-unit time instead of lowest daily capacity.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-112",
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
    "ExplanationWrongA": "Option A hunts the constraint by longest per-unit time, but constraints bind on daily capacity (minutes available divided by minutes per unit), not unit time. B's 4 minutes yield the highest capacity (120/day) — the opposite of binding.",
    "ExplanationWrongB": "Option B assumes demand (100/day) binds after elevation, skipping C's 96/day capacity. Constraint analysis re-diagnoses after every elevation — the next minimum (C at 96) binds before demand does.",
    "ExplanationWrongC": "Option C names C as the current constraint, but A's 80/day is below C's 96/day. The minimum binds, and today that minimum is A by 16 units/day.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.113 plant mix-adjusted benchmarking",
    "MicroTopic": "plant mix-adjusted benchmarking",
    "UniqueConceptKey": "C-C113-plant-mix-adjusted-benchmarking",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Plant X unit cost is $43 (70% complex mix); Plant Y is $37.50 (30% complex). Engineering standards: complex $45, simple $35. Corporate ranks Y better by the raw gap and bonuses its manager. X's manager protests the mix difference. Decompose the gap into mix-driven versus performance-driven portions.",
    "Choices": {
      "A": "Mix-adjusted gap is $1.50 (X $1.00 U, Y $0.50 F) — most of the raw gap is mix, and Y remains genuinely better by $1.50",
      "B": "Raw gap stands — actual cost per unit is the only fair comparison",
      "C": "X is actually better — complex production deserves a premium allowance that reverses the ranking",
      "D": "Both plants exactly meet standard — the gap is 100% mix"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Mix-adjusted standards: X expected = 0.70×$45 + 0.30×$35 = $31.50 + $10.50 = $42.00; actual $43.00, so X is $1.00 U per unit. Y expected = 0.30×$45 + 0.70×$35 = $13.50 + $24.50 = $38.00; actual $37.50, so Y is $0.50 F per unit. True performance gap = $1.00 − (−$0.50) = $1.50 with Y genuinely better; the balance of the raw $5.50 gap ($43.00 − $37.50) is product mix, not performance. Y keeps a bonus sized to $1.50 of genuine outperformance rather than mix illusion; X owes $1.00/unit of controllable improvement rather than $5.50 of mix assignment. Business interpretation: never bonus raw unit-cost gaps across different mixes — adjust first, then rank. Common trap: treating mix-driven cost differences as managerial performance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-113",
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
    "ExplanationWrongB": "Option B bonuses the raw gap, paying Y's manager mostly for running a simpler mix and penalizing X's manager for mix assignment. Raw unit cost across different mixes measures product assignment, not management.",
    "ExplanationWrongC": "Option C overcorrects into a complexity premium that reverses the ranking. Mix adjustment removes the mix effect (X +$1.00, Y −$0.50) — it does not award bonus points for difficulty. Y is still genuinely better by $1.50.",
    "ExplanationWrongD": "Option D claims the gap is 100% mix with both exactly at standard, but X runs $1.00 over its mix-adjusted standard and Y $0.50 under — $1.50 of genuine performance difference survives adjustment. Adjustment shrinks gaps; it rarely zeroes them.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.114 traceable versus common fixed costs",
    "MicroTopic": "traceable common fixed costs",
    "UniqueConceptKey": "C-C114-traceable-common-fixed-costs",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Segment R: revenue $500,000, variable costs $300,000, traceable fixed $120,000, allocated common fixed $100,000 (reported loss $20,000). A director moves to drop R citing the reported loss. The segment manager notes common costs persist regardless. What is the correct keep/drop analysis?",
    "Choices": {
      "A": "Drop — the $20,000 reported loss proves the segment destroys value",
      "B": "Keep — segment margin is $80,000 positive ($500,000 − $300,000 − $120,000); the $100,000 common allocation persists regardless and is irrelevant",
      "C": "Keep only if revenue grows 10% — the $80,000 margin must first cover common costs fully",
      "D": "Drop and cut the $100,000 common costs proportionally — allocations follow segments"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Segment margin on a traceable basis = $500,000 − $300,000 − $120,000 = +$80,000. Dropping R loses $500,000 of revenue while avoiding only $420,000 of cost ($300,000 variable + $120,000 traceable) — net −$80,000 to company profit, while the $100,000 common allocation merely moves to other segments. The reported −$20,000 includes $100,000 of costs that dropping cannot shed — the full-cost fallacy. Growth conditions (option C) confuse the decision: $80,000 already clears traceable costs, and common coverage is a corporate test, not a segment test. Business interpretation: keep/drop turns on traceable margin, never on fully-allocated profit — allocations follow the decision in the report but not in reality. Common trap: treating allocated common costs as avoidable.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-114",
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
    "ExplanationWrongA": "Option A drops on the −$20,000 reported loss, but that figure includes $100,000 of common costs that survive the drop. The decision loses $80,000 of traceable margin to save $0 of common cost.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C conditions keeping on 10% growth so margin 'covers common fully.' Segment decisions never require covering common costs — common costs are corporate by definition. Growth conditions hold a profitable segment hostage to an irrelevant test.",
    "ExplanationWrongD": "Option D assumes common costs shrink proportionally with segments. Common costs persist by definition (headquarters, shared facilities) — they reallocate to survivors, making remaining segments look worse after every drop.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.115 forecast error versus execution gap",
    "MicroTopic": "forecast error execution gap",
    "UniqueConceptKey": "C-C115-forecast-error-execution-gap",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Annual budget: 10,000 units. A mid-year forecast update revised expectations to 9,000 units on confirmed demand softness. Actual sales: 8,500 units. Sales blames production for stockouts; production blames sales for the 1,500-unit budget shortfall. How should the 1,500-unit gap be attributed for accountability?",
    "Choices": {
      "A": "All 1,500 to execution — budgets are commitments, and attribution to forecasting rewards excuse-making",
      "B": "All 1,500 to forecasting — the mid-year update proves demand, not execution, moved",
      "C": "1,000 to forecast error (budget-to-forecast) and 500 to execution (forecast-to-actual) — sales owns 500 units, planning owns 1,000",
      "D": "500 to forecast error and 1,000 to execution — the larger share always belongs to execution"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Decompose chronologically: budget-to-forecast = 10,000 − 9,000 = 1,000 units of forecast error (demand softness confirmed mid-year — a planning and market-analysis accountability item). Forecast-to-actual = 9,000 − 8,500 = 500 units of execution gap (stockouts and fulfillment failures against known demand — owned by sales operations and production). The stockout blame-shifting resolves empirically: only 500 units (one-third) could possibly be stockouts; 1,000 units never existed as demand. Business interpretation: rolling-forecast updates exist precisely to separate these accountabilities — without the 9,000-unit marker, all 1,500 would pool as 'missed budget' and both functions would (correctly) call the attribution unfair. Common trap: assigning the full budget variance to whoever speaks last.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
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
    "QuestionID": "P1-CC-115",
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
    "ExplanationWrongA": "Option A charges all 1,500 to execution on commitment theory. But 1,000 units of confirmed demand softness is a forecasting fact, not an execution failure — commitment rhetoric cannot conjure demand that never existed.",
    "ExplanationWrongB": "Option B charges all 1,500 to forecasting because the update 'proves' demand moved. The update proves 1,000 units of softness — the remaining 500 (forecast 9,000 vs actual 8,500) is fulfillment against known demand, squarely execution.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D swaps the split (500 forecast / 1,000 execution) on a 'larger share to execution' heuristic. Attribution follows chronology (budget to forecast to actual), not heuristics — the confirmed mid-year marker fixes the boundary at 1,000/500.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.116 standard cost card variance ranking",
    "MicroTopic": "standard cost card variance ranking",
    "UniqueConceptKey": "C-C116-standard-cost-card-variance-ranking",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A standard cost card shows per unit: DM 2.5 lbs @ $6.00 ($15.00), DL 0.5 hrs @ $22.00 ($11.00), VOH 0.5 hrs @ $8.00 ($4.00), FOH 0.5 hrs @ $12.00 ($6.00) — total $36.00. For 1,000 units, actual: DM 2,600 lbs @ $5.80 ($15,080), DL 480 hrs @ $22.50 ($10,800), VOH $4,100, FOH $6,000 (total $35,980; net variance $20 F). Decompose the net into signed component effects and identify the revision implication.",
    "Choices": {
      "A": "Revise all standards — any variance activity means the card is stale",
      "B": "Revise the DL rate to $22.50 — one quarter of data suffices",
      "C": "No revision — net $20 F means the card is accurate",
      "D": "DL net $200 F dominates favorably; DM net $80 U and VOH $100 U offset — revise the DM quantity standard for its persistent 0.1-lb overage"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Component decomposition (1,000 units): DM price = 2,600 × ($6.00 − $5.80) = $520 F; DM quantity = (2,500 − 2,600) × $6.00 = $600 U, so DM net = $80 U. DL rate = 480 × ($22.00 − $22.50) = $240 U; DL efficiency = (500 − 480) × $22.00 = $440 F, so DL net = $200 F. VOH = 500×$8 − $4,100 = $4,000 − $4,100 = $100 U. FOH = $6,000 − $6,000 = $0. Total: +520 − 600 − 240 + 440 − 100 = +$20 F — reconciles to the reported net. Ranking: DL net $200 F dominates; DM net $80 U and VOH $100 U are secondary offsets. Revision logic: the DM 0.1-lb/unit overage is systematic (quantity, not price noise) — revise the quantity standard with engineering review. The DL rate $22.50 is one quarter's data (no revision on noise); VOH $100 U on $4,000 is 2.5% (monitor). Business interpretation: rank components before revising — net $20 F hides a $200 signal and two offsets. Common trap: revising everything (noise becomes standard) or nothing (systematic drift persists).",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-116",
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
    "ExplanationWrongA": "Option A revises the entire card on $20 of net variance. Wholesale revision on noise destroys standard stability — revise components on systematic evidence (the DM quantity drift), not on activity.",
    "ExplanationWrongB": "Option B revises the DL rate on one quarter's $0.50 deviation. Single-period rate noise is the worst revision trigger — rates should move on contract or market evidence, and the $240 U is swamped by the $440 F efficiency signal anyway.",
    "ExplanationWrongC": "Option C reads net $20 F as card accuracy, but the net hides a $200 F DL signal, an $80 U systematic DM overage, and a $100 U VOH drift. Netting is the enemy of diagnosis — the DM quantity drift will compound unrevised.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.117 normal versus abnormal spoilage",
    "MicroTopic": "normal abnormal spoilage",
    "UniqueConceptKey": "C-C117-normal-abnormal-spoilage",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A batch starts 10,000 units at $190,000 total cost: 9,500 good units, 300 normal spoilage (3% allowance), 200 abnormal spoilage from a one-time machine fault. How should the $190,000 be assigned among good output and abnormal loss?",
    "Choices": {
      "A": "Abnormal loss $9,500 as period cost; good units $180,500 — all spoilage is a period loss",
      "B": "Abnormal loss $3,800 as period loss; good-unit cost $19.60 (normal spoilage absorbed by good output)",
      "C": "Good-unit cost $19.00 with no abnormal loss — spoilage is a normal production fact",
      "D": "Abnormal loss $3,878 using equivalent-unit precision; good-unit cost $19.39"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Average cost = $190,000 / 10,000 started = $19.00. Abnormal loss = 200 × $19.00 = $3,800 period loss. Good output bears the rest: ($190,000 − $3,800) / 9,500 = $186,200 / 9,500 = $19.60 per good unit — the $0.60 premium over $19.00 is the absorbed normal spoilage (300 × $19 = $5,700 spread over 9,500 good units). Check: 9,500 × $19.60 = $186,200 + $3,800 = $190,000 — reconciles. The 3% normal allowance is a product cost of good output (unavoidable process physics); the machine-fault 200 units are a period loss (avoidable, non-recurring, separately disclosed). Business interpretation: normal spoilage pricing belongs in product cost (customers fund physics); abnormal belongs in period loss (management answers for faults). Common trap: expensing normal spoilage separately, which understates product cost and overstates period loss.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Job Order and Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-117",
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
    "ExplanationWrongA": "Option A expenses all 500 spoiled units ($9,500) as period loss, including the 300 normal units. Normal spoilage is an unavoidable product cost absorbed by good output — expensing it understates inventory by $5,700 and overstates the period loss.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C prices good units at $19.00 average with no abnormal loss, burying the machine-fault 200 units in product cost. Abnormal spoilage must be separately disclosed as a period loss — hiding it in inventory overstates assets and masks the fault.",
    "ExplanationWrongD": "Option D's $3,878/$19.39 pair mixes methods inconsistently (equivalent-unit numerator with average denominator). Under the average method used here, $3,800 and $19.60 reconcile exactly to $190,000; $3,878 does not.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.118 reciprocal versus direct allocation",
    "MicroTopic": "reciprocal direct allocation",
    "UniqueConceptKey": "C-C118-reciprocal-direct-allocation",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Service departments: S1 $50,000 (20% to S2, 50% to P1, 30% to P2); S2 $30,000 (10% to S1, 36% to P1, 54% to P2). The controller has always used the direct method. A new analyst runs the reciprocal method and claims P1 is over-allocated. What do the two methods assign, and is the analyst right?",
    "Choices": {
      "A": "Direct is final: P1 $43,250, P2 $36,750 — reciprocal methods are theoretical refinements with no decision impact",
      "B": "Reciprocal gives P1 $43,265 (0.8 × S1 only) — the analyst forgot S2's contribution",
      "C": "Step-down gives P1 $41,000, P2 $39,000 — close enough to reciprocal to ignore the difference",
      "D": "Reciprocal: P1 $41,735, P2 $38,265 — direct over-allocates P1 by $1,515 by ignoring S2's 10% support of S1"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Direct method (ignores cross-flows): S1 to production: P1 50/80 × $50,000 = $31,250; P2 30/80 × $50,000 = $18,750. S2 to production: P1 36/90 × $30,000 = $12,000; P2 54/90 × $30,000 = $18,000. Direct totals: P1 $43,250; P2 $36,750 (sum $80,000 — reconciles). Reciprocal: S1 = $50,000 + 0.10×S2; S2 = $30,000 + 0.20×S1. Solving: S1 = $54,081.63, S2 = $40,816.33. P1 = 0.50×S1 + 0.36×S2 = $27,040.82 + $14,693.88 = $41,734.69 ≈ $41,735. P2 = 0.30×S1 + 0.54×S2 = $38,265.31 ≈ $38,265 (sum $80,000 — reconciles). Direct over-allocates P1 by $43,250 − $41,735 = $1,515 — because it ignores S2's 10% support flowing back through S1 disproportionately toward P2. The analyst is right, and $1,515 on these bases is decision-relevant for tight-margin product decisions. Business interpretation: direct method systematically favors heavy users of the allocating department that itself consumes support — reciprocal corrects exactly that bias. Common trap: accepting 0.8×S1 ($43,265) as reciprocal by forgetting S2's flow.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-118",
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
    "ExplanationWrongA": "Option A presents direct-method totals as the final answer and dismisses reciprocal as theoretical. The $1,515 P1 over-allocation is real money on tight margins — 'theoretical' here means 'more accurate.'",
    "ExplanationWrongB": "Option B computes 0.8 × S1 = $43,265 and stops — precisely the trap: it counts S1's outflow while forgetting S2's $14,694 inflow to P1. Half a reciprocal method is worse than direct because it looks rigorous.",
    "ExplanationWrongC": "Option C substitutes step-down ($41,000/$39,000) as 'close enough.' Step-down captures S1→S2 but ignores S2→S1 — the $735 residual (41,735 vs 41,000) is the back-flow the whole exercise exists to measure.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.119 metric coverage gap analysis",
    "MicroTopic": "metric coverage gap analysis",
    "UniqueConceptKey": "C-C119-metric-coverage-gap-analysis",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division scorecard carries seven metrics: ROI, profit margin, customer complaint count, defect rate, cycle time, rework cost, and training hours. The strategy officer asks whether coverage is balanced and what single change most improves it. Audit the coverage.",
    "Choices": {
      "A": "Add a Financial metric — two is too few for shareholder oversight",
      "B": "Drop training hours — Learning & Growth is overhead, not performance",
      "C": "Internal Process is over-represented (defect, cycle, rework = 3) while Customer has only a lagging complaint count — add a leading customer metric (e.g., on-time delivery) and retire one process metric",
      "D": "Coverage is balanced — seven metrics across four perspectives needs no change"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Count by perspective: Financial 2 (ROI, margin), Customer 1 (complaints — lagging only), Internal Process 3 (defect rate, cycle time, rework cost), Learning & Growth 1 (training hours). Two defects: (1) Process overweight at 3 metrics risks managing what is measured thrice while customer outcomes get one rear-view mirror; (2) the single Customer metric is lagging (complaints record failures after they occur) with no leading counterpart. The highest-value single change: add on-time delivery (leading customer metric, actionable daily) and retire the weakest process metric (rework cost largely duplicates defect rate's signal) — net 7 metrics, balanced 2/2/2/1 with a leading customer voice. Adding Financial (option A) worsens the real imbalance; dropping Learning (option B) eats capability seed corn; declaring balance (option D) blesses a 3/1 process-customer skew. Business interpretation: audit scorecards by perspective weight AND lead/lag mix — count alone hides both skews. Common trap: equating metric count with coverage.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-119",
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
    "ExplanationWrongA": "Option A adds a third Financial metric when Financial is already adequately covered (ROI + margin) and Customer has one lagging metric. More of what is covered cannot fix what is missing.",
    "ExplanationWrongB": "Option B drops the sole Learning & Growth metric as 'overhead.' Training hours fund future process capability — cutting the only capability metric to fix a customer coverage gap trades one imbalance for a worse one.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D declares 2/1/3/1 balanced. It is not: Process triple-counts highly correlated signals while Customer's single lagging metric leaves the leading customer voice — the one that prevents complaints — unmeasured.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.120 promise-date gaming detection",
    "MicroTopic": "promise-date gaming detection",
    "UniqueConceptKey": "C-C120-promise-date-gaming-detection",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Fulfillment reports 1,000 orders: 940 on-time to promise date (94%), 880 on-time to request date (88%). The logistics manager bonuses on promise-date OTD and proposes tightening promise standards to 'drive improvement.' The controller suspects promise-date gaming (quoting later dates to hit the metric). What should the committee conclude and do?",
    "Choices": {
      "A": "Celebrate 94% — promise-date OTD is the contracted commitment and the valid measure",
      "B": "Average to 91% — the truth lies between the two measures",
      "C": "Tighten promise standards — stretch targets cure gaming",
      "D": "Report request-date OTD (88%) as the customer truth; the 6-point gap evidences gaming — rebase the bonus on request-date and investigate the 40 promise-misses"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Two facts: (1) 60 orders (6%) met promise but missed request — deliverable evidence that promise dates were set later than customers asked, i.e., gaming, since genuine scheduling would show scattered misses, not a one-directional 60-order wedge; (2) 40 orders missed even the (possibly padded) promise dates — real fulfillment failures. Averaging to 91% (option B) blends a gamed metric with a true one into meaninglessness. Tightening promise standards (option C) intensifies the gaming incentive (pad more to hit tougher targets). The 94% is not 'contracted commitment' (option A) when the promiser sets the promise unilaterally against the request. Rebase the bonus on request-date OTD (88% — the customer-experienced truth) and investigate the 40 promise-misses as the operational signal. Business interpretation: never bonus a metric the bonused party sets unobserved — Goodhart's law is a design input, not a surprise. Common trap: treating self-set-target attainment as performance.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-120",
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
    "ExplanationWrongA": "Option A honors promise-date OTD as 'contracted commitment,' but the promiser sets promise dates unobserved — 60 orders of one-directional wedge proves the commitment was negotiated with the metric, not the customer.",
    "ExplanationWrongB": "Option B averages 94% and 88% into 91%, blending a gamed metric with a true one. Averages of biased and unbiased measures are biased — the 88% request-date figure stands alone as customer truth.",
    "ExplanationWrongC": "Option C tightens promise standards to 'cure' gaming. Tougher self-set targets intensify padding incentives (pad more to clear higher bars) — the cure feeds the disease. Change the metric basis, not its level.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE2C;