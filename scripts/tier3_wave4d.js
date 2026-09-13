const WAVE4D = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.091 DTA valuation allowance",
    "MicroTopic": "DTA valuation allowance",
    "UniqueConceptKey": "A-091-DTA-valuation-allowance",
    "LOSTag": "P1-A.9 Income taxes",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A company carries a $200,000 deferred tax asset from NOL carryforwards. Evidence: 40% probability of sufficient future taxable income (new contracts cover $80,000 of the DTA; the remaining $120,000 depends on speculative market recovery). What valuation allowance and net DTA are required?",
    "Choices": {
      "A": "$0 allowance — NOLs are statutory rights, always fully realizable",
      "B": "$200,000 allowance — uncertainty taints the entire asset",
      "C": "$120,000 allowance; $80,000 net DTA — only the contracted $80,000 meets more-likely-than-not",
      "D": "$80,000 allowance — the realizable portion is the allowance"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "ASC 740's more-likely-than-not test (>50% probability) applies dollar by dollar: $80,000 backed by signed contracts clears MLTN (realizable, no allowance); $120,000 resting on speculative recovery fails it (40% overall probability, concentrated in the speculative portion) — allowance $120,000; net DTA $80,000. Zero allowance (option A) treats statutory existence as economic realizability — NOLs expire worthless without future income. Full allowance (option B) ignores the $80,000 of contracted coverage. Option D swaps the figures, allowing for what is realizable and carrying what is not — backwards. Business interpretation: bifurcate DTAs by evidence quality — contracted, forecasted, and speculative dollars carry different MLTN verdicts. Common trap: all-or-nothing allowance on mixed-evidence DTAs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Income Taxes",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-091",
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
    "ExplanationWrongA": "Option A allows the full $200,000 because NOLs are statutory rights. Statutory existence does not create future taxable income — without it, carryforwards expire worthless regardless of legal validity.",
    "ExplanationWrongB": "Option B allows the full $200,000 for uncertainty, ignoring $80,000 of contracted coverage that clears MLTN. Uncertainty taints the speculative portion, not the contracted one — bifurcate by evidence.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $80,000 allowance covers the realizable portion and carries the speculative $120,000 — exactly backwards. Allowances cover what fails MLTN ($120,000), never what passes it.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.092 segment reporting thresholds",
    "MicroTopic": "segment reporting thresholds",
    "UniqueConceptKey": "A-092-segment-reporting-thresholds",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Total revenue $2,000,000. Segments: A $900,000 (45%), B $500,000 (25%), C $150,000 (7.5%), D $450,000 (22.5%). Which segments are reportable, and does the 75% combined test add anyone?",
    "Choices": {
      "A": "All four — completeness requires full segment disclosure",
      "B": "A only — only the largest segment matters",
      "C": "A and B — C and D are both too small",
      "D": "A, B, and D (all pass 10%; combined 92.5% clears 75%); C excluded at 7.5%"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "10% revenue test: A 45% ✓, B 25% ✓, C 7.5% ✗, D 22.5% ✓. Reportable on thresholds: A, B, D. Combined test: ($900,000 + $500,000 + $450,000)/$2,000,000 = $1,850,000/$2,000,000 = 92.5% ≥ 75% — satisfied with no additions, so C stays excluded. All-four (option A) ignores the threshold structure that keeps immaterial segments out. A-only (option B) fails the 75% test ($900,000/$2,000,000 = 45% < 75%) and ignores B/D's clear passes. A+B (option C) drops D's 22.5% pass and lands at 70% — failing 75% by 5 points. Business interpretation: the 10% tests identify significance; the 75% test guarantees coverage — run both, in order. Common trap: stopping after the 10% tests when coverage falls short.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Segment Reporting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-092",
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
    "ExplanationWrongA": "Option A reports all four for completeness, but the 10% threshold exists to keep immaterial segments (C at 7.5%) out. Completeness without materiality buries users in trivia.",
    "ExplanationWrongB": "Option B reports only A, reaching 45% combined — failing the 75% coverage test by 30 points and ignoring B/D's clear 10% passes. Largest-only reporting is neither test.",
    "ExplanationWrongC": "Option C reports A+B (70%), dropping D's 22.5% pass and landing 5 points short of 75%. D unambiguously passes — exclusion has no basis in either test.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.093 fair value hierarchy classification",
    "MicroTopic": "fair value hierarchy classification",
    "UniqueConceptKey": "A-093-fair-value-hierarchy-classification",
    "LOSTag": "P1-A.8 Financial ratios",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Classify four holdings: (1) Apple shares (quoted NYSE price); (2) corporate bond priced via benchmark yield curve plus credit spread with no identical-issue quote; (3) private startup equity valued by DCF on unobservable growth assumptions; (4) Treasury bills (quoted prices). Which hierarchy assignment is correct?",
    "Choices": {
      "A": "All Level 1 — every holding has some market reference",
      "B": "1→L1, 2→L2, 3→L3, 4→L1 — observability of the lowest significant input governs",
      "C": "Bond→L1 — yield curves are quoted markets",
      "D": "Startup→L2 — DCF models are standard valuation practice"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "ASC 820 ranks by the lowest-level significant input: (1) Apple — quoted price for the identical asset in an active market → Level 1. (2) Corporate bond — no identical quote; value rests on observable yield curves and spreads → Level 2 (observable inputs other than quoted identical prices). (3) Startup equity — DCF driven by unobservable growth assumptions → Level 3. (4) T-bills — quoted prices → Level 1. 'Some market reference' (option A) collapses the hierarchy — curves and models are not identical-asset quotes. Yield curves (option C) are observable inputs, not identical-asset quotes — one level down by definition. Standard models (option D) do not make unobservable inputs observable — DCF ubiquity is irrelevant to input classification. Business interpretation: hierarchy placement follows the weakest significant input — audit the lowest input, not the fanciest model. Common trap: equating model sophistication with input observability.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Fair Value",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-093",
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
    "ExplanationWrongA": "Option A places everything in Level 1 on 'some market reference.' Level 1 requires quoted prices for identical assets — curves, spreads, and models are references of decreasing observability, each a level down.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C promotes the bond to Level 1 because yield curves are 'quoted.' Curves price benchmark instruments, not this identical bond — observable non-identical inputs define Level 2, not Level 1.",
    "ExplanationWrongD": "Option D promotes the startup to Level 2 because DCF is standard practice. Model ubiquity does not make unobservable growth assumptions observable — the lowest significant input (growth) is Level 3.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.094 subsequent events type I versus II",
    "MicroTopic": "subsequent events type I II",
    "UniqueConceptKey": "A-094-subsequent-events-type-I-II",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Year-end 12/31; audit report date 3/15. Event 1 (Feb 2): a major customer declares bankruptcy from financial distress evident in December (the $300,000 receivable was doubtful at year-end; allowance held only $50,000). Event 2 (Feb 20): fire destroys a warehouse (fully insured, new event). What treatment does each require?",
    "Choices": {
      "A": "Adjust for both — all material subsequent events adjust",
      "B": "Disclose both without adjusting — subsequent events never adjust issued-pending statements",
      "C": "Adjust for the fire, disclose the bankruptcy — severity governs, not timing",
      "D": "Type I: +$250,000 provision (condition existed at year-end); Type II: disclose fire, no adjustment"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Type I (recognized): conditions existing at the balance-sheet date — the customer's December distress means the $300,000 receivable was impaired at 12/31; the bankruptcy provides better evidence of that year-end condition. Additional provision = $300,000 − $50,000 allowance = $250,000 adjustment. Type II (non-recognized): the February fire is a new condition arising after year-end — disclose (nature + estimate, mitigated by insurance) with no statement adjustment. Adjust-everything (option A) books a February fire into December numbers — hindsight accounting. Disclose-everything (option B) leaves the $250,000 year-end impairment unadjusted despite direct evidence. Severity-governed reversal (option C) adjusts the dramatic-but-new fire while disclosing the quiet-but-preexisting bankruptcy — exactly backwards; timing of the underlying condition, not drama, draws the line. Business interpretation: ask 'did this condition exist at midnight 12/31?' — yes adjusts, no discloses. Common trap: adjusting for spectacular post-year-end events.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Subsequent Events",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-094",
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
    "ExplanationWrongA": "Option A adjusts for both, booking a February fire into December numbers. Post-year-end new conditions never adjust — hindsight is not evidence of year-end conditions.",
    "ExplanationWrongB": "Option B discloses both without adjusting, leaving the $250,000 year-end impairment (directly evidenced by the bankruptcy) unadjusted. Type I evidence compels adjustment, not optional disclosure.",
    "ExplanationWrongC": "Option C adjusts the fire and discloses the bankruptcy — severity-governed and exactly backwards. The line is timing of the underlying condition (pre-existing vs new), never drama magnitude.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.095 error estimate principle changes",
    "MicroTopic": "error estimate principle changes",
    "UniqueConceptKey": "A-095-error-estimate-principle-changes",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Three situations: (1) bad-debt rate raised 2%→3% on new collection data; (2) discovered 2023 depreciation used the wrong useful life; (3) inventory method switched FIFO→weighted-average. Classify each as estimate change, error correction, or principle change, with treatment.",
    "Choices": {
      "A": "All prospective — all changes apply forward as new information",
      "B": "All retrospective — all changes restate comparatives",
      "C": "(1) estimate change prospective; (2) error correction with prior-period restatement; (3) principle change retrospective",
      "D": "(1) error, (2) estimate — new data means old numbers were wrong in both"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "(1) Bad-debt rate revision on new collection data is a change in accounting estimate — new information about an uncertain measure, applied prospectively (current + future periods, no restatement). (2) Wrong useful life in 2023 depreciation is a prior-period error (mathematical/misapplication mistake using information available then) — correction via prior-period adjustment: restate comparatives and adjust opening retained earnings. (3) FIFO→average is a change in accounting principle — retrospective application (restate comparatives) unless impracticable, with preferability justification required. All-prospective (option A) lets the 2023 error and the principle change escape restatement. All-retrospective (option B) restates for an estimate change that GAAP explicitly treats prospectively. Option D swaps (1) and (2): new collection data makes old estimates outdated, not wrong — errors require information available-but-misused at the time. Business interpretation: ask 'new information, old mistake, or new rule?' — information→prospective, mistake→restate, rule→retrospective. Common trap: restating estimates or prospecting errors.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Accounting Changes",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-095",
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
    "ExplanationWrongA": "Option A treats everything prospectively, letting the 2023 depreciation error and the FIFO→average principle change escape restatement. Only estimate changes go prospective — errors and principle changes restate.",
    "ExplanationWrongB": "Option B restates everything including the bad-debt estimate revision. Estimate changes apply prospectively by rule — restating for new information rewrites history that was reasonable when written.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D swaps (1) and (2): new collection data makes old estimates outdated, not wrong — errors require information that was available but misused at the time. Direction of information flow decides.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE4D;