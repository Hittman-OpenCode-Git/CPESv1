const WAVE14A = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.101 material price variance responsibility",
    "MicroTopic": "material price variance responsibility",
    "UniqueConceptKey": "C-101-material-price-variance-responsibility",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 4 lbs at $6.00/lb. Actual: 41,000 lbs purchased at $6.40/lb; 39,000 lbs used for 9,500 units. Purchasing switched to an unapproved supplier mid-month (rush premium $0.30/lb); production wasted 1,000 lbs above standard (9,500×4 = 38,000). Compute price and quantity variances and assign responsibility.",
    "Choices": {
      "A": "Price $16,400 U + quantity $6,000 U, both production's — usage drives all variances",
      "B": "Price $12,300 U + quantity $7,200 U — isolate at standard quantity to split causes",
      "C": "Price variance (41,000×$0.40) = $16,400 U (purchasing: unapproved supplier + rush premium); quantity variance ((39,000−38,000)×$6.00) = $6,000 U (production: 1,000 lbs waste). Isolate at purchase for price (41,000 lbs), at use for quantity (39,000 lbs)",
      "D": "Net $22,400 U to purchasing — single variance, single owner for simplicity"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Price variance = AQ purchased × (AP − SP) = 41,000 × ($6.40 − $6.00) = 41,000 × $0.40 = $16,400 U — purchasing's supplier switch (rush premium documented at $0.30 of the $0.40). Quantity variance = SP × (AQ used − SQ) = $6.00 × (39,000 − 38,000) = $6,000 U — production's 1,000-lb waste. Isolation points differ by design: price at PURCHASE quantity (41,000, before production touches material), quantity at USE quantity (39,000, after purchasing's job ends). All-production (option A) charges production for purchasing's $16,400 supplier decision. Recomputed splits (option B: $12,300/$7,200) apply price to used quantity and quantity at actual price — crossing isolation points. Single-owner (option D) nets $22,400 to hide two causes. Business interpretation: isolate variances where each manager's control ends — purchasing owns price at the receiving dock, production owns quantity at the production line. Common trap: computing price variance on quantity used.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-101",
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
    "ExplanationWrongA": "Option A charges production for purchasing's $16,400 supplier switch — price responsibility ends at the receiving dock; production never chose the vendor.",
    "ExplanationWrongB": "Option B's $12,300/$7,200 crosses isolation points (price on used quantity, quantity at actual price) — price isolates at purchase (41,000 lbs), quantity at use, each at its own valuation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D nets $22,400 to one owner — netting hides the $16,400 supplier decision inside production's $6,000 waste (or vice versa); two causes need two owners.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.102 labor rate versus efficiency interaction",
    "MicroTopic": "labor rate efficiency interaction",
    "UniqueConceptKey": "C-102-labor-rate-efficiency-interaction",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard: 2 hrs/unit at $20/hr. Actual: 10,000 units using 21,500 hrs at $18/hr. HR substituted junior staff (lower rate, slower pace). Decompose the total variance and explain the interaction.",
    "Choices": {
      "A": "Rate (21,500×−$2) = $43,000 F; efficiency ((21,500−20,000)×$20) = $30,000 U; net $13,000 F — the favorable rate more than offsets the inefficiency, but the $30,000 U signals the substitution's hidden cost and HR owns the trade-off",
      "B": "Net $13,000 F only — favorable is favorable, no further analysis needed",
      "C": "Rate $40,000 F + efficiency $27,000 U — compute both at actual rate to match",
      "D": "Rate $43,000 U + efficiency $30,000 F — invert signs since juniors cost less"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Rate variance = AH × (AR − SR) = 21,500 × ($18 − $20) = 21,500 × −$2 = −$43,000 → $43,000 F. Efficiency = SR × (AH − SH) = $20 × (21,500 − 20,000) = $20 × 1,500 = $30,000 U. Net = $43,000 F − $30,000 U = $13,000 F. The interaction is the lesson: junior substitution buys $43,000 of rate savings at $30,000 of efficiency cost — net favorable but $30,000 of hidden cost that grows if error rates or supervision load rise. Favorable-only (option B: $13,000 F, stop) reads the net as success while the $30,000 U trade-off goes unmonitored. Same-rate computation (option C: $40,000/$27,000 at $18/hr) misvalues efficiency — efficiency always values at STANDARD rate ($20 → $30,000). Sign inversion (option D) reads cheaper labor as unfavorable. Business interpretation: rate-efficiency interactions are staffing-decision report cards — report both legs plus the net, and flag when the efficiency leg trends. Common trap: netting complementary variances into false comfort.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-102",
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
    "ExplanationWrongB": "Option B stops at net $13,000 F — netting hides the $30,000 U efficiency cost of junior substitution; favorable nets with trending adverse legs demand monitoring, never celebration.",
    "ExplanationWrongC": "Option C values efficiency at the $18 actual rate (1,500×$18 = $27,000) — efficiency always values at STANDARD rate ($20 → $30,000); actual-rate valuation mixes price effects into quantity.",
    "ExplanationWrongD": "Option D inverts both signs — cheaper labor is rate-favorable ($43,000 F), slower pace is efficiency-unfavorable ($30,000 U); inversion reads every signal backwards.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.103 variable overhead spending versus efficiency",
    "MicroTopic": "variable overhead spending efficiency",
    "UniqueConceptKey": "C-103-variable-overhead-spending-efficiency",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Standard VOH: $8/DLH, 2 hrs/unit. Actual: 10,000 units, 21,500 DLH, VOH incurred $178,000. The supervisor ran machines overtime (premium utilities) while crews were idle 1,500 hrs waiting for materials. Decompose VOH variances and diagnose.",
    "Choices": {
      "A": "Spending $6,000 U + efficiency $12,000 U — both driven by the 1,500 idle hours",
      "B": "Spending $18,000 U + efficiency $0 — overhead has no efficiency component",
      "C": "Total $18,000 U only — decomposition adds no information for overhead",
      "D": "Spending = $178,000 − (21,500×$8) = $178,000 − $172,000 = $6,000 U (overtime premiums, price-like); efficiency = $8 × (21,500 − 20,000) = $12,000 U (idle hours, quantity-like). Total $18,000 U. Overtime explains spending; material delays explain efficiency — two causes, two fixes"
    },

    "CorrectChoice": "D",
    "ExplanationCorrect": "VOH spending = actual − (AH × SR) = $178,000 − 21,500×$8 ($172,000) = $6,000 U — the overtime utility premiums (price-like: paid more per hour of base). VOH efficiency = SR × (AH − SH) = $8 × (21,500 − 20,000) = $8 × 1,500 = $12,000 U — the idle hours consumed overhead base without output (quantity-like). Total $18,000 U. Single-cause (option A) blames idle hours for the $6,000 premium pricing — overtime rates, not idleness, raised the per-hour cost. No-efficiency (option B) denies VOH a quantity leg — VOH applies per DLH, so excess hours carry excess VOH by construction. No-decomposition (option C) nets $18,000 into one fixable lump — but overtime policy and material scheduling are different owners with different fixes. Business interpretation: VOH variances mirror labor's structure (spending≈rate, efficiency≈quantity) — diagnose price-like and quantity-like legs separately. Common trap: treating overhead variances as undecomposable.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-103",
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
    "ExplanationWrongA": "Option A blames 1,500 idle hours for the $6,000 spending leg — idleness drives the $12,000 efficiency leg; overtime premiums (price per hour) drive spending.",
    "ExplanationWrongB": "Option B denies VOH an efficiency leg — VOH applies at $8/DLH, so 1,500 excess hours mechanically carry $12,000 of VOH; the leg exists by construction.",
    "ExplanationWrongC": "Option C nets $18,000 into one lump — overtime policy (supervisor) and material scheduling (purchasing/planning) are different owners needing different fixes.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.104 fixed overhead budget versus volume",
    "MicroTopic": "fixed overhead budget volume",
    "UniqueConceptKey": "C-104-fixed-overhead-budget-volume",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budgeted FOH $200,000 at 20,000 DLH ($10/DLH). Actual FOH $207,000; actual production 9,000 units (standard 2 hrs/unit = 18,000 SH). The plant ran below capacity due to a canceled order. Compute both fixed overhead variances and interpret the volume leg.",
    "Choices": {
      "A": "Budget $7,000 U + volume $20,000 U ($200,000 − 18,000×$10 = $200,000 − $180,000); the $20,000 U is a capacity-utilization signal (2,000 unused hours × $10), never a spending failure — do not discipline production for canceled orders",
      "B": "Budget $7,000 U + volume $20,000 F — under-production absorbs more overhead favorably",
      "C": "Total $27,000 U charged to production — all fixed variance is controllable",
      "D": "Budget $7,000 F + volume $20,000 U — actual below budget is always favorable"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Budget variance = actual − budgeted = $207,000 − $200,000 = $7,000 U (spending control — e.g., insurance/tax increases). Volume variance = budgeted − applied = $200,000 − (18,000 × $10) = $200,000 − $180,000 = $20,000 U (2,000 denominator hours unused × $10 — capacity-utilization signal from the canceled order). Favorable-volume claims (option B) invert the applied formula — fewer hours absorb LESS fixed ($180,000 < $200,000), leaving $20,000 unabsorbed (unfavorable). All-controllable (option C: $27,000 to production) punishes production for a sales cancellation outside its control. Sign-flip (option D: $7,000 F) reads overspending as favorable. Business interpretation: the volume variance prices idle capacity, never inefficiency — report it as a utilization signal to sales/planning, and never commingle it with the $7,000 spending variance in performance reviews. Common trap: treating volume variance as a production efficiency measure.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-104",
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
    "ExplanationWrongB": "Option B's $20,000 F inverts absorption — 18,000 applied hours absorb $180,000 against $200,000 budgeted, leaving $20,000 unabsorbed (unfavorable); fewer hours never absorb more.",
    "ExplanationWrongC": "Option C's $27,000 to production punishes the plant for a canceled order — volume variance is a sales/planning utilization signal, never production inefficiency.",
    "ExplanationWrongD": "Option D reads $207,000 actual vs $200,000 budget as $7,000 favorable — spending above budget is unfavorable, always; direction follows actual-minus-budget.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.105 sales price versus volume variance",
    "MicroTopic": "sales price volume variance",
    "UniqueConceptKey": "C-105-sales-price-volume-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 50,000 units at $40 ($2,000,000). Actual: 54,000 units at $38 ($2,052,000). Standard variable cost $22/unit. Marketing cut price to chase volume. Decompose the sales variances including contribution effects.",
    "Choices": {
      "A": "Price (54,000×−$2) = $108,000 U; volume at contribution ((54,000−50,000)×($40−$22) = 4,000×$18) = $72,000 F; net revenue +$52,000 but contribution −$36,000 ($108,000 U vs $72,000 F) — the discount bought revenue with margin",
      "B": "Price $108,000 F + volume $72,000 F — all increases are favorable",
      "C": "Volume at selling price (4,000×$40 = $160,000 F) — revenue-based volume variance is the standard",
      "D": "Net $52,000 F only — revenue beat means the discount worked"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Price variance = AQ × (AP − BP) = 54,000 × ($38 − $40) = −$108,000 → $108,000 U. Volume variance at CONTRIBUTION (not revenue — fixed costs don't scale with units): (54,000 − 50,000) × ($40 − $22) = 4,000 × $18 = $72,000 F. Net contribution effect = $72,000 F − $108,000 U = −$36,000 (margin destroyed) even as revenue rose $52,000 ($2,052,000 − $2,000,000). All-favorable (option B) reads a price cut as favorable — lower prices are unfavorable by definition. Revenue-based volume (option C: $160,000 F) credits sales with $22/unit of variable cost as though contribution — volume variances value at margin, never revenue. Revenue-only (option D: $52,000 F verdict) declares victory on topline while contribution fell $36,000. Business interpretation: price discounts trade margin for volume — judge the trade at contribution (margin × extra units vs price × all units), never at revenue. Common trap: valuing sales volume variance at selling price.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-105",
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
    "ExplanationWrongB": "Option B reads the $2 price cut as $108,000 favorable — actual below budget on price is unfavorable by definition; direction follows actual-minus-budget.",
    "ExplanationWrongC": "Option C's $160,000 values 4,000 extra units at $40 revenue — volume variance values at $18 contribution; revenue valuation books $22/unit of variable cost as profit.",
    "ExplanationWrongD": "Option D's $52,000 revenue verdict ignores the $36,000 contribution destruction — topline wins funded by margin losses are defeats, never victories.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.106 sales mix versus quantity variance",
    "MicroTopic": "sales mix quantity variance",
    "UniqueConceptKey": "C-106-sales-mix-quantity-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 30,000 units of High (CM $25) + 20,000 of Low (CM $10); total 50,000, weighted CM $19. Actual: 28,000 High + 26,000 Low = 54,000 units. Decompose mix and quantity variances at contribution.",
    "Choices": {
      "A": "Quantity and mix both favorable — more units always help",
      "B": "Mix $0 — product mix never affects contribution",
      "C": "Quantity first (4,000×$19 = $76,000 F), then mix is the residual — order determines meaning",
      "D": "Quantity = (54,000−50,000)×$19 = 4,000×$19 = $76,000 F (more units at budgeted mix). Mix = actual units at actual vs budgeted mix: High (28,000 − 54,000×60%)×$25 + Low (26,000 − 54,000×40%)×$10 = (28,000−32,400)×$25 + (26,000−21,600)×$10 = (−4,400×$25) + (4,400×$10) = −$110,000 + $44,000 = −$66,000 → $66,000 U. Total sales variance $76,000 F − $66,000 U = $10,000 F — volume grew but mix shifted to Low, nearly wiping the gain"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Budgeted mix: High 60%, Low 40%; weighted CM = 0.6×$25 + 0.4×$10 = $15 + $4 = $19. Quantity variance (pure volume at budgeted mix) = (54,000 − 50,000) × $19 = $76,000 F. Mix variance (actual units reweighted): High shortfall 28,000 − 32,400 = −4,400 × $25 = −$110,000; Low excess 26,000 − 21,600 = +4,400 × $10 = +$44,000; net −$66,000 → $66,000 U. Total = $76,000 F − $66,000 U = $10,000 F. All-favorable (option A) ignores the −4,400 High-unit shift — 4,000 more units of the wrong mix nearly erased the gain. Zero-mix (option B) denies arithmetic ($110,000 swing on mix alone). Order-dependence (option C) mistakes computation sequence for economics — quantity-at-budgeted-mix plus mix-at-actual-units is the defined decomposition either order. Business interpretation: mix variance prices the quality of volume — 4,400 units shifted from $25 to $10 margin, costing $66,000. Common trap: celebrating unit growth without mix decomposition.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-106",
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
    "ExplanationWrongA": "Option A's all-favorable ignores the −4,400 High-unit mix shift — $66,000 U of margin quality lost inside $76,000 of volume gained.",
    "ExplanationWrongB": "Option B's zero-mix denies the −$110,000/+$44,000 reweighting arithmetic — mix moved $66,000 of contribution regardless of acknowledgment.",
    "ExplanationWrongC": "Option C mistakes computation order for economics — quantity-at-budgeted-mix ($76,000 F) plus mix-at-actual-units ($66,000 U) is defined either sequence; totals reconcile to $10,000 F.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.107 market size versus share variance",
    "MicroTopic": "market size share variance",
    "UniqueConceptKey": "C-107-market-size-share-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Budget: 10% share of a 500,000-unit market (50,000 units) at $18 budgeted CM. Actual: 9% share of a 600,000-unit market (54,000 units). The sales director claims the share loss is offset by market growth. Evaluate with size and share variances.",
    "Choices": {
      "A": "Both favorable — 54,000 exceeds 50,000 so all decomposition is favorable",
      "B": "Share variance is all that matters — market growth is luck, not performance",
      "C": "Size = (600,000−500,000)×10%×$18 = 100,000×10%×$18 = 10,000×$18 = $180,000 F (market growth at budgeted share). Share = (54,000 − 600,000×10%)×$18 = (54,000−60,000)×$18 = −6,000×$18 = −$108,000 → $108,000 U (lost 1 point of a bigger market). Net +$72,000 F — growth covered the share loss, but the $108,000 U is a competitive signal requiring response, not a netting success",
      "D": "Net +$72,000 F only — decomposition adds nothing once the total is known"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Size variance isolates market growth at budgeted share: (600,000 − 500,000) × 10% × $18 = 100,000 × 0.10 × $18 = 10,000 × $18 = $180,000 F. Share variance isolates competitive position at actual market size: (54,000 − 60,000) × $18 = −6,000 × $18 = −$108,000 → $108,000 U. Net = $180,000 F − $108,000 U = +$72,000 F. All-favorable (option A) reads 54,000 > 50,000 as universal success — the 1-point share loss in a growing market is masked by totals. Share-only (option B) discards the $180,000 growth context — performance evaluation needs both legs; growth context without share accountability (or vice versa) is half a report card. Total-only (option D: +$72,000 verdict) nets a $108,000 competitive deterioration into growth — the share leg is an early warning, never nettable noise. Business interpretation: size is the market's gift, share is management's report card — celebrate growth while answering for the point lost. Recommendation: investigate the share loss (pricing? service? competitor entry?) despite the net favorable. Common trap: netting share losses into market growth.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-107",
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
    "ExplanationWrongA": "Option A's all-favorable reads 54,000 > 50,000 as success — the 1-point share loss (−$108,000) hides inside market growth; totals mask competitive deterioration.",
    "ExplanationWrongB": "Option B discards the $180,000 size leg — share accountability without growth context misreads performance; both legs are required for a complete evaluation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's +$72,000 verdict nets a $108,000 competitive early warning into growth — share legs demand investigation, never netting.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.108 flexible budget performance report",
    "MicroTopic": "flexible budget performance report",
    "UniqueConceptKey": "C-108-flexible-budget-performance-report",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Static budget: 50,000 units; revenue $40/unit; variable cost $22/unit; fixed $500,000. Actual: 54,000 units; revenue $2,052,000; variable $1,210,000; fixed $510,000. The VP evaluates marketing on the $52,000 revenue beat vs static. Build the correct flexible-budget performance report and redirect the evaluation.",
    "Choices": {
      "A": "Static comparison stands — $52,000 revenue beat plus $10,000 fixed overrun nets +$42,000, marketing passes",
      "B": "Flexible revenue variance $108,000 U (54,000×$38 vs 54,000×$40) — marketing fails on price; flexible variable variance $22,000 U ($1,210,000 vs 54,000×$22 = $1,188,000) belongs to operations; fixed $10,000 U to administration. Static $52,000 beat confounds a $108,000 price failure with 4,000 units of volume the VP did not create",
      "C": "All variances to marketing — single owner simplifies accountability",
      "D": "Flexible revenue $52,000 F — flexing changes costs, never revenue benchmarks"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Flex at actual volume (54,000): revenue 54,000×$40 = $2,160,000 vs actual $2,052,000 → $108,000 U (marketing's price leg). Variable 54,000×$22 = $1,188,000 vs $1,210,000 → $22,000 U (operations' efficiency/spending leg). Fixed $500,000 vs $510,000 → $10,000 U (administration). Static-beat verdict (option A: +$42,000 pass) credits marketing with 4,000 units of volume as though pricing skill — the $52,000 static beat = $108,000 price failure + volume effects the VP did not create. Single-owner (option C) charges marketing for operations' $22,000 and admin's $10,000. Revenue-unflexed (option D: $52,000 F) flexes costs but benchmarks revenue at static volume — flexing applies to all volume-driven lines. Business interpretation: flexible budgets separate volume effects (uncontrollable by the manager) from price/efficiency effects (controllable) — evaluate each owner only on their leg. Recommendation: marketing answers for $108,000 U pricing, not the $52,000 static beat. Common trap: evaluating revenue centers against static budgets.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-108",
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
    "ExplanationWrongA": "Option A's +$42,000 pass credits marketing with 4,000 units of volume as pricing skill — static beats confound volume the manager did not create with price they controlled.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C charges marketing for operations' $22,000 variable leg and admin's $10,000 fixed leg — controllability assigns each leg to its owner, never all to one.",
    "ExplanationWrongD": "Option D flexes costs but benchmarks revenue at static volume — flexing applies to every volume-driven line including revenue.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.109 standard revision versus variance",
    "MicroTopic": "standard revision variance",
    "UniqueConceptKey": "C-109-standard-revision-variance",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Material standard $6.00/lb set 3 years ago. Industry prices rose 12% (current benchmark $6.72). Actual price $6.65 on 40,000 lbs. Reported price variance: 40,000×($6.65−$6.00) = $26,000 U. Purchasing demands the standard be revised before any investigation. As controller, decide.",
    "Choices": {
      "A": "Investigate purchasing immediately on $26,000 U — standards are standards until year-end",
      "B": "Revise and investigate: restated variance vs $6.72 benchmark = 40,000×($6.65−$6.72) = 40,000×−$0.07 = −$2,800 → $2,800 F (purchasing beat the market); the $26,000 U is $28,800 of stale-standard artifact ($0.72×40,000) offset by $2,800 of genuine purchasing performance. Revise the standard to $6.72 AND commend purchasing — investigating a stale $26,000 U punishes market-beating buying",
      "C": "Revise the standard and drop all investigation — new standards erase history",
      "D": "Keep $6.00 permanently — attainable standards must never change"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Decompose the reported variance: market movement ($6.72 − $6.00) × 40,000 = $0.72 × 40,000 = $28,800 U (planning artifact — standard obsolescence, nobody's performance) vs purchasing performance ($6.65 − $6.72) × 40,000 = −$0.07 × 40,000 = −$2,800 → $2,800 F (beat the market). Reported $26,000 U = $28,800 artifact − $2,800 performance. Investigate-on-stale (option A) disciplines purchasing for beating the market by $2,800 — performance systems that punish market-beating buying destroy credibility. Revise-and-forget (option C) erases the $2,800 F signal along with the artifact — revision updates benchmarks, never deletes performance history. Frozen standards (option D) institutionalize obsolescence — attainable standards revise with sustained market shifts. Business interpretation: split every variance into planning (benchmark moved) vs operational (manager moved vs benchmark) before judging — judge managers against current markets, and judge standards against revision discipline. Common trap: investigating variances against obsolete standards.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-109",
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
    "ExplanationWrongA": "Option A investigates purchasing on a stale $26,000 U — $28,800 of it is 3-year obsolescence; disciplining market-beating buying ($2,800 F vs benchmark) destroys system credibility.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's revision erases the $2,800 F purchasing signal with the artifact — benchmarks update forward; performance history stays on record.",
    "ExplanationWrongD": "Option D freezes a 3-year-old standard against 12% market movement — attainable standards revise with sustained shifts; permanence is obsolescence policy.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.110 variance investigation decision",
    "MicroTopic": "variance investigation decision",
    "UniqueConceptKey": "C-110-variance-investigation-decision",
    "LOSTag": "P1-C.1 Cost and variance measures",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A $9,000 unfavorable material quantity variance repeats monthly. Investigation costs $4,000. If the cause is controllable (60% probability), correction saves $12,000 next period; if random (40%), nothing. Prior policy: investigate all variances over $10,000 only. Decide using expected value and assess the policy.",
    "Choices": {
      "A": "Do not investigate — $9,000 is below the $10,000 policy threshold, and policy governs",
      "B": "Investigate: EV = 0.6×$12,000 + 0.4×$0 − $4,000 = $7,200 − $4,000 = +$3,200 → investigate; the $10,000 threshold policy is arbitrary (ignores probability, recurrence, and investigation cost) and should be replaced with expected-value triage, especially for repeating variances",
      "C": "Investigate routinely every month regardless — all variances deserve investigation",
      "D": "Investigate only if controllable — determine controllability first, then decide"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Expected value of investigating = 0.60 × $12,000 + 0.40 × $0 − $4,000 = $7,200 − $4,000 = +$3,200 > 0 → investigate. Threshold-only (option A: below $10,000, skip) applies an arbitrary cutoff that ignores the 60% controllability odds, the monthly recurrence ($9,000 × 12 = $108,000 annual exposure), and the $4,000 cost — a $3,200-positive investigation dies on a round number. Always-investigate (option C) wastes $4,000 on low-EV variances elsewhere — triage, never routine. Controllability-first (option D) demands knowing the answer before paying for it — investigation is how controllability is discovered; the 60% prior IS the input. Business interpretation: replace fixed-dollar thresholds with expected-value triage (probability × savings − cost), weighted toward recurrence — repeating variances are processes, not events. Recommendation: investigate now and retire the $10,000 rule for a probability-cost screen. Common trap: letting round-number thresholds override positive-EV investigations.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-C-110",
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
    "ExplanationWrongA": "Option A's $10,000 threshold kills a +$3,200 investigation on a round number — thresholds ignore probability (60%), recurrence ($108,000 annual exposure), and cost ($4,000).",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C investigates everything — $4,000 spent on negative-EV variances elsewhere wastes more than triage saves; investigate by expected value, never by routine.",
    "ExplanationWrongD": "Option D demands knowing controllability before investigating — the 60% prior is the input, and investigation is the discovery mechanism; certainty-first is analysis paralysis.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 14 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE14A;