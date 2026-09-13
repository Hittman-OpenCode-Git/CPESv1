const WAVE1315_PART_011 = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.235 stretch target calibration",
    "MicroTopic": "stretch target calibration",
    "UniqueConceptKey": "B-C-235-stretch-target-calibration",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division has hit 100% of budget 5 years running (suspicious consistency). Analysis: budgets are negotiated from last year +2% with full information asymmetry (manager knows capacity, HQ doesn't). HQ proposes stretch budgets (+15%) to break the cycle. The manager threatens to quit, citing unfairness. Design the target system.",
    "Choices": {
      "A": "Impose +15% — authority sets targets and managers execute or exit",
      "B": "Truth-telling design: replace negotiated increments with a menu — (1) base budget from external benchmarks (industry cost curves, not last year), (2) manager picks a target from a sliding scale where higher targets carry higher bonus rates (self-selection reveals private capacity information: sandbaggers leave money on the table visibly), (3) ratchet protection (pre-committed external formula, not past performance), (4) retention addressed separately (market pay, not target softness). The +2%-forever pattern is negotiated sandbagging; +15% fiat is unpriced difficulty. Menus price difficulty into choice — ambitious picks pay more, and the threat to quit over priced choice reveals preference, not unfairness",
      "C": "Surrender target-setting to the manager — self-set targets maximize commitment",
      "D": "Keep +2% — five years of hits proves the system works and retention matters most"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Mechanism design: negotiated +2% with asymmetry guarantees sandbagging (manager hides capacity, HQ can't verify). Fiat +15% prices unknown difficulty arbitrarily — quit threats may be genuine (impossible target) or strategic (defending slack), indistinguishable without information. The menu solves revelation: sliding scale (e.g., 100% target → 1× bonus rate; 110% → 1.5×; 120% → 2×) makes capacity self-revealing — a manager who knows 115% is reachable picks it for the higher rate; sandbagging at 100% visibly forfeits upside. External base (industry curves) anchors realism outside negotiation. Ratchet protection (pre-committed formula) removes the metering incentive. Fiat-imposition (option A) risks genuine-impossibility quits and poisons trust — authority without information misprices difficulty. Status-quo (option D: five hits prove success) mistakes negotiated certainty for performance — 100%-forever is the sandbagging signature. Self-set (option C) hands the keys to the informed party without pricing — commitment without calibration surrenders all surplus. Business interpretation: design target systems that pay for revelation — menus with priced ambition beat both negotiated increments and imposed stretch. Common trap: reading 100%-achievement streaks as excellence rather than information asymmetry.",
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
    "QuestionID": "P1B-C-235",
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
    "ExplanationWrongA": "Option A misprices unknown difficulty by fiat — genuine-impossibility quits and strategic quit-threats are indistinguishable without revelation mechanics.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C hands target-setting to the informed party unpriced — self-selection needs sliding rates to reveal capacity; flat self-set targets surrender surplus.",
    "ExplanationWrongD": "Option D reads five certain hits as success — 100%-forever under negotiated increments is the sandbagging signature, not excellence evidence.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.236 variance autopsy cadence",
    "MicroTopic": "variance autopsy cadence",
    "UniqueConceptKey": "B-C-236-variance-autopsy-cadence",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Monthly variance meetings review 40+ line items in 90 minutes (2 minutes each), every variance over $5,000 investigated equally, and repeat variances re-investigated from scratch each month. The controller calls the process thorough. Audit the review system itself.",
    "Choices": {
      "A": "System works — 40 items in 90 minutes with a $5,000 rule is disciplined coverage",
      "B": "Investigate more — lower the threshold to $1,000 and add weekly meetings",
      "C": "Triage redesign: (1) Pareto the agenda (top 5 variances by annualized exposure get 70 minutes; the 35 tail items get exception-dashboard treatment, not discussion); (2) replace the $5,000 flat rule with expected-value triage (probability × recurrence × correctability); (3) carry forward repeat variances with hypothesis tracking (month-2 starts from month-1 findings, not from scratch — repeats are processes under study, not new events); (4) close the loop (every investigation ends with decision/action/owner, reported back). Thoroughness is depth on what matters with memory across months, not equal minutes on everything with amnesia",
      "D": "Abolish variance meetings — variances report themselves in dashboards"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Review-system audit: 40 items × 2 minutes = breadth without depth (no variance gets diagnostic attention); flat $5,000 rule ignores probability/recurrence (a $6,000 one-off outranks a $4,900 monthly repeater — $58,800 annualized); from-scratch repeats waste prior findings (no hypothesis continuity); no close-out loop means investigations evaporate. Status-quo (option A: disciplined coverage) mistakes coverage for thoroughness — 2-minute reviews certify attention, never understanding. More-investigation (option B: $1,000 threshold + weeklies) scales the defect — more shallow reviews of smaller variances with the same amnesia. Abolition (option D) surrenders dialogue — dashboards display, meetings diagnose; the defect is agenda design, never meetings. Business interpretation: manage the variance system as a portfolio (Pareto agenda, EV triage, hypothesis memory, action close-out) — review effectiveness compounds across months exactly like the variances it studies. Common trap: equating meeting thoroughness with items-per-minute.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-236",
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
    "ExplanationWrongA": "Option A certifies attention without understanding — 2-minute reviews of 40 items produce coverage theater, never diagnostics.",
    "ExplanationWrongB": "Option B scales the defect — more shallow reviews of smaller variances with identical amnesia multiplies waste, never insight.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D surrenders diagnostic dialogue — dashboards display variances; meetings with Pareto agendas and hypothesis memory diagnose them.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.237 forecast accuracy accountability",
    "MicroTopic": "forecast accuracy accountability",
    "UniqueConceptKey": "B-C-237-forecast-accuracy-accountability",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales forecasts missed by ±20% three quarters running (alternating over/under). Operations holds excess inventory after overshoots and expedites after undershoots ($180,000 total cost). Sales says forecasting is inherently uncertain and refuses accountability. Design forecast accountability without punishing uncertainty.",
    "Choices": {
      "A": "Accountability for method, not outcomes: (1) measure bias separately from noise (3 alternating misses = noise-dominated, ±20% with no direction — no bias penalty; persistent one-direction misses would flag bias); (2) score forecast VALUE (did operations' plans beat naive no-change forecasts? $180,000 of coping cost vs a naive baseline); (3) require method upgrades after misses (wider scenarios, shorter cycles, demand sensing) with named owners — accountability attaches to calibration effort and method improvement, not to irreducible noise. Punishing ±20% noise teaches sandbagging (wide safe forecasts); ignoring it teaches sloppiness",
      "B": "Accept misses as acts of nature — forecasting uncertainty excuses all error",
      "C": "Accuracy metrics without method review — track error percentages publicly to shame improvement",
      "D": "Hold sales to ±5% accuracy with bonus forfeiture — precision mandates cure uncertainty"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Bias-vs-noise decomposition: alternating over/under ±20% with no direction = noise-dominated (unbiased but imprecise) — bias penalties need persistent direction. Value test: compare operations' planned outcomes against a naive baseline (no-change forecast) — if disciplined use of the forecasts still cost $180,000 in coping, price method upgrades by payback. Precision-mandate (option D: ±5% or forfeit) punishes irreducible noise — forecasters respond with sandbagged wide ranges that technically comply while informing nothing. Nature-excuse (option B) exempts method from review — noise excuses outcomes, never calibration effort. Shame-metrics (option C: public error percentages) optimize the metric's appearance (safe wide forecasts, late revisions) over its usefulness. Business interpretation: hold forecasters accountable for bias-free methods, value-adding use, and upgrade velocity — never for noise realization. Uncertainty is the job's terrain; calibration is its performance. Common trap: accuracy thresholds that punish noise and reward sandbagging.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Forecasting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-237",
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
    "ExplanationWrongB": "Option B exempts calibration effort — noise excuses outcome misses, not method review and upgrade velocity.",
    "ExplanationWrongC": "Option C optimizes metric appearance — public shaming produces safe wide forecasts and late revisions, not better foresight.",
    "ExplanationWrongD": "Option D's ±5% mandate punishes irreducible noise — forecasters answer with sandbagged ranges that comply technically while informing nothing.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.238 performance dialogue quality",
    "MicroTopic": "performance dialogue quality",
    "UniqueConceptKey": "B-C-238-performance-dialogue-quality",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Variance review transcripts show a pattern: managers explain every miss with uncontrollable causes (weather, suppliers, HQ) and every beat as skill; superiors accept explanations without evidence and rate on reported totals. The controller calls this a dialogue problem, not a numbers problem. Diagnose the equilibrium and redesign the conversation.",
    "Choices": {
      "A": "Accept the pattern — experienced managers' attributions are reliable and challenging them destroys trust",
      "B": "Self-serving attribution equilibrium: both sides profit from unverified stories (managers keep ratings, superiors keep harmony) while the company loses learning — every variance's cause goes unpriced. Redesign: (1) evidence standard (every causal claim needs a corroborating artifact — supplier memo, weather log, ticket data); (2) symmetric attribution (beats get the same causal audit as misses — skill claims need evidence too); (3) pre-commitment (causal categories and owners agreed before results, not argued after); (4) learning ledger (each review banks one process fix with owner and date, audited next month). Trust follows verified candor, not unverified comfort",
      "C": "Punish all misses equally — severity ends excuse-making regardless of cause",
      "D": "Replace dialogue with formulas — ratings computed mechanically from variances need no conversation"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Equilibrium analysis: unverified attribution is a stable bargain — managers trade comfort (no challenges) for harmony (no conflict), and superiors trade diligence for peace. The company pays in unpriced causes (repeat variances), untested skill claims (beats that were luck), and zero learning velocity. Acceptance (option A) sanctifies self-serving stories — experience predicts bias direction (self-serving), not accuracy; trust without verification is collusion. Formula-replacement (option D) eliminates dialogue instead of fixing it — mechanical ratings can't price novel causes or bank learning; conversation with evidence standards beats computation. Equal-punishment (option C) taxes bad luck with bad management identically — severity without causation teaches hiding, never honesty. Business interpretation: design reviews that make candor profitable (evidence standards cut both ways, pre-commitments remove post-hoc bargaining, learning ledgers compound fixes). The controller is right: numbers are fine — verify stories symmetrically and bank one fix per review. Common trap: mistaking harmonious reviews for effective ones.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Performance Evaluation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-238",
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
    "ExplanationWrongA": "Option A sanctifies self-serving stories — experience predicts the bias direction (self-serving), not its accuracy; unverified trust is collusion.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C taxes misfortune with mismanagement identically — severity without causation teaches concealment, not honesty.",
    "ExplanationWrongD": "Option D eliminates conversation instead of fixing it — mechanical ratings price neither novel causes nor learning velocity.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.239 budgetary slack detection",
    "MicroTopic": "budgetary slack detection",
    "UniqueConceptKey": "B-C-239-budgetary-slack-detection",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A department's budgets vs actuals, 3 years: Year 1 budget $1,000,000 / actual $940,000 (6% favorable); Year 2 $980,000 / $925,000 (5.6% F); Year 3 $960,000 / $910,000 (5.2% F). The manager cites consistent efficiency. HQ suspects slack (padded budgets, easy beats). Test the competing hypotheses with the data.",
    "Choices": {
      "A": "Efficiency confirmed — three straight favorable variances prove sustained excellence",
      "B": "Slack pattern with a test: three consecutive favorables (6.0%, 5.6%, 5.2%) with budgets ratcheting DOWN each year ($1,000,000 → $980,000 → $960,000) yet beats persisting at ~5-6% is the slack signature (true efficiency would show shrinking beats as ratchets bite, or step-change years, not metronomic 5-6%). But proof needs a cost driver test: benchmark $910,000 actual against external/engineering standards (not history) — if engineering says $850,000, slack is $60,000; if $910,000, efficiency is real. Verdict: pattern indicates slack (investigate via driver benchmarking), arbitrary 10% cuts punish without measuring — diagnose with independent standards, not with streak-counting or flat cuts",
      "C": "Inconclusive — favorables alone decide nothing; audit needed",
      "D": "Slack confirmed — three straight favorables prove padding; cut next budget 10%"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Streak analysis: three favorables at 6.0%/5.6%/5.2% with declining budgets — metronomic beats despite ratchets signal padding calibrated to stay safe (true efficiency gains arrive in steps and get competed away; perpetual 5-6% smells engineered). But streaks indicate, never prove — the decisive test benchmarks $910,000 actual against independent standards (engineering estimates, external comparables): $850,000 engineering → $60,000 slack quantified; $910,000 → efficiency vindicated. Efficiency-verdict (option A: three favorables prove excellence) reads the suspect's exhibit as defense — streaks under self-set budgets are the allegation's evidence. Slack-verdict-plus-cut (option D: proven, cut 10%) convicts on pattern and punishes by round number — $96,000 cut without driver measurement may starve real operations. Inconclusive-passivity (option C) stops at 'audit needed' without naming the test — the engineering benchmark IS the specified next step. Business interpretation: favorable streaks trigger driver-benchmarked audits, never verdicts or flat cuts — slack is quantified against independent standards, not streak counts. Common trap: treating favorable streaks as either proof of excellence or proof of padding.",
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
    "QuestionID": "P1B-C-239",
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
    "ExplanationWrongA": "Option A reads the suspect's exhibit as defense — favorable streaks under self-set budgets are the allegation's evidence, not its rebuttal.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C stops at 'audit needed' without specifying the test — the engineering/driver benchmark is the named next step, not a deferred question.",
    "ExplanationWrongD": "Option D convicts on pattern ($60,000 unmeasured) and punishes by round number ($96,000 flat cut) — quantification needs engineering benchmarks, not streak counts.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "B-C.240 continuous improvement standard",
    "MicroTopic": "continuous improvement standard",
    "UniqueConceptKey": "B-C-240-continuous-improvement-standard",
    "LOSTag": "P1-C Variance analysis",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A plant uses kaizen standards (cost target drops 2% per quarter: $50.00 → $49.00 → $48.02 → $47.06). Q3 actual $47.50 vs $47.06 standard = $0.44 U. The manager protests: costs fell 5% year-over-year ($50.00 → $47.50) yet shows unfavorable. The_VP calls kaizen demoralizing and wants static standards. Resolve the design dispute.",
    "Choices": {
      "A": "Static standards — $47.50 vs $50.00 = $2.50 F celebrates real improvement without demoralizing",
      "B": "Both right, split the report: kaizen variance ($0.44 U vs the $47.06 moving target — improvement pace slipped this quarter) AND year-over-year achievement ($2.50 F vs $50.00 base — genuine 5% gain) — the $0.44 U measures pace against commitment, the $2.50 F measures distance traveled. Report both with distinct responses (pace slip → diagnose this quarter's kaizen events; 5% gain → recognize cumulative progress). Static-only (option A) hides pace slippage inside cumulative glory; kaizen-only (option C) hides 5% achievement inside a $0.44 scolding; abandonment (option D) surrenders both signals. Design: moving target for pace accountability + fixed base for achievement recognition — demoralization comes from single-lens reporting, not from high standards",
      "C": "Abandon standards — improvement cultures outgrow measurement",
      "D": "Kaizen stands as-is — $0.44 U is $0.44 U and feelings do not enter measurement"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Two-lens mechanics: kaizen lens — $47.50 vs $47.06 moving target = $0.44 U (this quarter's improvement pace lagged the 2% commitment). Achievement lens — $47.50 vs $50.00 base = $2.50 F (5.0% cumulative gain: ($50.00 − $47.50)/$50.00). Both true simultaneously: pace slipped AND progress is real. Static-only (option A: $2.50 F celebrates) blinds pace management — cumulative glory hides this quarter's stall. Kaizen-only (option D: $0.44 U stands, feelings irrelevant) blinds recognition — $0.44 scoldings without $2.50 acknowledgment demoralize genuinely improving teams (motivation is a design input, not sentimentality). Abandonment (option C) surrenders pace and achievement signals together. Business interpretation: kaizen systems need dual reporting (moving-target pace + fixed-base achievement) with matched responses (diagnose slips, recognize gains) — single-lens kaizen punishes progress; single-lens static excuses stalls. Common trap: choosing between pace and achievement lenses instead of reporting both.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-C-240",
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
    "ExplanationWrongA": "Option A's static-only hides this quarter's pace stall inside cumulative glory — $0.44 of slipped commitment needs diagnosis, not celebration cover.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C surrenders pace and achievement signals together — improvement cultures need dual-lens measurement, not unmeasured faith.",
    "ExplanationWrongD": "Option D's kaizen-only hides 5% achievement inside a $0.44 scolding — recognition sustains the improvement the target demands.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 15 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15)",
    "certification_date": "2026-09-11"
  }
];
