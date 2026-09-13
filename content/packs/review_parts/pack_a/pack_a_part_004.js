var MCQ_BANK_A_PART_4 = [
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.025 deferred tax liability calculation",
    "MicroTopic": "deferred tax liability calculation",
    "UniqueConceptKey": "A-025-deferred-tax-liability-calculation",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "TAX PROVISION MEMORANDUM — Cascade Manufacturing\n\nTO: CFO Diana Okonkwo\nFROM: Michael Chen, Tax Director\nRE: Year-End Deferred Tax Analysis\n\nCascade reports the following temporary differences at December 31, Year 1 (enacted tax rate: 25%):\n\n1. Accelerated tax depreciation: Tax depreciation exceeded book by $380,000 (equipment basis: $1,900,000; 10-year book straight-line, 7-year MACRS tax). Reversal begins Year 4.\n\n2. Warranty accrual: Book accrual $120,000. Tax deductible only when claims are paid (projected: $45,000 Year 2; $50,000 Year 3; $25,000 Year 4).\n\n3. Installment sale: $90,000 book gain on surplus land. Tax: installment method defers $60,000 to Years 2-4.\n\nCascade projects sustained profitability with no valuation allowance concerns. Mr. Chen asks: 'What is Cascade's net deferred tax position, and which item produces a deferred tax asset?'",
    "Choices": {
      "A": "Net deferred tax liability of $50,000. Depreciation DTL: $95,000. Warranty DTA: $30,000. Installment sale: $15,000 DTL. Net: $95,000 + $15,000 - $30,000 = $80,000 liability. Only the warranty produces a DTA because book expense exceeds tax deduction, creating a future deductible amount. The installment sale produces a DTL because book income recognized faster than tax income.",
      "B": "Net deferred tax liability of $80,000. Depreciation DTL: $380,000 × 25% = $95,000. Installment sale DTL: $60,000 × 25% = $15,000. Warranty DTA: $120,000 × 25% = $30,000. Net: $95,000 + $15,000 - $30,000 = $80,000. Only the warranty accrual produces a deferred tax asset because book expense recognized before tax deduction.",
      "C": "Net deferred tax liability of $147,500. All three items produce deferred tax liabilities because Cascade is deferring tax payments relative to book recognition. Total taxable temporary differences: $590,000 × 25% = $147,500. None produce DTA because Cascade projects sustained profitability.",
      "D": "Net deferred tax liability of $42,500. Depreciation DTL: $95,000. Warranty DTA: $30,000. Installment sale DTA: $22,500. Net: $95,000 - $30,000 - $22,500 = $42,500. The installment sale produces a DTA because Cascade recognized the gain for book purposes but will receive cash in future periods."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under ASC 740-10-10-1, deferred tax liabilities and assets are recognized for estimated future tax effects of temporary differences. A DTL arises from taxable temporary differences (book income > taxable income now, pay more tax later). A DTA arises from deductible temporary differences (book expense > tax deduction now, reduce tax later). Depreciation: Tax depreciation exceeded book by $380,000 — taxable income lower than book income now, future reversal creates a DTL of $95,000 ($380,000 × 25%). Installment sale: Book gain $90,000 but only $30,000 recognized for tax — $60,000 deferred creates a DTL of $15,000 ($60,000 × 25%). Warranty: Book expense $120,000 but zero tax deduction until claims paid — creates a DTA of $30,000 ($120,000 × 25%). Net: $95,000 + $15,000 - $30,000 = $80,000 DTL. Only the warranty accrual produces a DTA. Under ASC 740-10-45-4, DTA/DTL are noncurrent. A critical trap is confusing cash flow timing with book-tax differences: the installment sale creates a DTL (not DTA) because book income recognized faster than tax income, even though cash is collected later. The direction of the book-tax difference determines DTA vs. DTL, not cash flow.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-025",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Section A Block 1",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This recommendation states a net deferred tax liability of $50,000, but the component arithmetic ($95,000 + $15,000 - $30,000) produces $80,000 — an internal inconsistency. The installment sale creates a $15,000 DTL because Cascade recognized $90,000 book gain but only $30,000 for tax, deferring $60,000 — a taxable temporary difference. A candidate reaching this conclusion likely mis-added the components or confused the installment sale treatment. The correct net position is an $80,000 deferred tax liability. The controller should verify that each choice's stated result matches its underlying arithmetic before selecting.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This recommendation incorrectly classifies all three items as deferred tax liabilities without distinguishing between taxable and deductible temporary differences. Under ASC 740-10-20, a DTA is recognized for deductible temporary differences — where the book basis of a liability exceeds its tax basis. The warranty accrual is a textbook deductible temporary difference: Cascade has a $120,000 accrued warranty liability on its books but zero tax basis, creating a $30,000 DTA ($120,000 × 25%). Additionally, using the total book gain ($90,000) rather than the deferred portion ($60,000) overstates the installment sale temporary difference. Only the timing difference creates a deferred tax effect — the $30,000 already recognized for tax has no deferred tax impact. The controller must analyze each temporary difference individually for direction.",
    "ExplanationWrongD": "This recommendation correctly identifies the depreciation DTL ($95,000) and warranty DTA ($30,000) but incorrectly classifies the installment sale gain as producing a deferred tax asset. The installment sale is a taxable temporary difference, not a deductible one. Cascade recognized $90,000 of book gain but only $30,000 of tax gain — meaning book income exceeds taxable income by $60,000. This creates a DTL of $15,000, not a DTA. The common error is confusing cash flow timing (Cascade will collect cash later) with book-tax timing (Cascade already recognized the book income). Deferred tax classification follows book-tax differences, not cash flow patterns. The correct net deferred tax liability is $80,000 ($95,000 + $15,000 - $30,000).",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.026 accounting equation equity calculation 1",
    "MicroTopic": "accounting equation equity calculation 1",
    "UniqueConceptKey": "A-026-accounting-equation-equity-calculation-1",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Beacon reports total assets of $324,300 and total liabilities of $127,100. What total equity should be reported?",
    "Choices": {
      "A": "$212,200",
      "B": "$127,100",
      "C": "$451,400",
      "D": "$197,200"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Beacon reports assets of $324,300 and liabilities of $127,100, so equity = $324,300 - $127,100 = $197,200.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-026",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This overstates equity by $15,000 and does not follow from assets minus liabilities.",
    "ExplanationWrongB": "This is total liabilities, not equity. Equity is the residual interest after subtracting liabilities from assets.",
    "ExplanationWrongC": "This adds assets and liabilities, but the accounting equation requires subtracting liabilities to solve for equity.",
    "ExplanationWrongD": "",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.027 revenue recognized on shipped units 2",
    "MicroTopic": "revenue recognized on shipped units 2",
    "UniqueConceptKey": "A-027-revenue-recognized-on-shipped-units-2",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crescent accepted an order for 414 units at $55 each. 396 units shipped before year-end and control transfers on shipment. What revenue is recognized?",
    "Choices": {
      "A": "$22,770",
      "B": "$22,330",
      "C": "$21,780",
      "D": "$990"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under accrual revenue recognition, revenue is recognized when control transfers. Control transfers on shipment, so recognize only the 396 units shipped before year-end: 396 x $55 = $21,780. Do not recognize revenue for the full accepted order if some units have not shipped.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-027",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This recognizes the full order, 414 units x $55, even though only 396 units shipped before year-end.",
    "ExplanationWrongB": "This appears to recognize 406 units, which is not the number shipped or the full order quantity.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This recognizes only the 18 unshipped units, 18 x $55, rather than the shipped units for which control transferred.",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.028 cost of goods sold from inventory flow 3",
    "MicroTopic": "cost of goods sold from inventory flow 3",
    "UniqueConceptKey": "A-028-cost-of-goods-sold-from-inventory-flow-3",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A2",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Delta has beginning inventory of $44,700, purchases of $166,900, and ending inventory of $39,950. What is cost of goods sold?",
    "Choices": {
      "A": "$84,650",
      "B": "$211,600",
      "C": "$126,950",
      "D": "$171,650"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Cost of goods sold = beginning inventory + purchases - ending inventory. Delta has $44,700 beginning inventory plus $166,900 purchases, less $39,950 ending inventory: $44,700 + $166,900 - $39,950 = $171,650. Ending inventory is subtracted because it remains unsold.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-028",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This adds beginning and ending inventory but omits purchases; COGS must include goods available for sale from purchases.",
    "ExplanationWrongB": "This is goods available for sale, beginning inventory plus purchases, before subtracting ending inventory.",
    "ExplanationWrongC": "This subtracts ending inventory from purchases only and omits beginning inventory.",
    "ExplanationWrongD": "",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.029 straight-line depreciation expense 4",
    "MicroTopic": "straight-line depreciation expense 4",
    "UniqueConceptKey": "A-029-straight-line-depreciation-expense-4",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A4",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "CONTROLLER'S MEMORANDUM — Evergreen Manufacturing\n\nTO: CFO Maria Chen\nFROM: Controller's Office\nRE: Urgent — Depreciation Recommendation for Assembly Line Equipment\n\nEvergreen acquired automated assembly equipment on January 2 for $92,800, estimated salvage value $12,000, 5-year useful life. Three competing recommendations have been submitted:\n\n(1) Production Manager David Park recommends units-of-production, arguing the line will produce 80,000 units in Year 1 but demand projections show output declining to 40,000 by Year 5 — he insists this better matches physical wear.\n(2) The VP of Investor Relations recommends straight-line to keep reported earnings smooth because Evergreen's revolving credit facility has a debt covenant requiring net income of at least $500,000; pre-depreciation net income is $520,000. A covenant breach triggers a 150-basis-point rate increase on Evergreen's $8M credit facility.\n(3) The tax team recommends MACRS, but this applies only to tax filings, not GAAP financial statements.\n\nThe 10-K must be filed by Friday. The external auditor has asked for a documented basis for the depreciation method selection under ASC 360. Ms. Chen asks: 'What is the most defensible GAAP depreciation amount, and which approach best serves Evergreen's reporting obligations and stakeholder interests?'",
    "Choices": {
      "A": "Recommend straight-line depreciation of $16,160 per year. The depreciable base is $92,800 - $12,000 = $80,800, divided by 5 years = $16,160. Under ASC 360-10-35-4, straight-line is appropriate when the asset provides substantially equal productive capacity each year. Demand-driven utilization variance (marketing/sales cycles) is not a physical consumption pattern — capacity remains constant regardless of annual unit output. Net income after depreciation = $520,000 - $16,160 = $503,840, clearing the $500,000 covenant threshold with $3,840 headroom.",
      "B": "Recommend units-of-production depreciation. Estimated total units over 5 years = 300,000. Year 1 depreciation = ($92,800 - $12,000) × (80,000 / 300,000) = $80,800 × 0.2667 = $21,547. UoP most faithfully reflects the pattern of economic benefits consumed when physical wear correlates with output volume, per ASC 360-10-35-4. Reported net income = $520,000 - $21,547 = $498,453 — violating the $500,000 covenant by $1,547 and triggering the 150-bps rate increase, which would cost Evergreen approximately $120,000/year in additional interest on the $8M facility.",
      "C": "Recommend straight-line but calculate depreciation on the full cost basis without deducting salvage: $92,800 / 5 = $18,560. This approach treats salvage as unguaranteed and immaterial (only 12.9% of cost), arguing that salvage estimates are inherently uncertain. Reported net income = $520,000 - $18,560 = $501,440 — still clears the covenant but with only $1,440 headroom. However, ASC 360-10-35-4 requires salvage value to be excluded from the depreciable base.",
      "D": "Recommend a dual-reporting approach: use straight-line ($16,160) for GAAP financial statements to satisfy the debt covenant, while separately presenting units-of-production depreciation in the MD&A as supplemental information about asset utilization. The MD&A disclosure would note that while actual Year 1 output was 80,000 units (suggesting heavier wear), GAAP requires straight-line because the asset's productive capacity — not demand-driven output — determines the consumption pattern."
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under ASC 360-10-35-4, the depreciation method shall reflect the pattern in which the asset's future economic benefits are expected to be consumed by the entity. For automated assembly equipment with constant productive capacity, straight-line depreciation is the appropriate method: the asset provides substantially equal productive capacity each year regardless of annual unit output driven by demand fluctuations. The depreciable base is cost ($92,800) less salvage ($12,000) = $80,800. Annual straight-line depreciation = $80,800 / 5 = $16,160. Net income after depreciation = $520,000 - $16,160 = $503,840, which satisfies the $500,000 debt covenant requirement. Business impact: straight-line both complies with GAAP and avoids the covenant breach that would increase annual interest costs by approximately $120,000. The key distinction is that demand-driven output variance (how many units the marketing team can sell) does not change the physical consumption of the asset's service potential — the machine can produce the same number of units each year regardless of whether customers order them. A common exam trap is conflating output volume with consumption pattern: units-of-production is appropriate when physical deterioration correlates with units produced (e.g., a delivery truck's mileage), not when a machine's capability is constant but demand varies. Another trap is applying tax depreciation methods (MACRS) to GAAP financial statements; these are separate reporting frameworks. A third trap is omitting salvage value from the depreciable base calculation.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-029",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This recommendation adopts units-of-production, yielding $21,547 in Year 1 depreciation and net income of $498,453 — breaching the $500,000 debt covenant by $1,547. The $120,000 annual interest cost from the covenant breach far exceeds any benefit from matching output volume. More importantly, UoP is misapplied when output decline is demand-driven rather than physical-capacity-driven. The machine's productive capability is constant; the fact that Evergreen's sales team projects declining orders is a revenue forecasting issue, not an asset consumption pattern. Under ASC 360-10-35-4, the depreciation method should reflect the pattern of economic benefits consumed — and a machine that can produce the same quantity each year consumes its service potential evenly, regardless of whether marketing sells all output. A candidate selecting this option conflates demand cycles with physical wear.",
    "ExplanationWrongC": "This recommendation ignores salvage value, computing $92,800 / 5 = $18,560 instead of the correct ($92,800 - $12,000) / 5 = $16,160. ASC 360-10-35-4 explicitly requires salvage value to be excluded from the depreciable base because salvage represents expected residual value that is not consumed during the asset's use. Net income would be $501,440, leaving only $1,440 of covenant headroom — dangerously thin against any future earnings fluctuations. The argument that salvage estimates are 'inherently uncertain' does not justify ignoring them; ASC 360 requires management to estimate salvage based on current conditions and revise depreciation prospectively if estimates change (ASC 250-10-45-17). A candidate selecting this option is over-applying conservatism at the expense of GAAP compliance.",
    "ExplanationWrongD": "This recommendation attempts a hybrid approach — straight-line for GAAP, supplemental UoP in MD&A. However, the MD&A disclosure would create a self-contradiction: management would simultaneously argue that straight-line best reflects the consumption pattern (for GAAP) while warning investors that actual output was much higher, suggesting greater wear. This inconsistency would invite auditor scrutiny and potentially undermine the credibility of both reports. Furthermore, under SEC guidance, MD&A must discuss known trends and uncertainties reasonably likely to materially affect future results; describing declining demand while using straight-line depreciation for an asset whose output is declining puts management in the position of defending two contradictory narratives. A candidate selecting this option values flexibility over consistency — but a single, well-supported GAAP position is stronger than two loosely connected reports.",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.030 indirect operating cash flow adjustment 5",
    "MicroTopic": "indirect operating cash flow adjustment 5",
    "UniqueConceptKey": "A-030-indirect-operating-cash-flow-adjustment-5",
    "LOSTag": "P1-A.1 Financial statements",
    "primaryTheory": "A9",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "CFO BRIEFING NOTE — Frontier Industries\n\nTO: Controller David Okonkwo\nFROM: CFO Sarah Lin\nRE: Urgent — Cash Flow Analysis for Board Package\n\nFrontier reports net income of $103,500 for the year ended December 31, yet our cash balance has barely changed and we nearly missed a supplier payment last month. I need to present a clear explanation to the board on Wednesday showing why net income does not equal operating cash flow and what the actual operating cash flow figure is. The preliminary numbers show depreciation of $23,000, accounts receivable increased by $7,000, and accounts payable increased by $5,300.\n\nA board member previously served as CFO of a competitor and will challenge us if the reconciliation doesn't reconcile. A misstatement could damage the board's confidence in our internal reporting.\n\nWhat operating cash flow should Ms. Lin present, and which adjustment most explains the gap between net income and operating cash generation?",
    "Choices": {
      "A": "$78,800. Operating cash flow is lower than net income because depreciation of $23,000 consumed cash — it is subtracted from net income along with the $7,000 accounts receivable increase, while the $5,300 payable increase is added back. The depreciation charge, which reduces net income dollar-for-dollar, is the primary driver of the cash shortfall relative to reported earnings.",
      "B": "$124,800. Operating cash flow = $103,500 + $23,000 - $7,000 + $5,300. Depreciation is added back because it is a noncash charge that reduced net income but consumed no cash. The $7,000 A/R increase is subtracted because revenue recognized on credit sales exceeded cash collections — customers owe more than they paid. The $5,300 A/P increase is added because expenses were recognized before cash disbursements, preserving cash temporarily. The $21,300 excess of operating cash flow over net income is primarily driven by the $23,000 depreciation add-back — Frontier generated $23,000 more cash than its income statement suggests, explaining why the company appears profitable despite tight liquidity from growing receivables.",
      "C": "$138,800. Operating cash flow exceeds net income because increases in accounts receivable represent additional cash that will be collected in the future and should be treated as cash inflows for the current period, along with higher accounts payable which reflect additional financing. Frontier's cash position is stronger than net income alone suggests, and the board should focus on the $138,800 figure as the true measure of operating performance.",
      "D": "$114,200. Operating cash flow is close to net income because the depreciation add-back ($23,000) is partially offset by the combined effect of the working capital changes: the $7,000 A/R increase (subtracted) and the $5,300 A/P increase (which represents an obligation to pay, not a source of cash, so it is also subtracted). Frontier's operating cash generation of $114,200 reflects a modest improvement over net income, consistent with the stable cash balance noted."
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under ASC 230, the indirect method reconciles net income to operating cash flow by adjusting for: (1) noncash items included in net income, (2) changes in operating assets, and (3) changes in operating liabilities. Depreciation ($23,000) is a noncash expense that reduced net income but did not consume cash — it must be added back. An increase in accounts receivable ($7,000) means Frontier recognized more revenue than it collected in cash from customers; the excess is subtracted. An increase in accounts payable ($5,300) means Frontier incurred expenses without yet disbursing cash; the timing benefit is added. Operating cash flow = $103,500 + $23,000 - $7,000 + $5,300 = $124,800. The $21,300 excess of operating cash flow over net income is primarily explained by depreciation — confirming to the board that Frontier's profitability is genuine but the cash conversion cycle is stretched by growing receivables. A common exam trap is subtracting depreciation (treating it as cash outflow) or adding accounts receivable increases (confusing accrual revenue with cash collections). Another trap is treating accounts payable increases as cash outflows rather than sources of timing benefit. The board should understand that OCF > NI indicates healthy cash generation capacity but the receivables growth trend warrants monitoring.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-030",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This analysis incorrectly subtracts depreciation ($23,000) as if it were a cash outflow, producing $103,500 - $23,000 - $7,000 + $5,300 = $78,800. Under ASC 230, depreciation is a noncash expense added back to net income under the indirect method — it reduced reported earnings but did not consume cash. A candidate selecting this option confuses the income statement treatment of depreciation (expense, reducing NI) with its cash flow treatment (noncash, added back). Presenting $78,800 to the board would incorrectly imply Frontier's operations consumed cash and would unnecessarily alarm the board about liquidity — the exact opposite of the message Ms. Lin should deliver.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This analysis incorrectly adds the $7,000 accounts receivable increase, treating credit sales as if they generated cash in the current period: $103,500 + $23,000 + $7,000 + $5,300 = $138,800. Under ASC 230, increases in operating assets like A/R are subtracted because they represent revenue recognized on an accrual basis that has not yet been collected in cash. The $7,000 A/R increase means customers owe Frontier $7,000 more than at the beginning of the year — Frontier has not received this cash. A candidate selecting this option misunderstands the directional logic of working capital adjustments: increases in current assets consume cash (subtract), increases in current liabilities provide cash (add).",
    "ExplanationWrongD": "This analysis incorrectly subtracts the $5,300 accounts payable increase, treating unpaid bills as a cash outflow: $103,500 + $23,000 - $7,000 - $5,300 = $114,200. Under ASC 230, increases in operating liabilities are added back because Frontier has recognized expenses but deferred cash payment, temporarily preserving cash. The $5,300 A/P increase means Frontier owes suppliers $5,300 more — it has the cash in hand rather than having disbursed it. A candidate selecting this option reverses the directional logic for liabilities: increases in current liabilities are sources of cash (add), decreases are uses of cash (subtract). This presentation would understate Frontier's actual cash generation and weaken Ms. Lin's board presentation.",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.031 retained earnings rollforward 6",
    "MicroTopic": "retained earnings rollforward 6",
    "UniqueConceptKey": "A-031-retained-earnings-rollforward-6",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Granite began the year with retained earnings of $195,000, earned net income of $80,400, and declared dividends of $20,700. What ending retained earnings should be reported?",
    "Choices": {
      "A": "$93,900",
      "B": "$59,700",
      "C": "$275,400",
      "D": "$254,700"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $195,000 + $80,400 - $20,700 = $254,700. Net income increases retained earnings; dividends decrease it.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-031",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice subtracts net income from beginning retained earnings instead of adding it. Net income increases retained earnings.",
    "ExplanationWrongB": "This choice subtracts dividends from net income but does not add the beginning retained earnings balance. Ending retained earnings = Beginning RE + Net income - Dividends.",
    "ExplanationWrongC": "This choice adds beginning retained earnings and net income but omits the dividend deduction. Dividends reduce retained earnings and must be subtracted.",
    "ExplanationWrongD": "",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.032 current assets classification total 7",
    "MicroTopic": "current assets classification total 7",
    "UniqueConceptKey": "A-032-current-assets-classification-total-7",
    "LOSTag": "P1-A.1 Financial statements",
    "Difficulty": "Moderate-Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Harbor lists cash $72,000, accounts receivable $90,300, inventory $122,600, accounts payable $55,500, and wages payable $19,750. What total current assets should be reported?",
    "Choices": {
      "A": "$162,300",
      "B": "$340,400",
      "C": "$75,250",
      "D": "$284,900"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payable are liabilities, not current assets. Current assets = $72,000 + $90,300 + $122,600 = $284,900.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Financial Accounting",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-why-it-matters"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-032",
    "question_state": "Certified",
    "certification_date": "2026-07-22",
    "certification_batch": "Sub-batch 2B Wave 2",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This choice omits inventory ($122,600). Total current assets include cash, accounts receivable, and inventory. Inventory is a current asset.",
    "ExplanationWrongB": "This choice incorrectly includes accounts payable ($55,500) as a current asset. Accounts payable is a liability, not an asset. Current assets include cash, receivables, and inventory only.",
    "ExplanationWrongC": "This choice reports only the total of accounts payable and wages payable, which are liabilities. Current assets include cash, accounts receivable, and inventory.",
    "ExplanationWrongD": "",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply"
  }
];