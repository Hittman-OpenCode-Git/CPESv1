// P2 Domain C Batch 2 - LOS C.4 Relevant Costing
// QIDs: P2-C-636 through P2-C-650
// Generated: 2026-09-05T08:20:26.507Z

const PACK_P2_C_BATCH2 = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Relevant cost identification",
    "QuestionID": "P2-C-636",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-636-relevant-vs-sunk-costs",
    "Stem": "Meridian Precision, a manufacturer of industrial valves, is evaluating whether to retain a CNC machining center. The machine was purchased five years ago for $80,000 and has a current book value of $50,000. Annual operating costs total $46,000, including $20,000 in fixed costs that would be eliminated if the machine is not retained. If Meridian retains the machine, it will require an $8,000 overhaul next quarter. The machine could be sold today for $4,000. What is the total relevant cost of keeping the machine for one more year?",
    "Choices": {
      "A": "$58,000",
      "B": "$70,000",
      "C": "$54,000",
      "D": "$66,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Relevant costs are future costs that differ between alternatives. Variable operating costs of $26,000 ($46,000 total minus $20,000 fixed) are incremental to the keep decision. The $8,000 overhaul is a future cash outflow required only if the machine is retained. The $4,000 current market value represents the opportunity cost of forgoing the sale. The $50,000 book value is a sunk cost. Total relevant cost: $26,000 + $20,000 (avoidable fixed) + $8,000 + $4,000 = $58,000.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This option incorrectly includes the $50,000 book value, which is a sunk cost. The original purchase price was committed years ago and cannot be recovered regardless of the decision.",
    "ExplanationWrongC": "This option omits the $4,000 opportunity cost of not selling the machine. If Meridian keeps the machine, it forgoes the $4,000 cash inflow from a potential sale.",
    "ExplanationWrongD": "This option includes the $50,000 book value (sunk cost) while omitting the $4,000 opportunity cost. Both errors distort the analysis.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember",
    "CalculationItem": false,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Relevant Cost Identification",
    "Authorities": [
      "IMA Management Accounting Practice - Relevant Costing"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $26K+$20K+$8K+$4K=$58K"
    ],
    "source_ids": [
      "IMA-Glossary-RelevantCost"
    ],
    "source_support_for_key": {
      "stem": "Relevant costs defined as future costs differing between alternatives",
      "correct": "Sunk costs excluded; opportunity costs included",
      "distractors": "Common candidate errors in CMA exam prep",
      "formula": "Relevant cost = avoidable costs + opportunity costs; excludes sunk costs"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Includes sunk book value as relevant",
        "why_plausible": "Book value figure seems important",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Omits opportunity cost",
        "why_plausible": "Focuses only on explicit cash outflows",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Double error with sunk cost and opportunity cost",
        "why_plausible": "Mixes relevant and irrelevant costs",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Tests relevant vs sunk cost distinction with three distinct errors",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Sunk cost exclusion",
    "QuestionID": "P2-C-637",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-637-sunk-cost-in-replacement",
    "Stem": "Ridgeline Manufacturing purchased a stamping press three years ago for $140,000. The press has been depreciated on a straight-line basis over seven years to a zero salvage value, and its current book value is $80,000. Ridgeline is considering replacing it with a new automated press costing $165,000 with a seven-year useful life. The new press would reduce annual operating costs from $92,000 to $68,000. The old press has no market value. Which amount should Ridgeline include in its differential analysis as the relevant cost of the old press?",
    "Choices": {
      "A": "$80,000",
      "B": "$0",
      "C": "$60,000",
      "D": "$140,000"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The old press should contribute $0 to the differential analysis. The $80,000 book value is a sunk cost representing historical depreciation of a prior expenditure that cannot be recovered. The original $140,000 purchase price is also sunk. Since the old press has zero market value, there is no opportunity cost from retaining it. Only future costs and revenues that differ between the keep and replace alternatives are relevant to this decision.",
    "ExplanationWrongA": "The $80,000 book value is a sunk cost. It represents depreciation charges on a prior expenditure that cannot be recovered. Book value is never relevant in a replacement decision when the asset has no market value.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This amount corresponds to remaining depreciation over four years, but depreciation is a non-cash allocation of a sunk cost. It does not represent a future cash outflow and is irrelevant.",
    "ExplanationWrongD": "The original $140,000 purchase price is a historical sunk cost committed three years ago. Historical costs are excluded from all relevant cost analyses.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Relevant Cost Identification",
    "Authorities": [
      "IMA Management Accounting Practice - Relevant Costing"
    ],
    "VerifiedChecks": [
      "Accounting accuracy verified"
    ],
    "source_ids": [
      "IMA-Glossary-RelevantCost"
    ],
    "source_support_for_key": {
      "stem": "Replacement decision with zero-market-value old asset",
      "correct": "Old asset with zero market value contributes nothing",
      "distractors": "Book value and historical cost commonly mistaken for relevant costs",
      "formula": "Relevant cost = market value when book value is sunk"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Confuses book value with relevant cost",
        "why_plausible": "Book value is prominently displayed",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Treats depreciation as relevant future cost",
        "why_plausible": "Remaining book value looks like a future cost",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Includes historical purchase price",
        "why_plausible": "Original cost is the most salient number",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Tests sunk cost in asset replacement with zero-market-value",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Opportunity cost",
    "QuestionID": "P2-C-638",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-638-opportunity-cost-decision",
    "Stem": "Harbor Electronics is evaluating whether to use its idle assembly capacity to produce a new sensor module. Direct materials cost $22 per unit, direct labor $16 per unit, variable overhead $8 per unit, and variable selling costs $4 per unit. Harbor can produce and sell 5,000 units annually. The company currently rents the idle space to an external vendor for $35,000 per year under a lease that can be terminated without penalty. What is the minimum price per unit Harbor should charge to make the sensor module worthwhile?",
    "Choices": {
      "A": "$50",
      "B": "$44",
      "C": "$57",
      "D": "$42"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The minimum acceptable price must cover all variable costs plus the opportunity cost of the forgone rent. Variable cost per unit: $22 + $16 + $8 + $4 = $50. Opportunity cost per unit: $35,000 / 5,000 = $7. Minimum price: $50 + $7 = $57. At any price below $57, Harbor would be worse off than continuing to rent the idle space to the external vendor.",
    "ExplanationWrongA": "This option covers only variable costs ($50) without the $7 per unit opportunity cost of forgone rental income. At $50 per unit, Harbor earns zero additional profit compared to renting.",
    "ExplanationWrongB": "This option excludes variable selling costs ($4) and the opportunity cost ($7). Both are incremental to the production decision and must be recovered in the price.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This option covers only direct costs ($42) while excluding variable overhead ($8) and the opportunity cost ($7). Both are incremental costs that must be covered.",
    "Difficulty": "Mod-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Opportunity Cost",
    "Authorities": [
      "IMA Management Accounting Practice - Opportunity Cost"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $22+$16+$8+$4=$50; $35K/5K=$7; $50+$7=$57"
    ],
    "source_ids": [
      "IMA-Glossary-OpportunityCost"
    ],
    "source_support_for_key": {
      "stem": "Capacity utilization with forgone rental income",
      "correct": "Min price = variable costs + opportunity cost per unit",
      "distractors": "Omitting opportunity cost or variable cost components",
      "formula": "Min price = VC/unit + (Forgone income / Units)"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Ignores opportunity cost",
        "why_plausible": "Focuses on explicit costs only",
        "tier_candidate": false
      },
      "B": {
        "misconception": "Excludes variable overhead and opportunity cost",
        "why_plausible": "Variable overhead perceived as allocable",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Uses only direct costs",
        "why_plausible": "Narrows cost base to visible categories",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Tests opportunity cost with forgone rental income",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Make-or-buy decisions",
    "QuestionID": "P2-C-639",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-639-make-or-buy-basic",
    "Stem": "Cascade Valve Company manufactures 10,000 hydraulic actuators annually. Direct materials $34, direct labor $21, variable manufacturing overhead $14, and fixed manufacturing overhead $11 (allocated at 10,000 units). An outside offer: $74.50 each. If outsourced, $60,000 of fixed overhead is avoidable. Released capacity has no alternative use. Should Cascade accept?",
    "Choices": {
      "A": "Reject - making costs $5,000 less",
      "B": "Accept - buying costs $60,000 less",
      "C": "Reject - making costs $50,000 less",
      "D": "Accept - buying costs $5,000 less"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Relevant make cost: variable ($34+$21+$14) x 10,000 = $690,000 + avoidable FC $60,000 = $750,000. Buy cost: $74.50 x 10,000 = $745,000. Buying saves $5,000. The $50,000 unavoidable fixed overhead ($11 x 10,000 minus $60,000 avoidable) persists regardless of the outsourcing decision and is irrelevant to the analysis.",
    "ExplanationWrongA": "Uses total production cost ($80/unit x 10,000 = $800,000) instead of relevant cost ($750,000). The $50,000 unavoidable FC is irrelevant.",
    "ExplanationWrongB": "Excludes the $60,000 avoidable fixed overhead from the make cost comparison. That $60,000 is a real cost savings if production ceases.",
    "ExplanationWrongC": "Compares total unit cost ($80) against buy price without adjusting for unavoidable fixed overhead.",
    "ExplanationWrongD": "",
    "Difficulty": "Mod-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Make-or-Buy Decision",
    "Authorities": [
      "IMA Management Accounting Practice - Make-or-Buy Analysis"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $750K-$745K=$5K advantage to buy"
    ],
    "source_ids": [
      "IMA-MakeOrBuy-Analysis"
    ],
    "source_support_for_key": {
      "stem": "Classic make-or-buy with partial fixed cost avoidability",
      "correct": "Relevant make cost excludes unavoidable fixed overhead",
      "distractors": "Including unavoidable or excluding avoidable fixed costs",
      "formula": "Net advantage = Avoidable make cost - Buy cost"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Uses total unit cost",
        "why_plausible": "Full absorption cost is readily available",
        "tier_candidate": false
      },
      "B": {
        "misconception": "Omits avoidable fixed overhead",
        "why_plausible": "Focuses only on variable costs",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Full cost comparison without adjustment",
        "why_plausible": "Intuitive but incorrect approach",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Standard make-or-buy with partial fixed cost avoidability",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Special order pricing",
    "QuestionID": "P2-C-640",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-640-special-order-pricing",
    "Stem": "Vortex Industrial Components produces hydraulic cylinders (capacity 20,000 units, current sales 16,000). Per unit: DM $65, DL $43, VOH $32, variable selling $5 (after waiving $7 commission). Fixed MOH $220,000, fixed S&A $60,000. European distributor offers 4,000 units at $180 each. Fixed costs unchanged. Incremental profit from accepting?",
    "Choices": {
      "A": "$140,000 profit",
      "B": "$72,000 profit",
      "C": "$20,000 loss",
      "D": "$52,000 profit"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Incremental revenue: 4,000 x $180 = $720,000. Incremental variable costs: direct materials ($65 x 4,000 = $260,000) + direct labor ($43 x 4,000 = $172,000) + variable overhead ($32 x 4,000 = $128,000) + variable selling ($5 x 4,000 = $20,000) = $580,000. Incremental profit: $720,000 - $580,000 = $140,000. Fixed costs are unavoidable and irrelevant to the special order decision.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Likely applies full $12 variable selling cost instead of reduced $5 rate, understating profit by $28,000 ($7 x 4,000).",
    "ExplanationWrongC": "Includes unavoidable fixed costs ($220,000 MOH or $60,000 S&A) in the incremental analysis. These costs persist regardless.",
    "ExplanationWrongD": "Overestimates variable costs or undercounts the commission savings from the special order.",
    "Difficulty": "Mod-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Special Order Pricing",
    "Authorities": [
      "IMA Management Accounting Practice - Special Order Analysis"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: ($180-$145) x 4,000 = $140,000"
    ],
    "source_ids": [
      "IMA-SpecialOrderPricing-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Special order with excess capacity and reduced commission",
      "correct": "Incremental revenue minus incremental VC at reduced rate",
      "distractors": "Including fixed costs or miscounting commission savings",
      "formula": "Incremental profit = (Price - VC_reduced) x Units"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Applies full variable selling cost",
        "why_plausible": "Does not adjust for waived commission",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Includes unavoidable fixed costs",
        "why_plausible": "Fixed overhead appears in cost sheet",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Overestimates costs",
        "why_plausible": "Misallocates or double-counts savings",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Special order with commission differential",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Make-or-buy with opportunity cost",
    "QuestionID": "P2-C-641",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-641-make-or-buy-opportunity-cost",
    "Stem": "Pinnacle Aerospace manufactures 10,000 turbine blade assemblies annually. Per unit: DM $30, DL $20, VOH $20, FOH $25 ($20 supervisory avoidable, $5 allocated continues). Outside supplier: $80 each. Freed capacity generates $50,000 additional CM. Net financial advantage of accepting?",
    "Choices": {
      "A": "$200,000 disadvantage",
      "B": "$250,000 advantage",
      "C": "$150,000 advantage",
      "D": "$100,000 disadvantage"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Relevant make cost: VC ($30+$20+$20) x 10,000 = $700,000 + avoidable FC ($20 x 10,000) = $200,000 = $900,000. Buy cost: $80 x 10,000 = $800,000. Direct advantage of buying: $900,000 - $800,000 = $100,000. Plus opportunity benefit from freed capacity: $50,000. Total net advantage: $100,000 + $50,000 = $150,000.",
    "ExplanationWrongA": "Treats the $50,000 opportunity benefit as a cost of buying rather than a benefit, yielding a net disadvantage.",
    "ExplanationWrongB": "Overstates by including the $100,000 unavoidable FC ($5 x 10,000) as avoidable, inflating the make cost to $1,000,000.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Ignores the $50,000 opportunity benefit from freed capacity, yielding only the $100,000 direct advantage.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Make-or-Buy Decision",
    "Authorities": [
      "IMA Management Accounting Practice - Make-or-Buy with Opportunity Cost"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: ($900K-$800K)+$50K=$150K"
    ],
    "source_ids": [
      "IMA-MakeOrBuy-Analysis"
    ],
    "source_support_for_key": {
      "stem": "Make-or-buy with opportunity benefit from freed capacity",
      "correct": "Net advantage = (avoidable make - buy) + opportunity benefit",
      "distractors": "Omitting opportunity cost or including unavoidable FC",
      "formula": "Net advantage = (Relevant make - Buy) + Opp benefit"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Treats opportunity benefit as cost",
        "why_plausible": "Confusion about direction of benefit",
        "tier_candidate": false
      },
      "B": {
        "misconception": "Includes unavoidable FC as avoidable",
        "why_plausible": "Total FC seems relevant",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Omits opportunity benefit",
        "why_plausible": "Focuses on direct cost comparison only",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Make-or-buy with opportunity cost - tests both concepts",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Sell-or-process-further",
    "QuestionID": "P2-C-642",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-642-sell-or-process-further",
    "Stem": "Cascade Processing produces Compound Alpha at joint cost $120,000. At split-off, Alpha sells for $90,000. Alternatively, Alpha can be processed further into Product Beta at additional cost $35,000, yielding final sales value $140,000. Byproduct Gamma sells at split-off for $15,000 (no further processing). Should Cascade process further?",
    "Choices": {
      "A": "Process further - $15,000 advantage",
      "B": "Sell at split-off - $15,000 advantage",
      "C": "Process further - $20,000 advantage",
      "D": "Sell at split-off - $5,000 advantage"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Incremental revenue from processing further: $140,000 - $90,000 = $50,000. Incremental cost: $35,000. Net advantage: $50,000 - $35,000 = $15,000. The $120,000 joint cost (reduced to $105,000 by the $15,000 byproduct credit) is a sunk cost at the split-off point and irrelevant to the sell-or-process-further decision.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Incorrectly factors the $105,000 net joint cost into the sell-or-process decision. Joint costs are sunk at split-off and should not influence further-processing decisions.",
    "ExplanationWrongC": "Likely includes the $15,000 byproduct revenue as an additional benefit of processing further, double-counting it since the byproduct is recovered at split-off regardless.",
    "ExplanationWrongD": "Underestimates the incremental revenue ($50,000) or overestimates the incremental cost ($35,000), yielding an incorrect advantage.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Sell-or-Process-Further",
    "Authorities": [
      "IMA Management Accounting Practice - Sell-or-Process-Further"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $50K-$35K=$15K"
    ],
    "source_ids": [
      "IMA-SellOrProcessFurther-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Sell-or-process-further with joint cost and byproduct",
      "correct": "Incremental revenue minus incremental cost; joint costs sunk",
      "distractors": "Including joint costs or misallocating byproduct revenue",
      "formula": "Net advantage = (Final value - Split-off value) - Processing cost"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Includes joint costs in analysis",
        "why_plausible": "Joint costs seem relevant at decision point",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Double-counts byproduct revenue",
        "why_plausible": "Byproduct associated with joint process",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Arithmetic error in incremental amounts",
        "why_plausible": "Misidentifies incremental revenue or cost",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Sell-or-process-further with joint cost and byproduct",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Keep-or-drop product line",
    "QuestionID": "P2-C-643",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-643-keep-or-drop",
    "Stem": "BluePeak Consumer Products operates three product lines. Product B: sales $500,000, variable costs $420,000, traceable fixed costs $115,000, allocated corporate overhead $60,000. If dropped, traceable FC eliminated; allocated FC redistributed. Impact on total operating income?",
    "Choices": {
      "A": "Decreases by $35,000",
      "B": "Increases by $35,000",
      "C": "Decreases by $175,000",
      "D": "Remains unchanged"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Product B contribution margin: $500,000 - $420,000 = $80,000. Avoidable traceable FC: $115,000. If B is dropped, the company loses $80,000 CM but saves $115,000 in traceable fixed costs. Net impact: +$115,000 - $80,000 = +$35,000. Operating income increases by $35,000. The $60,000 allocated corporate FC is unavoidable and irrelevant.",
    "ExplanationWrongA": "This would be correct if CM exceeded avoidable FC. Here CM ($80,000) is less than avoidable FC ($115,000), so dropping actually increases income rather than decreasing it.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Uses the full CM ($80,000) plus allocated costs ($60,000) as the impact, ignoring that $115,000 in traceable FC would be saved.",
    "ExplanationWrongD": "Assumes CM equals avoidable FC, which would yield zero net impact. Here CM is $35,000 less than avoidable FC, creating a positive impact from dropping.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Keep-or-Drop Decision",
    "Authorities": [
      "IMA Management Accounting Practice - Segment Discontinuation"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $80K CM < $115K avoidable FC, dropping saves $35K"
    ],
    "source_ids": [
      "IMA-KeepOrDrop-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Product line discontinuation with traceable and allocated FC",
      "correct": "Net impact = CM - avoidable traceable FC; allocated FC irrelevant",
      "distractors": "Treating allocated costs as avoidable or ignoring FC savings",
      "formula": "Impact = -(CM) + Avoidable FC"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Would be correct if CM > avoidable FC",
        "why_plausible": "Common scenario in other problems",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Ignores traceable FC savings",
        "why_plausible": "Focuses on CM loss only",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Assumes zero net impact",
        "why_plausible": "CM equals avoidable FC in some scenarios",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Keep-or-drop where CM < avoidable FC (unusual scenario)",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Constrained resource optimization",
    "QuestionID": "P2-C-644",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-644-constrained-resource",
    "Stem": "Precision Dynamics manufactures Alpha and Beta on a shared CNC machine (2,000 hours/month). Alpha: $40 CM, 2 hrs, demand 800. Beta: $30 CM, 1 hr, demand 1,000. Optimal production mix?",
    "Choices": {
      "A": "600 Alpha, 800 Beta - $48,000",
      "B": "800 Alpha, 400 Beta - $44,000",
      "C": "400 Alpha, 1,000 Beta - $46,000",
      "D": "700 Alpha, 600 Beta - $46,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "CM per machine hour: Alpha $40/2 = $20/hr, Beta $30/1 = $30/hr. Beta has higher CM per constraint unit, so produce Beta first. 800 Beta units (800 hours). Remaining: 2,000 - 800 = 1,200 hours. 600 Alpha units (1,200 hours). Total CM: (600 x $40) + (800 x $30) = $24,000 + $24,000 = $48,000.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Prioritizes Alpha ($20/hr) over Beta ($30/hr), which is suboptimal. Producing 800 Alpha uses 1,600 hours, leaving only 400 for Beta.",
    "ExplanationWrongC": "Produces Beta to full demand (1,000 hours) but only 400 Alpha (800 hours), using only 1,800 of 2,000 available hours. The unused 200 hours represent missed CM opportunity.",
    "ExplanationWrongD": "Uses all 2,000 hours (700x2 + 600x1) but yields only $46,000 versus the optimal $48,000. The mix does not maximize CM per constraint unit.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Constrained Resource Optimization",
    "Authorities": [
      "IMA Management Accounting Practice - Theory of Constraints"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: 600x$40+800x$30=$48,000"
    ],
    "source_ids": [
      "IMA-TheoryOfConstraints-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Single constraint with two products",
      "correct": "Rank by CM per constraint unit; produce highest first",
      "distractors": "Prioritizing by CM per unit or underutilizing constraint",
      "formula": "CM per constraint unit = CM / Hours"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Prioritizes by CM per unit",
        "why_plausible": "Higher per-unit CM seems natural",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Fails to fully utilize hours",
        "why_plausible": "Produces to demand without checking capacity",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Balanced mix not optimized",
        "why_plausible": "Equal production seems reasonable",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Constrained resource with CM-per-hour ranking",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Joint cost relevance",
    "QuestionID": "P2-C-645",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-645-joint-cost-relevance",
    "Stem": "Summit Chemical processes raw material into X and Y (joint cost $180,000). Split-off: X sales value $120,000, Y $80,000. X can be processed further to X-Plus at additional cost $30,000, final value $165,000. Y sold at split-off. Sales value method allocates how much to X, and should X be processed further?",
    "Choices": {
      "A": "$108,000; process further - $15,000",
      "B": "$108,000; sell at split-off - $15,000",
      "C": "$90,000; process further - $15,000",
      "D": "$108,000; process further - $45,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Joint cost allocation (sales value method): Total SV at split-off = $120,000 + $80,000 = $200,000. X allocation: ($120,000 / $200,000) x $180,000 = $108,000. Sell-or-process-further for X: Incremental revenue = $165,000 - $120,000 = $45,000. Incremental cost = $30,000. Net advantage = $15,000. Joint costs are sunk at split-off.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Correct allocation ($108,000) but wrong process-further decision. The $45,000 incremental revenue exceeds the $30,000 incremental cost by $15,000.",
    "ExplanationWrongC": "Uses physical units allocation method ($90,000) instead of the specified sales value method, yielding a different allocation.",
    "ExplanationWrongD": "Correct direction but overstates advantage by $30,000 - confuses incremental revenue ($45,000) with incremental profit ($15,000).",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Joint Cost Allocation",
    "Authorities": [
      "IMA Management Accounting Practice - Joint Cost Allocation"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $108K allocation, $15K further processing advantage"
    ],
    "source_ids": [
      "IMA-JointCostAllocation-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Joint cost allocation with further-processing decision",
      "correct": "Sales value method; incremental analysis for further processing",
      "distractors": "Wrong allocation method or failing to deduct incremental cost",
      "formula": "Allocation = (Product SV / Total SV) x Joint cost"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Wrong process-further decision",
        "why_plausible": "Confused by allocated joint cost",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Wrong allocation method",
        "why_plausible": "Physical units method gives different result",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Confuses incremental revenue with profit",
        "why_plausible": "Does not deduct processing cost",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Joint cost allocation plus sell-or-process-further",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Theory of constraints",
    "QuestionID": "P2-C-646",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-646-theory-of-constraints",
    "Stem": "Apex Manufacturing: Products A and B through Machining (3,000), Assembly (1,500), Finishing (2,000). Both need 1 min/department. Demand: A=900, B=800. A contributes $42, B $28. Bottleneck and max monthly CM?",
    "Choices": {
      "A": "Assembly; $54,600",
      "B": "Machining; $60,200",
      "C": "Finishing; $51,800",
      "D": "Assembly; $63,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Total demand: 900 + 800 = 1,700 units. Machining capacity 3,000 (meets demand). Assembly capacity 1,500 (below demand - bottleneck). Finishing capacity 2,000 (meets demand). Rank by CM: A ($42) > B ($28). Produce 900 A (900 Assembly min) + 600 B (600 min) = 1,500. CM: $37,800 + $16,800 = $54,600.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Full demand CM ($60,200 = 900x$42 + 800x$28) ignores the Assembly bottleneck capacity of 1,500 units.",
    "ExplanationWrongC": "Prioritizes B (lower CM at $28) before A ($42), yielding 800 B + 700 A = $22,400 + $29,400 = $51,800.",
    "ExplanationWrongD": "Ignores A's demand cap of 900 and assumes all 1,500 Assembly hours produce A (1,500 x $42 = $63,000).",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Theory of Constraints",
    "Authorities": [
      "IMA Management Accounting Practice - Theory of Constraints"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: 900x$42+600x$28=$54,600"
    ],
    "source_ids": [
      "IMA-TheoryOfConstraints-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Three-department process with bottleneck",
      "correct": "Identify bottleneck; rank by CM; produce highest first to demand",
      "distractors": "Ignoring demand caps or wrong product priority",
      "formula": "Max CM = Highest CM product first up to demand"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Full demand without bottleneck",
        "why_plausible": "Total demand x CM seems natural",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Wrong product priority",
        "why_plausible": "May rank by volume not CM/hr",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Ignores demand cap",
        "why_plausible": "All capacity to best product seems optimal",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Theory of constraints with bottleneck, demand caps, product priority",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Keep-or-drop with sunk cost",
    "QuestionID": "P2-C-647",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-647-keep-or-drop-sunk",
    "Stem": "Orion Electronics: Product Z results: sales $250,000, VC $160,000, traceable FC $75,000 (includes $30,000 depreciation on $120K equipment with no resale value), allocated corporate $60,000. If dropped, $45,000 traceable FC eliminated, $60,000 allocated persists. Impact?",
    "Choices": {
      "A": "Decreases by $45,000",
      "B": "Increases by $15,000",
      "C": "Decreases by $120,000",
      "D": "Decreases by $75,000"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Product Z contribution margin: $250,000 - $160,000 = $90,000. Avoidable traceable FC: $45,000 (the remaining $30,000 depreciation is a sunk cost with no resale value). Net impact of dropping: lost CM ($90,000) minus saved avoidable FC ($45,000) = $45,000 net loss. Operating income decreases by $45,000.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Treats the $60,000 allocated corporate overhead as avoidable. Allocated costs persist regardless of whether Product Z is dropped and are redistributed.",
    "ExplanationWrongC": "Uses the full CM ($90,000) plus depreciation ($30,000) as the impact, ignoring that $45,000 in traceable FC would be saved.",
    "ExplanationWrongD": "Treats all traceable FC ($75,000) as relevant, but $30,000 is sunk depreciation that cannot be recovered.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Keep-or-Drop Decision",
    "Authorities": [
      "IMA Management Accounting Practice - Segment Discontinuation"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $90K-$45K=$45K"
    ],
    "source_ids": [
      "IMA-KeepOrDrop-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Keep-or-drop with embedded sunk depreciation",
      "correct": "CM - avoidable FC; depreciation and allocated FC irrelevant",
      "distractors": "Treating depreciation or allocated costs as avoidable",
      "formula": "Impact = -(CM) + Avoidable FC"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Allocated FC treated as avoidable",
        "why_plausible": "Costs seem attached to product",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Full CM as impact, ignores savings",
        "why_plausible": "Focuses on loss side only",
        "tier_candidate": false
      },
      "D": {
        "misconception": "All traceable FC treated as relevant",
        "why_plausible": "Traceable seems relevant to discontinuation",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Keep-or-drop with three-way cost classification",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Make-or-buy with constraints",
    "QuestionID": "P2-C-648",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-648-make-or-buy-constraints",
    "Stem": "Titan Precision: 12,000 valve assemblies/year, total cost $720,000 ($60/unit). Supplier: $57.50 each. Outsourcing eliminates $180,000 FC. Freed space generates $15,000 CM. Outsourcing adds $12,000 warranty cost. Net advantage?",
    "Choices": {
      "A": "$33,000 disadvantage",
      "B": "$33,000 advantage",
      "C": "$18,000 advantage",
      "D": "$75,000 disadvantage"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Relevant make cost: VC ($720,000 - $180,000 avoidable FC = $540,000) + avoidable FC $180,000 = $720,000. Buy cost: $57.50 x 12,000 = $690,000. Direct advantage: $720,000 - $690,000 = $30,000. Plus opportunity benefit $15,000 minus extra warranty cost $12,000 = $33,000 net advantage.",
    "ExplanationWrongA": "Treats the opportunity benefit and warranty cost in the wrong direction, or uses total cost instead of avoidable cost.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Omits the $15,000 opportunity benefit from freed capacity. The direct advantage ($30,000) minus warranty ($12,000) = $18,000, missing the $15,000 opportunity.",
    "ExplanationWrongD": "Treats both the $15,000 opportunity and $12,000 warranty as additional costs of buying, yielding $75,000 disadvantage.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Make-or-Buy Decision",
    "Authorities": [
      "IMA Management Accounting Practice - Make-or-Buy Analysis"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $30K+$15K-$12K=$33K"
    ],
    "source_ids": [
      "IMA-MakeOrBuy-Analysis"
    ],
    "source_support_for_key": {
      "stem": "Make-or-buy with opportunity, quality risk, and partial FC avoidability",
      "correct": "Net = (avoidable make - buy) + opportunity - extra cost",
      "distractors": "Omitting opportunity, miscounting warranty, or using total cost",
      "formula": "Net advantage = Direct + Opp benefit - Extra cost"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Wrong direction on adjustments",
        "why_plausible": "Confusion about benefit vs cost",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Omits opportunity benefit",
        "why_plausible": "Focuses on explicit costs",
        "tier_candidate": false
      },
      "D": {
        "misconception": "All adjustments treated as costs",
        "why_plausible": "All additions seem like costs",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Make-or-buy with three adjustment factors",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Multiple relevant costs",
    "QuestionID": "P2-C-649",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-649-multiple-relevant-costs",
    "Stem": "Meridian Industries evaluating new premium headphone. Equipment $320,000 (8-yr SL, no salvage). Sales: 15,000 units at $85. VC $38/unit. New salaries $65,000. Allocated corporate $22,000 (continues). Current standard headphone: 3,000 units at $60, CM $18/unit; 40% cannibalized. First-year relevant net income?",
    "Choices": {
      "A": "$344,000",
      "B": "$289,600",
      "C": "$366,000",
      "D": "$298,400"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Revenue: 15,000 x $85 = $1,275,000. VC: 15,000 x $38 = $570,000. CM: $705,000. Avoidable FC: $65,000. Depreciation: $320,000/8 = $40,000. Cannibalization: 3,000 x 40% x $18 = $21,600. Allocated $22,000 irrelevant. Operating NI: $705,000 - $65,000 - $40,000 - $21,600 = $578,400. With equipment as year-1 cash outflow: $578,400 - $320,000 + $40,000 = $298,400.",
    "ExplanationWrongA": "Ignores cannibalization ($21,600) and depreciation ($40,000), overstating income by $61,600.",
    "ExplanationWrongB": "Close but likely includes the $22,000 allocated overhead as a relevant cost, overstating deductions.",
    "ExplanationWrongC": "Omits both depreciation ($40,000) and cannibalization ($21,600), treating them as non-incremental costs.",
    "ExplanationWrongD": "",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Relevant Cost Identification",
    "Authorities": [
      "IMA Management Accounting Practice - Relevant Costing"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: $705K-$65K-$40K-$21.6K-$320K+$40K=$298.4K"
    ],
    "source_ids": [
      "IMA-RelevantCosting-Practice"
    ],
    "source_support_for_key": {
      "stem": "New product with cannibalization, depreciation, and allocated costs",
      "correct": "Revenue - VC - Avoidable FC - Depreciation - Cannibalization - Equipment",
      "distractors": "Omitting cannibalization, depreciation, or allocating common costs",
      "formula": "Relevant NI = Incremental CM - All incremental costs"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Ignores cannibalization and depreciation",
        "why_plausible": "Cannibalization seems speculative; depreciation non-cash",
        "tier_candidate": false
      },
      "B": {
        "misconception": "Includes allocated overhead",
        "why_plausible": "Allocated costs appear in project budget",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Omits depreciation and cannibalization",
        "why_plausible": "Both seem non-cash or indirect",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Multi-factor relevant costing with cannibalization",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "C",
    "Topic": "C.4 Constrained resource optimization",
    "QuestionID": "P2-C-650",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "c-650-constrained-resource-demand",
    "Stem": "Meridian Industries: shared stamping machine 3,000 hrs/month. Product J: 3 hrs/unit, $55 CM, demand 600. Product K: 2 hrs/unit, $32 CM, demand 800. Optimal production?",
    "Choices": {
      "A": "600 J, 600 K - $52,200",
      "B": "500 J, 750 K - $51,500",
      "C": "600 J, 600 K - $52,000",
      "D": "400 J, 900 K - $50,800"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "CM per machine hour: J = $55/3 = $18.33/hr, K = $32/2 = $16/hr. J has higher CM per constraint unit, so produce J first. 600 J units (1,800 hrs) + 600 K units (1,200 hrs) = 3,000 hrs. Total CM: (600 x $55) + (600 x $32) = $33,000 + $19,200 = $52,200.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Underproduces J (500 instead of demand 600), leaving 200 J-hours unused. The lost J production ($55 CM) exceeds the gained K production ($32 CM) at 2 hrs each.",
    "ExplanationWrongC": "Arithmetic error: claims $52,000 but the correct total for 600 J + 600 K is $52,200 ($33,000 + $19,200).",
    "ExplanationWrongD": "Exceeds K demand (900 > 800) or significantly underproduces J, yielding only $50,800.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": true,
    "ItemStyle": "MCQ-SingleAnswer",
    "LOSTag": "C.4",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Constrained Resource Optimization",
    "Authorities": [
      "IMA Management Accounting Practice - Theory of Constraints"
    ],
    "VerifiedChecks": [
      "Arithmetic verified: 600x$55+600x$32=$52,200"
    ],
    "source_ids": [
      "IMA-TheoryOfConstraints-Guidance"
    ],
    "source_support_for_key": {
      "stem": "Dual-constraint with demand caps and different resource requirements",
      "correct": "Rank by CM/hr; produce highest first to demand; verify capacity",
      "distractors": "Underproducing high-CM product, arithmetic errors, exceeding demand",
      "formula": "CM per constraint unit = CM / Hours per unit"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Underproduces higher-CM product",
        "why_plausible": "Balances instead of maximizing",
        "tier_candidate": false
      },
      "C": {
        "misconception": "Arithmetic error in CM total",
        "why_plausible": "Correct mix but miscalculated total",
        "tier_candidate": false
      },
      "D": {
        "misconception": "Exceeds demand cap for K",
        "why_plausible": "Does not verify demand constraints",
        "tier_candidate": false
      }
    },
    "uniqueness_note": "Constrained resource with demand caps and different requirements",
    "source_status": "RESOLVED",
    "hold_reason": ""
  }
];

if (typeof module !== "undefined") module.exports = PACK_P2_C_BATCH2;
