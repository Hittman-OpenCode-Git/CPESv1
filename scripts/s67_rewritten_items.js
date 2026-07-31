// Session 67 rewritten items — extracted from Agent 1 and Agent 2 outputs
// Each key is QID, value is the complete rewritten JSON object text

const rewrites = {};

// === AGENT 1 — EVALUATE ITEMS (7 items) ===

rewrites["P1-B-040"] = `{
		"Part": 1,
		"Section": "B",
		"SectionName": "Planning, Budgeting, and Forecasting",
		"Topic": "B.040 variance investigation threshold multi-factor judgment",
		"MicroTopic": "variance investigation threshold multi-factor judgment",
		"UniqueConceptKey": "B-040-variance-investigation-threshold-multi-factor-judgment",
		"LOSTag": "B.4 Annual profit plan and supporting schedules",
		"Difficulty": "Difficult",
		"ItemType": "MCQ",
		"ItemStyle": "single-select",
		"Stem": "Ridgeline Manufacturing's Controller, Sarah Okonkwo, is reviewing the Q3 financial close. The machining department exceeded its flexible budget by $9,000 — a 6.0% unfavorable variance on its $150,000 quarterly budget. Ridgeline's written variance investigation policy requires a formal investigation whenever a department variance exceeds either 5% of budget or $10,000, whichever is smaller. The plant manager has already identified the root cause: an unanticipated tooling-supplier price increase of $9,200, partially offset by $200 in favorable yield adjustments. The supplier has since reverted to contract pricing effective Q4. The department's trailing four-quarter average variance is 1.2% unfavorable, and the controller estimates a full investigation would require two senior accountants for one week at a combined cost of approximately $6,400. Sarah must decide whether to authorize the formal investigation or document an exception.",
		"Choices": {
			"A": "Authorize the formal investigation — the 6.0% variance exceeds the 5% policy threshold, and bypassing the policy even once sets a precedent that undermines the control environment. The policy exists precisely to prevent managers from rationalizing away unfavorable variances.",
			"B": "Authorize the formal investigation — the plant manager's root-cause explanation has not been independently verified, and accepting a self-reported cause without corroboration introduces moral hazard. Other departments will expect similar treatment if this variance escapes scrutiny.",
			"C": "Defer the formal investigation but document the exception in writing — the root cause is specific, isolated, and already remedied (supplier reverted to contract pricing). The four-quarter trend of 1.2% demonstrates strong control. At $6,400, the investigation cost approaches 71% of the $9,000 variance, and the expected recoverable insight is low given the known cause. Escalate to full investigation only if Q4 shows a repeat variance.",
			"D": "Waive investigation entirely — a $9,000 variance on a $150,000 department budget represents less than 0.2% of Ridgeline's total quarterly manufacturing spending of approximately $4.8 million, and the materiality threshold for the consolidated financial statements is $50,000. The variance does not warrant management attention."
		},
		"CorrectChoice": "C",
		"ExplanationCorrect": "Professional judgment in variance investigation requires weighing four factors: materiality (6% is a marginal breach of the 5% threshold), trend (1.2% trailing average indicates sustained control), controllability (isolated supplier event, already resolved), and cost-benefit ($6,400 investigation cost vs. $9,000 variance — recovering meaningful additional insight is unlikely when the root cause is identified and remedied). Under management-by-exception principles, the controller exercises judgment to avoid investigations whose cost exceeds their probable benefit, provided the decision is documented and monitored. Deferring with a documented rationale and a Q4 escalation trigger respects the policy's intent while applying cost-benefit discipline — a hallmark of effective controllership. The policy provides a starting point for investigation decisions, not an absolute mandate that overrides professional judgment.",
		"StudyLinks": [
			{
				"label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
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
		"QuestionID": "P1-B-040",
		"CalculationItem": false,
		"VerifiedChecks": [
			"Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
			"Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
			"Original practice item with unique micro-topic and stem",
			"Answer key distribution balanced across A/B/C/D",
			"Distractors written as plausible CMA-style traps"
		],
		"ExplanationWrongA": "This recommendation mechanically applies the policy without exercising the professional judgment that management-by-exception requires. A 6.0% breach of a 5.0% threshold is marginal, and the policy provides a trigger, not a mandate. Investigations consume resources — $6,400 in this case — and when the root cause is already identified and resolved (supplier reverted to contract pricing), the incremental benefit of a formal investigation is near zero. Rigid policy application without cost-benefit analysis is not effective controllership.",
		"ExplanationWrongB": "While independent verification is a legitimate internal control concern, this recommendation overweights one risk (moral hazard from self-reporting) while ignoring the cost-benefit equation. The plant manager's explanation is specific, quantified ($9,200 supplier charge, $200 offset), and verifiable against supplier invoices without a full investigation. The four-quarter trend of 1.2% provides substantial evidence against systematic misreporting. A controller can independently confirm the supplier price change with a single phone call rather than a $6,400 investigation.",
		"ExplanationWrongC": "",
		"ExplanationWrongD": "This recommendation applies a consolidated materiality threshold ($50,000) that is irrelevant to departmental variance analysis. Materiality for variance investigation is assessed at the responsibility-center level, not the consolidated entity level — a department's $9,000 variance may be immaterial to the company but highly material to the department manager's performance evaluation. Ignoring all variances below a corporate materiality floor would systematically fail to detect emerging control weaknesses. The 5%/$10,000 policy exists specifically because consolidated materiality is too coarse for operational control.",
		"question_state": "Certified",
		"DifficultyScore": 4,
		"CognitiveLevel": "Evaluate"
	}`;

