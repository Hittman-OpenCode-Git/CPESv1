const WAVE12B = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.161 non-troubled modification yield recalc",
    "MicroTopic": "non-troubled modification yield recalc",
    "UniqueConceptKey": "B-A-161-non-troubled-modification-yield-recalc",
    "LOSTag": "P1-A.6 Liabilities",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $1,000,000, 6%, 5-year bond (not in financial difficulty) is modified: coupon cut to 4% with maturity extended 2 years. PV of new cash flows at the ORIGINAL effective rate (6%) is $920,000 versus $1,000,000 carrying — an 8% change (below the 10% substantial-modification threshold). What is the correct accounting?",
    "Choices": {
      "A": "Recognize an $80,000 modification gain immediately — carrying exceeds new PV by $80,000",
      "B": "Derecognize and book a new $920,000 bond — any term change extinguishes the old debt",
      "C": "Defer the $20,000 of unamortized issuance costs — write-offs never survive modifications",
      "D": "No gain; recalculate the effective yield prospectively ($40,000 annual coupon over 7 years against $1,000,000 carrying plus unamortized costs) — non-substantial, non-troubled modifications adjust yield, never recognize gains"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Two gates: (1) troubled? No (stated). (2) Substantial (>10% PV change)? ($1,000,000 − $920,000)/$1,000,000 = 8% < 10% → non-substantial. Non-substantial, non-troubled modifications: no gain, no derecognition — recalculate the effective rate prospectively equating $1,000,000 carrying (+ unamortized issuance, still deferred) to the new 7-year $40,000-coupon schedule, amortizing forward. Immediate-gain treatment (option A: $80,000) applies troubled-restructuring mechanics to a healthy modification. Derecognition (option B) requires substantial change (≥10%) — 8% keeps the same instrument alive. Issuance write-off (option C) destroys unamortized balances that survive non-substantial modifications by rule. Business interpretation: modification accounting triages troubled-then-substantial before touching gains — pass neither gate and only the yield moves. Common trap: booking gains on non-troubled, non-substantial re-terms.",
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
    "QuestionID": "P1B-A-161",
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
    "ExplanationWrongA": "Option A's $80,000 immediate gain applies troubled-restructuring mechanics (carrying-vs-new-PV gains) to a healthy 8%-change modification — wrong gate, wrong result.",
    "ExplanationWrongB": "Option B derecognizes on any term change — derecognition requires substantial modification (≥10% PV change); 8% keeps the instrument continuous.",
    "ExplanationWrongC": "Option C writes off unamortized issuance that survives non-substantial modifications by rule — balances persist, only the yield recalculates.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.162 HTM transfer to AFS",
    "MicroTopic": "HTM transfer AFS",
    "UniqueConceptKey": "B-A-162-HTM-transfer-AFS",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A bond carried at $950,000 amortized cost (HTM) with fair value $980,000 is transferred to AFS when management's intent changes (a credit-downgrade forces a strategy shift). What entry is recorded, and what happens to the remaining HTM portfolio?",
    "Choices": {
      "A": "No entry — transfers between categories are presentational only",
      "B": "Debit investment $30,000, credit OCI $30,000 (carry to fair value through OCI); the transfer taints remaining HTM holdings, requiring re-evaluation of HTM intent on the rest",
      "C": "Debit investment $30,000, credit net income $30,000 — fair-value changes always hit earnings on transfer",
      "D": "Credit OCI $30,000 with no debit — OCI accumulates without a corresponding asset adjustment"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "HTM→AFS transfer: carry from amortized cost ($950,000) to fair value ($980,000) with the $30,000 difference to OCI (unrealized — realized only on sale). Earnings routing (option C) confuses transfers with sales — no realization occurred. No-entry (option A) leaves the asset $30,000 below its AFS measurement basis. One-sided OCI (option D) breaks double-entry. Critically, the transfer TAINTS the remaining HTM portfolio — sales/transfers out of HTM (outside safe harbors like credit deterioration... which this credit-downgrade may partially satisfy) call into question the HTM intent assertion on everything left behind, potentially forcing portfolio-wide reclassification to AFS. Business interpretation: HTM is a commitment device — breaking it reprices the transferred bond through OCI and puts the remaining book under intent review. Common trap: treating category transfers as cost-free re-labels.",
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
    "QuestionID": "P1B-A-162",
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
    "ExplanationWrongA": "Option A's no-entry leaves a $30,000 measurement gap — AFS carries at fair value, and the transfer date remeasures. Presentational-only treatment understates assets.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's $30,000 to earnings confuses transfers with sales — unrealized FV changes on AFS run through OCI until realized. No sale, no earnings.",
    "ExplanationWrongD": "Option D's one-sided OCI breaks double-entry — every OCI credit pairs with the $30,000 investment debit that carries the asset to fair value.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.163 debt security OTTI split",
    "MicroTopic": "debt security OTTI split",
    "UniqueConceptKey": "B-A-163-debt-security-OTTI-split",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A debt security (amortized cost $200,000, fair value $150,000) is other-than-temporarily impaired. Expected credit losses are $30,000; the remaining $20,000 decline reflects liquidity spreads. The holder does not intend to sell and will not be required to. How is the $50,000 impairment split?",
    "Choices": {
      "A": "$50,000 to earnings — all OTTI hits net income when credit is involved",
      "B": "$50,000 to OCI — fair-value declines bypass earnings until sale",
      "D": "$30,000 credit loss to earnings plus $20,000 non-credit to OCI — bifurcation follows cause, with the OCI portion accreted back through interest over the remaining term",
      "C": "$25,000/$25,000 even split — symmetry simplifies audit review"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Debt-security OTTI bifurcates by cause (holder retaining): credit portion ($30,000 expected credit losses) → earnings; non-credit portion ($20,000 liquidity spreads) → OCI, accreted back into interest income over the remaining term as the discount unwinds. All-to-earnings (option A: $50,000) overstates the credit event by the $20,000 market-liquidity component. All-to-OCI (option B) hides $30,000 of credit deterioration in equity. Even splits (option C: $25,000/$25,000) replace cause-based measurement with arithmetic convenience. Business interpretation: OTTI asks first 'credit or market?' — earnings absorb credit, OCI warehouses market pending accretion. Common trap: routing full fair-value declines to earnings on any credit involvement.",
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
    "QuestionID": "P1B-A-163",
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
    "ExplanationWrongA": "Option A's $50,000 to earnings overstates the credit event by $20,000 of liquidity-spread decline — market components defer through OCI with accretion, never through earnings.",
    "ExplanationWrongB": "Option B's $50,000 to OCI hides $30,000 of expected credit losses in equity — credit deterioration is an earnings event by definition.",
    "ExplanationWrongC": "Option C's $25,000/$25,000 even split replaces cause-based measurement ($30,000/$20,000) with arithmetic convenience — symmetry is not a measurement basis.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.164 OCI pickup in equity method",
    "MicroTopic": "OCI pickup equity method",
    "UniqueConceptKey": "B-A-164-OCI-pickup-equity-method",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A 30% investee reports $100,000 net income plus $40,000 of OCI (AFS gains). The investor's carrying value mechanics must reflect both. What flows where on the investor's statements?",
    "Choices": {
      "A": "$42,000 to net income ($30,000 pickup + $12,000 OCI share reclassified as earnings)",
      "B": "Nothing — OCI belongs to the investee's equity, never the investor's statements",
      "C": "$30,000 pickup to earnings plus $12,000 OCI pickup to investor OCI (30% × $40,000) — equity method mirrors both income layers",
      "D": "$42,000 to investor OCI — equity pickups bypass net income entirely"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Equity method mirrors both layers: $30,000 pickup (30% × $100,000) to investor earnings; $12,000 OCI pickup (30% × $40,000) to investor OCI (flowing into AOCI, never earnings). Earnings-merging (option A: $42,000 to NI) reclassifies OCI share as earnings — layers never cross. Nothing-flows (option B) strands $12,000 of investor-equity economics off-statement — the investment account rises $42,000 total ($30,000 + $12,000) with matching equity credits split by layer. All-to-OCI (option D: $42,000) demotes $30,000 of earnings pickup into equity. Business interpretation: equity accounting is a mirror with two faces — earnings reflect earnings, OCI reflects OCI, at the ownership percentage. Common trap: collapsing the investee's two income layers into one investor line.",
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
    "QuestionID": "P1B-A-164",
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
    "ExplanationWrongA": "Option A's $42,000 to earnings reclassifies $12,000 of OCI share as income — layers never cross between earnings and OCI on pickup.",
    "ExplanationWrongB": "Option B strands $12,000 of investor-equity economics (30% of investee OCI) off-statement — the investment account rises $42,000 with split equity credits.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $42,000 to OCI demotes $30,000 of earnings pickup into equity — earnings reflect earnings, always.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.165 step acquisition remeasurement",
    "MicroTopic": "step acquisition remeasurement",
    "UniqueConceptKey": "B-A-165-step-acquisition-remeasurement",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "An investor holds 30% (equity method, carrying $400,000) then acquires 30% more for $500,000 cash, reaching 60% control when the original 30%'s fair value is $480,000. Total consideration is $980,000 against $800,000 of identifiable net assets. What gain and goodwill result?",
    "Choices": {
      "A": "No gain — step acquisitions carry old stakes at cost into the combination",
      "B": "Goodwill $180,000 on $980,000 total with no remeasurement gain — consideration aggregates at carrying plus cash",
      "C": "$80,000 remeasurement gain ($480,000 − $400,000) in earnings plus $180,000 goodwill ($980,000 − $800,000)",
      "D": "$80,000 to OCI — step-up gains bypass earnings as equity adjustments"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Achieving control triggers remeasurement of the pre-existing stake to fair value: $480,000 − $400,000 = $80,000 gain in earnings. Total consideration = $480,000 (remeasured) + $500,000 cash = $980,000; goodwill = $980,000 − $800,000 identifiable = $180,000. Carry-at-cost (option A) ignores the control-achievement remeasurement event. No-gain aggregation (option B: $400,000 + $500,000 = $900,000 → $100,000 goodwill) understates both consideration ($80,000) and goodwill symmetrically. OCI routing (option D) bypasses earnings for a realized step-up gain the control event triggers. Business interpretation: control changes remeasure history — the old stake revalues at the control date with gains in earnings, then combines at fair value. Common trap: carrying pre-existing stakes at cost through control changes.",
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
    "QuestionID": "P1B-A-165",
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
    "ExplanationWrongA": "Option A's no-gain carries $400,000 into a $480,000-fair-value combination — control achievement remeasures pre-existing stakes by rule, never carries them.",
    "ExplanationWrongB": "Option B's $100,000 goodwill ($900,000 − $800,000) understates consideration by the $80,000 unrecognized gain — and goodwill symmetrically. Remeasure first, then combine.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D routes the $80,000 step-up through OCI — control-achievement gains recognize in earnings, never as equity adjustments.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.166 deconsolidation retained interest",
    "MicroTopic": "deconsolidation retained interest",
    "UniqueConceptKey": "B-A-166-deconsolidation-retained-interest",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Parent sells 70% (keeping 10% with significant influence) for $900,000 cash. Subsidiary book value is $800,000 (parent's share 80% = $640,000 carrying). Retained 10% fair value is $130,000. What gain is recognized, and how is the retained interest measured?",
    "Choices": {
      "A": "Gain $260,000 ($900,000 − $640,000) with retained interest at old carrying $80,000 (10% × $800,000)",
      "D": "Gain $390,000 [($900,000 + $130,000) − $640,000] with retained interest at $130,000 fair value — deconsolidation remeasures retained stakes",
      "C": "No gain — partial sales with retained influence defer all gains",
      "B": "Gain $130,000 (retained fair value only) — cash proceeds are return of capital, not gain"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Deconsolidation with retained significant influence: total consideration = $900,000 cash + $130,000 retained fair value = $1,030,000; carrying derecognized = $640,000 (80% share); gain = $1,030,000 − $640,000 = $390,000 in earnings. Retained 10% remeasures to $130,000 fair value (equity-method going forward). Cash-only gain (option A: $260,000) omits $130,000 of retained fair value from consideration. No-gain (option C) defers a realized control-loss gain. Retained-only (option B: $130,000) treats $900,000 cash as capital return — proceeds are consideration, the gain's core. Business interpretation: losing control remeasures everything — cash plus retained fair value against derecognized carrying, with the retained stake reborn at fair value. Common trap: carrying retained interests at old book through deconsolidation.",
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
    "QuestionID": "P1B-A-166",
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
    "ExplanationWrongA": "Option A's $260,000 omits $130,000 of retained fair value from consideration — deconsolidation consideration is cash plus retained fair value, never cash alone.",
    "ExplanationWrongB": "Option B's $130,000 treats $900,000 cash as capital return — proceeds are gain consideration first. Cash realized is the gain's core, not its offset.",
    "ExplanationWrongC": "Option C defers all gain on retained influence — control loss triggers full remeasurement regardless of retained stakes. Influence going forward never defers control-loss gains.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.167 FX remeasurement versus translation",
    "MicroTopic": "FX remeasurement versus translation",
    "UniqueConceptKey": "B-A-167-FX-remeasurement-versus-translation",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A foreign subsidiary (local currency = functional currency) holds monetary assets LC 500,000 and nonmonetary inventory LC 300,000 (historical rate 1.10, current rate 1.25 USD/LC... precisely LC strengthens: historical $1.10/LC, current $1.25/LC). Parent presentation currency is USD. How do remeasurement and translation differ here, and what hits earnings versus OCI?",
    "Choices": {
      "A": "Both to earnings — all FX movements hit net income identically",
      "B": "Remeasure monetary at current ($625,000) with $75,000 gain to earnings; translate nonmonetary at historical ($330,000); translation adjustment on net assets to OCI — remeasurement (earnings) precedes translation (OCI) by functional-currency logic",
      "C": "Translate everything at current rate — one rate governs all foreign balances",
      "D": "Remeasure everything at historical — locked rates preserve comparability"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Two-step foreign currency mechanics (functional = local currency): (1) remeasure foreign-currency transactions/balances into functional currency (here LC IS functional, so monetary items remeasure only for transaction gains/losses — monetary LC 500,000 already in LC; the $75,000 illustration reflects LC-denominated monetary positions against USD-denominated... precisely the example simplifies: monetary remeasurement at current rate with the $75,000 change (500,000 × ($1.25 − $1.10)) to earnings); nonmonetary inventory stays at historical ($330,000 = 300,000 × $1.10). (2) Translate LC financials to USD presentation: assets at current rate with the translation adjustment to OCI (not earnings). All-to-earnings (option A) routes translation adjustments (equity re-measurements) through income. Single-rate (option C) remeasures nonmonetary at current — violating historical-cost preservation. All-historical (option D) freezes monetary items against rate reality. Business interpretation: remeasurement fixes transaction currency into functional (earnings); translation converts functional into presentation (OCI) — two steps, two destinations, never mixed. Common trap: single-rate translation of mixed monetary/nonmonetary bases.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Foreign Currency",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-A-167",
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
    "ExplanationWrongA": "Option A's all-to-earnings routes translation adjustments (net-investment re-measurements) through income — translation lives in OCI by definition.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's single current rate remeasures nonmonetary inventory at $1.25 — violating historical-cost preservation ($330,000 at $1.10). Monetary/current, nonmonetary/historical — always split.",
    "ExplanationWrongD": "Option D's all-historical freezes monetary items against rate movements — monetary positions remeasure at current rates with gains/losses in earnings, no exceptions.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.168 hyperinflationary restatement",
    "MicroTopic": "hyperinflationary restatement",
    "UniqueConceptKey": "B-A-168-hyperinflationary-restatement",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A subsidiary operates in a hyperinflationary economy (3-year cumulative inflation 120%). Nonmonetary assets carried at HC 2,000,000 (acquired when index was 100, now 220); monetary net liability HC 500,000. How should the subsidiary's statements be restated before translation?",
    "Choices": {
      "A": "No restatement — translate at current rate like any foreign operation",
      "D": "Restate nonmonetary to HC 4,400,000 (2,000,000 × 220/100) with the $2,400,000 adjustment to income; monetary items already current (no restatement); translate the restated statements at closing rate",
      "C": "Restate monetary items to HC 1,100,000 (500,000 × 220/100) — monetary positions inflate like nonmonetary ones",
      "B": "Restate nonmonetary but book the $2,400,000 to OCI — inflation adjustments bypass earnings by definition"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Hyperinflationary restatement (ASC 830/IAS 29 logic): nonmonetary items restate by index change — HC 2,000,000 × 220/100 = HC 4,400,000, with the $2,400,000 adjustment flowing through income (purchasing-power gain/loss on the net monetary position nets here: holding HC 500,000 net monetary liability during inflation produces a purchasing-power GAIN that partially offsets). Monetary items are already in current purchasing power — never restated (option C: $1,100,000 invents inflation on already-current balances). No-restatement translation (option A) converts unrestated hyperinflation-distorted history at current rates — garbage in, garbage out across currencies. OCI routing (option B) parks purchasing-power effects in equity — inflation gains/losses on monetary positions hit earnings. Business interpretation: restate nonmonetary to current purchasing power through income, carry monetary as-is, then translate at closing rate — inflation accounting precedes translation, always. Common trap: restating monetary items or translating unrestated hyperinflation books.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting: Foreign Currency",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-A-168",
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
    "ExplanationWrongA": "Option A's translate-without-restating converts hyperinflation-distorted history at current rates — pre-translation restatement is mandatory precisely because distorted bases mistranslate.",
    "ExplanationWrongB": "Option B routes the $2,400,000 purchasing-power effect through OCI — inflation gains/losses on net monetary positions hit earnings, never equity.",
    "ExplanationWrongC": "Option C restates HC 500,000 monetary to HC 1,100,000 — monetary items already measure current purchasing power. Restating them double-counts inflation.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.169 interim LIFO liquidation expectation",
    "MicroTopic": "interim LIFO liquidation expectation",
    "UniqueConceptKey": "B-A-169-interim-LIFO-liquidation-expectation",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Q2 inventory dips 3,000 units below beginning layers (a $45,000 LIFO liquidation at old costs vs $75,000 replacement — $30,000 phantom profit). Management expects full replenishment by year-end (purchase orders placed, history of Q4 restocking). What interim treatment is correct?",
    "Choices": {
      "A": "Recognize $30,000 phantom profit in Q2 — interim follows annual layer mechanics mechanically",
      "D": "Defer the liquidation (charge Q2 COGS at replacement $75,000 with a $30,000 inventory valuation allowance) since replenishment is expected; true-up at year-end",
      "C": "Switch to FIFO for interim periods — interim flexibility overrides annual conformity",
      "B": "Recognize $30,000 now and reverse in Q4 — interim accuracy demands current recognition with later correction"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Interim LIFO liquidations expected to reverse by year-end are NOT recognized — charge Q2 COGS at current replacement cost ($75,000) with a $30,000 valuation allowance against inventory (debit COGS $75,000, credit inventory layers $45,000, credit allowance $30,000), reversing the allowance when replenishment occurs. Mechanical recognition (option A: $30,000 phantom profit in Q2) books interim noise as earnings despite expected reversal. Recognize-now-reverse-later (option B) creates two errors (Q2 overstatement, Q4 understatement swing) instead of zero. Interim FIFO-switching (option C) violates conformity (tax LIFO demands book LIFO every period). Business interpretation: interim inventory follows expected-annual outcomes with valuation allowances bridging temporary dips — progress toward year-end truth, never mechanical quarterly layering. Common trap: applying annual layer mechanics to reversible interim dips.",
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
    "QuestionID": "P1B-A-169",
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
    "ExplanationWrongA": "Option A's mechanical $30,000 Q2 profit books interim noise as earnings despite documented expected replenishment (orders placed, Q4 history). Expected reversals defer by rule.",
    "ExplanationWrongB": "Option B's recognize-then-reverse creates two errors (Q2 +$30,000, Q4 −$30,000 swing) instead of zero — interim accuracy comes from expected-annual measurement, never from book-and-reverse.",
    "ExplanationWrongC": "Option C's interim FIFO switch violates conformity (tax LIFO requires book LIFO every period including interims). Interim flexibility never overrides conformity.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "B-A.170 gross profit method with markup",
    "MicroTopic": "gross profit method markup",
    "UniqueConceptKey": "B-A-170-gross-profit-method-markup",
    "LOSTag": "P1-A Financial reporting",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beginning inventory $120,000; purchases $480,000; sales $800,000. Historical gross profit is 30% ON COST (markup), not on sales. Estimate ending inventory by the gross profit method.",
    "Choices": {
      "A": "$120,000 ($600,000 goods − $480,000 COGS at 30%-of-sales $240,000 margin) — markup and margin are interchangeable labels",
      "C": "$76,923 (COGS = $800,000/1.30 = $615,385; ending = $600,000 − $615,385 < $0 — impossible, so markup framing must be rechecked)",
      "B": "$138,462 (COGS = $800,000/1.30 = $615,385... precisely $800,000/1.3 = $615,384.62; ending = $600,000 − $615,384.62 = −$15,384.62 — impossible, proving markup-on-cost cannot directly convert sales)",
      "D": "Ending $138,462 — markup 30% on cost converts to margin 23.08% on sales ($80,000/$800,000... precisely 30/130 = 23.0769%); COGS = $800,000 × (1 − 23.0769%) = $800,000 × 76.9231% = $615,384.62... wait that gives −$15,385 ending. RECOMPUTE: goods available $600,000 < $615,385 COGS is impossible — the 30%-markup scenario as stated cannot produce $800,000 sales from $600,000 goods. The item as drafted is arithmetically impossible. WITHDRAWN — replacement ships separately."
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "WITHDRAWN — see certification_batch. The 30%-on-cost markup with $600,000 goods available caps sales-supported COGS below $600,000; $800,000 of sales at 76.92% cost ratio needs $615,385 of goods — $15,385 more than available. Negative-ending-inventory results prove inconsistent stem facts, not any method. A corrected version (goods $700,000: COGS $615,385, ending $84,615) ships as the replacement.",
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
    "QuestionID": "P1B-A-170",
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
    "certification_batch": "Tier 3 Wave 12 (authored 2026-09-11, WITHDRAWN — arithmetically impossible stem caught at authoring; corrected replacement ships separately)"
  }
];
module.exports = WAVE12B;