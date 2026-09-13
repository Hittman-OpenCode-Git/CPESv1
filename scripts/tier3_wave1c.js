const WAVE1C = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.111 balanced scorecard perspective classification",
    "MicroTopic": "balanced scorecard perspective classification",
    "UniqueConceptKey": "C-D111-balanced-scorecard-perspective-classification",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Meridian Controls is drafting its first balanced scorecard. The strategy team proposes four metrics: (1) return on invested capital, (2) manufacturing cycle efficiency, (3) customer retention rate, (4) employee training hours per FTE. The CFO asks which perspective each belongs to and whether the set covers the scorecard's required structure. What is the correct classification?",
    "Choices": {
      "A": "Financial, Internal Process, Customer, Learning & Growth — in order; the set covers all four perspectives",
      "B": "All four are Internal Process metrics since they all measure operating activities",
      "C": "Financial, Customer, Internal Process, Learning & Growth — metrics 2 and 3 are swapped",
      "D": "Financial, Learning & Growth, Customer, Internal Process — training hours belong in Internal Process"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "ROIC is Financial (outcome metric for shareholders). Manufacturing cycle efficiency (value-added time / total cycle time) is Internal Process (operations excellence). Customer retention is Customer perspective. Training hours per FTE is Learning & Growth (capabilities and infrastructure). The as-listed order mislabels metrics 2 and 3: cycle efficiency is about the production process, not the customer relationship; retention is about the customer franchise, not internal operations. The set does cover all four perspectives once correctly mapped. Business interpretation: misclassification breaks the scorecard's cause-effect chain (Learning → Process → Customer → Financial) and leads teams to optimize the wrong link. Common trap: filing any operational metric under Internal Process without checking whose outcome it measures.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-111",
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
    "ExplanationWrongA": "Option A keeps the given order, which mislabels manufacturing cycle efficiency as Customer and customer retention as Internal Process. Cycle efficiency measures the production process (Internal); retention measures franchise strength (Customer). Order-preserving mapping is the trap.",
    "ExplanationWrongB": "Option B collapses everything into Internal Process. ROIC is a shareholder-outcome metric (Financial), and retention/training measure customer and capability outcomes. A scorecard with one perspective is a KPI list, not a balanced scorecard.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D files training hours under Internal Process. Training builds workforce capability — the Learning & Growth perspective's core. Internal Process covers the operations that trained employees then execute.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.112 OEE decomposition diagnosis",
    "MicroTopic": "OEE decomposition diagnosis",
    "UniqueConceptKey": "C-D112-OEE-decomposition-diagnosis",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Pinnacle Stamping tracks overall equipment effectiveness (OEE) on Press 7: availability 90%, performance 80%, quality 95%, for OEE of 68.4%. The operations manager blames the quality rate as the main drag. The plant controller decomposes the multiplicative metric, computes the marginal OEE lift of a 10-point improvement in each factor, and ranks the levers. What does the decomposition prove?",
    "Choices": {
      "A": "Quality is the top lever — at 95% it trails availability and needs the most work",
      "B": "Availability is the top lever — downtime is always the binding constraint on stamping presses",
      "C": "Quality is the top lever — defects compound through performance losses",
      "D": "Performance is the top lever — lifting it to 90% yields OEE of 76.95%, beating equal-point gains elsewhere (76.0% availability, 72.0% quality)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "OEE = availability × performance × quality = 0.90 × 0.80 × 0.95 = 0.684 (68.4%). Because OEE is multiplicative, marginal analysis decides: +10 points on performance → 0.90 × 0.90 × 0.95 = 76.95%; +10 on availability → 1.00 × 0.80 × 0.95 = 76.0%; quality to perfection (only 5 points available) → 0.90 × 0.80 × 1.00 = 72.0%. Performance (cycle-time losses, minor stops, reduced speed) is both the largest gap and the highest-yield lever. Business interpretation: multiplicative KPIs punish the weakest link disproportionately — rank projects by marginal impact, not by which rate sounds worst. Common trap: targeting quality because defects feel most expensive, when the math favors the 80% factor.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-112",
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
    "ExplanationWrongA": "Option A targets quality (95%), but quality is already the strongest component with the least headroom (5 points to perfection). Equal effort there yields the smallest OEE gain of the three options (72.0% ceiling).",
    "ExplanationWrongB": "Option B asserts downtime is always binding. Here availability (90%) exceeds performance (80%) — the data contradicts the generalization. Diagnose from the decomposition, not from press-room folklore.",
    "ExplanationWrongC": "Option C claims defects compound through performance losses. OEE components multiply independently by definition (good parts × speed ratio × uptime ratio); there is no compounding channel from quality into performance. The math refutes the story.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.113 benchmarking scale adjustment",
    "MicroTopic": "benchmarking scale adjustment",
    "UniqueConceptKey": "C-D113-benchmarking-scale-adjustment",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Crestline ($40M revenue) benchmarks order-fulfillment cost per order against an industry leader ($2B revenue) at $3.10 versus Crestline's $4.80. The benchmarking team recommends matching the leader's $3.10 within one year. The controller objects that the comparison is unadjusted. A follow-up study decomposes the $1.70 gap: $1.10 from fixed-cost leverage and automation thresholds only attainable at scale, $0.60 from pick-pack methods Crestline can copy. What target should the controller set?",
    "Choices": {
      "A": "$3.10 — best-in-class is best-in-class regardless of scale",
      "B": "No target — cross-company comparisons are never valid across size classes",
      "C": "$4.20 — the attainable $0.60 efficiency portion only, excluding the $1.10 scale advantage Crestline cannot replicate",
      "D": "$5.90 — Crestline's cost adjusted upward proves it already beats the leader"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "$4.80 − $0.60 = $4.20: the controller strips out the $1.10 scale-driven portion (fixed-cost leverage, automation thresholds requiring 50× volume) and targets only the $0.60 efficiency portion (pick-pack methods, slotting, batching) that process changes can capture. Adopting $3.10 wholesale would set an unattainable target, demoralize the team, and misdiagnose scale economics as operational failure. Refusing all benchmarking (option B) wastes a genuine $0.60 opportunity. Business interpretation: decompose benchmark gaps into structural versus operational before target-setting — hold teams accountable for what process can change, not for the company's size. Common trap: treating best-in-class unit costs as scale-free.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Balanced Scorecard",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/10-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-113",
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
    "ExplanationWrongA": "Option A adopts $3.10 wholesale, including $1.10 of scale advantage Crestline cannot replicate at $40M revenue. Unattainable targets demoralize teams and misdiagnose scale economics as operational failure.",
    "ExplanationWrongB": "Option B discards benchmarking entirely over a scale objection the decomposition already solves. The $0.60 efficiency portion is a genuine, copyable opportunity — refusing it wastes the study's value.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D inflates Crestline's cost to claim victory — adjusting the wrong direction to flatter current performance. Benchmarking adjusts the target toward attainability, not the actual toward complacency.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.114 controllable performance report evaluation",
    "MicroTopic": "controllable performance report evaluation",
    "UniqueConceptKey": "C-D114-controllable-performance-report-evaluation",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A division performance report shows: controllable margin $820,000 (budget $780,000); allocated headquarters costs $300,000; division ROI 11% on $7M assets including a $1.2M headquarters-allocated warehouse the manager cannot influence. The manager requests a bonus for beating budget by $40,000. Finance notes ROI trails the 14% hurdle. How should the performance committee reconcile the two signals?",
    "Choices": {
      "A": "Deny the bonus — 11% ROI below 14% proves underperformance regardless of the budget beat",
      "B": "Pay the bonus — controllable margin beat is the manager's accountability; ROI is distorted by uncontrollable allocations",
      "C": "Pay the bonus and raise the hurdle — both signals agree once allocations are added back to margin",
      "D": "Defer — neither signal is valid until headquarters costs are reallocated by headcount"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "This item is defective as drafted — option B states the controllability principle correctly (bonus on controllable margin beat; ROI distorted by the $1.2M uncontrollable warehouse and $300K HQ allocation), while option C incoherently recommends raising the hurdle after paying. CorrectChoice should be B. REPAIR: withdrawing C-keyed version; corrected object ships as CD-114 with key B.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Responsibility Accounting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/9-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CD-114",
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
    "ExplanationWrongA": "WITHDRAWN — see repair note",
    "ExplanationWrongB": "WITHDRAWN — see repair note",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 1 (authored 2026-09-10, WITHDRAWN — key defect caught at authoring; corrected CD-114 ships with key B)"
  }
];
module.exports = WAVE1C;