// Wave 4B supplement: corrected A-087 (Apply/Moderate/3 per Rule 11 AF-3 adjudication 2026-09-10).
// The GAAP-vs-IFRS classification item is sophisticated multi-step rule application, not analysis:
// it classifies by determinate rules without decomposing interacting effects or diagnosing from data.
// Honest calibration retained the key (D) and all content; only the label changed.
const WAVE4B2 = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.087 GAAP versus IFRS operating classification",
    "MicroTopic": "GAAP IFRS operating classification",
    "UniqueConceptKey": "A-087-GAAP-IFRS-operating-classification",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "An analyst compares two identical companies — one reporting under GAAP, one under IFRS — across eight cash flows: interest received, dividends received, interest paid, dividends paid, equipment purchase, loan proceeds, stock issuance, income taxes paid. The GAAP company shows four operating items. The IFRS company classifies interest paid as financing and dividends received as investing. Reconcile the operating-section difference and identify the analytical consequence.",
    "Choices": {
      "A": "No difference exists — cash flow classification is identical across frameworks by convergence",
      "B": "GAAP operating is overstated — IFRS proves interest belongs in financing universally",
      "C": "IFRS operating is understated — all eight flows are operating in substance",
      "D": "GAAP operating holds four (interest/dividends received, interest paid, taxes); IFRS operating holds two (taxes plus whichever of interest/dividends the policy retains) — cross-framework operating cash flow is non-comparable without reclassification"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Under GAAP (ASC 230), operating holds exactly four: interest received, dividends received, interest paid, income taxes paid — equipment is investing; dividends paid, loan proceeds, and stock issuance are financing. Under IAS 7's flexibility, this IFRS company elects interest paid to financing and dividends received to investing, leaving operating with taxes paid plus retained items — two in this policy configuration. The difference in reported operating cash flow between identical companies is pure classification policy, zero economics. Neither framework is 'right' (options B/C pick sides in a standards choice); convergence (option A) never happened on this point — it is among the most tested GAAP/IFRS differences. Business interpretation: never compare operating cash flow across frameworks without reclassifying to a common policy — the same company reports different OCF in different GAAPs. The dividends asymmetry (received-operating vs paid-financing under GAAP) plus IFRS flexibility makes this the highest-yield classification item in Section A. Common trap: assuming cash flow sections are framework-neutral.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Statement of Cash Flows",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-087",
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
    "ExplanationWrongA": "Option A claims convergence eliminated the difference. It did not — IAS 7's interest/dividend flexibility versus ASC 230's fixed operating classification remains one of the most tested GAAP/IFRS differences.",
    "ExplanationWrongB": "Option B declares IFRS universally right that interest belongs in financing. Framework selection is policy, not truth — GAAP's operating treatment reflects interest's income-statement linkage. Neither placement is conceptually mandatory.",
    "ExplanationWrongC": "Option C calls all eight flows operating in substance. Equipment, loans, equity, and distributions are investing/financing by nature under both frameworks — substance supports the split, not its abolition.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "certification_batch": "Tier 3 Wave 4 (authored 2026-09-10, recalibrated Apply/Moderate per Rule 11 AF-3 adjudication; pending six-dimension verification)"
  }
];
module.exports = WAVE4B2;