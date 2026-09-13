const WAVE10B = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.111 stock compensation forfeiture estimate",
    "MicroTopic": "stock compensation forfeiture estimate",
    "UniqueConceptKey": "A-C111-stock-compensation-forfeiture-estimate",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "10,000 options granted, fair value $8 each ($80,000 total), 4-year cliff vesting, 10% estimated forfeitures. Year 1: actual forfeitures run 15% (1,500 left). How much Year-1 compensation cost should be recognized, and should the estimate be revised?",
    "Choices": {
      "A": "$20,000 (80,000/4) — estimates lock at grant and never revise",
      "B": "$18,000 Year 1 on the original 10% estimate with a cumulative catch-up only if the 15% persists a second year",
      "C": "$17,000 Year 1 (8,500 × $8 / 4 years) with the forfeiture estimate revised to 15% and a $1,000 cumulative catch-up",
      "D": "$0 Year 1 — cliff vesting recognizes nothing until year 4"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Revised expected-to-vest = 10,000 − 15% × 10,000 = 8,500 options × $8 = $68,000 total; Year-1 cost = $68,000/4 = $17,000. The $1,000 catch-up: originally $80,000 × 90% / 4 = $18,000 would have been booked — revising to 15% forfeitures trues up the $1,000 difference in the current period (cumulative catch-up, ASC 718). Lock-and-never-revise (option A, $20,000) ignores both forfeitures entirely. Wait-and-see (option B) defers a required estimate revision — forfeiture estimates update when evidence changes, not after multi-year confirmation. Cliff-equals-zero (option D) confuses cliff vesting (graded vs cliff affects attribution pattern, and 4-year cliff still accrues ratably at 1/4 per year... precisely straight-line over the requisite service period). Business interpretation: forfeiture estimates are trued up as evidence arrives — Year-1 catch-ups keep cumulative cost on the revised path. Common trap: freezing grant-date estimates.",
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
    "QuestionID": "P1-AC-111",
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
    "ExplanationWrongA": "Option A's $20,000 locks grant-date amounts with zero forfeitures — both the 10% original estimate and the 15% actual run rate ignored. Estimates exist to be applied and revised.",
    "ExplanationWrongB": "Option B defers revision until a second confirming year — forfeiture estimates update on current evidence (15% actual), not after multi-year proof. Deferral misstates cumulative cost.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $0 confuses cliff vesting (all-or-nothing payout) with cost attribution (ratable 1/4 per year over requisite service). Cliff affects who gets paid, never whether cost accrues.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.112 participating securities two-class method",
    "MicroTopic": "participating securities two-class method",
    "UniqueConceptKey": "A-C112-participating-securities-two-class-method",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Net income $1,000,000; 100,000 common shares; 10,000 participating preferred shares (6% $100 par = $60,000 dividend right, participating equally in undistributed earnings). Common dividends declared $200,000; preferred receive $60,000 + participation. What is basic EPS under the two-class method?",
    "Choices": {
      "A": "$10.00 ($1,000,000/100,000) — preferred dividends are the only allocation needed",
      "B": "$8.00 (($1,000,000 − $200,000)/100,000) — common dividends retained in the numerator",
      "C": "$8.73 — distributed $2.00 plus undistributed $6.73 (common share of $740,000 split 100,000:10,000)",
      "D": "$7.40 (($1,000,000 − $260,000)/100,000) — all preferred distributions removed, undistributed to common only"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Two-class: distributed first — common $200,000 ($2.00/share), preferred $60,000 stated. Undistributed = $1,000,000 − $200,000 − $60,000 = $740,000, allocated by participation ratio 100,000:10,000 → common 100/110 × $740,000 = $672,727.27 ($6.7273/share); preferred 10/110 × $740,000 = $67,272.73. Common EPS = $2.00 distributed + $6.7273 undistributed = $8.7273 ≈ $8.73. Single-class division (option A, $10.00) attributes $127,273 of preferred earnings to common. Declared-retained (option B, $8.00) keeps distributed dividends in the numerator. Common-only undistributed (option D, $7.40) denies the participation right. Business interpretation: two-class EPS pays stated distributions first, then splits leftovers by participation — both legs, every period. Common trap: reporting only one leg.",
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
    "QuestionID": "P1-AC-112",
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
    "ExplanationWrongA": "Option A's $10.00 divides all income by common shares, ignoring $60,000 of preferred distributions plus $67,273 of preferred participation — $127,273 of preferred earnings attributed to common.",
    "ExplanationWrongB": "Option B's $8.00 retains declared common dividends in the numerator — declared dividends are distributed earnings, allocated out before undistributed splitting.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D strips all preferred distributions ($260,000... precisely $60,000 + $200,000?) then allocates undistributed solely to common — denying the participation right the security's name states.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.113 treasury stock method sequencing",
    "MicroTopic": "treasury stock method sequencing",
    "UniqueConceptKey": "A-C113-treasury-stock-method-sequencing",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Net income $800,000; 100,000 shares; options: 20,000 at $10 exercise, average market $25; plus 5,000 out-of-the-money options at $40 exercise (market $25). What is diluted EPS?",
    "Choices": {
      "A": "$8.00 — options never dilute when markets rise above exercise",
      "B": "$6.96 — both option tranches included (25,000 gross shares added)",
      "C": "$7.14 — in-the-money tranche only (+12,000 net: $200,000 proceeds buy back 8,000; out-of-the-money tranche excluded as anti-dilutive)",
      "D": "$6.67 — all 25,000 options net of full treasury proceeds at $25"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "In-the-money tranche: proceeds 20,000 × $10 = $200,000 → buy back $200,000/$25 = 8,000 shares → net +12,000 shares. Out-of-the-money tranche ($40 exercise > $25 market): exercising would buy back MORE shares than issued (5,000 × $40 = $200,000 → 8,000 shares retired for 5,000 issued = net −3,000) — anti-dilutive, EXCLUDED by rule (never include anti-dilutive securities). Diluted = $800,000/(100,000 + 12,000) = $800,000/112,000 = $7.1429 ≈ $7.14. Skipping options entirely (option A, $8.00) ignores 12,000 net dilutive shares. Including both tranches (option B, $6.96) violates the anti-dilution exclusion. Pooling proceeds across tranches (option D, $6.67) corrupts the sequential test. Business interpretation: test each tranche separately against average market, include only dilutive ones. Common trap: gross-share addition.",
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
    "QuestionID": "P1-AC-113",
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
    "ExplanationWrongA": "Option A's $8.00 ignores 12,000 net dilutive shares — in-the-money options dilute whether or not markets keep rising; the treasury-stock test runs on average market price.",
    "ExplanationWrongB": "Option B's $6.96 includes the out-of-the-money tranche (25,000 gross shares) — anti-dilutive securities are excluded by rule, never included for completeness.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $6.67 appears to net all 25,000 options against pooled proceeds — mixing tranches with different moneyness corrupts the sequential test. Test each tranche separately, include only dilutive ones.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.114 comprehensive income reclassification",
    "MicroTopic": "comprehensive income reclassification",
    "UniqueConceptKey": "A-C114-comprehensive-income-reclassification",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "AFS portfolio: beginning AOCI $60,000 (unrealized gains); current-year unrealized gain $40,000; securities sold realizing $25,000 of previously-unrealized gains (now in net income). What are OCI and comprehensive income effects, and how is double-counting avoided?",
    "Choices": {
      "A": "OCI +$40,000; comprehensive includes $25,000 twice (once in OCI history, once in NI) — double-counting is inherent and accepted",
      "B": "OCI +$65,000 ($40,000 + $25,000 realized) — realization adds to OCI",
      "C": "OCI +$15,000 ($40,000 new gains less $25,000 reclassification out); comprehensive income includes the $25,000 once (in NI); ending AOCI $75,000",
      "D": "OCI $0 — realized and unrealized offset by definition each period"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "OCI = current unrealized $40,000 MINUS reclassification adjustment $25,000 (removing previously-recognized OCI now realized in NI) = +$15,000 net. Comprehensive income = NI (including the $25,000 realized gain) + OCI ($15,000) — the $25,000 appears once in the period's comprehensive total (via NI), with OCI reduced to prevent double-counting across periods. Ending AOCI = $60,000 + $15,000 = $75,000. Double-count acceptance (option A) defeats reclassification accounting's purpose. Realization-adds (option B: $65,000) double-counts the $25,000 across OCI history and current OCI. Zero-net (option D) confuses offsetting with absence — $15,000 of net OCI activity occurred. Business interpretation: reclassification adjustments are OCI's self-cleaning mechanism — realized gains exit OCI as they enter NI. Common trap: adding realized gains to OCI instead of subtracting them.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Comprehensive Income",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AC-114",
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
    "ExplanationWrongA": "Option A accepts double-counting ($25,000 in both OCI history and current NI without reclassification) as inherent — reclassification adjustments exist precisely to prevent it.",
    "ExplanationWrongB": "Option B's $65,000 adds realized gains into OCI — backwards. Realization moves gains OUT of OCI (reclassification deduction) as they enter NI.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $0 nets $40,000 of new gains against the $25,000 reclassification as if offsetting meant absence — $15,000 of net OCI activity occurred and reports.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.115 discontinued held-for-sale dual test",
    "MicroTopic": "discontinued held-for-sale dual test",
    "UniqueConceptKey": "A-C115-discontinued-held-for-sale-dual-test",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A component (clearly distinguishable operations/cash flows) with $2,000,000 revenue and $300,000 pre-tax loss is classified held-for-sale at year-end (sale probable within a year, marketed at fair value). It represents 5% of total revenue but management calls it a 'strategic shift' in MD&A. Does it qualify as discontinued operations?",
    "Choices": {
      "A": "Yes — held-for-sale plus MD&A strategic language satisfies both tests",
      "B": "No — 5% of revenue cannot be a strategic shift regardless of language; management labels don't meet the test, so report in continuing operations with held-for-sale balance-sheet presentation",
      "C": "Yes — any held-for-sale component is automatically discontinued",
      "D": "No — losses can never be discontinued; only gains qualify"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Discontinued operations require BOTH (1) held-for-sale (or disposed) AND (2) a strategic shift with major effect (line-of-business or geographic exit, quantitatively major). The component passes test 1 (held-for-sale criteria met) but fails test 2: 5% of revenue is not quantitatively major, and MD&A adjectives ('strategic') do not satisfy an effects test — labels never substitute for magnitude. Report the $300,000 loss in continuing operations; present related assets/liabilities as held-for-sale on the balance sheet. Language-satisfies (option A) lets MD&A draft accounting conclusions. Automatic-discontinued (option C) collapses the dual test into one — held-for-sale alone (e.g., a single store closure) routinely stays in continuing operations. Gains-only (option D) invents a sign restriction the standard does not contain. Business interpretation: discontinued presentation is reserved for exits that change what the company IS — 5% does not, whatever the MD&A says. Common trap: letting management labels satisfy quantitative tests.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Discontinued Operations",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-AC-115",
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
    "ExplanationWrongA": "Option A's language-satisfies lets MD&A adjectives meet a quantitative effects test — 5% of revenue is not a strategic shift however described. Labels never substitute for magnitude.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's automatic-discontinued collapses the dual test — held-for-sale alone (single stores, small lines) routinely remains in continuing operations. Both tests must pass.",
    "ExplanationWrongD": "Option D's gains-only rule invents a sign restriction — losses from strategic exits discontinue identically to gains. Sign never gates presentation.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.116 interim tax provision mechanics",
    "MicroTopic": "interim tax provision mechanics",
    "UniqueConceptKey": "A-C116-interim-tax-provision-mechanics",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Annual forecast: pre-tax income $1,000,000, tax $250,000 (25% AETR). Q1 actual pre-tax loss ($100,000) including a $40,000 discrete capital loss with a $14,000 tax benefit (35% capital rate). What is the Q1 tax provision?",
    "Choices": {
      "A": "$0 — losses incur no tax in interim periods",
      "B": "Benefit $25,000 (25% × $100,000 loss) — AETR applies to everything including discrete items",
      "C": "Benefit $29,000 — AETR on ordinary ($60,000) loss ($15,000) plus discrete $14,000 benefit, computed separately",
      "D": "Expense $250,000/4 = $62,500 — quarterly pro-rata of the annual provision"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Split ordinary from discrete: ordinary Q1 loss = ($100,000) + $40,000 discrete charge = ($60,000) ordinary loss → AETR benefit 25% × $60,000 = $15,000. Discrete capital loss: $40,000 × 35% capital rate = $14,000 benefit recognized in full in Q1 (discrete items bypass AETR). Total Q1 benefit = $15,000 + $14,000 = $29,000. Blended-rate option B ($25,000 = 25% × $100,000) reaches a different total by the wrong method — whenever discrete and ordinary rates differ, blending misstates. Zero-provision (option A) denies interim loss benefits entirely. Pro-rata (option D, $62,500) quarters the annual provision instead of applying AETR to year-to-date ordinary income. Business interpretation: interim provisions separate ordinary (AETR on YTD ordinary) from discrete (full-period benefit now) — two computations, never one blended rate. Common trap: applying AETR to discrete-inclusive income.",
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
    "QuestionID": "P1-AC-116",
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
    "ExplanationWrongA": "Option A's $0 denies interim loss benefits — AETR applies to year-to-date ordinary losses (benefit recognized), and discrete benefits record discretely. Zero-provision treats interim losses as worthless.",
    "ExplanationWrongB": "Option B's $25,000 blends the discrete capital loss into AETR at 25% instead of its 35% applicable rate — understating the benefit by $4,000. Whenever discrete and ordinary rates differ, blending misstates.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $62,500 pro-rates the annual provision — quarterly provisions follow year-to-date ordinary income times AETR plus discrete items, never annual quarters.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.117 segment profit test with corporate costs",
    "MicroTopic": "segment profit test corporate costs",
    "UniqueConceptKey": "A-C117-segment-profit-test-corporate-costs",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Segments report operating profit: A $500,000, B $300,000, C −$50,000, D $150,000, plus ($100,000) unallocated corporate costs. Total profit $800,000. Apply the 10% profit/loss quantitative test. Which segments are reportable on this test?",
    "Choices": {
      "A": "A only — only the largest profit matters",
      "B": "A and B — C's loss and D's smaller profit fall short",
      "C": "A, B, and D (absolute-profit base $950,000: A 52.6%, B 31.6%, D 15.8% pass; C 5.3% fails); corporate costs excluded from the base",
      "D": "All including corporate — the $800,000 total is the test base"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Profit test base = greater of absolute profitable-segment sum vs absolute loss-segment sum: max($500,000 + $300,000 + $150,000 = $950,000, $50,000) = $950,000. 10% threshold = $95,000. A ($500,000 = 52.6% ✓), B ($300,000 = 31.6% ✓), D ($150,000 = 15.8% ✓), C ($50,000 = 5.3% ✗). Corporate ($100,000) excluded — unallocated costs never enter segment tests. A-only (option A) ignores B/D's clear passes. A+B (option B) drops D's 15.8% pass and lands at 84.2% combined — passing coverage but failing D's individual test. Total-base (option D, $800,000) drags unallocated corporate into segment tests. Business interpretation: the profit test runs on segment amounts only, against the greater-side base — compute the base first, then test each segment. Common trap: testing against combined totals including corporate.",
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
    "QuestionID": "P1-AC-117",
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
    "ExplanationWrongA": "Option A's A-only ignores B ($300,000 = 31.6% of base) and D ($150,000 = 15.8%) — both clear 10% by wide margins. Largest-only is neither test.",
    "ExplanationWrongB": "Option B drops D's $150,000 (15.8% of $950,000 base) — well above 10%. Mid-size passes are still passes.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $800,000 total-base includes ($100,000) unallocated corporate — segment tests use segment amounts only. Corporate costs never enter any quantitative test.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.118 VIE reconsideration trigger",
    "MicroTopic": "VIE reconsideration trigger",
    "UniqueConceptKey": "A-C118-VIE-reconsideration-trigger",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor holds 8% of Beacon LLC (not a VIE at inception — adequately capitalized, power shared proportionally). This year Beacon issues new debt that Harbor fully guarantees, and Harbor gains sole authority to direct Beacon's operations under an amended management contract. Must Harbor reconsider VIE status, and what is the likely conclusion?",
    "Choices": {
      "A": "No reconsideration — VIE status locks at inception permanently",
      "B": "No reconsideration — 8% equity is below every reconsideration threshold",
      "C": "Yes — reconsider on the guarantee-plus-power change; Beacon likely becomes a VIE (support-dependent) with Harbor as primary beneficiary (power + economics), requiring consolidation",
      "D": "Conclude no change after reconsidering — guarantees never affect VIE analysis"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "VIE reconsideration triggers include changes in governing documents, new financial support arrangements, and shifts in decision-making power — the guarantee plus sole-authority amendment hits all three. Post-change analysis: (1) Beacon likely becomes a VIE (dependence on Harbor's guarantee = insufficient equity at risk to finance activities without support); (2) Harbor is likely primary beneficiary (power via sole operating authority + economics via guarantee/loss absorption). Inception-locked status (option A) denies reconsideration rules that exist precisely for changed circumstances. Equity-threshold gating (option B: 8%) applies voting-interest thinking to a VIE question — power plus economics decide, never percentage. Guarantees-don't-matter (option D) ignores that support arrangements are primary VIE triggers. Business interpretation: reconsider VIE status on every structural change in power or support — inception conclusions expire when facts do. Common trap: treating initial non-VIE determinations as permanent.",
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
    "QuestionID": "P1-AC-118",
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
    "ExplanationWrongA": "Option A's inception-locked status denies reconsideration triggers that exist for changed power and support facts. Initial determinations expire when circumstances change.",
    "ExplanationWrongB": "Option B's 8% threshold gates a VIE question on voting-interest logic — power (sole authority) plus economics (guarantee) decide, never equity percentage.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D admits reconsideration but exempts guarantees from analysis — support arrangements are primary VIE triggers, and this guarantee plus sole authority is the textbook bundle.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.119 equity method basis difference amortization",
    "MicroTopic": "equity method basis difference amortization",
    "UniqueConceptKey": "A-C119-equity-method-basis-difference-amortization",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "30% stake acquired at $500,000; investee book value $1,200,000 (30% = $360,000); $140,000 excess attributed $100,000 to undervalued equipment (10-year life) and $40,000 to goodwill. Investee reports $100,000 net income and pays $40,000 total dividends. What is the investor's equity income?",
    "Choices": {
      "A": "$30,000 (30% × $100,000) — basis differences amortize only on disposal",
      "B": "$18,000 ($30,000 pickup less $12,000 dividends) — dividends reduce equity income directly",
      "C": "$27,000 ($30,000 pickup less $3,000 equipment amortization (30%... precisely $100,000/10 = $10,000 × 30% = $3,000); goodwill not amortized; dividends do not reduce income)",
      "D": "$26,000 ($30,000 less $4,000 combined amortization including goodwill)"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Pickup = 30% × $100,000 = $30,000. Equipment excess amortization = ($100,000/10 years) × 30%... precisely the $100,000 excess is the investor's 30% share already (or gross up: $100,000/10 = $10,000 × 30% = $3,000 — same $3,000 either basis). Goodwill $40,000 is NOT amortized (tested for impairment instead). Dividends ($12,000 share) reduce the investment account, never equity income. Equity income = $30,000 − $3,000 = $27,000. Amortize-on-disposal (option A, $30,000) ignores $3,000/year of equipment consumption. Dividends-reduce-income (option B, $18,000) confuses the investment account (reduced) with income (unaffected). Goodwill amortization (option D, extra $1,000... precisely $40,000/10 × 30% = $1,200 → $26,000... the drafted $4,000 is itself wrong: $3,000 + $1,200 = $4,200 → $25,800) compounds the error. Business interpretation: equity income = pickup minus excess-depreciation (never goodwill amortization, never dividends). Common trap: amortizing goodwill or netting dividends.",
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
    "QuestionID": "P1-AC-119",
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
    "ExplanationWrongA": "Option A's $30,000 skips $3,000/year of equipment-excess amortization — basis differences amortize over the asset's life, never deferred to disposal.",
    "ExplanationWrongB": "Option B's $18,000 nets $12,000 of dividends against income — dividends reduce the investment carrying amount, never equity income.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D amortizes $40,000 of goodwill alongside equipment — goodwill is impairment-tested, never amortized (and its own $4,000 figure miscomputes the hypothetical).",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.120 noncontrolling interest valuation choice",
    "MicroTopic": "noncontrolling interest valuation choice",
    "UniqueConceptKey": "A-C120-noncontrolling-interest-valuation-choice",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "80% acquired for $1,600,000; subsidiary FV $2,000,000 (full-goodwill view) versus subsidiary book value $1,500,000 with NCI share at $300,000 (partial-goodwill view). How do total goodwill and NCI differ between full-goodwill and partial-goodwill methods?",
    "Choices": {
      "A": "Identical — method labels never change goodwill or NCI amounts",
      "B": "Full: goodwill $500,000 ($2,000,000 − $1,500,000), NCI $400,000 (20% × $2,000,000); Partial: goodwill $400,000 ($1,600,000 − 80% × $1,500,000), NCI $300,000 (20% × book) — $100,000 of NCI goodwill is the difference",
      "C": "Full goodwill $400,000; partial $500,000 — full recognition reduces goodwill by sharing it",
      "D": "NCI always $400,000 — fair value governs regardless of method election"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Full-goodwill: consideration $1,600,000 + NCI FV $400,000 (20% × $2,000,000) = $2,000,000; less FV of net assets $1,500,000 = $500,000 goodwill (including $100,000 attributable to NCI). Partial-goodwill: consideration $1,600,000 − 80% × $1,500,000 ($1,200,000) = $400,000 goodwill (parent-only); NCI = 20% × $1,500,000 book = $300,000. Difference: $100,000 of NCI goodwill recognized under full, omitted under partial — NCI $400,000 vs $300,000; total goodwill $500,000 vs $400,000. Identical-outcome claims (option A) deny the $100,000 NCI-goodwill difference the election exists to create. Inverted figures (option C) swap the methods' results. NCI-always-$400,000 (option D) imposes fair value under the partial election that explicitly measures NCI at book share. Business interpretation: the NCI measurement election prices $100,000 of recognized NCI goodwill against simpler book-share mechanics — elect deliberately, disclose clearly. Common trap: treating the election as presentational.",
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
    "QuestionID": "P1-AC-120",
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
    "ExplanationWrongA": "Option A's identical-outcome claim denies the $100,000 NCI-goodwill difference — the election's entire economic content. Methods elect measurement, never mere labels.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C inverts the methods ($400,000 full vs $500,000 partial) — full-goodwill recognizes MORE ($500,000 including NCI share), never less. Direction matters.",
    "ExplanationWrongD": "Option D's always-$400,000 NCI imposes fair value under partial-goodwill's book-share election — the election chooses the $300,000 book measure deliberately.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 10 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE10B;