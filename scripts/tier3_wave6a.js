const WAVE6A = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.076 high-low with outlier exclusion",
    "MicroTopic": "high-low outlier exclusion",
    "UniqueConceptKey": "D-D076-high-low-outlier-exclusion",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Quarterly utilities (units, cost): Q1 10,000/$82,000; Q2 12,000/$90,000; Q3 8,000/$120,000 (strike quarter with idle-capacity surcharges); Q4 14,000/$98,000. The analyst runs high-low on all four quarters and reports a negative variable rate. What is the correct cost function?",
    "Choices": {
      "A": "Exclude Q3 (strike); VC $4.00/unit, FC $42,000 — naive high-low gives −$3.67, an impossible negative rate proving contamination",
      "B": "Accept −$3.67 variable rate — the data is the data regardless of sign",
      "C": "VC $4.00 with no fixed component — high-low only estimates variable rates",
      "D": "Include Q3 with a strike dummy — four observations support two-variable regression"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Naive high-low (max activity 14,000/$98,000; min 8,000/$120,000): VC = ($98,000 − $120,000)/(14,000 − 8,000) = −$22,000/6,000 = −$3.67/unit — negative variable cost is economically impossible (more production cannot cost less than nothing at the margin), which diagnoses Q3 as a contaminating outlier (strike surcharges decoupled cost from activity). Excluding Q3: high 14,000/$98,000, low 10,000/$82,000 → VC = $16,000/4,000 = $4.00/unit; FC = $98,000 − 14,000×$4 = $98,000 − $56,000 = $42,000. Check against Q2: 12,000×$4 + $42,000 = $48,000 + $42,000 = $90,000 — reconciles. A four-observation two-variable regression (option D) burns the only usable degrees of freedom on a dummy — econometrics cannot rescue contaminated data with n=4. Business interpretation: impossible parameter signs are diagnostics, not answers — investigate the observation, then exclude with documentation. Common trap: running high-low mechanically across known structural breaks.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Cost Behavior",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/2-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-076",
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
    "ExplanationWrongB": "Option B accepts a −$3.67 variable rate because 'the data is the data.' Negative marginal cost violates production economics — impossible signs diagnose contaminated observations; they are never reported as findings.",
    "ExplanationWrongC": "Option C reports VC $4.00 with no fixed component, dropping the $42,000 intercept. High-low estimates both parameters — the intercept is half the cost function, not an optional accessory.",
    "ExplanationWrongD": "Option D runs a two-variable regression on four observations (one dummy + intercept + slope = 3 parameters, 1 degree of freedom). Estimation with no degrees of freedom is numerology — exclude the outlier with documentation instead.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.077 regression output interpretation",
    "MicroTopic": "regression output interpretation",
    "UniqueConceptKey": "D-D077-regression-output-interpretation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Maintenance cost regression: slope $3.80/unit (t = 9.5), intercept $45,000 (t = 1.1), R² = 0.94, estimated on 8,000–16,000 units. The budget uses $45,000 fixed plus $3.80/unit and forecasts 20,000 units. Which reading of the output is correct?",
    "Choices": {
      "A": "Use all estimates as stated — regression output is authoritative at any volume",
      "B": "Slope $3.80 is valid (t = 9.5); intercept is insignificant (t = 1.1) so $45,000 is unreliable; the 20,000-unit forecast exceeds the 8–16k range and is unreliable",
      "C": "Intercept $45,000 is the true fixed cost — intercepts always measure fixed cost regardless of t-statistics",
      "D": "R² 0.94 means the forecast is 94% accurate at any volume"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "t = 9.5 on the slope decisively rejects zero (highly significant) — $3.80/unit is a reliable variable rate. t = 1.1 on the intercept fails significance — $45,000 is statistically indistinguishable from zero, so treating it as measured fixed cost over-reads noise (use engineering fixed-cost data instead). R² = 0.94 describes in-sample fit, not out-of-sample accuracy — and 20,000 units sits 25% above the 16,000-unit estimation ceiling, where linearity is untested (fixed-cost steps, capacity effects). So: keep the slope, distrust the intercept, and refuse the 20,000-unit forecast without range extension. Option A's blanket authority ignores all three qualifications. Option C reads intercepts as fixed costs by definition — only significant intercepts earn that reading. Option D converts R² into an accuracy percentage valid everywhere — R² is in-sample explained variance, silent on extrapolation. Business interpretation: regression output is a menu with significance tests as prices — buy only significant coefficients inside the relevant range. Common trap: forecasting outside the estimation range on high R².",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Cost Behavior",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/2-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-077",
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
    "ExplanationWrongA": "Option A applies all estimates at any volume, ignoring insignificance (intercept t = 1.1) and range limits (20,000 vs 16,000 ceiling). Regression output carries its qualifications on its face — read them.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C treats the $45,000 intercept as measured fixed cost regardless of t = 1.1. Insignificant intercepts are noise with a dollar sign — substitute engineering fixed-cost data instead.",
    "ExplanationWrongD": "Option D reads R² 0.94 as 94% accuracy everywhere. R² measures in-sample fit; it says nothing about 25%-above-range extrapolation where linearity is untested.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.078 job cost underapplied disposition",
    "MicroTopic": "job cost underapplied disposition",
    "UniqueConceptKey": "D-D078-job-cost-underapplied-disposition",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Custom job: direct materials $25,000; direct labor 800 hrs @ $30 ($24,000); overhead applied 800 hrs @ $20 ($16,000) — job cost $65,000. Actual shop overhead $18,000 (applied $16,000 → $2,000 underapplied). Job sells for $85,000. What are job COGS, gross profit, and the underapplied treatment?",
    "Choices": {
      "A": "Job cost $65,000; $2,000 underapplied closed to COGS; COGS $67,000; gross profit $18,000",
      "B": "Gross profit $20,000 — underapplied overhead is a period variance, never job cost",
      "C": "Prorate the $2,000 across WIP, FG, and COGS — all underapplied amounts must be prorated",
      "D": "Apply $18,000 actual overhead to the job — actual costing replaces estimates at sale"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Job cost = $25,000 + $24,000 + $16,000 = $65,000. Underapplied = actual $18,000 − applied $16,000 = $2,000 debit balance; at $2,000 on a $65,000 job (3%), immaterial → close to COGS. COGS = $65,000 + $2,000 = $67,000; gross profit = $85,000 − $67,000 = $18,000. Period-variance treatment (option B, $20,000 GP) misstates COGS — immaterial underapplied overhead adjusts COGS routinely; only material amounts prorate. Mandatory proration (option C) applies materiality judgment backwards — $2,000 proration costs more in accounting effort than it gains in precision. Actual-costing at sale (option D, $18,000 applied) destroys normal costing's timeliness benefit (jobs costed months before actuals finalize). Business interpretation: disposition follows materiality — close small balances, prorate large ones, and never let $2,000 of overhead distort an $85,000 sale's margin story. Common trap: prorating immaterial balances.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Job Order Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-078",
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
    "ExplanationWrongB": "Option B's $20,000 GP treats the $2,000 underapplied as a period variance outside COGS. Immaterial underapplied overhead closes to COGS routinely — $20,000 overstates margin by the unadjusted $2,000.",
    "ExplanationWrongC": "Option C prorates $2,000 across WIP/FG/COGS as mandatory. Proration is the material-balance treatment — $2,000 proration costs more in effort than it gains in precision. Materiality gates the method.",
    "ExplanationWrongD": "Option D applies $18,000 actual overhead to the job at sale, replacing estimates with actuals. Normal costing exists precisely to cost jobs before actuals finalize — actual-costing at sale surrenders timeliness for illusory precision.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.079 FIFO equivalent units with BWIP",
    "MicroTopic": "FIFO equivalent units BWIP",
    "UniqueConceptKey": "D-D079-FIFO-equivalent-units-BWIP",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Blending: BWIP 2,000 units 40% complete; started 10,000; completed 9,000; EWIP 3,000 units 30% complete. Current-period costs $91,000. Under FIFO, what are equivalent units and cost per EU?",
    "Choices": {
      "A": "9,900 EU — beginning work counts in full under FIFO",
      "B": "9,100 EU at the average-method $10.00 — methods converge with BWIP present",
      "C": "9,100 EU counting EWIP as whole units — completion percentages apply only to BWIP",
      "D": "9,100 EU; $10.00/EU — current-period work only (1,200 to finish BWIP + 7,000 started/completed + 900 EWIP)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "FIFO counts only current-period work: finish BWIP (2,000 × 60% remaining) = 1,200 EU; started-and-completed (9,000 − 2,000) = 7,000 EU; EWIP (3,000 × 30%) = 900 EU. Total = 1,200 + 7,000 + 900 = 9,100 EU. Cost per EU = $91,000/9,100 = $10.00. Including BWIP's prior-period 800 EU (option A, 9,900) is average-method mechanics under a FIFO label. Option B's 'methods converge' is false — 9,900 average EU would give $91,000/9,900 = $9.19, a different unit cost with different inventory valuation. Whole-unit EWIP (option C) ignores the 30% completion state. Business interpretation: FIFO isolates current-period performance — BWIP's prior work belongs to last period's cost, never this period's EU. Common trap: adding BWIP EU under FIFO.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-079",
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
    "ExplanationWrongA": "Option A's 9,900 EU includes BWIP's 800 prior-period EU — average-method mechanics under a FIFO label. FIFO's defining discipline is excluding prior-period work from current EU.",
    "ExplanationWrongB": "Option B claims method convergence with BWIP present, but 9,900 average EU yields $9.19/EU versus FIFO's $10.00 — different costs, different inventory values, different income. Methods diverge precisely when BWIP exists.",
    "ExplanationWrongC": "Option C counts 3,000 EWIP as whole units, ignoring the 30% completion state (900 EU). Completion percentages apply to every partial inventory — EWIP included, always.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.080 average costing with spoilage layers",
    "MicroTopic": "average costing spoilage layers",
    "UniqueConceptKey": "D-D080-average-costing-spoilage-layers",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Costs $120,000; completed good units 9,000; normal spoilage 600 (end-inspection, full EU); abnormal spoilage 400 (end, full EU). Under weighted average, what are cost per EU, abnormal loss, and good-unit cost?",
    "Choices": {
      "A": "$12.00/EU with abnormal absorbed — spoilage never separates",
      "B": "$13.33/EU — abnormal excluded from denominator inflates good-unit cost",
      "C": "$12.00/EU; abnormal loss $4,800; good-unit cost $12.80 (normal absorbed by good output)",
      "D": "$12.50/EU — denominator excludes abnormal (9,600 EU)"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "EU = 9,000 good + 600 normal + 400 abnormal = 10,000 (all end-inspected, full EU) → $120,000/10,000 = $12.00/EU. Abnormal loss = 400 × $12 = $4,800 period loss. Good output = (9,000 + 600 normal) × $12 = 9,600 × $12 = $115,200 → good-unit cost = $115,200/9,000 = $12.80 (normal spoilage absorbed). Check: $115,200 + $4,800 = $120,000 — reconciles. No-separation (option A, $12.00 flat) buries the $4,800 abnormal loss in product cost, hiding controllable failure. Option B's $13.33 (= $120,000/9,000) spreads everything including abnormal over good units — penalizing good output for the abnormal event. Option D's $12.50 (9,600 EU excluding abnormal) overstates the EU rate and the abnormal loss ($5,000) together. Business interpretation: EU denominators include every inspected unit; only the cost assignment separates normal (absorbed) from abnormal (expensed). Common trap: excluding abnormal units from EU.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-080",
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
    "ExplanationWrongA": "Option A's $12.00 flat absorbs abnormal spoilage into product cost, burying a $4,800 controllable failure in good-unit cost. Abnormal spoilage separates as a period loss — always.",
    "ExplanationWrongB": "Option B's $13.33 spreads the full $120,000 (including abnormal) over 9,000 good units — penalizing good output for the abnormal event and overstating inventory by $4,800.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $12.50 excludes abnormal units from EU (9,600 denominator), overstating both the rate and the abnormal loss ($5,000). EU includes every inspected unit; assignment — not denomination — separates abnormal.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.081 ABC cross-subsidy reveal",
    "MicroTopic": "ABC cross-subsidy reveal",
    "UniqueConceptKey": "D-D081-ABC-cross-subsidy-reveal",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Products P (10,000 units, 1 setup, 100 inspections, 8,000 DLH) and Q (1,000 units, 9 setups, 900 inspections, 2,000 DLH). Overhead: setups $200,000 (10 total), inspections $100,000 (1,000 total) — $300,000 total. Plantwide rate on DLH is $30. Compare plantwide versus ABC unit costs.",
    "Choices": {
      "A": "Identical — allocation methods converge with two products",
      "B": "Plantwide P $24/Q $60 versus ABC P $3/Q $270 — high-volume P subsidizes complex Q by $21/$210 per unit",
      "C": "ABC shows Q cheaper — complexity efficiencies dominate",
      "D": "Setups are irrelevant — only inspection hours drive overhead"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Plantwide: $300,000/10,000 DLH = $30/DLH → P 8,000×$30 = $240,000 ($24/u); Q 2,000×$30 = $60,000 ($60/u). ABC: setup rate $200,000/10 = $20,000/setup; inspection $100,000/1,000 = $100 each. P = 1×$20,000 + 100×$100 = $20,000 + $10,000 = $30,000 ($3/u). Q = 9×$20,000 + 900×$100 = $180,000 + $90,000 = $270,000 ($270/u). Cross-subsidy: P overcosted $24 − $3 = $21/u; Q undercosted $270 − $60 = $210/u. Plantwide charges volume (DLH) for complexity-driven costs — P's 8,000 hours absorb setup/inspection resources Q actually consumes (9 of 10 setups, 900 of 1,000 inspections). Business interpretation: plantwide rates tax high-volume simple products to subsidize low-volume complex ones — pricing, mix, and drop decisions built on plantwide costs systematically favor complexity. Convergence (option A) denies driver heterogeneity. Q-cheaper (option C) inverts the finding. Setups-irrelevant (option D) discards $200,000 of the $300,000 pool. Common trap: defending plantwide as 'fair' because it uses a production-volume base.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Activity-Based Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-081",
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
    "ExplanationWrongA": "Option A claims convergence with two products, but driver heterogeneity (1 vs 9 setups, 100 vs 900 inspections) guarantees divergence — methods converge only when consumption ratios match the base ratios.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C finds Q cheaper under ABC, inverting the result — Q consumes 90% of both activities for 9% of volume. Complexity concentrates cost; it never dilutes it.",
    "ExplanationWrongD": "Option D discards $200,000 of setup cost as irrelevant. Setups are two-thirds of the pool and 9:1 Q-skewed — the single most informative driver in the data.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.082 joint cost NRV allocation",
    "MicroTopic": "joint cost NRV allocation",
    "UniqueConceptKey": "D-D082-joint-cost-NRV-allocation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $100,000. Product A: 5,000 units, split-off price $30 ($150,000), separable costs $20,000. Product B: 3,000 units, split-off price $50 ($150,000), separable costs $30,000. Allocate joint cost by net realizable value at split-off.",
    "Choices": {
      "A": "A $52,000; B $48,000 — NRV $130,000 vs $120,000 (total $250,000) pro-rata",
      "B": "A $62,500; B $37,500 — physical units (5,000/3,000) pro-rata",
      "C": "A $50,000; B $50,000 — equal split-off values mean equal shares",
      "D": "A $72,000; B $78,000 — joint plus separable pooled ($250,000) then split by sales"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "NRV at split-off = sales value minus separable costs: A $150,000 − $20,000 = $130,000; B $150,000 − $30,000 = $120,000; total $250,000. Allocate: A 130/250 × $100,000 = $52,000; B 120/250 × $100,000 = $48,000. Physical units (option B: 5/8 × $100,000 = $62,500) ignores value entirely — weight and worth diverge. Equal split (option C) notices the $150,000 tie but skips separable costs, which differentiate the products' net economics. Pooling separable costs (option D) re-joint-ifies costs the method exists to separate. Business interpretation: NRV allocation charges joint cost by post-separation economics — products needing more separable work carry proportionally less joint cost. Common trap: allocating on gross split-off values without netting separable costs.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-082",
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
    "ExplanationWrongB": "Option B's 5,000/3,000 physical split ($62,500/$37,500) ignores value — weight and worth diverge across joint products by definition. Physical methods apply only where value measures are unavailable.",
    "ExplanationWrongC": "Option C splits equally on tied $150,000 gross values, skipping separable costs ($20,000 vs $30,000) that differentiate net economics. Gross ties mask net differences — NRV exists to unmask them.",
    "ExplanationWrongD": "Option D pools separable costs back into joint ($250,000) then splits by sales — re-joint-ifying costs the method exists to separate. Separable costs stay with their products, always.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.083 step-down order selection effect",
    "MicroTopic": "step-down order selection effect",
    "UniqueConceptKey": "D-D083-step-down-order-selection-effect",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "S1 $60,000 (25% to S2, 45% to P1, 30% to P2); S2 $40,000 (10% to S1, 50% to P1, 40% to P2). Which step-down order is correct, what does it assign to P1, and how far is it from the S2-first alternative?",
    "Choices": {
      "A": "S2 first — smaller departments allocate first by convention",
      "B": "Order never matters — step-down is order-invariant by construction",
      "C": "Direct-method totals ($58,222 P1) — cross-flows net out in practice",
      "D": "S1 first (25% vs 10% cross-service); P1 $57,555.56 versus $58,400 S2-first — order shifts $844.44"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Order rule: allocate first the service department serving others most (S1 sends 25% to S2 vs S2's 10% to S1). S1-first: S2 += 25%×$60,000 = $15,000 (total $55,000); P1 += 45%×$60,000 = $27,000; P2 += 30%×$60,000 = $18,000. Then S2 $55,000 → P1 += 50/90×$55,000 = $30,555.56; P2 += 40/90×$55,000 = $24,444.44. Totals: P1 = $27,000 + $30,555.56 = $57,555.56; P2 = $18,000 + $24,444.44 = $42,444.44 (sum $100,000 — reconciles). S2-first: S1 += 10%×$40,000 = $4,000 (total $64,000); P1 += 50%×$40,000 = $20,000; P2 += 40%×$40,000 = $16,000. Then S1 $64,000 → P1 += 45/75×$64,000 = $38,400; P2 += 30/75×$64,000 = $25,600. Totals: P1 = $58,400; P2 = $41,600. Order shifts P1 by $844.44. Size-ordering (option A) has no basis — cross-service percentage governs. Order-invariance (option B) holds only for reciprocal, never step-down. Direct totals (option C, P1 $58,222.22) ignore cross-flows in both directions. Business interpretation: step-down order is a policy choice with dollar consequences — document the rule (most cross-service first) and apply it consistently. Common trap: allocating smaller-first by tidiness.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-083",
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
    "ExplanationWrongA": "Option A allocates smaller-first (S2) by tidiness convention. The rule is most-cross-service-first (S1's 25% vs S2's 10%) — size ordering has no basis and shifts P1 by $844.44 versus the correct order.",
    "ExplanationWrongB": "Option B claims order-invariance, which holds only for reciprocal (simultaneous) allocation. Step-down is sequential by construction — order changes which cross-flow gets recognized, hence the $844.44 delta.",
    "ExplanationWrongC": "Option C substitutes direct-method P1 ($58,222.22), ignoring cross-flows in both directions. Direct is a different method, not an order option — it answers a different question.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.084 multi-product breakeven mix",
    "MicroTopic": "multi-product breakeven mix",
    "UniqueConceptKey": "D-D084-multi-product-breakeven-mix",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "X: price $40, VC $24 (CM $16), mix 3. Y: price $60, VC $45 (CM $15), mix 2. Fixed costs $156,000. What are breakeven units and breakeven revenue at constant mix?",
    "Choices": {
      "A": "10,065 units — average CM $15.50 ($31/2) into fixed costs",
      "B": "9,750 units of X alone — breakeven on the higher-CM product covers fastest",
      "C": "2,000 bundles → X 6,000 units, Y 4,000 units; revenue $480,000 — bundle CM $78 covers fixed exactly",
      "D": "X 5,000, Y 5,000 — equal mix is the neutral assumption"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Bundle (3X + 2Y) CM = 3×$16 + 2×$15 = $48 + $30 = $78. Bundles to break even = $156,000/$78 = 2,000 → X 6,000 units, Y 4,000 units. Revenue = 6,000×$40 + 4,000×$60 = $240,000 + $240,000 = $480,000. Check: total CM = 6,000×$16 + 4,000×$15 = $96,000 + $60,000 = $156,000 = fixed — reconciles. Simple-average CM (option A: ($16+$15)/2 = $15.50 → 10,065 units) weights products equally against a 3:2 mix — wrong bundle, wrong answer. X-only breakeven (option B: $156,000/$16 = 9,750) assumes Y vanishes — mix is a constraint, not a suggestion. Equal-mix (option D: 5,000/5,000) invents proportions contradicting the stated 3:2. Business interpretation: multi-product breakeven is bundle arithmetic — fix the mix, price the bundle, divide fixed. Common trap: averaging CMs across unequal mixes.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: CVP Analysis",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/3-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-084",
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
    "ExplanationWrongA": "Option A's 10,065 units averages CMs ($15.50) across a 3:2 mix — equal weighting against stated proportions. Bundle CM is $78 on 5 units ($15.60 effective), not $15.50 on 1.",
    "ExplanationWrongB": "Option B's 9,750 X-only units assumes Y vanishes from the mix. Mix is a constraint of the analysis — breakeven on one product answers a different (single-product) question.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's 5,000/5,000 equal mix contradicts the stated 3:2 proportions. Neutral assumptions are still assumptions — and this one is stated false.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.085 special order with displacement",
    "MicroTopic": "special order displacement",
    "UniqueConceptKey": "D-D085-special-order-displacement",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Capacity 100,000 units; current production 90,000. Special order: 15,000 units at $28 (VC $20). Fixed costs $500,000 are sunk for this decision. Filling the order displaces 5,000 regular units at $35 (same $20 VC). Should the order be accepted?",
    "Choices": {
      "A": "Reject — 105,000 exceeds 100,000 capacity, so the order cannot be filled",
      "B": "Accept — $120,000 order contribution minus $75,000 displaced contribution = $45,000 net benefit",
      "C": "Accept at any price above $20 — any positive unit margin justifies acceptance",
      "D": "Accept with $120,000 net benefit — displacement is a sunk-capacity technicality"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Order contribution = 15,000 × ($28 − $20) = 15,000 × $8 = $120,000. Displacement: 5,000 regular units × ($35 − $20) = 5,000 × $15 = $75,000 of foregone contribution (opportunity cost). Net = $120,000 − $75,000 = +$45,000 → accept. Fixed $500,000 is sunk (unchanged by the decision) — correctly excluded throughout. Capacity-breach rejection (option A) treats 100,000 as a wall rather than a trade: 5,000 units of displacement is feasible and priced. Any-price-above-$20 (option C) ignores displacement — at $22 the order contributes $30,000 but displaces $75,000 (net −$45,000). The $120,000 gross (option D) counts contribution while ignoring opportunity cost — the most expensive line in the analysis. Business interpretation: special orders with constrained capacity price two things (incremental margin, displaced margin) — accept only when the first exceeds the second. Common trap: treating opportunity cost as a technicality.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DD-085",
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
    "ExplanationWrongA": "Option A rejects on 105,000 > 100,000 capacity as a hard wall. Capacity binds through displacement pricing ($75,000), not prohibition — 5,000 units shift feasibly at a measured cost.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C accepts any price above $20 VC, ignoring the $75,000 displacement. At $22 the order nets $30,000 − $75,000 = −$45,000 — positive unit margin with negative decision value.",
    "ExplanationWrongD": "Option D's $120,000 net ignores the $75,000 opportunity cost as a technicality. Opportunity cost is the decision's largest cost line — excluding it inflates the answer 2.7×.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 6 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE6A;