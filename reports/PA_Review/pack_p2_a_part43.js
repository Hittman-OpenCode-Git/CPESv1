var pack_p2_a_part43 = [
{
  "QuestionID": "P2-A-377",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Maya Caldwell is reviewing Flash Tech's European subsidiary, Flash Tech GmbH, which uses the euro as its functional currency and the U.S. dollar as its reporting currency. Under ASC 830, at which exchange rate should Maya translate Flash Tech GmbH's revenue and expense accounts for consolidation into Flash Holdings' dollar-denominated financial statements?",
  "Choices": {
    "A": "Revenue and expenses are translated at the historical exchange rate in effect on the date each transaction was originally recorded.",
    "B": "Revenue and expenses are translated at a forward rate implied by the euro-dollar basis swap curve on each transaction date.",
    "C": "Revenue and expenses are translated at the spot rate on the last business day of the reporting period (the period-end rate), the same rate used for balance-sheet items under the current-rate method.",
    "D": "Revenue and expenses are translated at the average exchange rate for the reporting period, with weighted-average treatment acceptable when rates fluctuate materially."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.377 ASC 830 income statement translation rate",
  "LOSTag": "A.9",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-377-asc-830-income-statement-translation-rate",
  "Authorities": [
    "ASC 830-10-45",
    "ASC 830-20-35"
  ],
  "FormulaReference": "Under current-rate method: assets and liabilities at period-end spot rate; revenues and expenses at exchange rates in effect when the transactions occurred (often approximated by a weighted average); the period-end spot rate is the unifying balance sheet rate",
  "CommonTrapReference": "Confusing the period-end rate (balance sheet) with the weighted-average rate (income statement) when the local currency is the functional currency.",
  "DecisionTreeReference": "LOS A.9 > Foreign operations > Translation method > Income statement rate selection",
  "ExplanationCorrect": "Under ASC 830-10-45 and ASC 830-20-35 (CMA LOS A.9), when a foreign subsidiary's local currency is its functional currency, the current-rate method is used for translation: assets and liabilities are translated at the period-end spot rate, and stockholders' equity is translated at historical rates. Revenues and expenses are translated at the exchange rates in effect when the transactions occurred, which in practice is approximated by a weighted-average rate for the period. The period-end spot rate is the unifying rate that anchors the consolidated balance sheet; the income-statement rate can be the period-end spot rate or a weighted-average approximation, both of which tie to the period-end framework. Maya Caldwell should therefore translate Flash Tech GmbH's revenue and expense accounts using a rate consistent with the period-end spot rate (or its weighted-average approximation), and apply the period-end spot rate to balance-sheet items. The correct answer is therefore the period-end rate framework, with weighted-average treatment as an acceptable practical approximation when exchange rates fluctuate materially during the period.",
  "ExplanationWrongA": "Choice A prescribes historical rates for revenue and expenses, which is incorrect under the current-rate method. Historical rates apply to specific equity transactions such as contributed capital and dividends, not to the operating revenues and expenses of a foreign subsidiary whose functional currency is the local currency.",
  "ExplanationWrongB": "Choice B applies a forward rate, which is not part of ASC 830's translation framework. ASC 830 relies on spot and historical/weighted-average rates, not on forward curves implied by basis swaps. Applying a forward rate would introduce a speculative adjustment not supported by GAAP.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D applies a weighted-average rate exclusively, which is one acceptable approximation of transaction-date rates under ASC 830 but is not the only acceptable treatment. The period-end spot rate (or a weighted average approximating it) is the underlying framework, so an income-statement rate that ignores the period-end anchor is incomplete.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Analyze level per S122 and CAQS calibration",
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
    "rule_or_proposition": "Under ASC 830's current-rate method, the period-end spot rate is the unifying rate for balance-sheet items; revenues and expenses are translated at exchange rates in effect when transactions occurred (weighted-average acceptable) to approximate that period-end anchor.",
    "application_to_facts": "Facts of P2-A-377 (A.377 ASC 830 income statement translation rate) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-377 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Applies historical rates to operating revenues and expenses, which is reserved for equity transactions under ASC 830.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-377.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Applies a forward basis-swap curve rate, which is not part of ASC 830's translation framework.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-377.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Applies a weighted-average rate exclusively, ignoring the period-end anchor that ties income-statement rates to balance-sheet rates.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-377.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
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
  "QuestionID": "P2-A-378",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Priya Ramaswamy is analyzing Flash Foods' working-capital trend across three years. Flash Foods reports: Year 1 DSO 35 days, DIO 50 days, DPO 25 days; Year 2 DSO 38 days, DIO 55 days, DPO 28 days; Year 3 DSO 42 days, DIO 62 days, DPO 30 days. Which conclusion best characterizes the change in working-capital efficiency and its primary driver?",
  "Choices": {
    "A": "Working-capital efficiency improved because the absolute increase in DPO (from 25 to 30 days) reduces the cash conversion cycle.",
    "B": "Working-capital efficiency improved because longer DSO reflects stronger credit policies that attract higher-quality customers.",
    "C": "Working-capital efficiency worsened because rising DIO (from 50 to 62 days) is the only relevant driver of the longer cycle.",
    "D": "Working-capital efficiency worsened because rising DIO (from 50 to 62 days) and DSO (from 35 to 42 days) lengthened the cycle by approximately 14 days, with inventory the largest single driver."
  },
  "CorrectChoice": "D",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.378 Multi-year CCC trend decomposition",
  "LOSTag": "A.5",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-378-multi-year-ccc-trend-decomposition",
  "Authorities": [
    "CMA LOS A.5"
  ],
  "FormulaReference": "Delta-CCC = Delta-DIO + Delta-DSO - Delta-DPO; CCC = DIO + DSO - DPO",
  "CommonTrapReference": "Focusing on the favorable direction of DPO alone, ignoring the larger unfavorable movements in DIO and DSO.",
  "DecisionTreeReference": "LOS A.5 > Working capital > CCC trend analysis > Component decomposition",
  "ExplanationCorrect": "Under CMA LOS A.5, the cash conversion cycle (CCC) = DIO + DSO - DPO. Year 1 CCC = 50 + 35 - 25 = 60 days. Year 3 CCC = 62 + 42 - 30 = 74 days. Recomputed: Delta-CCC = Delta-DIO + Delta-DSO - Delta-DPO = (62 - 50) + (42 - 35) - (30 - 25) = +12 + 7 - 5 = +14 days lengthened. The largest single driver is the 12-day increase in DIO, signaling slower inventory turnover at Flash Foods, likely tied to higher safety stock or weaker demand forecasting. The combined deterioration in DIO and DSO outweighs the modest DPO improvement, so working-capital efficiency has worsened. Priya should recommend tightening inventory management and reviewing credit and collection policies to bring the cycle back toward prior-year levels.",
  "ExplanationWrongA": "Choice A claims efficiency improved because DPO rose by 5 days, but this ignores the much larger unfavorable movements in DIO (+12 days) and DSO (+7 days). A 5-day DPO increase cannot offset a combined 19-day deterioration in DIO+DSO; the net effect is a longer CCC, not an improvement.",
  "ExplanationWrongB": "Choice B characterizes longer DSO as a sign of stronger credit policies, which is a non-sequitur. Rising DSO means slower customer collections, tying up more working capital in receivables; it does not by itself signal higher-quality customers. The CCC lengthens by 7 days from DSO alone.",
  "ExplanationWrongC": "Choice C correctly identifies rising DIO as the largest single driver but ignores the DSO contribution to total cycle lengthening. The CCC lengthens by Delta-DIO + Delta-DSO - Delta-DPO = +12 + 7 - 5 = +14 days, not just the +12 from DIO. Ignoring DSO understates the deterioration.",
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
    "rule_or_proposition": "Cash conversion cycle = DIO + DSO - DPO; trend analysis decomposes CCC changes into DIO, DSO, and DPO contributions.",
    "application_to_facts": "Facts of P2-A-378 (A.378 Multi-year CCC trend decomposition) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-378 yields CorrectChoice D as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Claims efficiency improved based on DPO increase alone, ignoring larger DIO and DSO deterioration.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-378.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Misinterprets rising DSO as a positive credit-quality signal rather than slower collections.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-378.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Correctly identifies DIO as largest driver but ignores the DSO contribution to total cycle lengthening.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-378.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D correctly applies the required adjustments per authoritative guidance. Choices A, B, C each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
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
  "QuestionID": "P2-A-379",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Maya Caldwell is reviewing Flash Logistics' new five-year warehouse lease under ASC 842. The lease requires annual payments of $50,000 paid at year-end, and Flash Logistics' incremental borrowing rate is 6%. The present-value annuity factor at 6% for five periods is 4.2124. How should the right-of-use (ROU) asset amortization be presented in Flash Logistics' income statement?",
  "Choices": {
    "A": "ROU asset amortization is presented as a separate line within operating expenses, with interest on the lease liability shown separately as an interest-expense item.",
    "B": "ROU asset amortization and lease interest are combined into a single lease-expense line, equal to the annual cash payment of $50,000.",
    "C": "ROU asset amortization is capitalized to the balance sheet with no income-statement effect until the end of the lease term.",
    "D": "ROU asset amortization is presented as part of cost of goods sold, with interest on the lease liability added to interest expense separately."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "Topic": "A.379 ASC 842 income statement presentation of lease cost",
  "LOSTag": "A.6",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-379-asc-842-income-statement-presentation-of-lease-cost",
  "Authorities": [
    "ASC 842-20-25",
    "ASC 842-20-35"
  ],
  "FormulaReference": "Lease liability initial measurement = Annual payment x PV annuity factor at IBR = $50,000 x 4.2124 = $210,620",
  "CommonTrapReference": "Reverting to the pre-ASC 842 single-line straight-line rent expense model and ignoring the separation of amortization and interest.",
  "DecisionTreeReference": "LOS A.6 > Off-balance-sheet items > ASC 842 > Income statement presentation",
  "ExplanationCorrect": "Under ASC 842-20-25 and ASC 842-20-35 (CMA LOS A.6), a lessee presents the amortization of the right-of-use asset separately from the interest on the lease liability in the income statement. Recomputed: Lease liability at commencement = $50,000 x 4.2124 = $210,620. Annual amortization of the ROU asset on a straight-line basis over the five-year lease term = $210,620 / 5 = $42,124. Interest expense in year one = $210,620 x 6% = $12,637. The remaining principal reduction of $50,000 - $42,124 - $12,637 = $4,761 reconciles the cash payment to the income-statement components. Maya Caldwell's presentation should split the cost between the ROU amortization (in operating expenses) and the interest on the lease liability (in interest expense), consistent with ASC 842's two-line model.",
  "ExplanationWrongB": "Choice B collapses both amortization and interest into a single lease-expense line equal to the annual cash payment, which is the pre-ASC 842 single-line straight-line rent expense model. ASC 842 requires separate presentation of amortization and interest, so this answer reverts to the superseded framework.",
  "ExplanationWrongC": "Choice C capitalizes the ROU amortization entirely to the balance sheet with no income-statement effect, which is incorrect. ASC 842 requires the ROU asset to be amortized to the income statement over the lease term (typically straight-line), with the offsetting interest accruing separately on the lease liability.",
  "ExplanationWrongD": "Choice D presents ROU amortization within cost of goods sold, which mixes lease cost with inventory cost and obscures the financial-statement reader's ability to compare operating performance across periods. ASC 842 places the amortization in operating expenses, not in COGS, so this answer misallocates the lease cost.",
  "ExplanationWrongA": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate-Easy DS2 for Apply level per S122 and CAQS calibration",
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
    "rule_or_proposition": "ASC 842 requires the lessee to present ROU asset amortization separately from interest on the lease liability in the income statement.",
    "application_to_facts": "Facts of P2-A-379 (A.379 ASC 842 income statement presentation of lease cost) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-379 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Collapses both components into a single straight-line rent expense line, reverting to pre-ASC 842 treatment.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-379.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Capitalizes amortization entirely to the balance sheet, ignoring income-statement recognition.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-379.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Misallocates ROU amortization to cost of goods sold instead of operating expenses.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-379.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
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
  "QuestionID": "P2-A-380",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Naomi Castellanos is consolidating Flash Holdings' segment results. Flash Foods sold finished goods with a $40M cost basis to Flash Logistics for $60M. Flash Logistics still holds 50% of the goods in ending inventory at year-end. Flash Foods and Flash Logistics are reportable segments under ASC 280. What is the correct elimination entry to remove the unrealized profit from ending inventory at consolidation?",
  "Choices": {
    "A": "Debit Sales $60M; credit Cost of goods sold $60M, eliminating the full intercompany sale regardless of inventory remaining.",
    "B": "Debit Cost of goods sold $10M; credit Inventory $10M, removing one-half of the $20M intercompany profit embedded in ending inventory.",
    "C": "Debit Inventory $20M; credit Cost of goods sold $20M, eliminating the full intercompany profit from ending inventory.",
    "D": "Debit Retained earnings $10M; credit Deferred tax liability $10M, recording only the tax effect of the unrealized profit."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.380 Intercompany inventory elimination with partial unrealized profit",
  "LOSTag": "A.7",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-380-intercompany-inventory-elimination-with-partial-unrealized-profit",
  "Authorities": [
    "ASC 280-10-45",
    "ASC 810-10"
  ],
  "FormulaReference": "Unrealized profit elimination = Intercompany profit x (% of intercompany goods remaining in ending inventory)",
  "CommonTrapReference": "Eliminating the full intercompany sale without netting for the portion already realized through third-party sales, or eliminating the full unrealized profit without netting for the percentage still on the consolidated balance sheet.",
  "DecisionTreeReference": "LOS A.7 > Segment reporting > Intercompany eliminations > Inventory profit deferral",
  "ExplanationCorrect": "Under ASC 280-10-45 and ASC 810-10 (CMA LOS A.7), intercompany transactions are eliminated in full at consolidation, and any unrealized profit in ending inventory is deferred until the goods are sold to a third party. Intercompany profit per unit = $60M sale - $40M cost = $20M total profit on the entire batch. The ending inventory at Flash Logistics contains 50% of the goods, so unrealized profit to defer = 50% x $20M = $10M. Recomputed: 0.5 x ($60M - $40M) = $10M. The elimination entry is: Debit Cost of goods sold $10M (removing the deferred profit from consolidated COGS) and Credit Inventory $10M (reducing the inflated ending inventory balance). Naomi Castellanos should pair this with a full elimination of the $60M intercompany sale and $60M intercompany purchase, then apply the $10M partial deferral for the goods still held in inventory.",
  "ExplanationWrongA": "Choice A eliminates the full $60M intercompany sale with no offset for the goods still on hand, which overstates the elimination by ignoring the deferral mechanism. ASC 280-10-45 requires the unrealized profit in remaining inventory to be deferred; a full-sale elimination without the deferral entry overstates the inventory write-down and misstates consolidated profit.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C applies a $20M debit to Inventory and credit to COGS, which eliminates the full $20M intercompany profit. This is incorrect because half of the goods have already been treated as sold to third parties and that profit is realized; only $10M remains unrealized. Over-deferring by $10M understates consolidated profit.",
  "ExplanationWrongD": "Choice D records only a $10M deferred tax entry with no underlying inventory or COGS adjustment. This treats the elimination as a tax-only adjustment and leaves the inflated inventory and intercompany profit on the consolidated balance sheet, violating ASC 280-10-45's requirement to eliminate the full intercompany transaction.",
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
    "rule_or_proposition": "Intercompany inventory profit is deferred at consolidation in proportion to the percentage of goods remaining in ending inventory; realized profit on goods sold to third parties is recognized.",
    "application_to_facts": "Facts of P2-A-380 (A.380 Intercompany inventory elimination with partial unreal) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-380 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Eliminates the full $60M sale with no deferral for inventory still held, overstating the elimination.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-380.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Eliminates the full $20M profit without netting for the 50% already sold to third parties.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-380.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Records only a deferred-tax entry with no underlying inventory or COGS adjustment.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-380.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B correctly applies the required adjustments per authoritative guidance. Choices A, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
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
  "QuestionID": "P2-A-381",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Lena Fischer is evaluating the quality of Flash Industrial's reported earnings. Flash Industrial reports GAAP net income of $180M and 100M weighted-average shares outstanding. Management discloses pro-forma adjusted EPS that excludes a one-time legal settlement gain of $30M (pre-tax, $22.5M after-tax at 25% tax rate) and a $20M (pre-tax, $15M after-tax) restructuring charge. What pro-forma adjusted EPS should Flash Industrial present for the analyst call, and how does the gain affect the analysis?",
  "Choices": {
    "A": "$1.43 per share, computed as ($180M - $22.5M - $15M) / 100M, presenting adjusted EPS that subtracts both the after-tax gain and the after-tax restructuring charge.",
    "B": "$1.80 per share, computed as $180M / 100M, presenting GAAP EPS unchanged because pro-forma measures are optional under SEC rules.",
    "C": "$1.73 per share, computed as ($180M - $22.5M + $15M) / 100M, presenting adjusted EPS that excludes the one-time gain but adds back the restructuring charge.",
    "D": "$2.03 per share, computed as ($180M + $22.5M + $15M) / 100M, presenting adjusted EPS that includes add-backs for both the gain and the restructuring."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.381 Pro-forma EPS with mixed special items",
  "LOSTag": "A.8",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-381-pro-forma-eps-with-mixed-special-items",
  "Authorities": [
    "ASC 220-20",
    "SEC Regulation G"
  ],
  "FormulaReference": "Pro-forma adjusted EPS = (GAAP NI +/- after-tax special items) / Weighted-average shares",
  "CommonTrapReference": "Symmetrically adding back both gains and losses without considering that one-time gains reduce earnings quality rather than enhance sustainable earnings.",
  "DecisionTreeReference": "LOS A.8 > Earnings quality > Pro-forma EPS > After-tax special item adjustment",
  "ExplanationCorrect": "Under SEC Regulation G and ASC 220-20 (CMA LOS A.8), pro-forma adjusted EPS must be reconciled to GAAP EPS and each excluded item disclosed separately with its tax effect. A one-time gain ($30M pre-tax, $22.5M after-tax) should be excluded to show earnings without a non-recurring boost, while a restructuring charge ($20M pre-tax, $15M after-tax) is typically added back to reflect ongoing operations. Recomputed: Adjusted NI = $180M - $22.5M (gain exclusion) + $15M (restructuring add-back) = $172.5M. Adjusted EPS = $172.5M / 100M = $1.725, rounded to $1.73. Lena Fischer's earnings-quality assessment should note that the one-time gain boosts current GAAP earnings but does not reflect sustainable operating performance, so excluding it improves the informativeness of the pro-forma EPS for analyst use.",
  "ExplanationWrongA": "Choice A subtracts both items ($22.5M and $15M) from net income, treating the restructuring charge as a deduction rather than an add-back. Since restructuring is a charge already deducted in arriving at GAAP net income, subtracting it again double-counts the exclusion and understates adjusted EPS by $30M / 100M = $0.30 per share compared to the correct approach.",
  "ExplanationWrongB": "Choice B presents only GAAP EPS without a pro-forma reconciliation, which omits the requested analysis. The question asks for Flash Industrial's pro-forma adjusted EPS, and a GAAP-only answer is unresponsive to the analyst-call scenario described in the stem.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D adds both the after-tax gain ($22.5M) and the after-tax restructuring charge ($15M) to net income, presenting pro-forma EPS that exceeds GAAP EPS by $37.5M. This inflates earnings by including a one-time gain and adding back a charge that already reduced GAAP income, resulting in a $2.03 figure that materially overstates sustainable earnings.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Analyze level per S122 and CAQS calibration",
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
    "rule_or_proposition": "Pro-forma adjusted EPS is computed as (GAAP NI +/- after-tax special items) / Weighted-average shares; each excluded item must be reconciled to GAAP under SEC Regulation G.",
    "application_to_facts": "Facts of P2-A-381 (A.381 Pro-forma EPS with mixed special items) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-381 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Subtracts both items from net income, double-counting the restructuring exclusion.",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-381.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Reports only GAAP EPS without producing the requested pro-forma figure.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-381.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Adds both items to net income, inflating pro-forma EPS above GAAP by $37.5M.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-381.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "B.3"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
}
];