// P1-BD-022 — Pack D Section B
rewrites["P1-BD-022"] = `{
		"Part": 1,
		"Section": "B",
		"SectionName": "Planning, Budgeting, and Forecasting",
		"Topic": "B.022 direct labor budget permanent vs temporary staffing seasonal demand",
		"MicroTopic": "direct labor budget permanent vs temporary staffing seasonal demand",
		"UniqueConceptKey": "B-D022-direct-labor-budget-permanent-vs-temporary-staffing-seasonal-demand",
		"LOSTag": "B Planning and budgeting",
		"Difficulty": "Difficult",
		"ItemType": "MCQ",
		"ItemStyle": "single-select",
		"Stem": "Fenwick Manufacturing's Operations Director, Marcus Delgado, is finalizing the annual direct labor budget. Production demand follows a seasonal pattern: Q1 (Jan–Mar) 40,000 units, Q2 (Apr–Jun) 95,000 units, Q3 (Jul–Sep) 60,000 units, and Q4 (Oct–Dec) 50,000 units. Each unit requires 0.5 direct labor hours. Permanent employees work 500 hours per quarter at a fully loaded cost of $32.00 per hour (wages plus benefits, training, and payroll taxes). Temporary workers cost $38.00 per hour with no benefits obligation, but each temporary hire requires $1,500 in onboarding and reaches full productivity only in their third week. Overtime for permanent employees is paid at time-and-a-half ($48.00/hour) and is capped at 80 hours per employee per quarter to comply with labor regulations. Marcus must recommend a workforce strategy that balances cost efficiency, production reliability, and workforce stability for the upcoming fiscal year.",
		"Choices": {
			"A": "Staff 95 permanent workers year-round to cover peak Q2 demand without overtime or temporary labor — permanent workers provide the lowest hourly cost ($32.00 vs. $38.00 temp), institutional knowledge retention is maximized, and idle labor during Q1, Q3, and Q4 (averaging 30 workers idle per quarter) is an acceptable cost of workforce stability and surge-readiness.",
			"B": "Staff only the Q4 base demand of 50 permanent workers and fill all seasonal volume above 50,000 units with temporary labor each quarter — this eliminates idle-time costs entirely, matches labor cost directly to production needs, and preserves maximum flexibility if demand forecasts shift.",
			"C": "Maintain a core of 50 permanent workers covering the 50,000-unit quarterly base load, supplement Q2's 45,000-unit surge with a combination of 20 temporary workers and capped overtime for the 50 permanent employees (4,000 overtime hours), and cover Q3's additional 10,000 units with limited temporary staffing — this balances the lower per-hour cost of permanent labor with the flexibility of temporary workers while limiting overtime to the regulatory cap.",
			"D": "Staff 65 permanent workers — the average of Q2 peak (95) and Q4 trough (50) — using mandatory overtime during Q2 (95,000 units requires 47,500 hours; 65 workers provide 32,500 base hours; gap of 15,000 hours at $48.00/hour) and accepting idle labor during Q1 and Q4. This reduces temporary-worker onboarding costs and quality variability."
		},
		"CorrectChoice": "C",
		"ExplanationCorrect": "Marcus should structure a core-permanent-plus-seasonal-temporary workforce because it balances the three competing objectives: cost efficiency, production reliability, and workforce stability. Permanent workers at $32.00/hour provide the lowest unit labor cost for the 50,000-unit quarterly base — 25,000 hours per quarter × 4 quarters × $32.00 = $3,200,000 annually. For Q2's surge (22,500 additional hours): 20 temporary workers provide 10,000 hours at $38.00/hour ($380,000) with $30,000 in onboarding costs, and 50 permanent workers contribute 4,000 overtime hours at $48.00/hour ($192,000) — remaining within the 80-hour regulatory cap. Q3's incremental 5,000 hours are covered by 10 temporary workers. This approach keeps idle-time costs near zero (permanent workers are fully utilized at base load), avoids the quality and reliability risks of a fully temporary workforce, and limits overtime premium to only $192,000 during the peak quarter. The $1,500-per-hire onboarding cost for temporary workers is manageable because seasonal peak hiring is concentrated in a single quarter. The alternative of 95 permanent workers (Option A) would incur approximately $960,000 in idle labor costs during off-peak quarters — far exceeding the temporary labor premium.",
		"StudyLinks": [
			{
				"label": "IMA CMA Learning Outcome Statements, Part 1 Section B",
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
		"QuestionID": "P1-BD-022",
		"question_state": "Certified",
		"certification_date": "2026-07-23",
		"certification_batch": "Pack D Section B Block 1",
		"CalculationItem": false,
		"VerifiedChecks": [
			"Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
			"Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
			"Original practice item with unique micro-topic and stem",
			"Answer key distribution balanced across A/B/C/D",
			"Distractors written as plausible CMA-style traps"
		],
		"ExplanationWrongA": "Staffing to peak demand creates substantial idle-time costs during the three off-peak quarters. In Q1 (40,000 units), only 40 workers are needed; in Q3 (60,000), only 60; in Q4 (50,000), only 50. The 95-worker roster leaves approximately 55, 35, and 45 workers idle in Q1, Q3, and Q4 respectively — roughly 67,500 idle hours at $32.00/hour, costing over $2.1 million annually in unproductive labor. While workforce stability has value, paying for idle capacity at this scale is not cost-efficient when temporary labor alternatives exist at only a $6.00/hour premium.",
		"ExplanationWrongB": "A fully temporary workforce eliminates idle-time costs but introduces three risks that outweigh the flexibility benefit. First, each temporary worker incurs $1,500 in onboarding and requires three weeks to reach full productivity — with 45 temporary workers needed for Q2 peak alone, onboarding costs total $67,500 and productivity losses during ramp-up erode the apparent labor-cost savings. Second, training a new temporary workforce each quarter (45 in Q2, 10 in Q3, 0 in Q4) creates significant quality variability risk — a manufacturing defect discovered in Q2 would be difficult to attribute and correct when the workforce has already turned over. Third, zero permanent workforce means zero institutional memory for process improvements or equipment maintenance routines.",
		"ExplanationWrongC": "",
		"ExplanationWrongD": "The midpoint-staffing approach creates a worst-of-both-worlds outcome: Q2 still requires 15,000 overtime hours at $48.00/hour ($720,000 overtime premium — more than triple the overtime cost in the recommended approach), while Q1 and Q4 still carry idle workers (15 and 15 respectively, costing approximately $480,000 annually). The mandatory overtime during Q2 at 231 hours per employee substantially exceeds the 80-hour regulatory cap, creating labor-law compliance risk. This recommendation fails on both cost and compliance dimensions — it neither minimizes idle time nor respects overtime constraints.",
		"DifficultyScore": 4,
		"CognitiveLevel": "Evaluate"
	}`;

// These are just the first 2 of 15 for demonstration
// Rest to be added by subsequent writes

module.exports = rewrites;
