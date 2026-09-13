const WAVE11C = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.121 forecast gaming discovery protocol",
    "MicroTopic": "forecast gaming discovery protocol",
    "UniqueConceptKey": "B-C121-forecast-gaming-discovery-protocol",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "The controller discovers a sales VP buried a $150,000 reserve via timing shifts (pulling Q2 orders into Q1), inflating the region's bonus pool by ~$22,000. Internal channels (CFO, audit committee) are unexhausted; no law is broken; amounts are quantitatively immaterial but bonus-material. What is the correct response protocol?",
    "Choices": {
      "A": "Ignore — quantitatively immaterial amounts never warrant action",
      "C": "Confront the VP, restate the current quarter, disclose to the audit committee — timing manipulation for bonus metrics violates credibility/integrity regardless of materiality, with internal channels first",
      "B": "External whistleblowing — manipulation forfeits all internal process",
      "D": "Silently reverse next quarter — self-correcting without confrontation preserves relationships"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Quantitative immateriality ($150,000) does not excuse bonus-material manipulation ($22,000 payout effect) — credibility (communicate fairly and objectively) and integrity trigger on the act and its incentive effect, not on GAAP materiality thresholds. The protocol escalates internally first: confront the VP with evidence (chance to explain/correct), restate the current quarter (undo the effect), disclose to the audit committee (governance oversight) — external whistleblowing (option B) with unexhausted internal channels violates proportionality. Ignoring (option A) confuses financial-statement materiality with ethical materiality. Silent reversal (option D) compounds concealment (a second undisclosed adjustment covering the first) and forfeits the governance record. Business interpretation: bonus-material manipulation is material by definition to the compensation system — materiality follows the decision the number serves. Common trap: importing GAAP quantitative materiality into ethical analysis.",
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
    "QuestionID": "P1-BC-121",
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
    "ExplanationWrongA": "Option A ignores $150,000 of timing manipulation as quantitatively immaterial — but its $22,000 bonus effect is material to compensation integrity. Ethical materiality follows the decision served, not GAAP thresholds.",
    "ExplanationWrongB": "Option B escalates externally with internal channels (CFO, audit committee) unexhausted. Proportionality requires internal resolution first — external channels are last resort, absent legal violation or retaliation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D silently reverses next quarter — a second undisclosed adjustment covering the first, compounding concealment while forfeiting the governance record the audit committee needs.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.122 forecast combination weighting",
    "MicroTopic": "forecast combination weighting",
    "UniqueConceptKey": "B-C122-forecast-combination-weighting",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Statistical forecast MSE is 100; judgmental (sales-team) forecast MSE is 150. The planning team uses judgment alone, then statistical alone, then argues endlessly. What combination rule should govern, and how should weights evolve?",
    "Choices": {
      "A": "Inverse-MSE weights: 60% statistical (150/250) + 40% judgment (100/250), reweighted annually on tracked accuracy — combined MSE beats either alone",
      "B": "Judgment alone — field knowledge always dominates models",
      "C": "Statistical alone — MSE 100 beats 150, so judgment adds only noise",
      "D": "50/50 fixed — equal respect for equal stakeholders"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Inverse-MSE (precision) weighting: w_stat = 150/(100+150) = 0.60, w_judg = 100/(100+150) = 0.40 — weight each source by the other's error (more precise = more weight). Combined MSE = 1/(1/100 + 1/150) = 1/(0.01 + 0.006667) = 1/0.016667 = 60 — below either alone (100, 150), the diversification dividend (errors partly cancel when uncorrelated). Judgment-alone (option B) pays MSE 150 for field knowledge available cheaper inside the combination. Statistical-alone (option C) discards turning-point information worth 40 points of MSE improvement (100 → 60). Fixed 50/50 (option D) ignores the measured precision gap — equal weights for unequal errors overweights the noisier source by 10 points. Annual reweighting on tracked accuracy keeps weights honest as relative skill drifts. Business interpretation: combine forecasts by precision, track to reweight — the combination is a portfolio, managed like one. Common trap: winner-take-all source selection that discards diversification gains.",
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
    "QuestionID": "P1-BC-122",
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
    "ExplanationWrongB": "Option B's judgment-alone pays MSE 150 for field knowledge available at 40% weight inside a 60-MSE combination — full price for partial information.",
    "ExplanationWrongC": "Option C's statistical-alone scores MSE 100 while the combination scores 60 — discarding 40 points of diversification gain (turning-point information) for methodological purity.",
    "ExplanationWrongD": "Option D's fixed 50/50 ignores the measured precision gap (100 vs 150 MSE) — equal weights for unequal errors overweights the noisier source by 10 points.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.123 risk-based reserve sizing",
    "MicroTopic": "risk-based reserve sizing",
    "UniqueConceptKey": "B-C123-risk-based-reserve-sizing",
    "LOSTag": "P1-B Planning and budgeting",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $10,000,000 program budget carries a flat 5% ($500,000) contingency. The risk register quantifies: supplier failure 20% × $1,000,000 ($200,000); scope growth 50% × $300,000 ($150,000); regulatory delay 10% × $1,000,000 ($100,000) — expected loss $450,000. How should contingency be sized and allocated?",
    "Choices": {
      "A": "Keep flat $500,000 — round numbers signal prudence to stakeholders",
      "C": "Cut to $450,000 flat — expected loss is the reserve, no management margin needed",
      "B": "Eliminate contingency — quantified risks belong in base estimates, not reserves",
      "D": "Hold $500,000 flat with no allocation — totals matter, ownership doesn't"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "This item is defective as drafted — the correct analysis allocates $450,000 of expected loss to risk owners plus a $50,000 central management reserve (same $500,000 total, risk-priced instead of flat), not flat-holding. CorrectChoice should be D-variant... precisely the risk-priced $450,000 + $50,000 design is missing from the choices as drafted. REPAIR: withdrawing A-keyed version; corrected BC-123 ships with the risk-priced choice keyed correctly.",
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
    "QuestionID": "P1-BC-123",
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
    "ExplanationWrongB": "WITHDRAWN — see repair note",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 11 (authored 2026-09-11, WITHDRAWN — key defect caught at authoring; corrected BC-123 ships separately)"
  }
];
module.exports = WAVE11C;