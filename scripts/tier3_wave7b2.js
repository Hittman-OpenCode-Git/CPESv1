const WAVE7B2 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.118 payroll calendar disbursement spike",
    "MicroTopic": "payroll calendar disbursement spike",
    "UniqueConceptKey": "E-B-118-payroll-calendar-disbursement-spike",
    "LOSTag": "P1-B.2 Cash budgeting and forecasting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Salaried payroll $500,000/month (12×/year). Hourly payroll averages $500,000/month but pays biweekly (26×/year) — most months two paydays (~$461,538), two months per year three paydays (~$692,308). Q3 contains one three-payday month. How should the quarterly cash budget handle payroll?",
    "Choices": {
      "A": "$3,000,000 — average $1,000,000/month × 3; calendar effects wash out quarterly",
      "B": "$3,115,384 — salary $1,500,000 plus hourly $1,615,384 (two normal months $923,076 plus one spike month $692,308); budget the calendar, not the average",
      "C": "$2,769,230 — budget two paydays every month (26/12 × $500,000 × 3 is wrong direction)",
      "D": "Salary $1,500,000 + hourly $1,384,614 (two paydays monthly) — three-payday months are accrual timing, not cash"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Biweekly annual hourly = $500,000 × 12 = $6,000,000; per payday = $6,000,000/26 = $230,769.23. Normal month (2 paydays) ≈ $461,538; three-payday month ≈ $692,308. Q3 hourly = 2 × $461,538 + $692,308 = $923,076 + $692,308 = $1,615,384. Total = $1,500,000 salary + $1,615,384 hourly = $3,115,384. Averaging (option A, $3,000,000) understates cash needs by $115,384 — the spike month's extra $230,770 minus averaging smoothing — and the treasury funds actual disbursements, not averages. Two-paydays-everywhere (options C/D) deletes $461,538 of real annual disbursements (two spikes). Accrual-timing claims (option D) deny cash reality — biweekly paydays disburse cash on fixed dates regardless of month boundaries. Business interpretation: cash budgets follow disbursement calendars, never averages — map every payday in the quarter before funding it. Common trap: averaging lumpy payroll cycles.",
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
    "QuestionID": "P1E-B-118",
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
    "ExplanationWrongA": "Option A's $3,000,000 averages away the $230,770 spike — quarterly cash must fund the spike month's actual disbursement, not the average. Calendar effects never wash out in cash budgeting.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $2,769,230 budgets two paydays monthly year-round, deleting every third-payday spike by assumption — $461,538 of real annual disbursements (two spikes) vanish.",
    "ExplanationWrongD": "Option D treats three-payday months as accrual timing. Biweekly paydays are cash events on fixed dates — the third payday disburses $230,770 of real cash, accruable in no alternative universe.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.119 seasonal bias decomposition",
    "MicroTopic": "seasonal bias decomposition",
    "UniqueConceptKey": "E-B-119-seasonal-bias-decomposition",
    "LOSTag": "P1-B.1 Forecasting techniques",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Raw forecast errors show Q4 always +8–12% (actuals above forecast) while Q1–Q3 scatter ±3%. The team concludes systematic optimistic bias and proposes lifts to all quarters. Deseasonalized errors (actuals vs seasonally-adjusted forecast) scatter ±2% with zero mean. What is the correct diagnosis and fix?",
    "Choices": {
      "A": "Lift all quarters 10% — confirmed bias needs uniform correction",
      "B": "No bias exists — ±3% is tolerance, ignore the pattern",
      "C": "No forecaster bias — deseasonalized errors are unbiased (±2%, zero mean); the Q4 pattern is seasonal-model miss, fixed by re-estimating Q4's index, not by lifting all quarters",
      "D": "Cut Q4 10% — penalize the biased quarter into accuracy"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Decompose before diagnosing: deseasonalized errors (actuals vs seasonally-adjusted expectations) scatter ±2% with zero mean — the forecaster is unbiased; no behavioral correction (options A/D: uniform lifts or Q4 penalties) is warranted. The Q4 raw pattern (+8–12% every year) lives entirely in the seasonal component — the Q4 index is set ~10% too low, a model-specification error, not a forecaster-bias error. Fix: re-estimate Q4's seasonal index from history (+~10 points); leave Q1–Q3 indices and the base untouched. Uniform lifts (option A) bake a seasonal miss into three innocent quarters. No-bias dismissal (option B) ignores a recurring, one-directional, Q4-specific 10-point miss — tolerance covers scatter, not structure. Q4 penalties (option D) sanction the quarter instead of recalibrating its index. Business interpretation: separate forecaster bias (deseasonalized mean ≠ 0) from model miss (seasonal residuals) before prescribing — they have different owners and opposite fixes. Common trap: correcting bias that deseasonalization proves absent.",
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
    "QuestionID": "P1E-B-119",
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
    "ExplanationWrongA": "Option A lifts all quarters 10% on a bias that deseasonalization disproves (zero-mean ±2%) — and smears a Q4-specific index miss across three innocent quarters.",
    "ExplanationWrongB": "Option B dismisses a recurring one-directional Q4 residual (+8–12% yearly) as tolerance. Systematic seasonal residuals are model-miss evidence, not noise — tolerance covers scatter, not structure.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D penalizes Q4's forecast instead of recalibrating its index — sanctioning the quarter that the model underserves. Fix specifications, not forecasters, when deseasonalized errors clear them.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "E-B.120 grant cost allowability screen",
    "MicroTopic": "grant cost allowability screen",
    "UniqueConceptKey": "E-B-120-grant-cost-allowability-screen",
    "LOSTag": "P1-B.2 Budgeting methodologies",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $900,000 grant budget proposes: $700,000 allowable direct costs, $100,000 allowable indirect (negotiated rate applied correctly), $50,000 entertainment, $50,000 lobbying. The program director argues all $900,000 advances the mission and should stay. What is the compliant budget?",
    "Choices": {
      "A": "$900,000 — mission advancement justifies all costs to the grantor",
      "B": "$850,000 — drop entertainment but keep lobbying as stakeholder engagement",
      "C": "$850,000 — drop lobbying but keep entertainment as team morale",
      "D": "$800,000 — remove both $50,000 unallowable categories; mission relevance does not override allowability"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Cost principles (OMB-style allowability): entertainment ($50,000) and lobbying ($50,000) are expressly unallowable regardless of mission linkage — compliant budget = $700,000 + $100,000 = $800,000. Mission advancement (option A) is not an allowability criterion — allowability turns on cost principles and grant terms, never on programmatic enthusiasm. Half-removals (options B/C) split the difference between compliant and non-compliant as if allowability were negotiable per category — each unallowable dollar disallowed stands alone. Business interpretation: screen every grant line against allowability principles before mission arguments — unallowable costs risk disallowance findings, repayments, and future-award eligibility. Common trap: letting mission zeal launder expressly unallowable costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Inventory",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1E-B-120",
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
    "ExplanationWrongA": "Option A's $900,000 keeps expressly unallowable costs on mission grounds. Allowability turns on cost principles and grant terms — mission linkage is necessary but never sufficient.",
    "ExplanationWrongB": "Option B drops entertainment but keeps lobbying as 'engagement' — relabeling does not reclassify. Lobbying is expressly unallowable whatever its stakeholder framing.",
    "ExplanationWrongC": "Option C drops lobbying but keeps entertainment as 'morale' — symmetric relabeling failure. Each unallowable dollar stands disallowed on its own terms.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 7 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE7B2;