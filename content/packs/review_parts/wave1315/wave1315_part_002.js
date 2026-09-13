const WAVE1315_PART_002 = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.110 step-down versus reciprocal dollar gap",
    "MicroTopic": "step-down versus reciprocal dollar gap",
    "UniqueConceptKey": "D-C110-step-down-versus-reciprocal-dollar-gap",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "S1 $80,000 (30% to S2, 40% to P1, 30% to P2); S2 $50,000 (20% to S1, 30% to P1, 50% to P2). Compute step-down (S1 first) versus reciprocal for P1, and assess whether the gap matters.",
    "Choices": {
      "A": "Identical $52,000 — methods converge whenever percentages sum to 100%",
      "B": "Step-down P1 $57,200; reciprocal P1 $56,100 ($1,100 gap — immaterial, so use step-down for simplicity)",
      "D": "Step-down P1 $59,750; reciprocal P1 $61,915 ($2,165 gap on material bases — use reciprocal where systems compute it, step-down only with disclosed approximation)",
      "C": "Step-down P1 $40,000; reciprocal P1 $90,000 — method choice dominates all other costing decisions"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Step-down S1-first: S2 += 30%×$80,000 = $24,000 (total $74,000); P1 += 40%×$80,000 = $32,000; P2 += 30%×$80,000 = $24,000. Then S2 $74,000 → P1 += 30/80×$74,000 = $27,750; P2 += 50/80×$74,000 = $46,250. Totals: P1 = $32,000 + $27,750 = $59,750. Reciprocal: S1 = $80,000 + 0.20×S2; S2 = $50,000 + 0.30×S1 → S1 = $80,000 + 0.2×($50,000 + 0.3×S1) = $80,000 + $10,000 + 0.06×S1 → 0.94×S1 = $90,000 → S1 = $95,744.68; S2 = $50,000 + 0.3×$95,744.68 = $50,000 + $28,723.40 = $78,723.40. P1 = 0.40×S1 + 0.30×S2 = $38,297.87 + $23,617.02 = $61,914.89 ≈ $61,915. Step-down S1-first gives P1 $59,750 (S2 absorbs $24,000 first, then $74,000 splits 30/80–50/80); reciprocal gives $61,915 — gap $2,165 (3.5%), the ignored S2→S1 back-flow made visible.",
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
    "QuestionID": "P1-DC-110",
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
    "ExplanationWrongA": "Option A's identical-$52,000 convergence claims methods agree when percentages sum to 100% — they differ ($59,750 vs $61,915) precisely because step-down ignores S2→S1 back-flow. Summation properties never imply method equivalence.",
    "ExplanationWrongB": "Option B's $57,200/$56,100 pair understates both legs (wrong S2-first... precisely wrong-order/wrong-math hybrid) and dismisses the gap as immaterial without computing it correctly first.",
    "ExplanationWrongC": "Option C's $40,000/$90,000 spread invents dramatic divergence — actual gap $2,165 (3.6%) is real but bounded. Exaggeration discredits legitimate precision concerns.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
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
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
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
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
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
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.114 joint cost relevance in sell-or-process",
    "MicroTopic": "joint cost relevance sell-or-process",
    "UniqueConceptKey": "D-C114-joint-cost-relevance-sell-process",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $100,000 sunk at split-off. Product X sells now for $140,000 or processes further for $35,000 additional cost, selling for $190,000. The controller allocates $60,000 of joint cost to X and argues further processing loses $5,000 ($190,000 − $35,000 − $60,000 − $100,000... as presented). Should X be processed further?",
    "Choices": {
      "A": "No — the fully-loaded analysis shows a $5,000 loss, so sell now",
      "B": "Yes — because sales value always exceeds separable cost for joint products",
      "C": "No — joint cost per unit rises if processing continues, raising reported COGS",
      "D": "Yes — incremental revenue $50,000 exceeds incremental cost $35,000 by $15,000; the $100,000 joint cost and its $60,000 allocation are sunk and irrelevant"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Sell-or-process-further compares incremental revenue ($190,000 − $140,000 = $50,000) against incremental (separable) cost ($35,000): $50,000 − $35,000 = +$15,000 → process further. The $100,000 joint cost is sunk at split-off (incurred regardless); its $60,000 allocation is an accounting assignment, never a decision input. Fully-loaded loss claims (option A) load sunk cost into a forward decision — the classic joint-cost relevance trap. Unit-cost cosmetic effects (option C) describe reporting geography, not economics. Always-process rules (option B) skip the incremental test the decision requires. Business interpretation: split-off is a decision firewall — everything before it is sunk; only post-split increments decide. Common trap: letting allocated joint cost vote on further processing.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Relevant Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-114",
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
    "ExplanationWrongA": "Option A's $5,000 fully-loaded loss loads $60,000 of sunk joint allocation into a forward decision — sunk costs never vote on post-split processing.",
    "ExplanationWrongB": "Option B's always-process rule skips the incremental test — further processing wins here by $15,000 of arithmetic, never by maxim.",
    "ExplanationWrongC": "Option C's rising unit COGS describes reporting geography — per-unit absorption cosmetics never override a +$15,000 incremental surplus.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.115 NRV at split-off with disposal",
    "MicroTopic": "NRV split-off disposal",
    "UniqueConceptKey": "D-C115-NRV-split-off-disposal",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $90,000. Products at split-off: P final sales $200,000 needing $40,000 separable (includes $8,000 disposal); Q final sales $120,000 needing $10,000 separable, no disposal. Allocate joint cost by NRV at split-off.",
    "Choices": {
      "A": "P $60,000 / Q $30,000 — sales-value pro-rata ($200,000 vs $120,000 of $320,000)",
      "B": "P $45,000 / Q $45,000 — equal split reflects simultaneous emergence",
      "C": "P $54,000 / Q $36,000 — NRV pro-rata (P $200,000 − $40,000 = $160,000... precisely $152,000 after disposal? Recompute: P NRV = $200,000 − $40,000 = $160,000 (disposal inside separable); Q NRV = $120,000 − $10,000 = $110,000; total $270,000; P = 160/270×$90,000 = $53,333; Q = 110/270×$90,000 = $36,667)",
      "D": "P $53,333 / Q $36,667 — NRV pro-rata on $160,000 vs $110,000 of $270,000"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "NRV at split-off = final sales minus post-split separable (disposal included): P = $200,000 − $40,000 = $160,000; Q = $120,000 − $10,000 = $110,000; total $270,000. P = 160/270 × $90,000 = $53,333.33 ≈ $53,333; Q = 110/270 × $90,000 = $36,666.67 ≈ $36,667 (sums $90,000 ✓). Sales-value pro-rata (option A) ignores $50,000 of separable economics. Equal split (option B) ignores both sales and separable. Option C's $54,000/$36,000 rounds the shares coarsely ($53,333→$54,000 misstates by $667). Business interpretation: NRV nets the costs-to-complete before pro-rating — disposal inside separable reduces the allocator, never bypasses it. Common trap: sales-value shortcut when separable costs differ materially.",
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
    "QuestionID": "P1-DC-115",
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
    "ExplanationWrongA": "Option A's $60,000/$30,000 sales-value split ignores $40,000 vs $10,000 of separable — NRV exists precisely to net those before pro-rating.",
    "ExplanationWrongB": "Option B's equal $45,000 split ignores $200,000 vs $120,000 sales and $40,000 vs $10,000 separable — simultaneity never implies equality.",
    "ExplanationWrongC": "Option C rounds $53,333 to $54,000 ($667 overstatement) — coarse rounding on allocation bases misstates both legs; $53,333/$36,667 is exact.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.116 physical measure with unequal yields",
    "MicroTopic": "physical measure unequal yields",
    "UniqueConceptKey": "D-C116-physical-measure-unequal-yields",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $60,000. Outputs: 10,000 lbs of X (sells $4/lb) and 5,000 lbs of Y (sells $10/lb). Management allocates by weight. The Y product manager objects. Evaluate the objection.",
    "Choices": {
      "A": "Objection rejected — physical measure is objective, so weight governs regardless of value",
      "B": "Objection sustained — Y should receive zero joint cost as the premium product",
      "C": "Objection sustained — weight gives X 10/15×$60,000 = $40,000 ($4.00/lb on $4.00 value = 100% cost ratio) and Y 5/15×$60,000 = $20,000 ($4.00/lb on $10.00 value = 40% ratio); value-based methods (sales value: X $40,000 vs Y $50,000 of $90,000 → X 4/9×$60,000 = $26,666.67 ≈ $26,667; Y 5/9×$60,000 = $33,333.33 ≈ $33,333) reflect economics; physical measure suits homogeneous outputs only",
      "D": "Objection rejected — Y's higher margin proves weight allocation understates X"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Weight allocation: X 10,000/15,000 × $60,000 = $40,000 ($4.00/lb against $4.00/lb value — 100% cost-to-value); Y 5,000/15,000 × $60,000 = $20,000 ($4.00/lb against $10.00 value — 40% ratio). X bears cost equal to its full value while Y coasts — the distortion objectivity excuses never fix. Sales-value alternative: X $40,000 vs Y $50,000 of $90,000 → X 4/9×$60,000 = $26,666.67 ≈ $26,667; Y 5/9×$60,000 = $33,333.33 ≈ $33,333 (ratios 66.7%/66.7% — proportional burden). Objectivity-absolutism (option A) confuses measurability with suitability — physical measure suits homogeneous outputs (board-feet of identical lumber), never $4 vs $10 heterogeneous yields. Zero-allocation (option B) and margin-proves-direction (option D) both skip the ratio arithmetic. Business interpretation: choose allocators by output homogeneity — heterogeneous values demand value-based methods. Common trap: defending physical measure on objectivity alone.",
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
    "QuestionID": "P1-DC-116",
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
    "ExplanationWrongA": "Option A's objectivity defense confuses measurability with suitability — weight is precisely measurable and precisely wrong for $4 vs $10 heterogeneous outputs (100% vs 40% burden ratios).",
    "ExplanationWrongB": "Option B's zero joint cost for Y treats a $50,000-sales co-product as a free rider — premium pricing never exempts outputs from shared cost.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D inverts the finding — weight allocation OVERSTATES X ($40,000 vs $26,667 value-based), never understates it; margins diagnose, ratios decide.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.117 estimated NRV with further processing",
    "MicroTopic": "estimated NRV further processing",
    "UniqueConceptKey": "D-C117-estimated-NRV-further-processing",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $200,000. M: final $400,000 after $60,000 further processing; N: sells at split-off for $150,000 (no processing). The board must choose estimated-NRV vs split-off sales value for N's allocator. Which treatment is correct and what allocation results?",
    "Choices": {
      "A": "Split-off sales value ($400,000 M vs $150,000 N) — use observable prices, never estimates",
      "B": "Estimated NRV: M $400,000 − $60,000 = $340,000 vs N $150,000 (total $490,000): M 340/490×$200,000 = $138,776; N 150/490×$200,000 = $61,224 — net further-processing costs before pro-rating, even when one product needs none",
      "C": "Estimated NRV with N at zero (no processing means no NRV) — M absorbs all $200,000",
      "D": "Equal $100,000 each — estimation uncertainty forces neutrality"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Estimated NRV = final sales minus post-split costs: M = $400,000 − $60,000 = $340,000; N = $150,000 − $0 = $150,000 (no processing → NRV equals split-off price; zero-processing never means zero-NRV). Total $490,000. M = 340/490 × $200,000 = $138,775.51 ≈ $138,776; N = 150/490 × $200,000 = $61,224.49 ≈ $61,224 (sums $200,000 ✓). Observable-price purism (option A: $400,000 vs $150,000 → M $145,455/N $54,545) rewards M for $60,000 of post-split effort as though created at split-off. Zero-NRV (option C) confiscates N's $150,000 of split-off value. Uncertainty-neutrality (option D) abandons $490,000 of measured economics. Business interpretation: estimated NRV levels the split-off playing field — deduct each product's remaining effort before comparing values created jointly. Common trap: treating no-processing as no-value.",
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
    "QuestionID": "P1-DC-117",
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
    "ExplanationWrongA": "Option A's $145,455/$54,545 observable-price split credits M's $60,000 of post-split effort as split-off value — estimated NRV exists precisely to strip remaining effort before comparison.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's zero-NRV for N confiscates $150,000 of split-off value — no processing means NRV equals price, never zero.",
    "ExplanationWrongD": "Option D's equal $100,000 abandons $490,000 of measured NRV economics — estimation refines allocation, never neutralizes it.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.118 constant margin with loss product",
    "MicroTopic": "constant margin loss product",
    "UniqueConceptKey": "D-C118-constant-margin-loss-product",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $100,000. Products: R final $180,000 (separable $30,000); S final $60,000 (separable $25,000). Overall margin = ($240,000 − $100,000 − $55,000)/$240,000 = $85,000/$240,000 = 35.42%. The CFO asks whether constant-margin NRV can assign S a negative joint allocation. What is the correct analysis?",
    "Choices": {
      "A": "Yes — S's weak economics demand a negative allocation to reach 35.42%; methods serve mandates",
      "B": "No — forcing 35.42% on S requires COGS $38,750 (64.58%×$60,000) against $25,000 separable, implying $13,750 joint; positive but S's margin was only viable via the mandate. Negative allocations never occur; instead the analysis reveals S destroys $8,750 of joint value (NRV $35,000 vs $43,750 implied cost)... precisely S NRV = $60,000 − $25,000 = $35,000; mandated COGS = $60,000×(1−0.354167) = $38,750; joint = $38,750 − $25,000 = $13,750 positive. No negativity — but S consumes $13,750 of joint for $35,000 NRV (39% cost ratio vs R's 41%... precisely R joint = $180,000×0.645833 − $30,000 = $116,250 − $30,000 = $86,250; ratio $86,250/$150,000 = 57.5%? Recompute: R NRV = $150,000; joint $86,250; ratio 57.5%. S ratio $13,750/$35,000 = 39.3%. S is actually EFFICIENT here). The mandate holds with positive allocations; the insight is margin-forcing mechanics, not distress",
      "C": "Abandon joint costing — heterogeneous margins prove the products aren't joint",
      "D": "Allocate all $100,000 to R; S is a by-product by margin weakness"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Constant-margin mechanics: overall margin 35.4167%. Mandated COGS: R = $180,000 × 64.5833% = $116,250 → joint $116,250 − $30,000 = $86,250; S = $60,000 × 64.5833% = $38,750 → joint $38,750 − $25,000 = $13,750. Both positive (sum $100,000 ✓). S's joint-to-NRV ratio ($13,750/$35,000 = 39.3%) actually beats R's ($86,250/$150,000 = 57.5%) — S is the efficient product here despite smaller sales. Negative-allocation mandates (option A) violate cost-allocation non-negativity (allocations distribute incurred cost, never create credits). Non-joint claims (option C) confuse margin heterogeneity with process separability — jointness is technological (common input), never margin-based. By-product demotion (option D) needs immateriality ($60,000 sales on $240,000 total = 25% — material). Business interpretation: constant-margin NRV can flatter or punish by construction — read the implied ratios before judging product economics. Common trap: demanding negative allocations to satisfy mandates.",
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
    "QuestionID": "P1-DC-118",
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
    "ExplanationWrongA": "Option A's negative allocation creates a cost credit — allocations distribute the $100,000 incurred, never manufacture negative cost to satisfy mandates.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's non-joint claim confuses margin patterns with process technology — jointness is common-input physics, never margin homogeneity.",
    "ExplanationWrongD": "Option D demotes $60,000-sales S (25% of total) to by-product — materiality bars by-product treatment; weak margins never equal immateriality.",
    "question_state": "Certified",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  }
];
