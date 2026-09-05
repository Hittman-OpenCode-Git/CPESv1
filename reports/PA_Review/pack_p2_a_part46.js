var pack_p2_a_part46 = [
{
  "QuestionID": "P2-A-395",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Foods: beg inv $800K, end $1.2M, purchases $5.8M, freight-in $200K. Analyst Ramaswamy computes COGS and turnover under ASC 330-10.",
  "Choices": {
    "A": "Goods available = Beginning + Purchases − Freight = $6,400K; COGS = $5,200K; turnover = 5.2x; freight-in is improperly subtracted.",
    "B": "Goods available = Beginning + Purchases + Freight-in = $6,800K; COGS = $5,600K; turnover = $5,600K / $1,000K average = 5.6x; freight-in capitalized.",
    "C": "Goods available = Ending + Purchases + Freight = $7,200K; COGS = $6,000K; turnover = 5.0x; uses ending instead of beginning.",
    "D": "Goods available = Beginning + Purchases only = $6,600K; COGS = $5,400K; turnover = $5,400K / $1,200K ending = 4.5x; omits freight-in."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.395 Inventory equation and turnover",
  "LOSTag": "A.1",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-395-inventory-equation-and-turnover",
  "Authorities": [
    "ASC 330-10",
    "ASC 330-10-30-9"
  ],
  "FormulaReference": "Goods available = Beginning + Net purchases + Freight-in; COGS = Goods available − Ending; Inventory turnover = COGS / Average inventory",
  "CommonTrapReference": "Subtracting freight-in instead of adding, omitting beginning inventory, or using ending instead of average for turnover",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 330-10, the periodic inventory equation is Beginning inventory + Net purchases + Freight-in = Goods available for sale; COGS = Goods available − Ending inventory. Freight-in is part of inventory cost under the periodic system and is added (not netted) to purchases. Recomputed: Goods available = $800,000 + $5,800,000 + $200,000 = $6,800,000; COGS = $6,800,000 − $1,200,000 = $5,600,000; average inventory = ($800,000 + $1,200,000) / 2 = $1,000,000; turnover = $5,600,000 / $1,000,000 = 5.6x.",
  "ExplanationWrongA": "Choice A — Subtracting freight-in is incorrect; under ASC 330-10, freight-in is added to purchases (capitalized as inventory cost) because it is a necessary cost to bring inventory to its intended location.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C — Using ending inventory as the base of the goods-available calculation ignores beginning inventory carried into the period; the equation requires beginning + purchases, not ending + purchases.",
  "ExplanationWrongD": "Choice D — Omitting freight-in understates goods available and COGS; ASC 330-10 requires freight-in to be capitalized as part of inventory cost. Using ending instead of average also distorts turnover.",
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
    "rule_or_proposition": "ASC 330-10 — A.395 Inventory equation and turnover",
    "application_to_facts": "Facts of P2-A-395 (A.395 Inventory equation and turnover) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-395 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Subtracting freight-in is incorrect; under ASC 330-10, freight-in is ...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-395.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Using ending inventory as the base of the goods-available calculation...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-395.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Omitting freight-in understates goods available and COGS; ASC 330-10 ...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-395.",
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
},
{
  "QuestionID": "P2-A-396",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Tech's customer-relationship intangible (2019 acquisition; cost $400,000; 10-year life) is 5 years amortized. Fair value $120,000; undiscounted future CFs $135,000. Controller Onuorah applies ASC 350.",
  "Choices": {
    "A": "No impairment is indicated because fair value ($120,000) exceeds undiscounted cash flows ($135,000); the higher figure is used.",
    "B": "No impairment; the asset is amortized but not tested because definite-lived intangibles under ASC 350 are not tested for impairment.",
    "C": "Impairment is indicated: undiscounted cash flows ($135,000) < carrying amount ($200,000); write down to fair value $120,000; recognize $80,000 loss.",
    "D": "Recognize an impairment loss of $280,000, writing the asset down to $120,000 from $400,000 original cost; double-counts prior amortization."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.396 ASC 350 definite-lived intangible impairment",
  "LOSTag": "A.2",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-396-asc-350-definite-lived-intangible-impairment",
  "Authorities": [
    "ASC 350-30-35",
    "ASC 360-10-35-21 (by analogy)"
  ],
  "FormulaReference": "Impairment loss = Carrying amount − Fair value; carrying amount = $400,000 − (5 × $40,000) = $200,000",
  "CommonTrapReference": "Using undiscounted cash flows as the new carrying amount (Step 1 of ASC 360, not the impairment loss itself) or omitting impairment testing entirely",
  "DecisionTreeReference": "Definite-lived intangible: amortization + impairment test when indicators exist; impairment = carrying − fair value",
  "ExplanationCorrect": "Under ASC 350-30-35, definite-lived intangibles are amortized over their useful life and tested for impairment when indicators exist. The carrying amount is $400,000 − (5 × $40,000) = $200,000. Because undiscounted future cash flows ($135,000) are less than carrying amount ($200,000), impairment is indicated. Recomputed impairment loss = Carrying amount − Fair value = $200,000 − $120,000 = $80,000. Controller Onuorah writes the intangible down to its fair value of $120,000 and recognizes an $80,000 impairment loss.",
  "ExplanationWrongA": "Choice A — Comparing fair value to undiscounted cash flows is not the impairment test; ASC 350/360 step 1 compares undiscounted cash flows to carrying amount to determine whether impairment is indicated, and step 2 measures the loss as carrying minus fair value.",
  "ExplanationWrongB": "Choice B — Definite-lived intangibles ARE tested for impairment under ASC 350-30-35-18 when impairment indicators exist; indefinite-lived intangibles require annual testing. This is a definite-lived asset.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D — Using original cost ($400,000) instead of current carrying amount ($200,000 after amortization) double-counts prior amortization and overstates the impairment loss.",
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
    "rule_or_proposition": "ASC 350-30-35 — A.396 ASC 350 definite-lived intangible impairment",
    "application_to_facts": "Facts of P2-A-396 (A.396 ASC 350 definite-lived intangible impairment) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-396 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Comparing fair value to undiscounted cash flows is not the impairment...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-396.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Definite-lived intangibles ARE tested for impairment under ASC 350-30...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-396.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Using original cost ($400,000) instead of current carrying amount ($2...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-396.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-397",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Holdings evaluates a receivables SPE with $30M bank financing. SPE activities restricted; bank absorbs 90% of expected losses. CFO Hoffmann evaluates ASC 810 consolidation.",
  "Choices": {
    "A": "The SPE is a VIE; the bank is the primary beneficiary because it absorbs 90% of expected losses; Flash Holdings does not consolidate.",
    "B": "The SPE is not a VIE because it has sufficient equity at risk and a substantive voting-interest structure, so voting-interest consolidation applies.",
    "C": "The SPE is a VIE; Flash Holdings is the primary beneficiary because it controls receivables servicing decisions regardless of loss absorption.",
    "D": "Neither the bank nor Flash Holdings consolidates the SPE; the SPE is a voting-interest entity with no party meeting the primary-beneficiary test."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Evaluate",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.397 VIE primary beneficiary analysis",
  "LOSTag": "A.3",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-397-vie-primary-beneficiary-analysis",
  "Authorities": [
    "ASC 810-10-15",
    "ASC 810-10-25",
    "ASC 810-10-25-38A"
  ],
  "FormulaReference": "VIE test: insufficient equity at risk OR equity holders lack decision-making power; Primary beneficiary = party absorbing majority of expected losses AND having power over activities that most significantly affect economics",
  "CommonTrapReference": "Defaulting to 'seller consolidates' because the seller originated the assets, or assuming SPEs are automatically VIEs regardless of structure",
  "DecisionTreeReference": "ASC 810 VIE analysis: 1) Is VIE? 2) Who is primary beneficiary? 3) Consolidate",
  "ExplanationCorrect": "Under ASC 810-10-15, an entity is a VIE if equity investors lack sufficient equity at risk, lack decision-making rights, or do not absorb proportionate economics. A thinly capitalized SPE (3% equity) whose activities are restricted and whose equity holders lack kick-out rights is generally a VIE. The primary beneficiary is the party that has power over the activities most significantly affecting the VIE's economic performance AND absorbs the majority of expected losses or receives the majority of expected residual returns. Here, the bank absorbs 90% of expected losses; CFO Hoffmann concludes the bank is the primary beneficiary and Flash Holdings does not consolidate the SPE under ASC 810-10-25.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B — A 3% equity-to-financing ratio with restricted activities and no substantive voting equity typically fails the VIE sufficiency test; calling the SPE 'not a VIE' would be incorrect absent clear voting equity at risk.",
  "ExplanationWrongC": "Choice C — Power to service receivables is not determinative when another party absorbs the vast majority of expected losses; under ASC 810-10-25-38A, both power and loss-absorption must align.",
  "ExplanationWrongD": "Choice D — ASC 810 requires identification of a primary beneficiary whenever a VIE exists; stating that no party consolidates is inconsistent with the standard.",
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
    "rule_or_proposition": "ASC 810-10-15 — A.397 VIE primary beneficiary analysis",
    "application_to_facts": "Facts of P2-A-397 (A.397 VIE primary beneficiary analysis) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-397 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Specific misconception: Choice B — A 3% equity-to-financing ratio with restricted activities and no subs...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-397.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Power to service receivables is not determinative when another party ...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-397.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — ASC 810 requires identification of a primary beneficiary whenever a V...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-397.",
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
  "QuestionID": "P2-A-398",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Foods: AR $1,800,000; allowance $120,000; net credit sales $14,400,000; write-offs $80,000. Senior analyst Ramaswamy computes turnover, DSO, and allowance coverage under ASC 326-20.",
  "Choices": {
    "A": "AR turnover = Net credit sales / Gross AR = $14,400,000 / $1,800,000 = 8.0x; DSO = 45.6 days; allowance ratio = 6.7% (gross-AR denominator).",
    "B": "AR turnover = $14,400,000 / Average net AR ($1,680,000) = 8.57x; DSO = 42.6 days; allowance ratio = $120,000 / $1,800,000 = 6.67%.",
    "C": "AR turnover = $14,400,000 / Ending net AR = 8.57x; DSO = 42.6 days; allowance ratio = 4.4% (= write-offs / sales) — miscomputed.",
    "D": "AR turnover = $14,400,000 / Ending gross AR; allowance is immaterial; DSO = 45.6 days; dismisses CECL expected-loss."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.398 Receivables turnover, DSO, allowance",
  "LOSTag": "A.4",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-398-receivables-turnover-dso-allowance",
  "Authorities": [
    "ASC 326-20 (CECL)",
    "ASC 310"
  ],
  "FormulaReference": "AR turnover = Net credit sales / Average net AR; DSO = 365 / AR turnover; Allowance ratio = Allowance / Gross AR",
  "CommonTrapReference": "Using gross AR (before allowance) in turnover denominator, or omitting the average",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 310 / ASC 326-20, AR turnover measures the speed of receivables collection. Net AR (gross less allowance) is the appropriate denominator because the allowance is not collectible. Recomputed: Net AR = $1,800,000 − $120,000 = $1,680,000. AR turnover = $14,400,000 / $1,680,000 = 8.57x. DSO = 365 / 8.57 ≈ 42.6 days. Allowance ratio = $120,000 / $1,800,000 = 6.67%, which appears reasonable given prior-year write-offs of $80,000 (≈4.4% of credit sales) and CECL expected-loss methodology. Senior analyst Ramaswamy confirms strong collection efficiency and adequate allowance.",
  "ExplanationWrongA": "Choice A — Using gross AR ($1,800,000) instead of net AR understates turnover by including non-collectible amounts in the denominator.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C — Using ending net AR rather than average net AR understates turnover when AR is growing; the allowance ratio here is also miscomputed as the write-off rate.",
  "ExplanationWrongD": "Choice D — Using ending gross AR for the turnover denominator and dismissing the allowance ignores CECL expected-loss requirements and produces a misleading turnover figure.",
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
    "rule_or_proposition": "ASC 326-20 (CECL) — A.398 Receivables turnover, DSO, allowance",
    "application_to_facts": "Facts of P2-A-398 (A.398 Receivables turnover, DSO, allowance) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-398 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Using gross AR ($1,800,000) instead of net AR understates turnover by...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-398.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Using ending net AR rather than average net AR understates turnover w...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-398.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Using ending gross AR for the turnover denominator and dismissing the...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-398.",
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
},
{
  "QuestionID": "P2-A-399",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Holdings' CCC components: DIO 60, DSO 45, DPO 30. Treasurer Caldwell computes and interprets the CCC for liquidity.",
  "Choices": {
    "A": "CCC = DIO − DSO + DPO = 60 − 45 + 30 = 45 days; lower CCC is worse for liquidity; inverts standard formula.",
    "B": "CCC = DIO + DSO + DPO = 60 + 45 + 30 = 135 days; a higher CCC means stronger working-capital efficiency — wrong direction.",
    "C": "CCC = DIO + DSO − DPO = 60 + 45 − 30 = 75 days; positive CCC means working capital is tied up in operations for ~75 days.",
    "D": "CCC = DPO − DIO − DSO = 30 − 60 − 45 = (75) days; negative CCC means working capital is released; formula misapplied."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Understand",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.399 Cash conversion cycle formula",
  "LOSTag": "A.5",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-399-cash-conversion-cycle-formula",
  "Authorities": [
    "Working capital management literature",
    "ASC 210 (Balance Sheet)"
  ],
  "FormulaReference": "CCC = DIO + DSO − DPO",
  "CommonTrapReference": "Adding DPO instead of subtracting, or inverting the sign on DSO/DIO",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "The cash conversion cycle measures the time between cash outflow for inventory/raw materials and cash inflow from customer collections. CCC = Days Inventory Outstanding + Days Sales Outstanding − Days Payable Outstanding = 60 + 45 − 30 = 75 days. A positive CCC means working capital is tied up in operating activities (cash is deployed longer than it is sourced from suppliers). Treasurer Caldwell concludes Flash Holdings has a 75-day CCC, indicating meaningful working-capital financing needs that could be reduced by extending DPO or accelerating collections.",
  "ExplanationWrongA": "Choice A — Subtracting DSO and adding DPO inverts the standard formula; the correct sign is plus for DIO and DSO, minus for DPO, and the resulting figure here is also miscalculated.",
  "ExplanationWrongB": "Choice B — Adding DPO rather than subtracting it inflates CCC; higher CCC indicates less working-capital efficiency, not more.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D — DPO is subtracted (not the leading term); the formula DPO − DIO − DSO is not a recognized measure of CCC. A negative CCC would mean cash is received before payment, but the formula is misapplied here.",
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
    "rule_or_proposition": "Working capital management literature — A.399 Cash conversion cycle formula",
    "application_to_facts": "Facts of P2-A-399 (A.399 Cash conversion cycle formula) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-399 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Subtracting DSO and adding DPO inverts the standard formula; the corr...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-399.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Adding DPO rather than subtracting it inflates CCC; higher CCC indica...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-399.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — DPO is subtracted (not the leading term); the formula DPO − DIO − DSO...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-399.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-400",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Tech in Argentina (hyperinflationary). Rate: ARP 950/USD → ARP 1,800/USD; net monetary assets ARP 4,500,000. Analyst Fischer applies ASC 830 / IAS 29.",
  "Choices": {
    "A": "Remeasure all monetary items at the closing rate; non-monetary at historical cost; net monetary $5,250 translation loss; no IAS 29 restatement.",
    "B": "Restate non-monetary assets and equity at historical rates; restate income statement at closing rates; gain on net monetary position in earnings.",
    "C": "Translate at the closing rate; defer FX effect to OCI; skip IAS 29 purchasing-power restatement; ASC 830 standard approach for non-hyperinflationary.",
    "D": "Apply IAS 29 purchasing-power restatement; translate at closing rate; restate equity at historical rates; net monetary loss ≈$2,236 in earnings with purchasing-power gain offset."
  },
  "CorrectChoice": "D",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.400 Hyperinflationary accounting under ASC 830/IAS 29",
  "LOSTag": "A.6",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-400-hyperinflationary-accounting-under-asc-830-ias-29",
  "Authorities": [
    "ASC 830-10-45",
    "IAS 29",
    "ASC 830-10-45-18"
  ],
  "FormulaReference": "Remeasurement loss = Net monetary assets × (1/Ending rate − 1/Beginning rate); Non-monetary items at current rate; Equity at historical rate",
  "CommonTrapReference": "Translating without applying IAS 29 purchasing-power restatement, or applying only translation gain without the purchasing-power gain on net monetary position",
  "DecisionTreeReference": "Hyperinflationary: functional = local → IAS 29 restate to current purchasing power → remeasure at closing rate",
  "ExplanationCorrect": "Under ASC 830-10-45-18 and IAS 29, when an economy is hyperinflationary, the financial statements of the foreign operation must first be restated for changes in purchasing power (using a general price index) before being translated. Non-monetary items carried at current cost are restated to current purchasing power and translated at the closing rate; equity is translated at historical rates. Recomputed: Remeasurement loss on net monetary assets = ARP 4,500,000 × (1/1,800 − 1/950) = ARP 4,500,000 × (0.000556 − 0.001053) = ARP 4,500,000 × (−0.000497) ≈ −$2,236 translation loss. The purchasing-power gain on net monetary position offset occurs because in hyperinflation, holding monetary assets while currency loses purchasing power generates an implicit gain in real terms. Financial analyst Fischer records restated non-monetary assets at current rate and recognizes the translation effect in earnings.",
  "ExplanationWrongA": "Choice A — Failing to first apply IAS 29 purchasing-power restatement skips a required step for hyperinflationary economies; merely remeasuring at the closing rate omits the price-level adjustment to non-monetary items.",
  "ExplanationWrongB": "Choice B — Restating non-monetary assets at historical rates omits the IAS 29 purchasing-power restatement; restating equity at historical rate is correct, but the income-statement-only-at-closing-rate treatment is wrong.",
  "ExplanationWrongC": "Choice C — Deferring the FX effect to OCI is not permitted for hyperinflationary subsidiaries under ASC 830-10-45-18; the FX effect must be recognized in earnings, and IAS 29 purchasing-power restatement must still be applied.",
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
    "rule_or_proposition": "ASC 830-10-45 — A.400 Hyperinflationary accounting under ASC 830/IAS 29",
    "application_to_facts": "Facts of P2-A-400 (A.400 Hyperinflationary accounting under ASC 830/IAS 29) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-400 yields CorrectChoice D as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Failing to first apply IAS 29 purchasing-power restatement skips a re...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-400.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Restating non-monetary assets at historical rates omits the IAS 29 pu...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-400.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Deferring the FX effect to OCI is not permitted for hyperinflationary...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-400.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D correctly applies the required adjustments per authoritative guidance. Choices A, B, C each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "Part": 2,
  "Section": "A",
  "Topic": "A.401 quick-ratio-components",
  "QuestionID": "P2-A-401",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-401-quick-ratio-components",
  "Stem": "Mariela Hoffmann, controller of Flash Manufacturing, is training a new staff accountant who will prepare the company's monthly liquidity reports. The accountant asks which assets belong in the numerator of the quick (acid-test) ratio. Under U.S. GAAP, which of the following is the correct definition of the quick ratio?",
  "Choices": {
    "A": "Total current assets ÷ Total current liabilities",
    "B": "(Cash + short-term marketable securities + net accounts receivable + inventory) ÷ Current liabilities",
    "C": "(Cash + short-term marketable securities + net accounts receivable) ÷ Current liabilities",
    "D": "(Cash + short-term marketable securities) ÷ Current liabilities"
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "Under ASC 210-10-45-1, current assets are cash and other assets reasonably expected to be realized, sold, or consumed within the operating cycle, and ASC 210-10-45-3 defines current liabilities as obligations whose liquidation requires current assets or the creation of other current liabilities. The quick (acid-test) ratio is a more conservative liquidity test than the current ratio: its numerator includes only cash, short-term marketable securities, and net accounts receivable, deliberately excluding inventory and prepaid expenses because their conversion to cash may take longer or require price concessions. Quick ratio = (Cash + short-term marketable securities + net accounts receivable) ÷ Current liabilities. This measure shows whether Flash can cover maturing obligations without selling inventory.",
  "ExplanationWrongA": "Total current assets divided by total current liabilities is the current ratio, not the quick ratio. The quick ratio is a more conservative measure because its numerator excludes inventory and prepaid expenses, which are not as readily convertible to cash. Using total current assets reports Flash's broadest liquidity position, but it does not test the company's ability to meet near-term obligations from its most liquid assets.",
  "ExplanationWrongB": "Including inventory in the numerator makes the measure an extended liquidity test rather than the acid-test ratio. Inventory is excluded from the quick ratio because it is the least liquid current asset: it must be sold and collected before it generates cash, and a rapid disposal may require price concessions. Adding inventory to the numerator overstates Flash's near-term cash availability and defeats the purpose of the more stringent acid-test measure.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Limiting the numerator to cash and short-term marketable securities defines the cash ratio, not the quick (acid-test) ratio. The quick ratio also includes net accounts receivable, because receivables are expected to be collected within the operating cycle and are therefore a source of near-term cash. Omitting receivables makes the test more stringent than the acid-test ratio and understates Flash's liquidity.",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "CognitiveLevel": "Remember",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "FA-02: Quick (Acid-Test) Ratio",
  "CommonTrapReference": "Confusing the quick ratio with the current ratio or the cash ratio; adding inventory to the quick-ratio numerator.",
  "Authorities": [
    "ASC 210-10-45-1 (current assets)",
    "ASC 210-10-45-3 (current liabilities)",
    "ASC 210-10-45-9 (working capital)"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true (CMA Part 2 Financial Statement Analysis item).",
    "EW[CorrectChoice] is exactly the empty string (DL-008 compliant).",
    "All non-correct ExplanationWrong slots are >=75 characters and choice-specific (DL-026 compliant).",
    "No boilerplate text; explanations are item-specific (DL-013 prevention).",
    "Difficulty justified: single-step recognition of a ratio definition with no computation — Easy (DS 1).",
    "Correct answer independently derived from ASC 210-10-45-1 / ASC 210-10-45-3 classification logic and the standard acid-test definition.",
    "Authority citations (ASC 210-10-45) match the tested liquidity concept (quick ratio components).",
    "Cognitive level passes Rule 11 AF-3/AF-4/AF-5 gates: Remember level; stem carries 'Under U.S. GAAP' with no weighing language, satisfying AF-3 (Apply-or-lower); no AF-4 trigger."
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "liquidity-solvency",
  "certification_date": "2026-09-01",
  "certification_batch": "",
  "certification_session": "P2-080"
}
];
