const WAVE2A = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.101 sales mix variance multi-product",
    "MicroTopic": "sales mix variance multi-product",
    "UniqueConceptKey": "C-C101-sales-mix-variance-multi-product",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Dunmore sells two gauges. Budget: X 6,000 units at $10 CM ($60,000); Y 4,000 units at $16 CM ($64,000); total 10,000 units, $124,000. Actual: X 7,000 at $10 ($70,000); Y 3,000 at $16 ($48,000); total 10,000 units, $118,000. Unit CMs held exactly. The sales manager blames soft Y demand. What do mix and quantity variances show?",
    "Choices": {
      "A": "Mix $6,000 U; quantity $0 — the 1,000-unit shift from $16 Y to $10 X cost $6,000 with no volume change",
      "B": "Mix $6,000 F; quantity $0 — selling more X units is favorable since total units held",
      "C": "Mix $0; quantity $6,000 U — with CMs constant, only volume matters",
      "D": "Mix $10,000 U; quantity $4,000 F — the shift cost 1,000 × $10 while volume added 1,000 × $4"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Total units are identical (10,000 vs 10,000), so the sales quantity variance is $0 — volume did not change, composition did. Mix variance = actual total units valued at budgeted mix versus actual mix, at budgeted CM: budgeted mix value = $124,000; actual mix value = $118,000; mix = $124,000 − $118,000 = $6,000 U. Equivalently, 1,000 units shifted from $16-CM Y to $10-CM X: 1,000 × ($16 − $10) = $6,000 U. The manager's 'soft Y demand' story is half the truth — Y softness explains the shift, but the $6,000 cost comes from where those buyers went (discount X), a mix-management failure, not just a demand shortfall. Business interpretation: hold total volume constant in analysis to isolate mix; incentive the profitable mix, not unit count. Common trap: calling unchanged total volume a zero-variance quarter.",
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
    "QuestionID": "P1-CC-101",
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
    "ExplanationWrongB": "Option B signs the mix favorable because X unit sales rose. Units are not contribution — the 1,000 added X units at $10 replaced 1,000 lost Y units at $16. More units of the worse mix is unfavorable by $6,000, not favorable.",
    "ExplanationWrongC": "Option C claims constant CMs leave only volume effects. Mix variance exists precisely when proportions change holding CMs constant — that is its definition. The $6,000 U is pure composition effect at frozen margins.",
    "ExplanationWrongD": "Option D fabricates a $10,000/$4,000 split from mismatched bases (1,000 × $10 mixes unit counts with CM differences incoherently). The shift valuation is 1,000 × ($16 − $10) = $6,000, single figure, unfavorable.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.102 revenue bridge with price and volume",
    "MicroTopic": "revenue bridge price volume",
    "UniqueConceptKey": "C-C102-revenue-bridge-price-volume",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Kestrel Instruments budgeted: Product A 5,000 units at $20 ($100,000); Product B 5,000 units at $30 ($150,000); total $250,000. Actual: A 6,000 units at $19 ($114,000); B 4,000 units at $31 ($124,000); total $238,000 ($12,000 U). The product manager attributes the shortfall to soft B demand. Decompose the revenue variance into price and volume effects.",
    "Choices": {
      "A": "Price $12,000 U; volume $0 — demand was flat overall",
      "B": "Price $2,000 U; volume $10,000 U — A discounting plus adverse B volume",
      "C": "Price $2,000 F; volume $14,000 U — netting error in the manager's favor",
      "D": "Price $10,000 F; volume $22,000 U — volume measured at actual prices"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Price effect at actual quantities: A 6,000 × ($19 − $20) = −$6,000; B 4,000 × ($31 − $30) = +$4,000; net price = −$2,000 U. Volume effect at budget prices: A (6,000 − 5,000) × $20 = +$20,000; B (4,000 − 5,000) × $30 = −$30,000; net volume = −$10,000 U. Total: −$2,000 − $10,000 = −$12,000 U — reconciles. The manager's 'soft B' story captures only the −$30,000 B-volume leg while missing A's +$20,000 volume offset and the −$6,000 A-discounting that B's +$4,000 price gain only partly covered. Business interpretation: revenue bridges must separate price discipline (A's discounting problem) from volume composition (B's demand problem) — different owners, different fixes. Common trap: pricing volume effects at actual prices, which smuggles price effects into volume.",
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
    "QuestionID": "P1-CC-102",
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
    "ExplanationWrongA": "Option A dumps the full $12,000 into price and zeroes volume, but quantities moved materially (A +1,000, B −1,000). Volume effects of +$20,000/−$30,000 are real and offsetting — ignoring them credits/blames pricing for quantity shifts.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C signs price favorable and inflates volume to $14,000 U — neither nets to −$12,000 (−$2,000 F + −$14,000 = −$16,000 ≠ −$12,000). The arithmetic fails reconciliation, the first test of any bridge.",
    "ExplanationWrongD": "Option D prices volume at actual prices, contaminating the volume measure with the very price effects the bridge exists to separate. Volume is always valued at budget prices — that separation is the method.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.103 labor gang mix and staffing yield",
    "MicroTopic": "labor gang mix staffing yield",
    "UniqueConceptKey": "C-C103-labor-gang-mix-staffing-yield",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A maintenance shift standard is a 10-person gang (4 skilled at $30/hr, 6 unskilled at $18/hr) for 10 hours: standard cost $2,280. Last night ran 3 skilled + 8 unskilled (11 workers) at standard rates for 10 hours: actual cost $2,340. The supervisor claims the $60 overrun is pure overstaffing. Decompose into mix and yield effects.",
    "Choices": {
      "A": "Mix $168 F; yield $228 U (net $60 U) — the cheaper crew saved $168 but 11 workers doing a 10-worker job cost $228",
      "B": "Mix $168 U; yield $228 U — both unfavorable, total $396 U",
      "C": "Mix $0; yield $60 U — rates met standard so only headcount matters",
      "D": "Mix $60 F; yield $0 — the overrun is fully explained by composition"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Actual cost at standard rates = 3×$30×10 + 8×$18×10 = $900 + $1,440 = $2,340. Standard-proportion cost for 11 workers = 4.4×$30×10 + 6.6×$18×10 = $1,320 + $1,188 = $2,508. Mix = $2,508 − $2,340 = $168 F (shift toward cheaper unskilled saved money). Yield = $2,508 − $2,280 standard = $228 U (11 workers did a 10-worker shift). Net: $228 U − $168 F = $60 U — reconciles. The supervisor's 'pure overstaffing' story captures the $228 yield but misses the $168 mix saving — and the real management question is whether the unskilled-heavy crew caused follow-on quality costs. Business interpretation: staffing variances decompose like material variances (price of skill vs quantity of workers); report both or misattribute. Common trap: treating headcount overage as the whole story when composition shifted favorably.",
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
    "QuestionID": "P1-CC-103",
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
    "ExplanationWrongB": "Option B signs mix unfavorable, but shifting 1 worker-slot from $30 skilled to $18 unskilled saves money — favorable by construction ($168 F). Direction of the shift determines the sign, not the headcount total.",
    "ExplanationWrongC": "Option C claims mix is zero when rates meet standard. Mix compares proportions at standard rates — rates meeting standard is the precondition for mix analysis, not a substitute for it.",
    "ExplanationWrongD": "Option D nets everything into a $60 mix effect with zero yield, but 11 workers did a 10-worker job — the $228 staffing overage is real and distinct from the $168 composition saving. Netting destroys both signals.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.104 denominator comparison practical versus budgeted",
    "MicroTopic": "denominator comparison practical budgeted",
    "UniqueConceptKey": "C-C104-denominator-comparison-practical-budgeted",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Foundry fixed overhead is $600,000. Practical capacity 75,000 hrs; budgeted production 60,000 hrs; actual 57,000 hrs; actual FOH $612,000. The controller prepares the variance report under practical denominator but shows the audit committee what budgeted denominator would have reported. What is the comparison, and which should govern evaluation?",
    "Choices": {
      "A": "Identical $42,000 U either way — denominator choice never changes total variance",
      "B": "Practical: budget $12,000 U + volume $144,000 U; budgeted-denominator: volume only $30,000 U — same budget variance, wildly different volume signals",
      "C": "Budgeted denominator is correct because plans, not engineering ideals, govern accountability",
      "D": "Practical denominator with actual-hours applied — zero volume variance is cleanest"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "This item is defective as drafted — option B carries the correct analysis (practical: budget $12,000 U + volume (75,000−57,000)×$8 = $144,000 U; budgeted-denominator: rate $10, volume (60,000−57,000)×$10 = $30,000 U) while keyed D describes actual-denominator nonsense. CorrectChoice should be B. REPAIR: withdrawing D-keyed version; corrected CD-104 ships keyed B.",
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
    "QuestionID": "P1-CC-104",
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
    "ExplanationWrongA": "WITHDRAWN — see repair note",
    "ExplanationWrongB": "WITHDRAWN — see repair note",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, WITHDRAWN — key defect caught at authoring; corrected CC-104 ships keyed B)"
  }
];
module.exports = WAVE2A;