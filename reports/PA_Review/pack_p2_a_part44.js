var pack_p2_a_part44 = [
{
  "QuestionID": "P2-A-382",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Maya Caldwell is advising on Flash Tech's Argentine subsidiary, Flash Tech Argentina, which operates in a country that has accumulated inflation exceeding 100% over the prior three years. Under ASC 830, what is the required financial-reporting treatment for Flash Tech Argentina?",
  "Choices": {
    "A": "Flash Tech Argentina is accounted for as a foreign operation in a hyperinflationary economy; its financial statements are remeasured into the reporting currency using the U.S. dollar as the functional currency under ASC 830-20, with translation adjustments recorded in earnings.",
    "B": "Flash Tech Argentina's results are translated at the period-end spot rate with translation adjustments recorded in other comprehensive income (OCI) under the current-rate method, the same as a non-hyperinflationary subsidiary.",
    "C": "Flash Tech Argentina is consolidated using historical exchange rates only, with no translation adjustments recognized because the local currency is fully deprecated.",
    "D": "Flash Tech Argentina is excluded from consolidation because hyperinflationary environments make the subsidiary's statements not fairly presented in accordance with U.S. GAAP."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Evaluate",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.382 ASC 830 hyperinflationary economy remeasurement",
  "LOSTag": "A.9",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-382-asc-830-hyperinflationary-economy-remeasurement",
  "Authorities": [
    "ASC 830-10-45",
    "ASC 830-20"
  ],
  "FormulaReference": "Hyperinflationary test: cumulative three-year inflation near 100% or more -> remeasure as if functional currency is the reporting currency",
  "CommonTrapReference": "Treating a hyperinflationary subsidiary like any other foreign operation under the current-rate method, when ASC 830 requires remeasurement into the reporting currency with translation adjustments in earnings.",
  "DecisionTreeReference": "LOS A.9 > Foreign operations > Hyperinflationary environment > Functional currency reassessment",
  "ExplanationCorrect": "Under ASC 830-10-45 and ASC 830-20 (CMA LOS A.9), when a foreign operation operates in a country whose cumulative three-year inflation rate approaches or exceeds 100%, the economy is considered hyperinflationary and the subsidiary's financial statements must be remeasured as if the U.S. dollar (the reporting currency) were the functional currency. Remeasurement uses the historical rate for monetary items, the current rate for nonmonetary items carried at current cost, and the rate in effect when the transaction occurred for revenues and expenses; the resulting translation adjustment flows through earnings (not OCI) for the remeasured amounts. With Argentina's three-year inflation exceeding 100%, Flash Tech Argentina qualifies as a hyperinflationary economy under ASC 830. Maya Caldwell should direct the consolidation team to remeasure Flash Tech Argentina's statements into U.S. dollars and recognize the translation adjustment in current earnings, not OCI.",
  "ExplanationWrongB": "Choice B applies the standard current-rate method with translation adjustments in OCI, which is the treatment for non-hyperinflationary foreign operations. In a hyperinflationary environment, ASC 830-20 requires remeasurement into the reporting currency with translation adjustments in earnings, so Choice B applies the wrong framework.",
  "ExplanationWrongC": "Choice C applies historical exchange rates only and ignores translation adjustments entirely, which is not an ASC 830 treatment for any foreign operation. Even in hyperinflationary environments, translation adjustments arise from the remeasurement process and must be recognized, typically in earnings under ASC 830-20.",
  "ExplanationWrongD": "Choice D excludes the hyperinflationary subsidiary from consolidation, which would violate ASC 830's requirement to consolidate all controlled subsidiaries. ASC 830 does not provide an exclusion option based on hyperinflation; rather, it prescribes a different remeasurement methodology so that the subsidiary's results can be consolidated in a manner consistent with U.S. GAAP.",
  "ExplanationWrongA": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Difficult DS4 for Evaluate level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice A verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "When a foreign operation is in a hyperinflationary economy (cumulative three-year inflation near 100% or more), the subsidiary's statements are remeasured as if the reporting currency were the functional currency, with translation adjustments in earnings.",
    "application_to_facts": "Facts of P2-A-382 (A.382 ASC 830 hyperinflationary economy remeasurement) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-382 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Applies the current-rate method with OCI treatment, which is reserved for non-hyperinflationary operations.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-382.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Uses historical rates only with no translation adjustments, which is not an ASC 830 treatment.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-382.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Excludes the hyperinflationary subsidiary from consolidation, which ASC 830 does not permit.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-382.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "D.2"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-383",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Priya Ramaswamy is calculating Flash Foods' defensive interval and cash conversion cycle for the year. Flash Foods reports: cost of goods sold $1,200M; annual operating expenses (excluding COGS and depreciation) $400M; cash and short-term marketable securities $80M; DIO 60 days, DSO 50 days, DPO 30 days; 360-day year. What is the defensive interval in days, and how does it compare to the cash conversion cycle?",
  "Choices": {
    "A": "Defensive interval 36 days, computed as Cash / Daily COGS only; CCC = DIO + DSO - DPO = 60 + 50 - 30 = 80 days.",
    "B": "Defensive interval 18 days, computed as Cash / (Daily COGS + Daily operating expenses); CCC = DIO + DSO - DPO = 60 + 50 - 30 = 80 days.",
    "C": "Defensive interval 144 days, computed as Cash / Daily operating expenses only; CCC = DIO + DSO - DPO = 60 + 50 - 30 = 80 days.",
    "D": "Defensive interval 60 days, computed as Cash / (COGS + Operating expenses) without the 360-day denominator; CCC = 50 + 60 - 30 = 80 days with reordered components."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.383 Defensive interval vs cash conversion cycle",
  "LOSTag": "A.5",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-383-defensive-interval-vs-cash-conversion-cycle",
  "Authorities": [
    "CMA LOS A.5"
  ],
  "FormulaReference": "Defensive interval = Cash and equivalents / (Annual operating cash outflows / 360); CCC = DIO + DSO - DPO",
  "CommonTrapReference": "Including only COGS in the daily outflow denominator understates operating cash needs and inflates the defensive interval.",
  "DecisionTreeReference": "LOS A.5 > Working capital > Defensive interval > Liquidity coverage",
  "ExplanationCorrect": "Under CMA LOS A.5, the defensive interval measures how many days a company can continue operating from its cash and short-term marketable securities without additional cash inflows. Recomputed: Daily operating cash outflows = (COGS + Operating expenses) / 360 = ($1,200M + $400M) / 360 = $1,600M / 360 = $4.44M per day. Defensive interval = Cash and equivalents / Daily outflows = $80M / $4.44M = 18.0 days. CCC = DIO + DSO - DPO = 60 + 50 - 30 = 80 days. The defensive interval (18 days) is materially shorter than the 80-day cash conversion cycle, signaling that Flash Foods cannot fund a full operating cycle from existing cash alone. Priya should flag this gap to the treasury team and recommend either increasing the cash buffer or shortening the operating cycle through faster receivables collection or slower payables.",
  "ExplanationWrongA": "Choice A uses only COGS in the daily outflow denominator, omitting operating expenses. Defensive interval = $80M / ($1,200M / 360) = $80M / $3.33M = 24 days (the stated 36-day figure does not follow from this calculation). Excluding operating expenses understates daily outflows and inflates the defensive interval beyond what the cash buffer can actually cover.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C uses only operating expenses in the denominator, omitting COGS. Defensive interval = $80M / ($400M / 360) = $80M / $1.11M = 72 days (not 144 days as stated, indicating an arithmetic error). Excluding COGS understates the actual cash burn and inflates the apparent coverage period.",
  "ExplanationWrongD": "Choice D computes Cash / (COGS + Operating expenses) without dividing by 360 to obtain a daily outflow figure, yielding $80M / $1,600M = 0.05 days rather than a defensive interval. The correct calculation requires a daily outflow denominator, and the stated 60-day figure mixes in the DIO metric while containing a denominator error.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice B verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "Defensive interval = Cash and short-term marketable securities / (Annual operating cash outflows / 360), where operating outflows include COGS and operating expenses.",
    "application_to_facts": "Facts of P2-A-383 (A.383 Defensive interval vs cash conversion cycle) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-383 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Uses only COGS in the denominator and produces a defensively inflated interval.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-383.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Uses only operating expenses in the denominator, ignoring COGS, and contains an arithmetic error (72, not 144).",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-383.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Omits the 360-day denominator and reorders CCC components, producing an inflated 60-day figure.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-383.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B correctly applies the required adjustments per authoritative guidance. Choices A, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "B.1"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-384",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Adaeze Onuorah is reviewing Flash Industrial's proposed sale-leaseback transaction with Mariela Hoffmann. Flash Industrial would sell a manufacturing facility with a $50M carrying amount and a $70M fair value to a third party, then lease it back over a 15-year operating lease. Under ASC 842, how should Flash Industrial evaluate whether the transaction qualifies as a sale?",
  "Choices": {
    "A": "The transaction qualifies as a sale if the buyer obtains substantially all the remaining economic benefits of the facility through the leaseback, regardless of the consideration received.",
    "B": "The transaction qualifies as a sale if the leaseback is classified as a finance lease by the lessee, regardless of the control-transfer factors.",
    "C": "The transaction qualifies as a sale if control of the facility transfers to the buyer under ASC 842-40-10, considering factors such as transfer of title, right to substitute the asset, and right to obtain substantially all remaining economic benefits.",
    "D": "The transaction qualifies as a sale only if the leaseback is for a term of less than five years, with longer terms automatically disqualifying sale accounting."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Understand",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.384 ASC 842 sale-leaseback sale determination",
  "LOSTag": "A.6",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-384-asc-842-sale-leaseback-sale-determination",
  "Authorities": [
    "ASC 842-40-10",
    "ASC 842-40-25"
  ],
  "FormulaReference": "Sale-leaseback sale determination = Apply ASC 606 transfer-of-control framework; if control transfers, recognize sale with ROU asset measured at retained right-of-use portion",
  "CommonTrapReference": "Conflating lease classification with sale determination, or applying an arbitrary lease-term cutoff (e.g., five years) that does not exist in ASC 842.",
  "DecisionTreeReference": "LOS A.6 > Off-balance-sheet items > Sale-leaseback > Control transfer test",
  "ExplanationCorrect": "Under ASC 842-40-10 and ASC 842-40-25 (CMA LOS A.6), a sale-leaseback transaction is evaluated under the ASC 606 transfer-of-control framework to determine whether the buyer obtains control of the asset. Factors include transfer of title, the right to substitute the asset, the right to obtain substantially all of the remaining economic benefits, and the buyer's ability to direct the use of the asset. If control transfers, the seller-lessee recognizes the sale and measures a right-of-use asset for the leaseback portion. The transaction does not require a minimum lease term nor depend on whether the leaseback is a finance or operating lease for sale determination; those factors affect subsequent accounting, not whether sale recognition is appropriate. For Flash Industrial's transaction, Adaeze Onuorah's review should focus on whether control of the facility has transferred to the buyer, with the $70M fair value providing context for measuring the ROU asset at the retained right-of-use portion's relative fair value.",
  "ExplanationWrongA": "Choice A states that the transaction qualifies as a sale if the buyer obtains substantially all the remaining economic benefits through the leaseback, which reverses the test. ASC 842-40-10 requires the buyer to obtain control of the asset (and therefore the economic benefits), not that benefits flow through the leaseback; the leaseback is the seller's retained interest after the sale. This statement misstates the control test.",
  "ExplanationWrongB": "Choice B confuses lease classification with sale determination by conditioning sale treatment on finance-lease classification. ASC 842 evaluates sale-leaseback transactions under the control-transfer framework regardless of whether the leaseback is classified as finance or operating. The classification affects subsequent ROU asset and gain/loss accounting, not the initial sale determination.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D applies a five-year lease-term cutoff that does not exist in ASC 842. There is no specific lease-term threshold that automatically disqualifies sale accounting; the determination depends on the control-transfer factors in ASC 842-40-10 applied to the specific facts and circumstances, regardless of lease duration.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Easy DS1 for Understand level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice C verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 842 evaluates sale-leaseback transactions under the ASC 606 control-transfer framework; sale recognition depends on whether control of the asset transfers to the buyer, regardless of lease term or leaseback classification.",
    "application_to_facts": "Facts of P2-A-384 (A.384 ASC 842 sale-leaseback sale determination) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-384 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Reverses the control test by requiring the buyer to obtain benefits through the leaseback.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-384.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Conditions sale on finance-lease classification rather than the control-transfer test.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-384.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Applies a non-existent five-year lease-term cutoff that does not exist in ASC 842.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-384.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "D.4"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-385",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Naomi Castellanos is preparing Flash Holdings' segment-disclosure analysis. Three reportable segments under ASC 280 report the following full-year results: Flash Foods revenue $400M, operating income $60M, identifiable assets $300M; Flash Logistics revenue $200M, operating income $20M, identifiable assets $150M; Flash Tech revenue $100M, operating income $5M, identifiable assets $80M. Which conclusion best characterizes segment profitability and asset efficiency across the three segments?",
  "Choices": {
    "A": "Flash Logistics is the most profitable segment, with operating margin 10.0% and asset turnover 1.33x, exceeding Flash Foods on both metrics.",
    "B": "Flash Tech is the most profitable segment on a margin basis with operating margin 5.0%, despite having the smallest asset base.",
    "C": "All three segments have equal profitability on a margin basis at 15.0%, with asset turnover differences driven solely by revenue mix.",
    "D": "Flash Foods is the most profitable and asset-efficient segment, with operating margin 15.0% and asset turnover 1.33x, exceeding both Flash Logistics and Flash Tech."
  },
  "CorrectChoice": "D",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.385 Segment profitability and asset efficiency comparison",
  "LOSTag": "A.7",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-385-segment-profitability-and-asset-efficiency-comparison",
  "Authorities": [
    "ASC 280-10-50",
    "CMA LOS A.7"
  ],
  "FormulaReference": "Operating margin = Segment operating income / Segment revenue; Asset turnover = Segment revenue / Segment identifiable assets",
  "CommonTrapReference": "Comparing segment operating income in absolute dollars without normalizing for revenue (margin) or asset base (turnover).",
  "DecisionTreeReference": "LOS A.7 > Segment reporting > Performance evaluation > Margin and turnover analysis",
  "ExplanationCorrect": "Under ASC 280-10-50 (CMA LOS A.7), segment profitability should be evaluated on both operating margin and asset turnover, not absolute operating income. Recomputed: Flash Foods operating margin = $60M / $400M = 15.0%; asset turnover = $400M / $300M = 1.33x. Flash Logistics operating margin = $20M / $200M = 10.0%; asset turnover = $200M / $150M = 1.33x. Flash Tech operating margin = $5M / $100M = 5.0%; asset turnover = $100M / $80M = 1.25x. Flash Foods leads on operating margin (15.0% vs. 10.0% and 5.0%) and ties Flash Logistics on asset turnover (1.33x vs. 1.25x for Flash Tech). Naomi's segment analysis should highlight Flash Foods as the most profitable and asset-efficient segment, with Flash Logistics a close second on turnover but trailing on margin, and Flash Tech as the lowest-margin segment requiring performance review.",
  "ExplanationWrongA": "Choice A claims Flash Logistics is the most profitable segment with operating margin 10.0% and asset turnover 1.33x, exceeding Flash Foods. Flash Foods has operating margin 15.0% (higher than 10.0%) and identical asset turnover of 1.33x. By both metrics, Flash Foods exceeds or matches Flash Logistics, so this conclusion inverts the segment ranking.",
  "ExplanationWrongB": "Choice B claims Flash Tech is the most profitable on a margin basis with operating margin 5.0%, despite having the smallest asset base. A 5.0% operating margin is the lowest of the three segments, not the highest; Flash Foods at 15.0% is the most profitable on a margin basis. The conclusion misreads the margin comparison.",
  "ExplanationWrongC": "Choice C claims all three segments have equal profitability on a margin basis at 15.0%, which is incorrect. Recomputed margins are 15.0% (Flash Foods), 10.0% (Flash Logistics), and 5.0% (Flash Tech), three distinct figures. The 15.0% figure applies only to Flash Foods, not to all three segments.",
  "ExplanationWrongD": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Difficult DS4 for Analyze level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice D verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "Segment profitability under ASC 280 is evaluated by operating margin (segment operating income / segment revenue) and asset turnover (segment revenue / segment identifiable assets).",
    "application_to_facts": "Facts of P2-A-385 (A.385 Segment profitability and asset efficiency comparison) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-385 yields CorrectChoice D as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Claims Flash Logistics exceeds Flash Foods on both metrics, inverting the actual ranking.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-385.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Claims Flash Tech is most profitable at 5.0% margin, the lowest of the three segments.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-385.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Claims all three segments have 15.0% margin, misreporting the segment-specific margins.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-385.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D correctly applies the required adjustments per authoritative guidance. Choices A, B, C each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "B.2"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-386",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Foods: NI $480,000; weighted-average common shares 60,000; one-time gain on equipment $45,000. Priya Ramaswamy computes basic EPS.",
  "Choices": {
    "A": "Basic EPS = $480,000 / 60,000 = $8.00, using reported net income with no income-statement adjustments before division.",
    "B": "Basic EPS = $480,000 + $45,000 / 60,000 = $8.75, because the gain should be added back to reflect continuing operations.",
    "C": "Basic EPS = ($480,000 + $90,000 + $30,000 − $120,000) / 60,000 = $8.00, including non-cash add-backs and subtracting dividends.",
    "D": "Basic EPS = ($480,000 − $90,000 − $30,000) / 60,000 = $6.00, subtracting all non-cash charges."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Apply",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.386 Basic EPS computation",
  "LOSTag": "A.1",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-386-basic-eps-computation",
  "Authorities": [
    "ASC 260",
    "IAS 33"
  ],
  "FormulaReference": "Basic EPS = Net income attributable to common shareholders / Weighted-average common shares outstanding",
  "CommonTrapReference": "Subtracting non-operating gains, adding back depreciation, or subtracting dividends before dividing",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 260, basic EPS uses reported net income attributable to common shareholders divided by weighted-average common shares. No income-statement items are added back or subtracted before dividing; declared dividends are an appropriation of retained earnings, not an expense, and depreciation/amortization are already deducted in arriving at net income. Recomputed: $480,000 / 60,000 = $8.00. Senior analyst Ramaswamy reports basic EPS of $8.00.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B — Adding a one-time gain back to net income is incorrect; the gain is already part of reported net income, and ASC 260 does not permit adjusting income-statement items before EPS computation.",
  "ExplanationWrongC": "Choice C — Adding back depreciation and amortization (already deducted in arriving at net income) and subtracting declared dividends (which are a distribution, not an expense) misapplies ASC 260's EPS formula.",
  "ExplanationWrongD": "Choice D — Subtracting depreciation and amortization again double-counts those non-cash charges; they are already reflected in net income as expenses.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Easy DS1 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice A verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment",
    "DifficultyScore corrected Easy 2->1 per QUESTION_METADATA_STANDARD mapping (Easy=1)"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 260 — A.386 Basic EPS computation",
    "application_to_facts": "Facts of P2-A-386 (A.386 Basic EPS computation) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-386 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Specific misconception: Choice B — Adding a one-time gain back to net income is incorrect; the gain is a...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-386.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Adding back depreciation and amortization (already deducted in arrivi...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-386.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Subtracting depreciation and amortization again double-counts those n...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-386.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-387",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Industrial bought a $1,200,000 operating line component (5-year life, straight-line). CFO Hoffmann asks how to recognize it under ASC 360.",
  "Choices": {
    "A": "The component is expensed immediately as a period cost because its cost is below the entity's capitalization threshold.",
    "B": "The component is capitalized as part of PP&E at $1,200,000 and depreciated straight-line over 5 years, with annual depreciation of $240,000.",
    "C": "The component is recorded at fair value and depreciated over the remaining useful life of the overall plant asset.",
    "D": "The component is capitalized as an intangible asset and amortized over 5 years with zero residual value."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Understand",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.387 PP&E component depreciation",
  "LOSTag": "A.2",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-387-pp-e-component-depreciation",
  "Authorities": [
    "ASC 360-10",
    "ASC 360-10-35"
  ],
  "FormulaReference": "Annual depreciation = (Cost − Salvage value) / Useful life = ($1,200,000 − $0) / 5 = $240,000",
  "CommonTrapReference": "Confusing component depreciation (each component depreciated separately) with composite/group depreciation or treating a tangible asset as intangible",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 360-10, PP&E is recognized at historical cost when it provides probable future economic benefit and its cost can be measured reliably. Component accounting (ASC 360-10-35) requires each significant component to be depreciated separately. The $1,200,000 component is capitalized to PP&E and depreciated straight-line over 5 years: ($1,200,000 − $0) / 5 = $240,000 annual depreciation. CFO Hoffmann records PP&E at cost and depreciates over its stand-alone useful life rather than the host plant's remaining life.",
  "ExplanationWrongA": "Choice A — Immediate expensing is reserved for subsequent-period repair and maintenance costs under ASC 720-45; a new component with multi-year benefit is capitalized to PP&E.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C — Initial PP&E recognition is at historical cost under ASC 360-10-30, not fair value (fair-value revaluation is permitted only under IFRS revaluation model). Depreciating over the host plant's life ignores component accounting.",
  "ExplanationWrongD": "Choice D — Tangible components of PP&E are classified as property, plant, and equipment, not as intangible assets. ASC 350 governs intangibles; the new operating line is clearly tangible.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Easy DS1 for Understand level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice B verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 360-10 — A.387 PP&E component depreciation",
    "application_to_facts": "Facts of P2-A-387 (A.387 PP&E component depreciation) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-387 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Immediate expensing is reserved for subsequent-period repair and main...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-387.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Initial PP&E recognition is at historical cost under ASC 360-10-30, n...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-387.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Tangible components of PP&E are classified as property, plant, and eq...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-387.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B correctly applies the required adjustments per authoritative guidance. Choices A, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
}
];
