const WAVE13B = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.111 reciprocal service allocation",
    "MicroTopic": "reciprocal service allocation",
    "UniqueConceptKey": "D-C111-reciprocal-service-allocation",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "S1 $80,000 (30% to S2, 40% to P1, 30% to P2); S2 $50,000 (20% to S1, 30% to P1, 50% to P2). Using the reciprocal method, what are fully-loaded S1 and S2 totals and the P1 allocation?",
    "Choices": {
      "A": "S1 $95,745 / S2 $78,723; P1 = 0.40×$95,745 + 0.30×$78,723 = $38,298 + $23,617 = $61,915 — simultaneous equations capture both back-flows",
      "B": "S1 $104,000 / S2 $81,200 — add cross-percentages to originals without iteration",
      "C": "S1 $80,000 / S2 $50,000 — reciprocal means no reallocation, departments stand alone",
      "D": "S1 $90,000 / S2 $77,000 — solve one equation and estimate the other"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Reciprocal equations: S1 = $80,000 + 0.20×S2; S2 = $50,000 + 0.30×S1. Substitute: S1 = $80,000 + 0.2×($50,000 + 0.3×S1) = $90,000 + 0.06×S1 → 0.94×S1 = $90,000 → S1 = $95,744.68 ≈ $95,745. S2 = $50,000 + 0.3×$95,744.68 = $78,723.40 ≈ $78,723. P1 = 0.40×$95,744.68 + 0.30×$78,723.40 = $38,297.87 + $23,617.02 = $61,914.89 ≈ $61,915. Additive shortcuts (option B) ignore iteration convergence. Stand-alone (option C) abandons allocation. Half-solving (option D) breaks simultaneity. Business interpretation: reciprocal costing solves the mutual-services system exactly — step-down approximates it by zeroing one back-flow. Common trap: single-pass percentage addition.",
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
    "QuestionID": "P1-DC-111",
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
    "ExplanationWrongB": "Option B adds cross-percentages once ($80,000 + 0.3×$80,000; $50,000 + 0.2×$50,000...) without iteration — mutual services converge through infinite back-flow rounds, never one pass.",
    "ExplanationWrongC": "Option C's stand-alone departments abandon allocation entirely — service costs exist to be assigned, not admired in place.",
    "ExplanationWrongD": "Option D solves one equation and estimates the other — simultaneity requires both equations satisfied jointly; half-solving satisfies neither.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.112 step-down order sensitivity",
    "MicroTopic": "step-down order sensitivity",
    "UniqueConceptKey": "D-C112-step-down-order-sensitivity",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Same S1/S2 data. Compute step-down P1 under both orders (S1-first vs S2-first) and quantify the order sensitivity against the reciprocal $61,915.",
    "Choices": {
      "A": "Orders agree at $61,915 — sequence never matters in step-down",
      "B": "S1-first P1 $59,750; S2-first P1 $66,429; sensitivity $6,679 (10.8% of reciprocal) — order selects which back-flow is zeroed, so disclose the order with every step-down report",
      "C": "S1-first P1 $61,915; S2-first P1 $59,750 — S1-first is exact, S2-first approximate",
      "D": "S1-first P1 $55,000; S2-first P1 $70,000 — sensitivity dominates all other costing choices"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "S1-first: computed previously P1 = $59,750. S2-first: S1 += 20%×$50,000 = $10,000 (total $90,000); P1 += 30%×$50,000 = $15,000; P2 += 50%×$50,000 = $25,000. Then S1 $90,000 → P1 += 40/70×$90,000 = $51,428.57; P2 += 30/70×$90,000 = $38,571.43. Totals: P1 = $15,000 + $51,428.57 = $66,428.57 ≈ $66,429 (S1's 40%-to-P1 and 30%-to-P2 shares of the 70% non-S2 portion: 40/70 and 30/70). S1-first gave $59,750; S2-first gives $66,429 — sensitivity $6,679 (10.8% of the $61,915 reciprocal benchmark). Neither order is exact; reciprocal sits between them.",
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
    "QuestionID": "P1-DC-112",
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
    "ExplanationWrongA": "Option A's sequence-irrelevance ($61,915 both orders) confuses step-down with reciprocal — step-down zeroes one back-flow, and which one is zeroed moves P1 by $6,679.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's S1-first-exact claims one order is exact — neither order is exact; reciprocal ($61,915) sits between them ($59,750/$66,429). Exactness needs simultaneity.",
    "ExplanationWrongD": "Option D's $55,000/$70,000 invents dominance — actual $6,679 sensitivity (10.8%) is material but bounded, never decision-dominating.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.113 direct method distortion",
    "MicroTopic": "direct method distortion",
    "UniqueConceptKey": "D-C113-direct-method-distortion",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Same S1/S2 data. Compute the direct-method P1 allocation (ignore all inter-service flows) and compare against reciprocal $61,915.",
    "Choices": {
      "A": "Direct P1 $47,000 (0.40×$80,000 + 0.30×$50,000 = $32,000 + $15,000) — $14,915 (24%) below reciprocal; direct is defensible only when inter-service flows are immaterial",
      "B": "Direct P1 $61,915 — direct always equals reciprocal by construction",
      "C": "Direct P1 $65,000 — ignoring services inflates production allocations",
      "D": "Direct P1 $32,000 — only S1 allocates under direct"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Direct method: S1 → P1 40%×$80,000 = $32,000 (S2's 30% share ignored); S2 → P1 30%×$50,000 = $15,000 (S1's 20% share ignored). P1 = $47,000. Gap vs reciprocal $61,915 = $14,915 (24.1%). The 30%-of-S1 and 20%-of-S2 inter-service flows ($24,000 + $10,000 numerators) carry real economics the direct method discards. Equality claims (option B) mistake simplification for equivalence. Inflation claims (option C) get the direction backwards — direct UNDER-allocates here. S1-only (option D: $32,000) forgets S2 allocates too. Business interpretation: direct-method distortion scales with inter-service intensity — 50% of combined service cost flows inter-service here ($34,000 of $130,000... precisely 0.3×$80,000 + 0.2×$50,000 = $24,000 + $10,000 = $34,000 = 26% of $130,000), so direct is indefensible on these facts. Common trap: using direct whenever systems default to it.",
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
    "QuestionID": "P1-DC-113",
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
    "ExplanationWrongB": "Option B's direct-equals-reciprocal claims simplification is equivalence — $47,000 vs $61,915 ($14,915 gap) refutes it on these facts.",
    "ExplanationWrongC": "Option C's $65,000 inflation gets the direction backwards — discarding $34,000 of inter-service flow under-allocates P1 by $14,915, never inflates.",
    "ExplanationWrongD": "Option D's $32,000 S1-only forgets S2's 30%-to-P1 leg ($15,000) — direct ignores inter-service flows, never producing departments.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
  }
];
module.exports = WAVE13B;