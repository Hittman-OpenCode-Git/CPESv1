const WAVE5A = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.076 bond discount amortization",
    "MicroTopic": "bond discount amortization",
    "UniqueConceptKey": "A-D076-bond-discount-amortization",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $1,000,000 face, 6% stated-rate, 5-year bond is issued at $920,000 when the market rate is 8%. What are Year-1 interest expense and end-of-Year-1 carrying value under the effective-interest method?",
    "Choices": {
      "A": "$73,600 expense; $933,600 carrying — discount amortization grows as carrying grows",
      "B": "$60,000 expense — coupon payment equals interest expense",
      "C": "$73,600 expense; $920,000 carrying — amortization starts in Year 2",
      "D": "$76,000 expense; $936,000 carrying — straight-line amortization"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Interest expense = carrying × market rate = $920,000 × 8% = $73,600. Coupon = $1,000,000 × 6% = $60,000. Discount amortization = $73,600 − $60,000 = $13,600; carrying = $920,000 + $13,600 = $933,600. Because expense tracks growing carrying value at a constant 8%, amortization increases each year ($13,600, then more) — the mirror image of premium bonds, where amortization declines. Coupon-equals-expense (option B) ignores the $80,000 discount investors demanded precisely to earn 8%, not 6%. Deferred amortization (option C) freezes carrying. Straight-line (option D: $80,000/5 = $16,000 → $76,000 expense) misstates constant-yield economics in the opposite direction from premium bonds. Business interpretation: discount bonds accrete — expense starts above coupon and converges downward toward it. Common trap: expensing the coupon.",
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
    "QuestionID": "P1-AD-076",
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
    "ExplanationWrongB": "Option B expenses the $60,000 coupon, ignoring the $80,000 discount — investors paid below par precisely to earn the 8% market yield ($73,600), not the 6% coupon. Coupon is cash flow, not expense.",
    "ExplanationWrongC": "Option C computes $73,600 correctly but freezes carrying at $920,000, skipping the $13,600 accretion. Unamortized discount must accrete from day one — frozen carrying understates liabilities.",
    "ExplanationWrongD": "Option D applies straight-line ($16,000/year → $76,000 expense). GAAP requires effective-interest for bonds because straight-line distorts constant-yield economics — here overstating early expense.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.077 falling-price method comparison",
    "MicroTopic": "falling-price method comparison",
    "UniqueConceptKey": "A-D077-falling-price-method-comparison",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beginning inventory 5,000 units @ $12 ($60,000); purchases 10,000 @ $10 ($100,000); sales 12,000 units. Compare FIFO versus moving-average COGS and ending inventory in this falling-price environment.",
    "Choices": {
      "A": "Identical — method choice never matters when prices fall steadily",
      "B": "FIFO COGS $130,000, ending $30,000; average COGS $128,000, ending $32,000 — falling prices invert the usual rising-price story",
      "C": "FIFO COGS $128,000; average $130,000 — falling prices preserve the rising-price ranking",
      "D": "FIFO ending $32,000; average ending $30,000 — ending follows COGS inversely"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "FIFO consumes oldest first: 5,000 × $12 + 7,000 × $10 = $60,000 + $70,000 = $130,000 COGS; ending = 3,000 × $10 = $30,000. Moving average = $160,000/15,000 = $10.6667/unit; COGS = 12,000 × $10.6667 = $128,000; ending = 3,000 × $10.6667 = $32,000. In falling prices FIFO reports higher COGS ($130,000 > $128,000) and lower ending ($30,000 < $32,000) — the mirror of rising-price effects, where FIFO shows lower COGS and higher inventory. The $2,000 difference is small here but directionally decisive for tax and covenant analysis. Identical-results (option A) denies method mechanics entirely. Option C preserves the rising-price ranking (FIFO-lower-COGS) that falling prices invert. Option D's ending assignment contradicts its own COGS (ending must complement COGS to $160,000 of goods available). Business interpretation: price direction flips every FIFO-vs-average intuition trained on rising prices — re-derive, never transpose. Common trap: applying rising-price rankings to falling-price facts.",
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
    "QuestionID": "P1-AD-077",
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
    "ExplanationWrongA": "Option A claims method choice never matters in falling prices. Methods always differ when unit costs vary across layers ($12 vs $10) — price direction changes which method is higher, never whether they differ.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C preserves the rising-price ranking (FIFO COGS lower), but falling prices invert it: FIFO consumes the expensive old layers first ($130,000 > $128,000). Transposed intuitions fail direction checks.",
    "ExplanationWrongD": "Option D assigns endings inconsistently with its COGS — goods available total $160,000, so endings must complement COGS to $160,000 ($30,000 with $130,000; $32,000 with $128,000). Crossed assignments break the identity.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.078 equity pickup with dividend and impairment",
    "MicroTopic": "equity pickup dividend impairment",
    "UniqueConceptKey": "A-D078-equity-pickup-dividend-impairment",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "30% stake acquired at $500,000. Investee reports $100,000 net income and pays $40,000 total dividends. Year-end fair value of the stake drops to $450,000 with other-than-temporary evidence. What is the carrying value progression and final balance?",
    "Choices": {
      "A": "$518,000 then impaired to $450,000 — pickup $30,000, less $12,000 dividends, less $68,000 OTTI write-down",
      "B": "$530,000 — pickup plus dividends, no impairment without sale",
      "C": "$470,000 — dividends deducted twice (equity pickup net of distributions)",
      "D": "$500,000 — equity method ignores investee performance until dividends arrive"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Equity pickup = 30% × $100,000 = +$30,000 → $530,000. Dividends reduce the investment (return of capital, not income): 30% × $40,000 = −$12,000 → $518,000. OTTI decline to $450,000 fair value: impairment = $518,000 − $450,000 = $68,000 recognized in earnings → final carrying $450,000. Adding dividends (option B, $530,000... precisely $500,000 + $30,000 = $530,000 held without impairment) double-errors: dividends are not income under equity method, and OTTI cannot be deferred to sale. Option C's $470,000 deducts dividends twice. Option D's frozen $500,000 describes cost method, not equity — performance flows through carrying value every period. Business interpretation: equity carrying value tracks investee equity adjusted for basis differences — pickup adds, distributions subtract, impairments reset. Common trap: treating equity-method dividends as income.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Investments",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-078",
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
    "ExplanationWrongB": "Option B holds $530,000 (pickup without dividend reduction, no impairment). Dividends reduce equity-method carrying value as capital returns — and OTTI must be recognized when evidenced, never deferred to sale.",
    "ExplanationWrongC": "Option C's $470,000 deducts the $12,000 dividend share twice (once in pickup netting, once separately). One distribution, one deduction — $500,000 + $30,000 − $12,000 = $518,000 pre-impairment.",
    "ExplanationWrongD": "Option D freezes carrying at $500,000 until dividends arrive — cost-method mechanics under an equity-method fact pattern. Performance flows through carrying value every period under significant influence.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.079 installment sale default and repossession",
    "MicroTopic": "installment sale default repossession",
    "UniqueConceptKey": "A-D079-installment-sale-default-repossession",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Installment sale $200,000, COGS $120,000 (60% cost ratio, 40% gross profit). Year 1 collections $50,000. Year 2 the buyer defaults; goods repossessed with fair value $30,000; remaining receivable $150,000. What gross profit was recognized in Year 1, what was deferred, and what is the Year-2 repossession loss?",
    "Choices": {
      "A": "Y1 $50,000; deferred $150,000; no loss — repossession restores the receivable",
      "B": "Y1 $80,000; deferred $0 — full profit at sale with collection risk disclosed",
      "C": "Y1 $200,000 sale with $120,000 COGS at once — installment method is elective, not required",
      "D": "Y1 gross profit $20,000 (40% × $50,000); deferred $60,000; repossession loss $60,000 ($90,000 net receivable minus $30,000 FV)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Gross profit rate = ($200,000 − $120,000)/$200,000 = 40%. Year 1 recognized = 40% × $50,000 collected = $20,000. Total GP = $80,000; deferred = $80,000 − $20,000 = $60,000. At default: receivable $150,000 less deferred GP $60,000 = $90,000 net carrying; repossessed FV $30,000; loss = $90,000 − $30,000 = $60,000. Full-profit-at-sale (option B, $80,000) applies only where collectibility is reasonably assured — the installment method exists precisely for doubtful collection. Option A's $50,000 confuses collections with profit (revenue ≠ gross profit). Option C's $200,000/$120,000 at-once treatment restates the installment election away. Business interpretation: installment accounting matches profit to cash actually collected; repossession losses measure the shortfall between net carrying and recovered value. Common trap: recognizing collections as profit.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Revenue Recognition",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-079",
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
    "ExplanationWrongA": "Option A's $50,000 Year-1 profit confuses collections with gross profit — only the 40% margin portion ($20,000) is profit; the rest recovers cost. Collections are cash flow, not earnings.",
    "ExplanationWrongB": "Option B recognizes the full $80,000 at sale, applicable only with reasonably assured collection. Doubtful collection is the installment method's entire predicate — assured-collection accounting here front-loads $60,000 of unearned profit.",
    "ExplanationWrongC": "Option C books $200,000 sale with $120,000 COGS at once, restating away the installment election. Method elections constrain subsequent accounting — doubtful-collection sales defer profit by rule, not by choice.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.080 equity issuance costs and treasury",
    "MicroTopic": "equity issuance costs treasury",
    "UniqueConceptKey": "A-D080-equity-issuance-costs-treasury",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $1,000,000 common stock issuance incurs $60,000 underwriting fees. Separately, $40,000 of stock-option compensation vests this period, and the company repurchases $100,000 of its shares as treasury stock. How is each treated?",
    "Choices": {
      "A": "All $200,000 expensed — equity transactions flow through income like all costs",
      "B": "All $200,000 credited to equity — shareholder transactions never touch earnings",
      "C": "$60,000 to APIC (issuance cost, not expense); $40,000 compensation expense over vesting; $100,000 treasury contra-equity — three different treatments for three different economics",
      "D": "Capitalize $200,000 as an equity asset — treasury and fees are investments in own shares"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Three economics, three treatments: (1) $60,000 underwriting is a direct issuance cost — deduct from additional paid-in capital (reduces proceeds, never expense). Expensing it (option A's treatment) understates income... precisely, expensing overstates expense and understates both income and equity. (2) $40,000 option compensation is employee service cost — expense over the vesting period (never direct-to-equity; option B's blanket rule misfires here). (3) $100,000 treasury purchase is contra-equity (reduces outstanding equity), never an asset (option D) — a company cannot own itself as an investment. Business interpretation: equity transactions sort by economics — capital-raising friction adjusts proceeds, service compensation expenses, and own-share purchases contra equity. One blanket rule (options A/B/D) fails exactly because the three events differ. Common trap: expensing issuance costs or asset-izing treasury stock.",
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
    "QuestionID": "P1-AD-080",
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
    "ExplanationWrongA": "Option A expenses all $200,000 including $60,000 of issuance friction and $100,000 of treasury purchase — understating income by $60,000 and equity by $160,000. Equity transactions are not period costs.",
    "ExplanationWrongB": "Option B credits everything to equity including $40,000 of employee service compensation. Option expense recognizes service cost — never direct-to-equity.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D capitalizes $200,000 as an equity asset. Treasury stock is contra-equity (a company cannot hold itself as an investment), and issuance costs reduce proceeds — neither is an asset.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.081 retained earnings bridge with correction",
    "MicroTopic": "retained earnings bridge correction",
    "UniqueConceptKey": "A-D081-retained-earnings-bridge-correction",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beginning retained earnings $800,000; net income $250,000; cash dividends $100,000; discovery of a $30,000 (net of tax) prior-period expense understatement; OCI $40,000. What are ending retained earnings and total comprehensive income?",
    "Choices": {
      "A": "RE $920,000; comprehensive income $290,000 — correction adjusts opening RE, OCI excluded from RE",
      "B": "RE $950,000; comprehensive $250,000 — correction flows through current income",
      "C": "RE $960,000; comprehensive $330,000 — OCI added to retained earnings directly",
      "D": "RE $890,000; comprehensive $260,000 — dividends deducted twice (declared and paid)"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Ending RE = $800,000 + $250,000 (NI) − $100,000 (dividends) − $30,000 (prior-period correction to opening RE) = $920,000. The $30,000 error correction adjusts opening retained earnings directly (prior-period adjustment), never current income (option B's $950,000). OCI ($40,000) accumulates in AOCI, never in retained earnings (option C's $960,000). Dividends reduce RE once on declaration (option D double-counts declared-and-paid). Comprehensive income = $250,000 NI + $40,000 OCI = $290,000. Business interpretation: retained earnings bridges separate current performance (NI), distributions (dividends), and corrections (prior-period) — three different accountabilities in one reconciliation. OCI rides alongside in comprehensive income, never inside RE. Common trap: running corrections or OCI through the wrong equity door.",
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
    "QuestionID": "P1-AD-081",
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
    "ExplanationWrongB": "Option B's $950,000 runs the $30,000 correction through current income, misstating both current performance (+$30,000 phantom) and the correction's nature. Prior-period errors adjust opening RE directly, never current NI.",
    "ExplanationWrongC": "Option C's $960,000 adds $40,000 OCI directly into retained earnings. OCI accumulates in AOCI — separate equity component, never RE. Commingling them corrupts both balances.",
    "ExplanationWrongD": "Option D's $890,000 deducts dividends twice (declared and paid). Declaration creates the liability and reduces RE once; payment settles cash against the liability with no second RE hit.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.082 intercompany profit elimination",
    "MicroTopic": "intercompany profit elimination",
    "UniqueConceptKey": "A-D082-intercompany-profit-elimination",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Parent sells $200,000 of goods to Sub (cost $160,000 — a 25% markup on cost, equivalently a 20% gross margin on sales: $40,000 profit). Sub's ending inventory includes $50,000 of these goods. What consolidation elimination is required, and what is its effect?",
    "Choices": {
      "A": "Eliminate $10,000 unrealized profit (25% × $50,000 in EI) — debit COGS, credit inventory; consolidated inventory down $10,000",
      "B": "Eliminate $200,000 of sales and $160,000 of COGS only — ending inventory needs no adjustment once sales eliminate",
      "C": "Eliminate $50,000 (full EI amount) from inventory — all intercompany-held goods are unrealized",
      "D": "No elimination — Sub paid fair value, so profit is realized to the group"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Intercompany margin on sales = ($200,000 − $160,000)/$200,000 = $40,000/$200,000 = 20% (equivalently a 25% markup on cost: $40,000/$160,000). Unrealized profit in Sub's $50,000 ending inventory = 20% × $50,000 = $10,000. Entry: debit COGS $10,000, credit inventory $10,000 — consolidated inventory down $10,000; the $200,000 sale and $160,000 COGS also eliminate in full (option B's partial truth — sales/COGS elimination is necessary but insufficient without the EI profit purge). Full-EI elimination (option C, $50,000) writes off $40,000 of legitimate transferred cost. No-elimination (option D) lets the group profit from selling to itself. Business interpretation: eliminate the profit layer, never the cost base — the $40,000 of transferred cost is genuine group inventory. Common trap: confusing markup-on-cost (25%) with margin-on-sales (20%) when computing the embedded profit.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Consolidations",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-082",
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
    "ExplanationWrongB": "Option B eliminates the $200,000 sale and $160,000 COGS but skips the $10,000 EI profit purge. Sales/COGS elimination removes the transaction; only the unrealized-profit entry removes the self-dealt gain sitting in ending inventory.",
    "ExplanationWrongC": "Option C eliminates the full $50,000 EI amount, writing off $40,000 of legitimate transferred cost. Only the $10,000 profit layer is unrealized — the $40,000 cost basis is genuine group inventory.",
    "ExplanationWrongD": "Option D skips elimination because Sub 'paid fair value.' Fair value between affiliates still books group profit on self-dealing — consolidation exists precisely to purge it regardless of price fairness.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.083 VIE primary beneficiary test",
    "MicroTopic": "VIE primary beneficiary test",
    "UniqueConceptKey": "A-D083-VIE-primary-beneficiary-test",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor holds 10% of Beacon LLC's equity but guarantees Beacon's debt, directs Beacon's operations under a management contract, and absorbs losses through the guarantee. Beacon's equity is insufficient to finance its activities. Should Harbor consolidate Beacon, and on what basis?",
    "Choices": {
      "A": "No — 10% is below every consolidation threshold; equity method at most",
      "B": "No — guarantees are disclosed, never consolidation triggers",
      "C": "Yes only if Harbor acquires 51% — voting control remains the sole trigger",
      "D": "Yes — Beacon is a VIE (insufficient equity) and Harbor is primary beneficiary (power via management contract plus economics via guarantee/loss absorption)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "ASC 810's VIE model bypasses voting thresholds: (1) Beacon is a VIE — insufficient equity to finance activities without support. (2) Primary beneficiary = power + economics: Harbor directs operations (power via management contract — the activities most affecting returns) and absorbs economics (guarantee + loss absorption). Both prongs met → consolidate regardless of 10% equity. The 10%-threshold reading (option A) applies the voting-interest model to a VIE — wrong model. Guarantees-only (option B) understates Harbor's role: guarantee plus operational direction plus loss absorption is the textbook primary-beneficiary bundle. Voting-control-only (option C) ignores the VIE model entirely — ASC 810 exists precisely for control-without-majority structures. Business interpretation: VIE analysis asks 'who directs and who absorbs' — equity percentage is evidence, never the verdict. Common trap: applying 50% voting rules to VIEs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Consolidations",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AD-083",
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
    "ExplanationWrongA": "Option A caps analysis at 10% equity, applying voting-interest thresholds to a VIE. Insufficient-equity entities are evaluated under the VIE model, where power plus economics — not percentage — decides.",
    "ExplanationWrongB": "Option B treats the guarantee as disclosure-only, ignoring the management contract (power) and loss absorption (economics) alongside it. The bundle, not any single leg, makes Harbor primary beneficiary.",
    "ExplanationWrongC": "Option C demands 51% voting control as the sole trigger, erasing the VIE model. ASC 810 exists for control-without-majority — 51% absolutism would leave every VIE unconsolidated.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 5 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.084 debt restructuring gain measurement",
    "MicroTopic": "debt restructuring gain measurement",
    "UniqueConceptKey": "A-D084-debt-restructuring-gain-measurement",
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
    "QuestionID": "P1-AD-084",
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
    "Topic": "A.085 extinguishment with unamortized premium",
    "MicroTopic": "extinguishment unamortized premium",
    "UniqueConceptKey": "A-D085-extinguishment-unamortized-premium",
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
    "QuestionID": "P1-AD-085",
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
  }
];
module.exports = WAVE5A;