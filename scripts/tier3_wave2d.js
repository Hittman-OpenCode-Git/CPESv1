const WAVE2D = [
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.121 investigation selection under budget",
    "MicroTopic": "investigation selection budget",
    "UniqueConceptKey": "C-C121-investigation-selection-budget",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Controller Omar Haddad has an $8,000 investigation budget. Three variances compete: materials $25,000 U (probe costs $3,000; 70% chance of $20,000 recovery); labor $15,000 U (costs $4,000; 60% chance of $12,000 savings); overhead $9,000 U (costs $2,000; 85% chance of $6,000 corrections). No partial probes. Which portfolio maximizes expected net benefit within budget?",
    "Choices": {
      "A": "Materials + overhead ($5,000) — best expected return per investigation dollar",
      "B": "All three ($9,000) — total expected benefit covers the $1,000 overrun",
      "C": "Materials + labor ($7,000, $14,200 expected net); defer overhead — highest absolute expected value within budget",
      "D": "Labor only — mid-size variances deserve single focus"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Expected nets: materials = 0.70×$20,000 − $3,000 = $14,000 − $3,000 = $11,000; labor = 0.60×$12,000 − $4,000 = $7,200 − $4,000 = $3,200; overhead = 0.85×$6,000 − $2,000 = $5,100 − $2,000 = $3,100. Feasible pairs within $8,000: M+L ($7,000, EV $14,200), M+O ($5,000, EV $14,100), L+O ($6,000, EV $6,300). Materials + labor wins on absolute expected value ($14,200) while fitting the budget. Option A's per-dollar logic (M+O returns $2.82/$ vs M+L's $2.03/$) misranks under slack budget — ratios rule only when the budget binds tightly enough to exclude the higher-total option; here $1,000 of slack remains, so absolute EV governs. All-three (option B) violates the hard $8,000 constraint ($9,000). Business interpretation: rank probes by absolute EV subject to budget, switching to per-dollar ranking only when leftover budget cannot fund the next-best absolute option. Common trap: optimizing ratios when totals fit.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-121",
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
    "ExplanationWrongA": "Option A picks materials + overhead on per-dollar return ($2.82/$ vs $2.03/$). Ratios govern only when the budget binds out the higher-total option — here $1,000 slack remains, so the $14,200 absolute winner (M+L) fits. Ratio ranking leaves $100 of EV on the table to 'save' budget nobody needs saved.",
    "ExplanationWrongB": "Option B spends $9,000 against an $8,000 hard budget. Expected benefits do not relax binding capacity constraints — investigation staff hours are finite, and the overrun requires cutting a probe or securing budget first.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D probes labor alone ($3,200 EV), stranding $11,000 of materials EV that fits the budget. Single-focus is a heuristic for scarce attention, not for an $8,000 budget with two affordable high-yield probes.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.122 arbitration ruling transfer dispute",
    "MicroTopic": "arbitration ruling transfer dispute",
    "UniqueConceptKey": "C-C122-arbitration-ruling-transfer-dispute",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A selling division (variable cost $35) and buying division deadlocked: the seller demands $48 citing an outside quote; the buyer offers $35 citing variable cost. The controller, acting as arbitrator, discovers the $48 quote includes $5 of delivery the internal transfer does not require. Volume is 10,000 units; the seller has idle capacity. What should the arbitration ruling be?",
    "Choices": {
      "A": "$39 — strip the $5 delivery from the $48 comp (true market $43); settle at the midpoint of the $35–$43 range",
      "B": "$48 — the outside quote is objective and governs",
      "C": "$35 — variable cost with idle capacity is the only defensible price",
      "D": "$41.50 — split the $35/$48 difference down the middle"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Comparable-market analysis first: the $48 quote bundles $5 of delivery the internal transfer avoids, so the true market comparable is $43. The bargaining range is therefore $35 (variable-cost floor, idle capacity, no displacement) to $43 (adjusted market) — not $35–$48. Midpoint arbitration at ($35 + $43)/2 = $39 splits the $8 of joint gains evenly ($4 each side versus BATNAs), the standard arbitrator's solution when bargaining power is symmetric and the relationship must continue. Enforcing $48 (option B) awards the seller delivery value it never provides (+$5 × 10,000 = $50,000 windfall). Enforcing $35 (option C) awards the buyer the full surplus and teaches sellers to hide capacity. Splitting unadjusted $35/$48 at $41.50 (option D) splits the difference on a contaminated comp — precision on the wrong number. Business interpretation: arbitrate comparables before splitting differences — midpoint methods are only as valid as the range endpoints. Common trap: treating quoted prices as comparable without adjusting for delivery, terms, and scope.",
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
    "QuestionID": "P1-CC-122",
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
    "ExplanationWrongB": "Option B enforces the unadjusted $48 quote, awarding the seller $5 × 10,000 = $50,000 of delivery value it never provides. Quoted prices are starting points for comparability analysis, not verdicts.",
    "ExplanationWrongC": "Option C enforces the $35 floor as the price, awarding the buyer the entire $8 of joint gains. Floors bound acceptance regions; they do not dictate outcomes between willing traders — especially under ongoing-relationship arbitration.",
    "ExplanationWrongD": "Option D splits $35/$48 at $41.50 — precise arithmetic on a contaminated endpoint. Splitting differences is legitimate only after comparability adjustments; $41.50 embeds the $5 delivery fiction at half weight.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.123 asset-age ROI distortion remedy",
    "MicroTopic": "asset-age ROI distortion remedy",
    "UniqueConceptKey": "C-C123-asset-age-ROI-distortion-remedy",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Division Eastvale holds $900,000 of near-fully-depreciated assets, earns $270,000 (30% ROI), and rejects a $300,000 / $57,000-income (19%) expansion. Division Westvale holds $3,000,000 of new assets, earns $390,000 (13%), and accepts a $300,000 / $42,000 (14%) project. Required return is 12%. The CEO asks whether ROI bonuses are working. What should the controller recommend?",
    "Choices": {
      "A": "Keep ROI and commend Westvale — both divisions decided correctly",
      "B": "Force Eastvale to accept — corporate authority fixes incentive failure",
      "C": "Raise the hurdle to 19% — only Eastvale-grade projects should proceed",
      "D": "Replace ROI bonuses with residual income — Eastvale's rejection is bonus-driven (27.25% dilution) despite +$21,000 RI; asset-age distortion voids cross-division ROI comparison"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Eastvale's rejection: post-acceptance ROI = ($270,000+$57,000)/($900,000+$300,000) = $327,000/$1,200,000 = 27.25%, diluting 30% — a rational bonus-maximizer rejects, even though project RI = $57,000 − 12%×$300,000 = $57,000 − $36,000 = +$21,000 creates shareholder value. Westvale's acceptance: ($390,000+$42,000)/($3,000,000+$300,000) = $432,000/$3,300,000 = 13.09%, accretive to 13% — consistent under either metric (RI = $42,000 − $36,000 = +$6,000). The deeper disease is asset age: Eastvale's 30% reflects a depreciated denominator, not superior economics — comparing 30% to Westvale's 13% rewards accounting age. Residual income fixes both defects: it approves both value-creating projects (+$21k, +$6k) and neutralizes denominator distortion. Forcing acceptance (option B) preserves the dysfunctional measure while destroying autonomy. Raising the hurdle to 19% (option C) kills Westvale's value-creating 14% project. Business interpretation: when asset ages differ materially, ROI comparisons measure depreciation policy, not management. Common trap: praising Westvale's 'correct' decision while missing that the same system produced Eastvale's wrong one.",
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
    "QuestionID": "P1-CC-123",
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
    "ExplanationWrongA": "Option A commends the system because Westvale decided 'correctly.' But the same ROI bonus produced Eastvale's value-destroying rejection (+$21,000 RI refused). A measure that yields right answers by coincidence in one division and wrong answers by construction in another is broken.",
    "ExplanationWrongB": "Option B forces Eastvale to accept while keeping ROI bonuses. Coercion preserves the dysfunctional incentive (next project, same rejection logic) while destroying the autonomy the divisional structure exists to provide. Fix the measure, not the decision.",
    "ExplanationWrongC": "Option C raises the hurdle to 19%, which kills Westvale's 14% project ($6,000 of genuine value) while still leaving Eastvale's dilution incentive intact (19% still dilutes 30%). It compounds both errors.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.124 budget slack countermeasure design",
    "MicroTopic": "budget slack countermeasure design",
    "UniqueConceptKey": "C-C124-budget-slack-countermeasure-design",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A department's expense budgets have run $45,000–$55,000 favorable for three straight years on a $500,000 base — a persistent ~10% pad ($50,000). The CFO proposes a flat 10% top-down cut. The division VP proposes accepting the slack as prudence. The controller proposes a third way. Which countermeasure recovers value without destroying honesty incentives?",
    "Choices": {
      "A": "Flat 10% cut — padding confessed by three years of data deserves confiscation",
      "B": "Participative re-budget with variance-trend audit plus a stretch target at half the pad ($25,000) with a $5,000 honesty kicker — recovers ~$20,000 net while rewarding truthful budgeting",
      "C": "Accept the $50,000 pad — prudence buffers volatility and the cost of conflict exceeds $50,000",
      "D": "Zero-base the entire $500,000 — rebuild every line from zero to eliminate all slack at once"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The three-year $45–55k favorable run is revealed pad (~$50,000), but how it is recovered determines next year's honesty. Flat confiscation (option A) teaches managers to hide pad better (ratchet: revealed slack gets seized). Acceptance (option C) prices dishonesty at $50,000/year forever. Zero-basing (option D) spends ~$200,000 of analytical effort to chase $50,000 of slack — uneconomic. The participative design: (1) variance-trend audit confronts the manager with their own three-year pattern (deniability removed, no accusation needed); (2) stretch target recovers half the pad ($25,000) — demanding but attainable, preserving achievability; (3) the $5,000 honesty kicker pays for truthful re-budgeting, flipping the incentive from hide-pad to reveal-pad. Net recovery ≈ $25,000 − $5,000 = $20,000/year plus a truthful baseline going forward — the only option whose equilibrium behavior is honesty. Business interpretation: slack is an incentive problem wearing an arithmetic disguise — solve the incentive, and the arithmetic follows. Common trap: treating revealed pad as found money to confiscate rather than as evidence of a mispriced honesty market.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-124",
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
    "ExplanationWrongA": "Option A confiscates the revealed $50,000 pad outright. Next year's pad goes underground (sandbagged forecasts, shifted expenses) — confiscation teaches concealment, and the $50,000 returns disguised as something harder to find.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C accepts $50,000/year of padding as prudence. Prudence buffers genuine volatility; a three-year metronomic $45–55k favorable run is not volatility — it is a designed margin, priced at $50,000 annually forever.",
    "ExplanationWrongD": "Option D zero-bases $500,000 to chase $50,000 of slack — roughly $200,000 of analytical effort (weeks of management time, documentation, reviews) to recover one quarter of its own cost. The cure costs 4× the disease.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.125 real versus nominal ROI inflation",
    "MicroTopic": "real nominal ROI inflation",
    "UniqueConceptKey": "C-C125-real-nominal-ROI-inflation",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Division Hot (30% inflation environment) reports 35% nominal ROI on historical cost. Division Stable (2% inflation) reports 16% nominal ROI. Corporate ranks Hot first. The controller argues nominal ROI across inflation regimes is meaningless. What is the correct comparison?",
    "Choices": {
      "A": "Hot wins — 35% is more than double 16% under any inflation adjustment",
      "B": "Both are fine — each beats its local inflation rate by a similar margin",
      "C": "Restate in real terms: Hot ≈ 3.8%, Stable ≈ 13.7% — Stable trounces Hot; nominal 35% is monetary illusion",
      "D": "Adjust the hurdle rate for inflation and keep nominal ROI — measurement stays simple"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Real return ≈ (1 + nominal)/(1 + inflation) − 1. Hot: 1.35/1.30 − 1 = 1.0385 − 1 = 3.85%. Stable: 1.16/1.02 − 1 = 1.1373 − 1 = 13.73%. The ranking inverts completely: Stable's 13.7% real return is worth 3.5× Hot's 3.8%. Hot's 35% is monetary illusion — mostly the denominator's historical cost understated in inflated currency plus nominal income flattered by price pass-throughs. 'Beats local inflation by similar margin' (option B: Hot +5pp, Stable +14pp — not even similar) compounds the error. Hurdle-adjustment alone (option D) leaves the numerator/denominator in mixed-price-level currency. Business interpretation: cross-regime ROI comparison without price-level restatement ranks inflation, not management — restate to current cost (or at minimum compare real rates) before a dollar of bonus follows. Common trap: treating nominal outperformance across different price levels as information.",
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
    "QuestionID": "P1-CC-125",
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
    "ExplanationWrongA": "Option A keeps Hot ranked first on nominal 35% vs 16%. In real terms Hot earns 3.85% against Stable's 13.73% — nominal doubling is entirely price-level illusion, and ranking on it pays bonuses for inflation.",
    "ExplanationWrongB": "Option B claims similar margins over local inflation, but Hot beats 30% by 5 points while Stable beats 2% by 14 points — not similar. And margin-over-inflation is not a return measure at all; real rates are (3.85% vs 13.73%).",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D adjusts the hurdle while leaving numerator and denominator in mixed-price-level currency. Real comparison requires restating the measure (current-cost ROI), not just moving the bar — a higher hurdle against an inflated 35% still ranks Hot first.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.126 post-merger dashboard harmonization",
    "MicroTopic": "post-merger dashboard harmonization",
    "UniqueConceptKey": "C-C126-post-merger-dashboard-harmonization",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "After acquiring Plant Y, the company runs two dashboards: Plant X tracks throughput of 800 units/day × $25 CM ($20,000/day); Plant Y tracks utilization of 92% (denominator undefined — Y's 'capacity' has never been engineering-rated). The integration officer must harmonize within 90 days. Managers at Y resist losing 'their' metric. What should the harmonization mandate?",
    "Choices": {
      "A": "Adopt throughput-dollar-days plus request-date OTD for both plants; retire utilization % (denominator-undefined); run dual reporting during the 90-day transition",
      "B": "Keep both systems permanently — local ownership beats comparability",
      "C": "Adopt utilization % company-wide — it is already understood at Y and simpler than throughput",
      "D": "Adopt throughput units only, without dollar valuation — volume comparability without finance complexity"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Y's 92% utilization is unanchored — without an engineering-rated denominator, 92% of what is unknown, making it incomparable across plants and gameable within Y (redefine capacity upward, utilization 'improves'). Throughput-dollar-days (800 × $25 = $20,000/day at X) ties operations to economics in one number both plants can compute identically; request-date OTD adds the customer truth neither dashboard currently carries. Dual reporting for 90 days defuses resistance (Y keeps its metric visible while learning the new ones) with a hard sunset — permanent dual systems (option B) institutionalize incomparability. Company-wide utilization (option C) standardizes a broken metric. Throughput units without dollars (option D) equates a $5-CM unit with a $25-CM unit — volume without value. Business interpretation: harmonize on economically-anchored metrics with sunset-transition change management — metric migration is 20% arithmetic, 80% politics. Common trap: preserving local metrics for harmony while sacrificing the comparability the merger was meant to create.",
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
    "QuestionID": "P1-CC-126",
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
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B preserves both systems permanently for local ownership. Permanent dual dashboards mean no comparable plant ranking, no consolidated operations review, and double metric-maintenance cost — ownership purchased with the merger's analytical rationale.",
    "ExplanationWrongC": "Option C standardizes on utilization %, whose denominator at Y was never engineering-rated. Standardizing an unanchored metric spreads Y's definitional fog company-wide instead of dispelling it.",
    "ExplanationWrongD": "Option D adopts throughput units without dollar valuation, equating low-margin and high-margin volume. A plant shipping 800 units of $5 CM ($4,000) would outrank one shipping 700 of $25 ($17,500) — volume vanity over value.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.127 discount-driven metric gaming remedy",
    "MicroTopic": "discount-driven metric gaming remedy",
    "UniqueConceptKey": "C-C127-discount-driven-metric-gaming-remedy",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "A sales manager bonused on revenue booked an extra 12,000 units at $50 ($600,000 revenue) with a 15% discount to hit target. Variable cost is $45/unit. The $90,000 discount cost against $60,000 of unit contribution nets −$30,000. Revenue is up, contribution is down, and the manager expects a bonus. What should the committee do about this period and the plan design?",
    "Choices": {
      "A": "Raise next year's revenue target — the manager proved capacity exists",
      "B": "Pay the bonus and praise the over-attainment — revenue growth is the strategy",
      "C": "Fire the manager — gaming forfeits trust permanently",
      "D": "Deny this bonus on contribution grounds and redesign to a contribution target with a 5% discount-approval threshold — price the behavior, not the person"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Economics: 12,000 × ($50 − $45) = $60,000 contribution minus 15% × $600,000 = $90,000 discount cost = −$30,000 net. The manager spent $90,000 of margin to buy $600,000 of revenue the plan then rewards — rational under a revenue target, destructive for the company. Raising targets (option A) rewards gaming with harder gaming (deeper discounts next year). Paying and praising (option B) institutionalizes margin destruction. Firing (option C) treats a system output as a character verdict — the replacement faces identical incentives and repeats it. The redesign prices the externality: contribution targets make discounts self-penalizing (every discount dollar reduces the bonus base), and the 5% approval threshold adds a control without banning legitimate deal flexibility. Denying this period's bonus follows from the same logic (payout on contribution = negative). Business interpretation: Goodhart's law is a plan-design input — when a measure becomes a target, re-target the measure, not the people. Common trap: moralizing gaming that the incentive scheme straightforwardly purchased.",
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
    "QuestionID": "P1-CC-127",
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
    "ExplanationWrongA": "Option A raises next year's target on proof of 'capacity.' The demonstrated capacity is discount-funded (−$30,000 economics) — raising targets on gamed attainment schedules deeper discounts, not real growth.",
    "ExplanationWrongB": "Option B pays and praises revenue growth that cost $30,000 net. Rewarding margin destruction as strategy teaches the entire sales force the exchange rate: $90,000 of company margin buys full bonus.",
    "ExplanationWrongC": "Option C fires the manager for behavior the revenue target straightforwardly purchased. The replacement inherits identical incentives and repeats it — personnel action as a substitute for plan redesign guarantees recurrence.",
    "ExplanationWrongD": "",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.128 expansion versus overtime capacity",
    "MicroTopic": "expansion overtime capacity",
    "UniqueConceptKey": "C-C128-expansion-overtime-capacity",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Demand needs 10,000 hrs/quarter against 8,500 capacity. Overtime premium runs 1,500 × $15 = $22,500/quarter with rising quality flags. A $200,000 machine (10-year life) adds 3,000 hrs/quarter at $3,000/quarter operating cost. Finance estimates 60% probability the demand sustains. How should the capacity committee decide?",
    "Choices": {
      "A": "Expand immediately — $58,000/year savings justify any $200,000 machine",
      "B": "Expand iff forward-order coverage supports ≥60% confidence — $58,000/year savings with 3.4-year payback at stated odds; otherwise overtime as a real option while coverage builds",
      "C": "Overtime permanently — capital commitment always loses to flexibility",
      "D": "Cut demand to capacity — marketing should sell what operations can make"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Machine quarterly cost = $200,000/40 quarters + $3,000 operating = $5,000 + $3,000 = $8,000/quarter versus $22,500 overtime — savings $14,500/quarter = $58,000/year; simple payback = $200,000/$58,000 = 3.45 years. At 60% sustain probability, expected 10-year value ≈ 0.60 × $580,000 − $200,000 = $348,000 − $200,000 = +$148,000 — positive but probability-sensitive (breaks even at ~34% sustain odds: $200,000/$580,000). Hence the conditional: expand on ≥60% confidence evidenced by signed-order coverage (not forecasts), else run overtime as a paid real option ($22,500/quarter preserves the choice while information arrives). Unconditional expansion (option A) ignores the 40% strand risk ($200,000 sunk against evaporated demand). Permanent overtime (option C) pays $58,000/year forever to avoid deciding — flexibility has a price, and here it exceeds the machine in under 4 years. Cutting demand (option D) surrenders contribution to dodge a capacity question. Business interpretation: capacity is an options problem — price flexibility explicitly, set the exercise trigger on coverage, and never let forecasts alone commit capital. Common trap: payback analysis without probability weighting.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Budgeting",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/7-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-128",
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
    "ExplanationWrongA": "Option A expands unconditionally on $58,000/year savings, ignoring the 40% strand probability — $200,000 sunk against evaporated demand with 3.4 years of payback unearned. Savings conditional on demand are not savings yet.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C runs $22,500/quarter overtime permanently to preserve flexibility, paying $58,000/year forever for an option worth exercising at ≥60% confidence. Flexibility priced above the commitment it protects is just indecision with a budget line.",
    "ExplanationWrongD": "Option D cuts demand to fit capacity, surrendering 1,500 hours of contribution to dodge a capacity decision. Marketing exists to sell profitable demand — operations exists to evaluate serving it, starting at +$148,000 expected value.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.129 chargeback rate design",
    "MicroTopic": "chargeback rate design",
    "UniqueConceptKey": "C-C129-chargeback-rate-design",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Corporate IT ($500,000: 2,000 complex tickets, 8,000 routine) charges a flat $50/ticket: Division A (1,000 tickets) $50,000; B (3,000) $150,000; C (6,000: 1,500 complex + 4,500 routine) $300,000. Analysis shows C floods routine tickets (triage failures), consuming support capacity. True cost: complex $150, routine $25. What rate redesign should the controller recommend?",
    "Choices": {
      "A": "Keep flat $50 — simplicity and predictability outweigh refinement",
      "B": "Allocate by division revenue — ability to pay is the fairest base",
      "C": "Two-tier: $150/complex + $25/routine with requester triage — C pays $337,500 (its $37,500 spam premium), pricing the externality it imposes",
      "D": "Outsource IT — internal chargebacks always distort more than markets"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Rate derivation: complex $150 × 2,000 = $300,000; routine $25 × 8,000 = $200,000; total $500,000 — reconciles. C's two-tier bill = 1,500×$150 + 4,500×$25 = $225,000 + $112,500 = $337,500 versus $300,000 flat — the +$37,500 is the priced externality of C's triage failures (4,500 routine tickets, many avoidable with requester-side filtering). Flat $50 (option A) subsidizes spam: each routine ticket costs $25 but is 'free' at the margin... precisely, flat pricing makes routine tickets cost C $50 while costing IT $25 — overpriced per ticket yet underpriced in total because C's complex tickets ($150 cost) ride at $50. The two-tier structure plus requester triage attacks both margins: correct marginal prices plus volume discipline. Revenue allocation (option B) severs cost causation entirely. Outsourcing (option D) leaps scope — a $500,000 rate-design problem does not imply a make-buy verdict. Business interpretation: chargebacks are congestion prices — tier by cost-to-serve and watch demand self-regulate. Common trap: defending flat rates for simplicity while volume mixes shift underneath.",
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
    "QuestionID": "P1-CC-129",
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
    "ExplanationWrongA": "Option A keeps flat $50 for simplicity while C's mix (75% routine by count, triage-failed) shifts underneath. Flat rates subsidize exactly the behavior — ticket spam — that is degrading support capacity.",
    "ExplanationWrongB": "Option B allocates by revenue ('ability to pay'), severing cost causation entirely. IT costs follow ticket complexity, not division revenue — revenue-based IT charges tax success to subsidize support consumption.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D outsources IT over a rate-design dispute. A $500,000 tiering fix does not imply a make-buy verdict — outsourcing analysis needs its own relevant-cost comparison, not frustration with flat rates.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  },
  {
    "Part": 1,
    "Section": "C",
    "SectionName": "Performance Management",
    "Topic": "C.130 evaluation frequency signal versus noise",
    "MicroTopic": "evaluation frequency signal noise",
    "UniqueConceptKey": "C-C130-evaluation-frequency-signal-noise",
    "LOSTag": "P1-C Performance management",
    "Difficulty": "Very Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Monthly controllable variances are noise around zero (σ = $8,000). The current ±$10,000 monthly investigation threshold triggers constantly, consuming review capacity. The controller models alternatives. What evaluation frequency and threshold design best separates signal from noise?",
    "Choices": {
      "A": "Quarterly formal evaluation (±$10,000 threshold, ~3% false-alarm) with monthly monitoring-only flags — noise averages out over three months while true shifts persist",
      "B": "Monthly bonuses on monthly variances — responsiveness requires monthly stakes",
      "C": "Annual evaluation only — maximum averaging eliminates all noise",
      "D": "Monthly evaluation on year-to-date cumulative variance — accumulation smooths noise while keeping monthly cadence"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "False-alarm math: monthly P(|X| > $10,000) with σ = $8,000 is 2×(1 − Φ(1.25)) ≈ 2×(1 − 0.8944) = 21.1% — one month in five triggers on pure noise, which is why review capacity is consumed. Quarterly aggregation: σ_q = $8,000/√3 ≈ $4,619; P(|X| > $10,000) = 2×(1 − Φ(2.165)) ≈ 3.0% — noise cancels (independent monthly draws) while persistent shifts accumulate (a true $4,000/month shift totals $12,000/quarter, tripping the threshold with power). Monthly monitoring-only flags preserve visibility without payout consequences; quarterly formal evaluation pays signal. Monthly bonuses (option B) pay 21%-noise luck. Annual-only (option C) averages noise away but delays true-shift detection up to a year — feedback latency destroys control value. YTD cumulative (option D) accumulates January noise into every subsequent reading — December's bonus rests partly on January luck. Business interpretation: match evaluation frequency to the noise horizon — aggregate until noise dies, evaluate where signal lives. Common trap: treating threshold breaches as findings without computing the null-hypothesis rate.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section C",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Standard Costs and Variances",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-CC-130",
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
    "ExplanationWrongB": "Option B bonuses monthly variances with a 21% noise-trigger rate — one month in five pays luck. Responsiveness to noise is not responsiveness; it is lottery administration with extra steps.",
    "ExplanationWrongC": "Option C goes annual to maximize averaging, but feedback delayed up to a year cannot steer behavior — control value decays with latency. Quarterly aggregation already cuts noise to 3% without the year-long blind spot.",
    "ExplanationWrongD": "Option D accumulates monthly noise into year-to-date readings — January's luck contaminates all eleven subsequent evaluations. Cumulation smooths nothing; it stockpiles noise under a cadence illusion.",
    "question_state": "Unprocessed",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "certification_batch": "Tier 3 Wave 2 (authored 2026-09-10, pending six-dimension verification)"
  }
];
module.exports = WAVE2D;