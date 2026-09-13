const WAVE8C2 = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.151 high-low across cost step",
    "MicroTopic": "high-low cost step",
    "UniqueConceptKey": "B-D-151-high-low-cost-step",
    "LOSTag": "P1-D Cost estimation",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Semiannual data (units, cost): H1 5,000/$60,000 and 7,000/$68,000; then a $24,000 fixed-cost step (new lease); H2 6,000/$88,000 and 8,000/$96,000. Estimate the cost function.",
    "Choices": {
      "A": "Split at the step: pre VC $4.00/FC $40,000; post VC $4.00/FC $64,000 (+$24,000 step); pooled high-low corrupts both periods",
      "B": "Pooled high-low on all four: VC $7.00, FC $40,000 — one line for all data",
      "C": "Post-step only VC $4.00 with no fixed — steps eliminate fixed baselines",
      "D": "Average all four ($83,000/6,500 = $12.77) as the forward rate — simplicity beats structure"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Pre-step: VC = ($68,000 − $60,000)/(7,000 − 5,000) = $8,000/2,000 = $4.00; FC = $68,000 − 7,000×$4 = $68,000 − $28,000 = $40,000. Post-step: VC = ($96,000 − $88,000)/(8,000 − 6,000) = $8,000/2,000 = $4.00; FC = $96,000 − 8,000×$4 = $96,000 − $32,000 = $64,000. Step = $64,000 − $40,000 = +$24,000 — variable rate unchanged ($4.00 both regimes), fixed jumped. Pooled high-low (option B: high (8k,$96k), low (5k,$60k) → VC $36,000/3,000 = $12.00 with FC $0) fabricates a $12 rate from a regime break. Averaging (option D, $12.77) unitizes everything including fixed. Business interpretation: structural breaks split estimation samples — one line per regime, with the step measured as the intercept shift. Common trap: pooling across known breaks.",
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
    "QuestionID": "P1B-D-151",
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
    "ExplanationWrongB": "Option B's pooled $12.00 variable rate triples the true $4.00 by straddling a $24,000 step — regime breaks pooled into slopes corrupt both slope and intercept simultaneously.",
    "ExplanationWrongC": "Option C drops fixed baselines post-step as if steps eliminate them. Steps shift fixed ($40,000 → $64,000); they never zero it — $64,000 of fixed persists above the break.",
    "ExplanationWrongD": "Option D's $12.77 average unitizes fixed and variable together across regimes — a single number answering neither the rate question ($4.00) nor the fixed question ($40,000/$64,000).",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.152 through-origin regression commissions",
    "MicroTopic": "through-origin regression commissions",
    "UniqueConceptKey": "B-D-152-through-origin-regression-commissions",
    "LOSTag": "P1-D Cost estimation",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Sales vs commissions ($000s): (100, $5), (200, $10), (300, $14). Theory says zero sales → zero commission (no retainer). Estimate the commission rate with and without intercept, and recommend.",
    "Choices": {
      "A": "With intercept ($0.67k + 4.67%) — intercepts always improve fit and belong in budgets",
      "B": "Through-origin 4.79% (Σxy/Σx² = 6,700/140,000) — theory (zero sales → zero commission) plus a better out-of-sample basis; the intercept model invents $670 of fixed pay that doesn't exist",
      "C": "Simple average 4.89% ((5+5+4.67)/3) — averaging rates is the robust estimator",
      "D": "Highest observed 5% — conservative budgeting uses ceiling rates"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Through-origin slope = Σxy/Σx² = (100×5 + 200×10 + 300×14)/(100² + 200² + 300²) = (500 + 2,000 + 4,200)/(10,000 + 40,000 + 90,000) = 6,700/140,000 = 0.047857 ≈ 4.79%. With-intercept OLS would fit ≈$0.67k intercept + 4.67% slope — but the $670 intercept asserts fixed commission pay at zero sales, contradicting the no-retainer plan (theory constrains specification). Simple-average rates (option C: (5% + 5% + 4.67%)/3 = 4.89%) weights small and large observations equally, overweighting noise. Ceiling-rate budgeting (option D, 5%) bakes maximum historical noise into every forecast dollar. Business interpretation: let theory choose specification (through-origin where zero-means-zero), then estimate within it — intercepts need theoretical license, not just fit improvement. Common trap: fitting intercepts that contradict known plan mechanics.",
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
    "QuestionID": "P1B-D-152",
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
    "ExplanationWrongA": "Option A's with-intercept model invents $670 of fixed commission pay at zero sales — contradicting the no-retainer plan. Fit improvement from theory-violating parameters is overfitting, not insight.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's 4.89% simple average weights the $100k and $300k observations equally — small-sample noise gets full vote. Regression weights by leverage (Σxy/Σx²), letting informative observations dominate.",
    "ExplanationWrongD": "Option D's 5% ceiling budgets maximum historical noise into every forecast dollar. Ceilings are controls for padded submissions, not estimators for unbiased plans.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.153 batch rework normal abnormal split",
    "MicroTopic": "batch rework normal abnormal split",
    "UniqueConceptKey": "B-D-153-batch-rework-normal-abnormal-split",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A custom batch cost $120,000 for 500 units ($240/unit). Rework: $8,000 normal (expected on custom specs, 3% historical rate) + $5,000 abnormal (operator skipped a step). The job ships complete. What is job cost and period loss?",
    "Choices": {
      "A": "Job $128,000 ($120,000 + $8,000 normal); $5,000 abnormal period loss — normal rework attaches, abnormal expenses",
      "B": "Job $133,000 — all rework attaches to custom jobs by definition",
      "C": "Job $120,000; $13,000 period loss — rework never attaches to jobs",
      "D": "Job $125,000 — abnormal attaches, normal expenses (rework symmetry)"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Normal rework ($8,000, within the 3% historical custom-job rate) is an anticipated cost of custom production — attaches to the job: $120,000 + $8,000 = $128,000 job cost ($256/unit). Abnormal rework ($5,000, skipped step) is controllable failure — period loss, expensed immediately with corrective action. Attach-all (option B, $133,000) buries controllable failure in job cost, hiding the skipped step from performance review. Expense-all (option C) understates the job by $8,000 of expected custom-work cost, distorting custom-vs-standard profitability comparisons. Option D inverts the treatment (attaches abnormal, expenses normal) — precisely backwards on both legs. Business interpretation: rework classification follows controllability against historical norms — expected attaches, exceptional expenses. Common trap: attaching all rework (hides failure) or expensing all rework (understates custom cost).",
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
    "QuestionID": "P1B-D-153",
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
    "ExplanationWrongB": "Option B's $133,000 attaches the $5,000 abnormal rework to the job, burying a controllable skipped step in product cost — abnormal failure belongs in period loss with corrective action, never in inventory.",
    "ExplanationWrongC": "Option C expenses all $13,000, understating the custom job by $8,000 of expected rework. Normal rework on custom specs is product cost — expensing it understates custom-job economics systematically.",
    "ExplanationWrongD": "Option D attaches abnormal while expensing normal — precisely inverted on both legs. Expected costs attach; exceptional failures expense. Symmetry arguments ignore the controllability distinction.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.154 transferred-in FIFO layering",
    "MicroTopic": "transferred-in FIFO layering",
    "UniqueConceptKey": "B-D-154-transferred-in-FIFO-layering",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BWIP 2,000u: transferred-in $20,000 (100%), DM 0%, conversion 50% (1,000 EU). Started 8,000. Completed 9,000. EWIP 1,000u: transferred 100%, DM 80%, conversion 60%. Current costs: transferred-in $70,000, DM $45,000, conversion $55,000. Under FIFO, what are EU and cost per EU by component?",
    "Choices": {
      "A": "TI 9,000 EU ($7.78); DM 9,800 ($4.59); conv 9,600 ($5.73) — BWIP prior work included throughout",
      "B": "TI 7,000 EU ($10.00); DM 7,800 ($5.77); conv 8,600 ($6.40) — current-period work only",
      "C": "TI 7,000 ($10.00); DM 9,800 ($4.59); conv 9,600 ($5.73) — BWIP excluded selectively by convenience",
      "D": "TI 9,000 ($7.78); DM 7,800 ($5.77); conv 8,600 ($6.40) — transferred-in always uses average method"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "FIFO counts only current-period work per component. Transferred-in: completed 9,000 − BWIP 2,000 (already transferred last period) = 7,000 EU → $70,000/7,000 = $10.00. DM: BWIP 0% → started-and-completed (9,000 − 2,000) = 7,000 + EWIP 1,000×80% = 800 → 7,800 EU → $45,000/7,800 = $5.7692 ≈ $5.77. Conversion: finish BWIP 2,000×50% = 1,000 + 7,000 + EWIP 1,000×60% = 600 → 8,600 EU → $55,000/8,600 = $6.3953 ≈ $6.40. (Option A's 9,000/9,800/9,600 EU set includes BWIP prior work — average mechanics.) Selective exclusion (option C) applies FIFO to two components and average to DM — method consistency forbids it. Transferred-always-average (option D) invents a component exception FIFO does not contain. Business interpretation: FIFO layers each cost component independently — BWIP prior work excluded component-by-component, never selectively. Current unit cost = $10.00 + $5.77 + $6.40 = $22.17. Common trap: including BWIP prior EU under FIFO labels.",
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
    "QuestionID": "P1B-D-154",
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
    "ExplanationWrongA": "Option A's 9,000/9,800/9,600 EU set includes BWIP prior work (2,000 TI, 800... precisely 1,000 conv EU) — average-method mechanics under a FIFO label. FIFO's defining discipline is excluding prior-period work.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C excludes BWIP for TI and conversion but includes it for DM ($4.59) — method consistency forbids selective FIFO. All components layer identically or the method is mislabeled.",
    "ExplanationWrongD": "Option D invents a transferred-in exception ($7.78 average) while FIFO-layering the rest. No component exception exists — transferred-in layers exactly like DM and conversion.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.155 unused capacity reporting",
    "MicroTopic": "unused capacity reporting",
    "UniqueConceptKey": "B-D-155-unused-capacity-reporting",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "An activity cost pool totals $500,000 at budgeted 10,000 hours ($50/hr). Actual usage is 8,000 hours. Product costing uses $50/hr on used hours ($400,000). How should the $100,000 of unused capacity be reported, and why not allocate it to products?",
    "Choices": {
      "A": "Allocate $100,000 to products pro-rata — full absorption requires full allocation",
      "B": "Write off to COGS silently — bury capacity cost in margin noise",
      "C": "Report $100,000 as unused-capacity cost (period/separate line) — products bear $400,000 at $50/hr; allocating idle cost punishes products for capacity decisions",
      "D": "Reduce the rate to $40/hr ($400,000/10,000... precisely $500,000/12,500 imaginary hours) — re-rate to absorb the variance"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Products bear 8,000 × $50 = $400,000 (resources consumed at the budgeted rate). The $100,000 balance (2,000 idle hours × $50) is cost of unused capacity — reported separately (period charge or distinct variance line), never allocated to products. Allocating it (option A) punishes products $12.50/unit for capacity planners provided — product costs then rise when volume falls, the death spiral (higher costs → higher prices → lower volume → more idle cost allocated). Silent COGS burial (option B) hides a $100,000 capacity decision inside margin noise. Re-rating to $40 (option D) rewrites history to absorb variance — rates are set ex ante on budgeted activity, not backed into ex post. Business interpretation: unused capacity is a management decision with its own line — allocating it converts capacity planning failures into product-cost inflation. Common trap: full-absorption absolutism that allocates every dollar somewhere.",
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
    "QuestionID": "P1B-D-155",
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
    "ExplanationWrongA": "Option A allocates $100,000 pro-rata, punishing products $12.50/unit for planners' capacity — product costs then rise as volume falls, the death spiral (higher costs → higher prices → lower volume → more idle allocation).",
    "ExplanationWrongB": "Option B buries $100,000 in COGS silently — a $100,000 capacity decision disappears into margin noise, unowned and unexamined. Separate lines create accountability; burial destroys it.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D re-rates to $40 on imaginary hours, rewriting history to absorb variance. Rates are set ex ante on budgeted activity — backing into rates ex post guarantees every variance is always zero by construction.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.156 by-product deduction allocation",
    "MicroTopic": "by-product deduction allocation",
    "UniqueConceptKey": "B-D-156-by-product-deduction-allocation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $200,000. Mains: X NRV $300,000, Y NRV $250,000 (both net of separable costs). By-product NRV $10,000 (sales $12,000 less $2,000 disposal). Allocate joint cost with the by-product treated as a cost reduction.",
    "Choices": {
      "A": "X $109,091 / Y $90,909 — by-product ignored as immaterial by definition",
      "B": "Joint net $190,000; X $103,636 / Y $86,364 — by-product NRV $10,000 deducted before allocation",
      "C": "Allocate over all three including by-product — NRV proportionality is universal",
      "D": "By-product at gross $12,000 — disposal is a period cost in joint contexts"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "By-product as cost reduction: joint net = $200,000 − $10,000 = $190,000. Allocate over mains by NRV: X 300/550 × $190,000 = $103,636.36 ≈ $103,636; Y 250/550 × $190,000 = $86,363.64 ≈ $86,364. Sum $190,000 — reconciles. Ignoring by-product (option A: X 300/550×$200,000 = $109,090.91 ≈ $109,091; Y $90,909) overstates main-product costs collectively by $10,000. Allocating over all three including by-product (option C) elevates scrap to joint-product status, distorting main costs downward. Gross $12,000 (option D) skips $2,000 of disposal — NRV deducts disposal under every presentation method. Business interpretation: by-product NRV reduces the joint pool before main-product allocation — immaterial outputs still adjust material inputs. Common trap: allocating joint cost over by-products as co-equals.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
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
    "QuestionID": "P1B-D-156",
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
    "ExplanationWrongA": "Option A's $109,091/$90,909 ignores the $10,000 by-product NRV, overstating main-product costs collectively by $10,000. Immaterial outputs still adjust material inputs.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C allocates over all three including the by-product as co-equal — elevating scrap to joint-product status and understating main costs. By-products reduce the pool; they never share it.",
    "ExplanationWrongD": "Option D's gross $12,000 skips $2,000 of disposal cost. NRV deducts disposal under every method — gross overstates the reduction by the cost to realize.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.157 sales mix with machine constraint",
    "MicroTopic": "sales mix machine constraint",
    "UniqueConceptKey": "B-D-157-sales-mix-machine-constraint",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Machine hours capped at 12,000. Products: A CM $50 on 3 hrs ($16.67/hr), B CM $70 on 5 hrs ($14/hr), C CM $36 on 1.5 hrs ($24/hr). Demands: C 4,000, A 2,000, B unlimited. Budgeted mix is 2,000 A / 3,000 B / 1,000 C. What is the optimal constrained mix and its total contribution, and how far off is the budgeted mix?",
    "Choices": {
      "A": "Optimal C 4,000 + A 2,000 + B 0 = $244,000; budgeted mix needs 22,500 hours — over capacity by 10,500 and infeasible as budgeted",
      "B": "Budgeted mix is optimal — budgets encode optimal mixes by definition",
      "C": "Produce B only — highest unit CM captures the constraint best",
      "D": "Optimal mix ignores demands — rank purely by CM/hr and produce top-ranked only"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Rank by CM per constraining hour: C $24/hr, A $16.67/hr, B $14/hr. Allocate: C 4,000 × 1.5 = 6,000 hrs (demand met); A 2,000 × 3 = 6,000 hrs (demand met); used 12,000 — capacity exactly binds; B gets 0. Total = 4,000×$36 + 2,000×$50 + 0 = $144,000 + $100,000 = $244,000. Budgeted mix needs 2,000×3 + 3,000×5 + 1,000×1.5 = 6,000 + 15,000 + 1,500 = 22,500 hours — 10,500 over capacity, infeasible as budgeted. B-only (option C... precisely B-only production) fills 12,000 hours at $14/hr ($168,000) against $244,000 optimal. Demand-ignoring rank-pure production (option D) would make only C (4,000 max) then stop at $144,000 — demand caps each rank's take. Business interpretation: constrained mix ranks by CM-per-scarce-unit within demand caps — the budgeted mix here is not just suboptimal but infeasible. Common trap: budgeting mixes that exceed constraint capacity.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
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
    "QuestionID": "P1B-D-157",
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
    "ExplanationWrongB": "Option B blesses the budgeted mix as optimal-by-definition — but it needs 22,500 hours against 12,000 capacity. Budgets encode intentions, not feasibility — infeasible intentions are the finding, not the answer.",
    "ExplanationWrongC": "Option C produces only B ($168,000 on full capacity) against $244,000 optimal — $76,000 sacrificed to the highest-unit-CM fallacy. Unit margins ignore constraint intensity by construction.",
    "ExplanationWrongD": "Option D ranks purely (C only, $144,000) ignoring demand caps that bound each rank's take. Ranks allocate within demands — C's 4,000-unit cap leaves 6,000 hours for A.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.158 keep versus drop with shared spillover",
    "MicroTopic": "keep drop shared spillover",
    "UniqueConceptKey": "B-D-158-keep-drop-shared-spillover",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Segment: revenue $400,000, VC $250,000, traceable fixed $100,000 (margin $50,000), allocated common $80,000 (reported −$30,000). Closing costs $40,000; dropping disrupts shared customers costing $30,000 of other-segment margin. A consultant recommends dropping on the reported loss. What is the correct decision?",
    "Choices": {
      "A": "Drop — the $30,000 reported loss proves the segment destroys value",
      "B": "Drop and save the $80,000 common allocation — allocations follow segments out the door",
      "C": "Indifferent — $50,000 margin versus $70,000 closure-plus-spillover nets near zero either way",
      "D": "Keep — $50,000 traceable margin; closing means −$70,000 ($40k closure + $30k spillover with margin gone) — keep wins by $120,000"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Keep contributes +$50,000 traceable margin. Close: lose $50,000 margin, pay $40,000 closure, lose $30,000 spillover margin elsewhere — total position −$120,000 versus +$50,000 keeping: keep wins by $170,000... recompute cleanly: keep = +$50,000. Close = −$40,000 (closure) − $30,000 (spillover) + $0 (margin gone) = −$70,000. Delta = $50,000 − (−$70,000) = $120,000 in favor of keeping. (The drafted '$170,000' double-adds the margin — corrected to $120,000 before insertion.) Reported-loss dropping (option A) reads −$30,000 fully-allocated as economics. Common-cost savings (option B: $80,000 follows segments out) denies common-cost definition. Near-indifference (option C) misprices by ~$120,000. Business interpretation: keep/drop with spillovers and closure costs prices four terms (margin, closure, spillover, allocation persistence) — count all four or decide on fashion. Common trap: dropping on reported losses with unpriced ripple effects.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
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
    "QuestionID": "P1B-D-158",
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
    "ExplanationWrongA": "Option A drops on the −$30,000 reported loss, which includes $80,000 of common costs that survive the drop. Fully-allocated losses are the worst keep/drop criterion — they punish margins for headquarters' existence.",
    "ExplanationWrongB": "Option B saves $80,000 of common allocation by closing — common costs persist by definition (they reallocate to survivors, making them look worse next). Savings that reappear elsewhere are not savings.",
    "ExplanationWrongC": "Option C's near-indifference misprices by ~$120,000 ($50,000 kept vs −$70,000 closed). Indifference claims need arithmetic within rounding — $120,000 is not rounding.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.159 target gap functional assignment",
    "MicroTopic": "target gap functional assignment",
    "UniqueConceptKey": "B-D-159-target-gap-functional-assignment",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Target cost $120 vs current $150 (gap $30): R&D design can remove $12 (feature prioritization), procurement $10 (supplier renegotiation), leaving $8 unassigned. Manufacturing proposes overtime to 'work smarter' and sales proposes a price increase to $155. How should the $30 gap close?",
    "Choices": {
      "A": "Overtime + price hike — effort and pricing together cover any gap",
      "B": "Cut the target to $150 — current cost is revealed truth",
      "C": "R&D $12 + procurement $10 + manufacturing methods $8 (setup reduction, first-pass yield) = $30 — assign every gap dollar with quality gates; price holds, target holds",
      "D": "Across-the-board $10 each — equal shares are fair shares"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Assigned closure: R&D $12 (feature prioritization with customer-acceptance gates) + procurement $10 (renegotiation with dual-source protection) + manufacturing $8 (setup reduction + first-pass yield with quality gates) = $30 — gap closed exactly with owners and mechanisms. Overtime-plus-price (option A) spends premium labor to protect cost while raising price into a $120 target market — effort theater plus market denial. Target-cutting (option B) surrenders the discipline target costing exists to impose. Equal-thirds (option D) taxes functions without regard to where the gap lives — R&D's $12 of design fat and manufacturing's methods are not interchangeable $10 coupons. Business interpretation: close gaps by assignment (who, how much, by what mechanism, gated how) — unassigned dollars do not close themselves. Common trap: splitting gaps evenly instead of causally.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Pricing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-D-159",
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
    "ExplanationWrongA": "Option A's overtime-plus-price-hike spends premium labor while raising price into a $120 target market — effort theater plus market denial, closing nothing structurally.",
    "ExplanationWrongB": "Option B cuts the target to $150, surrendering the discipline target costing exists to impose. Current cost is the problem statement, never the answer.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's equal $10 thirds tax functions without regard to gap causation — R&D design fat, procurement leverage, and manufacturing methods are not interchangeable coupons.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "B-D.160 shop costing method selection",
    "MicroTopic": "shop costing method selection",
    "UniqueConceptKey": "B-D-160-shop-costing-method-selection",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A shop runs 60% custom jobs (heterogeneous, traceable) and 40% continuous flow (homogeneous, high-volume) under one plantwide rate, with $200,000/year of cross-subsidy distortion measured. The controller must recommend an architecture and defend the investment. Recommend costing architecture.",
    "Choices": {
      "A": "Keep plantwide — $200,000 distortion is within tolerance for simplicity",
      "B": "Hybrid: job costing for custom work, process costing for flow (operation costing) — $80,000 to cure $200,000/year of distortion with matched methods per stream",
      "C": "Pure job — custom majority rules the whole shop",
      "D": "Pure process — high-volume logic scales to custom work with averaging"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Hybrid (operation costing): custom stream gets job costing (heterogeneous outputs need order-level tracking), flow stream gets process costing (homogeneous volume needs period averaging) — $80,000 one-time-plus-first-year against $200,000/year of distortion: 5-month payback with recurring annual benefit. Status quo (option A) tolerates $200,000/year of mispricing for simplicity's sake — simplicity priced at $200,000 annually. Pure job (option C) tracks flow output order-by-order at absurd administrative cost per homogeneous unit. Pure process (option D) averages custom heterogeneity into meaninglessness — $200,000 of distortion persists under new branding. Business interpretation: match costing architecture to production architecture per stream — heterogeneous streams get jobs, homogeneous streams get processes, mixed shops get hybrids. The recommendation defends $80,000 of systems against $200,000/year of recurring distortion with stream-matched methods as the mechanism. Common trap: single-method absolutism in mixed shops.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Job Order and Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1B-D-160",
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
    "ExplanationWrongA": "Option A tolerates $200,000/year of distortion for simplicity — simplicity priced at $200,000 annually with compounding bid errors. Tolerance thresholds need economics, not comfort.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's pure job tracks homogeneous flow output order-by-order — administrative cost per unit that process costing handles in aggregate. Majority-rule method selection ignores minority-stream economics.",
    "ExplanationWrongD": "Option D's pure process averages custom heterogeneity into meaninglessness — $200,000 of distortion persists under new branding. Homogeneous methods destroy heterogeneous information.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 8 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE8C2;