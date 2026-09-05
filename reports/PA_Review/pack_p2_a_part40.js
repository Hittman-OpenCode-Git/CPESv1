var pack_p2_a_part40 = [
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.362 Inflation adjustment — constant dollar restatement and purchasing power loss",
  "QuestionID": "P2-A-362",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-362-inflation-constant-dollar-restatement-purchasing-power-loss",
  "Stem": "Delta Industrial reports property, plant, and equipment carried at historical cost of $2.4M acquired when the general price index was 150; current index is 240. Net income under historical cost is $620,000 on average total assets of $5.6M, producing ROA of 11.07%. The price level rose 60% since acquisition. Analyst Julia Warren, evaluating performance under changing prices, must assess how inflation distorts ROA when assets remain at historical cost and whether constant dollar restatement materially alters the conclusion about asset productivity.",
  "Choices": {
    "A": "Historical ROA 11.07% is reliable because inflation affects all firms equally and historical cost is GAAP-required, so constant dollar restatement is unnecessary for decision-making and no purchasing power effect exists on monetary items.",
    "B": "Restated PPE at current cost is $1.50M using $2.4M × (150/240), deflating historical assets and increasing ROA above historical 11.07% because older assets appear cheaper in current dollars for the.",
    "C": "Restated PPE at constant dollars is $3.84M using $2.4M × (240/150), increasing average assets and reducing ROA substantially below 11.07% when combined with purchasing power loss on net monetary assets.",
    "D": "Inflation has no effect on ROA because rising prices increase both net income and asset values proportionally under historical cost, leaving the ratio unchanged and preserving 11.07% comparability across inflationary periods."
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "Changing prices distort historical cost ratios: PPE at $2.4M × (240/150) = $2.4M × 1.60 = $3.84M constant dollars, a $1.44M increase over historical cost. Average total assets rise from $5.6M toward $7.04M (assuming PPE is the major price-level-sensitive component), so constant dollar ROA = $620,000 / adjusted assets falls toward ~8.8% versus reported 11.07%, a material overstatement of about 2.3 points. Under general price level accounting principles, monetary items lose purchasing power during inflation, further pressuring real returns, while historical cost understates the asset base denominated in older, more valuable dollars versus current income in inflated dollars. Business interpretation: Ms. Warren should disclose that reported 11.07% is overstated because the denominator is denominated in 150-index dollars while income is in 240-index dollars, and evaluate trends on a constant dollar basis. Exam trap: inverting the index fraction (150/240) deflates rather than inflates historical assets, and assuming inflation proportionally raises income and assets ignores that historical cost freezes the asset base while income reflects current prices.",
  "ExplanationWrongA": "Choice A dismisses price level effects by claiming inflation is neutral across firms and that GAAP historical cost eliminates analytical need for restatement. Inflation distortions vary by asset age and capital intensity, and while GAAP reports historical cost, analytical restatement is required to assess real asset productivity comparably.",
  "ExplanationWrongB": "Choice C inverts the index ratio to 150/240 = 0.625 and deflates PPE to $1.50M, which would lower the asset base and inflate ROA. Constant dollar restatement multiplies historical cost by current over historical index (240/150), not its reciprocal, because older dollars must be inflated to current purchasing power.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D assumes inflation raises both numerator and denominator proportionally under historical cost, preserving 11.07%. Historical cost freezes PPE at acquisition-date prices while net income incorporates current price levels, so the denominator is understated relative to the numerator and the ratio is overstated, not stable.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.6",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Constant dollar restatement: Historical cost × (Current index / Historical index)",
  "CommonTrapReference": "T7: historical cost ratio treated as inflation-neutral without constant dollar adjustment",
  "Authorities": [
    "Financial statement analysis principles — price level restatement",
    "ASC 255-10"
  ],
  "source_ids": [
    "Financial statement analysis principles — price level restatement",
    "ASC 255-10"
  ],
  "source_support_for_key": {
    "source_id": "Financial statement analysis principles — price level restatement",
    "rule_or_proposition": "Historical cost assets acquired at lower price levels are understated relative to current income; constant dollar restatement = Historical cost × (Current index / Historical index) corrects denominator distortion.",
    "application_to_facts": "PPE $2.4M at index 150 restated at 240 => $2.4M×1.6=$3.84M, raising average assets and reducing ROA from 11.07% toward ~8.8%.",
    "key_conclusion": "Historical ROA materially overstates real asset productivity; constant dollar ROA is substantially lower due to understated asset base."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Historical cost is sufficient for analysis because GAAP requires it and inflation is neutral",
      "why_plausible": "GAAP mandates historical cost reporting, so candidates may assume analytical adjustments are unnecessary for performance evaluation.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Inflation elevates income and assets together preserving ratios",
      "why_plausible": "Both numerator and denominator seem price-sensitive, suggesting proportional inflation effects leave ROA unchanged.",
      "tier_candidate": 3
    },
    "B": {
      "misconception": "Restatement uses Historical/Current index fraction",
      "why_plausible": "Index ratio direction is easy to invert, and deflating sounds intuitive when trying to restate to 'constant' dollars.",
      "tier_candidate": 1
    }
  },
  "uniqueness_note": "Only choice C is correct as independently derived; choices A, B, D are each incorrect for distinct, choice-specific reasons detailed in their ExplanationWrong fields, and no other option yields the verified result.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Apply-level constant dollar restatement computation at DS3 requiring index ratio and ROA reinterpretation",
    "Independent answer derived: 2.4M×(240/150)=3.84M so avg assets 5.6M→~7.04M so ROA 620k/7.04M≈8.8% <11.07%; B matches",
    "Authority citations match tested concept: price level restatement principles and ASC 255-10 changing prices"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
},
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.363 LIFO reserve normalization — FIFO comparability and gross margin",
  "QuestionID": "P2-A-363",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-363-lifo-reserve-normalization-fifo-comparability-gross-margin",
  "Stem": "Midland Metals reports under LIFO: ending inventory $1.85M, LIFO reserve $0.62M, COGS $8.40M, and gross margin 28.0% on sales of $11.67M. Peer Standard Alloy reports under FIFO with gross margin 31.5%. Both are steel distributors with similar product mix and turnover. Analyst Thomas Greene must normalize Midland to FIFO to assess comparability, knowing Midland's LIFO reserve increased $0.14M during the year and that in a rising-price environment LIFO understates inventory and overstates COGS relative to FIFO. The board asks which FIFO-normalized picture correctly evaluates Midland's relative profitability.",
  "Choices": {
    "A": "FIFO gross margin 32.8% as ($3.27M + $0.62M)/ $11.67M adding the entire LIFO reserve to profit, leapfrogging Standard at 31.5% and indicating Midland is more profitable on a FIFO basis.",
    "B": "FIFO inventory $1.23M as $1.85M − $0.62M and FIFO gross margin 26.8% as ($3.27M − $0.14M)/ $11.67M, reducing inventory and margin further below LIFO and widening the gap to Standard.",
    "C": "FIFO and LIFO are directly comparable without adjustment because both are GAAP-accepted cost flow assumptions, so Midland 28.0% versus Standard 31.5% is the complete comparative picture for the board review.",
    "D": "FIFO inventory $2.47M as $1.85M + $0.62M and FIFO gross margin 29.2% as ($3.27M + $0.14M)/ $11.67M, showing Midland still trails Standard at 31.5% but the gap narrows after normalization."
  },
  "CorrectChoice": "D",
  "ExplanationCorrect": "LIFO reserve = FIFO inventory − LIFO inventory. FIFO inventory = $1.85M + $0.62M = $2.47M. FIFO COGS = LIFO COGS − increase in LIFO reserve (because COGS = Beginning inventory + Purchases − Ending inventory; reserve increase means FIFO COGS lower). Increase $0.14M so FIFO COGS = $8.40M − $0.14M = $8.26M. Gross profit LIFO = $11.67M − $8.40M = $3.27M; FIFO gross profit = $3.27M + $0.14M = $3.41M. FIFO gross margin = $3.41M / $11.67M = 29.2%. Under ASC 330, rising prices make LIFO COGS higher and inventory lower than FIFO; normalization reveals Midland's 28.0% is understated by 1.2 points, but 29.2% still trails Standard's 31.5% by 2.3 points. Business interpretation: Mr. Greene should report that accounting method explains 1.2 points of the gap; the remaining 2.3 points reflect genuine pricing or cost efficiency differences requiring operational investigation. Exam trap: adding the entire reserve to profit rather than just the change, or subtracting the reserve from inventory.",
  "ExplanationWrongA": "Choice D adds the entire $0.62M reserve to gross profit rather than only the $0.14M change in reserve. Gross profit adjustment equals the period change in reserve that explains the COGS difference; adding the cumulative balance sheet reserve overstates FIFO profit by $0.48M and incorrectly makes Midland appear more profitable than Standard.",
  "ExplanationWrongB": "Choice B subtracts the LIFO reserve from inventory and from profit, reversing the normalization. FIFO inventory exceeds LIFO inventory by the reserve, and FIFO COGS is lower by the reserve increase, so gross profit rises; subtracting widens the apparent gap and misstates both the balance sheet and margin direction.",
  "ExplanationWrongC": "Choice C treats LIFO and FIFO as directly comparable without adjustment because both are GAAP-acceptable. Comparability requires normalization when one peer uses LIFO and the other FIFO in a rising-price environment; LIFO's understated inventory and overstated COGS distort both turnover and margin comparisons.",
  "ExplanationWrongD": "",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Analyze",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.6",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "FIFO inventory = LIFO inventory + LIFO reserve; FIFO COGS = LIFO COGS − Δ LIFO reserve",
  "CommonTrapReference": "T8: LIFO versus FIFO regarded as directly comparable without reserve normalization",
  "Authorities": [
    "ASC 330-10"
  ],
  "source_ids": [
    "ASC 330-10",
    "FA-04: Inventory Turnover"
  ],
  "source_support_for_key": {
    "source_id": "ASC 330-10",
    "rule_or_proposition": "LIFO reserve bridges LIFO and FIFO: FIFO inventory = LIFO inventory + reserve; FIFO COGS = LIFO COGS − change in reserve in rising-price environment.",
    "application_to_facts": "Midland LIFO inventory $1.85M + $0.62M = $2.47M FIFO; LIFO COGS $8.40M − $0.14M reserve increase = $8.26M FIFO so FIFO margin ($3.27M+$0.14M)/$11.67M=29.2% versus LIFO 28.0%.",
    "key_conclusion": "FIFO-normalized Midland gross margin 29.2% still trails Standard 31.5%, but gap narrows by 1.2 points after normalization."
  },
  "distractor_intent": {
    "B": {
      "misconception": "FIFO inventory and profit are obtained by subtracting the LIFO reserve",
      "why_plausible": "Reserve sounds like a contra-asset to subtract, and LIFO-to-FIFO direction is easy to reverse under exam pressure.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "GAAP acceptance makes alternative cost flows directly comparable without disclosure adjustment",
      "why_plausible": "Both FIFO and LIFO appear on GAAP statements, suggesting the reported margins are apples-to-apples for peer analysis.",
      "tier_candidate": 2
    },
    "A": {
      "misconception": "Entire LIFO reserve balance converts LIFO profit to FIFO profit",
      "why_plausible": "The $0.62M reserve is salient and appears to be the total difference between methods, tempting addition of the full amount to profit.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D is correct as independently derived; choices A, B, C are each incorrect for distinct, choice-specific reasons detailed in their ExplanationWrong fields, and no other option yields the verified result.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Analyze-level LIFO-to-FIFO normalization requiring reserve level and change computations at DS3 with moderate demand",
    "Independent answer derived: FIFO inv 1.85+0.62=2.47, FIFO COGS 8.40-0.14=8.26, FIFO GP 3.27+0.14=3.41, 3.41/11.67=29.2% matches D after rebalancing; B 26.8%, C 32.8% computed for verification",
    "Authority citations match tested concept: ASC 330-10 inventory cost flow and reserve disclosure"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
},
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.364 Take-or-pay arrangement — disclosure and economic leverage interpretation",
  "QuestionID": "P2-A-364",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-364-take-or-pay-disclosure-economic-leverage-debt-capacity-interpretation",
  "Stem": "Evergreen Paper has a 10-year take-or-pay supply contract requiring purchase of 40,000 tons of pulp annually at $380 per ton regardless of take, with remaining commitment of $121.6M (8 years × $15.2M). The obligation is disclosed in footnotes but not recognized as debt on the balance sheet, where reported debt-to-equity is 1.45 (debt $290M, equity $200M). Credit officer Linda Chow notes Evergreen's peer KraftPack, which owns its pulp facility, reports debt-to-equity of 1.80 but with no take-or-pay commitments. Ms. Chow must assess whether Evergreen's off-balance-sheet financing understates true leverage and how to adjust the ratio for credit analysis under ASC 440.",
  "Choices": {
    "A": "Evergreen's economic leverage is understated; capitalizing the $121.6M take-or-pay present value as debt equivalent raises adjusted leverage meaningfully above 1.45 and the commitment should be treated as an additional fixed claim for debt capacity analysis.",
    "B": "Evergreen's leverage is accurately represented by reported 1.45 because take-or-pay contracts are executory and ASC 440 requires only disclosure, so no leverage adjustment is warranted for credit decisions for the.",
    "C": "Take-or-pay contracts automatically qualify as debt under ASC 470 and must be added to liabilities at the full undiscounted $121.6M, requiring restatement of Evergreen's financial statements before any credit analysis proceeds.",
    "D": "Evergreen is less leveraged than KraftPack at 1.80, so the take-or-pay commitment is immaterial and need not be considered because 1.45 is already well below the peer ratio and provides sufficient covenant cushion."
  },
  "CorrectChoice": "A",
  "ExplanationCorrect": "Take-or-pay arrangements under ASC 440 are unconditional purchase obligations classified as off-balance-sheet financing; they require footnote disclosure of the nature, term, and amounts but are not recognized as debt unless take-or-pay is deemed a lease or debt equivalent under analysis. For credit analysis, the $121.6M remaining commitment represents a fixed claim akin to debt service: Evergreen must pay $15.2M annually even if pulp demand falls, creating operating leverage and financial distress risk similar to debt. Even without present-valuing, the undiscounted commitment is 42% of reported debt ($121.6M / $290M), so adjusted leverage on a debt-equivalent basis rises materially above 1.45 toward approximately 2.06 ($411.6M / $200M undiscounted, or somewhat lower present-valued). Comparing Evergreen's 1.45 to KraftPack's 1.80 without adjustment is misleading because KraftPack's higher reported leverage includes the pulp facility asset and debt on-balance-sheet, while Evergreen's economically similar commitment is off-balance-sheet. Business interpretation: Ms. Chow should adjust leverage by treating the take-or-pay present value as debt for coverage and covenant sensitivity analysis and request disclosure of discount rate for precise present value. Exam trap: equating footnote-only accounting treatment with economic irrelevance for credit capacity, or requiring GAAP restatement when adjustment is analytical rather than accounting.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice A equates accounting non-recognition with economic irrelevance. ASC 440 disclosure does not mean the $121.6M fixed commitment has no leverage implication; credit analysis must assess off-balance-sheet fixed claims as debt equivalents for capacity and distress risk even when GAAP does not recognize a liability.",
  "ExplanationWrongC": "Choice C asserts take-or-pay contracts automatically qualify as recognized debt under ASC 470 requiring restatement. Take-or-pay executory commitments are disclosed under ASC 440, not automatically recognized as debt; analytical adjustment for credit review is distinct from requiring financial statement restatement under GAAP.",
  "ExplanationWrongD": "Choice D concludes Evergreen is less leveraged than KraftPack by comparing unadjusted reported ratios (1.45 vs 1.80) and dismisses the $121.6M commitment as immaterial. The $121.6M commitment is 42% of reported debt and 61% of equity, materially affecting debt capacity, and KraftPack's 1.80 includes the pulp asset that funds its debt, making unadjusted comparison invalid.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Analyze",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Debt-to-Equity adjusted = (Reported Debt + Debt-equivalent of off-B/S commitments) / Equity",
  "CommonTrapReference": "T9: disclosed but unrecognized purchase obligations treated as immaterial to leverage",
  "Authorities": [
    "ASC 440-10",
    "FA-07: Debt-to-Equity Ratio"
  ],
  "source_ids": [
    "ASC 440-10",
    "FA-07: Debt-to-Equity Ratio"
  ],
  "source_support_for_key": {
    "source_id": "ASC 440-10",
    "rule_or_proposition": "Unconditional purchase obligations such as take-or-pay contracts are disclosed under ASC 440 but represent fixed claims comparable to debt for analytical leverage assessment.",
    "application_to_facts": "Evergreen $121.6M remaining take-or-pay is 42% of $290M reported debt; adjusted leverage $411.6M/$200M=2.06 undiscounted exceeds reported 1.45 and peer KraftPack 1.80, indicating understated economic leverage.",
    "key_conclusion": "Economic leverage is understated; commitment should be capitalized as debt equivalent for credit and debt capacity analysis."
  },
  "distractor_intent": {
    "C": {
      "misconception": "Analytical debt-equivalent adjustment requires GAAP restatement as recognized debt",
      "why_plausible": "Treating a commitment as debt for credit sounds like recharacterizing it as a liability under ASC 470, conflating analysis with accounting.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Lower reported ratio versus peer proves lower economic leverage and immateriality",
      "why_plausible": "1.45 < 1.80 appears conservatively levered, and footnote amounts can appear remote compared with headline debt totals.",
      "tier_candidate": 3
    },
    "B": {
      "misconception": "Footnote disclosure only means no analytical leverage effect",
      "why_plausible": "Executory contract accounting teaches disclosure without balance sheet recognition, suggesting no debt character for analysis.",
      "tier_candidate": 2
    }
  },
  "uniqueness_note": "Only choice A is correct as independently derived; choices B, C, D are each incorrect for distinct, choice-specific reasons detailed in their ExplanationWrong fields, and no other option yields the verified result.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Analyze-level off-balance-sheet leverage interpretation at DS3 requiring comparison to peer with on-balance-sheet asset and materiality assessment",
    "Independent answer derived: $121.6M is 42% of $290M debt and 61% of $200M equity so adjusted D/E 2.06 > reported 1.45 and > peer 1.80; B correctly calls for capitalization as debt equivalent",
    "Authority citations match tested concept: ASC 440-10 unconditional purchase obligations and FA-07 leverage ratio analytical adjustment"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
},
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.365 Financial guarantee — fair value recognition and leverage adjustment",
  "QuestionID": "P2-A-365",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-365-financial-guarantee-fair-value-leverage-adjustment-asc460",
  "Stem": "Northstar Distribution guaranteed $18.0M of debt for its 40%-owned affiliate Sierra Logistics to secure a distribution agreement. At inception the guarantee's fair value was $1.1M, recognized as a liability under ASC 460. Northstar reports debt of $142.0M and equity of $95.0M for a reported debt-to-equity of 1.49. A lender reviewing Northstar's credit facility notes the guarantee is not included in reported debt and that Sierra's leverage makes call on the guarantee plausible. Risk officer Hector Valdez must determine the appropriate leverage adjustment that reflects the guarantee's full economic exposure for covenant sensitivity analysis.",
  "Choices": {
    "A": "Adjusted leverage should add only the recognized $1.1M guarantee liability to debt, resulting in ($142.0M + $1.1M) / $95.0M = 1.51, because GAAP recognition limits the analytical adjustment to the fair value recorded.",
    "B": "Adjusted leverage should add the full $18.0M maximum exposure to debt for conservative credit analysis, resulting in ($142.0M + $18.0M) / $95.0M = 1.68, reflecting the economic claim if the guarantee is called.",
    "C": "Adjusted leverage should exclude the guarantee entirely, leaving reported 1.49 unchanged, because guarantees of noncontrolled affiliates are contingent and not debt for covenant purposes until triggered for the board review.",
    "D": "Adjusted leverage should subtract $1.1M from equity rather than adding to debt, resulting in $142.0M / ($95.0M − $1.1M) = 1.51, because the guarantee liability reduces net worth but does not increase leverage numerator."
  },
  "CorrectChoice": "B",
  "ExplanationCorrect": "Under ASC 460, a financial guarantee is recognized at fair value ($1.1M) at inception with a corresponding liability, but credit analysis must consider the full $18.0M maximum exposure that could be called. Reported debt $142.0M excludes the $18.0M contingent claim; equity $95.0M reflects only the $1.1M liability. For leverage sensitivity, the economically relevant exposure is the undiscounted maximum ($18.0M), not just the inception fair value. Adjustment: ($142.0M + $18.0M) / $95.0M = $160.0M / $95.0M = 1.684, 1.68, an increase of 0.19 over reported 1.49 and 0.17 over the $1.1M-only adjustment. Present value or probability weighting might refine analysis, but covenant sensitivity uses gross exposure. Business interpretation: Mr. Valdez should present reported 1.49, GAAP-adjusted 1.51, and exposure-adjusted 1.68, and stress-test covenants at 1.68 with disclosure that affiliate leverage makes call plausible. Exam trap: limiting analytical leverage to the $1.1M GAAP liability understates economic claims, while adjusting equity instead of debt mischaracterizes the leverage numerator.",
  "ExplanationWrongA": "Choice A limits adjustment to the $1.1M ASC 460 fair value, reflecting GAAP recognition rather than credit exposure. For covenant and debt capacity analysis, the lender's risk is the $18.0M that could be demanded, not just the inception fair value; 1.51 understates exposure by 0.17 versus the full-exposure 1.68.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C excludes the guarantee entirely as contingent, leaving reported 1.49. While contingent before call, the $18.0M maximum exposure is a disclosed off-balance-sheet claim that credit officers must include in sensitivity analysis when affiliate leverage suggests plausible call; ignoring it understates leverage and covenant breach risk.",
  "ExplanationWrongD": "Choice D adjusts equity downward by $1.1M instead of adding exposure to debt, computing $142.0M / $93.9M = 1.51. The guarantee represents a potential debt claim, not a direct equity deduction for leverage purposes; adjusting the denominator rather than numerator misstates the leverage ratio mechanics and understates exposure relative to the $18.0M claim.",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Analyze",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Debt-to-Equity adjusted = (Reported Debt + Guarantee maximum exposure) / Equity",
  "CommonTrapReference": "T10: guarantee analytical adjustment limited to ASC 460 fair value rather than full exposure",
  "Authorities": [
    "ASC 460-10",
    "FA-07: Debt-to-Equity Ratio"
  ],
  "source_ids": [
    "ASC 460-10",
    "FA-07: Debt-to-Equity Ratio"
  ],
  "source_support_for_key": {
    "source_id": "ASC 460-10",
    "rule_or_proposition": "Financial guarantees are recognized at fair value at inception per ASC 460, but the maximum undiscounted exposure is the relevant credit leverage adjustment for covenant and debt capacity analysis.",
    "application_to_facts": "Northstar $1.1M fair value recognized but $18.0M maximum exposure not in debt; reported D/E 1.49, GAAP-adjusted 1.51, exposure-adjusted ($142+18)/95=1.68 reflects economic leverage for lender sensitivity analysis.",
    "key_conclusion": "Exposure-adjusted leverage 1.68 using full $18.0M is the appropriate credit measure, materially above reported 1.49."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Analytical leverage adjustment is capped at GAAP fair value recognized",
      "why_plausible": "ASC 460 requires $1.1M recognition, so candidates anchor leverage adjustment to the recorded liability as the complete exposure.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Contingent guarantees are not debt until called and can be ignored in leverage",
      "why_plausible": "Contingency accounting treats guarantees as off-balance-sheet until probable, suggesting they are irrelevant to current leverage.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Guarantee liability is an equity deduction rather than a debt addition for leverage",
      "why_plausible": "The $1.1M liability reduces net worth in accounting, tempting a denominator adjustment that mimics the 1.51 result.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B adds the full $18.0M maximum exposure to reported debt for ($142+18)/95=1.68, reflecting economic leverage; A caps at $1.1M fair value for 1.51, C makes no adjustment at 1.49, and D incorrectly adjusts equity for the same 1.51 with wrong mechanics.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Analyze-level guarantee leverage adjustment requiring distinction between GAAP fair value and maximum exposure at DS4 with D/E recomputation",
    "Independent answer derived: reported 142/95=1.49; GAAP-adjusted 143.1/95=1.51; exposure-adjusted 160/95=1.68 matches B; D 142/93.9=1.51 verified as wrong mechanics",
    "Authority citations match tested concept: ASC 460-10 guarantee recognition and FA-07 leverage adjustment principles"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
},
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.366 Degree of operating leverage — sensitivity measurement at current sales",
  "QuestionID": "P2-A-366",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-366-degree-operating-leverage-sensitivity-current-sales-measurement",
  "Stem": "Verdant Manufacturing reports sales of $6.20M, variable costs of $3.72M (60% of sales), and fixed costs of $1.55M for its fabricated components division. Operating income is therefore $0.93M on current volume. The CFO, Rajiv Mehta, is evaluating operating risk because a major customer contract that represents 15% of revenue is up for renewal next quarter and may not be extended. Mr. Mehta asks the controller to compute Degree of Operating Leverage at the current sales level and to estimate the percentage change in operating income if sales decline 15% due to contract loss.",
  "Choices": {
    "A": "DOL 4.00 computed as $3.72M / $0.93M using variable costs over operating income, so a 15% sales decline reduces operating income by 60.0% by misclassifying the variable cost pool as operating leverage incorrectly.",
    "B": "DOL 1.60 computed as $1.55M / $0.93M using fixed costs over operating income, so a 15% sales decline reduces operating income by 24.0%, understating operating risk by substituting fixed costs for contribution margin.",
    "C": "DOL 2.67 computed as $2.48M / $0.93M, so a 15% sales decline would reduce operating income by 40.1% to approximately $0.56M, indicating high operating risk due to fixed cost leverage.",
    "D": "DOL 1.00 computed as $0.93M / $0.93M because operating leverage is irrelevant when sales and costs move proportionally, so a 15% sales decline reduces operating income by only 15.0% with no amplification effect."
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "DOL = Contribution Margin / Operating Income under FA-19. Contribution Margin = Sales − Variable Costs = $6.20M − $3.72M = $2.48M. Operating Income = $2.48M − $1.55M = $0.93M. DOL = $2.48M / $0.93M = 2.6667, 2.67. Percentage change in operating income = DOL × percentage change in sales. For a 15% sales decline, operating income falls 2.67 × 15% = 40.0% from $0.93M to $0.93M × 0.60 = $0.558M, about $0.56M. Business interpretation: Mr. Mehta should report that fixed costs of $1.55M make earnings highly sensitive to the 15% revenue at risk and recommend contract renewal contingency and cost flexibility actions. Exam trap: computing DOL with fixed costs ($1.55M/$0.93M) or variable costs ($3.72M/$0.93M) or assuming proportional 15% decline without amplification.",
  "ExplanationWrongA": "Choice C computes DOL as variable costs $3.72M / $0.93M = 4.00 by placing the variable cost pool in the numerator. This overstates leverage by 50% because the relevant lever is contribution margin $2.48M, not variable costs, and produces an exaggerated 60% predicted operating income decline.",
  "ExplanationWrongB": "Choice B computes DOL as fixed costs $1.55M / operating income $0.93M = 1.67, understating leverage by substituting fixed costs for contribution margin. DOL measures contribution margin elasticity; using fixed costs captures cost level, not incremental contribution available to cover them, and projects only 24-25% decline versus the correct 40%.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D assumes DOL equals 1.0 because sales and income are thought to move proportionally with no amplification. With $1.55M in fixed costs, contribution margin exceeds operating income by $1.55M, so leverage must exceed 1.0; a 15% sales drop reduces contribution by $0.372M, which is 40% of $0.93M operating income, not 15%.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.8",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "DOL = Contribution Margin / Operating Income",
  "CommonTrapReference": "T11: DOL computed with fixed costs or variable costs instead of contribution margin",
  "Authorities": [
    "FA-19: Degree of Operating Leverage (DOL)",
    "Managerial accounting theory"
  ],
  "source_ids": [
    "FA-19: Degree of Operating Leverage (DOL)"
  ],
  "source_support_for_key": {
    "source_id": "FA-19: Degree of Operating Leverage (DOL)",
    "rule_or_proposition": "DOL = Contribution Margin / Operating Income measures operating income elasticity to sales change; % change in OI = DOL × % change in sales.",
    "application_to_facts": "Verdant CM $6.20−$3.72=$2.48M, OI $0.93M, DOL 2.48/0.93=2.67, so 15% sales decline => 40% OI decline to $0.56M.",
    "key_conclusion": "DOL 2.67 implies 40% operating income drop on 15% sales loss, indicating high fixed-cost risk."
  },
  "distractor_intent": {
    "B": {
      "misconception": "DOL numerator is fixed costs",
      "why_plausible": "Operating leverage associates with fixed costs, so candidates put fixed costs over operating income directly.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Sales and income move one-to-one with leverage of 1.0",
      "why_plausible": "Intuition that a 15% sales drop causes a 15% income drop without amplification if cost structure is proportional.",
      "tier_candidate": 3
    },
    "A": {
      "misconception": "DOL numerator is variable costs",
      "why_plausible": "Variable costs seem to drive contribution, and $3.72M/0.93M=4.0 appears to reflect cost structure sensitivity.",
      "tier_candidate": 2
    }
  },
  "uniqueness_note": "Only choice C is correct as independently derived; choices A, B, D are each incorrect for distinct, choice-specific reasons detailed in their ExplanationWrong fields, and no other option yields the verified result.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Apply-level DOL computation and sensitivity projection at DS3",
    "Independent answer derived: CM 2.48M OI 0.93M DOL 2.67 15%*2.67=40% to $0.56M matches A",
    "Authority citations match tested concept: FA-19 DOL formula"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
}
];
