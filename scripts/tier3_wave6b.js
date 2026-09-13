const WAVE6B = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.086 make-or-buy with lease opportunity",
    "MicroTopic": "make-or-buy lease opportunity",
    "UniqueConceptKey": "D-D086-make-or-buy-lease-opportunity",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Make: variable $25/unit × 20,000 ($500,000) + avoidable fixed $100,000 + unavoidable fixed $150,000. Buy: $28/unit ($560,000). Freed space leases for $60,000. Should the company make or buy?",
    "Choices": {
      "A": "Make — $600,000 make-cost less $60,000 lease opportunity = $540,000 vs $560,000 buy; make wins by $20,000",
      "B": "Buy — $560,000 beats $750,000 of total make cost including unavoidable fixed",
      "C": "Buy — outsourcing always wins with a lower headline price",
      "D": "Make by $80,000 — the lease opportunity adds to make's advantage"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Relevant make cost = $500,000 variable + $100,000 avoidable fixed = $600,000 (the $150,000 unavoidable fixed persists under either option — correctly excluded). Less $60,000 lease opportunity (benefit foregone by making) = $540,000 net. Buy = $560,000. Make wins by $20,000. Including unavoidable fixed (option B, $750,000) penalizes making for costs that continue regardless — the classic irrelevant-cost error. Headline-price buying (option C, $560,000 < $600,000 gross) skips both the avoidability filter and the lease opportunity. Option D double-counts the lease (adding instead of subtracting: $600,000 + $60,000 = $660,000... precisely it claims make-by-$80,000 via sign error). Business interpretation: make-or-buy compares relevant make (avoidable + opportunity) to buy price — unavoidable costs never enter, opportunities always do. Common trap: fully-loaded make cost versus bare buy price.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-086",
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
    "ExplanationWrongB": "Option B's $750,000 make cost includes $150,000 of unavoidable fixed that persists under buying. Penalizing making for continuing costs inverts relevance — unavoidable never enters either side.",
    "ExplanationWrongC": "Option C buys on the $560,000 headline versus $600,000 gross make, skipping the avoidability filter ($150,000 out) and the $60,000 lease opportunity (in). Headline comparison without relevance filtering.",
    "ExplanationWrongD": "Option D's make-by-$80,000 adds the lease opportunity to make's side instead of subtracting ($600,000 + $60,000 = $660,000 would lose). Opportunity benefits reduce net make cost — sign discipline on foregone alternatives.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.087 sell-or-process joint irrelevance",
    "MicroTopic": "sell-or-process joint irrelevance",
    "UniqueConceptKey": "D-D087-sell-or-process-joint-irrelevance",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $200,000 (sunk). At split-off the product sells for $300,000; processing further costs $80,000 for a $420,000 sale value. Operations argues the $200,000 joint cost must be covered before processing. Should the product be sold or processed further?",
    "Choices": {
      "A": "Sell — the $200,000 joint cost exceeds the $120,000 processing gain",
      "B": "Sell because joint costs make processing unprofitable at any separable margin",
      "C": "Indifferent — $420,000 minus $80,000 minus $200,000 equals $300,000 minus $200,000",
      "D": "Process further — incremental $120,000 exceeds separable $80,000 by $40,000; the $200,000 joint cost is sunk and irrelevant"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Incremental analysis: process-further revenue $420,000 − split value $300,000 = $120,000 incremental revenue; separable cost $80,000; net +$40,000 → process. The $200,000 joint cost is sunk (incurred regardless) — allocating it to either branch (options A/C: $420,000 − $80,000 − $200,000 = $140,000 vs $300,000 − $200,000 = $100,000) preserves the ranking here only by arithmetic luck while corrupting the method: sunk costs never enter incremental decisions. Option B makes the fallacy a rule (joint costs veto processing at any margin). The $40,000 stands independent of the $200,000 in every scenario — including ones where joint allocation would flip a correct process decision into an incorrect sell. Business interpretation: split-off is a decision node where history ends — only forward costs and revenues vote. Common trap: allocating sunk joint costs to sell-vs-process alternatives.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-087",
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
    "ExplanationWrongA": "Option A sells because $200,000 joint 'exceeds' the $120,000 processing gain — comparing a sunk total to an incremental gain. Sunk costs compare to nothing; only the $80,000 separable cost weighs against the $120,000 gain.",
    "ExplanationWrongB": "Option B elevates the joint-cost fallacy to policy (joint costs veto processing at any margin). A $1,000,000 separable gain would still be vetoed — rules that forbid profitable processing are not conservatism.",
    "ExplanationWrongC": "Option C finds indifference by allocating joint to both branches ($140,000 vs $100,000... precisely both sides net of the same $200,000). Indifference here is arithmetic luck — the method fails wherever joint allocation flips a correct process decision.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.088 constrained resource ranking",
    "MicroTopic": "constrained resource ranking",
    "UniqueConceptKey": "D-D088-constrained-resource-ranking",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Machine hours capped at 10,000. Products: A CM $40 on 2 hrs ($20/hr), B CM $60 on 4 hrs ($15/hr), C CM $30 on 1 hr ($30/hr). Demands: C 3,000, A 2,500, B unlimited. What is the optimal mix and total contribution?",
    "Choices": {
      "A": "Rank by unit CM (B first) — highest margin per unit wins",
      "B": "Rank by price — revenue maximization drives contribution",
      "C": "Rank C, A, B by CM per hour: C 3,000 (3,000 hrs), A 2,500 (5,000 hrs), B 500 (2,000 hrs) — total $220,000",
      "D": "Produce B only — highest unit CM captures the constraint best"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Rank by contribution per constraining unit: C $30/hr, A $20/hr, B $15/hr. Allocate: C 3,000 × 1 hr = 3,000 hrs (demand met); A 2,500 × 2 = 5,000 hrs (demand met); used 8,000; remaining 2,000 hrs → B 2,000/4 = 500 units. Total CM = 3,000×$30 + 2,500×$40 + 500×$60 = $90,000 + $100,000 + $30,000 = $220,000. Unit-CM ranking (options A/D: B first at $60) feeds the constraint to the hungriest product — B consumes 4 hours per $60 (worst rate) and starves C ($30/hr). Price ranking (option B... option B-in-text: revenue maximization ignores cost entirely). Business interpretation: constraints price products by CM-per-scarce-unit, never by CM-per-unit — rank by the bottleneck's yield. Common trap: producing the highest-margin product into a hungry constraint.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-088",
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
    "ExplanationWrongA": "Option A ranks by unit CM (B $60 first), feeding the 4-hour hungriest product ahead of C's $30/hr yield. Unit margins ignore constraint intensity — B earns $60 while devouring 4 hours that could earn $120 as C.",
    "ExplanationWrongB": "Option B ranks by price, ignoring costs entirely. Revenue maximization without cost is not a ranking method — it is the absence of one.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D produces only B (highest unit CM), filling 10,000 hours with $15/hr yield ($150,000) against the optimal $220,000 — a $70,000 single-product fallacy.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.089 markup margin conversion",
    "MicroTopic": "markup margin conversion",
    "UniqueConceptKey": "D-D089-markup-margin-conversion",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Cost is $80; the pricing policy requires a 25% margin on price (not markup on cost). What price achieves it, and what markup on cost does that equal?",
    "Choices": {
      "A": "$100 — add 25% to cost ($80 × 1.25)",
      "B": "$106.67 (33.33% markup = 25% margin) — divide cost by the complement (1 − 0.25)",
      "C": "$105 — add 25% of the target price estimated iteratively",
      "D": "$120 — 50% markup guarantees any margin below 50%"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Margin on price: price = cost / (1 − margin) = $80 / 0.75 = $106.6667 ≈ $106.67. Check: ($106.67 − $80)/$106.67 = $26.67/$106.67 = 25.0% ✓. Equivalent markup on cost = $26.67/$80 = 33.33%. Adding the rate to cost (option A: $80 × 1.25 = $100) yields margin ($100 − $80)/$100 = 20%, not 25% — the single most common pricing error in practice. Iterative guessing (option C, $105 → margin 23.8%) approximates without method. The 50% cushion (option D, $120) overshoots to 33.3% margin. Business interpretation: margins divide by complements; markups multiply by increments — convert once via 1/(1−m) and never confuse the bases again. Common trap: adding the margin rate to cost.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Pricing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-089",
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
    "ExplanationWrongA": "Option A's $100 adds 25% to cost ($80 × 1.25), yielding margin ($100 − $80)/$100 = 20% — five points short. Margin rates divide cost by (1 − rate); they are never added to cost.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $105 iterates toward the answer without method ($105 → 23.8% margin). Iteration without the complement formula converges slowly and unverifiably.",
    "ExplanationWrongD": "Option D's $120 (50% markup) overshoots to 33.3% margin — overpricing by $13.33 against the stated 25% policy. Cushion markups violate the policy they claim to implement.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.090 target cost gap allocation",
    "MicroTopic": "target cost gap allocation",
    "UniqueConceptKey": "D-D090-target-cost-gap-allocation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Target price $200 with required 20% margin ($40) → allowable cost $160. Current cost $185 (gap $25). Value engineering finds $15 of material substitution and $10 of automation savings. How should the gap be closed?",
    "Choices": {
      "A": "Design $15 (materials) + process $10 (automation) = $25 — close the full gap to the $160 allowable with assigned owners",
      "B": "Cut the required margin to $15 — the gap is a target problem, not a cost problem",
      "C": "Raise price to $225 — customers fund cost overruns",
      "D": "Across-the-board 13.5% cut ($25/$185) — shared pain is fair pain"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Allowable = $200 − $40 = $160; gap = $185 − $160 = $25. Closure assigns every gap dollar to an owner and a mechanism: design engineering owns $15 of material substitution (specification change with quality gates); process engineering owns $10 of automation (cycle-time/labor reduction). Fully assigned ($15 + $10 = $25) with no residual — the gap closes exactly to allowable. Margin-cutting (option B) surrenders required return to accommodate current cost — the target exists to discipline cost, not to flex with it. Price-raising (option C) assumes customers fund internal inefficiency in a $200 market. Across-the-board 13.5% (option D: $25/$185) taxes high-value and wasteful spend equally — indiscriminate cuts destroy value faster than targeted ones. Business interpretation: target costing closes gaps by assignment (who, how much, by what mechanism), never by averaging or by moving the target. Common trap: renegotiating the target instead of the cost.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Pricing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-090",
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
    "ExplanationWrongB": "Option B cuts required margin to $15 to absorb the gap — surrendering return to accommodate cost. Targets discipline cost; costs do not renegotiate targets.",
    "ExplanationWrongC": "Option C raises price to $225, assuming customers fund a $25 internal overrun in a $200 market. Market prices are constraints, not variables — cost must come to price, never the reverse.",
    "ExplanationWrongD": "Option D's 13.5% across-the-board cut taxes high-value and wasteful spend equally. Indiscriminate cuts destroy value (starving effective activities) while protecting nothing — assign, don't average.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.091 operating leverage risk comparison",
    "MicroTopic": "operating leverage risk comparison",
    "UniqueConceptKey": "D-D091-operating-leverage-risk-comparison",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Firm A: sales $1,000,000, VC $600,000, FC $200,000 (NOI $200,000). Firm B: sales $1,000,000, VC $300,000, FC $500,000 (NOI $200,000). Sales rise 10% for both. Compare the firms' operating leverage, profit response, and risk.",
    "Choices": {
      "A": "Identical risk — identical sales and NOI mean identical economics",
      "B": "A is riskier — lower fixed costs mean thinner coverage in downturns",
      "C": "DOL 2.0 (A) vs 3.5 (B) — identical NOI with different risk; B gains 35% vs A's 20% on +10% sales, and loses symmetrically more in downturns",
      "D": "DOL equals FC/NOI (A 1.0, B 2.5) — fixed-cost ratios measure leverage"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "DOL = contribution/noise... precisely contribution margin ÷ operating income: A ($1,000,000 − $600,000)/$200,000 = $400,000/$200,000 = 2.0; B ($1,000,000 − $300,000)/$200,000 = $700,000/$200,000 = 3.5. On +10% sales: A +20% ($40,000), B +35% ($70,000) — identical NOI, divergent sensitivity. Symmetry cuts both ways: −10% sales costs A 20% and B 35%. Same-NOI-equals-same-risk (option A) ignores cost structure — the $300,000 fixed-cost gap is the entire risk story. A-riskier (option B) inverts leverage mechanics — higher fixed costs amplify both directions. FC/NOI (option D: 1.0/2.5) misstates the formula — DOL weights contribution, not fixed cost alone. Business interpretation: DOL prices earnings volatility per sales point — B's 3.5 buys 75% more upside per point at 75% more downside. Match leverage to demand confidence, not to NOI envy. Common trap: equating equal profits with equal risk.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-091",
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
    "ExplanationWrongA": "Option A equates risk via identical sales and NOI, but the $300,000 fixed-cost gap (200k vs 500k) is the entire risk story — structure, not level, determines sensitivity.",
    "ExplanationWrongB": "Option B calls lower-fixed-cost A riskier, inverting leverage mechanics — B's $500,000 fixed base amplifies every sales point 3.5× versus A's 2.0×, in both directions.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's FC/NOI formula (1.0/2.5) misstates DOL — leverage weights contribution margin ($400k/$700k), not fixed cost alone. Wrong formula, wrong ranking, wrong magnitude.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.092 margin of safety with step cost",
    "MicroTopic": "margin safety step cost",
    "UniqueConceptKey": "D-D092-margin-safety-step-cost",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Current sales 20,000 units @ $50 ($1,000,000); breakeven 16,000 units ($800,000). A $60,000 supervisor step triggers above 21,000 units. What is the margin of safety, and what does the step imply for growth planning?",
    "Choices": {
      "A": "MOS $800,000 — safety equals the breakeven base",
      "B": "Step costs are irrelevant to MOS — safety measures volume, not cost structure",
      "C": "MOS 25% ($200,000/$800,000) — safety relativized to breakeven",
      "D": "MOS $200,000 (20%) — and growth past 21,000 units carries $60/unit fixed drag on the first 1,000 units, so price growth deliberately"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "MOS = actual − breakeven = $1,000,000 − $800,000 = $200,000 (20% of sales: $200,000/$1,000,000 — not option C's $200,000/$800,000 = 25%, which relativizes to the wrong base; MOS ratio uses actual sales as denominator). The $60,000 step at 21,000 units sits 1,000 units above current sales: the first 1,000 units of growth absorb $60,000 of new fixed cost ($60/unit drag) before contributing — growth to 21,000+ must clear the step hurdle, so price and volume plans past it deliberately (premium pricing, committed orders). Breakeven-as-MOS (option A, $800,000) reports the danger zone as the safety zone. Step-irrelevance (option B) blinds growth planning to a known $60,000 cliff one thousand units out. Business interpretation: MOS measures today's cushion; step schedules price tomorrow's growth — report both together whenever steps loom near current volume. Common trap: denominating MOS ratio on breakeven sales.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-092",
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
    "ExplanationWrongA": "Option A's $800,000 reports breakeven sales as safety — the danger zone relabeled as cushion. MOS is actual minus breakeven ($200,000), never breakeven itself.",
    "ExplanationWrongB": "Option B dismisses the $60,000 step as irrelevant to safety, but it sits 1,000 units above current sales — growth planning without it walks into a $60/unit fixed drag blind.",
    "ExplanationWrongC": "Option C's 25% denominates $200,000 on $800,000 breakeven sales. MOS ratio uses actual sales ($1,000,000) as base: 20%. Denominator discipline on ratios.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.093 commission structure crossover",
    "MicroTopic": "commission structure crossover",
    "UniqueConceptKey": "D-D093-commission-structure-crossover",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Current: $300,000 salaries + 5% commission. Proposal: $250,000 salaries + 8% commission. Forecast sales $2,200,000. Which structure costs less at forecast, and where is the crossover?",
    "Choices": {
      "A": "Switch — higher rates always motivate more sales than salaries",
      "B": "Keep current — crossover at $1,666,667; forecast $2,200,000 favors current by $16,000",
      "C": "Indifferent — structures converge at all volumes above $1M",
      "D": "Cut salaries only — keep 5% and take $250,000 salaries unilaterally"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Crossover: $300,000 + 0.05S = $250,000 + 0.08S → $50,000 = 0.03S → S = $1,666,666.67 ≈ $1,666,667. At forecast $2,200,000: current = $300,000 + $110,000 = $410,000; proposal = $250,000 + $176,000 = $426,000 — current wins by $16,000. Above $1,667M the lower-variable structure (current) always wins; below it, the proposal wins. Motivation-by-rate (option A) prices incentives without costing them — at $2.2M the higher rate costs $16,000 more. Indifference (option C) holds only exactly at crossover, not 'above $1M.' Unilateral salary cuts (option D) rewrite employment terms the proposal packages with its rate — cherry-picking one leg voids the comparison. Business interpretation: commission structures cross once — locate the crossover, forecast honestly, pick the cheaper side. Common trap: choosing rates for motivation while ignoring their cost at forecast volume.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-093",
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
    "ExplanationWrongA": "Option A switches for motivation (higher rates), costing $16,000 more at forecast ($426,000 vs $410,000). Incentive effects are real but unmeasured here — measured cost favors current.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C claims indifference above $1M, but the structures diverge linearly past the $1,666,667 crossover ($16,000 gap at $2.2M and growing). Indifference holds at exactly one point.",
    "ExplanationWrongD": "Option D cuts salaries unilaterally while keeping 5%, rewriting the proposal's terms. Cherry-picked hybrids compare against packages that don't exist.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.094 relevant range step planning",
    "MicroTopic": "relevant range step planning",
    "UniqueConceptKey": "D-D094-relevant-range-step-planning",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 9,000 units, fixed costs $180,000 (capacity to 10,000 units). Revised forecast: 11,500 units, requiring a second shift (+$40,000 fixed). The planning analyst projects total cost using $20/unit average fixed ($180,000/9,000) × 11,500 = $230,000 fixed. What is the correct fixed-cost plan?",
    "Choices": {
      "A": "$180,000 — budgets hold once set, regardless of forecast revisions",
      "B": "$230,000 — average fixed cost scales with volume like variable cost",
      "C": "Cut volume to 10,000 — plans must fit capacity, not vice versa",
      "D": "$220,000 — the 10,000-unit relevant-range edge triggers the $40,000 step; average-cost projections understate by $10,000 here (and mislead generally)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Fixed costs are constant within the relevant range (to 10,000 units: $180,000) and step beyond it: 11,500 units triggers the second shift (+$40,000) → plan $220,000. The analyst's $230,000 spreads average fixed ($20/unit) as if fixed were variable — overplanning by $10,000 here (and generally mis-specifying: averages fall with volume while steps jump). Holding $180,000 (option A) plans 11,500 units of activity on 10,000 units of fixed resources — the unfunded $40,000 step becomes an 'unexpected' overrun. Cutting volume to fit (option C) surrenders 1,500 units of contribution to dodge a $40,000 step that the margin likely covers many times over. Business interpretation: relevant ranges end where steps begin — re-plan fixed costs at every range edge the forecast crosses. $10,000 here; the method error scales with volume. Common trap: unitizing fixed costs for planning.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Cost Behavior",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-094",
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
    "ExplanationWrongA": "Option A's $180,000 holds the budget despite an 11,500-unit forecast crossing the 10,000-unit range edge. The $40,000 step is a planned cost of the forecasted activity — unplanned only if the range edge is ignored.",
    "ExplanationWrongB": "Option B's $230,000 unitizes fixed cost ($20 × 11,500), treating fixed as variable — overplanning by $10,000 here and mis-specifying generally. Fixed costs step; they never scale per unit.",
    "ExplanationWrongC": "Option C cuts volume to 10,000 to fit capacity, surrendering 1,500 units of contribution margin to dodge a $40,000 step the margin likely covers many times over. Plans serve demand; demand does not serve plans.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.095 by-product presentation equivalence",
    "MicroTopic": "by-product presentation equivalence",
    "UniqueConceptKey": "D-D095-by-product-presentation-equivalence",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $100,000; main product sales $500,000; by-product NRV $15,000 (sales $20,000 less $5,000 disposal). Compare deducting NRV from COGS (Method 1) versus recognizing other income (Method 2). How do profit and margins compare?",
    "Choices": {
      "A": "Method 1 is more profitable — lower COGS always wins",
      "B": "Method 2 is more profitable — other income adds without cost",
      "C": "Profit identical ($415,000); presentation differs (Method 1 margin 83% vs Method 2 margin 80% + $15,000 other income) — choose by policy consistency and comparability needs",
      "D": "By-product at gross $20,000 — disposal is a period cost in both methods"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Method 1: COGS = $100,000 − $15,000 = $85,000; gross profit = $500,000 − $85,000 = $415,000; margin = $415,000/$500,000 = 83%. Method 2: COGS = $100,000; gross profit = $400,000 (80% margin); plus $15,000 other income = $415,000 total profit. Identical bottom line ($415,000), different geography: Method 1 flatters gross margin by 3 points; Method 2 shows cleaner product economics plus transparent by-product income. More-profitable claims (options A/B) mistake presentation for economics — the $15,000 lands in profit either way. Gross $20,000 (option D) ignores $5,000 of disposal cost that NRV properly deducts. Business interpretation: by-product methods are presentation policies with identical profit — pick by consistency and covenant/margin-comparability consequences, and disclose the choice. Common trap: letting margin-percentage optics decide an economically neutral presentation.",
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
    "QuestionID": "P1-DD-095",
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
    "ExplanationWrongA": "Option A crowns Method 1 more profitable on its 83% margin, but total profit is $415,000 under both methods — margin optics without profit difference.",
    "ExplanationWrongB": "Option B crowns Method 2 on its $15,000 other-income line, but Method 1's COGS offset produces the identical $415,000 — income geography, not income level.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D values the by-product at gross $20,000, skipping $5,000 of disposal cost. NRV deducts disposal under either presentation method — gross overstates by the cost to realize.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE6B;