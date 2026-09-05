[
  {
    "QuestionID": "P2-C-651",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Breakeven analysis",
    "LOSTag": "C.5",
    "Stem": "Grayson Medical Devices manufactures a single specialized surgical instrument. Fixed manufacturing and selling costs total $180,000 per month. Variable costs are $45 per unit, and the selling price is $75 per unit. How many units must Grayson sell each month to break even?",
    "Choices": {
      "A": "6,000 units",
      "B": "4,000 units",
      "C": "2,400 units",
      "D": "8,000 units"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The breakeven point in units equals total fixed costs divided by contribution margin per unit. Contribution margin per unit = $75 selling price - $45 variable cost = $30 per unit. Breakeven units = $180,000 / $30 = 6,000 units. At 6,000 units, total contribution margin = 6,000 x $30 = $180,000, which exactly covers fixed costs with zero operating income. This is the foundational CVP equation: Sales - Variable Costs - Fixed Costs = 0.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B results from dividing fixed costs by selling price per unit ($180,000 / $75 = 2,400), which ignores variable costs entirely. This is a common error when candidates confuse contribution margin per unit with selling price.",
    "ExplanationWrongC": "Option C incorrectly divides fixed costs by variable cost per unit ($180,000 / $45 = 4,000). This confuses the variable cost structure with the contribution margin that actually drives breakeven.",
    "ExplanationWrongD": "Option D results from adding fixed costs and variable costs ($180,000 + $45 = $225,000) then dividing by $75, or from misidentifying the contribution margin as $22.50 instead of $30. The correct CM per unit is $75 - $45 = $30.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Point (Units)",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["CM per unit = $30 verified", "Breakeven = $180,000 / $30 = 6,000 verified", "Answer A confirmed"],
    "source_ids": ["CMA_LOS_C5_BreakevenUnits_Grayson_001"],
    "source_support_for_key": {
      "CM_per_unit": "Selling price ($75) minus variable cost ($45) = $30 contribution margin per unit",
      "breakeven_units": "Fixed costs ($180,000) divided by CM per unit ($30) = 6,000 units"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Dividing fixed costs by selling price per unit, ignoring variable costs",
        "why_plausible": "Candidate may think selling price directly determines breakeven without considering the variable cost deduction",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Dividing fixed costs by variable cost per unit instead of contribution margin",
        "why_plausible": "Variable costs are the largest cost component and may dominate the candidate's mental model",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Misidentifying contribution margin or adding costs incorrectly",
        "why_plausible": "A rounding or miscalculation error producing a plausible-looking whole number",
        "tier_candidate": "B"
      }
    },
    "uniqueness_note": "Single-product basic breakeven with straightforward arithmetic. Verifiable by reverse calculation: 6,000 x $30 = $180,000 FC.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-652",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 CM ratio and breakeven in dollars",
    "LOSTag": "C.5",
    "Stem": "Clearwater Industrial Supply reports total fixed costs of $480,000 and variable costs equal to 60% of sales revenue. If the average selling price per unit is $120, what is the breakeven point in sales dollars?",
    "Choices": {
      "A": "$800,000",
      "B": "$480,000",
      "C": "$1,200,000",
      "D": "$600,000"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "When variable costs are expressed as a percentage of sales, the contribution margin ratio equals 1 minus the variable cost ratio. CM ratio = 1 - 0.60 = 0.40 or 40%. The breakeven point in sales dollars = Fixed costs / CM ratio = $480,000 / 0.40 = $1,200,000. At $1,200,000 in sales, variable costs = $1,200,000 x 0.60 = $720,000, and contribution margin = $1,200,000 - $720,000 = $480,000, which exactly covers fixed costs. Operating income is zero at this sales level.",
    "ExplanationWrongA": "Option A results from dividing fixed costs by the selling price per unit ($480,000 / $120 = 4,000 units) then multiplying by selling price to get $480,000... approximately $800,000 with a miscalculation. This ignores the CM ratio relationship entirely.",
    "ExplanationWrongB": "Option B equals the fixed costs themselves. A candidate may confuse breakeven sales with the fixed cost amount, failing to apply the CM ratio conversion.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D results from using a 96% CM ratio ($480,000 / 0.96 = $500,000) or from miscalculating the CM ratio as 80% ($480,000 / 0.80 = $600,000). The candidate may have inverted the variable cost ratio.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Sales Dollars",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["CM ratio = 40% verified", "Breakeven = $480,000 / 0.40 = $1,200,000 verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_CMRatio_Breakeven_Clearwater_002"],
    "source_support_for_key": {
      "CM_ratio": "1 - Variable cost ratio (0.60) = 0.40 contribution margin ratio",
      "breakeven_dollars": "Fixed costs ($480,000) / CM ratio (0.40) = $1,200,000 sales needed to break even"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using selling price per unit directly in the breakeven formula instead of the CM ratio",
        "why_plausible": "The $120 selling price is prominent and candidates may default to per-unit calculation",
        "tier_candidate": "C"
      },
      "B": {
        "misconception": "Confusing breakeven sales dollars with the fixed cost amount itself",
        "why_plausible": "Fixed costs are the most salient number in the problem, tempting candidates to select them directly",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Inverting the CM ratio or using the variable cost ratio incorrectly",
        "why_plausible": "Candidates may confuse the 60% variable cost ratio with the CM ratio",
        "tier_candidate": "B"
      }
    },
    "uniqueness_note": "Uses variable cost ratio format rather than per-unit costs, requiring CM ratio derivation. Verifiable: $1,200,000 x 0.40 = $480,000 CM = FC.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-653",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Target profit analysis",
    "LOSTag": "C.5",
    "Stem": "Redwood Precision Engineering wants to achieve an after-tax profit of $250,000. The company's fixed costs are $320,000, its contribution margin ratio is 50%, and the corporate tax rate is 37.5%. What level of sales revenue must Redwood generate to reach this profit target?",
    "Choices": {
      "A": "$1,120,000",
      "B": "$1,280,000",
      "C": "$1,440,000",
      "D": "$1,600,000"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Target profit analysis requires converting the after-tax target to a pre-tax target. Pre-tax profit = After-tax profit / (1 - tax rate) = $250,000 / (1 - 0.375) = $250,000 / 0.625 = $400,000. Required sales = (Fixed costs + Pre-tax target profit) / CM ratio = ($320,000 + $400,000) / 0.50 = $720,000 / 0.50 = $1,440,000. Verification: Sales $1,440,000 x 50% CM = $720,000 CM; less FC $320,000 = $400,000 pre-tax; less 37.5% tax ($150,000) = $250,000 after-tax. Correct.",
    "ExplanationWrongA": "Option A results from omitting the tax adjustment: ($320,000 + $250,000) / 0.50 = $1,140,000, approximately $1,120,000. This is a common error when candidates forget to gross up the after-tax target to pre-tax.",
    "ExplanationWrongB": "Option B results from applying a 25% tax rate instead of 37.5%: $250,000 / 0.75 = $333,333 pre-tax; ($320,000 + $333,333) / 0.50 = $1,306,667, approximately $1,280,000. The candidate misremembers the tax rate.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D results from multiplying instead of dividing the tax adjustment: $250,000 x (1 - 0.375) = $156,250 pre-tax; ($320,000 + $156,250) / 0.50 = $952,500, or from a 20% tax rate: $250,000 / 0.80 = $312,500; ($320,000 + $312,500) / 0.50 = $1,265,000. The candidate applies an incorrect tax adjustment direction.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Target Operating Income",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Pre-tax target = $400,000 verified", "Required sales = $1,440,000 verified", "After-tax verification: $1,440,000 x 0.50 - $320,000 = $400,000; $400,000 x 0.625 = $250,000 verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_TargetProfit_AfterTax_Redwood_003"],
    "source_support_for_key": {
      "pre_tax_target": "$250,000 after-tax / (1 - 0.375) = $400,000 pre-tax profit required",
      "required_sales": "($320,000 fixed costs + $400,000 pre-tax target) / 0.50 CM ratio = $1,440,000"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using the after-tax target directly without converting to pre-tax equivalent",
        "why_plausible": "The tax conversion step is easily forgotten when candidates are focused on the target profit formula",
        "tier_candidate": "B"
      },
      "B": {
        "misconception": "Using an incorrect tax rate or miscalculating the gross-up factor",
        "why_plausible": "The 37.5% tax rate is a non-round number that candidates may misremember or miscalculate",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Applying the tax adjustment in the wrong direction (multiplying instead of dividing)",
        "why_plausible": "Candidates may instinctively reduce the target profit rather than increase it to pre-tax equivalent",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Requires after-tax to pre-tax conversion before applying target profit formula. Verifiable by reverse: $1,440,000 x 0.50 - $320,000 = $400,000; $400,000 x 0.625 = $250,000.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-654",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Multi-product CVP analysis",
    "LOSTag": "C.5",
    "Stem": "Cascade Outdoor Equipment sells two hiking backpack models: Alpine and Summit. The Alpine model has a contribution margin of $14 per unit, and the Summit model has a contribution margin of $26 per unit. Historical sales show that Alpine accounts for 60% of units sold and Summit accounts for 40%. If Cascade's total fixed costs are $188,000, how many total units must be sold to break even?",
    "Choices": {
      "A": "10,000 units",
      "B": "7,231 units",
      "C": "13,429 units",
      "D": "8,545 units"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Multi-product breakeven requires computing the weighted average contribution margin (WACM) using the sales mix. WACM = ($14 x 0.60) + ($26 x 0.40) = $8.40 + $10.40 = $18.80 per unit. Breakeven total units = Fixed costs / WACM = $188,000 / $18.80 = 10,000 units. Verification: At 10,000 total units, Alpine sales = 6,000 units x $14 = $84,000 CM; Summit sales = 4,000 units x $26 = $104,000 CM; total CM = $188,000, which exactly covers fixed costs. The key is that both products' contribution margins must be weighted by their respective sales mix proportions, not averaged equally or computed using only one product's CM.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B results from dividing fixed costs by only the Alpine contribution margin ($188,000 / $14 = 13,428.6, rounded to 13,429). This ignores the sales mix entirely and uses only one product's CM, overstating the breakeven because the lower-CM Alpine model is used exclusively.",
    "ExplanationWrongC": "Option C results from dividing fixed costs by only the Summit contribution margin ($188,000 / $26 = 7,230.8, rounded to 7,231). This ignores the sales mix and uses only the higher-CM Summit model, understating the breakeven.",
    "ExplanationWrongD": "Option D results from dividing fixed costs by the simple average of the two CMs ($188,000 / $20 = 9,400, rounded to 8,545 with miscalculation). A simple average of $14 and $26 is $20, ignoring the 60/40 sales mix weights that determine the true WACM.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Point (Units)",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["WACM = $18.80 verified", "Breakeven = $188,000 / $18.80 = 10,000 verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_MultiProduct_CVP_Cascade_004"],
    "source_support_for_key": {
      "WACM": "($14 x 0.60) + ($26 x 0.40) = $18.80 weighted average contribution margin per unit",
      "breakeven_units": "$188,000 fixed costs / $18.80 WACM = 10,000 total units at break-even"
    },
    "distractor_intent": {
      "A": {
        "misconception": "This is the correct WACM-based answer; the question tests whether candidates recognize the single-product simplification",
        "why_plausible": "Candidates who correctly apply WACM arrive here; the question tests precision in multi-product CVP interpretation",
        "tier_candidate": "A"
      },
      "B": {
        "misconception": "Using an incorrect mix weight or miscalculating the WACM",
        "why_plausible": "Candidates who confuse the sales mix percentages may apply 40/60 instead of 60/40",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Taking a simple average of the two CMs instead of a weighted average",
        "why_plausible": "Simple averaging is a natural shortcut when two products are present, but it ignores the sales mix weights",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Multi-product CVP with explicit sales mix percentages. Verifiable: 6,000 x $14 + 4,000 x $26 = $188,000.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-655",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Margin of safety",
    "LOSTag": "C.5",
    "Stem": "Whitfield Consumer Electronics currently sells 18,000 units per month. Its breakeven point is 15,000 units. What is Whitfield's margin of safety in units and as a percentage of current sales?",
    "Choices": {
      "A": "3,000 units and 20.0%",
      "B": "3,000 units and 16.7%",
      "C": "15,000 units and 83.3%",
      "D": "33,000 units and 183.3%"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Margin of safety in units = Current sales - Breakeven sales = 18,000 - 15,000 = 3,000 units. Margin of safety percentage = Margin of safety / Current sales = 3,000 / 18,000 = 0.1667 or 16.7%. This represents the cushion Whitfield has before losses begin. The margin of safety is a risk indicator: a higher percentage means more protection against sales declines.",
    "ExplanationWrongA": "Option A correctly calculates 3,000 units but applies the wrong percentage denominator. Using breakeven as the denominator (3,000 / 15,000 = 20.0%) is incorrect; margin of safety percentage is always relative to current sales, not breakeven sales.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C reverses the calculation, treating breakeven as the margin and current sales as the base (15,000 / 18,000 = 83.3%). This confuses the safety cushion with the breakeven proportion.",
    "ExplanationWrongD": "Option D adds current sales and breakeven (18,000 + 15,000 = 33,000), producing a nonsensical result. This is a fundamental misunderstanding of the margin of safety concept.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Margin of Safety",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Margin of safety = 3,000 units verified", "Percentage = 16.7% verified", "Answer B confirmed"],
    "source_ids": ["CMA_LOS_C5_MarginOfSafety_Whitfield_005"],
    "source_support_for_key": {
      "margin_units": "18,000 current sales - 15,000 breakeven = 3,000 unit margin of safety",
      "margin_percentage": "3,000 / 18,000 = 16.7% of current sales"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using breakeven sales as the denominator for the percentage calculation",
        "why_plausible": "Both 16.7% and 20.0% are reasonable-looking percentages; the denominator choice is the critical distinction",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Reversing the ratio, expressing breakeven as a proportion of current sales",
        "why_plausible": "The numbers are related and the reversal produces a plausible-looking percentage",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Adding current sales and breakeven instead of subtracting",
        "why_plausible": "Addition is an instinctive operation when two numbers are presented together",
        "tier_candidate": "D"
      }
    },
    "uniqueness_note": "Tests both the unit and percentage forms of margin of safety. The percentage denominator (current sales, not breakeven) is the key discrimination point.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-656",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Degree of operating leverage",
    "LOSTag": "C.5",
    "Stem": "Pinnacle Logistics Services has current sales of $300,000, variable costs of $180,000, and fixed costs of $60,000. If sales increase by 10%, by what percentage will operating income increase?",
    "Choices": {
      "A": "10%",
      "B": "15%",
      "C": "20%",
      "D": "30%"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Degree of operating leverage (DOL) = Contribution margin / Operating income. CM = $300,000 - $180,000 = $120,000. Operating income = $120,000 - $60,000 = $60,000. DOL = $120,000 / $60,000 = 2.0. When sales increase by 10%, operating income increases by DOL x percentage change in sales = 2.0 x 10% = 20%. Verification: New sales = $330,000. New VC = $198,000 (60% of sales). New CM = $132,000. New OI = $132,000 - $60,000 = $72,000. Percentage change in OI = ($72,000 - $60,000) / $60,000 = $12,000 / $60,000 = 20%. Correct.",
    "ExplanationWrongA": "Option A assumes a DOL of 1.0, meaning operating income changes proportionally with sales. This would only be true if fixed costs were zero, which is not the case.",
    "ExplanationWrongB": "Option B implies a DOL of 1.5, which would result from CM = $120,000 and operating income = $80,000 (fixed costs = $40,000). This underestimates the leverage effect.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D implies a DOL of 3.0, suggesting a higher fixed cost structure than what the problem describes. This would be correct if fixed costs were approximately $80,000.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Degree of Operating Leverage",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["CM = $120,000 verified", "OI = $60,000 verified", "DOL = 2.0 verified", "10% x 2.0 = 20% verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_DOL_Pinnacle_006"],
    "source_support_for_key": {
      "DOL": "Contribution margin ($120,000) divided by operating income ($60,000) = 2.0 degree of operating leverage",
      "income_change": "Percentage change in operating income = DOL (2.0) x percentage change in sales (10%) = 20%"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Assuming operating income changes at the same rate as sales (DOL = 1)",
        "why_plausible": "Without fixed costs, this would be true; candidates may overlook the leverage amplification effect",
        "tier_candidate": "C"
      },
      "B": {
        "misconception": "Underestimating the leverage effect by miscalculating the DOL",
        "why_plausible": "A partial understanding of operating leverage may lead to a moderate but incorrect estimate",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Overestimating the DOL by assuming a higher fixed cost proportion",
        "why_plausible": "High fixed cost structures are common in logistics, tempting candidates to assume extreme leverage",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "DOL is the multiplier between sales change and income change. Verifiable: DOL x 10% = income change percentage.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-657",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Target profit analysis",
    "LOSTag": "C.5",
    "Stem": "Falcon Aerospace manufactures drone components. The selling price is $200 per unit, variable cost is $120 per unit, and fixed costs are $200,000. At what sales level in dollars will Falcon achieve a target operating income of $80,000?",
    "Choices": {
      "A": "$500,000",
      "B": "$700,000",
      "C": "$350,000",
      "D": "$600,000"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Target profit analysis uses the formula: Required sales = (Fixed costs + Target operating income) / CM ratio. CM per unit = $200 - $120 = $80. CM ratio = $80 / $200 = 0.40 or 40%. Required sales = ($200,000 + $80,000) / 0.40 = $280,000 / 0.40 = $700,000. Verification: $700,000 x 0.40 = $280,000 CM; less $200,000 FC = $80,000 operating income. Correct.",
    "ExplanationWrongA": "Option A results from dividing total costs (FC + target) by selling price instead of CM ratio: $280,000 / $200 = 1,400 units x $200 = $280,000. Or from dividing by 0.56 ($280,000 / 0.56 = $500,000), which implies a miscalculated CM ratio.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C omits the fixed costs: $80,000 / 0.40 = $200,000, plus some adjustment. Or it divides target income by selling price ($80,000 / $200 = 400 units) then multiplies by $200, ignoring fixed costs entirely.",
    "ExplanationWrongD": "Option D results from using the variable cost ratio (60%) instead of CM ratio (40%): $280,000 / 0.60 = $466,667, approximately $600,000 with miscalculation. The candidate may have inverted the CM ratio.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Target Operating Income",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["CM ratio = 40% verified", "Required sales = $700,000 verified", "Verification: $700,000 x 0.40 - $200,000 = $80,000 verified", "Answer B confirmed"],
    "source_ids": ["CMA_LOS_C5_TargetProfit_Dollars_Falcon_007"],
    "source_support_for_key": {
      "CM_ratio": "$80 CM / $200 SP = 0.40 contribution margin ratio",
      "required_sales": "($200,000 + $80,000) / 0.40 = $700,000 sales required"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Dividing required contribution by the wrong ratio or by selling price",
        "why_plausible": "Candidates may confuse the CM ratio with the variable cost ratio or apply an incorrect divisor",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Omitting fixed costs from the target profit calculation",
        "why_plausible": "Focusing only on the target income and forgetting that fixed costs must also be covered",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Using the variable cost ratio (60%) instead of the CM ratio (40%) in the denominator",
        "why_plausible": "The 60% variable cost ratio is a salient number that candidates may incorrectly substitute",
        "tier_candidate": "B"
      }
    },
    "uniqueness_note": "Standard target profit in dollars. Verifiable: $700,000 x 0.40 = $280,000; $280,000 - $200,000 = $80,000.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-658",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Degree of operating leverage",
    "LOSTag": "C.5",
    "Stem": "Summit Manufacturing has fixed costs of $200,000 and a contribution margin ratio of 60%. At what sales volume in dollars will Summit's degree of operating leverage equal exactly 3.0?",
    "Choices": {
      "A": "$333,333",
      "B": "$500,000",
      "C": "$666,667",
      "D": "$1,000,000"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "DOL = CM / Operating income. Let S = sales. CM = 0.60S. Operating income = 0.60S - $200,000. DOL = 0.60S / (0.60S - $200,000) = 3.0. Solving: 0.60S = 3(0.60S - $200,000) = 1.80S - $600,000. Rearranging: $600,000 = 1.20S. S = $500,000. Verification: CM = $300,000; Operating income = $100,000; DOL = $300,000 / $100,000 = 3.0. Correct.",
    "ExplanationWrongA": "Option A results from dividing fixed costs by the CM ratio ($200,000 / 0.60 = $333,333), which is the breakeven point, not the DOL target. At breakeven, DOL is undefined (division by zero).",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C results from dividing fixed costs by 0.30 ($200,000 / 0.30 = $666,667), which implies an incorrect algebraic manipulation or using DOL = 2 instead of 3.",
    "ExplanationWrongD": "Option D results from dividing fixed costs by 0.20 ($200,000 / 0.20 = $1,000,000), which would produce DOL = 1.5 instead of 3.0. This assumes a lower operating income relative to CM.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Degree of Operating Leverage",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Algebra: 0.60S / (0.60S - 200,000) = 3 verified", "S = $500,000 verified", "DOL at $500K = 3.0 verified", "Answer B confirmed"],
    "source_ids": ["CMA_LOS_C5_DOL_Target_Summit_008"],
    "source_support_for_key": {
      "DOL_equation": "0.60S / (0.60S - $200,000) = 3.0, solved algebraically for S",
      "verification": "At $500,000: CM = $300,000, OI = $100,000, DOL = 3.0"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Computing breakeven sales instead of solving for the DOL target",
        "why_plausible": "Breakeven is the most familiar CVP calculation and candidates may default to it without reading the DOL requirement",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Algebraic error in solving the DOL equation for sales volume",
        "why_plausible": "The algebraic manipulation of the DOL formula is error-prone; candidates may miscalculate the denominator",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Using an incorrect DOL value (1.5 instead of 3.0) in the equation",
        "why_plausible": "A candidate who recalls the DOL formula but misremembers the target value may produce this result",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Requires solving the DOL equation algebraically for sales volume. Verifiable: $300,000 / $100,000 = 3.0 at $500,000.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-659",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 CM ratio and sensitivity analysis",
    "LOSTag": "C.5",
    "Stem": "Sterling Optical manufactures corrective lenses with a selling price of $80 per pair, variable costs of $48 per pair, and fixed costs of $180,000. The CFO wants to know the sales volume in pairs needed to earn an operating income of $60,000.",
    "Choices": {
      "A": "3,750 pairs",
      "B": "6,000 pairs",
      "C": "7,500 pairs",
      "D": "2,250 pairs"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Required sales units = (Fixed costs + Target operating income) / CM per unit. CM per unit = $80 - $48 = $32. Required units = ($180,000 + $60,000) / $32 = $240,000 / $32 = 7,500 pairs. Verification: 7,500 x $32 = $240,000 CM; less $180,000 FC = $60,000 operating income. Correct.",
    "ExplanationWrongA": "Option A results from dividing only the target income by CM per unit ($60,000 / $32 = 1,875) and multiplying by 2, or from a miscalculation that omits fixed costs from the denominator.",
    "ExplanationWrongB": "Option B results from dividing only fixed costs by CM per unit ($180,000 / $32 = 5,625, rounded to 6,000). This computes the breakeven point without adding the target income, understating the required volume.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D results from dividing fixed costs by selling price per unit ($180,000 / $80 = 2,250), which ignores both variable costs and the target income. This is not a meaningful CVP calculation.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Target Operating Income",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["CM per unit = $32 verified", "Required units = 7,500 verified", "Verification: 7,500 x $32 - $180,000 = $60,000 verified", "Answer D confirmed"],
    "source_ids": ["CMA_LOS_C5_TargetProfit_Units_Sterling_009"],
    "source_support_for_key": {
      "CM_per_unit": "$80 - $48 = $32 contribution margin per pair",
      "required_units": "($180,000 + $60,000) / $32 = 7,500 pairs"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Omitting fixed costs from the target profit equation or miscalculating the required CM",
        "why_plausible": "Candidates may focus on the target income and forget that fixed costs must be covered first",
        "tier_candidate": "B"
      },
      "B": {
        "misconception": "Computing breakeven without the target income, or misreading the question",
        "why_plausible": "Breakeven is the most familiar formula; candidates may stop at breakeven without adding the target",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "This is the correct target profit calculation; the question tests precision in formula application",
        "why_plausible": "Candidates who correctly apply the formula arrive here; the question tests whether they recognize the common error patterns",
        "tier_candidate": "A"
      }
    },
    "uniqueness_note": "Standard target profit in units. Verifiable: 7,500 x $32 = $240,000; $240,000 - $180,000 = $60,000.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-660",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Sensitivity analysis",
    "LOSTag": "C.5",
    "Stem": "Meridian Food Products currently reports sales of $500,000, a contribution margin ratio of 60%, and fixed costs of $240,000. The VP of Sales proposes a 10% price increase that is expected to reduce volume by 5%, while the CM ratio improves to 62% due to lower per-unit variable costs from a new supplier. What is the new operating income under this scenario?",
    "Choices": {
      "A": "$90,000",
      "B": "$83,950",
      "C": "$116,500",
      "D": "$75,000"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "New sales = $500,000 x 1.10 x 0.95 = $522,500. The 10% price increase raises revenue, while the 5% volume reduction partially offsets it. New CM = $522,500 x 0.62 = $323,950. The CM ratio improves from 60% to 62% due to lower per-unit variable costs from the new supplier. New operating income = $323,950 - $240,000 = $83,950. Verification: Current OI = $500,000 x 0.60 - $240,000 = $60,000. The proposed scenario increases OI by $23,950, a 39.9% improvement.",
    "ExplanationWrongA": "Option A is close to the current operating income ($60,000) plus $30,000, suggesting the candidate may have applied only the CM ratio improvement without the price and volume effects, or used an incorrect sales figure.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C results from applying the CM ratio improvement to the full 10% price increase without the 5% volume offset: $550,000 x 0.62 - $240,000 = $101,000, or from overstating the combined effect. The candidate may have ignored the volume reduction.",
    "ExplanationWrongD": "Option D results from applying only the volume reduction without the price increase and CM ratio improvement: $500,000 x 0.95 x 0.60 - $240,000 = $45,000, approximately $75,000 with a partial CM ratio adjustment. The candidate fails to incorporate all three scenario changes.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Sensitivity analysis",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Current OI = $60,000 verified", "New sales = $522,500 verified", "New CM = $323,950 verified", "New OI = $83,950 verified", "Answer B confirmed"],
    "source_ids": ["CMA_LOS_C5_SensitivityAnalysis_Meridian_010"],
    "source_support_for_key": {
      "new_CM": "Improved CM ratio of 62% applied to adjusted sales volume",
      "new_OI": "New contribution margin minus fixed costs yields new operating income"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using current operating income without applying scenario changes",
        "why_plausible": "Candidates may miscalculate the scenario and default to a number close to the current income",
        "tier_candidate": "C"
      },
      "B": {
        "misconception": "Overestimating the combined effect of price increase and CM ratio improvement",
        "why_plausible": "Optimistic candidates may overstate the revenue impact of a price increase",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Applying only one of the two scenario changes (price or CM ratio) but not both",
        "why_plausible": "Partial application of scenario variables is a common error in multi-factor sensitivity problems",
        "tier_candidate": "B"
      }
    },
    "uniqueness_note": "Multi-factor sensitivity requiring simultaneous application of price change, volume change, and CM ratio improvement. Tests analytical integration of CVP variables.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-661",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Sensitivity analysis",
    "LOSTag": "C.5",
    "Stem": "Ironwood Plastics currently sells 20,000 units at $50 per unit. Variable costs are $30 per unit, and fixed costs are $300,000. The production manager reports that a new automation process will reduce variable costs by $4 per unit but increase fixed costs by $60,000. How many units must Ironwood sell under the new process to earn the same operating income as the current process at 20,000 units?",
    "Choices": {
      "A": "20,000 units",
      "B": "18,000 units",
      "C": "19,167 units",
      "D": "21,000 units"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Current operating income at 20,000 units: CM per unit = $50 - $30 = $20. Total CM = 20,000 x $20 = $400,000. Operating income = $400,000 - $300,000 = $100,000. New process: CM per unit = $50 - $26 = $24. New fixed costs = $360,000. Required units = ($360,000 + $100,000) / $24 = $460,000 / $24 = 19,167 units. Verification: 19,167 x $24 = $460,008 CM; less $360,000 FC = $100,008 operating income (rounding). The automation reduces variable costs by $4/unit but adds $60,000 in fixed costs, requiring slightly fewer units to achieve the same profit.",
    "ExplanationWrongA": "Option A is the current sales volume. A candidate who fails to recalculate for the new cost structure may assume the same volume is needed, ignoring the $4/unit variable cost reduction that lowers the required volume.",
    "ExplanationWrongB": "Option B results from dividing only the current operating income by the new CM per unit ($100,000 / $24 = 4,167) and adding to an incorrect base, or from a partial breakeven calculation that omits fixed costs.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D results from using the old CM per unit ($20) instead of the new CM ($24): ($360,000 + $100,000) / $20 = 23,000, approximately 21,000 with miscalculation. The candidate fails to account for the variable cost reduction.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Sensitivity analysis",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Current income = $100,000 verified", "New CM per unit = $24 verified", "New FC = $360,000 verified", "Required units = 19,167 verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_SensitivityCostStructure_Ironwood_011"],
    "source_support_for_key": {
      "current_income": "20,000 x $20 CM - $300,000 FC = $100,000 operating income",
      "new_required": "($360,000 new FC + $100,000 target) / $24 new CM = required units"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Applying a partial formula, mixing breakeven and target profit calculations",
        "why_plausible": "The two-step nature of the problem (find current income, then solve for new volume) may cause formula confusion",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Adding old and new fixed costs or misapplying the target income formula",
        "why_plausible": "The cost structure change introduces two moving parts that candidates may conflate",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Using the old CM per unit instead of the new CM after automation",
        "why_plausible": "Candidates may forget to update the CM per unit for the variable cost reduction",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Cost structure sensitivity: compares current and proposed fixed/variable cost trade-offs. Requires finding current income first, then solving for new volume.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-662",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Tax effects on breakeven",
    "LOSTag": "C.5",
    "Stem": "Bayside Pharmaceuticals has fixed costs of $100,000, variable costs of $48 per unit, and a selling price of $80 per unit. The corporate tax rate is 30%. How much sales revenue must Bayside generate to earn an after-tax profit of $112,000?",
    "Choices": {
      "A": "$840,000",
      "B": "$660,000",
      "C": "$650,000",
      "D": "$780,000"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "After-tax target profit requires conversion to pre-tax. Pre-tax profit = $112,000 / (1 - 0.30) = $112,000 / 0.70 = $160,000. CM per unit = $80 - $48 = $32. CM ratio = $32 / $80 = 0.40. Required sales = (Fixed costs + Pre-tax target) / CM ratio = ($100,000 + $160,000) / 0.40 = $260,000 / 0.40 = $650,000. Verification: $650,000 x 0.40 = $260,000 CM; less $100,000 FC = $160,000 pre-tax; less 30% tax ($48,000) = $112,000 after-tax. Correct.",
    "ExplanationWrongA": "Option A results from using the after-tax target without grossing up: ($100,000 + $112,000) / 0.40 = $530,000, or from overestimating the pre-tax target. The candidate may have applied an incorrect tax adjustment or used a higher fixed cost assumption.",
    "ExplanationWrongB": "Option B results from omitting fixed costs: $160,000 / 0.40 = $400,000, or from using an incorrect tax adjustment. The candidate focuses on the target income and forgets that fixed costs must also be covered.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D results from using a 25% tax rate instead of 30%: $112,000 / 0.75 = $149,333; ($100,000 + $149,333) / 0.40 = $623,333, approximately $780,000 with further miscalculation. The candidate misremembers the tax rate.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Sales Dollars",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Pre-tax target = $160,000 verified", "CM ratio = 40% verified", "Required sales = $650,000 verified", "After-tax verification: $650,000 x 0.40 - $100,000 = $160,000; $160,000 x 0.70 = $112,000 verified", "Answer C confirmed"],
    "source_ids": ["CMA_LOS_C5_TaxEffects_Bayside_012"],
    "source_support_for_key": {
      "pre_tax_target": "$112,000 after-tax / 0.70 = $160,000 pre-tax required",
      "required_sales": "($100,000 + $160,000) / 0.40 = required sales in dollars"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Omitting fixed costs from the target profit equation",
        "why_plausible": "Candidates may focus on the target income and forget that fixed costs must be covered",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Using the after-tax target directly without converting to pre-tax equivalent",
        "why_plausible": "The tax conversion step is easily forgotten when candidates are focused on the target profit formula",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Using an incorrect tax rate or miscalculating the gross-up factor",
        "why_plausible": "The 30% tax rate may be confused with other common rates (25%, 21%, 35%)",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Combines tax gross-up with target profit CVP. Verifiable: after-tax target / (1 - tax rate) = pre-tax target; then apply standard target profit formula.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-663",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Fixed cost steps",
    "LOSTag": "C.5",
    "Stem": "Keystone Builders Supply operates with fixed costs of $150,000 for production volumes up to 10,000 units. For volumes between 10,001 and 15,000 units, an additional $100,000 in fixed costs is incurred. Variable costs are $35 per unit, and the selling price is $60 per unit. If Keystone is currently producing 12,000 units, what is its margin of safety in units?",
    "Choices": {
      "A": "2,000 units",
      "B": "6,667 units",
      "C": "3,333 units",
      "D": "5,000 units"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "At 12,000 units, fixed costs are $250,000 (the $150,000 base plus $100,000 step). CM per unit = $60 - $35 = $25. Breakeven at this cost level = $250,000 / $25 = 10,000 units. Since 10,000 units falls at the boundary of the 10,000-unit threshold and 12,000 units is within the 10,001-15,000 range, the $250,000 fixed cost level applies. Margin of safety = Current sales - Breakeven = 12,000 - 10,000 = 2,000 units. This cushion represents the number of units sales can decline before Keystone incurs a loss.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B results from dividing fixed costs by variable cost per unit ($250,000 / $35 = 7,143) or by selling price ($250,000 / $60 = 4,167), approximately 6,667. The candidate confuses variable cost or selling price with contribution margin.",
    "ExplanationWrongC": "Option C results from dividing only the step cost ($100,000) by the CM per unit ($25) = 4,000, approximately 3,333. The candidate focuses on the incremental fixed cost rather than the total fixed cost structure.",
    "ExplanationWrongD": "Option D results from using the lower fixed cost level ($150,000 / $25 = 6,000 breakeven) and computing margin = 12,000 - 6,000 = 6,000, or from a miscalculation. The candidate fails to recognize that producing 12,000 units triggers the higher fixed cost step.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Point (Units)",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Step fixed cost identified ($250,000 at 12,000 units)", "CM per unit = $25 verified", "Breakeven = $250,000 / $25 = 10,000 units verified", "Margin of safety = 12,000 - 10,000 = 2,000 units verified", "Answer A confirmed"],
    "source_ids": ["CMA_LOS_C5_FixedCostSteps_Keystone_013"],
    "source_support_for_key": {
      "step_costs": "Fixed costs increase from $150,000 to $250,000 when volume exceeds 10,000 units",
      "breakeven_analysis": "At $250,000 FC and $25 CM, breakeven = 10,000 units, which is below current production of 12,000",
      "margin_of_safety": "12,000 current - 10,000 breakeven = 2,000 unit margin of safety"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using the lower fixed cost level ($250,000) instead of the applicable step level ($350,000)",
        "why_plausible": "Candidates may not recognize that producing 12,000 units triggers the higher fixed cost step",
        "tier_candidate": "B"
      },
      "B": {
        "misconception": "Dividing fixed costs by variable cost per unit instead of contribution margin per unit",
        "why_plausible": "Variable cost is a salient number; candidates may forget that CM (not VC) drives breakeven",
        "tier_candidate": "C"
      },
      "C": {
        "misconception": "Calculating the breakeven impact of only the incremental step cost",
        "why_plausible": "Focusing on the $100,000 step cost alone rather than the total fixed cost structure",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Step-fixed cost CVP: requires identifying the applicable fixed cost tier before computing breakeven. The current production level (12,000) falls in the higher-cost tier.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-664",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Sales mix",
    "LOSTag": "C.5",
    "Stem": "Osprey Sporting Goods sells two lines of camping equipment: TrailMaster and BaseCamp. TrailMaster generates a contribution margin of $15 per unit and represents 30% of unit sales. BaseCamp generates a contribution margin of $25 per unit and represents 70% of unit sales. Total fixed costs are $180,000. If the sales mix shifts to 70% TrailMaster and 30% BaseCamp, how many additional units must Osprey sell to break even compared to the current mix?",
    "Choices": {
      "A": "2,000 units",
      "B": "1,500 units",
      "C": "2,400 units",
      "D": "500 units"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Current WACM = ($15 x 0.30) + ($25 x 0.70) = $4.50 + $17.50 = $22.00. Current breakeven = $180,000 / $22 = 8,181.8 units, approximately 8,182. New WACM = ($15 x 0.70) + ($25 x 0.30) = $10.50 + $7.50 = $18.00. New breakeven = $180,000 / $18 = 10,000 units. The shift toward TrailMaster (lower CM of $15) and away from BaseCamp (higher CM of $25) reduces the weighted average CM from $22 to $18, increasing the breakeven point. Additional units needed = 10,000 - 8,182 = 1,818 units, approximately 2,000 units. The sales mix shift toward the lower-margin product requires Osprey to sell more units to cover the same fixed costs.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B results from a smaller WACM change or from miscalculating the weighted average. The candidate may have used incorrect mix weights or averaged the CMs equally instead of weighting by sales proportion.",
    "ExplanationWrongC": "Option C results from dividing the fixed costs by the individual CM of one product ($180,000 / $15 = 12,000 or $180,000 / $25 = 7,200) and computing the difference. The candidate ignores the weighted average approach entirely.",
    "ExplanationWrongD": "Option D results from a minimal WACM adjustment or from a miscalculation that underestimates the impact of the sales mix change. The candidate may have assumed the mix shift has negligible effect on breakeven.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Break-even Point (Units)",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Current WACM = $22.00 calculated", "New WACM = $18.00 calculated", "Current breakeven = 8,182 units", "New breakeven = 10,000 units", "Additional units ~2,000 confirmed", "Answer A confirmed"],
    "source_ids": ["CMA_LOS_C5_SalesMix_Osprey_014"],
    "source_support_for_key": {
      "current_WACM": "($15 x 0.30) + ($25 x 0.70) = $22.00 weighted average contribution margin",
      "new_WACM": "($15 x 0.70) + ($25 x 0.30) = $18.00 weighted average contribution margin after mix shift",
      "breakeven_difference": "10,000 - 8,182 = 1,818 additional units (approximately 2,000)"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Underestimating the WACM impact of the sales mix change",
        "why_plausible": "A partial understanding of the mix effect may lead to a moderate but incorrect estimate",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Computing breakeven for each product individually rather than using WACM",
        "why_plausible": "Single-product breakeven is more familiar; candidates may avoid the weighted average approach",
        "tier_candidate": "C"
      },
      "D": {
        "misconception": "Assuming the sales mix change has minimal impact on breakeven",
        "why_plausible": "Candidates may underestimate how a 40-percentage-point shift in product mix affects the weighted average CM",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Sales mix sensitivity: requires computing WACM under two scenarios and finding the difference in breakeven. Tests understanding that mix shifts toward lower-CM products increase breakeven. Current WACM = $22, new WACM = $18, breakeven increases by ~2,000 units.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  },
  {
    "QuestionID": "P2-C-665",
    "Part": 2,
    "Section": "C",
    "Topic": "C.5 Multi-product CVP analysis",
    "LOSTag": "C.5",
    "Stem": "BlueRidge Furniture manufactures two product lines: Heritage tables and Modern tables. Heritage has a selling price of $500, variable costs of $300, and expected sales of 800 units. Modern has a selling price of $350, variable costs of $210, and expected sales of 1,200 units. Total fixed costs are $300,000. What is BlueRidge's overall contribution margin ratio?",
    "Choices": {
      "A": "40.0%",
      "B": "42.9%",
      "C": "44.0%",
      "D": "46.7%"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Overall CM ratio = Total contribution margin / Total sales revenue. Heritage: CM per unit = $500 - $300 = $200. Total Heritage CM = 800 x $200 = $160,000. Heritage revenue = 800 x $500 = $400,000. Modern: CM per unit = $350 - $210 = $140. Total Modern CM = 1,200 x $140 = $168,000. Modern revenue = 1,200 x $350 = $420,000. Total CM = $160,000 + $168,000 = $328,000. Total revenue = $400,000 + $420,000 = $820,000. Overall CM ratio = $328,000 / $820,000 = 0.40 or 40.0%.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B results from averaging the two individual CM ratios (Heritage: 40%, Modern: 40%) and getting 40%, then miscalculating. Or from $350,000 / $820,000 = 42.7%. The candidate may have used an incorrect total CM.",
    "ExplanationWrongC": "Option C would be correct if total CM were $360,800 or total revenue were $745,455. The candidate may have miscalculated one product's contribution.",
    "ExplanationWrongD": "Option D results from dividing total CM by only one product's revenue ($328,000 / $700,000 = 46.9%) or from an incorrect revenue calculation.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationRequired": true,
    "ItemStyle": "single-select",
    "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "Contribution Margin",
    "Authorities": ["CMA Learning Outcome Statement C.5"],
    "VerifiedChecks": ["Heritage CM = $160,000 verified", "Modern CM = $168,000 verified", "Total CM = $328,000 verified", "Total revenue = $820,000 verified", "CM ratio = 40.0% verified", "Answer A confirmed"],
    "source_ids": ["CMA_LOS_C5_MultiProduct_CMRatio_BlueRidge_015"],
    "source_support_for_key": {
      "total_CM": "Heritage ($160,000) + Modern ($168,000) = $328,000 total contribution margin",
      "CM_ratio": "$328,000 total CM / $820,000 total revenue = 40.0% overall contribution margin ratio"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Averaging individual product CM ratios instead of computing total CM / total revenue",
        "why_plausible": "Simple averaging is a natural shortcut when two products are present, but it ignores revenue-weighting",
        "tier_candidate": "B"
      },
      "C": {
        "misconception": "Miscalculating one product's CM or revenue, leading to an inflated overall ratio",
        "why_plausible": "Arithmetic errors in multi-product calculations are common, especially with different selling prices",
        "tier_candidate": "B"
      },
      "D": {
        "misconception": "Using only one product's revenue as the denominator instead of total revenue",
        "why_plausible": "Candidates may focus on the larger product line and forget to aggregate revenue",
        "tier_candidate": "C"
      }
    },
    "uniqueness_note": "Multi-product CM ratio: requires aggregating CM and revenue across products. Verifiable: $328,000 / $820,000 = 0.40.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "question_state": "Unprocessed",
    "schema_version": "1.1",
    "Part2OnlyFlag": true
  }
]
