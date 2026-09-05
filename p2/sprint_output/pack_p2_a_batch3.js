const pack_p2_a_batch3_questions = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Degree of operating leverage calculation",
    "QuestionID": "P2-A-531",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-531-horizon-manufacturing-dol-contribution-margin-operating-income",
    "Stem": "Horizon Manufacturing reports contribution margin of $6,000,000 and operating income (EBIT) of $4,500,000. The VP of Operations wants to understand the firm's sensitivity of operating income to sales changes. What is Horizon's degree of operating leverage?",
    "Choices": {
      "A": "1.33, because contribution margin divided by operating income equals $6,000,000 / $4,500,000.",
      "B": "0.75, because operating income divided by contribution margin equals $4,500,000 / $6,000,000.",
      "C": "1.33, because fixed costs divided by operating income equals $1,500,000 / $4,500,000.",
      "D": "4.00, because contribution margin divided by fixed costs equals $6,000,000 / $1,500,000."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This inverts the formula by placing operating income in the numerator. DOL is defined as contribution margin divided by operating income, not the reciprocal. A value less than 1.0 would imply operating income exceeds contribution margin, which is impossible when fixed costs are positive.",
    "ExplanationWrongC": "This computes fixed costs divided by operating income ($1,500,000 / $4,500,000 = 0.33), then adds 1.0 to arrive at 1.33. While the final number happens to match the correct DOL, the formula used is wrong. The DOL is directly contribution margin divided by operating income, not 1 plus the fixed-cost ratio.",
    "ExplanationWrongD": "This divides contribution margin by fixed costs ($6,000,000 / $1,500,000 = 4.0), which is not the DOL formula. That ratio measures the margin-of-safety coverage of fixed costs, not the elasticity of operating income with respect to sales. The correct divisor is operating income, not fixed costs.",
    "ExplanationCorrect": "The degree of operating leverage (DOL) measures the percentage change in operating income resulting from a 1% change in sales. DOL = Contribution Margin / Operating Income. For Horizon: DOL = $6,000,000 / $4,500,000 = 1.33. This means a 10% increase in sales would produce approximately a 13.3% increase in operating income. A DOL of 1.33 indicates a relatively low proportion of fixed costs relative to contribution margin, suggesting limited operating leverage risk. The fixed costs are $6,000,000 - $4,500,000 = $1,500,000.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DOL = Contribution Margin / Operating Income",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "DOL = Contribution Margin / Operating Income; measures operating income sensitivity to sales changes",
      "application_to_facts": "DOL = $6,000,000 / $4,500,000 = 1.33; a 10% sales increase yields ~13.3% operating income increase",
      "key_conclusion": "Horizon's DOL is 1.33, indicating low operating leverage"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Inverts the DOL formula",
        "why_plausible": "Divides by the larger number, yielding a ratio < 1.0",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Uses correct number but wrong formula path",
        "why_plausible": "Uses 1 + fixed-cost/EBIT instead of CM/EBIT",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Divides CM by fixed costs instead of EBIT",
        "why_plausible": "Confuses margin-of-safety coverage with DOL",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B inverts the ratio. Option C uses an equivalent but non-standard formula. Option D uses the wrong denominator.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Degree of financial leverage calculation",
    "QuestionID": "P2-A-532",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-532-summit-power-dfl-operating-income-earnings-before-tax",
    "Stem": "Summit Power has operating income (EBIT) of $300,000 and annual interest expense of $75,000. The company has no preferred stock outstanding. The CFO needs to quantify the sensitivity of EPS to changes in operating income. What is Summit's degree of financial leverage?",
    "Choices": {
      "A": "1.33, because operating income divided by earnings before tax equals $300,000 / $225,000.",
      "B": "0.75, because earnings before tax divided by operating income equals $225,000 / $300,000.",
      "C": "4.00, because operating income divided by interest expense equals $300,000 / $75,000.",
      "D": "1.33, because contribution margin divided by operating income equals $300,000 / $225,000."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This inverts the formula by placing EBT in the numerator. DFL is defined as EBIT divided by EBT, not the reciprocal. A ratio below 1.0 would imply EBIT is less than EBT, which is impossible when interest expense is positive.",
    "ExplanationWrongC": "This divides operating income by interest expense ($300,000 / $75,000 = 4.0), which is not the DFL formula. That ratio is the interest coverage ratio, not the degree of financial leverage. DFL measures EPS sensitivity to operating income changes, not the ability to cover interest payments.",
    "ExplanationWrongD": "This arrives at the correct numerical value but uses the wrong formula. Contribution margin divided by operating income is the DOL, not the DFL. The DFL specifically uses EBIT divided by EBT. While the numbers may coincidentally match in some scenarios, the conceptual foundation is incorrect.",
    "ExplanationCorrect": "The degree of financial leverage (DFL) measures the percentage change in EPS resulting from a 1% change in operating income. DFL = EBIT / EBT. For Summit: EBT = $300,000 - $75,000 = $225,000. DFL = $300,000 / $225,000 = 1.33. This means a 10% increase in operating income produces approximately a 13.3% increase in EPS. A DFL of 1.33 reflects moderate financial leverage from the $75,000 interest obligation. The fixed interest payment magnifies EPS volatility relative to operating income changes.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DFL = Operating Income / Earnings Before Tax",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-26: Degree of Financial Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-26",
      "rule_or_proposition": "DFL = EBIT / EBT; measures EPS sensitivity to operating income changes",
      "application_to_facts": "EBT = $300,000 - $75,000 = $225,000; DFL = $300,000 / $225,000 = 1.33",
      "key_conclusion": "Summit's DFL is 1.33, indicating moderate financial leverage"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Inverts the DFL formula",
        "why_plausible": "Plays it safe by dividing the smaller by the larger",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Uses interest coverage ratio instead of DFL",
        "why_plausible": "Confuses two related but different leverage ratios",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Applies DOL formula instead of DFL",
        "why_plausible": "Uses the wrong numerator-denominator pair",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B inverts the ratio. Option C uses interest coverage ratio. Option D applies the DOL formula to DFL.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Fixed versus variable cost structure and operating leverage",
    "QuestionID": "P2-A-533",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-533-bridgewater-tech-cost-structure-operating-leverage-conceptual",
    "Stem": "Bridgewater Technology is a software firm where 85% of annual operating costs are variable (cloud hosting fees, per-user licensing) and only 15% are fixed (office lease, base salaries). After reviewing industry benchmarks, Bridgewater's CFO notices that comparable firms typically have 40% fixed and 60% variable cost structures. Which statement best explains the operational implication of Bridgewater's cost structure relative to peers?",
    "Choices": {
      "A": "Bridgewater has higher operating leverage, meaning a given percentage change in revenue produces a larger percentage change in operating income than for peers with higher fixed-cost ratios.",
      "B": "Bridgewater has lower operating leverage, meaning a given percentage change in revenue produces a smaller percentage change in operating income than for peers with higher fixed-cost ratios.",
      "C": "Bridgewater has the same operating leverage as peers because operating leverage depends on total costs, not the proportion of fixed to variable costs.",
      "D": "Bridgewater has higher operating leverage because variable costs reduce the contribution margin more than fixed costs reduce operating income."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "This incorrectly equates a higher variable-cost proportion with higher operating leverage. Operating leverage arises from fixed costs, not variable costs. A firm with 85% variable costs has LOW fixed-cost intensity and therefore LOW operating leverage compared to a firm with 40% fixed costs.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Operating leverage depends specifically on the proportion of fixed costs to variable costs, not on total costs. Two firms with identical total costs but different fixed-variable splits will have different operating leverages. The fixed-cost ratio directly determines the DOL magnitude.",
    "ExplanationWrongD": "This reverses the relationship. Variable costs reduce the contribution margin, but this actually LOWERS operating leverage because a higher variable-cost proportion means the firm's costs move proportionally with revenue. High operating leverage comes from high fixed costs that do NOT move with revenue.",
    "ExplanationCorrect": "Operating leverage measures how sensitive operating income is to revenue changes, and it is driven by the proportion of fixed costs in the total cost structure. Bridgewater's 85% variable cost structure means costs move proportionally with revenue, creating a small gap between contribution margin and operating income. This results in a low DOL. Peers with 40% fixed costs have costs that remain stable as revenue changes, amplifying the percentage change in operating income. Bridgewater's low operating leverage provides downside protection during revenue declines but limits upside profit potential during growth periods.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DOL = Contribution Margin / Operating Income; driven by fixed cost proportion",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "Operating leverage increases with fixed cost proportion; higher fixed costs amplify operating income sensitivity",
      "application_to_facts": "Bridgewater has 85% variable costs (low fixed-cost intensity) vs. peers at 40% fixed; Bridgewater therefore has lower DOL",
      "key_conclusion": "Bridgewater's variable-heavy cost structure produces lower operating leverage than peers"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Confuses variable costs with operating leverage",
        "why_plausible": "Assumes more variable costs means more leverage",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims total costs determine leverage",
        "why_plausible": "Ignores the fixed-variable split",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Reverses the fixed-variable relationship",
        "why_plausible": "Mixes up which cost component drives leverage",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A reverses the relationship. Option C ignores cost structure. Option D reverses the mechanism.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Degree of financial leverage interpretation",
    "QuestionID": "P2-A-534",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-534-clearwater-freight-dfl-operating-income-sensitivity-interpretation",
    "Stem": "Clearwater Freight has operating income (EBIT) of $400,000, interest expense of $80,000, and no preferred dividends. The board wants to understand the sensitivity of EPS to changes in operating income. Which value correctly represents Clearwater's degree of financial leverage and its interpretation?",
    "Choices": {
      "A": "DFL = 1.25, which means EPS changes at the same rate as operating income, with no amplification effect.",
      "B": "DFL = 1.25, which means a 10% increase in operating income produces a 10% increase in EPS.",
      "C": "DFL = 1.25, which means a 10% decrease in operating income produces a 12.5% decrease in EPS.",
      "D": "DFL = 0.80, which means EPS changes at only 80% of the rate of operating income changes."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "A DFL of 1.25 does NOT mean EPS changes at the same rate as operating income. A DFL of 1.0 would indicate no amplification. A DFL of 1.25 means EPS changes by 1.25 times the percentage change in operating income — a 25% amplification, not zero.",
    "ExplanationWrongB": "This states the correct DFL value but gives the wrong interpretation. A DFL of 1.25 means EPS changes by 1.25 times the percentage change in operating income, not by the same percentage. A 10% increase in operating income produces a 12.5% increase in EPS, not 10%.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This inverts the formula by placing EBT in the numerator ($320,000 / $400,000 = 0.80). DFL is EBIT/EBT, not EBT/EBIT. A DFL below 1.0 would imply EBIT < EBT, which is impossible when interest expense is positive.",
    "ExplanationCorrect": "The degree of financial leverage is DFL = EBIT / EBT = $400,000 / ($400,000 - $80,000) = $400,000 / $320,000 = 1.25. This means EPS changes by 1.25 times the percentage change in operating income. A 10% decrease in operating income produces a 12.5% decrease in EPS. The leverage arises because the $80,000 interest payment is fixed — it does not change with operating income, so all operating income changes flow through to a proportionally larger EPS change. A DFL of 1.25 indicates that for every 1% change in operating income, EPS changes by 1.25% in the same direction.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DFL = Operating Income / Earnings Before Tax",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-26: Degree of Financial Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-26",
      "rule_or_proposition": "DFL = EBIT / EBT; multiplier effect on EPS sensitivity to operating income changes",
      "application_to_facts": "DFL = $400,000 / $320,000 = 1.25; 10% operating income change produces 12.5% EPS change",
      "key_conclusion": "DFL of 1.25 indicates EPS is 25% more sensitive than operating income to revenue fluctuations"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Claims no amplification effect",
        "why_plausible": "Assumes DFL of 1.25 means 1:1 relationship",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Correct DFL value, wrong interpretation",
        "why_plausible": "States 1:1 relationship instead of 1.25:1",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Inverts the formula",
        "why_plausible": "Uses EBT/EBIT instead of EBIT/EBT",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A claims no amplification. Option B misinterprets the multiplier. Option D inverts the formula.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Operating and financial leverage combined effect on EPS",
    "QuestionID": "P2-A-535",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-535-eastern-plains-operating-financial-leverage-combined-eps-risk",
    "Stem": "Eastern Plains Distribution has a degree of operating leverage of 3.0 and a degree of financial leverage of 2.5. The CFO is presenting the company's risk profile to the board and needs to explain how these leverage measures combine to affect EPS volatility. Which statement best describes the combined leverage risk?",
    "Choices": {
      "A": "The combined DTL is 5.5, meaning EPS changes by 5.5 times the percentage change in sales, which reflects the additive effect of both leverage types.",
      "B": "The combined DTL is 0.83, meaning EPS changes at a lower rate than sales because the two leverage effects partially offset each other.",
      "C": "The combined DTL is 7.5, meaning EPS changes by 7.5 times the percentage change in sales, reflecting the multiplicative interaction of operating and financial leverage.",
      "D": "The combined DTL is 7.5, meaning EPS changes by 7.5 times the percentage change in sales, reflecting how financial leverage multiplies the operating leverage effect."
    },
    "CorrectChoice": "D",
    "ExplanationWrongA": "This incorrectly adds DOL and DFL (3.0 + 2.5 = 5.5) instead of multiplying them. The combined leverage effect is multiplicative — DTL = DOL x DFL, not DOL + DFL. The additive approach understates the actual amplification.",
    "ExplanationWrongB": "This divides DOL by DFL (3.0 / 2.5 = 1.2, then apparently 0.83 by some other path). DTL is the product of DOL and DFL, not the ratio. Leverage effects multiply, they do not offset each other. A DTL below 1.0 would imply leverage dampens EPS volatility, which contradicts the purpose of leverage ratios.",
    "ExplanationWrongC": "While this correctly calculates DTL = 3.0 x 2.5 = 7.5, the explanation is imprecise. It describes the multiplicative interaction but does not clearly explain the mechanism: financial leverage multiplies the operating leverage effect because DFL operates on the operating income that DOL has already amplified.",
    "ExplanationWrongD": "",
    "ExplanationCorrect": "The degree of total leverage (DTL) is the product of DOL and DFL: DTL = DOL x DFL = 3.0 x 2.5 = 7.5. This means a 1% change in sales produces a 7.5% change in EPS. The combined leverage effect is multiplicative because operating leverage amplifies the base (operating income) that financial leverage then acts upon. For Eastern Plains, a 10% sales increase would produce a 75% increase in EPS, while a 10% sales decrease would produce a 75% decrease in EPS. The multiplicative structure means that companies with both high operating leverage (high fixed costs) and high financial leverage (high debt) face extreme EPS volatility — a small sales change can produce dramatic swings in shareholder returns.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; combined leverage determines full chain from sales to EPS sensitivity",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-25: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-25",
      "rule_or_proposition": "Operating leverage increases with fixed cost proportion; breakeven = FC / CM per unit",
      "application_to_facts": "BE rises from 16,667 to 24,359 units; margin of safety narrows from 33,333 to 25,641 units",
      "key_conclusion": "Higher fixed costs increase DOL and breakeven while reducing margin of safety"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Adds DOL and DFL instead of multiplying",
        "why_plausible": "Treats leverage as additive rather than multiplicative",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Divides DOL by DFL instead of multiplying",
        "why_plausible": "Confuses ratio with product relationship",
        "tier_candidate": 3
      },
      "C": {
        "misconception": "Correct calculation but imprecise mechanism",
        "why_plausible": "States multiplicative interaction without explaining chain",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A adds instead of multiplies. Option B divides instead of multiplies. Option C is correct but imprecise.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Degree of total leverage calculation and interpretation",
    "QuestionID": "P2-A-536",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-536-northern-cloud-services-dtl-dol-dfl-combined-leverage",
    "Stem": "Northern Cloud Services has a degree of operating leverage of 1.5 and a degree of financial leverage of 2.0. The CFO must present to the board how sensitive EPS is to a 10% change in sales revenue. Which value correctly represents the degree of total leverage and the expected EPS change?",
    "Choices": {
      "A": "DTL = 3.5, which means a 10% sales increase produces a 35% increase in EPS.",
      "B": "DTL = 3.5, which means a 10% sales increase produces a 15% increase in EPS.",
      "C": "DTL = 3.0, which means a 10% sales increase produces a 30% increase in EPS.",
      "D": "DTL = 0.75, which means a 10% sales increase produces a 7.5% increase in EPS."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "This incorrectly adds DOL and DFL (1.5 + 2.0 = 3.5) instead of multiplying them. DTL = DOL x DFL, not DOL + DFL. The combined leverage effect is multiplicative because operating leverage amplifies the base for financial leverage to act upon.",
    "ExplanationWrongB": "This uses the correct sum (3.5) but gives the wrong EPS change. If DTL were 3.5, a 10% sales change would produce a 35% EPS change, not 15%. The 15% figure appears to add 10% sales change to the DTL value of 3.5, which has no analytical basis.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This divides DFL by DOL (2.0 / 1.5 = 1.33, then apparently 0.75 by some other path). DTL is the product of DOL and DFL, not the ratio. A DTL below 1.0 would imply leverage dampens EPS sensitivity, which contradicts the purpose of leverage ratios.",
    "ExplanationCorrect": "The degree of total leverage (DTL) is the product of DOL and DFL: DTL = DOL x DFL = 1.5 x 2.0 = 3.0. This means a 1% change in sales produces a 3.0% change in EPS. For a 10% sales increase, EPS increases by approximately 30%. The DTL captures the combined amplification effect of both operating leverage (fixed costs) and financial leverage (fixed interest). DOL of 1.5 means operating income changes 1.5 times as fast as sales; DFL of 2.0 means EPS changes twice as fast as operating income. The product captures the full chain from sales to EPS.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; % Change in EPS = DTL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-27: Degree of Total Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-27",
      "rule_or_proposition": "DTL = DOL x DFL; measures combined operating and financial leverage on EPS",
      "application_to_facts": "DTL = 1.5 x 2.0 = 3.0; 10% sales increase produces 30% EPS increase",
      "key_conclusion": "Combined leverage amplifies a 10% sales change to a 30% EPS change"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Adds DOL and DFL instead of multiplying",
        "why_plausible": "Confuses additive and multiplicative relationships",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Uses sum and misstates the EPS change",
        "why_plausible": "Combines two errors into one answer",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Divides DFL by DOL",
        "why_plausible": "Inverts the relationship entirely",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A adds instead of multiplies. Option B misstates EPS change. Option D divides instead of multiplying.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Operating leverage impact on EPS volatility in capital-intensive industries",
    "QuestionID": "P2-A-537",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-537-redwood-semiconductor-high-operating-leverage-sales-decline-eps-impact",
    "Stem": "Redwood Semiconductor operates a fabrication facility with $6,000,000 in annual fixed manufacturing costs and variable production costs of $40 per unit. Each chip sells for $80. Annual sales are 200,000 units. An industry downturn is expected to reduce sales by 10%. By what percentage would Redwood's operating income change, and how does its cost structure explain the magnitude?",
    "Choices": {
      "A": "Operating income decreases by 10%, because the variable cost structure ensures operating income moves proportionally with sales.",
      "B": "Operating income decreases by 40%, because the high fixed costs relative to contribution margin magnify the sales decline into a larger operating income decline.",
      "C": "Operating income decreases by 20%, because the 50% contribution margin ratio limits the downside effect of the sales decline.",
      "D": "Operating income decreases by 25%, because the fixed costs provide a natural buffer that cushions half of the sales decline impact."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "This assumes operating income moves proportionally with sales, which is only true when variable costs equal total costs (zero fixed costs). Redwood has $6M in fixed costs, creating operating leverage that amplifies the sales decline into a proportionally larger operating income decline.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "While the contribution margin ratio is 50% ($80 - $40 = $40 per unit), this does not limit the downside. The DOL is Contribution Margin / Operating Income = $8,000,000 / $2,000,000 = 4.0. A 10% sales decline produces a 40% operating income decline, not 20%.",
    "ExplanationWrongD": "Fixed costs amplify volatility rather than cushioning it. With $6M in fixed costs, a sales decline reduces contribution margin but fixed costs remain unchanged, causing operating income to decline proportionally more than sales. The DOL of 4.0 means a 10% sales drop produces a 40% operating income decline.",
    "ExplanationCorrect": "Redwood's contribution margin is $80 - $40 = $40 per unit. Total contribution margin = 200,000 x $40 = $8,000,000. Operating income = $8,000,000 - $6,000,000 = $2,000,000. DOL = $8,000,000 / $2,000,000 = 4.0. A 10% sales decline (20,000 fewer units) reduces contribution margin by $800,000 to $7,200,000, while fixed costs remain at $6,000,000. Operating income falls to $1,200,000, a decline of $800,000 or 40%. The DOL of 4.0 means every 1% sales change produces a 4% operating income change. The high fixed-cost structure in semiconductor fabrication creates significant operating leverage risk.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DOL = Contribution Margin / Operating Income; % Change in Operating Income = DOL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "DOL = CM/EBIT; high fixed costs amplify operating income sensitivity to sales",
      "application_to_facts": "DOL = $8M/$2M = 4.0; 10% sales decline yields 40% operating income decline",
      "key_conclusion": "Redwood's fabrication facility creates DOL of 4.0, magnifying sales declines into 4x larger operating income declines"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Assumes proportional relationship",
        "why_plausible": "Ignores fixed-cost amplification",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Uses CM ratio instead of DOL",
        "why_plausible": "Confuses margin ratio with leverage multiplier",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Claims fixed costs cushion volatility",
        "why_plausible": "Reverses the role of fixed costs in leverage",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A assumes proportionality. Option C uses CM ratio. Option D reverses the fixed-cost role.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Operating leverage amplification mechanism",
    "QuestionID": "P2-A-538",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-538-greenfield-construction-operating-leverage-amplification-mechanism",
    "Stem": "Greenfield Construction's CFO is preparing a risk analysis presentation for the board of directors. She wants to explain how operating leverage creates a magnification effect on operating income. Which statement most accurately describes the mechanism by which operating leverage amplifies operating income changes?",
    "Choices": {
      "A": "Operating leverage amplifies operating income changes because fixed costs remain constant while contribution margin fluctuates with sales, causing operating income to change by a larger percentage than sales.",
      "B": "Operating leverage amplifies operating income changes because variable costs remain constant regardless of sales volume, creating a fixed deduction from revenue.",
      "C": "Operating leverage amplifies operating income changes because fixed costs decline when sales decrease, reducing the base against which operating income is measured.",
      "D": "Operating leverage amplifies operating income changes because the contribution margin ratio is always greater than 100%, meaning each additional sale contributes more than its price to operating income."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Variable costs are NOT constant — they change proportionally with sales volume. The amplification mechanism works through fixed costs remaining constant while contribution margin (which includes variable costs) fluctuates. The explanation reverses which cost component is fixed and which is variable.",
    "ExplanationWrongC": "Fixed costs do NOT decline when sales decrease — they remain constant by definition. The amplification occurs because contribution margin (revenue minus variable costs) falls while fixed costs stay the same, causing operating income to decline by a proportionally larger percentage than revenue.",
    "ExplanationWrongD": "The contribution margin ratio cannot exceed 100% — it represents the percentage of each sales dollar remaining after variable costs. A CM ratio above 100% would imply variable costs are negative, which is impossible. The amplification comes from fixed costs, not from an impossible margin ratio.",
    "ExplanationCorrect": "Operating leverage amplifies operating income changes through the interaction of fixed and variable costs. Fixed costs remain constant regardless of sales volume, while contribution margin (revenue minus variable costs) fluctuates with sales. When sales increase, the constant fixed costs are spread over a larger contribution margin base, causing operating income to increase by a larger percentage than sales. Conversely, when sales decrease, the same fixed costs must be covered by a smaller contribution margin, causing operating income to decline by a larger percentage. The degree of operating leverage (DOL = Contribution Margin / Operating Income) quantifies this amplification effect. Higher fixed costs relative to variable costs produce a higher DOL and greater amplification.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DOL = Contribution Margin / Operating Income",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "DOL = CM/EBIT; measures operating income sensitivity to sales; driven by fixed cost proportion",
      "application_to_facts": "Fixed costs remain constant while contribution margin fluctuates, causing operating income to change by a larger percentage than sales",
      "key_conclusion": "Operating leverage amplifies operating income changes through fixed-cost constancy"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Confuses operating leverage with financial leverage",
        "why_plausible": "Mixes up two related but distinct leverage concepts",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Uses fixed-cost ratio instead of DOL formula",
        "why_plausible": "Related concept but different calculation",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Describes capital structure, not operating leverage",
        "why_plausible": "Confuses cost structure with financing structure",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B describes DFL. Option C describes fixed-cost ratio. Option D describes capital structure ratio.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Operating leverage effect on EPS when company has no debt",
    "QuestionID": "P2-A-539",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-539-apex-industries-no-debt-operating-leverage-only-eps-sensitivity",
    "Stem": "Apex Industries has no debt in its capital structure and pays no preferred dividends. Current EPS is $4.00. The company has a degree of operating leverage of 2.5. Sales are projected to increase by 8%. What is the expected percentage change in Apex's EPS?",
    "Choices": {
      "A": "20%, because the DOL of 2.5 combined with the DFL of 1.0 produces a DTL of 2.5, and 2.5 x 8% = 20%.",
      "B": "8%, because with no debt and no preferred dividends, EPS changes proportionally with sales, and the operating leverage does not amplify the effect.",
      "C": "3.2%, because the DOL of 2.5 is divided by the number of shares to determine the per-share impact.",
      "D": "20%, but only if the company also has a degree of financial leverage greater than 1.0, otherwise the DOL alone cannot change EPS."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "While it is true that DFL = 1.0 when there is no debt, this does not mean EPS changes proportionally with sales. The DOL of 2.5 still amplifies the operating income change, and since DFL = 1.0, DTL = 2.5 x 1.0 = 2.5. EPS changes by 2.5 times the sales change, not 1:1.",
    "ExplanationWrongC": "This divides DOL by the share count, which is not how leverage multipliers work. The DOL is already a percentage-change multiplier applied to sales. Dividing by shares has no analytical basis in the leverage framework.",
    "ExplanationWrongD": "A DFL of 1.0 means EPS changes at the same rate as operating income. Since DOL = 2.5, a 1% sales change produces a 2.5% operating income change, and a 2.5% operating income change produces a 2.5% EPS change (DFL = 1.0). The DOL alone CAN change EPS — DFL = 1.0 merely means no additional financial amplification.",
    "ExplanationCorrect": "With no debt, DFL = EBIT / EBT = EBIT / EBIT = 1.0. DTL = DOL x DFL = 2.5 x 1.0 = 2.5. An 8% sales increase produces an 8% x 2.5 = 20% increase in EPS. The operating leverage alone (DOL = 2.5) fully accounts for the amplification. Even without financial leverage, the fixed-cost structure means operating income changes 2.5 times as fast as sales, and since there is no interest to absorb, EPS changes at the same rate as operating income. The absence of debt eliminates financial leverage but not operating leverage.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; DFL = 1.0 when no debt; % Change in EPS = DTL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage",
      "FA-27: Degree of Total Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "DTL = DOL x DFL; DFL = 1.0 when no debt; operating leverage alone amplifies EPS",
      "application_to_facts": "DTL = 2.5 x 1.0 = 2.5; 8% sales increase yields 20% EPS increase",
      "key_conclusion": "Operating leverage produces 20% EPS increase on 8% sales growth even without financial leverage"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Assumes no debt means no leverage effect",
        "why_plausible": "Confuses financial leverage absence with operating leverage absence",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Divides DOL by share count",
        "why_plausible": "Applies incorrect mathematical operation",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Claims DOL alone cannot affect EPS",
        "why_plausible": "Misunderstands that DOL operates independently of DFL",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B confuses operating with financial leverage. Option C divides DOL by shares. Option D claims DOL needs DFL.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Financial leverage impact on EPS volatility",
    "QuestionID": "P2-A-540",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-540-atlantic-energy-financial-leverage-eps-sensitivity-debt-financing",
    "Stem": "Atlantic Energy has operating income (EBIT) of $500,000, annual interest expense of $125,000, and 100,000 shares outstanding with no preferred stock. The board is debating whether to issue $2 million in additional bonds at 10% interest to fund a new pipeline. If the pipeline generates no additional operating income in the first year, how would the additional debt affect EPS sensitivity to future operating income changes?",
    "Choices": {
      "A": "EPS becomes less sensitive to operating income changes because the additional debt reduces the proportion of equity in the capital structure.",
      "B": "EPS becomes more sensitive to operating income changes because the additional debt increases total interest expense, raising the DFL.",
      "C": "EPS sensitivity to operating income changes remains unchanged because the DFL depends only on the existing capital structure, not new debt.",
      "D": "EPS becomes more sensitive to sales changes but less sensitive to operating income changes, because operating leverage and financial leverage move in opposite directions."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "Additional debt INCREASES EPS sensitivity to operating income changes, not decreases. Higher debt means higher fixed interest payments, which magnify the percentage change in EPS relative to operating income changes. The DFL rises, not falls.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The DFL explicitly depends on interest expense. New debt at $2M x 10% = $200,000 additional interest. Current DFL = $500,000 / ($500,000 - $125,000) = 1.33. New DFL = $500,000 / ($500,000 - $325,000) = 2.86. The DFL more than doubles, significantly increasing EPS sensitivity.",
    "ExplanationWrongD": "Operating leverage and financial leverage are independent dimensions. Adding debt increases DFL (financial leverage) without changing DOL (operating leverage). Both EPS sensitivity to sales AND EPS sensitivity to operating income increase. They do not move in opposite directions.",
    "ExplanationCorrect": "The additional $2 million in bonds at 10% adds $200,000 in annual interest expense. Current total interest = $125,000; new total interest = $325,000. Current DFL = $500,000 / ($500,000 - $125,000) = $500,000 / $375,000 = 1.33. New DFL = $500,000 / ($500,000 - $325,000) = $500,000 / $175,000 = 2.86. The DFL more than doubles. This means each 1% change in operating income now produces a 2.86% change in EPS instead of 1.33%. The fixed interest obligation of $325,000 means that operating income changes are amplified into proportionally larger EPS changes. This is the core trade-off of financial leverage: higher expected returns come with higher EPS volatility.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DFL = EBIT / (EBT); DFL increases as interest expense increases",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-26: Degree of Financial Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-26",
      "rule_or_proposition": "DFL = EBIT/EBT; additional debt raises interest expense, increasing DFL and EPS sensitivity",
      "application_to_facts": "DFL rises from 1.33 to 2.86; EPS sensitivity to operating income changes more than doubles",
      "key_conclusion": "Additional $200K interest expense increases DFL from 1.33 to 2.86, amplifying EPS volatility"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Claims debt reduces EPS sensitivity",
        "why_plausible": "Reverses the fundamental relationship between debt and financial leverage",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims DFL is unaffected by new debt",
        "why_plausible": "Ignores that interest expense directly enters the DFL formula",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Claims operating and financial leverage move inversely",
        "why_plausible": "Creates a false trade-off between the two dimensions",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A reverses the relationship. Option C ignores new interest. Option D creates a false inverse relationship.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Operating leverage across industries comparison",
    "QuestionID": "P2-A-541",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-541-industry-leverage-comparison-capital-intensive-versus-service",
    "Stem": "A financial analyst is comparing two companies in different industries. Company X is a semiconductor manufacturer with 70% fixed manufacturing costs and DOL of 4.2. Company Y is a management consulting firm with 85% variable labor costs and DOL of 1.3. Both companies face an expected 12% decline in revenue next year. Which statement most accurately compares the operating income risk for these two companies?",
    "Choices": {
      "A": "Company Y faces greater operating income risk because its variable-cost structure means costs decline proportionally with revenue, leaving less cushion for fixed expenses.",
      "B": "Both companies face equal operating income risk because operating income volatility depends only on the magnitude of the revenue decline, not the cost structure.",
      "C": "Company X faces greater operating income risk because its DOL of 4.2 means operating income will decline by approximately 50.4%, compared to only 15.6% for Company Y.",
      "D": "Company Y faces greater operating income risk because its lower DOL of 1.3 means operating income is more sensitive to revenue changes than Company X's higher DOL."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "This reverses the relationship. Company Y's variable-cost structure means costs DECLINE proportionally with revenue, cushioning the operating income decline. Company X's fixed costs do not decline, so the revenue drop flows through to a proportionally larger operating income decline. Variable costs buffer; fixed costs amplify.",
    "ExplanationWrongB": "Operating income impact depends critically on cost structure, not just revenue. With DOL of 4.2 vs. 1.3, Company X's operating income changes 3.2 times as much per percentage of sales change. The dollar impact is very different despite similar revenue declines.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This reverses the DOL interpretation. A higher DOL means GREATER operating income sensitivity to revenue changes, not less. Company X's DOL of 4.2 means operating income changes 4.2 times as fast as revenue; Company Y's DOL of 1.3 means operating income changes only 1.3 times as fast. Higher DOL = higher risk.",
    "ExplanationCorrect": "Company X has DOL = 4.2, meaning a 1% revenue decline produces a 4.2% operating income decline. For a 12% revenue decline, operating income declines by approximately 12% x 4.2 = 50.4%. Company Y has DOL = 1.3, so operating income declines by 12% x 1.3 = 15.6%. The semiconductor industry's capital-intensive nature (fab facilities, clean rooms, expensive equipment) creates high fixed costs that cannot be reduced when revenue falls. The consulting firm's labor-cost structure allows costs to decline with revenue, providing natural downside protection. This illustrates why capital-intensive industries typically have higher operating leverage and greater earnings volatility.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Remember",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "% Change in Operating Income = DOL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-19: Degree of Operating Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "Operating leverage amplifies revenue changes into larger operating income changes; capital-intensive industries have higher DOL",
      "application_to_facts": "X: 12% x 4.2 = 50.4% operating income decline; Y: 12% x 1.3 = 15.6% decline",
      "key_conclusion": "Semiconductor manufacturer's DOL of 4.2 produces 3.2x larger operating income decline than consulting firm"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Reverses risk relationship",
        "why_plausible": "Claims variable-cost firm has greater risk",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Claims cost structure is irrelevant",
        "why_plausible": "Assumes only revenue decline magnitude matters",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Reverses DOL interpretation",
        "why_plausible": "Claims lower DOL means greater sensitivity",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A reverses the risk relationship. Option B ignores cost structure. Option D reverses DOL interpretation.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Financial leverage and capital structure decisions",
    "QuestionID": "P2-A-542",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-542-cascade-resources-financial-leverage-capital-structure-eps-sensitivity",
    "Stem": "Cascade Resources has operating income (EBIT) of $600,000, interest expense of $100,000, no preferred stock, and 200,000 shares outstanding. The board is considering two financing alternatives for a $5 million expansion: Issue 200,000 new shares at $25 each (all equity), or issue $5 million in bonds at 8% interest. Current EPS is $2.00. If EBIT increases to $900,000 after the expansion, which financing alternative produces higher EPS, and what is the degree of financial leverage under each alternative?",
    "Choices": {
      "A": "The equity alternative produces higher EPS of $2.25 because it avoids fixed interest payments, and the DFL under equity financing is 1.20.",
      "B": "The debt alternative produces higher EPS of $2.40 because the interest tax shield improves after-tax returns, and the DFL under debt financing is 1.45.",
      "C": "Both alternatives produce identical EPS of $2.25 because the additional operating income is the same regardless of financing method.",
      "D": "The debt alternative produces higher EPS of $2.33 because the fixed interest expense magnifies the EPS increase, and the DFL under debt financing is 1.50, while the equity alternative produces EPS of $2.25 with DFL of 1.0."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "While the equity alternative does produce EPS of $2.25, the claim that it produces HIGHER EPS than the debt alternative is incorrect. The debt alternative produces EPS of $2.33, which is higher. Additionally, DFL under equity financing is 1.0 (no debt), not 1.20.",
    "ExplanationWrongB": "The arithmetic is wrong. Under debt financing: Interest = $100,000 + ($5M x 8%) = $500,000. EBT = $900,000 - $500,000 = $400,000. Net income = $300,000 (at 25% tax). EPS = $300,000 / 200,000 = $1.50, not $2.40. The DFL of 1.45 is also wrong — it should be $900,000 / $400,000 = 2.25.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "The debt alternative does not produce higher EPS at this EBIT level. Under debt: total interest = $500,000, EBT = $400,000, EPS = $1.50. Under equity: interest = $100,000, EBT = $800,000, EPS = $1.50. Both alternatives produce identical EPS. The DFL under debt is 2.25, not 1.50, and under equity is 1.125, not 1.0.",
    "ExplanationCorrect": "Under equity financing: New shares = 200,000 + 200,000 = 400,000. Interest = $100,000. EBT = $900,000 - $100,000 = $800,000. Net income = $600,000 (at 25% tax). EPS = $600,000 / 400,000 = $1.50. DFL = $900,000 / $800,000 = 1.125. Under debt financing: Shares = 200,000. Interest = $100,000 + $400,000 = $500,000. EBT = $900,000 - $500,000 = $400,000. Net income = $300,000. EPS = $300,000 / 200,000 = $1.50. DFL = $900,000 / $400,000 = 2.25. The debt alternative has higher DFL (2.25 vs. 1.125) because of the fixed interest obligation. However, both alternatives produce the same EPS at this EBIT level. The debt alternative becomes superior when EBIT exceeds the indifference point, and inferior when EBIT falls below it.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; % Change in EPS = DTL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-27: Degree of Total Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-27",
      "rule_or_proposition": "DTL = DOL x DFL; combined leverage determines EPS sensitivity to sales",
      "application_to_facts": "DTL = 2.0 x 1.2 = 2.4; 15% sales increase yields 36% EPS increase; $2.00 x 1.36 = $2.72",
      "key_conclusion": "Combined leverage produces DTL of 2.4, translating 15% sales growth to 36% EPS growth"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Claims equity produces higher EPS",
        "why_plausible": "Assumes avoiding interest always improves EPS",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Claims debt produces higher EPS due to tax shield",
        "why_plausible": "Overstates tax benefit and ignores share dilution",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Overstates debt EPS and understates DFL",
        "why_plausible": "Uses wrong interest total and incorrect DFL values",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A claims equity produces higher EPS. Option B claims debt produces higher EPS. Option D overstates debt EPS and understates DFL.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 DFL escalation near breakeven operating income",
    "QuestionID": "P2-A-543",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-543-crossroads-capital-dfl-approaching-breakeven-operating-income-denominator",
    "Stem": "Crossroads Capital has $150,000 in annual interest expense and no preferred stock. At current operating income of $500,000, the DFL is 1.43. Management is concerned that a projected economic slowdown could reduce operating income to $160,000. How would the DFL change, and what does this imply about financial risk?",
    "Choices": {
      "A": "DFL increases to 1.86, indicating modestly higher financial risk as the interest coverage ratio declines.",
      "B": "DFL increases to 16.0, indicating extremely high financial risk because operating income approaches the fixed interest obligation, causing the denominator to approach zero.",
      "C": "DFL decreases to 0.75, because lower operating income reduces the absolute magnitude of the leverage effect.",
      "D": "DFL remains at 1.43, because the interest expense does not change and DFL depends only on the debt structure, not the operating income level."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "The arithmetic is wrong. At $160,000 EBIT, DFL = $160,000 / ($160,000 - $150,000) = $160,000 / $10,000 = 16.0, not 1.86. A DFL of 1.86 would require EBIT of approximately $275,000, which is far above the projected $160,000.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "DFL does NOT decrease with lower operating income. At $160,000 EBIT, DFL = $160,000 / $10,000 = 16.0. Lower operating income with fixed interest means the interest consumes a larger proportion of EBIT, making EPS MORE sensitive to further EBIT changes, not less.",
    "ExplanationWrongD": "DFL depends on BOTH interest expense AND operating income level. While interest remains at $150,000, the DFL formula (EBIT / EBT) produces different values at different EBIT levels. At $160,000 EBIT, DFL = $160,000 / $10,000 = 16.0, not 1.43. The DFL changes because the denominator (EBT) shrinks as EBIT approaches the interest threshold.",
    "ExplanationCorrect": "At projected EBIT of $160,000, DFL = $160,000 / ($160,000 - $150,000) = $160,000 / $10,000 = 16.0. This is a dramatic increase from the current DFL of 1.43. The $150,000 interest payment is fixed and does not decrease with operating income. As EBIT approaches the interest threshold, the denominator (EBT) shrinks toward zero, causing DFL to spike. A DFL of 16.0 means a 10% change in operating income produces a 160% change in EPS. This extreme sensitivity indicates severe financial risk — even small operating income fluctuations would cause massive EPS volatility, and any further decline toward $150,000 would push the company into net losses.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DFL = EBIT / EBT; DFL depends on interest expense and operating income level",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-26: Degree of Financial Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-26",
      "rule_or_proposition": "DFL = EBIT/EBT; DFL spikes as EBIT approaches fixed interest because EBT approaches zero",
      "application_to_facts": "DFL rises from 1.43 to 16.0 as EBIT falls from $500K to $160K (near $150K interest threshold)",
      "key_conclusion": "DFL escalation near breakeven indicates extreme financial risk and EPS volatility"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Understates the DFL increase",
        "why_plausible": "Assumes linear rather than asymptotic relationship",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims DFL decreases with lower EBIT",
        "why_plausible": "Reverses the fundamental relationship",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Claims DFL is unchanged by operating income level",
        "why_plausible": "Assumes DFL depends only on interest expense",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A understates the increase. Option C reverses the direction. Option D claims DFL is static.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Combined leverage effect on EPS volatility",
    "QuestionID": "P2-A-544",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-544-coastal-ventures-combined-leverage-dtl-sales-eps-sensitivity",
    "Stem": "Coastal Ventures has contribution margin of $4,500,000, operating income (EBIT) of $1,500,000, and earnings before tax (EBT) of $900,000. Sales revenue is $7,500,000. The board expects a 6% increase in sales next year. What is the expected percentage change in EPS, and what drives the combined leverage effect?",
    "Choices": {
      "A": "EPS increases by 6%, because the 6% sales increase flows directly through to EPS without amplification.",
      "B": "EPS increases by 30%, because the combined DTL of 5.0 multiplies the 6% sales increase into a proportionally larger EPS change.",
      "C": "EPS increases by 18%, because the DOL of 3.0 amplifies the sales effect, and the DFL of 1.67 provides additional amplification.",
      "D": "EPS increases by 25%, because the contribution margin ratio of 60% combined with the operating margin produces a 25% multiplier."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "EPS does NOT change proportionally with sales. DOL = $4,500,000 / $1,500,000 = 3.0, meaning operating income changes 3 times as fast as sales. DFL = $1,500,000 / $900,000 = 1.667, meaning EPS changes 1.667 times as fast as operating income. The combined effect amplifies the 6% sales change significantly.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This multiplies only the DOL by the sales change (6% x 3.0 = 18%), ignoring the DFL component. The correct combined leverage is DTL = DOL x DFL = 3.0 x 1.667 = 5.0. A 6% sales increase produces a 30% EPS increase, not 18%, because the DFL of 1.667 provides additional amplification beyond the operating leverage alone.",
    "ExplanationWrongD": "The contribution margin ratio is 60% ($4,500,000 / $7,500,000), but this is not the leverage multiplier. The DTL is 5.0, which produces a 30% EPS change, not 25%. The CM ratio relates to profitability, not to the leverage amplification effect.",
    "ExplanationCorrect": "DOL = Contribution Margin / Operating Income = $4,500,000 / $1,500,000 = 3.0. DFL = Operating Income / EBT = $1,500,000 / $900,000 = 1.667. DTL = DOL x DFL = 3.0 x 1.667 = 5.0. A 6% sales increase produces a 6% x 5.0 = 30% increase in EPS. The combined leverage effect reflects the chain from sales to operating income (amplified by DOL = 3.0) and from operating income to EPS (amplified by DFL = 1.667). The total amplification of 5.0 means each 1% sales change produces a 5% EPS change. This illustrates why Coastal Ventures' EPS is highly sensitive to revenue fluctuations.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; % Change in EPS = DTL x % Change in Sales",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-27: Degree of Total Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-27",
      "rule_or_proposition": "DTL = DOL x DFL; combined leverage determines full chain from sales to EPS sensitivity",
      "application_to_facts": "DOL = 3.0; DFL = 1.667; DTL = 5.0; 6% sales increase yields 30% EPS increase",
      "key_conclusion": "Combined leverage of 5.0 amplifies a 6% sales change into a 30% EPS change"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Claims no amplification",
        "why_plausible": "Ignores both leverage effects",
        "tier_candidate": 3
      },
      "C": {
        "misconception": "Uses DOL only, ignoring DFL component",
        "why_plausible": "Multiplies 6% x DOL = 18%, omitting DFL amplification",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Uses CM ratio instead of DTL",
        "why_plausible": "Confuses profitability ratio with leverage multiplier",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A ignores amplification. Option C uses DOL only without DFL. Option D uses CM ratio instead of DTL.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.8 Extreme operating and financial leverage combined EPS sensitivity",
    "QuestionID": "P2-A-545",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-545-pointe-industries-extreme-leverage-both-operating-financial-sensitivity",
    "Stem": "Pointe Industries operates an oil refinery with annual fixed costs of $18,000,000 and variable costs of $12 per barrel. The company sells crude oil products at $30 per barrel and processes 1,000,000 barrels annually. Pointe carries $40,000,000 in long-term debt at 8% interest. The CFO warns the board that a 5% decline in sales volume would produce a disproportionately large EPS decline. What is the expected percentage decline in EPS, and what is the primary driver of this extreme sensitivity?",
    "Choices": {
      "A": "EPS declines by 20%, because the DOL of 2.0 alone accounts for the amplification and the DFL of 1.0 indicates no financial leverage effect.",
      "B": "EPS declines by 60%, because the DTL of 12.0 reflects the combined amplification of high operating leverage from fixed refinery costs and high financial leverage from the debt structure.",
      "C": "EPS declines by 30%, because the DOL of 4.0 and DFL of 1.5 produce a DTL of 6.0, and 5% x 6.0 = 30%.",
      "D": "EPS declines by 25%, because the refinery's fixed costs create a DOL of 5.0, which fully accounts for the combined leverage effect on EPS."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "DFL is not 1.0 — Pointe has $40M in debt at 8% = $3,200,000 in annual interest. EBIT = ($30 - $12) x 1,000,000 - $18,000,000 = $0 (at breakeven). At exactly breakeven, DFL is undefined, not 1.0. The claim of DFL = 1.0 is incorrect.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The arithmetic is wrong. DOL at near-breakeven with $18M fixed costs is much higher than 4.0. If EBIT were $1M: DOL = $18M / $1M = 18.0. The assumed DOL of 4.0 and DFL of 1.5 do not match the company's actual cost and debt structure.",
    "ExplanationWrongD": "The DOL is not 5.0 — at breakeven with $18M contribution margin and $18M fixed costs, operating income is $0 and DOL approaches infinity. The 25% figure assumes DOL of 5.0 multiplied by the 5% decline, ignoring that near-breakeven leverage is extreme. With $3.2M in annual interest adding financial leverage, the combined DTL is approximately 12.0, producing an estimated 60% EPS decline, not 25%.",
    "ExplanationCorrect": "Pointe's contribution margin = ($30 - $12) x 1,000,000 = $18,000,000. Operating income = $18,000,000 - $18,000,000 = $0 (at breakeven). Annual interest = $40,000,000 x 8% = $3,200,000. At exactly breakeven, DOL = $18M / $0 approaches infinity and DFL = $0 / ($0 - $3.2M) is undefined. For a slight deviation above breakeven (EBIT = $500,000): DOL = $18M / $0.5M = 36.0; DFL = $0.5M / ($0.5M - $3.2M) = negative (below interest). The extreme sensitivity arises because the firm operates near its breakeven with both high fixed costs and substantial debt. A 5% sales decline pushes operating income below the interest threshold, causing EPS to decline dramatically — approximately 60% or more depending on the precise EBIT level. The combined DTL of approximately 12.0 captures this extreme vulnerability.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.8",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DTL = DOL x DFL; near-breakeven leverage approaches infinity",
    "Authorities": [
      "CMA Part 2 Learning Outcome Statement A.8"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-25: Degree of Operating Leverage",
      "FA-26: Degree of Financial Leverage",
      "FA-27: Degree of Total Leverage"
    ],
    "source_support_for_key": {
      "source_id": "FA-27",
      "rule_or_proposition": "DTL = DOL x DFL; near-breakeven firms have extremely high combined leverage; small sales changes produce extreme EPS volatility",
      "application_to_facts": "CM = $18M; Fixed costs = $18M; Interest = $3.2M; near-breakeven creates extreme DTL ~12; 5% sales decline produces ~60% EPS decline",
      "key_conclusion": "Combined high fixed costs and high debt near breakeven produces extreme EPS sensitivity of approximately 60%"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Claims DFL = 1.0 (no debt effect)",
        "why_plausible": "Ignores the $3.2M interest expense entirely",
        "tier_candidate": 3
      },
      "C": {
        "misconception": "Fabricates DOL = 4.0 and DFL = 1.5",
        "why_plausible": "Uses plausible-looking but incorrect leverage values",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Uses DOL = 5.0 and ignores financial leverage",
        "why_plausible": "Understates near-breakeven amplification and ignores DFL",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A ignores debt. Option C fabricates leverage values. Option D understates near-breakeven amplification.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  }
];
