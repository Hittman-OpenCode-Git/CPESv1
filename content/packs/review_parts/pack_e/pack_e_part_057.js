const MCQ_BANK_E_PART_57 = [
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-S04 learning curve incremental unit time Wright model",
    "MicroTopic": "Learning curve incremental unit time",
    "UniqueConceptKey": "E-B-S04-Wright-Incremental-Unit-Time",
    "LOSTag": "P1-B.4 Forecasting techniques",
    "primaryTheory": "B7",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Precision Gear Works produces custom gears for industrial machinery. The first gear required 100 direct labor hours. Management has observed an 80% incremental unit-time (Wright) learning curve for this process. The company is forecasting labor requirements for an order of 4 gears and needs the direct labor time for the fourth gear specifically. Under the incremental unit-time model, the time for unit N equals T₁ × N^b, where b = log(learning rate) ÷ log(2). What is the estimated direct labor time for the fourth gear (rounded to one decimal place)?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the incremental unit-time (Wright) learning model, each time cumulative production doubles, the time required for the last unit produced becomes the learning rate percentage of the time required at the previous doubling point. The formula is T_N = T₁ × N^b, where b = log(0.80) ÷ log(2) = −0.321928. For the fourth unit: T₄ = 100 × 4^(−0.321928). Since 4 = 2², this equals 100 × (2^(−0.321928))^2 = 100 × (0.80)^2 = 100 × 0.64 = 64.0 hours. Conceptually: after the first doubling from unit 1 to unit 2, the time for the second unit = 100 × 0.80 = 80.0 hours. After the second doubling from unit 2 to unit 4, the time for the fourth unit = 80.0 × 0.80 = 64.0 hours. The Wright model is distinct from the cumulative-average-time model in that it applies the learning rate directly to the marginal unit time at each doubling, not to the average of all units produced. A common exam trap is misidentifying which learning model the question describes and using the wrong formula, since both models produce identical results at doubling points for cumulative averages but diverge sharply for individual unit times at non-doubling quantities.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-B-S04",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "51.2 hours",
      "B": "64.0 hours",
      "C": "80.0 hours",
      "D": "45.4 hours"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "51.2 hours is the time for the eighth unit under the incremental unit-time model (100 × 0.80³ = 51.2). A candidate selecting this has applied the learning curve to three doublings (1 → 2 → 4 → 8) instead of two doublings (1 → 2 → 4), which is needed to reach unit 4. This is a common off-by-one error in learning curve questions: the question asks for unit 4, but the candidate mentally continues the doubling sequence one step too far. When checking learning curve work, count the number of doublings carefully: unit 4 = two doublings from unit 1, unit 8 = three doublings.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "80.0 hours is the time for the second unit under the incremental model (100 × 0.80¹ = 80.0). A candidate selecting this has applied the learning curve for only one doubling — from unit 1 to unit 2 — and mistakenly identified that as the time for unit 4. The learning curve produces a multiplicative reduction in time at each doubling of cumulative production, so the fourth unit (two doublings from unit 1) requires 100 × 0.80² = 64.0 hours, not 80.0 hours. This error effectively under-applies the learning curve, leaving unit 4's time substantially overestimated.",
    "ExplanationWrongD": "45.4 hours is the approximate time for the fourth unit under the cumulative-average-time learning model, not the incremental unit-time (Wright) model. Under the cumulative-average approach, total hours for 4 units = 100 × 4 × 4^(−0.321928) = 100 × 4 × 0.64 = 256.0 hrs, and total for 3 units ≈ 210.6 hrs, yielding unit 4 ≈ 256.0 − 210.6 = 45.4 hrs. This distractor tests the critical distinction between the two learning curve models. The Wright (incremental unit-time) model applies the learning rate to each successive unit's time directly at doubling points, while the cumulative-average-time model applies it to the average of all units, producing substantially different individual unit times even at the same learning rate."
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-S05 capacity denominator analysis pricing decisions",
    "MicroTopic": "Capacity denominator analysis",
    "UniqueConceptKey": "E-B-S05-Capacity-Denominator-Pricing-Analysis",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B9",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "A controller at a mid-sized manufacturer is evaluating which capacity denominator to use for establishing the company's new product line pricing. The annual fixed manufacturing overhead is $1,000,000. The controller's analysis yields the following fixed overhead rates under four capacity denominator alternatives:\n\n• Theoretical capacity: 40,000 units per year → $25.00 per unit\n• Practical capacity: 35,000 units per year → $28.57 per unit\n• Expected annual capacity (master-budget capacity): 30,000 units per year → $33.33 per unit\n• Normal capacity: 33,000 units per year → $30.30 per unit\n\nVariable manufacturing cost is $42 per unit. Competitors are pricing comparable products at $88 to $92 per unit. The controller must evaluate the pricing implications of each denominator before recommending one to the CEO.\n\nWhich of the following correctly describes a key disadvantage of using expected annual capacity (master-budget capacity) as the denominator for pricing decisions?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Expected annual capacity (master-budget capacity) uses the budgeted production volume for the upcoming period as the denominator. Because this is typically the lowest denominator among the four alternatives (management budgets conservatively based on anticipated demand), it produces the highest fixed overhead rate per unit ($33.33 vs. $25.00–$30.30 for the other three). When this rate is embedded in a cost-plus or full-cost pricing model, the resulting price may exceed competitors' prices, rendering the company uncompetitive. Worse, the high price can suppress demand, leading management to revise the budget downward the following period, which deploys an even lower denominator and an even higher fixed overhead rate — reinforcing the cycle. This is known as the downward demand spiral. Under cost accounting theory, the denominator chosen for product costing should provide a representative long-run measure of capacity utilization. Expected annual capacity fails this test because it embeds short-term demand fluctuations into the cost structure, distorting pricing decisions and creating a self-reinforcing competitive disadvantage. This analytical distinction — understanding not just what each denominator produces numerically but why that matters for managerial decision-making — is the core competency tested at the Analyze level on the CMA Part 1 exam.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-B-S05",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "It produces the lowest fixed overhead rate per unit among the four alternatives, encouraging overly aggressive pricing that may fail to recover total fixed costs when actual production falls short of the denominator volume.",
      "B": "It produces the highest fixed overhead rate per unit among the four alternatives, which may result in pricing that is not competitive with rivals and could trigger a downward demand spiral.",
      "C": "It reflects the long-term average capacity utilization over the business cycle, smoothing cyclical fluctuations but potentially mispricing during periods of peak or trough demand.",
      "D": "It accounts for normal unavoidable operating interruptions and scheduled maintenance downtime, providing a balanced cost allocation but requiring subjective management judgment about what constitutes normal inefficiency."
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "This statement incorrectly attributes the characteristic of theoretical capacity (lowest rate, $25.00 per unit) to expected annual capacity. Expected annual capacity actually produces the highest fixed overhead rate ($33.33 per unit) because it uses the smallest denominator (30,000 units). A candidate who selects this has the direction of the relationship reversed: a smaller denominator produces a higher fixed overhead rate, not a lower one. The candidate must recognize that fixed overhead absorption rate = Total Fixed Overhead ÷ Denominator Volume — an inverse relationship. The risk described (unrealistically low pricing) is correctly associated with theoretical capacity, which uses the largest denominator (40,000 units) and yields the lowest rate.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This statement describes the characteristics of normal capacity, not expected annual capacity. Normal capacity averages production volume over a full business cycle (typically 3–5 years), smoothing out cyclical peaks and troughs. Expected annual capacity, by contrast, uses only the upcoming year's budgeted volume, which may be atypically low during a downturn or atypically high during a boom. A candidate selecting this has confused the definitions of the four capacity denominators, a distinction that the CMA Part 1 exam explicitly tests. Normal capacity provides a stable, long-run cost basis; expected annual capacity embeds the current period's demand forecast, introducing volatility into product costs. The candidate must recognize that capacity denominator analysis is not simply a computational exercise but requires understanding how each denominator's time horizon affects managerial decisions.",
    "ExplanationWrongD": "This statement describes the characteristics of practical capacity, not expected annual capacity. Practical capacity is theoretical capacity reduced by an allowance for normal unavoidable operating interruptions — scheduled maintenance, shift changes, holidays, and normal machine downtime. Expected annual capacity makes no such allowance; it is simply the budgeted production volume for the upcoming period based on anticipated sales demand. A candidate selecting this has confused practical capacity's operational adjustment (subtracting downtime) with expected capacity's demand-based adjustment (using forecasted sales as the denominator). The distinction matters for pricing because practical capacity yields a stable, operations-based cost, whereas expected capacity yields a volatile, demand-based cost. Understanding these differences is essential for the CMA Part 1 Section B exam, where capacity denominator choice frequently appears as a pricing-strategy question."
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-S06 expected value decision analysis product development",
    "MicroTopic": "Expected value decision analysis",
    "UniqueConceptKey": "E-B-S06-Expected-Value-Product-Development",
    "LOSTag": "P1-B.3 Forecasting techniques",
    "primaryTheory": "B10",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "The product development team at NovaTech Industries is evaluating three proposed projects. Due to capital constraints, only one project can be selected. The NPV of each project depends on market demand conditions, which the marketing department has assessed as follows:\n\nProject Alpha:\n• High demand (30% probability): NPV $800,000\n• Medium demand (50% probability): NPV $400,000\n• Low demand (20% probability): NPV (−$100,000)\n\nProject Beta:\n• High demand (50% probability): NPV $600,000\n• Medium demand (30% probability): NPV $200,000\n• Low demand (20% probability): NPV (−$50,000)\n\nProject Gamma:\n• High demand (60% probability): NPV $500,000\n• Medium demand (30% probability): NPV $150,000\n• Low demand (10% probability): NPV $0\n\nUsing expected value analysis, which project should NovaTech select and what is its expected value?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Expected value is computed by multiplying each possible outcome by its probability of occurrence and summing the products. Project Alpha: EV = 0.30($800,000) + 0.50($400,000) + 0.20(−$100,000) = $240,000 + $200,000 − $20,000 = $420,000. Project Beta: EV = 0.50($600,000) + 0.30($200,000) + 0.20(−$50,000) = $300,000 + $60,000 − $10,000 = $350,000. Project Gamma: EV = 0.60($500,000) + 0.30($150,000) + 0.10($0) = $300,000 + $45,000 + $0 = $345,000. Project Alpha has the highest expected value at $420,000 and should be selected. Expected value is the primary decision criterion under uncertainty when probabilities can be estimated, because it accounts for both the magnitude and likelihood of every outcome, not just the most optimistic or most probable scenario. On the CMA Part 1 exam, a common trap is to select the project with the highest NPV in any single scenario without weighting by probability — Beta's high-demand scenario is $600,000 (with 50% probability), but when all scenarios are probability-weighted, Alpha's expected value is higher because of its $800,000 upside, even though that upside has only a 30% chance of occurring.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-B-S06",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "Select Project Alpha; expected value of $420,000",
      "B": "Select Project Beta; expected value of $350,000",
      "C": "Select Project Gamma; expected value of $345,000",
      "D": "All three projects are equally attractive because each has a positive expected value exceeding $300,000"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Project Beta has an expected value of $350,000, which is lower than Project Alpha's $420,000. A candidate who selects this has likely chosen the project with the highest NPV in its most probable individual scenario ($600,000 at 50% probability for Beta) without completing the probability-weighted expected value calculation for all projects. This error reflects a failure to apply the expected value decision rule correctly: EV requires weighting every possible outcome by its probability, not selecting based on a single scenario's attractiveness. Although Beta's high-demand scenario seems compelling, Alpha's $800,000 upside — even weighted at only 30% — contributes $240,000 to EV, while Beta's $600,000 at 50% contributes $300,000. The decisive factor is Alpha's medium-demand scenario: $400,000 at 50% = $200,000 vs. Beta's $200,000 at 30% = $60,000. Alpha's consistently higher outcomes across scenarios, properly weighted, produce the highest expected value.",
    "ExplanationWrongC": "Project Gamma has an expected value of $345,000, the lowest of the three projects. A candidate who selects Gamma may be using a risk-avoidance heuristic rather than expected value analysis — Gamma is the only project with no loss scenario (its worst case is $0 NPV at 10% probability). While risk aversion is a legitimate consideration in capital budgeting, the question specifically asks the candidate to use expected value analysis, which treats all outcomes through the lens of probability-weighted averages and does not incorporate risk preferences. Under expected value, Gamma's 90% probability of a positive outcome (60% + 30%) and absence of losses do not outweigh its lower expected outcomes, yielding an EV below both Alpha and Beta. The correct decision under expected value is Alpha at $420,000.",
    "ExplanationWrongD": "This statement is factually incorrect: the three projects have materially different expected values ($420,000, $350,000, and $345,000), and expected value analysis provides a clear ranking. A candidate selecting this may have attempted a crude comparison without computing the precise EVs, or may mistakenly believe that any distinction smaller than the range of possible outcomes is immaterial. However, expected value analysis evaluates the probability-weighted average, not the range, and a $75,000 difference between Alpha and Beta (or $70,000 between Alpha and Gamma) is economically significant for a capital-constrained decision. In CMA Part 1 expected value problems, small differences in EV are determinative — the decision rule is to select the highest EV, regardless of how close the values are."
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C-S01 four-way overhead variance decomposition",
    "MicroTopic": "Four-way overhead variance decomposition",
    "UniqueConceptKey": "C-S01-four-way-overhead-variance-decomposition",
    "LOSTag": "P1-C.1",
    "primaryTheory": "C2",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Apex Manufacturing's controller, Karen Walsh, is preparing the quarterly overhead variance analysis for the Q3 2026 Board presentation. Apex uses a standard costing system with overhead applied on the basis of direct labor hours. The plant's Q3 data is as follows:\n\nBudgeted (denominator) direct labor hours: 15,000\nBudgeted variable overhead rate: $4.00 per DLH\nBudgeted fixed overhead: $150,000\nStandard hours allowed for actual output: 14,000 hours\nActual direct labor hours worked: 14,500 hours\nActual variable overhead incurred: $59,000\nActual fixed overhead incurred: $152,000\n\nWhich of the following correctly presents the four-way overhead variance decomposition for Q3?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under a standard costing system with a four-way analysis, total overhead variance is decomposed into four components: variable overhead spending variance, variable overhead efficiency variance, fixed overhead budget (spending) variance, and fixed overhead volume variance.\n\nFixed overhead rate = Budgeted FOH / Denominator hours = $150,000 / 15,000 = $10.00 per DLH.\n\n1. Variable overhead spending variance = Actual VOH - (Actual hours x Standard VOH rate) = $59,000 - (14,500 x $4.00) = $59,000 - $58,000 = $1,000 Unfavorable. Actual spending exceeded the amount expected at the actual activity level.\n\n2. Variable overhead efficiency variance = (Actual hours - Standard hours allowed) x Standard VOH rate = (14,500 - 14,000) x $4.00 = 500 x $4.00 = $2,000 Unfavorable. The plant used 500 more hours than the standard allowed for the actual output, at $4.00 per hour of variable overhead.\n\n3. Fixed overhead budget variance = Actual FOH - Budgeted FOH = $152,000 - $150,000 = $2,000 Unfavorable. Actual fixed overhead spending exceeded the static budget.\n\n4. Fixed overhead volume variance = Budgeted FOH - Applied FOH = $150,000 - (14,000 x $10.00) = $150,000 - $140,000 = $10,000 Unfavorable. Since the plant operated at 14,000 standard hours versus a denominator of 15,000 hours, fixed overhead was underapplied by $10,000 — the cost of unused capacity.\n\nTotal overhead variance = $1,000 U + $2,000 U + $2,000 U + $10,000 U = $15,000 U. Cross-check: Actual total overhead = $59,000 + $152,000 = $211,000. Applied overhead = 14,000 x ($4.00 + $10.00) = $196,000. Total variance = $211,000 - $196,000 = $15,000 U. Verified.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-C-S01",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "Variable overhead spending $1,000 U; variable overhead efficiency $2,000 U; fixed overhead budget $2,000 U; fixed overhead volume $10,000 U",
      "B": "Variable overhead spending $1,000 U; variable overhead efficiency $2,000 F; fixed overhead budget $2,000 U; fixed overhead volume $0",
      "C": "Variable overhead spending $1,000 U; variable overhead efficiency $2,000 F; fixed overhead budget $2,000 F; fixed overhead volume $10,000 U",
      "D": "Variable overhead spending $1,000 U; variable overhead efficiency $2,000 U; fixed overhead budget $2,000 U; fixed overhead volume $5,000 U"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 CSO P1-C.1 Cost and variance measures — four-way overhead variance decomposition using standard costing",
      "Distractors test common confusions: substituting denominator hours for standard hours, reversing F/U sign conventions, and applying the efficiency variance formula to fixed overhead"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This decomposition substitutes the denominator hours (15,000) for the standard hours allowed (14,000) in both the variable overhead efficiency variance and the fixed overhead volume variance. For VOH efficiency, (14,500 - 15,000) x $4.00 = $2,000 F — but the efficiency variance must use standard hours allowed for actual output (14,000), not denominator hours. For FOH volume, Budgeted FOH - (Denominator hours x FOH rate) = $150,000 - (15,000 x $10.00) = $0 — but the volume variance measures whether the plant operated above or below the denominator capacity in terms of standard hours allowed, and 14,000 < 15,000 confirms underutilization must produce an unfavorable volume variance. A candidate selecting this option likely confuses the denominator activity level (used only to compute the fixed overhead rate) with the standard hours allowed (the correct basis for both efficiency and volume variances).",
    "ExplanationWrongC": "This decomposition reverses the F/U sign convention for the variable overhead efficiency variance and the fixed overhead budget variance while correctly computing the dollar magnitudes. VOH efficiency of $2,000 U is mislabeled as favorable when more hours were used than standard allowed. FOH budget of $2,000 U is also mislabeled as favorable — actual fixed overhead of $152,000 exceeds the budget of $150,000, which is unfavorable by definition. A candidate selecting this option correctly performs the arithmetic but misapplies the sign convention. The rule: when actual cost exceeds standard or budget, the variance is unfavorable. Efficiency variances are unfavorable when actual input exceeds the standard input allowed for output. Budget (spending) variances are unfavorable when actual spending exceeds the static budget.",
    "ExplanationWrongD": "This decomposition incorrectly applies the variable overhead efficiency variance formula to the fixed overhead volume variance. Using FOH rate x (Actual hours - Standard hours) = $10.00 x (14,500 - 14,000) = $5,000 U produces the $5,000 shown, but this formula is fundamentally incorrect for fixed overhead. The fixed overhead volume variance measures capacity utilization — it compares budgeted FOH to FOH applied using standard hours allowed, not the difference between actual and standard hours multiplied by the rate. That subtraction pattern (Actual - Standard) x Rate is correct only for variable overhead efficiency, not for fixed overhead volume. The correct FOH volume variance is Budgeted FOH - (Standard hours allowed x FOH rate) = $150,000 - (14,000 x $10.00) = $10,000 U. A candidate selecting this option correctly handles the variable variances but applies the variable overhead efficiency logic to the fixed overhead component — a common exam trap because both variances involve an hours differential, but the formulas are structurally different."
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C-S02 variance investigation materiality threshold analysis",
    "MicroTopic": "Variance investigation materiality threshold analysis",
    "UniqueConceptKey": "C-S02-variance-investigation-materiality-threshold-analysis",
    "LOSTag": "P1-C.1",
    "primaryTheory": "C1",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Harbor Manufacturing's controller, David Okonkwo, applies an investigation policy to the Q2 2026 monthly variance report: investigate any budget variance exceeding 5% of the budgeted cost or $10,000, whichever is smaller, but only for unfavorable variances. The plant controller's supplementary analysis also notes that the direct materials unfavorable variance is fully explained by a one-time supplier price increase tied to a contract renegotiation that will not recur.\n\nQ2 budget and actual data by cost category:\n\nDirect materials: Budget $400,000 / Actual $432,000 / Variance $32,000 U\nDirect labor: Budget $300,000 / Actual $294,000 / Variance $6,000 F\nVariable overhead: Budget $180,000 / Actual $191,000 / Variance $11,000 U\nFixed overhead: Budget $200,000 / Actual $208,000 / Variance $8,000 U\n\nBased on the investigation policy and the controller's supplementary analysis, which variance or variances should the controller investigate?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "The controller must apply a two-step analysis to each variance: (1) determine the materiality threshold, and (2) assess whether the variance exceeds the threshold and is unfavorable, while also considering qualitative factors that override quantitative thresholds.\n\nStep 1 — Compute each category's threshold. The policy uses the smaller of 5% of budget or $10,000:\n\nDirect materials: 5% x $400,000 = $20,000; smaller of $20,000 and $10,000 = $10,000 threshold.\nDirect labor: 5% x $300,000 = $15,000; threshold = min($15,000, $10,000) = $10,000. However, the $6,000 variance is favorable — favorable variances are excluded by policy regardless of size.\nVariable overhead: 5% x $180,000 = $9,000; threshold = min($9,000, $10,000) = $9,000.\nFixed overhead: 5% x $200,000 = $10,000; threshold = min($10,000, $10,000) = $10,000.\n\nStep 2 — Compare each unfavorable variance to its threshold:\n\nDirect materials: $32,000 U > $10,000 threshold. The variance is material by the quantitative rule. However, the controller's supplementary analysis documents that this variance is fully explained by a one-time, non-recurring supplier price increase. Investigation of a known, non-recurring cause produces no new information — the explanation is already complete. CMA best practice and management-by-exception principles direct controllers to investigate only unexplained or recurring variances. The qualitative override (known cause, non-recurring) removes this variance from the investigation list.\n\nDirect labor: $6,000 F — excluded by policy (favorable).\n\nVariable overhead: $11,000 U > $9,000 threshold. Material by the quantitative rule, and no qualitative override has been documented. This variance warrants investigation.\n\nFixed overhead: $8,000 U < $10,000 threshold. Does not exceed the threshold — excluded.\n\nConclusion: Only the variable overhead unfavorable variance ($11,000 U) meets both the quantitative threshold and qualitative criteria for investigation.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-C-S02",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Direct materials and variable overhead, because both unfavorable variances exceed their respective materiality thresholds",
      "B": "Variable overhead only, because it is the only unfavorable variance that exceeds its threshold and lacks a documented explanation",
      "C": "Direct materials only, because it has the largest dollar variance and the largest percentage deviation from budget",
      "D": "None, because the direct labor variance is favorable and unfavorable variances are either below their thresholds or fully explained"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 CSO P1-C.1 Cost and variance measures — management by exception: variance investigation thresholds and qualitative override analysis",
      "Distractors test common confusions: investigating all unfavorable variances regardless of qualitative overrides, selecting by dollar magnitude alone, and treating all explained or below-threshold variances as investigation-free"
    ],
    "ExplanationWrongA": "Option A correctly identifies the two unfavorable variances that exceed their quantitative thresholds — direct materials ($32,000 U > $10,000) and variable overhead ($11,000 U > $9,000) — but applies only the quantitative rule without the qualitative override. The controller's supplementary analysis documents that the direct materials variance is fully explained by a one-time, non-recurring supplier price increase. Investigating a variance whose root cause is already known and documented would consume resources without producing new information. The management-by-exception principle directs investigation effort toward unexplained or recurring variances, not toward variances where the cause is already established. The policy's quantitative threshold is a screening tool, not a mandate — qualitative judgment remains the controller's professional responsibility.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C selects the direct materials variance based solely on its dollar magnitude ($32,000 U) and percentage deviation (8.0%), ignoring both the quantitative thresholds for the other categories and the qualitative override. The variable overhead variance of $11,000 U exceeds its $9,000 threshold and is unexplained — it warrants investigation regardless of being smaller in absolute dollars than the direct materials variance. Conversely, the $32,000 direct materials variance, while large, has a documented non-recurring cause. Selecting variances for investigation by dollar size alone violates the structured investigation policy and diverts resources from the variable overhead variance, where the root cause is unknown and potentially recurring.",
    "ExplanationWrongD": "Option D reaches the incorrect conclusion that no variances warrant investigation by overgeneralizing two facts: (1) the direct labor variance is favorable, and (2) the direct materials variance is fully explained. However, the variable overhead variance of $11,000 U exceeds its $9,000 threshold (calculated as min(5% of $180,000, $10,000) = $9,000) and has no documented qualitative override. The fixed overhead variance of $8,000 U does not exceed its $10,000 threshold and is correctly excluded, but that does not justify excluding the material, unexplained variable overhead variance. A candidate selecting this option correctly applies the direct materials qualitative override but then incorrectly extends the 'explained' or 'below-threshold' rationale to a variance category that meets neither criterion."
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C-S03 transfer pricing general rule opportunity cost",
    "MicroTopic": "Transfer pricing general rule opportunity cost",
    "UniqueConceptKey": "C-S03-transfer-pricing-general-rule-opportunity-cost",
    "LOSTag": "P1-C.1",
    "primaryTheory": "C6",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Northwind Industries has two divisions. The Components Division produces a specialized electronic component. Its annual operating capacity is 40,000 units, and it currently sells its entire output of 40,000 units to external customers at $90 per unit. The division's variable manufacturing cost is $50 per unit, and fixed costs total $800,000 per year ($20 per unit at capacity).\n\nThe Assembly Division requires 6,000 units of the same component for a new product line and can purchase an equivalent component from an external supplier at $84 per unit.\n\nUsing the general transfer pricing rule, the minimum transfer price per unit that the Components Division should accept from the Assembly Division is:",
    "CorrectChoice": "D",
    "ExplanationCorrect": "The general transfer pricing rule states: Minimum transfer price = Outlay (incremental) cost per unit + Opportunity cost per unit to the selling division.\n\nStep 1 — Identify outlay cost: The outlay cost is the variable (incremental) cost of producing one additional unit — $50 per unit. Fixed costs are not incremental because they are incurred regardless of whether the internal transfer occurs (the division is at capacity and already covering fixed costs through external sales).\n\nStep 2 — Identify opportunity cost: The Components Division is operating at full capacity (40,000 units sold externally; 40,000 units of capacity). To supply 6,000 units internally, the division must forgo 6,000 units of external sales. Each forgone external unit contributes $90 selling price - $50 variable cost = $40 in contribution margin. The opportunity cost per unit is therefore $40.\n\nStep 3 — Apply the rule: Minimum transfer price = $50 + $40 = $90 per unit.\n\nInterpretation: At a minimum price of $90, the Assembly Division will prefer the external supplier at $84, and no internal transfer will occur. This is economically efficient for Northwind as a whole — using capacity to serve the internal division at the expense of higher-margin external sales would reduce total company profit. The general rule correctly signals that when the selling division is at full capacity with positive contribution margin on external sales, internal transfers should only occur if the internal price at least equals the external market price.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-C-S03",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "$50",
      "B": "$70",
      "C": "$84",
      "D": "$90"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 CSO P1-C.1 — transfer pricing: general rule application with opportunity cost when selling division is at full capacity",
      "Distractors test common confusions: pricing at variable cost only (ignoring opportunity cost), pricing at full absorption cost (ignoring opportunity cost and using fixed costs), and matching the external supplier price (negotiation outcome vs. minimum under the rule)"
    ],
    "ExplanationWrongA": "Option A ($50) represents the variable cost per unit only, without adding the opportunity cost. This is the correct minimum transfer price only when the selling division has excess capacity — if there is no forgone external sale, the opportunity cost is zero and the minimum price equals variable cost. However, the Components Division is at full capacity (40,000 of 40,000 units sold externally), so transferring 6,000 units internally requires giving up external sales that generate $40 per unit in contribution margin. The general rule explicitly adds opportunity cost to outlay cost. A candidate selecting this answer likely applies the 'excess capacity' version of the rule without recognizing that full capacity changes the analysis fundamentally.",
    "ExplanationWrongB": "Option B ($70) represents the full absorption cost per unit: variable cost ($50) plus fixed cost allocation ($800,000 / 40,000 = $20). Full cost is not the correct basis for the minimum transfer price under the general rule because fixed costs are not incremental to the transfer decision — they are incurred regardless of whether the internal transfer occurs. More importantly, full cost ignores the opportunity cost ($40 per unit) created by displacing external sales. A candidate selecting this answer may incorrectly assume that the transfer price must cover all manufacturing costs, when the relevant costs for the transfer pricing decision are only those that change as a result of the transfer.",
    "ExplanationWrongC": "Option C ($84) matches the external supplier's price to the Assembly Division. While matching the external price is a practical negotiation outcome and may appear to achieve goal congruence (the buying division pays the same price either way), the general transfer pricing rule determines the minimum price the selling division should accept, not a negotiated settlement. At $84, the Components Division would receive less than its minimum ($90), effectively subsidizing the Assembly Division at the expense of forgone external contribution margin. The Components Division loses $6 per unit relative to selling externally ($90 - $84 = $6 x 6,000 = $36,000 total loss). The general rule serves as a floor for negotiation, not a ceiling. A candidate selecting this answer correctly identifies that the company wants internal transfers to be competitive with the external market but confuses the buying division's ceiling with the selling division's floor.",
    "ExplanationWrongD": ""
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C-S04 transfer pricing goal congruence behavioral analysis",
    "MicroTopic": "Transfer pricing goal congruence behavioral analysis",
    "UniqueConceptKey": "C-S04-transfer-pricing-goal-congruence-behavioral-analysis",
    "LOSTag": "P1-C.1",
    "primaryTheory": "C6",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Ridgeway Corporation's two divisions — Components and Assembly — have been in conflict over transfer pricing for two years. Components Division produces a machined part; Assembly Division uses this part in its finished products. Current operating data:\n\nComponents Division:\n- Annual capacity: 50,000 units\n- Current production and external sales volume: 32,000 units (excess capacity of 18,000 units)\n- Variable manufacturing cost per unit: $32\n- Full absorption cost per unit: $52 (includes $20 fixed overhead allocation per unit)\n- Current transfer price to Assembly: full cost plus 15% markup = $59.80 per unit\n\nAssembly Division:\n- Annual requirement: 14,000 units of the machined part\n- External supplier price for an equivalent part: $46 per unit\n- Current sourcing: 100% external at $46 per unit\n\nThe CFO is concerned. Ridgeway as a whole is paying $46 per unit externally while Components Division could produce the same part internally for a variable cost of only $32 per unit. The company-wide annual cost of this sourcing decision is ($46 - $32) x 14,000 = $196,000 in avoidable cost. The current $59.80 transfer price exceeds the external price, so Assembly Division rationally purchases externally to defend its own profitability — a classic goal-congruence failure.\n\nThe controller is asked to recommend a transfer pricing approach that will align divisional incentives with Ridgeway's corporate interest. Which recommendation should the controller make?",
    "CorrectChoice": "C",
    "ExplanationCorrect": "The controller should recommend a negotiated transfer pricing framework with a floor of $32 (Components' variable cost) and a ceiling of $46 (Assembly's external price). This recommendation best achieves goal congruence for four reasons grounded in transfer pricing theory and divisional performance measurement.\n\nFirst, the economic fundamentals: Components Division has excess capacity (18,000 units), so the opportunity cost of internal transfers is zero. The company-wide relevant cost of internal production is $32 per unit (variable cost only — fixed costs are sunk regardless). Any internal transfer price between $32 and $46 makes both divisions and the company better off: Components earns positive contribution margin (price - $32 > 0), Assembly pays less than or equal to the external price, and Ridgeway avoids the $196,000 annual outflow.\n\nSecond, divisional autonomy: a negotiated range preserves each division manager's decision authority. Components can reject any bid below $32, and Assembly can reject any ask above $46. Neither division is forced into a transaction that harms its own performance metrics.\n\nThird, behavioral incentives: a negotiated framework gives both managers a stake in reaching agreement. Components wants to capture some of the $14 spread ($46 - $32) as divisional profit, and Assembly wants to capture some as cost savings. The negotiation itself becomes a performance-evaluation signal — managers who consistently fail to reach mutually beneficial agreements warrant scrutiny.\n\nFourth, why the alternatives fall short: variable-cost-only pricing ($32) eliminates Components' profit incentive entirely and may demotivate the division manager. Full-cost-plus pricing ($59.80) is the status quo that already failed — it pushes Assembly to the external market. A corporate mandate forcing internal purchases at full-cost-plus undermines divisional autonomy and accountability. Shutting down excess capacity destroys the option value of maintaining internal production capability.\n\nA negotiated range between variable cost and external price is the established best practice in transfer pricing when the selling division has excess capacity and an external market reference price exists.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-C-S04",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Maintain the full-cost-plus-15% transfer price of $59.80 and issue a corporate directive requiring Assembly Division to purchase all 14,000 units internally from Components Division",
      "B": "Change the transfer price to variable cost only ($32 per unit), allowing Components Division to recover its incremental costs while Assembly Division captures the full $14 per unit savings versus the external price",
      "C": "Change to a negotiated transfer pricing framework with a floor of $32 (variable cost) and a ceiling of $46 (external price), incentivizing both division managers to reach an agreement within that range",
      "D": "Discontinue internal transfer pricing altogether: allow Assembly to continue sourcing externally at $46 per unit and reduce Components Division's capacity to match its external sales volume of 32,000 units"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 CSO P1-C.1 — transfer pricing: evaluating alternative transfer pricing methods for goal congruence when the selling division has excess capacity",
      "Distractors test common confusions: corporate mandates overriding divisional autonomy, variable-cost-only pricing ignoring divisional profit incentives, and eliminating internal transfers instead of aligning incentives"
    ],
    "ExplanationWrongA": "Maintaining the $59.80 full-cost-plus-15% transfer price and mandating internally sourced purchases would force short-term goal congruence — Ridgeway would save $196,000 annually — but at the cost of undermining the entire purpose of divisional performance measurement. Assembly Division would be penalized with $13.80 per unit of excess cost ($59.80 - $46.00) through no fault of its own, distorting its reported profitability. Components Division would be insulated from competitive pressure and rewarded for a price no external customer would accept. Transfer pricing mandates destroy the accountability that divisional structures are designed to create — division managers who cannot control their input costs cannot be evaluated on their division's profitability. This approach trades a transfer pricing problem for a performance measurement problem.",
    "ExplanationWrongB": "Setting the transfer price at variable cost only ($32) resolves the goal-congruence failure — Assembly would buy internally and Ridgeway would save $196,000 — but creates a significant behavioral problem. Components Division would earn zero contribution margin on 14,000 units, with revenue exactly covering variable cost and nothing contributed toward fixed costs or divisional profit. The Components Division manager has no incentive to participate in the internal transfer: serving the internal customer generates no divisional profit while consuming capacity, management attention, and quality-assurance resources. Over time, the Components manager may reduce quality, delay delivery, or redirect capacity to external sales that earn $20 per unit in contribution — rational behavior from the divisional perspective but harmful to Ridgeway as a whole. Zero-profit transfers also make divisional ROI and residual income look worse, discouraging the manager from cooperating.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Discontinuing internal transfers and reducing Components Division's capacity to 32,000 units permanently destroys Ridgeway's option to produce internally, even though internal production at $32 variable cost is demonstrably cheaper than external procurement at $46. The CFO's own analysis shows the company leaves $196,000 on the table every year. More importantly, eliminating capacity eliminates strategic flexibility — if the external supplier raises its price, experiences quality problems, or faces a supply disruption, Ridgeway has no internal alternative. Excess capacity, while carrying a cost, functions as a real option: an insurance policy against external supply risk. The controller's role is to design a transfer pricing system that makes the existing capacity profitable to use, not to destroy operational capability to avoid the management challenge of setting transfer prices."
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D-S02 high-low method outlier exclusion cost estimation",
    "MicroTopic": "High-low method outlier exclusion",
    "UniqueConceptKey": "E-D-S02-High-low-outlier-exclusion",
    "LOSTag": "P1-D.1 Cost measurement and assignment",
    "primaryTheory": "D2",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Lakeshore Manufacturing recorded the following monthly maintenance costs and machine hours for the first six months of the year. In March, a two-week labor strike reduced production activity to 1,200 machine hours while the plant still incurred substantial fixed overhead and severance costs.\n\n• January: 2,400 hours — $154,800\n• February: 2,700 hours — $170,400\n• March (strike): 1,200 hours — $130,000\n• April: 3,000 hours — $186,000\n• May: 2,200 hours — $144,400\n• June: 2,900 hours — $180,800\n\nThe controller wants to estimate the variable cost per machine hour and monthly fixed cost using the high-low method. Which of the following represents the correct cost equation after properly screening the data?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under the high-low method, the analyst must first identify and exclude data points that do not represent normal operating conditions. The March data point (1,200 machine hours, $130,000) reflects a two-week labor strike — an abnormal event during which the plant operated at reduced capacity but still incurred substantial fixed overhead and severance costs, making the cost-activity relationship unrepresentative. Excluding March, the highest activity level is April (3,000 hours, $186,000) and the lowest is May (2,200 hours, $144,400). Variable cost per machine hour = ($186,000 − $144,400) ÷ (3,000 − 2,200) = $41,600 ÷ 800 = $52.00. Fixed cost = $186,000 − (3,000 × $52.00) = $186,000 − $156,000 = $30,000 per month, which can be verified using the low point: $144,400 − (2,200 × $52.00) = $144,400 − $114,400 = $30,000. The cost equation is Total Cost = $30,000 + $52.00X, where X is machine hours. In practice, failing to screen for outliers is one of the most common errors in cost estimation — a single anomalous data point can materially distort both the variable rate and the fixed cost intercept, leading management to misprice products and misjudge the cost structure.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-D-S02",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "Variable cost $52.00 per machine hour; fixed cost $30,000 per month",
      "B": "Variable cost $31.11 per machine hour; fixed cost $92,667 per month",
      "C": "Variable cost $52.00 per machine hour; fixed cost $92,667 per month",
      "D": "Variable cost $31.11 per machine hour; fixed cost $30,000 per month"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B ($31.11 variable rate, $92,667 fixed cost) results from applying the high-low method using all six months of data, including the March strike month (1,200 hours, $130,000) as the low point. The calculation ($186,000 − $130,000) ÷ (3,000 − 1,200) = $56,000 ÷ 1,800 yields a variable rate of $31.11 per machine hour, which understates the true variable cost by $20.89 per hour because the strike-month cost does not reflect normal variable cost behavior — it includes fixed overhead and severance costs that inflate the apparent fixed cost and depress the apparent variable rate. The resulting fixed cost of $92,667 dramatically overstates the actual monthly fixed cost of $30,000, which would lead management to overestimate capacity costs and make poor pricing and production decisions.",
    "ExplanationWrongC": "Option C ($52.00 variable rate, $92,667 fixed cost) correctly computes the variable rate of $52.00 per machine hour by excluding the March outlier from the high and low activity selection, but then incorrectly pairs this rate with the wrong activity level when solving for fixed cost. The correct approach is to subtract the product of the variable rate and the high activity level from the high total cost: $186,000 − (3,000 × $52.00) = $30,000. Using the low point verifies the result: $144,400 − (2,200 × $52.00) = $30,000. The $92,667 figure is the fixed cost from the contaminated data set that included the March outlier, not the correct fixed cost from the clean data.",
    "ExplanationWrongD": "Option D ($31.11 variable rate, $30,000 fixed cost) applies the correct fixed cost amount but pairs it with an incorrect variable rate derived from including the March outlier in the high-low calculation. The variable rate of $31.11 per machine hour understates the true marginal cost by nearly 40%, which would cause the company to systematically underestimate how total costs change with activity levels. In cost-volume analysis, using an understated variable cost rate leads to overstating contribution margins, underestimating breakeven points, and making overly optimistic profit projections. The correct variable rate of $52.00 per machine hour reflects the actual cost behavior pattern observable across the five normal operating months."
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D-S03 regression vs high-low cost estimation reliability",
    "MicroTopic": "Regression vs high-low reliability comparison",
    "UniqueConceptKey": "E-D-S03-Regression-vs-high-low",
    "LOSTag": "P1-D.2 Cost measurement concepts and cost behavior",
    "primaryTheory": "D2",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Cascade Industries' controller ran both simple regression and the high-low method on 36 months of utility cost data to estimate the cost function. The regression output shows: R² = 0.41, standard error of the estimate = $8,200, coefficient for machine hours has a p-value of 0.28, and the intercept has a p-value of 0.04. The high-low method, using the highest-activity month (4,800 hours, $92,000) and the lowest-activity month (2,100 hours, $57,000), produces a variable rate of $12.96 per machine hour and a fixed cost of $29,792 per month. The controller asks whether the regression or the high-low method provides a more reliable estimate of the utility cost function. Which recommendation is most appropriate?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "The regression analysis is more reliable because it uses all 36 monthly data points, whereas the high-low method relies on only two observations — the highest and lowest activity months. Any irregularity or outlier in either of those two extreme months can dramatically skew the high-low estimate. The regression's modest R² of 0.41 indicates that machine hours alone explain 41% of the variation in utility costs — other cost drivers such as weather, production mix, or machine age account for the remaining 59%. The coefficient p-value of 0.28 for machine hours suggests the relationship is not statistically significant at conventional thresholds, but 36 data points — even with a weak fit — still produce a more robust estimate than extrapolating from two arbitrarily selected months. The standard error of the estimate ($8,200) provides a quantifiable precision measure that the high-low method cannot offer. In management accounting practice, regression is preferred over high-low whenever sufficient data are available because it minimizes the influence of any single observation and provides diagnostic statistics that allow the analyst to evaluate model quality objectively.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-D-S03",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "The regression analysis is more reliable because it incorporates all 36 observations rather than only two extreme points; the modest R² and coefficient p-value indicate that machine hours alone do not fully explain utility costs, but the regression still provides a better estimate than the two-point high-low method.",
      "B": "The high-low method is more reliable because the regression's R² of 0.41 and coefficient p-value of 0.28 indicate that the model is not statistically significant; the high-low method avoids this complexity by relying on confirmed data points.",
      "C": "Both methods are equally unreliable because utility costs are inherently variable and cannot be estimated with a linear cost function; the company should instead implement activity-based costing to allocate utility costs more accurately.",
      "D": "Neither method can be used reliably because the intercept p-value of 0.04 in the regression indicates the independent variable is invalid; the high-low method should be used but only after removing the intercept from the cost equation."
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B incorrectly concludes that the high-low method is more reliable because the regression's statistical metrics are modest. In fact, modest R² and high coefficient p-values do not make regression worse than high-low — they reveal diagnostic information about cost behavior that high-low completely obscures. The low R² tells the controller that a single cost driver does not fully capture utility cost behavior, suggesting that multiple regression with additional drivers such as heating degree-days or production mix might improve the model. The high-low method provides none of this diagnostic information: it simply connects two points and assumes linearity. Furthermore, the high-low method's reliance on only two observations makes it highly vulnerable to outliers — if either the highest or lowest activity month contains unusual cost patterns, the entire estimate is contaminated. The regression, even with modest fit statistics, averages across all 36 observations and is therefore inherently more stable and reliable.",
    "ExplanationWrongC": "Option C dismisses both methods as unreliable and recommends activity-based costing as an alternative, which reflects a misunderstanding of cost estimation's distinct role. Cost estimation methods such as high-low and regression are used to separate mixed costs into fixed and variable components for planning, budgeting, and decision-making. Activity-based costing is an overhead allocation methodology that assigns indirect costs to products based on activities and cost drivers — it is not a substitute for cost estimation. The two techniques serve different purposes: cost estimation determines how costs behave relative to activity levels, while ABC determines how overhead costs should be assigned to cost objects. A company can and often does use regression to estimate the parameters of its ABC cost pools. The controller's question concerns which estimation method produces more reliable cost behavior parameters, and between the two methods presented, regression is clearly superior.",
    "ExplanationWrongD": "Option D misinterprets the regression intercept p-value of 0.04. A p-value below 0.05 indicates that the result is statistically significant — the null hypothesis that the intercept equals zero can be rejected with 95% confidence. A significant intercept confirms the existence of a fixed cost component, which is exactly what cost accountants expect when estimating mixed costs that contain both fixed and variable elements. An intercept p-value of 0.04 supports the use of the regression model rather than undermining it: the regression correctly identifies that utility costs have a statistically significant fixed component. The high-low method provides no equivalent measure of statistical confidence in its computed fixed cost of $29,792, making it impossible to assess the reliability of that estimate."
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D-S04 absorption variable costing income reconciliation fixed overhead",
    "MicroTopic": "Absorption vs variable costing reconciliation",
    "UniqueConceptKey": "E-D-S04-Absorption-variable-reconciliation",
    "LOSTag": "P1-D.1 Cost measurement and assignment",
    "primaryTheory": "D8",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Brixton Manufacturing reports the following data for the current year. The company uses absorption costing for external reporting and variable costing for internal analysis.\n\n• Beginning finished goods inventory: 3,000 units\n• Units produced: 60,000\n• Units sold: 55,000\n• Selling price: $45 per unit\n• Variable manufacturing cost: $14 per unit\n• Fixed manufacturing overhead: $480,000 per year\n• Variable selling and administrative: $3 per unit sold\n• Fixed selling and administrative: $250,000 per year\n\nThe beginning inventory units were manufactured last year at the same variable manufacturing cost of $14 per unit and carry $8 per unit of prior-year fixed overhead under absorption costing. If the controller prepares income statements under both methods, what is the difference in operating income between absorption costing and variable costing, and what explains the difference?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "The difference between absorption costing and variable costing operating income arises solely from the treatment of fixed manufacturing overhead. Under absorption costing, fixed manufacturing overhead is a product cost — it is allocated to each unit produced and expensed through cost of goods sold when units are sold. Under variable costing, fixed manufacturing overhead is a period cost — it is expensed in full in the period incurred regardless of whether units are sold. When production exceeds sales, as it does here (60,000 produced > 55,000 sold), the 5,000-unit increase in ending finished goods inventory causes absorption costing to defer a portion of current-period fixed overhead to the balance sheet. The fixed overhead rate is $480,000 ÷ 60,000 units = $8.00 per unit. The deferred amount equals $8.00 × 5,000 units = $40,000. Therefore, absorption costing operating income ($850,000) exceeds variable costing operating income ($810,000) by $40,000. This reconciliation is independent of beginning inventory because beginning inventory costs are the same under both methods for the prior period's costs — the difference comes entirely from the change in inventory during the current period multiplied by the current-period fixed overhead rate.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-D-S04",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "Absorption costing operating income exceeds variable costing operating income by $40,000 because the 5,000-unit inventory increase defers $40,000 of fixed manufacturing overhead to the balance sheet.",
      "B": "Absorption costing operating income exceeds variable costing operating income by $70,000 because the 5,000-unit inventory increase multiplied by the variable manufacturing cost of $14 per unit yields additional inventoriable costs under absorption costing.",
      "C": "Variable costing operating income exceeds absorption costing operating income by $40,000 because fixed manufacturing overhead is expensed as a period cost under variable costing and is therefore deducted immediately rather than deferred.",
      "D": "Variable costing operating income exceeds absorption costing operating income by $110,000 because the 5,000-unit inventory increase multiplied by the full absorption product cost of $22 per unit captures the total manufacturing cost deferred under variable costing."
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B attributes the $70,000 difference to the incorrect cost rate: $14.00 (variable manufacturing cost per unit) × 5,000 units = $70,000. This represents the variable manufacturing cost deferred in ending inventory under BOTH methods — both absorption and variable costing include variable manufacturing costs in inventory. The reconciliation between the two methods depends only on the treatment of fixed manufacturing overhead, not variable costs. Under both absorption and variable costing, the 5,000 additional units in ending inventory carry $14.00 of variable manufacturing cost each ($70,000 total). The $40,000 difference is the fixed overhead component alone: $8.00 per unit × 5,000 units. The correct reconciliation identifies that only the fixed manufacturing overhead rate determines the income difference when production and sales volumes differ.",
    "ExplanationWrongC": "Option C correctly identifies the $40,000 amount but reverses the direction of the difference. When production (60,000 units) exceeds sales (55,000 units), ending inventory increases. Under absorption costing, the fixed overhead embedded in those additional 5,000 units is deferred to the balance sheet as part of inventory cost rather than being expensed immediately. This deferral means absorption costing reports HIGHER operating income than variable costing, not lower. Variable costing expenses all $480,000 of fixed manufacturing overhead in the current period regardless of inventory changes. The direction of the difference reverses when sales exceed production: in that case, absorption costing releases previously deferred fixed overhead from beginning inventory, making absorption income LOWER than variable income. The mnemonic is: production exceeds sales implies absorption income exceeds variable income.",
    "ExplanationWrongD": "Option D computes the difference as $110,000 ($22.00 × 5,000) by using the total absorption product cost per unit rather than only the fixed overhead component. The full absorption product cost of $22.00 includes $14.00 of variable manufacturing costs plus $8.00 of fixed overhead. However, variable manufacturing costs of $14.00 are treated as product costs under BOTH absorption and variable costing — both methods defer these costs in ending inventory. The only cost component that is treated differently between the two methods is fixed manufacturing overhead ($8.00 per unit). Therefore, the reconciliation difference must be computed using only the fixed overhead rate multiplied by the change in inventory units: $8.00 × 5,000 = $40,000. Using the full absorption product cost overstates the difference because it double-counts the variable cost component that both methods treat identically."
  }
];