const WAVE5B = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.086 asset retirement obligation measurement",
    "MicroTopic": "asset retirement obligation measurement",
    "UniqueConceptKey": "A-D086-asset-retirement-obligation-measurement",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A mine faces $100,000 of reclamation cost in 10 years; discount rate 5%. What asset retirement obligation and asset cost are recorded today, and what is Year-1 accretion?",
    "Choices": {
      "A": "Liability and asset cost $61,391 (PV at 5%); Year-1 accretion $3,070 — the obligation grows toward $100,000 as time passes",
      "B": "Liability $100,000 today — record the full future cost immediately",
      "C": "No entry until Year 10 — obligations record on settlement",
      "D": "Liability $61,391 with no asset — retirement costs are period expenses"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "PV = $100,000 / 1.05^10 = $100,000 / 1.628895 = $61,390.96 ≈ $61,391 — recorded as both ARO liability and capitalized asset cost (added to the mine's carrying amount, depreciated over its life). Year-1 accretion = $61,391 × 5% = $3,069.55 ≈ $3,070 of interest-like expense, growing the liability toward $100,000 at settlement. Full-future-cost today (option B, $100,000) ignores discounting — time value applies to obligations like all long-term liabilities. Wait-until-settlement (option C) hides a presently-incurred legal obligation for a decade. Liability-without-asset (option D) understates the mine: retirement cost is part of acquiring the asset's service potential. Business interpretation: AROs put the end of an asset's life on today's balance sheet at present value — accretion is the clock ticking. Common trap: recording undiscounted future costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Long-Lived Assets",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-086",
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
    "ExplanationWrongB": "Option B records $100,000 today, ignoring a decade of discounting ($38,609 of time value). Long-term obligations record at present value — the $100,000 figure belongs to Year 10, not today.",
    "ExplanationWrongC": "Option C waits until settlement, hiding a presently-incurred legal obligation for ten years. AROs exist precisely because retirement duties are incurred at acquisition, not at cleanup.",
    "ExplanationWrongD": "Option D books the liability without capitalizing the asset, understating the mine by $61,391. Retirement cost is part of the asset's service potential — capitalize and depreciate it.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.087 troubled debt restructuring gain",
    "MicroTopic": "troubled debt restructuring gain",
    "UniqueConceptKey": "A-D087-troubled-debt-restructuring-gain",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Borrower owes $500,000 (carrying amount, including $20,000 accrued interest). Creditor agrees to new terms: present value of restructured payments is $420,000 at the original effective rate. The borrower is in financial difficulty. What gain, if any, does the borrower recognize, and what does the lender recognize?",
    "Choices": {
      "A": "No gain — restructurings merely re-time payments at the same economics",
      "B": "Borrower gain $60,000 ($500,000 − $440,000) — accrued interest excluded from carrying comparison",
      "C": "Borrower gain $80,000 ($500,000 − $420,000) to income; lender recognizes a corresponding $80,000 loss",
      "D": "Borrower defers $80,000 as a liability contra — gains on own debt are never income"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Troubled-debt restructuring (borrower): gain = carrying amount ($500,000, including accrued interest — part of the obligation) minus PV of restructured payments at the original effective rate ($420,000) = $80,000 recognized in income immediately. Excluding accrued interest (option B, $60,000) understates the obligation settled — carrying means carrying, all-in. No-gain (option A) treats restructuring as pure re-timing, ignoring the $80,000 of obligation extinguished below carrying. Deferral (option D) applies non-troubled modification accounting (effective-yield recalculation) to a troubled situation — financial difficulty plus concession triggers gain recognition, not deferral. The lender mirrors with an $80,000 loss (impairment of the receivable to restructured PV). Business interpretation: troubled restructurings crystallize economics the original terms obscured — gains and losses now, not over the new term. Common trap: stripping accrued interest from the carrying comparison.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Long-Term Liabilities",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-087",
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
    "ExplanationWrongA": "Option A finds no gain in re-timing, but $80,000 of obligation (carrying $500,000 vs restructured PV $420,000) is extinguished below carrying — a realized economic gain the troubled-restructuring rules recognize immediately.",
    "ExplanationWrongB": "Option B's $60,000 strips $20,000 of accrued interest from carrying. Accrued interest is part of the obligation settled — carrying means all-in, and the gain is $80,000, not $60,000.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D defers the $80,000 as a contra-liability, applying non-troubled modification mechanics (yield recalculation) to financial-difficulty-plus-concession facts. Troubled restructurings recognize gains now.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.088 dollar-value LIFO layer",
    "MicroTopic": "dollar-value LIFO layer",
    "UniqueConceptKey": "A-D088-dollar-value-LIFO-layer",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Base-year inventory cost $100,000 (index 1.00). Current-year ending inventory at current cost $130,000; price index 1.15. What is dollar-value LIFO ending inventory?",
    "Choices": {
      "A": "$130,000 — current cost is the LIFO value when prices rise",
      "B": "$113,043 — base-year dollars with no layer added",
      "C": "$115,000 — $100,000 base plus a $15,000 layer ($13,043 base dollars × 1.15)",
      "D": "$100,000 — LIFO never adds layers in inflation"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Convert to base dollars: $130,000 / 1.15 = $113,043.48. Layer = $113,043.48 − $100,000 = $13,043.48 base dollars × 1.15 index = $15,000.00. Ending = $100,000 base + $15,000 layer = $115,000. Current-cost carrying (option A, $130,000) abandons LIFO for current cost — the $15,000 inflation effect belongs in the layer valuation, not ignored. Base-dollars-only (option B, $113,043) forgets to re-inflate the layer — ending inventory reports in current dollars, not base dollars. No-layer (option D) denies the $13,043 base-dollar increment the computation proves. Business interpretation: dollar-value LIFO separates real growth (layers) from inflation (index) — deflate to find layers, re-inflate to report them. Common trap: reporting base-year dollars as the answer.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
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
    "QuestionID": "P1-AD-088",
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
    "ExplanationWrongA": "Option A's $130,000 carries inventory at current cost, abandoning LIFO — the $15,000 inflation layer must be isolated by deflation, not carried at its inflated face.",
    "ExplanationWrongB": "Option B's $113,043 reports base-year dollars as the answer, forgetting to re-inflate the $13,043 layer at 1.15. Ending inventory reports in current dollars — deflate to find, re-inflate to report.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D denies any layer despite $13,043 of base-dollar growth ($113,043 > $100,000). Real inventory growth exists — inflation indexing reveals it rather than concealing it.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.089 extinguishment with premium",
    "MicroTopic": "extinguishment premium",
    "UniqueConceptKey": "A-D089-extinguishment-premium",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Bonds: $500,000 face, unamortized premium $20,000 (carrying $520,000). Reacquired for $480,000 cash. What gain or loss is recognized?",
    "Choices": {
      "A": "$20,000 loss — premium paid over face is always a loss",
      "B": "$40,000 gain — carrying $520,000 less reacquisition $480,000",
      "C": "$20,000 gain — face less cash, ignoring premium",
      "D": "No gain or loss — par-value accounting nets to zero"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Extinguishment gain/loss = carrying amount − reacquisition price = $520,000 − $480,000 = $40,000 gain. The unamortized premium is part of carrying value — it represents prepaid interest the issuer no longer owes once the bonds retire. Face-minus-cash (option C, $20,000) strands the $20,000 premium in limbo. Loss readings (option A) invert the sign: paying $480,000 to kill a $520,000 obligation creates wealth, not loss. Par netting (option D) pretends premiums never existed. Business interpretation: extinguishment compares what you owed (carrying, all-in) to what you paid — the premium rides along on both sides of history until retirement crystallizes it. Common trap: computing gains off face value instead of carrying amount.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Long-Term Liabilities",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-089",
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
    "ExplanationWrongA": "Option A's $20,000 loss inverts the economics: paying $480,000 to extinguish $520,000 of obligation creates a $40,000 gain. Premiums paid over face describe cash flow, not the gain sign.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $20,000 (face minus cash) strands the $20,000 unamortized premium — carrying, not face, is the comparison basis. Premiums are part of what was owed until retirement.",
    "ExplanationWrongD": "Option D nets to zero on par-value logic, erasing both the premium and the discount-to-face purchase. Par netting works only when carrying equals face — never with unamortized balances.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.090 treasury stock transactions",
    "MicroTopic": "treasury stock transactions",
    "UniqueConceptKey": "A-D090-treasury-stock-transactions",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Purchase 10,000 own shares @ $30 ($300,000). Reissue 4,000 @ $35 ($140,000). Retire 2,000 (original issue premium was $15/share; par $10). What are the resulting treasury balance and equity effects?",
    "Choices": {
      "A": "Treasury $120,000 debit (4,000 shares); APIC +$20,000 on reissue; retirement: common −$20,000, APIC −$30,000, RE −$10,000",
      "B": "Treasury $300,000 asset — own shares are investments",
      "C": "Treasury $0 — purchases and reissues net within the period",
      "D": "Retirement needs no entry — cancelled shares simply vanish"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Cost method: treasury debit $300,000 on purchase. Reissue 4,000 @ $35: cash $140,000; treasury credit at cost 4,000 × $30 = $120,000; APIC credit $20,000 (excess over cost). Pre-retirement balance = $300,000 − $120,000 = $180,000 (6,000 shares). Retirement cancels 2,000 at cost 2,000 × $30 = $60,000: common −$20,000 (2,000 × $10 par), APIC −$30,000 (2,000 × $15 original premium), RE plug −$10,000 ($60,000 − $20,000 − $30,000). Treasury final = $180,000 − $60,000 = $120,000 (4,000 shares × $30). Check: 4,000 × $30 = $120,000 — reconciles. Business interpretation: track treasury by share count times cost at every step — dollar balances without share reconciliation hide retirement errors. Common trap: stopping the treasury roll at reissue and forgetting the retirement leg.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Stockholders' Equity",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-090",
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
    "ExplanationWrongB": "Option B books $300,000 of treasury as an asset — a company cannot hold itself as an investment. Treasury stock is contra-equity by definition.",
    "ExplanationWrongC": "Option C nets purchases against reissues to $0, but 6,000 shares remain outstanding-treasury before retirement (4,000 after) — netting ignores share counts for dollar activity.",
    "ExplanationWrongD": "Option D skips retirement entries as vanishing shares. Retired shares require removing par, related APIC, and any excess to RE — cancellation has three equity legs, not zero.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE5B;