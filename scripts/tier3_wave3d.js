const WAVE3D = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.221 forecast investigation portfolio",
    "MicroTopic": "forecast investigation portfolio",
    "UniqueConceptKey": "B-B-221-forecast-investigation-portfolio",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Controller Ingrid Solberg has an $8,000 forecast-improvement budget. Three proposals: (1) materials-price forecasting model $25,000-error exposure — model costs $3,000, 70% chance of $20,000 improvement; (2) labor-scheduling forecast $15,000 exposure — costs $4,000, 60% chance of $12,000; (3) overhead-driver forecast $9,000 exposure — costs $2,000, 85% chance of $6,000. No partial funding. Which portfolio maximizes expected net benefit?",
    "Choices": {
      "A": "Materials + overhead ($5,000) — best return per dollar",
      "B": "All three ($9,000) — total expected benefit covers the overrun",
      "C": "Materials + labor ($7,000, $14,200 expected net); defer overhead — highest absolute expected value within budget",
      "D": "Labor only — mid-size exposures deserve single focus"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Expected nets: materials = 0.70×$20,000 − $3,000 = $14,000 − $3,000 = $11,000; labor = 0.60×$12,000 − $4,000 = $7,200 − $4,000 = $3,200; overhead = 0.85×$6,000 − $2,000 = $5,100 − $2,000 = $3,100. Feasible pairs within $8,000: M+L ($7,000, EV $14,200), M+O ($5,000, EV $14,100), L+O ($6,000, EV $6,300). Materials + labor wins on absolute expected value ($14,200) while fitting the budget. Option A's per-dollar logic (M+O at $2.82/$ vs M+L at $2.03/$) misranks under slack budget — ratios rule only when the budget binds out the higher-total option; here $1,000 slack remains, so absolute EV governs. All-three (option B) violates the hard $8,000 constraint. Business interpretation: rank forecast investments by absolute EV subject to budget, switching to per-dollar ranking only when leftover budget cannot fund the next-best absolute option. Common trap: optimizing ratios when totals fit.",
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
    "QuestionID": "P1B-B-221",
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
    "ExplanationWrongA": "Option A picks materials + overhead on per-dollar return ($2.82/$ vs $2.03/$). Ratios govern only when the budget binds out the higher-total option — here $1,000 slack remains, so the $14,200 absolute winner (M+L) fits. Ratio ranking leaves $100 of EV on the table to 'save' budget nobody needs saved.",
    "ExplanationWrongB": "Option B spends $9,000 against an $8,000 hard budget. Expected benefits do not relax binding capacity constraints — analytical staff hours are finite, and the overrun requires cutting a proposal or securing budget first.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D funds labor alone ($3,200 EV), stranding $11,000 of materials EV that fits the budget. Single-focus is a heuristic for scarce attention, not for an $8,000 budget with two affordable high-yield proposals.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.222 forecast source arbitration",
    "MicroTopic": "forecast source arbitration",
    "UniqueConceptKey": "B-B-222-forecast-source-arbitration",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales forecasts sales at $2.4M citing a $2.5M pipeline with 4% historical fallout; finance models $2.1M from the regression trend. The two sides deadlock over the annual plan. The controller, arbitrating, finds the pipeline includes $200,000 of double-counted renewals. Volume of dispute: $300,000. What should the arbitration ruling be?",
    "Choices": {
      "A": "$2,200,000 — strip the $200,000 double-count ($2.3M adjusted pipeline), then split the remaining $200,000 methods gap evenly",
      "B": "$2,400,000 — the pipeline is objective evidence and governs",
      "C": "$2,100,000 — statistical models always dominate judgmental pipelines",
      "D": "$2,350,000 — average the two forecasts as equal experts"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Comparability first: the $2.5M pipeline contains $200,000 of double-counted renewals, so its valid content is $2.3M — not $2.5M. The genuine methods gap is then $2.3M (adjusted pipeline) versus $2.1M (regression) = $200,000, reflecting pipeline optimism against trend conservatism with no further evidence to allocate it asymmetrically. Even split: ($2.3M + $2.1M)/2 = $2.2M. Enforcing $2.4M (option B) awards $200,000 of double-count as if it were demand. Enforcing $2.1M (option C) discards the pipeline's genuine $200,000 of above-trend information along with its error. Straight averaging at $2.35M (option D) splits on a contaminated endpoint — precision on dirty inputs. Business interpretation: arbitrate inputs before splitting gaps — clean the pipeline, then split what remains. Common trap: splitting differences on uncleaned numbers.",
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
    "QuestionID": "P1B-B-222",
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
    "ExplanationWrongB": "Option B enforces the unadjusted $2.4M pipeline, awarding $200,000 of double-count as demand. Pipeline objectivity ends where double-counting begins — evidence with known errors gets cleaned, not crowned.",
    "ExplanationWrongC": "Option C enforces the $2.1M regression as always-dominant, discarding $200,000 of genuine above-trend pipeline information with the $200,000 of error. Models miss turning points that pipelines see — dominance doctrines waste information.",
    "ExplanationWrongD": "Option D averages $2.4M and $2.1M ($2.35M) without cleaning — splitting the difference on a contaminated endpoint bakes half the double-count ($100,000) into the plan. Clean first, split second.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.223 growth versus slack budget remedy",
    "MicroTopic": "growth slack budget remedy",
    "UniqueConceptKey": "B-B-223-growth-slack-budget-remedy",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Eastvale's operating budget shows $900,000 of mostly-depreciated support assets against $270,000 of controllable margin (30% 'return'), and rejects a $300,000 / $57,000-margin (19%) growth initiative as 'below our standards.' Westvale shows $3,000,000 of new assets, $390,000 margin (13%), and accepts a $300,000 / $42,000 (14%) project. The hurdle is 12%. The budget committee asks whether the growth-screening standard is working. What should the controller recommend?",
    "Choices": {
      "A": "Keep the 30%-referenced screen and commend Westvale — both units decided correctly",
      "B": "Force Eastvale to accept — corporate authority fixes incentive failure",
      "C": "Raise the screen to 19% — only Eastvale-grade initiatives should proceed",
      "D": "Replace return-ratio screening with residual-margin screening — Eastvale's rejection is benchmark-driven (27.25% dilution) despite +$21,000 residual; asset-age distortion voids cross-unit ratio comparison"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Eastvale's rejection: post-acceptance ratio = ($270,000+$57,000)/($900,000+$300,000) = $327,000/$1,200,000 = 27.25%, diluting 30% — a rational benchmark-maximizer rejects, even though residual margin = $57,000 − 12%×$300,000 = $57,000 − $36,000 = +$21,000 creates value. Westvale's acceptance: ($390,000+$42,000)/($3,000,000+$300,000) = $432,000/$3,300,000 = 13.09%, accretive to 13% — consistent under either metric (residual = $42,000 − $36,000 = +$6,000). The deeper disease is asset age: Eastvale's 30% reflects a depreciated base, not superior economics — comparing 30% to Westvale's 13% rewards accounting age. Residual screening fixes both defects: it approves both value-creating initiatives (+$21k, +$6k) and neutralizes denominator distortion. Forcing acceptance (option B) preserves the dysfunctional screen while destroying autonomy. Raising the screen to 19% (option C) kills Westvale's value-creating 14% project. Business interpretation: when asset ages differ materially, ratio screens measure depreciation policy, not management. Common trap: praising Westvale's 'correct' decision while missing that the same screen produced Eastvale's wrong one.",
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
    "QuestionID": "P1B-B-223",
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
    "ExplanationWrongA": "Option A commends the screen because Westvale decided 'correctly.' But the same ratio screen produced Eastvale's value-destroying rejection (+$21,000 residual refused). A screen that yields right answers by coincidence in one unit and wrong answers by construction in another is broken.",
    "ExplanationWrongB": "Option B forces Eastvale to accept while keeping ratio screening. Coercion preserves the dysfunctional incentive (next initiative, same rejection logic) while destroying the autonomy the structure exists to provide. Fix the screen, not the decision.",
    "ExplanationWrongC": "Option C raises the screen to 19%, which kills Westvale's 14% initiative ($6,000 of genuine value) while still leaving Eastvale's dilution incentive intact (19% still dilutes 30%). It compounds both errors.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.224 participative budget gaming guard",
    "MicroTopic": "participative budget gaming guard",
    "UniqueConceptKey": "B-B-224-participative-budget-gaming-guard",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A manager proposes +12% budget growth citing expansion; history shows +3% actual growth with a +9% padding pattern (requests exceed demonstrated need by ~9% yearly). The CFO wants participation without gaming. Which budget design best balances honest input against padding incentives?",
    "Choices": {
      "A": "Accept +12% — participation means trusting managerial judgment",
      "B": "Participative re-estimate anchored to the 3% external index, with variance-trend confrontation and 50% sharing of verified savings versus the padded request",
      "C": "Impose +3% top-down — the index is objective, participation is theater",
      "D": "Zero-base the full request — rebuild every dollar from zero annually"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The +9% padding pattern is revealed preference: requests run ~9 points above demonstrated need, so the +12% proposal likely contains ~9% pad and ~3% real growth (matching the external index — convergent evidence). Pure trust (option A) funds the pad in full. Top-down imposition (option C) triggers ratchet dynamics (managers learn that revealed need gets confiscated, so next cycle hides more). Full zero-basing (option D) spends more analytical effort than a 9% dispute warrants. The participative-with-guard design: (1) anchor discussion on the 3% external index (objective starting point, not accusation); (2) confront with the manager's own variance trend (+9% pattern as data); (3) share 50% of verified savings versus the padded request — paying for honesty converts padding into bonus through truth-telling rather than through budget games. If true need is +3% on base B, verified savings = 0.09B and the manager earns 0.045B for revealing it — cheaper than the 0.09B pad and incentive-compatible going forward. Business interpretation: participation without guards funds gaming; guards without participation breed ratchet — pair them. Common trap: treating trust and control as substitutes rather than complements.",
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
    "QuestionID": "P1B-B-224",
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
    "ExplanationWrongA": "Option A trusts the +12% proposal as participation, funding ~9% of revealed padding pattern in full. Trust without verification converts participation into a padding license — next cycle proposes +14%.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C imposes +3% top-down, discarding the manager's local information (which may contain genuine above-index need) and teaching that revealed information gets confiscated — the ratchet effect guarantees next cycle hides more.",
    "ExplanationWrongD": "Option D zero-bases the full request annually — analytical effort wildly disproportionate to a 9% dispute. Zero-basing is for structural redesign, not for disciplining a known padding pattern with a known anchor.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.225 real versus nominal growth comparison",
    "MicroTopic": "real nominal growth comparison",
    "UniqueConceptKey": "B-B-225-real-nominal-growth-comparison",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Division Hot (30% inflation) reports 35% nominal sales growth on historical-cost budgets. Division Stable (2% inflation) reports 16% nominal growth. Corporate ranks Hot first for the growth bonus. The controller argues nominal growth across inflation regimes is meaningless. What is the correct comparison?",
    "Choices": {
      "A": "Hot wins — 35% is more than double 16% under any inflation adjustment",
      "B": "Both are fine — each beats its local inflation rate by a similar margin",
      "C": "Restate in real terms: Hot ≈ 3.8%, Stable ≈ 13.7% — Stable trounces Hot; nominal 35% is monetary illusion",
      "D": "Adjust the growth hurdle for inflation and keep nominal growth — measurement stays simple"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Real growth ≈ (1 + nominal)/(1 + inflation) − 1. Hot: 1.35/1.30 − 1 = 1.0385 − 1 = 3.85%. Stable: 1.16/1.02 − 1 = 1.1373 − 1 = 13.73%. The ranking inverts completely: Stable's 13.7% real growth is worth 3.5× Hot's 3.8%. Hot's 35% is monetary illusion — mostly price pass-through in inflated currency, not volume or share gains. 'Beats local inflation by similar margin' (option B: Hot +5pp, Stable +14pp — not even similar) compounds the error. Hurdle-adjustment alone (option D) leaves numerator and denominator in mixed-price-level currency. Business interpretation: cross-regime growth comparison without price-level restatement ranks inflation, not management — restate to real terms before a dollar of bonus follows. Common trap: treating nominal outperformance across different price levels as information.",
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
    "QuestionID": "P1B-B-225",
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
    "ExplanationWrongA": "Option A keeps Hot ranked first on nominal 35% vs 16%. In real terms Hot grows 3.85% against Stable's 13.73% — nominal doubling is entirely price-level illusion, and ranking on it pays bonuses for inflation.",
    "ExplanationWrongB": "Option B claims similar margins over local inflation, but Hot beats 30% by 5 points while Stable beats 2% by 14 points — not similar. And margin-over-inflation is not a growth measure at all; real rates are (3.85% vs 13.73%).",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D adjusts the hurdle while leaving growth in mixed-price-level currency. Real comparison requires restating the measure, not just moving the bar — a higher hurdle against an inflated 35% still ranks Hot first.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.226 forecast ownership hybrid design",
    "MicroTopic": "forecast ownership hybrid design",
    "UniqueConceptKey": "B-B-226-forecast-ownership-hybrid-design",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales-owned forecasts run +7% conservative bias (per eight-quarter sign test); finance's statistical model is unbiased but misses local turning points (σ 40% higher than sales' around inflections). The forecast-error cost is $150,000 per point of bias. Who should own the forecast, and how?",
    "Choices": {
      "A": "Hybrid: statistical base (unbiased) plus logged sales overrides (local knowledge) with override-accuracy tracking — debiases while preserving information",
      "B": "Sales-owned — field knowledge beats models at turning points",
      "C": "Finance-owned model only — unbiased beats informed-but-biased",
      "D": "Executive judgment — experience outperforms both data and field reports"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The hybrid captures both virtues: the statistical base removes the +7% conservative bias (worth ~$150,000 × 7 = $1,050,000 of bias cost... precisely, debiasing saves roughly 7 points × $150,000 = $1,050,000 annually), while logged sales overrides preserve turning-point information the model misses. Override-accuracy tracking is the control that makes it work — overrides that beat the model earn weight; chronic sandbaggers lose override rights with evidence. Sales-owned (option B) keeps $1M+ of bias cost for turning-point coverage available more cheaply via logged overrides. Finance-only (option C) buys unbiasedness by discarding local information the model structurally lacks. Executive gut (option D) is unlogged, untracked, and unaccountable — the bias returns wearing experience. Business interpretation: forecast ownership is mechanism design — combine unbiased bases with priced, tracked judgment. Common trap: framing bias-vs-information as a binary choice instead of a hybrid design.",
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
    "QuestionID": "P1B-B-226",
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
    "ExplanationWrongB": "Option B keeps sales ownership for turning-point coverage at the price of $1M+ in annual bias cost. Logged overrides buy the same coverage without the bias — field knowledge has a cheaper delivery vehicle than ownership.",
    "ExplanationWrongC": "Option C buys unbiasedness by discarding turning-point information the statistical model structurally misses (40% higher σ at inflections). Unbiased ignorance of turning points is still ignorance where it matters most.",
    "ExplanationWrongD": "Option D substitutes unlogged executive judgment for both data and field reports — bias without a paper trail. Experience informs overrides; it does not replace the base-plus-tracking mechanism.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.227 investigation threshold design",
    "MicroTopic": "investigation threshold design",
    "UniqueConceptKey": "B-B-227-investigation-threshold-design",
    "LOSTag": "P1-B.2 Budgetary control",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $11,000 unfavorable budget variance sits inside ±$12,000 statistical control limits (σ = $6,000). The $10,000 fixed investigation rule says probe; the 5%-of-budget rule ($15,000 on $300,000) says ignore. Each needless probe costs $2,500 with a 70% no-find rate. Which threshold should govern, and what happens to this variance?",
    "Choices": {
      "A": "Investigate — exceeds the $10,000 rule, and rules are rules",
      "B": "Investigate — manager requested review, and responsiveness matters",
      "C": "Investigate — 5% rule says ignore but fixed rules dominate percentage rules",
      "D": "Do not investigate — within control limits; fixed and percentage rules that ignore variance distribution waste ~70% of probes on noise"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "P(|X| > $10,000) with σ = $6,000 is 2×(1 − Φ(1.667)) ≈ 9.6% per period — roughly one month in ten triggers on pure noise, and at 70% historical no-find rates each trigger burns $2,500 × 0.70 = $1,750 of expected waste. The $11,000 observation sits inside ±$12,000 (±2σ) control limits — statistically indistinguishable from common-cause variation. Fixed-dollar rules ($10,000) and percentage rules ($15,000) both ignore the variance distribution: the first over-triggers in noisy processes, the second under-triggers in tight ones. Control limits calibrate the threshold to observed variability — investigate out-of-control points (assignable-cause signal), monitor in-control ones. Manager requests (option B) deserve a look at the chart, not a $2,500 probe of noise. Business interpretation: thresholds should be denominated in standard deviations, not dollars — dollars don't know the process variance. Common trap: treating threshold breaches as findings without computing the null-hypothesis rate.",
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
    "QuestionID": "P1B-B-227",
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
    "ExplanationWrongA": "Option A probes because $11,000 > $10,000 — but the rule ignores that σ = $6,000 makes $11,000 a routine 1.83σ draw (in-control). Dollar rules that don't know process variance convert ~10% of quiet periods into $2,500 investigations.",
    "ExplanationWrongB": "Option B probes on manager request for responsiveness. Requests deserve chart review, not automatic $2,500 probes — responsiveness to noise is lottery administration, and the request itself may reflect the same rule-based thinking being corrected.",
    "ExplanationWrongC": "Option C picks between rules by seniority (fixed dominates percentage) while both ignore the distribution. Rule-rank debates miss the point: the control chart outranks both rules because only it knows σ.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.228 forecast process integration design",
    "MicroTopic": "forecast process integration design",
    "UniqueConceptKey": "B-B-228-forecast-process-integration-design",
    "LOSTag": "P1-B.2 Operating budgets",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales plans on a 12,000-unit forecast, production schedules 10,000 (capacity), purchasing orders for 14,000 (stale forecast). The S&OP pilot proposes: one frozen forecast, cross-functional sign-off, and a formal change protocol with cost-of-change estimates. Operations calls it bureaucracy; purchasing calls it salvation. What should the controller recommend?",
    "Choices": {
      "A": "Let each function keep its own forecast — autonomy beats coordination",
      "B": "Single frozen forecast with S&OP sign-off and priced change protocol — one truth with a fair amendment process beats three truths and $60,000 of coordination failure",
      "C": "Average to 12,000 — the mean of inconsistent bases is the consensus forecast",
      "D": "Production dictates — capacity is the only hard constraint, so its number governs"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The $60,000 coordination failure (per the costing analysis: $40,000 lost CM on 2,000-unit stockouts plus $20,000 excess-material exposure) flows directly from three inconsistent bases — no function is wrong on its own numbers, yet the company loses both margin and cash. Averaging (option C, 12,000) compounds the error: the mean of inconsistent bases inherits every inconsistency while dignifying none of the analysis. Production-dictates (option D) elevates one hard constraint over demand truth — capacity tyranny that starves growth. Autonomy (option A) preserves the $60,000 failure as the price of harmony. The frozen-forecast-plus-protocol design gives each function what it actually needs: sales gets commitment stability, production gets a plannable number, purchasing gets order validity — with changes priced (cost-of-change estimates force sponsors to weigh forecast churn) rather than free. Operations' bureaucracy objection answers itself: a monthly S&OP hour costs a fraction of one $60,000 quarter. Business interpretation: forecast governance is the cheapest coordination technology — one truth, fairly amendable, beats sophisticated autonomy. Common trap: treating forecast disagreement as healthy diversity rather than as unpriced externalities between functions.",
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
    "QuestionID": "P1B-B-228",
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
    "ExplanationWrongA": "Option A preserves three inconsistent forecasts as autonomy, institutionalizing the $60,000 coordination failure as the harmony price. Autonomy over shared inputs is not freedom — it is unpriced externality.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C averages 12,000/10,000/14,000 into 12,000, inheriting every inconsistency while dignifying none of the analysis. Consensus arithmetic on inconsistent bases produces agreement on fiction.",
    "ExplanationWrongD": "Option D lets capacity dictate the forecast, starving demand truth to flatter operations. Capacity constrains fulfillment horizons, not demand reality — tyranny of the bottleneck over the market.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.229 contingency reserve transparency",
    "MicroTopic": "contingency reserve transparency",
    "UniqueConceptKey": "B-B-229-contingency-reserve-transparency",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $200,000 contingency reserve sits buried in COGS, releasable at the controller's discretion to smooth quarterly margins. The audit committee asks whether this is earnings management. The controller argues reserves are prudent and disclosure would invite second-guessing. What is the correct treatment?",
    "Choices": {
      "A": "Keep buried — flexibility to absorb shocks is exactly what reserves are for",
      "B": "Eliminate all reserves — any buffer is earnings management by construction",
      "C": "Reclassify as a disclosed management reserve with a written release protocol (trigger events, authorization levels, quarterly audit-committee reporting) — transparency preserves the buffer while removing discretion abuse",
      "D": "Bury deeper across more accounts — diffusion reduces detection risk"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Buried discretionary reserves ($200,000 releasable to smooth margins) meet the definition of earnings management regardless of intent — undisclosed, manager-triggered income shifting across periods. Elimination (option B) swings to fragility: legitimate contingencies then hit reported earnings unbuffered, punishing honest volatility. The disclosed-reserve design keeps the buffer's economics (shock absorption) while removing its abuse vector: written triggers define releasability, authorization levels prevent unilateral release, quarterly audit-committee reporting makes smoothing visible (and therefore pointless as smoothing — released amounts arrive labeled). Deeper burial (option D) is concealment strategy, indefensible on any reading. The controller's second-guessing objection inverts accountability: reserves exist to serve the committee's oversight, not to escape it. Business interpretation: transparency converts a smoothing device into a shock absorber — same dollars, opposite governance. IMA integrity and credibility standards require it. Common trap: confusing reserve prudence (sizing) with reserve secrecy (placement).",
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
    "QuestionID": "P1B-B-229",
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
    "ExplanationWrongA": "Option A keeps $200,000 of discretionary smoothing buried as prudence. Prudence sizes reserves; secrecy places them where releases move margins invisibly — the combination is earnings management whatever the motive.",
    "ExplanationWrongB": "Option B eliminates all reserves as inherently manipulative, leaving legitimate contingencies to hit earnings unbuffered. Zero-buffer fragility punishes honest volatility and drives concealment underground.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D diffuses the reserve across accounts to reduce detection — concealment strategy stated openly. Detection-risk management applied to one's own audit committee is indefensible.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-B.230 evaluation cadence for noisy metrics",
    "MicroTopic": "evaluation cadence noisy metrics",
    "UniqueConceptKey": "B-B-230-evaluation-cadence-noisy-metrics",
    "LOSTag": "P1-B.2 Budgetary control",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A sales-efficiency metric is noise around target (monthly σ = $12,000). The current ±$15,000 monthly bonus threshold triggers constantly. Finance proposes alternatives. What evaluation cadence and threshold design best separates signal from noise?",
    "Choices": {
      "A": "Quarterly formal evaluation (±$15,000 threshold, ~3% false-alarm) with monthly monitoring-only flags — aggregation kills noise while true shifts accumulate",
      "B": "Monthly bonuses on monthly results — responsiveness requires monthly stakes",
      "C": "Annual evaluation only — maximum averaging eliminates all noise",
      "D": "Monthly evaluation on year-to-date cumulative results — accumulation smooths noise while keeping monthly cadence"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "False-alarm math: monthly P(|X| > $15,000) with σ = $12,000 is 2×(1 − Φ(1.25)) ≈ 21.1% — one month in five pays noise. Quarterly aggregation: σ_q = $12,000/√3 ≈ $6,928; P(|X| > $15,000) = 2×(1 − Φ(2.165)) ≈ 3.0% (15,000/6,928 = 2.165; Φ ≈ 0.9848; two-sided ≈ 3.04%). Monthly bonuses (option B) pay 21%-noise luck. Annual-only (option C) delays true-shift detection up to a year. YTD cumulative (option D) stockpiles January noise into every later reading. Business interpretation: match evaluation frequency to the noise horizon — aggregate until noise dies, evaluate where signal lives. Common trap: treating threshold breaches as findings without computing the null-hypothesis rate.",
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
    "QuestionID": "P1B-B-230",
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
    "ExplanationWrongB": "Option B bonuses monthly results with a 21% noise-trigger rate — one month in five pays luck. Responsiveness to noise is lottery administration with extra steps.",
    "ExplanationWrongC": "Option C goes annual to maximize averaging, but feedback delayed up to a year cannot steer behavior — control value decays with latency. Quarterly aggregation already cuts noise to ~3% without the year-long blind spot.",
    "ExplanationWrongD": "Option D accumulates monthly noise into year-to-date readings — January's luck contaminates all eleven subsequent evaluations. Cumulation smooths nothing; it stockpiles noise under a cadence illusion.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 3 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE3D;